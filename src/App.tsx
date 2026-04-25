import React, { useState, useEffect, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { RevenueChart } from './components/RevenueChart';
import { MetaPlatformOverview } from './components/MetaPlatformOverview';
import { Ga4PlatformOverview } from './components/Ga4PlatformOverview';
import { DraftReportView } from './components/DraftReportView';
import { TiktokPlatformOverview } from './components/TiktokPlatformOverview';
import { GadsPlatformOverview } from './components/GadsPlatformOverview';
import { GscPlatformOverview } from './components/GscPlatformOverview';
import { YoutubePlatformOverview } from './components/YoutubePlatformOverview';
import { ConnectorsSetup } from './components/ConnectorsSetup';
import { LayoutDashboard, Share2, Globe, FileText, Video, Search, PlaySquare, Megaphone, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { auth, onAuthStateChanged } from './lib/firebase';
import { Login } from './components/Login';

function App() {
  type TabType = 'executive' | 'meta' | 'ga4' | 'tiktok' | 'gads' | 'gsc' | 'youtube' | 'draft' | 'connectors';
  const [activeTab, setActiveTab] = useState<TabType>('connectors');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [overviewSessions, setOverviewSessions] = useState<number | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (activeTab === 'executive' && user && overviewSessions === null) {
      import('./utils/api').then(({ fetchGA4Data }) => {
        fetchGA4Data().then(data => {
          if (data && typeof data.sessions === 'number') {
             setOverviewSessions(data.sessions);
          } else if (data && typeof data.sessions === 'string') {
             setOverviewSessions(parseInt(data.sessions, 10));
          }
        }).catch(err => console.error("Failed to fetch GA4 for overview", err));
      });
    }
  }, [activeTab, user, overviewSessions]);

  // Simple placeholder for platforms not fully built out yet
  const PlaceholderView = ({ title, icon: Icon }: { title: string; icon: React.ElementType }) => (
    <div className="flex flex-col items-center justify-center p-20 text-[#A88C87] bg-white border border-[#EAE3D9] rounded-2xl border-dashed">
      <Icon className="w-16 h-16 mb-4 text-[#DDA77B]/50" />
      <h2 className="text-2xl font-serif font-bold text-[#3E1510] mb-2">{title} coming soon</h2>
      <p className="text-center max-w-md text-sm">We are connecting the mock data and layout for this platform structure. It will be added to your checklist!</p>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F7F4]">
        <Loader2 className="w-8 h-8 text-[#7A2B20] animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="flex min-h-screen bg-[#F9F7F4] font-sans text-[#3E1510]">
      <Sidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab} 
        isMobileOpen={isMobileSidebarOpen} 
        onCloseMobile={() => setIsMobileSidebarOpen(false)} 
      />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header onMenuClick={() => setIsMobileSidebarOpen(true)} />
        
        {/* Tab Navigation Menu */}
        <div className="bg-white border-b border-[#EAE3D9]">
          {/* Mobile Select Dropdown */}
          <div className="md:hidden p-4 relative">
            <select 
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value as TabType)}
              className="w-full bg-[#FDF8F3] border border-[#EAE3D9] text-[#3E1510] font-bold rounded-lg px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[#DDA77B]/50 shadow-sm"
            >
              <option value="executive">Executive Overview</option>
              <option value="meta">Meta Ecosystem</option>
              <option value="ga4">Website (GA4)</option>
              <option value="tiktok">TikTok</option>
              <option value="gads">Google Ads</option>
              <option value="gsc">Search Console</option>
              <option value="youtube">YouTube</option>
              <option value="draft">Review Draft (Month-End)</option>
            </select>
            {/* Custom dropdown arrow for mobile select */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
               <svg className="fill-current h-4 w-4 text-[#3E1510]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>

          {/* Desktop Horizontal Tabs */}
          <div className="hidden md:flex items-center px-8 pt-4 border-b border-[#EAE3D9] bg-white group/tabs">
            {/* Left Scroll Button */}
            <button 
              onClick={() => {
                if (scrollContainerRef.current) scrollContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
              }}
              className="mr-2 p-1.5 rounded-full text-[#A88C87] hover:text-[#3E1510] hover:bg-[#F9F7F4] transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Scrollable Tabs */}
            <div 
              ref={scrollContainerRef}
              className="flex-1 overflow-x-auto no-scrollbar scroll-smooth relative"
              style={{ paddingBottom: '16px', marginBottom: '-16px' }} // Fix to hide scrollbar but align borders
            >
              <div className="flex space-x-6 min-w-max pb-4">
                <button 
                  onClick={() => setActiveTab('executive')}
                  className={`flex items-center space-x-2 pb-[-16px] border-b-2 text-sm transition-colors whitespace-nowrap ${activeTab === 'executive' ? 'border-[#7A2B20] text-[#3E1510] font-bold' : 'border-transparent text-[#A88C87] hover:text-[#5C4541] font-medium'}`}
                  style={{ marginBottom: '-16px', paddingBottom: '16px' }}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Overview</span>
                </button>
                <button 
                  onClick={() => setActiveTab('meta')}
                  className={`flex items-center space-x-2 pb-[-16px] border-b-2 text-sm transition-colors whitespace-nowrap ${activeTab === 'meta' ? 'border-[#7A2B20] text-[#3E1510] font-bold' : 'border-transparent text-[#A88C87] hover:text-[#5C4541] font-medium'}`}
                  style={{ marginBottom: '-16px', paddingBottom: '16px' }}
                >
                  <Share2 className="w-4 h-4" />
                  <span>Meta</span>
                </button>
                <button 
                  onClick={() => setActiveTab('ga4')}
                  className={`flex items-center space-x-2 pb-[-16px] border-b-2 text-sm transition-colors whitespace-nowrap ${activeTab === 'ga4' ? 'border-[#7A2B20] text-[#3E1510] font-bold' : 'border-transparent text-[#A88C87] hover:text-[#5C4541] font-medium'}`}
                  style={{ marginBottom: '-16px', paddingBottom: '16px' }}
                >
                  <Globe className="w-4 h-4" />
                  <span>Website</span>
                </button>
                <button 
                  onClick={() => setActiveTab('tiktok')}
                  className={`flex items-center space-x-2 pb-[-16px] border-b-2 text-sm transition-colors whitespace-nowrap ${activeTab === 'tiktok' ? 'border-[#7A2B20] text-[#3E1510] font-bold' : 'border-transparent text-[#A88C87] hover:text-[#5C4541] font-medium'}`}
                  style={{ marginBottom: '-16px', paddingBottom: '16px' }}
                >
                  <Video className="w-4 h-4" />
                  <span>TikTok</span>
                </button>
                <button 
                  onClick={() => setActiveTab('gads')}
                  className={`flex items-center space-x-2 pb-[-16px] border-b-2 text-sm transition-colors whitespace-nowrap ${activeTab === 'gads' ? 'border-[#7A2B20] text-[#3E1510] font-bold' : 'border-transparent text-[#A88C87] hover:text-[#5C4541] font-medium'}`}
                  style={{ marginBottom: '-16px', paddingBottom: '16px' }}
                >
                  <Megaphone className="w-4 h-4" />
                  <span>Google Ads</span>
                </button>
                <button 
                  onClick={() => setActiveTab('gsc')}
                  className={`flex items-center space-x-2 pb-[-16px] border-b-2 text-sm transition-colors whitespace-nowrap ${activeTab === 'gsc' ? 'border-[#7A2B20] text-[#3E1510] font-bold' : 'border-transparent text-[#A88C87] hover:text-[#5C4541] font-medium'}`}
                  style={{ marginBottom: '-16px', paddingBottom: '16px' }}
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
                <button 
                  onClick={() => setActiveTab('youtube')}
                  className={`flex items-center space-x-2 pb-[-16px] border-b-2 text-sm transition-colors whitespace-nowrap ${activeTab === 'youtube' ? 'border-[#7A2B20] text-[#3E1510] font-bold' : 'border-transparent text-[#A88C87] hover:text-[#5C4541] font-medium'}`}
                  style={{ marginBottom: '-16px', paddingBottom: '16px' }}
                >
                  <PlaySquare className="w-4 h-4" />
                  <span>YouTube</span>
                </button>
              </div>
            </div>

            {/* Right Scroll Button */}
            <button 
              onClick={() => {
                if (scrollContainerRef.current) scrollContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
              }}
              className="ml-2 p-1.5 rounded-full text-[#A88C87] hover:text-[#3E1510] hover:bg-[#F9F7F4] transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Pinned Draft Tab */}
            <div className="flex items-center ml-4 shrink-0 pb-4" style={{ marginBottom: '-16px', paddingBottom: '16px' }}>
              <div className="border-l border-[#EAE3D9] h-6 mr-4 self-center mt-[-16px]"></div>
              <button 
                onClick={() => setActiveTab('draft')}
                className={`flex items-center space-x-2 border-b-2 text-sm transition-colors whitespace-nowrap ${activeTab === 'draft' ? 'border-[#A43927] text-[#A43927] font-bold' : 'border-transparent text-[#7A2B20] hover:text-[#A43927] font-bold'}`}
              >
                <FileText className="w-4 h-4" />
                <span>Draft</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto layout-content relative">
          <div className="p-4 md:p-8 pb-32">
            <div className="max-w-6xl mx-auto space-y-8">
              
              {/* TAB CONTENT: Executive Overview */}
              {activeTab === 'executive' && (
                <>
                  {/* Top Stat Cards as a single full-width layout */}
                  <div className="bg-white border border-[#EAE3D9] rounded-2xl shadow-sm flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[#EAE3D9] overflow-hidden">
                    <div className="p-6 flex-1 hover:bg-[#F9F7F4] hover:border-l-4 hover:border-l-[#7A2B20] transition-all duration-200 relative group">
                      <p className="text-[11px] font-bold text-[#A88C87] uppercase tracking-wider mb-2">Total Website Sessions</p>
                      <div className="flex items-end justify-between">
                        <h3 className="text-3xl font-bold tracking-tight text-[#3E1510]">
                          {overviewSessions !== null ? overviewSessions.toLocaleString() : '-'}
                        </h3>
                        <div className="px-2.5 py-1 bg-[#EBF4ED] text-[#2E6B3B] text-[11px] font-bold rounded uppercase tracking-wider border border-[#D5E6D9]">LIVE</div>
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1 hover:bg-[#F9F7F4] hover:border-l-4 hover:border-l-[#DDA77B] transition-all duration-200 relative group">
                      <p className="text-[11px] font-bold text-[#A88C87] uppercase tracking-wider mb-2">Total Content Reach</p>
                      <div className="flex items-end justify-between">
                        <h3 className="text-3xl font-bold tracking-tight text-[#3E1510]">545<span className="text-xl text-[#A88C87] font-medium">k</span></h3>
                        <div className="px-2.5 py-1 bg-[#FDF4E6] text-[#A46A38] text-[11px] font-bold rounded uppercase tracking-wider border border-[#F5E1C8]">+340%</div>
                      </div>
                    </div>

                    <div className="p-6 flex-1 hover:bg-[#F9F7F4] hover:border-l-4 hover:border-l-[#2E6B3B] transition-all duration-200 relative group">
                      <p className="text-[11px] font-bold text-[#A88C87] uppercase tracking-wider mb-2">Brand Mentions</p>
                      <div className="flex items-end justify-between">
                        <h3 className="text-3xl font-bold tracking-tight text-[#3E1510]">1,005</h3>
                        <div className="px-2.5 py-1 bg-[#EBF4ED] text-[#2E6B3B] text-[11px] font-bold rounded uppercase tracking-wider border border-[#D5E6D9]">+8%</div>
                      </div>
                    </div>
                  </div>

                  {/* Main AI Chart */}
                  <div className="relative">
                    <RevenueChart />
                  </div>
                </>
              )}

              {/* TAB CONTENT: Meta */}
            {activeTab === 'meta' && (
              <MetaPlatformOverview />
            )}

            {/* TAB CONTENT: GA4 */}
            {activeTab === 'ga4' && (
              <Ga4PlatformOverview />
            )}

            {/* TAB CONTENT: Month-End Draft View */}
            {activeTab === 'draft' && (
              <DraftReportView />
            )}

            {/* TAB CONTENT: TikTok */}
            {activeTab === 'tiktok' && <TiktokPlatformOverview />}

            {/* TAB CONTENT: Google Ads */}
            {activeTab === 'gads' && <GadsPlatformOverview />}

            {/* TAB CONTENT: Google Search Console */}
            {activeTab === 'gsc' && <GscPlatformOverview />}

            {/* TAB CONTENT: YouTube */}
            {activeTab === 'youtube' && <YoutubePlatformOverview />}

            {/* TAB CONTENT: Connectors Setup */}
            {activeTab === 'connectors' && <ConnectorsSetup />}

          </div>
        </div>
        </div>
        
        {/* Sticky Footer: Draft Report Alert - shown when on Executive tab */}
        {activeTab === 'executive' && (
          <div className="bg-[#4A1A14] border-t-2 border-[#DDA77B]/50 shrink-0 shadow-[0_-10px_40px_rgba(62,21,16,0.15)] relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute right-0 top-0 w-64 h-full bg-white opacity-5 transform skew-x-12 translate-x-10 pointer-events-none"></div>
            
            <div className="max-w-6xl mx-auto px-4 sm:px-8 py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="relative z-10">
                <h3 className="text-lg md:text-xl font-serif font-bold text-white mb-1 flex items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#DDA77B] mr-3 animate-pulse"></span>
                  Month-End Draft Ready for Review
                </h3>
                <p className="text-[#E6DFD6] text-xs md:text-sm font-medium w-full lg:max-w-xl">
                  Intelligence has woven the narrative from the gathered moments of April.
                </p>
              </div>
              <button 
                onClick={() => setActiveTab('draft')}
                className="relative z-10 shrink-0 bg-[#F9F7F4] text-[#3E1510] px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm font-bold shadow hover:bg-white transition-colors"
                style={{
                  boxShadow: '0 4px 0 #EAE3D9',
                  transform: 'translateY(0)',
                }}
                onMouseDown={(e) => {
                   e.currentTarget.style.boxShadow = '0 0px 0 #EAE3D9';
                   e.currentTarget.style.transform = 'translateY(4px)';
                }}
                onMouseUp={(e) => {
                   e.currentTarget.style.boxShadow = '0 4px 0 #EAE3D9';
                   e.currentTarget.style.transform = 'translateY(0)';
                }}
                onMouseLeave={(e) => {
                   e.currentTarget.style.boxShadow = '0 4px 0 #EAE3D9';
                   e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Review & Edit Draft
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
