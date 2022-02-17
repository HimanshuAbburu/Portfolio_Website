// const home = document.querySelector('#Home')
const project1 = document.getElementById("project1");

// menuToggler.addEventListener('click', ev => {
//     menu.classList.toggle('open');
// });

// home.addEventListener('click', () => {
//     console.log('Scrolling');
//     window.scrollTo(0, 0);
// });

// project1.addEventListener("click", () => {
//   console.log("Shifting");
//   window.location.href = "./page2.html";
//   //   window.open("./page2.html");
// });

// function scrollToHome() {
// }

const menu = document.querySelector(".menuToggler");
const drop = document.querySelector(".dropdown");
let menuopen = false;
menu.addEventListener("click", () => {
  console.log("click");
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
