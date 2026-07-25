import React from 'react';
import { StatBotWidget } from '../StatBotWidget';
import { ArrowLeft, Bot, Sparkles, ShieldCheck } from 'lucide-react';

interface StatBotSubpageProps {
  onClose: () => void;
}

export const StatBotSubpage: React.FC<StatBotSubpageProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#05070d] text-[#F5F5F5] font-body selection:bg-red-500 selection:text-white">
      {/* Top Red Laser Accent Line */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 animate-pulse z-50" />
      <div className="fixed inset-0 opacity-[0.04] bg-[radial-gradient(#ef4444_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Header HUD Bar */}
      <header className="sticky top-0 z-40 bg-[#080a12]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-red-600 hover:text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 group shadow-lg"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Terminal Exit
          </button>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-red-400 uppercase">// TELEMETRY MODULE 06</span>
            <h1 className="text-lg sm:text-2xl font-black font-syne uppercase tracking-tight text-white flex items-center gap-2">
              VK18 Grounded AI StatBot & RAG Engine
            </h1>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <span className="px-3 py-1 rounded border border-red-500/30 bg-red-500/10 text-red-400 font-mono text-[10px] flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> REAL-TIME ICC + WIKIPEDIA FEEDS
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        <StatBotWidget onClose={onClose} />
      </main>
    </div>
  );
};
