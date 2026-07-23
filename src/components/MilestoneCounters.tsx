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
      id: 'intl-runs',
      title: 'Intl Runs',
      value: '26,900+',
      subtitle: 'Across all 3 formats',
      description: 'Virat Kohli is among the fastest players in cricket history to reach 10k, 15k, 20k, and 25k international runs.',
      highlights: [
        'Fastest to 20,000 international runs (417 innings)',
        'Fastest to 25,000 international runs (549 innings)',
        'Highest run scorer in T20 World Cups',
        'Averages over 49+ across test and white-ball formats combined'
      ]
    },
    {
      id: 'total-100s',
      title: 'Total 100s',
      value: '80',
      subtitle: '2nd Highest in History',
      isGold: true,
      description: '80 international centuries across Test (29), ODI (50), and T20I (1) cricket, trailing only Sachin Tendulkar.',
      highlights: [
        '50 ODI Centuries (World Record)',
        '29 Test Centuries including 7 Double-Centuries',
        '1 T20I Century (122* vs Afghanistan)',
        'Scored 100s in Australia, England, South Africa, and West Indies'
      ]
    },
    {
      id: 'odi-100s',
      title: 'ODI 100s',
      value: '50',
      subtitle: 'World Record Holder',
      description: 'Broke Sachin Tendulkar’s legendary record of 49 ODI centuries during the 2023 ICC World Cup Semi-Final at Wankhede Stadium.',
      highlights: [
        '50th ODI century scored on November 15, 2023 vs New Zealand',
        '42 centuries scored in winning causes',
        '27 centuries scored during run chases (Chase Master)',
        'Most ODI centuries against a single opponent (10 vs Sri Lanka)'
      ]
    },
    {
      id: 't20i-runs',
      title: 'T20I Runs',
      value: '4,188',
      subtitle: 'T20 World Cup Champion',
      description: 'Key architect of India’s T20 World Cup 2024 triumph and Player of the Tournament in two T20 World Cups (2014 & 2016).',
      highlights: [
        'Player of the Match in 2024 T20 World Cup Final (76 vs SA)',
        '38 T20I Fifty+ scores',
        'Iconic 82* off 53 balls vs Pakistan at Melbourne Cricket Ground (2022)',
        'High score of 122* off 61 balls'
      ]
    }
  ];

  return (
    <section class="max-w-7xl mx-auto px-6 lg:px-12 py-12">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-0 border border-white/5 bg-[#07090d]">
        {milestones.map((m, idx) => (
          <div
            key={m.id}
            onClick={() => setActiveModal(m)}
            class={`p-8 md:p-10 border-b md:border-b-0 border-r border-white/5 flex flex-col justify-between cursor-pointer group transition-colors hover:bg-white/[0.02] relative ${
              idx === milestones.length - 1 ? 'border-r-0' : ''
            }`}
          >
            <div class="flex items-center justify-between mb-4">
              <span class="text-white/30 text-[10px] font-bold uppercase tracking-[0.3em]">
                {m.title}
              </span>
              <Info className="w-3.5 h-3.5 text-white/20 group-hover:text-[#eab308] transition-colors" />
            </div>

            <div>
              <p
                class={`text-4xl sm:text-5xl font-black tracking-tight ${
                  m.isGold ? 'text-[#eab308]' : 'text-white'
                }`}
              >
                {m.value}
              </p>
              <span class="text-[10px] text-white/40 mt-2 block font-mono">
                {m.subtitle}
              </span>
            </div>

            {/* Geometric Progress Indicator */}
            <div class="w-full h-1 bg-white/5 mt-6 overflow-hidden">
              <div
                class={`h-full transition-all duration-500 ${
                  m.isGold ? 'bg-[#eab308] w-full' : 'bg-[#eab308]/70 w-[80%]'
                }`}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Milestone Modal */}
      {activeModal && (
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div class="bg-[#07090d] border border-white/10 max-w-lg w-full p-6 sm:p-8 relative shadow-2xl space-y-6">
            <button
              onClick={() => setActiveModal(null)}
              class="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div class="flex items-center gap-4 border-b border-white/10 pb-4">
              <div class="p-3 bg-[#eab308]/10 text-[#eab308] border border-[#eab308]/20">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <span class="text-[10px] uppercase text-white/40 font-mono tracking-[0.3em] block">
                  Milestone Details
                </span>
                <h3 class="text-2xl font-black text-white flex items-center gap-2">
                  {activeModal.title}:{' '}
                  <span class="text-[#eab308]">{activeModal.value}</span>
                </h3>
              </div>
            </div>

            <p class="text-white/70 text-sm leading-relaxed">
              {activeModal.description}
            </p>

            <div class="space-y-2">
              <h4 class="text-[10px] font-bold uppercase text-[#eab308] tracking-[0.3em]">
                Key Highlights
              </h4>
              <ul class="space-y-2 text-xs text-white/80">
                {activeModal.highlights.map((h, i) => (
                  <li key={i} class="flex items-start gap-2 bg-white/[0.02] p-3 border border-white/5">
                    <span class="text-[#eab308] font-bold">•</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              class="w-full py-3 bg-[#eab308] text-black font-black uppercase text-xs tracking-widest hover:bg-white transition-all"
            >
              Close Insight
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
