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
    coding: { acc: '#7FB8A6', rgb: '127,184,166', nm: 'Coding', ds: '9 live apps deployed — 9 apps en vivo' },
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

/* Iteración 3.1 (corrección móvil): separar las etiquetas del cielo vertical
   que quedaban en contacto en la verificación a 390px (CLIENT WORK / FINANCE
   y STORYFORGE / MISSIONMIND) y afinar el espaciado de las etiquetas.
   Las posiciones de escritorio no cambian; solo se corrigen las variables
   móviles (--mx / --my) con !important dentro del mismo media query. */
(function () {
  'use strict';
  var s = document.createElement('style');
  s.id = 'constellation-iter31-mobile-fix';
  s.textContent = '@media (max-width:900px){' +
    '.cm-node[data-key="client"]{--mx:17.5%!important;--my:30.4%!important}' +
    '.cm-node[data-key="finance"]{--mx:72.5%!important;--my:28.6%!important}' +
    '.cm-node[data-key="p7"]{--mx:82.5%!important;--my:87.5%!important}' +
    '.cm-node[data-key="p5"]{--mx:90%!important;--my:93.75%!important}' +
    '.cm-node .cm-label{letter-spacing:.13em}' +
    '.cm-node.cm-proj .cm-label{letter-spacing:.10em}' +
    '}';
  document.head.appendChild(s);
})();
/* Iteración 3.1 (fix móvil 2): separar ORCEN KIT / TALLYHOUND. En la segunda
   verificación a 390px sus etiquetas se solapaban ~26px en la fila inferior del
   cielo vertical (puntos demasiado juntos y etiquetas hacia adentro). Tallyhound
   se mueve a la derecha y Orcen Kit un poco a la izquierda; el resto no cambia. */
(function () {
  'use strict';
  var s = document.createElement('style');
  s.id = 'constellation-iter31-mobile-fix2';
  s.textContent = '@media (max-width:900px){' +
    '.cm-node[data-key="p3"]{--mx:17.5%!important}' +
    '.cm-node[data-key="p4"]{--mx:75%!important}' +
  '}';
  document.head.appendChild(s);
})();
/* Iteración 4 — la constelación vive, FIG.0 se juega y el héroe se disuelve al hacer scroll.
   Qué entra en esta pasada (rama de vista previa, sin tocar main):
   1) La constelación como grafo de datos vivo: pulsos luminosos recorren las aristas del
      mapa y de la franja con el color del acento de la página de destino. Solo se animan
      cuando el mapa está en ventanilla y respetan prefers-reduced-motion.
   2) FIG.0 jugable — «RUN THE GATE»: una ficha de latón viaja por las cinco etapas
      (INPUT → LLM AGENT → POLICY GATE → ENGINE → OUTPUT); la puerta de políticas aprueba o
      bloquea cada propuesta según una regla visible, y la ficha se desvía a ESCALATE cuando
      la bloquean. Los contadores PROPOSED / EXECUTED / ESCALATED se actualizan en pantalla
      y queda una línea de bitácora con el veredicto.
   3) El héroe se disuelve al hacer scroll: las palabras del titular suben y se desvanecen
      con ScrollTrigger (scrub, sin pin) y las líneas del mapa se dibujan al entrar en
      ventanilla, con los nodos apareciendo en cascada.
   4) Tipografía y contraste: el mapa pasa a ser «FIG. 1» — continuación de FIG.0 —, la
      sección de logros gana una regla doble de latón y sus numerales en latón, la
      marquesina del toolkit gana separadores de latón y «Keep exploring» gana un hover de
      salvia. La banda crema de logros ya existía y se respeta como la única banda clara.
   Queda para la siguiente pasada (más arriesgado): capítulos fijados con ScrollTrigger
   (pin). La Iteración 2 evitó el pin deliberadamente y fijar el héroe sobre la barra
   lateral fija puede romper el maquetado; esta pasada usa scrub sin pin. */
(function () {
  'use strict';

  var BRASS = '#D9B36A';
  var ACCENT = {home:'#92AC9B',cases:'#9BB8D3',coding:'#7FB8A6',client:'#C9A86A',finance:'#D9B36A',experience:'#A8B8C8',writing:'#D8CDB4',certs:'#B5C08A',recs:'#C08A7E'};
  var PROJ = {p0:'#7FB8A6',p1:'#C08A7E',p2:'#D9B36A',p3:'#9BB8D3',p4:'#92AC9B',p5:'#C9A86A',p6:'#D8CDB4',p7:'#A8B8C8'};
  var REDUCED = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var SVGNS = 'http://www.w3.org/2000/svg';

  var CSS = [
    '.i4-pulse{pointer-events:none;filter:drop-shadow(0 0 6px rgba(217,179,106,.85))}',
    '.i4-gate-btn{display:inline-block;margin:6px 0 0 10px;padding:9px 15px;border:1px solid rgba(146,172,155,.6);border-radius:999px;background:transparent;color:#D9B36A;font:700 11px/1 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;letter-spacing:.14em;text-transform:uppercase;cursor:pointer;vertical-align:middle}',
    '.i4-gate-btn:hover,.i4-gate-btn:focus-visible{border-color:#D9B36A;background:rgba(217,179,106,.14);outline:none}',
    '.i4-gate-btn[disabled]{opacity:.45;cursor:default}',
    '.i4-gate-log{margin:10px 0 0;font:500 12px/1.65 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;letter-spacing:.02em;color:rgba(237,243,235,.78)}',
    '.i4-gate-log b{color:#D9B36A;font-weight:700}',
    '.i4-gate-log .i4-ok{color:#92AC9B}',
    '.i4-gate-log .i4-no{color:#E08E7E}',
    '.i4-gate-token{position:fixed;left:0;top:0;width:16px;height:16px;margin:-8px 0 0 -8px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#F6E7B4,#D9B36A 55%,#9C7A33);box-shadow:0 0 16px 4px rgba(217,179,106,.55);z-index:9999;pointer-events:none}',
    '.i4-gate-hot{outline:1px solid rgba(217,179,106,.95)!important;outline-offset:3px;box-shadow:0 0 26px rgba(217,179,106,.30)!important}',
    '.i4-gate-blocked{outline:1px solid rgba(224,142,126,.95)!important;outline-offset:3px;box-shadow:0 0 26px rgba(224,142,126,.38)!important}',
    '.i4-w{display:inline-block;will-change:transform,opacity}',
    '.i4-fig1{display:inline-block;margin-right:10px;color:#D9B36A;font:700 11px/1 ui-monospace,Menlo,monospace;letter-spacing:.18em}',
    '.i4-diamond{display:inline-block;margin:0 14px;color:#D9B36A;font-size:10px;vertical-align:middle}',
    '[data-screen-label="Achievements" i]{border-top:3px double rgba(180,140,70,.65)}',
    '[data-screen-label="Achievements" i] .i4-ach-num{color:#D9B36A!important}',
    '[data-screen-label="Keep exploring" i] button{transition:background-color .25s,color .25s,padding-left .25s}',
    '[data-screen-label="Keep exploring" i] button:hover,[data-screen-label="Keep exploring" i] button:focus-visible{background:rgba(146,172,155,.18);padding-left:26px;outline:none}',
    '@media (max-width:900px){.i4-gate-btn{display:block;margin:10px 0 0}.i4-diamond{margin:0 8px}}'
  ].join('\n');
  var st = document.createElement('style'); st.id = 'constellation-iter4'; st.textContent = CSS; document.head.appendChild(st);

  function all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function txt(el) { return (el.textContent || '').trim(); }
  function leafWithText(t) {
    var els = all('*');
    for (var i = 0; i < els.length; i++) { var el = els[i]; if (!el.children.length && txt(el) === t) return el; }
    return null;
  }
  function sectionByLabel(label) {
    var l = String(label).toLowerCase(), found = null;
    all('[data-screen-label]').some(function (el) {
      if ((el.getAttribute('data-screen-label') || '').toLowerCase() === l) { found = el; return true; }
      return false;
    });
    return found;
  }
  function wait(ms) { return new Promise(function (res) { setTimeout(res, ms); }); }

  /* ---------- 1) La constelación como grafo de datos vivo ---------- */
  function segmentsOf(svg) {
    var segs = [];
    all('line', svg).forEach(function (l) {
      var x1 = parseFloat(l.getAttribute('x1')), y1 = parseFloat(l.getAttribute('y1'));
      var x2 = parseFloat(l.getAttribute('x2')), y2 = parseFloat(l.getAttribute('y2'));
      if (!isFinite(x1) || !isFinite(x2)) return;
      segs.push({line: l, x1: x1, y1: y1, x2: x2, y2: y2, len: Math.max(1, Math.hypot(x2 - x1, y2 - y1)), key: (l.getAttribute('data-b') || l.getAttribute('data-a') || '')});
    });
    if (!segs.length) {
      all('path', svg).forEach(function (p) {
        try {
          var L = p.getTotalLength(); if (!L || L < 10) return;
          segs.push({path: p, len: L, key: (p.getAttribute('data-b') || p.getAttribute('data-a') || '')});
        } catch (e) {}
      });
    }
    return segs;
  }
  function installPulses() {
    if (REDUCED) return;
    all('svg[class*="cm-svg"]').forEach(function (svg) {
      if (svg.getAttribute('data-i4-pulses')) return;
      var segs = segmentsOf(svg);
      if (!segs.length) return;
      svg.setAttribute('data-i4-pulses', '1');
      var pulses = segs.map(function (sg, i) {
        var c = document.createElementNS(SVGNS, 'circle');
        c.setAttribute('r', '2.6'); c.setAttribute('class', 'i4-pulse');
        c.setAttribute('fill', ACCENT[sg.key] || PROJ[sg.key] || BRASS);
        svg.appendChild(c);
        return {el: c, sg: sg, t: (i * 0.37) % 1, rate: 55 / sg.len};
      });
      var visible = false, last = 0;
      function loop(now) {
        if (!visible) return;
        var dt = Math.min(64, now - (last || now)); last = now;
        pulses.forEach(function (p) {
          p.t += (dt / 1000) * p.rate; if (p.t > 1) p.t = 0;
          var x, y;
          if (p.sg.path) { var pt = p.sg.path.getPointAtLength(p.t * p.sg.len); x = pt.x; y = pt.y; }
          else { x = p.sg.x1 + (p.sg.x2 - p.sg.x1) * p.t; y = p.sg.y1 + (p.sg.y2 - p.sg.y1) * p.t; }
          p.el.setAttribute('cx', x.toFixed(1)); p.el.setAttribute('cy', y.toFixed(1));
          p.el.setAttribute('opacity', (0.3 + 0.7 * Math.sin(p.t * Math.PI)).toFixed(2));
        });
        requestAnimationFrame(loop);
      }
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting && !visible) { visible = true; last = 0; requestAnimationFrame(loop); }
          else if (!en.isIntersecting) visible = false;
        });
      }, {rootMargin: '240px'});
      io.observe(svg);
    });
  }

  /* ---------- 3) El héroe se disuelve; el mapa se dibuja al entrar ---------- */
  function splitWords(el) {
    function walk(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (ch) {
        if (ch.nodeType === 3) {
          ch.nodeValue.split(/(\s+)/).forEach(function (part) {
            if (!part) return;
            if (/^\s+$/.test(part)) node.insertBefore(document.createTextNode(part), ch);
            else { var s = document.createElement('span'); s.className = 'i4-w'; s.textContent = part; node.insertBefore(s, ch); }
          });
          node.removeChild(ch);
        } else if (ch.nodeType === 1) walk(ch);
      });
    }
    walk(el);
  }
  var heroTween = null, heroH1 = null;
  function installMapDraw(svg) {
    if (!svg || svg.getAttribute('data-i4-draw')) return;
    if (svg.getBoundingClientRect().width <= 0) return;
    var solid = all('line', svg).filter(function (l) { return l.classList && l.classList.contains('cm-link'); });
    var dashed = all('line', svg).filter(function (l) { return l.classList && l.classList.contains('cm-link-proj'); });
    var holder = svg.parentElement;
    var dots = (holder && !holder.getAttribute('data-i4-dots')) ? all('.cm-dot', holder) : [];
    if (!solid.length && !dashed.length && !dots.length) return;
    svg.setAttribute('data-i4-draw', '1');
    try {
      if (solid.length) {
        solid.forEach(function (l) { try { l.setAttribute('pathLength', '1'); } catch (e) {} });
        window.gsap.fromTo(solid, {strokeDasharray: 1, strokeDashoffset: 1}, {strokeDashoffset: 0, ease: 'none', stagger: 0.05, scrollTrigger: {id: 'i4-map', trigger: svg, start: 'top 92%', end: 'top 45%', scrub: true}});
      }
      if (dashed.length) {
        window.gsap.fromTo(dashed, {opacity: 0}, {opacity: 1, ease: 'none', stagger: 0.08, scrollTrigger: {id: 'i4-map-p', trigger: svg, start: 'top 92%', end: 'top 45%', scrub: true}});
      }
      if (dots.length) {
        holder.setAttribute('data-i4-dots', '1');
        window.gsap.fromTo(dots, {scale: 0.4, opacity: 0}, {scale: 1, opacity: 1, ease: 'none', stagger: 0.04, scrollTrigger: {id: 'i4-map-d', trigger: svg, start: 'top 90%', end: 'top 42%', scrub: true}});
      }
    } catch (e) {}
  }
  function installChoreo() {
    if (REDUCED || !window.gsap || !window.ScrollTrigger) return;
    try { window.gsap.registerPlugin(window.ScrollTrigger); } catch (e) { return; }
    var h1 = all('h1').filter(function (h) { return /AGENTIC AI/i.test(h.textContent || ''); })[0] || null;
    if (h1 !== heroH1) {
      if (heroTween) { try { if (heroTween.scrollTrigger) heroTween.scrollTrigger.kill(); heroTween.kill(); } catch (e) {} heroTween = null; }
      heroH1 = h1;
      if (h1) {
        if (!h1.querySelector('.i4-w')) splitWords(h1);
        var words = all('.i4-w', h1);
        var hero = h1.closest('[data-screen-label]') || h1;
        if (words.length) {
          heroTween = window.gsap.to(words, {y: -70, opacity: 0, scale: 0.88, ease: 'none', stagger: {each: 0.045}, scrollTrigger: {id: 'i4-hero', trigger: hero, start: 'top top', end: 'bottom top', scrub: true}});
        }
      }
    }
    all('svg[class*="cm-svg"]').forEach(function (svg) { try { installMapDraw(svg); } catch (e) {} });
  }

  /* ---------- 2) FIG.0 jugable: RUN THE GATE ---------- */
  var SCEN = [
    {t: 'Deploy scanner v30 to production', rule: 'POLICY: a deploy needs a green test suite', risk: 'low'},
    {t: 'Auto-send DCF memo to 600 companies', rule: 'POLICY: no auto-send without human approval', risk: 'high'},
    {t: 'Rebalance portfolio with 2× leverage', rule: 'POLICY: leverage needs a human sign-off', risk: 'high'},
    {t: 'Publish daily essay #111', rule: 'POLICY: essays are pre-approved', risk: 'low'},
    {t: 'Approve wire transfer · $25,000', rule: 'POLICY: wires over $10k need two signatures', risk: 'high'},
    {t: 'Pull 10-K · AAPL FY24', rule: 'POLICY: public filings are safe to pull', risk: 'low'},
    {t: 'Refresh market-data cache', rule: 'POLICY: cache refresh is read-only', risk: 'low'}
  ];
  var gateBusy = false, gateIdx = 0;
  function gateStages() {
    var spec = [['INPUT', 'Request'], ['LLM AGENT', 'Proposes'], ['POLICY GATE', 'Enforces'], ['ENGINE', 'Computes'], ['OUTPUT', 'Model · memo']];
    var out = [];
    spec.forEach(function (sp) {
      var leaf = leafWithText(sp[1]); if (!leaf) return;
      var box = leaf, p = leaf.parentElement;
      while (p && p !== document.body) { if ((p.textContent || '').indexOf(sp[0]) >= 0) { box = p; break; } p = p.parentElement; }
      out.push({name: sp[0], leaf: leaf, box: box});
    });
    var escLeaf = leafWithText('Human review'), esc = null;
    if (escLeaf) {
      var b2 = escLeaf, p2 = escLeaf.parentElement;
      while (p2 && p2 !== document.body) { if ((p2.textContent || '').indexOf('ESCALATE') >= 0) { b2 = p2; break; } p2 = p2.parentElement; }
      esc = {name: 'ESCALATE', leaf: escLeaf, box: b2};
    }
    return {stages: out, esc: esc};
  }
  function bumpCounter(label) {
    var cands = [];
    all('*').forEach(function (el) {
      if (!el.children.length && txt(el).toUpperCase() === label) {
        var p = el.parentElement; if (!p) return;
        all('*', p).forEach(function (k) { if (!k.children.length && /^\d+$/.test(txt(k))) cands.push(k); });
      }
    });
    for (var i = 0; i < cands.length; i++) {
      if (cands[i].getBoundingClientRect().width > 0) { var v = parseInt(cands[i].textContent, 10); if (isFinite(v)) cands[i].textContent = String(v + 1); return; }
    }
    if (cands.length) { var v2 = parseInt(cands[0].textContent, 10); if (isFinite(v2)) cands[0].textContent = String(v2 + 1); }
  }
  function nextRunNumber() {
    var nums = ((document.body.textContent || '').match(/#0?(\d{3,4})/g) || []).map(function (s) { return parseInt(s.replace('#', ''), 10); }).filter(isFinite);
    return (nums.length ? Math.max.apply(null, nums) : 400) + 1;
  }
  function centerOf(el) { var r = el.getBoundingClientRect(); return {x: r.left + r.width / 2, y: r.top + r.height / 2}; }
  function ensureVisible(el) {
    var p = el.parentElement;
    while (p && p !== document.body) {
      var cs = null; try { cs = getComputedStyle(p); } catch (e) {}
      if (cs && (cs.overflowX === 'auto' || cs.overflowX === 'scroll' || cs.overflowY === 'auto' || cs.overflowY === 'scroll') && (p.scrollWidth > p.clientWidth + 4 || p.scrollHeight > p.clientHeight + 4)) {
        var r = el.getBoundingClientRect(), pr = p.getBoundingClientRect(), dx = 0, dy = 0;
        if (r.left < pr.left) dx = r.left - pr.left - 12; else if (r.right > pr.right) dx = r.right - pr.right + 12;
        if (r.top < pr.top) dy = r.top - pr.top - 12; else if (r.bottom > pr.bottom) dy = r.bottom - pr.bottom + 12;
        if (dx || dy) { try { p.scrollTo({left: p.scrollLeft + dx, top: p.scrollTop + dy, behavior: REDUCED ? 'auto' : 'smooth'}); } catch (e) { p.scrollLeft += dx; p.scrollTop += dy; } }
      }
      p = p.parentElement;
    }
  }
  function animateToken(token, from, getTarget, dur, onMove) {
    return new Promise(function (resolve) {
      var t0 = performance.now();
      function frame(now) {
        var pr = Math.min(1, (now - t0) / dur);
        var e = pr < 0.5 ? 2 * pr * pr : 1 - Math.pow(-2 * pr + 2, 2) / 2;
        var tg = getTarget();
        var x = from.x + (tg.x - from.x) * e, y = from.y + (tg.y - from.y) * e;
        token.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
        if (onMove) onMove({x: x, y: y});
        if (pr < 1) requestAnimationFrame(frame); else resolve();
      }
      requestAnimationFrame(frame);
    });
  }
  async function runGate(btn, log) {
    if (gateBusy) return; gateBusy = true; btn.disabled = true;
    var g = gateStages();
    if (g.stages.length < 5) { gateBusy = false; btn.disabled = false; log.textContent = 'FIG.0 is not on screen right now.'; return; }
    var scen = SCEN[gateIdx % SCEN.length]; gateIdx++;
    var n = nextRunNumber();
    bumpCounter('PROPOSED');
    log.innerHTML = 'RUN #' + String(n).padStart(4, '0') + ' \u00B7 \u201C' + scen.t + '\u201D \u2014 en route\u2026';
    var token = document.createElement('div'); token.className = 'i4-gate-token';
    document.body.appendChild(token);
    var pos = centerOf(g.stages[0].box);
    token.style.transform = 'translate(' + pos.x.toFixed(1) + 'px,' + pos.y.toFixed(1) + 'px)';
    try {
      for (var i = 0; i < g.stages.length; i++) {
        var s = g.stages[i];
        ensureVisible(s.box);
        if (!REDUCED) {
          var targetBox = s.box;
          await animateToken(token, pos, function () { return centerOf(targetBox); }, i === 0 ? 120 : 430, function (p) { pos = p; });
        }
        s.box.classList.add('i4-gate-hot');
        if (i === 2) {
          await wait(420);
          log.innerHTML = 'RUN #' + String(n).padStart(4, '0') + ' \u00B7 \u201C' + scen.t + '\u201D \u2014 ' + scen.rule;
          if (scen.risk === 'high') {
            s.box.classList.add('i4-gate-blocked');
            if (g.esc) {
              ensureVisible(g.esc.box);
              if (!REDUCED) { var escBox = g.esc.box; await animateToken(token, pos, function () { return centerOf(escBox); }, 560, function (p) { pos = p; }); }
              g.esc.box.classList.add('i4-gate-hot');
            }
            bumpCounter('ESCALATED');
            log.innerHTML = 'RUN #' + String(n).padStart(4, '0') + ' \u00B7 \u201C' + scen.t + '\u201D \u2192 <span class="i4-no">BLOCKED</span> \u2014 ' + scen.rule + ' \u00B7 requiere revisi\u00F3n humana.';
            await wait(300);
            break;
          }
          log.innerHTML = 'RUN #' + String(n).padStart(4, '0') + ' \u00B7 \u201C' + scen.t + '\u201D \u2014 policy check passed / la pol\u00EDtica lo permite.';
        }
        await wait(140);
      }
      if (scen.risk !== 'high') {
        bumpCounter('EXECUTED');
        log.innerHTML = 'RUN #' + String(n).padStart(4, '0') + ' \u00B7 \u201C' + scen.t + '\u201D \u2192 <span class="i4-ok">APPROVED</span> \u2014 executed / ejecutado.';
        await wait(300);
      }
    } finally {
      setTimeout(function () { all('.i4-gate-hot, .i4-gate-blocked').forEach(function (el) { el.classList.remove('i4-gate-hot'); el.classList.remove('i4-gate-blocked'); }); }, 2600);
      if (token.parentNode) token.parentNode.removeChild(token);
      gateBusy = false; btn.disabled = false;
    }
  }
  function installGate() {
    if (document.querySelector('.i4-gate-btn')) return;
    var propose = all('button').filter(function (b) { return txt(b) === 'Propose'; })[0];
    if (!propose) return;
    var btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'i4-gate-btn'; btn.textContent = 'Run the gate \u21BB';
    propose.insertAdjacentElement('afterend', btn);
    var log = document.createElement('p');
    log.className = 'i4-gate-log';
    log.textContent = 'FIG.0 is live \u2014 run the gate to watch a proposal travel through the five stages. \u00B7 FIG.0 est\u00E1 en vivo: corre la puerta y mira c\u00F3mo viaja una propuesta.';
    btn.insertAdjacentElement('afterend', log);
    btn.addEventListener('click', function () { runGate(btn, log); });
  }

  /* ---------- 4) Tipografía y contraste ---------- */
  function installEditorial() {
    var map = document.querySelector('.constellation-map') || document.querySelector('[aria-label^="Constellation navigation"]');
    if (map && !map.querySelector('.i4-fig1')) {
      var eb = null;
      all('.cm-kicker', map).forEach(function (el) { if (!eb) eb = el; });
      if (!eb) all('*', map).forEach(function (el) { if (!eb && !el.children.length && /EXPLORE BY CONSTELLATION/i.test(txt(el))) eb = el; });
      if (eb) { var tag = document.createElement('span'); tag.className = 'i4-fig1'; tag.textContent = 'FIG. 1'; eb.insertBefore(tag, eb.firstChild); }
    }
    var ach = sectionByLabel('Achievements');
    if (ach && !ach.getAttribute('data-i4-ach')) {
      ach.setAttribute('data-i4-ach', '1');
      all('*', ach).forEach(function (el) {
        if (el.children.length) return;
        var t = txt(el);
        if (t === '1' || t === '2' || t === '3') {
          var fs = parseFloat((window.getComputedStyle(el).fontSize || '0').replace('px', ''));
          if (fs >= 40) el.classList.add('i4-ach-num');
        }
      });
    }
    var tk = sectionByLabel('Toolkit');
    if (tk && !tk.getAttribute('data-i4-tape')) {
      var cands = all('*', tk).filter(function (el) {
        var kids = Array.prototype.slice.call(el.children).filter(function (k) { return txt(k).length > 1; });
        return kids.length >= 4 && /PYTHON/.test(el.textContent || '') && /LANGGRAPH/.test(el.textContent || '');
      });
      var cand = cands[cands.length - 1];
      if (cand) {
        var direct = Array.prototype.slice.call(cand.children).filter(function (k) { return txt(k).length > 1; });
        if (direct.length >= 4) {
          tk.setAttribute('data-i4-tape', '1');
          for (var i = direct.length - 1; i > 0; i--) { var d = document.createElement('span'); d.className = 'i4-diamond'; d.textContent = '\u25C6'; cand.insertBefore(d, direct[i]); }
        }
      }
    }
  }

  /* ---------- arranque (reinstala tras cada cambio de ruta de la SPA) ---------- */
  function boot() {
    try { installPulses(); } catch (e) {}
    try { installGate(); } catch (e) {}
    try { installChoreo(); } catch (e) {}
    try { installEditorial(); } catch (e) {}
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
  window.addEventListener('load', function () { setTimeout(boot, 700); });
  if (window.MutationObserver) {
    var mo = new MutationObserver(function () { clearTimeout(mo._t); mo._t = setTimeout(boot, 450); });
    mo.observe(document.documentElement, {childList: true, subtree: true});
  }
  var rzT = 0;
  window.addEventListener('resize', function () { if (rzT) clearTimeout(rzT); rzT = setTimeout(boot, 350); });
})();
/* Iteración 4 (fix de la puerta): la simulación de FIG.0 re-renderiza la figura con
   frecuencia (contadores y bitácora cambian cada pocos segundos) y al reconstruir los nodos
   se pierden los listeners directos del botón «RUN THE GATE»: los clics dejaban de llegar
   (sin ficha, sin veredicto) aunque el botón y su texto seguían visibles. Este parche:
   - escucha el clic en fase de captura sobre el documento, así funciona cualquier copia
     del botón (original o clonada por la simulación), y frena el listener antiguo;
   - resuelve las etapas y la bitácora EN VIVO en cada paso, por si la figura se reconstruye
     a mitad de una carrera (la ficha sigue las cajas actuales, no unas ya desmontadas);
   - no usa el atributo disabled (un clon deshabilitado quedaría muerto) y se autocura con
     una revisión periódica; las carreras llevan un límite de tiempo por tramo. */
(function () {
  'use strict';
  if (window.__i4GatePatch) return; window.__i4GatePatch = true;
  var SCEN = [
    {t: 'Deploy scanner v30 to production', rule: 'POLICY: a deploy needs a green test suite', risk: 'low'},
    {t: 'Auto-send DCF memo to 600 companies', rule: 'POLICY: no auto-send without human approval', risk: 'high'},
    {t: 'Rebalance portfolio with 2\u00D7 leverage', rule: 'POLICY: leverage needs a human sign-off', risk: 'high'},
    {t: 'Publish daily essay #111', rule: 'POLICY: essays are pre-approved', risk: 'low'},
    {t: 'Approve wire transfer \u00B7 $25,000', rule: 'POLICY: wires over $10k need two signatures', risk: 'high'},
    {t: 'Pull 10-K \u00B7 AAPL FY24', rule: 'POLICY: public filings are safe to pull', risk: 'low'},
    {t: 'Refresh market-data cache', rule: 'POLICY: cache refresh is read-only', risk: 'low'}
  ];
  var REDUCED = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var busy = false, idx = 0;
  function all2(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function tx2(el) { return (el.textContent || '').trim(); }
  function leaf2(t) {
    var els = all2('*');
    for (var i = 0; i < els.length; i++) { var el = els[i]; if (!el.children.length && tx2(el) === t) return el; }
    return null;
  }
  function stages2() {
    var spec = [['INPUT', 'Request'], ['LLM AGENT', 'Proposes'], ['POLICY GATE', 'Enforces'], ['ENGINE', 'Computes'], ['OUTPUT', 'Model \u00B7 memo']];
    var out = [];
    spec.forEach(function (sp) {
      var leaf = leaf2(sp[1]); if (!leaf) return;
      var box = leaf, p = leaf.parentElement;
      while (p && p !== document.body) { if ((p.textContent || '').indexOf(sp[0]) >= 0) { box = p; break; } p = p.parentElement; }
      out.push({name: sp[0], box: box});
    });
    var escLeaf = leaf2('Human review'), esc = null;
    if (escLeaf) {
      var b2 = escLeaf, p2 = escLeaf.parentElement;
      while (p2 && p2 !== document.body) { if ((p2.textContent || '').indexOf('ESCALATE') >= 0) { b2 = p2; break; } p2 = p2.parentElement; }
      esc = {name: 'ESCALATE', box: b2};
    }
    return {stages: out, esc: esc};
  }
  function bump2(label) {
    var cands = [];
    all2('*').forEach(function (el) {
      if (!el.children.length && tx2(el).toUpperCase() === label) {
        var p = el.parentElement; if (!p) return;
        all2('*', p).forEach(function (k) { if (!k.children.length && /^\d+$/.test(tx2(k))) cands.push(k); });
      }
    });
    for (var i = 0; i < cands.length; i++) {
      if (cands[i].getBoundingClientRect().width > 0) { var v = parseInt(cands[i].textContent, 10); if (isFinite(v)) cands[i].textContent = String(v + 1); return; }
    }
    if (cands.length) { var v2 = parseInt(cands[0].textContent, 10); if (isFinite(v2)) cands[0].textContent = String(v2 + 1); }
  }
  function runNo2() {
    var nums = ((document.body.textContent || '').match(/#0?(\d{3,4})/g) || []).map(function (s) { return parseInt(s.replace('#', ''), 10); }).filter(isFinite);
    return (nums.length ? Math.max.apply(null, nums) : 400) + 1;
  }
  function center2(el) { var r = el.getBoundingClientRect(); return {x: r.left + r.width / 2, y: r.top + r.height / 2}; }
  function logLine(html) {
    var l = document.querySelector('.i4-gate-log');
    if (!l) {
      var b = document.querySelector('.i4-gate-btn'); if (!b) return;
      l = document.createElement('p'); l.className = 'i4-gate-log';
      b.insertAdjacentElement('afterend', l);
    }
    l.innerHTML = html;
  }
  function wait2(ms) { return new Promise(function (res) { setTimeout(res, ms); }); }
  function ensure2(el) {
    var p = el.parentElement;
    while (p && p !== document.body) {
      var cs = null; try { cs = getComputedStyle(p); } catch (e) {}
      if (cs && (cs.overflowX === 'auto' || cs.overflowX === 'scroll' || cs.overflowY === 'auto' || cs.overflowY === 'scroll') && (p.scrollWidth > p.clientWidth + 4 || p.scrollHeight > p.clientHeight + 4)) {
        var r = el.getBoundingClientRect(), pr = p.getBoundingClientRect(), dx = 0, dy = 0;
        if (r.left < pr.left) dx = r.left - pr.left - 12; else if (r.right > pr.right) dx = r.right - pr.right + 12;
        if (r.top < pr.top) dy = r.top - pr.top - 12; else if (r.bottom > pr.bottom) dy = r.bottom - pr.bottom + 12;
        if (dx || dy) { try { p.scrollTo({left: p.scrollLeft + dx, top: p.scrollTop + dy, behavior: REDUCED ? 'auto' : 'smooth'}); } catch (e) { p.scrollLeft += dx; p.scrollTop += dy; } }
      }
      p = p.parentElement;
    }
  }
  function anim2(token, from, getTarget, dur, onMove) {
    return Promise.race([new Promise(function (resolve) {
      var t0 = performance.now();
      function frame(now) {
        var pr = Math.min(1, (now - t0) / dur);
        var e = pr < 0.5 ? 2 * pr * pr : 1 - Math.pow(-2 * pr + 2, 2) / 2;
        var tg = getTarget();
        var x = from.x + (tg.x - from.x) * e, y = from.y + (tg.y - from.y) * e;
        token.style.transform = 'translate(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px)';
        if (onMove) onMove({x: x, y: y});
        if (pr < 1) requestAnimationFrame(frame); else resolve();
      }
      requestAnimationFrame(frame);
    }), wait2(Math.max(dur + 400, 1600))]);
  }
  function fmt(n) { return 'RUN #' + String(n).padStart(4, '0'); }
  function quote(t) { return '\u201C' + t + '\u201D'; }
  async function runGate2(btn) {
    if (busy) return; busy = true;
    if (btn) btn.setAttribute('aria-disabled', 'true');
    var g = stages2();
    if (g.stages.length < 5) { busy = false; if (btn) btn.removeAttribute('aria-disabled'); logLine('FIG.0 is not on screen right now.'); return; }
    var scen = SCEN[idx % SCEN.length]; idx++;
    var n = runNo2();
    bump2('PROPOSED');
    logLine(fmt(n) + ' \u00B7 ' + quote(scen.t) + ' \u2014 en route\u2026');
    var stale = document.querySelector('.i4-gate-token');
    if (stale && stale.parentNode) stale.parentNode.removeChild(stale);
    var token = document.createElement('div'); token.className = 'i4-gate-token';
    document.body.appendChild(token);
    var pos = center2(g.stages[0].box);
    token.style.transform = 'translate(' + pos.x.toFixed(1) + 'px,' + pos.y.toFixed(1) + 'px)';
    try {
      for (var i = 0; i < 5; i++) {
        var gs = stages2();
        var s = gs.stages[i]; if (!s) break;
        ensure2(s.box);
        if (!REDUCED) {
          var tb = s.box;
          await anim2(token, pos, function () { return center2(tb); }, i === 0 ? 120 : 430, function (p) { pos = p; });
        }
        s.box.classList.add('i4-gate-hot');
        if (i === 2) {
          await wait2(420);
          logLine(fmt(n) + ' \u00B7 ' + quote(scen.t) + ' \u2014 ' + scen.rule);
          if (scen.risk === 'high') {
            s.box.classList.add('i4-gate-blocked');
            var g2 = stages2();
            if (g2.esc) {
              ensure2(g2.esc.box);
              if (!REDUCED) { var eb = g2.esc.box; await anim2(token, pos, function () { return center2(eb); }, 560, function (p) { pos = p; }); }
              g2.esc.box.classList.add('i4-gate-hot');
            }
            bump2('ESCALATED');
            logLine(fmt(n) + ' \u00B7 ' + quote(scen.t) + ' \u2192 <span class=\"i4-no\">BLOCKED</span> \u2014 ' + scen.rule + ' \u00B7 requiere revisi\u00F3n humana.');
            await wait2(300);
            break;
          }
          logLine(fmt(n) + ' \u00B7 ' + quote(scen.t) + ' \u2014 policy check passed / la pol\u00EDtica lo permite.');
        }
        await wait2(140);
      }
      if (scen.risk !== 'high') {
        bump2('EXECUTED');
        logLine(fmt(n) + ' \u00B7 ' + quote(scen.t) + ' \u2192 <span class=\"i4-ok\">APPROVED</span> \u2014 executed / ejecutado.');
        await wait2(300);
      }
    } finally {
      setTimeout(function () { all2('.i4-gate-hot, .i4-gate-blocked').forEach(function (el) { el.classList.remove('i4-gate-hot'); el.classList.remove('i4-gate-blocked'); }); }, 2600);
      if (token.parentNode) token.parentNode.removeChild(token);
      busy = false;
      if (btn) btn.removeAttribute('aria-disabled');
    }
  }
  document.addEventListener('click', function (ev) {
    var b = ev.target && ev.target.closest ? ev.target.closest('.i4-gate-btn') : null;
    if (!b) return;
    ev.stopPropagation();
    runGate2(b);
  }, true);
  setInterval(function () {
    if (!busy && !document.querySelector('.i4-gate-token')) {
      all2('.i4-gate-btn').forEach(function (b) { if (b.disabled) b.disabled = false; });
    }
  }, 2000);
})();
/* Iteración 4 (reel) — el agente construye un memo de valoración en vivo, capa a capa.
   Adaptación del reel de Harshil @harshil.irll (4 nov 2026, «delivering stakeholder value
   in style»): en el reel, un agente construye un dashboard completo en el navegador, capa a
   capa, con la barra de estado «1 agent · 0 / 147 layers · 0%» (según los comentarios el
   herramienta es Anticode, no Claude, y hay quien menciona una extensión «swarm»).
   Aquí no se copia la demo del reel: la misma idea — un agente que construye un entregable
   pulido delante del visitante — se traduce al portafolio de Aleks: OPSFLOW, el agente de
   FIG.0, construye en vivo un memo de valoración DCF de AAPL (su trabajo canónico: hay
   Apple_Valuation_v29_Report y Apple_Valuation_v45.xlsx en el repo), capa a capa, con la
   misma barra «1 AGENT · n / 147 LAYERS · %» y un memo que termina siendo un entregable
   para stakeholders, con enlace al modelo en vivo (#finance). Es la sección «FIG. 2»,
   continuación de FIG.0 (el héroe) y FIG.1 (el mapa). Valores de demostración, coherentes
   entre sí (DCF: valor $245, precio $186, margen de seguridad 24%, WACC 8,5%, g 4,0%).
   La construcción arranca sola cuando la sección entra en ventanilla; hay botón de replay.
   Solo en Home (ruta home); se reinstala si la SPA reconstruye la ruta. */
(function () {
  'use strict';
  var REDUCED = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var CSS = [
    '.i5-build{border-top:1px solid rgba(217,179,106,.4);padding:70px 0 78px;position:relative;z-index:1}',
    '.i5-inner{max-width:1180px;margin:0 auto;padding:0 24px}',
    '.i5-fig{display:inline-block;margin-right:10px;color:#D9B36A;font:700 11px/1 ui-monospace,Menlo,monospace;letter-spacing:.18em}',
    '.i5-kicker{font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#92AC9B}',
    '.i5-title{font-family:Georgia,serif;font-size:clamp(36px,4.5vw,60px);line-height:1.05;margin:14px 0 12px;color:#EDF3EB}',
    '.i5-title em{color:#92AC9B;font-style:italic}',
    '.i5-sub{max-width:660px;color:rgba(237,243,235,.72);font-size:15px;line-height:1.6;margin:0 0 26px}',
    '.i5-status{display:flex;gap:18px;align-items:baseline;font:700 12px/1 ui-monospace,Menlo,monospace;letter-spacing:.12em;color:rgba(237,243,235,.85);text-transform:uppercase}',
    '.i5-status .i5-live{color:#92AC9B}',
    '.i5-bar{height:3px;background:rgba(237,243,235,.14);margin:12px 0 4px;border-radius:2px;overflow:hidden}',
    '.i5-bar i{display:block;height:100%;width:0%;background:#D9B36A;transition:width .3s ease}',
    '.i5-log{font:500 12px/1.6 ui-monospace,Menlo,monospace;color:rgba(237,243,235,.6);min-height:20px;margin:6px 0 0}',
    '.i5-log b{color:#D9B36A;font-weight:700}',
    '.i5-canvas{margin-top:24px;border:1px solid rgba(146,172,155,.3);border-radius:14px;padding:26px 28px;background:rgba(13,18,16,.88);box-shadow:0 20px 60px rgba(0,0,0,.35)}',
    '.i5-layer{opacity:0;transform:translateY(10px);transition:opacity .45s ease,transform .45s ease}',
    '.i5-layer.i5-on{opacity:1;transform:none}',
    '.i5-head{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:baseline}',
    '.i5-head h3{font-family:Georgia,serif;font-size:24px;margin:0;color:#EDF3EB}',
    '.i5-head span{font:700 11px/1 ui-monospace,Menlo,monospace;letter-spacing:.14em;color:rgba(237,243,235,.6)}',
    '.i5-kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:20px}',
    '.i5-kpi{border:1px solid rgba(237,243,235,.14);border-radius:10px;padding:12px 14px}',
    '.i5-kpi b{display:block;font:700 10px/1 ui-monospace,Menlo,monospace;letter-spacing:.16em;text-transform:uppercase;color:rgba(237,243,235,.55);margin-bottom:8px}',
    '.i5-kpi span{font-family:Georgia,serif;font-size:26px;color:#EDF3EB}',
    '.i5-kpi.hot{border-color:rgba(217,179,106,.7)}',
    '.i5-st{margin-top:22px;font:700 11px/1 ui-monospace,Menlo,monospace;letter-spacing:.16em;text-transform:uppercase;color:rgba(237,243,235,.6)}',
    '.i5-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-top:10px;font:500 13px/1 ui-monospace,Menlo,monospace}',
    '.i5-grid div{border:1px solid rgba(237,243,235,.12);border-radius:8px;padding:9px 6px;text-align:center;color:rgba(237,243,235,.85)}',
    '.i5-grid div.h{border-color:transparent;color:rgba(237,243,235,.5);font-size:11px;letter-spacing:.1em}',
    '.i5-grid div.base{border-color:rgba(217,179,106,.9);color:#D9B36A;font-weight:700}',
    '.i5-bars{margin-top:22px}',
    '.i5-barrow{display:flex;align-items:center;gap:12px;margin:10px 0}',
    '.i5-barrow b{width:44px;font:700 11px/1 ui-monospace,Menlo,monospace;letter-spacing:.12em;color:rgba(237,243,235,.7)}',
    '.i5-barrow .tr{flex:1;height:10px;background:rgba(237,243,235,.12);border-radius:6px;overflow:hidden}',
    '.i5-barrow .tr i{display:block;height:100%;background:#92AC9B}',
    '.i5-barrow.base .tr i{background:#D9B36A}',
    '.i5-barrow span{width:52px;text-align:right;font:700 13px/1 ui-monospace,Menlo,monospace;color:#EDF3EB}',
    '.i5-verdict{margin-top:24px;font-family:Georgia,serif;font-style:italic;font-size:23px;line-height:1.3;color:#92AC9B}',
    '.i5-foot{margin-top:18px;display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:center}',
    '.i5-foot p{font:500 11px/1.6 ui-monospace,Menlo,monospace;color:rgba(237,243,235,.55);margin:0}',
    '.i5-cta{color:#D9B36A;border:1px solid rgba(217,179,106,.6);border-radius:999px;padding:10px 16px;text-decoration:none;font:700 11px/1 ui-monospace,Menlo,monospace;letter-spacing:.14em;text-transform:uppercase}',
    '.i5-cta:hover{background:rgba(217,179,106,.14)}',
    '.i5-run{margin-top:24px;display:inline-block;padding:11px 18px;border:1px solid rgba(146,172,155,.6);border-radius:999px;background:transparent;color:#D9B36A;font:700 11px/1 ui-monospace,Menlo,monospace;letter-spacing:.14em;text-transform:uppercase;cursor:pointer}',
    '.i5-run:hover{border-color:#D9B36A;background:rgba(217,179,106,.12)}',
    '.i5-run[disabled]{opacity:.5;cursor:default}',
    '@media (max-width:900px){.i5-kpis{grid-template-columns:repeat(2,1fr)}.i5-canvas{padding:20px 16px}.i5-grid{font-size:11px}.i5-status{flex-wrap:wrap;gap:8px}}'
  ].join('\n');
  var st = document.createElement('style'); st.id = 'constellation-iter5'; st.textContent = CSS; document.head.appendChild(st);

  var TOTAL = 147;
  var STEPS = [
    {sel: '[data-i5="head"]', log: 'Pulling 10-K \u00B7 AAPL FY24\u2026'},
    {sel: '[data-i5="kpi1"]', log: 'Valuing \u00B7 DCF \u2014 fair value $245'},
    {sel: '[data-i5="kpi2"]', log: 'Market price: $186'},
    {sel: '[data-i5="kpi3"]', log: 'Margin of safety: 24% \u2014 green'},
    {sel: '[data-i5="kpi4"]', log: 'WACC 8.5% \u00B7 growth 4.0% \u2014 locked'},
    {sel: '[data-i5="sens-h"]', log: 'Building sensitivity table \u00B7 WACC \u00D7 growth\u2026'},
    {sel: '[data-i5="sens"]', log: 'Sensitivity ready \u2014 9 cells'},
    {sel: '[data-i5="bars"]', log: 'Painting scenario bars\u2026'},
    {sel: '[data-i5="verdict"]', log: 'Verdict: UNDERVALUED \u00B7 infravalorado'},
    {sel: '[data-i5="foot"]', log: 'Altman Z 3.1 \u2014 safe zone \u00B7 zona segura'},
    {sel: '[data-i5="cta"]', log: 'Signing the memo \u2014 OPSFLOW \u00B7 entregando\u2026'}
  ];
  function html5() {
    return [
      '<div class="i5-inner">',
      '<p class="i5-kicker"><span class="i5-fig">FIG. 2</span>LIVE BUILD \u2014 CONSTRUCCI\u00D3N EN VIVO</p>',
      '<h2 class="i5-title">Watch the agent build it. <em>Mira c\u00F3mo el agente lo construye.</em></h2>',
      '<p class="i5-sub">OPSFLOW \u2014 the agent behind FIG.0 \u2014 builds a valuation memo here, layer by layer, while you watch. Demo data \u00B7 datos de demostraci\u00F3n.</p>',
      '<div class="i5-status"><span class="i5-live">\u25CF 1 AGENT</span><span class="i5-count">0 / 147 LAYERS</span><span class="i5-pct">0%</span></div>',
      '<div class="i5-bar"><i></i></div>',
      '<p class="i5-log">Standing by \u00B7 en espera\u2026</p>',
      '<div class="i5-canvas">',
      '<div class="i5-layer" data-i5="head"><div class="i5-head"><h3>ORCEN VALUATION MEMO \u2014 AAPL</h3><span>10-K FY24 \u00B7 DCF</span></div></div>',
      '<div class="i5-kpis">',
      '<div class="i5-layer i5-kpi" data-i5="kpi1"><b>Fair value</b><span>$245</span></div>',
      '<div class="i5-layer i5-kpi" data-i5="kpi2"><b>Price</b><span>$186</span></div>',
      '<div class="i5-layer i5-kpi hot" data-i5="kpi3"><b>Margin of safety</b><span>24%</span></div>',
      '<div class="i5-layer i5-kpi" data-i5="kpi4"><b>WACC \u00B7 growth</b><span>8.5% \u00B7 4.0%</span></div>',
      '</div>',
      '<p class="i5-layer i5-st" data-i5="sens-h">Sensitivity \u2014 fair value by WACC \u00D7 growth</p>',
      '<div class="i5-layer i5-grid" data-i5="sens">',
      '<div class="h"></div><div class="h">g 3.0%</div><div class="h">g 4.0%</div><div class="h">g 5.0%</div>',
      '<div class="h">WACC 7.5%</div><div>262</div><div>278</div><div>296</div>',
      '<div class="h">WACC 8.5%</div><div>231</div><div class="base">245</div><div>261</div>',
      '<div class="h">WACC 9.5%</div><div>207</div><div>219</div><div>233</div>',
      '</div>',
      '<div class="i5-layer i5-bars" data-i5="bars">',
      '<div class="i5-barrow"><b>BEAR</b><span class="tr"><i style="width:69%"></i></span><span>$205</span></div>',
      '<div class="i5-barrow base"><b>BASE</b><span class="tr"><i style="width:82%"></i></span><span>$245</span></div>',
      '<div class="i5-barrow"><b>BULL</b><span class="tr"><i style="width:100%"></i></span><span>$298</span></div>',
      '</div>',
      '<p class="i5-layer i5-verdict" data-i5="verdict">UNDERVALUED \u2014 margin of safety 24% \u00B7 Altman Z 3.1 \u2014 safe zone.</p>',
      '<div class="i5-layer i5-foot" data-i5="foot"><p>Demo data \u00B7 datos de demostraci\u00F3n \u2014 built from the public 10-K.</p></div>',
      '<div class="i5-layer i5-foot" data-i5="cta"><p>Built live by OPSFLOW \u00B7 el mismo agente de FIG.0</p><a class="i5-cta" href="#finance">Open the live model \u2192</a></div>',
      '</div>',
      '<button type="button" class="i5-run">\u25B6 Watch the agent work</button>',
      '</div>'
    ].join('\n');
  }
  function wait5(ms) { return new Promise(function (res) { setTimeout(res, ms); }); }
  function sectionByLabel5(label) {
    var l = String(label).toLowerCase(), found = null;
    Array.prototype.slice.call(document.querySelectorAll('[data-screen-label]')).some(function (el) {
      if ((el.getAttribute('data-screen-label') || '').toLowerCase() === l) { found = el; return true; }
      return false;
    });
    return found;
  }
  function install5() {
    if (document.querySelector('.i5-build')) return;
    var route = document.body.getAttribute('data-const-route');
    if (route && route !== 'home') return;
    var map = document.querySelector('.constellation-map');
    var anchor = map ? (map.closest('section') || map) : sectionByLabel5('Stats');
    if (!anchor) return;
    var sec = document.createElement('section');
    sec.className = 'i5-build';
    sec.setAttribute('data-screen-label', 'Live build');
    sec.innerHTML = html5();
    anchor.insertAdjacentElement('afterend', sec);
    wire5(sec);
  }
  function wire5(sec) {
    var layers = Array.prototype.slice.call(sec.querySelectorAll('.i5-layer'));
    var countEl = sec.querySelector('.i5-count'), pctEl = sec.querySelector('.i5-pct'),
        barEl = sec.querySelector('.i5-bar i'), logEl = sec.querySelector('.i5-log'),
        btn = sec.querySelector('.i5-run');
    var busy = false, started = false;
    function status(n, msg) {
      countEl.textContent = n + ' / ' + TOTAL + ' LAYERS';
      var p = Math.round(n / TOTAL * 100);
      pctEl.textContent = p + '%';
      barEl.style.width = p + '%';
      if (msg) logEl.textContent = msg;
    }
    function layersFor(step) {
      return layers.filter(function (l) { return STEPS.indexOf(step) < 0 ? false : l.getAttribute('data-i5') === step.sel.replace('[data-i5="', '').replace('"]', ''); });
    }
    function reveal(step) {
      layersFor(step).forEach(function (l) { l.classList.add('i5-on'); });
    }
    async function run() {
      if (busy) return; busy = true;
      layers.forEach(function (l) { l.classList.remove('i5-on'); });
      status(0, 'Starting \u00B7 empezando\u2026');
      btn.disabled = true; btn.textContent = '\u25CF BUILDING\u2026';
      if (REDUCED) {
        layers.forEach(function (l) { l.classList.add('i5-on'); });
        status(TOTAL, '');
        finish(); return;
      }
      for (var i = 0; i < STEPS.length; i++) {
        await wait5(i === 0 ? 380 : 310);
        reveal(STEPS[i]);
        var n = Math.round((i + 1) * TOTAL / STEPS.length);
        status(n, STEPS[i].log);
      }
      finish();
    }
    function finish() {
      busy = false;
      btn.disabled = false; btn.textContent = '\u21BB Replay';
      countEl.textContent = TOTAL + ' / ' + TOTAL + ' LAYERS';
      pctEl.textContent = '100%';
      barEl.style.width = '100%';
      logEl.innerHTML = '<b>DELIVERED \u00B7 ENTREGADO</b> \u2014 memo ready for stakeholders.';
    }
    btn.addEventListener('click', function () { if (!started) started = true; if (!busy) run(); });
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting && !started) { started = true; io.disconnect(); setTimeout(run, 500); }
        });
      }, {threshold: 0.2, rootMargin: '0px 0px 100px 0px'});
      io.observe(sec);
    }
  }
  function boot5() { try { install5(); } catch (e) {} }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot5); else boot5();
  window.addEventListener('load', function () { setTimeout(boot5, 700); });
  if (window.MutationObserver && !window.__i5Obs) {
    window.__i5Obs = true;
    var mo5 = new MutationObserver(function () { clearTimeout(mo5._t); mo5._t = setTimeout(boot5, 450); });
    mo5.observe(document.documentElement, {childList: true, subtree: true});
  }
})();
/* Iteración 4 (reel) — parche FIG.2: delegación en captura + resolución en vivo.
   El cableado directo de wire5 muere si el runtime re-renderiza la sección
   (la misma enfermedad que la puerta de FIG.0): los nodos visibles son clones
   sin listeners y el observador queda mirando un nodo desconectado. Este
   parche resuelve todo en vivo, en cada paso, y re-arma el observador. */
(function () {
  if (window.__i5Patch) return; window.__i5Patch = true;
  var TOTAL5 = 147;
  var STEPS5 = [
    { k: 'head', log: 'Pulling 10-K · AAPL FY24…' },
    { k: 'kpi1', log: 'Valuing · DCF — fair value $245' },
    { k: 'kpi2', log: 'Market price: $186' },
    { k: 'kpi3', log: 'Margin of safety: 24% — green' },
    { k: 'kpi4', log: 'WACC 8.5% · growth 4.0% — locked' },
    { k: 'sens-h', log: 'Building sensitivity table · WACC × growth…' },
    { k: 'sens', log: 'Sensitivity ready — 9 cells' },
    { k: 'bars', log: 'Painting scenario bars…' },
    { k: 'verdict', log: 'Verdict: UNDERVALUED · infravalorado' },
    { k: 'foot', log: 'Altman Z 3.1 — safe zone · zona segura' },
    { k: 'cta', log: 'Signing the memo — OPSFLOW · entregando…' }
  ];
  var REDUCED5 = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var busy5 = false, started5 = false, observedSec5 = null;
  function live5() {
    var sec = document.querySelector('.i5-build');
    if (!sec) return null;
    return {
      sec: sec,
      layers: Array.prototype.slice.call(sec.querySelectorAll('.i5-layer')),
      countEl: sec.querySelector('.i5-count'),
      pctEl: sec.querySelector('.i5-pct'),
      barEl: sec.querySelector('.i5-bar i'),
      logEl: sec.querySelector('.i5-log'),
      btn: sec.querySelector('.i5-run')
    };
  }
  function wait5b(ms) { return new Promise(function (res) { setTimeout(res, ms); }); }
  function status5(el, n, msg) {
    if (!el || !el.countEl || !el.pctEl || !el.barEl || !el.logEl) return;
    el.countEl.textContent = n + ' / ' + TOTAL5 + ' LAYERS';
    var p = Math.round(n / TOTAL5 * 100);
    el.pctEl.textContent = p + '%';
    el.barEl.style.width = p + '%';
    if (msg) el.logEl.textContent = msg;
  }
  function finish5(el) {
    busy5 = false;
    if (!el) return;
    if (el.btn) { el.btn.disabled = false; el.btn.textContent = '↻ Replay'; }
    if (el.countEl) el.countEl.textContent = TOTAL5 + ' / ' + TOTAL5 + ' LAYERS';
    if (el.pctEl) el.pctEl.textContent = '100%';
    if (el.barEl) el.barEl.style.width = '100%';
    if (el.logEl) el.logEl.innerHTML = '<b>DELIVERED · ENTREGADO</b> — memo ready for stakeholders.';
  }
  async function run5() {
    if (busy5) return; busy5 = true;
    var el = live5();
    if (!el) { busy5 = false; return; }
    el.layers.forEach(function (l) { l.classList.remove('i5-on'); });
    status5(el, 0, 'Starting · empezando…');
    if (el.btn) { el.btn.disabled = true; el.btn.textContent = '● BUILDING…'; }
    if (REDUCED5) {
      var a = live5();
      if (a) a.layers.forEach(function (l) { l.classList.add('i5-on'); });
      status5(live5(), TOTAL5, '');
      finish5(live5());
      return;
    }
    for (var i = 0; i < STEPS5.length; i++) {
      await wait5b(i === 0 ? 380 : 310);
      var cur = live5();
      if (!cur) { busy5 = false; return; }
      (function (key) {
        cur.layers.forEach(function (l) { if (l.getAttribute('data-i5') === key) l.classList.add('i5-on'); });
      })(STEPS5[i].k);
      var n = Math.round((i + 1) * TOTAL5 / STEPS5.length);
      status5(cur, n, STEPS5[i].log);
    }
    finish5(live5());
  }
  function arm5() {
    var el = live5();
    if (!el || !('IntersectionObserver' in window)) return;
    if (observedSec5 === el.sec) return;
    try { if (window.__i5IO) window.__i5IO.disconnect(); } catch (e) {}
    observedSec5 = el.sec;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && !started5) {
          started5 = true;
          io.disconnect(); observedSec5 = null;
          setTimeout(run5, 500);
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px 100px 0px' });
    window.__i5IO = io;
    io.observe(el.sec);
  }
  document.addEventListener('click', function (ev) {
    var t = ev.target && ev.target.closest ? ev.target.closest('.i5-run') : null;
    if (!t) return;
    ev.stopPropagation();
    if (!started5) started5 = true;
    if (!busy5) run5();
  }, true);
  if (window.MutationObserver) {
    var mo = new MutationObserver(function () { clearTimeout(mo._t); mo._t = setTimeout(arm5, 300); });
    mo.observe(document.documentElement, { childList: true, subtree: true });
  }
  setInterval(arm5, 1500);
  arm5();
})();
/* Iteración 5 — A: el memo de FIG.2 es interactivo (modelo DCF en vivo),
   FIG.0 legible en móvil (etapas apiladas) y la pista del mapa en una línea.
   Misma cura que FIG.0/FIG.2: resolución en vivo y delegación, para que los
   re-renders del runtime no dejen controles muertos. */
(function () {
  if (window.__i6a) return; window.__i6a = true;
  var CSS6 = [
    '@media (max-width: 640px){',
    '.i6-stage-row{display:flex!important;flex-direction:column!important;gap:6px!important;}',
    '.i6-stage-row>:not(.i6-stage){display:none!important;}',
    '.i6-stage{width:100%!important;max-width:none!important;text-align:left!important;}',
    '.i6-escalate{width:100%!important;max-width:none!important;}',
    '.i6-ctl-row{grid-template-columns:1fr!important;}',
    '}',
    '@media (max-width: 480px){',
    '.cm-hint{white-space:nowrap!important;letter-spacing:.05em!important;font-size:10px!important;}',
    '}',
    '.i6-controls{margin-top:18px;border-top:1px solid rgba(217,179,106,.35);padding-top:14px;}',
    '.i6-ctl-k{font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#D9B36A;margin:0 0 10px;}',
    '.i6-ctl-row{display:grid;grid-template-columns:1fr 1fr auto;gap:14px;align-items:end;}',
    '.i6-ctl{display:block;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:rgba(237,243,235,.75);}',
    '.i6-ctl output{color:#E8DFC8;font-family:ui-monospace,Menlo,Consolas,monospace;margin-left:6px;}',
    '.i6-ctl input[type=range]{width:100%;accent-color:#D9B36A;margin-top:6px;}',
    '.i6-ctl-btn{background:transparent;border:1px solid #D9B36A;color:#D9B36A;font:inherit;font-size:11px;letter-spacing:.14em;text-transform:uppercase;padding:9px 12px;border-radius:999px;cursor:pointer;white-space:nowrap;}',
    '.i6-ctl-btn:hover,.i6-ctl-btn:focus-visible{background:#D9B36A;color:#14161a;}'
  ].join('\n');
  var st6 = document.createElement('style');
  st6.id = 'constellation-iter6';
  st6.textContent = CSS6;
  document.head.appendChild(st6);

  /* ---------- modelo DCF en vivo (FIG.2) ---------- */
  var M6 = window.__i6Model || (window.__i6Model = { w: 8.5, g: 4.0, price: 186 });
  var SCALE6 = null;
  /* DCF en dos etapas: 10 años explícitos con FCF +6%/año y valor terminal Gordon
     con tope de 20x FCF (práctica conservadora cuando el diferencial w-g es bajo). */
  function dcfUnit6(w, g) {
    var pv = 0, i;
    for (i = 1; i <= 10; i++) pv += Math.pow(1.06, i) / Math.pow(1 + w, i);
    var fcf10 = Math.pow(1.06, 10);
    var mult = (1 + g) / (w - g); if (mult > 20) mult = 20; if (mult < 0) mult = 0;
    return pv + fcf10 * mult / Math.pow(1 + w, 10);
  }
  function fv6(w, g) {
    if (SCALE6 === null) SCALE6 = 245 / dcfUnit6(0.085, 0.04);
    return dcfUnit6(w, g) * SCALE6;
  }
  function fmt6(x) { return '$' + Math.round(x); }
  function liveSec6() { return document.querySelector('.i5-build'); }
  function applyModel6() {
    var sec = liveSec6(); if (!sec) return null;
    var w = M6.w / 100, g = M6.g / 100;
    var base = fv6(w, g), bear = fv6(w + 0.01, g - 0.01), bull = fv6(w - 0.01, g + 0.01);
    var mos = (base - M6.price) / base;
    var q = function (s) { return sec.querySelector(s); };
    var set = function (sel, txt) { var el = q(sel); if (el) el.textContent = txt; };
    set('[data-i5="kpi1"] span', fmt6(base));
    set('[data-i5="kpi3"] span', Math.round(mos * 100) + '%');
    set('[data-i5="kpi4"] span', M6.w.toFixed(1) + '% · ' + M6.g.toFixed(1) + '%');
    var grid = q('.i5-grid');
    if (grid) {
      var hs = grid.querySelectorAll('.h');
      if (hs.length >= 7) {
        hs[1].textContent = 'g ' + (M6.g - 1).toFixed(1) + '%';
        hs[2].textContent = 'g ' + M6.g.toFixed(1) + '%';
        hs[3].textContent = 'g ' + (M6.g + 1).toFixed(1) + '%';
        hs[4].textContent = 'WACC ' + (M6.w - 1).toFixed(1) + '%';
        hs[5].textContent = 'WACC ' + M6.w.toFixed(1) + '%';
        hs[6].textContent = 'WACC ' + (M6.w + 1).toFixed(1) + '%';
      }
      var cells = grid.querySelectorAll('div:not(.h)');
      var vals = [
        fv6(w - 0.01, g - 0.01), fv6(w - 0.01, g), fv6(w - 0.01, g + 0.01),
        fv6(w, g - 0.01), base, fv6(w, g + 0.01),
        fv6(w + 0.01, g - 0.01), fv6(w + 0.01, g), fv6(w + 0.01, g + 0.01)
      ];
      cells.forEach(function (c, i) { if (i < vals.length) c.textContent = Math.round(vals[i]); });
    }
    var bars = sec.querySelectorAll('.i5-barrow');
    var bvals = [bear, base, bull];
    bars.forEach(function (row, i) {
      var v = bvals[i] || base;
      var fill = row.querySelector('i');
      if (fill) fill.style.width = Math.round(v / bull * 100) + '%';
      var spans = row.querySelectorAll('span');
      if (spans.length) spans[spans.length - 1].textContent = fmt6(v);
    });
    var verd = mos >= 0.15 ? 'UNDERVALUED' : (mos >= 0 ? 'FAIR VALUE' : 'OVERVALUED');
    set('[data-i5="verdict"]', verd + ' — margin of safety ' + Math.round(mos * 100) + '% · Altman Z 3.1 — safe zone.');
    return { base: base, mos: mos };
  }
  function rebuild6() {
    var sec = liveSec6(); if (!sec) return;
    var btn = sec.querySelector('.i5-run');
    if (btn && btn.disabled) { setTimeout(rebuild6, 600); return; }
    var r = applyModel6(); if (!r) return;
    var logEl = sec.querySelector('.i5-log'), countEl = sec.querySelector('.i5-count'), pctEl = sec.querySelector('.i5-pct');
    var layers = Array.prototype.slice.call(sec.querySelectorAll('.i5-layer'));
    layers.forEach(function (l) { l.classList.remove('i5-on'); });
    if (countEl) countEl.textContent = 'REBUILDING · RECONSTRUYENDO';
    if (pctEl) pctEl.textContent = '…';
    if (logEl) logEl.textContent = 'Rebuilding — WACC ' + M6.w.toFixed(1) + '% · growth ' + M6.g.toFixed(1) + '%…';
    layers.forEach(function (l, i) { setTimeout(function () { l.classList.add('i5-on'); }, 90 * i + 60); });
    setTimeout(function () {
      var s2 = liveSec6(); if (!s2) return;
      var c2 = s2.querySelector('.i5-count'), p2 = s2.querySelector('.i5-pct'), l2 = s2.querySelector('.i5-log');
      if (c2) c2.textContent = '147 / 147 LAYERS';
      if (p2) p2.textContent = '100%';
      if (l2) l2.textContent = 'REBUILT · RECONSTRUIDO — WACC ' + M6.w.toFixed(1) + '% · growth ' + M6.g.toFixed(1) + '% → fair value ' + fmt6(r.base) + ' · margin of safety ' + Math.round(r.mos * 100) + '%.';
    }, 90 * layers.length + 200);
  }
  function ensureControls6() {
    var sec = liveSec6(); if (!sec) return;
    var canvas = sec.querySelector('.i5-canvas'); if (!canvas) return;
    var ctl = canvas.querySelector('.i6-controls');
    if (!ctl) {
      ctl = document.createElement('div');
      ctl.className = 'i6-controls';
      ctl.innerHTML = '<p class="i6-ctl-k">Live model · modelo en vivo — move the assumptions, the memo rebuilds</p>' +
        '<div class="i6-ctl-row">' +
        '<label class="i6-ctl">WACC <output data-i6-wo>' + M6.w.toFixed(1) + '%</output><input type="range" min="7.5" max="9.5" step="0.1" value="' + M6.w + '" data-i6-w aria-label="WACC"></label>' +
        '<label class="i6-ctl">Growth g <output data-i6-go>' + M6.g.toFixed(1) + '%</output><input type="range" min="3" max="5" step="0.1" value="' + M6.g + '" data-i6-g aria-label="Terminal growth"></label>' +
        '<button type="button" class="i6-ctl-btn" data-i6-rebuild>↻ Rebuild the memo</button>' +
        '</div>';
      var kpis = canvas.querySelector('.i5-kpis');
      if (kpis) kpis.insertAdjacentElement('afterend', ctl); else canvas.appendChild(ctl);
    } else {
      var wi = ctl.querySelector('[data-i6-w]'), gi = ctl.querySelector('[data-i6-g]');
      if (wi && +wi.value !== M6.w) wi.value = M6.w;
      if (gi && +gi.value !== M6.g) gi.value = M6.g;
      var wo = ctl.querySelector('[data-i6-wo]'), go = ctl.querySelector('[data-i6-go]');
      if (wo) wo.textContent = M6.w.toFixed(1) + '%';
      if (go) go.textContent = M6.g.toFixed(1) + '%';
    }
  }
  var deb6 = null;
  document.addEventListener('input', function (ev) {
    var t = ev.target && ev.target.closest ? ev.target.closest('[data-i6-w],[data-i6-g]') : null;
    if (!t) return;
    var v = parseFloat(t.value); if (isNaN(v)) return;
    if (t.hasAttribute('data-i6-w')) M6.w = v; else M6.g = v;
    var out = t.parentElement ? t.parentElement.querySelector('output') : null;
    if (out) out.textContent = v.toFixed(1) + '%';
    clearTimeout(deb6);
    deb6 = setTimeout(rebuild6, 400);
  }, true);
  document.addEventListener('click', function (ev) {
    var t = ev.target && ev.target.closest ? ev.target.closest('[data-i6-rebuild]') : null;
    if (!t) return;
    ev.stopPropagation();
    rebuild6();
  }, true);

  /* ---------- FIG.0 en móvil + pista corta ---------- */
  var HINT6 = 'TAP A STAR TO TRAVEL · TOCA UNA ESTRELLA';
  function hint6() {
    var hs = document.querySelectorAll('.cm-hint');
    if (hs.length) { hs.forEach(function (h) { if (h.textContent !== HINT6) h.textContent = HINT6; }); return; }
    document.querySelectorAll('p').forEach(function (p) {
      if ((p.textContent || '').indexOf('HOVER OR TAP A STAR') === 0) p.textContent = HINT6;
    });
  }
  function markFig06() {
    var btn = document.querySelector('.i4-gate-btn');
    var fig = btn ? btn.closest('figure') : null;
    if (!fig) return;
    var WORDS = ['Request', 'Proposes', 'Enforces', 'Computes', 'Model'];
    var NUMS = ['01', '02', '03', '04', '05'];
    var boxes = [];
    var leafs = Array.prototype.slice.call(fig.querySelectorAll('*'));
    leafs.forEach(function (el) {
      if (el.childElementCount > 0) return;
      var t = (el.textContent || '').trim();
      for (var i = 0; i < WORDS.length; i++) {
        if (t === WORDS[i] || t.indexOf(WORDS[i]) === 0) {
          var b = el;
          while ((b.textContent || '').indexOf(NUMS[i]) < 0 && b.parentElement && b.parentElement !== fig) b = b.parentElement;
          if ((b.textContent || '').indexOf(NUMS[i]) >= 0 && b !== fig) { b.classList.add('i6-stage'); boxes.push(b); }
          return;
        }
      }
    });
    if (boxes.length >= 4) { // Iteración 5-D: sin tope de hijos — la fila suma 5 etapas + conectores + ESCALATE
      var row = boxes[0].parentElement;
      var same = row && boxes.every(function (b) { return b.parentElement === row; });
      if (same) row.classList.add('i6-stage-row');
    }
    var hr = null;
    leafs.forEach(function (el) {
      if (el.childElementCount === 0 && (el.textContent || '').trim() === 'Human review') hr = el;
    });
    if (hr) {
      var eb = hr;
      while ((eb.textContent || '').indexOf('ESCALATE') < 0 && eb.parentElement && eb.parentElement !== fig) eb = eb.parentElement;
      if ((eb.textContent || '').indexOf('ESCALATE') >= 0) eb.classList.add('i6-escalate');
    }
  }
  function dress6a() {
    try { hint6(); } catch (e) {}
    try { markFig06(); } catch (e) {}
    try {
      ensureControls6();
      if (M6.w !== 8.5 || M6.g !== 4.0) applyModel6();
    } catch (e) {}
  }
  function boot6a() { dress6a(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot6a); else boot6a();
  window.addEventListener('load', function () { setTimeout(boot6a, 700); });
  if (window.MutationObserver && !window.__i6Obs) {
    window.__i6Obs = true;
    var mo6 = new MutationObserver(function () { clearTimeout(mo6._t); mo6._t = setTimeout(boot6a, 450); });
    mo6.observe(document.documentElement, { childList: true, subtree: true });
  }
  setInterval(boot6a, 2000);
})();
/* Iteración 5 — B: capítulos fijados (GSAP ScrollTrigger pin, solo escritorio)
   e interiores de las 8 páginas con su propio lenguaje visual.
   El pin es la idea arriesgada diferida de la Iteración 4: se crea solo en
   escritorio (>=1024px, puntero fino, sin reduced motion) y se re-crea sobre
   el nodo vivo si el runtime re-renderiza la sección; en móvil y con
   reduced motion cae a un reveal con scrub (el fallback seguro). */
(function () {
  if (window.__i6b) return; window.__i6b = true;
  var REDUCED6 = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function PIN_OK() { /* Iteración 5-C: pin desactivado — en el despliegue fijaba FIG.2 sobre la barra lateral y el memo dejaba de verse; queda el reveal con scrub, el fallback seguro */
    return false && !REDUCED6 && window.gsap && window.ScrollTrigger &&
      window.matchMedia('(min-width: 1024px)').matches &&
      window.matchMedia('(pointer: fine)').matches;
  }
  var CSS6B = [
    'body[data-const-route="coding"] .i6-app{border:1px solid rgba(127,184,166,.45)!important;border-left:4px solid #7FB8A6!important;background:#0D1412!important;}',
    'body[data-const-route="coding"] .i6-app>:first-child{font-family:ui-monospace,Menlo,Consolas,monospace!important;}',
    'body[data-const-route="coding"] .i6-ledger{border-top:3px double #7FB8A6!important;}',
    'body[data-const-route="coding"] .i6-ledger-row{border-bottom:1px solid rgba(237,243,235,.14)!important;}',
    'body[data-const-route="coding"] .i6-ledger-row:nth-child(odd){background:rgba(127,184,166,.06)!important;}',
    'body[data-const-route="finance"] .i6-flag{border-top:3px double #D9B36A!important;}',
    'body[data-const-route="finance"] .i6-num{color:#D9B36A!important;font-variant-numeric:tabular-nums!important;}',
    'body[data-const-route="finance"] .i6-sim{border:1px solid rgba(217,179,106,.5)!important;}',
    'body[data-const-route="finance"] .i6-practice{border-left:3px solid #D9B36A!important;padding-left:12px;}',
    'body[data-const-route="writing"] .i6-feature p:first-of-type::first-letter{font-family:Georgia,"Times New Roman",serif;font-size:3.4em;float:left;line-height:.85;padding:6px 10px 0 0;color:#D8CDB4;}',
    'body[data-const-route="writing"] .i6-essaylist button{display:grid!important;grid-template-columns:92px 1fr auto;gap:14px;align-items:baseline;text-align:left;}',
    '@media (max-width:640px){body[data-const-route="writing"] .i6-essaylist button{grid-template-columns:70px 1fr;}}',
    'body[data-const-route="recs"] .i6-letter{border:1px solid rgba(192,138,126,.55)!important;box-shadow:0 0 0 6px rgba(192,138,126,.07)!important;position:relative;}',
    'body[data-const-route="recs"] .i6-letter::before{content:"";position:absolute;top:16px;right:16px;width:26px;height:26px;border-radius:50%;background:#C08A7E;box-shadow:inset 0 0 0 3px rgba(255,255,255,.4);z-index:1;}',
    'body[data-const-route="recs"] .i6-quote{font-size:clamp(30px,4.2vw,46px)!important;line-height:1.12!important;}',
    'body[data-const-route="client"] .i6-client .i6-result{color:#C9A86A!important;}',
    'body[data-const-route="client"] .i6-marketing{display:grid!important;grid-template-columns:1fr 1fr;gap:18px;}',
    'body[data-const-route="client"] .i6-marketing>:not(article){grid-column:1/-1;}',
    '@media (max-width:900px){body[data-const-route="client"] .i6-marketing{grid-template-columns:1fr!important;}}',
    'body[data-const-route="cases"] .i6-memo{position:relative;padding-left:54px!important;}',
    'body[data-const-route="cases"] .i6-memo::before{content:"EXHIBIT " attr(data-i6-ex);position:absolute;left:12px;top:22px;writing-mode:vertical-rl;font-size:10px;letter-spacing:.24em;color:#9BB8D3;}',
    'body[data-const-route="cases"] .i6-stamp{display:inline-block!important;border:2px solid #9BB8D3!important;color:#9BB8D3!important;padding:4px 10px;letter-spacing:.22em!important;transform:rotate(-2deg);font-weight:700;}',
    'body[data-const-route="cases"] .i6-memo h3,body[data-const-route="cases"] .i6-memo h4{border-left:3px solid #9BB8D3;padding-left:10px;}',
    'body[data-const-route="experience"] .i6-role{border-top:3px double #A8B8C8!important;}',
    'body[data-const-route="experience"] .i6-score{color:#D9B36A!important;}',
    'body[data-const-route="certs"] .i6-register button{border-bottom:1px solid rgba(20,22,26,.22)!important;border-radius:0!important;text-align:left!important;}',
    'body[data-const-route="certs"] .i6-tile{border:1px solid rgba(181,192,138,.65)!important;}'
  ].join('\n');
  var st6b = document.createElement('style');
  st6b.id = 'constellation-iter6b';
  st6b.textContent = CSS6B;
  document.head.appendChild(st6b);
  if (window.ScrollTrigger && window.ScrollTrigger.config) { try { window.ScrollTrigger.config({ ignoreMobileResize: true }); } catch (e) {} }

  function route6() { return document.body.getAttribute('data-const-route'); }

  /* ---------- capítulos fijados ---------- */
  var PINS6 = [];
  var REVEALS6 = [];
  var REVEAL_EL6 = null;
  function chapters6() {
    var out = [];
    var btn = document.querySelector('.i4-gate-btn');
    var fig = btn ? btn.closest('figure') : null;
    if (fig) out.push({ key: 'fig0', el: fig, start: 'top top+=70', end: '+=50%' });
    var memo = document.querySelector('.i5-build');
    if (memo) out.push({ key: 'fig2', el: memo, start: 'top top+=10', end: '+=30%' });
    var lifeline = null;
    var pool = document.querySelectorAll('section[data-screen-label="Featured apps"] article');
    var i, h;
    for (i = 0; i < pool.length; i++) {
      h = pool[i].querySelector('h1,h2,h3');
      if (h && (h.textContent || '').trim().toUpperCase() === 'LIFELINE') { lifeline = pool[i]; break; }
    }
    if (!lifeline) {
      var all = document.querySelectorAll('article');
      for (i = 0; i < all.length; i++) {
        h = all[i].querySelector('h1,h2,h3');
        if (h && (h.textContent || '').trim().toUpperCase() === 'LIFELINE') { lifeline = all[i]; break; }
      }
    }
    if (lifeline) out.push({ key: 'lifeline', el: lifeline, start: 'top top+=80', end: '+=40%' });
    return out;
  }
  function killPins6() {
    for (var i = 0; i < PINS6.length; i++) { try { PINS6[i].trig.kill(); } catch (e) {} }
    PINS6 = [];
  }
  function killReveals6() {
    for (var i = 0; i < REVEALS6.length; i++) { try { REVEALS6[i].kill(); } catch (e) {} }
    REVEALS6 = []; REVEAL_EL6 = null;
  }
  function refreshPins6() {
    if (route6() !== 'home' || !PIN_OK()) { killPins6(); return; }
    var chs = chapters6();
    var keep = [];
    for (var i = 0; i < PINS6.length; i++) {
      var rec = PINS6[i], live = null;
      for (var j = 0; j < chs.length; j++) { if (chs[j].key === rec.key) live = chs[j]; }
      if (live && live.el === rec.el && document.contains(rec.el)) keep.push(rec);
      else { try { rec.trig.kill(); } catch (e) {} }
    }
    PINS6 = keep;
    for (var k = 0; k < chs.length; k++) {
      var exists = false;
      for (var m = 0; m < PINS6.length; m++) { if (PINS6[m].key === chs[k].key) exists = true; }
      if (exists) continue;
      var tr;
      try {
        tr = window.ScrollTrigger.create({ trigger: chs[k].el, start: chs[k].start, end: chs[k].end, pin: true, anticipatePin: 1, invalidateOnRefresh: true });
      } catch (e) { continue; }
      PINS6.push({ key: chs[k].key, el: chs[k].el, trig: tr });
    }
    if (PINS6.length) { try { window.ScrollTrigger.refresh(); } catch (e) {} }
  }
  function refreshReveal6() {
    if (PIN_OK() || route6() !== 'home' || !window.gsap || !window.ScrollTrigger) { killReveals6(); return; }
    var lifeline = null;
    var pool = document.querySelectorAll('section[data-screen-label="Featured apps"] article');
    for (var i = 0; i < pool.length; i++) {
      var h = pool[i].querySelector('h1,h2,h3');
      if (h && (h.textContent || '').trim().toUpperCase() === 'LIFELINE') { lifeline = pool[i]; break; }
    }
    if (!lifeline) { killReveals6(); return; }
    if (lifeline === REVEAL_EL6) return;
    killReveals6();
    try {
      var tw = window.gsap.from(lifeline, { opacity: 0, y: 30, scrollTrigger: { trigger: lifeline, start: 'top 88%', end: 'top 60%', scrub: true } });
      REVEALS6.push(tw); REVEAL_EL6 = lifeline;
    } catch (e) {}
  }

  /* ---------- interiores: marcado por texto ---------- */
  function sectionOf6(el) { return el.closest ? (el.closest('section') || el.closest('article') || el.parentElement) : el.parentElement; }
  function markSectionByHeading6(text, cls) {
    var els = document.querySelectorAll('main *');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (el.childElementCount > 0) continue;
      if ((el.textContent || '').trim() === text) { var s = sectionOf6(el); if (s) s.classList.add(cls); return true; }
    }
    return false;
  }
  function markArticleByTitle6(title, cls) {
    var arts = document.querySelectorAll('article');
    for (var i = 0; i < arts.length; i++) {
      var h = arts[i].querySelector('h1,h2,h3');
      if (h) {
        var ht = (h.textContent || '').trim().toUpperCase();
        if (ht === title || ht.indexOf(title) === 0) { arts[i].classList.add(cls); return true; }
      }
    }
    return false;
  }
  function markArticlesWith6(text, cls) {
    var arts = document.querySelectorAll('article');
    for (var i = 0; i < arts.length; i++) {
      if ((arts[i].textContent || '').indexOf(text) >= 0) arts[i].classList.add(cls);
    }
  }
  function markMemos6() {
    var arts = document.querySelectorAll('article');
    for (var i = 0; i < arts.length; i++) {
      var m = /MEMO\s*0(\d)/.exec(arts[i].textContent || '');
      if (m) { arts[i].classList.add('i6-memo'); arts[i].setAttribute('data-i6-ex', '0' + m[1]); }
    }
  }
  function markLedgerRows6() {
    var sec = document.querySelector('.i6-ledger'); if (!sec) return;
    var names = ['OPSFLOW', 'MATCHMIND', 'LIFELINE', 'ORCEN KIT'];
    var leafs = sec.querySelectorAll('*');
    for (var i = 0; i < leafs.length; i++) {
      var el = leafs[i];
      if (el.childElementCount > 0) continue;
      if (names.indexOf((el.textContent || '').trim()) >= 0) {
        var row = el;
        while (row.parentElement && row.parentElement !== sec) row = row.parentElement;
        if (row !== sec) row.classList.add('i6-ledger-row');
      }
    }
  }
  function markPracticeItems6() {
    var sec = document.querySelector('.i6-practices'); if (!sec) return;
    var titles = ['Investment Analysis', 'Banking & Credit', 'Risk & Audit', 'Sales & Trading', 'Tax & Transaction Advisory', 'Bloomberg Terminal'];
    var leafs = sec.querySelectorAll('*');
    for (var i = 0; i < leafs.length; i++) {
      var el = leafs[i];
      if (el.childElementCount > 0) continue;
      if (titles.indexOf((el.textContent || '').trim()) >= 0) {
        var it = el;
        while (it.parentElement && it.parentElement !== sec) it = it.parentElement;
        if (it !== sec) it.classList.add('i6-practice');
      }
    }
  }
  function markBigNums6() {
    var flags = document.querySelectorAll('.i6-flag');
    for (var i = 0; i < flags.length; i++) {
      var leafs = flags[i].querySelectorAll('*');
      for (var j = 0; j < leafs.length; j++) {
        var el = leafs[j];
        if (el.childElementCount > 0) continue;
        if (!/^\d+(\+|×)?$/.test((el.textContent || '').trim())) continue;
        try { if (parseFloat(window.getComputedStyle(el).fontSize) >= 24) el.classList.add('i6-num'); } catch (e) {}
      }
    }
  }
  function markClientResult6() {
    var arts = document.querySelectorAll('.i6-client');
    for (var i = 0; i < arts.length; i++) {
      var leafs = arts[i].querySelectorAll('*');
      for (var j = 0; j < leafs.length; j++) {
        var el = leafs[j];
        if (el.childElementCount > 0) continue;
        if ((el.textContent || '').trim() === '→') {
          var strip = el.parentElement;
          if (strip && /\d/.test(strip.textContent || '')) strip.classList.add('i6-result');
        }
      }
    }
  }
  function markCertTiles6() {
    var names = ['Goldman Sachs', 'J.P. Morgan', 'Bank of America', 'Bloomberg', 'Citi', 'Wells Fargo'];
    var leafs = document.querySelectorAll('main *');
    for (var i = 0; i < leafs.length; i++) {
      var el = leafs[i];
      if (el.childElementCount > 0) continue;
      if (names.indexOf((el.textContent || '').trim()) >= 0) {
        var tile = el.closest ? (el.closest('article') || el.closest('a') || el.parentElement) : el.parentElement;
        if (tile) tile.classList.add('i6-tile');
      }
    }
  }
  function markFeature6() {
    var els = document.querySelectorAll('a,button');
    for (var i = 0; i < els.length; i++) {
      if ((els[i].textContent || '').trim().indexOf('Read the essay') === 0) {
        var a = els[i].closest ? els[i].closest('article') : null;
        if (a) a.classList.add('i6-feature');
      }
    }
  }
  function dress6b() {
    var r = route6();
    if (r === 'coding') {
      markArticlesWith6('TERM SHEET', 'i6-app');
      markSectionByHeading6('WHAT THE CODE ALLOWS', 'i6-ledger');
      markLedgerRows6();
    } else if (r === 'finance') {
      markArticleByTitle6('COMPANY HEALTH RED-FLAG SCANNER', 'i6-flag');
      markArticleByTitle6('AUTO COMPANY VALUATION KIT', 'i6-flag');
      markSectionByHeading6('TRY IT · RED-FLAG SCANNER SIM', 'i6-sim');
      markSectionByHeading6('SELECTED EXPERTISE', 'i6-practices');
      markPracticeItems6();
      markBigNums6();
    } else if (r === 'writing') {
      markSectionByHeading6('ESSAY TAPE', 'i6-tape');
      markSectionByHeading6('ALL 110 ESSAYS', 'i6-essaylist');
      markFeature6();
    } else if (r === 'recs') {
      markArticleByTitle6('THE FULL LETTER', 'i6-letter');
      var leafs = document.querySelectorAll('main *');
      for (var i = 0; i < leafs.length; i++) {
        var el = leafs[i];
        if (el.childElementCount === 0 && (el.textContent || '').trim().indexOf('He could take an') === 0) el.classList.add('i6-quote');
      }
    } else if (r === 'client') {
      markArticleByTitle6('AEROSHIELD', 'i6-client');
      markArticleByTitle6('JET ROSE', 'i6-client');
      markSectionByHeading6('MARKETING PROJECTS & RESEARCH', 'i6-marketing');
      markClientResult6();
    } else if (r === 'cases') {
      markMemos6();
      var memos = document.querySelectorAll('.i6-memo');
      for (var j = 0; j < memos.length; j++) {
        var ls = memos[j].querySelectorAll('*');
        for (var k = 0; k < ls.length; k++) {
          if (ls[k].childElementCount === 0 && (ls[k].textContent || '').trim() === 'APPROVED') ls[k].classList.add('i6-stamp');
        }
      }
    } else if (r === 'experience') {
      var arts = document.querySelectorAll('article');
      for (var a = 0; a < arts.length; a++) arts[a].classList.add('i6-role');
      var els2 = document.querySelectorAll('article *');
      for (var b = 0; b < els2.length; b++) {
        var el2 = els2[b];
        if (el2.childElementCount > 0) continue;
        var t2 = (el2.textContent || '').trim();
        if (/^\d+×$/.test(t2)) el2.classList.add('i6-score');
        else if (/^\d+×/.test(t2)) { try { if (parseFloat(window.getComputedStyle(el2).fontSize) >= 28) el2.classList.add('i6-score'); } catch (e) {} }
      }
    } else if (r === 'certs') {
      markSectionByHeading6('SELECTED CREDENTIALS', 'i6-tiles');
      markSectionByHeading6('ALL 53 CREDENTIALS', 'i6-register');
      markCertTiles6();
    }
  }
  var lastRoute6 = null;
  function boot6b() {
    try { refreshPins6(); } catch (e) {}
    try { refreshReveal6(); } catch (e) {}
    try { dress6b(); } catch (e) {}
    lastRoute6 = route6();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot6b); else boot6b();
  window.addEventListener('load', function () { setTimeout(boot6b, 700); });
  if (window.MutationObserver && !window.__i6bObs) {
    window.__i6bObs = true;
    var mo6b = new MutationObserver(function () { clearTimeout(mo6b._t); mo6b._t = setTimeout(boot6b, 450); });
    mo6b.observe(document.documentElement, { childList: true, subtree: true });
  }
  setInterval(function () { if (route6() !== lastRoute6) boot6b(); else { try { refreshPins6(); } catch (e) {} try { refreshReveal6(); } catch (e) {} } }, 2000);
  var rsz6 = null;
  window.addEventListener('resize', function () { clearTimeout(rsz6); rsz6 = setTimeout(function () { try { refreshPins6(); } catch (e) {} try { refreshReveal6(); } catch (e) {} }, 300); });
})();
