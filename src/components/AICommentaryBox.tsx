import React, { useState, useEffect } from 'react';
import { CommentaryEngine } from '../services/commentary/commentaryEngine';
import { CommentatorID } from '../services/commentary/commentatorPrompts';
import { Radio, Sparkles, Volume2, Mic } from 'lucide-react';

interface AICommentaryBoxProps {
  apiKey?: string;
  inningsContext: {
    runs: number;
    balls: number;
    opponent: string;
    venue: string;
    format: string;
    description: string;
  };
}

export const AICommentaryBox: React.FC<AICommentaryBoxProps> = ({ apiKey = '', inningsContext }) => {
  const [activeCommentator, setActiveCommentator] = useState<CommentatorID>('harsha');
  const [commentary, setCommentary] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const commentators: { id: CommentatorID; name: string; role: string }[] = [
    { id: 'harsha', name: 'Harsha Bhogle', role: 'The Poet' },
    { id: 'ravi', name: 'Ravi Shastri', role: 'The Hype' },
    { id: 'jatin', name: 'Jatin Sapru', role: 'The Fanatic (Hinglish)' }
  ];

  const handleGenerate = async (id: CommentatorID) => {
    setActiveCommentator(id);
    setIsGenerating(true);
    
    const engine = new CommentaryEngine(apiKey);
    const result = await engine.generateLiveCommentary(inningsContext, id);
    
    setCommentary(result);
    setIsGenerating(false);
  };

  useEffect(() => {
    handleGenerate('harsha');
  }, [inningsContext.opponent, inningsContext.runs]);

  return (
    <div className="bg-[#0c0f1a] border border-[#d3122a]/40 rounded-3xl p-6 mt-6 relative overflow-hidden text-white shadow-[0_0_30px_rgba(211,18,42,0.15)]">
      {/* Background Glow */}
      <div className="absolute -right-10 -top-10 w-48 h-48 bg-[#d3122a]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-white/10">
        <h3 className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#d3122a] animate-ping" />
          <Mic className="w-4 h-4 text-red-400" /> DYNAMIC AI BROADCAST COMMENTARY
        </h3>
        <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" /> LIVE REACTION FEED
        </span>
      </div>

      {/* 3 Commentator Selector Tabs */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {commentators.map((c) => (
          <button
            key={c.id}
            onClick={() => handleGenerate(c.id)}
            disabled={isGenerating}
            className={`px-4 py-2.5 rounded-xl text-xs font-syne font-bold uppercase tracking-wider transition-all border flex items-center gap-2 ${
              activeCommentator === c.id
                ? 'bg-[#d3122a] text-white border-red-400 shadow-lg shadow-red-600/30'
                : 'bg-black/60 text-neutral-400 border-white/10 hover:border-white/20 hover:text-white'
            }`}
          >
            <span>{c.name}</span>
            <span className="opacity-60 text-[10px] font-mono font-normal">| {c.role}</span>
          </button>
        ))}
      </div>

      {/* Generated Commentary Output */}
      <div className="min-h-[120px] p-5 sm:p-6 bg-black/70 border border-white/10 rounded-2xl italic text-base sm:text-lg text-neutral-100 leading-relaxed font-serif relative">
        <Volume2 className="w-5 h-5 text-red-400 absolute top-4 right-4 opacity-50" />
        {isGenerating ? (
          <div className="flex items-center gap-3 text-neutral-400 font-mono text-xs">
            <Radio className="w-4 h-4 text-red-400 animate-spin" />
            <span>Connecting to live commentary box... generating broadcast feed...</span>
          </div>
        ) : (
          <p className="pr-6 font-serif">
            "{commentary || 'Select Harsha, Ravi, or Jatin to hear their live reaction call.'}"
          </p>
        )}
      </div>
    </div>
  );
};
