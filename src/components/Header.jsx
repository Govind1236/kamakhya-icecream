export default function Header() {
  return (
    <header className="sticky top-3 sm:top-5 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="backdrop-blur-xl bg-black/40 border border-white/30 px-5 sm:px-8 py-3 rounded-2xl sm:rounded-full shadow-lg shadow-black/10 flex items-center justify-between gap-4">
          <a href="#home" className="flex items-center gap-2.5 shrink-0">
            <img src="/logo.png" alt="Kamakhya Icecream logo" className="h-8 sm:h-9 w-auto object-contain" />
            <span className="font-heading font-bold tracking-tight text-base sm:text-lg text-white">
              Kamakhya<span className="text-primary">Icecream</span>
            </span>
          </a>
          <div className="hidden md:flex items-center gap-7 lg:gap-9">
            <a href="#home" className="text-sm font-medium text-white/80 hover:text-white transition-colors duration-200">Home</a>
            <a href="#flavors" className="text-sm font-medium text-white/80 hover:text-white transition-colors duration-200">Product</a>
            <a href="#about" className="text-sm font-medium text-white/80 hover:text-white transition-colors duration-200">About Us</a>
            <a href="#contact" className="text-sm font-medium text-white/80 hover:text-white transition-colors duration-200">Contact</a>
          </div>
          <a href="#contact" className="bg-primary text-white rounded-full px-4 sm:px-5 h-9 sm:h-10 inline-flex items-center gap-2 font-semibold text-xs sm:text-sm border-none hover:brightness-110 hover:shadow-xl hover:shadow-brand-red/25 transition-all duration-300">
            Order Now
          </a>
        </nav>
      </div>
    </header>
  );
}