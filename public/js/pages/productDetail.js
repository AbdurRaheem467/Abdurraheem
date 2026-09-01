/**
 * TIMEORA - Product Details Page
 * Large gallery with hover zoom magnifier, technical specifications,
 * review submission form, stock counter, and related recommendations.
 */

import { PRODUCTS } from "../data/products.js";
import { ProductCard } from "../components/productCard.js";
import { store } from "../state/store.js";
import { Storage } from "../state/storage.js";

export class ProductDetailPage {
  static render(productId) {
    const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];
    const isWishlisted = store.isInWishlist(product.id);
    const hasDiscount = product.discount && product.discount > 0;
    const formattedPrice = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(product.price);
    const formattedOriginal = product.originalPrice ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(product.originalPrice) : null;

    // Custom user reviews from storage
    const customReviews = Storage.getReviews()[product.id] || [];
    const allReviews = [...customReviews, ...product.reviews];

    // Related products (same brand or category)
    const related = PRODUCTS.filter(p => p.id !== product.id && (p.category === product.category || p.brand === product.brand)).slice(0, 4);

    return `
      <div class="product-detail-page max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        
        <!-- Breadcrumb -->
        <nav class="flex items-center gap-2 text-xs font-mono text-zinc-500 uppercase tracking-widest">
          <a href="#home" class="hover:text-[#d4af37] transition-colors">Maison</a>
          <span>/</span>
          <a href="#shop" class="hover:text-[#d4af37] transition-colors">Catalog</a>
          <span>/</span>
          <a href="#shop" class="hover:text-[#d4af37] transition-colors">${product.category}</a>
          <span>/</span>
          <span class="text-zinc-300 truncate">${product.name}</span>
        </nav>

        <!-- Main Product Section: Gallery & Purchase Column -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <!-- Left: Gallery & Zoom Lens -->
          <div class="lg:col-span-7 space-y-4">
            
            <!-- Main Hero Image Frame with Zoom Effect -->
            <div class="relative w-full aspect-square bg-[#15151a] rounded-3xl border border-white/10 p-8 flex items-center justify-center overflow-hidden shadow-2xl group" id="main-image-container">
              
              <!-- Badges -->
              <div class="absolute top-6 left-6 z-10 flex flex-col gap-2 pointer-events-none">
                ${product.isNew ? `
                  <span class="px-3 py-1 rounded-full text-xs uppercase font-bold tracking-widest bg-[#d4af37] text-black shadow-lg">
                    2026 Novelty
                  </span>
                ` : ''}
                ${hasDiscount ? `
                  <span class="px-3 py-1 rounded-full text-xs uppercase font-bold tracking-widest bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-lg">
                    -${product.discount}% Privilege
                  </span>
                ` : ''}
              </div>

              <!-- Zoom Instruction Badge -->
              <div class="absolute bottom-4 right-4 z-10 px-3 py-1 rounded-full bg-black/70 border border-white/15 text-[10px] font-mono text-zinc-400 backdrop-blur-md hidden sm:flex items-center gap-1.5 pointer-events-none">
                <i data-lucide="zoom-in" class="w-3 h-3 text-[#d4af37]"></i>
                Hover to magnify details
              </div>

              <img 
                id="pd-main-img" 
                src="${product.images[0]}" 
                alt="${product.name}" 
                class="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] transition-transform duration-300 transform-gpu cursor-crosshair group-hover:scale-125"
              />
            </div>

            <!-- Thumbnail Carousel -->
            <div class="flex gap-4 overflow-x-auto py-2 custom-scrollbar justify-center sm:justify-start">
              ${product.images.map((img, idx) => `
                <button class="pd-thumb-btn w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border ${idx === 0 ? 'border-[#d4af37] bg-white/10' : 'border-white/10 bg-black/40'} p-2 shrink-0 overflow-hidden hover:border-[#d4af37]/80 transition-all" data-img-src="${img}">
                  <img src="${img}" alt="Angle ${idx + 1}" class="w-full h-full object-contain" />
                </button>
              `).join('')}
            </div>

          </div>

          <!-- Right: Details & Purchase Actions -->
          <div class="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono uppercase tracking-[0.25em] text-[#d4af37]">${product.brand}</span>
                <span class="text-xs font-mono px-3 py-0.5 rounded-full ${product.stock > 0 ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/15 text-rose-300'}">
                  ${product.stock > 0 ? `In Stock (Only ${product.stock} pieces crafted)` : 'Vault Allocated'}
                </span>
              </div>

              <h1 class="font-serif text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-tight">
                ${product.name}
              </h1>

              <!-- Reviews & Rating Summary -->
              <div class="flex items-center gap-3 pt-1">
                <div class="flex text-amber-400">
                  ${Array(5).fill(0).map((_, i) => `
                    <i data-lucide="star" class="w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-zinc-600'}"></i>
                  `).join('')}
                </div>
                <span class="text-xs font-mono font-bold text-white">${product.rating.toFixed(1)}</span>
                <a href="#reviews-section" class="text-xs text-zinc-400 hover:text-[#d4af37] underline transition-colors">
                  (${allReviews.length} Collector Reviews)
                </a>
              </div>
            </div>

            <!-- Price Container -->
            <div class="p-5 rounded-2xl bg-gradient-to-br from-[#16161b] to-[#101014] border border-white/10 flex items-center justify-between">
              <div>
                <div class="text-xs font-mono text-zinc-500 line-through ${hasDiscount ? 'block' : 'hidden'}">
                  ${formattedOriginal}
                </div>
                <div class="font-mono text-3xl font-bold text-white tracking-tight text-glow">
                  ${formattedPrice}
                </div>
              </div>
              <div class="text-right">
                <span class="text-[10px] font-mono text-zinc-400 block uppercase tracking-wider">Duties & Armored Shipping</span>
                <span class="text-xs text-emerald-400 font-medium">Included Worldwide</span>
              </div>
            </div>

            <!-- Short Description -->
            <p class="text-sm text-zinc-300 leading-relaxed font-light">
              ${product.description}
            </p>

            <!-- Key Quick Specifications Grid -->
            <div class="grid grid-cols-2 gap-3 text-xs font-mono bg-white/[0.03] p-4 rounded-2xl border border-white/10">
              <div>
                <span class="text-zinc-500 text-[10px] uppercase block">Diameter & Thickness</span>
                <span class="text-zinc-200">${product.specs.caseDiameter} × ${product.specs.caseThickness}</span>
              </div>
              <div>
                <span class="text-zinc-500 text-[10px] uppercase block">Case Material</span>
                <span class="text-zinc-200 truncate block">${product.specs.caseMaterial}</span>
              </div>
              <div>
                <span class="text-zinc-500 text-[10px] uppercase block">Movement Calibre</span>
                <span class="text-zinc-200 truncate block">${product.specs.movement}</span>
              </div>
              <div>
                <span class="text-zinc-500 text-[10px] uppercase block">Water Resistance</span>
                <span class="text-zinc-200">${product.specs.waterResistance}</span>
              </div>
            </div>

            <!-- Purchasing & Cart Actions -->
            <div class="space-y-3 pt-2">
              
              <div class="flex items-center gap-3">
                <!-- Quantity selector -->
                <div class="flex items-center bg-black/60 border border-white/20 rounded-xl overflow-hidden h-12">
                  <button id="pd-qty-dec" class="px-3 text-zinc-400 hover:text-white transition-colors h-full">-</button>
                  <input id="pd-qty-input" type="number" value="1" min="1" max="${product.stock}" class="w-12 text-center bg-transparent text-sm font-mono text-white focus:outline-none" readonly />
                  <button id="pd-qty-inc" class="px-3 text-zinc-400 hover:text-white transition-colors h-full">+</button>
                </div>

                <!-- Add to Bag Button -->
                <button 
                  id="pd-add-bag-btn" 
                  class="flex-1 h-12 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-black font-semibold text-xs uppercase tracking-widest hover:brightness-110 active:scale-98 shadow-[0_6px_25px_rgba(212,175,55,0.3)] transition-all flex items-center justify-center gap-2"
                  data-product-id="${product.id}"
                >
                  <i data-lucide="shopping-bag" class="w-4 h-4"></i>
                  Add To Shopping Bag
                </button>

                <!-- Wishlist Toggle -->
                <button 
                  id="pd-wishlist-toggle-btn"
                  class="h-12 w-12 rounded-xl bg-white/5 border border-white/15 text-zinc-300 hover:text-red-400 hover:border-red-400/40 flex items-center justify-center transition-colors shrink-0 ${isWishlisted ? 'text-red-500 border-red-500/50 bg-black' : ''}"
                  data-product-id="${product.id}"
                  aria-label="Save to Wishlist"
                >
                  <i data-lucide="heart" class="w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}"></i>
                </button>
              </div>

              <!-- Buy Now Direct Checkout Button -->
              <button 
                id="pd-buy-now-btn" 
                class="w-full h-12 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-widest border border-white/20 backdrop-blur-md transition-all flex items-center justify-center gap-2"
                data-product-id="${product.id}"
              >
                <i data-lucide="zap" class="w-4 h-4 text-[#d4af37]"></i>
                Express Buy Now
              </button>

            </div>

            <!-- Guarantee Badges -->
            <div class="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-center text-[10px] font-mono text-zinc-400">
              <div class="p-2 rounded-xl bg-white/[0.02] border border-white/5">
                <i data-lucide="shield-check" class="w-4 h-4 text-[#d4af37] mx-auto mb-1"></i>
                5-Year Warranty
              </div>
              <div class="p-2 rounded-xl bg-white/[0.02] border border-white/5">
                <i data-lucide="truck" class="w-4 h-4 text-[#d4af37] mx-auto mb-1"></i>
                Insured Armored
              </div>
              <div class="p-2 rounded-xl bg-white/[0.02] border border-white/5">
                <i data-lucide="award" class="w-4 h-4 text-[#d4af37] mx-auto mb-1"></i>
                100% Authentic
              </div>
            </div>

          </div>

        </div>

        <!-- Detailed Tabs Section: Technical Specs, Reviews, Shipping, Warranty -->
        <div class="pt-12 border-t border-white/10" id="reviews-section">
          
          <!-- Tab Navigation -->
          <div class="flex gap-4 border-b border-white/10 overflow-x-auto custom-scrollbar">
            <button class="pd-tab-btn pb-4 text-xs font-mono uppercase tracking-widest text-[#d4af37] border-b-2 border-[#d4af37] font-bold shrink-0" data-tab="specs">
              Technical Specifications
            </button>
            <button class="pd-tab-btn pb-4 text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-colors shrink-0" data-tab="reviews">
              Collector Reviews (${allReviews.length})
            </button>
            <button class="pd-tab-btn pb-4 text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-colors shrink-0" data-tab="delivery">
              White Glove Armored Delivery
            </button>
            <button class="pd-tab-btn pb-4 text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-colors shrink-0" data-tab="warranty">
              Manufacture Warranty & Certificate
            </button>
          </div>

          <!-- Tab Content Panels -->
          <div class="py-8">
            
            <!-- Panel 1: Full Specifications -->
            <div id="tab-specs" class="pd-tab-panel">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#111115] border border-white/10 rounded-2xl p-6 sm:p-8">
                
                <div class="space-y-4">
                  <h4 class="font-serif text-lg font-semibold text-white border-b border-white/10 pb-2">Case & Crystal</h4>
                  <div class="space-y-2 text-xs font-mono">
                    <div class="flex justify-between py-1.5 border-b border-white/5"><span class="text-zinc-500">Diameter:</span><span class="text-zinc-200">${product.specs.caseDiameter}</span></div>
                    <div class="flex justify-between py-1.5 border-b border-white/5"><span class="text-zinc-500">Thickness:</span><span class="text-zinc-200">${product.specs.caseThickness}</span></div>
                    <div class="flex justify-between py-1.5 border-b border-white/5"><span class="text-zinc-500">Case Material:</span><span class="text-zinc-200">${product.specs.caseMaterial}</span></div>
                    <div class="flex justify-between py-1.5 border-b border-white/5"><span class="text-zinc-500">Bezel:</span><span class="text-zinc-200">${product.specs.bezel}</span></div>
                    <div class="flex justify-between py-1.5 border-b border-white/5"><span class="text-zinc-500">Crystal:</span><span class="text-zinc-200">${product.specs.crystal}</span></div>
                    <div class="flex justify-between py-1.5"><span class="text-zinc-500">Case Back:</span><span class="text-zinc-200">${product.specs.caseBack}</span></div>
                  </div>
                </div>

                <div class="space-y-4">
                  <h4 class="font-serif text-lg font-semibold text-white border-b border-white/10 pb-2">Movement & Strap</h4>
                  <div class="space-y-2 text-xs font-mono">
                    <div class="flex justify-between py-1.5 border-b border-white/5"><span class="text-zinc-500">Calibre:</span><span class="text-zinc-200">${product.specs.movement}</span></div>
                    <div class="flex justify-between py-1.5 border-b border-white/5"><span class="text-zinc-500">Power Reserve:</span><span class="text-zinc-200">${product.specs.powerReserve}</span></div>
                    <div class="flex justify-between py-1.5 border-b border-white/5"><span class="text-zinc-500">Water Resistance:</span><span class="text-zinc-200">${product.specs.waterResistance}</span></div>
                    <div class="flex justify-between py-1.5 border-b border-white/5"><span class="text-zinc-500">Strap / Bracelet:</span><span class="text-zinc-200">${product.specs.strapMaterial}</span></div>
                    <div class="flex justify-between py-1.5 border-b border-white/5"><span class="text-zinc-500">Dial Aesthetics:</span><span class="text-zinc-200">${product.specs.dialColor}</span></div>
                    <div class="flex justify-between py-1.5"><span class="text-zinc-500">Manufacture Warranty:</span><span class="text-zinc-200">${product.specs.warranty}</span></div>
                  </div>
                </div>

              </div>
            </div>

            <!-- Panel 2: Customer Reviews & Submission Form -->
            <div id="tab-reviews" class="pd-tab-panel hidden space-y-8">
              
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                <!-- Left: Submit Review Form -->
                <div class="lg:col-span-5 bg-[#121216] border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
                  <h3 class="font-serif text-xl font-semibold text-white">Share Your Experience</h3>
                  <p class="text-xs text-zinc-400">Own this timepiece? Leave an authentic review for the TIMEORA collector circle.</p>

                  <form id="pd-review-form" class="space-y-4" data-product-id="${product.id}">
                    <div>
                      <label class="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1">Your Name</label>
                      <input type="text" id="review-author" required placeholder="Lord Julian Vance" class="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]" />
                    </div>

                    <div>
                      <label class="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1">Rating</label>
                      <select id="review-rating" class="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4af37]">
                        <option value="5">★★★★★ (5.0 - Masterpiece)</option>
                        <option value="4">★★★★☆ (4.0 - Excellent)</option>
                        <option value="3">★★★☆☆ (3.0 - Good)</option>
                      </select>
                    </div>

                    <div>
                      <label class="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1">Review Headline</label>
                      <input type="text" id="review-title" required placeholder="Sublime finishing and accuracy" class="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]" />
                    </div>

                    <div>
                      <label class="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1">Detailed Remarks</label>
                      <textarea id="review-comment" rows="3" required placeholder="Describe your impressions of the wrist presence, weight, and movement..." class="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"></textarea>
                    </div>

                    <button type="submit" class="w-full py-3 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-black font-semibold text-xs uppercase tracking-widest hover:brightness-110 transition-all shadow-lg">
                      Submit Verified Review
                    </button>
                  </form>
                </div>

                <!-- Right: Existing Reviews List -->
                <div class="lg:col-span-7 space-y-4">
                  ${allReviews.map(r => `
                    <div class="p-6 rounded-2xl bg-[#111115] border border-white/10 space-y-3">
                      <div class="flex items-center justify-between">
                        <div class="flex text-amber-400 gap-1">
                          ${Array(5).fill(0).map((_, i) => `<i data-lucide="star" class="w-3.5 h-3.5 ${i < r.rating ? 'fill-amber-400 text-amber-400' : 'text-zinc-600'}"></i>`).join("")}
                        </div>
                        <span class="text-[10px] font-mono text-zinc-500">${r.date}</span>
                      </div>
                      <h4 class="font-serif text-sm font-semibold text-white">“${r.title}”</h4>
                      <p class="text-xs text-zinc-300 leading-relaxed">${r.comment}</p>
                      <div class="pt-2 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                        <span>— ${r.author}</span>
                        <span class="text-emerald-400 flex items-center gap-1">
                          <i data-lucide="check-circle-2" class="w-3 h-3"></i>
                          Verified Collector
                        </span>
                      </div>
                    </div>
                  `).join("")}
                </div>

              </div>

            </div>

            <!-- Panel 3: Delivery Info -->
            <div id="tab-delivery" class="pd-tab-panel hidden bg-[#111115] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                <div class="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                  <i data-lucide="shield" class="w-6 h-6 text-[#d4af37]"></i>
                  <h4 class="font-serif text-base font-semibold text-white">100% Insured Transit</h4>
                  <p class="text-zinc-400 leading-relaxed">All consignments are fully underwritten by Lloyd's of London until safely signed for in your hands.</p>
                </div>
                <div class="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                  <i data-lucide="plane" class="w-6 h-6 text-[#d4af37]"></i>
                  <h4 class="font-serif text-base font-semibold text-white">Express Armored Courier</h4>
                  <p class="text-zinc-400 leading-relaxed">Delivered via tamper-evident diplomatic pouch with real-time GPS satellite tracking.</p>
                </div>
                <div class="p-5 rounded-xl bg-white/5 border border-white/5 space-y-2">
                  <i data-lucide="rotate-ccw" class="w-6 h-6 text-[#d4af37]"></i>
                  <h4 class="font-serif text-base font-semibold text-white">14-Day Vault Returns</h4>
                  <p class="text-zinc-400 leading-relaxed">Complimentary return concierge with full refund if unworn and with seals intact.</p>
                </div>
              </div>
            </div>

            <!-- Panel 4: Warranty -->
            <div id="tab-warranty" class="pd-tab-panel hidden bg-[#111115] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-4">
              <h3 class="font-serif text-xl font-semibold text-white">TIMEORA Manufacture Guarantee</h3>
              <p class="text-xs text-zinc-300 leading-relaxed">
                Your timepiece is covered under the 5-Year TIMEORA International Manufacture Warranty. Each watch is registered in the official Geneva Horological Archive and accompanied by a physical certificate signed by the Master Watchmaker.
              </p>
              <div class="pt-4 flex items-center gap-4 text-xs font-mono text-[#d4af37]">
                <span>✓ 5-Year Global Calibre Warranty</span>
                <span>✓ Lifetime Ultrasonic Cleaning</span>
                <span>✓ Official Registry Registration</span>
              </div>
            </div>

          </div>

        </div>

        <!-- Related Masterpieces Showcase -->
        <div class="pt-12 border-t border-white/10 space-y-8">
          <div class="flex items-center justify-between">
            <div>
              <span class="text-xs font-mono uppercase tracking-[0.3em] text-[#d4af37] block mb-1">Horological Complements</span>
              <h2 class="font-serif text-2xl sm:text-3xl font-semibold text-white">Related Timepieces</h2>
            </div>
            <a href="#shop" class="text-xs uppercase tracking-widest text-[#d4af37] hover:text-white transition-colors">
              Explore All →
            </a>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="pd-related-grid">
            ${related.map(p => ProductCard.render(p)).join("")}
          </div>
        </div>

      </div>
    `;
  }

  static setupEvents(productId) {
    const product = PRODUCTS.find(p => p.id === productId) || PRODUCTS[0];

    ProductCard.setupCardEvents(document.getElementById("pd-related-grid") || document);

    // Gallery Thumbnails
    document.querySelectorAll(".pd-thumb-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const src = btn.getAttribute("data-img-src");
        const mainImg = document.getElementById("pd-main-img");
        if (mainImg && src) {
          mainImg.src = src;
          document.querySelectorAll(".pd-thumb-btn").forEach(b => {
            b.classList.remove("border-[#d4af37]", "bg-white/10");
            b.classList.add("border-white/10", "bg-black/40");
          });
          btn.classList.add("border-[#d4af37]", "bg-white/10");
          btn.classList.remove("border-white/10", "bg-black/40");
        }
      });
    });

    // Quantity selectors
    const qtyInput = document.getElementById("pd-qty-input");
    const qtyDec = document.getElementById("pd-qty-dec");
    const qtyInc = document.getElementById("pd-qty-inc");

    if (qtyDec && qtyInput) {
      qtyDec.addEventListener("click", () => {
        let val = parseInt(qtyInput.value, 10) || 1;
        if (val > 1) qtyInput.value = val - 1;
      });
    }

    if (qtyInc && qtyInput) {
      qtyInc.addEventListener("click", () => {
        let val = parseInt(qtyInput.value, 10) || 1;
        if (val < product.stock) qtyInput.value = val + 1;
      });
    }

    // Add to Bag
    const addBagBtn = document.getElementById("pd-add-bag-btn");
    if (addBagBtn) {
      addBagBtn.addEventListener("click", () => {
        const qty = parseInt(qtyInput ? qtyInput.value : 1, 10) || 1;
        store.addToCart(product.id, qty, true);
      });
    }

    // Buy Now Direct Checkout
    const buyNowBtn = document.getElementById("pd-buy-now-btn");
    if (buyNowBtn) {
      buyNowBtn.addEventListener("click", () => {
        const qty = parseInt(qtyInput ? qtyInput.value : 1, 10) || 1;
        store.addToCart(product.id, qty, false);
        window.location.hash = "#checkout";
      });
    }

    // Wishlist toggle
    const wishlistBtn = document.getElementById("pd-wishlist-toggle-btn");
    if (wishlistBtn) {
      wishlistBtn.addEventListener("click", () => {
        const isSaved = store.toggleWishlist(product.id);
        const icon = wishlistBtn.querySelector("i");
        if (isSaved) {
          wishlistBtn.classList.add("text-red-500", "border-red-500/50", "bg-black");
          if (icon) icon.classList.add("fill-red-500", "text-red-500");
        } else {
          wishlistBtn.classList.remove("text-red-500", "border-red-500/50", "bg-black");
          if (icon) icon.classList.remove("fill-red-500", "text-red-500");
        }
      });
    }

    // Tab Navigation
    document.querySelectorAll(".pd-tab-btn").forEach(tabBtn => {
      tabBtn.addEventListener("click", () => {
        const tabKey = tabBtn.getAttribute("data-tab");
        document.querySelectorAll(".pd-tab-btn").forEach(b => {
          b.classList.remove("text-[#d4af37]", "border-b-2", "border-[#d4af37]", "font-bold");
          b.classList.add("text-zinc-400");
        });
        tabBtn.classList.add("text-[#d4af37]", "border-b-2", "border-[#d4af37]", "font-bold");
        tabBtn.classList.remove("text-zinc-400");

        document.querySelectorAll(".pd-tab-panel").forEach(panel => panel.classList.add("hidden"));
        const target = document.getElementById(`tab-${tabKey}`);
        if (target) {
          target.classList.remove("hidden");
          if (window.lucide) window.lucide.createIcons();
        }
      });
    });

    // Review Submission Form
    const reviewForm = document.getElementById("pd-review-form");
    if (reviewForm) {
      reviewForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const author = document.getElementById("review-author").value.trim();
        const rating = parseInt(document.getElementById("review-rating").value, 10) || 5;
        const title = document.getElementById("review-title").value.trim();
        const comment = document.getElementById("review-comment").value.trim();

        if (!author || !title || !comment) return;

        const newReview = {
          id: Date.now(),
          author,
          rating,
          date: new Date().toISOString().split("T")[0],
          title,
          comment,
          verified: true
        };

        Storage.addReview(product.id, newReview);
        store.showToast({
          title: "Review Published",
          message: "Thank you for contributing your thoughts to the TIMEORA Collector Archive.",
          type: "success"
        });

        // Re-render
        ProductDetailPage.setupEvents(productId);
        window.location.reload();
      });
    }
  }
}
