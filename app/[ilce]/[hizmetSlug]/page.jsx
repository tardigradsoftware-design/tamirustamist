import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Icon from '../../../components/Icons';
import ServiceCard from '../../../components/ServiceCard';
import FAQAccordion from '../../../components/FAQAccordion';
import CTABanner from '../../../components/CTABanner';
import SchemaMarkup from '../../../components/SchemaMarkup';
import {
  tümIlceSlugs,
  tümHizmetSlugs,
  getIlce,
  getHizmet,
  hizmetBazliSlugs,
  ilceler,
  firma,
  siteUrl,
  metaDescription,
} from '../../../lib/site-data';

export function generateStaticParams() {
  const out = [];
  for (const ilce of tümIlceSlugs) {
    for (const hizmetSlug of tümHizmetSlugs) {
      out.push({ ilce, hizmetSlug });
    }
  }
  return out;
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const i = getIlce(params.ilce);
  const h = getHizmet(params.hizmetSlug);
  if (!i || !h) return {};
  const kisa = h.baslik.split(' (')[0];
  const title = `${i.ad} ${kisa} | ${firma.kisaAd} İstanbul`;
  return {
    title: title.length > 60 ? title.slice(0, 57) + '…' : title,
    description: metaDescription(
      `${i.ad} ${kisa} hizmeti: ${h.kisaAciklama} ${i.ad}'da ücretsiz keşif, sabit fiyat ve garantili işçilik. Hemen arayın: ${firma.telefon}`
    ),
    alternates: {
      canonical: `${siteUrl}/${i.slug}/${h.slug}/`,
      languages: { 'tr-TR': `${siteUrl}/${i.slug}/${h.slug}/`, 'x-default': `${siteUrl}/${i.slug}/${h.slug}/` },
    },
    openGraph: {
      title,
      description: `${i.ad} ${kisa} hizmeti — garantili işçilik ve ücretsiz keşif.`,
      url: `${siteUrl}/${i.slug}/${h.slug}/`,
    },
  };
}

export default function IlceHizmetPage({ params }) {
  const ilce = getIlce(params.ilce);
  const h = getHizmet(params.hizmetSlug);
  if (!ilce || !h) notFound();

  const kisa = h.baslik.split(' (')[0];
  const kategori = h.kategori;

  const schemaService = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: `${ilce.ad} ${kisa}`,
    name: `${ilce.ad} ${kisa}`,
    description: h.kisaAciklama,
    provider: { '@id': `${siteUrl}/${ilce.slug}/#isletme` },
    areaServed: { '@type': 'City', name: ilce.ad },
    url: `${siteUrl}/${ilce.slug}/${h.slug}/`,
  };

  const schemaBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: `${ilce.ad} Tadilat`, item: `${siteUrl}/${ilce.slug}/` },
      { '@type': 'ListItem', position: 3, name: `${ilce.ad} ${kisa}`, item: `${siteUrl}/${ilce.slug}/${h.slug}/` },
    ],
  };

  const schemaFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: h.sss.slice(0, 5).map((f) => ({
      '@type': 'Question',
      name: f.s,
      acceptedAnswer: { '@type': 'Answer', text: f.c },
    })),
  };

  const digerSlugs = hizmetBazliSlugs(kategori.slug).filter((s) => s !== h.slug);

  return (
    <div data-ilce={ilce.accent}>
      <SchemaMarkup data={schemaService} />
      <SchemaMarkup data={schemaBreadcrumb} />
      <SchemaMarkup data={schemaFaq} />

      <section className="bg-ink-900 pb-10 pt-32 text-white">
        <div className="container-x">
          <nav aria-label="breadcrumb" className="text-xs text-slate-400">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-white">Ana Sayfa</Link></li>
              <li>/</li>
              <li><Link href={`/${ilce.slug}`} className="hover:text-white">{ilce.ad} Tadilat</Link></li>
              <li>/</li>
              <li>{kisa}</li>
            </ol>
          </nav>
          <div className="mt-5 flex items-center gap-2.5">
            <span className="chip !bg-white/10 !text-orange-300">
              <Icon name="mapPin" size={12} /> {ilce.ad}
            </span>
            <span className="chip !bg-white/10 !text-orange-300">{kategori.baslik}</span>
          </div>
          <h1 className="mt-5 max-w-4xl text-4xl text-white sm:text-5xl">
            {ilce.ad} {kisa}
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-300">{h.kisaAciklama}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="/iletisim" className="btn-cta-pulse">
              <Icon name="calendarCheck" size={17} /> Ücretsiz Keşif
            </a>
            <a href={`tel:${firma.telefonTel}`} className="btn-outline !border-white !text-white hover:!bg-white/10">
              <Icon name="phone" size={16} /> {firma.telefon}
            </a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div className="prose-nouvelle mx-auto max-w-4xl">
            <h2 className="text-2xl">{ilce.ad} {kisa} Hizmeti</h2>
            <p className="mt-4 leading-relaxed text-ink-600">{h.detay}</p>

            <h2 className="mt-10 text-2xl">Neden {ilce.ad}'da Bizden Talepte Bulunmalısınız?</h2>
            <p className="mt-4 leading-relaxed text-ink-600">
              {ilce.uzmanlik} Keşif ekibimiz hafta içi her gün {ilce.ad} ve çevresine
              aynı gün gidebilmektedir; keşif ücretsizdir ve keşif sonrası {kisa} için
              sabit fiyat teklifi sunarız. {firma.ad} olarak {ilce.ad}'da çalışırken site
              yönetimleri, belediye süreçleri ve komşuluk kurallarına tam uyum gösteririz.
            </p>

            <h2 className="mt-10 text-2xl">Bu Hizmette Neler Dahildir?</h2>
            <ul className="mt-4 space-y-3">
              {h.faydalar.map((f, idx) => (
                <li key={idx} className="flex items-start gap-3 text-[15px] text-ink-700">
                  <Icon name="check" size={18} className="mt-0.5 shrink-0 text-brand-600" strokeWidth={2.4} />
                  {f}
                </li>
              ))}
            </ul>

            <h2 className="mt-10 text-2xl">{ilce.ad} {kisa} — Sık Sorulan Sorular</h2>
            <div className="mt-5">
              <FAQAccordion items={h.sss.slice(0, 5)} />
            </div>
          </div>

          <aside className="mt-14 border-t border-ink-100 pt-10" aria-label="İlgili hizmetler">
            <h2 className="text-xl">Aynı Kategoride Diğer {kategori.baslik} Hizmetleri ({ilce.ad})</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {digerSlugs.slice(0, 6).map((s) => {
                const dh = getHizmet(s);
                return dh ? <ServiceCard key={s} hizmet={dh} compact ilceSlug={ilce.slug} /> : null;
              })}
            </div>
          </aside>

          <aside className="mt-10 border-t border-ink-100 pt-8" aria-label="Diğer ilçeler">
            <h2 className="text-xl">Bu Hizmetin Verildiği Diğer {ilceler.length} İlçe</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {ilceler.filter((x) => x.slug !== ilce.slug).map((x) => (
                <Link
                  key={x.slug}
                  href={`/${x.slug}/${h.slug}`}
                  className="rounded-full bg-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-600 hover:bg-brand-100 hover:text-brand-700"
                >
                  {x.ad} {kisa}
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <CTABanner
        title={`${ilce.ad} ${kisa} için Teklif Alın`}
        sub={`${ilce.ad} bölgesinde ${kisa} için ücretsiz keşif ve aynı gün sabit fiyat teklifi.`}
      />
    </div>
  );
}