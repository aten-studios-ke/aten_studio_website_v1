"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  Check,
  Image as ImageIcon,
  Loader2,
  Lock,
  Plus,
  RefreshCw,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { SiteLogo } from "./site-logo";

type Tab = "projects" | "journal" | "messages";

type Project = {
  id: string;
  title: string;
  slug: string;
  year: string;
  category: string;
  client: string | null;
  description: string | null;
  role: string | null;
  layout: string;
  heroImage: string;
  featured: boolean;
  videoUrl?: string | null;
  liveUrl?: string | null;
  galleryImages?: string | null;
};

type Post = {
  id: string;
  title: string;
  slug: string;
  type: string;
  date: string;
  readTime: string;
  excerpt: string;
  coverImage: string;
  content: string | null;
};

type Message = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  discipline: string | null;
  budget: string | null;
  message: string;
  status: string;
  createdAt: string;
};

const CATEGORIES = [
  "Film",
  "Media",
  "Photography",
  "Software",
  "Creative Technology",
];
const LAYOUTS = ["wide", "tall", "square", "offset"];
const TYPES = ["Field Note", "Project", "Story"];

export function CmsAdmin({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [tab, setTab] = useState<Tab>("projects");

  useEffect(() => {
    fetch("/api/cms/auth")
      .then((r) => r.json())
      .then((d) => setAuthed(!!d.authed))
      .catch(() => setAuthed(false));
  }, []);

  const refresh = useCallback(() => router.refresh(), [router]);

  return (
    <div className="fixed inset-0 z-[80] flex flex-col bg-background">
      {/* Top bar */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-border px-5 md:h-16 md:px-8">
        <div className="flex items-center gap-4">
          <SiteLogo className="text-lg" />
          <span className="h-4 w-px bg-border" />
          <span className="label-mono text-gold">Studio CMS</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-9 w-9 items-center justify-center text-foreground/60 transition-colors hover:text-foreground"
          aria-label="Close CMS"
        >
          <X className="h-5 w-5" strokeWidth={1.5} />
        </button>
      </header>

      {authed === null ? (
        <div className="flex flex-1 items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-gold" />
        </div>
      ) : !authed ? (
        <LoginPanel onAuthed={() => setAuthed(true)} />
      ) : (
        <div className="flex min-h-0 flex-1 flex-col md:flex-row">
          {/* Sidebar */}
          <nav className="flex shrink-0 gap-1 border-b border-border p-3 md:flex-col md:gap-0.5 md:border-b-0 md:border-r md:p-4 md:w-56">
            {([
              ["projects", "Projects"],
              ["journal", "Publications"],
              ["messages", "Messages"],
            ] as [Tab, string][]).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setTab(key)}
                className={`flex items-center justify-between px-3 py-2.5 text-left text-sm transition-colors ${
                  tab === key
                    ? "bg-secondary text-foreground"
                    : "text-foreground/55 hover:text-foreground"
                }`}
              >
                {label}
                <ArrowUpRight className="h-3.5 w-3.5 opacity-40" strokeWidth={1.5} />
              </button>
            ))}
            <div className="mt-auto hidden pt-4 md:block">
              <button
                type="button"
                onClick={async () => {
                  await fetch("/api/cms/auth", { method: "DELETE" });
                  setAuthed(false);
                }}
                className="w-full px-3 py-2 text-left text-xs text-foreground/40 transition-colors hover:text-foreground"
              >
                Sign out
              </button>
            </div>
          </nav>

          {/* Content */}
          <div className="min-h-0 flex-1 overflow-y-auto p-5 md:p-8">
            {tab === "projects" && <ProjectsPanel onChanged={refresh} />}
            {tab === "journal" && <JournalPanel onChanged={refresh} />}
            {tab === "messages" && <MessagesPanel />}
          </div>
        </div>
      )}
    </div>
  );
}

/* ===================== LOGIN ===================== */
function LoginPanel({ onAuthed }: { onAuthed: () => void }) {
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/cms/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError(json.error || "Incorrect password.");
        return;
      }
      onAuthed();
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center p-6">
      <form onSubmit={submit} className="w-full max-w-sm">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center bg-gold text-background">
            <Lock className="h-4 w-4" strokeWidth={2} />
          </span>
          <div>
            <h2 className="editorial-h3 text-xl text-foreground">Studio access</h2>
            <p className="label-mono text-foreground/45">Sign in to manage content</p>
          </div>
        </div>
        <input
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="Password"
          autoFocus
          className="input-underline"
        />
        {error && <p className="mt-3 text-sm text-foreground/70">{error}</p>}
        <button type="submit" disabled={loading} className="btn-solid mt-6 w-full">
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Checking
            </>
          ) : (
            <>Enter</>
          )}
        </button>
        <p className="mt-5 text-xs text-foreground/40">
          Default password: <span className="text-gold">aten2026</span> (set{" "}
          <code className="text-foreground/60">CMS_PASSWORD</code> env to change).
        </p>
      </form>
    </div>
  );
}

/* ===================== PROJECTS ===================== */
function ProjectsPanel({ onChanged }: { onChanged: () => void }) {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Project | "new" | null>(null);

  const load = useCallback(async () => {
    const res = await fetch("/api/projects");
    const d = await res.json();
    setItems(d.projects ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    let active = true;
    (async () => {
      const res = await fetch("/api/projects");
      const d = await res.json();
      if (!active) return;
      setItems(d.projects ?? []);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  async function remove(id: string) {
    if (!confirm("Delete this project? This cannot be undone.")) return;
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    onChanged();
    load();
  }

  if (editing) {
    return (
      <ProjectForm
        initial={editing === "new" ? null : editing}
        onCancel={() => setEditing(null)}
        onSaved={() => {
          setEditing(null);
          onChanged();
          load();
        }}
      />
    );
  }

  return (
    <div>
      <PanelHeader
        title="Projects"
        count={items.length}
        action={
          <button
            type="button"
            onClick={() => setEditing("new")}
            className="btn-type btn-type--gold"
          >
            <Plus className="h-4 w-4" /> New Project
          </button>
        }
      />

      {loading ? (
        <Loading />
      ) : items.length === 0 ? (
        <Empty label="No projects yet. Add your first one." />
      ) : (
        <div className="divide-y divide-border border-y border-border">
          {items.map((p) => (
            <div key={p.id} className="flex items-center gap-4 py-4">
              <div className="h-14 w-20 shrink-0 overflow-hidden bg-card">
                {p.heroImage && (
                   
                  <img src={p.heroImage} alt={p.title} className="h-full w-full object-cover" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="truncate font-display text-base font-semibold text-foreground">
                    {p.title}
                  </h3>
                  {p.featured && (
                    <span className="rounded-none bg-gold/15 px-1.5 py-0.5 text-[0.6rem] uppercase tracking-wider text-gold">
                      Featured
                    </span>
                  )}
                </div>
                <p className="label-mono mt-0.5 text-foreground/45">
                  {p.category} · {p.year} · /{p.slug}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditing(p)}
                className="px-3 py-2 text-xs text-foreground/70 transition-colors hover:text-gold"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => remove(p.id)}
                className="inline-flex h-9 w-9 items-center justify-center text-foreground/40 transition-colors hover:text-foreground"
                aria-label="Delete"
              >
                <Trash2 className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectForm({
  initial,
  onCancel,
  onSaved,
}: {
  initial: Project | null;
  onCancel: () => void;
  onSaved: () => void;
}) {
  const [f, setF] = useState({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    year: initial?.year ?? String(new Date().getFullYear()),
    category: initial?.category ?? "Creative Technology",
    client: initial?.client ?? "",
    description: initial?.description ?? "",
    role: initial?.role ?? "",
    layout: initial?.layout ?? "square",
    heroImage: initial?.heroImage ?? "",
    featured: initial?.featured ?? false,
    videoUrl: initial?.videoUrl ?? "",
    liveUrl: initial?.liveUrl ?? "",
    galleryImages: (() => {
      try {
        const v = initial?.galleryImages;
        return Array.isArray(v) ? v : v ? JSON.parse(v) : [];
      } catch {
        return [];
      }
    })() as string[],
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof typeof f, v: string | boolean | string[]) =>
    setF((p) => ({ ...p, [k]: v }));

  const isFilm = f.category === "Film" || f.category === "Media";
  const isPhoto = f.category === "Photography";
  const isSoftware = f.category === "Software" || f.category === "Creative Technology";

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const url = initial ? `/api/projects/${initial.id}` : "/api/projects";
      const method = initial ? "PUT" : "POST";
      const payload = {
        ...f,
        galleryImages: f.galleryImages.length
          ? JSON.stringify(f.galleryImages)
          : "",
      };
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError(json.error || "Could not save.");
        return;
      }
      onSaved();
    } catch {
      setError("Network error.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={save} className="flex max-w-2xl flex-col">
      <div className="mb-6 flex items-center gap-3">
        <button type="button" onClick={onCancel} className="text-foreground/50 hover:text-foreground">
          <X className="h-5 w-5" strokeWidth={1.5} />
        </button>
        <h2 className="editorial-h3 text-xl text-foreground">
          {initial ? "Edit project" : "New project"}
        </h2>
      </div>

      <ImagePicker
        label="Cover image *"
        value={f.heroImage}
        onChange={(url) => set("heroImage", url)}
      />

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <FormField label="Title *">
          <input className="input-underline" value={f.title} onChange={(e) => set("title", e.target.value)} required />
        </FormField>
        <FormField label="Slug (optional)">
          <input className="input-underline" value={f.slug} onChange={(e) => set("slug", e.target.value)} placeholder="auto from title" />
        </FormField>
        <FormField label="Year">
          <input className="input-underline" value={f.year} onChange={(e) => set("year", e.target.value)} />
        </FormField>
        <FormField label="Category">
          <select className="input-underline" value={f.category} onChange={(e) => set("category", e.target.value)}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </FormField>
        <FormField label="Client">
          <input className="input-underline" value={f.client} onChange={(e) => set("client", e.target.value)} />
        </FormField>
        <FormField label="Role">
          <input className="input-underline" value={f.role} onChange={(e) => set("role", e.target.value)} placeholder="Direction, Camera…" />
        </FormField>
        <FormField label="Grid layout">
          <select className="input-underline" value={f.layout} onChange={(e) => set("layout", e.target.value)}>
            {LAYOUTS.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </FormField>
        <FormField label="Featured">
          <label className="flex cursor-pointer items-center gap-2 pt-3 text-sm text-foreground/80">
            <input type="checkbox" checked={f.featured} onChange={(e) => set("featured", e.target.checked)} />
            Show as featured project
          </label>
        </FormField>
      </div>

      {/* Category-specific media fields */}
      {isFilm && (
        <div className="mt-6 rounded-sm border border-gold/25 bg-gold-soft p-5">
          <p className="label-mono mb-4 text-gold">Film / Media — video</p>
          <FormField label="Video URL (YouTube or Vimeo)">
            <input
              className="input-underline"
              value={f.videoUrl}
              onChange={(e) => set("videoUrl", e.target.value)}
              placeholder="https://youtube.com/watch?v=… or https://vimeo.com/…"
            />
          </FormField>
          <p className="mt-3 text-xs text-foreground/50">
            Paste a YouTube or Vimeo link. It will be shown as an embedded player on the featured project.
          </p>
        </div>
      )}

      {isPhoto && (
        <div className="mt-6 rounded-sm border border-gold/25 bg-gold-soft p-5">
          <p className="label-mono mb-4 text-gold">Photography — album / gallery</p>
          <GalleryEditor
            images={f.galleryImages}
            onChange={(imgs) => set("galleryImages", imgs)}
          />
        </div>
      )}

      {isSoftware && (
        <div className="mt-6 rounded-sm border border-gold/25 bg-gold-soft p-5">
          <p className="label-mono mb-4 text-gold">Software / Creative Technology — product</p>
          <FormField label="Live URL">
            <input
              className="input-underline"
              value={f.liveUrl}
              onChange={(e) => set("liveUrl", e.target.value)}
              placeholder="https://your-product.com"
            />
          </FormField>
          <p className="mt-3 text-xs text-foreground/50">
            A link to the live product, demo or platform.
          </p>
        </div>
      )}

      <div className="mt-6">
        <FormField label="Description">
          <textarea
            className="input-underline"
            rows={4}
            value={f.description}
            onChange={(e) => set("description", e.target.value)}
          />
        </FormField>
      </div>

      {error && <p className="mt-4 text-sm text-foreground/70">{error}</p>}

      {/* Sticky action bar — always reachable */}
      <div className="sticky bottom-0 z-10 mt-8 -mx-1 flex items-center gap-4 border-t border-border bg-background/95 px-1 py-4 backdrop-blur">
        <button type="submit" disabled={saving} className="btn-solid">
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Saving
            </>
          ) : (
            <>
              <Check className="h-4 w-4" /> Save project
            </>
          )}
        </button>
        <button type="button" onClick={onCancel} className="btn-type btn-type--muted">
          Cancel
        </button>
      </div>
    </form>
  );
}

/* ===================== JOURNAL ===================== */
function JournalPanel({ onChanged }: { onChanged: () => void }) {
  const [items, setItems] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Post | "new" | null>(null);

  const load = useCallback(async () => {
    const res = await fetch("/api/journal");
    const d = await res.json();
    setItems(d.posts ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    let active = true;
    (async () => {
      const res = await fetch("/api/journal");
      const d = await res.json();
      if (!active) return;
      setItems(d.posts ?? []);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  async function remove(id: string) {
    if (!confirm("Delete this publication?")) return;
    await fetch(`/api/journal/${id}`, { method: "DELETE" });
    onChanged();
    load();
  }

  if (editing) {
    return (
      <JournalForm
        initial={editing === "new" ? null : editing}
        onCancel={() => setEditing(null)}
        onSaved={() => {
          setEditing(null);
          onChanged();
          load();
        }}
      />
    );
  }

  return (
    <div>
      <PanelHeader
        title="Publications"
        count={items.length}
        action={
          <button type="button" onClick={() => setEditing("new")} className="btn-type btn-type--gold">
            <Plus className="h-4 w-4" /> New Post
          </button>
        }
      />
      {loading ? (
        <Loading />
      ) : items.length === 0 ? (
        <Empty label="No publications yet. Add your first one." />
      ) : (
        <div className="divide-y divide-border border-y border-border">
          {items.map((p) => (
            <div key={p.id} className="flex items-center gap-4 py-4">
              <div className="h-14 w-20 shrink-0 overflow-hidden bg-card">
                {p.coverImage && (
                   
                  <img src={p.coverImage} alt={p.title} className="h-full w-full object-cover" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-display text-base font-semibold text-foreground">
                  {p.title}
                </h3>
                <p className="label-mono mt-0.5 text-foreground/45">
                  {p.type} · {p.date} · {p.readTime} · /{p.slug}
                </p>
              </div>
              <button type="button" onClick={() => setEditing(p)} className="px-3 py-2 text-xs text-foreground/70 hover:text-gold">
                Edit
              </button>
              <button type="button" onClick={() => remove(p.id)} className="inline-flex h-9 w-9 items-center justify-center text-foreground/40 hover:text-foreground" aria-label="Delete">
                <Trash2 className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function JournalForm({
  initial,
  onCancel,
  onSaved,
}: {
  initial: Post | null;
  onCancel: () => void;
  onSaved: () => void;
}) {
  const [f, setF] = useState({
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    type: initial?.type ?? "Story",
    date: initial?.date ?? "",
    readTime: initial?.readTime ?? "5 min",
    excerpt: initial?.excerpt ?? "",
    coverImage: initial?.coverImage ?? "",
    content: initial?.content ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof typeof f, v: string) => setF((p) => ({ ...p, [k]: v }));

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const url = initial ? `/api/journal/${initial.id}` : "/api/journal";
      const method = initial ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(f),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError(json.error || "Could not save.");
        return;
      }
      onSaved();
    } catch {
      setError("Network error.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={save} className="max-w-2xl">
      <div className="mb-6 flex items-center gap-3">
        <button type="button" onClick={onCancel} className="text-foreground/50 hover:text-foreground">
          <X className="h-5 w-5" strokeWidth={1.5} />
        </button>
        <h2 className="editorial-h3 text-xl text-foreground">
          {initial ? "Edit publication" : "New publication"}
        </h2>
      </div>

      <ImagePicker
        label="Cover image *"
        value={f.coverImage}
        onChange={(url) => set("coverImage", url)}
      />

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <FormField label="Title *">
          <input className="input-underline" value={f.title} onChange={(e) => set("title", e.target.value)} required />
        </FormField>
        <FormField label="Slug (optional)">
          <input className="input-underline" value={f.slug} onChange={(e) => set("slug", e.target.value)} placeholder="auto from title" />
        </FormField>
        <FormField label="Type">
          <select className="input-underline" value={f.type} onChange={(e) => set("type", e.target.value)}>
            {TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </FormField>
        <FormField label="Date">
          <input className="input-underline" value={f.date} onChange={(e) => set("date", e.target.value)} placeholder="Mar 2026" />
        </FormField>
        <FormField label="Read time">
          <input className="input-underline" value={f.readTime} onChange={(e) => set("readTime", e.target.value)} placeholder="5 min" />
        </FormField>
      </div>

      <div className="mt-6">
        <FormField label="Excerpt">
          <textarea className="input-underline" rows={3} value={f.excerpt} onChange={(e) => set("excerpt", e.target.value)} />
        </FormField>
      </div>
      <div className="mt-6">
        <FormField label="Content (optional)">
          <textarea className="input-underline" rows={6} value={f.content} onChange={(e) => set("content", e.target.value)} />
        </FormField>
      </div>

      {error && <p className="mt-4 text-sm text-foreground/70">{error}</p>}

      <div className="mt-8 flex items-center gap-4">
        <button type="submit" disabled={saving} className="btn-solid">
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Saving
            </>
          ) : (
            <>
              <Check className="h-4 w-4" /> Save publication
            </>
          )}
        </button>
        <button type="button" onClick={onCancel} className="btn-type btn-type--muted">
          Cancel
        </button>
      </div>
    </form>
  );
}

/* ===================== MESSAGES ===================== */
function MessagesPanel() {
  const [items, setItems] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/contact?cms=1");
      const d = await res.json();
      setItems(d.messages ?? []);
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      <PanelHeader title="Messages" count={items.length} />
      {loading ? (
        <Loading />
      ) : items.length === 0 ? (
        <Empty label="No messages yet." />
      ) : (
        <div className="space-y-4">
          {items.map((m) => (
            <div key={m.id} className="border border-border p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-base font-semibold text-foreground">{m.name}</h3>
                <span className="label-mono text-foreground/40">
                  {new Date(m.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
              </div>
              <a href={`mailto:${m.email}`} className="link-underline mt-1 inline-block text-sm text-gold">
                {m.email}
              </a>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 label-mono text-foreground/50">
                {m.company && <span>Company: {m.company}</span>}
                {m.discipline && <span>Discipline: {m.discipline}</span>}
                {m.budget && <span>Budget: {m.budget}</span>}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-foreground/80">{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ===================== SHARED ===================== */
function PanelHeader({
  title,
  count,
  action,
}: {
  title: string;
  count?: number;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex items-end justify-between">
      <div>
        <h2 className="editorial-h2 text-2xl text-foreground md:text-3xl">{title}</h2>
        {count != null && (
          <p className="label-mono mt-1 text-foreground/45">{count} total</p>
        )}
      </div>
      {action}
    </div>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <span className="input-underline-label">{label}</span>
      {children}
    </div>
  );
}

function Loading() {
  return (
    <div className="flex items-center gap-3 py-12 text-foreground/50">
      <Loader2 className="h-5 w-5 animate-spin" />
      <span className="label-mono">Loading…</span>
    </div>
  );
}

function Empty({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-foreground/40">
      <ImageIcon className="h-8 w-8" strokeWidth={1} />
      <p className="text-sm">{label}</p>
    </div>
  );
}

/** Image picker: upload a file OR paste a URL. */
function ImagePicker({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function onFile(file: File) {
    setUploading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError(json.error || "Upload failed.");
        return;
      }
      onChange(json.url);
    } catch {
      setError("Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <span className="input-underline-label">{label}</span>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        {/* Preview */}
        <div className="h-28 w-40 shrink-0 overflow-hidden bg-card">
          {value ? (
             
            <img src={value} alt="preview" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-foreground/30">
              <ImageIcon className="h-6 w-6" strokeWidth={1} />
            </div>
          )}
        </div>

        <div className="flex-1 space-y-3">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/images/... or /uploads/..."
            className="input-underline"
          />
          <label className="inline-flex cursor-pointer items-center gap-2 border border-border px-4 py-2 text-xs uppercase tracking-wider text-foreground/70 transition-colors hover:border-gold hover:text-gold">
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Uploading
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" strokeWidth={1.5} /> Upload image
              </>
            )}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onFile(file);
              }}
            />
          </label>
          {error && <p className="text-xs text-foreground/70">{error}</p>}
        </div>
      </div>
    </div>
  );
}

/**
 * Gallery editor — for photography albums.
 * Add images by upload or URL; reorder/remove inline.
 */
function GalleryEditor({
  images,
  onChange,
}: {
  images: string[];
  onChange: (imgs: string[]) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState("");

  async function upload(file: File) {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const json = await res.json();
      if (res.ok && json.ok) {
        onChange([...images, json.url]);
      }
    } finally {
      setUploading(false);
    }
  }

  function addUrl() {
    const v = urlInput.trim();
    if (!v) return;
    onChange([...images, v]);
    setUrlInput("");
  }

  function remove(i: number) {
    onChange(images.filter((_, idx) => idx !== i));
  }

  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= images.length) return;
    const next = [...images];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }

  return (
    <div>
      {images.length > 0 && (
        <div className="mb-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
          {images.map((src, i) => (
            <div key={i} className="group relative aspect-square overflow-hidden bg-card">
              { }
              <img src={src} alt={`Gallery ${i + 1}`} className="h-full w-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center gap-1 bg-background/70 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => move(i, -1)}
                  className="flex h-7 w-7 items-center justify-center bg-background/90 text-foreground hover:text-gold"
                  aria-label="Move left"
                  disabled={i === 0}
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => move(i, 1)}
                  className="flex h-7 w-7 items-center justify-center bg-background/90 text-foreground hover:text-gold"
                  aria-label="Move right"
                  disabled={i === images.length - 1}
                >
                  ›
                </button>
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="flex h-7 w-7 items-center justify-center bg-background/90 text-foreground hover:text-foreground"
                  aria-label="Remove"
                >
                  <Trash2 className="h-3.5 w-3.5" strokeWidth={1.5} />
                </button>
              </div>
              <span className="absolute left-1 top-1 label-mono bg-background/80 px-1 text-[0.6rem] text-foreground/70">
                {i + 1}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Add by upload */}
      <div className="flex flex-wrap items-center gap-3">
        <label className="inline-flex cursor-pointer items-center gap-2 border border-border px-4 py-2 text-xs uppercase tracking-wider text-foreground/70 transition-colors hover:border-gold hover:text-gold">
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Uploading
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" strokeWidth={1.5} /> Add image
            </>
          )}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) upload(file);
              e.currentTarget.value = "";
            }}
          />
        </label>

        {/* Add by URL */}
        <div className="flex flex-1 items-center gap-2">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addUrl();
              }
            }}
            placeholder="…or paste an image URL and press Enter"
            className="input-underline flex-1"
          />
          {urlInput && (
            <button type="button" onClick={addUrl} className="btn-type btn-type--gold">
              Add
            </button>
          )}
        </div>
      </div>

      <p className="mt-3 text-xs text-foreground/50">
        {images.length === 0
          ? "Add images to create a gallery / album for this photography project."
          : `${images.length} image${images.length > 1 ? "s" : ""} in this album. Drag-order with the arrows; hover to remove.`}
      </p>
    </div>
  );
}
