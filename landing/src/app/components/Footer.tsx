import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative bg-gradient-to-br from-[#0B3C5D] to-[#0B3C5D]/90 text-white pt-16 pb-8 overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00E5FF] to-[#7B61FF] flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  X
                </span>
              </div>
              <span className="text-2xl font-bold">
                X-РайДент
              </span>
            </div>
            <p className="text-white/70 leading-relaxed max-w-lg">
              ИИ-ассистент для стоматологов. Автоматический
              анализ ортопантомограмм с точностью 96% за 2
              минуты
            </p>
            <div className="flex gap-4 pt-2">
              <button className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300 flex items-center justify-center group">
                <svg
                  className="w-5 h-5 text-white/80 group-hover:text-[#00E5FF] transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9.993 15.174l-.397 5.583c.568 0 .814-.244 1.108-.538l2.66-2.54 5.509 4.032c1.009.557 1.724.264 1.997-.935l3.622-16.972.001-.001c.319-1.49-.539-2.074-1.521-1.707L1.196 9.563c-1.438.558-1.416 1.361-.245 1.724l5.558 1.735 12.902-8.14c.607-.37 1.158-.166.704.204" />
                </svg>
              </button>
              <button className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300 flex items-center justify-center group">
                <svg
                  className="w-5 h-5 text-white/80 group-hover:text-[#EE8208] transition-colors"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.2c2.7 0 4.9 2.2 4.9 4.9S14.7 12 12 12 7.1 9.8 7.1 7.1 9.3 2.2 12 2.2zm0 2.3c-1.4 0-2.6 1.2-2.6 2.6S10.6 9.7 12 9.7s2.6-1.2 2.6-2.6S13.4 4.5 12 4.5zm0 8.6c2.3 0 4.4-.6 6.2-1.7l1.2 1.9c-2.2 1.5-4.8 2.3-7.4 2.3s-5.2-.8-7.4-2.3l1.2-1.9c1.8 1.1 3.9 1.7 6.2 1.7zm-3.5 2.6l3.5 3.3 3.5-3.3 1.6 1.7-5.1 4.8-5.1-4.8 1.6-1.7z" />
                </svg>
              </button>
              <button className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300 flex items-center justify-center group">
                <svg
                  className="w-5 h-5 text-white/80 group-hover:text-[#00E5FF] transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.785 16.241s.392-.044.593-.266c.184-.203.178-.587.178-.587s-.025-1.79.807-2.052c.821-.258 1.873 1.73 2.989 2.494.845.578 1.486.451 1.486.451l2.985-.042s1.561-.097.82-1.327c-.061-.101-.431-.905-2.217-2.564-1.868-1.735-1.618-1.455.633-4.464 1.37-1.833 1.918-2.952 1.747-3.431-.163-.456-1.17-.335-1.17-.335l-3.361.021s-.249-.033-.432.076c-.18.107-.297.357-.297.357s-.532 1.416-1.239 2.622c-1.492 2.548-2.088 2.683-2.331 2.526-.566-.365-.425-1.465-.425-2.247 0-2.444.371-3.462-.722-3.726-.363-.087-.63-.144-1.559-.154-1.193-.012-2.201.003-2.77.278-.379.183-.671.591-.492.614.221.03.72.135.984.495.341.464.329 1.507.329 1.507s.196 2.878-.456 3.236c-.447.246-1.06-.256-2.377-2.571-.674-1.186-1.185-2.496-1.185-2.496s-.098-.241-.273-.369c-.211-.155-.506-.205-.506-.205l-3.191.021s-.479.014-.654.221c-.156.184-.012.565-.012.565s2.497 5.847 5.322 8.796c2.593 2.707 5.536 2.527 5.536 2.527z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Contact Column */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg mb-6">
              Контакты
            </h4>
            <div className="space-y-3">
              <a
                href="tel:+7"
                className="flex items-start gap-3 text-white/70 hover:text-[#00E5FF] transition-colors group"
              >
                <Phone className="w-5 h-5 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span>+7 (XXX) XXX-XX-XX</span>
              </a>
              <a
                href="mailto:info@x-raydent.ru"
                className="flex items-start gap-3 text-white/70 hover:text-[#00E5FF] transition-colors group"
              >
                <Mail className="w-5 h-5 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span>info@x-raydent.ru</span>
              </a>
              <div className="flex items-start gap-3 text-white/70">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>Москва, Россия</span>
              </div>
            </div>
          </div>

          {/* Links Column */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg mb-6">
              Компания
            </h4>
            <div className="space-y-3">
              <a
                href="#"
                className="block text-white/70 hover:text-[#00E5FF] transition-colors"
              >
                Как это работает
              </a>
              <a
                href="#"
                className="block text-white/70 hover:text-[#00E5FF] transition-colors"
              >
                Преимущества
              </a>
              <a
                href="#"
                className="block text-white/70 hover:text-[#00E5FF] transition-colors"
              >
                Технология
              </a>
              <a
                href="#"
                className="block text-white/70 hover:text-[#00E5FF] transition-colors"
              >
                Контакты
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-sm">
              © 2026 X-РайДент. Все права защищены.
            </p>
            <div className="flex gap-6 text-sm">
              <a
                href="#"
                className="text-white/60 hover:text-[#00E5FF] transition-colors"
              >
                Политика конфиденциальности
              </a>
              <a
                href="#"
                className="text-white/60 hover:text-[#00E5FF] transition-colors"
              >
                Условия использования
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}