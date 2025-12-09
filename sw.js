const CACHE_NAME = 'daylin-v1';
const OFFLINE_URL = '/offline.html';
const ASSETS = ['/', '/app', '/manifest.json', '/icons/icon-192x192.png', OFFLINE_URL];

self.addEventListener('install', evt => {
  evt.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', evt => {
  if (evt.request.mode === 'navigate') {
    evt.respondWith(
      fetch(evt.request).catch(() => caches.match(OFFLINE_URL))
    );
    return;
  }
  evt.respondWith(caches.match(evt.request).then(r => r || fetch(evt.request)));
});
