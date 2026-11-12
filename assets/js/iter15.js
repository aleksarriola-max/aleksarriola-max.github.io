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
   parte baja del contenido visible.
   Corrección del pin (sonda debug-fig0-pin.html, 2026-11-12 12:12 EST): el pin
   de FIG.0 es un ScrollTrigger (trigger = el SVG, pin = true, sin id) con un
   recorrido de 320 px de desplazamiento. Mientras el SVG está fijado, la
   rejilla sube 1 px por cada px de desplazamiento, así que ceñir solo el
   pin-spacer no basta: el hueco en reposo (~85-100 px) es menor que el
   recorrido, y la sonda midió que la rejilla tapa ESCALATE durante el pin
   (+47 px a scrollY 720, +164 px a 840 y +281 px a 960). Por eso la corrección
   acorta el recorrido del pin a 90 px (vars.end = '+=90' + ScrollTrigger.refresh,
   reaplicado en cada pasada por si el sitio recrea el ScrollTrigger): la
   envoltura queda en 331 + 90 = 421 px (la que GSAP calcula sola), el hueco en
   reposo queda en ~100 px y el pin lo consume casi entero sin solapar
   (margen mínimo de unos +10 px al final del pin). El pin sigue existiendo y
   la animación de la figura sigue jugándose. No se añade contenido nuevo.
   Vale en escritorio y a 390 px, donde las 5 etapas se apilan (viewBox 400×780
   de la Iteración 7): si no hay hueco, no se aplica nada. Además, esta versión
   ya no suelta la altura de la envoltura para medir: durante el pin, soltarla
   dejaba la envoltura en 320 px (el recorrido) y la rejilla subía aún más.
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
(function(){
'use strict';
if(window.__i15)return;window.__i15=true;
/* ---------- (1) Compactar FIG.0: subir la rejilla hasta el SVG ---------- */
var GAP_MAX=12;/* hueco que queda entre el contenedor del SVG y la rejilla */
var SLACK=24;/* margen por encima del recorrido del pin */
var MIN_EXCESS=24;/* solo se ciñe el contenedor si sobra más que esto */
var PIN_TRAVEL=90;/* recorrido del pin de FIG.0, en px de desplazamiento */
/* El SVG de FIG.0 es el que contiene la etiqueta «Human review»: dentro de
Hero C puede haber otros SVG (iconos) y si se toma el primero, la medida
sale del elemento equivocado y la tapa no se aplica. */
function pickSvg15(hero){
var svgs=hero.querySelectorAll('svg');
if(!svgs||!svgs.length)return null;
var k,m,ts;
for(k=0;k<svgs.length;k++){
ts=svgs[k].querySelectorAll('text');
for(m=0;m<ts.length;m++){
if((ts[m].textContent||'').trim()==='Human review')return svgs[k];
}
}
for(k=0;k<svgs.length;k++){
if(svgs[k].querySelector('text'))return svgs[k];
}
return svgs[0];
}
/* Parte baja del contenido visible del SVG, en unidades del viewBox: el
máximo, entre las etiquetas <text> renderizadas, de la parte baja del texto
o de su grupo padre (si el grupo mide 220 unidades o menos), más 10 unidades. */
function contentBottom15(svg){
var texts=svg.querySelectorAll('text'),best=null,i,t,b,g,gb,bot;
for(i=0;i<texts.length;i++){
t=texts[i];
if(!t.getClientRects().length)continue;
try{b=t.getBBox();}catch(e){continue;}
bot=b.y+b.height;
try{
g=t.parentElement;
if(g&&g.getBBox){gb=g.getBBox();if(gb.height<=220)bot=Math.max(bot,gb.y+gb.height);}
}catch(e){/* sigue */}
if(best===null||bot>best)best=bot;
}
return best===null?null:best+10;
}
/* Localiza las piezas de FIG.0 dentro de Hero C: el SVG (por «Human review»),
su padre (el pin-spacer) y la rejilla, que es hermana del contenedor (se busca
por el botón Propose). Devuelve null si falta algo. */
function figParts15(){
var hero=document.querySelector('section[data-screen-label="Hero C"]');
if(!hero)return null;
var svg=pickSvg15(hero);
if(!svg)return null;
var wrap=svg.parentElement;
if(!wrap)return null;
var fig=wrap.parentElement;
if(!fig)return null;
var grid=null,bs=hero.querySelectorAll('button'),b=null,i,col,node,disp;
for(i=0;i<bs.length;i++){if(/^propos/i.test((bs[i].textContent||'').trim())){b=bs[i];break;}}
if(b){
col=b.parentElement;
if(col){
node=col;
while(node){
disp='';
try{disp=window.getComputedStyle(node).display||'';}catch(e){disp='';}
if(disp.indexOf('grid')!==-1&&/THE MODEL PROPOSES/.test(node.textContent||'')){grid=node;break;}
if(node===hero)break;
node=node.parentElement;
}
if(!grid)grid=col.parentElement;
}
}
if(grid&&(grid===wrap||wrap.contains(grid)))return null;
return{hero:hero,svg:svg,wrap:wrap,fig:fig,grid:grid};
}
/* Acorta el recorrido del pin de FIG.0: sin esto, la rejilla taparía la
figura durante el pin porque el hueco en reposo es menor que el recorrido.
Solo actúa sobre el ScrollTrigger que fija este SVG (trigger = el SVG y
pin = true); los demás pins (FIG.2, artículos) no se tocan. */
function shortenPin15(svg){
var ST=window.ScrollTrigger||(window.gsap&&window.gsap.ScrollTrigger);
if(!ST||!ST.getAll)return false;
var all,i,st,changed=false;
try{all=ST.getAll();}catch(e){return false;}
for(i=0;i<all.length;i++){
st=all[i];
try{
if(st.trigger===svg&&st.pin&&(st.end-st.start)>PIN_TRAVEL+2){
st.vars.end='+='+PIN_TRAVEL;changed=true;
}
}catch(e){/* sigue */}
}
if(changed){try{ST.refresh();}catch(e){/* sigue */}}
return changed;
}
function compactFig15(){
var p=figParts15();
if(!p)return;
var svg=p.svg,wrap=p.wrap,grid=p.grid;
var vb=null;
try{vb=svg.getAttribute('viewBox');}catch(e){vb=null;}
/* (0) En escritorio, si el viewBox llega más alto que 290 unidades con 1000
de ancho, restablecerlo a 0 0 1000 290 antes de medir. */
if(vb&&window.innerWidth>=900){
var parts=vb.split(/\s+/);
if(parts.length===4&&+parts[2]===1000&&+parts[3]>290){
try{svg.setAttribute('viewBox','0 0 1000 290');}catch(e){/* sigue */}
}
}
/* (0b) Acorta el recorrido del pin antes de medir: su recorrido define la
holgura que la envoltura necesita debajo del contenido. */
shortenPin15(svg);
/* (a) Ciñe la envoltura a la parte baja del contenido visible del SVG,
dejando recorrido al pin y margen por encima. No se suelta la altura para
medir: durante el pin, soltarla dejaba la envoltura en 320 px. */
var svgR=svg.getBoundingClientRect(),targetH=null;
var cb=contentBottom15(svg);
if(cb!==null){
var vbW=1000;
try{vbW=+svg.getAttribute('viewBox').split(/\s+/)[2]||1000;}catch(e){vbW=1000;}
targetH=cb*(svgR.width/vbW);
}
if(targetH===null){
try{
var bb=svg.getBBox();
var vw=svg.getAttribute('viewBox').split(/\s+/);
targetH=Math.min(bb.y+bb.height,+vw[3]||bb.y+bb.height)*(svgR.width/(+vw[2]||svgR.width));
}catch(e){targetH=svgR.height;}
}
var capH=targetH+PIN_TRAVEL+SLACK;
var wrapR=wrap.getBoundingClientRect();
if(wrapR.height-capH>MIN_EXCESS){
wrap.style.height=capH+'px';
wrap.style.overflowY='hidden';
}else if(wrap.style.height&&wrapR.height<svgR.height){
/* Tapa obsoleta (p. ej., tras un cambio de ancho la envoltura quedó más baja
que el SVG): suéltala para no recortar contenido. */
wrap.style.height='';
wrap.style.overflowY='';
}
/* (b) Si entre la envoltura y la rejilla queda más de GAP_MAX, acerca la
rejilla hasta dejar 12 px. */
if(grid){
var w2=wrap.getBoundingClientRect(),g2=grid.getBoundingClientRect();
var gap=g2.top-w2.bottom;
if(gap>GAP_MAX)grid.style.marginTop=(-(gap-GAP_MAX))+'px';
}
}
/* ---------- (2) Aviso inferior: que también se desvanezca sobre texto ---------- */
var CUE_STYLE_ID='constellation-iter15';
function ensureCueStyle15(){
if(document.getElementById(CUE_STYLE_ID))return;
var st=document.createElement('style');
st.id=CUE_STYLE_ID;
st.textContent='#constellation-cue.i15-cue-hide{opacity:0!important;pointer-events:none!important;}';
document.head.appendChild(st);
}
/* ¿Hay un glifo de texto (no blanco) bajo el punto? */
function pointOverText15(x,y){
var range=null;
try{range=document.caretRangeFromPoint(x,y);}catch(e){return false;}
if(!range||!range.startContainer)return false;
var node=range.startContainer;
if(node.nodeType!==3)return false;
if(!/\S/.test(node.nodeValue||''))return false;
try{
var r=range.getClientRects();
if(!r||!r.length)return false;
var b=r[0];
return x>=b.left-4&&x<=b.right+4&&y>=b.top-1&&y<=b.bottom+1;
}catch(e){return false;}
}
function cueCheck15(){
ensureCueStyle15();
var cue=document.getElementById('constellation-cue');
if(!cue)return;
var r=cue.getBoundingClientRect();
if(!r.width||!r.height){cue.classList.remove('i15-cue-hide');return;}
var xs=[r.left+r.width*0.05,r.left+r.width*0.3,r.left+r.width*0.5,r.left+r.width*0.7,r.left+r.width*0.95];
var ys=[r.top+r.height*0.25,r.top+r.height*0.5,r.top+r.height*0.75];
var over=false,a,b;
for(a=0;a<xs.length&&!over;a++){
for(b=0;b<ys.length;b++){
if(pointOverText15(xs[a],ys[b])){over=true;break;}
}
}
if(over)cue.classList.add('i15-cue-hide');
else cue.classList.remove('i15-cue-hide');
}
function run15(){
try{compactFig15();}catch(e){/* sigue */}
try{cueCheck15();}catch(e){/* sigue */}
}
var tick15=false;
function onScroll15(){
if(tick15)return;
tick15=true;
requestAnimationFrame(function(){tick15=false;run15();});
}
window.addEventListener('scroll',onScroll15,{passive:true});
window.addEventListener('resize',onScroll15);
window.addEventListener('hashchange',onScroll15);
setInterval(run15,400);
setTimeout(run15,300);
setTimeout(run15,1200);
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',run15);}
else{run15();}
})();
