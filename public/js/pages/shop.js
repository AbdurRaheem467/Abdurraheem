/**
 * TIMEORA - Shop Catalog Page
 * Multi-faceted filtering (Category, Brand, Price, Gender, Materials, Color, Rating, Stock),
 * Dynamic sorting, Grid/List views, Active filter badges, and Mobile filter drawer.
 */

import { BRANDS, CATEGORIES, STRAP_MATERIALS, CASE_MATERIALS, COLORS } from "../data/products.js";
import { ProductCard } from "../components/productCard.js";
import { store } from "../state/store.js";

export class ShopPage {
  static render(customPreset = null) {
    if (customPreset) {
      if (customPreset.category) store.filters.category = customPreset.category;
      if (customPreset.gender) store.filters.gender = customPreset.gender;
      if (customPreset.isNew) store.filters.sortBy = "newest";
      if (customPreset.discount) store.filters.sortBy = "bestseller";
    }

    const filtered = store.getFilteredProducts();
    const f = store.filters;

    return `
      <div class="shop-page max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        <!-- Shop Header & Breadcrumb -->
        <div class="mb-10 pb-8 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">
              <a href="#home" class="hover:text-[#d4af37] transition-colors">Maison</a>
              <span>/</span>
              <span class="text-[#d4af37]">Catalogue Horlogerie</span>
            </div>
            <h1 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight">
              ${f.category !== 'All' ? `${f.category} Collection` : (f.gender !== 'All' ? `${f.gender}'s Timepieces` : 'All Swiss Timepieces')}
            </h1>
            <p class="text-xs text-zinc-400 mt-2 max-w-xl">
              Explore our manufacture collections crafted in Le Locle and Geneva with certified COSC chronometer precision and noble metals.
            </p>
          </div>

          <!-- Mobile Filter Drawer Trigger -->
          <div class="flex lg:hidden items-center gap-3">
            <button id="mobile-filter-open-btn" class="flex-1 px-5 py-3 rounded-xl bg-white/10 border border-[#d4af37]/40 text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2">
              <i data-lucide="sliders-horizontal" class="w-4 h-4 text-[#d4af37]"></i>
              Filter & Sort (${filtered.length})
            </button>
          </div>
        </div>

        <!-- Main Layout: Sidebar Filters + Products Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- Desktop Sidebar Filters -->
          <aside class="hidden lg:block lg:col-span-3 bg-[#111115] border border-white/10 rounded-2xl p-6 sticky top-28 space-y-6 shadow-xl" id="desktop-filter-sidebar">
            ${ShopPage.renderFilterControls()}
          </aside>

          <!-- Main Products Area -->
          <div class="lg:col-span-9 space-y-6">
            
            <!-- Top Controls Bar: Sort, Count, Active Pills -->
            <div class="bg-[#121216] border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              
              <!-- Match Count & Reset Button -->
              <div class="flex items-center gap-3">
                <span class="text-xs font-mono text-zinc-400">
                  Showing <strong class="text-white font-bold">${filtered.length}</strong> Masterpieces
                </span>
                ${ShopPage.hasActiveFilters() ? `
                  <button id="clear-all-filters-btn" class="text-[11px] font-mono text-[#d4af37] hover:underline underline-offset-4 flex items-center gap-1">
                    <i data-lucide="rotate-ccw" class="w-3 h-3"></i>
                    Reset Filters
                  </button>
                ` : ''}
              </div>

              <!-- Sorting Options -->
              <div class="flex items-center gap-3">
                <label for="shop-sort-select" class="text-xs font-mono uppercase tracking-wider text-zinc-500 shrink-0">Sort By:</label>
                <select id="shop-sort-select" class="bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs font-sans text-white focus:outline-none focus:border-[#d4af37] transition-all">
                  <option value="featured" ${f.sortBy === 'featured' ? 'selected' : ''}>Featured Masterpieces</option>
                  <option value="newest" ${f.sortBy === 'newest' ? 'selected' : ''}>Newest 2026 Releases</option>
                  <option value="price-asc" ${f.sortBy === 'price-asc' ? 'selected' : ''}>Price: Low to High</option>
                  <option value="price-desc" ${f.sortBy === 'price-desc' ? 'selected' : ''}>Price: High to Low</option>
                  <option value="rating" ${f.sortBy === 'rating' ? 'selected' : ''}>Highest Rated (5.0★)</option>
                  <option value="bestseller" ${f.sortBy === 'bestseller' ? 'selected' : ''}>Bestselling Icons</option>
                </select>
              </div>

            </div>

            <!-- Active Filters Badges Bar -->
            ${ShopPage.renderActiveFilterPills()}

            <!-- Products Grid Container -->
            <div id="shop-product-grid" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              ${filtered.length > 0 ? (
                filtered.map(p => ProductCard.render(p)).join("")
              ) : `
                <div class="col-span-full py-16 text-center bg-[#111115] border border-dashed border-white/15 rounded-2xl p-8">
                  <div class="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 mx-auto mb-4">
                    <i data-lucide="filter-x" class="w-8 h-8"></i>
                  </div>
                  <h3 class="font-serif text-xl font-semibold text-white mb-2">No Matching Masterpieces Found</h3>
                  <p class="text-xs text-zinc-400 max-w-md mx-auto mb-6">
                    No timepieces match your current active filter combination. Adjust your price range or clear filters to view available models.
                  </p>
                  <button id="empty-reset-filters-btn" class="px-6 py-3 rounded-xl bg-[#d4af37] text-black font-semibold text-xs uppercase tracking-wider hover:brightness-110 transition-all">
                    Clear All Filters
                  </button>
                </div>
              `}
            </div>

          </div>

        </div>

        <!-- Mobile Filter Drawer Modal -->
        <div id="mobile-filter-modal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-md hidden transition-opacity">
          <div class="fixed inset-y-0 right-0 max-w-sm w-full bg-[#0f0f13] border-l border-[#d4af37]/30 p-6 overflow-y-auto flex flex-col justify-between shadow-2xl transform translate-x-full transition-transform duration-300 custom-scrollbar" id="mobile-filter-panel">
            <div>
              <div class="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div class="flex items-center gap-2">
                  <i data-lucide="sliders-horizontal" class="w-5 h-5 text-[#d4af37]"></i>
                  <h3 class="font-serif text-lg font-semibold text-white">Filter Timepieces</h3>
                </div>
                <button id="close-mobile-filter-btn" class="p-2 text-zinc-400 hover:text-white">
                  <i data-lucide="x" class="w-5 h-5"></i>
                </button>
              </div>

              ${ShopPage.renderFilterControls("mobile")}
            </div>

            <div class="pt-6 border-t border-white/10 mt-6 sticky bottom-0 bg-[#0f0f13]">
              <button id="apply-mobile-filter-btn" class="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-black font-semibold text-xs uppercase tracking-widest hover:brightness-110 transition-all">
                Apply Filters (${filtered.length} Watches)
              </button>
            </div>
          </div>
        </div>

      </div>
    `;
  }

  static renderFilterControls(prefix = "desktop") {
    const f = store.filters;

    return `
      <!-- Search Within Shop -->
      <div class="space-y-2">
        <label class="text-xs font-mono uppercase tracking-wider text-zinc-400 block">Search Timepieces</label>
        <div class="relative">
          <input 
            type="text" 
            id="${prefix}-filter-search" 
            value="${f.search}" 
            placeholder="Name, caliber, tag..." 
            class="w-full bg-black/60 border border-white/15 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37] transition-colors"
          />
          <i data-lucide="search" class="w-4 h-4 text-zinc-500 absolute left-3 top-3"></i>
        </div>
      </div>

      <!-- Categories -->
      <div class="space-y-2 pt-4 border-t border-white/10">
        <label class="text-xs font-mono uppercase tracking-wider text-zinc-400 block">Category</label>
        <div class="space-y-1 max-h-40 overflow-y-auto custom-scrollbar pr-1">
          ${CATEGORIES.map(cat => `
            <label class="flex items-center justify-between text-xs py-1 px-2 rounded-lg cursor-pointer transition-colors ${f.category === cat ? 'bg-[#d4af37]/20 text-[#d4af37] font-semibold' : 'text-zinc-300 hover:bg-white/5'}">
              <span>${cat}</span>
              <input type="radio" name="${prefix}-cat" value="${cat}" class="hidden filter-cat-radio" ${f.category === cat ? 'checked' : ''} />
              ${f.category === cat ? '<i data-lucide="check" class="w-3.5 h-3.5"></i>' : ''}
            </label>
          `).join('')}
        </div>
      </div>

      <!-- Watch Houses / Brands -->
      <div class="space-y-2 pt-4 border-t border-white/10">
        <label class="text-xs font-mono uppercase tracking-wider text-zinc-400 block">Manufacture / Brand</label>
        <select id="${prefix}-filter-brand" class="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]">
          <option value="All" ${f.brand === 'All' ? 'selected' : ''}>All Manufacture Houses</option>
          ${BRANDS.map(b => `<option value="${b}" ${f.brand === b ? 'selected' : ''}>${b}</option>`).join('')}
        </select>
      </div>

      <!-- Price Range Slider -->
      <div class="space-y-3 pt-4 border-t border-white/10">
        <div class="flex items-center justify-between">
          <label class="text-xs font-mono uppercase tracking-wider text-zinc-400">Price Ceiling</label>
          <span class="text-xs font-mono font-bold text-[#d4af37]" id="${prefix}-price-val">$${f.maxPrice.toLocaleString()}</span>
        </div>
        <input 
          type="range" 
          id="${prefix}-filter-price" 
          min="5000" 
          max="60000" 
          step="1000" 
          value="${f.maxPrice}" 
          class="w-full accent-[#d4af37] cursor-pointer"
        />
        <div class="flex justify-between text-[10px] font-mono text-zinc-500">
          <span>$5,000</span>
          <span>$30,000</span>
          <span>$60,000+</span>
        </div>
      </div>

      <!-- Gender -->
      <div class="space-y-2 pt-4 border-t border-white/10">
        <label class="text-xs font-mono uppercase tracking-wider text-zinc-400 block">Audience / Gender</label>
        <div class="grid grid-cols-3 gap-1.5 bg-black/50 p-1 rounded-xl border border-white/10">
          ${["All", "Men", "Women"].map(g => `
            <button class="filter-gender-btn text-xs py-1.5 rounded-lg text-center transition-all ${f.gender === g ? 'bg-[#d4af37] text-black font-semibold shadow-md' : 'text-zinc-400 hover:text-white'}" data-gender="${g}">
              ${g}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Case Material -->
      <div class="space-y-2 pt-4 border-t border-white/10">
        <label class="text-xs font-mono uppercase tracking-wider text-zinc-400 block">Case Metal / Material</label>
        <select id="${prefix}-filter-case" class="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]">
          <option value="All" ${f.caseMaterial === 'All' ? 'selected' : ''}>All Case Materials</option>
          ${CASE_MATERIALS.map(m => `<option value="${m}" ${f.caseMaterial === m ? 'selected' : ''}>${m}</option>`).join('')}
        </select>
      </div>

      <!-- Strap Material -->
      <div class="space-y-2 pt-4 border-t border-white/10">
        <label class="text-xs font-mono uppercase tracking-wider text-zinc-400 block">Strap / Bracelet</label>
        <select id="${prefix}-filter-strap" class="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#d4af37]">
          <option value="All" ${f.strapMaterial === 'All' ? 'selected' : ''}>All Straps</option>
          ${STRAP_MATERIALS.map(m => `<option value="${m}" ${f.strapMaterial === m ? 'selected' : ''}>${m}</option>`).join('')}
        </select>
      </div>

      <!-- In Stock Toggle -->
      <div class="pt-4 border-t border-white/10 flex items-center justify-between">
        <label for="${prefix}-filter-stock" class="text-xs font-mono uppercase tracking-wider text-zinc-300 cursor-pointer">
          In-Stock Only
        </label>
        <input 
          type="checkbox" 
          id="${prefix}-filter-stock" 
          ${f.inStockOnly ? 'checked' : ''} 
          class="w-4 h-4 rounded accent-[#d4af37] cursor-pointer"
        />
      </div>
    `;
  }

  static renderActiveFilterPills() {
    const f = store.filters;
    const pills = [];

    if (f.search) pills.push({ key: "search", label: `Search: "${f.search}"` });
    if (f.category !== "All") pills.push({ key: "category", label: `Category: ${f.category}` });
    if (f.brand !== "All") pills.push({ key: "brand", label: `Brand: ${f.brand}` });
    if (f.gender !== "All") pills.push({ key: "gender", label: `Gender: ${f.gender}` });
    if (f.caseMaterial !== "All") pills.push({ key: "caseMaterial", label: `Case: ${f.caseMaterial}` });
    if (f.strapMaterial !== "All") pills.push({ key: "strapMaterial", label: `Strap: ${f.strapMaterial}` });
    if (f.maxPrice < 60000) pills.push({ key: "maxPrice", label: `Under $${f.maxPrice.toLocaleString()}` });
    if (f.inStockOnly) pills.push({ key: "inStockOnly", label: "In-Stock Only" });

    if (pills.length === 0) return "";

    return `
      <div class="flex items-center gap-2 flex-wrap pb-2">
        <span class="text-[11px] font-mono uppercase tracking-wider text-zinc-500">Active:</span>
        ${pills.map(pill => `
          <button class="remove-filter-pill px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-red-500/40 text-zinc-300 hover:text-red-300 text-xs font-mono flex items-center gap-1.5 transition-colors" data-filter-key="${pill.key}">
            <span>${pill.label}</span>
            <i data-lucide="x" class="w-3 h-3"></i>
          </button>
        `).join('')}
      </div>
    `;
  }

  static hasActiveFilters() {
    const f = store.filters;
    return f.search || f.category !== "All" || f.brand !== "All" || f.gender !== "All" || f.caseMaterial !== "All" || f.strapMaterial !== "All" || f.maxPrice < 60000 || f.inStockOnly;
  }

  static setupEvents() {
    ProductCard.setupCardEvents(document.getElementById("shop-product-grid") || document);

    // Filter controls change handlers
    ["desktop", "mobile"].forEach(prefix => {
      // Search input
      const searchInput = document.getElementById(`${prefix}-filter-search`);
      if (searchInput) {
        searchInput.addEventListener("input", () => {
          store.setFilter("search", searchInput.value);
        });
      }

      // Category radios
      document.querySelectorAll(`input[name="${prefix}-cat"]`).forEach(radio => {
        radio.parentElement.addEventListener("click", () => {
          store.setFilter("category", radio.value);
        });
      });

      // Brand dropdown
      const brandSelect = document.getElementById(`${prefix}-filter-brand`);
      if (brandSelect) {
        brandSelect.addEventListener("change", () => {
          store.setFilter("brand", brandSelect.value);
        });
      }

      // Price slider
      const priceSlider = document.getElementById(`${prefix}-filter-price`);
      const priceVal = document.getElementById(`${prefix}-price-val`);
      if (priceSlider) {
        priceSlider.addEventListener("input", () => {
          const val = parseInt(priceSlider.value, 10);
          if (priceVal) priceVal.textContent = `$${val.toLocaleString()}`;
          store.setFilter("maxPrice", val);
        });
      }

      // Gender buttons
      document.querySelectorAll(".filter-gender-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const g = btn.getAttribute("data-gender");
          if (g) store.setFilter("gender", g);
        });
      });

      // Case material dropdown
      const caseSelect = document.getElementById(`${prefix}-filter-case`);
      if (caseSelect) {
        caseSelect.addEventListener("change", () => {
          store.setFilter("caseMaterial", caseSelect.value);
        });
      }

      // Strap material dropdown
      const strapSelect = document.getElementById(`${prefix}-filter-strap`);
      if (strapSelect) {
        strapSelect.addEventListener("change", () => {
          store.setFilter("strapMaterial", strapSelect.value);
        });
      }

      // In-stock checkbox
      const stockCheck = document.getElementById(`${prefix}-filter-stock`);
      if (stockCheck) {
        stockCheck.addEventListener("change", () => {
          store.setFilter("inStockOnly", stockCheck.checked);
        });
      }
    });

    // Sorting select
    const sortSelect = document.getElementById("shop-sort-select");
    if (sortSelect) {
      sortSelect.addEventListener("change", () => {
        store.setFilter("sortBy", sortSelect.value);
      });
    }

    // Reset Filters Buttons
    const clearBtn = document.getElementById("clear-all-filters-btn");
    if (clearBtn) clearBtn.addEventListener("click", () => store.resetFilters());

    const emptyResetBtn = document.getElementById("empty-reset-filters-btn");
    if (emptyResetBtn) emptyResetBtn.addEventListener("click", () => store.resetFilters());

    // Remove single filter pill
    document.querySelectorAll(".remove-filter-pill").forEach(pill => {
      pill.addEventListener("click", () => {
        const key = pill.getAttribute("data-filter-key");
        if (key === "maxPrice") store.setFilter("maxPrice", 60000);
        else if (key === "inStockOnly") store.setFilter("inStockOnly", false);
        else if (key === "search") store.setFilter("search", "");
        else store.setFilter(key, "All");
      });
    });

    // Mobile filter modal logic
    const mobileOpenBtn = document.getElementById("mobile-filter-open-btn");
    const mobileCloseBtn = document.getElementById("close-mobile-filter-btn");
    const mobileModal = document.getElementById("mobile-filter-modal");
    const mobilePanel = document.getElementById("mobile-filter-panel");
    const applyMobileBtn = document.getElementById("apply-mobile-filter-btn");

    const openMobileFilter = () => {
      if (mobileModal && mobilePanel) {
        mobileModal.classList.remove("hidden");
        requestAnimationFrame(() => {
          mobilePanel.classList.remove("translate-x-full");
        });
      }
    };

    const closeMobileFilter = () => {
      if (mobileModal && mobilePanel) {
        mobilePanel.classList.add("translate-x-full");
        setTimeout(() => {
          mobileModal.classList.add("hidden");
        }, 300);
      }
    };

    if (mobileOpenBtn) mobileOpenBtn.addEventListener("click", openMobileFilter);
    if (mobileCloseBtn) mobileCloseBtn.addEventListener("click", closeMobileFilter);
    if (applyMobileBtn) applyMobileBtn.addEventListener("click", closeMobileFilter);
    if (mobileModal) {
      mobileModal.addEventListener("click", (e) => {
        if (e.target === mobileModal) closeMobileFilter();
      });
    }
  }
}
