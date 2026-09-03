/**
 * TIMEORA - Luxury Product Card Component
 * Rich micro-interactions, Wishlist toggle, Quick View trigger, Add to Cart action,
 * and high-definition luxury watch presentation.
 */

import { store } from "../state/store.js";

export class ProductCard {
  static render(product, options = {}) {
    const isWishlisted = store.isInWishlist(product.id);
    const hasDiscount = product.discount && product.discount > 0;
    const formattedPrice = `Rs. ${product.price.toLocaleString("en-PK")}`;
    const formattedOriginalPrice = product.originalPrice ? `Rs. ${product.originalPrice.toLocaleString("en-PK")}` : null;

    return `
      <div class="product-card group relative bg-gradient-to-b from-[#141418] to-[#0f0f12] rounded-2xl border border-white/10 hover:border-[#d4af37]/50 shadow-xl transition-all duration-500 flex flex-col justify-between overflow-hidden hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)]" data-product-id="${product.id}">
        
        <!-- Top Badges & Wishlist Action -->
        <div class="relative w-full aspect-square overflow-hidden bg-[#18181c] p-6 flex items-center justify-center">
          
          <!-- Badges Overlay -->
          <div class="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
            ${product.isNew ? `
              <span class="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-widest bg-[#d4af37] text-black shadow-md">
                Novelty
              </span>
            ` : ''}
            ${hasDiscount ? `
              <span class="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-widest bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-md">
                -${product.discount}%
              </span>
            ` : ''}
            ${product.isBestSeller ? `
              <span class="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-widest bg-white/10 text-zinc-200 border border-white/15 backdrop-blur-md">
                Bestseller
              </span>
            ` : ''}
          </div>

          <!-- Wishlist Button -->
          <button 
            class="product-wishlist-btn absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-zinc-400 hover:text-red-400 hover:border-red-400/50 hover:bg-black transition-all ${isWishlisted ? 'text-red-500 border-red-500/50 bg-black' : ''}" 
            data-product-id="${product.id}"
            aria-label="Save to Wishlist"
          >
            <i data-lucide="heart" class="w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}"></i>
          </button>

          <!-- Static High-Definition Product Image (No hover swap, no hover zoom) -->
          <a href="#product-${product.id}" class="block w-full h-full relative cursor-pointer">
            <img 
              src="${product.images[0]}" 
              alt="${product.name}" 
              loading="lazy" 
              class="product-img-primary w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.7)]"
            />
          </a>

          <!-- Quick View Hover Button -->
          <div class="absolute inset-x-4 bottom-3 z-10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
            <button 
              class="quick-view-btn w-full py-2.5 rounded-xl bg-black/80 hover:bg-black text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-md border border-[#d4af37]/40 hover:border-[#d4af37] flex items-center justify-center gap-2 shadow-xl transition-all"
              data-product-id="${product.id}"
            >
              <i data-lucide="eye" class="w-3.5 h-3.5 text-[#d4af37]"></i>
              Quick View
            </button>
          </div>

        </div>

        <!-- Product Details -->
        <div class="p-5 flex flex-col flex-1 justify-between bg-gradient-to-b from-transparent to-black/40">
          
          <div>
            <div class="flex items-center justify-between gap-2 mb-1">
              <span class="text-[11px] font-mono tracking-widest text-[#d4af37] uppercase truncate">${product.brand}</span>
              <span class="text-[10px] text-zinc-500 font-mono tracking-wider">${product.category}</span>
            </div>

            <h3 class="font-serif text-base font-semibold text-white group-hover:text-[#d4af37] transition-colors leading-snug line-clamp-1 mb-2">
              <a href="#product-${product.id}">${product.name}</a>
            </h3>

            <!-- Rating & Reviews -->
            <div class="flex items-center gap-2 mb-3">
              <div class="flex text-amber-400">
                ${Array(5).fill(0).map((_, i) => `
                  <i data-lucide="star" class="w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-zinc-600'}"></i>
                `).join('')}
              </div>
              <span class="text-[11px] font-mono text-zinc-400">${product.rating.toFixed(1)}</span>
              <span class="text-[10px] text-zinc-600">(${product.reviewCount})</span>
            </div>

            <!-- Specs Snippet -->
            <div class="flex items-center gap-2 text-[10px] text-zinc-400 mb-4 font-mono">
              <span class="px-2 py-0.5 rounded bg-white/5 border border-white/5 truncate">${product.specs.caseMaterial.split(' ')[0]} ${product.specs.caseDiameter}</span>
              <span class="px-2 py-0.5 rounded bg-white/5 border border-white/5 truncate">${product.specs.waterResistance.split(' ')[0]}</span>
            </div>
          </div>

          <!-- Price & Financials -->
          <div class="pt-3 border-t border-white/10 flex items-baseline justify-between mb-3">
            <span class="text-[11px] font-mono uppercase tracking-wider text-zinc-400">Price</span>
            <div class="text-right">
              <div class="text-xs text-zinc-500 line-through ${hasDiscount ? 'block' : 'hidden'} font-mono">
                ${formattedOriginalPrice}
              </div>
              <div class="font-mono text-base sm:text-lg font-bold text-white tracking-tight text-glow">
                ${formattedPrice}
              </div>
            </div>
          </div>

          <!-- Dual Action Buttons: VIEW DETAILS & PLACE ORDER -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 pt-1">
            
            <!-- Button 1: VIEW DETAILS (Left) -->
            <a 
              href="#product-${product.id}" 
              class="product-view-details-btn w-full py-2.5 px-2.5 rounded-full border border-[#d4af37]/70 hover:border-[#d4af37] bg-black/40 hover:bg-[#d4af37]/15 text-[#d4af37] font-semibold text-[11px] uppercase tracking-wider text-center flex items-center justify-center transition-all duration-300 shadow-sm"
              data-product-id="${product.id}"
            >
              <span>VIEW DETAILS</span>
            </a>

            <!-- Button 2: PLACE ORDER (Right) -->
            <button 
              class="product-place-order-btn w-full py-2.5 px-2.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#dfbe53] to-[#e8cb6e] hover:from-[#e5c158] hover:via-[#ebd074] hover:to-[#f3da87] text-black font-bold text-[11px] uppercase tracking-wider text-center flex items-center justify-center transition-all duration-300 shadow-[0_4px_15px_rgba(212,175,55,0.3)] hover:shadow-[0_6px_22px_rgba(212,175,55,0.5)] active:scale-[0.98]"
              data-product-id="${product.id}"
            >
              <span>PLACE ORDER</span>
            </button>
            
          </div>

        </div>

      </div>
    `;
  }

  static setupCardEvents(container = document) {
    // Wishlist Toggle Buttons
    container.querySelectorAll(".product-wishlist-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const productId = btn.getAttribute("data-product-id");
        if (!productId) return;

        const isSaved = store.toggleWishlist(productId);
        const icon = btn.querySelector("i");
        if (isSaved) {
          btn.classList.add("text-red-500", "border-red-500/50", "bg-black");
          if (icon) {
            icon.classList.add("fill-red-500", "text-red-500");
          }
        } else {
          btn.classList.remove("text-red-500", "border-red-500/50", "bg-black");
          if (icon) {
            icon.classList.remove("fill-red-500", "text-red-500");
          }
        }
      });
    });

    // Place Order Buttons (Opens Fast Order Form Modal)
    container.querySelectorAll(".product-place-order-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const productId = btn.getAttribute("data-product-id");
        if (productId) {
          store.emit("orderModal:open", productId);
        }
      });
    });

    // View Details Buttons
    container.querySelectorAll(".product-view-details-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const productId = btn.getAttribute("data-product-id");
        if (productId) {
          window.location.hash = `#product-${productId}`;
        }
      });
    });

    // Quick View Buttons
    container.querySelectorAll(".quick-view-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const productId = btn.getAttribute("data-product-id");
        if (productId) {
          store.emit("quickView:open", productId);
        }
      });
    });
  }
}
