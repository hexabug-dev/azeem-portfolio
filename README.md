# Azeem Gbadamosi — Portfolio

Rebuilt from [azeemolawale.com](https://www.azeemolawale.com) as editable, self-hosted source: Next.js (App Router) + TypeScript + Tailwind CSS + framer-motion, ready to deploy to Vercel.

## Structure

- `src/lib/data.ts` — all content (case studies, playground projects, blog posts, testimonials). Edit this file to change copy without touching components.
- `src/components/Sidebar.tsx` / `MobileNav.tsx` — the left icon nav (desktop) and bottom tab bar (mobile).
- `src/components/Reveal.tsx` — scroll-triggered fade/slide-in wrapper used across every page.
- `src/components/CaseStudyCard.tsx` — the hover-zoom project card used on Home and the case studies list.
- `src/app/User-Experience-Interaction-Design/[slug]/page.tsx` — one template that renders every case study from `data.ts`.
- `src/app/blog/[slug]/page.tsx` — same pattern for blog posts.
- `public/images/` — all images downloaded from the original Framer site.

## Run locally

```bash
npm install
npm run dev
```

## Deploy to Vercel

```bash
npx vercel
```
or connect the repo at vercel.com/new — no config needed, it's a standard Next.js app.

## Known gaps vs. the original

- **Contact page "Schedule a call"** button currently links to `#` — set it to your real Calendly/Cal.com link in `src/app/contact/page.tsx`.
- **Contact form** doesn't send anywhere yet — wire it to an email service (Resend, Formspree, etc.) or an API route.
- **"View Full Preview" / "View Copy of UX Audit"** links point to your original Google Drive folder — swap per case study in `data.ts` if you want dedicated links.
- The two "coming soon" case studies (Waqtly, Tallinn Digital Twin) mirror the original's placeholder state.
- The original site's `framer.com/edit` iframe seen while signed in is Framer's own editor overlay, not site content — nothing to replicate there.
