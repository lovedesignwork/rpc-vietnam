'use client';

import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-end justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/hero-bg.jpg')`,
        }}
      />
      <div className="absolute inset-0 overlay-gradient" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <div className="text-center animate-fade-in-up">
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
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#highlights" className="text-white/60 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
}
