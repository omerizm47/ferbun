import { Exercise, ExerciseType } from './types';
import type { Lang } from '../i18n/types';

const E: Record<string, Exercise[]> = {

  // ===== COURSE 1: FIRST WORDS =====

  // U1L1: Greetings
  l1_1: [
    { id: 'e1', lessonId: 'l1_1', type: 'multiple_choice', questionKu: 'silav', questionEn: 'What does this word mean?', options: ['hello', 'goodbye', 'thank you', 'please'], correctAnswer: 'hello', questionTr: 'Bu kelime ne demek?', optionsTr: ['merhaba', 'hoşça kal', 'teşekkürler', 'lütfen'], correctAnswerTr: 'merhaba', order: 1 },
    { id: 'e2', lessonId: 'l1_1', type: 'multiple_choice', questionEn: 'How do you say "thanks" in Kurdish?', options: ['spas', 'silav', 'heval', 'rojbaş'], correctAnswer: 'spas', questionTr: '"teşekkürler" Kürtçe nasıl denir?', optionsTr: ['spas', 'silav', 'heval', 'rojbaş'], correctAnswerTr: 'spas', order: 2 },
    { id: 'e3', lessonId: 'l1_1', type: 'translation', questionEn: 'Write "good day" in Kurdish.', correctAnswer: 'rojbaş', questionTr: '"iyi günler" kelimesini Kürtçe yaz.', order: 3 },
    { id: 'e4', lessonId: 'l1_1', type: 'multiple_choice', questionKu: 'heval', questionEn: 'What does this word mean?', options: ['friend', 'family', 'teacher', 'guest'], correctAnswer: 'friend', questionTr: 'Bu kelime ne demek?', optionsTr: ['arkadaş', 'aile', 'öğretmen', 'misafir'], correctAnswerTr: 'arkadaş', order: 4 },
    { id: 'e5', lessonId: 'l1_1', type: 'multiple_choice', questionKu: 'Silav li te!', questionEn: 'What does this phrase mean?', options: ['Hello to you!', 'Goodbye!', 'Thank you!', 'How are you?'], correctAnswer: 'Hello to you!', questionTr: 'Bu ifade ne demek?', optionsTr: ['Sana selam!', 'Hoşça kal!', 'Teşekkürler!', 'Nasılsın?'], correctAnswerTr: 'Sana selam!', order: 5 },
    { id: 'e6', lessonId: 'l1_1', type: 'translation', questionEn: 'Write "friend" in Kurdish.', correctAnswer: 'heval', questionTr: '"arkadaş" kelimesini Kürtçe yaz.', order: 6 },
  ],

  // U1L2: Yes, No & Common Words
  l1_2: [
    { id: 'e7', lessonId: 'l1_2', type: 'multiple_choice', questionEn: 'How do you say "yes" in Kurdish?', options: ['erê', 'na', 'baş', 'ne'], correctAnswer: 'erê', questionTr: '"evet" Kürtçe nasıl denir?', optionsTr: ['erê', 'na', 'baş', 'ne'], correctAnswerTr: 'erê', order: 1 },
    { id: 'e8', lessonId: 'l1_2', type: 'translation', questionEn: 'Write "no" in Kurdish.', correctAnswer: 'na', questionTr: '"hayır" kelimesini Kürtçe yaz.', order: 2 },
    { id: 'e9', lessonId: 'l1_2', type: 'multiple_choice', questionKu: 'baş', questionEn: 'What does this word mean?', options: ['good', 'bad', 'big', 'small'], correctAnswer: 'good', questionTr: 'Bu kelime ne demek?', optionsTr: ['iyi', 'kötü', 'büyük', 'küçük'], correctAnswerTr: 'iyi', order: 3 },
    { id: 'e10', lessonId: 'l1_2', type: 'multiple_choice', questionKu: 'Baş e.', questionEn: 'What does this phrase mean?', options: ['It is good.', 'It is bad.', 'It is big.', 'It is not.'], correctAnswer: 'It is good.', questionTr: 'Bu ifade ne demek?', optionsTr: ['İyi.', 'Kötü.', 'Büyük.', 'Değil.'], correctAnswerTr: 'İyi.', order: 4 },
    { id: 'e11', lessonId: 'l1_2', type: 'true_false', questionKu: 'na = yes', questionEn: 'Is this translation correct?', correctAnswer: 'False', explanation: '"Na" means "no." "Erê" means "yes."', questionKuTr: 'na = evet', questionTr: 'Bu çeviri doğru mu?', explanationTr: '"Na" "hayır" demek. "Erê" "evet" demek.', order: 5 },
    { id: 'e12', lessonId: 'l1_2', type: 'translation', questionEn: 'Write "good" in Kurdish.', correctAnswer: 'baş', questionTr: '"iyi" kelimesini Kürtçe yaz.', order: 6 },
  ],

  // U1L3: I am, You are (Grammar)
  l1_3: [
    { id: 'e13', lessonId: 'l1_3', type: 'multiple_choice', questionEn: 'How do you say "I am Kurdish"?', options: ['Ez kurd im.', 'Tu kurd î.', 'Ew kurd e.', 'Em kurd in.'], correctAnswer: 'Ez kurd im.', explanation: '"Ez" = I, "im" = am.', questionTr: '"Ben Kürdüm" nasıl denir?', optionsTr: ['Ez kurd im.', 'Tu kurd î.', 'Ew kurd e.', 'Em kurd in.'], correctAnswerTr: 'Ez kurd im.', explanationTr: '"Ez" = ben, "im" = "-im" eki.', order: 1 },
    { id: 'e14', lessonId: 'l1_3', type: 'fill_blank', questionKu: 'Tu xwêndekár ____.', questionEn: 'Complete: "You are a student."', correctAnswer: 'î', questionTr: 'Tamamla: "Sen bir öğrencisin."', order: 2 },
    { id: 'e15', lessonId: 'l1_3', type: 'multiple_choice', questionKu: 'Ew kurd e.', questionEn: 'What does this sentence mean?', options: ['He/She is Kurdish.', 'I am Kurdish.', 'We are Kurdish.', 'You are Kurdish.'], correctAnswer: 'He/She is Kurdish.', questionTr: 'Bu cümle ne demek?', optionsTr: ['O Kürt.', 'Ben Kürdüm.', 'Biz Kürdüz.', 'Sen Kürtsün.'], correctAnswerTr: 'O Kürt.', order: 3 },
    { id: 'e16', lessonId: 'l1_3', type: 'multiple_choice', questionKu: 'Ne baş e.', questionEn: 'What does this sentence mean?', options: ['It is not good.', 'It is good.', 'It is very good.', 'Is it good?'], correctAnswer: 'It is not good.', explanation: '"Ne" goes before what is negated.', questionTr: 'Bu cümle ne demek?', optionsTr: ['İyi değil.', 'İyi.', 'Çok iyi.', 'İyi mi?'], correctAnswerTr: 'İyi değil.', explanationTr: '"Ne" olumsuzlanan şeyin önüne gelir.', order: 4 },
    { id: 'e17', lessonId: 'l1_3', type: 'fill_blank', questionKu: 'Em kurd ____.', questionEn: 'Complete: "We are Kurdish."', correctAnswer: 'in', questionTr: 'Tamamla: "Biz Kürdüz."', order: 5 },
    { id: 'e18', lessonId: 'l1_3', type: 'translation', questionEn: 'Translate to Kurdish: "It is good."', correctAnswer: 'Baş e.', questionTr: 'Kürtçeye çevir: "İyi."', order: 6 },
  ],

  // U1L4: Review Basics
  l1_4: [
    { id: 'e19', lessonId: 'l1_4', type: 'multiple_choice', questionKu: 'Silav!', questionEn: 'What does this mean?', options: ['Hello!', 'Goodbye!', 'Thanks!', 'Sorry!'], correctAnswer: 'Hello!', questionTr: 'Bu ne demek?', optionsTr: ['Merhaba!', 'Hoşça kal!', 'Teşekkürler!', 'Özür dilerim!'], correctAnswerTr: 'Merhaba!', order: 1 },
    { id: 'e20', lessonId: 'l1_4', type: 'translation', questionEn: 'Write "thanks" in Kurdish.', correctAnswer: 'spas', questionTr: '"teşekkürler" kelimesini Kürtçe yaz.', order: 2 },
    { id: 'e21', lessonId: 'l1_4', type: 'multiple_choice', questionEn: 'How do you say "I am Kurdish"?', options: ['Ez kurd im.', 'Tu kurd î.', 'Ew kurd e.', 'Na.'], correctAnswer: 'Ez kurd im.', questionTr: '"Ben Kürdüm" nasıl denir?', optionsTr: ['Ez kurd im.', 'Tu kurd î.', 'Ew kurd e.', 'Na.'], correctAnswerTr: 'Ez kurd im.', order: 3 },
    { id: 'e22', lessonId: 'l1_4', type: 'translation', questionEn: 'Write "yes" in Kurdish.', correctAnswer: 'erê', questionTr: '"evet" kelimesini Kürtçe yaz.', order: 4 },
    { id: 'e23', lessonId: 'l1_4', type: 'multiple_choice', questionKu: 'heval', questionEn: 'What does this word mean?', options: ['friend', 'guest', 'teacher', 'city'], correctAnswer: 'friend', questionTr: 'Bu kelime ne demek?', optionsTr: ['arkadaş', 'misafir', 'öğretmen', 'şehir'], correctAnswerTr: 'arkadaş', order: 5 },
    { id: 'e24', lessonId: 'l1_4', type: 'fill_blank', questionKu: 'Ew ne kurd ____.', questionEn: 'Complete: "He is not Kurdish."', correctAnswer: 'e', questionTr: 'Tamamla: "O Kürt değil."', order: 6 },
  ],

  // U2L1: Family
  l2_1: [
    { id: 'e25', lessonId: 'l2_1', type: 'multiple_choice', questionKu: 'bav', questionEn: 'What does this word mean?', options: ['father', 'mother', 'brother', 'sister'], correctAnswer: 'father', questionTr: 'Bu kelime ne demek?', optionsTr: ['baba', 'anne', 'erkek kardeş', 'kız kardeş'], correctAnswerTr: 'baba', order: 1 },
    { id: 'e26', lessonId: 'l2_1', type: 'multiple_choice', questionEn: 'How do you say "mother" in Kurdish?', options: ['dê', 'bav', 'xwişk', 'bira'], correctAnswer: 'dê', questionTr: '"anne" Kürtçe nasıl denir?', optionsTr: ['dê', 'bav', 'xwişk', 'bira'], correctAnswerTr: 'dê', order: 2 },
    { id: 'e27', lessonId: 'l2_1', type: 'translation', questionEn: 'Write "brother" in Kurdish.', correctAnswer: 'bira', questionTr: '"erkek kardeş" kelimesini Kürtçe yaz.', order: 3 },
    { id: 'e28', lessonId: 'l2_1', type: 'multiple_choice', questionKu: 'xwişk', questionEn: 'What does this word mean?', options: ['sister', 'brother', 'daughter', 'son'], correctAnswer: 'sister', questionTr: 'Bu kelime ne demek?', optionsTr: ['kız kardeş', 'erkek kardeş', 'kız (çocuk)', 'oğul'], correctAnswerTr: 'kız kardeş', order: 4 },
    { id: 'e29', lessonId: 'l2_1', type: 'multiple_choice', questionKu: 'zarok', questionEn: 'What does this word mean?', options: ['child', 'person', 'woman', 'man'], correctAnswer: 'child', questionTr: 'Bu kelime ne demek?', optionsTr: ['çocuk', 'insan', 'kadın', 'erkek'], correctAnswerTr: 'çocuk', order: 5 },
    { id: 'e30', lessonId: 'l2_1', type: 'multiple_choice', questionKu: 'kur', questionEn: 'What does this word mean?', options: ['boy, son', 'girl, daughter', 'child', 'father'], correctAnswer: 'boy, son', questionTr: 'Bu kelime ne demek?', optionsTr: ['oğlan, oğul', 'kız, kız evlat', 'çocuk', 'baba'], correctAnswerTr: 'oğlan, oğul', order: 6 },
    { id: 'e31', lessonId: 'l2_1', type: 'translation', questionEn: 'Write "family" in Kurdish.', correctAnswer: 'malbat', questionTr: '"aile" kelimesini Kürtçe yaz.', order: 7 },
  ],

  // U2L2: People & Roles
  l2_2: [
    { id: 'e32', lessonId: 'l2_2', type: 'multiple_choice', questionKu: 'mirov', questionEn: 'What does this word mean?', options: ['person', 'family', 'friend', 'village'], correctAnswer: 'person', questionTr: 'Bu kelime ne demek?', optionsTr: ['insan', 'aile', 'arkadaş', 'köy'], correctAnswerTr: 'insan', order: 1 },
    { id: 'e33', lessonId: 'l2_2', type: 'multiple_choice', questionKu: 'jin', questionEn: 'What does this word mean?', options: ['woman, wife', 'man, husband', 'girl', 'boy'], correctAnswer: 'woman, wife', questionTr: 'Bu kelime ne demek?', optionsTr: ['kadın, eş', 'erkek, koca', 'kız', 'oğlan'], correctAnswerTr: 'kadın, eş', order: 2 },
    { id: 'e34', lessonId: 'l2_2', type: 'translation', questionEn: 'Write "man, husband" in Kurdish.', correctAnswer: 'mêr', questionTr: '"erkek, koca" kelimesini Kürtçe yaz.', order: 3 },
    { id: 'e35', lessonId: 'l2_2', type: 'multiple_choice', questionKu: 'mamoste', questionEn: 'What does this word mean?', options: ['teacher', 'student', 'doctor', 'friend'], correctAnswer: 'teacher', questionTr: 'Bu kelime ne demek?', optionsTr: ['öğretmen', 'öğrenci', 'doktor', 'arkadaş'], correctAnswerTr: 'öğretmen', order: 4 },
    { id: 'e36', lessonId: 'l2_2', type: 'multiple_choice', questionKu: 'şagirt', questionEn: 'What does this word mean?', options: ['student', 'teacher', 'youth', 'elder'], correctAnswer: 'student', questionTr: 'Bu kelime ne demek?', optionsTr: ['öğrenci', 'öğretmen', 'genç', 'yaşlı'], correctAnswerTr: 'öğrenci', order: 5 },
    { id: 'e37', lessonId: 'l2_2', type: 'translation', questionEn: 'Write "people" in Kurdish.', correctAnswer: 'xelk', questionTr: '"halk" kelimesini Kürtçe yaz.', order: 6 },
  ],

  // U2L3: My, Your, His (Grammar)
  l2_3: [
    { id: 'e38', lessonId: 'l2_3', type: 'multiple_choice', questionEn: 'How do you say "my book" in Kurdish?', options: ['kitêba min', 'kitêba te', 'kitêba wî', 'kitêba me'], correctAnswer: 'kitêba min', explanation: '"Min" = my/me. The possessor follows the noun.', questionTr: '"benim kitabım" Kürtçe nasıl denir?', optionsTr: ['kitêba min', 'kitêba te', 'kitêba wî', 'kitêba me'], correctAnswerTr: 'kitêba min', explanationTr: '"Min" = benim/beni. Sahip, isimden sonra gelir.', order: 1 },
    { id: 'e39', lessonId: 'l2_3', type: 'multiple_choice', questionKu: 'bavê min', questionEn: 'What does this phrase mean?', options: ['my father', 'your father', 'his father', 'our father'], correctAnswer: 'my father', questionTr: 'Bu ifade ne demek?', optionsTr: ['benim babam', 'senin baban', 'onun babası', 'bizim babamız'], correctAnswerTr: 'benim babam', order: 2 },
    { id: 'e40', lessonId: 'l2_3', type: 'fill_blank', questionKu: 'Mala ____ mezin e.', questionEn: 'Complete: "Your house is big."', correctAnswer: 'te', explanation: '"Te" = your (oblique of "tu").', questionTr: 'Tamamla: "Senin evin büyük."', explanationTr: '"Te" = senin ("tu" zamirinin bükümlü hali).', order: 3 },
    { id: 'e41', lessonId: 'l2_3', type: 'multiple_choice', questionEn: 'Which pair means "I" (subject) and "me/my" (object)?', options: ['ez / min', 'tu / te', 'ew / wî', 'em / me'], correctAnswer: 'ez / min', questionTr: 'Hangi çift "ben" (özne) ve "beni/benim" (nesne) demek?', optionsTr: ['ez / min', 'tu / te', 'ew / wî', 'em / me'], correctAnswerTr: 'ez / min', order: 4 },
    { id: 'e42', lessonId: 'l2_3', type: 'true_false', questionKu: 'ew = he, she, it, they', questionEn: 'Is this correct?', correctAnswer: 'True', explanation: '"Ew" covers all third persons. Gender shows only in oblique: wî (him), wê (her).', questionKuTr: 'ew = o, onlar', questionTr: 'Bu doğru mu?', explanationTr: '"Ew" tüm üçüncü şahısları kapsar. Cinsiyet yalnızca bükümlü halde görünür: wî (onu, eril), wê (onu, dişil).', order: 5 },
    { id: 'e43', lessonId: 'l2_3', type: 'translation', questionEn: 'Translate to Kurdish: "my mother"', correctAnswer: 'diya min', questionTr: 'Kürtçeye çevir: "benim annem"', order: 6 },
  ],

  // U2L4: Review People
  l2_4: [
    { id: 'r1', lessonId: 'l2_4', type: 'multiple_choice', questionKu: 'malbat', questionEn: 'What does this word mean?', options: ['family', 'village', 'house', 'people'], correctAnswer: 'family', questionTr: 'Bu kelime ne demek?', optionsTr: ['aile', 'köy', 'ev', 'halk'], correctAnswerTr: 'aile', order: 1 },
    { id: 'r2', lessonId: 'l2_4', type: 'translation', questionEn: 'Write "sister" in Kurdish.', correctAnswer: 'xwişk', questionTr: '"kız kardeş" kelimesini Kürtçe yaz.', order: 2 },
    { id: 'r3', lessonId: 'l2_4', type: 'multiple_choice', questionKu: 'Bavê min mamoste ye.', questionEn: 'What does this sentence mean?', options: ['My father is a teacher.', 'Your father is a teacher.', 'My teacher is a father.', 'His father is a student.'], correctAnswer: 'My father is a teacher.', questionTr: 'Bu cümle ne demek?', optionsTr: ['Babam öğretmen.', 'Baban öğretmen.', 'Öğretmenim bir baba.', 'Onun babası öğrenci.'], correctAnswerTr: 'Babam öğretmen.', order: 3 },
    { id: 'r4', lessonId: 'l2_4', type: 'translation', questionEn: 'Write "teacher" in Kurdish.', correctAnswer: 'mamoste', questionTr: '"öğretmen" kelimesini Kürtçe yaz.', order: 4 },
    { id: 'r5', lessonId: 'l2_4', type: 'fill_blank', questionKu: 'Kitêba ____ nû ye.', questionEn: 'Complete: "His book is new."', correctAnswer: 'wî', questionTr: 'Tamamla: "Onun kitabı yeni."', order: 5 },
    { id: 'r6', lessonId: 'l2_4', type: 'multiple_choice', questionKu: 'keç', questionEn: 'What does this word mean?', options: ['girl, daughter', 'boy, son', 'sister', 'mother'], correctAnswer: 'girl, daughter', questionTr: 'Bu kelime ne demek?', optionsTr: ['kız, kız evlat', 'oğlan, oğul', 'kız kardeş', 'anne'], correctAnswerTr: 'kız, kız evlat', order: 6 },
  ],

  // U3L1: Food & Drink
  l3_1: [
    { id: 'f1', lessonId: 'l3_1', type: 'multiple_choice', questionKu: 'nan', questionEn: 'What does this word mean?', options: ['bread', 'water', 'meat', 'milk'], correctAnswer: 'bread', questionTr: 'Bu kelime ne demek?', optionsTr: ['ekmek', 'su', 'et', 'süt'], correctAnswerTr: 'ekmek', order: 1 },
    { id: 'f2', lessonId: 'l3_1', type: 'translation', questionEn: 'Write "water" in Kurdish.', correctAnswer: 'av', questionTr: '"su" kelimesini Kürtçe yaz.', order: 2 },
    { id: 'f3', lessonId: 'l3_1', type: 'multiple_choice', questionKu: 'çay', questionEn: 'What does this word mean?', options: ['tea', 'coffee', 'water', 'milk'], correctAnswer: 'tea', questionTr: 'Bu kelime ne demek?', optionsTr: ['çay', 'kahve', 'su', 'süt'], correctAnswerTr: 'çay', order: 3 },
    { id: 'f4', lessonId: 'l3_1', type: 'multiple_choice', questionKu: 'goşt', questionEn: 'What does this word mean?', options: ['meat', 'bread', 'milk', 'cheese'], correctAnswer: 'meat', questionTr: 'Bu kelime ne demek?', optionsTr: ['et', 'ekmek', 'süt', 'peynir'], correctAnswerTr: 'et', order: 4 },
    { id: 'f5', lessonId: 'l3_1', type: 'multiple_choice', questionKu: 'şîr', questionEn: 'What does this word mean?', options: ['milk', 'sugar', 'salt', 'honey'], correctAnswer: 'milk', questionTr: 'Bu kelime ne demek?', optionsTr: ['süt', 'şeker', 'tuz', 'bal'], correctAnswerTr: 'süt', order: 5 },
    { id: 'f6', lessonId: 'l3_1', type: 'translation', questionEn: 'Write "cheese" in Kurdish.', correctAnswer: 'penîr', questionTr: '"peynir" kelimesini Kürtçe yaz.', order: 6 },
    { id: 'f7', lessonId: 'l3_1', type: 'multiple_choice', questionEn: 'How do you say "sugar" in Kurdish?', options: ['şekir', 'şîr', 'xwê', 'hingiv'], correctAnswer: 'şekir', questionTr: '"şeker" Kürtçe nasıl denir?', optionsTr: ['şekir', 'şîr', 'xwê', 'hingiv'], correctAnswerTr: 'şekir', order: 7 },
  ],

  // U3L2: Around the House
  l3_2: [
    { id: 'h1', lessonId: 'l3_2', type: 'multiple_choice', questionKu: 'mal', questionEn: 'What does this word mean?', options: ['house, home', 'room', 'door', 'window'], correctAnswer: 'house, home', questionTr: 'Bu kelime ne demek?', optionsTr: ['ev, yuva', 'oda', 'kapı', 'pencere'], correctAnswerTr: 'ev, yuva', order: 1 },
    { id: 'h2', lessonId: 'l3_2', type: 'translation', questionEn: 'Write "room" in Kurdish.', correctAnswer: 'ode', questionTr: '"oda" kelimesini Kürtçe yaz.', order: 2 },
    { id: 'h3', lessonId: 'l3_2', type: 'multiple_choice', questionKu: 'derî', questionEn: 'What does this word mean?', options: ['door', 'window', 'wall', 'roof'], correctAnswer: 'door', questionTr: 'Bu kelime ne demek?', optionsTr: ['kapı', 'pencere', 'duvar', 'çatı'], correctAnswerTr: 'kapı', order: 3 },
    { id: 'h4', lessonId: 'l3_2', type: 'multiple_choice', questionKu: 'kitêb', questionEn: 'What does this word mean?', options: ['book', 'table', 'chair', 'bed'], correctAnswer: 'book', questionTr: 'Bu kelime ne demek?', optionsTr: ['kitap', 'masa', 'sandalye', 'yatak'], correctAnswerTr: 'kitap', order: 4 },
    { id: 'h5', lessonId: 'l3_2', type: 'multiple_choice', questionKu: 'Li ser masê kitêbek heye.', questionEn: 'What does this sentence mean?', options: ['There is a book on the table.', 'The table is big.', 'I see the book.', 'The book is mine.'], correctAnswer: 'There is a book on the table.', questionTr: 'Bu cümle ne demek?', optionsTr: ['Masanın üstünde bir kitap var.', 'Masa büyük.', 'Kitabı görüyorum.', 'Kitap benim.'], correctAnswerTr: 'Masanın üstünde bir kitap var.', order: 5 },
    { id: 'h6', lessonId: 'l3_2', type: 'translation', questionEn: 'Write "fire" in Kurdish.', correctAnswer: 'agir', questionTr: '"ateş" kelimesini Kürtçe yaz.', order: 6 },
    { id: 'h7', lessonId: 'l3_2', type: 'multiple_choice', questionKu: 'pencere', questionEn: 'What does this word mean?', options: ['window', 'door', 'wall', 'floor'], correctAnswer: 'window', questionTr: 'Bu kelime ne demek?', optionsTr: ['pencere', 'kapı', 'duvar', 'zemin'], correctAnswerTr: 'pencere', order: 7 },
  ],

  // U3L3: This & That (Grammar)
  l3_3: [
    { id: 'g31', lessonId: 'l3_3', type: 'multiple_choice', questionKu: 'Ev mal e.', questionEn: 'What does this sentence mean?', options: ['This is a house.', 'That is a house.', 'The house is big.', 'My house.'], correctAnswer: 'This is a house.', explanation: '"Ev" = this/these.', questionTr: 'Bu cümle ne demek?', optionsTr: ['Bu bir ev.', 'Şu bir ev.', 'Ev büyük.', 'Benim evim.'], correctAnswerTr: 'Bu bir ev.', explanationTr: '"Ev" = bu/bunlar.', order: 1 },
    { id: 'g32', lessonId: 'l3_3', type: 'multiple_choice', questionKu: 'Ew kitêb e.', questionEn: 'What does this sentence mean?', options: ['That is a book.', 'This is a book.', 'The book is new.', 'My book.'], correctAnswer: 'That is a book.', explanation: '"Ew" = that/those.', questionTr: 'Bu cümle ne demek?', optionsTr: ['Şu bir kitap.', 'Bu bir kitap.', 'Kitap yeni.', 'Benim kitabım.'], correctAnswerTr: 'Şu bir kitap.', explanationTr: '"Ew" = şu/şunlar.', order: 2 },
    { id: 'g33', lessonId: 'l3_3', type: 'fill_blank', questionKu: '____ mase ye.', questionEn: 'Complete: "This is a table."', correctAnswer: 'Ev', questionTr: 'Tamamla: "Bu bir masa."', order: 3 },
    { id: 'g34', lessonId: 'l3_3', type: 'multiple_choice', questionEn: 'How do you say "These are houses" in Kurdish?', options: ['Ev xanî ne.', 'Ew xanî ne.', 'Ev xanî ye.', 'Ew mal e.'], correctAnswer: 'Ev xanî ne.', explanation: '"Ne" is the plural copula for "are."', questionTr: '"Bunlar evler" Kürtçe nasıl denir?', optionsTr: ['Ev xanî ne.', 'Ew xanî ne.', 'Ev xanî ye.', 'Ew mal e.'], correctAnswerTr: 'Ev xanî ne.', explanationTr: '"Ne", "…dirler" anlamındaki çoğul ek-fiildir.', order: 4 },
    { id: 'g35', lessonId: 'l3_3', type: 'true_false', questionKu: 'ev = that, ew = this', questionEn: 'Is this correct?', correctAnswer: 'False', explanation: '"Ev" = this/these, "ew" = that/those.', questionKuTr: 'ev = şu, ew = bu', questionTr: 'Bu doğru mu?', explanationTr: '"Ev" = bu/bunlar, "ew" = şu/şunlar.', order: 5 },
    { id: 'g36', lessonId: 'l3_3', type: 'translation', questionEn: 'Translate to Kurdish: "This is good."', correctAnswer: 'Ev baş e.', questionTr: 'Kürtçeye çevir: "Bu iyi."', order: 6 },
  ],

  // U3L4: Review Everyday
  l3_4: [
    { id: 'rv1', lessonId: 'l3_4', type: 'translation', questionEn: 'Write "bread" in Kurdish.', correctAnswer: 'nan', questionTr: '"ekmek" kelimesini Kürtçe yaz.', order: 1 },
    { id: 'rv2', lessonId: 'l3_4', type: 'multiple_choice', questionKu: 'av', questionEn: 'What does this word mean?', options: ['water', 'fire', 'milk', 'tea'], correctAnswer: 'water', questionTr: 'Bu kelime ne demek?', optionsTr: ['su', 'ateş', 'süt', 'çay'], correctAnswerTr: 'su', order: 2 },
    { id: 'rv3', lessonId: 'l3_4', type: 'multiple_choice', questionKu: 'Ev çay e.', questionEn: 'What does this sentence mean?', options: ['This is tea.', 'That is tea.', 'Tea is good.', 'I want tea.'], correctAnswer: 'This is tea.', questionTr: 'Bu cümle ne demek?', optionsTr: ['Bu çay.', 'Şu çay.', 'Çay iyi.', 'Çay istiyorum.'], correctAnswerTr: 'Bu çay.', order: 3 },
    { id: 'rv4', lessonId: 'l3_4', type: 'translation', questionEn: 'Write "house" in Kurdish.', correctAnswer: 'mal', questionTr: '"ev" kelimesini Kürtçe yaz.', order: 4 },
    { id: 'rv5', lessonId: 'l3_4', type: 'multiple_choice', questionKu: 'mase', questionEn: 'What does this word mean?', options: ['table', 'chair', 'door', 'book'], correctAnswer: 'table', questionTr: 'Bu kelime ne demek?', optionsTr: ['masa', 'sandalye', 'kapı', 'kitap'], correctAnswerTr: 'masa', order: 5 },
    { id: 'rv6', lessonId: 'l3_4', type: 'fill_blank', questionKu: '____ nan e.', questionEn: 'Complete: "That is bread."', correctAnswer: 'Ew', questionTr: 'Tamamla: "Şu ekmek."', order: 6 },
  ],

  // ===== COURSE 2: BUILDING SENTENCES =====

  // U4L1: Colors
  l4_1: [
    { id: 'c1', lessonId: 'l4_1', type: 'multiple_choice', questionKu: 'sor', questionEn: 'What does this word mean?', options: ['red', 'blue', 'green', 'yellow'], correctAnswer: 'red', questionTr: 'Bu kelime ne demek?', optionsTr: ['kırmızı', 'mavi', 'yeşil', 'sarı'], correctAnswerTr: 'kırmızı', order: 1 },
    { id: 'c2', lessonId: 'l4_1', type: 'multiple_choice', questionKu: 'reş', questionEn: 'What does this word mean?', options: ['black', 'white', 'red', 'green'], correctAnswer: 'black', questionTr: 'Bu kelime ne demek?', optionsTr: ['siyah', 'beyaz', 'kırmızı', 'yeşil'], correctAnswerTr: 'siyah', order: 2 },
    { id: 'c3', lessonId: 'l4_1', type: 'translation', questionEn: 'Write "green" in Kurdish.', correctAnswer: 'kesk', questionTr: '"yeşil" kelimesini Kürtçe yaz.', order: 3 },
    { id: 'c4', lessonId: 'l4_1', type: 'multiple_choice', questionKu: 'spî', questionEn: 'What does this word mean?', options: ['white', 'black', 'yellow', 'blue'], correctAnswer: 'white', questionTr: 'Bu kelime ne demek?', optionsTr: ['beyaz', 'siyah', 'sarı', 'mavi'], correctAnswerTr: 'beyaz', order: 4 },
    { id: 'c5', lessonId: 'l4_1', type: 'translation', questionEn: 'Write "yellow" in Kurdish.', correctAnswer: 'zer', questionTr: '"sarı" kelimesini Kürtçe yaz.', order: 5 },
    { id: 'c6', lessonId: 'l4_1', type: 'multiple_choice', questionEn: 'How do you say "blue" in Kurdish?', options: ['şîn', 'sor', 'zer', 'kesk'], correctAnswer: 'şîn', questionTr: '"mavi" Kürtçe nasıl denir?', order: 6 },
  ],

  // U4L2: Size & Quality
  l4_2: [
    { id: 'd1', lessonId: 'l4_2', type: 'multiple_choice', questionKu: 'mezin', questionEn: 'What does this word mean?', options: ['big, great', 'small', 'tall', 'short'], correctAnswer: 'big, great', questionTr: 'Bu kelime ne demek?', optionsTr: ['büyük, ulu', 'küçük', 'uzun', 'kısa'], correctAnswerTr: 'büyük, ulu', order: 1 },
    { id: 'd2', lessonId: 'l4_2', type: 'multiple_choice', questionKu: 'biçûk', questionEn: 'What does this word mean?', options: ['small, little', 'big', 'long', 'new'], correctAnswer: 'small, little', questionTr: 'Bu kelime ne demek?', optionsTr: ['küçük, ufak', 'büyük', 'uzun', 'yeni'], correctAnswerTr: 'küçük, ufak', order: 2 },
    { id: 'd3', lessonId: 'l4_2', type: 'translation', questionEn: 'Write "new" in Kurdish.', correctAnswer: 'nû', questionTr: '"yeni" kelimesini Kürtçe yaz.', order: 3 },
    { id: 'd4', lessonId: 'l4_2', type: 'multiple_choice', questionKu: 'bilind', questionEn: 'What does this word mean?', options: ['high, tall', 'short', 'deep', 'wide'], correctAnswer: 'high, tall', questionTr: 'Bu kelime ne demek?', optionsTr: ['yüksek, uzun', 'kısa', 'derin', 'geniş'], correctAnswerTr: 'yüksek, uzun', order: 4 },
    { id: 'd5', lessonId: 'l4_2', type: 'multiple_choice', questionKu: 'xweş', questionEn: 'What does this word mean?', options: ['nice, pleasant', 'ugly', 'big', 'cold'], correctAnswer: 'nice, pleasant', questionTr: 'Bu kelime ne demek?', optionsTr: ['hoş, güzel', 'çirkin', 'büyük', 'soğuk'], correctAnswerTr: 'hoş, güzel', order: 5 },
    { id: 'd6', lessonId: 'l4_2', type: 'translation', questionEn: 'Write "old, ancient" in Kurdish.', correctAnswer: 'kevin', questionTr: '"eski, kadim" kelimesini Kürtçe yaz.', order: 6 },
    { id: 'd7', lessonId: 'l4_2', type: 'multiple_choice', questionKu: 'germ', questionEn: 'What does this word mean?', options: ['warm, hot', 'cold', 'big', 'nice'], correctAnswer: 'warm, hot', questionTr: 'Bu kelime ne demek?', optionsTr: ['sıcak, ılık', 'soğuk', 'büyük', 'hoş'], correctAnswerTr: 'sıcak, ılık', order: 7 },
  ],

  // U4L3: The Big House (Grammar - Construct)
  l4_3: [
    { id: 'gc1', lessonId: 'l4_3', type: 'multiple_choice', questionKu: 'mirovê mezin', questionEn: 'What does this phrase mean?', options: ['the big man', 'the small man', 'a big house', 'the new book'], correctAnswer: 'the big man', explanation: 'Adjectives follow the noun. Masculine nouns take "-ê" before adjectives.', questionTr: 'Bu ifade ne demek?', optionsTr: ['büyük adam', 'küçük adam', 'büyük bir ev', 'yeni kitap'], correctAnswerTr: 'büyük adam', explanationTr: 'Sıfatlar isimden sonra gelir. Eril isimler sıfattan önce "-ê" alır.', order: 1 },
    { id: 'gc2', lessonId: 'l4_3', type: 'multiple_choice', questionKu: 'kitêba nû', questionEn: 'What does this phrase mean?', options: ['the new book', 'the old book', 'the big book', 'my book'], correctAnswer: 'the new book', explanation: 'Feminine nouns take "-a" before adjectives.', questionTr: 'Bu ifade ne demek?', optionsTr: ['yeni kitap', 'eski kitap', 'büyük kitap', 'benim kitabım'], correctAnswerTr: 'yeni kitap', explanationTr: 'Dişil isimler sıfattan önce "-a" alır.', order: 2 },
    { id: 'gc3', lessonId: 'l4_3', type: 'fill_blank', questionKu: 'xaniyê ____', questionEn: 'Complete: "the small house"', correctAnswer: 'biçûk', questionTr: 'Tamamla: "küçük ev"', order: 3 },
    { id: 'gc4', lessonId: 'l4_3', type: 'multiple_choice', questionEn: 'How do you say "the clean room" in Kurdish?', options: ['odeya paqij', 'odê paqij', 'paqij ode', 'ode paqij'], correctAnswer: 'odeya paqij', explanation: '"Ode" is feminine, so it becomes "odeya" before an adjective.', questionTr: '"temiz oda" Kürtçe nasıl denir?', explanationTr: '"Ode" dişildir, bu yüzden sıfattan önce "odeya" olur.', order: 4 },
    { id: 'gc5', lessonId: 'l4_3', type: 'true_false', questionKu: 'paqij ode = the clean room', questionEn: 'Is this word order correct?', correctAnswer: 'False', explanation: 'In Kurdish, adjectives follow the noun: "odeya paqij."', questionKuTr: 'paqij ode = temiz oda', questionTr: 'Bu kelime sıralaması doğru mu?', explanationTr: 'Kürtçede sıfatlar isimden sonra gelir: "odeya paqij."', order: 5 },
    { id: 'gc6', lessonId: 'l4_3', type: 'translation', questionEn: 'Translate to Kurdish: "the big house"', correctAnswer: 'xaniyê mezin', questionTr: 'Kürtçeye çevir: "büyük ev"', order: 6 },
  ],

  // U4L4: Review Descriptions
  l4_4: [
    { id: 'rd1', lessonId: 'l4_4', type: 'translation', questionEn: 'Write "red" in Kurdish.', correctAnswer: 'sor', questionTr: '"kırmızı" kelimesini Kürtçe yaz.', order: 1 },
    { id: 'rd2', lessonId: 'l4_4', type: 'multiple_choice', questionKu: 'kesk', questionEn: 'What does this word mean?', options: ['green', 'red', 'black', 'blue'], correctAnswer: 'green', questionTr: 'Bu kelime ne demek?', optionsTr: ['yeşil', 'kırmızı', 'siyah', 'mavi'], correctAnswerTr: 'yeşil', order: 2 },
    { id: 'rd3', lessonId: 'l4_4', type: 'multiple_choice', questionKu: 'xaniyê nû', questionEn: 'What does this phrase mean?', options: ['the new house', 'the old house', 'my house', 'a big house'], correctAnswer: 'the new house', questionTr: 'Bu ifade ne demek?', optionsTr: ['yeni ev', 'eski ev', 'benim evim', 'büyük bir ev'], correctAnswerTr: 'yeni ev', order: 3 },
    { id: 'rd4', lessonId: 'l4_4', type: 'translation', questionEn: 'Write "cold" in Kurdish.', correctAnswer: 'sar', questionTr: '"soğuk" kelimesini Kürtçe yaz.', order: 4 },
    { id: 'rd5', lessonId: 'l4_4', type: 'fill_blank', questionKu: 'kitêba ____', questionEn: 'Complete: "the old book"', correctAnswer: 'kevin', questionTr: 'Tamamla: "eski kitap"', order: 5 },
    { id: 'rd6', lessonId: 'l4_4', type: 'multiple_choice', questionKu: 'Ew bajarê mezin e.', questionEn: 'What does this sentence mean?', options: ['That is a big city.', 'This is a small city.', 'The city is new.', 'My city is nice.'], correctAnswer: 'That is a big city.', questionTr: 'Bu cümle ne demek?', optionsTr: ['Şu büyük bir şehir.', 'Bu küçük bir şehir.', 'Şehir yeni.', 'Şehrim güzel.'], correctAnswerTr: 'Şu büyük bir şehir.', order: 6 },
  ],

  // U5L1: Nature
  l5_1: [
    { id: 'n1', lessonId: 'l5_1', type: 'multiple_choice', questionKu: 'çiya', questionEn: 'What does this word mean?', options: ['mountain', 'river', 'lake', 'tree'], correctAnswer: 'mountain', questionTr: 'Bu kelime ne demek?', optionsTr: ['dağ', 'nehir', 'göl', 'ağaç'], correctAnswerTr: 'dağ', order: 1 },
    { id: 'n2', lessonId: 'l5_1', type: 'multiple_choice', questionKu: 'çem', questionEn: 'What does this word mean?', options: ['river', 'mountain', 'sea', 'sky'], correctAnswer: 'river', questionTr: 'Bu kelime ne demek?', optionsTr: ['nehir', 'dağ', 'deniz', 'gökyüzü'], correctAnswerTr: 'nehir', order: 2 },
    { id: 'n3', lessonId: 'l5_1', type: 'translation', questionEn: 'Write "tree" in Kurdish.', correctAnswer: 'dar', questionTr: '"ağaç" kelimesini Kürtçe yaz.', order: 3 },
    { id: 'n4', lessonId: 'l5_1', type: 'multiple_choice', questionKu: 'stêrk', questionEn: 'What does this word mean?', options: ['star', 'moon', 'sun', 'sky'], correctAnswer: 'star', questionTr: 'Bu kelime ne demek?', optionsTr: ['yıldız', 'ay', 'güneş', 'gökyüzü'], correctAnswerTr: 'yıldız', order: 4 },
    { id: 'n5', lessonId: 'l5_1', type: 'translation', questionEn: 'Write "sun" in Kurdish.', correctAnswer: 'roj', questionTr: '"güneş" kelimesini Kürtçe yaz.', order: 5 },
    { id: 'n6', lessonId: 'l5_1', type: 'multiple_choice', questionKu: 'heyv', questionEn: 'What does this word mean?', options: ['moon', 'star', 'earth', 'cloud'], correctAnswer: 'moon', questionTr: 'Bu kelime ne demek?', optionsTr: ['ay', 'yıldız', 'dünya', 'bulut'], correctAnswerTr: 'ay', order: 6 },
    { id: 'n7', lessonId: 'l5_1', type: 'multiple_choice', questionEn: 'How do you say "lake" in Kurdish?', options: ['gol', 'çem', 'derya', 'av'], correctAnswer: 'gol', questionTr: '"göl" Kürtçe nasıl denir?', order: 7 },
  ],

  // U5L2: Animals
  l5_2: [
    { id: 'a1', lessonId: 'l5_2', type: 'multiple_choice', questionKu: 'gur', questionEn: 'What does this word mean?', options: ['wolf', 'dog', 'fox', 'bear'], correctAnswer: 'wolf', questionTr: 'Bu kelime ne demek?', optionsTr: ['kurt', 'köpek', 'tilki', 'ayı'], correctAnswerTr: 'kurt', order: 1 },
    { id: 'a2', lessonId: 'l5_2', type: 'multiple_choice', questionKu: 'hesp', questionEn: 'What does this word mean?', options: ['horse', 'donkey', 'cow', 'sheep'], correctAnswer: 'horse', questionTr: 'Bu kelime ne demek?', optionsTr: ['at', 'eşek', 'inek', 'koyun'], correctAnswerTr: 'at', order: 2 },
    { id: 'a3', lessonId: 'l5_2', type: 'translation', questionEn: 'Write "dog" in Kurdish.', correctAnswer: 'se', questionTr: '"köpek" kelimesini Kürtçe yaz.', order: 3 },
    { id: 'a4', lessonId: 'l5_2', type: 'multiple_choice', questionKu: 'pisîk', questionEn: 'What does this word mean?', options: ['cat', 'bird', 'snake', 'fish'], correctAnswer: 'cat', questionTr: 'Bu kelime ne demek?', optionsTr: ['kedi', 'kuş', 'yılan', 'balık'], correctAnswerTr: 'kedi', order: 4 },
    { id: 'a5', lessonId: 'l5_2', type: 'multiple_choice', questionEn: 'How do you say "bird" in Kurdish?', options: ['teyr', 'mar', 'mî', 'kew'], correctAnswer: 'teyr', questionTr: '"kuş" Kürtçe nasıl denir?', order: 5 },
    { id: 'a6', lessonId: 'l5_2', type: 'translation', questionEn: 'Write "fox" in Kurdish.', correctAnswer: 'rêvî', questionTr: '"tilki" kelimesini Kürtçe yaz.', order: 6 },
    { id: 'a7', lessonId: 'l5_2', type: 'multiple_choice', questionKu: 'mar', questionEn: 'What does this word mean?', options: ['snake', 'wolf', 'horse', 'goat'], correctAnswer: 'snake', questionTr: 'Bu kelime ne demek?', optionsTr: ['yılan', 'kurt', 'at', 'keçi'], correctAnswerTr: 'yılan', order: 7 },
  ],

  // U5L3: Seasons & Weather
  l5_3: [
    { id: 's1', lessonId: 'l5_3', type: 'multiple_choice', questionKu: 'bihar', questionEn: 'What does this word mean?', options: ['spring', 'summer', 'autumn', 'winter'], correctAnswer: 'spring', questionTr: 'Bu kelime ne demek?', optionsTr: ['ilkbahar', 'yaz', 'sonbahar', 'kış'], correctAnswerTr: 'ilkbahar', order: 1 },
    { id: 's2', lessonId: 'l5_3', type: 'multiple_choice', questionKu: 'havîn', questionEn: 'What does this word mean?', options: ['summer', 'spring', 'winter', 'autumn'], correctAnswer: 'summer', questionTr: 'Bu kelime ne demek?', optionsTr: ['yaz', 'ilkbahar', 'kış', 'sonbahar'], correctAnswerTr: 'yaz', order: 2 },
    { id: 's3', lessonId: 'l5_3', type: 'translation', questionEn: 'Write "winter" in Kurdish.', correctAnswer: 'zivistan', questionTr: '"kış" kelimesini Kürtçe yaz.', order: 3 },
    { id: 's4', lessonId: 'l5_3', type: 'multiple_choice', questionKu: 'berf', questionEn: 'What does this word mean?', options: ['snow', 'rain', 'wind', 'sun'], correctAnswer: 'snow', questionTr: 'Bu kelime ne demek?', optionsTr: ['kar', 'yağmur', 'rüzgar', 'güneş'], correctAnswerTr: 'kar', order: 4 },
    { id: 's5', lessonId: 'l5_3', type: 'translation', questionEn: 'Write "rain" in Kurdish.', correctAnswer: 'baran', questionTr: '"yağmur" kelimesini Kürtçe yaz.', order: 5 },
    { id: 's6', lessonId: 'l5_3', type: 'multiple_choice', questionKu: 'ba', questionEn: 'What does this word mean?', options: ['wind', 'rain', 'snow', 'cloud'], correctAnswer: 'wind', questionTr: 'Bu kelime ne demek?', optionsTr: ['rüzgar', 'yağmur', 'kar', 'bulut'], correctAnswerTr: 'rüzgar', order: 6 },
  ],

  // U5L4: Review Nature
  l5_4: [
    { id: 'rn1', lessonId: 'l5_4', type: 'translation', questionEn: 'Write "mountain" in Kurdish.', correctAnswer: 'çiya', questionTr: '"dağ" kelimesini Kürtçe yaz.', order: 1 },
    { id: 'rn2', lessonId: 'l5_4', type: 'multiple_choice', questionKu: 'Çiyayên Kurdistanê bilind in.', questionEn: 'What does this sentence mean?', options: ['The mountains of Kurdistan are high.', 'Kurdistan has rivers.', 'The villages are small.', 'The trees are green.'], correctAnswer: 'The mountains of Kurdistan are high.', questionTr: 'Bu cümle ne demek?', optionsTr: ['Kurdistan’ın dağları yüksektir.', 'Kurdistan’ın nehirleri var.', 'Köyler küçük.', 'Ağaçlar yeşil.'], correctAnswerTr: 'Kurdistan’ın dağları yüksektir.', order: 2 },
    { id: 'rn3', lessonId: 'l5_4', type: 'multiple_choice', questionKu: 'gur', questionEn: 'What does this word mean?', options: ['wolf', 'fox', 'dog', 'horse'], correctAnswer: 'wolf', questionTr: 'Bu kelime ne demek?', optionsTr: ['kurt', 'tilki', 'köpek', 'at'], correctAnswerTr: 'kurt', order: 3 },
    { id: 'rn4', lessonId: 'l5_4', type: 'translation', questionEn: 'Write "autumn" in Kurdish.', correctAnswer: 'payîz', questionTr: '"sonbahar" kelimesini Kürtçe yaz.', order: 4 },
    { id: 'rn5', lessonId: 'l5_4', type: 'multiple_choice', questionKu: 'dar', questionEn: 'What does this word mean?', options: ['tree', 'stone', 'grass', 'flower'], correctAnswer: 'tree', questionTr: 'Bu kelime ne demek?', optionsTr: ['ağaç', 'taş', 'çimen', 'çiçek'], correctAnswerTr: 'ağaç', order: 5 },
    { id: 'rn6', lessonId: 'l5_4', type: 'fill_blank', questionKu: '____ dibare.', questionEn: 'Complete: "It is raining." (rain = baran)', correctAnswer: 'Baran', questionTr: 'Tamamla: "Yağmur yağıyor." (yağmur = baran)', order: 6 },
  ],

  // U6L1: Numbers 1-10
  l6_1: [
    { id: 'nm1', lessonId: 'l6_1', type: 'multiple_choice', questionKu: 'yek', questionEn: 'What number is this?', options: ['1', '2', '3', '4'], correctAnswer: '1', questionTr: 'Bu hangi sayı?', order: 1 },
    { id: 'nm2', lessonId: 'l6_1', type: 'translation', questionEn: 'Write "two" in Kurdish.', correctAnswer: 'du', questionTr: '"iki" kelimesini Kürtçe yaz.', order: 2 },
    { id: 'nm3', lessonId: 'l6_1', type: 'multiple_choice', questionKu: 'pênc', questionEn: 'What number is this?', options: ['5', '4', '6', '3'], correctAnswer: '5', questionTr: 'Bu hangi sayı?', order: 3 },
    { id: 'nm4', lessonId: 'l6_1', type: 'translation', questionEn: 'Write "seven" in Kurdish.', correctAnswer: 'heft', questionTr: '"yedi" kelimesini Kürtçe yaz.', order: 4 },
    { id: 'nm5', lessonId: 'l6_1', type: 'multiple_choice', questionEn: 'How do you say "ten" in Kurdish?', options: ['deh', 'neh', 'heşt', 'şeş'], correctAnswer: 'deh', questionTr: '"on" Kürtçe nasıl denir?', order: 5 },
    { id: 'nm6', lessonId: 'l6_1', type: 'multiple_choice', questionKu: 'heşt', questionEn: 'What number is this?', options: ['8', '7', '9', '6'], correctAnswer: '8', questionTr: 'Bu hangi sayı?', order: 6 },
    { id: 'nm7', lessonId: 'l6_1', type: 'translation', questionEn: 'Write "four" in Kurdish.', correctAnswer: 'çar', questionTr: '"dört" kelimesini Kürtçe yaz.', order: 7 },
  ],

  // U6L2: Numbers 11-100
  l6_2: [
    { id: 'nm8', lessonId: 'l6_2', type: 'multiple_choice', questionKu: 'bîst', questionEn: 'What number is this?', options: ['20', '30', '10', '50'], correctAnswer: '20', questionTr: 'Bu hangi sayı?', order: 1 },
    { id: 'nm9', lessonId: 'l6_2', type: 'translation', questionEn: 'Write "thirty" in Kurdish.', correctAnswer: 'sî', questionTr: '"otuz" kelimesini Kürtçe yaz.', order: 2 },
    { id: 'nm10', lessonId: 'l6_2', type: 'multiple_choice', questionKu: 'çil', questionEn: 'What number is this?', options: ['40', '50', '30', '60'], correctAnswer: '40', questionTr: 'Bu hangi sayı?', order: 3 },
    { id: 'nm11', lessonId: 'l6_2', type: 'multiple_choice', questionEn: 'How do you say "100" in Kurdish?', options: ['sed', 'hezar', 'nod', 'pêncî'], correctAnswer: 'sed', questionTr: '"100" Kürtçe nasıl denir?', order: 4 },
    { id: 'nm12', lessonId: 'l6_2', type: 'translation', questionEn: 'Write "fifty" in Kurdish.', correctAnswer: 'pêncî', questionTr: '"elli" kelimesini Kürtçe yaz.', order: 5 },
    { id: 'nm13', lessonId: 'l6_2', type: 'multiple_choice', questionKu: 'hezar', questionEn: 'What number is this?', options: ['1000', '100', '500', '200'], correctAnswer: '1000', questionTr: 'Bu hangi sayı?', order: 6 },
  ],

  // U6L3: Days & Months
  l6_3: [
    { id: 'dm1', lessonId: 'l6_3', type: 'multiple_choice', questionKu: 'roj', questionEn: 'What does this word mean?', options: ['day', 'night', 'week', 'month'], correctAnswer: 'day', questionTr: 'Bu kelime ne demek?', optionsTr: ['gün', 'gece', 'hafta', 'ay'], correctAnswerTr: 'gün', order: 1 },
    { id: 'dm2', lessonId: 'l6_3', type: 'multiple_choice', questionKu: 'şev', questionEn: 'What does this word mean?', options: ['night', 'day', 'morning', 'evening'], correctAnswer: 'night', questionTr: 'Bu kelime ne demek?', optionsTr: ['gece', 'gün', 'sabah', 'akşam'], correctAnswerTr: 'gece', order: 2 },
    { id: 'dm3', lessonId: 'l6_3', type: 'translation', questionEn: 'Write "week" in Kurdish.', correctAnswer: 'hefte', questionTr: '"hafta" kelimesini Kürtçe yaz.', order: 3 },
    { id: 'dm4', lessonId: 'l6_3', type: 'multiple_choice', questionKu: 'în', questionEn: 'What day of the week is this?', options: ['Friday', 'Saturday', 'Sunday', 'Monday'], correctAnswer: 'Friday', questionTr: 'Bu hangi haftanın günü?', optionsTr: ['Cuma', 'Cumartesi', 'Pazar', 'Pazartesi'], correctAnswerTr: 'Cuma', order: 4 },
    { id: 'dm5', lessonId: 'l6_3', type: 'multiple_choice', questionEn: 'How do you say "today" in Kurdish?', options: ['îro', 'duh', 'sibeh', 'niha'], correctAnswer: 'îro', questionTr: '"bugün" Kürtçe nasıl denir?', order: 5 },
    { id: 'dm6', lessonId: 'l6_3', type: 'translation', questionEn: 'Write "year" in Kurdish.', correctAnswer: 'sal', questionTr: '"yıl" kelimesini Kürtçe yaz.', order: 6 },
    { id: 'dm7', lessonId: 'l6_3', type: 'multiple_choice', questionKu: 'sibeh', questionEn: 'What does this word mean?', options: ['morning; tomorrow', 'evening', 'night', 'today'], correctAnswer: 'morning; tomorrow', questionTr: 'Bu kelime ne demek?', optionsTr: ['sabah; yarın', 'akşam', 'gece', 'bugün'], correctAnswerTr: 'sabah; yarın', order: 7 },
  ],

  // U6L4: Review Numbers
  l6_4: [
    { id: 'rnm1', lessonId: 'l6_4', type: 'translation', questionEn: 'Write "three" in Kurdish.', correctAnswer: 'sê', questionTr: '"üç" kelimesini Kürtçe yaz.', order: 1 },
    { id: 'rnm2', lessonId: 'l6_4', type: 'multiple_choice', questionKu: 'neh', questionEn: 'What number is this?', options: ['9', '8', '7', '10'], correctAnswer: '9', questionTr: 'Bu hangi sayı?', order: 2 },
    { id: 'rnm3', lessonId: 'l6_4', type: 'multiple_choice', questionKu: 'duh', questionEn: 'What does this word mean?', options: ['yesterday', 'today', 'tomorrow', 'now'], correctAnswer: 'yesterday', questionTr: 'Bu kelime ne demek?', optionsTr: ['dün', 'bugün', 'yarın', 'şimdi'], correctAnswerTr: 'dün', order: 3 },
    { id: 'rnm4', lessonId: 'l6_4', type: 'translation', questionEn: 'Write "night" in Kurdish.', correctAnswer: 'şev', questionTr: '"gece" kelimesini Kürtçe yaz.', order: 4 },
    { id: 'rnm5', lessonId: 'l6_4', type: 'multiple_choice', questionKu: 'sed', questionEn: 'What number is this?', options: ['100', '1000', '50', '90'], correctAnswer: '100', questionTr: 'Bu hangi sayı?', order: 5 },
    { id: 'rnm6', lessonId: 'l6_4', type: 'multiple_choice', questionEn: 'How do you say "now" in Kurdish?', options: ['niha', 'îro', 'duh', 'zû'], correctAnswer: 'niha', questionTr: '"şimdi" Kürtçe nasıl denir?', order: 6 },
  ],

  // ===== COURSE 3: ACTIONS & VERBS =====

  // U7L1: Go & Come
  l7_1: [
    { id: 'v1', lessonId: 'l7_1', type: 'multiple_choice', questionKu: 'çûn', questionEn: 'What does this verb mean?', options: ['to go', 'to come', 'to see', 'to eat'], correctAnswer: 'to go', questionTr: 'Bu fiil ne demek?', optionsTr: ['gitmek', 'gelmek', 'görmek', 'yemek'], correctAnswerTr: 'gitmek', order: 1 },
    { id: 'v2', lessonId: 'l7_1', type: 'multiple_choice', questionKu: 'hatin', questionEn: 'What does this verb mean?', options: ['to come', 'to go', 'to stay', 'to give'], correctAnswer: 'to come', questionTr: 'Bu fiil ne demek?', optionsTr: ['gelmek', 'gitmek', 'kalmak', 'vermek'], correctAnswerTr: 'gelmek', order: 2 },
    { id: 'v3', lessonId: 'l7_1', type: 'translation', questionEn: 'Write "to stay, remain" in Kurdish.', correctAnswer: 'man', questionTr: '"kalmak" kelimesini Kürtçe yaz.', order: 3 },
    { id: 'v4', lessonId: 'l7_1', type: 'multiple_choice', questionKu: 'meşiyan', questionEn: 'What does this verb mean?', options: ['to walk', 'to run', 'to go', 'to sit'], correctAnswer: 'to walk', questionTr: 'Bu fiil ne demek?', optionsTr: ['yürümek', 'koşmak', 'gitmek', 'oturmak'], correctAnswerTr: 'yürümek', order: 4 },
    { id: 'v5', lessonId: 'l7_1', type: 'multiple_choice', questionKu: 'rûniştin', questionEn: 'What does this verb mean?', options: ['to sit', 'to stand', 'to walk', 'to go'], correctAnswer: 'to sit', questionTr: 'Bu fiil ne demek?', optionsTr: ['oturmak', 'ayakta durmak', 'yürümek', 'gitmek'], correctAnswerTr: 'oturmak', order: 5 },
    { id: 'v6', lessonId: 'l7_1', type: 'translation', questionEn: 'Write "to get up, rise" in Kurdish.', correctAnswer: 'rabûn', questionTr: '"kalkmak, ayağa kalkmak" kelimesini Kürtçe yaz.', order: 6 },
  ],

  // U7L2: Eat, Drink, See
  l7_2: [
    { id: 'v7', lessonId: 'l7_2', type: 'multiple_choice', questionKu: 'xwarin', questionEn: 'What does this verb mean?', options: ['to eat', 'to drink', 'to see', 'to say'], correctAnswer: 'to eat', questionTr: 'Bu fiil ne demek?', optionsTr: ['yemek', 'içmek', 'görmek', 'söylemek'], correctAnswerTr: 'yemek', order: 1 },
    { id: 'v8', lessonId: 'l7_2', type: 'multiple_choice', questionKu: 'vexwarin', questionEn: 'What does this verb mean?', options: ['to drink', 'to eat', 'to give', 'to take'], correctAnswer: 'to drink', questionTr: 'Bu fiil ne demek?', optionsTr: ['içmek', 'yemek', 'vermek', 'almak'], correctAnswerTr: 'içmek', order: 2 },
    { id: 'v9', lessonId: 'l7_2', type: 'translation', questionEn: 'Write "to see" in Kurdish.', correctAnswer: 'dîtin', questionTr: '"görmek" kelimesini Kürtçe yaz.', order: 3 },
    { id: 'v10', lessonId: 'l7_2', type: 'multiple_choice', questionKu: 'zanîn', questionEn: 'What does this verb mean?', options: ['to know', 'to see', 'to want', 'to do'], correctAnswer: 'to know', questionTr: 'Bu fiil ne demek?', optionsTr: ['bilmek', 'görmek', 'istemek', 'yapmak'], correctAnswerTr: 'bilmek', order: 4 },
    { id: 'v11', lessonId: 'l7_2', type: 'multiple_choice', questionKu: 'gotin', questionEn: 'What does this verb mean?', options: ['to say', 'to hear', 'to know', 'to read'], correctAnswer: 'to say', questionTr: 'Bu fiil ne demek?', optionsTr: ['söylemek', 'duymak', 'bilmek', 'okumak'], correctAnswerTr: 'söylemek', order: 5 },
    { id: 'v12', lessonId: 'l7_2', type: 'translation', questionEn: 'Write "to read, study" in Kurdish.', correctAnswer: 'xwendin', questionTr: '"okumak, ders çalışmak" kelimesini Kürtçe yaz.', order: 6 },
    { id: 'v13', lessonId: 'l7_2', type: 'multiple_choice', questionKu: 'bihîstin', questionEn: 'What does this verb mean?', options: ['to hear', 'to see', 'to say', 'to know'], correctAnswer: 'to hear', questionTr: 'Bu fiil ne demek?', optionsTr: ['duymak', 'görmek', 'söylemek', 'bilmek'], correctAnswerTr: 'duymak', order: 7 },
  ],

  // U7L3: I go, You come (Grammar - Present Tense)
  l7_3: [
    { id: 'gv1', lessonId: 'l7_3', type: 'multiple_choice', questionKu: 'Ez diçim.', questionEn: 'What does this sentence mean?', options: ['I go. / I am going.', 'I come.', 'I see.', 'I eat.'], correctAnswer: 'I go. / I am going.', explanation: 'Present tense: "di-" prefix + stem + personal ending. çûn → ç- → diçim.', questionTr: 'Bu cümle ne demek?', optionsTr: ['Giderim. / Gidiyorum.', 'Gelirim.', 'Görürüm.', 'Yerim.'], correctAnswerTr: 'Giderim. / Gidiyorum.', explanationTr: 'Geniş/şimdiki zaman: "di-" öneki + kök + kişi eki. çûn → ç- → diçim.', order: 1 },
    { id: 'gv2', lessonId: 'l7_3', type: 'multiple_choice', questionKu: 'Tu têyî.', questionEn: 'What does this sentence mean?', options: ['You come.', 'You go.', 'You eat.', 'You see.'], correctAnswer: 'You come.', explanation: 'Hatin has an irregular present: têm, têyî, tê, tên.', questionTr: 'Bu cümle ne demek?', optionsTr: ['Gelirsin.', 'Gidersin.', 'Yersin.', 'Görürsün.'], correctAnswerTr: 'Gelirsin.', explanationTr: 'Hatin düzensiz geniş zamana sahiptir: têm, têyî, tê, tên.', order: 2 },
    { id: 'gv3', lessonId: 'l7_3', type: 'fill_blank', questionKu: 'Ew ____.',  questionEn: 'Complete: "He/She goes." (çûn → diç-)', correctAnswer: 'diçe', questionTr: 'Tamamla: "O gider." (çûn → diç-)', order: 3 },
    { id: 'gv4', lessonId: 'l7_3', type: 'multiple_choice', questionKu: 'Em naçin.', questionEn: 'What does this sentence mean?', options: ['We do not go.', 'We go.', 'We come.', 'We do not come.'], correctAnswer: 'We do not go.', explanation: 'Negative present replaces "di-" with "na-".', questionTr: 'Bu cümle ne demek?', optionsTr: ['Gitmeyiz.', 'Gideriz.', 'Geliriz.', 'Gelmeyiz.'], correctAnswerTr: 'Gitmeyiz.', explanationTr: 'Olumsuz geniş zaman "di-" yerine "na-" alır.', order: 4 },
    { id: 'gv5', lessonId: 'l7_3', type: 'multiple_choice', questionKu: 'Ez te dibînim.', questionEn: 'What does this sentence mean?', options: ['I see you.', 'You see me.', 'I know you.', 'You know me.'], correctAnswer: 'I see you.', explanation: 'dîtin → bîn- → dibînim. "Te" = you (object).', questionTr: 'Bu cümle ne demek?', optionsTr: ['Seni görüyorum.', 'Beni görüyorsun.', 'Seni tanıyorum.', 'Beni tanıyorsun.'], correctAnswerTr: 'Seni görüyorum.', explanationTr: 'dîtin → bîn- → dibînim. "Te" = sen (nesne).', order: 5 },
    { id: 'gv6', lessonId: 'l7_3', type: 'fill_blank', questionKu: 'Ez dizanim.', questionEn: 'This means: "I ____."', correctAnswer: 'know', questionTr: 'Bu şu demek: "____."', correctAnswerTr: 'biliyorum', order: 6 },
  ],

  // U7L4: Review Verbs
  l7_4: [
    { id: 'rv1b', lessonId: 'l7_4', type: 'translation', questionEn: 'Write "to go" in Kurdish.', correctAnswer: 'çûn', questionTr: '"gitmek" kelimesini Kürtçe yaz.', order: 1 },
    { id: 'rv2b', lessonId: 'l7_4', type: 'multiple_choice', questionKu: 'Ez avê vedixwim.', questionEn: 'What does this sentence mean?', options: ['I drink water.', 'I eat bread.', 'I see water.', 'I want water.'], correctAnswer: 'I drink water.', questionTr: 'Bu cümle ne demek?', optionsTr: ['Su içiyorum.', 'Ekmek yiyorum.', 'Su görüyorum.', 'Su istiyorum.'], correctAnswerTr: 'Su içiyorum.', order: 2 },
    { id: 'rv3b', lessonId: 'l7_4', type: 'multiple_choice', questionKu: 'kirin', questionEn: 'What does this verb mean?', options: ['to do, to make', 'to go', 'to come', 'to give'], correctAnswer: 'to do, to make', questionTr: 'Bu fiil ne demek?', optionsTr: ['yapmak, etmek', 'gitmek', 'gelmek', 'vermek'], correctAnswerTr: 'yapmak, etmek', order: 3 },
    { id: 'rv4b', lessonId: 'l7_4', type: 'translation', questionEn: 'Write "to come" in Kurdish.', correctAnswer: 'hatin', questionTr: '"gelmek" kelimesini Kürtçe yaz.', order: 4 },
    { id: 'rv5b', lessonId: 'l7_4', type: 'multiple_choice', questionKu: 'Ew tê.', questionEn: 'What does this sentence mean?', options: ['He/She comes.', 'He/She goes.', 'He/She eats.', 'He/She sees.'], correctAnswer: 'He/She comes.', questionTr: 'Bu cümle ne demek?', optionsTr: ['O gelir.', 'O gider.', 'O yer.', 'O görür.'], correctAnswerTr: 'O gelir.', order: 5 },
    { id: 'rv6b', lessonId: 'l7_4', type: 'fill_blank', questionKu: 'Ez ____.', questionEn: 'Complete: "I am going." (çûn)', correctAnswer: 'diçim', questionTr: 'Tamamla: "Gidiyorum." (çûn)', order: 6 },
  ],

  // U8L1: More Verbs
  l8_1: [
    { id: 'mv1', lessonId: 'l8_1', type: 'multiple_choice', questionKu: 'nivîsandin', questionEn: 'What does this verb mean?', options: ['to write', 'to read', 'to see', 'to say'], correctAnswer: 'to write', questionTr: 'Bu fiil ne demek?', optionsTr: ['yazmak', 'okumak', 'görmek', 'söylemek'], correctAnswerTr: 'yazmak', order: 1 },
    { id: 'mv2', lessonId: 'l8_1', type: 'multiple_choice', questionKu: 'axaftin', questionEn: 'What does this verb mean?', options: ['to speak', 'to hear', 'to write', 'to read'], correctAnswer: 'to speak', questionTr: 'Bu fiil ne demek?', optionsTr: ['konuşmak', 'duymak', 'yazmak', 'okumak'], correctAnswerTr: 'konuşmak', order: 2 },
    { id: 'mv3', lessonId: 'l8_1', type: 'translation', questionEn: 'Write "to give" in Kurdish.', correctAnswer: 'dan', questionTr: '"vermek" kelimesini Kürtçe yaz.', order: 3 },
    { id: 'mv4', lessonId: 'l8_1', type: 'multiple_choice', questionKu: 'vekirin', questionEn: 'What does this verb mean?', options: ['to open', 'to close', 'to break', 'to give'], correctAnswer: 'to open', questionTr: 'Bu fiil ne demek?', optionsTr: ['açmak', 'kapatmak', 'kırmak', 'vermek'], correctAnswerTr: 'açmak', order: 4 },
    { id: 'mv5', lessonId: 'l8_1', type: 'multiple_choice', questionKu: 'girtin', questionEn: 'What does this verb mean?', options: ['to take, hold, close', 'to give', 'to open', 'to read'], correctAnswer: 'to take, hold, close', questionTr: 'Bu fiil ne demek?', optionsTr: ['almak, tutmak, kapatmak', 'vermek', 'açmak', 'okumak'], correctAnswerTr: 'almak, tutmak, kapatmak', order: 5 },
    { id: 'mv6', lessonId: 'l8_1', type: 'translation', questionEn: 'Write "to live" in Kurdish.', correctAnswer: 'jîn', questionTr: '"yaşamak" kelimesini Kürtçe yaz.', order: 6 },
    { id: 'mv7', lessonId: 'l8_1', type: 'multiple_choice', questionKu: 'fêr bûn', questionEn: 'What does this verb mean?', options: ['to learn', 'to teach', 'to study', 'to write'], correctAnswer: 'to learn', questionTr: 'Bu fiil ne demek?', optionsTr: ['öğrenmek', 'öğretmek', 'ders çalışmak', 'yazmak'], correctAnswerTr: 'öğrenmek', order: 7 },
  ],

  // U8L2: Feelings & States
  l8_2: [
    { id: 'fe1', lessonId: 'l8_2', type: 'multiple_choice', questionKu: 'kêfxweş', questionEn: 'What does this word mean?', options: ['happy', 'sad', 'angry', 'tired'], correctAnswer: 'happy', questionTr: 'Bu kelime ne demek?', optionsTr: ['mutlu', 'üzünü', 'kızgın', 'yorgun'], correctAnswerTr: 'mutlu', order: 1 },
    { id: 'fe2', lessonId: 'l8_2', type: 'multiple_choice', questionKu: 'xemgîn', questionEn: 'What does this word mean?', options: ['sad', 'happy', 'hungry', 'thirsty'], correctAnswer: 'sad', questionTr: 'Bu kelime ne demek?', optionsTr: ['üzünü', 'mutlu', 'aç', 'susamış'], correctAnswerTr: 'üzünü', order: 2 },
    { id: 'fe3', lessonId: 'l8_2', type: 'translation', questionEn: 'Write "hungry" in Kurdish.', correctAnswer: 'birsî', questionTr: '"aç" kelimesini Kürtçe yaz.', order: 3 },
    { id: 'fe4', lessonId: 'l8_2', type: 'multiple_choice', questionKu: 'tî', questionEn: 'What does this word mean?', options: ['thirsty', 'hungry', 'tired', 'cold'], correctAnswer: 'thirsty', questionTr: 'Bu kelime ne demek?', optionsTr: ['susamış', 'aç', 'yorgun', 'soğuk'], correctAnswerTr: 'susamış', order: 4 },
    { id: 'fe5', lessonId: 'l8_2', type: 'multiple_choice', questionKu: 'westiyayî', questionEn: 'What does this word mean?', options: ['tired', 'happy', 'angry', 'afraid'], correctAnswer: 'tired', questionTr: 'Bu kelime ne demek?', optionsTr: ['yorgun', 'mutlu', 'kızgın', 'korkmuş'], correctAnswerTr: 'yorgun', order: 5 },
    { id: 'fe6', lessonId: 'l8_2', type: 'translation', questionEn: 'Write "angry" in Kurdish.', correctAnswer: 'hêrs', questionTr: '"kızgın" kelimesini Kürtçe yaz.', order: 6 },
    { id: 'fe7', lessonId: 'l8_2', type: 'multiple_choice', questionKu: 'Ez birsî me.', questionEn: 'What does this sentence mean?', options: ['I am hungry.', 'I am thirsty.', 'I am tired.', 'I am happy.'], correctAnswer: 'I am hungry.', questionTr: 'Bu cümle ne demek?', optionsTr: ['Açım.', 'Susadım.', 'Yorgunum.', 'Mutluyum.'], correctAnswerTr: 'Açım.', order: 7 },
  ],

  // U8L3: I want, I can (Grammar)
  l8_3: [
    { id: 'gw1', lessonId: 'l8_3', type: 'multiple_choice', questionKu: 'Ez dixwazim.', questionEn: 'What does this sentence mean?', options: ['I want.', 'I can.', 'I go.', 'I know.'], correctAnswer: 'I want.', explanation: 'xwestin → xwaz- → dixwazim.', questionTr: 'Bu cümle ne demek?', optionsTr: ['İstiyorum.', 'Yapabilirim.', 'Giderim.', 'Biliyorum.'], correctAnswerTr: 'İstiyorum.', explanationTr: 'xwestin → xwaz- → dixwazim.', order: 1 },
    { id: 'gw2', lessonId: 'l8_3', type: 'multiple_choice', questionKu: 'Ez dikarim.', questionEn: 'What does this sentence mean?', options: ['I can. / I am able.', 'I want.', 'I must.', 'I should.'], correctAnswer: 'I can. / I am able.', explanation: 'karîn → kar- → dikarim.', questionTr: 'Bu cümle ne demek?', optionsTr: ['Yapabilirim. / Muktedirim.', 'İstiyorum.', 'Zorundayım.', 'Yapmalıyım.'], correctAnswerTr: 'Yapabilirim. / Muktedirim.', explanationTr: 'karîn → kar- → dikarim.', order: 2 },
    { id: 'gw3', lessonId: 'l8_3', type: 'multiple_choice', questionKu: 'Ez dixwazim biçim.', questionEn: 'What does this sentence mean?', options: ['I want to go.', 'I can go.', 'I am going.', 'I must go.'], correctAnswer: 'I want to go.', explanation: 'Xwestin is followed by the subjunctive: biçim = "that I go."', questionTr: 'Bu cümle ne demek?', optionsTr: ['Gitmek istiyorum.', 'Gidebilirim.', 'Gidiyorum.', 'Gitmeliyim.'], correctAnswerTr: 'Gitmek istiyorum.', explanationTr: 'Xwestin istek kipiyle kullanılır: biçim = "gitmem".', order: 3 },
    { id: 'gw4', lessonId: 'l8_3', type: 'fill_blank', questionKu: 'Tu dikarî ____?', questionEn: 'Complete: "Can you speak?" (axaftin → biaxivî)', correctAnswer: 'biaxivî', questionTr: 'Tamamla: "Konuşabilir misin?" (axaftin → biaxivî)', order: 4 },
    { id: 'gw5', lessonId: 'l8_3', type: 'true_false', questionKu: 'Ez naxwazim = I do not want', questionEn: 'Is this translation correct?', correctAnswer: 'True', explanation: 'Negative of dixwazim is naxwazim (na- replaces di-).', questionKuTr: 'Ez naxwazim = istemiyorum', questionTr: 'Bu çeviri doğru mu?', explanationTr: 'dixwazim’in olumsuzu naxwazim’dir (na-, di-’nin yerini alır).', order: 5 },
    { id: 'gw6', lessonId: 'l8_3', type: 'multiple_choice', questionKu: 'Em nikarin.', questionEn: 'What does this sentence mean?', options: ['We cannot.', 'We can.', 'We want.', 'We go.'], correctAnswer: 'We cannot.', explanation: 'Karîn uses "ni-" for negative instead of "na-".', questionTr: 'Bu cümle ne demek?', optionsTr: ['Yapamayız.', 'Yapabiliriz.', 'İsteriz.', 'Gideriz.'], correctAnswerTr: 'Yapamayız.', explanationTr: 'Karîn olumsuzda "na-" yerine "ni-" kullanır.', order: 6 },
  ],

  // U8L4: Review Actions
  l8_4: [
    { id: 'ra1', lessonId: 'l8_4', type: 'translation', questionEn: 'Write "to write" in Kurdish.', correctAnswer: 'nivîsandin', questionTr: '"yazmak" kelimesini Kürtçe yaz.', order: 1 },
    { id: 'ra2', lessonId: 'l8_4', type: 'multiple_choice', questionKu: 'Ez tî me.', questionEn: 'What does this sentence mean?', options: ['I am thirsty.', 'I am hungry.', 'I am tired.', 'I am sad.'], correctAnswer: 'I am thirsty.', questionTr: 'Bu cümle ne demek?', optionsTr: ['Susadım.', 'Açım.', 'Yorgunum.', 'Üzünüm.'], correctAnswerTr: 'Susadım.', order: 2 },
    { id: 'ra3', lessonId: 'l8_4', type: 'multiple_choice', questionKu: 'Ez dixwazim bixwînim.', questionEn: 'What does this sentence mean?', options: ['I want to read/study.', 'I can read.', 'I am reading.', 'I like to read.'], correctAnswer: 'I want to read/study.', questionTr: 'Bu cümle ne demek?', optionsTr: ['Okumak/ders çalışmak istiyorum.', 'Okuyabilirim.', 'Okuyorum.', 'Okumayı severim.'], correctAnswerTr: 'Okumak/ders çalışmak istiyorum.', order: 3 },
    { id: 'ra4', lessonId: 'l8_4', type: 'translation', questionEn: 'Write "happy" in Kurdish.', correctAnswer: 'kêfxweş', questionTr: '"mutlu" kelimesini Kürtçe yaz.', order: 4 },
    { id: 'ra5', lessonId: 'l8_4', type: 'multiple_choice', questionKu: 'Tu dikarî biaxivî?', questionEn: 'What does this sentence mean?', options: ['Can you speak?', 'Do you speak?', 'Will you speak?', 'Do you want to speak?'], correctAnswer: 'Can you speak?', questionTr: 'Bu cümle ne demek?', optionsTr: ['Konuşabilir misin?', 'Konuşuyor musun?', 'Konuşacak mısın?', 'Konuşmak ister misin?'], correctAnswerTr: 'Konuşabilir misin?', order: 5 },
    { id: 'ra6', lessonId: 'l8_4', type: 'fill_blank', questionKu: 'Ez ____ biçim.', questionEn: 'Complete: "I want to go."', correctAnswer: 'dixwazim', questionTr: 'Tamamla: "Gitmek istiyorum."', order: 6 },
  ],

  // ===== COURSE 3 · U9: CLOTHES & MARKET =====

  // U9L1: Clothes
  l9_1: [
    { id: 'cm1', lessonId: 'l9_1', type: 'multiple_choice', questionKu: 'kiras', questionEn: 'What does this word mean?', options: ['shirt', 'shoe', 'cap', 'dress'], correctAnswer: 'shirt', questionTr: 'Bu kelime ne demek?', optionsTr: ['gömlek', 'ayakkabı', 'kep', 'elbise'], correctAnswerTr: 'gömlek', order: 1 },
    { id: 'cm2', lessonId: 'l9_1', type: 'multiple_choice', questionEn: 'How do you say "shoe" in Kurdish?', options: ['sol', 'kiras', 'kum', 'şal'], correctAnswer: 'sol', questionTr: '"ayakkabı" Kürtçe nasıl denir?', order: 2 },
    { id: 'cm3', lessonId: 'l9_1', type: 'multiple_choice', questionKu: 'kum', questionEn: 'What does this word mean?', options: ['cap', 'coat', 'sock', 'belt'], correctAnswer: 'cap', questionTr: 'Bu kelime ne demek?', optionsTr: ['kep', 'palto', 'çorap', 'kemer'], correctAnswerTr: 'kep', order: 3 },
    { id: 'cm4', lessonId: 'l9_1', type: 'true_false', questionKu: 'fîstan = dress', questionEn: 'Is this translation correct?', correctAnswer: 'True', explanation: '"Fîstan" means dress.', questionKuTr: 'fîstan = elbise', questionTr: 'Bu çeviri doğru mu?', explanationTr: '"Fîstan" elbise demek.', order: 4 },
    { id: 'cm5', lessonId: 'l9_1', type: 'multiple_choice', questionKu: 'şal', questionEn: 'What does this word mean?', options: ['baggy trousers', 'shirt', 'wool', 'hat'], correctAnswer: 'baggy trousers', questionTr: 'Bu kelime ne demek?', optionsTr: ['şalvar', 'gömlek', 'yün', 'şapka'], correctAnswerTr: 'şalvar', order: 5 },
    { id: 'cm6', lessonId: 'l9_1', type: 'translation', questionEn: 'Write "clothes" in Kurdish.', correctAnswer: 'cil', questionTr: '"giysi" kelimesini Kürtçe yaz.', order: 6 },
  ],

  // U9L2: At the Market
  l9_2: [
    { id: 'cm7', lessonId: 'l9_2', type: 'multiple_choice', questionKu: 'bazar', questionEn: 'What does this word mean?', options: ['market', 'school', 'village', 'house'], correctAnswer: 'market', questionTr: 'Bu kelime ne demek?', optionsTr: ['pazar', 'okul', 'köy', 'ev'], correctAnswerTr: 'pazar', order: 1 },
    { id: 'cm8', lessonId: 'l9_2', type: 'multiple_choice', questionEn: 'How do you say "shop" in Kurdish?', options: ['dikan', 'bazar', 'mal', 'rê'], correctAnswer: 'dikan', questionTr: '"dükkân" Kürtçe nasıl denir?', order: 2 },
    { id: 'cm9', lessonId: 'l9_2', type: 'multiple_choice', questionKu: 'nan', questionEn: 'What does this word mean?', options: ['bread', 'meat', 'egg', 'tea'], correctAnswer: 'bread', questionTr: 'Bu kelime ne demek?', optionsTr: ['ekmek', 'et', 'yumurta', 'çay'], correctAnswerTr: 'ekmek', order: 3 },
    { id: 'cm10', lessonId: 'l9_2', type: 'true_false', questionKu: 'goşt = meat', questionEn: 'Is this translation correct?', correctAnswer: 'True', explanation: '"Goşt" means meat.', questionKuTr: 'goşt = et', questionTr: 'Bu çeviri doğru mu?', explanationTr: '"Goşt" et demek.', order: 4 },
    { id: 'cm11', lessonId: 'l9_2', type: 'multiple_choice', questionKu: 'çay', questionEn: 'What does this word mean?', options: ['tea', 'water', 'milk', 'sugar'], correctAnswer: 'tea', questionTr: 'Bu kelime ne demek?', optionsTr: ['çay', 'su', 'süt', 'şeker'], correctAnswerTr: 'çay', order: 5 },
    { id: 'cm12', lessonId: 'l9_2', type: 'translation', questionEn: 'Write "egg" in Kurdish.', correctAnswer: 'hêk', questionTr: '"yumurta" kelimesini Kürtçe yaz.', order: 6 },
  ],

  // U9L3: Animals & Food
  l9_3: [
    { id: 'cm13', lessonId: 'l9_3', type: 'multiple_choice', questionKu: 'kûçik', questionEn: 'What does this word mean?', options: ['dog', 'cat', 'wolf', 'fox'], correctAnswer: 'dog', questionTr: 'Bu kelime ne demek?', optionsTr: ['köpek', 'kedi', 'kurt', 'tilki'], correctAnswerTr: 'köpek', order: 1 },
    { id: 'cm14', lessonId: 'l9_3', type: 'multiple_choice', questionEn: 'How do you say "chicken" in Kurdish?', options: ['mirîşk', 'qaz', 'mange', 'golik'], correctAnswer: 'mirîşk', questionTr: '"tavuk" Kürtçe nasıl denir?', order: 2 },
    { id: 'cm15', lessonId: 'l9_3', type: 'multiple_choice', questionKu: 'mange', questionEn: 'What does this word mean?', options: ['cow', 'sheep', 'goat', 'horse'], correctAnswer: 'cow', questionTr: 'Bu kelime ne demek?', optionsTr: ['inek', 'koyun', 'keçi', 'at'], correctAnswerTr: 'inek', order: 3 },
    { id: 'cm16', lessonId: 'l9_3', type: 'true_false', questionKu: 'qaz = goose', questionEn: 'Is this translation correct?', correctAnswer: 'True', explanation: '"Qaz" means goose.', questionKuTr: 'qaz = kaz', questionTr: 'Bu çeviri doğru mu?', explanationTr: '"Qaz" kaz demek.', order: 4 },
    { id: 'cm17', lessonId: 'l9_3', type: 'multiple_choice', questionKu: 'taşt', questionEn: 'What does this word mean?', options: ['breakfast', 'lunch', 'dinner', 'supper'], correctAnswer: 'breakfast', questionTr: 'Bu kelime ne demek?', optionsTr: ['kahvaltı', 'öğle yemeği', 'akşam yemeği', 'gece yemeği'], correctAnswerTr: 'kahvaltı', order: 5 },
    { id: 'cm18', lessonId: 'l9_3', type: 'translation', questionEn: 'Write "camel" in Kurdish.', correctAnswer: 'hêştir', questionTr: '"deve" kelimesini Kürtçe yaz.', order: 6 },
  ],

  // U9L4: Review Clothes & Market
  l9_4: [
    { id: 'cm19', lessonId: 'l9_4', type: 'multiple_choice', questionKu: 'sol', questionEn: 'What does this word mean?', options: ['shoe', 'shirt', 'cap', 'dress'], correctAnswer: 'shoe', questionTr: 'Bu kelime ne demek?', optionsTr: ['ayakkabı', 'gömlek', 'kep', 'elbise'], correctAnswerTr: 'ayakkabı', order: 1 },
    { id: 'cm20', lessonId: 'l9_4', type: 'multiple_choice', questionEn: 'How do you say "dog" in Kurdish?', options: ['kûçik', 'pisîk', 'mî', 'ker'], correctAnswer: 'kûçik', questionTr: '"köpek" Kürtçe nasıl denir?', order: 2 },
    { id: 'cm21', lessonId: 'l9_4', type: 'true_false', questionKu: 'hêk = bread', questionEn: 'Is this translation correct?', correctAnswer: 'False', explanation: '"Hêk" means egg; "nan" means bread.', questionKuTr: 'hêk = ekmek', questionTr: 'Bu çeviri doğru mu?', explanationTr: '"Hêk" yumurta demek; "nan" ekmek demek.', order: 3 },
    { id: 'cm22', lessonId: 'l9_4', type: 'multiple_choice', questionKu: 'cil', questionEn: 'What does this word mean?', options: ['clothes', 'market', 'egg', 'tower'], correctAnswer: 'clothes', questionTr: 'Bu kelime ne demek?', optionsTr: ['giysi', 'pazar', 'yumurta', 'kule'], correctAnswerTr: 'giysi', order: 4 },
    { id: 'cm23', lessonId: 'l9_4', type: 'translation', questionEn: 'Write "market" in Kurdish.', correctAnswer: 'bazar', questionTr: '"pazar" kelimesini Kürtçe yaz.', order: 5 },
    { id: 'cm24', lessonId: 'l9_4', type: 'translation', questionEn: 'Write "cap" in Kurdish.', correctAnswer: 'kum', questionTr: '"kep" kelimesini Kürtçe yaz.', order: 6 },
  ],

  // ===== COURSE 3 · UNIT 10: BODY & HEALTH (Laşê Mirov) =====

  // U10L1: Body Parts
  l10_1: [
    { id: 'bd1', lessonId: 'l10_1', type: 'multiple_choice', questionKu: 'ser', questionEn: 'What does this word mean?', options: ['head', 'hand', 'eye', 'foot'], correctAnswer: 'head', questionTr: 'Bu kelime ne demek?', optionsTr: ['baş', 'el', 'göz', 'ayak'], correctAnswerTr: 'baş', order: 1 },
    { id: 'bd2', lessonId: 'l10_1', type: 'multiple_choice', questionEn: 'How do you say "hand" in Kurdish?', options: ['dest', 'ling', 'çav', 'poz'], correctAnswer: 'dest', questionTr: '"el" Kürtçe nasıl denir?', order: 2 },
    { id: 'bd3', lessonId: 'l10_1', type: 'multiple_choice', questionKu: 'çav', questionEn: 'What does this word mean?', options: ['eye', 'ear', 'nose', 'mouth'], correctAnswer: 'eye', questionTr: 'Bu kelime ne demek?', optionsTr: ['göz', 'kulak', 'burun', 'ağız'], correctAnswerTr: 'göz', order: 3 },
    { id: 'bd4', lessonId: 'l10_1', type: 'translation', questionEn: 'Write "mouth" in Kurdish.', correctAnswer: 'dev', questionTr: '"ağız" kelimesini Kürtçe yaz.', order: 4 },
    { id: 'bd5', lessonId: 'l10_1', type: 'match_pairs', questionEn: 'Match each word to its meaning.', questionTr: 'Her kelimeyi anlamıyla eşleştir.', correctAnswer: '', pairs: [ { ku: 'ser', en: 'head', tr: 'baş' }, { ku: 'dest', en: 'hand', tr: 'el' }, { ku: 'çav', en: 'eye', tr: 'göz' }, { ku: 'ling', en: 'foot', tr: 'ayak' } ], order: 5 },
    { id: 'bd6', lessonId: 'l10_1', type: 'multiple_choice', questionKu: 'guh', questionEn: 'What does this word mean?', options: ['ear', 'eye', 'nose', 'face'], correctAnswer: 'ear', questionTr: 'Bu kelime ne demek?', optionsTr: ['kulak', 'göz', 'burun', 'yüz'], correctAnswerTr: 'kulak', order: 6 },
  ],

  // U10L2: Health & Feeling
  l10_2: [
    { id: 'bd7', lessonId: 'l10_2', type: 'multiple_choice', questionKu: 'nexweş', questionEn: 'What does this word mean?', options: ['sick', 'healthy', 'hungry', 'good'], correctAnswer: 'sick', questionTr: 'Bu kelime ne demek?', optionsTr: ['hasta', 'sağlıklı', 'aç', 'iyi'], correctAnswerTr: 'hasta', order: 1 },
    { id: 'bd8', lessonId: 'l10_2', type: 'multiple_choice', questionEn: 'How do you say "medicine" in Kurdish?', options: ['derman', 'êş', 'xwîn', 'birîn'], correctAnswer: 'derman', questionTr: '"ilaç" Kürtçe nasıl denir?', order: 2 },
    { id: 'bd9', lessonId: 'l10_2', type: 'multiple_choice', questionKu: 'dil', questionEn: 'What does this word mean?', options: ['heart', 'hand', 'head', 'blood'], correctAnswer: 'heart', questionTr: 'Bu kelime ne demek?', optionsTr: ['kalp', 'el', 'baş', 'kan'], correctAnswerTr: 'kalp', order: 3 },
    { id: 'bd10', lessonId: 'l10_2', type: 'translation', questionEn: 'Write "healthy, well" in Kurdish.', correctAnswer: 'sax', questionTr: '"sağlıklı, iyi" kelimesini Kürtçe yaz.', order: 4 },
    { id: 'bd11', lessonId: 'l10_2', type: 'true_false', questionKu: 'êş = pain', questionEn: 'Is this translation correct?', correctAnswer: 'True', explanation: '"Êş" means "pain."', questionKuTr: 'êş = ağrı', questionTr: 'Bu çeviri doğru mu?', explanationTr: '"Êş" "ağrı" demek.', order: 5 },
    { id: 'bd12', lessonId: 'l10_2', type: 'multiple_choice', questionKu: 'por', questionEn: 'What does this word mean?', options: ['hair', 'face', 'neck', 'back'], correctAnswer: 'hair', questionTr: 'Bu kelime ne demek?', optionsTr: ['saç', 'yüz', 'boyun', 'sırt'], correctAnswerTr: 'saç', order: 6 },
  ],

  // U10L3: My Hand, My Head (ezafe possessive)
  l10_3: [
    { id: 'bd13', lessonId: 'l10_3', type: 'multiple_choice', questionKu: 'Destê min', questionEn: 'What does this mean?', options: ['my hand', 'my foot', 'my head', 'your hand'], correctAnswer: 'my hand', explanation: '"dest" + "-ê" (ezafe) + "min" = my hand.', questionTr: 'Bu ne demek?', optionsTr: ['elim', 'ayağım', 'başım', 'elin'], correctAnswerTr: 'elim', explanationTr: '"dest" + "-ê" (izafe) + "min" = elim.', order: 1 },
    { id: 'bd14', lessonId: 'l10_3', type: 'fill_blank', questionKu: 'Ser__ min mezin e.', questionEn: 'Complete: "My head is big." (Serê min)', correctAnswer: 'ê', questionTr: 'Tamamla: "Başım büyük." (Serê min)', order: 2 },
    { id: 'bd15', lessonId: 'l10_3', type: 'multiple_choice', questionKu: 'Çavên wê', questionEn: 'What does this mean?', options: ['her eyes', 'my eyes', 'your eyes', 'her hand'], correctAnswer: 'her eyes', explanation: '"-ên" marks a plural ezafe; "wê" = her.', questionTr: 'Bu ne demek?', optionsTr: ['onun gözleri', 'gözlerim', 'gözlerin', 'onun eli'], correctAnswerTr: 'onun gözleri', explanationTr: '"-ên" çoğul izafe; "wê" = onun.', order: 3 },
    { id: 'bd16', lessonId: 'l10_3', type: 'multiple_choice', questionEn: 'How do you say "I am sick"?', options: ['Ez nexweş im.', 'Tu nexweş î.', 'Ew nexweş e.', 'Em nexweş in.'], correctAnswer: 'Ez nexweş im.', questionTr: '"Ben hastayım" nasıl denir?', order: 4 },
    { id: 'bd17', lessonId: 'l10_3', type: 'fill_blank', questionKu: 'Ez sax ____.', questionEn: 'Complete: "I am well."', correctAnswer: 'im', questionTr: 'Tamamla: "İyiyim."', order: 5 },
    { id: 'bd18', lessonId: 'l10_3', type: 'translation', questionEn: 'Translate to Kurdish: "my hand"', correctAnswer: 'destê min', questionTr: 'Kürtçeye çevir: "elim"', order: 6 },
  ],

  // U10L4: Review — Body & Health
  l10_4: [
    { id: 'bd19', lessonId: 'l10_4', type: 'multiple_choice', questionKu: 'dest', questionEn: 'What does this word mean?', options: ['hand', 'foot', 'ear', 'eye'], correctAnswer: 'hand', questionTr: 'Bu kelime ne demek?', optionsTr: ['el', 'ayak', 'kulak', 'göz'], correctAnswerTr: 'el', order: 1 },
    { id: 'bd20', lessonId: 'l10_4', type: 'match_pairs', questionEn: 'Match each word to its meaning.', questionTr: 'Her kelimeyi anlamıyla eşleştir.', correctAnswer: '', pairs: [ { ku: 'nexweş', en: 'sick', tr: 'hasta' }, { ku: 'sax', en: 'healthy', tr: 'sağlıklı' }, { ku: 'derman', en: 'medicine', tr: 'ilaç' }, { ku: 'êş', en: 'pain', tr: 'ağrı' } ], order: 2 },
    { id: 'bd21', lessonId: 'l10_4', type: 'translation', questionEn: 'Write "eye" in Kurdish.', correctAnswer: 'çav', questionTr: '"göz" kelimesini Kürtçe yaz.', order: 3 },
    { id: 'bd22', lessonId: 'l10_4', type: 'multiple_choice', questionKu: 'Ez nexweş im.', questionEn: 'What does this sentence mean?', options: ['I am sick.', 'You are sick.', 'He is sick.', 'I am well.'], correctAnswer: 'I am sick.', questionTr: 'Bu cümle ne demek?', optionsTr: ['Hastayım.', 'Hastasın.', 'O hasta.', 'İyiyim.'], correctAnswerTr: 'Hastayım.', order: 4 },
    { id: 'bd23', lessonId: 'l10_4', type: 'true_false', questionKu: 'sax = sick', questionEn: 'Is this translation correct?', correctAnswer: 'False', explanation: '"Sax" means "healthy, well"; "nexweş" means "sick."', questionKuTr: 'sax = hasta', questionTr: 'Bu çeviri doğru mu?', explanationTr: '"Sax" "sağlıklı" demek; "nexweş" "hasta" demek.', order: 5 },
    { id: 'bd24', lessonId: 'l10_4', type: 'multiple_choice', questionKu: 'laş', questionEn: 'What does this word mean?', options: ['body', 'heart', 'hair', 'hand'], correctAnswer: 'body', questionTr: 'Bu kelime ne demek?', optionsTr: ['vücut', 'kalp', 'saç', 'el'], correctAnswerTr: 'vücut', order: 6 },
  ],
};

export const getExercisesForLesson = (lessonId: string): Exercise[] => {
  return E[lessonId] || [];
};

// A short vocabulary preview shown before a lesson's exercises.
export interface TeachCard {
  ku: string;
  en: string;
}

// Recognition exercises (you pick/judge an answer that's shown to you) should
// come before production exercises (you type the answer from memory).
const RECOGNITION_FIRST: ExerciseType[] = ['multiple_choice', 'true_false', 'match_pairs'];

/** Exercises ordered recognition-first, preserving original order within each group. */
export const getOrderedExercisesForLesson = (lessonId: string): Exercise[] => {
  const list = E[lessonId] || [];
  const recognition = list.filter((e) => RECOGNITION_FIRST.includes(e.type));
  const production = list.filter((e) => !RECOGNITION_FIRST.includes(e.type));
  return [...recognition, ...production];
};

/**
 * Derives a short "learn these words" preview from a lesson's own exercises so
 * learners see the vocabulary before being asked to produce it. Returns clean
 * Kurdish→English pairs (deduped, capped). Empty/short lists skip the preview.
 */
export const getLessonTeachCards = (lessonId: string, lang: Lang = 'en'): TeachCard[] => {
  const list = E[lessonId] || [];
  const cards: TeachCard[] = [];
  const seen = new Set<string>();

  const add = (ku?: string, en?: string) => {
    const k = (ku || '').trim();
    const e = (en || '').trim();
    if (!k || !e) return;
    const key = k.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    cards.push({ ku: k, en: e });
  };

  for (const ex of list) {
    // Bridge-language prompt (used to extract a quoted gloss) with English fallback.
    const prompt = lang === 'tr' && ex.questionTr ? ex.questionTr : ex.questionEn;
    if (ex.type === 'multiple_choice') {
      const enAnswer = Array.isArray(ex.correctAnswer) ? ex.correctAnswer[0] : ex.correctAnswer;
      if (ex.questionKu && enAnswer !== 'True' && enAnswer !== 'False') {
        // Kurdish prompt with its meaning (the correct option) as the gloss.
        const glossRaw = lang === 'tr' && ex.correctAnswerTr !== undefined ? ex.correctAnswerTr : ex.correctAnswer;
        add(ex.questionKu, Array.isArray(glossRaw) ? glossRaw[0] : glossRaw);
      } else if (prompt) {
        // e.g. How do you say "thanks" in Kurdish? -> answer is the Kurdish word.
        const m = prompt.match(/"([^"]+)"/);
        if (m) add(enAnswer, m[1]);
      }
    } else if (ex.type === 'translation' && prompt) {
      // e.g. Write "good day" in Kurdish. -> answer is the Kurdish word (stays).
      const answer = Array.isArray(ex.correctAnswer) ? ex.correctAnswer[0] : ex.correctAnswer;
      const m = prompt.match(/"([^"]+)"/);
      if (m) add(answer, m[1]);
    }
  }

  return cards.slice(0, 6);
};

