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

import { spawnSync } from 'child_process';
import { existsSync } from 'fs';
import { CKB_VOCABULARY, CKB_VOCAB_THEMES } from '../src/data/ckb/vocabulary';

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

const PAGE_LOCATOR = /^THK06:(\d{1,3})$/;

function collectTargets(): { targets: Target[]; rejected: string[] } {
  const targets: Target[] = [];
  const rejected: string[] = [];

  const rows = [
    ...CKB_VOCABULARY.map((w) => ({ id: w.id, from: w.from, fromNote: w.fromNote, taught: w.wordKu, src: w.src })),
    ...CKB_VOCAB_THEMES.map((t) => ({
      id: `vocab theme "${t.id}"`,
      from: t.from,
      fromNote: t.fromNote,
      taught: t.labelKu,
      src: t.src,
    })),
  ];

  for (const row of rows) {
    const page = PAGE_LOCATOR.exec(row.src);
    if (!page) {
      rejected.push(`${row.id}: src "${row.src}" is not a single THK06 page, so there is no one page to read.`);
      continue;
    }
    targets.push({ ...row, page: Number(page[1]) });
  }

  return { targets, rejected };
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
  const { targets, rejected } = collectTargets();

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

  const wanted = [...new Set(targets.map((t) => t.page))].sort((a, b) => a - b);
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

  if (failures.length > 0) {
    console.error(`\nverify-citations: ${failures.length} of ${targets.length} entries failed.`);
    for (const line of failures) console.error(`  ${line}`);
    return 1;
  }

  console.log(
    `\nverify-citations: ${checked} of ${targets.length} entries found on their cited page ` +
      `(${verbatim} printed verbatim, ${judgement.length} matched under a rule a human's fromNote licenses).`,
  );
  return 0;
}

process.exitCode = run();
