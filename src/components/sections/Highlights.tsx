'use client';

import { Users, Wifi, BedDouble, Car } from 'lucide-react';

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

export function Highlights() {
  return (
    <section id="highlights" className="py-16 bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="bg-navy-800/50 border border-gold-500/20 rounded-lg p-6 text-center
                         hover:bg-navy-800 hover:border-gold-500/40 transition-all duration-300"
            >
              <item.icon className="w-10 h-10 text-gold-400 mx-auto mb-4" />
              <p className="font-serif text-3xl md:text-4xl font-semibold text-white mb-2">
                {item.value}
              </p>
              <p className="text-cream-200 text-sm font-medium">{item.label}</p>
              <p className="text-cream-400 text-xs mt-1">{item.sublabel}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-gold-400 font-serif italic text-xl mt-10">
          &ldquo;Thành công của bạn là niềm tự hào của chúng tôi&rdquo;
        </p>
      </div>
    </section>
  );
}
