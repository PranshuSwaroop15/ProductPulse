export function analyzeFeedback(text: string) {
  const lower = text.toLowerCase()
  const positiveWords = [
  "love",
  "great",
  "amazing",
  "excellent",
  "fantastic",
  "awesome",
  "helpful",
  "better",
  "faster",
  "fixed",
  "smooth",
  "easy",
  ]

const negativeWords = [
  "crash",
  "crashes",
  "broken",
  "bug",
  "error",
  "awful",
  "bad",
  "terrible",
  "slow",
  "fails",
  "failed",
  "freeze",
  "freezes",
  "late",
  "confusing",
  ]
  const featureWords = [ 
    "add",
    "feature",
    "please",
    "wish",
    "would like",
    "could you",
    "support",
    "api",
    "integration",
    "export", 
  ]

  const hasPositive = positiveWords.some((word) => lower.includes(word)) 
  const hasNegative = negativeWords.some((word) => lower.includes(word)) 
  const hasFeature = featureWords.some((word) => lower.includes(word))
  
  if (hasNegative) {
    return {
      sentiment: "negative",
      category: "bug",
      priority: "high",
      summary: "Customer is reporting a technical issue.",
    }
  }

  if (hasFeature) {
    return {
      sentiment: "neutral",
      category: "feature_request",
      priority: "medium",
      summary: "Customer is requesting a product improvement.",
    }
  }

  if (hasPositive) {
    return {
      sentiment: "positive",
      category: "praise",
      priority: "low",
      summary: "Customer is expressing positive feedback.",
    }
  }

  return {
    sentiment: "neutral",
    category: "general",
    priority: "medium",
    summary: "General customer feedback.",
  }
}