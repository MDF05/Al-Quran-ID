// Install event
self.addEventListener("install", (event) => {
  console.log("Service worker installed");
  event.waitUntil(
    caches.open("static-cache-v1").then((cache) => {
      cache.addAll(["/", "/index.html", "/css/home.css"]);
    })
  );
});

// Fetch event
self.addEventListener("fetch", (event) => {
  console.log("Fetch event for ", event.request.url);
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

// Activate event
self.addEventListener("activate", (event) => {
  console.log("Service worker activated");
});
