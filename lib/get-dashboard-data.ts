import { prisma } from "@/lib/prisma";

export async function getDashboardData() {
  const feedback = await prisma.feedbackItem.findMany({
    where: {
      organizationId: "demo-org",
    },
    orderBy: {
      createdAt: "desc",
    },
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

  return {
    day: date.toLocaleDateString("en-US", { weekday: "short" }),
    total: itemsForDay.length,
    positive: itemsForDay.filter((f) => f.sentiment === "positive").length,
    neutral: itemsForDay.filter((f) => f.sentiment === "neutral").length,
    negative: itemsForDay.filter((f) => f.sentiment === "negative").length,
    highPriority: itemsForDay.filter((f) => f.priority === "high").length,
  }
})

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
  };
}