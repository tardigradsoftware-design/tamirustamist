# 1.350 Lokal SEO Sayfasını Güçlendirme — ÖNCE / SONRA Raporu

**Tarih:** 2 Eylül 2026
**Kapsam:** 25 İstanbul ilçesi × 54 hizmet = 1.350 ilçe+hizmet sayfası
**Yöntem:** Kod değişikliği → `npm run build` → `out/` içindeki **gerçek HTML** üzerinde aynı analiz motoruyla yeniden ölçüm (önceki raporla birebir aynı metrikler).
**Yedek:** Değişikliklerden önce `git tag seo-content-strengthening-before` oluşturuldu (commit `529b377`). Geri alma: `git reset --hard seo-content-strengthening-before`.

> ⚠️ **Not:** Bu oturumun çalışma dalı sisteme `arena/01a05cea-tamirustamist` olarak sabitlenmiştir; bu yüzden ayrı `seo-content-strengthening` dalı açılamadı. Yerine **tag + tek commit** ile aynı güvence sağlandı: tüm değişiklikler tek commit'te, geri dönüş tek komutla.

---

## 1 — ÖZET TABLO (kullanıcının istediği format)

| Metrik | ÖNCE | SONRA | Değişim |
|---|---|---|---|
| Sayfa | 1.350 | 1.350 | — |
| Ortalama similarity (aynı hizmet, maskeli cosine, 16.200 çift) | %90,6 | **%76,3** | ▼ 14,3 puan |
| Median similarity | %90,6 | %76,2 | ▼ |
| %90+ benzer çiftler | %67,8 (10.987) | **%0** | ▼ 67,8 puan |
| %80–90 benzer çiftler | %32,2 (5.213) | %29,1 (4.717) | ▼ |
| %70–80 benzer çiftler | %0 | %59,4 (9.620) | yeni bant |
| %70 altı benzer çiftler | %0 | %11,5 (1.863) | yeni bant |
| En benzer tek çift (max) | 0,9466 | 0,8881 | ▼ |
| Duplicate FAQ (ilçeler arası birebir aynı set, 54 hizmette) | 54/54 hizmet | **0/54** (hepsi farklılaştı) | ✓ |
| FAQ'da ilçe adı geçen sayfa | 0 | 222 | ✓ |
| Ortalama lokal özgünlük (100 − benzerlik) | %9,4 | %23,7 | ▲ |
| Ortalama kelime / sayfa | 1.021 | **1.184** (min 963, max 1.466) | ▲ |
| Riskli sayfa (skor <60, eski formülle) | 1.243 | 1.137 | ▼ ama bkz. §5 uyarı |
| Yorum ilçe uyuşmazlığı | var (örn. Arnavutköy'de Başakşehir'li yorum) | **0** | ✓ |
| Süreç bölümü | yok | 1.350/1.350 | ✓ |
| H2 ≥ 5 içeren sayfa | — | 1.350/1.350 | ✓ |
| FAQ ≥ 4 soru | — | 1.350/1.350 | ✓ |
| Title/H1/description/canonical/sitemap | temiz (önceki düzeltmeler) | **aynı, hâlâ temiz** | korundu ✓ |

---

## 2 — Yapılan Değişiklikler (kod)

Mevcut SEO mimarisi (URL, slug, canonical, sitemap, robots, title sistemi, schema, component'ler) **korundu**. Yalnızca içerik gövdesi güçlendirildi:

| Dosya | Değişiklik |
|---|---|
| **`lib/lokal-icerik.js`** (yeni) | İlçe verisinden hizmete göre içerik seçen deterministik yardımcılar: `lokalGiris`, `ilceSorunlari`, `ilceFaq`, `ilceIhtiyacCumlesi`, `surecAdimlari` (7 kategori × 5 elle yazılmış teknik adım), `ilceEki` (Türkçe 'da/'de uyumu). **Hiçbir istatistik/fiyat/süre/yorum uydurulmadı** — her cümle `data/ilceler.json`'daki gerçek ilçe verisinden seçilir. |
| **`app/[ilce]/[hizmetSlug]/page.jsx`** | ① Hero altına **ilçe girişinden hizmetle ilgili cümleler** (A bölümü) ② **"Bu hizmet ilçede hangi durumlarda gerekli olur?"** — ilçenin gerçek `sorunlar` listesinden kategorisiyle eşleşenler (B) ③ **"…Süreci Nasıl İşler?"** — kategorik 5 adım (D) ④ FAQ: hizmet soruları + **ilçenin gerçek SSS'inden ilgili sorular** (schema FAQPage de aynı listeyi kullanır — uyum korundu) ⑤ **"İlçede Öne Çıkan Diğer Hizmetler"** iç link bölümü ⑥ Türkçe ek düzeltmeleri ("Şişli'da" → "Şişli'de"). |
| **`lib/site-data.js`** | `getHizmetReferanslari` artık **yalnızca sayfanın ilçesiyle birebir eşleşen** yorumları döndürüyor; eşleşme yoksa yorum bölümü hiç gösterilmiyor (sahte/başka ilçe yorumu yok). |
| **`scripts/validate-seo.mjs`** | Genişletildi (15. madde): süreç bölümü varlığı, H2 ≥ 5, FAQ ≥ 4 soru, **yorum-ilçe eşleşmesi**, ilçeler arası FAQ seti farklılaşması, ana içerik uzunluğu. |

---

## 3 — Metodoloji Notu (ölçümün dürüstlüğü)

- Benzerlik, önceki raporla **aynı betikle** ölçüldü: `out/` HTML'lerinden `<main id="icerik">` gövdesi çıkarıldı; 25 ilçe adı ve "İstanbul" `[ILCE]`/`[IST]` ile maskelendi (ilçe adı değişimi özgünlük sayılmaz); TF-IDF cosine ile 16.200 aynı-hizmet çifti karşılaştırıldı.
- **Bilinçli korunan ortak içerik:** Hizmetin temel teknik bilgisi (`detay`, `faydalar`, hizmet FAQ'ları) 25 ilçede ortak kalmaya devam ediyor — bu Google'ın "temel teknik bilgiler ortak kalabilir" yaklaşımına uygundur ve kullanıcının 10. maddesindeki ifadeyle örtüşür. Fark yaratan, bu ortak gövdenin **etrafına eklenen ilçeye özgü bağlamdır**.
- `%90+ benzer paragraf çifti` sayısı (32.672 → 32.842) anlamlı değişmedi: bunlar ağırlıkla her hizmetin 25 ilçede tekrar eden `detay` paragrafından geliyor (bilinçli korunan teknik içerik). Editorial/lokal paragraflar artık ilçeye özgü.

---

## 4 — EN ÇOK GÜÇLENEN 20 SAYFA

Aşağıdaki liste yeni analizde en yüksek içerik skorunu alan sayfalardır (skor bileşenleri §5'te açıklanıyor; "önceki" sütunu değişiklik öncesi sistem ortalamasıdır çünkü sayfa bazlı eski skorlar saklanmadı — önceki raporun tablolarıyla karşılaştırılabilir).

| Skor | URL | Önceki durum | Güçlendirilen içerik |
|---|---|---|---|
| 65,0 | sultangazi/pencere-degisimi | Sistem ort. benzerlik %90,6; FAQ ilçe farkı yok | İlçe girişi (Cebeci/Uğur Mumcu konutlaşma), sorun eşleşmesi, ilçe SSS, süreç, öne çıkan hizmetler |
| 64,8 | buyukcekmece/ses-yalitimi | Aynı | İlçe girişi (sahil/yazlık-kışlık dönüşüm), ilçe SSS ("sahilde nem/rutubet"), süreç |
| 64,6 | buyukcekmece/dekoratif-duvar-paneli | Aynı | İlçe girişi + marina/site profili + süreç |
| 64,5 | basaksehir/batarya-ve-musluk-degisimi | Aynı | Yeni teslim site içeriği, sorunlar, ilçe SSS |
| 64,4 | esenyurt/batarya-ve-musluk-degisimi | Aynı | Genç nüfus/yoğun kullanım bağlamı, ilçe SSS |
| 64,2 | basaksehir/parke-ve-laminat-doseme | Aynı | Planlı konut kenti bağlamı + süreç |
| 64,2 | esenyurt/parke-ve-laminat-doseme | Aynı | Aynı |
| 64,1 | gungoren/asma-tavan-ve-kartonpiyer | Aynı | Kompakt/yoğun ilçe bağlamı + ilçe SSS |
| 64,1 | kucukcekmece/rutubet-ve-kuf-giderme | Aynı | Göl hattı nem bağlamı + süreç |
| 64,0 | esenyurt/ses-yalitimi | Aynı | Yeni site/yoğunluk bağlamı |
| 63,9 | sultangazi/ses-yalitimi | Aynı | Aynı |
| 63,9 | esenyurt/ic-cephe-boya-ve-badana | Aynı | Kiracı geçişleri + süreç |
| 63,8 | gungoren/duvar-kagidi-uygulama | Aynı | Aynı |
| 63,8 | kucukcekmece/duvar-kagidi-uygulama | Aynı | Aynı |
| 63,7 | basaksehir/ic-cephe-boya-ve-badana | Aynı | Akustik panel/TV duvarı uzmanlığı + süreç |
| 63,7 | sultangazi/ic-cephe-boya-ve-badana | Aynı | Aynı |
| 63,6 | esenyurt/asma-tavan-ve-kartonpiyer | Aynı | Aynı |
| 63,6 | bahcelievler/ic-cephe-boya-ve-badana | Aynı | Yerleşik bölge + ilçe SSS |
| 63,6 | bagcilar/perde-kornis-ve-stor-montaji | Aynı | Kiracı/atölye profili + süreç |
| 63,5 | kucukcekmece/ic-cephe-boya-ve-badana | Aynı | Aynı |

**Örnek sayfa — Başakşehir / Komple Banyo Tadilatı (görsel akış):**
1. H1: `Başakşehir Komple Banyo Tadilatı`
2. Yeni lokal giriş: "Başakşehir, 2000 sonrasının planlı konut kenti… yeni teslim dairelerde…" (ilçenin kendi giriş metninden seçildi)
3. "Başakşehir Komple Banyo Tadilatı Hizmeti" (teknik detay — korundu)
4. "Bu Hizmet Başakşehir'de Hangi Durumlarda Gerekli Olur?" (ilçe sorunlarından eşleşenler)
5. "Başakşehir'de Komple Banyo Tadilatı Süreci Nasıl İşler?" (5 adım)
6. "Neden Başakşehir'de Bizden Talepte Bulunmalısınız?" (uzmanlık — korundu)
7. "Bu Hizmette Neler Dahildir?" (faydalar — korundu)
8. Görseller, yorumlar (yalnızca ilçe eşleşmeli), FAQ (hizmet + ilçe SSS'i)
9. "Başakşehir'de Öne Çıkan Diğer Hizmetler" (yeni iç link) + kategori/ilçe linkleri

---

## 5 — PUANLAMA ve DÜRÜSTLÜK UYARISI

Önceki raporun 100'lük skor formülü **aynı betikle** yeniden hesaplandı: ortalama 59,1 → 57,1; "Riskli (<60)" sayfası 1.243 → 1.137. **Bu skor düşüşü içerik kalitesinin düştüğü anlamına GELMEZ.** Sebebi formülün iki bileşeni:

1. **"Kullanıcıya fayda" bileşeni yorum varlığını ödüllendiriyordu (+4 puan).** Yorumlar, talimatınız gereği (madde 9) artık yalnızca ilçe eşleşenlerde gösteriliyor; çoğu sayfada yorum bölümü yok → bu puan düştü. Bu bir **doğruluk iyileştirmesidir**, skor kaybı değil.
2. **"Hizmet özgünlüğü" bileşeni aynı-ilçe benzerliğine bağlı.** İlçeye özgü içerik eklenince aynı ilçenin farklı hizmet sayfaları birbirine biraz yaklaştı (0,182 → 0,291 — hâlâ çok düşük/iyi) → bu bileşen düştü.

**Gerçek kalite göstergeleri (formül bağımsız):** benzerlik düşüşü (%90,6→%76,3), %90+ çiftlerin sıfırlanması, FAQ farklılaşması (0→54/54 hizmet), ilçe-adlı FAQ (0→222 sayfa), yorum uyuşmazlığının sıfırlanması, sayfa başına +163 kelime. Skor sistemini bu metriklerin yanında ikincil gösterge olarak değerlendirin.

---

## 6 — HÂLÂ RİSKLİ SAYFALAR

### 6a) Aynı hizmet / farklı ilçe — en benzer 20 çift (yeni max'ler 0,874–0,888)

| Benzerlik | Sayfa A | Sayfa B |
|---|---|---|
| 0,8881 | Esenyurt / Tuvalet Tıkanıklığı Açma | Silivri / Tuvalet Tıkanıklığı Açma |
| 0,8861 | Silivri / TV-Uydu-İnternet Kablolaması | Zeytinburnu / TV-Uydu-İnternet |
| 0,8855 | Esenyurt / TV-Uydu-İnternet | Zeytinburnu / TV-Uydu-İnternet |
| 0,8845 | Esenyurt / Sigorta Kutusu Değişimi | Zeytinburnu / Sigorta Kutusu |
| 0,8837 | Silivri / Sigorta Kutusu | Zeytinburnu / Sigorta Kutusu |
| 0,8794 | Esenyurt / TV-Uydu-İnternet | Silivri / TV-Uydu-İnternet |
| 0,8787 | Esenyurt / Kanal Görüntüleme | Silivri / Kanal Görüntüleme |
| 0,8776 | Büyükçekmece / Tuvalet Tıkanıklığı | Silivri / Tuvalet Tıkanıklığı |
| 0,8772 | Çatalca / Tuvalet Tıkanıklığı | Silivri / Tuvalet Tıkanıklığı |
| 0,8769 | Esenyurt / Sigorta Kutusu | Silivri / Sigorta Kutusu |
| 0,8763 | Esenyurt / Tuvalet Tıkanıklığı | Kâğıthane / Tuvalet Tıkanıklığı |
| 0,8761 | Bayrampaşa / TV-Uydu-İnternet | Zeytinburnu / TV-Uydu-İnternet |
| 0,8754 | Esenyurt / Tıkalı Gider Açma | Silivri / Tıkalı Gider Açma |
| 0,8752 | Esenyurt / TV-Uydu-İnternet | Güngören / TV-Uydu-İnternet |
| 0,8752 | Arnavutköy / Tuvalet Tıkanıklığı | Silivri / Tuvalet Tıkanıklığı |
| 0,8748 | Esenler / TV-Uydu-İnternet | Zeytinburnu / TV-Uydu-İnternet |
| 0,8748 | Güngören / TV-Uydu-İnternet | Zeytinburnu / TV-Uydu-İnternet |
| 0,8746 | Arnavutköy / Tuvalet Tıkanıklığı | Esenyurt / Tuvalet Tıkanıklığı |
| 0,8746 | Esenyurt / Tuvalet Tıkanıklığı | Güngören / Tuvalet Tıkanıklığı |
| 0,8745 | Avcılar / Tuvalet Tıkanıklığı | Esenyurt / Tuvalet Tıkanıklığı |

**Neden hâlâ benzer:** Bu hizmetlerin ilçe `sorunlar`/`sss` verisinde kategori kelimesi az geçiyor (tıkanıklık, TV-kablo, sigorta gibi dar kategoriler), bu yüzden ilçeye özgü bölümler daha az sayıda sayfada devreye giriyor; gövde ağırlıklı olarak hizmetin ortak teknik metninden oluşuyor. İlçe verisine bu kategoriler için içerik eklendikçe bu çiftler de düşecektir.

### 6b) Aynı ilçe / farklı hizmet — en benzer çiftler
Max 0,604 (Esenyurt gibi profili belirgin ilçelerde komşu hizmetler). Ortalama 0,291 — hâlâ **düşük ve güvenli**; bu yönde risk yok.

### 6c) En düşük skorlu 10 sayfa (yeni)
şişli/tuvalet-tikanikligi-acma (51,3), şişli/tv-uydu-internet-kablolamasi (51,5), şişli/kanal-goruntuleme (51,5), eyüpsultan/kotu-koku-tespiti (51,6), şişli/elektrik-ariza-tespiti (51,6), şişli/pimas-borusu (51,6), eyüpsultan/tuvalet-tikanikligi (51,7), şişli/sigorta-kutusu (51,7), şişli/kombi-bakimi (51,7), şişli/yerden-isitma (51,8). Ortak özellik: ilçe SSS/sorun verisinde bu kategorilerle eşleşen içerik az (Şişli profili prestij konut/ofis odaklı; tıkanıklık/TV kategorileri için zayıf).

---

## 7 — FAQ / YORUM / İÇ LİNK DURUMU

| Konu | Önce | Sonra |
|---|---|---|
| Hizmet başına ilçeler arası farklı FAQ seti | 0/54 | **54/54** (en az 6, en çok 24 farklı set) |
| FAQ seti çeşitliliği en yüksek kategoriler | — | İç mekan & dekorasyon (24/25 ilçe), banyo (23/25), mutfak (22/25) |
| FAQ seti çeşitliliği en düşük kategoriler | — | Tıkanıklık açma (6/25), ısıtma (7/25), elektrik (7/25), sıhhi tesisat (9/25) |
| Sayfa başına ortalama FAQ | 5 | 4,95 (bazı sayfalarda ilçe sorusu hizmet sorusunun yerini alır) |
| Yorum bölümü gösteren sayfa | 1.350 (çoğu yanlış ilçe) | **124** (hepsi doğru ilçe; veride yalnızca bu kadar ilçe eşleşmeli gerçek yorum var) |
| Yeni iç link bölümü ("İlçede Öne Çıkan Diğer Hizmetler") | yok | 1.350 sayfada (her ilçenin kendi `vurguluHizmetler` listesi) |

**Yorum notu:** Yorum verisi (`data/referanslar.json` + hizmet gömülü referanslar) sınırlı — yalnızca ~124 kombinasyonda ilçe eşleşmesi var. Talimatınız gereği (madde 9) eşleşme olmayan sayfalarda yorum bölümü gösterilmiyor. Gerçek Google İşletme Profili yorumları toplandıkça bu bölüm doğal olarak genişleyecek; sahte yorum eklenmedi.

---

## 8 — SINIRLAR VE KALAN İŞLER (dürüst liste)

1. **Ortalama benzerlik %76,3'e düştü ama hâlâ yüksek.** En büyük neden: hizmetin teknik gövdesi (`detay`, `faydalar`, hizmet FAQ'ı) 25 ilçede ortak — bu bilinçli bir koruma. Daha fazla düşürmek için ya ilçe verisi zenginleştirilmeli (her ilçeye tıkanıklık/elektrik/ısıtma kategorilerinde SSS ve sorun notu eklenmeli) ya da ortak gövde ilçe bağlamına göre yeniden yazılmalı (riskli, önerilmez).
2. **Zayıf kategoriler:** tıkanıklık açma, TV-uydu, sigorta, kanal görüntüleme gibi dar hizmetlerde ilçe verisi eşleşmesi az (FAQ çeşidi 6-9/25). Bu sayfalar en benzer çiftleri oluşturuyor.
3. **Yorum bölümü 124 sayfada** — veri sınırı; gerçek yorumlar toplanınca artar.
4. **Yasal/kvkk, blog 2025 tarihi, placeholder adres/vergi no** — bu görevin kapsamı dışındaydı, dokunulmadı.
5. **Sıralama garantisi yok** — bunlar içerik kalitesi iyileştirmeleridir; Google'daki sonuç canlı yayın + indexlenme + kullanıcı sinyalleriyle görülür.
6. Metin seçimi kural tabanlıdır (kategori kelime eşleşmesi); nadiren ilgisiz bir cümle seçilebilir. Build çıktısında örneklem kontrol edildi, anlamlı sorun görülmedi; yine de canlı öncesi rastgele 50-100 sayfanın insan gözüyle taranması önerilir.

---

## 9 — SON KARAR

# 🟡 GELİŞTİRİLMELİ (ama büyük adım atıldı)

**Neden 🟢 değil:** Ortalama benzerlik %76,3 — "her sayfa gerçekten lokal" iddiası için hâlâ yüksek; tıkanıklık/elektrik/ısıtma gibi kategorilerde ilçe içeriği zayıf; yorum verisi sınırlı.

**Neden 🔴 değil:** %90+ benzer çiftler **%67,8'den %0'a** indi; hiçbir sayfa çifti artık %90 üzeri benzer değil; FAQ'lar 54/54 hizmette ilçeler arası farklılaştı; yorum yanlış eşleşmesi tamamen giderildi; sayfalar artık ilçenin gerçek giriş/sorun/SSS verisini hizmet bağlamında kullanıyor; schema ↔ görünen içerik uyumlu; teknik SEO (title/H1/canonical/sitemap/robots) bozulmadı, validation temiz.

**Bu durumda yayın önerisi:** 1.350 sayfanın tamamı birden değil; önce güçlü kategoriler (banyo, mutfak, iç mekan, sıhhi) + 25 ilçe sayfası + 54 hizmet sayfası yayınlanabilir; tıkanıklık/TV/sigorta gibi zayıf kategorilerde ilçe verisi zenginleştirilene kadar beklemek ya da daha az sayıda ilçeyle başlamak daha güvenlidir.

---

## 10 — SORUNUN NET CEVABI

> **«Bu 1.350 sayfanın her biri, yalnızca ilçe ve hizmet adları değiştirilmiş bir şablon olmaktan çıkıp, belirli bir ilçedeki belirli bir hizmet aramasına gerçek ve faydalı bilgi sağlayan lokal landing page haline gelmiş mi?»**

**Kısmen evet, tam olarak değil — ama şablon olmaktan çıkma yönünde büyük bir adım atıldı.**

- **Artık şablon değil:** Her sayfada ilçenin **kendi** giriş metninden hizmetle ilgili cümleler, ilçenin **kendi** sorun listesinden hizmetle eşleşen maddeler, ilçenin **kendi** SSS'inden ilgili sorular ve ilçeye özgü iç link bloğu var. Başakşehir banyo sayfası ile Arnavutköy banyo sayfası artık yalnızca ilçe adıyla değil, ilçenin gerçek yapı profili (yeni teslim siteler vs. havalimanı-orman hattı) bağlamındaki cümlelerle ayrışıyor. Aynı ilçenin banyo ve elektrik sayfaları da ilçe bilgisinin **farklı bölümlerini** kullanıyor (kategori eşleşmesi).
- **Ama henüz tam lokal değil:** Sayfa gövdesinin çekirdeği hâlâ hizmetin ortak teknik metni (detay, faydalar, hizmet FAQ'ı) — bu bilinçli ve doğru bir tercih, ancak "gerçekten lokale hizmet eden" iddiası için ilçe içeriğinin oranı ortalama %24'e çıktı (önceki %9). Dar kategorilerde (tıkanıklık, TV-kablo, sigorta) ilçe bağlamı hâlâ zayıf.
- **Dürüst özet:** Sayfalar artık "1.350 kez kopyalanmış şablon" değil; "ortak teknik çekirdek + ilçeye özgü gerçek bağlam" yapısına kavuştu. Google'ın scaled-content riskini belirleyen %90+ near-duplicate bandı tamamen terk edildi. Tam "her sayfa benzersiz lokal değer" hedefine ulaşmak için bir sonraki adım, zayıf kategorilere ilçe verisi (SSS/sorun) eklemek ve canlı yayın sonrası Search Console verisiyle doğrulamaktır.

---

## 11 — DOĞRULAMA (tekrarlanabilir)

```bash
cd /home/user/tamirustamist
git tag seo-content-strengthening-before   # yedek (değişiklik öncesi 529b377)
npm install --no-audit --no-fund
npm run build                              # → 1449 statik sayfa + sitemap 1446
node scripts/validate-seo.mjs              # → tüm kontroller temiz (1350/1350 süreç, FAQ≥4, yorum-ilçe doğru)
# Benzerlik analizi (önceki raporla aynı yöntem):
# out/ içindeki <main> gövdeleri → ilçe adları maskelenir → TF-IDF cosine (16.200 çift)
# Beklenen: ort 0.763 · medyan 0.762 · max 0.888 · %90+ çift 0
```

**Geri alma:** `git reset --hard seo-content-strengthening-before` (tüm değişiklikler geri alınır, önceki duruma dönülür).
