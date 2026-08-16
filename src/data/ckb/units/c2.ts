// Fêrbûn: the three units of the Sorani course "Building Sentences".
// Titles answer to the cited/authored split ../courses.ts sets out. The comment
// above each unit records which theme each of its lessons draws on and which
// words, because the exercises milestone has to pick from exactly that pool and
// the Lesson type has no field for it.

import { REVIEW_TITLE, REVIEW_TITLE_KU } from './review';
import type { SoraniUnit } from '../courses';

export const CKB_C2_UNITS: SoraniUnit[] = [
  // description (21). 21 words.
  //  ckb-l4_1  description  sûr, reş, sewz, zerd, spî, şîn, bor
  //  ckb-l4_2  description  gewre, biçûk, berz, qûll, drêj, qut, giran
  //  ckb-l4_3  description  germ, sard, nwê, kewn, pak, cwan, noll
  //  ckb-l4_4  review, all 21
  {
    id: 'ckb-u4', courseId: 'ckb-c2', title: 'Descriptions', titleKu: 'gewre u biçûk',
    description: 'Colors, sizes, and the adjectives that describe a thing',
    titleTr: 'Betimlemeler',
    descriptionTr: 'Renkler, boyutlar ve bir şeyi niteleyen sıfatlar',
    icon: 'color-palette-outline', order: 4,
    titleOrigin: 'authored',
    titleNote:
      'Composed for this app from gewre "large, big, great" (THK06:185, gawra) and biçûk "small, little" ' +
      '(THK06:171, bichûk), joined by u "and" (THK06:234). The theme label reng is not reused here because ' +
      'the first lesson under this unit carries it, and reng names only the colours.',
    lessons: [
      {
        id: 'ckb-l4_1', unitId: 'ckb-u4', title: 'Colors', titleKu: 'reng',
        titleTr: 'Renkler', type: 'vocab', order: 1, xpReward: 10, exercises: [],
        titleOrigin: 'cited', src: 'THK06:219', from: 'rang',
        fromNote: 'p. 219 prints this as rang1. rang2, eight lines below it, is "possible".',
      },
      {
        id: 'ckb-l4_2', unitId: 'ckb-u4', title: 'Size & Shape', titleKu: 'berz u drêj',
        titleTr: 'Boyut & Biçim', type: 'vocab', order: 2, xpReward: 10, exercises: [],
        titleOrigin: 'authored',
        titleNote:
          'Composed for this app from berz "high, tall" (THK06:169, barz) and drêj "long" (THK06:182, drezh), ' +
          'joined by u "and" (THK06:234). Both are taught by this lesson.',
      },
      {
        id: 'ckb-l4_3', unitId: 'ckb-u4', title: 'Quality & Condition', titleKu: 'nwê u kewn',
        titleTr: 'Nitelik & Durum', type: 'vocab', order: 3, xpReward: 10, exercises: [],
        titleOrigin: 'authored',
        titleNote:
          'Composed for this app from nwê "new" (THK06:212, nwe) and kewn "old" (THK06:194, kawn), joined by ' +
          'u "and" (THK06:234). Both are taught by this lesson.',
      },
      {
        id: 'ckb-l4_4', unitId: 'ckb-u4', title: 'Review: Descriptions', titleKu: REVIEW_TITLE_KU,
        titleTr: 'Tekrar: Betimlemeler', type: 'vocab', order: 4, xpReward: 10, exercises: [],
        ...REVIEW_TITLE,
      },
    ],
  },
  // nature (20) + animals (15). 35 words.
  //  ckb-l5_1  nature  çya, çom, dar, zewî, berd, xak, asman, jûrû, cinûb
  //  ckb-l5_2  animals  gurg, seg, merr, bizin, esp, ballinde, mar, pişî, mîrûle, rêwî, ker, manga, gûr, mirîşk, wiştir
  //  ckb-l5_3  nature  befr, baran, ba, xor, mang, estêre, hewr, behar, hawîn, payiz, zistan
  //  ckb-l5_4  review, all 35
  {
    id: 'ckb-u5', courseId: 'ckb-c2', title: 'Nature & Animals', titleKu: 'siruşt u canewer',
    description: 'The land, the sky, the seasons, and the animals that live among them',
    titleTr: 'Doğa & Hayvanlar',
    descriptionTr: 'Kara, gökyüzü, mevsimler ve aralarında yaşayan hayvanlar',
    icon: 'leaf-outline', order: 5,
    titleOrigin: 'authored',
    titleNote:
      'Composed for this app from the two theme labels the unit covers, siruşt "nature" (THK06:228, sirusht) ' +
      'and canewer "animal" (THK06:193, jânawar), joined by u "and" (THK06:234).',
    lessons: [
      {
        id: 'ckb-l5_1', unitId: 'ckb-u5', title: 'Land & Sky', titleKu: 'siruşt',
        titleTr: 'Kara & Gökyüzü', type: 'vocab', order: 1, xpReward: 10, exercises: [],
        titleOrigin: 'cited', src: 'THK06:228', from: 'sirusht',
      },
      {
        id: 'ckb-l5_2', unitId: 'ckb-u5', title: 'Animals', titleKu: 'canewer',
        titleTr: 'Hayvanlar', type: 'vocab', order: 2, xpReward: 10, exercises: [],
        titleOrigin: 'cited', src: 'THK06:193', from: 'jânawar',
      },
      {
        id: 'ckb-l5_3', unitId: 'ckb-u5', title: 'Weather & Seasons', titleKu: 'befr u baran',
        titleTr: 'Hava & Mevsimler', type: 'vocab', order: 3, xpReward: 10, exercises: [],
        titleOrigin: 'authored',
        titleNote:
          'Composed for this app from befr "snow" (THK06:167, bafr) and baran "rain" (THK06:170, bârân), ' +
          'joined by u "and" (THK06:234). No headword in the glossary is glossed "weather": the closest the ' +
          'nature theme found was siruşt "nature", which the first lesson of this unit already carries.',
      },
      {
        id: 'ckb-l5_4', unitId: 'ckb-u5', title: 'Review: Nature & Animals', titleKu: REVIEW_TITLE_KU,
        titleTr: 'Tekrar: Doğa & Hayvanlar', type: 'vocab', order: 4, xpReward: 10, exercises: [],
        ...REVIEW_TITLE,
      },
    ],
  },
  // numbers (16) + time (13). 29 words.
  //  ckb-l6_1  numbers  yêk, dû, sê, çwar, pênc, şeş, hewt, heşt, no, de
  //  ckb-l6_2  numbers  bîst, sî, çil, penca, sed, hezar
  //  ckb-l6_3  time  roj, şew, hefte, sall, seat, beyanî, êware, êsta, imrro, dwênê, zû, direng, hemîşe
  //  ckb-l6_4  review, all 29
  {
    id: 'ckb-u6', courseId: 'ckb-c2', title: 'Numbers & Time', titleKu: 'jimare u kat',
    description: 'Counting, the parts of a day, and saying when something happens',
    titleTr: 'Sayılar & Zaman',
    descriptionTr: 'Sayma, günün bölümleri ve bir şeyin ne zaman olduğunu söyleme',
    icon: 'time-outline', order: 6,
    titleOrigin: 'authored',
    titleNote:
      'Composed for this app from the two theme labels the unit covers, jimare "number" (THK06:239, zhimâra) ' +
      'and kat "time" (THK06:195, kât), joined by u "and" (THK06:234).',
    lessons: [
      {
        id: 'ckb-l6_1', unitId: 'ckb-u6', title: 'Numbers 1-10', titleKu: 'jimare',
        titleTr: 'Sayılar 1-10', type: 'vocab', order: 1, xpReward: 10, exercises: [],
        titleOrigin: 'cited', src: 'THK06:239', from: 'zhimâra',
        fromNote: 'p. 239 glosses this "number, issue". Only the counting sense is meant by the title; the other is the issue of a periodical.',
      },
      {
        id: 'ckb-l6_2', unitId: 'ckb-u6', title: 'Tens & Hundreds', titleKu: 'sed u hezar',
        titleTr: 'Onlar & Yüzler', type: 'vocab', order: 2, xpReward: 10, exercises: [],
        titleOrigin: 'authored',
        titleNote:
          'Composed for this app from sed "hundred" (THK06:17, sad) and hezar "thousand" (THK06:17, hazâr), ' +
          'joined by u "and" (THK06:234). p. 17 is the numeral table in the body of the grammar, not the ' +
          'glossary, which is where every numeral this track teaches is cited from.',
      },
      {
        id: 'ckb-l6_3', unitId: 'ckb-u6', title: 'Days & Times of Day', titleKu: 'kat',
        titleTr: 'Günler & Günün Saatleri', type: 'vocab', order: 3, xpReward: 10, exercises: [],
        titleOrigin: 'cited', src: 'THK06:195', from: 'kât',
        fromNote: 'p. 195 prints this as kât1. kât2, five lines below it, is "back of the neck".',
      },
      {
        id: 'ckb-l6_4', unitId: 'ckb-u6', title: 'Review: Numbers & Time', titleKu: REVIEW_TITLE_KU,
        titleTr: 'Tekrar: Sayılar & Zaman', type: 'vocab', order: 4, xpReward: 10, exercises: [],
        ...REVIEW_TITLE,
      },
    ],
  },
];
