// Interactive stories with word-level translations
// All stories are original, written for learners at different levels

export interface StoryWord {
  ku: string;
  en: string;
  isPunctuation?: boolean;
}

export interface Story {
  id: string;
  title: string;
  titleEn: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  paragraphs: StoryWord[][];
  comprehensionQuestions: {
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
}

export const stories: Story[] = [
  {
    id: 's1',
    title: 'Mala Me',
    titleEn: 'Our Home',
    level: 'beginner',
    description: 'A simple story about a family and their home.',
    paragraphs: [
      [
        { ku: 'Mala', en: 'home (of)' }, { ku: 'me', en: 'our' }, { ku: 'li', en: 'in' },
        { ku: 'gundekî', en: 'a village' }, { ku: 'biçûk', en: 'small' }, { ku: 'e.', en: 'is.', isPunctuation: false },
      ],
      [
        { ku: 'Bavê', en: 'father (of)' }, { ku: 'min', en: 'my' }, { ku: 'mamoste', en: 'teacher' },
        { ku: 'ye.', en: 'is.' }, { ku: 'Ew', en: 'He' }, { ku: 'her', en: 'every' },
        { ku: 'roj', en: 'day' }, { ku: 'diçe', en: 'goes' }, { ku: 'dibistanê.', en: 'school.' },
      ],
      [
        { ku: 'Diya', en: 'mother (of)' }, { ku: 'min', en: 'my' }, { ku: 'nan', en: 'bread' },
        { ku: 'çêdike.', en: 'makes.' }, { ku: 'Nana', en: 'bread (of)' }, { ku: 'wê', en: 'her' },
        { ku: 'pir', en: 'very' }, { ku: 'xweş', en: 'nice' }, { ku: 'e.', en: 'is.' },
      ],
      [
        { ku: 'Ez', en: 'I' }, { ku: 'du', en: 'two' }, { ku: 'bira', en: 'brothers' },
        { ku: 'û', en: 'and' }, { ku: 'yek', en: 'one' }, { ku: 'xwişk', en: 'sister' },
        { ku: 'hekim.', en: 'have.' },
      ],
      [
        { ku: 'Birayê', en: 'brother (of)' }, { ku: 'min', en: 'my' }, { ku: 'ê', en: '(the)' },
        { ku: 'mezin', en: 'big' }, { ku: 'li', en: 'in' }, { ku: 'bajarê', en: 'city (of)' },
        { ku: 'Diyarbekir', en: 'Diyarbakir' }, { ku: 'dixwîne.', en: 'studies.' },
      ],
      [
        { ku: 'Xwişka', en: 'sister (of)' }, { ku: 'min', en: 'my' }, { ku: 'hê', en: 'still' },
        { ku: 'biçûk', en: 'small' }, { ku: 'e.', en: 'is.' }, { ku: 'Ew', en: 'She' },
        { ku: 'pir', en: 'very' }, { ku: 'delal', en: 'lovely' }, { ku: 'e.', en: 'is.' },
      ],
      [
        { ku: 'Em', en: 'We' }, { ku: 'li', en: 'at' }, { ku: 'malê', en: 'home' },
        { ku: 'bi', en: 'with' }, { ku: 'hev', en: 'each other' }, { ku: 're', en: 'together' },
        { ku: 'çay', en: 'tea' }, { ku: 'vedixwin.', en: 'drink.' },
        { ku: 'Jiyana', en: 'life (of)' }, { ku: 'me', en: 'our' }, { ku: 'xweş', en: 'nice' },
        { ku: 'e.', en: 'is.' },
      ],
    ],
    comprehensionQuestions: [
      { question: 'Where is their home?', options: ['In a small village', 'In a big city', 'Near the sea', 'In the mountains'], correctAnswer: 'In a small village' },
      { question: 'What does the father do?', options: ['He is a teacher', 'He is a farmer', 'He is a doctor', 'He is a shopkeeper'], correctAnswer: 'He is a teacher' },
      { question: 'What does the mother make?', options: ['Bread', 'Tea', 'Cheese', 'Soup'], correctAnswer: 'Bread' },
    ],
  },
  {
    id: 's2',
    title: 'Newroz',
    titleEn: 'Newroz — Kurdish New Year',
    level: 'beginner',
    description: 'A story about the Kurdish celebration of Newroz.',
    paragraphs: [
      [
        { ku: 'Newroz', en: 'Newroz (Kurdish New Year)' }, { ku: 'cejna', en: 'celebration (of)' },
        { ku: 'gelê', en: 'people (of)' }, { ku: 'kurd', en: 'Kurdish' }, { ku: 'e.', en: 'is.' },
      ],
      [
        { ku: 'Ew', en: 'It' }, { ku: 'di', en: 'in' }, { ku: 'bîst', en: 'twenty' },
        { ku: 'û', en: 'and' }, { ku: 'yeka', en: 'first (of)' }, { ku: 'adarê', en: 'March' },
        { ku: 'de', en: '(in)' }, { ku: 'tê', en: 'comes' }, { ku: 'pîrozkirin.', en: 'celebrating.' },
      ],
      [
        { ku: 'Xelk', en: 'People' }, { ku: 'agir', en: 'fire' }, { ku: 'vêdixin.', en: 'light.' },
        { ku: 'Agir', en: 'Fire' }, { ku: 'sembola', en: 'symbol (of)' },
        { ku: 'ronahiyê', en: 'light' }, { ku: 'û', en: 'and' }, { ku: 'azadiyê', en: 'freedom' },
        { ku: 'ye.', en: 'is.' },
      ],
      [
        { ku: 'Keç', en: 'Girls' }, { ku: 'û', en: 'and' }, { ku: 'xort', en: 'young people' },
        { ku: 'cil', en: 'clothes' }, { ku: 'û', en: 'and' }, { ku: 'bergên', en: 'garments' },
        { ku: 'bi', en: 'with' }, { ku: 'reng', en: 'color' }, { ku: 'li', en: 'on' },
        { ku: 'xwe', en: 'themselves' }, { ku: 'dikin.', en: 'put.' },
      ],
      [
        { ku: 'Ew', en: 'They' }, { ku: 'direqisin', en: 'dance' }, { ku: 'û', en: 'and' },
        { ku: 'stran', en: 'songs' }, { ku: 'dibêjin.', en: 'sing.' },
      ],
      [
        { ku: 'Bihar', en: 'Spring' }, { ku: 'tê', en: 'comes' }, { ku: 'û', en: 'and' },
        { ku: 'dinya', en: 'the world' }, { ku: 'ji', en: 'from' }, { ku: 'nû', en: 'new' },
        { ku: 've', en: '(anew)' }, { ku: 'şîn', en: 'green' }, { ku: 'dibe.', en: 'becomes.' },
      ],
      [
        { ku: 'Newroz', en: 'Newroz' }, { ku: 'pîroz', en: 'holy, blessed' },
        { ku: 'be!', en: 'may it be!' },
      ],
    ],
    comprehensionQuestions: [
      { question: 'When is Newroz celebrated?', options: ['March 21', 'January 1', 'December 25', 'June 15'], correctAnswer: 'March 21' },
      { question: 'What do people light during Newroz?', options: ['Fire', 'Candles', 'Fireworks', 'Lanterns'], correctAnswer: 'Fire' },
      { question: 'What does fire symbolize?', options: ['Light and freedom', 'Warmth and food', 'War and peace', 'Love and family'], correctAnswer: 'Light and freedom' },
    ],
  },
  {
    id: 's3',
    title: 'Gur û Rêvî',
    titleEn: 'The Wolf and the Fox',
    level: 'intermediate',
    description: 'A short fable about a wolf and a fox in the mountains.',
    paragraphs: [
      [
        { ku: 'Rojekê', en: 'One day' }, { ku: 'gurekî', en: 'a wolf' },
        { ku: 'birsî', en: 'hungry' }, { ku: 'li', en: 'in' }, { ku: 'çiyê', en: 'mountain' },
        { ku: 'digeriya.', en: 'was wandering.' },
      ],
      [
        { ku: 'Wî', en: 'He' }, { ku: 'rêvîyek', en: 'a fox' }, { ku: 'dît', en: 'saw' },
        { ku: 'û', en: 'and' }, { ku: 'jê', en: 'to it' }, { ku: 're', en: '(to)' },
        { ku: 'got:', en: 'said:' },
      ],
      [
        { ku: '"Rêvî,', en: '"Fox,' }, { ku: 'ez', en: 'I' }, { ku: 'pir', en: 'very' },
        { ku: 'birsî', en: 'hungry' }, { ku: 'me.', en: 'am.' },
        { ku: 'Tu', en: 'You' }, { ku: 'dizanî', en: 'know' },
        { ku: 'xwarin', en: 'food' }, { ku: 'li', en: 'at' }, { ku: 'ku', en: 'where' },
        { ku: 'derê', en: 'place' }, { ku: 'ye?"', en: 'is?"' },
      ],
      [
        { ku: 'Rêvî', en: 'The fox' }, { ku: 'got:', en: 'said:' },
        { ku: '"Erê,', en: '"Yes,' }, { ku: 'ez', en: 'I' }, { ku: 'dizanim.', en: 'know.' },
        { ku: 'Lê', en: 'But' }, { ku: 'divê', en: 'it is necessary' },
        { ku: 'tu', en: 'you' }, { ku: 'zîrek', en: 'clever' }, { ku: 'bî."', en: 'be."' },
      ],
      [
        { ku: 'Gur', en: 'The wolf' }, { ku: 'got:', en: 'said:' },
        { ku: '"Ez', en: '"I' }, { ku: 'ne', en: 'not' }, { ku: 'zîrek', en: 'clever' },
        { ku: 'im,', en: 'am,' }, { ku: 'lê', en: 'but' }, { ku: 'ez', en: 'I' },
        { ku: 'xurt', en: 'strong' }, { ku: 'im."', en: 'am."' },
      ],
      [
        { ku: 'Rêvî', en: 'The fox' }, { ku: 'keniya', en: 'laughed' },
        { ku: 'û', en: 'and' }, { ku: 'got:', en: 'said:' },
        { ku: '"Di', en: '"In' }, { ku: 'jiyanê', en: 'life' },
        { ku: 'de,', en: '(in),' }, { ku: 'zîrekî', en: 'cleverness' },
        { ku: 'ji', en: 'than' }, { ku: 'xurtiyê', en: 'strength' },
        { ku: 'çêtir', en: 'better' }, { ku: 'e."', en: 'is."' },
      ],
    ],
    comprehensionQuestions: [
      { question: 'Who was hungry?', options: ['The wolf', 'The fox', 'Both', 'Neither'], correctAnswer: 'The wolf' },
      { question: 'What did the wolf say about himself?', options: ['He is strong', 'He is clever', 'He is fast', 'He is tired'], correctAnswer: 'He is strong' },
      { question: 'What is the fox\'s lesson?', options: ['Cleverness is better than strength', 'Strength is everything', 'Food is important', 'Friends help each other'], correctAnswer: 'Cleverness is better than strength' },
    ],
  },
  {
    id: 's4',
    title: 'Çiyayên Kurdistanê',
    titleEn: 'The Mountains of Kurdistan',
    level: 'intermediate',
    description: 'A descriptive passage about the landscape of Kurdistan.',
    paragraphs: [
      [
        { ku: 'Çiyayên', en: 'mountains (of)' }, { ku: 'Kurdistanê', en: 'Kurdistan' },
        { ku: 'pir', en: 'very' }, { ku: 'bilind', en: 'high' }, { ku: 'in.', en: 'are.' },
      ],
      [
        { ku: 'Di', en: 'In' }, { ku: 'biharê', en: 'spring' }, { ku: 'de,', en: '(in),' },
        { ku: 'gul', en: 'flowers' }, { ku: 'û', en: 'and' }, { ku: 'giya', en: 'grass' },
        { ku: 'kesk', en: 'green' }, { ku: 'dibin.', en: 'become.' },
        { ku: 'Av', en: 'Water' }, { ku: 'ji', en: 'from' }, { ku: 'çiyan', en: 'mountains' },
        { ku: 'diherike.', en: 'flows.' },
      ],
      [
        { ku: 'Şivan', en: 'Shepherds' }, { ku: 'bi', en: 'with' },
        { ku: 'pezê', en: 'sheep' }, { ku: 'xwe', en: 'their' },
        { ku: 've', en: '(with)' }, { ku: 'li', en: 'on' }, { ku: 'zozanan', en: 'meadows' },
        { ku: 'diçêrînin.', en: 'graze.' },
      ],
      [
        { ku: 'Di', en: 'In' }, { ku: 'havînê', en: 'summer' }, { ku: 'de,', en: '(in),' },
        { ku: 'roj', en: 'the sun' }, { ku: 'germ', en: 'warm' }, { ku: 'e.', en: 'is.' },
        { ku: 'Lê', en: 'But' }, { ku: 'li', en: 'on' }, { ku: 'ser', en: 'top (of)' },
        { ku: 'çiyan', en: 'mountains' }, { ku: 'ba', en: 'wind' },
        { ku: 'hênik', en: 'cool' }, { ku: 'e.', en: 'is.' },
      ],
      [
        { ku: 'Di', en: 'In' }, { ku: 'zivistanê', en: 'winter' }, { ku: 'de,', en: '(in),' },
        { ku: 'berf', en: 'snow' }, { ku: 'dibare.', en: 'falls.' },
        { ku: 'Çiya', en: 'Mountains' }, { ku: 'spî', en: 'white' },
        { ku: 'dibin.', en: 'become.' },
      ],
      [
        { ku: 'Kurd', en: 'Kurds' }, { ku: 'dibêjin:', en: 'say:' },
        { ku: '"Çiya', en: '"Mountains' }, { ku: 'dostê', en: 'friend (of)' },
        { ku: 'kurdan', en: 'Kurds' }, { ku: 'in."', en: 'are."' },
      ],
    ],
    comprehensionQuestions: [
      { question: 'What happens in spring?', options: ['Flowers and grass turn green', 'Snow falls', 'It gets very hot', 'The rivers dry up'], correctAnswer: 'Flowers and grass turn green' },
      { question: 'What do shepherds do on the meadows?', options: ['Graze their sheep', 'Plant trees', 'Build houses', 'Hunt wolves'], correctAnswer: 'Graze their sheep' },
      { question: 'What do Kurds say about mountains?', options: ['Mountains are the friend of Kurds', 'Mountains are dangerous', 'Mountains are cold', 'Mountains are far away'], correctAnswer: 'Mountains are the friend of Kurds' },
    ],
  },
];

export const getStoryById = (id: string) => stories.find((s) => s.id === id);
