import { CheckCircle } from 'lucide-react';

const features = [
  'Grand Ballroom quy mô lớn 1,638 m²',
  '6 phòng meeting/breakout cùng một tầng',
  'Tối ưu vận hành và luồng di chuyển',
  'Công nghệ LED 4K P2 & WiFi 7',
  'Đội ngũ chuyên nghiệp và quy trình chuẩn',
  'Giải pháp sự kiện trọn gói',
];

export function MiceVenue() {
  return (
    <section id="mice-venue" className="py-24 bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gold-400 font-medium tracking-wider uppercase mb-4">
              MICE Venue
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-6">
              Tổ chức sự kiện chuyên nghiệp tại Phuket
            </h2>
            <p className="text-cream-200 text-lg mb-8">
              Không gian hội nghị linh hoạt: 1 Grand Ballroom quy mô lớn + nhiều phòng họp/breakout 
              cùng một tầng, giúp tối ưu vận hành và luồng di chuyển.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                  <span className="text-cream-100">{feature}</span>
                </div>
              ))}
            </div>

            <p className="text-cream-300 italic border-l-4 border-gold-500 pl-4">
              Khách sạn cung cấp giải pháp sự kiện trọn gói cho hội nghị, gala, họp mặt… 
              với đội ngũ chuyên nghiệp và công nghệ hiện đại.
            </p>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-sm overflow-hidden">
              <img
                src="/images/ballroom rpc.jpg"
                alt="RPC Grand Ballroom"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-gold-500 text-navy-900 p-6 rounded-sm shadow-xl">
              <p className="font-serif text-3xl font-semibold">2,300</p>
              <p className="text-sm">khách sức chứa tối đa</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
