'use client';

import { useState, useEffect, useCallback } from 'react';
import { PinGate } from '@/components/PinGate';
import { CountryFlag } from '@/components/CountryFlag';
import { 
  Users, Eye, Clock, TrendingUp, Globe, MousePointer, 
  Mail, RefreshCw, Activity, MoreHorizontal, ExternalLink,
  Monitor, Smartphone, Tablet, Percent, Timer, Target, Calendar
} from 'lucide-react';
import { formatDateTime } from '@/lib/utils';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
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
  deviceStats?: { device_type: string; count: number }[];
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

const DEVICE_COLORS = {
  desktop: '#6366f1',
  mobile: '#22c55e', 
  tablet: '#f59e0b',
  unknown: '#6b7280'
};

const DEVICE_ICONS = {
  desktop: Monitor,
  mobile: Smartphone,
  tablet: Tablet,
  unknown: Monitor
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

  const totalDevices = stats?.deviceStats?.reduce((sum, d) => sum + d.count, 0) || 0;

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#0f0f0f]/80 backdrop-blur-xl border-b border-[#1f1f1f]">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-[15px] font-semibold text-white">Analytics</h1>
                <p className="text-[12px] text-[#666]">Royal Phuket City · Vietnam</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {lastUpdated && (
                <span className="text-[12px] text-[#666]">
                  {formatDateTime(lastUpdated)}
                </span>
              )}
              <button
                onClick={fetchStats}
                disabled={isLoading}
                className="p-2 hover:bg-[#1a1a1a] rounded-lg transition-colors"
              >
                <RefreshCw className={`w-4 h-4 text-[#666] ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {stats && (
          <div className="space-y-6">
            {/* Real-time indicator */}
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[14px] text-white">
                <span className="font-semibold">{stats.overview.realtimeVisitors}</span>
                <span className="text-[#666]"> visitors online</span>
              </span>
            </div>

            {/* Primary Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MetricCard 
                label="Today" 
                value={stats.overview.todayViews}
                icon={Eye}
              />
              <MetricCard 
                label="This Week" 
                value={stats.overview.weekViews}
                icon={TrendingUp}
              />
              <MetricCard 
                label="Unique Visitors" 
                value={stats.overview.uniqueVisitors}
                icon={Users}
              />
              <MetricCard 
                label="Inquiries" 
                value={stats.overview.totalInquiries}
                icon={Mail}
                highlight
              />
            </div>

            {/* Secondary Stats - Now as Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <SecondaryCard
                label="Bounce Rate"
                value={`${stats.overview.bounceRate}%`}
                icon={Percent}
                status={stats.overview.bounceRate < 50 ? 'good' : 'warning'}
              />
              <SecondaryCard
                label="Avg. Duration"
                value={formatDuration(stats.overview.avgDuration)}
                icon={Timer}
              />
              <SecondaryCard
                label="Conversion"
                value={`${stats.overview.conversionRate}%`}
                icon={Target}
              />
              <SecondaryCard
                label="This Month"
                value={stats.overview.monthViews}
                icon={Calendar}
                suffix="views"
              />
            </div>

            {/* Chart and Devices Row */}
            <div className="grid lg:grid-cols-3 gap-4">
              {/* Chart Section */}
              <div className="lg:col-span-2 bg-[#141414] border border-[#1f1f1f] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-[14px] font-medium text-white">Page Views</h2>
                  <span className="text-[12px] text-[#666]">Last 30 days</span>
                </div>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stats.chartData}>
                      <defs>
                        <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis 
                        dataKey="date" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 11, fill: '#444' }}
                        tickFormatter={(value) => new Date(value).toLocaleDateString('en', { day: 'numeric' })}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 11, fill: '#444' }}
                        width={30}
                      />
                      <Tooltip 
                        labelFormatter={(value) => new Date(value).toLocaleDateString('en', { month: 'short', day: 'numeric' })}
                        contentStyle={{ 
                          background: '#1a1a1a', 
                          border: '1px solid #2a2a2a', 
                          borderRadius: '12px', 
                          color: 'white',
                          fontSize: '12px',
                          padding: '10px 14px'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="views" 
                        stroke="#f59e0b" 
                        strokeWidth={2}
                        fill="url(#colorViews)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Device Types */}
              <div className="bg-[#141414] border border-[#1f1f1f] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[14px] font-medium text-white">Devices</h2>
                  <Monitor className="w-4 h-4 text-[#444]" />
                </div>
                
                {stats.deviceStats && stats.deviceStats.length > 0 ? (
                  <>
                    <div className="h-[120px] flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={stats.deviceStats}
                            cx="50%"
                            cy="50%"
                            innerRadius={35}
                            outerRadius={50}
                            paddingAngle={4}
                            dataKey="count"
                          >
                            {stats.deviceStats.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={DEVICE_COLORS[entry.device_type as keyof typeof DEVICE_COLORS] || DEVICE_COLORS.unknown}
                              />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="space-y-3 mt-4">
                      {stats.deviceStats.map((device, index) => {
                        const Icon = DEVICE_ICONS[device.device_type as keyof typeof DEVICE_ICONS] || Monitor;
                        const color = DEVICE_COLORS[device.device_type as keyof typeof DEVICE_COLORS] || DEVICE_COLORS.unknown;
                        const percentage = totalDevices > 0 ? Math.round((device.count / totalDevices) * 100) : 0;
                        
                        return (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: color }}
                              />
                              <Icon className="w-4 h-4 text-[#666]" />
                              <span className="text-[13px] text-[#999] capitalize">{device.device_type}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[13px] text-white font-medium">{device.count}</span>
                              <span className="text-[11px] text-[#666]">{percentage}%</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <div className="h-[180px] flex flex-col items-center justify-center text-[#444]">
                    <Monitor className="w-8 h-8 mb-2" />
                    <span className="text-[13px]">No device data yet</span>
                  </div>
                )}
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-2 gap-4">
              {/* Countries */}
              <div className="bg-[#141414] border border-[#1f1f1f] rounded-2xl overflow-hidden">
                <div className="px-5 py-4 border-b border-[#1f1f1f] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#666]" />
                    <h2 className="text-[14px] font-medium text-white">Top Countries</h2>
                  </div>
                  <button className="p-1 hover:bg-[#1a1a1a] rounded-lg transition-colors">
                    <MoreHorizontal className="w-4 h-4 text-[#666]" />
                  </button>
                </div>
                <div className="divide-y divide-[#1f1f1f]">
                  {stats.topCountries.slice(0, 6).map((country, index) => (
                    <div key={index} className="px-5 py-3 flex items-center justify-between hover:bg-[#1a1a1a] transition-colors">
                      <div className="flex items-center gap-3">
                        <CountryFlag countryCode={country.country} size="md" />
                        <span className="text-[13px] text-[#ccc]">{country.country}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-20 h-1.5 bg-[#1f1f1f] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-amber-500 rounded-full"
                            style={{ 
                              width: `${Math.min(100, (country.count / (stats.topCountries[0]?.count || 1)) * 100)}%` 
                            }}
                          />
                        </div>
                        <span className="text-[13px] font-medium text-white w-8 text-right">
                          {country.count}
                        </span>
                      </div>
                    </div>
                  ))}
                  {stats.topCountries.length === 0 && (
                    <div className="px-5 py-8 text-center text-[#444]">
                      <Globe className="w-6 h-6 mx-auto mb-2" />
                      <span className="text-[13px]">No country data yet</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Events */}
              <div className="bg-[#141414] border border-[#1f1f1f] rounded-2xl overflow-hidden">
                <div className="px-5 py-4 border-b border-[#1f1f1f] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MousePointer className="w-4 h-4 text-[#666]" />
                    <h2 className="text-[14px] font-medium text-white">Top Events</h2>
                  </div>
                  <button className="p-1 hover:bg-[#1a1a1a] rounded-lg transition-colors">
                    <MoreHorizontal className="w-4 h-4 text-[#666]" />
                  </button>
                </div>
                <div className="divide-y divide-[#1f1f1f]">
                  {stats.topEvents.slice(0, 6).map((event, index) => (
                    <div key={index} className="px-5 py-3 flex items-center justify-between hover:bg-[#1a1a1a] transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 bg-[#1f1f1f] rounded-lg flex items-center justify-center">
                          <span className="text-[10px] font-semibold text-[#666] uppercase">
                            {event.type.slice(0, 2)}
                          </span>
                        </span>
                        <span className="text-[13px] text-[#ccc] truncate max-w-[180px]">
                          {event.element}
                        </span>
                      </div>
                      <span className="text-[13px] font-medium text-white">{event.count}</span>
                    </div>
                  ))}
                  {stats.topEvents.length === 0 && (
                    <div className="px-5 py-8 text-center text-[#444]">
                      <MousePointer className="w-6 h-6 mx-auto mb-2" />
                      <span className="text-[13px]">No events yet</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Inquiries */}
            <div className="bg-[#141414] border border-[#1f1f1f] rounded-2xl overflow-hidden">
              <div className="px-5 py-4 border-b border-[#1f1f1f] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#666]" />
                  <h2 className="text-[14px] font-medium text-white">Recent Inquiries</h2>
                </div>
                <span className="text-[12px] px-2.5 py-1 bg-amber-500/10 text-amber-500 rounded-full font-medium">
                  {stats.overview.totalInquiries} total
                </span>
              </div>
              {stats.recentInquiries.length > 0 ? (
                <div className="divide-y divide-[#1f1f1f]">
                  {stats.recentInquiries.slice(0, 5).map((inquiry) => (
                    <div key={inquiry.id} className="px-5 py-4 hover:bg-[#1a1a1a] transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[13px] font-medium text-white">{inquiry.name}</span>
                            {inquiry.country && (
                              <CountryFlag countryCode={inquiry.country} size="sm" />
                            )}
                          </div>
                          <p className="text-[12px] text-[#666] truncate">
                            {inquiry.company || inquiry.email}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-[11px] px-2 py-1 bg-[#1f1f1f] text-[#888] rounded-lg">
                            {inquiry.event_type}
                          </span>
                          <span className="text-[11px] px-2 py-1 bg-indigo-500/10 text-indigo-400 rounded-lg">
                            {inquiry.guest_count} pax
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Clock className="w-3 h-3 text-[#444]" />
                        <span className="text-[11px] text-[#444]">
                          {formatDateTime(inquiry.created_at)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-5 py-12 text-center">
                  <Mail className="w-8 h-8 text-[#2a2a2a] mx-auto mb-3" />
                  <p className="text-[13px] text-[#666]">No inquiries yet</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-center gap-2 text-[12px] text-[#444] pt-4">
              <span>Royal Phuket City Hotel</span>
              <span>·</span>
              <a href="/" className="hover:text-[#666] flex items-center gap-1 transition-colors">
                View Landing Page <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}

        {!stats && isLoading && (
          <div className="flex flex-col items-center justify-center h-64 gap-3">
            <RefreshCw className="w-6 h-6 text-[#444] animate-spin" />
            <span className="text-[13px] text-[#666]">Loading analytics...</span>
          </div>
        )}
      </main>
    </div>
  );
}

function MetricCard({ 
  label, 
  value, 
  icon: Icon,
  highlight
}: { 
  label: string; 
  value: string | number; 
  icon: React.ElementType;
  highlight?: boolean;
}) {
  return (
    <div className={`
      p-5 rounded-2xl border transition-all
      ${highlight 
        ? 'bg-gradient-to-br from-amber-500/10 to-orange-500/5 border-amber-500/20' 
        : 'bg-[#141414] border-[#1f1f1f] hover:border-[#2a2a2a]'
      }
    `}>
      <div className="flex items-center justify-between mb-4">
        <Icon className={`w-5 h-5 ${highlight ? 'text-amber-500' : 'text-[#444]'}`} />
      </div>
      <p className="text-[28px] font-semibold text-white tracking-tight">{value}</p>
      <p className="text-[13px] text-[#666] mt-1">{label}</p>
    </div>
  );
}

function SecondaryCard({ 
  label, 
  value, 
  icon: Icon,
  status,
  suffix
}: { 
  label: string; 
  value: string | number; 
  icon: React.ElementType;
  status?: 'good' | 'warning' | 'bad';
  suffix?: string;
}) {
  const statusColors = {
    good: 'text-emerald-400',
    warning: 'text-amber-400',
    bad: 'text-red-400'
  };

  return (
    <div className="p-4 rounded-2xl bg-[#141414] border border-[#1f1f1f] hover:border-[#2a2a2a] transition-all">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-4 h-4 text-[#444]" />
        <span className="text-[12px] text-[#666]">{label}</span>
      </div>
      <p className={`text-[22px] font-semibold tracking-tight ${status ? statusColors[status] : 'text-white'}`}>
        {value}
        {suffix && <span className="text-[14px] text-[#666] ml-1">{suffix}</span>}
      </p>
    </div>
  );
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}m ${secs}s`;
}
