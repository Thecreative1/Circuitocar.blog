# PROJECT_GUIDE.md — Circuito Car Blog
### Source of truth for all current and future work on circuitocar.blog

> **Before making any change to this project — read this file first.**
> Do not redesign the site. Do not change the contact logic. Do not change the article structure. Follow everything documented here unless the client has explicitly requested a change.

---

## Table of Contents

1. [Project Identity](#1-project-identity)
2. [Technical Stack](#2-technical-stack)
3. [File Structure](#3-file-structure)
4. [Design System](#4-design-system)
5. [Button and CTA Rules](#5-button-and-cta-rules)
6. [Contact Structure](#6-contact-structure)
7. [Layout System](#7-layout-system)
8. [Article Structure and Workflow](#8-article-structure-and-workflow)
9. [Article Frontmatter Reference](#9-article-frontmatter-reference)
10. [Article Categories](#10-article-categories)
11. [Approved SEO Rules](#11-approved-seo-rules)
12. [Content Tone Rules](#12-content-tone-rules)
13. [Simulator Pages](#13-simulator-pages)
14. [Navigation and Internal Links](#14-navigation-and-internal-links)
15. [Deployment](#15-deployment)
16. [Rules for Future AI / Codex Sessions](#16-rules-for-future-ai--codex-sessions)

---

## 1. Project Identity

| Field | Value |
|---|---|
| **Site name** | Circuito Car Blog |
| **Live URL** | https://circuitocar.blog |
| **Main site** | https://www.circuitocar.pt |
| **Business** | Stand automóvel — carros usados, Joane, Vila Nova de Famalicão |
| **Owner / designer** | Estúdio Flávio Martins (flavio.martins@gmail.com) |
| **GitHub repo** | thecreative1/Circuitocar.blog |

### Purpose

The blog serves four goals:

1. **Organic traffic** — SEO-focused articles about used cars, financing, retoma, and local market
2. **Lead generation** — WhatsApp and phone contacts surfaced throughout every page
3. **Stock visibility** — links to circuitocar.pt/viaturas with UTM tracking
4. **Tools / calculators** — financing simulator and retoma simulator as conversion aids

### Tone

- Portuguese from **Portugal** (not Brazilian)
- Professional, trustworthy, direct, helpful
- Commercial but not pushy
- No exaggerated promises, no guarantees of approval, no "best price guaranteed"
- Write for humans first, search engines second

---

## 2. Technical Stack

| Component | Details |
|---|---|
| **Static site generator** | Eleventy (11ty) v3.1.5 |
| **Templating** | Nunjucks (`.njk`) — markdown files also processed through Nunjucks |
| **CSS architecture** | Design tokens file + per-surface CSS + inline `<style>` blocks |
| **Hosting** | GitHub Pages |
| **CI/CD** | GitHub Actions — auto-deploys on push to `main` |
| **Fonts** | Saira Condensed (display/headings) + Manrope (body) — loaded via Google Fonts |
| **Icons** | Lucide Icons CDN (`https://unpkg.com/lucide@latest`) |

### Build commands

```bash
npm run build        # one-off build → _site/
npm run start        # build + watch + live server
npm run dev          # alias for start
npx @11ty/eleventy --quiet   # silent one-off build (used for CI checks)
```

Output directory: `_site/`
Input directory: `src/`

---

## 3. File Structure

```
circuitocar.blog/
├── src/
│   ├── _data/
│   │   └── site.js                    ← global site data (contacts, URLs, address)
│   ├── _includes/
│   │   ├── base-cc.njk                ← layout for homepage, tools, artigos
│   │   └── article-cc.njk             ← full-page template for individual articles
│   ├── css/
│   │   ├── circuito-car-tokens.css    ← design tokens (colours, type, spacing)
│   │   └── article-cc.css             ← shared styles for articles, tools, artigos
│   ├── img/
│   │   └── logo-yellow.png            ← primary logo
│   ├── admin/                         ← Decap CMS configuration
│   ├── index.njk                      ← homepage
│   ├── artigos.njk                    ← article archive (all articles)
│   ├── circuitocar_simulador_credito.njk
│   ├── simulador_retoma.njk
│   ├── sitemap.njk
│   ├── rss.njk
│   ├── robots.njk
│   └── [article-slug].md              ← individual articles (one .md per article)
├── .eleventy.js                       ← Eleventy config (collections, filters)
├── PROJECT_GUIDE.md                   ← THIS FILE — read before any change
├── PROJECT.md                         ← legacy project notes (partially outdated)
└── CLIENTE.md                         ← client CMS usage guide
```

### Key data file — `src/_data/site.js`

Contains all global data referenced in templates:
- `site.title`, `site.url`, `site.basePath`, `site.lang`
- `site.logo`, `site.mainSite`
- `site.contact.marco`, `site.contact.andre`, `site.contact.filipe`
- `site.address`

**Do not hardcode contact numbers or WhatsApp URLs in templates.** Always reference `{{ site.contact.marco.phone }}` etc.

---

## 4. Design System

### Colour palette

All values defined in `src/css/circuito-car-tokens.css`.

| Token | Hex | Role |
|---|---|---|
| `--cc-yellow` | `#FFFF00` | Primary brand accent — logo, CTA buttons, eyebrows |
| `--cc-yellow-hot` | `#FFE600` | Hover/active state of yellow |
| `--cc-yellow-deep` | `#E5CC00` | Yellow text on light backgrounds (AA contrast) |
| `--cc-yellow-tint` | `#FFFCD6` | Soft callout wash on light surfaces |
| `--cc-ink` | `#0A0B0D` | True dark background — hero sections, header, footer |
| `--cc-paper` | `#FAFAF7` | Page body background (light, slightly warm) |
| `--cc-paper-warm` | `#F4F2EA` | Section alternates (FAQ, callout backgrounds) |
| `--cc-paper-card` | `#FFFFFF` | Pure white card surfaces |
| `--cc-blue` | `#0D1F3C` | Brand navy — secondary identity colour |
| `--cc-blue-mid` | `#163560` | Hover/elevated navy variant |
| `--cc-blue-light` | `#1E4A8A` | Accent for contact badges, Marco's role tag |
| `--cc-border` | `#E8E6DE` | Card and section borders |
| `--cc-fg-muted` | `#4A4D55` | Secondary body text |
| `--cc-fg-subtle` | `#757882` | Hints, captions, meta |

### Typography

| Token | Value | Usage |
|---|---|---|
| `--cc-font-display` | Saira Condensed | All headings (H1–H3), eyebrows, buttons, nav |
| `--cc-font-body` | Manrope | Body text, labels, descriptions |
| Headings | Italic, uppercase, black weight (900) | H1 / H2 / H3 are italic + uppercase — do not remove |
| Body | Regular–semibold, sentence case | Paragraphs, field labels |

### Shape and spacing

- **Border radius:** Cards use `--cc-radius-lg` (14px). Buttons use `--cc-radius-sm` (4px). Badges use `--cc-radius-pill`.
- **Shadows:** Used sparingly. Cards have `--cc-shadow-md` on hover. No decorative drop shadows at rest.
- **Section rhythm:** Sections alternate between `--cc-ink` (dark) and `--cc-paper` / `--cc-paper-warm` (light). Never stack two dark or two warm sections consecutively without reason.
- **Max content width:** `1280px` with `32px` horizontal padding. Prose columns: `880px` max.
- **Grid gap:** `24px` standard. `40px` between main and sidebar.

### Component appearance

**Cards**
- `background: var(--cc-paper-card)`
- `border: 1px solid var(--cc-border)`
- `border-radius: var(--cc-radius-lg)` (14px)
- Hover: `transform: translateY(-3px)`, `border-color: var(--cc-blue-mid)`, `box-shadow: var(--cc-shadow-md)`
- Active link titles turn `var(--cc-yellow-deep)` on hover

**Sticky header** (`cc-header`)
- `background: color-mix(in srgb, var(--cc-ink) 84%, transparent)`
- `backdrop-filter: blur(12px) saturate(140%)`
- Position: sticky, top 0, z-index 50

**Topbar** (`cc-topbar`)
- `background: var(--cc-ink)` — solid dark strip above header
- Brand pill uses `--cc-yellow` text and animated pulsing dot

**Post hero sections** (`cc-post-hero`)
- Full-width dark band (`--cc-ink` background)
- White text, yellow eyebrow, yellow CTA
- Followed by a `cc-post-hero__chevron` decorative element

### Mobile behaviour

- Breakpoint `≤ 640px`: single column layout, panels stack vertically, `.cc-mobile-dock` appears (fixed bottom navigation)
- Breakpoint `≤ 1000px`: two-column grids collapse to single column
- Mobile dock has 5 items: Início, Blog, Crédito, Retoma, Contacto/Equipa
- Touch targets on WhatsApp and phone buttons must remain easy to tap (minimum 44px)

---

## 5. Button and CTA Rules

### Button classes (defined in `article-cc.css`)

| Class | Use |
|---|---|
| `.cc-btn--yellow` | **Primary CTA** — yellow background, dark text. Use for the single most important action per section |
| `.cc-btn--wa` | **WhatsApp button** — green background, dark text. Use ONLY when the action is a WhatsApp message |
| `.cc-btn--dark` | **Secondary action** — dark navy background, yellow/light text |
| `.cc-btn--ghost-dark` | **Tertiary action** — outlined on light surfaces |
| `.cc-btn--ghost-light` | **Tertiary action** — outlined on dark surfaces (heroes) |

### Hover states

- Yellow button hover: `color: var(--cc-blue-light)` + blue glow (`rgba(30,74,138,…)`)
- WhatsApp button hover: background flips to `var(--cc-blue)`, text/icon turns `--cc-yellow` + green outer glow
- **Never produce grey or unreadable text on hover.** All hover states must have strong contrast.

### CTA wording — approved copy

Public-facing CTAs must use the CircuitoCar brand, not Marco's name:

```
"Falar com a CircuitoCar"        ← primary WhatsApp/contact CTA
"Ligar para a CircuitoCar"       ← phone call CTA
"Contactar a CircuitoCar"        ← alternative contact CTA
"Pedir avaliação da viatura"
"Pedir ajuda para encontrar carro"
"Enviar dados da retoma"
"Ver todos os artigos"
"Ver viaturas disponíveis"
"Calcular estimativa"
"Simular crédito"
```

**Do not use as global CTAs:** `"Falar com Marco"`, `"WhatsApp Marco"`, `"Ligar Marco"` — Marco's name only appears in team/contact description text, never as the label of a main CTA button.

Avoid: `"Saber mais"`, `"Clique aqui"`, `"Mais informações"` — only use when no direct action is available.

### CTA hierarchy per page/section

1. **First CTA** — yellow (primary action)
2. **Second CTA** — ghost-light (dark surfaces) or ghost-dark (light surfaces)
3. **WhatsApp CTA** — always uses `.cc-btn--wa`

---

## 6. Contact Structure

### The three contacts

| Name | Role | Phone | WhatsApp URL |
|---|---|---|---|
| **Marco Marinho** | Contacto Principal / Atendimento ao cliente | +351 922 017 034 | https://wa.me/351922017034 |
| **André Silva** | Direção Comercial | +351 911 899 092 | https://wa.me/351911899092 |
| **Filipe Rodrigues** | Direção Técnica | +351 964 197 262 | https://wa.me/351964197262 |

### Rules

- **Marco is always the first and primary customer contact.** He handles general questions about viaturas, visits, financing, retoma, and any initial enquiry.
- **André and Filipe are owners/directors.** They appear as authority figures supporting trust. They are not the first point of contact for customers.
- **Never describe Marco as "empregado".** Use: "Contacto Principal", "Atendimento ao cliente", or "Apoio comercial".
- **All main CTAs (hero buttons, results buttons, primary WhatsApp actions) use Marco's number** (`wa.me/351922017034`).
- André and Filipe remain visible in sidebar contact cards, below a "Direção" divider.

### Public brand identity — critical rule

**The main public-facing contact identity is CircuitoCar, not Marco.**

Marco is the person behind the first response, but the customer is contacting the brand. CTA buttons must reflect this:

| Context | Correct | Avoid |
|---|---|---|
| Global WhatsApp CTA | `"Falar com a CircuitoCar"` | `"Falar com Marco"`, `"WhatsApp Marco"` |
| Global phone CTA | `"Ligar para a CircuitoCar"` | `"Ligar Marco"` |
| Team/contact description | "…o contacto principal é Marco Marinho" | (name in description is fine) |
| About/team section | "Marco Marinho · Apoio Comercial" | (name in team context is fine) |

### Approved Marco description (contact/team sections)

**Long version** (main contact section in index.njk, key contact pages):
> "Para informações sobre viaturas, marcações, financiamento, retomas ou acompanhamento inicial, o contacto principal é Marco Marinho. Caso o pedido precise de análise comercial ou técnica, será encaminhado para a pessoa certa da equipa CircuitoCar."

**Short version** (sidebars, simulator contact cards, article contact sidebar):
> "Marco Marinho acompanha o primeiro contacto com o cliente e encaminha cada pedido para a pessoa certa da equipa CircuitoCar sempre que necessário."

### Visual hierarchy in contact sections

```
[Marco — blue-accented card, border-top: 3px solid var(--cc-blue-light)]
  role badge: background var(--cc-blue-light), white text

— Direção —  (divider)

[André — standard card, yellow role badge]
[Filipe — standard card, yellow role badge]
```

### Correct WhatsApp link format

```
https://wa.me/351922017034?text=MESSAGE_URL_ENCODED&utm_source=blog&utm_medium=PLACEMENT&utm_campaign=UTM_CAMPAIGN
```

Always include UTM parameters on WhatsApp and stock links. Never hardcode phone numbers or WhatsApp URLs in templates — reference `site.contact.*` from `_data/site.js`.

### Internal contact anchor

The homepage contact section uses `id="contacto"`. From any other page on circuitocar.blog, the correct internal link is:

```
{{ site.basePath }}/#contacto
```

**Do not link to `https://www.circuitocar.pt/contactos` from within circuitocar.blog.** That sends users away from the blog domain.

---

## 7. Layout System

### Two layout types

#### `base-cc.njk` — homepage, tools, artigos

Used by: `index.njk`, `artigos.njk`, `circuitocar_simulador_credito.njk`, `simulador_retoma.njk`

Provides: topbar, sticky header, footer with 4-column grid, mobile dock, Lucide icons script.

Frontmatter slots:
- `extraCss` — loads an additional CSS file (e.g. `article-cc.css` for the artigos archive page)
- `inlineStyle` — embeds a `<style>` block in `<head>` for page-specific CSS
- `schemaOrg` — embeds raw JSON-LD in `<head>`

#### `article-cc.njk` — individual article pages

Used by: all `[article-slug].md` files

Provides: full page including topbar, sticky header, dark post hero, cover image, two-column layout (article prose + sidebar), related articles section, footer, mobile dock.

The sidebar contains three cards:
1. Warm callout card (`cc-side-card--warm`) — article-specific pitch (from frontmatter: `sidebarBadge`, `sidebarTitle`, `sidebarDescription`)
2. "Mais no blog" — related articles links (from frontmatter: `relatedArticles`)
3. Contact card — Marco (primary, blue accent), divider, André, Filipe

### URL structure

All pages use **flat URLs** at the root of the domain:

```
https://circuitocar.blog/opel-gt-roadster-usado-2009.html
https://circuitocar.blog/importar-carro-usado-portugal.html
https://circuitocar.blog/artigos.html
https://circuitocar.blog/circuitocar_simulador_credito.html
https://circuitocar.blog/simulador_retoma.html
```

**Do not use subdirectory permalinks** (e.g. `artigos/my-article.html`) — GitHub Pages does not serve nested paths without explicit configuration. All articles must use flat permalinks: `permalink: my-article-slug.html`.

### URL generation in templates

Templates use `{{ art.url }}` (Eleventy collection item URL, starts with `/`) rather than constructing URLs from `fileSlug`. This ensures correct URLs if permalink structures ever change:

```njk
<a href="{{ site.basePath }}{{ art.url }}">...</a>     ✓ correct
<a href="{{ site.basePath }}/{{ art.fileSlug }}.html"> ✗ avoid
```

Sitemap uses `{{ post.url }}`:
```njk
<loc>{{ site.url }}{{ post.url }}</loc>
```

---

## 8. Article Structure and Workflow

### Homepage article display

The homepage (`index.njk`) shows exactly:
- **1 featured article** — from `collections.featuredArticle` (article with `featured: true` in frontmatter, or newest article as fallback)
- **4 side articles** — from `collections.homeArticles` (newest 4, excluding the featured)

**The homepage must never grow endlessly.** New articles do not automatically appear on the homepage — only the article marked `featured: true` appears as the hero, and only the 4 most recent non-featured appear in the list.

### Article archive

All articles are available at `artigos.html`, grouped by category with anchor-linked filter chips. The archive page uses:
- `layout: base-cc.njk`
- `extraCss: article-cc.css`
- The `filterByCategory` Eleventy filter to group articles per category

### Adding a new article — checklist

1. **Create `src/[slug].md`** with all required frontmatter (see Section 9)
2. **Use `permalink: [slug].html`** — flat URL, no subdirectories
3. **Set `tags: article`** — required for all Eleventy collections to pick up the article
4. **Set `category`** — must match an approved category (see Section 10)
5. **If this should be the homepage featured article**, add `featured: true` (remove from the previous featured article)
6. **The article automatically appears in `artigos.html`** — no manual change needed
7. **Sitemap updates automatically** — `sitemap.njk` loops `collections.articles`
8. **RSS updates automatically** — same
9. **If the article is linked from a sidebar's `relatedArticles`**, update those frontmatter arrays manually

### Article image convention

Article images are loaded via inline `style="background-image:url('…')"` on div elements — not via CSS class selectors. Use the `heroImage` frontmatter field.

Image source: `omeustand.pt/viaturas/224/[id]_omeustand_foto.webp` for vehicle-specific photos, or equivalent quality source.

---

## 9. Article Frontmatter Reference

Every article `.md` file must have the following frontmatter:

```yaml
---
layout: article-cc.njk
permalink: [slug].html           # flat URL — no subdirectories
tags: article                    # required for all collections
date: YYYY-MM-DD

# SEO
pageTitle: "[Full SEO title] | Circuito Car Blog"
title: "[Article headline]"
description: "[Meta description, 120–160 chars]"
ogTitle: "[OG title — can match pageTitle or be shorter]"
ogDescription: "[OG description]"

# Classification
category: "[Approved category]"  # see Section 10
featured: true                   # optional — marks as homepage hero (max 1 at a time)

# Display
readTime: "X min de leitura"
utmCampaign: "blog_[slug_short]" # e.g. blog_importacao, blog_opel_gt
footerNote: "Stand em Joane, Vila Nova de Famalicão · circuitocar.pt"

# Lead paragraph (displayed in hero)
lead: "[2–3 sentence intro, displayed prominently below H1]"

# Hero image
heroImage: "https://[image-url]"
heroImageLink: "https://www.circuitocar.pt/viaturas?utm_source=blog&utm_medium=hero_image&utm_campaign=[utmCampaign]"
heroImageAlt: "[Descriptive alt text]"
heroWhatsappMsg: "[Pre-filled WhatsApp message text]"

# Sidebar — first card (warm, article-specific pitch)
sidebarBadge: "[Short eyebrow label, e.g. 'Em stock agora']"
sidebarTitle: "[Short bold title for sidebar card]"
sidebarDescription: "[1–2 sentence description for sidebar card]"

# Sidebar — related articles (manual, 2–3 entries)
relatedArticles:
  - title: "[Article title]"
    url: "[slug].html"
  - title: "[Article title]"
    url: "[slug].html"

# Sidebar — contact descriptions
andreDescription: "[1 sentence describing André's role for this context]"
filipeDescription: "[1 sentence describing Filipe's role for this context]"
sidebarWhatsappMsg: "[Pre-filled WhatsApp message for sidebar CTAs]"
---
```

---

## 10. Article Categories

Only use approved categories. Do not create new ones without a clear reason.

| Category | ID (for archive anchors) | Use |
|---|---|---|
| `Importação` | `importacao` | Articles about importing vehicles to Portugal |
| `Atualidade` | `atualidade` | News, market trends, current events affecting car buying |
| `Guia de Compra` | `guia-de-compra` | Practical buying guides, what to check, how to decide |
| `Desportivos` | `desportivos` | Sports/performance cars and specific vehicle features |
| `Guia Local` | `guia-local` | Local market guides (Famalicão, Vale do Ave, Braga) |
| `Híbridos` | `hibridos` | Hybrid and electric vehicles |
| `Financiamento` | `financiamento` | Financing, credit, monthly payments |
| `Manutenção` | `manutencao` | Maintenance, service history, mechanical checks |

When a new category is genuinely needed, add it to the `categories` array in `src/artigos.njk`.

---

## 11. Approved SEO Rules

### Per article

- Unique `pageTitle` (50–60 chars) and `description` (120–160 chars) — no duplicates
- One H1 only — the article title from frontmatter
- H2 sections used logically to structure the article — not keyword-stuffed
- Primary keyword in title, description, first paragraph, and at least one H2
- `featured: true` on the current homepage hero article

### Internal links — include where natural

| Destination | When to link |
|---|---|
| `https://www.circuitocar.pt/viaturas?utm_source=blog&…` | Stock mentions, when encouraging to "see available cars" |
| `{{ site.basePath }}/circuitocar_simulador_credito.html` | When discussing financing, monthly payments |
| `{{ site.basePath }}/simulador_retoma.html` | When discussing trade-ins or part-exchange |
| `{{ site.contact.marco.whatsappBase }}?text=…` | Primary contact CTA in article body |

### Canonical URLs

Canonical is set automatically by the layout:
```html
<link rel="canonical" href="{{ site.url }}{{ page.url }}" />
```

### Schema.org

Articles use `"@type": "Article"` JSON-LD, embedded in `article-cc.njk`. Includes headline, description, datePublished, dateModified, url, image, author (Organisation: Circuito Car), publisher with logo.

### What NOT to do

- No keyword stuffing — one natural mention per H2 is enough
- Do not promise legal or financial outcomes ("o seu crédito será aprovado", "garantimos o melhor preço")
- Use careful language for importation, financing and retoma — always frame as estimates and orientations
- Do not target search terms that require professional qualifications (legal advice, tax advice)

---

## 12. Content Tone Rules

### Language

- Portuguese from **Portugal** — not Brazilian Portuguese
- Avoid contractions or expressions that are distinctly Brazilian
- Use `você` sparingly — prefer direct address ("fala com a equipa", "percebe melhor", "o teu carro")

### Voice and register

- Professional and competent — the author knows cars and the local market
- Honest and measured — no superlatives, no promises, no manipulation
- Practical — article content answers a real question a buyer would have
- Conversational but not casual — not a chatbot, not a press release

### Forbidden phrases and patterns

| Avoid | Use instead |
|---|---|
| "produto", "item", "solução", "ferramenta" (generic) | The specific thing: "viatura", "carro", "simulador" |
| "totalmente personalizável para a sua marca" | (Never write this — it's a template artefact) |
| "Clique aqui" | Describe the action: "Ver viaturas", "Falar com Marco" |
| "Nós somos os melhores" | Let the content demonstrate it |
| "Não perca esta oportunidade" | State the fact plainly |
| "Preço imbatível" | Not used |
| Excessive exclamation marks | Use sparingly, maximum once per section |

### Article structure

- Lead paragraph in frontmatter (`lead:`) — 2–3 sentences, displays in the dark hero
- Body starts with a context paragraph, not a heading
- H2 sections logically named — they appear in the article and in the sidebar "Mais no blog"
- End with a commercial section linking to Marco / stock / simulators
- CTA buttons at the bottom of the article (yellow primary + dark secondary)

---

## 13. Simulator Pages

### Financing simulator (`circuitocar_simulador_credito.html`)

- Provides indicative monthly payment calculations only
- **Does not constitute a credit offer or approval**
- Note copy: *"Esta simulação serve como orientação inicial para perceber a ordem de grandeza da prestação e do custo total. Os valores finais dependem sempre da análise do perfil, condições concretas e aprovação pela entidade financeira."*
- Primary contact CTA → Marco
- Secondary CTAs → stock on circuitocar.pt

### Retoma simulator (`simulador_retoma.html`)

- Provides indicative trade-in value range only
- **Final value always depends on real in-person vehicle inspection**
- Note copy: *"Esta simulação serve como orientação inicial. O valor final depende sempre da análise presencial da viatura — versão exata, equipamento, estado real, histórico, procura de mercado e custos de preparação comercial."*
- Results WhatsApp button → `wa.me/351922017034` (Marco) with pre-filled simulation data
- Primary contact → Marco
- Language: helpful and explanatory, not defensive or evasive

### Both simulators

- "Fala com quem percebe" sidebar section has:
  1. Marco (blue accent, primary)
  2. Direção divider
  3. André and Filipe
- Footer contact column: Marco first, then André, then Filipe
- All internal "Página de contactos" or "Contacto" nav links → `{{ site.basePath }}/#contacto` (not circuitocar.pt)

---

## 14. Navigation and Internal Links

### Standard nav links (all pages)

| Label | Destination |
|---|---|
| Artigos / Blog | `{{ site.basePath }}/artigos.html` |
| Ferramentas | `{{ site.basePath }}/#ferramentas` |
| Onde estamos | `{{ site.basePath }}/#local-seo` |
| Sobre | `{{ site.basePath }}/#sobre` |
| Viaturas | `https://www.circuitocar.pt/viaturas?utm_source=blog&utm_medium=header_stock&utm_campaign=[campaign]` |
| Falar connosco / Equipa | `{{ site.basePath }}/#contacto` or `#equipa` (page-specific) |

### Mobile dock (all pages)

| Label | Destination |
|---|---|
| Início | `{{ site.basePath }}/` |
| Blog | `{{ site.basePath }}/artigos.html` |
| Crédito | `{{ site.basePath }}/circuitocar_simulador_credito.html` |
| Retoma | `{{ site.basePath }}/simulador_retoma.html` |
| Contacto / Equipa | `{{ site.basePath }}/#contacto` or `#equipa` |

### UTM parameter convention

All external links to circuitocar.pt must include UTM parameters:

```
utm_source=blog
utm_medium=[placement]   e.g. header_stock, hero_whatsapp, sidebar_marco, footer_stock
utm_campaign=[utmCampaign frontmatter value]
```

---

## 15. Deployment

- **Trigger:** push to `main` branch
- **Builder:** GitHub Actions runs `npx @11ty/eleventy`
- **Output:** `_site/` → GitHub Pages
- **Domain:** `circuitocar.blog` (CNAME file in repo root)
- **Build time:** ~30 seconds

### Before deploying

```bash
npx @11ty/eleventy --quiet   # must complete with 0 errors
```

Check that the output file count is correct (`Wrote N files`). If lower than expected, a template error occurred.

---

## 16. Rules for Future AI / Codex Sessions

> **Read this section every time before making any change.**

### Mandatory first step

```
Read PROJECT_GUIDE.md before making any change to this project.
```

### Design rules

- **Do not redesign the site** unless the client has explicitly requested it
- Preserve the documented colour palette — do not introduce new colours
- Preserve the typographic style — headings stay italic, uppercase, Saira Condensed
- Preserve border radius, shadow, and spacing conventions
- Preserve dark header/hero / light body section contrast rhythm
- Do not change button styles or add new button variants without a clear reason

### Contact rules

- **Do not change the contact logic** unless explicitly requested
- Marco is always first — primary contact, blue accent card
- André and Filipe remain visible as directors below the Direção divider
- Main WhatsApp CTAs always use Marco's number: `wa.me/351922017034`
- Never link "Página de contactos" or "Contacto" links to circuitocar.pt — use `/#contacto`
- **CTA buttons must use brand identity, not Marco's name.** Use `"Falar com a CircuitoCar"` and `"Ligar para a CircuitoCar"` — never `"Falar com Marco"`, `"WhatsApp Marco"`, or `"Ligar Marco"` as button labels
- Marco's name appears in description text only (team sections, contact card body text)

### Article rules

- **Do not add articles to the homepage directly** — the homepage reads from `collections.featuredArticle` and `collections.homeArticles` automatically
- Only one article has `featured: true` at a time — the homepage hero
- New articles must follow the frontmatter reference in Section 9
- New articles must use flat permalinks (no subdirectories)
- New article categories must be approved (Section 10) or explicitly requested

### URL rules

- **Never change existing article URLs** — this is an SEO risk
- Use `{{ art.url }}` in templates, not constructed `fileSlug + '.html'` strings
- Flat URLs only: `https://circuitocar.blog/[slug].html`

### Simulator rules

- Do not remove the "orientation only" disclaimer from simulators
- Do not change the primary WhatsApp button in retoma results away from Marco's number

### Before committing

1. Run `npx @11ty/eleventy --quiet` — must complete without errors
2. Check article count in `_site/` matches expectations
3. Verify any new article appears in `_site/artigos.html`
4. Verify any new article appears in `_site/sitemap.xml`
5. Report all changed files in the response

### Language

- Always write in Portuguese from Portugal
- Never use Brazilian Portuguese expressions
- Refer to Section 12 for tone and forbidden phrases

---

*Last updated: 2026-05-20 (contact wording update)*
*Maintained by: Estúdio Flávio Martins*
