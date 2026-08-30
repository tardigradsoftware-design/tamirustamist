import { ilceler } from '../lib/site-data';

/* Şemaatik İstanbul Avrupa Yakası haritası — altıgen konumlandırma */
const positions = {
  catalca: [0, 0], arnavutkoy: [2, 0], sultangazi: [3, 0], sariyer: [6, 0],
  silivri: [0, 1], basaksehir: [1, 1], eyupsultan: [3, 1], kagithane: [5, 1], besiktas: [6, 1],
  buyukcekmece: [0, 2], esenyurt: [1, 2], bayrampasa: [2, 2], gaziosmanpasa: [3, 2], sisli: [4, 2], beyoglu: [5, 2],
  beylikduzu: [0, 3], avcilar: [1, 3], esenler: [2, 3], bagcilar: [3, 3], bahcelievler: [4, 3], zeytinburnu: [5, 3], fatih: [6, 3],
  kucukcekmece: [2, 4], gungoren: [3, 4], bakirkoy: [4, 4],
};

const S = 58;
const SQ3 = Math.sqrt(3);
function hexPath(q, r) {
  const cx = S * 1.5 * q + 86;
  const cy = S * SQ3 * (r + q / 2) + 44;
  const pts = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i;
    pts.push(`${(cx + S * Math.cos(a)).toFixed(1)},${(cy + S * Math.sin(a)).toFixed(1)}`);
  }
  return { d: `M${pts.join(' L')} Z`, cx, cy };
}

export default function IlceHaritasi() {
  return (
    <figure className="ilce-harita mx-auto max-w-3xl" aria-label="İstanbul Avrupa Yakası hizmet bölgesi haritası">
      <svg viewBox="0 0 720 720" className="w-full" role="img" aria-hidden="true">
        {/* denizler */}
        <rect x="0" y="0" width="720" height="30" fill="#e0f2fe" />
        <text x="360" y="20" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0284c7">KARADENİZ</text>
        <rect x="640" y="30" width="80" height="640" fill="#e0f2fe" />
        <text x="680" y="360" transform="rotate(-90 680 360)" textAnchor="middle" fontSize="10" fontWeight="700" fill="#0284c7">İSTANBUL BOĞAZI</text>
        <polygon points="0,660 720,660 720,720 0,720" fill="#e0f2fe" />
        <text x="320" y="696" fontSize="10" fontWeight="700" fill="#0284c7">MARMARA DENİZİ</text>

        {/* ilçe altıgenleri */}
        {ilceler.map((i) => {
          const pos = positions[i.slug] || [0, 0];
          const { d, cx, cy } = hexPath(pos[0], pos[1]);
          const hover = i.accent !== 'orange' ? { ['--accent' ]: undefined } : {};
          void hover;
          return (
            <a key={i.slug} href={`/${i.slug}`} aria-label={`${i.ad} tadilat hizmetleri`}>
              <path
                className="ilce"
                d={d}
                style={{
                  // otomatik keskinleştirme: her ilçe farklı accent kullanabilir
                  filter: `saturate(${0.9 + (ilceler.indexOf(i) % 5) * 0.08})`,
                }}
              />
              <text className="ilce-label" x={cx} y={cy + 5}>
                {i.ad}
              </text>
            </a>
          );
        })}
      </svg>
      <figcaption className="mt-4 text-center text-sm text-ink-500">
        Tıklayarak ilçeye özel tadilat ve tesisat hizmetlerine ulaşın · 25 ilçe · Avrupa Yakası
      </figcaption>
    </figure>
  );
}