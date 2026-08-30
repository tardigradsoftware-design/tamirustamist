import React from 'react';
import Icon from '../../components/Icons';
import ContactForm from '../../components/ContactForm';
import SectionHeading from '../../components/SectionHeading';
import Reveal from '../../components/Reveal';
import SchemaMarkup from '../../components/SchemaMarkup';
import { firma, siteUrl } from '../../lib/site-data';

export const metadata = {
  title: 'İletişim — Ücretsiz Keşif İçin Hemen Arayın',
  description:
    `Tamir Ustam İstanbul ile iletişim: ${firma.telefon}, WhatsApp ve e-posta. İstanbul Avrupa Yakası 25 ilçede ücretsiz keşif. Formu doldurun, 30 dakika içinde dönüş yapalım.`,
  alternates: {
    canonical: `${siteUrl}/iletisim/`,
    languages: { 'tr-TR': `${siteUrl}/iletisim/`, 'x-default': `${siteUrl}/iletisim/` },
  },
};

export default function IletisimPage() {
  const tel = `tel:${firma.telefonTel}`;
  const wa = `https://wa.me/${firma.whatsapp}?text=${encodeURIComponent('Merhaba, bilgi almak istiyorum.')}`;
  const coords = firma.calismaKoordinatlari;

  return (
    <>
      <section className="section bg-ink-900 !pb-16 pt-32">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              light
              eyebrow="İletişim"
              title="Ücretsiz Keşif İçin Bize Ulaşın"
              sub="Formu doldurun, WhatsApp'tan yazın ya da doğrudan arayın. En geç 30 dakika içinde size dönüyoruz."
            />
          </Reveal>
        </div>
      </section>

      <section className="section !pt-12">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-5">
            <Reveal className="lg:col-span-3">
              <ContactForm />
            </Reveal>
            <Reveal delay={120} className="lg:col-span-2">
              <div className="space-y-5">
                <div className="card p-6">
                  <h2 className="text-lg">Doğrudan İletişim</h2>
                  <ul className="mt-4 space-y-4 text-sm">
                    <li className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                        <Icon name="phone" size={18} />
                      </span>
                      <div>
                        <div className="font-bold text-ink-900">Telefon</div>
                        <a href={tel} className="text-ink-600 hover:text-brand-600">{firma.telefon}</a>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-600">
                        <Icon name="whatsapp" size={18} />
                      </span>
                      <div>
                        <div className="font-bold text-ink-900">WhatsApp</div>
                        <a href={wa} target="_blank" rel="noopener noreferrer" className="text-ink-600 hover:text-green-600">
                          {firma.telefon}
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                        <Icon name="mail" size={18} />
                      </span>
                      <div>
                        <div className="font-bold text-ink-900">E-posta</div>
                        <a href={`mailto:${firma.email}`} className="text-ink-600 hover:text-brand-600">{firma.email}</a>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                        <Icon name="mapPin" size={18} />
                      </span>
                      <div>
                        <div className="font-bold text-ink-900">Adres</div>
                        <span className="text-ink-600">{firma.adres}</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                        <Icon name="clock" size={18} />
                      </span>
                      <div>
                        <div className="font-bold text-ink-900">Çalışma Saatleri</div>
                        <span className="text-ink-600">Haftanın 7 günü 7/24 · Acil servis</span>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="card overflow-hidden p-0">
                  <iframe
                    title={`${firma.ad} konumu — ${firma.adres}`}
                    src={`https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=12&output=embed&hl=tr`}
                    width="100%"
                    height="280"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>

                <div className="rounded-2xl border border-brand-200 bg-brand-50 p-6">
                  <h2 className="text-lg text-ink-900">Acil Durum mu?</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">
                    Su baskını, su kaçağı, tıkanıklık veya elektrik arızası gibi acil
                    durumlarda gece-gündüz bizi arayın:
                  </p>
                  <a href={tel} className="btn-cta mt-4 w-full justify-center">
                    <Icon name="phone" size={17} /> {firma.telefon}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <SchemaMarkup
        data={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          name: `${firma.ad} İletişim`,
          url: `${siteUrl}/iletisim/`,
          mainEntity: { '@id': `${siteUrl}/#isletme` },
        }}
      />
    </>
  );
}