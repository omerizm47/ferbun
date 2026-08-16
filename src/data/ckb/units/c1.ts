// Fêrbûn: the three units of the Sorani course "First Words".
// Titles answer to the cited/authored split ../courses.ts sets out. The comment
// above each unit records which theme each of its lessons draws on and which
// words, because the exercises milestone has to pick from exactly that pool and
// the Lesson type has no field for it.

import { REVIEW_TITLE, REVIEW_TITLE_KU } from './review';
import type { SoraniUnit } from '../courses';

export const CKB_C1_UNITS: SoraniUnit[] = [
  // greetings (9) + function (14). 23 words.
  //  ckb-l1_1  greetings  sllaw, spas, baş, awell, dost, mîwan, xatir
  //  ckb-l1_2  greetings + function  erê, ne | zor, tenha, hemû, u, bellam
  //  ckb-l1_3  function  eme, ew, çi, kê, bo çi, çon, ke, be, le
  //  ckb-l1_4  review, all 23
  {
    id: 'ckb-u1', courseId: 'ckb-c1', title: 'Greetings & Basics', titleKu: 'sllaw',
    description: 'Greeting people, yes and no, and the words that hold a sentence together',
    titleTr: 'Selamlaşma & Temeller',
    descriptionTr: 'İnsanları selamlama, evet ve hayır, ve cümleyi bir arada tutan kelimeler',
    icon: 'chatbubble-outline', order: 1,
    titleOrigin: 'cited', src: 'THK06:228', from: 'słâw',
    lessons: [
      {
        id: 'ckb-l1_1', unitId: 'ckb-u1', title: 'Greetings & Friends', titleKu: 'dost',
        titleTr: 'Selamlaşma & Arkadaşlar', type: 'vocab', order: 1, xpReward: 10, exercises: [],
        titleOrigin: 'cited', src: 'THK06:182', from: 'dost',
      },
      {
        id: 'ckb-l1_2', unitId: 'ckb-u1', title: 'Yes, No & Common Words', titleKu: 'erê u ne',
        titleTr: 'Evet, Hayır & Sık Kelimeler', type: 'vocab', order: 2, xpReward: 10, exercises: [],
        titleOrigin: 'authored',
        titleNote:
          'Composed for this app from erê "yes" (THK06:164, are) and ne "no" (THK06:208, na), joined by ' +
          'u "and" (THK06:234), all three taught by this lesson. No headword names the pair.',
      },
      {
        id: 'ckb-l1_3', unitId: 'ckb-u1', title: 'This, That & Questions', titleKu: 'eme u ew',
        titleTr: 'Bu, Şu & Sorular', type: 'grammar', order: 3, xpReward: 10, exercises: [],
        titleOrigin: 'authored',
        titleNote:
          'Composed for this app from the two demonstratives the lesson opens on, eme "this" (THK06:163, ama) ' +
          'and ew "he, she, it; that" (THK06:164, aw), joined by u "and" (THK06:234). The question words and ' +
          'the two prepositions beside them have no cover term in the glossary, which is the same gap the ' +
          'authored function-theme label amrraz records.',
      },
      {
        id: 'ckb-l1_4', unitId: 'ckb-u1', title: 'Review: Basics', titleKu: REVIEW_TITLE_KU,
        titleTr: 'Tekrar: Temeller', type: 'vocab', order: 4, xpReward: 10, exercises: [],
        ...REVIEW_TITLE,
      },
    ],
  },
  // family (16). 16 words.
  //  ckb-l2_1  family  bawk, dayk, bira, xwişk, mam
  //  ckb-l2_2  family  kurr, kiç, minall, law, newe, pîremêrd
  //  ckb-l2_3  family  binemalle, jin, kes, xellk, netewe
  //  ckb-l2_4  review, all 16
  {
    id: 'ckb-u2', courseId: 'ckb-c1', title: 'People & Family', titleKu: 'binemalle',
    description: 'Family members, the people around them, and the words for a people',
    titleTr: 'İnsanlar & Aile',
    descriptionTr: 'Aile üyeleri, çevrelerindeki insanlar ve bir halkı adlandıran kelimeler',
    icon: 'people-outline', order: 2,
    titleOrigin: 'cited', src: 'THK06:171', from: 'binamâła',
    fromNote: 'p. 171 prints this as the tilde sub-entry ~amâł(a) under the headword bin, with the final a optional.',
    lessons: [
      {
        id: 'ckb-l2_1', unitId: 'ckb-u2', title: 'Parents & Siblings', titleKu: 'bawk u dayk',
        titleTr: 'Anne Baba & Kardeşler', type: 'vocab', order: 1, xpReward: 10, exercises: [],
        titleOrigin: 'authored',
        titleNote:
          'Composed for this app from bawk "father" (THK06:171, bâwk) and dayk "mother" (THK06:181, dâyk), ' +
          'joined by u "and" (THK06:234). Both entries carry a fromNote about the furtive i the page prints ' +
          'and this title inherits it: the pages read bâwik and dâyik.',
      },
      {
        id: 'ckb-l2_2', unitId: 'ckb-u2', title: 'Children & Young People', titleKu: 'minall',
        titleTr: 'Çocuklar & Gençler', type: 'vocab', order: 2, xpReward: 10, exercises: [],
        titleOrigin: 'cited', src: 'THK06:207', from: 'minâł',
      },
      {
        id: 'ckb-l2_3', unitId: 'ckb-u2', title: 'People & Nation', titleKu: 'xellk',
        titleTr: 'İnsanlar & Ulus', type: 'vocab', order: 3, xpReward: 10, exercises: [],
        titleOrigin: 'cited', src: 'THK06:196', from: 'khałk',
      },
      {
        id: 'ckb-l2_4', unitId: 'ckb-u2', title: 'Review: People', titleKu: REVIEW_TITLE_KU,
        titleTr: 'Tekrar: İnsanlar', type: 'vocab', order: 4, xpReward: 10, exercises: [],
        ...REVIEW_TITLE,
      },
    ],
  },
  // food (15) + home (20). 35 words, the heaviest unit in the tree.
  //  ckb-l3_1  food  nan, aw, çay, şîr, mast, penêr, xorak, çêşt
  //  ckb-l3_2  food + home  goşt, hêlke, xwê, ron, hengwên, mêwe, gull | mêz, çimçe, çeqo, çingall, fincan, lîwan
  //  ckb-l3_3  home  mall, hode, derga, pencere, dîwar, ban, hewşe, sennelî, çira, agir, ktaw, perraw, qellem, kaxez
  //  ckb-l3_4  review, all 35
  {
    id: 'ckb-u3', courseId: 'ckb-c1', title: 'Everyday Words', titleKu: 'xorak u mall',
    description: 'Food and drink, what is on the table, and the rooms and objects of a house',
    titleTr: 'Günlük Kelimeler',
    descriptionTr: 'Yiyecek ve içecek, sofradakiler, evin odaları ve eşyaları',
    icon: 'home-outline', order: 3,
    titleOrigin: 'authored',
    titleNote:
      'Composed for this app from the two theme labels the unit covers, xorak "food" (THK06:199, khorâk) and ' +
      'mall "house, home" (THK06:206, mâł), joined by u "and" (THK06:234). "Everyday Words" names a class the ' +
      'glossary has no headword for.',
    lessons: [
      {
        id: 'ckb-l3_1', unitId: 'ckb-u3', title: 'Food & Drink', titleKu: 'xorak',
        titleTr: 'Yiyecek & İçecek', type: 'vocab', order: 1, xpReward: 10, exercises: [],
        titleOrigin: 'cited', src: 'THK06:199', from: 'khorâk',
      },
      {
        id: 'ckb-l3_2', unitId: 'ckb-u3', title: 'At the Table', titleKu: 'mêz',
        titleTr: 'Sofrada', type: 'vocab', order: 2, xpReward: 10, exercises: [],
        titleOrigin: 'cited', src: 'THK06:207', from: 'mez',
      },
      {
        id: 'ckb-l3_3', unitId: 'ckb-u3', title: 'Around the House', titleKu: 'mall',
        titleTr: 'Evde', type: 'vocab', order: 3, xpReward: 10, exercises: [],
        titleOrigin: 'cited', src: 'THK06:206', from: 'mâł',
      },
      {
        id: 'ckb-l3_4', unitId: 'ckb-u3', title: 'Review: Everyday', titleKu: REVIEW_TITLE_KU,
        titleTr: 'Tekrar: Günlük', type: 'vocab', order: 4, xpReward: 10, exercises: [],
        ...REVIEW_TITLE,
      },
    ],
  },
];
