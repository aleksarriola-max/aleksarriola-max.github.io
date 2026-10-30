const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const PAL={bg:'#0D1210',bg2:'#0f1f18',acc:'#92AC9B',acc2:'#c9dace',glow:'179,199,186',star:'224,230,224',accrgb:'146,172,155'};
const esc=s=>String(s==null?'':s);
const linksHTML=links=>(links||[]).map(l=>`<a class="plink" href="${l.href}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join('');
const tagChips=(tags,cls)=>(tags||[]).map(t=>`<span>${esc(t)}</span>`).join('');

const TICKER=[
 ['LIFELINE','▲ 1st / 40 teams'],['PITMIND','▲ Most Innovative'],['SCANNER','▲ 600+ companies'],
 ['ORCEN','▲ 84 sheets · 39K lines'],['OUTSETTE','● Live'],['LIVE APPS','▲ 9'],
 ['THE 1525','▲ 400× throughput'],['CREDENTIALS','▲ 53'],['ESSAYS','▲ 100'],
 ['OPSFLOW','● Policy-bound'],['TALLYHOUND','● Open source'],
];
const STATS=[
 {v:'9',k:'Live Apps',link:'work',lbl:'Work →'},
 {v:'600+',k:'Companies Screened',link:'finance',lbl:'Scanner →'},
 {v:'11',k:'Risk Models',link:'cases',lbl:'Case study →'},
 {v:'8',k:'Client Projects',link:'work',lbl:'Work →'},
 {v:'53',k:'Certifications',link:'certs',lbl:'Credentials →'},
];
const ABOUT=[
 "I'm a Finance & Accounting student at Hult who builds AI agents and automation systems for real financial and operational workflows — working at the intersection of generative AI, quantitative finance, and complex data pipelines.",
 "I've shipped systems that are more than demos. PitMind is an AI Formula 1 strategy platform on IBM Granite and live telemetry; OpsFlow is a policy-bound AI operations agent on Sui that turns natural language into secure, auditable workflows. Each one taught me how to design multi-step agents, enforce guardrails, and ship reliably.",
 "I'm most interested in roles that combine agentic AI, robust financial modeling, and systems thinking — in AI engineering, fintech, or finance teams that want to use modern AI well.",
];
function badgeFor(a){
 const k=(a.kicker||'').toLowerCase();
 if(k.includes('1st'))return '1st of 40 teams';
 if(k.includes('most innovative'))return 'Most Innovative';
 if(k.includes('bob'))return 'Challenge build';
 return 'Recognition';
}

function renderAll(){
 const P=window.PORTFOLIO||{};
 // ticker (duplicate for seamless loop)
 const tHTML=TICKER.map(t=>`<span class="it"><span class="lab">${t[0]}</span><span class="val">${t[1]}</span></span>`).join('');
 document.getElementById('tickerTrack').innerHTML=tHTML+tHTML;
 // stat band
 document.getElementById('statBand').innerHTML=STATS.map(s=>
  `<div class="stat"><div class="v">${s.v}</div><div class="k">${s.k}</div><a onclick="go('${s.link}')">${s.lbl}</a></div>`).join('');
 // recognition
 document.getElementById('recogGrid').innerHTML=(P.achievements||[]).map(a=>
  `<div class="rcard"><div class="rn">${esc(a.n)}</div><div class="rk">${esc(a.kicker)}</div>
   <h4>${esc(a.title)}</h4><p>${esc(a.t)}</p><div class="badge">${badgeFor(a)}</div></div>`).join('');
 // toolkit marquee (duplicate)
 const tk=(P.toolkit||[]).map(t=>`<span>${esc(t)}</span>`).join('');
 document.getElementById('tkTrack').innerHTML=tk+tk;
 // about
 document.getElementById('aboutProse').innerHTML=ABOUT.map(p=>`<p>${esc(p)}</p>`).join('');
 // WORK
 document.getElementById('workGrid').innerHTML=(P.coding||[]).map(c=>
  `<div class="card"><div class="ct">${esc(c.kicker)}</div><h3>${esc(c.title)}</h3><p>${esc(c.t)}</p>
   <div class="tags">${tagChips(c.tags)}</div><div class="lnks">${linksHTML(c.links)}</div></div>`).join('');
 // CASES
 document.getElementById('caseList').innerHTML=(P.cases||[]).map(c=>
  `<div class="case"><div class="cn">${esc(c.n)} · ${esc(c.kicker)}</div>
   <h3>${esc(c.title)}</h3><div class="tldr">${esc(c.tldr)}</div>
   <div class="risk"><b>Risk decision it informs:</b> ${esc(c.risk)}</div>
   <div class="sgrid">${(c.s||[]).map(s=>`<div><h4>${esc(s.h)}</h4><p>${esc(s.t)}</p></div>`).join('')}</div>
   <ul class="terms"><div class="ct" style="font-family:ui-monospace,monospace;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--gold);margin-bottom:6px;">In finance terms</div>${(c.terms||[]).map(t=>`<li><b>${esc(t.k)}</b> — ${esc(t.v)}</li>`).join('')}</ul></div>`).join('');
 // FINANCE
 document.getElementById('financeFlags').innerHTML=(P.financeFlagships||[]).map(f=>
  `<div class="flag"><h3>${esc(f.title)}</h3><p>${esc(f.t)}</p>
   <div class="stats2">${(f.stats||[]).map(s=>`<div><div class="v">${esc(s.v)}</div><div class="k">${esc(s.k)}</div></div>`).join('')}</div>
   <div class="lnks">${linksHTML(f.links)}</div></div>`).join('');
 document.getElementById('financeAreas').innerHTML=(P.areas||[]).map(a=>
  `<div class="card"><h3>${esc(a.h)}</h3><p>${esc(a.t)}</p></div>`).join('');
 // EXPERIENCE
 document.getElementById('expList').innerHTML=(P.roles||[]).map(r=>
  `<div class="exp"><div class="top"><div><h3>${esc(r.title)}</h3><div class="org">${esc(r.org)} · ${esc(r.place)}</div></div><div class="date">${esc(r.dates)}</div></div>
   <ul>${(r.b||[]).map(b=>`<li>${esc(b)}</li>`).join('')}</ul>
   <div class="tags" style="display:flex;flex-wrap:wrap;gap:6px;margin-top:12px;">${(r.tags||[]).map(t=>`<span style="font-size:10px;color:var(--gold2);background:rgba(var(--acc-rgb),.1);border:1px solid rgba(var(--acc-rgb),.25);border-radius:100px;padding:3px 9px;">${esc(t)}</span>`).join('')}</div></div>`).join('');
 // WRITING
 const essays=(window.ESSAYS&&window.ESSAYS.length)?window.ESSAYS:(P.essays||[]);
 document.getElementById('essayList').innerHTML=essays.map(e=>
  `<div class="essay"><div class="meta">${esc(e.tag)} · ${esc(e.date)}</div><h3>${esc(e.title)}</h3>
   ${(Array.isArray(e.body)?e.body:[e.body]).map(p=>`<p>${esc(p)}</p>`).join('')}</div>`).join('');
 // CERTS
 document.getElementById('credList').innerHTML=(P.selectedCreds||[]).map(c=>
  `<div class="credrow"><div class="o">${esc(c.org)}</div><div class="d">${esc(c.t)}</div></div>`).join('');
 document.getElementById('toolkitChips').innerHTML=(P.toolkit||[]).map(t=>`<span>${esc(t)}</span>`).join('');
 buildStarNodes(P);
}

/* ---------- nav ---------- */
let mode='home',msx=-1e4,msy=-1e4,mcx=0,mcy=0;
const tip=document.getElementById('tooltip');
addEventListener('mousemove',e=>{msx=e.clientX;msy=e.clientY;mcx=e.clientX;mcy=e.clientY;});
function go(id){
 document.querySelectorAll('.page').forEach(p=>p.classList.remove('show'));
 const el=document.getElementById('page-'+id);if(el)el.classList.add('show');
 document.querySelectorAll('.navlinks a').forEach(a=>a.classList.toggle('active',a.dataset.p===id));
 document.getElementById('nl').classList.remove('open');
 mode=(id==='home')?'home':'depth';
 document.getElementById('star').style.display=mode==='home'?'block':'none';
 document.getElementById('depth').style.display=mode==='home'?'none':'block';
 document.getElementById('veilDepth').classList.toggle('on',mode!=='home');
 if(mode!=='home'){tip.style.opacity=0;document.getElementById('veilHome').style.opacity=0;}
 window.scrollTo(0,0);
}
window.go=go;
// home scroll veil (dim star field as you leave hero)
addEventListener('scroll',()=>{if(mode!=='home')return;
 const v=Math.min(0.9,Math.max(0,(scrollY/innerHeight-0.3)));
 document.getElementById('veilHome').style.opacity=v;},{passive:true});

/* ---------- FIG diagram ---------- */
function initFig(){
 const svg=document.getElementById('figSvg'); if(!svg)return;
 const main=document.getElementById('fMain'),branch=document.getElementById('fBranch'),
  marker=document.getElementById('fMarker'),gate=document.getElementById('gateBox'),
  out=document.getElementById('outBox'),blocked=document.getElementById('blockedTag');
 const Lmain=main.getTotalLength();
 // counters count up once
 const targets={cProposed:38,cExecuted:28,cEscalated:6};
 let counted=false;
 function countUp(){counted=true;const dur=2200,t0=performance.now();
  (function tick(now){const p=Math.min(1,(now-t0)/dur);
   for(const id in targets){document.getElementById(id).textContent=Math.round(targets[id]*(p<1?1-Math.pow(1-p,3):1));}
   if(p<1)requestAnimationFrame(tick);})(performance.now());}
 if(reduce){main.style.strokeDashoffset=0;branch.style.strokeDashoffset=0;out.classList.add('on');gate.classList.add('on');
  document.getElementById('cProposed').textContent=38;document.getElementById('cExecuted').textContent=28;document.getElementById('cEscalated').textContent=6;return;}
 // marker loop
 const GATE=(370-70)/(700-70); let started=false;
 function runLoop(){
  main.style.strokeDashoffset=0;
  let loop=0;
  function cycle(){
   loop++; const willBlock=(loop%4===0);
   gate.classList.remove('on');out.classList.remove('on');blocked.style.opacity=0;branch.style.strokeDashoffset=50;
   marker.setAttribute('opacity',1);
   const t0=performance.now();
   // leg 1: input->gate (900ms)
   function leg1(now){const p=Math.min(1,(now-t0)/900);const pt=main.getPointAtLength(Lmain*GATE*ease(p));
     marker.setAttribute('cx',pt.x);marker.setAttribute('cy',pt.y);
     if(p<1)return requestAnimationFrame(leg1);
     gate.classList.add('on');
     // pause at gate
     const g0=performance.now();
     function pause(n2){const pp=Math.min(1,(n2-g0)/600);
       if(willBlock){branch.style.strokeDashoffset=50*(1-ease(pp));blocked.style.opacity=pp;}
       if(pp<1)return requestAnimationFrame(pause);
       if(willBlock){ // escalate: marker goes down branch then restart
         const b0=performance.now();
         function down(n3){const dp=Math.min(1,(n3-b0)/500);const by=100+(150-100)*ease(dp);
           marker.setAttribute('cx',370);marker.setAttribute('cy',by);
           if(dp<1)return requestAnimationFrame(down);
           marker.setAttribute('opacity',0);setTimeout(cycle,500);}
         requestAnimationFrame(down);
       } else { // proceed gate->output
         const o0=performance.now();
         function leg2(n4){const p2=Math.min(1,(n4-o0)/900);const pt2=main.getPointAtLength(Lmain*(GATE+(1-GATE)*ease(p2)));
           marker.setAttribute('cx',pt2.x);marker.setAttribute('cy',pt2.y);
           if(p2<1)return requestAnimationFrame(leg2);
           out.classList.add('on');marker.setAttribute('opacity',0);setTimeout(cycle,700);}
         requestAnimationFrame(leg2);
       }
     }
     requestAnimationFrame(pause);
   }
   requestAnimationFrame(leg1);
  }
  cycle();
 }
 function ease(x){return x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2;}
 const io=new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting){if(!counted)countUp();if(!started){started=true;runLoop();}io.unobserve(e.target);}});},{threshold:.3});
 io.observe(svg);
}

/* ---------- STAR MAP ---------- */
const NODE_DEFS=[
 {label:'Outsette',match:'Outsette',hx:.58,hy:.30},{label:'StoryForge',match:'StoryForge',hx:.66,hy:.42},
 {label:'MissionMind',match:'MissionMind',hx:.72,hy:.30},{label:'PitMind',match:'PitMind',hx:.79,hy:.44},
 {label:'Tallyhound',match:'Tallyhound',hx:.62,hy:.56},{label:'OpsFlow',match:'OpsFlow',hx:.85,hy:.32},
 {label:'DeepBook OS',match:'DeepBook',hx:.90,hy:.46},{label:'Orcen Kit',match:'Orcen',hx:.80,hy:.58},
];
const sc=document.getElementById('star'),sx=sc.getContext('2d');
let SW,SH,SD,sstars=[],snodes=[],st0=performance.now(),shit=null;
function ssize(){SD=Math.min(devicePixelRatio||1,2);SW=sc.width=innerWidth*SD;SH=sc.height=innerHeight*SD;sc.style.width=innerWidth+'px';sc.style.height=innerHeight+'px';sbuild();}
function sbuild(){sstars=[];const N=Math.floor(innerWidth*innerHeight/11000)+50;
 for(let i=0;i<N;i++)sstars.push({x:Math.random()*SW,y:Math.random()*SH,r:(0.5+Math.random()*1.3)*SD,tw:Math.random()*6.28,a:0.3+Math.random()*0.6});
 posNodes();}
function posNodes(){snodes.forEach((n,i)=>{n.x=n.hx*SW;n.y=n.hy*SH;n.r=(4+(i%3))*SD;});}
function buildStarNodes(P){const coding=P.coding||[];
 snodes=NODE_DEFS.map((d,i)=>{const hit=coding.find(c=>c.title&&c.title.indexOf(d.match)>=0)||{};
  return {label:d.label,hx:d.hx,hy:d.hy,desc:(hit.kicker?hit.kicker+' — ':'')+(hit.t?hit.t.slice(0,90)+'…':''),delay:600+i*200,x:0,y:0,r:5};});
 if(SW)posNodes();}
function sEase(x){return 1-Math.pow(1-Math.max(0,Math.min(1,x)),3);}
function sAppear(n,el){return reduce?1:Math.min(1,Math.max(0,(el-n.delay)/700));}
function renderStar(now){
 const el=now-st0,flo=reduce?0:el;
 sx.clearRect(0,0,SW,SH);
 const g=sx.createRadialGradient(SW*0.72,SH*0.4,0,SW*0.6,SH*0.5,Math.max(SW,SH)*0.85);
 g.addColorStop(0,PAL.bg2);g.addColorStop(1,PAL.bg);sx.fillStyle=g;sx.fillRect(0,0,SW,SH);
 sstars.forEach(s=>{const tw=0.5+0.5*Math.sin(flo/700+s.tw);sx.beginPath();sx.arc(s.x,s.y,s.r,0,7);sx.fillStyle='rgba('+PAL.star+','+(s.a*tw)+')';sx.fill();});
 shit=null;let best=30*SD;snodes.forEach(n=>{const d=Math.hypot(n.x-msx*SD,n.y-msy*SD);if(d<best){best=d;shit=n;}});
 sx.lineWidth=1.4*SD;sx.strokeStyle='rgba('+PAL.glow+',.5)';sx.shadowColor='rgba('+PAL.glow+',.35)';sx.shadowBlur=6*SD;
 for(let i=1;i<snodes.length;i++){const a=snodes[i-1],b=snodes[i];const va=sAppear(a,el),vb=sAppear(b,el);if(va<=0)continue;const f=sEase(Math.min(1,vb));
  sx.beginPath();sx.moveTo(a.x,a.y);sx.lineTo(a.x+(b.x-a.x)*f,a.y+(b.y-a.y)*f);sx.stroke();}
 sx.shadowBlur=0;
 snodes.forEach(n=>{const ap=sAppear(n,el);if(ap<=0)return;const hl=(shit===n);const rr=n.r*sEase(ap)*(hl?1.7:1);const tw=0.82+0.18*Math.sin(flo/750+n.x);
  const gr=sx.createRadialGradient(n.x,n.y,0,n.x,n.y,rr*5);gr.addColorStop(0,'rgba('+PAL.glow+','+(0.5*ap*tw)+')');gr.addColorStop(1,'rgba('+PAL.glow+',0)');
  sx.beginPath();sx.arc(n.x,n.y,rr*5,0,7);sx.fillStyle=gr;sx.fill();
  sx.beginPath();sx.arc(n.x,n.y,rr,0,7);sx.fillStyle=hl?PAL.acc2:PAL.acc;sx.fill();
  sx.font='600 '+(11*SD)+'px Inter,sans-serif';sx.textAlign='left';sx.textBaseline='middle';
  sx.fillStyle='rgba(229,234,228,'+((hl?1:0.55)*ap)+')';sx.fillText(n.label,n.x+rr+9*SD,n.y);});
 if(mode==='home'&&shit){tip.style.opacity=1;tip.querySelector('.nm').textContent=shit.label;tip.querySelector('.ds').textContent=shit.desc;tip.style.left=(mcx+16)+'px';tip.style.top=(mcy+16)+'px';sc.style.cursor='pointer';}
 else if(mode==='home'){tip.style.opacity=0;sc.style.cursor='default';}
}
sc.addEventListener('click',()=>{if(mode==='home'&&shit)go('work');});

/* ---------- DEPTH FIELD ---------- */
const dc=document.getElementById('depth'),dx=dc.getContext('2d');
let DW,DH,DD,dstars=[],dnodes=[],dt0=performance.now(),cx,cy,focal,autoYaw=0,dmx=0,dmy=0;
const CZ=1500;
function dsize(){DD=Math.min(devicePixelRatio||1,2);DW=dc.width=innerWidth*DD;DH=dc.height=innerHeight*DD;dc.style.width=innerWidth+'px';dc.style.height=innerHeight+'px';cx=DW/2;cy=DH/2;focal=Math.min(DW,DH)*0.9;dbuild();}
function dbuild(){dstars=[];const N=Math.floor(innerWidth*innerHeight/11000)+60;
 for(let i=0;i<N;i++)dstars.push({x:(Math.random()-0.5)*3000,y:(Math.random()-0.5)*2000,z:280+Math.random()*4000,r:0.6+Math.random()*1.6,tw:Math.random()*6.28,gold:Math.random()<0.2});
 const R=560,M=8;dnodes=[];for(let i=0;i<M;i++){const phi=Math.acos(1-2*(i+0.5)/M),tht=Math.PI*(1+Math.sqrt(5))*(i+0.5);dnodes.push({ox:R*Math.sin(phi)*Math.cos(tht),oy:R*Math.sin(phi)*Math.sin(tht)*0.7,oz:CZ+R*Math.cos(phi),r:5+(i%3)*2});}}
function rot(px,py,pz,yaw,pitch){let dz=pz-CZ;const cyw=Math.cos(yaw),syw=Math.sin(yaw);let x1=px*cyw+dz*syw,z1=-px*syw+dz*cyw;const cp=Math.cos(pitch),sp=Math.sin(pitch);let y1=py*cp-z1*sp,z2=py*sp+z1*cp;return{x:x1,y:y1,z:z2+CZ};}
function proj(wx,wy,wz){const rz=wz;if(rz<=1)return null;const s=focal/rz;return{sx:cx+(wx-dmx*110)*s,sy:cy+(wy-dmy*80)*s,s,rz};}
function renderDepth(now){
 const el=now-dt0,flo=reduce?0:el;
 const tdmx=(msx/innerWidth-0.5)*2,tdmy=(msy/innerHeight-0.5)*2;dmx+=(tdmx-dmx)*0.05;dmy+=(tdmy-dmy)*0.05;
 if(!reduce)autoYaw+=0.0013;const yaw=autoYaw+dmx*0.3,pitch=-dmy*0.18;
 dx.clearRect(0,0,DW,DH);
 const g=dx.createRadialGradient(cx,cy*0.9,0,cx,cy,Math.max(DW,DH)*0.75);g.addColorStop(0,PAL.bg2);g.addColorStop(1,PAL.bg);dx.fillStyle=g;dx.fillRect(0,0,DW,DH);
 const draw=[];for(const s of dstars){const pr=proj(s.x,s.y,s.z);if(!pr)continue;const tw=0.6+0.4*Math.sin(flo/600+s.tw);draw.push({pr,s,alpha:Math.min(0.9,pr.s*1.1)*tw});}
 draw.sort((a,b)=>b.pr.rz-a.pr.rz);
 for(const d of draw){const r=Math.max(0.4,d.s.r*d.pr.s);dx.beginPath();dx.arc(d.pr.sx,d.pr.sy,r,0,7);dx.fillStyle='rgba('+PAL.star+','+d.alpha+')';dx.fill();}
 const scr=[];for(const n of dnodes){const rp=rot(n.ox,n.oy,n.oz,yaw,pitch);const pr=proj(rp.x,rp.y,rp.z);if(pr)scr.push({n,pr});}
 const hp=rot(0,0,CZ,yaw,pitch),hubPr=proj(hp.x,hp.y,hp.z);
 if(hubPr)for(const o of scr){dx.beginPath();dx.moveTo(hubPr.sx,hubPr.sy);dx.lineTo(o.pr.sx,o.pr.sy);dx.strokeStyle='rgba('+PAL.accrgb+',.1)';dx.lineWidth=1*DD;dx.stroke();}
 scr.sort((a,b)=>b.pr.rz-a.pr.rz);
 for(const o of scr){const rr=Math.max(2,o.n.r*o.pr.s);const gr=dx.createRadialGradient(o.pr.sx,o.pr.sy,0,o.pr.sx,o.pr.sy,rr*5);gr.addColorStop(0,'rgba('+PAL.glow+',.5)');gr.addColorStop(1,'rgba('+PAL.glow+',0)');dx.beginPath();dx.arc(o.pr.sx,o.pr.sy,rr*5,0,7);dx.fillStyle=gr;dx.fill();dx.beginPath();dx.arc(o.pr.sx,o.pr.sy,rr,0,7);dx.fillStyle=PAL.acc;dx.fill();}
 if(hubPr){const rr=Math.max(3,8*hubPr.s);dx.beginPath();dx.arc(hubPr.sx,hubPr.sy,rr,0,7);dx.fillStyle=PAL.acc2;dx.fill();}
}

function loop(now){if(mode==='home')renderStar(now);else renderDepth(now);requestAnimationFrame(loop);}
function sizeAll(){ssize();dsize();}
addEventListener('resize',sizeAll);
function boot(){
 if(!window.PORTFOLIO){return setTimeout(boot,60);}
 renderAll();sizeAll();go('home');initFig();requestAnimationFrame(loop);
}
boot();
