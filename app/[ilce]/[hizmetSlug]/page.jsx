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
  aggregateRatingSchema,
  getHizmetReferanslari,
  getKategoriGorselleri,
  pageTitle,
  ogGorsel,
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

export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const i = getIlce(params.ilce);
  const h = getHizmet(params.hizmetSlug);
  if (!i || !h) return {};
  const kisa = h.baslik.split(' (')[0];
  const title = pageTitle(`${i.ad} ${kisa}`);
  return {
    title,
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
      images: ogGorsel(`/images/hizmet-${h.kategori.slug}-1.webp`, `${i.ad} ${kisa}`),
    },
  };
}

export default function IlceHizmetPage({ params }) {
  const ilce = getIlce(params.ilce);
  const h = getHizmet(params.hizmetSlug);
  if (!ilce || !h) notFound();

  const kisa = h.baslik.split(' (')[0];
  const kategori = h.kategori;
  const gorseller = getKategoriGorselleri(h.slug);
  const yorumlar = getHizmetReferanslari(h.slug, ilce.slug);

  const schemaService = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${siteUrl}/${ilce.slug}/${h.slug}/#hizmet`,
    serviceType: `${ilce.ad} ${kisa}`,
    name: `${ilce.ad} ${kisa}`,
    description: h.kisaAciklama,
    provider: { '@id': `${siteUrl}/${ilce.slug}/#isletme` },
    areaServed: { '@type': 'City', name: ilce.ad },
    url: `${siteUrl}/${ilce.slug}/${h.slug}/`,
    /* B2 — puan yalnızca config'te doğrulanmış gerçek veri varsa yayınlanır */
    ...aggregateRatingSchema,
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
    '@id': `${siteUrl}/${ilce.slug}/${h.slug}/#sss`,
    inLanguage: 'tr-TR',
    about: { '@id': `${siteUrl}/${ilce.slug}/${h.slug}/#hizmet` },
    mainEntity: h.sss.slice(0, 5).map((f) => ({
      '@type': 'Question',
      name: f.s,
      inLanguage: 'tr-TR',
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.c,
        inLanguage: 'tr-TR',
      },
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

            {/* C1 — hizmet görsel galerisi */}
            {gorseller.length > 0 && (
              <div className="mt-10">
                <h2 className="text-2xl">{ilce.ad} {kisa} Uygulama Görselleri</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {gorseller.map((g, i) => (
                    <img
                      key={g}
                      src={g}
                      alt={
                        i === 0
                          ? `${ilce.ad} ${kisa} uygulama görseli — ${firma.kisaAd}`
                          : `${ilce.ad} ${kisa} uygulama örneği — ${firma.kisaAd}`
                      }
                      loading="lazy"
                      width={640}
                      height={480}
                      className={`aspect-[4/3] w-full rounded-2xl object-cover shadow-card ${
                        i % 2 === 1 ? 'sm:translate-y-6' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* B4 — ilçe bazlı müşteri yorumları */}
            {yorumlar.length > 0 && (
              <div className="mt-10 rounded-2xl border border-ink-100 bg-brand-50/50 p-7">
                <h2 className="text-xl">
                  <Icon name="quoteFill" size={18} className="mr-2 inline-block text-brand-600" />
                  {ilce.ad}'da Bu Hizmeti Alan Müşterilerimiz Ne Diyor?
                </h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {yorumlar.map((r) => (
                    <figure key={r.ad + r.ilce} className="card flex h-full flex-col justify-between bg-white p-5">
                      <blockquote className="text-sm leading-relaxed text-ink-700">“{r.yorum}”</blockquote>
                      <figcaption className="mt-4 flex items-center justify-between gap-2 border-t border-ink-100 pt-3 text-xs text-ink-500">
                        <span className="font-bold text-ink-800">
                          {r.ad} <span className="font-normal">· {r.ilce}</span>
                        </span>
                        <span className="flex gap-0.5 text-amber-400" aria-label={`${r.puan} yıldız`}>
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Icon key={s} name="star" size={12} className={s <= r.puan ? '' : 'opacity-25'} />
                          ))}
                        </span>
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            )}

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