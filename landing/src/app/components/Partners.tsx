import { Award, GraduationCap, Lightbulb } from "lucide-react";

export function Partners() {
  const partners = [
    {
      icon: Award,
      name: "Московский физико-технический институт (национальный исследовательский университет)",
      shortName: "МФТИ",
      description: "Разработка ИИ-алгоритмов",
      color: "from-[#7B61FF] to-[#5E4FD6]",
      glow: "rgba(123,97,255,0.4)",
      glowAlt: "rgba(0,229,255,0.2)",
      border: "linear-gradient(135deg, #7B61FF 0%, #00E5FF 50%, #FF2D78 100%)",
    },
    {
      icon: GraduationCap,
      name: "Российский национальный исследовательский медицинский университет им. Н.И. Пирогова",
      shortName: "РНИМУ им. Н.И. Пирогова",
      description: "Научное партнерство",
      color: "from-[#00E5FF] to-[#00B8D4]",
      glow: "rgba(0,229,255,0.4)",
      glowAlt: "rgba(123,97,255,0.2)",
      border: "linear-gradient(135deg, #00E5FF 0%, #7B61FF 60%, #FF2D78 100%)",
    },
    {
      icon: Lightbulb,
      name: "Фонд содействия инновациям",
      shortName: "Фонд содействия инновациям",
      description: "Поддержка развития",
      color: "from-[#00E5FF] to-[#7B61FF]",
      glow: "rgba(0,229,255,0.35)",
      glowAlt: "rgba(123,97,255,0.25)",
      border: "linear-gradient(135deg, #FF2D78 0%, #7B61FF 50%, #00E5FF 100%)",
    },
  ];

  return (
    <section id="partners" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#7B61FF]/5 to-white" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00E5FF]/5 rounded-full blur-3xl" />

      <style>{`
        @keyframes partnerEntrance {
          0%   { box-shadow: 0 0 0px rgba(0,229,255,0), 0 0 0px rgba(123,97,255,0); opacity: 0.6; transform: translateY(20px); }
          45%  { box-shadow: 0 0 24px var(--partner-glow), 0 0 40px var(--partner-glow-alt); opacity: 1; }
          75%  { box-shadow: 0 0 12px var(--partner-glow), 0 0 22px var(--partner-glow-alt); }
          100% { box-shadow: 0 0 14px var(--partner-glow), 0 0 26px var(--partner-glow-alt); opacity: 1; transform: translateY(0); }
        }
        .neon-partner-wrap {
          padding: 2px;
          border-radius: 24px;
          animation: partnerEntrance 0.9s ease-out forwards;
          transition: transform 0.25s cubic-bezier(.4,0,.2,1), box-shadow 0.25s cubic-bezier(.4,0,.2,1), filter 0.25s;
        }
        .neon-partner-wrap:hover {
          transform: translateY(-8px) scale(1.03);
          filter: brightness(1.08);
        }
        .neon-partner-inner {
          border-radius: 22px;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          position: relative;
          overflow: hidden;
          height: 100%;
          transition: background 0.25s;
        }
        .neon-partner-inner::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 22px;
          background: linear-gradient(160deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.05) 60%, rgba(0,229,255,0.08) 100%);
          pointer-events: none;
        }
        .neon-partner-wrap:hover .neon-partner-inner {
          background: rgba(255,255,255,0.98);
        }
      `}</style>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#00E5FF]/10 to-[#7B61FF]/10 border border-[#00E5FF]/20">
              <Award className="w-5 h-5 text-[#00E5FF]" />
              <span className="text-sm font-semibold text-[#0B3C5D]">
                Доверие и экспертность
              </span>
            </div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-[#0B3C5D] mb-4">
            Наши партнёры
          </h2>
          <p className="text-lg text-[#0B3C5D]/70 max-w-2xl mx-auto">
            Мы сотрудничаем с ведущими научными и медицинскими организациями России
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="neon-partner-wrap"
              style={{
                background: partner.border,
                boxShadow: `0 0 14px ${partner.glow}, 0 0 26px ${partner.glowAlt}`,
                // @ts-ignore
                "--partner-glow": partner.glow,
                "--partner-glow-alt": partner.glowAlt,
                animationDelay: `${index * 0.2}s`,
              }}
            >
              <div className="neon-partner-inner p-8">
                <div className="relative flex flex-col h-full">
                  {/* Content */}
                  <div className="flex-1 space-y-4 mb-20">
                    {/* Badge */}
                    <div className="inline-block">
                      <span className="text-xs font-bold text-[#0B3C5D] bg-gradient-to-r from-[#00E5FF]/20 to-[#7B61FF]/20 border border-[#00E5FF]/30 px-3 py-1.5 rounded-full">
                        {partner.description}
                      </span>
                    </div>
                    
                    {/* Organization Name */}
                    <div>
                      <h3 className="text-xl font-bold text-[#0B3C5D] leading-tight mb-2">
                        {partner.shortName}
                      </h3>
                      {partner.name !== partner.shortName && (
                        <p className="text-sm text-[#0B3C5D]/60 leading-relaxed">
                          {partner.name}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Icon in bottom-right */}
                  <div className="absolute bottom-0 right-0">
                    <div
                      className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${partner.color} p-[2px]`}
                      style={{ boxShadow: `0 0 16px ${partner.glow}` }}
                    >
                      <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center">
                        <partner.icon
                          className="w-10 h-10 text-[#0B3C5D]"
                          strokeWidth={2}
                        />
                      </div>
                      {/* Icon glow effect */}
                      <div
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${partner.color} opacity-20 blur-xl`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Statement */}
        <div className="mt-16 text-center">
          <div className="inline-block max-w-3xl p-8 rounded-3xl bg-gradient-to-br from-[#0B3C5D]/5 to-[#7B61FF]/5 border border-[#00E5FF]/20">
            <p className="text-[#0B3C5D]/80 leading-relaxed">
              <span className="font-semibold text-[#0B3C5D]">X-РайДент</span> разработан при участии медицинских и технических специалистов. 
              Наши ИИ-алгоритмы прошли научную валидацию и соответствуют современным стандартам качества.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
