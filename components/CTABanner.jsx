import Icon from './Icons';
import { firma } from '../lib/site-data';

export default function CTABanner({
  title = 'Ücretsiz Keşif için Hemen Arayın',
  sub = `${firma.deneyimYil} yıllık deneyim, yazılı işçilik garantisi ve 7/24 acil servis ile İstanbul Avrupa Yakası'nın her ilçesindeyiz.`,
  compact = false,
}) {
  const tel = `tel:${firma.telefonTel}`;
  const wa = `https://wa.me/${firma.whatsapp}?text=${encodeURIComponent(
    `Merhaba, ücretsiz keşif talebinde bulunmak istiyorum.`
  )}`;

  return (
    <section className={compact ? 'py-12' : 'section'} aria-label="İletişim çağrısı">
      <div className="container-x">
        <div
          className="relative overflow-hidden rounded-3xl px-6 py-14 text-center text-white sm:px-12 lg:py-20"
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 45%, #7c2d12 120%)',
          }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 30%, rgba(249,115,22,.8) 0, transparent 40%), radial-gradient(circle at 80% 70%, rgba(249,115,22,.5) 0, transparent 45%)',
            }}
          />
          <div aria-hidden="true" className="absolute top-0 left-1/2 h-px w-3/5 -translate-x-1/2 bg-gradient-to-r from-transparent via-orange-400/50 to-transparent" />
          <div className="relative mx-auto max-w-3xl">
            <span className="chip !bg-white/10 !text-orange-300">
              <Icon name="calendarCheck" size={14} /> Ücretsiz Keşif · Aynı Gün Teklif
            </span>
            <h2 className="mt-5 text-3xl text-white sm:text-4xl lg:text-5xl">{title}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 sm:text-lg">{sub}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href={tel} className="btn-cta-pulse w-full sm:w-auto" style={{ background: '#f97316' }}>
                <Icon name="phone" size={18} /> {firma.telefon}
              </a>
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa w-full sm:w-auto"
              >
                <Icon name="whatsapp" size={18} /> WhatsApp'tan Yazın
              </a>
            </div>
            <p className="mt-5 text-xs font-medium uppercase tracking-widest text-slate-400">
              7/24 hizmet · {firma.tamamlananProje.toLocaleString('tr-TR')} tamamlanan proje
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}