'use client';

import { useState, useEffect, useCallback } from 'react';
import { PinGate } from '@/components/PinGate';
import { 
  Users, Eye, Clock, TrendingUp, Globe, MousePointer, 
  Mail, RefreshCw, ArrowUp, ArrowDown, Activity
} from 'lucide-react';
import { formatDateTime } from '@/lib/utils';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

interface Stats {
  overview: {
    totalViews: number;
    todayViews: number;
    weekViews: number;
    monthViews: number;
    uniqueVisitors: number;
    realtimeVisitors: number;
    bounceRate: number;
    avgDuration: number;
    totalInquiries: number;
    conversionRate: string;
  };
  topCountries: { country: string; count: number }[];
  chartData: { date: string; views: number }[];
  topEvents: { type: string; element: string; count: number }[];
  recentInquiries: {
    id: string;
    name: string;
    company: string;
    email: string;
    event_type: string;
    guest_count: string;
    created_at: string;
    country: string;
  }[];
}

const countryFlags: Record<string, string> = {
  'VN': '🇻🇳',
  'TH': '🇹🇭',
  'SG': '🇸🇬',
  'MY': '🇲🇾',
  'ID': '🇮🇩',
  'CN': '🇨🇳',
  'JP': '🇯🇵',
  'KR': '🇰🇷',
  'US': '🇺🇸',
  'AU': '🇦🇺',
  'GB': '🇬🇧',
  'DE': '🇩🇪',
  'FR': '🇫🇷',
  'Unknown': '🌐',
};

export default function DashboardPage() {
  const [pin, setPin] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchStats = useCallback(async () => {
    if (!pin) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/stats', {
        headers: { 'x-dashboard-pin': pin },
      });
      
      if (response.ok) {
        const data = await response.json();
        setStats(data);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setIsLoading(false);
    }
  }, [pin]);

  useEffect(() => {
    if (pin) {
      fetchStats();
      const interval = setInterval(fetchStats, 30000);
      return () => clearInterval(interval);
    }
  }, [pin, fetchStats]);

  if (!pin) {
    return <PinGate onSuccess={setPin} />;
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <header className="bg-navy-900 text-white py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="font-serif text-2xl font-semibold">Analytics Dashboard</h1>
            <p className="text-cream-300 text-sm">Royal Phuket City Hotel - Vietnam Landing</p>
          </div>
          <div className="flex items-center gap-4">
            {lastUpdated && (
              <span className="text-cream-400 text-sm hidden sm:block">
                Updated: {formatDateTime(lastUpdated)}
              </span>
            )}
            <button
              onClick={fetchStats}
              disabled={isLoading}
              className="p-2 bg-navy-800 rounded-sm hover:bg-navy-700 transition-colors"
            >
              <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {stats && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
              <StatCard
                icon={Activity}
                label="Real-time"
                value={stats.overview.realtimeVisitors}
                subtitle="visitors now"
                highlight
              />
              <StatCard
                icon={Eye}
                label="Today"
                value={stats.overview.todayViews}
                subtitle="page views"
              />
              <StatCard
                icon={Users}
                label="Unique"
                value={stats.overview.uniqueVisitors}
                subtitle="total visitors"
              />
              <StatCard
                icon={TrendingUp}
                label="Bounce Rate"
                value={`${stats.overview.bounceRate}%`}
                subtitle={stats.overview.bounceRate < 50 ? 'Good' : 'Needs work'}
                trend={stats.overview.bounceRate < 50 ? 'up' : 'down'}
              />
              <StatCard
                icon={Clock}
                label="Avg Duration"
                value={formatDuration(stats.overview.avgDuration)}
                subtitle="per session"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard
                icon={Eye}
                label="This Week"
                value={stats.overview.weekViews}
                subtitle="page views"
              />
              <StatCard
                icon={Eye}
                label="This Month"
                value={stats.overview.monthViews}
                subtitle="page views"
              />
              <StatCard
                icon={Mail}
                label="Inquiries"
                value={stats.overview.totalInquiries}
                subtitle="total submissions"
              />
              <StatCard
                icon={TrendingUp}
                label="Conversion"
                value={`${stats.overview.conversionRate}%`}
                subtitle="inquiries/views"
              />
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2 bg-white rounded-sm shadow-sm p-6">
                <h3 className="font-semibold text-navy-900 mb-4">Page Views (30 days)</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stats.chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2d7c4" />
                      <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => new Date(value).toLocaleDateString('vi-VN', { day: 'numeric', month: 'short' })}
                      />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip 
                        labelFormatter={(value) => new Date(value).toLocaleDateString('vi-VN')}
                        contentStyle={{ background: '#1a1a2e', border: 'none', borderRadius: '4px', color: 'white' }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="views" 
                        stroke="#d4af37" 
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-sm shadow-sm p-6">
                <h3 className="font-semibold text-navy-900 mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-gold-500" />
                  Top Countries
                </h3>
                <div className="space-y-3">
                  {stats.topCountries.slice(0, 8).map((country, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span>{countryFlags[country.country] || '🌐'}</span>
                        <span className="text-navy-700">{country.country}</span>
                      </span>
                      <span className="font-medium text-navy-900">{country.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-sm shadow-sm p-6">
                <h3 className="font-semibold text-navy-900 mb-4 flex items-center gap-2">
                  <MousePointer className="w-5 h-5 text-gold-500" />
                  Top Events
                </h3>
                <div className="space-y-2">
                  {stats.topEvents.slice(0, 8).map((event, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-cream-200 last:border-0">
                      <div>
                        <span className="text-xs text-gold-600 uppercase">{event.type}</span>
                        <p className="text-navy-700 text-sm">{event.element}</p>
                      </div>
                      <span className="font-medium text-navy-900">{event.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-sm shadow-sm p-6">
                <h3 className="font-semibold text-navy-900 mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-gold-500" />
                  Recent Inquiries
                </h3>
                <div className="space-y-3">
                  {stats.recentInquiries.slice(0, 5).map((inquiry) => (
                    <div key={inquiry.id} className="p-3 bg-cream-50 rounded-sm">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-navy-900">{inquiry.name}</span>
                        <span className="text-xs text-navy-400">
                          {formatDateTime(inquiry.created_at)}
                        </span>
                      </div>
                      <p className="text-sm text-navy-600">{inquiry.company || inquiry.email}</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-xs px-2 py-1 bg-gold-100 text-gold-700 rounded-full">
                          {inquiry.event_type}
                        </span>
                        <span className="text-xs px-2 py-1 bg-navy-100 text-navy-700 rounded-full">
                          {inquiry.guest_count} guests
                        </span>
                        {inquiry.country && (
                          <span className="text-xs px-2 py-1 bg-cream-200 text-navy-600 rounded-full">
                            {countryFlags[inquiry.country] || '🌐'} {inquiry.country}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {!stats && isLoading && (
          <div className="flex items-center justify-center h-64">
            <RefreshCw className="w-8 h-8 text-gold-500 animate-spin" />
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({ 
  icon: Icon, 
  label, 
  value, 
  subtitle, 
  highlight,
  trend 
}: { 
  icon: React.ElementType;
  label: string; 
  value: string | number; 
  subtitle: string;
  highlight?: boolean;
  trend?: 'up' | 'down';
}) {
  return (
    <div className={`rounded-sm p-4 ${highlight ? 'bg-navy-900 text-white' : 'bg-white shadow-sm'}`}>
      <div className="flex items-center justify-between mb-2">
        <Icon className={`w-5 h-5 ${highlight ? 'text-gold-400' : 'text-gold-500'}`} />
        {trend && (
          trend === 'up' 
            ? <ArrowUp className="w-4 h-4 text-green-500" />
            : <ArrowDown className="w-4 h-4 text-red-500" />
        )}
      </div>
      <p className={`text-xs ${highlight ? 'text-cream-300' : 'text-navy-500'}`}>{label}</p>
      <p className={`text-2xl font-serif font-semibold ${highlight ? 'text-white' : 'text-navy-900'}`}>
        {value}
      </p>
      <p className={`text-xs ${highlight ? 'text-cream-400' : 'text-navy-400'}`}>{subtitle}</p>
    </div>
  );
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}m ${secs}s`;
}
