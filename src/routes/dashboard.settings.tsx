import { createFileRoute } from "@tanstack/react-router";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/dashboard/settings")({
  component: SettingsPage,
});

function SettingsPage() {
  const profile = useStore((s) => s.profile);
  const updateProfile = useStore((s) => s.updateProfile);

  return (
    <div className="max-w-2xl">
      <header>
        <h1 className="text-3xl font-display font-bold">Profile</h1>
        <p className="text-sm text-ink/60 mt-1">This is what people see when they land on your page.</p>
      </header>

      <div className="mt-8 space-y-5 rounded-3xl border border-ink/10 bg-card p-6">
        <Field label="Username" hint={`linkstack.to/${profile.username}`}>
          <input
            value={profile.username}
            onChange={(e) => updateProfile({ username: e.target.value.toLowerCase().replace(/\s+/g, "") })}
            className="w-full bg-cream rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 ring-ink/20"
          />
        </Field>
        <Field label="Display name">
          <input
            value={profile.name}
            onChange={(e) => updateProfile({ name: e.target.value })}
            className="w-full bg-cream rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 ring-ink/20"
          />
        </Field>
        <Field label="Bio">
          <textarea
            value={profile.bio}
            onChange={(e) => updateProfile({ bio: e.target.value })}
            rows={3}
            className="w-full bg-cream rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 ring-ink/20 resize-none"
          />
          <div className="text-xs text-ink/40 text-right mt-1">{profile.bio.length}/160</div>
        </Field>
        <Field label="Avatar URL" hint="Leave blank for an initial avatar.">
          <input
            value={profile.avatarUrl}
            onChange={(e) => updateProfile({ avatarUrl: e.target.value })}
            placeholder="https://..."
            className="w-full bg-cream rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 ring-ink/20"
          />
        </Field>
      </div>

      <div className="mt-8 rounded-3xl border border-destructive/30 bg-destructive/5 p-6">
        <h3 className="font-semibold text-destructive">Danger zone</h3>
        <p className="text-sm text-ink/60 mt-1">Permanently delete this profile and all of its links.</p>
        <button className="mt-4 rounded-full bg-destructive text-destructive-foreground px-5 py-2 text-sm font-medium">
          Delete account
        </button>
      </div>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-sm font-medium">{label}</span>
        {hint && <span className="text-xs text-ink/40">{hint}</span>}
      </div>
      {children}
    </label>
  );
}
