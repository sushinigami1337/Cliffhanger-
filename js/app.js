/* =========================================================================
   OUTILS
   ========================================================================= */
// intrinsic sizes of the photos in img/ (width, height), used for srcset and to reserve space
const DIMS = { "affiche-choeur": [1080, 1531], "affiche-fsv": [741, 970], "affiche-inedit-2": [322, 462], "affiche-inedit": [800, 999], "affiche-par-endroits": [846, 1066], "bleu": [1080, 1587], "choeur-chemise": [2000, 1333], "choeur-duo": [2000, 1333], "choeur-jean": [1200, 1800], "groupe": [2048, 1365], "noir-blanc": [1197, 1800], "pull": [726, 1052], "rose": [1222, 2048], "script": [1080, 1616], "sourire": [1200, 1800], "trio": [1080, 1307], "vert": [1200, 1800] };

// <img> with a WebP srcset (960 px phones, 1440 px laptops, full size beyond) and real dimensions
function pic(name, { alt = "", sizes = "100vw", eager = false, cls = "", style = "", deferred = false } = {}){
  const [w, h] = DIMS[name];
  const set = [w > 960 && `img/${name}-960.webp 960w`, w > 1440 && `img/${name}-1440.webp 1440w`, `img/${name}.webp ${w}w`].filter(Boolean).join(", ");
  const small = w > 960 ? `img/${name}-960.webp` : `img/${name}.webp`;
  const load = eager ? `fetchpriority="high"` : deferred ? "" : `loading="lazy"`;
  const src = deferred ? `data-srcset="${set}" data-src="${small}"` : `srcset="${set}" src="${small}"`;
  return `<img ${cls ? `class="${cls}" ` : ""}${src} sizes="${sizes}" width="${w}" height="${h}" alt="${esc(alt)}" ${load} decoding="async"${style ? ` style="${style}"` : ""}>`;
}
// fetch the hover backdrops once the page is idle, so hovering a title shows its photo instantly
const loadDeferred = i => { i.srcset = i.dataset.srcset; i.src = i.dataset.src; i.removeAttribute("data-srcset"); };
function warm(scope){
  const go = () => scope.querySelectorAll("img[data-srcset]").forEach(loadDeferred);
  "requestIdleCallback" in window ? requestIdleCallback(go, { timeout: 2500 }) : setTimeout(go, 1200);
}
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
// French typography on every rendered text node: ’ instead of ', no-break space before : and inside « », thin one before ? ! ;
function typeset(root){
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  for (let n; (n = w.nextNode());) {
    const t = n.nodeValue
      .replace(/'/g, "\u2019")
      .replace(/ ([:])/g, "\u00a0$1")
      .replace(/ ([?!;»])/g, "\u202f$1")
      .replace(/« /g, "«\u00a0");
    if (t !== n.nodeValue) n.nodeValue = t;
  }
}
const bySlug = slug => SHOWS.find(s => s.slug === slug);
// the main site is about the Brussels company; Montréal has its own page
const BELGIUM = SHOWS.filter(s => s.troupe === "bruxelles");
const showHref = s => s.troupe === "montreal" ? "#/montreal" : `#/spectacle/${s.slug}`;
const personKey = p => Array.isArray(p) ? p[0] : p;
const personLink = key => PEOPLE[key] ? `<a class="person" href="#/personne/${key}">${esc(PEOPLE[key].name)}</a>` : esc(key);
const joinFr = items => items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} et ${items[items.length - 1]}`;
function creditLine(c){
  const people = (c.people || []).map(p => Array.isArray(p) ? `${personLink(p[0])} (${esc(p[1])})` : personLink(p));
  const value = [c.note && esc(c.note), people.length && joinFr(people), c.text && esc(c.text)].filter(Boolean).join(" ").replace(/’ /g, "’");
  return `<p><b>${esc(c.role)} :</b> ${value}</p>`;
}
// every show a person worked on, with their roles, newest first
function projectsOf(key){
  return SHOWS.map(show => ({ show, roles: show.credits.flatMap(c => {
      const entry = (c.people || []).find(p => personKey(p) === key);
      if (!entry) return [];
      const role = c.role === "Avec" ? "Interprétation" : c.role;
      return [Array.isArray(entry) ? `${role} (${entry[1]})` : role];
    }) })).filter(x => x.roles.length).sort((a, b) => b.show.year - a.show.year);
}
const today = () => new Date().toISOString().slice(0, 10);
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");

const dayFmt = new Intl.DateTimeFormat("fr-BE", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const dayParts = iso => Object.fromEntries(dayFmt.formatToParts(new Date(iso + "T00:00:00Z")).map(p => [p.type, p.value]));
const fmtDay = iso => { const p = dayParts(iso); return `${p.day} ${p.month} ${p.year}`; };
const fmtTime = t => t ? t.replace(":", "h") : "";
function fmtRange(a, b){
  if (a === b) return fmtDay(a);
  const A = dayParts(a), B = dayParts(b);
  const days = Math.round((new Date(b) - new Date(a)) / 864e5);
  const joint = days === 1 ? "et" : "au"; // "17 et 18 avr." for two nights, "24 au 26 mai" for a longer run
  if (A.year !== B.year) return `${fmtDay(a)} ${joint} ${fmtDay(b)}`;
  if (A.month !== B.month) return `${A.day} ${A.month} ${joint} ${B.day} ${B.month} ${B.year}`;
  return `${A.day} ${joint} ${B.day} ${B.month} ${B.year}`;
}
const place = d => [d.venue, d.city].filter(Boolean).join(", ");

// consecutive performances of one show in one venue become one agenda line
function runs(){
  const out = [];
  for (const s of BELGIUM) for (const d of s.dates) {
    const last = out[out.length - 1];
    const next = last && last.show === s && last.venue === d.venue && (new Date(d.day) - new Date(last.to)) <= 864e5;
    if (next) last.to = d.day;
    else out.push({ show: s, from: d.day, to: d.day, venue: d.venue, place: place(d) });
  }
  return out.sort((x, y) => y.from.localeCompare(x.from));
}

/* =========================================================================
   GABARITS
   ========================================================================= */
const footer = (pinned = false) => `<p class="foot${pinned ? " foot--pinned" : ""}">© ${new Date().getFullYear()} Compagnie Cliffhanger · Bruxelles · Montréal</p>`;

function backdrop(base, tone = ""){
  return `<div class="bgs ${tone}" aria-hidden="true">
    <figure>${pic(base, { eager: true })}</figure>
    ${BELGIUM.map(s => `<figure class="bg" data-for="${s.slug}">${pic(s.hero, { deferred: true, style: `object-position:${s.focus}` })}</figure>`).join("")}
  </div>`;
}

function showList(withYear){
  return `<ul class="list">${BELGIUM.map(s => `<li><a class="title" href="#/spectacle/${s.slug}" data-bg="${s.slug}" translate="no">${esc(s.title)}${withYear ? `<small>${s.year}</small>` : ""}</a></li>`).join("")}</ul>`;
}

const HINT = `<button class="hint js-hint" type="button" aria-label="Voir la suite"><span>Découvrir</span><span class="hint__line" aria-hidden="true"></span></button>`;

// punchline, poster, text, photos, credits and dates of one show
function showSections(s){
  const upcoming = s.dates.some(d => d.day >= today());
  return `<div class="section wrap"><blockquote class="punch"><p>${esc(s.punch)}</p>${s.cite ? `<cite>${esc(s.cite)}</cite>` : ""}</blockquote></div>
      ${s.poster ? `<div class="section wrap wrap--wide"><figure class="wide">${pic(s.poster, { alt: `Affiche de ${s.title}`, sizes: "(max-width: 56rem) 100vw, 50vw" })}</figure></div>` : ""}
      <div class="section wrap"><div class="prose prose--justify">${s.text.map(p => `<p>${esc(p)}</p>`).join("")}</div></div>
      ${s.slides?.length ? `<div class="section slider">
        <div class="slider__items js-track">${s.slides.map(([f, alt]) => `<figure class="slide">${pic(f, { alt, sizes: "(max-width: 40em) 90vw, 45vw" })}</figure>`).join("")}</div>
        ${s.slides.length > 1 ? `<div class="slider__nav"><button data-dir="-1" aria-label="Photo précédente">‹</button><button data-dir="1" aria-label="Photo suivante">›</button></div>` : ""}
      </div>` : ""}
      <div class="section wrap"><div class="infos">${s.credits.map(creditLine).join("")}${s.duration ? `<p><b>Durée :</b> ${esc(s.duration)}</p>` : ""}</div></div>
      <div class="section wrap"><h2 class="label">${upcoming ? "À venir" : "Représentations"}</h2>
        ${datesTable(s.dates.map(d => `<tr><td>${fmtDay(d.day)}${d.time ? `, ${fmtTime(d.time)}` : ""}</td><td>${esc(place(d))}</td><td>${esc(d.price || "")}</td></tr>`))}</div>`;
}
function wireSlider(view){
  const track = view.querySelector(".js-track");
  if (!track) return;
  view.querySelectorAll(".slider__nav button").forEach(b =>
    b.addEventListener("click", () => track.scrollBy({ left: track.clientWidth * .6 * b.dataset.dir, behavior: "smooth" })));
}

function datesTable(rows){
  return `<div class="table-wrap"><table class="events"><tbody>${rows.join("")}</tbody></table></div>`;
}

/* =========================================================================
   PAGES : chaque fonction remplit `view` et renvoie le titre de l'onglet
   ========================================================================= */
const pages = {
  home(view){
    view.innerHTML = `<section class="index index--home"><h1 class="v-h">Compagnie Cliffhanger, compagnie de théâtre bruxelloise</h1>${backdrop(BACKDROPS.home)}${showList(false)}${footer(true)}</section>`;
    hoverBackdrops(view);
  },

  spectacles(view){
    view.innerHTML = `<section class="index index--prod"><h1 class="v-h">Spectacles</h1>${backdrop(BACKDROPS.spectacles, "bgs--dim")}${showList(true)}${footer(true)}</section>`;
    hoverBackdrops(view);
    return "Spectacles";
  },

  spectacle(view, slug){
    const s = bySlug(slug);
    if (!s) { location.replace("#/spectacles"); return; }
    if (s.troupe === "montreal") { location.replace("#/montreal"); return; }
    view.innerHTML = `<article>
      <header class="phead">
        <figure>${pic(s.hero, { alt: s.title, eager: true, cls: "js-hero", style: `object-position:${s.focus}` })}</figure>
        ${HINT}
        <hgroup><h1 class="title title--xl" translate="no">${esc(s.title)}</h1><p>${s.year}</p></hgroup>
        ${s.credit ? `<figcaption>© ${esc(s.credit)}</figcaption>` : ""}
      </header>
      ${showSections(s)}
      <div class="wrap"><a class="back" href="#/spectacles">← Tous les spectacles</a></div>
      ${footer()}</article>`;
    wireSlider(view);
    return s.title;
  },

  agenda(view){
    const all = runs(), now = today();
    const next = all.filter(r => r.to >= now).reverse(), past = all.filter(r => r.to < now);
    const table = rows => datesTable(rows.map(r => `<tr><td>${fmtRange(r.from, r.to)}</td><td class="ev-title"><a href="#/spectacle/${r.show.slug}">${esc(r.show.title)}</a></td><td>${esc(r.place)}</td></tr>`));
    view.innerHTML = `<section class="page">${backdrop(BACKDROPS.agenda, "bgs--dark")}
      <div class="wrap wrap--wide">
        <h1 class="title title--xl title--page">Agenda</h1>
        ${next.length ? `<div class="section"><h2 class="label">À venir</h2>${table(next)}</div>` : ""}
        <div class="section">${next.length ? `<h2 class="label">Passées</h2>` : ""}${table(past)}</div>
      </div>${footer()}</section>`;
    return "Agenda";
  },

  compagnie(view){
    const team = Object.keys(PEOPLE).filter(k => !PEOPLE[k].guest && !PEOPLE[k].montreal);
    const belgianShows = k => projectsOf(k).filter(x => x.show.troupe === "bruxelles").map(x => x.show.title);
    view.innerHTML = `<article>
      <header class="phead">
        <figure>${pic(BACKDROPS.compagnie, { alt: "Portrait en coulisses", eager: true, cls: "js-hero", style: "object-position:50% 30%" })}</figure>
        ${HINT}
        <hgroup><h1 class="title title--xl">La compagnie</h1><p>Bruxelles, depuis 2018</p></hgroup>
      </header>
      <div class="section wrap"><p class="punch">Des spectacles inédits et originaux, et 1001 sensations. Car la Compagnie Cliffhanger, c'est une histoire sans fin.</p></div>
      <div class="section wrap"><div class="prose prose--justify">
        <p>Créée en 2018 dans les locaux de l'ULB par des passionnés de littérature, de théâtre et d'improvisation, la Compagnie Cliffhanger s'est d'abord fait remarquer avec une adaptation audacieuse des <em>Femmes savantes</em> de Molière, réinventée à la manière d'une sitcom des années 1980.</p>
        <p>Après la crise du COVID, la troupe a retrouvé le chemin des planches avec <em>Par Endroits</em>, une création originale, puis avec <em>L'Inédit de Molière</em>. Parallèlement, la compagnie s'est développée outre-Atlantique grâce à l'un de ses membres fondateurs, donnant naissance à un <a class="person" href="#/montreal">collectif-sœur à Montréal</a>, dont les liens perdurent aujourd'hui.</p>
      </div></div>
      <div class="section wrap"><h2 class="label">L'équipe</h2>
        <div class="table-wrap"><table class="events events--team"><tbody>${team.map(k => `<tr><td>${personLink(k)}</td><td>${esc(joinFr(belgianShows(k)))}</td></tr>`).join("")}</tbody></table></div>
      </div>
      ${footer()}</article>`;
    return "La compagnie";
  },

  montreal(view){
    const s = SHOWS.find(x => x.troupe === "montreal");
    view.innerHTML = `<article>
      <header class="phead">
        <figure>${pic(s.hero, { alt: s.title, eager: true, cls: "js-hero", style: `object-position:${s.focus}` })}</figure>
        ${HINT}
        <hgroup><h1 class="title title--xl">Montréal</h1><p>${esc(MONTREAL.sub)}</p></hgroup>
      </header>
      <div class="section wrap"><p class="punch">${esc(MONTREAL.lead)}</p></div>
      <div class="section wrap"><div class="prose prose--justify">${MONTREAL.text.map(p => `<p>${esc(p)}</p>`).join("")}</div></div>
      <div class="section wrap"><h2 class="title title--xl title--page">${esc(s.title)}</h2><p class="sub">${s.year}</p></div>
      ${showSections(s)}
      ${footer()}</article>`;
    wireSlider(view);
    return "Montréal";
  },

  personne(view, key){
    const who = PEOPLE[key];
    if (!who) { location.replace("#/compagnie"); return; }
    const projects = projectsOf(key);
    view.innerHTML = `<section class="page"><div class="wrap">
      <h1 class="title title--xl title--page">${esc(who.name)}</h1>
      <div class="section"><h2 class="label">Projets</h2>
        ${datesTable(projects.map(x => `<tr><td>${x.show.year}</td><td class="ev-title"><a href="${showHref(x.show)}">${esc(x.show.title)}</a></td><td>${esc(x.roles.join(", "))}</td></tr>`))}</div>
      ${who.bio ? `<div class="section"><h2 class="label">Biographie</h2><div class="prose prose--justify">${who.bio.map(p => `<p>${esc(p)}</p>`).join("")}</div></div>` : ""}
      <a class="back" href="#/compagnie">← La compagnie</a>
    </div>${footer()}</section>`;
    return who.name;
  },

  galerie(view){
    view.innerHTML = `<section class="page"><div class="wrap wrap--wide">
      <h1 class="title title--xl title--page">Galerie</h1>
      <div class="gallery">${GALLERY.map(([file, label], i) => `<figure><button data-i="${i}" aria-label="Agrandir la photo : ${esc(label)}">${pic(file, { alt: label, sizes: "(max-width: 40em) 100vw, (max-width: 64em) 50vw, 33vw" })}</button><figcaption>${esc(label)}</figcaption></figure>`).join("")}</div>
    </div>${footer()}</section>`;
    const ids = GALLERY.map((_, i) => i);
    view.querySelectorAll("[data-i]").forEach(b => b.addEventListener("click", () => lightbox.open(+b.dataset.i, ids)));
    return "Galerie";
  },

  contact(view){
    view.innerHTML = `<section class="contact">${backdrop(BACKDROPS.contact, "bgs--dim")}
      <div class="contact__inner">
        <h1 class="title title--xl title--page">Contact</h1>
        <p class="contact__lead">Réservations, diffusion, presse</p>
        <p class="contact__mail"><a href="mailto:${esc(CONTACT.email)}">${esc(CONTACT.email)}</a></p>
        <div class="pills">
          <a class="pill ext" href="${CONTACT.instagram}" target="_blank" rel="noopener">Instagram<span class="v-h"> (nouvel onglet)</span></a>
          <a class="pill ext" href="${CONTACT.facebook}" target="_blank" rel="noopener">Facebook<span class="v-h"> (nouvel onglet)</span></a>
        </div>
      </div>${footer(true)}</section>`;
    return "Contact";
  },
};

/* =========================================================================
   COMPORTEMENTS
   ========================================================================= */
// home & spectacles: hovering a title fades its photo in behind the list
function hoverBackdrops(view){
  const figs = view.querySelectorAll(".bg");
  const show = slug => figs.forEach(f => {
    const on = f.dataset.for === slug, i = f.querySelector("img[data-srcset]");
    if (on && i) loadDeferred(i);
    f.classList.toggle("is-visible", on);
  });
  warm(view);
  view.querySelectorAll("[data-bg]").forEach(a => {
    a.addEventListener("mouseenter", () => show(a.dataset.bg));
    a.addEventListener("focus", () => show(a.dataset.bg));
    a.addEventListener("mouseleave", () => show(null));
    a.addEventListener("blur", () => show(null));
  });
}

// entrance: each block glides down into place, one after another
const REVEAL = ".list li, .phead hgroup > *, .title--page, .pills, .section, .gallery figure, .contact__inner > *";
function reveal(scope, sel = REVEAL, step = .07, start = .1){
  if (reduceMotion.matches) return;
  scope.querySelectorAll(sel).forEach((el, i) => {
    el.classList.remove("rise"); void el.offsetWidth; // restart the animation
    el.style.setProperty("--d", Math.min(start + i * step, .9) + "s");
    el.classList.add("rise");
  });
}

// big photo at the top of a page blurs as you scroll past it
let scrollTick = false;
addEventListener("scroll", () => {
  if (scrollTick || reduceMotion.matches) return;
  scrollTick = true;
  requestAnimationFrame(() => {
    scrollTick = false;
    document.querySelectorAll(".view:last-child .js-hint").forEach(h => h.classList.toggle("hint--gone", scrollY > 40));
    const hero = document.querySelector(".view:last-child .js-hero");
    if (!hero) return;
    const p = Math.min(1, Math.max(0, (scrollY / innerHeight - .5) * 2));
    hero.style.filter = p ? `blur(${(p * 2).toFixed(2)}rem)` : "";
  });
}, { passive: true });

// menu
const burger = document.getElementById("burger");
const menu = document.getElementById("menu");
const menuVideo = document.getElementById("menuVideo");
function setMenu(open){
  document.body.classList.toggle("menu-open", open);
  burger.setAttribute("aria-expanded", open);
  burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
  if (open) {
    menu.querySelectorAll("[data-src]").forEach(i => { i.src = i.dataset.src; i.removeAttribute("data-src"); });
    if (menuVideo.dataset.poster) { menuVideo.poster = menuVideo.dataset.poster; delete menuVideo.dataset.poster; }
    if (!reduceMotion.matches) menuVideo.play().catch(() => {});
    menu.querySelector("a").focus({ preventScroll: true });
  } else {
    setTimeout(() => { if (!document.body.classList.contains("menu-open")) menuVideo.pause(); }, 300);
  }
}
// a link to the page already shown fires no hashchange, so close the menu on every click
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));

// keep Tab inside the open menu or lightbox
function trapTab(e, focusables){
  const f = focusables.filter(n => n.getClientRects().length);
  if (!f.length) return;
  const first = f[0], last = f[f.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
}

burger.addEventListener("click", () => {
  const open = !document.body.classList.contains("menu-open");
  setMenu(open);
  if (!open) burger.focus();
});

// lightbox
const lightbox = (() => {
  const box = document.getElementById("lightbox"), pic = document.getElementById("lbImg"), cap = document.getElementById("lbCap");
  let set = [], pos = 0, returnTo = null;
  const draw = () => { const g = GALLERY[set[pos]]; pic.src = `img/${g[0]}.webp`; pic.alt = g[1]; cap.textContent = `${g[1].replace(/'/g, "’")} · ${pos + 1} / ${set.length}`; };
  const step = d => { pos = (pos + d + set.length) % set.length; draw(); };
  document.getElementById("lbClose").addEventListener("click", () => api.close());
  document.getElementById("lbPrev").addEventListener("click", () => step(-1));
  document.getElementById("lbNext").addEventListener("click", () => step(1));
  box.addEventListener("click", e => { if (e.target === box) api.close(); });
  let x0 = null;
  box.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, { passive: true });
  box.addEventListener("touchend", e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1); x0 = null; });
  const api = {
    get isOpen(){ return !box.hidden; },
    open(i, ids){ returnTo = document.activeElement; set = ids; pos = ids.indexOf(i); draw(); box.hidden = false; document.getElementById("lbClose").focus(); },
    close(){ box.hidden = true; returnTo?.focus(); },
    step,
  };
  return api;
})();

document.addEventListener("keydown", e => {
  if (e.key === "Tab") {
    if (lightbox.isOpen) trapTab(e, [...document.querySelectorAll("#lightbox button")]);
    else if (document.body.classList.contains("menu-open")) trapTab(e, [burger, ...menu.querySelectorAll("a")]);
    return;
  }
  if (lightbox.isOpen) {
    if (e.key === "Escape") lightbox.close();
    if (e.key === "ArrowRight") lightbox.step(1);
    if (e.key === "ArrowLeft") lightbox.step(-1);
  } else if (e.key === "Escape" && document.body.classList.contains("menu-open")) {
    setMenu(false); burger.focus();
  }
});

/* =========================================================================
   NAVIGATION: the old page stays frozen underneath while the new one fades in
   ========================================================================= */
const host = document.getElementById("app");
history.scrollRestoration = "manual";
const scrollMemory = {};
let lastHash = location.hash, followingLink = false;
document.addEventListener("click", e => { if (e.target.closest('a[href^="#/"]')) followingLink = true; });

function route(){
  const [name, param] = location.hash.replace(/^#\/?/, "").split("/");
  scrollMemory[lastHash] = scrollY;
  const target = followingLink ? 0 : (scrollMemory[location.hash] || 0);
  followingLink = false; lastHash = location.hash;
  const render = pages[name] ? pages[name] : pages.home;
  setMenu(false);

  host.querySelectorAll("noscript, .view--leaving").forEach(n => n.remove());
  const old = host.querySelector(".view");
  if (old) {
    old.classList.add("view--leaving");
    old.style.top = `${-scrollY}px`;
  }

  const view = document.createElement("div");
  view.className = "view" + (old && !reduceMotion.matches ? " view--entering" : "");
  host.appendChild(view);
  const pageTitle = render(view, param);
  if (!view.firstChild) return; // redirected
  document.title = pageTitle ? `${pageTitle.replace(/'/g, "’")} · Compagnie Cliffhanger` : "Compagnie Cliffhanger";
  document.querySelectorAll(".menu a").forEach(a => a.toggleAttribute("aria-current", a.getAttribute("href") === `#/${name}`));
  document.querySelector(".menu a[aria-current]")?.setAttribute("aria-current", "page");
  typeset(view);
  scrollTo(0, target);
  reveal(view);
  view.querySelectorAll(".js-hint").forEach(h => h.addEventListener("click", () =>
    view.querySelector(".phead + .section")?.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth" })));

  if (!old) return;
  if (reduceMotion.matches) { old.remove(); return; }
  requestAnimationFrame(() => requestAnimationFrame(() => view.classList.remove("view--entering")));
  setTimeout(() => old.remove(), 800);
}
addEventListener("hashchange", route);
route();
