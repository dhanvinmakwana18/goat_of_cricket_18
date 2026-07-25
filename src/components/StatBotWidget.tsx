import React, { useState } from 'react';
import { StatBotResponse } from '../services/rag/types';
import { StatBotService } from '../services/rag/statBotService';
import { Bot, Sparkles, Send, ExternalLink, ShieldCheck, Database, Search, RefreshCw, Cpu, Award } from 'lucide-react';

interface StatBotWidgetProps {
  apiKey?: string;
  onClose?: () => void;
}

export const StatBotWidget: React.FC<StatBotWidgetProps> = ({ apiKey, onClose }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<StatBotResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const sampleQueries = [
    "How did Virat break Sachin's record with his 50th ODI century?",
    "Tell me about 82* vs Pakistan at MCG 2022 in T20 World Cup",
    "What was Virat's performance in the 2024 T20 World Cup Final?",
    "What is Kohli's highest individual score in ODI cricket?",
    "How many total international hundreds does Virat Kohli have?"
  ];

  const executeQuery = async (queryText: string) => {
    if (!queryText.trim()) return;

    setLoading(true);
    setErrorMsg(null);
    try {
      // 1. Try server API route first
      const apiResp = await fetch('/api/rag/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryText }),
      });

      if (apiResp.ok) {
        const data: StatBotResponse = await apiResp.json();
        setResult(data);
      } else {
        // Fallback to client service if API key is present
        if (apiKey) {
          const bot = new StatBotService(apiKey);
          const res = await bot.answerCricketQuery(queryText);
          setResult(res);
        } else {
          const errData = await apiResp.json().catch(() => ({}));
          throw new Error(errData.message || 'Failed to fetch grounded query answer.');
        }
      }
    } catch (err: any) {
      console.error('StatBot Query Error:', err);
      setErrorMsg(err?.message || 'An error occurred while fetching statistical grounding data.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    executeQuery(query);
  };

  return (
    <div className="bg-[#0b0e17] border border-white/10 rounded-3xl p-6 sm:p-8 text-white max-w-4xl mx-auto shadow-2xl relative overflow-hidden backdrop-blur-xl">
      {/* Background Neon Accent Glows */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-600 to-rose-400 flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.4)]">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest text-red-400 uppercase">// HYBRID RAG VECTOR ENGINE</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-[9px] font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> ZERO-HALLUCINATION
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black font-syne uppercase tracking-tight text-white flex items-center gap-2">
              VK18 Grounded StatBot <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
            </h3>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono font-bold text-neutral-300 transition-colors"
          >
            Close StatBot
          </button>
        )}
      </div>

      {/* Search Bar Input */}
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask any statistical question, e.g., 'What is Virat's record in run chases in Australia?'"
            className="w-full bg-black/60 border border-white/15 focus:border-red-500 rounded-2xl pl-12 pr-32 py-4 text-sm sm:text-base font-mono text-white placeholder-neutral-500 focus:outline-none transition-all shadow-inner"
          />
          <Search className="w-5 h-5 text-neutral-500 absolute left-4 pointer-events-none" />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="absolute right-2 px-5 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 font-syne font-bold text-xs uppercase tracking-wider rounded-xl transition-all disabled:opacity-50 flex items-center gap-2 shadow-[0_0_15px_rgba(220,38,38,0.4)]"
          >
            {loading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Querying...
              </>
            ) : (
              <>
                Query RAG
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>

        {/* Sample Prompt Chips */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-[11px] font-mono text-neutral-400 uppercase flex items-center gap-1">
            <Cpu className="w-3 h-3 text-red-400" /> Suggested Queries:
          </span>
          {sampleQueries.map((sq, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setQuery(sq);
                executeQuery(sq);
              }}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-red-500/15 border border-white/10 hover:border-red-500/40 text-[11px] font-mono text-neutral-300 hover:text-white transition-all text-left"
            >
              {sq}
            </button>
          ))}
        </div>
      </form>

      {/* Error Feedback */}
      {errorMsg && (
        <div className="mt-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono flex items-center gap-2">
          <span>⚠️ {errorMsg}</span>
        </div>
      )}

      {/* Result Panel */}
      {result && (
        <div className="mt-8 p-6 sm:p-8 bg-[#0a0d14] border border-white/10 rounded-3xl space-y-6 animate-fadeIn shadow-2xl">
          <div className="flex justify-between items-center pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                GROUNDED STATISTICAL ANSWER
              </span>
            </div>
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-neutral-400 flex items-center gap-1">
              <Database className="w-3 h-3 text-cyan-400" /> CONFIDENCE SCORE: {(result.confidenceScore * 100).toFixed(0)}%
            </span>
          </div>

          {/* Formatted Text Output */}
          <div className="prose prose-invert max-w-none text-sm leading-relaxed text-neutral-200 whitespace-pre-wrap font-sans">
            {result.answer}
          </div>

          {/* Grounded Source Citations */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block font-bold">
              Verified Grounded Sources (ICC Official + Wikipedia REST):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {result.groundedSources.map((source, idx) => (
                <a
                  key={idx}
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/40 text-xs text-cyan-400 hover:text-cyan-300 flex items-center justify-between gap-2 transition-colors group"
                >
                  <div className="truncate">
                    <span className="px-1.5 py-0.5 text-[9px] rounded bg-white/10 text-neutral-300 font-mono mr-2">
                      {source.source}
                    </span>
                    <span className="font-semibold">{source.title}</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-cyan-300 shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
