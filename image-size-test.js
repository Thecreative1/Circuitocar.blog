const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const BASE = 'http://localhost:8080';
const OUT = path.join(__dirname, 'image-test-screenshots');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT);

const VIEWPORTS = [
  { name: 'desktop', w: 1280, h: 800 },
  { name: 'tablet', w: 900, h: 1200 },
  { name: 'mobile', w: 390, h: 844 },
];

(async () => {
  const browser = await chromium.launch();

  const issues = [];

  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: 2 });
    const page = await ctx.newPage();

    await page.goto(BASE + '/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);

    // 1. Measure the stock card images
    const stockImgs = await page.$$eval('.stock-img', els => els.map(el => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return {
        w: Math.round(r.width),
        h: Math.round(r.height),
        ratio: (r.width / r.height).toFixed(2),
        aspectRatio: cs.aspectRatio,
        bg: cs.backgroundImage.slice(0, 80)
      };
    }));

    // 2. Measure hero card image
    const heroImg = await page.$eval('.hero-card-img', el => {
      const r = el.getBoundingClientRect();
      return { w: Math.round(r.width), h: Math.round(r.height), ratio: (r.width / r.height).toFixed(2) };
    });

    // 3. Measure article hero thumb
    const artThumb = await page.$eval('.art-hero-thumb', el => {
      const r = el.getBoundingClientRect();
      return { w: Math.round(r.width), h: Math.round(r.height), ratio: (r.width / r.height).toFixed(2) };
    }).catch(() => null);

    // 4. Measure mini article thumbs
    const miniThumbs = await page.$$eval('.mini-thumb', els => els.map(el => {
      const r = el.getBoundingClientRect();
      return { w: Math.round(r.width), h: Math.round(r.height), ratio: (r.width / r.height).toFixed(2) };
    }));

    console.log(`\n━━━━━ ${vp.name.toUpperCase()} (${vp.w}x${vp.h}) ━━━━━`);
    console.log('Hero card img :', `${heroImg.w}×${heroImg.h}px (ratio ${heroImg.ratio}:1)`);
    if (artThumb) console.log('Article thumb :', `${artThumb.w}×${artThumb.h}px (ratio ${artThumb.ratio}:1)`);
    console.log('Stock cards   :', stockImgs.length, 'cards');
    stockImgs.forEach((s, i) => console.log(`  [${i}] ${s.w}×${s.h}px (ratio ${s.ratio}:1, expected ~1.33)`));
    console.log('Mini thumbs   :', miniThumbs.length);
    miniThumbs.forEach((m, i) => console.log(`  [${i}] ${m.w}×${m.h}px`));

    // Health checks
    stockImgs.forEach((s, i) => {
      const r = parseFloat(s.ratio);
      if (Math.abs(r - 1.33) > 0.1) issues.push(`${vp.name} stock[${i}]: ratio ${s.ratio} (expected ~1.33)`);
      if (s.w < 100) issues.push(`${vp.name} stock[${i}]: too small (${s.w}px wide)`);
      if (s.w > 600) issues.push(`${vp.name} stock[${i}]: too wide (${s.w}px)`);
    });
    if (heroImg.w > 0 && (heroImg.h < 80 || heroImg.h > 600)) {
      issues.push(`${vp.name} hero: ${heroImg.h}px tall — out of range`);
    }

    // Screenshot just the stock section
    const stockSection = await page.$('#stock');
    if (stockSection) {
      await stockSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await stockSection.screenshot({ path: path.join(OUT, `stock-${vp.name}.png`) });
    }

    // Screenshot the hero
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    const hero = await page.$('.hero');
    if (hero) await hero.screenshot({ path: path.join(OUT, `hero-${vp.name}.png`) });

    // Full page mobile-only
    if (vp.name === 'mobile') {
      await page.screenshot({ path: path.join(OUT, `full-mobile.png`), fullPage: true });
    }

    await ctx.close();
  }

  await browser.close();

  console.log('\n\n═══════ ISSUES ═══════');
  if (issues.length === 0) {
    console.log('✓ Todas as imagens dentro dos parâmetros esperados.');
  } else {
    issues.forEach(i => console.log('  ✗', i));
  }
  console.log(`\nScreenshots: ${OUT}`);
})();
