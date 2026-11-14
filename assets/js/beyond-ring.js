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
  var gymWeek = (gy.week || []).filter(function (d) { return d >= 1 && d <= 7; });
  var journey = (B.journey || []).filter(function (j) { return j && j.place; });
  var fbBits = [fb.team, fb.foot, fb.side, fb.players].filter(Boolean);

  /* key, label, hover line, angle on the personal ring, the star it threads to, where "Connected" travels. */
  var STARS = [
    { key: 'shelf', label: 'The shelf', ds: function () { return shelf.length + ' ' + t('bottles'); }, ang: 50, to: 'Orcen Kit', has: shelf.length > 0, go: '#case-orcen', goLabel: 'Orcen Valuation Kit' },
    { key: 'route', label: 'The route', ds: function () { return journey.map(function (j) { return j.place; }).join(' → '); }, ang: 130, to: 'experience', has: journey.length > 0, go: '#experience', goLabel: 'Experience' },
    { key: 'gym', label: 'Consistency', ds: function () { return gymWeek.length + ' ' + t('nights a week'); }, ang: 170, to: 'writing', has: gymWeek.length > 0 || gymDays.length > 0, go: '#writing', goLabel: 'Writing' },
    { key: 'football', label: 'Football', ds: function () { return [fb.team, fb.foot].filter(Boolean).map(t).join(' · '); }, ang: -70, to: null, has: fbBits.length > 0, go: null },
    { key: 'kitchen', label: 'Kitchen', ds: function () { return [ck.dish, ck.pair].filter(Boolean).map(t).join(' + '); }, ang: 10, to: null, has: !!ck.dish, go: null }
  ].filter(function (s) { s.example = !s.has; return s.has || DRAFT; });
  var CLOVER = wt.title ? { key: 'clover', d: [500, 452], m: [200, 446], go: '#case-lifeline', goLabel: 'Lifeline' } : null;

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


  var CSS2 = [
    '.bx-dot{animation:bxPulse 3.2s ease-in-out infinite}',
    '@keyframes bxPulse{0%,100%{box-shadow:0 0 0 3px rgba(201,168,106,.14),0 0 10px rgba(201,168,106,.5)}50%{box-shadow:0 0 0 7px rgba(201,168,106,.05),0 0 20px rgba(201,168,106,.95)}}',
    '.bx-panel{clip-path:circle(0px at var(--ox,50%) var(--oy,50%));transition:clip-path 1.1s cubic-bezier(.5,0,.4,1),transform .3s ease}',
    '.bx-scene.bx-open .bx-panel{clip-path:circle(2600px at var(--ox,50%) var(--oy,50%))}',
    '.bx-h{animation:bxRise .6s .25s both}',
    '@keyframes bxRise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}',
    '.bx-chips{display:flex;flex-wrap:wrap;gap:8px}',
    '.bx-chip{font-size:11px;letter-spacing:.12em;text-transform:uppercase;padding:5px 12px;border:1px solid rgba(201,168,106,.6);color:#EDF3EB;animation:bxRise .5s both}',
    /* shelf */
    '.bx-shelf{width:100%;height:auto;overflow:visible}',
    '.bx-btl{cursor:pointer;outline:none}',
    '.bx-btl-in{animation:bxFloat 4.4s ease-in-out infinite;fill:#0D1210;stroke:' + BRASS + ';stroke-width:1.6;transition:transform .3s ease}',
    '.bx-btl-liq{fill:rgba(201,168,106,.22);stroke:none;transition:fill .3s ease}',
    '.bx-btl-cap{fill:' + BRASS + '}',
    '.bx-btl.bx-sel .bx-btl-liq{fill:rgba(201,168,106,.75)}',
    '.bx-btl:hover .bx-btl-in,.bx-btl:focus-visible .bx-btl-in,.bx-btl.bx-sel .bx-btl-in{animation-play-state:paused;transform:translateY(-12px)}',
    '.bx-scent circle{fill:' + BRASS + ';stroke:none;opacity:0}',
    '.bx-btl.bx-sel .bx-scent circle{animation:bxScent 1.8s ease-out infinite}',
    '@keyframes bxFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}',
    '@keyframes bxScent{0%{opacity:0;transform:translateY(0) scale(.6)}20%{opacity:.9}100%{opacity:0;transform:translateY(-46px) scale(1.5)}}',
    '.bx-detail{display:flex;flex-direction:column;gap:12px;min-height:128px}',
    '.bx-notes{display:flex;flex-direction:column;gap:8px;max-width:620px}',
    '.bx-note{display:grid;grid-template-columns:64px 1fr;gap:4px 12px;align-items:center;font-size:13px;animation:bxRise .45s both}',
    '.bx-note i{grid-column:2;height:2px;background:' + BRASS + ';transform-origin:0 50%;animation:bxGrow .7s both}',
    '.bx-note span:last-child{grid-column:2}',
    '.bx-note:nth-child(1) i{width:45%}.bx-note:nth-child(2) i{width:72%}.bx-note:nth-child(3) i{width:100%}',
    '@keyframes bxGrow{from{transform:scaleX(0)}to{transform:scaleX(1)}}',
    /* gym */
    '.bx-gym{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:20px 36px;align-items:center}',
    '.bx-lift{width:100%;max-width:340px;height:auto;overflow:visible}',
    '.bx-bar{animation:bxLift 2.4s cubic-bezier(.5,0,.3,1) infinite}',
    '@keyframes bxLift{0%,12%{transform:translateY(150px)}45%,60%{transform:translateY(58px)}92%,100%{transform:translateY(150px)}}',
    '.bx-moon{animation:bxGlow 3s ease-in-out infinite}',
    '@keyframes bxGlow{0%,100%{opacity:.55}50%{opacity:1}}',
    '.bx-gym-r{display:flex;flex-direction:column;gap:16px}',
    '.bx-big{display:flex;align-items:baseline;gap:12px}',
    '.bx-big b{font-family:var(--font-heading,Georgia,serif);font-weight:400;font-size:clamp(64px,9vw,112px);line-height:.8;color:' + BRASS + '}',
    '.bx-big span{font-size:12px;letter-spacing:.14em;text-transform:uppercase}',
    '.bx-week{display:flex;gap:10px}',
    '.bx-day{display:flex;flex-direction:column;align-items:center;gap:6px;font-size:11px;letter-spacing:.1em;color:rgba(237,243,235,.5)}',
    '.bx-day i{width:22px;height:22px;border-radius:50%;border:1.5px solid rgba(237,243,235,.25)}',
    '.bx-day.on{color:#EDF3EB}',
    '.bx-day.on i{border-color:' + BRASS + ';animation:bxDay 4.2s ease-in-out infinite;animation-delay:inherit}',
    '@keyframes bxDay{0%,6%{background:transparent;box-shadow:none}14%,70%{background:' + BRASS + ';box-shadow:0 0 14px rgba(201,168,106,.85)}88%,100%{background:transparent;box-shadow:none}}',
    '.bx-field-grid i.on{animation:bxRise .4s both}',
    /* football */
    '.bx-pitch{width:100%;height:auto;max-height:330px;overflow:visible}',
    '.bx-lane{opacity:.1;animation:bxLane 2.6s ease-in-out infinite}',
    '@keyframes bxLane{0%,100%{opacity:.07}50%{opacity:.2}}',
    '.bx-trail{stroke-dasharray:1;stroke-dashoffset:1}',
    '.bx-ball{offset-distance:0%;offset-rotate:0deg}',
    '.bx-net{opacity:0}',
    '.bx-play .bx-trail{animation:bxDraw 1.9s .7s cubic-bezier(.3,0,.5,1) forwards}',
    '.bx-play .bx-ball{animation:bxFly 1.9s .7s cubic-bezier(.3,0,.5,1) forwards}',
    '.bx-play .bx-net{animation:bxNet 1.2s 2.55s ease-out forwards}',
    '.bx-play .bx-keeper{animation:bxKeep .7s 1.9s ease-out forwards}',
    '.bx-play .bx-crowd{animation:bxJump .5s 1.5s ease-out}',
    '@keyframes bxFly{to{offset-distance:100%}}',
    '@keyframes bxNet{0%{opacity:0}20%{opacity:.95}100%{opacity:.35}}',
    '@keyframes bxKeep{to{transform:translate(-14px,3px)}}',
    '@keyframes bxJump{50%{transform:translateY(-7px)}}',
    /* kitchen */
    '.bx-kitchen{width:100%;height:auto;max-height:280px;overflow:visible}',
    '.bx-steam{stroke-dasharray:18 60;animation:bxSteam 2.4s linear infinite;opacity:.7}',
    '@keyframes bxSteam{from{stroke-dashoffset:78;opacity:0}30%{opacity:.8}to{stroke-dashoffset:0;opacity:0}}',
    '.bx-flame{animation:bxFlame .9s ease-in-out infinite}',
    '@keyframes bxFlame{0%,100%{transform:scaleY(.7)}50%{transform:scaleY(1.25)}}',
    '.bx-steak{animation:bxSizzle .35s linear infinite}',
    '@keyframes bxSizzle{0%,100%{transform:translate(0,0)}50%{transform:translate(.8px,-.6px)}}',
    '.bx-wine{transform-box:fill-box;transform-origin:50% 100%;animation:bxPour 2.2s .5s cubic-bezier(.4,0,.2,1) both}',
    '@keyframes bxPour{from{transform:scaleY(0)}to{transform:scaleY(.72)}}',
    /* route */
    '.bx-ping{animation:bxPing 2.2s ease-out infinite}',
    '@keyframes bxPing{0%{transform:scale(1);opacity:.9}100%{transform:scale(3.6);opacity:0}}',
    /* clover */
    '.bx-cl{display:flex;gap:28px;align-items:center;flex-wrap:wrap}',
    '.bx-clover-big{animation:bxSway 5s 2.6s ease-in-out infinite;transform-origin:50% 90%}',
    '.bx-leaf{stroke-dasharray:1;stroke-dashoffset:1;opacity:1;transform:none;animation:bxDraw .7s ease forwards}',
    '.bx-fifth{filter:drop-shadow(0 0 5px ' + BRASS + ')}',
    '@keyframes bxSway{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(5deg)}}',
    '@media (prefers-reduced-motion: reduce){.bx-dot,.bx-btl-in,.bx-bar,.bx-moon,.bx-day.on i,.bx-lane,.bx-steam,.bx-flame,.bx-steak,.bx-ping,.bx-clover-big,.bx-h,.bx-chip,.bx-note,.bx-note i,.bx-scent circle,.bx-field-grid i.on{animation:none!important}.bx-panel{clip-path:none!important}.bx-bar{transform:translateY(58px)}.bx-day.on i{background:' + BRASS + '}.bx-trail,.bx-leaf{animation:none!important;stroke-dashoffset:0}.bx-ball{animation:none!important;offset-distance:100%}.bx-net{animation:none!important;opacity:.35}.bx-wine{animation:none!important;transform:scaleY(.72)}}'
  ].join('\n');

  function cloverSvg(size, animate) {
    var s = '<svg class="' + (animate ? 'bx-clover-big' : '') + '" viewBox="-50 -50 100 100" width="' + size + '" height="' + size + '" aria-hidden="true">';
    for (var i = 0; i < 5; i++) s += '<g transform="rotate(' + (i * 72) + ')"><path pathLength="1" class="' + (animate ? 'bx-leaf' + (i === 4 ? ' bx-fifth' : '') : '') + '" style="animation-delay:' + (0.2 + i * 0.35).toFixed(2) + 's" d="M0,-6 C-20,-18 -18,-42 0,-34 C18,-42 20,-18 0,-6 Z" fill="none" stroke="' + BRASS + '" stroke-width="2.5"/></g>';
    return s + '<path pathLength="1" class="' + (animate ? 'bx-leaf' : '') + '" style="animation-delay:1.95s" d="M0,2 Q6,26 -4,44" fill="none" stroke="' + BRASS + '" stroke-width="2.5"/></svg>';
  }

  /* ---------- the ring on the map ---------- */
  function linesFor(g) {
    var s = '', hub = [g.cx, g.cy];
    STARS.forEach(function (st) {
      var p = polar(g, g.rx0, g.ry0, st.ang), t = targetPos(g, st.to);
      s += '<line class="bx-spoke" x1="' + hub[0] + '" y1="' + hub[1] + '" x2="' + p[0] + '" y2="' + p[1] + '"/>';
      if (!REDUCE) s += '<circle r="2.2" fill="' + BRASS + '" opacity=".9"><animateMotion dur="' + (2.6 + (st.ang % 7) * 0.15).toFixed(2) + 's" begin="' + ((st.ang + 90) % 5 * 0.4).toFixed(1) + 's" repeatCount="indefinite" path="M' + hub[0] + ',' + hub[1] + ' L' + p[0] + ',' + p[1] + '"/><animate attributeName="opacity" values="0;.95;.95;0" keyTimes="0;.15;.8;1" dur="' + (2.6 + (st.ang % 7) * 0.15).toFixed(2) + 's" begin="' + ((st.ang + 90) % 5 * 0.4).toFixed(1) + 's" repeatCount="indefinite"/></circle>';
      if (t && !REDUCE) s += '<circle r="1.8" fill="' + BRASS + '" opacity="0"><animateMotion dur="4.5s" begin="' + ((st.ang + 90) % 4 * 0.7).toFixed(1) + 's" repeatCount="indefinite" path="M' + p[0] + ',' + p[1] + ' L' + t[0] + ',' + t[1] + '"/><animate attributeName="opacity" values="0;.8;.8;0" keyTimes="0;.1;.85;1" dur="4.5s" begin="' + ((st.ang + 90) % 4 * 0.7).toFixed(1) + 's" repeatCount="indefinite"/></circle>';
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
      a.setAttribute('aria-label', t(st.label) + ' — ' + st.ds());
      a.innerHTML = '<span class="bx-dot"></span><span class="bx-label">' + esc(t(st.label)) + '</span><span class="bx-desc">' + esc(st.ds()) + (st.example ? ' · ' + EX : '') + '</span>';
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
  function chips(list) { return '<div class="bx-chips">' + list.filter(Boolean).map(function (c, i) { return '<span class="bx-chip" style="animation-delay:' + (0.3 + i * 0.12).toFixed(2) + 's">' + esc(t(c)) + '</span>'; }).join('') + '</div>'; }
  function sceneShelf(root) {
    var n = shelf.length, W = 900, step = W / (n + 1), hs = [84, 66, 96, 74, 88, 62, 78, 92, 70], ws = [34, 40, 30, 38, 32, 42, 36, 30, 38];
    var svg = '<svg class="bx-shelf" viewBox="0 0 ' + W + ' 250" role="group" aria-label="' + esc(t('The shelf')) + '"><line x1="20" y1="212" x2="' + (W - 20) + '" y2="212" stroke="' + BRASS + '" stroke-width="1.5"/><line x1="20" y1="218" x2="' + (W - 20) + '" y2="218" stroke="rgba(201,168,106,.3)" stroke-width="1"/>';
    shelf.forEach(function (p, i) {
      var x = Math.round(step * (i + 1)), h = hs[i % hs.length], w = ws[i % ws.length], top = 210 - h, shape = i % 3;
      var body = shape === 0 ? '<rect x="' + (-w / 2) + '" y="' + top + '" width="' + w + '" height="' + h + '" rx="3"/>' : shape === 1 ? '<rect x="' + (-w / 2) + '" y="' + top + '" width="' + w + '" height="' + h + '" rx="' + (w / 2.4) + '"/>' : '<path d="M' + (-w / 2 + 5) + ',' + top + ' H' + (w / 2 - 5) + ' L' + (w / 2) + ',' + (top + 14) + ' V210 H' + (-w / 2) + ' V' + (top + 14) + ' Z"/>';
      svg += '<g class="bx-btl" data-i="' + i + '" tabindex="0" role="button" aria-label="' + esc(p.name) + '" transform="translate(' + x + ',0)"><rect x="-30" y="60" width="60" height="170" fill="transparent" stroke="none"/><g class="bx-btl-in" style="animation-delay:' + (-i * 0.55).toFixed(2) + 's">' + body +
        '<rect class="bx-btl-liq" x="' + (-w / 2 + 4) + '" y="' + (top + h * 0.42) + '" width="' + (w - 8) + '" height="' + (h * 0.58 - 4) + '" rx="2"/>' +
        '<rect x="-6" y="' + (top - 9) + '" width="12" height="9"/><rect class="bx-btl-cap" x="-9" y="' + (top - 23) + '" width="18" height="14" rx="2"/>' +
        '<g class="bx-scent">' + [0, 1, 2].map(function (k) { return '<circle cx="' + ((k - 1) * 7) + '" cy="' + (top - 30) + '" r="2.4" style="animation-delay:' + (k * 0.5) + 's"/>'; }).join('') + '</g></g></g>';
    });
    svg += '</svg>';
    root.innerHTML = '<h2 class="bx-h">' + esc(t('The shelf')) + '</h2>' + svg + '<div class="bx-detail" aria-live="polite"></div>';
    var det = root.querySelector('.bx-detail'), btls = root.querySelectorAll('.bx-btl');
    function show(i) {
      var p = shelf[i], rows = [['Top', p.top], ['Heart', p.heart], ['Base', p.base]].filter(function (r) { return r[1]; });
      for (var k = 0; k < btls.length; k++) btls[k].classList[k === i ? 'add' : 'remove']('bx-sel');
      det.innerHTML = '<h4>' + esc(p.name) + ' <span class="bx-k">· ' + esc(p.house || '') + '</span></h4>' +
        (rows.length ? '<div class="bx-notes">' + rows.map(function (r, ri) { return '<div class="bx-note" style="animation-delay:' + (ri * 0.18) + 's"><span class="bx-k">' + esc(t(r[0])) + '</span><i style="animation-delay:' + (0.1 + ri * 0.18) + 's"></i><span>' + esc(r[1]) + '</span></div>'; }).join('') + '</div>' : '') +
        (p.occasion ? chips([p.occasion]) : '') + (DRAFT && (rows.length < 3 || !p.occasion) ? exTag('DRAFT · notes or occasion missing') : '');
    }
    for (var k = 0; k < btls.length; k++) (function (i) { ['click', 'mouseenter', 'focus'].forEach(function (ev) { btls[i].addEventListener(ev, function () { show(i); }); }); })(k);
    var first = 0; for (var q = 0; q < n; q++) if (shelf[q].top) { first = q; break; }
    show(first);
  }
  function sceneGym(root) {
    function iso(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
    var L = ['M', 'T', 'W', 'T', 'F', 'S', 'S'], on = {}; gymWeek.forEach(function (d) { on[d] = 1; });
    var k = 0, week = L.map(function (l, i) { var lit = on[i + 1]; return '<div class="bx-day' + (lit ? ' on' : '') + '"' + (lit ? ' style="animation-delay:' + ((k++) * 0.42).toFixed(2) + 's"' : '') + '><i></i><span>' + esc(t(l)) + '</span></div>'; }).join('');
    var bar = '<svg class="bx-lift" viewBox="0 0 320 200" aria-hidden="true"><line x1="20" y1="186" x2="300" y2="186" stroke="rgba(237,243,235,.25)"/><g class="bx-bar"><line x1="40" y1="0" x2="280" y2="0" stroke="#EDF3EB" stroke-width="4" stroke-linecap="round"/>' +
      [[62, 44], [78, 34], [242, 34], [258, 44]].map(function (p) { return '<rect x="' + (p[0] - 6) + '" y="' + (-p[1]) + '" width="12" height="' + (p[1] * 2) + '" rx="3" fill="#0D1210" stroke="' + BRASS + '" stroke-width="2"/>'; }).join('') + '</g>' +
      '<path class="bx-moon" d="M286,28 a16,16 0 1 0 14,24 a12,12 0 1 1 -14,-24 Z" fill="' + BRASS + '"/></svg>';
    var h = '<h2 class="bx-h">' + esc(t('Consistency')) + '</h2><div class="bx-gym">' + bar + '<div class="bx-gym-r"><div class="bx-big"><b class="bx-count" data-to="' + gymWeek.length + '">0</b><span>' + esc(t('nights a week')) + '</span></div><div class="bx-week">' + week + '</div>' + (gy.when ? chips([gy.when]) : '') + '</div></div>';
    if (gymDays.length || DRAFT) {
      var today = new Date(); today.setHours(0, 0, 0, 0);
      var mon = new Date(today); mon.setDate(mon.getDate() - ((mon.getDay() + 6) % 7));
      var start = new Date(mon); start.setDate(start.getDate() - 25 * 7);
      var days = gymDays.slice(), example = !days.length;
      if (example) [0, 2, 4].forEach(function (o) { var d = new Date(mon); d.setDate(d.getDate() + o); days.push(iso(d)); });
      var set = {}; days.forEach(function (d) { set[d] = 1; });
      var cells = '';
      for (var i = 0; i < 182; i++) { var d = new Date(start); d.setDate(d.getDate() + i); var key = iso(d); cells += '<i title="' + key + '" class="' + (d > today ? 'off' : set[key] ? 'on' : '') + '" style="animation-delay:' + (i * 6) + 'ms"></i>'; }
      h += '<div class="bx-field-grid">' + cells + '</div>' + (example ? exTag() : '<p class="bx-k">' + gymDays.length + ' ' + esc(t('training days logged')) + '</p>');
    }
    root.innerHTML = h;
    var c = root.querySelector('.bx-count'), to = +c.getAttribute('data-to');
    if (REDUCE) { c.textContent = to; return; }
    var v = 0, iv = setInterval(function () { v++; c.textContent = v; if (v >= to) clearInterval(iv); }, 420);
  }
  function sceneFootball(root) {
    var path = 'M118,268 C40,150 250,20 372,58';
    var svg = '<svg class="bx-pitch" viewBox="0 0 600 300" role="img" aria-label="' + esc(t('Football')) + '">' +
      '<rect x="20" y="20" width="560" height="270" fill="none" stroke="rgba(237,243,235,.28)"/><rect class="bx-lane" x="20" y="20" width="170" height="270" fill="' + BRASS + '"/>' +
      '<rect x="180" y="20" width="240" height="96" fill="none" stroke="rgba(237,243,235,.28)"/><rect x="246" y="20" width="108" height="38" fill="none" stroke="rgba(237,243,235,.28)"/><path d="M240,116 A70,60 0 0 0 360,116" fill="none" stroke="rgba(237,243,235,.28)"/>' +
      '<rect class="bx-goal" x="262" y="6" width="76" height="14" fill="none" stroke="#EDF3EB" stroke-width="2"/><rect class="bx-net" x="262" y="6" width="76" height="14" fill="' + BRASS + '"/>' +
      '<circle class="bx-keeper" cx="300" cy="30" r="6" fill="#0D1210" stroke="#EDF3EB" stroke-width="2"/>' +
      [[250, 80], [300, 92], [345, 74], [285, 62]].map(function (p, i) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="4.5" fill="none" stroke="rgba(237,243,235,.5)" stroke-width="1.5" class="bx-crowd" style="animation-delay:' + (i * 0.2) + 's"/>'; }).join('') +
      '<path class="bx-trail" pathLength="1" d="M118,268 C40,150 250,20 330,13" fill="none" stroke="' + BRASS + '" stroke-width="2" stroke-linecap="round"/>' +
      '<circle cx="118" cy="268" r="7" fill="none" stroke="' + BRASS + '" stroke-width="2"/>' +
      '<circle class="bx-ball" r="5.5" fill="#EDF3EB" style="offset-path:path(\'M118,268 C40,150 250,20 330,13\')"/></svg>';
    root.innerHTML = '<h2 class="bx-h">' + esc(t('Football')) + '</h2>' + svg + '<div style="display:flex;gap:14px;flex-wrap:wrap;align-items:center;justify-content:space-between">' + chips(fbBits) + '<button class="bx-x bx-replay" type="button">↻ ' + esc(t('Replay')) + '</button></div>' + (fbBits.length ? '' : exTag());
    var sv = root.querySelector('.bx-pitch');
    root.querySelector('.bx-replay').addEventListener('click', function () { sv.classList.remove('bx-play'); void sv.getBoundingClientRect(); sv.classList.add('bx-play'); });
    sv.classList.add('bx-play');
  }
  function sceneKitchen(root) {
    var svg = '<svg class="bx-kitchen" viewBox="0 0 520 240" role="img" aria-label="' + esc(t('Kitchen')) + '">' +
      [0, 1, 2].map(function (k) { return '<path class="bx-steam" style="animation-delay:' + (k * 0.6) + 's" d="M' + (170 + k * 34) + ',118 q-10,-18 0,-34 q10,-16 0,-34" fill="none" stroke="rgba(237,243,235,.7)" stroke-width="2" stroke-linecap="round"/>'; }).join('') +
      '<path class="bx-steak" d="M150,138 q12,-18 52,-14 q44,4 56,14 q-6,10 -54,10 q-46,0 -54,-10 Z" fill="' + BRASS + '" opacity=".85"/>' +
      '<path d="M112,150 H296 q-4,30 -34,30 H146 q-30,0 -34,-30 Z" fill="#0D1210" stroke="#EDF3EB" stroke-width="2"/><line x1="296" y1="154" x2="372" y2="142" stroke="#EDF3EB" stroke-width="5" stroke-linecap="round"/>' +
      [0, 1, 2, 3, 4].map(function (k) { return '<path class="bx-flame" style="animation-delay:' + (-k * 0.23) + 's;transform-origin:' + (146 + k * 29) + 'px 212px" d="M' + (146 + k * 29) + ',212 q-9,-12 0,-24 q9,12 0,24 Z" fill="' + BRASS + '"/>'; }).join('') +
      '<line x1="120" y1="214" x2="290" y2="214" stroke="rgba(237,243,235,.3)"/>' +
      '<g transform="translate(430,0)"><clipPath id="bxGlass"><path d="M-22,96 H22 q0,46 -22,50 q-22,-4 -22,-50 Z"/></clipPath><g clip-path="url(#bxGlass)"><rect class="bx-wine" x="-24" y="96" width="48" height="52" fill="' + BRASS + '"/></g><path d="M-22,96 H22 q0,46 -22,50 q-22,-4 -22,-50 Z M0,146 V198 M-18,200 H18" fill="none" stroke="#EDF3EB" stroke-width="2" stroke-linecap="round"/></g></svg>';
    root.innerHTML = '<h2 class="bx-h">' + esc(t('Kitchen')) + '</h2>' + svg + (ck.dish ? chips([ck.dish, ck.pair]) : exTag());
  }
  function sceneRoute(root) {
    var pts = journey.filter(function (j) { return typeof j.lat === 'number' && typeof j.lon === 'number'; }).map(function (j) { return { p: j.place, x: Math.round((j.lon + 97) / 32 * 600), y: Math.round((47 - j.lat) / 37 * 200) }; });
    var h = '<h2 class="bx-h">' + esc(t('The route')) + '</h2>';
    if (pts.length > 1) {
      var a = pts[0], b = pts[pts.length - 1], d = 'M' + a.x + ',' + a.y + ' Q ' + Math.round((a.x + b.x) / 2 - 80) + ',' + (Math.min(a.y, b.y) + 10) + ' ' + b.x + ',' + b.y;
      h += '<svg class="bx-routemap" viewBox="0 0 600 220" role="img" aria-label="' + esc(a.p + ' → ' + b.p) + '" style="width:100%;height:auto;overflow:visible;max-height:250px">' +
        '<path d="' + d + '" fill="none" stroke="rgba(201,168,106,.25)" stroke-width="1.2" stroke-dasharray="2 6"/><path class="bx-arc" pathLength="1" d="' + d + '" fill="none" stroke="' + BRASS + '" stroke-width="1.8"/>' +
        pts.map(function (p, i) { var last = i === pts.length - 1; return '<g class="' + (i ? 'bx-pin2' : '') + '"><circle class="bx-ping" cx="' + p.x + '" cy="' + p.y + '" r="5" fill="none" stroke="' + BRASS + '" style="transform-origin:' + p.x + 'px ' + p.y + 'px;animation-delay:' + (i ? 2.6 : 0) + 's"/><circle cx="' + p.x + '" cy="' + p.y + '" r="5" fill="#0D1210" stroke="' + BRASS + '" stroke-width="2"/><text x="' + (last ? p.x - 14 : p.x + 14) + '" y="' + (p.y + 4) + '" text-anchor="' + (last ? 'end' : 'start') + '" fill="#EDF3EB" font-size="11" letter-spacing="1.6">' + esc(p.p.toUpperCase()) + '</text></g>'; }).join('') +
        (REDUCE ? '' : '<circle r="4" fill="#EDF3EB"><animateMotion dur="3.2s" begin="2.8s" repeatCount="indefinite" path="' + d + '" keyPoints="0;1;1" keyTimes="0;.75;1" calcMode="linear"/><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.08;.7;.8" dur="3.2s" begin="2.8s" repeatCount="indefinite"/></circle>') + '</svg>';
    }
    h += '<div class="bx-stops">' + journey.map(function (j, i) { return '<div><div class="bx-k">' + String(i + 1).padStart(2, '0') + '</div><p class="bx-lead" style="margin:4px 0 10px">' + (i ? '→ ' : '') + esc(j.place) + '</p>' + chips(j.tags || []) + '</div>'; }).join('') + '</div>';
    root.innerHTML = h;
  }
  function sceneClover(root) {
    root.innerHTML = '<div class="bx-cl">' + cloverSvg(170, true) + '<h2 class="bx-h">' + esc(wt.title) + '</h2></div>';
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
    try { var fr = from.getBoundingClientRect(), pr = el.querySelector('.bx-panel').getBoundingClientRect();
      el.style.setProperty('--ox', Math.round(Math.max(0, Math.min(pr.width, fr.left - pr.left))) + 'px'); el.style.setProperty('--oy', Math.round(Math.max(0, Math.min(pr.height, fr.top - pr.top))) + 'px'); } catch (e) { }
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
    var st = document.createElement('style'); st.id = 'beyond-ring-css'; st.textContent = CSS + CSS2; document.head.appendChild(st);
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
