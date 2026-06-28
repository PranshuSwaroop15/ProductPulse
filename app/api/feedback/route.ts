import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
// import { analyzeFeedback } from "@/lib/analyze-feedback"
import { analyzeWithAI } from "@/lib/ai"
// function analyzeFeedback(text: string) {
//   const lower = text.toLowerCase();

//   if (
//     lower.includes("crash") ||
//     lower.includes("broken") ||
//     lower.includes("bug") ||
//     lower.includes("error")
//   ) {
//     return {
//       sentiment: "negative",
//       category: "bug",
//       priority: "high",
//       summary: "Customer is reporting a technical issue.",
//     };
//   }

//   if (
//     lower.includes("add") ||
//     lower.includes("feature") ||
//     lower.includes("please") ||
//     lower.includes("wish")
//   ) {
//     return {
//       sentiment: "neutral",
//       category: "feature_request",
//       priority: "medium",
//       summary: "Customer is requesting a product improvement.",
//     };
//   }

//   if (
//     lower.includes("love") ||
//     lower.includes("great") ||
//     lower.includes("amazing") ||
//     lower.includes("excellent")
//   ) {
//     return {
//       sentiment: "positive",
//       category: "praise",
//       priority: "low",
//       summary: "Customer is expressing positive feedback.",
//     };
//   }

//   return {
//     sentiment: "neutral",
//     category: "general",
//     priority: "medium",
//     summary: "General customer feedback.",
//   };
// }

export async function POST(req: Request) {
  const body = await req.json();

  const { feedbackText, customerName, source } = body;

  if (!feedbackText) {
    return NextResponse.json(
      { error: "feedbackText is required" },
      { status: 400 }
    );
  }

  // const analysis = analyzeFeedback(feedbackText);
  const analysis = await analyzeWithAI(feedbackText)
  await prisma.organization.upsert({
  where: { id: "demo-org" },
  update: {},
  create: {
    id: "demo-org",
    name: "Demo Company",
  },
})
  // const feedback = await prisma.feedbackItem.create({
  //   data: {
  //     organizationId: "demo-org",
  //     feedbackText,
  //     customerName: customerName || null,
  //     source: source || "manual",
  //     sentiment: analysis.sentiment,
  //     category: analysis.category,
  //     priority: analysis.priority,
  //     summary: analysis.summary,
  //   },
  // });
  const feedback = await prisma.feedbackItem.create({
  data: {
    organizationId: "demo-org",
    feedbackText,
    customerName: customerName || null,
    source: source || "manual",
    sentiment: analysis.sentiment,
    category: analysis.category,
    priority: analysis.priority,
    summary: analysis.summary,

    suggestedAction: analysis.suggestedAction,
    businessImpact: analysis.businessImpact,
    confidence: analysis.confidence,
    modelUsed: "gpt-4o-mini",
  },
});
  return NextResponse.json(feedback);
}

export async function GET() {
  const feedback = await prisma.feedbackItem.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  

  return NextResponse.json(feedback);
}