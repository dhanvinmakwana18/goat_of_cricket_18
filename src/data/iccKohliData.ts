export interface YearlyStat {
  year: string;
  matches: number;
  runs: number;
  avg: number;
  sr: number;
  hs: string;
  hundredsFifties: string;
  foursSixes: string;
  catches: number;
}

export interface ICCFormatData {
  Test: YearlyStat[];
  ODI: YearlyStat[];
  T20I: YearlyStat[];
  YouthU19: YearlyStat[];
}

export const ICC_KOHLI_YEARLY_STATS: ICCFormatData = {
  Test: [
    { year: "2025", matches: 1, runs: 23, avg: 11.50, sr: 28.40, hs: "17", hundredsFifties: "0 / 0", foursSixes: "1 / 0", catches: 1 },
    { year: "2024", matches: 10, runs: 417, avg: 24.53, sr: 61.96, hs: "100*", hundredsFifties: "1 / 1", foursSixes: "43 / 5", catches: 10 },
    { year: "2023", matches: 8, runs: 671, avg: 55.92, sr: 54.73, hs: "186", hundredsFifties: "2 / 2", foursSixes: "70 / 1", catches: 6 },
    { year: "2022", matches: 6, runs: 265, avg: 26.50, sr: 39.43, hs: "79", hundredsFifties: "0 / 1", foursSixes: "33 / 1", catches: 6 },
    { year: "2021", matches: 11, runs: 536, avg: 28.21, sr: 44.08, hs: "72", hundredsFifties: "0 / 4", foursSixes: "60 / 1", catches: 14 },
    { year: "2020", matches: 3, runs: 116, avg: 19.33, sr: 40.99, hs: "74", hundredsFifties: "0 / 1", foursSixes: "15 / 0", catches: 4 },
    { year: "2019", matches: 8, runs: 612, avg: 68.00, sr: 63.29, hs: "254*", hundredsFifties: "2 / 2", foursSixes: "78 / 3", catches: 8 },
    { year: "2018", matches: 13, runs: 1322, avg: 55.08, sr: 54.34, hs: "153", hundredsFifties: "5 / 5", foursSixes: "144 / 2", catches: 12 },
    { year: "2017", matches: 10, runs: 1059, avg: 75.64, sr: 76.24, hs: "243", hundredsFifties: "5 / 1", foursSixes: "97 / 6", catches: 10 },
    { year: "2016", matches: 12, runs: 1215, avg: 75.94, sr: 60.42, hs: "235", hundredsFifties: "4 / 2", foursSixes: "134 / 2", catches: 14 },
    { year: "2015", matches: 9, runs: 640, avg: 42.67, sr: 54.05, hs: "147", hundredsFifties: "2 / 2", foursSixes: "74 / 1", catches: 6 },
    { year: "2014", matches: 10, runs: 847, avg: 44.58, sr: 60.54, hs: "169", hundredsFifties: "4 / 2", foursSixes: "101 / 2", catches: 5 },
    { year: "2013", matches: 8, runs: 616, avg: 56.00, sr: 54.66, hs: "119", hundredsFifties: "2 / 3", foursSixes: "73 / 2", catches: 7 },
    { year: "2012", matches: 9, runs: 689, avg: 49.21, sr: 46.61, hs: "116", hundredsFifties: "3 / 3", foursSixes: "86 / 1", catches: 8 },
    { year: "2011", matches: 5, runs: 202, avg: 22.44, sr: 42.70, hs: "63", hundredsFifties: "0 / 2", foursSixes: "21 / 1", catches: 2 }
  ],
  ODI: [
    { year: "2026", matches: 3, runs: 142, avg: 47.33, sr: 94.66, hs: "82", hundredsFifties: "0 / 1", foursSixes: "12 / 2", catches: 2 },
    { year: "2025", matches: 6, runs: 288, avg: 57.60, sr: 91.13, hs: "101*", hundredsFifties: "1 / 2", foursSixes: "25 / 3", catches: 4 },
    { year: "2023", matches: 27, runs: 1377, avg: 72.47, sr: 99.13, hs: "166*", hundredsFifties: "6 / 8", foursSixes: "121 / 24", catches: 18 },
    { year: "2022", matches: 11, runs: 302, avg: 27.45, sr: 87.03, hs: "113", hundredsFifties: "1 / 2", foursSixes: "32 / 2", catches: 7 },
    { year: "2021", matches: 3, runs: 129, avg: 43.00, sr: 86.57, hs: "66", hundredsFifties: "0 / 2", foursSixes: "11 / 1", catches: 2 },
    { year: "2020", matches: 9, runs: 431, avg: 47.88, sr: 92.28, hs: "89", hundredsFifties: "0 / 5", foursSixes: "38 / 5", catches: 6 },
    { year: "2019", matches: 26, runs: 1377, avg: 59.86, sr: 96.36, hs: "123", hundredsFifties: "5 / 7", foursSixes: "133 / 8", catches: 18 },
    { year: "2018", matches: 14, runs: 1202, avg: 133.55, sr: 102.55, hs: "160*", hundredsFifties: "6 / 3", foursSixes: "119 / 13", catches: 9 },
    { year: "2017", matches: 26, runs: 1460, avg: 76.84, sr: 99.11, hs: "131", hundredsFifties: "6 / 7", foursSixes: "136 / 22", catches: 9 },
    { year: "2016", matches: 10, runs: 739, avg: 92.37, sr: 100.00, hs: "154*", hundredsFifties: "3 / 4", foursSixes: "62 / 8", catches: 6 },
    { year: "2015", matches: 20, runs: 623, avg: 36.64, sr: 80.69, hs: "138", hundredsFifties: "2 / 1", foursSixes: "40 / 8", catches: 10 },
    { year: "2014", matches: 21, runs: 1054, avg: 58.55, sr: 99.62, hs: "139*", hundredsFifties: "4 / 5", foursSixes: "82 / 20", catches: 12 },
    { year: "2013", matches: 34, runs: 1268, avg: 52.83, sr: 97.53, hs: "115*", hundredsFifties: "4 / 7", foursSixes: "129 / 20", catches: 18 },
    { year: "2012", matches: 17, runs: 1026, avg: 68.40, sr: 93.78, hs: "183", hundredsFifties: "5 / 3", foursSixes: "94 / 5", catches: 13 },
    { year: "2011", matches: 34, runs: 1381, avg: 47.62, sr: 85.56, hs: "117", hundredsFifties: "4 / 8", foursSixes: "127 / 7", catches: 19 },
    { year: "2010", matches: 25, runs: 995, avg: 47.38, sr: 85.11, hs: "118", hundredsFifties: "3 / 7", foursSixes: "93 / 4", catches: 9 },
    { year: "2009", matches: 10, runs: 325, avg: 54.16, sr: 84.41, hs: "107", hundredsFifties: "1 / 2", foursSixes: "33 / 3", catches: 4 },
    { year: "2008", matches: 5, runs: 159, avg: 31.80, sr: 66.52, hs: "54", hundredsFifties: "0 / 1", foursSixes: "21 / 1", catches: 3 }
  ],
  T20I: [
    { year: "2024", matches: 11, runs: 180, avg: 18.00, sr: 112.50, hs: "76", hundredsFifties: "0 / 1", foursSixes: "15 / 8", catches: 4 },
    { year: "2022", matches: 20, runs: 781, avg: 55.78, sr: 137.96, hs: "122*", hundredsFifties: "1 / 8", foursSixes: "69 / 26", catches: 11 },
    { year: "2021", matches: 10, runs: 299, avg: 74.75, sr: 132.88, hs: "80*", hundredsFifties: "0 / 4", foursSixes: "24 / 9", catches: 5 },
    { year: "2020", matches: 10, runs: 295, avg: 36.87, sr: 141.82, hs: "85", hundredsFifties: "0 / 1", foursSixes: "23 / 9", catches: 8 },
    { year: "2019", matches: 10, runs: 466, avg: 77.66, sr: 147.93, hs: "94*", hundredsFifties: "0 / 5", foursSixes: "38 / 23", catches: 5 },
    { year: "2018", matches: 10, runs: 211, avg: 35.16, sr: 131.87, hs: "61*", hundredsFifties: "0 / 1", foursSixes: "14 / 7", catches: 4 },
    { year: "2017", matches: 10, runs: 299, avg: 37.37, sr: 152.55, hs: "82", hundredsFifties: "0 / 2", foursSixes: "28 / 10", catches: 4 },
    { year: "2016", matches: 15, runs: 641, avg: 106.83, sr: 140.26, hs: "90*", hundredsFifties: "0 / 7", foursSixes: "63 / 11", catches: 6 },
    { year: "2014", matches: 7, runs: 385, avg: 96.25, sr: 131.40, hs: "77", hundredsFifties: "0 / 5", foursSixes: "32 / 12", catches: 2 },
    { year: "2013", matches: 1, runs: 29, avg: 29.00, sr: 131.81, hs: "29", hundredsFifties: "0 / 0", foursSixes: "2 / 1", catches: 1 },
    { year: "2012", matches: 14, runs: 471, avg: 39.25, sr: 132.67, hs: "78*", hundredsFifties: "0 / 4", foursSixes: "45 / 9", catches: 4 },
    { year: "2011", matches: 4, runs: 61, avg: 20.33, sr: 107.01, hs: "28", hundredsFifties: "0 / 0", foursSixes: "7 / 0", catches: 0 },
    { year: "2010", matches: 2, runs: 49, avg: 49.00, sr: 122.50, hs: "28*", hundredsFifties: "0 / 0", foursSixes: "3 / 1", catches: 0 }
  ],
  YouthU19: [
    { year: "2008", matches: 6, runs: 235, avg: 47.00, sr: 94.75, hs: "100", hundredsFifties: "1 / 1", foursSixes: "22 / 5", catches: 4 },
    { year: "2007", matches: 12, runs: 480, avg: 43.63, sr: 82.10, hs: "84", hundredsFifties: "0 / 4", foursSixes: "48 / 6", catches: 8 },
    { year: "2006", matches: 10, runs: 263, avg: 52.60, sr: 78.50, hs: "80", hundredsFifties: "0 / 1", foursSixes: "23 / 3", catches: 4 }
  ]
};
