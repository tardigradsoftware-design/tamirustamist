'use client';

import Icon from './Icons';
import { firma } from '../lib/site-data';

export default function WhatsAppFloat() {
  const wa = `https://wa.me/${firma.whatsapp}?text=${encodeURIComponent(
    `Merhaba, ${firma.ad} ile iletişime geçmek istiyorum.`
  )}`;

  return (
    <a
      href={wa}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile mesaj gönder"
      className="wa-float group fixed bottom-24 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-whatsapp py-3.5 pl-4 pr-4 text-white shadow-2xl transition-transform hover:-translate-y-1 sm:bottom-6 sm:right-6"
    >
      <Icon name="whatsapp" size={26} strokeWidth={1.7} />
      <span className="hidden text-sm font-bold sm:inline">Mesaj Gönder</span>
    </a>
  );
}