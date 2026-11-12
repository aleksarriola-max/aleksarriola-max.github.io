/* Iteración 11 — Verificación real a 390px, tres pulidos pendientes y un historial de escenarios.
   (a) El tooltip de ORCEN KIT (y de cualquier nodo) ya no se queda en display:none: un barrido
       cada ~800 ms reintenta el clamp sobre los nodos activos y limpia el display rancio.
   (d) La casilla WACC·GROWTH se encoge de fuente (20px -> 14px) hasta caber en una sola línea.
   (i) El title de cada celda de la rejilla se recalcula al hacer clic, sin esperar al siguiente hover.
   (ii) El veredicto refleja el margen corregido: la línea del paso incluye el margen en vivo y la
       marca >=15%, y el texto del veredicto añade "margen corregido: X% (base 24%)" cuando cambia.
   (iii) El aviso fijo inferior tiene inset real en escritorio y ya no se sale por la izquierda a 390px.
   WOW: historial de escenarios del memo en vivo — cada escenario visitado queda como chip y
   tocarlo restaura ese modelo exacto (WACC, growth, valor razonable y margen). */
(function () {
  'use strict';
  if (window.__i12) return; window.__i12 = true;

  var CSS = [
    '#constellation-cue{right:clamp(16px,4vw,64px)!important;max-width:calc(100vw - 32px)!important;overflow:hidden!important;text-overflow:ellipsis!important;}',
    '@media (max-width:900px){.i5-kpi[data-i5="kpi4"] span{font-size:var(--i12-kpi4,20px)!important;}}',
    '.i12-hist{margin:10px 0 0;padding:10px 12px;border:1px solid rgba(146,172,155,.25);background:rgba(13,18,16,.6);border-radius:10px;}',
    '.i12-hist-t{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#92AC9B;margin-bottom:8px;}',
    '.i12-chips{display:flex;gap:8px;overflow-x:auto;padding-bottom:2px;}',
    '.i12-chips button{flex:0 0 auto;background:#1A2B22;color:#E5EAE4;border:1px solid rgba(146,172,155,.35);border-radius:999px;padding:6px 10px;font:12px/1.4 monospace;cursor:pointer;white-space:nowrap;}',
    '.i12-chips button:hover{border-color:#D9B36A;}',
    '.i12-chips button.on{border-color:#D9B36A;color:#D9B36A;background:rgba(217,179,106,.12);}',
    '.i12-empty{font-size:12px;color:rgba(229,234,228,.55);}'
  ].join('\n');
  var st = document.createElement('style'); st.id = 'constellation-iter12'; st.textContent = CSS; document.head.appendChild(st);

  function sec12() { return document.querySelector('.i5-build'); }
  function liveModel12() { return window.__i6Model || null; }
  function num12(txt) { var mm = /-?[\d.]+/.exec(txt || ''); return mm ? parseFloat(mm[0]) : NaN; }
  function liveMemo12() {
    var s = sec12(); if (!s) return null;
    function txt(sel) { var el = s.querySelector(sel); return el ? (el.textContent || '') : ''; }
    return { fv: num12(txt('[data-i5="kpi1"] span')), mos: num12(txt('[data-i5="kpi3"] span')), wacc: txt('[data-i5="kpi4"] span') };
  }
  function grid12() { var s = sec12(); return s ? s.querySelector('.i5-grid') : null; }
  function valueCells12() {
    var g = grid12(); if (!g) return [];
    return Array.prototype.filter.call(g.children, function (c) { return /^\s*\$?\d+(\.\d+)?\s*$/.test(c.textContent || ''); });
  }
  function cellRC12(cell, cells) {
    var r = cell.getBoundingClientRect();
    function uniq(vals) { var out = []; vals.forEach(function (v) { if (!out.some(function (u) { return Math.abs(u - v) < 3; })) out.push(v); }); return out.sort(function (a, b) { return a - b; }); }
    var tops = uniq(cells.map(function (c) { return c.getBoundingClientRect().top; }));
    var lefts = uniq(cells.map(function (c) { return c.getBoundingClientRect().left; }));
    function idx(list, v) { for (var i = 0; i < list.length; i++) { if (Math.abs(list[i] - v) < 3) return i; } return -1; }
    return { row: idx(tops, r.top), col: idx(lefts, r.left) };
  }
  function titleFor12(w, g) { return 'Rebuild the memo with WACC ' + w.toFixed(1) + '% · growth ' + g.toFixed(1) + '% — reconstruir con este escenario'; }
  function refreshGridTitles12() {
    var m = liveModel12(); if (!m) return;
    var cells = valueCells12(); if (cells.length < 9) return;
    cells.forEach(function (cell) {
      var rc = cellRC12(cell, cells);
      if (rc.row < 0 || rc.col < 0) return;
      cell.title = titleFor12(+(m.w + (rc.row - 1)).toFixed(1), +(m.g + (rc.col - 1)).toFixed(1));
    });
  }

  /* (a) Tooltip del mapa: clamp + barrido periódico que limpia el display:none rancio. */
  function clampDesc12(node) {
    var c = node.querySelector('.cm-desc'); if (!c) return;
    var chart = node.closest('.cm-chart'); if (!chart) return;
    if (c.style.display === 'none') c.style.display = '';
    var labels = Array.prototype.slice.call(chart.querySelectorAll('.cm-label'));
    function rect(el) { return el.getBoundingClientRect(); }
    function hits() {
      var r = rect(c), fig = chart.parentElement ? chart.parentElement.getBoundingClientRect() : rect(chart);
      if (r.top < fig.top + 4 || r.bottom > fig.bottom - 4) return true;
      if (r.left < fig.left + 4 || r.right > fig.right - 4) return true;
      return labels.some(function (l) { var lr = rect(l); return lr.left < r.right - 2 && lr.right > r.left + 2 && lr.top < r.bottom - 2 && lr.bottom > r.top + 2; });
    }
    function fits(tab) {
      c.style.left = tab.dx + 'px'; c.style.transform = 'translate(-50%,0)';
      if (tab.below) { c.style.top = 'calc(100% + 12px)'; c.style.bottom = 'auto'; } else { c.style.top = 'auto'; c.style.bottom = 'calc(100% + 12px)'; }
      return !hits();
    }
    var tabs = [{ below: true, dx: 0 }, { below: false, dx: 0 }, { below: true, dx: -30 }, { below: false, dx: -30 }, { below: true, dx: 30 }, { below: false, dx: 30 }];
    if (tabs.some(fits)) return;
    c.style.display = 'none';
  }
  function nodeActive12(node) {
    try { if (node.matches(':hover') || node.matches(':focus-within')) return true; } catch (e) {}
    return document.activeElement === node || (node.contains && node.contains(document.activeElement));
  }
  function scheduleClamp12(node) { setTimeout(function () { clampDesc12(node); }, 320); setTimeout(function () { clampDesc12(node); }, 700); }
  ['pointerover', 'focusin', 'touchstart'].forEach(function (evName) {
    document.addEventListener(evName, function (ev) { var n = ev.target && ev.target.closest ? ev.target.closest('.cm-node') : null; if (n) scheduleClamp12(n); }, true);
  });

  /* (d) WACC·GROWTH en una sola línea: encoge la fuente hasta que el texto cabe en su casilla. */
  function fitKpi4_12() {
    var root = document.documentElement;
    if (window.innerWidth > 900) { root.style.removeProperty('--i12-kpi4'); return; }
    var s = sec12(); if (!s) return;
    var kpi = s.querySelector('[data-i5="kpi4"]'); if (!kpi) return;
    var span = kpi.querySelector('span'); if (!span) return;
    function fits() {
      var a = kpi.getBoundingClientRect(), b = span.getBoundingClientRect();
      return b.left >= a.left - 1 && b.right <= a.right + 1;
    }
    root.style.removeProperty('--i12-kpi4');
    if (fits()) return;
    var sizes = [19, 18, 17, 16, 15, 14];
    for (var i = 0; i < sizes.length; i++) {
      root.style.setProperty('--i12-kpi4', sizes[i] + 'px');
      if (fits()) return;
    }
  }

  /* (ii) El veredicto distingue la corrección: margen en vivo, marca >=15% y "corregido desde base". */
  var BASE_MOS12 = 24;
  function syncVerdict12() {
    var s = sec12(); if (!s) return;
    var vEl = s.querySelector('[data-i5="verdict"]');
    var logEl = s.querySelector('.i5-log');
    var memo = liveMemo12(); if (!memo || isNaN(memo.mos)) return;
    var mos = memo.mos;
    var t = vEl ? (vEl.textContent || '') : '';
    var verd = 'UNDERVALUED', verdEs = 'infravalorado';
    if (/^OVERVALUED/.test(t)) { verd = 'OVERVALUED'; verdEs = 'sobrevalorado'; }
    else if (/^FAIR/.test(t)) { verd = 'FAIR VALUE'; verdEs = 'valor razonable'; }
    if (vEl && mos !== BASE_MOS12 && t.indexOf('corregido') === -1) {
      vEl.textContent = t.replace(/\s+$/, '') + ' · margen corregido: ' + mos + '% (base ' + BASE_MOS12 + '%)';
    }
    if (logEl) {
      var lt = logEl.textContent || '';
      if (/^Verdict:/.test(lt) && lt.indexOf('margin of safety') === -1) {
        logEl.textContent = 'Verdict: ' + verd + ' · ' + verdEs + ' — margin of safety ' + mos + '% · ' + (mos >= 15 ? '≥15% · margen sólido' : mos >= 0 ? '<15% · margen estrecho' : 'sin margen');
      } else if (/^Margin of safety:/.test(lt)) {
        logEl.textContent = lt.replace(/^(Margin of safety:\s*)-?\d+%/, '$1' + mos + '%');
      }
    }
  }
  var obs12 = null, obsTargets12 = [];
  function attachVerdictObs12() {
    var s = sec12(); if (!s) return;
    var els = [s.querySelector('[data-i5="verdict"]'), s.querySelector('.i5-log')].filter(Boolean);
    if (els.length === obsTargets12.length && els.every(function (el, i) { return el === obsTargets12[i]; })) return;
    if (obs12) obs12.disconnect();
    obsTargets12 = els;
    if (!('MutationObserver' in window) || !els.length) return;
    obs12 = new MutationObserver(function () { syncVerdict12(); });
    els.forEach(function (el) { obs12.observe(el, { characterData: true, childList: true, subtree: true }); });
  }

  /* (i) Títulos de la rejilla al día en el momento del clic, no en el siguiente hover. */
  document.addEventListener('click', function (ev) {
    var cell = ev.target && ev.target.closest ? ev.target.closest('.i5-grid div') : null;
    if (!cell || !/^\s*\$?\d+(\.\d+)?\s*$/.test(cell.textContent || '')) return;
    refreshGridTitles12();
    setTimeout(refreshGridTitles12, 400);
    setTimeout(refreshGridTitles12, 1500);
    setTimeout(refreshGridTitles12, 3500);
  }, true);

  /* WOW — Historial de escenarios del memo en vivo: chips que restauran el modelo exacto. */
  var hist12 = [], histPending12 = null, histSig12 = '';
  function loadHist12() {
    try { var raw = localStorage.getItem('i12-hist'); var arr = raw ? JSON.parse(raw) : []; hist12 = Array.isArray(arr) ? arr.filter(function (h) { return h && isFinite(h.w) && isFinite(h.g); }).slice(0, 6) : []; } catch (e) { hist12 = []; }
  }
  function saveHist12() { try { localStorage.setItem('i12-hist', JSON.stringify(hist12)); } catch (e) {} }
  function ensureHist12() {
    var g = grid12(); if (!g) return null;
    var box = document.querySelector('.i12-hist');
    if (box) return box;
    box = document.createElement('div'); box.className = 'i12-hist';
    box.innerHTML = '<div class="i12-hist-t">Historial de escenarios · Scenario history — toca un escenario para volver a él</div><div class="i12-chips"></div>';
    g.insertAdjacentElement('afterend', box);
    box.querySelector('.i12-chips').addEventListener('click', function (ev) {
      var b = ev.target && ev.target.closest ? ev.target.closest('button') : null;
      if (!b) return;
      var h = hist12[+b.getAttribute('data-i')]; if (!h) return;
      restoreHist12(h);
    });
    return box;
  }
  function renderHist12() {
    var box = ensureHist12(); if (!box) return;
    var chips = box.querySelector('.i12-chips'); if (!chips) return;
    var m = liveModel12();
    var sig = JSON.stringify(hist12) + '|' + (m ? m.w.toFixed(1) + '/' + m.g.toFixed(1) : '');
    if (sig === histSig12) return;
    histSig12 = sig;
    if (!hist12.length) { chips.innerHTML = '<span class="i12-empty">Aún no hay escenarios: toca una celda de la rejilla o mueve un deslizador.</span>'; return; }
    chips.innerHTML = hist12.map(function (h, i) {
      var label = (h.fv != null ? '$' + h.fv : '—') + ' · ' + h.w.toFixed(1) + '% / ' + h.g.toFixed(1) + '% · MoS ' + (h.mos != null ? h.mos + '%' : '—');
      var on = m && m.w === h.w && m.g === h.g ? ' class="on"' : '';
      return '<button type="button" data-i="' + i + '"' + on + '>' + label + '</button>';
    }).join('');
  }
  function restoreHist12(h) {
    var m = liveModel12(); if (!m) return;
    m.w = h.w; m.g = h.g;
    try { localStorage.setItem('i6-model', JSON.stringify({ w: h.w, g: h.g })); } catch (e) {}
    if (window.__i6controls) window.__i6controls();
    if (window.__i6rebuild) window.__i6rebuild();
    if (window.__i7ticket) window.__i7ticket();
    renderHist12();
    setTimeout(refreshGridTitles12, 400);
    setTimeout(refreshGridTitles12, 1500);
    setTimeout(renderHist12, 1600);
  }
  function pollHist12() {
    var m = liveModel12(); if (!m) return;
    var key = m.w.toFixed(1) + '/' + m.g.toFixed(1);
    if (key === histPending12) {
      var last = hist12[0];
      if (!last || last.w !== m.w || last.g !== m.g) {
        var memo = liveMemo12();
        hist12.unshift({ w: m.w, g: m.g, fv: memo && !isNaN(memo.fv) ? memo.fv : null, mos: memo && !isNaN(memo.mos) ? memo.mos : null });
        if (hist12.length > 6) hist12.length = 6;
        saveHist12();
      }
      histPending12 = null;
    } else {
      histPending12 = key;
    }
    renderHist12();
  }

  /* Barrido único cada ~800 ms: (a) tooltips activos, (d) KPI4, (i) títulos, (ii) veredicto, WOW historial. */
  function sweep12() {
    Array.prototype.forEach.call(document.querySelectorAll('.cm-node'), function (node) { if (nodeActive12(node)) clampDesc12(node); });
    fitKpi4_12();
    refreshGridTitles12();
    attachVerdictObs12(); syncVerdict12();
    ensureHist12(); pollHist12();
  }
  loadHist12();
  setInterval(sweep12, 800);
  window.addEventListener('resize', function () { fitKpi4_12(); });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', sweep12); else sweep12();
})();
