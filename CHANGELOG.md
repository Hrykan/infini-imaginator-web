# Changelog — Infini Imaginator Tech Website

All notable changes to the Infini Imaginator Tech landing page.

---

## [1.0.0] — 2026-03-10

### Initial Release — Full Next.js Landing Page

**Project Setup:**
- Migrated from static HTML (`infini-imaginator-tech/`) to Next.js 16 with TypeScript, Tailwind CSS v4, and shadcn/ui
- App Router with `src/` directory structure
- Google Fonts: Bebas Neue (display), DM Sans (body), Space Mono (mono)
- Forced dark mode theme with crimson (#c0392b) accent palette

**Sections Built:**
- **Navigation** — Sticky glassmorphism nav, mobile hamburger with ARIA, scroll-aware opacity
- **Hero** — Vanta.NET particle background (Three.js), framer-motion staggered character reveal, two CTAs
- **About** — Founder photo (Mukul Kulkarni) + story, GradientDots animated background, 4 stat cards
- **Services** — Glassmorphism FeatureCard grid (21st.dev grid-feature-cards component) with dashed borders
- **Products** — Yuga Odysseys (with screenshot) + Research Assistant (with screenshot), alternating layout
- **Stats** — 4 animated counters (9+ years, 500+ reports, $500K identified, $200K+ savings)
- **Why Us** — 4 differentiators with clean card layout
- **Tech Stack** — 4-column grid with Meteors effect (21st.dev meteors component), rounded cards with glow
- **Team** — Founder card with photo, credentials grid, social links
- **Contact** — BackgroundPaths animated SVG background (21st.dev), contact cards, CTA
- **Footer** — Dynamic copyright year, social links

**21st.dev Components Integrated:**
- `background-paths.tsx` — Animated SVG flowing paths (Contact section)
- `gradient-dots.tsx` — Crimson dot pattern animation (About section)
- `grid-feature-cards.tsx` — Grid pattern cards with glassmorphism (Services section)
- `meteors.tsx` — Meteor streak animation (Tech Stack cards)

**Content (from Mukul's resumes):**
- 9+ years enterprise experience (Embrace Home Loans 2018-2025, Accenture 2014-2016)
- $500K tolerance issues identified, $200K+ cost avoidance
- 500+ BI reports managed, 111 ETL pipelines built
- 25% faster loan processing, 40% lower labor costs
- MS Information Systems, Pace University (GPA 3.88)
- BTech Computer Engineering, NMIMS University

**Yuga Odysseys Rebrand:**
- Updated from "educational quiz game" to "scenario-based platform for learning and growth"
- New tagline: "Challenge. Decide. Grow."
- 24 life domains, 588 scenarios, AI mentor Guruji, trilingual

**Accessibility & Performance:**
- `prefers-reduced-motion` support (CSS + JS + Framer Motion useReducedMotion)
- Custom cursor scoped to pointer devices only (`pointer: fine`)
- Skip-to-content link + `<main>` landmark
- ARIA attributes on mobile nav (aria-expanded, aria-controls, role)
- Color contrast improved: body text #999999, labels #8a8a8a (WCAG AA)
- Card borders increased to white/10 for visibility
- BackgroundPaths reduced to 40 paths (from 72), deterministic durations
- Footer icon touch targets expanded to 44px minimum

**SEO & Meta:**
- Meta description with specific outcomes ($500K, 500+ reports)
- OpenGraph image reference + Twitter card metadata
- metadataBase set to https://imaginator.in

**Known Issues / Future Work:**
- Page is still a single `"use client"` monolith — should split into server + client components for SSR/SEO
- Three.js/Vanta loaded via CDN script injection — should use next/script or npm bundle
- No testimonials/social proof section yet
- All CTAs are mailto links — need Calendly/booking integration
- Missing: OG image file, robots.txt, sitemap.xml, structured data (JSON-LD)
- Imaginator Chat product hidden (needs rebuild)
