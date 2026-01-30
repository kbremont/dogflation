import { useMemo, useCallback } from 'react'
import { ParentSize } from '@visx/responsive'
import { Group } from '@visx/group'
import { LinePath } from '@visx/shape'
import { scaleTime, scaleLinear } from '@visx/scale'
import { AxisBottom, AxisLeft } from '@visx/axis'
import { GridRows } from '@visx/grid'
import { curveMonotoneX } from '@visx/curve'
import { localPoint } from '@visx/event'
import { useTooltip, TooltipWithBounds } from '@visx/tooltip'
import type { ItemWithPrices, PriceDataPoint } from '../types'

interface PriceChartProps {
  items: ItemWithPrices[]
  visibleSlugs: Set<string>
}

interface TooltipData {
  item: ItemWithPrices
  point: PriceDataPoint
}

const margin = { top: 40, right: 110, bottom: 50, left: 70 }

function ChartContent({ items, visibleSlugs, width, height }: PriceChartProps & { width: number; height: number }) {
  const {
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
  } = useTooltip<TooltipData>()

  const visibleItems = useMemo(
    () => items.filter((item) => visibleSlugs.has(item.slug)),
    [items, visibleSlugs]
  )

  const xMax = width - margin.left - margin.right
  const yMax = height - margin.top - margin.bottom

  const allDates = useMemo(
    () => visibleItems.flatMap((item) => item.prices.map((p) => p.date)),
    [visibleItems]
  )

  const allPercentChanges = useMemo(
    () => visibleItems.flatMap((item) => item.prices.map((p) => p.percentChange)),
    [visibleItems]
  )

  const xScale = useMemo(
    () =>
      scaleTime({
        domain: [
          new Date(Math.min(...allDates.map((d) => d.getTime()))),
          new Date(Math.max(...allDates.map((d) => d.getTime()))),
        ],
        range: [0, xMax],
      }),
    [allDates, xMax]
  )

  const yScale = useMemo(
    () =>
      scaleLinear({
        domain: [
          Math.min(0, ...allPercentChanges),
          Math.max(...allPercentChanges) * 1.1,
        ],
        range: [yMax, 0],
        nice: true,
      }),
    [allPercentChanges, yMax]
  )

  const getX = (d: PriceDataPoint) => xScale(d.date)
  const getY = (d: PriceDataPoint) => yScale(d.percentChange)

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<SVGRectElement>) => {
      const point = localPoint(event)
      if (!point) return

      const x = point.x - margin.left
      const date = xScale.invert(x)

      let closestItem: ItemWithPrices | null = null
      let closestPoint: PriceDataPoint | null = null
      let closestDistance = Infinity

      for (const item of visibleItems) {
        for (const p of item.prices) {
          const distance = Math.abs(p.date.getTime() - date.getTime())
          if (distance < closestDistance) {
            closestDistance = distance
            closestItem = item
            closestPoint = p
          }
        }
      }

      if (closestItem && closestPoint) {
        showTooltip({
          tooltipData: { item: closestItem, point: closestPoint },
          tooltipLeft: getX(closestPoint) + margin.left,
          tooltipTop: getY(closestPoint) + margin.top,
        })
      }
    },
    [xScale, visibleItems, showTooltip, getX, getY]
  )

  const hotdogItem = visibleItems.find((i) => i.slug === 'costco-hotdog')

  return (
    <div className="relative">
      <svg width={width} height={height}>
        <defs>
          <filter id="hotdog-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill="#1a1a1a"
          rx={4}
        />

        <Group left={margin.left} top={margin.top}>
          <GridRows
            scale={yScale}
            width={xMax}
            stroke="#3a3a3a"
            strokeDasharray="4,4"
            strokeOpacity={0.5}
          />

          {/* Draw all lines except hot dog first */}
          {visibleItems
            .filter((item) => item.slug !== 'costco-hotdog')
            .map((item) => (
              <LinePath
                key={item.id}
                data={item.prices}
                x={getX}
                y={getY}
                stroke={item.color}
                strokeWidth={2}
                strokeOpacity={0.9}
                curve={curveMonotoneX}
              />
            ))}

          {/* Draw hot dog line last (on top) with special styling */}
          {hotdogItem && (
            <LinePath
              data={hotdogItem.prices}
              x={getX}
              y={getY}
              stroke={hotdogItem.color}
              strokeWidth={4}
              curve={curveMonotoneX}
              filter="url(#hotdog-glow)"
              className="animate-pulse-glow"
            />
          )}

          {/* End labels for each visible item */}
          {visibleItems.map((item) => {
            const lastPoint = item.prices[item.prices.length - 1]
            if (!lastPoint) return null
            return (
              <text
                key={`label-${item.id}`}
                x={getX(lastPoint) + 8}
                y={getY(lastPoint)}
                fill={item.color}
                fontSize={12}
                fontFamily="IBM Plex Mono"
                alignmentBaseline="middle"
              >
                {item.icon} ${item.latestPrice.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </text>
            )
          })}

          <AxisBottom
            top={yMax}
            scale={xScale}
            stroke="#5a5a5a"
            tickStroke="#5a5a5a"
            tickLabelProps={{
              fill: '#999',
              fontSize: 11,
              fontFamily: 'IBM Plex Mono',
              textAnchor: 'middle',
            }}
            numTicks={width > 600 ? 8 : 4}
          />

          <AxisLeft
            scale={yScale}
            stroke="#5a5a5a"
            tickStroke="#5a5a5a"
            tickLabelProps={{
              fill: '#999',
              fontSize: 11,
              fontFamily: 'IBM Plex Mono',
              textAnchor: 'end',
              dx: -4,
            }}
            tickFormat={(value) => `${value}%`}
            numTicks={6}
          />

          {/* Y-axis label */}
          <text
            x={-yMax / 2}
            y={-50}
            transform="rotate(-90)"
            fill="#777"
            fontSize={12}
            fontFamily="IBM Plex Mono"
            textAnchor="middle"
          >
            % change from baseline
          </text>

          {/* Invisible rect for mouse events */}
          <rect
            x={0}
            y={0}
            width={xMax}
            height={yMax}
            fill="transparent"
            onMouseMove={handleMouseMove}
            onMouseLeave={hideTooltip}
          />
        </Group>
      </svg>

      {tooltipOpen && tooltipData && (
        <TooltipWithBounds
          left={tooltipLeft}
          top={tooltipTop}
          style={{
            backgroundColor: '#2D2D2D',
            border: '2px solid #FFD100',
            borderRadius: '4px',
            padding: '8px 12px',
            fontFamily: 'IBM Plex Mono',
            fontSize: '12px',
            color: '#F5F5F0',
            boxShadow: '4px 4px 0 rgba(0,0,0,0.3)',
          }}
        >
          <div className="font-bold" style={{ color: tooltipData.item.color }}>
            {tooltipData.item.icon} {tooltipData.item.name}
          </div>
          <div className="mt-1">
            {tooltipData.point.date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
            })}
          </div>
          <div className="font-bold mt-1">
            ${tooltipData.point.price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </div>
          <div className="text-cardboard-tan text-xs mt-1">
            {tooltipData.point.percentChange >= 0 ? '+' : ''}
            {tooltipData.point.percentChange.toFixed(1)}% from baseline
          </div>
        </TooltipWithBounds>
      )}
    </div>
  )
}

export function PriceChart({ items, visibleSlugs }: PriceChartProps) {
  return (
    <div className="w-full h-[400px] md:h-[500px] lg:h-[550px] animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <ParentSize>
        {({ width, height }) => (
          <ChartContent
            items={items}
            visibleSlugs={visibleSlugs}
            width={width}
            height={height}
          />
        )}
      </ParentSize>
    </div>
  )
}
