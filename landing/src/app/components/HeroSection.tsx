import { Play } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { NeonButton } from "./ui/NeonButton";
import heroImage from "@/assets/9742bc59b87c53901b6ff0067959b04f4a2a99a1.png";

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
              <NeonButton
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent("openContactForm"),
                  )
                }
                variant="primary"
                size="lg"
              >
                <span className="font-semibold text-white flex items-center gap-2">
                  Подключить клинику
                  <svg
                    className="w-5 h-5"
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
              </NeonButton>

              <NeonButton
                onClick={() => window.dispatchEvent(new CustomEvent('openPatientForm'))}
                variant="primary"
                size="lg"
              >
                <span className="font-semibold text-white flex items-center gap-2">
                  Регистрация пациентам
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
              </NeonButton>

              <NeonButton
                onClick={() => {
                  const element = document.getElementById("how-it-works");
                  element?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                variant="secondary"
                size="lg"
              >
                <span className="font-semibold text-[#0B3C5D] flex items-center gap-2">
                  <Play className="w-5 h-5 text-[#00E5FF]" />
                  Посмотреть как это работает
                </span>
              </NeonButton>
            </div>
          </div>

          {/* Right - Hero Image */}
          <div className="relative order-first lg:order-last">
            {/* Glowing background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/20 to-[#7B61FF]/20 rounded-3xl blur-3xl" />

            <div className="relative h-full rounded-3xl overflow-hidden border border-[#00E5FF]/20 shadow-2xl shadow-[#0B3C5D]/10">
              <ImageWithFallback
                src={heroImage}
                alt="Стоматологи работают с AI-анализом"
                className="w-full h-full object-cover"
              />

              {/* AI Overlay Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B3C5D]/80 via-transparent to-transparent" />

              {/* AI Analysis Badge */}
              <div className="absolute bottom-6 left-6 w-[160px] px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
                {/* <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 rounded-full bg-[#00E5FF] animate-pulse shadow-lg shadow-[#00E5FF]/50" />
                  <span className="text-white font-semibold">
                    ИИ-анализ завершён
                  </span>
                </div> */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-white/60 mb-1">
                      Время
                    </div>
                    <div className="text-[#00E5FF] font-bold text-xl">
                      1:47
                    </div>
                  </div>
                  <div>
                    <div className="text-white/60 mb-1">
                      Точность
                    </div>
                    <div className="text-[#00E5FF] font-bold text-xl">
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
