import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Icon from '../../components/Icons';
import HeroSection from '../../components/HeroSection';
import SectionHeading from '../../components/SectionHeading';
import ServiceCard from '../../components/ServiceCard';
import FAQAccordion from '../../components/FAQAccordion';
import Referanslar from '../../components/Referanslar';
import CTABanner from '../../components/CTABanner';
import Reveal from '../../components/Reveal';
import SchemaMarkup from '../../components/SchemaMarkup';
import {
  tümIlceSlugs,
  getIlce,
  tümHizmetler,
  ilceler,
  firma,
  siteUrl,
  metaDescription,
  pageTitle,
  aggregateRatingSchema,
} from '../../lib/site-data';

const heroImages = [
  '/images/hero.webp', '/images/insaat-1.webp', '/images/banyo-1.webp',
  '/images/mutfak-1.webp', '/images/boya-1.webp', '/images/tesisat-1.webp',
  '/images/elektrik-1.webp', '/images/parke-1.webp', '/images/ekip-1.webp',
  '/images/cati-1.webp', '/images/doseme-1.webp', '/images/arac-1.webp',
];

export function generateStaticParams() {
  return tümIlceSlugs.map((ilce) => ({ ilce }));
}

export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const i = getIlce(params.ilce);
  if (!i) return {};
  const title = pageTitle(`${i.ad} Tadilat, Yapı ve Tesisat Hizmetleri`);
  return {
    title,
    description: metaDescription(
      `${i.ad} tadilat firması: banyo, mutfak, boya, tesisat, su kaçağı tespiti ve kombi hizmetleri. ${i.ad}'da ücretsiz keşif, sabit fiyat, garantili işçilik. ${firma.telefon}`
    ),
    alternates: {
      canonical: `${siteUrl}/${i.slug}/`,
      languages: { 'tr-TR': `${siteUrl}/${i.slug}/`, 'x-default': `${siteUrl}/${i.slug}/` },
    },
    openGraph: {
      title,
      description: `${i.ad} bölgesinde tadilat ve tesisat uzmanı.`,
      url: `${siteUrl}/${i.slug}/`,
      images: [{ url: `${siteUrl}${heroImages[i.heroIndex % heroImages.length]}`, width: 1200, height: 630 }],
    },
  };
}

export default function IlcePage({ params }) {
  const ilce = getIlce(params.ilce);
  if (!ilce) notFound();

  const accent =
    ilce.accent && !['orange'].includes(ilce.accent) ? `data-ilce="${ilce.accent}"` : '';
  const heroImg = heroImages[ilce.heroIndex % heroImages.length];
  const layoutClass = `ilce-layout-${ilce.layout === 'B' ? 'B' : 'A'}`;
  const vurgulu = ilce.vurguluHizmetler
    .map((s) => tümHizmetler.find((h) => h.slug === s))
    .filter(Boolean);

  const h1Variations = {
    arnavutkoy: 'Arnavutköy Tadilat Firması — Banyo, Mutfak, Su Kaçağı ve Kombi Hizmetleri',
    avcilar: 'Avcılar Tadilat Ustası — Su Kaçağı Tespiti, Banyo Tadilatı, Boya Badana',
    bagcilar: 'Bağcılar Tadilat Firması — Komple Tadilat, Tesisat Yenileme, Parke Döşeme',
    bahcelievler: 'Bahçelievler Tadilat Ustası — Daire Yenileme, Mutfak, Banyo, Boya Badana',
    bakirkoy: 'Bakırköy Tadilat Firması — Prestijli Daire Tadilatı, Banyo, Mutfak, Tesisat',
    basaksehir: 'Başakşehir Tadilat Firması — Yeni Daire Tadilatı, Ses Yalıtımı, Giyinme Odası',
    bayrampasa: 'Bayrampaşa Tadilat Ustası — Daire Yenileme, Tıkanıklık Açma, Kombi Bakımı',
    besiktas: 'Beşiktaş Tadilat Firması — Lüks Daire Tadilatı, Banyo, Akustik, Giyinme Odası',
    beylikduzu: 'Beylikdüzü Tadilat Firması — Site Dairesi Tadilatı, Boya, Parke, Pencere Değişimi',
    beyoglu: 'Beyoğlu Tadilat Firması — Tarihi Bina Restorasyonu, Tesisat, Rutubet Giderme',
    buyukcekmece: 'Büyükçekmece Tadilat Ustası — Yazlık-Kışlık Dönüşümü, Kombi, Pencere, Boya',
    catalca: 'Çatalca Tadilat Firması — Köy Evi Tadilatı, Kombi, Tesisat, Elektrik Yenileme',
    esenler: 'Esenler Tadilat Ustası — Daire Yenileme, Tıkanıklık, Su Kaçağı, Boya Badana',
    esenyurt: 'Esenyurt Tadilat Firması — Yeni Nesil Daire Tadilatı, Banyo, Mutfak, Pencere',
    eyupsultan: 'Eyüpsultan Tadilat Firması — Villa Tadilatı, Banyo, Kombi, Pencere Değişimi',
    fatih: 'Fatih Tadilat Firması — Tarihi Suriçi Daire Tadilatı, Rutubet, Tesisat, Boya',
    gaziosmanpasa: 'Gaziosmanpaşa Tadilat Ustası — Eski Daire Yenileme, Mutfak, Parke, Kombi',
    gungoren: 'Güngören Tadilat Firması — Daire Tadilatı, Su Kaçağı, Pencere, Kombi Bakımı',
    kagithane: 'Kâğıthane Tadilat Firması — Döşeme, Mutfak, Bölme Duvar, Tesisat Yenileme',
    kucukcekmece: 'Küçükçekmece Tadilat Ustası — Banyo Tadilatı, Su Kaçağı, Pencere, Elektrik',
    sariyer: 'Sarıyer Tadilat Firması — Villa & Yalı Tadilatı, Giyinme Odası, Ses Yalıtımı',
    silivri: 'Silivri Tadilat Firması — Yazlık Bakım, Kombi, Banyo, Pencere, Tesisat',
    sultangazi: 'Sultangazi Tadilat Ustası — Daire Yenileme, Parke, Mutfak, Su Kaçağı',
    sisli: 'Şişli Tadilat Firması — Ofis & Daire Tadilatı, Akustik, Bölme Duvar, Giyinme Odası',
    zeytinburnu: 'Zeytinburnu Tadilat Ustası — Mutfak, Boya, Tesisat, Su Kaçağı, Tıkanıklık Açma',
  };
  const h1 = h1Variations[ilce.slug] || `${ilce.ad} Tadilat ve Yapı Hizmetleri`;

  const komuSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
    '@id': `${siteUrl}/${ilce.slug}/#isletme`,
    name: `${firma.ad} ${ilce.ad}`,
    description: `${ilce.ad} tadilat, yapı ve tesisat hizmetleri. ${ilce.giris.slice(0, 150)}`,
    url: `${siteUrl}/${ilce.slug}/`,
    telephone: firma.telefonTel,
    address: {
      '@type': 'PostalAddress',
      addressLocality: ilce.ad,
      addressRegion: 'İstanbul',
      addressCountry: 'TR',
    },
    areaServed: { '@type': 'City', name: ilce.ad },
    parentOrganization: { '@id': `${siteUrl}/#isletme` },
    ...aggregateRatingSchema,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: ilce.sss.map((f) => ({
      '@type': 'Question',
      name: f.s,
      acceptedAnswer: { '@type': 'Answer', text: f.c },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: `${ilce.ad} Tadilat`, item: `${siteUrl}/${ilce.slug}/` },
    ],
  };

  return (
    <div data-ilce={ilce.accent} className={layoutClass}>
      <SchemaMarkup data={komuSchema} />
      <SchemaMarkup data={faqSchema} />
      <SchemaMarkup data={breadcrumbSchema} />

      {/* 1 — HERO */}
      <HeroSection
        image={heroImg}
        h1={h1}
        sub={ilce.giris.slice(0, 220).trim() + '…'}
        trust
      >
        <span className="chip">
          <Icon name="mapPin" size={13} /> {ilce.bolge}
        </span>
      </HeroSection>

      {/* 2 — BÖLGE UZMANLIĞI / NEDEN BİZ */}
      <section className="section" aria-labelledby="bolge-uzmanlik">
        <div className="container-x">
          <div className="flip-bolge grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div className="relative">
                <img
                  src={heroImages[(ilce.heroIndex + 1) % heroImages.length]}
                  alt={`${ilce.ad} tadilat ekibi sahada çalışırken`}
                  loading="lazy"
                  width={640}
                  height={427}
                  className="aspect-[3/2] w-full rounded-3xl object-cover shadow-card"
                />
                <div
                  className="absolute -bottom-5 -right-3 rounded-2xl px-6 py-4 text-white shadow-xl"
                  style={{ background: 'var(--accent)' }}
                >
                  <div className="font-display text-3xl font-bold">{firma.deneyimYil}+</div>
                  <div className="text-xs font-semibold uppercase tracking-wider opacity-90">Yıllık Bölge Deneyimi</div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div>
                <span className="eyebrow">Neden {ilce.ad}'da Biz?</span>
                <h2 id="bolge-uzmanlik" className="mt-3 text-3xl sm:text-4xl">
                  {ilce.ad}'ın Yapı Dokusunu Biliyor, Sorunları Önceden Öngörüyoruz
                </h2>
                <p className="mt-4 leading-relaxed text-ink-600">{ilce.uzmanlik}</p>
                <p className="mt-4 leading-relaxed text-ink-500">{ilce.musteriProfili}</p>
                <ul className="mt-6 space-y-2.5">
                  {ilce.sorunlar.map((s) => (
                    <li key={s} className="flex items-start gap-2.5 text-[15px] text-ink-700">
                      <Icon name="checkCircle" size={18} className="mt-0.5 shrink-0 text-brand-600" />
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a href="/iletisim" className="btn-cta">
                    <Icon name="calendarCheck" size={17} /> Ücretsiz Keşif İste
                  </a>
                  <a href={`tel:${firma.telefonTel}`} className="btn-outline">
                    <Icon name="phone" size={16} /> {firma.telefon}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* VURGULU HİZMETLER */}
      {vurgulu.length > 0 && (
        <section className="section !py-14 bg-ink-50/50" aria-labelledby="vurgulu">
          <div className="container-x">
            <Reveal>
              <SectionHeading
                eyebrow={`${ilce.ad} İçin Öne Çıkanlar`}
                title={`Bu Bölgede En Çok Talep Edilen Hizmetler`}
                sub={`${ilce.ad} müşterilerimizin yoğun talebi üzerine seçtiğimiz hizmetler.`}
              />
            </Reveal>
            <div className="mt-8 grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {vurgulu.slice(0, 6).map((h, i) => (
                <Reveal key={h.slug} delay={(i % 3) * 60}>
                  <ServiceCard hizmet={h} compact />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3 — 54 HİZMET GRID */}
      <section className="section" aria-labelledby="tum-hizmetler">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="54 Hizmet"
              title={`${ilce.ad}'da Sunduğumuz Tüm Hizmetler`}
              sub="Her kart, ilçeye özel anahtar teslim hizmet sayfasına bağlanır. Dilerseniz doğrudan telefonla konuşarak ihtiyacınızı anlatın."
            />
          </Reveal>
          <div className="mt-8 grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tümHizmetler.map((h, i) => (
              <Reveal key={h.slug} delay={(i % 3) * 50}>
                <ServiceCard hizmet={h} compact ilceSlug={ilce.slug} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — REFERANSLAR (ilçe bazlı döngü) */}
      <section className="section bg-ink-50/50" aria-labelledby="ilce-referanslar">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Referanslar"
              title={`${ilce.ad} ve Çevresindeki Müşterilerimiz`}
              sub="İstanbul genelinde 1500'den fazla mutlu müşteri. İşte onlardan bazıları:"
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-10">
              <Referanslar limit={6} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5 — SSS */}
      <section className="section" aria-labelledby="ilce-sss">
        <div className="container-x max-w-4xl">
          <Reveal>
            <SectionHeading
              eyebrow="Önce Bizimle Konuşun"
              title={`${ilce.ad} Tadilat — Sık Sorulan Sorular`}
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-10">
              <FAQAccordion items={ilce.sss} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 6 — YAKIN İLÇELER */}
      <section className="section !py-14 bg-ink-50/50" aria-labelledby="komsular">
        <div className="container-x">
          <Reveal>
            <span className="eyebrow">Yakın Bölgeler</span>
            <h2 id="komsular" className="mt-3 text-2xl sm:text-3xl">
              {ilce.ad} Çevresinde de Hizmet Veriyoruz
            </h2>
          </Reveal>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {ilce.komsular.map((s) => {
              const k = getIlce(s);
              if (!k) return null;
              return (
                <Link
                  key={s}
                  href={`/${s}`}
                  className="card !rounded-full px-4 py-2 text-sm font-bold text-ink-700 hover:text-brand-700"
                >
                  {k.ad} <Icon name="arrowUpRight" size={13} className="inline text-brand-500" />
                </Link>
              );
            })}
          </div>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-ink-200 pt-6 text-sm">
            {ilceler.filter((x) => !ilce.komsular.includes(x.slug) && x.slug !== ilce.slug).map((x) => (
              <Link key={x.slug} href={`/${x.slug}`} className="text-ink-400 hover:text-brand-600">
                {x.ad} Tadilat
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — CTA */}
      <CTABanner
        title={`${ilce.ad} Tadilat için Hemen Arayın`}
        sub={`${ilce.ad} ve çevresinde ücretsiz keşif için bugün bize ulaşın; aynı gün fiyat teklifiniz hazır olsun.`}
      />
    </div>
  );
}