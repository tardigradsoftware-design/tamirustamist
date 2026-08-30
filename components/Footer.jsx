import Link from 'next/link';
import Icon from './Icons';
import Logo from './Logo';
import { firma, sosyalMedya, kategoriler, ilceler, siteUrl } from '../lib/site-data';

export default function Footer() {
  const yil = new Date().getFullYear();
  const sosyal = [
    { href: sosyalMedya.instagram, icon: 'instagram', label: 'Instagram' },
    { href: sosyalMedya.facebook, icon: 'facebook', label: 'Facebook' },
    { href: sosyalMedya.youtube, icon: 'youtube', label: 'YouTube' },
  ].filter((s) => s.href);

  return (
    <footer className="bg-ink-900 pt-16 text-slate-300">
      <div className="container-x">
        <div className="grid gap-12 pb-12 lg:grid-cols-12">
          {/* Marka */}
          <div className="lg:col-span-4">
            <div className="[&_span]:!text-white">
              <Logo idSuffix="f" />
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              {firma.slogan}. {firma.kurulusYili}'den bu yana {firma.tamamlananProje.toLocaleString('tr-TR')}+
              projede yazılı işçilik garantisi ve 7/24 acil servis hizmeti veriyoruz.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Icon name="phone" size={17} className="mt-0.5 text-brand-500" />
                <a href={`tel:${firma.telefonTel}`} className="font-semibold text-white hover:text-brand-400">
                  {firma.telefon}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="mail" size={17} className="mt-0.5 text-brand-500" />
                <a href={`mailto:${firma.email}`} className="hover:text-brand-400">
                  {firma.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="mapPin" size={17} className="mt-0.5 text-brand-500" />
                <span>{firma.adres}</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="clock" size={17} className="mt-0.5 text-brand-500" />
                <span>{firma.calismaSaatleri} Acil Servis</span>
              </li>
            </ul>
            {sosyal.length > 0 && (
              <div className="mt-6 flex gap-2.5">
                {sosyal.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-brand-600"
                  >
                    <Icon name={s.icon} size={18} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Hizmetler */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-white">
              Hizmetlerimiz
            </h3>
            <ul className="mt-5 space-y-2.5 text-sm">
              {kategoriler.map((k) => (
                <li key={k.slug}>
                  <Link href={`/hizmetler/${k.hizmetler[0].slug}`} className="flex items-center gap-2 hover:text-brand-400">
                    <Icon name="chevronRight" size={13} className="text-brand-500" />
                    {k.baslik}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/hizmetler" className="flex items-center gap-2 font-bold text-brand-400 hover:text-brand-300">
                  <Icon name="chevronRight" size={13} />
                  Tüm Hizmetler (54)
                </Link>
              </li>
            </ul>
          </div>

          {/* Hizmet bölgeleri */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-white">
              Hizmet Bölgeleri
            </h3>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
              {ilceler.map((i) => (
                <li key={i.slug}>
                  <Link href={`/${i.slug}`} className="hover:text-brand-400">
                    {i.ad}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hızlı bağlantılar */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-sm font-bold uppercase tracking-widest text-white">
              Kurumsal
            </h3>
            <ul className="mt-5 space-y-2.5 text-sm">
              <li><Link href="/hakkimizda" className="hover:text-brand-400">Hakkımızda</Link></li>
              <li><Link href="/hizmetler" className="hover:text-brand-400">Hizmetler</Link></li>
              <li><Link href="/blog" className="hover:text-brand-400">Blog</Link></li>
              <li><Link href="/iletisim" className="hover:text-brand-400">İletişim</Link></li>
              <li><Link href="/iletisim" className="hover:text-brand-400">Ücretsiz Keşif</Link></li>
            </ul>
            <h3 className="mt-8 font-display text-sm font-bold uppercase tracking-widest text-white">
              Güvence
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Icon name="checkCircle" size={15} className="text-brand-500" /> Yazılı işçilik garantisi
              </li>
              <li className="flex items-center gap-2">
                <Icon name="checkCircle" size={15} className="text-brand-500" /> Ücretsiz keşif
              </li>
              <li className="flex items-center gap-2">
                <Icon name="checkCircle" size={15} className="text-brand-500" /> Sabit fiyat sözleşmesi
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 text-xs text-slate-400">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <p>
              © {yil} {firma.ad} — Vergi No: {firma.vergiNo} · Tüm hakları saklıdır.
            </p>
            <p className="flex items-center gap-1.5">
              <Icon name="shield" size={13} className="text-brand-500" />
              KVKK kapsamında kişisel verileriniz güvende ·{' '}
              <a href={`${siteUrl}/sitemap.xml`} className="underline hover:text-brand-400">
                Sitemap
              </a>{' '}
              ·{' '}
              <a href={`${siteUrl}/robots.txt`} className="underline hover:text-brand-400">
                robots.txt
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}