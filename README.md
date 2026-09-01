# ⏳ TIMEORA Haute Horlogerie — Luxury Watch E-Commerce Platform

> **“TIMELESS DESIGN. UNMATCHED PRECISION.”**  
> An ultra-premium, production-ready e-commerce web application for luxury timepieces, tourbillons, chronographs, and grand complications.

---

## 🌟 Highlights & Features

- **Luxury Watch Aesthetic**: Bespoke dark luxury palette (obsidian `#070709`, brushed gold `#d4af37`, champagne highlights, Cormorant Garamond & Cinzel typography).
- **28+ Handcrafted Timepieces**: Across prestigious watch houses (*TIMEORA Atelier*, *Chronos Royal*, *Veloce Genève*, *Elysium Haute*, *Aurelius & Co.*, *Nautilus Prime*).
- **Interactive Global Search (`Ctrl + K`)**: Instant search overlay with trending horology tags, live auto-complete, and quick product cards.
- **Multi-Faceted Shop Filtering & Sorting**:
  - Filter by Category (Luxury, Classic, Sport, Minimal, Skeleton, Diver, Chronograph)
  - Filter by Manufacture House / Brand
  - Price Ceiling Slider ($5,000 – $60,000)
  - Gender (Men, Women, Unisex)
  - Case Metals (18K Rose Gold, 950 Platinum, Grade 5 Titanium, 316L Stainless Steel, Ceramic, Forged Carbon)
  - Strap Materials (Alligator Leather, Milanese Mesh, FKM Rubber, Gold Links)
  - 6 Sorting Modes (Featured, Newest 2026, Price: Low-High, Price: High-Low, Rating, Best Sellers)
- **Product Details & Gallery**:
  - Large multi-angle product gallery with hover zoom magnifier.
  - Deep technical horological specifications table.
  - Customer review submission form and verified reviews archive.
- **Shopping Bag & Slide-Out Cart Drawer**:
  - Real-time quantity controls, subtotal, and tax calculations.
  - Privilege coupon code engine (`TIMEORA10` for 10% off, `LUXURY50` for $500 off, `GOLDEN20` for 20% off).
  - Armored delivery courier selection.
  - Persisted in `localStorage`.
- **Private Wishlist**:
  - One-click save to wishlist, item counts, and "Move All to Bag" action.
- **End-to-End Checkout & Order Confirmation**:
  - Multi-step checkout with address validation.
  - Simulated payment options (Credit Card, Bank Wire, Vault COD).
  - Official order number generation, delivery date estimation, and printable receipt.
- **VIP Account Dashboard**:
  - Live order tracking with 4-stage progress bars (*Atelier Registration* → *Chronometric Calibration* → *Armored Transit* → *Delivered*).
  - Saved residences and addresses manager.
  - Profile credentials editor.
- **Brand Story & Boutique Concierge**:
  - Swiss watchmaking heritage in Le Locle since 1928.
  - Working contact form with instant validation.
  - Global flagship boutique directory (Geneva, London, New York).

---

## 🛠 Tech Stack & Architecture

- **Frontend**: Modern HTML5, Tailwind CSS, Modern ES Modules (Vanilla JS / Web Components)
- **Icons**: Lucide Icons
- **Typography**: Cormorant Garamond, Cinzel, Plus Jakarta Sans, JetBrains Mono
- **State Management**: Reactive Pub-Sub store with `localStorage` persistence
- **Local Server**: Zero-dependency PowerShell HTTP server & Node.js static server

---

## 🚀 Quick Start (Local Run)

### Option 1: One-Click Windows Launcher
Double-click `OPEN_WEBSITE.bat` in the project root folder.

### Option 2: PowerShell Server
```powershell
powershell -ExecutionPolicy Bypass -File .\server.ps1
```
Then visit: **`http://localhost:3000`**

### Option 3: Node.js (If Installed)
```bash
node server.js
```

---

## 📄 Repository Information

- **Repository**: [https://github.com/AbdurRaheem467/Abdurraheem](https://github.com/AbdurRaheem467/Abdurraheem)
- **Author**: Abdur Raheem
- **License**: MIT
