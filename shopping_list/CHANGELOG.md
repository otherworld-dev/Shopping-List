# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
