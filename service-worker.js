const CACHE_NAME = "zahi-cache-v1";
const OFFLINE_URL = "/offline.html";

const urlsToCache = [
  "/",
  "/index.html",
  "/about.html",
  "/contact.html",
  "/style.css",
  "/app.js",
  "/icons/iconjf.png",
  "/icons/iconjf2.png",
  OFFLINE_URL
];

// Install
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    )
  );
});

// Fetch
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    // Untuk halaman
    event.respondWith(
      fetch(event.request).catch(() => caches.match(OFFLINE_URL))
    );
  } else {
    // Untuk aset
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
