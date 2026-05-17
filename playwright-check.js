const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const BASE = 'http://localhost:8081';
const SHOTS_DIR = path.join(__dirname, 'playwright-screenshots');
if (!fs.existsSync(SHOTS_DIR)) fs.mkdirSync(SHOTS_DIR);

const PAGES = [
  { name: 'homepage', url: '/' },
  { name: 'simulador-credito', url: '/circuitocar_simulador_credito.html' },
  { name: 'simulador-retoma', url: '/simulador_retoma.html' },
  { name: 'artigo-carros-automaticos', url: '/carros-automaticos-usados-vantagens-riscos.html' },
  { name: 'artigo-onde-comprar', url: '/onde-comprar-carro-usado-famalicao.html' },
  { name: 'artigo-carro-familia', url: '/os-pontos-que-mais-pesam-na-escolha-de-um-carro-para-familia.html' },
  { name: 'artigo-hibrido', url: '/vale-a-pena-comprar-hibrido-usado-2026.html' },
  { name: 'sitemap', url: '/sitemap.xml' },
];

const CHECKS = {
  homepage: ['Circuito Car', 'artigos', 'Famalicão'],
  article: ['JSON-LD', 'Article'],
};

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  const results = [];

  for (const { name, url } of PAGES) {
    const fullUrl = BASE + url;
    try {
      const res = await page.goto(fullUrl, { waitUntil: 'domcontentloaded', timeout: 10000 });
      const status = res.status();
      const title = await page.title().catch(() => '(no title)');

      let schemaOk = null;
      if (url.endsWith('.html') && !url.includes('simulador')) {
        const content = await page.content();
        schemaOk = content.includes('"@type": "Article"');
      }

      const shotPath = path.join(SHOTS_DIR, `${name}.png`);
      if (!url.endsWith('.xml')) {
        await page.screenshot({ path: shotPath, fullPage: false });
      }

      results.push({ page: name, url, status, title, schemaOk, ok: status === 200 });
    } catch (err) {
      results.push({ page: name, url, status: 'ERR', error: err.message, ok: false });
    }
  }

  await browser.close();

  console.log('\n=== RESULTADO DO CHECK ===\n');
  let allOk = true;
  for (const r of results) {
    const icon = r.ok ? '✓' : '✗';
    const schema = r.schemaOk === true ? ' [JSON-LD ✓]' : r.schemaOk === false ? ' [JSON-LD ✗]' : '';
    console.log(`${icon} ${r.page.padEnd(30)} ${String(r.status).padEnd(5)} ${r.title || r.error || ''}${schema}`);
    if (!r.ok) allOk = false;
  }

  console.log(`\nScreenshots guardados em: ${SHOTS_DIR}`);
  console.log(allOk ? '\nTudo a funcionar! ✓' : '\nHá erros para corrigir. ✗');
  process.exit(allOk ? 0 : 1);
})();
