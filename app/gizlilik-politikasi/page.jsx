import React from 'react';
import LegalPage from '../../components/LegalPage';
import SchemaMarkup from '../../components/SchemaMarkup';
import { firma, siteUrl, pageTitle, metaDescription, formEndpoint } from '../../lib/site-data';

export const metadata = {
  title: pageTitle('Gizlilik Politikası ve Çerez Aydınlatması'),
  description: metaDescription(
    `${firma.ad} gizlilik politikası: web sitemizde hangi çerezlerin kullanıldığı, kişisel verilerin nasıl işlendiği ve haklarınız hakkında bilgilendirme.`
  ),
  alternates: {
    canonical: `${siteUrl}/gizlilik-politikasi/`,
    languages: {
      'tr-TR': `${siteUrl}/gizlilik-politikasi/`,
      'x-default': `${siteUrl}/gizlilik-politikasi/`,
    },
  },
  robots: { index: true, follow: true },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: `${siteUrl}/` },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Gizlilik Politikası',
      item: `${siteUrl}/gizlilik-politikasi/`,
    },
  ],
};

const bolumler = [
  {
    baslik: '1. Bu Politikanın Kapsamı',
    paragraflar: [
      `Bu gizlilik politikası, ${firma.ad} tarafından işletilen ${siteUrl} adresli web sitesini ziyaret ettiğinizde kişisel verilerinizin nasıl toplandığını, hangi amaçlarla işlendiğini ve hangi haklara sahip olduğunuzu açıklar.`,
      'Politika yalnızca bu web sitesi için geçerlidir. Sitemizde yer alan Google Haritalar, WhatsApp veya sosyal medya bağlantıları gibi üçüncü taraf hizmetlere yönlendirildiğinizde, ilgili sağlayıcının kendi gizlilik politikası uygulanır.',
    ],
  },
  {
    baslik: '2. Topladığımız Veriler',
    paragraflar: [
      'Sitemizi yalnızca gezmek için hiçbir kişisel veri paylaşmanız gerekmez. Veri toplama iki durumda gerçekleşir:',
    ],
    liste: [
      'İletişim formu: Ad soyad, telefon numarası, hizmet verilmesini istediğiniz ilçe, talep ettiğiniz hizmet ve mesajınız. Bu alanları siz doldurup gönderdiğinizde iletilir.',
      'Çerezler ve ölçümleme: Onay vermeniz hâlinde, ziyaret istatistiklerini anonim olarak ölçmek amacıyla Google Analytics 4 çerezleri kullanılır.',
    ],
  },
  {
    baslik: '3. Çerez Kullanımı',
    paragraflar: [
      'Sitemizde zorunlu çerezler ve tercihe bağlı ölçümleme çerezleri kullanılır.',
      'Zorunlu çerezler, yalnızca çerez tercihinizi tarayıcınızda hatırlamak için kullanılır ve tarayıcınızın yerel deposunda (localStorage) saklanır. Bu kayıt bize gönderilmez.',
      'Ölçümleme çerezleri (Google Analytics 4) yalnızca çerez bildiriminde "Kabul Et" seçeneğini işaretlemeniz hâlinde yüklenir. Reddetmeniz hâlinde ölçümleme kodu tarayıcınıza hiç yüklenmez ve site kesintisiz çalışmaya devam eder. Analytics kullanıldığında IP adresiniz anonimleştirilir (anonymize_ip).',
      'Çerez tercihinizi dilediğiniz zaman tarayıcınızın site verilerini temizleyerek sıfırlayabilir, ardından yeniden seçim yapabilirsiniz.',
    ],
  },
  {
    baslik: '4. Verileri Kullanma Amacımız',
    liste: [
      'Ücretsiz keşif ve fiyat teklifi taleplerinize dönüş yapmak',
      'Talep ettiğiniz hizmete ilişkin randevu planlaması yapmak',
      'Hizmet sonrası destek ve garanti süreçlerini yürütmek',
      'Web sitesinin performansını ve içeriğini anonim istatistiklerle iyileştirmek',
    ],
  },
  {
    baslik: '5. Verilerin Paylaşımı',
    paragraflar: [
      `Kişisel verileriniz pazarlama amacıyla üçüncü kişilere satılmaz, kiralanmaz veya devredilmez. Verileriniz yalnızca talebinizi karşılamak üzere ${firma.ad} bünyesindeki yetkili personelle paylaşılır.`,
      formEndpoint
        ? 'İletişim formu gönderimleri, form altyapısını sağlayan hizmet sağlayıcımızın sunucuları üzerinden iletilir.'
        : 'İletişim formunu gönderdiğinizde talebiniz WhatsApp üzerinden tarafımıza ulaşır; bu durumda WhatsApp (Meta Platforms) kendi gizlilik politikası kapsamında veri işleyicisi konumundadır.',
      'Yasal bir yükümlülük veya yetkili kamu kurumlarının usulüne uygun talebi hâlinde mevzuatın gerektirdiği ölçüde paylaşım yapılabilir.',
    ],
  },
  {
    baslik: '6. Saklama Süresi',
    paragraflar: [
      'İletişim talepleriniz, talebin sonuçlandırılmasının ardından hizmet ilişkisi kurulmuşsa ilgili mevzuatta öngörülen zamanaşımı süreleri boyunca; hizmet ilişkisi kurulmamışsa en fazla 12 ay süreyle saklanır ve sürenin sonunda silinir.',
      'Anonim istatistik verileri kişisel veri niteliği taşımaz ve süresiz saklanabilir.',
    ],
  },
  {
    baslik: '7. Veri Güvenliği',
    paragraflar: [
      'Web sitemiz HTTPS protokolü üzerinden şifreli olarak sunulur. Sitemizde kullanılan yazı tipleri kendi sunucumuzdan servis edilir; bu nedenle sayfa açılışında Google Fonts gibi dış servislere IP adresiniz gönderilmez.',
      'Verilerinize yetkisiz erişimi, kaybı veya değiştirilmesini önlemek için makul teknik ve idari tedbirler alınmaktadır.',
    ],
  },
  {
    baslik: '8. Haklarınız ve İletişim',
    paragraflar: [
      '6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamındaki haklarınızın ayrıntılı dökümü için KVKK Aydınlatma Metni sayfamızı inceleyebilirsiniz.',
      `Gizlilik uygulamalarımıza ilişkin her türlü soru ve talebiniz için ${firma.email} adresine e-posta gönderebilir veya ${firma.telefon} numaralı hattımızı arayabilirsiniz.`,
    ],
  },
  {
    baslik: '9. Değişiklikler',
    paragraflar: [
      'Bu politika, mevzuat değişiklikleri veya hizmetlerimizdeki güncellemeler doğrultusunda revize edilebilir. Güncel sürüm her zaman bu sayfada yayımlanır ve sayfa başındaki güncelleme tarihi değiştirilir.',
    ],
  },
];

export default function GizlilikPolitikasiPage() {
  return (
    <>
      <SchemaMarkup data={breadcrumbSchema} />
      <LegalPage
        baslik="Gizlilik Politikası ve Çerez Aydınlatması"
        ozet={`${firma.ad} olarak kişisel verilerinizi yalnızca talebinizi karşılamak için işliyoruz. Bu sayfada hangi verileri topladığımızı, neden topladığımızı ve nasıl koruduğumuzu açıkça anlatıyoruz.`}
        guncelleme="1 Eylül 2025"
        breadcrumb={[{ label: 'Gizlilik Politikası', href: '/gizlilik-politikasi/' }]}
        bolumler={bolumler}
      />
    </>
  );
}
