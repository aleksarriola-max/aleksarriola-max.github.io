/* Iteración 13 — Arreglos de la Iteración 12 (revisión pre-merge).
   (1) Guardia de la fila de referencia en la capa correcta: el manejador nativo
   de la rejilla vive en captura sobre `document` y se registró antes que el de
   la Iteración 12, así que su stopPropagation llegaba tarde. Esta capa
   intercepta en captura sobre `window` (antes que cualquier listener de
   documento) y calcula el escenario por POSICIÓN de la celda — igual que
   gridPick11 —, no por su título. La celda fuera del rango nuevo
   [7,5–10,5] × [3,0–6,0] nunca reconstruye; la celda dentro del rango nuevo
   pero fuera del viejo (p. ej. WACC 10,5 %) se aplica directamente aquí y se
   frena el evento, para que el tope nativo (9,5 %) no la recorte.
   (2) El título de la fila de referencia ya no parpadea: un MutationObserver
   vigila el atributo `title` de las celdas y lo devuelve al texto de
   referencia en la misma microtarea, antes del siguiente pintado.
   (3) Los pulgares siguen al modelo vivo en cualquier rango: syncThumb10
   (Iteración 9) reescribe los pulgares a 8,5/4,0 en cada mutación del DOM
   porque su modelo solo acepta el rango viejo. Un observador de esta capa
   corre después de él en el mismo lote de mutaciones y los devuelve al
   modelo vivo, escribiendo solo la propiedad `value` (sin tocar el
   atributo), para no realimentar el observador.
   (4) El historial nunca graba ni muestra entradas nulas: la envoltura de
   setItem de la Iteración 12 se refuerza — las entradas con fv o mos nulos
   se descartan ANTES de dedupar, así una entrada nula nunca desplaza a una
   buena del mismo escenario — y el array guardado se repara al cargar.
   (5) La tira de historial sobrevive a la navegación interna: cuando la SPA
   remonta Inicio y la tira queda vacía (renderHist12 no repinta porque su
   firma no cambia), esta capa la rellena desde el array guardado y atiende
   sus clics.
   (6) El tooltip del mapa tiene fondo oscuro sólido: el brillo de hover del
   punto ya no lava el texto. */
(function () {
  'use strict';
   if (window.__i14) return; window.__i14 = true;
  var WMIN = 7.5, WMAX = 10.5, GMIN = 3, GMAX = 6;
  var OWMIN = 7.5, OWMAX = 9.5, OGMIN = 3, OGMAX = 5;
  var CSS14 = [
    '.cm-desc{background:rgba(13,18,16,.96)!important;border:1px solid rgba(var(--const-accent-rgb),.55)!important;border-radius:8px!important;padding:5px 10px!important;z-index:6!important;box-shadow:0 4px 18px rgba(0,0,0,.55)!important;color:#EDF3EB!important;}',
    '.i12-ref-flash{outline:2px dashed #E08E7E!important;outline-offset:2px!important;}'
  ].join('\n');
  var st14 = document.createElement('style');
  st14.id = 'constellation-iter14';
  st14.textContent = CSS14;
  document.head.appendChild(st14);
  function clamp14(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function round114(v) { return Math.round(v * 10) / 10; }
  function liveModel14() {
    var m = window.__i6Model;
    if (!m || !isFinite(+m.w) || !isFinite(+m.g)) return { w: 8.5, g: 4.0 };
    return { w: round114(+m.w), g: round114(+m.g) };
  }
  function isNumCell14(cell) { return /^\s*\$?\d+(\.\d+)?\s*$/.test(cell.textContent || ''); }
  function pickFromPos14(cell) {
    var grid = cell.parentElement;
    if (!grid || !grid.classList || !grid.classList.contains('i5-grid')) return null;
    var kids = grid.children, idx = -1, i;
    for (i = 0; i < kids.length; i++) { if (kids[i] === cell) { idx = i; break; } }
    if (idx < 0) return null;
    var row = Math.floor(idx / 4), col = idx % 4;
    if (row < 1 || col < 1) return null;
    var m = liveModel14();
    return { w: round114(m.w + (row - 2)), g: round114(m.g + (col - 2)) };
  }
  function outOfRange14(sc) { return sc.w < WMIN || sc.w > WMAX || sc.g < GMIN || sc.g > GMAX; }
  function inOldRange14(sc) { return sc.w >= OWMIN && sc.w <= OWMAX && sc.g >= OGMIN && sc.g <= OGMAX; }
  function refTitle14(sc) { return 'Referencia — WACC ' + sc.w.toFixed(1) + '% · growth ' + sc.g.toFixed(1) + '% — fuera del rango del modelo (máx. 10,5% / 6,0%)'; }
  function raiseSliderMaxes14() {
    var ws = document.querySelectorAll('[data-i6-w]'), gs = document.querySelectorAll('[data-i6-g]');
    for (var i = 0; i < ws.length; i++) { if (ws[i].getAttribute('max') !== '10.5') ws[i].setAttribute('max', '10.5'); }
    for (var j = 0; j < gs.length; j++) { if (gs[j].getAttribute('max') !== '6') gs[j].setAttribute('max', '6'); }
  }
  function syncThumbs14() {
    var M = liveModel14();
    var ws = document.querySelectorAll('[data-i6-w]'), gs = document.querySelectorAll('[data-i6-g]');
    for (var i = 0; i < ws.length; i++) { if (Math.abs(parseFloat(ws[i].value) - M.w) > 0.001) ws[i].value = String(M.w); }
    for (var j = 0; j < gs.length; j++) { if (Math.abs(parseFloat(gs[j].value) - M.g) > 0.001) gs[j].value = String(M.g); }
    var wos = document.querySelectorAll('[data-i6-wo]'), gos = document.querySelectorAll('[data-i6-go]');
    for (var k = 0; k < wos.length; k++) { if (wos[k].textContent !== M.w.toFixed(1) + '%') wos[k].textContent = M.w.toFixed(1) + '%'; }
    for (var l = 0; l < gos.length; l++) { if (gos[l].textContent !== M.g.toFixed(1) + '%') gos[l].textContent = M.g.toFixed(1) + '%'; }
    if (ws.length || gs.length) raiseSliderMaxes14();
  }
  function applyScenario14(w, g) {
    var M = window.__i6Model || (window.__i6Model = { w: 8.5, g: 4.0, price: 186 });
    w = round114(clamp14(w, WMIN, WMAX)); g = round114(clamp14(g, GMIN, GMAX));
    M.w = w; M.g = g;
    try { localStorage.setItem('i6-model', JSON.stringify({ w: w, g: g })); } catch (e) {}
    raiseSliderMaxes14();
    if (window.__i6controls) { try { window.__i6controls(); } catch (e2) {} }
    if (window.__i6rebuild) { try { window.__i6rebuild(); } catch (e3) {} }
    if (window.__i7ticket) { try { window.__i7ticket(); } catch (e4) {} }
    syncThumbs14();
  }
  function flashRef14(cell) {
    cell.classList.add('i12-ref-flash');
    setTimeout(function () { try { cell.classList.remove('i12-ref-flash'); } catch (e) {} }, 700);
  }
  /* (1) Guardia en captura sobre window: corre antes que cualquier listener de `document`. */
  window.addEventListener('click', function (ev) {
    var cell = ev.target && ev.target.closest ? ev.target.closest('.i5-grid div') : null;
    if (!cell) return;
    if (!cell.closest || !cell.closest('.i5-build')) return;
    if (!isNumCell14(cell)) return;
    var pick = pickFromPos14(cell);
    if (!pick) return;
    if (outOfRange14(pick)) {
      ev.preventDefault(); ev.stopPropagation();
      if (ev.stopImmediatePropagation) ev.stopImmediatePropagation();
      flashRef14(cell);
      return;
    }
    if (inOldRange14(pick)) return;
    /* Rango nuevo fuera del viejo: aplicar aquí y frenar el evento para que el tope nativo no recorte. */
    ev.preventDefault(); ev.stopPropagation();
    if (ev.stopImmediatePropagation) ev.stopImmediatePropagation();
    try { applyScenario14(pick.w, pick.g); } catch (e) {}
    cell.classList.add('i11-pick');
    setTimeout(function () { try { cell.classList.remove('i11-pick'); } catch (e2) {} }, 2600);
  }, true);
  /* (2) El título de la celda de referencia, fijado por posición y vigilado. */
  function fixCellTitle14(cell) {
    if (!cell || !cell.classList || cell.classList.contains('h')) return;
    if (!isNumCell14(cell)) return;
    var pick = pickFromPos14(cell);
    if (!pick) return;
    if (outOfRange14(pick)) {
      cell.classList.add('i12-ref');
      var want = refTitle14(pick);
      if (cell.getAttribute('title') !== want) cell.setAttribute('title', want);
    } else if (cell.classList.contains('i12-ref')) {
      cell.classList.remove('i12-ref');
    }
  }
  function markRefCells14() {
    var grid = document.querySelector('.i5-grid');
    if (!grid) return;
    for (var i = 0; i < grid.children.length; i++) fixCellTitle14(grid.children[i]);
  }
  var titleMo14 = null;
  function armTitleObserver14() {
    if (!window.MutationObserver || titleMo14) return;
    titleMo14 = new MutationObserver(function (recs) {
      for (var i = 0; i < recs.length; i++) {
        var t = recs[i].target;
        if (!t || !t.classList) continue;
        var g = t.parentElement;
        if (!g || !g.classList || !g.classList.contains('i5-grid')) continue;
        try { fixCellTitle14(t); } catch (e) {}
      }
    });
    titleMo14.observe(document.documentElement, { attributes: true, attributeFilter: ['title'], subtree: true });
  }
  /* (4)+(5) Historial: entradas limpias, tira que sobrevive a la navegación. */
  function cleanHistArray14(arr) {
    var out = [], seen = {};
    for (var i = 0; i < arr.length; i++) {
      var h = arr[i];
      if (!h || !isFinite(+h.w) || !isFinite(+h.g)) continue;
      if (h.fv == null || h.mos == null) continue;
      var fv = +h.fv, mos = +h.mos;
      if (!isFinite(fv) || !isFinite(mos)) continue;
      var key = round114(+h.w) + '|' + round114(+h.g);
      if (seen[key]) continue;
      seen[key] = 1;
      out.push({ w: round114(+h.w), g: round114(+h.g), fv: fv, mos: mos });
      if (out.length >= 6) break;
    }
    return out;
  }
  function readStoredHist14() {
    try {
      var raw = localStorage.getItem('i12-hist');
      var arr = JSON.parse(raw || 'null');
      return Array.isArray(arr) ? arr : [];
    } catch (e) { return []; }
  }
  function cleanStoredHist14() {
    var raw = readStoredHist14();
    var cleaned = cleanHistArray14(raw);
    if (JSON.stringify(cleaned) !== JSON.stringify(raw)) {
      try { localStorage.setItem('i12-hist', JSON.stringify(cleaned)); } catch (e) {}
    }
    return cleaned;
  }
  /* La envoltura de setItem filtra las nulas ANTES de dedupar (una entrada nula
     nunca desplaza a una buena del mismo escenario). Se instala sobre la
     envoltura de la Iteración 12, que ya dedupa. */
  (function () {
    var origSet = Storage.prototype.setItem;
    if (!origSet || origSet.__i14) return;
    var wrapped = function (key, value) {
      if (key === 'i12-hist') {
        try {
          var arr = JSON.parse(String(value));
          if (Array.isArray(arr)) value = JSON.stringify(cleanHistArray14(arr));
        } catch (e) {}
      }
      return origSet.call(this, key, value);
    };
    wrapped.__i14 = true;
    Storage.prototype.setItem = wrapped;
  })();
  function chipLabel14(h) {
    return '$' + h.fv + ' · ' + h.w.toFixed(1) + '% / ' + h.g.toFixed(1) + '% · MoS ' + h.mos + '%';
  }
  function isNullChip14(b) {
    var t = (b.textContent || '');
    return t.indexOf('—') === 0 || t.indexOf('MoS —') >= 0;
  }
  function cleanChipsDom14() {
    var chips = document.querySelector('.i12-chips');
    if (!chips) return;
    var btns = chips.querySelectorAll('button');
    for (var i = btns.length - 1; i >= 0; i--) {
      if (isNullChip14(btns[i]) && btns[i].parentNode) btns[i].parentNode.removeChild(btns[i]);
    }
  }
  function chipScenario14(b) {
    var w = parseFloat(b.getAttribute('data-w')), g = parseFloat(b.getAttribute('data-g'));
    if (isFinite(w) && isFinite(g)) return { w: w, g: g };
    var t = (b.textContent || '').replace(/,/g, '.');
    var m = /([\d.]+)%\s*\/\s*([\d.]+)%/.exec(t);
    if (!m) return null;
    return { w: parseFloat(m[1]), g: parseFloat(m[2]) };
  }
  function fillChipsIfEmpty14() {
    var chips = document.querySelector('.i12-chips');
    if (!chips) return;
    if (chips.querySelector('button')) return;
    var hist = cleanStoredHist14();
    if (!hist.length) return;
    var empty = chips.querySelector('.i12-empty');
    if (empty && empty.parentNode) empty.parentNode.removeChild(empty);
    var M = liveModel14();
    var html = '';
    for (var i = 0; i < hist.length; i++) {
      var h = hist[i];
      var on = (M.w === h.w && M.g === h.g) ? ' class="on"' : '';
      html += '<button type="button" data-i="' + i + '" data-w="' + h.w.toFixed(1) + '" data-g="' + h.g.toFixed(1) + '"' + on + '>' + chipLabel14(h) + '</button>';
    }
    chips.innerHTML = html;
  }
  function markChipOn14() {
    var chips = document.querySelector('.i12-chips');
    if (!chips) return;
    var M = liveModel14();
    var btns = chips.querySelectorAll('button');
    for (var i = 0; i < btns.length; i++) {
      var sc = chipScenario14(btns[i]);
      if (!sc) continue;
      if (sc.w === M.w && sc.g === M.g) btns[i].classList.add('on');
      else btns[i].classList.remove('on');
    }
  }
  document.addEventListener('click', function (ev) {
    var b = ev.target && ev.target.closest ? ev.target.closest('.i12-chips button') : null;
    if (!b) return;
    var sc = chipScenario14(b);
    if (!sc) return;
    ev.preventDefault(); ev.stopPropagation();
    if (ev.stopImmediatePropagation) ev.stopImmediatePropagation();
    try { applyScenario14(sc.w, sc.g); } catch (e) {}
  }, true);
  /* (3) Los pulgares siguen al modelo vivo: este observador corre después de
     syncThumb10 en el mismo lote de mutaciones (se registró después) y escribe
     solo la propiedad `value`, sin tocar el atributo. */
  var domMo14 = null;
  function armDomObserver14() {
    if (!window.MutationObserver || domMo14) return;
    domMo14 = new MutationObserver(function () {
      try { syncThumbs14(); } catch (e) {}
      try { cleanChipsDom14(); } catch (e2) {}
      try { fillChipsIfEmpty14(); } catch (e3) {}
    });
    domMo14.observe(document.documentElement, { childList: true, subtree: true, attributes: true });
  }
  /* Barrido de respaldo. */
  function sweep14() {
    try { raiseSliderMaxes14(); } catch (e) {}
    try { markRefCells14(); } catch (e) {}
    try { syncThumbs14(); } catch (e) {}
    try { cleanChipsDom14(); } catch (e2) {}
    try { fillChipsIfEmpty14(); } catch (e3) {}
    try { markChipOn14(); } catch (e4) {}
    try { cleanStoredHist14(); } catch (e5) {}
  }
  cleanStoredHist14();
  armTitleObserver14();
  armDomObserver14();
  sweep14();
  setInterval(sweep14, 350);
  window.addEventListener('hashchange', function () { setTimeout(sweep14, 200); setTimeout(sweep14, 800); });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', sweep14);
  else sweep14();
})();
/* Nota de regresión: la guardia if (window.__i14) return; debe ir DENTRO del IIFE — un return a nivel superior es un error de sintaxis en un script clásico y todo el archivo deja de ejecutar. */
