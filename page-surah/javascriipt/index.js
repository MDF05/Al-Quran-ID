const buttonNav = document.querySelector("nav button");
const togleItems = document.querySelector(".toggler-nav");

buttonNav.addEventListener("click", function () {
  Array.from(this.children).forEach((e) => {
    e.classList.toggle("d-none");
  });

  const buttonSearch = document.querySelector(".nav-item form button");
  buttonSearch.classList.toggle("btn-dark");

  togleItems.classList.toggle("d-flex");
});

function loadingPageDava() {
  const load = document.createElement("div");
  load.innerHTML += `
      <div class="spinner"></div>
      <h6 class="text-light text-capitalize my-1">loading...</h6>
      `;
  return function loadingDava(display) {
    document.body.append(load);
    load.style.position = "fixed";
    load.style.top = "0";
    load.style.width = "100%";
    load.style.height = "100%";
    load.style.display = `${display}`;
    load.style.placeContent = "center";
  };
}

const halamanSurah = function (url, succes) {
  const load = loadingPageDava();
  load("grid");
  fetch(`${url}`)
    .then((e) => e.json())
    //
    .then((e) => succes(e))
    .catch((e) => {
      document.body.innerHTML = `
         <div class="container text-light eror-handling" style=" min-height:100vh; display:grid; place-content:center;">
           <div class="row d-flex justify-content-center dava-error-handling">
              <a href="https://storyset.com/internet"> 
                <img src="../../Al-Quran/my logo/Oops! 404 Error with a broken robot-cuate.png" class="img-fluid" style="width:200px">
              </a>
            </div>
             <div class="row" style="padding:0; margin:0;"><h4 style="padding:0; margin:0;">Erorr No Internet</h4></div>
              <div class="row" style="padding:0; margin:0;"><h4 style="padding:0; margin:0;">${e}</h4></div>
               <div class="row">
                 <h4>Try</h4>
                   <ul>
                     <li>Checking the network cables, modem, and router</li>
                     <li>Reconnecting to Wi-Fi</li>
                     <li>Running Windows Network Diagnostics</li>
                   </ul>
               </div>
               <h3>ERR_INTERNET_DISCONNECTED</h3>
            </div>`;
    })
    .finally(
      setTimeout(() => {
        load("none");
      }, 1000)
    );
};

function daftarSurahElemen(elemen) {
  return `
  <ol class="list-group col-sm-12 col-md-6 col-lg-4 ol-list-surah p-0 m-0 bg-light">
    <li class="row p-0 m-0">
      <a href="surah/surah.html" class="baca-surah text-decoration-none col list-group-item d-flex justify-content-between align-items-start" data-number="${elemen.number}">
        <div>${elemen.number}</div>
        <div class="ms-2 me-auto">
          <div class="fw-bold">${elemen.name}</div>
          ${elemen.translationId} 
        </div>
        <div class="text-end asma-surah">
          <div class="fs-4">${elemen.asma}</div>
          <span class="badge bg-primary rounded-pill">${elemen.numberOfAyahs}</span>
        </div>
      </a>
    </li>
  </ol>
    `;
  //
}

halamanSurah("https://quranapi.idn.sch.id/surah", (e) => {
  const daftarSurah = document.querySelector(".home-page .daftar-surah");
  const surah = e.data;
  surah.forEach((a) => {
    daftarSurah.innerHTML += daftarSurahElemen(a);
  });
  //
  const aNumberSurah = document.querySelectorAll(".baca-surah");
  aNumberSurah.forEach((e) => {
    e.addEventListener("click", function () {
      localStorage.setItem("noSurah", e.dataset.number);
    });
    //
  });
  //
});
//
