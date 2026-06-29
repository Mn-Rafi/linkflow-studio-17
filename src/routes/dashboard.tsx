import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Layers, Link2, Palette, BarChart3, Settings, ExternalLink, Eye } from "lucide-react";
import { useStore } from "@/lib/store";
import { ProfilePreview } from "@/components/ProfilePreview";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Linkstack" }] }),
  component: DashboardLayout,
});

const nav = [
  { to: "/dashboard", label: "Links", icon: Link2, exact: true },
  { to: "/dashboard/appearance", label: "Appearance", icon: Palette },
  { to: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
];

function DashboardLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const username = useStore((s) => s.profile.username);

  return (
    <div className="min-h-screen bg-cream text-ink">
      <div className="grid lg:grid-cols-[260px_1fr_minmax(0,420px)]">
        {/* Sidebar */}
        <aside className="border-r border-ink/10 p-5 lg:sticky lg:top-0 lg:h-screen flex flex-col">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-ink grid place-items-center">
              <Layers className="h-4 w-4 text-lime" />
            </div>
            <span className="font-display font-bold text-lg">linkstack</span>
          </Link>

          <div className="mt-8 rounded-2xl bg-card p-4 border border-ink/10">
            <div className="text-xs text-ink/50">Your link</div>
            <div className="mt-1 font-mono text-sm font-medium">linkstack.to/{username}</div>
            <Link
              to="/u/$username"
              params={{ username }}
              className="mt-3 w-full inline-flex justify-center items-center gap-1.5 rounded-full bg-ink text-cream px-3 py-2 text-xs font-medium hover:bg-ink/90"
            >
              <Eye className="h-3.5 w-3.5" /> View profile
            </Link>
          </div>

          <nav className="mt-6 space-y-1">
            {nav.map((n) => {
              const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors",
                    active ? "bg-ink text-cream" : "hover:bg-ink/5"
                  )}
                >
                  <n.icon className="h-4 w-4" /> {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-6 border-t border-ink/10">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-lime grid place-items-center font-bold text-sm">A</div>
              <div className="text-sm">
                <div className="font-medium">Alex Morgan</div>
                <div className="text-xs text-ink/50">Free plan</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="p-6 lg:p-10 min-w-0">
          <Outlet />
        </main>

        {/* Preview */}
        <aside className="hidden lg:flex flex-col items-center justify-start p-8 border-l border-ink/10 bg-ink/[0.02] sticky top-0 h-screen overflow-y-auto">
          <div className="w-full flex items-center justify-between mb-6">
            <div className="text-xs uppercase tracking-widest text-ink/50">Live preview</div>
            <Link
              to="/u/$username"
              params={{ username }}
              target="_blank"
              className="text-xs inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-ink/5 hover:bg-ink/10"
            >
              Open <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
          <ProfilePreview scale={0.78} />
        </aside>
      </div>
    </div>
  );
}
