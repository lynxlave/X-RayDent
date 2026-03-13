import {
  Activity,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function AIInterface() {
  return (
    <section
      id="technology"
      className="relative py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#0B3C5D]/5 to-white" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0B3C5D] mb-4">
            Результаты ИИ-анализа
          </h2>
        </div>

        {/* AI Interface Mockup */}
        <div className="relative max-w-6xl mx-auto">
          {/* Glow effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/20 to-[#7B61FF]/20 rounded-3xl blur-3xl" />

          <div className="relative rounded-3xl overflow-hidden border-2 border-[#00E5FF]/30 shadow-2xl shadow-[#0B3C5D]/20 bg-gradient-to-br from-[#0B3C5D] to-[#0B3C5D]/90">
            {/* Header Bar */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className="text-white/80 text-sm ml-4">
                  X-РайДент ИИ-ассистент
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
                <span className="text-[#00E5FF] text-sm font-medium">
                  Анализ активен
                </span>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-2 gap-8 p-8">
              {/* Left - X-ray Image */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-semibold">
                    Ортопантомограмма
                  </h3>
                  <span className="text-xs text-white/60">
                    ID: #45892
                  </span>
                </div>

                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#00E5FF]/30 bg-[#0B3C5D]/50">
                  {/* X-ray placeholder */}
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1729870992116-5f1f59feb4ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBwYW5vcmFtaWMlMjB4cmF5JTIwb3BnJTIwc2NhbnxlbnwxfHx8fDE3NzIyMDAzNjF8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Dental X-ray"
                    className="w-full h-full object-cover opacity-80"
                  />

                  {/* AI Detection Overlay */}
                  <div className="absolute inset-0">
                    {/* Detected areas */}
                    <div className="absolute top-1/3 left-1/4 w-24 h-24">
                      <div className="absolute inset-0 border-2 border-[#00E5FF] rounded-lg animate-pulse shadow-lg shadow-[#00E5FF]/50">
                        <div className="absolute -top-8 left-0 bg-[#00E5FF] text-white text-xs px-2 py-1 rounded font-medium">
                          Зона 1
                        </div>
                      </div>
                    </div>

                    <div className="absolute top-1/2 right-1/3 w-20 h-20">
                      <div className="absolute inset-0 border-2 border-[#7B61FF] rounded-lg animate-pulse shadow-lg shadow-[#7B61FF]/50">
                        <div className="absolute -top-8 right-0 bg-[#7B61FF] text-white text-xs px-2 py-1 rounded font-medium">
                          Зона 2
                        </div>
                      </div>
                    </div>

                    {/* Scanning line effect */}
                    <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent animate-scan" />
                  </div>
                </div>
              </div>

              {/* Right - Analysis Results */}
              <div className="space-y-4">
                <h3 className="text-white font-semibold">
                  Результаты анализа
                </h3>

                {/* Status Card */}
                <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle2 className="w-6 h-6 text-[#00E5FF]" />
                    <span className="text-white font-semibold text-lg">
                      Анализ завершён
                    </span>
                  </div>

                  <div className="space-y-4">
                    {/* Probability */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/80 text-sm">
                          Вероятность патологии
                        </span>
                        <span className="text-[#00E5FF] font-bold text-xl">
                          87%
                        </span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-[87%] bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] rounded-full" />
                      </div>
                    </div>

                    {/* Tissue Analysis */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-green-400" />
                          <span className="text-white/60 text-sm">
                            Здоровая ткань
                          </span>
                        </div>
                        <div className="text-white font-bold text-2xl">
                          62%
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-400" />
                          <span className="text-white/60 text-sm">
                            Поражённая ткань
                          </span>
                        </div>
                        <div className="text-white font-bold text-2xl">
                          38%
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detected Issues */}
                <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 space-y-3">
                  <div className="flex items-center gap-2 text-white font-semibold mb-3">
                    <AlertCircle className="w-5 h-5 text-[#7B61FF]" />
                    Обнаруженные патологии
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                      <div className="w-2 h-2 rounded-full bg-[#00E5FF] mt-2" />
                      <div className="flex-1">
                        <div className="text-white text-sm font-medium">
                          Зуб 26
                        </div>
                        <div className="text-white/60 text-xs">
                          Периапикальное воспаление
                        </div>
                      </div>
                      <span className="text-[#00E5FF] text-xs font-medium">
                        93%
                      </span>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                      <div className="w-2 h-2 rounded-full bg-[#7B61FF] mt-2" />
                      <div className="flex-1">
                        <div className="text-white text-sm font-medium">
                          Зуб 36
                        </div>
                        <div className="text-white/60 text-xs">
                          Кариозное поражение
                        </div>
                      </div>
                      <span className="text-[#7B61FF] text-xs font-medium">
                        81%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Recommendation */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#00E5FF]/20 to-[#7B61FF]/20 backdrop-blur-xl border border-[#00E5FF]/30">
                  <div className="flex items-start gap-3">
                    <Activity className="w-5 h-5 text-[#00E5FF] flex-shrink-0 mt-1" />
                    <div className="space-y-1">
                      <div className="text-white font-semibold">
                        Рекомендация
                      </div>
                      <div className="text-white/80 text-sm">
                        Консультация специалиста и
                        дополнительная диагностика для зубов 26
                        и 36
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Stats */}
            <div className="grid grid-cols-3 gap-px bg-white/10 border-t border-white/10">
              <div className="p-6 bg-[#0B3C5D]/50 backdrop-blur-xl text-center">
                <div className="text-[#00E5FF] text-3xl font-bold mb-1">
                  1:47
                </div>
                <div className="text-white/60 text-sm">
                  Время анализа
                </div>
              </div>
              <div className="p-6 bg-[#0B3C5D]/50 backdrop-blur-xl text-center">
                <div className="text-[#7B61FF] text-3xl font-bold mb-1">
                  96%
                </div>
                <div className="text-white/60 text-sm">
                  Точность AI
                </div>
              </div>
              <div className="p-6 bg-[#0B3C5D]/50 backdrop-blur-xl text-center">
                <div className="text-[#00E5FF] text-3xl font-bold mb-1">
                  2
                </div>
                <div className="text-white/60 text-sm">
                  Патологии найдено
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animation for scanning line */}
      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}