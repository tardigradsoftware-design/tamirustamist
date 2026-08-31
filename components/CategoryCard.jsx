import Link from 'next/link';
import Icon from './Icons';

/** Kompakt kategori kartı: mobilde tek satıra yakın, masaüstünde kısa özetli. */
export default function CategoryCard({ kategori }) {
  const hizmetler = kategori.hizmetler;
  const href = `/hizmetler/${hizmetler[0].slug}`;

  return (
    <Link
      href={href}
      className="category-card card group grid grid-cols-[2.75rem_minmax(0,1fr)_auto] items-center gap-3 p-3.5 sm:block sm:p-5"
      aria-label={`${kategori.baslik} kategorisindeki ${hizmetler.length} hizmeti incele`}
    >
      <span
        className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 sm:h-10 sm:w-10"
        style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
      >
        <Icon name={kategori.ikon} size={20} />
      </span>

      <div className="min-w-0 sm:mt-3">
        <h3 className="truncate text-base sm:text-lg">{kategori.baslik}</h3>
        <p className="mt-1 line-clamp-1 text-xs leading-relaxed text-ink-500 sm:line-clamp-2 sm:text-sm">
          {kategori.aciklama}
        </p>

        <div className="mt-3 hidden flex-wrap gap-1.5 sm:flex">
          {hizmetler.slice(0, 3).map((h) => (
            <span
              key={h.slug}
              className="rounded-full bg-ink-100/80 px-2 py-0.5 text-[10px] font-semibold text-ink-600"
            >
              {h.baslik.split(' (')[0]}
            </span>
          ))}
          {hizmetler.length > 3 && (
            <span className="rounded-full bg-ink-100/80 px-2 py-0.5 text-[10px] font-semibold text-ink-400">
              +{hizmetler.length - 3} daha
            </span>
          )}
        </div>
      </div>

      <span
        className="inline-flex shrink-0 items-center gap-1 text-xs font-bold sm:mt-4 sm:text-sm"
        style={{ color: 'var(--accent)' }}
      >
        <span className="sm:hidden">{hizmetler.length} hizmet</span>
        <span className="hidden sm:inline">{hizmetler.length} hizmeti incele</span>
        <Icon name="arrowRight" size={14} />
      </span>
    </Link>
  );
}
