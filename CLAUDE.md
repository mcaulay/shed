# Shed Industries site

Static HTML/CSS, no build step. Deployed to shed.io via GitHub Pages — push with
`git push origin main:master`. Dev preview runs via `.claude/launch.json`
("shed-industries-site", serve.py, autoPort).

Design system: Switzer typeface, 9px spacing grid, flat full-bleed dark bands,
`.v2-` prefixed CSS classes in `style.css`. Accent color `#FF4B32`, dark band
color `#141412`, off-white `#F8F7F4`.

## Adding a new journal article

1. Write the article page under `journal/<slug>/index.html` following the
   `.v2-article` pattern used by existing articles.
2. Add its card to `journal/index.html` (`.v2-journal-card`, with a real
   category label in `.v2-journal-meta`, e.g. "Brand Strategy · July 2026").
3. Add the URL to `sitemap.xml`.
4. Add it to `llms.txt` under `## Journal`, newest first, with a one-sentence
   description matching the existing entries' style.
5. **Update the "From the journal" list on the home page** (`index.html`,
   `.v2-latest-journal-list`, between the "What we'll do for you" link and
   the closing ship image). It shows the 4 most recent articles, newest
   first — add the new one at the top and drop the oldest of the 4. Each
   item needs the thumbnail image (wrapped in `.v2-latest-journal-thumb-wrap`
   so all thumbs stay a fixed 108×108px regardless of title length), category
   label, title, and "By [author]".
6. **Create a branded OG share image — don't skip this.** Every article needs
   its own 1200×630 share card, not just the raw header photo. Process:
   - Composite it from the article's own header image: dark scrim gradient,
     the site logo (top-left), an orange uppercase category label, and a bold
     white headline — same look as the existing cards in `images/og/`.
   - Render at exact pixel size with headless Chrome rather than a browser
     screenshot (avoids viewport/DPI distortion):
     `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --screenshot=out.png --window-size=1200,630 file:///path/to/mockup.html`
   - Save the result to `images/og/<slug>-og.jpg` (convert PNG→JPEG with
     `sips -s format jpeg -s formatOptions 85`).
   - Point the new article's `og:image` meta AND the JSON-LD `"image"` field
     at it, and add `og:image:width` / `og:image:height` (1200/630) — these
     are easy to forget and were previously missing on every article.
   - Delete any temporary mockup/template HTML files from the site directory
     before committing — they're build scratch, not shippable content.
7. **Review internal linking, both directions.** Read the new article's body
   copy for phrases that naturally match an existing work sub-page
   (`/brand-strategy/market-research/`, `/brand-strategy/competitor-analysis/`,
   `/brand-strategy/messaging/`, `/brand-strategy/brand-roadmap/`) or another article, and link
   them. Then check existing articles for copy that could now link to this
   new one. Prefer linking exact phrasing already on the page over rewording
   a sentence to force a link — only reword when the underlying idea is
   there but the wording is awkward as an anchor. Avoid stacking more than
   about two links to the same target within one article.

## Adding a new work sub-page

Follow the same `.v2-article`-adjacent pattern as the other four pillar pages
under `/brand-strategy/`, add it to the rail nav (`.v2-rail-list`) on the other three
pillar pages and to `work/index.html`, and add the URL to `sitemap.xml`.
Also do the internal linking review described in step 7 above — check its
copy for links to the other pillars, and check existing journal articles for
copy that could now link to it.
