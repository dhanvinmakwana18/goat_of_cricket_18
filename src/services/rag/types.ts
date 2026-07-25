export interface GroundedChunk {
  id: string;
  source: 'WIKIPEDIA' | 'ICC_OFFICIAL';
  title: string;
  url: string;
  content: string;
  metadata: {
    format?: 'ODI' | 'TEST' | 'T20I' | 'IPL' | 'ALL';
    year?: number;
    opponent?: string;
    runsScored?: number;
    isMilestone?: boolean;
  };
  embedding?: number[];
}

export interface QueryResult {
  chunk: GroundedChunk;
  score: number;
}

export interface StatBotResponse {
  answer: string;
  groundedSources: { title: string; url: string; source: string }[];
  confidenceScore: number;
}
