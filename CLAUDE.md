# Circuito Car Blog — Claude working guide

## Critical deploy rule — read first

**Never edit root HTML files.** The files at the repo root (`index.html`, `artigos.html`, `simulador_isv.html`, etc.) are build output. The GitHub Actions workflow runs `npm run build` and then wipes and regenerates every HTML file on every push. Any manual edit to root HTML will be lost on the next push.

**Always edit source files in `src/`.**

Before pushing, always pull first — GitHub Actions auto-commits the build output, so the remote is usually ahead:
```
git pull origin main --no-rebase
git push origin main
```

## Project structure

```
src/
  _data/site.js          ← site-wide variables: URL, contacts, mainSite, address
  _includes/
    base-cc.njk          ← base layout (homepage + artigos)
    article-cc.njk       ← article layout (all blog posts)
    article-share.njk    ← share bar component
    google-tag.njk       ← analytics
  css/
    circuito-car-tokens.css  ← design tokens (colors, type, spacing)
    article-cc.css           ← article + simulator shared styles
  assets/
    lucide.min.js        ← icon library
  img/                   ← static images
  *.njk                  ← page templates (homepage, artigos, simulators)
  *.md                   ← blog articles (Markdown + front matter)
_site/                   ← build output (never edit)
```

## Adding a new article

1. Create `src/your-slug.md` with this front matter:

```yaml
---
layout: article-cc.njk
permalink: your-slug.html
tags: article
date: YYYY-MM-DD

pageTitle: "SEO title | Circuito Car Blog"
title: "H1 title"
description: "Meta description"
ogTitle: "OG title"
ogDescription: "OG description"

category: "Guia de Compra"    ← MUST be one of the exact values listed below
readTime: "6 min de leitura"
utmCampaign: "blog_slug"

lead: "Lead paragraph shown in hero."
heroImage: "https://..."     ← use a REAL recent car from circuitocar.pt; verify URL returns 200
heroImageLink: "https://www.circuitocar.pt/viatura/<slug>-ID<id>.html"
heroImageAlt: "Alt text"
heroWhatsappMsg: "Pre-filled WhatsApp message from hero button."

# Sidebar stock CTA card (optional but recommended — drives clicks to inventory)
inventoryUrl: "https://www.circuitocar.pt/viaturas"   ← base URL; template adds UTM (handles ?/& automatically)
inventoryLabel: "Ver stock disponível"

sidebarBadge: "Ferramenta útil"
sidebarTitle: "Sidebar card title"
sidebarDescription: "Sidebar card description."
sidebarWhatsappMsg: "Pre-filled WhatsApp message from sidebar."

relatedArticles:
  - title: "Related article title"
    url: "related-slug.html"     ← must be an existing .html, not a simulator/typo

andreDescription: "What André handles for this article."
filipeDescription: "What Filipe handles for this article."

footerNote: "Stand em Joane, Vila Nova de Famalicão · circuitocar.pt"

# Optional: featured: true  ← see "Homepage featured logic" below. Leave UNSET for normal articles.

# Optional: inject extra JSON-LD (e.g. FAQPage) into <head>
schemaOrg: |
  <script type="application/ld+json">
  { "@context": "https://schema.org", "@type": "FAQPage", ... }
  </script>
---
```

2. Write the article body in Markdown below the `---`.
3. Run `npm run build` locally to verify — it will warn if front matter keys are missing.
4. The article appears automatically in `artigos.html` under its category — no manual list update needed.

### Valid categories (MUST match exactly — defined in `src/artigos.njk`)

A typo or new value creates an empty/missing section. Pick one of:

`Importação` · `Atualidade` · `Guia de Compra` · `Desportivos` · `Guia Local` · `Híbridos`

To add a NEW category, you must also add it to the `categories` array in `src/artigos.njk` (with a matching `id`), and ideally a card in the homepage `#categorias` section.

### Writing style — ALWAYS formal "você" (northern PT register)

The whole site uses formal European Portuguese. Conjugate for "você", never "tu":
- ✅ `o seu carro`, `pode`, `vê`, `faz`, `indique-nos`, `quando estiver pronto`
- ❌ `o teu carro`, `podes`, `vês`, `fazes`, `dá-nos`, `quando estiveres pronto`

### Body content rules

- **Contact CTA**: never hardcode André/Filipe call/WhatsApp buttons in the body. Use a single button linking to the contact card:
  ```html
  <a class="cc-btn cc-btn--yellow" href="#equipa"><i data-lucide="message-square"></i>Falar com a equipa</a>
  ```
  `#equipa` is the contact card (Marco is the primary contact). It lives on the contact `cc-side-card`, NOT the sidebar wrapper.
- **Funnel CTA**: link to the relevant simulator (`/simulador_retoma.html`, `/circuitocar_simulador_credito.html`, `/simulador_isv.html`) where it fits the topic.

### Homepage featured logic (important — controls the hero)

`src/index.njk` hero (right column) and the lead article both come from collections in `.eleventy.js`:
- `featuredArticle` = the article with `featured: true`, **or** the newest by `date` if none is set.
- `homeArticles` = up to 4 most-recent articles **excluding** the featured one.
- The homepage hero shows `featuredArticle`; the "Artigos" section leads with `homeArticles[0]` (so the featured one is not duplicated).

Consequences when adding an article:
- A new article with today's `date` and no `featured` flag **automatically becomes the hero** — usually what you want.
- Only ONE article should ever have `featured: true`. If an old one has it set, the newest won't take the hero. Remove the stale flag if you want newest-wins behaviour.

### After pushing — deploy timing

GitHub Actions builds + deploys in ~2 min. Until it finishes the new URL returns **404** even though the source is committed. Don't panic-debug a fresh 404 — wait, then re-check. `git pull --no-rebase` before push (Actions auto-commits the build).

## Adding a new tool/simulator

1. Create `src/tool-name.njk` as a standalone HTML page (see `simulador_isv.njk` as the reference).
   - Use `base-cc.njk` only if it's a simple page; complex tools are self-contained like the ISV simulator.
   - Include the font preload pattern:
     ```html
     <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?..." />
     <link rel="stylesheet" href="https://fonts.googleapis.com/css2?..." />
     ```

2. Add a tool card to the homepage `#ferramentas` section in `src/index.njk`.

3. Add a footer link in both `src/_includes/base-cc.njk` and `src/_includes/article-cc.njk` (Contacto column).

4. Add the tool to the mobile dock in both templates (`cc-mobile-dock` nav).

5. Run `npm run build` and verify before pushing.

## Key site.js variables

```javascript
site.url          // "https://circuitocar.blog"
site.basePath     // "" (empty — no subdirectory)
site.mainSite     // "https://www.circuitocar.pt"
site.contact.marco.phone / .whatsappBase
site.contact.andre.phone / .whatsappBase
site.contact.filipe.phone / .whatsappBase
site.address.street / .zip / .city / .region
```

## Quality checklist before shipping

- [ ] Run `npm run build` — zero errors
- [ ] All buttons `min-height: 44px` (WCAG 2.5.5 touch target)
- [ ] Form inputs have `aria-describedby` pointing to their `<small>` hint IDs
- [ ] Required inputs have `aria-required="true"`
- [ ] Dynamic content regions have `aria-live` (`polite` for results, `assertive` for errors)
- [ ] Validation errors set `aria-invalid="true"` on the offending field and focus it
- [ ] New nav items get `aria-current="page"` when URL matches
- [ ] Images have meaningful `alt` text
- [ ] `git pull origin main --no-rebase` before `git push`

## What went wrong in the first session (don't repeat)

- Spent time editing root HTML files (`index.html`, `simulador_isv.html`) — all lost on next push because the deploy workflow regenerates them. The source of truth is always `src/`.
- Pushed without pulling first — rejected because GitHub Actions had auto-committed build output. Always pull before push.
- Added the ISV simulator to the homepage `index.html` directly instead of `src/index.njk` — changes vanished after next build.

## What went wrong in the retoma-article session (don't repeat)

- Reported a 404 as a bug when the article was simply mid-deploy. A fresh push 404s for ~2 min — verify the source is committed, then wait and re-check before debugging.
- Stock CTA URL came out malformed (`/viaturas&utm_source=...`). The template now picks `?` vs `&` automatically based on whether `inventoryUrl` already has a query string — keep `inventoryUrl` as a clean base URL.
- Confused "article not on the blog" with "article not in the big hero". A new article shows in the hero only if it's the `featuredArticle` (see Homepage featured logic). An old article had a stale `featured: true` pinning the hero — removed it so newest wins.
- `grep` on root HTML showed stale output because local `npm run build` writes to `_site/`, while GitHub Actions writes to root. To verify a local build, grep `_site/`, not the root HTML files.
