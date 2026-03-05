'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

const miceFacilityData = [
  { name: 'Grand Ballroom', area: '1,637', height: '6', classroom: '800', theatre: '2,300', uShape: '-', boardroom: '-', cocktail: '2,000', banquetBuffet: '600', banquetSet: '1,000' },
  { name: 'Ballroom 1 & 2', area: '1,023', height: '6', classroom: '450', theatre: '1,000', uShape: '120', boardroom: '120', cocktail: '1,200', banquetBuffet: '350', banquetSet: '450' },
  { name: 'Ballroom 1 & 4', area: '996', height: '-', classroom: '400', theatre: '900', uShape: '-', boardroom: '-', cocktail: '700', banquetBuffet: '350', banquetSet: '450' },
  { name: 'Ballroom 2 & 3', area: '642', height: '-', classroom: '200', theatre: '400', uShape: '60', boardroom: '60', cocktail: '250', banquetBuffet: '200', banquetSet: '300' },
  { name: 'Ballroom 1', area: '617', height: '6', classroom: '300', theatre: '500', uShape: '60', boardroom: '60', cocktail: '250', banquetBuffet: '200', banquetSet: '250' },
  { name: 'Ballroom 2', area: '405', height: '6', classroom: '140', theatre: '300', uShape: '45', boardroom: '45', cocktail: '150', banquetBuffet: '170', banquetSet: '200' },
  { name: 'Ballroom 3', area: '236', height: '3', classroom: '-', theatre: '-', uShape: '-', boardroom: '-', cocktail: '-', banquetBuffet: '-', banquetSet: '-' },
  { name: 'Ballroom 4', area: '378', height: '3', classroom: '-', theatre: '-', uShape: '-', boardroom: '-', cocktail: '-', banquetBuffet: '-', banquetSet: '-' },
  { name: 'Raya', area: '186', height: '3', classroom: '80', theatre: '180', uShape: '40', boardroom: '40', cocktail: '100', banquetBuffet: '70', banquetSet: '90' },
  { name: 'Hay', area: '109', height: '3', classroom: '30', theatre: '40', uShape: '20', boardroom: '20', cocktail: '30', banquetBuffet: '30', banquetSet: '40' },
  { name: 'Nakha', area: '70', height: '3', classroom: '20', theatre: '30', uShape: '20', boardroom: '20', cocktail: '20', banquetBuffet: '-', banquetSet: '30' },
  { name: 'Hay - Nakha', area: '179', height: '3', classroom: '60', theatre: '100', uShape: '40', boardroom: '40', cocktail: '70', banquetBuffet: '60', banquetSet: '70' },
  { name: 'Bon', area: '66', height: '3', classroom: '20', theatre: '40', uShape: '20', boardroom: '20', cocktail: '20', banquetBuffet: '-', banquetSet: '30' },
  { name: 'Maithon', area: '77', height: '3', classroom: '20', theatre: '40', uShape: '20', boardroom: '20', cocktail: '20', banquetBuffet: '-', banquetSet: '30' },
  { name: 'Bon - Maithong', area: '142', height: '3', classroom: '60', theatre: '80', uShape: '40', boardroom: '40', cocktail: '60', banquetBuffet: '50', banquetSet: '60' },
  { name: 'Si-Rea', area: '26', height: '3', classroom: '-', theatre: '-', uShape: '-', boardroom: '10', cocktail: '-', banquetBuffet: '-', banquetSet: '-' },
];

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
          <div className="space-y-12">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="aspect-[4/3] rounded-sm overflow-hidden shadow-lg">
                <img
                  src="/images/rpc-ballroom.jpg"
                  alt="RPC Grand Ballroom"
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

            {/* Ballroom Floor Plan Map */}
            <div>
              <h3 className="font-serif text-xl font-semibold text-navy-900 mb-4">
                Sơ đồ bố trí Grand Ballroom
              </h3>
              <div className="rounded-lg overflow-hidden shadow-lg border border-cream-200">
                <img
                  src="/images/map-ballroom.jpg"
                  alt="Sơ đồ bố trí Grand Ballroom"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* MICE Facility Table */}
            <div>
              <h3 className="font-serif text-xl font-semibold text-navy-900 mb-4 text-center">
                MICE Facility
              </h3>
              <div className="overflow-x-auto rounded-lg border border-cream-200 shadow-sm">
                <table className="w-full min-w-[900px] text-sm">
                  <thead>
                    <tr className="bg-[#c9a962] text-navy-900">
                      <th className="px-3 py-3 text-left font-semibold">Name</th>
                      <th className="px-3 py-3 text-center font-semibold">Area (m²)</th>
                      <th className="px-3 py-3 text-center font-semibold">Height (m)</th>
                      <th className="px-3 py-3 text-center font-semibold">Classroom</th>
                      <th className="px-3 py-3 text-center font-semibold">Theatre</th>
                      <th className="px-3 py-3 text-center font-semibold">U-Shape</th>
                      <th className="px-3 py-3 text-center font-semibold">Boardroom</th>
                      <th className="px-3 py-3 text-center font-semibold">Cocktail</th>
                      <th className="px-3 py-3 text-center font-semibold">Banquet Buffet</th>
                      <th className="px-3 py-3 text-center font-semibold">Banquet Set</th>
                    </tr>
                  </thead>
                  <tbody>
                    {miceFacilityData.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-cream-50' : 'bg-white'}>
                        <td className="px-3 py-2.5 font-medium text-navy-900">{row.name}</td>
                        <td className="px-3 py-2.5 text-center text-navy-700">{row.area}</td>
                        <td className="px-3 py-2.5 text-center text-navy-700">{row.height}</td>
                        <td className="px-3 py-2.5 text-center text-navy-700">{row.classroom}</td>
                        <td className="px-3 py-2.5 text-center text-navy-700">{row.theatre}</td>
                        <td className="px-3 py-2.5 text-center text-navy-700">{row.uShape}</td>
                        <td className="px-3 py-2.5 text-center text-navy-700">{row.boardroom}</td>
                        <td className="px-3 py-2.5 text-center text-navy-700">{row.cocktail}</td>
                        <td className="px-3 py-2.5 text-center text-navy-700">{row.banquetBuffet}</td>
                        <td className="px-3 py-2.5 text-center text-navy-700">{row.banquetSet}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
