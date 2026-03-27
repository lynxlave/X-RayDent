import {
  Activity,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import optgImage from "@/assets/OPTG.jpg";

export function AIInterface() {
  return (
    <section
      id="technology"
      className="relative py-24 overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0B3C5D] mb-4">
            Результаты ИИ-анализа
          </h2>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/20 to-[#7B61FF]/20 rounded-3xl blur-3xl" />

          <div className="relative rounded-3xl overflow-hidden border-2 border-[#00E5FF]/30 shadow-2xl shadow-[#0B3C5D]/20 bg-gradient-to-br from-[#0B3C5D] to-[#0B3C5D]/90">
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

            <div className="grid lg:grid-cols-2 gap-8 p-8">
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
                  <ImageWithFallback
                    src={optgImage}
                    alt="Dental X-ray"
                    className="w-full h-full object-cover opacity-80"
                  />

                  <div className="absolute inset-0">
                    <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent animate-scan" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-white font-semibold">
                  Результаты анализа
                </h3>

                <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle2 className="w-6 h-6 text-[#00E5FF]" />
                    <span className="text-white font-semibold text-lg">
                      Анализ завершён
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/80 text-sm">
                          Вероятность радикулярной кисты
                        </span>
                        <span className="text-[#00E5FF] font-bold text-xl">
                          87%
                        </span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-[87%] bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 space-y-3">
                  <div className="flex items-center gap-2 text-white font-semibold mb-3">
                    <AlertCircle className="w-5 h-5 text-[#7B61FF]" />
                    Заключение
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                      <div className="w-2 h-2 rounded-full bg-[#00E5FF] mt-2" />
                      <div className="flex-1">
                        <div className="text-white text-sm font-medium">
                          Зуб 46
                        </div>
                        <div className="text-white/60 text-xs">
                          Радикулярная киста нижней челюсти справа
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
                          Зуб 37
                        </div>
                        <div className="text-white/60 text-xs">
                          Радикулярная киста нижней челюсти слева
                        </div>
                      </div>
                      <span className="text-[#7B61FF] text-xs font-medium">
                        81%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#00E5FF]/20 to-[#7B61FF]/20 backdrop-blur-xl border border-[#00E5FF]/30">
                  <div className="flex items-start gap-3">
                    <Activity className="w-5 h-5 text-[#00E5FF] flex-shrink-0 mt-1" />
                    <div className="space-y-1">
                      <div className="text-white font-semibold">
                        Рекомендация
                      </div>
                      <div className="text-white/80 text-sm">
                        Консультация врача-стоматолога-хирурга с целью удаления зубов и решения вопроса о дальнейшей дентальной имплантации
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

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
