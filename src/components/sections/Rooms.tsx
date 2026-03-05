import { Wifi, Wind, Coffee, Bath } from 'lucide-react';

const roomTypes = [
  { name: 'Premier Superior Room', size: '30 m²' },
  { name: 'Premier Superior Partial Sea View', size: '30 m²' },
  { name: 'Premier Deluxe Room', size: '38 m²' },
  { name: 'Premier Deluxe Partial Sea View', size: '38 m²' },
  { name: 'Suite', size: '64 m²' },
  { name: 'Executive Suite', size: '75 m²' },
];

const amenities = [
  { icon: Wifi, label: 'Wi-Fi miễn phí' },
  { icon: Wind, label: 'Điều hòa' },
  { icon: Coffee, label: 'Tea/Coffee set' },
  { icon: Bath, label: 'Áo choàng & dép' },
];

export function Rooms() {
  return (
    <section id="phong-nghi" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <p className="text-gold-500 font-medium tracking-wider uppercase mb-4">
              Phòng nghỉ
            </p>
            <h2 className="font-serif text-4xl font-semibold text-navy-900 mb-4">
              251 phòng — phù hợp khách MICE & đoàn lưu trú
            </h2>
            <p className="text-navy-600 mb-6">
              Đa dạng hạng phòng từ tiêu chuẩn đến suite cao cấp, 
              với <span className="font-semibold text-gold-600">50 phòng thông nhau</span> phù hợp gia đình/đoàn.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {roomTypes.map((room, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-cream-50 rounded-sm">
                  <span className="text-sm text-navy-700">{room.name}</span>
                  <span className="text-sm font-medium text-gold-600">{room.size}</span>
                </div>
              ))}
            </div>

            <p className="text-sm text-navy-500 mb-4 font-medium">Tiện nghi trong phòng:</p>
            <div className="flex flex-wrap gap-4 mb-8">
              {amenities.map((item, index) => (
                <div key={index} className="flex items-center space-x-2 text-navy-600">
                  <item.icon className="w-5 h-5 text-gold-500" />
                  <span className="text-sm">{item.label}</span>
                </div>
              ))}
            </div>

            <a
              href="#lien-he"
              className="btn-primary"
              data-track="rooms_cta"
              data-track-label="Rooms CTA"
            >
              Nhận báo giá phòng theo đoàn
            </a>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop"
                alt="Hotel Room"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-navy-900 text-white p-4 rounded-sm shadow-lg">
              <p className="font-serif text-2xl font-semibold">50</p>
              <p className="text-sm text-cream-200">phòng thông nhau</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
