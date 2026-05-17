const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 1600 } });
  const page = await ctx.newPage();
  await page.goto('https://www.circuitocar.pt/viaturas', { waitUntil: 'networkidle', timeout: 30000 });
  // Scroll to load more
  for (let i = 0; i < 6; i++) {
    await page.evaluate(() => window.scrollBy(0, 1500));
    await page.waitForTimeout(800);
  }

  const cars = await page.evaluate(() => {
    const out = [];
    const seenHref = new Set();
    document.querySelectorAll('a[href*="/viatura/"]').forEach(a => {
      if (seenHref.has(a.href)) return;
      const img = a.querySelector('img');
      const text = (a.innerText || '').replace(/\s+/g, ' ').trim();
      if (!img || !/€/.test(text)) return;
      seenHref.add(a.href);
      // Parse: "10.750€ BMW 116 D EDYNAMICS LINE URBAN 2016 232.000Km Gasóleo"
      const m = text.match(/(RESERVADO\s+)?([\d.,]+)\s*€\s+(.+?)\s+(\d{4})\s+([\d.,]+)\s*Km\s+(\w+)/i);
      if (!m) return;
      out.push({
        href: a.href,
        img: img.src,
        reserved: !!m[1],
        price: m[2] + '€',
        priceNum: parseInt(m[2].replace(/[.,]/g, '')),
        title: m[3].trim(),
        year: m[4],
        km: m[5] + ' km',
        fuel: m[6]
      });
    });
    return out;
  });

  // Dedupe and filter: not reserved, dimensional info present
  const clean = cars.filter(c => !c.reserved);
  // Pick a diverse set: cheap citadino, mid SUV, premium, low-km recent
  const candidates = {
    low_price: clean.slice().sort((a,b) => a.priceNum - b.priceNum)[0],
    low_km: clean.slice().sort((a,b) => parseInt(a.km) - parseInt(b.km))[0],
    suv: clean.find(c => /SUV|ECOSPORT|TUCSON|QASHQAI|KADJAR|CAPTUR|MOKKA|ARONA|TIGUAN|3008|2008|YETI|XC|CX|Q3|Q5|GLA|GLB/i.test(c.title)),
    premium: clean.find(c => /BMW|MERCEDES|AUDI|PORSCHE|VOLVO/i.test(c.title)),
    recent: clean.slice().sort((a,b) => parseInt(b.year) - parseInt(a.year))[0],
  };
  console.log('Total cars:', clean.length);
  console.log('Selected:', JSON.stringify(candidates, null, 2));

  await browser.close();
})();
