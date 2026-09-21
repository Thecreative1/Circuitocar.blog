// Gera as imagens OG dos artigos: HTML por layout -> Playwright a 2x -> sharp 1920x1008 JPEG q92 4:4:4.
// Reduz o h1 até o texto ficar a >= 24 px do corte do painel e caber na coluna; reporta a folga final.
// Uso: node gen.cjs [slug...]   (sem argumentos = todos)
const { createRequire } = require('module');
const req = createRequire('E:/Git Projects/GIT_HUB/Circuitocar.blog/package.json');
const { chromium } = req('playwright');
const sharp = req('sharp');
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const specs = require('./specs.cjs');

const OG = path.join(__dirname, 'og');
const FEED = path.join(__dirname, 'feed');
const OUT = 'E:/Git Projects/GIT_HUB/Circuitocar.blog/src/img';
fs.mkdirSync(FEED, { recursive: true });

const FONTS = `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Saira+Condensed:ital,wght@0,600;0,700;1,900&family=Manrope:wght@400;500;600;700&display=swap">`;
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E")`;

// A máscara tem de ir embutida: mask-image é pedido em modo CORS e o Chromium bloqueia-o a partir de file://.
const LOGO = 'data:image/png;base64,' + fs.readFileSync(path.join(OG, 'logo-mask-1000.png')).toString('base64');

const BASE = `
  * { margin:0; padding:0; box-sizing:border-box; }
  html,body { width:1200px; height:630px; }
  body { position:relative; overflow:hidden; background:#0A0B0D; font-family:'Manrope',Arial,sans-serif; }
  .sc, .eyebrow, h1, .chip, .sticker { font-family:'Saira Condensed','Arial Narrow',Arial,sans-serif; }
  .logo { width:196px; height:59px; flex-shrink:0; background:var(--logo);
    -webkit-mask:url(${LOGO}) left center/contain no-repeat; mask:url(${LOGO}) left center/contain no-repeat; }
  .eyebrow { font-weight:700; font-size:27px; letter-spacing:4.5px; color:var(--eyebrow); margin-bottom:12px; }
  h1 { font-style:italic; font-weight:900; font-size:88px; line-height:.9; color:var(--ink); text-transform:uppercase; letter-spacing:-.005em; white-space:nowrap; position:relative; z-index:0; }
  h1 em { font-style:italic; color:var(--em); }
  .tag { font-size:27px; font-weight:500; color:var(--tag); line-height:1.3; margin-top:18px; text-wrap:balance; }
  .chip { display:inline-block; font-weight:700; font-size:25px; letter-spacing:3.2px; color:var(--chip-ink);
    background:var(--chip-bg); border-radius:40px; padding:14px 27px 12px; }
  .content { position:absolute; display:flex; flex-direction:column; justify-content:space-between; align-items:flex-start; }
  .sticker small { display:block; font-weight:700; font-size:25px; letter-spacing:3.5px; line-height:1; }
  .sticker b { display:block; font-style:italic; font-weight:900; font-size:66px; line-height:.9; white-space:nowrap; }
`;

function stickerHtml(s, cls = '') {
  if (!s) return '';
  return `<div class="sticker ${cls}"><div><small>${s[0]}</small><b>${s[1]}</b></div></div>`;
}

// A / D / G: painel à esquerda, foto do stand à direita (o carro olha para o texto).
function slashLayout(s) {
  const v = {
    A: { xTop: 620, xBot: 460, css: `
        body { --logo:#FFFF00; --eyebrow:#FFFF00; --ink:#FFFFFF; --em:#FFFF00; --tag:#C7CBD3; --chip-bg:#FFFF00; --chip-ink:#0A0B0D; }
        .panel { background:linear-gradient(160deg,#0A0B0D 0%,#0D1F3C 100%); }
        .slash { background:#FFFF00; }
        .sticker { background:#FFFF00; color:#0A0B0D; transform:skewX(-14deg); padding:12px 52px 10px 30px; }
        .sticker > div { transform:skewX(14deg); }` },
    D: { xTop: 600, xBot: 488, css: `
        body { --logo:#0A0B0D; --eyebrow:#FFFF00; --ink:#0A0B0D; --em:#FFFF00; --tag:#26282C; --chip-bg:#0A0B0D; --chip-ink:#FFFF00; }
        .panel { background:linear-gradient(160deg,#FFFF2E 0%,#FFFF00 60%,#F2F200 100%); }
        .grain { opacity:.05 !important; }
        .slash { background:#0A0B0D; }
        .eyebrow { display:inline-block; background:#0A0B0D; padding:9px 16px 7px; margin-bottom:18px; }
        h1 { line-height:.94; }
        h1 em { display:inline-block; background:#0A0B0D; padding:.06em .12em 0 .08em; line-height:.92; margin:.03em 0; }
        .tag { font-weight:600; }
        .sticker { background:#0A0B0D; color:#FFFF00; transform:skewX(-14deg); padding:12px 52px 10px 30px; }
        .sticker > div { transform:skewX(14deg); }
        .sticker small { color:#FFFFFF; }` },
    G: { xTop: 566, xBot: 566, css: `
        body { --logo:#0D1F3C; --eyebrow:#0D1F3C; --ink:#0A0B0D; --em:#0A0B0D; --tag:#3A3F48; --chip-bg:#0D1F3C; --chip-ink:#FFFF00; }
        .panel { background:linear-gradient(165deg,#FFFFFF 0%,#EEF0F4 100%); }
        .grain { display:none; }
        .slash { background:#FFFF00; }
        .slash2 { position:absolute; inset:0; background:#0D1F3C;
          clip-path:polygon(calc(var(--x-top) - 5px) 0, var(--x-top) 0, var(--x-bot) 100%, calc(var(--x-bot) - 5px) 100%); }
        .eyebrow::before { content:''; display:inline-block; width:22px; height:22px; background:#FFFF00; margin-right:14px; vertical-align:-1px; }
        h1 { font-size:96px; } h1 em { position:relative; } h1 em::before { content:''; position:absolute; left:-.05em; right:-.1em; top:.5em; bottom:.1em; background:#FFFF00; transform:skewX(-11deg); z-index:-1; }
        .tag { font-weight:600; }
        .sticker { background:#0D1F3C; color:#FFFF00; padding:14px 40px 12px 26px; border-left:12px solid #FFFF00; }
        .sticker small { color:#FFFFFF; }` },
  }[s.layout];
  // No G o corte é vertical e mais à direita: empurrar a foto para a frente do carro não ficar tapada.
  const ph = Object.assign({ left: s.layout === 'G' ? 540 : 506, top: -6, width: 848 }, s.ph);
  const content = s.layout === 'G'
    ? `<div><div class="eyebrow" data-check>${s.eyebrow}</div><h1 data-check>${s.h1}</h1><div class="tag" data-check>${s.tag}</div></div>
       <div class="logo" data-box></div>`
    : `<div class="logo" data-box></div>
       <div><div class="eyebrow" data-box>${s.eyebrow}</div><h1 data-check>${s.h1}</h1><div class="tag" data-check>${s.tag}</div></div>
       ${s.chip ? `<div class="chip" data-box>${s.chip}</div>` : '<div></div>'}`;
  return {
    xTop: v.xTop, xBot: v.xBot,
    html: `<style>${BASE}
      body { --x-top:${v.xTop}px; --x-bot:${v.xBot}px; }
      .photo { position:absolute; left:${ph.left}px; top:${ph.top}px; width:${ph.width}px; }
      .shade { position:absolute; inset:0 0 0 400px;
        background:linear-gradient(180deg, rgba(10,11,13,.22) 0%, rgba(10,11,13,0) 26%, rgba(10,11,13,0) 66%, rgba(10,11,13,.40) 100%); }
      .panel { position:absolute; inset:0; clip-path:polygon(0 0, var(--x-top) 0, var(--x-bot) 100%, 0 100%); }
      .slash { position:absolute; inset:0;
        clip-path:polygon(var(--x-top) 0, calc(var(--x-top) + 12px) 0, calc(var(--x-bot) + 12px) 100%, var(--x-bot) 100%); }
      .grain { position:absolute; inset:0; opacity:.03; clip-path:polygon(0 0, var(--x-top) 0, var(--x-bot) 100%, 0 100%); background-image:${GRAIN}; }
      .content { left:64px; top:52px; bottom:54px; width:${v.xTop - 90}px; }
      .tag { max-width:${s.layout === 'G' ? 470 : 400}px; }
      .sticker { position:absolute; right:-18px; bottom:34px; box-shadow:0 10px 30px rgba(0,0,0,.35); }
      ${v.css}
    </style>
    <img class="photo" src="${s.photo}" alt="">
    <div class="shade"></div>
    ${stickerHtml(s.sticker)}
    <div class="panel"></div><div class="grain"></div><div class="slash"></div>${s.layout === 'G' ? '<div class="slash2"></div>' : ''}
    <div class="content">${content}</div>`,
  };
}

// F: foto em cartão inclinado com bloco amarelo desfasado, fundo navy e marca d'água.
function cardLayout(s) {
  return {
    edge: 'card',
    html: `<style>${BASE}
      body { --logo:#FFFF00; --eyebrow:#FFFF00; --ink:#FFFFFF; --em:#FFFF00; --tag:#C7CBD3; --chip-bg:transparent; --chip-ink:#FFFF00;
        background:radial-gradient(ellipse 70% 90% at 78% 45%, #13305A 0%, #0D1F3C 45%, #0A0B0D 100%); }
      .grain { position:absolute; inset:0; opacity:.035; background-image:${GRAIN}; }
      .wm { position:absolute; left:-24px; bottom:-96px; font-family:'Saira Condensed',sans-serif; font-style:italic; font-weight:900;
        font-size:400px; line-height:1; color:rgba(255,255,255,.045); white-space:nowrap; }
      .card-back { position:absolute; left:612px; top:104px; width:560px; height:420px; background:#FFFF00; border-radius:18px; transform:rotate(-3deg); }
      .card { position:absolute; left:592px; top:84px; width:560px; height:420px; border-radius:18px; overflow:hidden; transform:rotate(-3deg);
        box-shadow:0 30px 60px rgba(0,0,0,.55); }
      .card img { width:100%; height:100%; object-fit:cover; display:block; }
      .chip { border:3px solid #FFFF00; padding:11px 24px 9px; }
      .content { left:64px; top:52px; bottom:54px; width:500px; }
      .sticker { position:absolute; right:22px; bottom:44px; background:#FFFF00; color:#0A0B0D; transform:rotate(-3deg) skewX(-14deg);
        padding:12px 40px 10px 28px; box-shadow:0 10px 30px rgba(0,0,0,.45); }
      .sticker > div { transform:skewX(14deg); }
    </style>
    ${s.wm ? `<div class="wm">${s.wm}</div>` : ''}
    <div class="grain"></div>
    <div class="card-back"></div>
    <div class="card"><img src="${s.photo}" alt=""></div>
    ${stickerHtml(s.sticker)}
    <div class="content">
      <div class="logo" data-box></div>
      <div><div class="eyebrow" data-box>${s.eyebrow}</div><h1 data-check>${s.h1}</h1><div class="tag" data-check>${s.tag}</div></div>
      ${s.chip ? `<div class="chip" data-box>${s.chip}</div>` : '<div></div>'}
    </div>`,
  };
}

// H: foto do stand a toda a largura, escurecida à esquerda.
function fullLayout(s) {
  return {
    edge: 700,
    html: `<style>${BASE}
      body { --logo:#FFFF00; --eyebrow:#FFFF00; --ink:#FFFFFF; --em:#FFFF00; --tag:#E2E5EA; --chip-bg:#FFFF00; --chip-ink:#0A0B0D; }
      .photo { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:62% 50%; }
      .fade { position:absolute; inset:0; background:linear-gradient(90deg, rgba(10,11,13,.94) 0%, rgba(10,14,24,.86) 38%, rgba(13,31,60,.35) 62%, rgba(13,31,60,0) 78%); }
      .bar { position:absolute; left:0; right:0; bottom:0; height:12px; background:#FFFF00; }
      .content { left:64px; top:52px; bottom:62px; width:640px; }
      .pin { position:absolute; right:40px; top:40px; background:rgba(10,11,13,.78); color:#fff; font-family:'Saira Condensed',sans-serif;
        font-weight:700; font-size:26px; letter-spacing:3px; padding:12px 22px 10px; border-left:8px solid #FFFF00; }
    </style>
    <img class="photo" src="${s.photo}" alt="">
    <div class="fade"></div><div class="bar"></div>
    <div class="pin">JOANE · V. N. FAMALICÃO</div>
    <div class="content">
      <div class="logo" data-box></div>
      <div><div class="eyebrow" data-box>${s.eyebrow}</div><h1 data-check>${s.h1}</h1><div class="tag" data-check>${s.tag}</div></div>
      ${s.chip ? `<div class="chip" data-box>${s.chip}</div>` : '<div></div>'}
    </div>`,
  };
}

function build(s) {
  const L = s.layout === 'F' ? cardLayout(s) : s.layout === 'H' ? fullLayout(s) : slashLayout(s);
  const html = `<!DOCTYPE html><html lang="pt"><head><meta charset="utf-8">${FONTS}</head><body>${L.html}</body></html>`;
  return { html, L };
}

(async () => {
  const only = process.argv.slice(2);
  const list = only.length ? specs.filter(s => only.includes(s.slug)) : specs;
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
  for (const s of list) {
    const { html, L } = build(s);
    const file = path.join(OG, `_${s.slug}.html`);
    fs.writeFileSync(file, html);
    await p.goto(pathToFileURL(file).href, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(300);
    const m = await p.evaluate(({ xTop, xBot, edge }) => {
      const cardEl = document.querySelector('.card');
      const edgeAt = y => edge === 'card' ? cardEl.getBoundingClientRect().left
        : typeof edge === 'number' ? edge : xTop - (xTop - xBot) * y / 630;
      // Só o h1 encolhe; subtítulo, eyebrow, logo e chip são reportados à parte ("outros").
      const clear = (only) => {
        let min = Infinity;
        document.querySelectorAll(only || '[data-check]').forEach(el => {
          const r = document.createRange(); r.selectNodeContents(el);
          for (const rect of r.getClientRects()) if (rect.width) min = Math.min(min, edgeAt(rect.bottom) - rect.right);
        });
        if (!only) document.querySelectorAll('[data-box]').forEach(el => {
          const rect = el.getBoundingClientRect(); min = Math.min(min, edgeAt(rect.bottom) - rect.right);
        });
        return min;
      };
      const content = document.querySelector('.content');
      const h1 = document.querySelector('h1');
      let size = parseFloat(getComputedStyle(h1).fontSize);
      const fits = () => clear('h1') >= 24 &&content.scrollHeight <= content.clientHeight + 1;
      while (!fits() && size > 58) { size -= 2; h1.style.fontSize = size + 'px'; }
      const st = document.querySelector('.sticker');
      return { h1: size, clear: Math.round(clear('h1')), other: Math.round(clear()), overflow: content.scrollHeight - content.clientHeight,
        font: document.fonts.check('italic 900 40px "Saira Condensed"'),
        sticker: st ? Math.round(st.getBoundingClientRect().left) : null };
    }, { xTop: L.xTop, xBot: L.xBot, edge: L.edge });

    const png = await p.screenshot({ type: 'png' });
    const out = path.join(OUT, `og-${s.slug}-v1.jpg`);
    await sharp(png).resize(1920, 1008, { kernel: 'lanczos3' }).sharpen({ sigma: 0.5 })
      .jpeg({ quality: 92, chromaSubsampling: '4:4:4' }).toFile(out);
    await sharp(out).resize(600, 315, { kernel: 'lanczos3' }).png().toFile(path.join(FEED, `${s.slug}.png`));
    const kb = Math.round(fs.statSync(out).size / 1024);
    console.log(`${s.layout} ${s.slug.padEnd(62)} h1=${m.h1} folga=${m.clear} outros=${m.other} over=${m.overflow} font=${m.font} ${kb}KB${kb > 600 ? ' !!!' : ''}`);
  }
  await b.close();
})();
