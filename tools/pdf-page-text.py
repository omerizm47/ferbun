"""Extract printed pages of Thackston 2006 as plain text.

Called by tools/verify-citations.ts, and usable on its own while authoring:

  python tools/pdf-page-text.py docs/sources/thackston-sorani-grammar.pdf 207
  python tools/pdf-page-text.py <pdf> 171 181 207 --json

Printed page N is 1-based PDF index N + 8. The offset is applied here, so every
caller and every `src` locator in the data files speaks in printed numbers only.

Three things happen to the extracted text, and each of them can hide a word if
it is skipped:

  * the Arabic-script column is dropped, because the glossary sets the Sorani
    headword twice and only the Latin transcription is what the data stores;
  * the text is NFKC-normalised, so a ligature or a decomposed a-circumflex
    cannot fail to match the composed form a data file holds;
  * C1 control characters, U+0080 to U+009F, are replaced by a space. The
    glossary font maps a handful of glyph slots into that range, and they land
    between a headword and its gloss: printed p. 207 carries U+009E in
    "minâł <U+009E> child; ~âna ... childish". Left in, a terminal reads U+009E
    as a control introducer and swallows the rest of the line, so the page
    appears to say "minâł na" and an author copying that mis-glosses the word.

Exit codes: 0 fine, 2 no PDF, 3 no pymupdf, 4 a page outside the volume.
"""

import json
import os
import re
import sys
import unicodedata

OFFSET = 8

ARABIC = re.compile(
    r"[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF"
    r"\u200c-\u200f\u202a-\u202e]+"
)
C1 = re.compile(r"[\u0080-\u009F]")
RUNS = re.compile(r"[ \t]{2,}")


def clean(raw):
    out = unicodedata.normalize("NFKC", raw)
    out = ARABIC.sub(" ", out)
    out = C1.sub(" ", out)
    return RUNS.sub(" ", out)


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

    args = [a for a in sys.argv[1:]]
    as_json = "--json" in args
    args = [a for a in args if a != "--json"]

    if len(args) < 2:
        print(
            "usage: pdf-page-text.py <pdf-path> <printed-page> [more pages...] [--json]",
            file=sys.stderr,
        )
        return 2

    pdf = args[0]
    if not os.path.isfile(pdf):
        print(f"pdf-page-text: no PDF at {pdf}", file=sys.stderr)
        return 2

    try:
        import pymupdf
    except ImportError:
        try:
            import fitz as pymupdf
        except ImportError:
            print(
                "pdf-page-text: pymupdf is not installed for "
                f"{sys.executable}. Install it with: "
                f'"{sys.executable}" -m pip install pymupdf',
                file=sys.stderr,
            )
            return 3

    try:
        printed_pages = [int(a) for a in args[1:]]
    except ValueError:
        print(f"pdf-page-text: page numbers must be integers, got {args[1:]}", file=sys.stderr)
        return 2

    doc = pymupdf.open(pdf)
    pages = {}
    for printed in printed_pages:
        index = printed + OFFSET - 1
        if index < 0 or index >= doc.page_count:
            print(
                f"pdf-page-text: printed page {printed} is pdf index {index + 1}, "
                f"outside a {doc.page_count}-page file",
                file=sys.stderr,
            )
            return 4
        pages[str(printed)] = clean(doc[index].get_text())

    if as_json:
        print(json.dumps({"offset": OFFSET, "pageCount": doc.page_count, "pages": pages}, ensure_ascii=False))
        return 0

    for printed in printed_pages:
        print(f"===== PRINTED PAGE {printed} (pdf index {printed + OFFSET}) =====")
        print(pages[str(printed)])
    return 0


if __name__ == "__main__":
    sys.exit(main())
