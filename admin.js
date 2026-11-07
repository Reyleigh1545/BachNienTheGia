/* Bách Niên Thế Gia v6.4.1.2 · bảng admin (chỉ nạp ở admin.html, phải nạp TRƯỚC engine.js)
   - Hiện tỉ lệ thành của từng lựa chọn có gieo xúc xắc
   - Máy tự chọn: Cao / Vừa / Thấp / Ngẫu nhiên. Không bao giờ chọn lựa chọn không gieo nếu hộp có lựa chọn gieo.
     Hộp chỉ toàn lựa chọn không gieo: chạy thử từng lựa chọn (previewScore), Cao lấy cái lợi nhất, Vừa cái ở giữa, Thấp cái thiệt nhất.
   - Ép kết quả xúc xắc: thành, đại thành, bại, thảm bại
   - Bảng chỉnh gia tộc và người đang chọn, gọi thẳng một sự kiện, xem vì sao sự kiện không ra
   - Tự chơi N năm, chụp mốc và lùi về, xuất/nhập save, nạp save của bản thường, kiểm tra bất biến
   Save của trang admin nằm riêng (khóa bnthegia.*.adm), không đụng save của bản thường. */
(function(){
'use strict';
const CFG_KEY='bnthegia.adm.cfg';
const A=window.BN_ADMIN={odds:true,auto:'off',force:'none',delay:250,play:false};
try{Object.assign(A,JSON.parse(localStorage.getItem(CFG_KEY)||'{}'),{play:false})}catch(e){}
const saveCfg=()=>{try{localStorage.setItem(CFG_KEY,JSON.stringify({odds:A.odds,auto:A.auto,force:A.force,delay:A.delay}))}catch(e){}};

/* ---------- xúc xắc ---------- */
A.rollX=p=>{switch(A.force){
  case 'thanh':return p>0?p*0.5:-1;
  case 'dai':return -1;
  case 'bai':return p<1?p+(1-p)*0.4:2;
  case 'tham':return 2;
  default:return Math.random()}};

/* ---------- máy tự chọn ---------- */
const G=()=>window.BNTG,AD=()=>window.BNTG._adm;
const Mo=()=>document.getElementById('modal');
let pend=null;const later=(fn,ms)=>{clearTimeout(pend);pend=setTimeout(()=>{pend=null;fn()},ms==null?A.delay:ms)};
const mode=()=>A.auto!=='off'?A.auto:(A.play?'rand':null);
const median=a=>a[Math.floor((a.length-1)/2)];
function pickIdx(m,{c,ok,probs,evId,data,opts}){
  const cand=ok.map((o,i)=>i).filter(i=>!ok[i].go);
  if(!cand.length)return Math.floor(Math.random()*ok.length);
  const rolled=cand.filter(i=>probs[i]!=null);
  const choose=sorted=>m==='cao'?sorted[sorted.length-1]:m==='thap'?sorted[0]:m==='vua'?median(sorted):sorted[Math.floor(Math.random()*sorted.length)];
  if(rolled.length)return choose(rolled.slice().sort((a,b)=>probs[a]-probs[b]));
  if(evId){const base=opts.filter(x=>{try{return !x.c||x.c(c,data)}catch(e){return false}});
    const sc=cand.map(i=>{let s=null;try{s=AD().previewScore(evId,c.id,data,base.indexOf(ok[i]))}catch(e){}return {i,s:s==null?0:s}});
    return choose(sc.sort((a,b)=>a.s-b.s).map(x=>x.i))}
  return cand[Math.floor(Math.random()*cand.length)];
}
A.onChoice=info=>{const m=mode();if(!m)return;
  later(()=>{const b=Mo().querySelector(`.choices [data-ch="${pickIdx(m,info)}"]`);if(b)b.click()})};
A.onResult=()=>{if(!mode())return;later(()=>{const b=Mo().querySelector('[data-ok]');if(b)b.click()},Math.max(120,A.delay))};

/* ---------- tự chơi ---------- */
let target=0,loop=null,stuck={html:'',n:0};
function playTick(){
  const g=G();if(!g)return;const S=g.S();
  if(!S||S.over){stopPlay(S&&S.over?'Ván đã kết thúc.':'');return}
  if(AD().modalOpen()){
    if(pend)return;
    const M=Mo();const h=M.innerHTML.length+':'+(M.querySelector('h2')||{}).textContent;
    if(h===stuck.html){if(++stuck.n>60){stopPlay('Kẹt ở một hộp thoại, đã dừng tự chơi.');return}}else stuck={html:h,n:0};
    if(stuck.n<4)return; /* để onChoice/onResult xử lý trước */
    const b=M.querySelector('[data-ok]')||M.querySelector('.choices [data-ch]')||M.querySelector('.choices button:not(:disabled)')||M.querySelector('button.primary:not(:disabled)');
    if(b)b.click();return}
  if(S.t>=target){stopPlay('Đã tua xong.');return}
  for(let k=0;k<6&&S.t<target&&!S.queue.length&&!S.over;k++)AD().advance();
  AD().render();if(S.queue.length)AD().nextPopup();
}
function startPlay(years){const S=G().S();if(!S)return msg('Chưa có ván nào đang chơi.');
  target=S.t+Math.max(1,years)*12;A.play=true;AD().setRun(false);clearInterval(loop);loop=setInterval(playTick,40);msg(`Đang tự chơi tới tháng ${target}.`);draw()}
function stopPlay(t){A.play=false;clearInterval(loop);loop=null;clearTimeout(pend);pend=null;try{AD().save()}catch(e){}if(t)msg(t);draw()}

/* ---------- chụp mốc ---------- */
const snaps=[];
function snap(){const S=G().S();if(!S)return;snaps.unshift({t:S.t,at:new Date().toLocaleTimeString('vi-VN'),st:structuredClone(S)});if(snaps.length>10)snaps.pop();msg('Đã chụp mốc.');draw()}
function restore(i){const s=snaps[i];if(!s)return;stopPlay();AD().setS(structuredClone(s.st));msg('Đã lùi về mốc.');draw()}

/* ---------- save ---------- */
function exportSave(){const S=G().S();if(!S)return;const a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([JSON.stringify(S)],{type:'application/json'}));a.download=`bntg-${S.surname||'save'}-thang${S.t}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
function importSave(file){const r=new FileReader();r.onload=()=>{try{const st=AD().migrate(JSON.parse(r.result));st.slot=st.slot||1;stopPlay();AD().setS(st);AD().save();msg('Đã nạp save.')}catch(e){msg('Không đọc được tệp: '+e.message)}};r.readAsText(file)}
function normalSlots(){const out=[];for(let n=1;n<=9;n++){const t=localStorage.getItem('bnthegia.v6.slot'+n);if(t)out.push(n)}return out}
function loadNormal(n){try{const st=AD().migrate(JSON.parse(localStorage.getItem('bnthegia.v6.slot'+n)));st.slot=n;stopPlay();AD().setS(st);AD().save();msg(`Đã chép save ô ${n} của bản thường sang admin. Save gốc không bị đụng tới.`)}catch(e){msg('Không nạp được: '+e.message)}}

/* ---------- kiểm tra bất biến ---------- */
function audit(){const g=G(),S=g.S();if(!S)return [];const out=[];const P=g.P;const ST=['tri','vo','suc','mi','eq','tam','duyen','fame','purse','m'];
  if(!Number.isFinite(S.money))out.push('Công quỹ không phải số');if(!Number.isFinite(S.fame))out.push('Danh vọng gia tộc không phải số');
  S.people.filter(p=>p.dead==null).forEach(p=>{const n=g.nameOf(p);
    ST.forEach(k=>{if(p[k]!=null&&!Number.isFinite(p[k]))out.push(`${n}: ${k} = ${p[k]}`)});
    if(S.t-p.born<0)out.push(`${n}: tuổi âm`);
    if(p.spouse){const s=P(p.spouse);if(s&&s.dead==null&&s.spouse!==p.id)out.push(`${n}: vợ/chồng không đối xứng`)}
    if(p.hh&&!S.hh[p.hh])out.push(`${n}: ở hộ không tồn tại (${p.hh})`)});
  (S.books||[]).forEach(b=>{if(!S.hh[b.hh])out.push(`Sách "${b.n}" gắn hộ không tồn tại`)});
  if(!S.people.some(p=>p.id===S.head&&p.dead==null)&&S.people.some(p=>p.dead==null&&g.inClan(p)))out.push('Không có gia chủ còn sống');
  return out}

/* ---------- bảng chỉnh ---------- */
const PF=[['tri','Trí tuệ'],['vo','Võ lực'],['suc','Sức khỏe'],['mi','Mị lực'],['eq','EQ'],['tam','Tâm trạng'],['duyen','Cơ duyên'],['fame','Danh vọng'],['purse','Tiền riêng (đồng)'],['m','Thông thạo nghề'],['lv','Bậc nghề']];
const SKF=[['ql','Quản trị'],['muu','Mưu'],['khau','Khẩu tài'],['ky','Kỹ nghệ']];
const CF=[['money','Công quỹ (đồng)'],['fame','Danh vọng gia tộc'],['hung','Hưng thịnh'],['on','Ổn định']];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const num=(k,l,v)=>`<label class="adf"><span>${l}</span><input type="number" data-k="${k}" value="${v==null?'':Math.round(v*100)/100}"></label>`;
function applyEdit(root){const g=G(),S=g.S();if(!S)return;const c=g.P(AD().getSel());
  root.querySelectorAll('[data-k]').forEach(i=>{if(i.value==='')return;const v=+i.value;if(!Number.isFinite(v))return;const [o,k]=i.dataset.k.split('.');
    if(o==='clan')S[k]=v;else if(o==='p'&&c){if(k==='age')c.born=S.t-Math.round(v*12);else c[k]=v}else if(o==='sk'&&c){AD().ensurePersona(c);c.sk[k]=v}});
  AD().render();msg('Đã áp dụng.');draw()}

/* ---------- sự kiện ---------- */
let q='';
function findEv(){const L=AD().EVENTS();const s=q.trim().toLowerCase();if(!s)return [];
  return L.filter(e=>e.id.toLowerCase().includes(s)||String(e.t||'').toLowerCase().includes(s)).slice(0,40)}
function callEv(id){const g=G(),S=g.S();if(!S)return;const e=AD().EVMAP()[id];const c=g.P(AD().getSel());if(!e||!c)return msg('Chọn một người trong gia phả trước.');
  const data={_force:1};
  if(e.pair){const os=g.alive().filter(o=>o.id!==c.id&&!o.away&&(()=>{try{return e.pair(o,c)}catch(x){return false}})());if(!os.length)return msg('Không có người thứ hai phù hợp (pair).');data.oid=os[0].id}
  if(e.house||e.hg){const refs=g._v633.houseRefs();const r=e.house?refs.find(x=>x.t==='H'&&x.id===e.house):refs.find(x=>e.hg==='at'?x.at:e.hg?!x.at:true);
    if(!r)return msg('Không có nhà nào phù hợp ở gần để gọi sự kiện này.');if(e.house)data.h=e.house;else data.hr=r}
  g.enqueue('ev',c.id,{ev:id,data},true);if(!AD().modalOpen())AD().nextPopup();msg(`Đã gọi "${e.t}" cho ${g.nameOf(c)}.`)}
function whyEv(id){const g=G();const e=AD().EVMAP()[id];const c=g.P(AD().getSel());if(!e||!c)return msg('Chọn một người trong gia phả trước.');
  const w=AD().eligibleWhy(e,c);msg(w?`"${e.t}" không ra với ${g.nameOf(c)}: ${w}.`:`"${e.t}" đang đủ điều kiện với ${g.nameOf(c)}.`)}

/* ---------- giao diện ---------- */
let tab='chon',open=false,note='';
const msg=t=>{note=t||'';const n=document.querySelector('#adm .adnote');if(n)n.textContent=note};
const seg=(name,cur,list)=>`<div class="adseg">${list.map(([v,l])=>`<button data-set="${name}" data-v="${v}" aria-pressed="${cur===v}">${l}</button>`).join('')}</div>`;
function body(){const g=G(),S=g&&g.S();
  if(tab==='chon')return `
    <label class="adck"><input type="checkbox" data-odds ${A.odds?'checked':''}> Hiện tỉ lệ thành ở hộp lựa chọn</label>
    <h4>Máy tự chọn</h4>${seg('auto',A.auto,[['off','Tắt'],['cao','Cao'],['vua','Vừa'],['thap','Thấp'],['rand','Ngẫu nhiên']])}
    <p class="admut">Cao, Vừa, Thấp xếp theo tỉ lệ thành; không chọn lựa chọn không gieo khi có lựa chọn gieo.</p>
    <h4>Ép kết quả xúc xắc</h4>${seg('force',A.force,[['none','Tự nhiên'],['thanh','Thành'],['dai','Đại thành'],['bai','Bại'],['tham','Thảm bại']])}
    <label class="adf"><span>Độ trễ mỗi lần bấm (ms)</span><input type="number" data-delay value="${A.delay}" min="0" step="50"></label>`;
  if(tab==='chinh'){if(!S)return '<p class="admut">Chưa có ván.</p>';const c=g.P(AD().getSel());if(c)AD().ensurePersona(c);
    return `<h4>Gia tộc</h4><div class="adgrid">${CF.map(([k,l])=>num('clan.'+k,l,S[k])).join('')}</div>
    <h4>${c?esc(g.nameOf(c))+' · '+g.age(c)+' tuổi · '+esc(g.jobName(c)):'Chưa chọn người'}</h4>
    ${c?`<div class="adgrid">${num('p.age','Tuổi',g.age(c))}${PF.map(([k,l])=>num('p.'+k,l,c[k])).join('')}${SKF.map(([k,l])=>num('sk.'+k,l,c.sk&&c.sk[k])).join('')}</div>`:''}
    <button class="btn small primary" data-apply>Áp dụng</button>
    <h4>Gọi sự kiện cho người đang chọn</h4><input class="adq" type="search" placeholder="Tìm theo id hoặc tên sự kiện" value="${esc(q)}">
    <div class="adlist">${findEv().map(e=>`<div><span><b>${esc(e.t||e.id)}</b> <small>${esc(e.id)}${e.ky?' · kỳ ngộ':''}${e.arc||e.fixed?' · cốt truyện':''}</small></span><button data-ev="${esc(e.id)}">Gọi</button><button data-why="${esc(e.id)}">Vì sao?</button></div>`).join('')}</div>`}
  const sl=normalSlots();
  return `<h4>Tự chơi</h4>${A.play?`<p>Đang chạy… tháng ${S?S.t:''} / ${target}</p><button class="btn small" data-stop>Dừng</button>`:
     `<div class="adrow"><input type="number" data-years value="10" min="1" style="width:5em"> năm <button class="btn small primary" data-play>Chạy</button></div>
     <p class="admut">Máy tự bấm mọi hộp. Kiểu chọn lấy theo mục "Máy tự chọn"; nếu đang Tắt thì chọn ngẫu nhiên.</p>`}
    <h4>Mốc</h4><button class="btn small" data-snap>Chụp mốc</button>
    <div class="adlist">${snaps.map((s,i)=>`<div><span>Tháng ${s.t} <small>${s.at}</small></span><button data-back="${i}">Lùi về</button></div>`).join('')}</div>
    <h4>Save</h4><div class="adrow"><button class="btn small" data-exp>Xuất JSON</button><label class="btn small">Nhập JSON<input type="file" accept=".json,application/json" data-imp hidden></label></div>
    ${sl.length?`<div class="adrow">Chép save bản thường: ${sl.map(n=>`<button class="btn small" data-norm="${n}">Ô ${n}</button>`).join('')}</div>`:''}
    <h4>Kiểm tra</h4><button class="btn small" data-audit>Kiểm tra bất biến</button>`}
function draw(){let el=document.getElementById('adm');
  if(!el){el=document.createElement('div');el.id='adm';document.body.appendChild(el)}
  el.innerHTML=`<button class="adtog" data-tog>${open?'✕ Đóng':'⚙ Admin'}${A.play?' · đang chạy':A.auto!=='off'?' · tự chọn':''}${A.force!=='none'?' · ép':''}</button>
   ${open?`<div class="adpanel"><nav>${[['chon','Tự chọn'],['chinh','Chỉnh'],['choi','Tự chơi']].map(([k,l])=>`<button data-tab="${k}" aria-pressed="${tab===k}">${l}</button>`).join('')}</nav>
   <div class="adbody">${body()}</div><p class="adnote">${esc(note)}</p></div>`:''}`;
  const $=s=>el.querySelector(s),$$=s=>el.querySelectorAll(s);
  $('[data-tog]').onclick=()=>{open=!open;draw()};
  $$('[data-tab]').forEach(b=>b.onclick=()=>{tab=b.dataset.tab;draw()});
  $$('[data-set]').forEach(b=>b.onclick=()=>{A[b.dataset.set]=b.dataset.v;saveCfg();draw()});
  const od=$('[data-odds]');if(od)od.onchange=()=>{A.odds=od.checked;saveCfg()};
  const dl=$('[data-delay]');if(dl)dl.onchange=()=>{A.delay=Math.max(0,+dl.value||0);saveCfg()};
  const ap=$('[data-apply]');if(ap)ap.onclick=()=>applyEdit(el);
  const qq=$('.adq');if(qq)qq.oninput=()=>{q=qq.value;const pos=qq.selectionStart;draw();const n=el.querySelector('.adq');n.focus();n.setSelectionRange(pos,pos)};
  $$('[data-ev]').forEach(b=>b.onclick=()=>callEv(b.dataset.ev));
  $$('[data-why]').forEach(b=>b.onclick=()=>whyEv(b.dataset.why));
  const pl=$('[data-play]');if(pl)pl.onclick=()=>startPlay(+$('[data-years]').value||1);
  const st=$('[data-stop]');if(st)st.onclick=()=>stopPlay('Đã dừng.');
  const sn=$('[data-snap]');if(sn)sn.onclick=snap;
  $$('[data-back]').forEach(b=>b.onclick=()=>restore(+b.dataset.back));
  const ex=$('[data-exp]');if(ex)ex.onclick=exportSave;
  const im=$('[data-imp]');if(im)im.onchange=()=>{if(im.files[0])importSave(im.files[0])};
  $$('[data-norm]').forEach(b=>b.onclick=()=>loadNormal(+b.dataset.norm));
  const au=$('[data-audit]');if(au)au.onclick=()=>{const r=audit();msg(r.length?`${r.length} lỗi: `+r.slice(0,12).join(' · '):'Không thấy lỗi bất biến.')};
}
/* cập nhật nhãn "đang chạy" và tháng khi tự chơi */
setInterval(()=>{if(A.play&&open&&tab==='choi'){const p=document.querySelector('#adm .adbody p');const S=G()&&G().S();if(p&&S)p.textContent=`Đang chạy… tháng ${S.t} / ${target}`}},500);
/* đổi người đang chọn thì vẽ lại bảng chỉnh */
let lastSel=null;setInterval(()=>{if(!open||tab!=='chinh'||!G())return;const s=AD().getSel();if(s!==lastSel){lastSel=s;const a=document.activeElement;if(!a||!a.closest||!a.closest('#adm'))draw()}},400);
/* gọi được từ console: BN_ADMIN.startPlay(10), BN_ADMIN.stopPlay(), BN_ADMIN.audit() */
Object.assign(A,{startPlay,stopPlay,audit,snap,restore});
document.addEventListener('DOMContentLoaded',draw);
})();
