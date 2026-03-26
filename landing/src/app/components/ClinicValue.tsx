import {
  Zap,
  TrendingUp,
  Users,
  BarChart3,
} from "lucide-react";
import { NeonButton } from "./ui/NeonButton";

export function ClinicValue() {
  const benefits = [
    {
      icon: Zap,
      title: "Ускорение диагностики",
      description:
        "Сократите время ожидания результатов с нескольких часов до 2 минут и незамедлительно начинайте лечение",
      stats: "12x быстрее",
      color: "from-[#00E5FF] to-[#00B8D4]",
      glow: "rgba(0,229,255,0.45)",
      glowAlt: "rgba(123,97,255,0.2)",
      border: "linear-gradient(135deg, #00E5FF 0%, #7B61FF 60%, #FF2D78 100%)",
    },
    {
      icon: TrendingUp,
      title: "Повышение точности клинических решений",
      description:
        "Используйте ИИ-ассистента для выявления радикулярных кист с точностью 96%, снижая риск невыявленной патологии",
      stats: "96% точность",
      color: "from-[#7B61FF] to-[#5E4FD6]",
      glow: "rgba(123,97,255,0.45)",
      glowAlt: "rgba(0,229,255,0.2)",
      border: "linear-gradient(135deg, #7B61FF 0%, #FF2D78 50%, #00E5FF 100%)",
    },
    {
      icon: Users,
      title: "Помощь в диагностике",
      description:
        "Работайте эффективно даже при отсутствии врача-рентгенолога",
      stats: "24/7 доступность",
      color: "from-[#00E5FF] to-[#7B61FF]",
      glow: "rgba(0,229,255,0.4)",
      glowAlt: "rgba(255,45,120,0.2)",
      border: "linear-gradient(135deg, #FF2D78 0%, #00E5FF 50%, #7B61FF 100%)",
    },
    {
      icon: BarChart3,
      title: "Повышение эффективности работы клиники",
      description:
        "Увеличьте пропускную способность и улучшите качество обслуживания пациентов",
      stats: "+40% пациентов",
      color: "from-[#7B61FF] to-[#00E5FF]",
      glow: "rgba(123,97,255,0.4)",
      glowAlt: "rgba(255,45,120,0.2)",
      border: "linear-gradient(135deg, #00E5FF 0%, #FF2D78 40%, #7B61FF 100%)",
    },
  ];

  return (
    <section id="benefits" className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B3C5D]/5 via-[#7B61FF]/5 to-[#00E5FF]/5" />

      <style>{`
        @keyframes benefitEntrance {
          0%   { box-shadow: 0 0 0px rgba(0,229,255,0), 0 0 0px rgba(123,97,255,0); opacity: 0.6; }
          45%  { box-shadow: 0 0 22px var(--benefit-glow), 0 0 40px var(--benefit-glow-alt); opacity: 1; }
          75%  { box-shadow: 0 0 10px var(--benefit-glow), 0 0 20px var(--benefit-glow-alt); }
          100% { box-shadow: 0 0 12px var(--benefit-glow), 0 0 24px var(--benefit-glow-alt); opacity: 1; }
        }
        .neon-benefit-wrap {
          padding: 1.5px;
          border-radius: 26px;
          animation: benefitEntrance 0.8s ease-out forwards;
          transition: transform 0.22s cubic-bezier(.4,0,.2,1), box-shadow 0.22s cubic-bezier(.4,0,.2,1), filter 0.22s;
        }
        .neon-benefit-wrap:hover {
          transform: translateY(-5px) scale(1.015);
          filter: brightness(1.06);
        }
        .neon-benefit-inner {
          border-radius: 24px;
          background: rgba(255,255,255,0.90);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          position: relative;
          overflow: hidden;
          height: 100%;
          transition: background 0.22s;
        }
        .neon-benefit-inner::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 24px;
          background: linear-gradient(160deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.04) 55%, rgba(0,229,255,0.04) 100%);
          pointer-events: none;
        }
        .neon-benefit-wrap:hover .neon-benefit-inner {
          background: rgba(255,255,255,0.97);
        }
      `}</style>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0B3C5D] mb-4">
            Ценность для клиники
          </h2>
          <p className="text-lg text-[#0B3C5D]/70 max-w-2xl mx-auto">
            X-РайДент трансформирует рабочий процесс вашей клиники
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="neon-benefit-wrap group"
              style={{
                background: benefit.border,
                boxShadow: `0 0 12px ${benefit.glow}, 0 0 24px ${benefit.glowAlt}`,
                // @ts-ignore
                "--benefit-glow": benefit.glow,
                "--benefit-glow-alt": benefit.glowAlt,
                animationDelay: `${index * 0.15}s`,
              }}
            >
              <div className="neon-benefit-inner p-8">
                {/* Decorative circle */}
                <div
                  className={`absolute -right-12 -top-12 w-48 h-48 rounded-full bg-gradient-to-br ${benefit.color} opacity-5 group-hover:opacity-10 transition-all duration-500 group-hover:scale-110`}
                />

                <div className="relative space-y-4">
                  {/* Icon in top-left */}
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.color} p-[2px] flex-shrink-0`}
                      style={{ boxShadow: `0 0 12px ${benefit.glow}` }}
                    >
                      <div className="w-full h-full rounded-xl bg-white flex items-center justify-center">
                        <benefit.icon
                          className="w-7 h-7 text-[#0B3C5D]"
                          strokeWidth={2}
                        />
                      </div>
                    </div>

                    {/* Stats badge */}
                    <div className="ml-auto">
                      <div
                        className={`px-4 py-2 rounded-full bg-gradient-to-r ${benefit.color} text-white font-bold text-sm whitespace-nowrap`}
                        style={{ boxShadow: `0 0 10px ${benefit.glow}` }}
                      >
                        {benefit.stats}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-[#0B3C5D]">
                      {benefit.title}
                    </h3>
                    <p className="text-[#0B3C5D]/70 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-block p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-[#0B3C5D] to-[#0B3C5D]/80 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#00E5FF]/20 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-[#7B61FF]/20 to-transparent rounded-full blur-3xl" />

            <div className="relative space-y-6 max-w-2xl mx-auto">
              <h3 className="text-3xl lg:text-4xl font-bold text-white">
                Готовы трансформировать вашу клинику?
              </h3>
              <p className="text-lg text-white/80">
                Присоединяйтесь к передовым стоматологическим клиникам, которые уже используют X-РайДент
              </p>
              <NeonButton
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("openContactForm"))
                }
                variant="primary"
                size="lg"
              >
                <span className="font-bold text-white text-lg flex items-center gap-2">
                  Оставить заявку на подключение
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </NeonButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}