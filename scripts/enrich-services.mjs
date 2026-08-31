#!/usr/bin/env node
/**
 * data/hizmetler.json'a her hizmet için:
 *  - `gorseller` (kategori bazlı 2 görsel — C1)
 *  - `referanslar` (hizmete özel 2 müşteri yorumu — B4)
 * ekler. Deterministiktir: aynı giriş her zaman aynı çıktıyı üretir.
 * Kullanım: scripts/build-data.mjs ardından bu scripti çalıştırın.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const path = join(root, 'data', 'hizmetler.json');
const data = JSON.parse(readFileSync(path, 'utf8'));

/* --- C1: kategori görsel havuzu (public/images/hizmet-<kat>-{1,2}.webp) ---
 * NOT: sihhi-tesisat ve tikaniklik-acma görselleri üretim limiti nedeniyle
 * geçici olarak mevcut/paylaşılan görselleri kullanır; üretilince değiştirilecek. */
const kategoriGorselMap = {
  'banyo-tadilati': ['/images/hizmet-banyo-tadilati-1.webp', '/images/hizmet-banyo-tadilati-2.webp'],
  'elektrik-tesisati': ['/images/hizmet-elektrik-tesisati-1.webp', '/images/hizmet-elektrik-tesisati-2.webp'],
  'ic-mekan-dekorasyon': ['/images/hizmet-ic-mekan-dekorasyon-1.webp', '/images/hizmet-ic-mekan-dekorasyon-2.webp'],
  'isitma-sistemleri': ['/images/hizmet-isitma-sistemleri-1.webp', '/images/hizmet-isitma-sistemleri-2.webp'],
  'mutfak-tadilati': ['/images/hizmet-mutfak-tadilati-1.webp', '/images/hizmet-mutfak-tadilati-2.webp'],
  'sihhi-tesisat': ['/images/tesisat-1.webp', '/images/hizmet-isitma-sistemleri-2.webp'],
  'tikaniklik-acma': ['/images/tesisat-1.webp', '/images/hizmet-banyo-tadilati-2.webp'],
};
const kategoriGorsel = (katSlug) => kategoriGorselMap[katSlug] || kategoriGorselMap['banyo-tadilati'];

/* --- B4: yorum şablon havuzları --- */
const A = [
  'Söz verilen sürede tamamlandı; her gün WhatsApp üzerinden güncel fotoğraf paylaştılar.',
  'Teklifte ne yazdıysa onu ödedim; iş sırasında hiçbir sürpriz fiyat çıkmadı.',
  'Keşif ücretsizdi ve aynı gün sabit fiyat teklifi hazırlandı; karşılaştırma yapmaktan çekinmedim.',
  'Detaylara gösterilen özen gerçekten farklıydı; iş bitiminde alan tertemiz teslim edildi.',
  'İş sonunda birlikte kontrol yaptık; yazılı garanti belgesini eksiksiz teslim ettiler.',
  'Süreç boyunca aynı muhatap ile çalıştık; her sorumuz saatinde yanıtlandı.',
  'Moloz ve atıklar her gün düzenli toplandı; komşu şikayeti hiç olmadı.',
  'Ekip sabah söz verilen saatte geldi ve programdan şaşmadı; iş aksamadan bitti.',
];
const B = [
  'Kesinlikle tavsiye ederim, işi ehline vermek bu demek.',
  'Emeği geçen tüm ekibe teşekkür ederim.',
  'Verdikleri fiyatla ortaya çıkan kaliteyi düşününce memnun kaldık.',
  'Bundan sonraki tadilatlarımızda da yine onlarla çalışacağız.',
  'Komşularımıza da önerdik; aynı özeni onlara da gösterdiler.',
  'Ustalık belgeli gerçek bir kadro; işin başında ustabaşı hep vardı.',
];
const ISIMLER = [
  { ad: 'Murat T.', ilce: 'Avcılar', puan: 5 },
  { ad: 'Selma K.', ilce: 'Esenyurt', puan: 5 },
  { ad: 'Okan D.', ilce: 'Küçükçekmece', puan: 4 },
  { ad: 'Figen A.', ilce: 'Beylikdüzü', puan: 5 },
  { ad: 'Yılmaz B.', ilce: 'Bakırköy', puan: 5 },
  { ad: 'Aysel P.', ilce: 'Şişli', puan: 4 },
  { ad: 'Kadir U.', ilce: 'Başakşehir', puan: 5 },
  { ad: 'Nihal G.', ilce: 'Bahçelievler', puan: 5 },
  { ad: 'Turgut S.', ilce: 'Büyükçekmece', puan: 5 },
  { ad: 'Esra C.', ilce: 'Fatih', puan: 4 },
  { ad: 'Hüseyin D.', ilce: 'Sultangazi', puan: 5 },
  { ad: 'Pınar Ş.', ilce: 'Zeytinburnu', puan: 5 },
];

let ornekSayac = 0;
for (const kat of data.kategoriler) {
  kat.hizmetler.forEach((h, idx) => {
    const kisa = h.baslik.split(' (')[0];
    h.gorseller = kategoriGorsel(kat.slug);
    const sec = (dizi, i) => dizi[i % dizi.length];
    const kisi1 = sec(ISIMLER, ornekSayac);
    const kisi2 = sec(ISIMLER, ornekSayac + 7);
    h.referanslar = [
      {
        ad: kisi1.ad,
        ilce: kisi1.ilce,
        ilceSlug: kisi1.ilce.toLocaleLowerCase('tr-TR').replace(/ç/g, 'c').replace(/ş/g, 's').replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/â/g, 'a'),
        puan: kisi1.puan,
        hizmet: h.baslik,
        hizmetSlug: h.slug,
        yorum: `${kisa} işinde ${sec(A, ornekSayac)} ${sec(B, (ornekSayac * 3 + 1) % B.length)}`,
      },
      {
        ad: kisi2.ad,
        ilce: kisi2.ilce,
        ilceSlug: kisi2.ilce.toLocaleLowerCase('tr-TR').replace(/ç/g, 'c').replace(/ş/g, 's').replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/â/g, 'a'),
        puan: kisi2.puan,
        hizmet: h.baslik,
        hizmetSlug: h.slug,
        yorum: `${kisa} sürecinde ${sec(A, (ornekSayac * 3 + 2) % A.length)} ${sec(B, (ornekSayac * 5 + 3) % B.length)}`,
      },
    ];
    ornekSayac += 1;
    void idx;
  });
}

writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
let toplam = 0;
data.kategoriler.forEach((k) => (toplam += k.hizmetler.length));
console.log(`✔ hizmetler.json zenginleştirildi: ${toplam} hizmet (gorseller + referanslar)`);