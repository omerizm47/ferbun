// Fêrbûn: Sorani emotions and states vocabulary, the thirteenth authored Sorani
// theme.
// Source: Thackston, W. M., "Sorani Kurdish: A Reference Grammar with Selected
// Readings", declared as THK06 in src/data/sources.ts. Every `src` names the
// Kurdish-English glossary page carrying that headword and its English gloss.
// Provenance, spelling and review status are exactly as ./family.ts states
// them, and the claim also ships as CKB_GLOSS_PROVENANCE in ../vocabulary.ts.
//
// The Kurmanji emotions theme fills fourteen slots (v195 to v208). Twelve are
// filled here. The two that are not are listed below with what was rejected for
// each, so a gap reads as a decision.
//
// This is the theme where a compound is easiest to reach for and hardest to
// justify. Emotion words are abstract, and Kurdish builds most of them out of a
// noun plus an adjective or a verb, so a slot with no headword can always be
// filled by welding two headwords together and pointing at both pages. Nothing
// here is welded. Where the volume prints no single unit for a sense, the slot
// is left open, on the same rule that kept the phrases out of ./greetings.ts.
//
// TWO SLOTS LEFT EMPTY:
//  - glad, happy (Kurmanji dilşa): no headword in the volume is glossed "glad".
//    The word occurs once in the whole book, inside a worked example under khosh
//    at p. 199, "pem khosh bû hâtî I'm glad you came", where it translates a
//    construction rather than a word. The Kurmanji dilşa is dil plus şa, and the
//    Sorani that would match it letter for letter, diłshâd, is not printed: p.
//    181 hangs eleven sub-entries on dił and none of them is it. Building it out
//    of dił (p. 181) and shâd (p. 226) would be an authored compound wearing two
//    citations, which is the one thing this theme must not ship. Nor is there a
//    third happiness word to stand in: khoshdamâkh (p. 199, "happy, in a good
//    mood"), pîroz (p. 216, "happy, blessed, auspicious") and poshta (p. 216,
//    "chic; happy") each open on the word two cards in this file already open
//    on, and the theme does not need a third.
//  - thirsty (Kurmanji tî): p. 233 prints the headword as tîn|û, the bar
//    dividing the word, so no page in the volume prints the string tînû. That is
//    the khwen|din problem of ./verbs.ts exactly, and neither the verbatim rule
//    nor the tilde rule in tools/verify-citations.ts can confirm a form the page
//    breaks in half: the two tildes the entry does print, ~ma and ~wetî, spell
//    out its inflected forms and not the headword. tîn on its own is a different
//    headword three lines above, "power, force". The only other thirst in the
//    book is inside khwenkhwâ at p. 200, "bloodthirsty", which is not the sense.
//
// THE SILENT SLOT IS FILLED ON A THIRD SENSE, which is worth saying out loud.
// bedang is the Kurmanji slot's own word and Thackston does print it, but he
// prints it as "be~" under dang (p. 177, "sound, voice; vote"), with the tilde
// standing for the headword after a prefix instead of opening the string. The
// tilde rule in tools/verify-citations.ts matches only a tilde that opens a
// sub-entry, so bedang cannot be confirmed, exactly as "to get up" could not be
// in ./verbs.ts. That leaves khâmosh (p. 197), whose "silent" comes third behind
// "quiet, peaceful"; kip (p. 201, "deaf; silent"), whose first sense is deafness
// and whose sub-entry ~ u kař is glossed "deaf" again; and mât (p. 206), an
// entry that runs "silent; stunned into silence; grief-stricken; shorter than
// others". khâmosh was taken, and its whole gloss is taught rather than the
// third of it the slot asked for, which is why its wordEn reads "quiet,
// peaceful; silent".
//
// SIX CHOICES BETWEEN RIVAL HEADWORDS. Thackston glosses more than one word with
// the sense the slot wants and says nothing about which a beginner should meet
// first. Each pick is editorial and each needs a speaker's confirmation:
//  - happy (v195): khoshḥâl (p. 199, "happy, pleased") over khoshdamâkh on the
//    line directly above it, "happy, in a good mood", and pîroz (p. 216, "happy,
//    blessed, auspicious"). khoshḥâl is the only one of the three that adds
//    nothing to the slot beyond it.
//  - sad: khamgîn (p. 196, "sorrowful, sad") over its neighbours khamnâk, a bare
//    "sad", and khamgirtû, "grieving, sad". All three hang off the same headword
//    kham, "worry, sorrow". khamnâk has the cleaner gloss and khamgîn has the
//    form: it converts to xemgîn, exactly the Kurmanji slot's word, which is the
//    reason ./food.ts took mewa. That is the whole of the argument, and a
//    speaker may well prefer khamnâk.
//  - angry: tûřa (p. 234, "angry, mad") over zawîr (p. 238), zwer (p. 240) and
//    zîz (p. 239, "unhappy, angry"). The first three are all glossed with the
//    bare adjective; tûřa was taken because it is the one the page builds on,
//    with a sub-entry ~î "anger" and a worked example, the reason
//    ./description.ts took sûr.
//  - love: awîn (p. 165, a bare "love") over ashq (p. 164, "love"). awîn is the
//    Kurmanji slot's own form, evîn.
//  - hope: hîwâ (p. 192, "hope") over humed on the same page and umed (p. 234),
//    both glossed "hope". hîwâ is the Kurmanji slot's own form, hêvî, and the
//    one the page builds sub-entries on.
//  - suffering: charmasare (p. 174, "suffering, hardship") over ranj (p. 219,
//    "pain, suffering"). ranj is the commoner word and the more natural card,
//    and it was still put down: dard (p. 178) is this file's "pain, trouble",
//    and a second card opening on "pain" would give one English prompt two right
//    answers inside one theme. charmasare leads with the sense the slot asks for
//    and collides with nothing.
//
// TWO ENTRIES ARE TILDE SUB-ENTRIES, and each names its base in a `fromNote`:
// the text layer says which characters are printed, never which headword a ~
// belongs to. Both shapes happen to be unique on their page, and the notes say
// so, because that is the thing a reader would otherwise have to check.
//
// The furtive i is not in play. Every headword and sub-entry below was read span
// by span off the page rather than out of the extracted text, which drops
// italics, and each is a single upright Times-Bold span with no italic letter
// inside it. birsî, tirs, khamgîn, khoshḥâl and charmasare were the ones worth
// checking, each with an interior cluster where a furtive i would go.
//
// No `gender` and no `exampleKu`, for the reasons ./family.ts gives.

import type { SoraniVocabWord } from '../vocabulary';

export const CKB_EMOTIONS: SoraniVocabWord[] = [
  // wordTr widened from the Kurmanji 'mutlu' for the pleased half of the gloss.
  { id: 'ckb-v199', wordKu: 'xoşhal', wordEn: 'happy, pleased', wordTr: 'mutlu, memnun', partOfSpeech: 'adj', theme: 'emotions', src: 'THK06:199', from: 'khoshḥâl' },
  // wordTr widened from the Kurmanji 'üzgün' for the sorrowful half.
  {
    id: 'ckb-v200', wordKu: 'xemgîn', wordEn: 'sorrowful, sad', wordTr: 'kederli, üzgün', partOfSpeech: 'adj', theme: 'emotions', src: 'THK06:196',
    from: 'khamgîn',
    fromNote: 'p. 196 prints this as the tilde sub-entry ~gîn under the headword kham, "worry, sorrow", and it is the only ~gîn on that page.',
  },
  {
    id: 'ckb-v201', wordKu: 'birsî', wordEn: 'hungry', wordTr: 'aç', partOfSpeech: 'adj', theme: 'emotions', src: 'THK06:172',
    from: 'birsî',
    fromNote: 'p. 172 prints this as the tilde sub-entry ~î under birs|ân "hunger", whose bar marks birs as the base, and it is the only ~î on that page. The page does print birsî whole, but inside the entry\'s own example, "birsîma I\'m hungry".',
  },
  { id: 'ckb-v202', wordKu: 'mandû', wordEn: 'tired', wordTr: 'yorgun', partOfSpeech: 'adj', theme: 'emotions', src: 'THK06:206', from: 'mândû' },
  { id: 'ckb-v203', wordKu: 'tûrre', wordEn: 'angry, mad', wordTr: 'kızgın, öfkeli', partOfSpeech: 'adj', theme: 'emotions', src: 'THK06:234', from: 'tûřa' },
  // wordTr translates Thackston rather than reusing the Kurmanji 'sessiz': his
  // gloss leads with the calm and reaches the silence last, and a card that
  // dropped the first two senses would teach a narrower word than the page does.
  { id: 'ckb-v204', wordKu: 'xamoş', wordEn: 'quiet, peaceful; silent', wordTr: 'sakin, huzurlu; sessiz', partOfSpeech: 'adj', theme: 'emotions', src: 'THK06:197', from: 'khâmosh' },
  { id: 'ckb-v205', wordKu: 'ewîn', wordEn: 'love', wordTr: 'aşk, sevgi', partOfSpeech: 'noun', theme: 'emotions', src: 'THK06:165', from: 'awîn' },
  { id: 'ckb-v206', wordKu: 'tirs', wordEn: 'fear', wordTr: 'korku', partOfSpeech: 'noun', theme: 'emotions', src: 'THK06:233', from: 'tirs' },
  { id: 'ckb-v207', wordKu: 'hîwa', wordEn: 'hope', wordTr: 'umut', partOfSpeech: 'noun', theme: 'emotions', src: 'THK06:192', from: 'hîwâ' },
  { id: 'ckb-v208', wordKu: 'derd', wordEn: 'pain, trouble', wordTr: 'dert, sıkıntı', partOfSpeech: 'noun', theme: 'emotions', src: 'THK06:178', from: 'dard' },
  // wordTr translates Thackston rather than reusing the Kurmanji 'ıstırap,
  // dert': his second sense is hardship, which dert does not carry.
  { id: 'ckb-v209', wordKu: 'çermeserê', wordEn: 'suffering, hardship', wordTr: 'ıstırap, zorluk', partOfSpeech: 'noun', theme: 'emotions', src: 'THK06:174', from: 'charmasare' },
  // wordTr trimmed from the Kurmanji 'mutlu, sevinçli': shâd is glossed "happy"
  // alone, and the joy sits on its sub-entry ~î, not here.
  { id: 'ckb-v210', wordKu: 'şad', wordEn: 'happy', wordTr: 'mutlu', partOfSpeech: 'adj', theme: 'emotions', src: 'THK06:226', from: 'shâd' },
];
