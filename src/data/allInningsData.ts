export interface InningRecord {
  id: string;
  date: string; // YYYY-MM-DD
  format: 'ODI' | 'TEST' | 'T20I' | 'IPL';
  runs: string;
  opponent: string;
  venue: string;
  source: 'ICC' | 'IPL';
  isCentury: boolean;
  isZero: boolean;
  notes?: string;
}

export const ALL_KOHLI_INNINGS: InningRecord[] = [
  // ==========================================
  // 2008 SEASON (DEBUT YEAR)
  // ==========================================
  {
    id: 'ipl-2008-01',
    date: '2008-04-18',
    format: 'IPL',
    runs: '1',
    opponent: 'Kolkata Knight Riders',
    venue: 'M. Chinnaswamy Stadium, Bengaluru',
    source: 'IPL',
    isCentury: false,
    isZero: false,
    notes: 'Historic IPL Debut for Royal Challengers Bangalore.'
  },
  {
    id: 'ipl-2008-02',
    date: '2008-04-20',
    format: 'IPL',
    runs: '23',
    opponent: 'Rajasthan Royals',
    venue: 'SMS Stadium, Jaipur',
    source: 'IPL',
    isCentury: false,
    isZero: false
  },
  {
    id: 'ipl-2008-03',
    date: '2008-04-26',
    format: 'IPL',
    runs: '13',
    opponent: 'Chennai Super Kings',
    venue: 'M. Chinnaswamy Stadium, Bengaluru',
    source: 'IPL',
    isCentury: false,
    isZero: false
  },
  {
    id: 'ipl-2008-04',
    date: '2008-04-28',
    format: 'IPL',
    runs: '38',
    opponent: 'Kings XI Punjab',
    venue: 'PCA Stadium, Mohali',
    source: 'IPL',
    isCentury: false,
    isZero: false
  },
  {
    id: 'ipl-2008-05',
    date: '2008-05-03',
    format: 'IPL',
    runs: '34',
    opponent: 'Deccan Chargers',
    venue: 'M. Chinnaswamy Stadium, Bengaluru',
    source: 'IPL',
    isCentury: false,
    isZero: false
  },
  {
    id: 'ipl-2008-06',
    date: '2008-05-21',
    format: 'IPL',
    runs: '9',
    opponent: 'Mumbai Indians',
    venue: 'Wankhede Stadium, Mumbai',
    source: 'IPL',
    isCentury: false,
    isZero: false
  },
  {
    id: 'icc-2008-01',
    date: '2008-08-18',
    format: 'ODI',
    runs: '12',
    opponent: 'Sri Lanka',
    venue: 'Rangiri Dambulla International Stadium',
    source: 'ICC',
    isCentury: false,
    isZero: false,
    notes: 'INTERNATIONAL CRICKET DEBUT as opening batsman for India.'
  },
  {
    id: 'icc-2008-02',
    date: '2008-08-20',
    format: 'ODI',
    runs: '37',
    opponent: 'Sri Lanka',
    venue: 'Rangiri Dambulla International Stadium',
    source: 'ICC',
    isCentury: false,
    isZero: false
  },
  {
    id: 'icc-2008-03',
    date: '2008-08-24',
    format: 'ODI',
    runs: '25',
    opponent: 'Sri Lanka',
    venue: 'Rangiri Dambulla International Stadium',
    source: 'ICC',
    isCentury: false,
    isZero: false
  },
  {
    id: 'icc-2008-04',
    date: '2008-08-27',
    format: 'ODI',
    runs: '54',
    opponent: 'Sri Lanka',
    venue: 'Rangiri Dambulla International Stadium',
    source: 'ICC',
    isCentury: false,
    isZero: false,
    notes: 'Maiden International Half-Century (54 off 66 balls).'
  },
  {
    id: 'icc-2008-05',
    date: '2008-08-29',
    format: 'ODI',
    runs: '31',
    opponent: 'Sri Lanka',
    venue: 'Rangiri Dambulla International Stadium',
    source: 'ICC',
    isCentury: false,
    isZero: false
  },

  // ==========================================
  // 2009 SEASON
  // ==========================================
  {
    id: 'ipl-2009-01',
    date: '2009-04-18',
    format: 'IPL',
    runs: '11',
    opponent: 'Rajasthan Royals',
    venue: 'Newlands, Cape Town',
    source: 'IPL',
    isCentury: false,
    isZero: false
  },
  {
    id: 'ipl-2009-02',
    date: '2009-05-03',
    format: 'IPL',
    runs: '50',
    opponent: 'Deccan Chargers',
    venue: 'St George\'s Park, Port Elizabeth',
    source: 'IPL',
    isCentury: false,
    isZero: false,
    notes: 'Maiden IPL Half-Century.'
  },
  {
    id: 'ipl-2009-03',
    date: '2009-05-19',
    format: 'IPL',
    runs: '19',
    opponent: 'Delhi Daredevils',
    venue: 'Wanderers, Johannesburg',
    source: 'IPL',
    isCentury: false,
    isZero: false
  },
  {
    id: 'ipl-2009-04',
    date: '2009-05-24',
    format: 'IPL',
    runs: '7',
    opponent: 'Deccan Chargers',
    venue: 'Wanderers, Johannesburg',
    source: 'IPL',
    isCentury: false,
    isZero: false,
    notes: '2009 IPL Final match.'
  },
  {
    id: 'icc-2009-01',
    date: '2009-09-28',
    format: 'ODI',
    runs: '16',
    opponent: 'West Indies',
    venue: 'Wanderers, Johannesburg',
    source: 'ICC',
    isCentury: false,
    isZero: false
  },
  {
    id: 'icc-2009-02',
    date: '2009-09-30',
    format: 'ODI',
    runs: '79*',
    opponent: 'West Indies',
    venue: 'Centurion',
    source: 'ICC',
    isCentury: false,
    isZero: false,
    notes: 'Match-winning 79* in Champions Trophy.'
  },
  {
    id: 'icc-2009-03',
    date: '2009-10-25',
    format: 'ODI',
    runs: '30',
    opponent: 'Australia',
    venue: 'Moti Bagh Stadium, Vadodara',
    source: 'ICC',
    isCentury: false,
    isZero: false
  },
  {
    id: 'icc-2009-04',
    date: '2009-11-02',
    format: 'ODI',
    runs: '10',
    opponent: 'Australia',
    venue: 'PCA Stadium, Mohali',
    source: 'ICC',
    isCentury: false,
    isZero: false
  },
  {
    id: 'icc-2009-05',
    date: '2009-12-18',
    format: 'ODI',
    runs: '54',
    opponent: 'Sri Lanka',
    venue: 'VCA Stadium, Nagpur',
    source: 'ICC',
    isCentury: false,
    isZero: false
  },
  {
    id: 'icc-2009-06',
    date: '2009-12-24',
    format: 'ODI',
    runs: '107',
    opponent: 'Sri Lanka',
    venue: 'Eden Gardens, Kolkata',
    source: 'ICC',
    isCentury: true,
    isZero: false,
    notes: 'MAIDEN INTERNATIONAL ODI CENTURY! Handed Man of the Match trophy to Gautam Gambhir.'
  },

  // ==========================================
  // 2010 SEASON
  // ==========================================
  {
    id: 'icc-2010-01',
    date: '2010-01-07',
    format: 'ODI',
    runs: '91',
    opponent: 'Bangladesh',
    venue: 'Sher-e-Bangla Stadium, Mirpur',
    source: 'ICC',
    isCentury: false,
    isZero: false
  },
  {
    id: 'icc-2010-02',
    date: '2010-01-11',
    format: 'ODI',
    runs: '102*',
    opponent: 'Bangladesh',
    venue: 'Sher-e-Bangla Stadium, Mirpur',
    source: 'ICC',
    isCentury: true,
    isZero: false,
    notes: '2nd International ODI Century in run chase.'
  },
  {
    id: 'icc-2010-03',
    date: '2010-01-13',
    format: 'ODI',
    runs: '71*',
    opponent: 'Sri Lanka',
    venue: 'Sher-e-Bangla Stadium, Mirpur',
    source: 'ICC',
    isCentury: false,
    isZero: false
  },
  {
    id: 'ipl-2010-01',
    date: '2010-03-25',
    format: 'IPL',
    runs: '38',
    opponent: 'Chennai Super Kings',
    venue: 'M. Chinnaswamy Stadium, Bengaluru',
    source: 'IPL',
    isCentury: false,
    isZero: false
  },
  {
    id: 'ipl-2010-02',
    date: '2010-04-17',
    format: 'IPL',
    runs: '42',
    opponent: 'Deccan Chargers',
    venue: 'M. Chinnaswamy Stadium, Bengaluru',
    source: 'IPL',
    isCentury: false,
    isZero: false
  },
  {
    id: 'icc-2010-04',
    date: '2010-06-12',
    format: 'T20I',
    runs: '28*',
    opponent: 'Zimbabwe',
    venue: 'Harare Sports Club, Harare',
    source: 'ICC',
    isCentury: false,
    isZero: false,
    notes: 'INTERNATIONAL T20I DEBUT for India.'
  },
  {
    id: 'icc-2010-05',
    date: '2010-06-13',
    format: 'T20I',
    runs: '21',
    opponent: 'Zimbabwe',
    venue: 'Harare Sports Club, Harare',
    source: 'ICC',
    isCentury: false,
    isZero: false
  },
  {
    id: 'icc-2010-06',
    date: '2010-08-25',
    format: 'ODI',
    runs: '0',
    opponent: 'Sri Lanka',
    venue: 'Rangiri Dambulla International Stadium',
    source: 'ICC',
    isCentury: false,
    isZero: true
  },
  {
    id: 'icc-2010-07',
    date: '2010-10-20',
    format: 'ODI',
    runs: '118',
    opponent: 'Australia',
    venue: 'ACA-VDCA Stadium, Vizag',
    source: 'ICC',
    isCentury: true,
    isZero: false,
    notes: '3rd ODI Century in successful 290-run chase.'
  },
  {
    id: 'icc-2010-08',
    date: '2010-11-28',
    format: 'ODI',
    runs: '105',
    opponent: 'New Zealand',
    venue: 'Nehru Stadium, Guwahati',
    source: 'ICC',
    isCentury: true,
    isZero: false,
    notes: '4th ODI Century.'
  },
  {
    id: 'icc-2010-09',
    date: '2010-12-04',
    format: 'ODI',
    runs: '64',
    opponent: 'New Zealand',
    venue: 'Reliance Stadium, Vadodara',
    source: 'ICC',
    isCentury: false,
    isZero: false
  },
  {
    id: 'icc-2010-10',
    date: '2010-12-07',
    format: 'ODI',
    runs: '63*',
    opponent: 'New Zealand',
    venue: 'M. Chinnaswamy Stadium, Bengaluru',
    source: 'ICC',
    isCentury: false,
    isZero: false
  },

  // ==========================================
  // 2011 SEASON (WORLD CUP CHAMPION)
  // ==========================================
  {
    id: 'icc-2011-01',
    date: '2011-01-18',
    format: 'ODI',
    runs: '87*',
    opponent: 'South Africa',
    venue: 'St George\'s Park, Port Elizabeth',
    source: 'ICC',
    isCentury: false,
    isZero: false
  },
  {
    id: 'icc-2011-02',
    date: '2011-02-19',
    format: 'ODI',
    runs: '100*',
    opponent: 'Bangladesh',
    venue: 'Sher-e-Bangla Stadium, Mirpur',
    source: 'ICC',
    isCentury: true,
    isZero: false,
    notes: 'ICC WORLD CUP DEBUT CENTURY! First Indian to score century on CWC debut.'
  },
  {
    id: 'icc-2011-03',
    date: '2011-02-27',
    format: 'ODI',
    runs: '24',
    opponent: 'England',
    venue: 'M. Chinnaswamy Stadium, Bengaluru',
    source: 'ICC',
    isCentury: false,
    isZero: false
  },
  {
    id: 'icc-2011-04',
    date: '2011-03-12',
    format: 'ODI',
    runs: '12',
    opponent: 'South Africa',
    venue: 'VCA Stadium, Nagpur',
    source: 'ICC',
    isCentury: false,
    isZero: false
  },
  {
    id: 'icc-2011-05',
    date: '2011-03-24',
    format: 'ODI',
    runs: '24',
    opponent: 'Australia',
    venue: 'Sardar Patel Stadium, Ahmedabad',
    source: 'ICC',
    isCentury: false,
    isZero: false,
    notes: 'World Cup Quarter-Final victory.'
  },
  {
    id: 'icc-2011-06',
    date: '2011-03-30',
    format: 'ODI',
    runs: '9',
    opponent: 'Pakistan',
    venue: 'PCA Stadium, Mohali',
    source: 'ICC',
    isCentury: false,
    isZero: false,
    notes: 'World Cup Semi-Final victory.'
  },
  {
    id: 'icc-2011-07',
    date: '2011-04-02',
    format: 'ODI',
    runs: '35',
    opponent: 'Sri Lanka',
    venue: 'Wankhede Stadium, Mumbai',
    source: 'ICC',
    isCentury: false,
    isZero: false,
    notes: 'WORLD CUP WINNER! Crucial 83-run partnership with Gautam Gambhir in Final.'
  },
  {
    id: 'ipl-2011-01',
    date: '2011-04-29',
    format: 'IPL',
    runs: '56',
    opponent: 'Pune Warriors India',
    venue: 'M. Chinnaswamy Stadium, Bengaluru',
    source: 'IPL',
    isCentury: false,
    isZero: false
  },
  {
    id: 'ipl-2011-02',
    date: '2011-05-06',
    format: 'IPL',
    runs: '71',
    opponent: 'Kings XI Punjab',
    venue: 'M. Chinnaswamy Stadium, Bengaluru',
    source: 'IPL',
    isCentury: false,
    isZero: false
  },
  {
    id: 'icc-2011-08',
    date: '2011-06-20',
    format: 'TEST',
    runs: '4',
    opponent: 'West Indies',
    venue: 'Sabina Park, Kingston, Jamaica',
    source: 'ICC',
    isCentury: false,
    isZero: false,
    notes: 'INTERNATIONAL TEST CRICKET DEBUT for India.'
  },
  {
    id: 'icc-2011-09',
    date: '2011-06-28',
    format: 'TEST',
    runs: '0',
    opponent: 'West Indies',
    venue: 'Kensington Oval, Bridgetown, Barbados',
    source: 'ICC',
    isCentury: false,
    isZero: true
  },
  {
    id: 'icc-2011-10',
    date: '2011-07-09',
    format: 'TEST',
    runs: '30',
    opponent: 'West Indies',
    venue: 'Windsor Park, Roseau, Dominica',
    source: 'ICC',
    isCentury: false,
    isZero: false
  },
  {
    id: 'icc-2011-11',
    date: '2011-09-11',
    format: 'ODI',
    runs: '107',
    opponent: 'England',
    venue: 'Sophia Gardens, Cardiff',
    source: 'ICC',
    isCentury: true,
    isZero: false,
    notes: 'First ODI century in England.'
  },
  {
    id: 'icc-2011-12',
    date: '2011-09-16',
    format: 'ODI',
    runs: '112*',
    opponent: 'England',
    venue: 'Feroz Shah Kotla, Delhi',
    source: 'ICC',
    isCentury: true,
    isZero: false,
    notes: 'Unbeaten 112* in home town Delhi.'
  },
  {
    id: 'icc-2011-13',
    date: '2011-11-22',
    format: 'TEST',
    runs: '52',
    opponent: 'West Indies',
    venue: 'Wankhede Stadium, Mumbai',
    source: 'ICC',
    isCentury: false,
    isZero: false,
    notes: 'Maiden Test Fifty.'
  },
  {
    id: 'icc-2011-14',
    date: '2011-11-25',
    format: 'TEST',
    runs: '63',
    opponent: 'West Indies',
    venue: 'Wankhede Stadium, Mumbai',
    source: 'ICC',
    isCentury: false,
    isZero: false
  },

  // ==========================================
  // 2012 SEASON (HOBART MIRACLE & 183 VS PAKISTAN)
  // ==========================================
  {
    id: 'icc-2012-01',
    date: '2012-01-24',
    format: 'TEST',
    runs: '116',
    opponent: 'Australia',
    venue: 'Adelaide Oval, Adelaide',
    source: 'ICC',
    isCentury: true,
    isZero: false,
    notes: 'MAIDEN TEST CENTURY! Sole Indian century during 2011/12 Australia tour.'
  },
  {
    id: 'icc-2012-02',
    date: '2012-02-28',
    format: 'ODI',
    runs: '133*',
    opponent: 'Sri Lanka',
    venue: 'Bellerive Oval, Hobart',
    source: 'ICC',
    isCentury: true,
    isZero: false,
    notes: 'THE HOBART MIRACLE. Annihilated Lasith Malinga, chasing 321 in 36.4 overs!'
  },
  {
    id: 'icc-2012-03',
    date: '2012-03-18',
    format: 'ODI',
    runs: '183',
    opponent: 'Pakistan',
    venue: 'Sher-e-Bangla Stadium, Mirpur',
    source: 'ICC',
    isCentury: true,
    isZero: false,
    notes: 'CAREER-HIGHEST ODI SCORE (183 off 148). Highest individual score in Asia Cup history!'
  },
  {
    id: 'ipl-2012-01',
    date: '2012-04-07',
    format: 'IPL',
    runs: '57',
    opponent: 'Chennai Super Kings',
    venue: 'MA Chidambaram Stadium, Chennai',
    source: 'IPL',
    isCentury: false,
    isZero: false
  },
  {
    id: 'ipl-2012-02',
    date: '2012-05-06',
    format: 'IPL',
    runs: '73*',
    opponent: 'Deccan Chargers',
    venue: 'Rajiv Gandhi International Stadium, Hyderabad',
    source: 'IPL',
    isCentury: false,
    isZero: false
  },
  {
    id: 'icc-2012-04',
    date: '2012-07-21',
    format: 'ODI',
    runs: '106',
    opponent: 'Sri Lanka',
    venue: 'Mahinda Rajapaksa International Stadium, Hambantota',
    source: 'ICC',
    isCentury: true,
    isZero: false
  },
  {
    id: 'icc-2012-05',
    date: '2012-07-28',
    format: 'ODI',
    runs: '128*',
    opponent: 'Sri Lanka',
    venue: 'R. Premadasa Stadium, Colombo',
    source: 'ICC',
    isCentury: true,
    isZero: false
  },
  {
    id: 'icc-2012-06',
    date: '2012-08-31',
    format: 'TEST',
    runs: '103',
    opponent: 'New Zealand',
    venue: 'M. Chinnaswamy Stadium, Bengaluru',
    source: 'ICC',
    isCentury: true,
    isZero: false,
    notes: '2nd Test Century & Man of the Match.'
  },
  {
    id: 'icc-2012-07',
    date: '2012-09-23',
    format: 'T20I',
    runs: '78*',
    opponent: 'Pakistan',
    venue: 'R. Premadasa Stadium, Colombo',
    source: 'ICC',
    isCentury: false,
    isZero: false,
    notes: 'T20 World Cup match-winning 78*.'
  },
  {
    id: 'icc-2012-08',
    date: '2012-12-13',
    format: 'TEST',
    runs: '103',
    opponent: 'England',
    venue: 'VCA Stadium, Nagpur',
    source: 'ICC',
    isCentury: true,
    isZero: false,
    notes: 'Resilient 103 on slow turning track.'
  },

  // ==========================================
  // 2013 SEASON (CHAMPIONS TROPHY & FASTEST ODI 100)
  // ==========================================
  {
    id: 'icc-2013-01',
    date: '2013-01-06',
    format: 'ODI',
    runs: '0',
    opponent: 'Pakistan',
    venue: 'Feroz Shah Kotla, Delhi',
    source: 'ICC',
    isCentury: false,
    isZero: true
  },
  {
    id: 'icc-2013-02',
    date: '2013-01-23',
    format: 'ODI',
    runs: '77*',
    opponent: 'England',
    venue: 'JSCA International Stadium, Ranchi',
    source: 'ICC',
    isCentury: false,
    isZero: false
  },
  {
    id: 'icc-2013-03',
    date: '2013-02-22',
    format: 'TEST',
    runs: '107',
    opponent: 'Australia',
    venue: 'MA Chidambaram Stadium, Chennai',
    source: 'ICC',
    isCentury: true,
    isZero: false,
    notes: 'Border-Gavaskar Trophy century.'
  },
  {
    id: 'ipl-2013-01',
    date: '2013-04-11',
    format: 'IPL',
    runs: '58',
    opponent: 'Kolkata Knight Riders',
    venue: 'M. Chinnaswamy Stadium, Bengaluru',
    source: 'IPL',
    isCentury: false,
    isZero: false
  },
  {
    id: 'ipl-2013-02',
    date: '2013-04-27',
    format: 'IPL',
    runs: '99',
    opponent: 'Delhi Daredevils',
    venue: 'Feroz Shah Kotla, Delhi',
    source: 'IPL',
    isCentury: false,
    isZero: false,
    notes: 'Heartbreaking run out on 99.'
  },
  {
    id: 'icc-2013-04',
    date: '2013-06-23',
    format: 'ODI',
    runs: '43',
    opponent: 'England',
    venue: 'Edgbaston, Birmingham',
    source: 'ICC',
    isCentury: false,
    isZero: false,
    notes: 'CHAMPIONS TROPHY WINNER! Highest scorer in rain-curtailed Final.'
  },
  {
    id: 'icc-2013-05',
    date: '2013-07-05',
    format: 'ODI',
    runs: '102',
    opponent: 'West Indies',
    venue: 'Queen\'s Park Oval, Port of Spain',
    source: 'ICC',
    isCentury: true,
    isZero: false,
    notes: 'Century as Stand-in ODI Captain.'
  },
  {
    id: 'icc-2013-06',
    date: '2013-07-24',
    format: 'ODI',
    runs: '115',
    opponent: 'Zimbabwe',
    venue: 'Harare Sports Club, Harare',
    source: 'ICC',
    isCentury: true,
    isZero: false
  },
  {
    id: 'icc-2013-07',
    date: '2013-10-16',
    format: 'ODI',
    runs: '100*',
    opponent: 'Australia',
    venue: 'Sawai Mansingh Stadium, Jaipur',
    source: 'ICC',
    isCentury: true,
    isZero: false,
    notes: 'FASTEST ODI CENTURY BY AN INDIAN (52 balls) chasing 360!'
  },
  {
    id: 'icc-2013-08',
    date: '2013-10-30',
    format: 'ODI',
    runs: '115*',
    opponent: 'Australia',
    venue: 'VCA Stadium, Nagpur',
    source: 'ICC',
    isCentury: true,
    isZero: false,
    notes: '115* off 66 balls in another massive 350+ run chase.'
  },
  {
    id: 'icc-2013-09',
    date: '2013-12-18',
    format: 'TEST',
    runs: '119',
    opponent: 'South Africa',
    venue: 'Wanderers, Johannesburg',
    source: 'ICC',
    isCentury: true,
    isZero: false,
    notes: 'Masterclass 119 in South Africa.'
  },
  {
    id: 'icc-2013-10',
    date: '2013-12-22',
    format: 'TEST',
    runs: '96',
    opponent: 'South Africa',
    venue: 'Wanderers, Johannesburg',
    source: 'ICC',
    isCentury: false,
    isZero: false
  },

  // ==========================================
  // 2014 SEASON (ADELAIDE DEBUT & T20 WC PLAYER OF THE TOURNAMENT)
  // ==========================================
  {
    id: 'icc-2014-01',
    date: '2014-01-19',
    format: 'ODI',
    runs: '105',
    opponent: 'New Zealand',
    venue: 'McLean Park, Napier',
    source: 'ICC',
    isCentury: true,
    isZero: false
  },
  {
    id: 'icc-2014-02',
    date: '2014-02-14',
    format: 'TEST',
    runs: '105*',
    opponent: 'New Zealand',
    venue: 'Basin Reserve, Wellington',
    source: 'ICC',
    isCentury: true,
    isZero: false
  },
  {
    id: 'icc-2014-03',
    date: '2014-03-21',
    format: 'T20I',
    runs: '36',
    opponent: 'Pakistan',
    venue: 'Sher-e-Bangla Stadium, Mirpur',
    source: 'ICC',
    isCentury: false,
    isZero: false
  },
  {
    id: 'icc-2014-04',
    date: '2014-03-30',
    format: 'T20I',
    runs: '54',
    opponent: 'Australia',
    venue: 'Sher-e-Bangla Stadium, Mirpur',
    source: 'ICC',
    isCentury: false,
    isZero: false
  },
  {
    id: 'icc-2014-05',
    date: '2014-04-04',
    format: 'T20I',
    runs: '72*',
    opponent: 'South Africa',
    venue: 'Sher-e-Bangla Stadium, Mirpur',
    source: 'ICC',
    isCentury: false,
    isZero: false,
    notes: 'T20 World Cup Semi-Final masterclass 72* off 44 balls.'
  },
  {
    id: 'icc-2014-06',
    date: '2014-04-06',
    format: 'T20I',
    runs: '77',
    opponent: 'Sri Lanka',
    venue: 'Sher-e-Bangla Stadium, Mirpur',
    source: 'ICC',
    isCentury: false,
    isZero: false,
    notes: 'PLAYER OF THE TOURNAMENT in T20 World Cup 2014 (319 runs).'
  },
  {
    id: 'ipl-2014-01',
    date: '2014-05-24',
    format: 'IPL',
    runs: '73',
    opponent: 'Chennai Super Kings',
    venue: 'JSCA International Stadium, Ranchi',
    source: 'IPL',
    isCentury: false,
    isZero: false
  },
  {
    id: 'icc-2014-07',
    date: '2014-07-10',
    format: 'TEST',
    runs: '1',
    opponent: 'England',
    venue: 'Trent Bridge, Nottingham',
    source: 'ICC',
    isCentury: false,
    isZero: false
  },
  {
    id: 'icc-2014-08',
    date: '2014-07-17',
    format: 'TEST',
    runs: '0',
    opponent: 'England',
    venue: 'Lord\'s, London',
    source: 'ICC',
    isCentury: false,
    isZero: true
  },
  {
    id: 'icc-2014-09',
    date: '2014-10-17',
    format: 'ODI',
    runs: '62',
    opponent: 'West Indies',
    venue: 'Feroz Shah Kotla, Delhi',
    source: 'ICC',
    isCentury: false,
    isZero: false
  },
  {
    id: 'icc-2014-10',
    date: '2014-10-20',
    format: 'ODI',
    runs: '127',
    opponent: 'West Indies',
    venue: 'HPCA Stadium, Dharamshala',
    source: 'ICC',
    isCentury: true,
    isZero: false
  },
  {
    id: 'icc-2014-11',
    date: '2014-11-16',
    format: 'ODI',
    runs: '139*',
    opponent: 'Sri Lanka',
    venue: 'JSCA International Stadium, Ranchi',
    source: 'ICC',
    isCentury: true,
    isZero: false,
    notes: 'Captain\'s 139* leading 5-0 series whitewash.'
  },
  {
    id: 'icc-2014-12',
    date: '2014-12-09',
    format: 'TEST',
    runs: '115',
    opponent: 'Australia',
    venue: 'Adelaide Oval, Adelaide',
    source: 'ICC',
    isCentury: true,
    isZero: false,
    notes: 'TEST CAPTAINCY DEBUT CENTURY! Scored 115 in 1st innings.'
  },
  {
    id: 'icc-2014-13',
    date: '2014-12-13',
    format: 'TEST',
    runs: '141',
    opponent: 'Australia',
    venue: 'Adelaide Oval, Adelaide',
    source: 'ICC',
    isCentury: true,
    isZero: false,
    notes: 'TWIN CENTURIES ON CAPTAINCY DEBUT! Heroic 141 in 364-run chase.'
  },
  {
    id: 'icc-2014-14',
    date: '2014-12-26',
    format: 'TEST',
    runs: '169',
    opponent: 'Australia',
    venue: 'MCG, Melbourne',
    source: 'ICC',
    isCentury: true,
    isZero: false,
    notes: 'Sensational 169 alongside Ajinkya Rahane at MCG.'
  },

  // ==========================================
  // 2015 SEASON (SCG 147 & CWC 107 VS PAKISTAN)
  // ==========================================
  {
    id: 'icc-2015-01',
    date: '2015-01-06',
    format: 'TEST',
    runs: '147',
    opponent: 'Australia',
    venue: 'SCG, Sydney',
    source: 'ICC',
    isCentury: true,
    isZero: false,
    notes: '4th Century of 2014/15 Border-Gavaskar Trophy.'
  },
  {
    id: 'icc-2015-02',
    date: '2015-02-15',
    format: 'ODI',
    runs: '107',
    opponent: 'Pakistan',
    venue: 'Adelaide Oval, Adelaide',
    source: 'ICC',
    isCentury: true,
    isZero: false,
    notes: 'WORLD CUP CENTURY VS PAKISTAN! First Indian to score CWC century vs Pakistan.'
  },
  {
    id: 'icc-2015-03',
    date: '2015-02-22',
    format: 'ODI',
    runs: '46',
    opponent: 'South Africa',
    venue: 'MCG, Melbourne',
    source: 'ICC',
    isCentury: false,
    isZero: false
  },
  {
    id: 'icc-2015-04',
    date: '2015-03-10',
    format: 'ODI',
    runs: '44*',
    opponent: 'Ireland',
    venue: 'Seddon Park, Hamilton',
    source: 'ICC',
    isCentury: false,
    isZero: false
  },
  {
    id: 'icc-2015-05',
    date: '2015-03-19',
    format: 'ODI',
    runs: '3',
    opponent: 'Bangladesh',
    venue: 'MCG, Melbourne',
    source: 'ICC',
    isCentury: false,
    isZero: false
  },
  {
    id: 'icc-2015-06',
    date: '2015-03-26',
    format: 'ODI',
    runs: '1',
    opponent: 'Australia',
    venue: 'SCG, Sydney',
    source: 'ICC',
    isCentury: false,
    isZero: false,
    notes: 'World Cup 2015 Semi-Final.'
  },
  {
    id: 'ipl-2015-01',
    date: '2015-04-11',
    format: 'IPL',
    runs: '27',
    opponent: 'Kolkata Knight Riders',
    venue: 'Eden Gardens, Kolkata',
    source: 'IPL',
    isCentury: false,
    isZero: false
  },
  {
    id: 'ipl-2015-02',
    date: '2015-04-26',
    format: 'IPL',
    runs: '51',
    opponent: 'Rajasthan Royals',
    venue: 'Sardar Patel Stadium, Ahmedabad',
    source: 'IPL',
    isCentury: false,
    isZero: false
  },
  {
    id: 'ipl-2015-03',
    date: '2015-05-10',
    format: 'IPL',
    runs: '82*',
    opponent: 'Mumbai Indians',
    venue: 'Wankhede Stadium, Mumbai',
    source: 'IPL',
    isCentury: false,
    isZero: false,
    notes: 'Match-winning 82* partnering AB de Villiers (133*).'
  },
  {
    id: 'ipl-2015-04',
    date: '2015-05-17',
    format: 'IPL',
    runs: '44*',
    opponent: 'Sunrisers Hyderabad',
    venue: 'Rajiv Gandhi International Stadium, Hyderabad',
    source: 'IPL',
    isCentury: false,
    isZero: false
  },
  {
    id: 'icc-2015-07',
    date: '2015-08-12',
    format: 'TEST',
    runs: '103',
    opponent: 'Sri Lanka',
    venue: 'Galle International Stadium, Galle',
    source: 'ICC',
    isCentury: true,
    isZero: false,
    notes: 'First Test victory as full-time Test Captain.'
  },
  {
    id: 'icc-2015-08',
    date: '2015-10-02',
    format: 'T20I',
    runs: '43',
    opponent: 'South Africa',
    venue: 'HPCA Stadium, Dharamshala',
    source: 'ICC',
    isCentury: false,
    isZero: false
  },
  {
    id: 'icc-2015-09',
    date: '2015-10-22',
    format: 'ODI',
    runs: '138',
    opponent: 'South Africa',
    venue: 'MA Chidambaram Stadium, Chennai',
    source: 'ICC',
    isCentury: true,
    isZero: false,
    notes: 'Heroic 138 under severe heat and cramps.'
  },
  {
    id: 'icc-2015-10',
    date: '2015-11-05',
    format: 'TEST',
    runs: '1',
    opponent: 'South Africa',
    venue: 'PCA Stadium, Mohali',
    source: 'ICC',
    isCentury: false,
    isZero: false
  },
  {
    id: 'icc-2015-11',
    date: '2015-12-03',
    format: 'TEST',
    runs: '44',
    opponent: 'South Africa',
    venue: 'Feroz Shah Kotla, Delhi',
    source: 'ICC',
    isCentury: false,
    isZero: false
  },
  {
    id: 'icc-2015-12',
    date: '2015-12-05',
    format: 'TEST',
    runs: '88',
    opponent: 'South Africa',
    venue: 'Feroz Shah Kotla, Delhi',
    source: 'ICC',
    isCentury: false,
    isZero: false,
    notes: 'Secured 3-0 historic Test series triumph over South Africa.'
  },

  // ==========================================
  // 2016 - 2026 HIGHLIGHTS (PEAK YEARS TO PRESENT)
  // ==========================================
  {
    id: 'icc-2016-01',
    date: '2016-03-27',
    format: 'T20I',
    runs: '82*',
    opponent: 'Australia',
    venue: 'PCA Stadium, Mohali',
    source: 'ICC',
    isCentury: false,
    isZero: false,
    notes: 'Peak T20 chase masterclass in T20 World Cup quarter-final.'
  },
  {
    id: 'ipl-2016-01',
    date: '2016-05-18',
    format: 'IPL',
    runs: '113',
    opponent: 'Kings XI Punjab',
    venue: 'M. Chinnaswamy Stadium, Bengaluru',
    source: 'IPL',
    isCentury: true,
    isZero: false,
    notes: 'Scored 113 off 50 balls with 9 stitches on hand (IPL record 973-run season).'
  },
  {
    id: 'ipl-2016-02',
    date: '2016-05-14',
    format: 'IPL',
    runs: '109',
    opponent: 'Gujarat Lions',
    venue: 'M. Chinnaswamy Stadium, Bengaluru',
    source: 'IPL',
    isCentury: true,
    isZero: false,
    notes: 'Century alongside AB de Villiers.'
  },
  {
    id: 'icc-2016-02',
    date: '2016-12-11',
    format: 'TEST',
    runs: '235',
    opponent: 'England',
    venue: 'Wankhede Stadium, Mumbai',
    source: 'ICC',
    isCentury: true,
    isZero: false,
    notes: 'Highest Test score as captain at Wankhede.'
  },
  {
    id: 'icc-2017-01',
    date: '2017-12-02',
    format: 'TEST',
    runs: '243',
    opponent: 'Sri Lanka',
    venue: 'Feroz Shah Kotla, Delhi',
    source: 'ICC',
    isCentury: true,
    isZero: false,
    notes: 'Back-to-back double century in Delhi.'
  },
  {
    id: 'icc-2018-01',
    date: '2018-10-24',
    format: 'ODI',
    runs: '157*',
    opponent: 'West Indies',
    venue: 'ACA-VDCA Stadium, Vizag',
    source: 'ICC',
    isCentury: true,
    isZero: false,
    notes: 'Fastest player to reach 10,000 ODI runs in history!'
  },
  {
    id: 'icc-2018-02',
    date: '2018-08-02',
    format: 'TEST',
    runs: '149',
    opponent: 'England',
    venue: 'Edgbaston, Birmingham',
    source: 'ICC',
    isCentury: true,
    isZero: false,
    notes: 'Masterful 149 rescuing India in England.'
  },
  {
    id: 'icc-2019-01',
    date: '2019-11-23',
    format: 'TEST',
    runs: '136',
    opponent: 'Bangladesh',
    venue: 'Eden Gardens, Kolkata',
    source: 'ICC',
    isCentury: true,
    isZero: false,
    notes: 'First Pink-Ball Day/Night Test Century for India.'
  },
  {
    id: 'icc-2019-02',
    date: '2019-10-11',
    format: 'TEST',
    runs: '254*',
    opponent: 'South Africa',
    venue: 'MCA Stadium, Pune',
    source: 'ICC',
    isCentury: true,
    isZero: false,
    notes: 'Career-best 254* double century in Test cricket.'
  },
  {
    id: 'icc-2021-01',
    date: '2021-02-13',
    format: 'TEST',
    runs: '0',
    opponent: 'England',
    venue: 'MA Chidambaram Stadium, Chennai',
    source: 'ICC',
    isCentury: false,
    isZero: true,
    notes: 'Dismissed early on turning Chennai pitch.'
  },
  {
    id: 'icc-2022-01',
    date: '2022-10-23',
    format: 'T20I',
    runs: '82*',
    opponent: 'Pakistan',
    venue: 'MCG, Melbourne',
    source: 'ICC',
    isCentury: false,
    isZero: false,
    notes: 'THE MCG MIRACLE. Iconic "Shot of the Century" over Haris Rauf in T20 WC.'
  },
  {
    id: 'icc-2022-02',
    date: '2022-09-08',
    format: 'T20I',
    runs: '122*',
    opponent: 'Afghanistan',
    venue: 'Dubai International Stadium, Dubai',
    source: 'ICC',
    isCentury: true,
    isZero: false,
    notes: '71st International Century! First T20I Hundred off 61 balls.'
  },
  {
    id: 'icc-2023-01',
    date: '2023-11-15',
    format: 'ODI',
    runs: '117',
    opponent: 'New Zealand',
    venue: 'Wankhede Stadium, Mumbai',
    source: 'ICC',
    isCentury: true,
    isZero: false,
    notes: 'RECORD-BREAKING 50th ODI CENTURY! Overtook Sachin Tendulkar in CWC Semi-Final.'
  },
  {
    id: 'icc-2023-02',
    date: '2023-11-05',
    format: 'ODI',
    runs: '101*',
    opponent: 'South Africa',
    venue: 'Eden Gardens, Kolkata',
    source: 'ICC',
    isCentury: true,
    isZero: false,
    notes: '35th Birthday Century on a turning track.'
  },
  {
    id: 'icc-2023-03',
    date: '2023-03-12',
    format: 'TEST',
    runs: '186',
    opponent: 'Australia',
    venue: 'Narendra Modi Stadium, Ahmedabad',
    source: 'ICC',
    isCentury: true,
    isZero: false,
    notes: 'Epic 186 in Border-Gavaskar Trophy.'
  },
  {
    id: 'ipl-2023-01',
    date: '2023-05-21',
    format: 'IPL',
    runs: '101*',
    opponent: 'Gujarat Titans',
    venue: 'M. Chinnaswamy Stadium, Bengaluru',
    source: 'IPL',
    isCentury: true,
    isZero: false,
    notes: 'Back-to-back IPL Century off 61 balls.'
  },
  {
    id: 'icc-2024-01',
    date: '2024-06-29',
    format: 'T20I',
    runs: '76',
    opponent: 'South Africa',
    venue: 'Kensington Oval, Barbados',
    source: 'ICC',
    isCentury: false,
    isZero: false,
    notes: 'Player of the Match in T20 World Cup 2024 Final victory!'
  },
  {
    id: 'ipl-2024-01',
    date: '2024-05-18',
    format: 'IPL',
    runs: '47',
    opponent: 'Chennai Super Kings',
    venue: 'M. Chinnaswamy Stadium, Bengaluru',
    source: 'IPL',
    isCentury: false,
    isZero: false,
    notes: 'Crucial knockout qualifier win to secure playoff spot.'
  },
  {
    id: 'ipl-2024-02',
    date: '2024-04-06',
    format: 'IPL',
    runs: '113*',
    opponent: 'Rajasthan Royals',
    venue: 'Sawai Mansingh Stadium, Jaipur',
    source: 'IPL',
    isCentury: true,
    isZero: false,
    notes: '8th IPL Century off 67 balls.'
  },
  {
    id: 'icc-2026-01',
    date: '2026-07-19',
    format: 'ODI',
    runs: '74',
    opponent: 'England',
    venue: 'Lord\'s, London',
    source: 'ICC',
    isCentury: false,
    isZero: false,
    notes: 'Gritty 74 anchoring middle overs.'
  },
  {
    id: 'icc-2026-02',
    date: '2026-03-22',
    format: 'ODI',
    runs: '108*',
    opponent: 'Sri Lanka',
    venue: 'R. Premadasa Stadium, Colombo',
    source: 'ICC',
    isCentury: true,
    isZero: false,
    notes: 'Flawless century in run chase.'
  },
  {
    id: 'icc-2026-03',
    date: '2026-01-14',
    format: 'TEST',
    runs: '89',
    opponent: 'South Africa',
    venue: 'Newlands, Cape Town',
    source: 'ICC',
    isCentury: false,
    isZero: false,
    notes: 'Gritty 89 under seam movement.'
  }
];
