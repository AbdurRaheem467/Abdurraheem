/**
 * TIMEORA - Global Search Overlay Modal
 */

import { PRODUCTS } from "../data/products.js";
import { store } from "../state/store.js";

export class SearchModal {
  static init() {
    let modal = document.getElementById("timeora-search-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "timeora-search-modal";
      modal.className = "fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/85 backdrop-blur-xl hidden opacity-0 transition-opacity duration-300";
      modal.innerHTML = `
        <div class="relative w-full max-w-3xl bg-[#111115] border border-[#d4af37]/40 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden transform -translate-y-4 transition-transform duration-300" id="search-modal-content">
          
          <!-- Search Header Input -->
          <div class="relative p-5 border-b border-white/10 flex items-center gap-4 bg-black/40">
            <i data-lucide="search" class="w-6 h-6 text-[#d4af37] shrink-0"></i>
            <input 
              type="text" 
              id="global-search-input" 
              placeholder="Search by timepiece name, brand, caliber, material, or style..." 
              class="w-full bg-transparent text-lg text-white placeholder-zinc-500 focus:outline-none font-sans"
              autocomplete="off"
            />
            <button id="search-clear-btn" class="text-zinc-500 hover:text-white p-1 hidden" aria-label="Clear input">
              <i data-lucide="x-circle" class="w-5 h-5"></i>
            </button>
            <button id="search-close-btn" class="px-2.5 py-1 rounded-lg bg-white/10 text-zinc-300 hover:text-white text-xs font-mono border border-white/15">
              ESC
            </button>
          </div>

          <!-- Quick Trending Tags -->
          <div class="px-6 py-3 bg-[#15151a] border-b border-white/5 flex items-center gap-2 overflow-x-auto text-xs">
            <span class="text-zinc-500 font-mono uppercase tracking-wider text-[10px] shrink-0">Trending:</span>
            <button class="search-tag-pill px-3 py-1 rounded-full bg-white/5 hover:bg-[#d4af37]/20 hover:text-white text-zinc-300 border border-white/10 transition-colors shrink-0" data-tag="Chronograph">Chronograph</button>
            <button class="search-tag-pill px-3 py-1 rounded-full bg-white/5 hover:bg-[#d4af37]/20 hover:text-white text-zinc-300 border border-white/10 transition-colors shrink-0" data-tag="Tourbillon">Tourbillon</button>
            <button class="search-tag-pill px-3 py-1 rounded-full bg-white/5 hover:bg-[#d4af37]/20 hover:text-white text-zinc-300 border border-white/10 transition-colors shrink-0" data-tag="Rose Gold">Rose Gold</button>
            <button class="search-tag-pill px-3 py-1 rounded-full bg-white/5 hover:bg-[#d4af37]/20 hover:text-white text-zinc-300 border border-white/10 transition-colors shrink-0" data-tag="Titanium">Titanium</button>
            <button class="search-tag-pill px-3 py-1 rounded-full bg-white/5 hover:bg-[#d4af37]/20 hover:text-white text-zinc-300 border border-white/10 transition-colors shrink-0" data-tag="Diver">Diver 300M</button>
            <button class="search-tag-pill px-3 py-1 rounded-full bg-white/5 hover:bg-[#d4af37]/20 hover:text-white text-zinc-300 border border-white/10 transition-colors shrink-0" data-tag="Minimal">Minimalist</button>
          </div>

          <!-- Live Results Container -->
          <div id="search-results-list" class="max-h-[60vh] overflow-y-auto p-4 space-y-2 custom-scrollbar">
            <!-- Results injected here -->
          </div>

          <!-- Footer status bar -->
          <div class="px-6 py-3 bg-[#0c0c0f] border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
            <span id="search-status-text">Type to start discovering luxury timepieces</span>
            <div class="flex items-center gap-3">
              <span>Navigate: <kbd class="px-1.5 py-0.5 rounded bg-white/10 text-zinc-300">↑</kbd> <kbd class="px-1.5 py-0.5 rounded bg-white/10 text-zinc-300">↓</kbd></span>
              <span>Open: <kbd class="px-1.5 py-0.5 rounded bg-white/10 text-zinc-300">↵</kbd></span>
            </div>
          </div>

        </div>
      `;
      document.body.appendChild(modal);
    }

    // Toggle store listener
    store.subscribe("search:toggle", (open) => {
      if (open) SearchModal.open();
      else SearchModal.close();
    });

    // Keyboard Hotkey (Ctrl+K or Cmd+K or Esc)
    window.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        SearchModal.open();
      } else if (e.key === "Escape") {
        SearchModal.close();
      }
    });

    SearchModal.setupEvents();
  }

  static setupEvents() {
    const modal = document.getElementById("timeora-search-modal");
    const input = document.getElementById("global-search-input");
    const closeBtn = document.getElementById("search-close-btn");
    const clearBtn = document.getElementById("search-clear-btn");

    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) SearchModal.close();
      });
    }

    if (closeBtn) closeBtn.addEventListener("click", SearchModal.close);

    if (clearBtn && input) {
      clearBtn.addEventListener("click", () => {
        input.value = "";
        clearBtn.classList.add("hidden");
        SearchModal.renderDefaultSuggestions();
        input.focus();
      });
    }

    if (input) {
      input.addEventListener("input", () => {
        const query = input.value.trim();
        if (clearBtn) {
          if (query) clearBtn.classList.remove("hidden");
          else clearBtn.classList.add("hidden");
        }
        SearchModal.performSearch(query);
      });
    }

    // Search tag pills
    document.querySelectorAll(".search-tag-pill").forEach(pill => {
      pill.addEventListener("click", () => {
        const tag = pill.getAttribute("data-tag");
        if (input && tag) {
          input.value = tag;
          if (clearBtn) clearBtn.classList.remove("hidden");
          SearchModal.performSearch(tag);
          input.focus();
        }
      });
    });
  }

  static open() {
    const modal = document.getElementById("timeora-search-modal");
    const content = document.getElementById("search-modal-content");
    const input = document.getElementById("global-search-input");

    if (modal && content) {
      modal.classList.remove("hidden");
      requestAnimationFrame(() => {
        modal.classList.remove("opacity-0");
        content.classList.remove("-translate-y-4");
      });

      SearchModal.renderDefaultSuggestions();

      setTimeout(() => {
        if (input) {
          input.value = "";
          input.focus();
        }
      }, 100);
    }
  }

  static close() {
    const modal = document.getElementById("timeora-search-modal");
    const content = document.getElementById("search-modal-content");
    if (modal) {
      if (content) content.classList.add("-translate-y-4");
      modal.classList.add("opacity-0");
      setTimeout(() => {
        modal.classList.add("hidden");
      }, 300);
    }
  }

  static performSearch(query) {
    const resultsContainer = document.getElementById("search-results-list");
    const statusText = document.getElementById("search-status-text");
    if (!resultsContainer) return;

    if (!query) {
      SearchModal.renderDefaultSuggestions();
      if (statusText) statusText.textContent = "Type to start discovering luxury timepieces";
      return;
    }

    const q = query.toLowerCase();
    const matches = PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q)) ||
      p.specs.caseMaterial.toLowerCase().includes(q) ||
      p.specs.strapMaterial.toLowerCase().includes(q) ||
      p.specs.movement.toLowerCase().includes(q)
    );

    if (statusText) {
      statusText.textContent = `Found ${matches.length} matching masterpiece${matches.length === 1 ? '' : 's'}`;
    }

    if (matches.length === 0) {
      resultsContainer.innerHTML = `
        <div class="py-12 text-center">
          <div class="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3 text-zinc-500">
            <i data-lucide="search-x" class="w-6 h-6"></i>
          </div>
          <h4 class="font-serif text-lg text-white font-medium">No Timepieces Found</h4>
          <p class="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">No matching models found for "${query}". Try searching by category like "Tourbillon", "Titanium", or "Rose Gold".</p>
          <a href="#shop" class="inline-block mt-4 px-5 py-2 rounded-xl bg-white/10 hover:bg-[#d4af37] text-white hover:text-black text-xs font-semibold uppercase tracking-wider transition-colors" onclick="document.getElementById('timeora-search-modal').classList.add('hidden')">
            Browse All 28 Watches
          </a>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    resultsContainer.innerHTML = matches.map(product => {
      const formattedPrice = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(product.price);
      return `
        <a 
          href="#product-${product.id}" 
          class="search-result-item flex items-center justify-between gap-4 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-[#d4af37]/40 transition-all group"
          onclick="document.getElementById('timeora-search-modal').classList.add('hidden')"
        >
          <div class="flex items-center gap-4 min-w-0">
            <div class="w-16 h-16 rounded-lg bg-[#1a1a20] p-1.5 border border-white/10 shrink-0 flex items-center justify-center">
              <img src="${product.images[0]}" alt="${product.name}" class="w-full h-full object-contain filter drop-shadow-md group-hover:scale-110 transition-transform">
            </div>
            <div class="min-w-0">
              <span class="text-[10px] font-mono uppercase tracking-widest text-[#d4af37] block truncate">${product.brand}</span>
              <h4 class="font-serif text-sm font-semibold text-white group-hover:text-[#d4af37] transition-colors truncate">${product.name}</h4>
              <p class="text-[11px] text-zinc-400 truncate mt-0.5">${product.specs.caseMaterial} • ${product.specs.caseDiameter} • ${product.category}</p>
            </div>
          </div>
          <div class="text-right shrink-0">
            <span class="font-mono text-sm font-bold text-white block">${formattedPrice}</span>
            <span class="text-[10px] text-zinc-500 uppercase tracking-wider">${product.stock > 0 ? 'In Stock' : 'Allocated'}</span>
          </div>
        </a>
      `;
    }).join("");

    if (window.lucide) window.lucide.createIcons();
  }

  static renderDefaultSuggestions() {
    const resultsContainer = document.getElementById("search-results-list");
    if (!resultsContainer) return;

    // Show 4 featured watches as suggestions
    const featured = PRODUCTS.filter(p => p.isFeatured).slice(0, 4);

    resultsContainer.innerHTML = `
      <div class="px-2 py-1 mb-2">
        <span class="text-[11px] font-mono uppercase tracking-widest text-[#d4af37]">Recommended Masterpieces</span>
      </div>
      ${featured.map(product => {
        const formattedPrice = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(product.price);
        return `
          <a 
            href="#product-${product.id}" 
            class="search-result-item flex items-center justify-between gap-4 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.07] border border-white/5 hover:border-[#d4af37]/40 transition-all group"
            onclick="document.getElementById('timeora-search-modal').classList.add('hidden')"
          >
            <div class="flex items-center gap-4 min-w-0">
              <div class="w-14 h-14 rounded-lg bg-[#1a1a20] p-1.5 border border-white/10 shrink-0 flex items-center justify-center">
                <img src="${product.images[0]}" alt="${product.name}" class="w-full h-full object-contain filter drop-shadow group-hover:scale-105 transition-transform">
              </div>
              <div class="min-w-0">
                <span class="text-[10px] font-mono uppercase tracking-widest text-[#d4af37] block truncate">${product.brand}</span>
                <h4 class="font-serif text-sm font-semibold text-white group-hover:text-[#d4af37] transition-colors truncate">${product.name}</h4>
                <p class="text-[11px] text-zinc-400 truncate mt-0.5">${product.category} • ${product.specs.caseMaterial}</p>
              </div>
            </div>
            <div class="text-right shrink-0">
              <span class="font-mono text-sm font-bold text-white block">${formattedPrice}</span>
              <span class="text-[10px] text-emerald-400 font-mono">Available</span>
            </div>
          </a>
        `;
      }).join("")}
    `;

    if (window.lucide) window.lucide.createIcons();
  }
}
