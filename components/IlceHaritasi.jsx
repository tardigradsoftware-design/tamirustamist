'use client';

import { useRef, useState, useCallback } from 'react';
import Icon from './Icons';
import { ilceler } from '../lib/site-data';

/* Şemaatik İstanbul Avrupa Yakası haritası — altıgen konumlandırma */
const positions = {
  catalca: [0, 0], arnavutkoy: [2, 0], sultangazi: [3, 0], sariyer: [6, 0],
  silivri: [0, 1], basaksehir: [1, 1], eyupsultan: [3, 1], kagithane: [5, 1], besiktas: [6, 1],
  buyukcekmece: [0, 2], esenyurt: [1, 2], bayrampasa: [2, 2], gaziosmanpasa: [3, 2], sisli: [4, 2], beyoglu: [5, 2],
  beylikduzu: [0, 3], avcilar: [1, 3], esenler: [2, 3], bagcilar: [3, 3], bahcelievler: [4, 3], zeytinburnu: [5, 3], fatih: [6, 3],
  kucukcekmece: [2, 4], gungoren: [3, 4], bakirkoy: [4, 4],
};

const S = 58;
const SQ3 = Math.sqrt(3);
function hexPath(q, r) {
  const cx = S * 1.5 * q + 86;
  const cy = S * SQ3 * (r + q / 2) + 44;
  const pts = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i;
    pts.push(`${(cx + S * Math.cos(a)).toFixed(1)},${(cy + S * Math.sin(a)).toFixed(1)}`);
  }
  return { d: `M${pts.join(' L')} Z`, cx, cy };
}

const MIN_S = 1;
const MAX_S = 2.6;
const STEP = 0.25;

export default function IlceHaritasi() {
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const drag = useRef(null);
  const wrapRef = useRef(null);

  const zoom = useCallback((k) => {
    setScale((s) => Math.min(MAX_S, Math.max(MIN_S, +(s + k).toFixed(2))));
  }, []);

  const sifirla = useCallback(() => {
    setScale(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const onWheel = useCallback((e) => {
    e.preventDefault();
    const k = e.deltaY < 0 ? STEP : -STEP;
    zoom(k);
  }, [zoom]);

  const onPointerDown = useCallback((e) => {
    drag.current = { x: e.clientX, y: e.clientY, px: 0, py: 0, moved: false };
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e) => {
    if (!drag.current) return;
    const dx = e.clientX - drag.current.x;
    const dy = e.clientY - drag.current.y;
    if (Math.abs(dx) + Math.abs(dy) > 3) drag.current.moved = true;
    drag.current.px = dx;
    drag.current.py = dy;
    setPan((p) => ({
      x: p.x + dx - drag.current.px,
      y: p.y + dy - drag.current.py,
    }));
    drag.current.x = e.clientX;
    drag.current.y = e.clientY;
    drag.current.px = 0;
    drag.current.py = 0;
  }, []);

  const onPointerUp = useCallback((e) => {
    drag.current = null;
  }, []);

  return (
    <figure className="ilce-harita mx-auto max-w-3xl" aria-label="İstanbul Avrupa Yakası hizmet bölgesi haritası">
      <div
        ref={wrapRef}
        className="relative overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card"
        onWheel={onWheel}
        style={{ touchAction: 'none', cursor: drag.current ? 'grabbing' : 'grab' }}
      >
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`,
            transformOrigin: 'center center',
            transition: drag.current ? 'none' : 'transform 0.25s ease-out',
          }}
        >
          <svg viewBox="0 0 720 720" className="w-full" role="img" aria-hidden="true">
            {/* denizler */}
            <rect x="0" y="0" width="720" height="30" fill="#e0f2fe" />
            <text x="360" y="20" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0284c7">KARADENİZ</text>
            <rect x="640" y="30" width="80" height="640" fill="#e0f2fe" />
            <text x="680" y="360" transform="rotate(-90 680 360)" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0284c7">İSTANBUL BOĞAZI</text>
            <polygon points="0,660 720,660 720,720 0,720" fill="#e0f2fe" />
            <text x="320" y="696" fontSize="10" fontWeight="700" fill="#0284c7">MARMARA DENİZİ</text>

            {/* ilçe altıgenleri */}
            {ilceler.map((i, idx) => {
              const pos = positions[i.slug] || [0, 0];
              const { d, cx, cy } = hexPath(pos[0], pos[1]);
              return (
                <a key={i.slug} href={`/${i.slug}`} aria-label={`${i.ad} tadilat hizmetleri`}>
                  <path
                    className="ilce"
                    d={d}
                    style={{
                      filter: `saturate(${0.9 + (idx % 5) * 0.08})`,
                    }}
                  />
                  <text className="ilce-label" x={cx} y={cy + 5}>
                    {i.ad}
                  </text>
                </a>
              );
            })}
          </svg>
        </div>

        {/* Zoom kontrolleri (A2) */}
        <div className="absolute right-3 top-3 flex flex-col gap-1.5" role="group" aria-label="Harita yakınlaştırma">
          <button
            type="button"
            onClick={() => zoom(STEP)}
            aria-label="Yakınlaştır"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-200 bg-white/95 font-bold text-ink-700 shadow-sm transition-colors hover:bg-brand-600 hover:text-white"
          >
            +
          </button>
          <button
            type="button"
            onClick={() => zoom(-STEP)}
            aria-label="Uzaklaştır"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-200 bg-white/95 font-bold text-ink-700 shadow-sm transition-colors hover:bg-brand-600 hover:text-white"
          >
            −
          </button>
          <button
            type="button"
            onClick={sifirla}
            aria-label="Haritayı sıfırla"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-200 bg-white/95 text-ink-700 shadow-sm transition-colors hover:bg-brand-600 hover:text-white"
          >
            <Icon name="target" size={15} />
          </button>
        </div>
        <div className="pointer-events-none absolute bottom-3 left-0 right-0 flex justify-center">
          <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-ink-500 shadow-sm">
            Sürükleyerek kaydırın · + / − ile yakınlaştırın
          </span>
        </div>
      </div>
      <figcaption className="mt-4 text-center text-sm text-ink-500">
        Tıklayarak ilçeye özel tadilat ve tesisat hizmetlerine ulaşın · 25 ilçe · Avrupa Yakası
      </figcaption>
    </figure>
  );
}