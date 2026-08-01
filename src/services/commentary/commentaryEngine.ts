import { CommentatorID } from './commentatorPrompts';

export interface InningsContext {
  runs: number;
  balls: number;
  opponent: string;
  venue: string;
  format: string;
  description: string;
}

export class CommentaryEngine {
  public async generateLiveCommentary(
    context: InningsContext,
    commentatorId: CommentatorID
  ): Promise<string> {
    try {
      const apiResp = await fetch('/api/commentary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ context, commentatorId }),
      });

      if (apiResp.ok) {
        const data = await apiResp.json();
        if (data.commentary) return data.commentary;
      }
      throw new Error('Failed to generate commentary from server endpoint.');
    } catch (err: any) {
      console.error('Commentary generation error:', err);
      return `What a moment at ${context.venue}! Virat Kohli delivers once again under supreme pressure!`;
    }
  }
}
