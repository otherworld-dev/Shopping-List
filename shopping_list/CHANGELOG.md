# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- A pasted line with a ticked checkbox (`[x] Milk`, or Markdown's `- [x] Milk`
  as written by Nextcloud Text) now imports as an item that is already checked
  off, so a checklist brought in from another app keeps which items were
  already bought. The add box help shows a ticked line among its examples.
  Thanks to rubo77 for the follow-up (#35)
- The add box explains what it understands: its placeholder now invites you
  to paste a list, and a question-mark button opens a short help panel with
  example lines shown next to the item each one produces. The examples run
  through the live parser in your language, so the help never promises
  something a paste would not do. Thanks to rubo77 for the idea and the first
  version (#39)

### Changed
- The frontend source is now linted with Nextcloud's shared ESLint rules, and
  `npm run lint` works again. Templates follow the shared layout, the two
  Nextcloud packages the app imports directly are declared as dependencies,
  and the push composable no longer logs at info level

## [1.7.0] - 2026-08-30

### Added
- Pasted lists with markup now import cleanly: checkbox lines (`[ ]` / `[x]`),
  bracketed amounts (`[ 10 ]`), bullets (`-` `*`), and numbered lines
  (`1.` / `2)`) all parse into proper items with quantities. Thanks to rubo77
  for the format examples and for pointing out that export was missing (#35)
- "Copy list as text" in the new list actions menu: copies the outstanding
  items in the same format the add box accepts, so a list round trips through
  a chat message and back (#35)
- First automated test suite (vitest), covering the ingredient parser in
  English and German and the copy-as-text round trip

### Changed
- The Share button moved into the list actions menu in the list header
- French is now fully translated (124/124 strings), with reworked wording.
  Thanks to Enreg40 for the careful review that improved several of them
- Item names with brand capitalisation (iPhone, eBay) keep it instead of
  being force-capitalised

### Fixed
- Names with a leading digit glued to a word (7up, 3M tape, 7-Eleven) no
  longer lose the digit to the quantity field
- `2x Milk` now reads as a count of 2, instead of creating an item named
  "X Milk"; `2 x Milk` and the multiplication sign also work
- Replaced a private-API `\OC::$server` call in the push service with proper
  dependency injection, ahead of it breaking on a future Nextcloud major

### Upgrade
No database migration. Drop-in replacement for any 1.6.x.

## [1.6.2] - 2026-07-05

### Fixed
- The app name is now translatable, so the app menu entry follows your
  language. Finnish ("Ostoslista") included, other languages open on
  Crowdin (#30)

### Changed
- The Android app announcement notification strings are now translatable
  on Crowdin

### Upgrade
No database migration. Drop-in replacement for v1.6.1.

## [1.6.1] - 2026-07-03

### Fixed
- Slovak: default area names (Produce, Dairy, Bakery) and the "Area" picker
  label now display in Slovak — the translations were missing on Crowdin and
  have been added (#24)

### Changed
- App store listing now links the official website
  ([shoppinglist.otherworld.dev](https://shoppinglist.otherworld.dev/)) and the
  official Android companion app

### Upgrade
No database migration. Drop-in replacement for v1.6.0.

## [1.6.0] - 2026-07-01

### Added
- Companion Android app, available on [Google Play](https://play.google.com/store/apps/details?id=dev.otherworld.shoppinglist)
- One-time in-app notification announcing the Android app. On upgrade, existing
  users (list owners and people lists are shared with) get a dismissable
  notification linking to the Play Store. Fresh installs are not notified.

### Upgrade
No database schema change. The upgrade runs a one-off step that sends the
announcement notification; it is best-effort and never blocks the upgrade.

## [1.5.3] - 2026-06-28

### Added
- Finnish translation (interface) — thanks to ikke-t (#17)

### Upgrade
No database migration. Drop-in replacement for v1.5.2.

## [1.5.2] - 2026-06-27

### Fixed
- Default shop-area names (Produce, Dairy, …) now follow each viewer's language
  live, including on existing and shared lists. They were previously frozen in
  whatever language the list was created in, so already-translated names kept
  showing in English (#24)

### Added
- "Load keywords for my language" button in Manage Areas — adds your language's
  grocery keywords to an existing list's default areas, so items auto-sort
  correctly. Existing keywords are kept (#24)

### Upgrade
Adds a `name_key` column to shop areas (auto-migrated). Existing English-seeded
lists are matched to the built-in defaults so their names start translating;
areas you've renamed keep your custom names.

## [1.5.1] - 2026-06-26

### Added
- Slovak translation — interface, category keywords, and measurement units
- Croatian translation — category keywords and measurement units

### Fixed
- Measurement-unit packs can now be fully translated on Crowdin: the internal
  unit aliases (duplicate English words that couldn't be translated) moved into
  code, so translators see only real, translatable strings and the file reaches
  100% (#3)
- Restored the German measurement-unit pack

### Upgrade
No database migration. Drop-in replacement for v1.5.0.

## [1.5.0] - 2026-06-15

### Added
- Copy shop-area categories from another list — a "Copy categories from…" picker
  in Manage Areas merges keywords into same-name areas or creates them, so you
  don't have to set up categories on every list (#22)

## [1.4.2] - 2026-06-15

### Fixed
- Long item names with no spaces no longer overflow the row or squash sibling
  rows to one character per line — rows shrink correctly and long names wrap (#20)
- A long shop-area name on a row can no longer starve the item name to zero width
  (the area chip is capped); long area names in headers now wrap
- Same wrapping fixes applied to the public shared-list view

## [1.4.1] - 2026-06-15

### Added
- Move items between lists — a per-item "Move to list" action (#21). The item's
  shop area is re-resolved in the target list (same-name area, else keyword
  detection, else uncategorized) and it's reset to unchecked.

### Changed
- Server-side area matching folds accents/case to match the client (declares the
  `intl` dependency)

### Fixed
- The per-row shop-area label no longer squeezes a long item name — it collapses
  to just the colored dot, with the area name on hover (#20)

## [1.4.0] - 2026-06-15

### Added
- Translatable shop-area keywords — keyword sets moved into per-language packs
  (`resources/keywords/<lang>.json`), editable by translators on Crowdin and
  seeded per list in the creator's language (German included)
- Localized quantity parsing — per-language units, connector words, and decimal
  mark (`resources/parsing/<lang>.json`); German units and `0,5` decimals
- Accent- and case-insensitive item matching (Latin diacritics; preserves
  Japanese/Arabic/Hebrew scripts)
- Keyword pack validator (`npm run keywords:validate`)
- TRANSLATING.md contributor guide

### Changed
- Area auto-detection now picks the most specific (longest) matching keyword,
  so short words can't shadow specific ones
- English singular/plural niceties are gated to English; other languages keep
  their item names intact (no more wrong plurals or cross-merges)

## [1.3.3] - 2026-06-01

### Added
- Delete confirmation prompt before removing items
- Trash icon now visible on touch/mobile devices

### Fixed
- Trash icon was invisible on touch devices due to hover-only opacity

## [1.3.2] - 2026-05-31

### Added
- German translation (thanks @FadeFx!)
- French translation
- Default shop area names are now translatable (Produce, Dairy, Bakery, etc.)
- PO to Nextcloud l10n conversion script (`npm run l10n`)

## [1.3.1] - 2026-05-24

### Added
- Translatable default shop area names in POT file

## [1.3.0] - 2026-05-14

### Added
- Offline mode — data persists locally via IndexedDB so lists survive page refresh
- Offline mutation queue — check, add, edit, and delete items without network
- Automatic sync when connectivity returns with conflict handling
- Online/offline status indicator with pending change count
- Network failures during online use now queue instead of losing changes

### Changed
- Polling pauses while offline or syncing to prevent state conflicts

## [1.2.0] - 2026-05-14

### Added
- Confirmed compatibility with Nextcloud 34 (featured in NC34 release)
- Crowdin translation integration for community translations
- All user-facing strings wrapped in t() for translation support

## [1.1.1] - 2026-05-11

### Fixed
- Crowdin configuration file update

## [1.1.0] - 2026-05-10

### Added
- Public share links — share a list via URL without requiring a Nextcloud account
- Configurable permissions (read/write) for public links
- Optional password protection and expiry dates for public links
- Public list view with inline editor, area grouping, and check toggle
- Separate public Vue entry point with Nextcloud public page layout

## [1.0.8] - 2026-05-09

### Fixed
- List deletion crash on MariaDB caused by subquery parameter binding
- Favicon stuck as black due to Nextcloud theming cache

## [1.0.7] - 2026-05-08

### Added
- Smart area keyword learning — manually assigning an item to an area teaches the app for next time
- General and Pets default shop areas with keyword mappings
- Singular/plural matching — "radish" and "radishes" are recognised as the same item
- Auto-pluralization — item names pluralize when quantity goes above 1

### Fixed
- Item quantity merging not working when no quantity was provided
- Area explicit flag not passed through on item update

## [1.0.6] - 2026-05-07

### Fixed
- Removed app-dark.svg that caused black favicon in browser tabs

## [1.0.5] - 2026-05-06

### Added
- Drag-and-drop reordering within and across shop area groups
- Default item quantity to 1 when none is provided
- Ingredient auto-parsing from pasted text (e.g. "2 cups flour")
- Mobile keyboard "Send" button hint for item entry

### Fixed
- Mobile menu icon overlapping list name
- Long item names overflowing table on mobile

## [1.0.4] - 2026-05-05

### Fixed
- Increased item editor input height for better touch targets
- Area dropdown clipped by overflow — now teleported to body

### Changed
- Shop areas are now list-scoped so shared users can see and manage them

## [1.0.3] - 2026-05-04

### Added
- Shared user avatars displayed next to share button

### Fixed
- App icon not inverting in dark mode

## [1.0.0] - 2026-04-06

### Added
- Create and manage multiple shopping lists
- Share lists with Nextcloud users and groups (read/write permissions)
- Custom share dialog with user/group search and permission management
- Items grouped by color-coded shop areas (Produce, Dairy, Bakery, etc.)
- 10 default shop areas seeded on first use
- Inline editing of item name and quantity
- Ingredient parsing from pasted recipe text (e.g. "2 cups flour")
- Auto-detection of shop area from item name using configurable keyword mappings
- Duplicate item merging with quantity combination
- Check off items while shopping with collapsible checked section
- Bulk restore and bulk delete for checked items
- Configurable area keyword mappings via settings panel
- Real-time sync via Nextcloud notify_push with polling fallback
- Nextcloud 30-35 support
