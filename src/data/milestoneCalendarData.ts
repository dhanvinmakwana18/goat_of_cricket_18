export interface CalendarMilestone {
  id: string;
  category: 'RUN_MILESTONE' | 'CENTURY_HIGHLIGHT' | 'CHAMPIONSHIP' | 'CAREER_DEBUT';
  title: string;
  dateStr: string; // Format: YYYY-MM-DD
  month: string;   // MM
  day: string;     // DD
  yearScored: number;
  description: string;
  venue: string;
  opponent: string;
  format: 'ODI' | 'TEST' | 'T20I' | 'IPL';
}

export const KOHLI_HISTORIC_MILESTONES: CalendarMilestone[] = [
  // --- CAREER DEBUTS ---
  {
    id: "debut-u19-wc",
    category: "CAREER_DEBUT",
    title: "U19 World Cup Captaincy Victory",
    dateStr: "2008-03-02",
    month: "03",
    day: "02",
    yearScored: 2008,
    description: "Virat Kohli led India U19 to victory in the ICC U19 Cricket World Cup Final in Malaysia.",
    venue: "Kuala Lumpur, Malaysia",
    opponent: "South Africa U19",
    format: "ODI"
  },
  {
    id: "debut-odi",
    category: "CAREER_DEBUT",
    title: "International ODI Debut for India",
    dateStr: "2008-08-18",
    month: "08",
    day: "18",
    yearScored: 2008,
    description: "Virat Kohli made his international senior debut opening the batting against Sri Lanka.",
    venue: "Dambulla, Sri Lanka",
    opponent: "Sri Lanka",
    format: "ODI"
  },
  {
    id: "debut-t20i",
    category: "CAREER_DEBUT",
    title: "T20 International Debut",
    dateStr: "2010-06-12",
    month: "06",
    day: "12",
    yearScored: 2010,
    description: "Made T20I debut for India, scoring a steady 21* in a successful chase.",
    venue: "Harare, Zimbabwe",
    opponent: "Zimbabwe",
    format: "T20I"
  },
  {
    id: "debut-test",
    category: "CAREER_DEBUT",
    title: "Test Match Debut for India",
    dateStr: "2011-06-20",
    month: "06",
    day: "20",
    yearScored: 2011,
    description: "Received his maiden Test cap at Sabina Park against West Indies.",
    venue: "Kingston, Jamaica",
    opponent: "West Indies",
    format: "TEST"
  },

  // --- RUN MILESTONES ---
  {
    id: "run-1k-odi",
    category: "RUN_MILESTONE",
    title: "Crossed 1,000 ODI Runs",
    dateStr: "2010-01-07",
    month: "01",
    day: "07",
    yearScored: 2010,
    description: "Virat Kohli reached 1,000 ODI runs in his 24th innings against Bangladesh.",
    venue: "Dhaka, Bangladesh",
    opponent: "Bangladesh",
    format: "ODI"
  },
  {
    id: "run-5k-odi",
    category: "RUN_MILESTONE",
    title: "Fastest to 5,000 ODI Runs (Joint Record)",
    dateStr: "2013-11-21",
    month: "11",
    day: "21",
    yearScored: 2013,
    description: "Reached 5,000 ODI runs in 114 innings, equaling Sir Vivian Richards' record.",
    venue: "Kochi, India",
    opponent: "West Indies",
    format: "ODI"
  },
  {
    id: "run-10k-odi",
    category: "RUN_MILESTONE",
    title: "Fastest to 10,000 ODI Runs World Record",
    dateStr: "2018-10-24",
    month: "10",
    day: "24",
    yearScored: 2018,
    description: "Broke Sachin Tendulkar's record by reaching 10,000 ODI runs in just 205 innings with 157*.",
    venue: "Visakhapatnam, India",
    opponent: "West Indies",
    format: "ODI"
  },
  {
    id: "run-12k-odi",
    category: "RUN_MILESTONE",
    title: "Fastest to 12,000 ODI Runs",
    dateStr: "2020-12-02",
    month: "12",
    day: "02",
    yearScored: 2020,
    description: "Broke Sachin Tendulkar's record by reaching 12,000 ODI runs in just 242 innings.",
    venue: "Canberra, Australia",
    opponent: "Australia",
    format: "ODI"
  },
  {
    id: "run-13k-odi",
    category: "RUN_MILESTONE",
    title: "Fastest to 13,000 ODI Runs World Record",
    dateStr: "2023-09-11",
    month: "09",
    day: "11",
    yearScored: 2023,
    description: "Reached 13,000 ODI runs in only 267 innings with a blistering 122* against Pakistan.",
    venue: "Colombo, Sri Lanka",
    opponent: "Pakistan",
    format: "ODI"
  },
  {
    id: "run-20k-intl",
    category: "RUN_MILESTONE",
    title: "Fastest to 20,000 International Runs",
    dateStr: "2019-06-27",
    month: "06",
    day: "27",
    yearScored: 2019,
    description: "Reached 20,000 international runs across all formats in 417 innings during CWC19.",
    venue: "Manchester, England",
    opponent: "West Indies",
    format: "ODI"
  },
  {
    id: "run-25k-intl",
    category: "RUN_MILESTONE",
    title: "Fastest to 25,000 International Runs",
    dateStr: "2023-02-19",
    month: "02",
    day: "19",
    yearScored: 2023,
    description: "Crossed 25,000 international runs in 549 innings, fastest in cricket history.",
    venue: "New Delhi, India",
    opponent: "Australia",
    format: "TEST"
  },
  {
    id: "run-26k-intl",
    category: "RUN_MILESTONE",
    title: "Fastest to 26,000 International Runs",
    dateStr: "2023-10-19",
    month: "10",
    day: "19",
    yearScored: 2023,
    description: "Crossed 26,000 international runs in 567 innings with a brilliant century.",
    venue: "Pune, India",
    opponent: "Bangladesh",
    format: "ODI"
  },
  {
    id: "run-27k-intl",
    category: "RUN_MILESTONE",
    title: "Fastest to 27,000 International Runs",
    dateStr: "2024-09-30",
    month: "09",
    day: "30",
    yearScored: 2024,
    description: "Crossed 27,000 international runs in 594 innings, breaking Tendulkar's record by 29 innings.",
    venue: "Kanpur, India",
    opponent: "Bangladesh",
    format: "TEST"
  },

  // --- CHAMPIONSHIPS & WORLD CUPS ---
  {
    id: "champ-2011-wc",
    category: "CHAMPIONSHIP",
    title: "2011 ICC Cricket World Cup Champion",
    dateStr: "2011-04-02",
    month: "04",
    day: "02",
    yearScored: 2011,
    description: "India lifted the ICC Cricket World Cup at Wankhede Stadium. Virat scored 35 critical runs in the final.",
    venue: "Wankhede Stadium, Mumbai",
    opponent: "Sri Lanka",
    format: "ODI"
  },
  {
    id: "champ-2013-ct",
    category: "CHAMPIONSHIP",
    title: "2013 ICC Champions Trophy Champion",
    dateStr: "2013-06-23",
    month: "06",
    day: "23",
    yearScored: 2013,
    description: "Top scored with 43 runs in a rain-affected 20-over final against England at Edgbaston.",
    venue: "Birmingham, England",
    opponent: "England",
    format: "ODI"
  },
  {
    id: "champ-test-mace",
    category: "CHAMPIONSHIP",
    title: "ICC Test Mace Winner (5 Consecutive Years)",
    dateStr: "2019-04-01",
    month: "04",
    day: "01",
    yearScored: 2019,
    description: "Captain Virat Kohli led India to #1 ICC Test Team Ranking, holding the ICC Test Mace for 5 straight years.",
    venue: "Global Test Arenas",
    opponent: "ICC Member Nations",
    format: "TEST"
  },
  {
    id: "champ-2024-t20wc",
    category: "CHAMPIONSHIP",
    title: "2024 ICC T20 World Cup Champion",
    dateStr: "2024-06-29",
    month: "06",
    day: "29",
    yearScored: 2024,
    description: "Player of the Match in the Final (76 off 59) to seal India's T20 World Cup title in Barbados.",
    venue: "Bridgetown, Barbados",
    opponent: "South Africa",
    format: "T20I"
  },

  // --- ICONIC CENTURY MILESTONES ---
  {
    id: "cent-1-odi",
    category: "CENTURY_HIGHLIGHT",
    title: "1st International Century (107)",
    dateStr: "2009-12-24",
    month: "12",
    day: "24",
    yearScored: 2009,
    description: "First ODI century alongside Gautam Gambhir in a successful 316-run chase.",
    venue: "Kolkata, India",
    opponent: "Sri Lanka",
    format: "ODI"
  },
  {
    id: "cent-133-hobart",
    category: "CENTURY_HIGHLIGHT",
    title: "Hobart Hurricane (133* off 86 balls)",
    dateStr: "2012-02-28",
    month: "02",
    day: "28",
    yearScored: 2012,
    description: "Chased 321 in 36.4 overs against Lasith Malinga and Sri Lanka in a legendary knock.",
    venue: "Hobart, Australia",
    opponent: "Sri Lanka",
    format: "ODI"
  },
  {
    id: "cent-183-odi",
    category: "CENTURY_HIGHLIGHT",
    title: "Highest ODI Score (183 vs PAK)",
    dateStr: "2012-03-18",
    month: "03",
    day: "18",
    yearScored: 2012,
    description: "Masterclass chase of 330 against Pakistan in Asia Cup, scoring 183 off 148 balls.",
    venue: "Mirpur, Bangladesh",
    opponent: "Pakistan",
    format: "ODI"
  },
  {
    id: "cent-52-fastest",
    category: "CENTURY_HIGHLIGHT",
    title: "Fastest ODI Century by an Indian (52 balls)",
    dateStr: "2013-10-16",
    month: "10",
    day: "16",
    yearScored: 2013,
    description: "Smashed 100* off 52 balls chasing 360 vs Australia in Jaipur.",
    venue: "Jaipur, India",
    opponent: "Australia",
    format: "ODI"
  },
  {
    id: "cent-82-mcg",
    category: "CENTURY_HIGHLIGHT",
    title: "Shot of the Century (82* vs PAK MCG)",
    dateStr: "2022-10-23",
    month: "10",
    day: "23",
    yearScored: 2022,
    description: "Unbelievable T20 World Cup chase at MCG including the famous straight six off Haris Rauf.",
    venue: "MCG, Melbourne",
    opponent: "Pakistan",
    format: "T20I"
  },
  {
    id: "cent-71-t20i",
    category: "CENTURY_HIGHLIGHT",
    title: "71st Century & Maiden T20I 100 (122*)",
    dateStr: "2022-09-08",
    month: "09",
    day: "08",
    yearScored: 2022,
    description: "Ended 1,020-day century drought with a majestic 122* off 61 balls in the Asia Cup.",
    venue: "Dubai, UAE",
    opponent: "Afghanistan",
    format: "T20I"
  },
  {
    id: "cent-50-odi",
    category: "CENTURY_HIGHLIGHT",
    title: "50th ODI Century — World Record",
    dateStr: "2023-11-15",
    month: "11",
    day: "15",
    yearScored: 2023,
    description: "Broke Sachin Tendulkar's world record for most ODI centuries in the CWC23 semi-final.",
    venue: "Wankhede Stadium, Mumbai",
    opponent: "New Zealand",
    format: "ODI"
  },
  {
    id: "cent-80-total",
    category: "CENTURY_HIGHLIGHT",
    title: "80th International Century",
    dateStr: "2023-11-15",
    month: "11",
    day: "15",
    yearScored: 2023,
    description: "Reached 80 international centuries across Test, ODI, and T20I formats.",
    venue: "Wankhede Stadium, Mumbai",
    opponent: "New Zealand",
    format: "ODI"
  }
];
