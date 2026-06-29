"use client"

import { Search, Bell, ChevronDown, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Topbar() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border bg-background/80 px-4 backdrop-blur-md md:px-6">
      {/* <div className="flex flex-1 items-center gap-3">
        <div className="relative hidden w-full max-w-sm items-center sm:flex">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search feedback, themes, customers…"
            className="h-9 w-full rounded-lg border border-input bg-card pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20"
          />
        </div>
      </div> */}

      <div className="flex w-full items-center">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="hidden h-9 gap-2 text-sm font-medium sm:flex"
            >
              <Calendar className="h-4 w-4" />
              Last 30 days
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>

          <div className="ml-auto flex gap-5.5 rounded-lg border border-border bg-card py-1 pl-1 pr-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-xs font-semibold text-primary-foreground">
              P
            </div>

          <div className="hidden text-left leading-tight md:block">
            <p className="text-sm font-medium text-foreground">Pranshu</p>
            <p className="text-xs text-muted-foreground">Acme Inc.</p>
          </div>
          <ChevronDown className="hidden h-4 w-4 text-muted-foreground md:block" />
        </div>
      </div>
    </header>
  )
}
