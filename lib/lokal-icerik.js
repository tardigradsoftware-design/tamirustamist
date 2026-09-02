/* ------------------------------------------------------------------
 * lib/lokal-icerik.js
 *
 * İlçe + hizmet (25 × 54 = 1350) sayfalarının içerik gövdesini
 * güçlendirmek için kullanılan yardımcılar.
 *
 * Felsefe:
 *  - Hiçbir istatistik, fiyat, süre, garanti, yorum UYDURULMAZ.
 *  - Üretilen her cümle data/ilceler.json içindeki GERÇEK ilçe
 *    verisinden (giris, sorunlar, sss, bolge) seçilir ya da elle
 *    yazılmış hizmet-süreç adımlarından gelir (teknik bilgi).
 *  - Aynı ilçenin farklı hizmet sayfaları, ilçe verisinin FARKLI
 *    bölümlerini görür: seçim, hizmetin kategorisine göre yapılır.
 *  - Fonksiyonlar tamamen deterministiktir (build her zaman aynı
 *    çıktıyı üretir).
 * ------------------------------------------------------------------ */

/* Türkçe duyarlı küçük harf */
const TR_HARF = { İ: 'i', I: 'ı', Ş: 'ş', Ğ: 'ğ', Ü: 'ü', Ö: 'ö', Ç: 'ç' };
export function trKucuk(s) {
  return [...String(s)].map((c) => TR_HARF[c] ?? c).join('').toLowerCase();
}

/* Her hizmet kategorisi için ayırt edici kelimeler.
 * Cümle seçimi bu kelimelerin geçme sayısına göre yapılır. */
const KATEGORI_KELIMELER = {
  'banyo-tadilati': [
    'banyo', 'duş', 'küvet', 'seramik', 'fayans', 'klozet', 'lavabo',
    'vitrifiye', 'karo', 'armatür', 'duşakabin', 'musluk', 'kiremit',
    'derz', 'su yalıtımı', 'membran', 'banyo tadilat', 'ıslak hacim',
  ],
  'mutfak-tadilati': [
    'mutfak', 'tezgah', 'dolap', 'evye', 'ankastre', 'davlumbaz', 'fırın',
    'ocak', 'mutfak tadilat',
  ],
  'sihhi-tesisat': [
    'tesisat', 'su hattı', 'boru', 'sıhhi', 'kaçak', 'vana', 'şofben',
    'su deposu', 'korozyon', 'kireçli', 'donan su', 'patlak', 'musluk',
    'batarya',
  ],
  'elektrik-tesisati': [
    'elektrik', 'priz', 'anahtar', 'sigorta', 'kablo', 'pano', 'aydınlatma',
    'kontak', 'uydu', 'internet', 'elektrik hattı', 'devre', 'topraklama',
    'sigorta kutusu', 'elektrik tesisatı',
  ],
  'isitma-sistemleri': [
    'kombi', 'petek', 'kalorifer', 'ısıtma', 'doğalgaz', 'klima',
    'radyatör', 'şofben', 'kazan', 'donma', 'verimsiz',
  ],
  'ic-mekan-dekorasyon': [
    'boya', 'badana', 'alçıpan', 'kapı', 'parke', 'dekorasyon',
    'kartonpiyer', 'asma tavan', 'mobilya', 'perde', 'korniş', 'stor',
    'cephe', 'gömme', 'iç cephe', 'dolap', 'ses yalıtımı', 'kaplama',
    'duvar kağıdı', 'panel', 'saten',
  ],
  'tikaniklik-acma': [
    'tıkanıklık', 'gider', 'tıkalı', 'kanal', 'robot', 'kamera',
    'pis su', 'tuvalet', 'klozet', 'lavabo', 'açma', 'kolon',
  ],
};

/* İlçe giriş metinlerinde kategori kelimesi hiç geçmiyorsa, cümleyi yine de
 * ilçe+hizmet bağlamına çeken genel yapı/ihtiyaç kelimeleri (ikinci aşama). */
const GENEL_KELIMELER = [
  'tadilat', 'yenile', 'onar', 'tamirat', 'daire', 'bina', 'konut', 'yapı',
  'apartman', 'inşaat', 'işçilik', 'söküm', 'montaj', 'teslim', 'keşif',
  'kiracı', 'mülk', 'ev sahibi',
];

/** Bir metnin kategoriyle ilgisini puanla — SADECE kategori kelimeleri. */
export function kategoriPuani(metin, kategoriSlug) {
  const lc = trKucuk(metin);
  const ks = KATEGORI_KELIMELER[kategoriSlug] || [];
  return ks.filter((k) => lc.includes(k)).length;
}

/** Bir metnin kategoriyle ilgisini puanla — kategori kelimesi yoksa genel
 *  yapı/ihtiyaç kelimeleriyle düşük puan ver (giriş metinleri için). */
export function ilgiPuani(metin, kategoriSlug) {
  const lc = trKucuk(metin);
  const ks = KATEGORI_KELIMELER[kategoriSlug] || [];
  let skor = ks.filter((k) => lc.includes(k)).length;
  if (skor === 0) {
    skor = GENEL_KELIMELER.filter((k) => lc.includes(k)).length * 0.4;
  }
  return skor;
}

/** Metni cümlelere ayırır (kısa parçaları atar). */
export function cumlelereAyir(metin) {
  return String(metin)
    .split(/(?<=[.!?])\s+|\n+/)
    .map((c) => c.trim())
    .filter((c) => c.length > 30);
}

/**
 * A) Lokal giriş paragrafı.
 * İlçenin `giris` metninden, hizmetin kategorisiyle EN İLGİLİ cümleleri seçer.
 * Yeterli ilgili cümle yoksa ilçe tanıtım cümleleriyle tamamlar.
 * Böylece aynı ilçenin farklı hizmet sayfaları ilçe bilgisinin farklı
 * bölümlerini görür; sayfa ilçe+hizmete özgü bir girişle başlar.
 */
export function lokalGiris(ilce, hizmet, max = 4) {
  const cumleler = cumlelereAyir(ilce.giris || '');
  if (!cumleler.length) return [];
  const skorlu = cumleler
    .map((c) => ({ c, s: ilgiPuani(c, hizmet.kategori.slug) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s);
  const secilen = skorlu.slice(0, max).map((x) => x.c);
  // İlgili cümle azsa ilçenin genel tanıtım cümleleriyle tamamla (özgün ilçe verisi)
  for (const c of cumleler) {
    if (secilen.length >= max) break;
    if (!secilen.includes(c)) secilen.push(c);
  }
  return secilen;
}

/**
 * B) "Bu hizmet ilçede hangi durumlarda gerekli olur?"
 * İlçenin `sorunlar` listesinden hizmet kategorisiyle ilgili maddeleri döner.
 * İlgili madde yoksa boş dizi — sayfada bölüm gösterilmez (zorlama yok).
 */
export function ilceSorunlari(ilce, hizmet, max = 3) {
  const slug = hizmet.kategori.slug;
  const ilgili = (ilce.sorunlar || []).filter((s) => kategoriPuani(s, slug) >= 1);
  return ilgili.slice(0, max);
}

/** İlçenin `musteriProfili` içinden hizmete en yakın tek cümle (varsa).
 *  Yalnızca müşteri profiline bakar; böylece giriş bölümündeki (A) cümlelerle
 *  birebir tekrarlanmaz. */
export function ilceIhtiyacCumlesi(ilce, hizmet) {
  const slug = hizmet.kategori.slug;
  const kaynak = cumlelereAyir(ilce.musteriProfili || '');
  const skorlu = kaynak.map((c) => ({ c, s: kategoriPuani(c, slug) })).sort((a, b) => b.s - a.s);
  const en = skorlu[0];
  return en && en.s > 0 ? en.c : '';
}

/**
 * FAQ: İlçenin kendi SSS listesinden, hizmet kategorisiyle ilgili soruları seçer.
 * Bu sorular ilçe adını içeren GERÇEK ilçe sorularıdır; sayfaya ilçe bağlamı
 * katar ve FAQ'ları ilçeler arasında farklılaştırır.
 */
/* "Komple tadilat" kapsamındaki kategoriler: ilçe SSS'lerindeki genel tadilat
 * soruları ("yeni teslim daire tadilatı", "kiracı çıkınca daire" vb.) bu
 * kategoriler için doğal olarak ilgilidir. */
const TADILAT_KATEGORILERI = new Set(['banyo-tadilati', 'mutfak-tadilati', 'ic-mekan-dekorasyon']);
const TADILAT_SORU_KELIMELERI = [
  'tadilat', 'yenile', 'tamirat', 'daire', 'kiracı', 'dükkan', 'işyeri',
  'komple', 'boya', 'mobilya', 'dekor',
];

export function ilceFaq(ilce, hizmet, max = 2) {
  const slug = hizmet.kategori.slug;
  const ilgili = (ilce.sss || []).filter((q) => {
    const qs = trKucuk(q.s);
    if (TADILAT_KATEGORILERI.has(slug)) {
      // Tadilat kategorileri: soru metninde tadilat/iş kapsamı kelimesi geçen
      // ilçe soruları doğal olarak ilgilidir (ör. "yeni teslim daire tadilatı").
      const t = TADILAT_SORU_KELIMELERI.filter((k) => qs.includes(k)).length;
      if (t >= 1) return true;
    }
    // Diğer kategoriler (ve tadilat kategorilerinde ek olarak):
    // soru metni 2×, cevap 1× ağırlıklı; eşik 2. Böylece cevabında her şeyi
    // sıralayan genel metinler soruyu tüm kategorilere düşürmez.
    const skor = 2 * kategoriPuani(q.s, slug) + kategoriPuani(q.c, slug);
    return skor >= 2;
  });
  return ilgili.slice(0, max);
}

/**
 * D) Süreç adımları — hizmet kategorisine özel, elle yazılmış TEKNİK bilgi.
 * Ortak teknik bilgi olduğu için ilçeler arasında aynıdır (Google'ın
 * "temel teknik bilgiler ortak kalabilir" yaklaşımına uygun); sayfanın
 * kullanıcıya gerçek süreç değeri kazandırır.
 */
export const SUREC_ADIMLARI = {
  'banyo-tadilati': [
    { t: 'Yerinde keşif ve ölçü', m: 'Banyonun mevcut tesisatı, su yalıtımı durumu ve zemin kotu yerinde incelenir; kırım gerekip gerekmediği netleştirilir.' },
    { t: 'Sabit fiyat teklifi', m: 'Keşif sonrası söküm, tesisat, yalıtım, karo ve montaj kalemleri tek tek yazılarak sabit fiyat teklifi çıkarılır.' },
    { t: 'Söküm ve hazırlık', m: 'Eski seramik, vitrifiye ve tesisat sökülür; moloz aynı gün taşınır ve zemin tesviyeye hazırlanır.' },
    { t: 'Tesisat, yalıtım ve karo', m: 'Su ve atık hatları yenilenir, membran esaslı su yalıtımı uygulanır, karo döşenir.' },
    { t: 'Montaj ve teslim', m: 'Vitrifiye, batarya ve armatürler takılır; iş sonu temizliği yapılarak yazılı garantiyle teslim edilir.' },
  ],
  'mutfak-tadilati': [
    { t: 'Yerinde keşif ve ölçü', m: 'Mutfak düzeni, tesisat çıkışları ve havalandırma yerinde ölçülür; ankastre planı netleştirilir.' },
    { t: 'Sabit fiyat teklifi', m: 'Dolap, tezgah, evye-batarya ve işçilik kalemleri ayrı ayrı yazılarak sabit fiyat verilir.' },
    { t: 'Söküm ve altyapı', m: 'Eski dolaplar ve tezgah sökülür; su, atık ve elektrik çıkışları yeniden konumlandırılır.' },
    { t: 'Montaj', m: 'Alt-üst dolaplar, tezgah, evye ve ankastre cihazlar sırayla monte edilir.' },
    { t: 'Kontrol ve teslim', m: 'Su kaçağı ve cihaz bağlantıları test edilir; mutfak temizlenerek teslim edilir.' },
  ],
  'sihhi-tesisat': [
    { t: 'Arıza tespiti', m: 'Sorunun kaynağı (kaçak, tıkanma, basınç, korozyon) yerinde tespit edilir; gerekiyorsa kamera ile hat incelenir.' },
    { t: 'Kapsam ve teklif', m: 'Değişecek hat ve malzeme netleştirilir; onarım ya da yenileme için sabit fiyat verilir.' },
    { t: 'Müdahale', m: 'Hat değişimi, kaçak onarımı ya da bağlantı yenileme yapılır; kırım gerekiyorsa alan dar tutulur.' },
    { t: 'Test', m: 'Hat basınç ve akış testinden geçirilir; kaçak olmadığı doğrulanır.' },
    { t: 'Toparlama', m: 'Kırılan yüzey tamir edilir, alan temizlenir ve kullanıma hazır teslim edilir.' },
  ],
  'elektrik-tesisati': [
    { t: 'İnceleme ve ölçüm', m: 'Mevcut hatlar, pano ve topraklama ölçülür; arıza ya da yenileme kapsamı belirlenir.' },
    { t: 'Plan ve teklif', m: 'Devre planı ve malzeme listesi çıkarılır; sabit fiyat teklifi sunulur.' },
    { t: 'Uygulama', m: 'Kablo, priz-anahtar, sigorta ve pano işleri projeye uygun şekilde yapılır.' },
    { t: 'Test ve güvenlik', m: 'Devreler, kaçak akım koruması ve topraklama test edilir.' },
    { t: 'Teslim', m: 'Pano etiketlenir, kullanım kılavuzu aktarılır ve alan temiz teslim edilir.' },
  ],
  'isitma-sistemleri': [
    { t: 'Yerinde değerlendirme', m: 'Kombi/petet kapasitesi, tesisat basıncı ve bina ısı kaybı yerinde değerlendirilir.' },
    { t: 'Teklif', m: 'Cihaz ve işçilik kalemleri için sabit fiyat teklifi hazırlanır.' },
    { t: 'Montaj/onarım', m: 'Kombi montajı, petek değişimi, bakım ya da arıza onarımı yapılır.' },
    { t: 'Test', m: 'Gaz kaçağı kontrolü, su basıncı ve yanma ayarı test edilir.' },
    { t: 'Kullanıcıya aktarım', m: 'Cihaz kullanımı ve garanti koşulları anlatılarak teslim edilir.' },
  ],
  'ic-mekan-dekorasyon': [
    { t: 'Yüzey incelemesi', m: 'Duvar, zemin ve tavan durumu incelenir; nem, kabarma ve kot sorunları not edilir.' },
    { t: 'Kapsam ve teklif', m: 'Yapılacak işler (boya, alçıpan, kaplama, montaj) netleştirilir ve sabit fiyat verilir.' },
    { t: 'Yüzey hazırlığı', m: 'Eski boyalar kazınır, çatlaklar onarılır, astar uygulanır; zeminler korumaya alınır.' },
    { t: 'Uygulama', m: 'Boya-badana, alçıpan, kaplama ya da montaj işleri sırayla tamamlanır.' },
    { t: 'Kontrol ve teslim', m: 'Işık tutarak yüzey kontrolü yapılır; eksikler giderilir ve alan temiz teslim edilir.' },
  ],
  'tikaniklik-acma': [
    { t: 'İhbar ve yönlendirme', m: 'Tıkanıklığın yeri (lavabo, gider, kolon, rögar) telefonla anlaşılır; ekip yönlendirilir.' },
    { t: 'Tespit', m: 'Gerekiyorsa kamera ile hat görüntülenir; tıkanıklığın türü ve derinliği belirlenir.' },
    { t: 'Açma', m: 'Robot, spiral ya da yüksek basınçlı makineyle hat açılır; kimyasal kullanılmaz.' },
    { t: 'Kontrol', m: 'Su akışı ve tahliye hızı test edilir; tekrar eden tıkanmalar için kök neden raporlanır.' },
    { t: 'Önleme önerisi', m: 'Tekrarını önlemek için yapılabilecekler (temizlik alışkanlığı, hat yenileme) aktarılır.' },
  ],
};

/** Kategoriye göre süreç adımlarını döner (bilinmeyen kategori → boş). */
export function surecAdimlari(kategoriSlug) {
  return SUREC_ADIMLARI[kategoriSlug] || [];
}

/** İlçe adına göre 'da/'de eki (Türkçe ünlü uyumu). Ör: Arnavutköy'de, Avcılar'da, Şişli'de */
export function ilceEki(ad) {
  const s = String(ad).trim();
  const son = s.slice(-1);
  const unlu = /[aeıioöuü]/.test(son) ? son : s.slice(-2, -1);
  return /[aıou]/.test(unlu) ? "'da" : "'de";
}
