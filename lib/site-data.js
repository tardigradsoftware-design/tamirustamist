import config from '../config.json';
import hizmetlerData from '../data/hizmetler.json';
import ilcelerData from '../data/ilceler.json';
import faqData from '../data/faq.json';
import referanslarData from '../data/referanslar.json';
import blogData from '../data/blog.json';

/* -------- firma -------- */
export const firma = config.firma;
export const sosyalMedya = config.sosyalMedya;
export const logo = config.logo;
export const siteUrl = (config.kargo_site || 'https://www.tamirustam.com').replace(/\/$/, '');
export const formEndpoint = config.form?.endpoint?.trim() || '';
export const ga4Id = (config.analitik?.ga4 || '').trim();
export const degerlendirme = config.firma?.degerlendirme || { puan: 4.9, yorumSayisi: 236 };
export const gmbUrl = (config.firma?.googleMyBusiness?.url || '').trim();

/* -------- hizmetler -------- */
export const kategoriler = hizmetlerData.kategoriler;
export const tümHizmetler = kategoriler.flatMap((k) =>
  k.hizmetler.map((h) => ({ ...h, kategori: k }))
);
export const hizmetMap = new Map(tümHizmetler.map((h) => [h.slug, h]));
export const tümHizmetSlugs = tümHizmetler.map((h) => h.slug);
export const kategoriMap = new Map(kategoriler.map((k) => [k.slug, k]));

export function getHizmet(slug) {
  return hizmetMap.get(slug) || null;
}
export function hizmetBazliSlugs(kategoriSlug) {
  return kategoriMap.get(kategoriSlug)?.hizmetler.map((h) => h.slug) || [];
}
export function kategoridenHizmetler(kategoriSlug) {
  return kategoriMap.get(kategoriSlug)?.hizmetler || [];
}

/* -------- ilçeler -------- */
export const ilceler = ilcelerData.ilceler;
export const ilceMap = new Map(ilceler.map((i) => [i.slug, i]));
export const tümIlceSlugs = ilceler.map((i) => i.slug);
export function getIlce(slug) {
  return ilceMap.get(slug) || null;
}
export function ilceAdi(slug) {
  return ilceMap.get(slug)?.ad || slug;
}

/* -------- SSS / referans / blog -------- */
export const faqGenel = faqData.genel;
export const faqSurec = faqData.surec;
export const referanslar = referanslarData;
export const bloglar = blogData;
export const blogMap = new Map(bloglar.map((b) => [b.slug, b]));

/* -------- hizmet referansı (B4: her hizmete ilçe bazlı müşteri yorumu) -------- */
const ilceSlugAd = new Map(ilceler.map((i) => [i.slug, i.ad]));
const ilceAddanSlug = new Map(ilceler.map((i) => [i.ad.trim().toLocaleLowerCase('tr-TR'), i.slug]));

function refIlceSlug(r) {
  if (r.ilceSlug) return r.ilceSlug;
  const ad = (r.ilce || '').trim().toLocaleLowerCase('tr-TR');
  return ilceAddanSlug.get(ad) || '';
}

export function getHizmetReferanslari(hizmetSlug, ilceSlug = '') {
  const h = getHizmet(hizmetSlug);
  if (!h) return [];
  const sonuc = [];
  const eklenen = new Set();

  const ekle = (r) => {
    const key = r.ad + r.ilce + r.yorum.slice(0, 24);
    if (!eklenen.has(key) && sonuc.length < 2) {
      eklenen.add(key);
      sonuc.push(r);
    }
  };

  // 1) Birebir eşleşme: hizmet + ilçe
  if (ilceSlug) {
    referanslar
      .filter((r) => r.hizmetSlug === hizmetSlug && refIlceSlug(r) === ilceSlug)
      .forEach(ekle);
  }
  // 2) Hizmet eşleşmesi (herhangi bir ilçe)
  referanslar.filter((r) => r.hizmetSlug === hizmetSlug).forEach(ekle);
  // 3) Hizmetin kendi gömülü referansları (derlenen veri)
  (h.referanslar || []).forEach(ekle);
  // 4) Aynı kategorideki diğer hizmetlerin referansları
  if (!sonuc.length && h.kategori) {
    for (const dh of h.kategori.hizmetler) {
      if (dh.slug === hizmetSlug) continue;
      (dh.referanslar || []).forEach(ekle);
      if (sonuc.length >= 2) break;
    }
  }
  // 5) İlçe genelindeki herhangi bir referans
  if (sonuc.length < 2 && ilceSlug) {
    referanslar.filter((r) => refIlceSlug(r) === ilceSlug).forEach(ekle);
  }
  return sonuc.slice(0, 2);
}

export function getKategoriGorselleri(hizmetSlug) {
  const h = getHizmet(hizmetSlug);
  if (!h?.gorseller?.length) return [];
  return h.gorseller;
}

/* -------- yardımcılar -------- */
export function slugToTitle(slug) {
  return slug
    .split('-')
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ');
}

export function cleanText(text) {
  return (text || '')
    .replace(/<[^>]*>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

export function metaDescription(text) {
  const t = cleanText(text);
  return t.length > 160 ? t.slice(0, 157).trim() + '…' : t;
}