'use client';

import { useEffect, useRef } from 'react';
import { trackPageView, trackEvent, generateSessionId } from '@/lib/tracking';

export function Tracker() {
  const hasTracked = useRef(false);
  const scrollDepths = useRef<Set<number>>(new Set());

  useEffect(() => {
    if (hasTracked.current) return;
    hasTracked.current = true;

    trackPageView();

    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      const depths = [25, 50, 75, 100];
      for (const depth of depths) {
        if (scrollPercent >= depth && !scrollDepths.current.has(depth)) {
          scrollDepths.current.add(depth);
          trackEvent('scroll', undefined, { depth });
        }
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const trackableElement = target.closest('[data-track]');
      
      if (trackableElement) {
        const trackId = trackableElement.getAttribute('data-track');
        const trackLabel = trackableElement.getAttribute('data-track-label');
        trackEvent('click', trackId || undefined, { label: trackLabel });
      }

      if (target.tagName === 'A') {
        const href = target.getAttribute('href');
        if (href?.startsWith('tel:')) {
          trackEvent('click', 'phone_call', { href });
        } else if (href?.startsWith('mailto:')) {
          trackEvent('click', 'email_click', { href });
        }
      }
    };

    const sessionId = generateSessionId();
    const sessionStart = Date.now();
    
    const handleBeforeUnload = () => {
      const duration = Math.round((Date.now() - sessionStart) / 1000);
      const hasInteracted = scrollDepths.current.size > 0;
      
      navigator.sendBeacon('/api/track', JSON.stringify({
        type: 'session_end',
        session_id: sessionId,
        duration,
        has_interacted: hasInteracted,
        max_scroll: Math.max(...Array.from(scrollDepths.current), 0),
      }));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('click', handleClick);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClick);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return null;
}
