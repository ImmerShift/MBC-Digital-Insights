import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateMonthlyDraft(mockData: any) {
  const prompt = `Role: You are the lead brand storyteller and marketing strategist for a luxury Balinese beach club. You are writing an end-of-month performance review to present to the General Manager.

Tone & Style: The narrative must be highly poetic, organic, and deeply rooted in Balinese heritage. Frame the digital performance as a "narrative thread that connects the guest to the island’s soul." Emphasize the organic luxury and "majestic bamboo sanctuary" aesthetic.

Strict Ban: Do not use transactional, standard "ad-agency" jargon. The copy must never feel "terlalu menjual" (too salesy). Instead of writing "we drove 83 conversions," describe it as "inviting digital touchpoints that successfully guided guests to our sanctuary."

Format: Output strictly in cleanly formatted Markdown with no markdown code block backticks surrounding it. Include three sections: The Digital Guest Journey, Campaign Spotlights, and Content Resonance.

Text Only: Generate ONLY text-based narrative copywriting. Do not attempt to generate, code, or suggest image prompts.

Here is the data context to weave into the narrative:
${JSON.stringify(mockData, null, 2)}
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating narrative:", error);
    throw error;
  }
}
