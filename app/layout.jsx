import '@fontsource/plus-jakarta-sans/400.css';
import '@fontsource/plus-jakarta-sans/500.css';
import '@fontsource/plus-jakarta-sans/600.css';
import '@fontsource/plus-jakarta-sans/700.css';
import '@fontsource/plus-jakarta-sans/800.css';
import '@fontsource/barlow-condensed/500.css';
import '@fontsource/barlow-condensed/600.css';
import '@fontsource/barlow-condensed/700.css';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import StickyCallBar from '../components/StickyCallBar';
import CookieBanner from '../components/CookieBanner';
import SchemaMarkup from '../components/SchemaMarkup';
import {
  firma,
  siteUrl,
  ga4Id,
  gmbUrl,
  degerlendirme,
  pageTitle,
  metaDescription,
  ogGorsel,
  ogGorselVarsayilan,
} from '../lib/site-data';

// Fontlar self-hosted (@fontsource) — Google Fonts'a dış bağımlılık yok

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
  '@id': `${siteUrl}/#isletme`,
  name: firma.ad,
  alternateName: `${firma.kisaAd} Yapı Tadilat Tesisat`,
  description: firma.slogan,
  url: siteUrl,
  telephone: firma.telefonTel,
  email: firma.email,
  image: ogGorselVarsayilan,
  priceRange: '₺₺',
  foundingDate: firma.kurulusYili,
  ...(gmbUrl ? { sameAs: [gmbUrl] } : {}),
  areaServed: [
    { '@type': 'City', name: 'İstanbul' },
    { '@type': 'AdministrativeArea', name: 'Avrupa Yakası' },
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: firma.adres,
    addressLocality: 'İstanbul',
    addressRegion: 'İstanbul',
    addressCountry: 'TR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: firma.calismaKoordinatlari.lat,
    longitude: firma.calismaKoordinatlari.lng,
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '00:00',
    closes: '23:59',
  },
  /* AggregateRating yalnızca config.json'da doğrulanabilir gerçek veri
   * varsa yayınlanır. Google'ın yapılandırılmış veri spam politikası
   * uydurma puan/yorum sayısını manuel işlemle cezalandırabilir.
   * config.firma.degerlendirme.yayinla = false ise schema'dan tamamen çıkar. */
  ...(degerlendirme.yayinla && degerlendirme.yorumSayisi > 0
    ? {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: String(degerlendirme.puan),
          reviewCount: String(degerlendirme.yorumSayisi),
        },
      }
    : {}),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Yapı, Tadilat ve Tesisat Hizmetleri',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Komple Banyo Tadilatı' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Komple Mutfak Tadilatı' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Su Kaçağı Tespiti' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Kombi Montajı ve Bakımı' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Elektrik Tesisatı Yenileme' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Tıkanıklık Açma' } },
    ],
  },
};

export const metadata = {
  metadataBase: new URL(siteUrl),
  /* Not: `template` bilerek KULLANILMIYOR. Her sayfa kendi tam başlığını
   * lib/site-data.js → pageTitle() ile üretir; böylece marka adı iki kez
   * eklenmez ve 60 karakter sınırı gerçekten uygulanır. */
  title: {
    default: pageTitle('İstanbul Tadilat, Yapı ve Tesisat Firması'),
  },
  description: metaDescription(
    `İstanbul Avrupa Yakası 25 ilçede tadilat, yapı ve tesisat: banyo, mutfak, boya, parke, su kaçağı, kombi ve elektrik. Ücretsiz keşif, garantili işçilik, 7/24 acil servis.`
  ),
  keywords: [
    'İstanbul tadilat firması', 'İstanbul tadilat ustası', 'İstanbul yapı firması',
    'İstanbul tesisat ustası', 'su kaçağı tespiti İstanbul', 'banyo tadilatı fiyatları',
    'mutfak tadilatı İstanbul', 'boya badana ustası', 'parke döşeme ustası',
    'kombi bakımı İstanbul', 'tıkanıklık açma', 'elektrik tesisatı yenileme',
    'İstanbul Avrupa Yakası tadilat', 'anonim şirket tadilat', 'komple daire tadilatı',
    'uzman tadilat firması', 'garantili işçilik', 'ücretsiz keşif tadilat',
  ],
  alternates: {
    canonical: `${siteUrl}/`,
    languages: { 'tr-TR': `${siteUrl}/`, 'x-default': `${siteUrl}/` },
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: ['/favicon.ico'],
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: `${siteUrl}/`,
    siteName: firma.ad,
    title: `${firma.ad} | İstanbul Tadilat, Yapı ve Tesisat`,
    description: `${firma.slogan} Ücretsiz keşif ve yazılı işçilik garantisi.`,
    images: ogGorsel(),
  },
  twitter: {
    card: 'summary_large_image',
    title: `${firma.ad} | İstanbul Tadilat, Yapı ve Tesisat`,
    description: `${firma.slogan}`,
    images: [ogGorselVarsayilan],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr-TR">
      <head>
        <meta name="theme-color" content="#ea580c" />
        <meta name="format-detection" content="telephone=yes" />
        {/* Favicon/ikonlar metadata.icons üzerinden yönetiliyor (public/favicon.ico,
            icon-192.png, icon-512.png, apple-touch-icon.png) */}
        {ga4Id ? (
          <script id="ga-config" type="application/json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ga4Id) }} />
        ) : null}
      </head>
      <body className="flex min-h-screen flex-col">
        <SchemaMarkup data={localBusiness} />
        <a
          href="#icerik"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[80] focus:rounded-md focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
        >
          İçeriğe geç
        </a>
        <Header />
        <main id="icerik" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
        <StickyCallBar />
        <CookieBanner />
      </body>
    </html>
  );
}