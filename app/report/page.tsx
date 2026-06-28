import { ExecutiveReport } from "@/components/dashboard/executive-report"
import { getDashboardData } from "@/lib/get-dashboard-data";

export default async function ReportPage() {
  const data = await getDashboardData()

  return <ExecutiveReport data={data} />
}