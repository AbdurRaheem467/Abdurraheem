/**
 * TIMEORA - Navigation Bar Component
 * Responsive, Sticky, Glassmorphic header with live Cart & Wishlist counters,
 * Global Search trigger, Mobile Drawer, and User profile quick actions.
 */

import { store } from "../state/store.js";

export class Navbar {
  static render() {
    const cartCount = store.getCartCount();
    const wishlistCount = store.getWishlistCount();
    const user = store.getUser();

    return `
      <!-- Permanently Sticky Header: Contains Both Announcement Bar and Main Navigation -->
      <header id="main-header" class="sticky top-0 z-50 w-full bg-[#0a0a0c] shadow-[0_10px_35px_rgba(0,0,0,0.85)] border-b border-white/10 transition-all duration-300">
        
        <!-- 1. Top Announcement Bar (Permanently Visible While Scrolling) -->
        <div class="w-full bg-gradient-to-r from-[#0c0c0e] via-[#1a1712] to-[#0c0c0e] border-b border-[#d4af37]/20 text-[11px] py-1.5 px-4 text-center tracking-widest uppercase font-medium text-zinc-300">
          <div class="max-w-7xl mx-auto flex items-center justify-between">
            <span class="hidden md:inline-flex items-center gap-2 text-zinc-400">
              <i data-lucide="shield-check" class="w-3.5 h-3.5 text-[#d4af37]"></i>
              5-Year International Manufacture Warranty
            </span>
            <span class="mx-auto md:mx-0 flex items-center gap-2 text-zinc-200">
              <span class="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse"></span>
              Complimentary Armored Courier On All Global Orders
            </span>
            <div class="hidden md:flex items-center gap-4 text-zinc-400">
              <a href="#contact" class="hover:text-[#d4af37] transition-colors">VIP Concierge</a>
              <span class="text-zinc-600">|</span>
              <a href="https://wa.me/923354191368" target="_blank" class="hover:text-[#d4af37] transition-colors flex items-center gap-1">
                <span>WhatsApp: 0335-4191368</span>
              </a>
            </div>
          </div>
        </div>

        <!-- 2. Main Navigation Bar (Permanently Visible While Scrolling) -->
        <div class="w-full bg-[#0a0a0c]/95 backdrop-blur-md">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-20">
            
            <!-- Mobile Hamburger Button -->
            <div class="flex items-center lg:hidden">
              <button id="mobile-menu-btn" class="p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/5 focus:outline-none" aria-label="Open Navigation Menu">
                <i data-lucide="menu" class="w-6 h-6"></i>
              </button>
            </div>

            <!-- Brand Monogram & Logo -->
            <div class="flex items-center gap-3">
              <a href="#home" class="flex items-center gap-3 group">
                <div class="w-10 h-10 rounded-full border border-[#d4af37]/60 bg-gradient-to-br from-[#1c1a14] to-[#0a0a0c] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.2)] group-hover:border-[#d4af37] transition-all">
                  <span class="font-serif text-lg font-bold text-[#d4af37] tracking-tighter">T</span>
                </div>
                <div class="flex flex-col">
                  <span class="font-serif text-2xl font-semibold tracking-[0.25em] text-white group-hover:text-[#d4af37] transition-colors">TIMEORA</span>
                  <span class="text-[9px] uppercase tracking-[0.35em] text-[#d4af37] -mt-1 font-sans">Haute Horlogerie</span>
                </div>
              </a>
            </div>

            <!-- Desktop Navigation Links -->
            <nav class="hidden lg:flex items-center space-x-7">
              <a href="#home" class="nav-link text-xs font-medium uppercase tracking-[0.18em] text-zinc-300 hover:text-[#d4af37] transition-colors py-2" data-route="home">Home</a>
              <a href="#shop" class="nav-link text-xs font-medium uppercase tracking-[0.18em] text-zinc-300 hover:text-[#d4af37] transition-colors py-2" data-route="shop">Shop</a>
              <a href="#collection-mens" class="nav-link text-xs font-medium uppercase tracking-[0.18em] text-zinc-300 hover:text-[#d4af37] transition-colors py-2" data-route="collection-mens">Men's</a>
              <a href="#collection-womens" class="nav-link text-xs font-medium uppercase tracking-[0.18em] text-zinc-300 hover:text-[#d4af37] transition-colors py-2" data-route="collection-womens">Women's</a>
              
              <!-- Collections Dropdown -->
              <div class="relative group">
                <button class="nav-link flex items-center gap-1 text-xs font-medium uppercase tracking-[0.18em] text-zinc-300 group-hover:text-[#d4af37] transition-colors py-2">
                  <span>Collections</span>
                  <i data-lucide="chevron-down" class="w-3.5 h-3.5 transition-transform group-hover:rotate-180 text-zinc-400"></i>
                </button>
                <div class="absolute left-0 mt-1 w-56 bg-[#121215] border border-[#d4af37]/30 rounded-xl shadow-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 backdrop-blur-xl z-50">
                  <a href="#collection-luxury" class="block px-3 py-2.5 rounded-lg text-xs tracking-wider text-zinc-300 hover:text-white hover:bg-[#d4af37]/15 transition-all">Haute Luxury</a>
                  <a href="#collection-classic" class="block px-3 py-2.5 rounded-lg text-xs tracking-wider text-zinc-300 hover:text-white hover:bg-[#d4af37]/15 transition-all">Classic Heritage</a>
                  <a href="#collection-sport" class="block px-3 py-2.5 rounded-lg text-xs tracking-wider text-zinc-300 hover:text-white hover:bg-[#d4af37]/15 transition-all">Sport & Motorsport</a>
                  <a href="#collection-minimal" class="block px-3 py-2.5 rounded-lg text-xs tracking-wider text-zinc-300 hover:text-white hover:bg-[#d4af37]/15 transition-all">Minimalist Modern</a>
                  <div class="my-1 border-t border-white/10"></div>
                  <a href="#shop" class="block px-3 py-2 rounded-lg text-[11px] uppercase tracking-widest text-[#d4af37] hover:text-white hover:bg-[#d4af37]/20 transition-all font-semibold">View All Timepieces →</a>
                </div>
              </div>

              <a href="#collection-new" class="nav-link text-xs font-medium uppercase tracking-[0.18em] text-zinc-300 hover:text-[#d4af37] transition-colors py-2" data-route="collection-new">New Arrivals</a>
              <a href="#collection-sale" class="nav-link text-xs font-medium uppercase tracking-[0.18em] text-amber-400 hover:text-amber-300 transition-colors py-2 flex items-center gap-1.5" data-route="collection-sale">
                <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                Sale
              </a>
              <a href="#about" class="nav-link text-xs font-medium uppercase tracking-[0.18em] text-zinc-300 hover:text-[#d4af37] transition-colors py-2" data-route="about">About</a>
              <a href="#contact" class="nav-link text-xs font-medium uppercase tracking-[0.18em] text-zinc-300 hover:text-[#d4af37] transition-colors py-2" data-route="contact">Contact</a>
            </nav>

            <!-- Actions (Search, Wishlist, Cart, Account) -->
            <div class="flex items-center space-x-3 sm:space-x-4">
              
              <!-- Search Trigger Button -->
              <button id="nav-search-btn" class="p-2.5 text-zinc-300 hover:text-[#d4af37] hover:bg-white/5 rounded-full transition-colors relative group" aria-label="Open Global Search">
                <i data-lucide="search" class="w-5 h-5"></i>
                <span class="hidden xl:inline-block absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] bg-[#1a1a1d] text-zinc-300 px-2 py-0.5 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">Ctrl + K</span>
              </button>

              <!-- Wishlist Trigger Button -->
              <a href="#wishlist" class="p-2.5 text-zinc-300 hover:text-[#d4af37] hover:bg-white/5 rounded-full transition-colors relative" aria-label="Wishlist">
                <i data-lucide="heart" class="w-5 h-5"></i>
                <span id="nav-wishlist-count" class="${wishlistCount > 0 ? 'scale-100' : 'scale-0'} transition-transform absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#d4af37] text-black text-[10px] font-bold flex items-center justify-center shadow-lg">
                  ${wishlistCount}
                </span>
              </a>

              <!-- Shopping Cart Drawer Trigger Button -->
              <button id="nav-cart-btn" class="p-2.5 text-zinc-300 hover:text-[#d4af37] hover:bg-white/5 rounded-full transition-colors relative" aria-label="Shopping Bag">
                <i data-lucide="shopping-bag" class="w-5 h-5"></i>
                <span id="nav-cart-count" class="${cartCount > 0 ? 'scale-100' : 'scale-0'} transition-transform absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#d4af37] text-black text-[10px] font-bold flex items-center justify-center shadow-lg">
                  ${cartCount}
                </span>
              </button>

              <!-- User / Auth Profile Button -->
              <div class="relative group">
                <a href="${user ? '#account' : '#auth'}" class="flex items-center gap-2 p-1.5 rounded-full text-zinc-300 hover:text-[#d4af37] hover:bg-white/5 transition-colors" aria-label="Account">
                  ${user ? `
                    <img src="${user.avatar}" alt="${user.name}" class="w-7 h-7 rounded-full object-cover border border-[#d4af37]">
                    <span class="hidden xl:inline-block text-xs font-medium max-w-[100px] truncate text-zinc-200">${user.name.split(' ')[0]}</span>
                  ` : `
                    <div class="w-7 h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                      <i data-lucide="user" class="w-4 h-4"></i>
                    </div>
                  `}
                </a>

                <!-- User Dropdown Menu -->
                <div class="absolute right-0 mt-2 w-52 bg-[#121215] border border-white/15 rounded-xl shadow-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 backdrop-blur-xl z-50">
                  ${user ? `
                    <div class="px-3 py-2 border-b border-white/10 mb-1">
                      <p class="text-xs font-semibold text-white truncate">${user.name}</p>
                      <p class="text-[10px] text-[#d4af37] truncate">${user.tier || 'VIP Member'}</p>
                    </div>
                    <a href="#account" class="block px-3 py-2 rounded-lg text-xs text-zinc-300 hover:text-white hover:bg-white/5 transition-all">VIP Dashboard</a>
                    <a href="#account-orders" class="block px-3 py-2 rounded-lg text-xs text-zinc-300 hover:text-white hover:bg-white/5 transition-all">Order History</a>
                    <a href="#wishlist" class="block px-3 py-2 rounded-lg text-xs text-zinc-300 hover:text-white hover:bg-white/5 transition-all">Saved Wishlist</a>
                    <div class="my-1 border-t border-white/10"></div>
                    <button id="navbar-logout-btn" class="w-full text-left px-3 py-2 rounded-lg text-xs text-rose-400 hover:bg-rose-500/10 transition-all flex items-center justify-between">
                      <span>Sign Out</span>
                      <i data-lucide="log-out" class="w-3.5 h-3.5"></i>
                    </button>
                  ` : `
                    <div class="px-3 py-2 text-[11px] text-zinc-400 border-b border-white/10 mb-1">
                      Welcome to TIMEORA
                    </div>
                    <a href="#auth" class="block px-3 py-2 rounded-lg text-xs text-white bg-[#d4af37]/20 border border-[#d4af37]/40 hover:bg-[#d4af37]/30 transition-all font-medium text-center mb-1">Sign In / Register</a>
                    <button id="quick-demo-login-nav" class="w-full text-left px-3 py-2 rounded-lg text-[11px] text-[#d4af37] hover:bg-white/5 transition-all">
                      ⚡ Quick VIP Demo Login
                    </button>
                  `}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Mobile Navigation Drawer Overlay -->
    <div id="mobile-drawer" class="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md hidden transition-opacity">
          <div class="fixed inset-y-0 left-0 max-w-xs w-full bg-[#0e0e11] border-r border-[#d4af37]/30 p-6 flex flex-col justify-between shadow-2xl transform -translate-x-full transition-transform duration-300" id="mobile-drawer-content">
            <div>
              <!-- Header with Close Button -->
              <div class="flex items-center justify-between pb-5 border-b border-white/10">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-full border border-[#d4af37] bg-black flex items-center justify-center">
                    <span class="font-serif text-sm font-bold text-[#d4af37]">T</span>
                  </div>
                  <span class="font-serif text-lg font-semibold tracking-widest text-white">TIMEORA</span>
                </div>
                <button id="close-mobile-drawer" class="p-2 text-zinc-400 hover:text-white" aria-label="Close menu">
                  <i data-lucide="x" class="w-5 h-5"></i>
                </button>
              </div>

              <!-- Search in Mobile Menu -->
              <div class="mt-4">
                <button id="mobile-search-trigger" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-zinc-400 text-xs hover:border-[#d4af37]/50 transition-colors">
                  <i data-lucide="search" class="w-4 h-4 text-[#d4af37]"></i>
                  <span>Search timepieces, brands...</span>
                </button>
              </div>

              <!-- Links List -->
              <nav class="mt-6 flex flex-col space-y-3">
                <a href="#home" class="mobile-nav-link text-sm font-medium uppercase tracking-wider text-zinc-300 hover:text-[#d4af37] transition-colors py-1.5 flex items-center justify-between">
                  <span>Home</span>
                  <i data-lucide="chevron-right" class="w-4 h-4 text-zinc-600"></i>
                </a>
                <a href="#shop" class="mobile-nav-link text-sm font-medium uppercase tracking-wider text-zinc-300 hover:text-[#d4af37] transition-colors py-1.5 flex items-center justify-between">
                  <span>Shop All Watches</span>
                  <i data-lucide="chevron-right" class="w-4 h-4 text-zinc-600"></i>
                </a>
                <a href="#collection-mens" class="mobile-nav-link text-sm font-medium uppercase tracking-wider text-zinc-300 hover:text-[#d4af37] transition-colors py-1.5 flex items-center justify-between">
                  <span>Men's Watches</span>
                  <i data-lucide="chevron-right" class="w-4 h-4 text-zinc-600"></i>
                </a>
                <a href="#collection-womens" class="mobile-nav-link text-sm font-medium uppercase tracking-wider text-zinc-300 hover:text-[#d4af37] transition-colors py-1.5 flex items-center justify-between">
                  <span>Women's Watches</span>
                  <i data-lucide="chevron-right" class="w-4 h-4 text-zinc-600"></i>
                </a>
                <a href="#collection-luxury" class="mobile-nav-link text-sm font-medium uppercase tracking-wider text-zinc-300 hover:text-[#d4af37] transition-colors py-1.5 flex items-center justify-between">
                  <span>Luxury Collection</span>
                  <i data-lucide="chevron-right" class="w-4 h-4 text-zinc-600"></i>
                </a>
                <a href="#collection-classic" class="mobile-nav-link text-sm font-medium uppercase tracking-wider text-zinc-300 hover:text-[#d4af37] transition-colors py-1.5 flex items-center justify-between">
                  <span>Classic Collection</span>
                  <i data-lucide="chevron-right" class="w-4 h-4 text-zinc-600"></i>
                </a>
                <a href="#collection-sport" class="mobile-nav-link text-sm font-medium uppercase tracking-wider text-zinc-300 hover:text-[#d4af37] transition-colors py-1.5 flex items-center justify-between">
                  <span>Sport Collection</span>
                  <i data-lucide="chevron-right" class="w-4 h-4 text-zinc-600"></i>
                </a>
                <a href="#collection-minimal" class="mobile-nav-link text-sm font-medium uppercase tracking-wider text-zinc-300 hover:text-[#d4af37] transition-colors py-1.5 flex items-center justify-between">
                  <span>Minimalist Collection</span>
                  <i data-lucide="chevron-right" class="w-4 h-4 text-zinc-600"></i>
                </a>
                <a href="#collection-new" class="mobile-nav-link text-sm font-medium uppercase tracking-wider text-zinc-300 hover:text-[#d4af37] transition-colors py-1.5 flex items-center justify-between">
                  <span>New Arrivals</span>
                  <i data-lucide="chevron-right" class="w-4 h-4 text-zinc-600"></i>
                </a>
                <a href="#collection-sale" class="mobile-nav-link text-sm font-medium uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors py-1.5 flex items-center justify-between">
                  <span>Special Vault Sale</span>
                  <span class="text-[10px] px-2 py-0.5 rounded bg-amber-400/20 text-amber-300">Offers</span>
                </a>
                <a href="#about" class="mobile-nav-link text-sm font-medium uppercase tracking-wider text-zinc-300 hover:text-[#d4af37] transition-colors py-1.5">About TIMEORA</a>
                <a href="#contact" class="mobile-nav-link text-sm font-medium uppercase tracking-wider text-zinc-300 hover:text-[#d4af37] transition-colors py-1.5">Boutiques & Contact</a>
              </nav>
            </div>

            <!-- Mobile Footer / Auth -->
            <div class="pt-6 border-t border-white/10">
              ${user ? `
                <div class="flex items-center gap-3 mb-3">
                  <img src="${user.avatar}" alt="${user.name}" class="w-9 h-9 rounded-full border border-[#d4af37]">
                  <div class="min-w-0">
                    <p class="text-xs font-semibold text-white truncate">${user.name}</p>
                    <p class="text-[10px] text-[#d4af37] truncate">${user.email}</p>
                  </div>
                </div>
                <div class="flex gap-2">
                  <a href="#account" class="flex-1 text-center py-2 rounded bg-white/10 text-xs font-medium text-white hover:bg-white/20 transition-all">Account</a>
                  <button id="mobile-logout-btn" class="px-3 py-2 rounded bg-rose-500/20 text-rose-300 text-xs hover:bg-rose-500/30 transition-all">Sign Out</button>
                </div>
              ` : `
                <a href="#auth" class="block w-full py-2.5 text-center text-xs font-semibold uppercase tracking-widest text-black bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] rounded-lg shadow-lg hover:opacity-90 transition-opacity">
                  Sign In / Register
                </a>
              `}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static setupEvents() {
    // Mobile Drawer Logic
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const closeMobileDrawerBtn = document.getElementById("close-mobile-drawer");
    const mobileDrawer = document.getElementById("mobile-drawer");
    const mobileDrawerContent = document.getElementById("mobile-drawer-content");

    const openDrawer = () => {
      if (mobileDrawer && mobileDrawerContent) {
        mobileDrawer.classList.remove("hidden");
        requestAnimationFrame(() => {
          mobileDrawerContent.classList.remove("-translate-x-full");
        });
      }
    };

    const closeDrawer = () => {
      if (mobileDrawer && mobileDrawerContent) {
        mobileDrawerContent.classList.add("-translate-x-full");
        setTimeout(() => {
          mobileDrawer.classList.add("hidden");
        }, 300);
      }
    };

    if (mobileMenuBtn) mobileMenuBtn.addEventListener("click", openDrawer);
    if (closeMobileDrawerBtn) closeMobileDrawerBtn.addEventListener("click", closeDrawer);
    if (mobileDrawer) {
      mobileDrawer.addEventListener("click", (e) => {
        if (e.target === mobileDrawer) closeDrawer();
      });
    }

    // Close mobile drawer on link click
    document.querySelectorAll(".mobile-nav-link").forEach(link => {
      link.addEventListener("click", closeDrawer);
    });

    // Mobile Search trigger
    const mobileSearchTrigger = document.getElementById("mobile-search-trigger");
    if (mobileSearchTrigger) {
      mobileSearchTrigger.addEventListener("click", () => {
        closeDrawer();
        store.emit("search:toggle", true);
      });
    }

    // Global Search button
    const navSearchBtn = document.getElementById("nav-search-btn");
    if (navSearchBtn) {
      navSearchBtn.addEventListener("click", () => {
        store.emit("search:toggle", true);
      });
    }

    // Quick Cart Drawer trigger
    const navCartBtn = document.getElementById("nav-cart-btn");
    if (navCartBtn) {
      navCartBtn.addEventListener("click", () => {
        store.emit("cartDrawer:toggle", true);
      });
    }

    // Quick Demo Login Button in Nav
    const quickDemoLoginNav = document.getElementById("quick-demo-login-nav");
    if (quickDemoLoginNav) {
      quickDemoLoginNav.addEventListener("click", () => {
        store.loginDemoUser();
      });
    }

    // Logout Buttons
    const navbarLogoutBtn = document.getElementById("navbar-logout-btn");
    if (navbarLogoutBtn) {
      navbarLogoutBtn.addEventListener("click", () => store.logout());
    }
    const mobileLogoutBtn = document.getElementById("mobile-logout-btn");
    if (mobileLogoutBtn) {
      mobileLogoutBtn.addEventListener("click", () => {
        store.logout();
        closeDrawer();
      });
    }

    // Sync Badges on Store Updates
    store.subscribe("cart:updated", () => {
      const count = store.getCartCount();
      const el = document.getElementById("nav-cart-count");
      if (el) {
        el.textContent = count;
        if (count > 0) {
          el.classList.remove("scale-0");
          el.classList.add("scale-100");
        } else {
          el.classList.remove("scale-100");
          el.classList.add("scale-0");
        }
      }
    });

    store.subscribe("wishlist:updated", () => {
      const count = store.getWishlistCount();
      const el = document.getElementById("nav-wishlist-count");
      if (el) {
        el.textContent = count;
        if (count > 0) {
          el.classList.remove("scale-0");
          el.classList.add("scale-100");
        } else {
          el.classList.remove("scale-100");
          el.classList.add("scale-0");
        }
      }
    });

    // Highlight active route
    this.updateActiveLink();
  }

  static updateActiveLink() {
    const hash = window.location.hash || "#home";
    const cleanHash = hash.split("?")[0].replace("#", "") || "home";
    document.querySelectorAll(".nav-link").forEach(link => {
      const route = link.getAttribute("data-route");
      if (route === cleanHash) {
        link.classList.add("text-[#d4af37]", "border-b-2", "border-[#d4af37]");
        link.classList.remove("text-zinc-300");
      } else {
        link.classList.remove("text-[#d4af37]", "border-b-2", "border-[#d4af37]");
        link.classList.add("text-zinc-300");
      }
    });
  }
}
