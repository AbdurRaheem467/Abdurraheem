/**
 * TIMEORA - Homepage
 */

import { PRODUCTS } from "../data/products.js";
import { COLLECTIONS } from "../data/collections.js";
import { ProductCard } from "../components/productCard.js";
import { FaqSection } from "../components/faqSection.js";
import { store } from "../state/store.js";
import { Storage } from "../state/storage.js";

export class HomePage {
  static render() {
    const newArrivals = PRODUCTS.filter(p => p.isNew).slice(0, 4);
    const bestSellers = PRODUCTS.filter(p => p.isBestSeller).slice(0, 4);

    return `
      <div class="homepage space-y-24 md:space-y-32 pb-24">
        
        <!-- Hero Section -->
        <section class="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#070709] border-b border-white/10">
          
          <!-- Background Imagery & Atmosphere Lighting -->
          <div class="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=2000&q=85" 
              alt="TIMEORA Haute Horlogerie Background" 
              class="w-full h-full object-cover object-center opacity-30 filter brightness-75 scale-105 transform animate-pulse duration-[10000ms]"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/70 to-transparent"></div>
            <div class="absolute inset-0 bg-radial-vignette opacity-80"></div>
          </div>

          <!-- Hero Content -->
          <div class="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-12 pb-20">
            
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-[#d4af37]/40 backdrop-blur-md mb-8 animate-fade-in">
              <span class="w-2 h-2 rounded-full bg-[#d4af37] animate-ping"></span>
              <span class="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-mono">The 2026 Manufacture Novelties</span>
            </div>

            <h1 class="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-white tracking-tight leading-[1.08] mb-6 drop-shadow-2xl">
              TIMELESS DESIGN.<br/>
              <span class="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f3e5ab] to-[#d4af37]">UNMATCHED PRECISION.</span>
            </h1>

            <p class="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-zinc-300 font-light leading-relaxed mb-10">
              Discover watches crafted for those who value every second. Masterfully engineered in Switzerland with aerospace-grade metals and haute horlogerie tourbillons.
            </p>

            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#collection-mens" 
                class="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-black font-semibold text-xs uppercase tracking-[0.2em] hover:brightness-110 active:scale-95 shadow-[0_10px_30px_rgba(212,175,55,0.3)] transition-all flex items-center justify-center gap-2"
              >
                <span>Shop Men's Watches</span>
                <i data-lucide="arrow-right" class="w-4 h-4"></i>
              </a>
              <a 
                href="#collection-womens" 
                class="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-[0.2em] border border-white/20 backdrop-blur-md transition-all flex items-center justify-center gap-2"
              >
                <span>Shop Women's Watches</span>
              </a>
            </div>

            <!-- Horology Trust Badges -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 mt-16 border-t border-white/10 text-center max-w-4xl mx-auto">
              <div>
                <div class="font-serif text-2xl font-bold text-white tracking-wide">1928</div>
                <div class="text-[11px] font-mono uppercase tracking-widest text-[#d4af37] mt-0.5">Swiss Heritage</div>
              </div>
              <div>
                <div class="font-serif text-2xl font-bold text-white tracking-wide">COSC</div>
                <div class="text-[11px] font-mono uppercase tracking-widest text-[#d4af37] mt-0.5">Certified Precision</div>
              </div>
              <div>
                <div class="font-serif text-2xl font-bold text-white tracking-wide">5-Year</div>
                <div class="text-[11px] font-mono uppercase tracking-widest text-[#d4af37] mt-0.5">Global Warranty</div>
              </div>
              <div>
                <div class="font-serif text-2xl font-bold text-white tracking-wide">100%</div>
                <div class="text-[11px] font-mono uppercase tracking-widest text-[#d4af37] mt-0.5">Hand-Finished</div>
              </div>
            </div>

          </div>
        </section>

        <!-- Featured Collections Section -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span class="text-xs font-mono uppercase tracking-[0.3em] text-[#d4af37] block mb-2">Curated Horizons</span>
              <h2 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight">Featured Collections</h2>
            </div>
            <a href="#shop" class="text-xs uppercase tracking-[0.2em] text-[#d4af37] hover:text-white transition-colors flex items-center gap-1.5 self-start md:self-auto font-medium">
              <span>View All 6 Collections</span>
              <i data-lucide="chevron-right" class="w-4 h-4"></i>
            </a>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <!-- Card 1: Luxury -->
            <div class="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#121216] aspect-[4/5] flex flex-col justify-end p-6 hover:border-[#d4af37]/60 transition-all duration-500 shadow-xl">
              <img 
                src="${COLLECTIONS.luxury.image}" 
                alt="Luxury Collection" 
                class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              <div class="relative z-10 space-y-2">
                <span class="text-[10px] font-mono uppercase tracking-widest text-[#d4af37] bg-black/60 px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-md inline-block">Haute Horlogerie</span>
                <h3 class="font-serif text-2xl font-bold text-white">Luxury Collection</h3>
                <p class="text-xs text-zinc-300 line-clamp-2 leading-relaxed font-light">${COLLECTIONS.luxury.description}</p>
                <a href="#collection-luxury" class="inline-flex items-center gap-2 pt-2 text-xs font-semibold uppercase tracking-widest text-[#d4af37] group-hover:text-white transition-colors">
                  <span>Explore Collection</span>
                  <i data-lucide="arrow-right" class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"></i>
                </a>
              </div>
            </div>

            <!-- Card 2: Classic -->
            <div class="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#121216] aspect-[4/5] flex flex-col justify-end p-6 hover:border-[#d4af37]/60 transition-all duration-500 shadow-xl">
              <img 
                src="${COLLECTIONS.classic.image}" 
                alt="Classic Collection" 
                class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              <div class="relative z-10 space-y-2">
                <span class="text-[10px] font-mono uppercase tracking-widest text-[#d4af37] bg-black/60 px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-md inline-block">Timeless Lineage</span>
                <h3 class="font-serif text-2xl font-bold text-white">Classic Collection</h3>
                <p class="text-xs text-zinc-300 line-clamp-2 leading-relaxed font-light">${COLLECTIONS.classic.description}</p>
                <a href="#collection-classic" class="inline-flex items-center gap-2 pt-2 text-xs font-semibold uppercase tracking-widest text-[#d4af37] group-hover:text-white transition-colors">
                  <span>Explore Collection</span>
                  <i data-lucide="arrow-right" class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"></i>
                </a>
              </div>
            </div>

            <!-- Card 3: Sport -->
            <div class="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#121216] aspect-[4/5] flex flex-col justify-end p-6 hover:border-[#d4af37]/60 transition-all duration-500 shadow-xl">
              <img 
                src="${COLLECTIONS.sport.image}" 
                alt="Sport Collection" 
                class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              <div class="relative z-10 space-y-2">
                <span class="text-[10px] font-mono uppercase tracking-widest text-[#d4af37] bg-black/60 px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-md inline-block">High Octane</span>
                <h3 class="font-serif text-2xl font-bold text-white">Sport Collection</h3>
                <p class="text-xs text-zinc-300 line-clamp-2 leading-relaxed font-light">${COLLECTIONS.sport.description}</p>
                <a href="#collection-sport" class="inline-flex items-center gap-2 pt-2 text-xs font-semibold uppercase tracking-widest text-[#d4af37] group-hover:text-white transition-colors">
                  <span>Explore Collection</span>
                  <i data-lucide="arrow-right" class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"></i>
                </a>
              </div>
            </div>

            <!-- Card 4: Minimal -->
            <div class="group relative rounded-2xl overflow-hidden border border-white/10 bg-[#121216] aspect-[4/5] flex flex-col justify-end p-6 hover:border-[#d4af37]/60 transition-all duration-500 shadow-xl">
              <img 
                src="${COLLECTIONS.minimal.image}" 
                alt="Minimal Collection" 
                class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              <div class="relative z-10 space-y-2">
                <span class="text-[10px] font-mono uppercase tracking-widest text-[#d4af37] bg-black/60 px-2.5 py-1 rounded-full border border-white/10 backdrop-blur-md inline-block">Pure Modern</span>
                <h3 class="font-serif text-2xl font-bold text-white">Minimal Collection</h3>
                <p class="text-xs text-zinc-300 line-clamp-2 leading-relaxed font-light">${COLLECTIONS.minimal.description}</p>
                <a href="#collection-minimal" class="inline-flex items-center gap-2 pt-2 text-xs font-semibold uppercase tracking-widest text-[#d4af37] group-hover:text-white transition-colors">
                  <span>Explore Collection</span>
                  <i data-lucide="arrow-right" class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"></i>
                </a>
              </div>
            </div>

          </div>
        </section>

        <!-- New Horological Arrivals Grid -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span class="text-xs font-mono uppercase tracking-[0.3em] text-[#d4af37] block mb-2">2026 Novelties</span>
              <h2 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight">New Arrivals</h2>
            </div>
            <a href="#collection-new" class="text-xs uppercase tracking-[0.2em] text-[#d4af37] hover:text-white transition-colors flex items-center gap-1.5 self-start md:self-auto font-medium">
              <span>View All Novelties</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </a>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="home-new-arrivals-grid">
            ${newArrivals.map(p => ProductCard.render(p)).join("")}
          </div>
        </section>

        <!-- Promotional Haute Horlogerie Banner -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="relative rounded-3xl overflow-hidden border border-[#d4af37]/40 bg-gradient-to-r from-[#0b0b0e] via-[#161410] to-[#0b0b0e] p-8 sm:p-12 lg:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            
            <div class="absolute inset-0 opacity-25">
              <img 
                src="https://images.unsplash.com/photo-1547996160-71dfabbce5ed?auto=format&fit=crop&w=1600&q=80" 
                alt="TIMEORA Banner" 
                class="w-full h-full object-cover object-right"
              />
              <div class="absolute inset-0 bg-gradient-to-r from-[#0b0b0e] via-[#0b0b0e]/80 to-transparent"></div>
            </div>

            <div class="relative z-10 max-w-xl space-y-6">
              <span class="inline-block px-3 py-1 rounded-full text-[10px] uppercase font-mono tracking-[0.3em] bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/40">
                Maison Philosophy
              </span>
              
              <h2 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight">
                “TIME IS YOUR MOST VALUABLE ASSET.”
              </h2>

              <p class="text-sm text-zinc-300 leading-relaxed font-light">
                Each TIMEORA creation is an ode to human ingenuity, taking upwards of 250 hours of meticulous hand-engraving, bevelling, and chronometric calibration in our Swiss ateliers.
              </p>

              <div class="pt-2">
                <a 
                  href="#shop" 
                  class="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-black font-semibold text-xs uppercase tracking-[0.2em] hover:brightness-110 active:scale-95 shadow-[0_10px_30px_rgba(212,175,55,0.3)] transition-all"
                >
                  <span>Explore Collection</span>
                  <i data-lucide="arrow-right" class="w-4 h-4"></i>
                </a>
              </div>
            </div>

          </div>
        </section>

        <!-- Best Sellers Showcase -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span class="text-xs font-mono uppercase tracking-[0.3em] text-[#d4af37] block mb-2">Iconic Timepieces</span>
              <h2 class="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight">Best Sellers</h2>
            </div>
            <a href="#shop" class="text-xs uppercase tracking-[0.2em] text-[#d4af37] hover:text-white transition-colors flex items-center gap-1.5 self-start md:self-auto font-medium">
              <span>Explore Complete Gallery</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </a>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="home-best-sellers-grid">
            ${bestSellers.map(p => ProductCard.render(p)).join("")}
          </div>
        </section>

        <!-- Master Craftsmanship Pillars -->
        <section class="bg-[#0b0b0e] py-20 border-y border-white/10">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div class="text-center max-w-2xl mx-auto mb-16">
              <span class="text-xs font-mono uppercase tracking-[0.3em] text-[#d4af37] block mb-2">Horological Integrity</span>
              <h2 class="font-serif text-3xl sm:text-4xl font-semibold text-white">The Pinnacle of Watchmaking Art</h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div class="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#d4af37]/40 transition-colors">
                <div class="w-12 h-12 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] mb-6">
                  <i data-lucide="compass" class="w-6 h-6"></i>
                </div>
                <h3 class="font-serif text-xl font-bold text-white mb-3">COSC Chronometer Calibres</h3>
                <p class="text-xs text-zinc-400 leading-relaxed">
                  Independently tested under 5 positions and varying temperatures over 15 consecutive days in Switzerland, ensuring supreme chronometric precision of -2/+2 seconds per day.
                </p>
              </div>

              <div class="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#d4af37]/40 transition-colors">
                <div class="w-12 h-12 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] mb-6">
                  <i data-lucide="gem" class="w-6 h-6"></i>
                </div>
                <h3 class="font-serif text-xl font-bold text-white mb-3">Noble Precious Metals</h3>
                <p class="text-xs text-zinc-400 leading-relaxed">
                  Only responsibly sourced 18K ethical gold, 950 pure platinum, and aerospace grade 5 titanium are selected to sculpt cases that endure across generations.
                </p>
              </div>

              <div class="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#d4af37]/40 transition-colors">
                <div class="w-12 h-12 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] mb-6">
                  <i data-lucide="shield" class="w-6 h-6"></i>
                </div>
                <h3 class="font-serif text-xl font-bold text-white mb-3">5-Year Global Guarantee</h3>
                <p class="text-xs text-zinc-400 leading-relaxed">
                  Every TIMEORA timepiece comes accompanied by a signed physical manufacture certificate and 5 years of complimentary international servicing and ultrasonic cleaning.
                </p>
              </div>

            </div>

          </div>
        </section>

        <!-- Customer Reviews Section -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-2xl mx-auto mb-16">
            <span class="text-xs font-mono uppercase tracking-[0.3em] text-[#d4af37] block mb-2">Collector Testimonials</span>
            <h2 class="font-serif text-3xl sm:text-4xl font-semibold text-white">Words From Our Connoisseurs</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div class="p-8 rounded-2xl bg-gradient-to-b from-[#141418] to-[#0e0e11] border border-white/10 shadow-xl flex flex-col justify-between">
              <div>
                <div class="flex text-amber-400 gap-1 mb-4">
                  ${Array(5).fill(0).map(() => `<i data-lucide="star" class="w-4 h-4 fill-amber-400"></i>`).join("")}
                </div>
                <h4 class="font-serif text-base font-semibold text-white mb-2">“Unrivaled mechanical artistry.”</h4>
                <p class="text-xs text-zinc-300 leading-relaxed">
                  The Celestial Tourbillon Sovereign is a true horological milestone. The depth of the openwork bridges and the precision of the flying tourbillon is simply hypnotic.
                </p>
              </div>
              <div class="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <p class="text-xs font-semibold text-white">Lord Alexander Vance</p>
                  <p class="text-[10px] text-[#d4af37] font-mono">Purchased: Celestial Tourbillon</p>
                </div>
                <span class="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">Verified Buyer</span>
              </div>
            </div>

            <div class="p-8 rounded-2xl bg-gradient-to-b from-[#141418] to-[#0e0e11] border border-white/10 shadow-xl flex flex-col justify-between">
              <div>
                <div class="flex text-amber-400 gap-1 mb-4">
                  ${Array(5).fill(0).map(() => `<i data-lucide="star" class="w-4 h-4 fill-amber-400"></i>`).join("")}
                </div>
                <h4 class="font-serif text-base font-semibold text-white mb-2">“Pure poetry on the wrist.”</h4>
                <p class="text-xs text-zinc-300 leading-relaxed">
                  The Elysian Pure Rose is so ultra-thin that it feels weightless. The mother-of-pearl dial catches evening dinner lighting with an ethereal iridescence.
                </p>
              </div>
              <div class="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <p class="text-xs font-semibold text-white">Victoria De Laurentis</p>
                  <p class="text-[10px] text-[#d4af37] font-mono">Purchased: Elysian Pure Rose</p>
                </div>
                <span class="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">Verified Buyer</span>
              </div>
            </div>

            <div class="p-8 rounded-2xl bg-gradient-to-b from-[#141418] to-[#0e0e11] border border-white/10 shadow-xl flex flex-col justify-between">
              <div>
                <div class="flex text-amber-400 gap-1 mb-4">
                  ${Array(5).fill(0).map(() => `<i data-lucide="star" class="w-4 h-4 fill-amber-400"></i>`).join("")}
                </div>
                <h4 class="font-serif text-base font-semibold text-white mb-2">“Tested on deep sea dives.”</h4>
                <p class="text-xs text-zinc-300 leading-relaxed">
                  The Abyss Pro 1000M is built like an oceanic tank yet the grade 5 titanium keeps it balanced on the wrist. Outstanding bezel action and lume.
                </p>
              </div>
              <div class="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                <div>
                  <p class="text-xs font-semibold text-white">Captain Eric Lindqvist</p>
                  <p class="text-[10px] text-[#d4af37] font-mono">Purchased: Abyss Pro 1000M</p>
                </div>
                <span class="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">Verified Buyer</span>
              </div>
            </div>

          </div>
        </section>

        <!-- FAQ Accordion Section -->
        ${FaqSection.render()}

      </div>
    `;
  }

  static setupEvents() {
    ProductCard.setupCardEvents(document.getElementById("home-new-arrivals-grid") || document);
    ProductCard.setupCardEvents(document.getElementById("home-best-sellers-grid") || document);
    FaqSection.setupEvents(document.getElementById("faq-section") || document);
  }
}
