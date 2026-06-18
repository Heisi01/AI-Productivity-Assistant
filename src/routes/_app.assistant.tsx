import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import { Sparkles, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/assistant")({
  head: () => ({
    meta: [
      { title: "AI Assistant — Workwise" },
      {
        name: "description",
        content:
          "Chat with Workwise — your AI workplace productivity assistant for drafting, summarizing, and planning.",
      },
    ],
  }),
  component: AssistantPage,
});

const suggestions = [
  "Summarize this meeting transcript and pull out action items",
  "Draft a polite follow-up email to a client who hasn't replied",
  "Help me prioritize my tasks for the rest of the day",
  "Turn these bullet notes into a polished status update",
];

function AssistantPage() {
  const transport = useRef(new DefaultChatTransport({ api: "/api/chat" })).current;
  const { messages, sendMessage, status } = useChat({
    transport,
    onError: (err) => toast.error(err.message || "Something went wrong"),
  });
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSubmit = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    setInput("");
    await sendMessage({ text: trimmed });
    setTimeout(() => textareaRef.current?.focus(), 0);
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-3.5rem)] w-full max-w-4xl flex-col px-4 py-6 sm:px-6">
      <header className="mb-4">
        <h1 className="font-display text-2xl font-semibold tracking-tight">AI Assistant</h1>
        <p className="text-sm text-muted-foreground">
          Ask Workwise to draft, summarize, plan, or automate workplace tasks.
        </p>
      </header>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto rounded-xl border border-border bg-card/40 p-4"
      >
        {messages.length === 0 ? (
          <div className="grid h-full place-items-center">
            <div className="w-full max-w-xl text-center">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-accent/10 text-accent">
                <Sparkles className="h-6 w-6" />
              </div>
              <h2 className="mt-4 font-display text-xl font-semibold tracking-tight">
                How can I help you work smarter?
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Pick a starter or type your own request below.
              </p>
              <div className="mt-6 grid grid-cols-1 gap-2 text-left sm:grid-cols-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSubmit(s)}
                    className="rounded-lg border border-border bg-card p-3 text-sm transition hover:border-accent/40 hover:bg-accent/5"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((m) => {
              const text = m.parts
                .map((p) => (p.type === "text" ? p.text : ""))
                .join("");
              const isUser = m.role === "user";
              return (
                <div
                  key={m.id}
                  className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                >
                  {isUser ? (
                    <Card className="max-w-[80%] rounded-2xl bg-primary px-4 py-2.5 text-primary-foreground border-0">
                      <p className="whitespace-pre-wrap text-sm leading-relaxed">{text}</p>
                    </Card>
                  ) : (
                    <div className="flex max-w-[85%] gap-3">
                      <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                        <Sparkles className="h-3.5 w-3.5" />
                      </span>
                      <div className="min-w-0 whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                        {text}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            {status === "submitted" && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" /> Thinking…
              </div>
            )}
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(input);
        }}
        className="mt-4 rounded-xl border border-border bg-card p-2 shadow-[var(--shadow-soft)]"
      >
        <Textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(input);
            }
          }}
          placeholder="Ask anything about your work — drafts, summaries, plans…"
          className="min-h-[64px] resize-none border-0 bg-transparent shadow-none focus-visible:ring-0"
          disabled={isLoading}
        />
        <div className="flex items-center justify-between px-2 pb-1">
          <p className="text-[11px] text-muted-foreground">
            Enter to send · Shift+Enter for newline
          </p>
          <Button
            type="submit"
            size="sm"
            disabled={!input.trim() || isLoading}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Send className="mr-1.5 h-3.5 w-3.5" /> Send
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
