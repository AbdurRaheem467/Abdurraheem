/**
 * TIMEORA - Order Success Confirmation Screen
 */

import { store } from "../state/store.js";
import { Storage } from "../state/storage.js";

export class OrderSuccessPage {
  static render(orderId) {
    const orders = Storage.getOrders();
    const order = orders.find(o => o.id === orderId) || orders[0];

    if (!order) {
      return `
        <div class="max-w-xl mx-auto px-4 py-24 text-center">
          <h2 class="font-serif text-2xl font-semibold text-white mb-2">Order Not Found</h2>
          <a href="#shop" class="mt-4 px-6 py-3 rounded-xl bg-[#d4af37] text-black font-semibold text-xs uppercase tracking-wider inline-block">Return to Catalog</a>
        </div>
      `;
    }

    const formattedTotal = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(order.total);
    const formattedSubtotal = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(order.subtotal);
    const formattedDiscount = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(order.discountAmount || 0);

    return `
      <div class="order-success-page max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-fade-in">
        
        <!-- Success Hero Header -->
        <div class="text-center space-y-4 bg-gradient-to-b from-[#141418] to-[#0d0d10] p-8 sm:p-12 rounded-3xl border border-[#d4af37]/40 shadow-2xl relative overflow-hidden">
          <div class="w-20 h-20 rounded-full bg-[#d4af37]/20 border-2 border-[#d4af37] flex items-center justify-center text-[#d4af37] mx-auto shadow-[0_0_30px_rgba(212,175,55,0.4)]">
            <i data-lucide="check" class="w-10 h-10"></i>
          </div>

          <span class="inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.3em] bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30">
            Acquisition Confirmed & Calibrated
          </span>

          <h1 class="font-serif text-3xl sm:text-5xl font-semibold text-white tracking-tight">
            Order Confirmed!
          </h1>

          <p class="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
            Thank you for choosing TIMEORA. Your timepiece is now being prepared, hand-polished, and sealed with its physical manufacture certificate.
          </p>

          <div class="inline-flex items-center gap-3 bg-black/60 px-5 py-2.5 rounded-xl border border-white/15 text-xs font-mono text-zinc-300">
            <span>Reference ID:</span>
            <strong class="text-[#d4af37] text-sm">${order.id}</strong>
          </div>
        </div>

        <!-- Order Summary Card -->
        <div class="bg-[#111115] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl" id="printable-receipt">
          
          <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
            <div>
              <h3 class="font-serif text-xl font-semibold text-white">Acquisition Details</h3>
              <p class="text-xs font-mono text-zinc-400 mt-0.5">Estimated Diplomatic Delivery: <strong class="text-emerald-400">${order.estimatedDelivery}</strong></p>
            </div>
            <div class="text-right">
              <span class="text-[11px] font-mono text-zinc-500 uppercase block">Tracking No:</span>
              <span class="text-xs font-mono font-bold text-[#d4af37]">${order.trackingNumber}</span>
            </div>
          </div>

          <!-- Items Ordered Table -->
          <div class="divide-y divide-white/5">
            ${order.items.map(item => `
              <div class="py-4 flex items-center justify-between gap-4">
                <div class="flex items-center gap-4 min-w-0">
                  <div class="w-16 h-16 rounded-xl bg-[#18181e] p-1.5 border border-white/10 shrink-0 flex items-center justify-center">
                    <img src="${item.image}" alt="${item.name}" class="w-full h-full object-contain filter drop-shadow">
                  </div>
                  <div class="min-w-0">
                    <span class="text-[10px] font-mono text-[#d4af37] uppercase block">${item.brand}</span>
                    <h4 class="font-serif text-sm font-semibold text-white truncate">${item.name}</h4>
                    <span class="text-xs font-mono text-zinc-400">Qty: ${item.quantity} × ${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(item.price)}</span>
                  </div>
                </div>
                <div class="font-mono text-sm sm:text-base font-bold text-white shrink-0">
                  ${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(item.price * item.quantity)}
                </div>
              </div>
            `).join("")}
          </div>

          <!-- Financial Breakdown -->
          <div class="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-mono">
            
            <div class="space-y-2 text-zinc-400 bg-white/[0.02] p-4 rounded-xl border border-white/5">
              <h5 class="text-white font-serif uppercase tracking-wider text-[11px]">Consignment Destination</h5>
              <p class="text-zinc-300 font-sans">${order.customer.fullName}</p>
              <p class="text-zinc-400">${order.customer.address}</p>
              <p class="text-zinc-400">${order.customer.email} • ${order.customer.phone}</p>
              <p class="text-[#d4af37] pt-1">Payment: ${order.paymentMethod}</p>
            </div>

            <div class="space-y-2 bg-white/[0.02] p-4 rounded-xl border border-white/5">
              <div class="flex justify-between text-zinc-400">
                <span>Subtotal</span>
                <span class="text-white">${formattedSubtotal}</span>
              </div>
              ${order.discountAmount > 0 ? `
                <div class="flex justify-between text-amber-400">
                  <span>Privilege (${order.couponCode || 'Discount'})</span>
                  <span>-${formattedDiscount}</span>
                </div>
              ` : ''}
              <div class="flex justify-between text-zinc-400">
                <span>Armored Transit</span>
                <span class="text-emerald-400">Included</span>
              </div>
              <div class="flex justify-between text-sm text-white pt-2 border-t border-white/10 font-sans">
                <span class="font-bold">Grand Total</span>
                <span class="font-mono font-bold text-[#d4af37] text-lg">${formattedTotal}</span>
              </div>
            </div>

          </div>

        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
          <button 
            id="print-receipt-btn" 
            class="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider border border-white/15 transition-all flex items-center justify-center gap-2"
          >
            <i data-lucide="printer" class="w-4 h-4 text-[#d4af37]"></i>
            Print Official Receipt
          </button>

          <div class="flex items-center gap-3 w-full sm:w-auto">
            <a 
              href="#account" 
              class="flex-1 sm:flex-initial px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white text-xs font-semibold uppercase tracking-wider border border-white/10 transition-all text-center"
            >
              View Order in Dashboard
            </a>
            <a 
              href="#shop" 
              class="flex-1 sm:flex-initial px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-black font-semibold text-xs uppercase tracking-wider hover:brightness-110 shadow-lg transition-all text-center"
            >
              Continue Shopping
            </a>
          </div>
        </div>

      </div>
    `;
  }

  static setupEvents() {
    const printBtn = document.getElementById("print-receipt-btn");
    if (printBtn) {
      printBtn.addEventListener("click", () => {
        window.print();
      });
    }
  }
}
