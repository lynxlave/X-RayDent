import { useState } from 'react';
import { X, CheckCircle2, User, Mail, Phone } from 'lucide-react';

interface PatientRegistrationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PatientRegistrationForm({ isOpen, onClose }: PatientRegistrationFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setFormData({ fullName: '', email: '', phone: '' });
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0B3C5D]/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="relative p-8 bg-gradient-to-br from-[#0B3C5D] to-[#0B3C5D]/90 text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
          
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all flex items-center justify-center group"
          >
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          </button>

          <div className="relative space-y-2">
            <h2 className="text-3xl font-bold">Регистрация пациента</h2>
            <p className="text-white/80">
              Заполните форму для регистрации в системе X-РайДент
            </p>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#0B3C5D] flex items-center gap-2">
                  <User className="w-4 h-4 text-[#00E5FF]" />
                  ФИО
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#0B3C5D]/10 focus:border-[#00E5FF] focus:outline-none transition-colors bg-white"
                  placeholder="Иванов Иван Иванович"
                />
              </div>

              {/* Phone Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#0B3C5D] flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#7B61FF]" />
                  Контактный телефон
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#0B3C5D]/10 focus:border-[#7B61FF] focus:outline-none transition-colors bg-white"
                  placeholder="+7 (___) ___-__-__"
                />
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#0B3C5D] flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#00E5FF]" />
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#0B3C5D]/10 focus:border-[#00E5FF] focus:outline-none transition-colors bg-white"
                  placeholder="example@mail.ru"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="group relative w-full px-6 py-4 rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#00E5FF]/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#00E5FF] to-[#7B61FF]" />
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <span className="relative z-10 font-semibold text-white">
                  Зарегистрироваться
                </span>
              </button>

              {/* Privacy Note */}
              <p className="text-xs text-[#0B3C5D]/60 text-center leading-relaxed">
                Нажимая кнопку, вы соглашаетесь с{' '}
                <a href="#" className="text-[#00E5FF] hover:underline">
                  политикой конфиденциальности
                </a>
              </p>
            </form>
          ) : (
            <div className="py-12 text-center space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#00E5FF]/20 to-[#7B61FF]/20">
                <CheckCircle2 className="w-10 h-10 text-[#00E5FF]" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-[#0B3C5D]">Регистрация успешна!</h3>
                <p className="text-[#0B3C5D]/70">
                  Мы отправили вам письмо с дальнейшими инструкциями
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
