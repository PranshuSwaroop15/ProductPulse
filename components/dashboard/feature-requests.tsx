import { ChevronUp, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"

type DashboardData = {
  categoryCounts: Record<string, number>
}

type Props = {
  data: DashboardData
}

const statusStyles: Record<string, string> = {
  Planned: "bg-accent text-accent-foreground",
  "Under review": "bg-[oklch(0.96_0.05_80)] text-[oklch(0.5_0.13_80)]",
  Exploring: "bg-secondary text-secondary-foreground",
}

export function FeatureRequests({ data }: Props) {
  const featureRequests = Object.entries(data.categoryCounts)
    .filter(([category]) => category === "feature_request")
    .map(([category, count]) => ({
      title: "Feature Requests",
      votes: count,
      author: `${count} customer request${count === 1 ? "" : "s"}`,
      status:
        count >= 10
          ? "Planned"
          : count >= 5
          ? "Under review"
          : "Exploring",
    }))

  return (
    <section className="flex flex-col rounded-xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b border-border p-5">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-4.5 w-4.5 text-muted-foreground" />
          <h2 className="text-base font-semibold tracking-tight text-card-foreground">
            Feature requests
          </h2>
        </div>
      </div>

      <ul className="divide-y divide-border">
        {featureRequests.length === 0 ? (
          <li className="px-5 py-6 text-sm text-muted-foreground">
            No feature requests found.
          </li>
        ) : (
          featureRequests.map((f) => (
            <li
              key={f.title}
              className="flex items-center gap-4 px-5 py-3.5"
            >
              <div className="flex w-14 shrink-0 flex-col items-center justify-center rounded-lg border border-border bg-secondary py-1.5">
                <ChevronUp className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-card-foreground">
                  {f.votes}
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-card-foreground">
                  {f.title}
                </p>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  {f.author}
                </p>
              </div>

              <span
                className={cn(
                  "shrink-0 rounded-md px-2 py-1 text-xs font-medium",
                  statusStyles[f.status]
                )}
              >
                {f.status}
              </span>
            </li>
          ))
        )}
      </ul>
    </section>
  )
}

