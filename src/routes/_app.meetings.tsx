import { createFileRoute } from "@tanstack/react-router";
import { CalendarClock, Sparkles, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_app/meetings")({
  head: () => ({
    meta: [
      { title: "Meetings — Workwise" },
      { name: "description", content: "AI-generated meeting summaries and action items." },
    ],
  }),
  component: MeetingsPage,
});

const meetings = [
  {
    title: "Weekly product sync",
    when: "Today · 9:00 AM",
    attendees: 7,
    status: "Summarized",
    summary:
      "Aligned on onboarding redesign scope, agreed to ship phase 1 by Sept 12. Open concerns about mobile parity.",
    actions: [
      "Alex: finalize phase 1 spec by Wed",
      "Priya: prepare mobile parity audit",
      "Jordan: draft customer comms",
    ],
  },
  {
    title: "Pricing review w/ finance",
    when: "Yesterday · 3:30 PM",
    attendees: 4,
    status: "Summarized",
    summary:
      "Reviewed gross margin impact of new tier. Finance approved pilot pricing for 3 months with quarterly review.",
    actions: ["Sam: update pricing page copy", "Alex: notify affected accounts"],
  },
  {
    title: "Customer interview — Northwind",
    when: "Wed · 11:00 AM",
    attendees: 3,
    status: "Scheduled",
    summary: "Workwise will join, transcribe, and produce a summary with insights.",
    actions: [],
  },
];

function MeetingsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
        <div className="min-w-0">
          <h1 className="font-display text-2xl font-semibold tracking-tight">Meetings</h1>
          <p className="text-sm text-muted-foreground">
            Auto-summarized notes and action items from your calendar.
          </p>
        </div>
        <Button variant="outline" className="shrink-0">
          <CalendarClock className="mr-2 h-4 w-4 text-accent" /> Connect calendar
        </Button>
      </header>

      <div className="space-y-4">
        {meetings.map((m) => (
          <Card key={m.title}>
            <CardHeader className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
              <div className="min-w-0">
                <CardTitle className="truncate text-base">{m.title}</CardTitle>
                <p className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <CalendarClock className="h-3.5 w-3.5" /> {m.when}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" /> {m.attendees} attendees
                  </span>
                </p>
              </div>
              <Badge
                variant="secondary"
                className={
                  m.status === "Summarized"
                    ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                    : "bg-accent/10 text-accent"
                }
              >
                {m.status}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-foreground/90">{m.summary}</p>
              {m.actions.length > 0 && (
                <div>
                  <p className="mb-1.5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    <Sparkles className="h-3 w-3 text-accent" /> Action items
                  </p>
                  <ul className="space-y-1.5">
                    {m.actions.map((a) => (
                      <li
                        key={a}
                        className="rounded-md border border-border bg-muted/30 px-3 py-1.5 text-sm"
                      >
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
