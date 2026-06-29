import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useStore, palettes } from "@/lib/store";
import { SocialIcon } from "@/components/SocialIcon";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/u/$username")({
  head: ({ params }) => ({
    meta: [
      { title: `@${params.username} on Linkstack` },
      { name: "description", content: `Check out @${params.username}'s links on Linkstack.` },
    ],
  }),
  component: PublicProfile,
});

function PublicProfile() {
  const { username } = Route.useParams();
  const profile = useStore((s) => s.profile);
  const trackClick = useStore((s) => s.trackClick);
  const trackView = useStore((s) => s.trackView);

  useEffect(() => { trackView(); }, [trackView]);

  const { theme } = profile;
  const p = palettes[theme.palette];

  const fontFam =
    theme.font === "serif" ? "'Instrument Serif', serif" :
    theme.font === "mono" ? "'JetBrains Mono', monospace" :
    "'Space Grotesk', sans-serif";

  const bgStyle: React.CSSProperties = { background: p.bg, color: p.fg, fontFamily: fontFam };
  if (theme.background === "gradient") {
    bgStyle.background = `linear-gradient(160deg, ${p.bg} 0%, ${p.accent}33 100%)`;
  } else if (theme.background === "blob") {
    bgStyle.background = `radial-gradient(circle at 20% 10%, ${p.accent}55, transparent 40%), radial-gradient(circle at 80% 80%, ${p.accent}33, transparent 50%), ${p.bg}`;
  }

  const btnClass = cn(
    "block w-full text-center px-5 py-4 font-medium transition-all hover:-translate-y-0.5 active:translate-y-0",
    theme.buttonStyle === "solid" && "rounded-xl",
    theme.buttonStyle === "outline" && "rounded-xl border-2 bg-transparent",
    theme.buttonStyle === "soft" && "rounded-2xl",
    theme.buttonStyle === "pill" && "rounded-full",
  );

  if (username !== profile.username) {
    return (
      <div className="min-h-screen grid place-items-center bg-cream text-ink px-6">
        <div className="text-center max-w-sm">
          <div className="text-7xl">🤔</div>
          <h1 className="mt-6 text-2xl font-display font-bold">@{username} isn't here</h1>
          <p className="mt-2 text-ink/60">This profile doesn't exist yet. Want to claim it?</p>
          <Link to="/dashboard" className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink text-cream px-5 py-3 text-sm font-medium">
            Claim @{username} <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={bgStyle} className={cn("min-h-screen", theme.background === "noise" && "noise-bg")}>
      <div className="max-w-md mx-auto px-6 pt-16 pb-12">
        <div className="flex flex-col items-center text-center">
          <div
            className="h-28 w-28 rounded-full ring-4 ring-white/40 shadow-xl grid place-items-center text-4xl font-bold"
            style={{ background: p.accent, color: p.fg }}
          >
            {profile.avatarUrl ? (
              <img src={profile.avatarUrl} alt={profile.name} className="h-full w-full rounded-full object-cover" />
            ) : (
              profile.name.charAt(0)
            )}
          </div>
          <h1 className="mt-5 text-3xl font-bold" style={{ fontFamily: fontFam }}>{profile.name}</h1>
          <p className="mt-1 text-sm opacity-70">@{profile.username}</p>
          <p className="mt-4 text-base max-w-sm opacity-90 leading-relaxed">{profile.bio}</p>

          <div className="flex gap-3 mt-6">
            {profile.socials.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-full opacity-80 hover:opacity-100 hover:scale-110 transition-all"
                style={{ background: `${p.fg}10` }}
              >
                <SocialIcon platform={s.platform} className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 space-y-3">
          {profile.links.filter((l) => l.enabled).map((l) => (
            <a
              key={l.id}
              href={l.url}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackClick(l.id)}
              className={cn(btnClass, l.featured && "shadow-xl")}
              style={
                theme.buttonStyle === "outline"
                  ? { borderColor: p.fg, color: p.fg }
                  : l.featured
                  ? { background: p.accent, color: p.fg }
                  : { background: `${p.fg}10`, color: p.fg }
              }
            >
              <span className="inline-flex items-center gap-2">
                {l.emoji && <span>{l.emoji}</span>}
                <span>{l.title}</span>
              </span>
            </a>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full opacity-60 hover:opacity-100"
            style={{ background: `${p.fg}10`, color: p.fg }}
          >
            made with <span className="font-display font-bold">linkstack</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
