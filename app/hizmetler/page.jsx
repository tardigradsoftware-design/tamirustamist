import SectionHeading from '../../components/SectionHeading';
import CTABanner from '../../components/CTABanner';
import Reveal from '../../components/Reveal';
import SchemaMarkup from '../../components/SchemaMarkup';
import HizmetListeClient from '../../components/HizmetListeClient';
import { kategoriler, tümHizmetlerForList, firma, siteUrl, pageTitle, metaDescription, ogGorsel } from '../../lib/site-data';

export const metadata = {
  title: pageTitle('Tadilat, Yapı ve Tesisat Hizmetleri — 54 Hizmet'),
  description: metaDescription(
    'Banyo, mutfak, su kaçağı, kombi ve elektrik dahil 54 hizmet. İstanbul Avrupa Yakası 25 ilçede ücretsiz keşif ve garantili işçilik.'
  ),
  alternates: {
    canonical: `${siteUrl}/hizmetler/`,
    languages: { 'tr-TR': `${siteUrl}/hizmetler/`, 'x-default': `${siteUrl}/hizmetler/` },
  },
  openGraph: {
    title: 'Tüm Hizmetler — Tadilat, Yapı ve Tesisat',
    description: '54 uzman hizmet · İstanbul Avrupa Yakası 25 ilçe · Ücretsiz keşif ve garanti.',
    url: `${siteUrl}/hizmetler/`,
    images: ogGorsel(),
  },
};

export default function HizmetlerPage() {
  return (
    <>
      <section className="section bg-ink-900 pt-32 !pb-12">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              as="h1"
              light
              eyebrow="54 Uzman Hizmet"
              title="Yapı, Tadilat ve Tesisat — Tek Çatı Altında"
              sub="Banyo, mutfak, iç mekan, sıhhi tesisat, tıkanıklık açma, ısıtma ve elektrik. Her kategoriyi kendi ustalarımızla, garanti belgeli olarak yapıyoruz. Aşağıdan filtreleyebilir, sıralayabilir ve karşılaştırabilirsiniz."
            />
          </Reveal>
        </div>
      </section>

      <section className="section !pt-8">
        <div className="container-x">
          <HizmetListeClient hizmetler={tümHizmetlerForList} whatsapp={firma.whatsapp} />
        </div>
      </section>

      <section className="section bg-ink-50/50">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="7 kategori altında"
              title="Hangi Alanda Çalışıyoruz?"
              sub="Tadilat, tesisat, iç mekan ve acil servis kategorilerinin her birinde kendi usta kadromuz ve sabit fiyat anlayışımızla hizmet veriyoruz."
            />
          </Reveal>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {kategoriler.map((k) => (
              <a
                key={k.slug}
                href={`#${k.slug}`}
                className="card flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-ink-700 hover:text-brand-700"
              >
                <span>{k.baslik}</span>
                <span className="rounded-full bg-ink-100 px-2 py-0.5 text-xs font-bold text-ink-500">{k.hizmetler.length}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

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
