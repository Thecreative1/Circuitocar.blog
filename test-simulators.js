const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const BASE = 'http://localhost:8080';
const OUT = path.join(__dirname, 'design-preview');

(async () => {
  const browser = await chromium.launch();
  const errs = [];

  // ── CREDIT SIMULATOR ──
  for (const vp of [{ name: 'desktop', w: 1440, h: 900 }, { name: 'mobile', w: 390, h: 844 }]) {
    const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: 1.5 });
    const page = await ctx.newPage();
    page.on('console', m => { if (m.type() === 'error') errs.push(`credito ${vp.name}: ${m.text()}`); });
    page.on('pageerror', e => errs.push(`credito ${vp.name} pageerror: ${e.message}`));

    await page.goto(BASE + '/circuitocar_simulador_credito.html', { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);

    // Verify JS calc auto-ran on load
    const prestacao = await page.$eval('#prestacaoMensal', el => el.textContent);
    console.log(`Credit ${vp.name}: initial prestacao = "${prestacao}"`);

    // Change value and recalculate
    await page.fill('#precoViatura', '25000');
    await page.click('button[onclick="calcularSimulacao()"]');
    await page.waitForTimeout(200);
    const newPrestacao = await page.$eval('#prestacaoMensal', el => el.textContent);
    console.log(`Credit ${vp.name}: after recalc (25000€) = "${newPrestacao}"`);

    await page.screenshot({ path: path.join(OUT, `credito-${vp.name}.png`), fullPage: true });
    await ctx.close();
  }

  // ── TRADE-IN SIMULATOR ──
  for (const vp of [{ name: 'desktop', w: 1440, h: 900 }, { name: 'mobile', w: 390, h: 844 }]) {
    const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: 1.5 });
    const page = await ctx.newPage();
    page.on('console', m => { if (m.type() === 'error') errs.push(`retoma ${vp.name}: ${m.text()}`); });
    page.on('pageerror', e => errs.push(`retoma ${vp.name} pageerror: ${e.message}`));

    await page.goto(BASE + '/simulador_retoma.html', { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(OUT, `retoma-${vp.name}-form.png`), fullPage: true });

    // Fill and submit form
    await page.fill('#marca', 'Peugeot');
    await page.fill('#modelo', '308 SW');
    await page.fill('#ano', '2018');
    await page.fill('#kms', '120000');
    await page.selectOption('#combustivel', 'diesel');
    await page.selectOption('#caixa', 'manual');
    await page.selectOption('#estado', 'bom');
    await page.selectOption('#historico', 'completo');
    await page.selectOption('#donos', '2');
    await page.selectOption('#sinistros', 'nao');
    await page.selectOption('#liquidez', 'media');
    await page.fill('#nome', 'Cliente Teste');
    await page.fill('#telefone', '912345678');
    await page.selectOption('#objetivo', 'sim');
    await page.check('#consentimento');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(800);

    const rangeValue = await page.$eval('#rangeValue', el => el.textContent);
    const midValue = await page.$eval('#midValue', el => el.textContent);
    const waHref = await page.$eval('#whatsappBtn', el => el.href);
    console.log(`Retoma ${vp.name}: range = "${rangeValue}", mid = "${midValue}"`);
    console.log(`Retoma ${vp.name}: WA href starts with = "${waHref.slice(0, 80)}..."`);

    await page.screenshot({ path: path.join(OUT, `retoma-${vp.name}-results.png`), fullPage: true });
    await ctx.close();
  }

  await browser.close();
  console.log('\nErrors:', errs.length);
  errs.forEach(e => console.log('  ' + e));
})();
