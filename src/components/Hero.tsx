import React from 'react';
import { StatueCanvas } from './StatueCanvas';
import { ExternalLink, Award, Flame, ChevronRight } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section id="statue" class="relative min-h-[85vh] flex flex-col md:flex-row items-center justify-between px-6 lg:px-12 py-12 max-w-7xl mx-auto gap-12 border-b border-white/5">
      {/* Hero Left Content */}
      <div class="w-full md:w-1/2 space-y-6 z-10 text-center md:text-left">
        <div class="inline-block px-4 py-1.5 border border-[#eab308]/30 bg-[#eab308]/5 rounded-full">
          <span class="text-[10px] font-bold text-[#eab308] uppercase tracking-[0.2em] flex items-center gap-2">
            <Flame className="w-3.5 h-3.5 text-[#eab308] animate-pulse" />
            World Record Holder
          </span>
        </div>

        <h1 class="text-6xl sm:text-7xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.85] font-brand italic">
          VIRAT<br />
          <span class="text-[#eab308] not-italic">KOHLI</span>
        </h1>

        <div class="flex gap-6 items-start justify-center md:justify-start pt-2">
          <div class="w-1 bg-[#eab308] h-24 shrink-0 hidden sm:block"></div>
          <p class="text-white/60 text-base sm:text-lg max-w-xl leading-relaxed font-light text-left">
            A relentless force of nature. From a determined boy in Delhi to the{' '}
            <span class="text-white font-medium">prolific record-breaker</span> of the modern era with 50 ODI centuries. King Kohli redefined the pursuit of excellence in cricket.
          </p>
        </div>

        {/* CTA Actions */}
        <div class="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
          <a
            href="#stats"
            class="px-8 py-4 bg-[#eab308] text-black text-[12px] font-black uppercase tracking-widest hover:bg-white transition-all transform hover:scale-105 flex items-center gap-2 cursor-pointer shadow-lg shadow-[#eab308]/20"
          >
            <span>Historical Records</span>
            <ChevronRight className="w-4 h-4" />
          </a>

          <a
            href="https://en.wikipedia.org/wiki/Virat_Kohli"
            target="_blank"
            rel="noopener noreferrer"
            class="px-8 py-4 border border-white/20 text-white text-[12px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2 group"
          >
            <span>Visual Archive</span>
            <ExternalLink className="w-3.5 h-3.5 text-white/40 group-hover:text-[#eab308] transition-colors" />
          </a>
        </div>

        {/* Quick Highlights / Quotes */}
        <div class="pt-6 border-t border-white/5 grid grid-cols-2 gap-4 text-left max-w-lg">
          <div class="bg-[#07090d] p-4 border border-white/5">
            <span class="text-[9px] uppercase tracking-[0.3em] font-bold text-white/30 block">Nicknames</span>
            <span class="text-xs font-bold text-white mt-1 block">King Kohli, Cheeku</span>
          </div>
          <div class="bg-[#07090d] p-4 border border-white/5">
            <span class="text-[9px] uppercase tracking-[0.3em] font-bold text-white/30 block">Jersey Number</span>
            <span class="text-xs font-black text-[#eab308] mt-1 block">#18 (Legendary)</span>
          </div>
        </div>
      </div>

      {/* Hero Right: 3D Trophy Showcase */}
      <div class="w-full md:w-1/2 relative flex justify-center items-center mt-6 md:mt-0">
        <StatueCanvas />
      </div>
    </section>
  );
};
