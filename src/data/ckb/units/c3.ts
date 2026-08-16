// Fêrbûn: the four units of the Sorani course "Actions & Verbs".
// Titles answer to the cited/authored split ../courses.ts sets out. The comment
// above each unit records which theme each of its lessons draws on and which
// words, because the exercises milestone has to pick from exactly that pool and
// the Lesson type has no field for it.
// The exercises themselves are authored in ./c3-exercises.ts and attached
// below, one array per lesson.

import { CKB_L10_1, CKB_L10_2, CKB_L10_3, CKB_L10_4, CKB_L7_1, CKB_L7_2, CKB_L7_3, CKB_L7_4, CKB_L8_1, CKB_L8_2, CKB_L8_3, CKB_L8_4, CKB_L9_1, CKB_L9_2, CKB_L9_3, CKB_L9_4 } from './c3-exercises';
import { REVIEW_TITLE, REVIEW_TITLE_KU } from './review';
import type { SoraniUnit } from '../courses';

export const CKB_C3_UNITS: SoraniUnit[] = [
  // verbs (27). 27 words, the whole theme, split three ways by sense.
  //  ckb-l7_1  verbs  çûn, hatin, bûn, man, nîştin, kewtin, gerran, jyan, mirdin
  //  ckb-l7_2  verbs  xwardin, xwardinewe, dîtin, bîstin, girtin, dan, kirdin, kirdinewe, şurdin
  //  ckb-l7_3  verbs  gotin, qse-kirdin, zanîn, nûsîn, fêr-bûn, twanîn, wîstin, xoş-wîstin, tirsan
  //  ckb-l7_4  review, all 27
  {
    id: 'ckb-u7', courseId: 'ckb-c3', title: 'Common Verbs', titleKu: 'kirdin u bûn',
    description: 'Going, coming, eating, seeing, saying and knowing, in the infinitive Thackston heads each entry with',
    titleTr: 'Sık Kullanılan Fiiller',
    descriptionTr: 'Gitmek, gelmek, yemek, görmek, söylemek ve bilmek',
    icon: 'walk-outline', order: 7,
    titleOrigin: 'authored',
    titleNote:
      'Composed for this app from kirdin "to do" (THK06:201) and bûn "to be, to become, to happen" ' +
      '(THK06:174), joined by u "and" (THK06:234). The theme label kirdar is not reused here because the ' +
      'course above this unit carries it, and it is itself authored rather than cited.',
    lessons: [
      {
        id: 'ckb-l7_1', unitId: 'ckb-u7', title: 'Go, Come & Be', titleKu: 'çûn u hatin',
        titleTr: 'Gitmek, Gelmek & Olmak', type: 'vocab', order: 1, xpReward: 10, exercises: CKB_L7_1,
        titleOrigin: 'authored',
        titleNote:
          'Composed for this app from çûn "to go" (THK06:177, chûn) and hatin "to come" (THK06:190, hâtin), ' +
          'joined by u "and" (THK06:234). Both are taught by this lesson.',
      },
      {
        id: 'ckb-l7_2', unitId: 'ckb-u7', title: 'Eat, Drink & See', titleKu: 'xwardin u dîtin',
        titleTr: 'Yemek, İçmek & Görmek', type: 'vocab', order: 2, xpReward: 10, exercises: CKB_L7_2,
        titleOrigin: 'authored',
        titleNote:
          'Composed for this app from xwardin "to eat" (THK06:200, khwârdin) and dîtin "to see" (THK06:182, ' +
          'dîtin), joined by u "and" (THK06:234). The drink of the English title is xwardinewe, the ~awa ' +
          'extension Thackston prints inside the eat entry on the same page.',
      },
      {
        id: 'ckb-l7_3', unitId: 'ckb-u7', title: 'Say, Know & Want', titleKu: 'gotin u zanîn',
        titleTr: 'Söylemek, Bilmek & İstemek', type: 'vocab', order: 3, xpReward: 10, exercises: CKB_L7_3,
        titleOrigin: 'authored',
        titleNote:
          'Composed for this app from gotin "to say" (THK06:187) and zanîn "to know" (THK06:238, zânîn), ' +
          'joined by u "and" (THK06:234). zanîn is a tilde sub-entry under zân|â and carries its own fromNote ' +
          'in ../vocab/verbs.ts.',
      },
      {
        id: 'ckb-l7_4', unitId: 'ckb-u7', title: 'Review: Verbs', titleKu: REVIEW_TITLE_KU,
        titleTr: 'Tekrar: Fiiller', type: 'vocab', order: 4, xpReward: 10, exercises: CKB_L7_4,
        ...REVIEW_TITLE,
      },
    ],
  },
  // body (20) + emotions (12). 32 words.
  //  ckb-l8_1  body  ser, dill, çaw, dest, pê, dem, goh, lût, rû, mil, şan, sik, pişt, leş
  //  ckb-l8_2  body  nexoş, sax, êş, birîn, derman, xwên
  //  ckb-l8_3  emotions  xoşhal, şad, xemgîn, tûrre, mandû, birsî, xamoş, ewîn, tirs, hîwa, derd, çermeserê
  //  ckb-l8_4  review, all 32
  {
    id: 'ckb-u8', courseId: 'ckb-c3', title: 'Body & Feelings', titleKu: 'leş u hest',
    description: 'Parts of the body, being ill or well, and saying how you feel',
    titleTr: 'Vücut & Duygular',
    descriptionTr: 'Vücut bölümleri, hasta ya da sağlıklı olmak ve nasıl hissettiğini söylemek',
    icon: 'body-outline', order: 8,
    titleOrigin: 'authored',
    titleNote:
      'Composed for this app from the two theme labels the unit covers, leş "body" (THK06:203, lash) and ' +
      'hest "feeling" (THK06:189, hast), joined by u "and" (THK06:234). leş carries the caveat its theme ' +
      'row states: Thackston\'s lash converts to a string that in Kurmanji means a carcass.',
    lessons: [
      {
        id: 'ckb-l8_1', unitId: 'ckb-u8', title: 'Body Parts', titleKu: 'leş',
        titleTr: 'Vücut Bölümleri', type: 'vocab', order: 1, xpReward: 10, exercises: CKB_L8_1,
        titleOrigin: 'cited', src: 'THK06:203', from: 'lash',
      },
      {
        id: 'ckb-l8_2', unitId: 'ckb-u8', title: 'Sick & Well', titleKu: 'nexoş u sax',
        titleTr: 'Hasta & Sağlıklı', type: 'vocab', order: 2, xpReward: 10, exercises: CKB_L8_2,
        titleOrigin: 'authored',
        titleNote:
          'Composed for this app from nexoş "ill" (THK06:209, nakhosh) and sax "healthy" (THK06:225, sâgh), ' +
          'joined by u "and" (THK06:234). Both are taught by this lesson. No headword in the glossary is ' +
          'glossed "health".',
      },
      {
        id: 'ckb-l8_3', unitId: 'ckb-u8', title: 'Feelings', titleKu: 'hest',
        titleTr: 'Duygular', type: 'vocab', order: 3, xpReward: 10, exercises: CKB_L8_3,
        titleOrigin: 'cited', src: 'THK06:189', from: 'hast',
      },
      {
        id: 'ckb-l8_4', unitId: 'ckb-u8', title: 'Review: Body & Feelings', titleKu: REVIEW_TITLE_KU,
        titleTr: 'Tekrar: Vücut & Duygular', type: 'vocab', order: 4, xpReward: 10, exercises: CKB_L8_4,
        ...REVIEW_TITLE,
      },
    ],
  },
  // clothing (6) + places (12). 18 words.
  //  ckb-l9_1  clothing  cil, berg, kiras, demellqopan, kewş, xurî
  //  ckb-l9_2  places  şar, gund, willat, kurdistan, cê, minare
  //  ckb-l9_3  places  rê, şeqam, dukan, qutabxane, dûr, nizîk
  //  ckb-l9_4  review, all 18
  {
    id: 'ckb-u9', courseId: 'ckb-c3', title: 'Clothes & Around Town', titleKu: 'cil u cê',
    description: 'What people wear, and the cities, villages and streets they wear it in',
    titleTr: 'Giysiler & Şehirde',
    descriptionTr: 'İnsanların giydikleri ve giydikleri şehirler, köyler ve sokaklar',
    icon: 'shirt-outline', order: 9,
    titleOrigin: 'authored',
    titleNote:
      'Composed for this app from the two theme labels the unit covers, cil "clothes, togs" (THK06:193, jil) ' +
      'and cê "place" (THK06:193, je), joined by u "and" (THK06:234). Both headwords sit on p. 193.',
    lessons: [
      {
        id: 'ckb-l9_1', unitId: 'ckb-u9', title: 'Clothes', titleKu: 'cil',
        titleTr: 'Giysiler', type: 'vocab', order: 1, xpReward: 10, exercises: CKB_L9_1,
        titleOrigin: 'cited', src: 'THK06:193', from: 'jil',
      },
      {
        id: 'ckb-l9_2', unitId: 'ckb-u9', title: 'City & Village', titleKu: 'şar u gund',
        titleTr: 'Şehir & Köy', type: 'vocab', order: 2, xpReward: 10, exercises: CKB_L9_2,
        titleOrigin: 'authored',
        titleNote:
          'Composed for this app from şar "city" (THK06:226, shâr) and gund "village" (THK06:187, gund), ' +
          'joined by u "and" (THK06:234). Both are taught by this lesson.',
      },
      {
        id: 'ckb-l9_3', unitId: 'ckb-u9', title: 'Streets & Shops', titleKu: 'şeqam u dukan',
        titleTr: 'Sokaklar & Dükkânlar', type: 'vocab', order: 3, xpReward: 10, exercises: CKB_L9_3,
        titleOrigin: 'authored',
        titleNote:
          'Composed for this app from şeqam "street" (THK06:225, shaqâm) and dukan "shop" (THK06:182, dukân), ' +
          'joined by u "and" (THK06:234). p. 182 sets two spellings on the one headword line, "dukân, dukkân ' +
          'shop", and dukân is the first of them, as ../vocab/places.ts records.',
      },
      {
        id: 'ckb-l9_4', unitId: 'ckb-u9', title: 'Review: Clothes & Town', titleKu: REVIEW_TITLE_KU,
        titleTr: 'Tekrar: Giysiler & Şehir', type: 'vocab', order: 4, xpReward: 10, exercises: CKB_L9_4,
        ...REVIEW_TITLE,
      },
    ],
  },
  // education (9) + culture (10). 19 words.
  //  ckb-l10_1  education  mamosta, qutabî, ders, zanistge, kar, xebat
  //  ckb-l10_2  education + culture  ziman, pertuk, govar | çîrrok, edebiyat, mêjû, goranî
  //  ckb-l10_3  culture  newroz, hellperrkê, azadî, şoriş, kurd, kurdî
  //  ckb-l10_4  review, all 19
  {
    id: 'ckb-u10', courseId: 'ckb-c3', title: 'Language & Culture', titleKu: 'ziman u keltur',
    description: 'School and work, books and the language they are written in, and the Kurdish year',
    titleTr: 'Dil & Kültür',
    descriptionTr: 'Okul ve iş, kitaplar ve yazıldıkları dil, ve Kürt yılı',
    icon: 'flag-outline', order: 10,
    titleOrigin: 'authored',
    titleNote:
      'Composed for this app from ziman "tongue, language" (THK06:239, zimân) and keltur "culture" ' +
      '(THK06:194, kaltur), joined by u "and" (THK06:234). The education theme label zanyarî is not reused ' +
      'here because the first lesson under this unit carries it.',
    lessons: [
      {
        id: 'ckb-l10_1', unitId: 'ckb-u10', title: 'School & Work', titleKu: 'zanyarî',
        titleTr: 'Okul & İş', type: 'vocab', order: 1, xpReward: 10, exercises: CKB_L10_1,
        titleOrigin: 'cited', src: 'THK06:238', from: 'zânyârî',
        fromNote:
          'p. 238 prints this as the tilde sub-entry ~yârî under the headword zân|â "learned", whose bar marks ' +
          'zân as the base: "~yârî knowledge, education: wazârat i ~ Ministry of Education". The ~yâr on the ' +
          'line above it is "learned, erudite".',
      },
      {
        id: 'ckb-l10_2', unitId: 'ckb-u10', title: 'Books & Language', titleKu: 'pertuk u govar',
        titleTr: 'Kitaplar & Dil', type: 'vocab', order: 2, xpReward: 10, exercises: CKB_L10_2,
        titleOrigin: 'authored',
        titleNote:
          'Composed for this app from pertuk "book" (THK06:213, partuk) and govar "magazine, journal" ' +
          '(THK06:187, govâr), joined by u "and" (THK06:234). ziman, the language half of the English title, ' +
          'is the unit title above and is not repeated here.',
      },
      {
        id: 'ckb-l10_3', unitId: 'ckb-u10', title: 'Kurdish Culture', titleKu: 'keltur',
        titleTr: 'Kürt Kültürü', type: 'culture', order: 3, xpReward: 10, exercises: CKB_L10_3,
        titleOrigin: 'cited', src: 'THK06:194', from: 'kaltur',
      },
      {
        id: 'ckb-l10_4', unitId: 'ckb-u10', title: 'Review: Language & Culture', titleKu: REVIEW_TITLE_KU,
        titleTr: 'Tekrar: Dil & Kültür', type: 'vocab', order: 4, xpReward: 10, exercises: CKB_L10_4,
        ...REVIEW_TITLE,
      },
    ],
  },
];
