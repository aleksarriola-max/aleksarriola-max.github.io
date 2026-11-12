// Iteración 14 — vídeos Manim, panel del simulador y detalles de FIG.2.
//
// Bloqueador 1 (vídeos): las dos <video> de la plantilla quedan inertes en la
// página — el póster se ve, pero no aparecen los controles nativos al pasar el
// ratón, el clic no reproduce y el vídeo nunca toma el foco — y la figura DCF
// ni siquiera llega al DOM vivo (la plantilla la trae dentro de #model, tras
// la rejilla de sensibilidad). Como el runtime (dc-runtime.js, generado, sin
// editar) es quien compila la plantilla, la reparación se hace aquí, en la
// capa de iteración: se repone la figura que falta con el marcado exacto de
// la plantilla, se devuelven los controles nativos a cada vídeo y un
// controlador en la <figure> (nodo estable ante los re-renders de React)
// reproduce/pausa el vídeo que haya dentro si el clic nativo no tuvo efecto.
//
// Bloqueador 2 (simulador casi invisible): NO era un reveal de GSAP. El panel
// #scanner perdía su fondo oscuro por la regla de la Iteración 2
// `div#scanner { background: transparent !important }`, que es correcta para
// las secciones oscuras (se apoyan en el fondo oscuro del body) pero no para
// #scanner, que vive sobre la sección clara de Finance: su texto claro
// (--paper) quedaba sobre fondo claro. Aquí se devuelve su fondo oscuro (y se
// quita el selector del <style> de index.html). Como red de seguridad, este
// script también rescata cualquier [data-reveal] / figure[data-gsap] /
// [data-choreo] que lleve 2 s o más a la vista con opacidad < 0.9 (reveal que
// nunca se disparó tras un re-render o una navegación) y refresca los
// ScrollTrigger tras navegar.
//
// Menores: (a) el placeholder de historial vacío se localiza según el idioma
// activo; (b) los chips duplicados del historial se eliminan del DOM.
(function () {
  'use strict';
  if (window.__iter14) return; window.__iter14 = 1;
  if (window.console) console.log('[i14] iter14 activo');

  var ALTMAN_CAP = 'Altman Z-score · how five ratios combine into a distress signal. Animated with Manim.';
  var DCF_CAP = 'DCF sensitivity · how the value moves when WACC and terminal growth move. Animated with Manim.';
  var EMPTY_ES = 'Aún no hay escenarios: toca una celda de la rejilla o mueve un deslizador.';
  var EMPTY_EN = 'No scenarios yet: tap a grid cell or move a slider.';

  function $(s, r) { return (r || document).querySelector(s); }
  function $all(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  /* Fondo oscuro del simulador (defensa frente a la regla de la Iteración 2). */
  (function () {
    var st = document.createElement('style');
    st.setAttribute('data-i14', '1');
    st.textContent = 'body.constellation-on div#scanner[style*="background:var(--ink)"],body.constellation-on div#scanner[style*="background: var(--ink)"]{background:var(--ink)!important}';
    (document.head || document.documentElement).appendChild(st);
  })();

  /* ---------------- vídeos ---------------- */

  function wireFigure(fig) {
    if (!fig || fig.dataset.i14w) return;
    fig.dataset.i14w = '1';
    fig.style.pointerEvents = 'auto';
    var downPaused = null;
    fig.addEventListener('mousedown', function () {
      var v = fig.querySelector('video');
      if (v) downPaused = v.paused;
    }, true);
    fig.addEventListener('click', function (e) {
      var v = fig.querySelector('video');
      if (!v || downPaused === null) return;
      if (e.target && e.target.closest && e.target.closest('a,button,input,select,textarea')) return;
      var r = v.getBoundingClientRect();
      var y = e.clientY - r.top;
      if (y < 0 || y > r.height - 48) return; // zona de la barra de controles: la gestiona el navegador
      setTimeout(function () {
        if (v.paused === downPaused) { // el clic nativo no cambió nada: lo hacemos nosotros
          if (v.paused) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
          else v.pause();
        }
        downPaused = null;
      }, 120);
    }, true);
  }

  function fixVideo(v) {
    if (!v) return;
    try { v.setAttribute('controls', ''); } catch (e) {}
    v.controls = true;
    if (v.getAttribute('preload') === 'none') v.setAttribute('preload', 'metadata');
    try { v.playsInline = true; } catch (e) {}
    v.style.pointerEvents = 'auto';
    if (!v.style.position) v.style.position = 'relative';
    if (!v.style.zIndex) v.style.zIndex = '1';
  }

  function findFigure(capText) {
    var caps = $all('figcaption');
    for (var i = 0; i < caps.length; i++) {
      if ((caps[i].textContent || '').indexOf(capText) >= 0) return caps[i].closest('figure');
    }
    return null;
  }

  function buildFigure(src, poster, capText, darkCap) {
    var fig = document.createElement('figure');
    fig.setAttribute('data-gsap', '1');
    fig.setAttribute('data-i14', '1');
    var v = document.createElement('video');
    v.setAttribute('controls', '');
    v.setAttribute('preload', 'metadata');
    v.setAttribute('playsinline', '');
    v.setAttribute('src', src);
    v.setAttribute('poster', poster);
    v.setAttribute('width', '1280');
    v.setAttribute('height', '720');
    v.style.cssText = 'display:block;width:100%;max-width:860px;height:auto;background:#0d1210';
    fig.appendChild(v);
    var cap = document.createElement('figcaption');
    cap.style.cssText = 'margin-top:10px;font-size:13px;line-height:1.5;color:' + (darkCap ? 'color-mix(in srgb, var(--ink) 72%, transparent)' : 'var(--color-accent-100)');
    var s1 = document.createElement('span');
    s1.textContent = capText;
    cap.appendChild(s1);
    cap.appendChild(document.createTextNode(' '));
    var s2 = document.createElement('span');
    s2.style.cssText = 'border:1px solid ' + (darkCap ? 'var(--coral)' : 'var(--color-accent-400)') + ';padding:1px 6px;font-size:11px;letter-spacing:0.08em';
    s2.textContent = 'SIM';
    cap.appendChild(s2);
    fig.appendChild(cap);
    return fig;
  }

  function ensureVideos() {
    // Altman: está en la plantilla de Finance; si el runtime lo dejó sin controles, se los devolvemos.
    var av = $('video[src*="altman-z"]');
    if (av) {
      fixVideo(av);
      var afig = av.closest ? av.closest('figure') : null;
      if (afig) wireFigure(afig);
    } else {
      var afig2 = findFigure('Altman Z-score · how five ratios combine');
      if (afig2) {
        var v2 = afig2.querySelector('video');
        if (v2) fixVideo(v2);
        wireFigure(afig2);
      } else if (document.getElementById('scanner') && !$('figure[data-i14="altman"]')) {
        var nf = buildFigure('assets/videos/altman-z.mp4', 'assets/videos/altman-z-poster.jpg', ALTMAN_CAP, true);
        nf.setAttribute('data-i14', 'altman');
        nf.style.cssText = 'margin:0;border-top:1px solid color-mix(in srgb, var(--paper) 16%, transparent);padding:24px 0 0';
        document.getElementById('scanner').insertAdjacentElement('afterend', nf);
        wireFigure(nf);
      }
    }
    // DCF: la plantilla la trae dentro de #model, tras la rejilla; el runtime no la renderiza.
    var dv = $('video[src*="dcf-sensitivity"]');
    if (dv) {
      fixVideo(dv);
      var dfig = dv.closest ? dv.closest('figure') : null;
      if (dfig) wireFigure(dfig);
      return;
    }
    if ($('figure[data-i14="dcf"]')) return;
    var hist = $('.i12-hist');
    var grid = $('.i5-grid');
    if (!hist && !grid) return;
    var fig = buildFigure('assets/videos/dcf-sensitivity.mp4', 'assets/videos/dcf-sensitivity-poster.jpg', DCF_CAP, false);
    fig.setAttribute('data-i14', 'dcf');
    fig.style.cssText = 'margin:0 0 40px;border:1px solid var(--color-accent-700);padding:16px';
    if (hist) hist.insertAdjacentElement('beforebegin', fig);
    else { var anchor = grid.closest ? (grid.closest('[data-chart]') || grid) : grid; anchor.insertAdjacentElement('afterend', fig); }
    wireFigure(fig);
  }

  /* ---------------- reveals que se quedan atascados ---------------- */
  var stuckSince = new WeakMap();
  function repairReveals() {
    var vh = window.innerHeight || 800, now = Date.now();
    var els = document.querySelectorAll('[data-reveal], figure[data-gsap], [data-choreo]');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      if (!el.isConnected) continue;
      var r = el.getBoundingClientRect();
      var choreo = el.hasAttribute('data-choreo') && !el.hasAttribute('data-reveal');
      var limit = choreo ? vh * 0.38 : (el.tagName === 'FIGURE' ? vh * 0.88 : vh * 0.95);
      if (r.bottom <= 0 || r.top > limit) { stuckSince.delete(el); continue; }
      var op = 1;
      try { op = parseFloat(window.getComputedStyle(el).opacity); } catch (e) {}
      if (!(op < 0.9)) { stuckSince.delete(el); continue; }
      var first = stuckSince.get(el);
      if (!first) { stuckSince.set(el, now); continue; }
      if (now - first < 2000) continue;
      el.dataset.done = '1';
      el.style.opacity = '';
      try { if (window.gsap) window.gsap.set(el, { opacity: 1, y: 0 }); } catch (e) {}
      try { if (window.ScrollTrigger) window.ScrollTrigger.getAll().forEach(function (st) { if (st.trigger === el) st.kill(); }); } catch (e) {}
      stuckSince.delete(el);
    }
  }

  function refreshTriggers() {
    try { if (window.ScrollTrigger) window.ScrollTrigger.refresh(); } catch (e) {}
  }

  /* ---------------- historial de FIG.2 ---------------- */
  function langIsEN() {
    var btns = document.querySelectorAll('.topbtn');
    for (var i = 0; i < btns.length; i++) {
      if (btns[i].classList.contains('on')) return /EN/i.test(btns[i].textContent || '');
    }
    return true;
  }
  function sweepHist() {
    var en = langIsEN();
    var empties = document.querySelectorAll('.i12-empty');
    for (var i = 0; i < empties.length; i++) {
      var want = en ? EMPTY_EN : EMPTY_ES;
      if (empties[i].textContent !== want) empties[i].textContent = want;
    }
    var strips = document.querySelectorAll('.i12-chips');
    for (var j = 0; j < strips.length; j++) {
      var seenTxt = {};
      var btns = strips[j].querySelectorAll('button');
      for (var k = 0; k < btns.length; k++) {
        var t = (btns[k].textContent || '').replace(/\s+/g, ' ').trim();
        if (seenTxt[t]) btns[k].remove(); else seenTxt[t] = 1;
      }
    }
  }

  /* ---------------- arranque ---------------- */
  var lastRun = 0;
  function runAll() {
    ensureVideos(); sweepHist(); repairReveals();
  }
  function schedule() {
    var now = Date.now();
    if (now - lastRun < 200) return;
    lastRun = now;
    setTimeout(runAll, 60);
  }
  function start() {
    runAll();
    if ('MutationObserver' in window) {
      var mo = new MutationObserver(function () { schedule(); });
      mo.observe(document.documentElement, { childList: true, subtree: true });
    }
    window.addEventListener('hashchange', function () {
      setTimeout(function () { runAll(); refreshTriggers(); }, 700);
      setTimeout(runAll, 1600);
    });
    window.addEventListener('popstate', function () { setTimeout(runAll, 700); });
    window.addEventListener('scroll', function () { schedule(); }, { passive: true });
    setInterval(runAll, 700);
    setTimeout(refreshTriggers, 1200);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
