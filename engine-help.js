/* Bách Niên Thế Gia · 7.0.0-d.1.5.44 · HẢO CẢM CÓ TÁC DỤNG THẬT (chủ dự án 27/11 "việc tăng hảo cảm các nhà, các người, các NPC không mang tác dụng gì thực tế … cơ chế bị tách biệt"; "duyệt, làm đi").
   Người quen (sổ NPC S.np.l) và các họ khác có quan hệ từ 40 (cao: từ 70) giúp NGAY TRONG việc người chơi đang làm; kẻ có quan hệ từ -30 trở xuống cản đúng việc đó.
   Giữ các luật có sẵn: người giúp phải đang ổn (G.tie.stable: không sa sút trong 6 năm, không mang oán, quý nhân từ bậc có thế); người ở xa không với tới (NPC có nơi ở, danh gia chỉ ở nơi của họ);
   Thường dân trở xuống không có họ khác tới giúp; đồng minh là bậc Đồng minh trở lên; vua và hoàng tộc không nằm trong số này.
   Mỗi lần giúp ghi "ai giúp, giúp gì" và dùng một phần ân tình (quan hệ -3, thân từ 70 thì -5); mỗi người chỉ giúp một loại việc một lần trong 12 tháng.
   Engine gọi: BNHELP.find(loại,{who}), BNHELP.foe(loại,{who}), BNHELP.use(người, loại, câu).
   Loại: trade (buôn bán), exam (khoa cử), office (xin thăng quan), law (kiện tụng), med (chữa bệnh), match (hôn sự), aid (lúc túng), ally (tranh chấp). */
(function(){
let X=null; /* engine nối vào: {S(), log, G} */
const S=()=>X.S();
/* chỉ xét chức danh đứng đầu lời mô tả ("con gái quan huyện", "bán quan tài" không phải quan) */
const word=list=>new RegExp('^((một|viên|vị|ông|bà|lão)\\s+)?('+list+')($|[\\s,.)])','iu');
const QUAN='quan(?!\\s+(tài|ải|hệ))';
const RX={trade:word('thương nhân|lái buôn|phú hộ|chủ tiệm|chủ hiệu|nhà buôn'),exam:word('thầy đồ|nho sĩ|tiến sĩ|cử nhân|'+QUAN),office:word(QUAN+'|tri huyện|tri phủ'),law:word(QUAN+'|tri huyện|tri phủ|thư lại|lại điển'),med:word('thầy thuốc|thầy lang|lang y|danh y|y sĩ')};
const VAI={trade:['thuong_nhan'],exam:['thay','quan','quy_nhan'],office:['quan','quy_nhan'],law:['quan','quy_nhan'],med:['thay_thuoc']};
function whoOf(w){const s=S();return w||(s.people||[]).find(p=>p.id===s.head)}
function npcOk(n,vai){try{return X.G.tie.stable(n,vai==='quy_nhan'?2:1)}catch(e){return false}}
/* mọi người và họ có thể với tới người đang làm việc */
function people(who){const s=S();const out=[];const w=whoOf(who);let here=null;try{here=X.G.placeOf(w)}catch(e){}
  const L=(s&&s.np&&s.np.l)||{};
  for(const k in L){const n=L[k];if(!n||n.ok===0||n.dead!=null||/^(emp|fam):/.test(n.ref||''))continue;if(Math.floor((s.t-n.born)/12)<18)continue;
    if(n.loc&&here&&n.loc!==here)continue;
    const vai=n.vai||[];
    out.push({key:'n:'+n.id,name:n.n,rel:n.rel||0,npc:n,stable:npcOk(n,vai.includes('quy_nhan')?'quy_nhan':''),tags:t=>{
      if(t==='aid')return (n.tier||0)>=2;if(t==='match'||t==='ally')return false;
      if(t==='office'&&(n.tier||0)<3)return false;
      return vai.some(v=>(VAI[t]||[]).includes(v))||!!(RX[t]&&RX[t].test((n.nghe||'')+' '+(n.job||'')))}})}
  try{if(X.G.tierIdx()>=2)(X.G.rel.refs()||[]).forEach(r=>{if(!r.at)return;const I=X.G.rel.info(r);if(!I)return;
    out.push({key:'h:'+(r.key||(r.t+':'+r.id)),name:I.name,rel:I.rel||0,house:r,stable:(I.wealth==null?50:I.wealth)>=35,tags:t=>t==='match'||(t==='ally'&&(I.band==='dongminh'||I.band==='trike'))||(t==='trade'&&(I.wealth||0)>=60)||((t==='office'||t==='law'||t==='exam')&&(I.tier||0)>=4)||(t==='aid'&&(I.wealth||0)>=55)})})}catch(e){}
  return out}
const cdOk=(h,kind)=>{const s=S();return ((s.helpCd||{})[kind+'|'+h.key]||-1e9)<=s.t-12};
function find(kind,opt){opt=opt||{};try{if(!X||!S())return null;
  const L=people(opt.who).filter(h=>h.rel>=40&&h.stable&&h.tags(kind)&&(opt.noCd||cdOk(h,kind))&&(!opt.not||h.name!==opt.not));
  if(!L.length)return null;L.sort((a,b)=>b.rel-a.rel);const h=L[0];h.lv=h.rel>=70?2:1;return h}catch(e){return null}}
function foe(kind,opt){opt=opt||{};try{if(!X||!S())return null;
  const L=people(opt.who).filter(h=>h.rel<=-30&&(h.tags(kind)||(h.house&&(kind==='trade'||kind==='match'))));
  if(!L.length)return null;L.sort((a,b)=>a.rel-b.rel);return L[0]}catch(e){return null}}
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
/* dùng ân tình: ghi chờ 12 tháng, giảm quan hệ một phần, ghi nhật ký; trả về dòng kết quả */
function use(h,kind,txt,opt){if(!h)return '';opt=opt||{};try{const s=S();s.helpCd=s.helpCd||{};if(!cdOk(h,kind))return '';s.helpCd[kind+'|'+h.key]=s.t;
  const d=opt.cost!=null?opt.cost:((h.lv||1)>1?5:3);
  if(d){if(h.npc)h.npc.rel=Math.max(-100,(h.npc.rel||0)-d);else if(h.house){const I=X.G.rel.info(h.house);if(I)I.rel0(-d)}}
  X.log(`${h.name} giúp: ${txt}.`,'gd');return `<span class="fx"><span class="up">${esc(h.name)} giúp: ${esc(txt)}</span>${d&&!(opt.autoRel&&h.house)?`<span class="down">Ân tình với ${esc(h.name)} −${d}</span>`:''}</span>`}catch(e){return ''}}
window.BNHELP={bind(ctx){X=ctx},find,foe,use,people};
})();
