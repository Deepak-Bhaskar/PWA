// Installing service worker
// Self is pointing to service worker here.
// Lifecycle event is triggered by your SW
self.addEventListener("install", function (event) {
  console.log("[Service Worker] Installing Service Worker ...", event);
  event.waitUntil(
    caches.open("static").then(function (cache) {
      console.log("[Service Worker] Precaching App Shell");
      cache.addAll([
        "/",
        "/index.html",
        "/src/js/app.js",
        "/src/js/feed.js",
        "/src/js/promise.js",
        "/src/js/fetch.js",
        "/src/js/material.min.js",
        "/src/css/app.css",
        "/src/css/feed.css",
        "/src/images/main-image.jpg",
        "https://fonts.googleapis.com/css?family=Roboto:400,700",
        "https://fonts.googleapis.com/icon?family=Material+Icons",
        "https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css",
      ]);
    })
  );
});

// Activating service worker
self.addEventListener("activate", function (event) {
  console.log("[Service Worker] Activating service worker...!!!", event);
  // Returning claims() method to ensure our SW loaded correctly, it will work without it but writing return ensures the SW loaded correctly.
  return self.clients.claim();
});

// One more thing fetch is triggered by your webpage
// Now adding non lifecycle event
self.addEventListener("fetch", function (event) {
  // now suupose we want to overwrite response coming from fetch request we can do it by respondWith
  // event.respondWith(null);  This site can't be eached
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      } else {
        return fetch(event.request);
      }
    })
  ); // respond with event request
});
