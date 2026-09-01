/**
 * TIMEORA - Wishlist Page
 */

import { PRODUCTS } from "../data/products.js";
import { ProductCard } from "../components/productCard.js";
import { store } from "../state/store.js";

export class WishlistPage {
  static render() {
    const wishlistIds = store.getWishlist();
    const wishlistedProducts = PRODUCTS.filter(p => wishlistIds.includes(p.id));

    return `
      <div class="wishlist-page max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        <!-- Breadcrumb & Header -->
        <div class="pb-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">
              <a href="#home" class="hover:text-[#d4af37] transition-colors">Maison</a>
              <span>/</span>
              <span class="text-[#d4af37]">Private Wishlist</span>
            </div>
            <h1 class="font-serif text-3xl sm:text-4xl font-semibold text-white tracking-tight">
              Curated Private Wishlist
            </h1>
          </div>

          ${wishlistedProducts.length > 0 ? `
            <div class="flex items-center gap-3">
              <button id="wishlist-move-all-btn" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-black font-semibold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg transition-all flex items-center gap-2">
                <i data-lucide="shopping-bag" class="w-4 h-4"></i>
                Move All to Bag
              </button>
              <button id="wishlist-clear-btn" class="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-rose-500/20 text-zinc-300 hover:text-rose-300 border border-white/10 text-xs font-mono transition-all">
                Clear
              </button>
            </div>
          ` : ''}
        </div>

        ${wishlistedProducts.length === 0 ? `
          <div class="py-20 text-center bg-[#111115] border border-dashed border-white/15 rounded-3xl p-8 max-w-2xl mx-auto">
            <div class="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 mx-auto mb-6">
              <i data-lucide="heart" class="w-10 h-10"></i>
            </div>
            <h2 class="font-serif text-2xl font-semibold text-white mb-2">Your Wishlist is Empty</h2>
            <p class="text-xs text-zinc-400 max-w-sm mx-auto mb-8 leading-relaxed">
              Save your favorite Haute Horlogerie pieces by tapping the heart icon on any timepiece.
            </p>
            <a 
              href="#shop" 
              class="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-black font-semibold text-xs uppercase tracking-widest hover:brightness-110 shadow-xl transition-all"
            >
              <span>Explore Masterpieces</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </a>
          </div>
        ` : `
          <!-- Wishlist Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="wishlist-products-grid">
            ${wishlistedProducts.map(p => ProductCard.render(p)).join("")}
          </div>
        `}

      </div>
    `;
  }

  static setupEvents() {
    ProductCard.setupCardEvents(document.getElementById("wishlist-products-grid") || document);

    const moveAllBtn = document.getElementById("wishlist-move-all-btn");
    if (moveAllBtn) {
      moveAllBtn.addEventListener("click", () => {
        store.moveAllWishlistToCart();
      });
    }

    const clearBtn = document.getElementById("wishlist-clear-btn");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        store.clearWishlist();
      });
    }
  }
}
