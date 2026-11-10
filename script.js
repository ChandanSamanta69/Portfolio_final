/* =====================================================
   CHANDAN SAMANTA — PORTFOLIO INTERACTIONS
   Data lives in data.js. Scene lives in scene.js.
   ===================================================== */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover:hover) and (pointer:fine)").matches;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const CAT_LABEL = { internship: "Internship", course: "Course", workshop: "Workshop", award: "Award" };
  const CERT_BY_ID = Object.fromEntries(CERTS.map((c, i) => [c.id, i]));
  const CAT_ICON = { internship: "◆", course: "▲", workshop: "●", award: "★" };

  /* ---------- missing-asset fallbacks (page never shows a broken image) ---------- */
  function fallback(img) {
    const kind = img.dataset.fallback;
    if (kind === "sig") { img.insertAdjacentHTML("afterend", `<span class="sig-text" aria-label="Chandan Samanta signature">Chandan Samanta</span>`); img.remove(); }
    else if (kind === "portrait") { img.insertAdjacentHTML("afterend", `<div class="portrait-ph" aria-hidden="true"><b>CS</b><small>AI · ML · CV</small></div>`); img.remove(); }
    else if (kind === "cert") {
      const c = CERTS[CERT_BY_ID[img.dataset.id]];
      img.insertAdjacentHTML("afterend", `<div class="cert-ph ph-${c.cat}" aria-hidden="true"><i>${CAT_ICON[c.cat]}</i><b>${esc(c.title)}</b><small>${esc(c.org)}</small></div>`); img.remove();
    }
  }
  document.addEventListener("error", e => { const t = e.target; if (t && t.tagName === "IMG" && t.dataset && t.dataset.fallback) fallback(t); }, true);
  $$("img[data-fallback]").forEach(img => { if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) fallback(img); });
  // hide links to files that are not uploaded yet (e.g. résumé) — only when served over http(s)
  const exists = url => location.protocol.startsWith("http") ? fetch(url, { method: "HEAD", cache: "no-store" }).then(r => r.ok && !/text\/html/.test(r.headers.get("content-type") || "")).catch(() => true) : Promise.resolve(true);
  $$("[data-asset]").forEach(a => exists(a.getAttribute("href")).then(ok => { if (!ok) a.hidden = true; }));

  /* ---------- hero stats come from data.js so they never drift ---------- */
  const STAT = {
    internships: CERTS.filter(c => c.cat === "internship" && !/recommendation/i.test(c.title)).length,
    certs: CERTS.length,
    projects: PROJECTS.length
  };
  $$("[data-stat]").forEach(el => { el.dataset.count = STAT[el.dataset.stat]; });

  /* ---------- render: ticker ---------- */
  (function () {
    const words = ["ARTIFICIAL INTELLIGENCE", "MACHINE LEARNING", "COMPUTER VISION", "GENERATIVE AI", "NLP", "DATA ENGINEERING", "ROBOTICS", "AGENTIC AI"];
    const one = words.map(w => `<span>${w}</span><b>✳</b>`).join("");
    $("#tickerTrack").innerHTML = one + one;
  })();

  /* ---------- render: skills ---------- */
  $("#skillGrid").innerHTML = SKILLS.map((s, i) => `
    <article class="card skill-card tilt glow rv" data-tilt="8" style="--d:${(i % 3) * 0.08}s">
      <span class="num pop">${s.n}</span><h3 class="pop">${esc(s.title)}</h3>
      <div class="chips">${s.items.map(x => `<span>${esc(x)}</span>`).join("")}</div>
    </article>`).join("");

  /* ---------- render: projects ---------- */
  $("#projectGrid").innerHTML = PROJECTS.map((p, i) => `
    <article class="card project-card tilt glow rv" data-tilt="9" style="--d:${(i % 3) * 0.08}s">
      <div class="p-top pop"><span>PROJECT</span><span class="p-num">${String(i + 1).padStart(2, "0")}</span></div>
      <h3 class="pop">${esc(p.title)}</h3>
      <div class="p-meta">${esc(p.meta)}</div>
      <p class="p-desc">${esc(p.desc)}</p>
      <div class="tags">${p.tags.map(t => `<span>${esc(t)}</span>`).join("")}</div>
    </article>`).join("");

  /* ---------- render: experience ---------- */
  const tl = $("#timeline");
  tl.insertAdjacentHTML("beforeend", EXPERIENCE.map(e => `
    <div class="tl-item">
      <i class="tl-node"></i>
      <article class="card tl-card tilt glow rv" data-tilt="5">
        <div class="tl-head"><span class="tl-date">${esc(e.date)}</span>${e.badge ? `<span class="tl-badge">${esc(e.badge)}</span>` : ""}</div>
        <h3>${esc(e.role)}</h3>
        <div class="tl-org">${esc(e.org)}</div>
        <div class="tl-place">${esc(e.place)}</div>
        <ul>${e.points.map(p => `<li>${esc(p)}</li>`).join("")}</ul>
        <div class="tags">${e.tags.map(t => `<span>${esc(t)}</span>`).join("")}</div>
        ${e.certs && e.certs.length ? `<div class="tl-certs">${e.certs.map(id => `<button type="button" data-cert="${id}" data-cursor="VIEW">📄 ${esc(CERTS[CERT_BY_ID[id]].title.length > 38 ? CERTS[CERT_BY_ID[id]].title.slice(0, 36) + "…" : CERTS[CERT_BY_ID[id]].title)}</button>`).join("")}</div>` : ""}
      </article>
    </div>`).join(""));

  /* ---------- render: honours ---------- */
  $("#honorGrid").innerHTML = HONORS.map((h, i) => `
    <article class="card honor-card tilt glow rv ${h.tag.startsWith("PUB") ? "pub" : h.tag === "LEADERSHIP" ? "lead" : ""}" data-tilt="8" style="--d:${(i % 3) * 0.08}s">
      <span class="tag pop">${esc(h.tag)}</span><h3 class="pop">${esc(h.title)}</h3><p>${esc(h.text)}</p>
      ${h.cert ? `<button class="link" type="button" data-cert="${h.cert}" data-cursor="VIEW">VIEW CERTIFICATE ↗</button>` : ""}
    </article>`).join("");

  /* ---------- render: certificates + filters ---------- */
  const FILTERS = [["all", "All"], ["internship", "Internships"], ["course", "Courses"], ["workshop", "Workshops"], ["award", "Awards"]];
  let curFilter = "all", showAll = false;
  const FIRST = 9;
  $("#certFilters").innerHTML = FILTERS.map(([k, l]) => {
    const n = k === "all" ? CERTS.length : CERTS.filter(c => c.cat === k).length;
    return `<button class="filter${k === "all" ? " active" : ""}" data-filter="${k}" role="tab" aria-selected="${k === "all"}">${l}<small>${n}</small></button>`;
  }).join("");
  function renderCerts() {
    const list = CERTS.filter(c => curFilter === "all" || c.cat === curFilter);
    const shown = showAll || list.length <= FIRST + 3 ? list : list.slice(0, FIRST);
    $("#certGrid").innerHTML = shown.map((c, i) => `
      <article class="card cert-card tilt glow" data-tilt="8" data-cert="${c.id}" data-cursor="VIEW" tabindex="0" role="button" aria-label="Open ${esc(c.title)}" style="--i:${i}">
        <div class="cert-thumb"><img src="assets/previews/${c.prev}" alt="${esc(c.title)} — preview" loading="lazy" data-fallback="cert" data-id="${c.id}"></div>
        <div class="cert-info"><span class="cert-cat cat-${c.cat}">${CAT_LABEL[c.cat]}</span><h3>${esc(c.title)}</h3><div class="cert-org">${esc(c.org)}</div><div class="cert-date">${esc(c.date)}</div></div>
      </article>`).join("");
    $("#certCount").textContent = `Showing ${shown.length} of ${list.length} documents`;
    const more = $("#certMore"); more.hidden = shown.length === list.length;
    more.querySelector("span").textContent = `Show all ${list.length} documents`;
    bindTilt($("#certGrid"));
  }
  $("#certFilters").addEventListener("click", e => {
    const b = e.target.closest(".filter"); if (!b) return;
    curFilter = b.dataset.filter; showAll = false;
    $$(".filter").forEach(x => { x.classList.toggle("active", x === b); x.setAttribute("aria-selected", x === b); });
    renderCerts();
  });
  $("#certMore").addEventListener("click", () => { showAll = true; renderCerts(); });
  $("#year").textContent = new Date().getFullYear();

  /* ---------- hero name split ---------- */
  $$("[data-split]").forEach(el => {
    const txt = el.textContent; el.setAttribute("aria-hidden", "true");
    el.innerHTML = [...txt].map((c, i) => `<span class="ch" style="--i:${i + (el.closest(".n2") ? 7 : 0)}">${c}</span>`).join("");
  });

  /* per-letter colour for SAMANTA (red -> purple -> blue) + auto-fit so no font can overflow its column */
  (function () {
    const stops = [[255, 31, 68], [190, 80, 255], [70, 130, 255]];
    const chs = $$(".name .n2 .ch");
    chs.forEach((c, i) => {
      const t = chs.length > 1 ? i / (chs.length - 1) : 0, seg = t < 0.5 ? 0 : 1, u = seg ? (t - 0.5) * 2 : t * 2, a = stops[seg], b = stops[seg + 1];
      c.style.color = `rgb(${a.map((v, k) => Math.round(v + (b[k] - v) * u)).join(",")})`;
    });
    const nm = $(".name"), box = nm.parentElement;
    function fit() {
      nm.style.fontSize = "";
      const avail = box.clientWidth, l1 = $(".n1", nm), l2 = $(".n2", nm);
      const w1 = l1.getBoundingClientRect().width, w2 = l2.lastElementChild.getBoundingClientRect().right - l2.firstElementChild.getBoundingClientRect().left;
      const need = Math.max(w1, w2);
      if (need > avail) nm.style.fontSize = (parseFloat(getComputedStyle(nm).fontSize) * (avail / need) * 0.97).toFixed(1) + "px";
    }
    fit(); addEventListener("resize", fit); addEventListener("load", fit);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  })();

  /* ---------- loader ---------- */
  const loader = $("#loader"), CH = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&01";
  (function boot() {
    let seenBefore = false; try { seenBefore = sessionStorage.getItem("cs-seen") === "1"; sessionStorage.setItem("cs-seen", "1"); } catch (e) {}
    const t0 = performance.now(), dur = reduce ? 200 : seenBefore ? 500 : 1800, label = $("#ldText"), target = "ULTRON.ML";
    let revealed = false;
    (function tick() {
      const k = Math.min((performance.now() - t0) / dur, 1);
      $("#ldBar").style.width = (k * 100) + "%"; $("#ldPct").textContent = Math.round(k * 100);
      let o = ""; for (let i = 0; i < target.length; i++) o += i < k * target.length * 1.15 ? target[i] : CH[(Math.random() * CH.length) | 0];
      label.textContent = o;
      if (k < 1) requestAnimationFrame(tick); else finish();
    })();
    function finish() {
      if (revealed) return; revealed = true;
      loader.classList.add("done");
      document.body.classList.add("ready");
      setTimeout(() => { loader.classList.add("gone"); }, 1500);
      if (window.ULTRON) setTimeout(() => ULTRON.shock(0xff1f44), 500);
    }
    loader.addEventListener("click", finish);
    // safety net
    setTimeout(finish, 6000);
  })();

  /* ---------- typing effect ---------- */
  (function () {
    const el = $("#typed"); let wi = 0, ci = 0, del = false;
    if (reduce) { el.textContent = ROLES[0]; return; }
    (function ty() {
      const w = ROLES[wi]; ci += del ? -1 : 1; el.textContent = w.slice(0, ci);
      let ms = del ? 24 : 58;
      if (!del && ci === w.length) { del = true; ms = 1700; }
      else if (del && ci === 0) { del = false; wi = (wi + 1) % ROLES.length; ms = 350; }
      setTimeout(ty, ms);
    })();
  })();

  /* ---------- count up (starts when hero visible after loader) ---------- */
  (function () {
    let started = false;
    function run() {
      if (started) return; started = true;
      $$("[data-count]").forEach(el => {
        const to = +el.dataset.count, d = +(el.dataset.dec || 0), t0 = performance.now(), dur = reduce ? 1 : 1900;
        (function f(t) { const k = Math.min((t - t0) / dur, 1); el.textContent = (to * (1 - Math.pow(1 - k, 3))).toFixed(d); if (k < 1) requestAnimationFrame(f); })(t0);
      });
    }
    const w = setInterval(() => { if (document.body.classList.contains("ready")) { clearInterval(w); setTimeout(run, 700); } }, 100);
  })();

  /* ---------- timeline: alternate cards without empty gaps (desktop) ---------- */
  (function () {
    const items = $$(".tl-item", tl);
    function layout() {
      if (innerWidth <= 900) { tl.style.height = ""; items.forEach(it => { it.style.cssText = ""; }); tl.classList.remove("packed"); return; }
      tl.classList.add("packed");
      const GAP = 34, STAGGER = 110; let col = [0, STAGGER], lastTop = -Infinity;
      items.forEach((it, i) => {
        const side = i % 2, h = it.offsetHeight;
        const top = Math.max(col[side], lastTop + STAGGER);
        it.style.top = top + "px"; it.dataset.side = side ? "r" : "l";
        col[side] = top + h + GAP; lastTop = top;
      });
      tl.style.height = Math.max(col[0], col[1]) - GAP + "px";
    }
    layout(); addEventListener("resize", layout); addEventListener("load", layout);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
    if (window.ResizeObserver) { const ro = new ResizeObserver(() => layout()); items.forEach(it => ro.observe(it.querySelector(".tl-card"))); }
  })();

  /* ---------- scroll reveal ---------- */
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("on"); io.unobserve(e.target); } }), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
  const observeRv = () => $$(".rv:not(.on)").forEach(n => io.observe(n));
  observeRv();

  /* ---------- 3D tilt + spotlight ---------- */
  function bindTilt(root) {
    $$(".tilt:not([data-bound])", root || document).forEach(el => {
      el.dataset.bound = "1";
      const max = +(el.dataset.tilt || 8);
      el.addEventListener("pointermove", e => {
        if (e.pointerType === "touch") return;
        const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        el.classList.add("moving");
        el.style.setProperty("--ry", ((x - 0.5) * max * 2).toFixed(2) + "deg");
        el.style.setProperty("--rx", ((0.5 - y) * max * 2).toFixed(2) + "deg");
        el.style.setProperty("--mx", (x * 100).toFixed(1) + "%"); el.style.setProperty("--my", (y * 100).toFixed(1) + "%");
      });
      el.addEventListener("pointerleave", () => { el.classList.remove("moving"); el.style.setProperty("--rx", "0deg"); el.style.setProperty("--ry", "0deg"); });
    });
  }
  bindTilt();
  renderCerts();
  observeRv();

  /* ---------- magnetic buttons ---------- */
  if (finePointer) {
    let magE = null, magQ = false;
    document.addEventListener("pointermove", e => { magE = e; if (!magQ) { magQ = true; requestAnimationFrame(magnet); } }, { passive: true });
    function magnet() {
      magQ = false; const e = magE;
      $$("[data-magnetic]").forEach(el => {
        const r = el.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2, dx = e.clientX - cx, dy = e.clientY - cy, d = Math.hypot(dx, dy), reach = Math.max(r.width, 90) * 0.9;
        if (d < reach) { el.style.transform = `translate(${dx * 0.28}px,${dy * 0.35}px)`; el.dataset.mag = "1"; }
        else if (el.dataset.mag) { el.style.transform = ""; el.dataset.mag = ""; }
      });
    }
  }

  /* ---------- custom cursor + glow trail + click ripples ---------- */
  if (finePointer && !reduce) {
    document.documentElement.classList.add("has-cursor");
    const dot = $(".cur-dot"), ring = $(".cur-ring"), label = $("#curLabel"), aura = $("#aura");
    let px = innerWidth / 2, py = innerHeight / 2, rx = px, ry = py, seen = false;
    addEventListener("pointermove", e => {
      px = e.clientX; py = e.clientY;
      if (!seen) { seen = true; rx = px; ry = py; aura.style.opacity = 1; dot.classList.remove("out"); ring.classList.remove("out"); }
      spawn(px, py);
      const t = e.target.closest ? e.target.closest("[data-cursor],a,button,.filter,[data-magnetic]") : null;
      const lab = t && t.dataset.cursor;
      ring.classList.toggle("hover", !!t && !lab); ring.classList.toggle("label", !!lab); label.textContent = lab || "";
    }, { passive: true });
    document.addEventListener("pointerleave", () => { dot.classList.add("out"); ring.classList.add("out"); aura.style.opacity = 0; });
    document.addEventListener("pointerenter", () => { dot.classList.remove("out"); ring.classList.remove("out"); aura.style.opacity = 1; });
    addEventListener("pointerdown", () => ring.classList.add("down"));
    addEventListener("pointerup", () => ring.classList.remove("down"));
    dot.classList.add("out"); ring.classList.add("out");

    // trail canvas
    const cv = $("#trail"), cx = cv.getContext("2d"); let W = 0, H = 0, dpr = 1; const P = [], ripples = [];
    const COLORS = ["255,31,68", "139,61,255", "31,107,255", "255,255,255"];
    function size() { dpr = Math.min(devicePixelRatio || 1, 1.5); W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; cx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    size(); addEventListener("resize", size);
    let lastX = px, lastY = py;
    function spawn(x, y) {
      const dx = x - lastX, dy = y - lastY, n = Math.min(4, 1 + Math.floor(Math.hypot(dx, dy) / 14)); lastX = x; lastY = y;
      for (let i = 0; i < n; i++) P.push({ x: x - dx * i / n, y: y - dy * i / n, vx: (Math.random() - 0.5) * 1.2, vy: (Math.random() - 0.5) * 1.2 - 0.2, life: 1, r: 1 + Math.random() * 2.4, c: COLORS[(Math.random() * COLORS.length) | 0] });
      if (P.length > 260) P.splice(0, P.length - 260);
    }
    addEventListener("pointerdown", e => {
      ripples.push({ x: e.clientX, y: e.clientY, t: 0 });
      for (let i = 0; i < 18; i++) { const a = Math.random() * 6.283, s = 1 + Math.random() * 4; P.push({ x: e.clientX, y: e.clientY, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1, r: 1.2 + Math.random() * 2.4, c: COLORS[(Math.random() * 3) | 0] }); }
    });
    (function loop() {
      requestAnimationFrame(loop);
      rx += (px - rx) * 0.16; ry += (py - ry) * 0.16;
      dot.style.transform = `translate(${px}px,${py}px)`;
      ring.style.transform = `translate(${rx}px,${ry}px)`;
      aura.style.transform = `translate(${rx}px,${ry}px)`;
      cx.clearRect(0, 0, W, H); cx.globalCompositeOperation = "lighter";
      for (let i = P.length - 1; i >= 0; i--) {
        const p = P[i]; p.x += p.vx; p.y += p.vy; p.vx *= 0.96; p.vy *= 0.96; p.life -= 0.025;
        if (p.life <= 0) { P.splice(i, 1); continue; }
        cx.fillStyle = `rgba(${p.c},${p.life * 0.85})`; cx.shadowColor = `rgba(${p.c},1)`; cx.shadowBlur = 12;
        cx.beginPath(); cx.arc(p.x, p.y, p.r * (0.4 + p.life), 0, 6.283); cx.fill();
      }
      cx.shadowBlur = 0;
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i]; r.t += 0.035; if (r.t >= 1) { ripples.splice(i, 1); continue; }
        cx.strokeStyle = `rgba(255,31,68,${1 - r.t})`; cx.lineWidth = 2; cx.beginPath(); cx.arc(r.x, r.y, 10 + r.t * 90, 0, 6.283); cx.stroke();
        cx.strokeStyle = `rgba(139,61,255,${(1 - r.t) * 0.8})`; cx.beginPath(); cx.arc(r.x, r.y, 4 + r.t * 56, 0, 6.283); cx.stroke();
      }
      cx.globalCompositeOperation = "source-over";
    })();
  }

  /* ---------- nav: progress, scrollspy, side dots, mobile menu ---------- */
  const sections = $$("main section[id]");
  const NAMES = { home: "Home", about: "About", skills: "Skills", projects: "Projects", experience: "Journey", certifications: "Certificates", recognition: "Honours", contact: "Contact" };
  $("#sideDots").innerHTML = sections.map(s => `<a href="#${s.id}" data-id="${s.id}"><span>${NAMES[s.id] || s.id}</span></a>`).join("");
  const navLinks = $$("#nav a"), dots = $$("#sideDots a");
  let activeSec = "";
  const spy = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const id = e.target.id; if (id === activeSec) return; activeSec = id;
    navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + id));
    dots.forEach(a => a.classList.toggle("active", a.dataset.id === id));
    if (window.ULTRON) ULTRON.setSection(e.target.dataset.theme || id);
  }), { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach(s => spy.observe(s));

  const bar = $("#progress"), fill = $("#tlFill");
  function onScroll() {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (max > 0 ? scrollY / max * 100 : 0) + "%";
    const r = tl.getBoundingClientRect(), k = (innerHeight * 0.55 - r.top) / r.height;
    fill.style.height = Math.max(0, Math.min(1, k)) * 100 + "%";
  }
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  const menuBtn = $("#menuBtn"), nav = $("#nav");
  menuBtn.addEventListener("click", () => { const o = nav.classList.toggle("open"); menuBtn.setAttribute("aria-expanded", o); });
  nav.addEventListener("click", e => { if (e.target.closest("a")) { nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false"); } });

  /* hover a button / pulse the head's eyes */
  if (window.ULTRON) document.addEventListener("pointerover", e => { if (e.target.closest && e.target.closest(".btn,.resume-btn")) ULTRON.flare(0.5); });

  /* ---------- certificate viewer ---------- */
  const viewer = $("#viewer"); let vIdx = 0, lastFocus = null, vList = [];
  function showCert(id) {
    vList = CERTS; vIdx = CERT_BY_ID[id]; paint(); lastFocus = document.activeElement;
    viewer.classList.add("open"); viewer.setAttribute("aria-hidden", "false"); document.body.classList.add("lock"); $("#vClose").focus();
    if (window.ULTRON) ULTRON.shock(0x8b3dff);
  }
  function paint() {
    const c = vList[vIdx];
    $("#vCat").textContent = CAT_LABEL[c.cat]; $("#vTitle").textContent = c.title; $("#vMeta").textContent = c.org + " · " + c.date;
    const img = $("#vImg"), ph = $("#vPh"), open = $("#vOpen");
    img.hidden = false; ph.hidden = true;
    img.onerror = () => { img.hidden = true; ph.hidden = false; ph.innerHTML = `<i>${CAT_ICON[c.cat]}</i><b>${esc(c.title)}</b><small>${esc(c.org)} · ${esc(c.date)}</small>`; ph.className = "v-ph ph-" + c.cat; };
    img.src = "assets/previews/" + c.prev; img.alt = c.title;
    open.href = "assets/certificates/" + c.file; open.hidden = false;
    exists(open.href).then(ok => { if (vList[vIdx] === c) open.hidden = !ok; });
    $("#vCount").textContent = `${vIdx + 1} / ${vList.length}`;
  }
  const step = d => { vIdx = (vIdx + d + vList.length) % vList.length; paint(); };
  function closeViewer() { viewer.classList.remove("open"); viewer.setAttribute("aria-hidden", "true"); document.body.classList.remove("lock"); if (lastFocus) lastFocus.focus(); }
  document.addEventListener("click", e => {
    const t = e.target.closest("[data-cert]"); if (t) { e.preventDefault(); showCert(t.dataset.cert); return; }
    if (e.target.closest("[data-close]")) closeViewer();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Enter" && document.activeElement && document.activeElement.matches(".cert-card")) showCert(document.activeElement.dataset.cert);
    if (!viewer.classList.contains("open")) return;
    if (e.key === "Tab") {
      const f = $$("button,a[href]:not([hidden])", viewer).filter(x => x.offsetParent !== null);
      if (f.length) { const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); } }
    }
    if (e.key === "Escape") closeViewer(); if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1);
  });
  $("#vNext").addEventListener("click", () => step(1)); $("#vPrev").addEventListener("click", () => step(-1));

  /* ---------- 3D skill sphere ---------- */
  (function () {
    const cv = $("#sphere"), cx = cv.getContext("2d"), N = SPHERE.length;
    const COL = { r: [255, 70, 96], b: [92, 150, 255], p: [186, 128, 255], w: [244, 241, 250] };
    const pts = SPHERE.map(([w, g], i) => {
      const k = (i + 0.5) / N, phi = Math.acos(1 - 2 * k), th = Math.PI * (1 + Math.sqrt(5)) * i;
      return { w, c: COL[g], x: Math.cos(th) * Math.sin(phi), y: Math.cos(phi), z: Math.sin(th) * Math.sin(phi) };
    });
    let W = 0, H = 0, dpr = 1, ax = 0.0035, ay = 0.0055, hover = false, drag = false, lx = 0, ly = 0, vx = 0, vy = 0, visible = true;
    function size() { const r = cv.getBoundingClientRect(); dpr = Math.min(devicePixelRatio || 1, 2); W = r.width; H = r.height; cv.width = W * dpr; cv.height = H * dpr; cx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    size(); addEventListener("resize", size);
    new IntersectionObserver(es => visible = es[0].isIntersecting).observe(cv);
    cv.addEventListener("pointerenter", () => hover = true); cv.addEventListener("pointerleave", () => { hover = false; drag = false; });
    cv.addEventListener("pointerdown", e => { drag = true; lx = e.clientX; ly = e.clientY; cv.setPointerCapture(e.pointerId); });
    cv.addEventListener("pointerup", () => drag = false);
    cv.addEventListener("pointermove", e => {
      const r = cv.getBoundingClientRect();
      if (drag) { vy = (e.clientX - lx) * 0.0022; vx = -(e.clientY - ly) * 0.0022; lx = e.clientX; ly = e.clientY; }
      else if (hover && e.pointerType !== "touch") { vy = ((e.clientX - r.left) / r.width - 0.5) * 0.02; vx = -((e.clientY - r.top) / r.height - 0.5) * 0.02; }
    });
    let cvx = ax, cvy = ay;
    (function draw() {
      requestAnimationFrame(draw); if (!visible) return;
      if (!hover && !drag) { vx += (ax - vx) * 0.04; vy += (ay - vy) * 0.04; }
      const sx = Math.sin(vx), cx_ = Math.cos(vx), sy = Math.sin(vy), cy = Math.cos(vy);
      for (const p of pts) {
        let y1 = p.y * cx_ - p.z * sx, z1 = p.y * sx + p.z * cx_; p.y = y1; p.z = z1;
        let x2 = p.x * cy + p.z * sy, z2 = -p.x * sy + p.z * cy; p.x = x2; p.z = z2;
      }
      cx.clearRect(0, 0, W, H);
      const narrow = W < 520, R = Math.min(W * (narrow ? 0.3 : 0.4), H * 0.44), xs = narrow ? 1.05 : 1.35, cxp = W / 2, cyp = H / 2;
      // faint wire globe
      cx.strokeStyle = "rgba(139,61,255,.14)"; cx.lineWidth = 1; cx.beginPath(); cx.arc(cxp, cyp, R * 1.02, 0, 6.283); cx.stroke();
      cx.strokeStyle = "rgba(255,31,68,.12)"; cx.beginPath(); cx.ellipse(cxp, cyp, R * 1.02, R * 0.3, 0, 0, 6.283); cx.stroke();
      cx.strokeStyle = "rgba(31,107,255,.14)"; cx.beginPath(); cx.ellipse(cxp, cyp, R * 0.3, R * 1.02, 0, 0, 6.283); cx.stroke();
      const sorted = [...pts].sort((a, b) => a.z - b.z);
      cx.textAlign = "center"; cx.textBaseline = "middle";
      for (const p of sorted) {
        const depth = (p.z + 1) / 2, s = 0.55 + depth * 0.85, a = 0.18 + depth * 0.82, fs = Math.round((W < 520 ? 12 : 15) * s * 1.15);
        cx.font = `${depth > 0.55 ? "700" : "400"} ${fs}px "Times New Roman",serif`;
        cx.fillStyle = `rgba(${p.c[0]},${p.c[1]},${p.c[2]},${a})`;
        if (depth > 0.7) { cx.shadowColor = `rgba(${p.c[0]},${p.c[1]},${p.c[2]},.9)`; cx.shadowBlur = 12; } else cx.shadowBlur = 0;
        cx.fillText(p.w, cxp + p.x * R * xs, cyp + p.y * R);
      }
      cx.shadowBlur = 0;
    })();
  })();
})();
