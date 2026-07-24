import React, { useState } from 'react';
import { Calendar, Trophy, Flame, Shield, Award, Star, ExternalLink, ChevronRight, Sparkles, HeartHandshake } from 'lucide-react';
import worldCupTrophyImg from '../assets/images/icc_world_cup_trophy_1784831119282.jpg';

export interface TimelineEvent {
  year: string;
  title: string;
  category: 'World Cup' | 'RCB / IPL' | 'Captaincy' | 'Milestone';
  subtitle: string;
  description: string;
  statsHighlight?: string;
  image?: string;
  imageCaption?: string;
  badge: string;
  isFeatured?: boolean;
}

export const CareerTimeline: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const events: TimelineEvent[] = [
    {
      year: '2008',
      title: 'U-19 World Cup Glory & RCB Draft',
      category: 'RCB / IPL',
      subtitle: 'The Beginning of a Legend',
      description: 'Captained Team India to the ICC U-19 World Cup title in Malaysia. Drafted by Royal Challengers Bengaluru (RCB) in the inaugural IPL draft — starting a lifelong bond with RCB.',
      statsHighlight: 'U-19 World Cup Captain & Winner',
      badge: 'RCB Drafted 2008',
    },
    {
      year: '2011',
      title: 'ICC Cricket World Cup Triumph',
      category: 'World Cup',
      subtitle: 'World Champion at Wankhede Stadium',
      description: 'Scored a vital 35 runs in the World Cup Final alongside Gautam Gambhir, helping India lift the trophy after 28 years. Famous quote: "Sachin Tendulkar has carried the burden of the nation for 21 years. It is time we carried him on our shoulders."',
      statsHighlight: '282 Runs in World Cup 2011',
      image: worldCupTrophyImg,
      imageCaption: '2011 ICC Cricket World Cup Champion',
      badge: 'World Champion',
      isFeatured: true,
    },
    {
      year: '2013',
      title: 'ICC Champions Trophy Victory & RCB Captain',
      category: 'Captaincy',
      subtitle: 'Dominance in England',
      description: 'Top scorer for India in the rainy Champions Trophy final against England at Edgbaston (43 off 34 balls). Appointed full-time captain of Royal Challengers Bengaluru (RCB).',
      statsHighlight: 'RCB Full-Time Captain',
      badge: 'Champions Trophy Winner',
    },
    {
      year: '2014',
      title: 'Adelaide Test Masterclass & Test Captaincy',
      category: 'Captaincy',
      subtitle: 'Redefining Indian Test Cricket',
      description: 'Took over Test Captaincy in Adelaide, scoring twin centuries (115 & 141) in his captaincy debut match. Amassed 692 runs in 4 Test matches in Australia.',
      statsHighlight: '692 Runs in Australia Series',
      badge: 'Test Captain Debut',
    },
    {
      year: '2016',
      title: 'Legendary 973 Runs IPL Season for RCB',
      category: 'RCB / IPL',
      subtitle: 'The Greatest Individual T20 Season in History',
      description: 'Shattered all IPL records by scoring 973 runs in 16 matches for RCB with 4 centuries, taking RCB to the IPL Final. Also named Player of the Tournament in 2016 T20 World Cup.',
      statsHighlight: '973 Runs & 4 IPL 100s for RCB',
      badge: 'RCB Peak Season',
      isFeatured: true,
    },
    {
      year: '2018',
      title: 'Historic Test Victory in Australia & ICC Awards',
      category: 'Milestone',
      subtitle: 'Sir Garfield Sobers Trophy Winner',
      description: 'Led India to a maiden Test series win on Australian soil (2-1). Cleaned up at the ICC Awards: Cricketer of the Year, Test Player of the Year, and ODI Player of the Year.',
      statsHighlight: '593 Test Runs in England',
      badge: 'ICC Triple Crown',
    },
    {
      year: '2022',
      title: 'Miracle at the MCG (82* vs Pakistan)',
      category: 'World Cup',
      subtitle: 'The Shot of the Century vs Haris Rauf',
      description: 'Played an unmatched 82* off 53 balls against Pakistan in front of 90,000+ fans at Melbourne Cricket Ground, pulling off an impossible T20 World Cup chase.',
      statsHighlight: '82* off 53 (MCG T20 WC)',
      badge: 'Innings of the Century',
      isFeatured: true,
    },
    {
      year: '2023',
      title: '50th ODI Century — World Record',
      category: 'Milestone',
      subtitle: 'Surpassing Sachin Tendulkar',
      description: 'Scored his 50th ODI Century in the World Cup Semi-Final vs New Zealand at Wankhede, bowing to Sachin Tendulkar in the stands. Player of the Tournament with 765 runs.',
      statsHighlight: '765 Runs in CWC23 (World Record)',
      badge: '50 ODI Centuries',
      isFeatured: true,
    },
    {
      year: '2024',
      title: 'ICC T20 World Cup Champion in Barbados',
      category: 'World Cup',
      subtitle: 'Player of the Match in T20 WC Final',
      description: 'Scored a masterclass 76 off 59 balls in the T20 World Cup Final against South Africa, anchoring India to world championship glory before retiring from T20Is at the top.',
      statsHighlight: 'T20 WC Final MoM (76 Runs)',
      image: worldCupTrophyImg,
      imageCaption: '2011 & 2024 ICC World Champion',
      badge: 'World Champion 2024',
      isFeatured: true,
    },
  ];

  const filteredEvents = events.filter(
    (e) => selectedCategory === 'ALL' || e.category === selectedCategory
  );

  return (
    <section id="timeline" class="max-w-7xl mx-auto px-6 lg:px-12 py-16 scroll-mt-20 border-t border-white/5">
      {/* Section Title */}
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <div class="inline-block px-3 py-1 border border-[#d3122a]/40 bg-[#d3122a]/10 text-[10px] font-bold text-[#d3122a] uppercase tracking-[0.2em] mb-3">
            <span class="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> Career Chronology
            </span>
          </div>
          <h2 class="text-4xl font-black text-white uppercase tracking-tight font-brand italic">
            Legendary Career Timeline
          </h2>
          <div class="h-1.5 w-24 bg-[#d3122a] mt-2"></div>
        </div>

        {/* Filter Categories */}
        <div class="flex flex-wrap items-center gap-1.5 bg-[#0a0c12] p-1.5 border border-white/10">
          {(['ALL', 'World Cup', 'RCB / IPL', 'Captaincy', 'Milestone'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              class={`px-3 py-1.5 text-[10px] font-bold uppercase transition-all tracking-wider ${
                selectedCategory === cat
                  ? 'bg-[#d3122a] text-white shadow-md shadow-[#d3122a]/30'
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured 2011 ICC World Cup Hero Showcase Card */}
      <div class="mb-12 bg-gradient-to-r from-[#0a0c12] via-[#140608] to-[#0a0c12] border-2 border-[#d3122a]/40 p-6 md:p-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-[#d3122a]/10">
        <div class="absolute -right-20 -bottom-20 w-80 h-80 bg-[#d3122a]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div class="space-y-4 max-w-2xl z-10 text-center md:text-left">
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-[#d3122a] text-white text-[10px] font-black uppercase tracking-widest">
            <Trophy className="w-3.5 h-3.5" /> Pinnacle Landmark
          </div>
          <h3 class="text-3xl md:text-4xl font-black text-white font-brand italic uppercase leading-tight">
            2011 ICC Cricket World Cup Champion
          </h3>
          <p class="text-xs text-white/70 leading-relaxed font-light">
            At just 22 years old, Virat Kohli announced himself on cricket's grandest stage. Scoring a crucial 35 runs under extreme pressure in the final against Sri Lanka at Wankhede, he etched his name in history as a World Champion.
          </p>
          <div class="flex flex-wrap gap-3 pt-2 justify-center md:justify-start">
            <span class="text-[10px] font-mono font-bold text-[#d3122a] bg-[#d3122a]/10 px-3 py-1 border border-[#d3122a]/30">
              Wankhede Stadium, Mumbai
            </span>
            <span class="text-[10px] font-mono font-bold text-amber-400 bg-amber-400/10 px-3 py-1 border border-amber-400/30">
              April 2, 2011
            </span>
          </div>
        </div>

        {/* World Cup Trophy Image Display with Caption */}
        <div class="shrink-0 text-center z-10 group">
          <div class="w-48 h-48 md:w-56 md:h-56 bg-black border-2 border-[#d3122a] p-2 relative shadow-xl overflow-hidden group-hover:border-amber-400 transition-colors">
            <img
              src={worldCupTrophyImg}
              alt="2011 ICC Cricket World Cup Champion Trophy"
              class="w-full h-full object-contain filter drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
          <p class="text-[11px] font-black text-amber-400 uppercase tracking-widest mt-3 font-brand">
            2011 ICC Cricket World Cup Champion
          </p>
        </div>
      </div>

      {/* Main Chronological Timeline Stream */}
      <div class="relative border-l-2 border-[#d3122a]/40 ml-4 md:ml-8 pl-6 md:pl-10 space-y-10">
        {filteredEvents.map((event, idx) => (
          <div key={idx} class="relative group">
            {/* Timeline Node Dot */}
            <div class="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 bg-[#d3122a] border-4 border-[#05070a] group-hover:scale-150 group-hover:bg-amber-400 transition-all"></div>

            <div class={`bg-[#0a0c12] border p-6 md:p-8 space-y-4 transition-all duration-300 ${
              event.isFeatured ? 'border-[#d3122a]/50 bg-gradient-to-r from-[#0a0c12] via-[#100709] to-[#0a0c12]' : 'border-white/5 hover:border-[#d3122a]/30'
            }`}>
              {/* Card Header */}
              <div class="flex flex-wrap items-center justify-between gap-2">
                <div class="flex items-center gap-3">
                  <span class="text-lg md:text-xl font-black font-brand text-[#d3122a] bg-[#d3122a]/10 px-3 py-1 border border-[#d3122a]/30">
                    {event.year}
                  </span>
                  <span class="text-[10px] font-bold uppercase tracking-widest text-amber-400 bg-amber-400/10 px-2.5 py-1 border border-amber-400/20">
                    {event.category}
                  </span>
                </div>
                <span class="text-[10px] uppercase font-mono text-white/40 tracking-widest bg-white/5 px-2.5 py-1 border border-white/10">
                  {event.badge}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 class="text-xl md:text-2xl font-black text-white group-hover:text-[#d3122a] transition-colors font-brand italic">
                  {event.title}
                </h3>
                <p class="text-xs text-white/40 font-mono mt-0.5">{event.subtitle}</p>
              </div>

              {/* Description */}
              <p class="text-xs text-white/70 leading-relaxed font-light">
                {event.description}
              </p>

              {/* Featured Trophy Image Inside Timeline Card if specified */}
              {event.image && (
                <div class="pt-3 border-t border-white/5 flex flex-col sm:flex-row items-center gap-4 bg-black/60 p-4 border border-[#d3122a]/30">
                  <img
                    src={event.image}
                    alt={event.imageCaption || 'ICC Trophy'}
                    class="w-20 h-20 object-contain shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span class="text-[10px] font-bold text-[#d3122a] uppercase tracking-widest block">
                      Iconic Trophy
                    </span>
                    <p class="text-sm font-black text-amber-400 font-brand mt-0.5">
                      {event.imageCaption || '2011 ICC Cricket World Cup Champion'}
                    </p>
                  </div>
                </div>
              )}

              {/* Stats Highlight Footer */}
              {event.statsHighlight && !event.image && (
                <div class="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <span class="text-[10px] text-white/40 uppercase font-mono">Highlight Benchmark</span>
                  <span class="text-xs font-black text-[#d3122a] font-brand tracking-wide">
                    {event.statsHighlight}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
