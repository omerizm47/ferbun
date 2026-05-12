import { Exercise } from './types';

const E: Record<string, Exercise[]> = {

  // ===== COURSE 1: FIRST WORDS =====

  // U1L1: Greetings
  l1_1: [
    { id: 'e1', lessonId: 'l1_1', type: 'multiple_choice', questionKu: 'silav', questionEn: 'What does this word mean?', options: ['hello', 'goodbye', 'thank you', 'please'], correctAnswer: 'hello', order: 1 },
    { id: 'e2', lessonId: 'l1_1', type: 'multiple_choice', questionEn: 'How do you say "thanks" in Kurdish?', options: ['spas', 'silav', 'heval', 'rojbaş'], correctAnswer: 'spas', order: 2 },
    { id: 'e3', lessonId: 'l1_1', type: 'translation', questionEn: 'Write "good day" in Kurdish.', correctAnswer: 'rojbaş', order: 3 },
    { id: 'e4', lessonId: 'l1_1', type: 'multiple_choice', questionKu: 'heval', questionEn: 'What does this word mean?', options: ['friend', 'family', 'teacher', 'guest'], correctAnswer: 'friend', order: 4 },
    { id: 'e5', lessonId: 'l1_1', type: 'multiple_choice', questionKu: 'Silav li te!', questionEn: 'What does this phrase mean?', options: ['Hello to you!', 'Goodbye!', 'Thank you!', 'How are you?'], correctAnswer: 'Hello to you!', order: 5 },
    { id: 'e6', lessonId: 'l1_1', type: 'translation', questionEn: 'Write "friend" in Kurdish.', correctAnswer: 'heval', order: 6 },
  ],

  // U1L2: Yes, No & Common Words
  l1_2: [
    { id: 'e7', lessonId: 'l1_2', type: 'multiple_choice', questionEn: 'How do you say "yes" in Kurdish?', options: ['erê', 'na', 'baş', 'ne'], correctAnswer: 'erê', order: 1 },
    { id: 'e8', lessonId: 'l1_2', type: 'translation', questionEn: 'Write "no" in Kurdish.', correctAnswer: 'na', order: 2 },
    { id: 'e9', lessonId: 'l1_2', type: 'multiple_choice', questionKu: 'baş', questionEn: 'What does this word mean?', options: ['good', 'bad', 'big', 'small'], correctAnswer: 'good', order: 3 },
    { id: 'e10', lessonId: 'l1_2', type: 'multiple_choice', questionKu: 'Baş e.', questionEn: 'What does this phrase mean?', options: ['It is good.', 'It is bad.', 'It is big.', 'It is not.'], correctAnswer: 'It is good.', order: 4 },
    { id: 'e11', lessonId: 'l1_2', type: 'true_false', questionKu: 'na = yes', questionEn: 'Is this translation correct?', correctAnswer: 'False', explanation: '"Na" means "no." "Erê" means "yes."', order: 5 },
    { id: 'e12', lessonId: 'l1_2', type: 'translation', questionEn: 'Write "good" in Kurdish.', correctAnswer: 'baş', order: 6 },
  ],

  // U1L3: I am, You are (Grammar)
  l1_3: [
    { id: 'e13', lessonId: 'l1_3', type: 'multiple_choice', questionEn: 'How do you say "I am Kurdish"?', options: ['Ez kurd im.', 'Tu kurd î.', 'Ew kurd e.', 'Em kurd in.'], correctAnswer: 'Ez kurd im.', explanation: '"Ez" = I, "im" = am.', order: 1 },
    { id: 'e14', lessonId: 'l1_3', type: 'fill_blank', questionKu: 'Tu xwêndekár ____.', questionEn: 'Complete: "You are a student."', correctAnswer: 'î', order: 2 },
    { id: 'e15', lessonId: 'l1_3', type: 'multiple_choice', questionKu: 'Ew kurd e.', questionEn: 'What does this sentence mean?', options: ['He/She is Kurdish.', 'I am Kurdish.', 'We are Kurdish.', 'You are Kurdish.'], correctAnswer: 'He/She is Kurdish.', order: 3 },
    { id: 'e16', lessonId: 'l1_3', type: 'multiple_choice', questionKu: 'Ne baş e.', questionEn: 'What does this sentence mean?', options: ['It is not good.', 'It is good.', 'It is very good.', 'Is it good?'], correctAnswer: 'It is not good.', explanation: '"Ne" goes before what is negated.', order: 4 },
    { id: 'e17', lessonId: 'l1_3', type: 'fill_blank', questionKu: 'Em kurd ____.', questionEn: 'Complete: "We are Kurdish."', correctAnswer: 'in', order: 5 },
    { id: 'e18', lessonId: 'l1_3', type: 'translation', questionEn: 'Translate to Kurdish: "It is good."', correctAnswer: 'Baş e.', order: 6 },
  ],

  // U1L4: Review Basics
  l1_4: [
    { id: 'e19', lessonId: 'l1_4', type: 'multiple_choice', questionKu: 'Silav!', questionEn: 'What does this mean?', options: ['Hello!', 'Goodbye!', 'Thanks!', 'Sorry!'], correctAnswer: 'Hello!', order: 1 },
    { id: 'e20', lessonId: 'l1_4', type: 'translation', questionEn: 'Write "thanks" in Kurdish.', correctAnswer: 'spas', order: 2 },
    { id: 'e21', lessonId: 'l1_4', type: 'multiple_choice', questionEn: 'How do you say "I am Kurdish"?', options: ['Ez kurd im.', 'Tu kurd î.', 'Ew kurd e.', 'Na.'], correctAnswer: 'Ez kurd im.', order: 3 },
    { id: 'e22', lessonId: 'l1_4', type: 'translation', questionEn: 'Write "yes" in Kurdish.', correctAnswer: 'erê', order: 4 },
    { id: 'e23', lessonId: 'l1_4', type: 'multiple_choice', questionKu: 'heval', questionEn: 'What does this word mean?', options: ['friend', 'guest', 'teacher', 'city'], correctAnswer: 'friend', order: 5 },
    { id: 'e24', lessonId: 'l1_4', type: 'fill_blank', questionKu: 'Ew ne kurd ____.', questionEn: 'Complete: "He is not Kurdish."', correctAnswer: 'e', order: 6 },
  ],

  // U2L1: Family
  l2_1: [
    { id: 'e25', lessonId: 'l2_1', type: 'multiple_choice', questionKu: 'bav', questionEn: 'What does this word mean?', options: ['father', 'mother', 'brother', 'sister'], correctAnswer: 'father', order: 1 },
    { id: 'e26', lessonId: 'l2_1', type: 'multiple_choice', questionEn: 'How do you say "mother" in Kurdish?', options: ['dê', 'bav', 'xwişk', 'bira'], correctAnswer: 'dê', order: 2 },
    { id: 'e27', lessonId: 'l2_1', type: 'translation', questionEn: 'Write "brother" in Kurdish.', correctAnswer: 'bira', order: 3 },
    { id: 'e28', lessonId: 'l2_1', type: 'multiple_choice', questionKu: 'xwişk', questionEn: 'What does this word mean?', options: ['sister', 'brother', 'daughter', 'son'], correctAnswer: 'sister', order: 4 },
    { id: 'e29', lessonId: 'l2_1', type: 'multiple_choice', questionKu: 'zarok', questionEn: 'What does this word mean?', options: ['child', 'person', 'woman', 'man'], correctAnswer: 'child', order: 5 },
    { id: 'e30', lessonId: 'l2_1', type: 'multiple_choice', questionKu: 'kur', questionEn: 'What does this word mean?', options: ['boy, son', 'girl, daughter', 'child', 'father'], correctAnswer: 'boy, son', order: 6 },
    { id: 'e31', lessonId: 'l2_1', type: 'translation', questionEn: 'Write "family" in Kurdish.', correctAnswer: 'malbat', order: 7 },
  ],

  // U2L2: People & Roles
  l2_2: [
    { id: 'e32', lessonId: 'l2_2', type: 'multiple_choice', questionKu: 'mirov', questionEn: 'What does this word mean?', options: ['person', 'family', 'friend', 'village'], correctAnswer: 'person', order: 1 },
    { id: 'e33', lessonId: 'l2_2', type: 'multiple_choice', questionKu: 'jin', questionEn: 'What does this word mean?', options: ['woman, wife', 'man, husband', 'girl', 'boy'], correctAnswer: 'woman, wife', order: 2 },
    { id: 'e34', lessonId: 'l2_2', type: 'translation', questionEn: 'Write "man, husband" in Kurdish.', correctAnswer: 'mêr', order: 3 },
    { id: 'e35', lessonId: 'l2_2', type: 'multiple_choice', questionKu: 'mamoste', questionEn: 'What does this word mean?', options: ['teacher', 'student', 'doctor', 'friend'], correctAnswer: 'teacher', order: 4 },
    { id: 'e36', lessonId: 'l2_2', type: 'multiple_choice', questionKu: 'şagirt', questionEn: 'What does this word mean?', options: ['student', 'teacher', 'youth', 'elder'], correctAnswer: 'student', order: 5 },
    { id: 'e37', lessonId: 'l2_2', type: 'translation', questionEn: 'Write "people" in Kurdish.', correctAnswer: 'xelk', order: 6 },
  ],

  // U2L3: My, Your, His (Grammar)
  l2_3: [
    { id: 'e38', lessonId: 'l2_3', type: 'multiple_choice', questionEn: 'How do you say "my book" in Kurdish?', options: ['kitêba min', 'kitêba te', 'kitêba wî', 'kitêba me'], correctAnswer: 'kitêba min', explanation: '"Min" = my/me. The possessor follows the noun.', order: 1 },
    { id: 'e39', lessonId: 'l2_3', type: 'multiple_choice', questionKu: 'bavê min', questionEn: 'What does this phrase mean?', options: ['my father', 'your father', 'his father', 'our father'], correctAnswer: 'my father', order: 2 },
    { id: 'e40', lessonId: 'l2_3', type: 'fill_blank', questionKu: 'Mala ____ mezin e.', questionEn: 'Complete: "Your house is big."', correctAnswer: 'te', explanation: '"Te" = your (oblique of "tu").', order: 3 },
    { id: 'e41', lessonId: 'l2_3', type: 'multiple_choice', questionEn: 'Which pair means "I" (subject) and "me/my" (object)?', options: ['ez / min', 'tu / te', 'ew / wî', 'em / me'], correctAnswer: 'ez / min', order: 4 },
    { id: 'e42', lessonId: 'l2_3', type: 'true_false', questionKu: 'ew = he, she, it, they', questionEn: 'Is this correct?', correctAnswer: 'True', explanation: '"Ew" covers all third persons. Gender shows only in oblique: wî (him), wê (her).', order: 5 },
    { id: 'e43', lessonId: 'l2_3', type: 'translation', questionEn: 'Translate to Kurdish: "my mother"', correctAnswer: 'diya min', order: 6 },
  ],

  // U2L4: Review People
  l2_4: [
    { id: 'r1', lessonId: 'l2_4', type: 'multiple_choice', questionKu: 'malbat', questionEn: 'What does this word mean?', options: ['family', 'village', 'house', 'people'], correctAnswer: 'family', order: 1 },
    { id: 'r2', lessonId: 'l2_4', type: 'translation', questionEn: 'Write "sister" in Kurdish.', correctAnswer: 'xwişk', order: 2 },
    { id: 'r3', lessonId: 'l2_4', type: 'multiple_choice', questionKu: 'Bavê min mamoste ye.', questionEn: 'What does this sentence mean?', options: ['My father is a teacher.', 'Your father is a teacher.', 'My teacher is a father.', 'His father is a student.'], correctAnswer: 'My father is a teacher.', order: 3 },
    { id: 'r4', lessonId: 'l2_4', type: 'translation', questionEn: 'Write "teacher" in Kurdish.', correctAnswer: 'mamoste', order: 4 },
    { id: 'r5', lessonId: 'l2_4', type: 'fill_blank', questionKu: 'Kitêba ____ nû ye.', questionEn: 'Complete: "His book is new."', correctAnswer: 'wî', order: 5 },
    { id: 'r6', lessonId: 'l2_4', type: 'multiple_choice', questionKu: 'keç', questionEn: 'What does this word mean?', options: ['girl, daughter', 'boy, son', 'sister', 'mother'], correctAnswer: 'girl, daughter', order: 6 },
  ],

  // U3L1: Food & Drink
  l3_1: [
    { id: 'f1', lessonId: 'l3_1', type: 'multiple_choice', questionKu: 'nan', questionEn: 'What does this word mean?', options: ['bread', 'water', 'meat', 'milk'], correctAnswer: 'bread', order: 1 },
    { id: 'f2', lessonId: 'l3_1', type: 'translation', questionEn: 'Write "water" in Kurdish.', correctAnswer: 'av', order: 2 },
    { id: 'f3', lessonId: 'l3_1', type: 'multiple_choice', questionKu: 'çay', questionEn: 'What does this word mean?', options: ['tea', 'coffee', 'water', 'milk'], correctAnswer: 'tea', order: 3 },
    { id: 'f4', lessonId: 'l3_1', type: 'multiple_choice', questionKu: 'goşt', questionEn: 'What does this word mean?', options: ['meat', 'bread', 'milk', 'cheese'], correctAnswer: 'meat', order: 4 },
    { id: 'f5', lessonId: 'l3_1', type: 'multiple_choice', questionKu: 'şîr', questionEn: 'What does this word mean?', options: ['milk', 'sugar', 'salt', 'honey'], correctAnswer: 'milk', order: 5 },
    { id: 'f6', lessonId: 'l3_1', type: 'translation', questionEn: 'Write "cheese" in Kurdish.', correctAnswer: 'penîr', order: 6 },
    { id: 'f7', lessonId: 'l3_1', type: 'multiple_choice', questionEn: 'How do you say "sugar" in Kurdish?', options: ['şekir', 'şîr', 'xwê', 'hingiv'], correctAnswer: 'şekir', order: 7 },
  ],

  // U3L2: Around the House
  l3_2: [
    { id: 'h1', lessonId: 'l3_2', type: 'multiple_choice', questionKu: 'mal', questionEn: 'What does this word mean?', options: ['house, home', 'room', 'door', 'window'], correctAnswer: 'house, home', order: 1 },
    { id: 'h2', lessonId: 'l3_2', type: 'translation', questionEn: 'Write "room" in Kurdish.', correctAnswer: 'ode', order: 2 },
    { id: 'h3', lessonId: 'l3_2', type: 'multiple_choice', questionKu: 'derî', questionEn: 'What does this word mean?', options: ['door', 'window', 'wall', 'roof'], correctAnswer: 'door', order: 3 },
    { id: 'h4', lessonId: 'l3_2', type: 'multiple_choice', questionKu: 'kitêb', questionEn: 'What does this word mean?', options: ['book', 'table', 'chair', 'bed'], correctAnswer: 'book', order: 4 },
    { id: 'h5', lessonId: 'l3_2', type: 'multiple_choice', questionKu: 'Li ser masê kitêbek heye.', questionEn: 'What does this sentence mean?', options: ['There is a book on the table.', 'The table is big.', 'I see the book.', 'The book is mine.'], correctAnswer: 'There is a book on the table.', order: 5 },
    { id: 'h6', lessonId: 'l3_2', type: 'translation', questionEn: 'Write "fire" in Kurdish.', correctAnswer: 'agir', order: 6 },
    { id: 'h7', lessonId: 'l3_2', type: 'multiple_choice', questionKu: 'pencere', questionEn: 'What does this word mean?', options: ['window', 'door', 'wall', 'floor'], correctAnswer: 'window', order: 7 },
  ],

  // U3L3: This & That (Grammar)
  l3_3: [
    { id: 'g31', lessonId: 'l3_3', type: 'multiple_choice', questionKu: 'Ev mal e.', questionEn: 'What does this sentence mean?', options: ['This is a house.', 'That is a house.', 'The house is big.', 'My house.'], correctAnswer: 'This is a house.', explanation: '"Ev" = this/these.', order: 1 },
    { id: 'g32', lessonId: 'l3_3', type: 'multiple_choice', questionKu: 'Ew kitêb e.', questionEn: 'What does this sentence mean?', options: ['That is a book.', 'This is a book.', 'The book is new.', 'My book.'], correctAnswer: 'That is a book.', explanation: '"Ew" = that/those.', order: 2 },
    { id: 'g33', lessonId: 'l3_3', type: 'fill_blank', questionKu: '____ mase ye.', questionEn: 'Complete: "This is a table."', correctAnswer: 'Ev', order: 3 },
    { id: 'g34', lessonId: 'l3_3', type: 'multiple_choice', questionEn: 'How do you say "These are houses" in Kurdish?', options: ['Ev xanî ne.', 'Ew xanî ne.', 'Ev xanî ye.', 'Ew mal e.'], correctAnswer: 'Ev xanî ne.', explanation: '"Ne" is the plural copula for "are."', order: 4 },
    { id: 'g35', lessonId: 'l3_3', type: 'true_false', questionKu: 'ev = that, ew = this', questionEn: 'Is this correct?', correctAnswer: 'False', explanation: '"Ev" = this/these, "ew" = that/those.', order: 5 },
    { id: 'g36', lessonId: 'l3_3', type: 'translation', questionEn: 'Translate to Kurdish: "This is good."', correctAnswer: 'Ev baş e.', order: 6 },
  ],

  // U3L4: Review Everyday
  l3_4: [
    { id: 'rv1', lessonId: 'l3_4', type: 'translation', questionEn: 'Write "bread" in Kurdish.', correctAnswer: 'nan', order: 1 },
    { id: 'rv2', lessonId: 'l3_4', type: 'multiple_choice', questionKu: 'av', questionEn: 'What does this word mean?', options: ['water', 'fire', 'milk', 'tea'], correctAnswer: 'water', order: 2 },
    { id: 'rv3', lessonId: 'l3_4', type: 'multiple_choice', questionKu: 'Ev çay e.', questionEn: 'What does this sentence mean?', options: ['This is tea.', 'That is tea.', 'Tea is good.', 'I want tea.'], correctAnswer: 'This is tea.', order: 3 },
    { id: 'rv4', lessonId: 'l3_4', type: 'translation', questionEn: 'Write "house" in Kurdish.', correctAnswer: 'mal', order: 4 },
    { id: 'rv5', lessonId: 'l3_4', type: 'multiple_choice', questionKu: 'mase', questionEn: 'What does this word mean?', options: ['table', 'chair', 'door', 'book'], correctAnswer: 'table', order: 5 },
    { id: 'rv6', lessonId: 'l3_4', type: 'fill_blank', questionKu: '____ nan e.', questionEn: 'Complete: "That is bread."', correctAnswer: 'Ew', order: 6 },
  ],

  // ===== COURSE 2: BUILDING SENTENCES =====

  // U4L1: Colors
  l4_1: [
    { id: 'c1', lessonId: 'l4_1', type: 'multiple_choice', questionKu: 'sor', questionEn: 'What does this word mean?', options: ['red', 'blue', 'green', 'yellow'], correctAnswer: 'red', order: 1 },
    { id: 'c2', lessonId: 'l4_1', type: 'multiple_choice', questionKu: 'reş', questionEn: 'What does this word mean?', options: ['black', 'white', 'red', 'green'], correctAnswer: 'black', order: 2 },
    { id: 'c3', lessonId: 'l4_1', type: 'translation', questionEn: 'Write "green" in Kurdish.', correctAnswer: 'kesk', order: 3 },
    { id: 'c4', lessonId: 'l4_1', type: 'multiple_choice', questionKu: 'spî', questionEn: 'What does this word mean?', options: ['white', 'black', 'yellow', 'blue'], correctAnswer: 'white', order: 4 },
    { id: 'c5', lessonId: 'l4_1', type: 'translation', questionEn: 'Write "yellow" in Kurdish.', correctAnswer: 'zer', order: 5 },
    { id: 'c6', lessonId: 'l4_1', type: 'multiple_choice', questionEn: 'How do you say "blue" in Kurdish?', options: ['şîn', 'sor', 'zer', 'kesk'], correctAnswer: 'şîn', order: 6 },
  ],

  // U4L2: Size & Quality
  l4_2: [
    { id: 'd1', lessonId: 'l4_2', type: 'multiple_choice', questionKu: 'mezin', questionEn: 'What does this word mean?', options: ['big, great', 'small', 'tall', 'short'], correctAnswer: 'big, great', order: 1 },
    { id: 'd2', lessonId: 'l4_2', type: 'multiple_choice', questionKu: 'biçûk', questionEn: 'What does this word mean?', options: ['small, little', 'big', 'long', 'new'], correctAnswer: 'small, little', order: 2 },
    { id: 'd3', lessonId: 'l4_2', type: 'translation', questionEn: 'Write "new" in Kurdish.', correctAnswer: 'nû', order: 3 },
    { id: 'd4', lessonId: 'l4_2', type: 'multiple_choice', questionKu: 'bilind', questionEn: 'What does this word mean?', options: ['high, tall', 'short', 'deep', 'wide'], correctAnswer: 'high, tall', order: 4 },
    { id: 'd5', lessonId: 'l4_2', type: 'multiple_choice', questionKu: 'xweş', questionEn: 'What does this word mean?', options: ['nice, pleasant', 'ugly', 'big', 'cold'], correctAnswer: 'nice, pleasant', order: 5 },
    { id: 'd6', lessonId: 'l4_2', type: 'translation', questionEn: 'Write "old, ancient" in Kurdish.', correctAnswer: 'kevin', order: 6 },
    { id: 'd7', lessonId: 'l4_2', type: 'multiple_choice', questionKu: 'germ', questionEn: 'What does this word mean?', options: ['warm, hot', 'cold', 'big', 'nice'], correctAnswer: 'warm, hot', order: 7 },
  ],

  // U4L3: The Big House (Grammar - Construct)
  l4_3: [
    { id: 'gc1', lessonId: 'l4_3', type: 'multiple_choice', questionKu: 'mirovê mezin', questionEn: 'What does this phrase mean?', options: ['the big man', 'the small man', 'a big house', 'the new book'], correctAnswer: 'the big man', explanation: 'Adjectives follow the noun. Masculine nouns take "-ê" before adjectives.', order: 1 },
    { id: 'gc2', lessonId: 'l4_3', type: 'multiple_choice', questionKu: 'kitêba nû', questionEn: 'What does this phrase mean?', options: ['the new book', 'the old book', 'the big book', 'my book'], correctAnswer: 'the new book', explanation: 'Feminine nouns take "-a" before adjectives.', order: 2 },
    { id: 'gc3', lessonId: 'l4_3', type: 'fill_blank', questionKu: 'xaniyê ____', questionEn: 'Complete: "the small house"', correctAnswer: 'biçûk', order: 3 },
    { id: 'gc4', lessonId: 'l4_3', type: 'multiple_choice', questionEn: 'How do you say "the clean room" in Kurdish?', options: ['odeya paqij', 'odê paqij', 'paqij ode', 'ode paqij'], correctAnswer: 'odeya paqij', explanation: '"Ode" is feminine, so it becomes "odeya" before an adjective.', order: 4 },
    { id: 'gc5', lessonId: 'l4_3', type: 'true_false', questionKu: 'paqij ode = the clean room', questionEn: 'Is this word order correct?', correctAnswer: 'False', explanation: 'In Kurdish, adjectives follow the noun: "odeya paqij."', order: 5 },
    { id: 'gc6', lessonId: 'l4_3', type: 'translation', questionEn: 'Translate to Kurdish: "the big house"', correctAnswer: 'xaniyê mezin', order: 6 },
  ],

  // U4L4: Review Descriptions
  l4_4: [
    { id: 'rd1', lessonId: 'l4_4', type: 'translation', questionEn: 'Write "red" in Kurdish.', correctAnswer: 'sor', order: 1 },
    { id: 'rd2', lessonId: 'l4_4', type: 'multiple_choice', questionKu: 'kesk', questionEn: 'What does this word mean?', options: ['green', 'red', 'black', 'blue'], correctAnswer: 'green', order: 2 },
    { id: 'rd3', lessonId: 'l4_4', type: 'multiple_choice', questionKu: 'xaniyê nû', questionEn: 'What does this phrase mean?', options: ['the new house', 'the old house', 'my house', 'a big house'], correctAnswer: 'the new house', order: 3 },
    { id: 'rd4', lessonId: 'l4_4', type: 'translation', questionEn: 'Write "cold" in Kurdish.', correctAnswer: 'sar', order: 4 },
    { id: 'rd5', lessonId: 'l4_4', type: 'fill_blank', questionKu: 'kitêba ____', questionEn: 'Complete: "the old book"', correctAnswer: 'kevin', order: 5 },
    { id: 'rd6', lessonId: 'l4_4', type: 'multiple_choice', questionKu: 'Ew bajarê mezin e.', questionEn: 'What does this sentence mean?', options: ['That is a big city.', 'This is a small city.', 'The city is new.', 'My city is nice.'], correctAnswer: 'That is a big city.', order: 6 },
  ],

  // U5L1: Nature
  l5_1: [
    { id: 'n1', lessonId: 'l5_1', type: 'multiple_choice', questionKu: 'çiya', questionEn: 'What does this word mean?', options: ['mountain', 'river', 'lake', 'tree'], correctAnswer: 'mountain', order: 1 },
    { id: 'n2', lessonId: 'l5_1', type: 'multiple_choice', questionKu: 'çem', questionEn: 'What does this word mean?', options: ['river', 'mountain', 'sea', 'sky'], correctAnswer: 'river', order: 2 },
    { id: 'n3', lessonId: 'l5_1', type: 'translation', questionEn: 'Write "tree" in Kurdish.', correctAnswer: 'dar', order: 3 },
    { id: 'n4', lessonId: 'l5_1', type: 'multiple_choice', questionKu: 'stêrk', questionEn: 'What does this word mean?', options: ['star', 'moon', 'sun', 'sky'], correctAnswer: 'star', order: 4 },
    { id: 'n5', lessonId: 'l5_1', type: 'translation', questionEn: 'Write "sun" in Kurdish.', correctAnswer: 'roj', order: 5 },
    { id: 'n6', lessonId: 'l5_1', type: 'multiple_choice', questionKu: 'heyv', questionEn: 'What does this word mean?', options: ['moon', 'star', 'earth', 'cloud'], correctAnswer: 'moon', order: 6 },
    { id: 'n7', lessonId: 'l5_1', type: 'multiple_choice', questionEn: 'How do you say "lake" in Kurdish?', options: ['gol', 'çem', 'derya', 'av'], correctAnswer: 'gol', order: 7 },
  ],

  // U5L2: Animals
  l5_2: [
    { id: 'a1', lessonId: 'l5_2', type: 'multiple_choice', questionKu: 'gur', questionEn: 'What does this word mean?', options: ['wolf', 'dog', 'fox', 'bear'], correctAnswer: 'wolf', order: 1 },
    { id: 'a2', lessonId: 'l5_2', type: 'multiple_choice', questionKu: 'hesp', questionEn: 'What does this word mean?', options: ['horse', 'donkey', 'cow', 'sheep'], correctAnswer: 'horse', order: 2 },
    { id: 'a3', lessonId: 'l5_2', type: 'translation', questionEn: 'Write "dog" in Kurdish.', correctAnswer: 'se', order: 3 },
    { id: 'a4', lessonId: 'l5_2', type: 'multiple_choice', questionKu: 'pisîk', questionEn: 'What does this word mean?', options: ['cat', 'bird', 'snake', 'fish'], correctAnswer: 'cat', order: 4 },
    { id: 'a5', lessonId: 'l5_2', type: 'multiple_choice', questionEn: 'How do you say "bird" in Kurdish?', options: ['teyr', 'mar', 'mî', 'kew'], correctAnswer: 'teyr', order: 5 },
    { id: 'a6', lessonId: 'l5_2', type: 'translation', questionEn: 'Write "fox" in Kurdish.', correctAnswer: 'rêvî', order: 6 },
    { id: 'a7', lessonId: 'l5_2', type: 'multiple_choice', questionKu: 'mar', questionEn: 'What does this word mean?', options: ['snake', 'wolf', 'horse', 'goat'], correctAnswer: 'snake', order: 7 },
  ],

  // U5L3: Seasons & Weather
  l5_3: [
    { id: 's1', lessonId: 'l5_3', type: 'multiple_choice', questionKu: 'bihar', questionEn: 'What does this word mean?', options: ['spring', 'summer', 'autumn', 'winter'], correctAnswer: 'spring', order: 1 },
    { id: 's2', lessonId: 'l5_3', type: 'multiple_choice', questionKu: 'havîn', questionEn: 'What does this word mean?', options: ['summer', 'spring', 'winter', 'autumn'], correctAnswer: 'summer', order: 2 },
    { id: 's3', lessonId: 'l5_3', type: 'translation', questionEn: 'Write "winter" in Kurdish.', correctAnswer: 'zivistan', order: 3 },
    { id: 's4', lessonId: 'l5_3', type: 'multiple_choice', questionKu: 'berf', questionEn: 'What does this word mean?', options: ['snow', 'rain', 'wind', 'sun'], correctAnswer: 'snow', order: 4 },
    { id: 's5', lessonId: 'l5_3', type: 'translation', questionEn: 'Write "rain" in Kurdish.', correctAnswer: 'baran', order: 5 },
    { id: 's6', lessonId: 'l5_3', type: 'multiple_choice', questionKu: 'ba', questionEn: 'What does this word mean?', options: ['wind', 'rain', 'snow', 'cloud'], correctAnswer: 'wind', order: 6 },
  ],

  // U5L4: Review Nature
  l5_4: [
    { id: 'rn1', lessonId: 'l5_4', type: 'translation', questionEn: 'Write "mountain" in Kurdish.', correctAnswer: 'çiya', order: 1 },
    { id: 'rn2', lessonId: 'l5_4', type: 'multiple_choice', questionKu: 'Çiyayên Kurdistanê bilind in.', questionEn: 'What does this sentence mean?', options: ['The mountains of Kurdistan are high.', 'Kurdistan has rivers.', 'The villages are small.', 'The trees are green.'], correctAnswer: 'The mountains of Kurdistan are high.', order: 2 },
    { id: 'rn3', lessonId: 'l5_4', type: 'multiple_choice', questionKu: 'gur', questionEn: 'What does this word mean?', options: ['wolf', 'fox', 'dog', 'horse'], correctAnswer: 'wolf', order: 3 },
    { id: 'rn4', lessonId: 'l5_4', type: 'translation', questionEn: 'Write "autumn" in Kurdish.', correctAnswer: 'payîz', order: 4 },
    { id: 'rn5', lessonId: 'l5_4', type: 'multiple_choice', questionKu: 'dar', questionEn: 'What does this word mean?', options: ['tree', 'stone', 'grass', 'flower'], correctAnswer: 'tree', order: 5 },
    { id: 'rn6', lessonId: 'l5_4', type: 'fill_blank', questionKu: '____ dibare.', questionEn: 'Complete: "It is raining." (rain = baran)', correctAnswer: 'Baran', order: 6 },
  ],

  // U6L1: Numbers 1-10
  l6_1: [
    { id: 'nm1', lessonId: 'l6_1', type: 'multiple_choice', questionKu: 'yek', questionEn: 'What number is this?', options: ['1', '2', '3', '4'], correctAnswer: '1', order: 1 },
    { id: 'nm2', lessonId: 'l6_1', type: 'translation', questionEn: 'Write "two" in Kurdish.', correctAnswer: 'du', order: 2 },
    { id: 'nm3', lessonId: 'l6_1', type: 'multiple_choice', questionKu: 'pênc', questionEn: 'What number is this?', options: ['5', '4', '6', '3'], correctAnswer: '5', order: 3 },
    { id: 'nm4', lessonId: 'l6_1', type: 'translation', questionEn: 'Write "seven" in Kurdish.', correctAnswer: 'heft', order: 4 },
    { id: 'nm5', lessonId: 'l6_1', type: 'multiple_choice', questionEn: 'How do you say "ten" in Kurdish?', options: ['deh', 'neh', 'heşt', 'şeş'], correctAnswer: 'deh', order: 5 },
    { id: 'nm6', lessonId: 'l6_1', type: 'multiple_choice', questionKu: 'heşt', questionEn: 'What number is this?', options: ['8', '7', '9', '6'], correctAnswer: '8', order: 6 },
    { id: 'nm7', lessonId: 'l6_1', type: 'translation', questionEn: 'Write "four" in Kurdish.', correctAnswer: 'çar', order: 7 },
  ],

  // U6L2: Numbers 11-100
  l6_2: [
    { id: 'nm8', lessonId: 'l6_2', type: 'multiple_choice', questionKu: 'bîst', questionEn: 'What number is this?', options: ['20', '30', '10', '50'], correctAnswer: '20', order: 1 },
    { id: 'nm9', lessonId: 'l6_2', type: 'translation', questionEn: 'Write "thirty" in Kurdish.', correctAnswer: 'sî', order: 2 },
    { id: 'nm10', lessonId: 'l6_2', type: 'multiple_choice', questionKu: 'çil', questionEn: 'What number is this?', options: ['40', '50', '30', '60'], correctAnswer: '40', order: 3 },
    { id: 'nm11', lessonId: 'l6_2', type: 'multiple_choice', questionEn: 'How do you say "100" in Kurdish?', options: ['sed', 'hezar', 'nod', 'pêncî'], correctAnswer: 'sed', order: 4 },
    { id: 'nm12', lessonId: 'l6_2', type: 'translation', questionEn: 'Write "fifty" in Kurdish.', correctAnswer: 'pêncî', order: 5 },
    { id: 'nm13', lessonId: 'l6_2', type: 'multiple_choice', questionKu: 'hezar', questionEn: 'What number is this?', options: ['1000', '100', '500', '200'], correctAnswer: '1000', order: 6 },
  ],

  // U6L3: Days & Months
  l6_3: [
    { id: 'dm1', lessonId: 'l6_3', type: 'multiple_choice', questionKu: 'roj', questionEn: 'What does this word mean?', options: ['day', 'night', 'week', 'month'], correctAnswer: 'day', order: 1 },
    { id: 'dm2', lessonId: 'l6_3', type: 'multiple_choice', questionKu: 'şev', questionEn: 'What does this word mean?', options: ['night', 'day', 'morning', 'evening'], correctAnswer: 'night', order: 2 },
    { id: 'dm3', lessonId: 'l6_3', type: 'translation', questionEn: 'Write "week" in Kurdish.', correctAnswer: 'hefte', order: 3 },
    { id: 'dm4', lessonId: 'l6_3', type: 'multiple_choice', questionKu: 'în', questionEn: 'What day of the week is this?', options: ['Friday', 'Saturday', 'Sunday', 'Monday'], correctAnswer: 'Friday', order: 4 },
    { id: 'dm5', lessonId: 'l6_3', type: 'multiple_choice', questionEn: 'How do you say "today" in Kurdish?', options: ['îro', 'duh', 'sibeh', 'niha'], correctAnswer: 'îro', order: 5 },
    { id: 'dm6', lessonId: 'l6_3', type: 'translation', questionEn: 'Write "year" in Kurdish.', correctAnswer: 'sal', order: 6 },
    { id: 'dm7', lessonId: 'l6_3', type: 'multiple_choice', questionKu: 'sibeh', questionEn: 'What does this word mean?', options: ['morning; tomorrow', 'evening', 'night', 'today'], correctAnswer: 'morning; tomorrow', order: 7 },
  ],

  // U6L4: Review Numbers
  l6_4: [
    { id: 'rnm1', lessonId: 'l6_4', type: 'translation', questionEn: 'Write "three" in Kurdish.', correctAnswer: 'sê', order: 1 },
    { id: 'rnm2', lessonId: 'l6_4', type: 'multiple_choice', questionKu: 'neh', questionEn: 'What number is this?', options: ['9', '8', '7', '10'], correctAnswer: '9', order: 2 },
    { id: 'rnm3', lessonId: 'l6_4', type: 'multiple_choice', questionKu: 'duh', questionEn: 'What does this word mean?', options: ['yesterday', 'today', 'tomorrow', 'now'], correctAnswer: 'yesterday', order: 3 },
    { id: 'rnm4', lessonId: 'l6_4', type: 'translation', questionEn: 'Write "night" in Kurdish.', correctAnswer: 'şev', order: 4 },
    { id: 'rnm5', lessonId: 'l6_4', type: 'multiple_choice', questionKu: 'sed', questionEn: 'What number is this?', options: ['100', '1000', '50', '90'], correctAnswer: '100', order: 5 },
    { id: 'rnm6', lessonId: 'l6_4', type: 'multiple_choice', questionEn: 'How do you say "now" in Kurdish?', options: ['niha', 'îro', 'duh', 'zû'], correctAnswer: 'niha', order: 6 },
  ],

  // ===== COURSE 3: ACTIONS & VERBS =====

  // U7L1: Go & Come
  l7_1: [
    { id: 'v1', lessonId: 'l7_1', type: 'multiple_choice', questionKu: 'çûn', questionEn: 'What does this verb mean?', options: ['to go', 'to come', 'to see', 'to eat'], correctAnswer: 'to go', order: 1 },
    { id: 'v2', lessonId: 'l7_1', type: 'multiple_choice', questionKu: 'hatin', questionEn: 'What does this verb mean?', options: ['to come', 'to go', 'to stay', 'to give'], correctAnswer: 'to come', order: 2 },
    { id: 'v3', lessonId: 'l7_1', type: 'translation', questionEn: 'Write "to stay, remain" in Kurdish.', correctAnswer: 'man', order: 3 },
    { id: 'v4', lessonId: 'l7_1', type: 'multiple_choice', questionKu: 'meşiyan', questionEn: 'What does this verb mean?', options: ['to walk', 'to run', 'to go', 'to sit'], correctAnswer: 'to walk', order: 4 },
    { id: 'v5', lessonId: 'l7_1', type: 'multiple_choice', questionKu: 'rûniştin', questionEn: 'What does this verb mean?', options: ['to sit', 'to stand', 'to walk', 'to go'], correctAnswer: 'to sit', order: 5 },
    { id: 'v6', lessonId: 'l7_1', type: 'translation', questionEn: 'Write "to get up, rise" in Kurdish.', correctAnswer: 'rabûn', order: 6 },
  ],

  // U7L2: Eat, Drink, See
  l7_2: [
    { id: 'v7', lessonId: 'l7_2', type: 'multiple_choice', questionKu: 'xwarin', questionEn: 'What does this verb mean?', options: ['to eat', 'to drink', 'to see', 'to say'], correctAnswer: 'to eat', order: 1 },
    { id: 'v8', lessonId: 'l7_2', type: 'multiple_choice', questionKu: 'vexwarin', questionEn: 'What does this verb mean?', options: ['to drink', 'to eat', 'to give', 'to take'], correctAnswer: 'to drink', order: 2 },
    { id: 'v9', lessonId: 'l7_2', type: 'translation', questionEn: 'Write "to see" in Kurdish.', correctAnswer: 'dîtin', order: 3 },
    { id: 'v10', lessonId: 'l7_2', type: 'multiple_choice', questionKu: 'zanîn', questionEn: 'What does this verb mean?', options: ['to know', 'to see', 'to want', 'to do'], correctAnswer: 'to know', order: 4 },
    { id: 'v11', lessonId: 'l7_2', type: 'multiple_choice', questionKu: 'gotin', questionEn: 'What does this verb mean?', options: ['to say', 'to hear', 'to know', 'to read'], correctAnswer: 'to say', order: 5 },
    { id: 'v12', lessonId: 'l7_2', type: 'translation', questionEn: 'Write "to read, study" in Kurdish.', correctAnswer: 'xwendin', order: 6 },
    { id: 'v13', lessonId: 'l7_2', type: 'multiple_choice', questionKu: 'bihîstin', questionEn: 'What does this verb mean?', options: ['to hear', 'to see', 'to say', 'to know'], correctAnswer: 'to hear', order: 7 },
  ],

  // U7L3: I go, You come (Grammar - Present Tense)
  l7_3: [
    { id: 'gv1', lessonId: 'l7_3', type: 'multiple_choice', questionKu: 'Ez diçim.', questionEn: 'What does this sentence mean?', options: ['I go. / I am going.', 'I come.', 'I see.', 'I eat.'], correctAnswer: 'I go. / I am going.', explanation: 'Present tense: "di-" prefix + stem + personal ending. çûn → ç- → diçim.', order: 1 },
    { id: 'gv2', lessonId: 'l7_3', type: 'multiple_choice', questionKu: 'Tu têyî.', questionEn: 'What does this sentence mean?', options: ['You come.', 'You go.', 'You eat.', 'You see.'], correctAnswer: 'You come.', explanation: 'Hatin has an irregular present: têm, têyî, tê, tên.', order: 2 },
    { id: 'gv3', lessonId: 'l7_3', type: 'fill_blank', questionKu: 'Ew ____.',  questionEn: 'Complete: "He/She goes." (çûn → diç-)', correctAnswer: 'diçe', order: 3 },
    { id: 'gv4', lessonId: 'l7_3', type: 'multiple_choice', questionKu: 'Em naçin.', questionEn: 'What does this sentence mean?', options: ['We do not go.', 'We go.', 'We come.', 'We do not come.'], correctAnswer: 'We do not go.', explanation: 'Negative present replaces "di-" with "na-".', order: 4 },
    { id: 'gv5', lessonId: 'l7_3', type: 'multiple_choice', questionKu: 'Ez te dibînim.', questionEn: 'What does this sentence mean?', options: ['I see you.', 'You see me.', 'I know you.', 'You know me.'], correctAnswer: 'I see you.', explanation: 'dîtin → bîn- → dibînim. "Te" = you (object).', order: 5 },
    { id: 'gv6', lessonId: 'l7_3', type: 'fill_blank', questionKu: 'Ez dizanim.', questionEn: 'This means: "I ____."', correctAnswer: 'know', order: 6 },
  ],

  // U7L4: Review Verbs
  l7_4: [
    { id: 'rv1b', lessonId: 'l7_4', type: 'translation', questionEn: 'Write "to go" in Kurdish.', correctAnswer: 'çûn', order: 1 },
    { id: 'rv2b', lessonId: 'l7_4', type: 'multiple_choice', questionKu: 'Ez avê vedixwim.', questionEn: 'What does this sentence mean?', options: ['I drink water.', 'I eat bread.', 'I see water.', 'I want water.'], correctAnswer: 'I drink water.', order: 2 },
    { id: 'rv3b', lessonId: 'l7_4', type: 'multiple_choice', questionKu: 'kirin', questionEn: 'What does this verb mean?', options: ['to do, to make', 'to go', 'to come', 'to give'], correctAnswer: 'to do, to make', order: 3 },
    { id: 'rv4b', lessonId: 'l7_4', type: 'translation', questionEn: 'Write "to come" in Kurdish.', correctAnswer: 'hatin', order: 4 },
    { id: 'rv5b', lessonId: 'l7_4', type: 'multiple_choice', questionKu: 'Ew tê.', questionEn: 'What does this sentence mean?', options: ['He/She comes.', 'He/She goes.', 'He/She eats.', 'He/She sees.'], correctAnswer: 'He/She comes.', order: 5 },
    { id: 'rv6b', lessonId: 'l7_4', type: 'fill_blank', questionKu: 'Ez ____.', questionEn: 'Complete: "I am going." (çûn)', correctAnswer: 'diçim', order: 6 },
  ],

  // U8L1: More Verbs
  l8_1: [
    { id: 'mv1', lessonId: 'l8_1', type: 'multiple_choice', questionKu: 'nivîsandin', questionEn: 'What does this verb mean?', options: ['to write', 'to read', 'to see', 'to say'], correctAnswer: 'to write', order: 1 },
    { id: 'mv2', lessonId: 'l8_1', type: 'multiple_choice', questionKu: 'axaftin', questionEn: 'What does this verb mean?', options: ['to speak', 'to hear', 'to write', 'to read'], correctAnswer: 'to speak', order: 2 },
    { id: 'mv3', lessonId: 'l8_1', type: 'translation', questionEn: 'Write "to give" in Kurdish.', correctAnswer: 'dan', order: 3 },
    { id: 'mv4', lessonId: 'l8_1', type: 'multiple_choice', questionKu: 'vekirin', questionEn: 'What does this verb mean?', options: ['to open', 'to close', 'to break', 'to give'], correctAnswer: 'to open', order: 4 },
    { id: 'mv5', lessonId: 'l8_1', type: 'multiple_choice', questionKu: 'girtin', questionEn: 'What does this verb mean?', options: ['to take, hold, close', 'to give', 'to open', 'to read'], correctAnswer: 'to take, hold, close', order: 5 },
    { id: 'mv6', lessonId: 'l8_1', type: 'translation', questionEn: 'Write "to live" in Kurdish.', correctAnswer: 'jîn', order: 6 },
    { id: 'mv7', lessonId: 'l8_1', type: 'multiple_choice', questionKu: 'fêr bûn', questionEn: 'What does this verb mean?', options: ['to learn', 'to teach', 'to study', 'to write'], correctAnswer: 'to learn', order: 7 },
  ],

  // U8L2: Feelings & States
  l8_2: [
    { id: 'fe1', lessonId: 'l8_2', type: 'multiple_choice', questionKu: 'kêfxweş', questionEn: 'What does this word mean?', options: ['happy', 'sad', 'angry', 'tired'], correctAnswer: 'happy', order: 1 },
    { id: 'fe2', lessonId: 'l8_2', type: 'multiple_choice', questionKu: 'xemgîn', questionEn: 'What does this word mean?', options: ['sad', 'happy', 'hungry', 'thirsty'], correctAnswer: 'sad', order: 2 },
    { id: 'fe3', lessonId: 'l8_2', type: 'translation', questionEn: 'Write "hungry" in Kurdish.', correctAnswer: 'birsî', order: 3 },
    { id: 'fe4', lessonId: 'l8_2', type: 'multiple_choice', questionKu: 'tî', questionEn: 'What does this word mean?', options: ['thirsty', 'hungry', 'tired', 'cold'], correctAnswer: 'thirsty', order: 4 },
    { id: 'fe5', lessonId: 'l8_2', type: 'multiple_choice', questionKu: 'westiyayî', questionEn: 'What does this word mean?', options: ['tired', 'happy', 'angry', 'afraid'], correctAnswer: 'tired', order: 5 },
    { id: 'fe6', lessonId: 'l8_2', type: 'translation', questionEn: 'Write "angry" in Kurdish.', correctAnswer: 'hêrs', order: 6 },
    { id: 'fe7', lessonId: 'l8_2', type: 'multiple_choice', questionKu: 'Ez birsî me.', questionEn: 'What does this sentence mean?', options: ['I am hungry.', 'I am thirsty.', 'I am tired.', 'I am happy.'], correctAnswer: 'I am hungry.', order: 7 },
  ],

  // U8L3: I want, I can (Grammar)
  l8_3: [
    { id: 'gw1', lessonId: 'l8_3', type: 'multiple_choice', questionKu: 'Ez dixwazim.', questionEn: 'What does this sentence mean?', options: ['I want.', 'I can.', 'I go.', 'I know.'], correctAnswer: 'I want.', explanation: 'xwestin → xwaz- → dixwazim.', order: 1 },
    { id: 'gw2', lessonId: 'l8_3', type: 'multiple_choice', questionKu: 'Ez dikarim.', questionEn: 'What does this sentence mean?', options: ['I can. / I am able.', 'I want.', 'I must.', 'I should.'], correctAnswer: 'I can. / I am able.', explanation: 'karîn → kar- → dikarim.', order: 2 },
    { id: 'gw3', lessonId: 'l8_3', type: 'multiple_choice', questionKu: 'Ez dixwazim biçim.', questionEn: 'What does this sentence mean?', options: ['I want to go.', 'I can go.', 'I am going.', 'I must go.'], correctAnswer: 'I want to go.', explanation: 'Xwestin is followed by the subjunctive: biçim = "that I go."', order: 3 },
    { id: 'gw4', lessonId: 'l8_3', type: 'fill_blank', questionKu: 'Tu dikarî ____?', questionEn: 'Complete: "Can you speak?" (axaftin → biaxivî)', correctAnswer: 'biaxivî', order: 4 },
    { id: 'gw5', lessonId: 'l8_3', type: 'true_false', questionKu: 'Ez naxwazim = I do not want', questionEn: 'Is this translation correct?', correctAnswer: 'True', explanation: 'Negative of dixwazim is naxwazim (na- replaces di-).', order: 5 },
    { id: 'gw6', lessonId: 'l8_3', type: 'multiple_choice', questionKu: 'Em nikarin.', questionEn: 'What does this sentence mean?', options: ['We cannot.', 'We can.', 'We want.', 'We go.'], correctAnswer: 'We cannot.', explanation: 'Karîn uses "ni-" for negative instead of "na-".', order: 6 },
  ],

  // U8L4: Review Actions
  l8_4: [
    { id: 'ra1', lessonId: 'l8_4', type: 'translation', questionEn: 'Write "to write" in Kurdish.', correctAnswer: 'nivîsandin', order: 1 },
    { id: 'ra2', lessonId: 'l8_4', type: 'multiple_choice', questionKu: 'Ez tî me.', questionEn: 'What does this sentence mean?', options: ['I am thirsty.', 'I am hungry.', 'I am tired.', 'I am sad.'], correctAnswer: 'I am thirsty.', order: 2 },
    { id: 'ra3', lessonId: 'l8_4', type: 'multiple_choice', questionKu: 'Ez dixwazim bixwînim.', questionEn: 'What does this sentence mean?', options: ['I want to read/study.', 'I can read.', 'I am reading.', 'I like to read.'], correctAnswer: 'I want to read/study.', order: 3 },
    { id: 'ra4', lessonId: 'l8_4', type: 'translation', questionEn: 'Write "happy" in Kurdish.', correctAnswer: 'kêfxweş', order: 4 },
    { id: 'ra5', lessonId: 'l8_4', type: 'multiple_choice', questionKu: 'Tu dikarî biaxivî?', questionEn: 'What does this sentence mean?', options: ['Can you speak?', 'Do you speak?', 'Will you speak?', 'Do you want to speak?'], correctAnswer: 'Can you speak?', order: 5 },
    { id: 'ra6', lessonId: 'l8_4', type: 'fill_blank', questionKu: 'Ez ____ biçim.', questionEn: 'Complete: "I want to go."', correctAnswer: 'dixwazim', order: 6 },
  ],
};

export const getExercisesForLesson = (lessonId: string): Exercise[] => {
  return E[lessonId] || [];
};
