export function generateSessionId(): string {
  if (typeof window === 'undefined') return '';
  
  let sessionId = sessionStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('session_id', sessionId);
  }
  return sessionId;
}

export function getDeviceType(): string {
  if (typeof window === 'undefined') return 'unknown';
  
  const ua = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(ua)) return 'tablet';
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) return 'mobile';
  return 'desktop';
}

export function getBrowserInfo(): string {
  if (typeof window === 'undefined') return 'unknown';
  
  const ua = navigator.userAgent;
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Safari')) return 'Safari';
  if (ua.includes('Edge')) return 'Edge';
  if (ua.includes('Opera')) return 'Opera';
  return 'Other';
}

export function getUtmParams(): Record<string, string | null> {
  if (typeof window === 'undefined') return {};
  
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source'),
    utm_medium: params.get('utm_medium'),
    utm_campaign: params.get('utm_campaign'),
  };
}

export async function trackEvent(
  eventType: string, 
  elementId?: string, 
  metadata?: Record<string, unknown>
): Promise<void> {
  try {
    const sessionId = generateSessionId();
    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'event',
        session_id: sessionId,
        event_type: eventType,
        element_id: elementId,
        metadata,
      }),
    });
  } catch (error) {
    console.error('Failed to track event:', error);
  }
}

export async function trackPageView(): Promise<void> {
  try {
    const sessionId = generateSessionId();
    const utmParams = getUtmParams();
    const deviceType = getDeviceType();
    const browser = getBrowserInfo();

    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'pageview',
        session_id: sessionId,
        page_path: window.location.pathname,
        referrer: document.referrer || null,
        device_type: deviceType,
        browser,
        ...utmParams,
      }),
    });
  } catch (error) {
    console.error('Failed to track page view:', error);
  }
}
