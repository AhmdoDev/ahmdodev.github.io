# ahmdo.github.io

A personal portfolio site — plain HTML/CSS/JS, no build step, no framework, no dependencies. That's a deliberate choice: it deploys to GitHub Pages instantly and loads fast.

## Structure

```
index.html   → markup for every section
style.css    → design system (tokens at the top) + all styling
data.js      → projects / experiments / tech stack / social links — edit this to update content
script.js    → nav, scroll reveal, terminal animation, easter egg
```

## Editing content

Almost everything you'll want to change lives in **`data.js`**:

- `projects` — add a new object to the array to add a project card. Leave `github`/`demo` empty to show "no public repo yet" instead of a dead link.
- `experiments` — grouped lists in the "Experiments & rabbit holes" section.
- `stack` — grouped tool/technology pills.
- `SITE.email` — set to your real email to enable the "Email" buttons (`mailto:`). Left as `null`, they point to GitHub instead, so you never accidentally expose an address.

## Running locally

No build step needed — just serve the folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploying to GitHub Pages

1. Push this repo's contents to the root of `ahmdo/ahmdo.github.io` on the `main` branch (this is a **user site**, so Pages serves straight from the root — no `/docs` folder or build step required).
2. In the repo, go to **Settings → Pages** and confirm the source is `main` / `/ (root)`.
3. The site will be live at `https://ahmdo.github.io` within a minute or two of the push.

Because there's no framework, there's no asset-path or SPA-routing gotcha to worry about — everything is already relative to the root.

## Notes on content honesty

Per the brief, nothing here invents jobs, companies, awards, GitHub stats, or finished products that don't exist. The four projects are presented as `CONCEPT`/`EXPERIMENT` status — update their `status`, `github`, and `demo` fields in `data.js` as they actually progress. The "Currently learning" rotator, timeline, and "Now" cards are all plain content blocks you can hand-edit in `index.html`/`data.js` as things change — no CMS, no magic.

## What wasn't wired up (needs your input)

- **GitHub API integration** (section 12 of the brief): pulling live repo data requires the site to fetch `api.github.com` at runtime, which needs no auth for public read access but is easy to rate-limit. It's not wired in yet — the `projects` array in `data.js` is the static fallback. If you want it, add a small `fetch('https://api.github.com/users/ahmdo/repos?sort=updated')` call in `script.js` that renders into `projectsGrid` (or a new "Open source & code" section), with the current static cards kept as the graceful fallback on failure/rate-limit.
- **Email address** — left unset (`SITE.email = null`) since none was provided.
- **OG image** (`og-image.png`) referenced in the meta tags — add a real one at the site root, or remove the tag.
- **Favicon** — currently a tiny inline SVG placeholder; swap in a real one if you want something more distinctive.
