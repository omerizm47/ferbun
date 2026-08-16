// Fêrbûn: Sorani education and work vocabulary, the fifteenth authored Sorani
// theme.
// Source: Thackston, W. M., "Sorani Kurdish: A Reference Grammar with Selected
// Readings", declared as THK06 in src/data/sources.ts. Every `src` names the
// Kurdish-English glossary page carrying that headword and its English gloss.
// Provenance, spelling and review status are exactly as ./family.ts states
// them, and the claim also ships as CKB_GLOSS_PROVENANCE in ../vocabulary.ts.
//
// The Kurmanji education theme fills ten slots (v220 to v229). Nine are filled
// here. The one that is not is listed below with what was rejected for it, so a
// gap reads as a decision.
//
// ONE SLOT LEFT EMPTY:
//  - newspaper (Kurmanji rojname): the word is in the volume, as the sub-entry
//    ~nâma under rozh "day" at p. 221, and the page breaks it across a line:
//    the last line of the column reads "~nâ-" and the next begins "ma". No page
//    prints the string rozhnâma, so neither the verbatim rule nor the tilde
//    rule in tools/verify-citations.ts can confirm it, and the same page's
//    ~nâmanûs "journalist", which is printed whole, is a different word. This
//    is the failure verbs.ts records for pyâsa and khwen|din, in a third shape:
//    the form is there, the printing is not.
//
// THREE CHOICES BETWEEN RIVAL HEADWORDS. Thackston glosses more than one word
// with the sense a slot wants and says nothing about which a beginner should
// meet first. Each pick is editorial and each needs a speaker's confirmation:
//  - student: qutâbî (p. 218, "~î student") over tałaba (p. 229, "student"),
//    ktâwî (p. 202, "~î student" under ktâw "book") and faqe (p. 183,
//    "student", the religious student of a mosque school). tałaba is the
//    cleanest citation of the four, a bare headword printed whole, and it is
//    the Arabic plural talaba used for seminary students. qutâbî is picked
//    because ./places.ts already teaches this page's ~khâna, qutâbkhâna
//    "school", so the school and the pupil in it come off one entry.
//  - book: partuk (p. 213, a bare "book") over qutâb (p. 218, "book"), ktâw
//    (p. 202, "book") and kteb (p. 210, which is glossed only inside dâ-nân,
//    "ktebèkî dânâwa he has written a book"). partuk is the Kurmanji slot's own
//    pirtûk and the only one of the four with no second job on its page.
//  - work: kâr (p. 195) over îsh (p. 192, "work, labor, deed"). kâr is the
//    Kurmanji slot's own kar. îsh would have been the fuller gloss of the two.
//
// TWO TILDE SUB-ENTRIES, qutâbî and zânistga, each naming its base in a
// `fromNote`. The text layer says which characters are printed, never which
// headword a ~ belongs to, so each note also names the other tildes on that
// page a reader could mistake it for.
//
// ONE TRIMMED GLOSS, recorded rather than smoothed over: kâr (p. 195) is "work,
// thing (intangible): nâtwânîn am kârá bikayn we can't do this thing". Only the
// first sense is taught. The Turkish iş carries both, which is why it is reused
// from the Kurmanji slot unchanged.
//
// TWO GLOSSES THIS FILE FOLLOWS RATHER THAN THE KURMANJI SLOT: zimân is "tongue,
// language", so it teaches the organ as well as the speech, and Turkish dil is
// the same two things in one word. khabât is "struggle" alone, so the Kurmanji
// xebat's çalışma is dropped and only mücadele is kept.
//
// The furtive i is not in play. Every headword and sub-entry below was read span
// by span off the page rather than out of the extracted text, which drops
// italics, and each is a single upright Times-Bold span with no italic letter
// inside it. zimân, partuk, qutâbî and ~istga were the ones worth checking, each
// with an interior cluster where a furtive i would go.
//
// No `gender` and no `exampleKu`, for the reasons ./family.ts gives.

import type { SoraniVocabWord } from '../vocabulary';

export const CKB_EDUCATION: SoraniVocabWord[] = [
  { id: 'ckb-v223', wordKu: 'mamosta', wordEn: 'teacher', wordTr: 'öğretmen', partOfSpeech: 'noun', theme: 'education', src: 'THK06:206', from: 'mâmostâ' },
  {
    id: 'ckb-v224', wordKu: 'qutabî', wordEn: 'student', wordTr: 'öğrenci', partOfSpeech: 'noun', theme: 'education', src: 'THK06:218',
    from: 'qutâbî',
    fromNote: 'p. 218 prints this as the tilde sub-entry ~î under the headword qutâb, "book". The only other ~î on that page is ~î-kirdin under bân, "sir, sire".',
  },
  { id: 'ckb-v225', wordKu: 'ders', wordEn: 'lesson', wordTr: 'ders', partOfSpeech: 'noun', theme: 'education', src: 'THK06:178', from: 'dars' },
  { id: 'ckb-v226', wordKu: 'ziman', wordEn: 'tongue, language', wordTr: 'dil', partOfSpeech: 'noun', theme: 'education', src: 'THK06:239', from: 'zimân' },
  { id: 'ckb-v227', wordKu: 'kar', wordEn: 'work', wordTr: 'iş', partOfSpeech: 'noun', theme: 'education', src: 'THK06:195', from: 'kâr' },
  // wordTr narrowed from the Kurmanji 'çalışma, mücadele': Thackston glosses
  // this one "struggle" and nothing else.
  { id: 'ckb-v228', wordKu: 'xebat', wordEn: 'struggle', wordTr: 'mücadele', partOfSpeech: 'noun', theme: 'education', src: 'THK06:195', from: 'khabât' },
  { id: 'ckb-v229', wordKu: 'pertuk', wordEn: 'book', wordTr: 'kitap', partOfSpeech: 'noun', theme: 'education', src: 'THK06:213', from: 'partuk' },
  { id: 'ckb-v230', wordKu: 'govar', wordEn: 'magazine, journal', wordTr: 'dergi', partOfSpeech: 'noun', theme: 'education', src: 'THK06:187', from: 'govâr' },
  {
    id: 'ckb-v231', wordKu: 'zanistge', wordEn: 'university', wordTr: 'üniversite', partOfSpeech: 'noun', theme: 'education', src: 'THK06:238',
    from: 'zânistga',
    fromNote: 'p. 238 prints this as the tilde sub-entry ~istga under the headword zân|â "learned", whose bar marks zân as the base, and sets two spellings on one line separated by a comma, "~istga, ~istgâ", with the one gloss "university" on them both. This entry cites the first, which is the one printed unbroken. The rest of that entry runs ~ist "knowledge, learning", ~istî "teaching, instruction", ~în "to know", ~rân, ~râw, ~yâr "learned, erudite" and ~yârî "knowledge, education", which is this theme\'s label in ../vocabulary.ts.',
  },
];
