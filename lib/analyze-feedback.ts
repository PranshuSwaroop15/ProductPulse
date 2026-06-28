export function analyzeFeedback(text: string) {
  const lower = text.toLowerCase()

  if (
    lower.includes("crash") ||
    lower.includes("broken") ||
    lower.includes("bug") ||
    lower.includes("error")
  ) {
    return {
      sentiment: "negative",
      category: "bug",
      priority: "high",
      summary: "Customer is reporting a technical issue.",
    }
  }

  if (
    lower.includes("add") ||
    lower.includes("feature") ||
    lower.includes("please") ||
    lower.includes("wish")
  ) {
    return {
      sentiment: "neutral",
      category: "feature_request",
      priority: "medium",
      summary: "Customer is requesting a product improvement.",
    }
  }

  if (
    lower.includes("love") ||
    lower.includes("great") ||
    lower.includes("amazing") ||
    lower.includes("excellent")
  ) {
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