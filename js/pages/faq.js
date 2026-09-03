/**
 * TIMEORA - Dedicated FAQ Page
 */

import { FaqSection } from "../components/faqSection.js";

export class FaqPage {
  static render() {
    return `
      <div class="faq-page bg-[#070709] py-12 sm:py-16 min-h-[85vh]">
        ${FaqSection.render()}
      </div>
    `;
  }

  static setupEvents() {
    FaqSection.setupEvents(document.getElementById("faq-section") || document);
  }
}
