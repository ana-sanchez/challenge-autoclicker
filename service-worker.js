
const CACHE_NAME = 'challenge-autoclicker-v1';
const urlsToCache = [
  '/',
  '/src'
];

self.addEventListener('install', (event) =>  {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
         if(response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
})

self.addEventListener('activate', (event) => {
  const cacheAllowlist = ['challenge-autoclicker-v1'];
  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheAllowlist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      ))
  );
});
