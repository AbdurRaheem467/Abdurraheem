/**
 * TIMEORA - LocalStorage Persistence & Mock Database
 */

const STORAGE_KEYS = {
  CART: "timeora_cart_v1",
  WISHLIST: "timeora_wishlist_v1",
  AUTH: "timeora_auth_user_v1",
  ORDERS: "timeora_orders_v1",
  REVIEWS: "timeora_custom_reviews_v1",
  COUPONS: "timeora_applied_coupons_v1",
  NEWSLETTER: "timeora_newsletter_subscribers_v1"
};

// Initial Demo User for seamless testing
const DEFAULT_USER = {
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

// Initial Seed Orders for realistic dashboard display
const DEFAULT_ORDERS = [
  {
    id: "TMO-892144",
    date: "2026-07-28T14:30:00.000Z",
    status: "Delivered",
    shippingMethod: "White Glove Armored Concierge",
    trackingNumber: "CH-SEC-9920148",
    estimatedDelivery: "2026-07-30",
    customer: {
      fullName: "Lord Julian Sterling",
      email: "julian.sterling@timeora-haute.ch",
      phone: "+41 22 819 9000",
      address: "14 Rue du Rhône, Apt 7B, Geneva 1204, Switzerland"
    },
    items: [
      {
        productId: "timeora-celestial-tourbillon",
        name: "Celestial Tourbillon Sovereign",
        brand: "TIMEORA Atelier",
        price: 24500,
        quantity: 1,
        image: "images/watches/watch-1.jpg"
      }
    ],
    subtotal: 24500,
    discountAmount: 2450,
    couponCode: "TIMEORA10",
    shippingCost: 0,
    tax: 0,
    total: 22050,
    paymentMethod: "Credit Card (ending in 8842)"
  },
  {
    id: "TMO-773820",
    date: "2026-05-15T10:15:00.000Z",
    status: "Delivered",
    shippingMethod: "Complimentary Insured Courier",
    trackingNumber: "CH-EXP-4401923",
    estimatedDelivery: "2026-05-18",
    customer: {
      fullName: "Lord Julian Sterling",
      email: "julian.sterling@timeora-haute.ch",
      phone: "+41 22 819 9000",
      address: "14 Rue du Rhône, Apt 7B, Geneva 1204, Switzerland"
    },
    items: [
      {
        productId: "chronos-royal-monarch-gold",
        name: "Royal Monarch Chronograph Gold",
        brand: "Chronos Royal",
        price: 18900,
        quantity: 1,
        image: "images/watches/watch-4.jpg"
      }
    ],
    subtotal: 18900,
    discountAmount: 0,
    couponCode: null,
    shippingCost: 0,
    tax: 0,
    total: 18900,
    paymentMethod: "Bank Wire Transfer"
  }
];

export const VALID_COUPONS = {
  "TIMEORA10": { type: "percent", value: 10, label: "10% VIP Inaugural Privilege" },
  "LUXURY50": { type: "fixed", value: 500, label: "Rs. 500 Bespoke Concierge Credit" },
  "GOLDEN20": { type: "percent", value: 20, label: "20% Private Vault Privilege" }
};

export class Storage {
  static get(key, defaultValue = null) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.warn(`Failed reading key ${key} from localStorage:`, e);
      return defaultValue;
    }
  }

  static set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn(`Failed writing key ${key} to localStorage:`, e);
    }
  }

  static getCart() {
    return this.get(STORAGE_KEYS.CART, []);
  }

  static setCart(cart) {
    this.set(STORAGE_KEYS.CART, cart);
  }

  static getWishlist() {
    return this.get(STORAGE_KEYS.WISHLIST, []);
  }

  static setWishlist(wishlist) {
    this.set(STORAGE_KEYS.WISHLIST, wishlist);
  }

  static getUser() {
    return this.get(STORAGE_KEYS.AUTH, null);
  }

  static setUser(user) {
    this.set(STORAGE_KEYS.AUTH, user);
  }

  static clearUser() {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  }

  static getOrders() {
    const orders = this.get(STORAGE_KEYS.ORDERS, null);
    if (!orders) {
      this.set(STORAGE_KEYS.ORDERS, DEFAULT_ORDERS);
      return DEFAULT_ORDERS;
    }
    return orders;
  }

  static saveOrder(newOrder) {
    const orders = this.getOrders();
    orders.unshift(newOrder);
    this.set(STORAGE_KEYS.ORDERS, orders);
    return newOrder;
  }

  static getReviews() {
    return this.get(STORAGE_KEYS.REVIEWS, {});
  }

  static addReview(productId, review) {
    const allReviews = this.getReviews();
    if (!allReviews[productId]) {
      allReviews[productId] = [];
    }
    allReviews[productId].unshift(review);
    this.set(STORAGE_KEYS.REVIEWS, allReviews);
  }

  static subscribeNewsletter(email) {
    const list = this.get(STORAGE_KEYS.NEWSLETTER, []);
    if (!list.includes(email.toLowerCase())) {
      list.push(email.toLowerCase());
      this.set(STORAGE_KEYS.NEWSLETTER, list);
    }
  }
}
