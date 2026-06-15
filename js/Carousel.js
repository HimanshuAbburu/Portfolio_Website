/**
 * Carousel — manages scroll snapping, dot state, and keyboard/button navigation.
 *
 * Expects slides and dots to already be rendered in the DOM (by renderProjects).
 * This class is only responsible for the interaction layer (SRP).
 */
class Carousel {
  #track;
  #dots;
  #prevBtn;
  #nextBtn;
  #slides = [];
  #active = 0;

  constructor(track, dots, prevBtn, nextBtn) {
    this.#track   = track;
    this.#dots    = dots;
    this.#prevBtn = prevBtn;
    this.#nextBtn = nextBtn;
    this.#slides  = [...track.children];

    this.#bindDots();
    this.#bindNavButtons();
    this.#bindTrackEvents();
    this.#updateUI();

    window.addEventListener("resize", () => {
      this.#track.scrollTo({ left: this.#slides[this.#active]?.offsetLeft ?? 0 });
    }, { passive: true });
  }

  goTo(index) {
    const n = this.#slides.length;
    this.#active = ((index % n) + n) % n;
    this.#track.scrollTo({ left: this.#slides[this.#active].offsetLeft, behavior: "smooth" });
    this.#updateUI();
  }

  #updateUI() {
    [...this.#dots.children].forEach((btn, i) =>
      btn.setAttribute("aria-selected", i === this.#active ? "true" : "false")
    );
  }

  #bindDots() {
    [...this.#dots.children].forEach((dot, i) =>
      dot.addEventListener("click", () => this.goTo(i))
    );
  }

  #bindNavButtons() {
    this.#prevBtn?.addEventListener("click", () => this.goTo(this.#active - 1));
    this.#nextBtn?.addEventListener("click", () => this.goTo(this.#active + 1));
  }

  #bindTrackEvents() {
    this.#track.addEventListener("scroll", () => {
      const x = this.#track.scrollLeft;
      let nearest = 0, best = Infinity;
      this.#slides.forEach((slide, i) => {
        const dist = Math.abs(slide.offsetLeft - x);
        if (dist < best) { best = dist; nearest = i; }
      });
      if (nearest !== this.#active) {
        this.#active = nearest;
        this.#updateUI();
      }
    }, { passive: true });

    this.#track.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") this.goTo(this.#active + 1);
      if (e.key === "ArrowLeft")  this.goTo(this.#active - 1);
    });
  }
}
