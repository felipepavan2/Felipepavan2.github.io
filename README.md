# saddamware.github.io

Live at **https://saddamware.github.io/**

A one-file home page: an app-launcher grid with shared notes, used as Chrome's home page on Android. No build step, no libraries, no web fonts.

## Features

- Clock and date header, with a grid of shortcut tiles filled from the bottom so the first tiles sit under the thumb.
- Edit mode: tap to edit, drag to reorder, remove with Undo, Sort A–Z, and steppers for icon size, columns (2–8) and rows (1–10).
- Notes and files shared between devices through a Firebase Realtime Database, under a shared key, with optional encryption.
- Connection icon showing whether the page's server answers.
- Offline copy through a service worker (`sw.js`), which offers "Reload" when a new version is published.

## Files

- `index.html`: the whole page. The comment block at the top documents the data, the Firebase setup and security rules, and the version history.
- `sw.js`: the service worker. Keep it next to `index.html`.
- `homepage-status.md`: version notes and open to-dos.

## Publishing a new version

Replace `index.html` and leave `sw.js` as it is. GitHub Pages republishes within a minute or two. To turn notes on in your own copy, put your database address in `NOTES_DB` in `index.html` and apply the security rules described at the top of the file.
