import React, { useState } from 'react';
import { FileText, Save, Download, Sparkles, Send, Loader2, RefreshCw, Copy, Check, Edit3, Bot } from 'lucide-react';
import Markdown from 'react-markdown';
import { metaAdsCampaigns, metaOrganicPosts, ga4Kpis, youtubeKpis } from '../utils/mockData';
import { generateMonthlyDraft } from '../lib/gemini';

export function DraftReportView() {
  const [isExporting, setIsExporting] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  const [draftContent, setDraftContent] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateDraft = async () => {
    setIsGenerating(true);
    setEditMode(false);
    
    const context = {
      ga4: ga4Kpis,
      metaAds: metaAdsCampaigns,
      metaOrganic: metaOrganicPosts,
      youtube: youtubeKpis
    };

    try {
      const text = await generateMonthlyDraft(context);
      if (text) setDraftContent(text);
    } catch (e) {
      setDraftContent('An error occurred while weaving the narrative. Please check your API key and connection.');
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
              <p className="text-xs text-[#A88C87] font-medium uppercase tracking-wider">Month-End Narrative</p>
            </div>
        </div>
        
        <div className="flex items-center space-x-3 w-full sm:w-auto flex-wrap gap-y-2 sm:gap-y-0 justify-end sm:justify-start">
          <button 
             onClick={handleGenerateDraft}
             disabled={isGenerating}
             className="flex items-center justify-center px-4 py-2 border border-transparent bg-[#3E1510] text-[#EAE3D9] hover:bg-[#522019] rounded-lg text-sm font-bold transition-all disabled:opacity-50"
          >
             {isGenerating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Bot className="w-4 h-4 mr-2 text-[#DDA77B]" />}
             Generate Draft
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
      <div className="flex-1 flex overflow-y-auto px-4 py-8 md:py-12 justify-center custom-scrollbar">
          
        {/* A4 Paper Container */}
        <div className="w-full max-w-[850px] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#EAE3D9] rounded-sm p-8 md:p-16 lg:p-20 min-h-[1056px] relative">
            
            <div className="flex justify-between items-start mb-12 border-b border-[#EAE3D9] pb-8">
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-[#FDF8F3] border border-[#F5E1C8] text-[#A43927] font-semibold text-[11px] uppercase tracking-widest">
                <Sparkles className="w-3 h-3" />
                <span>AI-Synthesized Brief</span>
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
                   <Markdown>{draftContent || 'No narrative generated.'}</Markdown>
                 </div>
               )
            )}
            
        </div>
      </div>

    </div>
  );
}
