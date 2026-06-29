// import { NextRequest, NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// // import { analyzeFeedback } from "@/lib/analyze-feedback"; // <-- same function used by /api/feedback
// import { analyzeWithAI } from "@/lib/ai"
// export async function POST(req: NextRequest) {
//   try {
//     const rows = await req.json();

//     if (!Array.isArray(rows)) {
//       return NextResponse.json(
//         { error: "Expected an array of feedback rows." },
//         { status: 400 }
//       );
//     }

//     // Make sure demo organization exists
//     await prisma.organization.upsert({
//       where: { id: "demo-org" },
//       update: {},
//       create: {
//         id: "demo-org",
//         name: "Demo Company",
//       },
//     });

//     const feedbackItems = rows.map((row: any) => {
//     //   const analysis = analyzeFeedback(row.feedbackText);
//       const analysis = await analyzeWithAI(feedbackText);
//       return {
//         organizationId: "demo-org",
//         customerName: row.customerName || "Anonymous",
//         feedbackText: row.feedbackText,
//         source: row.source || "csv",

//         sentiment: analysis.sentiment,
//         priority: analysis.priority,
//         category: analysis.category,
//         summary: analysis.summary,
//         suggestedAction: analysis.suggestedAction,
//         businessImpact: analysis.businessImpact,
//         confidence: analysis.confidence,
//         modelUsed: "gpt-4o-mini",
//       };
//     });

//     await prisma.feedbackItem.createMany({
//       data: feedbackItems,
//       skipDuplicates: true,
//     });

//     return NextResponse.json({
//       success: true,
//       imported: feedbackItems.length,
//     });
//   } catch (error) {
//     console.error(error);

//     return NextResponse.json(
//       { error: "Import failed." },
//       { status: 500 }
//     );
//   }
// }

// import { NextRequest, NextResponse } from "next/server"
// import { prisma } from "@/lib/prisma"
// import { analyzeWithAI } from "@/lib/ai"

// export async function POST(req: NextRequest) {
//   try {
//     const rows = await req.json()

//     if (!Array.isArray(rows)) {
//       return NextResponse.json(
//         { error: "Expected an array of feedback rows." },
//         { status: 400 }
//       )
//     }

//     await prisma.organization.upsert({
//       where: { id: "demo-org" },
//       update: {},
//       create: {
//         id: "demo-org",
//         name: "Demo Company",
//       },
//     })

//     const validRows = rows.filter(
//       (row: any) =>
//         typeof row.feedbackText === "string" &&
//         row.feedbackText.trim().length > 0
//     )

//     const feedbackItems = await Promise.all(
//       validRows.map(async (row: any) => {
//         const analysis = await analyzeWithAI(row.feedbackText)

//         return {
//           organizationId: "demo-org",
//           customerName: row.customerName || "Anonymous",
//           feedbackText: row.feedbackText,
//           source: row.source || "csv",
//           sentiment: analysis.sentiment,
//           priority: analysis.priority,
//           category: analysis.category,
//           summary: analysis.summary,
//           suggestedAction: analysis.suggestedAction,
//           businessImpact: analysis.businessImpact,
//           confidence: analysis.confidence,
//           modelUsed: "gpt-4o-mini",
//         }
//       })
//     )

//     await prisma.feedbackItem.createMany({
//       data: feedbackItems,
//       skipDuplicates: true,
//     })
//     const importedSummary = {
//       total: feedbackItems.length,
//       positive: feedbackItems.filter((f) => f.sentiment === "positive").length,
//       neutral: feedbackItems.filter((f) => f.sentiment === "neutral").length,
//       negative: feedbackItems.filter((f) => f.sentiment === "negative").length,
//       highPriority: feedbackItems.filter((f) => f.priority === "high").length,
//       featureRequests: feedbackItems.filter((f) => f.category === "feature_request").length,
//     }

//     return NextResponse.json({
//       success: true,
//       imported: feedbackItems.length,
//       summary: importedSummary,
//     })

//     return NextResponse.json({
//       success: true,
//       imported: feedbackItems.length,
//     })
//   } catch (error) {
//     console.error(error)

//     return NextResponse.json(
//       { error: "Import failed." },
//       { status: 500 }
//     )
//   }
// }

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { analyzeWithAI } from "@/lib/ai"

export async function POST(req: NextRequest) {
  try {
    const rows = await req.json()

    if (!Array.isArray(rows)) {
      return NextResponse.json(
        { error: "Expected an array of feedback rows." },
        { status: 400 }
      )
    }

    const limitedRows = rows.slice(0, 1000)

    await prisma.organization.upsert({
      where: { id: "demo-org" },
      update: {},
      create: {
        id: "demo-org",
        name: "Demo Company",
      },
    })

    const validRows = limitedRows.filter(
      (row: any) =>
        typeof row.feedbackText === "string" &&
        row.feedbackText.trim().length > 0
    )

    const feedbackItems = await Promise.all(
      validRows.map(async (row: any) => {
        const analysis = await analyzeWithAI(row.feedbackText)

        return {
          organizationId: "demo-org",
          customerName: row.customerName || "Anonymous",
          feedbackText: row.feedbackText,
          source: row.source || "csv",
          sentiment: analysis.sentiment,
          priority: analysis.priority,
          category: analysis.category,
          summary: analysis.summary,
          suggestedAction: analysis.suggestedAction,
          businessImpact: analysis.businessImpact,
          confidence: analysis.confidence,
          modelUsed: "gpt-4o-mini",
        }
      })
    )

    await prisma.feedbackItem.createMany({
      data: feedbackItems,
      skipDuplicates: true,
    })

    const importedSummary = {
      total: feedbackItems.length,
      positive: feedbackItems.filter((f) => f.sentiment === "positive").length,
      neutral: feedbackItems.filter((f) => f.sentiment === "neutral").length,
      negative: feedbackItems.filter((f) => f.sentiment === "negative").length,
      highPriority: feedbackItems.filter((f) => f.priority === "high").length,
      featureRequests: feedbackItems.filter(
        (f) => f.category === "feature_request"
      ).length,
    }

    return NextResponse.json({
      success: true,
      imported: feedbackItems.length,
      summary: importedSummary,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error: "Import failed." }, { status: 500 })
  }
}