import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CalendarPlus, X, Filter, Bot, Sparkles } from 'lucide-react';
import { InningRecord } from '../data/allInningsData';
import { getAllInnings } from '../utils/inningsStore';
import { AIIngestionAgentModal } from './AIIngestionAgentModal';

export const InningsCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2023, 10, 1)); // Default: Nov 2023
  const [selectedInning, setSelectedInning] = useState<InningRecord | null>(null);
  const [formatFilter, setFormatFilter] = useState<'ALL' | 'ICC' | 'IPL'>('ALL');
  const [allInningsData, setAllInningsData] = useState<InningRecord[]>(() => getAllInnings());
  const [isAgentOpen, setIsAgentOpen] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      setAllInningsData(getAllInnings());
    };
    window.addEventListener('vk_innings_updated', handleUpdate);
    return () => window.removeEventListener('vk_innings_updated', handleUpdate);
  }, []);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentDate(new Date(parseInt(e.target.value, 10), currentDate.getMonth(), 1));
  };

  // Filter dataset by format selection
  const filteredInnings = allInningsData.filter((item) => {
    if (formatFilter === 'ICC') return item.source === 'ICC';
    if (formatFilter === 'IPL') return item.source === 'IPL';
    return true;
  });

  const getInningForDay = (day: number) => {
    const monthStr = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const targetDate = `${currentDate.getFullYear()}-${monthStr}-${dayStr}`;
    return filteredInnings.find((item) => item.date === targetDate);
  };

  const syncToGoogleCalendar = (inning: InningRecord) => {
    const title = `Virat Kohli: ${inning.runs} Runs vs ${inning.opponent} (${inning.format})`;
    const details = `Match: ${inning.runs} runs vs ${inning.opponent}%0AFormat: ${inning.format}%0AVenue: ${inning.venue}%0ASource: ${inning.source} Official Database.`;
    const dateFormatted = inning.date.replace(/-/g, '');
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${details}&dates=${dateFormatted}T090000Z/${dateFormatted}T170000Z`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#070b12] text-white p-4 sm:p-6 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b border-gray-800 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-cyan-400 tracking-wider uppercase">
              ALL-INNINGS CALENDAR ARCHIVE
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Grounded via ICC Official (629 International Innings) & Official IPL Stats (275 Innings)
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* AI Agent Search & Ingestion Trigger Button */}
            <button
              onClick={() => setIsAgentOpen(true)}
              className="px-3.5 py-1.5 bg-gradient-to-r from-[#d3122a] to-[#9b0b1e] hover:from-[#e21832] hover:to-[#b50e24] text-white text-xs font-bold rounded-xl shadow-[0_0_15px_rgba(211,18,42,0.4)] transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Bot size={15} className="animate-pulse" />
              <span>AI Search Agent</span>
            </button>

            {/* Filter Toggle */}
            <div className="flex items-center bg-[#111827] border border-gray-800 rounded-xl p-1 text-xs">
              {(['ALL', 'ICC', 'IPL'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setFormatFilter(mode)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    formatFilter === mode
                      ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(34,211,238,0.4)]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {mode === 'ALL' ? 'All Innings' : mode === 'ICC' ? 'ICC Intl' : 'IPL Only'}
                </button>
              ))}
            </div>

            {/* Year selector & Date Navigator */}
            <div className="flex items-center gap-2 bg-[#111827] px-3 py-1.5 rounded-xl border border-gray-800">
              <select
                value={currentDate.getFullYear()}
                onChange={handleYearChange}
                className="bg-[#0a0f1d] border border-gray-700 text-cyan-400 font-bold rounded-lg px-2 py-1 text-xs focus:outline-none cursor-pointer"
              >
                {Array.from({ length: 19 }, (_, i) => 2008 + i).map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>

              <button
                onClick={handlePrevMonth}
                className="p-1 hover:bg-gray-800 rounded-lg transition text-gray-300 hover:text-white cursor-pointer"
                title="Previous Month"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="font-bold text-xs min-w-[110px] text-center text-cyan-300 font-mono uppercase">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </span>
              <button
                onClick={handleNextMonth}
                className="p-1 hover:bg-gray-800 rounded-lg transition text-gray-300 hover:text-white cursor-pointer"
                title="Next Month"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2.5 mb-8">
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
            <div key={day} className="text-center text-[10px] font-bold text-gray-500 tracking-widest">
              {day}
            </div>
          ))}

          {/* Spacer cells */}
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className="h-24 bg-[#0a0f1a]/40 rounded-xl border border-gray-900/60 opacity-20" />
          ))}

          {/* Month Days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const inning = getInningForDay(day);

            return (
              <div
                key={day}
                onClick={() => inning && setSelectedInning(inning)}
                className={`h-24 relative p-2.5 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                  inning
                    ? inning.isCentury
                      ? 'border-amber-500/80 bg-[#1a1508] cursor-pointer hover:border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)] hover:scale-[1.02]'
                      : inning.source === 'IPL'
                      ? 'border-purple-500/60 bg-[#140e21] cursor-pointer hover:border-purple-400 hover:scale-[1.02]'
                      : 'border-cyan-500/60 bg-[#0d1726] cursor-pointer hover:border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:scale-[1.02]'
                    : 'border-gray-800/40 bg-[#0a0f1d]'
                }`}
              >
                {/* Score replacing date number */}
                <div className="flex justify-between items-start">
                  {inning ? (
                    <span
                      className={`text-sm md:text-base font-black tracking-tight ${
                        inning.isCentury
                          ? 'text-amber-400'
                          : inning.source === 'IPL'
                          ? 'text-purple-300'
                          : 'text-cyan-300'
                      }`}
                    >
                      {inning.runs} <span className="text-[9px] font-normal text-gray-400">RUNS</span>
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-gray-600">{day}</span>
                  )}

                  {inning && (
                    <span
                      className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded border font-mono ${
                        inning.source === 'IPL'
                          ? 'bg-purple-950 text-purple-300 border-purple-800'
                          : 'bg-cyan-950 text-cyan-300 border-cyan-800'
                      }`}
                    >
                      {inning.format}
                    </span>
                  )}
                </div>

                {/* Match context */}
                {inning && (
                  <div>
                    <div className="text-[10px] font-bold text-white truncate">vs {inning.opponent}</div>
                    <div className="text-[8px] text-gray-400 truncate">{inning.source} Record</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Modal Popup */}
        {selectedInning && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-[#0e1626] border border-cyan-500/40 w-full max-w-md rounded-2xl p-6 relative shadow-2xl text-white">
              <button
                onClick={() => setSelectedInning(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer bg-gray-800/60 p-1.5 rounded-lg transition"
              >
                <X size={20} />
              </button>

              <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
                {selectedInning.source} Grounded Record
              </div>

              <div className="text-4xl font-black mb-2">
                {selectedInning.runs} <span className="text-base font-normal text-gray-400">Runs</span>
              </div>

              {selectedInning.notes && (
                <p className="text-xs text-gray-300 bg-[#141b29] p-3 rounded-xl border border-gray-800 mb-2 leading-relaxed">
                  {selectedInning.notes}
                </p>
              )}

              <div className="space-y-3 text-xs border-t border-b border-gray-800 py-4 my-4">
                <div className="flex justify-between">
                  <span className="text-gray-400 uppercase tracking-wider">Date:</span>
                  <span className="font-bold text-white font-mono">{selectedInning.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 uppercase tracking-wider">Format:</span>
                  <span className="font-bold text-cyan-300 font-mono">{selectedInning.format}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 uppercase tracking-wider">Opponent:</span>
                  <span className="font-bold text-white">{selectedInning.opponent}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 uppercase tracking-wider">Venue:</span>
                  <span className="font-bold text-right text-gray-200">{selectedInning.venue}</span>
                </div>
              </div>

              <button
                onClick={() => syncToGoogleCalendar(selectedInning)}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold uppercase text-xs tracking-wider py-3.5 rounded-xl flex justify-center items-center gap-2 transition cursor-pointer shadow-[0_0_20px_rgba(34,211,238,0.3)]"
              >
                <CalendarPlus size={16} />
                Sync Inning to Google Calendar
              </button>
            </div>
          </div>
        )}

        {/* Google Search AI Ingestion Agent Modal */}
        <AIIngestionAgentModal
          isOpen={isAgentOpen}
          onClose={() => setIsAgentOpen(false)}
          onDataApplied={() => {
            setAllInningsData(getAllInnings());
          }}
        />
      </div>
    </div>
  );
};

export default InningsCalendar;
