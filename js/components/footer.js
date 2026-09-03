/**
 * TIMEORA - Luxury Footer Component
 * Complete with working newsletter validation, VIP links, policies, and payment badges.
 */

import { store } from "../state/store.js";
import { Storage } from "../state/storage.js";

export class Footer {
  static render() {
    return `
      <footer class="bg-[#08080a] border-t border-white/10 text-zinc-400 font-sans pt-16 pb-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <!-- Top Row: Brand & Newsletter Club -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
            
            <div class="lg:col-span-5 space-y-5">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 rounded-full border border-[#d4af37] bg-black flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)] overflow-hidden">
                  <img src="images/logo/timeora-logo-vertical.jpg" alt="TIMEORA Monogram Logo" class="w-full h-full object-cover" />
                </div>
                <span class="font-serif text-2xl font-semibold tracking-[0.25em] text-white">TIMEORA</span>
              </div>
              <p class="text-sm text-zinc-300 leading-relaxed max-w-md">
                Mastering the art of Swiss haute horlogerie since 1928. Precision engineering, rare precious metals, and timeless aesthetic mastery.
              </p>
              <div class="flex items-center gap-3 pt-2 text-zinc-300">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" class="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:text-[#d4af37] hover:border-[#d4af37]/60 transition-colors" aria-label="TIMEORA Instagram">
                  <i data-lucide="instagram" class="w-4 h-4"></i>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" class="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:text-[#d4af37] hover:border-[#d4af37]/60 transition-colors" aria-label="TIMEORA Facebook">
                  <i data-lucide="facebook" class="w-4 h-4"></i>
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noreferrer" class="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:text-[#d4af37] hover:border-[#d4af37]/60 transition-colors" aria-label="TIMEORA TikTok">
                  <i data-lucide="video" class="w-4 h-4"></i>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" class="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:text-[#d4af37] hover:border-[#d4af37]/60 transition-colors" aria-label="TIMEORA YouTube">
                  <i data-lucide="youtube" class="w-4 h-4"></i>
                </a>
              </div>
            </div>

            <!-- Newsletter Box -->
            <div class="lg:col-span-7 bg-gradient-to-br from-[#121216] to-[#0d0d10] p-8 rounded-2xl border border-[#d4af37]/30 shadow-2xl relative overflow-hidden">
              <div class="absolute -right-10 -bottom-10 w-48 h-48 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none"></div>
              
              <h3 class="font-serif text-2xl font-medium text-white tracking-wide">Join the TIMEORA Club</h3>
              <p class="text-xs text-zinc-300 mt-2 mb-5 leading-relaxed">
                Receive private allocations, invitations to VIP horology galas, and an exclusive 10% privilege on your inaugural acquisition.
              </p>

              <form id="footer-newsletter-form" class="flex flex-col sm:flex-row gap-3">
                <div class="relative flex-1">
                  <input 
                    type="email" 
                    id="newsletter-email" 
                    required 
                    placeholder="Enter your email address" 
                    class="w-full px-4 py-3.5 rounded-xl bg-black/60 border border-white/15 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37] transition-all"
                  />
                </div>
                <button 
                  type="submit" 
                  class="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-black font-semibold text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-[0_4px_20px_rgba(212,175,55,0.25)] shrink-0"
                >
                  Subscribe
                </button>
              </form>
              <p class="text-[11px] text-zinc-500 mt-2.5">
                We respect your privacy. Unsubscribe anytime with one click.
              </p>
            </div>

          </div>

          <!-- Middle Navigation Links -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-white/10 text-xs">
            
            <div>
              <h4 class="font-medium uppercase tracking-[0.2em] text-white text-xs mb-4 flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></span>
                Shop Timepieces
              </h4>
              <ul class="space-y-2.5">
                <li><a href="#collection-mens" class="hover:text-[#d4af37] transition-colors">Men's Watches</a></li>
                <li><a href="#collection-womens" class="hover:text-[#d4af37] transition-colors">Women's Watches</a></li>
                <li><a href="#collection-new" class="hover:text-[#d4af37] transition-colors">New Arrivals 2026</a></li>
                <li><a href="#shop" class="hover:text-[#d4af37] transition-colors">Best Sellers</a></li>
                <li><a href="#collection-sale" class="text-amber-400 hover:text-amber-300 transition-colors">Private Vault Sale</a></li>
                <li><a href="#shop" class="hover:text-[#d4af37] transition-colors">All Collections</a></li>
              </ul>
            </div>

            <div>
              <h4 class="font-medium uppercase tracking-[0.2em] text-white text-xs mb-4 flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></span>
                Collections
              </h4>
              <ul class="space-y-2.5">
                <li><a href="#collection-luxury" class="hover:text-[#d4af37] transition-colors">Haute Horlogerie</a></li>
                <li><a href="#collection-classic" class="hover:text-[#d4af37] transition-colors">Classic & Heritage</a></li>
                <li><a href="#collection-sport" class="hover:text-[#d4af37] transition-colors">Sport & Chronographs</a></li>
                <li><a href="#collection-minimal" class="hover:text-[#d4af37] transition-colors">Minimalist Modern</a></li>
                <li><a href="#shop" class="hover:text-[#d4af37] transition-colors">Tourbillons & Skeletons</a></li>
                <li><a href="#shop" class="hover:text-[#d4af37] transition-colors">Diver Instruments</a></li>
              </ul>
            </div>

            <div>
              <h4 class="font-medium uppercase tracking-[0.2em] text-white text-xs mb-4 flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></span>
                Customer Concierge
              </h4>
              <ul class="space-y-2.5">
                <li><a href="#faq" class="text-[#d4af37] font-semibold hover:text-white transition-colors">Frequently Asked Questions (FAQ)</a></li>
                <li><a href="#contact" class="hover:text-[#d4af37] transition-colors">Contact Concierge</a></li>
                <li><a href="#contact" class="hover:text-[#d4af37] transition-colors">Book Private Viewing</a></li>
                <li><a href="#about" class="hover:text-[#d4af37] transition-colors">5-Year Warranty Info</a></li>
                <li><a href="#about" class="hover:text-[#d4af37] transition-colors">Complimentary Armored Courier</a></li>
                <li><a href="#account" class="hover:text-[#d4af37] transition-colors">Order Tracking</a></li>
                <li><a href="#contact" class="hover:text-[#d4af37] transition-colors">Authenticity Certification</a></li>
              </ul>
            </div>

            <div>
              <h4 class="font-medium uppercase tracking-[0.2em] text-white text-xs mb-4 flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></span>
                The Maison
              </h4>
              <ul class="space-y-2.5">
                <li><a href="#about" class="hover:text-[#d4af37] transition-colors">About TIMEORA</a></li>
                <li><a href="#about" class="hover:text-[#d4af37] transition-colors">Swiss Craftsmanship</a></li>
                <li><a href="#contact" class="hover:text-[#d4af37] transition-colors">Flagship Boutiques</a></li>
                <li><a href="#about" class="hover:text-[#d4af37] transition-colors">Ethical Gold & Diamonds</a></li>
                <li><a href="#about" class="hover:text-[#d4af37] transition-colors">Privacy & Legal Rights</a></li>
                <li><a href="#about" class="hover:text-[#d4af37] transition-colors">Terms of Service</a></li>
              </ul>
            </div>

          </div>

          <!-- Bottom Row: Payment & Legal -->
          <div class="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-zinc-500">
            <div class="flex items-center gap-4 flex-wrap justify-center md:justify-start">
              <span>© ${new Date().getFullYear()} TIMEORA Haute Horlogerie S.A. All rights reserved.</span>
              <span class="hidden md:inline">•</span>
              <span class="text-zinc-400">Swiss Manufacture certified COSC Chronometer</span>
            </div>

            <!-- Accepted Payment Methods Badges -->
            <div class="flex items-center gap-3 text-[10px] tracking-wider uppercase">
              <span class="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-zinc-300 font-mono">VISA</span>
              <span class="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-zinc-300 font-mono">MASTERCARD</span>
              <span class="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-zinc-300 font-mono">AMEX</span>
              <span class="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-zinc-300 font-mono">PAYPAL</span>
              <span class="px-2.5 py-1 rounded bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] font-mono">WIRE</span>
            </div>
          </div>

        </div>
      </footer>
    `;
  }

  static setupEvents() {
    const form = document.getElementById("footer-newsletter-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = document.getElementById("newsletter-email");
        if (!input || !input.value) return;

        const email = input.value.trim();
        // Simple regex check
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          store.showToast({
            title: "Invalid Email",
            message: "Please enter a valid email address.",
            type: "error"
          });
          return;
        }

        Storage.subscribeNewsletter(email);
        input.value = "";

        store.showToast({
          title: "Welcome to TIMEORA Club",
          message: "Thank you for subscribing! Your 10% welcome privilege code is TIMEORA10.",
          type: "success"
        });
      });
    }
  }
}
