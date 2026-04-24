import React, { useState, useEffect, useRef } from 'react';
import { Share2, Globe, Video, Megaphone, Search, PlaySquare, Mail, Store, AlertCircle, CheckCircle2, ChevronRight, Activity, Sparkles, Instagram, Link, Save, Loader2, X } from 'lucide-react';
import { getWebAppUrl, saveWebAppUrl } from '../utils/api';

const connectorCategories = [
  {
    title: 'Google Ecosystem',
    connectors: [
      { id: 'ga4', name: 'Google Analytics 4', icon: Globe, status: 'connected', lastSync: 'Today at 08:30 AM', desc: 'Website traffic, user behavior, and e-commerce events', accountName: 'PT SYAH BALI VENTURA', queries: ['Executive Traffic Summary', 'Landing Page Resonance', 'Acquisition Channel ROI'] },
      { id: 'gsc', name: 'Search Console', icon: Search, status: 'connected', lastSync: 'Yesterday', desc: 'Organic search performance and ranking keywords', accountName: 'maribeachclub.com', queries: ['Top Performing Keywords', 'Search Impression Growth'] },
      { id: 'gads', name: 'Google Ads', icon: Megaphone, status: 'connected', lastSync: '2 hours ago', desc: 'PPC campaigns, conversion tracking, and spend', accountName: 'Mari Beach Club Ads (142-555-0198)', queries: ['Campaign ROAS Analysis', 'Cost Per Acquisition Trends'] },
      { id: 'youtube', name: 'YouTube', icon: PlaySquare, status: 'connected', lastSync: 'Today at 08:30 AM', desc: 'Video views, watch time, and subscriber growth', accountName: 'Mari Beach Club Official', queries: ['Viewer Retention Rates', 'Top Video Engagement'] },
      { id: 'gmb', name: 'Google My Business', icon: Store, status: 'pending', lastSync: null, desc: 'Local search presence, profile views, and reviews' },
    ]
  },
  {
    title: 'Paid Social',
    connectors: [
      { id: 'meta_ads', name: 'Meta Ads', icon: Share2, status: 'connected', lastSync: '1 hour ago', desc: 'Facebook and Instagram ad performance and ROAS', accountName: 'Mari Beach Club Business Manager', queries: ['Retargeting Multiplier', 'Ad Spend Efficiency'] },
      { id: 'tiktok_ads', name: 'TikTok Ads', icon: Video, status: 'connected', lastSync: '3 hours ago', desc: 'ByteDance ad network metrics and Conversions', accountName: 'Mari Beach Club TikTok For Business', queries: ['Spark Ads Performance', 'Conversion Tracking'] },
    ]
  },
  {
    title: 'Organic Social',
    connectors: [
      { id: 'instagram', name: 'Instagram', icon: Instagram, status: 'not_connected', lastSync: null, desc: 'Feed posts, Reels, and follower growth' },
      { id: 'tiktok_org', name: 'TikTok Organic', icon: Video, status: 'connected', lastSync: 'Today at 08:30 AM', desc: 'Short-form video virality and engagement', accountName: '@maribeachclubbali', queries: ['Viral Content Resonance', 'Follower Accumulation'] },
    ]
  },
  {
    title: 'Email',
    connectors: [
      { id: 'klaviyo', name: 'Klaviyo', icon: Mail, status: 'not_connected', lastSync: null, desc: 'Email campaigns, automation flows, and subscriber lists' },
    ]
  },
  {
    title: 'Custom',
    connectors: [
      { id: 'mari_ai', name: 'Mari AI Concierge', icon: Sparkles, status: 'connected', lastSync: 'Live', desc: 'Chatbot queries, VIP bookings, reservations', accountName: 'Mari Core API', queries: ['Concierge Conversion Rate', 'Peak Inquiry Times'] },
    ]
  }
];

export function ConnectorsSetup() {
  const [syncing, setSyncing] = useState(false);
  const [appScriptUrl, setAppScriptUrl] = useState('');
  const [isSavingUrl, setIsSavingUrl] = useState(false);
  const [urlSaved, setUrlSaved] = useState(false);
  const [loadingUrl, setLoadingUrl] = useState(true);
  const [expandedConnector, setExpandedConnector] = useState<string | null>(null);
  const [errorToast, setErrorToast] = useState<string | null>(null);
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Count connected
  const allConnectors = connectorCategories.flatMap(c => c.connectors);
  const connectedCount = allConnectors.filter(c => c.status === 'connected').length;
  const totalCount = allConnectors.length;

  useEffect(() => {
    async function fetchUrl() {
      const url = await getWebAppUrl();
      setAppScriptUrl(url);
      setLoadingUrl(false);
    }
    fetchUrl();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
    }, 2000);
  };

  const handleSaveUrl = async () => {
    setIsSavingUrl(true);
    setErrorToast(null);
    try {
      await saveWebAppUrl(appScriptUrl);
      setUrlSaved(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setUrlSaved(false), 3000);
    } catch (err) {
      console.error(err);
      setErrorToast("Failed to save Web App URL. Please try again.");
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setErrorToast(null), 5000);
    } finally {
      setIsSavingUrl(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 pt-6 relative">
      {errorToast && (
        <div className="fixed bottom-6 right-6 bg-[#FFF9F9] border border-[#FEE2E2] text-[#A43927] px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 z-50 transition-all duration-300 transform translate-y-0 opacity-100">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-semibold">{errorToast}</span>
          <button onClick={() => setErrorToast(null)} className="ml-2 text-[#A88C87] hover:text-[#3E1510]">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      {/* Header section with Sync button */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#EAE3D9] pb-6 gap-4">
        <div>
          <h2 className="text-3xl font-serif font-bold text-[#3E1510] flex items-center">
            Connectors Setup
          </h2>
          <p className="text-[#A88C87] mt-2 font-medium max-w-xl">
            Manage your data sources. Connect platforms to automatically sync marketing data into your executive narratives and dashboards.
          </p>
          <div className="flex items-center gap-4 mt-3 text-xs text-[#A88C87]">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E6B3B] animate-pulse"></span>
              Last full sync: Today at 08:30 AM
            </span>
            <span>•</span>
            <span>Next auto-sync: Tomorrow at 06:00 AM</span>
          </div>
        </div>
        <div className="flex flex-col items-start sm:items-end shrink-0">
          <div className="flex items-center space-x-2 text-sm font-bold text-[#5C4541] mb-3 bg-[#FDF8F3] border border-[#F5E1C8] px-3 py-1.5 rounded-full shadow-sm">
            <Activity className="w-4 h-4 text-[#2E6B3B]" />
            <span>Health: {connectedCount}/{totalCount} Connected</span>
          </div>
          <button 
            onClick={handleSync}
            disabled={syncing}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#3E1510] text-[#E6DFD6] rounded-lg font-bold text-sm shadow hover:bg-[#522019] transition-colors disabled:opacity-50 flex items-center justify-center"
          >
            {syncing ? (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#BD9D98]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            ) : (
              <Activity className="w-4 h-4 mr-2 text-[#BD9D98]" />
            )}
            {syncing ? 'Syncing all...' : 'Sync All Data'}
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="space-y-10 mt-8">
        
        {/* API Bridging Setup */}
        <div className="bg-[#FDF8F3] border border-[#DDA77B]/40 rounded-2xl shadow-sm p-6 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
             <Link className="w-32 h-32 text-[#DDA77B]" />
           </div>
           
           <div className="relative z-10 max-w-2xl">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#DDA77B]/20 flex items-center justify-center">
                  <Globe className="w-4 h-4 text-[#A43927]" />
                </div>
                <h3 className="text-xl font-bold font-serif text-[#3E1510]">Master Data Source</h3>
              </div>
              <p className="text-[#5C4541] mb-6 text-sm">
                Paste the Web App URL from your Google Apps Script deployment. The dashboard will automatically fetch current Analytics, Search Console, and YouTube metrics from this endpoint.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Link className="h-4 w-4 text-[#A88C87]" />
                  </div>
                  {loadingUrl ? (
                    <div className="block w-full pl-10 pr-3 py-2.5 sm:text-sm bg-white border border-[#EAE3D9] rounded-lg animate-pulse h-[42px]"></div>
                  ) : (
                    <input
                      type="url"
                      name="appScriptUrl"
                      id="appScriptUrl"
                      value={appScriptUrl}
                      onChange={(e) => setAppScriptUrl(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2.5 sm:text-sm bg-white border border-[#EAE3D9] rounded-lg focus:ring-[#DDA77B] focus:border-[#DDA77B] placeholder:text-[#A88C87] text-[#3E1510] shadow-sm transition-colors"
                      placeholder="https://script.google.com/macros/s/.../exec"
                    />
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleSaveUrl}
                  disabled={loadingUrl || isSavingUrl || !appScriptUrl}
                  className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-bold rounded-lg shadow-sm text-white bg-[#7A2B20] hover:bg-[#522019] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#DDA77B] disabled:opacity-50 transition-colors"
                >
                  {isSavingUrl ? (
                    <Loader2 className="w-4 h-4 animate-spin -ml-1 mr-2" />
                  ) : urlSaved ? (
                    <CheckCircle2 className="w-4 h-4 -ml-1 mr-2 text-green-300" />
                  ) : (
                    <Save className="w-4 h-4 -ml-1 mr-2" />
                  )}
                  {urlSaved ? 'Saved!' : 'Save URL'}
                </button>
              </div>
           </div>
        </div>

        {connectorCategories.map((category) => (
          <div key={category.title} className="space-y-4">
            <h3 className="text-xl font-bold font-serif text-[#5C4541] px-2">{category.title}</h3>
            <div className="bg-white border border-[#EAE3D9] rounded-2xl shadow-sm overflow-hidden flex flex-col divide-y divide-[#EAE3D9]">
              {category.connectors.map((connector) => {
                const Icon = connector.icon;
                return (
                  <div key={connector.id} className="flex flex-col group transition-colors hover:bg-[#F9F7F4]">
                    <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      
                      <div className="flex items-start sm:items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-[#FDF8F3] border border-[#F5E1C8] flex items-center justify-center shrink-0 shadow-sm group-hover:bg-white transition-colors">
                          <Icon className="w-6 h-6 text-[#7A2B20]" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                            <h4 className="font-bold text-[#3E1510] text-base">{connector.name}</h4>
                            {/* Badges */}
                            {connector.status === 'connected' && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#EBF4ED] text-[#2E6B3B] uppercase tracking-wider border border-[#D5E6D9]">
                                <CheckCircle2 className="w-3 h-3 mr-1" /> Connected
                              </span>
                            )}
                            {connector.status === 'pending' && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#FFF9E6] text-[#B8860B] uppercase tracking-wider border border-[#F5E1C8]">
                                <AlertCircle className="w-3 h-3 mr-1" /> Pending Approval
                              </span>
                            )}
                            {connector.status === 'not_connected' && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#F5F5F5] text-[#808080] uppercase tracking-wider border border-[#E0E0E0]">
                                Not Connected
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-[#5C4541] mt-1 lg:pr-4">{connector.desc}</p>
                          
                          {connector.status === 'connected' && connector.lastSync && (
                            <p className="text-xs text-[#A88C87] mt-1.5 font-medium flex items-center">
                              Last synced: {connector.lastSync}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center w-full sm:w-auto pl-16 sm:pl-0">
                        {connector.status === 'connected' ? (
                          <button 
                            onClick={() => setExpandedConnector(expandedConnector === connector.id ? null : connector.id)}
                            className={`w-full sm:w-auto px-4 py-2 border shadow-sm rounded-lg font-bold text-sm transition-colors whitespace-nowrap ${expandedConnector === connector.id ? 'bg-[#FDF8F3] border-[#DDA77B] text-[#7A2B20]' : 'bg-white border-[#EAE3D9] text-[#5C4541] hover:bg-[#FDF8F3] hover:text-[#3E1510]'}`}
                          >
                            {expandedConnector === connector.id ? 'Close' : 'Manage'}
                          </button>
                        ) : (
                          <button className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-[#FDF8F3] border border-[#DDA77B] shadow-sm text-[#7A2B20] rounded-lg font-bold text-sm hover:bg-[#F5E1C8] transition-colors whitespace-nowrap">
                            Connect <ChevronRight className="w-4 h-4 ml-1" />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {/* Collapsible Manage Panel */}
                    {expandedConnector === connector.id && connector.status === 'connected' && (
                      <div className="px-5 pb-5 sm:pl-20 border-t border-[#EAE3D9] bg-[#FDF8F3] pt-4 rounded-b-2xl">
                        <div className="mb-5">
                          <h5 className="text-[10px] font-bold text-[#A88C87] uppercase tracking-wider mb-2">Authenticated Account</h5>
                          <div className="inline-flex items-center space-x-2 bg-white border border-[#EAE3D9] px-3 py-1.5 rounded-md shadow-sm">
                            <div className="w-2 h-2 rounded-full bg-[#2E6B3B]"></div>
                            <span className="text-sm font-semibold text-[#3E1510]">{connector.accountName}</span>
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="text-[10px] font-bold text-[#A88C87] uppercase tracking-wider mb-3 flex items-center">
                            <Sparkles className="w-3 h-3 mr-1 text-[#DDA77B]" /> Supported Narrative Queries
                          </h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {connector.queries?.map(query => (
                              <label key={query} className="flex items-start space-x-3 bg-white border border-[#EAE3D9] p-3 rounded-lg cursor-pointer hover:border-[#DDA77B] transition-colors shadow-sm">
                                <div className="flex items-center h-5">
                                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-[#DDA77B] text-[#7A2B20] focus:ring-[#7A2B20]" />
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-sm font-bold text-[#3E1510]">{query}</span>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
