/**
 * TIMEORA - Luxury Checkout Page
 * Multi-step checkout with customer info, address validation,
 * simulated payment methods, order placement, and receipt generator.
 */

import { store } from "../state/store.js";

export class CheckoutPage {
  static render() {
    const items = store.getCartItems();
    const subtotal = store.getCartSubtotal();
    const discount = store.getCartDiscount();
    const shipping = store.getShippingCost();
    const total = store.getCartTotal();
    const user = store.getUser();

    if (items.length === 0) {
      return `
        <div class="max-w-xl mx-auto px-4 py-24 text-center">
          <div class="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 mx-auto mb-4">
            <i data-lucide="shopping-bag" class="w-7 h-7"></i>
          </div>
          <h2 class="font-serif text-2xl font-semibold text-white mb-2">No Items in Bag to Checkout</h2>
          <p class="text-xs text-zinc-400 mb-6">Please add a luxury timepiece to your shopping bag before proceeding to checkout.</p>
          <a href="#shop" class="px-6 py-3 rounded-xl bg-[#d4af37] text-black font-semibold text-xs uppercase tracking-wider inline-block">
            Browse Catalogue
          </a>
        </div>
      `;
    }

    const defaultAddress = (user && user.addresses && user.addresses.length > 0) ? user.addresses[0] : null;

    const formattedSubtotal = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(subtotal);
    const formattedDiscount = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(discount);
    const formattedShipping = shipping === 0 ? "Complimentary" : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(shipping);
    const formattedTotal = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(total);

    return `
      <div class="checkout-page max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        <!-- Header -->
        <div class="pb-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-widest mb-1">
              <a href="#cart" class="hover:text-[#d4af37] transition-colors">Bag</a>
              <span>/</span>
              <span class="text-[#d4af37]">Secure Checkout</span>
            </div>
            <h1 class="font-serif text-3xl sm:text-4xl font-semibold text-white tracking-tight">
              Haute Horlogerie Acquisition
            </h1>
          </div>
          <div class="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
            <i data-lucide="shield-check" class="w-4 h-4 text-[#d4af37]"></i>
            <span>256-Bit Encrypted Secure Channel</span>
          </div>
        </div>

        <form id="checkout-form" class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <!-- Left Column: Checkout Inputs -->
          <div class="lg:col-span-7 space-y-8">
            
            <!-- 1. Customer Information -->
            <div class="bg-[#111115] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
              <div class="flex items-center justify-between border-b border-white/10 pb-4">
                <div class="flex items-center gap-3">
                  <div class="w-7 h-7 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/50 flex items-center justify-center text-xs font-bold text-[#d4af37]">1</div>
                  <h3 class="font-serif text-lg font-semibold text-white">Client Information</h3>
                </div>
                ${!user ? `
                  <a href="#auth" class="text-xs text-[#d4af37] hover:underline font-mono">Sign In for VIP Perks</a>
                ` : `
                  <span class="text-[11px] font-mono text-emerald-400">Authenticated VIP</span>
                `}
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1">Full Legal Name *</label>
                  <input 
                    type="text" 
                    id="checkout-name" 
                    required 
                    value="${user ? user.name : 'Lord Julian Sterling'}" 
                    placeholder="e.g. Lord Julian Sterling" 
                    class="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]" 
                  />
                </div>
                <div>
                  <label class="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1">Email Address *</label>
                  <input 
                    type="email" 
                    id="checkout-email" 
                    required 
                    value="${user ? user.email : 'julian.sterling@timeora-haute.ch'}" 
                    placeholder="e.g. client@domain.com" 
                    class="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]" 
                  />
                </div>
                <div class="sm:col-span-2">
                  <label class="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1">Direct Telephone / Concierge Contact *</label>
                  <input 
                    type="tel" 
                    id="checkout-phone" 
                    required 
                    value="${user ? user.phone : '+41 22 819 9000'}" 
                    placeholder="+41 22 819 9000" 
                    class="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]" 
                  />
                </div>
              </div>
            </div>

            <!-- 2. Shipping Address -->
            <div class="bg-[#111115] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
              <div class="flex items-center gap-3 border-b border-white/10 pb-4">
                <div class="w-7 h-7 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/50 flex items-center justify-center text-xs font-bold text-[#d4af37]">2</div>
                <h3 class="font-serif text-lg font-semibold text-white">Armored Destination Address</h3>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="sm:col-span-2">
                  <label class="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1">Street Address & Suite/Apt *</label>
                  <input 
                    type="text" 
                    id="checkout-address" 
                    required 
                    value="${defaultAddress ? defaultAddress.address : '14 Rue du Rhône, Suite 7B'}" 
                    placeholder="14 Rue du Rhône, Suite 7B" 
                    class="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]" 
                  />
                </div>
                <div>
                  <label class="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1">City *</label>
                  <input 
                    type="text" 
                    id="checkout-city" 
                    required 
                    value="${defaultAddress ? defaultAddress.city : 'Geneva'}" 
                    placeholder="Geneva" 
                    class="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]" 
                  />
                </div>
                <div>
                  <label class="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1">Postal / ZIP Code *</label>
                  <input 
                    type="text" 
                    id="checkout-postal" 
                    required 
                    value="${defaultAddress ? defaultAddress.postalCode : '1204'}" 
                    placeholder="1204" 
                    class="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]" 
                  />
                </div>
                <div class="sm:col-span-2">
                  <label class="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1">Country / Region *</label>
                  <select id="checkout-country" class="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d4af37]">
                    <option value="Switzerland" selected>Switzerland (CH)</option>
                    <option value="United States">United States (US)</option>
                    <option value="United Kingdom">United Kingdom (UK)</option>
                    <option value="France">France (FR)</option>
                    <option value="Germany">Germany (DE)</option>
                    <option value="United Arab Emirates">United Arab Emirates (UAE)</option>
                    <option value="Monaco">Monaco (MC)</option>
                    <option value="Japan">Japan (JP)</option>
                    <option value="Singapore">Singapore (SG)</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- 3. Payment Method -->
            <div class="bg-[#111115] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
              <div class="flex items-center gap-3 border-b border-white/10 pb-4">
                <div class="w-7 h-7 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/50 flex items-center justify-center text-xs font-bold text-[#d4af37]">3</div>
                <h3 class="font-serif text-lg font-semibold text-white">Payment Method</h3>
              </div>

              <!-- Payment Tabs -->
              <div class="grid grid-cols-3 gap-3">
                <label class="pay-method-tab flex flex-col items-center justify-center p-3.5 rounded-xl border cursor-pointer transition-all bg-[#d4af37]/15 border-[#d4af37] text-white" data-method="card">
                  <input type="radio" name="pay-method" value="card" class="hidden" checked />
                  <i data-lucide="credit-card" class="w-5 h-5 text-[#d4af37] mb-1"></i>
                  <span class="text-[11px] font-mono uppercase tracking-wider">Credit Card</span>
                </label>

                <label class="pay-method-tab flex flex-col items-center justify-center p-3.5 rounded-xl border cursor-pointer transition-all bg-black/40 border-white/10 text-zinc-400 hover:text-white" data-method="wire">
                  <input type="radio" name="pay-method" value="wire" class="hidden" />
                  <i data-lucide="building-2" class="w-5 h-5 mb-1"></i>
                  <span class="text-[11px] font-mono uppercase tracking-wider">Bank Wire</span>
                </label>

                <label class="pay-method-tab flex flex-col items-center justify-center p-3.5 rounded-xl border cursor-pointer transition-all bg-black/40 border-white/10 text-zinc-400 hover:text-white" data-method="cod">
                  <input type="radio" name="pay-method" value="cod" class="hidden" />
                  <i data-lucide="hand-coins" class="w-5 h-5 mb-1"></i>
                  <span class="text-[11px] font-mono uppercase tracking-wider">Vault COD</span>
                </label>
              </div>

              <!-- Credit Card Fields Form -->
              <div id="card-fields-box" class="space-y-4 pt-4 border-t border-white/5">
                <div>
                  <label class="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1">Cardholder Name</label>
                  <input type="text" id="card-holder" value="LORD JULIAN STERLING" class="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-xs text-white font-mono uppercase tracking-wider focus:outline-none focus:border-[#d4af37]" />
                </div>
                <div>
                  <label class="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1">Card Number</label>
                  <input type="text" id="card-number" value="•••• •••• •••• 8842" maxlength="19" class="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-xs text-white font-mono tracking-widest focus:outline-none focus:border-[#d4af37]" />
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1">Expiry Date</label>
                    <input type="text" id="card-expiry" value="09/29" placeholder="MM/YY" maxlength="5" class="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-xs text-white font-mono tracking-widest focus:outline-none focus:border-[#d4af37]" />
                  </div>
                  <div>
                    <label class="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1">Security CVC</label>
                    <input type="password" id="card-cvc" value="882" maxlength="4" class="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-xs text-white font-mono tracking-widest focus:outline-none focus:border-[#d4af37]" />
                  </div>
                </div>
              </div>

            </div>

          </div>

          <!-- Right Column: Order Review Sidebar -->
          <div class="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            
            <div class="bg-[#121216] border border-white/10 rounded-2xl p-6 shadow-xl space-y-6">
              
              <h3 class="font-serif text-xl font-semibold text-white border-b border-white/10 pb-4 flex items-center justify-between">
                <span>Acquisition Summary</span>
                <span class="text-xs font-mono text-zinc-400">${items.length} item${items.length === 1 ? '' : 's'}</span>
              </h3>

              <!-- Miniature Items List -->
              <div class="space-y-3 max-h-60 overflow-y-auto custom-scrollbar pr-1">
                ${items.map(item => `
                  <div class="flex items-center gap-3 p-2 rounded-xl bg-white/[0.02] border border-white/5">
                    <div class="w-14 h-14 rounded-lg bg-[#18181e] p-1 border border-white/10 shrink-0 flex items-center justify-center">
                      <img src="${item.image}" alt="${item.name}" class="w-full h-full object-contain">
                    </div>
                    <div class="flex-1 min-w-0">
                      <span class="text-[9px] font-mono text-[#d4af37] uppercase block truncate">${item.brand}</span>
                      <h4 class="font-serif text-xs font-semibold text-white truncate">${item.name}</h4>
                      <span class="text-[11px] font-mono text-zinc-400">Qty: ${item.quantity}</span>
                    </div>
                    <div class="font-mono text-xs font-bold text-zinc-200">
                      ${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(item.price * item.quantity)}
                    </div>
                  </div>
                `).join("")}
              </div>

              <!-- Price Breakdown -->
              <div class="space-y-2 pt-4 border-t border-white/10 text-xs font-mono">
                <div class="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span class="text-white">${formattedSubtotal}</span>
                </div>
                ${discount > 0 ? `
                  <div class="flex justify-between text-amber-400">
                    <span>VIP Privilege</span>
                    <span>-${formattedDiscount}</span>
                  </div>
                ` : ''}
                <div class="flex justify-between text-zinc-400">
                  <span>Armored Transport</span>
                  <span class="${shipping === 0 ? 'text-emerald-400' : 'text-white'}">${formattedShipping}</span>
                </div>
                <div class="flex justify-between text-base text-white pt-3 border-t border-white/10 font-sans">
                  <span class="font-bold">Total Due</span>
                  <span class="font-mono font-bold text-[#d4af37] text-xl">${formattedTotal}</span>
                </div>
              </div>

              <!-- Place Order Button -->
              <button 
                type="submit" 
                id="place-order-btn" 
                class="w-full py-4 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-black font-semibold text-xs uppercase tracking-[0.2em] hover:brightness-110 active:scale-98 shadow-[0_10px_30px_rgba(212,175,55,0.3)] transition-all flex items-center justify-center gap-2"
              >
                <i data-lucide="check-circle" class="w-4 h-4"></i>
                <span id="place-order-text">Place Luxury Order</span>
              </button>

              <div class="space-y-2 text-[10px] font-mono text-zinc-400 text-center">
                <p>✓ Covered by Lloyd's of London Transit Underwriting</p>
                <p>✓ 14-Day Vault Return Privilege with Full Refund</p>
              </div>

            </div>

          </div>

        </form>

      </div>
    `;
  }

  static setupEvents() {
    // Payment method tabs toggle
    document.querySelectorAll(".pay-method-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        const method = tab.getAttribute("data-method");
        document.querySelectorAll(".pay-method-tab").forEach(t => {
          t.classList.remove("bg-[#d4af37]/15", "border-[#d4af37]", "text-white");
          t.classList.add("bg-black/40", "border-white/10", "text-zinc-400");
        });
        tab.classList.add("bg-[#d4af37]/15", "border-[#d4af37]", "text-white");
        tab.classList.remove("bg-black/40", "border-white/10", "text-zinc-400");

        const cardBox = document.getElementById("card-fields-box");
        if (cardBox) {
          if (method === "card") cardBox.classList.remove("hidden");
          else cardBox.classList.add("hidden");
        }
      });
    });

    // Form Submission / Place Order
    const form = document.getElementById("checkout-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const name = document.getElementById("checkout-name").value.trim();
        const email = document.getElementById("checkout-email").value.trim();
        const phone = document.getElementById("checkout-phone").value.trim();
        const address = document.getElementById("checkout-address").value.trim();
        const city = document.getElementById("checkout-city").value.trim();
        const postalCode = document.getElementById("checkout-postal").value.trim();
        const country = document.getElementById("checkout-country").value;

        if (!name || !email || !phone || !address || !city || !postalCode) {
          store.showToast({ title: "Missing Information", message: "Please complete all required shipping fields.", type: "error" });
          return;
        }

        const btn = document.getElementById("place-order-btn");
        const btnText = document.getElementById("place-order-text");
        if (btn && btnText) {
          btn.disabled = true;
          btnText.textContent = "Authorizing Transaction...";
        }

        setTimeout(() => {
          const selectedMethodEl = document.querySelector("input[name='pay-method']:checked");
          const methodVal = selectedMethodEl ? selectedMethodEl.value : "card";
          let methodLabel = "Encrypted Credit Card (•••• 8842)";
          if (methodVal === "wire") methodLabel = "Bank Wire Transfer (SWIFT/IBAN)";
          if (methodVal === "cod") methodLabel = "Vault Cash on Delivery";

          const newOrder = store.createOrder({
            fullName: name,
            email,
            phone,
            address,
            city,
            postalCode,
            country,
            paymentMethodName: methodLabel
          });

          store.showToast({
            title: "Order Confirmed!",
            message: `Your acquisition #${newOrder.id} has been registered with the Geneva Atelier.`,
            type: "success"
          });

          window.location.hash = `#order-success-${newOrder.id}`;
        }, 1200);
      });
    }
  }
}
