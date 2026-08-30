'use client';

import { useState } from 'react';
import Icon from './Icons';
import { firma, ilceler, tümHizmetler, formEndpoint } from '../lib/site-data';

const baslangic = { ad: '', telefon: '', ilce: '', hizmet: '', mesaj: '' };

export default function ContactForm() {
  const [form, setForm] = useState(baslangic);
  const [durum, setDurum] = useState('idle'); // idle | gonderiliyor | ok | hata

  function set(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function submit(e) {
    e.preventDefault();
    if (!form.ad.trim() || form.telefon.trim().length < 10) {
      setDurum('hata');
      return;
    }
    setDurum('gonderiliyor');

    if (formEndpoint) {
      try {
        const res = await fetch(formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(form),
        });
        if (res.ok) {
          setDurum('ok');
          setForm(baslangic);
          return;
        }
      } catch {
        /* endpoint hata verirse WhatsApp'a düş */
      }
    }

    // Fallback: WhatsApp üzerinden ön yazılmış mesaj gönder
    const metin = encodeURIComponent(
      `Merhaba, ücretsiz keşif istiyorum.\nAd: ${form.ad}\nTelefon: ${form.telefon}\nİlçe: ${form.ilce || '-'}\nHizmet: ${form.hizmet || '-'}\nMesaj: ${form.mesaj || '-'}`
    );
    window.open(`https://wa.me/${firma.whatsapp}?text=${metin}`, '_blank', 'noopener,noreferrer');
    setDurum('ok');
    setForm(baslangic);
  }

  return (
    <form onSubmit={submit} className="card p-6 sm:p-8" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="cf-ad" className="mb-1.5 block text-sm font-bold text-ink-800">
            Adınız Soyadınız *
          </label>
          <input
            id="cf-ad"
            type="text"
            required
            value={form.ad}
            onChange={(e) => set('ad', e.target.value)}
            placeholder="Adınız Soyadınız"
            className="w-full rounded-lg border border-ink-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-tel" className="mb-1.5 block text-sm font-bold text-ink-800">
            Telefon Numaranız *
          </label>
          <input
            id="cf-tel"
            type="tel"
            required
            inputMode="tel"
            value={form.telefon}
            onChange={(e) => set('telefon', e.target.value)}
            placeholder="05XX XXX XX XX"
            className="w-full rounded-lg border border-ink-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <div>
          <label htmlFor="cf-ilce" className="mb-1.5 block text-sm font-bold text-ink-800">
            İlçe
          </label>
          <select
            id="cf-ilce"
            value={form.ilce}
            onChange={(e) => set('ilce', e.target.value)}
            className="w-full rounded-lg border border-ink-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          >
            <option value="">İlçe seçin</option>
            {ilceler.map((i) => (
              <option key={i.slug} value={i.ad}>{i.ad}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="cf-hizmet" className="mb-1.5 block text-sm font-bold text-ink-800">
            Hizmet
          </label>
          <select
            id="cf-hizmet"
            value={form.hizmet}
            onChange={(e) => set('hizmet', e.target.value)}
            className="w-full rounded-lg border border-ink-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          >
            <option value="">Hizmet seçin</option>
            {tümHizmetler.map((h) => (
              <option key={h.slug} value={h.baslik}>{h.baslik}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-mesaj" className="mb-1.5 block text-sm font-bold text-ink-800">
            Mesajınız
          </label>
          <textarea
            id="cf-mesaj"
            rows={4}
            value={form.mesaj}
            onChange={(e) => set('mesaj', e.target.value)}
            placeholder="Yapılacak işi kısaca anlatın: örn. 'Bakırköy'de 12 m² banyonun komple tadilatı...'"
            className="w-full rounded-lg border border-ink-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </div>
      </div>

      {durum === 'hata' && (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          Lütfen adınızı ve geçerli bir telefon numarası girin.
        </p>
      )}
      {durum === 'ok' && (
        <p className="mt-4 rounded-lg bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
          Talebiniz alındı! En geç 30 dakika içinde size dönüş yapacağız (WhatsApp gönderildiyse
          mesajınız bizde).
        </p>
      )}

      <button
        type="submit"
        disabled={durum === 'gonderiliyor'}
        className="btn-cta mt-5 w-full justify-center disabled:opacity-60"
      >
        {durum === 'gonderiliyor' ? 'Gönderiliyor…' : (
          <>
            <Icon name="send" size={16} /> Ücretsiz Keşif Talebi Gönder
          </>
        )}
      </button>
      <p className="mt-3 text-center text-xs text-ink-400">
        {formEndpoint ? 'Form sunucusuna gönderilir · ' : ''}
        KVKK kapsamında yalnızca iletişim amacıyla kullanılır.
      </p>
    </form>
  );
}