// Checking service worker is available for browser or not.
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").then(function () {
    console.log("Service worker registered successfully!");
  });
}
