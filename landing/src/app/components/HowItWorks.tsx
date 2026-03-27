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
      glow: "rgba(0,229,255,0.45)",
      glowAlt: "rgba(123,97,255,0.2)",
      border: "linear-gradient(135deg, #00E5FF 0%, #7B61FF 60%, #FF2D78 100%)",
    },
    {
      icon: Sparkles,
      number: "02",
      title: "ИИ анализирует снимок",
      description:
        "Нейросеть обрабатывает снимок, выявляет радикулярные кисты и оценивает состояние тканей",
      color: "from-[#7B61FF] to-[#5E4FD6]",
      glow: "rgba(123,97,255,0.45)",
      glowAlt: "rgba(0,229,255,0.2)",
      border: "linear-gradient(135deg, #7B61FF 0%, #00E5FF 50%, #FF2D78 100%)",
    },
    {
      icon: FileCheck,
      number: "03",
      title: "Получите заключение и рекомендации",
      description:
        "Покажите заключения и рекомендации лечащему врачу и составьте совместный план лечения",
      color: "from-[#00E5FF] to-[#7B61FF]",
      glow: "rgba(0,229,255,0.4)",
      glowAlt: "rgba(123,97,255,0.3)",
      border: "linear-gradient(135deg, #FF2D78 0%, #7B61FF 50%, #00E5FF 100%)",
    },
  ];

  return (
    <section id="how-it-works" className="relative py-24 overflow-hidden">
      <style>{`
        @keyframes stepEntrance {
          0%   { box-shadow: 0 0 0px rgba(0,229,255,0), 0 0 0px rgba(123,97,255,0); opacity: 0.6; }
          45%  { box-shadow: 0 0 22px var(--step-glow), 0 0 38px var(--step-glow-alt); opacity: 1; }
          75%  { box-shadow: 0 0 10px var(--step-glow), 0 0 20px var(--step-glow-alt); }
          100% { box-shadow: 0 0 12px var(--step-glow), 0 0 24px var(--step-glow-alt); opacity: 1; }
        }
        .neon-step-wrap {
          padding: 1.5px;
          border-radius: 24px;
          animation: stepEntrance 0.8s ease-out forwards;
          transition: transform 0.22s cubic-bezier(.4,0,.2,1), box-shadow 0.22s cubic-bezier(.4,0,.2,1), filter 0.22s;
        }
        .neon-step-wrap:hover {
          transform: translateY(-6px) scale(1.02);
          filter: brightness(1.06);
        }
        .neon-step-inner {
          border-radius: 22px;
          background: rgba(255,255,255,0.90);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          position: relative;
          overflow: hidden;
          height: 100%;
          transition: background 0.22s;
        }
        .neon-step-inner::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 22px;
          background: linear-gradient(160deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.04) 55%, rgba(0,229,255,0.04) 100%);
          pointer-events: none;
        }
        .neon-step-wrap:hover .neon-step-inner {
          background: rgba(255,255,255,0.97);
        }
      `}</style>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0B3C5D] mb-4">
            Как это работает
          </h2>
          <p className="text-lg text-[#0B3C5D]/70 max-w-2xl mx-auto">
            Всего три простых шага отделяют вас от профессионального ИИ-анализа
          </p>
        </div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connection line */}
              <div className="hidden lg:block absolute top-24 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-[#00E5FF]/40 to-transparent z-10" />

              <div
                className="neon-step-wrap h-full"
                style={{
                  background: step.border,
                  boxShadow: `0 0 12px ${step.glow}, 0 0 24px ${step.glowAlt}`,
                  // @ts-ignore
                  "--step-glow": step.glow,
                  "--step-glow-alt": step.glowAlt,
                  animationDelay: `${index * 0.18}s`,
                }}
              >
                <div className="neon-step-inner p-8">
                  <div className="relative space-y-6">
                    {/* Step Number */}
                    <div className="absolute -top-2 -right-2 text-6xl font-bold text-[#0B3C5D]/5">
                      {step.number}
                    </div>

                    {/* Content first */}
                    <div className="space-y-3 pr-20 pt-2">
                      <h3 className="text-xl font-bold text-[#0B3C5D]">
                        {step.title}
                      </h3>
                      <p className="text-[#0B3C5D]/70 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Icon in bottom-right */}
                    <div className="absolute right-0 bottom-6">
                      <div
                        className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} p-[2px]`}
                        style={{ boxShadow: `0 0 14px ${step.glow}` }}
                      >
                        <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center">
                          <step.icon
                            className="w-8 h-8 text-[#0B3C5D]"
                            strokeWidth={2}
                          />
                        </div>
                        {/* Icon glow */}
                        <div
                          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} opacity-20 blur-xl group-hover:opacity-40 transition-opacity`}
                        />
                      </div>
                    </div>
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
