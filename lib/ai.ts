import OpenAI from "openai"
import { analyzeFeedback } from "@/lib/analyze-feedback"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function analyzeWithAI(feedbackText: string) {
  if (!process.env.OPENAI_API_KEY) {
    return {
      ...analyzeFeedback(feedbackText),
      suggestedAction: "Review this feedback and prioritize based on customer impact.",
      businessImpact: "This feedback may affect product quality, user satisfaction, or retention.",
      confidence: 0.7,
    }
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content:
            "You analyze customer feedback for product teams. Return only valid JSON. Do not include markdown.",
        },
        {
          role: "user",
          content: `
Analyze this customer feedback:

"${feedbackText}"

Return JSON with exactly these fields:
{
  "sentiment": "positive | neutral | negative",
  "category": "bug | feature_request | pricing | usability | performance | support | praise | general",
  "priority": "low | medium | high",
  "summary": "one sentence summary",
  "suggestedAction": "specific action product team should take",
  "businessImpact": "why this matters to the business",
  "confidence": number between 0 and 1
}
          `,
        },
      ],
    })

    const text = response.choices[0]?.message?.content

    if (!text) {
      throw new Error("No AI response received")
    }

    return JSON.parse(text)
  } catch (error) {
    console.warn("AI analysis failed, using fallback analyzer:", error)

    const fallback = analyzeFeedback(feedbackText)

    return {
      ...fallback,
      suggestedAction: "Review this feedback and prioritize based on customer impact.",
      businessImpact: "This feedback may affect product quality, user satisfaction, or retention.",
      confidence: 0.65,
    }
  }
}

