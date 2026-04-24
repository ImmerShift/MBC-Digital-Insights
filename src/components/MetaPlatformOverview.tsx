import React from 'react';
import { metaAdsCampaigns, metaOrganicPosts } from '../utils/mockData';
import { Facebook, Instagram, MousePointerClick, TrendingUp, Sparkles, ArrowUpRight, Target, Users } from 'lucide-react';
import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { formatCurrency } from '../utils/formatters';

export function MetaPlatformOverview() {
  // Format campaign names for shorter chart labels
  const chartData = metaAdsCampaigns.map(camp => ({
    ...camp,
    shortName: camp.name.split('_').pop()?.substring(0, 15) || camp.name,
    cpcLabel: camp.cpc // Keep the raw CPC
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif font-bold text-[#3E1510] flex items-center">
            Meta Ecosystem
          </h2>
          <p className="text-sm text-[#A88C87] font-medium mt-1">Cultivating desire and awareness across Facebook and Instagram.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Column: Ads Performance */}
        <div className="xl:col-span-2 space-y-6">
          {/* Ads Summary KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-[#EAE3D9] rounded-xl p-4">
              <div className="flex items-center space-x-2 text-[#A88C87] mb-2">
                <Facebook className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Capital Deployed</span>
              </div>
              <p className="text-xl font-bold text-[#3E1510]">IDR 18.2<span className="text-sm text-[#A88C87]">M</span></p>
            </div>
            <div className="bg-white border border-[#EAE3D9] rounded-xl p-4">
              <div className="flex items-center space-x-2 text-[#A88C87] mb-2">
                <Target className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Reserved Experiences</span>
              </div>
              <p className="text-xl font-bold text-[#3E1510]">83</p>
            </div>
            <div className="bg-white border border-[#EAE3D9] rounded-xl p-4">
              <div className="flex items-center space-x-2 text-[#A88C87] mb-2">
                <MousePointerClick className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Engagement Cost</span>
              </div>
              <p className="text-xl font-bold text-[#3E1510]">IDR 2.1<span className="text-sm text-[#A88C87]">k</span></p>
            </div>
            <div className="bg-[#EBF4ED] border border-[#D5E6D9] rounded-xl p-4">
              <div className="flex items-center space-x-2 text-[#2E6B3B] mb-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Resonance Multiplier</span>
              </div>
              <p className="text-xl font-bold text-[#14421E]">4.2x</p>
            </div>
          </div>

          {/* Graphical ROAS / CPC Chart */}
          <div className="bg-white border border-[#EAE3D9] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif font-bold text-[#3E1510] text-lg">Engagement vs Return</h3>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EAE3D9" />
                  <XAxis dataKey="shortName" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#A88C87' }} dy={10} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#A88C87' }} tickFormatter={(val) => formatCurrency(val)} width={80} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#2E6B3B' }} tickFormatter={(val) => `${val}x`} />
                  <Tooltip 
                    cursor={{fill: '#F9F7F4'}}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #EAE3D9', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: number, name: string) => {
                      if (name === 'cpcLabel') return [formatCurrency(value), 'Cost per Click'];
                      return [`${value}x`, 'Multiplier'];
                    }}
                    labelStyle={{ color: '#3E1510', fontWeight: 'bold', marginBottom: '4px' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar yAxisId="left" dataKey="cpcLabel" name="Cost Structure" fill="#DDA77B" radius={[4, 4, 0, 0]} barSize={32} />
                  <Line yAxisId="right" type="monotone" dataKey="roas" name="Value Multiplier" stroke="#2E6B3B" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff' }} activeDot={{ r: 6 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Campaign Table */}
          <div className="bg-white border border-[#EAE3D9] rounded-2xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-[#EAE3D9] bg-[#FDF8F3] flex justify-between items-center">
              <h3 className="font-serif font-bold text-[#3E1510] text-lg">Nurture Pathways</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-[10px] uppercase tracking-wider text-[#A88C87] bg-white border-b border-[#EAE3D9]">
                  <tr>
                    <th className="px-6 py-4 font-bold">Initiative</th>
                    <th className="px-6 py-4 font-bold">Investment</th>
                    <th className="px-6 py-4 font-bold">Arrivals</th>
                    <th className="px-6 py-4 font-bold">Cost / Arrival</th>
                    <th className="px-6 py-4 font-bold">Return</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE3D9]">
                  {metaAdsCampaigns.map((camp) => (
                    <tr key={camp.id} className="hover:bg-[#F9F7F4] transition-colors">
                      <td className="px-6 py-4 font-medium text-[#5C4541]">
                        <div className="flex items-center">
                          <div className={`w-1.5 h-1.5 rounded-full mr-2 ${camp.status === 'Active' ? 'bg-[#DDA77B]' : 'bg-slate-300'}`}></div>
                          {camp.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[#7A2B20]">{(camp.spend / 1000000).toFixed(1)}M</td>
                      <td className="px-6 py-4 text-[#3E1510] font-medium">{camp.conversions}</td>
                      <td className="px-6 py-4 text-[#5C4541]">IDR {(camp.costPerConv / 1000).toFixed(1)}k</td>
                      <td className="px-6 py-4 text-[#2E6B3B] font-bold">{camp.roas}x</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Organic & Insights */}
        <div className="space-y-6">
          
          {/* AI Insight Dedicated Box */}
          <div className="bg-[#FDF8F3] border border-[#DDA77B]/40 rounded-2xl p-6 shadow-sm relative overflow-hidden">
             {/* Decorative element */}
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <Instagram className="w-24 h-24 text-[#DDA77B]" />
             </div>
             
             <div className="relative z-10">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#DDA77B]/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#A43927]" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A2B20]">Intelligence</span>
                </div>
                
                <h4 className="font-serif font-bold text-lg text-[#3E1510] mb-2 leading-tight">
                  A longing to return
                </h4>
                <p className="text-[#5C4541] text-sm leading-relaxed mb-4">
                  Re-engaging guests who have already explored our sanctuary (via the <span className="font-semibold px-1 bg-white rounded border border-[#EAE3D9]">RET_Website_Visitors_30D</span> initiative) yields a remarkably elegant 7.2x multiplier, far surpassing initial introductions.
                </p>
                <div className="mt-4 pt-4 border-t border-[#DDA77B]/20">
                  <p className="text-[#A43927] text-xs font-bold flex items-center">
                    Suggestion: Gently shift resources toward rekindling these existing desires as we prepare for the coming month's events.
                  </p>
                </div>
             </div>
          </div>

          {/* Top Organic Posts */}
          <div className="bg-white border border-[#EAE3D9] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center space-x-2 mb-6">
              <Instagram className="w-5 h-5 text-[#3E1510]" />
              <h3 className="font-serif font-bold text-[#3E1510] text-lg">Organic Storytelling</h3>
            </div>
            
            <div className="space-y-4">
              {metaOrganicPosts.map((post) => (
                <div key={post.id} className="flex justify-between items-center group cursor-pointer p-2 -mx-2 rounded-lg hover:bg-[#F9F7F4] transition-colors">
                  <div>
                    <p className="text-sm font-semibold text-[#3E1510] group-hover:text-[#7A2B20] transition-colors">{post.title}</p>
                    <p className="text-[11px] text-[#A88C87] uppercase tracking-wider mt-0.5">{post.format}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#5C4541] flex items-center justify-end">
                      {post.reach >= 1000 ? (post.reach/1000).toFixed(0) + 'k' : post.reach} <Users className="w-3.5 h-3.5 ml-1.5 text-[#A88C87]" />
                    </p>
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
