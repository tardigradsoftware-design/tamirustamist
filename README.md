# 🏗️ Tamir Ustam İstanbul — Kurumsal Web Sitesi

> İstanbul Avrupa Yakası'nda yapı, tadilat ve tesisat hizmetleri sunan **Tamir Ustam İstanbul** firması için geliştirilen profesyonel, SEO-optimizeli ve yüksek dönüşüm odaklı kurumsal web sitesi.

## 🚀 Hızlı Başlangıç

```bash
npm install
npm run build    # Tüm sayfaları statik olarak üretir (out/ klasörü)
npm run dev      # Geliştirme sunucusu (http://localhost:3000)
npm run preview  # Statik export'u sunar
```

## 📦 Proje Yapısı

```
/
├── config.json                  ← Firma bilgileri (tek merkezi kaynak)
├── data/
│   ├── hizmetler.json           ← 54 hizmet (7 kategori, benzersiz SSS)
│   ├── ilceler.json             ← 25 ilçe (benzersiz içerik, harita)
│   ├── faq.json                 ← Genel & süreç SSS havuzu
│   ├── referanslar.json         ← 18 müşteri yorumu
│   └── blog.json                ← 10 SEO blog yazısı
├── scripts/
│   ├── build-data.mjs           ← Veri doğrulama & birleştirme
│   ├── enrich-services.mjs      ← Hizmetlere görsel + referans enjeksiyonu
│   └── generate-sitemap.mjs     ← sitemap.xml + robots.txt üretimi
├── components/
│   ├── Header.jsx               ← Sticky mega menü (hizmetler + bölgeler)
│   ├── Footer.jsx               ← Kurumsal footer, ilçe linkleri
│   ├── HeroSection.jsx          ← Parallax hero, CTA'lar, güven rozeti
│   ├── ServiceCard.jsx          ← Hizmet kartı
│   ├── CTABanner.jsx            ← CTA bölümü
│   ├── WhatsAppButton.jsx       ← Floating WhatsApp butonu
│   ├── StickyCallBar.jsx        ← Mobil alt iletişim çubuğu
│   ├── FAQAccordion.jsx         ← SSS akordeon
│   ├── CounterStats.jsx         ← Animasyonlu sayaçlar
│   ├── ContactForm.jsx          ← 5 alanlı iletişim formu
│   ├── IlceHaritasi.jsx         ← SVG harita (25 ilçe, tıklanabilir)
│   ├── SchemaMarkup.jsx         ← JSON-LD
│   ├── Reveal.jsx               ← Scroll animasyon
│   ├── Icons.jsx                ← 45+ SVG ikon
│   ├── Logo.jsx                 ← Firma logosu (SVG)
│   ├── Breadcrumbs.jsx          ← İçerik yolu
│   ├── CookieBanner.jsx         ← KVKK çerez onayı
│   └── Referanslar.jsx          ← Müşteri yorumları
├── app/
│   ├── layout.jsx               ← Root layout, fontlar, LocalBusiness schema
│   ├── page.jsx                 ← Ana sayfa (10 bölüm)
│   ├── not-found.jsx            ← Özel 404 sayfası
│   ├── hakkimizda/page.jsx      ← Hakkımızda
│   ├── iletisim/page.jsx        ← İletişim formu + Google Maps
│   ├── hizmetler/page.jsx       ← Tüm hizmetler listesi
│   ├── hizmetler/[hizmetSlug]/  ← 54 hizmet detay sayfası
│   ├── [ilce]/page.jsx          ← 25 ilçe sayfası (benzersiz içerik)
│   ├── [ilce]/[hizmetSlug]/     ← 1350 lokasyon+hizmet sayfası
│   ├── blog/page.jsx            ← Blog listesi
│   └── blog/[blogSlug]/         ← 10 blog yazısı
├── public/
│   ├── sitemap.xml              ← 1445 URL (otomatik üretilen)
│   ├── robots.txt
│   └── images/                  ← WebP görseller
└── styles/
    └── globals.css              ← Tailwind, animasyonlar, ilçe varyantları
```

## 📊 Sayfa Mimarisi

| Tip | Sayı | Açıklama |
|-----|------|----------|
| Ana sayfa | 1 | Hero, harita, hizmetler, SSS, CTA |
| Hakkımızda | 1 | Kurumsal tanıtım, sayaçlar |
| İletişim | 1 | Form, Google Maps, acil servis |
| Hizmetler listesi | 1 | 7 kategori, 54 hizmet |
| Hizmet detay | 54 | Her biri özgün (detay + 5 SSS) |
| İlçe sayfası | 25 | Benzersiz içerik (%20 benzersizlik) |
| İlçe + hizmet | 1.350 | Lokasyon bazlı servis sayfası |
| Blog | 11 | Liste + 10 detay yazısı |
| 404 | 1 | Özel hata sayfası |
| **Toplam** | **1.447** | **Tümü statik HTML** |

## 🔍 SEO Özellikleri

- ✅ Benzersiz `<title>` (**≤600px**, ölçülmüş) ve `<meta description>` (≤160 krk) her sayfada
  - Google başlıkları karakterle değil **piksel genişliğiyle** keser (masaüstü ~600px).
    `pageTitle()` gerçek piksel genişliğini hesaplar; yaygın "60 karakter" kuralı Türkçe'de
    yanıltıcıdır (`ı, i, l, t` dar harfleri sayesinde 65 karakter rahatça sığar).
  - Bilgi önem sırasına göre korunur: `gövde+konum+marka` → `gövde+konum` → `gövde+marka`
    → `gövde` → kırpma. Kırpma yalnızca son çare.
  - Kök layout'ta `title.template` **kullanılmaz** — aksi hâlde marka adı iki kez eklenir
    (Google'ın "boilerplate tekrarı" yeniden yazma tetikleyicisi) ve kırpma işlevsiz kalır.
- ✅ Canonical URL + `hreflang` (tr-TR, x-default)
- ✅ Open Graph + Twitter Card meta etiketleri
- ✅ `robots.txt` ve `sitemap.xml` (1446 URL, `/404/` bilerek hariç)
- ✅ JSON-LD Structured Data:
  - `LocalBusiness` / `HomeAndConstructionBusiness` (ana sayfa + ilçe)
  - `Service` (hizmet sayfaları)
  - `BreadcrumbList` (tüm iç sayfalar)
  - `FAQPage` (tüm hizmet + ilçe sayfaları)
  - `BlogPosting` (blog yazıları)
  - `AggregateRating` — yalnızca `config.json → firma.degerlendirme.yayinla: true` ise
- ✅ Semantic HTML5 (`article`, `section`, `aside`, `nav`, `main`)
- ✅ Heading hiyerarşisi: tek `<h1>`, alt `<h2>`, `<h3>`
- ✅ Internal linking: ilçe ↔ hizmet çapraz bağlantı
- ✅ `alt` etiketli görseller, `loading="lazy"`
- ✅ KVKK uyumlu çerez bannerı + `/gizlilik-politikasi` ve `/kvkk-aydinlatma-metni` sayfaları
- ✅ Favicon seti (`favicon.ico`, `apple-touch-icon.png`, 192/512 PNG) + `site.webmanifest`
- ✅ OG görseli her sayfada mevcut ve doğrulanmış (`/images/og.jpg` 1200×630)
- ✅ Google Analytics 4 slot (GA4_ids config'de tanımlı)

## 🎨 Tasarım

- **Renk Paleti:** Beyaz arkaplan + turuncu (`#ea580c`) primary
- **Tipografi:** Plus Jakarta Sans (gövde) + Barlow Condensed (başlıklar) — self-hosted
- **İkonlar:** 45+ özel SVG ikon (line-style)
- **Animasyonlar:** Scroll-triggered fade-in/slide-up (IntersectionObserver)
- **İlçe varyantları:** `data-ilce` attribute ile CSS custom properties (`--accent`, `--accent-strong`, `--accent-soft`)

## 📱 CRO ve Dönüştüm

- Her sayfada en az 3 CTA noktası
- "Hemen Ara" butonu: tüm sayfalarda sabit (mobilde sticky bar)
- WhatsApp butonu: sağ alt, sabit, pulse animasyonu + etiket
- İletişim formu: 5 alan (Ad, Telefon, İlçe, Hizmet, Mesaj)
  - Form endpoint tanımlıysa POST, değilse WhatsApp fallback
- Ücretsiz keşif rozeti: hero, hizmet ve ilçe sayfalarında
- Sosyal kanıt: müşteri yorumları + proje sayaçları tüm sayfalarda

## 🗺️ İlçe Haritası

Gerçek ilçe sınırlarından üretilmiş, SVG tabanlı İstanbul Avrupa Yakası hizmet rehberi:
- 25 gerçek ilçe sınırı, coğrafi konumlara uygun görünüm
- Haritadan seçim + aranabilir liste + seçili ilçe detay kartı
- Renk grupları, hover/focus durumu ve mobil uyumlu iki kolonlu düzen
- Veri üretimi: `node scripts/build-ilce-map.mjs <ilce_geojson.json>`
- Kaynak: OpenStreetMap / Nominatim üzerinden alınan ilçe sınırları

## 🎯 İyileştirme Paketi (A / B / C)

- **A — Tasarım:** Split-screen hero + Google puan rozeti, interaktif ilçe haritası (zoom/pan/sürükle), footer'da tıklanabilir tel/e-posta/WhatsApp bandı, markalı skeleton loader, Framer Motion sayfa geçişleri
- **B — SEO:** `FAQPage` schema zenginleştirme (`inLanguage` + `about`), `Service` + `AggregateRating` schema, hero'da görünür yıldız puanı, blog 10 yazıya çıkarıldı, her hizmet + ilçe sayfasında müşteri yorumu, Google My Business config slotu + footer bağlantısı
- **C — İçerik/Görsel:** Her hizmete uygulama galerisi (AI görseller, WebP), müşteri referansları 18'e çıkarıldı, Hakkımızda'da ekip ve sertifika bölümü

## ⚙️ Teknik

| Özellik | Değer |
|---------|-------|
| Framework | Next.js 14.2 (App Router, SSG) |
| CSS | Tailwind CSS 3.4 |
| Fontlar | Plus Jakarta Sans + Barlow Condensed (self-hosted) |
| SSG Sayfa | 1447 |
| Bundle Boyutu | ~88-100 kB İlk Yükleme JS |
| Sitemap URL | 1445 |
| JSON-LD | Tüm sayfalarda |
| Image Format | WebP (30+ görsel) |

## 🔧 Firma Bilgilerini Güncelleme

Tüm firma bilgileri tek bir `config.json` dosyasında toplanmıştır. Değişiklik yapmak için:

```bash
# config.json'ı düzenle — site genelinde otomatik yansır
vim config.json
npm run build
```

---

**Geliştirici:** Tamir Ustam İstanbul · Next.js 14 + Tailwind CSS · Tam statik SSG output
## ⚠️ Yayına Almadan Önce (Launch Checklist)

`config.json` içindeki aşağıdaki alanlar **placeholder**'dır; canlıya çıkmadan gerçek
değerlerle değiştirilmelidir:

| Alan | Mevcut (placeholder) | Yapılacak |
|------|----------------------|-----------|
| `kargo_site` | `https://www.tamirustam.com` | Alınan gerçek alan adı |
| `firma.vergiNo` | `1234567890` | Gerçek vergi numarası |
| `firma.adres` | `Merkez Mah. Örnek Cad. No:42/A` | Gerçek adres (veya hizmet alanı ifadesi) |
| `firma.email` | `info@tamirustam.com` | Domain alındıktan sonra çalışan e-posta |
| `sosyalMedya.*` | Platform ana sayfaları | Gerçek profil URL'leri |
| `firma.degerlendirme.yayinla` | `false` | Google İşletme Profili doğrulanıp **gerçek** yorum birikince `true` |
| `firma.googleMyBusiness.url` | `""` | İşletme Profili bağlantısı |
| `form.endpoint` | `""` | Form servisi URL'i (boşsa WhatsApp'a düşer) |
| `analitik.ga4` | `""` | GA4 ölçüm kimliği (`G-XXXXXXX`) |

> **Not:** `degerlendirme.yayinla: false` iken puan/yorum rozeti hem görsel arayüzden
> hem de `AggregateRating` JSON-LD'sinden tamamen çıkarılır. Doğrulanamayan puan
> yayınlamak Google'ın yapılandırılmış veri spam politikasına aykırıdır.

### Google servisleri sırası
1. **Google İşletme Profili** — domain gerekmez; hizmet alanı işletmesi olarak açıp video ile doğrulayın
2. **Domain alındıktan sonra** — `config.json → kargo_site` güncelleyin, DNS TXT ile Search Console Domain property doğrulayın
3. **Site yayına girince** — GA4 property açıp `analitik.ga4` doldurun, GSC'yi GA4'e bağlayın
4. **Son olarak** — GSC'ye `sitemap.xml` gönderin
