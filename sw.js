// Service Worker PWA (Progressive Web Apps)
const CACHE_NAME="cache_v1",
  urlsToCache=[
    "./",
    "./index.html",
    "./css/normalize.css",
    "./css/style.css",
    "./js/script.js",
    "./assets/header.html",
    "./assets/home.html",
    "./assets/economy.html",
    "./assets/music.html",
    "./assets/moderation.html",
    "./assets/footer.html",
    "./assets/include.js",
    "./img/logo.webp",
    "./img/favicon-1024w.png",
    "./img/logo.svg",
    "./img/large-logo-transparent.svg",
  ]
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache).then(() => self.skipWaiting())
      })
      .catch((err) => console.log("Falló registro de cache", err))
  )
})

self.addEventListener("activate", (e) => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => self.clients.claim())
  )
})

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      if (res) {
        return res
      }
      return fetch(e.request)
    })
  )
})