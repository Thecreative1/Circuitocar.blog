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
    reviews-cc.njk       ← reusable reviews/testimonials block (cities + avaliacoes)
    google-tag.njk       ← Google Analytics + cookie-consent banner (consent-gated)
  css/
    circuito-car-tokens.css  ← design tokens (colors, type, spacing)
    article-cc.css           ← article + simulator shared styles
  assets/
    lucide.min.js        ← icon library
  img/                   ← static images
  _data/cities.js        ← city data for programmatic local SEO pages
  _data/stock.json       ← homepage "stock em destaque" cards (curated manually)
  _data/reviews.js       ← customer reviews (Google) for the reviews block
  *.njk                  ← page templates (homepage, artigos, simulators, city pages)
  cidade-carros-usados.njk ← pagination template → /carros-usados-{slug}.html (12 cities)
  avaliacoes.njk         ← dedicated reviews page → /avaliacoes.html
  privacidade.njk        ← privacy policy (RGPD) → /privacidade.html
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
heroImageLink: "https://www.circuitocar.pt/viatura/<slug>-ID<id>.html"   ← CLEAN base URL, NO UTM; template adds UTM (handles ?/& automatically)
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

# FAQPage JSON-LD — RECOMMENDED for every content article (helps rich results in Google)
# 3-5 Q&As. Questions must match real search queries. Answers factual, no marketing spin.
# Do NOT add AggregateRating/Review schema — self-serving review markup violates Google policy.
schemaOrg: |
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Question text matching a real search query?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Factual answer, 2-4 sentences. No em dashes. Formal PT (você)."
        }
      }
    ]
  }
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

**Spelling: Acordo Ortográfico de 1990 (AO90), always.** A full sweep was done 2026-07-12 — don't reintroduce pre-AO forms (they appear in body text, front matter AND FAQPage JSON-LD):
- ✅ `inspeção`, `exato`, `correto`, `atual`, `fatura`, `projeto`, `reação`, `elétrico`
- ❌ `inspecção`, `exacto`, `correcto`, `actual`, `factura`, `projecto`, `reacção`, `eléctrico`
- Note: `contacto` and `facto` are still correct in PT-PT — do NOT "fix" those.

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

### Homepage hero — featured-article card (`.cc-hero__feat`)

The hero right column is an **editorial card of the featured article** (not a stock car — this is a blog). It reuses `.cc-hero__car` styling plus a `.cc-hero__feat` modifier:
- The card is **landscape `4/3`** (`16/11` on mobile). Hero photos from the inventory are landscape — a portrait card crops the car badly. Keep landscape, and tune `background-position` (currently `center 42%`) if a new photo sits high/low.
- Pulls `featured.data.heroImage`, `.category`, `.title`, `.readTime`; CTA is a yellow "Ler artigo →" pill (`.cc-hero__feat-cta`).
- A stronger gradient keeps the title readable over any photo.
- Lead-gen is preserved by the "Ver stock" hero button + the "Stock em destaque" section below — the hero itself stays content-first.

### Hero button hierarchy

Three actions, clear visual priority (don't make them equal weight):
1. **Começar a ler** — primary, `cc-btn cc-btn--yellow cc-btn--xl` (largest, glowing).
2. **Simuladores gratuitos** — secondary, `cc-btn cc-btn--ghost-light` (regular size).
3. **Ver stock** — tertiary, `cc-btn cc-btn--ghost-light`.

### Verifying a visual change before pushing

`npm run build` writes to `_site/`. To eyeball a layout change, serve `_site/` and screenshot — relative `/css` and `/img` paths only resolve over HTTP, not `file://`:
```
npx http-server _site -p 8199 -s
# then Playwright: goto http://127.0.0.1:8199/ , screenshot (optionally .locator('.cc-hero__feat'))
```
Clean up temp `.cjs`/`.png` files and kill the server afterwards.

### After pushing — deploy timing

GitHub Actions builds + deploys in ~2 min. Until it finishes the new URL returns **404** even though the source is committed. Don't panic-debug a fresh 404 — wait, then re-check. `git pull --no-rebase` before push (Actions auto-commits the build).

## Local SEO — programmatic city pages

City landing pages live in **one template + one data file** — never create individual files per city.

| File | Role |
|------|------|
| `src/_data/cities.js` | Array of city objects (name, slug, distanceKm, driveMin, demonym, blurb, …) |
| `src/cidade-carros-usados.njk` | Eleventy pagination template → generates one page per city |

**Generated URLs:** `/carros-usados-braga.html`, `/carros-usados-guimaraes.html`, … (12 cities total)

### Critical: tags + category are mandatory

Every city page **must** have these in the template front matter so pages appear in `artigos.html` under the correct section:

```yaml
tags: article
category: "Guia Local"
date: 2026-01-15       # past date — prevents hijacking the homepage hero
readTime: "5 min de leitura"
```

Without `tags: article` the pages are invisible to all collections. Without `category: "Guia Local"` they won't appear under any section in artigos. This was missed in the first attempt.

### Adding a new city

Add one object to `src/_data/cities.js`:

```js
{
  name: "Cidade",
  slug: "cidade",           // used in permalink + UTM
  district: "Braga",
  region: "Minho",
  distanceKm: 25,
  driveMin: 28,
  demonym: "cidadense",     // e.g. "clientes cidadenses"
  blurb: "One sentence about the city and why buyers come from there."
}
```

Run `npm run build` — the new page is generated automatically. No other files to touch.

### Schema on city pages

Each page emits two JSON-LD blocks (injected via `schemaOrg` in the template):
- `AutoDealer` with `areaServed: { @type: City, name: city.name }`
- `FAQPage` with 3 city-specific Q&As (distance, delivery, financing)

Both are in `src/cidade-carros-usados.njk` — edit there to change schema structure across all cities at once.

## Stock em destaque (homepage)

The 4 cars in the homepage "Viaturas em destaque" section are **curated manually** in `src/_data/stock.json` — they are NOT pulled live from circuitocar.pt. `src/index.njk` renders them with `{% for car in stock %}` (the grid is 4 columns → keep exactly 4 entries).

### How to update it

1. Open **circuitocar.pt/viaturas** and pick cars that present well — **low mileage, recent, varied** (mix of price points, body types, fuel). The homepage is a first-impression trust surface.
2. Replace the entries in `src/_data/stock.json`. Each car uses these exact fields:

```json
{
  "eyebrow": "Baixa km",        // small label: "Baixa km" / "SUV familiar" / "Elétrico" / "Premium"
  "title": "Citroën C3 1.2 PureTech Shine",
  "year": "2022",
  "fuel": "Gasolina",           // Gasolina / Gasóleo / Elétrico / Híbrido
  "km": "23.185 Km",            // PT format: dot thousands + " Km"
  "price": "12.495€",           // PT format: dot thousands + "€"
  "image": "https://omeustand.pt/viaturas/224/<photoid>_omeustand_foto.webp",
  "url": "https://www.circuitocar.pt/viatura/<slug>-ID<id>.html?utm_source=blog&utm_medium=stock_grid&utm_campaign=homepage"
}
```

3. `npm run build` and check the homepage.

### Rules / gotchas

- **It goes stale.** Because it's hardcoded, sold cars keep showing. Refresh periodically and confirm each `url` still resolves (not a 404/sold car).
- **Keep the featured set low-km and presentable.** No 200k+ km cars in the *destaque* — it contradicts "carros verificados" and kills trust (see what-went-wrong below).
- Keep the `url` UTM suffix (`?utm_source=blog&utm_medium=stock_grid&utm_campaign=homepage`).
- `image` comes from `omeustand.pt` (inventory CDN) — grab the real photo URL from the car's page.
- The blog **cannot edit circuitocar.pt** — it can only read it. `stock.json` is the blog's own curated copy.

## Avaliações (reviews)

Customer reviews live in `src/_data/reviews.js` and render via the reusable include `src/_includes/reviews-cc.njk`.

- Shown on **every city page** (limited to 3 + "Ver todas") and on the **dedicated page** `/avaliacoes.html` (all of them).
- To add/edit: update the `items` array in `reviews.js` (`name`, `rating`, `text`) and `googleUrl`.
- The include accepts `reviewsLimit` (number) and `reviewsHeading` (string), set with `{% set %}` before `{% include "reviews-cc.njk" %}`.
- Stars are lucide SVGs styled in `article-cc.css` (`.cc-review__stars svg`) — so any page showing reviews needs `extraCss: article-cc.css`.
- **Do NOT add `AggregateRating`/`Review` schema** to these — self-serving review markup violates Google's rules and risks a penalty. Display visually only, and don't invent an aggregate score.

## Privacidade e consentimento de cookies (RGPD)

The blog is its own web property: it collects data (simulators) and runs its own Google Analytics, so it has its own RGPD duties — independent of circuitocar.pt.

- **Privacy policy:** `src/privacidade.njk` → `/privacidade.html`, linked in the footer of every page. Uses `base-cc.njk` + `extraCss: article-cc.css`.
- **Cookie consent:** lives entirely in `src/_includes/google-tag.njk` (included by every layout + the 3 simulators). Google Analytics is **consent-gated** — it does NOT load until the visitor clicks "Aceitar"; "Recusar" must stay equally easy.
  - Choice stored in `localStorage` key `cc_cookie_consent` (`granted`/`denied`).
  - The privacy page has a "Repor preferências de cookies" button (`onclick="ccOpenCookieSettings()"`) to withdraw consent.
- **Any new third-party script that sets cookies** (maps embed, pixel, chat widget) MUST also be gated behind consent in `google-tag.njk` — never load it unconditionally.
- Legal identification (razão social, NIF, Livro de Reclamações, RAL) belongs to the **stand / circuitocar.pt** (the point of sale), not the blog. Add to the blog only if the stand provides the data.

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
- [ ] New article has FAQPage JSON-LD schema in `schemaOrg:` (see template above — 3-5 Q&As, factual, no self-promotion)
- [ ] `git pull origin main --no-rebase` before `git push`

## Articles currently live (do not duplicate)

As of 2026-07-09. All in `src/*.md`, `tags: article`. Check this list before creating new content.

| Article slug | Category | FAQPage? |
|---|---|---|
| `financiamento-carro-usado-portugal` | Guia de Compra | ✓ |
| `iuc-carros-usados-portugal` | Guia de Compra | — |
| `garantia-carro-usado-portugal` | Guia de Compra | — |
| `como-funciona-retoma-carro-usado` | Guia de Compra | — |
| `checklist-comprar-carro-usado-antes-visita` | Guia de Compra | ✓ |
| `diesel-ou-gasolina-carro-usado-2026` | Guia de Compra | ✓ |
| `carros-automaticos-usados-vantagens-riscos` | Guia de Compra | ✓ |
| `os-pontos-que-mais-pesam-na-escolha-de-um-carro-para-familia` | Guia de Compra | ✓ |
| `importar-carro-usado-portugal` | Importação | ✓ |
| `quanto-custa-importar-carro-usado-portugal` | Importação | ✓ |
| `tabela-isv-2026-portugal` | Importação | ✓ |
| `vale-a-pena-comprar-hibrido-usado-2026` | Híbridos | — |
| `onde-comprar-carro-usado-famalicao` | Guia Local | — |
| `guerra-irao-impacto-escolha-carro-usado` | Atualidade | — |
| `opel-gt-roadster-usado-2009` | Desportivos | — |

City pages (12, generated): braga, guimaraes, barcelos, famalicao, santo-tirso, trofa, povoa-de-varzim, vila-do-conde, felgueiras, fafe, vizela, amarante, porto. **Never create individual city `.md` files** — add to `src/_data/cities.js` only.

## Tools/simulators live

| URL | Source |
|---|---|
| `/simulador_isv.html` | `src/simulador_isv.njk` |
| `/simulador_retoma.html` | `src/simulador_retoma.njk` |
| `/circuitocar_simulador_credito.html` | `src/circuitocar_simulador_credito.njk` |
| `/custo-mensal-carro.html` | `src/custo-mensal-carro.njk` |

All four already have full ARIA (live regions, aria-required, aria-describedby, aria-invalid) and the Google Fonts preload block. Don't add these again.

The custo-mensal calculator (added 2026-07-09) sums prestação + combustível/energia + IUC + seguro + manutenção. Its IUC logic is an indicative Cat B estimate (post-July-2007 cars, NEDC vs WLTP inferred from ano de matrícula ≥ 2019). It has its own FAQ section + FAQPage/WebApplication JSON-LD. It occupies the 4th homepage tool card (2×2 grid) and its own mobile dock uses a "Custo/mês" slot in place of ISV/Retoma.

## Quality passes already done (don't redo)

**`/impeccable` full pass (2026-06-15):** touch targets 44px, font preloads, ARIA live regions on all simulators, aria-required + aria-describedby + aria-invalid on all simulator inputs, aria-current on nav, overflow-wrap: break-word on .cc-prose, will-change: transform on .cc-header. Simulator copy clarified (cilindrada/CO₂/combustível hints). robots.txt sitemap URL corrected to circuitocar.blog domain.

**FAQPage schema (2026-07-09):** Added to 8 of 15 articles (see table above). Missing from: iuc, garantia, retoma, hibrido, famalicao, guerra-irao, opel-gt — add when touching those articles.

## What went wrong in the first session (don't repeat)

- Spent time editing root HTML files (`index.html`, `simulador_isv.html`) — all lost on next push because the deploy workflow regenerates them. The source of truth is always `src/`.
- Pushed without pulling first — rejected because GitHub Actions had auto-committed build output. Always pull before push.
- Added the ISV simulator to the homepage `index.html` directly instead of `src/index.njk` — changes vanished after next build.

## What went wrong in the retoma-article session (don't repeat)

- Reported a 404 as a bug when the article was simply mid-deploy. A fresh push 404s for ~2 min — verify the source is committed, then wait and re-check before debugging.
- Stock CTA URL came out malformed (`/viaturas&utm_source=...`). The template now picks `?` vs `&` automatically based on whether `inventoryUrl` already has a query string — keep `inventoryUrl` as a clean base URL.
- Confused "article not on the blog" with "article not in the big hero". A new article shows in the hero only if it's the `featuredArticle` (see Homepage featured logic). An old article had a stale `featured: true` pinning the hero — removed it so newest wins.
- `grep` on root HTML showed stale output because local `npm run build` writes to `_site/`, while GitHub Actions writes to root. To verify a local build, grep `_site/`, not the root HTML files.

## What went wrong in the local SEO session (don't repeat)

- Created city pages without `tags: article` and `category: "Guia Local"` — pages built fine but were completely invisible in `artigos.html` and all collections. Always set both when a page should appear in the blog index.

## What went wrong in the trust/stock session (don't repeat)

- Homepage "stock em destaque" was showing cars with 232.000 km and 272.000 km — a trust killer on the first scroll. The featured set in `src/_data/stock.json` must stay **low-km and presentable**, and it's curated manually so it goes stale — refresh periodically.
- Tried to "edit circuitocar.pt" — the blog has no access and it's managed by a third party. The blog can only **read** the .pt stock and mirror a curated selection into `stock.json`.
- A new `base-cc.njk` page (privacy) rendered with an **unstyled header/footer** because it was missing `extraCss: article-cc.css`. base-cc pages need that for the shared component styles (header, footer, dock, buttons, reviews).
- Lucide replaces `<i data-lucide>` with `<svg>`, so CSS targeting `i` does NOT style the icon — target `svg` (e.g. star `fill`), or both `i, svg`.
- New pages must be added to `src/sitemap.njk` if they aren't tagged `article` (the sitemap loops `collections.articles` + a few static entries). `avaliacoes.html` and `privacidade.html` were added manually there.

## What went wrong in the ISV/schema session (don't repeat)

Nothing broke — but document these patterns for future reference:

- **FAQPage schema goes in front matter `schemaOrg:` block** (YAML literal block scalar with `|`), NOT in the article body. The hook `{% if schemaOrg %}{{ schemaOrg | safe }}{% endif %}` in `article-cc.njk` injects it into `<head>`. Writing it in the body means it renders as visible text, not as JSON-LD.
- **YAML literal block scalar indentation:** the `<script>` tag and its contents must be indented by 2 spaces relative to `schemaOrg: |`. The closing `</script>` must also be indented. If indentation is wrong, Eleventy silently drops the block.
- **ISV table values are indicative** — the Código do ISV updates annually with Orçamento de Estado. Always note in articles that values are indicative and users should verify with AT or use the simulator.
- **New article with today's `date` auto-becomes the homepage hero.** If you don't want a new article to take the hero (e.g. a supplementary page like city guides or tool explainers), set `date:` to a past date — 2026-01-15 is the convention used for city pages.
- **`relatedArticles` URLs must be existing `.html` filenames** — not slugs, not simulator paths. If the article doesn't exist yet, don't link to it.

## What went wrong before the audit session (2026-07-12) (don't repeat)

A full site audit (build, internal links, JSON-LD, meta tags, sitemap, external URLs, browser console, simulator math) found and fixed these — keep them fixed:

- **`heroImageLink` with UTM in front matter produced double-`?` URLs** (`...?utm_campaign=blog_iuc?utm_source=...`) on 7 articles, breaking GA campaign tracking. The templates (`article-cc.njk` and legacy `article.njk`) now pick `?` vs `&` automatically — same pattern as `inventoryUrl`. Rule: **`heroImageLink` must always be a clean base URL with no query string**; the template appends `utm_source=blog&utm_medium=hero_image&utm_campaign={utmCampaign}`.
- **Pre-AO90 spellings** were scattered across 5 articles + 2 simulators, including inside FAQPage JSON-LD (Google shows that text in rich results). See the spelling rule in "Writing style" — new content must be AO90.
- **Meta descriptions must stay ≤165 chars** or Google truncates them (3 were trimmed: financiamento, opel-gt, quanto-custa-importar).
- **Page titles >65 chars were left as-is deliberately** — the `| Circuito Car Blog` suffix pushes most over, Google just truncates the display, and retitling already-indexed pages risks rankings. Don't "fix" them.
- Useful audit checks for the future (all passed 2026-07-12): every internal `href` resolves in `_site/`; every JSON-LD block parses; sitemap covers all HTML files with no orphans/duplicates; every `heroImage`/`heroImageLink`/`stock.json` URL returns 200 (sold cars = 404); zero console errors on homepage, artigos, article, all 4 tools, city page, privacidade; simulator outputs spot-checked against the fórmula.
