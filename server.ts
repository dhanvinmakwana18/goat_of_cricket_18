import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { StatBotService } from "./src/services/rag/statBotService";

dotenv.config();

let statBotServiceInstance: StatBotService | null = null;

function getStatBotService(): StatBotService {
  if (!statBotServiceInstance) {
    const apiKey = process.env.GEMINI_API_KEY || "";
    statBotServiceInstance = new StatBotService(apiKey);
  }
  return statBotServiceInstance;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "10mb" }));

  // API Route: Grounded RAG StatBot Query
  app.post("/api/rag/query", async (req, res) => {
    try {
      const { query } = req.body;
      if (!query || typeof query !== "string") {
        return res.status(400).json({ error: "Missing or invalid query parameter." });
      }

      const bot = getStatBotService();
      const result = await bot.answerCricketQuery(query);
      return res.json(result);
    } catch (error: any) {
      console.error("Error processing Grounded StatBot RAG query:", error);
      return res.status(500).json({
        error: "Failed to process cricket statistical query.",
        message: error?.message || String(error),
      });
    }
  });

  // API Route: Dynamic AI Commentary Broadcast
  app.post("/api/commentary/generate", async (req, res) => {
    try {
      const { context, commentatorId } = req.body;
      const apiKey = process.env.GEMINI_API_KEY || "";
      const { GoogleGenAI } = await import("@google/genai");
      const { COMMENTATOR_PROMPTS } = await import("./src/services/commentary/commentatorPrompts");

      const ai = new GoogleGenAI({ apiKey });
      const promptText = COMMENTATOR_PROMPTS[commentatorId as keyof typeof COMMENTATOR_PROMPTS] || COMMENTATOR_PROMPTS.harsha;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `
INNINGS DATA:
- Batsman: Virat Kohli
- Score: ${context.runs}* (${context.balls} balls)
- Format: ${context.format}
- Opponent: ${context.opponent}
- Venue: ${context.venue}
- Context: ${context.description}

Deliver live, authentic audio-style commentary calling this exact moment in real-time.
`,
        config: {
          systemInstruction: promptText,
          temperature: 0.8,
        },
      });

      return res.json({ commentary: response.text || "Unbelievable moment!" });
    } catch (error: any) {
      console.error("Error generating AI commentary:", error);
      return res.status(500).json({ error: "Failed to generate AI commentary." });
    }
  });

  // Healthcheck API
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[VK18 Server] Grounded StatBot Backend running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start VK18 server:", err);
  process.exit(1);
});
