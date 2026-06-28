
"use client"

import { useRef, useState } from "react"
import { Send, CheckCircle2, Loader2, UploadCloud } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Papa from "papaparse"

export function FeedbackUpload() {
  const [feedbackText, setFeedbackText] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    
    if (!file) return

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,

      complete: async (results) => {
        try {
          setLoading(true)
          setMessage("")

          const rows = (results.data as any[]).filter(
            (row) => row.feedbackText && row.feedbackText.trim() !== ""
          )

          const res = await fetch("/api/import", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(rows),
          })

          const data = await res.json()

          if (!res.ok) {
            throw new Error(data.error || "Import failed")
          }

          setMessage(`✅ Import complete: ${data.summary.total} items • ${data.summary.negative} negative • ${data.summary.highPriority} high priority • ${data.summary.featureRequests} feature requests`)
          router.refresh()
          e.target.value = ""
        } catch {
          setMessage("Import failed.")
        } finally {
          setLoading(false)
        }
      },
    })
  }

  async function handleSubmit() {
    if (!feedbackText.trim()) {
      setMessage("Please enter feedback first.")
      return
    }

    try {
      setLoading(true)
      setMessage("")

      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          feedbackText,
          customerName,
          source: "manual",
        }),
      })

      if (!res.ok) {
        throw new Error("Failed to save feedback")
      }

      setMessage("Feedback analyzed and saved to Aurora.")
      setFeedbackText("")
      setCustomerName("")
      router.refresh()
    } catch {
      setMessage("Something went wrong while saving feedback.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="flex flex-col rounded-xl border border-border bg-card shadow-sm">
      <div className="border-b border-border p-5">
        <h2 className="text-base font-semibold tracking-tight text-card-foreground">
          Import feedback
        </h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Paste customer feedback or upload a CSV file
        </p>
      </div>

      <div className="space-y-4 p-5">
        <input
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Customer name optional"
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none"
        />

        <textarea
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          placeholder="Example: The checkout page crashes whenever I try to pay..."
          className="min-h-32 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none"
        />

        <Button onClick={handleSubmit} disabled={loading} className="w-full gap-2">
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Analyze Feedback
            </>
          )}
        </Button>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={loading}
            onClick={() => inputRef.current?.click()}
            className="w-full gap-2"
          >
            <UploadCloud className="h-4 w-4" />
            Upload CSV
          </Button>

          <input
            ref={inputRef}
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="sr-only"
          />
        </div>

        {message && (
          <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-muted-foreground">
            <CheckCircle2 className="h-4 w-4" />
            {message}
          </div>
        )}
      </div>
    </section>
  )
}
