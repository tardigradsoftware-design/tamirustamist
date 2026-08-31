import Link from 'next/link';
import Icon from '../../components/Icons';
import SectionHeading from '../../components/SectionHeading';
import ServiceCard from '../../components/ServiceCard';
import CTABanner from '../../components/CTABanner';
import Reveal from '../../components/Reveal';
import SchemaMarkup from '../../components/SchemaMarkup';
import { kategoriler, siteUrl } from '../../lib/site-data';

export const metadata = {
  title: 'Tadilat, Yapı ve Tesisat Hizmetleri — 54 Uzman Hizmet',
  description:
    'Banyo ve mutfak tadilatından su kaçağı tespitine, kombi bakımından elektrik tesisatına 54 hizmet. İstanbul Avrupa Yakası 25 ilçede ücretsiz keşif, garantili işçilik.',
  alternates: {
    canonical: `${siteUrl}/hizmetler/`,
    languages: { 'tr-TR': `${siteUrl}/hizmetler/`, 'x-default': `${siteUrl}/hizmetler/` },
  },
  openGraph: {
    title: 'Tüm Hizmetler — Tadilat, Yapı ve Tesisat',
    description: '54 uzman hizmet · İstanbul Avrupa Yakası 25 ilçe · Ücretsiz keşif ve garanti.',
    url: `${siteUrl}/hizmetler/`,
  },
};

export default function HizmetlerPage() {
  return (
    <>
      <section className="section bg-ink-900 pt-32 !pb-14">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              light
              eyebrow="54 Uzman Hizmet"
              title="Yapı, Tadilat ve Tesisat — Tek Çatı Altında"
              sub="Banyo, mutfak, iç mekan, sıhhi tesisat, tıkanıklık açma, ısıtma ve elektrik. Her kategoriyi kendi ustalarımızla, garanti belgeli olarak yapıyoruz."
            />
          </Reveal>
        </div>
      </section>

      {kategoriler.map((kat, idx) => (
        <section
          key={kat.slug}
          id={kat.slug}
          className={`section ${idx % 2 ? '' : 'bg-ink-50/50'}`}
          aria-labelledby={`${kat.slug}-baslik`}
        >
          <div className="container-x">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="max-w-2xl">
                  <span className="eyebrow">
                    <Icon name={kat.ikon} size={15} /> {kat.hizmetler.length} hizmet
                  </span>
                  <h2 id={`${kat.slug}-baslik`} className="mt-3 text-3xl">
                    {kat.baslik}
                  </h2>
                  <p className="mt-3 text-ink-500">{kat.aciklama}</p>
                </div>
                <Link
                  href={`/hizmetler/${kat.hizmetler[0].slug}`}
                  className="btn-outline !px-4 !py-2.5 !text-xs"
                >
                  Kategoriye Git <Icon name="arrowRight" size={14} />
                </Link>
              </div>
            </Reveal>
            <div className="mt-8 grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {kat.hizmetler.map((h, i) => (
                <Reveal key={h.slug} delay={(i % 3) * 60}>
                  <ServiceCard hizmet={h} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <CTABanner />
      <SchemaMarkup
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: kategoriler.flatMap((k, ki) =>
            k.hizmetler.map((h, hi) => ({
              '@type': 'ListItem',
              position: ki * 14 + hi + 1,
              name: h.baslik,
              url: `${siteUrl}/hizmetler/${h.slug}/`,
            }))
          ),
        }}
      />
    </>
  );
}