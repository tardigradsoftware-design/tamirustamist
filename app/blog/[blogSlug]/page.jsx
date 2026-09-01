import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Icon from '../../../components/Icons';
import CTABanner from '../../../components/CTABanner';
import SchemaMarkup from '../../../components/SchemaMarkup';
import { bloglar, blogMap, firma, siteUrl, pageTitle, ogGorsel } from '../../../lib/site-data';

export function generateStaticParams() {
  return bloglar.map((b) => ({ blogSlug: b.slug }));
}

export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const b = blogMap.get(params.blogSlug);
  if (!b) return {};
  return {
    /* seoBaslik: sayfadaki H1 uzun kalırken SERP başlığını kısaltmak için
     * data/blog.json'a eklenebilen opsiyonel alan. Yoksa baslik kullanılır. */
    title: pageTitle(b.seoBaslik || b.baslik),
    description: b.ozet.slice(0, 158) + (b.ozet.length > 158 ? '…' : ''),
    alternates: {
      canonical: `${siteUrl}/blog/${b.slug}/`,
      languages: { 'tr-TR': `${siteUrl}/blog/${b.slug}/`, 'x-default': `${siteUrl}/blog/${b.slug}/` },
    },
    openGraph: {
      type: 'article',
      title: b.baslik,
      description: b.ozet,
      publishedTime: b.tarih,
      url: `${siteUrl}/blog/${b.slug}/`,
      images: ogGorsel(`/images/blog-${b.slug}.webp`, b.baslik),
    },
  };
}

export default function BlogDetayPage({ params }) {
  const b = blogMap.get(params.blogSlug);
  if (!b) notFound();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: b.baslik,
    description: b.ozet,
    datePublished: b.tarih,
    author: { '@type': 'Organization', name: firma.ad, url: siteUrl },
    publisher: { '@type': 'Organization', name: firma.ad, url: siteUrl },
    mainEntityOfPage: `${siteUrl}/blog/${b.slug}/`,
    image: `${siteUrl}/images/blog-${b.slug}.webp`,
  };

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: `${siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog/` },
      { '@type': 'ListItem', position: 3, name: b.baslik, item: `${siteUrl}/blog/${b.slug}/` },
    ],
  };

  const diger = bloglar.filter((x) => x.slug !== b.slug).slice(0, 3);

  return (
    <>
      <SchemaMarkup data={schema} />
      <SchemaMarkup data={breadcrumb} />

      <article className="section !pt-32">
        <div className="container-x">
          <nav aria-label="breadcrumb" className="text-xs text-ink-400">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-brand-600">Ana Sayfa</Link></li>
              <li>/</li>
              <li><Link href="/blog" className="hover:text-brand-600">Blog</Link></li>
              <li>/</li>
              <li className="font-semibold text-ink-800">{b.baslik}</li>
            </ol>
          </nav>
          <div className="mx-auto mt-6 max-w-3xl">
            <span className="chip">{b.kategori}</span>
            <h1 className="mt-4 text-3xl sm:text-5xl">{b.baslik}</h1>
            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-ink-500">
              <span className="flex items-center gap-1.5">
                <Icon name="user" size={15} /> {firma.ad} Ekibi
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="calendarCheck" size={15} /> {b.tarih}
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="clock" size={15} /> {b.okumaSuresi} dk okuma
              </span>
            </div>
            <div className="mt-7 aspect-[16/9] overflow-hidden rounded-3xl bg-ink-100 shadow-card">
              <img
                src={`/images/blog-${b.slug}.webp`}
                alt={b.baslik}
                width={960}
                height={540}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-7 rounded-2xl border-l-4 border-brand-500 bg-brand-50 p-5 text-lg font-medium leading-relaxed text-ink-700">
              {b.ozet}
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-3xl">
            {b.icerik.map((blok, i) => (
              <div key={i} className="mt-10">
                <h2 className="text-2xl">{blok.baslik}</h2>
                <p className="mt-3 leading-relaxed text-ink-600">{blok.metin}</p>
              </div>
            ))}

            <div className="mt-12 rounded-2xl bg-ink-50 p-6 text-sm leading-relaxed text-ink-600">
              <strong className="text-ink-900">Bu konuda yardım almak mı istiyorsunuz?</strong>{' '}
              Ücretsiz keşif için <a href={`tel:${firma.telefonTel}`} className="font-bold text-brand-600">{firma.telefon}</a>{' '}
              numarasını arayabilir ya da{' '}
              <Link href="/iletisim" className="font-bold text-brand-600">iletişim formunu</Link> doldurarak
              en geç 30 dakika içinde geri dönüş alabilirsiniz.
            </div>

            <nav className="mt-12 border-t border-ink-100 pt-8" aria-label="Diğer blog yazıları">
              <h2 className="text-xl">İlginizi Çekebilecek Diğer Yazılar</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {diger.map((d) => (
                  <Link
                    key={d.slug}
                    href={`/blog/${d.slug}`}
                    className="card group p-4"
                  >
                    <span className="text-[11px] font-bold uppercase tracking-wide text-brand-600">{d.kategori}</span>
                    <h3 className="mt-2 text-sm font-bold leading-snug text-ink-800 group-hover:text-brand-700">
                      {d.baslik}
                    </h3>
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </article>

      <CTABanner />
    </>
  );
}