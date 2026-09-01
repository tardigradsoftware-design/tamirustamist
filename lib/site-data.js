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
 * Google SERP'te başlık ~60 karakterde kesilir. Kök layout'ta `template`
 * KULLANILMAZ; her sayfa kendi tam başlığını bu yardımcı ile üretir.
 * Böylece marka adının iki kez eklenmesi (…| Tamir Ustam | Tamir Ustam)
 * ve kırpmanın template'ten önce yapılması sorunları ortadan kalkar. */
export const MAX_TITLE = 60;

const MARKA_SONEK_RE = /\s*[|\-–—·]\s*(tamir\s*ustam(\s*i̇stanbul)?)\s*$/i;

function kirp(text, limit) {
  if (text.length <= limit) return text;
  const kesik = text.slice(0, limit - 1);
  const bosluk = kesik.lastIndexOf(' ');
  const govde = bosluk > limit * 0.6 ? kesik.slice(0, bosluk) : kesik;
  return govde.replace(/[\s,.;:|\-–—·]+$/, '') + '…';
}

/**
 * Sayfa başlığını 60 karaktere sığdırır. Bilgiyi önem sırasına göre korur;
 * kırpma yalnızca son çare olarak uygulanır:
 *   1. gövde + konum + marka   (hepsi sığıyorsa)
 *   2. gövde + konum           (marka düşer — konum daha değerli)
 *   3. gövde + marka           (konum düşer)
 *   4. gövde                   (ikisi de düşer)
 *   5. kırpılmış gövde         (kelime sınırından, … ile)
 * Marka son eki asla iki kez eklenmez.
 */
export function pageTitle(base, { marka = firma.kisaAd, konum = '' } = {}) {
  const govde = cleanText(base).replace(MARKA_SONEK_RE, '').trim();
  const sonek = ` | ${marka}`;
  const ileKonum = konum ? `${govde} — ${konum}` : govde;

  if (ileKonum.length + sonek.length <= MAX_TITLE) return ileKonum + sonek;
  if (ileKonum.length <= MAX_TITLE) return ileKonum;
  if (govde.length + sonek.length <= MAX_TITLE) return govde + sonek;
  if (govde.length <= MAX_TITLE) return govde;
  return kirp(govde, MAX_TITLE);
}
/* -------- sosyal paylaşım görseli -------- */
export const ogGorselVarsayilan = `${siteUrl}/images/og.jpg`;

/** OG/Twitter görsel dizisi üretir; yol verilmezse varsayılan afişe düşer. */
export function ogGorsel(yol, alt = firma.ad) {
  const url = !yol ? ogGorselVarsayilan : yol.startsWith('http') ? yol : `${siteUrl}${yol}`;
  return [{ url, width: 1200, height: 630, alt }];
}
