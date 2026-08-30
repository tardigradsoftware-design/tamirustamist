import Link from 'next/link';
import Icon from './Icons';

export default function Breadcrumbs({ items = [] }) {
  const crumbs = [{ label: 'Ana Sayfa', href: '/' }, ...items];
  return (
    <nav aria-label="İçerik yolu (breadcrumb)" className="container-x pt-24 sm:pt-28">
      <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-ink-500">
        {crumbs.map((c, i) => (
          <li key={c.href || c.label} className="flex items-center gap-1.5">
            {i > 0 && <Icon name="chevronRight" size={12} className="text-ink-300" aria-hidden="true" />}
            {c.href && i < crumbs.length - 1 ? (
              <Link href={c.href} className="hover:text-brand-600">
                {c.label}
              </Link>
            ) : (
              <span className="font-semibold text-ink-800" aria-current="page">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}