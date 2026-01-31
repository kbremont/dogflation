import type { ItemWithPrices } from '../types'

interface StatsCardsProps {
  items: ItemWithPrices[]
}

export function StatsCards({ items }: StatsCardsProps) {
  const hotdog = items.find((i) => i.slug === 'costco-hotdog')
  const wage = items.find((i) => i.slug === 'minimum-wage')

  const yearsUnchanged = hotdog
    ? new Date().getFullYear() - new Date(hotdog.prices[0]?.date ?? new Date()).getFullYear()
    : 40

  const stats = [
    {
      value: `${yearsUnchanged}`,
      unit: 'YEARS',
      label: 'Same price',
      sublabel: 'since 1985',
      color: 'text-costco-red',
    },
    {
      value: wage ? `${Math.round(wage.percentChange)}%` : '293%',
      unit: '',
      label: 'Wage increase',
      sublabel: 'nat\'l avg minimum',
      color: 'text-wage-green',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 px-4 max-w-4xl mx-auto">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="bg-concrete-gray border-2 border-concrete-dark p-6 text-center animate-slide-up"
          style={{
            animationDelay: `${0.3 + index * 0.1}s`,
            boxShadow: '4px 4px 0 rgba(0,0,0,0.3)',
          }}
        >
          <div className={`font-bebas text-4xl md:text-5xl ${stat.color}`}>
            {stat.value}
            <span className="text-2xl">{stat.unit}</span>
          </div>
          <div className="font-oswald text-receipt-white text-lg mt-2">
            {stat.label}
          </div>
          <div className="font-mono text-xs text-cardboard-tan mt-1">
            {stat.sublabel}
          </div>
        </div>
      ))}
    </div>
  )
}
