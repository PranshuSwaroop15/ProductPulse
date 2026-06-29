// "use client"

// import { Button } from "@/components/ui/button"

// type Feedback = {
//   id: string
//   feedbackText: string
//   category: string | null
//   priority: string | null
//   sentiment: string | null
//   summary?: string | null
//   suggestedAction?: string | null
//   businessImpact?: string | null
// }

// type Props = {
//   data: {
//     total: number
//     highPriority: number
//     sentimentCounts: {
//       positive: number
//       neutral: number
//       negative: number
//     }
//     categoryCounts: Record<string, number>
//     recentFeedback: Feedback[]
//   }
// }

// export function ExecutiveReport({ data }: Props) {
//   const topCategories = Object.entries(data.categoryCounts)
//     .sort((a, b) => b[1] - a[1])
//     .slice(0, 5)

//   const healthScore = Math.max(
//         0,
//         Math.min(
//           100,
//           Math.round(
//             80 +
//               data.sentimentCounts.positive * 2 -
//               data.sentimentCounts.negative * 2 -
//               data.highPriority * 3
//           )
//         )
//       )

//   const highPriorityItems = data.recentFeedback
//     .filter((item) => item.priority === "high")
//     .slice(0, 5)

//   const featureRequests = data.recentFeedback
//     .filter((item) => item.category === "feature_request")
//     .slice(0, 5)

//   const suggestedActions = data.recentFeedback
//     .map((item) => item.suggestedAction)
//     .filter(Boolean)
//     .slice(0, 5)

//   const businessImpacts = data.recentFeedback
//     .map((item) => item.businessImpact)
//     .filter(Boolean)
//     .slice(0, 3)

//   return (
//     <main className="mx-auto max-w-5xl p-8 print:p-0">
//       <div className="mb-6 flex items-center justify-between print:hidden">
//         <h1 className="text-2xl font-bold">ProductPulse Executive Report</h1>

//         <Button onClick={() => window.print()}>
//           Download PDF
//         </Button>
//       </div>

//       <section className="rounded-xl border bg-card p-8 shadow-sm print:border-none print:shadow-none">
//         <div className="border-b pb-6">
//           <h1 className="text-3xl font-bold">ProductPulse Executive Report</h1>
//           <p className="mt-2 text-muted-foreground">
//             AI-powered customer feedback intelligence summary
//           </p>
//           <p className="mt-1 text-sm text-muted-foreground">
//             Generated on {new Date().toLocaleString()}
//           </p>
//         </div>

//         <div className="grid grid-cols-2 gap-4 py-6 md:grid-cols-5">
//           <Metric label="Total Feedback" value={data.total} />
//           <Metric label="Health Score" value={healthScore} />
//           <Metric label="Positive" value={data.sentimentCounts.positive} />
//           <Metric label="Negative" value={data.sentimentCounts.negative} />
//           <Metric label="High Priority" value={data.highPriority} />
//         </div>

//         <ReportSection title="Top Feedback Categories">
//           {topCategories.length === 0 ? (
//             <p className="text-sm text-muted-foreground">No data available.</p>
//           ) : (
//             <ul className="space-y-2">
//               {topCategories.map(([category, count]) => (
//                 <li key={category} className="flex justify-between border-b pb-2">
//                   <span className="capitalize">{category.replace("_", " ")}</span>
//                   <span className="font-semibold">{count}</span>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </ReportSection>

//         <ReportSection title="High Priority Issues">
//           {highPriorityItems.length === 0 ? (
//             <p className="text-sm text-muted-foreground">No high priority issues found.</p>
//           ) : (
//             <ul className="space-y-3">
//               {highPriorityItems.map((item) => (
//                 <li key={item.id} className="rounded-lg border p-3">
//                   <p className="font-medium">{item.feedbackText}</p>
//                   <p className="mt-1 text-sm text-muted-foreground">
//                     {item.summary || "No summary available."}
//                   </p>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </ReportSection>

//         <ReportSection title="Feature Requests">
//           {featureRequests.length === 0 ? (
//             <p className="text-sm text-muted-foreground">No feature requests found.</p>
//           ) : (
//             <ul className="space-y-3">
//               {featureRequests.map((item) => (
//                 <li key={item.id} className="rounded-lg border p-3">
//                   <p className="font-medium">{item.feedbackText}</p>
//                   <p className="mt-1 text-sm text-muted-foreground">
//                     {item.summary || "No summary available."}
//                   </p>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </ReportSection>

//         <ReportSection title="Recommended Actions">
//           {suggestedActions.length === 0 ? (
//             <p className="text-sm text-muted-foreground">
//               Review high-priority feedback and prioritize based on customer impact.
//             </p>
//           ) : (
//             <ul className="list-disc space-y-2 pl-5">
//               {suggestedActions.map((action, index) => (
//                 <li key={index}>{action}</li>
//               ))}
//             </ul>
//           )}
//         </ReportSection>

//         <ReportSection title="Business Impact">
//           {businessImpacts.length === 0 ? (
//             <p className="text-sm text-muted-foreground">
//               Customer feedback may affect retention, satisfaction, conversion, and support load.
//             </p>
//           ) : (
//             <ul className="list-disc space-y-2 pl-5">
//               {businessImpacts.map((impact, index) => (
//                 <li key={index}>{impact}</li>
//               ))}
//             </ul>
//           )}
//         </ReportSection>
//       </section>
//     </main>
//   )
// }

// function Metric({ label, value }: { label: string; value: number }) {
//   return (
//     <div className="rounded-lg border p-4">
//       <p className="text-sm text-muted-foreground">{label}</p>
//       <p className="mt-1 text-2xl font-bold">{value}</p>
//     </div>
//   )
// }

// function ReportSection({
//   title,
//   children,
// }: {
//   title: string
//   children: React.ReactNode
// }) {
//   return (
//     <section className="border-t py-6">
//       <h2 className="mb-4 text-xl font-semibold">{title}</h2>
//       {children}
//     </section>
//   )
// }


"use client"

import { Button } from "@/components/ui/button"

import Link from "next/link"
import {
  AlertTriangle,
  BarChart3,
  Download,
  Lightbulb,
  Sparkles,
  TrendingUp,
} from "lucide-react"

type Feedback = {
  id: string
  feedbackText: string
  category: string | null
  priority: string | null
  sentiment: string | null
  summary?: string | null
  suggestedAction?: string | null
  businessImpact?: string | null
}

type Props = {
  data: {
    total: number
    highPriority: number
    sentimentCounts: {
      positive: number
      neutral: number
      negative: number
    }
    categoryCounts: Record<string, number>
    recentFeedback: Feedback[]
  }
}

export function ExecutiveReport({ data }: Props) {
  const topCategories = Object.entries(data.categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  const highPriorityItems = data.recentFeedback
    .filter((item) => item.priority === "high")
    .slice(0, 3)

  const featureRequests = data.recentFeedback
    .filter((item) => item.category === "feature_request")
    .slice(0, 3)

  const suggestedActions = data.recentFeedback
    .map((item) => item.suggestedAction)
    .filter(Boolean)
    .slice(0, 3)

  const businessImpacts = data.recentFeedback
    .map((item) => item.businessImpact)
    .filter(Boolean)
    .slice(0, 3)

  const healthScore = Math.max(
    60,
    Math.round(100 - data.highPriority * 2 - data.sentimentCounts.negative)
  )

  const positiveRate =
    data.total === 0
      ? 0
      : Math.round((data.sentimentCounts.positive / data.total) * 100)

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8 text-slate-950 print:bg-white print:p-0">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between print:hidden">
          <div>
            <p className="text-sm font-medium text-blue-600">ProductPulse</p>
            <h1 className="text-2xl font-bold tracking-tight">
              Executive Report
            </h1>
          </div>
          <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="outline">
                  Back to Dashboard
                </Button>
              </Link>

              <Button onClick={() => window.print()} className="gap-2">
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            </div>
        </div>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm print:border-none print:shadow-none">
          {/* <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-900 px-8 py-8 text-white"> */}
          <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-900 px-8 py-6 text-white">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm text-blue-100">
                  <Sparkles className="h-4 w-4" />
                  AI Customer Intelligence
                </div>

                <h1 className="text-4xl font-bold tracking-tight">
                  ProductPulse Executive Report
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200">
                  A product intelligence summary generated from customer
                  feedback stored in Amazon Aurora PostgreSQL and analyzed
                  through the ProductPulse insight pipeline.
                </p>
              </div>

              <div className="rounded-xl bg-white/10 p-4 text-right backdrop-blur">
                <p className="text-sm text-slate-300">Generated</p>
                <p className="mt-1 font-semibold">
                  {new Date().toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* <div className="grid gap-4 border-b border-slate-200 bg-slate-50 p-6 md:grid-cols-5"> */}
          <div className="grid grid-cols-2 gap-4 border-b border-slate-200 bg-slate-50 p-6 md:grid-cols-5">
            <Metric label="Total Feedback" value={data.total} />
            <Metric label="Health Score" value={`${healthScore}/100`} />
            <Metric label="Positive Rate" value={`${positiveRate}%`} />
            <Metric label="Negative" value={data.sentimentCounts.negative} />
            <Metric label="High Priority" value={data.highPriority} />
          </div>

          <div className="grid gap-6 p-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ReportCard
                icon={<BarChart3 className="h-5 w-5" />}
                title="Executive Summary"
              >
                <p className="leading-7 text-slate-700">
                  ProductPulse analyzed{" "}
                  <strong>{data.total} customer feedback items</strong>. The
                  current product health score is{" "}
                  <strong>{healthScore}/100</strong>, with{" "}
                  <strong>{data.highPriority}</strong> high-priority issues
                  requiring attention. Positive sentiment represents{" "}
                  <strong>{positiveRate}%</strong> of analyzed feedback.
                </p>
              </ReportCard>
            </div>

            <ReportCard
              icon={<TrendingUp className="h-5 w-5" />}
              title="Sentiment Breakdown"
            >
              <div className="space-y-3">
                <ProgressRow
                  label="Positive"
                  value={data.sentimentCounts.positive}
                  total={data.total}
                  tone="positive"
                />
                <ProgressRow
                  label="Neutral"
                  value={data.sentimentCounts.neutral}
                  total={data.total}
                  tone="neutral"
                />
                <ProgressRow
                  label="Negative"
                  value={data.sentimentCounts.negative}
                  total={data.total}
                  tone="negative"
                />
              </div>
            </ReportCard>
          </div>

          <div className="grid gap-6 px-6 pb-6 lg:grid-cols-2">
            <ReportCard
              icon={<BarChart3 className="h-5 w-5" />}
              title="Top Feedback Categories"
            >
              {topCategories.length === 0 ? (
                <Empty>No category data available.</Empty>
              ) : (
                <div className="space-y-3">
                  {topCategories.map(([category, count]) => (
                    <div
                      key={category}
                      className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                    >
                      <span className="font-medium capitalize">
                        {category.replace("_", " ")}
                      </span>
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                        {count}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </ReportCard>

            <ReportCard
              icon={<AlertTriangle className="h-5 w-5" />}
              title="High Priority Issues"
            >
              {highPriorityItems.length === 0 ? (
                <Empty>No high-priority issues found.</Empty>
              ) : (
                <div className="space-y-3">
                  {highPriorityItems.map((item) => (
                    <IssueCard key={item.id} item={item} />
                  ))}
                </div>
              )}
            </ReportCard>
          </div>

          <div className="grid gap-6 px-6 pb-6 lg:grid-cols-2">
            <ReportCard
              icon={<Lightbulb className="h-5 w-5" />}
              title="Feature Requests"
            >
              {featureRequests.length === 0 ? (
                <Empty>No feature requests found.</Empty>
              ) : (
                <div className="space-y-3">
                  {featureRequests.map((item) => (
                    <IssueCard key={item.id} item={item} />
                  ))}
                </div>
              )}
            </ReportCard>

            <ReportCard
              icon={<Sparkles className="h-5 w-5" />}
              title="Recommended Actions"
            >
              {suggestedActions.length === 0 ? (
                <ul className="list-disc space-y-2 pl-5 text-slate-700">
                  <li>Review high-priority feedback first.</li>
                  <li>Prioritize stability issues before new features.</li>
                  <li>Use feature requests to guide the next roadmap cycle.</li>
                </ul>
              ) : (
                <ul className="list-disc space-y-2 pl-5 text-slate-700">
                  {suggestedActions.map((action, index) => (
                    <li key={index}>{action}</li>
                  ))}
                </ul>
              )}
            </ReportCard>
          </div>

          <div className="px-6 pb-6">
            <ReportCard
              icon={<TrendingUp className="h-5 w-5" />}
              title="Business Impact"
            >
              {businessImpacts.length === 0 ? (
                <p className="leading-7 text-slate-700">
                  Customer feedback may affect retention, satisfaction,
                  conversion, support volume, and future roadmap confidence.
                </p>
              ) : (
                <ul className="list-disc space-y-2 pl-5 text-slate-700">
                  {businessImpacts.map((impact, index) => (
                    <li key={index}>{impact}</li>
                  ))}
                </ul>
              )}
            </ReportCard>
          </div>

          <footer className="border-t border-slate-200 bg-slate-50 px-8 py-5 text-sm text-slate-500">
            <div className="rounded-xl bg-blue-50 p-4 text-sm text-blue-700">
              Built with Next.js, Prisma, Amazon Aurora PostgreSQL, and AI-ready analysis.
            </div>
          </footer>
        </section>
      </div>
    </main>
  )
}

// function Metric({ label, value }: { label: string; value: number | string }) {
//   return (
//     <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
//       <p className="text-sm font-medium text-slate-500">{label}</p>
//       <p className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
//         {value}
//       </p>
//     </div>
//   )
// }

function Metric({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
        {value}
      </p>
    </div>
  )
}

function ReportCard({
  title,
  icon,
  children,
}: {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          {icon}
        </span>
        <h2 className="text-lg font-semibold tracking-tight text-slate-950">
          {title}
        </h2>
      </div>
      {children}
    </section>
  )
}

function ProgressRow({
  label,
  value,
  total,
  tone,
}: {
  label: string
  value: number
  total: number
  tone: "positive" | "neutral" | "negative"
}) {
  const percent = total === 0 ? 0 : Math.round((value / total) * 100)

  const colors = {
    positive: "bg-emerald-500",
    neutral: "bg-amber-500",
    negative: "bg-rose-500",
  }

  return (
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="text-slate-500">
          {value} · {percent}%
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full ${colors[tone]}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}

function IssueCard({ item }: { item: Feedback }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-2 flex flex-wrap gap-2">
        <Badge tone={item.priority === "high" ? "danger" : "neutral"}>
          {item.priority || "medium"}
        </Badge>
        <Badge tone="blue">{(item.category || "general").replace("_", " ")}</Badge>
      </div>
      <p className="font-medium leading-6 text-slate-900">
        {item.feedbackText}
      </p>
      {item.summary && (
        <p className="mt-2 text-sm leading-6 text-slate-600">{item.summary}</p>
      )}
    </div>
  )
}

function Badge({
  children,
  tone,
}: {
  children: React.ReactNode
  tone: "danger" | "neutral" | "blue"
}) {
  const styles = {
    danger: "bg-rose-100 text-rose-700",
    neutral: "bg-slate-100 text-slate-700",
    blue: "bg-blue-100 text-blue-700",
  }

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${styles[tone]}`}
    >
      {children}
    </span>
  )
}

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-slate-500">{children}</p>
}

