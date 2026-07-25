export interface CenturyRecord {
  id: string;
  number: number;
  format: 'Test' | 'ODI' | 'T20I';
  score: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  sr: number;
  opposition: string;
  venue: string;
  date: string;
  year: number;
  result: 'Won' | 'Lost' | 'Drawn';
  isChasing: boolean;
  matchType: 'World Cup' | 'Asia Cup' | 'Bilateral' | 'Champions Trophy' | 'T20 WC';
  highlights: string;
  wagonWheel: { cover: number; straight: number; midWicket: number; squareLeg: number; point: number; thirdMan: number };
}

export interface BowlerRivalry {
  bowlerName: string;
  country: string;
  bowlingType: string;
  runsScored: number;
  ballsFaced: number;
  dismissals: number;
  average: number;
  strikeRate: number;
  fours: number;
  sixes: number;
  keyTactics: string;
}

export interface CountryRivalry {
  country: string;
  flagEmoji: string;
  formatStats: {
    format: string;
    matches: number;
    runs: number;
    average: number;
    hundreds: number;
    fifties: number;
    highestScore: string;
  }[];
  memorableMoment: string;
}

export interface VelocityRecord {
  milestone: string;
  kohliInnings: number;
  tendulkarInnings: number;
  pontingInnings: number;
  sangakkaraInnings: number;
  rohitInnings: number;
}

export interface TrophyRecord {
  title: string;
  year: string;
  category: 'ICC Trophy' | 'Individual Honour' | 'Captains Milestone';
  role: string;
  statsInTournament: string;
  description: string;
  badge: string;
}

export const CENTURY_VAULT_DATA: CenturyRecord[] = [
  {
    id: 'c80',
    number: 80,
    format: 'ODI',
    score: '117',
    runs: 117,
    balls: 113,
    fours: 9,
    sixes: 2,
    sr: 103.53,
    opposition: 'New Zealand',
    venue: 'Wankhede Stadium, Mumbai',
    date: '15 Nov 2023',
    year: 2023,
    result: 'Won',
    isChasing: false,
    matchType: 'World Cup',
    highlights: 'Overtook Sachin Tendulkar for the most ODI centuries (50th ODI 100) in the CWC23 Semi-Final before bowing to Sachin in the stands.',
    wagonWheel: { cover: 32, straight: 24, midWicket: 28, squareLeg: 18, point: 10, thirdMan: 5 }
  },
  {
    id: 'c71',
    number: 71,
    format: 'T20I',
    score: '122*',
    runs: 122,
    balls: 61,
    fours: 12,
    sixes: 6,
    sr: 200.00,
    opposition: 'Afghanistan',
    venue: 'Dubai International Stadium',
    date: '08 Sep 2022',
    year: 2022,
    result: 'Won',
    isChasing: false,
    matchType: 'Asia Cup',
    highlights: 'Broke a 1,020-day century drought with his maiden T20I hundred, recording the highest individual score by an Indian in T20Is.',
    wagonWheel: { cover: 38, straight: 22, midWicket: 30, squareLeg: 18, point: 8, thirdMan: 6 }
  },
  {
    id: 'c35',
    number: 35,
    format: 'ODI',
    score: '183',
    runs: 183,
    balls: 148,
    fours: 22,
    sixes: 1,
    sr: 123.64,
    opposition: 'Pakistan',
    venue: 'Mirpur, Bangladesh',
    date: '18 Mar 2012',
    year: 2012,
    result: 'Won',
    isChasing: true,
    matchType: 'Asia Cup',
    highlights: 'His career-highest ODI score chasing 330 against Pakistan, dismantling Saeed Ajmal, Umar Gul, and Aizaz Cheema.',
    wagonWheel: { cover: 42, straight: 30, midWicket: 35, squareLeg: 20, point: 12, thirdMan: 4 }
  },
  {
    id: 'c11',
    number: 11,
    format: 'ODI',
    score: '133*',
    runs: 133,
    balls: 86,
    fours: 16,
    sixes: 2,
    sr: 154.65,
    opposition: 'Sri Lanka',
    venue: 'Hobart, Australia',
    date: '28 Feb 2012',
    year: 2012,
    result: 'Won',
    isChasing: true,
    matchType: 'Bilateral',
    highlights: 'Chased down 321 in 36.4 overs to keep India alive in CB Series, taking 24 runs off a single Lasith Malinga over.',
    wagonWheel: { cover: 40, straight: 28, midWicket: 32, squareLeg: 18, point: 10, thirdMan: 5 }
  },
  {
    id: 'c26',
    number: 26,
    format: 'Test',
    score: '254*',
    runs: 254,
    balls: 336,
    fours: 33,
    sixes: 2,
    sr: 75.59,
    opposition: 'South Africa',
    venue: 'MCA Stadium, Pune',
    date: '11 Oct 2019',
    year: 2019,
    result: 'Won',
    isChasing: false,
    matchType: 'Bilateral',
    highlights: 'Career-highest Test score, making 254* against Rabada, Maharaj, and Philander in dominant fashion as India skipper.',
    wagonWheel: { cover: 48, straight: 35, midWicket: 28, squareLeg: 15, point: 18, thirdMan: 9 }
  },
  {
    id: 'c23',
    number: 23,
    format: 'Test',
    score: '149',
    runs: 149,
    balls: 225,
    fours: 22,
    sixes: 1,
    sr: 66.22,
    opposition: 'England',
    venue: 'Edgbaston, Birmingham',
    date: '02 Aug 2018',
    year: 2018,
    result: 'Lost',
    isChasing: false,
    matchType: 'Bilateral',
    highlights: 'Masterclass response to English conditions, scoring 149 out of India’s 274 total to single-handedly tame James Anderson and Sam Curran.',
    wagonWheel: { cover: 30, straight: 20, midWicket: 25, squareLeg: 18, point: 15, thirdMan: 11 }
  },
  {
    id: 't20-melbourne',
    number: 72,
    format: 'T20I',
    score: '82*',
    runs: 82,
    balls: 53,
    fours: 6,
    sixes: 4,
    sr: 154.71,
    opposition: 'Pakistan',
    venue: 'MCG, Melbourne',
    date: '23 Oct 2022',
    year: 2022,
    result: 'Won',
    isChasing: true,
    matchType: 'T20 WC',
    highlights: 'The "Shot of the Century" back over Haris Rauf’s head at MCG, pulling off an impossible chase from 31/4 in front of 90,000 fans.',
    wagonWheel: { cover: 35, straight: 25, midWicket: 22, squareLeg: 18, point: 12, thirdMan: 10 }
  },
  {
    id: 'c76-t20wc',
    number: 79,
    format: 'T20I',
    score: '76',
    runs: 76,
    balls: 59,
    fours: 6,
    sixes: 2,
    sr: 128.81,
    opposition: 'South Africa',
    venue: 'Kensington Oval, Barbados',
    date: '29 Jun 2024',
    year: 2024,
    result: 'Won',
    isChasing: false,
    matchType: 'T20 WC',
    highlights: 'Player of the Match in ICC T20 World Cup 2024 Final, anchoring India from 34/3 to 176/7 to seal the World Championship.',
    wagonWheel: { cover: 28, straight: 20, midWicket: 24, squareLeg: 16, point: 10, thirdMan: 8 }
  }
];

export const BOWLER_RIVALRIES: BowlerRivalry[] = [
  {
    bowlerName: 'James Anderson',
    country: 'England',
    bowlingType: 'Right-Arm Fast Medium Swing',
    runsScored: 305,
    ballsFaced: 710,
    dismissals: 7,
    average: 43.57,
    strikeRate: 42.95,
    fours: 41,
    sixes: 0,
    keyTactics: 'Epic duel across 2014 & 2018 series. Anderson dominated 2014 in UK, but Kohli completely countered him in 2018 with zero dismissals and 200+ runs.'
  },
  {
    bowlerName: 'Adam Zampa',
    country: 'Australia',
    bowlingType: 'Right-Arm Leg Spin',
    runsScored: 262,
    ballsFaced: 248,
    dismissals: 5,
    average: 52.40,
    strikeRate: 105.64,
    fours: 20,
    sixes: 5,
    keyTactics: 'High-octane leg-spin battle in middle overs. Zampa has troubled Kohli in ODIs, but Virat maintains a 105+ strike rate against him.'
  },
  {
    bowlerName: 'Mitchell Starc',
    country: 'Australia',
    bowlingType: 'Left-Arm Fast Express (148km/h+)',
    runsScored: 248,
    ballsFaced: 262,
    dismissals: 4,
    average: 62.00,
    strikeRate: 94.65,
    fours: 31,
    sixes: 2,
    keyTactics: 'High-speed duel between in-swinging yorkers and Kohli’s wristy flick past mid-wicket.'
  },
  {
    bowlerName: 'Mohammad Amir',
    country: 'Pakistan',
    bowlingType: 'Left-Arm Fast Swing',
    runsScored: 86,
    ballsFaced: 112,
    dismissals: 2,
    average: 43.00,
    strikeRate: 76.78,
    fours: 11,
    sixes: 0,
    keyTactics: 'Famous clashes in Asia Cup 2016 (49 off 51 in tough conditions) and Champions Trophy 2017 Final.'
  },
  {
    bowlerName: 'Nathan Lyon',
    country: 'Australia',
    bowlingType: 'Right-Arm Off Spin',
    runsScored: 529,
    ballsFaced: 1024,
    dismissals: 7,
    average: 75.57,
    strikeRate: 51.66,
    fours: 65,
    sixes: 6,
    keyTactics: 'Test match chess match. Lyon holds most dismissals in Tests, but Virat scored 500+ runs against him with wristy footwork.'
  },
  {
    bowlerName: 'Pat Cummins',
    country: 'Australia',
    bowlingType: 'Right-Arm Fast Heavy Ball',
    runsScored: 312,
    ballsFaced: 420,
    dismissals: 6,
    average: 52.00,
    strikeRate: 74.28,
    fours: 38,
    sixes: 3,
    keyTactics: 'High-intensity battle in Border-Gavaskar Trophy series. Cummins attacks the 5th stump channel.'
  }
];

export const COUNTRY_RIVALRIES: CountryRivalry[] = [
  {
    country: 'Australia',
    flagEmoji: '🇦🇺',
    formatStats: [
      { format: 'Test', matches: 25, runs: 2042, average: 47.48, hundreds: 8, fifties: 5, highestScore: '186' },
      { format: 'ODI', matches: 48, runs: 2313, average: 53.79, hundreds: 8, fifties: 13, highestScore: '123' },
      { format: 'T20I', matches: 22, runs: 794, average: 52.93, hundreds: 0, fifties: 8, highestScore: '90*' }
    ],
    memorableMoment: 'Adelaide 2014 Test Twin Hundreds (115 & 141) and 82* at Mohali in T20 WC 2016.'
  },
  {
    country: 'Pakistan',
    flagEmoji: '🇵🇰',
    formatStats: [
      { format: 'ODI', matches: 16, runs: 678, average: 52.15, hundreds: 3, fifties: 2, highestScore: '183' },
      { format: 'T20I', matches: 11, runs: 488, average: 70.28, hundreds: 0, fifties: 5, highestScore: '82*' }
    ],
    memorableMoment: '183 at Mirpur in 2012 and 82* at MCG in 2022 T20 World Cup.'
  },
  {
    country: 'England',
    flagEmoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    formatStats: [
      { format: 'Test', matches: 35, runs: 2170, average: 42.54, hundreds: 5, fifties: 10, highestScore: '235' },
      { format: 'ODI', matches: 35, runs: 1340, average: 43.22, hundreds: 3, fifties: 7, highestScore: '122' },
      { format: 'T20I', matches: 20, runs: 639, average: 39.93, hundreds: 0, fifties: 5, highestScore: '80*' }
    ],
    memorableMoment: '2018 England Test Series (593 runs) proving dominance in overseas conditions.'
  },
  {
    country: 'South Africa',
    flagEmoji: '🇿🇦',
    formatStats: [
      { format: 'Test', matches: 15, runs: 1236, average: 56.18, hundreds: 3, fifties: 4, highestScore: '254*' },
      { format: 'ODI', matches: 30, runs: 1504, average: 65.39, hundreds: 5, fifties: 8, highestScore: '160*' },
      { format: 'T20I', matches: 13, runs: 354, average: 35.40, hundreds: 0, fifties: 3, highestScore: '76' }
    ],
    memorableMoment: '558 runs in 6 ODIs in South Africa in 2018 and T20 World Cup 2024 Final 76.'
  }
];

export const VELOCITY_MILESTONES: VelocityRecord[] = [
  { milestone: '8,000 Runs', kohliInnings: 175, tendulkarInnings: 210, pontingInnings: 220, sangakkaraInnings: 228, rohitInnings: 200 },
  { milestone: '9,000 Runs', kohliInnings: 194, tendulkarInnings: 235, pontingInnings: 242, sangakkaraInnings: 251, rohitInnings: 217 },
  { milestone: '10,000 Runs', kohliInnings: 205, tendulkarInnings: 259, pontingInnings: 266, sangakkaraInnings: 272, rohitInnings: 241 },
  { milestone: '11,000 Runs', kohliInnings: 222, tendulkarInnings: 276, pontingInnings: 286, sangakkaraInnings: 288, rohitInnings: 260 },
  { milestone: '12,000 Runs', kohliInnings: 242, tendulkarInnings: 300, pontingInnings: 314, sangakkaraInnings: 315, rohitInnings: 275 },
  { milestone: '13,000 Runs', kohliInnings: 267, tendulkarInnings: 321, pontingInnings: 341, sangakkaraInnings: 363, rohitInnings: 298 },
  { milestone: '14,000 Runs', kohliInnings: 280, tendulkarInnings: 350, pontingInnings: 375, sangakkaraInnings: 380, rohitInnings: 320 }
];

export const TROPHY_VAULT_DATA: TrophyRecord[] = [
  {
    title: 'ICC Men’s Cricket World Cup 2023 Player of the Tournament',
    year: '2023',
    category: 'ICC Trophy',
    role: 'Primary Anchor & Top Scorer',
    statsInTournament: '765 Runs | Avg 95.62 | 3 Hundreds | 6 Fifties',
    description: 'Broke Sachin Tendulkar’s all-time record for most runs in a single World Cup edition with an incredible 765 runs.',
    badge: '👑 ALL-TIME WORLD CUP RECORD'
  },
  {
    title: 'ICC T20 World Cup 2024 Champion',
    year: '2024',
    category: 'ICC Trophy',
    role: 'Final Player of the Match',
    statsInTournament: '76 (59) in Final vs SA | World Champion',
    description: 'Anchored India from 34/3 to World Championship victory in Barbados, retiring from T20Is at the ultimate peak.',
    badge: '🏆 T20 WORLD CHAMPION'
  },
  {
    title: 'ICC ODI Cricketer of the Decade (2010–2020)',
    year: '2020',
    category: 'Individual Honour',
    role: 'Decade Dominator',
    statsInTournament: '10,000+ Runs in Decade | 39 Hundreds | Avg 61.83',
    description: 'Awarded Sir Garfield Sobbs Trophy for ICC Male Cricketer of the Decade & ICC ODI Cricketer of the Decade.',
    badge: '🌟 DECADE KING'
  },
  {
    title: 'ICC Champions Trophy 2013 Winner',
    year: '2013',
    category: 'ICC Trophy',
    role: 'Top Scorer in Final (43 off 34 vs ENG)',
    statsInTournament: '176 Runs | Top Scorer in Final',
    description: 'Crucial top-scorer in a rain-reduced 20-over final against England at Edgbaston, securing India’s Champions Trophy title.',
    badge: '🥇 CHAMPIONS TROPHY'
  },
  {
    title: 'ICC Cricket World Cup 2011 Champion',
    year: '2011',
    category: 'ICC Trophy',
    role: 'Key 35 Run Stand in Final with Gambhir',
    statsInTournament: '282 Runs | Century on World Cup debut vs BAN',
    description: 'Scored 100* vs Bangladesh in opener and crucial 35 in the final vs Sri Lanka before carrying Sachin Tendulkar on his shoulders.',
    badge: '🏆 WORLD CHAMPION'
  },
  {
    title: '5x Consecutive ICC Test Championship Mace (2017–2021)',
    year: '2017 - 2021',
    category: 'Captains Milestone',
    role: 'India Test Captain',
    statsInTournament: '40 Test Wins (Most for India) | 68.8% Home Win Rate',
    description: 'Led India to #1 Test ranking for 5 straight years, including historic first-ever Test series win in Australia (2018/19).',
    badge: '⚔️ TEST DOMINANCE'
  }
];

export const BIOMECHANICS_DATA = {
  coverDriveTrajectory: {
    contactAngleDeg: 42,
    exitVelocityKmh: 142,
    footworkStepCm: 78,
    wristSnapTorqueNm: 86,
    sweetSpotAccuracyPct: 96.4
  },
  bowlingTypeAverages: [
    { type: 'Right-Arm Fast (140km/h+)', avg: 54.2, sr: 88.4, boundariesPct: 18.2 },
    { type: 'Left-Arm Fast Swing', avg: 48.6, sr: 84.1, boundariesPct: 15.8 },
    { type: 'Right-Arm Off-Spin', avg: 62.8, sr: 94.2, boundariesPct: 14.5 },
    { type: 'Right-Arm Leg-Spin', avg: 58.4, sr: 102.5, boundariesPct: 19.1 },
    { type: 'Left-Arm Orthodox Spin', avg: 51.0, sr: 86.0, boundariesPct: 13.9 }
  ],
  chaseSituationalStats: {
    successfulChasesOdiAvg: 64.3,
    centuryCountInChases: 36,
    averageWhenNotOut: 118.5,
    strikeRateInDeathOvers: 192.4
  }
};
