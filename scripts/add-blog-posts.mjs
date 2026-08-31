#!/usr/bin/env node
/* B3 — blog yazılarını 10'a çıkarır (deterministiktir, mevcutları korur) */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const path = join(root, 'data', 'blog.json');
const blog = JSON.parse(readFileSync(path, 'utf8'));

const yeni = [
  {
    slug: 'elektrik-tesisati-yenileme-rehberi',
    baslik: 'Eski Evlerde Elektrik Tesisatı Yenileme: Bilmeniz Gereken 8 Nokta',
    ozet: '1980-2000 arası binalarda elektrik tesisatı neden yenilenmeli? Kablo kesiti, topraklama, otomat (MCB) ve kaçak akım rölesi (RCD) standartları ve yenileme süreci hakkında uzman rehberi.',
    kategori: 'Elektrik & Tesisat',
    tarih: '2026-07-12',
    resim: 'elektrik.jpg',
    okumaSuresi: 7,
    icerik: [
      { baslik: 'Eski tesisatın riskleri', metin: '1980 ve 1990 yapımı binaların büyük bölümünde kullanılan bakır alüminyum karışımı hatlar, yalıtımı bozulmuş kablolar ve atımlı sigorta sistemleri bugünün cihaz yükünü kaldıramaz. Kombi, klima, ankastre ocak gibi yüksek güçlü cihazlar eski hatlarda ısınmaya, hatta yangın riskine neden olabilir. İlk uyarı sinyali; sigortanın sık atması, prizlerin ısınması, aydınlatmada kıpırdama ve eski tip kablolardaki kokudur.' },
      { baslik: 'Doğru kablo kesiti ne olmalı?', metin: 'Aydınlatma hatlarında 1.5 mm², priz hatlarında 2.5 mm², kombin ve ankastre gibi cihazlarda 4-6 mm² kablo kullanılır. Eski binalarda sık rastlanan 1.0-1.5 mm² priz hatları ciddi ısınma kaynağıdır. Yenileme sırasında her odaya ayrı hat çekilir ve sigorta kutusunda devre bazlı ayrım yapılır.' },
      { baslik: 'Otomat ve kaçak akım rölesi şart', metin: 'Modern panoda her daire hattı için ayrı otomat (MCB), genel sigorta ve kaçak akım koruma rölesi (RCD) bulunur. RCD, 30 milisaniyede devreyi keserek elektrik çarpması ve yangın riskini önler. 2006 öncesi yapılarda RCD bulunmama ihtimali yüksektir; yenilemede zorunlu kurulum yapılmalıdır.' },
      { baslik: 'Topraklama ve ölçüm raporu', metin: 'Yenileme sonrası tüm hatlar topraklama ölçümü, izolasyon testi ve devre bazında açma-kapama testinden geçirilir. Bu ölçümlerin yazılı raporu teslim edilmeli; rapor hem güvenlik belgesi hem de olası bir sigorta hasarında dayanaktır. Pano kapağına da hangi otomatın hangi hattı beslediği etiketlenir.' },
      { baslik: 'Süre ve maliyet', metin: '3+1 bir dairede komple elektrik yenilemesi, sıva üstü veya sıva altı yönteme bağlı olarak 3-7 gün sürer. Keşifte mevcut hat sayısı, boru (pimaş) durumu ve duvar yapısı incelenir; fiyat daire büyüklüğü ve hat sayısına göre sabit teklifle sunulur. Ücretsiz keşif ve aynı gün teklif için bizi arayabilirsiniz.' },
    ],
  },
  {
    slug: 'kucuk-banyo-tadilati-ipuclari',
    baslik: 'Küçük Banyoda Büyük Değişim: Alan Kazandıran 7 Tadilat İpucu',
    ozet: 'Dar banyoda ferahlık hissi nasıl yaratılır? Duşakabin mi perde mi, asma klozet, açık karo, raf sistemleri ve aydınlatma önerileriyle küçük banyo tadilatında alan kazandıran 7 pratik ipucu.',
    kategori: 'Tadilat Rehberi',
    tarih: '2026-05-08',
    resim: 'banyo.jpg',
    okumaSuresi: 6,
    icerik: [
      { baslik: 'Büyük ebatlı karo ile ferahlık', metin: 'Küçük banyoda 60x120 gibi büyük ebatlı karo, derz sayısını azaltarak yüzeyi bütünleşik gösterir ve alanı olduğundan büyük hissettirir. Açık (patlatma) karo ise deseniyle hareket katar; bu iki tercih, metrekare başına işçilik farkını da beraberinde getirir.' },
      { baslik: 'Duşakabin yerine düz duş alanı', metin: 'Klasik klozetli-küvetli düzende alanın üçte biri duşa ayrılır. Küçük banyoda küvet sökülüp düz duş alanı (duş kanalı + cam panel) yapıldığında en az 40-60 cm alan kazanılır. Cam panel, perdeye göre hem ferah hem hijyeniktir.' },
      { baslik: 'Asma klozet yer kazandırır', metin: 'Asma (duvara monteli) klozet, rezervuarı duvar içine gömüldüğü için zeminde 15-20 cm derinlik kazandırır; süpürme ve temizlik de kolaylaşır. Gömme rezervuar aynı zamanda modern bir görünüm sağlar. Yeni tadilatta ilk tercihler arasındadır.' },
      { baslik: 'Lavabo altı ve duvar raf çözümleri', metin: 'Dolap altı boşlukları değerlendirmek için asılı (konsol) lavabo dolabı, klozet üstü duvar rafları ve kapı arkası askı sistemleri kullanılır. Her yüzeyin değerlendiği planlamada, ihtiyaç listesi çıkarılmadan ölçü alınmaz; fazlalık raf görsel kalabalık yaratır.' },
      { baslik: 'Beyaz zemin, tek vurgu rengi', metin: 'Küçük banyoda zemin ve duvarlar açık tonda olmalı; vurgu rengi tek bir duvarda veya aksesuarlarda kullanılmalıdır. Spot ve led şerit aydınlatma tavanı yüksek gösterir. Aynalı dolap ve lisansız buhar geçirmez aydınlatma seçimi de tadilat sırasında netleştirilmelidir.' },
    ],
  },
  {
    slug: 'kombi-degisimi-rehberi',
    baslik: 'Kombi Değişimi Ne Zaman Gerekir? 5 Belirti ve Değişim Rehberi',
    ozet: 'Kombiniz mi yaşlandı? Sürekli arıza, artan fatura, ses, verim kaybı ve yedek parça sorunu kombinizi değiştirme zamanının geldiğinin işaretleridir. Doğru kombi seçimi ve değişim süreci rehberi.',
    kategori: 'Isıtma',
    tarih: '2026-03-20',
    resim: 'kombi.jpg',
    okumaSuresi: 6,
    icerik: [
      { baslik: 'Kombi ömrü ne kadardır?', metin: 'Üreticilere göre yoğuşmalı kombilerin tasarım ömrü 10-15 yıl, klasik kombilerde 10-12 yıldır. Ömür; su sertliği, bakım sıklığı ve kullanım yoğunluğuna göre değişir. 12 yaşını geçen kombide verim kaybı yüzde 15-20 oranına ulaşabilir; bu doğrudan faturaya yansır.' },
      { baslik: 'Değişim zamanı geldiğini gösteren 5 belirti', metin: '1) Arıza sıklığı artıyorsa ve her seferinde farklı parça değişiyorsa, 2) Isıtma/departman süresi uzadıysa, 3) Gaz faturası aynı kullanımda belirgin arttıysa, 4) Kombi sesli çalışıyor, kireç ve çamur birikimi tekrarlıyorsa, 5) Yedek parça bulmak zorlaştıysa veya servis ücreti tamir ücretini aşıyorsa kombi değişimi ekonomik hale gelir.' },
      { baslik: 'Yoğuşmalı mı, klasik mi?', metin: 'Yoğuşmalı kombiler baca gazındaki ısıyı geri kazanarak klasik kombilere göre yüzde 15-30 daha verimli çalışır. Doğalgaz faturası yüksekse veya ev ısıtma süresi uzunsa yoğuşmalı tercih edilmelidir. Seçimde kapasite (daire büyüklüğüne göre 24-28 kW), marka servis ağı ve garanti süresi değerlendirilmelidir.' },
      { baslik: 'Değişim süreci nasıl işler?', metin: 'Keşifte mevcut tesisat, baca tipi ve daire büyüklüğü incelenir; uygun kapasite ve model önerilir. Değişim genellikle aynı gün tamamlanır: eski kombi sökülür, tesisat bağlantıları kontrol edilir, yeni kombi monte edilir, gaz kaçağı testi ve devreye alma yapılır. Yetkili servis kaydı işlemi de firma tarafından yürütülür.' },
      { baslik: 'Bakım ile ömrü uzatın', metin: 'Kombi değişimi gerektirmeden önce yıllık periyodik bakım (brülör temizliği, gaz basıncı kontrolü, filtre değişimi) verimliliği korur. Özellikle petek temizliği ile birlikte yapılan bakım, kombinin daha az yakıtla daha hızlı ısıtmasını sağlar. Bakımda yaz dönemi tavsiye edilir.' },
    ],
  },
  {
    slug: 'isyeri-tadilati-rehberi',
    baslik: 'İşyeri Tadilatı: İzinler, Süre ve Maliyet Rehberi (2026)',
    ozet: 'Kafe, restoran, ofis veya mağaza tadilatı yapacaklara rehber: belediye izinleri, proje onayı, yangın ve elektrik mevzuatı, işyeri açma ruhsatı, süre planlaması ve maliyet kalemleri.',
    kategori: 'Ticari Tadilat',
    tarih: '2026-01-15',
    resim: 'ofis.jpg',
    okumaSuresi: 8,
    icerik: [
      { baslik: 'Önce proje, sonra izin', metin: 'İşyeri tadilatında önce mevcut yerleşim planı ve tadilat projesi hazırlanır; ardından belediye ilgili birimlerinden tadilat izni alınır. Taşıyıcı unsur içeren uygulamalar için statik proje gerekebilir. Bu süreç tadilat süresinin en kritik kısmıdır; izinsiz başlanan işler yıkım cezası ve ruhsat sorunlarıyla karşılaşabilir.' },
      { baslik: 'Yangın ve elektrik mevzuatı', metin: 'Kafe-restoran ve ofislerde yangın yönetmeliğine uygun acil çıkış, yangın algılama (dedektör) ve söndürme sistemleri zorunludur. Elektrik tesisatı projesi ve topraklama raporu, işyeri açma ruhsatı aşamasında istenir. Bu kalemler tadilat bütçesine mutlaka dahil edilmelidir; sonradan eklenirse hem maliyet artar hem de tadilat uzar.' },
      { baslik: 'Ticari tadilatta süre planlaması', metin: 'Ticari alanlarda işleyişi durdurmadan tadilat yapmak genellikle şarttır. Bölüm bölüm çalışma, gece vardiyası veya hafta sonu yoğunlaştırılmış programlarla kira kaybı minimize edilir. Süre planı; söküm, altyapı (tesisat-elektrik), kaplama, boya ve mobilya montajı fazlarına ayrılır ve her faz için kontrol noktası belirlenir.' },
      { baslik: 'Maliyet kalemleri', metin: 'İşyeri tadilat maliyeti; alan büyüklüğü, kat planı değişikliği, mekanik sistemler (menfez, davlumbaz), malzeme sınıfı ve izin harçlarına göre değişir. Sabit fiyat teklifi; söküm, altyapı, kaplama, boya, elektrik, mobilya montajı ve atık bertarafını kapsayacak şekilde kalem kalem yazılmalıdır. Sürpriz kalem çıkmaması için keşif raporu detaylı tutulur.' },
      { baslik: 'Uzman ekip ile izin sürecinde destek', metin: 'Belediye başvuruları, proje onayı ve ruhsat süreçlerini yürütmüş bir firma ile çalışmak süreyi haftalarca kısaltır. Keşif sırasında işletme türünüz (gıda, perakende, ofis) ve mevcut ruhsat durumunuzu iletmeniz yeterlidir; izin listesi, süre planı ve maliyet tablosu aynı gün hazırlanır.' },
    ],
  },
];

const mevcutSlugs = new Set(blog.map((b) => b.slug));
const eklenecek = yeni.filter((y) => !mevcutSlugs.has(y.slug));
blog.push(...eklenecek);
blog.sort((a, b) => (a.tarih < b.tarih ? 1 : -1));
writeFileSync(path, JSON.stringify(blog, null, 2), 'utf8');
console.log(`✔ blog.json: ${blog.length} yazi (${eklenecek.length} yeni)`);