import { MapPin, Gem, Car, Award, Settings, UtensilsCrossed, ArrowRight, CheckCircle2 } from 'lucide-react';

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

const highlights = [
  'Grand Ballroom 1,638 m² sức chứa 2,300 khách',
  '6 phòng breakout cùng một tầng',
  'Công nghệ LED 4K P2 & WiFi 7',
  'Đội ngũ sự kiện chuyên nghiệp',
];

export function WhyChoose() {
  return (
    <section id="why-choose" className="py-24 bg-gradient-to-b from-white to-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 bg-gold-500/10 text-gold-600 text-sm font-medium rounded-full mb-4">
            Tại sao chọn chúng tôi
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-navy-900 mb-6">
            Vì sao chọn Royal Phuket City Hotel?
          </h2>
          <p className="text-navy-600 text-lg max-w-2xl mx-auto">
            Địa điểm MICE hàng đầu Phuket với cơ sở vật chất hiện đại và dịch vụ chuyên nghiệp
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left - Feature Card */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-gold-500/20 to-navy-900/10 rounded-3xl blur-2xl" />
            <div className="relative bg-navy-900 rounded-2xl p-8 md:p-10 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gold-500/5 rounded-full translate-y-1/2 -translate-x-1/2" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/20 rounded-full mb-6">
                  <Award className="w-4 h-4 text-gold-400" />
                  <span className="text-gold-400 text-sm font-medium">Phuket&apos;s Premier MICE Venue</span>
                </div>
                
                <h3 className="font-serif text-2xl md:text-3xl font-semibold text-white mb-6">
                  Không gian sự kiện đẳng cấp cho mọi quy mô
                </h3>
                
                <ul className="space-y-4 mb-8">
                  {highlights.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-gold-400 mt-0.5 flex-shrink-0" />
                      <span className="text-cream-200">{item}</span>
                    </li>
                  ))}
                </ul>
                
                <a
                  href="#lien-he"
                  className="inline-flex items-center gap-2 text-gold-400 font-medium hover:text-gold-300 transition-colors group"
                  data-track="why_choose_learn_more"
                  data-track-label="Why Choose Learn More"
                >
                  Tìm hiểu thêm
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Right - Reason Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {reasons.slice(0, 4).map((reason, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-xl p-6 shadow-sm border border-cream-200 
                           hover:shadow-xl hover:border-gold-300 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="absolute top-4 right-4 text-5xl font-serif font-bold text-cream-200/50 
                              group-hover:text-gold-500/20 transition-colors">
                  {String(index + 1).padStart(2, '0')}
                </div>
                
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl 
                                flex items-center justify-center mb-4 shadow-lg shadow-gold-500/20
                                group-hover:scale-110 transition-transform">
                    <reason.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="font-serif text-lg font-semibold text-navy-900 mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-navy-600 text-sm leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {reasons.slice(4).map((reason, index) => (
            <div
              key={index}
              className="group flex items-start gap-5 bg-white rounded-xl p-6 shadow-sm border border-cream-200 
                         hover:shadow-xl hover:border-gold-300 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-navy-800 to-navy-900 rounded-xl 
                            flex items-center justify-center flex-shrink-0 shadow-lg
                            group-hover:from-gold-400 group-hover:to-gold-600 transition-all duration-300">
                <reason.icon className="w-7 h-7 text-gold-400 group-hover:text-white transition-colors" />
              </div>
              
              <div>
                <h3 className="font-serif text-xl font-semibold text-navy-900 mb-2">
                  {reason.title}
                </h3>
                <p className="text-navy-600 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="#lien-he"
            className="btn-primary group"
            data-track="why_choose_cta"
            data-track-label="Why Choose CTA"
          >
            Gửi yêu cầu để nhận đề xuất layout + báo giá
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
