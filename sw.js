

const CACHE_NAME = 'gate-auto-cache-v5.15.29';
const APP_SHELL_URLS = [
  '/',
  '/index.html',
  '/call.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache and caching app shell');
        return cache.addAll(APP_SHELL_URLS);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Stale-while-revalidate for API calls and images
  if (url.origin === 'https://api.allorigins.win' || event.request.destination === 'image') {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return cache.match(event.request).then(response => {
          const fetchPromise = fetch(event.request).then(networkResponse => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          }).catch(err => {
            console.error('Fetch failed; returning offline fallback if available.', err);
            // If fetch fails and we have a cached response, we've already returned it.
            // If not, the promise rejection will propagate.
          });
          return response || fetchPromise;
        });
      })
    );
  } else { // Cache-first for app shell and other assets
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          return response || fetch(event.request);
        })
    );
  }
});