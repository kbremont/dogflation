# Dogflation 🌭

A single-page web app visualizing the legendary stability of the Costco hotdog price ($1.50 since 1985) compared to the rising cost of everything else.

## The Premise

In 1985, Costco set the price of their hot dog + soda combo at $1.50. Nearly 40 years later, it's still $1.50. Meanwhile, everything else has gotten more expensive. This app visualizes that contrast.

## Tech Stack

| Layer | Technology | Why |
|-------|------------|-----|
| **Frontend** | React + Vite | Fast development, hot reload, modern tooling |
| **Language** | TypeScript | Type safety, better IDE support |
| **Styling** | Tailwind CSS | Utility-first, rapid prototyping |
| **Charts** | Visx | Full creative control over visualizations (see below) |
| **Backend** | Supabase | Managed Postgres, simple queries, generous free tier |
| **Hosting** | Vercel or Netlify | Free static hosting, easy deploys |

## Why Visx for Charts?

The visualization *is* the product. We considered several options:

| Library | Verdict |
|---------|---------|
| **Recharts** | Easy to use, but limited animation control and basic styling |
| **Chart.js** | Canvas-based, less crisp on retina, React wrapper feels bolted-on |
| **Nivo** | Beautiful defaults, but opinionated - charts look like "Nivo charts" |
| **Visx** | ✅ Full control over every pixel, animation, and interaction |

Visx (by Airbnb) gives us low-level D3 primitives in React. This means:

- **Visual storytelling**: The Costco line can be styled distinctly (thicker, glowing, rock-solid) while other lines animate in
- **Custom interactions**: Tooltips, hover states, and click behaviors exactly as we want them
- **Smaller bundle**: Import only what we use
- **Memorable result**: The final product feels custom-built, not "made with a chart library"

## Data Sources

Historical price comparisons:
- 🌭 **Costco Hotdog** - $1.50 (flat line since 1985)
- ⛽ **Gas** - Average US gas price per gallon
- 🏠 **Home Prices** - Median US home sale price
- 🎬 **Movie Ticket** - Average US ticket price
- 🍔 **Big Mac Index** - The Economist's data
- 💵 **Minimum Wage** - Federal minimum wage over time

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Supabase URL and publishable key

# Run development server
npm run dev
```

## Environment Variables

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

## Project Structure

```
src/
├── components/
│   ├── PriceChart.tsx    # Main Visx visualization
│   ├── ItemSelector.tsx  # Toggle items on/off
│   └── Header.tsx        # App header and description
├── hooks/
│   └── usePriceData.ts   # Fetch data from Supabase
├── lib/
│   └── supabase.ts       # Supabase client
├── types/
│   └── index.ts          # TypeScript types
├── App.tsx
└── main.tsx
```

## Database Schema

```sql
-- Items being tracked
CREATE TABLE items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  color TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Historical prices
CREATE TABLE prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id UUID REFERENCES items(id),
  date DATE NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  UNIQUE(item_id, date)
);
```

## CI/CD

Database migrations are automatically applied via GitHub Actions when changes are pushed to `main`.

**Workflow:** `.github/workflows/supabase.yml`

**Required GitHub Secrets:**

| Secret | Description |
|--------|-------------|
| `SUPABASE_ACCESS_TOKEN` | Personal access token from supabase.com → Account → Access Tokens |
| `SUPABASE_PROJECT_REF` | Project reference ID from Project Settings → General |

**Adding a new migration:**

```bash
# Create a new migration file
supabase migration new my_migration_name

# Edit the generated file in supabase/migrations/

# Push to main - GitHub Actions will apply it automatically
git add . && git commit -m "Add migration" && git push
```
