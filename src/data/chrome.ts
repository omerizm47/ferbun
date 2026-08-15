// Fêrbûn: taught-language interface chrome, one table per track.
// These are the words the app says *in the language being taught*: the
// greeting, the card kickers, the empty-state title. They are not bridge copy
// (that is i18n/strings.ts, en/tr) and they are not corpus content (that is
// data/courses.ts and friends). They sat inline in the screens, which made
// every one of them a Kurmanji hard-coding a second track would inherit.
//
// Sources. The Kurmanji column is the wording already shipped in the app under
// KMR_POLICY, which sets requireCitation: false. It is existing product copy
// lifted character-for-character out of the render sites, not a new claim about
// the language, so it carries no locator. The Sorani column is entirely
// PENDING: every slot must arrive as an attested form with a THK06 page
// locator in `src`, never as a guess or a machine translation.
//
// This file imports nothing from data/tracks.ts. The dependency runs one way:
// tracks.ts reads the chrome tables, chrome.ts knows no track ids.

/**
 * One piece of taught chrome: the wording, and where it came from. `text: null`
 * means the slot is unauthored for this track.
 */
export interface ChromeSlot {
  text: string | null;
  /** Source locator, e.g. 'THK06:88'. Null only where the policy waives citation. */
  src: string | null;
}

/** The single unauthored slot. Frozen so a stray write cannot fill it in place. */
export const PENDING: ChromeSlot = Object.freeze({ text: null, src: null });

/**
 * Every taught-chrome slot in the app. Adding a key here breaks both tables
 * until both are filled, which is the parity guarantee: a new track cannot ship
 * with a slot nobody noticed was missing.
 * An alias rather than an interface, so a table can be passed to a validator
 * that takes Record<string, ChromeSlot>.
 */
export type TaughtChrome = {
  // Home: time-of-day greeting.
  homeGreetMorning: ChromeSlot;
  homeGreetAfternoon: ChromeSlot;
  homeGreetEvening: ChromeSlot;
  homeGreetNight: ChromeSlot;
  // Home: continue / all-done / empty-track / review cards.
  homeContinueKicker: ChromeSlot;
  homeAllDoneKicker: ChromeSlot;
  homeAllDoneTitle: ChromeSlot;
  homeEmptyKicker: ChromeSlot;
  homeEmptyTitle: ChromeSlot;
  homeReviewKicker: ChromeSlot;
  // Home, the noun after the streak count.
  streakDayNoun: ChromeSlot;
  // Home, the taught praise that closes the daily-goal line once it is met.
  goalMetPraise: ChromeSlot;
  // Shared across lesson and story: answer feedback, celebration, coach mark.
  feedbackCorrect: ChromeSlot;
  feedbackWrong: ChromeSlot;
  congratsTitle: ChromeSlot;
  coachKicker: ChromeSlot;
  // One kicker per exercise type.
  exChooseKicker: ChromeSlot;
  exTranslateKicker: ChromeSlot;
  exMatchKicker: ChromeSlot;
  exTrueFalseKicker: ChromeSlot;
  exFillKicker: ChromeSlot;
  exWriteKicker: ChromeSlot;
  // The two true/false answer buttons.
  trueLabel: ChromeSlot;
  falseLabel: ChromeSlot;
  // Lesson, combo praise. One slot per entry so a track can vary the wording
  // and the count; ENCOURAGEMENTS holds the matching bridge halves.
  encourage1: ChromeSlot;
  encourage2: ChromeSlot;
  encourage3: ChromeSlot;
  encourage4: ChromeSlot;
  encourage5: ChromeSlot;
  encourage6: ChromeSlot;
  encourage7: ChromeSlot;
  // Lesson, fallback titles and feedback labels.
  lessonNotFoundTitle: ChromeSlot;
  lessonComingSoonTitle: ChromeSlot;
  comboKicker: ChromeSlot;
  spellingLabel: ChromeSlot;
  correctAnswerLabel: ChromeSlot;
  // The button that dismisses a celebration.
  continueCta: ChromeSlot;
  // Vocab list header.
  vocabHeader: ChromeSlot;
  // Flashcards and the rapid-fire game share the two fallback titles.
  reviewDoneTitle: ChromeSlot;
  noWordsTitle: ChromeSlot;
  // Flashcards: the label on whichever face carries the taught word, the two
  // gender badges, and the prompt over the know / still-learning buttons.
  cardTaughtLabel: ChromeSlot;
  genderM: ChromeSlot;
  genderF: ChromeSlot;
  knowPrompt: ChromeSlot;
  // Rapid fire, start and game-over titles.
  rapidFireTitle: ChromeSlot;
  timeUpTitle: ChromeSlot;
  // Stories list: header, the three difficulty badges, the question count noun
  // and the two read-state pills.
  storiesHeader: ChromeSlot;
  levelBeginner: ChromeSlot;
  levelIntermediate: ChromeSlot;
  levelAdvanced: ChromeSlot;
  questionsNoun: ChromeSlot;
  storyRead: ChromeSlot;
  storyReadCta: ChromeSlot;
  // Story reader and unit screen.
  storyNotFoundTitle: ChromeSlot;
  comprehensionKicker: ChromeSlot;
  unitNotFoundTitle: ChromeSlot;
  // Story comprehension quiz, results title.
  storyDoneTitle: ChromeSlot;
  // Onboarding carousel, one title per slide.
  onbTitle1: ChromeSlot;
  onbTitle2: ChromeSlot;
  onbTitle3: ChromeSlot;
  onbTitle4: ChromeSlot;
  onbTitle5: ChromeSlot;
  // Onboarding hero mock-ups: the flashcard face, the story line (split so the
  // glossed word can be highlighted and reused in the tooltip) and the streak
  // pill. Decorative, but still words in the taught language.
  onbFlashLabel: ChromeSlot;
  onbSampleWord: ChromeSlot;
  onbStoryBefore: ChromeSlot;
  onbStoryWord: ChromeSlot;
  onbStoryAfter: ChromeSlot;
  onbStreakLabel: ChromeSlot;
  // Taught half of the final onboarding button.
  onbStartCta: ChromeSlot;
  // Greeting on the first-run base-language picker.
  welcome: ChromeSlot;
  // Profile: the eight avatar emblem names.
  avatarSun: ChromeSlot;
  avatarFlame: ChromeSlot;
  avatarMountain: ChromeSlot;
  avatarWheat: ChromeSlot;
  avatarTulip: ChromeSlot;
  avatarStar: ChromeSlot;
  avatarHeart: ChromeSlot;
  avatarBook: ChromeSlot;
  // Profile: the three appearance-mode labels.
  appSystem: ChromeSlot;
  appLight: ChromeSlot;
  appDark: ChromeSlot;
  // Profile: the word for a learner, shown when no display name is set.
  learnerNoun: ChromeSlot;
  // The taught language's name for itself, used on the card-direction control.
  taughtName: ChromeSlot;
  // One slot per badge, keyed `badge_<id>` after data/badges.ts. Read through
  // badgeName(), which is what keeps the key and the id in step.
  badge_first_lesson: ChromeSlot;
  badge_ten_lessons: ChromeSlot;
  badge_all_lessons: ChromeSlot;
  badge_streak_3: ChromeSlot;
  badge_streak_7: ChromeSlot;
  badge_streak_30: ChromeSlot;
  badge_vocab_10_mastered: ChromeSlot;
  badge_vocab_50_mastered: ChromeSlot;
  badge_perfect_lesson: ChromeSlot;
  badge_combo_master: ChromeSlot;
  badge_first_story: ChromeSlot;
  badge_all_stories: ChromeSlot;
};

/** What a screen actually renders: the same keys, resolved to plain strings. */
export type ChromeText = Record<keyof TaughtChrome, string>;

export const KMR_CHROME: TaughtChrome = {
  homeGreetMorning: { text: 'Beyanî baş', src: null },
  homeGreetAfternoon: { text: 'Roj baş', src: null },
  homeGreetEvening: { text: 'Êvar baş', src: null },
  homeGreetNight: { text: 'Şev baş', src: null },
  homeContinueKicker: { text: 'BIDOMÎNE', src: null },
  homeAllDoneKicker: { text: 'PÎROZ BE', src: null },
  homeAllDoneTitle: { text: 'Te hemû qedand', src: null },
  homeEmptyKicker: { text: 'BÊ DERS', src: null },
  homeEmptyTitle: { text: 'Hê ders tune', src: null },
  homeReviewKicker: { text: 'DUBARE', src: null },
  streakDayNoun: { text: 'roj', src: null },
  goalMetPraise: { text: 'sax bî!', src: null },
  feedbackCorrect: { text: 'Aferîn!', src: null },
  feedbackWrong: { text: 'Nêzîk bû', src: null },
  congratsTitle: { text: 'Pîroz be!', src: null },
  coachKicker: { text: 'RÊBER', src: null },
  exChooseKicker: { text: 'HILBIJÊRE', src: null },
  exTranslateKicker: { text: 'WERGERÎNE', src: null },
  exMatchKicker: { text: 'LI HEV BÎNE', src: null },
  exTrueFalseKicker: { text: 'RAST AN ŞAŞ', src: null },
  exFillKicker: { text: 'TIJE BIKE', src: null },
  exWriteKicker: { text: 'BINIVÎSE', src: null },
  trueLabel: { text: 'Rast', src: null },
  falseLabel: { text: 'Şaş', src: null },
  encourage1: { text: 'Aferîn!', src: null },
  encourage2: { text: 'Bijî!', src: null },
  encourage3: { text: 'Her bijî!', src: null },
  encourage4: { text: 'Destxweş!', src: null },
  encourage5: { text: 'Zîrek î!', src: null },
  encourage6: { text: 'Nayab e!', src: null },
  encourage7: { text: 'Pir baş e!', src: null },
  lessonNotFoundTitle: { text: 'Ders nehat dîtin', src: null },
  lessonComingSoonTitle: { text: 'Di amadekirinê de', src: null },
  comboKicker: { text: 'PIRSAN DI RÊZÊ DE', src: null },
  spellingLabel: { text: 'RASTNIVÎS', src: null },
  correctAnswerLabel: { text: 'BERSIVA RAST', src: null },
  continueCta: { text: 'Berdewam be', src: null },
  vocabHeader: { text: 'Peyvên Kurdî', src: null },
  reviewDoneTitle: { text: 'Baş e!', src: null },
  noWordsTitle: { text: 'Peyv tune', src: null },
  cardTaughtLabel: { text: 'Kurdî', src: null },
  genderM: { text: 'nêr', src: null },
  genderF: { text: 'mê', src: null },
  knowPrompt: { text: 'TU DIZANÎ?', src: null },
  rapidFireTitle: { text: 'Agirê Xwe Vêxe!', src: null },
  timeUpTitle: { text: 'Dem Qediya!', src: null },
  storiesHeader: { text: 'Çîrokên Kurdî', src: null },
  levelBeginner: { text: 'Destpêk', src: null },
  levelIntermediate: { text: 'Navîn', src: null },
  levelAdvanced: { text: 'Pêşketî', src: null },
  questionsNoun: { text: 'pirs', src: null },
  storyRead: { text: 'Xwendin', src: null },
  storyReadCta: { text: 'Bixwîne', src: null },
  storyNotFoundTitle: { text: 'Çîrok nehat dîtin', src: null },
  comprehensionKicker: { text: 'PIRSA TÊGIHIŞTINÊ', src: null },
  unitNotFoundTitle: { text: 'Beş nehat dîtin', src: null },
  storyDoneTitle: { text: 'Te xwend!', src: null },
  onbTitle1: { text: 'Bi xêr hatî', src: null },
  onbTitle2: { text: 'Rê li pêş te', src: null },
  onbTitle3: { text: 'Peyv bi peyv', src: null },
  onbTitle4: { text: 'Çîrokên rastîn', src: null },
  onbTitle5: { text: 'Agirê xwe vêxe', src: null },
  onbFlashLabel: { text: 'KURDÎ', src: null },
  onbSampleWord: { text: 'roj baş', src: null },
  onbStoryBefore: { text: 'Ez li ', src: null },
  onbStoryWord: { text: 'mal', src: null },
  onbStoryAfter: { text: ' im.', src: null },
  onbStreakLabel: { text: 'rojan li pey hev', src: null },
  onbStartCta: { text: 'Dest pê bike', src: null },
  welcome: { text: 'Bi xêr hatî', src: null },
  avatarSun: { text: 'Roj (Sun)', src: null },
  avatarFlame: { text: 'Agirê Newrozê', src: null },
  avatarMountain: { text: 'Çiya (Mountains)', src: null },
  avatarWheat: { text: 'Genim (Wheat)', src: null },
  avatarTulip: { text: 'Gul (Tulip)', src: null },
  avatarStar: { text: 'Stêrk (Star)', src: null },
  avatarHeart: { text: 'Dil (Heart)', src: null },
  avatarBook: { text: 'Pirtûk (Learning)', src: null },
  appSystem: { text: 'Bixweber', src: null },
  appLight: { text: 'Ron', src: null },
  appDark: { text: 'Tarî', src: null },
  learnerNoun: { text: 'Xwendekar', src: null },
  taughtName: { text: 'Kurdî', src: null },
  badge_first_lesson: { text: 'Peyvên Pêşîn', src: null },
  badge_ten_lessons: { text: 'Xwendekar', src: null },
  badge_all_lessons: { text: 'Mamosta', src: null },
  badge_streak_3: { text: 'Sê Roj', src: null },
  badge_streak_7: { text: 'Heft Roj', src: null },
  badge_streak_30: { text: 'Sî Roj', src: null },
  badge_vocab_10_mastered: { text: 'Peyvnas', src: null },
  badge_vocab_50_mastered: { text: 'Çêrvanê Peyvê', src: null },
  badge_perfect_lesson: { text: 'Roja Bêkêmasî', src: null },
  badge_combo_master: { text: 'Şer-Komboyê', src: null },
  badge_first_story: { text: 'Çîrokxwîn', src: null },
  badge_all_stories: { text: 'Qehremanê Çîrokan', src: null },
};

// Nothing authored yet. Filling a slot means replacing PENDING with an attested
// form and its THK06 locator; CKB_POLICY.requireCitation makes the locator
// non-optional, so wording cannot enter ahead of its source.
export const CKB_CHROME: TaughtChrome = {
  homeGreetMorning: PENDING,
  homeGreetAfternoon: PENDING,
  homeGreetEvening: PENDING,
  homeGreetNight: PENDING,
  homeContinueKicker: PENDING,
  homeAllDoneKicker: PENDING,
  homeAllDoneTitle: PENDING,
  homeEmptyKicker: PENDING,
  homeEmptyTitle: PENDING,
  homeReviewKicker: PENDING,
  streakDayNoun: PENDING,
  goalMetPraise: PENDING,
  feedbackCorrect: PENDING,
  feedbackWrong: PENDING,
  congratsTitle: PENDING,
  coachKicker: PENDING,
  exChooseKicker: PENDING,
  exTranslateKicker: PENDING,
  exMatchKicker: PENDING,
  exTrueFalseKicker: PENDING,
  exFillKicker: PENDING,
  exWriteKicker: PENDING,
  trueLabel: PENDING,
  falseLabel: PENDING,
  encourage1: PENDING,
  encourage2: PENDING,
  encourage3: PENDING,
  encourage4: PENDING,
  encourage5: PENDING,
  encourage6: PENDING,
  encourage7: PENDING,
  lessonNotFoundTitle: PENDING,
  lessonComingSoonTitle: PENDING,
  comboKicker: PENDING,
  spellingLabel: PENDING,
  correctAnswerLabel: PENDING,
  continueCta: PENDING,
  vocabHeader: PENDING,
  reviewDoneTitle: PENDING,
  noWordsTitle: PENDING,
  cardTaughtLabel: PENDING,
  genderM: PENDING,
  genderF: PENDING,
  knowPrompt: PENDING,
  rapidFireTitle: PENDING,
  timeUpTitle: PENDING,
  storiesHeader: PENDING,
  levelBeginner: PENDING,
  levelIntermediate: PENDING,
  levelAdvanced: PENDING,
  questionsNoun: PENDING,
  storyRead: PENDING,
  storyReadCta: PENDING,
  storyNotFoundTitle: PENDING,
  comprehensionKicker: PENDING,
  unitNotFoundTitle: PENDING,
  storyDoneTitle: PENDING,
  onbTitle1: PENDING,
  onbTitle2: PENDING,
  onbTitle3: PENDING,
  onbTitle4: PENDING,
  onbTitle5: PENDING,
  onbFlashLabel: PENDING,
  onbSampleWord: PENDING,
  onbStoryBefore: PENDING,
  onbStoryWord: PENDING,
  onbStoryAfter: PENDING,
  onbStreakLabel: PENDING,
  onbStartCta: PENDING,
  welcome: PENDING,
  avatarSun: PENDING,
  avatarFlame: PENDING,
  avatarMountain: PENDING,
  avatarWheat: PENDING,
  avatarTulip: PENDING,
  avatarStar: PENDING,
  avatarHeart: PENDING,
  avatarBook: PENDING,
  appSystem: PENDING,
  appLight: PENDING,
  appDark: PENDING,
  learnerNoun: PENDING,
  taughtName: PENDING,
  badge_first_lesson: PENDING,
  badge_ten_lessons: PENDING,
  badge_all_lessons: PENDING,
  badge_streak_3: PENDING,
  badge_streak_7: PENDING,
  badge_streak_30: PENDING,
  badge_vocab_10_mastered: PENDING,
  badge_vocab_50_mastered: PENDING,
  badge_perfect_lesson: PENDING,
  badge_combo_master: PENDING,
  badge_first_story: PENDING,
  badge_all_stories: PENDING,
};

/**
 * A pending slot resolves to the empty string, so the taught half of a
 * bilingual line simply disappears and the bridge half stands on its own. The
 * app never shows a key, a placeholder token, or another track's language.
 */
export function resolveChrome(chrome: TaughtChrome): ChromeText {
  const out = {} as ChromeText;
  // Own enumerable keys only: a bare for..in would walk Object.prototype.
  for (const key of Object.keys(chrome) as (keyof TaughtChrome)[]) {
    out[key] = chrome[key].text ?? '';
  }
  return out;
}

/**
 * The "BIDOMÎNE · CONTINUE" kicker pattern. With the taught half unauthored the
 * separator goes too, leaving the bridge word alone rather than a dangling dot.
 */
export function bilingualKicker(taught: string, bridge: string): string {
  return taught ? `${taught} · ${bridge}` : bridge;
}

/**
 * The taught name of a badge, whose slot is keyed `badge_<id>` after its id in
 * data/badges.ts. An id with no slot resolves to '' rather than to whatever a
 * bare index would find, so a badge added to the data without a matching slot
 * renders its bridge name alone instead of crashing or leaking a prototype
 * member.
 */
export function badgeName(chrome: ChromeText, badgeId: string): string {
  const key = `badge_${badgeId}` as keyof ChromeText;
  return Object.prototype.hasOwnProperty.call(chrome, key) ? chrome[key] : '';
}
