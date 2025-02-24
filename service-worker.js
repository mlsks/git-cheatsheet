const CACHE_NAME = 'git-cheatsheet-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/documentation.css',
  '/js/main.js',
  '/js/theme.js',
  '/js/search.js',
  '/js/navigation.js',
  '/js/clipboard.js',
  '/js/utils.js',
  '/js/lazyLoading.js',
  '/js/tableOfContents.js',
  '/js/commandNavigation.js',
  '/js/interactiveExamples.js',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Clean up old caches when a new service worker takes over
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});