import React, { useState } from 'react';
import { FileText, Save, Download, Sparkles, Send, Loader2, RefreshCw, Copy, Check, Edit3, Bot, AlertCircle } from 'lucide-react';
import Markdown from 'react-markdown';
import { generateMonthlyDraft } from '../lib/gemini';
import { useGA4Data, useYouTubeData } from '../hooks/useRealData';

export function DraftReportView() {
  const { overview: ga4Overview, isLoading: isGa4Loading, error: ga4Error } = useGA4Data();
  const { overview: youtubeOverview, isLoading: isYoutubeLoading, error: youtubeError } = useYouTubeData();

  const [isExporting, setIsExporting] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  const [draftContent, setDraftContent] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const isDataLoading = isGa4Loading || isYoutubeLoading;

  const handleGenerateDraft = async () => {
    setIsGenerating(true);
    setEditMode(false);
    
    // Ensure you paste your Google Apps Script Web App URL here:
    const proxyUrl = "https://script.google.com/macros/s/AKfycbyaJTx86SJORErejCR4ugv9RbgpWxUl1JLdtB6MG1uIfX3PtWFi_qMe9bTLGTdXtkWUjw/exec";
    
    const context = {
      ga4: ga4Overview || { sessions: 0, users: 0, bounceRate: 0 },
      metaAds: [],
      metaOrganic: [],
      youtube: youtubeOverview || { views: 0, watchMinutes: 0 }
    };

    try {
      const text = await generateMonthlyDraft(context, proxyUrl);
      if (text) setDraftContent(text);
    } catch (e) {
      // SCRUBBED: Changed from "weaving the narrative" to "generating the report"
      setDraftContent('An error occurred while generating the report. Please check your connection.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExportPdf = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('Draft successfully exported to PDF! (Mock Action)');
    }, 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(draftContent);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-200px)] bg-[#F9F7F4] rounded-2xl border border-[#EAE3D9] overflow-hidden">
      
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-6 border-b border-[#EAE3D9] bg-white gap-4">
        <div className="flex items-center space-x-3">
           <div className="w-10 h-10 rounded-full bg-[#FDF8F3] border border-[#F5E1C8] flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-[#A43927]" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-[#3E1510]">Executive Brief</h2>
              {/* SCRUBBED: Changed "Month-End Narrative" to "Month-End Report" */}
              <p className="text-xs text-[#A88C87] font-medium uppercase tracking-wider">Month-End Report</p>
            </div>
        </div>
        
        <div className="flex items-center space-x-3 w-full sm:w-auto flex-wrap gap-y-2 sm:gap-y-0 justify-end sm:justify-start">
          <button 
             onClick={handleGenerateDraft}
             disabled={isGenerating || isDataLoading}
             className="flex items-center justify-center px-4 py-2 border border-transparent bg-[#3E1510] text-[#EAE3D9] hover:bg-[#522019] rounded-lg text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
             {isGenerating || isDataLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Bot className="w-4 h-4 mr-2 text-[#DDA77B]" />}
             {isDataLoading ? 'Loading Data...' : 'Generate Draft'}
          </button>

          <button 
             onClick={() => setEditMode(!editMode)}
             className={`flex items-center justify-center px-4 py-2 border rounded-lg text-sm font-bold transition-all ${editMode ? 'bg-[#FDF8F3] border-[#DDA77B] text-[#7A2B20]' : 'bg-white border-[#EAE3D9] text-[#A88C87] hover:text-[#5C4541] hover:border-[#DDA77B]'}`}
          >
             <Edit3 className="w-4 h-4 mr-2" />
             {editMode ? 'Editing' : 'Edit Mode'}
          </button>
          
          <button 
             onClick={handleCopy}
             className="flex items-center justify-center px-4 py-2 bg-white border border-[#DDA77B] text-[#7A2B20] hover:bg-[#FDF8F3] rounded-lg text-sm font-bold transition-all"
          >
             {isCopied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
             Copy to Clipboard
          </button>

          <button 
            onClick={handleExportPdf}
            disabled={isExporting}
            className="flex items-center justify-center px-4 py-2 bg-white border border-[#DDA77B] text-[#7A2B20] hover:bg-[#FDF8F3] rounded-lg text-sm font-bold transition-all disabled:opacity-50"
          >
            {isExporting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
            Export to PDF
          </button>
        </div>
      </div>

      {/* Editor Space */}
      <div className="flex-1 flex overflow-y-auto px-4 py-8 md:py-12 justify-center custom-scrollbar flex-col items-center">
          
        {(ga4Error || youtubeError) && (
          <div className="w-full max-w-[850px] mb-6 flex items-start space-x-3 bg-[#FFF9F9] border border-[#FEE2E2] text-[#A43927] p-4 rounded-lg shadow-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-[#A43927]">Warning: Unable to fetch live data</h3>
              <p className="text-sm font-medium mt-1 text-[#A43927]/80">
                {ga4Error && <span>GA4: {ga4Error}</span>}
                {ga4Error && youtubeError && <br />}
                {youtubeError && <span>YouTube: {youtubeError}</span>}
              </p>
            </div>
          </div>
        )}

        {/* A4 Paper Container */}
        <div className="w-full max-w-[850px] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#EAE3D9] rounded-sm p-8 md:p-16 lg:p-20 min-h-[1056px] relative">
            
            <div className="flex justify-between items-start mb-12 border-b border-[#EAE3D9] pb-8">
              {/* SCRUBBED: Changed "AI-Synthesized Brief" to "Automated Executive Brief" */}
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#FDF8F3] border border-[#F5E1C8] text-[#A43927] font-semibold text-[11px] uppercase tracking-widest">
                <Sparkles className="w-3 h-3" />
                <span>Automated Executive Brief</span>
              </div>
            </div>

            {/* Content Area */}
            {isGenerating ? (
              <div className="space-y-4 animate-pulse">
                <div className="h-10 bg-[#EAE3D9]/50 w-2/3 mb-12"></div>
                <div className="h-4 bg-[#EAE3D9]/50 rounded-full w-full mb-3"></div>
                <div className="h-4 bg-[#EAE3D9]/50 rounded-full w-5/6 mb-3"></div>
                <div className="h-4 bg-[#EAE3D9]/50 rounded-full w-4/6 mb-3"></div>
                <div className="h-6 bg-[#EAE3D9]/50 rounded-full w-1/2 mt-12 mb-6"></div>
                <div className="h-4 bg-[#EAE3D9]/50 rounded-full w-full mb-3"></div>
                <div className="h-4 bg-[#EAE3D9]/50 rounded-full w-full mb-3"></div>
                <div className="h-4 bg-[#EAE3D9]/50 rounded-full w-3/4 mb-3"></div>
              </div>
            ) : (
               editMode ? (
                 <textarea 
                   value={draftContent}
                   onChange={(e) => setDraftContent(e.target.value)}
                   className="w-full h-full min-h-[600px] resize-none outline-none text-[1.05rem] leading-[2] font-sans text-[#5C4541] custom-scrollbar focus:ring-1 focus:ring-[#DDA77B]/30 rounded p-2"
                   placeholder="Start typing..."
                 />
               ) : (
                 <div className="markdown-body">
                   {/* SCRUBBED: Changed "No narrative generated." to "No report generated." */}
                   <Markdown>{draftContent || 'No report generated.'}</Markdown>
                 </div>
               )
            )}
            
        </div>
      </div>

    </div>
  );
}