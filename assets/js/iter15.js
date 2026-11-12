/* Iteración 15 — FIG.0 compacta y aviso inferior que no pisa el texto.
   Diagnóstico verificado en el sitio en vivo (escritorio 1920×998, 2026-11-12):
   (1) Hueco muerto en FIG.0: entre la caja ESCALATE «Human review» y la rejilla
   de contadores y registro queda una franja vacía (unos 210 px en reposo en el
   sitio en vivo; unos 520 px en la vista previa, donde el borde inferior de
   ESCALATE está en y≈363 y el de la envoltura en y≈885, sin nada entre
   ambos salvo estrellas). La causa es el pin de ScrollTrigger: el padre del
   SVG es un DIV.pin-spacer con altura en línea de unos 651 px mientras el
   SVG mide 331 px; ese espaciador guarda el recorrido para fijar la figura
   mientras se desplaza. Además, la rejilla NO es hija del contenedor de la
   figura (que solo guarda el pin-spacer), así que la búsqueda antigua
   devolvía null y la compactación no se aplicaba nunca. La corrección busca
   la rejilla por el botón Propose dentro del héroe y ciñe el pin-spacer a la
   parte baja del contenido visible, dejando 60 px de recorrido para el pin,
   de modo que el pin sigue funcionando (con un recorrido corto) y el registro
   sube junto a las cajas. No se añade contenido nuevo. Vale en escritorio y
   a 390 px, donde las 5 etapas se apilan (viewBox 400×780 de la
   Iteración 7): si no hay hueco, no se aplica nada.
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
(function() {
  'use strict';
  if (window.__i15) return; window.__i15 = true;

  /* ---------- (1) Compactar FIG.0: subir la rejilla hasta el SVG ---------- */
  var GAP_MAX = 12; /* hueco que queda entre el contenedor del SVG y la rejilla */
  var SLACK = 24; /* margen para el scrub vertical de GSAP sobre el SVG (±18 px) */
  var MIN_EXCESS = 24; /* solo se ciñe el contenedor si sobra más que esto */
  var PIN_ROOM = 60; /* recorrido que se deja al pin al ceñir el pin-spacer */

  /* El SVG de FIG.0 es el que contiene la etiqueta «Human review»: dentro de
     Hero C puede haber otros SVG (iconos) y si se toma el primero, la medida
     sale del elemento equivocado y la tapa no se aplica. */
  function pickSvg15(hero) {
    var svgs = hero.querySelectorAll('svg');
    if (!svgs || !svgs.length) return null;
    var k, m, ts;
    for (k = 0; k < svgs.length; k++) {
      ts = svgs[k].querySelectorAll('text');
      for (m = 0; m < ts.length; m++) {
        if ((ts[m].textContent || '').trim() === 'Human review') return svgs[k];
      }
    }
    for (k = 0; k < svgs.length; k++) {
      if (svgs[k].querySelector('text')) return svgs[k];
    }
    return svgs[0];
  }

  function figParts15() {
    var hero = document.querySelector('section[data-screen-label="Hero C"]');
    if (!hero) return null;
    var svg = pickSvg15(hero);
    if (!svg || !svg.parentElement) return null;
    var wrap = svg.parentElement; /* el pin-spacer de ScrollTrigger */
    var fig = wrap.parentElement;
    if (!fig) return null;
    /* La rejilla es hermana del contenedor de la figura, no hija: el
       contenedor solo guarda el pin-spacer. Se busca por el botón Propose
       dentro del héroe. */
    var grid = null;
    var btns = hero.querySelectorAll('button');
    for (var i = 0; i < btns.length; i++) {
      var t = (btns[i].textContent || '').trim();
      if (/^propos/i.test(t)) {
        var node = btns[i].parentElement;
        while (node && node !== hero) {
          var cs15 = null;
          try { cs15 = window.getComputedStyle(node); } catch (e6) {}
          if (cs15 && cs15.display === 'grid' &&
              (node.textContent || '').indexOf('THE MODEL PROPOSES') >= 0) { grid = node; break; }
          node = node.parentElement;
        }
        if (!grid) {
          var col = btns[i].parentElement;
          if (col && col.parentElement) grid = col.parentElement;
        }
        break;
      }
    }
    if (!grid || grid === wrap || wrap.contains(grid)) return null;
    return { svg: svg, wrap: wrap, grid: grid };
  }

  /* Parte baja del contenido VISIBLE del SVG: la más baja de las etiquetas
     de texto renderizadas (con su grupo, que incluye la caja) más 10 unidades.
     No se usa el getBBox del SVG entero: su rectángulo incluye contenido que no
     se ve bajo ESCALATE y con él la tapa no cerraba el hueco en la vista
     previa (la envoltura medía unos 830 px con el contenido hasta ~360 px). */
  function contentBottom15(svg) {
    var maxB = null;
    var ts, i, t, b, bot, par, gb;
    try { ts = svg.querySelectorAll('text'); } catch (e) { return null; }
    for (i = 0; i < ts.length; i++) {
      t = ts[i];
      try {
        if (!t.getClientRects || !t.getClientRects().length) continue;
        b = t.getBBox();
      } catch (e2) { continue; }
      if (!b || !(b.height > 0) || !isFinite(b.y) || !isFinite(b.height)) continue;
      bot = b.y + b.height;
      par = t.parentElement;
      if (par && par !== svg && par.getBBox) {
        try {
          gb = par.getBBox();
          if (gb && gb.height > 0 && gb.height <= 220 && isFinite(gb.y) && isFinite(gb.height)) {
            if (gb.y + gb.height > bot) bot = gb.y + gb.height;
          }
        } catch (e3) {}
      }
      if (maxB === null || bot > maxB) maxB = bot;
    }
    return maxB;
  }

  function compactFig15() {
    var p;
    try { p = figParts15(); } catch (e) { return; }
    if (!p) return;
    var svgR, wrapR, gridR;
    /* Se mide el tamaño natural: se sueltan primero los ajustes propios para
       que la medición no se mida a sí misma y la corrección no oscile. */
    /* (0) En escritorio el viewBox de FIG.0 es 1000×290; si en vivo llega más
       alto, se restablece antes de medir, para que el SVG no arrastre hueco. */
    try {
      if (window.innerWidth >= 900) {
        var vb0 = p.svg.viewBox && p.svg.viewBox.baseVal;
        if (vb0 && vb0.width === 1000 && vb0.height > 290) {
          p.svg.setAttribute('viewBox', '0 0 1000 290');
        }
      }
    } catch (e0) { /* se sigue midiendo con el viewBox que haya */ }
    try {
      p.wrap.style.height = '';
      p.wrap.style.overflowY = '';
      p.grid.style.marginTop = '';
      svgR = p.svg.getBoundingClientRect();
      wrapR = p.wrap.getBoundingClientRect();
    } catch (e2) { return; }
    if (!svgR.height || !wrapR.height) return;
    /* (a) El pin-spacer se ciñe a la parte baja del contenido VISIBLE (la
       última etiqueta, con su caja), más el margen del scrub y 60 px de
       recorrido para el pin: si el SVG es más alto que su contenido, el hueco
       queda dentro del pin-spacer y la tapa anterior no lo tocaba. */
    var targetH = svgR.height;
    var cb = null;
    try { cb = contentBottom15(p.svg); } catch (e5) {}
    if (cb !== null && isFinite(cb)) {
      var vbW = (p.svg.viewBox && p.svg.viewBox.baseVal && p.svg.viewBox.baseVal.width) || 1000;
      var scale = svgR.width / vbW;
      if (scale > 0) targetH = (cb + 10) * scale;
    } else {
      try {
        var bb = p.svg.getBBox();
        var vbH = (p.svg.viewBox && p.svg.viewBox.baseVal && p.svg.viewBox.baseVal.height) || 0;
        var vbW2 = (p.svg.viewBox && p.svg.viewBox.baseVal && p.svg.viewBox.baseVal.width) || 1000;
        var scale2 = svgR.width / vbW2;
        if (bb && bb.height > 0 && scale2 > 0) {
          var bbBot = bb.y + bb.height;
          if (vbH > 0 && bbBot > vbH) bbBot = vbH;
          targetH = bbBot * scale2;
        }
      } catch (e4) { /* se usa la altura del SVG */ }
    }
    var excess = wrapR.height - (targetH + SLACK + PIN_ROOM);
    if (excess > MIN_EXCESS) {
      p.wrap.style.height = Math.round(targetH + SLACK + PIN_ROOM) + 'px';
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
