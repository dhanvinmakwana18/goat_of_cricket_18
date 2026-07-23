import React, { useState } from 'react';
import { BookOpen, Trophy, Shield, Star, Calendar, Flag, Award, Sparkles, Quote } from 'lucide-react';
import { CareerHighlight, MajorHonour } from '../types';

export const BiographySection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'journey' | 'timeline' | 'captaincy'>('journey');

  const majorHonours: MajorHonour[] = [
    {
      title: 'ICC Player of the Decade',
      year: '2011–2020',
      category: 'Global ICC Award',
      description: 'Named Sir Garfield Sobers Award winner for ICC Male Cricketer of the Decade.',
    },
    {
      title: 'Most 100s in ODI Cricket (50 Centuries)',
      year: '2023',
      category: 'World Record',
      description: 'Broke Sachin Tendulkar’s long-standing record of 49 ODI centuries at Wankhede.',
    },
    {
      title: 'ICC Test Mace Captain (42 Months)',
      year: '2016–2020',
      category: 'Leadership',
      description: 'Led India to #1 Test Team ranking for 42 consecutive months.',
    },
    {
      title: 'Major Dhyan Chand Khel Ratna',
      year: '2018',
      category: 'National Award',
      description: 'India’s highest sporting honor awarded by the President of India.',
    },
    {
      title: 'Padma Shri Award',
      year: '2017',
      category: 'Civilian Honour',
      description: 'Fourth-highest civilian award in the Republic of India.',
    },
    {
      title: 'Arjuna Award',
      year: '2013',
      category: 'National Award',
      description: 'Awarded for outstanding achievement in National sports.',
    },
  ];

  const timelineHighlights: CareerHighlight[] = [
    {
      year: '2008',
      title: 'U-19 World Cup Victory',
      description: 'Captained the India U-19 team to a memorable ICC World Cup victory in Malaysia.',
      badge: 'Young Prodigy',
    },
    {
      year: '2011',
      title: 'ICC ODI World Cup Champion',
      description: 'Scored crucial 35 runs in the final alongside Gautam Gambhir as India lifted the WC after 28 years.',
      badge: 'World Champion',
    },
    {
      year: '2014',
      title: 'Adelaide Test Masterclass',
      description: 'Scored Twin Centuries (115 & 141) in Adelaide in his very first Test as Captain.',
      badge: 'Test Captain',
    },
    {
      year: '2016',
      title: 'The Unstoppable Year',
      description: 'Scored 973 runs in a single IPL season with 4 centuries, along with Player of the Tournament in T20 WC.',
      badge: 'Peak Form',
    },
    {
      year: '2022',
      title: 'Miracle at the MCG (82* vs PAK)',
      description: 'Snatched victory from defeat with two unbelievable back-foot sixes against Haris Rauf at Melbourne.',
      badge: 'Iconic Match',
    },
    {
      year: '2023',
      title: '50th ODI Century Record',
      description: 'Broke the ultimate record by scoring 50th ODI Century in World Cup Semi-Final vs New Zealand.',
      badge: 'World Record',
    },
    {
      year: '2024',
      title: 'ICC T20 World Cup Champion',
      description: 'Player of the Match in the Final with 76 runs, crowning India as T20 World Champions.',
      badge: 'Legacy Crown',
    },
  ];

  return (
    <section id="about" class="max-w-7xl mx-auto px-6 lg:px-12 py-16 scroll-mt-20">
      {/* Section Header */}
      <div class="mb-12">
        <div class="inline-block px-3 py-1 border border-[#eab308]/30 bg-[#eab308]/5 text-[10px] font-bold text-[#eab308] uppercase tracking-[0.2em] mb-3">
          <span class="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" /> Biography & Legacy
          </span>
        </div>
        <h2 class="text-4xl font-black text-white uppercase tracking-tight font-brand italic">
          The King's Chronicles
        </h2>
        <div class="h-1.5 w-24 bg-[#eab308] mt-2"></div>
      </div>

      {/* Tabs */}
      <div class="flex items-center gap-1 mb-10 border-b border-white/5 pb-4">
        <button
          onClick={() => setActiveTab('journey')}
          class={`px-6 py-3 text-[10px] font-black uppercase transition-all flex items-center gap-2 tracking-widest ${
            activeTab === 'journey'
              ? 'bg-[#eab308] text-black'
              : 'text-white/40 hover:text-white bg-[#07090d] border border-white/5'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          The Journey
        </button>

        <button
          onClick={() => setActiveTab('timeline')}
          class={`px-6 py-3 text-[10px] font-black uppercase transition-all flex items-center gap-2 tracking-widest ${
            activeTab === 'timeline'
              ? 'bg-[#eab308] text-black'
              : 'text-white/40 hover:text-white bg-[#07090d] border border-white/5'
          }`}
        >
          <Calendar className="w-4 h-4" />
          Key Milestones
        </button>

        <button
          onClick={() => setActiveTab('captaincy')}
          class={`px-6 py-3 text-[10px] font-black uppercase transition-all flex items-center gap-2 tracking-widest ${
            activeTab === 'captaincy'
              ? 'bg-[#eab308] text-black'
              : 'text-white/40 hover:text-white bg-[#07090d] border border-white/5'
          }`}
        >
          <Shield className="w-4 h-4" />
          Captaincy Era
        </button>
      </div>

      {/* Tab 1: The Journey + Honours Grid */}
      {activeTab === 'journey' && (
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="bg-[#07090d] border border-white/5 p-8 sm:p-10 space-y-6">
            <h3 class="text-2xl font-black text-white uppercase tracking-tighter italic font-brand flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#eab308]" />
              The Journey
            </h3>
            <div class="space-y-4 text-white/70 leading-relaxed text-sm font-light">
              <p>
                Born in Delhi, Kohli's journey from a passionate teenager to the world's fittest cricketer is legendary. He rose to international spotlight in 2008 after leading the India U-19 team to a triumphant World Cup title in Malaysia.
              </p>
              <p>
                Under his leadership, India transformed into an aggressive, pace-bowling powerhouse in Test cricket, holding the <span class="text-white font-medium underline decoration-[#eab308]">ICC mace for 42 consecutive months</span>. He led India to historic Test series wins in Australia (2018–19).
              </p>
              <p>
                As a batsman, Kohli redefined run-chases in modern cricket. Earning the title of <span class="text-[#eab308] font-bold">"Chase Master"</span>, he holds the record for most ODI centuries in successful run chases (27) with an astonishing average over 88 in wins.
              </p>
            </div>

            <div class="pt-4 border-t border-white/5 bg-[#eab308]/5 p-5 border border-[#eab308]/20 flex items-start gap-3">
              <Quote className="w-6 h-6 text-[#eab308] shrink-0 mt-0.5" />
              <p class="text-xs text-white/80 italic font-light">
                "Self-belief and hard work will always earn you success. To me, cricket is not just a game; it is a passion that defines my entire standard of living."
              </p>
            </div>
          </div>

          <div class="bg-[#07090d] border border-white/5 p-8 sm:p-10">
            <h3 class="text-2xl font-black text-white mb-6 uppercase tracking-tighter italic font-brand flex items-center gap-3">
              <Award className="w-5 h-5 text-[#eab308]" />
              Major Honours
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {majorHonours.map((honour, idx) => (
                <div
                  key={idx}
                  class="p-4 bg-[#05070a] border border-white/5 hover:border-[#eab308]/40 transition-colors group"
                >
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-[9px] font-mono font-bold text-[#eab308] bg-[#eab308]/10 px-2 py-0.5 border border-[#eab308]/20">
                      {honour.year}
                    </span>
                    <span class="text-[9px] uppercase text-white/30 font-mono">
                      {honour.category}
                    </span>
                  </div>
                  <h4 class="text-xs font-bold text-white group-hover:text-[#eab308] transition-colors mt-2">
                    {honour.title}
                  </h4>
                  <p class="text-[11px] text-white/50 mt-1 line-clamp-2">
                    {honour.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Timeline Milestones */}
      {activeTab === 'timeline' && (
        <div class="relative border-l-2 border-[#eab308] ml-4 md:ml-8 pl-6 md:pl-10 space-y-8">
          {timelineHighlights.map((item, index) => (
            <div key={index} class="relative group">
              {/* Dot */}
              <div class="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 bg-[#eab308] border-4 border-[#05070a] group-hover:scale-150 transition-transform"></div>

              <div class="bg-[#07090d] border border-white/5 p-6 space-y-2">
                <div class="flex items-center justify-between">
                  <span class="text-[10px] font-mono font-bold text-[#eab308] bg-[#eab308]/10 px-3 py-1 border border-[#eab308]/20">
                    {item.year}
                  </span>
                  {item.badge && (
                    <span class="text-[9px] uppercase font-mono text-white/40 tracking-widest bg-[#05070a] px-2.5 py-1 border border-white/5">
                      {item.badge}
                    </span>
                  )}
                </div>
                <h4 class="text-base font-black text-white group-hover:text-[#eab308] transition-colors">
                  {item.title}
                </h4>
                <p class="text-xs text-white/70 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Captaincy Records */}
      {activeTab === 'captaincy' && (
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-[#07090d] border border-white/5 p-8 space-y-4">
            <div class="p-3 w-fit bg-[#eab308]/10 text-[#eab308] border border-[#eab308]/20">
              <Trophy className="w-6 h-6" />
            </div>
            <h4 class="text-lg font-black text-white font-brand">Test Captaincy Record</h4>
            <div class="space-y-2 text-xs text-white/70">
              <p><span class="text-white font-bold">Matches:</span> 68</p>
              <p><span class="text-[#eab308] font-bold">Won:</span> 40 (Most by Indian Captain)</p>
              <p><span class="text-white font-bold">Lost:</span> 17 | <span class="text-white font-bold">Drawn:</span> 11</p>
              <p><span class="text-[#eab308] font-bold">Win %:</span> 58.82%</p>
            </div>
            <p class="text-[10px] text-white/40 pt-3 border-t border-white/5 font-mono">
              Led India to historic 2-1 Test victory in Australia (2018-19).
            </p>
          </div>

          <div class="bg-[#07090d] border border-white/5 p-8 space-y-4">
            <div class="p-3 w-fit bg-[#eab308]/10 text-[#eab308] border border-[#eab308]/20">
              <Award className="w-6 h-6" />
            </div>
            <h4 class="text-lg font-black text-white font-brand">ODI Captaincy Record</h4>
            <div class="space-y-2 text-xs text-white/70">
              <p><span class="text-white font-bold">Matches:</span> 95</p>
              <p><span class="text-[#eab308] font-bold">Won:</span> 65</p>
              <p><span class="text-white font-bold">Lost:</span> 27 | <span class="text-white font-bold">Tied/NR:</span> 3</p>
              <p><span class="text-[#eab308] font-bold">Win %:</span> 70.43%</p>
            </div>
            <p class="text-[10px] text-white/40 pt-3 border-t border-white/5 font-mono">
              Series victories in South Africa, Australia, and New Zealand.
            </p>
          </div>

          <div class="bg-[#07090d] border border-white/5 p-8 space-y-4">
            <div class="p-3 w-fit bg-[#eab308]/10 text-[#eab308] border border-[#eab308]/20">
              <Flag className="w-6 h-6" />
            </div>
            <h4 class="text-lg font-black text-white font-brand">T20I Captaincy Record</h4>
            <div class="space-y-2 text-xs text-white/70">
              <p><span class="text-white font-bold">Matches:</span> 50</p>
              <p><span class="text-[#eab308] font-bold">Won:</span> 30</p>
              <p><span class="text-white font-bold">Lost:</span> 16 | <span class="text-white font-bold">Tied/NR:</span> 4</p>
              <p><span class="text-[#eab308] font-bold">Win %:</span> 64.58%</p>
            </div>
            <p class="text-[10px] text-white/40 pt-3 border-t border-white/5 font-mono">
              First Asian captain to win T20I series in SENA countries.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
