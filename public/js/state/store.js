/**
 * TIMEORA - Central Reactive State Store
 * Handles Cart, Wishlist, Authentication, Filters, Notifications, and Event Dispatching.
 */

import { Storage, VALID_COUPONS } from "./storage.js";
import { PRODUCTS } from "../data/products.js";

class Store {
  constructor() {
    this.cart = Storage.getCart();
    this.wishlist = Storage.getWishlist();
    this.user = Storage.getUser();
    this.appliedCoupon = null;
    this.discountAmount = 0;
    this.shippingMethod = "complimentary";
    this.shippingCost = 0;

    this.filters = {
      search: "",
      category: "All",
      brand: "All",
      minPrice: 0,
      maxPrice: 60000,
      gender: "All",
      strapMaterial: "All",
      caseMaterial: "All",
      color: "All",
      minRating: 0,
      inStockOnly: false,
      sortBy: "featured" // featured, newest, price-asc, price-desc, rating, bestseller
    };

    this.listeners = new Map();
  }

  // Subscribe to changes
  subscribe(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);
    return () => this.listeners.get(event).delete(callback);
  }

  // Emit event to subscribers
  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(cb => {
        try {
          cb(data);
        } catch (err) {
          console.error(`Error in subscriber callback for ${event}:`, err);
        }
      });
    }
  }

  /* ==========================================================================
     CART MANAGEMENT
     ========================================================================== */

  getCartItems() {
    return this.cart;
  }

  getCartCount() {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  getCartSubtotal() {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getCartDiscount() {
    const subtotal = this.getCartSubtotal();
    if (!this.appliedCoupon) return 0;
    if (this.appliedCoupon.type === "percent") {
      return (subtotal * this.appliedCoupon.value) / 100;
    }
    if (this.appliedCoupon.type === "fixed") {
      return Math.min(this.appliedCoupon.value, subtotal);
    }
    return 0;
  }

  getShippingCost() {
    const subtotal = this.getCartSubtotal();
    if (subtotal === 0) return 0;
    if (this.shippingMethod === "express") return 150;
    if (this.shippingMethod === "whiteglove") return 350;
    return 0; // Complimentary Insured Courier is free
  }

  getCartTotal() {
    const subtotal = this.getCartSubtotal();
    if (subtotal === 0) return 0;
    const discount = this.getCartDiscount();
    const shipping = this.getShippingCost();
    return Math.max(0, subtotal - discount + shipping);
  }

  addToCart(productId, quantity = 1, notify = true) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return false;

    const existingIndex = this.cart.findIndex(item => item.productId === productId);
    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += quantity;
    } else {
      this.cart.push({
        productId: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.images[0],
        category: product.category,
        quantity: quantity,
        maxStock: product.stock
      });
    }

    Storage.setCart(this.cart);
    this.emit("cart:updated", this.cart);

    if (notify) {
      this.showToast({
        title: "Added to Cart",
        message: `${product.name} has been added to your shopping bag.`,
        type: "success",
        actionText: "View Bag",
        actionRoute: "#cart"
      });
    }
    return true;
  }

  updateCartQuantity(productId, quantity) {
    const index = this.cart.findIndex(item => item.productId === productId);
    if (index === -1) return;

    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    const product = PRODUCTS.find(p => p.id === productId);
    const maxStock = product ? product.stock : 10;
    this.cart[index].quantity = Math.min(quantity, maxStock);

    Storage.setCart(this.cart);
    this.emit("cart:updated", this.cart);
  }

  removeFromCart(productId, notify = true) {
    const item = this.cart.find(i => i.productId === productId);
    this.cart = this.cart.filter(i => i.productId !== productId);
    Storage.setCart(this.cart);
    this.emit("cart:updated", this.cart);

    if (notify && item) {
      this.showToast({
        title: "Removed from Bag",
        message: `${item.name} was removed from your bag.`,
        type: "info"
      });
    }
  }

  clearCart() {
    this.cart = [];
    this.appliedCoupon = null;
    Storage.setCart(this.cart);
    this.emit("cart:updated", this.cart);
  }

  applyCoupon(code) {
    if (!code) return { success: false, message: "Please enter a valid coupon code." };
    const formatted = code.trim().toUpperCase();
    const coupon = VALID_COUPONS[formatted];

    if (coupon) {
      this.appliedCoupon = { code: formatted, ...coupon };
      this.emit("cart:updated", this.cart);
      this.showToast({
        title: "Coupon Applied",
        message: `Privilege code ${formatted} (${coupon.label}) applied successfully.`,
        type: "success"
      });
      return { success: true, coupon: this.appliedCoupon };
    } else {
      return { success: false, message: "Invalid or expired promotional code. Try TIMEORA10 or LUXURY50." };
    }
  }

  removeCoupon() {
    this.appliedCoupon = null;
    this.emit("cart:updated", this.cart);
    this.showToast({
      title: "Coupon Removed",
      message: "Promotional discount removed.",
      type: "info"
    });
  }

  setShippingMethod(method) {
    this.shippingMethod = method;
    this.emit("cart:updated", this.cart);
  }

  /* ==========================================================================
     WISHLIST MANAGEMENT
     ========================================================================== */

  getWishlist() {
    return this.wishlist;
  }

  getWishlistCount() {
    return this.wishlist.length;
  }

  isInWishlist(productId) {
    return this.wishlist.includes(productId);
  }

  toggleWishlist(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return false;

    if (this.isInWishlist(productId)) {
      this.wishlist = this.wishlist.filter(id => id !== productId);
      Storage.setWishlist(this.wishlist);
      this.emit("wishlist:updated", this.wishlist);
      this.showToast({
        title: "Removed from Wishlist",
        message: `${product.name} removed from your private wishlist.`,
        type: "info"
      });
      return false;
    } else {
      this.wishlist.push(productId);
      Storage.setWishlist(this.wishlist);
      this.emit("wishlist:updated", this.wishlist);
      this.showToast({
        title: "Added to Wishlist",
        message: `${product.name} saved to your private wishlist.`,
        type: "success",
        actionText: "View Wishlist",
        actionRoute: "#wishlist"
      });
      return true;
    }
  }

  moveWishlistToCart(productId) {
    this.addToCart(productId, 1, false);
    this.wishlist = this.wishlist.filter(id => id !== productId);
    Storage.setWishlist(this.wishlist);
    this.emit("wishlist:updated", this.wishlist);
    this.showToast({
      title: "Moved to Bag",
      message: "Watch moved to your shopping bag.",
      type: "success"
    });
  }

  moveAllWishlistToCart() {
    if (this.wishlist.length === 0) return;
    this.wishlist.forEach(id => {
      this.addToCart(id, 1, false);
    });
    const count = this.wishlist.length;
    this.wishlist = [];
    Storage.setWishlist(this.wishlist);
    this.emit("wishlist:updated", this.wishlist);
    this.showToast({
      title: "All Watches Moved to Bag",
      message: `${count} timepieces moved to your shopping bag.`,
      type: "success"
    });
  }

  clearWishlist() {
    this.wishlist = [];
    Storage.setWishlist(this.wishlist);
    this.emit("wishlist:updated", this.wishlist);
    this.showToast({
      title: "Wishlist Cleared",
      message: "Your private wishlist is now empty.",
      type: "info"
    });
  }

  /* ==========================================================================
     AUTHENTICATION & USER
     ========================================================================== */

  getUser() {
    return this.user;
  }

  isAuthenticated() {
    return !!this.user;
  }

  login(email, password, remember = true) {
    // Demo authentication: allow test logins
    const user = {
      id: "usr_" + Math.random().toString(36).substr(2, 9),
      name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, l => l.toUpperCase()),
      email: email,
      phone: "+41 22 819 9000",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      tier: "TIMEORA Collector Member",
      addresses: [
        {
          id: "addr_main",
          title: "Primary Residence",
          fullName: email.split("@")[0],
          address: "740 Park Avenue",
          city: "New York",
          postalCode: "10021",
          country: "United States",
          isDefault: true
        }
      ]
    };

    this.user = user;
    if (remember) {
      Storage.setUser(user);
    }
    this.emit("auth:updated", this.user);
    this.showToast({
      title: "Welcome to TIMEORA",
      message: `Signed in as ${user.name}.`,
      type: "success"
    });
    return user;
  }

  loginDemoUser() {
    const demoUser = {
      id: "usr_vip_007",
      name: "Lord Julian Sterling",
      email: "julian.sterling@timeora-haute.ch",
      phone: "+41 22 819 9000",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      tier: "TIMEORA Haute Horlogerie VIP Member",
      addresses: [
        {
          id: "addr_1",
          title: "Geneva Penthouse (Primary)",
          fullName: "Lord Julian Sterling",
          address: "14 Rue du Rhône, Apt 7B",
          city: "Geneva",
          postalCode: "1204",
          country: "Switzerland",
          isDefault: true
        },
        {
          id: "addr_2",
          title: "Mayfair Residence",
          fullName: "Lord Julian Sterling",
          address: "28 Old Bond Street",
          city: "London",
          postalCode: "W1S 4QR",
          country: "United Kingdom",
          isDefault: false
        }
      ]
    };
    this.user = demoUser;
    Storage.setUser(demoUser);
    this.emit("auth:updated", this.user);
    this.showToast({
      title: "VIP Demo Signed In",
      message: `Welcome back, Lord Julian Sterling.`,
      type: "success"
    });
    return demoUser;
  }

  signup(fullName, email, password) {
    const user = {
      id: "usr_" + Math.random().toString(36).substr(2, 9),
      name: fullName,
      email: email,
      phone: "+1 (555) 019-2831",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      tier: "TIMEORA Member",
      addresses: []
    };
    this.user = user;
    Storage.setUser(user);
    this.emit("auth:updated", this.user);
    this.showToast({
      title: "Account Created",
      message: `Welcome to the TIMEORA Circle, ${fullName}.`,
      type: "success"
    });
    return user;
  }

  updateProfile(updates) {
    if (!this.user) return;
    this.user = { ...this.user, ...updates };
    Storage.setUser(this.user);
    this.emit("auth:updated", this.user);
    this.showToast({
      title: "Profile Updated",
      message: "Your account credentials have been saved.",
      type: "success"
    });
  }

  logout() {
    this.user = null;
    Storage.clearUser();
    this.emit("auth:updated", null);
    this.showToast({
      title: "Signed Out",
      message: "You have safely signed out of your account.",
      type: "info"
    });
  }

  /* ==========================================================================
     ORDERS & CHECKOUT
     ========================================================================== */

  createOrder(orderData) {
    const newOrder = {
      id: "TMO-" + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toISOString(),
      status: "Processing",
      shippingMethod: orderData.shippingMethodName || "Complimentary Insured Courier",
      trackingNumber: "CH-AIR-" + Math.floor(1000000 + Math.random() * 9000000),
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      customer: {
        fullName: orderData.fullName,
        email: orderData.email,
        phone: orderData.phone,
        address: `${orderData.address}, ${orderData.city} ${orderData.postalCode}, ${orderData.country}`
      },
      items: [...this.cart],
      subtotal: this.getCartSubtotal(),
      discountAmount: this.getCartDiscount(),
      couponCode: this.appliedCoupon ? this.appliedCoupon.code : null,
      shippingCost: this.getShippingCost(),
      tax: 0,
      total: this.getCartTotal(),
      paymentMethod: orderData.paymentMethodName || "Encrypted Credit Card"
    };

    Storage.saveOrder(newOrder);
    this.clearCart();
    this.emit("order:created", newOrder);
    return newOrder;
  }

  getOrders() {
    return Storage.getOrders();
  }

  /* ==========================================================================
     FILTERS & SHOP STATE
     ========================================================================== */

  setFilter(key, value) {
    this.filters[key] = value;
    this.emit("filter:updated", this.filters);
  }

  resetFilters() {
    this.filters = {
      search: "",
      category: "All",
      brand: "All",
      minPrice: 0,
      maxPrice: 60000,
      gender: "All",
      strapMaterial: "All",
      caseMaterial: "All",
      color: "All",
      minRating: 0,
      inStockOnly: false,
      sortBy: "featured"
    };
    this.emit("filter:updated", this.filters);
  }

  getFilteredProducts() {
    let result = [...PRODUCTS];
    const f = this.filters;

    // Search query
    if (f.search && f.search.trim()) {
      const q = f.search.toLowerCase().trim();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q)) ||
        p.shortDescription.toLowerCase().includes(q)
      );
    }

    // Category
    if (f.category && f.category !== "All") {
      result = result.filter(p => p.category.toLowerCase() === f.category.toLowerCase());
    }

    // Brand
    if (f.brand && f.brand !== "All") {
      result = result.filter(p => p.brand.toLowerCase() === f.brand.toLowerCase());
    }

    // Gender
    if (f.gender && f.gender !== "All") {
      result = result.filter(p => p.gender.toLowerCase() === f.gender.toLowerCase() || p.gender === "Unisex");
    }

    // Price range
    result = result.filter(p => p.price >= f.minPrice && p.price <= f.maxPrice);

    // Strap Material
    if (f.strapMaterial && f.strapMaterial !== "All") {
      result = result.filter(p => p.specs.strapMaterial.toLowerCase().includes(f.strapMaterial.toLowerCase()));
    }

    // Case Material
    if (f.caseMaterial && f.caseMaterial !== "All") {
      result = result.filter(p => p.specs.caseMaterial.toLowerCase().includes(f.caseMaterial.toLowerCase()));
    }

    // Color
    if (f.color && f.color !== "All") {
      const c = f.color.toLowerCase();
      result = result.filter(p => 
        (p.strapColor && p.strapColor.toLowerCase().includes(c)) ||
        (p.caseColor && p.caseColor.toLowerCase().includes(c)) ||
        (p.specs.dialColor && p.specs.dialColor.toLowerCase().includes(c))
      );
    }

    // Rating
    if (f.minRating > 0) {
      result = result.filter(p => p.rating >= f.minRating);
    }

    // In-stock
    if (f.inStockOnly) {
      result = result.filter(p => p.stock > 0);
    }

    // Sorting
    switch (f.sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "bestseller":
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return result;
  }

  /* ==========================================================================
     TOAST NOTIFICATIONS
     ========================================================================== */

  showToast(toast) {
    const payload = {
      id: "toast_" + Math.random().toString(36).substr(2, 9),
      title: toast.title || "Notification",
      message: toast.message || "",
      type: toast.type || "info", // success, info, warning, error
      actionText: toast.actionText || null,
      actionRoute: toast.actionRoute || null,
      duration: toast.duration || 4500
    };
    this.emit("toast:show", payload);
  }
}

export const store = new Store();
