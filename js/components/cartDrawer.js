/**
 * TIMEORA - Slide-Out Quick Cart Drawer
 */

import { store, formatPrice } from "../state/store.js";

export class CartDrawer {
  static init() {
    let drawer = document.getElementById("timeora-cart-drawer");
    if (!drawer) {
      drawer = document.createElement("div");
      drawer.id = "timeora-cart-drawer";
      drawer.className = "fixed inset-0 z-[100] bg-black/80 backdrop-blur-md hidden transition-opacity duration-300";
      drawer.innerHTML = `
        <div class="fixed inset-y-0 right-0 max-w-md w-full bg-[#0f0f13] border-l border-[#d4af37]/30 flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.9)] transform translate-x-full transition-transform duration-300" id="cart-drawer-panel">
          
          <!-- Header -->
          <div class="p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
                <i data-lucide="shopping-bag" class="w-4 h-4"></i>
              </div>
              <div>
                <h3 class="font-serif text-lg font-semibold text-white tracking-wide">Shopping Bag</h3>
                <span id="cart-drawer-item-count" class="text-[11px] text-zinc-400 font-mono">0 items</span>
              </div>
            </div>
            <button id="close-cart-drawer-btn" class="p-2 text-zinc-400 hover:text-white rounded-lg transition-colors" aria-label="Close Shopping Bag">
              <i data-lucide="x" class="w-5 h-5"></i>
            </button>
          </div>

          <!-- Items Scroll Area -->
          <div class="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar" id="cart-drawer-items">
            <!-- Rendered dynamically -->
          </div>

          <!-- Footer Summary & Actions -->
          <div class="p-6 border-t border-white/10 bg-black/60 space-y-4">
            
            <!-- Subtotal Calculation -->
            <div class="space-y-1.5 text-xs font-mono">
              <div class="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span id="cart-drawer-subtotal" class="text-white font-bold">Rs. 0</span>
              </div>
              <div class="flex justify-between text-zinc-400">
                <span>Shipping</span>
                <span class="text-emerald-400">Complimentary</span>
              </div>
              <div class="flex justify-between text-sm text-white pt-2 border-t border-white/10">
                <span class="font-sans font-semibold">Estimated Total</span>
                <span id="cart-drawer-total" class="font-bold text-[#d4af37] text-base">Rs. 0</span>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="grid grid-cols-2 gap-3 pt-2">
              <a 
                href="#cart" 
                id="cart-drawer-view-bag-btn" 
                class="py-3 text-center rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-widest border border-white/15 transition-all"
              >
                View Bag
              </a>
              <a 
                href="#checkout" 
                id="cart-drawer-checkout-btn" 
                class="py-3 text-center rounded-xl bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-black font-semibold text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 shadow-[0_4px_20px_rgba(212,175,55,0.25)] transition-all"
              >
                Checkout
              </a>
            </div>

            <p class="text-[10px] text-zinc-500 text-center tracking-wider uppercase font-mono">
              🔒 256-Bit Encrypted Secure Checkout
            </p>
          </div>

        </div>
      `;
      document.body.appendChild(drawer);
    }

    // Toggle store listener
    store.subscribe("cartDrawer:toggle", (open) => {
      if (open) CartDrawer.open();
      else CartDrawer.close();
    });

    // Cart updated listener
    store.subscribe("cart:updated", () => {
      CartDrawer.renderItems();
    });

    CartDrawer.setupEvents();
  }

  static setupEvents() {
    const drawer = document.getElementById("timeora-cart-drawer");
    const closeBtn = document.getElementById("cart-drawer-close-btn");
    const viewBagBtn = document.getElementById("cart-drawer-view-bag-btn");
    const checkoutBtn = document.getElementById("cart-drawer-checkout-btn");

    if (drawer) {
      drawer.addEventListener("click", (e) => {
        if (e.target === drawer) CartDrawer.close();
      });
    }

    if (closeBtn) closeBtn.addEventListener("click", CartDrawer.close);
    if (viewBagBtn) viewBagBtn.addEventListener("click", CartDrawer.close);
    if (checkoutBtn) checkoutBtn.addEventListener("click", CartDrawer.close);
  }

  static open() {
    const drawer = document.getElementById("timeora-cart-drawer");
    const panel = document.getElementById("cart-drawer-panel");
    if (drawer && panel) {
      CartDrawer.renderItems();
      drawer.classList.remove("hidden");
      requestAnimationFrame(() => {
        panel.classList.remove("translate-x-full");
      });
      if (window.lucide) window.lucide.createIcons();
    }
  }

  static close() {
    const drawer = document.getElementById("timeora-cart-drawer");
    const panel = document.getElementById("cart-drawer-panel");
    if (drawer && panel) {
      panel.classList.add("translate-x-full");
      setTimeout(() => {
        drawer.classList.add("hidden");
      }, 300);
    }
  }

  static renderItems() {
    const container = document.getElementById("cart-drawer-items");
    const countEl = document.getElementById("cart-drawer-item-count");
    const subtotalEl = document.getElementById("cart-drawer-subtotal");
    const totalEl = document.getElementById("cart-drawer-total");
    if (!container) return;

    const items = store.getCartItems();
    const count = store.getCartCount();
    const subtotal = store.getCartSubtotal();
    const total = store.getCartTotal();

    const formattedSubtotal = formatPrice(subtotal);
    const formattedTotal = formatPrice(total);

    if (countEl) countEl.textContent = `${count} timepiece${count === 1 ? '' : 's'}`;
    if (subtotalEl) subtotalEl.textContent = formattedSubtotal;
    if (totalEl) totalEl.textContent = formattedTotal;

    if (items.length === 0) {
      container.innerHTML = `
        <div class="h-full flex flex-col items-center justify-center text-center py-12">
          <div class="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 mb-4">
            <i data-lucide="shopping-bag" class="w-7 h-7"></i>
          </div>
          <h4 class="font-serif text-lg font-medium text-white mb-1">Your Bag is Empty</h4>
          <p class="text-xs text-zinc-400 max-w-xs mb-6">Discover our curated selection of luxury handcrafted timepieces.</p>
          <a 
            href="#shop" 
            class="px-6 py-2.5 rounded-xl bg-[#d4af37] text-black font-semibold text-xs uppercase tracking-wider hover:brightness-110 transition-all"
            onclick="document.getElementById('timeora-cart-drawer').classList.add('hidden')"
          >
            Explore Catalog
          </a>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    container.innerHTML = items.map(item => {
      const itemFormattedPrice = formatPrice(item.price);
      return `
        <div class="flex gap-4 p-3 rounded-xl bg-white/[0.03] border border-white/5 relative group">
          <div class="w-20 h-20 rounded-lg bg-[#18181e] p-1.5 border border-white/10 shrink-0 flex items-center justify-center">
            <img src="${item.image}" alt="${item.name}" class="w-full h-full object-contain filter drop-shadow">
          </div>
          <div class="flex-1 min-w-0 flex flex-col justify-between">
            <div>
              <div class="flex items-start justify-between gap-2">
                <span class="text-[10px] font-mono text-[#d4af37] uppercase truncate">${item.brand}</span>
                <button class="cart-drawer-remove text-zinc-500 hover:text-rose-400 transition-colors p-1" data-product-id="${item.productId}" aria-label="Remove item">
                  <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                </button>
              </div>
              <h4 class="font-serif text-xs font-semibold text-white truncate leading-tight">${item.name}</h4>
              <span class="text-xs font-mono font-bold text-zinc-200 mt-1 block">${itemFormattedPrice}</span>
            </div>

            <!-- Quantity controls -->
            <div class="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
              <div class="flex items-center border border-white/15 rounded-lg bg-black/50 overflow-hidden">
                <button class="cart-drawer-dec px-2 py-0.5 text-zinc-400 hover:text-white text-xs" data-product-id="${item.productId}">-</button>
                <span class="px-2.5 py-0.5 text-xs font-mono text-white">${item.quantity}</span>
                <button class="cart-drawer-inc px-2 py-0.5 text-zinc-400 hover:text-white text-xs" data-product-id="${item.productId}">+</button>
              </div>
              <span class="text-xs font-mono text-[#d4af37] font-semibold">
                ${formatPrice(item.price * item.quantity)}
              </span>
            </div>
          </div>
        </div>
      `;
    }).join("");

    if (window.lucide) window.lucide.createIcons();

    // Event listeners for item controls
    container.querySelectorAll(".cart-drawer-remove").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-product-id");
        if (id) store.removeFromCart(id);
      });
    });

    container.querySelectorAll(".cart-drawer-dec").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-product-id");
        const item = items.find(i => i.productId === id);
        if (item) store.updateCartQuantity(id, item.quantity - 1);
      });
    });

    container.querySelectorAll(".cart-drawer-inc").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-product-id");
        const item = items.find(i => i.productId === id);
        if (item) store.updateCartQuantity(id, item.quantity + 1);
      });
    });
  }
}
