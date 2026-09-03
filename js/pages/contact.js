/**
 * TIMEORA - Boutiques & Concierge Contact Page
 * Working contact form with validation, boutique locations, and VIP appointment booking.
 */

import { store } from "../state/store.js";

export class ContactPage {
  static render() {
    return `
      <div class="contact-page max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        
        <!-- Header -->
        <div class="text-center max-w-2xl mx-auto space-y-4">
          <span class="text-xs font-mono uppercase tracking-[0.3em] text-[#d4af37] block">Bespoke Concierge</span>
          <h1 class="font-serif text-3xl sm:text-5xl font-semibold text-white tracking-tight">
            Connect With Our Horologists
          </h1>
          <p class="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
            Whether inquiring about a specific haute horlogerie commission, scheduling a private salon viewing, or arranging complimentary international servicing.
          </p>
        </div>

        <!-- Contact Form & Concierge Details -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <!-- Left: Working Contact Form -->
          <div class="lg:col-span-7 bg-[#111115] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
            <div class="border-b border-white/10 pb-4">
              <h2 class="font-serif text-2xl font-semibold text-white">Send a Private Inquiry</h2>
              <p class="text-xs text-zinc-400 mt-1">Our Geneva concierge responds within 2 business hours.</p>
            </div>

            <form id="main-contact-form" class="space-y-4">
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1">Your Name *</label>
                  <input 
                    type="text" 
                    id="contact-name" 
                    required 
                    placeholder="Lord Julian Sterling" 
                    class="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]" 
                  />
                </div>

                <div>
                  <label class="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1">Email Address *</label>
                  <input 
                    type="email" 
                    id="contact-email" 
                    required 
                    placeholder="julian.sterling@domain.com" 
                    class="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]" 
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1">Direct Phone *</label>
                  <input 
                    type="tel" 
                    id="contact-phone" 
                    required 
                    placeholder="+41 22 819 9000" 
                    class="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]" 
                  />
                </div>

                <div>
                  <label class="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1">Inquiry Subject *</label>
                  <select id="contact-subject" class="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#d4af37]">
                    <option value="timepiece_inquiry">Haute Horlogerie Acquisition Inquiry</option>
                    <option value="salon_appointment">Private VIP Salon Appointment</option>
                    <option value="custom_commission">Bespoke Unique Piece Commission</option>
                    <option value="warranty_service">Manufacture Warranty & Servicing</option>
                    <option value="general_concierge">General Concierge Assistance</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1">Your Message *</label>
                <textarea 
                  id="contact-message" 
                  rows="4" 
                  required 
                  placeholder="Please state any specific references, preferred precious metals, or details for your appointment..." 
                  class="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                ></textarea>
              </div>

              <button 
                type="submit" 
                class="w-full py-4 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-black font-semibold text-xs uppercase tracking-[0.2em] hover:brightness-110 active:scale-98 shadow-[0_6px_25px_rgba(212,175,55,0.25)] transition-all flex items-center justify-center gap-2"
              >
                <i data-lucide="send" class="w-4 h-4"></i>
                Dispatch Message to Concierge
              </button>

            </form>
          </div>

          <!-- Right: Flagship Boutiques & VIP Services -->
          <div class="lg:col-span-5 space-y-6">
            
            <!-- VIP Direct Info -->
            <div class="bg-[#121216] border border-[#d4af37]/30 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
              <h3 class="font-serif text-xl font-semibold text-white flex items-center gap-2">
                <i data-lucide="crown" class="w-5 h-5 text-[#d4af37]"></i>
                Direct VIP Concierge
              </h3>
              <p class="text-xs text-zinc-300 leading-relaxed">
                Connect directly with our Chief Horological Liaison for bespoke inquiries.
              </p>
              <div class="space-y-2 text-xs font-mono pt-2 border-t border-white/10">
                <div class="flex items-center gap-3 text-zinc-300">
                  <i data-lucide="phone" class="w-4 h-4 text-[#d4af37]"></i>
                  <a href="tel:+41228199000" class="hover:text-[#d4af37] transition-colors">+41 22 819 9000 (Geneva)</a>
                </div>
                <div class="flex items-center gap-3 text-zinc-300">
                  <i data-lucide="mail" class="w-4 h-4 text-[#d4af37]"></i>
                  <a href="mailto:concierge@timeora-haute.ch" class="hover:text-[#d4af37] transition-colors">concierge@timeora-haute.ch</a>
                </div>
                <div class="flex items-center gap-3 text-zinc-300">
                  <i data-lucide="clock" class="w-4 h-4 text-[#d4af37]"></i>
                  <span>Mon – Sat: 09:00 – 19:00 CET</span>
                </div>
              </div>
            </div>

            <!-- Global Flagship Boutiques Accordion/Cards -->
            <div class="space-y-4">
              <h3 class="font-serif text-lg font-semibold text-white px-2">Global Flagship Boutiques</h3>
              
              <div class="bg-[#111115] border border-white/10 rounded-2xl p-5 space-y-2">
                <div class="flex items-center justify-between">
                  <h4 class="font-serif text-base font-semibold text-white">Geneva Atelier & Salon</h4>
                  <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-[#d4af37]/20 text-[#d4af37]">Flagship</span>
                </div>
                <p class="text-xs text-zinc-400">14 Rue du Rhône, 1204 Geneva, Switzerland</p>
                <p class="text-[11px] font-mono text-zinc-500">+41 22 819 9000 • geneva@timeora-haute.ch</p>
              </div>

              <div class="bg-[#111115] border border-white/10 rounded-2xl p-5 space-y-2">
                <div class="flex items-center justify-between">
                  <h4 class="font-serif text-base font-semibold text-white">London Mayfair Salon</h4>
                  <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-zinc-300">Boutique</span>
                </div>
                <p class="text-xs text-zinc-400">28 Old Bond Street, Mayfair, London W1S 4QR, UK</p>
                <p class="text-[11px] font-mono text-zinc-500">+44 20 7946 0912 • london@timeora-haute.ch</p>
              </div>

              <div class="bg-[#111115] border border-white/10 rounded-2xl p-5 space-y-2">
                <div class="flex items-center justify-between">
                  <h4 class="font-serif text-base font-semibold text-white">New York Madison Salon</h4>
                  <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-zinc-300">Boutique</span>
                </div>
                <p class="text-xs text-zinc-400">740 Madison Avenue, New York, NY 10065, USA</p>
                <p class="text-[11px] font-mono text-zinc-500">+1 212 555 0199 • newyork@timeora-haute.ch</p>
              </div>

            </div>

          </div>

        </div>

      </div>
    `;
  }

  static setupEvents() {
    const form = document.getElementById("main-contact-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const name = document.getElementById("contact-name").value.trim();
        const email = document.getElementById("contact-email").value.trim();
        const phone = document.getElementById("contact-phone").value.trim();
        const message = document.getElementById("contact-message").value.trim();

        if (!name || !email || !phone || !message) {
          store.showToast({ title: "Validation Error", message: "Please fill out all required fields.", type: "error" });
          return;
        }

        form.reset();

        store.showToast({
          title: "Message Dispatched",
          message: `Thank you, ${name}. Our Private Concierge has received your transmission and will reply shortly.`,
          type: "success"
        });
      });
    }
  }
}
