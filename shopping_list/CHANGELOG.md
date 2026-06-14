# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.4] - 2026-06-14

### Fixed
- Public share links can now scroll to the bottom of the list (#13)
- Added spacing so the last item clears the Nextcloud footer

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
