import { useStore, palettes } from "@/lib/store";
import { SocialIcon } from "./SocialIcon";
import { cn } from "@/lib/utils";

export function ProfilePreview({ scale = 1, frame = true }: { scale?: number; frame?: boolean }) {
  const profile = useStore((s) => s.profile);
  const { theme } = profile;
  const p = palettes[theme.palette];

  const btnClass = cn(
    "block w-full text-center px-5 py-4 font-medium transition-all hover:-translate-y-0.5 active:translate-y-0",
    theme.buttonStyle === "solid" && "rounded-xl",
    theme.buttonStyle === "outline" && "rounded-xl border-2 bg-transparent",
    theme.buttonStyle === "soft" && "rounded-2xl",
    theme.buttonStyle === "pill" && "rounded-full",
  );

  const fontFam =
    theme.font === "serif" ? "'Instrument Serif', serif" :
    theme.font === "mono" ? "'JetBrains Mono', monospace" :
    "'Space Grotesk', sans-serif";

  const bgStyle: React.CSSProperties = { background: p.bg };
  if (theme.background === "gradient") {
    bgStyle.background = `linear-gradient(160deg, ${p.bg} 0%, ${p.accent}33 100%)`;
  } else if (theme.background === "blob") {
    bgStyle.background = `radial-gradient(circle at 20% 10%, ${p.accent}55, transparent 40%), radial-gradient(circle at 80% 80%, ${p.accent}33, transparent 50%), ${p.bg}`;
  }

  const content = (
    <div
      style={{ ...bgStyle, color: p.fg, fontFamily: fontFam }}
      className={cn("relative overflow-hidden h-full w-full", theme.background === "noise" && "noise-bg")}
    >
      <div className="px-6 pt-12 pb-10 max-w-md mx-auto">
        <div className="flex flex-col items-center text-center">
          <div
            className="h-24 w-24 rounded-full ring-4 ring-white/40 shadow-xl grid place-items-center text-3xl font-bold"
            style={{ background: p.accent, color: p.fg }}
          >
            {profile.avatarUrl ? (
              <img src={profile.avatarUrl} alt="" className="h-full w-full rounded-full object-cover" />
            ) : (
              profile.name.charAt(0)
            )}
          </div>
          <h1 className="mt-4 text-2xl font-bold" style={{ fontFamily: fontFam }}>{profile.name}</h1>
          <p className="mt-1 text-sm opacity-70">@{profile.username}</p>
          <p className="mt-3 text-sm max-w-xs opacity-90 leading-relaxed">{profile.bio}</p>

          <div className="flex gap-3 mt-5">
            {profile.socials.map((s) => (
              <a key={s.id} href={s.url} className="p-2 rounded-full opacity-80 hover:opacity-100 transition-opacity" style={{ background: `${p.fg}10` }}>
                <SocialIcon platform={s.platform} className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 space-y-3">
          {profile.links.filter((l) => l.enabled).map((l) => (
            <a
              key={l.id}
              href={l.url}
              target="_blank"
              rel="noreferrer"
              className={cn(btnClass, l.featured && "shadow-lg")}
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

        <div className="mt-10 text-center text-xs opacity-50">
          made with <span className="font-display font-semibold">linkstack</span>
        </div>
      </div>
    </div>
  );

  if (!frame) return content;
  return (
    <div
      style={{ transform: `scale(${scale})`, transformOrigin: "top center" }}
      className="mx-auto w-[360px] h-[720px] rounded-[2.5rem] border-8 border-ink overflow-hidden shadow-2xl bg-black"
    >
      <div className="h-full w-full overflow-y-auto scrollbar-hide">{content}</div>
    </div>
  );
}
