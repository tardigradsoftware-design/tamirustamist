import Link from 'next/link';
import Icon from './Icons';

/** Kategori kartı: tüm hizmet özetini korur, yalnızca ikon alanını kompakt tutar. */
export default function CategoryCard({ kategori }) {
  const hizmetler = kategori.hizmetler;
  const href = `/hizmetler/${hizmetler[0].slug}`;

  return (
    <Link
      href={href}
      className="category-card card group block p-4 sm:p-5"
      aria-label={`${kategori.baslik} kategorisindeki ${hizmetler.length} hizmeti incele`}
    >
      {/* Yalnızca bu üst ikon alanı kompakt tutuldu */}
      <div className="flex items-center justify-between gap-3">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
          style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
        >
          <Icon name={kategori.ikon} size={20} />
        </span>
        <Icon
          name="arrowUpRight"
          size={17}
          className="shrink-0 text-ink-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-500"
        />
      </div>

      <h3 className="mt-3 text-base sm:text-lg">{kategori.baslik}</h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-500">{kategori.aciklama}</p>

      {/* Hizmet özeti korunuyor */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {hizmetler.slice(0, 4).map((h) => (
          <span
            key={h.slug}
            className="rounded-full bg-ink-100/80 px-2.5 py-0.5 text-[11px] font-semibold text-ink-600"
          >
            {h.baslik.split(' (')[0]}
          </span>
        ))}
        {hizmetler.length > 4 && (
          <span className="rounded-full bg-ink-100/80 px-2.5 py-0.5 text-[11px] font-semibold text-ink-400">
            +{hizmetler.length - 4} daha
          </span>
        )}
      </div>

      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold" style={{ color: 'var(--accent)' }}>
        {hizmetler.length} hizmeti incele <Icon name="arrowRight" size={15} />
      </span>
    </Link>
  );
}
