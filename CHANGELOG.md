# Changelog — Infini Imaginator Tech Website

All notable changes to the Infini Imaginator Tech landing page.

---

## [1.2.0] — 2026-03-10 04:30 IST

### Layout & Visual Polish

**Spacing Overhaul:**
- All section padding reduced: `py-32` → `py-16 md:py-24` (128px → 64/96px)
- Section header margins: `mb-16`/`mb-20` → `mb-10` (64-80px → 40px)
- Product card gaps: `lg:gap-20` → `lg:gap-12`, `space-y-24` → `space-y-16`
- Product internal spacing compressed (tagline, description, features)
- Section headings reduced: `text-5xl md:text-6xl` → `text-4xl md:text-5xl`
- Product titles: `text-4xl md:text-5xl` → `text-3xl md:text-4xl`

**About Section Redesigned:**
- Removed decorative "II" column (wasted 50% of viewport)
- Added founder photo on left (240-280px column) with name/title overlay
- Story text fills right column — no wasted space
- 4 stat cards as full-width row at bottom with grid-gap separators
- "Est. 2025 · Mumbai · Remote-First" as compact header line

**Hero Headline Fix:**
- Reduced from `clamp(2.8rem, 8vw, 7rem)` to `clamp(2.5rem, 6vw, 5.5rem)`
- Prevents "BUSINESS" from breaking mid-word on desktop viewports

**Contact Section:**
- "NO COMMITMENT · NO SALES PRESSURE · JUST A CONVERSATION" moved to first viewport (under subtitle)
- Removed duplicate at bottom of section

**BackgroundPaths (Contact):**
- Expanded SVG viewBox from `"0 0 696 316"` to `"-100 -300 900 900"`
- Added `preserveAspectRatio="xMidYMin slice"` — paths now start from top ~20%

**Tech Stack → Meteor Cards (21st.dev):**
- Integrated `meteors.tsx` component (exact 21st.dev implementation)
- Cards now have `rounded-2xl`, `overflow-hidden`, `shadow-xl`
- Crimson glow blur behind each card
- 20 meteors per card with `bg-slate-500` trails (matching reference)
- Added `@keyframes meteor` animation to globals.css

---

## [1.1.0] — 2026-03-10 03:00 IST

### Review Fixes (3 rounds of UI/UX, Content, Performance audits)

**Critical Accessibility:**
- Added `useReducedMotion()` from framer-motion to FadeUp component
- AnimatedCounter immediately shows final value when reduced-motion preferred
- `scrollToSection` uses `behavior: "instant"` for reduced-motion users
- Vanta.NET skipped entirely when reduced-motion preferred
- Custom cursor scoped to `(pointer: fine)` devices only via `has-custom-cursor` class
- Skip-to-content link + `<main id="main-content">` landmark added

**Color Contrast (WCAG AA):**
- Body text: `#888888` → `#999999` (5.9:1 on #080808)
- Labels: `#555555` → `#8a8a8a` (4.6:1 on #0f0f0f)
- Card borders: `border-[#f5f5f5]/05` → `border-white/10` (visible on monitors)
- Why Us headings: `#c0392b` → `#e74c3c` (better contrast)
- Global `cursor: none` removed from `*`, scoped to `.has-custom-cursor`

**Mobile Nav Accessibility:**
- Hamburger button: `aria-expanded`, `aria-controls="mobile-menu"`, `aria-label`, `p-3` touch target
- Menu panel: `id="mobile-menu"`, `role="navigation"`, `aria-label="Mobile navigation"`
- Footer icon links: `p-3 -m-3` for 44px minimum touch target
- Logo `//` wrapped in `aria-hidden="true"`

**Content Updates (from 3 resumes):**
- Hero headline: "TRANSFORMING DATA..." → "FROM RAW DATA TO REAL BUSINESS IMPACT"
- Hero sub: "From identifying $500K in issues at Embrace Home Loans..."
- Section headlines: Services → "WHAT WE BUILD", Products → "SHIPPED & LIVE", Team → "THE FOUNDER"
- Stats: 9+ years, 500+ reports, $500K identified, $200K+ savings (verified against resumes)
- About: 9+ years (not 10+), BI Data Analyst title (not "BI Dev"), Mumbai India (not NY)
- Team bio shortened to 2 sentences (deduplicated with About)
- Tech stack reorganized: added Snowflake, Sigma, removed duplicates
- "588+" fixed to "588" per resumes
- Footer year: hard-coded 2026 → `new Date().getFullYear()`
- LinkedIn URL fixed to `/in/mukul-kulkarni/` everywhere

**Yuga Odysseys Rebrand:**
- Tagline: "Gamified Learning Through Ancient Wisdom" → "Challenge. Decide. Grow."
- Description rewritten: scenario-based platform, not quiz/game
- Features: 24 life domains, AI mentor Guruji, trilingual
- Removed all old terminology (post-apocalyptic, civilization, gamified)

**Services → Glassmorphism FeatureCards (21st.dev):**
- Integrated `grid-feature-cards.tsx` component
- Dashed border grid with `backdrop-blur-sm` glassmorphism
- SVG grid pattern overlay per card
- Service icons changed from JSX elements to component references

**GradientDots Brand Fix:**
- Rainbow colors replaced with crimson palette (#c0392b, #922b21, #e74c3c, #1a0505)
- `hue-rotate` animation removed entirely

**BackgroundPaths Optimization:**
- Paths reduced from 72 → 40 (20 per layer)
- `Math.random()` in render replaced with deterministic `(path.id * 1.7) % 10`
- Added `aria-hidden="true"`, removed `<title>` (purely decorative)
- Increased stroke opacity and width for better visibility

**SEO & Meta:**
- Meta description: "7+ years" → "9+ years" with specific outcomes
- Added OG image reference + Twitter card metadata
- Added `metadataBase: new URL("https://imaginator.in")`
- Product images: added descriptive `imageAlt` fields
- Section IDs added: `why-us`, `stack`, `team`

**Performance:**
- Removed unused `useAnimation` import from framer-motion
- DM Sans font weight 300 removed (unused)
- `prefers-reduced-motion` CSS block stops all animations
- Product stagger delay fixed: `delay={0.1}` → `delay={i * 0.15}`
- Added `.card-border` utility class

---

## [1.0.0] — 2026-03-10 01:00 IST

### Initial Release — Next.js Landing Page

**Project Setup:**
- Migrated from static HTML to Next.js 16 with TypeScript, Tailwind CSS v4, and shadcn/ui
- App Router with `src/` directory structure
- Google Fonts: Bebas Neue (display), DM Sans (body), Space Mono (mono)
- Forced dark mode theme with crimson (#c0392b) accent palette
- Old static HTML version replaced on GitHub (`Hrykan/infini-imaginator-web`)

**Sections Built:**
- Navigation — Sticky glassmorphism nav, mobile hamburger, scroll-aware opacity
- Hero — Vanta.NET particle background (Three.js), framer-motion character reveal
- About — Company story with founder credentials
- Services — 3-card grid (AI Automation, BI & Analytics, AI Strategy)
- Products — Yuga Odysseys + Research Assistant with screenshots
- Stats — 4 animated counters
- Why Us — 4 differentiators
- Tech Stack — 4-column category grid
- Team — Founder card with photo
- Contact — CTA section with contact details
- Footer — Copyright, social links

**Content Source:**
- All text verified against Mukul Kulkarni's resumes (AI Builder, Data Senior, Manager)
- Product screenshots captured via Playwright browser automation
- Founder photo from LinkedIn profile

---

## [0.1.0] — 2026-03-10 00:30 IST

### Static HTML Prototype (Deprecated)

- Single `index.html` with all CSS/JS inline
- Vanta.NET hero, GSAP + ScrollTrigger animations, Lenis smooth scroll, Splitting.js
- Content scraped from old mytharaatech.imaginator.in website
- Rebranded from Mytharaa Tech → Infini Imaginator Tech
- Pushed to `Hrykan/infini-imaginator-web` (since replaced by Next.js version)

---

## Known Issues / Future Work

| Priority | Issue | Status |
|----------|-------|--------|
| Critical | Page is single `"use client"` monolith — no SSR, poor SEO | Open |
| Critical | Three.js/Vanta via CDN script injection — no SRI, ~600KB | Open |
| High | All CTAs are mailto to Gmail — need Calendly/booking | Open |
| High | No testimonials/social proof section | Open |
| High | Missing OG image file (`/public/og-image.png`) | Open |
| Medium | No process/how-we-work section | Open |
| Medium | No FAQ section | Open |
| Medium | Missing robots.txt, sitemap.xml | Open |
| Medium | No structured data (JSON-LD for Organization) | Open |
| Low | Imaginator Chat product hidden (needs rebuild) | Deferred |
| Low | Business email needed (not Gmail) | Open |
