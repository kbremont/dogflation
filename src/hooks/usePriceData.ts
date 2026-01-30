import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Item, Price, ItemWithPrices, PriceDataPoint } from '../types'

export function usePriceData() {
  const [data, setData] = useState<ItemWithPrices[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: items, error: itemsError } = await supabase
          .from('items')
          .select('*')
          .order('name')

        if (itemsError) throw itemsError

        const { data: prices, error: pricesError } = await supabase
          .from('prices')
          .select('*')
          .order('date')

        if (pricesError) throw pricesError

        const itemsWithPrices: ItemWithPrices[] = (items as Item[]).map((item) => {
          const itemPrices = (prices as Price[])
            .filter((p) => p.item_id === item.id)
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

          const baselinePrice = itemPrices[0]?.price ?? 0

          const priceDataPoints: PriceDataPoint[] = itemPrices.map((p) => ({
            date: new Date(p.date),
            price: p.price,
            percentChange: baselinePrice > 0
              ? ((p.price - baselinePrice) / baselinePrice) * 100
              : 0,
          }))

          const latestPrice = itemPrices[itemPrices.length - 1]?.price ?? 0
          const percentChange = baselinePrice > 0
            ? ((latestPrice - baselinePrice) / baselinePrice) * 100
            : 0

          return {
            ...item,
            prices: priceDataPoints,
            latestPrice,
            baselinePrice,
            percentChange,
          }
        })

        setData(itemsWithPrices)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}
