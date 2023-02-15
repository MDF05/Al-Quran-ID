// Install event
self.addEventListener("install", (event) => {
  console.log("Service worker installed");
  event.waitUntil(
    caches.open("static-cache-v1").then((cache) => {
      cache.addAll([
        "/",
        "/home-page/home.html",
        "/css/home.css",
        "/css/audio.css",
        "/css/index.css",
        "/css/surah.css",
        "/al-quran/my-logo/al-quran.jpg",
        "/al-quran/my-logo/icon1.jpg",
        "/al-quran/my-logo/icon2.jpg",
        "/al-quran/my-logo/Oops! 404 Error with a broken robot-cuate.png",
        "/page-audio/workerAudio/worker1.js",
        "/page-audio/audio.html",
        "/page-audio/audio.js",
        "/page-surah/javascriipt/index.js",
        "/page-surah/page.html",
        "/page-surah/surah/surah.html",
        "/page-surah/surah/surah.js",
        "/page-surah/surah/worker/worker1.js",
        "/page-surah/surah/worker/worker2.js",
      ]);
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
