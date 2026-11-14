/* Beyond ring — the personal layer as stars in the web.
   Adds a small ring of personal stars around the hub (ALEKS ARRIOLA) on the Home map,
   threads from each one to the page or project it connects to, and a scene that opens
   when a star is clicked. Content comes from window.BEYOND (assets/js/beyond-data.js):
   an empty entry means its star is not drawn (use ?draft to see every star, marked).
   This file only ADDS elements with the bx- prefix; it never edits the nodes, lines or
   handlers that constellation.js owns. */
(function () {
  'use strict';
  if (window.__beyondRing) return; window.__beyondRing = true;
  var B = window.BEYOND || {};
  if (B.layout !== 'ring') return;
  var DRAFT = /[?&]draft\b/.test(location.search);
  var REDUCE = false; try { REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { }
  var EX = 'EXAMPLE · not real data';
  var BRASS = '#C9A86A';
  /* Same sky geometry as the web in constellation.js (viewBox 1000x520 desktop, 400x560 mobile). */
  var D = { cx: 500, cy: 260, rx1: 215, ry1: 150, rx2: 430, ry2: 230, rx0: 104, ry0: 66, w: 1000, h: 520 };
  var M = { cx: 200, cy: 280, rx1: 100, ry1: 125, rx2: 155, ry2: 200, rx0: 50, ry0: 64, w: 400, h: 560 };
  var ANG_PAGE = { home: -90, cases: -50, coding: -10, client: 30, finance: 70, experience: 110, writing: 150, certs: 190, recs: 230 };
  var ANG_PROJ = { 'Lifeline': -67.5, 'Orcen Kit': 67.5 };
  function polar(g, rx, ry, deg) { var a = deg * Math.PI / 180; return [Math.round(g.cx + rx * Math.cos(a)), Math.round(g.cy + ry * Math.sin(a))]; }
  function targetPos(g, t) {
    if (!t) return null;
    if (ANG_PAGE[t] !== undefined) return polar(g, g.rx1, g.ry1, ANG_PAGE[t]);
    if (ANG_PROJ[t] !== undefined) return polar(g, g.rx2, g.ry2, ANG_PROJ[t]);
    return null;
  }
  function lang() { try { return localStorage.getItem('site-lang') === 'es' ? 'es' : 'en'; } catch (e) { return 'en'; } }
  function t(s) { var d = B.es || {}; return (lang() === 'es' && d[s]) ? d[s] : s; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  var pf = B.perfumes || {}, gy = B.gym || {}, fb = B.football || {}, ck = B.cooking || {}, wt = B.watching || {};
  var shelf = (pf.shelf || []).filter(function (p) { return p && p.name; });
  var gymDays = (gy.days || []).filter(function (d) { return /^\d{4}-\d{2}-\d{2}$/.test(d); });
  var quotes = (gy.quotes || []).filter(Boolean);
  var journey = (B.journey || []).filter(function (j) { return j && j.place; });
  var fbBits = [fb.team, fb.position, fb.follows].filter(Boolean).join(' · ');

  /* key, label, hover line, angle on the personal ring, the star it threads to, where "Connected" travels. */
  var STARS = [
    { key: 'shelf', label: 'The shelf', ds: 'What I wear, and why', ang: 50, to: 'Orcen Kit', has: shelf.length > 0, go: '#case-orcen', goLabel: 'Value over price tag → Orcen Valuation Kit' },
    { key: 'route', label: 'The route', ds: 'Guatemala City → Boston', ang: 130, to: 'experience', has: journey.length > 0, go: '#experience', goLabel: 'Where the route led → Experience' },
    { key: 'gym', label: 'Consistency', ds: 'I never want to go. I go anyway.', ang: 170, to: 'writing', has: gymDays.length > 0 || quotes.length > 0 || !!gy.line, go: '#writing', goLabel: 'The other daily streak → Writing' },
    { key: 'football', label: 'Football', ds: 'Left foot, left side', ang: -70, to: null, has: !!fb.line || !!fbBits || !!fb.body, go: null },
    { key: 'kitchen', label: 'Kitchen', ds: 'I eat. Occasionally, I cook.', ang: 10, to: null, has: !!ck.line, go: null }
  ].filter(function (s) { s.example = !s.has; return s.has || DRAFT; });
  var CLOVER = wt.title ? { key: 'clover', d: [500, 452], m: [200, 446], go: '#case-lifeline', goLabel: '1st of 40 teams, built in one day → Lifeline' } : null;

  var CSS = [
    '.bx-node{position:absolute;left:var(--x);top:var(--y);width:0;height:0;z-index:3;text-decoration:none;outline:none;cursor:pointer}',
    '.bx-node::after{content:"";position:absolute;left:-20px;top:-20px;width:40px;height:40px}',
    '.bx-dot{position:absolute;left:0;top:0;width:9px;height:9px;transform:translate(-50%,-50%);border-radius:50%;background:#0D1210;border:1.5px solid ' + BRASS + ';box-shadow:0 0 0 3px rgba(201,168,106,.14),0 0 12px rgba(201,168,106,.6);transition:transform .18s ease,background .18s ease}',
    '.bx-node:hover .bx-dot,.bx-node:focus-visible .bx-dot{transform:translate(-50%,-50%) scale(1.6);background:' + BRASS + '}',
    '.bx-label{position:absolute;top:0;transform:translateY(-50%);font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;color:rgba(242,226,190,.86);white-space:nowrap;text-shadow:0 1px 6px #0D1210,0 0 10px #0D1210}',
    '.bx-node.bx-r .bx-label{left:11px}.bx-node.bx-l .bx-label{right:11px}',
    '.bx-desc{position:absolute;left:0;bottom:16px;transform:translate(-50%,4px);width:max-content;max-width:190px;text-align:center;font-size:11.5px;line-height:1.4;color:' + BRASS + ';text-shadow:0 1px 6px #0D1210,0 0 14px #0D1210;opacity:0;pointer-events:none;transition:opacity .18s ease,transform .18s ease}',
    '.bx-node:hover .bx-desc,.bx-node:focus-visible .bx-desc{opacity:1;transform:translate(-50%,0)}',
    '.bx-node.bx-ex .bx-dot{border-style:dashed}',
    '.bx-clover .bx-dot{width:5px;height:5px;border-width:1px;opacity:.5;box-shadow:none}',
    '.bx-clover:hover .bx-dot,.bx-clover:focus-visible .bx-dot{opacity:0}',
    '.bx-clover svg{position:absolute!important;inset:auto!important;left:-11px!important;top:-11px!important;width:22px!important;height:22px!important;opacity:0;transition:opacity .25s ease,transform .5s ease;transform:rotate(-40deg) scale(.6)}',
    '.bx-clover:hover svg,.bx-clover:focus-visible svg{opacity:1;transform:rotate(0) scale(1)}',
    '.cm-chart svg.bx-svg{pointer-events:none;z-index:1}',
    '.bx-svg-m{display:none}',
    '.bx-spoke{stroke:rgba(201,168,106,.5);stroke-width:1;fill:none}',
    '.bx-thread{stroke:rgba(201,168,106,.22);stroke-width:1;stroke-dasharray:2 5;fill:none;transition:stroke .2s ease,stroke-width .2s ease}',
    '.bx-thread.bx-on{stroke:rgba(201,168,106,.95);stroke-width:1.6}',
    '@media (max-width:900px){.bx-node{left:var(--mx);top:var(--my)}.bx-label{display:none}.bx-svg-d{display:none!important}.bx-svg-m{display:block!important}}',
    /* scene */
    '.bx-scene{position:fixed;inset:0;z-index:9000;display:flex;align-items:center;justify-content:center;padding:clamp(12px,3vw,40px);background:rgba(8,12,10,.82);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);opacity:0;transition:opacity .25s ease}',
    '.bx-scene.bx-open{opacity:1}',
    '.bx-panel{position:relative;width:min(100%,880px);max-height:100%;overflow:auto;background:#0D1210;color:#EDF3EB;border:1px solid rgba(201,168,106,.5);box-shadow:0 0 0 1px #0D1210,0 30px 80px rgba(0,0,0,.6);padding:clamp(20px,3.2vw,40px);display:flex;flex-direction:column;gap:18px;transform:translateY(14px);transition:transform .3s ease;font-family:inherit}',
    '.bx-scene.bx-open .bx-panel{transform:none}',
    '.bx-top{display:flex;justify-content:space-between;gap:16px;align-items:baseline;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:' + BRASS + '}',
    '.bx-x{all:unset;cursor:pointer;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#EDF3EB;border-bottom:1px solid rgba(237,243,235,.4)}',
    '.bx-x:hover,.bx-x:focus-visible{color:' + BRASS + ';border-color:' + BRASS + '}',
    '.bx-h{font-family:var(--font-heading,Georgia,serif);font-weight:400;font-size:clamp(34px,5vw,60px);line-height:.95;margin:0;text-transform:uppercase;color:#EDF3EB}',
    '.bx-lead{font-family:var(--font-heading,Georgia,serif);font-size:clamp(20px,2.4vw,28px);line-height:1.18;margin:0;max-width:720px;text-wrap:pretty}',
    '.bx-small{font-size:13px;line-height:1.5;margin:0;color:rgba(237,243,235,.82)}',
    '.bx-k{font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:rgba(237,243,235,.6)}',
    '.bx-ex-tag{align-self:flex-start;font-size:11px;letter-spacing:.1em;background:' + BRASS + ';color:#0D1210;padding:2px 8px}',
    '.bx-go{all:unset;cursor:pointer;align-self:flex-start;font-size:13px;border-bottom:1px solid ' + BRASS + ';color:#EDF3EB;margin-top:6px}',
    '.bx-go:hover,.bx-go:focus-visible{color:' + BRASS + '}',
    '.bx-sky{position:relative;height:230px;border-top:1px dashed rgba(237,243,235,.22);border-bottom:1px dashed rgba(237,243,235,.22)}',
    '.bx-bottle{all:unset;position:absolute;cursor:pointer;width:0;height:0}',
    '.bx-bottle i{position:absolute;left:0;top:0;width:10px;height:10px;border-radius:50%;transform:translate(-50%,-50%);border:1.5px solid ' + BRASS + ';background:#0D1210;box-shadow:0 0 12px rgba(201,168,106,.55);transition:transform .2s ease,background .2s ease}',
    '.bx-bottle:hover i,.bx-bottle:focus-visible i,.bx-bottle.bx-sel i{background:' + BRASS + ';transform:translate(-50%,-50%) scale(1.5)}',
    '.bx-bottle span{position:absolute;left:0;top:13px;transform:translateX(-50%);font-size:10px;letter-spacing:.1em;text-transform:uppercase;white-space:nowrap;color:rgba(237,243,235,.7)}',
    '.bx-bottle.bx-sel span{color:' + BRASS + '}',
    '.bx-detail{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr));gap:10px 28px;min-height:96px;align-content:start}',
    '.bx-detail h4{grid-column:1/-1;margin:0;font-family:var(--font-heading,Georgia,serif);font-weight:400;font-size:28px;line-height:1;color:#EDF3EB}',
    '.bx-field{display:grid;grid-template-columns:auto 1fr;gap:4px 12px;font-size:13px;margin:0}.bx-field dd{margin:0}',
    '.bx-field-grid{display:grid;grid-auto-flow:column;grid-template-rows:repeat(7,auto);grid-template-columns:repeat(26,minmax(0,1fr));gap:5px;max-width:560px}',
    '.bx-field-grid i{display:block;aspect-ratio:1;border-radius:50%;background:rgba(237,243,235,.09)}',
    '.bx-field-grid i.on{background:' + BRASS + ';box-shadow:0 0 8px rgba(201,168,106,.8)}',
    '.bx-field-grid i.off{background:transparent}',
    '.bx-arc{stroke-dasharray:1;stroke-dashoffset:1;animation:bxDraw 2.4s .35s cubic-bezier(.7,0,.2,1) forwards}',
    '.bx-pin2{opacity:0;animation:bxIn .5s 2.6s ease forwards}',
    '.bx-leaf{transform-box:fill-box;transform-origin:50% 100%;opacity:0;animation:bxIn .5s ease forwards}',
    '@keyframes bxDraw{to{stroke-dashoffset:0}}@keyframes bxIn{to{opacity:1}}',
    '.bx-stops{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:16px 32px}',
    '@media (max-width:640px){.bx-bottle span{display:none}.bx-bottle.bx-sel span{display:block}.bx-sky{height:170px}}',
    '@media (prefers-reduced-motion: reduce){.bx-scene,.bx-panel,.bx-dot,.bx-clover svg{transition:none}.bx-arc{animation:none;stroke-dashoffset:0}.bx-pin2,.bx-leaf{animation:none;opacity:1}}'
  ].join('\n');

  function cloverSvg(size, animate) {
    var s = '<svg viewBox="-50 -50 100 100" width="' + size + '" height="' + size + '" aria-hidden="true">';
    for (var i = 0; i < 5; i++) s += '<g transform="rotate(' + (i * 72) + ')"><path class="' + (animate ? 'bx-leaf' : '') + '" style="animation-delay:' + (0.15 + i * 0.16) + 's" d="M0,-6 C-20,-18 -18,-42 0,-34 C18,-42 20,-18 0,-6 Z" fill="none" stroke="' + BRASS + '" stroke-width="2.5"/></g>';
    return s + '<path d="M0,2 Q6,26 -4,44" fill="none" stroke="' + BRASS + '" stroke-width="2.5"/></svg>';
  }

  /* ---------- the ring on the map ---------- */
  function linesFor(g) {
    var s = '', hub = [g.cx, g.cy];
    STARS.forEach(function (st) {
      var p = polar(g, g.rx0, g.ry0, st.ang), t = targetPos(g, st.to);
      s += '<line class="bx-spoke" x1="' + hub[0] + '" y1="' + hub[1] + '" x2="' + p[0] + '" y2="' + p[1] + '"/>';
      if (t) s += '<line class="bx-thread" data-bx="' + st.key + '" x1="' + p[0] + '" y1="' + p[1] + '" x2="' + t[0] + '" y2="' + t[1] + '"/>';
    });
    return s;
  }
  function makeSvg(cls, g, like) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'bx-svg ' + cls);
    svg.setAttribute('viewBox', (like && like.getAttribute('viewBox')) || ('0 0 ' + g.w + ' ' + g.h));
    var par = like && like.getAttribute('preserveAspectRatio'); if (par) svg.setAttribute('preserveAspectRatio', par);
    svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML = linesFor(g);
    return svg;
  }
  function place(node, d, m) {
    node.style.setProperty('--x', (d[0] / 10).toFixed(1) + '%');
    node.style.setProperty('--y', (d[1] / 5.2).toFixed(2) + '%');
    node.style.setProperty('--mx', (m[0] / 4).toFixed(2) + '%');
    node.style.setProperty('--my', (m[1] / 5.6).toFixed(2) + '%');
  }
  function lightThreads(chart, key, on) {
    var ls = chart.querySelectorAll('.bx-thread[data-bx="' + key + '"]');
    for (var i = 0; i < ls.length; i++) ls[i].classList[on ? 'add' : 'remove']('bx-on');
  }
  function ensureRing() {
    var chart = document.querySelector('.constellation-map .cm-chart');
    if (!chart) return;
    if (chart.querySelector('.bx-node')) {
      if (chart.getAttribute('data-bx-lang') === lang()) return;
      var old = chart.querySelectorAll('.bx-node,.bx-svg'); for (var o = 0; o < old.length; o++) old[o].parentNode.removeChild(old[o]);   /* language changed: redraw our own stars */
    }
    if (!chart.querySelector('.cm-hub')) return;            /* wait until the web itself is seated */
    chart.setAttribute('data-bx-lang', lang());
    var first = chart.querySelector('.cm-node');
    var sd = makeSvg('bx-svg-d', D, chart.querySelector('.cm-svg-d')), sm = makeSvg('bx-svg-m', M, chart.querySelector('.cm-svg-m'));
    var host = first ? first.parentNode : chart;
    chart.insertBefore(sm, chart.firstChild); chart.insertBefore(sd, chart.firstChild);
    STARS.forEach(function (st) {
      var a = document.createElement('a');
      var right = Math.cos(st.ang * Math.PI / 180) >= 0;
      a.className = 'bx-node ' + (right ? 'bx-r' : 'bx-l') + (st.example ? ' bx-ex' : '');
      a.href = '#'; a.setAttribute('data-bx', st.key); a.setAttribute('role', 'button');
      a.setAttribute('aria-label', t(st.label) + ' — ' + t(st.ds));
      a.innerHTML = '<span class="bx-dot"></span><span class="bx-label">' + esc(t(st.label)) + '</span><span class="bx-desc">' + esc(t(st.ds)) + (st.example ? ' · ' + EX : '') + '</span>';
      place(a, polar(D, D.rx0, D.ry0, st.ang), polar(M, M.rx0, M.ry0, st.ang));
      a.addEventListener('mouseenter', function () { lightThreads(chart, st.key, true); });
      a.addEventListener('mouseleave', function () { lightThreads(chart, st.key, false); });
      a.addEventListener('focus', function () { lightThreads(chart, st.key, true); });
      a.addEventListener('blur', function () { lightThreads(chart, st.key, false); });
      host.appendChild(a);
    });
    if (CLOVER) {
      var c = document.createElement('a');
      c.className = 'bx-node bx-clover'; c.href = '#'; c.setAttribute('data-bx', 'clover'); c.setAttribute('role', 'button');
      c.setAttribute('aria-label', t('A five-leaf clover'));
      c.innerHTML = '<span class="bx-dot"></span>' + cloverSvg(22, false);
      place(c, CLOVER.d, CLOVER.m);
      host.appendChild(c);
    }
  }

  /* ---------- scenes ---------- */
  function exTag(t) { return '<span class="bx-ex-tag">' + esc(t || EX) + '</span>'; }
  function sceneShelf(root) {
    var h = '<h2 class="bx-h">' + esc(t('The shelf')) + '</h2>' + (pf.rule ? '<p class="bx-lead">' + esc(t(pf.rule)) + '</p>' : '') + (pf.story ? '<p class="bx-small" style="max-width:640px">' + esc(t(pf.story)) + '</p>' : '');
    if (!shelf.length) { root.innerHTML = h + exTag(); return; }
    var n = shelf.length, ys = [26, 62, 40, 74, 30, 58];
    h += '<div class="bx-sky">' + shelf.map(function (p, i) { return '<button class="bx-bottle" data-i="' + i + '" style="left:' + (11 + i * (78 / Math.max(1, n - 1))).toFixed(1) + '%;top:' + ys[i % ys.length] + '%" aria-label="' + esc(p.name) + '"><i></i><span>' + esc(p.name) + '</span></button>'; }).join('') + '</div><div class="bx-detail" aria-live="polite"></div>';
    root.innerHTML = h;
    var det = root.querySelector('.bx-detail'), btns = root.querySelectorAll('.bx-bottle');
    function show(i) {
      var p = shelf[i], rows = [['Top', p.top], ['Heart', p.heart], ['Base', p.base]].filter(function (r) { return r[1]; });
      for (var k = 0; k < btns.length; k++) btns[k].classList[k === i ? 'add' : 'remove']('bx-sel');
      det.innerHTML = '<h4>' + esc(p.name) + ' <span class="bx-k">· ' + esc(p.house || '') + '</span></h4>' +
        ((p.said || p.occasion) ? '<div style="display:flex;flex-direction:column;gap:8px">' + (p.said ? '<p class="bx-lead" style="font-size:20px">' + esc(t(p.said)) + '</p>' : '') +
        (p.occasion ? '<p class="bx-small"><span class="bx-k">' + esc(t('Wear it for')) + ' · </span>' + esc(t(p.occasion)) + '</p>' : '') + '</div>' : '') +
        (rows.length ? '<dl class="bx-field">' + rows.map(function (r) { return '<dt class="bx-k">' + esc(t(r[0])) + '</dt><dd>' + esc(r[1]) + '</dd>'; }).join('') + '</dl>' : '') +
        (DRAFT && (rows.length < 3 || !p.occasion) ? exTag('DRAFT · notes or occasion missing') : '');
    }
    for (var k = 0; k < btns.length; k++) (function (i) { btns[i].addEventListener('click', function () { show(i); }); btns[i].addEventListener('mouseenter', function () { show(i); }); })(k);
    var firstNoted = 0; for (var q = 0; q < n; q++) if (shelf[q].top) { firstNoted = q; break; }
    show(firstNoted);
  }
  function sceneGym(root) {
    function iso(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
    var h = '<h2 class="bx-h">' + esc(t('Consistency')) + '</h2>' + (gy.line ? '<p class="bx-lead">' + esc(t(gy.line)) + '</p>' : '') + (gy.body ? '<p class="bx-small" style="max-width:640px">' + esc(t(gy.body)) + '</p>' : '');
    if (gymDays.length || DRAFT) {
      var today = new Date(); today.setHours(0, 0, 0, 0);
      var mon = new Date(today); mon.setDate(mon.getDate() - ((mon.getDay() + 6) % 7));
      var start = new Date(mon); start.setDate(start.getDate() - 25 * 7);
      var days = gymDays.slice(), example = !days.length;
      if (example) [0, 2, 4].forEach(function (o) { var d = new Date(mon); d.setDate(d.getDate() + o); days.push(iso(d)); });
      var set = {}; days.forEach(function (d) { set[d] = 1; });
      var cells = '';
      for (var i = 0; i < 182; i++) { var d = new Date(start); d.setDate(d.getDate() + i); var k = iso(d); cells += '<i title="' + k + '" class="' + (d > today ? 'off' : set[k] ? 'on' : '') + '"></i>'; }
      h += '<p class="bx-k">' + esc(t('Gym · the last 26 weeks · one star per training day.')) + '</p><div class="bx-field-grid">' + cells + '</div>';
      h += example ? exTag() : '<p class="bx-small">' + gymDays.length + ' ' + esc(t('training days logged.')) + '</p>';
    }
    var qs = quotes.length ? quotes : (DRAFT ? ['Your first gym quote goes here.', 'Your second gym quote goes here.'] : []);
    if (qs.length) h += '<div style="display:flex;flex-direction:column;gap:12px;padding-top:14px;border-top:1px dashed rgba(237,243,235,.22)">' + qs.map(function (q) { return '<p class="bx-lead" style="font-size:clamp(18px,2vw,24px)">“' + esc(t(q)) + '”</p>'; }).join('') + '</div>' + (quotes.length ? '' : exTag());
    root.innerHTML = h;
  }
  function sceneFootball(root) {
    root.innerHTML = '<h2 class="bx-h">' + esc(t('Football')) + '</h2>' + (fb.line ? '<p class="bx-lead">' + esc(t(fb.line)) + '</p>' : '') +
      (fb.body ? '<p class="bx-small" style="max-width:640px">' + esc(t(fb.body)) + '</p>' : '') +
      (fb.memory ? '<div style="padding-top:14px;border-top:1px dashed rgba(237,243,235,.22)"><span class="bx-k">' + esc(t('The goal')) + '</span><p class="bx-lead" style="font-size:clamp(18px,2vw,24px);margin-top:6px">' + esc(t(fb.memory)) + '</p></div>' : '') +
      (fbBits ? '<p class="bx-k">' + esc([fb.team, fb.position, fb.follows].filter(Boolean).map(t).join(' · ')) + '</p>' : (DRAFT ? exTag('DRAFT · team / position / follows missing') : ''));
  }
  function sceneKitchen(root) {
    root.innerHTML = '<h2 class="bx-h">' + esc(t('Kitchen')) + '</h2><p class="bx-lead">' + esc(t(ck.line || 'One line about what you cook goes here.')) + '</p>' + (ck.line ? '' : exTag());
  }
  function sceneRoute(root) {
    var pts = journey.filter(function (j) { return typeof j.lat === 'number' && typeof j.lon === 'number'; }).map(function (j) { return { p: j.place, x: Math.round((j.lon + 97) / 32 * 600), y: Math.round((47 - j.lat) / 37 * 200) }; });
    var h = '<h2 class="bx-h">' + esc(t('The route')) + '</h2>';
    if (pts.length > 1) {
      var a = pts[0], b = pts[pts.length - 1];
      h += '<svg viewBox="0 0 600 220" role="img" aria-label="' + esc(a.p + ' → ' + b.p) + '" style="width:100%;height:auto;overflow:visible;max-height:240px"><path class="bx-arc" pathLength="1" d="M' + a.x + ',' + a.y + ' Q ' + Math.round((a.x + b.x) / 2 - 80) + ',' + (Math.min(a.y, b.y) + 10) + ' ' + b.x + ',' + b.y + '" fill="none" stroke="' + BRASS + '" stroke-width="1.6"/>' +
        pts.map(function (p, i) { var last = i === pts.length - 1; return '<g class="' + (i ? 'bx-pin2' : '') + '"><circle cx="' + p.x + '" cy="' + p.y + '" r="5" fill="#0D1210" stroke="' + BRASS + '" stroke-width="2"/><text x="' + (last ? p.x - 12 : p.x + 12) + '" y="' + (p.y + 4) + '" text-anchor="' + (last ? 'end' : 'start') + '" fill="#EDF3EB" font-size="11" letter-spacing="1.6">' + esc(p.p.toUpperCase()) + '</text></g>'; }).join('') + '</svg>';
    }
    h += '<div class="bx-stops">' + journey.map(function (j, i) { return '<div><div class="bx-k">' + String(i + 1).padStart(2, '0') + '</div><p class="bx-lead" style="margin:4px 0 6px">' + (i ? '→ ' : '') + esc(j.place) + '</p><p class="bx-small">' + esc(t(j.note || '')) + '</p></div>'; }).join('') + '</div>';
    root.innerHTML = h;
  }
  function sceneClover(root) {
    root.innerHTML = '<div style="display:flex;gap:24px;align-items:center;flex-wrap:wrap">' + cloverSvg(120, true) + '<div style="display:flex;flex-direction:column;gap:10px;flex:1;min-width:220px"><span class="bx-k">' + esc(t('On screen · you found the fifth leaf')) + '</span><h2 class="bx-h">' + esc(wt.title) + '</h2><p class="bx-lead">' + esc(t(wt.line || '')) + '</p>' + (wt.body ? '<p class="bx-small" style="max-width:560px">' + esc(t(wt.body)) + '</p>' : '') + '</div></div>';
  }
  var BUILD = { shelf: sceneShelf, gym: sceneGym, football: sceneFootball, kitchen: sceneKitchen, route: sceneRoute, clover: sceneClover };

  var open = null;
  function closeScene() {
    if (!open) return;
    var o = open; open = null;
    document.removeEventListener('keydown', o.onKey, true);
    o.el.classList.remove('bx-open');
    setTimeout(function () { if (o.el.parentNode) o.el.parentNode.removeChild(o.el); }, REDUCE ? 0 : 260);
    try { o.from && o.from.focus({ preventScroll: true }); } catch (e) { }
  }
  function travel(go) {
    closeScene();
    if (go === '@how') {
      var els = document.querySelectorAll('div,span,h2'), i;
      for (i = 0; i < els.length; i++) if (els[i].children.length === 0 && (els[i].textContent || '').trim() === 'How I Work') {
        var sec = els[i].closest('section') || els[i];
        window.scrollTo({ top: sec.getBoundingClientRect().top + window.scrollY - 60, behavior: REDUCE ? 'auto' : 'smooth' }); return;
      }
      return;
    }
    if (go) location.hash = go;      /* the site's own router picks this up (popstate) */
  }
  function openScene(st, from) {
    closeScene();
    var el = document.createElement('div');
    el.className = 'bx-scene'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-label', t(st.label || 'Beyond the numbers'));
    el.innerHTML = '<div class="bx-panel"><div class="bx-top"><span>$ open --star ' + esc(st.key) + '</span><button class="bx-x" type="button">' + esc(t('Close')) + ' ✕</button></div><div class="bx-body" style="display:flex;flex-direction:column;gap:18px"></div>' +
      (st.go ? '<button class="bx-go" type="button">✦ ' + esc(t('Connected')) + ': ' + esc(t(st.goLabel)) + '</button>' : '') + '</div>';
    document.body.appendChild(el);
    BUILD[st.key](el.querySelector('.bx-body'));
    el.addEventListener('click', function (e) { if (e.target === el) closeScene(); });
    el.querySelector('.bx-x').addEventListener('click', closeScene);
    var goBtn = el.querySelector('.bx-go'); if (goBtn) goBtn.addEventListener('click', function () { travel(st.go); });
    var onKey = function (e) {
      if (e.key === 'Escape') { e.preventDefault(); closeScene(); return; }
      if (e.key !== 'Tab') return;
      var f = el.querySelectorAll('button,[href]'); if (!f.length) return;
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    };
    document.addEventListener('keydown', onKey, true);
    open = { el: el, from: from, onKey: onKey };
    requestAnimationFrame(function () { el.classList.add('bx-open'); try { el.querySelector('.bx-x').focus({ preventScroll: true }); } catch (e) { } });
  }

  function init() {
    if (!STARS.length && !CLOVER) return;
    var st = document.createElement('style'); st.id = 'beyond-ring-css'; st.textContent = CSS; document.head.appendChild(st);
    ensureRing();
    window.addEventListener('load', function () { setTimeout(ensureRing, 900); });
    setInterval(ensureRing, 1200);          /* the map is rebuilt when you return to Home */
    window.addEventListener('popstate', closeScene);
    /* Clicks are caught on window in the capture phase so the map's own click handling never sees them. */
    window.addEventListener('click', function (e) {
      var n = e.target && e.target.closest ? e.target.closest('.bx-node') : null;
      if (!n) return;
      e.preventDefault(); e.stopPropagation();
      var key = n.getAttribute('data-bx'), st = null, i;
      if (key === 'clover') st = CLOVER; else for (i = 0; i < STARS.length; i++) if (STARS[i].key === key) st = STARS[i];
      if (st) openScene(st, n);
    }, true);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
