/* Web sparks — motion for the Home web.
   Reads the threads that constellation.js has already drawn and sends a small light along
   each one, outward from the hub (ALEKS ARRIOLA), plus a slow pulse from the hub itself.
   It only ADDS its own overlay (ws- prefix); it never edits the web's nodes, lines or handlers.
   Nothing moves when the visitor has asked for reduced motion. */
(function () {
  'use strict';
  if (window.__webSparks) return; window.__webSparks = true;
  var REDUCE = false; try { REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { }
  if (REDUCE) return;
  var BRASS = '#C9A86A', PALE = '#DCEBDD';
  var HUB = { d: [500, 260], m: [200, 280] };
  var CSS = [
    '.cm-chart svg.ws-svg{pointer-events:none;z-index:1}',
    '.ws-svg-m{display:none}',
    '@media (max-width:900px){.ws-svg-d{display:none!important}.ws-svg-m{display:block!important}}'
  ].join('\n');
  function num(l, a) { return parseFloat(l.getAttribute(a)) || 0; }
  function build(src, cls, hub) {
    var lines = src.querySelectorAll('line'), out = '', i;
    /* slow pulse from the hub */
    for (i = 0; i < 2; i++) out += '<ellipse cx="' + hub[0] + '" cy="' + hub[1] + '" rx="6" ry="4" fill="none" stroke="' + BRASS + '" stroke-width="1" opacity="0">' +
      '<animate attributeName="rx" values="6;' + (cls === 'ws-svg-d' ? 215 : 100) + '" dur="6s" begin="' + (i * 3) + 's" repeatCount="indefinite"/>' +
      '<animate attributeName="ry" values="4;' + (cls === 'ws-svg-d' ? 150 : 125) + '" dur="6s" begin="' + (i * 3) + 's" repeatCount="indefinite"/>' +
      '<animate attributeName="opacity" values="0;.5;0" keyTimes="0;.12;1" dur="6s" begin="' + (i * 3) + 's" repeatCount="indefinite"/></ellipse>';
    for (i = 0; i < lines.length; i++) {
      var a = [num(lines[i], 'x1'), num(lines[i], 'y1')], b = [num(lines[i], 'x2'), num(lines[i], 'y2')];
      var da = Math.hypot(a[0] - hub[0], a[1] - hub[1]), db = Math.hypot(b[0] - hub[0], b[1] - hub[1]);
      if (db < da) { var tmp = a; a = b; b = tmp; da = db; }          /* always travel away from the hub */
      var len = Math.hypot(b[0] - a[0], b[1] - a[1]); if (len < 12) continue;
      var spoke = da < 4, dur = (spoke ? 2.4 : 3.4) + len / 260, begin = ((i * 0.73) % 5).toFixed(2), total = (dur + 1.6 + (i % 4) * 0.7).toFixed(2);
      var kt = (dur / total).toFixed(3);
      out += '<circle r="' + (spoke ? 2.4 : 1.8) + '" fill="' + (spoke ? BRASS : PALE) + '" opacity="0">' +
        '<animateMotion dur="' + total + 's" begin="' + begin + 's" repeatCount="indefinite" calcMode="linear" keyPoints="0;1;1" keyTimes="0;' + kt + ';1" path="M' + a[0] + ',' + a[1] + ' L' + b[0] + ',' + b[1] + '"/>' +
        '<animate attributeName="opacity" values="0;' + (spoke ? '.95' : '.7') + ';' + (spoke ? '.95' : '.7') + ';0;0" keyTimes="0;' + (kt * 0.12).toFixed(3) + ';' + (kt * 0.85).toFixed(3) + ';' + kt + ';1" dur="' + total + 's" begin="' + begin + 's" repeatCount="indefinite"/></circle>';
    }
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'ws-svg ' + cls);
    svg.setAttribute('viewBox', src.getAttribute('viewBox') || '0 0 1000 520');
    var par = src.getAttribute('preserveAspectRatio'); if (par) svg.setAttribute('preserveAspectRatio', par);
    svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML = out;
    return svg;
  }
  function sig(svg) { var l = svg.querySelectorAll('line'); return l.length + ':' + (l[0] ? l[0].getAttribute('x2') + ',' + l[0].getAttribute('y2') : ''); }
  function ensure() {
    var chart = document.querySelector('.constellation-map .cm-chart'); if (!chart) return;
    var d = chart.querySelector('.cm-svg-d'), m = chart.querySelector('.cm-svg-m'); if (!d || !d.querySelector('line')) return;
    var s = sig(d) + '|' + (m ? sig(m) : '');
    if (chart.getAttribute('data-ws') === s && chart.querySelector('.ws-svg')) return;
    var old = chart.querySelectorAll('.ws-svg'), i; for (i = 0; i < old.length; i++) old[i].parentNode.removeChild(old[i]);
    chart.setAttribute('data-ws', s);
    var first = chart.querySelector('.cm-node') || null, host = first ? first.parentNode : chart;
    host.insertBefore(build(d, 'ws-svg-d', HUB.d), first);
    if (m && m.querySelector('line')) host.insertBefore(build(m, 'ws-svg-m', HUB.m), first);
  }
  function init() {
    var st = document.createElement('style'); st.id = 'web-sparks-css'; st.textContent = CSS; document.head.appendChild(st);
    ensure(); window.addEventListener('load', function () { setTimeout(ensure, 900); });
    setInterval(ensure, 1500);        /* the web is rebuilt when you return to Home or resize */
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
