# Muhar Ferdiansyah / Portfolio

> Full-stack engineer building reliable systems and making software work better.

A developer-workspace portfolio. Instead of a template gallery, it presents client projects as case studies: each project page explains the operational problem, the fulfillment or state flow, the engineering decisions, and the deployment limits. Client names are withheld. Content lives in JSON, and the whole site ships as a static export.

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?logo=greensock&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-10-F69220?logo=pnpm&logoColor=white)

## Highlights

- **Content-driven.** All copy and project data live in `content/*.json`. Adding a project creates its route automatically. No CMS, no database.
- **Honest previews.** Real client screenshots are not published. The site renders labelled placeholders until dummy-data screenshots are supplied.
- **Case studies, not cards.** Each project has an interactive flow, architecture tiers, trade-off decisions, hard challenge, engineering facts, and an outcome, all rendered from `works.json`.
- **Derived tech stack.** The "Technical Expertise" section builds itself from the stack arrays of every project, grouped by layer.
- **Recruiter-ready SEO.** Generated Open Graph image, per-project OG metadata, canonical URLs, CreativeWork JSON-LD, `sitemap.xml`, and `robots.txt`.
- **Contact obfuscation.** Email and WhatsApp destinations are assembled in the browser at click time, not printed in the HTML.
- **Static-export ready.** `NEXT_OUTPUT=export` produces a fully static `out/` folder, deployable to shared hosting.

## Tech Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router) + React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Motion | GSAP + ScrollTrigger |
| Fonts | Geist Sans + Geist Mono + Plus Jakarta Sans (next/font) |
| Contact | Client-side email and WhatsApp obfuscation |
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
  TechStack.tsx        # stack derived from works.json
  SelectedWork.tsx     # project list
  About.tsx            # philosophy
  Contact.tsx          # channels + CV preview/download
  Footer.tsx
  works/               # case-study building blocks
components/ui/
  ProjectPlaceholder.tsx # labelled preview placeholder
  ContactActions.tsx     # client-side email and WhatsApp actions
public/
  cv/                  # downloadable CV (PDF)
  images/works/<slug>/ # dummy-data project images (to be added)
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
- `content/works.json` -> the projects. Each entry drives both the home list and its `/works/<id>` page (headline, problem, flow paths, decisions, hard challenge, engineering facts, stack, outcome, next steps).

Adding a project to the `projects` array is enough to register a new static route and update the derived stack section.

## Project previews

Real client screenshots were removed from `public/` because they contained client names and live figures. The site renders labelled placeholders until dummy-data screenshots are supplied. To publish a preview, add the image path to `media.images.cover` in `content/works.json`.

## Contact privacy

Email and WhatsApp destinations are assembled in the browser at click time. They are not printed in the server-rendered HTML or the Person JSON-LD. This is obfuscation, not a server-side rate limit. A real contact form would need an endpoint and provider-side rate limiting.

## SEO and analytics

- `metadataBase`, canonical URLs, Open Graph and Twitter cards are configured in `app/layout.tsx`.
- Each case study adds CreativeWork and BreadcrumbList JSON-LD.
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
