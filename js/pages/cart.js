/**
 * TIMEORA - Dedicated Shopping Bag Page
 */

import { store, formatPrice } from "../state/store.js";

export class CartPage {
  static render() {
    const items = store.getCartItems();
    const count = store.getCartCount();
    const subtotal = store.getCartSubtotal();
    const discount = store.getCartDiscount();
    const shipping = store.getShippingCost();
    const total = store.getCartTotal();

    const formattedSubtotal = formatPrice(subtotal);
    const formattedDiscount = formatPrice(discount);
    const formattedShipping = shipping === 0 ? "Complimentary" : formatPrice(shipping);
    const formattedTotal = formatPrice(total);

    return `
      <div class="cart-page max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        <!-- Breadcrumb & Header -->
        <div class="pb-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-widest mb-2">
              <a href="#home" class="hover:text-[#d4af37] transition-colors">Maison</a>
              <span>/</span>
              <span class="text-[#d4af37]">Shopping Bag</span>
            </div>
            <h1 class="font-serif text-3xl sm:text-4xl font-semibold text-white tracking-tight">
              Your Shopping Bag
            </h1>
          </div>
          <span class="text-xs font-mono text-zinc-400">
            ${count} master timepiece${count === 1 ? '' : 's'} selected
          </span>
        </div>

        ${items.length === 0 ? `
          <div class="py-20 text-center bg-[#111115] border border-dashed border-white/15 rounded-3xl p-8 max-w-2xl mx-auto">
            <div class="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 mx-auto mb-6">
              <i data-lucide="shopping-bag" class="w-10 h-10"></i>
            </div>
            <h2 class="font-serif text-2xl font-semibold text-white mb-2">Your Shopping Bag is Empty</h2>
            <p class="text-xs text-zinc-400 max-w-sm mx-auto mb-8 leading-relaxed">
              Explore our Swiss Haute Horlogerie catalog and acquire your signature heirloom.
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
          <!-- Active Cart Layout: Table + Order Summary -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            <!-- Left: Items List -->
            <div class="lg:col-span-8 space-y-4">
              
              <div class="bg-[#111115] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
                <div class="hidden sm:grid grid-cols-12 gap-4 p-4 border-b border-white/10 text-[11px] font-mono uppercase tracking-wider text-zinc-500 bg-black/40">
                  <div class="col-span-6">Timepiece</div>
                  <div class="col-span-2 text-center">Unit Price</div>
                  <div class="col-span-2 text-center">Quantity</div>
                  <div class="col-span-2 text-right">Subtotal</div>
                </div>

                <div class="divide-y divide-white/5">
                  ${items.map(item => {
                    const unitPrice = formatPrice(item.price);
                    const itemTotal = formatPrice(item.price * item.quantity);
                    return `
                      <div class="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                        
                        <!-- Watch Details -->
                        <div class="sm:col-span-6 flex items-center gap-4">
                          <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-[#18181e] p-2 border border-white/10 shrink-0 flex items-center justify-center">
                            <img src="${item.image}" alt="${item.name}" class="w-full h-full object-contain filter drop-shadow">
                          </div>
                          <div class="min-w-0">
                            <span class="text-[10px] font-mono text-[#d4af37] uppercase tracking-wider block">${item.brand}</span>
                            <h3 class="font-serif text-sm sm:text-base font-semibold text-white truncate">
                              <a href="#product-${item.productId}" class="hover:text-[#d4af37] transition-colors">${item.name}</a>
                            </h3>
                            <button class="cart-remove-item text-[11px] text-zinc-500 hover:text-rose-400 transition-colors mt-2 flex items-center gap-1" data-product-id="${item.productId}">
                              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                              <span>Remove from Bag</span>
                            </button>
                          </div>
                        </div>

                        <!-- Unit Price -->
                        <div class="sm:col-span-2 text-left sm:text-center">
                          <span class="sm:hidden text-zinc-500 text-xs font-mono">Price: </span>
                          <span class="font-mono text-xs sm:text-sm text-zinc-300 font-semibold">${unitPrice}</span>
                        </div>

                        <!-- Quantity Selector -->
                        <div class="sm:col-span-2 flex items-center sm:justify-center">
                          <div class="flex items-center border border-white/15 rounded-xl bg-black/60 overflow-hidden">
                            <button class="cart-dec-btn px-3 py-1 text-zinc-400 hover:text-white transition-colors" data-product-id="${item.productId}">-</button>
                            <span class="px-2.5 py-1 text-xs font-mono text-white">${item.quantity}</span>
                            <button class="cart-inc-btn px-3 py-1 text-zinc-400 hover:text-white transition-colors" data-product-id="${item.productId}">+</button>
                          </div>
                        </div>

                        <!-- Subtotal -->
                        <div class="sm:col-span-2 text-left sm:text-right">
                          <span class="sm:hidden text-zinc-500 text-xs font-mono">Total: </span>
                          <span class="font-mono text-sm sm:text-base font-bold text-[#d4af37]">${itemTotal}</span>
                        </div>

                      </div>
                    `;
                  }).join("")}
                </div>
              </div>

              <!-- Continue Shopping Link -->
              <div class="flex items-center justify-between pt-2">
                <a href="#shop" class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#d4af37] hover:text-white transition-colors">
                  <i data-lucide="arrow-left" class="w-4 h-4"></i>
                  <span>Continue Exploring Watches</span>
                </a>
                <button id="clear-full-cart-btn" class="text-xs text-zinc-500 hover:text-rose-400 font-mono transition-colors">
                  Clear Entire Bag
                </button>
              </div>

            </div>

            <!-- Right: Order Summary & Coupon -->
            <div class="lg:col-span-4 space-y-6">
              
              <div class="bg-[#121216] border border-white/10 rounded-2xl p-6 shadow-xl space-y-6">
                <h3 class="font-serif text-xl font-semibold text-white border-b border-white/10 pb-4">
                  Order Summary
                </h3>

                <!-- Coupon Form -->
                <div class="space-y-2">
                  <label class="text-xs font-mono uppercase tracking-wider text-zinc-400 block">Privilege / Promo Code</label>
                  ${store.appliedCoupon ? `
                    <div class="flex items-center justify-between p-3 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/40 text-xs">
                      <div>
                        <span class="font-mono font-bold text-[#d4af37]">${store.appliedCoupon.code}</span>
                        <p class="text-[10px] text-zinc-300">${store.appliedCoupon.label}</p>
                      </div>
                      <button id="remove-coupon-btn" class="text-zinc-400 hover:text-white p-1" aria-label="Remove coupon">
                        <i data-lucide="x" class="w-4 h-4"></i>
                      </button>
                    </div>
                  ` : `
                    <form id="cart-coupon-form" class="flex gap-2">
                      <input 
                        type="text" 
                        id="cart-coupon-input" 
                        placeholder="e.g. TIMEORA10" 
                        class="flex-1 bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white uppercase placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                      />
                      <button 
                        type="submit" 
                        class="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-[#d4af37] text-white hover:text-black font-semibold text-xs uppercase tracking-wider transition-all"
                      >
                        Apply
                      </button>
                    </form>
                    <p class="text-[10px] text-zinc-500 font-mono">Try code: TIMEORA10 (10% off) or LUXURY50 (Rs. 500 off)</p>
                  `}
                </div>

                <!-- Shipping Method Selection -->
                <div class="space-y-2 pt-4 border-t border-white/10">
                  <label class="text-xs font-mono uppercase tracking-wider text-zinc-400 block">Armored Delivery Method</label>
                  <div class="space-y-2 text-xs">
                    <label class="flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${store.shippingMethod === 'complimentary' ? 'bg-[#d4af37]/10 border-[#d4af37]/60 text-white' : 'bg-black/40 border-white/10 text-zinc-400'}">
                      <div class="flex items-center gap-2">
                        <input type="radio" name="shipping-method" value="complimentary" class="shipping-radio hidden" ${store.shippingMethod === 'complimentary' ? 'checked' : ''} />
                        <span>Insured Diplomatic Courier (3-5 Days)</span>
                      </div>
                      <span class="text-emerald-400 font-mono">Free</span>
                    </label>

                    <label class="flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${store.shippingMethod === 'express' ? 'bg-[#d4af37]/10 border-[#d4af37]/60 text-white' : 'bg-black/40 border-white/10 text-zinc-400'}">
                      <div class="flex items-center gap-2">
                        <input type="radio" name="shipping-method" value="express" class="shipping-radio hidden" ${store.shippingMethod === 'express' ? 'checked' : ''} />
                        <span>Next-Day Air Priority (Rs. 150)</span>
                      </div>
                      <span class="font-mono text-zinc-200">Rs. 150</span>
                    </label>

                    <label class="flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${store.shippingMethod === 'whiteglove' ? 'bg-[#d4af37]/10 border-[#d4af37]/60 text-white' : 'bg-black/40 border-white/10 text-zinc-400'}">
                      <div class="flex items-center gap-2">
                        <input type="radio" name="shipping-method" value="whiteglove" class="shipping-radio hidden" ${store.shippingMethod === 'whiteglove' ? 'checked' : ''} />
                        <span>White Glove Armored Concierge (Rs. 350)</span>
                      </div>
                      <span class="font-mono text-zinc-200">Rs. 350</span>
                    </label>
                  </div>
                </div>

                <!-- Price Breakdown -->
                <div class="space-y-2.5 pt-4 border-t border-white/10 text-xs font-mono">
                  <div class="flex justify-between text-zinc-400">
                    <span>Bag Subtotal</span>
                    <span class="text-white font-semibold">${formattedSubtotal}</span>
                  </div>

                  ${discount > 0 ? `
                    <div class="flex justify-between text-amber-400">
                      <span>Privilege Discount</span>
                      <span>-${formattedDiscount}</span>
                    </div>
                  ` : ''}

                  <div class="flex justify-between text-zinc-400">
                    <span>Shipping & Insurance</span>
                    <span class="${shipping === 0 ? 'text-emerald-400' : 'text-white font-semibold'}">${formattedShipping}</span>
                  </div>

                  <div class="flex justify-between text-zinc-400">
                    <span>Estimated Customs & Taxes</span>
                    <span class="text-zinc-400 font-mono">Included</span>
                  </div>

                  <div class="flex justify-between text-base text-white pt-4 border-t border-white/10 font-sans">
                    <span class="font-bold">Total Amount</span>
                    <span class="font-mono font-bold text-[#d4af37] text-xl">${formattedTotal}</span>
                  </div>
                </div>

                <!-- Checkout CTA -->
                <a 
                  href="#checkout" 
                  class="block w-full py-4 text-center rounded-xl bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-black font-semibold text-xs uppercase tracking-[0.2em] hover:brightness-110 active:scale-98 shadow-[0_10px_30px_rgba(212,175,55,0.3)] transition-all"
                >
                  Proceed to Secure Checkout
                </a>

                <div class="flex items-center justify-center gap-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest pt-2">
                  <i data-lucide="lock" class="w-3 h-3 text-[#d4af37]"></i>
                  <span>End-to-End Encrypted Checkout</span>
                </div>

              </div>

            </div>

          </div>
        `}

      </div>
    `;
  }

  static setupEvents() {
    // Remove Item
    document.querySelectorAll(".cart-remove-item").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-product-id");
        if (id) store.removeFromCart(id);
      });
    });

    // Quantity Dec
    document.querySelectorAll(".cart-dec-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-product-id");
        const item = store.getCartItems().find(i => i.productId === id);
        if (item) store.updateCartQuantity(id, item.quantity - 1);
      });
    });

    // Quantity Inc
    document.querySelectorAll(".cart-inc-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-product-id");
        const item = store.getCartItems().find(i => i.productId === id);
        if (item) store.updateCartQuantity(id, item.quantity + 1);
      });
    });

    // Clear Cart
    const clearBtn = document.getElementById("clear-full-cart-btn");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => store.clearCart());
    }

    // Coupon form
    const couponForm = document.getElementById("cart-coupon-form");
    if (couponForm) {
      couponForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = document.getElementById("cart-coupon-input");
        if (input && input.value) {
          const res = store.applyCoupon(input.value);
          if (!res.success) {
            store.showToast({ title: "Coupon Error", message: res.message, type: "error" });
          }
        }
      });
    }

    // Remove coupon
    const removeCouponBtn = document.getElementById("remove-coupon-btn");
    if (removeCouponBtn) {
      removeCouponBtn.addEventListener("click", () => store.removeCoupon());
    }

    // Shipping Radios
    document.querySelectorAll(".shipping-radio").forEach(radio => {
      radio.parentElement.addEventListener("click", () => {
        store.setShippingMethod(radio.value);
      });
    });
  }
}
