import { useState, useMemo } from 'react'
import { usePriceData } from './hooks/usePriceData'
import { Header } from './components/Header'
import { PriceChart } from './components/PriceChart'
import { ItemToggle } from './components/ItemToggle'
import { StatsCards } from './components/StatsCards'
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
    <div className="min-h-screen bg-concrete-dark">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Chart */}
        <div className="bg-concrete-gray rounded-lg p-4 shadow-lg">
          <PriceChart items={sortedItems} visibleSlugs={visibleSlugs} />
        </div>

        {/* Toggle buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
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

        {/* Stats */}
        <div className="mt-12">
          <StatsCards items={items} />
        </div>
      </main>

      <Footer />
    </div>
  )
}
