#!/usr/bin/env node
/**
 * data/*.json dosyalarını doğrular ve data/hizmetler.json + data/ilceler.json
 * tek dosyalarını üretir. (npm run build öncesi / her değişiklikte çalıştırılır)
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

/* ---------- HİZMETLER ---------- */
const katDosyalari = readdirSync(join(root, 'data', 'hizmetler'))
  .filter((f) => f.endsWith('.json'))
  .sort();

const kategoriler = katDosyalari.map((f) =>
  JSON.parse(readFileSync(join(root, 'data', 'hizmetler', f), 'utf8'))
);

const tumSlugs = new Set();
let sayac = 0;
for (const kat of kategoriler) {
  for (const h of kat.hizmetler) {
    sayac += 1;
    if (tumSlugs.has(h.slug)) {
      throw new Error(`DUPLICATE service slug: ${h.slug}`);
    }
    tumSlugs.add(h.slug);
    if (!h.detay || h.detay.length < 120) {
      throw new Error(`Service "${h.slug}" detay cok kisa`);
    }
    if (!Array.isArray(h.sss) || h.sss.length < 4) {
      throw new Error(`Service "${h.slug}" en az 5 SSS olmali`);
    }
  }
}
if (sayac !== 54) {
  throw new Error(`54 hizmet bekleniyordu, ${sayac} bulundu`);
}

writeFileSync(
  join(root, 'data', 'hizmetler.json'),
  JSON.stringify({ kategoriler }, null, 2),
  'utf8'
);
console.log(`✔ hizmetler.json: ${sayac} hizmet, ${kategoriler.length} kategori`);

/* ---------- İLÇELER ---------- */
const ilceDosyalari = readdirSync(join(root, 'data', 'ilceler'))
  .filter((f) => f.endsWith('.json'))
  .sort();

const beklenenIlceler = [
  'arnavutkoy', 'avcilar', 'bagcilar', 'bahcelievler', 'bakirkoy',
  'basaksehir', 'bayrampasa', 'besiktas', 'beylikduzu', 'beyoglu',
  'buyukcekmece', 'catalca', 'esenler', 'esenyurt', 'eyupsultan',
  'fatih', 'gaziosmanpasa', 'gungoren', 'kagithane', 'kucukcekmece',
  'sariyer', 'silivri', 'sultangazi', 'sisli', 'zeytinburnu'
];

const ilceler = ilceDosyalari.map((f) =>
  JSON.parse(readFileSync(join(root, 'data', 'ilceler', f), 'utf8'))
);

const mevcut = ilceler.map((i) => i.slug).sort();
const eksik = beklenenIlceler.filter((b) => !mevcut.includes(b));
if (eksik.length) throw new Error(`Eksik ilce: ${eksik.join(', ')}`);

for (const ilce of ilceler) {
  for (const vh of ilce.vurguluHizmetler || []) {
    if (!tumSlugs.has(vh)) {
      throw new Error(`hizmet bulunamadı (${ilce.slug}): ${vh}`);
    }
  }
  if (!ilce.giris || ilce.giris.length < 250) {
    throw new Error(`ilce giris cok kisa: ${ilce.slug}`);
  }
}

// standart sıra
ilceler.sort((a, b) => beklenenIlceler.indexOf(a.slug) - beklenenIlceler.indexOf(b.slug));
writeFileSync(
  join(root, 'data', 'ilceler.json'),
  JSON.stringify({ ilceler }, null, 2),
  'utf8'
);
console.log(`✔ ilceler.json: ${ilceler.length} ilce`);

/* ---------- DİĞER VERİLER (sadece doğrulama) ---------- */
const blog = JSON.parse(readFileSync(join(root, 'data', 'blog.json'), 'utf8'));
if (blog.length < 4) throw new Error('Blog yazisi yetersiz');
const ref = JSON.parse(readFileSync(join(root, 'data', 'referanslar.json'), 'utf8'));
if (ref.length < 6) throw new Error('Referans yetersiz');
console.log(`✔ blog: ${blog.length} yazi, referanslar: ${ref.length}`);