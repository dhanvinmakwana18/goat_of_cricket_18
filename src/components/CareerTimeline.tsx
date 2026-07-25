import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ICC_KOHLI_YEARLY_STATS, YearlyStat } from '../data/iccStatsData';
import { SubpageHoverTrigger } from './SubpageHoverTrigger';

type FormatType = 'Test' | 'ODI' | 'T20I' | 'YouthU19';

export const CareerTimeline: React.FC = () => {
  const [activeFormat, setActiveFormat] = useState<FormatType>('ODI');
  const [selectedMilestone, setSelectedMilestone] = useState<{ stat: YearlyStat; format: string } | null>(null);
  const [detailedPortalActive, setDetailedPortalActive] = useState(false);

  const currentStats = ICC_KOHLI_YEARLY_STATS[activeFormat];

  // Helper to parse hundreds from "100s / 50s" string (e.g., "6 / 8" -> 6)
  const getHundredsCount = (hundredsFifties: string) => {
    const parts = hundredsFifties.split(' / ');
    return parseInt(parts[0], 10) || 0;
  };

  const handleTriggerDetailedView = () => {
    setDetailedPortalActive(true);
    // Find top peak stat for active format to display in modal
    const peakStat = currentStats.reduce((max, curr) => (curr.runs > max.runs ? curr : max), currentStats[0]);
    if (peakStat) {
      setSelectedMilestone({ stat: peakStat, format: activeFormat });
    }
  };

  return (
    <section id="timeline" className="py-20 bg-[#0A0A0A] text-[#F5F5F5] min-h-screen px-4 md:px-8 relative scroll-mt-20 border-b border-white/10">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-amber-400 font-bold tracking-widest text-[10px] uppercase bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            // OFFICIAL ICC DATA (2006 - 2026)
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold mt-4 font-syne uppercase tracking-tight bg-gradient-to-r from-white via-neutral-200 to-amber-400 bg-clip-text text-transparent">
            YEAR-BY-YEAR CAREER TIMELINE
          </h2>
          <p className="text-neutral-400 text-sm mt-3 tracking-wide">Click on any milestone year card to inspect detailed stats & records.</p>
        </div>

        {/* Hover-based Transition Portal Trigger */}
        <div className="max-w-2xl mx-auto mb-14">
          <SubpageHoverTrigger
            title="Detailed Year-by-Year Breakdown"
            subtitle="Hover for 600ms to automatically launch the interactive peak season analytics view."
            onTrigger={handleTriggerDetailedView}
            hoverDurationMs={600}
          />
        </div>

        {/* Format Selector Tabs */}
        <div className="flex justify-center gap-2 md:gap-4 mb-14 flex-wrap">
          {(['ODI', 'Test', 'T20I', 'YouthU19'] as FormatType[]).map((format) => (
            <button
              key={format}
              onClick={() => setActiveFormat(format)}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 border cursor-pointer ${
                activeFormat === format
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              {format === 'YouthU19' ? 'U-19 / Youth' : format}
            </button>
          ))}
        </div>

        {/* Timeline Stack */}
        <div className="relative border-l-2 border-slate-800 ml-4 md:ml-32 space-y-8">
          {currentStats.map((stat: YearlyStat, index: number) => {
            const hundreds = getHundredsCount(stat.hundredsFifties);
            const isMilestoneYear = hundreds >= 3 || stat.runs >= 1000;

            return (
              <motion.div
                key={`${activeFormat}-${stat.year}`}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="relative pl-8 md:pl-12 group"
              >
                {/* Timeline Node Badge */}
                <div className={`absolute -left-[17px] top-1.5 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                  isMilestoneYear 
                    ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/20 shadow-lg shadow-amber-400/30' 
                    : 'bg-slate-800 text-slate-300 ring-4 ring-slate-950'
                }`}>
                  {hundreds > 0 ? '🏏' : '★'}
                </div>

                {/* Year Label */}
                <div className="hidden md:block absolute -left-28 top-2 text-right w-20">
                  <span className={`text-xl font-extrabold ${isMilestoneYear ? 'text-amber-400' : 'text-slate-400'}`}>
                    {stat.year}
                  </span>
                </div>

                {/* Card Content (Clickable for Milestones) */}
                <div 
                  onClick={() => isMilestoneYear && setSelectedMilestone({ stat, format: activeFormat })}
                  className={`p-6 rounded-2xl border transition-all duration-300 ${
                    isMilestoneYear
                      ? 'bg-slate-900/90 border-amber-500/40 shadow-xl shadow-amber-500/5 cursor-pointer hover:border-amber-400 hover:scale-[1.01]'
                      : 'bg-slate-900/40 border-slate-800/80'
                  }`}
                >
                  <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
                    <span className="md:hidden text-lg font-black text-amber-400">{stat.year}</span>
                    <span className="text-xs uppercase font-semibold text-slate-400">
                      Matches: <strong className="text-white">{stat.matches}</strong>
                    </span>
                    {isMilestoneYear && (
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 px-2 py-1 rounded flex items-center gap-1">
                        🏆 Milestone Year ({hundreds} Hundreds) — Click to View
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                      <p className="text-[11px] text-slate-400 uppercase font-medium">Runs</p>
                      <p className="text-xl font-extrabold text-amber-400">{stat.runs}</p>
                    </div>
                    <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                      <p className="text-[11px] text-slate-400 uppercase font-medium">Average</p>
                      <p className="text-xl font-extrabold text-white">{stat.avg.toFixed(2)}</p>
                    </div>
                    <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                      <p className="text-[11px] text-slate-400 uppercase font-medium">100s / 50s</p>
                      <p className="text-xl font-extrabold text-emerald-400">{stat.hundredsFifties}</p>
                    </div>
                    <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/60">
                      <p className="text-[11px] text-slate-400 uppercase font-medium">Highest Score</p>
                      <p className="text-xl font-extrabold text-sky-400">{stat.hs}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Milestone Popup Modal */}
      <AnimatePresence>
        {selectedMilestone && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-slate-900 border border-amber-500/50 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative overflow-hidden text-center"
            >
              {/* Background Glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <span className="text-3xl mb-2 inline-block">👑</span>
              <h3 className="text-2xl font-black text-amber-400">
                {selectedMilestone.stat.year} Peak Achievement
              </h3>
              <p className="text-slate-400 text-xs uppercase tracking-widest mt-1 mb-6">
                Official {selectedMilestone.format} Record
              </p>

              <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800 space-y-3 text-left">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Total Runs Scored:</span>
                  <span className="font-extrabold text-amber-400">{selectedMilestone.stat.runs}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Centuries & Fifties:</span>
                  <span className="font-extrabold text-emerald-400">{selectedMilestone.stat.hundredsFifties}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Highest Score:</span>
                  <span className="font-extrabold text-sky-400">{selectedMilestone.stat.hs}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Batting Average:</span>
                  <span className="font-extrabold text-white">{selectedMilestone.stat.avg.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedMilestone(null)}
                className="mt-6 w-full py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm transition-all hover:bg-amber-400 shadow-lg shadow-amber-500/20 cursor-pointer"
              >
                Close Milestone View
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
