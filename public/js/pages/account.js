/**
 * TIMEORA - User Account & Order History Dashboard
 */

import { store } from "../state/store.js";
import { Storage } from "../state/storage.js";

export class AccountPage {
  static render(activeTab = "orders") {
    const user = store.getUser();
    if (!user) {
      return `
        <div class="max-w-md mx-auto px-4 py-20 text-center space-y-4">
          <div class="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-500 mx-auto">
            <i data-lucide="lock" class="w-8 h-8 text-[#d4af37]"></i>
          </div>
          <h2 class="font-serif text-2xl font-semibold text-white">VIP Vault Access Required</h2>
          <p class="text-xs text-zinc-400">Please sign in to your TIMEORA account to view your acquisitions, orders, and saved addresses.</p>
          <div class="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#auth" class="px-6 py-3 rounded-xl bg-[#d4af37] text-black font-semibold text-xs uppercase tracking-wider">
              Sign In
            </a>
            <button id="account-quick-demo-btn" class="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider border border-white/15">
              ⚡ Instant VIP Demo Login
            </button>
          </div>
        </div>
      `;
    }

    const orders = store.getOrders();
    const wishlistCount = store.getWishlistCount();

    return `
      <div class="account-page max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        <!-- Top Profile Banner -->
        <div class="bg-gradient-to-r from-[#141418] via-[#1a1712] to-[#141418] border border-[#d4af37]/30 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div class="flex items-center gap-5">
            <img src="${user.avatar}" alt="${user.name}" class="w-20 h-20 rounded-2xl object-cover border-2 border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            <div>
              <div class="flex items-center gap-2">
                <h1 class="font-serif text-2xl sm:text-3xl font-semibold text-white">${user.name}</h1>
                <i data-lucide="badge-check" class="w-5 h-5 text-[#d4af37]"></i>
              </div>
              <p class="text-xs font-mono text-[#d4af37] mt-0.5">${user.tier || 'Haute Horlogerie VIP Member'}</p>
              <p class="text-xs text-zinc-400 mt-1">${user.email} • ${user.phone || '+41 22 819 9000'}</p>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <button id="dashboard-logout-btn" class="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-rose-500/20 text-zinc-300 hover:text-rose-300 text-xs font-mono border border-white/10 transition-colors flex items-center gap-2">
              <i data-lucide="log-out" class="w-4 h-4"></i>
              Sign Out
            </button>
          </div>
        </div>

        <!-- Dashboard Layout: Navigation Tabs + Content View -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- Sidebar Navigation Tabs -->
          <nav class="lg:col-span-3 bg-[#111115] border border-white/10 rounded-2xl p-4 space-y-1 shadow-xl">
            <button class="account-nav-tab w-full text-left px-4 py-3 rounded-xl text-xs font-medium uppercase tracking-wider flex items-center justify-between transition-all ${activeTab === 'orders' ? 'bg-[#d4af37] text-black font-bold shadow-md' : 'text-zinc-300 hover:bg-white/5'}" data-tab="orders">
              <span class="flex items-center gap-3"><i data-lucide="package" class="w-4 h-4"></i> Acquisitions & Orders</span>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded-full ${activeTab === 'orders' ? 'bg-black/20 text-black' : 'bg-white/10 text-zinc-300'}">${orders.length}</span>
            </button>

            <button class="account-nav-tab w-full text-left px-4 py-3 rounded-xl text-xs font-medium uppercase tracking-wider flex items-center justify-between transition-all ${activeTab === 'profile' ? 'bg-[#d4af37] text-black font-bold shadow-md' : 'text-zinc-300 hover:bg-white/5'}" data-tab="profile">
              <span class="flex items-center gap-3"><i data-lucide="user" class="w-4 h-4"></i> VIP Profile</span>
            </button>

            <button class="account-nav-tab w-full text-left px-4 py-3 rounded-xl text-xs font-medium uppercase tracking-wider flex items-center justify-between transition-all ${activeTab === 'addresses' ? 'bg-[#d4af37] text-black font-bold shadow-md' : 'text-zinc-300 hover:bg-white/5'}" data-tab="addresses">
              <span class="flex items-center gap-3"><i data-lucide="map-pin" class="w-4 h-4"></i> Armored Addresses</span>
            </button>

            <a href="#wishlist" class="w-full text-left px-4 py-3 rounded-xl text-xs font-medium uppercase tracking-wider flex items-center justify-between text-zinc-300 hover:bg-white/5 transition-all">
              <span class="flex items-center gap-3"><i data-lucide="heart" class="w-4 h-4 text-red-400"></i> Private Wishlist</span>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-zinc-300">${wishlistCount}</span>
            </a>

            <button class="account-nav-tab w-full text-left px-4 py-3 rounded-xl text-xs font-medium uppercase tracking-wider flex items-center justify-between transition-all ${activeTab === 'security' ? 'bg-[#d4af37] text-black font-bold shadow-md' : 'text-zinc-300 hover:bg-white/5'}" data-tab="security">
              <span class="flex items-center gap-3"><i data-lucide="shield" class="w-4 h-4"></i> Vault Security</span>
            </button>
          </nav>

          <!-- Main Content Area -->
          <div class="lg:col-span-9">
            
            <!-- Panel 1: Orders Tab -->
            <div id="account-tab-orders" class="account-panel ${activeTab === 'orders' ? '' : 'hidden'} space-y-6">
              <div class="flex items-center justify-between">
                <h2 class="font-serif text-2xl font-semibold text-white">Acquisition History & Tracking</h2>
                <span class="text-xs font-mono text-zinc-400">${orders.length} order${orders.length === 1 ? '' : 's'} registered</span>
              </div>

              ${orders.length === 0 ? `
                <div class="py-12 text-center bg-[#111115] border border-dashed border-white/10 rounded-2xl p-8">
                  <p class="text-xs text-zinc-400">No timepiece acquisitions on record.</p>
                </div>
              ` : orders.map(order => {
                const isDelivered = order.status === "Delivered";
                return `
                  <div class="bg-[#111115] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
                    
                    <!-- Order Header -->
                    <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-2">
                      <div>
                        <div class="flex items-center gap-3">
                          <h3 class="font-mono font-bold text-white text-base">${order.id}</h3>
                          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold ${isDelivered ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/40'}">
                            ${order.status}
                          </span>
                        </div>
                        <p class="text-xs font-mono text-zinc-400 mt-1">Date: ${new Date(order.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
                      </div>

                      <div class="text-left sm:text-right">
                        <span class="text-xs font-mono text-zinc-400 block">Acquisition Total</span>
                        <span class="font-mono text-lg font-bold text-[#d4af37]">
                          ${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(order.total)}
                        </span>
                      </div>
                    </div>

                    <!-- Visual Shipping Progress -->
                    <div class="space-y-2">
                      <div class="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                        <span class="text-[#d4af37]">1. Atelier Registration</span>
                        <span class="text-[#d4af37]">2. Chronometric Calibration</span>
                        <span class="${isDelivered ? 'text-[#d4af37]' : 'text-zinc-500'}">3. Armored Transit</span>
                        <span class="${isDelivered ? 'text-emerald-400' : 'text-zinc-500'}">4. Delivered</span>
                      </div>
                      <div class="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                        <div class="h-full bg-gradient-to-r from-[#d4af37] to-emerald-400 rounded-full transition-all duration-1000 ${isDelivered ? 'w-full' : 'w-2/3'}"></div>
                      </div>
                      <div class="flex justify-between text-[10px] font-mono text-zinc-500">
                        <span>Courier: ${order.shippingMethod}</span>
                        <span>Tracking: <strong class="text-zinc-300">${order.trackingNumber}</strong></span>
                      </div>
                    </div>

                    <!-- Items in Order -->
                    <div class="divide-y divide-white/5 bg-black/40 rounded-xl p-4 border border-white/5">
                      ${order.items.map(item => `
                        <div class="py-2.5 flex items-center justify-between gap-4">
                          <div class="flex items-center gap-3 min-w-0">
                            <img src="${item.image}" alt="${item.name}" class="w-12 h-12 rounded-lg bg-[#18181e] object-contain p-1 border border-white/10 shrink-0">
                            <div class="min-w-0">
                              <span class="text-[9px] font-mono text-[#d4af37] uppercase block truncate">${item.brand}</span>
                              <h4 class="font-serif text-xs font-semibold text-white truncate">${item.name}</h4>
                              <span class="text-[10px] font-mono text-zinc-400">Qty: ${item.quantity}</span>
                            </div>
                          </div>
                          <span class="font-mono text-xs font-bold text-white shrink-0">
                            ${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(item.price * item.quantity)}
                          </span>
                        </div>
                      `).join("")}
                    </div>

                    <!-- Actions -->
                    <div class="flex items-center justify-between pt-2">
                      <span class="text-xs font-mono text-zinc-400">Delivery: ${order.customer.address}</span>
                      <a href="#order-success-${order.id}" class="text-xs font-mono text-[#d4af37] hover:underline flex items-center gap-1">
                        <i data-lucide="receipt" class="w-3.5 h-3.5"></i>
                        View Full Receipt
                      </a>
                    </div>

                  </div>
                `;
              }).join("")}
            </div>

            <!-- Panel 2: Profile Tab -->
            <div id="account-tab-profile" class="account-panel ${activeTab === 'profile' ? '' : 'hidden'} bg-[#111115] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              <h2 class="font-serif text-2xl font-semibold text-white">VIP Connoisseur Profile</h2>
              <form id="profile-edit-form" class="space-y-4 max-w-xl">
                <div>
                  <label class="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1">Full Legal Name</label>
                  <input type="text" id="profile-name" value="${user.name}" class="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d4af37]" />
                </div>
                <div>
                  <label class="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1">Primary Email</label>
                  <input type="email" id="profile-email" value="${user.email}" class="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d4af37]" />
                </div>
                <div>
                  <label class="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1">Direct Phone</label>
                  <input type="tel" id="profile-phone" value="${user.phone || '+41 22 819 9000'}" class="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d4af37]" />
                </div>
                <button type="submit" class="px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-black font-semibold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-md">
                  Save Changes
                </button>
              </form>
            </div>

            <!-- Panel 3: Addresses Tab -->
            <div id="account-tab-addresses" class="account-panel ${activeTab === 'addresses' ? '' : 'hidden'} space-y-6">
              <div class="flex items-center justify-between">
                <h2 class="font-serif text-2xl font-semibold text-white">Armored Delivery Addresses</h2>
                <button id="add-address-btn" class="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-colors">
                  + Add New Address
                </button>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                ${(user.addresses || []).map(addr => `
                  <div class="bg-[#111115] border border-white/10 rounded-2xl p-6 space-y-2 relative shadow-xl">
                    ${addr.isDefault ? `
                      <span class="absolute top-4 right-4 text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30">Primary</span>
                    ` : ''}
                    <h4 class="font-serif text-base font-semibold text-white">${addr.title}</h4>
                    <p class="text-xs text-zinc-300 font-sans">${addr.fullName}</p>
                    <p class="text-xs text-zinc-400">${addr.address}</p>
                    <p class="text-xs text-zinc-400">${addr.city}, ${addr.postalCode} ${addr.country}</p>
                  </div>
                `).join("")}
              </div>
            </div>

            <!-- Panel 4: Security Tab -->
            <div id="account-tab-security" class="account-panel ${activeTab === 'security' ? '' : 'hidden'} bg-[#111115] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
              <h2 class="font-serif text-2xl font-semibold text-white">Vault Security & Authentication</h2>
              <div class="space-y-4 max-w-xl text-xs">
                <div class="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                  <div>
                    <h4 class="font-semibold text-white">Two-Factor Horology Authentication</h4>
                    <p class="text-zinc-400 mt-0.5">Protect high-value consignments with SMS/Authenticator confirmation.</p>
                  </div>
                  <span class="text-emerald-400 font-mono">Active</span>
                </div>
                <div class="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                  <div>
                    <h4 class="font-semibold text-white">Encrypted Session Tokens</h4>
                    <p class="text-zinc-400 mt-0.5">Your sessions are protected with hardware-grade TLS 1.3 cryptography.</p>
                  </div>
                  <span class="text-[#d4af37] font-mono">256-Bit</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    `;
  }

  static setupEvents() {
    // Quick Demo Login button in Account view
    const demoBtn = document.getElementById("account-quick-demo-btn");
    if (demoBtn) {
      demoBtn.addEventListener("click", () => {
        store.loginDemoUser();
        window.location.hash = "#account";
      });
    }

    // Dashboard Sign Out
    const logoutBtn = document.getElementById("dashboard-logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        store.logout();
        window.location.hash = "#home";
      });
    }

    // Tab Navigation
    document.querySelectorAll(".account-nav-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        const tabKey = tab.getAttribute("data-tab");
        document.querySelectorAll(".account-nav-tab").forEach(t => {
          t.classList.remove("bg-[#d4af37]", "text-black", "font-bold", "shadow-md");
          t.classList.add("text-zinc-300");
        });
        tab.classList.add("bg-[#d4af37]", "text-black", "font-bold", "shadow-md");
        tab.classList.remove("text-zinc-300");

        document.querySelectorAll(".account-panel").forEach(p => p.classList.add("hidden"));
        const target = document.getElementById(`account-tab-${tabKey}`);
        if (target) target.classList.remove("hidden");
      });
    });

    // Profile Edit form
    const profileForm = document.getElementById("profile-edit-form");
    if (profileForm) {
      profileForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("profile-name").value.trim();
        const email = document.getElementById("profile-email").value.trim();
        const phone = document.getElementById("profile-phone").value.trim();

        store.updateProfile({ name, email, phone });
      });
    }

    // Add address trigger
    const addAddrBtn = document.getElementById("add-address-btn");
    if (addAddrBtn) {
      addAddrBtn.addEventListener("click", () => {
        store.showToast({
          title: "Address Registry",
          message: "Please submit your diplomatic residence details via our private concierge.",
          type: "info"
        });
      });
    }
  }
}
