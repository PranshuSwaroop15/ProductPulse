import type { LucideIcon } from "lucide-react"
import {
  ArrowDownRight,
  ArrowUpRight,
  MessageSquare,
  Smile,
  Star,
  TrendingUp,
} from "lucide-react"

export type Trend = "up" | "down"

export interface Kpi {
  label: string
  value: string
  delta: string
  trend: Trend
  positive: boolean
  icon: LucideIcon
  caption: string
}

export const kpis: Kpi[] = [
  {
    label: "Total Feedback",
    value: "24,815",
    delta: "12.4%",
    trend: "up",
    positive: true,
    icon: MessageSquare,
    caption: "vs. last 30 days",
  },
  {
    label: "Sentiment Score",
    value: "78.2",
    delta: "4.1 pts",
    trend: "up",
    positive: true,
    icon: Smile,
    caption: "avg. across channels",
  },
  {
    label: "CSAT",
    value: "4.6 / 5",
    delta: "0.2",
    trend: "down",
    positive: false,
    icon: Star,
    caption: "1,204 ratings",
  },
  {
    label: "Response Rate",
    value: "92.7%",
    delta: "3.5%",
    trend: "up",
    positive: true,
    icon: TrendingUp,
    caption: "tickets resolved < 24h",
  },
]

export const deltaIcon = {
  up: ArrowUpRight,
  down: ArrowDownRight,
}

export interface SentimentPoint {
  label: string
  positive: number
  neutral: number
  negative: number
}

// Monthly distribution of sentiment, values are percentages summing to 100
export const sentimentSeries: SentimentPoint[] = [
  { label: "Jan", positive: 58, neutral: 27, negative: 15 },
  { label: "Feb", positive: 61, neutral: 24, negative: 15 },
  { label: "Mar", positive: 55, neutral: 28, negative: 17 },
  { label: "Apr", positive: 63, neutral: 25, negative: 12 },
  { label: "May", positive: 67, neutral: 22, negative: 11 },
  { label: "Jun", positive: 64, neutral: 23, negative: 13 },
  { label: "Jul", positive: 70, neutral: 20, negative: 10 },
  { label: "Aug", positive: 72, neutral: 19, negative: 9 },
  { label: "Sep", positive: 69, neutral: 21, negative: 10 },
  { label: "Oct", positive: 74, neutral: 18, negative: 8 },
  { label: "Nov", positive: 76, neutral: 17, negative: 7 },
  { label: "Dec", positive: 78, neutral: 16, negative: 6 },
]

export interface Complaint {
  title: string
  mentions: number
  change: number
  severity: "high" | "medium" | "low"
}

export const topComplaints: Complaint[] = [
  { title: "Slow loading on dashboard", mentions: 1284, change: 18, severity: "high" },
  { title: "Confusing onboarding flow", mentions: 942, change: 7, severity: "high" },
  { title: "Mobile app crashes on export", mentions: 731, change: -12, severity: "medium" },
  { title: "Billing page errors", mentions: 564, change: 4, severity: "medium" },
  { title: "Missing dark mode", mentions: 412, change: -3, severity: "low" },
]

export interface FeatureRequest {
  title: string
  votes: number
  status: "planned" | "under-review" | "exploring"
  tag: string
}

export const featureRequests: FeatureRequest[] = [
  { title: "Slack & Teams integrations", votes: 2140, status: "planned", tag: "Integrations" },
  { title: "Custom dashboard widgets", votes: 1687, status: "under-review", tag: "Analytics" },
  { title: "Bulk CSV feedback import", votes: 1322, status: "planned", tag: "Data" },
  { title: "Role-based access control", votes: 980, status: "exploring", tag: "Admin" },
  { title: "AI auto-tagging rules", votes: 745, status: "under-review", tag: "AI" },
]

export interface AiInsight {
  title: string
  body: string
  tone: "positive" | "negative" | "neutral"
}

export const aiInsights: AiInsight[] = [
  {
    title: "Performance is the leading driver of negative sentiment",
    body: "Dashboard load times account for 31% of negative feedback this month, up 18%. Customers on Enterprise plans are most affected.",
    tone: "negative",
  },
  {
    title: "Onboarding sentiment is improving",
    body: "After the guided setup launch, mentions of confusion dropped 14% week-over-week. New users reach activation 22% faster.",
    tone: "positive",
  },
  {
    title: "Integration demand is consolidating",
    body: "Slack and Teams now represent 38% of all feature requests, signaling a clear roadmap priority for next quarter.",
    tone: "neutral",
  },
]
