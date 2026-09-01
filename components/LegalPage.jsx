import React from 'react';
import Breadcrumbs from './Breadcrumbs';

/**
 * Hukuki metin sayfaları için ortak düzen (Gizlilik Politikası, KVKK Aydınlatma Metni).
 * bolumler: [{ baslik, paragraflar?: string[], liste?: string[] }]
 */
export default function LegalPage({ baslik, ozet, guncelleme, bolumler = [], breadcrumb = [] }) {
  return (
    <>
      <Breadcrumbs items={breadcrumb} />

      <section className="section !pt-8">
        <div className="container-x">
          <header className="mx-auto max-w-3xl border-b border-ink-200 pb-8">
            <span className="eyebrow">Yasal Bilgilendirme</span>
            <h1 className="mt-3 text-3xl sm:text-4xl">{baslik}</h1>
            {ozet ? <p className="mt-5 leading-relaxed text-ink-600">{ozet}</p> : null}
            {guncelleme ? (
              <p className="mt-5 text-sm text-ink-500">Son güncelleme: {guncelleme}</p>
            ) : null}
          </header>

          <article className="prose-nouvelle mx-auto mt-12 max-w-3xl">
            {bolumler.map((b) => (
              <section key={b.baslik} className="mt-12 first:mt-0">
                <h2 className="text-2xl sm:text-3xl">{b.baslik}</h2>
                {(b.paragraflar || []).map((p, i) => (
                  <p key={i} className="mt-4 leading-relaxed text-ink-600">
                    {p}
                  </p>
                ))}
                {b.liste?.length ? (
                  <ul className="mt-4 space-y-2">
                    {b.liste.map((l, i) => (
                      <li key={i} className="flex gap-3 leading-relaxed text-ink-600">
                        <span
                          aria-hidden="true"
                          className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500"
                        />
                        <span>{l}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
