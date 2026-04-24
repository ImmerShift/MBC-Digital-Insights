import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { northStarData } from '../utils/mockData';
import { Sparkles, TrendingUp } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;
    const aiInsight = dataPoint.aiInsight;
    const isSpike = aiInsight.toLowerCase().includes('spike');

    return (
      <div className="bg-white/95 backdrop-blur-md p-5 border border-[#EAE3D9] rounded-xl shadow-xl max-w-sm relative overflow-hidden z-50 font-sans">
        {/* Decorative Top Line connecting to brand colors */}
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${isSpike ? 'from-[#DDA77B] to-[#7A2B20]' : 'from-[#EAE3D9] to-[#A88C87]'}`}></div>
        
        <p className="text-[10px] font-bold text-[#A88C87] uppercase tracking-widest mb-3">{label}</p>
        
        <div className="space-y-2 mb-4">
          <div className="text-sm font-medium text-[#5C4541] flex justify-between items-center">
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-[#7A2B20] mr-2 block"></span> Revenue</span>
            <span className="font-bold text-[#3E1510] text-base">IDR {(dataPoint.revenue / 1000000).toFixed(1)}M</span>
          </div>
          <div className="text-sm font-medium text-[#5C4541] flex justify-between items-center">
            <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-[#DDA77B] mr-2 block"></span> Reach</span>
            <span className="font-bold text-[#3E1510] text-base">{dataPoint.reach.toLocaleString()}</span>
          </div>
        </div>

        {/* AI Insight Box */}
        <div className={`mt-3 p-3 rounded-lg border-l-2 text-sm leading-relaxed
            ${isSpike ? 'bg-[#FDF8F3] border-[#DDA77B] text-[#5D221A]' : 'bg-[#F9F7F4] border-[#A88C87] text-[#5C4541]'}
        `}>
          <div className="flex items-center space-x-2 mb-1.5">
             <Sparkles className={`w-3.5 h-3.5 ${isSpike ? 'text-[#DDA77B]' : 'text-[#A88C87]'}`} />
             <span className={`text-[11px] font-bold uppercase tracking-wider ${isSpike ? 'text-[#A43927]' : 'text-[#7A2B20]'}`}>Intelligence</span>
          </div>
          <p className="italic text-[13px]">{aiInsight}</p>
        </div>
      </div>
    );
  }
  return null;
};

export function RevenueChart() {
  return (
    <div className="bg-white border border-[#EAE3D9] rounded-2xl shadow-sm p-6 lg:p-8 relative overflow-hidden">
      <div className="absolute top-4 right-4 text-[10px] font-semibold text-[#A88C87] uppercase tracking-wider flex items-center gap-1.5 bg-[#F9F7F4] border border-[#EAE3D9] px-2.5 py-1.5 rounded-full pointer-events-none">
        ✦ Hover peak for Intelligence
      </div>
      
      <div className="flex items-start justify-between mb-8 pr-48">
        <div>
          <h3 className="text-xl font-serif font-bold text-[#3E1510] flex items-center">
            Rhythm of Resonance
            <span className="ml-3 px-2 py-0.5 rounded text-[11px] font-bold bg-[#EBF4ED] text-[#2E6B3B] flex items-center uppercase tracking-wider border border-[#D5E6D9]">
              <TrendingUp className="w-3 h-3 mr-1" /> +15.2%
            </span>
          </h3>
          <p className="text-sm text-[#A88C87] font-medium mt-1">Digital momentum mapped against audience discovery</p>
        </div>
      </div>
      
      <div className="h-[340px] w-full cursor-crosshair">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={northStarData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7A2B20" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#7A2B20" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorReach" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#DDA77B" stopOpacity={0.25}/>
                <stop offset="95%" stopColor="#DDA77B" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#EAE3D9" />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#A88C87', fontWeight: 500 }} dy={10} />
            <YAxis width={60} yAxisId="left" tickFormatter={(value) => `${value / 1000000}M`} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#A88C87', fontWeight: 500 }} dx={-10} />
            <YAxis width={40} yAxisId="right" orientation="right" tickFormatter={(value) => `${value / 1000}k`} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#A88C87', fontWeight: 500 }} dx={10} />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Proper recharts legend */}
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle"
              wrapperStyle={{ paddingTop: '20px', fontSize: '12px', fontWeight: 600, color: '#5C4541' }}
            />
            
            {/* The maroon MBC color line */}
            <Area name="Sustenance (Revenue)" yAxisId="left" type="monotone" dataKey="revenue" stroke="#7A2B20" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" activeDot={{ r: 6, strokeWidth: 0, fill: '#7A2B20' }} />
            {/* The sandy/beige accent line */}
            <Area name="Echoes (Reach)" yAxisId="right" type="monotone" dataKey="reach" stroke="#DDA77B" strokeWidth={3} strokeDasharray="0" fillOpacity={1} fill="url(#colorReach)" activeDot={{ r: 5, strokeWidth: 0, fill: '#DDA77B' }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
