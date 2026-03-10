# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (localhost:3000)
npm run build     # Production build
npm run lint      # ESLint check
npm run start     # Start production server
```

No test suite is currently set up.

## Architecture

**Stack:** Next.js 16 App Router · React 19 · TypeScript · Tailwind v4 · shadcn/ui · framer-motion

**Key structure:**
- `src/app/layout.tsx` — Root layout with font variables, full SEO metadata, and 3 JSON-LD schemas (ProfessionalService, WebSite, FAQPage)
- `src/app/page.tsx` — Single `"use client"` monolith containing all 10 page sections (Nav, Hero, About, Services, Products, Stats, Why Us, Tech Stack, Founder, Contact, Footer) plus FloatingDotNav
- `src/components/ui/` — Reusable UI components (all from 21st.dev or custom)
- `src/app/sitemap.ts` and `robots.ts` — SEO route handlers
- `src/lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)

**Critical architectural note:** `page.tsx` is a single client component. Any future SSR split must move server-safe sections out of this file. This is a known TODO.

**Hero background:** Vanta.NET (Three.js) loaded from CDN via `<Script>` tags. This runs client-side only with a `useEffect` cleanup.

**Hydration pitfall:** Never use `Math.random()` at render time in components. Always put randomness in `useEffect` (see `grid-feature-cards.tsx` for the pattern).

## Design System

- **Background:** `#080808`
- **Accent:** `#c0392b` (crimson) — used for icons, hover borders, dividers, dots
- **Text:** `#f5f5f5` (primary), `#999999` (secondary)
- **Fonts:** `--font-bebas-neue` (display/headings), `--font-dm-sans` (body), `--font-space-mono` (mono)
- **Mode:** Always dark (`html.dark`); no light mode

## Environment Variables

```
NEXT_PUBLIC_BOOKING_URL   # CTA booking link — used in Nav, Hero, Contact sections
```

Define in `.env.local`. Falls back to `mailto:mkulkarni.work@gmail.com` in some places.

## Content Guidelines

- **Employer name policy:** "Embrace Home Loans" appears only in the founder bio. All brand/positioning copy uses "top US mortgage lender".
- **Brand messaging pillars:** (1) Data → competitive advantage, (2) AI pair programming with human judgment leading, (3) Best practices built in proactively
- **Yuga Odysseys** is a scenario-based platform ("Challenge. Decide. Grow.") — not a quiz or game
- Imaginator Chat is hidden pending rebuild
