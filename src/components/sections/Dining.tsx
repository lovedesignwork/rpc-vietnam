import { Clock, UtensilsCrossed, Wine, Coffee as CoffeeIcon, Star } from 'lucide-react';

const restaurants = [
  {
    name: 'Yan Long',
    type: 'Chinese Restaurant',
    description: 'À la carte & set menu, có phòng riêng',
    hours: '11:00–22:00',
    icon: UtensilsCrossed,
  },
  {
    name: 'Good Eatz 154',
    type: 'All-day Eatery',
    description: 'Ẩm thực đa dạng suốt ngày',
    hours: 'All day',
    icon: UtensilsCrossed,
  },
  {
    name: '154 Bakery',
    type: 'Bakery',
    description: 'Bánh ngọt nổi tiếng địa phương',
    hours: 'Morning–Evening',
    icon: CoffeeIcon,
  },
  {
    name: 'Atrium Lounge',
    type: 'Piano Bar',
    description: 'Không gian thư giãn với nhạc piano',
    hours: 'Evening',
    icon: Wine,
  },
  {
    name: 'TWIST Rooftop',
    type: 'Restaurant & Bar',
    description: 'Rooftop dining & signature drinks',
    hours: 'Evening',
    icon: Star,
  },
];

export function Dining() {
  return (
    <section id="am-thuc" className="py-24 bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-4">Ẩm thực</h2>
          <p className="text-cream-200 text-lg max-w-2xl mx-auto">
            Từ coffee break, set menu, đến gala dinner/banquet — đội ngũ F&B thiết kế 
            trải nghiệm phù hợp mục tiêu sự kiện và ngân sách.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-400 mx-auto mt-6" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {restaurants.map((restaurant, index) => (
            <div
              key={index}
              className="bg-navy-800/50 border border-navy-700 rounded-sm p-6 
                       hover:border-gold-500/50 transition-colors group"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-serif text-xl font-semibold text-white group-hover:text-gold-400 transition-colors">
                    {restaurant.name}
                  </h3>
                  <p className="text-gold-400 text-sm">{restaurant.type}</p>
                </div>
                <restaurant.icon className="w-6 h-6 text-gold-500/60" />
              </div>
              <p className="text-cream-300 text-sm mb-4">{restaurant.description}</p>
              <div className="flex items-center text-cream-400 text-sm">
                <Clock className="w-4 h-4 mr-2" />
                {restaurant.hours}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gold-500/10 border border-gold-500/30 rounded-sm p-8 text-center">
          <h3 className="font-serif text-2xl font-semibold text-white mb-2">
            Royal Breakfast
          </h3>
          <p className="text-cream-200 mb-4">
            Buffet sáng 06:30–10:30 với lựa chọn địa phương & kiểu Tây
          </p>
          <a
            href="#lien-he"
            className="btn-primary"
            data-track="dining_cta"
            data-track-label="Dining CTA"
          >
            Nhận gợi ý menu & ngân sách
          </a>
        </div>
      </div>
    </section>
  );
}
