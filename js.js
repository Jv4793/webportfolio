/* =========================================================
   Portfolio Config (EDITA AQUÍ)
   ========================================================= */

const PORTFOLIO = {
  person: {
    name: "Tu Nombre",
    role: "Developer en formación · Frontend",
    eyebrow: "Portfolio",
    headline: "Construyo proyectos reales para aprender rápido.",
    subheadline: "Este portfolio se actualiza automáticamente desde un listado JSON de ejercicios.",
    aboutSubtitle: "Quién soy y cómo trabajo.",
    aboutText:
      "Soy un/a desarrollador/a en formación con foco en frontend. Me gusta construir interfaces limpias, accesibles y responsivas, priorizando buenas prácticas y código mantenible.",
    availability: "Abierto/a a prácticas, junior roles y proyectos freelance.",
    details: [
      { label: "Ubicación", value: "España (remoto/híbrido)" },
      { label: "Enfoque", value: "UI · Frontend · Buenas prácticas" },
      { label: "Objetivo", value: "Aprender construyendo proyectos publicables" },
      { label: "Workflow", value: "Iteración → revisión → mejora" }
    ],
    goals: [
      "Dominar HTML semántico, CSS moderno y JavaScript.",
      "Mejorar accesibilidad (a11y) y responsive design.",
      "Crear proyectos pequeños, claros y bien documentados.",
      "Publicar en GitHub con commits limpios."
    ],
    stack: ["HTML", "CSS", "JavaScript", "Responsive", "Accesibilidad"]
  },

  links: {
    github: "https://github.com/tu-usuario",
    codepen: "https://codepen.io/tu-usuario",
    figma: "https://www.figma.com/@tu-usuario",
    email: "tuemail@ejemplo.com"
  },

  checklist: [
    "Header con nombre/rol y navegación",
    "Sección Sobre mí",
    "Sección Ejercicios/Proyectos auto-renderizada",
    "Sección Contacto con enlaces editables",
    "Diseño responsive",
    "Código modular y mantenible"
  ],

  /* =========================================================
     EJERCICIOS / PROYECTOS
     - Requeridos: title, description, tech (array), url
     - Opcionales (no obligatorios): details (string), level (string)
     ========================================================= */
  exercises: [
    {
      title: "JS – 2 Fotos (cambio de imagen)",
      description: "Ejercicio que cambia la imagen al hacer clic, usando JavaScript básico y DOM.",
      tech: ["HTML", "JavaScript", "DOM"],
      url: "https://codepen.io/XurxoXurde/pen/ZYOveWP"
    },
    {
      title: "JS – Meditación (UI + Interacción)",
      description: "Interacción sencilla para activar efectos en la UI con JavaScript.",
      tech: ["HTML", "CSS", "JavaScript", "UI"],
      url: "https://codepen.io/XurxoXurde/pen/ByzJWKJ"
    },
    {
      title: "Bucle for – JS Básico",
      description: "Práctica con bucles `for` para entrenar lógica y estructuras de control.",
      tech: ["JavaScript", "Lógica", "Bucles"],
      url: "https://codepen.io/XurxoXurde/pen/RNRxpmM"
    },
    {
      title: "Bucle for + Array – JS",
      description: "Bucles combinados con arrays para recorrer y manipular datos.",
      tech: ["JavaScript", "Arrays", "Bucles"],
      url: "https://codepen.io/XurxoXurde/pen/pvbpeXz"
    },
    {
      title: "Combinar 2 Arrays – JS",
      description: "Ejercicio para unir dos arrays aplicando lógica JavaScript.",
      tech: ["JavaScript", "Arrays", "Funciones"],
      url: "https://codepen.io/XurxoXurde/pen/azZEJep"
    }
  ]
};

/* =========================================================
   Utilities
   ========================================================= */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function createEl(tag, options = {}) {
  const el = document.createElement(tag);
  if (options.className) el.className = options.className;
  if (options.text != null) el.textContent = options.text;
  if (options.html != null) el.innerHTML = options.html;
  if (options.attrs) Object.entries(options.attrs).forEach(([k, v]) => el.setAttribute(k, v));
  return el;
}

function uniq(arr) {
  return [...new Set(arr)];
}

function normalizeText(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

function safeURL(url) {
  try {
    return new URL(url);
  } catch {
    return null;
  }
}

function parseCodepen(url) {
  const u = safeURL(url);
  if (!u) return null;

  const isCodepen = u.hostname === "codepen.io";
  if (!isCodepen) return null;

  const parts = u.pathname.split("/").filter(Boolean);
  // expected: /{user}/pen/{id}
  const user = parts[0];
  const type = parts[1];
  const id = parts[2];

  if (!user || type !== "pen" || !id) return null;

  return { user, id };
}

function buildCodepenShot(url) {
  const parsed = parseCodepen(url);
  if (!parsed) return null;
  // cpShots URL scheme
  return `https://shots.codepen.io/${parsed.user}/pen/${parsed.id}-512.webp`;
}

function iconUse(id) {
  return `<svg class="icon" width="18" height="18" aria-hidden="true" focusable="false"><use href="#${id}"></use></svg>`;
}

function hashHue(str) {
  // deterministic hue 0..359
  let h = 0;
  const s = String(str || "");
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h % 360;
}

/* =========================================================
   Theme
   ========================================================= */

const THEME_KEY = "portfolio_theme";

function getPreferredTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function applyTheme(theme) {
  document.documentElement.classList.toggle("theme-light", theme === "light");
  document.documentElement.classList.toggle("theme-dark", theme === "dark");
  localStorage.setItem(THEME_KEY, theme);

  const icon = $("#themeIcon");
  const label = $("#themeLabel");
  if (icon) icon.innerHTML = `<use href="#${theme === "light" ? "icon-sun" : "icon-moon"}"></use>`;
  if (label) label.textContent = theme === "light" ? "Claro" : "Oscuro";

  const toggle = $("#themeToggle");
  if (toggle) toggle.setAttribute("aria-label", `Cambiar a tema ${theme === "light" ? "oscuro" : "claro"}`);
}

/* =========================================================
   Render: Person + Hero + About
   ========================================================= */

function renderPerson() {
  $("#brandEyebrow").textContent = PORTFOLIO.person.eyebrow;
  $("#personName").textContent = PORTFOLIO.person.name;
  $("#personRole").textContent = PORTFOLIO.person.role;

  $("#heroHeadline").textContent = PORTFOLIO.person.headline;
  $("#heroSubheadline").textContent = PORTFOLIO.person.subheadline;

  $("#aboutSubtitle").textContent = PORTFOLIO.person.aboutSubtitle;
  $("#aboutText").textContent = PORTFOLIO.person.aboutText;
  $("#availabilityText").textContent = PORTFOLIO.person.availability;

  const goalsList = $("#goalsList");
  goalsList.innerHTML = "";
  PORTFOLIO.person.goals.forEach((g) => goalsList.appendChild(createEl("li", { text: g })));

  const details = $("#detailsList");
  details.innerHTML = "";
  PORTFOLIO.person.details.forEach((d) => {
    const row = createEl("div", { className: "dl-row" });
    row.appendChild(createEl("dt", { text: d.label }));
    row.appendChild(createEl("dd", { text: d.value }));
    details.appendChild(row);
  });

  const stack = $("#stackChips");
  stack.innerHTML = "";
  PORTFOLIO.person.stack.forEach((t) => {
    const pill = createEl("span", { className: "pill", text: t });
    pill.style.setProperty("--hue", String(hashHue(t)));
    stack.appendChild(pill);
  });

  $("#year").textContent = new Date().getFullYear();
  $("#footerText").innerHTML = `© <span id="year">${new Date().getFullYear()}</span> · ${PORTFOLIO.person.name} · Portfolio`;
}

function renderQuickLinks() {
  const links = [
    { label: "GitHub", icon: "icon-github", url: PORTFOLIO.links.github },
    { label: "CodePen", icon: "icon-codepen", url: PORTFOLIO.links.codepen },
    { label: "Figma", icon: "icon-figma", url: PORTFOLIO.links.figma }
  ];

  const quick = $("#quickLinks");
  quick.innerHTML = "";

  links.forEach((l) => {
    const a = createEl("a", {
      className: "social-link",
      attrs: { href: l.url, target: "_blank", rel: "noopener noreferrer", "aria-label": `${l.label} (abre en nueva pestaña)` }
    });

    const left = createEl("span", { className: "social-left" });
    left.innerHTML = `${iconUse(l.icon)}<span>${l.label}</span>`;

    const right = createEl("span", { attrs: { "aria-hidden": "true" } });
    right.innerHTML = iconUse("icon-external");

    a.appendChild(left);
    a.appendChild(right);
    quick.appendChild(a);
  });
}

function renderHeroMetrics(exercisesCount) {
  const metrics = $("#heroMetrics");
  metrics.innerHTML = "";

  const techCount = uniq(PORTFOLIO.exercises.flatMap((e) => e.tech)).length;
  const sectionsCount = 4;

  const items = [
    { kpi: String(exercisesCount), label: "Ejercicios indexados" },
    { kpi: String(techCount), label: "Tecnologías en uso" },
    { kpi: String(sectionsCount), label: "Secciones del portfolio" }
  ];

  items.forEach((m) => {
    const box = createEl("div", { className: "metric reveal" });
    box.appendChild(createEl("p", { className: "metric-kpi", text: m.kpi }));
    box.appendChild(createEl("p", { className: "metric-label", text: m.label }));
    metrics.appendChild(box);
  });
}

/* =========================================================
   Filtering
   ========================================================= */

const state = { query: "", tech: "ALL" };

function getAllTech() {
  return uniq(PORTFOLIO.exercises.flatMap((e) => e.tech)).sort((a, b) => a.localeCompare(b, "es"));
}

function createFilterChip(value, label) {
  const btn = createEl("button", {
    className: "chip",
    text: label,
    attrs: { type: "button", "data-tech": value, "aria-pressed": "false" }
  });

  btn.addEventListener("click", () => {
    state.tech = value;
    $$("#techFilters .chip").forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.tech === value)));
    updateProjects();
  });

  return btn;
}

function renderTechFilters() {
  const container = $("#techFilters");
  container.innerHTML = "";

  const allBtn = createFilterChip("ALL", "Todas");
  allBtn.setAttribute("aria-pressed", "true");
  container.appendChild(allBtn);

  getAllTech().forEach((t) => container.appendChild(createFilterChip(t, t)));
}

function matchesFilters(exercise) {
  const q = normalizeText(state.query);
  const techOK = state.tech === "ALL" || exercise.tech.includes(state.tech);
  if (!q) return techOK;

  const haystack = normalizeText([exercise.title, exercise.description, exercise.tech.join(" ")].join(" "));
  return techOK && haystack.includes(q);
}

/* =========================================================
   Projects Rendering (A + C + D + E)
   ========================================================= */

function makeThumb(exercise) {
  const thumb = createEl("div", { className: "project-thumb" });

  const overlay = createEl("div", { className: "project-thumb-overlay" });
  const badge = createEl("span", { className: "badge" });
  badge.innerHTML = `${iconUse("icon-codepen")}<span>CodePen</span>`;

  const idxHint = createEl("span", { className: "badge", attrs: { "aria-hidden": "true" } });
  idxHint.textContent = `${exercise.tech.length} tech`;

  overlay.appendChild(badge);
  overlay.appendChild(idxHint);

  const shotURL = buildCodepenShot(exercise.url);

  if (!shotURL) {
    thumb.classList.add("is-error");
    thumb.appendChild(overlay);
    return thumb;
  }

  const img = createEl("img", {
    attrs: {
      loading: "lazy",
      decoding: "async",
      alt: `Vista previa de: ${exercise.title}`,
      src: shotURL
    }
  });

  img.addEventListener("load", () => thumb.classList.add("is-loaded"));
  img.addEventListener("error", () => thumb.classList.add("is-error"));

  thumb.appendChild(img);
  thumb.appendChild(overlay);
  return thumb;
}

function makeTechPills(techList) {
  const wrap = createEl("div", { className: "project-tech", attrs: { "aria-label": "Tecnologías usadas" } });

  techList.forEach((t) => {
    const pill = createEl("span", { className: "pill", text: t });
    pill.style.setProperty("--hue", String(hashHue(t)));
    wrap.appendChild(pill);
  });

  return wrap;
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function makeDetails(exercise) {
  const details = createEl("details", { className: "details" });

  const summary = createEl("summary");
  const title = createEl("span", { className: "details-title" });
  title.innerHTML = `${iconUse("icon-spark")}<span>Detalles</span>`;

  const chev = createEl("span", { className: "details-chev", attrs: { "aria-hidden": "true" } });
  chev.innerHTML = iconUse("icon-sun"); // simple glyph as chevron-ish replacement? better: reuse icon-external rotated? we'll use icon-external for clarity
  chev.innerHTML = iconUse("icon-external");

  summary.appendChild(title);
  summary.appendChild(chev);

  const panel = createEl("div", { className: "details-panel" });

  const kv = createEl("div", { className: "details-kv" });

  const kv1 = createEl("div", { className: "kv" });
  kv1.appendChild(createEl("span", { className: "kv-label", text: "Tecnologías" }));
  const techValue = createEl("span", { className: "kv-value" });
  techValue.textContent = exercise.tech.join(" · ");
  kv1.appendChild(techValue);

  const kv2 = createEl("div", { className: "kv" });
  kv2.appendChild(createEl("span", { className: "kv-label", text: "Enlace" }));
  const linkValue = createEl("a", {
    className: "kv-value",
    text: "Abrir en CodePen",
    attrs: { href: exercise.url, target: "_blank", rel: "noopener noreferrer" }
  });
  kv2.appendChild(linkValue);

  kv.appendChild(kv1);
  kv.appendChild(kv2);

  const extra = createEl("p", { className: "muted tiny" });
  extra.textContent =
    exercise.details ||
    "Consejo: revisa el DOM, eventos y limpieza de código. Añade comentarios y una versión “refactor” para tu repo.";

  const actions = createEl("div", { className: "details-actions" });

  const open = createEl("a", {
    className: "btn btn-primary",
    attrs: { href: exercise.url, target: "_blank", rel: "noopener noreferrer", "aria-label": `Abrir ${exercise.title} en CodePen` }
  });
  open.innerHTML = `<span class="btn-icon" aria-hidden="true">${iconUse("icon-codepen")}</span><span class="btn-label">Abrir</span>`;

  const copy = createEl("button", {
    className: "btn btn-ghost",
    text: "Copiar enlace",
    attrs: { type: "button", "aria-label": `Copiar enlace de ${exercise.title}` }
  });

  copy.addEventListener("click", async () => {
    const ok = await copyToClipboard(exercise.url);
    copy.textContent = ok ? "¡Copiado!" : "No disponible";
    setTimeout(() => (copy.textContent = "Copiar enlace"), 900);
  });

  actions.appendChild(open);
  actions.appendChild(copy);

  panel.appendChild(kv);
  panel.appendChild(extra);
  panel.appendChild(actions);

  details.appendChild(summary);
  details.appendChild(panel);

  return details;
}

function renderProjects(list) {
  const grid = $("#projectsGrid");
  grid.innerHTML = "";

  const frag = document.createDocumentFragment();

  list.forEach((e, idx) => {
    const card = createEl("article", { className: "card project-card reveal" });

    // A: Thumbnail (cpShots)
    card.appendChild(makeThumb(e));

    const body = createEl("div", { className: "project-body" });

    const head = createEl("div", { className: "project-head" });
    head.appendChild(createEl("h3", { className: "project-title", text: e.title }));
    head.appendChild(createEl("p", { className: "project-desc", text: e.description }));

    // D: Colored tech pills
    const tech = makeTechPills(e.tech);

    // Primary quick actions
    const actions = createEl("div", { className: "project-actions" });

    const open = createEl("a", {
      className: "btn btn-primary project-link",
      attrs: { href: e.url, target: "_blank", rel: "noopener noreferrer", "aria-label": `Abrir ${e.title} en CodePen` }
    });
    open.innerHTML = `<span class="btn-icon" aria-hidden="true">${iconUse("icon-codepen")}</span><span class="btn-label">Abrir en CodePen</span>`;

    const copy = createEl("button", {
      className: "btn btn-ghost",
      text: "Copiar enlace",
      attrs: { type: "button", "aria-label": `Copiar enlace de ${e.title}` }
    });

    copy.addEventListener("click", async () => {
      const ok = await copyToClipboard(e.url);
      copy.textContent = ok ? "¡Copiado!" : "No disponible";
      setTimeout(() => (copy.textContent = "Copiar enlace"), 900);
    });

    actions.appendChild(open);
    actions.appendChild(copy);

    const meta = createEl("div", { className: "project-meta" });
    meta.appendChild(createEl("span", { text: `#${String(idx + 1).padStart(2, "0")}` }));
    meta.appendChild(createEl("span", { text: `${e.tech.length} tech` }));

    body.appendChild(head);
    body.appendChild(tech);
    body.appendChild(actions);
    body.appendChild(meta);

    card.appendChild(body);

    // C: Expandible details section
    const detailsWrap = createEl("div", { className: "project-details" });
    const detailsInner = createEl("div", { className: "project-details-inner" });
    detailsInner.appendChild(makeDetails(e));
    detailsWrap.appendChild(detailsInner);
    card.appendChild(detailsWrap);

    frag.appendChild(card);
  });

  grid.appendChild(frag);
}

function updateProjects() {
  const filtered = PORTFOLIO.exercises.filter(matchesFilters);
  renderProjects(filtered);

  $("#resultsCount").textContent = `${filtered.length} ejercicio${filtered.length === 1 ? "" : "s"}`;
  $("#emptyState").hidden = filtered.length !== 0;

  renderHeroMetrics(PORTFOLIO.exercises.length);
  refreshRevealObserver();
}

function bindSearch() {
  const input = $("#searchInput");

  input.addEventListener("input", (e) => {
    state.query = e.target.value || "";
    updateProjects();
  });

  $("#resetFilters").addEventListener("click", () => {
    state.query = "";
    state.tech = "ALL";
    input.value = "";

    $$("#techFilters .chip").forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.tech === "ALL")));
    updateProjects();
  });
}

/* =========================================================
   Contact Links + Form (mailto)
   ========================================================= */

function renderSocialLinks() {
  const container = $("#socialLinks");
  container.innerHTML = "";

  const links = [
    { label: "GitHub", icon: "icon-github", url: PORTFOLIO.links.github },
    { label: "CodePen", icon: "icon-codepen", url: PORTFOLIO.links.codepen },
    { label: "Figma", icon: "icon-figma", url: PORTFOLIO.links.figma },
    { label: "Email", icon: "icon-mail", url: `mailto:${PORTFOLIO.links.email}` }
  ];

  links.forEach((l) => {
    const a = createEl("a", {
      className: "social-link reveal",
      attrs: {
        href: l.url,
        target: l.label === "Email" ? "_self" : "_blank",
        rel: l.label === "Email" ? "" : "noopener noreferrer",
        "aria-label": `${l.label}${l.label === "Email" ? "" : " (abre en nueva pestaña)"}`
      }
    });

    const left = createEl("span", { className: "social-left" });
    left.innerHTML = `${iconUse(l.icon)}<span>${l.label}</span>`;

    const right = createEl("span", { attrs: { "aria-hidden": "true" } });
    right.innerHTML = l.label === "Email" ? "" : iconUse("icon-external");

    a.appendChild(left);
    a.appendChild(right);
    container.appendChild(a);
  });
}

function bindContactForm() {
  const form = $("#contactForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const fromName = String(data.get("fromName") || "").trim();
    const subject = String(data.get("subject") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!fromName || !subject || !message) return;

    const body = [
      `Hola, soy ${fromName}.`,
      "",
      message,
      "",
      "—",
      "Enviado desde mi portfolio"
    ].join("\n");

    const mailto = new URL(`mailto:${PORTFOLIO.links.email}`);
    mailto.searchParams.set("subject", subject);
    mailto.searchParams.set("body", body);

    window.location.href = mailto.toString();
    form.reset();
  });
}

function renderChecklist() {
  const list = $("#checklist");
  list.innerHTML = "";
  PORTFOLIO.checklist.forEach((item) => list.appendChild(createEl("li", { text: item })));
}

/* =========================================================
   Reveal Observer (E)
   ========================================================= */

let revealObserver = null;

function refreshRevealObserver() {
  if (revealObserver) revealObserver.disconnect();

  const prefersReduced =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReduced) {
    $$(".reveal").forEach((el) => el.classList.add("is-visible"));
    return;
  }

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
  );

  $$(".reveal").forEach((el) => revealObserver.observe(el));
}

/* =========================================================
   Init
   ========================================================= */

function initTheme() {
  const theme = getPreferredTheme();
  applyTheme(theme);

  $("#themeToggle").addEventListener("click", () => {
    const now = document.documentElement.classList.contains("theme-light") ? "light" : "dark";
    applyTheme(now === "light" ? "dark" : "light");
  });
}

function boot() {
  initTheme();

  renderPerson();
  renderQuickLinks();
  renderSocialLinks();
  renderChecklist();

  renderTechFilters();
  bindSearch();
  updateProjects();

  bindContactForm();

  // initial reveal
  refreshRevealObserver();
}

document.addEventListener("DOMContentLoaded", boot);
