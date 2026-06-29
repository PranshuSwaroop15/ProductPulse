// import { Sparkles, TrendingUp, AlertTriangle, ArrowRight } from "lucide-react"
// import { Button } from "@/components/ui/button"

// const highlights = [
//   {
//     icon: TrendingUp,
//     tone: "positive" as const,
//     text: "Positive sentiment rose to 73%, driven by praise for the new onboarding flow and faster support replies.",
//   },
//   {
//     icon: AlertTriangle,
//     tone: "warning" as const,
//     text: "Performance complaints jumped 23% this week — dashboard load time is the leading churn-risk signal.",
//   },
//   {
//     icon: Sparkles,
//     tone: "neutral" as const,
//     text: "412 customers are requesting a native Slack integration; consider prioritizing for the Q3 roadmap.",
//   },
// ]

// const toneStyles = {
//   positive: "bg-[oklch(0.95_0.05_160)] text-[oklch(0.45_0.13_160)]",
//   warning: "bg-[oklch(0.96_0.05_80)] text-[oklch(0.5_0.13_80)]",
//   neutral: "bg-accent text-accent-foreground",
// }

// export function AiSummary() {
//   return (
//     <section className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm">
//       <div className="flex items-center justify-between border-b border-border bg-accent/40 p-5">
//         <div className="flex items-center gap-2">
//           <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
//             <Sparkles className="h-4 w-4" />
//           </span>
//           <div>
//             <h2 className="text-base font-semibold tracking-tight text-card-foreground">
//               AI summary
//             </h2>
//             <p className="text-xs text-muted-foreground">
//               Generated from 48,219 data points
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-col gap-3 p-5">
//         {highlights.map((h, i) => {
//           const Icon = h.icon
//           return (
//             <div key={i} className="flex gap-3">
//               <span
//                 className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${toneStyles[h.tone]}`}
//               >
//                 <Icon className="h-4 w-4" />
//               </span>
//               <p className="text-sm leading-relaxed text-card-foreground">
//                 {h.text}
//               </p>
//             </div>
//           )
//         })}
//       </div>

//       <div className="mt-auto border-t border-border p-5">
//         <Button className="w-full gap-2">
//           Generate full report
//           <ArrowRight className="h-4 w-4" />
//         </Button>
//       </div>
//     </section>
//   )
// }

// import { Sparkles, TrendingUp, AlertTriangle, ArrowRight } from "lucide-react"
// import { Button } from "@/components/ui/button"

// type DashboardData = {
//   total: number
//   sentimentCounts: {
//     positive: number
//     neutral: number
//     negative: number
//   }
//   highPriority: number
//   categoryCounts: Record<string, number>
// }

// type Props = {
//   data: DashboardData
// }

// const toneStyles = {
//   positive: "bg-[oklch(0.95_0.05_160)] text-[oklch(0.45_0.13_160)]",
//   warning: "bg-[oklch(0.96_0.05_80)] text-[oklch(0.5_0.13_80)]",
//   neutral: "bg-accent text-accent-foreground",
// }

// export function AiSummary({ data }: Props) {
//   const topCategory =
//     Object.entries(data.categoryCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ||
//     "general"

//   const highlights = [
//     {
//       icon: TrendingUp,
//       tone: "positive" as const,
//       text: `${data.sentimentCounts.positive} positive feedback items detected from live Aurora data.`,
//     },
//     {
//       icon: AlertTriangle,
//       tone: "warning" as const,
//       text: `${data.highPriority} high-priority issues need attention from the product team.`,
//     },
//     {
//       icon: Sparkles,
//       tone: "neutral" as const,
//       text: `The most common feedback category is "${topCategory}", based on analyzed customer submissions.`,
//     },
//   ]

//   return (
//     <section className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm">
//       <div className="flex items-center justify-between border-b border-border bg-accent/40 p-5">
//         <div className="flex items-center gap-2">
//           <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
//             <Sparkles className="h-4 w-4" />
//           </span>

//           <div>
//             <h2 className="text-base font-semibold tracking-tight text-card-foreground">
//               AI summary
//             </h2>
//             <p className="text-xs text-muted-foreground">
//               Generated from {data.total} feedback items
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-col gap-3 p-5">
//         {highlights.map((h, i) => {
//           const Icon = h.icon

//           return (
//             <div key={i} className="flex gap-3">
//               <span
//                 className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${toneStyles[h.tone]}`}
//               >
//                 <Icon className="h-4 w-4" />
//               </span>

//               <p className="text-sm leading-relaxed text-card-foreground">
//                 {h.text}
//               </p>
//             </div>
//           )
//         })}
//       </div>

//       <div className="mt-auto border-t border-border p-5">
//         <Button className="w-full gap-2">
//           Generate full report
//           <ArrowRight className="h-4 w-4" />
//         </Button>
//       </div>
//     </section>
//   )
// }


import { Sparkles, TrendingUp, AlertTriangle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
type Feedback = {
  id: string
  summary?: string | null
  suggestedAction?: string | null
  businessImpact?: string | null
  confidence?: number | null
  priority?: string | null
}

type DashboardData = {
  total: number
  recentFeedback: Feedback[]
  insights: string[]
}

type Props = {
  data: DashboardData
}

const toneStyles = {
  positive: "bg-[oklch(0.95_0.05_160)] text-[oklch(0.45_0.13_160)]",
  warning: "bg-[oklch(0.96_0.05_80)] text-[oklch(0.5_0.13_80)]",
  neutral: "bg-accent text-accent-foreground",
}

export function AiSummary({ data }: Props) {
  const latest =
    data.recentFeedback.find((item) => item.summary || item.suggestedAction) ||
    data.recentFeedback[0]

  const confidence =
    latest?.confidence !== null && latest?.confidence !== undefined
      ? `${Math.round(latest.confidence * 100)}% confidence`
      : "Rule-based fallback"

  // const highlights = [
  //   {
  //     icon: Sparkles,
  //     tone: "neutral" as const,
  //     text:
  //       latest?.summary ||
  //       "Upload feedback to generate AI-powered product insights.",
  //   },
  //   {
  //     icon: AlertTriangle,
  //     tone: "warning" as const,
  //     text:
  //       latest?.suggestedAction ||
  //       "Suggested actions will appear after feedback is analyzed.",
  //   },
  //   {
  //     icon: TrendingUp,
  //     tone: "positive" as const,
  //     text:
  //       latest?.businessImpact ||
  //       `Generated from ${data.total} feedback items stored in Aurora PostgreSQL.`,
  //   },
  // ]

  const highlights = data.insights?.length
  ? data.insights.map((insight, index) => ({
      icon: index === 0 ? Sparkles : index === 1 ? AlertTriangle : TrendingUp,
      tone:
        index === 1
          ? ("warning" as const)
          : index === 2
          ? ("positive" as const)
          : ("neutral" as const),
      text: insight,
    }))
  : [
      {
        icon: Sparkles,
        tone: "neutral" as const,
        text:
          latest?.summary ||
          "Upload feedback to generate AI-powered product insights.",
      },
      {
        icon: AlertTriangle,
        tone: "warning" as const,
        text:
          latest?.suggestedAction ||
          "Suggested actions will appear after feedback is analyzed.",
      },
      {
        icon: TrendingUp,
        tone: "positive" as const,
        text:
          latest?.businessImpact ||
          `Generated from ${data.total} feedback items stored in Aurora PostgreSQL.`,
      },
    ]

  return (
    <section className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border bg-accent/40 p-5">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </span>

          <div>
            <h2 className="text-base font-semibold tracking-tight text-card-foreground">
              AI summary
            </h2>
            <p className="text-xs text-muted-foreground">
              Generated from {data.total} feedback items · {confidence}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-5">
        {highlights.map((h, i) => {
          const Icon = h.icon

          return (
            <div key={i} className="flex gap-3">
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${toneStyles[h.tone]}`}
              >
                <Icon className="h-4 w-4" />
              </span>

              <p className="text-sm leading-relaxed text-card-foreground">
                {h.text}
              </p>
            </div>
          )
        })}
      </div>

      {/* <div className="mt-auto border-t border-border p-5">
        <Button className="w-full gap-2">
          Generate full report
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div> */}
      <Link href="/report">
        <Button className="w-full gap-2">
          Generate full report
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </section>
  )
}

