/**
 * TIMEORA - Application Coordinator & SPA Router
 */

import { Navbar } from "./components/navbar.js";
import { Footer } from "./components/footer.js";
import { ToastManager } from "./components/toast.js";
import { SearchModal } from "./components/searchModal.js";
import { CartDrawer } from "./components/cartDrawer.js";
import { QuickViewModal } from "./components/quickView.js";

import { HomePage } from "./pages/home.js";
import { ShopPage } from "./pages/shop.js";
import { ProductDetailPage } from "./pages/productDetail.js";
import { CartPage } from "./pages/cart.js";
import { WishlistPage } from "./pages/wishlist.js";
import { CheckoutPage } from "./pages/checkout.js";
import { OrderSuccessPage } from "./pages/orderSuccess.js";
import { AuthPage } from "./pages/auth.js";
import { AccountPage } from "./pages/account.js";
import { AboutPage } from "./pages/about.js";
import { ContactPage } from "./pages/contact.js";

import { store } from "./state/store.js";

class App {
  static init() {
    // 1. Render App Skeleton (Navbar, Main Content, Footer)
    const appRoot = document.getElementById("app");
    if (!appRoot) return;

    appRoot.innerHTML = `
      <div class="min-h-screen flex flex-col bg-[#070709] text-white selection:bg-[#d4af37] selection:text-black">
        <div id="navbar-root"></div>
        <main id="main-content" class="flex-1"></main>
        <div id="footer-root"></div>
      </div>
    `;

    // 2. Initialize Persistent UI Components
    ToastManager.init();
    SearchModal.init();
    CartDrawer.init();
    QuickViewModal.init();

    // 3. Render Navbar and Footer
    App.renderNavbar();
    App.renderFooter();

    // 4. Listen for Route Changes
    window.addEventListener("hashchange", () => App.handleRoute());
    
    // 5. Reactive Listeners for UI Re-renders
    store.subscribe("cart:updated", () => {
      const hash = window.location.hash || "#home";
      if (hash === "#cart") {
        App.handleRoute();
      }
    });

    store.subscribe("wishlist:updated", () => {
      const hash = window.location.hash || "#home";
      if (hash === "#wishlist") {
        App.handleRoute();
      }
    });

    store.subscribe("auth:updated", () => {
      App.renderNavbar();
      const hash = window.location.hash || "#home";
      if (hash.startsWith("#account") || hash.startsWith("#auth")) {
        App.handleRoute();
      }
    });

    store.subscribe("filter:updated", () => {
      const hash = window.location.hash || "#home";
      if (hash.startsWith("#shop") || hash.startsWith("#collection-")) {
        App.renderPage(ShopPage.render(), () => ShopPage.setupEvents());
      }
    });

    // 6. Handle Initial Route
    App.handleRoute();
  }

  static renderNavbar() {
    const navbarRoot = document.getElementById("navbar-root");
    if (navbarRoot) {
      navbarRoot.innerHTML = Navbar.render();
      Navbar.setupEvents();
      if (window.lucide) window.lucide.createIcons();
    }
  }

  static renderFooter() {
    const footerRoot = document.getElementById("footer-root");
    if (footerRoot) {
      footerRoot.innerHTML = Footer.render();
      Footer.setupEvents();
      if (window.lucide) window.lucide.createIcons();
    }
  }

  static handleRoute() {
    const hash = window.location.hash || "#home";
    const main = document.getElementById("main-content");
    if (!main) return;

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Update active nav indicators
    Navbar.updateActiveLink();

    // Parse route
    if (hash === "" || hash === "#" || hash === "#home") {
      App.renderPage(HomePage.render(), () => HomePage.setupEvents());
    } else if (hash === "#shop") {
      store.filters.category = "All";
      store.filters.gender = "All";
      App.renderPage(ShopPage.render(), () => ShopPage.setupEvents());
    } else if (hash === "#collection-luxury") {
      App.renderPage(ShopPage.render({ category: "Luxury" }), () => ShopPage.setupEvents());
    } else if (hash === "#collection-classic") {
      App.renderPage(ShopPage.render({ category: "Classic" }), () => ShopPage.setupEvents());
    } else if (hash === "#collection-sport") {
      App.renderPage(ShopPage.render({ category: "Sport" }), () => ShopPage.setupEvents());
    } else if (hash === "#collection-minimal") {
      App.renderPage(ShopPage.render({ category: "Minimal" }), () => ShopPage.setupEvents());
    } else if (hash === "#collection-new") {
      App.renderPage(ShopPage.render({ isNew: true }), () => ShopPage.setupEvents());
    } else if (hash === "#collection-sale") {
      App.renderPage(ShopPage.render({ discount: true }), () => ShopPage.setupEvents());
    } else if (hash === "#collection-mens") {
      App.renderPage(ShopPage.render({ gender: "Men" }), () => ShopPage.setupEvents());
    } else if (hash === "#collection-womens") {
      App.renderPage(ShopPage.render({ gender: "Women" }), () => ShopPage.setupEvents());
    } else if (hash.startsWith("#product-")) {
      const productId = hash.replace("#product-", "");
      App.renderPage(ProductDetailPage.render(productId), () => ProductDetailPage.setupEvents(productId));
    } else if (hash === "#cart") {
      App.renderPage(CartPage.render(), () => CartPage.setupEvents());
    } else if (hash === "#wishlist") {
      App.renderPage(WishlistPage.render(), () => WishlistPage.setupEvents());
    } else if (hash === "#checkout") {
      App.renderPage(CheckoutPage.render(), () => CheckoutPage.setupEvents());
    } else if (hash.startsWith("#order-success")) {
      const orderId = hash.replace("#order-success-", "").replace("#order-success", "");
      App.renderPage(OrderSuccessPage.render(orderId), () => OrderSuccessPage.setupEvents());
    } else if (hash === "#auth") {
      App.renderPage(AuthPage.render(false), () => AuthPage.setupEvents(false));
    } else if (hash === "#auth-signup") {
      App.renderPage(AuthPage.render(true), () => AuthPage.setupEvents(true));
    } else if (hash === "#account" || hash === "#account-orders") {
      App.renderPage(AccountPage.render("orders"), () => AccountPage.setupEvents());
    } else if (hash === "#account-profile") {
      App.renderPage(AccountPage.render("profile"), () => AccountPage.setupEvents());
    } else if (hash === "#about") {
      App.renderPage(AboutPage.render(), () => {});
    } else if (hash === "#contact") {
      App.renderPage(ContactPage.render(), () => ContactPage.setupEvents());
    } else {
      // Fallback
      App.renderPage(HomePage.render(), () => HomePage.setupEvents());
    }
  }

  static renderPage(htmlContent, setupFn) {
    const main = document.getElementById("main-content");
    if (!main) return;

    main.innerHTML = `<div class="animate-fade-in">${htmlContent}</div>`;
    if (window.lucide) window.lucide.createIcons();
    if (typeof setupFn === "function") {
      setupFn();
    }
  }
}

// Start application when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
