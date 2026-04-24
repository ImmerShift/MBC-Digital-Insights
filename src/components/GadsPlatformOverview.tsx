import React from 'react';
import { gadsKpis, gadsCampaigns, gadsKeywords } from '../utils/mockData';
import { Megaphone, MousePointerClick, Target, TrendingUp, Sparkles, Search, Eye } from 'lucide-react';

export function GadsPlatformOverview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif font-bold text-[#3E1510] flex items-center">
            Google Ads Ecosystem
          </h2>
          <p className="text-sm text-[#A88C87] font-medium mt-1">Search, display, and performance paths guiding guests to our door.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[65%_1fr] gap-6">
        
        {/* Left Column: 65% Width */}
        <div className="space-y-6">
          {/* Summary KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#EBF4ED] border border-[#D5E6D9] rounded-xl p-4">
              <div className="flex items-center space-x-2 text-[#2E6B3B] mb-2">
                <Target className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Reserved Experiences</span>
              </div>
              <p className="text-xl font-bold text-[#14421E]">{gadsKpis.conversions}</p>
            </div>
            <div className="bg-white border border-[#EAE3D9] rounded-xl p-4">
              <div className="flex items-center space-x-2 text-[#A88C87] mb-2">
                <Megaphone className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Capital Deployed</span>
              </div>
              <p className="text-xl font-bold text-[#3E1510]">IDR {(gadsKpis.spend / 1000000).toFixed(1)}<span className="text-sm text-[#A88C87]">M</span></p>
            </div>
            <div className="bg-white border border-[#EAE3D9] rounded-xl p-4">
              <div className="flex items-center space-x-2 text-[#A88C87] mb-2">
                <MousePointerClick className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Path Beginnings</span>
              </div>
              <p className="text-xl font-bold text-[#3E1510]">{(gadsKpis.clicks / 1000).toFixed(1)}<span className="text-sm text-[#A88C87]">k</span></p>
            </div>
            <div className="bg-white border border-[#EAE3D9] rounded-xl p-4">
              <div className="flex items-center space-x-2 text-[#A88C87] mb-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Avg Initiation Cost</span>
              </div>
              <p className="text-xl font-bold text-[#3E1510]">IDR {gadsKpis.avgCpc}</p>
            </div>
          </div>

          {/* Top Campaigns Table */}
          <div className="bg-white border border-[#EAE3D9] rounded-2xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-[#EAE3D9] bg-[#FDF8F3] flex justify-between items-center">
              <h3 className="font-serif font-bold text-[#3E1510] text-lg">Active Pathways</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-[10px] uppercase tracking-wider text-[#A88C87] bg-white border-b border-[#EAE3D9]">
                  <tr>
                    <th className="px-6 py-4 font-bold cursor-pointer hover:bg-slate-50">Initiative</th>
                    <th className="px-6 py-4 font-bold cursor-pointer hover:bg-slate-50">Format</th>
                    <th className="px-6 py-4 font-bold text-right cursor-pointer hover:bg-slate-50">Investment</th>
                    <th className="px-6 py-4 font-bold text-right cursor-pointer hover:bg-slate-50">Arrivals</th>
                    <th className="px-6 py-4 font-bold text-right cursor-pointer hover:bg-slate-50">Cost / Arrival</th>
                    <th className="px-6 py-4 font-bold text-right cursor-pointer hover:bg-slate-50">Multiplier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE3D9]">
                  {gadsCampaigns.map((camp) => (
                    <tr key={camp.id} className="hover:bg-[#F9F7F4] transition-colors cursor-pointer">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className={`w-1.5 h-1.5 rounded-full mr-2 ${camp.status === 'Active' ? 'bg-[#DDA77B]' : 'bg-slate-300'}`}></div>
                          <span className="font-medium text-[#5C4541] truncate max-w-[180px]" title={camp.name}>{camp.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[#A88C87] text-xs">{camp.type}</td>
                      <td className="px-6 py-4 text-right text-[#7A2B20]">{(camp.spend / 1000000).toFixed(1)}M</td>
                      <td className="px-6 py-4 text-right text-[#3E1510] font-bold">{camp.conversions}</td>
                      <td className="px-6 py-4 text-right text-[#5C4541]">{(camp.cpa / 1000).toFixed(0)}k</td>
                      <td className="px-6 py-4 text-right text-[#2E6B3B] font-bold">{camp.roas}x</td>
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
               <Megaphone className="w-24 h-24 text-[#DDA77B]" />
             </div>
             
             <div className="relative z-10">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#DDA77B]/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#A43927]" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A2B20]">Intelligence</span>
                </div>
                
                <h4 className="font-serif font-bold text-lg text-[#3E1510] mb-2 leading-tight">
                  Broad aspirations draw fleeting attention
                </h4>
                <p className="text-[#5C4541] text-sm leading-relaxed mb-4">
                  The <span className="font-semibold px-1 bg-white rounded border border-[#EAE3D9]">Search_Generic_BeachClubBali</span> pathway requires 44% of our investment but yields a quiet 2.1x multiplier, drawing guests who are not yet ready to commit.
                </p>
                <div className="mt-4 pt-4 border-t border-[#DDA77B]/20">
                  <p className="text-[#A43927] text-xs font-bold">
                    Suggestion: Gently guide 30% of these broad discovery resources toward reaching guests who have already expressed a desire to visit our sanctuary.
                  </p>
                </div>
             </div>
          </div>

          {/* Top Search Terms/Keywords */}
          <div className="bg-white border border-[#EAE3D9] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center space-x-2 mb-6">
              <Search className="w-5 h-5 text-[#3E1510]" />
              <h3 className="font-serif font-bold text-[#3E1510] text-lg">Words of Discovery</h3>
            </div>
            
            <div className="space-y-4">
              {gadsKeywords.map((kw) => (
                <div key={kw.id} className="p-3 bg-[#F9F7F4] rounded-lg border border-[#EAE3D9]/50 flex justify-between items-center group transition-colors hover:bg-white hover:border-[#DDA77B]/50">
                  <div className="flex-1 min-w-0 pr-4">
                    <p className="text-sm font-semibold text-[#3E1510] truncate group-hover:text-[#7A2B20] transition-colors">"{kw.keyword}"</p>
                    <p className="text-[11px] text-[#A88C87] uppercase mt-1 flex items-center">
                      <MousePointerClick className="w-3 h-3 mr-1" /> {kw.clicks.toLocaleString()} Invitations Accepted
                    </p>
                  </div>
                  <div className="text-right shrink-0 bg-[#EBF4ED] border border-[#D5E6D9] rounded-md px-3 py-1.5">
                    <p className="text-[10px] text-[#2E6B3B] uppercase font-bold tracking-wider mb-0.5">Arrivals</p>
                    <p className="text-sm font-bold text-[#14421E]">{kw.conversions}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
