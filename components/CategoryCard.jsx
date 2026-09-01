import Link from 'next/link';
import Icon from './Icons';

/** Kategori kartı.
 *  - İkon ve başlık aynı satırdadır (üstte ayrı blok yok).
 *  - Açıklama, hizmet etiketleri, +N daha ve CTA olduğu gibi korunur. */
export default function CategoryCard({ kategori }) {
  const hizmetler = kategori.hizmetler;
  const href = `/hizmetler/${hizmetler[0].slug}`;

  return (
    <Link
      href={href}
      className="category-card card group block p-4 sm:p-5"
      aria-label={`${kategori.baslik} kategorisindeki ${hizmetler.length} hizmeti incele`}
    >
      <div className="flex items-center justify-between gap-2.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-105"
            style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
          >
            <Icon name={kategori.ikon} size={18} />
          </span>
          <h3 className="truncate text-base sm:text-lg">{kategori.baslik}</h3>
        </div>
        <Icon
          name="arrowUpRight"
          size={16}
          className="shrink-0 text-ink-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-500"
        />
      </div>

      <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-500">{kategori.aciklama}</p>

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
