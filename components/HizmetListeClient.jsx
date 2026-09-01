'use client';

/**
 * /hizmetler sayfası için aranabilir + filtrelenebilir + sıralanabilir
 * bilgi zengini hizmet listesi. Her satır:
 *  · Thumbnail görsel (kategori bazlı)
 *  · Kategori rozeti + başlık + meta sinyalleri (süre / bütçe / ilçe / talep)
 *  · WhatsApp + Detay CTA
 * Açıklama ve uzun detay yalnızca hizmet detay sayfasında gösterilir.
 */
import Link from 'next/link';
import { useMemo, useState } from 'react';
import Icon from './Icons';

const SIRALAMALAR = [
  { key: 'talep', etiket: 'En yaygın talep' },
  { key: 'alfabetik', etiket: 'A → Z' },
  { key: 'sure-kisa', etiket: 'Süre (kısa → uzun)' },
  { key: 'fiyat-dusuk', etiket: 'Fiyat (düşük → yüksek)' },
  { key: 'fiyat-yuksek', etiket: 'Fiyat (yüksek → düşük)' },
];

const KATEGORI_RENK = {
  'banyo-tadilati': 'bg-orange-50 ring-orange-200 text-orange-700',
  'elektrik-tesisati': 'bg-amber-50 ring-amber-200 text-amber-700',
  'ic-mekan-dekorasyon': 'bg-teal-50 ring-teal-200 text-teal-700',
  'isitma-sistemleri': 'bg-red-50 ring-red-200 text-red-700',
  'mutfak-tadilati': 'bg-sky-50 ring-sky-200 text-sky-700',
  'sihhi-tesisat': 'bg-blue-50 ring-blue-200 text-blue-700',
  'tikaniklik-acma': 'bg-emerald-50 ring-emerald-200 text-emerald-700',
};

function fiyatSkor(fiyat) {
  const m = /^(\d+)(?:-(\d+))?/.exec((fiyat || '').split('|')[0].trim());
  if (!m) return 5;
  return Number(m[1]);
}
function sureSkor(s) {
  if (!s) return 99;
  const isGun = /gün/i.test(s);
  const isSaat = /saat/i.test(s);
  const m = /([\d.,]+)(?:\s*-\s*([\d.,]+))?/.exec(s);
  if (!m) return 99;
  const v1 = Number(m[1].replace(',', '.'));
  return isGun ? v1 : isSaat ? v1 / 24 : v1;
}
function sayiFormat(n) {
  return (n || 0).toLocaleString('tr-TR');
}

export default function HizmetListeClient({ hizmetler, whatsapp }) {
  const [kategori, setKategori] = useState('tumu');
  const [sira, setSira] = useState('talep');
  const [arama, setArama] = useState('');

  const kategorilerAll = useMemo(() => {
    const map = new Map();
    for (const h of hizmetler) {
      if (!map.has(h._kategoriSlug)) {
        map.set(h._kategoriSlug, { baslik: h._kategoriBaslik, ikon: h._kategoriIkon });
      }
    }
    return [
      { slug: 'tumu', baslik: 'Tümü', ikon: 'layers' },
      ...[...map.entries()].map(([slug, v]) => ({ slug, ...v })),
    ];
  }, [hizmetler]);

  const filtrelenmis = useMemo(() => {
    let list = hizmetler.slice();
    if (kategori !== 'tumu') list = list.filter((h) => h._kategoriSlug === kategori);
    const q = arama.trim().toLocaleLowerCase('tr-TR');
    if (q) {
      list = list.filter(
        (h) =>
          h.baslik.toLocaleLowerCase('tr-TR').includes(q) ||
          (h.kisaAciklama || '').toLocaleLowerCase('tr-TR').includes(q) ||
          h._kategoriBaslik.toLocaleLowerCase('tr-TR').includes(q)
      );
    }
    list.sort((a, b) => {
      if (sira === 'talep') {
        return (b.talepAy || 0) - (a.talepAy || 0) || a.baslik.localeCompare(b.baslik, 'tr');
      }
      if (sira === 'alfabetik') return a.baslik.localeCompare(b.baslik, 'tr');
      if (sira === 'sure-kisa') return sureSkor(a.sure) - sureSkor(b.sure);
      if (sira === 'fiyat-dusuk') return fiyatSkor(a.fiyat) - fiyatSkor(b.fiyat);
      if (sira === 'fiyat-yuksek') return fiyatSkor(b.fiyat) - fiyatSkor(a.fiyat);
      return 0;
    });
    return list;
  }, [hizmetler, kategori, arama, sira]);

  const aktifKategori = kategorilerAll.find((k) => k.slug === kategori);
  const toplamTalep = hizmetler.reduce((a, h) => a + (h.talepAy || 0), 0);

  return (
    <div>
      {/* Özet */}
      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <div className="card flex items-center gap-3 p-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
            <Icon name="layers" size={18} />
          </span>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-ink-400">Toplam</div>
            <div className="text-base font-bold text-ink-800">{hizmetler.length} hizmet</div>
          </div>
        </div>
        <div className="card flex items-center gap-3 p-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
            <Icon name="star" size={18} />
          </span>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-ink-400">Sık talep</div>
            <div className="text-base font-bold text-ink-800">
              {hizmetler.filter((h) => h.populer).length} hizmet
            </div>
          </div>
        </div>
        <div className="card flex items-center gap-3 p-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <Icon name="trendingUp" size={18} />
          </span>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-ink-400">Bu ay</div>
            <div className="text-base font-bold text-ink-800">{sayiFormat(toplamTalep)} talep</div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="sticky top-16 z-20 -mx-1 mb-6 rounded-2xl border border-ink-200 bg-white/95 px-3 py-3 backdrop-blur sm:px-4 sm:py-3.5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <label className="relative flex-1">
            <span className="sr-only">Hizmet ara</span>
            <Icon
              name="search"
              size={17}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400"
            />
            <input
              type="search"
              value={arama}
              onChange={(e) => setArama(e.target.value)}
              placeholder={`${hizmetler.length} hizmet içinden ara örn. Banyo, Kombi, Laminat`}
              className="w-full rounded-xl border border-ink-200 bg-ink-50 py-2.5 pl-10 pr-3 text-sm font-medium text-ink-800 outline-none transition focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-100"
            />
          </label>
          <select
            value={sira}
            onChange={(e) => setSira(e.target.value)}
            className="rounded-xl border border-ink-200 bg-ink-50 px-3 py-2.5 text-sm font-medium text-ink-800 outline-none transition focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-100"
            aria-label="Sıralama"
          >
            {SIRALAMALAR.map((s) => (
              <option key={s.key} value={s.key}>
                {'Sıralama: ' + s.etiket}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-3 flex flex-nowrap gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Kategori filtresi">
          {kategorilerAll.map((k) => {
            const aktif = k.slug === kategori;
            const sayi =
              k.slug === 'tumu' ? hizmetler.length : hizmetler.filter((h) => h._kategoriSlug === k.slug).length;
            return (
              <button
                key={k.slug}
                type="button"
                role="tab"
                aria-selected={aktif}
                onClick={() => setKategori(k.slug)}
                className={
                  'shrink-0 rounded-full px-4 py-2 text-sm font-bold transition-all ' +
                  (aktif
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
                    : 'bg-white text-ink-600 ring-1 ring-ink-200 hover:bg-brand-50 hover:text-brand-700')
                }
              >
                <Icon
                  name={k.ikon}
                  size={13}
                  className={'mr-1.5 inline-block align-[-1px] ' + (aktif ? 'text-brand-100' : 'text-ink-400')}
                />
                {k.baslik}{' '}
                <span className={'ml-1 text-xs font-medium ' + (aktif ? 'text-brand-100' : 'text-ink-400')}>
                  ({sayi})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sonuç bilgisi */}
      <div className="mb-4 flex items-center justify-between text-sm">
        <span className="text-ink-500">
          <strong className="text-ink-800">{filtrelenmis.length}</strong> hizmet gösteriliyor
          {kategori !== 'tumu' && aktifKategori ? (
            <>
              {' — '}
              <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-bold text-brand-700">
                {aktifKategori.baslik}
              </span>
            </>
          ) : null}
        </span>
        <button
          type="button"
          onClick={() => {
            setArama('');
            setKategori('tumu');
            setSira('talep');
          }}
          className="text-xs font-bold text-ink-500 hover:text-brand-600"
        >
          Filtreleri sıfırla
        </button>
      </div>

      {filtrelenmis.length === 0 ? (
        <div className="rounded-2xl border border-ink-200 bg-white p-10 text-center">
          <p className="text-ink-700">Aramanızla eşleşen hizmet bulunamadı.</p>
          <button
            type="button"
            onClick={() => {
              setArama('');
              setKategori('tumu');
              setSira('talep');
            }}
            className="btn-outline mt-3 !text-xs"
          >
            Filtreleri Sıfırla
          </button>
        </div>
      ) : (
        <ul className="space-y-3.5">
          {filtrelenmis.map((h) => {
            const renk = KATEGORI_RENK[h._kategoriSlug] || 'bg-ink-50 ring-ink-200 text-ink-700';
            const renkSplit = renk.split(' ');
            const detay = `/hizmetler/${h.slug}/`;
            const wa =
              'https://wa.me/' +
              whatsapp +
              '?text=' +
              encodeURIComponent('Merhaba, ' + h.baslik + ' hakkında bilgi almak istiyorum.');
            const fiyatPuan = (h.fiyat || '').split('|')[0].trim();
            const fiyatEtiket = (h.fiyat || '').split('|')[1] ? (h.fiyat || '').split('|')[1].trim() : '';
            const thumb = (h.gorseller && h.gorseller[0]) || '';
            return (
              <li key={h.slug}>
                <article className="card list-card group grid grid-cols-[120px_minmax(0,1fr)_auto] items-center gap-4 p-3 sm:grid-cols-[160px_minmax(0,1fr)_auto] sm:gap-5 sm:p-4 lg:grid-cols-[180px_minmax(0,1.6fr)_minmax(280px,1fr)_auto]">
                  {/* Sol kolon: thumbnail */}
                  <Link
                    href={detay}
                    className="relative block aspect-[4/3] overflow-hidden rounded-xl bg-ink-100 sm:aspect-[16/11]"
                    aria-label={h.baslik + ' detay sayfasını aç'}
                  >
                    {thumb ? (
                      <img
                        src={thumb}
                        alt={h.baslik + ' uygulama görseli'}
                        loading="lazy"
                        width={480}
                        height={330}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center bg-brand-50 text-brand-500">
                        <Icon name={h._kategoriIkon} size={28} />
                      </span>
                    )}
                    <span
                      className={
                        'absolute left-2 top-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1 ' +
                        renk
                      }
                    >
                      {h._kategoriBaslik}
                    </span>
                  </Link>

                  {/* Orta kolon: başlık + meta */}
                  <div className="min-w-0">
                    <div className="mb-1 hidden flex-wrap items-center gap-1.5 sm:flex">
                      {h.populer ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700 ring-1 ring-amber-200">
                          <Icon name="star" size={9} /> Sık Talep
                        </span>
                      ) : null}
                      {h.populer && h.talepAy ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 ring-1 ring-emerald-200">
                          <Icon name="trendingUp" size={9} /> Bu ay {sayiFormat(h.talepAy)} talep
                        </span>
                      ) : null}
                    </div>
                    <h3 className="text-base font-bold leading-snug text-ink-900 sm:text-lg">
                      <Link href={detay} className="hover:text-brand-700">
                        {h.baslik}
                      </Link>
                    </h3>
                    {/* mobil rozet satırı */}
                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5 sm:hidden">
                      {h.populer ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-700 ring-1 ring-amber-200">
                          <Icon name="star" size={9} /> Sık Talep
                        </span>
                      ) : null}
                      {h.talepAy ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 ring-1 ring-emerald-200">
                          <Icon name="trendingUp" size={9} /> {sayiFormat(h.talepAy)} talep
                        </span>
                      ) : null}
                    </div>
                  </div>

                  {/* Meta kutucukları */}
                  <div className="col-span-2 grid grid-cols-3 gap-2 lg:col-span-1 lg:flex lg:items-center lg:gap-3">
                    <div className="rounded-lg bg-ink-50 p-2.5">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-ink-400">
                        <Icon name="clock" size={11} /> Süre
                      </div>
                      <div className="mt-1 text-sm font-bold text-ink-800">{h.sure || '1-3 gün'}</div>
                    </div>
                    <div className="rounded-lg bg-ink-50 p-2.5">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-ink-400">
                        <Icon name="wallet" size={11} /> Bütçe
                      </div>
                      <div className="mt-1 text-sm font-bold" style={{ color: '#ea580c' }}>
                        {fiyatPuan || '—'}
                      </div>
                      <div className="text-[10px] text-ink-500">{fiyatEtiket}</div>
                    </div>
                    <div className="rounded-lg bg-ink-50 p-2.5">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-ink-400">
                        <Icon name="mapPin" size={11} /> Bölge
                      </div>
                      <div className="mt-1 text-sm font-bold text-ink-800">
                        {h.ilceSayisi || 25} ilçe
                      </div>
                    </div>
                  </div>

                  {/* Sağ kolon: CTA */}
                  <div className="col-span-3 flex items-center gap-2 lg:col-span-1 lg:flex-col lg:items-stretch">
                    <Link
                      href={detay}
                      className="btn-outline flex-1 justify-center !text-xs !tracking-normal lg:!px-3 lg:!py-2 lg:!text-[13px]"
                    >
                      Detayları Gör <Icon name="arrowRight" size={13} />
                    </Link>
                    <a
                      href={wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={'WhatsApp ile ' + h.baslik + ' hakkında yaz'}
                      className="inline-flex shrink-0 items-center justify-center gap-1 rounded-md border-2 border-whatsapp bg-white px-3 py-2 !text-xs font-bold text-whatsapp transition-colors hover:bg-whatsapp hover:text-white lg:w-full lg:!text-[13px]"
                    >
                      <Icon name="whatsapp" size={14} /> <span>WhatsApp</span>
                    </a>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
