const worker1 = new Worker("workerAudio/worker1.js");
worker1.postMessage("mulai");
worker1.addEventListener("message", (e) => {
  const containerSurahAudio = document.querySelector(".container-surah-audio");
  containerSurahAudio.innerHTML += e.data;

  const cariSurah = document.querySelector("#cariSurah");
  const barter = Array.from(
    document.querySelectorAll(".penanda-container-surah .spesifik-surah")
  );
  cariSurah.addEventListener("input", () => {
    barter.forEach((e) => {
      if (cariSurah.value.length >= 1) {
        if (
          e.textContent
            .toLowerCase()
            .includes(cariSurah.value.trim().toLowerCase())
        ) {
          e.parentElement.parentElement.parentElement.parentElement.parentElement.style.order =
            "1";
          e.parentElement.parentElement.parentElement.style.background = "red";
        } else {
          e.parentElement.parentElement.parentElement.parentElement.parentElement.style.order =
            "2";
          e.parentElement.parentElement.parentElement.style.background =
            "#0D6EFD";
        }
      } else {
        e.parentElement.parentElement.parentElement.parentElement.parentElement.style.order =
          "2";
        e.parentElement.parentElement.parentElement.style.background =
          "#0D6EFD";
      }
    });
  });
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("click-surah-audio")) {
    e.target.parentElement.parentElement.nextElementSibling.classList.toggle(
      "d-none"
    );
  } else if (e.target.classList.contains("click-surah-judul")) {
    e.target.parentElement.parentElement.parentElement.nextElementSibling.classList.toggle(
      "d-none"
    );
  } else if (e.target.classList.contains("button-close-tafsir")) {
    e.target.parentElement.parentElement.parentElement.classList.toggle(
      "d-none"
    );
  } else if (e.target.classList.contains("play-audio-button")) {
    putarAudioBaru(e.target);
  } else if (e.target.classList.contains("close-control-audio")) {
    const elemenSurah = document.querySelectorAll(".active-surah-view");
    e.target.parentElement.parentElement.remove();
    const metaData = e.target.dataset.nosurah;
    elemenSurah[metaData - 1].classList.remove("bg-success");
  }
});

function putarAudioBaru(target) {
  const templateAudio = document.querySelector(".container-template-audio");
  const elemenSurah = document.querySelectorAll(".active-surah-view");
  const metaData = target.dataset.datasurah.split(",");
  const banding =
    document.querySelector(".judul-surah-audio span:nth-child(2") || "kosong";

  if (banding.innerHTML === metaData[1]) {
    if (target.innerHTML === "play_arrow") {
      audioSurah.play();
    } else {
      audioSurah.pause();
    }
  } else {
    templateAudio.innerHTML = `
        <div class="row p-0 m-0">
          <div class="col-11">
            <figure class="row pt-2">
              <figcaption class="text-center text-capitalize">
                <h6 class="text-light d-flex justify-content-between judul-surah-audio">
                  <span>${metaData[0]}. ${metaData[2]} - ${metaData[3]} ayat</span>
                  <span>${metaData[1]}</span>
                </h6>
              </figcaption>
              <audio controls mediagroup="music" preload="auto" class="audio-surah-translate">
                  <source src="${target.dataset.srcaudio}" type="audio/mpeg">
              </audio>
            </figure>
          </div>
          <div class="col-1 p-0 m-0 text-end">
            <button type="button" class="btn btn-danger close-control-audio" data-nosurah="${metaData[0]}">X</button>
          </div>
        </div>
    `;
    elemenSurah.forEach((e) => e.classList.remove("bg-success"));
    audioSurah = document.querySelector(".audio-surah-translate") || "kosong";
    audioSurah.play();
  }

  audioSurah.addEventListener("play", () => {
    target.innerHTML = "pause";
  });

  audioSurah.addEventListener("pause", () => {
    target.innerHTML = "play_arrow";
  });

  audioSurah.addEventListener("ended", () => {
    const playButtonAudio = Array.from(
      document.querySelectorAll(".play-audio-button")
    );
    let indexTarget = playButtonAudio.indexOf(target) + 1;
    if (indexTarget >= 114) indexTarget = 0;
    putarAudioBaru(playButtonAudio[indexTarget]);
  });

  elemenSurah[metaData[0] - 1].classList.add("bg-success");
}
