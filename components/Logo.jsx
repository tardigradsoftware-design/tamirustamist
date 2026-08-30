import { logo, firma } from '../lib/site-data';

export default function Logo({ idSuffix = 'a', link = true, className = '', markOnly = false }) {
  const raw = logo.svg || '';
  // Aynı sayfada birden çok logo render edildiğinde gradient id çakışmasını önle
  const svg = raw
    .replace(/id=["']([^"']+)["']/g, `id="$1-${idSuffix}"`)
    .replace(/url\(#([^)]+)\)/g, `url(#$1-${idSuffix})`);

  const mark = <span className="inline-flex shrink-0" dangerouslySetInnerHTML={{ __html: svg }} />;

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