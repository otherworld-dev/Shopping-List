# Shopping List

A shared shopping list app for [Nextcloud](https://nextcloud.com). Create multiple lists, categorize items by shop area, and collaborate with your household in real-time.

## Features

- **Multiple lists** — organize by store, meal plan, or occasion
- **Shop area grouping** — items grouped by aisle/department (Produce, Dairy, Bakery, etc.) with color-coded headers
- **Inline editing** — click any item to edit name or quantity in place
- **Ingredient parsing** — paste a recipe ingredient list and items are parsed automatically (e.g. "2 cups flour" splits into quantity and name)
- **Area auto-detection** — new items are automatically assigned to a shop area based on configurable keyword mappings
- **Duplicate merging** — adding an item that already exists merges the quantities instead of creating duplicates
- **Sharing** — share lists with other Nextcloud users or groups with read or write permissions
- **Real-time sync** — changes from other users appear via Nextcloud's notify_push or polling fallback
- **Check off items** — tick items as you shop; checked items collapse into a separate section
- **Bulk actions** — restore all checked items or delete them in one click

## Requirements

- Nextcloud 30 or later
- PHP 8.1 or later

## Installation

### From the App Store

Search for **Shopping List** in your Nextcloud app store and click **Install**.

### Manual installation

1. Clone this repository into your Nextcloud `apps/` directory:
   ```bash
   cd /path/to/nextcloud/apps
   git clone https://github.com/otherworld-dev/Shopping-List.git shopping_list
   ```
2. Install JavaScript dependencies and build:
   ```bash
   cd shopping_list
   npm ci
   npm run build
   ```
3. Enable the app:
   ```bash
   php occ app:enable shopping_list
   ```

## Development

### Prerequisites

- Node.js 20+
- npm 10+
- A running Nextcloud development instance

### Setup

```bash
make dev        # install deps + watch mode
make build      # production build
make lint       # run ESLint + Stylelint
make test       # run PHPUnit tests
make appstore   # build release tarball
```

Or without Make:

```bash
npm ci
npm run dev     # watch mode
npm run build   # production build
```

### Project structure

```
appinfo/          Nextcloud app metadata and routes
lib/              PHP backend (controllers, services, mappers, migrations)
src/              Vue 3 + TypeScript frontend
  components/     Vue components
  composables/    API client, push notifications
  stores/         Pinia state management
  types/          TypeScript interfaces
templates/        Server-side entry point
```

## License

AGPL-3.0-or-later
