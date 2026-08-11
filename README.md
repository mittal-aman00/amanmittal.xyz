# amanmittal.xyz

Personal portfolio for Aman Mittal — built with Next.js 16 (App Router), React 19, Tailwind CSS v4 and Framer Motion.

## Running it

```bash
npm install
cp .env.local.example .env.local   # then fill in your EmailJS keys
npm run dev
```

The site runs at http://localhost:3000.

Other scripts:

```bash
npm run build   # production build
npm start       # serve the production build
npm run lint    # eslint
```

## Structure

It's a single scrolling page. Every nav item is an anchor into a section of `src/app/page.tsx` rather than a separate route, so visitors never have to click through to see everything:

| Section id | Component |
| --- | --- |
| `#top` | `components/Hero.tsx` |
| `#about` | `components/sections/AboutSection.tsx` (bio + skills) |
| `#experience` | `components/sections/ExperienceSection.tsx` (timeline) |
| `#projects` | `components/sections/ProjectsSection.tsx` |
| `#blogs` | `components/sections/BlogsSection.tsx` |
| `#contact` | `components/sections/ContactSection.tsx` |

The navbar highlights whichever section is crossing the middle of the viewport. To add or reorder items, edit `navLinks` in `src/lib/site-config.ts` — the ids must match.

## Where to edit things

Almost everything you'll want to change lives in two files.

| File | What it controls |
| --- | --- |
| `src/lib/site-config.ts` | Name, roles in the animated tagline, intro paragraph, email, résumé link, social URLs, nav items |
| `src/lib/content.ts` | About bio, skills and tools, work history timeline |
| `content/projects/*.json` | One file per project (copy `_template.json`) |
| `content/blogs/*.json` | One file per Medium link (copy `_template.json`) |

Bio, skills and timeline are real. Projects and blogs are auto-loaded from those folders - see the README inside each folder for the template.

Files named `schema.json` or starting with `_` (like `_template.json`) are ignored. Every other `*.json` becomes a card. Keep `"$schema": "./schema.json"` for editor validation.

### Images

| File | Used by |
| --- | --- |
| `public/images/aman-portrait.png` | Hero portrait (generated) |
| `public/images/aman-mittal.png` | Original photo, kept as the source for the crop |
| `public/images/am-monogram.png` | Navbar mark |
| `public/images/signature.png` | Footer |

The hero portrait has no frame, mask or vignette. It works because the page background is pure `#000000` and the photo was shot against a black backdrop, so the image's rectangle is genuinely invisible - the subject appears to stand directly on the page.

That only holds if the photo's black is *exactly* black, which is what `scripts/prepare-portrait.mjs` guarantees. It crops the source around the subject, pads it out to a clean 4:5 frame with true black, and crushes any near-black noise to `#000`. If you replace the photo, update the measured `SUBJECT` bounds at the top of that script and re-run it:

```bash
node scripts/prepare-portrait.mjs
```

A photo with a light or busy background won't blend this way - you'd need to cut the subject out to transparency instead.

The monogram and signature are white artwork on transparency, so they inherit the dark theme rather than sitting in a coloured box. Any replacement should also be white-on-transparent PNG or SVG.

### Projects

Drop one JSON file per project into `content/projects/`. Copy `_template.json`, rename it (no leading `_`), fill it in, and put the cover image under `public/images/projects/`.

```json
{
  "$schema": "./schema.json",
  "name": "SupplyMindIQ",
  "tagline": "Your Supply Chain, With a Brain.",
  "description": "Two or three sentences about what it does and why it exists.",
  "image": "/images/projects/supplymindiq.png",
  "repo": "https://github.com/mittal-aman00/SupplyMindIQ",
  "demo": "https://supply-mind-iq.vercel.app",
  "tags": ["LangGraph", "FastAPI", "React"],
  "featured": true
}
```

| Field | Required | Notes |
| --- | --- | --- |
| `name` | yes | Card heading |
| `description` | yes | Body copy; two to three sentences reads best |
| `image` | yes | Path under `public/`. Drop the file in `public/images/projects/` and reference it as `/images/projects/<file>`. Landscape 16:9 |
| `repo` | yes | Full GitHub URL |
| `tagline` | no | One-liner under the title, in accent colour |
| `demo` | no | Live deployment link. Omit it and the button disappears |
| `tags` | no | Technology chips |
| `featured` | no | Featured projects are listed first |

### Blog posts

Blogs live on Medium; this site only links to them. Drop one JSON file per article into `content/blogs/` (copy `_template.json`, rename without the `_`).

```json
{
  "$schema": "./schema.json",
  "title": "Your article title",
  "url": "https://medium.com/@you/your-article-abc123",
  "date": "2026-07-14",
  "excerpt": "A sentence or two that shows on the card.",
  "tags": ["SAP", "AI"],
  "readingTime": "6 min read"
}
```

`title`, `url`, `date` and `excerpt` are required; `tags` and `readingTime` are optional. Cards sort newest-first automatically.

### Work history timeline

`timeline` in `src/lib/content.ts`. Each entry needs `start` and `end` as `"YYYY"` or `"YYYY-MM"`; use `"present"` as the `end` of your current role to get the live pulse marker.

Entries are sorted chronologically and laid out in percentages of the container, so the whole history always fits on screen without sideways scrolling — adding roles compresses the axis rather than widening it. Below `lg` the timeline becomes a vertical list.

Each role gets its own colour from `PALETTE` in `src/components/Timeline.tsx`, handed out newest-first so your current position always wears the site's gold accent and earlier roles cool off through teal, indigo and orchid. The bar, its glow, the connector line and the date label all share that colour, and the rail underneath picks up a faint wash of the whole sequence. The palette cycles if you have more roles than colours, so add entries to it rather than letting two adjacent roles repeat.

Cards alternate above and below the rail. Where two roles start too close together for that to work, one is pushed out to a second lane further from the rail and the track grows taller, rather than letting the cards overlap. Slots are claimed newest-first, so your current role always keeps the position nearest the rail and short older stints are the ones that get pushed out.

One entry per employer reads best. Promotions inside a company are better described in that entry's `summary` than split into separate bars, since overlapping LinkedIn dates would otherwise draw as overlapping bars on the rail.

### Contact form

Uses EmailJS entirely client-side, so there's no server to run. Copy `.env.local.example` to `.env.local` and fill in the three `NEXT_PUBLIC_EMAILJS_*` values from your EmailJS dashboard.

Your template needs to reference `{{from_name}}`, `{{from_email}}` and `{{message}}` — these match the input `name` attributes in `src/components/ContactForm.tsx`. Without the keys the form shows a friendly error pointing at your email address instead.

## Theme

Colours are CSS custom properties at the top of `src/app/globals.css` and exposed to Tailwind through `@theme inline`. Change `--accent` in one place to re-tint the whole site.

Fonts are Space Grotesk (headings, `font-display`) and Inter (body), loaded via `next/font`.

## Deploying

Vercel is the path of least resistance: import the repo, add the three `NEXT_PUBLIC_EMAILJS_*` environment variables, and point `amanmittal.xyz` at the deployment.
