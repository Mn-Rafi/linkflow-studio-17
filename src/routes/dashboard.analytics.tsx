import { createFileRoute } from "@tanstack/react-router";
import { useStore } from "@/lib/store";
import { Eye, MousePointerClick, TrendingUp, Award } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

export const Route = createFileRoute("/dashboard/analytics")({
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const profile = useStore((s) => s.profile);
  const totalClicks = profile.links.reduce((a, l) => a + l.clicks, 0);
  const best = [...profile.links].sort((a, b) => b.clicks - a.clicks)[0];
  const ctr = profile.views ? ((totalClicks / profile.views) * 100).toFixed(1) : "0";

  const stats = [
    { label: "Profile views", value: profile.views.toLocaleString(), icon: Eye, delta: "+12.4%" },
    { label: "Total clicks", value: totalClicks.toLocaleString(), icon: MousePointerClick, delta: "+8.1%" },
    { label: "Click-through", value: `${ctr}%`, icon: TrendingUp, delta: "+0.6pt" },
    { label: "Top link clicks", value: best?.clicks.toLocaleString() ?? "0", icon: Award, delta: best?.title ?? "—" },
  ];

  return (
    <div className="max-w-4xl">
      <header>
        <h1 className="text-3xl font-display font-bold">Analytics</h1>
        <p className="text-sm text-ink/60 mt-1">Last 30 days</p>
      </header>

      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-card border border-ink/10 p-5">
            <div className="flex items-center justify-between">
              <s.icon className="h-4 w-4 text-ink/40" />
              <span className="text-xs text-ink/50 truncate max-w-[140px]">{s.delta}</span>
            </div>
            <div className="mt-3 text-2xl font-display font-bold">{s.value}</div>
            <div className="text-xs text-ink/60 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="mt-6 rounded-3xl bg-card border border-ink/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-display font-bold text-lg">Views & clicks</h2>
            <p className="text-xs text-ink/50">Daily, last 30 days</p>
          </div>
          <div className="flex gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-ink" /> Views</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-lime" /> Clicks</span>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={profile.history}>
              <defs>
                <linearGradient id="v" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1a1a1a" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#1a1a1a" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="c" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C6F84E" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#C6F84E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a10" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} tickFormatter={(d) => d.slice(5)} stroke="#1a1a1a40" />
              <YAxis tick={{ fontSize: 10 }} stroke="#1a1a1a40" />
              <Tooltip contentStyle={{ background: "#1a1a1a", border: 0, borderRadius: 12, color: "#F5F2EC" }} />
              <Area type="monotone" dataKey="views" stroke="#1a1a1a" strokeWidth={2} fill="url(#v)" />
              <Area type="monotone" dataKey="clicks" stroke="#8DBF1E" strokeWidth={2} fill="url(#c)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Link performance */}
      <div className="mt-6 rounded-3xl bg-card border border-ink/10 p-6">
        <h2 className="font-display font-bold text-lg">Link performance</h2>
        <div className="mt-4 space-y-3">
          {[...profile.links].sort((a, b) => b.clicks - a.clicks).map((l) => {
            const max = Math.max(...profile.links.map((x) => x.clicks), 1);
            const pct = (l.clicks / max) * 100;
            return (
              <div key={l.id}>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 min-w-0">
                    <span>{l.emoji}</span>
                    <span className="truncate font-medium">{l.title}</span>
                    {!l.enabled && <span className="text-xs text-ink/40 px-1.5 rounded bg-ink/5">off</span>}
                  </div>
                  <span className="font-mono text-xs text-ink/60">{l.clicks.toLocaleString()}</span>
                </div>
                <div className="mt-1.5 h-2 rounded-full bg-ink/5 overflow-hidden">
                  <div className="h-full bg-ink rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent activity */}
      <div className="mt-6 rounded-3xl bg-card border border-ink/10 p-6">
        <h2 className="font-display font-bold text-lg">Recent activity</h2>
        <div className="mt-4 divide-y divide-ink/5">
          {[
            { who: "Visitor from Lisbon, PT", what: "clicked", link: profile.links[0]?.title, when: "2m ago" },
            { who: "Visitor from Berlin, DE", what: "viewed your profile", link: null, when: "8m ago" },
            { who: "Visitor from New York, US", what: "clicked", link: profile.links[1]?.title, when: "14m ago" },
            { who: "Visitor from Tokyo, JP", what: "viewed your profile", link: null, when: "27m ago" },
            { who: "Visitor from London, UK", what: "clicked", link: profile.links[3]?.title, when: "42m ago" },
          ].map((r, i) => (
            <div key={i} className="py-3 flex items-center justify-between text-sm">
              <div className="min-w-0">
                <span className="text-ink/80">{r.who}</span>{" "}
                <span className="text-ink/50">{r.what}</span>{" "}
                {r.link && <span className="font-medium">"{r.link}"</span>}
              </div>
              <span className="text-xs text-ink/40 shrink-0">{r.when}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
