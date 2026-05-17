const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const BASE = 'http://localhost:8080';
const OUT = path.join(__dirname, 'design-preview');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT);

(async () => {
  const browser = await chromium.launch();

  const errs = [];

  for (const vp of [
    { name: 'desktop', w: 1440, h: 900 },
    { name: 'tablet', w: 900, h: 1200 },
    { name: 'mobile', w: 390, h: 844 },
  ]) {
    const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    page.on('console', m => { if (m.type() === 'error') errs.push(`${vp.name}: ${m.text()}`); });
    page.on('pageerror', e => errs.push(`${vp.name} pageerror: ${e.message}`));
    page.on('requestfailed', r => { if (!r.url().includes('favicon')) errs.push(`${vp.name} reqfail: ${r.url()}`); });

    await page.goto(BASE + '/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1200); // let Lucide swap

    await page.screenshot({ path: path.join(OUT, `${vp.name}-full.png`), fullPage: true });

    // Crops for each section
    for (const sel of ['.cc-hero', '#stock', '#categorias', '#artigos', '#ferramentas', '#local-seo', '.cc-section--dark', '#sobre', '#contacto']) {
      const el = await page.$(sel);
      if (el) {
        await el.scrollIntoViewIfNeeded();
        await page.waitForTimeout(150);
        const safeName = sel.replace(/[#.]/g, '');
        await el.screenshot({ path: path.join(OUT, `${vp.name}-${safeName}.png`) }).catch(() => {});
      }
    }
    await ctx.close();
  }

  await browser.close();
  console.log('Errors:', errs.length);
  errs.forEach(e => console.log('  ' + e));
  console.log('Screenshots:', OUT);
})();
