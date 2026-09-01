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

/* Puan/yorum rozeti ve AggregateRating schema'sı yalnızca config.json'da
 * `degerlendirme.yayinla: true` ise gösterilir. Google İşletme Profili
 * doğrulanıp gerçek yorumlar birikene kadar false bırakın: uydurma puan
 * yayınlamak yapılandırılmış veri spam politikası ihlalidir. */
export const puanYayinda =
  Boolean(degerlendirme?.yayinla) && Number(degerlendirme?.yorumSayisi) > 0;

/** Schema nesnesine güvenle yayılacak aggregateRating parçası (yoksa boş). */
export const aggregateRatingSchema = puanYayinda
  ? {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: String(degerlendirme.puan),
        reviewCount: String(degerlendirme.yorumSayisi),
      },
    }
  : {};

/* -------- hizmetler -------- */
export const kategoriler = hizmetlerData.kategoriler;
export const tümHizmetler = kategoriler.flatMap((k) =>
  k.hizmetler.map((h) => ({ ...h, kategori: k }))
);
export const hizmetMap = new Map(tümHizmetler.map((h) => [h.slug, h]));
export const tümHizmetSlugs = tümHizmetler.map((h) => h.slug);
export const kategoriMap = new Map(kategoriler.map((k) => [k.slug, k]));

/* Client tarafı liste bileşeni için zenginleştirilmiş view:
 *   her hizmete _kategoriSlug / _kategoriBaslik / _kategoriIkon eklendi
 *   (öne eklendiğinden bellek-friendlier sıralama için) */
export const tümHizmetlerForList = tümHizmetler.map((h) => ({
  ...h,
  _kategoriSlug: h.kategori.slug,
  _kategoriBaslik: h.kategori.baslik,
  _kategoriIkon: h.kategori.ikon,
}));

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

/* -------- <title> üretimi --------
 * Google başlıkları KARAKTER sayısıyla değil, PİKSEL genişliğiyle keser:
 * masaüstü SERP'te ~600px (Arial 20px). Yaygın "60 karakter" kuralı bunun
 * kaba bir yaklaşımıdır ve Türkçe metinde yanıltıcıdır — "ı, l, i, t" gibi
 * dar harfler bolca geçtiği için 65 karakterlik bir başlık rahatça sığabilir.
 * Bu yüzden gerçek ölçüt olarak piksel genişliği kullanılır.
 *
 * Kök layout'ta `title.template` KULLANILMAZ; her sayfa kendi tam başlığını
 * pageTitle() ile üretir. Aksi hâlde marka adı iki kez eklenir (Google'ın
 * "boilerplate tekrarı" yeniden yazma tetikleyicisi) ve karakter kırpması
 * template'ten önce çalıştığı için işlevsiz kalır. */

/** Masaüstü SERP kesme noktası (px). Arial 20px varsayımı. */
export const MAX_TITLE_PX = 600;

/* Helvetica/Arial advance width tablosu (1000 birim em başına). */
const GENISLIK = {
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
  // Türkçe karakterler taban harflerin genişliğini alır
  ç: 500, ğ: 556, ı: 222, ö: 556, ş: 500, ü: 556, â: 556, î: 222,
  Ç: 722, Ğ: 778, İ: 278, Ö: 778, Ş: 667, Ü: 722,
};

/** Metnin masaüstü SERP'teki yaklaşık piksel genişliği. */
export function titlePx(text, boyut = 20) {
  let toplam = 0;
  for (const ch of String(text)) toplam += GENISLIK[ch] ?? 556;
  return (toplam * boyut) / 1000;
}

function kirp(text, limitPx) {
  if (titlePx(text) <= limitPx) return text;
  const kelimeler = text.split(' ');
  let sonuc = '';
  for (const k of kelimeler) {
    const aday = sonuc ? `${sonuc} ${k}` : k;
    if (titlePx(`${aday}…`) > limitPx) break;
    sonuc = aday;
  }
  if (!sonuc) sonuc = text.slice(0, 20);
  return sonuc.replace(/[\s,.;:|\-–—·]+$/, '') + '…';
}

const MARKA_SONEK_RE = /\s*[|\-–—·]\s*(tamir\s*ustam(\s*i̇stanbul)?)\s*$/i;

/**
 * Sayfa başlığını SERP'e sığdırır. Bilgiyi önem sırasına göre korur;
 * kırpma yalnızca son çare:
 *   1. gövde + konum + marka
 *   2. gövde + konum           (marka düşer — konum yerel SEO'da daha değerli)
 *   3. gövde + marka           (konum düşer)
 *   4. gövde
 *   5. kırpılmış gövde
 * Marka son eki asla iki kez eklenmez.
 */
export function pageTitle(base, { marka = firma.kisaAd, konum = '', limitPx = MAX_TITLE_PX } = {}) {
  const govde = cleanText(base).replace(MARKA_SONEK_RE, '').trim();
  const sonek = ` | ${marka}`;
  const ileKonum = konum ? `${govde} — ${konum}` : govde;

  for (const aday of [ileKonum + sonek, ileKonum, govde + sonek, govde]) {
    if (titlePx(aday) <= limitPx) return aday;
  }
  return kirp(govde, limitPx);
}

/* -------- sosyal paylaşım görseli -------- */
export const ogGorselVarsayilan = `${siteUrl}/images/og.jpg`;

/** OG/Twitter görsel dizisi üretir; yol verilmezse varsayılan afişe düşer. */
export function ogGorsel(yol, alt = firma.ad) {
  const url = !yol ? ogGorselVarsayilan : yol.startsWith('http') ? yol : `${siteUrl}${yol}`;
  return [{ url, width: 1200, height: 630, alt }];
}
