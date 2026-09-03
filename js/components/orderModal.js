/**
 * TIMEORA - Fast Luxury Order Modal Component
 * Allows customers to quickly place an order for a specific timepiece,
 * dynamically calculate totals in PKR (Rs.), and submit directly via WhatsApp.
 */

import { PRODUCTS } from "../data/products.js";
import { store, formatPrice } from "../state/store.js";
import { Storage } from "../state/storage.js";

export class OrderModal {
  static currentProduct = null;
  static currentQuantity = 1;
  static currentSize = "";

  static init() {
    let modal = document.getElementById("timeora-order-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "timeora-order-modal";
      modal.className = "fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md hidden opacity-0 transition-opacity duration-300";
      document.body.appendChild(modal);
    }

    // Subscribe to open event
    store.subscribe("orderModal:open", (productId) => {
      OrderModal.open(productId);
    });

    // Close on backdrop click
    modal.addEventListener("click", (e) => {
      if (e.target === modal) OrderModal.close();
    });

    // Close on ESC key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        OrderModal.close();
      }
    });
  }

  static open(productId) {
    const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
    if (!product) return;

    OrderModal.currentProduct = product;
    OrderModal.currentQuantity = 1;

    // Available sizes/variants for the watch
    const availableSizes = OrderModal.getAvailableSizes(product);
    OrderModal.currentSize = availableSizes.length > 0 ? availableSizes[0] : "";

    const modal = document.getElementById("timeora-order-modal");
    if (!modal) return;

    modal.innerHTML = OrderModal.renderModalContent(product, availableSizes);

    // Show modal with smooth scale & fade
    modal.classList.remove("hidden");
    setTimeout(() => {
      modal.classList.remove("opacity-0");
      const content = document.getElementById("order-modal-content");
      if (content) {
        content.classList.remove("scale-95");
        content.classList.add("scale-100");
      }
    }, 10);

    // Initialize Lucide icons
    if (window.lucide) window.lucide.createIcons();

    // Attach form and interactivity events
    OrderModal.setupEvents(product, availableSizes);
  }

  static close() {
    const modal = document.getElementById("timeora-order-modal");
    if (!modal) return;

    const content = document.getElementById("order-modal-content");
    if (content) {
      content.classList.remove("scale-100");
      content.classList.add("scale-95");
    }
    modal.classList.add("opacity-0");

    setTimeout(() => {
      modal.classList.add("hidden");
      modal.innerHTML = "";
    }, 250);
  }

  static getAvailableSizes(product) {
    if (product.sizes && Array.isArray(product.sizes) && product.sizes.length > 0) {
      return product.sizes;
    }
    // If case diameter exists in specs, provide elegant diameter variants
    if (product.specs && product.specs.caseDiameter) {
      const baseDiameter = parseInt(product.specs.caseDiameter, 10) || 41;
      return [
        `${baseDiameter} mm (Standard)`,
        `${baseDiameter - 2} mm (Classic / Slim)`,
        `${baseDiameter + 2} mm (Grand / Executive)`
      ];
    }
    return ["Standard (41 mm)"];
  }

  static renderModalContent(product, availableSizes) {
    const unitPrice = product.price;
    const subtotal = unitPrice * OrderModal.currentQuantity;
    const hasSizes = availableSizes.length > 0;

    return `
      <div 
        id="order-modal-content"
        class="relative w-full max-w-2xl bg-[#0f0f13] border border-[#d4af37]/50 rounded-2xl sm:rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden max-h-[92vh] flex flex-col transform scale-95 transition-all duration-300"
      >
        
        <!-- Header -->
        <div class="px-5 py-4 sm:px-6 sm:py-5 border-b border-white/10 bg-gradient-to-r from-[#141419] to-[#0c0c0f] flex items-center justify-between shrink-0">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
              <i data-lucide="package-check" class="w-4 h-4 sm:w-5 sm:h-5"></i>
            </div>
            <div>
              <span class="text-[10px] font-mono text-[#d4af37] uppercase tracking-[0.25em] block">Fast Order Acquisition</span>
              <h3 class="font-serif text-lg sm:text-xl font-semibold text-white tracking-wide">Complete Your Order</h3>
            </div>
          </div>

          <button 
            id="order-modal-close-btn"
            class="w-9 h-9 rounded-full bg-black/60 hover:bg-white/10 border border-white/20 text-zinc-400 hover:text-white flex items-center justify-center transition-all"
            aria-label="Close Order Form"
          >
            <i data-lucide="x" class="w-4 h-4"></i>
          </button>
        </div>

        <!-- Scrollable Body -->
        <div class="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 custom-scrollbar">
          
          <!-- Selected Product Summary Card -->
          <div class="p-4 rounded-2xl bg-[#15151a] border border-white/10 flex items-center gap-4 relative overflow-hidden group">
            <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-[#1a1a22] p-1.5 border border-white/10 shrink-0 flex items-center justify-center">
              <img 
                src="${product.images[0]}" 
                alt="${product.name}" 
                class="w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]"
              />
            </div>

            <div class="flex-1 min-w-0">
              <span class="text-[10px] font-mono text-[#d4af37] uppercase tracking-wider block truncate">${product.brand}</span>
              <h4 class="font-serif text-sm sm:text-base font-semibold text-white truncate mb-1">${product.name}</h4>
              <div class="text-xs text-zinc-400 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono">
                <span>Price: <strong class="text-white">${formatPrice(unitPrice)}</strong></span>
                <span id="order-summary-size-badge" class="${hasSizes ? 'inline-block' : 'hidden'} px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300 text-[10px]">
                  Size: ${OrderModal.currentSize}
                </span>
              </div>
            </div>
          </div>

          <!-- Order Form Fields -->
          <form id="order-modal-form" class="space-y-4" novalidate>
            
            <!-- 1. Full Name Field -->
            <div class="space-y-1.5">
              <label for="order-customer-name" class="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-zinc-300">
                <span>Full Name <span class="text-rose-400">*</span></span>
                <span class="text-[10px] text-zinc-500 font-sans normal-case">Required</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <i data-lucide="user" class="w-4 h-4"></i>
                </div>
                <input 
                  type="text" 
                  id="order-customer-name" 
                  name="customerName"
                  required
                  placeholder="Enter your full name"
                  class="w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] text-white text-sm placeholder-zinc-500 transition-all outline-none"
                />
              </div>
              <p id="error-customer-name" class="text-[11px] text-rose-400 font-mono hidden pt-0.5 flex items-center gap-1">
                <i data-lucide="alert-circle" class="w-3 h-3"></i> Please enter your full name.
              </p>
            </div>

            <!-- 2. Phone Number Field (Supports Pakistan Phone Format) -->
            <div class="space-y-1.5">
              <label for="order-customer-phone" class="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-zinc-300">
                <span>Phone Number <span class="text-rose-400">*</span></span>
                <span class="text-[10px] text-zinc-500 font-sans normal-case">e.g., 0300 1234567</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <i data-lucide="phone" class="w-4 h-4"></i>
                </div>
                <input 
                  type="tel" 
                  id="order-customer-phone" 
                  name="customerPhone"
                  required
                  placeholder="Enter your phone number"
                  class="w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] text-white text-sm placeholder-zinc-500 transition-all outline-none"
                />
              </div>
              <p id="error-customer-phone" class="text-[11px] text-rose-400 font-mono hidden pt-0.5 flex items-center gap-1">
                <i data-lucide="alert-circle" class="w-3 h-3"></i> Please enter a valid phone number (e.g. 03001234567).
              </p>
            </div>

            <!-- 3. Delivery Address Field -->
            <div class="space-y-1.5">
              <label for="order-customer-address" class="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-zinc-300">
                <span>Delivery Address <span class="text-rose-400">*</span></span>
                <span class="text-[10px] text-zinc-500 font-sans normal-case">Doorstep Delivery</span>
              </label>
              <div class="relative">
                <textarea 
                  id="order-customer-address" 
                  name="customerAddress"
                  rows="3"
                  required
                  placeholder="House #, Street, Area, City, Landmark..."
                  class="w-full p-3.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] text-white text-sm placeholder-zinc-500 transition-all outline-none custom-scrollbar resize-none"
                ></textarea>
              </div>
              <p id="error-customer-address" class="text-[11px] text-rose-400 font-mono hidden pt-0.5 flex items-center gap-1">
                <i data-lucide="alert-circle" class="w-3 h-3"></i> Please enter your complete delivery address and city.
              </p>
            </div>

            <!-- 4. Quantity Selector & 5. Product Size / Variant in Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              
              <!-- Quantity Selector -->
              <div class="space-y-1.5">
                <label class="text-xs font-mono uppercase tracking-wider text-zinc-300 block">
                  Quantity <span class="text-rose-400">*</span>
                </label>
                <div class="flex items-center border border-white/15 rounded-xl bg-black/60 p-1">
                  <button 
                    type="button"
                    id="order-qty-dec-btn"
                    class="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 active:scale-95 text-zinc-300 hover:text-white flex items-center justify-center transition-all"
                    aria-label="Decrease quantity"
                  >
                    <i data-lucide="minus" class="w-4 h-4"></i>
                  </button>
                  <input 
                    type="number" 
                    id="order-qty-input" 
                    value="${OrderModal.currentQuantity}" 
                    min="1" 
                    readonly
                    class="w-full text-center bg-transparent font-mono text-white text-base font-bold focus:outline-none"
                  />
                  <button 
                    type="button"
                    id="order-qty-inc-btn"
                    class="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 active:scale-95 text-zinc-300 hover:text-white flex items-center justify-center transition-all"
                    aria-label="Increase quantity"
                  >
                    <i data-lucide="plus" class="w-4 h-4"></i>
                  </button>
                </div>
                <p id="error-customer-qty" class="text-[11px] text-rose-400 font-mono hidden pt-0.5">
                  Quantity must be at least 1.
                </p>
              </div>

              <!-- Product Size / Variant (Shown only if product has sizes/variants) -->
              ${hasSizes ? `
                <div class="space-y-1.5">
                  <label for="order-product-size" class="text-xs font-mono uppercase tracking-wider text-zinc-300 block">
                    Product Size / Variant <span class="text-rose-400">*</span>
                  </label>
                  <div class="relative">
                    <select 
                      id="order-product-size" 
                      class="w-full px-3.5 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#d4af37] text-white text-sm transition-all outline-none appearance-none cursor-pointer"
                    >
                      ${availableSizes.map(size => `
                        <option value="${size}" ${size === OrderModal.currentSize ? 'selected' : ''}>${size}</option>
                      `).join('')}
                    </select>
                    <div class="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-zinc-400">
                      <i data-lucide="chevron-down" class="w-4 h-4"></i>
                    </div>
                  </div>
                  <p id="error-customer-size" class="text-[11px] text-rose-400 font-mono hidden pt-0.5">
                    Please select a size or variant.
                  </p>
                </div>
              ` : ''}

            </div>

          </form>

          <!-- Order Summary Section -->
          <div class="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-2.5 text-xs font-mono">
            <div class="text-[11px] uppercase tracking-wider text-[#d4af37] font-semibold border-b border-white/10 pb-2 flex items-center justify-between">
              <span>Order Summary</span>
              <span>Pakistani Rupees (PKR)</span>
            </div>

            <div class="flex justify-between text-zinc-400">
              <span>Product Name</span>
              <span class="text-zinc-200 font-semibold truncate max-w-[200px] text-right">${product.name}</span>
            </div>

            <div class="flex justify-between text-zinc-400">
              <span>Product Price</span>
              <span class="text-zinc-200 font-semibold" id="order-summary-unit-price">${formatPrice(unitPrice)}</span>
            </div>

            <div class="flex justify-between text-zinc-400">
              <span>Selected Size / Variant</span>
              <span class="text-zinc-200 font-semibold" id="order-summary-size-val">${OrderModal.currentSize || 'Standard'}</span>
            </div>

            <div class="flex justify-between text-zinc-400">
              <span>Quantity</span>
              <span class="text-zinc-200 font-semibold" id="order-summary-qty">${OrderModal.currentQuantity}</span>
            </div>

            <div class="flex justify-between text-zinc-400">
              <span>Subtotal</span>
              <span class="text-zinc-200 font-semibold" id="order-summary-subtotal">${formatPrice(subtotal)}</span>
            </div>

            <div class="flex justify-between text-zinc-400">
              <span>Delivery Charges</span>
              <span class="text-emerald-400 font-semibold">Free (Complimentary)</span>
            </div>

            <div class="pt-2.5 border-t border-white/10 flex justify-between text-sm sm:text-base text-white">
              <span class="font-sans font-bold">Total Amount</span>
              <span class="font-mono font-bold text-[#d4af37]" id="order-summary-total">${formatPrice(subtotal)}</span>
            </div>
          </div>

        </div>

        <!-- Footer Actions (WhatsApp Order CTA) -->
        <div class="p-5 sm:p-6 border-t border-white/10 bg-[#0d0d11] shrink-0">
          <button 
            type="button"
            id="order-modal-whatsapp-btn"
            class="w-full py-3.5 sm:py-4 px-6 rounded-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs sm:text-sm uppercase tracking-widest text-center flex items-center justify-center gap-2.5 transition-all duration-300 shadow-[0_8px_25px_rgba(16,185,129,0.35)] hover:shadow-[0_10px_35px_rgba(16,185,129,0.5)] active:scale-[0.98]"
          >
            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
            </svg>
            <span>PLACE ORDER ON WHATSAPP</span>
          </button>
          <p class="text-[10px] text-zinc-500 text-center font-mono mt-2">
            Instant 24/7 VIP Horology Concierge Confirmation
          </p>
        </div>

      </div>
    `;
  }

  static setupEvents(product, availableSizes) {
    const closeBtn = document.getElementById("order-modal-close-btn");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => OrderModal.close());
    }

    const nameInput = document.getElementById("order-customer-name");
    const phoneInput = document.getElementById("order-customer-phone");
    const addressInput = document.getElementById("order-customer-address");
    const sizeSelect = document.getElementById("order-product-size");

    const qtyInput = document.getElementById("order-qty-input");
    const decBtn = document.getElementById("order-qty-dec-btn");
    const incBtn = document.getElementById("order-qty-inc-btn");

    // Quantity Decrement
    if (decBtn && qtyInput) {
      decBtn.addEventListener("click", () => {
        if (OrderModal.currentQuantity > 1) {
          OrderModal.currentQuantity--;
          qtyInput.value = OrderModal.currentQuantity;
          OrderModal.updateSummary(product);
        }
      });
    }

    // Quantity Increment
    if (incBtn && qtyInput) {
      incBtn.addEventListener("click", () => {
        OrderModal.currentQuantity++;
        qtyInput.value = OrderModal.currentQuantity;
        OrderModal.updateSummary(product);
      });
    }

    // Size Selection Change
    if (sizeSelect) {
      sizeSelect.addEventListener("change", (e) => {
        OrderModal.currentSize = e.target.value;
        const badge = document.getElementById("order-summary-size-badge");
        if (badge) {
          badge.textContent = `Size: ${OrderModal.currentSize}`;
        }
        const sizeVal = document.getElementById("order-summary-size-val");
        if (sizeVal) {
          sizeVal.textContent = OrderModal.currentSize;
        }
        document.getElementById("error-customer-size")?.classList.add("hidden");
      });
    }

    // Realtime error clear on input
    if (nameInput) {
      nameInput.addEventListener("input", () => {
        document.getElementById("error-customer-name")?.classList.add("hidden");
        nameInput.classList.remove("border-rose-500");
      });
    }
    if (phoneInput) {
      phoneInput.addEventListener("input", () => {
        document.getElementById("error-customer-phone")?.classList.add("hidden");
        phoneInput.classList.remove("border-rose-500");
      });
    }
    if (addressInput) {
      addressInput.addEventListener("input", () => {
        document.getElementById("error-customer-address")?.classList.add("hidden");
        addressInput.classList.remove("border-rose-500");
      });
    }

    // WhatsApp Submit Order Button
    const whatsappBtn = document.getElementById("order-modal-whatsapp-btn");
    if (whatsappBtn) {
      whatsappBtn.addEventListener("click", (e) => {
        e.preventDefault();
        OrderModal.handleWhatsAppOrder(product, availableSizes);
      });
    }
  }

  static updateSummary(product) {
    const qty = OrderModal.currentQuantity;
    const unitPrice = product.price;
    const subtotal = unitPrice * qty;

    const qtyEl = document.getElementById("order-summary-qty");
    const subtotalEl = document.getElementById("order-summary-subtotal");
    const totalEl = document.getElementById("order-summary-total");

    if (qtyEl) qtyEl.textContent = qty;
    if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
    if (totalEl) totalEl.textContent = formatPrice(subtotal);
  }

  static validateForm(availableSizes) {
    const nameInput = document.getElementById("order-customer-name");
    const phoneInput = document.getElementById("order-customer-phone");
    const addressInput = document.getElementById("order-customer-address");
    const sizeSelect = document.getElementById("order-product-size");

    let isValid = true;

    // Validate Name
    const nameVal = nameInput ? nameInput.value.trim() : "";
    const nameErr = document.getElementById("error-customer-name");
    if (!nameVal || nameVal.length < 2) {
      nameErr?.classList.remove("hidden");
      nameInput?.classList.add("border-rose-500");
      isValid = false;
    } else {
      nameErr?.classList.add("hidden");
      nameInput?.classList.remove("border-rose-500");
    }

    // Validate Phone (Supports Pakistan Phone Format)
    const phoneVal = phoneInput ? phoneInput.value.trim() : "";
    const phoneErr = document.getElementById("error-customer-phone");
    const cleanedDigits = phoneVal.replace(/[\s-+()]/g, "");
    // Pakistan numbers are typically 10 to 12 digits (e.g. 03001234567 or 923001234567)
    const isPhoneValid = cleanedDigits.length >= 10 && cleanedDigits.length <= 13;

    if (!phoneVal || !isPhoneValid) {
      phoneErr?.classList.remove("hidden");
      phoneInput?.classList.add("border-rose-500");
      isValid = false;
    } else {
      phoneErr?.classList.add("hidden");
      phoneInput?.classList.remove("border-rose-500");
    }

    // Validate Address
    const addressVal = addressInput ? addressInput.value.trim() : "";
    const addressErr = document.getElementById("error-customer-address");
    if (!addressVal || addressVal.length < 5) {
      addressErr?.classList.remove("hidden");
      addressInput?.classList.add("border-rose-500");
      isValid = false;
    } else {
      addressErr?.classList.add("hidden");
      addressInput?.classList.remove("border-rose-500");
    }

    // Validate Quantity
    const qtyErr = document.getElementById("error-customer-qty");
    if (OrderModal.currentQuantity < 1) {
      qtyErr?.classList.remove("hidden");
      isValid = false;
    } else {
      qtyErr?.classList.add("hidden");
    }

    // Validate Size if applicable
    if (availableSizes && availableSizes.length > 0) {
      const sizeErr = document.getElementById("error-customer-size");
      if (!OrderModal.currentSize) {
        sizeErr?.classList.remove("hidden");
        sizeSelect?.classList.add("border-rose-500");
        isValid = false;
      } else {
        sizeErr?.classList.add("hidden");
        sizeSelect?.classList.remove("border-rose-500");
      }
    }

    return isValid;
  }

  static handleWhatsAppOrder(product, availableSizes) {
    if (!OrderModal.validateForm(availableSizes)) {
      return;
    }

    const name = document.getElementById("order-customer-name")?.value.trim();
    const phone = document.getElementById("order-customer-phone")?.value.trim();
    const address = document.getElementById("order-customer-address")?.value.trim();
    const size = OrderModal.currentSize || "Standard";
    const qty = OrderModal.currentQuantity;
    const unitPrice = product.price.toLocaleString("en-PK");
    const totalPrice = (product.price * qty).toLocaleString("en-PK");

    // Exact pre-filled WhatsApp Order template as requested:
    // Hello, I would like to place an order.
    // Name: [Customer Name]
    // Phone: [Phone Number]
    // Address: [Delivery Address]
    // Product: [Product Name]
    // Size: [Selected Size]
    // Quantity: [Quantity]
    // Price: Rs. [Price]
    // Total: Rs. [Total]
    // Please confirm my order.

    const message = 
`Hello, I would like to place an order.

Name: ${name}
Phone: ${phone}
Address: ${address}

Product: ${product.name}
Size: ${size}
Quantity: ${qty}
Price: Rs. ${unitPrice}
Total: Rs. ${totalPrice}

Please confirm my order.`;

    // Persist order to local storage for VIP account dashboard
    try {
      const orderRecord = {
        id: "TMO-WA-" + Math.floor(100000 + Math.random() * 900000),
        date: new Date().toISOString(),
        status: "Processing (WhatsApp)",
        shippingMethod: "Complimentary Armored Courier",
        trackingNumber: "PK-WA-" + Math.floor(1000000 + Math.random() * 9000000),
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        customer: {
          fullName: name,
          phone: phone,
          address: address
        },
        items: [
          {
            productId: product.id,
            name: product.name,
            brand: product.brand,
            price: product.price,
            quantity: qty,
            size: size,
            image: product.images[0]
          }
        ],
        subtotal: product.price * qty,
        discountAmount: 0,
        shippingCost: 0,
        total: product.price * qty,
        paymentMethod: "WhatsApp Order / Cash on Delivery"
      };

      const existingOrders = Storage.getOrders();
      existingOrders.unshift(orderRecord);
      Storage.setOrders(existingOrders);
    } catch (e) {
      console.warn("Could not save WhatsApp order:", e);
    }

    store.showToast(`Order generated for ${product.name}! Opening WhatsApp...`, "success");

    // Open WhatsApp Web / App with encoded message
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");

    // Close the order modal
    OrderModal.close();
  }
}
