import { useState, useMemo } from 'react'
import { usePriceData } from './hooks/usePriceData'
import { Header } from './components/Header'
import { PriceChart } from './components/PriceChart'
import { ItemToggle } from './components/ItemToggle'
import { Footer } from './components/Footer'

export default function App() {
  const { data: items, loading, error } = usePriceData()
  const [visibleSlugs, setVisibleSlugs] = useState<Set<string>>(
    new Set(['costco-hotdog', 'big-mac', 'minimum-wage', 'gold'])
  )

  const sortedItems = useMemo(() => {
    const order = ['costco-hotdog', 'big-mac', 'minimum-wage', 'gold']
    return [...items].sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug))
  }, [items])

  const toggleItem = (slug: string) => {
    setVisibleSlugs((prev) => {
      const next = new Set(prev)
      if (next.has(slug)) {
        next.delete(slug)
      } else {
        next.add(slug)
      }
      return next
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-concrete-dark flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🌭</div>
          <p className="font-mono text-receipt-white">Loading prices...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-concrete-dark flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="text-6xl mb-4">😢</div>
          <p className="font-mono text-costco-red mb-2">Failed to load data</p>
          <p className="font-mono text-receipt-white/60 text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen lg:h-screen bg-concrete-dark flex flex-col lg:overflow-hidden">
      <Header />

      <main className="w-full max-w-[95vw] mx-auto px-4 py-3 flex-1 flex flex-col min-h-0">
        {/* Chart + Toggle buttons row */}
        <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0 w-full">
          {/* Toggle buttons - left side */}
          <div className="flex flex-row lg:flex-col gap-2 lg:gap-3 justify-center lg:justify-start flex-wrap lg:flex-nowrap lg:pr-2 flex-shrink-0 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            {sortedItems
              .filter((item) => item.slug !== 'costco-hotdog')
              .map((item) => (
                <ItemToggle
                  key={item.id}
                  item={item}
                  isActive={visibleSlugs.has(item.slug)}
                  onToggle={() => toggleItem(item.slug)}
                />
              ))}
          </div>

          {/* Chart - right side, takes remaining space */}
          <div className="bg-concrete-gray rounded-lg p-2 lg:p-3 shadow-lg min-w-0 h-[250px] sm:h-[300px] lg:h-auto lg:flex-1 flex flex-col">
            <PriceChart items={sortedItems} visibleSlugs={visibleSlugs} />
          </div>
        </div>

      </main>

      <Footer />
    </div>
  )
}
