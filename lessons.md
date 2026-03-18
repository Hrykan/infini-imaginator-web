# Lessons Learned

Corrections and patterns captured during development. Reviewed at session start.

---

### 2026-03-11 — Hydration mismatch from render-time randomness
**Pattern:** Using `Math.random()` at render time in React components causes hydration mismatches (server/client values differ)
**Rule:** ALWAYS put randomness inside `useEffect`, never at render time
**Why:** Next.js SSR renders on server first; random values differ on client rehydration, causing React errors

### 2026-03-11 — Cloudflare proxy breaks Vercel SSL
**Pattern:** Enabling Cloudflare proxy (orange cloud) on DNS records pointing to Vercel causes SSL certificate failures
**Rule:** ALWAYS set `proxied: false` on Vercel-bound DNS records in Cloudflare
**Why:** Double-proxying (Cloudflare → Vercel) breaks Vercel's automatic SSL provisioning; connections fail with certificate errors

### 2026-03-11 — Em dashes in web copy
**Pattern:** Using em dashes (—) in visible content creates awkward reading flow and inconsistent typography
**Rule:** NEVER use em dashes in user-facing copy; use natural punctuation (periods, commas, semicolons)
**Why:** Brand voice decision for cleaner, more approachable text across the site
