export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-warehouse-dark">
      {/* Top stripe accent (like receipt divider) */}
      <div className="h-1 bg-costco-red" />

      <div className="relative z-10 py-3 px-4 text-center">
        <p className="font-mono text-xs text-text-muted">
          Data sources: The Economist Big Mac Index • FRED/DOL • World Bank
        </p>
        <p className="font-costco font-bold text-sm text-costco-blue mt-2">
          Thank you for shopping at Dogflation
        </p>
        <p className="font-mono text-xs text-text-muted mt-1">
          Keeping it $1.50 since 1985
        </p>
      </div>

      {/* Bottom stripe */}
      <div className="h-2 bg-costco-blue" />
    </footer>
  )
}
