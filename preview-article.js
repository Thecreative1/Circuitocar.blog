const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const BASE = 'http://localhost:8080';
const OUT = path.join(__dirname, 'design-preview');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT);

(async () => {
  const browser = await chromium.launch();
  const errs = [];

  const urls = [
    { name: 'art-onde', url: '/onde-comprar-carro-usado-famalicao.html' },
    { name: 'art-auto', url: '/carros-automaticos-usados-vantagens-riscos.html' },
    { name: 'art-familia', url: '/os-pontos-que-mais-pesam-na-escolha-de-um-carro-para-familia.html' },
    { name: 'art-hibrido', url: '/vale-a-pena-comprar-hibrido-usado-2026.html' },
  ];

  for (const u of urls) {
    for (const vp of [{ name: 'desktop', w: 1440, h: 900 }, { name: 'mobile', w: 390, h: 844 }]) {
      const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: 1.5 });
      const page = await ctx.newPage();
      page.on('console', m => { if (m.type() === 'error') errs.push(`${u.name} ${vp.name}: ${m.text()}`); });
      page.on('pageerror', e => errs.push(`${u.name} ${vp.name} pageerror: ${e.message}`));
      page.on('requestfailed', r => { if (!r.url().includes('favicon')) errs.push(`${u.name} reqfail: ${r.url()}`); });

      await page.goto(BASE + u.url, { waitUntil: 'networkidle' });
      await page.waitForTimeout(800);
      await page.screenshot({ path: path.join(OUT, `${u.name}-${vp.name}.png`), fullPage: true });
      await ctx.close();
    }
  }

  await browser.close();
  console.log('Errors:', errs.length);
  errs.forEach(e => console.log('  ' + e));
  console.log('Screenshots:', OUT);
})();
