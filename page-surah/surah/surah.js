const worker1 = new Worker("worker/worker1.js");
const worker2 = new Worker("worker/worker2.js");

const audioAyah = document.querySelector(".play-audio-template");
function playAudioSurah(surah, number, judul, spanPlay, span) {
  if (surah.toString().length == 1) surah = "00" + surah;
  if (surah.toString().length == 2) surah = "0" + surah;

  if (number.toString().length == 1) number = "00" + number;
  if (number.toString().length == 2) number = "0" + number;

  if (
    localStorage.getItem("nomor") === `${Number(number)}` &&
    localStorage.getItem("noSurah") === `${Number(surah)}`
  ) {
    const playAudioAyah = audioAyah.querySelector("audio");
    if (span.innerHTML === "pause") playAudioAyah.pause();
    else playAudioAyah.play();
  } else {
    localStorage.setItem("nomor", `${Number(number)}`);
    audioAyah.innerHTML = `
          <picture>
            <figcaption>
              ${judul}(${Number(number)})-Shaykh Mishari Alafasy
            </figcaption>
            <audio controls preload autoplay="autoplay" class="template-audio-ayah" >
                <source src="https://everyayah.com/data/Alafasy_64kbps/${surah}${number}.mp3" type="audio/mp3">
                  <track kind="subtitles" srclang="en" label="asu" Subtitles"default">
            </audio>
            <button type="button" class="btn closeDava">X</button>
        </picture>
     `;
  }

  const playAudioAyah = audioAyah.querySelector("audio");

  playAudioAyah.addEventListener("pause", () => {
    span.innerHTML = "play_arrow";
  });

  playAudioAyah.addEventListener("play", () => {
    span.innerHTML = "pause";
  });

  playAudioAyah.addEventListener("ended", () => {
    const anakPosisi = Array.from(spanPlay).indexOf(span);
    playAudioSurah(
      surah,
      parseFloat(number) + 1,
      judul,
      spanPlay,
      spanPlay[anakPosisi + 1]
    );
  });
  //

  const buttonClose = document.querySelector(".closeDava");
  buttonClose.addEventListener("click", () => {
    localStorage.removeItem("nomor");
    buttonClose.parentElement.remove();
    spanPlay.forEach((as) => {
      as.innerHTML = "play_arrow";
      as.style.background = `${
        localStorage.getItem("backgroundPlayButton")?.split(",")[0] ||
        "transparent"
      }`;
      as.style.color = `${
        localStorage.getItem("playButtonColor")?.split(",")[0] || "black"
      }`;
      //
    });
    //
  });

  spanPlay.forEach((as) => {
    as.style.background = `${
      localStorage.getItem("backgroundPlayButton")?.split(",")[0] ||
      "transparent"
    }`;
    as.style.color = `${
      localStorage.getItem("playButtonColor")?.split(",")[0] || "black"
    }`;
    if (as.textContent.includes("pause")) {
      as.innerHTML = "play_arrow";
    }
  });

  span.scrollIntoView({ behavior: "smooth", block: "center", inline: "start" });

  span.style.background = `${
    localStorage.getItem("playBgActive")?.split(",")[0] || "green"
  }`;
  span.style.color = `${
    localStorage.getItem("playActive")?.split(",")[0] || "white"
  }`;
}

(async function listNavsurah() {
  const saya = document.querySelector(".daftar-surah-nav div.row div.col");
  await fetch(`https://equran.id/api/surat`)
    .then((e) => e.json())
    .then((e) => {
      e.forEach((a) => {
        saya.innerHTML += `<span class="ini-urutan px-lg-4 px-md-3 px-sm-2 px-2" data-urutan="${a.nomor}">
          ${a.nomor}. ${a.nama_latin} 
        </span>`;
      });
    });
  worker1.postMessage(localStorage.getItem("noSurah"));
})();

// settong drag melayang 📌📌
(function settingDragElemen() {
  const settingDrag = document.getElementById("settingDrag");

  function posisiSetting(event, opacity) {
    event.target.style.opacity = `${opacity}`;
    event.target.style.top = `${event.clientY}px`;
    event.target.style.left = `${event.clientX}px`;
  }

  settingDrag.addEventListener("drag", function (event) {
    posisiSetting(event, 0.5);
  });

  settingDrag.addEventListener("dragend", function (event) {
    posisiSetting(event, 1);
  });

  settingDrag.addEventListener("touchstart", function () {
    document.body.classList.toggle("overflow-hidden");
    settingDrag.addEventListener("touchmove", function (e) {
      // Update the position of the div
      settingDrag.style.left = e.touches[0].clientX + "px";
      settingDrag.style.top = e.touches[0].clientY + "px";
    });
  });
  settingDrag.addEventListener("touchend", () => {
    document.body.classList.toggle("overflow-hidden");
  });

  const spanSetting = settingDrag.querySelector("span.gear-setting");
  allSpan = Array.from(spanSetting.parentElement.children);
  spanSetting.addEventListener("dblclick", function () {
    allSpan.forEach((e) => {
      e.classList.toggle("d-none");
    });
  });
})();

function scrollViewSurah(tujuan, span, paren) {
  paren[span].scrollIntoView({
    behavior: "smooth",
    block: tujuan,
    inline: "center",
  });
}

document.addEventListener("click", (e) => {
  const spanSetting = settingDrag.querySelector("span.gear-setting");
  const spanPlay = document.querySelectorAll(".play-surah-dava");
  const spanArrow = settingDrag.querySelectorAll("span.arrow-scroll");
  const numberSurah = document.querySelector(".header-surah-number");
  let halamanQuran = parseFloat(numberSurah.dataset.numberquran);
  if (e.target.classList.contains("arrow-scroll")) {
    const arahPanah = e.target.dataset.panah;
    allSpan.forEach((e) => {
      e.classList.toggle("d-none");
    });
    switch (arahPanah) {
      case "bawah":
        scrollViewSurah("start", spanPlay.length - 1, spanPlay);
        break;
      case "atas":
        scrollViewSurah("end", 1, spanPlay);
        break;
      case "kiri":
        halamanQuran = halamanQuran - 1;
        if (halamanQuran <= 0) halamanQuran = 114;
        worker1.postMessage(halamanQuran);
        daftarSurahView(halamanQuran);
        break;
      case "kanan":
        halamanQuran = halamanQuran + 1;
        if (halamanQuran >= 114) halamanQuran = 1;
        worker1.postMessage(halamanQuran);
        daftarSurahView(halamanQuran);
        break;
      case "pengaturan":
        const pengaturan = document.getElementById("container-pengaturan");
        pengaturan.classList.toggle("muncul")
          ? (pengaturan.style.left = "0px")
          : (pengaturan.style.left = "-300px");
        break;
      default:
        "";
    }
  } else {
    spanSetting.classList.remove("d-none");
    spanArrow.forEach((e) => {
      e.classList.add("d-none");
    });
  }
  if (e.target.classList.contains("ini-urutan")) {
    worker1.postMessage(e.target.dataset.urutan);
    daftarSurahView(e.target.dataset.urutan);
  } else if (e.target.classList.contains("hapus-semua-setting")) {
    clearSetting();
  } else if (e.target.classList.contains("lihat-tafsir")) {
    worker2.postMessage([
      e.target.parentElement.parentElement.dataset.numbertafsir,
      e.target.parentElement.parentElement.dataset.numberayat,
      "tafsir",
    ]);
  } else if (e.target.classList.contains("copy-ayat")) {
    worker2.postMessage([
      e.target.parentElement.parentElement.dataset.numbertafsir,
      e.target.parentElement.parentElement.dataset.numberayat,
      "ayat",
    ]);
  } else if (e.target.classList.contains("copy-terjemahan")) {
    worker2.postMessage([
      e.target.parentElement.parentElement.dataset.numbertafsir,
      e.target.parentElement.parentElement.dataset.numberayat,
      "arti",
    ]);
  } else if (e.target.classList.contains("copy-tafsir")) {
    worker2.postMessage([
      e.target.parentElement.parentElement.dataset.numbertafsir,
      e.target.parentElement.parentElement.dataset.numberayat,
      "jelas",
    ]);
  } else if (e.target.classList.contains("copy-semua")) {
    worker2.postMessage([
      e.target.parentElement.parentElement.dataset.numbertafsir,
      e.target.parentElement.parentElement.dataset.numberayat,
      "semua",
    ]);
  } else if (e.target.classList.contains("close-pengaturan")) {
    e.target.parentElement.parentElement.classList.toggle("muncul");
    e.target.parentElement.parentElement.style.left = "-300px";
  } else if (e.target.classList.contains("pengaturan-bawah")) {
    const pengaturan = document.getElementById("container-pengaturan");
    pengaturan.classList.toggle("muncul")
      ? (pengaturan.style.left = "0px")
      : (pengaturan.style.left = "-300px");
  }
});

//ganti halaman dan sesuai klik 📌📌📌
function daftarSurahView(number) {
  const spanListSurah = document.querySelectorAll(".ini-urutan");
  spanListSurah.forEach((e) => {
    e.style.background = `${
      localStorage.getItem("backgroundListSurah")?.split(",")[0] ?? "grey"
    }`;
    e.style.color = `${
      localStorage.getItem("colorListSurah")?.split(",")[0] ?? "white"
    }`;
  });
  spanListSurah[number - 1].style.background = `${
    localStorage.getItem("bgJudulActive")?.split(",")[0] || "rgb(13,110,253)"
  }`;
  spanListSurah[number - 1].style.color = `${
    localStorage.getItem("j-color-active")?.split(",")[0] || "white"
  }`;
  spanListSurah[number - 1].scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center",
  });
}

const containerSurah = document.querySelector(".container-surah");
worker1.addEventListener("message", (e) => {
  containerSurah.innerHTML = e.data[0];

  localStorage.setItem("noSurah", e.data[2]);
  localStorage.removeItem("nomor");
  document.title = e.data[1];

  const spanPlay = document.querySelectorAll(".play-surah-dava");
  spanPlay.forEach((span) => {
    span.addEventListener("click", function () {
      playAudioSurah(
        e.data[2],
        this.dataset.numbersurah,
        e.data[1],
        spanPlay,
        span
      );
    });
    //
  });
  //

  setStyleHalaman();
  daftarSurahView(e.data[2]);
});

// worker ke 2 📌🟢
function copyBoard(copy, angka, pesan) {
  const surah = document.getElementsByClassName("ayat-quran")[angka - 1];
  let gagal = `gagal meyalin ${pesan} harap coba lagi`;
  let berhasil = `berhasil menyalin ${pesan} ke clipboard / papan klip`;
  const elemen = document.createElement("div");
  elemen.setAttribute("role", "alert");
  navigator.clipboard.writeText(copy).then(
    () => {
      elemen.setAttribute("class", "alert alert-success");
      elemen.append(berhasil);
      surah.prepend(elemen);
    },
    () => {
      elemen.setAttribute("class", "alert alert-danger");
      elemen.append(gagal);
      surah.prepend(elemen);
    }
  );
  setTimeout(() => {
    surah.firstElementChild.remove();
  }, 3000);
}

const modalDetailSurah = document.querySelector(".detailsurah");
worker2.addEventListener("message", (e) => {
  if (e.data[1] === "template") modalDetailSurah.innerHTML = e.data;
  else if (e.data[1] === "arab") copyBoard(e.data[0], e.data[2], "ayat");
  else if (e.data[1] === "tafsir") copyBoard(e.data[0], e.data[2], "tafsir");
  else if (e.data[1] === "arti") copyBoard(e.data[0], e.data[2], "terjemahan");
  else
    copyBoard(
      [
        `📌ayat: \n` +
          e.data[0] +
          "\n" +
          "📌arti: " +
          e.data[1] +
          "\n" +
          "📌tafsir: " +
          e.data[2],
      ],
      e.data[3],
      `ayat, arti,dan tafsir`
    );
});

const inputSetting = document.querySelectorAll(".setting-style");
inputSetting.forEach((input) => {
  input.addEventListener("change", () => {
    const targetUbah = document.querySelectorAll(
      `.${input.dataset.targetclass}`
    );
    if (input.classList.contains("active-style")) {
    } else {
      if (input.dataset.ubahstyle === "color") {
        targetUbah.forEach((e) => (e.style.color = input.value));
      } else if (input.dataset.ubahstyle === "background") {
        targetUbah.forEach((e) => (e.style.background = input.value));
      } else if (input.dataset.ubahstyle === "fontSize") {
        targetUbah.forEach((e) => (e.style.fontSize = input.value + "px"));
      } else if (input.dataset.ubahstyle === "borderColor") {
        targetUbah.forEach((e) => (e.style.borderColor = input.value));
      } else if (input.dataset.ubahstyle === "display") {
        targetUbah.forEach((e) => (e.style.display = input.value));
      }
    }

    localStorage.setItem(
      `${input.dataset.storagestyle}`,
      `${input.value},${input.dataset.targetclass},${input.dataset.ubahstyle}`
    );
  });
});

function checkStyle(checkStorage) {
  if (checkStorage) {
    let value = checkStorage.split(",");
    const elemenStyle = document.querySelectorAll(`.${value[1]}`);
    if (value[2] === "color") {
      elemenStyle.forEach((e) => (e.style.color = `${value[0]}`));
    } else if (value[2] === "background")
      elemenStyle.forEach((e) => (e.style.background = `${value[0]}`));
    else if (value[2] === "fontSize") {
      elemenStyle.forEach((e) => (e.style.fontSize = `${value[0]}px`));
    } else if (value[2] === "borderColor")
      elemenStyle.forEach((e) => (e.style.borderColor = `${value[0]}`));
    else if (value[2] === "display") {
      elemenStyle.forEach((e) => (e.style.display = `${value[0]}`));
    }
  }
}
function setStyleHalaman() {
  checkStyle(localStorage.getItem(`backgroundListSurah`));
  checkStyle(localStorage.getItem(`colorListSurah`));
  checkStyle(localStorage.getItem(`sizeListSurah`));
  checkStyle(localStorage.getItem(`borderListSurah`));
  checkStyle(localStorage.getItem(`colorHeader`));
  checkStyle(localStorage.getItem(`sizeHeader`));
  checkStyle(localStorage.getItem(`backgroundHeader`));
  checkStyle(localStorage.getItem(`sizeAyatArab`));
  checkStyle(localStorage.getItem(`colorAyatArab`));
  checkStyle(localStorage.getItem(`colorNumberArab`));
  checkStyle(localStorage.getItem(`backgroundNumber`));
  checkStyle(localStorage.getItem(`sizeNumber`));
  checkStyle(localStorage.getItem(`displayAyatIndo`));
  checkStyle(localStorage.getItem(`colorAyatIndo`));
  checkStyle(localStorage.getItem(`sizeAyatArti`));
  checkStyle(localStorage.getItem(`colorNumberIndo`));
  checkStyle(localStorage.getItem(`backgroundNumberIndo`));
  checkStyle(localStorage.getItem(`sizeNumberIndo`));
  checkStyle(localStorage.getItem(`playButtonColor`));
  checkStyle(localStorage.getItem(`backgroundPlayButton`));
  checkStyle(localStorage.getItem(`sizePLayButton`));
  checkStyle(localStorage.getItem(`backgroundAyat`));
  checkStyle(localStorage.getItem(`borderAyat`));
  checkStyle(localStorage.getItem(`displayAudio`));
  checkStyle(localStorage.getItem(`backgroundAudio`));
  checkStyle(localStorage.getItem(`sizeAudio`));
  checkStyle(localStorage.getItem(`colorAudio`));
  checkStyle(localStorage.getItem(`displayDrag`));
  checkStyle(localStorage.getItem(`backgroundDrag`));
  checkStyle(localStorage.getItem(`colorDrag`));
  checkStyle(localStorage.getItem(`sizeDrag`));
  checkStyle(localStorage.getItem(`displayAyatArti`));
}

function clearSetting() {
  let noSurahPage = localStorage.getItem("noSurah");
  confirm(
    "apakah anda yakin untuk menghapus tampilan saat ini,dan tampilan nya akan kembali setelan default/pengaturan awal aplikasi"
  )
    ? (localStorage.clear(),
      localStorage.setItem("noSurah", noSurahPage),
      location.reload())
    : "";
}
