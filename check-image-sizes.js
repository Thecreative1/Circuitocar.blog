const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newContext().then(c => c.newPage());

  const urls = [
    'https://omeustand.pt/viaturas/224/7724173085_omeustand_foto.webp',
    'https://omeustand.pt/viaturas/224/7724416609_omeustand_foto.webp',
    'https://omeustand.pt/viaturas/224/7723893907_omeustand_foto.webp',
    'https://omeustand.pt/viaturas/224/7724357454_omeustand_foto.webp',
  ];

  for (const u of urls) {
    await page.setContent(`<img src="${u}" id="x">`);
    const dim = await page.$eval('#x', img => ({ w: img.naturalWidth, h: img.naturalHeight, ratio: (img.naturalWidth / img.naturalHeight).toFixed(2) }));
    console.log(u.split('/').pop(), '→', `${dim.w}x${dim.h}`, `(${dim.ratio}:1)`);
  }

  await browser.close();
})();
