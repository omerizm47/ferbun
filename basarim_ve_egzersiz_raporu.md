# Fêrbûn — Güncelleme ve Test Raporu (29 Haziran 2026)

Bu rapor, bugün uygulamaya kazandırılan özellikleri, yapılan değişiklikleri ve bu özelliklerin nasıl test edileceğini adım adım açıklamaktadır.

---

## 1. Yazma Egzersizi (Writing Exercise) & Kürtçe Klavye

* **Yapılan Değişiklik:** `WritingExercise.tsx` adında tamamen yeni bir egzersiz bileşeni ve bu egzersizler ile diğer metin girişli egzersizlerde (Çeviri ve Boşluk Doldurma) kullanılmak üzere özel `KurdishKeyboardRow.tsx` klavye satırı eklendi.
* **Detaylar:**
  * **Yazma Egzersizi:** Öğrenciye Türkçe veya İngilizce anlamı gösterilir ve bunu Kürtçe olarak yazması istenir. Cevabın doğruluğu kontrol edilir.
  * **Kürtçe Klavye Satırı:** Standart mobil klavyelerde bulunmayan özel Kürtçe harfleri (`ê`, `î`, `û`, `ş`, `ç` vb.) metin kutusuna doğrudan yerleştirmek için ek harf paneli sunar. Büyük/küçük harf geçişi (`shift` mantığı) desteklenmektedir.
  * `TranslationExercise.tsx` ve `FillBlankExercise.tsx` bileşenleri de bu yeni klavye satırını kullanacak şekilde güncellendi.
* **Nasıl Test Edilir?**
  1. Kelimeler sekmesinden bir derse başlayın.
  2. Karşınıza Yazma (`BINIVÎSE`), Çeviri (`WERGERÎNE`) veya Boşluk Doldurma (`TIJE BIKE`) egzersizi çıktığında metin giriş alanına odaklanın.
  3. Giriş alanının hemen altında Kürtçe özel karakterlerin (`ê`, `î`, `û`, `ş`, `ç`, `ğ` vb.) yer aldığı tuş satırını doğrulayın.
  4. Bu tuşlara basarak harflerin metin alanına imlecin bulunduğu yere doğru şekilde eklendiğini kontrol edin.
  5. Shift (ok) butonuna basarak karakterlerin büyük harfe (`Ê`, `Î`, `Û` vb.) dönüştüğünü doğrulayın.

---

## 2. Başarımlar ve Rozet Sistemi (Achievements & Badges)

* **Yapılan Değişiklik:** Kullanıcı motivasyonunu artırmak için geniş kapsamlı bir başarı/rozet sistemi eklendi.
* **Detaylar:**
  * `badges.ts` altında 5 ana kategoride (Ders Tamamlama, Günlük Seri, Kelime Ezberleme, Yüksek Skor/Kombo, Hikaye Okuma) toplam 10 adet rozet tanımlandı.
  * `progressStore.ts` güncellenerek; ders bitimi, hikaye bitimi ve kelime çalışması sonunda kullanıcının yeni rozetler kazanıp kazanmadığı (`computeBadges` fonksiyonu ile) otomatik hesaplanmaya başlandı.
  * Profil Sekmesine (`ProfileScreen.tsx`) **Rozetlerim & Başarımlarım** kartı ve tüm rozetleri listeleyen bir Modal arayüzü eklendi.
  * Yeni `BadgeCard.tsx` bileşeni ile kazanılan rozetler renkli ve detaylı, kilitli rozetler ise grileştirilmiş ve kilit ikonlu olarak gösterilir.
* **Nasıl Test Edilir?**
  1. Profil sekmesine gidin.
  2. "BAŞARIMLAR" başlığı altındaki "Rozetlerim & Başarımlarım" kartını doğrulayın. Üzerinde "X/10 başarım kazanıldı" şeklinde anlık ilerleme yazmalıdır.
  3. Karta tıklayarak tüm rozetleri listeleyen modal penceresini açın.
  4. Henüz hiç ders yapmadıysanız rozetlerin kilitli (gri) göründüğünü doğrulayın.
  5. Bir ders veya hikaye tamamlayarak ilgili rozetin (örn. İlk Kelimeler / Hikaye Okuyucu) kilidinin açıldığını ve renklendiğini doğrulayın.

---

## 3. Ders Sonu Arayüz Yenilikleri & Kombo Sistemi

* **Yapılan Değişiklik:** Ders sonundaki başarı ekranı daha zengin istatistikler ve yapılan hataları gösteren yeni bir bölümle güncellendi.
* **Detaylar:**
  * **İstatistik Kartları:** Ders bittiğinde; Doğruluk Oranı (örn. 8/10), Kazanılan XP ve varsa Kombo Bonus XP bilgileri şık kartlar halinde gösterilir.
  * **Hatalar Kutusu (Mistakes Recap):** Derste yapılan yanlışlar, dersin sonunda liste halinde gösterilerek kullanıcının hatalarını görmesi ve pekiştirmesi sağlanır.
  * **Kombo Efekti:** Derste arka arkaya verilen doğru cevaplarda kombo sayacı alev animasyonu ve pulse efekti ile parlar. En yüksek kombo progressStore'da `maxComboEver` adıyla saklanır ve "Combo Ustası" rozeti için kullanılır.
* **Nasıl Test Edilir?**
  1. Bir ders açın ve arka arkaya soruları doğru cevaplayarak üst barda kombo alevinin çıktığını görün.
  2. Bilerek en az bir soruyu yanlış cevaplayın.
  3. Dersi bitirdiğinizde sonuç ekranında "Doğruluk" kartı, "XP" kartı ve en altta "Yanlış Yapılan Sorular" başlığı altında yaptığınız hatanın (kelimenin Kürtçesi ve anlamı ile birlikte) listelendiğini doğrulayın.

---

## 4. Yerelleştirilmiş Bildirim Hatırlatıcıları

* **Yapılan Değişiklik:** Günlük hatırlatıcı bildirimlerinin dili (`notifications.ts`) kullanıcının seçtiği dile (TR/EN) göre dinamik olarak ayarlanacak şekilde güncellendi.
* **Nasıl Test Edilir?**
  1. Profil ekranından uygulama dilini değiştirin.
  2. Hatırlatıcı saatini ayarladığınızda kurulan bildirimin seçtiğiniz dile uygun başlık ve içeriğe sahip olduğunu doğrulayın.
