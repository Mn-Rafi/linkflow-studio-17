import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, BarChart3, Palette, Sparkles, MousePointerClick, Layers, Check } from "lucide-react";
import { ProfilePreview } from "@/components/ProfilePreview";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Linkstack — one link for everything you do" },
      { name: "description", content: "The link-in-bio platform for creators who care about design. Beautiful themes, real analytics, zero clutter." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      {/* Nav */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-cream/70 border-b border-ink/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-ink grid place-items-center">
              <Layers className="h-4 w-4 text-lime" />
            </div>
            <span className="font-display font-bold text-lg">linkstack</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <a href="#features" className="hover:text-ink/60">Features</a>
            <a href="#preview" className="hover:text-ink/60">Preview</a>
            <a href="#pricing" className="hover:text-ink/60">Pricing</a>
            <Link to="/u/$username" params={{ username: "alexmorgan" }} className="hover:text-ink/60">Demo profile</Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/dashboard" className="hidden sm:inline-flex text-sm px-4 py-2 rounded-full hover:bg-ink/5">Sign in</Link>
            <Link to="/dashboard" className="text-sm px-4 py-2 rounded-full bg-ink text-cream hover:bg-ink/90 inline-flex items-center gap-1">
              Start free <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-16 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-3 py-1 text-xs font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" /> v2.6 — new analytics, ready
            </div>
            <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-[0.95] tracking-tight">
              One link.<br />
              <span className="font-serif-display">Everything</span> you make.
            </h1>
            <p className="mt-6 text-lg text-ink/70 max-w-xl leading-relaxed">
              Linkstack is the link-in-bio platform for people who care about design. Build a page that actually looks like you — then watch the clicks roll in.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-full bg-ink text-cream px-6 py-3 font-medium hover:bg-ink/90 transition">
                Claim your link <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link to="/u/$username" params={{ username: "alexmorgan" }} className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-6 py-3 font-medium hover:bg-ink/5 transition">
                See a live profile
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-ink/60">
              <div className="flex -space-x-2">
                {["#C6F84E", "#FF6B35", "#A78BFA", "#2D8A9E"].map((c) => (
                  <div key={c} className="h-8 w-8 rounded-full ring-2 ring-cream" style={{ background: c }} />
                ))}
              </div>
              <span><b className="text-ink">42,000+</b> creators have already claimed theirs</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 bg-lime/30 rounded-full blur-3xl -z-10" />
            <ProfilePreview scale={0.85} />
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="border-y border-ink/10 py-6 bg-ink text-cream overflow-hidden">
        <div className="flex gap-12 text-2xl font-display whitespace-nowrap animate-[scroll_30s_linear_infinite]">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center gap-12 shrink-0">
              <span>Made for creators</span>
              <span className="text-lime">✦</span>
              <span className="font-serif-display">Designed in Lisbon</span>
              <span className="text-lime">✦</span>
              <span>Free forever plan</span>
              <span className="text-lime">✦</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 max-w-7xl mx-auto px-6">
        <div className="max-w-2xl">
          <p className="text-sm text-ink/50 uppercase tracking-widest">What's inside</p>
          <h2 className="mt-3 text-4xl sm:text-5xl font-display font-bold">Everything you need.<br />Nothing you don't.</h2>
        </div>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: Palette, title: "Themes that feel alive", body: "Five palettes, four button styles, four backgrounds. Mix and match in seconds." },
            { icon: BarChart3, title: "Real analytics", body: "See views, clicks, top links and 30-day trends. No vanity metrics." },
            { icon: MousePointerClick, title: "Drag-to-reorder", body: "Pin featured links, hide drafts, ship updates without thinking." },
            { icon: Sparkles, title: "Featured cards", body: "Make one link impossible to miss with a bold featured style." },
            { icon: Layers, title: "Social row", body: "Twitter, Instagram, YouTube, GitHub and more — all in one tidy row." },
            { icon: ArrowUpRight, title: "Share anywhere", body: "Your link works on Instagram, TikTok, business cards and email signatures." },
          ].map((f) => (
            <div key={f.title} className="rounded-3xl bg-card p-6 border border-ink/5 hover:border-ink/20 hover:-translate-y-1 transition-all">
              <div className="h-10 w-10 rounded-xl bg-lime grid place-items-center">
                <f.icon className="h-5 w-5 text-ink" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-ink/60 leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Preview band */}
      <section id="preview" className="bg-ink text-cream py-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm text-lime uppercase tracking-widest">Your page, your rules</p>
            <h2 className="mt-3 text-4xl sm:text-5xl font-display font-bold">A canvas — not a template.</h2>
            <p className="mt-5 text-cream/70 leading-relaxed max-w-md">
              Swap palettes, change button shapes, switch fonts. Preview every change in real time on a live device frame. Ship the version you actually love.
            </p>
            <ul className="mt-8 space-y-3">
              {["5 curated palettes", "4 button styles", "Custom backgrounds & noise", "Light & dark out of the box"].map((t) => (
                <li key={t} className="flex items-center gap-3 text-cream/90">
                  <span className="h-5 w-5 rounded-full bg-lime grid place-items-center"><Check className="h-3 w-3 text-ink" /></span>
                  {t}
                </li>
              ))}
            </ul>
            <Link to="/dashboard" className="mt-10 inline-flex items-center gap-2 rounded-full bg-lime text-ink px-6 py-3 font-medium hover:opacity-90">
              Open the studio <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="flex justify-center">
            <ProfilePreview scale={0.85} />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm text-ink/50 uppercase tracking-widest">Pricing</p>
          <h2 className="mt-3 text-4xl sm:text-5xl font-display font-bold">Start free. Stay free.</h2>
          <p className="mt-4 text-ink/60">Upgrade only when you outgrow it. No card required.</p>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {[
            { name: "Free", price: "$0", desc: "Everything to launch.", features: ["Unlimited links", "Basic analytics", "3 themes", "Linkstack badge"], cta: "Start free" },
            { name: "Creator", price: "$6", featured: true, desc: "For people who ship.", features: ["Everything in Free", "All themes & fonts", "30-day analytics", "Remove badge", "Custom backgrounds"], cta: "Go Creator" },
            { name: "Studio", price: "$18", desc: "For teams & brands.", features: ["Everything in Creator", "Multiple profiles", "Team seats", "Priority support"], cta: "Talk to us" },
          ].map((p) => (
            <div key={p.name} className={`rounded-3xl p-8 border ${p.featured ? "bg-ink text-cream border-ink shadow-2xl scale-[1.02]" : "bg-card border-ink/10"}`}>
              <div className="flex items-baseline justify-between">
                <h3 className="text-xl font-display font-bold">{p.name}</h3>
                {p.featured && <span className="text-xs uppercase tracking-wider text-lime">Popular</span>}
              </div>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-5xl font-display font-bold">{p.price}</span>
                <span className={p.featured ? "text-cream/60" : "text-ink/60"}>/mo</span>
              </div>
              <p className={`mt-2 text-sm ${p.featured ? "text-cream/70" : "text-ink/60"}`}>{p.desc}</p>
              <Link to="/dashboard" className={`mt-6 block text-center rounded-full px-5 py-3 font-medium ${p.featured ? "bg-lime text-ink" : "bg-ink text-cream"}`}>{p.cta}</Link>
              <ul className="mt-6 space-y-2 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className={`h-4 w-4 ${p.featured ? "text-lime" : "text-ink"}`} /> {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto rounded-[2.5rem] bg-lime p-12 sm:p-20 text-center relative overflow-hidden noise-bg">
          <h2 className="text-4xl sm:text-6xl font-display font-bold tracking-tight">
            Your <span className="font-serif-display">one link</span> is waiting.
          </h2>
          <p className="mt-4 text-ink/70 max-w-md mx-auto">Takes 30 seconds. No card, no email tricks.</p>
          <Link to="/dashboard" className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink text-cream px-7 py-4 font-medium hover:bg-ink/90">
            Claim linkstack.to/yourname <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-ink/10 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between gap-6 text-sm text-ink/60">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-ink grid place-items-center">
              <Layers className="h-3 w-3 text-lime" />
            </div>
            <span className="font-display font-semibold text-ink">linkstack</span>
            <span>© 2026</span>
          </div>
          <div className="flex flex-wrap gap-6">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Changelog</a>
            <a href="#">Twitter</a>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
