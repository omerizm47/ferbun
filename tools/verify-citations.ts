// Fêrbûn: does the cited page actually carry the word?
//
// SRC-02 in the validator proves a locator is well formed and names a region
// this volume has. It never opens the book. This script does: for every Sorani
// entry it extracts the printed page named in `src` and requires the entry's
// `from`, Thackston's transcription verbatim, to appear on it.
//
// It is an authoring-time check, deliberately outside `npm run selfcheck`,
// because it needs the PDF and the PDF is not redistributable: docs/sources/ is
// gitignored, so a clean clone has no copy. `npm run selfcheck` must stay
// runnable there, and does.
//
// Self-contained, apart from an interpreter. Everything that can go wrong
// quietly lives in the repository: the printed-to-PDF page offset, the Arabic
// strip, the C1 scrub and the matching rules are all in this file and in
// tools/pdf-page-text.py, not in the scratch helper under %TEMP% this project
// used while the first sixteen entries were being read. A checker that stops
// working when %TEMP% is cleaned is a checker that stops being run. What the
// repository cannot carry is a 2 MB restricted PDF or a 60 MB virtualenv, so
// the interpreter is looked up in the environment, and every way that lookup
// can fail ends in a non-zero exit with the command that fixes it. There is no
// path through this file that reports success without having read a page.
//
// Three kinds of row have no page to read. A vocab theme whose labelOrigin is
// authored, because no headword in the glossary names the class it labels; a
// course, unit or lesson title whose titleOrigin is authored, because it is a
// phrase composed for this app out of headwords cited elsewhere; and a chrome
// slot whose origin is authored, on the same footing. Those are not counted as
// checked and not counted as failed. They are listed by name with their note and
// counted in the closing line, so a reader sees how many strings this script did
// not open the book for instead of assuming none.
//
// A story is the largest of those by far, and it is the reason this file grew a
// second kind of target. The prose itself is uncitable in the strongest sense:
// no page prints a sentence of it, so it goes in the skipped bucket with its
// word count and its note. But a story is not only prose. It declares the
// grammar sections it leans on and quotes the licensing sentence from each, and
// it declares every inflected form it uses; some of those forms Thackston prints
// himself. Both of those are page claims, so both are opened. A quoted sentence
// needs a matcher of its own, because a sentence runs over line breaks and a
// headword does not.
//
// A chrome slot has a fourth state the other two do not: pending, a slot left
// empty on purpose because the volume gives no word for it. There is no string
// to look for and none is claimed, but a pending slot is not nothing either, so
// it gets a bucket and a line of its own rather than being dropped. Cited,
// authored and pending together are every slot in the table, and the closing
// line adds them up, so no state is silently unchecked.
//
// Two entries in four print something other than their `from`, and both cases
// are handled by generating candidates mechanically rather than by hand:
//   * the furtive i (THK06:163). bâwk is printed bâwik, the i italicised. The
//     script inserts one i at each interior position and looks for the result.
//   * tilde sub-entries. binamâła is printed ~amâł(a) under the headword bin.
//     The script splits `from` at each position, asks the page for ~ plus the
//     remainder (also with a parenthesised final letter), and requires the
//     headword itself to be on the page too.
// Both rules confirm that the page carries a form differing from `from` by
// exactly one documented transformation. Neither can confirm the transformation
// is the right reading: italics do not survive text extraction, and nothing in
// the text layer says which headword a ~ belongs to. Those four are reported
// under their own heading, with the string found and the entry's own fromNote,
// so they are read by a human rather than passed over in a total.
//
// One `from` in the corpus carries an accent this script must not touch: the
// acute Thackston writes as a stress mark (pp. 3 and 4). It is stripped on
// conversion, in tools/thackston-latin.ts, and never on the way to the page,
// because the page prints it. bínûsa on p. 39 is the case to watch.

import { spawnSync } from 'child_process';
import { existsSync } from 'fs';
import { CKB_CHROME_SLOTS } from '../src/data/ckb/chrome';
import { CKB_TITLES, isCitedTitle } from '../src/data/ckb/courses';
import { CKB_STORIES } from '../src/data/ckb/stories';
import { CKB_VOCABULARY, CKB_VOCAB_THEMES, isCitedTheme } from '../src/data/ckb/vocabulary';

const PDF = 'docs/sources/thackston-sorani-grammar.pdf';
const EXTRACTOR = 'tools/pdf-page-text.py';

const SETUP = [
  'Set it up with a virtualenv that has pymupdf, then point this script at it:',
  '  python -m venv %TEMP%\\ferbun-pdf\\venv',
  '  %TEMP%\\ferbun-pdf\\venv\\Scripts\\python -m pip install pymupdf',
  '  $env:FERBUN_PDF_PYTHON = "$env:TEMP\\ferbun-pdf\\venv\\Scripts\\python.exe"',
  `The PDF itself is not in the repository and never will be: docs/sources/ is`,
  'gitignored because the volume restricts redistribution.',
].join('\n');

interface Target {
  id: string;
  from: string;
  fromNote?: string;
  taught: string;
  src: string;
  page: number;
}

/** A sentence a story quotes a grammar section for, and the page it claims prints it. */
interface QuoteTarget {
  id: string;
  text: string;
  src: string;
  page: number;
}

const PAGE_LOCATOR = /^THK06:(\d{1,3})$/;

function collectTargets(): {
  targets: Target[];
  rejected: string[];
  skipped: string[];
  pending: string[];
  quotes: QuoteTarget[];
} {
  const targets: Target[] = [];
  const rejected: string[] = [];
  const chromeRows = Object.entries(CKB_CHROME_SLOTS);
  // Theme labels, course-tree titles and chrome slots the data marks authored:
  // there is no page to open, because the label names a class no headword names,
  // or the title and the slot are composed for this app. They are listed and
  // counted, not dropped, so the total below is read against a stated number of
  // exemptions rather than against an assumption that everything was checked.
  // A story joins them for a stronger reason than any of those: no page prints a
  // sentence of it, and none is claimed to.
  const skipped = [
    ...CKB_VOCAB_THEMES.filter((t) => !isCitedTheme(t)).map(
      (t) => `vocab theme "${t.id}": labelKu ${t.labelKu} is authored, not cited. ${t.labelNote}`,
    ),
    ...CKB_TITLES.flatMap((t) =>
      isCitedTitle(t.origin) ? [] : [`${t.id}: titleKu ${t.titleKu} is authored, not cited. ${t.origin.titleNote}`],
    ),
    ...chromeRows.flatMap(([key, slot]) =>
      slot.origin === 'authored' ? [`chrome slot "${key}": ${slot.text} is authored, not cited. ${slot.note}`] : [],
    ),
    ...CKB_STORIES.map((story) => {
      const words = story.paragraphs.reduce((n, paragraph) => n + paragraph.length, 0);
      const witnessed = story.derivations.filter((d) => d.witness).length;
      return (
        `story "${story.id}": ${story.title}, ${story.paragraphs.length} paragraphs and ${words} taught words, ` +
        `is authored, not cited. Its checkable claims are opened below and are not part of this bucket: ` +
        `${story.sections.reduce((n, s) => n + s.quotes.length, 0)} quoted sentences across ` +
        `${story.sections.length} grammar sections, and ${witnessed} of its ${story.derivations.length} ` +
        `derivations name a form Thackston prints. ${story.note}`
      );
    }),
  ];
  // The third state, and the reason chrome needed one: a slot deliberately left
  // empty. Nothing is claimed of a page here, so nothing is opened, but the
  // decision is printed with its reason so a blank is read rather than assumed.
  const pending = chromeRows.flatMap(([key, slot]) =>
    slot.origin === 'pending' ? [`chrome slot "${key}": left empty. ${slot.reason}`] : [],
  );

  const rows = [
    ...CKB_VOCABULARY.map((w) => ({ id: w.id, from: w.from, fromNote: w.fromNote, taught: w.wordKu, src: w.src })),
    ...CKB_VOCAB_THEMES.filter(isCitedTheme).map((t) => ({
      id: `vocab theme "${t.id}"`,
      from: t.from,
      fromNote: t.fromNote,
      taught: t.labelKu,
      src: t.src,
    })),
    ...CKB_TITLES.flatMap((t) =>
      isCitedTitle(t.origin)
        ? [{ id: t.id, from: t.origin.from, fromNote: t.origin.fromNote, taught: t.titleKu, src: t.origin.src }]
        : [],
    ),
    ...chromeRows.flatMap(([key, slot]) =>
      slot.origin === 'cited'
        ? [{ id: `chrome slot "${key}"`, from: slot.from, fromNote: slot.fromNote, taught: slot.text, src: slot.src }]
        : [],
    ),
    // A derivation is composed, so most of them have no page. The few forms
    // Thackston does print say so in `witness`, and those are opened like any
    // other citation rather than taken on the note's word.
    ...CKB_STORIES.flatMap((story) =>
      story.derivations.flatMap((d) =>
        d.witness
          ? [{
              id: `story "${story.id}" derivation "${d.form}"`,
              from: d.witness.from,
              fromNote: d.witness.note,
              taught: d.form,
              src: d.witness.src,
            }]
          : [],
      ),
    ),
  ];

  // One quote per section per page, deduplicated on the pair, so two stories
  // leaning on § 15 do not have the same sentence looked for twice.
  const quotes: QuoteTarget[] = [];
  const seen = new Set<string>();
  for (const story of CKB_STORIES) {
    for (const section of story.sections) {
      for (const quote of section.quotes) {
        const key = `${quote.src}\u0000${quote.text}`;
        if (seen.has(key)) continue;
        seen.add(key);
        const page = PAGE_LOCATOR.exec(quote.src);
        if (!page) {
          rejected.push(
            `story "${story.id}" ${section.id}: src "${quote.src}" is not a single THK06 page, so there is no ` +
              'one page to read the quoted sentence on.',
          );
          continue;
        }
        quotes.push({
          id: `${section.id} "${section.title}"`,
          text: quote.text,
          src: quote.src,
          page: Number(page[1]),
        });
      }
    }
  }

  for (const row of rows) {
    const page = PAGE_LOCATOR.exec(row.src);
    if (!page) {
      rejected.push(`${row.id}: src "${row.src}" is not a single THK06 page, so there is no one page to read.`);
      continue;
    }
    targets.push({ ...row, page: Number(page[1]) });
  }

  return { targets, rejected, skipped, pending, quotes };
}

const LETTER = /\p{L}/u;

/** Substring, but not inside a longer word: bâwk must not be answered by bâwkî. */
function containsToken(page: string, token: string): boolean {
  let at = page.indexOf(token);
  while (at !== -1) {
    const before = at === 0 ? '' : page[at - 1];
    const after = page[at + token.length] ?? '';
    if (!LETTER.test(before) && !LETTER.test(after)) return true;
    at = page.indexOf(token, at + 1);
  }
  return false;
}

type Rule = 'verbatim' | 'furtive i' | 'tilde sub-entry';

interface Match {
  rule: Rule;
  printed: string;
  /** The headword a tilde sub-entry hangs under. Empty for the other rules. */
  under: string;
}

function findOnPage(page: string, from: string): Match | null {
  if (containsToken(page, from)) return { rule: 'verbatim', printed: from, under: '' };

  for (let i = 1; i < from.length; i += 1) {
    const candidate = `${from.slice(0, i)}i${from.slice(i)}`;
    if (containsToken(page, candidate)) return { rule: 'furtive i', printed: candidate, under: '' };
  }

  for (let k = 1; k < from.length; k += 1) {
    const head = from.slice(0, k);
    const tail = from.slice(k);
    if (!containsToken(page, head)) continue;
    const candidates = [`~${tail}`, `~${tail.slice(0, -1)}(${tail.slice(-1)})`];
    for (const candidate of candidates) {
      if (containsToken(page, candidate)) return { rule: 'tilde sub-entry', printed: candidate, under: head };
    }
  }

  return null;
}

/**
 * A quoted sentence cannot be found the way a headword is. It runs over line
 * breaks the extractor keeps, and the typesetter sometimes splits a word across
 * one ("indefinite singu-\nlar" at p. 10). Two readings are tried, and both are
 * named here rather than left in the matcher: whitespace collapsed to single
 * spaces, and the same again with a hyphen sitting immediately before a line
 * break removed. Nothing else is touched, no word is dropped and no character is
 * folded, so a sentence that appears under neither reading has not been found.
 */
function findQuote(page: string, text: string): 'verbatim' | 'dehyphenated' | null {
  const flatten = (s: string) => s.normalize('NFC').replace(/\s+/g, ' ').trim();
  const wanted = flatten(text);
  if (flatten(page).includes(wanted)) return 'verbatim';
  if (flatten(page.replace(/-\s*\n\s*/g, '')).includes(wanted)) return 'dehyphenated';
  return null;
}

interface Extraction {
  pages: Record<string, string>;
  interpreter: string;
  pageCount: number;
}

function extract(pages: number[]): Extraction | string {
  const tempRoot = process.env.TEMP ?? process.env.TMPDIR ?? '/tmp';
  const venv =
    process.platform === 'win32'
      ? `${tempRoot}\\ferbun-pdf\\venv\\Scripts\\python.exe`
      : `${tempRoot}/ferbun-pdf/venv/bin/python`;
  const candidates = [process.env.FERBUN_PDF_PYTHON, existsSync(venv) ? venv : undefined, 'python', 'python3'].filter(
    (c): c is string => typeof c === 'string' && c !== '',
  );

  const args = [EXTRACTOR, PDF, ...pages.map((p) => String(p)), '--json'];
  const tried: string[] = [];

  for (const interpreter of candidates) {
    const run = spawnSync(interpreter, args, { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 });
    if (run.error || run.status === null) {
      tried.push(`${interpreter}: could not be run (${run.error ? run.error.message : 'no exit status'})`);
      continue;
    }
    if (run.status === 3) {
      tried.push(`${interpreter}: ${run.stderr.trim()}`);
      continue;
    }
    if (run.status !== 0) {
      return `${interpreter} exited ${run.status}:\n${run.stderr.trim()}`;
    }
    const parsed = JSON.parse(run.stdout) as { pages: Record<string, string>; pageCount: number };
    return { pages: parsed.pages, pageCount: parsed.pageCount, interpreter };
  }

  return `no Python with pymupdf was found. Tried:\n  ${tried.join('\n  ')}\n${SETUP}`;
}

function run(): number {
  const { targets, rejected, skipped, pending, quotes } = collectTargets();

  if (targets.length === 0) {
    console.error('verify-citations: no Sorani entry carries a single-page THK06 citation. Nothing was checked.');
    for (const line of rejected) console.error(`  ${line}`);
    return 1;
  }

  if (!existsSync(PDF)) {
    console.error(`verify-citations: no PDF at ${PDF}, so no citation could be checked.\n${SETUP}`);
    return 2;
  }
  if (!existsSync(EXTRACTOR)) {
    console.error(`verify-citations: the extractor ${EXTRACTOR} is missing from the repository.`);
    return 2;
  }

  const wanted = [...new Set([...targets.map((t) => t.page), ...quotes.map((q) => q.page)])].sort((a, b) => a - b);
  const extraction = extract(wanted);
  if (typeof extraction === 'string') {
    console.error(`verify-citations: ${extraction}`);
    return 3;
  }

  console.log(`verify-citations: ${PDF}, ${extraction.pageCount} pdf pages, read with ${extraction.interpreter}`);
  console.log(`  ${wanted.length} printed pages extracted: ${wanted.join(', ')}`);

  const failures: string[] = [];
  const judgement: string[] = [];
  let verbatim = 0;
  let checked = 0;
  let quotesChecked = 0;
  let quotesDehyphenated = 0;

  for (const target of targets) {
    const page = extraction.pages[String(target.page)];
    if (typeof page !== 'string' || page.trim() === '') {
      failures.push(`${target.id}: printed page ${target.page} came back empty, so nothing was checked against it.`);
      continue;
    }

    const found = findOnPage(page.normalize('NFC'), target.from.normalize('NFC'));
    checked += 1;

    if (!found) {
      failures.push(
        `${target.id}: "${target.from}" (taught as ${target.taught}) is not on printed page ${target.page}, ` +
          'neither verbatim nor under the furtive-i or tilde-sub-entry rules. Read the page.',
      );
      continue;
    }

    if (found.rule === 'verbatim') {
      verbatim += 1;
      console.log(`  ok    ${target.id} p${target.page} prints "${found.printed}" (taught as ${target.taught})`);
      continue;
    }

    if (!target.fromNote) {
      failures.push(
        `${target.id}: p${target.page} does not print "${target.from}". It prints "${found.printed}", ` +
          `which the ${found.rule} rule accepts, but the entry has no fromNote saying so. Add one or fix the form.`,
      );
      continue;
    }

    judgement.push(
      `  ${target.id} p${target.page}: from "${target.from}", printed "${found.printed}"` +
        `${found.under ? ` under headword "${found.under}"` : ''} [${found.rule}]\n` +
        `      fromNote: ${target.fromNote}`,
    );
  }

  if (rejected.length > 0) {
    console.log('\nnot checked, no single page to read:');
    for (const line of rejected) console.log(`  ${line}`);
    failures.push(...rejected);
  }

  // The second kind of claim a story makes: not a word on a page, a sentence on
  // one. It is checked last because it is the claim a reader is least able to
  // audit by eye, the section numbers and page numbers being easy to transpose.
  for (const quote of quotes) {
    const page = extraction.pages[String(quote.page)];
    if (typeof page !== 'string' || page.trim() === '') {
      failures.push(`${quote.id}: printed page ${quote.page} came back empty, so its quoted sentence was not checked.`);
      continue;
    }
    quotesChecked += 1;
    const found = findQuote(page, quote.text);
    if (!found) {
      failures.push(
        `${quote.id}: p${quote.page} does not carry the sentence the story quotes it for. Read the page.\n` +
          `      quoted: ${quote.text}`,
      );
      continue;
    }
    if (found === 'dehyphenated') quotesDehyphenated += 1;
    console.log(
      `  ok    ${quote.id} p${quote.page} carries its quoted sentence` +
        `${found === 'dehyphenated' ? ', across a word the typesetter hyphenated over a line break' : ''}`,
    );
  }

  if (skipped.length > 0) {
    console.log(`\nskipped, ${skipped.length} authored string(s). No page claims these, so none was opened:`);
    for (const line of skipped) console.log(`  ${line}`);
  }

  if (pending.length > 0) {
    console.log(`\npending, ${pending.length} chrome slot(s) left empty on purpose. Nothing is claimed and nothing was opened:`);
    for (const line of pending) console.log(`  ${line}`);
  }

  if (judgement.length > 0) {
    console.log(
      '\nmatched under a rule, so the reading is a human\u2019s and not this script\u2019s.\n' +
        'Extraction drops italics, and no ~ says which headword it hangs under:',
    );
    for (const line of judgement) console.log(line);
  }

  if (checked !== targets.length) {
    console.error(`\nverify-citations: checked ${checked} of ${targets.length} entries. A page failed to extract.`);
    return 1;
  }

  if (quotesChecked !== quotes.length) {
    console.error(
      `\nverify-citations: read ${quotesChecked} of ${quotes.length} quoted sentences. A page failed to extract.`,
    );
    return 1;
  }

  if (failures.length > 0) {
    console.error(`\nverify-citations: ${failures.length} of ${targets.length + quotes.length} claims failed.`);
    for (const line of failures) console.error(`  ${line}`);
    return 1;
  }

  console.log(
    `\nverify-citations: ${checked} of ${targets.length} entries found on their cited page ` +
      `(${verbatim} printed verbatim, ${judgement.length} matched under a rule a human's fromNote licenses), ` +
      `${quotesChecked} grammar-section sentence(s) found on the page quoting them ` +
      `(${quotesDehyphenated} across a hyphenated line break), ` +
      `${skipped.length} authored string(s) skipped as uncitable, ${pending.length} chrome slot(s) pending. ` +
      `${targets.length + quotes.length + skipped.length + pending.length} claims accounted for, none silently unchecked.`,
  );
  return 0;
}

process.exitCode = run();
