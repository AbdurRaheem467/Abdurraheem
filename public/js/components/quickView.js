/**
 * TIMEORA - Quick View Modal Component
 */

import { PRODUCTS } from "../data/products.js";
import { store } from "../state/store.js";

export class QuickViewModal {
  static init() {
    let modal = document.getElementById("timeora-quick-view-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "timeora-quick-view-modal";
      modal.className = "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md hidden opacity-0 transition-opacity duration-300";
      document.body.appendChild(modal);
    }

    store.subscribe("quickView:open", (productId) => {
      QuickViewModal.open(productId);
    });

    // Close on backdrop click
    modal.addEventListener("click", (e) => {
      if (e.target === modal) QuickViewModal.close();
    });
  }

  static open(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById("timeora-quick-view-modal");
    if (!modal) return;

    const isWishlisted = store.isInWishlist(product.id);
    const hasDiscount = product.discount && product.discount > 0;
    const formattedPrice = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(product.price);
    const formattedOriginal = product.originalPrice ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(product.originalPrice) : null;

    modal.innerHTML = `
      <div class="relative w-full max-w-4xl bg-[#101014] border border-[#d4af37]/40 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden max-h-[90vh] flex flex-col md:flex-row transform scale-95 transition-transform duration-300" id="quick-view-content">
        
        <!-- Close Button -->
        <button id="quick-view-close-btn" class="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 border border-white/20 text-zinc-400 hover:text-white hover:border-white flex items-center justify-center transition-colors">
          <i data-lucide="x" class="w-5 h-5"></i>
        </button>

        <!-- Left: Gallery -->
        <div class="w-full md:w-1/2 p-6 md:p-8 bg-[#18181d] flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-white/10">
          <div class="relative w-full aspect-square flex items-center justify-center overflow-hidden">
            <img 
              id="qv-main-img" 
              src="${product.images[0]}" 
              alt="${product.name}" 
              class="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] transition-all duration-300"
            />
          </div>

          <!-- Thumbnails Selector -->
          ${product.images.length > 1 ? `
            <div class="flex gap-3 mt-4 overflow-x-auto w-full justify-center py-1">
              ${product.images.map((img, idx) => `
                <button class="qv-thumb-btn w-14 h-14 rounded-xl border ${idx === 0 ? 'border-[#d4af37] bg-white/10' : 'border-white/10 bg-black/40'} p-1.5 shrink-0 overflow-hidden hover:border-[#d4af37]/80 transition-all" data-img-src="${img}">
                  <img src="${img}" alt="Thumbnail ${idx + 1}" class="w-full h-full object-contain" />
                </button>
              `).join('')}
            </div>
          ` : ''}
        </div>

        <!-- Right: Information & Actions -->
        <div class="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto flex flex-col justify-between custom-scrollbar">
          <div>
            <div class="flex items-center justify-between gap-2 mb-2">
              <span class="text-xs font-mono tracking-widest text-[#d4af37] uppercase">${product.brand}</span>
              <span class="text-xs px-2.5 py-0.5 rounded-full ${product.stock > 0 ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300'} font-medium">
                ${product.stock > 0 ? `In Stock (${product.stock} available)` : 'Allocated / Sold Out'}
              </span>
            </div>

            <h2 class="font-serif text-2xl md:text-3xl font-semibold text-white mb-2 leading-tight">${product.name}</h2>

            <!-- Rating -->
            <div class="flex items-center gap-2 mb-4">
              <div class="flex text-amber-400">
                ${Array(5).fill(0).map((_, i) => `
                  <i data-lucide="star" class="w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-zinc-600'}"></i>
                `).join('')}
              </div>
              <span class="text-xs font-mono text-zinc-300">${product.rating.toFixed(1)}</span>
              <span class="text-xs text-zinc-500">(${product.reviewCount} verified reviews)</span>
            </div>

            <!-- Pricing -->
            <div class="flex items-baseline gap-3 mb-5">
              <span class="font-mono text-2xl font-bold text-white tracking-tight">${formattedPrice}</span>
              ${hasDiscount ? `
                <span class="text-sm text-zinc-500 line-through font-mono">${formattedOriginal}</span>
                <span class="text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">Save ${product.discount}%</span>
              ` : ''}
            </div>

            <p class="text-xs text-zinc-300 leading-relaxed mb-6">${product.shortDescription}</p>

            <!-- Key Specs Grid -->
            <div class="grid grid-cols-2 gap-2 text-xs font-mono mb-6 bg-white/5 p-3.5 rounded-xl border border-white/5">
              <div>
                <span class="text-zinc-500 text-[10px] uppercase block">Diameter</span>
                <span class="text-zinc-200">${product.specs.caseDiameter}</span>
              </div>
              <div>
                <span class="text-zinc-500 text-[10px] uppercase block">Case Metal</span>
                <span class="text-zinc-200 truncate block">${product.specs.caseMaterial}</span>
              </div>
              <div>
                <span class="text-zinc-500 text-[10px] uppercase block">Movement</span>
                <span class="text-zinc-200 truncate block">${product.specs.movement}</span>
              </div>
              <div>
                <span class="text-zinc-500 text-[10px] uppercase block">Water Resistance</span>
                <span class="text-zinc-200">${product.specs.waterResistance}</span>
              </div>
            </div>
          </div>

          <!-- Quantity & Action Buttons -->
          <div class="space-y-4 pt-4 border-t border-white/10">
            
            <div class="flex items-center gap-3">
              <!-- Quantity Selector -->
              <div class="flex items-center bg-black/60 border border-white/20 rounded-xl overflow-hidden">
                <button id="qv-qty-dec" class="px-3 py-2 text-zinc-400 hover:text-white transition-colors">-</button>
                <input id="qv-qty-input" type="number" value="1" min="1" max="${product.stock}" class="w-12 text-center bg-transparent text-sm font-mono text-white focus:outline-none" readonly />
                <button id="qv-qty-inc" class="px-3 py-2 text-zinc-400 hover:text-white transition-colors">+</button>
              </div>

              <!-- Add To Bag Button -->
              <button 
                id="qv-add-cart-btn" 
                class="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-black font-semibold text-xs uppercase tracking-widest hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(212,175,55,0.25)]"
                data-product-id="${product.id}"
              >
                <i data-lucide="shopping-bag" class="w-4 h-4"></i>
                Add To Bag
              </button>

              <!-- Wishlist Button -->
              <button 
                id="qv-wishlist-btn"
                class="p-3 rounded-xl bg-white/5 border border-white/15 text-zinc-300 hover:text-red-400 hover:border-red-400/40 transition-colors ${isWishlisted ? 'text-red-500 border-red-500/50' : ''}"
                data-product-id="${product.id}"
                aria-label="Save to Wishlist"
              >
                <i data-lucide="heart" class="w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}"></i>
              </button>
            </div>

            <!-- View Full Page Link -->
            <a 
              href="#product-${product.id}" 
              id="qv-full-details-link"
              class="block text-center py-2 text-xs font-semibold uppercase tracking-widest text-[#d4af37] hover:text-white transition-colors"
            >
              View Full Horological Details & Gallery →
            </a>
          </div>

        </div>

      </div>
    `;

    modal.classList.remove("hidden");
    requestAnimationFrame(() => {
      modal.classList.remove("opacity-0");
      const content = document.getElementById("quick-view-content");
      if (content) content.classList.remove("scale-95");
    });

    if (window.lucide) window.lucide.createIcons();

    // Event handlers within modal
    const closeBtn = document.getElementById("quick-view-close-btn");
    if (closeBtn) closeBtn.addEventListener("click", QuickViewModal.close);

    const fullDetailsLink = document.getElementById("qv-full-details-link");
    if (fullDetailsLink) fullDetailsLink.addEventListener("click", QuickViewModal.close);

    // Thumbnail selector
    modal.querySelectorAll(".qv-thumb-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const src = btn.getAttribute("data-img-src");
        const mainImg = document.getElementById("qv-main-img");
        if (mainImg && src) {
          mainImg.src = src;
          modal.querySelectorAll(".qv-thumb-btn").forEach(b => {
            b.classList.remove("border-[#d4af37]", "bg-white/10");
            b.classList.add("border-white/10", "bg-black/40");
          });
          btn.classList.add("border-[#d4af37]", "bg-white/10");
          btn.classList.remove("border-white/10", "bg-black/40");
        }
      });
    });

    // Quantity Inc / Dec
    const qtyInput = document.getElementById("qv-qty-input");
    const qtyDec = document.getElementById("qv-qty-dec");
    const qtyInc = document.getElementById("qv-qty-inc");

    if (qtyDec && qtyInput) {
      qtyDec.addEventListener("click", () => {
        let val = parseInt(qtyInput.value, 10) || 1;
        if (val > 1) qtyInput.value = val - 1;
      });
    }

    if (qtyInc && qtyInput) {
      qtyInc.addEventListener("click", () => {
        let val = parseInt(qtyInput.value, 10) || 1;
        if (val < product.stock) qtyInput.value = val + 1;
      });
    }

    // Add to Cart
    const addCartBtn = document.getElementById("qv-add-cart-btn");
    if (addCartBtn) {
      addCartBtn.addEventListener("click", () => {
        const qty = parseInt(qtyInput ? qtyInput.value : 1, 10) || 1;
        store.addToCart(product.id, qty, true);
        QuickViewModal.close();
      });
    }

    // Wishlist Toggle
    const wishlistBtn = document.getElementById("qv-wishlist-btn");
    if (wishlistBtn) {
      wishlistBtn.addEventListener("click", () => {
        const isSaved = store.toggleWishlist(product.id);
        const icon = wishlistBtn.querySelector("i");
        if (isSaved) {
          wishlistBtn.classList.add("text-red-500", "border-red-500/50");
          if (icon) icon.classList.add("fill-red-500", "text-red-500");
        } else {
          wishlistBtn.classList.remove("text-red-500", "border-red-500/50");
          if (icon) icon.classList.remove("fill-red-500", "text-red-500");
        }
      });
    }
  }

  static close() {
    const modal = document.getElementById("timeora-quick-view-modal");
    const content = document.getElementById("quick-view-content");
    if (modal) {
      if (content) content.classList.add("scale-95");
      modal.classList.add("opacity-0");
      setTimeout(() => {
        modal.classList.add("hidden");
      }, 300);
    }
  }
}
