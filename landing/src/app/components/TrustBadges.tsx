import { Clock, Target, UserCheck } from "lucide-react";

export function TrustBadges() {
  const badges = [
    {
      icon: Clock,
      title: "Анализ ортопантомограммы",
      color: "from-[#00E5FF] to-[#00B8D4]",
      glow: "rgba(0,229,255,0.45)",
      glowAlt: "rgba(0,229,255,0.2)",
      border: "linear-gradient(135deg, #00E5FF 0%, #7B61FF 60%, #FF2D78 100%)",
    },
    {
      icon: Target,
      title: "Выявление радикулярной кисты",
      color: "from-[#7B61FF] to-[#5E4FD6]",
      glow: "rgba(123,97,255,0.45)",
      glowAlt: "rgba(0,229,255,0.2)",
      border: "linear-gradient(135deg, #7B61FF 0%, #00E5FF 50%, #FF2D78 100%)",
    },
    {
      icon: UserCheck,
      title: "ИИ-заключение и рекомендации",
      color: "from-[#00E5FF] to-[#7B61FF]",
      glow: "rgba(0,229,255,0.4)",
      glowAlt: "rgba(123,97,255,0.25)",
      border: "linear-gradient(135deg, #FF2D78 0%, #7B61FF 50%, #00E5FF 100%)",
    },
  ];

  return (
    <section className="relative py-12">
      <style>{`
        @keyframes badgeEntrance {
          0%   { box-shadow: 0 0 0px rgba(0,229,255,0), 0 0 0px rgba(123,97,255,0); opacity: 0.6; }
          45%  { box-shadow: 0 0 20px var(--badge-glow), 0 0 36px var(--badge-glow-alt); opacity: 1; }
          75%  { box-shadow: 0 0 10px var(--badge-glow), 0 0 18px var(--badge-glow-alt); }
          100% { box-shadow: 0 0 12px var(--badge-glow), 0 0 22px var(--badge-glow-alt); opacity: 1; }
        }
        .neon-badge-wrap {
          padding: 1.5px;
          border-radius: 18px;
          transition: transform 0.22s cubic-bezier(.4,0,.2,1), box-shadow 0.22s cubic-bezier(.4,0,.2,1), filter 0.22s;
          animation: badgeEntrance 0.8s ease-out forwards;
          cursor: default;
        }
        .neon-badge-wrap:hover {
          transform: translateY(-4px) scale(1.02);
          filter: brightness(1.07);
        }
        .neon-badge-inner {
          border-radius: 16px;
          background: rgba(255,255,255,0.88);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          position: relative;
          overflow: hidden;
          transition: background 0.22s;
        }
        .neon-badge-inner::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 16px;
          background: linear-gradient(160deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.05) 60%, rgba(0,229,255,0.05) 100%);
          pointer-events: none;
        }
        .neon-badge-wrap:hover .neon-badge-inner {
          background: rgba(255,255,255,0.95);
        }
      `}</style>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="neon-badge-wrap"
              style={{
                background: badge.border,
                boxShadow: `0 0 12px ${badge.glow}, 0 0 22px ${badge.glowAlt}`,
                // @ts-ignore
                "--badge-glow": badge.glow,
                "--badge-glow-alt": badge.glowAlt,
                animationDelay: `${index * 0.15}s`,
              }}
            >
              <div className="neon-badge-inner p-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-medium text-[#0B3C5D] leading-relaxed">
                    {badge.title}
                  </p>

                  <div className="shrink-0">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${badge.color} p-[2px]`}
                      style={{
                        boxShadow: `0 0 10px ${badge.glow}`,
                      }}
                    >
                      <div className="w-full h-full rounded-xl bg-white flex items-center justify-center">
                        <badge.icon
                          className="w-6 h-6 text-[#0B3C5D]"
                          strokeWidth={2.5}
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
