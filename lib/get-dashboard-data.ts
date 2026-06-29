import { prisma } from "@/lib/prisma";

export async function getDashboardData() {
  // const feedback = await prisma.feedbackItem.findMany({
  //   where: {
  //     organizationId: "demo-org",
  //   },
  //   orderBy: {
  //     createdAt: "desc",
  //   },
  // });

  const feedback = await prisma.feedbackItem.findMany({
  where: {
    organizationId: "demo-org",
  },
  orderBy: {
    createdAt: "desc",
  },
  take: 100,
  });

  const sentimentCounts = {
    positive: feedback.filter((f) => f.sentiment === "positive").length,
    neutral: feedback.filter((f) => f.sentiment === "neutral").length,
    negative: feedback.filter((f) => f.sentiment === "negative").length,
  };

  const highPriority = feedback.filter(
    (f) => f.priority === "high"
  ).length;

  const categoryCounts = feedback.reduce<Record<string, number>>(
    (acc, item) => {
      const category = item.category ?? "general";
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    },
    {}
  );
  const last7Days = Array.from({ length: 7 }).map((_, index) => {
  const date = new Date()
  date.setDate(date.getDate() - (6 - index))

  const key = date.toISOString().slice(0, 10)

  const itemsForDay = feedback.filter((item) => {
    const itemDate = new Date(item.createdAt).toISOString().slice(0, 10)
    return itemDate === key
  })
  const total = itemsForDay.length || 1

const positive =
  itemsForDay.filter((f) => f.sentiment === "positive").length

const neutral =
  itemsForDay.filter((f) => f.sentiment === "neutral").length

const negative =
  itemsForDay.filter((f) => f.sentiment === "negative").length

return {
  day: date.toLocaleDateString("en-US", { weekday: "short" }),
  total: itemsForDay.length,

  positive: Math.round((positive / total) * 100),
  neutral: Math.round((neutral / total) * 100),
  negative: Math.round((negative / total) * 100),

  highPriority: itemsForDay.filter((f) => f.priority === "high").length,
}
  

  // return {
  //   day: date.toLocaleDateString("en-US", { weekday: "short" }),
  //   total: itemsForDay.length,
  //   positive: itemsForDay.filter((f) => f.sentiment === "positive").length,
  //   neutral: itemsForDay.filter((f) => f.sentiment === "neutral").length,
  //   negative: itemsForDay.filter((f) => f.sentiment === "negative").length,
  //   highPriority: itemsForDay.filter((f) => f.priority === "high").length,
  // }
})
const total = feedback.length

const positiveRate =
  total === 0 ? 0 : Math.round((sentimentCounts.positive / total) * 100)

const negativeRate =
  total === 0 ? 0 : Math.round((sentimentCounts.negative / total) * 100)

const highPriorityRate =
  total === 0 ? 0 : Math.round((highPriority / total) * 100)

const topCategory =
  Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ??
  "general"

const insights: string[] = []

if (positiveRate >= 60) {
  insights.push(
    `Customer sentiment is strong, with ${positiveRate}% of analyzed feedback classified as positive.`
  )
}

if (negativeRate >= 25) {
  insights.push(
    `${negativeRate}% of feedback is negative, indicating customer experience risks that should be reviewed.`
  )
}

if (highPriorityRate >= 15) {
  insights.push(
    `${highPriority} high-priority issues require immediate product or engineering attention.`
  )
}

if (topCategory === "bug") {
  insights.push(
    "Bug reports are the leading feedback category, so product stability should be prioritized before expanding new features."
  )
} else if (topCategory === "feature_request") {
  insights.push(
    "Feature requests are the leading category, showing clear roadmap opportunities from customers."
  )
} else {
  insights.push(
    `The most common feedback category is ${topCategory.replace("_", " ")}, which should guide the next product review.`
  )
}

  return {
    total: feedback.length,
    sentimentCounts,
    highPriority,
    categoryCounts,
    // recentFeedback: feedback,
    recentFeedback: feedback.map((item) => ({
    ...item,
    createdAt: item.createdAt.toISOString(),
    })),
    last7Days,
    insights,
  };
}