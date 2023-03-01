addEventListener("message", (data) => {
  fetch(`https://api.npoint.io/99c279bb173a6e28359c/data`)
    .then((e) => e.json())
    .then((a) => {
      let elemenSurah = "";
      a.forEach((e) => {
        let noSurah = e.nomor;
        if (noSurah > 100) "";
        else if (noSurah > 10) noSurah = "0" + noSurah;
        else noSurah = "00" + noSurah;
        elemenSurah += `
            <div class="col-lg-4 col-md-6 col-sm-12 mb-4 penanda-container-surah">
                <ul class="list-group">
                    <li class="list-group-item active active-surah-view" aria-current="true">
                        <div class="row header-surah">
                            <div class="col-10 col-sm-11 d-flex justify-content-between click-surah-audio" data-numberSurah="${e.nomor}">
                                <span class="spesifik-surah click-surah-judul" data-numberSurah="${e.nomor}" >
                                    <span>${e.nomor}. </span>${e.nama} <span></span>
                                </span>
                                <span class="d-flex align-items-center">${e.asma}</span>
                            </div>
                            <div class="col-2 col-sm-1 d-grid align-items-center justify-content-center">
                                <span class="material-symbols-outlined">
                                    <span class="rounded-5 px-1 play-audio-button" data-numberSurah="${e.nomor}" 
                                        data-srcAudio="https://equran.nos.wjv-1.neo.id/audio-full/Misyari-Rasyid-Al-Afasi/${noSurah}.mp3" data-srccadangan="${e.audio}" data-dataSurah="${e.nomor},${e.asma},${e.nama},${e.ayat}">
                                        play_arrow
                                    </span>
                                </span>
                            </div>
                        </div>
                    </li>
                    <li class="list-group-item d-none">
                        <div class="row">
                            <div class="col-12 d-flex justify-content-between">
                                <span> ${e.type} </span>
                                <span>${e.arti}</span>
                            </div>
                        </div>
                        <div class="row pb-5">
                            <h5 class="pt-4 text-center">Tafsir</h5>
                            <div class="col-12">
                                ${e.keterangan}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col text-end">
                                <button type="button" class="btn btn-outline-danger button-close-tafsir">Close</button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        `;
      });
      postMessage(elemenSurah);
    });
});
