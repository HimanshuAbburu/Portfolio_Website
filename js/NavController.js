/**
 * NavController — owns three distinct nav behaviours (SRP per method):
 *   1. Scroll progress bar
 *   2. Active nav link tracking via IntersectionObserver
 *   3. Hamburger menu toggle
 *
 * Exposes `headerEl` so other controllers (e.g. PhotoFly) can read nav height
 * without duplicating the querySelector call.
 */
class NavController {
  #headerEl;
  #progressEl;
  #navToggle;
  #siteNav;

  constructor() {
    this.#headerEl  = document.querySelector("header.site");
    this.#progressEl = document.getElementById("scroll-progress");
    this.#navToggle = document.getElementById("nav-toggle");
    this.#siteNav   = document.getElementById("site-nav");

    this.#initNavHeight();
    this.#initProgress();
    this.#initActiveLinks();
    this.#initHamburger();
  }

  get headerEl() { return this.#headerEl; }

  // ── Nav height CSS variable ──────────────────────────────────────────────

  #initNavHeight() {
    const sync = () =>
      document.documentElement.style.setProperty(
        "--nav-h",
        this.#headerEl.offsetHeight + "px"
      );
    sync();
    window.addEventListener("resize", sync);
  }

  // ── Scroll progress bar ──────────────────────────────────────────────────

  #initProgress() {
    const update = () => {
      const scrolled = document.documentElement.scrollTop || document.body.scrollTop;
      const total    = document.documentElement.scrollHeight - window.innerHeight;
      this.#progressEl.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + "%";
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
  }

  // ── Active link tracking ─────────────────────────────────────────────────

  #initActiveLinks() {
    const links    = [...document.querySelectorAll('.nav a[href^="#"]')];
    const sections = links
      .map((a) => document.getElementById(a.getAttribute("href").slice(1)))
      .filter(Boolean);

    // Track the visible ratio of every section; highlight the most visible one
    const ratioMap = new Map(sections.map((s) => [s.id, 0]));

    const setActive = (id) => {
      links.forEach((a) => a.removeAttribute("aria-current"));
      const link = links.find((a) => a.getAttribute("href") === `#${id}`);
      if (!link) return;
      link.setAttribute("aria-current", "page");
      link.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
    };

    const thresholds = Array.from({ length: 21 }, (_, i) => i / 20);
    const observer   = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => ratioMap.set(e.target.id, e.intersectionRatio));
        let bestId = null, bestRatio = 0;
        ratioMap.forEach((ratio, id) => {
          if (ratio > bestRatio) { bestRatio = ratio; bestId = id; }
        });
        if (bestId) setActive(bestId);
      },
      { rootMargin: "-10% 0px -10% 0px", threshold: thresholds }
    );

    sections.forEach((s) => observer.observe(s));
  }

  // ── Hamburger toggle ─────────────────────────────────────────────────────

  #initHamburger() {
    this.#navToggle?.addEventListener("click", () => {
      const open = this.#siteNav.classList.toggle("open");
      this.#navToggle.setAttribute("aria-expanded", open);
      this.#navToggle.textContent = open ? "✕" : "☰";
    });

    this.#siteNav?.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        this.#siteNav.classList.remove("open");
        this.#navToggle?.setAttribute("aria-expanded", "false");
        if (this.#navToggle) this.#navToggle.textContent = "☰";
      })
    );
  }
}
