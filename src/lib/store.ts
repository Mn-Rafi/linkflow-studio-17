import { create } from "zustand";
import { persist } from "zustand/middleware";

export type LinkItem = {
  id: string;
  title: string;
  url: string;
  enabled: boolean;
  featured?: boolean;
  emoji?: string;
  clicks: number;
};

export type SocialItem = {
  id: string;
  platform: "twitter" | "instagram" | "youtube" | "github" | "linkedin" | "tiktok" | "email" | "website";
  url: string;
};

export type Theme = {
  mode: "light" | "dark";
  palette: "cream" | "midnight" | "sunset" | "ocean" | "mono";
  buttonStyle: "solid" | "outline" | "soft" | "pill";
  background: "flat" | "gradient" | "noise" | "blob";
  font: "grotesk" | "serif" | "mono";
};

export type DayStat = { date: string; views: number; clicks: number };

export type Profile = {
  username: string;
  name: string;
  bio: string;
  avatarUrl: string;
  bannerColor: string;
  links: LinkItem[];
  socials: SocialItem[];
  theme: Theme;
  views: number;
  history: DayStat[];
};

type Store = {
  profile: Profile;
  updateProfile: (p: Partial<Profile>) => void;
  updateTheme: (t: Partial<Theme>) => void;
  addLink: (l: Omit<LinkItem, "id" | "clicks">) => void;
  updateLink: (id: string, l: Partial<LinkItem>) => void;
  deleteLink: (id: string) => void;
  reorderLinks: (ids: string[]) => void;
  addSocial: (s: Omit<SocialItem, "id">) => void;
  deleteSocial: (id: string) => void;
  trackClick: (id: string) => void;
  trackView: () => void;
};

function generateHistory(): DayStat[] {
  const out: DayStat[] = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const base = 40 + Math.sin(i / 3) * 25 + Math.random() * 30;
    out.push({
      date: d.toISOString().slice(0, 10),
      views: Math.max(5, Math.round(base + 20)),
      clicks: Math.max(2, Math.round(base * 0.4)),
    });
  }
  return out;
}

const defaultProfile: Profile = {
  username: "alexmorgan",
  name: "Alex Morgan",
  bio: "Designer & indie maker. Building tools for creative humans. Currently in Lisbon ☀️",
  avatarUrl: "",
  bannerColor: "#C6F84E",
  links: [
    { id: "l1", title: "My new portfolio — 2026 edition", url: "https://example.com", enabled: true, featured: true, emoji: "✨", clicks: 1248 },
    { id: "l2", title: "Read my essay on slow software", url: "https://example.com/essay", enabled: true, emoji: "📝", clicks: 642 },
    { id: "l3", title: "Book a 1:1 coaching call", url: "https://example.com/cal", enabled: true, emoji: "📅", clicks: 318 },
    { id: "l4", title: "Newsletter — weekly drops", url: "https://example.com/news", enabled: true, emoji: "📮", clicks: 891 },
    { id: "l5", title: "Buy me a coffee", url: "https://example.com/coffee", enabled: false, emoji: "☕", clicks: 47 },
  ],
  socials: [
    { id: "s1", platform: "twitter", url: "https://twitter.com/alex" },
    { id: "s2", platform: "instagram", url: "https://instagram.com/alex" },
    { id: "s3", platform: "github", url: "https://github.com/alex" },
    { id: "s4", platform: "email", url: "mailto:hi@alex.com" },
  ],
  theme: {
    mode: "light",
    palette: "cream",
    buttonStyle: "soft",
    background: "noise",
    font: "grotesk",
  },
  views: 12480,
  history: generateHistory(),
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      profile: defaultProfile,
      updateProfile: (p) => set((s) => ({ profile: { ...s.profile, ...p } })),
      updateTheme: (t) => set((s) => ({ profile: { ...s.profile, theme: { ...s.profile.theme, ...t } } })),
      addLink: (l) =>
        set((s) => ({
          profile: {
            ...s.profile,
            links: [{ ...l, id: crypto.randomUUID(), clicks: 0 }, ...s.profile.links],
          },
        })),
      updateLink: (id, l) =>
        set((s) => ({
          profile: { ...s.profile, links: s.profile.links.map((x) => (x.id === id ? { ...x, ...l } : x)) },
        })),
      deleteLink: (id) =>
        set((s) => ({ profile: { ...s.profile, links: s.profile.links.filter((x) => x.id !== id) } })),
      reorderLinks: (ids) =>
        set((s) => ({
          profile: {
            ...s.profile,
            links: ids.map((id) => s.profile.links.find((l) => l.id === id)!).filter(Boolean),
          },
        })),
      addSocial: (sc) =>
        set((s) => ({
          profile: { ...s.profile, socials: [...s.profile.socials, { ...sc, id: crypto.randomUUID() }] },
        })),
      deleteSocial: (id) =>
        set((s) => ({ profile: { ...s.profile, socials: s.profile.socials.filter((x) => x.id !== id) } })),
      trackClick: (id) =>
        set((s) => ({
          profile: {
            ...s.profile,
            links: s.profile.links.map((l) => (l.id === id ? { ...l, clicks: l.clicks + 1 } : l)),
          },
        })),
      trackView: () => set((s) => ({ profile: { ...s.profile, views: s.profile.views + 1 } })),
    }),
    { name: "linkstack-store" }
  )
);

export const palettes: Record<Theme["palette"], { bg: string; fg: string; accent: string; label: string }> = {
  cream: { bg: "#F5F2EC", fg: "#1a1a1a", accent: "#C6F84E", label: "Cream" },
  midnight: { bg: "#0F1117", fg: "#F5F2EC", accent: "#A78BFA", label: "Midnight" },
  sunset: { bg: "#FFF0E5", fg: "#3D1F0F", accent: "#FF6B35", label: "Sunset" },
  ocean: { bg: "#E8F4F8", fg: "#0C2340", accent: "#2D8A9E", label: "Ocean" },
  mono: { bg: "#FFFFFF", fg: "#000000", accent: "#000000", label: "Mono" },
};
