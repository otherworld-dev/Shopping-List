# Translating Shopping List

Thanks for helping translate Shopping List for Nextcloud! 🌍

Everything is done in your browser on **Crowdin** — no coding, no Git, no files
to download.

👉 **[Open the project on Crowdin](https://crowdin.com/project/shopping-list-for-nextcloud)**

If your language isn't listed, request it on the Crowdin page. No GitHub account
needed — you can leave a **comment in Crowdin** any time to ask a question or
request a language (or open a [GitHub issue](https://github.com/otherworld-dev/Shopping-List/issues) if you prefer).

---

## What you'll be translating

There are three things in Crowdin. You don't have to do all three — anything you
skip simply stays in English.

> **What it looks like:** UI strings are simple one-line translations. Keywords
> and Parsing are **lists of words** — you'll see an English list and replace it
> with your own. You never edit braces, quotes, or anything that looks like code:
> just change the words and leave the structure alone.

### 1. UI strings
The app's buttons, menus, and messages (e.g. *"Add an item"*, *"Delete"*).
Ordinary sentence-for-sentence translation.

### 2. Keywords  ⭐ the important one
These are grocery words that tell the app **which shop area an item belongs to**,
so when someone types *"milk"* it goes under *Dairy* automatically.

The app simply checks whether one of your keywords appears **inside** what the
shopper typed. So *"milk"* matches *"oat milk"* and *"whole milk"*.

You'll see **one entry per shop area** (Produce, Dairy, Bakery, …), each showing
the English list. **Don't translate word-for-word — write your own list** of the
words people in your language really use, separated by commas or new lines.

A few rules keep it reliable:

- **All lowercase.**
- **Include singular *and* plural** if they differ (e.g. German `tomate` *and*
  `tomaten`) — the app doesn't change word endings for you.
- **Avoid 1–2 letter words** that hide inside other words — German `ei` (egg)
  also sits inside `eis`, `reis`, `fleisch`, so it would mis-match. Prefer the
  fuller word. (Longer, distinctive words always win, so they're safest.)
- **No commas inside a single keyword** — a comma starts a new keyword.
  Multi-word keywords like `red pepper flakes` are fine; just no commas in them.
- Feel free to **merge** synonyms, **add** local products, **remove** ones that
  don't apply, or **leave an area empty** (the *Other* area is empty on purpose).

You can submit at any time — even a partial list helps, and you or someone else
can extend it later. There's no need to fill every area.

### 3. Parsing
A short list of your language's **measurement words**, so quantities are
recognised when items are added:

- **Units** — your measurement words, e.g. `liter, l, gramm, g, esslöffel, el, …`
- **No-number units** — words used *without* a number: you say *"a **pinch** of
  salt"* or *"a **handful** of nuts"*, not *"3 pinch"*. List your equivalents
  (pinch, dash, handful, splash, …).
- **Connector word** — the little word in *"a pinch **of** salt"* (English `of`,
  German `von`).
- **Decimal mark** — which character(s) your language uses for decimals. You can
  list more than one — German, for example, accepts both `0,5` and `0.5`.

> You may also see a **"base form" (aliases)** section that links abbreviations to
> full words (e.g. `tsp` → `teaspoon`). **You can skip it** — it only fine-tunes
> how quantities combine, and a maintainer can fill it in. Just translate the
> word lists above.

---

## How it works (start to finish)

1. Open the [Crowdin project](https://crowdin.com/project/shopping-list-for-nextcloud)
   and choose your language.
2. Translate any of the three things above and **save**. That's all you do.
3. Your work is automatically sent to the project, and a maintainer includes it —
   you don't need to do anything else.
4. It ships in the next release. New shopping lists created by people using your
   language are then organised in their own language. ✨

> **Good to know:** the app won't automatically turn *"1 apple"* into *"2 apples"*
> in your language (that's an English-only nicety for now) — but everything you
> translate above works fully.

Questions? Leave a comment in Crowdin, or open a
[GitHub issue](https://github.com/otherworld-dev/Shopping-List/issues) — we're happy to help.
