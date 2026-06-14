# Translating shop-area keywords

Each entry is **one shop area** (Produce, Dairy, …). The value is a free list of
words, separated by commas or new lines, used to **auto-detect** which area an
item belongs to when someone adds it.

You are **curating, not translating word-for-word.** Rewrite each area's list in
your language however fits best:

- **Collapse** synonyms that mean the same thing (English `courgette` + `zucchini`
  → just one word in your language).
- **Expand** when your language needs several forms (compounds, articles, regional
  names) — add as many as you like.
- **Add** common local products; **remove** ones that don't apply; leave an area
  empty if nothing fits.

Three rules that keep matching reliable:

1. **All lowercase.**
2. **Include singular *and* plural** if they differ — there is no automatic
   stemming (e.g. German needs both `tomate` and `tomaten`).
3. **Avoid very short words** (1–2 letters) that appear inside unrelated words —
   e.g. German `ei` (egg) also sits inside `eis`, `fleisch`, `reis`. Prefer the
   fuller form. Matching ignores accents and is case-insensitive, and the most
   specific (longest) matching word wins, so longer, distinctive words are safest.
4. **No commas inside a single keyword.** Commas (and new lines) separate
   keywords, so a comma splits one keyword into two. Multi-word keywords are
   fine (e.g. `red pepper flakes`) — just don't put commas inside them.

The **Parsing** file is small: list your language's measurement units (e.g.
`esslöffel, el, liter, …`), units that appear without a number (a *pinch* / *dash*
equivalent), any connector word like English `of`, and your decimal mark (`,` or `.`).
