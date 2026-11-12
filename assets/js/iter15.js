/* Iteración 15 — FIG.0 compacta y aviso inferior que no pisa el texto.
   Diagnóstico verificado en el sitio en vivo (escritorio 1920×998, 2026-11-12):
   (1) Hueco muerto en FIG.0: entre la caja ESCALATE «Human review» y la rejilla
       de contadores y registro queda una franja vacía de unos 210 px en reposo,
       con solo estrellas. El SVG de FIG.0 (viewBox 1000×290) mide unos 331 px de
       alto, pero su contenedor queda mucho más alto y la rejilla queda lejos de
       las etapas. No hay pin de FIG.0 que romper: la Iteración 4 usa scrub de
       ScrollTrigger sin pin, deliberadamente. No se añade contenido nuevo: la
       rejilla sube hasta quedar a unos 12 px del contenedor del SVG. La
       corrección se mide en vivo (getBoundingClientRect) en cada pasada, así que
       vale en escritorio y a 390 px, donde las 5 etapas se apilan (viewBox
       400×780 de la Iteración 7): si no hay hueco, no se aplica nada.
   (2) Aviso inferior: el desvanecimiento de la Iteración 10 (cueCheck11, en
       constellation.js) solo oculta el aviso cuando cubre contenido interactivo
       (a, button, input…); el registro de FIG.0 es texto, así que el aviso se
       cruzaba con líneas como «Vendor payment · $4,200» y «EXECUTED». Esta capa
       añade una clase propia (i15-cue-hide) que también se activa cuando el aviso
       cubre glifos de texto, detectados con caretRangeFromPoint en varios puntos
       de la banda del aviso. No toca la lógica de la Iteración 10: cada clase
       oculta el aviso por su lado.
   (3) «Opportunities» bajo el ticker: es la última línea del párrafo del héroe
       («open to finance & AI opportunities.») deslizándose bajo el ticker fijo al
       hacer scroll; el texto está completo en el DOM y se lee entero. No es un
       defecto del sitio: no requiere cambio de código.
   (4) Mancha oscura en la foto: en el render en vivo no hay ningún blob radial
       detrás de FIG.0 (solo el canvas de estrellas fijo y los gradientes tenues de
       FIG.1); era el reflejo en el monitor. No requiere cambio de código.
   Como el runtime (dc-runtime.js) es generado, sin editar, la reparación vive
   aquí, en la capa de iteración, igual que las Iteraciones 11–14. */
(function () {
  'use strict';
  if (window.__i15) return; window.__i15 = true;

  /* ---------- (1) Compactar FIG.0: subir la rejilla hasta el SVG ---------- */
  var GAP_MAX = 12; /* hueco que queda entre el contenedor del SVG y la rejilla */
  var SLACK = 24;   /* margen para el scrub vertical de GSAP sobre el SVG (±18 px) */
  var MIN_EXCESS = 24; /* solo se ciñe el contenedor si sobra más que esto */

  function figParts15() {
    var hero = document.querySelector('section[data-screen-label="Hero C"]');
    if (!hero) return null;
    var svg = hero.querySelector('svg');
    if (!svg || !svg.parentElement) return null;
    var wrap = svg.parentElement;
    var fig = wrap.parentElement;
    if (!fig) return null;
    var grid = null;
    var btns = hero.querySelectorAll('button');
    for (var i = 0; i < btns.length; i++) {
      var t = (btns[i].textContent || '').trim();
      if (/^propos/i.test(t)) {
        var col = btns[i].parentElement;
        if (col && col.parentElement && col.parentElement.parentElement === fig) grid = col.parentElement;
        break;
      }
    }
    if (!grid) {
      var kids = fig.children;
      for (var j = 0; j < kids.length; j++) {
        if (kids[j] !== wrap) { grid = kids[j]; break; }
      }
    }
    if (!grid || wrap.contains(grid)) return null;
    return { svg: svg, wrap: wrap, grid: grid };
  }

  function compactFig15() {
    var p;
    try { p = figParts15(); } catch (e) { return; }
    if (!p) return;
    var svgR, wrapR, gridR;
    /* Se mide el tamaño natural: se sueltan primero los ajustes propios para
       que la medición no se mida a sí misma y la corrección no oscile. */
    try {
      p.wrap.style.height = '';
      p.wrap.style.overflowY = '';
      p.grid.style.marginTop = '';
      svgR = p.svg.getBoundingClientRect();
      wrapR = p.wrap.getBoundingClientRect();
    } catch (e2) { return; }
    if (!svgR.height || !wrapR.height) return;
    /* (a) El contenedor del SVG se ciñe a la altura del SVG (más el margen del
       scrub). El contenido —etapas, ESCALATE, línea y fichas— queda intacto. */
    var excess = wrapR.height - svgR.height;
    if (excess > MIN_EXCESS) {
      p.wrap.style.height = Math.round(svgR.height + SLACK) + 'px';
      p.wrap.style.overflowY = 'hidden';
    }
    /* (b) Lo que quede entre el contenedor del SVG y la rejilla se cierra
       subiendo la rejilla con un margen negativo medido en vivo. */
    try {
      wrapR = p.wrap.getBoundingClientRect();
      gridR = p.grid.getBoundingClientRect();
    } catch (e3) { return; }
    if (!gridR.height) return;
    var gap = gridR.top - wrapR.bottom;
    if (gap > GAP_MAX) {
      p.grid.style.marginTop = '-' + Math.round(gap - GAP_MAX) + 'px';
    }
  }

  /* ---------- (2) El aviso también se desvanece sobre texto ---------- */
  var st15 = document.createElement('style');
  st15.id = 'constellation-iter15';
  st15.textContent = '#constellation-cue.i15-cue-hide{opacity:0!important;pointer-events:none!important;}';
  document.head.appendChild(st15);

  function pointOverText15(x, y) {
    if (!document.caretRangeFromPoint) return false;
    var rg = null;
    try { rg = document.caretRangeFromPoint(x, y); } catch (e) { return false; }
    if (!rg || !rg.startContainer || rg.startContainer.nodeType !== 3) return false;
    if (!/\S/.test(rg.startContainer.textContent || '')) return false;
    /* El punto debe caer dentro del renglón del glifo, no solo cerca de él. */
    var rect = null;
    try { rect = rg.getBoundingClientRect(); } catch (e2) { return false; }
    if (!rect || !rect.height) return false;
    return y >= rect.top - 1 && y <= rect.bottom + 1 && x >= rect.left - 4 && x <= rect.right + 4;
  }

  function cueCheck15() {
    var cue = document.getElementById('constellation-cue');
    if (!cue) return;
    var r;
    try { r = cue.getBoundingClientRect(); } catch (e) { return; }
    if (!r.width || !r.height) { cue.classList.remove('i15-cue-hide'); return; }
    var xs = [r.left + 8, r.left + r.width * 0.25, r.left + r.width * 0.5, r.left + r.width * 0.75, r.right - 8];
    var ys = [r.top + 3, r.top + r.height / 2, r.bottom - 3];
    var hide = false;
    outer15:
    for (var yi = 0; yi < ys.length; yi++) {
      for (var xi = 0; xi < xs.length; xi++) {
        if (pointOverText15(xs[xi], ys[yi])) { hide = true; break outer15; }
      }
    }
    cue.classList.toggle('i15-cue-hide', hide);
  }

  /* ---------- Arranque y re-medición ---------- */
  function run15() {
    try { compactFig15(); } catch (e) {}
    try { cueCheck15(); } catch (e2) {}
  }
  var raf15 = false;
  function req15() {
    if (raf15) return; raf15 = true;
    requestAnimationFrame(function () { raf15 = false; run15(); });
  }
  window.addEventListener('scroll', req15, { passive: true });
  window.addEventListener('resize', req15);
  window.addEventListener('hashchange', req15);
  setInterval(run15, 400);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run15);
  setTimeout(run15, 300);
  setTimeout(run15, 1200);
  run15();
})();
