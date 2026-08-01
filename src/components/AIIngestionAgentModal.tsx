import React, { useState } from 'react';
import { Bot, Search, Globe, CheckCircle, RefreshCw, AlertCircle, Edit3, Plus, Trash2, ArrowRight, ExternalLink, Sparkles, X, Check } from 'lucide-react';
import { InningRecord } from '../data/allInningsData';
import { saveCustomInnings, getCustomInnings, clearCustomInnings } from '../utils/inningsStore';

interface AIIngestionAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataApplied?: () => void;
}

interface GroundingSource {
  title: string;
  uri: string;
}

const SEARCH_PRESETS = [
  'Virat Kohli IPL 2024 scorecards',
  'Virat Kohli 2023 ODI World Cup innings',
  'Virat Kohli T20 World Cup 2022 matches',
  'Virat Kohli 2021 Test innings in England',
  'Virat Kohli recent international scores 2024-2026',
];

export function AIIngestionAgentModal({ isOpen, onClose, onDataApplied }: AIIngestionAgentModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [extractedInnings, setExtractedInnings] = useState<InningRecord[]>([]);
  const [sources, setSources] = useState<GroundingSource[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [appliedCount, setAppliedCount] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRunAgent = async (queryToRun?: string) => {
    const activeQuery = queryToRun || searchQuery;
    if (!activeQuery.trim()) return;

    setLoading(true);
    setError(null);
    setSummary(null);
    setExtractedInnings([]);
    setSources([]);
    setAppliedCount(null);

    try {
      const response = await fetch('/api/agent/search-innings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: activeQuery }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to search web via AI Agent.');
      }

      const data = await response.json();
      setSummary(data.summary || 'Search complete.');
      setExtractedInnings(data.innings || []);
      setSources(data.groundingSources || []);
    } catch (err: any) {
      console.error('AI Agent Error:', err);
      setError(err.message || 'An error occurred while fetching innings data.');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyToWebsite = () => {
    if (extractedInnings.length === 0) return;
    saveCustomInnings(extractedInnings);
    setAppliedCount(extractedInnings.length);
    if (onDataApplied) onDataApplied();
  };

  const handleUpdateInningField = (id: string, field: keyof InningRecord, value: any) => {
    setExtractedInnings((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, [field]: value };
        if (field === 'runs') {
          const runNum = parseInt(String(value).replace(/\D/g, ''), 10) || 0;
          updated.isCentury = runNum >= 100;
          updated.isZero = runNum === 0;
        }
        return updated;
      })
    );
  };

  const handleDeleteInning = (id: string) => {
    setExtractedInnings((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddManualRow = () => {
    const newRecord: InningRecord = {
      id: `manual-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      format: 'ODI',
      runs: '50',
      opponent: 'Opposition',
      venue: 'Stadium',
      source: 'ICC',
      isCentury: false,
      isZero: false,
      notes: 'User added entry',
    };
    setExtractedInnings((prev) => [newRecord, ...prev]);
  };

  const customCount = getCustomInnings().length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-[#0c0e14] border border-[#d3122a]/40 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-white font-body">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-800 bg-gradient-to-r from-[#141822] via-[#0c0e14] to-[#1a080c]">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-[#d3122a]/20 border border-[#d3122a]/50 text-[#d3122a]">
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 text-[9px] font-mono font-bold tracking-widest text-[#d3122a] bg-[#d3122a]/10 border border-[#d3122a]/30 rounded uppercase">
                  Google Search Grounded AI Agent
                </span>
                {customCount > 0 && (
                  <span className="px-2 py-0.5 text-[9px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded">
                    {customCount} Custom Inning(s) Synced
                  </span>
                )}
              </div>
              <h2 className="text-xl font-black font-syne uppercase tracking-wide text-white mt-0.5">
                Virat Kohli AI Innings Search Agent
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Query Input Section */}
          <div className="space-y-3">
            <label className="block text-xs font-mono font-bold text-neutral-300 uppercase tracking-wider">
              1. Tell AI Agent What Match Data To Search
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleRunAgent()}
                  placeholder="e.g. Search all Virat Kohli innings in 2024 IPL or 2023 World Cup..."
                  className="w-full pl-10 pr-4 py-3 bg-[#131722] border border-neutral-700/80 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#d3122a] focus:ring-1 focus:ring-[#d3122a] transition-all"
                />
              </div>
              <button
                onClick={() => handleRunAgent()}
                disabled={loading || !searchQuery.trim()}
                className="px-6 py-3 bg-gradient-to-r from-[#d3122a] to-[#9b0b1e] hover:from-[#e21832] hover:to-[#b50e24] disabled:opacity-50 font-bold text-sm tracking-wide text-white rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2 min-w-[150px]"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Searching Web...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Run AI Agent</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] font-mono text-neutral-400">Quick Prompts:</span>
              {SEARCH_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSearchQuery(preset);
                    handleRunAgent(preset);
                  }}
                  disabled={loading}
                  className="px-2.5 py-1 text-xs bg-neutral-800/80 hover:bg-neutral-700/80 text-neutral-300 hover:text-white border border-neutral-700 rounded-lg transition-colors flex items-center space-x-1"
                >
                  <span>{preset}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="p-8 border border-neutral-800 rounded-2xl bg-[#10131d]/60 text-center space-y-4">
              <div className="inline-flex items-center justify-center p-4 bg-[#d3122a]/10 border border-[#d3122a]/30 rounded-full text-[#d3122a]">
                <Globe className="w-8 h-8 animate-spin" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-white">AI Agent is Grounding Google Search...</h3>
                <p className="text-xs text-neutral-400 max-w-md mx-auto">
                  Searching ESPNcricinfo, ICC-cricket, and IPL match archives for verified scorecards and formatting exact JSON telemetry.
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-950/40 border border-red-800/60 rounded-xl flex items-start space-x-3 text-red-200 text-sm">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Search Agent Encountered an Issue</p>
                <p className="text-xs text-red-300 mt-0.5">{error}</p>
              </div>
            </div>
          )}

          {/* Results Display & Editor */}
          {!loading && extractedInnings.length > 0 && (
            <div className="space-y-4">
              {/* Summary Header */}
              <div className="p-4 bg-[#141824] border border-neutral-800 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-emerald-400 font-mono text-xs font-bold uppercase">
                    <CheckCircle className="w-4 h-4" />
                    <span>Extracted {extractedInnings.length} Match Inning(s)</span>
                  </div>
                  <p className="text-xs text-neutral-300">{summary}</p>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={handleAddManualRow}
                    className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-200 rounded-lg transition-colors flex items-center space-x-1 border border-neutral-700"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Manual Row</span>
                  </button>
                  <button
                    onClick={handleApplyToWebsite}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-lg transition-all flex items-center space-x-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Put On Website / Sync Data</span>
                  </button>
                </div>
              </div>

              {/* Notification Banner when applied */}
              {appliedCount !== null && (
                <div className="p-3 bg-emerald-950/60 border border-emerald-500/50 rounded-xl flex items-center justify-between text-xs text-emerald-200">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold">
                      Successfully saved {appliedCount} inning(s)! Website components (Calendar, Timeline, Stats) have been updated in real-time.
                    </span>
                  </div>
                </div>
              )}

              {/* Editable Table */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider px-1">
                  <span>2. Review & Fix Given Input Before Syncing</span>
                  <span>{extractedInnings.length} Records Discovered</span>
                </div>

                <div className="border border-neutral-800 rounded-xl overflow-hidden bg-[#0a0c12]">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#121622] text-neutral-400 font-mono text-[11px] uppercase border-b border-neutral-800">
                        <tr>
                          <th className="py-2.5 px-3">Date (YYYY-MM-DD)</th>
                          <th className="py-2.5 px-3">Format</th>
                          <th className="py-2.5 px-3">Runs</th>
                          <th className="py-2.5 px-3">Opponent</th>
                          <th className="py-2.5 px-3">Venue</th>
                          <th className="py-2.5 px-3">Highlight / Notes</th>
                          <th className="py-2.5 px-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-800/60 text-neutral-200">
                        {extractedInnings.map((item) => (
                          <tr key={item.id} className="hover:bg-neutral-900/50 transition-colors">
                            {/* Date */}
                            <td className="py-2 px-3">
                              <input
                                type="text"
                                value={item.date}
                                onChange={(e) => handleUpdateInningField(item.id, 'date', e.target.value)}
                                className="w-24 px-1.5 py-1 bg-neutral-900 border border-neutral-700/60 rounded text-xs text-white font-mono"
                              />
                            </td>
                            {/* Format */}
                            <td className="py-2 px-3">
                              <select
                                value={item.format}
                                onChange={(e) => handleUpdateInningField(item.id, 'format', e.target.value)}
                                className="px-1.5 py-1 bg-neutral-900 border border-neutral-700/60 rounded text-xs text-white font-mono"
                              >
                                <option value="ODI">ODI</option>
                                <option value="TEST">TEST</option>
                                <option value="T20I">T20I</option>
                                <option value="IPL">IPL</option>
                              </select>
                            </td>
                            {/* Runs */}
                            <td className="py-2 px-3">
                              <input
                                type="text"
                                value={item.runs}
                                onChange={(e) => handleUpdateInningField(item.id, 'runs', e.target.value)}
                                className={`w-16 px-1.5 py-1 bg-neutral-900 border rounded text-xs font-bold font-mono text-center ${
                                  item.isCentury
                                    ? 'text-amber-400 border-amber-500/50'
                                    : item.isZero
                                    ? 'text-red-400 border-red-500/50'
                                    : 'text-white border-neutral-700/60'
                                }`}
                              />
                            </td>
                            {/* Opponent */}
                            <td className="py-2 px-3">
                              <input
                                type="text"
                                value={item.opponent}
                                onChange={(e) => handleUpdateInningField(item.id, 'opponent', e.target.value)}
                                className="w-28 px-1.5 py-1 bg-neutral-900 border border-neutral-700/60 rounded text-xs text-white"
                              />
                            </td>
                            {/* Venue */}
                            <td className="py-2 px-3">
                              <input
                                type="text"
                                value={item.venue}
                                onChange={(e) => handleUpdateInningField(item.id, 'venue', e.target.value)}
                                className="w-36 px-1.5 py-1 bg-neutral-900 border border-neutral-700/60 rounded text-xs text-neutral-300"
                              />
                            </td>
                            {/* Notes */}
                            <td className="py-2 px-3">
                              <input
                                type="text"
                                value={item.notes || ''}
                                onChange={(e) => handleUpdateInningField(item.id, 'notes', e.target.value)}
                                className="w-full min-w-[160px] px-1.5 py-1 bg-neutral-900 border border-neutral-700/60 rounded text-xs text-neutral-300"
                              />
                            </td>
                            {/* Delete Action */}
                            <td className="py-2 px-3 text-right">
                              <button
                                onClick={() => handleDeleteInning(item.id)}
                                className="p-1 text-neutral-500 hover:text-red-400 transition-colors"
                                title="Remove entry"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Grounding Sources */}
              {sources.length > 0 && (
                <div className="pt-2 border-t border-neutral-800/80 space-y-1.5">
                  <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest block">
                    Grounded Web Sources:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {sources.map((src, i) => (
                      <a
                        key={i}
                        href={src.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 text-[11px] text-neutral-300 hover:text-white rounded border border-neutral-800 flex items-center space-x-1 transition-colors"
                      >
                        <span className="truncate max-w-[200px]">{src.title}</span>
                        <ExternalLink className="w-3 h-3 text-neutral-500 shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Reset / Clear Custom Innings Option */}
          {customCount > 0 && (
            <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
              <span>You have {customCount} custom AI-imported inning(s) saved in local memory.</span>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to clear all custom imported AI innings?')) {
                    clearCustomInnings();
                    setAppliedCount(0);
                    if (onDataApplied) onDataApplied();
                  }
                }}
                className="text-red-400 hover:text-red-300 font-mono text-[11px] underline"
              >
                Reset to Default Data
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-neutral-800 bg-[#090b10] flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-neutral-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>AI Search Agent Ready</span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-300 rounded-lg transition-colors"
            >
              Close
            </button>
            {extractedInnings.length > 0 && (
              <button
                onClick={handleApplyToWebsite}
                className="px-5 py-2 bg-[#d3122a] hover:bg-[#b80e23] text-xs font-bold uppercase tracking-wider text-white rounded-lg transition-all shadow-lg flex items-center space-x-1.5"
              >
                <ArrowRight className="w-4 h-4" />
                <span>Apply Data to Website</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
