---
name: Run l10n conversion after Crowdin merges
description: Always run npm run l10n and commit after merging Crowdin translation PRs
type: feedback
---

After merging Crowdin translation PRs, always run `npm run l10n` in the shopping_list directory to convert PO files to Nextcloud l10n format, then commit and push the generated l10n/*.js and l10n/*.json files.

**Why:** The user doesn't want to remember this step — translations won't appear in the app without the conversion.

**How to apply:** Whenever committing/pushing/releasing, check if there are new PO files in translationfiles/ that haven't been converted to l10n/ yet. Run the conversion proactively.
