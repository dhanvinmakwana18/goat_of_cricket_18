import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { StatBotService } from "./src/services/rag/statBotService";

dotenv.config();

let statBotServiceInstance: StatBotService | null = null;

function getStatBotService(): StatBotService {
  const apiKey = process.env.GEMINI_API_KEY || "";
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY_MISSING");
  }
  if (!statBotServiceInstance) {
    statBotServiceInstance = new StatBotService(apiKey);
  }
  return statBotServiceInstance;
}

// Simple sliding window rate limiter per IP for API endpoints
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 30; // Max 30 requests per minute per IP

const rateLimiter = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const ip = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "unknown-ip";
  const now = Date.now();
  const record = ipRequestCounts.get(ip);

  if (!record || now > record.resetTime) {
    ipRequestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return next();
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({
      error: "Too many requests. Please slow down and try again in a minute.",
      retryAfterSeconds: Math.ceil((record.resetTime - now) / 1000),
    });
  }

  record.count += 1;
  return next();
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Security Headers Middleware
  app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
    next();
  });

  // Strict payload size limit (100kb is generous for JSON queries and prevents DOS memory exhaustion)
  app.use(express.json({ limit: "100kb" }));

  // Apply rate limiter to all /api/ endpoints
  app.use("/api/", rateLimiter);

  // API Route: Grounded RAG StatBot Query
  const handleStatBot = async (req: express.Request, res: express.Response) => {
    try {
      const { query } = req.body || {};

      // 1. Input Sanitization & Validation
      if (!query || typeof query !== "string") {
        return res.status(400).json({ error: "Invalid request: 'query' parameter must be a non-empty string." });
      }

      const trimmedQuery = query.trim();
      if (trimmedQuery.length === 0 || trimmedQuery.length > 500) {
        return res.status(400).json({ error: "Invalid query length. Query must be between 1 and 500 characters." });
      }

      // 2. Check API Key
      if (!process.env.GEMINI_API_KEY) {
        console.warn("[Backend Security Alert] GEMINI_API_KEY environment variable is not configured.");
        return res.status(503).json({ error: "AI service is currently unavailable. API key not configured on server." });
      }

      // 3. Process Query
      const bot = getStatBotService();
      const result = await bot.answerCricketQuery(trimmedQuery);
      return res.json(result);
    } catch (error: any) {
      console.error("[Backend Security Log] Error processing StatBot RAG query:", error?.message || error);
      return res.status(500).json({
        error: "An internal server error occurred while processing the cricket query.",
      });
    }
  };

  app.post("/api/statbot", handleStatBot);
  app.post("/api/rag/query", handleStatBot);

  // API Route: Dynamic AI Commentary Broadcast
  const handleCommentary = async (req: express.Request, res: express.Response) => {
    try {
      const { context, commentatorId } = req.body || {};

      // 1. Input Validation
      if (!context || typeof context !== "object") {
        return res.status(400).json({ error: "Invalid request: 'context' must be a valid object." });
      }

      const allowedCommentators = ["harsha", "ravi", "jatin"];
      const validatedCommentator = allowedCommentators.includes(commentatorId) ? commentatorId : "harsha";

      const runs = typeof context.runs === "number" ? Math.max(0, Math.min(1000, context.runs)) : 0;
      const balls = typeof context.balls === "number" ? Math.max(0, Math.min(1000, context.balls)) : 0;
      const opponent = String(context.opponent || "Opponent").slice(0, 100);
      const venue = String(context.venue || "Stadium").slice(0, 100);
      const format = String(context.format || "Cricket Match").slice(0, 50);
      const description = String(context.description || "").slice(0, 500);

      // 2. Check API Key
      const apiKey = process.env.GEMINI_API_KEY || "";
      if (!apiKey) {
        console.warn("[Backend Security Alert] GEMINI_API_KEY environment variable is not configured.");
        return res.status(503).json({ error: "Commentary service is currently unavailable. API key not configured on server." });
      }

      const { GoogleGenAI } = await import("@google/genai");
      const { COMMENTATOR_PROMPTS } = await import("./src/services/commentary/commentatorPrompts");

      const ai = new GoogleGenAI({ apiKey });
      const promptText = COMMENTATOR_PROMPTS[validatedCommentator as keyof typeof COMMENTATOR_PROMPTS] || COMMENTATOR_PROMPTS.harsha;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: `
INNINGS DATA:
- Batsman: Virat Kohli
- Score: ${runs}* (${balls} balls)
- Format: ${format}
- Opponent: ${opponent}
- Venue: ${venue}
- Context: ${description}

Deliver live, authentic audio-style commentary calling this exact moment in real-time.
`,
        config: {
          systemInstruction: promptText,
          temperature: 0.8,
        },
      });

      return res.json({ commentary: response.text || "Unbelievable moment!" });
    } catch (error: any) {
      console.error("[Backend Security Log] Error generating AI commentary:", error?.message || error);
      return res.status(500).json({ error: "An internal server error occurred while generating commentary." });
    }
  };

  app.post("/api/commentary", handleCommentary);
  app.post("/api/commentary/generate", handleCommentary);

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
    console.log(`[VK18 Secured Server] Grounded StatBot Backend running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start VK18 server:", err);
  process.exit(1);
});
