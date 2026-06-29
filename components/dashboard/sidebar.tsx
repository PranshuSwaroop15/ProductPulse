"use client"

import {
  LayoutDashboard,
  MessageSquareText,
  TrendingUp,
  Lightbulb,
  Upload,
  Sparkles,
  Users,
  Settings,
  LifeBuoy,
  Waves,
  Activity,
} from "lucide-react"
import { cn } from "@/lib/utils"

const mainNav = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Feedback", icon: MessageSquareText, badge: "2.4k" },
  { label: "Sentiment", icon: TrendingUp },
  { label: "Feature requests", icon: Lightbulb, badge: "18" },
  { label: "Imports", icon: Upload },
  { label: "AI insights", icon: Sparkles },
]

const secondaryNav = [
  { label: "Audiences", icon: Users },
  { label: "Settings", icon: Settings },
  { label: "Support", icon: LifeBuoy },
]

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
      <div className="flex h-16 items-center gap-2.5 border-b border-sidebar-border px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Activity className="h-5 w-5" />
        </div>
        <span className="text-base font-semibold tracking-tight text-sidebar-foreground">
          ProductPulse
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
        <p className="px-3 pb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Workspace
        </p>
        {mainNav.map((item) => (
          <NavLink key={item.label} {...item} />
        ))}

        <p className="px-3 pb-1 pt-5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Account
        </p>
        {secondaryNav.map((item) => (
          <NavLink key={item.label} {...item} />
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <div className="rounded-xl bg-accent p-4">
          <div className="flex items-center gap-2 text-accent-foreground">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-semibold">AI credits</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            8,420 of 10,000 analyses used this month.
          </p>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <div className="h-full w-[84%] rounded-full bg-primary" />
          </div>
        </div>
      </div>
    </aside>
  )
}

function NavLink({
  label,
  icon: Icon,
  active,
  badge,
}: {
  label: string
  icon: React.ElementType
  active?: boolean
  badge?: string
}) {
  return (
    <a
      href="#"
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-muted-foreground hover:bg-secondary hover:text-foreground",
      )}
    >
      <Icon className="h-4.5 w-4.5 shrink-0" />
      <span className="flex-1">{label}</span>
      {badge ? (
        <span className="rounded-md bg-secondary px-1.5 py-0.5 text-xs font-medium text-secondary-foreground">
          {badge}
        </span>
      ) : null}
    </a>
  )
}
