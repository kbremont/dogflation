import type { ItemWithPrices } from '../types'

interface ItemToggleProps {
  item: ItemWithPrices
  isActive: boolean
  onToggle: () => void
}

export function ItemToggle({ item, isActive, onToggle }: ItemToggleProps) {
  const rotations = [-2, 1, -1, 2]
  const rotation = rotations[item.name.length % rotations.length]

  return (
    <button
      onClick={onToggle}
      className={`
        relative px-4 py-3 min-w-[120px]
        font-oswald text-sm md:text-base
        border-3 border-black
        transition-all duration-200
        hover:scale-105 hover:shadow-lg
        focus:outline-none focus:ring-2 focus:ring-warehouse-blue
        ${isActive
          ? 'bg-price-tag-yellow text-black shadow-[4px_4px_0_#000]'
          : 'bg-concrete-gray text-receipt-white/60 shadow-[2px_2px_0_#000]'
        }
      `}
      style={{
        transform: `rotate(${rotation}deg)`,
        borderWidth: '3px',
      }}
    >
      <div className="text-2xl mb-1">{item.icon}</div>
      <div className="font-bold truncate">{item.name}</div>
      <div className="font-mono text-xs mt-1">
        ${item.latestPrice.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </div>
      {isActive && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-costco-red rounded-full" />
      )}
    </button>
  )
}
