import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CENTURY_VAULT_DATA, CenturyRecord } from '../../data/subpageData';
import { McgMiracleShowcase } from '../McgMiracleShowcase';
import { Trophy, Target, ArrowLeft, Filter, Zap, Compass, Star, MapPin, Calendar, Flame, Award } from 'lucide-react';

interface CenturyArchivesSubpageProps {
  onClose: () => void;
}

export const CenturyArchivesSubpage: React.FC<CenturyArchivesSubpageProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'chronicles-82' | 'centuries-vault'>('chronicles-82');
  const [selectedFormat, setSelectedFormat] = useState<string>('All');
  const [selectedOpposition, setSelectedOpposition] = useState<string>('All');
  const [chaseOnly, setChaseOnly] = useState<boolean>(false);
  const [activeCentury, setActiveCentury] = useState<CenturyRecord | null>(null);

  const filteredCenturies = CENTURY_VAULT_DATA.filter((item) => {
    if (selectedFormat !== 'All' && item.format !== selectedFormat) return false;
    if (selectedOpposition !== 'All' && item.opposition !== selectedOpposition) return false;
    if (chaseOnly && !item.isChasing) return false;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#07080c] text-[#F5F5F5] font-body selection:bg-red-500 selection:text-white">
      {/* Laser Crimson Line */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-rose-500 to-red-500 animate-pulse z-50" />
      <div className="fixed inset-0 opacity-[0.04] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Header Bar */}
      <header className="sticky top-0 z-40 bg-[#0a0c10]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-red-500 hover:text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 group shadow-lg"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Terminal Exit
          </button>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-red-400 uppercase">// TELEMETRY MODULE 02</span>
            <h1 className="text-lg sm:text-2xl font-black font-syne uppercase tracking-tight text-white flex items-center gap-2">
              King's Chronicles & Centuries Vault
            </h1>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <span className="px-3 py-1 rounded border border-red-500/30 bg-red-500/10 text-red-400 font-mono text-[10px]">
            80 CENTURIES & MIRACLE INNINGS
          </span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-10">
        
        {/* Subpage Sub-Navigation Tabs */}
        <div className="flex justify-center gap-3 flex-wrap bg-[#0f121a] p-2 rounded-2xl border border-white/10">
          <button
            onClick={() => setActiveTab('chronicles-82')}
            className={`px-6 py-3 rounded-xl font-syne font-bold text-xs uppercase tracking-wider transition-all duration-300 border flex items-center gap-2 ${
              activeTab === 'chronicles-82'
                ? 'bg-red-600 text-white border-red-400 shadow-[0_0_25px_rgba(220,38,38,0.5)]'
                : 'bg-white/5 text-neutral-400 border-transparent hover:border-white/20 hover:text-white'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-300 fill-amber-300" />
            King's Chronicles: 82* vs PAK (2022 MCG Miracle)
          </button>

          <button
            onClick={() => setActiveTab('centuries-vault')}
            className={`px-6 py-3 rounded-xl font-syne font-bold text-xs uppercase tracking-wider transition-all duration-300 border flex items-center gap-2 ${
              activeTab === 'centuries-vault'
                ? 'bg-red-600 text-white border-red-400 shadow-[0_0_25px_rgba(220,38,38,0.5)]'
                : 'bg-white/5 text-neutral-400 border-transparent hover:border-white/20 hover:text-white'
            }`}
          >
            <Trophy className="w-4 h-4 text-rose-400" />
            All 80 International Centuries Archive
          </button>
        </div>

        {/* Tab 1: King's Chronicles (82* vs PAK Inning) */}
        {activeTab === 'chronicles-82' && (
          <div className="space-y-6">
            <McgMiracleShowcase />
          </div>
        )}

        {/* Tab 2: 80 International Centuries Vault */}
        {activeTab === 'centuries-vault' && (
          <div className="space-y-10">
            {/* Filter Toolbar */}
            <div className="p-6 rounded-3xl bg-[#0f121a] border border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-red-400 uppercase">
                <Filter className="w-4 h-4" /> Vault Query Filters:
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Format Filter */}
                <select
                  value={selectedFormat}
                  onChange={(e) => setSelectedFormat(e.target.value)}
                  className="bg-black/60 border border-white/15 text-white rounded-xl px-4 py-2 font-mono text-xs focus:outline-none focus:border-red-400"
                >
                  <option value="All">All Formats</option>
                  <option value="ODI">ODI (50 Hundreds)</option>
                  <option value="Test">Test (29 Hundreds)</option>
                  <option value="T20I">T20I (1 Hundred)</option>
                </select>

                {/* Opposition Filter */}
                <select
                  value={selectedOpposition}
                  onChange={(e) => setSelectedOpposition(e.target.value)}
                  className="bg-black/60 border border-white/15 text-white rounded-xl px-4 py-2 font-mono text-xs focus:outline-none focus:border-red-400"
                >
                  <option value="All">All Oppositions</option>
                  <option value="Australia">Australia</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="New Zealand">New Zealand</option>
                  <option value="Sri Lanka">Sri Lanka</option>
                  <option value="England">England</option>
                  <option value="South Africa">South Africa</option>
                  <option value="Afghanistan">Afghanistan</option>
                </select>

                {/* Chase Only Toggle */}
                <button
                  onClick={() => setChaseOnly(!chaseOnly)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase border transition-all ${
                    chaseOnly
                      ? 'bg-red-500 text-white border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.4)]'
                      : 'bg-black/60 text-neutral-400 border-white/15 hover:text-white'
                  }`}
                >
                  🎯 Successful Chases Only
                </button>
              </div>
            </div>

            {/* Century Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCenturies.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setActiveCentury(item)}
                  className="p-8 rounded-3xl bg-[#0e111a] border border-white/10 hover:border-red-500/60 transition-all duration-300 cursor-pointer relative overflow-hidden group shadow-xl hover:shadow-[0_0_30px_rgba(239,68,68,0.15)]"
                >
                  {/* Corner Badge */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center font-black font-syne text-sm">
                        #{item.number}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white font-mono text-xs font-bold">
                        {item.format}
                      </span>
                      {item.isChasing && (
                        <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold">
                          CHASING
                        </span>
                      )}
                    </div>

                    <span className="text-3xl font-black font-syne text-red-400 group-hover:scale-110 transition-transform">
                      {item.score}
                    </span>
                  </div>

                  {/* Opposition & Match Info */}
                  <h3 className="text-xl font-extrabold font-syne text-white uppercase mb-2 group-hover:text-rose-300 transition-colors">
                    vs {item.opposition}
                  </h3>

                  <p className="text-xs text-neutral-400 mb-6 line-clamp-2 leading-relaxed">
                    {item.highlights}
                  </p>

                  {/* Stats Strip */}
                  <div className="grid grid-cols-3 gap-2 bg-black/50 p-3 rounded-2xl border border-white/5 text-center text-xs mb-4">
                    <div>
                      <span className="text-[10px] font-mono text-neutral-500 block">BALLS</span>
                      <strong className="text-white font-bold">{item.balls}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-neutral-500 block">STRIKE RATE</span>
                      <strong className="text-emerald-400 font-bold">{item.sr.toFixed(1)}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-neutral-500 block">BOUNDARIES</span>
                      <strong className="text-rose-400 font-bold">{item.fours}x4 / {item.sixes}x6</strong>
                    </div>
                  </div>

                  {/* Venue & Date */}
                  <div className="flex justify-between items-center text-[11px] text-neutral-400 font-mono pt-2 border-t border-white/10">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-red-400" /> {item.venue}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-neutral-500" /> {item.date}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Interactive Inning Hologram Modal */}
      <AnimatePresence>
        {activeCentury && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#0f121b] border border-red-500/60 p-8 rounded-3xl max-w-2xl w-full text-left relative overflow-hidden shadow-2xl space-y-6"
            >
              <div className="flex justify-between items-start border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-red-400 bg-red-400/10 px-2.5 py-1 rounded border border-red-400/30">
                    CENTURY #{activeCentury.number} HOLOGRAPHIC RECAP
                  </span>
                  <h2 className="text-3xl font-black font-syne text-white uppercase mt-2">
                    {activeCentury.score} vs {activeCentury.opposition}
                  </h2>
                  <p className="text-xs font-mono text-neutral-400 mt-1">{activeCentury.venue} — {activeCentury.date}</p>
                </div>

                <div className="text-right">
                  <span className="text-4xl font-black font-syne text-red-400 block">{activeCentury.runs}</span>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase">RUNS SCORED</span>
                </div>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed bg-black/40 p-4 rounded-2xl border border-white/10">
                "{activeCentury.highlights}"
              </p>

              {/* Wagon Wheel Shot Distribution */}
              <div className="space-y-3 bg-black/50 p-5 rounded-2xl border border-white/10">
                <h4 className="text-xs font-mono uppercase text-red-400 font-bold flex items-center gap-2">
                  <Compass className="w-4 h-4" /> Shot Directional Distribution (Wagon Wheel Telemetry)
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div className="bg-white/5 p-2.5 rounded-xl"><span className="text-neutral-400 block text-[10px]">Cover Drive Zone</span><strong className="text-rose-400">{activeCentury.wagonWheel.cover}%</strong></div>
                  <div className="bg-white/5 p-2.5 rounded-xl"><span className="text-neutral-400 block text-[10px]">Straight Down Ground</span><strong className="text-emerald-400">{activeCentury.wagonWheel.straight}%</strong></div>
                  <div className="bg-white/5 p-2.5 rounded-xl"><span className="text-neutral-400 block text-[10px]">Mid-Wicket Flick</span><strong className="text-cyan-400">{activeCentury.wagonWheel.midWicket}%</strong></div>
                  <div className="bg-white/5 p-2.5 rounded-xl"><span className="text-neutral-400 block text-[10px]">Square Leg Pull</span><strong className="text-purple-400">{activeCentury.wagonWheel.squareLeg}%</strong></div>
                  <div className="bg-white/5 p-2.5 rounded-xl"><span className="text-neutral-400 block text-[10px]">Point / Cut</span><strong className="text-sky-400">{activeCentury.wagonWheel.point}%</strong></div>
                  <div className="bg-white/5 p-2.5 rounded-xl"><span className="text-neutral-400 block text-[10px]">Third Man / Ramp</span><strong className="text-orange-400">{activeCentury.wagonWheel.thirdMan}%</strong></div>
                </div>
              </div>

              <button
                onClick={() => setActiveCentury(null)}
                className="w-full py-3.5 rounded-xl bg-red-500 text-white font-syne font-extrabold uppercase tracking-widest text-xs hover:bg-red-600 transition-colors shadow-lg"
              >
                Close Inning Telemetry
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
