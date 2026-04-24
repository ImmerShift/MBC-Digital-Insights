import React, { useState, useEffect } from 'react';
import { Home, BarChart2, PieChart, MessageSquare, FileText, Settings, Navigation, ChevronLeft, ChevronRight, Globe, X, Video, Megaphone, Search, PlaySquare } from 'lucide-react';
import { auth } from '../lib/firebase';

interface SidebarProps {
  activeTab?: 'executive' | 'meta' | 'ga4' | 'tiktok' | 'gads' | 'gsc' | 'youtube' | 'draft' | 'connectors';
  setActiveTab?: (tab: 'executive' | 'meta' | 'ga4' | 'tiktok' | 'gads' | 'gsc' | 'youtube' | 'draft' | 'connectors') => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function Sidebar({ activeTab, setActiveTab, isMobileOpen, onCloseMobile }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Auto-collapse sidebar on tablet screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024 && window.innerWidth >= 768) {
        setIsCollapsed(true);
      } else if (window.innerWidth >= 1024) {
        setIsCollapsed(false);
      }
    };
    
    // Initial check
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTabClick = (tab: any) => {
    if (setActiveTab) setActiveTab(tab);
    if (onCloseMobile) onCloseMobile();
  };

  const isActive = (tab: string) => activeTab === tab;

  console.log("Current activeTab in Sidebar:", activeTab);

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-[#3E1510]/60 backdrop-blur-sm z-40 md:hidden transition-opacity" 
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar container */}
      <div 
        className={`
          transition-all duration-300 bg-[#3E1510] text-[#E6DFD6] flex flex-col min-h-screen font-sans shrink-0
          ${isMobileOpen ? 'fixed inset-y-0 left-0 w-64 z-50 translate-x-0' : 'fixed -translate-x-full z-50'}
          md:relative md:translate-x-0 md:z-auto
          ${isCollapsed ? 'md:w-20' : 'md:w-64'}
        `}
      >
        
        {/* Collapse Toggle Button (Desktop & Tablet only) */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex absolute -right-3 top-8 bg-white text-[#3E1510] rounded-full p-1 border border-[#EAE3D9] shadow-md z-[60] hover:bg-[#F9F7F4] transition-colors items-center justify-center"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        {/* Mobile Close Button */}
        {isMobileOpen && (
          <button 
            onClick={onCloseMobile}
            className="md:hidden absolute right-4 top-6 text-[#E6DFD6] hover:text-white p-1"
          >
            <X className="w-6 h-6" />
          </button>
        )}

        {/* Branding */}
        <div className={`p-6 border-b border-[#522019] flex items-center ${isCollapsed ? 'justify-center p-4' : 'justify-center'}`}>
          {!isCollapsed ? (
            <div className="flex flex-col items-center w-full">
               <img 
                 src="/mari-logo-white.png" 
                 alt="Mari Beach Club" 
                 className="h-10 w-auto object-contain mb-2"
                 onError={(e) => {
                   e.currentTarget.style.display = 'none';
                   if (e.currentTarget.nextElementSibling) {
                     (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'block';
                   }
                 }}
               />
               <div className="hidden text-center">
                  <h1 className="text-white font-serif font-bold text-3xl leading-tight tracking-wide">MARI</h1>
                  <p className="text-[10px] text-[#DDA77B] uppercase tracking-widest leading-none mt-1">Beach Club Bali</p>
               </div>
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#E6DFD6] flex items-center justify-center shrink-0 shadow-sm mx-auto">
              <h1 className="text-[#3E1510] font-serif font-bold text-xl leading-tight tracking-wide">M</h1>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-2 overflow-x-hidden overflow-y-auto custom-scrollbar">
          <p className={`text-[10px] font-semibold text-[#A88C87] uppercase tracking-widest mb-3 ${isCollapsed ? 'text-center truncate px-0' : 'px-3'}`}>
            {isCollapsed ? 'Dash' : 'Dashboards'}
          </p>
          
          <button onClick={() => handleTabClick('executive')} className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0 py-3' : 'px-3 py-2.5'} rounded-lg group transition-colors ${isActive('executive') ? 'bg-[#522019] text-white' : 'hover:bg-[#522019]/50 text-[#A88C87]'}`} title="Executive Dashboard">
            <Home className={`w-5 h-5 shrink-0 transition-colors ${isActive('executive') ? 'text-white' : 'text-[#A88C87] group-hover:text-[#E6DFD6]'} ${!isCollapsed && 'mr-3'}`} />
            {!isCollapsed && <span className={`font-medium text-sm whitespace-nowrap transition-colors ${isActive('executive') ? 'text-white' : 'text-[#E6DFD6]'}`}>Executive Dashboard</span>}
          </button>
          
          {/* We map the other sidebar items to the closest connector for demo purposes */}
          <button onClick={() => handleTabClick('meta')} className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0 py-3' : 'px-3 py-2.5'} rounded-lg group transition-colors ${isActive('meta') ? 'bg-[#522019] text-white' : 'hover:bg-[#522019]/50 text-[#A88C87]'}`} title="Revenue & Meta Ads">
            <BarChart2 className={`w-5 h-5 shrink-0 transition-colors ${isActive('meta') ? 'text-white' : 'text-[#A88C87] group-hover:text-[#E6DFD6]'} ${!isCollapsed && 'mr-3'}`} />
            {!isCollapsed && <span className={`font-medium text-sm whitespace-nowrap transition-colors ${isActive('meta') ? 'text-white' : 'text-[#E6DFD6]'}`}>Meta Ads & Organic</span>}
          </button>

          <button onClick={() => handleTabClick('ga4')} className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0 py-3' : 'px-3 py-2.5'} rounded-lg group transition-colors ${isActive('ga4') ? 'bg-[#522019] text-white' : 'hover:bg-[#522019]/50 text-[#A88C87]'}`} title="Website & GA4">
            <Globe className={`w-5 h-5 shrink-0 transition-colors ${isActive('ga4') ? 'text-white' : 'text-[#A88C87] group-hover:text-[#E6DFD6]'} ${!isCollapsed && 'mr-3'}`} />
            {!isCollapsed && <span className={`font-medium text-sm whitespace-nowrap transition-colors ${isActive('ga4') ? 'text-white' : 'text-[#E6DFD6]'}`}>Website (GA4)</span>}
          </button>

          <button onClick={() => handleTabClick('tiktok')} className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0 py-3' : 'px-3 py-2.5'} rounded-lg group transition-colors ${isActive('tiktok') ? 'bg-[#522019] text-white' : 'hover:bg-[#522019]/50 text-[#A88C87]'}`} title="TikTok">
            <Video className={`w-5 h-5 shrink-0 transition-colors ${isActive('tiktok') ? 'text-white' : 'text-[#A88C87] group-hover:text-[#E6DFD6]'} ${!isCollapsed && 'mr-3'}`} />
            {!isCollapsed && <span className={`font-medium text-sm whitespace-nowrap transition-colors ${isActive('tiktok') ? 'text-white' : 'text-[#E6DFD6]'}`}>TikTok</span>}
          </button>

          <button onClick={() => handleTabClick('gads')} className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0 py-3' : 'px-3 py-2.5'} rounded-lg group transition-colors ${isActive('gads') ? 'bg-[#522019] text-white' : 'hover:bg-[#522019]/50 text-[#A88C87]'}`} title="Google Ads">
            <Megaphone className={`w-5 h-5 shrink-0 transition-colors ${isActive('gads') ? 'text-white' : 'text-[#A88C87] group-hover:text-[#E6DFD6]'} ${!isCollapsed && 'mr-3'}`} />
            {!isCollapsed && <span className={`font-medium text-sm whitespace-nowrap transition-colors ${isActive('gads') ? 'text-white' : 'text-[#E6DFD6]'}`}>Google Ads</span>}
          </button>

          <button onClick={() => handleTabClick('gsc')} className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0 py-3' : 'px-3 py-2.5'} rounded-lg group transition-colors ${isActive('gsc') ? 'bg-[#522019] text-white' : 'hover:bg-[#522019]/50 text-[#A88C87]'}`} title="Search Console">
            <Search className={`w-5 h-5 shrink-0 transition-colors ${isActive('gsc') ? 'text-white' : 'text-[#A88C87] group-hover:text-[#E6DFD6]'} ${!isCollapsed && 'mr-3'}`} />
            {!isCollapsed && <span className={`font-medium text-sm whitespace-nowrap transition-colors ${isActive('gsc') ? 'text-white' : 'text-[#E6DFD6]'}`}>Search Console</span>}
          </button>

          <button onClick={() => handleTabClick('youtube')} className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0 py-3' : 'px-3 py-2.5'} rounded-lg group transition-colors ${isActive('youtube') ? 'bg-[#522019] text-white' : 'hover:bg-[#522019]/50 text-[#A88C87]'}`} title="YouTube">
            <PlaySquare className={`w-5 h-5 shrink-0 transition-colors ${isActive('youtube') ? 'text-white' : 'text-[#A88C87] group-hover:text-[#E6DFD6]'} ${!isCollapsed && 'mr-3'}`} />
            {!isCollapsed && <span className={`font-medium text-sm whitespace-nowrap transition-colors ${isActive('youtube') ? 'text-white' : 'text-[#E6DFD6]'}`}>YouTube</span>}
          </button>

          <button disabled className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0 py-3' : 'px-3 py-2.5'} text-left rounded-lg transition-colors flex-shrink-0 opacity-50 cursor-not-allowed`} title="Brand Mentions (Coming Soon)">
            <MessageSquare className={`w-5 h-5 shrink-0 text-[#A88C87] ${!isCollapsed && 'mr-3'}`} />
            {!isCollapsed && <span className="font-medium text-sm text-[#E6DFD6] whitespace-nowrap">Brand Mentions</span>}
          </button>

          <div className="pt-8 pb-2">
            <p className={`text-[10px] font-semibold text-[#A88C87] uppercase tracking-widest mb-3 ${isCollapsed ? 'text-center truncate px-0' : 'px-3'}`}>
              {isCollapsed ? 'Rep' : 'Reporting'}
            </p>
            <button onClick={() => handleTabClick('draft')} className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0 py-3' : 'px-3 py-2.5'} rounded-lg group transition-colors relative ${isActive('draft') ? 'bg-[#522019] text-white' : 'hover:bg-[#522019]/50 text-[#A88C87]'}`} title="Month-End Draft">
              <FileText className={`w-5 h-5 shrink-0 transition-colors ${isActive('draft') ? 'text-white' : 'text-[#DDA77B]'} ${!isCollapsed && 'mr-3'}`} />
              {!isCollapsed && <span className={`font-medium text-sm whitespace-nowrap transition-colors ${isActive('draft') ? 'text-white' : 'text-[#E6DFD6]'}`}>Month-End Draft</span>}
              {!isCollapsed && <span className={`absolute right-3 w-2 h-2 rounded-full ${isActive('draft') ? 'bg-white' : 'bg-[#DDA77B]'}`}></span>}
              {isCollapsed && <span className={`absolute top-2 right-2 w-2 h-2 rounded-full ${isActive('draft') ? 'bg-white' : 'bg-[#DDA77B]'}`}></span>}
            </button>
          </div>
        </nav>

        {/* User / Settings / Credits */}
        <div className={`p-4 border-t border-[#522019] space-y-4 overflow-hidden shrink-0 ${isCollapsed ? 'text-center' : ''}`}>
          <button onClick={() => handleTabClick('connectors')} className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0' : 'px-3'} py-2 rounded-lg transition-colors text-sm ${isActive('connectors') ? 'bg-[#522019] text-white' : 'hover:bg-[#522019]/50 text-[#A88C87] hover:text-[#E6DFD6]'}`} title="Connectors Setup">
            <Settings className={`w-5 h-5 shrink-0 transition-colors ${isActive('connectors') ? 'text-white' : ''} ${!isCollapsed && 'mr-3'}`} />
            {!isCollapsed && <span className={`whitespace-nowrap transition-colors ${isActive('connectors') ? 'text-white' : ''}`}>Connectors Setup</span>}
          </button>
          
          <button onClick={() => auth.signOut()} className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0' : 'px-3'} py-2 rounded-lg transition-colors text-sm hover:bg-[#522019]/50 text-[#A43927] hover:text-[#DDA77B]`} title="Sign Out">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`shrink-0 ${!isCollapsed && 'mr-3'}`}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
            {!isCollapsed && <span className="whitespace-nowrap">Sign Out</span>}
          </button>

          {/* ImmerShift Footer Credit */}
          {!isCollapsed && (
            <div className="px-3 pt-2 text-[10px] text-[#A88C87] border-t border-[#522019]/50 leading-relaxed whitespace-nowrap">
              <p>Powered by <strong className="text-[#DDA77B]">ImmerShift</strong></p>
              <p>Developer: Enos</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

