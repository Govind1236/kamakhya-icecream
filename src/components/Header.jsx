export default function Header() {
  return (
    <header className="sticky top-3 sm:top-5 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="backdrop-blur-xl bg-black/60 border border-white/20 px-5 sm:px-8 py-3 rounded-2xl sm:rounded-full shadow-lg shadow-black/30 flex items-center justify-between gap-4">
          <a href="#home" className="flex items-center gap-2.5 shrink-0">
            <img src="/logo.png" alt="Kamakhya Icecream logo" className="h-10 sm:h-11 w-auto object-contain drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]" />
            <span style={{ color: "#ffffff" }} className="font-heading text-lg sm:text-xl font-extrabold tracking-tight whitespace-nowrap [text-shadow:0_2px_10px_rgba(0,0,0,0.55)]">
              Kamakhya <span className="text-brand-red">Icecream</span>
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
