---
name: Shopping List App Overview
description: Nextcloud 30+ shared shopping list app - tech decisions and architecture choices
type: project
---

Building a Nextcloud 30+ shopping list app (app ID: `shoppinglist`, namespace: `OCA\ShoppingList`).

**Key decisions made:**
- NC 30+ target, Vue 3, Vite, @nextcloud/vue 9.x, Pinia, TypeScript
- Custom sharing table (not IShareProvider) with NC sharees autocomplete for UX
- Tags and shop areas are separate concepts (tags = freeform metadata, areas = store sections)
- Real-time sync via notify_push with polling fallback
- PHP 8.1+, QBMapper, PHP 8 attributes for routing

**Why:** Household shared shopping list management — multiple users collaborating on lists in real time.

**How to apply:** All implementation follows these decisions. The sharing approach uses a pragmatic custom table instead of NC's file-oriented sharing API.
