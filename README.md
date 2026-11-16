# Homepage

A one-file home page: an app-launcher grid with shared notes, built to be Chrome's home page on Android and hosted on GitHub Pages. No build step, no libraries, no web fonts.

## Features

- Clock and date header, with a grid of shortcut tiles filled from the bottom so the first tiles sit under the thumb.
- Edit mode: tap to edit, drag to reorder, remove with Undo, Sort A–Z, and steppers for icon size, columns (2–8) and rows (1–10).
- Notes and files shared between devices through a Firebase Realtime Database, under a shared key, with optional encryption.
- Connection icon showing whether the page's server answers.
- Offline copy through a service worker (`sw.js`), which offers "Reload" when a new version is published.

## Files

- `index.html`: the whole app. The comment block at the top documents the data, the Firebase setup and security rules, and the version history.
- `sw.js`: the service worker. Keep it next to `index.html`.
- `homepage-status.md`: version notes and open to-dos.

## Use

Publish both files with GitHub Pages and set the page address as the browser's home page. To turn notes on, put your own database address in `NOTES_DB` in `index.html` and apply the security rules described at the top of the file.
