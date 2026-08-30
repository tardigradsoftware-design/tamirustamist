'use client';

import { useEffect, useState } from 'react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const v = localStorage.getItem('kvkk-onay');
      if (v !== '1' && v !== '0') setVisible(true);
      if (v === '1') loadAnalytics();
    } catch {
      setVisible(false);
    }
  }, []);

  function loadAnalytics() {
    try {
      const ga = JSON.parse(
        document.getElementById('ga-config')?.textContent || '""'
      );
      if (!ga) return;
      // GA4 script'i yalnızca onay sonrası yüklenir
      const s = document.createElement('script');
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${ga}`;
      document.head.appendChild(s);
      const inline = document.createElement('script');
      inline.textContent = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}',{anonymize_ip:true});`;
      document.head.appendChild(inline);
    } catch {
      /* sessiz */
    }
  }

  function karar(al) {
    try {
      localStorage.setItem('kvkk-onay', al ? '1' : '0');
    } catch {}
    if (al) loadAnalytics();
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[70] border-t border-ink-200 bg-white/95 p-4 shadow-2xl backdrop-blur sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-md sm:rounded-2xl sm:border"
      role="dialog"
      aria-label="Çerez bildirimi"
    >
      <p className="text-sm text-ink-600">
        <strong className="text-ink-800">KVKK ve Çerez Aydınlatması:</strong>{' '}
        Web sitemizde yalnızca siteyi doğru çalıştırmak ve istatistik için
        çerezler kullanılır. Kabul etmediğiniz takdirde sitemiz kesintisiz
        çalışmaya devam eder.
      </p>
      <div className="mt-3 flex gap-2">
        <button type="button" onClick={() => karar(true)} className="btn-cta flex-1 !px-4 !py-2 !text-xs">
          Kabul Et
        </button>
        <button
          type="button"
          onClick={() => karar(false)}
          className="btn-outline flex-1 !px-4 !py-2 !text-xs"
        >
          Yalnızca Gerekli
        </button>
      </div>
    </div>
  );
}