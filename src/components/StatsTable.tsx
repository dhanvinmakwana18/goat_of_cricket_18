import React, { useState } from 'react';
import { TrendingUp, ChevronDown, ChevronUp, Calendar } from 'lucide-react';
import { CareerStat } from '../types';
import { ICC_KOHLI_YEARLY_STATS, YearlyStat } from '../data/iccKohliData';

export const StatsTable: React.FC = () => {
  const [viewMode, setViewMode] = useState<'OVERALL' | 'YEARLY'>('OVERALL');
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'TEST' | 'ODI' | 'T20I' | 'IPL' | 'U-19 TEST' | 'U-19 ODI'>('ALL');
  const [selectedYearlyFormat, setSelectedYearlyFormat] = useState<'Test' | 'ODI' | 'T20I' | 'YouthU19'>('ODI');
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

  const currentYearlyRows: YearlyStat[] = ICC_KOHLI_YEARLY_STATS[selectedYearlyFormat] || [];

  return (
    <section id="stats" className="max-w-7xl mx-auto px-6 lg:px-12 py-16 scroll-mt-20">
      {/* Table Header Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
        <div>
          <div className="inline-block px-3 py-1 border border-[#d3122a]/40 bg-[#d3122a]/10 text-[10px] font-bold text-[#d3122a] uppercase tracking-[0.2em] mb-3">
            <span className="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" /> Official ICC Career Analytics
            </span>
          </div>
          <h2 className="text-4xl font-black text-white uppercase tracking-tight font-brand italic">
            Career Metrics & Yearly Stats
          </h2>
          <div className="h-1.5 w-24 bg-[#d3122a] mt-2"></div>
        </div>

        {/* Mode Selector & Filter Pills */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
          {/* Toggle between Overall & Year-by-Year */}
          <div className="flex bg-[#05070a] p-1 border border-white/10 shrink-0">
            <button
              onClick={() => setViewMode('OVERALL')}
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-colors cursor-pointer ${
                viewMode === 'OVERALL'
                  ? 'bg-[#d3122a] text-white'
                  : 'text-white/40 hover:text-white'
              }`}
            >
              Overall Totals
            </button>
            <button
              onClick={() => setViewMode('YEARLY')}
              className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-colors cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'YEARLY'
                  ? 'bg-[#d3122a] text-white'
                  : 'text-white/40 hover:text-white'
              }`}
            >
              <Calendar className="w-3 h-3" /> Yearly Breakdown
            </button>
          </div>

          {viewMode === 'OVERALL' ? (
            <div className="flex flex-wrap items-center gap-1 bg-[#07090d] p-1 border border-white/5">
              {(['ALL', 'TEST', 'ODI', 'T20I', 'IPL', 'U-19 TEST', 'U-19 ODI'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 text-[10px] font-bold uppercase transition-all tracking-wider cursor-pointer ${
                    activeFilter === filter
                      ? 'bg-[#d3122a] text-white shadow-md shadow-[#d3122a]/30'
                      : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-1 bg-[#07090d] p-1 border border-white/5">
              {(['ODI', 'Test', 'T20I', 'YouthU19'] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={() => setSelectedYearlyFormat(fmt)}
                  className={`px-3 py-1.5 text-[10px] font-bold uppercase transition-all tracking-wider cursor-pointer ${
                    selectedYearlyFormat === fmt
                      ? 'bg-[#d3122a] text-white shadow-md shadow-[#d3122a]/30'
                      : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {fmt === 'YouthU19' ? 'Youth U-19' : fmt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* OVERALL STATS TABLE */}
      {viewMode === 'OVERALL' && (
        <div className="overflow-x-auto border border-white/5 bg-[#07090d]">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#05070a] text-white/40 uppercase text-[10px] tracking-[0.2em] font-bold border-b border-white/5 select-none">
              <tr>
                <th
                  onClick={() => handleSort('format')}
                  className="px-6 py-4 cursor-pointer hover:text-[#d3122a] transition-colors"
                >
                  Format
                </th>
                <th
                  onClick={() => handleSort('matches')}
                  className="px-5 py-4 cursor-pointer hover:text-[#d3122a] transition-colors"
                >
                  <div className="flex items-center gap-1">
                    Mat
                    {sortField === 'matches' && (sortAsc ? <ChevronUp className="w-3 h-3 text-[#d3122a]" /> : <ChevronDown className="w-3 h-3 text-[#d3122a]" />)}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('runs')}
                  className="px-5 py-4 cursor-pointer hover:text-[#d3122a] transition-colors"
                >
                  <div className="flex items-center gap-1">
                    Runs
                    {sortField === 'runs' && (sortAsc ? <ChevronUp className="w-3 h-3 text-[#d3122a]" /> : <ChevronDown className="w-3 h-3 text-[#d3122a]" />)}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('average')}
                  className="px-5 py-4 cursor-pointer hover:text-[#d3122a] transition-colors"
                >
                  <div className="flex items-center gap-1">
                    Avg
                    {sortField === 'average' && (sortAsc ? <ChevronUp className="w-3 h-3 text-[#d3122a]" /> : <ChevronDown className="w-3 h-3 text-[#d3122a]" />)}
                  </div>
                </th>
                <th className="px-5 py-4">SR</th>
                <th className="px-5 py-4">HS</th>
                <th
                  onClick={() => handleSort('centuries')}
                  className="px-5 py-4 text-[#d3122a] font-bold cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-1">
                    100s / 50s
                    {sortField === 'centuries' && (sortAsc ? <ChevronUp className="w-3 h-3 text-[#d3122a]" /> : <ChevronDown className="w-3 h-3 text-[#d3122a]" />)}
                  </div>
                </th>
                <th className="px-5 py-4">4s / 6s</th>
                <th className="px-5 py-4">Ct</th>
                <th className="px-5 py-4">St</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5 font-medium">
              {sortedStats.map((row) => (
                <tr
                  key={row.format}
                  className="hover:bg-white/[0.02] transition-colors group cursor-default"
                >
                  <td className="px-6 py-5 font-black text-white group-hover:text-[#d3122a] transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-5 bg-[#d3122a]"></span>
                    {row.format}
                  </td>
                  <td className="px-5 py-5 text-white/80 font-mono">{row.matches}</td>
                  <td className="px-5 py-5 font-black text-white font-mono text-base">{row.runs.toLocaleString()}</td>
                  <td className="px-5 py-5 text-white/80 font-mono">{typeof row.average === 'number' ? row.average.toFixed(2) : row.average}</td>
                  <td className="px-5 py-5 text-white/80 font-mono">{typeof row.strikeRate === 'number' ? row.strikeRate.toFixed(2) : row.strikeRate}</td>
                  <td className="px-5 py-5 text-[#d3122a] font-mono font-bold">{row.highScore}</td>
                  <td className="px-5 py-5 text-[#d3122a] font-black font-mono">
                    {row.centuries} / {row.fifties}
                  </td>
                  <td className="px-5 py-5 text-white/80 font-mono">
                    {row.fours && row.sixes ? `${row.fours} / ${row.sixes}` : '-'}
                  </td>
                  <td className="px-5 py-5 text-white/80 font-mono">{row.catches ?? '-'}</td>
                  <td className="px-5 py-5 text-white/40 font-mono">{row.stumpings ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* YEARLY STATS TABLE */}
      {viewMode === 'YEARLY' && (
        <div className="overflow-x-auto border border-white/5 bg-[#07090d]">
          <div className="p-4 bg-[#05070a] border-b border-white/5 flex items-center justify-between">
            <h3 className="text-sm font-black text-white uppercase font-brand tracking-wider">
              {selectedYearlyFormat === 'YouthU19' ? 'Youth U-19' : selectedYearlyFormat} Annual Official ICC Breakdown
            </h3>
            <span className="text-[10px] font-mono text-[#d3122a] font-bold uppercase tracking-widest bg-[#d3122a]/10 px-2.5 py-1 border border-[#d3122a]/20">
              {currentYearlyRows.length} Calendar Years Tracked
            </span>
          </div>

          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-[#05070a] text-white/40 uppercase text-[10px] tracking-[0.2em] font-bold border-b border-white/5 select-none">
              <tr>
                <th className="px-6 py-4">Year</th>
                <th className="px-5 py-4">Mat</th>
                <th className="px-5 py-4 text-white font-bold">Runs</th>
                <th className="px-5 py-4">Avg</th>
                <th className="px-5 py-4">SR</th>
                <th className="px-5 py-4 text-[#d3122a]">HS</th>
                <th className="px-5 py-4 text-amber-400">100s / 50s</th>
                <th className="px-5 py-4">4s / 6s</th>
                <th className="px-5 py-4">Ct</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5 font-medium">
              {currentYearlyRows.map((row) => (
                <tr
                  key={row.year}
                  className="hover:bg-white/[0.02] transition-colors group cursor-default"
                >
                  <td className="px-6 py-4 font-black text-white group-hover:text-[#d3122a] font-mono text-sm flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-[#d3122a]"></span>
                    {row.year}
                  </td>
                  <td className="px-5 py-4 text-white/80 font-mono">{row.matches}</td>
                  <td className="px-5 py-4 font-black text-white font-mono text-base">{row.runs.toLocaleString()}</td>
                  <td className="px-5 py-4 text-white/80 font-mono">{row.avg.toFixed(2)}</td>
                  <td className="px-5 py-4 text-white/80 font-mono">{row.sr ? row.sr.toFixed(2) : '-'}</td>
                  <td className="px-5 py-4 text-[#d3122a] font-mono font-bold">{row.hs}</td>
                  <td className="px-5 py-4 text-amber-400 font-black font-mono">
                    {row.hundredsFifties}
                  </td>
                  <td className="px-5 py-4 text-white/80 font-mono">{row.foursSixes}</td>
                  <td className="px-5 py-4 text-white/80 font-mono">{row.catches}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

