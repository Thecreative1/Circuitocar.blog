# Circuito Car Blog

## What this is
A blog for a Portuguese used car dealership (Circuito Car, Joane, Famalicão).
Built to drive organic traffic and generate WhatsApp/phone leads.
Client accepted the proposal — I (Flavio Martins) am building it.

## Goal
Convert the static HTML site to 11ty so new articles can be written
in Markdown. Client should be able to publish posts via Decap CMS
without touching code.

## Stack
- Eleventy (11ty) static site generator
- Nunjucks templates
- GitHub Pages hosting
- Decap CMS for client content management
- GitHub Actions for auto-deploy

## Current status
- [x] Migrated to 11ty
- [x] Schema markup added (Article JSON-LD on all article pages)
- [x] GitHub Actions deploy pipeline
- [x] Decap CMS configured
- [x] Client handoff doc written (CLIENTE.md)

## Important rules
- Never change existing URLs (SEO risk)
- Keep all UTM parameters on WhatsApp and stock links
- Language is Portuguese (PT)
- Articles target local SEO: Famalicão, Braga, Guimarães, Vale do Ave, Santo Tirso, Trofa, Joane

## Project structure
```
src/
  _data/site.json          — global site data (contacts, URLs, address)
  _includes/
    base.njk               — master layout (topbar, header, footer, mobile dock)
    article.njk            — article layout (hero, two-column grid, sidebar)
  admin/
    index.html             — Decap CMS interface (/admin/)
    config.yml             — CMS configuration (GitHub backend, fields)
  articles/
    articles.11tydata.js   — Eleventy defaults for CMS-created articles
  assets/
    article.css            — shared article styles
    kinetic-gallery.css    — design system (dark theme, Space Grotesk)
  img/
    cc.png                 — Circuito Car logo
    uploads/               — media uploads from CMS
  index.njk                — homepage
  sitemap.njk              — outputs /sitemap.xml
  rss.njk                  — outputs /rss.xml
  circuitocar_simulador_credito.njk
  simulador_retoma.njk
  [article].md             — existing articles (4 files)
```

## Contacts (used across templates)
- André Silva — Comercial — 911 899 092
- Filipe Rodrigues — Técnico — 964 197 262

## Local SEO targets
- Primary: Vila Nova de Famalicão, Joane
- Secondary: Braga, Guimarães, Santo Tirso, Trofa, Vale do Ave

## Deployment
- Push to `main` triggers GitHub Actions
- Builds with `npx @11ty/eleventy`
- Deploys to GitHub Pages via `actions/deploy-pages`
- Build time: ~30 seconds

## CMS setup (one-time, not yet done)
1. Create GitHub OAuth App at github.com/settings/developers
2. Callback URL: https://thecreative1.github.io/Circuitocar.blog/admin/
3. Paste Client ID into `src/admin/config.yml` → `app_id:`
4. Add client as repo collaborator (Settings → Collaborators)
See CLIENTE.md for full client instructions.
