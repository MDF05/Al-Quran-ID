addEventListener("message", (e) => {
  // /surah/{surah}/{ayah}
  // example: "/juz/30"

  fetch(`https://api.quran.gading.dev/surah/${e.data[0]}/${e.data[1]}`)
    .then((a) => a.json())
    .then((a) => {
      if (e.data[2] === "tafsir") {
        baru = `<div class="modal-dialog modal-xl modal-dialog-centered modal-fullscreen">
            <div class="modal-content">
                <div class="modal-header headerTafsir">
                    <h5 class="modal-title">
                    ${
                      a.data.surah.name.short
                    } - ${a.data.number.inSurah.toLocaleString("ar-EG")}<br> 
                    ${a.data.surah.name.transliteration.en}-${
          a.data.number.inSurah
        }</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-12 text-end fst-italic fs-1">
                            ${a.data.text.arab}
                        </div>
                        <div class="col-12 pt-4">
                            ${a.data.text.transliteration.en}
                        </div>
                        <div class="col-12 pt-2 text-center">
                            <h5>Terjemahan</h5>
                        </div>
                        <div class="col-12">
                            ${a.data.translation.id}
                        </div>
                    </div>
                    <div class="row pt-3">
                        <div class="col-12"><h5 class="text-center">Tafsir</h5></div>
                        <div class="col-12">${a.data.tafsir.id.long}</div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>`;
        postMessage([baru, "template"]);
      } else if (e.data[2] === "ayat")
        postMessage([a.data.text.arab, "arab", e.data[1]]);
      else if (e.data[2] === "jelas")
        postMessage([a.data.tafsir.id.long, "tafsir", e.data[1]]);
      else if (e.data[2] === "arti")
        postMessage([a.data.translation.id, "arti", e.data[1]]);
      else
        postMessage([
          a.data.text.arab,
          a.data.translation.id,
          a.data.tafsir.id.long,
          e.data[1],
        ]);
    });
});
