# Changelog — Infini Imaginator Website

All notable changes to the Infini Imaginator landing page.

---

## [2.0.0] — 2026-03-18 IST

### Design Audit + Conversion Architecture (Phase 1–3)

This release applies a comprehensive design and conversion audit across the landing page, adding three new sections, fixing WCAG contrast compliance, unifying the design system, and restructuring the page flow for B2B conversion.

---

#### Phase 1 — WCAG Compliance + Design System Fixes

**Crimson color corrected: #c0392b → #e74c3c (WCAG AA)**
- `#c0392b` on `#080808` = 3.68:1 contrast ratio — fails WCAG AA (4.5:1 required)
- `#e74c3c` on `#080808` = 5.24:1 — passes AA for normal text
- Updated across: `globals.css` CSS variables (`--ii-crimson`, `--accent`, `--destructive`, `--ring`, `--sidebar-primary`, `--sidebar-ring`, `--chart-1`), all `rgba(192,57,43,…)` → `rgba(231,76,60,…)`, scrollbar thumb, cursor-dot, `.text-accent`, `.animated-underline`, `.section-label`
- `page.tsx`: bulk-replaced all `text-[#c0392b]`, `border-[#c0392b]`, `hover:bg-[#c0392b]`, `bg-[#c0392b]`; Vanta color `0xc0392b` → `0xe74c3c`; floating dot nav active state updated
- `grid-feature-cards.tsx`: all hardcoded `#c0392b` → `#e74c3c`
- CTA button base remains crimson; hover upgraded to `#f05a46` (distinct from base)

**Letter-spacing fixes (type system)**
- `.section-label` + `.type-label`: `0.3em` → `0.18em` (was over-tracked, compressed readability)
- `.type-cta`: `0.05em` → `0.1em` (was under-tracked for monospace button label)

**Footer logo consistency**
- Footer `//` was plain text characters rendering differently than the nav SVG mark
- Replaced with identical 16×16 inline SVG (two crimson rects, `rotate(15)`) matching the nav logo exactly

**Stats reorder — outcomes-first**
- Old order: Years, Reports, Cost Savings, Value Identified
- New order: `$500K Value Identified` → `$200K+ Annual Cost Savings` → `500+ BI Reports` → `9+ Years`
- Label corrected: "Issues Identified" → "Value Identified via Dashboards"
- Rationale: proof of impact leads, credential (years) closes

---

#### Phase 2 — Component Polish + CTA Strips

**FeatureCard heading font — Bebas Neue**
- `grid-feature-cards.tsx` h3: `text-sm md:text-base font-medium` → `font-display text-xl md:text-2xl tracking-wide leading-none`
- Service card headings now use display font matching the rest of the design system

**Why Us h3 color — white instead of crimson**
- All 4 Why Us card headings: `text-[#e74c3c]` → `text-[#f5f5f5]`
- Rationale: crimson on dark card is low contrast and competes with the numbered label; white reads cleanly

**CTA strip after Services section**
- Added inline `flex` row: "Not sure which service fits? Book a free call and we'll identify exactly where AI and data can move the needle for your business."
- CTA button: "BOOK A FREE CALL" linking to `NEXT_PUBLIC_BOOKING_URL`
- Separated from cards by `border-t border-white/10`

**CTA strip after Stats section**
- Added centered text: "These results came from real enterprise engagements — not projections."
- CTA button: "SEE HOW WE CAN DO THIS FOR YOU" linking to booking URL

**Duplicate Tailwind class fix**
- Multiple sections had `py-16 md:py-16 md:py-20` (duplicate `md:py-*`)
- Corrected to `py-16 md:py-20` throughout

---

#### Phase 3 — New Sections + Page Restructure

**Stats section moved — before Services**
- Old order: About → Services → Products → Stats → Why Us → ...
- New order: About → **Stats** → Services → Products → Why Us → ...
- Rationale: B2B buyers want proof before the offer; showing outcomes ($500K, $200K+, 500+ reports) before the service cards increases credibility and conversion intent

**Process section added** (`id="process"`, between Services and Products)
- 4-step horizontal stepper on desktop, vertical stack on mobile
- Steps: (1) Discovery Call → (2) Audit & Roadmap → (3) Build & Deliver → (4) Measure & Iterate
- Numbered circles with `border border-[#e74c3c]/30` and crimson step number
- Connecting horizontal line (desktop only): `hidden md:block absolute top-5 left-1/2 right-0 border-t border-white/10`
- Reduces buyer anxiety by making the engagement process concrete before product showcase

**FAQ accordion added** (`id="faq"`, before Contact)
- `FaqAccordion` component (inline in `page.tsx`): `useState<number | null>(null)` — no new npm packages
- 8 Q&As covering: services offered, pricing/free consultation, Snowflake experience, n8n, products built, BI tools, results delivered, "who will I work with"
- Items animate in via `FadeUp` with `delay={i * 0.04}` stagger
- Toggle: `+` rotates 45° → `×` with crimson border when open; answer fades in below
- FAQ content mirrors the JSON-LD FAQPage schema already in `layout.tsx` (UI now surfaces what crawlers already index)

**Navigation cleanup**
- `navLinks` trimmed: removed "Results" (no dedicated section) → `["About", "Services", "Products", "Contact"]`
- `NAV_SECTIONS` (floating dot nav) updated: `results` → `process`, `stack` → `faq`
- Dot labels updated to: hero, about, services, process, products, team, faq, contact

---

## [1.9.0] — 2026-03-18 IST

### Claude Code Infrastructure Overhaul

**Global `~/.claude/CLAUDE.md` rewrite (139 → 69 lines)**
- Removed bloat and default-behavior repetition — every line earns its place
- Added continuation prompt rule: before any compact/clear, generate a full copy-pasteable context summary
- Changed commit discipline from "proactive force" to "propose at logical breakpoints" (prevents system prompt conflicts)
- Made CHANGELOG conditional: only mentioned if the file exists in the active project
- Added complexity threshold: changes under 5 lines skip GitHub Issues, CHANGELOG, and skill triggers
- Added `writing-plans` skill trigger (was missing)
- Merged Communication + Recommendations into 4 lines

**Stop hook fix (`~/.claude/scripts/check-uncommitted.sh`)**
- Changed `exit 2` → `exit 0` — advisory only, never blocks stopping
- Added branch name to warning message
- Made CHANGELOG reminder conditional on file existing in cwd

**Post-compaction cross-project fix (`~/.claude/scripts/log-prompt.py`)**
- Added cwd validation: checkpoint cwd vs. hook cwd must match before injecting context
- Prevents stale context from a different project bleeding into a new session

**Rules directory (`~/.claude/rules/`)**
- Moved 4 sections from CLAUDE.md into separate always-loaded rule files:
  `agent-teams.md`, `github-issues.md`, `browser-automation.md`, `prompt-journaling.md`

**Frontend design skill — complete overhaul (`frontend-design:frontend-design`)**
- Expanded from 42 → 616 lines via 8 parallel research agents
- Research covered: GitHub skill repos, Awwwards agency patterns, GSAP/Lenis/Framer Motion,
  luxury typography (Utopia fluid scales, Vercel letter-spacing system), Kling/Veo AI video,
  WebGL/Spline/Rive/GLSL tier list, Remotion motion graphics, technical implementation patterns
- New additions: Utopia `clamp()` type scale with exact values, letter-spacing progression table,
  variable font GRAD axis, OLED surface elevation stack, 5-token accent derivation, grain overlay
  technique (20-line CSS, highest ROI), blur-to-sharp "Vercel look" stagger, Lenis + GSAP ticker
  integration, AI video model rankings + FFmpeg pipeline, Remotion playbook, Three-point lighting
  standard, Rive vs Lottie decision matrix, 25-item pre-flight checklist
- Added `frontend-design` trigger to global CLAUDE.md Skill Triggers section

**Project meta**
- `lessons.md` added: captures development corrections for session-start review

---

## [1.8.0] — 2026-03-18 IST

### Brand Rename + Design System

**Brand rename: "Infini Imaginator Tech" → "Infini Imaginator"**
- Company is registering as "Infini Imaginator" Private Limited — removed "Tech" from all occurrences
- Updated: nav logo, footer, page title metadata, OG title, Twitter card title, JSON-LD schemas (ProfessionalService name, FAQPage answers, WebSite name, founder knowsAbout context)

**Design system tokens added to `globals.css`**
- CSS custom properties: `--ii-white`, `--ii-muted`, `--ii-dim`, `--ii-crimson`, `--ii-crimson-hover`, `--ii-bg`, `--ii-card`, `--ii-border`
- Named type-scale utility classes with inline documentation:
  - `.type-hero` — Bebas Neue fluid hero display (`clamp(2.5rem, 6vw, 5.5rem)`)
  - `.type-stat` — Bebas Neue fluid stat numbers (`clamp(2.5rem, 6vw, 5rem)`)
  - `.type-section` — Bebas Neue section h2 (fluid 2→3rem)
  - `.type-card-heading` — Bebas Neue card h3 (fluid 1.75→2.25rem)
  - `.type-sub-heading` — Bebas Neue sub-heading (fluid 1.25→1.5rem)
  - `.type-label` — Space Mono section tag (0.75rem, tracked, crimson)
  - `.type-body-lg` — DM Sans large prose (fluid 1→1.25rem)
  - `.type-body` — DM Sans standard body (15px)
  - `.type-body-sm` — DM Sans caption (14px)
  - `.type-cta` — Space Mono button / nav (14px, tracked)
  - `.type-tag` — Space Mono tech chip (12px, tracked, uppercase)

---

## [1.7.1] — 2026-03-17 IST

### Favicon Final Design + Nav Identity

**Favicon — `//` forward-slash icon**
- Final design chosen: two crimson `rect` elements with `rotate(15)` (forward-slash direction)
- Iteration history: white I's → crimson I's with connector (looked like "H") → two crimson pillars (looked like pause button) → `\\` backslash (`rotate(-15)`) → corrected to `/` (`rotate(15)`)
- Updated both `src/app/icon.svg` and `public/icon.svg` to final design
- Key learnings: SVG `rotate(N)` positive = clockwise = forward slash `/`; CSS `skewX(N)` positive = backslash `\\`

**Nav Logo — `//` icon + wordmark**
- Added inline SVG `//` icon (20×20) beside "INFINI IMAGINATOR" text in nav
- Icon uses same geometry as favicon: two rects, `rotate(15)`, crimson `#C0392B`

**OG Image — Dynamic branded card** (`src/app/opengraph-image.tsx`)
- Created Next.js edge `ImageResponse` route (1200×630) replacing missing `/og-image.png`
- Fixes WhatsApp, Slack, and social share previews showing blurry triangle (missing file)
- Design: dark `#080808` background, `//` slash mark, brand name, divider, tagline, domain
- `skewX` direction corrected to `15deg` (positive = forward slash) in OG image after initial backslash
- OG metadata updated in `layout.tsx` to point to `/opengraph-image` route

---

## [1.5.1] — 2026-03-12 IST

### Bug Fixes — Mobile Nav, Hero, Initial Favicon

**Mobile hamburger menu — Android Chrome fix**
- Root cause: `scrollToSection` called `scrollIntoView` before `AnimatePresence` finished closing the menu, creating a race condition that prevented scroll on Android Chrome
- Fix: call `setMobileMenuOpen(false)` first, then delay scroll with `setTimeout(..., 300ms)` to let exit animation complete
- Respects `prefers-reduced-motion`: uses `behavior: "instant"` vs `"smooth"` accordingly

**Hero headline — mid-word line break fix**
- Root cause: each character was wrapped in its own `inline-block` span (for framer-motion reveal), allowing the browser to break "BUSINESS IM / PACT" mid-word
- Fix: group characters by word, wrap each word in `whitespace-nowrap` span, emit `&nbsp;` between words as a separate animated span
- Result: line breaks only at word boundaries

**Initial favicon — two crimson I's**
- First pass: two crimson vertical rects with a white horizontal bar (connector bar)
- User feedback: "why H?" — white connector made II look like H
- Removed connector bar; second pass: two crimson pillars
- User feedback: "looks like a pause button" — prompted favicon options page for decision

---

## [1.7.0] — 2026-03-12 IST

### Domain Alias — yuga.life → yugaodysseys.in Redirect

- Purchased `yuga.life` on Hostinger as a short, shareable alias for the Yuga Odysseys product
- Created 301 (permanent) redirect via Hostinger Domain Forwarding API:
  - `http://yuga.life` → `https://yugaodysseys.in`
- Verified live with `curl -I http://yuga.life` — returns `301 Moved Permanently`, `Location: https://yugaodysseys.in`
- `yugaodysseys.in` DNS, Cloudflare config, and SEO remain untouched — `yuga.life` is alias-only
- No Cloudflare migration needed for `yuga.life` — Hostinger parking DNS handles the forward natively
- `www.yuga.life` forwarding not supported as a separate entry (Hostinger apex-only forwarding); apex redirect covers primary use case

---

## [1.6.0] — 2026-03-11 IST

### Infrastructure — DNS Migration to Cloudflare

- Migrated DNS for both `imaginator.in` and `yugaodysseys.in` from Hostinger parking DNS to Cloudflare (free plan)
- Cloudflare account: `mkulkarni.work@gmail.com`
- Nameservers updated at Hostinger via API: `itzel.ns.cloudflare.com` / `jose.ns.cloudflare.com`
- All existing DNS records preserved and migrated — including VPS A records, Vercel CNAMEs, subdomains
- Missing subdomains added to Cloudflare that scanner missed: `yuga-odysseys`, `yo`, `research`, `mytharaatech`, `_lovable.mytharaatech`
- AI training bot crawlers blocked on all pages for both domains (Cloudflare AI Crawl Control)
- Wildcard `*.imaginator.in → 213.210.37.215` means new subdomains auto-resolve to VPS without DNS changes

### Email — Custom Domain Addresses

- Set up `business@imaginator.in` → forwards to `mkulkarni.work@gmail.com` via Cloudflare Email Routing
- Set up `support@yugaodysseys.in` → forwards to `mkulkarni.work@gmail.com` via Cloudflare Email Routing
- Gmail "Send as" configured for both addresses using Gmail SMTP + App Password
- Both addresses fully functional for inbound and outbound
- `business@imaginator.in` replaces `mkulkarni.work@gmail.com` in all public-facing references

### Tooling — Hostinger & Cloudflare MCP

- Hostinger MCP (`hostinger-api-mcp`) configured in Claude Code for `infini-imaginator-tech` project
- Cloudflare API token (`$CLOUDFLARE_API_TOKEN`) stored in `~/.zshrc`, Zone DNS Edit scope
- `imaginator-cloudflare` skill created at `~/.claude/skills/imaginator-cloudflare/` with zone IDs, DNS inventory, and deployment patterns

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
| High | No testimonials/social proof section | Open (no fabricated testimonials — deferred until real ones exist) |
| — | No process/how-we-work section | Resolved v2.0.0 (4-step Process stepper) |
| Medium | Imaginator Chat product hidden (needs rebuild) | Deferred |
| Low | Type-scale utility classes not yet applied — existing code still uses inline Tailwind | Open |
| — | WCAG AA contrast failures (crimson #c0392b on #080808 = 3.68:1) | Resolved v2.0.0 (#e74c3c = 5.24:1) |
| — | FAQ section missing (JSON-LD schema existed but no UI) | Resolved v2.0.0 (FaqAccordion component) |
| — | All booking CTAs are mailto — need Calendly/booking | Resolved v1.4.0 (Google Calendar) |
| — | Missing OG image for social sharing | Resolved v1.7.1 (`opengraph-image.tsx`) |
| — | Business email needed (not Gmail) | Resolved v1.5.0/v1.6.0 (`business@imaginator.in`) |
| — | Missing robots.txt, sitemap.xml | Resolved v1.3.0 |
| — | No structured data / JSON-LD | Resolved v1.3.0 (3 schemas) |
| — | Mobile hamburger not working on Android Chrome | Resolved v1.5.1 |
| — | Hero headline breaks mid-word | Resolved v1.5.1 |
| — | No favicon / browser tab icon | Resolved v1.7.1 (`//` slash icon) |
