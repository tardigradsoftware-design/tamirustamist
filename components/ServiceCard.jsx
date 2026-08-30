import Link from 'next/link';
import Icon from './Icons';

export default function ServiceCard({ hizmet, ilceSlug = null, compact = false }) {
  const href = ilceSlug ? `/${ilceSlug}/${hizmet.slug}` : `/hizmetler/${hizmet.slug}`;
  const ikon = hizmet.kategori?.ikon || 'wrench';

  return (
    <Link
      href={href}
      className="card group flex h-full flex-col p-5"
      aria-label={`${hizmet.baslik} hizmet sayfası`}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors group-hover:text-white"
          style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
        >
          <Icon name={ikon} size={22} />
        </span>
        <Icon
          name="arrowUpRight"
          size={18}
          className="shrink-0 text-ink-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-500"
        />
      </div>
      <h3 className={`mt-4 font-bold leading-snug text-ink-900 ${compact ? 'text-[15px]' : 'text-lg'}`}>
        {hizmet.baslik}
      </h3>
      {!compact && (
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-500">
          {hizmet.kisaAciklama}
        </p>
      )}
      <span
        className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
        style={{ color: 'var(--accent)' }}
      >
        İncele <Icon name="arrowRight" size={13} />
      </span>
    </Link>
  );
}