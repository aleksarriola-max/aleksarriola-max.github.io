(function () {
  "use strict";
  var PAL = { bg: "#0D1210", bg2: "#0f1f18", acc: "#92AC9B", acc2: "#c9dace", star: "224,230,224", glow: "179,199,186", accrgb: "146,172,155" };
  var TERMINAL_INK = "0.177 0.008 171";
  var NODE_DEFS = [
    { fx: 0.93, fy: 0.08, nm: "Outsette", ds: "Live product", url: "https://www.outsette.com/" },
    { fx: 0.85, fy: 0.15, nm: "Lifeline", ds: "1st of 40 teams, Dell and NVIDIA hackathon", go: "goLifelineCase", btn: "[data-case=lifeline]", url: "https://github.com/SGGmilagro/lifeline" },
    { fx: 0.94, fy: 0.22, nm: "PitMind", ds: "Most Innovative, IBM SkillsBuild", url: "https://pitmind-bvihgej8qmkrzergphkxb4.streamlit.app/" },
    { fx: 0.86, fy: 0.29, nm: "MissionMind", ds: "IBM Bob AI Challenge", url: "https://aleksarriola-max.github.io/missionmind/" },
    { fx: 0.93, fy: 0.36, nm: "Tallyhound", ds: "Live demo", url: "https://tallyhound-kfzkutbxmxdsrynimpoll.streamlit.app/" },
    { fx: 0.86, fy: 0.43, nm: "OpsFlow", ds: "Agent proposes, code executes", url: "https://opsflow-hso3.onrender.com/" },
    { fx: 0.94, fy: 0.5, nm: "StoryForge", ds: "IBM AI Builders Challenge", url: "https://storyforge-client-smoky.vercel.app/" },
    { fx: 0.88, fy: 0.56, nm: "Orcen Kit", ds: "Apple valuation, 84 sheets", url: "Apple_Valuation_v45.xlsx" }
  ];
  var hoverOK = window.matchMedia("(hover: hover)").matches;
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var SD = 1, W = 0, H = 0, heroH = 0, mode = "star", on = false, raf = 0, tries = 0;
  var starC = null, depthC = null, sctx = null, dctx = null, tip = null, tipNm = null, tipDs = null, cue = null, heroEl = null;
  var stars = [], amb = [], dfield = [], dnodes = [];
  var msx = -9999, msy = -9999, dmx = 0, dmy = 0, dmxT = 0, dmyT = 0, autoYaw = 0;
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function easeOut(p) { return 1 - Math.pow(1 - p, 3); }
  function rnd(a, b) { return a + Math.random() * (b - a); }
  function isTerminal() {
    var v = "";
    try { v = window.getComputedStyle(document.body).getPropertyValue("--ink"); } catch (e) { v = ""; }
    return v.indexOf(TERMINAL_INK) !== -1;
  }
  function findHero() {
    var secs = document.querySelectorAll("section[data-screen-label]");
    var q;
    for (q = 0; q < secs.length; q += 1) {
      if (secs[q].getAttribute("data-screen-label") === "Hero C") { return secs[q]; }
    }
    return null;
  }
  function makeCanvas(id) {
    var c = document.createElement("canvas");
    c.id = id;
    document.body.appendChild(c);
    return c;
  }
  function makeTip() {
    tip = document.createElement("div");
    tip.id = "constellation-tip";
    tipNm = document.createElement("div");
    tipNm.className = "nm";
    tipDs = document.createElement("div");
    tipDs.className = "ds";
    tip.appendChild(tipNm);
    tip.appendChild(tipDs);
    document.body.appendChild(tip);
  }
  function makeCue() {
    cue = document.createElement("div");
    cue.id = "constellation-cue";
    cue.textContent = "Scroll \u00B7 or hover the constellation";
    if (window.SITE_I18N && window.SITE_I18N.saved && window.SITE_I18N.saved() === "es") {
      cue.textContent = "Despl\u00E1zate \u00B7 o pasa el cursor sobre la constelaci\u00F3n";
    }
    cue.setAttribute("aria-hidden", "true");
  }
  function build() {
    SD = Math.min(window.devicePixelRatio || 1, window.innerWidth < 700 ? 1.25 : 1.5);
    on = isTerminal();
    if (!on) {
      document.body.classList.remove("constellation-on");
      if (tries < 8) { tries += 1; window.setTimeout(build, 800); }
      return;
    }
    document.body.classList.add("constellation-on");
    heroEl = findHero();
    if (!heroEl) {
      heroH = window.innerHeight;
      if (tries < 8) { tries += 1; window.setTimeout(build, 800); }
      return;
    }
    tries = 0;
    W = document.documentElement.clientWidth;
    heroH = Math.max(heroEl.offsetHeight, window.innerHeight * 0.6);
    var rootEl = document.querySelector("x-dc");
    var docH = rootEl ? Math.max(rootEl.scrollHeight, window.innerHeight) : Math.max(document.body.scrollHeight, window.innerHeight);
    H = Math.max(Math.min(docH, heroH + 2600), heroH);
    starC.width = Math.round(W * SD);
    starC.height = Math.round(H * SD);
    starC.style.width = W + "px";
    starC.style.height = H + "px";
    depthC.width = Math.round(window.innerWidth * SD);
    depthC.height = Math.round(window.innerHeight * SD);
    depthC.style.width = window.innerWidth + "px";
    depthC.style.height = window.innerHeight + "px";
    var i, n, k;
    stars = [];
    n = Math.floor(W * heroH / 14000) + 50;
    for (i = 0; i < n; i += 1) { stars.push({ x: Math.random() * W, y: Math.random() * heroH, r: rnd(0.6, 1.6), p: Math.random() * 6.283, s: rnd(0.5, 1.6), a: rnd(0.3, 0.9) }); }
    amb = [];
    n = Math.floor(W * H / 52000) + 30;
    for (i = 0; i < n; i += 1) { amb.push({ x: Math.random() * W, y: Math.random() * H, r: rnd(0.5, 1.1), a: rnd(0.12, 0.34) }); }
    dfield = [];
    n = Math.floor(window.innerWidth * window.innerHeight / 16000) + 60;
    for (i = 0; i < n; i += 1) { dfield.push({ x: rnd(-900, 900), y: rnd(-500, 500), z: rnd(280, 4280), r: rnd(0.6, 1.8) }); }
    dnodes = [];
    var M = 8, R = 560, ga = 2.399963, yy, rr, th;
    for (k = 0; k < M; k += 1) {
      yy = 1 - (k / (M - 1)) * 2;
      rr = Math.sqrt(1 - yy * yy);
      th = ga * k;
      dnodes.push({ x: Math.cos(th) * rr * R, y: yy * R, z: Math.sin(th) * rr * R });
    }
    if (cue && heroEl && !heroEl.contains(cue)) { heroEl.appendChild(cue); }
    setMode();
    if (!reduced && !raf) { raf = window.requestAnimationFrame(loop); }
    if (reduced) { drawOnce(); }
  }
  function setMode() {
    var h = window.location.hash || "";
    mode = (h === "" || h === "#home" || h.indexOf("#home") === 0) ? "star" : "depth";
    if (starC) { starC.classList.toggle("mode-on", mode === "star"); }
    if (depthC) { depthC.classList.toggle("mode-on", mode === "depth"); }
    updateCue();
  }
  function updateCue() {
    if (!cue) { return; }
    cue.style.opacity = (mode === "star" && window.scrollY < 120) ? "1" : "0";
  }
  function nodeXY(n) { return { x: n.fx * W, y: n.fy * heroH }; }
  function nearestNode(px, py) {
    var best = null, bd = 1000000000, i, p, d;
    if (!hoverOK || window.innerWidth < 900 || mode !== "star") { return null; }
    for (i = 0; i < NODE_DEFS.length; i += 1) {
      p = nodeXY(NODE_DEFS[i]);
      d = Math.hypot(px - p.x, py - p.y);
      if (d < bd) { bd = d; best = { def: NODE_DEFS[i], p: p, d: d }; }
    }
    if (best && best.d < 30 * SD) { return best; }
    return null;
  }
  function proj3(x, y, z, ca, sa, cb, sb, vw, vh) {
    var x1 = x * ca - z * sa;
    var z1 = x * sa + z * ca;
    var y2 = y * cb - z1 * sb;
    var z2 = y * sb + z1 * cb;
    var zz = z2 + 1500;
    var sc = 900 / Math.max(zz, 60);
    return { sx: vw / 2 + x1 * sc, sy: vh / 2 + y2 * sc, zz: zz, sc: sc };
  }
  function renderStar(t) {
    if (!sctx) { return; }
    sctx.setTransform(SD, 0, 0, SD, 0, 0);
    var g = sctx.createRadialGradient(W * 0.5, heroH * 0.4, 40, W * 0.5, heroH * 0.4, Math.max(W, heroH));
    g.addColorStop(0, PAL.bg2);
    g.addColorStop(1, PAL.bg);
    sctx.fillStyle = g;
    sctx.fillRect(0, 0, W, H);
    var hv = 1 - clamp(window.scrollY / window.innerHeight - 0.3, 0, 0.9);
    var i, s, a;
    sctx.fillStyle = "rgb(" + PAL.star + ")";
    for (i = 0; i < amb.length; i += 1) {
      s = amb[i];
      sctx.globalAlpha = s.a;
      sctx.beginPath();
      sctx.arc(s.x, s.y, s.r, 0, 6.2832);
      sctx.fill();
    }
    var n = nearestNode(msx, msy);
    for (i = 0; i < stars.length; i += 1) {
      s = stars[i];
      a = (0.3 + 0.6 * Math.abs(Math.sin(t * 0.001 * s.s + s.p))) * s.a * hv;
      sctx.globalAlpha = a;
      sctx.beginPath();
      sctx.arc(s.x, s.y, s.r, 0, 6.2832);
      sctx.fill();
    }
    var j, p0, p1, ap0, ap1, la, nr, lx;
  var showNodes = hoverOK && window.innerWidth >= 900;
    for (j = 0; j < (showNodes ? NODE_DEFS.length - 1 : 0); j += 1) {
      ap0 = easeOut(clamp((t - 600 - j * 200) / 500, 0, 1));
      ap1 = easeOut(clamp((t - 600 - (j + 1) * 200) / 500, 0, 1));
      la = 0.5 * Math.min(ap0, ap1) * hv;
      if (la <= 0.01) { continue; }
      p0 = nodeXY(NODE_DEFS[j]);
      p1 = nodeXY(NODE_DEFS[j + 1]);
      sctx.globalAlpha = la;
      sctx.strokeStyle = "rgb(" + PAL.accrgb + ")";
      sctx.lineWidth = 1;
      sctx.beginPath();
      sctx.moveTo(p0.x, p0.y);
      sctx.lineTo(p1.x, p1.y);
      sctx.stroke();
    }
    for (j = 0; j < (showNodes ? NODE_DEFS.length : 0); j += 1) {
      ap0 = easeOut(clamp((t - 600 - j * 200) / 500, 0, 1));
      if (ap0 <= 0) { continue; }
      p0 = nodeXY(NODE_DEFS[j]);
      nr = 4.5 * ap0;
      if (n && n.def === NODE_DEFS[j]) { nr = nr * 1.7; }
      sctx.globalAlpha = ap0 * hv;
      sctx.fillStyle = "rgb(" + PAL.accrgb + ")";
      sctx.shadowColor = "rgba(" + PAL.glow + ",0.8)";
      sctx.shadowBlur = (n && n.def === NODE_DEFS[j]) ? 12 : 6;
      sctx.beginPath();
      sctx.arc(p0.x, p0.y, nr, 0, 6.2832);
      sctx.fill();
      sctx.shadowBlur = 0;
    }
    if (n) {
      p0 = n.p;
      sctx.globalAlpha = hv;
      sctx.fillStyle = PAL.acc2;
      sctx.font = "13px Georgia, serif";
      sctx.textAlign = (n.def.fx > 0.88) ? "right" : "left";
      lx = (n.def.fx > 0.88) ? p0.x - 12 : p0.x + 12;
      sctx.fillText(n.def.nm, lx, p0.y + 4);
      sctx.textAlign = "left";
    }
    sctx.globalAlpha = 1;
    sctx.fillStyle = "rgb(" + PAL.star + ")";
  }
  function renderDepth(t) {
    if (!dctx) { return; }
    var vw = window.innerWidth, vh = window.innerHeight;
    dctx.setTransform(SD, 0, 0, SD, 0, 0);
    var g = dctx.createRadialGradient(vw * 0.5, vh * 0.4, 40, vw * 0.5, vh * 0.4, Math.max(vw, vh));
    g.addColorStop(0, PAL.bg2);
    g.addColorStop(1, PAL.bg);
    dctx.fillStyle = g;
    dctx.fillRect(0, 0, vw, vh);
    dmx += (dmxT - dmx) * 0.05;
    dmy += (dmyT - dmy) * 0.05;
    autoYaw += 0.0013;
    var ca = Math.cos(autoYaw + dmx * 0.25), sa = Math.sin(autoYaw + dmx * 0.25);
    var cb = Math.cos(dmy * 0.12), sb = Math.sin(dmy * 0.12);
    var i, s, np, a;
    dctx.fillStyle = "rgb(" + PAL.star + ")";
    for (i = 0; i < dfield.length; i += 1) {
      s = dfield[i];
      np = proj3(s.x, s.y, s.z, ca, sa, cb, sb, vw, vh);
      if (np.zz < 60) { continue; }
      a = clamp(1 - np.zz / 4280, 0.08, 0.9);
      dctx.globalAlpha = a;
      dctx.beginPath();
      dctx.arc(np.sx, np.sy, s.r * np.sc * 0.6 + 0.4, 0, 6.2832);
      dctx.fill();
    }
    var hp = proj3(0, 0, 0, ca, sa, cb, sb, vw, vh);
    var j;
    dctx.strokeStyle = "rgba(" + PAL.accrgb + ",0.4)";
    dctx.lineWidth = 1;
    for (j = 0; j < dnodes.length; j += 1) {
      np = proj3(dnodes[j].x, dnodes[j].y, dnodes[j].z, ca, sa, cb, sb, vw, vh);
      if (np.zz < 60) { continue; }
      dctx.globalAlpha = clamp(0.7 * (1 - np.zz / 4280) + 0.2, 0.15, 0.8);
      dctx.beginPath();
      dctx.moveTo(hp.sx, hp.sy);
      dctx.lineTo(np.sx, np.sy);
      dctx.stroke();
    }
    dctx.globalAlpha = 0.9;
    dctx.fillStyle = "rgb(" + PAL.accrgb + ")";
    dctx.shadowColor = "rgba(" + PAL.glow + ",0.9)";
    dctx.shadowBlur = 14;
    dctx.beginPath();
    dctx.arc(hp.sx, hp.sy, 6, 0, 6.2832);
    dctx.fill();
    dctx.shadowBlur = 8;
    for (j = 0; j < dnodes.length; j += 1) {
      np = proj3(dnodes[j].x, dnodes[j].y, dnodes[j].z, ca, sa, cb, sb, vw, vh);
      if (np.zz < 60) { continue; }
      dctx.globalAlpha = clamp(0.9 * (1 - np.zz / 4280) + 0.2, 0.2, 1);
      dctx.beginPath();
      dctx.arc(np.sx, np.sy, 4.5 * np.sc * 0.6 + 1.5, 0, 6.2832);
      dctx.fill();
    }
    dctx.shadowBlur = 0;
    dctx.globalAlpha = 1;
  }
  function drawOnce() {
    if (!on) { return; }
    if (mode === "star") { renderStar(3200); } else { renderDepth(3200); }
  }
  function loop(t) {
    if (!on) { raf = 0; return; }
    if (mode === "star") { renderStar(t); } else { renderDepth(t); }
    raf = window.requestAnimationFrame(loop);
  }
  function onMove(e) {
    if (!on) { return; }
    dmxT = (e.clientX / window.innerWidth - 0.5) * 2;
    dmyT = (e.clientY / window.innerHeight - 0.5) * 2;
    msx = e.pageX;
    msy = e.pageY;
    if (mode !== "star") { return; }
    var n = nearestNode(msx, msy);
    if (n) {
      tipNm.textContent = n.def.nm;
      tipDs.textContent = n.def.ds;
      tip.style.opacity = "1";
      var tx = e.clientX + 16, ty = e.clientY + 16;
      if (tx > window.innerWidth - 270) { tx = e.clientX - 266; }
      if (ty > window.innerHeight - 110) { ty = e.clientY - 100; }
      tip.style.left = tx + "px";
      tip.style.top = ty + "px";
      if (reduced) { drawOnce(); }
    } else {
      tip.style.opacity = "0";
      if (reduced) { drawOnce(); }
    }
  }
  function onClick(e) {
    if (!on || mode !== "star") { return; }
    if (e.target && e.target.closest && e.target.closest("a, button")) { return; }
    var n = nearestNode(e.pageX, e.pageY);
    if (!n) { return; }
    if (n.def.go) {
      var b = document.querySelector(n.def.btn || "[sc-camel-on-click*=" + n.def.go + "]");
      if (b) { b.click(); return; }
    }
    window.open(n.def.url, "_blank", "noopener");
  }
  starC = makeCanvas("starCanvas");
  depthC = makeCanvas("depthCanvas");
  sctx = starC.getContext("2d");
  dctx = depthC.getContext("2d");
  makeTip();
  makeCue();
  build();
  window.addEventListener("resize", function () {
    window.clearTimeout(build._t);
    build._t = window.setTimeout(build, 200);
  });
  window.addEventListener("hashchange", function () {
    setMode();
    window.setTimeout(build, 500);
  });
  window.addEventListener("load", function () { window.setTimeout(build, 300); });
  window.addEventListener("scroll", updateCue, { passive: true });
  document.addEventListener("mousemove", onMove, { passive: true });
  document.addEventListener("mouseout", function (e) {
    if (!e.relatedTarget) { msx = -9999; msy = -9999; if (tip) { tip.style.opacity = "0"; } }
  });
  document.addEventListener("click", onClick);
  if (on && !reduced) { raf = window.requestAnimationFrame(loop); }
  else { drawOnce(); }
})();
