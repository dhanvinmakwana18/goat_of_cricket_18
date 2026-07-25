import { GroundedChunk } from './types';

export class GroundingFetcher {
  private static WIKI_API_URL = 'https://en.wikipedia.org/w/api.php';

  /**
   * Official curated ICC statistics and record feeds
   */
  public static getIccOfficialFeeds(): GroundedChunk[] {
    return [
      {
        id: 'icc-overall-summary',
        source: 'ICC_OFFICIAL',
        title: 'Virat Kohli — Official ICC Career Summary',
        url: 'https://www.icc-cricket.com/stats/player-rankings/virat-kohli',
        content: `[Context: Official ICC Career Summary]
Virat Kohli international career statistics:
- Total International Matches: 535+ matches across Tests, ODIs, and T20Is.
- Total International Runs: 27,000+ runs with an average over 53.0.
- Total International Centuries: 80 hundreds (50 in ODIs, 29 in Tests, 1 in T20Is). Second only to Sachin Tendulkar (100 hundreds).
- Total Half-Centuries: 140+ international fifties.
- ODI Statistics: 295+ ODIs, 13,900+ runs, average 58.18, 50 centuries, highest score 183 vs Pakistan (2012 Asia Cup).
- Test Statistics: 118 Tests, 9,000+ runs, average 48.74, 29 centuries, 7 double centuries, highest score 254* vs South Africa (2019).
- T20I Statistics: 125 T20Is, 4,188 runs, average 48.69, strike rate 137.04, 1 century (122* vs Afghanistan 2022 Asia Cup), 38 fifties.
- ICC Player of the Decade (2010s), Sir Garfield Sobers Trophy winner twice (2017, 2018), ICC ODI Player of the Year 4 times (2012, 2017, 2018, 2023).`,
        metadata: { format: 'ALL', isMilestone: true }
      },
      {
        id: 'icc-50th-century',
        source: 'ICC_OFFICIAL',
        title: 'Virat Kohli — 50th ODI Century World Record (2023 CWC Semi-Final)',
        url: 'https://www.icc-cricket.com/news/kohli-breaks-tendulkar-record-50th-odi-century',
        content: `[Context: 50th ODI Century & World Cup Record]
On November 15, 2023, at Wankhede Stadium, Mumbai during the ICC Cricket World Cup Semi-Final vs New Zealand:
- Virat Kohli scored 117 runs off 113 balls (9 fours, 2 sixes).
- This was his 50th ODI century, surpassing Sachin Tendulkar's long-standing record of 49 ODI centuries in front of Sachin himself.
- In the 2023 ICC World Cup, Kohli scored 765 runs in 11 innings at an average of 95.62, breaking Sachin Tendulkar's record (673 runs in 2003) for the most runs in a single World Cup edition.
- Awarded Player of the Tournament in the 2023 ICC World Cup.`,
        metadata: { format: 'ODI', year: 2023, opponent: 'New Zealand', runsScored: 117, isMilestone: true }
      },
      {
        id: 'icc-mcg-miracle-82',
        source: 'ICC_OFFICIAL',
        title: 'Virat Kohli — 82* vs Pakistan (2022 T20 World Cup, MCG)',
        url: 'https://www.icc-cricket.com/news/kohli-masterclass-sinks-pakistan-mcg-2022',
        content: `[Context: King's Chronicles — 82* vs Pakistan at Melbourne Cricket Ground]
On October 23, 2022, at MCG in front of 90,293 spectators during T20 World Cup:
- India chasing 160 vs Pakistan were reduced to 31/4 in 6.1 overs.
- Virat Kohli played a legendary masterclass: 82* off 53 balls (6 fours, 4 sixes, SR 154.71).
- Included two iconic back-to-back sixes off Haris Rauf in the 19th over: a back-foot straight lofted six over Rauf's head, and a flick over fine leg.
- India won on the final ball of the match by 4 wickets.
- Described by ICC and commentators as one of the greatest T20 chase innings of all time.`,
        metadata: { format: 'T20I', year: 2022, opponent: 'Pakistan', runsScored: 82, isMilestone: true }
      },
      {
        id: 'icc-2024-t20-wc-final',
        source: 'ICC_OFFICIAL',
        title: 'Virat Kohli — 76 vs South Africa (2024 T20 World Cup Final, Barbados)',
        url: 'https://www.icc-cricket.com/news/india-win-t20-world-cup-2024-kohli-player-of-match',
        content: `[Context: 2024 ICC T20 World Cup Final Victory]
On June 29, 2024, at Kensington Oval, Barbados vs South Africa:
- Virat Kohli scored 76 runs off 59 balls (6 fours, 2 sixes) to rebuild India's innings from 34/3 to 176/7.
- Awarded Player of the Match in the 2024 T20 World Cup Final.
- India won the match by 7 runs to become T20 World Cup Champions.
- Post-match, Kohli officially announced his retirement from T20 International cricket as a World Champion.`,
        metadata: { format: 'T20I', year: 2024, opponent: 'South Africa', runsScored: 76, isMilestone: true }
      },
      {
        id: 'icc-183-vs-pakistan',
        source: 'ICC_OFFICIAL',
        title: 'Virat Kohli — Career Best 183 vs Pakistan (2012 Asia Cup, Mirpur)',
        url: 'https://www.icc-cricket.com/news/kohli-183-mirpur-asia-cup-2012',
        content: `[Context: Career Highest ODI Score 183 vs Pakistan]
On March 18, 2012, at Mirpur during the Asia Cup:
- Pakistan set a target of 330.
- Virat Kohli scored 183 runs off 148 balls (22 fours, 1 six) at a strike rate of 123.64.
- India chased down 330 in 47.5 overs, marking Kohli's highest individual score in international cricket and the highest score in Asia Cup history.`,
        metadata: { format: 'ODI', year: 2012, opponent: 'Pakistan', runsScored: 183, isMilestone: true }
      }
    ];
  }

  /**
   * Fetches official Wikipedia sections for Virat Kohli and tokenizes into semantic chunks
   */
  public static async fetchWikipediaGrounding(): Promise<GroundedChunk[]> {
    const params = new URLSearchParams({
      action: 'query',
      prop: 'extracts',
      titles: 'Virat_Kohli',
      explaintext: 'true',
      format: 'json',
      origin: '*',
    });

    try {
      const response = await fetch(`${this.WIKI_API_URL}?${params.toString()}`);
      const data = await response.json();
      const pages = data.query.pages;
      const pageId = Object.keys(pages)[0];
      const rawText: string = pages[pageId]?.extract || '';

      const wikiChunks = this.semanticChunker(rawText, 'https://en.wikipedia.org/wiki/Virat_Kohli', 'WIKIPEDIA');
      const iccFeeds = this.getIccOfficialFeeds();
      
      return [...iccFeeds, ...wikiChunks];
    } catch (error) {
      console.error('Failed to fetch Wikipedia grounding data, returning ICC feeds:', error);
      return this.getIccOfficialFeeds();
    }
  }

  /**
   * Semantic Chunker preserving contextual boundaries and stat density
   */
  private static semanticChunker(
    text: string,
    sourceUrl: string,
    sourceType: 'WIKIPEDIA' | 'ICC_OFFICIAL'
  ): GroundedChunk[] {
    if (!text) return [];
    const sections = text.split(/\n==\s*([^=]+)\s*==\n/);
    const chunks: GroundedChunk[] = [];

    for (let i = 1; i < sections.length; i += 2) {
      const header = sections[i].trim();
      const body = sections[i + 1]?.trim() || '';

      if (body.length < 50) continue;

      // Sub-chunk long sections into paragraphs
      const paragraphs = body.split(/\n\n+/);
      paragraphs.forEach((p, index) => {
        if (p.length > 30) {
          chunks.push({
            id: `${sourceType.toLowerCase()}-${header.replace(/\s+/g, '-')}-${index}`,
            source: sourceType,
            title: `Virat Kohli — ${header}`,
            url: sourceUrl,
            content: `[Context: Virat Kohli - ${header}]\n${p}`,
            metadata: {
              format: p.includes('ODI') ? 'ODI' : p.includes('Test') ? 'TEST' : p.includes('T20') ? 'T20I' : 'ALL',
            },
          });
        }
      });
    }

    return chunks;
  }
}
