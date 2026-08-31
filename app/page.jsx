import Link from 'next/link';
import Icon from '../components/Icons';
import HeroSection from '../components/HeroSection';
import SectionHeading from '../components/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import CategoryCard from '../components/CategoryCard';
import CTABanner from '../components/CTABanner';
import CounterStats from '../components/CounterStats';
import FAQAccordion from '../components/FAQAccordion';
import Referanslar from '../components/Referanslar';
import IlceHaritasi from '../components/IlceHaritasi';
import Reveal from '../components/Reveal';
import SchemaMarkup from '../components/SchemaMarkup';
import { kategoriler, tümHizmetler, faqGenel, firma, siteUrl, ilceler } from '../lib/site-data';

const surecAdimlari = [
  {
    icon: 'search',
    t: 'Ücretsiz Keşif',
    d: `${firma.telefon} numarasından bizi arayın, aynı gün içinde evinize gelip ölçü alır, ihtiyacınızı birlikte netleştiririz.`,
  },
  {
    icon: 'document',
    t: 'Sabit Fiyat Sözleşmesi',
    d: 'Aynı gün içinde kapsam, malzeme, süre ve fiyatı yazılı sözleşmeyle onaylarız. Söylediğimiz fiyatta asla sürpriz yok.',
  },
  {
    icon: 'hammer',
    t: 'Usta Kadro ile Uygulama',
    d: 'Ustalık belgeli, sigortalı ekibimiz planlanan günde işe başlar. Günlük iş raporu ve fotoğraf paylaşımıyla bilgilendirilirsiniz.',
  },
  {
    icon: 'shield',
    t: 'Kontrol, Temizlik ve Garanti',
    d: 'Biten iş sizinle birlikte kontrol edilir, alan temiz teslim edilir ve yazılı işçilik garanti belgesi verilir.',
  },
];

const nedenBiz = [
  { icon: 'shield', t: 'Yazılı İşçilik Garantisi', d: 'Her projede yazılı garanti belgesi. Aynı sorun tekrarlarsa ücretsiz müdahale ediyoruz.' },
  { icon: 'wallet', t: 'Sabit Fiyat, Sürpriz Yok', d: 'Keşifte belirlenen fiyat sözleşme过度inde artmaz; fiyatı biz belirleriz, siz onaylarsınız.' },
  { icon: 'clock', t: '7/24 Acil Servis', d: 'Su baskını, su kaçağı ve elektrik arızasında gece-gündüz aynı hatta ulaşabilirsiniz.' },
  { icon: 'users', t: 'Kendi Kadromuz', d: 'Ustalık belgeli, sigortalı, kendi ekibimizle çalışırız; taşeron kullanmayız.' },
  { icon: 'compass', t: '25 İlçe, Tek Ekip Standartı', d: 'Avrupa Yakası\'nın tamamında aynı iş kalitesi, aynı garanti, aynı fiyat politikası.' },
  { icon: 'award', t: `${firma.tamamlananProje.toLocaleString('tr-TR')}+ Tamamlanan Proje`, d: `14 yılı aşkın sürede ${firma.mutluMusteri.toLocaleString('tr-TR')}+ müşterimizi memnun ettik.` },
];

const faqPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    ...faqGenel.map((f) => ({
      '@type': 'Question',
      name: f.s,
      acceptedAnswer: { '@type': 'Answer', text: f.c },
    })),
    // Ek anahtar kelimeli SSS
    {
      '@type': 'Question',
      name: 'İstanbul\'da banyo tadilatı ne kadar tutar 2025?',
      acceptedAnswer: { '@type': 'Answer', text: 'Banyo tadilatı fiyatları banyo büyüklüğü, karo seçimi, tesisat kapsamı ve armatür sınıfına göre değişir. 2025 yılı itibarıyla İstanbul\'da komple banyo tadilatı keşif sonrası sabit fiyat teklifiyle sunulmaktadır. Keşif ücretsizdir.' },
    },
    {
      '@type': 'Question',
      name: 'Su kaçağı tespiti kırmadan nasıl yapılır?',
      acceptedAnswer: { '@type': 'Answer', text: 'Termal kamera, akustik dinleme ve nem ölçüm cihazlarıyla duvar ve zemin kırılmadan su kaçağının yeri tespit edilir. Tamirat yalnızca kaçağın bulunduğu noktada yapılır.' },
    },
    {
      '@type': 'Question',
      name: 'İstanbul Avrupa Yakası\'nda hangi ilçelere hizmet veriyorsunuz?',
      acceptedAnswer: { '@type': 'Answer', text: 'Arnavutköy, Avcılar, Bağcılar, Bahçelievler, Bakırköy, Başakşehir, Bayrampaşa, Beşiktaş, Beylikdüzü, Beyoğlu, Büyükçekmece, Çatalca, Esenler, Esenyurt, Eyüpsultan, Fatih, Gaziosmanpaşa, Güngören, Kâğıthane, Küçükçekmece, Sarıyer, Silivri, Sultangazi, Şişli ve Zeytinburnu olmak üzere 25 ilçede hizmet veriyoruz.' },
    },
  ],
};

export default function HomePage() {
  const onekler = tümHizmetler.slice(0, 12);
  return (
    <>
      <SchemaMarkup data={faqPageSchema} />

      {/* 1 — HERO */}
      <HeroSection
        layout="split"
        image="/images/hero.webp"
        h1={`${firma.deneyimYil} Yıllık Deneyim, 25 İlçe, 54 Hizmet — İstanbul Tadilat ve Tesisat Ustası`}
        sub={`${firma.ad} olarak İstanbul Avrupa Yakası\'nda banyo tadilatı, mutfak yenileme, su kaçağı tespiti, kombi bakımı, elektrik tesisatı, boya badana, parke döşeme ve tıkanıklık açma hizmetlerini tek çatı altında sunuyoruz. Ücretsiz keşif ve sabit fiyat sözleşmesi için hemen arayın.`}
      />

      {/* 2 — İLÇE HARİTASI */}
      <section className="section bg-mesh" aria-labelledby="harita-baslik">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Hizmet Bölgesi"
              title="İstanbul Avrupa Yakası'nda 25 İlçe Tadilat Ustası"
              sub="Arnavutköy'den Zeytinburnu'na, Beylikdüzü'nden Sarıyer'e kadar 25 ilçede tadilat, yapı ve tesisat hizmetlerini kendi ekibimizle veriyoruz."
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-10">
              <IlceHaritasi />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3 — HİZMET KATEGORİLERİ */}
      <section className="section" aria-labelledby="kategoriler">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="54 Uzman Hizmet, 7 Kategori"
              title="Banyo Tadilatı, Mutfak Yenileme, Tesisat ve Daha Fazlası"
              sub="Komple banyo tadilatından kombi montajına, su kaçağı tespitinden elektrik arızasına kadar 54 farklı hizmeti tek firmadan alabilirsiniz."
            />
          </Reveal>
          <div className="mt-8 grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {kategoriler.map((k, i) => (
              <Reveal key={k.slug} delay={i * 50}>
                <CategoryCard kategori={k} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — NEDEN BİZ + SAYAÇLAR */}
      <section className="section bg-ink-900" aria-labelledby="neden-biz">
        <div className="container-x">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div>
                <span className="eyebrow !text-orange-300">
                  <Icon name="sparkle" size={14} /> Neden Bizi Tercih Etmelisiniz?
                </span>
                <h2 id="neden-biz" className="mt-3 text-3xl text-white sm:text-4xl">
                  İstanbul Tadilat Firması Arıyorsanız, Doğru Yerdesiniz
                </h2>
                <p className="mt-4 leading-relaxed text-slate-300">
                  {firma.kurulusYili}'den beri İstanbul Avrupa Yakası'nda yapım, tadilat
                  ve tesisat hizmeti veriyoruz. {firma.tamamlananProje.toLocaleString('tr-TR')}+ projeyi
                  zamanında ve bütçede tamamladık. Müşterilerimizin %96'sı bizi öneriyor.
                </p>
                <ul className="mt-6 space-y-4">
                  {nedenBiz.map((x) => (
                    <li key={x.t} className="flex gap-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white shadow-md shadow-brand-600/20">
                        <Icon name={x.icon} size={20} />
                      </span>
                      <div>
                        <div className="font-bold text-white">{x.t}</div>
                        <div className="text-sm leading-relaxed text-slate-300">{x.d}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div
                className="relative overflow-hidden rounded-3xl p-10 text-white sm:p-12"
                style={{ background: 'linear-gradient(135deg,#0f172a 0%,#1e293b 50%,#7c2d12 120%)' }}
              >
                <div aria-hidden="true" className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(249,115,22,.6) 0, transparent 40%), radial-gradient(circle at 80% 70%, rgba(249,115,22,.4) 0, transparent 45%)' }} />
                <div className="relative">
                  <CounterStats
                    items={[
                      { value: firma.tamamlananProje, suffix: '+', label: 'Tamamlanan Proje' },
                      { value: firma.deneyimYil, suffix: ' yıl', label: 'Sektör Deneyimi' },
                      { value: firma.mutluMusteri, suffix: '+', label: 'Mutlu Müşteri' },
                      { value: 25, suffix: ' ilçe', label: 'Hizmet Bölgesi' },
                    ]}
                  />
                  <blockquote className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm leading-relaxed text-slate-300 backdrop-blur">
                    <Icon name="quoteFill" size={20} className="mb-1 inline-block text-brand-400" />
                    &ldquo;Banyo tadilatı için 3 firmadan fiyat aldım. Tamir Ustam hem en şeffaf teklifi verdi
                    hem de 12 günde anahtar teslim bitirdi. Kesinlikle tavsiye ederim.&rdquo;
                    <footer className="mt-2 text-xs font-semibold text-slate-400">— Ahmet K., Başakşehir</footer>
                  </blockquote>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 5 — ÖNE ÇIKAN HİZMETLER */}
      <section className="section bg-mesh" aria-labelledby="one-cikan">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="En Çok Tercih Edilen Hizmetler"
              title="İstanbul'da En Popüler Tadilat ve Tesisat İşleri"
              sub="Banyo tadilatı, su kaçağı tespiti, kombi bakımı, boya badana ve parke döşeme İstanbul Avrupa Yakası'nda en çok talep edilen işler."
            />
          </Reveal>
          <div className="mt-8 grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {onekler.map((h, i) => (
              <Reveal key={h.slug} delay={(i % 4) * 60}>
                <ServiceCard hizmet={h} />
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/hizmetler" className="btn-cta">
              Tüm 54 Hizmeti Görüntüle <Icon name="arrowRight" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 6 — NASIL ÇALIŞIYORUZ */}
      <section className="section" aria-labelledby="surec">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="4 Adımlık Garantili Süreç"
              title="Tadilat Nasıl Yapılır? Adım Adım Açıklıyoruz"
              sub="İlk aramadan teslime kadar 4 aşamalı net süreç: hiçbir sürpriz olmadan, şeffaf ilerleriz."
            />
          </Reveal>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {surecAdimlari.map((s, i) => (
              <Reveal key={s.t} delay={i * 90}>
                <li className="relative h-full rounded-2xl border-2 border-ink-100 bg-white p-7 transition-all duration-300 hover:border-brand-200 hover:shadow-lg">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white shadow-md shadow-brand-600/30">
                      {i + 1}
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                      <Icon name={s.icon} size={20} />
                    </span>
                  </div>
                  <h3 className="mt-4 text-lg">{s.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{s.d}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 7 — REFERANSLAR */}
      <section className="section bg-mesh" aria-labelledby="referanslar">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Müşterilerimizin Deneyimleri"
              title="İstanbul'da Tadilat Yapan Firmalar Arasında En Yüksek Puan Bizde"
              sub="Başakşehir'den Beşiktaş'a, Esenyurt'tan Sarıyer'e kadar gerçek müşteri yorumları."
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-12">
              <Referanslar limit={9} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 8 — SSS */}
      <section className="section" aria-labelledby="sss">
        <div className="container-x max-w-4xl">
          <Reveal>
            <SectionHeading
              eyebrow="Sık Sorulan Sorular"
              title="İstanbul Tadilat Fiyatları, Süre ve Garanti Hakkında Bilmeniz Gerekenler"
              sub="Keşif, fiyat, garanti, süre ve hizmet bölgesi hakkında en çok sorulan sorular."
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-10">
              <FAQAccordion items={faqGenel} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 9 — TÜM İLÇELER LİSTESİ */}
      <section className="section bg-ink-50/50" aria-labelledby="tum-ilceler">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="İlçe Bazlı Hizmetler"
              title="İstanbul Avrupa Yakası İlçe Tadilat Hizmetleri"
              sub="Hangi ilçede olursanız olun, tadilat ve tesisat için bize ulaşın."
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-10 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {ilceler.map((i) => (
                <Link
                  key={i.slug}
                  href={`/${i.slug}`}
                  className="card group flex items-center gap-3 p-4"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors group-hover:bg-brand-600 group-hover:text-white" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                    <Icon name="mapPin" size={15} />
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-bold text-ink-800 group-hover:text-brand-700">{i.ad}</div>
                    <div className="truncate text-xs text-ink-400">Tadilat ve Tesisat</div>
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 10 — CTA */}
      <CTABanner />
    </>
  );
}