import Icon from './Icons';
import { firma, degerlendirme } from '../lib/site-data';

function PuanRozeti({ dark = false }) {
  const dolu = Math.round(degerlendirme.puan);
  return (
    <a
      href="#degerlendirme"
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold ${
        dark
          ? 'bg-brand-600 text-white'
          : 'border border-ink-100 bg-white text-ink-800 shadow-card'
      }`}
      aria-label={`Google değerlendirmesi: ${degerlendirme.puan} üzerinden 5, ${degerlendirme.yorumSayisi} yorum`}
    >
      <span className="flex gap-0.5 text-amber-400" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((s) => (
          <Icon key={s} name="star" size={13} className={s <= dolu ? '' : 'opacity-30'} />
        ))}
      </span>
      <span>
        {String(degerlendirme.puan).replace('.', ',')} · {degerlendirme.yorumSayisi} Google yorumu
      </span>
    </a>
  );
}

export default function HeroSection({
  image,
  h1,
  sub,
  primary = { label: 'Ücretsiz Keşif İste', href: '/iletisim', icon: 'calendarCheck' },
  secondary = { label: 'Hizmetlerimizi İncele', href: '/hizmetler', icon: 'layers' },
  trust = true,
  children,
  height = 'tall',
  layout = 'parallax',
}) {
  const tel = `tel:${firma.telefonTel}`;

  const ctaButtons = (
    <div className="mt-8 flex flex-col gap-4 sm:flex-row">
      <a href={primary.href} className="btn-cta-pulse w-full justify-center sm:w-auto">
        <Icon name={primary.icon} size={18} />
        {primary.label}
      </a>
      <a
        href={secondary.href}
        className="btn-outline w-full justify-center !border-white !text-white sm:w-auto hover:!bg-white/10"
      >
        <Icon name={secondary.icon} size={18} />
        {secondary.label}
      </a>
      <a
        href={tel}
        className="hidden items-center gap-2 px-2 text-sm font-bold text-slate-300 hover:text-white lg:inline-flex"
      >
        <Icon name="phone" size={16} /> {firma.telefon}
      </a>
    </div>
  );

  const trustRow = trust && (
    <div className="mt-10">
      <div className="flex max-w-2xl flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border border-white/15 bg-white/10 px-6 py-5 backdrop-blur-sm">
        {[
          { icon: 'clock', t: `${firma.calismaSaatleri} Hizmet` },
          { icon: 'shield', t: 'Garantili İşçilik' },
          { icon: 'wallet', t: 'Ücretsiz Keşif' },
          { icon: 'award', t: `${firma.deneyimYil} Yıl Deneyim` },
          { icon: 'users', t: `${firma.mutluMusteri.toLocaleString('tr-TR')}+ Müşteri` },
        ].map((b) => (
          <span key={b.t} className="flex items-center gap-2 text-sm font-semibold text-white">
            <Icon name={b.icon} size={18} className="text-brand-400" />
            {b.t}
          </span>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-400">
        <span>✓ {firma.tamamlananProje.toLocaleString('tr-TR')}+ tamamlanan proje</span>
        <span>✓ {firma.mutluMusteri.toLocaleString('tr-TR')}+ mutlu müşteri</span>
        <span>✓ 25 ilçede hizmet</span>
        <PuanRozeti />
      </div>
    </div>
  );

  /* ---- SPLIT (A1) : solda metin, sağda görsel panel ---- */
  if (layout === 'split') {
    return (
      <section className="relative overflow-hidden bg-ink-900 pb-16 pt-28 sm:pt-32" id="degerlendirme">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(2,6,23,1) 0%, rgba(2,6,23,0.96) 45%, rgba(15,23,42,0.92) 100%)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              'radial-gradient(circle at 80% 20%, rgba(249,115,22,0.4) 0, transparent 42%), radial-gradient(circle at 15% 85%, rgba(37,211,102,0.18) 0, transparent 45%)',
          }}
        />
        <div className="container-x relative">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              {children}
              <h1 className="text-4xl leading-[1.05] text-white sm:text-5xl lg:text-6xl">{h1}</h1>
              {sub && (
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-200 sm:text-xl">{sub}</p>
              )}
              {ctaButtons}
              {trustRow}
            </div>
            <div className="relative mx-auto w-full max-w-xl">
              <div className="overflow-hidden rounded-3xl border border-white/15 shadow-2xl">
                <img
                  src={image}
                  alt={h1}
                  width={1024}
                  height={768}
                  fetchPriority="high"
                  className="aspect-[4/3] h-full w-full object-cover"
                />
              </div>
              {/* Yüzen puan kartı */}
              <div className="absolute -bottom-5 -left-4 rounded-2xl border border-white/20 bg-white p-4 shadow-card sm:-left-8">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-white">
                    <Icon name="star" size={20} className="text-amber-300" />
                  </span>
                  <div>
                    <div className="font-display text-2xl font-bold leading-none text-ink-900">
                      {String(degerlendirme.puan).replace('.', ',')}
                      <span className="text-sm text-ink-400">/5</span>
                    </div>
                    <div className="mt-1 text-[11px] font-semibold text-ink-500">
                      {degerlendirme.yorumSayisi} Google yorumu
                    </div>
                  </div>
                </div>
              </div>
              {/* Yüzen hizmet rozeti */}
              <div className="absolute -top-4 right-4 flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-xs font-bold text-white shadow-lg">
                <Icon name="checkCircle" size={14} /> 54 Hizmet · 25 İlçe
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ---- VARSAYILAN: paralaks arkaplan hero ---- */
  return (
    <section
      className={`hero-parallax relative flex items-end overflow-hidden ${
        height === 'tall' ? 'min-h-[92vh] pb-24 pt-32 sm:min-h-[88vh]' : 'min-h-[62vh] pb-16 pt-28'
      }`}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(2,6,23,0.94) 0%, rgba(2,6,23,0.78) 35%, rgba(2,6,23,0.50) 70%, rgba(2,6,23,0.35) 100%)',
        }}
      />
      {/* Dekoratif parıltı */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 75% 25%, rgba(249,115,22,0.35) 0, transparent 40%), radial-gradient(circle at 25% 75%, rgba(249,115,22,0.15) 0, transparent 50%)',
        }}
      />
      <div className="container-x relative">
        <div className="max-w-3xl">
          {children}
          <h1 className="text-4xl leading-[1.05] text-white sm:text-5xl lg:text-6xl">{h1}</h1>
          {sub && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-200 sm:text-xl">{sub}</p>
          )}
          {ctaButtons}
          {trustRow}
        </div>
      </div>
    </section>
  );
}