/**
 * TIMEORA - About Page
 * “More Than a Watch. A Statement of Time.”
 * Brand heritage, Swiss craftsmanship, horological philosophy, and master workshops.
 */

export class AboutPage {
  static render() {
    return `
      <div class="about-page space-y-24 pb-20">
        
        <!-- Hero Banner -->
        <section class="relative min-h-[65vh] flex items-center justify-center overflow-hidden bg-[#070709] border-b border-white/10">
          <div class="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=2000&q=80" 
              alt="TIMEORA Atelier Heritage" 
              class="w-full h-full object-cover opacity-25 filter brightness-75 scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/70 to-transparent"></div>
          </div>

          <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 space-y-6">
            <span class="inline-block px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-[0.3em] bg-white/5 text-[#d4af37] border border-[#d4af37]/40 backdrop-blur-md">
              Swiss Haute Horlogerie Since 1928
            </span>

            <h1 class="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-white tracking-tight leading-tight">
              “More Than a Watch.<br/>
              <span class="italic text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f3e5ab] to-[#d4af37]">A Statement of Time.”</span>
            </h1>

            <p class="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed font-light">
              Rooted in the snow-capped valleys of Le Locle, Switzerland, TIMEORA crafts mechanical works of art that transcend fleeting trends to define eternal horological lineage.
            </p>
          </div>
        </section>

        <!-- Brand Story Section -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div class="lg:col-span-6 space-y-6">
              <span class="text-xs font-mono uppercase tracking-[0.3em] text-[#d4af37] block">The Genesis</span>
              <h2 class="font-serif text-3xl sm:text-4xl font-semibold text-white leading-tight">
                A Legacy Born in the Heart of Swiss Watchmaking
              </h2>
              
              <p class="text-sm text-zinc-300 leading-relaxed font-light">
                Founded nearly a century ago by master horologist Henri Laurent in Le Locle, TIMEORA was established with a singular creed: that a timepiece should not merely count seconds, but reflect the soul of its wearer and the supreme limits of mechanical human capability.
              </p>

              <p class="text-sm text-zinc-300 leading-relaxed font-light">
                Today, our master watchmakers preserve centuries-old hand-finishing techniques—such as hand-chamfered anglage, black polishing, and Grand Feu enameling—while embracing space-age materials like NTPT carbon and grade 5 titanium.
              </p>

              <div class="pt-4 grid grid-cols-3 gap-4 border-t border-white/10 text-center">
                <div>
                  <div class="font-serif text-2xl sm:text-3xl font-bold text-white">98+</div>
                  <div class="text-[10px] font-mono uppercase tracking-widest text-[#d4af37] mt-0.5">Years Heritage</div>
                </div>
                <div>
                  <div class="font-serif text-2xl sm:text-3xl font-bold text-white">250+</div>
                  <div class="text-[10px] font-mono uppercase tracking-widest text-[#d4af37] mt-0.5">Hours Per Watch</div>
                </div>
                <div>
                  <div class="font-serif text-2xl sm:text-3xl font-bold text-white">100%</div>
                  <div class="text-[10px] font-mono uppercase tracking-widest text-[#d4af37] mt-0.5">Swiss Calibres</div>
                </div>
              </div>
            </div>

            <div class="lg:col-span-6">
              <div class="relative rounded-3xl overflow-hidden border border-[#d4af37]/30 shadow-2xl aspect-[4/3] group">
                <img 
                  src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80" 
                  alt="Swiss Watchmaker Craftsmanship" 
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div class="absolute bottom-6 left-6 right-6 text-xs font-mono text-zinc-300">
                  Master Watchmaker Assembly Atelier • Le Locle, Switzerland
                </div>
              </div>
            </div>

          </div>
        </section>

        <!-- The Pillars of Horology -->
        <section class="bg-[#0b0b0e] py-20 border-y border-white/10">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div class="text-center max-w-2xl mx-auto mb-16 space-y-2">
              <span class="text-xs font-mono uppercase tracking-[0.3em] text-[#d4af37]">Uncompromising Standards</span>
              <h2 class="font-serif text-3xl sm:text-4xl font-semibold text-white">The Craftsmanship Pillars</h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <div class="bg-[#121216] border border-white/10 rounded-2xl p-8 space-y-4 hover:border-[#d4af37]/40 transition-colors">
                <div class="w-12 h-12 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
                  <i data-lucide="sparkles" class="w-6 h-6"></i>
                </div>
                <h3 class="font-serif text-xl font-bold text-white">Hand-Finished Artistry</h3>
                <p class="text-xs text-zinc-400 leading-relaxed">
                  Every tourbillon bridge, balance wheel, and gear train is bevelled, polished with gentian wood, and decorated with traditional Geneva stripes by hand under a 10x microscope.
                </p>
              </div>

              <div class="bg-[#121216] border border-white/10 rounded-2xl p-8 space-y-4 hover:border-[#d4af37]/40 transition-colors">
                <div class="w-12 h-12 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
                  <i data-lucide="gem" class="w-6 h-6"></i>
                </div>
                <h3 class="font-serif text-xl font-bold text-white">Ethical Noble Materials</h3>
                <p class="text-xs text-zinc-400 leading-relaxed">
                  We use 100% RJC-certified ethical Fairmined 18K gold, solid 950 platinum, Top Wesselton VVS diamonds, and genuine Mississippi alligator leather certified by CITES.
                </p>
              </div>

              <div class="bg-[#121216] border border-white/10 rounded-2xl p-8 space-y-4 hover:border-[#d4af37]/40 transition-colors">
                <div class="w-12 h-12 rounded-xl bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37]">
                  <i data-lucide="crown" class="w-6 h-6"></i>
                </div>
                <h3 class="font-serif text-xl font-bold text-white">Bespoke Concierge Care</h3>
                <p class="text-xs text-zinc-400 leading-relaxed">
                  Ownership is a lifelong relationship. Enjoy access to our VIP Geneva salon, annual complimentary ultrasonic maintenance, and lifetime archives recording your timepiece's provenance.
                </p>
              </div>

            </div>

          </div>
        </section>

        <!-- CTA Section -->
        <section class="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 class="font-serif text-3xl sm:text-4xl font-semibold text-white">Begin Your Horological Journey</h2>
          <p class="text-sm text-zinc-300 max-w-lg mx-auto">Discover timepieces created for those who measure life not in minutes, but in memorable moments.</p>
          <div class="flex items-center justify-center gap-4 pt-2">
            <a href="#shop" class="px-8 py-4 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-black font-semibold text-xs uppercase tracking-widest hover:brightness-110 shadow-lg transition-all">
              Explore Catalog
            </a>
            <a href="#contact" class="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-widest border border-white/15 transition-all">
              Book Private Viewing
            </a>
          </div>
        </section>

      </div>
    `;
  }
}
