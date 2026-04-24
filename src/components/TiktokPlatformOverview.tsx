import React from 'react';
import { tiktokKpis, tiktokTopVideos, tiktokAdsCampaigns } from '../utils/mockData';
import { Video, Heart, Share2, TrendingUp, Sparkles, UserPlus, PlayCircle, Flame } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

export function TiktokPlatformOverview() {
  // Format video data for chart
  const chartData = tiktokTopVideos.map(video => ({
    ...video,
    shortTitle: video.title.length > 20 ? video.title.substring(0, 20) + '...' : video.title,
    viewsK: video.views / 1000,
    likesK: video.likes / 1000,
    sharesK: video.shares / 1000
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif font-bold text-[#3E1510] flex items-center">
            TikTok Resonance
          </h2>
          <p className="text-sm text-[#A88C87] font-medium mt-1">Fleeting moments that inspire lasting connection.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[65%_1fr] gap-6">
        
        {/* Left Column: 65% Width */}
        <div className="space-y-6">
          {/* Summary KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#EBF4ED] border border-[#D5E6D9] rounded-xl p-4">
              <div className="flex items-center space-x-2 text-[#2E6B3B] mb-2">
                <PlayCircle className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Moments Shared</span>
              </div>
              <p className="text-xl font-bold text-[#14421E]">{(tiktokKpis.videoViews / 1000000).toFixed(2)}<span className="text-sm text-[#2E6B3B]">M</span></p>
            </div>
            <div className="bg-white border border-[#EAE3D9] rounded-xl p-4">
              <div className="flex items-center space-x-2 text-[#A88C87] mb-2">
                <TrendingUp className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Deep Resonance</span>
              </div>
              <p className="text-xl font-bold text-[#3E1510]">{tiktokKpis.engagementRate}%</p>
            </div>
            <div className="bg-white border border-[#EAE3D9] rounded-xl p-4">
              <div className="flex items-center space-x-2 text-[#A88C87] mb-2">
                <Share2 className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Echoes Across Networks</span>
              </div>
              <p className="text-xl font-bold text-[#3E1510]">{(tiktokKpis.shares / 1000).toFixed(1)}<span className="text-sm text-[#A88C87]">k</span></p>
            </div>
            <div className="bg-white border border-[#EAE3D9] rounded-xl p-4">
              <div className="flex items-center space-x-2 text-[#A88C87] mb-2">
                <UserPlus className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">New Companions</span>
              </div>
              <p className="text-xl font-bold text-[#3E1510]">+{tiktokKpis.followerGrowth}</p>
            </div>
          </div>

          {/* Video Engagement Breakdown Chart */}
          <div className="bg-white border border-[#EAE3D9] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif font-bold text-[#3E1510] text-lg">Harmonics of Engagement</h3>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EAE3D9" />
                  <XAxis dataKey="shortTitle" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#A88C87' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#A88C87' }} tickFormatter={(val) => `${val}k`} />
                  <Tooltip 
                    cursor={{fill: '#F9F7F4'}}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #EAE3D9', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: number, name: string) => {
                      if (name === 'viewsK') return [`${value.toFixed(1)}k`, 'Glances'];
                      if (name === 'likesK') return [`${value.toFixed(1)}k`, 'Affinities'];
                      if (name === 'sharesK') return [`${value.toFixed(1)}k`, 'Shared Echoes'];
                      return value;
                    }}
                    labelStyle={{ color: '#3E1510', fontWeight: 'bold', marginBottom: '4px' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="viewsK" name="Glances" stackId="a" fill="#DDA77B" radius={[0, 0, 4, 4]} barSize={40} />
                  <Bar dataKey="likesK" name="Affinities" stackId="a" fill="#A43927" />
                  <Bar dataKey="sharesK" name="Shared Echoes" stackId="a" fill="#3E1510" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Top Videos Table */}
          <div className="bg-white border border-[#EAE3D9] rounded-2xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-[#EAE3D9] bg-[#FDF8F3] flex justify-between items-center">
              <h3 className="font-serif font-bold text-[#3E1510] text-lg">Visions That Inspire</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-[10px] uppercase tracking-wider text-[#A88C87] bg-white border-b border-[#EAE3D9]">
                  <tr>
                    <th className="px-6 py-4 font-bold cursor-pointer hover:bg-slate-50">Narrative Scene</th>
                    <th className="px-6 py-4 font-bold text-right cursor-pointer hover:bg-slate-50">Glances</th>
                    <th className="px-6 py-4 font-bold text-right cursor-pointer hover:bg-slate-50">Affinities</th>
                    <th className="px-6 py-4 font-bold text-right cursor-pointer hover:bg-slate-50">Sent Beyond</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE3D9]">
                  {tiktokTopVideos.map((video) => (
                    <tr key={video.id} className="hover:bg-[#F9F7F4] transition-colors cursor-pointer">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {video.trend === 'viral' && <Flame className="w-4 h-4 text-[#A43927] mr-2" />}
                          {video.trend !== 'viral' && <Video className="w-4 h-4 text-[#A88C87] mr-2" />}
                          <span className={`${video.trend === 'viral' ? 'font-bold text-[#7A2B20]' : 'font-medium text-[#5C4541]'}`}>
                            {video.title}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-[#3E1510] font-bold">{(video.views / 1000).toFixed(0)}k</td>
                      <td className="px-6 py-4 text-right text-[#5C4541]">{(video.likes / 1000).toFixed(1)}k</td>
                      <td className="px-6 py-4 text-right text-[#5C4541]">{(video.shares / 1000).toFixed(1)}k</td>
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
               <Video className="w-24 h-24 text-[#DDA77B]" />
             </div>
             
             <div className="relative z-10">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#DDA77B]/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#A43927]" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A2B20]">Intelligence</span>
                </div>
                
                <h4 className="font-serif font-bold text-lg text-[#3E1510] mb-2 leading-tight">
                  Perspective invites presence
                </h4>
                <p className="text-[#5C4541] text-sm leading-relaxed mb-4">
                  The <span className="font-semibold italic">POV: You booked a VIP Daybed</span> narrative alone accounted for 66% of all echoes shared. Stepping into the shoes of the guest proves deeply resonant, inspiring others to cross the threshold.
                </p>
                <div className="mt-4 pt-4 border-t border-[#DDA77B]/20">
                  <p className="text-[#A43927] text-xs font-bold">
                    Suggestion: Compose a "POV: Sunset Cocktails" sequence. Amplify its reach through curated placements to capture this momentum.
                  </p>
                </div>
             </div>
          </div>

          {/* TikTok Ads Summary */}
          <div className="bg-white border border-[#EAE3D9] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center space-x-2 mb-6">
              <TrendingUp className="w-5 h-5 text-[#3E1510]" />
              <h3 className="font-serif font-bold text-[#3E1510] text-lg">Curated Amplifications</h3>
            </div>
            
            <div className="space-y-4">
              {tiktokAdsCampaigns.map((ad) => (
                <div key={ad.id} className="p-3 bg-[#F9F7F4] rounded-lg border border-[#EAE3D9]/50">
                  <p className="text-sm font-bold text-[#3E1510] mb-2 truncate" title={ad.name}>{ad.name}</p>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <p className="text-[10px] text-[#A88C87] uppercase">Endowment</p>
                      <p className="text-xs font-bold text-[#7A2B20]">{(ad.spend / 1000000).toFixed(1)}M</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#A88C87] uppercase">Arrivals</p>
                      <p className="text-xs font-bold text-[#3E1510]">{ad.conversions}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#A88C87] uppercase">Multiplier</p>
                      <p className="text-xs font-bold text-[#2E6B3B]">{ad.roas}x</p>
                    </div>
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
