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


