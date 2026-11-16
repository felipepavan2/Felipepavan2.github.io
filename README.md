# saddamware.github.io

Live at **https://saddamware.github.io/**

A one-file home page (an app-launcher grid with shared notes and files), used as Chrome's home page on Android.

- `index.html`: the whole page. The comment block at the top documents its features, the Firebase notes setup and the version history.
- `sw.js`: the service worker that keeps an offline copy and offers "Reload" when a new version is published. Keep it next to `index.html`.

To publish a new version, replace `index.html` and leave `sw.js` as it is.
