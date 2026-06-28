// import {
//   MessageSquare,
//   AlertCircle,
//   CheckCircle2,
//   Clock,
// } from "lucide-react"

// type Feedback = {
//   id: string
//   customerName: string
//   feedbackText: string
//   sentiment: string
//   category: string
//   priority: string
//   createdAt: string
// }

// type Props = {
//   data: {
//     recentFeedback: Feedback[]
//   }
// }

// function sentimentBadge(sentiment: string) {
//   switch (sentiment) {
//     case "positive":
//       return "bg-green-100 text-green-700"
//     case "negative":
//       return "bg-red-100 text-red-700"
//     default:
//       return "bg-yellow-100 text-yellow-700"
//   }
// }

// function priorityBadge(priority: string) {
//   switch (priority) {
//     case "high":
//       return "bg-red-100 text-red-700"
//     case "medium":
//       return "bg-yellow-100 text-yellow-700"
//     default:
//       return "bg-green-100 text-green-700"
//   }
// }

// export function RecentFeedback({ data }: Props) {
//   return (
//     <section className="rounded-xl border border-border bg-card shadow-sm">
//       <div className="flex items-center gap-2 border-b border-border p-5">
//         <MessageSquare className="h-5 w-5 text-primary" />
//         <div>
//           <h2 className="text-base font-semibold">
//             Recent Feedback
//           </h2>
//           <p className="text-sm text-muted-foreground">
//             Latest customer submissions
//           </p>
//         </div>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-secondary/30">
//             <tr className="text-left text-sm">
//               <th className="px-4 py-3">Customer</th>
//               <th className="px-4 py-3">Feedback</th>
//               <th className="px-4 py-3">Sentiment</th>
//               <th className="px-4 py-3">Category</th>
//               <th className="px-4 py-3">Priority</th>
//               <th className="px-4 py-3">Date</th>
//             </tr>
//           </thead>

//           <tbody>
//             {data.recentFeedback.map((item) => (
//               <tr
//                 key={item.id}
//                 className="border-t border-border hover:bg-secondary/20"
//               >
//                 <td className="px-4 py-3 font-medium">
//                   {item.customerName}
//                 </td>

//                 <td className="max-w-md truncate px-4 py-3">
//                   {item.feedbackText}
//                 </td>

//                 <td className="px-4 py-3">
//                   <span
//                     className={`rounded-md px-2 py-1 text-xs font-medium ${sentimentBadge(
//                       item.sentiment
//                     )}`}
//                   >
//                     {item.sentiment}
//                   </span>
//                 </td>

//                 <td className="px-4 py-3 capitalize">
//                   {item.category.replace("_", " ")}
//                 </td>

//                 <td className="px-4 py-3">
//                   <span
//                     className={`rounded-md px-2 py-1 text-xs font-medium ${priorityBadge(
//                       item.priority
//                     )}`}
//                   >
//                     {item.priority}
//                   </span>
//                 </td>

//                 <td className="px-4 py-3 text-sm text-muted-foreground">
//                   {new Date(item.createdAt).toLocaleDateString()}
//                 </td>
//               </tr>
//             ))}

//             {data.recentFeedback.length === 0 && (
//               <tr>
//                 <td
//                   colSpan={6}
//                   className="py-10 text-center text-muted-foreground"
//                 >
//                   <Clock className="mx-auto mb-2 h-5 w-5" />
//                   No feedback uploaded yet.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </section>
//   )
// }


"use client"

import { useMemo, useState } from "react"
import { MessageSquare, Clock, Search } from "lucide-react"

type Feedback = {
  id: string
  customerName: string | null
  feedbackText: string
  sentiment: string | null
  category: string | null
  priority: string | null
  createdAt: string
}

type Props = {
  data: {
    recentFeedback: Feedback[]
  }
}

function sentimentBadge(sentiment: string | null) {
  switch (sentiment) {
    case "positive":
      return "bg-green-100 text-green-700"
    case "negative":
      return "bg-red-100 text-red-700"
    default:
      return "bg-yellow-100 text-yellow-700"
  }
}

function priorityBadge(priority: string | null) {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-700"
    case "medium":
      return "bg-yellow-100 text-yellow-700"
    default:
      return "bg-green-100 text-green-700"
  }
}

export function RecentFeedback({ data }: Props) {
  const [search, setSearch] = useState("")
  const [sentiment, setSentiment] = useState("all")
  const [priority, setPriority] = useState("all")
  const [category, setCategory] = useState("all")

  const categories = Array.from(
    new Set(data.recentFeedback.map((item) => item.category || "general"))
  )

  const filteredFeedback = useMemo(() => {
    return data.recentFeedback.filter((item) => {
      const matchesSearch =
        item.feedbackText.toLowerCase().includes(search.toLowerCase()) ||
        (item.customerName || "")
          .toLowerCase()
          .includes(search.toLowerCase())

      const matchesSentiment =
        sentiment === "all" || item.sentiment === sentiment

      const matchesPriority = priority === "all" || item.priority === priority

      const matchesCategory =
        category === "all" || (item.category || "general") === category

      return (
        matchesSearch &&
        matchesSentiment &&
        matchesPriority &&
        matchesCategory
      )
    })
  }, [data.recentFeedback, search, sentiment, priority, category])

  return (
    <section className="rounded-xl border border-border bg-card shadow-sm">
      <div className="flex flex-col gap-4 border-b border-border p-5">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          <div>
            <h2 className="text-base font-semibold">Recent Feedback</h2>
            <p className="text-sm text-muted-foreground">
              Search and filter latest customer submissions
            </p>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-4">
          <div className="relative md:col-span-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search feedback..."
              className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm outline-none"
            />
          </div>

          <select
            value={sentiment}
            onChange={(e) => setSentiment(e.target.value)}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none"
          >
            <option value="all">All sentiments</option>
            <option value="positive">Positive</option>
            <option value="neutral">Neutral</option>
            <option value="negative">Negative</option>
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none"
          >
            <option value="all">All priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none"
          >
            <option value="all">All categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary/30">
            <tr className="text-left text-sm">
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Feedback</th>
              <th className="px-4 py-3">Sentiment</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Priority</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {filteredFeedback.map((item) => (
              <tr
                key={item.id}
                className="border-t border-border hover:bg-secondary/20"
              >
                <td className="px-4 py-3 font-medium">
                  {item.customerName || "Anonymous"}
                </td>

                <td className="max-w-md truncate px-4 py-3">
                  {item.feedbackText}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`rounded-md px-2 py-1 text-xs font-medium ${sentimentBadge(
                      item.sentiment
                    )}`}
                  >
                    {item.sentiment || "neutral"}
                  </span>
                </td>

                <td className="px-4 py-3 capitalize">
                  {(item.category || "general").replace("_", " ")}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`rounded-md px-2 py-1 text-xs font-medium ${priorityBadge(
                      item.priority
                    )}`}
                  >
                    {item.priority || "medium"}
                  </span>
                </td>

                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}

            {filteredFeedback.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="py-10 text-center text-muted-foreground"
                >
                  <Clock className="mx-auto mb-2 h-5 w-5" />
                  No feedback matches your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
