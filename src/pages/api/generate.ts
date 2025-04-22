// src/pages/api/generate.ts
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai"; // ✅ Correct import for OpenAI v4

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // ✅ Should be in .env.local
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const reply = completion.choices[0]?.message?.content;
    res.status(200).json({ result: reply });
  } catch (error: any) {
    console.error("[OpenAI Error]", error?.message || error);
    res.status(500).json({ error: "Failed to generate response" });
  }
}
