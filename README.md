_[Diese Seite auf Deutsch](README.de.md)_

# Salon Kupferglanz — Hair Salon (Concept)

A fictional concept site for a Vienna hair salon, built as a fully responsive multi-page Next.js frontend. Unlike a single-scroll landing page, this is structured the way a real salon site should be: a browsable team page with individual stylist portfolios, a linkable service price list, and contact details.

> This is a concept/portfolio project. "Salon Kupferglanz" is a fictional business — the stylists, prices, and reviews are invented, and there is no real booking system behind it.

## Concept

Research into real Vienna salon sites found two recurring gaps: most either run an outdated, text-heavy page, or outsource booking entirely to a third-party platform, sending visitors away from their own brand mid-visit. The strongest international salon sites, by contrast, all lead with **individual stylist profiles** — letting clients pick a person, not just a shop. That's the differentiator this concept builds on.

The whole palette is a single idea: **copper in two states.** Raw, polished copper (`#B87333`) carries the accent; oxidized copper — verdigris patina (`#007979` / `#24B1B1`) — carries the surfaces and secondary text.

## Features

- Multi-page routing (home, team, services, contact) — not a one-page scroller
- Individual stylist profiles with their own mini portfolio and specialties
- Categorized service price list (women's, men's, color, treatments), with FAQ addressing first-visit objections directly below it
- German/English UI via `next-intl`, with localized routes (`/de/leistungen`, `/en/services`)
- Dark, editorial theme — no light mode, by design, to match the salon's mood
- Fully responsive (mobile, tablet, desktop), with a sticky call/booking bar on mobile
- Monochrome photography with a colour reveal on hover, so a mixed color/B&W source set (see `public/CREDITS.md`) still reads as one consistent look

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- React 19 + TypeScript
- Tailwind CSS v4 with a three-layer design-token system
- [next-intl](https://next-intl.dev/) for internationalization
- [Resend](https://resend.com/) for the contact form (optional — see below)

## Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Contact form email delivery

Without any setup, the contact form validates properly but only logs the message to the server console — nothing is silently lost, but nothing is emailed either. To make it actually send:

1. Create a free [Resend](https://resend.com/) account and API key.
2. Add to `.env.local`: `RESEND_API_KEY=re_...`
3. Optionally set `CONTACT_FROM_EMAIL` once a verified sending domain exists (defaults to Resend's shared test address).

Messages go to `SALON.email` (`src/data/salon.ts`), with the visitor's address set as reply-to.

## Credits

Photography from [Unsplash](https://unsplash.com/license) — see [`public/CREDITS.md`](public/CREDITS.md).
