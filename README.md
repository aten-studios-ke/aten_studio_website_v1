# ATEN Studio KE — Website v1

Official website for **ATEN Studio KE**, a Kisumu-born creative technology studio. Film · Photography · Software · Digital Skills.

## Stack

- **Framework:** Next.js 16 (App Router, standalone output)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui + Radix UI
- **Database ORM:** Prisma
- **Auth:** NextAuth v4
- **i18n:** next-intl
- **Fonts:** Geist Sans & Geist Mono (via `geist` npm package — self-hosted), Bricolage Grotesque (Google Fonts)
- **Animations:** Framer Motion
- **State:** Zustand + TanStack Query
- **Runtime:** Bun (production), Node (dev)

## Getting Started

```bash
npm install
npm run dev        # starts on port 3000
```

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Dev server on port 3000 (webpack) |
| `npm run build` | Production build (standalone) |
| `npm run start` | Start production server via Bun |
| `npm run db:push` | Push Prisma schema to DB |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:migrate` | Run migrations |
| `npm run db:reset` | Reset database |

## Notes

- Geist fonts are loaded from the `geist` npm package (not Google Fonts) to avoid network fetch issues in restricted environments.
- Bricolage Grotesque uses `axes: ["opsz"]` only — `wght` is included by default in variable fonts and must not be listed explicitly.
- Build uses `--webpack` flag; Turbopack is not used.
- `reactStrictMode` is disabled.
# aten_studio_website_v1
# aten_studio_website_v1
