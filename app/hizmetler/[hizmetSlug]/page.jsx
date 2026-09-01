import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Icon from '../../../components/Icons';
import ServiceCard from '../../../components/ServiceCard';
import FAQAccordion from '../../../components/FAQAccordion';
import CTABanner from '../../../components/CTABanner';
import Reveal from '../../../components/Reveal';
import SchemaMarkup from '../../../components/SchemaMarkup';
import {
  tümHizmetSlugs,
  getHizmet,
  kategoridenHizmetler,
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
  return tümHizmetSlugs.map((hizmetSlug) => ({ hizmetSlug }));
}

export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const h = getHizmet(params.hizmetSlug);
  if (!h) return {};
  /* "İstanbul" yerel SEO için değerli: konum olarak geçilir.
   * pageTitle() sığmazsa önce markayı, sonra konumu düşürür — kırpmaz. */
  const title = pageTitle(h.baslik, { konum: 'İstanbul' });
  return {
    title,
    description: metaDescription(
      `${h.kisaAciklama} ${firma.ad} ile İstanbul Avrupa Yakası 25 ilçede ücretsiz keşif, sabit fiyat ve garantili işçilik. Hemen arayın: ${firma.telefon}`
    ),
    alternates: {
      canonical: `${siteUrl}/hizmetler/${h.slug}/`,
      languages: { 'tr-TR': `${siteUrl}/hizmetler/${h.slug}/`, 'x-default': `${siteUrl}/hizmetler/${h.slug}/` },
    },
    openGraph: {
      title,
      description: h.kisaAciklama,
      url: `${siteUrl}/hizmetler/${h.slug}/`,
      images: ogGorsel(`/images/hizmet-${h.kategori.slug}-1.webp`, h.baslik),
    },
  };
}

export default function HizmetDetayPage({ params }) {
  const h = getHizmet(params.hizmetSlug);
  if (!h) notFound();

  const kategori = h.kategori;
  const gorseller = getKategoriGorselleri(h.slug);
  const yorumlar = getHizmetReferanslari(h.slug);
  const digerHizmetler = kategoridenHizmetler(kategori.slug).filter((x) => x.slug !== h.slug);
  const breadcrumb = [
    { label: 'Hizmetler', href: '/hizmetler' },
    { label: kategori.baslik, href: `/hizmetler/${digerHizmetler[0]?.slug || h.slug}` },
    { label: h.baslik },
  ];

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${siteUrl}/hizmetler/${h.slug}/#hizmet`,
    serviceType: h.baslik,
    name: h.baslik,
    description: h.kisaAciklama,
    provider: { '@id': `${siteUrl}/#isletme` },
    areaServed: [{ '@type': 'City', name: 'İstanbul' }, { '@type': 'AdministrativeArea', name: 'İstanbul Avrupa Yakası' }],
    url: `${siteUrl}/hizmetler/${h.slug}/`,
    offers: { '@type': 'Offer', priceCurrency: 'TRY', availability: 'https://schema.org/InStock' },
    /* B2 — puan yalnızca config'te doğrulanmış gerçek veri varsa yayınlanır */
    ...aggregateRatingSchema,
  };

  /* B1 — FAQPage schema zenginleştirmesi: @id, inLanguage, about bağlantısı */
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${siteUrl}/hizmetler/${h.slug}/#sss`,
    inLanguage: 'tr-TR',
    about: { '@id': `${siteUrl}/hizmetler/${h.slug}/#hizmet` },
    mainEntity: h.sss.map((f) => ({
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

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Hizmetler', item: `${siteUrl}/hizmetler/` },
      { '@type': 'ListItem', position: 3, name: h.baslik, item: `${siteUrl}/hizmetler/${h.slug}/` },
    ],
  };

  return (
    <>
      <SchemaMarkup data={serviceSchema} />
      <SchemaMarkup data={faqSchema} />
      <SchemaMarkup data={breadcrumbSchema} />

      <section className="bg-ink-900 pb-14 pt-32 text-white">
        <div className="container-x">
          <nav aria-label="breadcrumb" className="text-xs text-slate-400">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-white">Ana Sayfa</Link></li>
              <li>/</li>
              <li><Link href="/hizmetler" className="hover:text-white">Hizmetler</Link></li>
              <li>/</li>
              <li>{h.baslik}</li>
            </ol>
          </nav>
          <div className="mt-6 flex items-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-white">
              <Icon name={kategori.ikon} size={26} />
            </span>
            <span className="chip !bg-white/10 !text-orange-300">{kategori.baslik}</span>
          </div>
          <h1 className="mt-5 max-w-4xl text-4xl text-white sm:text-5xl">{h.baslik}</h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-300">{h.kisaAciklama}</p>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-3">
            {/* İçerik */}
            <div className="lg:col-span-2">
              <Reveal>
                <article className="prose-nouvelle">
                  <h2 className="text-2xl">
                    {h.baslik.split(' (')[0]} Hizmeti Nasıl Uygulanır?
                  </h2>
                  <p className="mt-4 leading-relaxed text-ink-600">{h.detay}</p>
                </article>
              </Reveal>

              {/* C1 — hizmet galerisi (kategori bazlı yüksek kaliteli görseller) */}
              {gorseller.length > 0 && (
                <Reveal delay={60}>
                  <div className="mt-10">
                    <h2 className="text-2xl">{h.baslik.split(' (')[0]} Uygulama Görselleri</h2>
                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      {gorseller.map((g, i) => (
                        <img
                          key={g}
                          src={g}
                          alt={
                            i === 0
                              ? `${h.baslik.split(' (')[0]} uygulama görseli — ${firma.kisaAd}`
                              : `${h.baslik.split(' (')[0]} uygulama örneği — ${firma.kisaAd}`
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
                </Reveal>
              )}

              {/* B4 — hizmete özel müşteri yorumları */}
              {yorumlar.length > 0 && (
                <Reveal delay={80}>
                  <div className="mt-10 rounded-2xl border border-ink-100 bg-brand-50/50 p-7">
                    <h2 className="text-xl">
                      <Icon name="quoteFill" size={18} className="mr-2 inline-block text-brand-600" />
                      Bu Hizmetle İlgili Müşteri Yorumları
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
                </Reveal>
              )}

              <Reveal delay={80}>
                <div className="mt-10 rounded-2xl border border-ink-100 bg-ink-50/60 p-7">
                  <h2 className="text-xl">
                    <Icon name="checkCircle" size={20} className="mr-2 inline-block text-brand-600" />
                    Neden Bizimle?
                  </h2>
                  <ul className="mt-5 space-y-3">
                    {h.faydalar.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-[15px] text-ink-700">
                        <Icon name="check" size={18} className="mt-0.5 shrink-0 text-brand-600" strokeWidth={2.4} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={120}>
                <div className="mt-10">
                  <h2 className="text-2xl">{h.baslik.split(' (')[0]} Fiyat ve Keşif</h2>
                  <p className="mt-3 leading-relaxed text-ink-600">
                    Fiyatlar metrekare, malzeme sınıfı ve iş kapsamına göre değişir. Yerinde keşif
                    sonrası aynı gün içinde sabit fiyat teklifi sunarız; teklifte işçilik, malzeme,
                    süre ve garanti maddeleri açıkça yazılır. Keşif ücretsizdir ve onarım
                    taahhüdü altında değildir — istediğiniz kadar karşılaştırma yapın.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <a href="/iletisim" className="btn-cta">
                      <Icon name="calendarCheck" size={17} /> Ücretsiz Keşif İste
                    </a>
                    <a href={`tel:${firma.telefonTel}`} className="btn-outline">
                      <Icon name="phone" size={17} /> {firma.telefon}
                    </a>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={140}>
                <div className="mt-10">
                  <h2 className="text-2xl">Sık Sorulan Sorular</h2>
                  <div className="mt-5">
                    <FAQAccordion items={h.sss} />
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Kenar çubuğu */}
            <aside className="space-y-6" aria-label="Hizmet yan bilgileri">
              <Reveal delay={60}>
                <div className="card p-6">
                  <h2 className="text-lg">Hızlı İletişim</h2>
                  <p className="mt-2 text-sm text-ink-500">{h.kisaAciklama}</p>
                  <div className="mt-4 space-y-2.5">
                    <a href={`tel:${firma.telefonTel}`} className="btn-cta w-full justify-center">
                      <Icon name="phone" size={16} /> Hemen Ara
                    </a>
                    <a
                      href={`https://wa.me/${firma.whatsapp}?text=${encodeURIComponent(`Merhaba, ${h.baslik} hakkında bilgi almak istiyorum.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-wa w-full justify-center"
                    >
                      <Icon name="whatsapp" size={17} /> WhatsApp'tan Yaz
                    </a>
                  </div>
                  <ul className="mt-5 space-y-2 border-t border-ink-100 pt-4 text-sm text-ink-600">
                    <li className="flex items-center gap-2"><Icon name="checkCircle" size={15} className="text-brand-600" /> 7/24 acil servis</li>
                    <li className="flex items-center gap-2"><Icon name="checkCircle" size={15} className="text-brand-600" /> Ücretsiz keşif ve sabit fiyat</li>
                    <li className="flex items-center gap-2"><Icon name="checkCircle" size={15} className="text-brand-600" /> Yazılı işçilik garantisi</li>
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <div className="card p-6">
                  <h2 className="text-lg">Bu Hizmeti Aldığınız İlçeler</h2>
                  <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
                    {ilceler.map((i) => (
                      <li key={i.slug}>
                        <Link href={`/${i.slug}/${h.slug}`} className="flex items-center gap-1 text-ink-600 hover:text-brand-600">
                          <Icon name="mapPin" size={12} className="text-brand-500" /> {i.ad}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      {digerHizmetler.length > 0 && (
        <section className="section bg-ink-50/50">
          <div className="container-x">
            <h2 className="text-2xl">Aynı Kategorideki Diğer {kategori.baslik} Hizmetleri</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {digerHizmetler.slice(0, 6).map((dh) => (
                <ServiceCard key={dh.slug} hizmet={dh} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner
        title={`${h.baslik.split(' (')[0]} için Ücretsiz Keşif Alın`}
        sub="Aynı gün keşif, sabit fiyat teklifi ve yazılı garanti. Bugün arayın, yarın işe başlayalım."
      />
    </>
  );
}