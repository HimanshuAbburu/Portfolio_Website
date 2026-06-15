/**
 * Entry point — wires all modules together.
 * Depends on data.js, utils.js, renderers.js, Carousel.js,
 * NavController.js, and PhotoFly.js being loaded before this file.
 */

// ── Render content sections ──────────────────────────────────────────────────

renderExperience(
  DATA.experience,
  document.getElementById("exp-list")
);

renderSkills(
  DATA.skills,
  document.getElementById("skills-grid")
);

const trackEl = document.getElementById("projects-track");
const dotsEl  = document.getElementById("proj-dots");
renderProjects(DATA.projects, trackEl, dotsEl);
new Carousel(
  trackEl,
  dotsEl,
  document.getElementById("proj-prev"),
  document.getElementById("proj-next")
);

renderEducation(
  DATA.education,
  DATA.certifications,
  document.getElementById("edu-cert")
);

// ── Footer year ──────────────────────────────────────────────────────────────

document.getElementById("year").textContent = new Date().getFullYear();

// ── Navigation ───────────────────────────────────────────────────────────────

const nav = new NavController();

// ── Hero photo ───────────────────────────────────────────────────────────────

const heroPhoto = document.getElementById("hero-photo");
if (heroPhoto?.src) {
  heroPhoto.addEventListener("load",  () => heroPhoto.classList.add("loaded"));
  heroPhoto.addEventListener("error", () => heroPhoto.remove());
}

// ── Scroll-driven avatar transition ─────────────────────────────────────────

const heroWrap  = document.querySelector(".hero-photo-wrap");
const navAvatar = document.getElementById("nav-avatar");
if (heroWrap && navAvatar && heroPhoto) {
  new PhotoFly(heroWrap, navAvatar, heroPhoto, nav.headerEl);
}

// ── Scroll-reveal ────────────────────────────────────────────────────────────

const revealObserver = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        revealObserver.unobserve(e.target);
      }
    }),
  { threshold: 0.1 }
);
document.querySelectorAll(".animate-ready").forEach((el) =>
  revealObserver.observe(el)
);

