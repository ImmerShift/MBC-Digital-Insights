import React from 'react';
import { useYouTubeData } from '../hooks/useRealData';
import { PlaySquare, Clock, Users, Activity, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import { YouTubeVideo } from '../types';

export function YoutubePlatformOverview() {
  const { overview, topVideos, isLoading, error } = useYouTubeData();

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

  const youtubeKpis = overview || { views: 0, watchMinutes: 0, avgDuration: 0, subscribersGained: 0 };
  const youtubeVideos = topVideos || [];

  // Format avgSessionDuration from seconds to mm:ss
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-serif font-bold text-[#3E1510] flex items-center">
            YouTube Studio
          </h2>
          <p className="text-sm text-[#A88C87] font-medium mt-1">Video performance, subscriber growth, and channel watch time.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[65%_1fr] gap-6">
        
        {/* Left Column: 65% Width */}
        <div className="space-y-6">
          {/* Summary KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#EBF4ED] border border-[#D5E6D9] rounded-xl p-4">
              <div className="flex items-center space-x-2 text-[#2E6B3B] mb-2">
                <PlaySquare className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Total Views</span>
              </div>
              <p className="text-xl font-bold text-[#14421E]">{(youtubeKpis.views / 1000).toFixed(1)}<span className="text-sm text-[#2E6B3B]">k</span></p>
            </div>
            <div className="bg-white border border-[#EAE3D9] rounded-xl p-4">
              <div className="flex items-center space-x-2 text-[#A88C87] mb-2">
                <Clock className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Watch Time</span>
              </div>
              <p className="text-xl font-bold text-[#3E1510]">{(youtubeKpis.watchMinutes / 60).toFixed(1)}<span className="text-sm text-[#A88C87]"> hrs</span></p>
            </div>
            <div className="bg-white border border-[#EAE3D9] rounded-xl p-4">
              <div className="flex items-center space-x-2 text-[#A88C87] mb-2">
                <Activity className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Avg Duration</span>
              </div>
              <p className="text-xl font-bold text-[#3E1510]">{formatTime(youtubeKpis.avgDuration)}</p>
            </div>
            <div className="bg-white border border-[#EAE3D9] rounded-xl p-4 opacity-50 relative overflow-hidden" title="Data source restricts this metric currently.">
               <div className="flex items-center space-x-2 text-[#A88C87] mb-2">
                <Users className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Subscribers</span>
              </div>
              <p className="text-xl font-bold text-[#3E1510]">N/A</p>
            </div>
          </div>

          {/* Top Videos Table */}
          <div className="bg-white border border-[#EAE3D9] rounded-2xl overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-[#EAE3D9] bg-[#FDF8F3] flex justify-between items-center">
              <h3 className="font-serif font-bold text-[#3E1510] text-lg">Resonant Visuals</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-[10px] uppercase tracking-wider text-[#A88C87] bg-white border-b border-[#EAE3D9]">
                  <tr>
                    <th className="px-6 py-4 font-bold cursor-pointer hover:bg-slate-50">Video Details</th>
                    <th className="px-6 py-4 font-bold text-right cursor-pointer hover:bg-slate-50">Views</th>
                    <th className="px-6 py-4 font-bold text-right cursor-pointer hover:bg-slate-50">Likes</th>
                    <th className="px-6 py-4 font-bold text-right cursor-pointer hover:bg-slate-50">Shares</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE3D9]">
                  {youtubeVideos.map((video: YouTubeVideo, idx: number) => (
                    <tr key={idx} className="hover:bg-[#F9F7F4] transition-colors cursor-pointer">
                      <td className="px-6 py-4">
                        <span className="font-medium text-[#5C4541] truncate max-w-[200px]" title={video.title || video.videoId}>{video.title || video.videoId}</span>
                      </td>
                      <td className="px-6 py-4 text-right text-[#3E1510] font-bold">{video.views.toLocaleString()}</td>
                      <td className="px-6 py-4 text-right text-[#5C4541]">{(video.likes || 0).toLocaleString()}</td>
                      <td className="px-6 py-4 text-right text-[#2E6B3B] font-bold">{video.shares || 0}</td>
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
               <PlaySquare className="w-24 h-24 text-[#DDA77B]" />
             </div>
             
             <div className="relative z-10">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#DDA77B]/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#A43927]" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A2B20]">Intelligence</span>
                </div>
                
                <h4 className="font-serif font-bold text-lg text-[#3E1510] mb-2 leading-tight">
                  Immersion drives connection; glimpses spark curiosity.
                </h4>
                <p className="text-[#5C4541] text-sm leading-relaxed mb-4">
                  The extended <span className="font-semibold italic">Sunset DJ Set</span> anchors our guests, commanding 76% of total watch time and fostering deep brand affinity. Yet, it is the fleeting, organic moments in our Shorts that invite the majority of new subscribers to join our journey.
                </p>
                <div className="mt-4 pt-4 border-t border-[#DDA77B]/20">
                  <p className="text-[#A43927] text-xs font-bold">
                    Suggestion: Curate the most naturally evocative 30-second fragments from the "Sunset DJ Set" to share as brief glimpses over the coming weeks, inviting a wider audience to experience the full ambiance.
                  </p>
                </div>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
}
