import React, { useState } from 'react';
import { Award, Zap, Target, Star, Flame, ChevronRight } from 'lucide-react';

interface CenturyRecord {
  opponent: string;
  score: string;
  format: 'Test' | 'ODI' | 'T20I';
  venue: string;
  year: string;
}

export const RecordsShowcase: React.FC = () => {
  const [selectedFormat, setSelectedFormat] = useState<'ALL' | 'Test' | 'ODI' | 'T20I'>('ALL');

  const notableCenturies: CenturyRecord[] = [
    { opponent: 'New Zealand', score: '117 (113)', format: 'ODI', venue: 'Wankhede, Mumbai', year: '2023 (50th ODI 100)' },
    { opponent: 'Pakistan', score: '183 (148)', format: 'ODI', venue: 'Dhaka', year: '2012 (Career High)' },
    { opponent: 'South Africa', score: '254* (336)', format: 'Test', venue: 'Pune', year: '2019 (7th Double 100)' },
    { opponent: 'Afghanistan', score: '122* (61)', format: 'T20I', venue: 'Dubai', year: '2022 (First T20I 100)' },
    { opponent: 'Australia', score: '141 (175)', format: 'Test', venue: 'Adelaide', year: '2014 (Captains Special)' },
    { opponent: 'England', score: '149 (225)', format: 'Test', venue: 'Edgbaston', year: '2018 (Masterclass)' },
    { opponent: 'Sri Lanka', score: '166* (110)', format: 'ODI', venue: 'Thiruvananthapuram', year: '2023' },
    { opponent: 'Australia', score: '186 (364)', format: 'Test', venue: 'Ahmedabad', year: '2023' },
  ];

  const filteredCenturies = notableCenturies.filter(c => selectedFormat === 'ALL' || c.format === selectedFormat);

  return (
    <section id="records" class="max-w-7xl mx-auto px-6 lg:px-12 py-16 border-t border-white/5 scroll-mt-20">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <div class="inline-block px-3 py-1 border border-[#d3122a]/40 bg-[#d3122a]/10 text-[10px] font-bold text-[#d3122a] uppercase tracking-[0.2em] mb-3">
            <span class="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" /> Hall of Fame
            </span>
          </div>
          <h2 class="text-4xl font-black text-white uppercase tracking-tight font-brand italic">
            Iconic Innings & Records
          </h2>
          <div class="h-1.5 w-24 bg-[#d3122a] mt-2"></div>
        </div>

        {/* Format Filter */}
        <div class="flex items-center gap-1 bg-[#07090d] p-1 border border-white/5">
          {(['ALL', 'Test', 'ODI', 'T20I'] as const).map(fmt => (
            <button
              key={fmt}
              onClick={() => setSelectedFormat(fmt)}
              class={`px-3 py-1.5 text-[10px] font-bold uppercase transition-all tracking-wider ${
                selectedFormat === fmt
                  ? 'bg-[#d3122a] text-white shadow-md shadow-[#d3122a]/30'
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              {fmt}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Famous Innings */}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCenturies.map((c, i) => (
          <div key={i} class="bg-[#07090d] border border-white/5 p-6 space-y-4 relative group hover:border-[#d3122a]/50 transition-all">
            <div class="flex items-center justify-between">
              <span class="text-[9px] font-mono font-bold uppercase px-2.5 py-1 bg-[#d3122a]/10 text-[#d3122a] border border-[#d3122a]/20">
                {c.format}
              </span>
              <span class="text-[10px] text-white/30 font-mono">{c.year}</span>
            </div>

            <div>
              <p class="text-[10px] text-white/40 uppercase font-mono tracking-widest">vs {c.opponent}</p>
              <p class="text-3xl font-black text-[#d3122a] mt-1 font-brand">{c.score}</p>
            </div>

            <div class="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-white/50">
              <span class="truncate">{c.venue}</span>
              <Flame className="w-3.5 h-3.5 text-[#d3122a] group-hover:scale-125 transition-transform shrink-0" />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Record Callout Cards */}
      <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-[#07090d] border border-white/5 p-6 border-l-4 border-l-[#d3122a]">
          <h4 class="text-[10px] uppercase font-mono text-[#d3122a] font-bold mb-1">Fastest to 10,000 ODI Runs</h4>
          <p class="text-2xl font-black text-white font-brand">205 Innings</p>
          <p class="text-xs text-white/50 mt-2 font-light">Broke Sachin Tendulkar's record (259 innings) by 54 innings.</p>
        </div>

        <div class="bg-[#07090d] border border-white/5 p-6 border-l-4 border-l-[#d3122a]">
          <h4 class="text-[10px] uppercase font-mono text-[#d3122a] font-bold mb-1">Most Double Centuries by Indian in Tests</h4>
          <p class="text-2xl font-black text-white font-brand">7 Double 100s</p>
          <p class="text-xs text-white/50 mt-2 font-light">Surpassed Virender Sehwag and Sachin Tendulkar (6 each).</p>
        </div>

        <div class="bg-[#07090d] border border-white/5 p-6 border-l-4 border-l-[#d3122a]">
          <h4 class="text-[10px] uppercase font-mono text-[#d3122a] font-bold mb-1">Most Runs in Single IPL Season (RCB)</h4>
          <p class="text-2xl font-black text-white font-brand">973 Runs (2016)</p>
          <p class="text-xs text-white/50 mt-2 font-light">Included 4 centuries in a single tournament season for RCB.</p>
        </div>
      </div>
    </section>
  );
};
