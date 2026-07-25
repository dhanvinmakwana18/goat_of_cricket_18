import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ICC_KOHLI_YEARLY_STATS, YearlyStat } from '../../data/iccStatsData';
import { Calendar, TrendingUp, Award, Zap, BarChart2, Shield, ArrowLeft } from 'lucide-react';

interface ChronologySubpageProps {
  onClose: () => void;
}

type FormatType = 'ODI' | 'Test' | 'T20I' | 'YouthU19';

export const ChronologySubpage: React.FC<ChronologySubpageProps> = ({ onClose }) => {
  const [activeFormat, setActiveFormat] = useState<FormatType>('ODI');
  const [selectedYear, setSelectedYear] = useState<YearlyStat | null>(null);
  const [compareYear1, setCompareYear1] = useState<string>('2018');
  const [compareYear2, setCompareYear2] = useState<string>('2023');

  const currentStats = ICC_KOHLI_YEARLY_STATS[activeFormat];

  // Helper to get total runs in active format
  const totalRunsInFormat = currentStats.reduce((acc, curr) => acc + curr.runs, 0);
  const peakYearInFormat = currentStats.reduce((max, curr) => (curr.runs > max.runs ? curr : max), currentStats[0]);

  const year1Data = currentStats.find((s) => s.year === compareYear1) || currentStats[0];
  const year2Data = currentStats.find((s) => s.year === compareYear2) || currentStats[1] || currentStats[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#05060a] text-[#F5F5F5] font-body selection:bg-rose-500 selection:text-white">
      {/* Background Motion Grid & Laser Scanline */}
      <div className="fixed inset-0 opacity-[0.05] bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 animate-pulse z-50" />

      {/* Header HUD Bar */}
      <header className="sticky top-0 z-40 bg-[#080910]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-rose-500 hover:text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 group shadow-lg"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Terminal Exit
          </button>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-rose-400 uppercase">// TELEMETRY MODULE 01</span>
            <h1 className="text-lg sm:text-2xl font-black font-syne uppercase tracking-tight text-white flex items-center gap-2">
              Career Chronology & Peak Analytics
            </h1>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <span className="px-3 py-1 rounded border border-rose-500/30 bg-rose-500/10 text-rose-400 font-mono text-[10px]">
            ICC LIVE TELEMETRY
          </span>
          <span className="text-xs font-mono text-neutral-400">2006 – 2026</span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-12">
        
        {/* Format Selector HUD */}
        <div className="flex justify-center gap-2 sm:gap-4 flex-wrap bg-[#0f121a] p-2 rounded-2xl border border-white/10">
          {(['ODI', 'Test', 'T20I', 'YouthU19'] as FormatType[]).map((format) => (
            <button
              key={format}
              onClick={() => setActiveFormat(format)}
              className={`px-6 py-3 rounded-xl font-syne font-bold text-xs uppercase tracking-wider transition-all duration-300 border ${
                activeFormat === format
                  ? 'bg-rose-500 text-white border-rose-400 shadow-[0_0_25px_rgba(244,63,94,0.5)]'
                  : 'bg-white/5 text-neutral-400 border-transparent hover:border-white/20 hover:text-white'
              }`}
            >
              {format === 'YouthU19' ? 'U-19 / Youth' : format}
            </button>
          ))}
        </div>

        {/* Format Key Metrics Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-6 rounded-2xl bg-[#0f121a] border border-white/10 relative overflow-hidden">
            <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400">Total Runs ({activeFormat})</span>
            <p className="text-3xl font-black font-syne text-rose-400 mt-2">{totalRunsInFormat.toLocaleString()}</p>
            <div className="absolute top-4 right-4 text-rose-400/20"><TrendingUp className="w-8 h-8" /></div>
          </div>
          <div className="p-6 rounded-2xl bg-[#0f121a] border border-white/10 relative overflow-hidden">
            <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400">Peak Year Runs</span>
            <p className="text-3xl font-black font-syne text-white mt-2">{peakYearInFormat?.runs || 0} <span className="text-xs font-mono text-rose-400">({peakYearInFormat?.year})</span></p>
            <div className="absolute top-4 right-4 text-white/20"><Award className="w-8 h-8" /></div>
          </div>
          <div className="p-6 rounded-2xl bg-[#0f121a] border border-white/10 relative overflow-hidden">
            <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400">Peak Batting Avg</span>
            <p className="text-3xl font-black font-syne text-emerald-400 mt-2">{peakYearInFormat?.avg.toFixed(2) || '0.00'}</p>
            <div className="absolute top-4 right-4 text-emerald-400/20"><Zap className="w-8 h-8" /></div>
          </div>
          <div className="p-6 rounded-2xl bg-[#0f121a] border border-white/10 relative overflow-hidden">
            <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400">Peak Season 100s / 50s</span>
            <p className="text-3xl font-black font-syne text-sky-400 mt-2">{peakYearInFormat?.hundredsFifties || '0 / 0'}</p>
            <div className="absolute top-4 right-4 text-sky-400/20"><BarChart2 className="w-8 h-8" /></div>
          </div>
        </div>

        {/* Year Comparative Telemetry Section */}
        <section className="p-8 rounded-3xl bg-[#0d0f17] border border-rose-500/30 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-rose-400 uppercase">// HEAD-TO-HEAD SEASON ANALYSIS</span>
              <h2 className="text-2xl font-black font-syne uppercase text-white">Season vs Season Telemetry</h2>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={compareYear1}
                onChange={(e) => setCompareYear1(e.target.value)}
                className="bg-black/60 border border-rose-400/40 text-rose-300 rounded-xl px-4 py-2 font-mono text-xs focus:outline-none"
              >
                {currentStats.map((s) => (
                  <option key={s.year} value={s.year}>{s.year} Season</option>
                ))}
              </select>
              <span className="text-rose-400 font-black font-mono">VS</span>
              <select
                value={compareYear2}
                onChange={(e) => setCompareYear2(e.target.value)}
                className="bg-black/60 border border-cyan-400/40 text-cyan-300 rounded-xl px-4 py-2 font-mono text-xs focus:outline-none"
              >
                {currentStats.map((s) => (
                  <option key={s.year} value={s.year}>{s.year} Season</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-black/40 border border-rose-500/30 space-y-3">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-2xl font-black font-syne text-rose-400">{year1Data.year} SEASON</span>
                <span className="text-xs font-mono text-neutral-400">{year1Data.matches} Matches</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-white/5 p-3 rounded-xl"><span className="text-neutral-400 text-xs block">Runs</span><strong className="text-rose-300 text-lg">{year1Data.runs}</strong></div>
                <div className="bg-white/5 p-3 rounded-xl"><span className="text-neutral-400 text-xs block">Average</span><strong className="text-white text-lg">{year1Data.avg.toFixed(2)}</strong></div>
                <div className="bg-white/5 p-3 rounded-xl"><span className="text-neutral-400 text-xs block">Strike Rate</span><strong className="text-emerald-400 text-lg">{year1Data.sr.toFixed(2)}</strong></div>
                <div className="bg-white/5 p-3 rounded-xl"><span className="text-neutral-400 text-xs block">100s / 50s</span><strong className="text-sky-400 text-lg">{year1Data.hundredsFifties}</strong></div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-black/40 border border-cyan-500/30 space-y-3">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-2xl font-black font-syne text-cyan-400">{year2Data.year} SEASON</span>
                <span className="text-xs font-mono text-neutral-400">{year2Data.matches} Matches</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-white/5 p-3 rounded-xl"><span className="text-neutral-400 text-xs block">Runs</span><strong className="text-cyan-300 text-lg">{year2Data.runs}</strong></div>
                <div className="bg-white/5 p-3 rounded-xl"><span className="text-neutral-400 text-xs block">Average</span><strong className="text-white text-lg">{year2Data.avg.toFixed(2)}</strong></div>
                <div className="bg-white/5 p-3 rounded-xl"><span className="text-neutral-400 text-xs block">Strike Rate</span><strong className="text-emerald-400 text-lg">{year2Data.sr.toFixed(2)}</strong></div>
                <div className="bg-white/5 p-3 rounded-xl"><span className="text-neutral-400 text-xs block">100s / 50s</span><strong className="text-purple-400 text-lg">{year2Data.hundredsFifties}</strong></div>
              </div>
            </div>
          </div>
        </section>

        {/* Year-by-Year Full Timeline Cards */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-extrabold font-syne uppercase text-white tracking-wide">
              Complete {activeFormat} Year-By-Year Telemetry Timeline
            </h3>
            <span className="text-xs font-mono text-neutral-400">{currentStats.length} Seasons Recorded</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentStats.map((stat, idx) => {
              const hundreds = parseInt(stat.hundredsFifties.split('/')[0], 10) || 0;
              const isPeak = stat.runs >= 1000 || hundreds >= 3;

              return (
                <motion.div
                  key={stat.year}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.03 }}
                  onClick={() => setSelectedYear(stat)}
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                    isPeak
                      ? 'bg-[#101420] border-rose-500/50 hover:border-rose-400 shadow-[0_0_30px_rgba(244,63,94,0.15)] hover:scale-[1.02]'
                      : 'bg-[#0b0d13] border-white/10 hover:border-white/30 hover:bg-[#121520]'
                  }`}
                >
                  {isPeak && (
                    <div className="absolute top-0 right-0 bg-rose-500 text-white font-bold text-[9px] uppercase px-3 py-1 font-mono rounded-bl-xl tracking-widest shadow-md">
                      👑 PEAK SEASON
                    </div>
                  )}

                  <div className="flex justify-between items-baseline mb-4">
                    <span className="text-3xl font-black font-syne text-white group-hover:text-rose-400 transition-colors">
                      {stat.year}
                    </span>
                    <span className="text-xs font-mono text-neutral-400">{stat.matches} Matches</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                    <div className="bg-black/50 p-2.5 rounded-xl border border-white/5">
                      <span className="text-neutral-400 block text-[10px]">TOTAL RUNS</span>
                      <span className="text-lg font-black text-rose-400 font-syne">{stat.runs}</span>
                    </div>
                    <div className="bg-black/50 p-2.5 rounded-xl border border-white/5">
                      <span className="text-neutral-400 block text-[10px]">AVERAGE</span>
                      <span className="text-lg font-black text-white font-syne">{stat.avg.toFixed(2)}</span>
                    </div>
                    <div className="bg-black/50 p-2.5 rounded-xl border border-white/5">
                      <span className="text-neutral-400 block text-[10px]">100s / 50s</span>
                      <span className="text-sm font-extrabold text-emerald-400 font-mono">{stat.hundredsFifties}</span>
                    </div>
                    <div className="bg-black/50 p-2.5 rounded-xl border border-white/5">
                      <span className="text-neutral-400 block text-[10px]">HIGHEST SCORE</span>
                      <span className="text-sm font-extrabold text-sky-400 font-mono">{stat.hs}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[10px] text-neutral-400 font-mono pt-2 border-t border-white/10">
                    <span>SR: {stat.sr.toFixed(1)}</span>
                    <span>4s/6s: {stat.foursSixes}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Year Detail Modal */}
      <AnimatePresence>
        {selectedYear && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#0f121b] border border-rose-500/50 p-8 rounded-3xl max-w-lg w-full text-center relative overflow-hidden shadow-2xl"
            >
              <span className="text-xs uppercase font-mono tracking-widest text-rose-400 border border-rose-400/30 px-3 py-1 rounded-full bg-rose-400/10 inline-block mb-3">
                {activeFormat} TELEMETRY BREAKDOWN
              </span>
              <h3 className="text-4xl font-black font-syne text-white mb-6">
                {selectedYear.year} SEASON RECAP
              </h3>

              <div className="grid grid-cols-2 gap-3 text-left mb-6">
                <div className="bg-black/60 p-4 rounded-xl border border-white/10"><span className="text-xs text-neutral-400 block">Total Runs</span><strong className="text-2xl font-black text-rose-400">{selectedYear.runs}</strong></div>
                <div className="bg-black/60 p-4 rounded-xl border border-white/10"><span className="text-xs text-neutral-400 block">Batting Average</span><strong className="text-2xl font-black text-white">{selectedYear.avg.toFixed(2)}</strong></div>
                <div className="bg-black/60 p-4 rounded-xl border border-white/10"><span className="text-xs text-neutral-400 block">Strike Rate</span><strong className="text-xl font-bold text-emerald-400">{selectedYear.sr.toFixed(2)}</strong></div>
                <div className="bg-black/60 p-4 rounded-xl border border-white/10"><span className="text-xs text-neutral-400 block">Highest Score</span><strong className="text-xl font-bold text-sky-400">{selectedYear.hs}</strong></div>
                <div className="bg-black/60 p-4 rounded-xl border border-white/10"><span className="text-xs text-neutral-400 block">100s / 50s</span><strong className="text-lg font-bold text-purple-400">{selectedYear.hundredsFifties}</strong></div>
                <div className="bg-black/60 p-4 rounded-xl border border-white/10"><span className="text-xs text-neutral-400 block">Boundaries (4s / 6s)</span><strong className="text-lg font-bold text-cyan-400">{selectedYear.foursSixes}</strong></div>
              </div>

              <button
                onClick={() => setSelectedYear(null)}
                className="w-full py-3 rounded-xl bg-rose-500 text-white font-syne font-extrabold uppercase tracking-widest text-xs hover:bg-rose-600 transition-colors shadow-lg"
              >
                Close Season View
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

