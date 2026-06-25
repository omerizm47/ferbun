// Interactive stories with word-level translations
// All stories are original, written for learners at different levels

export interface StoryWord {
  ku: string;
  en: string;
  isPunctuation?: boolean;
  /** Optional Turkish bridge-language gloss (falls back to English when absent). */
  tr?: string;
}

export interface ComprehensionQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  // Optional Turkish bridge-language fields, resolved together so the answer never desyncs.
  questionTr?: string;
  optionsTr?: string[];
  correctAnswerTr?: string;
}

export interface Story {
  id: string;
  title: string;
  titleEn: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  /** Ionicons name for the story emblem (distinct per story). */
  icon: string;
  /** Earthy Kurdish accent colour for the emblem tile. */
  accent: string;
  description: string;
  paragraphs: StoryWord[][];
  comprehensionQuestions: ComprehensionQuestion[];
  // Optional Turkish bridge-language title/description (fall back to English when absent).
  titleTr?: string;
  descriptionTr?: string;
}

export const stories: Story[] = [
  {
    id: 's1',
    title: 'Mala Me',
    titleEn: 'Our Home',
    level: 'beginner',
    description: 'A simple story about a family and their home.',
    titleTr: 'Bizim Evimiz',
    descriptionTr: 'Bir aile ve evleri hakkında basit bir hikaye.',
    icon: 'home',
    accent: '#8A5A38',
    paragraphs: [
      [
        { ku: 'Mala', en: 'home (of)', tr: 'ev (…in)' }, { ku: 'me', en: 'our', tr: 'bizim' }, { ku: 'li', en: 'in', tr: '…de' },
        { ku: 'gundekî', en: 'a village', tr: 'bir köy' }, { ku: 'biçûk', en: 'small', tr: 'küçük' }, { ku: 'e.', en: 'is.', isPunctuation: false, tr: '…dir.' },
      ],
      [
        { ku: 'Bavê', en: 'father (of)', tr: 'baba (…in)' }, { ku: 'min', en: 'my', tr: 'benim' }, { ku: 'mamoste', en: 'teacher', tr: 'öğretmen' },
        { ku: 'ye.', en: 'is.', tr: '…dir.' }, { ku: 'Ew', en: 'He', tr: 'O' }, { ku: 'her', en: 'every', tr: 'her' },
        { ku: 'roj', en: 'day', tr: 'gün' }, { ku: 'diçe', en: 'goes', tr: 'gider' }, { ku: 'dibistanê.', en: 'school.', tr: 'okula.' },
      ],
      [
        { ku: 'Diya', en: 'mother (of)', tr: 'anne (…in)' }, { ku: 'min', en: 'my', tr: 'benim' }, { ku: 'nan', en: 'bread', tr: 'ekmek' },
        { ku: 'çêdike.', en: 'makes.', tr: 'yapar.' }, { ku: 'Nana', en: 'bread (of)', tr: 'ekmeği (…in)' }, { ku: 'wê', en: 'her', tr: 'onun' },
        { ku: 'pir', en: 'very', tr: 'çok' }, { ku: 'xweş', en: 'nice', tr: 'güzel' }, { ku: 'e.', en: 'is.', tr: '…dir.' },
      ],
      [
        { ku: 'Ez', en: 'I', tr: 'Ben' }, { ku: 'du', en: 'two', tr: 'iki' }, { ku: 'bira', en: 'brothers', tr: 'erkek kardeş' },
        { ku: 'û', en: 'and', tr: 've' }, { ku: 'yek', en: 'one', tr: 'bir' }, { ku: 'xwişk', en: 'sister', tr: 'kız kardeş' },
        { ku: 'hekim.', en: 'have.', tr: '…m var.' },
      ],
      [
        { ku: 'Birayê', en: 'brother (of)', tr: 'kardeş (…in)' }, { ku: 'min', en: 'my', tr: 'benim' }, { ku: 'ê', en: '(the)', tr: '(…ki)' },
        { ku: 'mezin', en: 'big', tr: 'büyük' }, { ku: 'li', en: 'in', tr: '…de' }, { ku: 'bajarê', en: 'city (of)', tr: 'şehir (…in)' },
        { ku: 'Diyarbekir', en: 'Diyarbakir', tr: 'Diyarbakır' }, { ku: 'dixwîne.', en: 'studies.', tr: 'okuyor.' },
      ],
      [
        { ku: 'Xwişka', en: 'sister (of)', tr: 'kız kardeş (…in)' }, { ku: 'min', en: 'my', tr: 'benim' }, { ku: 'hê', en: 'still', tr: 'hâlâ' },
        { ku: 'biçûk', en: 'small', tr: 'küçük' }, { ku: 'e.', en: 'is.', tr: '…dir.' }, { ku: 'Ew', en: 'She', tr: 'O' },
        { ku: 'pir', en: 'very', tr: 'çok' }, { ku: 'delal', en: 'lovely', tr: 'sevimli' }, { ku: 'e.', en: 'is.', tr: '…dir.' },
      ],
      [
        { ku: 'Em', en: 'We', tr: 'Biz' }, { ku: 'li', en: 'at', tr: '…de' }, { ku: 'malê', en: 'home', tr: 'ev' },
        { ku: 'bi', en: 'with', tr: 'ile' }, { ku: 'hev', en: 'each other', tr: 'birbiri' }, { ku: 're', en: 'together', tr: 'birlikte' },
        { ku: 'çay', en: 'tea', tr: 'çay' }, { ku: 'vedixwin.', en: 'drink.', tr: 'içeriz.' },
        { ku: 'Jiyana', en: 'life (of)', tr: 'hayat (…in)' }, { ku: 'me', en: 'our', tr: 'bizim' }, { ku: 'xweş', en: 'nice', tr: 'güzel' },
        { ku: 'e.', en: 'is.', tr: '…dir.' },
      ],
    ],
    comprehensionQuestions: [
      { question: 'Where is their home?', options: ['In a small village', 'In a big city', 'Near the sea', 'In the mountains'], correctAnswer: 'In a small village', questionTr: 'Evleri nerede?', optionsTr: ['Küçük bir köyde', 'Büyük bir şehirde', 'Deniz kenarında', 'Dağlarda'], correctAnswerTr: 'Küçük bir köyde' },
      { question: 'What does the father do?', options: ['He is a teacher', 'He is a farmer', 'He is a doctor', 'He is a shopkeeper'], correctAnswer: 'He is a teacher', questionTr: 'Baba ne iş yapar?', optionsTr: ['Öğretmendir', 'Çiftçidir', 'Doktordur', 'Dükkâncıdır'], correctAnswerTr: 'Öğretmendir' },
      { question: 'What does the mother make?', options: ['Bread', 'Tea', 'Cheese', 'Soup'], correctAnswer: 'Bread', questionTr: 'Anne ne yapar?', optionsTr: ['Ekmek', 'Çay', 'Peynir', 'Çorba'], correctAnswerTr: 'Ekmek' },
    ],
  },
  {
    id: 's2',
    title: 'Newroz',
    titleEn: 'Newroz — Kurdish New Year',
    level: 'beginner',
    description: 'A story about the Kurdish celebration of Newroz.',
    titleTr: 'Newroz — Kürt Yeni Yılı',
    descriptionTr: 'Kürtlerin Newroz kutlaması hakkında bir hikaye.',
    icon: 'flame',
    accent: '#E85D00',
    paragraphs: [
      [
        { ku: 'Newroz', en: 'Newroz (Kurdish New Year)', tr: 'Newroz (Kürt Yeni Yılı)' }, { ku: 'cejna', en: 'celebration (of)', tr: 'bayramı (…in)' },
        { ku: 'gelê', en: 'people (of)', tr: 'halkı (…in)' }, { ku: 'kurd', en: 'Kurdish', tr: 'Kürt' }, { ku: 'e.', en: 'is.', tr: '…dir.' },
      ],
      [
        { ku: 'Ew', en: 'It', tr: 'O' }, { ku: 'di', en: 'in', tr: '…de' }, { ku: 'bîst', en: 'twenty', tr: 'yirmi' },
        { ku: 'û', en: 'and', tr: 've' }, { ku: 'yeka', en: 'first (of)', tr: 'birincisi (…in)' }, { ku: 'adarê', en: 'March', tr: 'Mart' },
        { ku: 'de', en: '(in)', tr: '(…de)' }, { ku: 'tê', en: 'comes', tr: 'gelir' }, { ku: 'pîrozkirin.', en: 'celebrating.', tr: 'kutlanır.' },
      ],
      [
        { ku: 'Xelk', en: 'People', tr: 'İnsanlar' }, { ku: 'agir', en: 'fire', tr: 'ateş' }, { ku: 'vêdixin.', en: 'light.', tr: 'yakar.' },
        { ku: 'Agir', en: 'Fire', tr: 'Ateş' }, { ku: 'sembola', en: 'symbol (of)', tr: 'sembolü (…in)' },
        { ku: 'ronahiyê', en: 'light', tr: 'aydınlık' }, { ku: 'û', en: 'and', tr: 've' }, { ku: 'azadiyê', en: 'freedom', tr: 'özgürlük' },
        { ku: 'ye.', en: 'is.', tr: '…dir.' },
      ],
      [
        { ku: 'Keç', en: 'Girls', tr: 'Kızlar' }, { ku: 'û', en: 'and', tr: 've' }, { ku: 'xort', en: 'young people', tr: 'gençler' },
        { ku: 'cil', en: 'clothes', tr: 'giysi' }, { ku: 'û', en: 'and', tr: 've' }, { ku: 'bergên', en: 'garments', tr: 'giysiler' },
        { ku: 'bi', en: 'with', tr: 'ile' }, { ku: 'reng', en: 'color', tr: 'renk' }, { ku: 'li', en: 'on', tr: '…e' },
        { ku: 'xwe', en: 'themselves', tr: 'kendilerine' }, { ku: 'dikin.', en: 'put.', tr: 'giyer.' },
      ],
      [
        { ku: 'Ew', en: 'They', tr: 'Onlar' }, { ku: 'direqisin', en: 'dance', tr: 'dans eder' }, { ku: 'û', en: 'and', tr: 've' },
        { ku: 'stran', en: 'songs', tr: 'şarkılar' }, { ku: 'dibêjin.', en: 'sing.', tr: 'söyler.' },
      ],
      [
        { ku: 'Bihar', en: 'Spring', tr: 'Bahar' }, { ku: 'tê', en: 'comes', tr: 'gelir' }, { ku: 'û', en: 'and', tr: 've' },
        { ku: 'dinya', en: 'the world', tr: 'dünya' }, { ku: 'ji', en: 'from', tr: '…den' }, { ku: 'nû', en: 'new', tr: 'yeni' },
        { ku: 've', en: '(anew)', tr: '(yeniden)' }, { ku: 'şîn', en: 'green', tr: 'yeşil' }, { ku: 'dibe.', en: 'becomes.', tr: 'olur.' },
      ],
      [
        { ku: 'Newroz', en: 'Newroz', tr: 'Newroz' }, { ku: 'pîroz', en: 'holy, blessed', tr: 'kutlu, mübarek' },
        { ku: 'be!', en: 'may it be!', tr: 'olsun!' },
      ],
    ],
    comprehensionQuestions: [
      { question: 'When is Newroz celebrated?', options: ['March 21', 'January 1', 'December 25', 'June 15'], correctAnswer: 'March 21', questionTr: 'Newroz ne zaman kutlanır?', optionsTr: ['21 Mart', '1 Ocak', '25 Aralık', '15 Haziran'], correctAnswerTr: '21 Mart' },
      { question: 'What do people light during Newroz?', options: ['Fire', 'Candles', 'Fireworks', 'Lanterns'], correctAnswer: 'Fire', questionTr: 'Newroz’da insanlar ne yakar?', optionsTr: ['Ateş', 'Mum', 'Havai fişek', 'Fener'], correctAnswerTr: 'Ateş' },
      { question: 'What does fire symbolize?', options: ['Light and freedom', 'Warmth and food', 'War and peace', 'Love and family'], correctAnswer: 'Light and freedom', questionTr: 'Ateş neyi simgeler?', optionsTr: ['Aydınlık ve özgürlük', 'Sıcaklık ve yemek', 'Savaş ve barış', 'Sevgi ve aile'], correctAnswerTr: 'Aydınlık ve özgürlük' },
    ],
  },
  {
    id: 's3',
    title: 'Gur û Rêvî',
    titleEn: 'The Wolf and the Fox',
    level: 'intermediate',
    description: 'A short fable about a wolf and a fox in the mountains.',
    titleTr: 'Kurt ile Tilki',
    descriptionTr: 'Dağlardaki bir kurt ile tilki hakkında kısa bir fabl.',
    icon: 'paw',
    accent: '#B06A3B',
    paragraphs: [
      [
        { ku: 'Rojekê', en: 'One day', tr: 'Bir gün' }, { ku: 'gurekî', en: 'a wolf', tr: 'bir kurt' },
        { ku: 'birsî', en: 'hungry', tr: 'aç' }, { ku: 'li', en: 'in', tr: '…de' }, { ku: 'çiyê', en: 'mountain', tr: 'dağda' },
        { ku: 'digeriya.', en: 'was wandering.', tr: 'dolaşıyordu.' },
      ],
      [
        { ku: 'Wî', en: 'He', tr: 'O' }, { ku: 'rêvîyek', en: 'a fox', tr: 'bir tilki' }, { ku: 'dît', en: 'saw', tr: 'gördü' },
        { ku: 'û', en: 'and', tr: 've' }, { ku: 'jê', en: 'to it', tr: 'ona' }, { ku: 're', en: '(to)', tr: '(…e)' },
        { ku: 'got:', en: 'said:', tr: 'dedi:' },
      ],
      [
        { ku: '"Rêvî,', en: '"Fox,', tr: '"Tilki,' }, { ku: 'ez', en: 'I', tr: 'ben' }, { ku: 'pir', en: 'very', tr: 'çok' },
        { ku: 'birsî', en: 'hungry', tr: 'aç' }, { ku: 'me.', en: 'am.', tr: '…ım.' },
        { ku: 'Tu', en: 'You', tr: 'Sen' }, { ku: 'dizanî', en: 'know', tr: 'biliyorsun' },
        { ku: 'xwarin', en: 'food', tr: 'yemek' }, { ku: 'li', en: 'at', tr: '…de' }, { ku: 'ku', en: 'where', tr: 'nerede' },
        { ku: 'derê', en: 'place', tr: 'yer' }, { ku: 'ye?"', en: 'is?"', tr: '…dir?"' },
      ],
      [
        { ku: 'Rêvî', en: 'The fox', tr: 'Tilki' }, { ku: 'got:', en: 'said:', tr: 'dedi:' },
        { ku: '"Erê,', en: '"Yes,', tr: '"Evet,' }, { ku: 'ez', en: 'I', tr: 'ben' }, { ku: 'dizanim.', en: 'know.', tr: 'biliyorum.' },
        { ku: 'Lê', en: 'But', tr: 'Ama' }, { ku: 'divê', en: 'it is necessary', tr: 'gerekir' },
        { ku: 'tu', en: 'you', tr: 'senin' }, { ku: 'zîrek', en: 'clever', tr: 'zeki' }, { ku: 'bî."', en: 'be."', tr: 'olman."' },
      ],
      [
        { ku: 'Gur', en: 'The wolf', tr: 'Kurt' }, { ku: 'got:', en: 'said:', tr: 'dedi:' },
        { ku: '"Ez', en: '"I', tr: '"Ben' }, { ku: 'ne', en: 'not', tr: 'değil' }, { ku: 'zîrek', en: 'clever', tr: 'zeki' },
        { ku: 'im,', en: 'am,', tr: '…im,' }, { ku: 'lê', en: 'but', tr: 'ama' }, { ku: 'ez', en: 'I', tr: 'ben' },
        { ku: 'xurt', en: 'strong', tr: 'güçlü' }, { ku: 'im."', en: 'am."', tr: '…im."' },
      ],
      [
        { ku: 'Rêvî', en: 'The fox', tr: 'Tilki' }, { ku: 'keniya', en: 'laughed', tr: 'güldü' },
        { ku: 'û', en: 'and', tr: 've' }, { ku: 'got:', en: 'said:', tr: 'dedi:' },
        { ku: '"Di', en: '"In', tr: '"…de' }, { ku: 'jiyanê', en: 'life', tr: 'hayat' },
        { ku: 'de,', en: '(in),', tr: '(…de),' }, { ku: 'zîrekî', en: 'cleverness', tr: 'zekâ' },
        { ku: 'ji', en: 'than', tr: '…den' }, { ku: 'xurtiyê', en: 'strength', tr: 'güç' },
        { ku: 'çêtir', en: 'better', tr: 'daha iyi' }, { ku: 'e."', en: 'is."', tr: '…dir."' },
      ],
    ],
    comprehensionQuestions: [
      { question: 'Who was hungry?', options: ['The wolf', 'The fox', 'Both', 'Neither'], correctAnswer: 'The wolf', questionTr: 'Kim açtı?', optionsTr: ['Kurt', 'Tilki', 'İkisi de', 'Hiçbiri'], correctAnswerTr: 'Kurt' },
      { question: 'What did the wolf say about himself?', options: ['He is strong', 'He is clever', 'He is fast', 'He is tired'], correctAnswer: 'He is strong', questionTr: 'Kurt kendisi hakkında ne dedi?', optionsTr: ['Güçlü olduğunu', 'Zeki olduğunu', 'Hızlı olduğunu', 'Yorgun olduğunu'], correctAnswerTr: 'Güçlü olduğunu' },
      { question: 'What is the fox\'s lesson?', options: ['Cleverness is better than strength', 'Strength is everything', 'Food is important', 'Friends help each other'], correctAnswer: 'Cleverness is better than strength', questionTr: 'Tilkinin verdiği ders nedir?', optionsTr: ['Zekâ güçten daha iyidir', 'Güç her şeydir', 'Yemek önemlidir', 'Arkadaşlar birbirine yardım eder'], correctAnswerTr: 'Zekâ güçten daha iyidir' },
    ],
  },
  {
    id: 's4',
    title: 'Çiyayên Kurdistanê',
    titleEn: 'The Mountains of Kurdistan',
    level: 'intermediate',
    description: 'A descriptive passage about the landscape of Kurdistan.',
    titleTr: 'Kürdistan’ın Dağları',
    descriptionTr: 'Kürdistan’ın doğası hakkında betimleyici bir metin.',
    icon: 'triangle',
    accent: '#2F6E4F',
    paragraphs: [
      [
        { ku: 'Çiyayên', en: 'mountains (of)', tr: 'dağları (…in)' }, { ku: 'Kurdistanê', en: 'Kurdistan', tr: 'Kürdistan’ın' },
        { ku: 'pir', en: 'very', tr: 'çok' }, { ku: 'bilind', en: 'high', tr: 'yüksek' }, { ku: 'in.', en: 'are.', tr: '…dır.' },
      ],
      [
        { ku: 'Di', en: 'In', tr: '…de' }, { ku: 'biharê', en: 'spring', tr: 'ilkbahar' }, { ku: 'de,', en: '(in),', tr: '(…de),' },
        { ku: 'gul', en: 'flowers', tr: 'çiçekler' }, { ku: 'û', en: 'and', tr: 've' }, { ku: 'giya', en: 'grass', tr: 'çimen' },
        { ku: 'kesk', en: 'green', tr: 'yeşil' }, { ku: 'dibin.', en: 'become.', tr: 'olur.' },
        { ku: 'Av', en: 'Water', tr: 'Su' }, { ku: 'ji', en: 'from', tr: '…den' }, { ku: 'çiyan', en: 'mountains', tr: 'dağlardan' },
        { ku: 'diherike.', en: 'flows.', tr: 'akar.' },
      ],
      [
        { ku: 'Şivan', en: 'Shepherds', tr: 'Çobanlar' }, { ku: 'bi', en: 'with', tr: 'ile' },
        { ku: 'pezê', en: 'sheep', tr: 'koyun' }, { ku: 'xwe', en: 'their', tr: 'kendi' },
        { ku: 've', en: '(with)', tr: '(ile)' }, { ku: 'li', en: 'on', tr: '…de' }, { ku: 'zozanan', en: 'meadows', tr: 'yaylalarda' },
        { ku: 'diçêrînin.', en: 'graze.', tr: 'otlatır.' },
      ],
      [
        { ku: 'Di', en: 'In', tr: '…de' }, { ku: 'havînê', en: 'summer', tr: 'yaz' }, { ku: 'de,', en: '(in),', tr: '(…de),' },
        { ku: 'roj', en: 'the sun', tr: 'güneş' }, { ku: 'germ', en: 'warm', tr: 'sıcak' }, { ku: 'e.', en: 'is.', tr: '…dır.' },
        { ku: 'Lê', en: 'But', tr: 'Ama' }, { ku: 'li', en: 'on', tr: '…de' }, { ku: 'ser', en: 'top (of)', tr: 'üstünde' },
        { ku: 'çiyan', en: 'mountains', tr: 'dağların' }, { ku: 'ba', en: 'wind', tr: 'rüzgar' },
        { ku: 'hênik', en: 'cool', tr: 'serin' }, { ku: 'e.', en: 'is.', tr: '…dır.' },
      ],
      [
        { ku: 'Di', en: 'In', tr: '…de' }, { ku: 'zivistanê', en: 'winter', tr: 'kış' }, { ku: 'de,', en: '(in),', tr: '(…de),' },
        { ku: 'berf', en: 'snow', tr: 'kar' }, { ku: 'dibare.', en: 'falls.', tr: 'yağar.' },
        { ku: 'Çiya', en: 'Mountains', tr: 'Dağlar' }, { ku: 'spî', en: 'white', tr: 'beyaz' },
        { ku: 'dibin.', en: 'become.', tr: 'olur.' },
      ],
      [
        { ku: 'Kurd', en: 'Kurds', tr: 'Kürtler' }, { ku: 'dibêjin:', en: 'say:', tr: 'der:' },
        { ku: '"Çiya', en: '"Mountains', tr: '"Dağlar' }, { ku: 'dostê', en: 'friend (of)', tr: 'dostu' },
        { ku: 'kurdan', en: 'Kurds', tr: 'Kürtlerin' }, { ku: 'in."', en: 'are."', tr: '…dır."' },
      ],
    ],
    comprehensionQuestions: [
      { question: 'What happens in spring?', options: ['Flowers and grass turn green', 'Snow falls', 'It gets very hot', 'The rivers dry up'], correctAnswer: 'Flowers and grass turn green', questionTr: 'İlkbaharda ne olur?', optionsTr: ['Çiçekler ve çimenler yeşerir', 'Kar yağar', 'Hava çok ısınır', 'Nehirler kurur'], correctAnswerTr: 'Çiçekler ve çimenler yeşerir' },
      { question: 'What do shepherds do on the meadows?', options: ['Graze their sheep', 'Plant trees', 'Build houses', 'Hunt wolves'], correctAnswer: 'Graze their sheep', questionTr: 'Çobanlar yaylalarda ne yapar?', optionsTr: ['Koyunlarını otlatır', 'Ağaç diker', 'Ev yapar', 'Kurt avlar'], correctAnswerTr: 'Koyunlarını otlatır' },
      { question: 'What do Kurds say about mountains?', options: ['Mountains are the friend of Kurds', 'Mountains are dangerous', 'Mountains are cold', 'Mountains are far away'], correctAnswer: 'Mountains are the friend of Kurds', questionTr: 'Kürtler dağlar hakkında ne der?', optionsTr: ['Dağlar Kürtlerin dostudur', 'Dağlar tehlikelidir', 'Dağlar soğuktur', 'Dağlar uzaktır'], correctAnswerTr: 'Dağlar Kürtlerin dostudur' },
    ],
  },
  {
    id: 's5',
    title: 'Roja Min',
    titleEn: 'My Day',
    level: 'beginner',
    description: 'A simple story about an everyday routine.',
    titleTr: 'Benim Günüm',
    descriptionTr: 'Gündelik bir rutin hakkında basit bir hikaye.',
    icon: 'sunny',
    accent: '#D99A1C',
    paragraphs: [
      [
        { ku: 'Ez', en: 'I', tr: 'Ben' }, { ku: 'her', en: 'every', tr: 'her' }, { ku: 'sibe', en: 'morning', tr: 'sabah' },
        { ku: 'zû', en: 'early', tr: 'erken' }, { ku: 'radibim.', en: 'get up.', tr: 'kalkarım.' },
      ],
      [
        { ku: 'Pêşî,', en: 'First,', tr: 'Önce,' }, { ku: 'ez', en: 'I', tr: 'ben' }, { ku: 'taştê', en: 'breakfast', tr: 'kahvaltı' },
        { ku: 'dixwim.', en: 'eat.', tr: 'yerim.' },
      ],
      [
        { ku: 'Piştre', en: 'Then', tr: 'Sonra' }, { ku: 'ez', en: 'I', tr: 'ben' }, { ku: 'diçim', en: 'go', tr: 'giderim' },
        { ku: 'dibistanê.', en: '(to) school.', tr: 'okula.' },
      ],
      [
        { ku: 'Li', en: 'At', tr: '…de' }, { ku: 'dibistanê,', en: 'school,', tr: 'okul,' }, { ku: 'ez', en: 'I', tr: 'ben' },
        { ku: 'kurdî', en: 'Kurdish', tr: 'Kürtçe' }, { ku: 'fêr', en: 'learn', tr: 'öğrenmek' }, { ku: 'dibim.', en: '(become).', tr: '(…irim).' },
      ],
      [
        { ku: 'Êvarê,', en: 'In the evening,', tr: 'Akşam,' }, { ku: 'ez', en: 'I', tr: 'ben' }, { ku: 'bi', en: 'with', tr: 'ile' },
        { ku: 'malbata', en: 'family (of)', tr: 'aile' }, { ku: 'xwe', en: 'my', tr: 'kendi' }, { ku: 're', en: '(with)', tr: '(ile)' },
        { ku: 'çay', en: 'tea', tr: 'çay' }, { ku: 'vedixwim.', en: 'drink.', tr: 'içerim.' },
      ],
      [
        { ku: 'Şevê,', en: 'At night,', tr: 'Gece,' }, { ku: 'ez', en: 'I', tr: 'ben' }, { ku: 'kitêbekê', en: 'a book', tr: 'bir kitap' },
        { ku: 'dixwînim.', en: 'read.', tr: 'okurum.' },
      ],
      [
        { ku: 'Jiyana', en: 'life (of)', tr: 'hayat (…in)' }, { ku: 'min', en: 'my', tr: 'benim' }, { ku: 'xweş', en: 'nice', tr: 'güzel' },
        { ku: 'e.', en: 'is.', tr: '…dir.' },
      ],
    ],
    comprehensionQuestions: [
      { question: 'When does the narrator get up?', options: ['Early every morning', 'Late at night', 'At noon', 'In the afternoon'], correctAnswer: 'Early every morning', questionTr: 'Anlatıcı ne zaman kalkar?', optionsTr: ['Her sabah erken', 'Gece geç', 'Öğlen', 'Öğleden sonra'], correctAnswerTr: 'Her sabah erken' },
      { question: 'What does the narrator learn at school?', options: ['Kurdish', 'English', 'Math', 'Music'], correctAnswer: 'Kurdish', questionTr: 'Anlatıcı okulda ne öğrenir?', optionsTr: ['Kürtçe', 'İngilizce', 'Matematik', 'Müzik'], correctAnswerTr: 'Kürtçe' },
      { question: 'What does the narrator drink in the evening?', options: ['Tea', 'Water', 'Milk', 'Coffee'], correctAnswer: 'Tea', questionTr: 'Anlatıcı akşam ne içer?', optionsTr: ['Çay', 'Su', 'Süt', 'Kahve'], correctAnswerTr: 'Çay' },
    ],
  },
  {
    id: 's6',
    title: 'Li Bazarê',
    titleEn: 'At the Market',
    level: 'beginner',
    description: 'A short story about a trip to the market.',
    titleTr: 'Pazarda',
    descriptionTr: 'Pazara yapılan bir gezi hakkında kısa bir hikaye.',
    icon: 'basket',
    accent: '#D2693E',
    paragraphs: [
      [
        { ku: 'Îro', en: 'Today', tr: 'Bugün' }, { ku: 'ez', en: 'I', tr: 'ben' }, { ku: 'diçim', en: 'go', tr: 'giderim' },
        { ku: 'bazarê.', en: '(to) the market.', tr: 'pazara.' },
      ],
      [
        { ku: 'Bazar', en: 'The market', tr: 'Pazar' }, { ku: 'mezin', en: 'big', tr: 'büyük' }, { ku: 'e.', en: 'is.', tr: '…dir.' },
        { ku: 'Pir', en: 'Many', tr: 'Çok' }, { ku: 'mirov', en: 'people', tr: 'insan' }, { ku: 'hene.', en: 'there are.', tr: 'var.' },
      ],
      [
        { ku: 'Ez', en: 'I', tr: 'Ben' }, { ku: 'nan', en: 'bread', tr: 'ekmek' }, { ku: 'û', en: 'and', tr: 've' },
        { ku: 'hêkan', en: 'eggs', tr: 'yumurta' }, { ku: 'dikirim.', en: 'buy.', tr: 'alırım.' },
      ],
      [
        { ku: 'Dûre', en: 'Then', tr: 'Sonra' }, { ku: 'ez', en: 'I', tr: 'ben' }, { ku: 'li', en: 'for', tr: '…için' },
        { ku: 'kirasekî', en: 'a shirt', tr: 'bir gömlek' }, { ku: 'nû', en: 'new', tr: 'yeni' }, { ku: 'digerim.', en: 'look.', tr: 'ararım.' },
      ],
      [
        { ku: 'Dengbêjek', en: 'A bard', tr: 'Bir dengbêj' }, { ku: 'li', en: 'in', tr: '…de' }, { ku: 'quncikekî', en: 'a corner', tr: 'bir köşede' },
        { ku: 'stranan', en: 'songs', tr: 'şarkılar' }, { ku: 'dibêje.', en: 'sings.', tr: 'söyler.' },
      ],
      [
        { ku: 'Ez', en: 'I', tr: 'Ben' }, { ku: 'gelek', en: 'very', tr: 'çok' }, { ku: 'kêfxweş', en: 'happy', tr: 'mutlu' },
        { ku: 'im.', en: 'am.', tr: '…ım.' },
      ],
    ],
    comprehensionQuestions: [
      { question: 'Where does the narrator go today?', options: ['To the market', 'To school', 'To the village', 'To the sea'], correctAnswer: 'To the market', questionTr: 'Anlatıcı bugün nereye gider?', optionsTr: ['Pazara', 'Okula', 'Köye', 'Denize'], correctAnswerTr: 'Pazara' },
      { question: 'What does the narrator buy?', options: ['Bread and eggs', 'Tea and sugar', 'Meat and cheese', 'Fruit and milk'], correctAnswer: 'Bread and eggs', questionTr: 'Anlatıcı ne satın alır?', optionsTr: ['Ekmek ve yumurta', 'Çay ve şeker', 'Et ve peynir', 'Meyve ve süt'], correctAnswerTr: 'Ekmek ve yumurta' },
      { question: 'Who sings songs in the market?', options: ['A bard (dengbêj)', 'A teacher', 'A child', 'A shepherd'], correctAnswer: 'A bard (dengbêj)', questionTr: 'Pazarda kim şarkı söyler?', optionsTr: ['Bir dengbêj (ozan)', 'Bir öğretmen', 'Bir çocuk', 'Bir çoban'], correctAnswerTr: 'Bir dengbêj (ozan)' },
    ],
  },
  {
    id: 's7',
    title: 'Şivan û Pez',
    titleEn: 'The Shepherd and the Flock',
    level: 'intermediate',
    description: 'A day in the life of a shepherd in the highlands.',
    titleTr: 'Çoban ile Sürü',
    descriptionTr: 'Yaylalardaki bir çobanın günlük yaşamı.',
    icon: 'leaf',
    accent: '#6B8E4E',
    paragraphs: [
      [
        { ku: 'Şivan', en: 'The shepherd', tr: 'Çoban' }, { ku: 'her', en: 'every', tr: 'her' }, { ku: 'sibe', en: 'morning', tr: 'sabah' },
        { ku: 'pezê', en: 'the flock (of)', tr: 'sürü' }, { ku: 'xwe', en: 'his', tr: 'kendi' }, { ku: 'dibe', en: 'takes', tr: 'götürür' },
        { ku: 'çolê.', en: '(to) the pasture.', tr: 'otlağa.' },
      ],
      [
        { ku: 'Pez', en: 'The sheep', tr: 'Koyunlar' }, { ku: 'li', en: 'on', tr: '…de' }, { ku: 'ser', en: 'top (of)', tr: 'üstünde' },
        { ku: 'çiyan', en: 'the mountains', tr: 'dağların' }, { ku: 'diçêrin.', en: 'graze.', tr: 'otlar.' },
      ],
      [
        { ku: 'Kûçikê', en: 'The dog (of)', tr: 'Köpeği' }, { ku: 'şivan', en: 'the shepherd', tr: 'çobanın' },
        { ku: 'li', en: 'over', tr: '…e' }, { ku: 'pez', en: 'the flock', tr: 'sürü' }, { ku: 'diniêre.', en: 'watches.', tr: 'bakar.' },
      ],
      [
        { ku: 'Dema', en: 'When', tr: '…dığında' }, { ku: 'ku', en: 'that', tr: 'ki' }, { ku: 'gur', en: 'a wolf', tr: 'bir kurt' },
        { ku: 'tê,', en: 'comes,', tr: 'gelir,' }, { ku: 'kûçik', en: 'the dog', tr: 'köpek' }, { ku: 'direye.', en: 'barks.', tr: 'havlar.' },
      ],
      [
        { ku: 'Êvarê,', en: 'In the evening,', tr: 'Akşam,' }, { ku: 'şivan', en: 'the shepherd', tr: 'çoban' },
        { ku: 'vedigere', en: 'returns', tr: 'döner' }, { ku: 'gund.', en: '(to) the village.', tr: 'köye.' },
      ],
      [
        { ku: 'Jiyana', en: 'The life (of)', tr: 'hayat (…in)' }, { ku: 'şivan', en: 'a shepherd', tr: 'çoban' },
        { ku: 'zehmet', en: 'hard', tr: 'zor' }, { ku: 'e,', en: 'is,', tr: '…dir,' }, { ku: 'lê', en: 'but', tr: 'ama' },
        { ku: 'azad', en: 'free', tr: 'özgür' }, { ku: 'e.', en: 'is.', tr: '…dir.' },
      ],
    ],
    comprehensionQuestions: [
      { question: 'Where does the shepherd take the flock?', options: ['To the pasture', 'To the market', 'To the river', 'To the city'], correctAnswer: 'To the pasture', questionTr: 'Çoban sürüyü nereye götürür?', optionsTr: ['Otlağa', 'Pazara', 'Nehre', 'Şehre'], correctAnswerTr: 'Otlağa' },
      { question: 'What does the dog do when a wolf comes?', options: ['It barks', 'It runs away', 'It sleeps', 'It eats'], correctAnswer: 'It barks', questionTr: 'Bir kurt geldiğinde köpek ne yapar?', optionsTr: ['Havlar', 'Kaçar', 'Uyur', 'Yer'], correctAnswerTr: 'Havlar' },
      { question: 'How is the life of a shepherd described?', options: ['Hard but free', 'Easy and rich', 'Short and sad', 'Quiet and lonely'], correctAnswer: 'Hard but free', questionTr: 'Bir çobanın hayatı nasıl betimlenir?', optionsTr: ['Zor ama özgür', 'Kolay ve zengin', 'Kısa ve üzücü', 'Sessiz ve yalnız'], correctAnswerTr: 'Zor ama özgür' },
    ],
  },
  {
    id: 's8',
    title: 'Çar Demsalên Salê',
    titleEn: 'The Four Seasons',
    level: 'intermediate',
    description: 'How the year turns through the four seasons.',
    titleTr: 'Dört Mevsim',
    descriptionTr: 'Yılın dört mevsim boyunca nasıl döndüğü.',
    icon: 'partly-sunny',
    accent: '#3E7C8C',
    paragraphs: [
      [
        { ku: 'Sal', en: 'The year', tr: 'Yıl' }, { ku: 'çar', en: 'four', tr: 'dört' }, { ku: 'demsal', en: 'seasons', tr: 'mevsim' },
        { ku: 'hene.', en: 'has.', tr: 'vardır.' },
      ],
      [
        { ku: 'Di', en: 'In', tr: '…de' }, { ku: 'biharê', en: 'spring', tr: 'ilkbahar' }, { ku: 'de,', en: '(in),', tr: '(…de),' },
        { ku: 'gul', en: 'flowers', tr: 'çiçekler' }, { ku: 'vedibin', en: 'bloom', tr: 'açar' }, { ku: 'û', en: 'and', tr: 've' },
        { ku: 'erd', en: 'the earth', tr: 'yer' }, { ku: 'kesk', en: 'green', tr: 'yeşil' }, { ku: 'dibe.', en: 'becomes.', tr: 'olur.' },
      ],
      [
        { ku: 'Havîn', en: 'Summer', tr: 'Yaz' }, { ku: 'germ', en: 'hot', tr: 'sıcak' }, { ku: 'e;', en: 'is;', tr: '…dır;' },
        { ku: 'roj', en: 'the sun', tr: 'güneş' }, { ku: 'dirêj', en: 'long', tr: 'uzun' }, { ku: 'e.', en: 'is.', tr: '…dır.' },
      ],
      [
        { ku: 'Di', en: 'In', tr: '…de' }, { ku: 'payîzê', en: 'autumn', tr: 'sonbahar' }, { ku: 'de,', en: '(in),', tr: '(…de),' },
        { ku: 'pelên', en: 'the leaves (of)', tr: 'yaprakları' }, { ku: 'daran', en: 'the trees', tr: 'ağaçların' },
        { ku: 'zer', en: 'yellow', tr: 'sarı' }, { ku: 'dibin.', en: 'become.', tr: 'olur.' },
      ],
      [
        { ku: 'Zivistan', en: 'Winter', tr: 'Kış' }, { ku: 'sar', en: 'cold', tr: 'soğuk' }, { ku: 'e', en: 'is', tr: '…dır' },
        { ku: 'û', en: 'and', tr: 've' }, { ku: 'berf', en: 'snow', tr: 'kar' }, { ku: 'dibare.', en: 'falls.', tr: 'yağar.' },
      ],
      [
        { ku: 'Her', en: 'Each', tr: 'Her' }, { ku: 'demsal', en: 'season', tr: 'mevsim' }, { ku: 'rengek', en: 'a color', tr: 'bir renk' },
        { ku: 'û', en: 'and', tr: 've' }, { ku: 'xweşiyek', en: 'a beauty', tr: 'bir güzellik' }, { ku: 'tîne.', en: 'brings.', tr: 'getirir.' },
      ],
    ],
    comprehensionQuestions: [
      { question: 'How many seasons does the year have?', options: ['Four', 'Two', 'Three', 'Five'], correctAnswer: 'Four', questionTr: 'Yılın kaç mevsimi vardır?', optionsTr: ['Dört', 'İki', 'Üç', 'Beş'], correctAnswerTr: 'Dört' },
      { question: 'What happens in autumn?', options: ['The leaves turn yellow', 'Flowers bloom', 'Snow falls', 'The sun gets long'], correctAnswer: 'The leaves turn yellow', questionTr: 'Sonbaharda ne olur?', optionsTr: ['Yapraklar sararır', 'Çiçekler açar', 'Kar yağar', 'Güneş uzar'], correctAnswerTr: 'Yapraklar sararır' },
      { question: 'What falls in winter?', options: ['Snow', 'Rain', 'Leaves', 'Flowers'], correctAnswer: 'Snow', questionTr: 'Kışın ne yağar?', optionsTr: ['Kar', 'Yağmur', 'Yapraklar', 'Çiçekler'], correctAnswerTr: 'Kar' },
    ],
  },
  {
    id: 's6',
    title: 'Azad Nexweş e',
    titleEn: 'Azad is Sick',
    level: 'beginner',
    description: 'A short story about a child, some medicine, and getting well again.',
    titleTr: 'Azad Hasta',
    descriptionTr: 'Bir çocuk, biraz ilaç ve yeniden iyileşme hakkında kısa bir hikaye.',
    icon: 'medkit',
    accent: '#3E7D5A',
    paragraphs: [
      [
        { ku: 'Azad', en: 'Azad', tr: 'Azad' }, { ku: 'zarokek', en: 'a child', tr: 'bir çocuk' },
        { ku: 'biçûk', en: 'small', tr: 'küçük' }, { ku: 'e.', en: 'is.', tr: '…dir.' },
      ],
      [
        { ku: 'Lê', en: 'But', tr: 'Ama' }, { ku: 'ew', en: 'he', tr: 'o' },
        { ku: 'nexweş', en: 'sick', tr: 'hasta' }, { ku: 'e.', en: 'is.', tr: '…dır.' },
      ],
      [
        { ku: 'Azad', en: 'Azad', tr: 'Azad' }, { ku: 'li', en: 'at', tr: '…de' },
        { ku: 'malê', en: 'home', tr: 'evde' }, { ku: 'ye.', en: 'is.', tr: '…dir.' },
      ],
      [
        { ku: 'Diya', en: 'mother (of)', tr: 'anne (…in)' }, { ku: 'wî', en: 'his', tr: 'onun' },
        { ku: 'derman', en: 'medicine', tr: 'ilaç' }, { ku: 'dide.', en: 'gives.', tr: 'verir.' },
      ],
      [
        { ku: 'Bavê', en: 'father (of)', tr: 'baba (…in)' }, { ku: 'wî', en: 'his', tr: 'onun' },
        { ku: 'jî', en: 'also', tr: 'da' }, { ku: 'li', en: 'at', tr: '…de' },
        { ku: 'malê', en: 'home', tr: 'evde' }, { ku: 'ye.', en: 'is.', tr: '…dir.' },
      ],
      [
        { ku: 'Piştî', en: 'After', tr: '…den sonra' }, { ku: 'rojekê,', en: 'a day,', tr: 'bir gün' },
        { ku: 'Azad', en: 'Azad', tr: 'Azad' }, { ku: 'sax', en: 'well', tr: 'iyi' }, { ku: 'e.', en: 'is.', tr: '…dir.' },
        { ku: 'Ew', en: 'He', tr: 'O' }, { ku: 'pir', en: 'very', tr: 'çok' },
        { ku: 'şa', en: 'happy', tr: 'mutlu' }, { ku: 'ye.', en: 'is.', tr: '…dir.' },
      ],
    ],
    comprehensionQuestions: [
      { question: 'How does Azad feel at first?', options: ['Sick', 'Happy', 'Hungry', 'Sleepy'], correctAnswer: 'Sick', questionTr: 'Azad önce nasıl hissediyor?', optionsTr: ['Hasta', 'Mutlu', 'Aç', 'Uykulu'], correctAnswerTr: 'Hasta' },
      { question: 'What does his mother give him?', options: ['Medicine', 'Bread', 'Water', 'A book'], correctAnswer: 'Medicine', questionTr: 'Annesi ona ne verir?', optionsTr: ['İlaç', 'Ekmek', 'Su', 'Kitap'], correctAnswerTr: 'İlaç' },
      { question: 'How is Azad after a day?', options: ['Well and happy', 'Still sick', 'Very tired', 'At school'], correctAnswer: 'Well and happy', questionTr: 'Bir gün sonra Azad nasıl?', optionsTr: ['İyi ve mutlu', 'Hâlâ hasta', 'Çok yorgun', 'Okulda'], correctAnswerTr: 'İyi ve mutlu' },
    ],
  },
];

export const getStoryById = (id: string) => stories.find((s) => s.id === id);
