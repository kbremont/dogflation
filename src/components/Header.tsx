export function Header() {
  return (
    <header className="relative overflow-hidden">
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

      <div className="relative z-10 py-8 px-4 text-center">
        <h1 className="font-bebas text-5xl md:text-7xl lg:text-8xl text-receipt-white tracking-wider animate-fade-in">
          DOGFLATION: THE COSTCO CONSTANT
        </h1>

        <p className="font-oswald text-xl md:text-2xl text-price-tag-yellow mt-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <span className="text-3xl">🌭</span> $1.50 SINCE 1985 <span className="text-3xl">🌭</span>
        </p>

        <blockquote className="font-mono text-sm md:text-base text-cardboard-tan mt-4 max-w-2xl mx-auto italic animate-fade-in" style={{ animationDelay: '0.2s' }}>
          "If you raise the price of the f***ing hot dog, I will kill you."
          <footer className="text-receipt-white/60 mt-1 not-italic">— Jim Sinegal, Costco Co-founder</footer>
        </blockquote>
      </div>

      {/* Bottom edge shadow */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-b from-transparent to-concrete-dark" />
    </header>
  )
}
