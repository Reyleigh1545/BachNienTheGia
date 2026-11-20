/* Bách Niên Thế Gia v6.7.0-d9.2 · giao diện mới (chỉ bản admin, bật bằng BN_ADMIN.ui2; thêm ?ui=old vào địa chỉ để tắt)
   - đầu hộp thoại: thẻ chân dung bấm được (mở hồ sơ), thay cho khối chữ và thanh chỉ số dài
   - kết quả: thanh chỉ số kèm số cộng trừ
   - hồ sơ nhân vật: chia nhiều trang (Tổng quan, Tâm tư, Việc và tiền, Gia đình, Việc nhà)
   - trang Đất phong: ô đất từng mẫu
   Mọi hàm nhận dữ liệu đã tính sẵn từ engine; không giữ trạng thái game. */
(function(){
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function card(i){if(!i)return '';
  return `<button type="button" class="pcard ${i.g==='nữ'?'f':'m'}${i.dead?' x':''}" data-pcard="${i.id}" title="Bấm để xem hồ sơ"><span class="pa">${i.dead?'†':i.age}</span><span class="pav">${i.av}</span><b>${esc(i.name)}</b>${i.tuoc?`<em class="ptuoc">${esc(i.tuoc)}</em>`:''}<small>${esc(i.sub)}</small>${i.inc!=null?`<span class="pinc ${i.inc<0?'dn':'up'}">${esc(i.incTxt)}</span>`:''}</button>`}
const U={
 header(me,other){return `<div class="pcards">${card(me)}${other?card(other):''}</div>`},
 /* kết quả: đổi các dòng chỉ số thành thanh */
 result(M,id){const G=window.BNTG;if(!G||!M)return;const c=G.P&&G.P(id);const fxs=[...M.querySelectorAll('.result .fx')];if(!fxs.length||!c)return;fxs.forEach(fx=>{
  const KEY={'Trí tuệ':'tri','Võ lực':'vo','Sức khỏe':'suc','Mị lực':'mi','EQ':'eq','Tâm trạng':'tam'};const COL={tri:'#2f7258',vo:'#946f1f',suc:'#a5342a',mi:'#7a4bb0',eq:'#2f6a86',tam:'#3e6a9a'};
  const bars=[],rest=[];
  [...fx.children].forEach(sp=>{const t=sp.textContent.trim();const m=t.match(/^(.+?)\s([+-]\s?\d+(?:[.,]\d+)?)$/);const name=m&&m[1],key=name&&KEY[name];
   if(key){const d=parseFloat(m[2].replace(/\s/g,'').replace(',','.'));const v=Math.max(0,Math.min(100,Math.round(c[key]||0)));const g=Math.min(v,Math.abs(d));
    bars.push(`<div class="fb"><span>${esc(name)}</span><div class="fbt"><div class="fbf" style="width:${v}%;background:${COL[key]}"></div>${d>0?`<div class="fbg" style="left:${v-g}%;width:${g}%"></div>`:''}</div><b class="${d>=0?'up':'down'}">${m[2].replace(/\s/g,'')}</b></div>`)}
   else rest.push(`<div class="fr ${sp.className}"><span>${esc(t)}</span></div>`)});
  if(!bars.length&&!rest.length)return;fx.outerHTML=`<div class="fxui">${bars.length?`<div class="fbars">${bars.join('')}</div>`:''}${rest.length?`<div class="frows">${rest.join('')}</div>`:''}</div>`});},
 /* hồ sơ nhân vật nhiều trang */
 sheet(SM,id,keep){if(!SM||!SM.children.length)return;
  const kids=[...SM.children];const who=kids.find(k=>k.classList.contains('who'));const xc=kids.find(k=>k.hasAttribute&&k.hasAttribute('data-close'));
  const PAGES=[['tq','Tổng quan'],['tc','Tính cách và kỹ năng'],['tt','Tâm tư'],['vl','Việc và tiền'],['gd','Gia đình'],['vn','Việc nhà']];
  const grp={tq:[],tc:[],tt:[],vl:[],gd:[],vn:[]};
  kids.forEach(k=>{if(k===who||k===xc)return;let g='tq';
   if(k.classList.contains('dsec')){const t=(k.querySelector('h3')||{textContent:''}).textContent;
    if(/Tính cách/.test(t))g='tc';else if(/Tâm tư/.test(t))g='tt';else if(/Hôn nhân|Quan hệ/.test(t))g='gd';else if(/Việc nhà/.test(t))g='vn';else g='vl'}
   else if(k.classList.contains('subs'))g='tc';
   else if(k.classList.contains('kvline')){const t=k.textContent;if(/Tiền riêng|Di chúc|với gia chủ|kiếm/.test(t))g='vl';else if(/Tiềm năng/.test(t))g='tc'}
   grp[g].push(k)});
  const cur=(keep&&SM._pg)||'tq';const pages=PAGES.filter(([k])=>grp[k].length);if(pages.length<2){return}
  const wrap=document.createElement('div');wrap.className='sheetpages';
  pages.forEach(([k])=>{const d=document.createElement('div');d.className='spage';d.dataset.pg=k;grp[k].forEach(n=>d.appendChild(n));wrap.appendChild(d)});
  const nav=document.createElement('nav');nav.className='spnav';
  nav.innerHTML=pages.map(([k,n])=>`<button type="button" data-pg="${k}">${n}</button>`).join('');
  const show=k=>{SM._pg=k;nav.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.pg===k));wrap.querySelectorAll('.spage').forEach(d=>d.hidden=d.dataset.pg!==k)};
  nav.onclick=e=>{const b=e.target.closest('button[data-pg]');if(b)show(b.dataset.pg)};
  if(who)who.after(nav);else SM.appendChild(nav);nav.after(wrap);show(pages.some(([k])=>k===cur)?cur:pages[0][0])},
 /* trang Đất phong: ô đất */
 land(i){if(!i||!i.tot)return '';const PAL=['#4a5f8c','#6b4a8c','#8c6a2f','#2f7a5a','#2f7a82','#8c4a5f','#5a7a2f','#7a5a2f'];
  const tiles=[];const leg=[];i.projs.forEach((p,k)=>{const c=PAL[k%PAL.length];for(let j=0;j<p.ac;j++)tiles.push(`<div class="lt" style="background:${c}" title="${esc(p.n)}">${j===0?esc(p.n.split(' ').map(w=>w[0]).join('').slice(0,2)):''}</div>`);leg.push(`<span><i style="background:${c}"></i>${esc(p.n)} ${p.ac}</span>`)});
  for(let j=0;j<i.fld;j++)tiles.push('<div class="lt fld" title="Ruộng cho tá điền"></div>');
  (i.clrList||[]).forEach(x=>{for(let j=0;j<x.n;j++)tiles.push(`<div class="lt clr" title="Đang khai hoang">${j===0?Math.max(1,x.mo)+'th':''}</div>`)});
  while(tiles.length<i.tot)tiles.push('<div class="lt wild" title="Đất hoang"></div>');
  return `<div class="landgrid">${tiles.slice(0,Math.max(i.tot,tiles.length)).join('')}</div><div class="landleg">${leg.join('')}<span><i class="fld"></i>Ruộng ${i.fld}</span><span><i class="clr"></i>Khai hoang ${i.clr}</span><span><i class="wild"></i>Đất hoang ${i.wild}</span></div>`}
};
window.UI2=U;
/* bấm thẻ chân dung: mở hồ sơ nhân vật */
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-pcard]');if(!b)return;e.preventDefault();e.stopPropagation();
  const A=window.BNTG&&window.BNTG._adm;if(A&&A.openSheet)A.openSheet(b.dataset.pcard)},true);
})();
