import React, { useState } from 'react';
import { Calendar, Filter, Share2, Download, Sparkles, ChevronDown, Check, Menu, LogOut, X } from 'lucide-react';
import { auth, signOut } from '../lib/firebase';
import { useDateRange } from '../contexts/DateContext';

interface HeaderProps {
  onMenuClick?: () => void;
}

const formatDate = (d: Date) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export function Header({ onMenuClick }: HeaderProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isCustomRangeOpen, setIsCustomRangeOpen] = useState(false);
  const [customStart, setCustomStart] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return formatDate(d);
  });
  const [customEnd, setCustomEnd] = useState(formatDate(new Date()));
  const { label, setDateRange } = useDateRange();

  const calculateDateRange = (labelName: string) => {
    const today = new Date();
    
    if (labelName === 'Today') {
      return { start: formatDate(today), end: formatDate(today) };
    }
    if (labelName === 'Yesterday') {
      const y = new Date(today);
      y.setDate(y.getDate() - 1);
      return { start: formatDate(y), end: formatDate(y) };
    }
    if (labelName === 'Last 7 Days') {
      const s = new Date(today);
      s.setDate(s.getDate() - 7);
      return { start: formatDate(s), end: formatDate(today) };
    }
    if (labelName === 'Last 30 Days') {
      const s = new Date(today);
      s.setDate(s.getDate() - 30);
      return { start: formatDate(s), end: formatDate(today) };
    }
    if (labelName === 'This Month') {
      const s = new Date(today.getFullYear(), today.getMonth(), 1);
      return { start: formatDate(s), end: formatDate(today) };
    }
    if (labelName === 'Last Month') {
      const s = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const e = new Date(today.getFullYear(), today.getMonth(), 0);
      return { start: formatDate(s), end: formatDate(e) };
    }
    return { start: formatDate(today), end: formatDate(today) };
  };

  const dateRanges = [
    { label: 'Today', value: 'Today' },
    { label: 'Yesterday', value: 'Yesterday' },
    { label: 'Last 7 Days', value: 'Last 7 Days' },
    { label: 'Last 30 Days', value: 'Last 30 Days' },
    { label: 'This Month', value: 'This Month' },
    { label: 'Last Month', value: 'Last Month' },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-[#EAE3D9] px-4 md:px-8 py-4 flex items-center justify-between sticky top-0 z-20 font-sans w-full">
      <div className="flex items-center gap-3 shrink-0 flex-1 min-w-0">
        {onMenuClick && (
          <button 
            onClick={onMenuClick}
            className="md:hidden p-2 -ml-2 text-[#3E1510] hover:bg-[#F9F7F4] rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        )}
        <div className="flex items-center space-x-4 min-w-0">
          <h2 className="text-xl md:text-2xl font-serif font-bold text-[#3E1510] whitespace-nowrap truncate">Executive Dashboard</h2>
          <span className="px-2.5 py-1 rounded-full bg-[#F3EFE9] text-[#7A2B20] text-xs font-semibold border border-[#EAE3D9] hidden lg:flex items-center whitespace-nowrap shrink-0">
            <Sparkles className="w-3 h-3 mr-1.5 shrink-0" />
            Intelligence Active
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4 shrink-0 flex-none ml-4">
        <div className="hidden xl:flex items-center mr-2 text-[10px] font-bold text-[#A88C87] uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2E6B3B] mr-2 animate-pulse"></span>
          Last synced: Today at 08:30 AM
        </div>
        {/* Date Filter Dropdown */}
        <div className="relative shrink-0">
          <button 
            onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
            className={`flex items-center bg-white border ${isDatePickerOpen ? 'border-[#DDA77B] ring-1 ring-[#DDA77B]/20' : 'border-[#EAE3D9]'} rounded-lg px-3 py-2 text-sm font-medium text-[#5C4541] cursor-pointer hover:bg-[#F9F7F4] transition-all shadow-sm whitespace-nowrap hidden sm:flex`}
          >
            <Calendar className="w-4 h-4 mr-2 text-[#A88C87] shrink-0" />
            {label}
            <ChevronDown className={`w-4 h-4 ml-2 text-[#A88C87] transition-transform ${isDatePickerOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {/* Mobile minimal date button */}
          <button 
            onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
            className={`sm:hidden flex items-center justify-center w-10 h-10 bg-white border ${isDatePickerOpen ? 'border-[#DDA77B] ring-1 ring-[#DDA77B]/20' : 'border-[#EAE3D9]'} rounded-lg hover:bg-[#F9F7F4] transition-all shadow-sm shrink-0`}
          >
            <Calendar className="w-4 h-4 text-[#5C4541]" />
          </button>

          {isDatePickerOpen && (
            <>
              {/* Invisible backdrop to dismiss dropdown */}
              <div 
                className="fixed inset-0 z-30" 
                onClick={() => setIsDatePickerOpen(false)}
              ></div>
              
              <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-[#EAE3D9] rounded-xl shadow-lg z-40 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2">
                {dateRanges.map((range) => (
                  <button
                    key={range.label}
                    onClick={() => {
                      const { start, end } = calculateDateRange(range.value);
                      setDateRange(start, end, range.label);
                      setIsDatePickerOpen(false);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-[#FDF8F3] transition-colors flex items-center justify-between group"
                  >
                    <span className={`${label === range.label ? 'font-bold text-[#7A2B20]' : 'font-medium text-[#5C4541] group-hover:text-[#3E1510]'}`}>
                      {range.label}
                    </span>
                    {label === range.label && (
                      <Check className="w-4 h-4 text-[#DDA77B]" />
                    )}
                  </button>
                ))}
                <div className="border-t border-[#EAE3D9] mt-2 pt-2 px-4 pb-3">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-[10px] uppercase font-bold text-[#A88C87] tracking-wider">Custom Range</p>
                    {isCustomRangeOpen && (
                      <button onClick={(e) => { e.stopPropagation(); setIsCustomRangeOpen(false); }} className="text-[#A88C87] hover:text-[#7A2B20]">
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                  
                  {!isCustomRangeOpen ? (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsCustomRangeOpen(true);
                      }}
                      className="w-full py-2 bg-[#F9F7F4] text-[#7A2B20] text-xs font-bold rounded-lg border border-[#EAE3D9] hover:bg-[#F3EFE9] transition-colors"
                    >
                      Select Dates
                    </button>
                  ) : (
                    <div className="space-y-3" onClick={(e) => e.stopPropagation()}>
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[10px] font-semibold text-[#5C4541]">Start Date</label>
                        <input 
                          type="date" 
                          value={customStart}
                          onChange={(e) => setCustomStart(e.target.value)}
                          className="w-full text-xs font-medium text-[#5C4541] border border-[#EAE3D9] rounded-md p-2 focus:outline-none focus:border-[#DDA77B]"
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5">
                        <label className="text-[10px] font-semibold text-[#5C4541]">End Date</label>
                        <input 
                          type="date" 
                          value={customEnd}
                          onChange={(e) => setCustomEnd(e.target.value)}
                          className="w-full text-xs font-medium text-[#5C4541] border border-[#EAE3D9] rounded-md p-2 focus:outline-none focus:border-[#DDA77B]"
                        />
                      </div>
                      <button 
                        onClick={() => {
                          const formatDateLabel = (dateString: string) => {
                            if (!dateString) return '';
                            const d = new Date(dateString);
                            return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                          };
                          const newLabel = `${formatDateLabel(customStart)} - ${formatDateLabel(customEnd)}`;
                          setDateRange(customStart, customEnd, newLabel);
                          setIsDatePickerOpen(false);
                          setIsCustomRangeOpen(false);
                        }}
                        className="w-full py-2 mt-1 bg-[#3E1510] text-[#EAE3D9] text-xs font-bold rounded-lg hover:bg-[#5D221A] transition-colors"
                      >
                        Apply Range
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Global Filter */}
        <button className="hidden md:flex items-center bg-white border border-[#EAE3D9] rounded-lg px-4 py-2 text-sm font-medium text-[#5C4541] hover:bg-[#F9F7F4] transition-colors shadow-sm whitespace-nowrap shrink-0">
          <Filter className="w-4 h-4 mr-2 text-[#A88C87] shrink-0" />
          Filter
        </button>

        <div className="hidden md:block w-px h-6 bg-[#EAE3D9] mx-1 md:mx-2 shrink-0"></div>

        {/* Actions */}
        <button className="text-[#A88C87] hover:text-[#3E1510] p-1.5 transition-colors shrink-0 hidden sm:block">
          <Share2 className="w-5 h-5 shrink-0" />
        </button>
        <button className="flex items-center bg-[#7A2B20] text-white rounded-lg px-4 py-2 text-sm font-bold hover:bg-[#5D221A] transition-colors shadow-sm whitespace-nowrap shrink-0">
          <Download className="w-4 h-4 sm:mr-2 shrink-0" />
          <span className="hidden sm:inline">Export</span>
        </button>
        <button 
          onClick={() => signOut(auth)}
          className="ml-2 text-[#A88C87] hover:text-[#7A2B20] p-1.5 transition-colors shrink-0 flex items-center justify-center bg-white border border-[#EAE3D9] rounded-lg shadow-sm w-9 h-9 sm:w-auto sm:px-3 sm:py-2"
          title="Sign out"
        >
          <LogOut className="w-4 h-4 sm:mr-2 shrink-0" />
          <span className="hidden sm:inline text-sm font-semibold">Log out</span>
        </button>
      </div>
    </header>
  );
}

