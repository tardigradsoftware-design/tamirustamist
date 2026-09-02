# 1.350 Lokal SEO Sayfası — Kapsamlı Özgünlük ve Google Risk Analizi

**Analiz tarihi:** 2 Eylül 2026
**Analiz edilen kaynak:** `out/` klasöründeki **gerçek üretilmiş HTML** (2 Eylül 2026'da `npm run build` ile üretilen 1448 sayfanın 1350'i = 25 ilçe × 54 hizmet)
**Kural ihlali:** Hiçbir proje dosyası değiştirilmedi, düzeltilmedi, commit edilmedi. Tüm analiz betikleri geçici dizinde (/tmp) çalıştırıldı.

---

## 1 — Analiz Yöntemi (şeffaflık)

- Her sayfanın `<main id="icerik">` bölümü çıkarıldı (header, footer, navigasyon, CSS, script, JSON-LD schema hariç — yani **sadece içerik gövdesi**).
- Title, meta description, H1, FAQ (JSON-LD `FAQPage`'den), görünür müşteri yorumları (figure/figcaption) ayrı ayrı çıkarıldı.
- **İki metin varyantı üretildi:**
  - **HAM:** içerik gövdesi olduğu gibi (ilçe adları dahil)
  - **MASKEli:** 25 ilçe adı ve "İstanbul" `[ILCE]`/`[IST]` etiketine çevrildi → "Başakşehir yerine Kadıköy yazılması özgünlük sayılmaz" şartı böylece uygulandı.
- Benzerlik metrikleri: **TF-IDF cosine similarity** (kelime), **kelime Jaccard**, **paragraf bazlı karşılaştırma** (birebir + %90+), **karakter/kelime benzerliği** (kelime kümeleri üzerinden).
- Karşılaştırma sayıları: aynı hizmet/farklı ilçe = **16.200 çift** (54 hizmet × C(25,2)), aynı ilçe/farklı hizmet = **35.775 çift** (25 ilçe × C(54,2)).

---

## 2 — Sayfa Envanteri

| Kontrol | Sonuç |
|---|---|
| Toplam lokal sayfa | **1.350** (25 ilçe × 54 hizmet) |
| İlçe sayısı | 25 |
| Hizmet sayısı | 54 |
| Eksik kombinasyon | **0** |
| Duplicate URL | **0** (dizin yapısı gereği imkânsız) |
| Duplicate HTML (birebir aynı dosya) | **0** (hiçbir iki sayfa byte-byte aynı değil) |
| 404 üreten kombinasyon | **0** |
| noindex olan sayfa | **0** |
| Canonical hatası | **0** (1350/1350 doğru: `https://www.tamirustam.com/{ilce}/{hizmet}/`) |

✅ **Teknik envanter temiz.** Sorun içerik düzeyinde, yapı düzeyinde değil.

---

## 3 — İçerik Alanları: Ne Paylaşılıyor, Ne Değişiyor?

1350 sayfa iki kaynaktan besleniyor:
- **Hizmet verisi** (`data/hizmetler.json`) — tüm ilçelerde **birebir aynı**
- **İlçe verisi** (`data/ilceler.json`) — yalnızca `uzmanlik` paragrafı + ilçe adı 1350 sayfaya enjekte ediliyor

| İçerik alanı | Değişiyor mu? | Kanıt |
|---|---|---|
| H1 | ✅ Sadece ilçe adı değişiyor | `Başakşehir Komple Banyo Tadilatı` vs `Arnavutköy Komple Banyo Tadilatı` |
| Giriş paragrafı (`kisaAciklama`) | ❌ Birebir aynı | 25 ilçede aynı cümleler |
| Ana hizmet açıklaması (`detay`) | ❌ Birebir aynı | 54 detay metni × 25 ilçe = aynı metin 25 kez |
| "Neden …'da Bizden Talepte Bulunmalısınız?" | 🔶 Yarı yarıya | `ilce.uzmanlik` paragrafı ilçeye özel (≈43 kelime) + 2 kalıp cümle her yerde aynı |
| Avantajlar (`faydalar`) | ❌ Birebir aynı | Hizmet başına 25 kez aynı liste |
| Süreç / nasıl çalışır | ❌ Yok (hizmet sayfalarında bile yok) | — |
| FAQ (`h.sss`) | ❌ Birebir aynı | 54 FAQ seti × 25 ilçe; ilçe adı geçen soru: **0** |
| CTA metinleri | ❌ Birebir aynı | "Ücretsiz Keşif", telefon butonu — 1350 sayfada aynı |
| Related services | 🔶 Hizmete göre değişir, ilçeye göre aynı | Aynı 6 hizmet 25 ilçede |
| İlçe linkleri ("Diğer 24 ilçe") | ✅ Her sayfada farklı sıra/bağlantı | 24 anchor × 1350 |
| Müşteri yorumları | 🔶 Çoğunlukla aynı | Sadece 2/54 hizmette ilçeye göre farklılaşıyor; çoğu sayfa aynı yorumları gösteriyor |
| Meta description | 🔶 İlçe adı değişiyor, kalanı aynı kalıp | `{ilçe} {hizmet} hizmeti: {kisaAciklama}…` |
| Title | 🔶 İlçe + hizmet adı, kalanı kalıp | `{ilçe} {hizmet} | Tamir Ustam` |
| Fiyat bölümü | ❌ 1350 sayfada yok | Fiyat yalnızca hizmet sayfalarında |
| Hizmet kapsamı/malzeme | ❌ Hizmete göre aynı, ilçeye göre fark yok | — |
| Mahalle / bölgesel bilgi | 🔶 Sadece `uzmanlik` içinde birkaç kelime | Nişantaşı, Mecidiyeköy, Ataköy, Levent, Bebek, Ortaköy vb. 63 yer adı (bkz. §7) |
| Ulaşım / hizmet bölgesi | ❌ Yok | — |

**Özet:** Sayfayı oluşturan metnin yalnızca ~%4,3'ü ilçeye özgü (`uzmanlik` paragrafı). Geri kalan gövde ya hizmet verisi (her ilçede aynı) ya da kalıp cümleler.

---

## 4 — Metin Benzerliği Analizi (tüm 16.200 aynı-hizmet çifti)

| Metrik | Ham (ilçe adları dahil) | Maskeli (ilçe + İstanbul çıkarılmış) |
|---|---|---|
| **TF-IDF cosine — ortalama** | 0,930 | **0,906** |
| TF-IDF cosine — medyan | 0,931 | 0,906 |
| TF-IDF cosine — maksimum | 0,955 | 0,947 |
| TF-IDF cosine — minimum | 0,900 | 0,866 |
| Kelime Jaccard — ortalama | 0,843 | 0,804 |

**Yorum:** İlçe adlarını tamamen çıkarsak bile aynı hizmetin iki ilçe sayfası ortalama **%90,6 benzer**. Yani benzerliğin kaynağı ilçe adı değil; gövdenin kendisi. (Maskeli değerin ham değerden düşük çıkması, her sayfada tekrar eden "diğer 24 ilçe" link listesindeki ortak ilçe adlarının maskelenince ağırlığını kaybetmesindendir — bu teknik detay benzerlik sonucunu değiştirmez.)

### Dağılım kovaları (maskeli cosine, 16.200 çift)

| Benzerlik | Çift sayısı | Pay |
|---|---|---|
| ≥ %90 | 10.987 | **%67,8** |
| %80–90 | 5.213 | %32,2 |
| %70–80 | 0 | %0 |
| <%70 | 0 | %0 |

**16.200 çiftin tamamı %80'in üzerinde benzer; hiçbir çift %70'in altında değil.**

---

## 5 — Aynı Hizmet / Farklı İlçe (en kritik test)

Her hizmet için 25 ilçenin ikili karşılaştırması (maskeli cosine):

| Hizmet | Ortalama | Medyan | Maks | Min |
|---|---|---|---|---|
| Küvet Sökümü ve Duş Alanına Çevirme | 0,922 | 0,921 | 0,947 | 0,907 |
| Tuvalet Tıkanıklığı Açma | 0,921 | 0,920 | 0,945 | 0,905 |
| Mutfak Dolabı Yapımı ve Montajı | 0,921 | 0,920 | 0,945 | 0,902 |
| İç Cephe Boya ve Badana | 0,918 | 0,916 | 0,942 | 0,902 |
| Perde Kornişi ve Stor Montajı | 0,917 | 0,916 | 0,942 | 0,900 |
| … (54 hizmetin tümü 0,866–0,922 aralığında) | | | | |
| Pencere Değişimi | 0,892 | 0,890 | 0,926 | 0,870 |
| Batarya ve Musluk Değişimi | 0,889 | 0,888 | 0,921 | 0,866 |

**En benzer 20 çift (maskeli cosine):**

| Benzerlik | Sayfa A | Sayfa B |
|---|---|---|
| 0,9466 | Sultangazi / Küvet Sökümü ve Duş Alanına Çevirme | Zeytinburnu / Küvet Sökümü ve Duş Alanına Çevirme |
| 0,9466 | Esenyurt / Küvet Sökümü ve Duş Alanına Çevirme | Zeytinburnu / Küvet Sökümü ve Duş Alanına Çevirme |
| 0,9460 | Silivri / Küvet Sökümü ve Duş Alanına Çevirme | Zeytinburnu / Küvet Sökümü ve Duş Alanına Çevirme |
| 0,9452 | Sultangazi / Mutfak Dolabı Yapımı ve Montajı | Zeytinburnu / Mutfak Dolabı Yapımı ve Montajı |
| 0,9451 | Sultangazi / Tuvalet Tıkanıklığı Açma | Zeytinburnu / Tuvalet Tıkanıklığı Açma |
| 0,9450 | Silivri / Tuvalet Tıkanıklığı Açma | Zeytinburnu / Tuvalet Tıkanıklığı Açma |
| 0,9449 | Esenyurt / Tuvalet Tıkanıklığı Açma | Zeytinburnu / Tuvalet Tıkanıklığı Açma |
| 0,9440 | Esenyurt / Mutfak Dolabı Yapımı ve Montajı | Zeytinburnu / Mutfak Dolabı Yapımı ve Montajı |
| 0,9436 | Silivri / Mutfak Dolabı Yapımı ve Montajı | Zeytinburnu / Mutfak Dolabı Yapımı ve Montajı |
| 0,9428 | Silivri / Küvet Sökümü | Sultangazi / Küvet Sökümü |
| 0,9426 | Esenler / Küvet Sökümü | Zeytinburnu / Küvet Sökümü |
| 0,9423 | Silivri / Tuvalet Tıkanıklığı | Sultangazi / Tuvalet Tıkanıklığı |
| 0,9422 | Esenler / Tuvalet Tıkanıklığı | Zeytinburnu / Tuvalet Tıkanıklığı |
| 0,9421 | Silivri / Mutfak Dolabı | Sultangazi / Mutfak Dolabı |
| 0,9420 | Esenyurt / Küvet Sökümü | Sultangazi / Küvet Sökümü |
| 0,9419 | Silivri / İç Cephe Boya ve Badana | Zeytinburnu / İç Cephe Boya ve Badana |
| 0,9417 | Sultangazi / Perde Kornişi ve Stor Montajı | Zeytinburnu / Perde Kornişi ve Stor Montajı |
| 0,9415 | Silivri / Perde Kornişi ve Stor Montajı | Zeytinburnu / Perde Kornişi ve Stor Montajı |
| 0,9415 | Esenyurt / Küvet Sökümü | Silivri / Küvet Sökümü |
| 0,9414 | Esenyurt / Perde Kornişi ve Stor Montajı | Zeytinburnu / Perde Kornişi ve Stor Montajı |

---

## 6 — Aynı İlçe / Farklı Hizmet (ters test)

35.775 çift — maskeli cosine:

| Metrik | Değer |
|---|---|
| Ortalama | **0,182** |
| Medyan | 0,175 |
| Maksimum | 0,407 |
| Minimum | 0,091 |

**Yorum:** Aynı ilçedeki farklı hizmet sayfaları birbirine çok az benziyor (ort. %18). Hizmet değişince içerik gerçekten değişiyor: farklı `detay`, farklı `faydalar`, farklı FAQ, farklı görseller. **Hizmet düzeyindeki farklılaşma güçlü; sorun ilçe düzeyindeki farklılaşmada.**

---

## 7 — İlçeye Özgü İçerik Analizi (lokal özgünlük)

**İyi haber:** 25 ilçenin `uzmanlik` paragrafları gerçekten ilçeye özel, elle yazılmış gibi duruyor. Örnekler:

- **Başakşehir:** "Sitede yeni teslim daire düzenlemelerinde uzmanız: bembeyaz boya yerine renkli ve dokulu yüzeyler, akustik panelli TV duvarı…"
- **Arnavutköy:** "Havalimanı kaynaklı istihdamla ilçeye taşınan aileler için anahtar teslim banyo ve mutfak tadilatı paketlerimiz… Orman köylerindeki müstakil evlerde… donma kaynaklı boru patlakları…"
- **Zeytinburnu:** "Eski apartmanlarda tesisat-elektrik yenileme… dönüşüm projelerindeki yeni dairelerde ince işçilik düzeltmeleri…"
- **Şişli:** "Nişantaşı prestij konutlarında özel ölçü mobilya… Mecidiyeköy ofislerinde akustik bölme…"

En fazla 2 ilçede geçen 63 büyük harfli yer/özel isim tespit edildi: Nişantaşı, Mecidiyeköy, Ataköy, Levent, Bebek, Ortaköy, Şirinevler, Metrobüs, Havalimanı, Marmara…

**Kötü haber:**
- Bu lokal paragraf **ortalama 43 kelime** = sayfa gövdesinin yalnızca **%4,3'ü**.
- `ilceler.json`'da daha zengin veri var (`giris`, `musteriProfili`, `sorunlar`, ilçe `sss`) ama bu alanlar **1350 sayfaya hiç enjekte edilmiyor** (yalnızca 25 ilçe ana sayfasında kullanılıyor).
- 1350 sayfada mahalle listesi, yapı tipi tablosu, ilçeye özel fiyat/kapsam, ilçeye özel SSS **yok**.
- İlçe adı sayfa başına ortalama 7-19 kez geçiyor (çoğu başlık/bağlantıda) — bu "lokal sinyal" değil, "kelime enjeksiyonu".

**İlçe özgünlük skoru ortalaması: 11,4 / 20** (aralık 9,8–13,7) — rubric'inize göre orta-düşük.

---

## 8 — Şablon Analizi (ortak gövde oranı)

Bir sayfanın benzersiz kelimelerinin ne kadarı, aynı hizmetin diğer ilçe sayfalarının ≥20/25'inde de geçiyor? (ilçe adları maskeli):

| Ölçüt | Değer |
|---|---|
| **Ortalama ortak gövde oranı** | **%88,7** |
| Medyan | %88,6 |
| Minimum | %85,8 |
| Maksimum | %92,7 |

→ Her sayfanın gövdesinin **~%89'u** kardeş sayfalarla ortak; gerçekten sayfaya özel kısım **~%11**.

Kullanıcının sorusuna göre konumlandırma: **%90 ortak bandına çok yakın, "içerik %90 ortak" denebilir.**

---

## 9 — Paragraf Tekrarı

- Toplam paragraf (≥30 karakter): **35.311**
- Benzersiz paragraf: **2.934**
- 1'den fazla sayfada geçen paragraf: **965**
- %90+ benzer paragraf çifti (kelime Jaccard ≥ 0,90): **32.672**

**En çok tekrar eden 20 paragraf:**

| Tekrar | Paragraf (ilk 110 karakter) |
|---|---|
| ×1.350 | "Bu Hizmetin Verildiği Diğer 25 İlçe" (başlık) |
| ×1.350 | "7/24 Hizmet · 1.840+ Tamamlanan Proje" (rozet) |
| ×1.242 | "Neden [İLÇE]'da Bizden Talepte Bulunmalısınız?" (başlık) |
| ×1.242 | "[İLÇE]'da Bu Hizmeti Alan Müşterilerimiz Ne Diyor?" (başlık) |
| ×325 | "Alçıpan Bölme Duvar ve Kaplamalar" (anchor/başlık) |
| ×299 | "Aynı Kategoride Diğer İç Mekan Dekorasyon Hizmetleri" |
| ×184 | "Aynı Kategoride Diğer Tıkanıklık Açma Hizmetleri" |
| ×175 | "Banyo Fayans ve Seramik Döşeme" (anchor) |
| ×175 | "Küvet Sökümü ve Duş Alanına Çevirme" (anchor) |
| ×175 | "Lavabo ve Banyo Dolabı Montajı" (anchor) |
| ×175 | "Elektrik Tesisatı Kurulumu ve Yenileme" (anchor) |
| ×175 | "Priz ve Anahtar Montajı / Değişimi" (anchor) |
| ×175 | "Elektrik Arıza Tespiti ve Onarımı" (anchor) |
| ×175 | "Klima Elektrik Bağlantısı ve Montajı" (anchor) |
| ×175 | "Mutfak Dolabı Yapımı ve Montajı" (anchor) |
| ×175 | "Tezgah Arası Cam Fayans Kaplama" (anchor) |
| ×175 | "Mutfak Evyesi ve Bataryası Montajı" (anchor) |
| ×175 | "Tuvalet Klozet Tıkanıklığı Açma" (anchor) |
| ×175 | "Mutfak Gideri Açma (Yağ Sökücü Makineyle)" (anchor) |
| ×175 | "Tıkalı Gider Açma (Robotla, Kırmadan)" (anchor) |

**Önemli tespit — 40+ kelimelik editorial paragraflar:** Hizmet `detay` paragrafları **birebir aynı metinle 25 sayfada** tekrar ediyor (ör. "Komple banyo tadilatı; eski seramiklerin sökümü, su ve atık tesisatının yenilenmesi…" ×25, "Banyo fayans ve seramik döşeme işlerinde yüzey hazırlığı…" ×25, "Eski küvetler özellikle 60-70 yaş üstü kullanıcılar için…" ×25). Bu, Google'ın "içerik yalnızca küçük farklarla çoğaltılmış" tanımına giren desendir.

---

## 10 — FAQ Analizi

| Soru | Cevap |
|---|---|
| İlçeler arası farklı FAQ seti olan hizmet | **0 / 54** (hepsi ilçeler arası birebir aynı) |
| Soru/cevap metninde ilçe adı geçen sayfa | **0** |
| Toplam benzersiz soru | **269** (beklenen 270; 1 soru 2 hizmette ortak) |
| En çok tekrar eden soru | "Tesisat yenilenirken duvar kırılır mı?" → **50 sayfada** |
| İkinci en çok | "Komple banyo tadilatı ne kadar sürer?" → 25 sayfada |
| FAQ özgünlük puanı ortalaması | **2 / 5** |

**Yorum:** FAQ'lar hizmete özel ve gerçekten kullanıcı sorusu gibi (bu iyi), ama ilçeye göre hiç değişmiyor. "Arnavutköy'de banyo tadilatı izni gerekir mi?" gibi lokal sorular yok.

---

## 11 — Google SEO Risk Analizi

| Risk | Seviye | Gerekçe (somut) |
|---|---|---|
| **A) Duplicate / near-duplicate content** | 🟡 **Orta** | Byte-byte kopya yok (0 duplicate HTML), canonical doğru. AMA aynı hizmetin 25 ilçe sayfası maskeli cosine %90,6 benzer; gövde %88,7 ortak. Google kopya cezası vermez ama **aynı gruptan tek sayfayı index'ler, diğerlerini filtreler** — 25 sayfanın 24'ünün trafik alamaması en olası sonuçtur [2](https://www.indexprobe.com/en/blog/why-duplicate-content-is-an-seo-issue/), [1](https://www.hostpapa.com/blog/marketing/does-duplicate-content-hurt-seo/). |
| **B) Thin content** | 🟢 **Düşük** | Ortalama 1.021 kelime/sayfa (min 879, max 1.190) — uzunluk olarak "ince" değil. Google'ın "thin" tanımı kelime sayısı değil **değerdir**; bu sayfalar gerçek hizmet detayı içeriyor [3](https://www.reddit.com/r/SEMrush/comments/1leadrk/thin_content_explained_how_to_identify_and_fix_it/). |
| **C) Doorway pages** | 🟡 **Orta** | Sayfalar doğrudan hizmet bilgisi ve FAQ içeriyor, saf "yönlendirme hunisi" değil. AMA 1.350 sayfa × aynı şablon + sonuçta "Hemen Arayın" CTA'sı, Google'ın doorway desenine ("her lokasyon için ince, neredeyse aynı sayfa") yaklaşıyor [2](https://storerocket.io/learn/doorway-pages). Tek işletme + gerçek hizmet alanı olduğu için hafifletici sebep var. |
| **D) Scaled content abuse** | 🔴 **Yüksek** | Google'ın Mart 2024 spam politikası: *"birincil amacı kullanıcılara yardım etmek değil, arama sıralamasını manipüle etmek olan, yalnızca küçük farklarla üretilmiş çok sayıda sayfa"*. Burada 1.350 sayfa, 25 ilçe adı + 43 kelimelik lokal paragraf dışında aynı içerikle üretiliyor — politikanın tarif ettiği "city-swap" deseni [5](https://patrickstox.com/programmatic-seo/risks/scaled-content-abuse/), [4](https://bulkbase.ai/seo/scaled-content-abuse-googles-policy-enforcement-how-to-stay-compliant-in-2026), [1](https://metaflow.life/blog/what-is-programmatic-seo). Hafifletici: niyet manipülatif değil (gerçek bir firma, gerçek hizmet, gerçek telefon). |
| **E) Search intent mismatch** | 🟢 **Düşük** | H1/title "ilçe + hizmet" sorgusuyla birebir örtüşüyor, FAQ gerçek soruları yanıtlıyor, canonical doğru. Arama niyeti puanı 10/10. |
| **F) Local landing page quality** | 🟡 **Orta** | Lokal paragraf var ama %4,3; mahalle listesi, ilçeye özel SSS, ilçeye özel fiyat/kapsam yok. Yorumların çoğu ilçeye özel değil (bkz. §16 örnek 1: Arnavutköy sayfasında "Ahmet K. · Başakşehir" yorumu görünüyor). |
| **G) Helpful / people-first content** | 🟡 **Orta** | Hizmet içeriği gerçekten faydalı (detaylar, faydalar, FAQ iyi). AMA %89 ortak gövde + tekrar eden yorumlar "insan için yazılmış" algısını zayıflatıyor. |

---

## 12 — "Google % Kaç Farklılık İstiyor?" Sorusunun Dürüst Cevabı

**Google tarafından belirlenmiş resmi bir % farklılık sınırı YOKTUR.**

- Google'ın kopya içerik için "10%" veya "30%" eşiği diye dolaşan sayıların **resmi kaynağı yoktur**; Google bir yüzde hesaplamaz, içeriği niteliksel (kalitatif) değerlendirir [2](https://www.indexprobe.com/en/blog/why-duplicate-content-is-an-seo-issue/), [5](https://www.quora.com/What-is-the-percentage-that-Google-allows-for-content-duplicate-on-any-website-for-SEO-perspective).
- Google'ın resmi dokümanlarında geçen kavramlar: **"little or no added value" (katma değer yok)**, **"substantially duplicate"**, **"scaled content abuse"**, **"doorway abuse"** — hepsi **yüzde değil, niyet + değer** üzerinden tanımlı [5](https://patrickstox.com/programmatic-seo/risks/scaled-content-abuse/), [4](https://bulkbase.ai/seo/scaled-content-abuse-googles-policy-enforcement-how-to-stay-compliant-in-2026).
- Bazı üçüncü taraf araçlar "en az %70 özgün içerik" önerir ama bu **şirket tavsiyesidir, Google kuralı değildir** [4](https://www.siteguru.co/seo-academy/duplicate-content).
- Google'ın kendi açıklaması (John Mueller / resmi blog): **"duplicate content penalty" yoktur**; çok benzer sayfalar tek canonical altında birleştirilir [3](https://www.hobo-web.co.uk/duplicate-content-problems/).

Bu yüzden size sahte bir yüzde vermeyeceğim. Gerçek risk ölçütü: **her sayfanın, o lokasyon/hizmete özgü, başka hiçbir yerde olmayan gerçek değer taşıyıp taşımadığıdır.** Bu projede ölçülen değer: ilçe başına yalnızca ~%4,3 lokal içerik → bu, scaled content abuse riskinin yüksek sayılması için yeterli bir sinyaldir.

---

## 13 — Puanlama (100 puanlık rubric — şeffaf formülle)

Formülün özeti (her bileşenin nasıl hesaplandığı): İçerik özgünlüğü = 25×(1 − aynı-hizmet ortalama benzerlik); İlçe özgünlüğü = uzmanlik oranı + ilçe adı kullanımı; Hizmet özgünlüğü = 20×(1 − aynı-ilçe ortalama benzerlik); Fayda = FAQ+yorum+uzunluk; Niyet = H1/title/canonical/robots uyumu; FAQ özgünlüğü = ilçeler arası farklılaşma; Lokal = lokal paragraf yoğunluğu.

| Bileşen | Ortalama | Min | Max |
|---|---|---|---|
| İçerik özgünlüğü (25) | 2,3 | 1,9 | 2,8 |
| İlçe özgünlüğü (20) | 11,4 | 9,8 | 13,7 |
| Hizmet özgünlüğü (20) | 16,4 | 16,0 | 17,0 |
| Kullanıcıya fayda (15) | 15,0 | 15 | 15 |
| Arama niyeti uyumu (10) | 10,0 | 10 | 10 |
| FAQ özgünlüğü (5) | 2,0 | 2 | 2 |
| Lokal bilgi (5) | 2,0 | 2 | 5 |
| **TOPLAM (100)** | **59,1** | 57,2 | 64,3 |

**Sınıflandırma sonucu:** 1.243 sayfa **0–59 (Riskli)**, 107 sayfa **60–69 (Geliştirilmeli)**, **0 sayfa** ≥70. Hiçbir sayfa "Kabul edilebilir" veya üzeri değil.

> ⚠️ Dürüstlük notu: Bu puanlama benim şeffaf proxy formülümdür, Google'ın puanı değildir. "Riskli" etiketi = bu ölçütlere göre özgünlük zayıf anlamındadır; teknik hata anlamında değildir.

---

## 14 — Sonuç Tablosu

| Metrik | Sonuç |
|---|---|
| Lokal sayfa | 1.350 |
| Ortalama içerik benzerliği (aynı hizmet, maskeli cosine) | **%90,6** |
| Median içerik benzerliği | %90,6 |
| Ortalama gerçek özgünlük (100 − benzerlik) | **%9,4** |
| %90+ benzer çiftler | 10.987 (%67,8) |
| %80–90 benzer çiftler | 5.213 (%32,2) |
| %70–80 benzer çiftler | 0 |
| %70 altı benzer çiftler | 0 |
| Riskli sayfalar (skor <60) | **1.243** |
| Çok iyi sayfalar (skor ≥90) | **0** |
| Birebir aynı paragraf (1+ sayfada) | 965 paragraf |
| 40+ kelimelik birebir aynı editorial paragraf | 54 detay × 25 sayfa |
| Duplicate FAQ (ilçeler arası) | 54/54 hizmette birebir aynı |
| İlçe özgünlük ortalaması | 11,4 / 20 |
| Hizmet özgünlük ortalaması | 16,4 / 20 |
| Ortak gövde oranı (maskeli) | %88,7 |

---

## 15 — En Riskli ve En Başarılı Sayfalar

### 🔴 En riskli 20 sayfa (skor en düşük)

> Not: Skorlar birbirine çok yakın (57,2–64,3) — aşağıdaki liste "en zayıf" uçtandır; fark sistemseldir, sayfa bazlı değil.

| Skor | URL (`/…/`) | Neden riskli |
|---|---|---|
| 57,2 | sisli/kuvet-sokumu-ve-dus-alanina-cevirme | Hizmetin ilçeler arası benzerliği en yüksek (0,922); kısa uzmanlik; ilçe eşleşmeli yorum yok |
| 57,4 | eyupsultan/kuvet-sokumu-ve-dus-alanina-cevirme | Aynı |
| 57,5 | sariyer/kuvet-sokumu-ve-dus-alanina-cevirme | Aynı |
| 57,5 | sisli/banyo-fayans-ve-seramik-doseme | Hizmet benzerliği 0,913; lokal metin kısa |
| 57,5 | sisli/ic-cephe-boya-ve-badana | Hizmet benzerliği 0,918 |
| 57,5 | sisli/mutfak-dolabi-yapimi-ve-montaji | Hizmet benzerliği 0,921 |
| 57,7 | eyupsultan/mutfak-dolabi-yapimi-ve-montaji | Aynı |
| 57,7 | sisli/gomme-dolap-ve-giyinme-odasi | Hizmet benzerliği 0,913 |
| 57,7 | sisli/perde-kornis-ve-stor-montaji | Hizmet benzerliği 0,917 |
| 57,7 | sisli/mutfak-fayans-ve-zemin-doseme | Hizmet benzerliği 0,913 |
| 57,7 | zeytinburnu/kuvet-sokumu-ve-dus-alanina-cevirme | En benzer çiftlerin ortağı (0,9466) |
| 57,8 | eyupsultan/banyo-fayans-ve-seramik-doseme | Aynı |
| 57,8 | eyupsultan/ic-cephe-boya-ve-badana | Aynı |
| 57,8 | kagithane/kuvet-sokumu-ve-dus-alanina-cevirme | Aynı |
| 57,8 | sariyer/mutfak-dolabi-yapimi-ve-montaji | Aynı |
| 57,8 | silivri/kuvet-sokumu-ve-dus-alanina-cevirme | En benzer çiftlerin ortağı |
| 57,8 | sisli/dusakabin-montaji-ve-degisimi | Aynı |
| 57,8 | sisli/alcipan-bolme-duvar-ve-kaplamalar | Aynı |
| 57,8 | sisli/ic-kapi-montaji-ve-degisimi | Aynı |
| 57,8 | sisli/kombi-bakimi-ve-ariza-onarimi | Aynı |

### 🟢 En başarılı 20 sayfa (skor en yüksek)

> "En başarılı" = en az kötü. Hepsi 57–64 bandında.

| Skor | URL (`/…/`) | Neden daha iyi |
|---|---|---|
| 64,3 | arnavutkoy/pencere-degisimi | Arnavutköy uzmanliği en uzunlardan; lokal puan 5/5 |
| 64,0 | arnavutkoy/petek-montaji-ve-degisimi | Aynı |
| 64,0 | arnavutkoy/petek-temizligi | Aynı |
| 63,7 | arnavutkoy/kanal-goruntuleme | Aynı |
| 63,5 | arnavutkoy/tuvalet-tikanikligi-acma | Aynı |
| 60,9 | basaksehir/pencere-degisimi | Başakşehir uzmanliği yer adlı (akustik panel, TV duvarı) |
| 60,8 | arnavutkoy/kombi-montaji-ve-degisimi | Aynı |
| 60,8 | arnavutkoy/su-kacagi-onarimi | Aynı |
| 60,7 | arnavutkoy/lavabo-tikanikligi-acma | Aynı |
| 60,7 | basaksehir/petek-temizligi | Aynı |
| 60,7 | kucukcekmece/pencere-degisimi | Lokal metin görece uzun |
| 60,6 | arnavutkoy/sigorta-kutusu-degisimi | Aynı |
| 60,6 | bagcilar/pencere-degisimi | Tekstil atölyesi/dükkan içeriği yerel |
| 60,6 | bahcelievler/pencere-degisimi | Şirinevler vb. yer adları |
| 60,6 | basaksehir/petek-montaji-ve-degisimi | Aynı |
| 60,5 | arnavutkoy/batarya-ve-musluk-degisimi | Aynı |
| 60,5 | arnavutkoy/su-kacagi-tespiti | Aynı |
| 60,5 | arnavutkoy/mutfak-gideri-acma | Aynı |
| 60,5 | bakirkoy/pencere-degisimi | Ataköy vb. yer adları |
| 60,5 | basaksehir/su-kacagi-onarimi | Aynı |

---

## 16 — Gerçek Örnekler (en az 10)

### Örnek 1 — Aynı hizmet, iki ilçe (Başakşehir vs Arnavutköy / komple-banyo-tadilati) — benzerlik ~0,90

**Sayfa A H1:** `Başakşehir Komple Banyo Tadilatı` · **Sayfa B H1:** `Arnavutköy Komple Banyo Tadilatı`

**Ortak içerik (birebir aynı):**
> "Komple banyo tadilatı; eski seramiklerin sökümü, su ve atık tesisatının yenilenmesi, karo döşeme, derz dolgusu, asma tavan, armatür ve vitrifiye montajını tek sözleşme altında toplayan anahtar teslim bir hizmettir. Ekibimiz önce sahada güncel yerinde ölçü alır, keşif raporu çıkarır ve size sabit fiyat…" (detay paragrafı — 25 ilçede birebir aynı)

**Değişen içerik:**
- Başakşehir uzmanliği: "Sitede yeni teslim daire düzenlemelerinde uzmanız: bembeyaz boya yerine renkli ve dokulu yüzeyler, akustik panelli TV duvarı ve gizli kablolama…"
- Arnavutköy uzmanliği: "Havalimanı kaynaklı istihdamla ilçeye taşınan aileler için anahtar teslim banyo ve mutfak tadilatı paketlerimiz ilk tercih oluyor. Site yönetimleriyle koordineli çalışıyor; asansör planlama, gürültü saati ve moloz çıkışı kurallarına tam uyum sağlıyoruz…"

**⚠️ Yorum hatası (kullanıcıya görünür):** Arnavutköy sayfasında şu yorum görünüyor:
> "Ahmet K. · **Başakşehir** — 'Söz verilen 12 günde bitti, her akşam WhatsApp…'"

Yani Başakşehir'den bir müşterinin yorumu Arnavutköy sayfasında sergileniyor (yorum seçim mantığı ilçe eşleşmesi bulamayınca hizmet geneli yorumlara düşüyor). İki sayfada da yorum bloğu **birebir aynı**.

### Örnek 2 — En benzer çift (Sultangazi vs Zeytinburnu / kuvet-sokumu) — 0,9466

- H1'ler: `Sultangazi Küvet Sökümü ve Duş Alanına Çevirme` vs `Zeytinburnu Küvet Sökümü ve Duş Alanına Çevirme`
- FAQ[0] her ikisinde de: "Küveti duşa çevirmek ne kadar tutar?" → aynı cevap.
- Yorumlar her ikisinde de: Figen A. · Beylikdüzü + Hüseyin D. · Sultangazi (aynı iki yorum).
- Fark: yalnızca H1/başlıklar + 3 cümlelik uzmanlik.

### Örnek 3–6 — Aynı desenin diğer çiftleri (benzerlik 0,9466–0,9451)
Esenyurt/Zeytinburnu kuvet (0,9466); Silivri/Zeytinburnu kuvet (0,9460); Sultangazi/Zeytinburnu mutfak-dolabi (0,9452); Sultangazi/Zeytinburnu tuvalet-tikanikligi (0,9451). Hepsi: aynı detay + aynı FAQ + aynı yorumlar, fark = ilçe adı + 43 kelimelik uzmanlik.

### Örnek 7 — Aynı ilçede farklı hizmet (Şişli) — farklılaşma GERÇEK
- `Şişli Komple Banyo Tadilatı Hizmeti` → detay banyo, FAQ "Banyo tadilatı ne kadar sürer?"
- `Şişli Elektrik Arıza Tespiti ve Onarımı Hizmeti` → detay elektrik, FAQ "Elektrik arıza tespiti ne kadar sürer?"
- `Şişli Su Kaçağı Tespiti Hizmeti` → detay su kaçağı, FAQ su kaçağına özel.
Aynı ilçe/farklı hizmet benzerliği ort. %18 → **hizmet ayrımı çalışıyor.**

### Örnek 8 — Aynı FAQ metni 25 sayfada
"Küveti duşa çevirmek ne kadar tutar?" sorusu ve cevabı 25 ilçede birebir aynı (ilçe adı hiç geçmiyor). "Tesisat yenilenirken duvar kırılır mı?" 50 sayfada (2 hizmet × 25 ilçe).

### Örnek 9 — Kalıp cümle ×1.350
> "Keşif ekibimiz hafta içi her gün [İLÇE] ve çevresine aynı gün gidebilmektedir; keşif ücretsizdir ve keşif sonrası [HİZMET] için sabit fiyat teklifi sunarız."

Bu cümle 1350 sayfada, yalnızca ilçe ve hizmet adı değiştirilmiş haliyle geçiyor.

### Örnek 10 — Hero rozeti ×1.350
"7/24 Hizmet · 1.840+ Tamamlanan Proje" rozeti tüm 1350 sayfada birebir aynı.

### Örnek 11 — Gerçek lokal değer (olumlu)
Şişli uzmanliği: "Nişantaşı prestij konutlarında özel ölçü mobilya ve aydınlatma projeleri; Mecidiyeköy ofislerinde akustik bölme ve kat planı dönüşümleri; eski mahallelerde tesisat-elektrik komple yenileme…" — bu tür cümleler sayfaya gerçek lokal değer katıyor, ancak toplam gövdenin %4,3'ü.

### Örnek 12 — İçerik alanlarının birebir aynılığı (özet)
KisaAciklama, detay, faydalar, FAQ, CTA, görseller, related services: her hizmet için 25 ilçede **birebir aynı**. Değişen: H1, başlıklar, uzmanlik, yorumlar (kısmen), diğer-ilçe link listesi.

---

## 17 — Öneriler (kod değişikliği YAPILMADI — yalnızca öneri)

Öncelik sırasına göre:

1. **🔴 En kritik: 1350 sayfanın tamamını birden yayınlamayın.** 54 hizmet × 25 ilçe matrisi yerine, önce **hizmet sayfaları (54) + ilçe sayfaları (25) + en güçlü lokal içeriği olan kombinasyonları** yayınlayın. Google'ın scaled content abuse riski, "1350 sayfanın hepsi aynı anda" senaryosunda en yüksektir.
2. **İlçeye özgü içerik miktarını artırın:** `ilceler.json`'da hâlihazırda var olan ama 1350 sayfaya enjekte edilmeyen `giris`, `musteriProfili`, `sorunlar` ve ilçe `sss` alanlarını sayfaya eklemek, lokal oranı %4,3'ten ~%15-20'ye çıkarır (bu tek başına en büyük iyileştirmedir).
3. **İlçeye özel FAQ üretin:** "Arnavutköy'de site içi çalışma kuralları nelerdir?", "Başakşehir'de yeni teslim dairede tadilat ne zaman yapılır?" gibi 2-3 lokal soru her sayfaya.
4. **Yorum eşleştirmesini düzeltin:** Başka ilçenin müşterisinin yorumu başka ilçe sayfasında görünmesin (ya ilçe eşleşmeli yorum yoksa bölümü gizleyin ya da "İstanbul geneli müşterilerimiz" olarak etiketleyin). Şu an bu, kullanıcı güvenini kıran görünür bir hatadır.
5. **Detay/faydalar metinlerini ilçe bazında hafifçe çeşitlendirin:** fiyat aralığı, bina tipi (müstakil/TOKİ/eski apartman), ulaşım süresi gibi lokasyonla değişen gerçek bilgiler ekleyin. **Kelime oyunuyla/spinning ile değil, gerçek farklı veriyle.**
6. **İndeks stratejisi belirleyin:** Aynı hizmetin 25 ilçe sayfasından hangileri gerçekten ayrı arama niyetine hizmet ediyorsa yalnız onları index'e bırakın; diğerleri için `noindex` düşünülebilir (bu bir kalite kararıdır, Google'a spam değil kullanıcı odaklı olduğunuzu gösterir).
7. **Blog'dan ilçe sayfalarına gerçek yerel içerik köprüleri:** mahalle bazlı rehber yazıları (ör. "Başakşehir'de Banyo Tadilatı Rehberi") ilçe sayfalarına özgün destek verir.

> Bu önerilerin hiçbiri uygulanmadı — talimatınıza uygun olarak yalnızca analiz raporlandı.

---

## 18 — SON KARAR

# 🟡 YAYINA ALINABİLİR AMA ŞU SAYFALAR DÜZELTİLMELİ

**Neden 🔴 değil:** Teknik altyapı kusursuz (canonical, robots, noindex, 404, schema, sitemap, H1, title hepsi temiz); içerik gerçek ve faydalı (1.021 kelime ortalaması, gerçek hizmet detayları, gerçek FAQ); hizmetler arası farklılaşma güçlü (aynı ilçede %18 benzerlik); her ilçede elle yazılmış gibi duran gerçek bir lokal paragraf var; niyet manipülatif değil — tek bir gerçek firma, gerçek telefon, gerçek hizmet alanı.

**Neden 🟢 değil:** Aynı hizmetin 25 ilçe sayfası maskeli cosine'de **%90,6 benzer**; gövdenin **%88,7'si ortak**; sayfaya özel içerik **yalnızca ~%11**; FAQ'ların **%100'ü** ilçeler arası birebir aynı; yorumlar çoğu sayfada aynı ve **başka ilçenin müşterisini gösteriyor**; 1.243/1.350 sayfa 100'lük rubric'te "Riskli" bandında. Bu kombinasyon, Google'ın **scaled content abuse** politikasındaki "yalnızca küçük farklarla üretilmiş çok sayıda sayfa" desenine ölçülebilir şekilde yakındır. Yayınlarsanız en olası sonuç ceza değil ama **aynı hizmetin 25 sayfasından 1-2'sinin index'lenip geri kalanının filtrelenmesi** ve trafik potansiyelinin büyük bölümünün boşa gitmesidir; kötü senaryoda algoritmik/manuel "thin content" aksiyonu alınabilir.

**Düzeltilmesi gereken sayfalar:** Tek tek değil, **sistemik** düzeltme gerekir — öncelikle §17'deki 1-6 numaralı maddeler. En acil üçü: (1) ilçe verisi (`giris`, `sorunlar`, `musteriProfili`, ilçe SSS) 1350 sayfaya enjekte edilmeli, (2) yorum eşleştirme hatası giderilmeli, (3) index stratejisi netleştirilmeden 1350 sayfanın tamamı birden yayına verilmemeli.

---

## Son Sorunun Net Cevabı

> **«Bu projedeki 1.350 sayfa, sadece ilçe ve hizmet isimleri değiştirilmiş 1.350 şablon sayfa mı, yoksa gerçekten farklı arama niyetlerine ve lokallere hizmet eden kaliteli lokal landing page'ler mi?»**

**Dürüst cevap: İkisinin arasında — ve şu anki hâliyle "şablon" tarafına daha yakın.**

- **Hizmet boyutu gerçekten farklı:** 54 hizmet birbirinden belirgin şekilde ayrışıyor (farklı detay, farklı FAQ, farklı kullanıcı sorusu; aynı ilçe içinde %18 benzerlik). "Elektrik arıza tespiti" ile "banyo tadilatı" sayfası kopya değil. Bu güçlü bir yön.
- **İlçe boyutu büyük ölçüde şablon:** Aynı hizmetin 25 ilçe versiyonu, ilçe adı + 43 kelimelik (gövdenin %4,3'ü) gerçek lokal paragraf + link listesi dışında birebir aynı içerik taşıyor. Kalan %89'luk gövde ilçeye göre değişmiyor.
- **Yani:** "İlçe ve hizmet isimleri değiştirilmiş 1.350 şablon sayfa" değiller (içlerinde gerçek, elle yazılmış lokal paragraflar ve hizmete özel içerik var), ama "gerçekten farklı lokallere hizmet eden kaliteli lokal landing page'ler" de değiller — **lokal farklılaşma şu an sayfanın görünür değerinin yalnızca küçük bir kısmını oluşturuyor.**

**Çözüm yol haritası:** Lokal içerik oranını %4,3'ten anlamlı bir seviyeye (%15-20) çıkarmak (mevcut veride bunun malzemesi zaten duruyor), yorum eşleştirmesini düzeltmek ve indeks stratejisi belirlemek — bu üç adım tamamlandığında aynı analizi yeniden koştuğumuzda bu raporun benzerlik tabloları çok daha sağlıklı bir resim gösterecektir.

---

## Ek: Doğrulama (başka bir AI veya uzman için)

Tüm sayılar tekrarlanabilir. Gereken adımlar:

```bash
cd /home/user/tamirustamist
npm install --no-audit --no-fund
npm run build        # → out/ üretilir (1448 sayfa)
```

Sonra `out/` içindeki 1.350 sayfa için: `<main id="icerik">` metnini çıkarın, 25 ilçe adını ve "İstanbul"u maskeleyin, TF-IDF cosine hesaplayın (16.200 aynı-hizmet çifti). Elde edilecek değerler: ortalama 0,906; medyan 0,906; max 0,947; min 0,866. Aynı-ilçe çiftleri (35.775): ortalama 0,182. Bu betikler bu raporun üretiminde kullanılmıştır (geçici dizinde; depoya yazılmamıştır).

---

**Önemli not:** Bu analiz Google'ın iç sıralama sistemlerinin simülasyonu değildir; ölçülebilir metin benzerliği ve Google'ın yayınladığı resmi spam politikaları temelinde bir risk değerlendirmesidir. Kesin sonuç yalnızca yayın sonrası Search Console verisiyle görülebilir.
