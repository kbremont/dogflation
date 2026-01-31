import type { ItemWithPrices } from '../types'

interface ItemToggleProps {
  item: ItemWithPrices
  isActive: boolean
  onToggle: () => void
}

export function ItemToggle({ item, isActive, onToggle }: ItemToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`
        relative px-4 py-3 min-w-[120px]
        font-costco text-sm md:text-base
        border-2 rounded
        transition-all duration-200
        hover:scale-105
        focus:outline-none focus:ring-2 focus:ring-costco-blue focus:ring-offset-2 focus:ring-offset-warehouse-white
        ${isActive
          ? 'bg-warehouse-gray border-text-muted text-text-dark shadow-md'
          : 'bg-warehouse-dark border-gray-600 text-text-muted'
        }
      `}
    >
      <div className="text-2xl mb-1">{item.icon}</div>
      <div className="font-bold truncate">{item.name}</div>
      <div className={`font-mono text-lg font-bold mt-1 ${isActive ? 'text-costco-red' : 'text-text-muted'}`}>
        ${item.latestPrice.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </div>
      {isActive && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-costco-red rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">✓</span>
        </div>
      )}
    </button>
  )
}
