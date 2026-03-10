# Changelog — Infini Imaginator Tech Website

All notable changes to the Infini Imaginator Tech landing page.

---

## [1.5.0] — 2026-03-11 IST

### Business Email
- Replaced `mkulkarni.work@gmail.com` with `business@imaginator.in` across all 8 occurrences
  - `page.tsx`: Founder email link, Contact email card (href + display text), Footer mail icon
  - `layout.tsx`: JSON-LD email fields (×2), ContactAction fallback, FAQ answer text
- Email routing already configured in Cloudflare: `business@imaginator.in` forwards to Gmail

### Production Deployment — First Live Deploy
- Deployed to Vercel production via CLI (`vercel deploy --prod`)
- Clean build: compiled in 7.3s, 0 errors, 0 warnings
- 5 static routes: `/`, `/_not-found`, `/icon.svg`, `/robots.txt`, `/sitemap.xml`
- Live URL: https://infini-imaginator-tech.vercel.app

### Domain — imaginator.in Connected
- Added `imaginator.in` and `www.imaginator.in` as custom domains in Vercel
- Cloudflare DNS configured for both:
  - Root: `A @ → 216.198.79.1` (Vercel IP), proxied: OFF
  - www: `CNAME www → f731b609b6345bf9.verce...` (Vercel), proxied: OFF
- Removed conflicting A records that pointed to old hosting IPs (`65.20.83.134`, `213.210.37.215`)
- `www.imaginator.in` — Valid Configuration confirmed
- `imaginator.in` — DNS propagating (record set, Vercel verification pending)
- **Note:** Cloudflare proxy must stay OFF on both records — double-proxying breaks Vercel SSL

### Environment Variables — Vercel Production
- `NEXT_PUBLIC_BOOKING_URL` added to Vercel production environment via CLI
- Value: `https://calendar.app.google/Rpjucz8wLz9HhQe49` (Google Calendar Appointment Schedule)
- `.env.local` holds local dev values — gitignored, not committed

---

## [1.4.0] — 2026-03-11 IST

### Booking CTAs — Google Calendar Integration

- Replaced all 4 booking-intent `mailto:` links with Google Calendar Appointment Schedule URL
  - Nav desktop CTA: text changed to "BOOK A FREE CALL"
  - Nav mobile CTA: same
  - Hero primary CTA: text changed to "BOOK A FREE STRATEGY CALL"
  - Contact section CTA: text changed to "BOOK A FREE 30-MIN CALL"
- All booking CTAs open in `target="_blank"` with `rel="noopener noreferrer"`
- Email display links (Founder section, Contact info cards, Footer icon) remain as `mailto:` — intentional
- Created `.env.local` with `NEXT_PUBLIC_BOOKING_URL` (gitignored)
- Added `NEXT_PUBLIC_BOOKING_URL` to Vercel production environment via CLI
- Updated JSON-LD `ContactAction` target in `layout.tsx` from `mailto:` to booking URL

### Contact Form — Decided Against

- Created `src/components/ui/contact-form.tsx` (Web3Forms, no npm package) but decided not to use it
- Rationale: Google Calendar already collects name, email, and challenge question; contact section retains email info card as fallback for non-booking visitors
- File deleted; `NEXT_PUBLIC_WEB3FORMS_KEY` placeholder removed from `.env.local`

### Rounded Corners — Unified Card Aesthetic

- Added `rounded-2xl overflow-hidden` to all card-like containers to match Tech Stack HighlightCard style:
  - Services grid outer container
  - About stats row (4-column grid)
  - About founder photo
  - Products image card (with photo variant)
  - Products placeholder visual card
  - Founder full-width two-column card
  - All 3 Contact info cards (Email, LinkedIn, Response Time)
- HighlightCard (Tech Stack) already had `rounded-2xl` — no change needed

### Brand Name Fix — "Infini Imaginator Tech" Everywhere

- Nav logo: `INFINI IMAGINATOR` → `INFINI IMAGINATOR TECH`
- Founder photo alt text: `"Founder of Infini Imaginator"` → `"Founder of Infini Imaginator Tech"`
- Founder bio: `"Infini Imaginator Technologies"` → `"Infini Imaginator Tech"`
- FAQ JSON-LD question: `"how does Infini Imaginator use it?"` → `"...Infini Imaginator Tech..."`

### Em Dash Removal — Natural Prose

- Removed all em dashes (`—`) from visible page content (13 total)
- Replacements chosen contextually: comma, period, or parentheses depending on sentence flow
- Affected sections: Hero subtitle, Services (BI & Analytics, AI Strategy), Products (Yuga Odysseys), Why Us (all 4 cards + title), About (2 paragraphs), Founder bio (2 instances), Contact paragraph

---

## [1.3.0] — 2026-03-10 08:00 IST

### Tech Stack Section — HighlightCard Component

- Replaced Meteors component with new `highlight-card.tsx` (custom animated card design)
- Created `src/components/ui/highlight-card.tsx` — dark card with subtle crimson accents, icon header, divider, and description
- Created `src/components/ui/card.tsx` — shadcn Card base component (used as HighlightCard foundation)
- Icons per tech stack category: `Bot`, `Database`, `PieChart`, `Code2` (lucide-react)
- Card visual iteration: started with heavy crimson fills, dialed back to dark/neutral with minimal crimson — `border-white/10`, `hover:border-[#c0392b]/30`, crimson divider line, crimson dot accents
- Outer wrapper: `rounded-2xl overflow-hidden` to match Card border-radius (prevents corner bleed)
- Removed `hover:-rotate-1` tilt — geometry stays consistent on hover

### Founder Section — Full Redesign

- Layout changed from narrow `max-w-2xl` centered box to full-width two-column card
- New photo: `/public/mukul-photo-2.jpg` (selfie format) added and applied, replacing crowd photo
- Bio rewritten with specific career arc: Accenture India → MS at Pace University → Embrace Home Loans → Infini Imaginator Technologies
- Achievements corrected from resumes: managed 500+ SSRS BI reports, built 50+ from scratch, $500K in tolerance cures (process improvement with VP of Operations), 6 executive command centre dashboards on TV screens
- "Infini Imaginator Technologies" rendered in bold crimson with quotation marks around tagline
- "Previously at" badge row added: Accenture + Embrace Home Loans
- Credential tiles row: Experience, Degree (MS Info Systems), University (Pace University), GPA (3.88/4.0)
- Typography tightened: bio unified to `text-sm`, section title reduced to `text-3xl md:text-4xl`, padding reduced to `p-6 md:p-8` so Email/LinkedIn buttons remain visible in viewport

### SEO & AEO Implementation

**`src/app/layout.tsx` metadata overhaul:**
- Title template (`%s | Infini Imaginator Tech`) and full meta description
- 21 targeted keywords across AI automation, BI analytics, and consulting
- Robots directives: `googleBot` with `max-snippet: -1`, `max-image-preview: large`
- Canonical URL, OG locale/siteName, Twitter creator handle
- `<link rel="preconnect">` tags for CDN hosts
- `theme-color` and `color-scheme` meta tags

**JSON-LD structured data (3 schemas injected in `<head>`):**
- `ProfessionalService` — organization, founder, and services list
- `WebSite` — site identity with `SearchAction` / `ContactAction`
- `FAQPage` — 8 Q&As targeting AI answer engine (AEO) queries

**`src/app/sitemap.ts`:** Next.js sitemap generation covering all 6 page sections

**`src/app/robots.ts`:** robots.txt generation with sitemap reference URL

### Contact Section — BackgroundPaths Fix

- Root cause identified: gradient overlay `from-[#080808]/80 via-[#080808]/60 to-[#080808]/90` was nearly opaque, hiding the SVG paths entirely
- Overlay reduced: `from-[#080808]/40 via-[#080808]/10 to-[#080808]/60`
- BackgroundPaths container repositioned: `absolute -top-80 inset-x-0 bottom-0` (extended 320px above section top) so paths visually begin beside the heading
- Path count increased to 30 per layer (60 total, up from 20/40)
- `strokeOpacity` increased: minimum 0.25 (was 0.15), formula `0.25 + i * 0.028`
- ViewBox expanded: `-100 -350 900 1000` (was `-100 -300 900 900`)
- Path spacing tightened: `i * 7` (was `i * 8`) for denser bundling
- Stroke width adjusted: `0.6 + i * 0.05` (was `0.8 + i * 0.06`)
- Animation opacity range raised: `[0.5, 0.9, 0.5]` (was `[0.4, 0.8, 0.4]`)

### Floating Dot Navigation

- New `FloatingDotNav` component added to `page.tsx`
- 8 navigation dots: Home, About, Services, Products, Results, Tech Stack, Founder, Contact
- Positioned `fixed right-5`, vertically centered, desktop-only (`hidden md:flex flex-col`)
- Active dot: crimson `w-2.5 h-2.5` with crimson glow `box-shadow`
- Inactive dots: `bg-white/20`, brighten on hover
- Section labels: slide in from right on hover — monospace font, small pill with backdrop blur
- `IntersectionObserver` at 35% threshold tracks which section is active
- `activeSection` state added to the Home component

### Bug Fixes

- **Hydration error (critical)** — `grid-feature-cards.tsx`: `genRandomPattern()` called `Math.random()` during render, causing server/client mismatch and React hydration warnings. Fixed with `useState([])` initialised to empty + `useEffect` to fill pattern after hydration — server renders plain squares (deterministic), client fills random pattern on mount.
- **`button.tsx`** — Removed dependency on `@base-ui/react` (unused package); rewrote using `@radix-ui/react-slot` (standard shadcn/ui pattern).
- **Vanta CDN loader** — Added `.catch()` handler to script loading promise chain for silent failure on network error.
- **Tailwind border syntax** — Fixed `border-[#f5f5f5]/08` → `border-[#f5f5f5]/[0.08]` (arbitrary opacity requires bracket notation).
- **`package.json`** — Removed unused `@base-ui/react` dependency.

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
| Medium | Missing robots.txt, sitemap.xml | Resolved in v1.3.0 (`robots.ts`, `sitemap.ts`) |
| Medium | No structured data (JSON-LD for Organization) | Resolved in v1.3.0 (3 schemas) |
| Medium | No FAQ section (visible) | Resolved in v1.3.0 (FAQPage JSON-LD for AEO) |
| Low | Imaginator Chat product hidden (needs rebuild) | Deferred |
| Low | Business email needed (not Gmail) | Open |
