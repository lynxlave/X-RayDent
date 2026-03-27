import { useEffect, useState } from "react";
import { NeonButton } from "./ui/NeonButton";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import toothImage from "@/assets/tooth.jpg";

const navLinks = [
  { href: "#how-it-works", label: "Как это работает" },
  { href: "#benefits", label: "Преимущества" },
  { href: "#pricing", label: "Тарифы" },
  { href: "#partners", label: "Партнёры" },
  { href: "#contact", label: "Контакты" },
];

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { protocol, hostname } = window.location;
  const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1";
  const appHost = isLocalhost
    ? `${hostname}:5173`
    : `app.${hostname.replace(/^app\./, "").replace(/^api\./, "")}`;
  const loginUrl = `${protocol}//${appHost}/login`;

  function openLoginSection() {
    window.top?.location.assign(loginUrl);
  }

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#0B3C5D]/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00E5FF] via-[#7B61FF] to-[#00E5FF] opacity-20 blur-sm" />
              <div className="relative w-full h-full rounded-full overflow-hidden bg-white shadow-lg">
                <ImageWithFallback
                  src={toothImage}
                  alt="X-RayDent логотип"
                  className="w-full h-full object-cover scale-100"
                />
              </div>
            </div>
            <span className="text-xl font-bold text-[#0B3C5D]">X-RayDent</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[#0B3C5D]/70 hover:text-[#0B3C5D] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <NeonButton onClick={openLoginSection} variant="primary" size="md">
              <span className="font-semibold text-white">Войти</span>
            </NeonButton>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <NeonButton onClick={openLoginSection} variant="primary" size="md">
              <span className="font-semibold text-white">Войти</span>
            </NeonButton>

            <button
              type="button"
              aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((value) => !value)}
              className="w-10 h-10 rounded-lg bg-[#0B3C5D]/5 hover:bg-[#0B3C5D]/10 transition-colors flex items-center justify-center"
            >
              <svg
                className="w-6 h-6 text-[#0B3C5D]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 rounded-2xl border border-[#0B3C5D]/10 bg-white/95 backdrop-blur-xl shadow-xl shadow-[#0B3C5D]/10 overflow-hidden">
            <div className="flex flex-col p-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="px-4 py-3 rounded-xl text-[#0B3C5D] hover:bg-[#0B3C5D]/5 transition-colors"
                >
                  {link.label}
                </a>
              ))}

            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
