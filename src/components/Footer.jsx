export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-brand-pink/35 backdrop-blur-xl pt-10 sm:pt-14 pb-10 sm:pb-14">
      <div className="container">
        <div className="flex flex-col items-center gap-6 text-center">
          <a href="#home" className="flex items-center gap-2.5">
            <span className="h-9 w-9 rounded-full bg-gradient-primary text-white flex items-center justify-center shadow-[0_10px_30px_-10px_hsl(0_100%_45%/0.55)]">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 2a2 2 0 0 0-2 2v8" />
                <path d="M15 2a2 2 0 0 1 2 2v8" />
                <path d="M5 13a7 7 0 0 1 14 0" />
                <path d="M12 20v2" />
              </svg>
            </span>
            <span className="font-heading font-bold tracking-tight text-lg text-brand-chocolate">
              Kamakhya<span className="text-primary">Icecream</span>
            </span>
          </a>
          <p className="font-serif italic text-base text-gray-500">Sweet moments, served daily.</p>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Facebook" className="h-10 w-10 rounded-full glass flex items-center justify-center text-primary transition-colors duration-200 hover:text-white hover:bg-gradient-primary">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="h-10 w-10 rounded-full glass flex items-center justify-center text-primary transition-colors duration-200 hover:text-white hover:bg-gradient-primary">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a href="#" aria-label="X (Twitter)" className="h-10 w-10 rounded-full glass flex items-center justify-center text-primary transition-colors duration-200 hover:text-white hover:bg-gradient-primary">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a href="#home" className="text-xs sm:text-sm font-medium text-gray-600 hover:text-primary transition-colors duration-200">Home</a>
            <a href="#flavors" className="text-xs sm:text-sm font-medium text-gray-600 hover:text-primary transition-colors duration-200">Product</a>
            <a href="#about" className="text-xs sm:text-sm font-medium text-gray-600 hover:text-primary transition-colors duration-200">About Us</a>
            <a href="#contact" className="text-xs sm:text-sm font-medium text-gray-600 hover:text-primary transition-colors duration-200">Contact</a>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">© 2026 Kamakhya Icecream. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">Crafted with love in Assam</p>
        </div>
      </div>
    </footer>
  );
}