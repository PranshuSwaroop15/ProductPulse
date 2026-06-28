// import { ArrowUpRight, ArrowDownRight, MessageSquareWarning } from "lucide-react"
// import { complaints } from "@/lib/dashboard-data"
// import { cn } from "@/lib/utils"

// const severityStyles: Record<string, string> = {
//   high: "bg-[oklch(0.95_0.04_30)] text-[oklch(0.5_0.18_30)]",
//   medium: "bg-[oklch(0.96_0.05_80)] text-[oklch(0.5_0.13_80)]",
//   low: "bg-secondary text-secondary-foreground",
// }

// export function TopComplaints() {
//   return (
//     <section className="flex flex-col rounded-xl border border-border bg-card shadow-sm">
//       <div className="flex items-center justify-between border-b border-border p-5">
//         <div className="flex items-center gap-2">
//           <MessageSquareWarning className="h-4.5 w-4.5 text-muted-foreground" />
//           <h2 className="text-base font-semibold tracking-tight text-card-foreground">
//             Top complaints
//           </h2>
//         </div>
//         <a
//           href="#"
//           className="text-sm font-medium text-primary hover:underline"
//         >
//           View all
//         </a>
//       </div>

//       <ul className="divide-y divide-border">
//         {complaints.map((c) => {
//           const Arrow = c.change >= 0 ? ArrowUpRight : ArrowDownRight
//           return (
//             <li
//               key={c.title}
//               className="flex items-center justify-between gap-4 px-5 py-3.5"
//             >
//               <div className="min-w-0">
//                 <p className="truncate text-sm font-medium text-card-foreground">
//                   {c.title}
//                 </p>
//                 <div className="mt-1 flex items-center gap-2">
//                   <span
//                     className={cn(
//                       "rounded px-1.5 py-0.5 text-xs font-medium capitalize",
//                       severityStyles[c.severity],
//                     )}
//                   >
//                     {c.severity}
//                   </span>
//                   <span className="text-xs text-muted-foreground">
//                     {c.category}
//                   </span>
//                 </div>
//               </div>
//               <div className="flex flex-col items-end">
//                 <span className="text-sm font-semibold text-card-foreground">
//                   {c.mentions.toLocaleString()}
//                 </span>
//                 <span
//                   className={cn(
//                     "flex items-center gap-0.5 text-xs font-medium",
//                     c.change >= 0
//                       ? "text-[oklch(0.5_0.18_30)]"
//                       : "text-[oklch(0.45_0.13_160)]",
//                   )}
//                 >
//                   <Arrow className="h-3 w-3" />
//                   {Math.abs(c.change)}%
//                 </span>
//               </div>
//             </li>
//           )
//         })}
//       </ul>
//     </section>
//   )
// }

import { MessageSquareWarning } from "lucide-react"
import { cn } from "@/lib/utils"

type DashboardData = {
  categoryCounts: Record<string, number>
}

type Props = {
  data: DashboardData
}

const severityStyles: Record<string, string> = {
  high: "bg-[oklch(0.95_0.04_30)] text-[oklch(0.5_0.18_30)]",
  medium: "bg-[oklch(0.96_0.05_80)] text-[oklch(0.5_0.13_80)]",
  low: "bg-secondary text-secondary-foreground",
}

export function TopComplaints({ data }: Props) {
  const complaints = Object.entries(data.categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([category, count]) => ({
      title: category.replaceAll("_", " "),
      mentions: count,
      severity:
        count >= 10 ? "high" : count >= 5 ? "medium" : "low",
    }))

  return (
    <section className="flex flex-col rounded-xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border p-5">
        <div className="flex items-center gap-2">
          <MessageSquareWarning className="h-4.5 w-4.5 text-muted-foreground" />
          <h2 className="text-base font-semibold tracking-tight text-card-foreground">
            Top complaints
          </h2>
        </div>
      </div>

      <ul className="divide-y divide-border">
        {complaints.map((c) => (
          <li
            key={c.title}
            className="flex items-center justify-between px-5 py-3.5"
          >
            <div>
              <p className="text-sm font-medium capitalize">
                {c.title}
              </p>

              <span
                className={cn(
                  "mt-1 inline-block rounded px-1.5 py-0.5 text-xs font-medium",
                  severityStyles[c.severity]
                )}
              >
                {c.severity}
              </span>
            </div>

            <span className="text-lg font-semibold">
              {c.mentions}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}


