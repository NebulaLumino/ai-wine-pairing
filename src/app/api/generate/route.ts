import OpenAI from "openai";
export async function POST(req: Request) {
  const { input } = await req.json();
  if (!input) return new Response("No input", { status: 400 });
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: "https://api.deepseek.com/v1",
  });
  const completion = await openai.chat.completions.create({
    model: "deepseek-chat",
    messages: [
      { role: "system", content: "You are a sommelier AI assistant. Recommend wines, explain flavor interactions, suggest alternatives, and explain why each pairing works. Include region and vintage suggestions." },
      { role: "user", content: input },
    ],
    temperature: 0.8,
    max_tokens: 800,
  });
  return Response.json({ result: completion.choices[0].message.content });
}
