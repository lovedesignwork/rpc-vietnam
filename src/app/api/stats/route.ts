import { NextRequest, NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const pin = request.headers.get('x-dashboard-pin');
  const expectedPin = process.env.DASHBOARD_PIN;

  if (pin !== expectedPin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const supabase = getServiceSupabase();
    
    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000).toISOString();

    const [
      totalViews,
      todayViews,
      weekViews,
      monthViews,
      realtimeViews,
      uniqueVisitors,
      countries,
      sessions,
      inquiries,
      recentInquiries,
      dailyViews,
      events,
      devices,
    ] = await Promise.all([
      supabase.from('page_views').select('*', { count: 'exact', head: true }),
      supabase.from('page_views').select('*', { count: 'exact', head: true }).gte('created_at', today),
      supabase.from('page_views').select('*', { count: 'exact', head: true }).gte('created_at', weekAgo),
      supabase.from('page_views').select('*', { count: 'exact', head: true }).gte('created_at', monthAgo),
      supabase.from('page_views').select('session_id', { count: 'exact', head: true }).gte('created_at', fiveMinutesAgo),
      supabase.from('page_views').select('session_id').then(res => new Set(res.data?.map(r => r.session_id)).size),
      supabase.from('page_views').select('country'),
      supabase.from('sessions').select('*'),
      supabase.from('inquiries').select('*', { count: 'exact', head: true }),
      supabase.from('inquiries').select('*').order('created_at', { ascending: false }).limit(10),
      supabase.from('page_views')
        .select('created_at')
        .gte('created_at', monthAgo)
        .order('created_at', { ascending: true }),
      supabase.from('events').select('event_type, element_id'),
      supabase.from('page_views').select('device_type'),
    ]);

    const countryData = countries.data?.reduce((acc: Record<string, number>, row) => {
      const c = row.country || 'Unknown';
      acc[c] = (acc[c] || 0) + 1;
      return acc;
    }, {});

    const topCountries = Object.entries(countryData || {})
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(0, 10)
      .map(([country, count]) => ({ country, count }));

    const sessionsData = sessions.data || [];
    const totalSessions = sessionsData.length;
    const bouncedSessions = sessionsData.filter(s => !s.has_interacted && s.duration < 30).length;
    const bounceRate = totalSessions > 0 ? Math.round((bouncedSessions / totalSessions) * 100) : 0;

    const avgDuration = totalSessions > 0
      ? Math.round(sessionsData.reduce((sum, s) => sum + (s.duration || 0), 0) / totalSessions)
      : 0;

    const dailyData = dailyViews.data?.reduce((acc: Record<string, number>, row) => {
      const date = new Date(row.created_at).toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const chartData = Object.entries(dailyData || {})
      .map(([date, views]) => ({ date, views }))
      .sort((a, b) => a.date.localeCompare(b.date));

    const eventCounts = events.data?.reduce((acc: Record<string, number>, row) => {
      const key = `${row.event_type}:${row.element_id || 'unknown'}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    const topEvents = Object.entries(eventCounts || {})
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .slice(0, 10)
      .map(([event, count]) => {
        const [type, element] = event.split(':');
        return { type, element, count };
      });

    const totalViewsCount = totalViews.count || 0;
    const inquiriesCount = inquiries.count || 0;
    const conversionRate = totalViewsCount > 0 
      ? ((inquiriesCount / totalViewsCount) * 100).toFixed(2)
      : '0.00';

    const deviceData = devices.data?.reduce((acc: Record<string, number>, row) => {
      const d = row.device_type || 'unknown';
      acc[d] = (acc[d] || 0) + 1;
      return acc;
    }, {});

    const deviceStats = Object.entries(deviceData || {})
      .sort(([, a], [, b]) => (b as number) - (a as number))
      .map(([device_type, count]) => ({ device_type, count }));

    return NextResponse.json({
      overview: {
        totalViews: totalViewsCount,
        todayViews: todayViews.count || 0,
        weekViews: weekViews.count || 0,
        monthViews: monthViews.count || 0,
        uniqueVisitors,
        realtimeVisitors: realtimeViews.count || 0,
        bounceRate,
        avgDuration,
        totalInquiries: inquiriesCount,
        conversionRate,
      },
      topCountries,
      chartData,
      topEvents,
      deviceStats,
      recentInquiries: recentInquiries.data || [],
    });
  } catch (error) {
    console.error('Stats API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
