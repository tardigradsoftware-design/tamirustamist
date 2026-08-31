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
import { firma, siteUrl, ga4Id, gmbUrl } from '../lib/site-data';

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
  image: `${siteUrl}/images/og.jpg`,
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
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '236',
  },
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
  title: {
    default: `${firma.ad} | İstanbul Tadilat, Yapı ve Tesisat Firması`,
    template: `%s | ${firma.ad}`,
  },
  description:
    `${firma.ad} — İstanbul Avrupa Yakası'nda 25 ilçede tadilat, yapı ve tesisat hizmetleri. Banyo, mutfak, boya, parke, su kaçağı tespiti, kombi ve elektrik. Ücretsiz keşif, garantili işçilik, 7/24 acil servis.`,
  keywords: [
    'İstanbul tadilat firması', 'İstanbul tadilat ustası', 'İstanbul yapı firması',
    'İstanbul tesisat ustası', 'su kaçağı tespiti İstanbul', 'banyo tadilatı fiyatları',
    'mutfak tadilatı İstanbul', 'boya badana ustası', 'parke döşeme ustası',
    'kombi bakımı İstanbul', 'tıkanıklık açma', 'elektrik tesisatı yenileme',
    'İstanbul Avrupa Yakası tadilat', 'anonim şirket tadilat', 'komple daire tadilatı',
    'uzman tadilat firması', 'garantili işçilik', 'ücretsiz keşif tadilat',
  ],
  alternates: {
    canonical: siteUrl,
    languages: { 'tr-TR': `${siteUrl}/`, 'x-default': `${siteUrl}/` },
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: `${siteUrl}/`,
    siteName: firma.ad,
    title: `${firma.ad} | İstanbul Tadilat, Yapı ve Tesisat`,
    description: `${firma.slogan} Ücretsiz keşif ve yazılı işçilik garantisi.`,
    images: [{ url: `${siteUrl}/images/og.jpg`, width: 1200, height: 630, alt: firma.ad }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${firma.ad} | İstanbul Tadilat, Yapı ve Tesisat`,
    description: `${firma.slogan}`,
    images: [`${siteUrl}/images/og.jpg`],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr-TR">
      <head>
        <meta name="theme-color" content="#ea580c" />
        <meta name="format-detection" content="telephone=yes" />
        <link
          rel="icon"
          type="image/svg+xml"
          href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect x='4' y='4' width='56' height='56' rx='12' fill='%23ea580c'/%3E%3Cpath d='M32 14c-8.5 0-15.4 6.4-15.4 14v7h3.4v-7c0-5.4 5.2-10 12-10s12 4.6 12 10v7h3.4v-7c0-7.6-6.9-14-15.4-14z' fill='white'/%3E%3Cpath d='M19 37h26a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H19a3 3 0 0 1-3-3v-5a3 3 0 0 1 3-3z' fill='white'/%3E%3C/svg%3E"
        />
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