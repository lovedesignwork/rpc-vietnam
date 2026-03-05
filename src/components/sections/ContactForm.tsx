'use client';

import { useState } from 'react';
import { Send, Phone, Mail, MapPin, Loader2, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/tracking';

const eventTypes = [
  'Hội nghị',
  'Training',
  'Gala',
  'Meeting',
  'Khác',
];

const setupTypes = [
  'Theater',
  'Classroom',
  'Banquet',
  'U-Shape',
  'Boardroom',
  'Cocktail',
];

const technicalOptions = [
  'LED',
  'Projector',
  'Âm thanh',
  'Ánh sáng',
];

const fnbOptions = [
  'Coffee break',
  'Lunch',
  'Dinner',
  'Banquet',
];

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    event_type: '',
    guest_count: '',
    event_date: '',
    setup_type: '',
    breakout_needed: 'no',
    breakout_rooms: '',
    technical_needs: [] as string[],
    fnb_needs: [] as string[],
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    trackEvent('form_submit', 'contact_form', { event_type: formData.event_type });

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to submit');

      setIsSuccess(true);
      trackEvent('form_success', 'contact_form');
    } catch {
      setError('Có lỗi xảy ra. Vui lòng thử lại hoặc liên hệ trực tiếp.');
      trackEvent('form_error', 'contact_form');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheckboxChange = (field: 'technical_needs' | 'fnb_needs', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value],
    }));
  };

  if (isSuccess) {
    return (
      <section id="lien-he" className="py-24 bg-cream-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-sm shadow-xl p-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="font-serif text-3xl font-semibold text-navy-900 mb-4">
              Cảm ơn bạn!
            </h2>
            <p className="text-navy-600 mb-8">
              Chúng tôi đã nhận được yêu cầu của bạn. Đội ngũ Sales sẽ liên hệ trong vòng 24 giờ 
              để đề xuất phòng phù hợp (layout + sức chứa + kỹ thuật + F&B).
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="btn-outline"
            >
              Gửi yêu cầu khác
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="lien-he" className="py-24 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-heading">Yêu cầu Proposal & Báo giá</h2>
          <p className="section-subheading">
            Sẵn sàng chốt địa điểm cho sự kiện tại Phuket Old Town?
          </p>
          <div className="gold-divider mt-6" />
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-sm shadow-xl p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="label">Họ tên *</label>
                  <input
                    type="text"
                    required
                    className="input-field"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                <div>
                  <label className="label">Công ty / Tổ chức</label>
                  <input
                    type="text"
                    className="input-field"
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    placeholder="ABC Corporation"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="label">Email *</label>
                  <input
                    type="email"
                    required
                    className="input-field"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@company.com"
                  />
                </div>
                <div>
                  <label className="label">Số điện thoại / WhatsApp</label>
                  <input
                    type="tel"
                    className="input-field"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+84 xxx xxx xxx"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="label">Loại sự kiện *</label>
                  <select
                    required
                    className="input-field"
                    value={formData.event_type}
                    onChange={e => setFormData({ ...formData, event_type: e.target.value })}
                  >
                    <option value="">Chọn loại sự kiện</option>
                    {eventTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label">Số khách dự kiến *</label>
                  <input
                    type="text"
                    required
                    className="input-field"
                    value={formData.guest_count}
                    onChange={e => setFormData({ ...formData, guest_count: e.target.value })}
                    placeholder="500"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="label">Ngày dự kiến</label>
                  <input
                    type="date"
                    className="input-field"
                    value={formData.event_date}
                    onChange={e => setFormData({ ...formData, event_date: e.target.value })}
                  />
                </div>
                <div>
                  <label className="label">Kiểu setup</label>
                  <select
                    className="input-field"
                    value={formData.setup_type}
                    onChange={e => setFormData({ ...formData, setup_type: e.target.value })}
                  >
                    <option value="">Chọn kiểu setup</option>
                    {setupTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="label">Nhu cầu breakout rooms</label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="breakout"
                      value="no"
                      checked={formData.breakout_needed === 'no'}
                      onChange={e => setFormData({ ...formData, breakout_needed: e.target.value })}
                      className="mr-2"
                    />
                    Không
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="breakout"
                      value="yes"
                      checked={formData.breakout_needed === 'yes'}
                      onChange={e => setFormData({ ...formData, breakout_needed: e.target.value })}
                      className="mr-2"
                    />
                    Có
                  </label>
                  {formData.breakout_needed === 'yes' && (
                    <input
                      type="number"
                      className="input-field w-32"
                      placeholder="Số phòng"
                      value={formData.breakout_rooms}
                      onChange={e => setFormData({ ...formData, breakout_rooms: e.target.value })}
                    />
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="label">Nhu cầu kỹ thuật</label>
                  <div className="flex flex-wrap gap-3">
                    {technicalOptions.map(option => (
                      <label key={option} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.technical_needs.includes(option)}
                          onChange={() => handleCheckboxChange('technical_needs', option)}
                          className="mr-2"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="label">F&B</label>
                  <div className="flex flex-wrap gap-3">
                    {fnbOptions.map(option => (
                      <label key={option} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.fnb_needs.includes(option)}
                          onChange={() => handleCheckboxChange('fnb_needs', option)}
                          className="mr-2"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="label">Ghi chú khác</label>
                <textarea
                  className="input-field min-h-[120px]"
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Thông tin bổ sung về sự kiện..."
                />
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  'btn-primary w-full',
                  isSubmitting && 'opacity-70 cursor-not-allowed'
                )}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Đang gửi...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Yêu cầu Proposal & Báo giá
                  </>
                )}
              </button>
            </form>
          </div>

          <div>
            <div className="bg-navy-900 text-white rounded-sm p-8 sticky top-24">
              <h3 className="font-serif text-2xl font-semibold mb-6">Liên hệ trực tiếp</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="w-5 h-5 text-gold-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">Royal Phuket City Hotel</p>
                    <p className="text-cream-300 text-sm">
                      154 Phang-Nga Rd., Muang, Phuket 83000, Thailand
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-5 h-5 text-gold-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">Điện thoại</p>
                    <a
                      href="tel:+6676233333"
                      className="text-cream-300 text-sm hover:text-gold-400 transition-colors"
                      data-track="contact_phone"
                    >
                      +66 76-233-333
                    </a>
                    <div className="text-cream-300 text-sm mt-1">
                      Sales: +66 81 598 9985, +66 94 340 6948
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-5 h-5 text-gold-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      href="mailto:sales@royalphuketcity.com"
                      className="text-cream-300 text-sm hover:text-gold-400 transition-colors block"
                      data-track="contact_email_sales"
                    >
                      sales@royalphuketcity.com
                    </a>
                    <a
                      href="mailto:reservation@royalphuketcity.com"
                      className="text-cream-300 text-sm hover:text-gold-400 transition-colors block"
                      data-track="contact_email_reservation"
                    >
                      reservation@royalphuketcity.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-navy-700">
                <a
                  href="tel:+6676233333"
                  className="btn-primary w-full justify-center mb-3"
                  data-track="contact_call_cta"
                  data-track-label="Contact Call CTA"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Gọi Sales ngay
                </a>
                <a
                  href="https://www.royalphuketcity.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline w-full justify-center text-white border-cream-300 hover:border-gold-400 hover:text-gold-400"
                >
                  www.royalphuketcity.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
