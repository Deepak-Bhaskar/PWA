// Installing service worker
// Self is pointing to service worker here.
// Lifecycle event is triggered by your SW
self.addEventListener("install", function (event) {
  console.log("[Service Worker] Installing service worker...!!!", event);
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
  console.log("[Service Worker] Fetching service worker...!!!", event);

  // now suupose we want to overwrite response coming from fetch request we can do it by respondWith
  // event.respondWith(null);  This site can't be eached
  event.respondWith(fetch(event.request)); // respond with event request
});
