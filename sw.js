/* sw.js: the service worker for index.html (registered in its "boot" section; see OVERVIEW there).

   It keeps one copy of the page in the cache "drawer.home-v1" and answers a navigation to the page's own
   address from that copy, so the page opens at once and in flight mode. At the same time it fetches the
   page from the network, replaces the copy, and tells the open page when the copy changed, so it can offer
   Reload (the "updated" message). Everything else (Firebase, the icon services, any other address on this
   site) is not touched and goes straight to the network.

   Browser storage is shared by every GitHub Pages project of the same account, so the cache name starts
   with "drawer." like the storage keys in index.html, and only this page's older caches are deleted on
   activate. To force a fresh copy on every device, change CACHE. */
const CACHE = 'drawer.home-v1', PAGE = './';
const DIR = new URL(PAGE, self.location.href).pathname;   /* the page's directory, e.g. /repo/ */

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.add(new Request(PAGE, {cache: 'reload'}))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('drawer.home-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  if (e.request.mode !== 'navigate') return;   /* only page loads; data requests pass straight through */
  const u = new URL(e.request.url);
  if (u.origin !== self.location.origin || (u.pathname !== DIR && u.pathname !== DIR + 'index.html')) return;   /* only this page */
  e.respondWith((async () => {
    const cache = await caches.open(CACHE), cached = await cache.match(PAGE);
    const kept = cached && cached.clone();   /* a copy to compare with later: the original's body goes to the page */
    const fresh = fetch(new Request(PAGE, {cache: 'no-cache'})).then(async r => {
      if (!r.ok) return r;
      /* GitHub Pages changes the ETag on every deploy, so an equal tag means unchanged but a different one
         needs the bodies compared */
      const tag = r.headers.get('etag') || '', old = kept ? kept.headers.get('etag') || '' : '';
      const changed = !!kept && !(tag && tag === old) && (await kept.text()) !== (await r.clone().text());
      await cache.put(PAGE, r.clone());
      if (changed){
        const cs = await self.clients.matchAll({type: 'window'});
        const mine = e.resultingClientId && await self.clients.get(e.resultingClientId);
        if (mine && !cs.some(c => c.id === mine.id)) cs.push(mine);
        for (const c of cs) c.postMessage('updated');
      }
      return r;
    }).catch(() => null);
    if (cached){ e.waitUntil(fresh); return cached; }
    return (await fresh) || new Response('Offline, and no copy of the page is saved yet.', {status: 503, headers: {'Content-Type': 'text/plain'}});
  })());
});
