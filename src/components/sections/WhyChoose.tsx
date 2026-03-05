import { MapPin, Gem, Car, Award, Settings, UtensilsCrossed } from 'lucide-react';

const reasons = [
  {
    icon: MapPin,
    title: 'Vị trí đắc địa',
    description: 'Ngay trung tâm Phố Cổ Phuket, thuận tiện di chuyển và tham quan.',
  },
  {
    icon: Gem,
    title: 'Giá trị vượt trội',
    description: 'Trải nghiệm cao cấp với chi phí hợp lý.',
  },
  {
    icon: Car,
    title: 'Bãi đỗ xe rộng rãi',
    description: 'Hơn 350 chỗ cho xe khách/đoàn.',
  },
  {
    icon: Award,
    title: 'Ưu thế MICE',
    description: 'Kinh nghiệm lâu năm, quy trình chuyên nghiệp.',
  },
  {
    icon: Settings,
    title: 'Linh hoạt theo nhu cầu',
    description: 'Cấu hình phòng, kỹ thuật và F&B tùy chỉnh theo ngân sách.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Ẩm thực gây ấn tượng',
    description: 'Nâng tầm trải nghiệm khách mời.',
  },
];

export function WhyChoose() {
  return (
    <section id="why-choose" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-heading">Vì sao chọn Royal Phuket City Hotel?</h2>
          <div className="gold-divider mt-6" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group p-8 bg-cream-50 rounded-sm hover:bg-navy-900 transition-all duration-500"
            >
              <div className="w-14 h-14 bg-gold-500/10 rounded-full flex items-center justify-center mb-6
                            group-hover:bg-gold-500/20 transition-colors">
                <reason.icon className="w-7 h-7 text-gold-500" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-navy-900 mb-3
                           group-hover:text-white transition-colors">
                {reason.title}
              </h3>
              <p className="text-navy-600 group-hover:text-cream-200 transition-colors">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#lien-he"
            className="btn-primary"
            data-track="why_choose_cta"
            data-track-label="Why Choose CTA"
          >
            Gửi yêu cầu để nhận đề xuất layout + báo giá
          </a>
        </div>
      </div>
    </section>
  );
}
