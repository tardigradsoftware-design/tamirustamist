import Link from 'next/link';
import Icon from './Icons';

export default function ServiceCard({ hizmet, ilceSlug = null, compact = false }) {
  const href = ilceSlug ? `/${ilceSlug}/${hizmet.slug}` : `/hizmetler/${hizmet.slug}`;
  const ikon = hizmet.kategori?.ikon || 'wrench';

  return (
    <Link
      href={href}
      className={`card group flex flex-col ${compact ? 'p-3' : 'p-3.5 sm:p-4'}`}
      aria-label={`${hizmet.baslik} hizmet sayfası`}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={`flex shrink-0 items-center justify-center rounded-lg transition-colors group-hover:text-white ${compact ? 'h-8 w-8' : 'h-9 w-9'}`}
          style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
        >
          <Icon name={ikon} size={compact ? 16 : 18} />
        </span>
        <Icon
          name="arrowUpRight"
          size={16}
          className="shrink-0 text-ink-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-500"
        />
      </div>
      <h3 className={`mt-3 font-bold leading-snug text-ink-900 ${compact ? 'text-sm' : 'text-base sm:text-lg'}`}>
        {hizmet.baslik}
      </h3>
      {!compact && (
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-ink-500">
          {hizmet.kisaAciklama}
        </p>
      )}
      <span
        className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold tracking-wide"
        style={{ color: 'var(--accent)' }}
      >
        İncele <Icon name="arrowRight" size={13} />
      </span>
    </Link>
  );
}