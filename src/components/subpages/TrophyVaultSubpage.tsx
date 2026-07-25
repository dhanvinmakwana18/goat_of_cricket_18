import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TROPHY_VAULT_DATA, VELOCITY_MILESTONES, TrophyRecord, VelocityRecord } from '../../data/subpageData';
import { Trophy, Award, Crown, ArrowLeft, Zap, Shield, Flame, Star, TrendingUp } from 'lucide-react';

interface TrophyVaultSubpageProps {
  onClose: () => void;
}

export const TrophyVaultSubpage: React.FC<TrophyVaultSubpageProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'trophies' | 'velocity' | 'captaincy'>('trophies');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#07080c] text-[#F5F5F5] font-body selection:bg-emerald-500 selection:text-white">
      {/* Emerald Laser Line */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-300 to-emerald-600 animate-pulse z-50" />
      <div className="fixed inset-0 opacity-[0.05] bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Header HUD Bar */}
      <header className="sticky top-0 z-40 bg-[#0a0c10]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-emerald-400 hover:text-slate-950 font-bold text-xs uppercase tracking-widest transition-all duration-300 group shadow-lg"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Terminal Exit
          </button>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase">// TELEMETRY MODULE 05</span>
            <h1 className="text-lg sm:text-2xl font-black font-syne uppercase tracking-tight text-white flex items-center gap-2">
              Trophy Vault & Milestone Records Sanctum
            </h1>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <span className="px-3 py-1 rounded border border-emerald-400/30 bg-emerald-400/10 text-emerald-400 font-mono text-[10px]">
            WORLD CHAMPION SANCTUM
          </span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-12">
        
        {/* Module Switcher Tabs */}
        <div className="flex justify-center gap-3 bg-[#0f121a] p-2 rounded-2xl border border-white/10 max-w-2xl mx-auto">
          <button
            onClick={() => setActiveTab('trophies')}
            className={`flex-1 py-3 px-4 rounded-xl font-syne font-bold text-xs uppercase tracking-wider transition-all border ${
              activeTab === 'trophies'
                ? 'bg-emerald-400 text-slate-950 border-emerald-300 shadow-[0_0_25px_rgba(52,211,153,0.4)]'
                : 'text-neutral-400 border-transparent hover:text-white'
            }`}
          >
            🏆 ICC Trophies & Honours
          </button>
          <button
            onClick={() => setActiveTab('velocity')}
            className={`flex-1 py-3 px-4 rounded-xl font-syne font-bold text-xs uppercase tracking-wider transition-all border ${
              activeTab === 'velocity'
                ? 'bg-emerald-400 text-slate-950 border-emerald-300 shadow-[0_0_25px_rgba(52,211,153,0.4)]'
                : 'text-neutral-400 border-transparent hover:text-white'
            }`}
          >
            ⚡ Velocity Runs Graph
          </button>
        </div>

        {/* Trophies Tab */}
        {activeTab === 'trophies' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TROPHY_VAULT_DATA.map((trophy, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="p-8 rounded-3xl bg-[#0e111a] border border-emerald-500/40 hover:border-emerald-400 transition-all duration-300 relative overflow-hidden group shadow-2xl hover:shadow-[0_0_35px_rgba(52,211,153,0.15)]"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded border border-emerald-400/30">
                    {trophy.badge}
                  </span>
                  <span className="text-xl font-black font-syne text-white">{trophy.year}</span>
                </div>

                <h3 className="text-2xl font-black font-syne text-white uppercase mb-2 group-hover:text-emerald-300 transition-colors">
                  {trophy.title}
                </h3>

                <p className="text-xs text-emerald-300/90 font-mono mb-4">{trophy.statsInTournament}</p>

                <p className="text-xs text-neutral-400 leading-relaxed bg-black/40 p-4 rounded-2xl border border-white/5">
                  {trophy.description}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Velocity Runs Tab */}
        {activeTab === 'velocity' && (
          <div className="p-8 rounded-3xl bg-[#0e111a] border border-emerald-500/40 space-y-6">
            <div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">// FASTEST TO MILESTONE INNINGS</span>
              <h2 className="text-3xl font-black font-syne uppercase text-white mt-1">
                World Record Run Velocity Comparison
              </h2>
              <p className="text-xs text-neutral-400 mt-1">Innings required in ODI cricket to reach milestone run thresholds.</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-emerald-400 uppercase">
                    <th className="py-3 px-4">Milestone</th>
                    <th className="py-3 px-4 text-emerald-300 font-bold bg-emerald-400/10">Virat Kohli</th>
                    <th className="py-3 px-4">Sachin Tendulkar</th>
                    <th className="py-3 px-4">Ricky Ponting</th>
                    <th className="py-3 px-4">Kumar Sangakkara</th>
                    <th className="py-3 px-4">Rohit Sharma</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {VELOCITY_MILESTONES.map((row) => (
                    <tr key={row.milestone} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-4 font-bold text-white font-syne">{row.milestone}</td>
                      <td className="py-3 px-4 font-black text-emerald-300 bg-emerald-400/10">{row.kohliInnings} innings 👑</td>
                      <td className="py-3 px-4 text-neutral-400">{row.tendulkarInnings} innings</td>
                      <td className="py-3 px-4 text-neutral-400">{row.pontingInnings} innings</td>
                      <td className="py-3 px-4 text-neutral-400">{row.sangakkaraInnings} innings</td>
                      <td className="py-3 px-4 text-neutral-400">{row.rohitInnings} innings</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
