'use client';

import { Phone, FileText } from 'lucide-react';

export function StickyCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-navy-900 border-t border-navy-700 px-4 py-3 safe-area-inset-bottom">
      <div className="flex gap-3">
        <a
          href="#lien-he"
          className="flex-1 btn-primary text-center py-3"
          data-track="sticky_cta_quote"
          data-track-label="Sticky CTA Quote"
        >
          <FileText className="w-5 h-5 mr-2 inline" />
          Nhận báo giá
        </a>
        <a
          href="tel:+6676233333"
          className="flex-1 btn-secondary text-center py-3"
          data-track="sticky_cta_call"
          data-track-label="Sticky CTA Call"
        >
          <Phone className="w-5 h-5 mr-2 inline" />
          Gọi Sales
        </a>
      </div>
    </div>
  );
}
