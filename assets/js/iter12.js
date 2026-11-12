/* Iteración 12 — Límites de la Iteración 11, rango del modelo y escenario compartible.
   (a) Historial sin duplicados: limpia el array guardado al cargar, envuelve localStorage.setItem
       para 'i12-hist' (nunca escribe un escenario ya guardado) y elimina los chips duplicados del DOM.
   (b) Aviso inferior legible a 390px: en pantallas angostas el texto pasa a dos líneas, sin recorte.
   (c) Rango del modelo extendido a WACC 7,5–10,5 % y crecimiento 3,0–6,0 %: las celdas de la rejilla
       que antes eran inalcanzables (fila WACC 10,5 %) ahora se aplican por la vía directa de
       __i6Model/__i6rebuild (la guardia de applyModel6 en constellation.js las rechaza). Las celdas
       fuera del rango nuevo (p. ej. WACC 11,5 %) quedan marcadas como referencia y su clic no reconstruye.
       Al arrancar, un modelo guardado fuera del rango viejo se reaplica (la validación de arranque
       de constellation.js lo rechaza) y los deslizadores suben su máximo.
   WOW: «Compartir escenario» — un botón en FIG.2 copia un enlace con ?w=&g= que arranca el modelo
       en ese escenario exacto. */
(function () {
  'use strict';
  if (window.__i13) return; window.__i13 = true;

  var WMIN = 7.5, WMAX = 10.5, GMIN = 3, GMAX = 6;
  var OWMIN = 7.5, OWMAX = 9.5, OGMIN = 3, OGMAX = 5;

  function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
  function round1(v) { return Math.round(v * 10) / 10; }
  function inRange(w, g) { return w >= WMIN && w <= WMAX && g >= GMIN && g <= GMAX; }
  function inOldRange(w, g) { return w >= OWMIN && w <= OWMAX && g >= OGMIN && g <= OGMAX; }

  /* Estilo de la Iteración 12. */
  var st = document.createElement('style');
  st.className = 'constellation-iter13';
  st.textContent =
    '@media (max-width:560px){' +
    'html,body{overflow-x:clip!important;}' +
    '#constellation-cue{white-space:normal!important;text-overflow:clip!important;overflow:visible!important;line-height:1.5!important;}' +
    '}' +
    '.i12-ref{opacity:.55!important;border-style:dashed!important;cursor:not-allowed!important;}' +
    '.i12-ref-flash{outline:2px solid #C9A227!important;}' +
    '.i12-share{margin:10px 0 0;display:flex;flex-wrap:wrap;gap:8px;align-items:center;}' +
    '.i12-share-btn{font:inherit;background:#0D1210;color:#E5EAE4;border:1px solid #C9A227;padding:8px 12px;cursor:pointer;letter-spacing:.08em;text-transform:uppercase;}' +
    '.i12-share-btn:hover{border-color:#E5EAE4;}' +
    '.i12-share-out{font-size:12px;color:#C9A227;word-break:break-all;}';
  document.head.appendChild(st);

  /* (a) Historial sin duplicados. */
  function dedupeHist(arr) {
    var seen = {}, out = [];
    for (var i = 0; i < arr.length; i++) {
      var h = arr[i];
      if (!h || !isFinite(h.w) || !isFinite(h.g)) continue;
      var s = h.w + '|' + h.g;
      if (seen[s]) continue;
      seen[s] = 1;
      out.push(h);
    }
    return out.slice(0, 6);
  }
  function cleanStoredHist() {
    try {
      var raw = localStorage.getItem('i12-hist');
      if (!raw) return;
      var arr = JSON.parse(raw);
      if (!Array.isArray(arr)) return;
      var clean = dedupeHist(arr);
      if (JSON.stringify(clean) !== JSON.stringify(arr)) {
        localStorage.setItem('i12-hist', JSON.stringify(clean));
      }
    } catch (e) {}
  }
  cleanStoredHist();
  var origSetItem = Storage.prototype.setItem;
  Storage.prototype.setItem = function (k, v) {
    if (k === 'i12-hist') {
      try {
        var arr = JSON.parse(v);
        if (Array.isArray(arr)) v = JSON.stringify(dedupeHist(arr));
      } catch (e) {}
    }
    return origSetItem.call(this, k, v);
  };
  function dedupeChipsDom() {
    var box = document.querySelector('.i12-chips');
    if (!box) return;
    var seen = {};
    var btns = box.querySelectorAll('button');
    for (var i = 0; i < btns.length; i++) {
      var t = (btns[i].textContent || '').replace(/\s+/g, ' ').trim();
      if (seen[t]) { btns[i].remove(); } else { seen[t] = 1; }
    }
  }

  /* (c) Rango extendido del modelo. */
  function sliderEls() {
    return {
      w: document.querySelector('[data-i6-w]'),
      g: document.querySelector('[data-i6-g]')
    };
  }
  function raiseSliderMaxes() {
    var s = sliderEls();
    if (s.w) {
      if (s.w.max !== '10.5') s.w.max = '10.5';
      if (s.w.getAttribute('max') !== '10.5') s.w.setAttribute('max', '10.5');
    }
    if (s.g) {
      if (s.g.max !== '6') s.g.max = '6';
      if (s.g.getAttribute('max') !== '6') s.g.setAttribute('max', '6');
    }
  }
  function syncSliderInputs() {
    var M = window.__i6Model;
    if (!M) return;
    var s = sliderEls();
    if (s.w) s.w.value = M.w;
    if (s.g) s.g.value = M.g;
    var wo = document.querySelector('[data-i6-wo]');
    var go = document.querySelector('[data-i6-go]');
    if (wo) wo.textContent = M.w.toFixed(1) + '%';
    if (go) go.textContent = M.g.toFixed(1) + '%';
  }
  function applyModel13(w, g) {
    var M = window.__i6Model;
    if (!M || !isFinite(w) || !isFinite(g)) return false;
    w = round1(clamp(w, WMIN, WMAX));
    g = round1(clamp(g, GMIN, GMAX));
    M.w = w; M.g = g;
    try { localStorage.setItem('i6-model', JSON.stringify({ w: w, g: g })); } catch (e) {}
    raiseSliderMaxes();
    try { if (window.__i6controls) window.__i6controls(); } catch (e) {}
    try { if (window.__i6rebuild) window.__i6rebuild(); } catch (e) {}
    try { if (window.__i7ticket) window.__i7ticket(); } catch (e) {}
    syncSliderInputs();
    return true;
  }

  var interacted13 = false;
  var dragging13 = false;
  document.addEventListener('pointerdown', function (e) {
    var s = document.querySelector('.i5-build');
    if (s && e.target && s.contains(e.target)) interacted13 = true;
    if (e.target && e.target.matches && e.target.matches('[data-i6-w], [data-i6-g]')) dragging13 = true;
  }, true);
  document.addEventListener('pointerup', function () { dragging13 = false; }, true);
  document.addEventListener('pointercancel', function () { dragging13 = false; }, true);

  function gridCells13() {
    var sec = document.querySelector('.i5-build');
    if (!sec) return [];
    var g = sec.querySelector('.i5-grid');
    if (!g) return [];
    return Array.prototype.slice.call(g.children).filter(function (c) {
      return /^\s*\$?\d+(\.\d+)?\s*$/.test(c.textContent || '');
    });
  }
  function titleScenario13(title) {
    var m = /WACC\s+(-?[\d.]+)%\s*·\s*growth\s+(-?[\d.]+)%/.exec(title || '');
    if (!m) return null;
    return { w: parseFloat(m[1]), g: parseFloat(m[2]) };
  }
  function refTitle13(sc) {
    return 'Referencia — WACC ' + sc.w.toFixed(1) + '% · growth ' + sc.g.toFixed(1) + '% — fuera del rango del modelo (máx. 10,5% / 6,0%)';
  }
  function rebuildTitle13(sc) {
    return 'Rebuild the memo with WACC ' + sc.w.toFixed(1) + '% · growth ' + sc.g.toFixed(1) + '% — reconstruir con este escenario';
  }
  function markGrid13() {
    var cells = gridCells13();
    cells.forEach(function (c) {
      var sc = titleScenario13(c.title || '');
      if (!sc) return;
      if (inRange(sc.w, sc.g)) {
        c.classList.remove('i12-ref');
        var rt = rebuildTitle13(sc);
        if (c.title !== rt) c.title = rt;
      } else {
        c.classList.add('i12-ref');
        var ft = refTitle13(sc);
        if (c.title !== ft) c.title = ft;
      }
    });
  }
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;
    var cell = t.closest('.i5-grid div');
    if (!cell) return;
    if (!/^\s*\$?\d+(\.\d+)?\s*$/.test(cell.textContent || '')) return;
    var sc = titleScenario13(cell.title || '');
    if (!sc) return;
    if (inOldRange(sc.w, sc.g)) return;
    e.preventDefault();
    e.stopPropagation();
    if (inRange(sc.w, sc.g)) {
      applyModel13(sc.w, sc.g);
    } else {
      cell.classList.add('i12-ref-flash');
      setTimeout(function () { cell.classList.remove('i12-ref-flash'); }, 700);
    }
  }, true);
  document.addEventListener('input', function (e) {
    var t = e.target;
    if (!t || !t.matches) return;
    if (!t.matches('[data-i6-w], [data-i6-g]')) return;
    var s = sliderEls();
    var w = s.w ? parseFloat(s.w.value) : NaN;
    var g = s.g ? parseFloat(s.g.value) : NaN;
    if (!isFinite(w) || !isFinite(g)) return;
    if (!inOldRange(w, g) && inRange(w, g)) {
      e.preventDefault();
      e.stopPropagation();
      applyModel13(w, g);
    }
  }, true);

  /* Arranque: parámetros ?w=&g= de la URL y modelo guardado fuera del rango viejo. */
  var bootApplied13 = false;
  var bootAge13 = 0;
  function pendingBootModel13() {
    try {
      var p = new URLSearchParams(window.location.search);
      var w = parseFloat(p.get('w')), g = parseFloat(p.get('g'));
      if (isFinite(w) && isFinite(g)) return { w: w, g: g };
    } catch (e) {}
    try {
      var raw = localStorage.getItem('i6-model');
      var s = raw ? JSON.parse(raw) : null;
      if (s && isFinite(s.w) && isFinite(s.g)) {
        if (!inOldRange(s.w, s.g) && inRange(s.w, s.g)) return { w: s.w, g: s.g };
      }
    } catch (e) {}
    return null;
  }
  function tryBootApply13() {
    if (bootApplied13) return;
    var M = window.__i6Model;
    if (!M) return;
    var cand = pendingBootModel13();
    if (!cand) { bootApplied13 = true; return; }
    var cw = round1(clamp(cand.w, WMIN, WMAX)), cg = round1(clamp(cand.g, GMIN, GMAX));
    if (M.w === cw && M.g === cg) { bootApplied13 = true; return; }
    if (interacted13) { bootApplied13 = true; return; }
    var sec = document.querySelector('.i5-build');
    var logEl = sec ? sec.querySelector('.i5-log') : null;
    var lt = logEl ? (logEl.textContent || '') : '';
    if (/Rebuilding|REBUILDING/i.test(lt)) return;
    bootApplied13 = true;
    applyModel13(cw, cg);
  }

  /* WOW: compartir escenario con un enlace que arranca el modelo exacto. */
  function liveModel13() {
    var M = window.__i6Model;
    if (!M) return null;
    return { w: round1(M.w), g: round1(M.g) };
  }
  function shareUrl13() {
    var m = liveModel13();
    if (!m) return null;
    var hash = window.location.hash || '#home';
    return window.location.origin + window.location.pathname + '?w=' + m.w.toFixed(1) + '&g=' + m.g.toFixed(1) + hash;
  }
  function ensureShare13() {
    var hist = document.querySelector('.i12-hist');
    if (!hist) return;
    if (document.querySelector('.i12-share')) return;
    var d = document.createElement('div');
    d.className = 'i12-share';
    d.innerHTML = '<button type="button" class="i12-share-btn">Compartir escenario · Share scenario</button><output class="i12-share-out" aria-live="polite"></output>';
    hist.insertAdjacentElement('afterend', d);
    var btn = d.querySelector('.i12-share-btn');
    var out = d.querySelector('.i12-share-out');
    btn.addEventListener('click', function () {
      var url = shareUrl13();
      if (!url) { out.textContent = 'Modelo no disponible todavía.'; return; }
      var done = function (ok) {
        out.textContent = (ok ? 'Enlace copiado · Link copied — ' : 'Copia este enlace · Copy this link — ') + url;
        btn.textContent = ok ? 'Enlace copiado ✓ · Link copied' : 'Compartir escenario · Share scenario';
        setTimeout(function () { btn.textContent = 'Compartir escenario · Share scenario'; }, 3000);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(function () { done(true); }, function () { done(false); });
      } else {
        try {
          var ta = document.createElement('textarea');
          ta.value = url; document.body.appendChild(ta); ta.select();
          var ok = document.execCommand('copy');
          document.body.removeChild(ta);
          done(!!ok);
        } catch (e) { done(false); }
      }
    });
  }

  /* Barrido de la Iteración 12. */
  function sweep13() {
    raiseSliderMaxes();
    markGrid13();
    dedupeChipsDom();
    ensureShare13();
    if (!dragging13) syncSliderInputs();
    if (!bootApplied13) {
      bootAge13++;
      if (bootAge13 <= 18) tryBootApply13();
      else bootApplied13 = true;
    }
  }
  setInterval(sweep13, 650);
  sweep13();
})();
