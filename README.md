# Shubham Soni — Portfolio

A fully static portfolio built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 and `motion`.
No CMS, no database, no API routes, no secrets.

## Requirements

- **Node 20 or newer** (`node -v`)
- npm (ships with Node)

## Run it

```bash
npm install      # install dependencies
npm run dev      # local dev server at http://localhost:3000
npm run build    # production build (must pass with zero type errors)
npm run start    # serve the production build locally
npm run lint     # eslint
```

## Edit content

All copy and data live in **`src/content/`**. Components only read from these files.

| File | What it controls |
| --- | --- |
| `src/content/site.ts` | Name, email, booking link, location, socials, nav links, status line |
| `src/content/hero.ts` | Hero headline (segments, italics), intro, proof chips, CTAs, portrait |
| `src/content/projects.ts` | Selected work. **Add a project by adding one object** to `projects` |
| `src/content/cases.ts` | Case study bodies for `/work/[slug]`, keyed by project slug |
| `src/content/sections.ts` | What I do, About, Experience, Education, Expertise, FAQ, Contact |

Images live in `public/` (portrait at `public/shubham-soni.png`, path set in `src/content/hero.ts`, project covers and thumbs in `public/work/`).
The resume is `public/resume.pdf`; replace the file to update it.

Placeholders are marked with `TODO:` comments. Find them all with:

```bash
grep -rn "TODO" src
```

### Adding a project

1. Drop `my-project-cover.jpg` (~1600×1000) and `my-project-thumb.jpg` (~480×360) into `public/work/`.
2. Add an object to `projects` in `src/content/projects.ts`.
3. Either set `external: "https://…"` to link out, or add an entry under the same slug in `src/content/cases.ts`.
   A project with neither still gets a page with a "write-up in progress" note.

## Change colors and type

- **Colors:** CSS custom properties on `:root` at the top of `src/app/globals.css`
  (`--bg`, `--surface`, `--line`, `--text`, `--muted`, `--accent`). Nothing else hardcodes a color.
- **Type scale:** the `.t-display`, `.t-h1`, `.t-h2`, `.t-h3`, `.t-body`, `.t-caption`, `.t-label` classes
  in the same file (plus `.t-hero` for the hero headline).
- **Fonts:** loaded with `next/font` in `src/app/layout.tsx` (Instrument Serif + Geist + Geist Mono, self-hosted at build time).
  The OG image uses the copies in `src/assets/fonts/`.
- **Motion:** durations, easing, stagger and every shared variant are in `src/lib/motion.ts`.
  The hero entrance mirrors those values in CSS (see "Hero entrance" in `globals.css`) so it plays before JS loads.
  All motion respects `prefers-reduced-motion` through `src/lib/use-reduced-motion.ts`.

## Deploy (Vercel)

1. Import this repository into Vercel (framework preset: Next.js, detected automatically).
2. Add one environment variable: `NEXT_PUBLIC_SITE_URL` = your production URL, e.g. `https://your-domain.com`.
3. Deploy.

No other configuration is needed. The site needs **no runtime environment variables** and no secrets.
`NEXT_PUBLIC_SITE_URL` is only read at build time for canonicals, the sitemap, robots.txt and OG image URLs;
if it is missing on Vercel, the site falls back to Vercel's production domain, and locally to `http://localhost:3000`.
The only place the domain is read is `src/config/site.ts`.
