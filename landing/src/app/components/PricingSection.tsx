import { Check, Star, Zap, Building2, Rocket, Users, GraduationCap } from 'lucide-react';
import { NeonButton } from './ui/NeonButton';

interface PricingCard {
  id: string;
  name: string;
  description: string;
  price: string;
  pricePerUnit?: string;
  snapshots?: number;
  duration?: string;
  features: string[];
  highlight?: boolean;
  icon: React.ReactNode;
  badge?: string;
  targetAudience: string;
}

const pricingPlans: PricingCard[] = [
  {
    id: 'single',
    name: 'Разовый анализ',
    description: 'Протестируйте систему без подписки',
    price: '800 ₽',
    pricePerUnit: '800 ₽ за снимок',
    snapshots: 1,
    features: [
      'Обработка 1 рентген-снимка',
      'Врачебное заключение',
      'Без подписки',
      'Быстрый результат'
    ],
    icon: <Zap className="w-6 h-6" />,
    targetAudience: 'Частным стоматологам и консультантам'
  },
  {
    id: 'basic',
    name: 'Базовый пакет',
    description: 'Для небольших клиник',
    price: '30 000 ₽',
    pricePerUnit: '600 ₽ за снимок',
    snapshots: 50,
    duration: '1 месяц',
    features: [
      '50 снимков в месяц',
      'Снижение себестоимости',
      'Ускорение заключений',
      'Техническая поддержка'
    ],
    icon: <Users className="w-6 h-6" />,
    targetAudience: 'Небольшим лабораториям и клиникам'
  },
  {
    id: 'pro',
    name: 'PRO',
    description: 'Оптимальный выбор для активных клиник',
    price: '66 000 ₽',
    pricePerUnit: '550 ₽ за снимок',
    snapshots: 120,
    duration: '1 месяц',
    features: [
      '120 снимков в месяц',
      'Приоритетная поддержка',
      'Интеграция в рабочий процесс',
      'Аналитика и отчёты',
      'Скидка 8% от базового'
    ],
    highlight: true,
    badge: 'Популярный',
    icon: <Star className="w-6 h-6" />,
    targetAudience: 'Сетевым стоматологиям'
  },
  {
    id: 'profi-plus',
    name: 'Профи+',
    description: 'Долгосрочная автоматизация',
    price: '270 000 ₽',
    pricePerUnit: '450 ₽ за снимок',
    snapshots: 600,
    duration: '6 месяцев',
    features: [
      '600 снимков за 6 месяцев',
      'Экономия 25% от базового',
      'Минимизация нагрузки на врачей',
      'Прогнозируемость расходов',
      'Персональный менеджер'
    ],
    icon: <Rocket className="w-6 h-6" />,
    targetAudience: 'Клиникам со стабильным потоком'
  },
  {
    id: 'annual',
    name: 'Годовой пакет',
    description: 'Максимальная выгода',
    price: '480 000 ₽',
    pricePerUnit: '400 ₽ за снимок',
    snapshots: 1200,
    duration: '12 месяцев',
    features: [
      '1200 снимков в год',
      'Экономия 33% от базового',
      'Стратегическая экономия',
      'AI-стандарт диагностики',
      'VIP поддержка 24/7'
    ],
    icon: <Building2 className="w-6 h-6" />,
    badge: 'Выгодно',
    targetAudience: 'Крупным клиникам и лабораториям'
  },
  {
    id: 'corporate',
    name: 'Корпоративный',
    description: 'Индивидуальное решение',
    price: 'от 500 000 ₽',
    pricePerUnit: 'индивидуально',
    snapshots: 2000,
    duration: 'Custom',
    features: [
      'От 2000+ снимков',
      'Брендирование под вашу клинику',
      'API-интеграция',
      'Настройка под процессы',
      'Выделенный аккаунт-менеджер'
    ],
    icon: <Building2 className="w-6 h-6" />,
    targetAudience: 'Сетям клиник и госучреждениям'
  }
];

const trainingPackage = {
  name: 'Обучение и внедрение',
  description: 'Повышение квалификации персонала',
  price: '35 000–50 000 ₽',
  features: [
    'Обучение работе с системой',
    'Повышение квалификации персонала',
    'Сопровождение внедрения',
    'Снижение ошибок',
    'Ускорение внедрения'
  ],
  icon: <GraduationCap className="w-6 h-6" />,
  targetAudience: 'Всем клиникам, внедряющим AI-решение'
};

export function PricingSection() {
  return (
    <section id="pricing" className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-b from-white to-[#0B3C5D]/5">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMTAgNjAgTSAwIDEwIEwgNjAgMTAgTSAyMCAwIEwgMjAgNjAgTSAwIDIwIEwgNjAgMjAgTSAzMCAwIEwgMzAgNjAgTSAwIDMwIEwgNjAgMzAgTSA0MCAwIEwgNDAgNjAgTSAwIDQwIEwgNjAgNDAgTSA1MCAwIEwgNTAgNjAgTSAwIDUwIEwgNjAgNTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwRTVGRiIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#00E5FF]/10 to-[#7B61FF]/10 border border-[#00E5FF]/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
            <span className="text-sm font-medium text-[#0B3C5D]">
              Тарифные планы
            </span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold text-[#0B3C5D] mb-6">
            Выберите оптимальный пакет
          </h2>
          <p className="text-lg text-[#0B3C5D]/70">
            Гибкие тарифы для клиник любого размера — от разового анализа до корпоративных решений
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`group relative rounded-2xl transition-all duration-500 hover:scale-[1.02] ${
                plan.highlight
                  ? 'lg:col-span-1 lg:row-span-1'
                  : ''
              }`}
            >
              {/* Highlight glow for popular plan */}
              {plan.highlight && (
                <div className="absolute -inset-1 bg-gradient-to-br from-[#00E5FF] to-[#7B61FF] rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
              )}

              {/* Card */}
              <div
                className={`relative h-full p-6 rounded-2xl backdrop-blur-sm border-2 transition-all duration-300 ${
                  plan.highlight
                    ? 'bg-gradient-to-br from-white to-[#00E5FF]/5 border-[#00E5FF]/40 shadow-xl shadow-[#00E5FF]/20'
                    : 'bg-white/80 border-[#0B3C5D]/10 hover:border-[#00E5FF]/30 hover:shadow-lg'
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] text-white text-xs font-semibold shadow-lg">
                    {plan.badge}
                  </div>
                )}

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${
                  plan.highlight
                    ? 'bg-gradient-to-br from-[#00E5FF]/20 to-[#7B61FF]/20 text-[#00E5FF]'
                    : 'bg-[#0B3C5D]/5 text-[#0B3C5D]'
                }`}>
                  {plan.icon}
                </div>

                {/* Plan Info */}
                <div className="space-y-3 mb-6">
                  <h3 className="text-2xl font-bold text-[#0B3C5D]">{plan.name}</h3>
                  <p className="text-sm text-[#0B3C5D]/60">{plan.description}</p>
                  
                  {/* Price */}
                  <div className="pt-2">
                    <div className="text-3xl font-bold bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] bg-clip-text text-transparent">
                      {plan.price}
                    </div>
                    {plan.duration && (
                      <div className="text-sm text-[#0B3C5D]/60 mt-1">{plan.duration}</div>
                    )}
                    {plan.pricePerUnit && (
                      <div className="text-sm font-medium text-[#0B3C5D]/80 mt-1">{plan.pricePerUnit}</div>
                    )}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[#00E5FF] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[#0B3C5D]/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Target Audience */}
                <div className="text-xs text-[#0B3C5D]/60 mb-6 italic">
                  Для: {plan.targetAudience}
                </div>

                {/* CTA Button */}
                <NeonButton
                  onClick={() => window.dispatchEvent(new CustomEvent('openContactForm'))}
                  variant={plan.highlight ? 'primary' : 'secondary'}
                  size="md"
                  className="w-full"
                >
                  <span className={`font-semibold ${plan.highlight ? 'text-white' : 'text-[#0B3C5D]'}`}>
                    Подключить
                  </span>
                </NeonButton>
              </div>
            </div>
          ))}
        </div>

        {/* Training Package - Highlighted Separately */}
        <div className="max-w-4xl mx-auto">
          <div className="relative group rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02]">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#7B61FF] to-[#00E5FF] rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
            
            {/* Card */}
            <div className="relative p-8 bg-gradient-to-br from-white to-[#7B61FF]/5 rounded-2xl border-2 border-[#7B61FF]/40 shadow-xl">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Left Side */}
                <div>
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-[#7B61FF]/20 to-[#00E5FF]/20 text-[#7B61FF] mb-4">
                    {trainingPackage.icon}
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-bold text-[#0B3C5D] mb-3">
                    {trainingPackage.name}
                  </h3>
                  <p className="text-[#0B3C5D]/70 mb-4">{trainingPackage.description}</p>
                  
                  <div className="text-3xl font-bold bg-gradient-to-r from-[#7B61FF] to-[#00E5FF] bg-clip-text text-transparent mb-4">
                    {trainingPackage.price}
                  </div>

                  <NeonButton
                    onClick={() => window.dispatchEvent(new CustomEvent('openContactForm'))}
                    variant="primary"
                    size="lg"
                  >
                    <span className="font-semibold text-white">
                      Заказать обучение
                    </span>
                  </NeonButton>
                </div>

                {/* Right Side - Features */}
                <div>
                  <ul className="space-y-3">
                    {trainingPackage.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[#7B61FF] flex-shrink-0 mt-0.5" />
                        <span className="text-[#0B3C5D]/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-xs text-[#0B3C5D]/60 mt-6 italic">
                    {trainingPackage.targetAudience}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-[#0B3C5D]/70 mb-4">
            Не уверены, какой пакет выбрать? Мы поможем подобрать оптимальное решение
          </p>
          <NeonButton
            onClick={() => window.dispatchEvent(new CustomEvent('openContactForm'))}
            variant="primary"
            size="lg"
          >
            <span className="font-semibold text-white">
              Получить консультацию
            </span>
          </NeonButton>
        </div>
      </div>
    </section>
  );
}
