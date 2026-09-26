import { db } from "@/lib/db";
import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Work, type ProjectItem } from "@/components/site/work";
import { FeaturedProject } from "@/components/site/featured-project";
import { CapabilityList } from "@/components/site/capability-list";
import { Studio } from "@/components/site/studio";
import { Journal, type JournalItem } from "@/components/site/journal";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { Grain } from "@/components/site/grain";
import { CmsTrigger } from "@/components/site/cms-trigger";

export const dynamic = "force-dynamic";

const CATS = ["Film", "Media", "Photography", "Software", "Creative Technology"] as const;
const LAYOUTS = ["wide", "tall", "square", "offset"] as const;

export type FeaturedData = {
  id: string;
  title: string;
  category: string;
  year: string;
  description: string | null;
  role: string | null;
  heroImage: string;
  videoUrl: string | null;
  liveUrl: string | null;
  galleryImages: string[];
};

export default async function Home() {
  const [projects, posts] = await Promise.all([
    db.project.findMany({ orderBy: [{ featured: "desc" }, { createdAt: "desc" }] }),
    db.journalPost.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  const projectItems: ProjectItem[] = projects.map((p) => ({
    id: p.id,
    title: p.title,
    category: (CATS as readonly string[]).includes(p.category)
      ? (p.category as (typeof CATS)[number])
      : "Creative Technology",
    year: p.year,
    image: p.heroImage,
    layout: (LAYOUTS as readonly string[]).includes(p.layout)
      ? (p.layout as (typeof LAYOUTS)[number])
      : "square",
  }));

  // Featured project = first project flagged featured (fallback: first project)
  const fp = projects.find((p) => p.featured) ?? projects[0] ?? null;
  let featured: FeaturedData | null = null;
  if (fp) {
    let gallery: string[] = [];
    try {
      gallery = fp.galleryImages ? JSON.parse(fp.galleryImages) : [];
    } catch {
      gallery = [];
    }
    featured = {
      id: fp.id,
      title: fp.title,
      category: fp.category,
      year: fp.year,
      description: fp.description,
      role: fp.role,
      heroImage: fp.heroImage,
      videoUrl: fp.videoUrl,
      liveUrl: fp.liveUrl,
      galleryImages: gallery,
    };
  }

  // Work grid excludes the featured project so it isn't shown twice
  const gridItems = featured
    ? projectItems.filter((p) => p.id !== featured!.id)
    : projectItems;

  const journalItems: JournalItem[] = posts.map((p) => ({
    id: p.id,
    type: p.type,
    title: p.title,
    excerpt: p.excerpt,
    image: p.coverImage,
    date: p.date,
    read: p.readTime,
  }));

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Grain />
      <Header />

      <main className="flex-1">
        <Hero />
        <Work projects={gridItems} />
        <FeaturedProject featured={featured} />
        <Studio />
        <CapabilityList />
        <Journal posts={journalItems} />
        <Contact />
      </main>

      <Footer />
      <CmsTrigger />
    </div>
  );
}
