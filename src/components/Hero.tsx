import React from 'react';
import { StatueCanvas } from './StatueCanvas';
import { ExternalLink, Award, Flame, ChevronRight, Trophy } from 'lucide-react';
import worldCupTrophyImg from '../assets/images/icc_world_cup_trophy_1784831119282.jpg';

export const Hero: React.FC = () => {
  return (
    <section id="statue" className="relative min-h-[85vh] flex flex-col md:flex-row items-center justify-between px-6 lg:px-12 py-12 max-w-7xl mx-auto gap-12 border-b border-white/5">
      {/* Hero Left Content */}
      <div className="w-full md:w-1/2 space-y-6 z-10 text-center md:text-left">
        <div className="inline-block px-4 py-1.5 border border-[#d3122a]/40 bg-[#d3122a]/10 rounded-full">
          <span className="text-[10px] font-bold text-[#d3122a] uppercase tracking-[0.2em] flex items-center gap-2">
            <Flame className="w-3.5 h-3.5 text-[#d3122a] animate-pulse" />
            Royal Challengers Bengaluru Legend
          </span>
        </div>

        <h1 className="text-6xl sm:text-7xl lg:text-9xl font-extrabold tracking-tighter uppercase leading-[0.85] font-syne italic text-[#F5F5F5]">
          VIRAT<br />
          <span className="text-[#d3122a] not-italic">KOHLI</span>
        </h1>

        <div className="flex gap-6 items-start justify-center md:justify-start pt-2">
          <div className="w-1.5 bg-[#d3122a] h-24 shrink-0 hidden sm:block"></div>
          <p className="text-white/70 text-base sm:text-lg max-w-xl leading-relaxed font-light text-left">
            A relentless force of nature in RCB Red and Team India Blue. From a determined boy in Delhi to the{' '}
            <span className="text-white font-medium">prolific record-breaker</span> with <span className="text-[#d3122a] font-bold">9,336 IPL runs</span> for RCB, 54 ODI centuries & 85 international hundreds.
          </p>
        </div>

        {/* CTA Actions */}
        <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
          <a
            href="#timeline"
            className="px-8 py-4 bg-[#d3122a] text-white text-[12px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all transform hover:scale-105 flex items-center gap-2 cursor-pointer shadow-lg shadow-[#d3122a]/30"
          >
            <span>Career Timeline</span>
            <ChevronRight className="w-4 h-4" />
          </a>

          <a
            href="#stats"
            className="px-8 py-4 border border-white/20 text-white text-[12px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2 group"
          >
            <span>Career Stats</span>
            <ExternalLink className="w-3.5 h-3.5 text-white/40 group-hover:text-[#d3122a] transition-colors" />
          </a>
        </div>

        {/* World Cup Champion Trophy Spotlight Banner */}
        <div className="pt-6 border-t border-white/10 flex items-center gap-4 bg-[#0a0c12] p-4 border border-[#d3122a]/30 max-w-lg">
          <img
            src={worldCupTrophyImg}
            alt="2011 ICC Cricket World Cup Champion Trophy"
            className="w-16 h-16 object-contain shrink-0 filter drop-shadow-md"
            referrerPolicy="no-referrer"
          />
          <div className="text-left">
            <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-[#d3122a] block">
              Pinnacle Legacy
            </span>
            <h4 className="text-sm font-black text-cyan-300 uppercase tracking-wide font-brand mt-0.5">
              2011 ICC Cricket World Cup Champion
            </h4>
            <p className="text-[10px] text-white/50 font-mono mt-0.5">
              35 Runs in Final @ Wankhede • Lifting Sachin Tendulkar
            </p>
          </div>
        </div>
      </div>

      {/* Hero Right: 3D Trophy Showcase */}
      <div className="w-full md:w-1/2 relative flex justify-center items-center mt-6 md:mt-0">
        <StatueCanvas />
      </div>
    </section>
  );
};
