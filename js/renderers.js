/**
 * Section renderers — one exported function per section.
 *
 * Each function is pure in the DOM sense: it receives a target container
 * and the data it needs, renders into that container, and returns nothing.
 * Adding a new section never requires editing an existing renderer (OCP).
 */
// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

/**
 * Renders project slides into `trackEl` and dot buttons into `dotsEl`.
 * The Carousel controller is wired up separately in main.js (SRP).
 */
function renderProjects(projects, trackEl, dotsEl) {
  const tpl = document.getElementById("tpl-project");
  trackEl.innerHTML = "";

  projects.forEach((project, index) => {
    const node = tpl.content.cloneNode(true);

    _fillText(node, "kicker",  project.subtitle,  { removeIfEmpty: true });
    _fillText(node, "title",   project.title);
    _fillText(node, "desc",    project.desc,       { removeIfEmpty: true });

    if (project.explain) {
      _fillText(node, "explain", project.explain);
    } else {
      node.querySelector('[data-role="explain"]')?.remove();
      node.querySelector('[data-role="divider"]')?.remove();
    }

    _renderTags(node, project.tags);
    _renderProjectLinks(node, project);
    _renderCoverImage(node, project);

    // Dot button (index stored for Carousel to wire click handlers)
    const dot = el("button", {
      type: "button",
      role: "tab",
      className: "carousel-dot",
      "aria-label": project.title,
    });
    dot.dataset.index = index;
    dotsEl.append(dot);

    const slide = el("div", { className: "carousel-slide" });
    slide.append(node);
    trackEl.append(slide);
  });
}

function _fillText(node, role, text, { removeIfEmpty = false } = {}) {
  const target = node.querySelector(`[data-role="${role}"]`);
  if (!target) return;
  if (!text && removeIfEmpty) { target.remove(); return; }
  target.textContent = text ?? "";
}

function _renderTags(node, tags = []) {
  const container = node.querySelector('[data-role="tags"]');
  if (!container) return;
  tags.forEach((tag) => container.append(el("li", { className: "pill skill-tag" }, tag)));
  if (!container.childElementCount) container.remove();
}

function _renderProjectLinks(node, project) {
  const container = node.querySelector('[data-role="links"]');
  if (!container) return;
  if (project.code) container.append(_externalLink("Code", project.code));
  if (project.demo) container.append(_externalLink("Live", project.demo));
  if (!container.childElementCount) container.remove();
}

function _renderCoverImage(node, project) {
  const coverEl    = node.querySelector('[data-role="cover"]');
  const mediaEl    = coverEl?.closest(".project-card__preview");
  if (!coverEl || !mediaEl) return;

  const placeholder = _buildPlaceholder(project.title);
  const homepage    = project.demo || project.code;

  if (homepage) {
    coverEl.alt    = `${project.title} — homepage preview`;
    coverEl.src    = mshot(homepage, 900);
    coverEl.srcset = [
      `${mshot(homepage, 600)} 600w`,
      `${mshot(homepage, 900)} 900w`,
      `${mshot(homepage, 1200)} 1200w`,
    ].join(", ");
    coverEl.sizes  = "(min-width: 900px) 520px, 92vw";
    mediaEl.insertBefore(placeholder, coverEl);
    coverEl.addEventListener("load",  () => placeholder.classList.add("loaded"));
    coverEl.addEventListener("error", () => { coverEl.style.display = "none"; });
  } else {
    mediaEl.innerHTML = "";
    mediaEl.appendChild(placeholder);
  }
}

function _buildPlaceholder(title) {
  const div = document.createElement("div");
  div.className = "image-placeholder";
  div.innerHTML =
    `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <polyline points="21 15 16 10 5 21"/>
    </svg><span>${title}</span>`;
  return div;
}

function _externalLink(label, href) {
  return el("a", { className: "pill", href, target: "_blank", rel: "noopener noreferrer" }, label);
}

// ---------------------------------------------------------------------------
// Skills
// ---------------------------------------------------------------------------

function renderSkills(skills, gridEl) {
  const tpl = document.getElementById("tpl-skill");
  skills.forEach((skill) => {
    const node = tpl.content.cloneNode(true);
    node.querySelector('[data-role="title"]').textContent = skill.area;
    node.querySelector('[data-role="icon"]').innerHTML    = skill.icon ?? "";
    const items = node.querySelector('[data-role="items"]');
    skill.items.forEach((item) =>
      items.append(el("span", { className: "skill-tag" }, item))
    );
    gridEl.append(node);
  });
}

// ---------------------------------------------------------------------------
// Experience
// ---------------------------------------------------------------------------

function renderExperience(experience, listEl) {
  const tpl = document.getElementById("tpl-exp");
  experience.forEach((job) => {
    const node = tpl.content.cloneNode(true);
    node.querySelector('[data-role="role"]').textContent  = job.role;
    node.querySelector('[data-role="dates"]').textContent = job.dates;
    _renderCompany(node, job);

    const ul = node.querySelector('[data-role="bullets"]');
    job.bullets.forEach((bullet) => ul.append(el("li", {}, bullet)));
    listEl.append(node);
  });
}

function _renderCompany(node, job) {
  const companyEl = node.querySelector('[data-role="company"]');
  if (!companyEl) return;

  if (job.companyUrl) {
    const [name, location] = (job.company ?? "").split("·").map((s) => s.trim());
    const link = el("a", {
      href: job.companyUrl,
      target: "_blank",
      rel: "noopener noreferrer",
      "aria-label": `Visit ${name} website`,
    }, name || job.company);
    companyEl.textContent = "";
    companyEl.append(link);
    if (location) companyEl.append(document.createTextNode(` · ${location}`));
  } else {
    companyEl.textContent = job.company;
  }
}

// ---------------------------------------------------------------------------
// Education & Certifications
// ---------------------------------------------------------------------------

function renderEducation(education, certifications, containerEl) {
  const tpl = document.getElementById("tpl-edu");

  // Education card
  const eduNode = tpl.content.cloneNode(true);
  eduNode.querySelector('[data-role="title"]').textContent = education.title;
  eduNode.querySelector('[data-role="place"]').textContent = education.place;
  const eduList = eduNode.querySelector('[data-role="list"]');
  if (!education.list.length) {
    eduList.remove();
  } else {
    education.list.forEach((item) => eduList.append(el("li", {}, item)));
  }
  containerEl.append(eduNode);

  // Certifications card
  const certNode = tpl.content.cloneNode(true);
  certNode.querySelector('[data-role="title"]').textContent = "Certifications";
  certNode.querySelector('[data-role="place"]')?.remove();
  const certList = certNode.querySelector('[data-role="list"]');
  certifications.forEach((cert) => {
    const li = el("li", {});
    li.append(el("a", { href: cert.url ?? "#", target: "_blank", rel: "noopener noreferrer" }, cert.label));
    certList.append(li);
  });
  containerEl.append(certNode);
}
