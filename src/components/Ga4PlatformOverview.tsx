import React, { useState, useEffect } from 'react';
import { fetchGA4Data } from '../utils/api';
import { Globe, Users, Clock, MousePointer2, Sparkles, PieChart as PieChartIcon, Loader2, AlertCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { GA4TopPage, GA4TrafficSource } from '../types';

export function Ga4PlatformOverview() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const result = await fetchGA4Data();
        setData(result);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#7A2B20] animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col h-[50vh] items-center justify-center text-center p-6 bg-[#FFF9F9] border border-[#FEE2E2] rounded-2xl">
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
          <span className="text-red-600 font-bold">!</span>
        </div>
        <h3 className="font-serif font-bold text-xl text-[#3E1510] mb-2">The oracle is currently unreachable</h3>
        <p className="text-[#A43927] max-w-md">{error || 'No data found'}</p>
      </div>
    );
  }

  const ga4Kpis = data || { sessions: 0, users: 0, bounceRate: 0, avgSession: 0 };
  const ga4TopPages = data.topPages || [];
  const ga4TrafficSources = data.trafficSources || [];

  // Format avgSession from string/number to mm:ss
  const formatTime = (value: any) => {
    const seconds = parseFloat(value) || 0;
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Give colors to traffic sources
  const sourceColors = ['#3E1510', '#7A2B20', '#DDA77B', '#A88C87', '#EAE3D9'];
  const formattedSources = ga4TrafficSources.map((s: GA4TrafficSource, i: number) => ({
    name: `${s.source} / ${s.medium}`,
    sessions: s.sessions,
    color: sourceColors[i % sourceColors.length]
  })).slice(0, 5); // Limit to top 5 for the pie chart

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif font-bold text-[#3E1510] flex items-center">
            Website Performance (GA4)
          </h2>
          <p className="text-sm text-[#A88C87] font-medium mt-1">Traffic, user engagement, and acquisition on maribeachclub.com</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[65%_1fr] gap-6">
        
        {/* Left Column: 65% Width */}
        <div className="space-y-6">
          {/* Summary KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#EBF4ED] border border-[#D5E6D9] rounded-xl p-4">
              <div className="flex items-center space-x-2 text-[#2E6B3B] mb-2">
                <Globe className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Sessions</span>
              </div>
              <p className="text-xl font-bold text-[#14421E]">{ga4Kpis.sessions.toLocaleString()}</p>
            </div>
            <div className="bg-white border border-[#EAE3D9] rounded-xl p-4">
              <div className="flex items-center space-x-2 text-[#A88C87] mb-2">
                <Users className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Total Users</span>
              </div>
              <p className="text-xl font-bold text-[#3E1510]">{ga4Kpis.users.toLocaleString()}</p>
            </div>
            <div className="bg-white border border-[#EAE3D9] rounded-xl p-4">
              <div className="flex items-center space-x-2 text-[#A88C87] mb-2">
                <MousePointer2 className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Bounce Rate</span>
              </div>
              <p className="text-xl font-bold text-[#3E1510]">{ga4Kpis.bounceRate}%</p>
            </div>
            <div className="bg-white border border-[#EAE3D9] rounded-xl p-4">
              <div className="flex items-center space-x-2 text-[#A88C87] mb-2">
                <Clock className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Avg Session</span>
              </div>
              <p className="text-xl font-bold text-[#3E1510]">{formatTime(ga4Kpis.avgSession)}</p>
            </div>
          </div>

          {/* Top Pages Table */}
          <div className="bg-white border border-[#EAE3D9] rounded-2xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-[#EAE3D9] bg-[#FDF8F3] flex justify-between items-center">
              <h3 className="font-serif font-bold text-[#3E1510] text-lg">Resonant Destinations</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-[10px] uppercase tracking-wider text-[#A88C87] bg-white border-b border-[#EAE3D9]">
                  <tr>
                    <th className="px-6 py-4 font-bold cursor-pointer hover:bg-slate-50">Page Path</th>
                    <th className="px-6 py-4 font-bold text-right cursor-pointer hover:bg-slate-50">Pageviews</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE3D9]">
                  {ga4TopPages.map((page: GA4TopPage, idx: number) => (
                    <tr key={idx} className="hover:bg-[#F9F7F4] transition-colors cursor-pointer">
                      <td className="px-6 py-4">
                        <p className="font-semibold text-[#5C4541] truncate max-w-sm">{page.path}</p>
                      </td>
                      <td className="px-6 py-4 text-right text-[#3E1510] font-medium">{page.views.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: 35% Width */}
        <div className="space-y-6">
          
          {/* AI Insight Dedicated Box (Standardized) */}
          <div className="bg-[#FDF8F3] border border-[#DDA77B]/40 rounded-2xl p-6 shadow-sm relative overflow-hidden">
             {/* Decorative element */}
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <Globe className="w-24 h-24 text-[#DDA77B]" />
             </div>
             
             <div className="relative z-10">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#DDA77B]/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#A43927]" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A2B20]">Intelligence</span>
                </div>
                
                <h4 className="font-serif font-bold text-lg text-[#3E1510] mb-2 leading-tight">
                  A strong desire for elevated comfort
                </h4>
                <p className="text-[#5C4541] text-sm leading-relaxed mb-4">
                  Guests reading through the <span className="font-semibold px-1 bg-white rounded border border-[#EAE3D9]">/vip-daybeds</span> offering are spending significantly longer than average, savoring the details of the experience.
                </p>
                <div className="mt-4 pt-4 border-t border-[#DDA77B]/20">
                  <p className="text-[#A43927] text-xs font-bold flex items-center">
                    Suggestion: Offer a graceful "Connect with our Concierge" prompt on this page to transform contemplation into arrival.
                  </p>
                </div>
             </div>
          </div>

          {/* Traffic Sources Chart (Secondary Insight) */}
          <div className="bg-white border border-[#EAE3D9] rounded-2xl p-6 shadow-sm flex flex-col h-[320px]">
            <div className="flex items-center space-x-2 mb-4">
              <PieChartIcon className="w-5 h-5 text-[#3E1510]" />
              <h3 className="font-serif font-bold text-[#3E1510] text-lg">Flow of Arrivals</h3>
            </div>
            
            <div className="flex-1 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={formattedSources}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="sessions"
                    stroke="none"
                  >
                    {formattedSources.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    formatter={(value: number) => [`${value.toLocaleString()} Sessions`, 'Traffic']}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #EAE3D9', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Custom Legend to match aesthetic */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#3E1510]">{Math.round((ga4Kpis.sessions / 1000))}k</p>
                  <p className="text-[10px] font-bold text-[#A88C87] uppercase tracking-widest">Sessions</p>
                </div>
              </div>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-2">
               {formattedSources.map((source: { name: string; color: string }, idx: number) => (
                 <div key={idx} className="flex items-center text-[11px] font-semibold text-[#5C4541]">
                   <div className="w-2.5 h-2.5 rounded-full mr-2 shrink-0" style={{ backgroundColor: source.color }}></div>
                   <span className="truncate" title={source.name}>{source.name}</span>
                 </div>
               ))}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
