(function () {
  'use strict';
  /* Iteración 3.1 — El mapa es un cielo, no un menú.
     Cambios frente a Iteración 3: se eliminó por completo la cuadrícula de
     pastillas (también en móvil). El mapa ahora es una constelación orgánica
     en todos los tamaños: estrellas de distintos tamaños y brillos, líneas
     finas, disposición irregular, etiquetas flotantes en versales pequeñas
     sin fondo ni borde, y un área táctil invisible de 44px por nodo.
     Hover (escritorio) y toque (móvil) iluminan la estrella, engrosan sus
     líneas conectadas y muestran la descripción como texto flotante, sin caja.
     En móvil el cielo es vertical (400 x 560) para que las etiquetas se lean
     y los nodos se puedan tocar sin recortes ni solapes. El aviso inferior
     quedó en una sola línea corta. El resto de Iteración 3 sigue igual:
     canvas fijos en todas las rutas, paleta por ruta, franja de constelación
     en las demás páginas, Home corto, firma, ticker, Propose, vídeos, EN/ES. */
  var TERMINAL_INK = '0.177 0.008 171';
  var ROUTES = {
    home: { acc: '#92AC9B', rgb: '146,172,155', nm: 'Home', ds: 'You are here · Estás aquí — highlights & quick guide' },
    cases: { acc: '#9BB8D3', rgb: '155,184,211', nm: 'Case Studies', ds: 'Systems · risk decisions — sistemas y decisiones de riesgo' },
    coding: { acc: '#7FB8A6', rgb: '127,184,166', nm: 'Coding', ds: '8 live apps deployed — 8 apps en vivo' },
    client: { acc: '#C9A86A', rgb: '201,168,106', nm: 'Client Work', ds: '8 live engagements — 8 proyectos reales' },
    finance: { acc: '#D9B36A', rgb: '217,179,106', nm: 'Finance', ds: 'Tools & IB simulations — herramientas y simulaciones' },
    experience: { acc: '#A8B8C8', rgb: '168,184,200', nm: 'Experience', ds: 'Internships & roles — prácticas y roles' },
    writing: { acc: '#D8CDB4', rgb: '216,205,180', nm: 'Writing', ds: '110 essays, one a day — 110 ensayos, uno al día' },
    certs: { acc: '#B5C08A', rgb: '181,192,138', nm: 'Certifications', ds: '53 credentials — 53 credenciales' },
    recs: { acc: '#C08A7E', rgb: '192,138,126', nm: 'Recommendations', ds: 'Letter from The 1525 — carta de The 1525' }
  };
  var ORDER = ['home', 'cases', 'coding', 'client', 'finance', 'experience', 'writing', 'certs', 'recs'];
  var ALIASES = { 'case-studies': 'cases', 'casestudies': 'cases', 'client-work': 'client', 'marketing': 'experience', 'certifications': 'certs', 'recommendations': 'recs', 'cases': 'cases', 'coding': 'coding', 'client': 'client', 'finance': 'finance', 'experience': 'experience', 'writing': 'writing', 'certs': 'certs', 'recs': 'recs', 'home': 'home' };
  var PAGE_POS = { home: [90, 320], cases: [185, 140], coding: [305, 340], client: [425, 140], finance: [545, 340], experience: [665, 140], writing: [780, 340], certs: [875, 150], recs: [940, 320] };
  var PAGE_TOP = { cases: 1, client: 1, experience: 1, certs: 1 };
  var PAGE_SIZE = { home: 17, cases: 12, coding: 14, client: 12, finance: 14, experience: 11, writing: 12, certs: 11, recs: 12 };
  var M_POS = { home: [58, 58], cases: [215, 38], coding: [345, 95], client: [85, 165], finance: [255, 160], experience: [350, 235], writing: [110, 275], certs: [290, 295], recs: [185, 375] };
  var M_PROJ = { Lifeline: [70, 440], PitMind: [215, 430], Outsette: [340, 455], StoryForge: [130, 495], MissionMind: [320, 490], 'Orcen Kit': [80, 540], Tallyhound: [225, 545], OpsFlow: [355, 520] };
  var DECOR = [ [3, 12], [14, 8], [26, 4], [38, 10], [52, 6], [66, 12], [78, 4], [90, 10], [96, 20], [8, 30], [20, 48], [34, 26], [48, 48], [60, 30], [70, 48], [84, 32], [93, 45], [5, 55], [16, 72], [30, 88], [44, 70], [58, 90], [72, 72], [86, 88], [95, 68], [12, 92], [26, 64], [40, 80], [56, 60], [68, 84], [82, 62], [94, 84] ];
  var PROJECTS = [
    { nm: 'Lifeline', ds: '1st of 40 teams, Dell and NVIDIA hackathon', url: 'https://github.com/SGGmilagro/lifeline', go: 'goLifelineCase', btn: '[data-case=lifeline]', page: 'cases', x: 95, y: 478 },
    { nm: 'PitMind', ds: 'Most Innovative, IBM SkillsBuild', url: 'https://pitmind-bvihgej8qmkrzerqphkxb4.streamlit.app/', page: 'coding', x: 210, y: 478 },
    { nm: 'Outsette', ds: 'Live product', url: 'https://www.outsette.com/', page: 'coding', x: 325, y: 478 },
    { nm: 'Orcen Kit', ds: 'Apple valuation, 84 sheets', url: 'Apple_Valuation_v45.xlsx', page: 'finance', x: 440, y: 478 },
    { nm: 'Tallyhound', ds: 'Live demo', url: 'https://tallyhound-kfzktubxmdsrynimpoll.streamlit.app/', page: 'coding', x: 555, y: 478 },
    { nm: 'OpsFlow', ds: 'Agent proposes, code executes', url: 'https://opsflow-hso3.onrender.com/', page: 'coding', x: 670, y: 478 },
    { nm: 'StoryForge', ds: 'IBM AI Builders Challenge', url: 'https://storyforge-client-smoky.vercel.app/', page: 'client', x: 785, y: 478 },
    { nm: 'MissionMind', ds: 'IBM Bob AI Challenge', url: 'https://aleksarriola-max.github.io/missionmind/', page: 'cases', x: 895, y: 478 }
  ];
  var CSS = [
    '#starCanvas,#depthCanvas{position:fixed!important;top:0!important;left:0!important;width:100vw!important;height:100vh!important;min-height:100vh!important;z-index:0!important;pointer-events:none!important}',
    'body{--const-accent:#92AC9B;--const-accent-rgb:146,172,155}',
    'body.constellation-on{background:#0D1210}',
    'body[data-const-route="home"] section[data-screen-label="About"],body[data-const-route="home"] section[data-screen-label="How I work"],body[data-const-route="home"] section[data-screen-label="Recommendation"],body[data-const-route="home"] section[data-screen-label="Lifeline replay"],body[data-const-route="home"] section[data-screen-label="Finance tools"],body[data-const-route="home"] section[data-screen-label="Client work"]{display:none!important}',
    'body.constellation-on section[data-screen-label="Hero C"] h1{font-size:clamp(76px,9.5vw,148px)!important;line-height:.92!important;letter-spacing:-.03em!important}',
    'body.constellation-on section[data-screen-label="Hero C"] figure{margin-top:44px!important;border-top:1px solid rgba(var(--const-accent-rgb),.4)!important;padding-top:28px!important}',
    'body[data-const-route="home"] section[data-screen-label="Achievements"],body[data-const-route="home"] section[data-screen-label="Keep exploring"]{border-top:1px solid rgba(var(--const-accent-rgb),.35)!important}',
    '.constellation-map{position:relative;z-index:1;padding:88px 0 76px;border-top:1px solid rgba(var(--const-accent-rgb),.45);border-bottom:1px solid rgba(var(--const-accent-rgb),.18);background:radial-gradient(640px 320px at 18% 0%,rgba(var(--const-accent-rgb),.09),transparent 70%),radial-gradient(520px 300px at 88% 100%,rgba(var(--const-accent-rgb),.07),transparent 70%),transparent}',
    '.cm-inner{max-width:1180px;margin:0 auto;padding:0 24px}',
    '.cm-kicker{font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:var(--const-accent)}',
    '.cm-title{font-family:Georgia,serif;font-size:clamp(40px,5vw,68px);line-height:1.02;margin:14px 0 12px;color:#EDF3EB}',
    '.cm-sub{max-width:660px;color:rgba(237,243,235,.72);font-size:15px;line-height:1.6;margin:0}',
    '.cm-chart{position:relative;margin-top:38px;aspect-ratio:1000/520;min-height:340px}',
    '.cm-chart svg{position:absolute;inset:0;width:100%;height:100%}',
    '.cm-svg-m{display:none}',
    '.cm-link{stroke:rgba(var(--const-accent-rgb),.55);stroke-width:1;fill:none;transition:stroke-width .18s ease,stroke-opacity .18s ease}',
    '.cm-link-proj{stroke:rgba(var(--const-accent-rgb),.26);stroke-width:1;stroke-dasharray:3 4;fill:none;transition:stroke-width .18s ease,stroke-opacity .18s ease}',
    '.cm-nodes{position:absolute;inset:0}',
    '.cm-node{position:absolute;left:var(--x);top:var(--y);width:0;height:0;text-decoration:none;z-index:2;outline:none}',
    '.cm-node::after{content:"";position:absolute;left:-22px;top:-22px;width:44px;height:44px}',
    '.cm-dot{position:absolute;left:0;top:0;width:var(--s,12px);height:var(--s,12px);transform:translate(-50%,-50%);border-radius:50%;background:#0D1210;border:2px solid var(--const-accent);box-shadow:0 0 0 4px rgba(var(--const-accent-rgb),.12),0 0 14px rgba(var(--const-accent-rgb),.55);transition:transform .18s ease,background .18s ease,box-shadow .18s ease}',
    '.cm-node:hover .cm-dot,.cm-node:focus-visible .cm-dot,.cm-node:active .cm-dot{transform:translate(-50%,-50%) scale(1.5);background:var(--const-accent);box-shadow:0 0 0 6px rgba(var(--const-accent-rgb),.18),0 0 24px rgba(var(--const-accent-rgb),.85)}',
    '.cm-node.is-current .cm-dot{background:var(--const-accent);box-shadow:0 0 0 5px rgba(var(--const-accent-rgb),.2),0 0 22px rgba(var(--const-accent-rgb),.85)}',
    '.cm-node.cm-dim .cm-dot{opacity:.75;box-shadow:0 0 0 3px rgba(var(--const-accent-rgb),.08),0 0 8px rgba(var(--const-accent-rgb),.35)}',
    '.cm-label{position:absolute;left:0;top:14px;transform:translateX(-50%);font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:rgba(237,243,235,.88);white-space:nowrap}',
    '.cm-node.lab-t .cm-label{top:auto;bottom:14px}',
    '.cm-node.cm-proj .cm-label{font-size:9.5px;letter-spacing:.12em;color:rgba(237,243,235,.62)}',
    '.cm-desc{position:absolute;left:0;bottom:calc(100% + 14px);transform:translate(-50%,4px);width:max-content;max-width:200px;white-space:normal;text-align:center;font-size:12px;line-height:1.45;color:var(--const-accent);text-shadow:0 1px 6px #0D1210,0 0 14px #0D1210,0 0 4px #0D1210;opacity:0;pointer-events:none;transition:opacity .18s ease,transform .18s ease;z-index:6}',
    '.cm-node.lab-t .cm-desc{bottom:auto;top:calc(100% + 14px);transform:translate(-50%,-4px)}',
    '.cm-node:hover .cm-desc,.cm-node:focus-visible .cm-desc,.cm-node:active .cm-desc{opacity:1;transform:translate(-50%,0)}',
    '.cm-node.lab-t:hover .cm-desc,.cm-node.lab-t:focus-visible .cm-desc,.cm-node.lab-t:active .cm-desc{transform:translate(-50%,0)}',
    '.cm-star{position:absolute;width:2px;height:2px;border-radius:50%;background:rgba(224,230,224,.7);transform:translate(-50%,-50%);pointer-events:none}',
    '.cm-hint{margin-top:20px;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:rgba(237,243,235,.45)}',
    '.constellation-trail{position:relative;z-index:1;display:flex;gap:18px;overflow-x:auto;padding:16px 4px 20px;margin:0 0 8px;scrollbar-width:none}',
    '.constellation-trail::-webkit-scrollbar{display:none}',
    '.ct-node{display:flex;align-items:center;gap:8px;flex:0 0 auto;padding:6px 2px;text-decoration:none;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:rgba(237,243,235,.72);white-space:nowrap}',
    '.ct-node:hover{color:#EDF3EB}',
    '.ct-dot{width:8px;height:8px;border-radius:50%;background:transparent;border:1.5px solid var(--const-accent);box-shadow:0 0 8px rgba(var(--const-accent-rgb),.5)}',
    '.ct-node.is-current{color:var(--const-accent)}',
    '.ct-node.is-current .ct-dot{background:var(--const-accent);box-shadow:0 0 10px rgba(var(--const-accent-rgb),.8)}',
    '@media (max-width:900px){',
    '.constellation-map{padding:56px 0}',
    '.cm-chart{aspect-ratio:400/560;min-height:0}',
    '.cm-svg-d{display:none}',
    '.cm-svg-m{display:block}',
    '.cm-node{left:var(--mx);top:var(--my)}',
    '.cm-node .cm-label{left:12px;right:auto;top:0;bottom:auto;transform:translateY(-50%)}',
    '.cm-node.lab-l .cm-label{left:auto;right:12px}',
    '.cm-node.lab-t .cm-label{left:12px;right:auto;top:0;bottom:auto;transform:translateY(-50%)}',
    '.cm-node.lab-t.lab-l .cm-label{left:auto;right:12px}',
    '.cm-node .cm-desc,.cm-node.lab-t .cm-desc{top:calc(100% + 12px);bottom:auto;transform:translate(-50%,-4px);max-width:150px;font-size:11px}',
    '.cm-node:hover .cm-desc,.cm-node:focus-visible .cm-desc,.cm-node:active .cm-desc,.cm-node.lab-t:hover .cm-desc,.cm-node.lab-t:focus-visible .cm-desc,.cm-node.lab-t:active .cm-desc{transform:translate(-50%,0)}',
    '.cm-hint{font-size:10px}',
    '}',
    '@media (prefers-reduced-motion:reduce){.cm-dot{box-shadow:none}}'
  ].join('\n');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var W = 0, H = 0, SD = 1, mode = 'star', route = 'home', lastRoute = '', raf = 0, tries = 0;
  var starC = null, depthC = null, sctx = null, dctx = null, cue = null;
  var stars = [], links = [], dpts = [], depthSeed = 0;
  var curRgb = [146, 172, 155], tgtRgb = [146, 172, 155];
  var dmx = 0, dmy = 0, dmxT = 0, dmyT = 0, t0 = Date.now();
  var moTimer = 0;
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function mulberry(seed) { var a = seed >>> 0; return function () { a |= 0; a = (a + 0x6D2B79F5) | 0; var t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  function isTerminal() { var v = ''; try { v = window.getComputedStyle(document.body).getPropertyValue('--ink'); } catch (e) { v = ''; } return v.indexOf(TERMINAL_INK) !== -1; }
  function currentRoute() {
    var h = location.hash || '';
    if (h.charAt(0) === '#') h = h.slice(1);
    if (h.charAt(0) === '/') h = h.slice(1);
    h = h.split('?')[0].split('/')[0];
    if (!h) { var p = location.pathname || ''; if (p.charAt(0) === '/') p = p.slice(1); if (p.slice(-5) === '.html') p = p.slice(0, -5); else if (p.slice(-4) === '.htm') p = p.slice(0, -4); h = (p === '' || p === 'index') ? '' : p; }
    h = ALIASES[h] || h;
    return ROUTES[h] ? h : 'home';
  }
  function findHero() {
    var secs = document.querySelectorAll('section[data-screen-label]');
    for (var q = 0; q < secs.length; q++) { if (secs[q].getAttribute('data-screen-label') === 'Hero C') return secs[q]; }
    return null;
  }
  function makeCanvas(id) {
    var c = document.getElementById(id);
    if (c) return c;
    c = document.createElement('canvas');
    c.id = id;
    c.setAttribute('aria-hidden', 'true');
    document.body.appendChild(c);
    return c;
  }
  function ensureStyle() {
    if (document.getElementById('constellation-iter3')) return;
    var st = document.createElement('style');
    st.id = 'constellation-iter3';
    st.textContent = CSS;
    document.head.appendChild(st);
  }
  function sizeCanvases() {
    W = window.innerWidth || 1200; H = window.innerHeight || 800;
    SD = Math.min(window.devicePixelRatio || 1, 2);
    [starC, depthC].forEach(function (c) { if (!c) return; c.width = Math.floor(W * SD); c.height = Math.floor(H * SD); c.style.width = W + 'px'; c.style.height = H + 'px'; });
    if (sctx) sctx.setTransform(SD, 0, 0, SD, 0, 0);
    if (dctx) dctx.setTransform(SD, 0, 0, SD, 0, 0);
    makeStars();
  }
  function makeStars() {
    var rnd = mulberry(42);
    var n = Math.round(clamp(W * H / 9000, 90, 210));
    stars = [];
    for (var i = 0; i < n; i++) stars.push({ x: rnd() * W, y: rnd() * H, r: 0.4 + rnd() * 1.3, ph: rnd() * 6.283, sp: 0.4 + rnd() * 1.2, d: 0.2 + rnd() * 0.8, acc: rnd() < 0.16 });
    links = stars.slice(0, 70);
  }
  function makeDepth(seed) {
    var rnd = mulberry(seed);
    dpts = [];
    for (var i = 0; i < 240; i++) {
      var u = rnd() * 2 - 1, ph = rnd() * 6.283, s = Math.sqrt(1 - u * u);
      dpts.push({ x: s * Math.cos(ph), y: u, z: s * Math.sin(ph), r: 0.6 + rnd() * 1.4, ph: rnd() * 6.283 });
    }
  }
  function drawStars(t) {
    var sy = window.pageYOffset || document.documentElement.scrollTop || 0;
    sctx.clearRect(0, 0, W, H);
    var i, j, s, x, y, a;
    sctx.lineWidth = 1;
    for (i = 0; i < links.length; i++) {
      for (j = i + 1; j < links.length; j++) {
        var dx = links[i].x - links[j].x, dy = links[i].y - links[j].y;
        if (dx * dx + dy * dy < 13000) { sctx.strokeStyle = 'rgba(' + curRgb.join(',') + ',0.05)'; sctx.beginPath(); sctx.moveTo(links[i].x + dmx * links[i].d * 14, (links[i].y + sy * 0.06 * links[i].d) % H); sctx.lineTo(links[j].x + dmx * links[j].d * 14, (links[j].y + sy * 0.06 * links[j].d) % H); sctx.stroke(); }
      }
    }
    for (i = 0; i < stars.length; i++) {
      s = stars[i];
      x = s.x + dmx * s.d * 18;
      y = (s.y + sy * 0.06 * s.d) % H;
      a = (0.55 + 0.45 * (0.5 + 0.5 * Math.sin(t * s.sp + s.ph))) * 0.92;
      sctx.fillStyle = s.acc ? 'rgba(' + curRgb.join(',') + ',' + a.toFixed(3) + ')' : 'rgba(224,230,224,' + a.toFixed(3) + ')';
      sctx.beginPath(); sctx.arc(x, y, s.r, 0, 6.283); sctx.fill();
    }
  }
  function drawDepth(t) {
    dctx.clearRect(0, 0, W, H);
    var cx = W * 0.5, cy = H * 0.46, R = Math.min(W, H) * 0.42;
    var tilt = (ORDER.indexOf(route) + 1) * 0.35, ang = t * 0.06;
    var i, p, xr, yr, zr, persp, x, y, a;
    dctx.strokeStyle = 'rgba(' + curRgb.join(',') + ',0.14)';
    dctx.lineWidth = 1;
    dctx.beginPath(); dctx.ellipse(cx, cy, R, R * 0.32, 0, 0, 6.283); dctx.stroke();
    dctx.beginPath(); dctx.ellipse(cx, cy, R * 0.66, R * 0.66, 0, 0, 6.283); dctx.stroke();
    for (i = 0; i < dpts.length; i++) {
      p = dpts[i];
      xr = p.x * Math.cos(ang) - p.z * Math.sin(ang);
      zr = p.x * Math.sin(ang) + p.z * Math.cos(ang);
      yr = p.y * Math.cos(tilt) - zr * Math.sin(tilt);
      zr = p.y * Math.sin(tilt) + zr * Math.cos(tilt);
      persp = 1 / (1.9 - zr * 0.55);
      x = cx + xr * R * persp; y = cy + yr * R * persp;
      a = clamp(0.25 + persp * 0.55 + 0.2 * Math.sin(t * 0.8 + p.ph), 0.12, 0.95);
      dctx.fillStyle = 'rgba(' + curRgb.join(',') + ',' + a.toFixed(3) + ')';
      dctx.beginPath(); dctx.arc(x, y, p.r * persp, 0, 6.283); dctx.fill();
    }
    var g = dctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.5);
    g.addColorStop(0, 'rgba(' + curRgb.join(',') + ',0.10)'); g.addColorStop(1, 'rgba(' + curRgb.join(',') + ',0)');
    dctx.fillStyle = g; dctx.beginPath(); dctx.arc(cx, cy, R * 0.5, 0, 6.283); dctx.fill();
  }
  function frame() {
    var t = (Date.now() - t0) / 1000;
    dmx += (dmxT - dmx) * 0.04; dmy += (dmyT - dmy) * 0.04;
    for (var k = 0; k < 3; k++) curRgb[k] += (tgtRgb[k] - curRgb[k]) * 0.06;
    if (mode === 'star') { drawStars(t); } else { drawDepth(t); }
    if (!reduced) raf = requestAnimationFrame(frame);
  }
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function nodeHtml(kind, key, label, ds, href, extra, pos, mpos, labD, size, dim) {
    var labM = mpos[0] > 200 ? 'l' : 'r';
    return '<a class="cm-node' + (kind === 'proj' ? ' cm-proj' : '') + (labD === 't' ? ' lab-t' : '') + (labM === 'l' ? ' lab-l' : '') + (dim ? ' cm-dim' : '') + (key === route && kind === 'page' ? ' is-current' : '') + (key === 'home' && kind === 'page' ? ' is-home' : '') + '" style="--x:' + (pos[0] / 10) + '%;--y:' + (pos[1] / 5.2) + '%;--mx:' + (mpos[0] / 4) + '%;--my:' + (mpos[1] / 5.6) + '%;--s:' + size + 'px" href="' + href + '" data-key="' + key + '"' + extra + (key === route && kind === 'page' ? ' aria-current="page"' : '') + '><span class="cm-dot"></span><span class="cm-label">' + esc(label) + '</span><span class="cm-desc">' + esc(ds) + '</span></a>';
  }
  function segLines(posOf, cls, aKey, bKey) {
    var s = '';
    for (var i = 0; i < ORDER.length - 1; i++) {
      var a = posOf(ORDER[i]), b = posOf(ORDER[i + 1]);
      s += '<line class="' + cls + '" x1="' + a[0] + '" y1="' + a[1] + '" x2="' + b[0] + '" y2="' + b[1] + '" data-a="' + ORDER[i] + '" data-b="' + ORDER[i + 1] + '"/>';
    }
    return s;
  }
  function buildMap() {
    var sec = document.createElement('section');
    sec.id = 'constellation-map';
    sec.className = 'constellation-map';
    sec.setAttribute('aria-label', 'Constellation navigation — Navegación por constelación');
    var linesD = segLines(function (r) { return PAGE_POS[r]; }, 'cm-link');
    var linesM = segLines(function (r) { return M_POS[r]; }, 'cm-link');
    PROJECTS.forEach(function (p, idx) {
      linesD += '<line class="cm-link-proj" x1="' + p.x + '" y1="' + p.y + '" x2="' + PAGE_POS[p.page][0] + '" y2="' + PAGE_POS[p.page][1] + '" data-a="p' + idx + '" data-b="' + p.page + '"/>';
      var mp = M_PROJ[p.nm];
      linesM += '<line class="cm-link-proj" x1="' + mp[0] + '" y1="' + mp[1] + '" x2="' + M_POS[p.page][0] + '" y2="' + M_POS[p.page][1] + '" data-a="p' + idx + '" data-b="' + p.page + '"/>';
    });
    var starsHtml = '';
    DECOR.forEach(function (p, i) { starsHtml += '<span class="cm-star" aria-hidden="true" style="left:' + p[0] + '%;top:' + p[1] + '%;width:' + (1 + (i % 3) * 0.6) + 'px;height:' + (1 + (i % 3) * 0.6) + 'px;opacity:' + (0.3 + (i % 4) * 0.12).toFixed(2) + '"></span>'; });
    var nodes = '';
    ORDER.forEach(function (r) { nodes += nodeHtml('page', r, ROUTES[r].nm, ROUTES[r].ds, r === 'home' ? '#home' : '#' + r, '', PAGE_POS[r], M_POS[r], PAGE_TOP[r] ? 't' : 'b', PAGE_SIZE[r], (r === 'experience' || r === 'certs') ? 1 : 0); });
    PROJECTS.forEach(function (p, idx) { nodes += nodeHtml('proj', 'p' + idx, p.nm, p.ds, p.url, (p.go ? ' data-go="' + p.go + '" data-btn="' + p.btn + '"' : '') + ' target="_blank" rel="noopener"', [p.x, p.y], M_PROJ[p.nm], 'b', p.nm === 'Lifeline' ? 9 : 8, (p.nm === 'PitMind' || p.nm === 'OpsFlow') ? 1 : 0); });
    sec.innerHTML = '<div class="cm-inner"><p class="cm-kicker">Explore by constellation — Explora por constelación</p><h2 class="cm-title">Follow the stars · Sigue las estrellas.</h2><p class="cm-sub">Every star is a real page or project. Hover to see what it is, click to travel there — this is the map, not decoration. / Cada estrella es una página o un proyecto real. Pasa el cursor para ver qué es y haz clic para viajar: es el mapa, no decoración.</p><div class="cm-chart"><svg class="cm-svg-d" viewBox="0 0 1000 520" preserveAspectRatio="none" aria-hidden="true">' + linesD + '</svg><svg class="cm-svg-m" viewBox="0 0 400 560" preserveAspectRatio="none" aria-hidden="true">' + linesM + '</svg><div class="cm-nodes">' + starsHtml + nodes + '</div></div><p class="cm-hint">Hover or tap a star to travel · Toca una estrella para viajar</p></div>';
    var chart = sec.querySelector('.cm-chart');
    var mapLines = sec.querySelectorAll('.cm-link, .cm-link-proj');
    function setHot(key) {
      for (var i = 0; i < mapLines.length; i++) {
        var el = mapLines[i];
        if (!key) { el.style.strokeOpacity = ''; el.style.strokeWidth = ''; continue; }
        var on = el.getAttribute('data-a') === key || el.getAttribute('data-b') === key;
        el.style.strokeOpacity = on ? '1' : '0.22';
        el.style.strokeWidth = on ? '2' : '';
      }
    }
    var mapNodes = sec.querySelectorAll('.cm-node');
    for (var n = 0; n < mapNodes.length; n++) {
      (function (a) {
        var k = a.getAttribute('data-key');
        a.addEventListener('mouseenter', function () { setHot(k); });
        a.addEventListener('mouseleave', function () { setHot(null); });
        a.addEventListener('focus', function () { setHot(k); });
        a.addEventListener('blur', function () { setHot(null); });
        a.addEventListener('touchstart', function () { setHot(k); }, { passive: true });
      })(mapNodes[n]);
    }
    sec.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a[data-go]') : null;
      if (!a) return;
      var btn = document.querySelector(a.getAttribute('data-btn'));
      if (btn) { e.preventDefault(); btn.click(); }
    });
    return sec;
  }
  function ensureMap() {
    var existing = document.getElementById('constellation-map');
    if (route !== 'home') { if (existing && existing.parentNode) existing.parentNode.removeChild(existing); return; }
    var hero = findHero();
    if (!hero || !hero.parentNode) return;
    if (!existing) { existing = buildMap(); hero.parentNode.insertBefore(existing, hero.nextSibling); return; }
    if (existing.parentNode !== hero.parentNode || existing.previousSibling !== hero) hero.parentNode.insertBefore(existing, hero.nextSibling);
    var cur = existing.querySelectorAll('.cm-node.is-current');
    for (var i = 0; i < cur.length; i++) { cur[i].classList.remove('is-current'); cur[i].removeAttribute('aria-current'); }
    var mine = existing.querySelector('.cm-node[href="#' + route + '"]');
    if (mine) { mine.classList.add('is-current'); mine.setAttribute('aria-current', 'page'); }
  }
  function buildTrail() {
    var nav = document.createElement('nav');
    nav.className = 'constellation-trail';
    nav.setAttribute('aria-label', 'Constellation navigation — Navegación por constelación');
    var html = '';
    ORDER.forEach(function (r) { html += '<a class="ct-node' + (r === route ? ' is-current' : '') + '" href="#' + r + '"' + (r === route ? ' aria-current="page"' : '') + '><span class="ct-dot"></span>' + ROUTES[r].nm + '</a>'; });
    nav.innerHTML = html;
    return nav;
  }
  function ensureTrail() {
    var main = document.querySelector('main');
    if (!main) return;
    var first = main.querySelector('section[data-screen-label]');
    var existing = main.querySelector('.constellation-trail');
    if (route === 'home') { if (existing && existing.parentNode) existing.parentNode.removeChild(existing); return; }
    if (!first) return;
    if (existing && existing.parentNode === first && existing === first.firstChild) {
      var cur = existing.querySelectorAll('.ct-node.is-current');
      for (var i = 0; i < cur.length; i++) { cur[i].classList.remove('is-current'); cur[i].removeAttribute('aria-current'); }
      var mine = existing.querySelector('.ct-node[href="#' + route + '"]');
      if (mine) { mine.classList.add('is-current'); mine.setAttribute('aria-current', 'page'); }
      return;
    }
    if (existing && existing.parentNode) existing.parentNode.removeChild(existing);
    first.insertBefore(buildTrail(), first.firstChild);
  }
  function applyRoute() {
    route = currentRoute();
    var pal = ROUTES[route];
    tgtRgb = pal.rgb.split(',').map(function (v) { return parseInt(v, 10); });
    if (reduced) curRgb = tgtRgb.slice();
    document.body.classList.add('constellation-on');
    document.body.setAttribute('data-const-route', route);
    document.body.style.setProperty('--const-accent', pal.acc);
    document.body.style.setProperty('--const-accent-rgb', pal.rgb);
    mode = route === 'home' ? 'star' : 'depth';
    if (starC) { starC.classList.toggle('mode-on', mode === 'star'); starC.style.display = mode === 'star' ? 'block' : 'none'; }
    if (depthC) { depthC.classList.toggle('mode-on', mode === 'depth'); depthC.style.display = mode === 'depth' ? 'block' : 'none'; }
    if (route !== lastRoute) {
      var seed = (ORDER.indexOf(route) + 1) * 7919 + 13;
      if (seed !== depthSeed) { depthSeed = seed; makeDepth(seed); }
      lastRoute = route;
    }
    if (cue) cue.style.opacity = route === 'home' ? '1' : '0';
    if (reduced) { var t = (Date.now() - t0) / 1000; if (mode === 'star') drawStars(t); else drawDepth(t); }
  }
  function ensureAll() { applyRoute(); ensureMap(); ensureTrail(); }
  function boot() {
    var spa = !!document.querySelector('x-dc, section[data-screen-label]');
    if (!spa && !isTerminal()) return;
    ensureStyle();
    starC = makeCanvas('starCanvas'); depthC = makeCanvas('depthCanvas');
    sctx = starC.getContext('2d'); dctx = depthC.getContext('2d');
    if (!document.getElementById('constellation-cue')) {
      cue = document.createElement('div'); cue.id = 'constellation-cue';
      cue.textContent = 'SCROLL ↓ · THE STARS ARE THE MAP — LAS ESTRELLAS SON EL MAPA';
      document.body.appendChild(cue);
    } else { cue = document.getElementById('constellation-cue'); cue.textContent = 'SCROLL ↓ · THE STARS ARE THE MAP — LAS ESTRELLAS SON EL MAPA'; }
    sizeCanvases();
    applyRoute();
    ensureAll();
    var rzT = 0;
    window.addEventListener('resize', function () { if (rzT) clearTimeout(rzT); rzT = setTimeout(function () { sizeCanvases(); if (reduced) { var t = (Date.now() - t0) / 1000; if (mode === 'star') drawStars(t); else drawDepth(t); } }, 200); });
    window.addEventListener('mousemove', function (e) { dmxT = (e.clientX / (window.innerWidth || 1) - 0.5) * 2; dmyT = (e.clientY / (window.innerHeight || 1) - 0.5) * 2; });
    window.addEventListener('hashchange', function () { applyRoute(); ensureAll(); });
    var mo = new MutationObserver(function () { if (moTimer) return; moTimer = setTimeout(function () { moTimer = 0; ensureAll(); }, 180); });
    mo.observe(document.documentElement, { childList: true, subtree: true });
    var poll = setInterval(function () { tries++; ensureAll(); if (tries > 10 && document.getElementById('constellation-map')) clearInterval(poll); if (tries > 90) clearInterval(poll); }, 300);
    if (!reduced) raf = requestAnimationFrame(frame); else frame();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
