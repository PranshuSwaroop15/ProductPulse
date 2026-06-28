// "use client"

// import {
//   Area,
//   AreaChart,
//   CartesianGrid,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts"
// import { sentimentTrend } from "@/lib/dashboard-data"

// const series = [
//   { key: "positive", label: "Positive", color: "var(--chart-1)" },
//   { key: "neutral", label: "Neutral", color: "var(--chart-2)" },
//   { key: "negative", label: "Negative", color: "var(--chart-3)" },
// ] as const

// export function SentimentChart() {
//   return (
//     <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
//       <div className="flex flex-wrap items-start justify-between gap-3">
//         <div>
//           <h2 className="text-base font-semibold tracking-tight text-card-foreground">
//             Sentiment over time
//           </h2>
//           <p className="mt-0.5 text-sm text-muted-foreground">
//             Share of feedback by tone, last 8 weeks
//           </p>
//         </div>
//         <div className="flex flex-wrap items-center gap-4">
//           {series.map((s) => (
//             <div key={s.key} className="flex items-center gap-1.5">
//               <span
//                 className="h-2.5 w-2.5 rounded-full"
//                 style={{ backgroundColor: s.color }}
//               />
//               <span className="text-xs font-medium text-muted-foreground">
//                 {s.label}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="mt-5 h-72 w-full">
//         <ResponsiveContainer width="100%" height="100%">
//           <AreaChart
//             data={sentimentTrend}
//             margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
//           >
//             <defs>
//               {series.map((s) => (
//                 <linearGradient
//                   key={s.key}
//                   id={`fill-${s.key}`}
//                   x1="0"
//                   y1="0"
//                   x2="0"
//                   y2="1"
//                 >
//                   <stop offset="0%" stopColor={s.color} stopOpacity={0.25} />
//                   <stop offset="100%" stopColor={s.color} stopOpacity={0.02} />
//                 </linearGradient>
//               ))}
//             </defs>
//             <CartesianGrid
//               vertical={false}
//               stroke="var(--border)"
//               strokeDasharray="4 4"
//             />
//             <XAxis
//               dataKey="week"
//               tickLine={false}
//               axisLine={false}
//               tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
//               dy={8}
//             />
//             <YAxis
//               tickLine={false}
//               axisLine={false}
//               tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
//               unit="%"
//               width={48}
//             />
//             <Tooltip content={<ChartTooltip />} />
//             {series.map((s) => (
//               <Area
//                 key={s.key}
//                 type="monotone"
//                 dataKey={s.key}
//                 stroke={s.color}
//                 strokeWidth={2}
//                 fill={`url(#fill-${s.key})`}
//                 stackId={undefined}
//                 dot={false}
//                 activeDot={{ r: 4, strokeWidth: 0 }}
//               />
//             ))}
//           </AreaChart>
//         </ResponsiveContainer>
//       </div>
//     </section>
//   )
// }

// function ChartTooltip({
//   active,
//   payload,
//   label,
// }: {
//   active?: boolean
//   payload?: Array<{ name: string; value: number; color: string }>
//   label?: string
// }) {
//   if (!active || !payload?.length) return null
//   return (
//     <div className="rounded-lg border border-border bg-popover p-3 shadow-md">
//       <p className="mb-1.5 text-xs font-medium text-popover-foreground">
//         {label}
//       </p>
//       <div className="flex flex-col gap-1">
//         {payload.map((entry) => (
//           <div
//             key={entry.name}
//             className="flex items-center justify-between gap-4 text-xs"
//           >
//             <span className="flex items-center gap-1.5 capitalize text-muted-foreground">
//               <span
//                 className="h-2 w-2 rounded-full"
//                 style={{ backgroundColor: entry.color }}
//               />
//               {entry.name}
//             </span>
//             <span className="font-medium text-popover-foreground">
//               {entry.value}%
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

"use client"

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const series = [
  { key: "positive", label: "Positive", color: "var(--chart-1)" },
  { key: "neutral", label: "Neutral", color: "var(--chart-2)" },
  { key: "negative", label: "Negative", color: "var(--chart-3)" },
] as const

// type DashboardData = {
//   sentimentCounts: {
//     positive: number
//     neutral: number
//     negative: number
//   }
// }

type DashboardData = {
  sentimentCounts: {
    positive: number
    neutral: number
    negative: number
  }
  last7Days: {
    day: string
    total: number
    positive: number
    neutral: number
    negative: number
    highPriority: number
  }[]
}

type Props = {
  data: DashboardData
}

export function SentimentChart({ data }: Props) {
  const total =
    data.sentimentCounts.positive +
    data.sentimentCounts.neutral +
    data.sentimentCounts.negative

  const toPercent = (value: number) => {
    if (total === 0) return 0
    return Math.round((value / total) * 100)
  }

  // const sentimentTrend = [
  //   {
  //     week: "Now",
  //     positive: toPercent(data.sentimentCounts.positive),
  //     neutral: toPercent(data.sentimentCounts.neutral),
  //     negative: toPercent(data.sentimentCounts.negative),
  //   },
  // ]
  const sentimentTrend = data.last7Days.map((day) => {
  const total = day.total || 1

  return {
    week: day.day,
    positive: Math.round((day.positive / total) * 100),
    neutral: Math.round((day.neutral / total) * 100),
    negative: Math.round((day.negative / total) * 100),
    }
  })

  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold tracking-tight text-card-foreground">
            Sentiment overview
          </h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Live sentiment distribution from Aurora feedback data
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {series.map((s) => (
            <div key={s.key} className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: s.color }}
              />
              <span className="text-xs font-medium text-muted-foreground">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={sentimentTrend}
            margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
          >
            <defs>
              {series.map((s) => (
                <linearGradient
                  key={s.key}
                  id={`fill-${s.key}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={s.color} stopOpacity={0.25} />
                  <stop offset="100%" stopColor={s.color} stopOpacity={0.02} />
                </linearGradient>
              ))}
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="var(--border)"
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              dy={8}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              unit="%"
              width={48}
            />

            <Tooltip content={<ChartTooltip />} />

            {series.map((s) => (
              <Area
                key={s.key}
                type="monotone"
                dataKey={s.key}
                stroke={s.color}
                strokeWidth={2}
                fill={`url(#fill-${s.key})`}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: Array<{ name: string; value: number; color: string }>
  label?: string
}) {
  if (!active || !payload?.length) return null

  return (
    <div className="rounded-lg border border-border bg-popover p-3 shadow-md">
      <p className="mb-1.5 text-xs font-medium text-popover-foreground">
        {label}
      </p>

      <div className="flex flex-col gap-1">
        {payload.map((entry) => (
          <div
            key={entry.name}
            className="flex items-center justify-between gap-4 text-xs"
          >
            <span className="flex items-center gap-1.5 capitalize text-muted-foreground">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              {entry.name}
            </span>

            <span className="font-medium text-popover-foreground">
              {entry.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

