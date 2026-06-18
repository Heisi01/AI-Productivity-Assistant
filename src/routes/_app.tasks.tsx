import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/_app/tasks")({
  head: () => ({
    meta: [
      { title: "Tasks — Workwise" },
      { name: "description", content: "Your AI-prioritized task list." },
    ],
  }),
  component: TasksPage,
});

type Task = {
  id: string;
  title: string;
  project: string;
  priority: "High" | "Medium" | "Low";
  due: string;
  done: boolean;
};

const seed: Task[] = [
  { id: "1", title: "Review Q3 roadmap doc", project: "Strategy", priority: "High", due: "Today", done: false },
  { id: "2", title: "Draft launch announcement", project: "Marketing", priority: "High", due: "Tomorrow", done: false },
  { id: "3", title: "Reply to Sarah about pricing", project: "Sales", priority: "Medium", due: "Today", done: false },
  { id: "4", title: "Sync with design on onboarding flow", project: "Product", priority: "Medium", due: "Fri", done: false },
  { id: "5", title: "Update OKR tracker", project: "Ops", priority: "Low", due: "Next week", done: true },
  { id: "6", title: "Book interview rooms", project: "People", priority: "Low", due: "Mon", done: false },
];

const priorityColor: Record<Task["priority"], string> = {
  High: "bg-rose-500/10 text-rose-700 dark:text-rose-300",
  Medium: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
  Low: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
};

function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(seed);
  const [draft, setDraft] = useState("");

  const toggle = (id: string) =>
    setTasks((t) => t.map((x) => (x.id === id ? { ...x, done: !x.done } : x)));

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setTasks((t) => [
      {
        id: crypto.randomUUID(),
        title: draft.trim(),
        project: "Inbox",
        priority: "Medium",
        due: "Today",
        done: false,
      },
      ...t,
    ]);
    setDraft("");
  };

  const groups = [
    { label: "Today", filter: (t: Task) => t.due === "Today" },
    { label: "Upcoming", filter: (t: Task) => t.due !== "Today" && !t.done },
    { label: "Done", filter: (t: Task) => t.done },
  ];

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
        <div className="min-w-0">
          <h1 className="font-display text-2xl font-semibold tracking-tight">Tasks</h1>
          <p className="text-sm text-muted-foreground">
            AI-prioritized work. Workwise re-ranks as your day changes.
          </p>
        </div>
        <Button variant="outline" className="shrink-0">
          <Sparkles className="mr-2 h-4 w-4 text-accent" /> Re-prioritize
        </Button>
      </header>

      <form
        onSubmit={add}
        className="mb-6 flex gap-2 rounded-lg border border-border bg-card p-2 shadow-[var(--shadow-soft)]"
      >
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Add a task — Workwise will categorize and schedule it"
          className="border-0 shadow-none focus-visible:ring-0"
        />
        <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Plus className="mr-1 h-4 w-4" /> Add
        </Button>
      </form>

      <div className="space-y-6">
        {groups.map((g) => {
          const items = tasks.filter(g.filter);
          if (items.length === 0) return null;
          return (
            <section key={g.label}>
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {g.label} · {items.length}
              </h2>
              <Card>
                <CardContent className="divide-y divide-border p-0">
                  {items.map((t) => (
                    <label
                      key={t.id}
                      className="grid cursor-pointer grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 transition hover:bg-muted/40"
                    >
                      <Checkbox checked={t.done} onCheckedChange={() => toggle(t.id)} />
                      <div className="min-w-0">
                        <p
                          className={`truncate text-sm ${
                            t.done ? "text-muted-foreground line-through" : "font-medium"
                          }`}
                        >
                          {t.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t.project} · Due {t.due}
                        </p>
                      </div>
                      <Badge variant="secondary" className={priorityColor[t.priority]}>
                        {t.priority}
                      </Badge>
                    </label>
                  ))}
                </CardContent>
              </Card>
            </section>
          );
        })}
      </div>
    </div>
  );
}
