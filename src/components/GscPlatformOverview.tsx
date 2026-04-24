import React from 'react';
import { useGSCData } from '../hooks/useRealData';
import { Search, MousePointerClick, Eye, Target, Sparkles, TrendingUp, ArrowUpRight, Loader2, AlertCircle } from 'lucide-react';
import { GSCQuery } from '../types';

export function GscPlatformOverview() {
  const { overview, topQueries, isLoading, error } = useGSCData();

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#7A2B20] animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-[50vh] items-center justify-center text-center p-6 bg-[#FFF9F9] border border-[#FEE2E2] rounded-2xl">
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
          <span className="text-red-600 font-bold">!</span>
        </div>
        <h3 className="font-serif font-bold text-xl text-[#3E1510] mb-2">The oracle is currently unreachable</h3>
        <p className="text-[#A43927] max-w-md">{error}</p>
      </div>
    );
  }

  const gscKpis = overview || { clicks: 0, impressions: 0, ctr: 0, position: 0 };
  const gscQueries = topQueries || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif font-bold text-[#3E1510] flex items-center">
            Google Search Console
          </h2>
          <p className="text-sm text-[#A88C87] font-medium mt-1">Organic search performance, ranking keywords, and CTR analysis.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[65%_1fr] gap-6">
        
        {/* Left Column: 65% Width */}
        <div className="space-y-6">
          {/* Summary KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#EBF4ED] border border-[#D5E6D9] rounded-xl p-4">
              <div className="flex items-center space-x-2 text-[#2E6B3B] mb-2">
                <MousePointerClick className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Total Clicks</span>
              </div>
              <p className="text-xl font-bold text-[#14421E]">{(gscKpis.clicks / 1000).toFixed(1)}<span className="text-sm text-[#2E6B3B]">k</span></p>
            </div>
            <div className="bg-white border border-[#EAE3D9] rounded-xl p-4">
              <div className="flex items-center space-x-2 text-[#A88C87] mb-2">
                <Eye className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Impressions</span>
              </div>
              <p className="text-xl font-bold text-[#3E1510]">{Math.round(gscKpis.impressions / 1000)}<span className="text-sm text-[#A88C87]">k</span></p>
            </div>
            <div className="bg-white border border-[#EAE3D9] rounded-xl p-4">
              <div className="flex items-center space-x-2 text-[#A88C87] mb-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Avg. CTR</span>
              </div>
              <p className="text-xl font-bold text-[#3E1510]">{(gscKpis.ctr * 100).toFixed(2)}%</p>
            </div>
            <div className="bg-white border border-[#EAE3D9] rounded-xl p-4">
              <div className="flex items-center space-x-2 text-[#A88C87] mb-2">
                <Target className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Avg. Position</span>
              </div>
              <p className="text-xl font-bold text-[#3E1510]">{gscKpis.position.toFixed(1)}</p>
            </div>
          </div>

          {/* Top Queries Table */}
          <div className="bg-white border border-[#EAE3D9] rounded-2xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-[#EAE3D9] bg-[#FDF8F3] flex justify-between items-center">
              <h3 className="font-serif font-bold text-[#3E1510] text-lg">Top Organic Queries</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-[10px] uppercase tracking-wider text-[#A88C87] bg-white border-b border-[#EAE3D9]">
                  <tr>
                    <th className="px-6 py-4 font-bold cursor-pointer hover:bg-slate-50">Query</th>
                    <th className="px-6 py-4 font-bold text-right cursor-pointer hover:bg-slate-50">Clicks</th>
                    <th className="px-6 py-4 font-bold text-right cursor-pointer hover:bg-slate-50">Impressions</th>
                    <th className="px-6 py-4 font-bold text-right cursor-pointer hover:bg-slate-50">CTR</th>
                    <th className="px-6 py-4 font-bold text-right cursor-pointer hover:bg-slate-50">Position</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE3D9]">
                  {gscQueries.map((item: GSCQuery, idx: number) => (
                    <tr key={idx} className="hover:bg-[#F9F7F4] transition-colors cursor-pointer">
                      <td className="px-6 py-4">
                        <span className="font-medium text-[#5C4541] truncate max-w-[200px] block" title={item.query}>
                          {item.query}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-[#3E1510] font-bold">{(item.clicks / 1000).toFixed(1)}k</td>
                      <td className="px-6 py-4 text-right text-[#A88C87]">{(item.impressions / 1000).toFixed(1)}k</td>
                      <td className="px-6 py-4 text-right text-[#2E6B3B] font-bold">{(item.ctr * 100).toFixed(2)}%</td>
                      <td className="px-6 py-4 text-right text-[#5C4541]">
                        <div className="flex items-center justify-end">
                          <span className={`w-2 h-2 rounded-full mr-2 ${item.position <= 3 ? 'bg-[#2E6B3B]' : item.position <= 10 ? 'bg-[#DDA77B]' : 'bg-slate-300'}`}></span>
                          {item.position.toFixed(1)}
                        </div>
                      </td>
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
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <Search className="w-24 h-24 text-[#DDA77B]" />
             </div>
             
             <div className="relative z-10">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#DDA77B]/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#A43927]" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A2B20]">Intelligence</span>
                </div>
                
                <h4 className="font-serif font-bold text-lg text-[#3E1510] mb-2 leading-tight">
                  Lost voices in the stream
                </h4>
                <p className="text-[#5C4541] text-sm leading-relaxed mb-4">
                  The query <span className="font-semibold italic">"bali daybeds"</span> resonates deeply, generating 22,000 monthly impressions. Yet, resting subtly at position 8.4, our presence yields a quiet 3.86% CTR.
                </p>
                <div className="mt-4 pt-4 border-t border-[#DDA77B]/20">
                  <p className="text-[#A43927] text-xs font-bold">
                    Suggestion: Cultivate a dedicated narrative space—a beautifully written editorial piece outlining the "Ultimate Daybed Experience"—to elevate our organic presence into the top three.
                  </p>
                </div>
             </div>
          </div>

          {/* Quick Stats / Opportunities Widget */}
          <div className="bg-white border border-[#EAE3D9] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center space-x-2 mb-6">
              <ArrowUpRight className="w-5 h-5 text-[#3E1510]" />
              <h3 className="font-serif font-bold text-[#3E1510] text-lg">Horizons of Growth</h3>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-[#F9F7F4] rounded-lg border border-[#EAE3D9]/50">
                <p className="text-[10px] text-[#A88C87] uppercase font-bold tracking-wider mb-1">Keywords on Page 2</p>
                <p className="text-2xl font-serif font-bold text-[#3E1510]">{gscQueries.filter((q: GSCQuery) => q.position > 10 && q.position <= 20).length}</p>
                <p className="text-xs text-[#5C4541] mt-1">Queries resting just out of sight, ready to be illuminated.</p>
              </div>
              <div className="p-4 bg-[#F9F7F4] rounded-lg border border-[#EAE3D9]/50">
                <p className="text-[10px] text-[#A88C87] uppercase font-bold tracking-wider mb-1">Brand vs Non-Brand Clicks</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-sm font-bold text-[#3E1510]">Brand: 78%</p>
                  <p className="text-sm font-bold text-[#7A2B20]">Discovery: 22%</p>
                </div>
                <div className="w-full h-2 bg-[#EAE3D9] rounded-full mt-2 overflow-hidden flex">
                  <div className="h-full bg-[#3E1510] w-[78%]"></div>
                  <div className="h-full bg-[#7A2B20] w-[22%]"></div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
