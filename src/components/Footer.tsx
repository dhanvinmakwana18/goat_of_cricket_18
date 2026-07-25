import React from 'react';
import { ArrowUp, Trophy, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/5 bg-[#05070a] py-12 px-6 lg:px-12 relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="text-center md:text-left">
          <span className="text-3xl font-brand font-black text-[#d3122a]">VK18 PORTAL</span>
          <p className="text-[10px] text-white/30 font-mono uppercase tracking-[0.3em] mt-1">
            King Kohli | RCB Bold Crimson & Black Legacy
          </p>
        </div>

        {/* Quick Nav */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">
          <a href="#statue" className="hover:text-[#d3122a] transition-colors">3D Showcase</a>
          <a href="#timeline" className="hover:text-[#d3122a] transition-colors">Timeline</a>
          <a href="#stats" className="hover:text-[#d3122a] transition-colors">Statistics</a>
          <a href="#about" className="hover:text-[#d3122a] transition-colors">Biography</a>
          <a href="#records" className="hover:text-[#d3122a] transition-colors">Records</a>
          <a href="#drive" className="hover:text-[#d3122a] transition-colors">Drive Storage</a>
        </div>

        {/* Scroll Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="p-3 bg-[#07090d] hover:bg-[#d3122a] hover:text-white text-white/70 transition-all border border-white/10 flex items-center justify-center group"
          title="Back to Top"
        >
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      {/* Metadata Columns */}
      <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-7xl mx-auto text-left">
        <div>
          <span className="text-[9px] text-white/30 uppercase tracking-[0.3em] font-bold block">Role</span>
          <span className="text-xs font-bold text-white mt-1 block">Right-Hand Batsman / RCB</span>
        </div>
        <div>
          <span className="text-[9px] text-white/30 uppercase tracking-[0.3em] font-bold block">Hometown</span>
          <span className="text-xs font-bold text-white mt-1 block">Delhi, India</span>
        </div>
        <div>
          <span className="text-[9px] text-white/30 uppercase tracking-[0.3em] font-bold block">ODI Debut</span>
          <span className="text-xs font-bold text-white mt-1 block">August 18, 2008</span>
        </div>
        <div>
          <span className="text-[9px] text-white/30 uppercase tracking-[0.3em] font-bold block">IPL Team</span>
          <span className="text-xs font-bold text-[#d3122a] mt-1 block font-bold">Royal Challengers Bengaluru (2008–Present)</span>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 text-[10px] text-white/30 font-mono flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto gap-2">
        <p>© 2026 Makwana Industries. All Rights Reserved.</p>
        <p className="flex items-center gap-1 text-[#d3122a]">
          2011 ICC Cricket World Cup Champion
        </p>
      </div>
    </footer>
  );
};
