import React from 'react';
import LegalPage from '../../components/LegalPage';
import SchemaMarkup from '../../components/SchemaMarkup';
import { firma, siteUrl, pageTitle, metaDescription } from '../../lib/site-data';

export const metadata = {
  title: pageTitle('KVKK Aydınlatma Metni'),
  description: metaDescription(
    `${firma.ad} KVKK aydınlatma metni: 6698 sayılı kanun kapsamında kişisel verilerinizin işlenme amacı, hukuki sebebi, saklama süresi ve başvuru haklarınız.`
  ),
  alternates: {
    canonical: `${siteUrl}/kvkk-aydinlatma-metni/`,
    languages: {
      'tr-TR': `${siteUrl}/kvkk-aydinlatma-metni/`,
      'x-default': `${siteUrl}/kvkk-aydinlatma-metni/`,
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
      name: 'KVKK Aydınlatma Metni',
      item: `${siteUrl}/kvkk-aydinlatma-metni/`,
    },
  ],
};

const bolumler = [
  {
    baslik: '1. Veri Sorumlusu',
    paragraflar: [
      `6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca kişisel verileriniz, veri sorumlusu sıfatıyla ${firma.ad} tarafından aşağıda açıklanan kapsamda işlenmektedir.`,
    ],
    liste: [
      `Unvan: ${firma.ad}`,
      `Adres: ${firma.adres}`,
      `Telefon: ${firma.telefon}`,
      `E-posta: ${firma.email}`,
    ],
  },
  {
    baslik: '2. İşlenen Kişisel Verileriniz',
    paragraflar: [
      'Web sitemiz veya iletişim kanallarımız üzerinden bizimle iletişime geçmeniz hâlinde aşağıdaki veri kategorileri işlenir:',
    ],
    liste: [
      'Kimlik verisi: Ad ve soyadınız',
      'İletişim verisi: Telefon numaranız, varsa e-posta adresiniz, hizmet talep ettiğiniz ilçe',
      'Müşteri işlem verisi: Talep ettiğiniz hizmet, mesajınızın içeriği, keşif ve teklif kayıtları',
      'İşlem güvenliği verisi: Onay vermeniz hâlinde anonimleştirilmiş ziyaret istatistikleri',
    ],
  },
  {
    baslik: '3. İşleme Amaçları',
    liste: [
      'Ücretsiz keşif, fiyat teklifi ve randevu taleplerinizin karşılanması',
      'Sözleşme kurulması ve ifası ile hizmetin yürütülmesi',
      'Hizmet sonrası garanti, destek ve şikâyet süreçlerinin yönetilmesi',
      'Faturalandırma ve mali mevzuattan doğan yükümlülüklerin yerine getirilmesi',
      'Web sitesi içeriğinin ve hizmet kalitesinin iyileştirilmesi',
    ],
  },
  {
    baslik: '4. Toplama Yöntemi ve Hukuki Sebep',
    paragraflar: [
      'Kişisel verileriniz; web sitemizdeki iletişim formu, telefon görüşmesi, WhatsApp mesajı, e-posta veya yüz yüze keşif görüşmesi gibi kanallar aracılığıyla kısmen otomatik yollarla toplanır.',
      'Verileriniz KVKK m.5/2 uyarınca "bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması", "veri sorumlusunun hukuki yükümlülüğünü yerine getirmesi" ve "ilgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla meşru menfaat" hukuki sebeplerine dayanılarak işlenir.',
      'Zorunlu olmayan ölçümleme çerezleri ise yalnızca KVKK m.5/1 uyarınca açık rızanız alındıktan sonra çalıştırılır.',
    ],
  },
  {
    baslik: '5. Aktarım',
    paragraflar: [
      'Kişisel verileriniz pazarlama amacıyla üçüncü kişilerle paylaşılmaz, satılmaz veya kiralanmaz.',
      'Verileriniz yalnızca; hizmetin ifası için görevlendirilen kendi ustalarımızla, mali müşavirlik ve muhasebe hizmeti aldığımız iş ortağımızla ve yasal yükümlülük hâlinde yetkili kamu kurum ve kuruluşlarıyla, amaçla sınırlı olarak paylaşılabilir.',
      'Açık rızanız ile çalıştırılan ölçümleme hizmeti kapsamında anonim istatistik verileri yurt dışında yerleşik hizmet sağlayıcının sunucularında işlenebilir.',
    ],
  },
  {
    baslik: '6. Saklama Süresi',
    paragraflar: [
      'Hizmet ilişkisi kurulan müşterilerimize ait veriler, ilgili mevzuatta öngörülen zamanaşımı ve saklama süreleri boyunca (özellikle vergi mevzuatı kapsamında 10 yıl) saklanır.',
      'Hizmet ilişkisi kurulmayan teklif ve keşif talepleri en fazla 12 ay süreyle saklanır, sürenin sonunda silinir veya anonim hâle getirilir.',
    ],
  },
  {
    baslik: '7. KVKK m.11 Kapsamındaki Haklarınız',
    paragraflar: ['Veri sahibi olarak aşağıdaki haklara sahipsiniz:'],
    liste: [
      'Kişisel verilerinizin işlenip işlenmediğini öğrenme',
      'İşlenmişse buna ilişkin bilgi talep etme',
      'İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme',
      'Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme',
      'Eksik veya yanlış işlenmiş olması hâlinde düzeltilmesini isteme',
      'KVKK m.7 çerçevesinde silinmesini veya yok edilmesini isteme',
      'Düzeltme, silme ve yok etme işlemlerinin aktarıldığı üçüncü kişilere bildirilmesini isteme',
      'Münhasıran otomatik sistemlerle analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme',
      'Kanuna aykırı işleme sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme',
    ],
  },
  {
    baslik: '8. Başvuru Yöntemi',
    paragraflar: [
      `Yukarıdaki haklarınıza ilişkin taleplerinizi, kimliğinizi tevsik edici bilgilerle birlikte ${firma.email} adresine e-posta göndererek veya ${firma.adres} adresine yazılı olarak ileterek iletebilirsiniz.`,
      'Başvurularınız, talebin niteliğine göre en geç otuz gün içinde ücretsiz olarak sonuçlandırılır. İşlemin ayrıca bir maliyet gerektirmesi hâlinde Kişisel Verileri Koruma Kurulu tarafından belirlenen tarifedeki ücret alınabilir.',
    ],
  },
];

export default function KvkkAydinlatmaPage() {
  return (
    <>
      <SchemaMarkup data={breadcrumbSchema} />
      <LegalPage
        baslik="KVKK Aydınlatma Metni"
        ozet="6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında, kişisel verilerinizi hangi amaçla işlediğimize ve haklarınızı nasıl kullanabileceğinize dair bilgilendirme."
        guncelleme="1 Eylül 2025"
        breadcrumb={[{ label: 'KVKK Aydınlatma Metni', href: '/kvkk-aydinlatma-metni/' }]}
        bolumler={bolumler}
      />
    </>
  );
}
