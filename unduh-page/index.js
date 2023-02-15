const buttonNav = document.querySelector("nav button");
const togleItems = document.querySelector(".toggler-nav");

buttonNav.addEventListener("click", function () {
  Array.from(this.children).forEach((e) => {
    e.classList.toggle("d-none");
  });

  togleItems.classList.toggle("d-flex");
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("../service-worker.js")
      .then(function (registration) {
        console.log("Service worker registered:", registration);
      })
      .catch(function (error) {
        console.log("Service worker registration failed:", error);
      });
  });
}

let deferredPrompt;

// Tangani event beforeinstallprompt untuk menampilkan tombol "Tambahkan ke layar utama"
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  // Tampilkan tombol "Tambahkan ke layar utama"
  const tombolDownload = document.querySelector(".dowload-apk-quran");
  tombolDownload.style.display = "block";

  // Tangani event klik pada tombol "Tambahkan ke layar utama"
  tombolDownload.addEventListener("click", (e) => {
    // Sembunyikan tombol "Tambahkan ke layar utama"
    tombolDownload.style.display = "none";

    console.log("hello word");
    // Tampilkan prompt penginstalan
    deferredPrompt.prompt();

    // Tangani event hasil dari prompt penginstalan
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
      deferredPrompt = null;
    });
  });
});
