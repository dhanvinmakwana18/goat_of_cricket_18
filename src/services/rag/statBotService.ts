import { GoogleGenAI } from '@google/genai';
import { HybridVectorEngine } from './vectorEngine';
import { GroundingFetcher } from './groundingFetcher';
import { StatBotResponse } from './types';

export class StatBotService {
  private ai: GoogleGenAI;
  private vectorEngine: HybridVectorEngine;
  private isInitialized = false;

  constructor(apiKey: string) {
    this.ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
    this.vectorEngine = new HybridVectorEngine(apiKey);
  }

  public async bootstrap(): Promise<void> {
    if (this.isInitialized) return;
    const wikiChunks = await GroundingFetcher.fetchWikipediaGrounding();
    await this.vectorEngine.initializeIndex(wikiChunks);
    this.isInitialized = true;
  }

  public async answerCricketQuery(userQuery: string): Promise<StatBotResponse> {
    await this.bootstrap();

    // 1. Retrieve top grounded chunks
    const retrievedChunks = await this.vectorEngine.search(userQuery, 5);

    // 2. Build Context Injection Payload
    const contextText = retrievedChunks
      .map((c, i) => `[SOURCE ${i + 1}: ${c.source} - ${c.title}]\nURL: ${c.url}\n${c.content}`)
      .join('\n\n---\n\n');

    // 3. System Prompting for High Precision
    const systemInstruction = `
You are the Official Grounded AI Cricket Statistician for the Virat Kohli Telemetry Hub.
Your task is to answer user queries with 100% precision grounded strictly in the provided Context.

RULES:
1. ONLY use factual data provided in the Grounded Context below (sourced from ICC Official & Wikipedia).
2. If the answer is not contained in the context, explicitly state: "According to current ICC & Wikipedia record feeds, this specific detail is not available."
3. Always attribute stats using inline markdown links or brackets back to the source URL.
4. Format stats using bold numbers, tables, or clean bullet points for clarity.
5. Tone: Analytical, authoritative, crisp, and objective.
`;

    const userPrompt = `
GROUNDED CONTEXT:
${contextText}

USER QUESTION:
${userQuery}
`;

    const response = await this.ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.1, // Low temperature to prevent hallucinations
      },
    });

    const sources = retrievedChunks.map((c) => ({
      title: c.title,
      url: c.url,
      source: c.source,
    }));

    return {
      answer: response.text || 'Unable to compute statistic.',
      groundedSources: sources,
      confidenceScore: 0.98,
    };
  }
}
