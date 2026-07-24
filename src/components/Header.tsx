import React, { useState } from 'react';
import { Trophy, Menu, X, ExternalLink, Award, BarChart2, BookOpen, HardDrive } from 'lucide-react';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header class="sticky top-0 z-50 border-b border-white/5 bg-[#05070a]/90 backdrop-blur-md px-6 lg:px-10 py-5 transition-all">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        {/* Brand Logo */}
        <a href="#statue" class="flex items-center gap-4 group cursor-pointer">
          <span class="text-4xl font-black tracking-tighter text-[#d3122a] border-r border-white/10 pr-6 font-brand">
            VK18
          </span>
          <div class="hidden sm:flex flex-col">
            <span class="text-[10px] tracking-[0.4em] text-white/50 uppercase font-bold">
              RCB & INDIA LEGEND
            </span>
            <span class="text-[9px] tracking-[0.2em] text-[#d3122a] uppercase font-mono font-bold">
              Royal Challengers Realm
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav class="hidden md:flex items-center space-x-8 text-[11px] font-bold uppercase tracking-widest text-white/70">
          <a
            href="#timeline"
            class="hover:text-[#d3122a] transition-colors flex items-center gap-1.5 py-1 text-[#d3122a]"
          >
            <Trophy className="w-3.5 h-3.5 text-[#d3122a]" />
            Career Timeline
          </a>
          <a
            href="#stats"
            class="hover:text-[#d3122a] transition-colors flex items-center gap-1.5 py-1"
          >
            <BarChart2 className="w-3.5 h-3.5 text-[#d3122a]" />
            Statistics
          </a>
          <a
            href="#about"
            class="hover:text-[#d3122a] transition-colors flex items-center gap-1.5 py-1"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#d3122a]" />
            Biography
          </a>
          <a
            href="#records"
            class="hover:text-[#d3122a] transition-colors flex items-center gap-1.5 py-1"
          >
            <Award className="w-3.5 h-3.5 text-[#d3122a]" />
            Hall of Fame
          </a>
          <a
            href="#drive"
            class="hover:text-[#d3122a] transition-colors flex items-center gap-1.5 py-1"
          >
            <HardDrive className="w-3.5 h-3.5 text-amber-400" />
            Google Drive
          </a>
        </nav>


        {/* Status Badge */}
        <div class="hidden lg:flex items-center space-x-3">
          <div class="px-3 py-1 border border-[#d3122a]/40 bg-[#d3122a]/10 text-[10px] font-bold text-[#d3122a] uppercase tracking-[0.2em] flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[#d3122a] animate-ping"></span>
            RCB Theme • G.O.A.T
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          class="md:hidden p-2 rounded text-[#d3122a] hover:bg-white/5 border border-white/10 focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div class="md:hidden border-t border-white/10 mt-4 pt-4 pb-2 space-y-3 px-2 bg-[#07090d]">
          <a
            href="#statue"
            onClick={() => setMobileMenuOpen(false)}
            class="block px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-white/80 hover:text-[#d3122a] hover:bg-white/5 transition-colors flex items-center gap-3"
          >
            <Trophy className="w-4 h-4 text-[#d3122a]" />
            3D Showcase
          </a>
          <a
            href="#stats"
            onClick={() => setMobileMenuOpen(false)}
            class="block px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-white/80 hover:text-[#d3122a] hover:bg-white/5 transition-colors flex items-center gap-3"
          >
            <BarChart2 className="w-4 h-4 text-[#d3122a]" />
            Statistics
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            class="block px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-white/80 hover:text-[#d3122a] hover:bg-white/5 transition-colors flex items-center gap-3"
          >
            <BookOpen className="w-4 h-4 text-[#d3122a]" />
            Biography
          </a>
          <a
            href="#records"
            onClick={() => setMobileMenuOpen(false)}
            class="block px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-white/80 hover:text-[#d3122a] hover:bg-white/5 transition-colors flex items-center gap-3"
          >
            <Award className="w-4 h-4 text-[#d3122a]" />
            Records
          </a>
          <a
            href="#drive"
            onClick={() => setMobileMenuOpen(false)}
            class="block px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-amber-400 hover:bg-white/5 transition-colors flex items-center gap-3"
          >
            <HardDrive className="w-4 h-4 text-amber-400" />
            Google Drive
          </a>
          <div class="pt-2 border-t border-white/5 flex items-center justify-between px-4">
            <span class="text-[10px] text-white/30 uppercase tracking-[0.3em] font-mono">VK18 PORTAL</span>
            <span class="text-[10px] text-[#d3122a] font-bold uppercase tracking-widest">King Kohli</span>
          </div>
        </div>
      )}
    </header>
  );
};
