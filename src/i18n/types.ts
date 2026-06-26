// Base ("bridge") language for the learning experience. The language being
// taught is always Kurmanji; this only controls the interface chrome and the
// meaning-glosses (English by default, Turkish for Turkish speakers).
export type Lang = 'en' | 'tr';

export const LANGS: Lang[] = ['en', 'tr'];

/**
 * Shape of every user-facing interface string in the app. Both locales must
 * satisfy this interface, so TypeScript guarantees the Turkish catalogue stays
 * in parity with English — a missing key is a compile error, never a blank label.
 *
 * Grows section-by-section as screens are migrated off inline strings. Kurmanji
 * text that is intentionally shown to every learner (e.g. "Pîroz be") is NOT in
 * here — it lives in the screens unchanged.
 */
export interface UiStrings {
  // Shared action labels reused across screens.
  common: {
    continue: string;
    cancel: string;
    skip: string;
    back: string;
    close: string;
    done: string;
    next: string;
    check: string;
    goBack: string;
    save: string;
    /** A11y label for the normal-speed pronunciation button. */
    listen: string;
    /** A11y label for the slow-speed pronunciation button. */
    listenSlow: string;
  };
  // First-run coach-mark (spotlight) chrome. Step content lives in home.coach /
  // lesson.coach; these are the shared control labels.
  coach: {
    gotIt: string;
    tapHint: string;
  };
  // Bottom tab-bar labels.
  tabs: {
    learn: string;
    words: string;
    stories: string;
    profile: string;
    /** Accessibility hint template for switching to a tab. */
    hint: (label: string) => string;
  };
  // First-run base-language picker screen.
  language: {
    title: string;
    subtitle: string;
    englishName: string;
    englishSub: string;
    turkishName: string;
    turkishSub: string;
    continue: string;
    /** Label for the Appearance-style control in Profile. */
    settingTitle: string;
  };
  // First-run intro carousel (5 slides). titleKu + visuals stay in the screen;
  // only the label/description and CTA gloss are localized here.
  onboarding: {
    slides: { label: string; description: string }[];
    /** Gloss half of the final bilingual CTA ("Dest pê bike — …"). */
    start: string;
    /** Accessibility label for the back chevron. */
    goBack: string;
    /** Decorative hero mock-up cards (kept in the bridge language). */
    preview: {
      unitKicker: string;
      question: string;
      optCorrect: string;
      opt2: string;
      opt3: string;
      wordsHint: string;
      storyGloss: string;
    };
  };
  // Home screen chrome. Kurmanji greetings/titles stay in the screen; only the
  // gloss line + labels are localized.
  home: {
    greeting: { morning: string; afternoon: string; evening: string; night: string };
    level: string;
    /** Gloss half of the bilingual "BIDOMÎNE · …" continue kicker. */
    continueKicker: string;
    /** Gloss half of the bilingual "PÎROZ BE · …" all-done kicker. */
    allDoneKicker: string;
    allDoneSub: string;
    coach: { title: string; description: string }[];
  };
  // Words/vocabulary tab list.
  vocab: {
    title: string;
    /** Noun in "{n} words" theme counts. */
    words: string;
  };
  // Unit (lesson list) screen. tag* render under an uppercase style, so they are
  // stored already-uppercased (Turkish with correct İ/I).
  unit: {
    notFoundTitle: string;
    notFoundMessage: string;
    tagGrammar: string;
    tagVocab: string;
  };
  // Stories list.
  stories: {
    title: string;
    hint: string;
    /** Abbreviation in "{n} min" read time. */
    min: string;
  };
  // Flashcard review. known/learning render under an uppercase style, so they are
  // stored already-uppercased (Turkish with correct İ).
  flashcard: {
    noWordsTitle: string;
    noWordsMessage: string;
    reviewComplete: string;
    reviewed: (n: number) => string;
    known: string;
    learning: string;
    tapReveal: string;
    kurdish: string;
    back: string;
    flipHint: string;
    masculine: string;
    feminine: string;
    knowPrompt: string;
    stillLearning: string;
    iKnow: string;
  };
  // Exercise chrome. *Kicker glosses render under an uppercase style, so they
  // are stored already-uppercased (Turkish with correct İ).
  exercises: {
    chooseKicker: string;
    translateKicker: string;
    trueFalseKicker: string;
    fillKicker: string;
    matchKicker: string;
    matchInstruction: string;
    correctAnswer: string;
    typeAnswer: string;
    fillBlank: string;
    true: string;
    false: string;
  };
  // Answer-feedback gloss line (the Kurmanji headline stays in the sheet).
  feedback: {
    correct: string;
    wrong: string;
  };
  // Profile screen. Section titles + subtitle render under uppercase styles, so
  // they are stored already-uppercased (Turkish with correct İ). Tier names are
  // natural case (shown mostly in the natural-case streak list).
  profile: {
    subtitle: string;
    editProfileA11y: string;
    editNameA11y: (name: string) => string;
    levelProgress: string;
    level: string;
    statStreak: string;
    statStreakA11y: (value: string, tier: string) => string;
    statXp: string;
    statXpA11y: (value: string, level: string) => string;
    statDone: string;
    statDoneA11y: (value: string, progress: string) => string;
    srsTitle: string;
    srsLearning: string;
    srsFamiliar: string;
    statMastered: string;
    forgettingCurveTip: string;
    srsEmptyState: string;
    xpToNext: (xp: number, level: number) => string;
    streakLevelsTitle: string;
    tiers: { candle: string; spark: string; campfire: string; bonfire: string; newrozFire: string };
    tierReq: { candle: string; spark: string; campfire: string; bonfire: string; newrozFire: string };
    appearance: string;
    appSystem: string;
    appLight: string;
    appDark: string;
    appearanceA11y: (label: string) => string;
    help: string;
    replayIntro: string;
    replayIntroSub: string;
    /** "More from us" cross-promotion section. */
    moreApps: string;
    nisibisTitle: string;
    nisibisSub: string;
    reset: string;
    resetTitle: string;
    resetMessage: string;
    resetConfirm: string;
    editTitle: string;
    editSub: string;
    namePlaceholder: string;
    symbol: string;
    color: string;
    colorA11y: (label: string) => string;
  };
  // Lesson screen. *Gloss/stat/kicker labels render under uppercase styles, so
  // they are stored already-uppercased (Turkish with correct İ).
  lesson: {
    coach: { title: string; description: string }[];
    quitTitle: string;
    quitMessage: string;
    keepGoing: string;
    quit: string;
    notFoundTitle: string;
    notFoundMessage: string;
    comingSoonTitle: string;
    comingSoonMessage: (title: string) => string;
    complete: string;
    finishMessages: { min0: string; min50: string; min80: string; min100: string };
    scoreLabel: string;
    correctLabel: string;
    xpLabel: string;
    newWords: string;
    learnFirst: string;
    learnFirstSub: string;
    startPractice: string;
    closeIntroA11y: string;
    closeLessonA11y: string;
  };
  // Story reader + comprehension quiz. *Gloss labels render under uppercase
  // styles, so they are stored already-uppercased (Turkish with correct İ).
  story: {
    notFoundTitle: string;
    notFoundMessage: string;
    closeQuizA11y: string;
    comprehensionComplete: string;
    scoreResult: (correct: number, total: number, pct: number) => string;
    backToStory: string;
    comprehensionKicker: string;
    seeResults: string;
    next: string;
    tapHint: string;
    tapWordA11y: (word: string) => string;
    testComprehension: string;
    questionsCount: (n: number) => string;
  };
  // Spaced-repetition review (reuses the flashcard flow for words that are due).
  // kicker renders under an uppercase style, so it is stored already-uppercased.
  review: {
    kicker: string;
    title: string;
    due: (n: number) => string;
    emptyTitle: string;
    emptyMessage: string;
    a11y: string;
  };
  // Daily goal + reminders. *Section/label headers render uppercase, so they are
  // stored already-uppercased (Turkish with correct İ). notif* is the scheduled
  // notification copy; perm* is the permission-denied alert.
  reminders: {
    sectionTitle: string;
    dailyGoal: string;
    goalMet: string;
    goalRemaining: (xp: number) => string;
    remindersLabel: string;
    remindersSub: string;
    reminderTime: string;
    goalPickerTitle: string;
    notifTitle: string;
    notifBody: string;
    permTitle: string;
    permMessage: string;
    openSettings: string;
  };
  // Full-screen reward popup (level-up / new streak tier). The Kurmanji "Pîroz
  // be!" headline and the "Berdewam be" button stay in the screen; only the
  // eyebrow and the level detail are localized here.
  celebration: {
    levelUp: string;
    newStreakTier: string;
    reachedLevel: (n: number) => string;
  };
}
