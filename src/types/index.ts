export interface Item {
  id: string
  name: string
  slug: string
  color: string
  icon: string
}

export interface Price {
  id: string
  item_id: string
  date: string
  price: number
  source: string
}

export interface PriceDataPoint {
  date: Date
  price: number
  percentChange: number
}

export interface ItemWithPrices extends Item {
  prices: PriceDataPoint[]
  latestPrice: number
  baselinePrice: number
  percentChange: number
}
