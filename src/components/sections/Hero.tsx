'use client';

import { ArrowRight, Users, Wifi, BedDouble, Car } from 'lucide-react';

const highlights = [
  {
    icon: Users,
    value: '2,300',
    label: 'khách (Theater)',
    sublabel: 'Grand Ballroom 1,638 m²',
  },
  {
    icon: Wifi,
    value: '1,800',
    label: 'thiết bị WiFi 7',
    sublabel: 'Ruijie Enterprise',
  },
  {
    icon: BedDouble,
    value: '251',
    label: 'phòng nghỉ',
    sublabel: '50 phòng thông nhau',
  },
  {
    icon: Car,
    value: '350+',
    label: 'chỗ đỗ xe',
    sublabel: 'Thuận tiện đoàn khách',
  },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop')`,
        }}
      />
      <div className="absolute inset-0 overlay-gradient" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center mb-12 animate-fade-in-up">
          <p className="text-gold-400 font-medium tracking-wider uppercase mb-4">
            Phuket&apos;s Premier MICE Venue
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 text-balance">
            Ngay trung tâm Phố Cổ Phuket
          </h1>
          <p className="text-lg md:text-xl text-cream-200 max-w-3xl mx-auto mb-8 text-balance">
            Grand Ballroom quy mô lớn + 6 phòng breakout cùng một tầng, 
            kèm công nghệ LED 4K P2 & WiFi 7 cho sự kiện mượt mà.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#lien-he"
              className="btn-primary group"
              data-track="hero_cta_primary"
              data-track-label="Hero Primary CTA"
            >
              Nhận báo giá sự kiện
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#lien-he"
              className="btn-secondary"
              data-track="hero_cta_secondary"
              data-track-label="Hero Secondary CTA"
            >
              Đặt lịch khảo sát không gian
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-16 animate-fade-in">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="bg-navy-900/60 backdrop-blur-sm border border-gold-500/20 rounded-sm p-4 md:p-6 text-center
                         hover:bg-navy-900/80 hover:border-gold-500/40 transition-all duration-300"
            >
              <item.icon className="w-8 h-8 text-gold-400 mx-auto mb-3" />
              <p className="font-serif text-3xl md:text-4xl font-semibold text-white mb-1">
                {item.value}
              </p>
              <p className="text-cream-200 text-sm">{item.label}</p>
              <p className="text-cream-400 text-xs mt-1">{item.sublabel}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-gold-400 font-serif italic text-lg mt-12">
          &ldquo;Thành công của bạn là niềm tự hào của chúng tôi&rdquo;
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#why-choose" className="text-white/60 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
}
