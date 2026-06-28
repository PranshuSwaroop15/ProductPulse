"use client"

import { Search, Bell, ChevronDown, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Topbar() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border bg-background/80 px-4 backdrop-blur-md md:px-6">
      <div className="flex flex-1 items-center gap-3">
        <div className="relative hidden w-full max-w-sm items-center sm:flex">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search feedback, themes, customers…"
            className="h-9 w-full rounded-lg border border-input bg-card pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="hidden h-9 gap-2 text-sm font-medium sm:flex"
        >
          <Calendar className="h-4 w-4" />
          Last 30 days
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9"
          aria-label="Notifications"
        >
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
        </Button>

        <div className="flex items-center gap-2.5 rounded-lg border border-border bg-card py-1 pl-1 pr-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-xs font-semibold text-primary-foreground">
            AK
          </div>
          <div className="hidden text-left leading-tight md:block">
            <p className="text-sm font-medium text-foreground">Avery Kim</p>
            <p className="text-xs text-muted-foreground">Acme Inc.</p>
          </div>
          <ChevronDown className="hidden h-4 w-4 text-muted-foreground md:block" />
        </div>
      </div>
    </header>
  )
}
