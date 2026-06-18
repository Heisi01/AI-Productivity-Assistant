import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageSquare, FileText, Calendar, Zap, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_app/automations")({
  head: () => ({
    meta: [
      { title: "Automations — Workwise" },
      { name: "description", content: "Background AI automations that work for you." },
    ],
  }),
  component: AutomationsPage,
});

const automations = [
  {
    name: "Email triage",
    desc: "Sort incoming email into Reply, Read, Archive, and draft replies for the top 5.",
    icon: Mail,
    runs: 312,
    enabled: true,
  },
  {
    name: "Meeting summarizer",
    desc: "Join meetings, transcribe, and post a summary with action items to the channel.",
    icon: Calendar,
    runs: 64,
    enabled: true,
  },
  {
    name: "Standup composer",
    desc: "Compose a personal standup from yesterday's commits, tasks, and meetings.",
    icon: MessageSquare,
    runs: 41,
    enabled: false,
  },
  {
    name: "Doc tidier",
    desc: "Reformat messy notes into structured docs with TL;DR and next steps.",
    icon: FileText,
    runs: 89,
    enabled: true,
  },
];

function AutomationsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
        <div className="min-w-0">
          <h1 className="font-display text-2xl font-semibold tracking-tight">Automations</h1>
          <p className="text-sm text-muted-foreground">
            Background workers that automate recurring workplace tasks.
          </p>
        </div>
        <Button className="shrink-0 bg-accent text-accent-foreground hover:bg-accent/90">
          <Plus className="mr-2 h-4 w-4" /> New automation
        </Button>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {automations.map((a) => (
          <Card key={a.name}>
            <CardHeader className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
                <a.icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <CardTitle className="truncate text-base">{a.name}</CardTitle>
                <p className="text-xs text-muted-foreground">
                  <Zap className="mr-1 inline h-3 w-3 text-accent" /> {a.runs} runs this month
                </p>
              </div>
              <Switch defaultChecked={a.enabled} />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{a.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
