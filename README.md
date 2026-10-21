# Stackfolk — ZeroHack

> **Where bold ideas turn into working solutions.**  
> A high-performance, immersive web platform for **ZeroHack**, a 12-hour sprint organized by **StackFolk** uniting 120 aspiring developers, innovators, and problem-solvers across 5 forward-looking tracks.

---

## ⚡ Event Overview

* **Format**: 12-Hour High-Intensity Build Sprint (09:00 — 21:00)
* **Builders**: 120 Aspiring Developers, Innovators & Problem-Solvers
* **Core Motto**: *Ideas · Code · Impact*
* **5 Core Tracks**:
  1. **AI Agents** — Autonomous workflows, agent swarms, tool-calling systems, and intelligent assistants.
  2. **Web3** — Smart contracts, decentralized protocols, ERC-4337 smart wallets, and onchain autonomy.
  3. **IoT** — Connected hardware, embedded sensors, real-time edge computing, and device telemetry.
  4. **Cybersecurity** — Threat intelligence, vulnerability mitigation, secure enclaves, and verification loops.
  5. **Open Innovation** — Interdisciplinary solutions, novel architectures, and breakthrough prototypes.

---

## 🚀 Key Website Features

* **3D Scroll-Locked Hero Sequence**:
  * Desktop and mobile scroll-scrubbed canvas rendering a 50-frame WebP sequence with subpixel alpha transparency.
  * Interactive Three.js particle and geometry field running smoothly behind the viewport.
* **Continuous Display Hoarding (Past Sponsors)**:
  * 3 continuous ticker ribbons streaming from left to right with dual-edge gradient vanishing masks (`linear-gradient(90deg, transparent, black, transparent)`).
  * High-definition, crystal-clear official logos for 35+ partners with hover-to-pause and 3D card elevation.
* **Glimpses of Past Events**:
  * Authentic photography showcase from the *Startup & Investors Summit 2026*, *Masters' Union fireside sessions*, and live developer halls.
  * 100% opaque, high-contrast imagery with smooth cubic-bezier hover expansion (`scale(1.06)`), neon green illumination, and minimal Bauhaus badge pills.
* **Protocol Partners (To Be Announced)**:
  * Live status card highlighting upcoming foundation grants, bounties, and infrastructure credits.
* **Interactive Custom Cursor**:
  * Precision lag-free custom green cursor with dynamic focus states on clickable elements.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | [React 18](https://react.dev/) |
| **Build Tool** | [Vite](https://vitejs.dev/) |
| **Animation** | [Framer Motion](https://www.framer.com/motion/) |
| **3D & Graphics** | [Three.js](https://threejs.org/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Styling** | Vanilla CSS (Bauhaus / Cyberpunk Design System) |
| **Typography** | Inter, JetBrains Mono, Outfit, Plus Jakarta Sans |

---

## 📁 Project Structure

```text
stackfolk-site/
├── public/
│   ├── events/               # High-res past event photographs
│   ├── frames-transparent/   # Optimized 50-frame WebP logo scroll sequence
│   ├── sponsors/
│   │   └── hd/               # Official HD vector SVGs and PNG partner assets
│   ├── logo.png              # Official Stackfolk logo & favicon
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Footer.jsx        # Navigation & community links
│   │   ├── LogoScrollSequence.jsx # Canvas 120 FPS frame interpolator
│   │   ├── Marquee.jsx       # Real-time ticker banner
│   │   ├── Navbar.jsx        # Responsive navigation bar
│   │   └── ThreeDBackground.jsx # Three.js ambient background
│   ├── hooks/
│   │   └── useCursor.js      # Smooth custom circular cursor tracker
│   ├── sections/
│   │   ├── Hero.jsx          # Hero section + 3D lock + Bauhaus event card
│   │   ├── WhyStackfolk.jsx  # Manifesto, values & builder stats
│   │   ├── Program.jsx       # 12-hour timeline & schedule
│   │   ├── ZeroHack.jsx      # Tracks breakdown & registration brief
│   │   ├── Sponsors.jsx      # Protocol Partners (To Be Announced)
│   │   ├── PastEvents.jsx    # Bento grid of past summits & meetups
│   │   ├── PastSponsors.jsx  # Continuous 3-track display hoarding
│   │   └── FAQ.jsx           # Accordion FAQ
│   ├── styles/
│   │   └── index.css         # Global design tokens, themes & typography
│   ├── App.jsx               # Application root
│   └── main.jsx              # DOM entry point
├── index.html                # Semantic HTML5 entry with metadata
├── package.json              # Dependencies and scripts
└── vite.config.js            # Vite configuration
```

---

## 💻 Getting Started

### Prerequisites

* **Node.js**: `v18.0.0` or higher
* **npm** or **yarn** / **pnpm**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Mythicus22/zero-hack.git
   cd zero-hack/stackfolk-site
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Available Scripts

* `npm run dev` — Starts local development server with Hot Module Replacement (HMR).
* `npm run build` — Bundles production assets into `dist/` with tree-shaking and minification.
* `npm run preview` — Locally previews the production build.
* `npm run lint` — Runs ESLint across all source files.

---

## ⚡ Performance Highlights

* **Asset Optimization**: Converted frame animation sequences to WebP, saving >75% bandwidth over raw PNGs while preserving transparent alpha channels.
* **GPU Acceleration**: Utilizes CSS hardware-accelerated transforms (`translate3d`, `will-change`) for 60+ FPS continuous ticker scrolling.
* **Zero Layout Shift (CLS)**: Explicit dimensions and aspect ratios across all gallery items and hoarding canvases.

---

## 👥 Community & Organizers

Organized with ❤️ by **Stackfolk**.  
* Website: [stackfolk.com](https://stackfolk.com)  
* Inquiries: [contact@stackfolk.com](mailto:contact@stackfolk.com)
