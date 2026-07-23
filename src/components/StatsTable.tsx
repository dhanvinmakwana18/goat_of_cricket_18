import React, { useState } from 'react';
import { Search, Filter, TrendingUp, Award, Zap, ChevronDown, ChevronUp } from 'lucide-react';
import { CareerStat } from '../types';

export const StatsTable: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'TEST' | 'ODI' | 'T20I' | 'IPL'>('ALL');
  const [sortField, setSortField] = useState<keyof CareerStat>('runs');
  const [sortAsc, setSortAsc] = useState(false);

  const statsData: CareerStat[] = [
    {
      format: 'Test',
      matches: 113,
      runs: 8848,
      average: 49.15,
      strikeRate: 55.56,
      centuries: 29,
      fifties: 30,
      highScore: '254*',
      wickets: 0,
    },
    {
      format: 'ODI',
      matches: 292,
      runs: 13848,
      average: 58.67,
      strikeRate: 93.54,
      centuries: 50,
      fifties: 72,
      highScore: '183',
      wickets: 4,
    },
    {
      format: 'T20I',
      matches: 125,
      runs: 4188,
      average: 48.69,
      strikeRate: 137.04,
      centuries: 1,
      fifties: 38,
      highScore: '122*',
      wickets: 4,
    },
    {
      format: 'IPL',
      matches: 252,
      runs: 8004,
      average: 38.67,
      strikeRate: 131.97,
      centuries: 8,
      fifties: 55,
      highScore: '113',
      wickets: 0,
    }
  ];

  const filteredStats = statsData.filter((s) => {
    if (activeFilter === 'ALL') return true;
    return s.format.toUpperCase() === activeFilter;
  });

  const sortedStats = [...filteredStats].sort((a, b) => {
    const valA = a[sortField] ?? 0;
    const valB = b[sortField] ?? 0;
    if (valA < valB) return sortAsc ? -1 : 1;
    if (valA > valB) return sortAsc ? 1 : -1;
    return 0;
  });

  const handleSort = (field: keyof CareerStat) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <section id="stats" class="max-w-7xl mx-auto px-6 lg:px-12 py-16 scroll-mt-20">
      {/* Table Header Controls */}
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
        <div>
          <div class="inline-block px-3 py-1 border border-[#eab308]/30 bg-[#eab308]/5 text-[10px] font-bold text-[#eab308] uppercase tracking-[0.2em] mb-3">
            <span class="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" /> Career Analytics
            </span>
          </div>
          <h2 class="text-4xl font-black text-white uppercase tracking-tight font-brand italic">
            Career Metrics
          </h2>
          <div class="h-1.5 w-24 bg-[#eab308] mt-2"></div>
        </div>

        {/* Filter Pills & Timestamp */}
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
          <div class="flex flex-wrap items-center gap-1 bg-[#07090d] p-1 border border-white/5">
            {(['ALL', 'TEST', 'ODI', 'T20I', 'IPL'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                class={`px-3 py-1.5 text-[10px] font-bold uppercase transition-all tracking-wider ${
                  activeFilter === filter
                    ? 'bg-[#eab308] text-black shadow-md'
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <p class="text-white/30 text-[10px] font-mono uppercase tracking-[0.2em] flex items-center gap-1 self-end sm:self-center">
            Last Update: July 2024
          </p>
        </div>
      </div>

      {/* Stats Table Container */}
      <div class="overflow-x-auto border border-white/5 bg-[#07090d]">
        <table class="w-full text-left text-sm border-collapse">
          <thead class="bg-[#05070a] text-white/40 uppercase text-[10px] tracking-[0.3em] font-bold border-b border-white/5">
            <tr>
              <th
                onClick={() => handleSort('format')}
                class="px-8 py-5 cursor-pointer hover:text-[#eab308] transition-colors select-none"
              >
                Format
              </th>
              <th
                onClick={() => handleSort('matches')}
                class="px-8 py-5 cursor-pointer hover:text-[#eab308] transition-colors select-none"
              >
                <div class="flex items-center gap-1">
                  Matches
                  {sortField === 'matches' && (sortAsc ? <ChevronUp className="w-3 h-3 text-[#eab308]" /> : <ChevronDown className="w-3 h-3 text-[#eab308]" />)}
                </div>
              </th>
              <th
                onClick={() => handleSort('runs')}
                class="px-8 py-5 cursor-pointer hover:text-[#eab308] transition-colors select-none"
              >
                <div class="flex items-center gap-1">
                  Runs
                  {sortField === 'runs' && (sortAsc ? <ChevronUp className="w-3 h-3 text-[#eab308]" /> : <ChevronDown className="w-3 h-3 text-[#eab308]" />)}
                </div>
              </th>
              <th
                onClick={() => handleSort('average')}
                class="px-8 py-5 cursor-pointer hover:text-[#eab308] transition-colors select-none"
              >
                <div class="flex items-center gap-1">
                  Avg
                  {sortField === 'average' && (sortAsc ? <ChevronUp className="w-3 h-3 text-[#eab308]" /> : <ChevronDown className="w-3 h-3 text-[#eab308]" />)}
                </div>
              </th>
              <th
                onClick={() => handleSort('strikeRate')}
                class="px-8 py-5 cursor-pointer hover:text-[#eab308] transition-colors select-none"
              >
                <div class="flex items-center gap-1">
                  SR
                  {sortField === 'strikeRate' && (sortAsc ? <ChevronUp className="w-3 h-3 text-[#eab308]" /> : <ChevronDown className="w-3 h-3 text-[#eab308]" />)}
                </div>
              </th>
              <th class="px-8 py-5">High Score</th>
              <th
                onClick={() => handleSort('centuries')}
                class="px-8 py-5 text-[#eab308] font-bold cursor-pointer hover:text-white transition-colors select-none"
              >
                <div class="flex items-center gap-1">
                  100s / 50s
                  {sortField === 'centuries' && (sortAsc ? <ChevronUp className="w-3 h-3 text-[#eab308]" /> : <ChevronDown className="w-3 h-3 text-[#eab308]" />)}
                </div>
              </th>
            </tr>
          </thead>

          <tbody class="divide-y divide-white/5 font-medium">
            {sortedStats.map((row) => (
              <tr
                key={row.format}
                class="hover:bg-white/[0.02] transition-colors group cursor-default"
              >
                <td class="px-8 py-6 font-black text-white group-hover:text-[#eab308] transition-colors flex items-center gap-3">
                  <span class="w-1.5 h-6 bg-[#eab308]"></span>
                  {row.format}
                </td>
                <td class="px-8 py-6 text-white/70 font-mono">{row.matches}</td>
                <td class="px-8 py-6 font-black text-white font-mono text-base">{row.runs.toLocaleString()}</td>
                <td class="px-8 py-6 text-white/70 font-mono">{row.average.toFixed(2)}</td>
                <td class="px-8 py-6 text-white/70 font-mono">{row.strikeRate.toFixed(2)}</td>
                <td class="px-8 py-6 text-[#eab308] font-mono font-bold">{row.highScore}</td>
                <td class="px-8 py-6 text-[#eab308] font-black font-mono">
                  {row.centuries} / {row.fifties}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Signature Geometric Callout Strip */}
      <div class="mt-8 p-8 bg-[#eab308] text-black flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <Award className="w-6 h-6 shrink-0" />
          <div>
            <h3 class="text-[10px] font-black uppercase tracking-[0.4em] text-black/60">Career Summary</h3>
            <p class="text-base font-bold leading-tight uppercase italic mt-0.5">
              26,884 Runs | 80 Centuries | 140 Fifties Across International Cricket
            </p>
          </div>
        </div>
        <a
          href="https://www.espncricinfo.com/cricketers/virat-kohli-253802"
          target="_blank"
          rel="noopener noreferrer"
          class="px-5 py-2.5 bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-colors shrink-0"
        >
          Cricinfo Profile ↗
        </a>
      </div>
    </section>
  );
};
