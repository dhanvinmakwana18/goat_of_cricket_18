import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface SubpageHoverTriggerProps {
  title: string;
  subtitle: string;
  portalCode?: string;
  badgeText?: string;
  themeColor?: 'crimson' | 'red' | 'cyan' | 'emerald' | 'purple';
  onTrigger: () => void;
  hoverDurationMs?: number;
}

export const SubpageHoverTrigger: React.FC<SubpageHoverTriggerProps> = ({
  title,
  subtitle,
  portalCode = 'PORTAL-01',
  badgeText = 'INSTANT TELEPORT',
  themeColor = 'crimson',
  onTrigger,
  hoverDurationMs = 300,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const colorStyles = {
    crimson: {
      border: 'hover:border-rose-500/80',
      badgeBg: 'bg-rose-500/15 text-rose-400 border-rose-500/40',
      fillBg: 'bg-rose-500/20 border-r-2 border-rose-400 shadow-[0_0_25px_rgba(244,63,94,0.6)]',
      glow: 'group-hover:shadow-[0_0_35px_rgba(244,63,94,0.25)]',
      arrow: 'group-hover:bg-rose-500 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(244,63,94,0.7)]',
      textHover: 'group-hover:text-rose-300'
    },
    red: {
      border: 'hover:border-red-500/80',
      badgeBg: 'bg-red-500/15 text-red-400 border-red-500/40',
      fillBg: 'bg-red-500/20 border-r-2 border-red-400 shadow-[0_0_25px_rgba(239,68,68,0.6)]',
      glow: 'group-hover:shadow-[0_0_35px_rgba(239,68,68,0.25)]',
      arrow: 'group-hover:bg-red-500 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(239,68,68,0.7)]',
      textHover: 'group-hover:text-red-300'
    },
    cyan: {
      border: 'hover:border-cyan-400/80',
      badgeBg: 'bg-cyan-400/15 text-cyan-300 border-cyan-400/40',
      fillBg: 'bg-cyan-500/20 border-r-2 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.6)]',
      glow: 'group-hover:shadow-[0_0_35px_rgba(6,182,212,0.25)]',
      arrow: 'group-hover:bg-cyan-400 group-hover:text-slate-950 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.7)]',
      textHover: 'group-hover:text-cyan-300'
    },
    emerald: {
      border: 'hover:border-emerald-400/80',
      badgeBg: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/40',
      fillBg: 'bg-emerald-500/20 border-r-2 border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.6)]',
      glow: 'group-hover:shadow-[0_0_35px_rgba(16,185,129,0.25)]',
      arrow: 'group-hover:bg-emerald-400 group-hover:text-slate-950 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.7)]',
      textHover: 'group-hover:text-emerald-300'
    },
    purple: {
      border: 'hover:border-purple-400/80',
      badgeBg: 'bg-purple-400/15 text-purple-300 border-purple-400/40',
      fillBg: 'bg-purple-500/20 border-r-2 border-purple-400 shadow-[0_0_25px_rgba(168,85,247,0.6)]',
      glow: 'group-hover:shadow-[0_0_35px_rgba(168,85,247,0.25)]',
      arrow: 'group-hover:bg-purple-500 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(168,85,247,0.7)]',
      textHover: 'group-hover:text-purple-300'
    }
  }[themeColor];

  const handleMouseEnter = () => {
    setIsHovered(true);
    timerRef.current = setTimeout(() => {
      onTrigger();
    }, hoverDurationMs);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  return (
    <div
      onClick={onTrigger}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative cursor-pointer group p-6 sm:p-8 rounded-2xl bg-[#090b10]/90 border border-white/10 ${colorStyles.border} ${colorStyles.glow} transition-all duration-300 overflow-hidden backdrop-blur-md`}
    >
      {/* Sci-Fi Reticle Corner Accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/30 group-hover:border-cyan-400 transition-colors pointer-events-none" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/30 group-hover:border-cyan-400 transition-colors pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/30 group-hover:border-cyan-400 transition-colors pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/30 group-hover:border-cyan-400 transition-colors pointer-events-none" />

      {/* Dynamic Hover Background Laser Progress Fill */}
      {isHovered && (
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: hoverDurationMs / 1000, ease: 'linear' }}
          className={`absolute inset-0 ${colorStyles.fillBg} pointer-events-none`}
        />
      )}

      {/* Background Tech Grid Lines */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#00f0ff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2.5">
            <span className="text-[9px] uppercase tracking-widest font-mono text-cyan-400/80">
              [{portalCode}]
            </span>
            <span className={`text-[10px] uppercase tracking-widest font-bold px-2.5 py-0.5 rounded border ${colorStyles.badgeBg}`}>
              {isHovered ? '⚡ WARPING TELEPORT...' : badgeText}
            </span>
          </div>

          <h3 className={`text-xl sm:text-2xl font-black text-white ${colorStyles.textHover} transition-colors font-syne tracking-tight uppercase`}>
            {title}
          </h3>
          <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed max-w-xl">
            {subtitle}
          </p>
        </div>

        {/* Action Trigger Button */}
        <div className="flex items-center gap-3 shrink-0 self-start sm:self-center mt-2 sm:mt-0">
          <div className="hidden md:flex flex-col text-right">
            <span className="text-[9px] uppercase font-mono tracking-widest text-neutral-400">TELEPORT HUB</span>
            <span className="text-[11px] font-bold text-cyan-300 uppercase">Enter Subpage Portal</span>
          </div>
          <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 ${colorStyles.arrow} flex items-center justify-center text-xl font-bold transition-all duration-300`}>
            →
          </div>
        </div>
      </div>
    </div>
  );
};

