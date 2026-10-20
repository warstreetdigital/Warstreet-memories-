# WarStreet Memories — Platform Foundation (Stage 01 Refinement)

A premium mobile-first digital memory application by **WarStreet Experience Model™**.

Planned Production Domain: `warstreetmemories.enterharare.online`

---

## 1. Architectural Overview

WarStreet Memories connects physical gifts to enduring digital keepsakes via QR codes. Built strictly with **HTML, CSS, and vanilla JavaScript** without frontend framework dependencies or build requirements, delivering instant rendering and app-like ergonomics for mobile devices.

- **Mobile Application Feel**: App shell viewport, compact sticky header, responsive 2 × 2 category grid, and instant screen switching without page reloads.
- **No Marketing Bloat**: Focuses strictly on category discovery and direct memory access.
- **Direct QR-Code Compatibility**: Independent direct routing to `/birthdays/stella-aaliyah-dinar/` without requiring visitors to open the homepage first.
- **Zero-Dependency Core**: Lightweight standards-compliant HTML5, CSS3, and ES6 JavaScript.

---

## 2. URL Architecture & Directory Structure

```text
├── index.html                               # Platform Homepage (2x2 Category Grid & in-app Category screen)
├── _redirects                               # Cloudflare Pages 200 rewrite rules for clean URLs
├── css/
│   └── style.css                            # WarStreet mobile-first app styling (#f7f5f2 base, #ffffff cards)
├── js/
│   ├── data.js                              # Memory registry & category data schema
│   └── app.js                               # In-app view transition & history controller
├── birthdays/
│   ├── index.html                           # Birthdays category screen (Direct access fallback)
│   └── stella-aaliyah-dinar/
│       └── index.html                       # Stella Aaliyah Dinar dedicated birthday experience route
├── weddings/
│   └── index.html                           # Weddings category screen (Direct access fallback)
├── roora/
│   └── index.html                           # Roora category screen (Direct access fallback)
├── love-family/
│   └── index.html                           # Love & Family category screen (Direct access fallback)
└── README.md                                # Platform documentation & deployment guide
```

### Logical Path Hierarchy

| Screen / Destination | URL Path | Content |
| :--- | :--- | :--- |
| **Platform Homepage** | `/` | 2 × 2 Category Grid (**Birthdays**, **Weddings**, **Roora**, **Love & Family**) |
| **Birthdays Category** | `/birthdays/` | Shows **Stella Aaliyah Dinar** birthday memory entry |
| **Weddings Category** | `/weddings/` | Minimal empty state: *“New memories will appear here.”* |
| **Roora Category** | `/roora/` | Minimal empty state: *“New memories will appear here.”* |
| **Love & Family Category** | `/love-family/` | Minimal empty state: *“New memories will appear here.”* |
| **Stella Aaliyah Dinar Memory** | `/birthdays/stella-aaliyah-dinar/` | Cinematic near-black keepsake (Dominant portrait, exact dedication copy, burgundy "Tap Here, Birthday Queen ♛" action, 7-second opening sequence, combined audio) |

---

## 3. Brand & Visual Guidelines

- **Neutral Base**: `#f7f5f2`
- **Surface / Cards**: `#ffffff`
- **Primary Text**: `#222222`
- **Secondary Text**: `#5f5a54`
- **Accent**: Refined warm bronze `#9b722d` / `#f5ede0`
- **Headings**: Montserrat
- **Body**: Poppins
- **Signature**: `Powered by WarStreet Experience Model™`

---

## 4. Deployment Guide (Cloudflare Pages & GitHub Pages)

### Option A: Cloudflare Pages (Recommended)
1. Push repository to GitHub.
2. In Cloudflare Dashboard, navigate to **Compute (Workers & Pages)** > **Create application** > **Pages** > **Connect to Git**.
3. Select this repository:
   - **Framework preset**: None
   - **Build command**: Leave blank (no build step required)
   - **Build output directory**: `.` (root directory)
4. Deploy site.
5. In **Custom domains**, add `warstreetmemories.enterharare.online` and follow the DNS CNAME instructions.
6. The `_redirects` file automatically ensures direct navigation to `/birthdays/stella-aaliyah-dinar/` and all category paths resolves cleanly.

### Option B: Direct Static Hosting (GitHub Pages)
1. In repository settings, enable GitHub Pages pointing to the `main` branch root (`/`).
2. Custom domain: `warstreetmemories.enterharare.online`.
