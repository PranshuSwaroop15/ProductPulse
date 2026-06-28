import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { analyzeWithAI } from "@/lib/ai"

export async function POST(req: Request) {
  const body = await req.json();

  const { feedbackText, customerName, source } = body;

  if (!feedbackText) {
    return NextResponse.json(
      { error: "feedbackText is required" },
      { status: 400 }
    );
  }

  const analysis = await analyzeWithAI(feedbackText)
  await prisma.organization.upsert({
  where: { id: "demo-org" },
  update: {},
  create: {
    id: "demo-org",
    name: "Demo Company",
    },
  })

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