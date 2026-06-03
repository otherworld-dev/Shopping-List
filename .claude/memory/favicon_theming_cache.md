---
name: Nextcloud favicon theming cache
description: Nextcloud caches favicons in filecache using a cachebuster value — must bump it after icon changes
type: feedback
---

After changing app icon SVGs (app.svg, app-dark.svg), the favicon won't update until the Nextcloud theming cachebuster is incremented.

**Why:** Nextcloud's IconBuilder generates favicons and caches them in appdata keyed by `favIcon-{app}{color}` under a folder named by the cachebuster value. The `?v=` query param in the favicon URL doesn't bypass this server-side cache.

**How to apply:** After deploying icon changes, run on the server:
```bash
sudo -u www-data php /var/www/nextcloud/occ config:app:get theming cachebuster  # note current value
sudo -u www-data php /var/www/nextcloud/occ config:app:set theming cachebuster --value <current+1>
```
Also: `app.svg` should use `fill="#ffffff"` — the sidebar CSS recolors it regardless, and the favicon renderer composites it on the themed primary color background.
