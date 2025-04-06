// public/sw.js
const CACHE_NAME = "ai-lab-translator-cache-v1";
const urlsToCache = ["/", "/web-app-manifest-192x192.png", "/web-app-manifest-512x512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)));
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Fallback to network if not in cache
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  // Clean up old caches if necessary
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
