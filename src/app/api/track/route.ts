import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const supabase = getServiceSupabase();
    
    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }
    
    const country = request.headers.get('x-vercel-ip-country') || 'Unknown';
    const city = request.headers.get('x-vercel-ip-city') || 'Unknown';
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'Unknown';

    if (body.type === 'pageview') {
      const { error } = await supabase.from('page_views').insert({
        session_id: body.session_id,
        page_path: body.page_path,
        referrer: body.referrer,
        utm_source: body.utm_source,
        utm_medium: body.utm_medium,
        utm_campaign: body.utm_campaign,
        country,
        city,
        device_type: body.device_type,
        browser: body.browser,
        ip_address: ip,
      });

      if (error) {
        console.error('Error inserting page view:', error);
        return NextResponse.json({ error: 'Failed to track' }, { status: 500 });
      }
    } 
    else if (body.type === 'event') {
      const { error } = await supabase.from('events').insert({
        session_id: body.session_id,
        event_type: body.event_type,
        element_id: body.element_id,
        metadata: body.metadata || {},
      });

      if (error) {
        console.error('Error inserting event:', error);
        return NextResponse.json({ error: 'Failed to track' }, { status: 500 });
      }
    }
    else if (body.type === 'session_end') {
      const { error } = await supabase.from('sessions').upsert({
        session_id: body.session_id,
        duration: body.duration,
        has_interacted: body.has_interacted,
        max_scroll: body.max_scroll,
        ended_at: new Date().toISOString(),
      }, {
        onConflict: 'session_id',
      });

      if (error) {
        console.error('Error updating session:', error);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Track API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
