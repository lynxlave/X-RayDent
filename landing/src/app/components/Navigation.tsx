import { NeonButton } from "./ui/NeonButton";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Navigation() {
  const { protocol, hostname } = window.location;
  const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1";
  const appHost = isLocalhost ? `${hostname}:5173` : `app.${hostname.replace(/^app\./, "").replace(/^api\./, "")}`;
  const loginUrl = `${protocol}//${appHost}/login#system-login`;

  function openLoginSection() {
    window.top?.location.assign(loginUrl);
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#0B3C5D]/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00E5FF] via-[#7B61FF] to-[#00E5FF] opacity-20 blur-sm" />
              <div className="relative w-full h-full rounded-full overflow-hidden bg-white shadow-lg ring-2 ring-gradient-to-br from-[#00E5FF]/40 to-[#7B61FF]/40">
                <ImageWithFallback
                  src="https://i.ibb.co/7WBvSYG/dJ5MNHGd.png"
                  alt="X-RayDent логотип"
                  className="w-full h-full object-contain p-1"
                />
              </div>
            </div>
            <span className="text-xl font-bold text-[#0B3C5D]">X-RayDent</span>
          </div>

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
              href="#pricing"
              className="text-[#0B3C5D]/70 hover:text-[#0B3C5D] transition-colors"
            >
              Тарифы
            </a>
            <a
              href="#partners"
              className="text-[#0B3C5D]/70 hover:text-[#0B3C5D] transition-colors"
            >
              Партнёры
            </a>
            <a
              href="#contact"
              className="text-[#0B3C5D]/70 hover:text-[#0B3C5D] transition-colors"
            >
              Контакты
            </a>
          </div>

          <NeonButton onClick={openLoginSection} variant="primary" size="md">
            <span className="font-semibold text-white">Войти</span>
          </NeonButton>

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
