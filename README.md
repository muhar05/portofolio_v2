# Muhar Ferdiansyah / Portfolio

> Full-stack engineer building reliable systems and making software work better.

A developer-workspace portfolio. Instead of a template gallery, it presents client and freelance systems as case studies: each project page explains the operational problem, the fulfillment or state flow, and the engineering decisions behind it. Content lives in JSON, the hero opens with an interactive 3D scene, and the whole site can ship as a static export.

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?logo=greensock&logoColor=white)
![Spline](https://img.shields.io/badge/Spline-3D-FFB400)
![pnpm](https://img.shields.io/badge/pnpm-10-F69220?logo=pnpm&logoColor=white)

## Highlights

- **Content-driven.** All copy and project data live in `content/*.json`. Adding a project creates its route automatically. No CMS, no database.
- **Interactive 3D hero.** A Spline scene lazy-loads on the client, with a hand-built SVG illustration as fallback and full `prefers-reduced-motion` support.
- **Case studies, not cards.** Each project has an interactive flow (tabbed state paths), architecture tiers, trade-off decisions, and an outcome, all rendered from `works.json`.
- **Derived tech stack.** The "Technical Expertise" section builds itself from the stack arrays of every project, grouped by layer.
- **Recruiter-ready SEO.** Generated Open Graph image, per-project OG metadata, canonical URLs, `sitemap.xml`, and `robots.txt`.
- **Static-export ready.** `NEXT_OUTPUT=export` produces a fully static `out/` folder, deployable to shared hosting.

## Tech Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) + React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Motion | GSAP + ScrollTrigger |
| 3D | Spline (`@splinetool/react-spline`) |
| Fonts | Geist Sans + Geist Mono (next/font) |
| Package manager | pnpm 10 |

## Project Structure

```
content/
  site.json            # name, tagline, contact channels, CV path
  about.json           # introduction + engineering principles
  works.json           # projects and case-study data
app/
  layout.tsx           # fonts + global metadata
  page.tsx             # home sections
  works/[slug]/        # project case-study pages (SSG)
  opengraph-image.tsx  # generated social share image
  sitemap.ts           # /sitemap.xml
  robots.ts            # /robots.txt
components/sections/
  Hero.tsx             # hero layout + CTAs
  HeroScene.tsx        # 3D scene with loader + 2D fallback
  TechStack.tsx        # stack derived from works.json
  SelectedWork.tsx     # project list
  About.tsx            # philosophy
  Contact.tsx          # channels + CV preview/download
  Footer.tsx
  works/               # case-study building blocks
public/
  cv/                  # downloadable CV (PDF)
  images/works/<slug>/ # project cover images
```

## Getting Started

Requires Node 20+ and pnpm.

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.

```bash
pnpm build   # production build
pnpm start   # run the production server
pnpm lint    # eslint
```

## Editing Content

Everything is data, no code changes needed:

- `content/site.json` -> name, tagline, contact links, and the CV path.
- `content/about.json` -> hero intro and the three engineering principles.
- `content/works.json` -> the projects. Each entry drives both the home list and its `/works/<id>` page (headline, problem, flow paths, decisions, architecture layers, stack, result).

Adding a project to the `projects` array is enough to register a new static route and update the derived stack section.

## 3D Hero Scene

The hero loads a Spline scene from an environment variable, falling back to the generated demo scene:

```bash
NEXT_PUBLIC_SPLINE_SCENE="https://prod.spline.design/<id>/scene.splinecode"
```

If the scene fails to load within 9 seconds, or the visitor prefers reduced motion, the site renders the 2D illustration instead.

## SEO and analytics

- `metadataBase`, canonical URLs, Open Graph and Twitter cards are configured in `app/layout.tsx`.
- The share image is generated at build time by `app/opengraph-image.tsx`.
- Set the production domain with `NEXT_PUBLIC_SITE_URL` (defaults to `https://muharferdiansyah.my.id`).
- GA4 loads only when `NEXT_PUBLIC_GA_ID` is set to a valid `G-...` ID. Without it, no analytics script is rendered.
- Search Console verification is emitted only when `GOOGLE_SITE_VERIFICATION` is set.
- Copy `.env.example` to `.env.local` and fill the values before deploying.

## Deployment

The project can build as a static export and deploy to shared hosting through GitHub Actions.

```bash
NEXT_OUTPUT=export pnpm build   # outputs the static site to out/
```

The workflow at `.github/workflows/deploy-hostinger.yml` builds the export and uploads `out/` to Hostinger over FTPS on every push to `main`. Required repository secrets:

| Secret | Value |
| --- | --- |
| `FTP_SERVER` | FTP host, for example `ftp.muharferdiansyah.my.id` |
| `FTP_USERNAME` | Hostinger FTP username |
| `FTP_PASSWORD` | Hostinger FTP password |

Optional repository variables: `SITE_URL` and `FTP_SERVER_DIR` (defaults to `/public_html/`).

Without `NEXT_OUTPUT=export`, the app builds as a normal Next.js server app.

## Design System

The concept, palette, typography, motion rules, and accessibility floor are documented in [`DESIGN.md`](./DESIGN.md). Read it before changing anything visual.

## License

Personal portfolio. The source is shared for reference; the content, case studies, and CV are not for reuse.
