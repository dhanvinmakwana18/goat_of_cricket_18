import React, { useState } from 'react';
import { Search, Filter, TrendingUp, Award, Zap, ChevronDown, ChevronUp } from 'lucide-react';
import { CareerStat } from '../types';

export const StatsTable: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'TEST' | 'ODI' | 'T20I' | 'IPL' | 'U-19 TEST' | 'U-19 ODI'>('ALL');
  const [sortField, setSortField] = useState<keyof CareerStat>('runs');
  const [sortAsc, setSortAsc] = useState(false);

  const statsData: CareerStat[] = [
    {
      format: 'Test',
      matches: 123,
      runs: 9230,
      average: 46.85,
      strikeRate: 55.58,
      highScore: '254',
      centuries: 30,
      fifties: 31,
      fours: '1027',
      sixes: '30',
      catches: 121,
      stumpings: 0,
    },
    {
      format: 'ODI',
      matches: 314,
      runs: 14941,
      average: 58.59,
      strikeRate: 93.95,
      highScore: '183',
      centuries: 54,
      fifties: 79,
      fours: '1389',
      sixes: '171',
      catches: 169,
      stumpings: 0,
    },
    {
      format: 'T20I',
      matches: 125,
      runs: 4188,
      average: 48.70,
      strikeRate: 137.04,
      highScore: '122',
      centuries: 1,
      fifties: 38,
      fours: '369',
      sixes: '124',
      catches: 54,
      stumpings: 0,
    },
    {
      format: 'IPL',
      matches: 252,
      runs: 9336,
      average: 38.67,
      strikeRate: 131.97,
      highScore: '113',
      centuries: 8,
      fifties: 55,
      fours: '700+',
      sixes: '270+',
      catches: 110,
      stumpings: 0,
    },
    {
      format: 'U-19 Test',
      matches: 12,
      runs: 932,
      average: 51.78,
      strikeRate: '-',
      highScore: '144',
      centuries: 3,
      fifties: 6,
      fours: '-',
      sixes: '-',
      catches: 15,
      stumpings: 0,
    },
    {
      format: 'U-19 ODI',
      matches: 28,
      runs: 978,
      average: 46.57,
      strikeRate: 85.56,
      highScore: '100',
      centuries: 1,
      fifties: 6,
      fours: '93',
      sixes: '14',
      catches: 16,
      stumpings: 0,
    },
  ];

  const filteredStats = statsData.filter((s) => {
    if (activeFilter === 'ALL') return true;
    return s.format.toUpperCase().includes(activeFilter.replace('-', ' '));
  });

  const sortedStats = [...filteredStats].sort((a, b) => {
    const valA = typeof a[sortField] === 'number' ? (a[sortField] as number) : 0;
    const valB = typeof b[sortField] === 'number' ? (b[sortField] as number) : 0;
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
          <div class="inline-block px-3 py-1 border border-[#d3122a]/40 bg-[#d3122a]/10 text-[10px] font-bold text-[#d3122a] uppercase tracking-[0.2em] mb-3">
            <span class="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" /> Career Analytics
            </span>
          </div>
          <h2 class="text-4xl font-black text-white uppercase tracking-tight font-brand italic">
            Career Metrics
          </h2>
          <div class="h-1.5 w-24 bg-[#d3122a] mt-2"></div>
        </div>

        {/* Filter Pills & Timestamp */}
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
          <div class="flex flex-wrap items-center gap-1 bg-[#07090d] p-1 border border-white/5">
            {(['ALL', 'TEST', 'ODI', 'T20I', 'IPL', 'U-19 TEST', 'U-19 ODI'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                class={`px-3 py-1.5 text-[10px] font-bold uppercase transition-all tracking-wider ${
                  activeFilter === filter
                    ? 'bg-[#d3122a] text-white shadow-md shadow-[#d3122a]/30'
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <p class="text-white/30 text-[10px] font-mono uppercase tracking-[0.2em] flex items-center gap-1 self-end sm:self-center">
            Last Update: July 2026
          </p>
        </div>
      </div>

      {/* Stats Table Container */}
      <div class="overflow-x-auto border border-white/5 bg-[#07090d]">
        <table class="w-full text-left text-xs border-collapse">
          <thead class="bg-[#05070a] text-white/40 uppercase text-[10px] tracking-[0.2em] font-bold border-b border-white/5 select-none">
            <tr>
              <th
                onClick={() => handleSort('format')}
                class="px-6 py-4 cursor-pointer hover:text-[#d3122a] transition-colors"
              >
                Format
              </th>
              <th
                onClick={() => handleSort('matches')}
                class="px-5 py-4 cursor-pointer hover:text-[#d3122a] transition-colors"
              >
                <div class="flex items-center gap-1">
                  Mat
                  {sortField === 'matches' && (sortAsc ? <ChevronUp className="w-3 h-3 text-[#d3122a]" /> : <ChevronDown className="w-3 h-3 text-[#d3122a]" />)}
                </div>
              </th>
              <th
                onClick={() => handleSort('runs')}
                class="px-5 py-4 cursor-pointer hover:text-[#d3122a] transition-colors"
              >
                <div class="flex items-center gap-1">
                  Runs
                  {sortField === 'runs' && (sortAsc ? <ChevronUp className="w-3 h-3 text-[#d3122a]" /> : <ChevronDown className="w-3 h-3 text-[#d3122a]" />)}
                </div>
              </th>
              <th
                onClick={() => handleSort('average')}
                class="px-5 py-4 cursor-pointer hover:text-[#d3122a] transition-colors"
              >
                <div class="flex items-center gap-1">
                  Avg
                  {sortField === 'average' && (sortAsc ? <ChevronUp className="w-3 h-3 text-[#d3122a]" /> : <ChevronDown className="w-3 h-3 text-[#d3122a]" />)}
                </div>
              </th>
              <th class="px-5 py-4">SR</th>
              <th class="px-5 py-4">HS</th>
              <th
                onClick={() => handleSort('centuries')}
                class="px-5 py-4 text-[#d3122a] font-bold cursor-pointer hover:text-white transition-colors"
              >
                <div class="flex items-center gap-1">
                  100s / 50s
                  {sortField === 'centuries' && (sortAsc ? <ChevronUp className="w-3 h-3 text-[#d3122a]" /> : <ChevronDown className="w-3 h-3 text-[#d3122a]" />)}
                </div>
              </th>
              <th class="px-5 py-4">4s / 6s</th>
              <th class="px-5 py-4">Ct</th>
              <th class="px-5 py-4">St</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-white/5 font-medium">
            {sortedStats.map((row) => (
              <tr
                key={row.format}
                class="hover:bg-white/[0.02] transition-colors group cursor-default"
              >
                <td class="px-6 py-5 font-black text-white group-hover:text-[#d3122a] transition-colors flex items-center gap-2">
                  <span class="w-1.5 h-5 bg-[#d3122a]"></span>
                  {row.format}
                </td>
                <td class="px-5 py-5 text-white/80 font-mono">{row.matches}</td>
                <td class="px-5 py-5 font-black text-white font-mono text-base">{row.runs.toLocaleString()}</td>
                <td class="px-5 py-5 text-white/80 font-mono">{typeof row.average === 'number' ? row.average.toFixed(2) : row.average}</td>
                <td class="px-5 py-5 text-white/80 font-mono">{typeof row.strikeRate === 'number' ? row.strikeRate.toFixed(2) : row.strikeRate}</td>
                <td class="px-5 py-5 text-[#d3122a] font-mono font-bold">{row.highScore}</td>
                <td class="px-5 py-5 text-[#d3122a] font-black font-mono">
                  {row.centuries} / {row.fifties}
                </td>
                <td class="px-5 py-5 text-white/80 font-mono">
                  {row.fours && row.sixes ? `${row.fours} / ${row.sixes}` : '-'}
                </td>
                <td class="px-5 py-5 text-white/80 font-mono">{row.catches ?? '-'}</td>
                <td class="px-5 py-5 text-white/40 font-mono">{row.stumpings ?? 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Signature Geometric Callout Strip */}
      <div class="mt-8 p-8 bg-[#d3122a] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl shadow-[#d3122a]/20">
        <div class="flex items-center gap-4">
          <Award className="w-6 h-6 shrink-0" />
          <div>
            <h3 class="text-[10px] font-black uppercase tracking-[0.4em] text-white/70">Career Summary</h3>
            <p class="text-base font-bold leading-tight uppercase italic mt-0.5">
              28,359 International Runs | 9,336 IPL Runs | 85 Intl Centuries | 148 Fifties
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
