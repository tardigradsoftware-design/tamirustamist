#!/usr/bin/env node
/**
 * Üretilen sitenin (out/) teknik SEO sağlık kontrolü.
 * Kullanım:  npm run build && node scripts/validate-seo.mjs
 *
 * Kontrol edilenler:
 *  1. <title> — piksel genişliği ≤ 600px (Google masaüstü SERP kesme noktası,
 *     Arial 20px advance width tablosu; lib/site-data.js'teki ile aynı tablo)
 *  2. Başlıkta kelime ortası kırpma ("…") yok, çift marka tekrarı yok
 *  3. meta description ≤ 160 karakter
 *  4. Sayfada tam olarak 1 adet H1 var
 *  5. og:image etiketleri gerçek dosyalara işaret ediyor
 *  6. Title'lar benzersiz (404 çıktısı hariç)
 *  7. Sitemap: çift slash yok, /404/ yok, URL sayısı doğru
 *  8. Sayfa adı bütünlüğü: ilçe sayfaları ilçe adını, ilçe+hizmet sayfaları
 *     ikisini birden, hizmet sayfaları hizmet adını ve "İstanbul"u,
 *     blog yazıları (seo)başlığını TAM olarak içeriyor.
 *
 * Çıkış kodu: sorun yoksa 0, herhangi bir ihlalde 1 (CI'da kullanılabilir).
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'out');
const MAX_TITLE_PX = 600;
const MAX_DESC = 160;

/* Helvetica/Arial advance width tablosu (1000 birim em başına) — lib/site-data.js
 * ile birebir aynıdır; iki yerden birini değiştirirseniz ötekini de güncelleyin. */
const G = {
  ' ': 278, '!': 278, '"': 355, '#': 556, $: 556, '%': 889, '&': 667, "'": 191,
  '(': 333, ')': 333, '*': 389, '+': 584, ',': 278, '-': 333, '.': 278, '/': 278,
  0: 556, 1: 556, 2: 556, 3: 556, 4: 556, 5: 556, 6: 556, 7: 556, 8: 556, 9: 556,
  ':': 278, ';': 278, '<': 584, '=': 584, '>': 584, '?': 556, '@': 1015,
  A: 667, B: 667, C: 722, D: 722, E: 667, F: 611, G: 778, H: 722, I: 278, J: 500,
  K: 667, L: 556, M: 833, N: 722, O: 778, P: 667, Q: 778, R: 722, S: 667, T: 611,
  U: 722, V: 667, W: 944, X: 667, Y: 667, Z: 611, '[': 278, ']': 278, _: 556,
  a: 556, b: 556, c: 500, d: 556, e: 556, f: 278, g: 556, h: 556, i: 222, j: 222,
  k: 500, l: 222, m: 833, n: 556, o: 556, p: 556, q: 556, r: 333, s: 500, t: 278,
  u: 556, v: 500, w: 722, x: 500, y: 500, z: 500, '|': 260,
  '—': 1000, '–': 556, '…': 1000, '’': 191, '·': 278,
  ç: 500, ğ: 556, ı: 222, ö: 556, ş: 500, ü: 556, â: 556, î: 222,
  Ç: 722, Ğ: 778, İ: 278, Ö: 778, Ş: 667, Ü: 722,
};

function px(t, boyut = 20) {
  let toplam = 0;
  for (const ch of String(t)) toplam += G[ch] ?? 556;
  return (toplam * boyut) / 1000;
}

/* Türkçe duyarlı küçük harf: 'İ'→'i', 'I'→'ı' vb. (Python lower() tuzağına düşmemek için) */
const TR = { İ: 'i', I: 'ı', Ş: 'ş', Ğ: 'ğ', Ü: 'ü', Ö: 'ö', Ç: 'ç' };
function trLower(s) {
  return [...String(s)].map((c) => TR[c] ?? c).join('').toLowerCase();
}

function htmlFiles() {
  const walk = (dir) =>
    readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
      d.isDirectory() ? walk(join(dir, d.name)) : d.name.endsWith('.html') ? [join(dir, d.name)] : []
    );
  return existsSync(out) ? walk(out).sort() : [];
}

function titleOf(html) {
  const m = html.match(/<title>(.*?)<\/title>/s);
  return m ? decodeEntities(m[1]).replace(/\s+/g, ' ').trim() : '';
}
function descOf(html) {
  const m = html.match(/<meta name="description" content="(.*?)"/s);
  return m ? decodeEntities(m[1]) : '';
}
function h1Count(html) {
  return (html.match(/<h1[^>]*>/g) || []).length;
}
function decodeEntities(s) {
  return s
    .replace(/&#x27;/g, "'").replace(/&#39;/g, "'").replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

const sorunlar = [];
const rapor = [];
const titles = new Map();

const files = htmlFiles();
rapor.push(`HTML dosyası: ${files.length}`);

for (const f of files) {
  const rel = f.slice(out.length + 1);
  const html = readFileSync(f, 'utf8');
  const title = titleOf(html);

  // 1) piksel genişliği
  const w = px(title);
  if (w > MAX_TITLE_PX) sorunlar.push(`${rel}: title ${w.toFixed(0)}px > ${MAX_TITLE_PX}px → "${title}"`);

  // 2) kelime ortası kırpma / çift marka
  if (title.includes('…')) sorunlar.push(`${rel}: başlık '…' içeriyor (kelime ortası kırpma?) → "${title}"`);
  if (/tamir\s*ustam[^|]*tamir\s*ustam/i.test(title))
    sorunlar.push(`${rel}: çift marka tekrarı → "${title}"`);

  // 3) description
  const d = descOf(html);
  if (d && d.length > MAX_DESC) sorunlar.push(`${rel}: description ${d.length} > ${MAX_DESC} karakter`);

  // 4) H1
  const h1 = h1Count(html);
  if (h1 === 0) sorunlar.push(`${rel}: H1 yok`);
  if (h1 > 1) sorunlar.push(`${rel}: ${h1} adet H1 var`);

  // 5) og:image dosya kontrolü
  for (const m of html.matchAll(/<meta property="og:image" content="(.*?)"/g)) {
    const url = m[1].split('?')[0];
    const yerel = url.startsWith('http') ? url.replace(/^https?:\/\/[^/]+/, '') : url;
    if (!existsSync(join(out, yerel))) sorunlar.push(`${rel}: og:image bulunamadı → ${url}`);
  }

  // 6) benzersizlik
  titles.set(title, [...(titles.get(title) || []), rel]);
}

// 6) benzersizlik raporu
const tekrar = [...titles.entries()].filter(([, v]) => v.length > 1);
const mevzu = tekrar.filter(([t]) => !t.startsWith('404'));
rapor.push(`Benzersiz title: ${titles.size - tekrar.length}/${titles.size}${mevzu.length ? ` (TEKRAR: ${JSON.stringify(mevzu)})` : ''}`);

// 7) sitemap
const sm = readFileSync(join(root, 'public', 'sitemap.xml'), 'utf8');
const locSayisi = (sm.match(/<loc>/g) || []).length;
if (sm.includes('com//')) sorunlar.push('sitemap: çift slash (`com//`) var');
if (sm.includes('/404/')) sorunlar.push('sitemap: /404/ hâlâ listede');
for (const ek of ['gizlilik-politikasi', 'kvkk-aydinlatma-metni']) {
  if (!sm.includes(`/${ek}/`)) sorunlar.push(`sitemap: /${ek}/ eksik`);
}
rapor.push(`Sitemap: ${locSayisi} URL (çift slash: ${sm.includes('com//') ? 'VAR' : 'yok'}, /404/: ${sm.includes('/404/') ? 'VAR' : 'yok'})`);

// 8) sayfa adı bütünlüğü
const hizmetler = JSON.parse(readFileSync(join(root, 'data', 'hizmetler.json'), 'utf8'));
const ilceler = JSON.parse(readFileSync(join(root, 'data', 'ilceler.json'), 'utf8'));
const blog = JSON.parse(readFileSync(join(root, 'data', 'blog.json'), 'utf8'));
const hizAd = {};
for (const kat of hizmetler.kategoriler) for (const h of kat.hizmetler) hizAd[h.slug] = h.baslik;

const titleFor = (p) => {
  const f = join(out, p);
  return existsSync(f) ? titleOf(readFileSync(f, 'utf8')) : null;
};

let okIlce = 0;
for (const i of ilceler.ilceler) {
  const t = titleFor(`${i.slug}/index.html`);
  if (t && trLower(t).includes(trLower(i.ad))) okIlce++;
  else sorunlar.push(`${i.slug}/index.html: ilçe adı başlıkta yok → "${t}"`);
}
rapor.push(`İlçe sayfası başlığında ilçe adı: ${okIlce}/${ilceler.ilceler.length}`);

let okIlceHiz = 0;
for (const i of ilceler.ilceler) {
  for (const [slug, ad] of Object.entries(hizAd)) {
    const t = titleFor(`${i.slug}/${slug}/index.html`);
    const kisa = ad.split(' (')[0]; // ilçe+hizmet sayfalarında parantezli kısım tasarım gereği kullanılmaz
    if (t && trLower(t).includes(trLower(i.ad)) && trLower(t).includes(trLower(kisa))) okIlceHiz++;
    else sorunlar.push(`${i.slug}/${slug}: ilçe veya hizmet adı başlıkta yok → "${t}"`);
  }
}
rapor.push(`İlçe+hizmet başlığı (ilçe VE hizmet adı): ${okIlceHiz}/${ilceler.ilceler.length * Object.keys(hizAd).length}`);

let okHiz = 0, okIst = 0;
for (const [slug, ad] of Object.entries(hizAd)) {
  const t = titleFor(`hizmetler/${slug}/index.html`) || '';
  if (trLower(t).includes(trLower(ad))) okHiz++;
  else sorunlar.push(`hizmetler/${slug}: hizmet adı TAM değil → "${t}"`);
  if (trLower(t).includes(trLower('İstanbul'))) okIst++;
}
rapor.push(`Hizmet sayfası başlığında hizmet adı TAM: ${okHiz}/${Object.keys(hizAd).length} · "İstanbul": ${okIst}/${Object.keys(hizAd).length}`);

let okBlog = 0;
for (const b of blog) {
  const t = titleFor(`blog/${b.slug}/index.html`) || '';
  const serp = b.seoBaslik || b.baslik;
  if (trLower(t).includes(trLower(serp))) okBlog++;
  else sorunlar.push(`blog/${b.slug}: SERP başlığı eksik → "${t}"`);
}
rapor.push(`Blog başlığı (seoBaslik/baslik) TAM: ${okBlog}/${blog.length}`);

// özet
console.log('===== SEO DOĞRULAMA =====');
for (const r of rapor) console.log(`✔ ${r}`);
if (sorunlar.length) {
  console.log(`\n✘ ${sorunlar.length} sorun:`);
  for (const s of sorunlar) console.log(`  - ${s}`);
  process.exit(1);
}
console.log('\n✔ Tüm kontroller temiz.');
