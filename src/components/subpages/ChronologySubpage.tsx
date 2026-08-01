import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, CalendarPlus, X, ArrowLeft, Search, Filter, Trophy, Zap, ShieldCheck } from 'lucide-react';

interface InningRecord {
  id: string;
  date: string; // YYYY-MM-DD
  format: 'ODI' | 'Test' | 'T20I' | 'IPL';
  runs: string;
  opponent: string;
  venue: string;
  matchContext?: string;
  isMilestone?: boolean;
}

// Comprehensive database of iconic Virat Kohli innings (2008 - 2026)
const INNINGS_DB: InningRecord[] = [
  // 2026 Matches
  { id: '2026-1', date: '2026-07-19', format: 'ODI', runs: '74', opponent: 'England', venue: "Lord's Cricket Ground, London", matchContext: 'Resilient 74 anchoring the middle overs in the 2026 England Tour.', isMilestone: true },
  { id: '2026-2', date: '2026-03-22', format: 'ODI', runs: '108*', opponent: 'Sri Lanka', venue: 'R. Premadasa Stadium, Colombo', matchContext: 'Flawless century in run chase, mastering spin conditions.', isMilestone: true },
  { id: '2026-3', date: '2026-01-14', format: 'Test', runs: '89', opponent: 'South Africa', venue: 'Newlands, Cape Town', matchContext: 'Gritty 89 under extreme seam movement.', isMilestone: false },

  // 2024 Matches
  { id: '2024-1', date: '2024-06-29', format: 'T20I', runs: '76', opponent: 'South Africa', venue: 'Kensington Oval, Barbados', matchContext: 'Player of the Match in T20 World Cup 2024 Final victory!', isMilestone: true },
  { id: '2024-2', date: '2024-05-18', format: 'IPL', runs: '47', opponent: 'CSK', venue: 'M. Chinnaswamy Stadium, Bengaluru', matchContext: 'Crucial knockout qualifier storming into IPL playoffs.', isMilestone: false },

  // 2023 Matches (Historical 50th ODI Century & World Cup)
  { id: '2023-1', date: '2023-11-15', format: 'ODI', runs: '117', opponent: 'New Zealand', venue: 'Wankhede Stadium, Mumbai', matchContext: 'RECORD-BREAKING 50th ODI CENTURY! Overtook Sachin Tendulkar in World Cup Semi-Final.', isMilestone: true },
  { id: '2023-2', date: '2023-11-05', format: 'ODI', runs: '101*', opponent: 'South Africa', venue: 'Eden Gardens, Kolkata', matchContext: '35th Birthday Century on a turning track against Rabada and Maharaj.', isMilestone: true },
  { id: '2023-3', date: '2023-10-19', format: 'ODI', runs: '103*', opponent: 'Bangladesh', venue: 'MCA Stadium, Pune', matchContext: 'Masterclass chase finish reaching 100 with a winning six.', isMilestone: true },
  { id: '2023-4', date: '2023-03-12', format: 'Test', runs: '186', opponent: 'Australia', venue: 'Narendra Modi Stadium, Ahmedabad', matchContext: 'Epic 186 in BGT Test series, breaking Test century drought.', isMilestone: true },

  // 2022 Matches (MCG Miracle & 71st Century)
  { id: '2022-1', date: '2022-10-23', format: 'T20I', runs: '82*', opponent: 'Pakistan', venue: 'MCG, Melbourne', matchContext: 'THE MCG MIRACLE. Iconic "Shot of the Century" over Haris Rauf in T20 World Cup.', isMilestone: true },
  { id: '2022-2', date: '2022-09-08', format: 'T20I', runs: '122*', opponent: 'Afghanistan', venue: 'Dubai International Stadium', matchContext: '71st International Century! First T20I Hundred off 61 balls.', isMilestone: true },

  // 2021 Matches
  { id: '2021-1', date: '2021-02-13', format: 'Test', runs: '0', opponent: 'England', venue: 'Chepauk, Chennai', matchContext: 'Dismissed early in tricky spinning conditions.', isMilestone: false },
  { id: '2021-2', date: '2021-03-18', format: 'T20I', runs: '77*', opponent: 'England', venue: 'Narendra Modi Stadium, Ahmedabad', matchContext: 'Blistering counter-attack against Wood and Archer.', isMilestone: false },

  // 2019 Matches
  { id: '2019-1', date: '2019-11-23', format: 'Test', runs: '136', opponent: 'Bangladesh', venue: 'Eden Gardens, Kolkata', matchContext: 'First Pink-Ball Day/Night Test Century in India.', isMilestone: true },
  { id: '2019-2', date: '2019-10-11', format: 'Test', runs: '254*', opponent: 'South Africa', venue: 'MCA Stadium, Pune', matchContext: 'Career-best 254* double century in Test cricket.', isMilestone: true },

  // 2018 Matches (Peak Year)
  { id: '2018-1', date: '2018-10-24', format: 'ODI', runs: '157*', opponent: 'West Indies', venue: 'Vizag', matchContext: 'Fastest player to reach 10,000 ODI runs in history!', isMilestone: true },
  { id: '2018-2', date: '2018-08-02', format: 'Test', runs: '149', opponent: 'England', venue: 'Edgbaston, Birmingham', matchContext: 'Masterful 149 rescuing India and conquering English conditions.', isMilestone: true },
  { id: '2018-3', date: '2018-01-15', format: 'Test', runs: '153', opponent: 'South Africa', venue: 'SuperSport Park, Centurion', matchContext: 'Sole warrior century on a hyper-fast Centurion pitch.', isMilestone: true },

  // 2016 Matches (IPL 973 Runs & T20 WC)
  { id: '2016-1', date: '2016-03-27', format: 'T20I', runs: '82*', opponent: 'Australia', venue: 'PCA Stadium, Mohali', matchContext: 'Peak T20 chase masterclass sending India to T20 World Cup semi-finals.', isMilestone: true },
  { id: '2016-2', date: '2016-05-18', format: 'IPL', runs: '113', opponent: 'KXIP', venue: 'M. Chinnaswamy Stadium, Bengaluru', matchContext: 'Scored 113 in 15-over rain-affected match with 9 stitches on hand.', isMilestone: true },

  // 2014 Matches
  { id: '2014-1', date: '2014-12-11', format: 'Test', runs: '115', opponent: 'Australia', venue: 'Adelaide Oval', matchContext: 'Twin centuries on Test captaincy debut at Adelaide.', isMilestone: true },
  { id: '2014-2', date: '2014-12-14', format: 'Test', runs: '141', opponent: 'Australia', venue: 'Adelaide Oval', matchContext: 'Sensational 4th innings chase effort.', isMilestone: true },

  // 2013 Matches
  { id: '2013-1', date: '2013-10-16', format: 'ODI', runs: '100*', opponent: 'Australia', venue: 'Sawai Mansingh Stadium, Jaipur', matchContext: 'Fastest ODI century by an Indian (52 balls) chasing 360.', isMilestone: true },

  // 2012 Matches
  { id: '2012-1', date: '2012-03-18', format: 'ODI', runs: '183', opponent: 'Pakistan', venue: 'Sher-e-Bangla, Mirpur', matchContext: 'Highest individual ODI score (183) chasing down 330+ vs Pakistan.', isMilestone: true },
  { id: '2012-2', date: '2012-02-28', format: 'ODI', runs: '133*', opponent: 'Sri Lanka', venue: 'Hobart, Australia', matchContext: 'Annihilated Malinga and Sri Lanka, chasing 321 in 36.4 overs.', isMilestone: true },

  // 2011 Matches (World Cup Winner)
  { id: '2011-1', date: '2011-04-02', format: 'ODI', runs: '35', opponent: 'Sri Lanka', venue: 'Wankhede Stadium, Mumbai', matchContext: 'Crucial 83-run partnership with Gambhir in CWC 2011 Final.', isMilestone: true },

  // 2009 & 2008 Matches
  { id: '2009-1', date: '2009-12-24', format: 'ODI', runs: '107', opponent: 'Sri Lanka', venue: 'Eden Gardens, Kolkata', matchContext: 'Maiden International ODI Century! Handed MoM trophy to Gambhir.', isMilestone: true },
  { id: '2008-1', date: '2008-08-18', format: 'ODI', runs: '12', opponent: 'Sri Lanka', venue: 'Dambulla', matchContext: 'International Cricket Debut as opening batsman.', isMilestone: false },
];

interface ChronologySubpageProps {
  onClose: () => void;
}

export const ChronologySubpage: React.FC<ChronologySubpageProps> = ({ onClose }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2026, 6, 1)); // Default July 2026
  const [selectedInning, setSelectedInning] = useState<InningRecord | null>(null);
  const [selectedFormatFilter, setSelectedFormatFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

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
    return INNINGS_DB.filter((inning) => {
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
  const syncToGoogleCalendar = (inning: InningRecord) => {
    const title = `Virat Kohli: ${inning.runs} runs vs ${inning.opponent} (${inning.format})`;
    const details = `Format: ${inning.format}%0AOpponent: ${inning.opponent}%0ARuns Scored: ${inning.runs}%0AVenue: ${inning.venue}%0A%0AContext: ${inning.matchContext || 'Historic Milestone Sync'}`;
    const dateStr = inning.date.replace(/-/g, '');
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${details}&dates=${dateStr}T090000Z/${dateStr}T170000Z`;
    window.open(url, '_blank');
  };

  // Total recorded innings stats in view
  const monthInnings = useMemo(() => {
    const yearMonthStr = `${year}-${String(month + 1).padStart(2, '0')}`;
    return INNINGS_DB.filter((i) => i.date.startsWith(yearMonthStr));
  }, [year, month]);

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
            {INNINGS_DB.filter((i) => i.isMilestone).slice(0, 6).map((m) => (
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
    </div>
  );
};
