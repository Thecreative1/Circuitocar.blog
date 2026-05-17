const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const BASE = 'http://localhost:8080';
const SHOTS_DIR = path.join(__dirname, 'smoke-screenshots');
if (!fs.existsSync(SHOTS_DIR)) fs.mkdirSync(SHOTS_DIR);

const PAGES = [
  { name: 'homepage', url: '/', type: 'page' },
  { name: 'simulador-credito', url: '/circuitocar_simulador_credito.html', type: 'tool' },
  { name: 'simulador-retoma', url: '/simulador_retoma.html', type: 'tool' },
  { name: 'art-automaticos', url: '/carros-automaticos-usados-vantagens-riscos.html', type: 'article' },
  { name: 'art-onde-comprar', url: '/onde-comprar-carro-usado-famalicao.html', type: 'article' },
  { name: 'art-familia', url: '/os-pontos-que-mais-pesam-na-escolha-de-um-carro-para-familia.html', type: 'article' },
  { name: 'art-hibrido', url: '/vale-a-pena-comprar-hibrido-usado-2026.html', type: 'article' },
];

const issues = [];
const log = (sev, page, msg) => issues.push({ sev, page, msg });

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });

  for (const p of PAGES) {
    const page = await context.newPage();
    const consoleErrs = [];
    const failedRequests = [];

    page.on('console', m => { if (m.type() === 'error') consoleErrs.push(m.text()); });
    page.on('requestfailed', r => failedRequests.push(`${r.url()} - ${r.failure().errorText}`));
    page.on('response', r => { if (r.status() >= 400) failedRequests.push(`${r.url()} - HTTP ${r.status()}`); });

    let res;
    try {
      res = await page.goto(BASE + p.url, { waitUntil: 'networkidle', timeout: 15000 });
    } catch (e) {
      log('ERR', p.name, `Load failed: ${e.message}`);
      await page.close();
      continue;
    }

    if (res.status() !== 200) log('ERR', p.name, `Status ${res.status()}`);

    const html = await page.content();

    // 1. Meta tags
    const checks = [
      { re: /<title>([^<]+)<\/title>/, name: 'title' },
      { re: /<meta name="description" content="([^"]+)"/, name: 'description' },
      { re: /<link rel="canonical" href="([^"]+)"/, name: 'canonical' },
      { re: /<meta property="og:image" content="([^"]+)"/, name: 'og:image' },
      { re: /<meta property="og:title" content="([^"]+)"/, name: 'og:title' },
    ];
    for (const c of checks) {
      const m = html.match(c.re);
      if (!m) log('ERR', p.name, `Missing ${c.name}`);
      else if (m[1].includes('undefined') || m[1].trim() === '') log('ERR', p.name, `Empty ${c.name}: "${m[1]}"`);
    }

    // 2. Article JSON-LD
    if (p.type === 'article') {
      if (!html.includes('"@type": "Article"')) log('ERR', p.name, 'Missing Article JSON-LD');
      try {
        const ldMatches = [...html.matchAll(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/g)];
        for (const m of ldMatches) {
          JSON.parse(m[1]);
        }
      } catch (e) {
        log('ERR', p.name, `Invalid JSON-LD: ${e.message}`);
      }
    }

    // 3. Find broken internal links + WhatsApp/tel format
    const anchors = await page.$$eval('a[href]', as => as.map(a => ({ href: a.href, raw: a.getAttribute('href'), text: (a.textContent || '').trim().slice(0, 40) })));
    const internalLinks = new Set();
    for (const a of anchors) {
      if (a.raw.startsWith('tel:')) {
        if (!/^tel:\+?\d[\d ]{7,}$/.test(a.raw)) log('WARN', p.name, `Bad tel link: ${a.raw}`);
      } else if (a.raw.startsWith('https://wa.me/') || a.raw.includes('whatsapp')) {
        if (!a.raw.includes('utm_')) log('WARN', p.name, `WhatsApp link missing UTM: ${a.raw.slice(0, 80)}`);
      } else if (a.href.startsWith(BASE)) {
        const u = new URL(a.href);
        if (u.pathname !== p.url && !u.pathname.endsWith('/')) internalLinks.add(u.pathname);
      } else if (a.raw.startsWith('#')) {
        // Anchor — check target exists
        const id = a.raw.slice(1);
        if (id && !await page.$(`#${id}`)) log('WARN', p.name, `Dead anchor: ${a.raw}`);
      }
    }

    // 4. External links to circuitocar.pt should have UTMs
    for (const a of anchors) {
      if (a.href.includes('circuitocar.pt') && !a.href.includes('utm_')) {
        log('WARN', p.name, `circuitocar.pt link without UTM: ${a.raw.slice(0, 80)}`);
      }
    }

    // 5. Broken images
    const imgs = await page.$$eval('img', is => is.map(i => ({ src: i.src, alt: i.alt, ok: i.complete && i.naturalWidth > 0 })));
    for (const i of imgs) {
      if (!i.ok) log('ERR', p.name, `Broken image: ${i.src}`);
      if (!i.alt) log('WARN', p.name, `Image missing alt: ${i.src}`);
    }

    // 6. Console errors / failed requests
    for (const e of consoleErrs) log('WARN', p.name, `Console: ${e.slice(0, 100)}`);
    for (const f of failedRequests) {
      if (f.includes('favicon')) continue;
      log('ERR', p.name, `Request: ${f.slice(0, 100)}`);
    }

    // 7. Desktop + mobile screenshots
    await page.screenshot({ path: path.join(SHOTS_DIR, `${p.name}-desktop.png`), fullPage: true });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: path.join(SHOTS_DIR, `${p.name}-mobile.png`), fullPage: true });

    await page.close();
  }

  // 8. Cross-page: collected internal links must exist
  const allInternal = new Set();
  const allPagePaths = new Set(PAGES.map(p => p.url));
  const checkPage = await context.newPage();
  for (const p of PAGES) {
    await checkPage.goto(BASE + p.url, { waitUntil: 'domcontentloaded' });
    const links = await checkPage.$$eval('a[href]', as => as.map(a => a.href));
    for (const l of links) {
      if (l.startsWith(BASE)) {
        const path_ = new URL(l).pathname;
        if (path_.endsWith('.html')) allInternal.add(path_);
      }
    }
  }
  for (const p of allInternal) {
    if (!allPagePaths.has(p)) {
      // Try fetching it
      const r = await checkPage.goto(BASE + p, { waitUntil: 'domcontentloaded' }).catch(() => null);
      if (!r || r.status() >= 400) log('ERR', 'links', `Broken internal link: ${p}`);
    }
  }

  await browser.close();

  console.log('\n=== SMOKE TEST RESULTS ===\n');
  const errors = issues.filter(i => i.sev === 'ERR');
  const warnings = issues.filter(i => i.sev === 'WARN');

  if (errors.length) {
    console.log(`ERRORS (${errors.length}):`);
    errors.forEach(i => console.log(`  ✗ [${i.page}] ${i.msg}`));
  } else {
    console.log('No errors ✓');
  }

  if (warnings.length) {
    console.log(`\nWARNINGS (${warnings.length}):`);
    warnings.forEach(i => console.log(`  ! [${i.page}] ${i.msg}`));
  }

  console.log(`\nScreenshots: ${SHOTS_DIR}`);
  process.exit(errors.length > 0 ? 1 : 0);
})();
