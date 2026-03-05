'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

const ballroomCapacity = [
  { setup: 'Classroom', capacity: '800' },
  { setup: 'Theater', capacity: '2,300' },
  { setup: 'Cocktail', capacity: '2,000' },
  { setup: 'Banquet (buffet)', capacity: '600' },
  { setup: 'Banquet (set table)', capacity: '1,000' },
];

const meetingRooms = [
  {
    name: 'Raya Room',
    area: '186 m²',
    capacities: { Classroom: '80', Theater: '180', Cocktail: '100' },
  },
  {
    name: 'Hay–Nakha',
    area: '179 m²',
    capacities: { Classroom: '60', Theater: '100', 'U-Shape': '40', Cocktail: '70' },
  },
  {
    name: 'Bon–Maithon',
    area: '142 m²',
    capacities: { Classroom: '60', Theater: '80', 'U-Shape': '40', Cocktail: '60' },
  },
  {
    name: 'Si-Rea',
    area: '26 m²',
    capacities: { Boardroom: '10' },
  },
];

export function Spaces() {
  const [activeTab, setActiveTab] = useState<'ballroom' | 'meeting'>('ballroom');

  return (
    <section id="khong-gian" className="py-24 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-heading">Không gian & Sức chứa</h2>
          <p className="section-subheading">
            Đa dạng không gian phù hợp mọi quy mô sự kiện
          </p>
          <div className="gold-divider mt-6" />
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-sm p-1 shadow-sm">
            <button
              onClick={() => setActiveTab('ballroom')}
              className={cn(
                'px-6 py-3 text-sm font-medium rounded-sm transition-all',
                activeTab === 'ballroom'
                  ? 'bg-navy-900 text-white'
                  : 'text-navy-600 hover:text-navy-900'
              )}
            >
              Grand Ballrooms
            </button>
            <button
              onClick={() => setActiveTab('meeting')}
              className={cn(
                'px-6 py-3 text-sm font-medium rounded-sm transition-all',
                activeTab === 'meeting'
                  ? 'bg-navy-900 text-white'
                  : 'text-navy-600 hover:text-navy-900'
              )}
            >
              Meeting Rooms
            </button>
          </div>
        </div>

        {activeTab === 'ballroom' && (
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop"
                alt="Grand Ballroom"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-serif text-3xl font-semibold text-navy-900 mb-4">
                Phuket Grand Ballrooms
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-sm">
                  <p className="text-sm text-navy-500">Diện tích</p>
                  <p className="font-serif text-2xl font-semibold text-navy-900">1,638 m²</p>
                </div>
                <div className="bg-white p-4 rounded-sm">
                  <p className="text-sm text-navy-500">Chiều cao trần</p>
                  <p className="font-serif text-2xl font-semibold text-navy-900">3–6m</p>
                </div>
              </div>
              
              <div className="bg-white rounded-sm overflow-hidden mb-6">
                <div className="bg-navy-900 text-white px-4 py-3">
                  <p className="font-medium">Sức chứa theo kiểu setup</p>
                </div>
                <div className="divide-y divide-cream-200">
                  {ballroomCapacity.map((item, index) => (
                    <div key={index} className="flex justify-between px-4 py-3">
                      <span className="text-navy-600">{item.setup}</span>
                      <span className="font-semibold text-navy-900">{item.capacity} khách</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 bg-gold-100 text-gold-700 text-sm rounded-full">
                  WiFi 7 (1,800 devices)
                </span>
                <span className="px-3 py-1 bg-gold-100 text-gold-700 text-sm rounded-full">
                  LED 4K P2
                </span>
                <span className="px-3 py-1 bg-gold-100 text-gold-700 text-sm rounded-full">
                  Màn chiếu đa dạng
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'meeting' && (
          <div>
            <p className="text-center text-navy-600 mb-8">
              Các phòng họp/breakout phù hợp cho training, workshop, họp nội bộ, VIP meeting và chia nhóm.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {meetingRooms.map((room, index) => (
                <div key={index} className="card p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-serif text-xl font-semibold text-navy-900">{room.name}</h4>
                    <span className="text-gold-500 font-medium">{room.area}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(room.capacities).map(([setup, cap]) => (
                      <span
                        key={setup}
                        className="px-3 py-1 bg-cream-100 text-navy-700 text-sm rounded-full"
                      >
                        {setup}: {cap}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center mt-12">
          <a
            href="#lien-he"
            className="btn-primary"
            data-track="spaces_cta"
            data-track-label="Spaces CTA"
          >
            Gửi số khách + kiểu setup để nhận phòng đề xuất
          </a>
        </div>
      </div>
    </section>
  );
}
