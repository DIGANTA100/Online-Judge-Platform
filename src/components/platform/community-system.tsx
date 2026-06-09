"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  Eye,
  Megaphone,
  MessageCircle,
  Plus,
  Search,
  Send,
  Sparkles,
  Users
} from "lucide-react";
import {
  communityMembers,
  communityStats,
  communityThreads,
  communityTopics
} from "@/lib/community-data";
import { Surface, StatusPill } from "@/components/platform/app-shell";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CommunitySystem() {
  const [topic, setTopic] = useState("All");
  const [query, setQuery] = useState("");

  const visibleThreads = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return communityThreads.filter((thread) => {
      const topicMatches = topic === "All" || thread.topic === topic;
      const queryMatches =
        !normalizedQuery ||
        thread.title.toLowerCase().includes(normalizedQuery) ||
        thread.excerpt.toLowerCase().includes(normalizedQuery) ||
        thread.author.toLowerCase().includes(normalizedQuery);

      return topicMatches && queryMatches;
    });
  }, [query, topic]);

  return (
    <div className="grid gap-6">
      <section className="rounded-md border border-white/10 bg-[linear-gradient(135deg,rgba(118,247,209,0.12),rgba(255,255,255,0.045)_56%,rgba(255,184,77,0.08))] p-6 shadow-panel">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md border border-mint-300/20 bg-mint-300/10 px-3 py-2 text-sm text-mint-300">
              <Users className="h-4 w-4" />
              Community Arena
            </div>
            <h1 className="mt-5 text-balance text-4xl font-semibold leading-tight sm:text-5xl">
              Discuss problems, contests, and ideas with other coders.
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-white/62">
              Ask for hints, compare approaches after contests, write editorials,
              and help others get unstuck without leaving the platform.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Button>
              <Plus className="h-4 w-4" />
              New Thread
            </Button>
            <Button variant="secondary">
              <Sparkles className="h-4 w-4" />
              Browse Editorials
            </Button>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-4">
        {communityStats.map((stat) => (
          <Surface key={stat.label}>
            <div className="text-sm text-white/48">{stat.label}</div>
            <div className="mt-3 font-mono text-3xl font-semibold">{stat.value}</div>
          </Surface>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <div className="grid gap-5">
          <Surface>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative max-w-xl flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/36" />
                <input
                  className="focus-ring h-12 w-full rounded-md border border-white/10 bg-ink-900 pl-10 pr-3 text-white placeholder:text-white/30"
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search discussions"
                  value={query}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {communityTopics.map((item) => (
                  <button
                    className={cn(
                      "focus-ring rounded-md border border-white/10 px-3 py-2 text-sm text-white/58 transition hover:bg-white/[0.06] hover:text-white",
                      topic === item && "border-mint-300/30 bg-mint-300/10 text-mint-300"
                    )}
                    key={item}
                    onClick={() => setTopic(item)}
                    type="button"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </Surface>

          <Surface className="p-0">
            {visibleThreads.map((thread) => (
              <article
                className="border-b border-white/[0.06] p-5 transition last:border-b-0 hover:bg-mint-300/[0.045]"
                key={thread.id}
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex gap-4">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-premium-line font-mono font-semibold text-ink-950">
                      {thread.avatar}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-xl font-semibold">{thread.title}</h2>
                        {thread.solved && (
                          <StatusPill tone="good">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            Solved
                          </StatusPill>
                        )}
                      </div>
                      <p className="mt-2 leading-7 text-white/56">{thread.excerpt}</p>
                      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/42">
                        <span>@{thread.author}</span>
                        <span>{thread.topic}</span>
                        <span>{thread.lastActive}</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid min-w-32 grid-cols-2 gap-3 text-sm text-white/48">
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4 text-mint-300" />
                      {thread.replies}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4 text-amberline-300" />
                      {thread.views}
                    </span>
                  </div>
                </div>
              </article>
            ))}
            {visibleThreads.length === 0 && (
              <div className="p-12 text-center text-white/52">No discussions match your search.</div>
            )}
          </Surface>
        </div>

        <div className="grid gap-5">
          <Surface>
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Send className="h-5 w-5 text-mint-300" />
              Start a discussion
            </h2>
            <div className="mt-5 grid gap-3">
              <input
                className="focus-ring h-11 rounded-md border border-white/10 bg-ink-900 px-3 text-sm text-white placeholder:text-white/30"
                placeholder="Thread title"
              />
              <textarea
                className="focus-ring min-h-32 rounded-md border border-white/10 bg-ink-900 p-3 text-sm leading-6 text-white placeholder:text-white/30"
                placeholder="Ask a question, share an approach, or write contest notes..."
              />
              <Button>
                <Send className="h-4 w-4" />
                Publish
              </Button>
            </div>
          </Surface>

          <Surface>
            <h2 className="flex items-center gap-2 text-xl font-semibold">
              <Megaphone className="h-5 w-5 text-amberline-300" />
              Announcements
            </h2>
            <div className="mt-5 space-y-3">
              {[
                "Nimble Round 128 editorials are live.",
                "New graph practice track added this week.",
                "Community guidelines now highlight spoiler etiquette."
              ].map((item) => (
                <div className="rounded-md border border-white/10 bg-ink-900 p-4 text-sm leading-6 text-white/58" key={item}>
                  {item}
                </div>
              ))}
            </div>
          </Surface>

          <Surface>
            <h2 className="text-xl font-semibold">Active members</h2>
            <div className="mt-5 space-y-3">
              {communityMembers.map((member) => (
                <div className="flex items-center justify-between gap-4 rounded-md border border-white/10 bg-ink-900 p-4" key={member.handle}>
                  <div>
                    <div className="font-semibold">@{member.handle}</div>
                    <div className="mt-1 text-xs text-white/42">{member.badge}</div>
                  </div>
                  <div className="font-mono text-mint-300">{member.rating}</div>
                </div>
              ))}
            </div>
          </Surface>
        </div>
      </div>
    </div>
  );
}
