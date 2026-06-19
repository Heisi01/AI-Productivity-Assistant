# Workwise

An AI-powered workplace productivity assistant built as a modern SaaS web app. Workwise helps professionals automate tasks, summarize meetings, manage priorities, and get work done faster with an intelligent AI assistant.

## Features

- **AI Assistant** — Real-time chat powered by the Lovable AI Gateway (Gemini Flash). Ask it to draft emails, summarize documents, prioritize tasks, or prepare meeting agendas.
- **Dashboard** — At-a-glance productivity stats, quick AI actions, today's task plan, and recent activity feed.
- **Task Management** — Organize tasks by priority (High / Medium / Low) with progress tracking.
- **Meeting Summaries** — View auto-generated meeting summaries and extracted action items.
- **Automations** — Toggle background automations (e.g., email triage, scheduling) to save hours every week.
- **Settings** — Customize assistant tone and notification preferences.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [TanStack Start](https://tanstack.com/start) (React 19 + Vite) |
| Styling | Tailwind CSS v4 + shadcn/ui components |
| AI | Lovable AI Gateway (`google/gemini-1.5-flash`) via `@ai-sdk/react` |
| Auth & Backend | Lovable Cloud (Supabase) |
| Fonts | Space Grotesk (headings) + DM Sans (body) |

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (or Node.js 20+)

### Install dependencies

```bash
bun install
```

### Environment variables

Create a `.env` file in the project root with:

```env
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_PUBLISHABLE_KEY=<your-supabase-anon-key>
LOVABLE_API_KEY=<your-lovable-api-key>
```

> The Supabase variables are auto-generated when using Lovable Cloud. The `LOVABLE_API_KEY` is required for the AI chat endpoint.

### Run locally

```bash
bun dev
```

The app will be available at `http://localhost:8080`.

### Build for production

```bash
bun run build
```

## Project Structure

```
src/
  components/ui/      # shadcn/ui component primitives
  components/         # App-specific components (sidebar, etc.)
  hooks/              # Custom React hooks
  integrations/       # Supabase client + auth middleware
  lib/                # Utilities + AI gateway provider
  routes/             # TanStack Start file-based routes
    __root.tsx        # Root layout (html/head/body shell)
    _app.tsx          # App shell with sidebar + header
    _app.index.tsx    # Dashboard (home)
    _app.assistant.tsx   # AI chat
    _app.tasks.tsx       # Task manager
    _app.meetings.tsx    # Meeting summaries
    _app.automations.tsx # Automation toggles
    _app.settings.tsx    # Preferences
    api/chat.ts       # Server-side AI streaming endpoint
  styles.css          # Global CSS, Tailwind theme, custom tokens
  router.tsx          # TanStack Router configuration
  start.ts            # TanStack Start server entry
  server.ts           # Server configuration
```

## AI Integration

The assistant uses a server-side streaming endpoint at `POST /api/chat`. It streams tokens from the Lovable AI Gateway using the Vercel AI SDK's React hooks (`useChat`) for a real-time chat experience.

The provider is configured in `src/lib/ai-gateway.server.ts`:

```ts
createOpenAICompatible({
  name: "lovable",
  baseURL: "https://ai.gateway.lovable.dev/v1",
  headers: {
    "Lovable-API-Key": lovableApiKey,
    "X-Lovable-AIG-SDK": "vercel-ai-sdk",
  },
});
```

## Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start the development server |
| `bun run build` | Build for production |
| `bun run build:dev` | Build in development mode |
| `bun run preview` | Preview the production build |
| `bun run lint` | Run ESLint |
| `bun run format` | Format with Prettier |

## License

Private — All rights reserved.
