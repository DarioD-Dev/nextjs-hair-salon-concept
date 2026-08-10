*[Diese Seite auf Deutsch](README.de.md)*

# Salon Kupferglanz — Hair Salon (Concept)

A fictional concept site for a Vienna hair salon, built as a fully responsive multi-page Next.js frontend. Unlike a single-scroll landing page, this is structured the way a real salon site should be: a browsable team page with individual stylist portfolios, a linkable service price list, a gallery, and contact details.

> This is a concept/portfolio project. "Salon Kupferglanz" is a fictional business — the stylists, prices, and reviews are invented, and there is no real booking system behind it.

## Concept

Research into real Vienna salon sites found two recurring gaps: most either run an outdated, text-heavy page, or outsource booking entirely to a third-party platform, sending visitors away from their own brand mid-visit. The strongest international salon sites, by contrast, all lead with **individual stylist profiles** — letting clients pick a person, not just a shop. That's the differentiator this concept builds on.

The whole palette is a single idea: **copper in two states.** Raw, polished copper (`#B87333`) carries the accent; oxidized copper — verdigris patina (`#007979` / `#24B1B1`) — carries the surfaces and secondary text.

## Features

- Multi-page routing (home, team, services, gallery, contact) — not a one-page scroller
- Individual stylist profiles with their own mini portfolio and specialties
- Categorized service price list (women's, men's, color, treatments)
- German/English UI via `next-intl`, with localized routes (`/de/leistungen`, `/en/services`)
- Light and dark theme — dark is the default here, matching the salon's editorial mood
- Fully responsive (mobile, tablet, desktop)

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- React 19 + TypeScript
- Tailwind CSS v4 with a three-layer design-token system
- [next-intl](https://next-intl.dev/) for internationalization
- [next-themes](https://github.com/pacocoursey/next-themes) for theme switching
- [Motion](https://motion.dev/) for interaction details

## Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Credits

Photography from [Unsplash](https://unsplash.com/license) — see [`public/CREDITS.md`](public/CREDITS.md).
