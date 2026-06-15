/**
 * PhotoFly — animates the hero profile photo into the nav avatar slot as the
 * user scrolls past the hero section.
 *
 * Phases:
 *   t 0→0.25  Cross-fade: hero fades out, fly element fades in at same position
 *   t 0.25→1  Fly travels from hero coordinates to nav avatar coordinates
 *   t = 1     Nav avatar becomes visible; fly element hides
 */

const lerp      = (a, b, t) => a + (b - a) * t;
const easeInOut = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

class PhotoFly {
  #heroWrap;
  #navAvatar;
  #heroPhoto;
  #headerEl;
  #flyEl;
  #navAvatarRect = null;
  #ticking       = false;
  #prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  constructor(heroWrap, navAvatar, heroPhoto, headerEl) {
    this.#heroWrap  = heroWrap;
    this.#navAvatar = navAvatar;
    this.#heroPhoto = heroPhoto;
    this.#headerEl  = headerEl;

    this.#flyEl = this.#createFlyElement();
    document.body.appendChild(this.#flyEl);

    // Sync the hero photo into the fly element and nav avatar once it loads
    this.#heroPhoto.addEventListener("load", () => this.#syncPhoto());

    this.#bindEvents();

    // Pre-position fly at hero location to avoid a flash at (0, 0)
    requestAnimationFrame(() => {
      this.#refreshNavRect();
      const r = this.#heroWrap.getBoundingClientRect();
      this.#flyEl.style.width     = r.width  + "px";
      this.#flyEl.style.height    = r.height + "px";
      this.#flyEl.style.transform = `translate(${r.left}px, ${r.top}px)`;
      this.#flyEl.style.fontSize  = r.width * 0.28 + "px";
      this.#update();
    });
  }

  // ── Private ──────────────────────────────────────────────────────────────

  #createFlyElement() {
    const div = document.createElement("div");
    div.className = "photo-fly";
    div.setAttribute("aria-hidden", "true");
    div.innerHTML = "<span>HA</span>";
    return div;
  }

  #syncPhoto() {
    [this.#flyEl, this.#navAvatar].forEach((container) => {
      const img = document.createElement("img");
      img.src = this.#heroPhoto.src;
      img.alt = "";
      container.appendChild(img);
    });
  }

  #refreshNavRect() {
    this.#navAvatarRect = this.#navAvatar.getBoundingClientRect();
  }

  #update() {
    const heroRect = this.#heroWrap.getBoundingClientRect();
    if (!this.#navAvatarRect) this.#refreshNavRect();

    const navH   = this.#headerEl.offsetHeight;
    const heroH  = heroRect.width; // circle: width === height
    const raw    = (navH - heroRect.top) / (heroH * 2);
    const t      = Math.max(0, Math.min(1, raw));

    const FADE        = 0.25;
    const heroOpacity = Math.max(0, 1 - t / FADE);
    const flyOpacity  = Math.min(1, t / FADE);
    const moveT       = t <= FADE ? 0 : (t - FADE) / (1 - FADE);
    const eased       = easeInOut(moveT);

    this.#heroWrap.style.opacity = String(heroOpacity);
    this.#flyEl.style.opacity    = String(flyOpacity);

    if (this.#prefersReduced) {
      this.#navAvatar.style.opacity = t >= 1 ? "1" : "0";
      return;
    }

    if (t >= 1) {
      this.#flyEl.style.opacity       = "0";
      this.#navAvatar.style.opacity   = "1";
      return;
    }

    this.#navAvatar.style.opacity = "0";

    // Interpolate size and centre point between hero and nav avatar
    const sx = heroRect.left + heroRect.width  / 2;
    const sy = heroRect.top  + heroRect.height / 2;
    const ss = heroRect.width;

    const { left, top, width } = this.#navAvatarRect;
    const ex = left  + width  / 2;
    const ey = top   + width  / 2;
    const es = width;

    const cx = lerp(sx, ex, eased);
    const cy = lerp(sy, ey, eased);
    const cs = lerp(ss, es, eased);

    this.#flyEl.style.width     = cs + "px";
    this.#flyEl.style.height    = cs + "px";
    this.#flyEl.style.fontSize  = cs * 0.28 + "px";
    this.#flyEl.style.transform = `translate(${cx - cs / 2}px, ${cy - cs / 2}px)`;
  }

  #bindEvents() {
    window.addEventListener("scroll", () => {
      if (!this.#ticking) {
        requestAnimationFrame(() => {
          this.#update();
          this.#ticking = false;
        });
        this.#ticking = true;
      }
    }, { passive: true });

    window.addEventListener("resize", () => {
      this.#refreshNavRect();
      this.#update();
    }, { passive: true });
  }
}
