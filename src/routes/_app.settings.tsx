import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_app/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Workwise" },
      { name: "description", content: "Manage your Workwise workspace." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-6">
        <h1 className="font-display text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground">Personalize how Workwise works for you.</p>
      </header>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Profile</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" defaultValue="Alex Lee" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Work email</Label>
              <Input id="email" type="email" defaultValue="alex@acme.com" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="role">Role</Label>
              <Input id="role" defaultValue="Product Manager" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tz">Timezone</Label>
              <Input id="tz" defaultValue="Europe/Lisbon" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Assistant preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Concise replies", desc: "Prefer short, bulleted answers." },
              { label: "Daily morning briefing", desc: "Sent at 8:30 AM every weekday." },
              { label: "Auto-create tasks from meetings", desc: "Extract action items into Tasks." },
            ].map((p) => (
              <div
                key={p.label}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium">{p.label}</p>
                  <p className="text-xs text-muted-foreground">{p.desc}</p>
                </div>
                <Switch defaultChecked />
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
            Save changes
          </Button>
        </div>
      </div>
    </div>
  );
}
