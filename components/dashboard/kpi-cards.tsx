// import { ArrowDownRight, ArrowUpRight } from "lucide-react"
// import { kpis } from "@/lib/dashboard-data"
// import { cn } from "@/lib/utils"

// export function KpiCards() {
//   return (
//     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
//       {kpis.map((kpi) => {
//         const Arrow = kpi.trend === "up" ? ArrowUpRight : ArrowDownRight
//         return (
//           <div
//             key={kpi.label}
//             className="rounded-xl border border-border bg-card p-5 shadow-sm"
//           >
//             <p className="text-sm font-medium text-muted-foreground">
//               {kpi.label}
//             </p>
//             <div className="mt-2 flex items-end justify-between gap-2">
//               <span className="text-2xl font-semibold tracking-tight text-card-foreground">
//                 {kpi.value}
//               </span>
//               <span
//                 className={cn(
//                   "flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-medium",
//                   kpi.positive
//                     ? "bg-[oklch(0.95_0.05_160)] text-[oklch(0.45_0.13_160)]"
//                     : "bg-[oklch(0.95_0.04_30)] text-[oklch(0.5_0.18_30)]",
//                 )}
//               >
//                 <Arrow className="h-3.5 w-3.5" />
//                 {kpi.change}
//               </span>
//             </div>
//             <p className="mt-2 text-xs text-muted-foreground">{kpi.hint}</p>
//           </div>
//         )
//       })}
//     </div>
//   )
// }


import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

type DashboardData = {
  total: number
  sentimentCounts: {
    positive: number
    neutral: number
    negative: number
  }
  highPriority: number
}

type Props = {
  data: DashboardData
}

export function KpiCards({ data }: Props) {
  const kpis = [
    {
      label: "Total Feedback",
      value: data.total,
      change: `${data.total}`,
      hint: "Feedback analyzed",
      trend: "up",
      positive: true,
    },
    {
      label: "Positive",
      value: data.sentimentCounts.positive,
      change: `${data.sentimentCounts.positive}`,
      hint: "Positive sentiment",
      trend: "up",
      positive: true,
    },
    {
      label: "Negative",
      value: data.sentimentCounts.negative,
      change: `${data.sentimentCounts.negative}`,
      hint: "Needs attention",
      trend: "down",
      positive: false,
    },
    {
      label: "High Priority",
      value: data.highPriority,
      change: `${data.highPriority}`,
      hint: "Critical issues",
      trend: "down",
      positive: false,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => {
        const Arrow = kpi.trend === "up" ? ArrowUpRight : ArrowDownRight

        return (
          <div
            key={kpi.label}
            className="rounded-xl border border-border bg-card p-5 shadow-sm"
          >
            <p className="text-sm font-medium text-muted-foreground">
              {kpi.label}
            </p>

            <div className="mt-2 flex items-end justify-between gap-2">
              <span className="text-2xl font-semibold tracking-tight text-card-foreground">
                {kpi.value}
              </span>

              <span
                className={cn(
                  "flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-medium",
                  kpi.positive
                    ? "bg-[oklch(0.95_0.05_160)] text-[oklch(0.45_0.13_160)]"
                    : "bg-[oklch(0.95_0.04_30)] text-[oklch(0.5_0.18_30)]"
                )}
              >
                <Arrow className="h-3.5 w-3.5" />
                {kpi.change}
              </span>
            </div>

            <p className="mt-2 text-xs text-muted-foreground">
              {kpi.hint}
            </p>
          </div>
        )
      })}
    </div>
  )
}


