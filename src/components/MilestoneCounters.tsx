import React, { useState } from 'react';
import { Trophy, Target, Award, Flame, Info, X } from 'lucide-react';

interface MilestoneDetail {
  id: string;
  title: string;
  value: string;
  subtitle: string;
  highlights: string[];
  description: string;
}

export const MilestoneCounters: React.FC = () => {
  const [activeModal, setActiveModal] = useState<MilestoneDetail | null>(null);

  const milestones: (MilestoneDetail & { isGold?: boolean })[] = [
    {
      id: 'ipl-runs',
      title: 'IPL Runs (RCB)',
      value: '9,336',
      subtitle: 'All-Time Highest Scorer',
      isGold: true,
      description: 'Virat Kohli is the undisputed leading run-scorer in Indian Premier League (IPL) history with 9,336 runs exclusively for Royal Challengers Bengaluru.',
      highlights: [
        '9,336 IPL Runs (All-Time Tournament Record)',
        '973 Runs in a Single IPL Season (2016 World Record)',
        '8 IPL Centuries for Royal Challengers Bengaluru',
        '55 IPL Half-Centuries with high score of 113'
      ]
    },
    {
      id: 'intl-runs',
      title: 'Intl Runs',
      value: '28,359',
      subtitle: 'Across all 3 formats',
      description: 'Virat Kohli has scored 28,359 international runs across Test (9,230), ODI (14,941), and T20I (4,188) formats.',
      highlights: [
        '14,941 ODI Runs with 54 centuries (World Record)',
        '9,230 Test Runs with 30 centuries & 254* high score',
        '4,188 T20I Runs with 38 fifties & T20 World Cup Champion',
        'Fastest player in cricket history to 20k and 25k international runs'
      ]
    },
    {
      id: 'total-100s',
      title: 'Total 100s',
      value: '85',
      subtitle: '2nd Highest in History',
      description: '85 international centuries across Test (30), ODI (54), and T20I (1) cricket, second only to Sachin Tendulkar.',
      highlights: [
        '54 ODI Centuries (World Record)',
        '30 Test Centuries including 7 Double-Centuries',
        '1 T20I Century (122 vs Afghanistan)',
        'Scored 100s in Australia, England, South Africa, and West Indies'
      ]
    },
    {
      id: 'odi-100s',
      title: 'ODI 100s',
      value: '54',
      subtitle: 'World Record Holder',
      description: 'Leading all-time ODI century scorer in cricket history with 54 centuries.',
      highlights: [
        '54 ODI Centuries in 314 matches',
        'Broke Sachin Tendulkar’s 49 ODI centuries record in 2023 World Cup',
        '42 centuries scored in winning causes',
        '27 centuries scored during run chases (Chase Master)'
      ]
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-white/5 bg-[#07090d]">
        {milestones.map((m, idx) => (
          <div
            key={m.id}
            onClick={() => setActiveModal(m)}
            className={`p-8 md:p-10 border-b md:border-b-0 border-r border-white/5 flex flex-col justify-between cursor-pointer group transition-colors hover:bg-white/[0.02] relative ${
              idx === milestones.length - 1 ? 'border-r-0' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]">
                {m.title}
              </span>
              <Info className="w-3.5 h-3.5 text-white/30 group-hover:text-[#d3122a] transition-colors" />
            </div>

            <div>
              <p
                className={`text-4xl sm:text-5xl font-black tracking-tight ${
                  m.isGold ? 'text-[#d3122a]' : 'text-white'
                }`}
              >
                {m.value}
              </p>
              <span className="text-[10px] text-white/50 mt-2 block font-mono">
                {m.subtitle}
              </span>
            </div>

            {/* Geometric Progress Indicator */}
            <div className="w-full h-1 bg-white/10 mt-6 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  m.isGold ? 'bg-[#d3122a] w-full' : 'bg-[#d3122a]/70 w-[80%]'
                }`}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Milestone Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="bg-[#0a0c12] border border-[#d3122a]/30 max-w-lg w-full p-6 sm:p-8 relative shadow-2xl space-y-6">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 border-b border-white/10 pb-4">
              <div className="p-3 bg-[#d3122a]/20 text-[#d3122a] border border-[#d3122a]/40">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase text-white/40 font-mono tracking-[0.3em] block">
                  Milestone Details
                </span>
                <h3 className="text-2xl font-black text-white flex items-center gap-2">
                  {activeModal.title}:{' '}
                  <span className="text-[#d3122a]">{activeModal.value}</span>
                </h3>
              </div>
            </div>

            <p className="text-white/80 text-sm leading-relaxed">
              {activeModal.description}
            </p>

            <div className="space-y-2">
              <h4 className="text-[10px] font-bold uppercase text-[#d3122a] tracking-[0.3em]">
                Key Highlights
              </h4>
              <ul className="space-y-2 text-xs text-white/90">
                {activeModal.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 bg-white/[0.02] p-3 border border-white/5">
                    <span className="text-[#d3122a] font-bold">•</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="w-full py-3 bg-[#d3122a] text-white font-black uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-all"
            >
              Close Insight
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
