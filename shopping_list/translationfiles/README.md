# Translating Nextcloud Shopping List

Thank you for your interest in translating the Shopping List app!

## How to Contribute

Translations are managed on [Crowdin](https://crowdin.com/project/shopping-list-for-nextcloud). Please visit the project there to contribute translations for your language.

There are two things to translate on Crowdin:

1. **UI strings** — the app's buttons, labels, and messages (gettext `.po`).
2. **Keywords** — free lists of grocery words per shop area, used to auto-detect
   which area an item belongs to. Curate native words; don't translate 1:1.

Parsing packs (`resources/parsing/*.json` — measurement units, etc.) are technical
data and are **not** on Crowdin; they're contributed in-repo via PR, with an
English fallback for any language without one.

See `resources/keywords/CONTEXT.md` for keyword guidelines.

## File Structure

```
shopping_list/
├── translationfiles/
│   ├── templates/shopping_list.pot   # UI source template (do not edit manually)
│   ├── de/shopping_list.po           # UI translation (example)
│   └── README.md
├── resources/
│   ├── keywords/{en,de}.json         # Keyword packs (source: en.json)
│   └── parsing/{en,de}.json          # Parsing packs (source: en.json)
├── l10n/
│   ├── de.js                         # Auto-generated from .po files
│   └── de.json                       # Auto-generated from .po files
```

## For Developers

- All user-facing strings should be wrapped in `t('shopping_list', '...')` in Vue/TypeScript files.
- The `.pot` file is regenerated when strings change; run `npm run l10n` to compile `.po` → `l10n/`.
- Validate keyword/parsing packs before merging a translation PR: `npm run keywords:validate`.
- The `l10n/` directory contains the compiled UI translations used at runtime — do not edit by hand.
- Keyword packs (`resources/keywords/*.json`) are read by the PHP seeder at runtime; parsing packs are bundled into the frontend at build time.
