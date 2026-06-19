import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Mail } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Your Name — Portfolio" },
      {
        name: "description",
        content:
          "Personal portfolio of Your Name — designer and developer crafting thoughtful digital products.",
      },
      { property: "og:title", content: "Your Name — Portfolio" },
      {
        property: "og:description",
        content:
          "Personal portfolio of Your Name — designer and developer crafting thoughtful digital products.",
      },
    ],
  }),
  component: PortfolioPage,
});

const facts = [
  { label: "Based in", value: "Lisbon, PT" },
  { label: "Role", value: "Product Designer" },
  { label: "Available", value: "Spring 2026" },
];

const skills = [
  "Product strategy",
  "Interaction design",
  "Design systems",
  "Front-end (React, TS)",
  "Prototyping",
  "Brand identity",
];

function PortfolioPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-8">
        <a href="/" className="font-display text-base font-semibold tracking-tight">
          Your Name<span className="text-accent">.</span>
        </a>
        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#about" className="hover:text-foreground transition-colors">
            About
          </a>
          <a
            href="mailto:hello@example.com"
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-1.5 text-foreground hover:border-foreground transition-colors"
          >
            Contact <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </nav>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-6 pt-16 pb-28 md:pt-28 md:pb-40">
        <p className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Portfolio · 2026
        </p>
        <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
          Designing calm,
          <br />
          considered software
          <br />
          for ambitious teams.
        </h1>
        <p className="mt-8 max-w-xl text-lg text-muted-foreground">
          I'm <span className="text-foreground">Your Name</span>, a product designer
          and developer with a decade of experience shaping interfaces that feel
          inevitable — quiet, fast, and built to last.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="mailto:hello@example.com"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <Mail className="h-4 w-4" />
            Start a project
          </a>
          <a
            href="#about"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium hover:border-foreground transition-colors"
          >
            More about me
          </a>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="border-t border-border bg-secondary/40"
      >
        <div className="mx-auto grid max-w-5xl gap-16 px-6 py-24 md:grid-cols-[1fr_2fr] md:py-32">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              About
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl">
              A short story.
            </h2>
          </div>

          <div className="space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            <p>
              I started out building marketing sites in a small studio, then spent
              six years inside product teams at venture-backed startups —
              translating fuzzy ambitions into shipped, measurable features.
            </p>
            <p>
              Today I work independently with founders and product leaders who care
              as much about craft as they do about outcomes. My favorite projects
              sit at the intersection of clear thinking, restrained visuals, and
              software that respects the person using it.
            </p>
            <p>
              Outside of work you'll find me running long distances, brewing
              mediocre espresso, and reading more design books than I'll ever
              admit.
            </p>

            <div className="grid grid-cols-3 gap-6 pt-8">
              {facts.map((f) => (
                <div key={f.label}>
                  <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                    {f.label}
                  </p>
                  <p className="mt-2 font-display text-base font-medium text-foreground">
                    {f.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-8">
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                Toolbox
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {skills.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-border bg-background px-3 py-1 text-sm text-foreground"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 px-6 py-12 md:flex-row md:items-center">
          <p className="text-sm text-muted-foreground">
            © 2026 Your Name. Built with care.
          </p>
          <div className="flex items-center gap-5 text-sm">
            <a
              href="mailto:hello@example.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              hello@example.com
            </a>
            <a
              href="https://twitter.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Twitter
            </a>
            <a
              href="https://linkedin.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
