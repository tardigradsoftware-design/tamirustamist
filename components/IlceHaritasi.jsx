'use client';

import { useMemo, useState } from 'react';
import Icon from './Icons';
import { ilceler } from '../lib/site-data';
import { ilceHarita, haritaViewBox } from '../lib/ilce-harita-data';

const haritaMap = new Map(ilceHarita.map((i) => [i.slug, i]));

function ilceRengi(ilce, selected) {
  if (selected) return 'var(--accent)';
  const renkler = {
    amber: '#fef3c7',
    orange: '#ffedd5',
    red: '#fee2e2',
    teal: '#ccfbf1',
    navy: '#dbeafe',
    slate: '#e2e8f0',
    green: '#dcfce7',
  };
  return renkler[ilce.accent] || '#eef2f7';
}

function normalize(text) {
  return text
    .toLocaleLowerCase('tr-TR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ı/g, 'i');
}

export default function IlceHaritasi() {
  const [selectedSlug, setSelectedSlug] = useState('bakirkoy');
  const [query, setQuery] = useState('');

  const selected = ilceler.find((i) => i.slug === selectedSlug) || ilceler[0];
  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return ilceler;
    return ilceler.filter((i) => normalize(`${i.ad} ${i.bolge}`).includes(q));
  }, [query]);

  const selectDistrict = (slug) => setSelectedSlug(slug);

  return (
    <figure className="ilce-harita mx-auto max-w-6xl" aria-label="İstanbul Avrupa Yakası ilçe ve hizmet bölgesi rehberi">
      <div className="grid overflow-hidden rounded-3xl border border-ink-200 bg-white shadow-card lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
        {/* Gerçek sınır haritası */}
        <div className="relative flex min-h-[360px] items-center bg-sky-50 p-3 sm:p-6 lg:min-h-[610px]">
          <div className="pointer-events-none absolute left-5 top-5 z-10 rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-sky-700 shadow-sm backdrop-blur-sm">
            Gerçek ilçe sınırları
          </div>
          <svg
            viewBox={haritaViewBox}
            className="h-auto max-h-[590px] min-h-[350px] w-full"
            role="img"
            aria-label="İstanbul Avrupa Yakası 25 ilçe sınır haritası"
          >
            <title>İstanbul Avrupa Yakası hizmet bölgeleri</title>
            <rect width="100%" height="100%" fill="#e0f2fe" />
            <text x="50%" y="18" textAnchor="middle" className="map-sea-label">KARADENİZ</text>
            <text x="50%" y="97%" textAnchor="middle" className="map-sea-label">MARMARA DENİZİ</text>

            {ilceler.map((ilce) => {
              const shape = haritaMap.get(ilce.slug);
              if (!shape) return null;
              const isSelected = selectedSlug === ilce.slug;
              return (
                <a
                  key={ilce.slug}
                  href={`/${ilce.slug}/`}
                  aria-label={`${ilce.ad} tadilat ve tesisat hizmetleri`}
                  onClick={(event) => {
                    // Önce harita üzerinde ilçeyi göster; detay bağlantısı karttan da erişilebilir.
                    event.preventDefault();
                    selectDistrict(ilce.slug);
                  }}
                  onMouseEnter={() => selectDistrict(ilce.slug)}
                  onFocus={() => selectDistrict(ilce.slug)}
                  className="map-district-link"
                >
                  <path
                    d={shape.d}
                    fill={ilceRengi(ilce, isSelected)}
                    className={`map-district ${isSelected ? 'is-selected' : ''}`}
                    fillRule="evenodd"
                  />
                  {isSelected && (
                    <g className="map-selected-label" pointerEvents="none">
                      <circle cx={shape.cx} cy={shape.cy} r="5" className="map-selected-dot" />
                      <text
                        x={shape.cx}
                        y={shape.cy - 11}
                        textAnchor="middle"
                        fontSize={Math.max(9, Math.min(shape.fs, 14))}
                      >
                        {ilce.ad}
                      </text>
                    </g>
                  )}
                </a>
              );
            })}
          </svg>

          <div className="pointer-events-none absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3">
            <span className="rounded-lg bg-white/90 px-3 py-2 text-[11px] font-semibold text-ink-500 shadow-sm backdrop-blur-sm">
              Haritadan bir ilçe seçin
            </span>
            <span className="rounded-lg bg-white/90 px-3 py-2 text-[11px] font-semibold text-ink-500 shadow-sm backdrop-blur-sm">
              {ilceler.length} ilçe · Avrupa Yakası
            </span>
          </div>
        </div>

        {/* Aranabilir ilçe rehberi */}
        <div className="flex flex-col border-t border-ink-100 bg-white lg:border-l lg:border-t-0">
          <div className="border-b border-ink-100 p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="eyebrow">Hizmet Rehberi</p>
                <h3 className="mt-2 text-2xl">İlçenizi seçin</h3>
              </div>
              <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700">25 / 25</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink-500">
              İlçenize özel hizmetleri, sık karşılaşılan sorunları ve ücretsiz keşif seçeneklerini görün.
            </p>
            <label className="relative mt-5 block">
              <span className="sr-only">İlçe ara</span>
              <Icon name="search" size={17} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="İlçe ara..."
                className="w-full rounded-xl border border-ink-200 bg-ink-50 py-3 pl-10 pr-3 text-sm font-medium text-ink-800 outline-none transition focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-100"
              />
            </label>
          </div>

          <div className="max-h-[390px] overflow-y-auto p-4 sm:p-5" aria-label="İlçe listesi">
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {filtered.map((ilce) => {
                const active = selectedSlug === ilce.slug;
                return (
                  <button
                    key={ilce.slug}
                    type="button"
                    onClick={() => selectDistrict(ilce.slug)}
                    className={`group flex items-center gap-2.5 rounded-xl border p-3 text-left transition-all ${
                      active
                        ? 'border-brand-300 bg-brand-50 shadow-sm'
                        : 'border-transparent bg-ink-50 hover:border-ink-200 hover:bg-white hover:shadow-sm'
                    }`}
                    aria-pressed={active}
                  >
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${active ? 'bg-brand-600 text-white' : 'bg-white text-ink-500 ring-1 ring-ink-200'}`}>
                      {String(ilceler.indexOf(ilce) + 1).padStart(2, '0')}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block truncate text-sm font-bold ${active ? 'text-brand-800' : 'text-ink-800'}`}>{ilce.ad}</span>
                      <span className="block truncate text-[10px] font-medium text-ink-400">{ilce.bolge}</span>
                    </span>
                    <Icon name="chevronRight" size={14} className={`shrink-0 transition-transform group-hover:translate-x-0.5 ${active ? 'text-brand-600' : 'text-ink-300'}`} />
                  </button>
                );
              })}
            </div>
            {filtered.length === 0 && (
              <p className="py-8 text-center text-sm text-ink-500">Aramanızla eşleşen ilçe bulunamadı.</p>
            )}
          </div>

          <div className="mt-auto border-t border-ink-100 bg-ink-50/60 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white">
                <Icon name="mapPin" size={18} />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wider text-brand-700">Seçili bölge</p>
                <h4 className="mt-1 truncate text-xl">{selected.ad}</h4>
                <p className="mt-1 text-xs leading-relaxed text-ink-500">{selected.bolge}</p>
              </div>
            </div>
            <a href={`/${selected.slug}/`} className="btn-cta mt-4 w-full justify-center">
              {selected.ad} hizmetlerini incele <Icon name="arrowRight" size={16} />
            </a>
          </div>
        </div>
      </div>
      <figcaption className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-center text-xs text-ink-500">
        <span>Haritadan veya listeden ilçe seçin</span>
        <span className="hidden text-ink-300 sm:inline">·</span>
        <span>Harita sınırları OpenStreetMap verisine göre sadeleştirilmiştir</span>
      </figcaption>
    </figure>
  );
}