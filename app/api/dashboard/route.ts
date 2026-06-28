// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";

// export async function GET() {
//   type FeedbackItem = {
//   id: string
//   organizationId: string
//   feedbackText: string
//   customerName: string | null
//   source: string | null
//   sentiment: string | null
//   category: string | null
//   priority: string | null
//   summary: string | null
//   suggestedAction?: string | null
//   businessImpact?: string | null
//   confidence?: number | null
//   modelUsed?: string | null
//   createdAt: Date
//   }
//   // const feedback = await prisma.feedbackItem.findMany({
//   const feedback: FeedbackItem[] = await prisma.feedbackItem.findMany({
//     where: {
//       organizationId: "demo-org",
//     },
//     orderBy: {
//       createdAt: "desc",
//     },
//   });

//   const total = feedback.length;

//   const sentimentCounts = {
//     positive: feedback.filter((f) => f.sentiment === "positive").length,
//     neutral: feedback.filter((f) => f.sentiment === "neutral").length,
//     negative: feedback.filter((f) => f.sentiment === "negative").length,
//   };

//   const categoryCounts = feedback.reduce<Record<string, number>>((acc, item) => {
//     const category = item.category || "general";
//     acc[category] = (acc[category] || 0) + 1;
//     return acc;
//   }, {});

//   const highPriority = feedback.filter((f) => f.priority === "high").length;
//   recentFeedback: await prisma.feedbackItem.findMany({
//     where: {
//         organizationId: "demo-org"
//     },
//     orderBy: {
//         createdAt: "desc"
//     },
//     take: 10
// })

// const last7Days = Array.from({ length: 7 }).map((_, index) => {
//   const date = new Date()
//   date.setDate(date.getDate() - (6 - index))

//   const key = date.toISOString().slice(0, 10)

//   const itemsForDay = feedback.filter((item) => {
//     const itemDate = new Date(item.createdAt).toISOString().slice(0, 10)
//     return itemDate === key
//   })

//   return {
//     day: date.toLocaleDateString("en-US", { weekday: "short" }),
//     total: itemsForDay.length,
//     positive: itemsForDay.filter((f) => f.sentiment === "positive").length,
//     neutral: itemsForDay.filter((f) => f.sentiment === "neutral").length,
//     negative: itemsForDay.filter((f) => f.sentiment === "negative").length,
//     highPriority: itemsForDay.filter((f) => f.priority === "high").length,
//   }
// })
//   return NextResponse.json({
//     total,
//     sentimentCounts,
//     categoryCounts,
//     highPriority,
//     recentFeedback: feedback.slice(0, 10),
//     last7Days,
//   });
//   // return NextResponse.json({ message: "Dashboard API working" });
// }

import { NextResponse } from "next/server"
import { getDashboardData } from "@/lib/get-dashboard-data"

export async function GET() {
  const data = await getDashboardData()
  return NextResponse.json(data)
}