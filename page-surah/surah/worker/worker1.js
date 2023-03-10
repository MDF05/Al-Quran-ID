addEventListener("message", (e) => {
  fetch(`https://quranapi.idn.sch.id/surah/${e.data}`)
    .then((e) => e.json())
    .then((e) => {
      console.log("hallo guys")
      let baru = "";
      baru += `
      <div class="row judul-surah py-2 px-1 m-0">
        <div class="col">
          <div
            class="col-12 fw-bold header-surah-number"
            data-numberquran="${e.number}" data-titlequran="${e.name}"
          >
            <div class="row">
              <div class="col d-flex justify-content-between">
                <span> ${e.translationId}</span>
                <span class="arab-asma">${e.asma}</span>
              </div>
            </div>
            <div class="row">
              <div class="col d-flex justify-content-between">
                <span> ${e.numberOfAyahs} ayat</span>
                <span>${e.typeId}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

      e.ayahs.forEach((a) => {
        baru += `
          <div class="row list-group-item p-0 m-0 ayat-setting-style">
            <div class="col-12 ayat-quran">
                <div class="row">
                  <div class="col-1 text-start p-0 m-0 d-flex flex-column flex-lg-row">
                    <span class="dropdown p-0 m-0 more-action" title="aksi lain">
                      <button
                        class="dropdown-toggle pt-1 p-0 m-0 aksi-tambahan-ayat"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false">
                        ${a.verseId}
                      </button>
                      <ul class="dropdown-menu" data-numberayat="${a.verseId}"
                        data-numbertafsir="${e.number}">
                        <li>
                          <span class="dropdown-item lihat-tafsir pin-surah-dava" data-bs-toggle="modal" data-bs-target="#detailsurah">
                            lihat tafsir dan detail
                          </span>
                        </li>
                        <li >
                          <span class="dropdown-item copy-ayat pin-surah-dava">
                            copy ayat
                          </span>
                        </li>
                        <li>
                          <span class="dropdown-item copy-terjemahan pin-surah-dava">
                            copy terjemahan
                          </span>
                        </li>
                        <li>
                          <span class="dropdown-item copy-tafsir pin-surah-dava">
                            copy tafsir
                          </span>
                        </li>
                        <li>
                          <span class="dropdown-item copy-semua pin-surah-dava">
                            copy semua
                          </span>
                        </li>
                      </ul>
                    </span>
                    <button type="button"
                      class="material-symbols-outlined play-surah-dava ms-lg-2 mt-1 mt-lg-0"
                      data-numbersurah="${a.verseId}"
                      title="play audio">
                      play_arrow
                    </button>
                  </div>
                  <div class="col-11 text-end fst-italic color-ayah">
                    ${a.ayahText}
                    <span class="rounded-circle  px-2 urutan-ayat-surah">
                      ${a.verseId.toLocaleString("ar-EG")}
                    </span>
                  </div>
              </div>
              <div class="row pt-3">
                <div class="col-12 read-indonesia">${a.readText}</div>
                <div class="col-12 arti-indonesia">${a.indoText}</div> 
              </div>
            </div>
          </div>
          `;
      });
      postMessage([baru, e.name, e.number]);
    });
});
