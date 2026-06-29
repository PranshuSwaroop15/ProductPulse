export const dynamic = "force-dynamic"

import { Sidebar } from "@/components/dashboard/sidebar"
import { Topbar } from "@/components/dashboard/topbar"
import { KpiCards } from "@/components/dashboard/kpi-cards"
import { SentimentChart } from "@/components/dashboard/sentiment-chart"
import { TopComplaints } from "@/components/dashboard/top-complaints"
import { FeatureRequests } from "@/components/dashboard/feature-requests"
import { FeedbackUpload } from "@/components/dashboard/feedback-upload"
import { AiSummary } from "@/components/dashboard/ai-summary"
import { RecentFeedback } from "@/components/dashboard/recent-feedback"
import { getDashboardData } from "@/lib/get-dashboard-data";
export default async function DashboardPage() {
  const data = await getDashboardData()
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="flex-1 p-4 md:p-6">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                ProductPulse Dashboard
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                AI-powered customer intelligence from live Aurora PostgreSQL feedback.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-6">
          <KpiCards data={data} />

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <SentimentChart data={data} />
            </div>
            <AiSummary data={data} />
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <TopComplaints data={data} />
            <FeatureRequests data={data} />
            <FeedbackUpload />
          </div>

          <RecentFeedback data={data} />
        </div>
        </main>
      </div>
    </div>
  )
}