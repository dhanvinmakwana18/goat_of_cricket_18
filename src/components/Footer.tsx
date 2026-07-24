import React from 'react';
import { ArrowUp, Trophy, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer class="border-t border-white/5 bg-[#05070a] py-12 px-6 lg:px-12 relative">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div class="text-center md:text-left">
          <span class="text-3xl font-brand font-black text-[#d3122a]">VK18 PORTAL</span>
          <p class="text-[10px] text-white/30 font-mono uppercase tracking-[0.3em] mt-1">
            King Kohli | RCB Bold Crimson & Black Legacy
          </p>
        </div>

        {/* Quick Nav */}
        <div class="flex flex-wrap items-center justify-center gap-6 text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
          <a href="#statue" class="hover:text-[#d3122a] transition-colors">3D Showcase</a>
          <a href="#timeline" class="hover:text-[#d3122a] transition-colors">Timeline</a>
          <a href="#stats" class="hover:text-[#d3122a] transition-colors">Statistics</a>
          <a href="#about" class="hover:text-[#d3122a] transition-colors">Biography</a>
          <a href="#records" class="hover:text-[#d3122a] transition-colors">Records</a>
          <a href="#drive" class="hover:text-[#d3122a] transition-colors">Drive Storage</a>
        </div>

        {/* Scroll Back to Top Button */}
        <button
          onClick={scrollToTop}
          class="p-3 bg-[#07090d] hover:bg-[#d3122a] hover:text-white text-white/70 transition-all border border-white/10 flex items-center justify-center group"
          title="Back to Top"
        >
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* Metadata Columns */}
      <div class="mt-8 pt-8 border-t border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-7xl mx-auto text-left">
        <div>
          <span class="text-[9px] text-white/30 uppercase tracking-[0.3em] font-bold block">Role</span>
          <span class="text-xs font-bold text-white mt-1 block">Right-Hand Batsman / RCB</span>
        </div>
        <div>
          <span class="text-[9px] text-white/30 uppercase tracking-[0.3em] font-bold block">Hometown</span>
          <span class="text-xs font-bold text-white mt-1 block">Delhi, India</span>
        </div>
        <div>
          <span class="text-[9px] text-white/30 uppercase tracking-[0.3em] font-bold block">ODI Debut</span>
          <span class="text-xs font-bold text-white mt-1 block">August 18, 2008</span>
        </div>
        <div>
          <span class="text-[9px] text-white/30 uppercase tracking-[0.3em] font-bold block">IPL Team</span>
          <span class="text-xs font-bold text-[#d3122a] mt-1 block font-bold">Royal Challengers Bengaluru (2008–Present)</span>
        </div>
      </div>

      <div class="mt-8 pt-6 border-t border-white/5 text-[10px] text-white/30 font-mono flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto gap-2">
        <p>© 2024–2026 Interactive Fan Portal. King Kohli Legacy.</p>
        <p class="flex items-center gap-1 text-[#d3122a]">
          2011 ICC Cricket World Cup Champion
        </p>
      </div>
    </footer>
  );
};
