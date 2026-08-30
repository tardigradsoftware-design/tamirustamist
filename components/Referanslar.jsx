import Icon from './Icons';
import { referanslar } from '../lib/site-data';

function Stars({ n }) {
  return (
    <div className="flex gap-0.5 text-amber-400" aria-label={`${n} yıldız`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <Icon key={s} name="star" size={15} className={s <= n ? '' : 'opacity-25'} />
      ))}
    </div>
  );
}

export default function Referanslar({ limit = 10 }) {
  const list = referanslar.slice(0, limit);
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {list.map((r) => (
        <figure
          key={r.ad + r.ilce}
          className="card flex flex-col justify-between p-6"
        >
          <div>
            <Stars n={r.puan} />
            <blockquote className="mt-4 text-[15px] leading-relaxed text-ink-700">
              “{r.yorum}”
            </blockquote>
          </div>
          <figcaption className="mt-5 flex items-center gap-3 border-t border-ink-100 pt-4">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-full font-display font-bold text-white"
              style={{ background: 'var(--accent)' }}
            >
              {r.ad.charAt(0)}
            </span>
            <div>
              <div className="text-sm font-bold text-ink-900">{r.ad}</div>
              <div className="text-xs text-ink-500">
                {r.ilce} · {r.hizmet}
              </div>
            </div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}