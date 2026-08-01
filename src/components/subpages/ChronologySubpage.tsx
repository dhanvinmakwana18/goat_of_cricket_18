import React, { useState, useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight, CalendarPlus, X, ArrowLeft, Search, Filter, Trophy, Zap, ShieldCheck, Bot } from 'lucide-react';
import { getAllInnings } from '../../utils/inningsStore';
import { InningRecord } from '../../data/allInningsData';
import { AIIngestionAgentModal } from '../AIIngestionAgentModal';

interface ChronologySubpageProps {
  onClose: () => void;
}

export const ChronologySubpage: React.FC<ChronologySubpageProps> = ({ onClose }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2023, 10, 1)); // Default: Nov 2023
  const [selectedFormatFilter, setSelectedFormatFilter] = useState<'ALL' | 'ODI' | 'TEST' | 'T20I' | 'IPL'>('ALL');
  const [selectedInning, setSelectedInning] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inningsDataset, setInningsDataset] = useState<InningRecord[]>(() => getAllInnings());
  const [isAgentOpen, setIsAgentOpen] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      setInningsDataset(getAllInnings());
    };
    window.addEventListener('vk_innings_updated', handleUpdate);
    return () => window.removeEventListener('vk_innings_updated', handleUpdate);
  }, []);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Calendar Math
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // Quick Year Jump
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentDate(new Date(parseInt(e.target.value, 10), month, 1));
  };

  // Find innings matching date formatted YYYY-MM-DD
  const getInningsForDate = (day: number) => {
    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return inningsDataset.filter((inning) => {
      const matchDate = inning.date === formattedDate;
      const matchFormat = selectedFormatFilter === 'ALL' || inning.format === selectedFormatFilter;
      const matchQuery = !searchQuery || 
        inning.opponent.toLowerCase().includes(searchQuery.toLowerCase()) || 
        inning.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inning.runs.includes(searchQuery);
      return matchDate && matchFormat && matchQuery;
    });
  };

  // Google Calendar Sync URL Generator
  const syncToGoogleCalendar = (inning: any) => {
    const title = `Virat Kohli: ${inning.runs} runs vs ${inning.opponent} (${inning.format})`;
    const details = `Format: ${inning.format}%0AOpponent: ${inning.opponent}%0ARuns Scored: ${inning.runs}%0AVenue: ${inning.venue}%0A%0AContext: ${inning.notes || inning.matchContext || 'Historic Milestone Sync'}`;
    const dateStr = inning.date.replace(/-/g, '');
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${details}&dates=${dateStr}T090000Z/${dateStr}T170000Z`;
    window.open(url, '_blank');
  };

  // Total recorded innings stats in view
  const monthInnings = useMemo(() => {
    const yearMonthStr = `${year}-${String(month + 1).padStart(2, '0')}`;
    return inningsDataset.filter((i) => i.date.startsWith(yearMonthStr));
  }, [year, month, inningsDataset]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0a0f18] text-white font-sans selection:bg-cyan-500 selection:text-black">
      {/* Top Futuristic Cyan Scanline Header */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-400 z-50 animate-pulse" />

      {/* Navigation & Title Bar */}
      <header className="sticky top-0 z-40 bg-[#0d131f]/95 backdrop-blur-md border-b border-gray-800 px-4 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-800/80 border border-gray-700 hover:bg-cyan-500 hover:text-black font-bold text-xs uppercase tracking-widest transition-all duration-300 group shadow-lg cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Terminal Exit
          </button>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase">// CAREER ARCHIVE PIPELINE</span>
            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-white flex items-center gap-2">
              VIRAT KOHLI INNINGS ARCHIVE
            </h1>
          </div>
        </div>

        {/* Search & Format Filter HUD */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setIsAgentOpen(true)}
            className="px-3.5 py-1.5 bg-gradient-to-r from-[#d3122a] to-[#9b0b1e] hover:from-[#e21832] hover:to-[#b50e24] text-white text-xs font-bold rounded-lg shadow-[0_0_15px_rgba(211,18,42,0.4)] transition-all flex items-center space-x-1.5 cursor-pointer"
          >
            <Bot size={15} className="animate-pulse" />
            <span>AI Search Agent</span>
          </button>

          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-500" />
            <input
              type="text"
              placeholder="Search opponent or venue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#141b29] border border-gray-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 w-48 sm:w-60"
            />
          </div>

          <div className="flex items-center gap-1 bg-[#141b29] p-1 rounded-lg border border-gray-800">
            {['ALL', 'ODI', 'Test', 'T20I', 'IPL'].map((fmt) => (
              <button
                key={fmt}
                onClick={() => setSelectedFormatFilter(fmt)}
                className={`px-2.5 py-1 rounded text-[11px] font-bold uppercase transition-colors cursor-pointer ${
                  selectedFormatFilter === fmt
                    ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(34,211,238,0.4)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-8 py-8">
        {/* Month Navigation & Quick Stats Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 bg-[#141b29] p-6 rounded-2xl border border-gray-800/80 shadow-xl">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">INNINGS TRACKER</span>
            <h2 className="text-3xl font-extrabold text-white mt-1 tracking-tight">
              {monthNames[month]} {year}
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Recorded Innings this Month: <span className="text-cyan-400 font-bold">{monthInnings.length}</span>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <select
              value={year}
              onChange={handleYearChange}
              className="bg-[#0d131f] border border-gray-700 text-cyan-400 font-bold rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-400"
            >
              {Array.from({ length: 19 }, (_, i) => 2008 + i).map((y) => (
                <option key={y} value={y}>
                  Year {y}
                </option>
              ))}
            </select>

            <div className="flex items-center space-x-2 bg-[#0d131f] p-1.5 rounded-lg border border-gray-800">
              <button
                onClick={handlePrevMonth}
                className="p-2 hover:bg-gray-800 text-gray-300 hover:text-white rounded transition cursor-pointer"
                title="Previous Month"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="font-bold text-xs px-2 text-cyan-300 min-w-[100px] text-center uppercase">
                {monthNames[month].slice(0, 3)} {year}
              </span>
              <button
                onClick={handleNextMonth}
                className="p-2 hover:bg-gray-800 text-gray-300 hover:text-white rounded transition cursor-pointer"
                title="Next Month"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-[#0d131f] p-6 rounded-2xl border border-gray-800/80 shadow-2xl mb-8">
          <div className="grid grid-cols-7 gap-3 mb-4">
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
              <div key={day} className="text-center text-xs font-bold text-gray-500 tracking-widest py-1">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-3">
            {/* Empty slots for days before 1st of month */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="h-28 bg-[#090e17] rounded-xl border border-gray-800/30 opacity-40" />
            ))}

            {/* Days in Month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const innings = getInningsForDate(day);
              const hasInning = innings.length > 0;
              const primaryInning = hasInning ? innings[0] : null;

              return (
                <div
                  key={day}
                  onClick={() => primaryInning && setSelectedInning(primaryInning)}
                  className={`h-28 relative p-2.5 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
                    hasInning
                      ? 'border-cyan-500/60 bg-[#141b29] cursor-pointer hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:scale-[1.02]'
                      : 'border-gray-800/50 bg-[#090e17]'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    {primaryInning ? (
                      <span className="text-base font-black text-amber-400 tracking-tight">
                        {primaryInning.runs} <span className="text-[10px] text-gray-400 font-normal">RUNS</span>
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-gray-600">{day}</span>
                    )}
                    {primaryInning && (
                      <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 bg-cyan-950 text-cyan-300 rounded border border-cyan-800 font-mono">
                        {primaryInning.format}
                      </span>
                    )}
                  </div>

                  {primaryInning ? (
                    <div className="mt-1">
                      <div className="text-[11px] font-bold text-white truncate">vs {primaryInning.opponent}</div>
                      <div className="text-[9px] text-slate-400 truncate">{primaryInning.venue}</div>
                    </div>
                  ) : (
                    <div className="text-[9px] text-gray-800 font-mono text-center mb-1">—</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Featured Key Milestones Quick-Access Deck */}
        <div className="bg-[#141b29] p-6 rounded-2xl border border-gray-800 space-y-4">
          <div className="flex justify-between items-center border-b border-gray-800 pb-3">
            <h3 className="text-sm font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
              <Trophy size={16} /> Iconic Career Milestones (Quick Jump)
            </h3>
            <span className="text-xs text-gray-400 font-mono">Click to view & sync</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {inningsDataset.filter((i: any) => i.isCentury || i.isMilestone).slice(0, 6).map((m: any) => (
              <div
                key={m.id}
                onClick={() => setSelectedInning(m)}
                className="p-3 bg-[#0d131f] border border-gray-800 hover:border-cyan-500/60 rounded-xl cursor-pointer transition-all hover:bg-[#111928]"
              >
                <div className="flex justify-between text-[10px] font-mono text-gray-400 mb-1">
                  <span>{m.date}</span>
                  <span className="text-cyan-400 font-bold">{m.format}</span>
                </div>
                <div className="font-extrabold text-white text-base">
                  {m.runs} Runs <span className="text-xs font-normal text-gray-400">vs {m.opponent}</span>
                </div>
                <div className="text-[11px] text-gray-400 truncate mt-1">{m.venue}</div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Match Details Modal Overlay */}
      {selectedInning && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f1724] border border-cyan-500/40 w-full max-w-md rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.2)] relative transform transition-all">
            <button
              onClick={() => setSelectedInning(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white bg-gray-800/60 hover:bg-gray-700 p-1.5 rounded-lg transition cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="p-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 rounded">
                  {selectedInning.format} MATCH RECORD
                </span>
                <span className="text-gray-400 text-xs font-mono">
                  {new Date(selectedInning.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>

              <h2 className="text-5xl font-black text-white mb-2 tracking-tight">
                {selectedInning.runs} <span className="text-gray-500 text-2xl font-medium tracking-normal">Runs</span>
              </h2>

              {selectedInning.matchContext && (
                <p className="text-xs text-gray-300 bg-[#141b29] p-3 rounded-xl border border-gray-800 mb-6 leading-relaxed">
                  {selectedInning.matchContext}
                </p>
              )}

              <div className="space-y-3.5 mb-8 text-sm">
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-400 uppercase text-xs tracking-wider">Format</span>
                  <span className="font-bold text-cyan-300">{selectedInning.format}</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-400 uppercase text-xs tracking-wider">Opponent</span>
                  <span className="font-bold text-white flex items-center gap-2">
                    {selectedInning.opponent}
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-400 uppercase text-xs tracking-wider">Venue</span>
                  <span className="font-bold text-right text-gray-200 max-w-[220px]">{selectedInning.venue}</span>
                </div>
              </div>

              <button
                onClick={() => syncToGoogleCalendar(selectedInning)}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold uppercase tracking-widest py-3.5 rounded-xl flex justify-center items-center gap-3 transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(34,211,238,0.3)] cursor-pointer text-xs"
              >
                <CalendarPlus size={18} />
                Sync to Google Calendar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Search Agent Ingestion Modal */}
      <AIIngestionAgentModal
        isOpen={isAgentOpen}
        onClose={() => setIsAgentOpen(false)}
        onDataApplied={() => {
          setInningsDataset(getAllInnings());
        }}
      />
    </div>
  );
};
