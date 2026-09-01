import React from 'react';
import Link from 'next/link';
import Icon from '../../components/Icons';
import SectionHeading from '../../components/SectionHeading';
import Reveal from '../../components/Reveal';
import CTABanner from '../../components/CTABanner';
import SchemaMarkup from '../../components/SchemaMarkup';
import { bloglar, siteUrl, pageTitle, metaDescription } from '../../lib/site-data';

export const metadata = {
  title: pageTitle('Blog — Tadilat, Tesisat ve Yapı Rehberleri'),
  description: metaDescription(
    'Banyo tadilatı fiyatları, su kaçağı tespiti, daire tadilatı ve kombi bakımı rehberleri. Tadilat kararlarınızı kolaylaştıran uzman yazılar.'
  ),
  alternates: {
    canonical: `${siteUrl}/blog/`,
    languages: { 'tr-TR': `${siteUrl}/blog/`, 'x-default': `${siteUrl}/blog/` },
  },
};

const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Tamir Ustam Blog',
  url: `${siteUrl}/blog/`,
  blogPost: bloglar.map((b) => ({
    '@type': 'BlogPosting',
    headline: b.baslik,
    url: `${siteUrl}/blog/${b.slug}/`,
    datePublished: b.tarih,
    author: { '@type': 'Organization', name: 'Tamir Ustam İstanbul' },
  })),
};

export default function BlogPage() {
  return (
    <>
      <section className="section bg-ink-900 !pb-14 pt-32">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              as="h1"
              light
              eyebrow="İçerik Merkezi"
              title="Tadilat ve Tesisat Rehberleri"
              sub="Karar vermeden önce bilmeniz gerekenler: fiyat, süreç, malzeme ve uzman seçimi."
            />
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {bloglar.map((b, i) => (
              <Reveal key={b.slug} delay={(i % 3) * 80}>
                <Link href={`/blog/${b.slug}`} className="card group flex h-full flex-col overflow-hidden">
                  <div className="relative aspect-[16/9] overflow-hidden bg-ink-200">
                    <img
                      src={`/images/blog-${b.slug}.webp`}
                      alt={b.baslik}
                      loading="lazy"
                      width={640}
                      height={360}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-brand-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
                      {b.kategori}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-2 text-xs font-semibold text-ink-400">
                      <Icon name="clock" size={13} /> {b.okumaSuresi} dk okuma
                      <span>·</span>
                      {b.tarih}
                    </div>
                    <h3 className="mt-3 flex-1 text-lg leading-snug group-hover:text-brand-700">
                      {b.baslik}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-500">{b.ozet}</p>
                    <span className="mt-4 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-600">
                      Devamını Oku <Icon name="arrowRight" size={13} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Bir Sorunuz mu Var?"
        sub="Blog yazılarında yanıt bulamadıysanız, uzman ekibimiz ücretsiz danışmanlık için hazır."
      />
      <SchemaMarkup data={blogSchema} />
    </>
  );
}