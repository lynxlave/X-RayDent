import { Clock, Target, UserCheck } from "lucide-react";

export function TrustBadges() {
  const badges = [
    {
      icon: Clock,
      title: "Анализ ортопантомограммы",
      color: "from-[#00E5FF] to-[#00B8D4]",
    },
    {
      icon: Target,
      title: "Выявление радикулярной кисты",
      color: "from-[#7B61FF] to-[#5E4FD6]",
    },
    {
      icon: UserCheck,
      title: "ИИ-заключение и рекомендации",
      color: "from-[#00E5FF] to-[#7B61FF]",
    },
  ];

  return (
    <section className="relative py-12 bg-gradient-to-b from-white to-[#0B3C5D]/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#0B3C5D]/10 hover:border-[#00E5FF]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#00E5FF]/10 hover:-translate-y-1"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00E5FF]/5 to-[#7B61FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative flex items-start gap-4">
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${badge.color} p-[2px]`}
                >
                  <div className="w-full h-full rounded-xl bg-white flex items-center justify-center">
                    <badge.icon
                      className={`w-6 h-6 bg-gradient-to-br ${badge.color} bg-clip-text text-transparent`}
                      strokeWidth={2.5}
                    />
                  </div>
                </div>
                <p className="flex-1 font-medium text-[#0B3C5D] leading-relaxed pt-1">
                  {badge.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}