export interface CareerStat {
  format: string;
  matches: number;
  runs: number;
  average: number;
  strikeRate: number;
  centuries: number;
  fifties: number;
  highScore: string;
  wickets?: number;
}

export interface MilestoneCard {
  id: string;
  label: string;
  value: string;
  subtext: string;
  iconName?: string;
}

export interface MajorHonour {
  title: string;
  year: string;
  category: string;
  description: string;
}

export interface CareerHighlight {
  year: string;
  title: string;
  description: string;
  badge?: string;
}

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink?: string;
  webViewLink?: string;
  createdTime?: string;
  size?: string;
  iconLink?: string;
  parents?: string[];
}
