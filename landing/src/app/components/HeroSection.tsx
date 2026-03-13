import { Play } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B3C5D]/5 via-white to-[#7B61FF]/5" />

      <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Text Content */}
          <div className="space-y-8 z-10">
            {/* Logo */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#00E5FF]/10 to-[#7B61FF]/10 border border-[#00E5FF]/20">
              <div className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
              <span className="text-sm font-medium text-[#0B3C5D]">
                X-РайДент ИИ-ассистент
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-3xl lg:text-5xl font-bold leading-tight text-[#0B3C5D]">
                Получите здесь и сейчас заключение по
                ортопантомограмме за{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] bg-clip-text text-transparent">
                    2 минуты
                  </span>
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-gradient-to-r from-[#00E5FF]/20 to-[#7B61FF]/20 blur-sm" />
                </span>{" "}
                с помощью ИИ-ассистента
              </h1>

              <p className="text-lg lg:text-xl text-[#0B3C5D]/70 leading-relaxed">
                X-РайДент помогает частным стоматологам,
                клиникам и рентген диагностическим лабораториям
                автоматически анализировать ортопантомограммы,
                выявлять радикулярные кисты, оценивать их
                размер, локализацию и степень вовлечения корня
                зуба
              </p>
              <p className="text-lg lg:text-xl text-[#0B3C5D]/70 leading-relaxed">
                C нами стоматологи быстрее и увереннее принимают
                решения при составлении плана лечения
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent("openContactForm"),
                  )
                }
                className="group relative px-8 py-4 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#00E5FF]/50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#00E5FF] to-[#00B8D4]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 font-semibold text-white flex items-center gap-2">
                  Оставить заявку
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </button>

              <button className="group px-8 py-4 rounded-2xl border-2 border-[#0B3C5D]/20 hover:border-[#00E5FF] transition-all duration-300 hover:shadow-lg hover:shadow-[#00E5FF]/20 bg-white/50 backdrop-blur-sm">
                <span className="font-semibold text-[#0B3C5D] flex items-center gap-2">
                  <Play className="w-5 h-5 group-hover:text-[#00E5FF] transition-colors" />
                  Посмотреть как это работает
                </span>
              </button>
            </div>
          </div>

          {/* Right - Hero Image */}
          <div className="relative lg:h-[600px] order-first lg:order-last">
            {/* Glowing background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/20 to-[#7B61FF]/20 rounded-3xl blur-3xl" />

            <div className="relative h-full rounded-3xl overflow-hidden border border-[#00E5FF]/20 shadow-2xl shadow-[#0B3C5D]/10">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1657470179441-c69861f0f748?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50aXN0JTIwY29tcHV0ZXIlMjBkZW50YWwlMjB4cmF5JTIwbW9kZXJuJTIwY2xpbmljfGVufDF8fHx8MTc3MjIwMDM2MXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Стоматолог работает с AI-анализом"
                className="w-full h-full object-cover"
              />

              {/* AI Overlay Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B3C5D]/80 via-transparent to-transparent" />

              {/* AI Analysis Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 rounded-full bg-[#00E5FF] animate-pulse shadow-lg shadow-[#00E5FF]/50" />
                  <span className="text-white font-semibold">
                    AI-анализ завершён
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-white/60 mb-1">
                      Время анализа
                    </div>
                    <div className="text-[#00E5FF] font-bold text-xl">
                      1:47
                    </div>
                  </div>
                  <div>
                    <div className="text-white/60 mb-1">
                      Точность
                    </div>
                    <div className="text-[#7B61FF] font-bold text-xl">
                      96%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}