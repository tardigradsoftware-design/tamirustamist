import Icon from './Icons';
import { firma } from '../lib/site-data';

export default function HeroSection({
  image,
  h1,
  sub,
  primary = { label: 'Ücretsiz Keşif İste', href: '/iletisim', icon: 'calendarCheck' },
  secondary = { label: 'Hizmetlerimizi İncele', href: '/hizmetler', icon: 'layers' },
  trust = true,
  children,
  height = 'tall',
}) {
  const tel = `tel:${firma.telefonTel}`;
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
      <div aria-hidden="true" className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(circle at 75% 25%, rgba(249,115,22,0.35) 0, transparent 40%), radial-gradient(circle at 25% 75%, rgba(249,115,22,0.15) 0, transparent 50%)',
      }} />
      <div className="container-x relative">
        <div className="max-w-3xl">
          {children}
          <h1 className="text-4xl leading-[1.05] text-white sm:text-5xl lg:text-6xl">{h1}</h1>
          {sub && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-200 sm:text-xl">{sub}</p>}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a href={primary.href} className="btn-cta-pulse w-full justify-center sm:w-auto">
              <Icon name={primary.icon} size={18} />
              {primary.label}
            </a>
            <a href={secondary.href} className="btn-outline w-full justify-center !border-white !text-white sm:w-auto hover:!bg-white/10">
              <Icon name={secondary.icon} size={18} />
              {secondary.label}
            </a>
            <a href={tel} className="hidden items-center gap-2 px-2 text-sm font-bold text-slate-300 hover:text-white lg:inline-flex">
              <Icon name="phone" size={16} /> {firma.telefon}
            </a>
          </div>

          {trust && (
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
              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-slate-400">
                <span>✓ {firma.tamamlananProje.toLocaleString('tr-TR')}+ tamamlanan proje</span>
                <span>✓ {firma.mutluMusteri.toLocaleString('tr-TR')}+ mutlu müşteri</span>
                <span>✓ 25 ilçede hizmet</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}