import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BOWLER_RIVALRIES, COUNTRY_RIVALRIES, BowlerRivalry, CountryRivalry } from '../../data/subpageData';
import { Shield, ArrowLeft, Swords, Target, Flag, Zap, Award } from 'lucide-react';

interface RivalryMatrixSubpageProps {
  onClose: () => void;
}

export const RivalryMatrixSubpage: React.FC<RivalryMatrixSubpageProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'bowlers' | 'nations'>('bowlers');
  const [selectedBowler, setSelectedBowler] = useState<BowlerRivalry>(BOWLER_RIVALRIES[0]);
  const [selectedNation, setSelectedNation] = useState<CountryRivalry>(COUNTRY_RIVALRIES[0]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#07080d] text-[#F5F5F5] font-body selection:bg-purple-500 selection:text-white">
      {/* Purple Laser Line */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-500 animate-pulse z-50" />
      <div className="fixed inset-0 opacity-[0.05] bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Header HUD Bar */}
      <header className="sticky top-0 z-40 bg-[#0a0c10]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-purple-500 hover:text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 group shadow-lg"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Terminal Exit
          </button>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-purple-400 uppercase">// TELEMETRY MODULE 04</span>
            <h1 className="text-lg sm:text-2xl font-black font-syne uppercase tracking-tight text-white flex items-center gap-2">
              Rivalry Matrix & Head-to-Head Telemetry
            </h1>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <span className="px-3 py-1 rounded border border-purple-500/30 bg-purple-500/10 text-purple-400 font-mono text-[10px]">
            DUEL DATABASE ACTIVE
          </span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-12">
        
        {/* Toggle Switch */}
        <div className="flex justify-center gap-3 bg-[#0f121a] p-2 rounded-2xl border border-white/10 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('bowlers')}
            className={`flex-1 py-3 px-4 rounded-xl font-syne font-bold text-xs uppercase tracking-wider transition-all border ${
              activeTab === 'bowlers'
                ? 'bg-purple-500 text-white border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.4)]'
                : 'text-neutral-400 border-transparent hover:text-white'
            }`}
          >
            ⚔️ Bowler vs Batter
          </button>
          <button
            onClick={() => setActiveTab('nations')}
            className={`flex-1 py-3 px-4 rounded-xl font-syne font-bold text-xs uppercase tracking-wider transition-all border ${
              activeTab === 'nations'
                ? 'bg-purple-500 text-white border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.4)]'
                : 'text-neutral-400 border-transparent hover:text-white'
            }`}
          >
            🌍 Nation vs Nation
          </button>
        </div>

        {/* Bowlers Mode */}
        {activeTab === 'bowlers' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Bowler List */}
            <div className="space-y-3 lg:col-span-1">
              <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest block mb-2">// SELECT BOWLER DUEL</span>
              {BOWLER_RIVALRIES.map((bowler) => (
                <div
                  key={bowler.bowlerName}
                  onClick={() => setSelectedBowler(bowler)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    selectedBowler.bowlerName === bowler.bowlerName
                      ? 'bg-purple-950/40 border-purple-500/80 shadow-[0_0_20px_rgba(168,85,247,0.2)]'
                      : 'bg-[#0f121a] border-white/10 hover:border-white/30'
                  }`}
                >
                  <div>
                    <h4 className="font-syne font-bold text-sm text-white">{bowler.bowlerName}</h4>
                    <span className="text-[10px] font-mono text-neutral-400">{bowler.country} • {bowler.bowlingType}</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-purple-400">{bowler.runsScored} Runs</span>
                </div>
              ))}
            </div>

            {/* Selected Bowler Telemetry Dashboard */}
            <div className="lg:col-span-2 p-8 rounded-3xl bg-[#0e111a] border border-purple-500/40 relative overflow-hidden shadow-2xl space-y-6">
              <div className="flex justify-between items-start border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-purple-400 bg-purple-400/10 px-2.5 py-1 rounded border border-purple-400/30">
                    HEAD-TO-HEAD BATTLE
                  </span>
                  <h2 className="text-3xl font-black font-syne text-white uppercase mt-2">
                    VIRAT KOHLI <span className="text-purple-400">VS</span> {selectedBowler.bowlerName}
                  </h2>
                  <p className="text-xs font-mono text-neutral-400 mt-1">{selectedBowler.country} — {selectedBowler.bowlingType}</p>
                </div>
              </div>

              {/* Stat Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-black/60 p-4 rounded-2xl border border-white/10"><span className="text-[10px] font-mono text-neutral-400 block">RUNS SCORED</span><strong className="text-3xl font-black text-rose-400 font-syne">{selectedBowler.runsScored}</strong></div>
                <div className="bg-black/60 p-4 rounded-2xl border border-white/10"><span className="text-[10px] font-mono text-neutral-400 block">BALLS FACED</span><strong className="text-3xl font-black text-white font-syne">{selectedBowler.ballsFaced}</strong></div>
                <div className="bg-black/60 p-4 rounded-2xl border border-white/10"><span className="text-[10px] font-mono text-neutral-400 block">DISMISSALS</span><strong className="text-3xl font-black text-red-400 font-syne">{selectedBowler.dismissals}</strong></div>
                <div className="bg-black/60 p-4 rounded-2xl border border-white/10"><span className="text-[10px] font-mono text-neutral-400 block">BAT AVERAGE</span><strong className="text-3xl font-black text-emerald-400 font-syne">{selectedBowler.average.toFixed(1)}</strong></div>
              </div>

              {/* Tactical Analysis */}
              <div className="bg-black/50 p-6 rounded-2xl border border-white/10 space-y-2">
                <h4 className="text-xs font-mono uppercase text-purple-400 font-bold flex items-center gap-2">
                  <Swords className="w-4 h-4" /> Tactical Duel Telemetry
                </h4>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {selectedBowler.keyTactics}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Nations Mode */}
        {activeTab === 'nations' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {COUNTRY_RIVALRIES.map((nation) => (
              <div key={nation.country} className="p-8 rounded-3xl bg-[#0e111a] border border-purple-500/40 space-y-6">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <span className="text-4xl">{nation.flagEmoji}</span>
                  <div>
                    <h3 className="text-2xl font-black font-syne uppercase text-white">vs {nation.country}</h3>
                    <p className="text-xs text-neutral-400 font-mono">{nation.memorableMoment}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {nation.formatStats.map((st) => (
                    <div key={st.format} className="bg-black/50 p-4 rounded-2xl border border-white/5 flex justify-between items-center text-xs">
                      <span className="font-bold font-syne text-purple-400 text-sm">{st.format}</span>
                      <div className="flex items-center gap-4 font-mono">
                        <span>Runs: <strong className="text-rose-400">{st.runs}</strong></span>
                        <span>Avg: <strong className="text-white">{st.average}</strong></span>
                        <span>100s: <strong className="text-emerald-400">{st.hundreds}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
