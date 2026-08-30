'use client';

import { useEffect, useState } from 'react';
import Icon from './Icons';
import { firma } from '../lib/site-data';

export default function StickyCallBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 420);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const wa = `https://wa.me/${firma.whatsapp}?text=${encodeURIComponent(
    `Merhaba, fiyat teklifi almak istiyorum.`
  )}`;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-px border-t border-ink-200 bg-ink-200 transition-transform duration-300 sm:hidden ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
      role="region"
      aria-label="Hızlı iletişim çubuğu"
    >
      <a
        href={`tel:${firma.telefonTel}`}
        className="flex items-center justify-center gap-2 bg-brand-600 py-3.5 text-sm font-bold uppercase tracking-wide text-white"
      >
        <Icon name="phone" size={17} /> Hemen Ara
      </a>
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-whatsapp py-3.5 text-sm font-bold uppercase tracking-wide text-white"
      >
        <Icon name="whatsapp" size={18} /> WhatsApp
      </a>
    </div>
  );
}