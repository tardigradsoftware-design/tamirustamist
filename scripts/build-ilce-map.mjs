#!/usr/bin/env node
/**
 * İstanbul Avrupa Yakası 25 ilçenin GERÇEK sınırlarını GeoJSON'dan sadeleştirilmiş
 * SVG path verisine dönüştürür ve lib/ilce-harita-data.js olarak yazar.
 *
 * Kaynak veri: https://github.com/sahircansurmeli/istanbul-geojson (ilce_geojson.json, OSM/Nominatim)
 *   Kullanım: node scripts/build-ilce-map.mjs <ilce_geojson.json yolu>
 *   (Kaynak ~2.7MB — bilinçli olarak repo'ya konmaz; derleme öncesi indirilir.)
 *
 * Çıktı: lib/ilce-harita-data.js  →  ilceHarita: [{slug, ad, d, cx, cy, fs}], viewBox: "0 0 W H"
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const kaynak = process.argv[2] || '/tmp/istanbul-geojson-master/ilce_geojson.json';

/* ---------- yardımcılar ---------- */
function normalizeTR(s) {
  const map = { ç: 'c', Ç: 'C', ğ: 'g', Ğ: 'G', ı: 'i', İ: 'I', ö: 'o', Ö: 'O', ş: 's', Ş: 'S', ü: 'u', Ü: 'U', â: 'a', Â: 'A' };
  return s.replace(/[çğışüöâÇĞİŞÜÖÂ]/g, (ch) => map[ch]).toLowerCase();
}

/* Ramer–Douglas–Peucker — 2B nokta sadeleştirme */
function distToSeg(p, a, b) {
  const dx = b[0] - a[0], dy = b[1] - a[1];
  const len2 = dx * dx + dy * dy;
  if (len2 === 0) return Math.hypot(p[0] - a[0], p[1] - a[1]);
  let t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / len2;
  t = Math.max(0, Math.min(1, t));
  const qx = a[0] + t * dx, qy = a[1] + t * dy;
  return Math.hypot(p[0] - qx, p[1] - qy);
}
function rdp(points, eps) {
  if (points.length < 4) return points;
  const keep = new Array(points.length).fill(false);
  keep[0] = keep[points.length - 1] = true;
  const stack = [[0, points.length - 1]];
  while (stack.length) {
    const [s, e] = stack.pop();
    let maxD = 0, idx = -1;
    for (let i = s + 1; i < e; i++) {
      const d = distToSeg(points[i], points[s], points[e]);
      if (d > maxD) { maxD = d; idx = i; }
    }
    if (idx !== -1 && maxD > eps) {
      keep[idx] = true;
      stack.push([s, idx], [idx, e]);
    }
  }
  return points.filter((_, i) => keep[i]);
}

function ringAlan(points) {
  let a = 0;
  for (let i = 0; i < points.length - 1; i++) {
    a += points[i][0] * points[i + 1][1] - points[i + 1][0] * points[i][1];
  }
  return Math.abs(a / 2);
}
function ringCentroid(points) {
  let cx = 0, cy = 0, a = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const f = points[i][0] * points[i + 1][1] - points[i + 1][0] * points[i][1];
    a += f;
    cx += (points[i][0] + points[i + 1][0]) * f;
    cy += (points[i][1] + points[i + 1][1]) * f;
  }
  a *= 0.5;
  return [cx / (6 * a), cy / (6 * a)];
}
function noktaIcinde(p, ring) {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const xi = ring[i][0], yi = ring[i][1], xj = ring[j][0], yj = ring[j][1];
    if (yi > p[1] !== yj > p[1] && p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

/* ---------- ana akış ---------- */
const data = JSON.parse(readFileSync(kaynak, 'utf8'));

const avrupa = [
  ['arnavutkoy', 'Arnavutköy'], ['avcilar', 'Avcılar'], ['bagcilar', 'Bağcılar'],
  ['bahcelievler', 'Bahçelievler'], ['bakirkoy', 'Bakırköy'], ['basaksehir', 'Başakşehir'],
  ['bayrampasa', 'Bayrampaşa'], ['besiktas', 'Beşiktaş'], ['beylikduzu', 'Beylikdüzü'],
  ['beyoglu', 'Beyoğlu'], ['buyukcekmece', 'Büyükçekmece'], ['catalca', 'Çatalca'],
  ['esenler', 'Esenler'], ['esenyurt', 'Esenyurt'], ['eyupsultan', 'Eyüpsultan'],
  ['fatih', 'Fatih'], ['gaziosmanpasa', 'Gaziosmanpaşa'], ['gungoren', 'Güngören'],
  ['kagithane', 'Kâğıthane'], ['kucukcekmece', 'Küçükçekmece'], ['sariyer', 'Sarıyer'],
  ['silivri', 'Silivri'], ['sultangazi', 'Sultangazi'], ['sisli', 'Şişli'],
  ['zeytinburnu', 'Zeytinburnu'],
];

const slugByNorm = new Map(avrupa.map(([slug, ad]) => [normalizeTR(ad), slug]));
const adBySlug = new Map(avrupa.map(([slug, ad]) => [slug, ad]));

const cokgenler = [];
for (const f of data.features) {
  const gname = f.properties.display_name.split(',')[0].trim();
  const slug = slugByNorm.get(normalizeTR(gname));
  if (!slug || !f.geometry) continue;
  const g = f.geometry;
  const polys = g.type === 'Polygon' ? [g.coordinates] : g.coordinates;
  for (const poly of polys) {
    cokgenler.push({ slug, rings: poly });
  }
}
console.log('ilçe çokgeni alındı:', cokgenler.length);

/* sınırlar (tüm noktalardan) */
let minLng = Infinity, maxLng = -Infinity, minLat = Infinity, maxLat = -Infinity;
for (const cp of cokgenler) {
  for (const ring of cp.rings) {
    for (const [lng, lat] of ring) {
      if (lng < minLng) minLng = lng;
      if (lng > maxLng) maxLng = lng;
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
    }
  }
}
const padY = 18; /* üstte/karadeniz etiketi için boşluk */
const W = 760, H = Math.round(760 * ((maxLat - minLat) / ((maxLng - minLng) * Math.cos(((minLat + maxLat) / 2) * Math.PI / 180))) ) + padY * 2;
const midLat = ((minLat + maxLat) / 2) * Math.PI / 180;
const cosMid = Math.cos(midLat);
const k = (H - padY * 2) / (maxLat - minLat); // dikey uyum; yatay cos ile korunur
const offX = (W - (maxLng - minLng) * cosMid * k) / 2;
const proj = (lng, lat) => [((lng - minLng) * cosMid * k) + offX, (maxLat - lat) * k + padY];

const EPS = 2.2; /* RDP toleransı (px) */
const dilim = [];
let toplamNokta = 0;
for (const slug of avrupa.map((x) => x[0])) {
  const ilcePolys = cokgenler.filter((c) => c.slug === slug);
  if (!ilcePolys.length) throw new Error(`poligon yok: ${slug}`);

  const paths = []; // [d, alan]
  let enBuyuk = null;
  for (const poly of ilcePolys) {
    const dKatman = [];
    for (let rIdx = 0; rIdx < poly.rings.length; rIdx++) {
      let ring = poly.rings[rIdx].map(([lng, lat]) => proj(lng, lat));
      ring = rdp(ring, EPS);
      if (ring.length < 3) continue;
      toplamNokta += ring.length;
      const d = ring.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join('') + 'Z';
      const alan = ringAlan(ring);
      dKatman.push({ d, alan, ring, dis: rIdx === 0 });
      if (rIdx === 0 && (!enBuyuk || alan > enBuyuk.alan)) enBuyuk = { alan, ring };
    }
    // dış + delikler tek path'te (evenodd)
    if (dKatman.length) {
      const ana = dKatman.find((x) => x.dis) || dKatman[0];
      const delikler = dKatman.filter((x) => x !== ana);
      const d = [ana.d, ...delikler.map((x) => x.d)].join('');
      paths.push({ d, alan: ana.alan });
    }
  }
  if (!enBuyuk) throw new Error(`bos: ${slug}`);
  const anaCog = ringCentroid(enBuyuk.ring);
  let cog = anaCog;
  if (!noktaIcinde(cog, enBuyuk.ring)) {
    const ort = enBuyuk.ring.reduce((a, p) => [a[0] + p[0], a[1] + p[1]], [0, 0]);
    const c2 = [ort[0] / enBuyuk.ring.length, ort[1] / enBuyuk.ring.length];
    cog = noktaIcinde(c2, enBuyuk.ring) ? c2 : anaCog;
  }
  const alanToplam = paths.reduce((a, p) => a + p.alan, 0);
  const fs = Math.max(9, Math.min(16, Math.round(0.3 * Math.sqrt(alanToplam))));
  dilim.push({ slug, ad: adBySlug.get(slug), d: paths.map((p) => p.d).join(''), cx: +cog[0].toFixed(1), cy: +cog[1].toFixed(1), fs });
}

console.log('toplam path noktası:', toplamNokta, '| viewBox:', `0 0 ${W} ${H}`);
const cikti = `/* BU DOSYA OTOMATIK ÜRETİLİR: node scripts/build-ilce-map.mjs <geojson>
 * İstanbul Avrupa Yakası 25 ilçe — gerçek sınırlar (OSM/Nominatim verisi, sadeleştirilmiş).
 * d = SVG path (evenodd, delikler dahil), cx/cy = etiket merkezi, fs = etiket boyutu. */
export const ilceHarita = ${JSON.stringify(dilim)};
export const haritaViewBox = "0 0 ${W} ${H}";
`;
writeFileSync(join(root, 'lib', 'ilce-harita-data.js'), cikti, 'utf8');
console.log(`✔ lib/ilce-harita-data.js yazıldı (${dilim.length} ilçe, ${(cikti.length / 1024).toFixed(1)} KB)`);