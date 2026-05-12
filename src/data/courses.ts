import { Course } from './types';

export const courses: Course[] = [
  {
    id: 'c1',
    title: 'First Words',
    titleKu: 'Peyvên Pêşîn',
    description: 'Essential words and phrases to start speaking Kurdish',
    icon: 'book-outline',
    units: [
      {
        id: 'u1', courseId: 'c1', title: 'Hello & Basics', titleKu: 'Silav û Destpêk',
        description: 'Greetings, yes/no, and your first Kurdish words',
        icon: 'chatbubble-outline', order: 1,
        lessons: [
          { id: 'l1_1', unitId: 'u1', title: 'Greetings', titleKu: 'Silav', type: 'vocab', order: 1, xpReward: 10, exercises: [] },
          { id: 'l1_2', unitId: 'u1', title: 'Yes, No & Common Words', titleKu: 'Erê, Na', type: 'vocab', order: 2, xpReward: 10, exercises: [] },
          { id: 'l1_3', unitId: 'u1', title: 'I am, You are', titleKu: 'Ez im, Tu yî', type: 'grammar', order: 3, xpReward: 10, exercises: [] },
          { id: 'l1_4', unitId: 'u1', title: 'Review: Basics', titleKu: 'Dubare', type: 'vocab', order: 4, xpReward: 10, exercises: [] },
        ],
      },
      {
        id: 'u2', courseId: 'c1', title: 'People & Family', titleKu: 'Mirov û Malbat',
        description: 'Family members and introducing yourself',
        icon: 'people-outline', order: 2,
        lessons: [
          { id: 'l2_1', unitId: 'u2', title: 'Family', titleKu: 'Malbat', type: 'vocab', order: 1, xpReward: 10, exercises: [] },
          { id: 'l2_2', unitId: 'u2', title: 'People & Roles', titleKu: 'Mirov', type: 'vocab', order: 2, xpReward: 10, exercises: [] },
          { id: 'l2_3', unitId: 'u2', title: 'My, Your, His', titleKu: 'Yê min, Yê te', type: 'grammar', order: 3, xpReward: 10, exercises: [] },
          { id: 'l2_4', unitId: 'u2', title: 'Review: People', titleKu: 'Dubare', type: 'vocab', order: 4, xpReward: 10, exercises: [] },
        ],
      },
      {
        id: 'u3', courseId: 'c1', title: 'Everyday Words', titleKu: 'Peyvên Rojane',
        description: 'Food, drinks, home, and common objects',
        icon: 'home-outline', order: 3,
        lessons: [
          { id: 'l3_1', unitId: 'u3', title: 'Food & Drink', titleKu: 'Xwarin û Vexwarin', type: 'vocab', order: 1, xpReward: 10, exercises: [] },
          { id: 'l3_2', unitId: 'u3', title: 'Around the House', titleKu: 'Li Malê', type: 'vocab', order: 2, xpReward: 10, exercises: [] },
          { id: 'l3_3', unitId: 'u3', title: 'This & That', titleKu: 'Ev û Ew', type: 'grammar', order: 3, xpReward: 10, exercises: [] },
          { id: 'l3_4', unitId: 'u3', title: 'Review: Everyday', titleKu: 'Dubare', type: 'vocab', order: 4, xpReward: 10, exercises: [] },
        ],
      },
    ],
  },
  {
    id: 'c2',
    title: 'Building Sentences',
    titleKu: 'Hevok Çêkirin',
    description: 'Describe the world and form sentences',
    icon: 'construct-outline',
    units: [
      {
        id: 'u4', courseId: 'c2', title: 'Descriptions', titleKu: 'Danasîn',
        description: 'Colors, sizes, and describing things',
        icon: 'color-palette-outline', order: 4,
        lessons: [
          { id: 'l4_1', unitId: 'u4', title: 'Colors', titleKu: 'Reng', type: 'vocab', order: 1, xpReward: 10, exercises: [] },
          { id: 'l4_2', unitId: 'u4', title: 'Size & Quality', titleKu: 'Mezin û Biçûk', type: 'vocab', order: 2, xpReward: 10, exercises: [] },
          { id: 'l4_3', unitId: 'u4', title: 'The Big House', titleKu: 'Xaniyê Mezin', type: 'grammar', order: 3, xpReward: 10, exercises: [] },
          { id: 'l4_4', unitId: 'u4', title: 'Review: Descriptions', titleKu: 'Dubare', type: 'vocab', order: 4, xpReward: 10, exercises: [] },
        ],
      },
      {
        id: 'u5', courseId: 'c2', title: 'Nature & Animals', titleKu: 'Xweza û Ajal',
        description: 'The natural world, seasons, and animals',
        icon: 'leaf-outline', order: 5,
        lessons: [
          { id: 'l5_1', unitId: 'u5', title: 'Nature', titleKu: 'Xweza', type: 'vocab', order: 1, xpReward: 10, exercises: [] },
          { id: 'l5_2', unitId: 'u5', title: 'Animals', titleKu: 'Ajal', type: 'vocab', order: 2, xpReward: 10, exercises: [] },
          { id: 'l5_3', unitId: 'u5', title: 'Seasons & Weather', titleKu: 'Werz û Hewa', type: 'vocab', order: 3, xpReward: 10, exercises: [] },
          { id: 'l5_4', unitId: 'u5', title: 'Review: Nature', titleKu: 'Dubare', type: 'vocab', order: 4, xpReward: 10, exercises: [] },
        ],
      },
      {
        id: 'u6', courseId: 'c2', title: 'Numbers & Time', titleKu: 'Hejmar û Dem',
        description: 'Counting, days, and telling time',
        icon: 'time-outline', order: 6,
        lessons: [
          { id: 'l6_1', unitId: 'u6', title: 'Numbers 1-10', titleKu: 'Hejmar', type: 'vocab', order: 1, xpReward: 10, exercises: [] },
          { id: 'l6_2', unitId: 'u6', title: 'Numbers 11-100', titleKu: 'Hejmar', type: 'vocab', order: 2, xpReward: 10, exercises: [] },
          { id: 'l6_3', unitId: 'u6', title: 'Days & Months', titleKu: 'Roj û Meh', type: 'vocab', order: 3, xpReward: 10, exercises: [] },
          { id: 'l6_4', unitId: 'u6', title: 'Review: Numbers', titleKu: 'Dubare', type: 'vocab', order: 4, xpReward: 10, exercises: [] },
        ],
      },
    ],
  },
  {
    id: 'c3',
    title: 'Actions & Verbs',
    titleKu: 'Kirin û Lêker',
    description: 'Express what you do, want, and can do',
    icon: 'flash-outline',
    units: [
      {
        id: 'u7', courseId: 'c3', title: 'Common Verbs', titleKu: 'Lêkerên Hevpar',
        description: 'Go, come, eat, drink, see, know',
        icon: 'walk-outline', order: 7,
        lessons: [
          { id: 'l7_1', unitId: 'u7', title: 'Go & Come', titleKu: 'Çûn û Hatin', type: 'vocab', order: 1, xpReward: 10, exercises: [] },
          { id: 'l7_2', unitId: 'u7', title: 'Eat, Drink, See', titleKu: 'Xwarin, Dîtin', type: 'vocab', order: 2, xpReward: 10, exercises: [] },
          { id: 'l7_3', unitId: 'u7', title: 'I go, You come', titleKu: 'Ez diçim', type: 'grammar', order: 3, xpReward: 10, exercises: [] },
          { id: 'l7_4', unitId: 'u7', title: 'Review: Verbs', titleKu: 'Dubare', type: 'vocab', order: 4, xpReward: 10, exercises: [] },
        ],
      },
      {
        id: 'u8', courseId: 'c3', title: 'Wants & Feelings', titleKu: 'Xwestin û Hest',
        description: 'Express desires, abilities, and emotions',
        icon: 'bulb-outline', order: 8,
        lessons: [
          { id: 'l8_1', unitId: 'u8', title: 'More Verbs', titleKu: 'Lêkerên Din', type: 'vocab', order: 1, xpReward: 10, exercises: [] },
          { id: 'l8_2', unitId: 'u8', title: 'Feelings & States', titleKu: 'Hest û Rewş', type: 'vocab', order: 2, xpReward: 10, exercises: [] },
          { id: 'l8_3', unitId: 'u8', title: 'I want, I can', titleKu: 'Ez dixwazim', type: 'grammar', order: 3, xpReward: 10, exercises: [] },
          { id: 'l8_4', unitId: 'u8', title: 'Review: Actions', titleKu: 'Dubare', type: 'vocab', order: 4, xpReward: 10, exercises: [] },
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
