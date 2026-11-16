# Home page: versions and status

A one-file home page (app-launcher grid with shared notes) hosted on GitHub Pages and used as Chrome's home page on Android. The repository holds two files: `index.html` (the whole page, with its own documentation in a comment block at the top) and `sw.js` (the service worker; keep it).

## Which version is a given copy?

Open `index.html` and read the HISTORY block near the top of the file. Its last line names the version.

**Latest: 2026-11-15** (151,857 bytes, 2,336 lines).

## History

- 2026-10-10: notes shared through Firebase.
- 2026-10-11: files, stored as they are or encrypted; Select replaced Clear.
- 2026-10-13: comments for future upgrades.
- 2026-10-14: notes under a shared key, encrypted text notes, tap to copy, hold to edit, Undo for deletes, new-note dot, service worker (`sw.js`), grid fills from the bottom, buttons under the grid. Made in a session that could not be found in the chat history.
- 2026-11-12: Edit mode gained Sort A–Z, icon size, columns and rows.
- 2026-11-15: connection icon left of Notes. Grey while checking, green when the page's own server answers, red when it doesn't. Tap it to check now.

## Publishing a new version

Replace `index.html` in the repository and leave `sw.js` unchanged. The next open still shows the old copy, then offers "Reload".

## sw.js (reviewed 2026-11-15, 3,000 bytes, unchanged since 2026-10-14)

- Keeps one copy of the page in the cache `drawer.home-v1` and answers only page loads of this page's own address (`./` and `./index.html`) from it. Every other request, including the connection icon's check (`HEAD sw.js?ping=...`), goes straight to the network.
- On each page load it also fetches the page, replaces the copy, and posts `updated` when the copy changed (equal ETag means unchanged; otherwise the texts are compared).
- To force a fresh copy on every device, change `CACHE` in `sw.js`.
- No change was needed for the 2026-11-15 version of `index.html`.

## Not yet verified

- Everything was tested in headless Chromium against a local server, with the real `sw.js`, not on the phone or against GitHub Pages itself.

## Suggested, not done

1. Validate backups on import (icon strings are stored and shown unchecked).
2. Keep hand-picked icons when "Refresh all icons" runs.
3. Timeouts for uploads and downloads in Notes.
4. Optional Firebase sign-in, to stop strangers using up the database quota.
