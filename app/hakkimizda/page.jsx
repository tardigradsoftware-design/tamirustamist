import React from 'react';
import Icon from '../../components/Icons';
import HeroSection from '../../components/HeroSection';
import SectionHeading from '../../components/SectionHeading';
import CounterStats from '../../components/CounterStats';
import CTABanner from '../../components/CTABanner';
import Reveal from '../../components/Reveal';
import SchemaMarkup from '../../components/SchemaMarkup';
import { firma, siteUrl, pageTitle, metaDescription } from '../../lib/site-data';

export const metadata = {
  title: pageTitle('Hakkımızda — 14 Yıllık Deneyim, 25 İlçede Güven'),
  description: metaDescription(
    `2011'den bu yana İstanbul Avrupa Yakası'nda tadilat, yapı ve tesisat. Kendi ustalarımız, yazılı garanti ve sabit fiyatla ${firma.tamamlananProje}+ tamamlanmış proje.`
  ),
  alternates: {
    canonical: `${siteUrl}/hakkimizda/`,
    languages: { 'tr-TR': `${siteUrl}/hakkimizda/`, 'x-default': `${siteUrl}/hakkimizda/` },
  },
};

const degerler = [
  { icon: 'handshake', t: 'Şeffaflık', d: 'Keşifte ne söylersek, sözleşmede onu yazarız. Fiyat sürprizi yaşatmıyoruz.' },
  { icon: 'shield', t: 'Garanti', d: 'Her iş, yazılı işçilik garantisi ve iş sonu kontrol ile teslim edilir.' },
  { icon: 'users', t: 'Kendi Ekibimiz', d: 'Ustalık belgeli, sigortalı kadromuzla çalışırız; taşeron zinciri yoktur.' },
  { icon: 'clock', t: 'Zamanında Teslim', d: 'Sözleşmedeki süreye sadık kalır, teslim gecikmelerini önceden bildiririz.' },
  { icon: 'compass', t: 'Bölge Hakimiyeti', d: '25 ilçenin yapı dokusunu, kurallarını ve lojistiğini yakından biliriz.' },
  { icon: 'sparkle', t: 'İnce İşçilik', d: 'Detaylara özen gösterir; işin estetiği kadar dayanıklılığını önemseriz.' },
];

export default function HakkimizdaPage() {
  return (
    <>
      <HeroSection
        height="short"
        image="/images/ekip-1.webp"
        h1={`${firma.deneyimYil} Yıldır İstanbul Avrupa Yakası'nın Ustası`}
        sub="2011'de tek ustayla başlayan yolculuğumuz; bugün 25 ilçede, kendi ekibimiz ve 1840'ı aşkın tamamlanmış projeyle devam ediyor."
        trust={false}
      >
        <span className="chip">Kurumsal</span>
      </HeroSection>

      <section className="section">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <div>
                <span className="eyebrow">Biz Kimiz?</span>
                <h2 className="mt-3 text-3xl sm:text-4xl">
                  Tadilatı Bölük Pörçük Yapmak Yerine, Uçtan Uca Tek Ekip
                </h2>
                <p className="mt-5 leading-relaxed text-ink-600">
                  {firma.ad}, {firma.kurulusYili} yılında İstanbul Bakırköy'de sıhhi tesisat
                  ustası olarak kuruldu. Banyo ve mutfak tadilatlarıyla büyüyen işimiz;
                  zamanla iç mekan dekorasyonu, ısıtma sistemleri ve elektrik tesisatına
                  uzandı. Bugün 54 farklı hizmeti, kendi kadromuzla veriyoruz.
                </p>
                <p className="mt-4 leading-relaxed text-ink-600">
                  İş modelimiz basit: müşteriyle birlikte ihtiyacı netleştirir, sabit fiyat
                  sözleşmesi imzalar, işi sözlü değil <strong>yazılı garantiyle</strong>{' '}
                  teslim ederiz. Bu yüzden müşterilerimizin önemli bir kısmı bize tekrar
                  dönüyor veya komşusunu yönlendiriyor.
                </p>
                <div className="mt-6 rounded-2xl border border-ink-100 bg-ink-50/60 p-6">
                  <p className="text-sm leading-relaxed text-ink-600">
                    <Icon name="quoteFill" size={16} className="mr-1 inline-block text-brand-500" />
                    “İyi bir tadilat; malzeme kalitesi, doğru planlama ve zamanında işin
                    başında olan bir ekibin ürünüdür. Gerisini biz halledeceğiz.”
                  </p>
                  <p className="mt-3 text-sm font-bold text-ink-900">— Kurucu Usta &amp; Genel Müdür</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="grid grid-cols-2 gap-4">
                <img src="/images/insaat-1.webp" alt="Tadilat ekibi duvar işleme yaparken" loading="lazy" width={420} height={315} className="aspect-[4/3] w-full rounded-3xl object-cover shadow-card" />
                <img src="/images/banyo-1.webp" alt="Tamamlanmış modern banyo tadilatı" loading="lazy" width={420} height={315} className="mt-8 aspect-[4/3] w-full rounded-3xl object-cover shadow-card" />
                <img src="/images/mutfak-1.webp" alt="Yenilenmiş mutfak detayı" loading="lazy" width={420} height={315} className="aspect-[4/3] w-full rounded-3xl object-cover shadow-card" />
                <img src="/images/tesisat-1.webp" alt="Sıhhi tesisat uygulaması" loading="lazy" width={420} height={315} className="mt-8 aspect-[4/3] w-full rounded-3xl object-cover shadow-card" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section bg-ink-900 !py-16">
        <div className="container-x">
          <CounterStats
            items={[
              { value: firma.tamamlananProje, suffix: '+', label: 'Tamamlanan Proje' },
              { value: firma.deneyimYil, suffix: ' yıl', label: 'Sektör Deneyimi' },
              { value: firma.mutluMusteri, suffix: '+', label: 'Mutlu Müşteri' },
              { value: 25, suffix: ' ilçe', label: 'Hizmet Bölgesi' },
            ]}
          />
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Değerlerimiz"
              title="Bizi Biz Yapan 6 İlke"
              sub="Her işte aynı standartta davranmamızı sağlayan kurallarımız."
            />
          </Reveal>
          <div className="mt-10 grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {degerler.map((d, i) => (
              <Reveal key={d.t} delay={(i % 3) * 60}>
                <div className="card h-full p-4 sm:p-5">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 hover:scale-105"
                      style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}
                    >
                      <Icon name={d.icon} size={18} />
                    </span>
                    <h3 className="text-base sm:text-lg">{d.t}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-500">{d.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* C3 — Ekibimiz, usta kadro ve sertifikalar */}
      <section className="section bg-ink-50/50">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Ekibimiz ve Sertifikalar"
              title="Ustalık Belgesi, Sigortası ve Sertifikasıyla Kadromuz"
              sub="Kendi kadromuzdaki ustalar; ustalık belgeli, sigortalı ve üretici sertifikalı eğitimlerden geçer. Sahanızda çalışacak ekibi önceden tanıyın."
            />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Reveal delay={0}>
              <figure className="card overflow-hidden">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src="/images/ekip-2.webp"
                    alt="Tamir Ustam İstanbul tadilat ekibi sahada"
                    loading="lazy"
                    width={640}
                    height={480}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <figcaption className="p-5">
                  <h3 className="text-lg">Saha Ekibimiz</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">
                    Her şantiyede en az bir ustabaşı; tesviye, karo, tesisat ve elektrik işlerinde branş ustaları görev yapar.
                  </p>
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={80}>
              <figure className="card mt-6 overflow-hidden md:mt-0">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src="/images/insaat-1.webp"
                    alt="Usta kadro: tesisat ustası iş başında"
                    loading="lazy"
                    width={640}
                    height={480}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <figcaption className="p-5">
                  <h3 className="text-lg">Branş Ustaları</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">
                    MEB onaylı ustalık belgesine sahip, düzenli saha eğitimi alan sigortalı kadro; taşeron zinciri yoktur.
                  </p>
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={160}>
              <figure className="card mt-6 overflow-hidden md:mt-0">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src="/images/sertifika-1.webp"
                    alt="Firma sertifika ve üretici yetki belgeleri"
                    loading="lazy"
                    width={640}
                    height={480}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <figcaption className="p-5">
                  <h3 className="text-lg">Sertifikalar ve Yetkiler</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">
                    Kombi ve vitrifiye üreticilerinin yetkili servis sertifikaları; sigorta, iş güvenliği ve KVKK uyum belgeleri dosyamızda hazırdır.
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <p className="mx-auto mt-10 max-w-2xl rounded-2xl border border-ink-100 bg-white p-5 text-center text-sm leading-relaxed text-ink-600">
              <Icon name="shield" size={16} className="mr-1 inline-block text-brand-600" />
              Talebiniz halinde ekibin usta belgeleri, sigorta poliçesi ve üretici yetki sertifikaları keşifte veya
              sözleşme öncesinde gösterilir; kopyaları sözleşme dosyanıza eklenir.
            </p>
          </Reveal>
        </div>
      </section>

      <CTABanner />
      <SchemaMarkup
        data={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: `${firma.ad} Hakkında`,
          url: `${siteUrl}/hakkimizda/`,
          description: firma.slogan,
        }}
      />
    </>
  );
}