import { 
  Monitor, 
  Volume2, 
  Mic, 
  Presentation, 
  Projector,
  Speaker,
  LayoutGrid,
  Layers,
  Tv,
  UtensilsCrossed,
  Wrench,
  Camera,
  Shield,
  Laptop,
  Printer,
  Wifi,
  Users
} from 'lucide-react';

const equipment = [
  {
    icon: Monitor,
    title: 'Thiết bị AV',
    description: 'Bộ công cụ nghe nhìn đầy đủ hỗ trợ thuyết trình và hội nghị.',
  },
  {
    icon: Volume2,
    title: 'Hệ thống âm thanh',
    description: 'Âm thanh chất lượng cao, phù hợp cho hội nghị lớn nhỏ.',
  },
  {
    icon: Mic,
    title: 'Micro có dây & không dây',
    description: 'Tùy chọn micro linh hoạt cho mọi cấu hình phòng và diễn giả.',
  },
  {
    icon: Presentation,
    title: 'Màn hình LCD',
    description: 'Màn hình độ phân giải cao cho trình chiếu ấn tượng.',
  },
  {
    icon: Projector,
    title: 'Máy chiếu LCD',
    description: 'Hình ảnh sáng rõ cho slideshow, video và nội dung trực quan.',
  },
  {
    icon: Speaker,
    title: 'PA System di động',
    description: 'Hệ thống loa di động hoàn hảo cho sự kiện linh hoạt.',
  },
  {
    icon: LayoutGrid,
    title: 'Sân khấu cố định',
    description: 'Sân khấu cố định tại phòng chính cho thuyết trình và biểu diễn.',
  },
  {
    icon: Layers,
    title: 'Sân khấu di động',
    description: 'Sân khấu module linh hoạt phù hợp mọi bố cục và địa điểm.',
  },
  {
    icon: Tv,
    title: 'Màn hình LED',
    description: 'Màn LED lớn 4K P2 cho hình ảnh sống động và ấn tượng.',
  },
  {
    icon: UtensilsCrossed,
    title: 'F&B và Tiệc',
    description: 'Dịch vụ ẩm thực trọn gói với thực đơn tùy chỉnh.',
  },
  {
    icon: Wrench,
    title: 'Kỹ thuật viên AV',
    description: 'Hỗ trợ kỹ thuật tại chỗ đảm bảo vận hành mượt mà.',
  },
  {
    icon: Camera,
    title: 'Nhiếp ảnh gia',
    description: 'Dịch vụ chụp ảnh chuyên nghiệp ghi lại khoảnh khắc sự kiện.',
  },
  {
    icon: Shield,
    title: 'Bảo vệ đặc biệt',
    description: 'Nhân viên an ninh cho sự kiện VIP hoặc riêng tư.',
  },
  {
    icon: Laptop,
    title: 'Máy tính',
    description: 'Máy trạm sẵn sàng cho công việc hành chính.',
  },
  {
    icon: Printer,
    title: 'Máy in',
    description: 'Dịch vụ in tại chỗ cho tài liệu và thẻ tên.',
  },
  {
    icon: Wifi,
    title: 'Internet tốc độ cao',
    description: 'WiFi 7 nhanh và ổn định, có dây và không dây.',
  },
  {
    icon: Users,
    title: 'Phòng họp',
    description: 'Tất cả phòng họp được trang bị kết nối đầy đủ.',
  },
];

export function Equipment() {
  return (
    <section id="equipment" className="py-24 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-gold-500/10 text-gold-600 text-sm font-medium rounded-full mb-4">
            Trang thiết bị & Dịch vụ
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-navy-900 tracking-wide uppercase">
            Equipment & Services
          </h2>
          <p className="text-navy-600 text-lg max-w-2xl mx-auto mt-4">
            Đầy đủ trang thiết bị và dịch vụ hỗ trợ cho mọi loại hình sự kiện
          </p>
        </div>

        {/* Equipment Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
          {equipment.map((item, index) => (
            <div
              key={index}
              className="group flex items-start gap-4"
            >
              <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-7 h-7 text-gold-500 group-hover:text-gold-600 transition-colors" strokeWidth={1.5} />
              </div>
              
              <div>
                <h3 className="font-serif text-lg font-semibold text-navy-900 mb-1 group-hover:text-gold-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-navy-500 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-16 text-center">
          <p className="text-navy-600 italic">
            * Tất cả trang thiết bị có thể được tùy chỉnh theo yêu cầu sự kiện
          </p>
          <a
            href="#lien-he"
            className="inline-flex items-center gap-2 mt-6 text-gold-600 font-medium hover:text-gold-700 transition-colors"
            data-track="equipment_cta"
            data-track-label="Equipment CTA"
          >
            Liên hệ để biết thêm chi tiết
            <span className="text-lg">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
