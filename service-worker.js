const APP_VERSION = 'v1004';
const CACHE_NAME = `kuchenne-rewolucje-${APP_VERSION}`;
const REMOTE_DATA_URL = 'https://raw.githubusercontent.com/zaza/kuchenne-rewolucje/refs/heads/gh-pages/data.geojson';

const APP_SHELL = [
  './',
  './index.html',
  './styles.css',
  './app.js?v=1004',
  './manifest.webmanifest',
  './data/statusy-restauracji.json?v=1004',
  './assets/bg-desktop.png',
  './assets/bg-mobile.png',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/icon-maskable-512.png',
  './assets/icons/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith('kuchenne-rewolucje-') && key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const requestUrl = new URL(event.request.url);

  // Zewnętrzna baza 1–31: po pierwszym pobraniu działa również z cache.
  if (requestUrl.href === REMOTE_DATA_URL) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(event.request);
        const network = fetch(event.request, { cache: 'no-store' }).then((response) => {
          if (response && response.ok) cache.put(event.request, response.clone());
          return response;
        });
        if (cached) {
          event.waitUntil(network.catch(() => undefined));
          return cached;
        }
        return network;
      })
    );
    return;
  }

  if (requestUrl.origin !== self.location.origin) return;

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' })
        .then((response) => {
          if (response && response.ok) caches.open(CACHE_NAME).then((cache) => cache.put('./index.html', response.clone()));
          return response;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
      if (response && response.ok) caches.open(CACHE_NAME).then((cache) => cache.put(event.request, response.clone()));
      return response;
    }))
  );
});
