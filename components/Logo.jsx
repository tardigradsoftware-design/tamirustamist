import { logo, firma } from '../lib/site-data';

export default function Logo({ idSuffix = 'a', link = true, className = '', markOnly = false, height = 48 }) {
  const raw = logo.svg || '';
  // Aynı sayfada birden çok logo render edildiğinde id çakışmasını önle.
  const svg = raw
    .replace(/id=["']([^"']+)["']/g, `id="$1-${idSuffix}"`)
    .replace(/url\(#([^)]+)\)/g, `url(#$1-${idSuffix})`)
    .replace(/aria-labelledby=["']([^"']+)["']/g, (_, ids) =>
      `aria-labelledby="${ids
        .split(/\s+/)
        .map((s) => `${s}-${idSuffix}`)
        .join(' ')}"`
    )
    .replace('<svg ', '<svg width="100%" height="100%" ');

  // Mark'ı doğru oranda göstermek için viewBox'tan gelen en-boy oranını (258x266 ≈ 0.97) koruyoruz.
  const mark = (
    <span
      className="inline-flex shrink-0"
      style={{ height: `${height}px`, aspectRatio: '258 / 266' }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );

  if (markOnly) {
    return <span className={className}>{mark}</span>;
  }

  const content = (
    <span className={'flex items-center gap-3 ' + className}>
      {mark}
      <span className="leading-tight">
        <span className="block font-display text-xl font-bold uppercase tracking-wide text-ink-900 sm:text-2xl">
          {firma.kisaAd}
        </span>
        <span className="block text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-600">
          Yapı · Tadilat · Tesisat
        </span>
      </span>
    </span>
  );

  if (!link) return content;
  return (
    <a href="/" aria-label={`${firma.ad} anasayfa`} className="inline-flex items-center">
      {content}
    </a>
  );
}
