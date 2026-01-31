# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev      # Start Vite dev server with hot reload
npm run build    # TypeScript check + Vite production build
npm run preview  # Preview production build locally
```

## Environment Setup

Copy `.env.example` to `.env.local` and add:
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` - Supabase anon/public key

## Architecture

**Single-page React app** visualizing the Costco hotdog's legendary price stability ($1.50 since 1985) against rising costs of other items.

### Data Flow
1. `usePriceData` hook fetches items and prices from Supabase
2. Prices are transformed to include `percentChange` from baseline (first price point)
3. `PriceChart` renders lines using Visx with special styling for the Costco hotdog line (glow effect, drawn on top)

### Key Design Decisions
- **Visx over Recharts/Chart.js**: Full control over the visualization since the chart IS the product. The hotdog line gets special treatment (thicker, glowing, always on top).
- **Percent change, not absolute prices**: Y-axis shows % change from baseline so disparate values (gold vs hotdog) can be compared meaningfully.
- **ParentSize for responsiveness**: Chart uses `@visx/responsive` ParentSize wrapper to fill available space.

### Custom Tailwind Theme
The app uses a dark "warehouse" theme with Costco brand colors defined in `tailwind.config.ts`:
- `costco-red`, `costco-blue` - brand colors
- `warehouse-white/gray/dark` - dark theme background colors
- Custom `pulse-glow` animation for the hotdog line

## Database

Supabase with two tables:
- `items` - tracked items (name, slug, color, icon)
- `prices` - historical prices (item_id, date, price, source)

### Migrations
Migrations live in `supabase/migrations/`. Auto-deployed to production via GitHub Actions on push to `main`.

```bash
supabase migration new <name>  # Create new migration
# Then push to main to auto-deploy
```

## Git Commit Guidelines

- Do NOT include "Generated with Claude Code" footer
- Do NOT include "Co-Authored-By: Claude" lines
- Keep commit messages focused solely on the changes
