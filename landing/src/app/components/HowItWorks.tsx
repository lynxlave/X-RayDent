import { Upload, Sparkles, FileCheck } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      number: "01",
      title: "Загрузите ортопантомограмму",
      description:
        "Просто загрузите ортопантомограмму и информированное добровольное согласие",
      color: "from-[#00E5FF] to-[#00B8D4]",
    },
    {
      icon: Sparkles,
      number: "02",
      title: "ИИ анализирует снимок",
      description:
        "Нейросеть обрабатывает снимок, выявляет радикулярные кисты и оценивает состояние тканей",
      color: "from-[#7B61FF] to-[#5E4FD6]",
    },
    {
      icon: FileCheck,
      number: "03",
      title: "Получите заключение и рекомендации",
      description:
        "Используйте готовый отчёт при составлении плана лечения",
      color: "from-[#00E5FF] to-[#7B61FF]",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="relative py-24 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B3C5D]/5 via-white to-[#7B61FF]/5" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00E5FF]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#7B61FF]/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0B3C5D] mb-4">
            Как это работает
          </h2>
          <p className="text-lg text-[#0B3C5D]/70 max-w-2xl mx-auto">
            Всего три простых шага отделяют вас от
            профессионального ИИ-анализа
          </p>
        </div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-24 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-[#00E5FF]/30 to-transparent" />
              )}

              <div className="relative p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-[#0B3C5D]/10 hover:border-[#00E5FF]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#00E5FF]/20 hover:-translate-y-2 h-full">
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#00E5FF]/5 to-[#7B61FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative space-y-6">
                  {/* Step Number */}
                  <div className="absolute -top-4 -right-4 text-6xl font-bold text-[#0B3C5D]/5">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div
                    className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} p-[2px]`}
                  >
                    <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center">
                      <step.icon
                        className="w-8 h-8 text-[#0B3C5D]"
                        strokeWidth={2}
                      />
                    </div>
                    {/* Glow */}
                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} opacity-20 blur-xl group-hover:opacity-40 transition-opacity`}
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-[#0B3C5D]">
                      {step.title}
                    </h3>
                    <p className="text-[#0B3C5D]/70 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}