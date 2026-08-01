import React, { useState } from 'react';
import { Bot, Sparkles } from 'lucide-react';
import { AIIngestionAgentModal } from './AIIngestionAgentModal';

interface HeaderProps {
  onOpenSubpage?: (subpage: 'chronology' | 'centuries' | 'biomechanics' | 'rivalries' | 'trophies' | 'statbot') => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSubpage }) => {
  const [isAgentOpen, setIsAgentOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07090e]/95 backdrop-blur-md px-4 lg:px-8 py-3.5 transition-all">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group cursor-pointer shrink-0">
            <span className="text-2xl sm:text-3xl font-black tracking-tighter text-[#d3122a] border-r border-white/10 pr-4 font-brand">
              VK18
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] tracking-[0.3em] text-white/70 uppercase font-bold">
                VIRAT KOHLI
              </span>
              <span className="text-[9px] tracking-[0.2em] text-[#d3122a] uppercase font-mono font-bold">
                KING'S TELEMETRY HUB
              </span>
            </div>
          </a>

          {/* Nav Portals & AI Agent Search Launcher */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <button
              onClick={() => setIsAgentOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#d3122a] via-rose-600 to-[#9b0b1e] hover:from-[#e21832] hover:to-[#b50e24] text-white font-mono text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(211,18,42,0.5)] border border-[#d3122a]/50 cursor-pointer"
              title="Launch AI Agent to search Google for Virat Kohli match scorecards and sync live data"
            >
              <Bot className="w-3.5 h-3.5 text-white animate-pulse" />
              <span>AI Search Agent</span>
              <Sparkles className="w-3 h-3 text-amber-300" />
            </button>

            <div className="flex items-center gap-1.5 bg-black/80 p-1.5 rounded-2xl border border-white/10 text-[10px] font-mono overflow-x-auto max-w-full no-scrollbar shrink-0">
              <button
                onClick={() => onOpenSubpage?.('chronology')}
                className="px-3 py-1.5 rounded-xl hover:bg-rose-500/20 hover:text-rose-300 text-neutral-300 transition-colors flex items-center gap-1 font-bold uppercase whitespace-nowrap"
                title="Open Chronology & Peak Telemetry Portal"
              >
                01. Chronology
              </button>

              <button
                onClick={() => onOpenSubpage?.('centuries')}
                className="px-3 py-1.5 rounded-xl hover:bg-red-500/20 hover:text-red-300 text-neutral-300 transition-colors flex items-center gap-1 font-bold uppercase whitespace-nowrap"
                title="Open Century Archives & King's Chronicles Portal"
              >
                02. Centuries & Chronicles
              </button>

              <button
                onClick={() => onOpenSubpage?.('biomechanics')}
                className="px-3 py-1.5 rounded-xl hover:bg-cyan-400/20 hover:text-cyan-300 text-neutral-300 transition-colors flex items-center gap-1 font-bold uppercase whitespace-nowrap"
                title="Open Biomechanics Lab Portal"
              >
                03. Biomechanics
              </button>

              <button
                onClick={() => onOpenSubpage?.('rivalries')}
                className="px-3 py-1.5 rounded-xl hover:bg-purple-500/20 hover:text-purple-300 text-neutral-300 transition-colors flex items-center gap-1 font-bold uppercase whitespace-nowrap"
                title="Open Rivalry Matrix Portal"
              >
                04. Rivalries
              </button>

              <button
                onClick={() => onOpenSubpage?.('trophies')}
                className="px-3 py-1.5 rounded-xl hover:bg-emerald-400/20 hover:text-emerald-300 text-neutral-300 transition-colors flex items-center gap-1 font-bold uppercase whitespace-nowrap"
                title="Open Trophy Vault Portal"
              >
                05. Trophies
              </button>

              <button
                onClick={() => onOpenSubpage?.('statbot')}
                className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-600/30 to-amber-500/20 hover:from-red-600/50 hover:to-amber-500/40 text-amber-300 border border-amber-500/30 transition-colors flex items-center gap-1 font-bold uppercase whitespace-nowrap shadow-[0_0_12px_rgba(245,158,11,0.2)]"
                title="Open Grounded AI StatBot Portal"
              >
                06. AI StatBot 🤖
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* AI Ingestion Agent Search Modal */}
      <AIIngestionAgentModal
        isOpen={isAgentOpen}
        onClose={() => setIsAgentOpen(false)}
        onDataApplied={() => {
          // Triggers global re-render event
          window.dispatchEvent(new CustomEvent('vk_innings_updated'));
        }}
      />
    </>
  );
};

