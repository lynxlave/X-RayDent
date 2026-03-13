export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#0B3C5D]/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00E5FF] to-[#7B61FF] flex items-center justify-center shadow-lg shadow-[#00E5FF]/20">
              <span className="text-white font-bold text-xl">
                X
              </span>
            </div>
            <span className="text-xl font-bold text-[#0B3C5D]">
              X-РайДент
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#how-it-works"
              className="text-[#0B3C5D]/70 hover:text-[#0B3C5D] transition-colors"
            >
              Как это работает
            </a>
            <a
              href="#benefits"
              className="text-[#0B3C5D]/70 hover:text-[#0B3C5D] transition-colors"
            >
              Преимущества
            </a>
            <a
              href="#technology"
              className="text-[#0B3C5D]/70 hover:text-[#0B3C5D] transition-colors"
            >
              Технология
            </a>
            <a
              href="#contact"
              className="text-[#0B3C5D]/70 hover:text-[#0B3C5D] transition-colors"
            >
              Контакты
            </a>
          </div>

          {/* CTA Button */}
          <button
            onClick={() =>
              window.dispatchEvent(
                new CustomEvent("openContactForm"),
              )
            }
            className="group relative px-6 py-3 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#00E5FF]/30"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#00E5FF] to-[#7B61FF]" />
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            <span className="relative z-10 font-semibold text-white">
              Оставить заявку
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button className="md:hidden w-10 h-10 rounded-lg bg-[#0B3C5D]/5 hover:bg-[#0B3C5D]/10 transition-colors flex items-center justify-center">
            <svg
              className="w-6 h-6 text-[#0B3C5D]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}