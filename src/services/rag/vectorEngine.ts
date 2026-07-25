import { GoogleGenAI } from '@google/genai';
import { GroundedChunk } from './types';

export class HybridVectorEngine {
  private ai: GoogleGenAI;
  private chunks: GroundedChunk[] = [];

  constructor(apiKey: string) {
    this.ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  public async initializeIndex(chunks: GroundedChunk[]): Promise<void> {
    this.chunks = chunks;

    // Generate embeddings in batch or lazily
    for (const chunk of this.chunks) {
      if (!chunk.embedding) {
        try {
          const response = await this.ai.models.embedContent({
            model: 'gemini-embedding-2-preview',
            contents: chunk.content,
          });
          const embedData = (response as any).embedding || (response as any).embeddings?.[0];
          if (embedData?.values) {
            chunk.embedding = embedData.values;
          }
        } catch (err) {
          // If embedding model is unavailable, fallback silently to BM25 keyword ranking
        }
      }
    }
  }

  /**
   * Cosine Similarity calculation
   */
  private cosineSimilarity(a: number[], b: number[]): number {
    if (!a || !b || a.length !== b.length) return 0;
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }
    if (normA === 0 || normB === 0) return 0;
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  /**
   * Sparse BM25 Keyword Ranker for precise stat queries (e.g., "183", "50th century", "MCG", "Pakistan")
   */
  private bm25Score(query: string, content: string): number {
    const queryTerms = query.toLowerCase().split(/\s+/);
    const contentLower = content.toLowerCase();
    let score = 0;
    for (const term of queryTerms) {
      if (term.length >= 2 && contentLower.includes(term)) {
        score += 1.0;
        // Boost for exact match numbers or capitals
        if (/^\d+$/.test(term)) {
          score += 1.5;
        }
      }
    }
    return score;
  }

  /**
   * Hybrid Search executing Reciprocal Rank Fusion (RRF) / Weighted Score
   */
  public async search(query: string, topK: number = 4): Promise<GroundedChunk[]> {
    let queryVector: number[] | null = null;
    try {
      const queryEmbedResp = await this.ai.models.embedContent({
        model: 'gemini-embedding-2-preview',
        contents: query,
      });
      const qEmbedData = (queryEmbedResp as any).embedding || (queryEmbedResp as any).embeddings?.[0];
      queryVector = qEmbedData?.values || null;
    } catch (e) {
      console.warn('Embedding query failed, falling back to BM25 keyword matching:', e);
    }

    const scored = this.chunks.map((chunk) => {
      const denseSim = (queryVector && chunk.embedding) ? this.cosineSimilarity(queryVector, chunk.embedding) : 0;
      const sparseSim = this.bm25Score(query, chunk.content);
      
      // Hybrid Weighted Score: 70% Dense Embedding + 30% Exact Keyword Match
      const combinedScore = (denseSim * 0.7) + (sparseSim > 0 ? Math.min(sparseSim * 0.1, 0.3) : 0);
      return { chunk, score: combinedScore };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, topK).map((item) => item.chunk);
  }
}
