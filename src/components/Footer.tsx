export function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Corrugated metal texture */}
      <div
        className="absolute inset-0"
        style={{
          background: `repeating-linear-gradient(
            90deg,
            #2a2a2a 0px,
            #3a3a3a 2px,
            #2a2a2a 4px
          )`,
        }}
      />

      {/* Top edge shadow */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-t from-transparent to-concrete-dark" />

      <div className="relative z-10 py-3 px-4 text-center">
        <p className="font-mono text-xs text-cardboard-tan">
          Data sources: The Economist Big Mac Index • FRED/DOL • World Bank
        </p>
        <p className="font-mono text-xs text-receipt-white/40 mt-2">
          Keeping it $1.50 since 1985
        </p>
      </div>
    </footer>
  )
}
