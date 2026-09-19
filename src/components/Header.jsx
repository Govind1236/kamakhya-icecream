export default function Header() {
  return (
    <header className="sticky top-3 sm:top-5 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="backdrop-blur-xl bg-white px-5 sm:px-8 py-3 rounded-2xl sm:rounded-full border border-brand-pink/30 shadow-lg shadow-black/5 flex items-center justify-between gap-4">
          <a href="#home" className="flex items-center gap-2.5 shrink-0">
            <span className="h-9 w-9 rounded-full bg-gradient-primary text-white flex items-center justify-center shadow-[0_10px_30px_-10px_hsl(0_100%_45%/0.55)]">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 2a2 2 0 0 0-2 2v8" />
                <path d="M15 2a2 2 0 0 1 2 2v8" />
                <path d="M5 13a7 7 0 0 1 14 0" />
                <path d="M12 20v2" />
              </svg>
            </span>
            <span className="font-heading font-bold tracking-tight text-base sm:text-lg text-brand-chocolate">
              Kamakhya<span className="text-primary">Icecream</span>
            </span>
          </a>
          <div className="hidden md:flex items-center gap-7 lg:gap-9">
            <a href="#home" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors duration-200">Home</a>
            <a href="#flavors" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors duration-200">Product</a>
            <a href="#about" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors duration-200">About Us</a>
            <a href="#contact" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors duration-200">Contact</a>
          </div>
          <a href="#contact" className="bg-primary text-white rounded-full px-4 sm:px-5 h-9 sm:h-10 inline-flex items-center gap-2 font-semibold text-xs sm:text-sm border-none hover:brightness-110 hover:shadow-xl hover:shadow-brand-red/25 transition-all duration-300">
            Order Now
          </a>
        </nav>
      </div>
    </header>
  );
}