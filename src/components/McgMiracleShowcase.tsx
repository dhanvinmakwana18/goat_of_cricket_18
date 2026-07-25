import React, { useState } from 'react';
import { Flame, Trophy, Calendar, Sparkles, Zap, ArrowRight, Activity, ExternalLink, RefreshCw } from 'lucide-react';
import { AICommentaryBox } from './AICommentaryBox';

export const McgMiracleShowcase: React.FC = () => {
  const [activeShotTab, setActiveShotTab] = useState<'shot-of-century' | 'over-by-over' | 'pressure-graph'>('shot-of-century');
  const [synced, setSynced] = useState(false);

  // Google Calendar URL for MCG 82* Anniversary
  const mcgCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('🏏 Anniversary: Virat Kohli 82* vs Pakistan (MCG 2022 Miracle)')}&details=${encodeURIComponent('Celebration of the greatest T20I innings in cricket history! Virat Kohli 82* off 53 balls vs Pakistan at MCG, including the ICC Shot of the Century off Haris Rauf.')}&location=${encodeURIComponent('Melbourne Cricket Ground (MCG), Australia')}&dates=20261023T090000Z/20261023T100000Z&recur=RRULE:FREQ=YEARLY`;

  return (
    <section id="mcg-miracle-showcase" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
      <div className="bg-[#080a12] border-2 border-[#d3122a]/60 rounded-3xl p-6 md:p-10 text-white relative overflow-hidden shadow-[0_0_50px_rgba(211,18,42,0.25)]">
        {/* Glow & Laser Ambient Filters */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d3122a]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d3122a] via-amber-400 via-cyan-400 to-[#d3122a] animate-pulse" />

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 border-b border-white/10 pb-6 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[10px] uppercase font-mono tracking-widest text-white bg-[#d3122a] px-3 py-1 rounded-full font-bold flex items-center gap-1.5 shadow-lg shadow-[#d3122a]/40">
                <Flame className="w-3.5 h-3.5 fill-white" />
                GREATEST T20 INNINGS IN HISTORY
              </span>
              <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                ICC T20 WORLD CUP 2022 • MCG, AUSTRALIA
              </span>
              <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
                23 OCTOBER 2022
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black font-syne uppercase tracking-tight text-white flex items-center gap-3 mt-2">
              The MCG Miracle: <span className="text-[#d3122a]">82*</span> vs Pakistan
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-mono mt-2 max-w-3xl leading-relaxed">
              Facing a soul-crushing 31/4 collapse chasing 160 before 90,293 fans at the Melbourne Cricket Ground, Virat Kohli delivered an immortal 82* (53) — unleashing the ICC-declared <strong className="text-amber-300">"Shot of the Century"</strong> off Haris Rauf to reclaim his throne as the King of Cricket.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-3 w-full lg:w-auto">
            <div className="bg-black/60 border border-amber-400/40 px-5 py-3 rounded-2xl text-center w-full sm:w-auto">
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block">RECLAIMED TITLE</span>
              <span className="text-lg font-black font-syne text-white uppercase flex items-center justify-center gap-1.5">
                👑 KING OF CRICKET
              </span>
            </div>

            <button
              onClick={() => {
                setSynced(true);
                window.open(mcgCalUrl, '_blank', 'noopener,noreferrer');
              }}
              className={`w-full sm:w-auto px-5 py-3 rounded-2xl font-syne font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg ${
                synced
                  ? 'bg-emerald-500 text-slate-950 border border-emerald-400'
                  : 'bg-[#d3122a] hover:bg-red-600 text-white border border-red-400 shadow-red-600/30'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>{synced ? 'Anniversary Synced!' : 'Sync Oct 23 Anniversary'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Telemetry Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 relative z-10">
          <div className="p-5 rounded-2xl bg-black/60 border border-white/10 relative overflow-hidden">
            <span className="text-[10px] font-mono text-neutral-400 uppercase">FINAL SCORE</span>
            <p className="text-3xl sm:text-4xl font-black font-syne text-[#d3122a] mt-1">82* <span className="text-sm font-normal text-neutral-400">(53)</span></p>
            <span className="text-[10px] font-mono text-neutral-400 block mt-1">6 Fours • 4 Sixes • SR 154.72</span>
          </div>

          <div className="p-5 rounded-2xl bg-black/60 border border-white/10 relative overflow-hidden">
            <span className="text-[10px] font-mono text-neutral-400 uppercase">COLLAPSE CONTEXT</span>
            <p className="text-3xl sm:text-4xl font-black font-syne text-amber-400 mt-1">31/4</p>
            <span className="text-[10px] font-mono text-neutral-400 block mt-1">India fell to 31/4 in 6.1 overs</span>
          </div>

          <div className="p-5 rounded-2xl bg-black/60 border border-white/10 relative overflow-hidden">
            <span className="text-[10px] font-mono text-neutral-400 uppercase">REQUIRED OFF 18 BALLS</span>
            <p className="text-3xl sm:text-4xl font-black font-syne text-cyan-400 mt-1">48 Runs</p>
            <span className="text-[10px] font-mono text-neutral-400 block mt-1">Needed 16 off last 6 balls</span>
          </div>

          <div className="p-5 rounded-2xl bg-black/60 border border-white/10 relative overflow-hidden">
            <span className="text-[10px] font-mono text-neutral-400 uppercase">ATTENDANCE AT MCG</span>
            <p className="text-3xl sm:text-4xl font-black font-syne text-emerald-400 mt-1">90,293</p>
            <span className="text-[10px] font-mono text-neutral-400 block mt-1">Packed Stadium Roar</span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4 relative z-10 overflow-x-auto">
          {[
            { id: 'shot-of-century', label: '🚀 ICC Shot of the Century', color: 'text-amber-400' },
            { id: 'over-by-over', label: '⚡ Final 3 Overs Climax Telemetry', color: 'text-cyan-400' },
            { id: 'pressure-graph', label: '📈 Win Probability Comeback', color: 'text-emerald-400' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveShotTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-xl font-syne font-bold text-xs uppercase tracking-wider transition-all border whitespace-nowrap ${
                activeShotTab === tab.id
                  ? 'bg-white text-slate-950 border-white shadow-lg'
                  : 'bg-white/5 text-neutral-400 border-white/10 hover:border-white/20 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Shot of the Century Detailed Spotlight */}
        {activeShotTab === 'shot-of-century' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 bg-[#0c0f1c] p-6 sm:p-8 rounded-3xl border border-amber-500/40">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 font-mono text-[11px] font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                OFFICIAL ICC DECLARATION: SHOT OF THE CENTURY
              </div>

              <h3 className="text-2xl sm:text-3xl font-black font-syne text-white uppercase">
                18.5 Over: Back-Foot Straight Loft off Haris Rauf (148 km/h)
              </h3>

              <p className="text-xs sm:text-sm text-neutral-300 font-body leading-relaxed">
                With India needing 28 runs off 8 balls and Haris Rauf bowling a 148 km/h hard back-of-a-length ball, Virat Kohli jumped off his back foot and punched the ball straight down the ground over Rauf's head, high into the long-on stands of the MCG. It defied the laws of physics and biomechanics.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs">
                <div className="bg-black/60 p-3 rounded-xl border border-white/10">
                  <span className="text-neutral-500 block text-[10px]">BOWLER</span>
                  <strong className="text-white">Haris Rauf (PAK)</strong>
                </div>
                <div className="bg-black/60 p-3 rounded-xl border border-white/10">
                  <span className="text-neutral-500 block text-[10px]">BALL SPEED</span>
                  <strong className="text-cyan-400">148.2 km/h</strong>
                </div>
                <div className="bg-black/60 p-3 rounded-xl border border-white/10">
                  <span className="text-neutral-500 block text-[10px]">HIT DISTANCE</span>
                  <strong className="text-amber-300">92 Meters</strong>
                </div>
                <div className="bg-black/60 p-3 rounded-xl border border-white/10">
                  <span className="text-neutral-500 block text-[10px]">LAUNCH ANGLE</span>
                  <strong className="text-emerald-400">42° Upward</strong>
                </div>
                <div className="bg-black/60 p-3 rounded-xl border border-white/10">
                  <span className="text-neutral-500 block text-[10px]">SHOT TYPE</span>
                  <strong className="text-purple-300">Lofted Straight Drive</strong>
                </div>
                <div className="bg-black/60 p-3 rounded-xl border border-white/10">
                  <span className="text-neutral-500 block text-[10px]">RESULT</span>
                  <strong className="text-[#d3122a]">6 RUNS (MONUMENTAL)</strong>
                </div>
              </div>
            </div>

            {/* Simulated Biomechanics Graphic Card */}
            <div className="lg:col-span-5 bg-black/80 border border-amber-500/30 p-6 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-amber-300 animate-pulse">
                <Zap className="w-10 h-10" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400">PHYSICS ANOMALY</span>
                <h4 className="text-lg font-black font-syne text-white uppercase mt-1">Back-Foot Vertical Wrist Snap</h4>
                <p className="text-xs text-neutral-400 font-mono mt-1">
                  Generated 88 Nm wrist snap torque off a 148 km/h delivery without moving forward.
                </p>
              </div>
              <div className="w-full bg-white/5 p-3 rounded-xl text-left border border-white/10 font-mono text-[11px] text-neutral-300">
                <p className="italic text-amber-300">"Kohli goes down the ground, Kohli goes out of the ground! That is a magnificent shot!"</p>
                <span className="text-[10px] text-neutral-500 font-bold block mt-1">— Gerard Whateley / ICC Commentary</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Over by Over Final Climax */}
        {activeShotTab === 'over-by-over' && (
          <div className="space-y-4 relative z-10">
            <div className="p-4 bg-black/60 rounded-2xl border border-cyan-500/30 text-xs font-mono text-neutral-300 flex justify-between items-center">
              <span>FINAL 3 OVERS: 48 RUNS NEEDED OFF 18 BALLS</span>
              <span className="text-cyan-400 font-bold">16.00 REQUIRED RUN RATE</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Over 18 */}
              <div className="p-5 bg-[#0b0e1a] rounded-2xl border border-white/10 space-y-3">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="font-syne font-black text-amber-400 text-sm">OVER 18 (Shaheen Afridi)</span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">17 Runs Scored</span>
                </div>
                <p className="text-xs text-neutral-300">
                  Kohli smashes three boundaries off Shaheen Shah Afridi. Cuts over extra cover and pulls over mid-wicket.
                </p>
                <div className="text-[11px] font-mono text-neutral-400 bg-black/50 p-2.5 rounded-xl">
                  Remaining Target: <strong>31 runs off 12 balls</strong>
                </div>
              </div>

              {/* Over 19 */}
              <div className="p-5 bg-[#0b0e1a] rounded-2xl border border-amber-500/40 space-y-3">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="font-syne font-black text-amber-300 text-sm">OVER 19 (Haris Rauf)</span>
                  <span className="text-xs font-mono text-amber-300 font-bold">15 Runs Scored</span>
                </div>
                <p className="text-xs text-neutral-300">
                  Back-to-back SIXES by Kohli on 18.5 (Shot of the Century) and 18.6 (flick over fine leg).
                </p>
                <div className="text-[11px] font-mono text-amber-300 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/30">
                  Remaining Target: <strong>16 runs off 6 balls</strong>
                </div>
              </div>

              {/* Over 20 */}
              <div className="p-5 bg-[#0b0e1a] rounded-2xl border border-[#d3122a]/50 space-y-3">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="font-syne font-black text-[#d3122a] text-sm">OVER 20 (Nawaz Final Over)</span>
                  <span className="text-xs font-mono text-[#d3122a] font-bold">VICTORY SEALED!</span>
                </div>
                <p className="text-xs text-neutral-300">
                  Waist-high no-ball SIX by Kohli (19.4), 3 byes on free hit, wide ball, and Ashwin hits winning run over mid-off!
                </p>
                <div className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/30">
                  Outcome: <strong>India Win by 4 Wickets!</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Comeback Win Probability Graph */}
        {activeShotTab === 'pressure-graph' && (
          <div className="p-6 bg-[#0b0e1a] rounded-3xl border border-emerald-500/40 relative z-10 space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase">// WIN PREDICTION PROBABILITY</span>
                <h4 className="text-lg font-black font-syne text-white">15% Win Probability to 100% Victory Miracle</h4>
              </div>
              <span className="text-xs font-mono bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/40">
                GREATEST CHASE COMEBACK
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div>
                <div className="flex justify-between text-neutral-400 mb-1">
                  <span>Start of Chase (0.0 overs)</span>
                  <span className="text-white">50% India / 50% Pakistan</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-cyan-500 h-full w-[50%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-neutral-400 mb-1">
                  <span>India 31/4 Collapse (6.1 overs)</span>
                  <span className="text-[#d3122a] font-bold">15% India / 85% Pakistan</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#d3122a] h-full w-[15%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-neutral-400 mb-1">
                  <span>After Shot of the Century (18.5 overs)</span>
                  <span className="text-amber-400 font-bold">65% India / 35% Pakistan</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-400 h-full w-[65%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-neutral-400 mb-1">
                  <span>Match Victory (20.0 overs)</span>
                  <span className="text-emerald-400 font-bold">100% INDIA WIN!</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full w-[100%]" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic AI Broadcast Commentary Box */}
        <AICommentaryBox
          inningsContext={{
            runs: 82,
            balls: 53,
            opponent: 'Pakistan',
            venue: 'Melbourne Cricket Ground (MCG)',
            format: 'T20 World Cup',
            description: 'Chasing 160 vs Pakistan from 31/4 collapse. Iconic back-to-back sixes against Haris Rauf in the 19th over.'
          }}
        />

        {/* Footer Quote Banner */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400 relative z-10">
          <div className="flex items-center gap-3">
            <Trophy className="w-5 h-5 text-amber-400 shrink-0" />
            <p>
              <strong className="text-white">Virat Kohli:</strong> "I have no idea how it happened, I am lost for words... Standing here feels like it was meant to be."
            </p>
          </div>
          <span className="text-[#d3122a] font-bold uppercase tracking-widest shrink-0 bg-[#d3122a]/10 px-3 py-1 rounded border border-[#d3122a]/30">
            KING OF CRICKET RECLAIMED
          </span>
        </div>
      </div>
    </section>
  );
};
