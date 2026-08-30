'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Icon from './Icons';
import Logo from './Logo';
import { firma, kategoriler, ilceler } from '../lib/site-data';

const nav = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/hakkimizda', label: 'Hakkımızda' },
  { href: '/hizmetler', label: 'Hizmetler' },
  { href: '/blog', label: 'Blog' },
  { href: '/iletisim', label: 'İletişim' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [bolgeOpen, setBolgeOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const waLink = `https://wa.me/${firma.whatsapp}?text=${encodeURIComponent(
    `Merhaba, ${firma.ad} ile iletişime geçmek istiyorum.`
  )}`;
  const telLink = `tel:${firma.telefonTel}`;

  return (
    <header
      className={
        'fixed inset-x-0 top-0 z-50 transition-all duration-300 ' +
        (scrolled
          ? 'bg-white/85 shadow-lg shadow-ink-900/5 backdrop-blur-xl'
          : 'bg-gradient-to-b from-ink-900/70 to-transparent')
      }
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-[72px] sm:px-6 lg:px-8">
        {/* Logo */}
        <div className={scrolled ? '' : '[&_span]:!text-white'}>
          <Logo idSuffix="h" />
        </div>

        {/* Masaüstü nav */}
        <nav className="hidden items-center gap-1 xl:flex" aria-label="Ana menü">
          {nav.map((n) =>
            n.label === 'Hizmetler' ? (
              <div key={n.href} className="relative" onMouseLeave={() => setMegaOpen(false)}>
                <button
                  type="button"
                  onMouseEnter={() => setMegaOpen(true)}
                  onClick={() => setMegaOpen((v) => !v)}
                  aria-expanded={megaOpen}
                  className={
                    'flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold transition-colors ' +
                    (scrolled ? 'text-ink-800 hover:text-brand-600' : 'text-white hover:text-white/80')
                  }
                >
                  Hizmetler
                  <Icon name="chevronDown" size={14} />
                </button>
                {megaOpen && (
                  <div className="absolute left-1/2 top-full w-[860px] -translate-x-1/2 pt-3">
                    <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-2xl shadow-ink-900/15">
                      <div className="mb-3 flex items-center justify-between">
                        <p className="text-xs font-bold uppercase tracking-widest text-ink-400">
                          54 Uzman Hizmet
                        </p>
                        <Link
                          href="/hizmetler"
                          className="text-sm font-bold text-brand-600 hover:text-brand-700"
                          onClick={() => setMegaOpen(false)}
                        >
                          Tüm Hizmetler →
                        </Link>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        {kategoriler.map((kat) => (
                          <div key={kat.slug} className="rounded-xl bg-ink-50/80 p-3">
                            <Link
                              href={`/hizmetler/${kat.hizmetler[0].slug}`}
                              className="mb-2 flex items-center gap-2 font-display text-base font-bold uppercase text-brand-700 hover:text-brand-600"
                              onClick={() => setMegaOpen(false)}
                            >
                              <span className="text-brand-500">
                                <Icon name={kat.ikon} size={18} />
                              </span>
                              {kat.baslik}
                            </Link>
                            <ul className="space-y-1">
                              {kat.hizmetler.slice(0, 7).map((h) => (
                                <li key={h.slug}>
                                  <Link
                                    href={`/hizmetler/${h.slug}`}
                                    onClick={() => setMegaOpen(false)}
                                    className="block truncate rounded px-1.5 py-0.5 text-[13px] text-ink-600 hover:bg-white hover:text-brand-700"
                                  >
                                    {h.baslik}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : n.label === 'Blog' ? (
              <Link
                key={n.href}
                href={n.href}
                className={
                  'rounded-md px-3 py-2 text-sm font-semibold transition-colors ' +
                  (scrolled ? 'text-ink-800 hover:text-brand-600' : 'text-white hover:text-white/80')
                }
              >
                {n.label}
              </Link>
            ) : (
              <Link
                key={n.href}
                href={n.href}
                className={
                  'rounded-md px-3 py-2 text-sm font-semibold transition-colors ' +
                  (scrolled ? 'text-ink-800 hover:text-brand-600' : 'text-white hover:text-white/80')
                }
              >
                {n.label}
              </Link>
            )
          )}

          {/* Bölgeler */}
          <div className="relative" onMouseLeave={() => setBolgeOpen(false)}>
            <button
              type="button"
              onMouseEnter={() => setBolgeOpen(true)}
              onClick={() => setBolgeOpen((v) => !v)}
              aria-expanded={bolgeOpen}
              className={
                'flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold transition-colors ' +
                (scrolled ? 'text-ink-800 hover:text-brand-600' : 'text-white hover:text-white/80')
              }
            >
              Bölgeler
              <Icon name="chevronDown" size={14} />
            </button>
            {bolgeOpen && (
              <div className="absolute left-1/2 top-full w-[560px] -translate-x-1/2 pt-3">
                <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-2xl shadow-ink-900/15">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-widest text-ink-400">
                      İstanbul Avrupa Yakası — 25 İlçe
                    </p>
                    <Link
                      href="/hizmetler"
                      className="text-sm font-bold text-brand-600 hover:text-brand-700"
                      onClick={() => setBolgeOpen(false)}
                    >
                      Tümünü Gör →
                    </Link>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-3">
                    {ilceler.map((i) => (
                      <Link
                        key={i.slug}
                        href={`/${i.slug}`}
                        onClick={() => setBolgeOpen(false)}
                        className="rounded-md px-2 py-1.5 text-sm text-ink-600 hover:bg-brand-50 hover:text-brand-700"
                      >
                        {i.ad}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Sağ CTA */}
        <div className="hidden items-center gap-2.5 md:flex">
          <a
            href={telLink}
            className="btn-cta-pulse group flex items-center gap-2"
            aria-label={`Hemen ara: ${firma.telefon}`}
          >
            <Icon name="phone" size={17} />
            <span className="hidden lg:inline">Hemen Ara</span>
            <span className="lg:hidden" aria-hidden="true" />
          </a>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-wa flex items-center gap-2"
          >
            <Icon name="whatsapp" size={18} />
            <span className="hidden lg:inline">WhatsApp</span>
          </a>
        </div>

        {/* Mobil menü butonu */}
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/10 text-white backdrop-blur-sm xl:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Menüyü aç"
        >
          <Icon name="menu" size={24} />
        </button>
      </div>

      {/* Mobil panel */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-white xl:hidden">
          <div className="flex h-16 items-center justify-between px-4 shadow-sm">
            <Logo idSuffix="m" />
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-lg bg-ink-50 text-ink-700"
              onClick={() => setMobileOpen(false)}
              aria-label="Menüyü kapat"
            >
              <Icon name="close" size={22} />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-4 py-4" aria-label="Mobil menü">
            <div className="space-y-1">
              <Link href="/" className="block rounded-lg px-3 py-2.5 font-semibold text-ink-800" onClick={() => setMobileOpen(false)}>
                Ana Sayfa
              </Link>
              <Link href="/hakkimizda" className="block rounded-lg px-3 py-2.5 font-semibold text-ink-800" onClick={() => setMobileOpen(false)}>
                Hakkımızda
              </Link>
              <Link href="/blog" className="block rounded-lg px-3 py-2.5 font-semibold text-ink-800" onClick={() => setMobileOpen(false)}>
                Blog
              </Link>
              <Link href="/iletisim" className="block rounded-lg px-3 py-2.5 font-semibold text-ink-800" onClick={() => setMobileOpen(false)}>
                İletişim
              </Link>
              <details className="group rounded-lg">
                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 font-semibold text-ink-800">
                  Hizmetler
                  <Icon name="chevronDown" size={18} className="transition-transform group-open:rotate-180" />
                </summary>
                <div className="mt-1 space-y-2 pl-3">
                  {kategoriler.map((kat) => (
                    <details key={kat.slug} className="group/kat">
                      <summary className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-brand-700">
                        <Icon name={kat.ikon} size={16} /> {kat.baslik}
                        <Icon name="chevronDown" size={14} className="ml-auto transition-transform group-open/kat:rotate-180" />
                      </summary>
                      <div className="ml-5 mt-1 space-y-1 border-l border-ink-200 pl-3">
                        {kat.hizmetler.map((h) => (
                          <Link key={h.slug} href={`/hizmetler/${h.slug}`} onClick={() => setMobileOpen(false)} className="block py-1 text-sm text-ink-600">
                            {h.baslik}
                          </Link>
                        ))}
                      </div>
                    </details>
                  ))}
                </div>
              </details>
              <details className="group rounded-lg">
                <summary className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 font-semibold text-ink-800">
                  Bölgeler
                  <Icon name="chevronDown" size={18} className="transition-transform group-open:rotate-180" />
                </summary>
                <div className="mt-1 grid grid-cols-2 gap-1 pl-3">
                  {ilceler.map((i) => (
                    <Link key={i.slug} href={`/${i.slug}`} onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-sm text-ink-600">
                      {i.ad}
                    </Link>
                  ))}
                </div>
              </details>
            </div>
          </nav>
          <div className="grid grid-cols-2 gap-3 border-t border-ink-100 p-4">
            <a href={telLink} className="btn-cta justify-center">
              <Icon name="phone" size={17} /> Hemen Ara
            </a>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn-wa justify-center">
              <Icon name="whatsapp" size={18} /> WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}