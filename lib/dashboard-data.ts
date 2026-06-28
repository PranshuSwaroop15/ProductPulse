export type Trend = "up" | "down"

export interface Kpi {
  label: string
  value: string
  change: string
  trend: Trend
  positive: boolean
  hint: string
}

export const kpis: Kpi[] = [
  {
    label: "Feedback analyzed",
    value: "48,219",
    change: "+12.4%",
    trend: "up",
    positive: true,
    hint: "vs. last 30 days",
  },
  {
    label: "Positive sentiment",
    value: "72.6%",
    change: "+3.1 pts",
    trend: "up",
    positive: true,
    hint: "across all channels",
  },
  {
    label: "Avg. response time",
    value: "4h 12m",
    change: "-18.0%",
    trend: "down",
    positive: true,
    hint: "first reply",
  },
  {
    label: "Churn risk signals",
    value: "126",
    change: "+9.7%",
    trend: "up",
    positive: false,
    hint: "flagged this week",
  },
]

export interface SentimentPoint {
  week: string
  positive: number
  neutral: number
  negative: number
}

export const sentimentTrend: SentimentPoint[] = [
  { week: "Wk 1", positive: 61, neutral: 24, negative: 15 },
  { week: "Wk 2", positive: 64, neutral: 22, negative: 14 },
  { week: "Wk 3", positive: 59, neutral: 26, negative: 15 },
  { week: "Wk 4", positive: 66, neutral: 21, negative: 13 },
  { week: "Wk 5", positive: 69, neutral: 19, negative: 12 },
  { week: "Wk 6", positive: 67, neutral: 22, negative: 11 },
  { week: "Wk 7", positive: 71, neutral: 19, negative: 10 },
  { week: "Wk 8", positive: 73, neutral: 18, negative: 9 },
]

export interface Complaint {
  title: string
  category: string
  mentions: number
  change: number
  severity: "high" | "medium" | "low"
}

export const complaints: Complaint[] = [
  {
    title: "Slow dashboard load times",
    category: "Performance",
    mentions: 1842,
    change: 23,
    severity: "high",
  },
  {
    title: "Confusing billing breakdown",
    category: "Billing",
    mentions: 1204,
    change: 11,
    severity: "high",
  },
  {
    title: "Mobile app sync failures",
    category: "Reliability",
    mentions: 968,
    change: -6,
    severity: "medium",
  },
  {
    title: "Limited export formats",
    category: "Integrations",
    mentions: 712,
    change: 4,
    severity: "medium",
  },
  {
    title: "Email notifications too frequent",
    category: "Notifications",
    mentions: 503,
    change: -14,
    severity: "low",
  },
]

export interface FeatureRequest {
  title: string
  votes: number
  status: "Planned" | "Under review" | "Exploring"
  author: string
}

export const featureRequests: FeatureRequest[] = [
  {
    title: "Native Slack integration for alerts",
    votes: 1287,
    status: "Planned",
    author: "412 customers",
  },
  {
    title: "Custom sentiment tagging rules",
    votes: 964,
    status: "Under review",
    author: "318 customers",
  },
  {
    title: "Bulk CSV import with mapping",
    votes: 738,
    status: "Planned",
    author: "276 customers",
  },
  {
    title: "Multi-language sentiment models",
    votes: 521,
    status: "Exploring",
    author: "189 customers",
  },
]

export interface NavItem {
  label: string
  icon: string
  active?: boolean
  badge?: string
}

export const recentUploads = [
  { name: "zendesk_export_aug.csv", size: "8.4 MB", status: "Processed", rows: "12,480" },
  { name: "appstore_reviews_q2.json", size: "3.1 MB", status: "Processing", rows: "5,210" },
  { name: "nps_survey_july.xlsx", size: "1.2 MB", status: "Processed", rows: "2,038" },
]
