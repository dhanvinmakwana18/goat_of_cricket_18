import React, { useState } from 'react';
import { Calendar, CheckCircle2, Trophy, ExternalLink, Flame, Search, ArrowRight } from 'lucide-react';
import { KOHLI_HISTORIC_MILESTONES, CalendarMilestone } from '../data/milestoneCalendarData';
import { getGoogleCalendarMilestoneUrl } from '../utils/googleCalendarEngine';

export const MilestoneCalendarPortal: React.FC = () => {
  const [filter, setFilter] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [syncedIds, setSyncedIds] = useState<Record<string, boolean>>({});

  const filteredMilestones = KOHLI_HISTORIC_MILESTONES.filter((item) => {
    const matchesFilter = filter === 'ALL' || item.category === filter;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.opponent.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleSyncClick = (id: string, url: string) => {
    setSyncedIds((prev) => ({ ...prev, [id]: true }));
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="google-calendar-portal" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
      <div className="bg-[#0b0e17] border border-cyan-500/30 rounded-3xl p-6 md:p-10 text-white relative overflow-hidden shadow-2xl">
        {/* Decorative Grid & Glow Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 border-b border-white/10 pb-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-800 flex items-center gap-1.5">
                <Calendar className="w-3 h-3 text-cyan-400" />
                GOOGLE CALENDAR INTEGRATION
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-800">
                LIVE SYNC ENGINE
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black font-syne uppercase tracking-tight text-white flex items-center gap-3">
              Historic Milestone Google Calendar Sync
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-mono mt-1 max-w-3xl">
              Sync annual recurring Google Calendar reminders for Virat Kohli's historic 80+ centuries, run milestones (1k–27k+ runs), and World Cup championship victories.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search milestone, opponent, venue..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/60 border border-white/15 focus:border-cyan-400 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 font-mono focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Filter Navigation Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-white/5 no-scrollbar relative z-10">
          {[
            { id: 'ALL', label: 'All Milestones', icon: Trophy },
            { id: 'RUN_MILESTONE', label: 'Run Velocity (1k - 27k+)', icon: Flame },
            { id: 'CHAMPIONSHIP', label: 'World Cup Titles', icon: Trophy },
            { id: 'CENTURY_HIGHLIGHT', label: 'Century Archives', icon: Calendar },
            { id: 'CAREER_DEBUT', label: 'Career Debuts', icon: ArrowRight },
          ].map((cat) => {
            const Icon = cat.icon;
            const isActive = filter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold font-syne uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-2 border ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                    : 'bg-white/5 text-neutral-400 border-white/10 hover:border-white/20 hover:text-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-cyan-400'}`} />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Milestone Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
          {filteredMilestones.map((milestone: CalendarMilestone) => {
            const calendarUrl = getGoogleCalendarMilestoneUrl(milestone);
            const isSynced = syncedIds[milestone.id];

            return (
              <div
                key={milestone.id}
                className="p-6 bg-[#07090f] border border-white/10 hover:border-cyan-500/50 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] group relative overflow-hidden"
              >
                {/* Accent Top Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-rose-500 to-amber-400 opacity-60 group-hover:opacity-100 transition-opacity" />

                <div>
                  <div className="flex justify-between items-center text-xs mb-3 font-mono">
                    <span className="text-cyan-400 font-bold bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800/60">
                      📅 {milestone.day}/{milestone.month} ({milestone.yearScored})
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white/10 text-neutral-300 font-bold uppercase text-[10px]">
                      {milestone.format}
                    </span>
                  </div>

                  <h3 className="text-lg font-black font-syne text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
                    {milestone.title}
                  </h3>

                  <p className="text-xs text-neutral-400 font-body mt-2 leading-relaxed line-clamp-3">
                    {milestone.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-white/5 space-y-1 font-mono text-[11px] text-neutral-400">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Venue:</span>
                      <span className="text-neutral-300 truncate max-w-[180px]">{milestone.venue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Opponent:</span>
                      <span className="text-emerald-400 font-semibold">{milestone.opponent}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleSyncClick(milestone.id, calendarUrl)}
                  className={`mt-6 w-full py-3 px-4 rounded-xl font-syne font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-lg ${
                    isSynced
                      ? 'bg-emerald-500 text-slate-950 border border-emerald-400'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 border border-cyan-300 shadow-cyan-500/20'
                  }`}
                >
                  {isSynced ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-slate-950" />
                      <span>Synced To Google Calendar</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      <span>Sync to Google Calendar</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {filteredMilestones.length === 0 && (
          <div className="text-center py-12 text-neutral-500 font-mono text-xs">
            No milestones found matching your search. Try adjusting keywords or category filters.
          </div>
        )}
      </div>
    </section>
  );
};
