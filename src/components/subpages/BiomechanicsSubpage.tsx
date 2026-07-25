import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BIOMECHANICS_DATA } from '../../data/subpageData';
import { Activity, Shield, ArrowLeft, Zap, Target, Gauge, Cpu, Flame, BarChart3 } from 'lucide-react';

interface BiomechanicsSubpageProps {
  onClose: () => void;
}

export const BiomechanicsSubpage: React.FC<BiomechanicsSubpageProps> = ({ onClose }) => {
  const [selectedMechanic, setSelectedMechanic] = useState<'coverDrive' | 'bowlingAttack' | 'chasePhysics'>('coverDrive');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#06080d] text-[#F5F5F5] font-body selection:bg-cyan-400 selection:text-black">
      {/* Cyan Laser Line */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-sky-400 to-cyan-600 animate-pulse z-50" />
      <div className="fixed inset-0 opacity-[0.05] bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Header HUD Bar */}
      <header className="sticky top-0 z-40 bg-[#080b12]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-cyan-400 hover:text-slate-950 font-bold text-xs uppercase tracking-widest transition-all duration-300 group shadow-lg"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Terminal Exit
          </button>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase">// TELEMETRY MODULE 03</span>
            <h1 className="text-lg sm:text-2xl font-black font-syne uppercase tracking-tight text-white flex items-center gap-2">
              Masterclass Technique & Biomechanics Lab
            </h1>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <span className="px-3 py-1 rounded border border-cyan-400/30 bg-cyan-400/10 text-cyan-400 font-mono text-[10px]">
            HIGH-SPEED HIGH-ACCURACY LAB
          </span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-12">
        
        {/* Module Switcher Tabs */}
        <div className="flex justify-center gap-3 bg-[#0d1018] p-2 rounded-2xl border border-white/10 max-w-3xl mx-auto">
          <button
            onClick={() => setSelectedMechanic('coverDrive')}
            className={`flex-1 py-3 px-4 rounded-xl font-syne font-bold text-xs uppercase tracking-wider transition-all border ${
              selectedMechanic === 'coverDrive'
                ? 'bg-cyan-400 text-slate-950 border-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.4)]'
                : 'text-neutral-400 border-transparent hover:text-white'
            }`}
          >
            ⚡ Cover Drive Kinematics
          </button>
          <button
            onClick={() => setSelectedMechanic('bowlingAttack')}
            className={`flex-1 py-3 px-4 rounded-xl font-syne font-bold text-xs uppercase tracking-wider transition-all border ${
              selectedMechanic === 'bowlingAttack'
                ? 'bg-cyan-400 text-slate-950 border-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.4)]'
                : 'text-neutral-400 border-transparent hover:text-white'
            }`}
          >
            🎯 Bowling Attack Matchups
          </button>
          <button
            onClick={() => setSelectedMechanic('chasePhysics')}
            className={`flex-1 py-3 px-4 rounded-xl font-syne font-bold text-xs uppercase tracking-wider transition-all border ${
              selectedMechanic === 'chasePhysics'
                ? 'bg-cyan-400 text-slate-950 border-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.4)]'
                : 'text-neutral-400 border-transparent hover:text-white'
            }`}
          >
            🔥 Chase Acceleration Mechanics
          </button>
        </div>

        {/* Section 1: Cover Drive Kinematics */}
        {selectedMechanic === 'coverDrive' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="p-8 rounded-3xl bg-[#0b0e17] border border-cyan-500/30 relative overflow-hidden shadow-2xl">
              <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase">// KINEMATIC TRAJECTORY SIMULATION</span>
              <h2 className="text-3xl font-black font-syne uppercase text-white mt-1 mb-6">
                The Signature Cover Drive Mechanics
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 rounded-2xl bg-black/60 border border-cyan-500/30 relative">
                  <span className="text-[10px] font-mono text-neutral-400 block">EXIT VELOCITY</span>
                  <p className="text-4xl font-black font-syne text-cyan-400 mt-2">142 <span className="text-xs font-mono text-neutral-400">km/h</span></p>
                  <p className="text-xs text-neutral-400 mt-2">Measured off sweet spot on full-length deliveries.</p>
                </div>
                <div className="p-6 rounded-2xl bg-black/60 border border-cyan-500/30 relative">
                  <span className="text-[10px] font-mono text-neutral-400 block">SWEET SPOT ACCURACY</span>
                  <p className="text-4xl font-black font-syne text-emerald-400 mt-2">96.4%</p>
                  <p className="text-xs text-neutral-400 mt-2">Impact consistency in cover region.</p>
                </div>
                <div className="p-6 rounded-2xl bg-black/60 border border-cyan-500/30 relative">
                  <span className="text-[10px] font-mono text-neutral-400 block">WRIST SNAP TORQUE</span>
                  <p className="text-4xl font-black font-syne text-rose-400 mt-2">86 <span className="text-xs font-mono text-neutral-400">Nm</span></p>
                  <p className="text-xs text-neutral-400 mt-2">Top-hand control keeping ball along the carpet.</p>
                </div>
                <div className="p-6 rounded-2xl bg-black/60 border border-cyan-500/30 relative">
                  <span className="text-[10px] font-mono text-neutral-400 block">STRIDE LENGTH</span>
                  <p className="text-4xl font-black font-syne text-sky-400 mt-2">78 <span className="text-xs font-mono text-neutral-400">cm</span></p>
                  <p className="text-xs text-neutral-400 mt-2">Optimal stride under head for perfect balance.</p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-[#0b0e17] border border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase">// STANCE & WEIGHT TRANSFER</span>
                <h3 className="text-2xl font-black font-syne uppercase text-white mt-1 mb-3">
                  Body Alignment & Head Over Ball
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed space-y-2">
                  Virat Kohli’s signature cover drive relies on an initial slight trigger movement towards off-stump, followed by a wide front-foot stride that places his head directly over the point of impact. This ensures maximum control, virtually eliminating air-borne edges and maximizing ground placement between extra cover and mid-off.
                </p>
              </div>

              <div className="bg-black/80 p-6 rounded-2xl border border-cyan-500/30 font-mono text-xs space-y-3">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-neutral-400">Parameter</span>
                  <span className="text-cyan-400">Kohli Telemetry Standard</span>
                </div>
                <div className="flex justify-between">
                  <span>Head Position</span>
                  <span className="text-emerald-400 font-bold">100% Vertical Alignment</span>
                </div>
                <div className="flex justify-between">
                  <span>Top-Hand Firmness</span>
                  <span className="text-rose-400 font-bold">94% Dominant Control</span>
                </div>
                <div className="flex justify-between">
                  <span>Bottom-Hand Cushion</span>
                  <span className="text-sky-400 font-bold">Soft Impact Dissipation</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Section 2: Bowling Attack Matchups */}
        {selectedMechanic === 'bowlingAttack' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <h3 className="text-xl font-extrabold font-syne uppercase text-white">
              Performance Telemetry vs Bowling Variations
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {BIOMECHANICS_DATA.bowlingTypeAverages.map((item, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-[#0b0e17] border border-cyan-500/30 hover:border-cyan-400 transition-all">
                  <span className="text-xs font-mono text-cyan-400 font-bold uppercase">{item.type}</span>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="bg-black/50 p-3 rounded-xl"><span className="text-[10px] font-mono text-neutral-400 block">AVERAGE</span><strong className="text-2xl font-black text-rose-400 font-syne">{item.avg}</strong></div>
                    <div className="bg-black/50 p-3 rounded-xl"><span className="text-[10px] font-mono text-neutral-400 block">STRIKE RATE</span><strong className="text-2xl font-black text-emerald-400 font-syne">{item.sr}</strong></div>
                  </div>
                  <div className="mt-3 text-[11px] font-mono text-neutral-400 flex justify-between border-t border-white/10 pt-2">
                    <span>Boundary %</span>
                    <span className="text-cyan-300 font-bold">{item.boundariesPct}%</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Section 3: Chase Physics */}
        {selectedMechanic === 'chasePhysics' && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="p-8 rounded-3xl bg-[#0b0e17] border border-rose-500/40 relative overflow-hidden shadow-2xl">
              <span className="text-[10px] font-mono text-rose-400 uppercase">// THE CHASE MASTER ENGINE</span>
              <h2 className="text-3xl font-black font-syne uppercase text-white mt-1 mb-6">
                Chasing Dynamics & Target Pacing
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="p-6 rounded-2xl bg-black/60 border border-rose-500/30">
                  <span className="text-[10px] font-mono text-neutral-400 block">WON CHASE AVERAGE</span>
                  <p className="text-4xl font-black font-syne text-rose-400 mt-2">64.3</p>
                  <p className="text-xs text-neutral-400 mt-1">In successful ODI run chases.</p>
                </div>
                <div className="p-6 rounded-2xl bg-black/60 border border-amber-500/30">
                  <span className="text-[10px] font-mono text-neutral-400 block">CENTURIES IN CHASES</span>
                  <p className="text-4xl font-black font-syne text-emerald-400 mt-2">36</p>
                  <p className="text-xs text-neutral-400 mt-1">Highest in ODI history.</p>
                </div>
                <div className="p-6 rounded-2xl bg-black/60 border border-amber-500/30">
                  <span className="text-[10px] font-mono text-neutral-400 block">NOT-OUT AVERAGE</span>
                  <p className="text-4xl font-black font-syne text-sky-400 mt-2">118.5</p>
                  <p className="text-xs text-neutral-400 mt-1">When remaining unbeaten in chases.</p>
                </div>
                <div className="p-6 rounded-2xl bg-black/60 border border-amber-500/30">
                  <span className="text-[10px] font-mono text-neutral-400 block">DEATH OVERS SR</span>
                  <p className="text-4xl font-black font-syne text-purple-400 mt-2">192.4</p>
                  <p className="text-xs text-neutral-400 mt-1">Overs 41–50 acceleration curve.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};
