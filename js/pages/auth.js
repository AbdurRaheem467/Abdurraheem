/**
 * TIMEORA - Authentication Page (Login / Signup / VIP Demo)
 */

import { store } from "../state/store.js";

export class AuthPage {
  static render(isSignup = false) {
    return `
      <div class="auth-page max-w-md mx-auto px-4 py-16">
        
        <div class="bg-[#111115] border border-[#d4af37]/40 rounded-3xl p-8 shadow-2xl space-y-6">
          
          <!-- Monogram Header -->
          <div class="text-center space-y-2">
            <div class="w-12 h-12 rounded-full border border-[#d4af37] bg-black flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              <span class="font-serif text-xl font-bold text-[#d4af37]">T</span>
            </div>
            <h1 class="font-serif text-2xl font-semibold text-white tracking-wide">
              ${isSignup ? 'Create Your TIMEORA Account' : 'Welcome to the TIMEORA Circle'}
            </h1>
            <p class="text-xs text-zinc-400">
              ${isSignup ? 'Join our private horology circle for bespoke concierge access.' : 'Sign in to access your private vault, acquisitions, and wishlist.'}
            </p>
          </div>

          <!-- Quick Demo Login Banner -->
          <div class="p-3.5 rounded-2xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-between text-xs">
            <div>
              <span class="font-semibold text-white block">Instant VIP Demo Mode</span>
              <span class="text-[10px] text-zinc-400">Explore dashboard with preloaded orders</span>
            </div>
            <button id="auth-quick-demo-btn" class="px-3 py-1.5 rounded-lg bg-[#d4af37] text-black font-semibold text-[11px] uppercase tracking-wider hover:brightness-110 shadow transition-all">
              ⚡ Sign In
            </button>
          </div>

          <!-- Login vs Signup Tab Switcher -->
          <div class="grid grid-cols-2 gap-1 bg-black/60 p-1 rounded-xl border border-white/10 text-xs font-mono">
            <button id="tab-toggle-login" class="py-2 rounded-lg transition-all ${!isSignup ? 'bg-[#d4af37] text-black font-bold shadow' : 'text-zinc-400 hover:text-white'}">
              Sign In
            </button>
            <button id="tab-toggle-signup" class="py-2 rounded-lg transition-all ${isSignup ? 'bg-[#d4af37] text-black font-bold shadow' : 'text-zinc-400 hover:text-white'}">
              Register
            </button>
          </div>

          <!-- Forms -->
          ${!isSignup ? `
            <!-- Login Form -->
            <form id="login-form" class="space-y-4">
              <div>
                <label class="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1">Email Address</label>
                <input 
                  type="email" 
                  id="login-email" 
                  required 
                  value="julian.sterling@timeora-haute.ch"
                  class="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <div class="flex items-center justify-between mb-1">
                  <label class="text-xs font-mono uppercase tracking-wider text-zinc-400">Password</label>
                  <a href="#auth" id="forgot-password-link" class="text-[11px] text-[#d4af37] hover:underline">Forgot?</a>
                </div>
                <input 
                  type="password" 
                  id="login-password" 
                  required 
                  value="••••••••••••"
                  class="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div class="flex items-center justify-between text-xs">
                <label class="flex items-center gap-2 text-zinc-400 cursor-pointer">
                  <input type="checkbox" id="login-remember" checked class="rounded accent-[#d4af37]" />
                  <span>Remember my access</span>
                </label>
              </div>

              <button 
                type="submit" 
                class="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-black font-semibold text-xs uppercase tracking-widest hover:brightness-110 active:scale-98 shadow-[0_4px_20px_rgba(212,175,55,0.25)] transition-all"
              >
                Sign In to Vault
              </button>
            </form>
          ` : `
            <!-- Signup Form -->
            <form id="signup-form" class="space-y-4">
              <div>
                <label class="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1">Full Legal Name</label>
                <input 
                  type="text" 
                  id="signup-name" 
                  required 
                  placeholder="e.g. Lady Sophia Laurent"
                  class="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label class="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1">Email Address</label>
                <input 
                  type="email" 
                  id="signup-email" 
                  required 
                  placeholder="client@haute-horlogerie.ch"
                  class="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label class="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1">Create Password</label>
                <input 
                  type="password" 
                  id="signup-password" 
                  required 
                  placeholder="Minimum 8 characters"
                  class="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label class="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-1">Confirm Password</label>
                <input 
                  type="password" 
                  id="signup-confirm-password" 
                  required 
                  placeholder="Repeat your password"
                  class="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <label class="flex items-start gap-2 text-[11px] text-zinc-400 cursor-pointer pt-1">
                <input type="checkbox" required checked class="rounded accent-[#d4af37] mt-0.5" />
                <span>I agree to the TIMEORA Terms of Service and Haute Horlogerie Privacy Charter.</span>
              </label>

              <button 
                type="submit" 
                class="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#c5a059] text-black font-semibold text-xs uppercase tracking-widest hover:brightness-110 active:scale-98 shadow-[0_4px_20px_rgba(212,175,55,0.25)] transition-all"
              >
                Create VIP Account
              </button>
            </form>
          `}

        </div>

      </div>
    `;
  }

  static setupEvents(isSignup = false) {
    const demoBtn = document.getElementById("auth-quick-demo-btn");
    if (demoBtn) {
      demoBtn.addEventListener("click", () => {
        store.loginDemoUser();
        window.location.hash = "#account";
      });
    }

    const tabLogin = document.getElementById("tab-toggle-login");
    const tabSignup = document.getElementById("tab-toggle-signup");

    if (tabLogin) {
      tabLogin.addEventListener("click", () => {
        window.location.hash = "#auth";
      });
    }

    if (tabSignup) {
      tabSignup.addEventListener("click", () => {
        window.location.hash = "#auth-signup";
      });
    }

    const loginForm = document.getElementById("login-form");
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("login-email").value.trim();
        const password = document.getElementById("login-password").value;
        const remember = document.getElementById("login-remember").checked;
        store.login(email, password, remember);
        window.location.hash = "#account";
      });
    }

    const signupForm = document.getElementById("signup-form");
    if (signupForm) {
      signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("signup-name").value.trim();
        const email = document.getElementById("signup-email").value.trim();
        const password = document.getElementById("signup-password").value;
        const confirm = document.getElementById("signup-confirm-password").value;

        if (password !== confirm) {
          store.showToast({ title: "Password Mismatch", message: "Your passwords do not match. Please re-enter.", type: "error" });
          return;
        }

        store.signup(name, email, password);
        window.location.hash = "#account";
      });
    }

    const forgotLink = document.getElementById("forgot-password-link");
    if (forgotLink) {
      forgotLink.addEventListener("click", (e) => {
        e.preventDefault();
        store.showToast({
          title: "Password Reset Link Sent",
          message: "A secure reset link has been dispatched to your email address.",
          type: "info"
        });
      });
    }
  }
}
