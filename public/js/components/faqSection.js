/**
 * TIMEORA - Frequently Asked Questions (FAQ) Accordion Component
 */

export const FAQ_DATA = [
  {
    id: "faq-1",
    question: "What makes TIMEORA watches special?",
    answer: "TIMEORA watches are designed with a focus on timeless design, precision, craftsmanship and premium materials."
  },
  {
    id: "faq-2",
    question: "Are TIMEORA watches Swiss made?",
    answer: "Our watches are engineered with a strong focus on Swiss watchmaking standards and precision craftsmanship."
  },
  {
    id: "faq-3",
    question: "What materials are used in TIMEORA watches?",
    answer: "TIMEORA watches feature premium materials selected for durability, comfort and a refined luxury appearance."
  },
  {
    id: "faq-4",
    question: "Do you offer a warranty?",
    answer: "Yes, every TIMEORA watch comes with a manufacturer's warranty covering eligible manufacturing defects."
  },
  {
    id: "faq-5",
    question: "How can I place an order?",
    answer: "Select your desired watch, click <strong class=\"text-[#d4af37]\">Place Order</strong>, enter your full name, phone number, shipping address and quantity, then submit your order."
  },
  {
    id: "faq-6",
    question: "How long does delivery take?",
    answer: "Delivery times may vary depending on your location. Estimated delivery information will be shown during the ordering process."
  },
  {
    id: "faq-7",
    question: "Can I return or exchange my watch?",
    answer: "Yes, eligible products can be returned or exchanged according to our return and exchange policy."
  },
  {
    id: "faq-[#faq-8]",
    id: "faq-8",
    question: "How can I track my order?",
    answer: "Once your order has been processed and shipped, you will receive the available tracking information."
  },
  {
    id: "faq-9",
    question: "Are TIMEORA watches water resistant?",
    answer: "Water resistance varies by model. Please check the specifications of the individual watch before exposing it to water."
  },
  {
    id: "faq-10",
    question: "How can I contact TIMEORA?",
    answer: "You can contact our customer support team through the <a href=\"#contact\" class=\"text-[#d4af37] underline hover:text-white transition-colors\">Contact</a> section of the website."
  }
];

export class FaqSection {
  static render() {
    return `
      <section id="faq-section" class="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24">
        
        <!-- Header -->
        <div class="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 mb-4">
            <i data-lucide="help-circle" class="w-3.5 h-3.5 text-[#d4af37]"></i>
            <span class="text-[10px] font-mono text-[#d4af37] uppercase tracking-[0.25em]">Client Concierge & Knowledge Base</span>
          </div>
          <h2 class="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-wide mb-4">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p class="text-sm sm:text-base text-zinc-300 font-light max-w-xl mx-auto leading-relaxed">
            Everything you need to know about TIMEORA.
          </p>
        </div>

        <!-- Accordion Container -->
        <div class="space-y-4 max-w-4xl mx-auto" id="faq-accordion-list">
          ${FAQ_DATA.map((item, index) => `
            <div 
              class="faq-item group bg-[#0e0e12] border border-white/10 hover:border-[#d4af37]/40 rounded-2xl transition-all duration-300 overflow-hidden shadow-lg"
              data-faq-id="${item.id}"
            >
              <button 
                type="button" 
                class="faq-trigger w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-serif text-base sm:text-lg font-medium text-white hover:text-[#d4af37] transition-colors focus:outline-none"
                aria-expanded="false"
                aria-controls="${item.id}-answer"
              >
                <span class="flex items-center gap-3">
                  <span class="font-mono text-xs text-[#d4af37]/70 font-normal">0${index + 1}.</span>
                  <span>${item.question}</span>
                </span>
                
                <!-- Gold + / - morphing icon -->
                <div class="faq-icon-wrapper w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover:border-[#d4af37]/50 group-hover:bg-[#d4af37]/10 text-zinc-400 group-hover:text-[#d4af37] flex items-center justify-center shrink-0 transition-all duration-300">
                  <i data-lucide="plus" class="faq-icon w-4 h-4 transition-transform duration-300"></i>
                </div>
              </button>

              <div 
                id="${item.id}-answer"
                class="faq-answer max-h-0 overflow-hidden transition-all duration-300 ease-in-out opacity-0"
              >
                <div class="p-5 sm:p-6 pt-0 border-t border-white/5 text-sm text-zinc-300 font-light leading-relaxed">
                  ${item.answer}
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Footer Help Note -->
        <div class="mt-12 text-center pt-8 border-t border-white/5 text-xs font-mono text-zinc-400">
          Have additional inquiries? Speak directly with our horological advisors at 
          <a href="#contact" class="text-[#d4af37] hover:underline">TIMEORA Boutique Concierge</a>.
        </div>

      </section>
    `;
  }

  static setupEvents(container = document) {
    const triggers = container.querySelectorAll(".faq-trigger");
    triggers.forEach(trigger => {
      trigger.addEventListener("click", () => {
        const item = trigger.closest(".faq-item");
        if (!item) return;

        const answer = item.querySelector(".faq-answer");
        const icon = item.querySelector(".faq-icon");
        const iconWrapper = item.querySelector(".faq-icon-wrapper");
        const isExpanded = trigger.getAttribute("aria-expanded") === "true";

        // Optional: Close all other FAQ items for clean single accordion
        container.querySelectorAll(".faq-item").forEach(otherItem => {
          if (otherItem !== item) {
            const otherTrigger = otherItem.querySelector(".faq-trigger");
            const otherAnswer = otherItem.querySelector(".faq-answer");
            const otherIcon = otherItem.querySelector(".faq-icon");
            const otherWrapper = otherItem.querySelector(".faq-icon-wrapper");

            if (otherTrigger && otherAnswer) {
              otherTrigger.setAttribute("aria-expanded", "false");
              otherAnswer.style.maxHeight = "0px";
              otherAnswer.classList.add("opacity-0");
              otherItem.classList.remove("border-[#d4af37]/60", "bg-[#13131a]");
              if (otherIcon) {
                otherIcon.setAttribute("data-lucide", "plus");
                otherIcon.style.transform = "rotate(0deg)";
              }
              if (otherWrapper) {
                otherWrapper.classList.remove("border-[#d4af37]", "bg-[#d4af37]/20", "text-[#d4af37]");
              }
            }
          }
        });

        // Toggle current item
        if (isExpanded) {
          trigger.setAttribute("aria-expanded", "false");
          answer.style.maxHeight = "0px";
          answer.classList.add("opacity-0");
          item.classList.remove("border-[#d4af37]/60", "bg-[#13131a]");
          if (icon) {
            icon.setAttribute("data-lucide", "plus");
            icon.style.transform = "rotate(0deg)";
          }
          if (iconWrapper) {
            iconWrapper.classList.remove("border-[#d4af37]", "bg-[#d4af37]/20", "text-[#d4af37]");
          }
        } else {
          trigger.setAttribute("aria-expanded", "true");
          answer.style.maxHeight = answer.scrollHeight + "px";
          answer.classList.remove("opacity-0");
          item.classList.add("border-[#d4af37]/60", "bg-[#13131a]");
          if (icon) {
            icon.setAttribute("data-lucide", "minus");
            icon.style.transform = "rotate(180deg)";
          }
          if (iconWrapper) {
            iconWrapper.classList.add("border-[#d4af37]", "bg-[#d4af37]/20", "text-[#d4af37]");
          }
        }

        if (window.lucide) window.lucide.createIcons();
      });
    });
  }
}
