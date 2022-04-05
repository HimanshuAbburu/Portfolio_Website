// Hamburger Toggler
const menu = document.querySelector(".menuToggler");
const drop = document.querySelector(".dropdown");
let menuopen = false;
menu.addEventListener("click", () => {

    if (!menuopen) {
        menu.classList.add("open");
        drop.classList.add("open");
        menuopen = true;
    } else {
        menu.classList.remove("open");
        drop.classList.remove("open");
        menuopen = false;
    }
});

