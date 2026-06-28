import { ExecutiveReport } from "../../components/dashboard/executive-report"

async function getDashboardData() {
  const res = await fetch("http://localhost:3000/api/dashboard", {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard data")
  }

  return res.json()
}

export default async function ReportPage() {
  const data = await getDashboardData()

  return <ExecutiveReport data={data} />
}