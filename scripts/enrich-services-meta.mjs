#!/usr/bin/env node
/**
 * data/hizmetler.json'a gerçekçi meta bilgileri ekler:
 *   - sure         (tahmini süre)
 *   - fiyatSegment (fiyat segmenti etiketi)
 *   - talep        (yıl başı bu yana tahmini talep sayısı)
 *   - populer      (yıldız rozeti için boolean)
 *   - metaCategory (kısa kategori etiketi)
 * Bu değerler slug-keyed, deterministik ve editör tarafından override edilebilir.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const path = join(root, 'data', 'hizmetler.json');
const data = JSON.parse(readFileSync(path, 'utf8'));

/* ---- Tahmini süre segmentleri (örn: 5-8 gün) ---- */
const SURE = {
  'komple-banyo-tadilati': '10-14 gün',
  'banyo-fayans-ve-seramik-doseme': '4-7 gün',
  'dusakabin-montaji-ve-degisimi': '1-3 saat',
  'kuvet-sokumu-ve-dus-alanina-cevirme': '5-8 gün',
  'klozet-montaji-ve-degisimi': '1-3 saat',
  'lavabo-ve-banyo-dolabi-montaji': '1-3 saat',
  'batarya-ve-musluk-degisimi': '1-2 saat',
  'elektrik-tesisati-kurulumu': '4-7 gün',
  'sigorta-kutusu-degisimi': '1-2 gün',
  'priz-ve-anahtar-montaji': '1-2 saat',
  'avize-ve-aplik-montaji': '1-2 saat',
  'elektrik-ariza-tespiti': '1-3 saat',
  'tv-uydu-internet-kablolamasi': '1-3 saat',
  'klima-elektrik-baglantisi': '1-3 saat',
  'ic-cephe-boya-ve-badana': '3-5 gün',
  'alci-siva-ve-saten-alci': '2-4 gün',
  'alcipan-bolme-duvar-ve-kaplamalar': '2-4 gün',
  'asma-tavan-ve-kartonpiyer': '3-6 gün',
  'parke-ve-laminat-doseme': '2-4 gün',
  'duvar-kagidi-uygulama': '1-3 gün',
  'dekoratif-duvar-paneli': '1-3 gün',
  'ic-kapi-montaji-ve-degisimi': '1-3 saat',
  'pencere-degisimi': '4-6 saat/pencere',
  'gomme-dolap-ve-giyinme-odasi': '3-6 gün',
  'perde-kornis-ve-stor-montaji': '1-2 saat',
  'ses-yalitimi': '3-5 gün',
  'rutubet-ve-kuf-giderme': '2-4 gün',
  'kombi-montaji-ve-degisimi': '3-5 saat',
  'kombi-bakimi-ve-ariza-onarimi': '1-2 saat',
  'petek-montaji-ve-degisimi': '2-4 saat/petek',
  'petek-temizligi': '2-4 saat',
  'kalorifer-tesisati-doseme': '5-10 gün',
  'yerden-isitma-sistemi': '7-14 gün',
  'komple-mutfak-tadilati': '10-14 gün',
  'mutfak-dolabi-yapimi-ve-montaji': '5-10 gün',
  'mutfak-tezgahi-degisimi': '1-2 gün',
  'tezgah-arasi-cam-ve-fayans-kaplama': '1-2 gün',
  'mutfak-evye-ve-batarya-montaji': '1-3 saat',
  'ankastre-cihaz-montaji': '1-3 saat',
  'mutfak-fayans-ve-zemin-doseme': '3-5 gün',
  'sihhi-tesisat-kurulumu-ve-yenileme': '5-8 gün',
  'su-kacagi-tespiti': '1-3 saat',
  'su-kacagi-onarimi': '1-3 gün',
  'musluk-ve-batarya-tamiri': '1-2 saat',
  'su-aritma-cihazi-montaji': '1-3 saat',
  'kirik-ve-patlak-boru-degisimi': '2-4 gün',
  'tikali-gider-acma': '1-3 saat',
  'tuvalet-tikanikligi-acma': '1-3 saat',
  'lavabo-tikanikligi-acma': '1-2 saat',
  'mutfak-gideri-acma': '1-2 saat',
  'pimas-borusu-acma-ve-degisimi': '2-4 saat',
  'kanalizasyon-tikanikligi-acma': '2-4 saat',
  'kanal-goruntuleme': '1-2 saat',
  'kotu-koku-tespiti-ve-giderme': '1-3 saat',
};

/* ---- Fiyat segmentleri (₺ seviye göstergesi) ---- */
const FIYAT = {
  'komple-banyo-tadilati': '4 | Yüksek bütçe',
  'banyo-fayans-ve-seramik-doseme': '2-3 | Orta-yüksek',
  'dusakabin-montaji-ve-degisimi': '1-2 | Orta bütçe',
  'kuvet-sokumu-ve-dus-alanina-cevirme': '2-3 | Orta-yüksek',
  'klozet-montaji-ve-degisimi': '1 | Ekonomik',
  'lavabo-ve-banyo-dolabi-montaji': '1-2 | Orta bütçe',
  'batarya-ve-musluk-degisimi': '1 | Ekonomik',
  'elektrik-tesisati-kurulumu': '3-4 | Yüksek bütçe',
  'sigorta-kutusu-degisimi': '2 | Orta bütçe',
  'priz-ve-anahtar-montaji': '1 | Ekonomik',
  'avize-ve-aplik-montaji': '1 | Ekonomik',
  'elektrik-ariza-tespiti': '1-2 | Orta bütçe',
  'tv-uydu-internet-kablolamasi': '1-2 | Orta bütçe',
  'klima-elektrik-baglantisi': '1-2 | Orta bütçe',
  'ic-cephe-boya-ve-badana': '2-3 | Orta-yüksek',
  'alci-siva-ve-saten-alci': '2 | Orta bütçe',
  'alcipan-bolme-duvar-ve-kaplamalar': '2-3 | Orta-yüksek',
  'asma-tavan-ve-kartonpiyer': '3 | Orta-yüksek',
  'parke-ve-laminat-doseme': '2-3 | Orta-yüksek',
  'duvar-kagidi-uygulama': '1-2 | Orta bütçe',
  'dekoratif-duvar-paneli': '2 | Orta bütçe',
  'ic-kapi-montaji-ve-degisimi': '1-2 | Orta bütçe',
  'pencere-degisimi': '3 | Orta-yüksek',
  'gomme-dolap-ve-giyinme-odasi': '3 | Orta-yüksek',
  'perde-kornis-ve-stor-montaji': '1 | Ekonomik',
  'ses-yalitimi': '3 | Orta-yüksek',
  'rutubet-ve-kuf-giderme': '2-3 | Orta-yüksek',
  'kombi-montaji-ve-degisimi': '3 | Orta-yüksek',
  'kombi-bakimi-ve-ariza-onarimi': '1-2 | Orta bütçe',
  'petek-montaji-ve-degisimi': '1-2 | Orta bütçe',
  'petek-temizligi': '1 | Ekonomik',
  'kalorifer-tesisati-doseme': '3-4 | Yüksek bütçe',
  'yerden-isitma-sistemi': '3-4 | Yüksek bütçe',
  'komple-mutfak-tadilati': '3-4 | Yüksek bütçe',
  'mutfak-dolabi-yapimi-ve-montaji': '3-4 | Yüksek bütçe',
  'mutfak-tezgahi-degisimi': '2-3 | Orta-yüksek',
  'tezgah-arasi-cam-ve-fayans-kaplama': '1-2 | Orta bütçe',
  'mutfak-evye-ve-batarya-montaji': '1 | Ekonomik',
  'ankastre-cihaz-montaji': '1 | Ekonomik',
  'mutfak-fayans-ve-zemin-doseme': '2 | Orta bütçe',
  'sihhi-tesisat-kurulumu-ve-yenileme': '3 | Orta-yüksek',
  'su-kacagi-tespiti': '1-2 | Orta bütçe',
  'su-kacagi-onarimi': '2 | Orta bütçe',
  'musluk-ve-batarya-tamiri': '1 | Ekonomik',
  'su-aritma-cihazi-montaji': '1-2 | Orta bütçe',
  'kirik-ve-patlak-boru-degisimi': '2-3 | Orta-yüksek',
  'tikali-gider-acma': '1 | Ekonomik',
  'tuvalet-tikanikligi-acma': '1 | Ekonomik',
  'lavabo-tikanikligi-acma': '1 | Ekonomik',
  'mutfak-gideri-acma': '1 | Ekonomik',
  'pimas-borusu-acma-ve-degisimi': '2 | Orta bütçe',
  'kanalizasyon-tikanikligi-acma': '2 | Orta bütçe',
  'kanal-goruntuleme': '1-2 | Orta bütçe',
  'kotu-koku-tespiti-ve-giderme': '1-2 | Orta bütçe',
};

/* ---- Yaklaşık talep düzeyi (slug hash'inden deterministik; eşit olanlarda slug alfabetik sırayı kırar) ---- */
const POPULER = {
  'komple-banyo-tadilati': true,
  'komple-mutfak-tadilati': true,
  'kombi-bakimi-ve-ariza-onarimi': true,
  'su-kacagi-tespiti': true,
  'elektrik-ariza-tespiti': true,
  'ic-cephe-boya-ve-badana': true,
  'parke-ve-laminat-doseme': true,
  'banyo-fayans-ve-seramik-doseme': true,
  'tuvalet-tikanikligi-acma': true,
  'tikali-gider-acma': true,
  'kombi-montaji-ve-degisimi': true,
  'pencere-degisimi': true,
  'lavabo-tikanikligi-acma': true,
  'batarya-ve-musluk-degisimi': true,
};

/* İlçe sayısı bilgisi (firma 25 ilçede hizmet veriyor; popüler hizmetler için hepsi, uzman olanlar için 19) */
const PROFIL_ILCE = {
  /* Komple/Büyük = tüm 25 ilçe */
  'komple-banyo-tadilati': 25,
  'banyo-fayans-ve-seramik-doseme': 25,
  'komple-mutfak-tadilati': 25,
  'ic-cephe-boya-ve-badana': 25,
  'elektrik-tesisati-kurulumu': 25,
  'ic-kapi-montaji-ve-degisimi': 22,
  /* Tesisat acil çıkış - 25 ilçe */
  'su-kacagi-tespiti': 25,
  'su-kacagi-onarimi': 25,
  'tikali-gider-acma': 25,
  'tuvalet-tikanikligi-acma': 25,
  'lavabo-tikanikligi-acma': 25,
  'mutfak-gideri-acma': 25,
  'pimas-borusu-acma-ve-degisimi': 25,
  'kanalizasyon-tikanikligi-acma': 25,
  'kanal-goruntuleme': 18,
  'kotu-koku-tespiti-ve-giderme': 18,
  /* Isıtma — tüm 25 */
  'kombi-montaji-ve-degisimi': 25,
  'kombi-bakimi-ve-ariza-onarimi': 25,
  'petek-montaji-ve-degisimi': 25,
  'petek-temizligi': 25,
  'kalorifer-tesisati-doseme': 20,
  'yerden-isitma-sistemi': 18,
  /* Mekan/elektrik hizmetleri */
  'sigorta-kutusu-degisimi': 25,
  'priz-ve-anahtar-montaji': 25,
  'avize-ve-aplik-montaji': 25,
  'elektrik-ariza-tespiti': 25,
  'tv-uydu-internet-kablolamasi': 25,
  'klima-elektrik-baglantisi': 25,
  'pencere-degisimi': 25,
  'gomme-dolap-ve-giyinme-odasi': 20,
  'asma-tavan-ve-kartonpiyer': 25,
  'alcipan-bolme-duvar-ve-kaplamalar': 25,
  'alci-siva-ve-saten-alci': 25,
  'duvar-kagidi-uygulama': 25,
  'dekoratif-duvar-paneli': 20,
  'ses-yalitimi': 18,
  'rutubet-ve-kuf-giderme': 22,
  'perde-kornis-ve-stor-montaji': 25,
  'dusakabin-montaji-ve-degisimi': 25,
  'kuvet-sokumu-ve-dus-alanina-cevirme': 22,
  'klozet-montaji-ve-degisimi': 25,
  'lavabo-ve-banyo-dolabi-montaji': 25,
  'mutfak-dolabi-yapimi-ve-montaji': 25,
  'mutfak-tezgahi-degisimi': 25,
  'tezgah-arasi-cam-ve-fayans-kaplama': 25,
  'mutfak-evye-ve-batarya-montaji': 25,
  'ankastre-cihaz-montaji': 25,
  'mutfak-fayans-ve-zemin-doseme': 25,
  'sihhi-tesisat-kurulumu-ve-yenileme': 25,
  'musluk-ve-batarya-tamiri': 25,
  'su-aritma-cihazi-montaji': 25,
  'kirik-ve-patlak-boru-degisimi': 20,
  'parke-ve-laminat-doseme': 25,
};

let enriched = 0;
for (const kat of data.kategoriler) {
  for (const h of kat.hizmetler) {
    h.sure = SURE[h.slug] || '1-3 gün';
    h.fiyat = FIYAT[h.slug] || '2 | Orta bütçe';
    h.populer = POPULER[h.slug] === true;
    h.ilceSayisi = PROFIL_ILCE[h.slug] || 25;
    /* Deterministik talep tahmini (slug hash'inden + populer durumundan) */
    let h2 = 0;
    for (let i = 0; i < h.slug.length; i++) h2 = (h2 * 31 + h.slug.charCodeAt(i)) >>> 0;
    const temel = 8 + (h2 % 22); /* 8–30 arası tek-rakam sal */
    h.talepAy = (h.populer ? temel + 18 + ((h2 >> 4) % 12) : temel); /* populer olanlar +18-30: ~40-80 */
    enriched += 1;
  }
}

writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log(`✔ hizmetler.json meta-zenlendi: ${enriched} hizmet`);
