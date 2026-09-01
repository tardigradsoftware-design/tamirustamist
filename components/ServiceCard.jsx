import Link from 'next/link';
import Icon from './Icons';

export default function ServiceCard({ hizmet, ilceSlug = null, compact = false, showImage = true }) {
  const href = ilceSlug ? `/${ilceSlug}/${hizmet.slug}` : `/hizmetler/${hizmet.slug}`;
  const ikon = hizmet.kategori?.ikon || 'wrench';
  const thumb = (hizmet.gorseller && hizmet.gorseller[0]) || '';

  return (
    <Link
      href={href}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-card transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card-hover ${
        compact ? 'p-2.5' : 'p-3.5 sm:p-4'
      }`}
      aria-label={`${hizmet.baslik} hizmet sayfası`}
    >
      {/* Thumbnail block — küçük ama yüksek etkili */}
      {showImage && thumb && (
        <div className={`relative w-full overflow-hidden ${compact ? 'mb-2.5 aspect-[16/10]' : 'mb-3 aspect-[16/9]'}`}>
          <img
            src={thumb}
            alt={hizmet.baslik + ' uygulama görseli'}
            loading="lazy"
            width={640}
            height={400}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          {/* Kategori ikonu — sağ altta */}
          <span
            className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white/95 text-brand-600 shadow"
            aria-hidden="true"
          >
            <Icon name={ikon} size={16} />
          </span>
        </div>
      )}
      {!showImage && (
        <span
          className={`flex shrink-0 items-center justify-center rounded-lg transition-colors group-hover:text-white ${
            compact ? 'mb-2 h-9 w-9' : 'mb-2.5 h-10 w-10'
          }`}
          style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
        >
          <Icon name={ikon} size={compact ? 16 : 18} />
        </span>
      )}

      <div className="flex items-start justify-between gap-2 px-1">
        <h3 className={`line-clamp-2 font-bold leading-snug text-ink-900 ${compact ? 'text-sm' : 'text-base sm:text-lg'}`}>
          {hizmet.baslik}
        </h3>
        <Icon
          name="arrowUpRight"
          size={16}
          className="mt-0.5 shrink-0 text-ink-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-500"
        />
      </div>

      <span
        className="mt-2 inline-flex items-center gap-1.5 px-1 text-xs font-bold tracking-wide"
        style={{ color: 'var(--accent)' }}
      >
        İncele <Icon name="arrowRight" size={13} />
      </span>
    </Link>
  );
}
