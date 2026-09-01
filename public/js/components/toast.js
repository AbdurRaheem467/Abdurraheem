/**
 * TIMEORA - Toast Notification Component
 */

import { store } from "../state/store.js";

export class ToastManager {
  static init() {
    let container = document.getElementById("timeora-toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "timeora-toast-container";
      container.className = "fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0";
      document.body.appendChild(container);
    }

    store.subscribe("toast:show", (toast) => {
      ToastManager.renderToast(toast, container);
    });
  }

  static renderToast(toast, container) {
    const toastEl = document.createElement("div");
    toastEl.className = "pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-2xl backdrop-blur-md transition-all duration-300 transform translate-y-4 opacity-0";
    
    // Luxury theme styling per toast type
    if (toast.type === "success") {
      toastEl.classList.add("bg-[#121214]/95", "border-[#d4af37]/40", "text-white", "shadow-[0_10px_30px_rgba(212,175,55,0.15)]");
    } else if (toast.type === "error") {
      toastEl.classList.add("bg-[#1a0f0f]/95", "border-rose-500/40", "text-white", "shadow-[0_10px_30px_rgba(225,29,72,0.15)]");
    } else {
      toastEl.classList.add("bg-[#141416]/95", "border-white/10", "text-white", "shadow-[0_10px_30px_rgba(0,0,0,0.4)]");
    }

    let iconMarkup = "";
    if (toast.type === "success") {
      iconMarkup = `<div class="w-8 h-8 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/50 flex items-center justify-center text-[#d4af37] shrink-0 mt-0.5"><i data-lucide="check" class="w-4 h-4"></i></div>`;
    } else if (toast.type === "error") {
      iconMarkup = `<div class="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/50 flex items-center justify-center text-rose-400 shrink-0 mt-0.5"><i data-lucide="alert-circle" class="w-4 h-4"></i></div>`;
    } else {
      iconMarkup = `<div class="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-gold shrink-0 mt-0.5"><i data-lucide="info" class="w-4 h-4 text-[#d4af37]"></i></div>`;
    }

    let actionMarkup = "";
    if (toast.actionText && toast.actionRoute) {
      actionMarkup = `<a href="${toast.actionRoute}" class="inline-block mt-2 text-xs font-semibold uppercase tracking-wider text-[#d4af37] hover:text-white underline underline-offset-4 transition-colors">${toast.actionText} →</a>`;
    }

    toastEl.innerHTML = `
      ${iconMarkup}
      <div class="flex-1 min-w-0">
        <h4 class="text-sm font-semibold tracking-wide text-white">${toast.title}</h4>
        <p class="text-xs text-zinc-300 mt-0.5 leading-relaxed">${toast.message}</p>
        ${actionMarkup}
      </div>
      <button class="toast-close text-zinc-400 hover:text-white transition-colors p-1" aria-label="Close notification">
        <i data-lucide="x" class="w-4 h-4"></i>
      </button>
    `;

    container.appendChild(toastEl);
    if (window.lucide) window.lucide.createIcons();

    // Trigger animation in
    requestAnimationFrame(() => {
      toastEl.classList.remove("translate-y-4", "opacity-0");
      toastEl.classList.add("translate-y-0", "opacity-100");
    });

    const remove = () => {
      toastEl.classList.remove("translate-y-0", "opacity-100");
      toastEl.classList.add("translate-y-4", "opacity-0");
      setTimeout(() => {
        if (toastEl.parentNode) toastEl.parentNode.removeChild(toastEl);
      }, 300);
    };

    toastEl.querySelector(".toast-close").addEventListener("click", remove);
    setTimeout(remove, toast.duration || 4500);
  }
}
