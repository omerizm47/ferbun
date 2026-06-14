import { Course } from './types';

export const courses: Course[] = [
  {
    id: 'c1',
    title: 'First Words',
    titleKu: 'Peyvên Pêşîn',
    description: 'Essential words and phrases to start speaking Kurdish',
    titleTr: 'İlk Kelimeler',
    descriptionTr: 'Kürtçe konuşmaya başlamak için temel kelimeler ve ifadeler',
    icon: 'book-outline',
    units: [
      {
        id: 'u1', courseId: 'c1', title: 'Hello & Basics', titleKu: 'Silav û Destpêk',
        description: 'Greetings, yes/no, and your first Kurdish words',
        titleTr: 'Merhaba & Temeller',
        descriptionTr: 'Selamlaşmalar, evet/hayır ve ilk Kürtçe kelimelerin',
        icon: 'chatbubble-outline', order: 1,
        lessons: [
          { id: 'l1_1', unitId: 'u1', title: 'Greetings', titleKu: 'Silav', titleTr: 'Selamlaşma', type: 'vocab', order: 1, xpReward: 10, exercises: [] },
          { id: 'l1_2', unitId: 'u1', title: 'Yes, No & Common Words', titleKu: 'Erê, Na', titleTr: 'Evet, Hayır & Sık Kelimeler', type: 'vocab', order: 2, xpReward: 10, exercises: [] },
          { id: 'l1_3', unitId: 'u1', title: 'I am, You are', titleKu: 'Ez im, Tu yî', titleTr: 'Ben…im, Sen…sin', type: 'grammar', order: 3, xpReward: 10, exercises: [] },
          { id: 'l1_4', unitId: 'u1', title: 'Review: Basics', titleKu: 'Dubare', titleTr: 'Tekrar: Temeller', type: 'vocab', order: 4, xpReward: 10, exercises: [] },
        ],
      },
      {
        id: 'u2', courseId: 'c1', title: 'People & Family', titleKu: 'Mirov û Malbat',
        description: 'Family members and introducing yourself',
        titleTr: 'İnsanlar & Aile',
        descriptionTr: 'Aile üyeleri ve kendini tanıtma',
        icon: 'people-outline', order: 2,
        lessons: [
          { id: 'l2_1', unitId: 'u2', title: 'Family', titleKu: 'Malbat', titleTr: 'Aile', type: 'vocab', order: 1, xpReward: 10, exercises: [] },
          { id: 'l2_2', unitId: 'u2', title: 'People & Roles', titleKu: 'Mirov', titleTr: 'İnsanlar & Roller', type: 'vocab', order: 2, xpReward: 10, exercises: [] },
          { id: 'l2_3', unitId: 'u2', title: 'My, Your, His', titleKu: 'Yê min, Yê te', titleTr: 'Benim, Senin, Onun', type: 'grammar', order: 3, xpReward: 10, exercises: [] },
          { id: 'l2_4', unitId: 'u2', title: 'Review: People', titleKu: 'Dubare', titleTr: 'Tekrar: İnsanlar', type: 'vocab', order: 4, xpReward: 10, exercises: [] },
        ],
      },
      {
        id: 'u3', courseId: 'c1', title: 'Everyday Words', titleKu: 'Peyvên Rojane',
        description: 'Food, drinks, home, and common objects',
        titleTr: 'Günlük Kelimeler',
        descriptionTr: 'Yiyecek, içecek, ev ve sık kullanılan eşyalar',
        icon: 'home-outline', order: 3,
        lessons: [
          { id: 'l3_1', unitId: 'u3', title: 'Food & Drink', titleKu: 'Xwarin û Vexwarin', titleTr: 'Yiyecek & İçecek', type: 'vocab', order: 1, xpReward: 10, exercises: [] },
          { id: 'l3_2', unitId: 'u3', title: 'Around the House', titleKu: 'Li Malê', titleTr: 'Evde', type: 'vocab', order: 2, xpReward: 10, exercises: [] },
          { id: 'l3_3', unitId: 'u3', title: 'This & That', titleKu: 'Ev û Ew', titleTr: 'Bu & Şu', type: 'grammar', order: 3, xpReward: 10, exercises: [] },
          { id: 'l3_4', unitId: 'u3', title: 'Review: Everyday', titleKu: 'Dubare', titleTr: 'Tekrar: Günlük', type: 'vocab', order: 4, xpReward: 10, exercises: [] },
        ],
      },
    ],
  },
  {
    id: 'c2',
    title: 'Building Sentences',
    titleKu: 'Hevok Çêkirin',
    description: 'Describe the world and form sentences',
    titleTr: 'Cümle Kurma',
    descriptionTr: 'Dünyayı betimle ve cümleler kur',
    icon: 'construct-outline',
    units: [
      {
        id: 'u4', courseId: 'c2', title: 'Descriptions', titleKu: 'Danasîn',
        description: 'Colors, sizes, and describing things',
        titleTr: 'Betimlemeler',
        descriptionTr: 'Renkler, boyutlar ve nesneleri betimleme',
        icon: 'color-palette-outline', order: 4,
        lessons: [
          { id: 'l4_1', unitId: 'u4', title: 'Colors', titleKu: 'Reng', titleTr: 'Renkler', type: 'vocab', order: 1, xpReward: 10, exercises: [] },
          { id: 'l4_2', unitId: 'u4', title: 'Size & Quality', titleKu: 'Mezin û Biçûk', titleTr: 'Boyut & Nitelik', type: 'vocab', order: 2, xpReward: 10, exercises: [] },
          { id: 'l4_3', unitId: 'u4', title: 'The Big House', titleKu: 'Xaniyê Mezin', titleTr: 'Büyük Ev', type: 'grammar', order: 3, xpReward: 10, exercises: [] },
          { id: 'l4_4', unitId: 'u4', title: 'Review: Descriptions', titleKu: 'Dubare', titleTr: 'Tekrar: Betimlemeler', type: 'vocab', order: 4, xpReward: 10, exercises: [] },
        ],
      },
      {
        id: 'u5', courseId: 'c2', title: 'Nature & Animals', titleKu: 'Xweza û Ajal',
        description: 'The natural world, seasons, and animals',
        titleTr: 'Doğa & Hayvanlar',
        descriptionTr: 'Doğa, mevsimler ve hayvanlar',
        icon: 'leaf-outline', order: 5,
        lessons: [
          { id: 'l5_1', unitId: 'u5', title: 'Nature', titleKu: 'Xweza', titleTr: 'Doğa', type: 'vocab', order: 1, xpReward: 10, exercises: [] },
          { id: 'l5_2', unitId: 'u5', title: 'Animals', titleKu: 'Ajal', titleTr: 'Hayvanlar', type: 'vocab', order: 2, xpReward: 10, exercises: [] },
          { id: 'l5_3', unitId: 'u5', title: 'Seasons & Weather', titleKu: 'Werz û Hewa', titleTr: 'Mevsimler & Hava', type: 'vocab', order: 3, xpReward: 10, exercises: [] },
          { id: 'l5_4', unitId: 'u5', title: 'Review: Nature', titleKu: 'Dubare', titleTr: 'Tekrar: Doğa', type: 'vocab', order: 4, xpReward: 10, exercises: [] },
        ],
      },
      {
        id: 'u6', courseId: 'c2', title: 'Numbers & Time', titleKu: 'Hejmar û Dem',
        description: 'Counting, days, and telling time',
        titleTr: 'Sayılar & Zaman',
        descriptionTr: 'Sayma, günler ve saati söyleme',
        icon: 'time-outline', order: 6,
        lessons: [
          { id: 'l6_1', unitId: 'u6', title: 'Numbers 1-10', titleKu: 'Hejmar', titleTr: 'Sayılar 1-10', type: 'vocab', order: 1, xpReward: 10, exercises: [] },
          { id: 'l6_2', unitId: 'u6', title: 'Numbers 11-100', titleKu: 'Hejmar', titleTr: 'Sayılar 11-100', type: 'vocab', order: 2, xpReward: 10, exercises: [] },
          { id: 'l6_3', unitId: 'u6', title: 'Days & Months', titleKu: 'Roj û Meh', titleTr: 'Günler & Aylar', type: 'vocab', order: 3, xpReward: 10, exercises: [] },
          { id: 'l6_4', unitId: 'u6', title: 'Review: Numbers', titleKu: 'Dubare', titleTr: 'Tekrar: Sayılar', type: 'vocab', order: 4, xpReward: 10, exercises: [] },
        ],
      },
    ],
  },
  {
    id: 'c3',
    title: 'Actions & Verbs',
    titleKu: 'Kirin û Lêker',
    description: 'Express what you do, want, and can do',
    titleTr: 'Eylemler & Fiiller',
    descriptionTr: 'Ne yaptığını, istediğini ve yapabildiğini ifade et',
    icon: 'flash-outline',
    units: [
      {
        id: 'u7', courseId: 'c3', title: 'Common Verbs', titleKu: 'Lêkerên Hevpar',
        description: 'Go, come, eat, drink, see, know',
        titleTr: 'Sık Kullanılan Fiiller',
        descriptionTr: 'Gitmek, gelmek, yemek, içmek, görmek, bilmek',
        icon: 'walk-outline', order: 7,
        lessons: [
          { id: 'l7_1', unitId: 'u7', title: 'Go & Come', titleKu: 'Çûn û Hatin', titleTr: 'Gitmek & Gelmek', type: 'vocab', order: 1, xpReward: 10, exercises: [] },
          { id: 'l7_2', unitId: 'u7', title: 'Eat, Drink, See', titleKu: 'Xwarin, Dîtin', titleTr: 'Yemek, İçmek, Görmek', type: 'vocab', order: 2, xpReward: 10, exercises: [] },
          { id: 'l7_3', unitId: 'u7', title: 'I go, You come', titleKu: 'Ez diçim', titleTr: 'Ben giderim, Sen gelirsin', type: 'grammar', order: 3, xpReward: 10, exercises: [] },
          { id: 'l7_4', unitId: 'u7', title: 'Review: Verbs', titleKu: 'Dubare', titleTr: 'Tekrar: Fiiller', type: 'vocab', order: 4, xpReward: 10, exercises: [] },
        ],
      },
      {
        id: 'u8', courseId: 'c3', title: 'Wants & Feelings', titleKu: 'Xwestin û Hest',
        description: 'Express desires, abilities, and emotions',
        titleTr: 'İstekler & Duygular',
        descriptionTr: 'Arzularını, yeteneklerini ve duygularını ifade et',
        icon: 'bulb-outline', order: 8,
        lessons: [
          { id: 'l8_1', unitId: 'u8', title: 'More Verbs', titleKu: 'Lêkerên Din', titleTr: 'Daha Fazla Fiil', type: 'vocab', order: 1, xpReward: 10, exercises: [] },
          { id: 'l8_2', unitId: 'u8', title: 'Feelings & States', titleKu: 'Hest û Rewş', titleTr: 'Duygular & Durumlar', type: 'vocab', order: 2, xpReward: 10, exercises: [] },
          { id: 'l8_3', unitId: 'u8', title: 'I want, I can', titleKu: 'Ez dixwazim', titleTr: 'İstiyorum, Yapabilirim', type: 'grammar', order: 3, xpReward: 10, exercises: [] },
          { id: 'l8_4', unitId: 'u8', title: 'Review: Actions', titleKu: 'Dubare', titleTr: 'Tekrar: Eylemler', type: 'vocab', order: 4, xpReward: 10, exercises: [] },
        ],
      },
      {
        id: 'u9', courseId: 'c3', title: 'Clothes & Market', titleKu: 'Cil û Bazar',
        description: 'Clothing, shopping, and everyday animals',
        titleTr: 'Giysiler & Pazar',
        descriptionTr: 'Giyim, alışveriş ve günlük hayvanlar',
        icon: 'shirt-outline', order: 9,
        lessons: [
          { id: 'l9_1', unitId: 'u9', title: 'Clothes', titleKu: 'Cil û Berg', titleTr: 'Giysiler', type: 'vocab', order: 1, xpReward: 10, exercises: [] },
          { id: 'l9_2', unitId: 'u9', title: 'At the Market', titleKu: 'Li Bazarê', titleTr: 'Pazarda', type: 'vocab', order: 2, xpReward: 10, exercises: [] },
          { id: 'l9_3', unitId: 'u9', title: 'Animals & Food', titleKu: 'Ajal û Xwarin', titleTr: 'Hayvanlar & Yiyecek', type: 'vocab', order: 3, xpReward: 10, exercises: [] },
          { id: 'l9_4', unitId: 'u9', title: 'Review: Clothes & Market', titleKu: 'Dubare', titleTr: 'Tekrar: Giysiler & Pazar', type: 'vocab', order: 4, xpReward: 10, exercises: [] },
        ],
      },
      {
        id: 'u10', courseId: 'c3', title: 'Body & Health', titleKu: 'Laşê Mirov',
        description: 'Body parts, feeling sick or well, and talking about yourself',
        titleTr: 'Beden & Sağlık',
        descriptionTr: 'Vücut bölümleri, hasta ya da iyi hissetme ve kendinden söz etme',
        icon: 'body-outline', order: 10,
        lessons: [
          { id: 'l10_1', unitId: 'u10', title: 'Body Parts', titleKu: 'Laş', titleTr: 'Vücut Bölümleri', type: 'vocab', order: 1, xpReward: 10, exercises: [] },
          { id: 'l10_2', unitId: 'u10', title: 'Health & Feeling', titleKu: 'Nexweş û Sax', titleTr: 'Sağlık & His', type: 'vocab', order: 2, xpReward: 10, exercises: [] },
          { id: 'l10_3', unitId: 'u10', title: 'My Hand, My Head', titleKu: 'Destê Min', titleTr: 'Elim, Başım', type: 'grammar', order: 3, xpReward: 10, exercises: [] },
          { id: 'l10_4', unitId: 'u10', title: 'Review: Body & Health', titleKu: 'Dubare', titleTr: 'Tekrar: Beden & Sağlık', type: 'vocab', order: 4, xpReward: 10, exercises: [] },
        ],
      },
    ],
  },
];

export const getCourseById = (id: string) => courses.find((c) => c.id === id);
export const getUnitById = (unitId: string) => {
  for (const course of courses) {
    const unit = course.units.find((u) => u.id === unitId);
    if (unit) return unit;
  }
  return undefined;
};
export const getLessonById = (lessonId: string) => {
  for (const course of courses) {
    for (const unit of course.units) {
      const lesson = unit.lessons.find((l) => l.id === lessonId);
      if (lesson) return lesson;
    }
  }
  return undefined;
};
export const getTotalLessons = () => {
  let count = 0;
  courses.forEach((c) => c.units.forEach((u) => (count += u.lessons.length)));
  return count;
};
