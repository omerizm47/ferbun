// Fêrbûn — the orthography adopted for the Sorani track.
// Bound to Thackston p. 88, "Conversion Table for the Sorani and Kurmanji
// Alphabets": his table maps Sorani onto the Latin alphabet Kurmanji already
// uses, so the Sorani track needs no character outside the 31 Hawar letters.
// Conformance here is a legality check only — it says a string is spelled with
// characters this alphabet has. Meaning, idiom and register still need a native
// speaker.

export interface OrthographySpec {
  id: string;
  label: string;
  letters: string[];
  lettersUpper: string[];
  digraphs: string[];
  punctuation: string[];
  allowDigits: boolean;
  normalForm: 'NFC';
  losses: { what: string; src: string }[];
}

export const SORANI_LATIN: OrthographySpec = {
  id: 'ckb-latn',
  label: 'Sorani in the Kurmanji Latin alphabet (Thackston p. 88)',
  // Accented letters are escaped so a lookalike cannot be pasted in unnoticed.
  // Excluded lookalikes: ı U+0131, İ U+0130, ș U+0219, ł U+0142, ř U+0159, and
  // every combining mark U+0300 to U+036F.
  letters: [
    'a', 'b', 'c', '\u00E7', 'd', 'e', '\u00EA', 'f', 'g', 'h', 'i', '\u00EE',
    'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', '\u015F', 't', 'u',
    '\u00FB', 'v', 'w', 'x', 'y', 'z',
  ],
  lettersUpper: [
    'A', 'B', 'C', '\u00C7', 'D', 'E', '\u00CA', 'F', 'G', 'H', 'I', '\u00CE',
    'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', '\u015E', 'T', 'U',
    '\u00DB', 'V', 'W', 'X', 'Y', 'Z',
  ],
  // ş/Ş are U+015F/U+015E, cedilla, not U+0219/U+0218 comma below.
  // Two letters on disk, one phoneme each: ll is Thackston's ł and rr is his ř
  // (p. 88). Nothing in this codebase may fold them to l and r.
  digraphs: ['ll', 'rr'],
  // Hyphen, parentheses and digits are attested in the running Sorani sample at
  // p. 89 (11-î adarî 1970, (cêgirî berrêz); `_` carries the existing fill-blank
  // slot style; the apostrophe is deliberately absent because Thackston's table
  // marks ayn as "not indicated". Typographic dashes and curly quotes excluded.
  punctuation: [' ', '.', ',', '!', '?', ':', ';', '-', '(', ')', '"', '_'],
  allowDigits: true,
  normalForm: 'NFC',
  losses: [
    {
      what: 'Voiceless kh [x] and voiced gh [ɣ] both map to x, so that contrast is not written.',
      src: 'THK06:88',
    },
    {
      what: 'Ayn is "not indicated" in this alphabet, so it is absent from the Latin form.',
      src: 'THK06:88',
    },
  ],
};

// Minimal pairs from Thackston p. 2, converted through his p. 88 table. These
// are the evidence for the no-fold rule and double as legality fixtures.
// Residual ambiguity, recorded rather than solved: ll and rr cannot be told
// apart from a genuine doubled l or r, and p. 4 notes Kurdish has very few
// doubled consonants (the example is shâłłâ 'God willing'). No mechanical rule
// resolves the reading, so it is a speaker-review item, not a validator rule.
export const DIGRAPH_MINIMAL_PAIRS = [
  { plain: 'xor', digraph: 'xorr', gloss: 'sun / blood', src: 'THK06:2' },
  { plain: 'ber', digraph: 'berr', gloss: 'breast / rug', src: 'THK06:2' },
  { plain: 'gul', digraph: 'gull', gloss: 'leper / flower', src: 'THK06:2' },
  { plain: '\u00E7il', digraph: '\u00E7ill', gloss: 'forty / stalk', src: 'THK06:2' },
];

/**
 * Reports at most one orthography issue per string: a non-NFC string trips
 * ORTH-02 and nothing else, otherwise the first illegal character trips ORTH-01.
 * Never rewrites the input and never collapses runs, so digraphs pass untouched.
 */
export function checkOrthography(
  text: string,
  spec: OrthographySpec,
): { code: 'ORTH-01' | 'ORTH-02'; detail: string }[] {
  const issues: { code: 'ORTH-01' | 'ORTH-02'; detail: string }[] = [];

  if (text.normalize('NFC') !== text) {
    issues.push({ code: 'ORTH-02', detail: 'string is not in Unicode NFC, store the precomposed form' });
    return issues;
  }

  const legal = new Set([...spec.letters, ...spec.lettersUpper, ...spec.punctuation]);
  const nfc = text.normalize('NFC');
  let i = 0;
  for (const ch of nfc) {
    const allowed = legal.has(ch) || (spec.allowDigits && ch >= '0' && ch <= '9');
    if (!allowed) {
      const hex = (ch.codePointAt(0) ?? 0).toString(16).toUpperCase().padStart(4, '0');
      issues.push({
        code: 'ORTH-01',
        detail: `character "${ch}" (U+${hex}) at index ${i} is outside the ${spec.label} inventory`,
      });
      break;
    }
    i += ch.length;
  }

  return issues;
}
