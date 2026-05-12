# Translating Nextcloud Shopping List

Thank you for your interest in translating the Shopping List app!

## How to Contribute

Translations are managed on [Weblate](https://hosted.weblate.org). Please visit the project there to contribute translations for your language.

## File Structure

```
shopping_list/
├── translationfiles/
│   ├── templates/
│   │   └── shopping_list.pot      # Source template (do not edit manually)
│   ├── de/
│   │   └── shopping_list.po       # German translation (example)
│   └── README.md
├── l10n/
│   ├── de.js                      # Auto-generated from .po files
│   └── de.json                    # Auto-generated from .po files
```

## For Developers

- All user-facing strings should be wrapped in `t('shopping_list', '...')` in Vue/TypeScript files
- The `.pot` file is regenerated when strings change
- The `l10n/` directory contains the compiled translations used at runtime
- Do not edit files in `l10n/` manually — they are generated from the `.po` files
