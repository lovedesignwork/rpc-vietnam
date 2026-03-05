'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '#mice-venue', label: 'MICE Venue' },
  { href: '#khong-gian', label: 'Không gian' },
  { href: '#phong-nghi', label: 'Phòng nghỉ' },
  { href: '#am-thuc', label: 'Ẩm thực' },
  { href: '#tien-ich', label: 'Tiện ích' },
  { href: '#vi-tri', label: 'Vị trí' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-navy-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="flex items-center space-x-2">
            <span className="font-serif text-xl md:text-2xl font-semibold text-white">
              Royal Phuket City
            </span>
          </a>

          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-cream-100 hover:text-gold-400 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="tel:+6676233333"
              className="flex items-center space-x-2 text-cream-100 hover:text-gold-400 transition-colors"
              data-track="header_phone"
              data-track-label="Header Phone Click"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm">+66 76-233-333</span>
            </a>
            <a
              href="#lien-he"
              className="btn-primary text-sm py-3 px-6"
              data-track="header_cta"
              data-track-label="Header CTA"
            >
              Nhận báo giá
            </a>
          </div>

          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-navy-900/95 backdrop-blur-md border-t border-navy-700">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block py-3 text-cream-100 hover:text-gold-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 border-t border-navy-700 space-y-3">
              <a
                href="tel:+6676233333"
                className="flex items-center space-x-2 text-cream-100 py-2"
              >
                <Phone className="w-4 h-4" />
                <span>+66 76-233-333</span>
              </a>
              <a
                href="#lien-he"
                className="btn-primary w-full text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Nhận báo giá
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
