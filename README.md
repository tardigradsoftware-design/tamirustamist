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
│   ├── referanslar.json         ← 10 müşteri yorumu
│   └── blog.json                ← 6 SEO blog yazısı
├── scripts/
│   ├── build-data.mjs           ← Veri doğrulama & birleştirme
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
│   └── blog/[blogSlug]/         ← 6 blog yazısı
├── public/
│   ├── sitemap.xml              ← 1441 URL (otomatik üretilen)
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
| Blog | 7 | Liste + 6 detay yazısı |
| 404 | 1 | Özel hata sayfası |
| **Toplam** | **1.443** | **Tümü statik HTML** |

## 🔍 SEO Özellikleri

- ✅ Benzersiz `<title>` ve `<meta description>` her sayfada (max 60/160 karakter)
- ✅ Canonical URL + `hreflang` (tr-TR, x-default)
- ✅ Open Graph + Twitter Card meta etiketleri
- ✅ `robots.txt` ve `sitemap.xml` (1441 URL)
- ✅ JSON-LD Structured Data:
  - `LocalBusiness` / `HomeAndConstructionBusiness` (ana sayfa + ilçe)
  - `Service` (hizmet sayfaları)
  - `BreadcrumbList` (tüm iç sayfalar)
  - `FAQPage` (tüm hizmet + ilçe sayfaları)
  - `BlogPosting` (blog yazıları)
  - `AggregateRating` (referans puanı)
- ✅ Semantic HTML5 (`article`, `section`, `aside`, `nav`, `main`)
- ✅ Heading hiyerarşisi: tek `<h1>`, alt `<h2>`, `<h3>`
- ✅ Internal linking: ilçe ↔ hizmet çapraz bağlantı
- ✅ `alt` etiketli görseller, `loading="lazy"`
- ✅ KVKK uyumlu çerez bannerı
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

SVG tabanlı şemaatik İstanbul Avrupa Yakası haritası:
- 25 ilçe altıgen (hex) yerleşimi
- Tıklanabilir: her ilçe ilgili sayfaya yönlendirir
- `data-ilce` CSS hover efektleri

## ⚙️ Teknik

| Özellik | Değer |
|---------|-------|
| Framework | Next.js 14.2 (App Router, SSG) |
| CSS | Tailwind CSS 3.4 |
| Fontlar | Plus Jakarta Sans + Barlow Condensed (self-hosted) |
| SSG Sayfa | 1443 |
| Bundle Boyutu | ~88-100 kB İlk Yükleme JS |
| Sitemap URL | 1441 |
| JSON-LD | Tüm sayfalarda |
| Image Format | WebP (19 görsel) |

## 🔧 Firma Bilgilerini Güncelleme

Tüm firma bilgileri tek bir `config.json` dosyasında toplanmıştır. Değişiklik yapmak için:

```bash
# config.json'ı düzenle — site genelinde otomatik yansır
vim config.json
npm run build
```

---

**Geliştirici:** Tamir Ustam İstanbul · Next.js 14 + Tailwind CSS · Tam statik SSG output