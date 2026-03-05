import { Sparkles, Dumbbell, Waves, Car, Bus } from 'lucide-react';

const amenities = [
  {
    icon: Sparkles,
    name: 'Royal Wellness Spa',
    description: 'Thư giãn và phục hồi sau những giờ làm việc',
  },
  {
    icon: Dumbbell,
    name: 'Fitness Center',
    description: 'Phòng gym hiện đại, đầy đủ thiết bị',
  },
  {
    icon: Waves,
    name: 'Hồ bơi ngoài trời',
    description: 'Không gian thư giãn lý tưởng',
  },
  {
    icon: Car,
    name: 'Bãi đỗ xe',
    description: '350+ chỗ trong/ngoài trời',
  },
  {
    icon: Bus,
    name: 'Phuket Smart Bus',
    description: 'Dragon Line đón tại sảnh, dịch vụ xe riêng theo nhu cầu',
  },
];

export function Amenities() {
  return (
    <section id="tien-ich" className="py-24 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-heading">Tiện ích</h2>
          <p className="section-subheading">
            Đầy đủ tiện nghi cho kỳ lưu trú trọn vẹn
          </p>
          <div className="gold-divider mt-6" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {amenities.map((amenity, index) => (
            <div
              key={index}
              className="bg-white rounded-sm p-6 text-center shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <amenity.icon className="w-8 h-8 text-gold-500" />
              </div>
              <h3 className="font-semibold text-navy-900 mb-2">{amenity.name}</h3>
              <p className="text-sm text-navy-500">{amenity.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
