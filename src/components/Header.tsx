export function Header() {
  return (
    <header className="relative overflow-hidden bg-warehouse-dark">
      {/* Costco membership card stripe pattern */}
      <div className="absolute top-0 left-0 right-0 h-3 bg-costco-red" />
      <div className="absolute top-3 left-0 right-0 h-2 bg-costco-blue" />

      <div className="relative z-10 pt-8 pb-4 px-4 text-center">
        {/* Main title in Costco style */}
        <h1 className="font-costco font-black italic text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight animate-fade-in">
          <span className="text-costco-red">DOGFLATION</span>
        </h1>

        <p className="font-costco font-bold text-lg sm:text-xl md:text-2xl text-costco-blue mt-1 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          THE COSTCO CONSTANT
        </p>

        <p className="font-costco font-extrabold text-2xl md:text-3xl text-text-dark mt-3 animate-fade-in" style={{ animationDelay: '0.15s' }}>
          <span className="text-3xl md:text-4xl">🌭</span> $1.50 SINCE 1985 <span className="text-3xl md:text-4xl">🌭</span>
        </p>

        <blockquote className="font-mono text-sm md:text-base text-text-muted mt-3 sm:mt-4 max-w-2xl mx-auto italic animate-fade-in" style={{ animationDelay: '0.2s' }}>
          "If you raise the price of the f***ing hot dog, I will kill you."
          <footer className="text-costco-red mt-1 not-italic font-semibold">— Jim Sinegal, Costco Co-founder</footer>
        </blockquote>
      </div>

      {/* Bottom stripe accent */}
      <div className="h-1 bg-gradient-to-r from-costco-red via-costco-blue to-costco-red" />
    </header>
  )
}
