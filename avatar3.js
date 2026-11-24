/* Bách Niên Thế Gia · 7.0.0-d.1.5.5 · BỘ ẢNH ĐẠI DIỆN MỚI (bản mẫu để chủ dự án duyệt, chưa nối vào game).
   Kiểu hoạt hình đầu to theo ảnh tham khảo: mắt to đen bóng có điểm sáng, nét mảnh mềm, màu nhạt, tóc có bóng, mũ và áo theo nghề.
   Mị lực càng cao thì càng đẹp: mắt to và sáng hơn, mi dài, da mịn có má hồng, môi hồng, tóc bóng, thêm trang sức, trên 100 có hào quang nhẹ.
   AVA3.svg(người, cỡ, bậc, tuổi) trả chuỗi SVG; người cần: id, given, g ('nam'/'nữ'), mi, job, lv, tuoc. */
(function(){
const hs=s=>{let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0};
const rng=seed=>{let a=seed>>>0;return()=>{a=(a+0x6D2B79F5)>>>0;let t=a;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}};
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const hex=c=>{const n=parseInt(c.slice(1),16);return[n>>16,(n>>8)&255,n&255]};
const rgb=(r,g,b)=>'#'+[r,g,b].map(x=>clamp(Math.round(x),0,255).toString(16).padStart(2,'0')).join('');
const shade=(c,k)=>{const [r,g,b]=hex(c);return k>=0?rgb(r+(255-r)*k,g+(255-g)*k,b+(255-b)*k):rgb(r*(1+k),g*(1+k),b*(1+k))};
const pick=(R,a)=>a[Math.floor(R()*a.length)];
const SKIN=['#fbe6d3','#f7dcc6','#f3d2b8','#eec6a8','#e6b998'];
const HAIR=['#2a2220','#35271f','#43302a','#52382d','#1f1b1a'];
const ROBE={xanh:'#8fb3d3',lam:'#7f9fc9',luc:'#9cc7a8',hong:'#eab2bd',tim:'#bba9d8',vang:'#e8cd8a',kem:'#f1e2cf',ngoc:'#a5cfd0',do:'#d99a96'};
const OUT='#4a3430';
/* ---- mặt ---- */
function eye(x,side,o){const {b,f,sc,iris,uid}=o;const rx=6.3*sc,ry=7.3*sc,cy=58.8;const g='ir'+uid+(side<0?'l':'r');
 const outer=x+side*rx;const lash=f||b>0.62?`<path d="M${outer-side*0.6},${cy-ry*0.55} q${side*2.6},-0.4 ${side*3.6},-3" stroke="${OUT}" stroke-width="1.3" fill="none" stroke-linecap="round"/>${b>0.8?`<path d="M${outer-side*2},${cy-ry*0.95} q${side*2},-1 ${side*2.8},-3.2" stroke="${OUT}" stroke-width="1" fill="none" stroke-linecap="round"/>`:''}`:'';
 const spark=b>0.7?`<path d="M${x+side*2.4},${cy+ry*0.42} l0.6,1.5 l1.5,0.6 l-1.5,0.6 l-0.6,1.5 l-0.6,-1.5 l-1.5,-0.6 l1.5,-0.6z" fill="#fff" opacity=".95"/>`:'';
 return `<g><defs><radialGradient id="${g}" cx=".5" cy=".3" r=".85"><stop offset="0" stop-color="${shade(iris,0.18)}"/><stop offset=".55" stop-color="${iris}"/><stop offset="1" stop-color="${shade(iris,-0.5)}"/></radialGradient></defs>
 <ellipse cx="${x}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#${g})"/>
 <ellipse cx="${x}" cy="${cy+1.2}" rx="${rx*0.52}" ry="${ry*0.54}" fill="#150e0c"/>
 <path d="M${x-rx*0.7},${cy+ry*0.55} Q${x},${cy+ry*1.02} ${x+rx*0.7},${cy+ry*0.55}" stroke="${shade(iris,0.35)}" stroke-width="1.1" fill="none" opacity=".55" stroke-linecap="round"/>
 <circle cx="${x-rx*0.34}" cy="${cy-ry*0.34}" r="${2.3*sc}" fill="#fff"/><circle cx="${x+rx*0.32}" cy="${cy+ry*0.3}" r="${1.15*sc}" fill="#fff" opacity=".92"/>
 <path d="M${x-rx-0.5},${cy-ry*0.25} Q${x},${cy-ry*1.28} ${x+rx+0.5},${cy-ry*0.25}" stroke="${OUT}" stroke-width="1.7" fill="none" stroke-linecap="round"/>${lash}${spark}</g>`}
function brows(o){const {hc,f}=o;const w=f?1.4:2.1;const y=f?46.6:46;const arch=f?-2.6:-1.4;
 return `<path d="M37,${y+1.2} Q45,${y+arch} 54,${y+0.8}" stroke="${hc}" stroke-width="${w}" fill="none" stroke-linecap="round"/><path d="M66,${y+0.8} Q75,${y+arch} 83,${y+1.2}" stroke="${hc}" stroke-width="${w}" fill="none" stroke-linecap="round"/>`}
function mouth(o){const {b,f}=o;const lip=f?'#d4686b':'#c4746c';
 return `<path d="M55.4,73 Q60,${76.2+b*0.5} 64.6,73" stroke="${lip}" stroke-width="1.6" fill="${f?'#e98f93':'none'}" fill-opacity=".45" stroke-linecap="round"/>`}
function face(o){const {skin,b,f,age,uid}=o;
 const wr=age>=50?`<path d="M36,53 q3,1 6,0 M78,53 q3,1 6,0" stroke="${shade(skin,-0.3)}" stroke-width=".7" fill="none"/><path d="M51,39 q9,-2 18,0" stroke="${shade(skin,-0.22)}" stroke-width=".7" fill="none"/>`:'';
 const shape=f?'M33,50 C33,32 45,24 60,24 C75,24 87,32 87,50 C87,66 77,85 60,90 C43,85 33,66 33,50Z':'M32,50 C32,32 44,24 60,24 C76,24 88,32 88,50 C88,70 76,87 60,87 C44,87 32,70 32,50Z';
 return `<defs><radialGradient id="sk${uid}" cx=".42" cy=".34" r=".8"><stop offset="0" stop-color="${shade(skin,0.24)}"/><stop offset=".7" stop-color="${skin}"/><stop offset="1" stop-color="${shade(skin,-0.1)}"/></radialGradient></defs>
 <ellipse cx="31.5" cy="58" rx="3.4" ry="4.6" fill="${skin}" stroke="${shade(skin,-0.3)}" stroke-width=".8"/><ellipse cx="88.5" cy="58" rx="3.4" ry="4.6" fill="${skin}" stroke="${shade(skin,-0.3)}" stroke-width=".8"/>
 <path d="${shape}" fill="url(#sk${uid})" stroke="${shade(skin,-0.32)}" stroke-width=".9"/>
 <ellipse cx="42.5" cy="68" rx="${4.6+b*1.6}" ry="3" fill="#f19aa0" opacity="${(0.25+b*0.3).toFixed(2)}"/><ellipse cx="77.5" cy="68" rx="${4.6+b*1.6}" ry="3" fill="#f19aa0" opacity="${(0.25+b*0.3).toFixed(2)}"/>${wr}`}
function nose(skin){return `<path d="M58.8,65.4 Q60,67 61.2,65.4" stroke="${shade(skin,-0.4)}" stroke-width="1.1" fill="none" stroke-linecap="round"/>`}
/* ---- thân, cổ, áo ---- */
function neck(skin){return `<path d="M53.5,82 L53.5,92 Q60,97 66.5,92 L66.5,82Z" fill="${shade(skin,-0.07)}" stroke="${shade(skin,-0.3)}" stroke-width=".8"/>`}
function robe(o){const {col,f,badge,tier}=o;const d=shade(col,-0.22);
 const pat=tier>=3?`<g opacity=".3" stroke="#fff" stroke-width=".8" fill="none"><path d="M18,114 q6,-4 12,0 t12,0"/><path d="M78,114 q6,-4 12,0 t12,0"/></g>`:'';
 return `<path d="M8,120 C10,99 32,90 60,92 C88,90 110,99 112,120Z" fill="${col}" stroke="${d}" stroke-width="1"/>
 <path d="M8,120 C10,99 32,90 44,91 L50,120Z" fill="${d}" opacity=".16"/>
 <path d="M44,91 L60,113 L76,91 L70,89.5 L60,100 L50,89.5Z" fill="#fbf5ea" stroke="${d}" stroke-width=".8"/>
 <path d="M44,91 L61,120 M76,91 L59,120" stroke="${d}" stroke-width=".9" fill="none"/>
 <rect x="30" y="112" width="60" height="5" rx="2.5" fill="${f?'#f6c6cf':shade(col,-0.3)}" opacity=".9"/>${pat}${badge||''}`}
function bo(lv){const c=lv>=6?'#e9c25c':lv>=3?'#dcbc66':'#cdb582';return `<g><circle cx="60" cy="106" r="8.4" fill="${c}" stroke="#8e6b25" stroke-width=".9"/><path d="M55,108 q2.5,-6 5,-1 q2.5,-5 5,1 M56,104 q4,-2 8,0" stroke="#8e6b25" stroke-width="1" fill="none" stroke-linecap="round"/></g>`}
/* ---- tóc và mũ ---- */
function hairBackF(hc){return `<path d="M30,52 C22,72 24,98 34,112 L86,112 C96,98 98,72 90,52 C90,28 76,14 60,14 C44,14 30,28 30,52Z" fill="${hc}" stroke="${shade(hc,-0.3)}" stroke-width=".8"/><path d="M33,72 C31,86 33,98 37,108 M87,72 C89,86 87,98 83,108" stroke="${shade(hc,0.28)}" stroke-width="1" fill="none" opacity=".5"/>`}
function hairFrontF(hc,b){const sh=shade(hc,0.42);const st=shade(hc,-0.3);return `<path d="M31,56 C28,30 42,18 60,18 C78,18 92,30 89,56 C86,44 79,36 71,33 C67,40 53,40 49,33 C41,36 34,44 31,56Z" fill="${hc}" stroke="${st}" stroke-width=".8"/>
 <path d="M30,54 C25,70 26,88 32,102 C35,88 34,70 36,57Z" fill="${hc}" stroke="${st}" stroke-width=".7"/><path d="M90,54 C95,70 94,88 88,102 C85,88 86,70 84,57Z" fill="${hc}" stroke="${st}" stroke-width=".7"/>
 <path d="M60,18.5 C58,26 55,32 49,35 M60,18.5 C62,26 65,32 71,35" stroke="${st}" stroke-width=".9" fill="none" opacity=".7"/><path d="M46,30 C50,27 54,26 57,25 M74,30 C70,27 66,26 63,25" stroke="${sh}" stroke-width="1.1" fill="none" stroke-linecap="round" opacity=".35"/><path d="M42,26 C48,21 58,20 66,22" stroke="${sh}" stroke-width="2" fill="none" stroke-linecap="round" opacity="${(0.32+b*0.38).toFixed(2)}"/><path d="M35,40 C37,34 41,31 45,30" stroke="${sh}" stroke-width="1.3" fill="none" stroke-linecap="round" opacity=".4"/>`}
function pinF(b){const g='#e6bf5a',g2='#b88a2c';return `<g><path d="M80,25 L97,10" stroke="${g2}" stroke-width="1.5" stroke-linecap="round"/><path d="M95,8 q6,-4 8,2 q-3,6 -8,-2z" fill="${g}" stroke="${g2}" stroke-width=".8"/><circle cx="82" cy="27" r="3.4" fill="${g}" stroke="${g2}" stroke-width=".8"/><circle cx="82" cy="27" r="1.5" fill="#f08a9a"/>${b>0.55?`<path d="M98,13 v7 M94,15 v5" stroke="${g2}" stroke-width=".8"/><circle cx="98" cy="22" r="1.8" fill="#fff" stroke="#cfd6dc" stroke-width=".5"/><circle cx="94" cy="21" r="1.5" fill="#fff" stroke="#cfd6dc" stroke-width=".5"/>`:''}</g>`}
function hairM(hc){return `<path d="M33,46 C33,36 41,30 50,30 L50,42 C45,40 38,42 33,46Z" fill="${hc}"/><path d="M87,46 C87,36 79,30 70,30 L70,42 C75,40 82,42 87,46Z" fill="${hc}"/>`}
function hatOfficial(lv){const c=lv>=6?'#34303f':'#2a2730';const g=lv>=6?'#e9c25c':'#cdb06a';
 return `<g><path d="M30,32 Q16,28 5,32 Q16,36.4 30,35Z" fill="${c}" stroke="#14121a" stroke-width=".8"/><path d="M90,32 Q104,28 115,32 Q104,36.4 90,35Z" fill="${c}" stroke="#14121a" stroke-width=".8"/>
 <path d="M32,36 C31,18 43,10 60,10 C77,10 89,18 88,36 C78,30.5 42,30.5 32,36Z" fill="${c}" stroke="#14121a" stroke-width=".9"/><path d="M33,35.4 C45,30.6 75,30.6 87,35.4 L87,39.6 C75,35 45,35 33,39.6Z" fill="${g}" stroke="#8e6b25" stroke-width=".7"/>
 <path d="M44,16 C52,12.5 68,12.5 76,16" stroke="#fff" stroke-width="1.3" fill="none" opacity=".2" stroke-linecap="round"/><circle cx="60" cy="10.5" r="2.3" fill="${g}" stroke="#8e6b25" stroke-width=".7"/></g>`}
function beardM(hc,kind){const c=shade(hc,0.05);const m=`<path d="M51,69.4 Q55.4,67 60,69.6 Q64.6,67 69,69.4 Q64,72.4 60,71.2 Q56,72.4 51,69.4Z" fill="${c}"/>`;
 if(kind==='mustache')return m;if(kind==='goatee')return m+`<path d="M56,79 Q60,90 64,79 Q60,82.4 56,79Z" fill="${c}"/>`;
 if(kind==='long')return m+`<path d="M42,74 Q46,92 60,100 Q74,92 78,74 Q70,84 60,84 Q50,84 42,74Z" fill="${c}" stroke="${shade(c,-0.25)}" stroke-width=".6"/>`;return ''}
/* ---- ghép ---- */
function svg(c,size,tier,agev){
 const id=String(c.id||c.given||'x');const R=rng(hs((c.surname||'')+(c.given||'')+id));const f=c.g==='nữ';const mi=c.mi!=null?c.mi:60;
 const b=clamp((mi-35)/95,0,1.15);const age=agev!=null?agev:(c._age!=null?c._age:30);const uid=hs(id)%100000;
 const skin=pick(R,SKIN);const old=age>=58;const hc=old?pick(R,['#e7e4df','#d5d2cd']):pick(R,HAIR);
 const iris=pick(R,['#4a3326','#3b2a22','#2f3a45','#4b3a2b']);const sc=0.84+Math.min(b,1)*0.42;
 const job=c.job||'none',lv=c.lv||0;const officer=job==='quan'||c.tuoc;
 const col=f?(officer?ROBE.tim:pick(R,[ROBE.hong,ROBE.tim,ROBE.ngoc,ROBE.kem,ROBE.luc])):(job==='quan'?(lv>=4?ROBE.lam:ROBE.xanh):job==='y'?ROBE.luc:pick(R,[ROBE.xanh,ROBE.kem,ROBE.ngoc,ROBE.luc,ROBE.vang]));
 const o={skin,b,f,age,uid,hc,iris,sc};
 const aura=b>1?`<circle cx="60" cy="60" r="58" fill="url(#au${uid})"/><defs><radialGradient id="au${uid}"><stop offset=".62" stop-color="#fff3c8" stop-opacity="0"/><stop offset="1" stop-color="#ffe9a8" stop-opacity=".6"/></radialGradient></defs>`:'';
 let back='',front='',beard='';
 if(f){back=hairBackF(hc);front=hairFrontF(hc,b)+pinF(b)}
 else{front=job==='quan'?hairM(hc)+hatOfficial(lv):hairM(hc);const k=age>=40?pick(R,['mustache','goatee','long','mustache']):age>=28?pick(R,['mustache','','goatee']):'';beard=beardM(hc,old&&k==='long'?'long':k)}
 const badge=!f&&job==='quan'?bo(lv):'';
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="${size||96}" height="${size||96}" role="img" aria-label="${(c.given||'').replace(/"/g,'')}">${aura}${back}${robe({col,f,badge,tier:tier||0})}${neck(skin)}${face(o)}${brows(o)}${eye(46,-1,o)}${eye(74,1,o)}${nose(skin)}${mouth(o)}${beard}${front}</svg>`}
window.AVA3={svg,shade};
})();
