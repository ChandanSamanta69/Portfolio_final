/* =====================================================
   ULTRON CINEMATIC SCENE  (Three.js r128)
   - Ultron head that follows the pointer
   - scroll = camera flight down a glowing tunnel
   - red / deep-blue / purple lighting that shifts per section
   ===================================================== */
(function () {
  "use strict";
  const cv = document.getElementById("gl");
  if (!cv || !window.THREE) { document.documentElement.classList.add("no-gl"); return; }

  let R;
  try { R = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true, powerPreference: "high-performance" }); }
  catch (e) { document.documentElement.classList.add("no-gl"); return; }

  const small = innerWidth < 760;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  R.setPixelRatio(Math.min(devicePixelRatio || 1, small ? 1.25 : 1.75));
  R.setClearColor(0x000000, 0);

  const COL = { red: 0xff1f44, purple: 0x8b3dff, blue: 0x1f6bff, deep: 0x0b3d91 };
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x04050d, 0.019);
  const cam = new THREE.PerspectiveCamera(52, 1, 0.1, 400);
  cam.position.set(0, 0, 9);

  /* ---------- lights ---------- */
  scene.add(new THREE.AmbientLight(0x2b3160, 1.15));
  const key = new THREE.DirectionalLight(0xe6ecff, 0.9); scene.add(key);
  const lR = new THREE.PointLight(COL.red, 2.6, 28);
  const lP = new THREE.PointLight(COL.purple, 2.4, 28);
  const lB = new THREE.PointLight(COL.blue, 2.2, 28);
  scene.add(lR, lP, lB);

  /* ---------- glow sprite texture ---------- */
  function glowTex(r, g, b) {
    const c = document.createElement("canvas"); c.width = c.height = 128;
    const x = c.getContext("2d"), gr = x.createRadialGradient(64, 64, 0, 64, 64, 64);
    gr.addColorStop(0, `rgba(${r},${g},${b},1)`); gr.addColorStop(0.35, `rgba(${r},${g},${b},.35)`); gr.addColorStop(1, `rgba(${r},${g},${b},0)`);
    x.fillStyle = gr; x.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  }
  const redTex = glowTex(255, 40, 60), purTex = glowTex(150, 70, 255), bluTex = glowTex(50, 120, 255);

  /* ---------- ULTRON HEAD ---------- */
  const head = new THREE.Group(); scene.add(head);
  const metal = new THREE.MeshStandardMaterial({ color: 0x151a2e, metalness: 0.94, roughness: 0.28, flatShading: true });
  const metalDark = new THREE.MeshStandardMaterial({ color: 0x0a0c18, metalness: 0.9, roughness: 0.4, flatShading: true });

  const skullGeo = new THREE.IcosahedronGeometry(1.3, 2);
  const skull = new THREE.Mesh(skullGeo, metal); skull.scale.set(0.82, 1.1, 0.9); head.add(skull);
  const wire = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.3, 1)),
    new THREE.LineBasicMaterial({ color: COL.red, transparent: true, opacity: 0.38 }));
  wire.scale.copy(skull.scale).multiplyScalar(1.025); head.add(wire);
  const wire2 = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.3, 1)),
    new THREE.LineBasicMaterial({ color: COL.purple, transparent: true, opacity: 0.22 }));
  wire2.scale.copy(skull.scale).multiplyScalar(1.12); head.add(wire2);

  // jaw / chin plate
  const jaw = new THREE.Mesh(new THREE.IcosahedronGeometry(0.62, 1), metalDark);
  jaw.scale.set(1.05, 0.7, 0.9); jaw.position.set(0, -1.12, 0.35); head.add(jaw);
  // brow ridge
  [-1, 1].forEach(s => {
    const b = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.09, 0.2), metalDark);
    b.position.set(s * 0.42, 0.5, 1.06); b.rotation.z = -s * 0.28; head.add(b);
  });
  // crest spikes
  [-0.5, 0, 0.5].forEach((x, i) => {
    const sp = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.65 - Math.abs(x) * 0.5, 4), metalDark);
    sp.position.set(x, 1.42 - Math.abs(x) * 0.35, -0.1); sp.rotation.z = -x * 0.7; head.add(sp);
  });

  // eyes
  const eyeMat = new THREE.MeshBasicMaterial({ color: 0xff2b3d });
  const glows = [];
  [-1, 1].forEach(s => {
    const e = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.085, 0.09), eyeMat);
    e.position.set(s * 0.4, 0.28, 1.1); e.rotation.z = -s * 0.22; head.add(e);
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: redTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }));
    sp.scale.set(1.5, 1.5, 1); sp.position.set(s * 0.4, 0.28, 1.25); head.add(sp); glows.push(sp);
  });
  // mouth grille
  for (let i = 0; i < 5; i++) {
    const b = new THREE.Mesh(new THREE.BoxGeometry(0.52 - Math.abs(i - 2) * 0.08, 0.034, 0.05), eyeMat);
    b.position.set(0, -0.4 - i * 0.095, 1.05 - Math.abs(i - 2) * 0.05); head.add(b);
  }
  const eyeLight = new THREE.PointLight(COL.red, 3, 7); eyeLight.position.set(0, 0.3, 2.2); head.add(eyeLight);
  // purple core halo behind head
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: purTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.8 }));
  halo.scale.set(8, 8, 1); halo.position.z = -1.6; head.add(halo);
  const halo2 = new THREE.Sprite(new THREE.SpriteMaterial({ map: bluTex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.45 }));
  halo2.scale.set(5, 5, 1); halo2.position.set(0.4, -0.6, -1); head.add(halo2);

  // orbit rings
  const rings = [2.1, 2.55, 3.05].map((r, i) => {
    const m = new THREE.Mesh(new THREE.TorusGeometry(r, 0.012, 8, 160),
      new THREE.MeshBasicMaterial({ color: [COL.red, COL.purple, COL.blue][i], transparent: true, opacity: 0.6 }));
    m.rotation.set(Math.random() * 3, Math.random() * 3, 0); head.add(m);
    // a bead travelling the ring
    const bead = new THREE.Sprite(new THREE.SpriteMaterial({ map: [redTex, purTex, bluTex][i], blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }));
    bead.scale.set(0.5, 0.5, 1); m.add(bead); m.userData = { r, bead, ph: Math.random() * 6.28 };
    return m;
  });

  /* ---------- shockwaves (click / pulse) ---------- */
  const shocks = [];
  const shockGeo = new THREE.RingGeometry(0.92, 1, 80);
  function shock(color) {
    const m = new THREE.Mesh(shockGeo, new THREE.MeshBasicMaterial({ color: color || COL.red, transparent: true, opacity: 0.9, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }));
    m.position.copy(head.position); m.quaternion.copy(cam.quaternion); m.scale.setScalar(0.5);
    scene.add(m); shocks.push({ m, t: 0 });
    flare = 1.6;
  }

  /* ---------- tunnel: particles, gates, shards, floor ---------- */
  const PATH = 130;                       // length of flight
  const N = small ? 1800 : 4200;
  const pa = new Float32Array(N * 3), pc = new Float32Array(N * 3);
  const palette = [new THREE.Color(COL.red), new THREE.Color(COL.purple), new THREE.Color(COL.blue), new THREE.Color(0xffffff), new THREE.Color(0xb9c8ff)];
  for (let i = 0; i < N; i++) {
    const a = Math.random() * Math.PI * 2, rad = 4 + Math.pow(Math.random(), 0.7) * 38;
    pa[i * 3] = Math.cos(a) * rad; pa[i * 3 + 1] = Math.sin(a) * rad * 0.7; pa[i * 3 + 2] = 14 - Math.random() * (PATH + 40);
    const c = palette[Math.random() < 0.18 ? 3 : (Math.random() * 3) | 0].clone().multiplyScalar(0.55 + Math.random() * 0.6);
    pc.set([c.r, c.g, c.b], i * 3);
  }
  const pg = new THREE.BufferGeometry();
  pg.setAttribute("position", new THREE.BufferAttribute(pa, 3)); pg.setAttribute("color", new THREE.BufferAttribute(pc, 3));
  const points = new THREE.Points(pg, new THREE.PointsMaterial({ size: 0.07, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false }));
  scene.add(points);

  const gates = [];
  for (let i = 0; i < 9; i++) {
    const g = new THREE.Group(), r = 9 + (i % 3) * 1.6, c = [COL.red, COL.purple, COL.blue][i % 3];
    const t = new THREE.Mesh(new THREE.TorusGeometry(r, 0.035, 8, small ? 60 : 120), new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.4 }));
    g.add(t);
    const t2 = new THREE.Mesh(new THREE.TorusGeometry(r * 0.82, 0.02, 6, small ? 6 : 8), new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.08 }));
    g.add(t2);
    g.position.z = -12 - i * 14; g.userData = { sp: (i % 2 ? 1 : -1) * (0.0015 + Math.random() * 0.002), t2, t };
    scene.add(g); gates.push(g);
  }

  const shards = [];
  const sGeos = [new THREE.OctahedronGeometry(1), new THREE.TetrahedronGeometry(1), new THREE.IcosahedronGeometry(1, 0)];
  for (let i = 0; i < (small ? 28 : 64); i++) {
    const c = [COL.red, COL.purple, COL.blue][i % 3];
    const m = new THREE.Mesh(sGeos[i % 3], new THREE.MeshBasicMaterial({ color: c, wireframe: true, transparent: true, opacity: 0.5 }));
    const side = Math.random() < 0.5 ? -1 : 1;
    m.scale.setScalar(0.18 + Math.random() * 0.55);
    m.position.set(side * (5 + Math.random() * 20), (Math.random() - 0.5) * 20, 6 - Math.random() * (PATH + 20));
    m.userData = { s: Math.random() * 0.02 + 0.004, y0: m.position.y, ph: Math.random() * 6.28 };
    scene.add(m); shards.push(m);
  }

  const grid = new THREE.GridHelper(340, 68, COL.purple, COL.deep);
  grid.position.set(0, -11, -110); grid.material.transparent = true; grid.material.opacity = 0.22; scene.add(grid);
  const grid2 = grid.clone(); grid2.position.y = 13; grid2.material = grid.material.clone(); grid2.material.opacity = 0.1; scene.add(grid2);

  /* ---------- section themes ---------- */
  const THEMES = {
    home:           { r: 3.2, p: 1.2, b: 1.4, fog: [0.016, 0.02, 0.05] },
    about:          { r: 1.1, p: 1.6, b: 3.2, fog: [0.012, 0.03, 0.08] },
    skills:         { r: 1.4, p: 3.2, b: 1.6, fog: [0.03, 0.015, 0.08] },
    projects:       { r: 3.2, p: 1.6, b: 1.0, fog: [0.05, 0.012, 0.04] },
    experience:     { r: 1.8, p: 1.0, b: 3.2, fog: [0.012, 0.025, 0.08] },
    certifications: { r: 2.0, p: 3.2, b: 1.2, fog: [0.035, 0.015, 0.075] },
    recognition:    { r: 3.0, p: 1.6, b: 1.6, fog: [0.04, 0.015, 0.06] },
    contact:        { r: 3.4, p: 2.2, b: 1.5, fog: [0.05, 0.012, 0.06] }
  };
  let theme = THEMES.home;
  const cur = { r: 3, p: 1, b: 1, fog: [0.016, 0.02, 0.05] };

  /* ---------- pointer / scroll state ---------- */
  let mx = 0, my = 0, tx = 0, ty = 0, ps = 0, flare = 0, sectionFlare = 0;
  addEventListener("pointermove", e => { mx = e.clientX / innerWidth * 2 - 1; my = e.clientY / innerHeight * 2 - 1; }, { passive: true });
  addEventListener("pointerdown", e => { if (e.target.closest && e.target.closest("a,button,input,.viewer")) return; shock(COL.red); }, { passive: true });

  let docH = document.documentElement.scrollHeight;
  setInterval(() => { docH = document.documentElement.scrollHeight; }, 1000);
  function resize() {
    R.setSize(innerWidth, innerHeight, false);
    cam.aspect = innerWidth / innerHeight; cam.updateProjectionMatrix();
  }
  resize(); addEventListener("resize", resize);

  const stage = document.getElementById("heroStage");
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const smooth = t => t * t * (3 - 2 * t);
  const clock = new THREE.Clock();
  const tmp = new THREE.Vector3();
  const fogCol = new THREE.Color();
  let fovNow = 52;

  function frame() {
    requestAnimationFrame(frame);
    if (document.hidden) return;
    const t = clock.getElapsedTime(), dt = Math.min(t - (frame.lt || t), 0.05); frame.lt = t;
    const maxS = Math.max(1, docH - innerHeight);
    const p = clamp(scrollY / maxS, 0, 1);
    const vel = p - ps; ps += vel * 0.07;

    /* theme blend */
    cur.r = lerp(cur.r, theme.r, 0.04); cur.p = lerp(cur.p, theme.p, 0.04); cur.b = lerp(cur.b, theme.b, 0.04);
    for (let i = 0; i < 3; i++) cur.fog[i] = lerp(cur.fog[i], theme.fog[i], 0.04);
    fogCol.setRGB(cur.fog[0], cur.fog[1], cur.fog[2]); scene.fog.color.copy(fogCol);
    flare = lerp(flare, 0, 0.05);
    const pulse = 1 + Math.sin(t * 3) * 0.22 + flare;
    lR.intensity = cur.r * (0.9 + flare * 0.5); lP.intensity = cur.p; lB.intensity = cur.b;
    eyeLight.intensity = 3 * pulse; glows.forEach(g => g.scale.setScalar(1.5 * pulse));
    eyeMat.color.setRGB(1, 0.17 + flare * 0.2, 0.24 + flare * 0.2);

    /* camera flight */
    const camZ = 9 - ps * PATH;
    tx += (mx - tx) * 0.05; ty += (my - ty) * 0.05;
    cam.position.set(tx * 0.9, -ty * 0.55, camZ);
    cam.rotation.set(-ty * 0.05, -tx * 0.07, clamp(-(p - ps) * 5, -0.12, 0.12) + Math.sin(t * 0.3) * 0.008);
    const fovT = 52 + Math.min(16, Math.abs(p - ps) * 900);
    fovNow = lerp(fovNow, fovT, 0.1);
    if (Math.abs(cam.fov - fovNow) > 0.01) { cam.fov = fovNow; cam.updateProjectionMatrix(); }
    cam.updateMatrixWorld();

    /* head placement: anchored to hero stage, then glides to a small sentinel in the corner */
    const dist = 8.2, halfH = Math.tan(cam.fov * Math.PI / 360) * dist, halfW = halfH * cam.aspect;
    let ax = 0.5, ay = 0.1, heroScale = 0.6, k = smooth(clamp(scrollY / (innerHeight * 0.75), 0, 1));
    if (stage) {
      const r = stage.getBoundingClientRect();
      ax = (r.left + r.width / 2) / innerWidth * 2 - 1;
      ay = -((r.top + r.height * 0.43) / innerHeight * 2 - 1);
      const worldPx = (2 * halfH) / innerHeight;
      // fit the head + rings in the clear band between the HUD (top) and signature plate (bottom)
      heroScale = clamp(Math.min(r.width * 0.62, r.height * 0.5) * worldPx / 6.2, 0.3, 1.25);
      // glide to the corner only once the hero stage itself scrolls away
      k = smooth(clamp(1 - r.bottom / (r.height * 0.85), 0, 1));
    }
    const sx = innerWidth > 900 ? 0.88 : 0.8, sy = innerWidth > 900 ? -0.72 : -0.78;
    const nx = lerp(ax, sx, k), ny = lerp(ay, sy, k);
    const sc = lerp(heroScale, innerWidth > 900 ? 0.3 : 0.24, k) * (reduce ? 1 : 1 + Math.sin(t * 1.3) * 0.015);
    tmp.set(nx * halfW, ny * halfH, -dist).applyMatrix4(cam.matrixWorld);
    head.position.copy(tmp); head.position.y += Math.sin(t * 1.2) * 0.12;
    head.scale.setScalar(sc);
    // look toward the pointer, extra sweep with scroll
    const hy = lerp(head.rotation.y, mx * 0.75 - nx * 0.35 + Math.sin(t * 0.5) * 0.12 + k * Math.sin(p * 40) * 0.2, 0.08);
    const hx = lerp(head.rotation.x, my * 0.4 - ny * 0.15, 0.08);
    head.rotation.set(hx, hy, 0);
    key.position.copy(head.position).add(tmp.set(3, 4, 5));
    lR.position.copy(head.position).add(tmp.set(-5, 1, 3));
    lP.position.copy(head.position).add(tmp.set(5, -2, 2));
    lB.position.copy(head.position).add(tmp.set(0, 5, -3));
    skull.rotation.y = Math.sin(t * 0.3) * 0.05;
    wire.material.opacity = 0.3 + Math.sin(t * 2) * 0.1 + flare * 0.2;
    rings.forEach((m, i) => {
      m.rotation.x += 0.004 * (i + 1); m.rotation.y += 0.003 * (3 - i);
      const a = t * (0.8 + i * 0.35) + m.userData.ph; m.userData.bead.position.set(Math.cos(a) * m.userData.r, Math.sin(a) * m.userData.r, 0);
    });

    /* shockwaves */
    for (let i = shocks.length - 1; i >= 0; i--) {
      const s = shocks[i]; s.t += dt || 0.016;
      const k2 = s.t / 1.3; s.m.scale.setScalar(0.5 + k2 * 16); s.m.material.opacity = 0.9 * (1 - k2);
      if (k2 >= 1) { scene.remove(s.m); s.m.material.dispose(); shocks.splice(i, 1); }
    }

    /* environment */
    points.rotation.z = t * 0.012 + p * 1.2;
    gates.forEach(g => {
      g.rotation.z += g.userData.sp; g.userData.t2.rotation.z -= 0.003;
      // fade a gate out as the camera flies through it so it never fills the screen
      const d = camZ - g.position.z, f = clamp((d - 2) / 10, 0, 1);
      g.userData.t.material.opacity = 0.4 * f; g.userData.t2.material.opacity = 0.08 * f; g.visible = d > 0.5;
    });
    shards.forEach(m => {
      m.rotation.x += m.userData.s; m.rotation.y += m.userData.s * 1.4;
      m.position.y = m.userData.y0 + Math.sin(t * 0.6 + m.userData.ph) * 0.8;
    });

    R.render(scene, cam);
  }
  frame();

  /* public hooks for the page script */
  window.ULTRON = {
    setSection(id) { theme = THEMES[id] || THEMES.home; sectionFlare = 1; flare = Math.max(flare, 0.6); },
    shock,
    flare(v) { flare = Math.max(flare, v || 0.8); }
  };
})();
