import React from 'react';
import Icon from '../components/Icons';
import { ilceler, siteUrl } from '../lib/site-data';

export const metadata = {
  title: '404 — Sayfa Bulunamadı',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="section flex min-h-[80vh] items-center pt-32">
      <div className="container-x">
        <div className="mx-auto max-w-xl text-center">
          <span className="chip mx-auto">
            <Icon name="alert" size={14} /> 404 — Sayfa Bulunamadı
          </span>
          <h1 className="mt-6 text-5xl sm:text-6xl">Aradığınız Sayfa Burada Değil</h1>
          <p className="mt-4 text-lg text-ink-500">
            Adres değişmiş olabilir ya da sayfa taşınmış olabilir. İhtiyacınız olan hizmete
            aşağıdan kolayca ulaşabilirsiniz.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="/" className="btn-cta">
              <Icon name="house" size={17} /> Ana Sayfa
            </a>
            <a href="/hizmetler" className="btn-outline">
              Tüm Hizmetler
            </a>
            <a href="/iletisim" className="btn-outline">
              İletişim
            </a>
          </div>
          <div className="mt-10 rounded-2xl border border-ink-100 bg-ink-50/60 p-6">
            <h2 className="text-lg">Hizmet verdiğimiz ilçeler</h2>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {ilceler.slice(0, 20).map((i) => (
                <a
                  key={i.slug}
                  href={`/${i.slug}`}
                  className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-ink-600 shadow-sm hover:text-brand-600"
                >
                  {i.ad}
                </a>
              ))}
              <span className="rounded-full bg-ink-100 px-3 py-1.5 text-xs font-semibold text-ink-400">+ 5 ilçe daha</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}