import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Sparkles,
  ListChecks,
  CalendarClock,
  Zap,
  ArrowUpRight,
  TrendingUp,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/_app/")({
  head: () => ({
    meta: [
      { title: "Dashboard — Workwise" },
      {
        name: "description",
        content:
          "AI-powered productivity dashboard for professionals — automate tasks, summarize meetings, and stay focused.",
      },
    ],
  }),
  component: Dashboard,
});

const stats = [
  {
    label: "Tasks completed",
    value: "24",
    sub: "this week",
    delta: "+18%",
    icon: CheckCircle2,
  },
  { label: "Hours saved", value: "9.2h", sub: "this week", delta: "+1.4h", icon: Clock },
  {
    label: "Automations ran",
    value: "112",
    sub: "this month",
    delta: "+32%",
    icon: Zap,
  },
  {
    label: "Focus score",
    value: "82",
    sub: "out of 100",
    delta: "+6",
    icon: TrendingUp,
  },
];

const quickPrompts = [
  { title: "Summarize my unread emails", icon: Sparkles },
  { title: "Draft a status update for my team", icon: Sparkles },
  { title: "Prioritize my tasks for today", icon: ListChecks },
  { title: "Prepare an agenda for tomorrow's standup", icon: CalendarClock },
];

const tasks = [
  { title: "Review Q3 roadmap doc", project: "Strategy", due: "Today", progress: 70 },
  { title: "Draft launch announcement", project: "Marketing", due: "Tomorrow", progress: 40 },
  { title: "Sync with design on onboarding", project: "Product", due: "Fri", progress: 20 },
];

const activity = [
  { who: "Workwise", what: "summarized your 9:00 standup", when: "12m ago" },
  { who: "Workwise", what: "drafted reply to Sarah about pricing", when: "1h ago" },
  { who: "Workwise", what: "created 4 follow-up tasks from notes", when: "3h ago" },
];

function Dashboard() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border border-border bg-[var(--gradient-hero)] p-6 text-primary-foreground sm:p-8">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/30 blur-3xl" />
        <div className="relative">
          <Badge className="bg-white/10 text-primary-foreground hover:bg-white/15 border-white/10">
            Good morning, Alex
          </Badge>
          <h1 className="mt-3 max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            What should we get done today?
          </h1>
          <p className="mt-2 max-w-xl text-sm text-primary-foreground/75">
            Workwise turns your inbox, calendar, and notes into prioritized actions —
            then drafts, schedules, and follows up for you.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-[var(--shadow-glow)]">
              <Link to="/assistant">
                <Sparkles className="mr-2 h-4 w-4" />
                Ask the assistant
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/20 bg-white/5 text-primary-foreground hover:bg-white/10 hover:text-primary-foreground">
              <Link to="/tasks">View today's plan</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="shadow-[var(--shadow-soft)]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {s.label}
                </p>
                <s.icon className="h-4 w-4 text-accent" />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-display text-3xl font-semibold tracking-tight">
                  {s.value}
                </span>
                <span className="text-xs text-muted-foreground">{s.sub}</span>
              </div>
              <p className="mt-1 text-xs font-medium text-emerald-600">{s.delta}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Main grid */}
      <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Quick prompts */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Quick actions</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link to="/assistant">
                Open assistant <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {quickPrompts.map((p) => (
                <Link
                  key={p.title}
                  to="/assistant"
                  className="group flex items-center gap-3 rounded-lg border border-border bg-card p-3 text-left text-sm transition hover:border-accent/40 hover:bg-accent/5"
                >
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-accent/10 text-accent">
                    <p.icon className="h-4 w-4" />
                  </span>
                  <span className="flex-1 truncate">{p.title}</span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:text-accent" />
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activity.map((a, i) => (
              <div key={i} className="flex gap-3">
                <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                  <Sparkles className="h-3.5 w-3.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{a.who}</span>{" "}
                    <span className="text-muted-foreground">{a.what}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{a.when}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Today's tasks */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Today's plan</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link to="/tasks">
                All tasks <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-border">
              {tasks.map((t) => (
                <div
                  key={t.title}
                  className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_120px_auto]"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{t.title}</p>
                    <p className="text-xs text-muted-foreground">{t.project}</p>
                  </div>
                  <div className="hidden text-xs text-muted-foreground sm:block">
                    Due {t.due}
                  </div>
                  <div className="hidden sm:block">
                    <Progress value={t.progress} className="h-1.5" />
                  </div>
                  <Button size="sm" variant="outline">
                    Open
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
