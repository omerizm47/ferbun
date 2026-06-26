# Fêrbûn — Güncelleme ve Doğrulama Raporu (26 Haziran 2026)

Bu rapor, bugün uygulamaya kazandırılan tüm iyileştirmeleri, yapılan temizlikleri, premium özellikleri ve bunları nasıl test edeceğinizi sade bir dille açıklamaktadır. 

---

## 1. Neler Yapıldı? (Yapılan Güncellemeler)

### 🚀 1.1. Sözcük Dağarcığı Gücü & SRS İstatistik Paneli
* **Ne işe yarar?** Profil sekmesinde, çalıştığınız kelimelerin ezberlenme derecesini (Öğreniliyor, Aşina, Ustalaşıldı) gösteren dinamik ve görsel bir grafik paneli eklendi.
* **Detaylar**:
  * Kelimeler durum seviyelerine göre gruplandı:
    * **Öğreniliyor**: Mastery Seviyesi 0–1 (Turuncu renk şeridi)
    * **Aşina**: Mastery Seviyesi 2–3 (Altın Sarı renk şeridi)
    * **Ustalaşıldı**: Mastery Seviyesi 4–5 (Kürt Yeşili renk şeridi)
  * Bu üç durumun oranlarını tek bir satırda gösteren yuvarlatılmış ve kesintisiz **yığılmış (stacked) grafik** çizildi.
  * Grafiğin altında kelime sayılarını gösteren **ikonlu lejantlar** yer alır.
  * Kartın en altında bilimsel **"Unutma Eğrisi" (Forgetting Curve)** hakkında motive edici küçük bir bilgi kutusu yerleştirildi ve arka planı geleneksel Kürt Güneşi filigranı ile süslendi.
  * Ekran okuyucu (Accessibility) desteği sayesinde görme engelli öğrenciler için panel tamamen seslendirilebilir hale getirildi.

### 🎨 1.2. Kürt Kilim Motiflerinin Dinamik Degradeleri (Loom Gradients)
* **Ne işe yarar?** Uygulama karanlık moda alındığında, ana sayfadaki ve hikaye listelerindeki geleneksel Kürt kilim desenleri (kenarlıklar ve baklava desenleri) sönük kalmak yerine Newroz ateşini andıran canlı degradelerle (kırmızı-turuncu-altın sarısı) parlar.
* **Detaylar**: SVG çizimleri içerisine dinamik renk geçişli `<LinearGradient>` yapısı entegre edilmiştir. Açık modda ise standart renk paleti korunur.

### 🎮 1.3. Oyunlaştırma Açıklarının Kapatılması & Seviye Kutlaması
* **Hikayelere XP Desteği**: Hikaye okuyup anlama testini bitiren kullanıcılara artık **+15 XP** tanımlanmaktadır. Bu XP seviye atlamayı sağlar.
* **Seviye Atlama Tebriki**: Hikaye testi sonunda veya kelime tekrarı sonunda kazanılan XP ile seviye atlanırsa, ekranda animasyonlu **`CelebrationOverlay`** (seviye atlama kutlaması) açılmaktadır.
* **Kilit Güvenliği**: Ünitelerin kilit mantığı güçlendirildi. Eğer bir ünite kilitliyse, içerisindeki tüm dersler de zorunlu olarak kilitli kalır ve doğrudan erişilemez.

### 🧹 1.4. Kod ve Dosya Boyutu Optimizasyonu (Bloat Cleanup)
* **Silinen Atıl Dosyalar**: Kullanılmayan `Badge.tsx` ve `Card.tsx` bileşenleri silindi.
* **Gereksiz Seslerin Temizlenmesi**: Kullanılmayan 100 KB'lık yedek ses dosyaları (`click.mp3`, `correct.wav`, `wrong.wav`, `success.wav` vb. atıl/boş yer tutucular) tamamen temizlenerek uygulama boyutu düşürüldü.
* **Kütüphane Temizliği**: `package.json` içerisindeki kullanılmayan `react-native-worklets` kütüphanesi ve bağımlılıkları temizlendi.

### 🛠️ 1.5. Arayüz Taşma Hatalarının Düzeltilmesi
* **Flashcard Butonları**: Türkçe çevirilerin uzun olması nedeniyle taşan "Hâlâ öğreniyorum" ve "Bunu biliyorum!" butonları, daha kompakt ve standart olan **`Öğreniyorum`** ve **`Biliyorum!`** ifadeleriyle değiştirildi. Buton dolgu payları optimize edildi, font boyutu 14px yapıldı ve sığmayan ekranlarda otomatik küçülmesi için `adjustsFontSizeToFit` özelliği eklendi.
* **SRS Lejantları**: Profildeki lejant yazılarının küçük ekranlarda taşmasını önlemek için satır sarma (`flexWrap: 'wrap'`) özelliği eklenerek güvenli hale getirildi.

---

## 2. Nasıl Test Edilir? (Test Adımları)

Uygulamanın en güncel halini test etmek için aşağıdaki adımları sırayla izleyebilirsiniz:

### 🧪 Test 1: Kilim Motiflerinin Dinamik Renk Geçişleri
1. Uygulamayı açın (Profil sekmesine gidin).
2. **Görünüm (Appearance)** bölümünden **Karanlık (Dark)** seçeneğini aktif hale getirin.
3. **Öğren (Learn)** sekmesine dönün. En üstteki Kilim kenarlığının (`KilimBorder`) ve ders aralarındaki Kilim baklavalarının (`KilimDiamond`) kırmızı, turuncu ve altın sarısı degradelerle parladığını doğrulayın.
4. Görünümü tekrar Aydınlık (Light) yaparak standart renklere döndüğünü kontrol edin.

### 🧪 Test 2: Sözcük Dağarcığı Gücü & SRS Kartı
1. Hiç kelime çalışılmamış yeni bir hesapla Profil sekmesine gidin.
2. İstatistikler ile Görünüm bölümleri arasında **"SÖZCÜK DAĞARCIĞI GÜCÜ"** başlığı altında yerelleştirilmiş *"Henüz kelime çalışılmadı. Öğrenmeye başlamak için Kelimeler sekmesindeki kartları çevir!"* boş durum uyarısını doğrulayın.
3. **Kelimeler (Words)** sekmesine giderek bir tema seçin ve kelime kartlarını çevirip bildiklerinizi/bilmediklerinizi işaretleyin.
4. Profil sekmesine geri dönün. Artık boş durum uyarısı yerine:
   * Yığılmış (stacked) renk şeridinin dolduğunu,
   * Altındaki sayıların çalıştığınız kelime sayısına göre arttığını (Öğreniliyor: 1, Ustalaşıldı: 2 vb.),
   * En altta filigranlı "Unutma Eğrisi" tavsiye kartının düzgün göründüğünü doğrulayın.

### 🧪 Test 3: Hikaye XP Ödülü & Seviye Atlama Kutlaması
1. **Hikayeler (Stories)** sekmesine gidin ve kilitli olmayan bir hikayeyi okuyun.
2. Hikaye sonundaki anlama testini çözüp tamamlayın.
3. Sonuç ekranında **`+15 XP`** kazanıldığını belirten yıldızlı göstergenin çıktığını doğrulayın.
4. Profil sekmesine gidip XP'nizin 15 arttığını teyit edin.
5. Eğer bu 15 XP ile seviye sınırını (her 100 XP'de bir seviye) geçtiyseniz, ekranda seviye atlama tebrik panelinin tetiklendiğini doğrulayın.

### 🧪 Test 4: Buton Taşmalarının Kontrolü
1. **Kelimeler (Words)** sekmesine gidip kartları çevirin.
2. Kartı arkasına çevirdiğinizde çıkan **`Öğreniyorum`** (kırmızı/yenileme ikonlu) ve **`Biliyorum!`** (yeşil/onay ikonlu) butonlarının kenarlardan taşma yapmadığını, ikonların ve metinlerin buton sınırları içinde simetrik ve şık durduğunu doğrulayın.

---

## 3. Kod Kalitesi ve Güvenlik
* Kodların tamamı **TypeScript** standartlarına uygun şekilde yazılmıştır.
* `npm run lint` komutu çalıştırılmış ve kod tabanında **0 linter hatası ve 0 uyarı** olduğu doğrulanmıştır.
