import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useStore, type LinkItem } from "@/lib/store";
import { Plus, GripVertical, Trash2, Star, Pencil, X, Check, Eye } from "lucide-react";
import { SocialIcon } from "@/components/SocialIcon";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  type DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const Route = createFileRoute("/dashboard/")({
  component: LinksPage,
});

function LinksPage() {
  const profile = useStore((s) => s.profile);
  const addLink = useStore((s) => s.addLink);
  const reorderLinks = useStore((s) => s.reorderLinks);
  const addSocial = useStore((s) => s.addSocial);
  const deleteSocial = useStore((s) => s.deleteSocial);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  function onDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const ids = profile.links.map((l) => l.id);
    const oldIdx = ids.indexOf(active.id as string);
    const newIdx = ids.indexOf(over.id as string);
    reorderLinks(arrayMove(ids, oldIdx, newIdx));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !url) return;
    addLink({ title, url, enabled: true, emoji: "🔗" });
    setTitle(""); setUrl("");
  }

  return (
    <div className="max-w-3xl">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Links</h1>
          <p className="text-sm text-ink/60 mt-1">Add, edit, reorder and toggle the links on your page.</p>
        </div>
        <div className="text-sm text-ink/60 flex items-center gap-2">
          <Eye className="h-4 w-4" /> {profile.links.filter((l) => l.enabled).length} live
        </div>
      </header>

      {/* Add */}
      <form onSubmit={submit} className="mt-8 rounded-3xl border border-ink/10 bg-card p-5">
        <div className="grid sm:grid-cols-[1fr_1fr_auto] gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Link title"
            className="bg-cream rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 ring-ink/20"
          />
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://..."
            className="bg-cream rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 ring-ink/20"
          />
          <button className="rounded-xl bg-ink text-cream px-5 py-3 text-sm font-medium inline-flex items-center justify-center gap-1.5 hover:bg-ink/90">
            <Plus className="h-4 w-4" /> Add link
          </button>
        </div>
      </form>

      {/* Links */}
      <div className="mt-6">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={profile.links.map((l) => l.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {profile.links.map((l) => <LinkRow key={l.id} link={l} />)}
              {profile.links.length === 0 && (
                <div className="text-center py-12 rounded-3xl border border-dashed border-ink/20 text-ink/50">
                  No links yet. Add your first above.
                </div>
              )}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {/* Socials */}
      <section className="mt-12">
        <h2 className="text-xl font-display font-bold">Social icons</h2>
        <p className="text-sm text-ink/60 mt-1">Compact row at the top of your profile.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {profile.socials.map((s) => (
            <div key={s.id} className="group inline-flex items-center gap-2 rounded-full bg-card border border-ink/10 pl-3 pr-1 py-1 text-sm">
              <SocialIcon platform={s.platform} className="h-4 w-4" />
              <span className="capitalize">{s.platform}</span>
              <button onClick={() => deleteSocial(s.id)} className="p-1 rounded-full hover:bg-destructive/10 text-ink/40 hover:text-destructive">
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          <AddSocial onAdd={(p, u) => addSocial({ platform: p, url: u })} />
        </div>
      </section>
    </div>
  );
}

function LinkRow({ link }: { link: LinkItem }) {
  const updateLink = useStore((s) => s.updateLink);
  const deleteLink = useStore((s) => s.deleteLink);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(link.title);
  const [url, setUrl] = useState(link.url);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: link.id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.5 : 1 };

  function save() {
    updateLink(link.id, { title, url });
    setEditing(false);
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="rounded-2xl bg-card border border-ink/10 p-4 flex items-center gap-3 group"
    >
      <button {...attributes} {...listeners} className="p-1.5 text-ink/30 hover:text-ink cursor-grab active:cursor-grabbing">
        <GripVertical className="h-5 w-5" />
      </button>
      <div className="text-2xl">{link.emoji}</div>
      <div className="flex-1 min-w-0">
        {editing ? (
          <div className="space-y-2">
            <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-cream rounded-lg px-3 py-2 text-sm" />
            <input value={url} onChange={(e) => setUrl(e.target.value)} className="w-full bg-cream rounded-lg px-3 py-2 text-sm" />
          </div>
        ) : (
          <>
            <div className="font-medium truncate flex items-center gap-2">
              {link.title}
              {link.featured && <span className="text-xs px-1.5 py-0.5 rounded-full bg-lime text-ink font-medium">Featured</span>}
            </div>
            <div className="text-xs text-ink/50 truncate">{link.url} · {link.clicks} clicks</div>
          </>
        )}
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={() => updateLink(link.id, { featured: !link.featured })}
          className={`p-2 rounded-lg ${link.featured ? "text-lime" : "text-ink/40 hover:text-ink"}`}
          title="Feature"
        >
          <Star className="h-4 w-4" fill={link.featured ? "currentColor" : "none"} />
        </button>
        {editing ? (
          <button onClick={save} className="p-2 rounded-lg text-ink/60 hover:text-ink"><Check className="h-4 w-4" /></button>
        ) : (
          <button onClick={() => setEditing(true)} className="p-2 rounded-lg text-ink/40 hover:text-ink"><Pencil className="h-4 w-4" /></button>
        )}
        <button onClick={() => deleteLink(link.id)} className="p-2 rounded-lg text-ink/40 hover:text-destructive">
          <Trash2 className="h-4 w-4" />
        </button>
        <label className="ml-1 inline-flex cursor-pointer relative">
          <input
            type="checkbox"
            checked={link.enabled}
            onChange={(e) => updateLink(link.id, { enabled: e.target.checked })}
            className="sr-only peer"
          />
          <div className="w-10 h-6 bg-ink/15 rounded-full peer-checked:bg-ink transition-colors relative">
            <div className="absolute top-0.5 left-0.5 h-5 w-5 bg-cream rounded-full transition-transform peer-checked:translate-x-4" />
          </div>
        </label>
      </div>
    </div>
  );
}

function AddSocial({ onAdd }: { onAdd: (p: any, u: string) => void }) {
  const [open, setOpen] = useState(false);
  const [platform, setPlatform] = useState<any>("twitter");
  const [url, setUrl] = useState("");
  if (!open)
    return (
      <button onClick={() => setOpen(true)} className="inline-flex items-center gap-1 rounded-full border-2 border-dashed border-ink/20 px-3 py-1 text-sm text-ink/60 hover:border-ink/40">
        <Plus className="h-3.5 w-3.5" /> Add social
      </button>
    );
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-card border border-ink/10 p-1 pl-2">
      <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="bg-transparent text-sm outline-none">
        {["twitter", "instagram", "youtube", "github", "linkedin", "tiktok", "email", "website"].map((p) => (
          <option key={p}>{p}</option>
        ))}
      </select>
      <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="URL" className="bg-cream rounded-full px-3 py-1 text-sm outline-none w-40" />
      <button
        onClick={() => { if (url) { onAdd(platform, url); setUrl(""); setOpen(false); } }}
        className="rounded-full bg-ink text-cream px-3 py-1 text-xs font-medium"
      >
        Add
      </button>
      <button onClick={() => setOpen(false)} className="p-1 text-ink/40 hover:text-ink"><X className="h-4 w-4" /></button>
    </div>
  );
}
