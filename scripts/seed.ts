 
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const db = new PrismaClient().$extends(withAccelerate());

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

async function main() {
  const projects = [
    {
      title: "Golden Hour Requiem",
      year: "2025",
      category: "Film",
      client: "Aten Originals",
      description:
        "A short film exploring memory, light and the land — shot across the Great Rift Valley at the edge of dusk. Directed, scored and graded in-house at ATEN.",
      role: "Direction, Camera, Grade",
      heroImage: "/images/featured.jpg",
      layout: "wide",
      featured: true,
    },
    {
      title: "Atelier Noir",
      year: "2025",
      category: "Photography",
      client: "Atelier Noir",
      description:
        "Editorial portrait series — dramatic golden rim light, deep shadows, fine grain.",
      role: "Photography, Direction",
      heroImage: "/images/work-photography.jpg",
      layout: "offset",
    },
    {
      title: "Halcyon OS",
      year: "2024",
      category: "Software",
      client: "Halcyon",
      description:
        "A dark software dashboard platform — glowing data visualizations, minimal premium UI.",
      role: "Product Design, Engineering",
      heroImage: "/images/work-software.jpg",
      layout: "square",
    },
    {
      title: "Savanna Lines",
      year: "2024",
      category: "Media",
      client: "Savanna Trust",
      description:
        "Documentary film still — vast savanna at golden hour, lone figure on the horizon.",
      role: "Direction, Camera",
      heroImage: "/images/work-documentary.jpg",
      layout: "tall",
    },
    {
      title: "Lattice / Field",
      year: "2025",
      category: "Creative Technology",
      client: "Aten Lab",
      description:
        "Generative lattice visualization — golden particles forming intricate geometry on black.",
      role: "Creative Technology, Engineering",
      heroImage: "/images/work-creative-tech.jpg",
      layout: "offset",
    },
    {
      title: "Studio Portraits",
      year: "2023",
      category: "Photography",
      client: "Aten Studio",
      description: "Close-up studio photography — hands operating a cinema camera.",
      role: "Photography",
      heroImage: "/images/journal-1.jpg",
      layout: "square",
    },
  ];

  for (const p of projects) {
    await db.project.upsert({
      where: { slug: slugify(p.title) },
      update: {},
      create: { ...p, slug: slugify(p.title) },
    });
  }

  const posts = [
    {
      title: "Shooting at the edge of dusk",
      type: "Field Note",
      date: "Mar 2026",
      readTime: "4 min",
      excerpt:
        "Notes from three days in the Rift Valley — chasing golden hour, dust and a single quiet idea.",
      coverImage: "/images/journal-1.jpg",
    },
    {
      title: "Building Halcyon OS",
      type: "Project",
      date: "Feb 2026",
      readTime: "7 min",
      excerpt:
        "How we designed and shipped a platform from a blank page — and what we'd do differently.",
      coverImage: "/images/journal-2.jpg",
    },
    {
      title: "A studio is a practice, not a place",
      type: "Story",
      date: "Jan 2026",
      readTime: "5 min",
      excerpt:
        "On craft, rhythm and the slow work of building a creative technology studio in Nairobi.",
      coverImage: "/images/journal-3.jpg",
    },
  ];

  for (const j of posts) {
    await db.journalPost.upsert({
      where: { slug: slugify(j.title) },
      update: {},
      create: { ...j, slug: slugify(j.title) },
    });
  }

  console.log(
    `Seeded: ${await db.project.count()} projects, ${await db.journalPost.count()} journal posts`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
