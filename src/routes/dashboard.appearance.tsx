import { createFileRoute } from "@tanstack/react-router";
import { useStore, palettes, type Theme } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/appearance")({
  component: AppearancePage,
});

function AppearancePage() {
  const theme = useStore((s) => s.profile.theme);
  const updateTheme = useStore((s) => s.updateTheme);

  return (
    <div className="max-w-3xl">
      <header>
        <h1 className="text-3xl font-display font-bold">Appearance</h1>
        <p className="text-sm text-ink/60 mt-1">Make it yours. Changes preview live on the right.</p>
      </header>

      <Section title="Color palette">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {(Object.keys(palettes) as Theme["palette"][]).map((key) => {
            const p = palettes[key];
            const active = theme.palette === key;
            return (
              <button
                key={key}
                onClick={() => updateTheme({ palette: key })}
                className={cn(
                  "rounded-2xl p-4 border-2 transition-all text-left",
                  active ? "border-ink shadow-lg" : "border-ink/10 hover:border-ink/30"
                )}
              >
                <div className="h-16 rounded-xl flex overflow-hidden">
                  <div className="flex-1" style={{ background: p.bg }} />
                  <div className="w-1/3" style={{ background: p.accent }} />
                  <div className="w-1/4" style={{ background: p.fg }} />
                </div>
                <div className="mt-2 text-sm font-medium">{p.label}</div>
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="Button style">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {(["solid", "outline", "soft", "pill"] as Theme["buttonStyle"][]).map((b) => (
            <Tile key={b} active={theme.buttonStyle === b} onClick={() => updateTheme({ buttonStyle: b })}>
              <div
                className={cn(
                  "w-full py-3 text-center text-sm font-medium",
                  b === "solid" && "rounded-lg bg-ink text-cream",
                  b === "outline" && "rounded-lg border-2 border-ink",
                  b === "soft" && "rounded-2xl bg-ink/10",
                  b === "pill" && "rounded-full bg-ink text-cream",
                )}
              >
                Aa
              </div>
              <div className="mt-2 text-xs capitalize">{b}</div>
            </Tile>
          ))}
        </div>
      </Section>

      <Section title="Background">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {(["flat", "gradient", "noise", "blob"] as Theme["background"][]).map((bg) => (
            <Tile key={bg} active={theme.background === bg} onClick={() => updateTheme({ background: bg })}>
              <div className={cn(
                "h-16 rounded-xl",
                bg === "flat" && "bg-lime",
                bg === "gradient" && "bg-gradient-to-br from-lime to-ink/20",
                bg === "noise" && "bg-lime noise-bg",
                bg === "blob" && "bg-cream",
              )}
              style={bg === "blob" ? { background: "radial-gradient(circle at 20% 20%, #C6F84E88, transparent 50%), radial-gradient(circle at 80% 80%, #C6F84E55, transparent 50%), #F5F2EC" } : undefined}
              />
              <div className="mt-2 text-xs capitalize">{bg}</div>
            </Tile>
          ))}
        </div>
      </Section>

      <Section title="Font">
        <div className="grid grid-cols-3 gap-3">
          {([
            { k: "grotesk", label: "Modern", style: { fontFamily: "'Space Grotesk', sans-serif" } },
            { k: "serif", label: "Editorial", style: { fontFamily: "'Instrument Serif', serif", fontStyle: "italic" } },
            { k: "mono", label: "Mono", style: { fontFamily: "'JetBrains Mono', monospace" } },
          ] as const).map((f) => (
            <Tile key={f.k} active={theme.font === f.k} onClick={() => updateTheme({ font: f.k })}>
              <div className="text-3xl font-bold py-2" style={f.style}>Aa</div>
              <div className="mt-1 text-xs">{f.label}</div>
            </Tile>
          ))}
        </div>
      </Section>

      <Section title="Mode">
        <div className="grid grid-cols-2 gap-3 max-w-xs">
          {(["light", "dark"] as Theme["mode"][]).map((m) => (
            <Tile key={m} active={theme.mode === m} onClick={() => updateTheme({ mode: m })}>
              <div className={cn("h-12 rounded-xl", m === "light" ? "bg-cream border border-ink/20" : "bg-ink")} />
              <div className="mt-2 text-xs capitalize">{m}</div>
            </Tile>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-ink/50">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Tile({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-2xl p-3 border-2 transition-all text-center",
        active ? "border-ink shadow-md" : "border-ink/10 hover:border-ink/30 bg-card"
      )}
    >
      {children}
    </button>
  );
}
