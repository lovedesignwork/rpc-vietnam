import { MapPin, Clock, Camera } from 'lucide-react';

const attractions = [
  'Phuket Clock Tower',
  'Thalang Road',
  'Soi Romanee',
  'Thai Hua Museum',
  'Jui Tui Shrine',
  'Khao Rang Hill Viewpoint',
  'Sunday Walking Street (LardYai)',
  'Limelight Avenue',
];

export function Location() {
  return (
    <section id="vi-tri" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-gold-500 font-medium tracking-wider uppercase mb-4">
              Vị trí
            </p>
            <h2 className="font-serif text-4xl font-semibold text-navy-900 mb-4">
              Trung tâm Phố Cổ Phuket
            </h2>
            <p className="text-navy-600 mb-6">
              Phố Cổ Phuket nổi bật với kiến trúc Sino–Portuguese và nhiều góc check-in, 
              trải nghiệm ẩm thực địa phương.
            </p>

            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <Camera className="w-5 h-5 text-gold-500" />
                <span className="font-medium text-navy-900">Gợi ý điểm tham quan gần khách sạn</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {attractions.map((place, index) => (
                  <div key={index} className="flex items-center space-x-2 text-navy-600">
                    <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0" />
                    <span className="text-sm">{place}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-cream-50 rounded-sm p-6">
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-navy-900 mb-1">Di chuyển thuận tiện</p>
                  <p className="text-sm text-navy-600">
                    Phuket Smart Bus (Dragon Line) đón ngay từ sảnh, thuận tiện cho khách đoàn.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-xl">
              <img
                src="/images/old-town.jpg"
                alt="Phuket Old Town"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="mt-4 bg-navy-900 rounded-sm overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.1234567890!2d98.3850!3d7.8850!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sRoyal%20Phuket%20City%20Hotel!5e0!3m2!1sen!2sth!4v1234567890"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Royal Phuket City Hotel Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
