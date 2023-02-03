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

window.addEventListener("scroll", (e) => {
  const navdav = document.querySelector(".container-nav");

  scrollY > 150
    ? (navdav.style.background = "grey")
    : (navdav.style.background = "transparent");
});
