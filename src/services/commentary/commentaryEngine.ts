import { GoogleGenAI } from '@google/genai';
import { CommentatorID, COMMENTATOR_PROMPTS } from './commentatorPrompts';

export interface InningsContext {
  runs: number;
  balls: number;
  opponent: string;
  venue: string;
  format: string;
  description: string;
}

export class CommentaryEngine {
  private ai: GoogleGenAI;

  constructor(apiKey?: string) {
    this.ai = new GoogleGenAI({
      apiKey: apiKey || '',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  public async generateLiveCommentary(
    context: InningsContext,
    commentatorId: CommentatorID
  ): Promise<string> {
    try {
      // Server API route priority
      const apiResp = await fetch('/api/commentary/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ context, commentatorId }),
      });

      if (apiResp.ok) {
        const data = await apiResp.json();
        if (data.commentary) return data.commentary;
      }
    } catch (e) {
      console.warn('Server commentary API call failed, falling back to client model:', e);
    }

    // Direct Gemini fallback
    const systemPrompt = COMMENTATOR_PROMPTS[commentatorId];
    const userPrompt = `
INNINGS MOMENT TELEMETRY:
- Batsman: Virat Kohli
- Score: ${context.runs}* off ${context.balls} balls
- Format: ${context.format}
- Opponent: ${context.opponent}
- Venue: ${context.venue}
- Moment Description: ${context.description}

Deliver live, authentic broadcast commentary calling this exact moment in real-time as your commentator persona.
`;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: userPrompt,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.8,
        },
      });

      return response.text || 'Unbelievable masterclass by King Kohli!';
    } catch (err: any) {
      console.error('Commentary generation error:', err);
      return `What a moment at ${context.venue}! Virat Kohli delivers once again under supreme pressure!`;
    }
  }
}
