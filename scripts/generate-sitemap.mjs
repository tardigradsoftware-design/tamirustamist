#!/usr/bin/env node
/**
 * public/sitemap.xml + public/robots.txt üretir (npm run build sonrası çalışır).
 * Kapsam: ana sayfa, hakkimizda, iletisim, hizmetler, 54 hizmet detay,
 * 25 ilçe, 25×54 lokasyon+hizmet (1350), blog, 404.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outPublic = join(root, 'public');
if (!existsSync(outPublic)) writeFileSync(join(root, '.sitemap-tmp'), '');

const config = JSON.parse(readFileSync(join(root, 'config.json'), 'utf8'));
const base = (config.kargo_site || 'https://www.tamirustam.com').replace(/\/+$/, '');

const hizmetler = JSON.parse(readFileSync(join(root, 'data', 'hizmetler.json'), 'utf8'));
const ilceler = JSON.parse(readFileSync(join(root, 'data', 'ilceler.json'), 'utf8'));
const blog = JSON.parse(readFileSync(join(root, 'data', 'blog.json'), 'utf8'));

const urls = new Map();

function add(path, priority, changefreq = 'monthly', lastmod = '2026-08-25') {
  // Boş/'/' girdi ana sayfadır: tek slash üret (önceden `//` oluşuyordu)
  const temiz = String(path).replace(/^\/+|\/+$/g, '');
  const p = temiz ? `/${temiz}/` : '/';
  urls.set(p, { p, priority, changefreq, lastmod });
}

add('', 1.0, 'weekly');
add('hakkimizda', 0.7);
add('iletisim', 0.8);
add('hizmetler', 0.9);
add('blog', 0.6, 'weekly');
add('gizlilik-politikasi', 0.2, 'yearly');
add('kvkk-aydinlatma-metni', 0.2, 'yearly');
// Not: /404/ bilerek eklenmez — robots.txt onu Disallow ediyor.

for (const kat of hizmetler.kategoriler) {
  for (const h of kat.hizmetler) {
    add(`hizmetler/${h.slug}`, 0.9, 'monthly');
  }
}

for (const i of ilceler.ilceler) {
  add(i.slug, 0.9, 'monthly');
  for (const h of hizmetler.kategoriler.flatMap((k) => k.hizmetler)) {
    add(`${i.slug}/${h.slug}`, 0.5, 'monthly');
  }
}

for (const b of blog) {
  add(`blog/${b.slug}`, 0.6, 'yearly', b.tarih);
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${[...urls.values()]
  .map((u) => {
    const xlink = `<xhtml:link rel="alternate" hreflang="tr-TR" href="${base}${u.p}"/><xhtml:link rel="alternate" hreflang="x-default" href="${base}${u.p}"/>`;
    return `  <url>\n    <loc>${base}${u.p}</loc>\n    ${xlink}\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`;
  })
  .join('\n')}\n</urlset>\n`;

writeFileSync(join(root, 'public', 'sitemap.xml'), xml, 'utf8');

const robots = `User-agent: *
Allow: /
Disallow: /404/

Sitemap: ${base}/sitemap.xml
`;
writeFileSync(join(root, 'public', 'robots.txt'), robots, 'utf8');

console.log(`✔ sitemap.xml: ${urls.size} URL · robots.txt üretildi`);