/* Bách Niên Thế Gia v6.7.0-d1 · engine (v6.7.0-d1: khung đại cốt truyện, hạt giống thế giới, sử sách, hậu sử chung; v6.7.0-d0: tiền theo bậc, chi họ dời hộ, khóa cướp ngôi theo đường, thất bại là tru di, sự kiện thử; v6.6.0: sửa lỗi, thuế gia nghiệp, chi theo phần quỹ, kết thúc đa dạng, đối thủ, tầng quyết định; v6.5.4.2: sửa hệ số tiền áp nhầm cho khoản thu, eligibleWhy thêm lvr và hai điều kiện metadata; v6.5.4.1: hệ số tiền chỉ nhân mạnh cho sự kiện chi tiêu theo cỡ nhà; v6.5.4: kho sự kiện có metadata, gia tộc, kinh tế, học tập, chỉ số, nhánh rẽ đường lên ngôi; v6.5.3: gia chủ nhậm chức xa thì cả nhà dọn, bảng thời thế theo kinh thành, gia đình lính, sự kiện quân ngũ theo cấp; v6.5.2: gia phả ẩn người bị trục xuất và lọc theo chi, quan võ từ quan và cần trí, Đại tướng quân 1500 công, nơi ở của người nhậm chức; v6.5.1: vua đầu Trường Thịnh, tranh ngôi cuối đời, ba đường lên ngôi khó hơn; v6.4.1.8: ba đường cướp ngôi, lên ngôi, hậu sử; v6.4.1.7: hoàng đế và thiên hạ, kế vị, thanh trừng, danh hiệu cấp Thần, thiên mệnh, chiến tranh tại nơi ở, mốc chỉ số riêng; v6.4.1.6: tình duyên, chi họ xa ở nơi nhậm chức, gia đình người đi lính; v6.4.1.5.1: chỉ số lớn chậm theo tư chất, khoa thi khó hơn và tối đa 100 điểm, chức tạm khi chờ ghế, bỏ chú thích dưới lựa chọn, nội trợ, gia phả, họ khác; v6.4.1.5: quan hệ giữa các họ, hôn nhân và gả đi, họ gốc · hộ · chi, ruộng riêng cho chi, sửa lỗi test; v6.4.1.4: quan trường, phe phái, tội trạng, thang hậu quả tới tru di, sử ký quan trường; v6.4.1.3: quyền điều khiển và tự quyết theo tính cách, thư nhà, gia quy chia nhóm phạt, uy gia pháp, sửa hàng đợi sự kiện; v6.4.1.2: cân bằng độ khó: khoa cử theo chỉ tiêu, tước tích công trạng, bậc gia tộc, danh vọng cá nhân, kinh doanh, bớt hộp thoại; v6.4.1.1: trang admin, tàng thư theo hộ, người trông cơ sở, truyền việc khi nghỉ hưu, thu nhỏ gia phả) */
(function(){
'use strict';
/* ================= tiện ích ================= */
const {NAT,PROV,BORDER,DIS,REGIONS,DIST,SUBS,PERSONA,PATHS,STATS,SN,MS,SURN,MNAME,FNAME,HOMES,LIFE,TIERS,EXPECT,TK,TUOC,TUOC_PAY,TUOC_HOME,TUOC_LAND,RANKS,SALARY,VACANCY,ARMY,JOBS,STARTJOBS,FOCUS,SCHOOL,HABITS,TRAITS,CROPS,GOODS,ROUTES,ROLES,BIZ,RULES,WARS}=window.D;
const R=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
const pick=a=>a[Math.floor(Math.random()*a.length)];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const chance=p=>Math.random()<p;
const fmt=n=>Math.round(n).toLocaleString('vi-VN');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const strip=s=>String(s).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
/* tiền: đồng → chữ */
function cf(v,why){const o=S.fame;S.fame=Math.max(0,S.fame+v);const d=S.fame-o;if(d){S.fw=S.fw||{};S.fw[why]=(S.fw[why]||0)+d}return d}
function money(v,short){
  const neg=v<0;v=Math.abs(Math.round(v));let s;
  if(v>=1000000){const g=Math.floor(v/1000000),b=Math.floor((v%1000000)/1000);s=`${fmt(g)} vàng${b?` ${fmt(b)} bạc`:''}`}
  else if(v>=1000){const b=Math.floor(v/1000),d=v%1000;s=`${fmt(b)} bạc${d&&!short&&b<100?` ${fmt(d)} đồng`:''}`}
  else s=`${fmt(v)} đồng`;
  return (neg?'−':'')+s;
}
const ROLE_ST={tt:'Thông tuệ',sm:'Sức mạnh',kl:'Khéo léo',tl:'Tiềm lực'};

let S=null, sel=null, speed=1, running=false, acc=0, centerNext=true, page='giapha';

/* ================= lưu trữ ================= */
/* v6.4.1.1: trang admin lưu riêng, không đụng save của bản thường */
const ADK=window.BN_ADMIN?'.adm':'';
const KEY_OLD='bnthegia.save.v4'+ADK,KEY_META='bnthegia.v6.meta'+ADK,slotKey=n=>'bnthegia.v6'+ADK+'.slot'+n;
const lsGet=k=>{try{return localStorage.getItem(k)}catch(e){return null}};
const lsSet=(k,v)=>{try{localStorage.setItem(k,v);return true}catch(e){return false}};
const lsDel=k=>{try{localStorage.removeItem(k)}catch(e){}};
function meta(){try{return JSON.parse(lsGet(KEY_META))||{slots:{}}}catch(e){return {slots:{}}}}
function slotInfo(st){const a=st.people.filter(p=>p.dead==null&&!p.left).length;return {surname:st.surname,year:Math.floor(st.t/12)+1,n:a,at:Date.now(),over:!!st.over,tier:st.tierSeen||0,region:st.region}}
function save(){if(DRY||!S)return;const n=S.slot||1;if(!lsSet(slotKey(n),JSON.stringify(S)))return;const m=meta();m.slots[n]=slotInfo(S);m.last=n;lsSet(KEY_META,JSON.stringify(m))}
function load(n){try{const t=lsGet(slotKey(n));return t?JSON.parse(t):null}catch(e){return null}}
function loadOld(){try{const t=lsGet(KEY_OLD);return t?JSON.parse(t):null}catch(e){return null}}
function wipe(n){lsDel(slotKey(n));const m=meta();delete m.slots[n];if(m.last==n)m.last=null;lsSet(KEY_META,JSON.stringify(m))}

/* ================= thời gian ================= */
const dOf=t=>({y:Math.floor(t/12)+1,m:t%12+1});
const dateStr=t=>{const d=dOf(t);return `Tháng ${d.m} năm ${d.y}`};
const month=()=>S.t%12+1;
const season=()=>{const m=month();return m<=3?'xuan':m<=6?'ha':m<=9?'thu':'dong'};
const age=c=>Math.floor(((c.dead??(c.left==='luuvong'?c.leftT:null)??S.t)-c.born)/12);

/* ================= người ================= */
let uidN=0;const uid=()=>'p'+Date.now().toString(36)+(uidN++);
const P=id=>S.people.find(p=>p.id===id);
const nameOf=c=>c.surname+' '+c.given;
const inClan=p=>p.dead==null&&!p.left;
const alive=()=>S.people.filter(inClan);
const home=()=>alive().filter(p=>!p.away);
const spouseOf=c=>c&&c.spouse?P(c.spouse):null;
const kidsOf=c=>S.people.filter(p=>p.parents.includes(c.id));
const married=c=>{const s=spouseOf(c);return !!(s&&inClan(s))};
/* v6.4.1: lịch sử hôn nhân. Vẫn một vợ một chồng, nhưng người cũ (đã mất hoặc đã ly) được giữ trên gia phả.
   c.sph=[{id,k:'chanh'|'ke',t0,t1,e:null|'mat'|'ly'}]; e ghi vì sao cuộc hôn nhân này chấm dứt (với người còn sống). */
const sphEnd=(a,bid,e)=>{const m=(a.sph||[]).find(x=>x.id===bid&&x.t1==null);if(m){m.t1=S.t;m.e=e}};
const sphKind=a=>{const L=a.sph||[];return L.length&&L[L.length-1].e==='mat'?'ke':'chanh'};
const sphAdd=(a,b)=>{const k=sphKind(a);(a.sph=a.sph||[]).push({id:b.id,k,t0:S.t,t1:null,e:null})};
const lone=c=>alive().length===1&&age(c)<50;
const head=()=>P(S.head);
const isHead=c=>c&&c.id===S.head;

/* gen: mỗi chỉ số hai alen 15..100; tiềm năng = 0,65·alen lớn + 0,35·alen nhỏ */
function rollGenes(lift){const g={};STATS.forEach(([k])=>{if(k!=='suc')g[k]=[R(15,85)+(lift||0),R(15,85)+(lift||0)].map(v=>clamp(v,10,100))});g.suc=[R(40,100),R(40,100)];return g}
const pot=(c,k)=>{const a=c.gn&&c.gn[k];if(!a)return 60;const hi=Math.max(...a),lo=Math.min(...a);return hi*0.65+lo*0.35};
function rollTraitGenes(){const tg={};for(const k in TRAITS){const T=TRAITS[k];if(!T.gene)continue;tg[k]=(chance(T.p)?1:0)+(chance(T.p)?1:0)}return tg}
function expressed(c,k){const T=TRAITS[k];if(!T)return false;if(c.traits.includes(k))return true;if(!T.gene||!c.tg)return false;const n=c.tg[k]||0;return T.gene==='D'?n>=1:n>=2}
function traitsOf(c){const s=new Set(c.traits);if(c.tg)for(const k in c.tg)if(TRAITS[k]&&expressed(c,k))s.add(k);axLabels(c).forEach(t=>s.add(t));if(c.degree>0)s.add('dg_'+Math.min(3,c.degree));if(c.tuoc>0)s.add('tu_'+Math.min(5,c.tuoc));return [...s]}
const realTraits=c=>traitsOf(c).filter(t=>!TRAITS[t].ax&&!TRAITS[t].ct);
const has=(c,t)=>traitsOf(c).includes(t);
function tsum(c,key){let v=0;traitsOf(c).forEach(t=>{const T=TRAITS[t];if(typeof T[key]==='number')v+=T[key]});return v}
function addTrait(c,t){if(TRAITS[t]&&TRAITS[t].ax){if(axLabels(c).includes(t))return false;setLabel(c,t,true);return true}if(!c.traits.includes(t)&&!expressed(c,t)){c.traits.push(t);const dz=TRAITS[t]&&TRAITS[t].duyen;if(dz&&c.duyen!=null&&c.nat0)c.duyen=clamp(c.duyen+dz,1,100);return true}return false}
/* v6.3.4: nhận đặc tính giữa chừng (sự kiện, kỳ ngộ) thì gen và chỉ số phải khớp theo, không để "khuynh thành" mà mị lực vẫn như người thường */
function addTraitEv(c,t){
  const T=TRAITS[t];if(!T||T.ax||T.ct||!c.gn)return addTrait(c,t);
  const before=innateMap(c);const ok=addTrait(c,t);if(!ok)return ok;
  if(!T.grow&&!T.growAll&&!T.capUp)return ok;
  innateGenes(c);
  const after=innateMap(c);const a=age(c);
  if(c.nat0&&T.gene){
    if(a<18){catchUpYoung(c)}
    else for(const k in after){if(k==='suc')continue;const n=after[k],b=before[k]||{min:0,plus:0};
      if(n.min>b.min||n.plus>b.plus)c[k]=clamp(Math.max(c[k],n.min)+Math.max(0,n.plus-b.plus),5,100)}}
  else if(c.nat0&&a<18)catchUpYoung(c);
  return ok}
function removeTrait(c,t){if(TRAITS[t]&&TRAITS[t].ax){setLabel(c,t,false);return}const had=c.traits.includes(t);c.traits=c.traits.filter(x=>x!==t);if(c.tg&&c.tg[t]&&expressed(c,t))c.tg[t]=0;const dz=had&&TRAITS[t]&&TRAITS[t].duyen;if(dz&&c.duyen!=null)c.duyen=clamp(c.duyen-dz,1,100)}
function randomTraits(c){
  const pool=Object.keys(TRAITS).filter(k=>!TRAITS[k].gene&&!TRAITS[k].ax&&!TRAITS[k].ct&&!TRAITS[k].tm&&!TRAITS[k].than); /* v6.6.0: danh hiệu Thần và thiên mệnh không bao giờ được bốc ngẫu nhiên */
  const n=chance(0.5)?1:chance(0.3)?2:0;
  for(let i=0;i<n;i++){const k=pick(pool);const T=TRAITS[k];if(T.c==='p'&&!chance(0.15))continue;addTrait(c,k)}
}
const capOf=(c,k)=>Math.min(hardCap(c,k),gateCap(c,k)+((tsum2(c,'capUp')[k])||0));
function tsum2(c,key){const o={};traitsOf(c).forEach(t=>{const T=TRAITS[t];if(T[key])for(const k in T[key])o[k]=(o[k]||0)+T[key][k]});return o}

function mkPerson(o){
  const isYoungMk=!!o.young;
  const g=o.g||(chance(0.5)?'nam':'nữ');const a=o.age||0;
  const on=o.surname?null:outsiderName(g);
  const c={id:uid(),g,surname:o.surname||on.surname,given:o.given||(on?on.given:mkGiven(g)),
    born:S.t-a*12-R(0,11),cap:{tri:100,vo:100,suc:100,mi:100,eq:100},decl:R(32,42),
    job:'none',lv:0,m:0,bonus:0,liem:R(35,75),focus:'nghi',tam:R(45,70),spouse:null,parents:[],inLaw:false,dead:null,left:null,
    ms:{},mms:{},msRetry:{},exam:null,degree:0,gen:1,school:'nha',pre:{},habits:[],wantChild:false,preg:null,away:null,flags:{},seen:{},
    fame:0,tuoc:0,duyen:R(10,90),traits:[],gn:o.gn||rollGenes(o.lift),tg:o.tg||rollTraitGenes(),hh:o.hh||(S.hh?mainHH():'h0'),merit:0,purse:0,biz:null};
  if(o.traits!==false)randomTraits(c);
  innateGenes(c);
  if(!o.young){STATS.forEach(([k])=>{c[k]=k==='suc'?clamp(Math.round(pot(c,'suc')*R(80,100)/100),40,100):clamp(Math.round(pot(c,k)*R(45,80)/100),5,95)})}
  else STATS.forEach(([k])=>c[k]=k==='suc'?R(55,90):clamp(Math.round(pot(c,k)*0.12)+R(1,6),1,30));
  innateStats(c,c,!!o.young);
  c.cap.suc=Math.max(c.suc,R(85,100));
  c.duyen=clamp(c.duyen+tsum(c,'duyen'),1,100);
  ['g','surname','given','age','young','gn','tg','lift','traits','hh'].forEach(k=>delete o[k]);
  Object.assign(c,o);
  ensureNat(c,!isYoungMk);
  return c;
}

/* ================= hộ gia đình ================= */
const mainHH=()=>{const h=head();return h?h.hh:'h0'};
const HH=id=>S.hh[id];
const hhMembers=id=>home().filter(p=>p.hh===id);
const hhCount=id=>alive().filter(p=>p.hh===id&&!(p.away&&p.away.type!=='trade')).length;

/* ================= gia thế ================= */
function landValue(){return S.farm.own*8000+S.farm.fief*8000}
function wealth(){
  let v=S.money+landValue();
  for(const id in S.hh){const h=S.hh[id];if(h.sold)continue;for(let i=1;i<=h.home;i++)v+=HOMES[i].cost*0.7;if(h.money)v+=h.money*0.6}
  alive().forEach(p=>{if(inClan(p)&&p.purse>0)v+=p.purse*0.4});
  S.biz.forEach(b=>{const B=BIZ[b.type];for(let i=0;i<=b.lv;i++)v+=B.lv[i][1]*0.6});
  for(const k in S.kho)v+=S.kho[k]*GOODS[k].p;
  return Math.max(0,v);
}
const clanTuoc=()=>alive().reduce((m,p)=>Math.max(m,p.tuoc||0),0);
/* v6.4.1.2: tước chỉ cộng 300 điểm mỗi bậc (trước 1.500) */
function tierScore(){return S.fame+wealth()/1000+clanTuoc()*300+(S.royal?50000:0)}
/* v6.4.1.2: Thế gia và Danh môn vọng tộc cần thêm điều kiện ngoài của cải: danh vọng gia tộc, số đời, người làm quan to hoặc có tước.
   Điều kiện đạt thì được giữ thêm 30 năm; quá 30 năm không còn ai đủ thì hạ bậc. */
const clanGens=()=>{const g=S.people.filter(p=>inClan(p)||p.dead!=null).map(p=>p.gen||1);return g.length?Math.max(...g):1};
const bigOff=(lq,lm,tu)=>alive().some(p=>inClan(p)&&((p.job==='quan'&&p.lv>=lq)||(p.job==='quan_ngu'&&p.lv>=lm)||(p.tuoc||0)>=tu));
/* v6.5.4: Tiểu hộ khá giả cần ít nhất một sản nghiệp kinh doanh; Hương thân cần nhà có người làm quan; Thế gia thêm: sản nghiệp, người làm quan, thu nhập từ 50 bạc một tháng; Danh môn vọng tộc cần người giữ tước từ Hầu tước */
const hasBizOwn=()=>S.biz.length>0,hasOffAny=()=>alive().some(p=>inClan(p)&&['quan','quan_ngu'].includes(p.job));
/* v6.6.0: căn cơ làm ăn có thể là cơ sở, ruộng, quan chức hoặc tước, không bắt buộc riêng cơ sở kinh doanh */
const hasBase=()=>S.biz.length>0||(S.farm&&(S.farm.own>0||S.farm.fief>0))||hasOffAny()||clanTuoc()>0;
const TIER_GATE={5:{fame:250,gen:3,ok:()=>bigOff(6,6,3)&&totalIncome()>=50000,txt:'danh vọng gia tộc từ 250, từ đời thứ ba, có sản nghiệp kinh doanh, có người làm quan từ Tam phẩm (hoặc Tướng quân) hoặc có tước từ Bá tước, thu nhập từ 50 bạc một tháng'},
  6:{fame:500,gen:4,ok:()=>bigOff(7,7,4)&&clanTuoc()>=4,txt:'danh vọng gia tộc từ 500, từ đời thứ tư, có người làm quan từ Nhị phẩm (hoặc Đại tướng quân) và có người giữ tước từ Hầu tước'}};
function tierGateOk(k){const T=TIER_GATE[k];if(!T)return true;S.tgT=S.tgT||{};
  if(S.fame>=T.fame&&clanGens()>=T.gen&&T.ok())S.tgT[k]=S.t;
  return S.tgT[k]!=null&&S.t-S.tgT[k]<=360}
function tierIdx(){const s=tierScore();let i=0;TIERS.forEach(([,v],k)=>{if(s>=v)i=k});
  if(!S.royal){if(i>=6&&!tierGateOk(6))i=5;if(i>=5&&!tierGateOk(5))i=4;
    if(i>=2&&!hasBase())i=1; /* chưa có căn cơ (cơ sở, ruộng, quan, tước) thì chưa thể khá giả */
    if(i===3&&!(hasOffAny()||S.biz.length>=2||clanTuoc()>0))i=2} /* Hương thân: có người làm quan, hoặc từ hai cơ sở, hoặc có tước */
  return i}
function tierName(){return S.royal?'Hoàng tộc':TIERS[tierIdx()][0]}
/* v6.3.5: uy gia chủ. Làm gia chủ thì được cộng thẳng vào cả năm chỉ số, mức theo địa vị gia tộc: Bần hộ 0 đến Danh môn vọng tộc +10.
   Là phần của chức, không phải của người: đổi gia chủ thì người cũ mất, người mới được; địa vị lên xuống thì mức cộng lên xuống theo. */
const HEADB=[0,2,3,5,7,8,10];
const headBonus=()=>S.royal?10:(HEADB[tierIdx()]||0);
function headBSync(){
  if(!S||!S.people)return;const hb=headBonus();
  S.people.forEach(p=>{
    const cur=p.hb||0;const want=(p.dead==null&&!p.left&&p.id===S.head)?hb:0;
    if(want===cur)return;
    p.hb=want;if(!want)delete p.hb;
    if(p.dead!=null||p.left)return;
    const d=want-cur;
    ['tri','vo','mi','eq'].forEach(k=>{p.cap[k]=Math.max(1,p.cap[k]+d);p[k]=Math.max(0,p[k]+d)});
    p.cap.suc=Math.max(10,p.cap.suc+d);p.suc=clamp(p.suc+d,1,p.cap.suc);
    if(cur>0&&want>0&&!DRY)log(`Địa vị gia tộc ${d>0?'lên':'xuống'}, uy gia chủ của ${p.given} ${d>0?'thêm':'bớt'} ${Math.abs(d)} mọi chỉ số (nay +${want}).`,d>0?'gd':'hi')
  })}
let MMCTX=null;
/* v6.7.0: tiền trong sự kiện theo bảng cố định theo bậc gia thế (bảy bậc). Cỡ việc v: nhỏ 10, vừa 30, lớn 100, đại 300.
   CHI: việc chi theo cỡ nhà (e.ms); THU: khoản nhận (e.th); NHE: việc lặt vặt (mặc định). */
const MM_CHI=[1,2,4,10,30,100,300],MM_THU=[1,1.5,2.5,4,7,12,20],MM_NHE=[1,1.3,1.8,2.5,3.5,5,7];
const TC={s:null,t:-1,v:0};
const tierNow=()=>{if(!S)return 0;if(TC.s===S&&TC.t===S.t)return TC.v;let v=0;try{v=tierIdx()}catch(e){}TC.s=S;TC.t=S.t;TC.v=v;return v};
const mm=v=>{const tb=MMCTX&&MMCTX.ms?MM_CHI:MMCTX&&MMCTX.th?MM_THU:MM_NHE;return Math.round(v*60*tb[Math.max(0,Math.min(6,tierNow()))])};
const MS_RE=/tiệc|yến tiệc|đám cưới|lễ cưới|sính|mừng thọ|lễ mừng|đám tang|tang lễ|biếu|hối lộ|quyên|từ thiện|chủ tế|khao quân|cúng|xây từ đường|xây nhà|sửa nhà|tế lễ|lễ vật|trọng thưởng|chiêu đãi/i;
/* v6.5.4.2: sự kiện có chữ biếu/hối lộ/tiệc nhưng là NHẬN tiền hoặc chi nhỏ thì không dùng hệ số mạnh */
const MS_NO=new Set(['n633_quan_le','qt3_nhan_thay','nd631_hoi_lo','q_hoi_lo','n633_bep_doc']);
/* v6.6.0: thêm các việc vay mượn, góp tiền, cháy nhà, cứu đói, hùn vốn, các bước mưu đại sự vào nhóm chi theo cỡ nhà */
const MS_YES=new Set(['hoi_lang_xuan','quyen_gop_dinh','chay_nha','n_kho_cuu_doi','noi_gio','tai_cuu_doi','hh_hoa_hoan','v6_ban_vay','w63_ho_xin_vay','w631_ho_gop_dinh','c631_chay_nha_lang','c631_cau_ben_lang','c631_phat_gao_cuu_doi','c631_hoi_lang_xuan','vil_l_dan','vil_p_dot','n633_chu_hun','v61_gop_xay_tu_duong','c631_den_chua_cau_an','hau631_chuoc_than','br_dong_gop','tet_nguyen_dan','chuan_bi_tet','ky_niem_cuoi','n_thue_nguoi','qh_mo_truong','qh_tro_gioi','hr631_mua_tet','c631_don_thay_day','h_ng_duyet','h_ng_nguaquy','h_du_phatthuoc','v62_q_quyen_quy_moi','n633_y_ngheo','qn653_ban_no','thuoc_bo','su_so_sach','vil_bd_chan']); /* v6.7.0-d1: thêm theo bản rà tiền */
function wrapEvMoney(){
  EVENTS.forEach(e=>{if(e._mw)return;e._mw=1;if(e.ms===undefined)e.ms=!e.ky&&!MS_NO.has(e.id)&&(MS_YES.has(e.id)||/^(ts_|rv_|wl_)/.test(e.id)||MS_RE.test(typeof e.t==='string'?e.t:''));
    const wf=f=>typeof f==='function'?function(){const p=MMCTX;MMCTX=e;try{return f.apply(this,arguments)}finally{MMCTX=p}}:f;
    const wo=arr=>Array.isArray(arr)?arr.map(o=>{if(!o||typeof o!=='object')return o;const q=Object.assign({},o);['f','y','n','yy','nn','c'].forEach(k=>{if(q[k])q[k]=wf(q[k])});return q}):arr;
    if(typeof e.o==='function'){const o0=e.o;e.o=function(){const p=MMCTX;MMCTX=e;try{return wo(o0.apply(this,arguments))}finally{MMCTX=p}}}else e.o=wo(e.o);
    if(typeof e.x==='function')e.x=wf(e.x);if(typeof e.c==='function')e.c=wf(e.c)})}
const famLuck=()=>{const a=alive();return a.length?a.reduce((s,p)=>s+p.duyen,0)/a.length:50};

/* ================= tỉ lệ thành công ================= */
function cond(c){return 0.55+0.25*c.tam/100+0.2*Math.min(1,c.suc/70)+tsum(c,'cond')+(S.on-50)/600+(S.hung-50)/800}
function prob(c,spec,diff){
  /* v6.5.4: mị lực chỉ là một phần nhỏ của giao tiếp; khẩu tài, mưu, quản lý còn cần trí tuệ */
  const multi=Object.keys(spec).length>1;let triAdd=0;if(spec.tri==null)for(const k of ['khau','muu','ql'])if(spec[k])triAdd+=spec[k]*0.35;
  let v=0,w=0;for(const k in spec){const val=k==='m'?c.m:k==='fame'?Math.min(150,(c.fame+S.fame*0.2)/4):k==='duyen'?c.duyen:SKN[k]?skv(c,k):AXN[k]?axv(c,k):c[k];const sw=(k==='mi'&&multi)?spec[k]*0.5:spec[k];v+=val*sw;w+=sw}
  if(triAdd){v+=c.tri*triAdd;w+=triAdd}
  const eff=(w?v/w:50)*cond(c)+(c.duyen-50)/25;
  return clamp(1/(1+Math.exp(-(eff-diff)/9)),0.03,0.97);
}
const roll=(c,spec,diff)=>chance(prob(c,spec,diff));

/* ================= chỉ số và hiệu ứng ================= */
/* v6.3.4: được khen thưởng thì vui lâu, không chỉ nhích lên một tháng rồi tụt lại; vui nhiều tháng sau, rồi nhạt dần */
function cheer(c,v,months){if(!c||c.dead!=null||!v)return;const o=c.flags.cheer;const cur=o&&o.until>S.t?o.v*(o.until-S.t)/o.dur:0;
  c.flags.cheer={v:clamp(cur+v,-12,12),until:S.t+months,dur:months};addStat(c,'tam',v)}
function addStat(c,k,v,over){
  if(k==='tam'){const o=c.tam;c.tam=clamp(c.tam+v,0,100);return c.tam-o}
  if(k==='duyen'){const o=c.duyen;c.duyen=clamp(c.duyen+v,1,100);return c.duyen-o}
  const old=c[k];const cap=k==='suc'?c.cap.suc:Math.max(capOf(c,k),c.cap[k]);
  if(v>0){if(over)c.cap[k]=Math.max(c.cap[k],Math.min(hardCap(c,k),gateCap(c,k)+5,old+v));const top=over?Math.max(c.cap[k],cap):cap;c[k]=Math.min(Math.max(old,top),old+v)}
  else c[k]=Math.max(0,old+v);
  return c[k]-old;
}
function fx(c,d){
  if(!c)return '';
  const out=[];const over=!!d.over;let close=false;
  for(const k in d){const v=d[k];if(['over','lethal','habit','unhabit','trait','untrait','ax','sk'].includes(k)||!v)continue;
    if(k==='money'){const lb=isHead(c)||(age(c)<16&&inMain(c))?'Công quỹ':!inMain(c)&&S.hh[c.hh]?'Quỹ hộ':v>0?'Tiền riêng':'Tiền';if(v>0)gain(c,v);else charge(c,-v);out.push([lb,v,'$'])}
    else if(k==='purse'){c.purse+=v;out.push(['Túi riêng',v,'$'])}
    else if(k==='fame'){const o=c.fame;c.fame+=v;cf(v*0.3,v>=0?'Thành viên được tiếng tốt (kỳ ngộ)':'Thành viên mang tiếng xấu (kỳ ngộ)');out.push(['Danh vọng',Math.round(c.fame-o)])}
    else if(k==='cfame'){const o=S.fame;cf(v,v>=0?'Kỳ ngộ của gia tộc':'Kỳ ngộ bất lợi cho gia tộc');out.push(['Danh vọng gia tộc',Math.round(S.fame-o)])}
    else if(k==='hung'){const o=S.hung;S.hung=clamp(S.hung+v,0,100);out.push(['Hưng thịnh',Math.round(S.hung-o)])}
    else if(k==='on'){const o=S.on;S.on=clamp(S.on+v,0,100);out.push(['Ổn định',Math.round(S.on-o)])}
    else if(k==='m'){const o=c.m;c.m=clamp(c.m+v,0,120);out.push(['Thông thạo',Math.round((c.m-o)*10)/10])}
    else if(k==='merit'){c.merit=Math.max(0,c.merit+v*(1+tsum(c,'merit')+(v>0&&rule('thuongvo')?0.2:0)));out.push(['Chiến công',v])}
    else if(k==='lv'&&c.job==='quan'){const o=c.lv;const nr=clamp(c.lv+v,0,8);if(nr!==o){const r=appoint(c,nr,true);out.push([`Chức: ${seatName(r.key)}`,v>0?'+':'-']);if(nr>o&&!DRY)achieve(c,`thăng làm ${seatName(r.key)}`)}}
    else if(k==='lv'){const L=JOBS[c.job].lv.length;const o=c.lv;c.lv=clamp(c.lv+v,0,L-1);if(c.lv!==o)out.push(['Bậc',c.lv-o]);if(c.lv>o&&!DRY)achieve(c,`lên làm ${JOBS[c.job].lv[c.lv].n.toLowerCase()}`)}
    else if(k==='cheer'){cheer(c,v,8);out.push(['Tâm trạng khá lên một thời gian',v>0?'+':'-'])}
    else if(k==='bonus'){c.bonus=clamp(c.bonus+v,-0.5,3);out.push(['Thu nhập',(v>0?'+':'')+Math.round(v*100)+'%'])}
    else if(k==='liem'){const o=c.liem;c.liem=clamp(c.liem+v,0,100);out.push(['Liêm chính',c.liem-o])}
    else if(['cor','risk','fav','loy'].includes(k)){const q=qtOf(c);const o=q[k];qtAdd(c,{[k]:v});const dv=Math.round(q[k]-o);if(dv)out.push([{cor:'Sai phạm',risk:'Nguy cơ bị tra',fav:'Thánh ân',loy:'Trung thành với phe'}[k],(['cor','risk'].includes(k)?-1:1)*dv>0?'+':'-'])}
    else if(k==='hpMax'){const o=c.cap.suc;c.cap.suc=clamp(c.cap.suc+v,1,v>0?Math.max(c.cap.suc,Math.min(hardCap(c,'suc'),gateCap(c,'suc'))):hardCap(c,'suc'));if(c.suc>c.cap.suc)c.suc=c.cap.suc;out.push(['Sức khỏe tối đa',c.cap.suc-o])}
    else if(SN[k]){const r=addStat(c,k,v,over);if(r)out.push([SN[k],Math.round(r)]);if(k==='suc'&&c.suc<=0&&((!d.lethal&&age(c)<55)||lone(c))){c.suc=1;close=true}}
  }
  if(d.habit&&HABITS[d.habit]){if(addHabit(c,d.habit,25))out.push([(isVice(d.habit)?'Tật xấu: ':'Thói quen: ')+HABITS[d.habit].n,isVice(d.habit)?'-':'+'])}
  if(d.unhabit&&c.habits.includes(d.unhabit)){const nat=c.vnat&&c.vnat[d.unhabit];cutVice(c,d.unhabit,100);out.push([(c.habits.includes(d.unhabit)?'Bớt được: ':'Bỏ được: ')+HABITS[d.unhabit].n,isVice(d.unhabit)?'+':'-'])}
  if(d.sk)for(const k in d.sk){const r=addSk(c,k,d.sk[k]);if(Math.round(r))out.push([SKN[k],Math.round(r)])}
  if(d.trait&&addTrait(c,d.trait)){const T=TRAITS[d.trait];out.push([`Đặc tính: ${T.n}`,T.c==='r'?'-':'+',T.c])}
  if(d.untrait&&has(c,d.untrait)){removeTrait(c,d.untrait);out.push([`Mất đặc tính: ${TRAITS[d.untrait].n}`,TRAITS[d.untrait].c==='r'?'+':'-'])}
  if(close)out.push(['Thập tử nhất sinh','-']);
  const axs=d.ax?shiftAx(c,d.ax):'';
  const shown=out.filter(([,v])=>v!==0); /* v6.7.0-d1: hiện đủ mọi dòng cộng trừ, kể cả ±1 */
  if(!shown.length)return axs;
  return `<span class="fx">${shown.map(([n,v,t])=>{const num=typeof v==='number';const pos=num?v>0:!String(v).startsWith('-');
    const cls=t==='p'?'purple':pos?'up':'down';
    return `<span class="${cls}">${n}${num?' '+(v>0?'+':'')+(t==='$'?money(v):fmt(v)):(v==='+'||v==='-'?'':' '+v)}</span>`}).join('')}</span>`+axs;
}
function fxAll(d){alive().forEach(p=>fx(p,d));return ''}

/* ================= kinh tế ================= */
const atHome=c=>!c.away;
function jobInc(c){
  const J=JOBS[c.job];const L=J.lv[Math.min(c.lv,J.lv.length-1)];
  return J.inc*(L.mul||1);
}
/* v6.3.4: danh hiệu làm thu nhập các nghề hợp với nó cao hơn */
function titleInc(c){let v=0;traitsOf(c).forEach(t=>{const T=TRAITS[t];if(T&&T.inc&&(!T.incJobs||T.incJobs.includes(c.job)))v+=T.inc});return v}
function income(c){
  if(!inClan(c)||age(c)<16)return 0;
  if(c.away&&c.away.type==='trade')return 0;
  if(c.away&&['jh','odo','sep'].includes(c.away.type))return 0;
  const moodF=0.85+0.3*c.tam/100;const hung=0.9+S.hung/500;
  const ti=1+titleInc(c);
  if(c.job==='quan'){const O0=c.post?window.D.OFFICES[c.post]:null;return Math.round(SALARY[c.lv]*(O0?O0.mul:1)*(0.9+c.m/250)*(1+c.bonus)*ti)}
  if(c.job==='quan_ngu'){const O1=c.post?window.D.OFFICES[c.post]:null;return Math.round(ARMY[c.lv][1]*0.7*ti*(O1&&O1.mil?O1.mul:1))};
  if(c.job==='chu')return 0;
  /* v6.4.1.5: tá điền ở chi họ: làm ruộng của chi, ruộng chi không đủ thì đi cày thuê; tiền vào quỹ chi */
  if(c.job==='nong'){if(inMain(c))return 0;const H=S.hh[c.hh];const fs=alive().filter(p=>p.hh===c.hh&&p.job==='nong'&&age(p)>=16&&inClan(p)).length||1;
    const own=Math.min((H&&H.land||0)/fs,4+c.m/40);const crop=own*CROPS.lua.y/12*mk('lua')*(0.8+c.m/200);const hire=Math.max(0,1-own/(4+c.m/40))*450*(1+c.m/90);
    return Math.max(0,Math.round((crop+hire)*moodF*(S.disaster?0.6:1)))}
  const J=JOBS[c.job];if(!J.inc)return 0;
  let v=jobInc(c)*(1+c.m/90)*(1+c.bonus)*moodF*hung*viceWork(c);
  if(c.job==='ngu'&&season()==='dong')v*=0.5;
  if(pieceJob(c))v*=pieceF(c);
  v*=1+fameInc(c);v*=ti;
  return Math.max(0,Math.round(v));
}
const sideIncome=c=>{if(c.job!=='quan'||!inClan(c)||c.away)return 0;const O0=c.post?window.D.OFFICES[c.post]:null;return Math.round(SALARY[c.lv]*(100-c.liem)/100*2*(O0?O0.side:1)*(rule('thanhliem')?0.5:1))};
const titlePay=()=>alive().reduce((s,p)=>s+TUOC_PAY[p.tuoc||0],0)+(S.royal?300000:0);
const fiefIncome=()=>toIncome();
function personalSpend(c){
  const a=age(c);if(c.away&&c.away.type!=='trade'&&c.away.type!=='follow')return {base:0,ranh:0,hoc:0,thoi:0};
  const h=HH(c.hh)||HH(mainHH());const L=LIFE[h.life];
  let base=(a<6?0.4:a<16?0.6:1)*L[1]*(1+h.home*0.12);
  if(c.job==='hau'&&a>=16)base*=0.4;
  let ranh=0,hoc=0,thoi=0;
  if(a>=6&&a<18&&c.school!=='nha'){const lvl=a<10?1:a<14?2:3;const sc=SCHOOL[lvl][c.school];if(sc){hoc=sc.fee*(clanLv()>=4?0.5:1);if(sc.chore)base*=0.6}}
  if(a>=6){const F=FOCUS[c.focus]||FOCUS.nghi;ranh=F.cost>0?F.cost*(1+h.life*0.25):0}
  c.habits.forEach(x=>thoi+=HABITS[x].cost*(1+h.life*0.2)*(isVice(x)?0.3+vlv(c,x)/70:1));
  const sp=1+tsum(c,'spend');
  return {base:base*sp,ranh:ranh>0?ranh*sp:ranh,hoc,thoi:thoi*sp};
}
function hhExpense(id){
  const h=HH(id);const mem=alive().filter(p=>p.hh===id);
  const parts={sinh:0,nha:HOMES[h.home].upkeep,ranh:0,hoc:0,thoi:0};
  mem.forEach(p=>{const s=personalSpend(p);parts.sinh+=s.base;parts.ranh+=s.ranh;parts.hoc+=s.hoc;parts.thoi+=s.thoi});
  const total=(parts.sinh+parts.nha+parts.ranh+parts.hoc+parts.thoi)*hhFactor(id);
  return {total:Math.round(total),parts};
}
function expenses(){
  const parts={sinh:0,nha:0,ranh:0,hoc:0,thoi:0,ruong:0,kd:0};let total=0;
  for(const id in S.hh){if(!alive().some(p=>p.hh===id))continue;const e=hhExpense(id);total+=e.total;for(const k in e.parts)parts[k]+=e.parts[k]}
  parts.ruong=S.farm.hired*450;total+=parts.ruong;
  return {total:Math.round(total),parts};
}
function totalIncome(){
  let v=alive().reduce((a,p)=>a+income(p)+sideIncome(p),0)+titlePay()+fiefIncome();
  if(S.rules.includes('nghia'))v*=0.98;
  return Math.round(v);
}

/* ================= thị trường ================= */
const mk=g=>S.mk[g]||1;
function marketTick(){
  for(const g in GOODS){let v=S.mk[g]||1;v+= (1-v)*0.08+(Math.random()-0.5)*0.12;
    if(S.war&&['sat','lua','muoi'].includes(g))v+=0.02;
    if(S.epi&&g==='duoc')v+=0.05;
    if(S.disaster&&['lua','ngo'].includes(g))v+=0.03;
    S.mk[g]=clamp(v,0.45,2.6)}
}
const REG=()=>REGIONS[S.region||'trung'];
const regP=(g,r)=>(r||!S||!S.w||!S.loc||!PROV[S.loc.p])?(REGIONS[r||(S&&S.region)||'trung'].p[g]||1):locP(S.loc.p,g);
const rule=k=>S.rules.includes(k);
const priceOf=g=>Math.round(GOODS[g].p*mk(g)*regP(g));

/* ================= nhật ký ================= */
function log(m,c){if(DRY)return;S.log.unshift({t:dateStr(S.t),m:strip(m),c:c||''});if(S.log.length>250)S.log.length=250}

/* ================= hàng đợi, lên lịch ================= */
function enqueue(kind,cid,data,front){const it=Object.assign({kind,cid},data||{});front?S.queue.unshift(it):S.queue.push(it)}
function later(c,ev,months,data){S.sched.push({t:S.t+Math.max(1,months),cid:c.id,ev,data:data||{}})}
/* ================= khởi tạo ================= */
function newGame(o){
  S={t:0,money:0,fame:0,hung:25,on:60,royal:0,people:[],head:null,queue:[],sched:[],cool:{},log:[],won:{},over:false,lastNet:null,
    epi:false,epiRisk:0,war:null,recruit:0,disaster:null,tierSeen:0,hh:{h0:{home:0,life:1,name:'Nhà chính'}},
    farm:{own:0,rent:0,fief:0,hired:0,alloc:{lua:0},store:false,unlock:['lua','ngo','dau','bong','che','mia']},mk:{},kho:{},biz:[],trips:[],cand:[],candT:-1,rules:[],surname:o.surname,region:o.region||'trung',ruleT:-99,ver:6.2,slot:o.slot||1,poem:o.poem??null,origin:o.origin||null,kyT:{},opt:{preview:false},ver:6.3};
  S.dyn=mkDyn(0,true);
  (REGIONS[S.region].unlock||[]).forEach(k=>{if(!S.farm.unlock.includes(k))S.farm.unlock.push(k)});
  for(const g in GOODS)S.mk[g]=0.9+Math.random()*0.2;
  const h=mkPerson({g:o.g,surname:o.surname,given:o.given,age:18,gn:o.gn,tg:o.tg,hh:'h0',traits:false});
  STATS.forEach(([k])=>h[k]=o.stats[k]);h.cap.suc=Math.max(h.suc,R(85,100));h.duyen=o.duyen;h.traits=o.traits.slice();h.nat0=null;ensureNat(h,true);
  h.focus='nghi';h.job=o.job;
  ensurePersona(h);const OR=ORIGINS[o.origin];if(OR){for(const k in OR.ax||{})h.sub[k]=clamp(h.sub[k]+OR.ax[k],0,100);harmonize(h.sub);h.nat=Object.assign({},h.sub);for(const k in OR.sk||{})h.sk[k]=clamp(h.sk[k]+OR.sk[k],0,100)}
  STATS.forEach(([k])=>h.ms[k]=MS.filter(t=>h[k]>=t));
  S.people.push(h);S.head=h.id;sel=h.id;
  /* v6.7.0-d1: khởi đầu có thể mang sẵn thói quen tốt rẻ tiền, đôi khi một tật xấu nhẹ, và một đặc tính tốt */
  if(chance(0.55)){const k=pick(['chay','chay','chim','dacsu']);if(!h.habits.includes(k))h.habits.push(k)}
  if(chance(0.2)){const v=pick(['ruou','bac','donhau']);if(!h.habits.includes(v)){h.habits.push(v);h.vlv=h.vlv||{};h.vlv[v]=R(15,30);h.vt=h.vt||{};h.vt[v]=0}}
  if(chance(0.4)){const pool=Object.keys(TRAITS).filter(k=>!TRAITS[k].gene&&!TRAITS[k].ax&&!TRAITS[k].ct&&!TRAITS[k].tm&&!TRAITS[k].than&&TRAITS[k].c==='g');if(pool.length)addTrait(h,pick(pool))}
  // của khởi nghiệp tương đương 1 mẫu ruộng
  if(o.job==='nong'){S.farm.own=1;S.farm.rent=3;S.farm.alloc.lua=4;S.money=600}
  else if(o.job==='ngu'){S.money=1500}
  else if(o.job==='chan'){S.money=2500}
  else S.money=6000+600;
  if(o.job==='hau')S.money=8600;
  ensureEcon();h.kidW=R(45,90);w_ensure(S);worldInit();
  log(`${nameOf(h)} mười tám tuổi, xuất thân ${OR?OR.n.toLowerCase():'bình dân'}, dựng lều tranh ở ${locName()}, ${REGIONS[S.region].n}, lập nghiệp, làm ${JOBS[o.job].lv[0].n.toLowerCase()}. Của khởi nghiệp: ${JOBS[o.job].gift}.`,'gd');
}

/* ================= vòng tháng ================= */
function advance(){
  if(!alive().length)return;
  S.t++;const mo=month();
  marketTick();
  for(const c of alive()){
    const a=age(c);
    if((S.t-c.born)%12===0){onBirthday(c,a);if(!inClan(c))continue}
    monthlyPerson(c,a);
    if(inClan(c))checkMilestones(c,a);
  }
  // kinh tế
  econMonth();habitBroke();
  if(S.money<0){alive().forEach(p=>{addStat(p,'tam',S.money<-mm(3)?-2:-1);if(S.money<-mm(6))addStat(p,'suc',-0.3)});if(S.money<-mm(3))cf(-1,'Nợ nần (mỗi tháng nợ quá '+money(mm(3))+')');S.on=clamp(S.on-0.5,0,100);if(mo%3===1)log('Gia cảnh nợ nần, cả nhà lo âu. Hãy giảm mức sống hoặc bớt chi tiêu.','hi')}
  // nợ quá sức: xử ở v62Month (debtTick)
  // danh vọng cá nhân thấm vào gia tộc
  if(mo===1){S.fwPrev=S.fw||{};S.fw={}}
  alive().forEach(p=>{if(p.fame>0)cf(p.fame*0.002,'Danh vọng thành viên thấm dần');else if(p.fame<0)cf(p.fame*0.01,'Thành viên có tiếng xấu');const nf=tsum(p,'fame');if(nf)p.fame+=nf/12});
  if(S.rules.includes('nghia'))cf(0.4,'Gia quy Trọng nghĩa');
  if(rule('thanhliem'))cf(0.2,'Gia phong thanh liêm');
  if(rule('trongthuong'))cf(-0.15,'Trọng thương bị kẻ sĩ chê');
  clanDrift();
  pregnancy();
  world(mo);
  officeTick();
  fiefSync();
  qtMonth(mo);relTick();fixMonth();
  /* v6.4.1.3: gia quy, thư nhà, nhắc lập gia quy */
  if(mo===1){vioTick();if(head()&&!S.noRuleRemind&&S.rules.length<ruleSlots()&&!((S.ruleT||-99)+12>S.t))enqueue('ruleRemind',S.head)}
  if(mo===12&&head()&&((S.letters&&Object.values(S.letters).some(L=>L.length))||(S.rumor&&S.rumor.length)||alive().some(p=>inClan(p)&&!isCtrl(p)&&p.job==='quan'&&p.liem<35)))enqueue('letter',S.head);
  alive().forEach(c=>{const h=c.flags&&c.flags.hauBo;if(h&&!h.q&&S.t>=h.t&&inClan(c)&&!c.away){h.q=1;enqueue('haubo',c.id)}});
  // kỳ thi: v6.4.1.2 ba năm một khoa. Thi Hương tháng Tám năm thứ nhất, thi Hội tháng Hai và thi Đình tháng Ba năm sau
  const ey=Math.floor(S.t/12)%3;
  /* v6.4.1.7: khoa thi ân điển: thi Hương ngay năm ấy, thi Hội và thi Đình năm sau */
  const ak=S.anK?S.anK.y:-9,yy=Math.floor(S.t/12);
  const stage=mo===8&&(ey===0||ak===yy)?0:mo===2&&(ey===1||ak===yy-1)?1:mo===3&&(ey===1||ak===yy-1)?2:-1;
  if(stage>=0)alive().forEach(c=>{if(c.exam&&c.exam.stage===stage&&!c.away)enqueue('exam',c.id,{stage})});
  if(mo===9)alive().forEach(c=>{if(c.vexam&&!c.away)enqueue('vexam',c.id,{})});
  // việc đã hẹn
  const due=S.sched.filter(s=>s.t<=S.t);S.sched=S.sched.filter(s=>s.t>S.t);
  due.forEach(s=>{const c=P(s.cid);if(!c||!inClan(c))return;const E0=EVMAP[s.ev];if((c.busyUntil||0)>S.t&&!(E0&&E0.fixed)&&(s.def||0)<6){S.sched.push(Object.assign({},s,{t:c.busyUntil+1,def:(s.def||0)+1}));return}enqueue('ev',c.id,{ev:s.ev,data:s.data})});
  // đi buôn về
  S.trips=S.trips.filter(tr=>{if(S.t<tr.until)return true;const c=tr.cid?P(tr.cid):null;if(c){if(c.away&&c.away.type==='trade')c.away=null;if(!inClan(c))return false}enqueue('trade',c?c.id:S.head,{trip:tr});return false});
  // sự kiện đời thường: thường xuyên. Kỳ ngộ: hiếm, theo cơ duyên
  /* v6.4.1.2: nhà đông thì mỗi người ít gặp chuyện hơn, và cả nhà mỗi năm chỉ có chừng ấy hộp sự kiện đời thường (kỳ ngộ không tính) */
  const yr0=Math.floor(S.t/12);if(!S.evY||S.evY.y!==yr0)S.evY={y:yr0,n:0};
  const nHome=home().length;const crowd=Math.sqrt(15/Math.max(15,nHome));const evCap=Math.round(12+Math.min(12,nHome*0.3));
  for(const p of alive()){
    const a=age(p);const baby=a<5;if(baby&&S.t-p.born<2)continue;if(p.away&&['trade','odo','sep','luuday'].includes(p.away.type))continue;if((p.busyUntil||0)>S.t)continue;
    let pr=(baby?0.052:0.075+p.duyen/100*0.05)*crowd;if(a<16&&!baby)pr*=0.55;if(isHead(p))pr*=1.3;if(p.away&&p.away.type!=='army')pr*=1.3;
    if(S.evY.n>=evCap)pr*=isHead(p)?0.3:0;
    if(chance(pr)){const ev=pickEvent(p,false,baby);if(ev){enqueue('ev',p.id,ev);S.evY.n++}}
    if(baby)continue;
    let pk=(0.006+p.duyen/100*0.014)*(a<16?0.5:1)*(p.focus==='du'?1.6:1)*(isHead(p)?1.2:1);
    if(chance(pk)){const ev=pickEvent(p,true);if(ev)enqueue('ev',p.id,ev)}
  }
  viceTick();
  personaTick();
  v61Month();
  v62Month();
  // tước vị: kỳ ngộ cực hiếm, chỉ tăng nhờ cơ duyên gia tộc
  const fl=famLuck();if(!((S.kyT&&S.kyT.tuoc_ky_ngo)>S.t)&&chance(0.0001*(1+Math.max(0,fl-50)/8))){const cand=alive().filter(p=>age(p)>=20&&!p.away);if(cand.length)enqueue('ev',pick(cand).id,{ev:'tuoc_ky_ngo'})}
  // quan lại
  alive().forEach(c=>{if(c.job==='quan'&&!c.away&&chance((100-c.liem)/100*0.006*(1+c.lv*0.1)))enqueue('ev',c.id,{ev:'q_hactoi'})});
  // thăng tiến khi đủ điều kiện
  /* v6.4.1.2: một họ quá nhiều người làm quan thì triều đình nghi bè đảng, thăng chậm hơn */
  const bdF=1/(1+0.2*Math.max(0,clanQuan()-3))*kingPromoF(); /* v6.4.1.7: minh quân thăng chức công bằng hơn, hôn quân, bạo quân thì chậm */
  alive().forEach(c=>{if(age(c)>=16&&(c.job==='quan_ngu'?!!c.away:!c.away)&&canPromote(c)&&chance(c.job==='quan_ngu'?(c.merit>=ARMY[c.lv+1][2]*1.5?0.34:0.2)*bdF:0.05*bdF))enqueue('promo',c.id)});
  // nghỉ hưu
  alive().forEach(c=>{const J=JOBS[c.job];if(!J||c.flags.noRetireUntil>S.t)return;const a=age(c);
    if((J.phys&&(a>=J.phys||c.suc<25))||(a>=62&&!['none','huu','noi','vua'].includes(c.job))){if(chance(0.08)){c.flags.noRetireUntil=S.t+36;enqueue(a<50&&c.suc<25?'sick':'retire',c.id)}}});
  // ứng viên làm thuê làm mới mỗi quý
  if(S.t-S.candT>=3){S.cand=[0,1,2,3].map(()=>mkStaff());S.candT=S.t}
  // gia thế
  const ti=tierIdx();if(ti>S.tierSeen){S.tierSeen=ti;log(`Gia tộc ${S.surname} được người đời xếp vào hàng ${TIERS[ti][0]}.`,'gd');S.hung=clamp(S.hung+4,0,100)}
  if(S.t%12===0)save();
}
function clanDrift(){
  const a=alive();if(!a.length)return;
  const h=head();
  let hungT=10+Math.min(30,a.length*2.5)+tierIdx()*6+clanTuoc()*4+a.filter(p=>['quan','nguy'].includes(p.job)).length*4+(S.lastNet>0?5:-8);
  let onT=50+(h?(h.eq-50)/4:0)+(a.reduce((s,p)=>s+p.tam,0)/a.length-50)/3+a.reduce((s,p)=>s+tsum(p,'on'),0)
    +(S.rules.includes('nghiem')?8:0)+(rule('tohuan')?6:0)+(rule('truongau')?4:0)+(rule('camngoai')?3:0)+(rule('kinhto')?2:0)+(rule('nghiadien')?4:0)-(rule('khoandung')?2:0)+(S.tuduong?3:0)+(S.rules.includes('cambac')?4:0)+(S.rules.includes('hoathuan')?4:0)+(rule('hieudao')?3:0)+(rule('dichton')?4:0)+(offHolder('tudu')?3+offV('tudu')/10:0)-(S.money<0?12:0)-a.filter(p=>p.fame<0).length*3;
  S.hung=clamp(S.hung+(clamp(hungT,0,100)-S.hung)*0.03,0,100);
  S.on=clamp(S.on+(clamp(onT,0,100)-S.on)*0.04,0,100);
}
function monthlyPerson(c,a){
  if(a<1)return;
  if(!c.nat0)ensureNat(c);
  if(a<18)natGrowth(c,a);
  if(c.job==='nong')c.lv=farmerLv();
  const F=a>=6?FOCUS[c.focus]:FOCUS.nghi;
  const love=a>=6&&!c.away&&!c.brk&&c.focus===prefFocus(c);c._love=love?1:0;
  const away=c.away&&!['trade','army'].includes(c.away.type); /* v6.4.1.5: người ở doanh trại vẫn rèn luyện, học hành */
  const moodF=0.6+0.6*c.tam/100;const kidm=a<16?1.3:1;
  const tg=tsum2(c,'grow');const all=tsum(c,'growAll');
  const grow=(k,perYear)=>{perYear=(perYear||0)+(perYear?ruleGrow(c,k):0);if(!perYear)return;const cap=capOf(c,k);if(c[k]>=cap)return;const dim=growDim(c,k,cap);
    const tb=inClan(c)&&a<30?((k==='vo'&&thanHas('vothan'))?0.15:(k==='mi'&&thanHas('camthanh'))?0.1:0):0;const tmB=(()=>{const T=tmOf(c);return T&&(T.tm==='kytai'||(THAN[T.tm]&&THAN[T.tm].sk===k))?0.5:0})();
    const gene=0.5+pot(c,k)/100;addStat(c,k,perYear/12*dim*moodF*kidm*gene*(0.7+axv(c,'cc')/170)*(1)*(1+(tg[k]||0)+all+tb+tmB+(k==='vo'&&rule('thuongvo')?0.15:0)))};
  if(a>=4&&!away){for(const k in F.g)grow(k,F.g[k]*(love?1.2:1))}
  if(a>=6&&a<18&&c.school!=='nha'&&!away){const lvl=a<10?1:a<14?2:3;const sc=SCHOOL[lvl][c.school];
    if(sc){const teach=(1+Math.min(0.5,home().reduce((s,p)=>s+(age(p)>=16&&!p.away?tsum(p,'teach'):0),0)))*(home().some(p=>['su'].includes(p.job)&&age(p)>=16||p.job==='chu'&&S.biz.find(b=>b.id===p.biz&&b.type==='truong'))?1.3:1)*(S.rules.includes('hieuhoc')?1.15:1)*(thanHas('thanhnhan')?1.15:1)*(inMain(c)&&offHolder('giaothu')?1.1+offV('giaothu')/200:1);
      for(const k in sc.g)grow(k,sc.g[k]*teach);for(const j in (sc.pre||{}))c.pre[j]=(c.pre[j]||0)+sc.pre[j]/12}}
  if(S.rules.includes('hoathuan'))grow('eq',1);
  c.habits.forEach(h=>{const H=HABITS[h];if(!H)return;const f=H.vice?vlv(c,h)/50:1;if(H.tri)grow('tri',H.tri);if(H.eq)grow('eq',H.eq);if(H.fame)c.fame+=H.fame*f;if(H.hp)addStat(c,'suc',H.hp*f)});
  if(F.fame&&chance(F.fame*(love?1.2:1)/12))c.fame++;
  if(has(c,'thamlam')&&c.job==='quan'&&!rule('thanhliem'))c.liem=Math.max(0,c.liem-0.04);
  if(rule('thanhliem')&&c.job==='quan')c.liem=Math.min(100,c.liem+0.05);
  // sức khỏe
  let hp=(a>=c.decl+tsum(c,'decl')?0.4:0.7)+(F.hp||0)+(c.vo>=80?0.2:0)+tsum(c,'hp')-(HH(c.hh)&&HH(c.hh).life===0?0.4:0);
  addStat(c,'suc',hp);if(c.suc>c.cap.suc)c.suc=c.cap.suc;
  // tâm trạng
  const tgt=moodTarget(c,a);c.tam=clamp(c.tam+(tgt-c.tam)*0.12+(Math.random()-0.5)*3,0,100);
  // thông thạo
  if(a>=16&&!['none','vua','huu','quan_ngu'].includes(c.job)&&!(c.away&&c.away.type==='trade')){const J=JOBS[c.job];
    let yr=1.4+(c[J.st]>=80?0.5:0)+(c.tam>=70?0.3:0)+(F.mm||0)*(love?1.2:1)+tsum(c,'mm');
    traitsOf(c).forEach(t=>{const T=TRAITS[t];if(T.mmJobs&&T.mm&&!T.mmJobs.includes(c.job))yr-=T.mm});
    if(['tho','y','nghe','chan','nguy'].includes(c.job))yr+=(skv(c,'ky')-40)/80;
    if(c.job==='chu')yr*=0.4; /* v6.4.1.2: làm chủ thì thông thạo nghề gốc vẫn lên, nhưng chậm */
    c.m=Math.min(120,c.m+Math.max(0.2,yr*viceWork(c))/12)}
  // quân ngũ: rủi ro tử trận
  if(c.job==='quan_ngu'&&!c.away&&inClan(c)&&a>=16){c.away={type:'army'};log(`${nameOf(c)} được gọi về doanh trại.`)}
  if(c.job==='quan_ngu'&&ARMY[c.lv]&&(c.merit||0)<ARMY[c.lv][2])c.merit=ARMY[c.lv][2]; /* v6.5.2: cấp nào thì chiến công không thấp hơn mốc của cấp đó */
  if(c.job==='quan_ngu'&&c.away){const risk=(S.war?0.0028:0.0006)*(thanHas('vothan')?0.7:1)*(1.6-(c.vo+c.suc)/200)*(1-c.duyen/250)*(1-Math.min(0.25,c.lv*0.04));if(chance(risk)){const tt=Math.round(ARMY[c.lv][1]*10);S.money+=tt;cf(1+c.lv,'Con em tử trận vì nước');log(`Triều đình gửi ${money(tt)} tiền tuất về nhà ${nameOf(c)}.`);die(c,S.war?'tử trận nơi sa trường':'tử nạn trong quân');return}
    {const alert=!S.war&&S.w&&S.w.ph&&Object.values(S.w.ph).some(v=>v>=2);
     const vm=clamp((c.vo-20)/45,0.5,1.8),rk=1+c.lv*0.12;
     const hit=S.war?chance(0.18)?R(3,9):0:alert?chance(0.14)?R(2,5):0:chance(0.12)?R(1,4):0;
     if(hit)c.merit+=hit*vm*rk*(0.75+Math.min(c.tri,100)/400)*(1+tsum(c,'merit')+(rule('thuongvo')?0.2:0))}}
  // giang hồ
  if(c.job==='hiep'&&c.away){c.purse-=Math.round(LIFE[1][1]*1.5);if(chance(0.0015*(1.5-c.vo/150))){die(c,'bỏ mạng nơi giang hồ');return}
    if(c.purse<0&&chance(0.2))enqueue('ev',c.id,{ev:'jh_het_tien'})}
  if(c.suc<=0){if(lone(c))c.suc=1;else die(c,'kiệt sức qua đời')}
}
function moodTarget(c,a){
  const h=HH(c.hh)||HH(mainHH());const L=LIFE[h.life];
  let t=52+L[2]+(h.life-EXPECT[tierIdx()])*3+HOMES[h.home].tam;
  if(c.away&&c.away.type==='army')t=Math.min(t,60)-4-(S.war?8:0); /* v6.4.1.5: trước cố định 45, lính lúc nào cũng buồn */
  if(a>=6)t+=FOCUS[c.focus].tam;
  if(c._love)t+=3;
  if(married(c))t+=5;if(kidsOf(c).some(k=>inClan(k)))t+=3;
  if(a>=16)t-=JOBS[c.job].stress;
  if(a>=18&&c.job==='none')t-=6;
  if(S.money<0)t-=15;
  t+=(c.eq-50)/12;if(c.suc<40)t-=10;
  c.habits.forEach(x=>t+=HABITS[x].tam||0);
  t+=tsum(c,'tam');
  if(c.flags.griefUntil>S.t)t-=15;
  {const ch=c.flags.cheer;if(ch){if(ch.until>S.t)t+=ch.v*(ch.until-S.t)/ch.dur;else delete c.flags.cheer}}
  if(home().some(p=>p.job==='nghe'))t+=3;
  t+=(S.on-50)/10;
  if(S.rules.includes('tietkiem'))t-=3;if(S.rules.includes('nghiem'))t-=2;if(rule('tuquyet'))t+=4;
  if(rule('dichton')&&!c.inLaw&&c.parents.length&&siblingRank(c)>0)t-=3;
  t+=relMood(c);
  if(a>=16&&inMain(c)&&!isHead(c)&&income(c)>0){const g=GOP.find(x=>x[0]===S.gop);if(g)t+=g[2]}
  if((c.anbam||0)>4)t-=4;
  if(c.job==='noi'&&(c.tri>=70||axv(c,'tv')>=65))t-=5;
  return clamp(t,0,100);
}
/* v6.3.5: dung nhan bẩm sinh không tự phai, chỉ ngoại cảnh đặc biệt (thương tật, bệnh nặng) mới làm giảm vài điểm */
function lookFix(c){if(age(c)<18||!c.gn)return;const m=innateMap(c).mi;if(m&&m.min>=80&&c.mi<m.min-12)c.mi=m.min-6}
function onBirthday(c,a){lookFix(c);
  const decl=c.decl+tsum(c,'decl');
  if(a>=decl&&!(thanHas('thany')&&inClan(c)&&chance(0.2))){const d=a>=60?R(2,4):R(1,2);c.cap.suc=Math.max(0,c.cap.suc-d);c.suc=Math.min(c.suc,c.cap.suc)}
  if(c.cap.suc<=0||c.suc<=0){die(c,'tuổi già sức yếu, qua đời');return}
  driftYear(c,a);
  if(THO[a]&&inClan(c))enqueue('tho',c.id,{a});
  if(!c.inLaw||a<18){
    if(a===6||a===10||a===14){if(isArmyKid(c))c.school='doanh';else enqueue('school',c.id,{lvl:a===6?1:a===10?2:3})}
    if(a===18&&c.job==='none'&&!c.away)enqueue('job18',c.id);
  }
  if(a>18&&a<60&&c.job==='none'&&!c.away&&!c.left&&(c.g==='nam'||!married(c)))enqueue('job',c.id);
}
function checkMilestones(c,a){
  if(a<8)return;
  gateCheck(c,a);
  if(a>=16&&!['none','vua','huu','quan_ngu','chu','noi'].includes(c.job)){const l=c.mms[c.job]=c.mms[c.job]||[];
    for(let t=20;t<=120;t+=20)if(c.m>=t&&!l.includes(t)){l.push(t);enqueue('mm',c.id,{t})}}
  if(['y'].includes(c.job)&&c.m>=80&&c.tri>=80&&!c.flags.ngu&&c.fame+S.fame*0.2>=120&&nguOpen(c)){c.flags.ngu=1;enqueue('ev',c.id,{ev:'y_chieumo'})}
}
function die(c,cause){
  if(c.dead!=null)return;c.dead=S.t;c.preg=null;
  if(c.seat||c.pst)leaveSeat(c);else if(followers(c).length)unpostFol(c);
  if(c.away){S.trips=S.trips.filter(t=>t.cid!==c.id);c.away=null}
  if(c.biz){const b=S.biz.find(x=>x.id===c.biz);if(b)b.owner=null}
  if(isHead(c))S.lastHead=c.id;
  const est=!c.left?settleEstate(c):'';
  const sp0=spouseOf(c);if(sp0&&sp0.dead==null){sp0.flags.widowT=S.t;sphEnd(sp0,c.id,'mat')}
  kidsOf(c).forEach(k=>{if(k.dead!=null)return;const w=spouseOf(k);if(w&&w.dead==null&&w.g==='nữ'&&inClan(w))w.flags.tangCM=S.t});
  log(`${nameOf(c)} ${cause}, hưởng ${age(c)} tuổi.${est}`,'hi');
  // duyên nợ dang dở truyền cho con cháu
  const arcs=S.sched.filter(x=>x.cid===c.id&&EVMAP[x.ev]&&EVMAP[x.ev].arc);
  if(arcs.length){const heir=kidsOf(c).filter(k=>inClan(k)&&age(k)>=12&&!k.inLaw).sort((a,b)=>a.born-b.born)[0]||(spouseOf(c)&&inClan(spouseOf(c))?spouseOf(c):null);
    if(heir){arcs.forEach(x=>{x.cid=heir.id;x.t=Math.max(x.t,S.t+R(6,24))});log(`${nameOf(heir)} gánh tiếp chuyện dang dở của ${c.given}.`,'gd')}}
  alive().forEach(p=>{if(p.spouse===c.id||c.parents.includes(p.id)||p.parents.includes(c.id)){p.flags.griefUntil=S.t+12;p.flags.lostParent=c.parents.length?S.t:p.flags.lostParent}});
  alive().forEach(p=>{if(c.parents.includes(p.id))p.flags.lostKid=S.t;if(p.parents.includes(c.id))p.flags.parentDied=S.t});
  S.on=clamp(S.on-2,0,100);
  enqueue('death',c.id,{cause},true);
}
/* tước truyền cho con trai trưởng, hạ một bậc */
function inheritTitle(c){
  if(!c.tuoc)return '';
  const sons=kidsOf(c).filter(k=>k.g==='nam'&&inClan(k)&&!k.adopted).sort((a,b)=>a.born-b.born);
  const n=c.tuoc-1;if(!sons.length||n<1)return `Tước ${TUOC[c.tuoc]} không có người kế tục, triều đình thu hồi.`;
  sons[0].tuoc=Math.max(sons[0].tuoc||0,n);sons[0].tuocPrev=sons[0].tuoc;log(`${nameOf(sons[0])} kế tập tước ${TUOC[n]}.`,'gd');
  return ` Con trai trưởng ${esc(nameOf(sons[0]))} kế tập tước ${TUOC[n]}.`;
}
/* v6.4.1.2: tước phải tích công trạng. Mỗi lần lập công được ghi công (sự kiện càng lớn ghi càng nhiều), đủ mốc mới được phong.
   Không còn ban nhà; ruộng ban tính theo tước những người đang giữ (fiefSync), con kế tập hạ bậc thì ruộng cũng giảm theo. */
const TUOC_CONG=[0,100,250,500,850,1300];
let tuocMsg='';
function fiefSync(){if(!S||!S.farm)return;S.farm.fief=alive().reduce((s,p)=>s+(inClan(p)&&p.tuoc?TUOC_LAND[p.tuoc]||0:0),0)}
function grantTitle(c,n,why){
  n=Math.min(5,Math.max(1,n|0));tuocMsg='';
  if(!c)return false;
  c.cong=(c.cong||0)+40+30*n;return tuocCheck(c,why,true)}
/* v6.4.1.5: công trạng tới mốc bậc nào thì tước bậc ấy, không tùy sự kiện lớn hay nhỏ */
function tuocCheck(c,why,fromGrant){if(!c||c.dead!=null)return false;
  const cur=c.tuoc||0;let to=cur;for(let k=5;k>cur;k--)if((c.cong||0)>=TUOC_CONG[k]){to=k;break}
  if(to<=cur){if(!fromGrant)return false;const nx=Math.min(5,cur+1);
    tuocMsg=cur>=5?' Triều đình ghi thêm công.':` Triều đình ghi công (công trạng ${Math.round(c.cong)}/${TUOC_CONG[nx]}), chưa đủ để phong ${TUOC[nx]}.`;
    log(`Triều đình ghi công ${nameOf(c)}${why?' vì '+why:''}, công trạng ${Math.round(c.cong)}.`,'gd');return false}
  c.tuoc=to;c.tuocPrev=to;fiefSync();
  S.hung=clamp(S.hung+4,0,100);c.fame+=30*to;cf(15*to,'Được phong tước');
  tuocMsg=` Được phong <b>${TUOC[to]}</b>, ban ${TUOC_LAND[to]} mẫu điền trang và bổng ${money(TUOC_PAY[to])} mỗi tháng.`;
  log(`${nameOf(c)} được phong ${TUOC[to]}${why?' vì '+why:''}. Triều đình ban ${TUOC_LAND[to]} mẫu điền trang và bổng ${money(TUOC_PAY[to])} mỗi tháng.`,'gd');
  return true;
}
const tuocNote=()=>{const t=tuocMsg;tuocMsg='';return t};
/* v6.4.1.2: đỗ Tiến sĩ rồi phải chờ ghế trống (hậu bổ). Nhà có nhiều người làm quan thì triều đình dè dặt, chờ lâu hơn */
const clanQuan=()=>alive().filter(p=>inClan(p)&&['quan','quan_ngu'].includes(p.job)).length;
function hauBo(c){const n=clanQuan();const w=R(3,15)+Math.max(0,n-2)*R(3,6);const r=c.flags.examRank||0;c.flags.hauBo={r,t:S.t+w};
  /* v6.4.1.5.1: trong lúc chờ ghế đúng bậc, tạm giữ một chức thấp hơn để làm quen việc */
  let tmp='';if(r>0){c.bonus=0;c.m=Math.min(c.m,20);const a=appoint(c,r-1);c.flags.hauBo.tmp=1;tmp=` Trong lúc chờ, bộ Lại cho tạm giữ chức ${seatName(a.key)} (${rankTxt(c)}) để làm quen việc.`}
  log(`${nameOf(c)} được ghi tên vào sổ hậu bổ, chờ ghế ${RANKS[r]}.`);
  return `Tên ${esc(c.given)} được ghi vào sổ hậu bổ của bộ Lại, chờ ghế ${RANKS[r]}${n>=3?'. Nhà đã có nhiều người làm quan, triều đình dè dặt nên có lẽ phải chờ lâu':''}.${tmp}`}
function hauBoPopup(c){const h=c.flags.hauBo;if(!h||!inClan(c)||(c.job==='quan'&&!h.tmp)||(c.flags.noOffice||0)>S.t){if(c)delete c.flags.hauBo;setTimeout(nextPopup,0);return}delete c.flags.hauBo;
  const k0=c.job==='quan'&&seatOfC(c);const tmpN=h.tmp&&k0?seatName(k0):'';
  choicePopup(c,'Quan trường','Bộ Lại gọi nhậm chức',`Có ghế ${RANKS[h.r]} trống. Bộ Lại gửi công văn hỏi ${esc(c.given)} có nhận không.${tmpN?` Hiện đang tạm giữ chức ${esc(tmpN)}.`:''}`,[
    {l:'Nhận chức',f:c=>{c.bonus=0;c.m=Math.min(c.m,20);const r=appoint(c,h.r,c.job==='quan');return `Được bổ làm ${seatName(r.key)} (${rankTxt(c)}), thay ${r.old}.`+fx(c,{fame:10,tam:10})}},
    tmpN?{l:'Ở lại chức đang giữ',f:c=>'Việc đã quen tay, ở lại cũng tốt.'+fx(c,{m:2})}:{l:'Từ chối, ở nhà giữ nghề cũ',f:c=>'Người đời tiếc cho.'+fx(c,{fame:3})}])}

/* ================= mang thai ================= */
function pregnancy(){
  for(const c of alive()){
    if(c.preg){const cost=c.preg.care===2?mm(3):c.preg.care===1?mm(1):0;if(cost)charge(c,cost);
      if(S.t===c.preg.due-6&&!c.preg.lost&&chance(Math.max(0.02,0.08-c.preg.care*0.025+(age(c)>35?0.05:0)+(c.suc<40?0.05:0)))){c.preg=null;addStat(c,'tam',-15);addStat(c,'suc',-6);const sp=spouseOf(c);if(sp)addStat(sp,'tam',-8);c.flags.griefUntil=S.t+6;log(`${nameOf(c)} không may sảy thai.`,'hi');continue}
      if(S.t===c.preg.due-5&&chance(0.25+(c.preg.care?-0.12:0)))enqueue('ev',c.id,{ev:'thai_dong'});
      if(S.t>=c.preg.due&&!c.preg.q){c.preg.q=1;enqueue('birth',c.id)}continue}
    if(c.g!=='nữ'||!c.spouse||(c.away&&!(c.away.type==='follow'&&c.away.of===c.spouse))||!inClan(c)||!canConceive(c))continue;const sp=P(c.spouse);
    /* v6.4.1.6: chồng đi lính: vợ theo vào doanh trại thì vẫn có con nhưng ít hơn; vợ ở quê thì chỉ có con khi chồng về phép (dịp ấy dễ có hơn một chút) */
    let lqF=1;
    if(sp&&sp.away&&sp.away.type==='army'){if(c.away&&c.away.type==='follow'&&c.away.of===sp.id)lqF=0.6;else if(S.t-(sp.flags.phepT??-99)<=1)lqF=1.6;else continue}
    else if(!sp||!inClan(sp)||(sp.away&&!(sp.away.type==='follow'&&sp.away.of===c.id)))continue;
    const a=age(c);if(a<16||a>46||c.suc<25)continue;
    if(hhCount(c.hh)>=HOMES[HH(c.hh).home].cap){if(wantsKid(c)&&wantsKid(sp)&&(c.flags.chatT==null||c.flags.chatT+48<=S.t)){c.flags.chatT=S.t;log(`Nhà chật, ${nameOf(c)} và ${nameOf(sp)} chưa dám sinh thêm.`)}continue}
    const both=wantsKid(c)&&wantsKid(sp);c.wantChild=sp.wantChild=both;
    const fert=(c.fert||1)*(sp.fert||1)*(c.suc/100+0.3)*(a>36?0.5:1)*(a>42?0.4:1)*lqF;
    if(both?chance(0.09*fert):chance(0.012*fert)){c.preg={due:S.t+9,father:sp.id,twins:chance(0.035)&&(kidCap()-kidsOf(c).filter(k=>k.dead==null&&!k.adopted).length)>=2,care:0};if(!both)log(`${nameOf(c)} có tin mừng ngoài dự tính.`);enqueue('preg',c.id)}
    else if(both&&(c.fert||1)<0.6&&!c.flags.hiemT&&kidsOf(c).length===0&&a>=24){c.flags.hiemT=S.t;enqueue('ev',c.id,{ev:'v61_hiem_muon'})}
  }
}

/* ================= thời cuộc ================= */
function world(mo){
  // chiến tranh
  w63Month(mo);
  if(!S.war&&mo===1&&chance(0.12)){S.recruit=S.t+6;log('Triều đình mở đợt tuyển quân trong sáu tháng.')}
  // bắt lính
  if(S.war&&S.t>=36&&chance(0.5))alive().forEach(p=>{if(p.g==='nam'&&age(p)>=16&&age(p)<20&&!p.away&&!p.flags.exempt&&!isHead(p)&&alive().filter(q=>q.g==='nam'&&q.hh===p.hh&&age(q)>=16&&age(q)<60&&!q.away).length>1&&(income(p)<ARMY[0][1]||['none','tieuphu','khuanvac','chan','hangrong','nong'].includes(p.job))&&chance(0.05))enqueue('ev',p.id,{ev:'bat_linh'})});
  // thiên tai mùa hạ
  // dịch bệnh: mùa đông, hoặc sau chiến tranh, thiên tai
  if(mo===11){S.epi=chance((0.18+S.epiRisk*0.5)*REG().epi);S.epiRisk=0;if(S.epi)log('Mùa đông năm nay dịch bệnh hoành hành khắp vùng.','hi')}
  else if(!S.epi&&S.epiRisk>0&&chance(S.epiRisk/6)){S.epi=true;S.epiEnd=S.t+4;S.epiRisk=0;log('Sau tai ương, dịch bệnh bùng phát.','hi')}
  if(S.epi&&(mo===3||(S.epiEnd&&S.t>=S.epiEnd))){S.epi=false;S.epiEnd=0}
  if(S.epi){
    const doc=home().some(p=>p.job==='y'&&p.m>=20||p.job==='nguy'||p.job==='chu'&&S.biz.some(b=>b.id===p.biz&&b.type==='yquan'));
    home().forEach(p=>{const a=age(p);const h=HH(p.hh);let pr=0.022*(1.5-p.suc/100)*(h.home<2?1.4:0.9)*(a<6||a>55?1.5:1)*(doc?0.6:1)*(thanHas('thany')&&inClan(p)?0.8:1)*(h.life===0?1.3:1);
      const sk=traitsOf(p).reduce((m,t)=>m*(TRAITS[t].sick||1),1);pr*=sk;
      if(chance(pr))enqueue('ev',p.id,{ev:'benh_dich'})});
  }
}

/* ================= ruộng vườn ================= */
function farmLabor(){
  /* v6.4.1.5: ruộng nhà chính chỉ dùng sức người nhà chính; người chi họ làm ruộng của chi */
  const farmers=home().filter(p=>p.job==='nong'&&age(p)>=16&&inMain(p));
  let cap=farmers.reduce((s,p)=>s+4+p.m/40,0)+S.farm.hired*4;
  home().filter(p=>p.focus==='giup'&&age(p)>=12&&p.job!=='nong'&&inMain(p)).forEach(()=>cap+=1);
  return cap;
}
const farmArea=()=>Math.max(0,S.farm.own-(S.farm.lease||0))+S.farm.rent;
const allocated=()=>Object.values(S.farm.alloc).reduce((a,b)=>a+b,0);
function farmSkill(){const f=home().filter(p=>p.job==='nong'&&inMain(p));return f.length?Math.max(...f.map(p=>0.8+p.m/200+(p.suc-50)/500)):0.7}
function farmMonth(){
  const mo=month();let v=0;const area=farmArea();if(!area)return 0;
  const lab=Math.min(1,farmLabor()/Math.max(1,allocated()*1));
  const ownShare=Math.max(0,S.farm.own-(S.farm.lease||0))/area;
  const notes=[];
  for(const k in S.farm.alloc){const n=S.farm.alloc[k];if(!n)continue;const C=CROPS[k];if(!C.harv.includes(mo))continue;
    let q=farmSkill()*lab*(0.85+Math.random()*0.3)*(REG().crop[k]||1)*(rule('trongnong')?1.1:1)*(1+offV('quansu')/300);
    if(S.disaster){const cf0=S.disaster.crop||0.5;q*=(k==='ngo'||k==='khoai')?Math.min(1,cf0+0.25):cf0}
    if(thanHas('thannong'))q*=1.05;
    if(chance(C.risk*(thanHas('thannong')?0.4:1))){q*=0.5;notes.push(`${C.n} bị mất mùa một nửa`)}
    const base=n*C.y/C.harv.length*q*(ownShare+(1-ownShare)*0.5);
    let units=base/GOODS[C.g].p;
    if(rule('tichcoc')&&!S.farm.store){const keep=units*0.1;S.kho[C.g]=(S.kho[C.g]||0)+keep;units-=keep}
    if(S.farm.store){S.kho[C.g]=(S.kho[C.g]||0)+units;notes.push(`${C.n}: ${fmt(units)} ${GOODS[C.g].u} vào kho`)}
    else{const val=units*priceOf(C.g);v+=val;notes.push(`${C.n}: bán được ${money(val)}`)}
  }
  if(notes.length)log('Thu hoạch: '+notes.join('; ')+'.','gd');
  return Math.round(v);
}
const landCost=()=>Math.round(8000*(1+S.farm.own*0.03)*(0.8+mk('lua')*0.2));

/* ================= kinh doanh ================= */
let staffN=0;
function mkStaff(role){
  const g=chance(0.6)?'nam':'nữ';
  const st={id:'s'+Date.now().toString(36)+(staffN++),n:fullOutsider(g),g,tt:R(10,85),sm:R(10,85),kl:R(10,85),tl:R(5,100),m:R(0,25),role:role||null,ms:[]};
  st.wage=Math.round((350+((st.tt+st.sm+st.kl)/3)*9)*(1+st.m/80)/10)*10;
  return staffInit(st);
}
function staffEff(st,role){const R0=ROLES[role];let s=0,n=0;for(const k in R0.req){s+=Math.min(1.25,st[k]/R0.req[k]);n++}return (n?s/n:1)*(0.7+st.m/200)*staffVigor(st)}
function bizSlots(b){const B=BIZ[b.type];const out=[];for(let i=0;i<=b.lv;i++)out.push(...B.lv[i][4]);return out}
function bizCalc(b){
  const B=BIZ[b.type];const L=B.lv[b.lv];const slots=bizSlots(b);
  const used=new Set();let score=0;
  slots.forEach(r=>{const st=b.staff.find(s=>s.role===r&&!used.has(s.id));if(st){used.add(st.id);score+=Math.min(1.2,staffEff(st,r))}});
  const fill=slots.length?score/slots.length:1;
  const o=P(b.owner);const on=o&&inClan(o)&&!o.away;let ownerF=on?(0.5+o.m/150+(o[B.st]||50)/300+(o.tri-50)/400+tsum(o,'trade')+(skv(o,'ql')-30)/150)*viceWork(o)*ageEff(age(o)):0.4;
  if(o&&o.bizFrom&&!(BIZREL[b.type]||[]).includes(o.bizFrom)&&!(b.type==='voquan'&&o.vo>=60)&&o.tri<80&&!has(o,'kytaibuon'))ownerF*=0.75;
  /* v6.4.1.2: chủ giỏi (thông thạo nghề gốc và quản trị cao) thì trần doanh thu lên tới 1,6 lần; làm lớn thì nguyên liệu rẻ hơn */
  const oq=on?clamp(((o.m-50)/70+(skv(o,'ql')-35)/45)/2,0,1):0;const capF=1.3+0.3*oq;const nL=B.lv.length;
  if((b.own||'clan')==='clan')ownerF*=1+offV('quansu')/250;
  let mkF=1;if(b.type==='yquan'&&S.epi)mkF=1.6;if(b.type==='quantra'&&season()==='dong')mkF=0.85;if(S.war&&b.type==='tieucuc')mkF=1.3;if(S.war&&['ganhhat','quantra'].includes(b.type))mkF*=0.8;
  if(S.disaster)mkF*=0.85;
  const rev=L[2]*(0.25+0.75*fill)*ownerF*mkF*(0.85+((S.t*7+b.id.length)%30)/100)*(1+(b.bonus||0))*(rule('trongthuong')?1.08:1)*(rule('trongnong')?0.95:1)*(0.9+S.on/500);
  const rv=Math.min(rev,L[2]*capF)*0.7*(thanHas('thuongthanh')?1.08:1) /* v6.5.4: doanh thu cơ sở giảm 30% để thu nhập không dư thừa */*(b.type==='xuong'&&thanHas('thantuong')?1.1:1);
  const wages=b.staff.reduce((s,x)=>s+x.wage,0);const mat=rv*((BIZX[b.type]||{}).mat??0.25)*(1-0.4*(nL>1?b.lv/(nL-1):0));const rent=L[3];
  return {rev:Math.round(rv),wages,mat:Math.round(mat),rent,profit:Math.round(rv-wages-mat-rent),fill,ownerF,cap:Math.round(L[2]*capF)};
}
function bizMonth(){
  let v=0;S.biz.forEach(b=>{staffTick(b);const c=bizCalc(b);b.last=c;v+=c.profit;
    b.staff.forEach(st=>{st.m=Math.min(120,st.m+(2+st.tl/12)/12);for(const t of [30,60,90])if(st.m>=t&&!st.ms.includes(t)){st.ms.push(t);raiseReq(b,st,t)}});
    autoFill(b);
    if(month()===12&&b.rq&&b.rq.length){const ow=P(b.owner);enqueue('raiseY',ow&&inClan(ow)&&!ow.away&&ow.job==='chu'?ow.id:S.head,{biz:b.id})}});
  return v;
}
/* v6.4.1.2: chính sách lương. Tự tăng (mặc định): không hỏi; Giữ lương: người làm bực dần; Hỏi tôi: gộp một hộp cuối năm cho mỗi cơ sở */
const WPOL={auto:'Tự tăng theo thông thạo',giu:'Giữ lương',hoi:'Hỏi tôi (một hộp cuối năm)'};
function raiseReq(b,st,t){const pol=b.wpol||'auto';
  if(pol==='auto'){const w=Math.round(st.wage*1.15/10)*10;log(`${st.n} ở ${BIZ[b.type].lv[b.lv][0].toLowerCase()} đã thạo việc, được tăng lương lên ${money(w)}.`);st.wage=w;st.loy=clamp((st.loy||60)+6,0,100);return}
  if(pol==='giu'){st.loy=clamp((st.loy||60)-8,0,100);return}
  (b.rq=b.rq||[]).push({sid:st.id,t})}
function raiseYPopup(it){const b=S.biz.find(x=>x.id===it.biz);if(!b){setTimeout(nextPopup,0);return}
  const L=(b.rq||[]).map(q=>({q,st:b.staff.find(s=>s.id===q.sid)})).filter(x=>x.st);b.rq=[];if(!L.length){setTimeout(nextPopup,0);return}
  const ask=st=>Math.round(st.wage*1.3/10)*10;const add=L.reduce((s,x)=>s+ask(x.st)-x.st.wage,0);
  const ow=P(b.owner);const c=ow&&inClan(ow)&&!ow.away?ow:head();const bn=BIZ[b.type].lv[b.lv][0].toLowerCase();
  const yes=x=>{x.st.wage=ask(x.st);x.st.loy=clamp((x.st.loy||60)+8,0,100)};const no=x=>{x.st.loy=clamp((x.st.loy||60)-10,0,100)};
  const opts=[{l:`Tăng cho cả ${L.length} người (thêm ${money(add)}/tháng)`,f:()=>{L.forEach(yes);return 'Ai nấy vui vẻ làm tiếp.'}},
    {l:'Không tăng cho ai',s:'Người làm bực, dễ bỏ đi',f:()=>{L.forEach(no);return 'Người làm lặng lẽ cúi đầu, có kẻ đã tính chuyện tìm chỗ khác.'}}];
  if(L.length>1)L.slice(0,4).forEach(x=>opts.push({l:`Chỉ tăng cho ${x.st.n} (${ROLES[x.st.role]?ROLES[x.st.role].n.toLowerCase():'người làm'}, lên ${money(ask(x.st))})`,f:()=>{L.forEach(y=>y===x?yes(y):no(y));return `Chỉ ${esc(x.st.n)} được tăng lương.`}}));
  choicePopup(c,'Kinh doanh',`Sổ lương cuối năm: ${L.length} người xin tăng`,`Ở ${esc(bn)}, ${L.map(x=>`${esc(x.st.n)} (${money(x.st.wage)} lên ${money(ask(x.st))})`).join(', ')} xin tăng lương vì đã thạo việc.`,opts)}
/* v6.4.1.2: từ bậc 3, cơ sở bật "Tự tuyển bù" thì người trông tự thuê người vào chỗ trống */
function autoFill(b){if(!b.autoHire||b.lv<2)return;const o=P(b.owner);if(!o||!inClan(o)||o.away)return;
  bizStaffInfo(b).empty.forEach(r=>{const st=mkStaff(r);st.role=r;st.wage=wageFor(st,b,r);st.since=S.t;b.staff.push(st);log(`${nameOf(o)} tự tuyển ${st.n} làm ${ROLES[r].n.toLowerCase()} ở ${BIZ[b.type].lv[b.lv][0].toLowerCase()}.`)})}
/* v6.4.1.2: mở cơ sở và trông cơ sở chỉ lấy người đang làm nghề hợp với cơ sở: thông thạo nghề ấy từ 50 (võ quán: hoặc võ lực từ 90), quản trị từ 35, từ 18 tuổi */
const BIZREL={quantra:['tieunhi','hangrong','bep'],tiem:['tieunhi','hangrong'],xuong:['tho','det'],yquan:['y','mo'],truong:['su'],voquan:['tieu','hiep'],tieucuc:['tieu'],ganhhat:['nghe'],thuyen:['ngu'],trai:['chan']};
const QL_NEED=35,BM_NEED=50;
const relJob=(p,type)=>{const L=BIZREL[type]||[];return L.includes(p.job)?p.job:(p.job==='chu'&&L.includes(p.bizFrom))?p.bizFrom:null};
const relNames=type=>(BIZREL[type]||[]).map(x=>JOBS[x].n.toLowerCase()).join(', ');
function bizSkillWhy(p,type){const out=[];const j=relJob(p,type);
  if(!j)out.push('không làm nghề '+relNames(type));
  else if(!(type==='voquan'&&p.vo>=90)&&jobM(p,j)<BM_NEED)out.push(`thông thạo ${JOBS[j].n.toLowerCase()} ${Math.floor(jobM(p,j))}/${BM_NEED}`);
  if(qlOf(p)<QL_NEED)out.push(`quản trị ${Math.floor(qlOf(p))}/${QL_NEED}`);
  return out}
function canOwn(c,type){
  if(!BIZ[type]||age(c)<18||c.job==='chu')return false;
  return !bizSkillWhy(c,type).length;
}
/* nhận trông cơ sở: thông thạo nghề gốc giữ nguyên (v6.4.1.2), nhớ nghề và bậc cũ để thôi làm chủ thì quay về */
function becomeChu(p,b){if(p.biz&&p.biz!==b.id){const ob=bizOf(p);if(ob)ob.owner=null}
  p.mexp=p.mexp||{};if(p.m>0&&!['none','huu','chu'].includes(p.job))p.mexp[p.job]=Math.max(p.mexp[p.job]||0,p.m);
  if(p.job!=='chu'){p.bizFrom=p.job;p.bizLv=p.lv}p.job='chu';p.biz=b.id;p.lv=0;p.bonus=0;b.owner=p.id}
function unChu(p){const j=p.bizFrom;p.biz=null;p.bonus=0;
  if(j&&JOBS[j]&&!['none','huu','chu','vua','quan','quan_ngu','nguy'].includes(j)){p.mexp=p.mexp||{};p.mexp[j]=Math.max(p.mexp[j]||0,p.m||0);p.job=j;p.lv=Math.min(p.bizLv||0,JOBS[j].lv.length-1);p.m=p.mexp[j];return true}
  p.job='none';p.lv=0;return false}
const bizOf=c=>c.biz?S.biz.find(b=>b.id===c.biz):null;
/* v6.4.1.1: ai được trông cơ sở. Cơ sở của tộc chỉ giao cho người nhà chính, cơ sở của chi giao cho người trong chi;
   từ 18 tuổi, không đi xa, không nghỉ hưu, không làm quan, chưa trông nơi khác, thông thạo nghề tương ứng từ 50 (võ quán: hoặc võ lực từ 90), quản trị từ 50 */
const bizHH=b=>b.own&&b.own!=='clan'&&S.hh[b.own]?b.own:mainHH();
const jobM=(p,j)=>Math.max(p.job===j||(p.job==='chu'&&p.bizFrom===j)?(p.m||0):0,(p.pre&&p.pre[j])||0,(p.mexp&&p.mexp[j])||0);
const qlOf=p=>(p.sk&&p.sk.ql)||0;
function mgrWhy(p,b){const out=[];
  if(age(p)<18)out.push('chưa đủ 18 tuổi');
  if(p.hh!==bizHH(b))out.push(bizHH(b)===mainHH()?'không ở nhà chính':'không ở chi này');
  if(p.away)out.push('đang đi xa');
  if(p.job==='huu')out.push('đã nghỉ hưu');else if(['quan','quan_ngu','nguy','vua'].includes(p.job))out.push('đang giữ chức');
  if(p.biz&&p.biz!==b.id)out.push('đang trông cơ sở khác');
  out.push(...bizSkillWhy(p,b.type));
  return out}
/* v6.4.1.2: quản trị lên theo chức vụ trong nghề: bậc thấp rất ít, bậc cao nhanh hơn (0,1 đến 0,8 mỗi năm); làm chủ cơ sở thì 1 mỗi năm */
const QL_NOJOB=['none','huu','vua','quan','quan_ngu','nguy','hiep','noi','thulai'];
function qlYear(c){if(c.job==='chu')return bizOf(c)?1:0;if(QL_NOJOB.includes(c.job))return 0;const J=JOBS[c.job];const n=J&&J.lv?J.lv.length:1;if(n<2)return 0;
  return 0.1+0.7*Math.pow(Math.min(c.lv,n-1)/(n-1),1.5)}

/* ================= thăng tiến ================= */
function nextReq(c){
  const J=JOBS[c.job];if(!J||['quan','quan_ngu','nong','none','huu','vua','chu','hiep','noi'].includes(c.job))return null;
  const L=J.lv[c.lv+1];return L?L.req:null;
}
function meetsReq(c,req){
  for(const k in req){const v=req[k];
    if(k==='m'){if(c.m<v)return false}else if(k==='fame'){if(c.fame<v)return false}else if(k==='degree'){if(c.degree<v&&c.tri<(req.tri||0)+15)return false}
    else if(k==='flag'){if(!c.flags[v])return false}else if(k==='land'){continue}else if(c[k]<v)return false}
  return true;
}
/* v6.5.2: chỉ có võ mà thiếu trí thì không lên được cấp cao. Mốc trí cần để lên cấp thứ i của ARMY. */
const ARMY_TRI=[0,0,0,35,42,52,62,72];
const AWAY_BLOCK=new Set(['society/village','society/neighbors','society/local_elite','society/clan_relations','society/four_great_clans','life/season','life/disaster','economy/land','economy/agriculture']);
function canPromote(c){
  if((c.flags.noPromoUntil||0)>S.t)return false;
  if(c.job==='quan'){const b=bacOf(c);return b<17&&c.m>=Math.min(100,(b+1)*6)&&c.tri>=45+b*3.5&&!((c.flags.noPromoUntil||0)>S.t)}
  if(c.job==='quan_ngu')return c.lv<ARMY.length-1&&c.merit>=ARMY[c.lv+1][2]&&c.tri>=(ARMY_TRI[c.lv+1]||0)&&c.away;
  if(c.job==='nguy'){const r=nextReq(c);return !!r&&meetsReq(c,r)&&!!nguFree(c,c.lv+1)}
  if(c.job==='hiep'){const L=JOBS.hiep.lv[c.lv+1];return !!L&&meetsReq(c,L.req)}
  const r=nextReq(c);return !!r&&meetsReq(c,r);
}
function farmerLv(){const o=S.farm.own;return o>=40?3:o>=15?2:o>=3?1:0}
/* ================= chọn kỳ ngộ ================= */
let EVENTS=[],EVMAP={};
function buildEvents(){EVENTS=[];(window.EVF||[]).forEach(f=>{try{EVENTS.push(...f(G))}catch(e){console.error(e)}});EVMAP=Object.fromEntries(EVENTS.map(e=>[e.id,e]));classifyEvents();tagEvents();patchEvents();initBrk62();guard6415();guard6416();guard653();attachMeta();wrapEvMoney()}
/* v6.5.4: gắn metadata kho sự kiện (window.EVMETA, sinh bởi tools/classify.js) để lọc và thống kê ở trang admin. Không ảnh hưởng cách game chọn sự kiện. */
function attachMeta(){const M=window.EVMETA||{};EVENTS.forEach(e=>{const m=M[e.id];e.meta=m?{d:m[0],s:m[1],tr:m[2],ra:m[3],who:m[4],sit:m[5]}:{d:'unclassified',s:'unclassified',tr:e.arc?'arc':e.fixed?'fixed':e.ky?'encounter':'random',ra:'na',who:'any',sit:'any'}})}
/* v6.5.3: gắn cấp (lvr) cho các sự kiện quân ngũ có từ trước, để cấp cao không gặp chuyện của lính mới */
function guard653(){const T={qn_tan_binh:[0,1],qn_luyen_quan:[0,4],qn_tuan_tra:[0,3],qn_thieu_luong:[0,4],qn_tran_lon:[3,7],qn_tuong_quan:[5,7],d631_chi_huy_nhan_tai:[0,3],d631_lao_tuong_truyen_phap:[0,4],d631_cuu_tuong_bi_thuong:[0,4],n633_qn_linh:[0,2],n633_qn_ngua:[0,5],n633_qn_luong:[0,4],n633_qn_lui:[3,7],qt4_giao_binh_quyen:[5,7]};
  for(const id in T){const e=EVMAP[id];if(e&&!e.lvr)e.lvr=T[id]}}
/* v6.4.1.5: mấy kỳ ngộ "xin vào làm thư lại, theo đoàn buôn" không đến với người đang làm quan, đang giữ chức võ, có tước hay làm chủ */
function guard6415(){['d631_ban_hoc_lam_quan','d631_quan_xe_sa_lay','d631_ban_nho_cho_von'].forEach(id=>{const e=EVMAP[id];if(!e||e._g)return;e._g=1;const oc=e.c;e.c=(c,d)=>!['quan','quan_ngu','nguy','vua','chu'].includes(c.job)&&!(c.tuoc>0)&&(!oc||oc(c,d))})}
function jobMatch(e,c){
  if(!e.job)return true;
  return e.job.some(j=>j===c.job||(j.startsWith('biz:')&&c.job==='chu'&&bizOf(c)&&bizOf(c).type===j.slice(4)));
}
function eligible(e,c){
  if(e.arc||e.fixed)return false;
  if(c.away&&!(e.job&&jobMatch(e,c)))return false;
  if(e.once&&c.seen[e.id])return false;
  if(!kyOk(e,c))return false;
  if((S.cool[e.id]||-1e9)>S.t)return false;
  if((c.seen[e.id]||-1e9)>S.t-(e.pcd||60))return false;
  if(!jobMatch(e,c))return false;
  if(!ctxOk(e,c))return false;
  if(e.ptag&&!((c.job==='quan'||c.job==='quan_ngu')&&c.post&&window.D.OFFICES[c.post]&&e.ptag.includes(window.D.OFFICES[c.post].tag)))return false;
  if(e.lvr&&c.job==='quan_ngu'&&(c.lv<e.lvr[0]||c.lv>e.lvr[1]))return false; /* v6.5.3: sự kiện quân ngũ theo cấp */
  if(e.meta&&!e.fixed&&!e.arc&&!e.ky){ /* v6.5.4: nhóm sự kiện chặn theo nơi ở và hoàn cảnh */
    const M=e.meta;
    if(awayFromHome(c)&&AWAY_BLOCK.has(M.d+'/'+M.s))return false; /* người ở nơi khác (nhậm chức, theo quan, chi họ xa) không gặp chuyện làng và mùa vụ của nhà chính */
    if(M.sit==='war'&&!(S.war||(S.w&&S.w.ph&&Object.values(S.w.ph).some(v=>v>=1))))return false;
  }
  if(e.rmin!=null&&!(c.job==='quan'&&c.lv>=e.rmin))return false;
  if(e.rmax!=null&&c.job==='quan'&&c.lv>e.rmax)return false;
  if(e.st!=null&&stg(c)<e.st)return false;
  if(e.stMax!=null&&stg(c)>e.stMax)return false;
  if(e.age&&(age(c)<e.age[0]||age(c)>e.age[1]))return false;
  if(e.sea&&!e.sea.includes(season()))return false;
  if(e.tier&&(tierIdx()<e.tier[0]||tierIdx()>e.tier[1]))return false;
  if(e.fame&&c.fame+S.fame*0.2<e.fame)return false;
  if(e.g&&c.g!==e.g)return false;
  if(e.head&&!isHead(c))return false;
  if(e.hh&&c.hh===mainHH())return false;
  try{if(e.c&&!e.c(c))return false}catch(err){return false}
  if(e.pair){try{if(!alive().some(o=>o.id!==c.id&&!o.away&&e.pair(o,c)))return false}catch(err){return false}}
  return true;
}
/* v6.4.1.1 (admin): giống eligible() nhưng trả về điều kiện đầu tiên bị trượt; rỗng là đủ điều kiện */
function eligibleWhy(e,c){
  const T=[[()=>e.arc||e.fixed,'chỉ do cốt truyện gọi, không bốc ngẫu nhiên'],[()=>c.away&&!(e.job&&jobMatch(e,c)),'người này đang đi xa'],
   [()=>{const M=e.meta;if(!M||e.fixed||e.arc||e.ky)return false;return awayFromHome(c)&&AWAY_BLOCK.has(M.d+'/'+M.s)},'người này đang ở xa nhà, không gặp chuyện làng và mùa vụ'],[()=>{const M=e.meta;return !!M&&!e.fixed&&!e.arc&&!e.ky&&M.sit==='war'&&!(S.war||(S.w&&S.w.ph&&Object.values(S.w.ph).some(v=>v>=1)))},'chưa có chiến sự'],[()=>e.once&&c.seen[e.id],'chỉ xảy ra một lần, đã xảy ra'],[()=>!kyOk(e,c),'kỳ ngộ chưa đủ điều kiện (kyOk)'],
   [()=>(S.cool[e.id]||-1e9)>S.t,`đang hồi chung, còn ${(S.cool[e.id]||0)-S.t} tháng`],[()=>(c.seen[e.id]||-1e9)>S.t-(e.pcd||60),'người này mới gặp gần đây'],
   [()=>!jobMatch(e,c),'sai nghề: cần '+(e.job||[]).join(', ')],[()=>!ctxOk(e,c),'sai hoàn cảnh (ctx)'],
   [()=>e.ptag&&!((c.job==='quan'||c.job==='quan_ngu')&&c.post&&window.D.OFFICES[c.post]&&e.ptag.includes(window.D.OFFICES[c.post].tag)),'sai loại việc của chức: '+(e.ptag||[]).join(', ')],
   [()=>e.lvr&&c.job==='quan_ngu'&&(c.lv<e.lvr[0]||c.lv>e.lvr[1]),'sai cấp quân ngũ (lvr)'],[()=>e.rmin!=null&&!(c.job==='quan'&&c.lv>=e.rmin),'phẩm quá thấp'],[()=>e.rmax!=null&&c.job==='quan'&&c.lv>e.rmax,'phẩm quá cao'],
   [()=>e.st!=null&&stg(c)<e.st,'chưa đủ bậc nghề'],[()=>e.stMax!=null&&stg(c)>e.stMax,'bậc nghề quá cao'],
   [()=>e.age&&(age(c)<e.age[0]||age(c)>e.age[1]),e.age?`tuổi phải từ ${e.age[0]} đến ${e.age[1]}`:''],[()=>e.sea&&!e.sea.includes(season()),'sai mùa'],
   [()=>e.tier&&(tierIdx()<e.tier[0]||tierIdx()>e.tier[1]),'sai bậc gia tộc'],[()=>e.fame&&c.fame+S.fame*0.2<e.fame,`danh vọng chưa tới ${e.fame}`],
   [()=>e.g&&c.g!==e.g,'sai giới'],[()=>e.head&&!isHead(c),'chỉ cho gia chủ'],[()=>e.hh&&c.hh===mainHH(),'chỉ cho người ở chi họ'],
   [()=>{try{return e.c&&!e.c(c)}catch(err){return true}},'điều kiện riêng của sự kiện (c) không đạt'],
   [()=>{if(!e.pair)return false;try{return !alive().some(o=>o.id!==c.id&&!o.away&&e.pair(o,c))}catch(err){return true}},'không có người thứ hai phù hợp (pair)']];
  for(const [f,t] of T){let b=false;try{b=f()}catch(err){b=true}if(b)return t}return ''}
const stg=c=>c.job==='quan_ngu'?(c.lv>=6?3:c.lv>=4?2:c.lv>=2?1:0):c.m<20?0:c.m<60?1:c.m<100?2:3;
const noble=c=>(c.tuoc||0)>0||(spouseOf(c)&&(spouseOf(c).tuoc||0)>0)||S.royal;
function pickEvent(c,ky,baby){
  /* v6.4.1.3: người ở doanh trại chỉ gặp chuyện quân ngũ, không gặp chuyện nhà */
  const army=!!(c.away&&c.away.type==='army');
  const ok=EVENTS.filter(e=>(ky==null||!!e.ky===ky)&&(!baby||e.baby)&&(!army||e.job)&&eligible(e,c));if(!ok.length)return null;
  const jobEv=ok.filter(e=>e.job);
  const pool=jobEv.length&&chance(c.away?1:Math.min(0.45,0.11*jobEv.length))?jobEv:ok;
  S.evn=S.evn||{};S.evLast=S.evLast||{};
  /* v6.3.1: dòng họ nhớ sự kiện vừa xảy ra với bất kỳ ai; càng gần càng khó lặp, hồi dần sau 8 năm (kỳ ngộ: 20 năm) */
  const wt=e=>{const last=S.evLast[e.id];const rec=last==null?1:clamp((S.t-last)/(e.rep||(e.ky?240:96)),0.12,1);
    return (e.w||1)*(e.td&&noble(c)?0.03:1)*(e.good?(c.duyen>60?1.6:1.2):1)*(c.seen[e.id]?1:2)*rec/(1+(S.evn[e.id]||0)*0.3)};
  const tot=pool.reduce((a,e)=>a+wt(e),0);let r=Math.random()*tot;let ev=pool[0];
  for(const e of pool){r-=wt(e);if(r<=0){ev=e;break}}
  /* v6.4.1.3: chưa ghi nhận ở đây. Chỉ ghi lịch sử và thời gian hồi khi hộp thật sự mở (commitEv trong showPopup) */
  const data={};
  if(ev.pair){const os=alive().filter(o=>o.id!==c.id&&!o.away&&ev.pair(o,c));data.oid=pick(os).id}
  stt('pick');
  return {ev:ev.id,data,rnd:1};
}
function commitEv(c,ev){S.evn=S.evn||{};S.evLast=S.evLast||{};c.seen[ev.id]=S.t;S.evLast[ev.id]=S.t;S.cool[ev.id]=S.t+(ev.cd??(ev.ky?24:10));S.evn[ev.id]=(S.evn[ev.id]||0)+1;kyMark(ev)}
/* v6.4.1.3 (admin): đếm số hộp theo năm, giữ 12 năm gần nhất */
function stt(k,v){if(DRY||!S)return;const y=Math.floor(S.t/12);S.stat=S.stat||[];let o=S.stat[S.stat.length-1];
  if(!o||o.y!==y){o={y,pick:0,show:0,drop:0,auto:0,big:0,other:0,evm:0,m0:S.money};S.stat.push(o);if(S.stat.length>12)S.stat.shift()}
  o[k]=(o[k]||0)+(v==null?1:v)}

/* ================= popup ================= */
const O=document.getElementById('overlay'),M=document.getElementById('modal');
const modalOpen=()=>!O.hidden;
function openModal(html,arc,cls){if(DRY)return;const si=html.indexOf('<!--/side-->');const two=si>=0;if(two)html=html.slice(0,si)+'<div class="mmain">'+html.slice(si+12)+'</div>';M.className='modal'+(arc?' arc':'')+(two?' two':'')+(cls?' '+cls:'');M.innerHTML=html;O.hidden=false;M.scrollTop=0;const f=M.querySelector('button:not(:disabled)');if(f)f.focus({preventScroll:true})}
function closeModal(){if(DRY)return;O.hidden=true;M.innerHTML='';render();setTimeout(nextPopup,0)}
function nextPopup(){
  if(DRY||modalOpen()||!S||S.over)return;
  while(S.queue.length){
    const it=S.queue.shift();const c=P(it.cid);
    if(!c)continue;
    if(!inClan(c)&&it.kind!=='death')continue;
    if(it.kind==='birth'&&!c.preg)continue;
    if(it.kind!=='ev')stt('other');
    if(sel!==c.id&&page==='giapha'){sel=c.id;centerNext=true;render()}else sel=c.id;
    showPopup(it,c);return;
  }
}
function headerFor(c){
  return `<aside class="mside"><div class="mhead">${avatarSVG(c,48)}<div><b>${esc(nameOf(c))}</b>${c.tuoc?` <span class="chip gold">${TUOC[c.tuoc]}</span>`:''}<div class="mini">${relation(c)} · ${age(c)} tuổi · ${esc(jobName(c))}${c.away?' · '+awayText(c):''}</div></div></div>
  <div class="chips">${ctChips(c)}${axChips(c)}${realTraits(c).map(traitChip).join('')}${viceChips(c)}</div>${statBlock(c,true)}</aside><!--/side-->`;
}
let AUTO_C=null;
function autoChoice(c,ttl,opts,d){const ok=(opts||[]).filter(o=>{try{return !o.go&&(!o.c||o.c(c,d))}catch(e){return false}});if(!ok.length)return false;
  const probs=ok.map(o=>o.r?prob(c,o.r[0],o.r[1]):null);const i=autoPick(c,ok,probs);const r=runOpt(c,ok[i],probs[i],d);if(S.over)return true;
  log(`${nameOf(c)} · ${ttl} (tự quyết): ${r}`);letterAdd(c,`<b>${esc(ttl)}</b>: ${esc(c.given)} chọn "${esc(ok[i].l)}". ${r}`);stt('auto');setTimeout(nextPopup,0);return true}
/* v6.4.1.5: trẻ con, người già không chọn được những việc phải đi xa */
const FAR_RE=/chu du|lên kinh|bốn phương|vạn dặm|giang hồ|du ngoạn|biên ải|ra trận|tòng quân|đi xa|viễn du|ngao du|vân du/i;
const farBad=c=>{const a=age(c);return a<14||a>=70};
/* v6.6.0: sự kiện có người thứ hai thì hiện rõ người ấy là ai, bao nhiêu tuổi, nghề gì, chỉ số nổi nhất */
function relLine(d,c){const id=d&&(d.who||d.oid||d.xg||d.oth);const o=id&&P(id);if(!o||o.id===c.id)return '';
  const st=['tri','vo','mi','eq'].map(k=>[k,Math.round(o[k]||0)]).sort((a,b)=>b[1]-a[1]).slice(0,2).map(([k,v])=>`${SN[k]} ${v}`).join(', ');
  return `<p class="kvline"><b>Liên quan:</b> ${esc(nameOf(o))}, ${age(o)} tuổi, ${esc(jobName(o))}; ${st}.</p>`}
function choicePopup(c,eyebrow,title,text,opts,arc,data,evId){
  if(DRY)return;
  data=data||{};
  if(AUTO_C&&AUTO_C===c){AUTO_C=null;if(autoChoice(c,title,opts,data))return}
  AUTO_C=null;
  if(evId&&farBad(c)){const keep=opts.filter(o=>!FAR_RE.test(String(o.l||'')+' '+String(o.s||'')));if(keep.length)opts=keep}
  const ok=opts.filter(o=>{try{return (!o.c||o.c(c,data))&&(!evId||optOk(c,o))}catch(e){return false}});
  if(!ok.length)ok.push({l:'Cho qua',f:()=>'Mọi chuyện trôi qua.'});
  // người ra mặt: trẻ con gặp chuyện thì người lớn đứng ra, tỉ lệ theo chỉ số người lớn
  const kidCase=age(c)<16&&ok.some(o=>o.h);
  let helpers=[];
  if(kidCase){helpers=home().filter(p=>p.id!==c.id&&age(p)>=16&&!p.away&&(p.hh===c.hh||isHead(p))&&(c.parents.includes(p.id)||isHead(p)||['ae','chau'].includes(kin(c,p))));
    if(!helpers.length)helpers=[c];
    const spec=ok.find(o=>o.h&&o.r);const score=p=>spec?prob(p,spec.r[0],spec.r[1]):p.eq;
    if(!data.hp||!helpers.some(p=>p.id===data.hp))data.hp=helpers.slice().sort((a,b)=>score(b)-score(a))[0].id}
  const hp=kidCase?P(data.hp):null;
  const who=o=>o.h&&hp?hp:c;
  const probs=ok.map(o=>o.r?prob(who(o),o.r[0],o.r[1]):null);
  const AD=window.BN_ADMIN; /* v6.4.1.1: chỉ có ở admin.html */
  const pv=false?ok.map((o,i)=>{if(o.go)return null;try{return previewOpt(evId,c.id,data,opts.filter(x=>{try{return !x.c||x.c(c,data)}catch(e){return false}}).indexOf(o))}catch(e){return null}}):[];
  const pvTxt=p=>!p?'':p.f!=null?`<small class="pv">→ ${esc(p.f)}</small>`:`<small class="pv"><span class="up">Thành:</span> ${esc(p.y||'?')}${p.n?` · <span class="down">Bại:</span> ${esc(p.n)}`:''}</small>`;
  const ky=evId&&EVMAP[evId]&&EVMAP[evId].ky;
  openModal(`${headerFor(c)}<span class="eyebrow">${eyebrow} · ${dateStr(S.t)}</span><h2>${esc(title)}</h2><p>${text}</p>${relLine(data,c)}
   ${kidCase&&helpers.length>1?`<div class="helper"><span>Người ra mặt</span><div class="seg">${helpers.map(p=>`<button class="btn" data-hp="${p.id}" aria-pressed="${p.id===data.hp}">${esc(p.given)} <small>${KIN_N[kin(c,p)]||''}</small></button>`).join('')}</div></div>`:kidCase&&hp&&hp.id!==c.id?`<div class="helper"><span>Người ra mặt: <b>${esc(hp.given)}</b></span></div>`:''}
   <div class="choices">${ok.map((o,i)=>`<button class="btn" data-ch="${i}"><strong>${esc(o.l)}${o.h&&hp&&hp.id!==c.id?` <small class="muted">(${esc(hp.given)})</small>`:''}</strong>${o.price?`<small>${esc(o.price)}</small>`:''}${evId&&!isHead(c)&&vioOf(o)?`<small class="down">Phạm gia quy: ${esc(RULES[vioOf(o)].n)}</small>`:''}${pvTxt(pv[i])}${AD&&AD.odds?`<small class="adodds">${probs[i]!=null?`Tỉ lệ thành ${Math.round(probs[i]*100)}%`:'Không gieo xúc xắc'}</small>`:''}</button>`).join('')}</div>
`,arc,ky?'ky':'');
  M.querySelectorAll('[data-hp]').forEach(b=>b.onclick=()=>{data.hp=b.dataset.hp;choicePopup(c,eyebrow,title,text,opts,arc,data,evId)});
  M.querySelectorAll('[data-ch]').forEach(b=>b.onclick=()=>{
    const i=+b.dataset.ch;const o=ok[i];let r;if(evId)optTook(c,o);
    if(o.go){o.go(c,data);return}
    const m0=S.money;
    try{
      if(o.r){const p=probs[i];const x=AD&&AD.rollX?AD.rollX(p,o):Math.random();
        if(x<p){r=(o.yy&&x<p*0.18)?'<b>Đại thành công!</b> '+o.yy(c,data):o.y(c,data)}
        else{r=(o.nn&&x>1-(1-p)*0.2)?'<b>Thảm bại!</b> '+o.nn(c,data):o.n(c,data)}}
      else r=o.f(c,data);
    }catch(e){console.error(e);r='Mọi chuyện trôi qua.'}
    if(S.over)return;
    if(evId){stt('evm',S.money-m0);ruleHit(c,o,true)}
    r=withLead(c,o,r);
    if(o.h&&hp&&hp.id!==c.id)r=`<i>${esc(hp.given)} ra mặt.</i> `+r;
    const axd=o.ax||autoAx(o.l);if(axd&&c.dead==null)r+=shiftAx(c,axd);
    log(`${nameOf(c)} · ${title}: ${r}`,/class="down"/.test(r)&&!/class="up"/.test(r)?'hi':'gd');
    M.querySelector('.choices').outerHTML=`<div class="result">${r}</div><div class="choices"><button class="btn primary" data-ok>Tiếp tục</button></div>`;
    const hl=M.querySelector('.helper');if(hl)hl.remove();
    const nn=M.querySelector('.note');if(nn)nn.remove();
    const okb=M.querySelector('[data-ok]');
    okb.onclick=()=>{if(S.over)return;if(c.suc<=0&&c.dead==null)die(c,'không qua khỏi');closeModal()};
    okb.focus();
    if(AD&&AD.onResult)AD.onResult();
  });
  if(AD&&AD.onChoice)AD.onChoice({c,ok,probs,evId,data,opts});
}
/* v6.1: kết quả luôn có một câu dẫn trước phần cộng trừ */
function withLead(c,o,r){
  r=r||'';const plain=r.replace(/<span class="fx">[\s\S]*$/,'').replace(/<[^>]+>/g,'').trim();
  if(plain.length>=4)return r;
  const l=String(o.l||'').replace(/\s*\([^)]*\)\s*$/,'');
  const lead=l?`${esc(c.given)} ${esc(l.charAt(0).toLowerCase()+l.slice(1))}.`:'Mọi chuyện trôi qua.';
  return lead+(r?' '+r:'');
}
function infoPopup(c,eyebrow,title,text,after){
  if(DRY)return;
  openModal(`${c?headerFor(c):''}<span class="eyebrow">${eyebrow}</span><h2>${esc(title)}</h2><p>${text}</p><div class="choices"><button class="btn primary" data-ok>Tiếp tục</button></div>`);
  M.querySelector('[data-ok]').onclick=()=>{if(after)after();if(S&&!S.over)closeModal()};
}
function showPopup(it,c){
  const skip=()=>setTimeout(nextPopup,0);
  /* v6.4.1.5: hộp mốc chỉ số, mốc thông thạo của người ngoài quyền điều khiển cũng tự quyết */
  AUTO_C=(['ms','mm','preg','sick','retire','job','job18'].includes(it.kind)&&!isCtrl(c))?c:null; /* v6.6.0: người ngoài quyền điều khiển tự quyết cả chuyện thai sản, bệnh, hưu, nghề */
  if(it.kind==='ev'&&it.data&&it.data.xg){const p=P(it.data.xg);if(p&&p.outSp){if(it.ev==='v62_xg_bi_bat_nat'){p.outSp.coi=1;p.outSp.nhin=1}if(it.ev==='v62_xg_ly_hon_ve')p.outSp.back=1}}
  switch(it.kind){
    case 'ev':{const ev=EVMAP[it.ev];if(!ev){skip();return}const d=it.data||{};
      if(it.ev==='bat_linh'&&(c.away||c.job==='quan_ngu')){skip();return}
      if(ev.ct&&(ctRank(c,ev.ct[0])>=ev.ct[1]||c.away||c.dead!=null)){skip();return}
      if(d.oid){const o=P(d.oid);if(!o||!inClan(o)){skip();return}}
      if(d.xg){const o=P(d.xg);if(!o||o.dead!=null||!o.left){skip();return}}
      if(d.who){const o=P(d.who);if(!o||!inClan(o)){skip();return}}
      try{if(!d._force&&ev.c&&!ev.c(c,d)&&!ev.arc&&!ev.fixed){skip();return}}catch(e){skip();return}
      /* v6.4.1.3: sự kiện bốc ngẫu nhiên được xét lại đủ điều kiện lúc mở hộp; không còn hợp lệ thì bỏ, không tốn thời gian hồi */
      if(it.rnd&&!d._force){let okE=false;try{okE=eligible(ev,c)}catch(e){}if(!okE||(c.away&&c.away.type==='army'&&!ev.job)){stt('drop');skip();return}commitEv(c,ev)}
      const txt=typeof ev.x==='function'?ev.x(c,d):ev.x;
      const opts=typeof ev.o==='function'?ev.o(c,d):ev.o;
      const ttl=typeof ev.t==='function'?ev.t(c,d):ev.t;
      /* v6.4.1.3: người chơi không điều khiển người này thì người ấy tự quyết theo tính cách */
      if(!d._force&&!isCtrl(c)&&autoEv(c,ev,d,ttl,txt,opts))return;
      stt('show');
      choicePopup(c,ev.k||(ev.arc?'Cốt truyện':ev.ky?'Kỳ ngộ':'Sự kiện'),ttl,txt,opts,ev.arc,d,ev.id);break}
    case 'vio':return vioPopup(c,it);
    case 'letter':return letterPopup(c);
    case 'ruleRemind':return ruleRemindPopup(c);
    case 'ms':if(!c.brk&&gateCap(c,it.k)===it.t)return msPopup(c,it.k,it.t);skip();return;
    case 'ttl':return ttlPopup(c,it);
    case 'thienco':if(!c.brk)return thiencoPopup(c,it);skip();return;
    case 'ly':return lyPopup(c,it);
    case 'tumat':return tumatPopup(c,it);
    case 'oan':if(inClan(c)&&(c.oan||0)>=40)return oanPopup(c);skip();return;
    case 'chuno':return chunoPopup(c,it.st);
    case 'tranhvi':return tranhviPopup(c,it);
    case 'rulechg':if(isHead(c))return rulechgPopup(c,it);skip();return;
    case 'ruleprop':if(inClan(c))return rulepropPopup(c,it);skip();return;
    case 'ruleforce':return ruleforcePopup(c,it);
    case 'vuotsinh':return vuotsinhPopup(c,it);
    case 'mm':if(!['none','vua','huu'].includes(c.job))return mmPopup(c,it.t);skip();return;
    case 'promo':if(canPromote(c))return promoPopup(c);skip();return;
    case 'post':if(inPost(c)&&seatOfC(c)===it.key)return postPopup(c,it.key);skip();return;
    case 'term':if(isOff(c))return termPopup(c);skip();return;
    case 'office':if(isOff(c)||(c.job==='quan_ngu'&&c.lv>=3))return officePopup(c);skip();return;
    case 'resign':if(c.job==='quan')return resignPopup(c);if(c.job==='quan_ngu')return dischargePopup(c);skip();return;
    case 'retire':return retirePopup(c);
    case 'sick':return sickPopup(c);
    case 'exam':if(c.exam&&c.exam.stage===it.stage)return examPopup(c,it.stage,it.round||0);skip();return;
    case 'vexam':if(c.vexam&&!c.away&&!['quan','quan_ngu','vua'].includes(c.job))return vexamPopup(c);skip();return;
    case 'job18':if(c.job==='none'&&!c.away&&!(c.tuoc>0))return jobChoice(c,true);skip();return;
    case 'job':if(c.job==='none'&&!c.away&&!(c.tuoc>0)&&!(c.flags.jobRetry>S.t+1))return jobChoice(c,false);skip();return;
    case 'ask':if(inClan(c)&&!c.away)return askPopup(c,it.t);skip();return;
    case 'conflict':return conflictPopup(it);
    case 'vice':return vicePopup(P(it.by),c,it.k);
    case 'school':if(!isCtrl(c)){schoolAuto(c,it.lvl);skip();return}return schoolPopup(c,it.lvl);
    case 'preg':if(c.preg)return pregPopup(c);skip();return;
    case 'birth':if(c.preg){if(!isCtrl(c)){AUTO_B=true;const mw=MIDWIFE[1];doBirth(c,mw[2],mw[3],mw[0]);return}return birthPopup(c)}skip();return;
    case 'death':return deathPopup(c,it.cause);
    case 'heir':return heirPopup();
    case 'trade':return tradeReturn(c,it.trip);
    case 'raise':return raisePopup(it);
    case 'raiseY':return raiseYPopup(it);
    case 'haubo':return hauBoPopup(c);
    case 'brEnd':return brEndPopup(c,it);
    case 'coro':return coroPopup();
    case 'reward':return rewardPopup(c,it.what);
    case 'bhelp':if(S.hh[it.hh]&&S.hh[it.hh].money<0)return branchHelpPopup(c,it.hh);skip();return;
    case 'vacant':return vacantPopup(c,it.hh);
    case 'braise':if(EMPLOYEE(c)&&!c.away)return bossRaisePopup(c);skip();return;
    case 'brkmid':if(c.brk)return brkMidPopup(c);skip();return;
    case 'brkend':if(c.brk)return brkEndPopup(c);skip();return;
    case 'tho':return thoPopup(c,it.a);
  }
}

/* ================= mốc chỉ số ================= */
const MS_TXT={
  tri:{50:'Học vấn đã có nền. Tú tài trong làng mời bình văn.',80:'Kiến thức uyên bác, người trong huyện tìm đến hỏi chuyện.',100:'Đọc hết sách trong thư khố, cảm thấy chạm đến giới hạn của sách vở.',120:'Có cao tăng mời luận đạo trên đỉnh núi mây mù.',150:'Thông kim bác cổ, mưu lược sâu xa như biển.'},
  vo:{50:'Gân cốt đã cứng cáp, tay không đánh ngã được trai làng.',80:'Võ nghệ có tiếng, võ đường quanh vùng đều biết tên.',100:'Khổ luyện đến cực hạn, mỗi chiêu đều không thể nhanh hơn.',120:'Một ẩn sĩ râu tóc bạc phơ chặn đường, nói muốn thử chiêu.',150:'Võ công đăng phong tạo cực, thiên hạ hiếm người địch nổi.'},
  suc:{50:'Thân thể dẻo dai, ít khi ốm vặt.',80:'Khí huyết sung mãn, làm việc cả ngày không biết mệt.',100:'Thân thể cường tráng đến cực hạn của người thường.',120:'Một đạo sĩ chỉ cho phép dưỡng sinh luyện khí.',150:'Kim cương bất hoại, trăm bệnh không xâm.'},
  mi:{50:'Đi đến đâu cũng có người ngoái nhìn.',80:'Dung mạo và phong thái được cả phố khen ngợi.',100:'Danh tiếng phong nhã lan khắp phủ huyện.',120:'Họa sĩ cung đình xin vẽ chân dung.',150:'Khuynh quốc khuynh thành, một nụ cười làm nghiêng ngả lòng người.'},
  eq:{50:'Ăn nói khéo léo, hàng xóm quý mến.',80:'Hiểu lòng người, ai cũng muốn tâm sự.',100:'Thấu tình đạt lý đến mức ít ai bì kịp.',120:'Bậc trưởng lão trong vùng mời làm người hòa giải.',150:'Thu phục lòng người không cần một lời.'}};
/* mốc 100: mỗi lần xuất hiện bốc ngẫu nhiên vài con đường khác nhau, luôn giữ lựa chọn nhờ cao nhân chỉ điểm. Thất bại thì 1 đến 3 năm sau có cơ hội lại */
const BRK={
  tri:[['Bế quan đọc lại kinh điển từ đầu','Ôn cố tri tân',{tri:1,eq:0.3}],['Lên kinh tranh luận với các danh nho','Thắng thua đều mở mang',{tri:1,mi:0.3}],['Chu du thiên hạ ghi chép phong tục','Đi vạn dặm đường',{tri:1,suc:0.4}],['Giải thế cờ tàn của tiền nhân','Một nước cờ ngộ cả đạo',{tri:1}],['Dịch một bộ sách ngoại quốc','Học cái người chưa học',{tri:1,eq:0.2}]],
  vo:[['Bế quan khổ luyện trong hang núi','Hao tổn sức lực',{vo:1,suc:0.4}],['Tìm cao thủ giang hồ luận võ','Thua thì bị thương',{vo:1}],['Luyện dưới thác nước giữa mùa đông','Rèn gân cốt tới cực hạn',{vo:1,suc:0.6}],['Quan sát hổ báo trong rừng sâu','Học thế của mãnh thú',{vo:1,tri:0.3}],['Nghiên cứu binh thư, đem mưu vào võ','Lấy trí dẫn lực',{vo:1,tri:0.4}]],
  suc:[['Tịch cốc dưỡng sinh ba tháng','Thanh lọc thân thể',{suc:1,eq:0.3}],['Theo đạo sĩ học phép thở','Khí hành chu thiên',{suc:1}],['Tắm suối nước nóng trên núi tuyết','Đường xa hiểm trở',{suc:1,vo:0.3}],['Lao động khổ luyện ngoài đồng một mùa','Thân thể tự rèn',{suc:1}]],
  mi:[['Học lễ nghi cung đình','Từng cử chỉ đều thành phong thái',{mi:1,eq:0.4}],['Theo danh kỹ học đàn ca','Thanh sắc đều lên',{mi:1}],['Mở một buổi nhã tập mời văn nhân','Danh tiếng lan xa',{mi:1,tri:0.3}],['Tĩnh tâm dưỡng nhan','Đẹp từ trong ra',{mi:1,eq:0.3}]],
  eq:[['Làm người hòa giải các vụ tranh chấp','Thấu lòng người',{eq:1}],['Lặng lẽ quan sát chợ búa một năm','Hiểu muôn kiểu người',{eq:1,tri:0.3}],['Ngồi thiền ở chùa','Tâm tĩnh thì sáng',{eq:1}],['Kết giao với kẻ mình ghét nhất','Đổi thù thành bạn',{eq:1,mi:0.3}]]};
function msPopup(c,k,t){
  const N=SN[k];t=t||100;const paths=brkPaths(c,k,t);
  const opts=paths.map(p=>({l:p.l,price:p.cost?'Tốn '+money(mm(p.cost)):'',c:()=>!p.cost||canPay(c,mm(p.cost)),f:c=>brkStart(c,k,p,t)}));
  opts.push({l:'Chưa vội, để sau',f:c=>{c.ms[k]=(c.ms[k]||[]).filter(x=>x!==100);c.msRetry[k]=S.t+R(24,48);if(c.msQ)c.msQ[k]=null;return 'Biết mình đã chạm ngưỡng, nhưng chưa phải lúc dốc sức.'+fx(c,{tam:2})}});
  choicePopup(c,`${N} ${t}`,`Chạm ngưỡng ${N.toLowerCase()} ${t}`,(t===100?MS_TXT[k][100]:(GATE_TXT[k]&&GATE_TXT[k][t])||MS_TXT[k][100])+` Muốn vượt qua phải bỏ ra nhiều tháng${t>100?', ải càng cao càng chậm và càng dễ hỏng':''}. Mỗi người có những con đường hợp với mình.`,opts);
}

/* ================= mốc thông thạo, thăng tiến, nghỉ hưu ================= */
function mmPopup(c,t){
  const J=JOBS[c.job];const st=J.st;const opts=[];
  if(c.job==='chu'){const b=bizOf(c);opts.push({l:'Dồn tâm vào cơ sở',f:c=>{if(b)b.bonus=Math.min(0.5,(b.bonus||0)+0.05);return 'Sổ sách gọn gàng, khách quen tăng dần.'+fx(c,{m:2,sk:{ql:2}})}})}
  else if(c.job==='quan')opts.push({l:'Dồn tâm vào việc công',f:c=>'Án tồn đọng giải quyết xong, dân trong hạt khen ngợi.'+fx(c,{m:2,fame:4,liem:2})},{l:'Kết giao đồng liêu',f:c=>'Quan hệ trong nha môn rộng thêm.'+fx(c,{eq:1,fame:2,sk:{khau:1}})});
  if(EMPLOYEE(c))opts.push({l:'Xin tăng tiền công',r:[{eq:1,mi:0.4},55],y:c=>'Được tăng công.'+fx(c,{bonus:0.12}),n:c=>'Bị từ chối, còn bị để ý.'+fx(c,{bonus:-0.04,tam:-4})});
  opts.push({l:'Dồn tâm vào tay nghề',f:c=>'Tay nghề thêm vững.'+fx(c,{m:2,[st]:2})});
  opts.push({l:'Truyền nghề cho con cháu',c:()=>home().some(p=>p.hh===c.hh&&age(p)>=8&&age(p)<18),f:c=>{home().filter(p=>p.hh===c.hh&&age(p)>=8&&age(p)<18).forEach(p=>p.pre[c.job]=(p.pre[c.job]||0)+3);return 'Con cháu học được ít nghề.'+fx(c,{tam:3})}});
  if(t>=100&&c.job!=='quan')opts.push({l:'Dấn thân vào việc lớn',s:'Cơ hội lớn, rủi ro lớn',r:[{[st]:1,m:1,eq:0.5},95],y:c=>'Thành công vang dội!'+fx(c,{money:mm(R(30,90)),fame:30}),n:c=>'Thất bại, hao tổn nặng.'+fx(c,{money:-mm(R(15,40)),suc:-10,tam:-10})});
  const r=nextReq(c);const need=r?Object.entries(r).filter(([k,v])=>k!=='land').map(([k,v])=>k==='m'?`thông thạo ${v}`:k==='fame'?`danh vọng ${v}`:k==='degree'?'đỗ cử nhân':k==='flag'?'một cơ duyên riêng':`${SN[k]} ${v}`).join(', '):'';
  choicePopup(c,'Thông thạo '+t,`${J.n}: thông thạo ${t}`,`${esc(c.given)} đã thông thạo nghề tới mức ${t}/120. ${t>=60?'Người trong nghề bắt đầu nể trọng.':'Tay nghề dần vững.'}${need?` Muốn lên ${J.lv[c.lv+1].n.toLowerCase()} cần: ${need}.`:''}`,opts);
}
function promoPopup(c){
  const J=JOBS[c.job];
  if(c.job==='quan')return officePopup(c);
  if(c.job==='nguy')return nguPromo(c);
  if(false){const vac=0,next='';
    return choicePopup(c,'Hoạn lộ','Có chức trống?',`Nghe tin trên ${['huyện','phủ','tỉnh','bộ'][Math.min(3,Math.floor(c.lv/2))]} có chức ${next} sắp trống. Người tranh không ít, còn phải xem thượng quan có ưng không.`,[
      {l:'Xin khảo hạch công bằng',r:[{tri:1,eq:0.6,fame:0.4},52+c.lv*6],y:c=>chance(vac*1.6)?`Được thăng ${next}!`+fx(c,{lv:1,fame:10+c.lv*4,tam:6}):'Đủ năng lực nhưng chức đã có người ngồi.'+fx(c,{tam:-3})+((c.flags.noPromoUntil=S.t+R(6,18)),''),n:c=>{c.flags.noPromoUntil=S.t+R(12,24);return 'Thượng quan gác lại hồ sơ.'+fx(c,{tam:-4})}},
      {l:`Lo lót thượng quan (${money(mm(10*(c.lv+1)))})`,c:()=>S.money>=mm(10*(c.lv+1)),f:c=>{const cost=-mm(10*(c.lv+1));return chance(0.4+vac)?`Được cất nhắc lên ${next}.`+fx(c,{money:cost,lv:1,liem:-8}):'Tiền mất, chức không lên.'+fx(c,{money:cost,liem:-5})}},
      {l:'Nhường cho người khác',f:c=>{c.flags.noPromoUntil=S.t+24;return 'Được tiếng khiêm nhường.'+fx(c,{fame:5,eq:1})}}]);}
  if(c.job==='quan_ngu'){const next=ARMY[c.lv+1][0];
    return choicePopup(c,'Quân công',`Xét công: ${next}`,`Chiến công của ${esc(c.given)} đã đủ ${fmt(c.merit)}. Trong doanh có chức ${next} khuyết.`,[
      {l:'Trình công lên tướng quân',r:[{vo:1,tri:0.5,eq:0.4},Math.max(30,50+c.lv*7-famePromo(c))],y:c=>{const jump=c.lv+2<ARMY.length&&c.merit>=ARMY[c.lv+2][2]&&c.vo>=75?2:1;if(c.lv+jump>=3)enqueue('office',c.id);return (jump>1?`Công lao quá lớn, được vượt cấp lên ${ARMY[c.lv+2][0]}!`:`Được thăng ${next}!`)+fx(c,{lv:jump,fame:6+c.lv*4,tam:8})},n:c=>{c.flags.noPromoUntil=S.t+R(3,5);return 'Hồ sơ bị gác lại, có kẻ giành mất chỗ trống. Công lao vẫn còn ghi sổ.'+fx(c,{merit:-2,tam:-6})}},
      {l:'Lặng lẽ chờ',f:c=>{if(chance(0.4)){if(c.lv+1>=3)enqueue('office',c.id);return `Thượng cấp tự đề bạt lên ${next}.`+fx(c,{lv:1})}return 'Chưa đến lượt.'}}]);}
  const L=J.lv[c.lv+1];
  choicePopup(c,'Thăng tiến',`Cơ hội làm ${L.n.toLowerCase()}`,`${esc(c.given)} đã đủ điều kiện gánh vác việc của ${L.n.toLowerCase()}. Chủ cũ, thầy cũ hoặc phường hội đang cân nhắc.`,[
    {l:'Nhận trọng trách',r:[{[J.st]:1,eq:0.5,m:0.5},40+c.lv*8-famePromo(c)],y:c=>`Lên ${L.n}!`+fx(c,{lv:1,fame:3+c.lv*2,tam:6}),n:c=>{c.flags.noPromoUntil=S.t+12;return 'Chưa được tin tưởng, đợi dịp sau.'+fx(c,{tam:-5})}},
    {l:'Từ chối, giữ việc cũ cho nhàn',f:c=>{c.flags.noPromoUntil=S.t+24;return fx(c,{tam:3})}}]);
}
function leaveJob(c){if(c.seat)leaveSeat(c);if(c.biz){const b=bizOf(c);if(b)b.owner=null;c.biz=null}c.away=null;c.job='none';c.lv=0;c.bonus=0}
function sickPopup(c){
  const J=JOBS[c.job];const mil=['quan_ngu','hiep'].includes(c.job);
  choicePopup(c,'Bệnh tật','Sức khỏe suy kiệt',`${esc(c.given)} mới ${age(c)} tuổi mà sức đã cạn, việc ${J.n.toLowerCase()} không gánh nổi nữa. Thầy thuốc bảo cần dưỡng sức lâu dài, chưa phải hết đường.`,[
    {l:`Nghỉ dưỡng bệnh, uống thuốc (${money(mm(2))})`,c:()=>S.money>=mm(2)&&!mil,f:x=>{S.money-=mm(2);x.busyUntil=S.t+R(6,12);x.flags.noRetireUntil=S.t+48;return 'Nằm dưỡng nhiều tháng, thuốc thang đủ đầy, sức dần hồi.'+fx(x,{suc:R(14,24),tam:2})}},
    {l:mil?'Xin giải ngũ, về quê dưỡng thương':'Đổi sang việc nhẹ hơn',f:x=>{leaveJob(x);x.flags.noRetireUntil=S.t+48;enqueue('job',x.id);return mil?'Được cho về quê, mang theo vết thương cũ.'+fx(x,{suc:R(6,12),tam:-2}):'Bỏ việc nặng, tìm việc vừa sức hơn.'+fx(x,{suc:R(6,12)})}},
    {l:'Cắn răng làm tiếp',r:[{suc:1,eq:0.3},40],y:x=>'Gượng được qua cơn bệnh.'+fx(x,{tam:-2}),n:x=>'Gục ngã giữa chừng.'+fx(x,{suc:-R(6,12),hpMax:-R(1,3),tam:-6})}]);
}
/* v6.4.1.1: truyền việc khi nghỉ hưu: người chơi chọn người nối, chỉ người cùng hộ (nhà chính hoặc chi), ưu tiên con cháu trực hệ.
   Chủ cơ sở truyền việc thì chuyển luôn quyền trông cơ sở, người nhận phải đủ điều kiện trông. Việc có ghế (quan, ngự y) không truyền được. */
function retireHand(c){
  if(c.seat||['quan','quan_ngu','hiep','nguy','vua'].includes(c.job))return [];
  const b=c.job==='chu'?bizOf(c):null;const jj=k=>b?relJob(k,b.type):c.job;
  const desc=p=>p.parents.includes(c.id)||p.parents.some(id=>{const q=P(id);return q&&q.parents.includes(c.id)});
  /* v6.4.1.2: cơ sở chỉ truyền cho người đang làm nghề hợp với cơ sở và đủ điều kiện trông; việc khác truyền cho người chưa có nghề */
  const L=alive().filter(p=>p.id!==c.id&&inClan(p)&&p.hh===c.hh&&!p.away&&age(p)>=16&&(b?!p.biz&&!mgrWhy(p,b).length:p.job==='none'))
    .sort((x,y)=>(desc(y)-desc(x))||(jobM(y,jj(y))-jobM(x,jj(x))));
  return L.slice(0,4).map(k=>({l:`Truyền việc cho ${k.given} (${age(k)} tuổi)`,s:`${desc(k)?'Con cháu trực hệ · ':''}${b?esc(jobName(k))+' · ':''}thông thạo ${JOBS[jj(k)]?JOBS[jj(k)].n.toLowerCase():''} ${Math.floor(jobM(k,jj(k)))}${b?' · quản trị '+Math.floor(qlOf(k)):''}`,f:c=>{
    retireMark(c);
    if(b){c.biz=null;becomeChu(k,b)}
    else{setJob(k,c.job);k.m=Math.max(k.m,c.m*0.3)}
    c.job='huu';c.lv=0;c.bonus=0;log(`${nameOf(c)} nghỉ hưu, ${nameOf(k)} nối việc${b?' trông '+BIZ[b.type].lv[b.lv][0].toLowerCase():''}.`);
    return `${esc(k.given)} nối nghiệp${b?', nhận trông cơ sở':''}.`+fx(c,{tam:8})}}))}
function retirePopup(c){
  const a=age(c);const J=JOBS[c.job];
  choicePopup(c,'Tuổi tác','Nghỉ ngơi hay gắng sức?',`${esc(c.given)} đã ${a} tuổi${c.suc<30?', sức khỏe sa sút':''}. Việc ${J.n.toLowerCase()} ngày càng nặng nhọc.`,[
    {l:'Nghỉ hưu, an hưởng tuổi già',f:c=>{retireMark(c);if(c.seat)leaveSeat(c);if(c.job==='quan_ngu'||c.job==='hiep'){c.away=null}if(c.biz){const b=bizOf(c);if(b)b.owner=null;c.biz=null}c.job='huu';c.lv=0;c.bonus=0;return 'Gác lại công việc.'+fx(c,{tam:10,fame:c.job==='quan'?10:2})}},
    {l:'Còn gắng làm thêm',r:[{suc:1,eq:0.3},55],y:c=>'Vẫn làm tốt như xưa.'+fx(c,{tam:2}),n:c=>'Kiệt sức đổ bệnh.'+fx(c,{suc:-R(8,15),hpMax:-R(1,3),tam:-5})},
    ...retireHand(c)]);
}

/* ================= khoa cử: mỗi kỳ nhiều vòng ================= */
const EXAM_N=['thi Hương','thi Hội','thi Đình'];
const ROUNDS=[
  [['Kinh nghĩa','Giải nghĩa Tứ thư Ngũ kinh'],['Chiếu biểu','Thảo chiếu, biểu, luận'],['Văn sách','Bàn việc nước']],
  [['Kinh nghĩa','Đề hiểm hóc hơn, giám khảo khắt khe'],['Thơ phú','Phú theo đề bài'],['Văn sách','Kế sách trị quốc']],
  [['Điện thí','Vua ra đề sách vấn'],['Sách vấn','Vua hỏi kế trị nước'],['Luận sử','Bàn chuyện hưng vong đời trước'],['Thơ ứng chế','Làm thơ theo đề vua ra'],['Đối đáp','Vua hỏi trực tiếp']]];
const AP={
  'Kinh nghĩa':[['Bám sát chú giải của tiên nho',{tri:1},0,0],['Đưa kiến giải riêng',{tri:1,mi:0.2},-15,22],['Dẫn nhiều điển tích',{tri:1},-5,10]],
  'Chiếu biểu':[['Văn phong trang trọng chuẩn mực',{tri:1,eq:0.3},0,0],['Lời lẽ hoa mỹ',{tri:0.6,mi:0.6},-10,15]],
  'Văn sách':[['Bàn chuyện thủy lợi, nông tang',{tri:1},0,4],['Bàn chuyện biên phòng',{tri:1,vo:0.3},-6,12],['Chỉ thẳng tệ nạn quan trường',{tri:1,eq:-0.2},-20,25]],
  'Thơ phú':[['Theo đúng niêm luật',{tri:1},0,0],['Phóng khoáng tài hoa',{mi:0.7,tri:0.7},-12,18]],
  'Điện thí':[['Ca ngợi thánh đức, khuyên nhủ nhẹ nhàng',{tri:1,eq:0.6},0,0],['Can gián thẳng thắn',{tri:1},-18,28],['Đưa kế sách cụ thể',{tri:1,eq:0.3},-6,14]],
  'Đối đáp':[['Khiêm cung, dè dặt',{eq:1,tri:0.5},0,0],['Ứng đối nhanh nhạy, dí dỏm',{eq:0.6,mi:0.6,tri:0.6},-10,16]],
  'Sách vấn':[['Theo phép cũ, giữ nước bằng nhân nghĩa',{tri:1,eq:0.3},0,0],['Đề xuất cải cách thuế khóa',{tri:1},-12,18],['Bàn việc biên phòng, quân lương',{tri:0.8,vo:0.3},-6,10]],
  'Luận sử':[['Dẫn chính sử, bàn điều được mất',{tri:1},0,0],['Lấy chuyện xưa răn việc nay',{tri:1,eq:0.3},-10,16]],
  'Thơ ứng chế':[['Ngợi ca thái bình, đúng niêm luật',{tri:0.8,mi:0.4},0,0],['Ý thơ sâu xa, gửi lời can gián',{tri:0.7,mi:0.7},-14,20]]};
function examPopup(c,stage,round){
  const rs=ROUNDS[stage];const [rn,rd]=rs[round];
  if(round===0)c.exam.cur=[];
  const aps=AP[rn].slice();
  const opts=aps.map(([l,spec,lo,hi])=>({l,s:hi?`Có thể cao hơn hoặc thấp hơn hẳn`:'Chắc chắn, ít bất ngờ',f:c=>{
    let v=0,w=0;for(const k in spec){v+=c[k]*spec[k];w+=Math.abs(spec[k])}
    /* v6.4.1.5.1: điểm mỗi vòng tối đa 100, kể cả cộng danh hiệu; chỉ số nặng ít hơn, cộng danh hiệu còn một nửa */
    const sc=Math.round(clamp((v/w*0.7+R(0,20)+tsum(c,'exam')*0.5+fameExam(c)+(thanHas('thanhnhan')?2:0)+(thanHas('giamchinh')?2:0))*cond(c)/0.9-stage*5+R(lo,hi),0,100));
    c.exam.cur.push(sc);return `Vòng ${rn}: được ${sc} điểm.`}}));
  if(round===0&&stage<2)opts.push({l:`Mua đề từ kẻ lạ (${money(mm(8+stage*8))})`,s:'Gian lận có thể bị bắt',c:()=>S.money>=mm(8+stage*8),f:c=>{S.money-=mm(8+stage*8);if(chance(0.35)){c.exam=null;return 'Bị bắt quả tang gian lận! Đuổi khỏi trường thi.'+fx(c,{fame:-40,tam:-20,cfame:-15})}c.exam.cheat=12;c.exam.cur.push(clamp(Math.round(c.tri*0.6+30),0,100));return 'Đề trúng y như mua.'}});
  const warn=c.tam<40||c.suc<50?' Tinh thần và sức khỏe không tốt sẽ kéo điểm xuống.':'';
  choicePopup(c,'Khoa cử',`Kỳ ${EXAM_N[stage]} · vòng ${round+1}/${rs.length}: ${rn}`,`${rd}.${round===0?(stage===2?' Thi Đình không đánh trượt, chỉ xếp hạng.':` Khoa này lấy đỗ theo chỉ tiêu: xếp hạng với ${stage===0?'sĩ tử cả tỉnh':'cử nhân cả nước'}, chỉ vài chục người đầu được đỗ.`):` Điểm các vòng trước: ${c.exam.cur.join(', ')}.`}${warn}`,opts);
  // sau khi chọn: chuyển vòng
  const okWrap=()=>{const b=M.querySelector('[data-ok]');if(!b){setTimeout(okWrap,30);return}const orig=b.onclick;b.onclick=()=>{
    if(!c.exam){orig();return}
    if(round+1<rs.length){enqueue('exam',c.id,{stage,round:round+1},true);orig();return}
    const avg=Math.round(c.exam.cur.reduce((a,b)=>a+b,0)/c.exam.cur.length);
    const txt=finishExam(c,stage,avg);O.hidden=true;M.innerHTML='';infoPopup(c,'Khoa cử','Yết bảng',txt)}};
  M.querySelectorAll('[data-ch]').forEach(b=>b.addEventListener('click',okWrap));
}
/* v6.4.1.2: đỗ theo chỉ tiêu. Thi Hương xếp hạng với sĩ tử cả tỉnh, thi Hội với cử nhân cả nước; mỗi khoa số người dự và số lấy đỗ thay đổi.
   Nhà có từ bốn người làm quan thì khảo quan dè chừng, thi Hội bị trừ điểm. Mốc đỗ thực tế khoảng 62 (thi Hương) và 72 (thi Hội). */
const EXQ=[{n:[350,700],q:[18,32],mu:44,sd:11},{n:[250,450],q:[10,18],mu:56,sd:9}];
function ncdf(z){const t=1/(1+0.2316419*Math.abs(z));const d=0.3989423*Math.exp(-z*z/2);const p=d*t*(0.3193815+t*(-0.3565638+t*(1.781478+t*(-1.821256+t*1.330274))));return z>0?1-p:p}
function examRank(stage,s,pen){const E=EXQ[stage];const N=R(E.n[0],E.n[1]),Q=R(E.q[0],E.q[1]);
  const rank=Math.min(N,Math.max(1,Math.round(N*(1-ncdf((s-pen-E.mu)/E.sd)))+1));return {N,Q,rank,ok:rank<=Q}}
function finishExam(c,stage,s){
  if(c.g==='nữ'&&!S.royal&&chance(clamp(0.32-(c.tri-100)/250-skv(c,'muu')/300,0.04,0.32))){c.exam=null;return 'Giám khảo phát hiện nữ cải nam trang! Bị đuổi khỏi trường thi, cả nhà mang tiếng.'+fx(c,{fame:-20,tam:-15,cfame:-10})}
  c.exam.scores[stage]=s;
  if(stage<2){const nq=clanQuan();const pen=stage===1?Math.min(10,Math.max(0,nq-3)*2.5):0;const X=examRank(stage,s,pen);
    const rt=`Trung bình ${s} điểm, xếp thứ ${X.rank} trong ${X.N} ${stage===0?'sĩ tử':'cử nhân'}, khoa này lấy ${X.Q} người.${pen?' Nhà đã nhiều người làm quan, khảo quan chấm khắt khe hơn.':''}`;
    if(stage===0){if(X.ok){c.exam.stage=1;c.degree=Math.max(c.degree,1);achieve(c,'đỗ thi Hương, thành Cử nhân');return `${rt} Đỗ thi Hương, thành Cử nhân. Tháng Hai năm sau dự thi Hội.`+fx(c,{fame:12,tam:10,cfame:5})}
      return `${rt} Trượt thi Hương. Ba năm nữa mới có khoa sau.`+fx(c,{tri:2,tam:-8})}
    if(X.ok){c.exam.stage=2;c.degree=Math.max(c.degree,2);achieve(c,'đỗ thi Hội');return `${rt} Đỗ thi Hội! Tháng Ba vào điện thi Đình.`+fx(c,{fame:20,tam:10,cfame:8})}
    return `${rt} Trượt thi Hội. Ba năm nữa mới có khoa sau.`+fx(c,{tri:2,tam:-8})}
  /* v6.4.1.5.1: danh hiệu và chức được bổ chỉ theo điểm thi Đình. Trạng nguyên được tới Lục phẩm, Bảng nhãn và Thám hoa tới Thất phẩm, Tiến sĩ tới Bát phẩm hoặc Cửu phẩm */
  const title=s>=95?'Trạng nguyên':s>=90?'Bảng nhãn':s>=86?'Thám hoa':'Tiến sĩ';
  const rank=s>=95?3:s>=86?2:s>=76?1:0;
  c.degree=3;c.exam=null;achieve(c,'đỗ thi Đình');c.flags.examRank=rank;c.flags.examTitle=title;
  enqueue('ev',c.id,{ev:'sauthi'},true);
  return `Thi Đình được ${s} điểm, đỗ <b>${title}</b>, có thể được bổ chức <b>${RANKS[rank]}</b>.`+fx(c,{fame:title==='Tiến sĩ'?40:90,tam:15,cfame:title==='Tiến sĩ'?20:50});
}
function register(c){
  if((S.noExamClan||0)>S.t){log(`Họ ${S.surname} đang bị cấm ứng thí, ${nameOf(c)} không ghi danh được.`);return}
  /* v6.4.1: rút tên rồi ghi danh lại thì thi tiếp từ kỳ đang dở, học vị đã đỗ vẫn còn */
  const sv=c.flags.exSave;const st=sv?Math.min(sv.stage,c.degree):0;
  c.exam={stage:st,scores:sv&&st>0?sv.scores.slice(0,st):[]};delete c.flags.exSave;
  log(`${nameOf(c)} ${st>0?'ghi danh thi tiếp':'ghi danh khoa cử'}.`)}
function withdrawPopup(c){
  const opts=[];
  if(c.exam)opts.push({l:`Rút tên khỏi khoa thi văn (kỳ ${EXAM_N[c.exam.stage]})`,s:'Học vị đã đỗ vẫn giữ, nghỉ thi hai năm',f:c=>{
    c.flags.exSave={stage:c.exam.stage,scores:c.exam.scores.slice()};c.exam=null;c.flags.noExam=S.t+24;
    log(`${nameOf(c)} rút tên khỏi khoa thi.`);
    return `${esc(c.given)} gác bút nghiên. Hai năm nữa ghi danh lại sẽ thi tiếp từ kỳ đang dở.`+fx(c,{tam:-2})}});
  if(c.vexam)opts.push({l:'Rút tên khỏi kỳ thi võ cử',s:'Nghỉ thi hai năm',f:c=>{
    c.vexam=null;c.flags.noVoExam=S.t+24;log(`${nameOf(c)} rút tên khỏi kỳ thi võ cử.`);
    return `${esc(c.given)} cất cung đao, không đi thi võ nữa. Hai năm sau mới ghi danh lại được.`+fx(c,{tam:-2})}});
  opts.push({l:'Thôi, cứ theo đến cùng',f:c=>''});
  choicePopup(c,'Khoa cử',`${nameOf(c)} có muốn rút tên?`,'Rút tên thì khỏi phải đi thi, nhưng phải đợi một thời gian mới ghi danh lại được.',opts)}
/* ----- v6.4.1: võ cử, thi mỗi năm vào tháng Chín; đỗ thì được bổ chức trong quân ----- */
function registerVo(c){c.vexam={t:S.t};log(`${nameOf(c)} ghi danh thi võ cử.`)}
const VO_AP=[['Dốc sức môn cung ngựa',{vo:1,suc:0.5},0,0],['Phô trương quyền côn, đấu tay đôi',{vo:1,suc:0.6},-14,20],['Ứng đáp binh thư thao lược',{tri:1,vo:0.5},-6,10]];
function vexamPopup(c){
  const opts=VO_AP.map(([l,spec,lo,hi])=>({l,s:hi?'Có thể cao hơn hoặc thấp hơn hẳn':'Chắc chắn, ít bất ngờ',f:c=>{
    let v=0,w=0;for(const k in spec){v+=c[k]*spec[k];w+=Math.abs(spec[k])}
    const sc=Math.round(clamp((v/w*0.78+R(0,22))*cond(c)/0.9+R(lo,hi),0,130));
    if(sc<60)return `Được ${sc} điểm, chưa đủ 60. Trượt võ cử, sang năm thi lại hoặc rút tên.`+fx(c,{vo:1,tam:-6});
    const top=sc>=92;c.vexam=null;c.flags.voDo=1;c.flags.voTop=top?1:0;c.flags.voCu=1;
    achieve(c,top?'đỗ đầu bảng võ cử':'đỗ võ cử');enqueue('ev',c.id,{ev:'v641_vo_do'},true);
    return `Được ${sc} điểm, ${top?'đỗ đầu bảng võ cử':'đỗ võ cử'}!`+fx(c,{fame:top?60:30,tam:10,cfame:top?30:12})}}));
  choicePopup(c,'Võ cử',`${nameOf(c)} vào trường thi võ`,'Kỳ thi gồm cưỡi ngựa bắn cung, đấu côn quyền và hạch binh thư. Cần từ 60 điểm để đỗ, từ 92 điểm là đỗ đầu bảng. Chọn môn sở trường để dốc sức.',opts)}
function voEnlist(c,lv){c.vexam=null;c.exam=null;enlist(c,false);c.lv=lv;c.merit=Math.max(c.merit||0,ARMY[lv][2]);enqueue('office',c.id,{})}
/* ================= quan trường v6.4: ghế theo nơi, chống trùng, hồi tị, đi nhậm chức, nhiệm kỳ ================= */
const {OFFICES}=window.D;
const DX=window.D;
const seatT=k=>String(k).split('|')[0];
const seatTm=k=>OFFICES[seatT(k)];
const seatName=k=>{const T=seatTm(k);return T?(DX.seatLabel?DX.seatLabel(k):T.n):String(k)};
const seatWh=k=>DX.seatWhere?DX.seatWhere(k):null;
const sgOf=c=>c.sg==null?1:c.sg;
const bacOf=c=>c.lv*2+sgOf(c);
const phTxt=T=>`${T.sg?'Chánh':'Tòng'} ${RANKS[Math.min(8,T.r)].toLowerCase()}`;
const rankTxt=c=>`${sgOf(c)?'Chánh':'Tòng'} ${RANKS[Math.min(8,c.lv)].toLowerCase()}`;
const seatOfC=c=>c.seat||c.post||null;
const isOff=c=>c.job==='quan'||(c.job==='quan_ngu'&&!!c.seat);
/* v6.4.1: ngự y cũng ngồi một ghế ở Thái y viện (không có nhiệm kỳ ba năm như quan) */
const inPost=c=>isOff(c)||(c.job==='nguy'&&!!c.seat);
const provN=p=>(PROV[p]?PROV[p].n:'').replace(/ quan$/,'');
const homeProv=()=>S.loc&&PROV[S.loc.p]&&PROV[S.loc.p].nat==='trieu'?S.loc.p:null;
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};

/* trạng thái một ghế: người đương nhiệm (nếu không phải người nhà), trống hay không */
function offState(key){
  if(!S.off)S.off={};
  let o=S.off[key];
  if(!o){const T=seatTm(key)||{r:0};const vac=chance(0.07);
    o=S.off[key]={n:pick(SURN)+' '+mkGiven('nam'),ab:clamp(45+T.r*9+R(-8,12),30,140),age:34+T.r*3+R(-4,12),liem:R(15,90),vac:vac,since:S.t-R(3,60)};
    if(vac){o.vacT=S.t-R(0,4);o.why=pick(['cáo bệnh về quê','đang chịu tang','được điều đi nơi khác'])}}
  return o;
}
function officeTick(){
  if(S.off)for(const key in S.off){const o=S.off[key];const T=seatTm(key);if(!T){delete S.off[key];continue}
    if(o.holder){const h=P(o.holder);
      if(!h||!inClan(h)||seatOfC(h)!==key||!['quan','quan_ngu','nguy'].includes(h.job)){o.holder=null;o.vac=true;o.vacT=S.t;o.why='người cũ không còn giữ chức'}
      continue}
    if(o.vac){if(S.t-o.vacT>6){Object.assign(o,{n:pick(SURN)+' '+mkGiven('nam'),ab:clamp(45+T.r*9+R(-8,12),30,140),age:34+T.r*3+R(-4,10),liem:R(15,90),vac:false,since:S.t});delete o.why}continue}
    if(S.t%12===0)o.age++;
    const p=0.003+(o.age>=65?0.02:0)+(o.age>=72?0.04:0)+(o.liem<30?0.004:0);
    if(chance(p)){o.vac=true;o.vacT=S.t;o.why=o.age>=65?pick(['cáo lão về quê','qua đời']):o.liem<30?'bị hặc tội cách chức':pick(['được thăng chức nơi khác','đinh ưu về chịu tang','bị điều đi xa']);
      alive().filter(c=>isOff(c)&&c.flags.want===key).forEach(c=>{log(`Chức ${seatName(key)} trống: ${o.n} ${o.why}.`,'gd');enqueue('promo',c.id)});
      nguNotify(key)}
  }
  termTick();
  if(S.t%12===0)dynYear();
}
const postOf=c=>c.post?OFFICES[c.post]:null;
const meetsPost=(c,key)=>{const T=seatTm(key);if(!T)return false;for(const k in T.req)if(c[k]<T.req[k])return false;return true};

/* nhà vua và triều đại */
const ERA_A=['Hưng','Thái','Vĩnh','Bảo','Cảnh','Thịnh','Chính','Thuận','Hoằng','Gia'];
const ERA_B=['Bình','Hòa','Định','Trị','Đức','Phúc','Long','Minh','An','Thái'];
function mkDyn(t,first){const d={name:'Đại Nguyễn',emp:'Nguyễn Thành Trung',era:'Hưng Bình',from:t,len:R(24,34)*12,n:1,hist:[],newT:-99};
  /* v6.5.1: ván mới có vua đầu là minh quân Trường Thịnh, ở ngôi 25 đến 35 năm tính từ lúc mở game (v6.7.0-d1) (d.fixed là tháng băng hà). Tới cuối đời thì nổ ra tranh ngôi căng thẳng. */
  if(first){d.era='Trường Thịnh';d.fixed=t+R(25,35)*12+R(0,11);d.k={age:R(28,34),hp:R(85,98),tai:R(82,95),duc:R(75,92),uy:R(70,88),nghi:R(10,30)};d.dt=R(72,88);d.qk=R(68,88);d.loan=R(3,10);
    d.heir={set:false,n:mkGiven('nam'),age:R(2,8)}}
  return d}
/* ================= v6.4.1.7: hoàng đế và thiên hạ ================= */
/* d.k: vua đang trị vì (age tuổi, hp sức khỏe, tai tài, duc đức, uy uy quyền, nghi đa nghi; 0..100).
   d.dt dân tâm thiên hạ, d.qk quốc khố, d.loan mức loạn (0..100). d.heir: thái tử (set đã lập hay chưa).
   d.cr: khủng hoảng kế vị đang diễn ra (a: thái tử hoặc hoàng tử thứ nhất, b: thân vương; ours: phe nhà mình). */
const KT_N={minh:'Minh quân',thu:'Thủ thành',hon:'Hôn quân',bao:'Bạo quân',au:'Ấu chúa'};
function mkKing(a){return {age:a??R(20,42),hp:R(55,95),tai:R(20,90),duc:R(20,90),uy:R(30,80),nghi:R(10,85)}}
function kType(k){if(!k)return 'thu';if(k.age<16)return 'au';if(k.duc<30)return 'bao';if(k.tai<38&&k.duc<65)return 'hon';if(k.tai>=70&&k.duc>=60)return 'minh';return 'thu'}
function dynEns(d){d=d||S.dyn||(S.dyn=mkDyn(S.t));if(!d.k)d.k=mkKing(R(24,46));if(d.dt==null){d.dt=R(45,70);d.qk=R(40,70);d.loan=R(5,25)}
  if(!d.heir)d.heir={set:chance(0.5),n:mkGiven('nam'),age:Math.max(1,d.k.age-R(18,28))};return d}
const kingT=()=>{const d=S.dyn;return d&&d.k?kType(d.k):'thu'};
const KT_W={minh:{dt:1.2,qk:1,loan:-1.5},thu:{dt:0,qk:0.3,loan:0},hon:{dt:-1.5,qk:-1.5,loan:1.5},bao:{dt:-2.5,qk:-0.5,loan:2.5},au:{dt:-0.5,qk:-1,loan:1}};
function dynYear(){
  const d=dynEns();const k=d.k;
  k.age++;k.hp=clamp(k.hp+R(-6,4)-(k.age>50?(k.age-50)/3:0),0,100);k.uy=clamp(k.uy+R(-3,3)+(k.tai-50)/40+(S.war?-1:0),0,100);
  const W0=KT_W[kType(k)];d.dt=clamp(d.dt+W0.dt+R(-3,3)+(S.war?-2:0)+(S.disaster?-2:0)+(d.qk<20?-2:0),0,100);
  d.qk=clamp(d.qk+W0.qk+R(-3,3)+(S.war?-3:0),0,100);d.loan=clamp(d.loan+W0.loan+R(-3,3)+(d.dt<30?3:0)+(d.dt>65?-2:0),0,100);
  d.heir.age=Math.max(0,(d.heir.age||0)+1);
  dynSnap(d);
  if(d.fixed&&S.t<d.fixed+120){
    /* vua đầu: giữ đúng tư cách minh quân đến lúc gần mất, không lập thái tử, không chết sớm. Cuối đời thì tranh ngôi nổ ra. */
    if(S.t<d.fixed-60){k.hp=Math.max(k.hp,80);k.tai=Math.max(k.tai,78);k.duc=Math.max(k.duc,70);k.nghi=Math.min(k.nghi,35)}
    else if(!d.cr&&S.t>=d.fixed-40)crStart(d,true);
    return}
  if(!d.heir.set&&k.age>=28&&chance(0.15)){d.heir.set=true;log(`Hoàng đế lập ${d.heir.n} làm thái tử.`,'gd')}
  /* khủng hoảng kế vị: vua già yếu mà chưa lập thái tử */
  if(!d.cr&&!d.heir.set&&(k.age>=55||k.hp<40)&&chance(0.25))crStart(d);
  /* vua băng hà theo tuổi và sức khỏe */
  const dieP=0.004+Math.max(0,k.age-50)*0.004+(k.hp<30?0.06:0)+(k.hp<15?0.15:0);
  if(chance(dieP))kingDie(d);
}
function kingDie(d,why){d=d||dynEns();const old=d.emp,oldEra=d.era;
  d.hist=(d.hist||[]).concat([{emp:old,era:oldEra,y:Math.round((S.t-d.from)/12),t:KT_N[kType(d.k)]}]).slice(-8);
  let nm,na;const cr=d.cr;
  if(cr){const win=crRes(d);nm=win.n;na=win.age}else if(d.heir&&d.heir.set){nm=d.heir.n;na=d.heir.age}else{nm=mkGiven('nam');na=R(8,30)}
  d.n++;d.emp='Nguyễn '+pick(['Thành','Đức','Hữu','Phúc','Quang','Thế','Văn'])+' '+nm;
  d.era=pick(ERA_A)+' '+pick(ERA_B);d.from=S.t;d.len=R(14,36)*12;d.newT=S.t;d.k=mkKing(na);d.cr=null;d.fixed=null;
  if(cr){/* vua lên ngôi sau tranh ngôi: uy yếu, đa nghi, thiên hạ xáo động */
    d.k.uy=R(25,45);d.k.nghi=R(60,85);d.loan=clamp((d.loan||0)+R(8,16),0,100);d.dt=clamp((d.dt||50)-R(4,9),0,100);d.k.age=Math.max(d.k.age,na)}
  d.heir={set:false,n:mkGiven('nam'),age:Math.max(0,na-R(16,26))};
  dynSnap(d);
  log(`Hoàng đế ${old} ${why||'băng hà'}. Hoàng Đế ${d.emp} lên ngôi, niên hiệu ${d.era}.${d.k.age<16?' Vua còn nhỏ, triều chính trong tay quan nhiếp chính.':''}`,'gd');
  qtLog('Đổi đời vua',`Hoàng đế ${old} ${why||'băng hà'}, ${d.emp} lên ngôi (niên hiệu ${d.era}).`)}
/* v6.5.2/6.5.3: bảng thời thế chỉ chụp lại mỗi năm (hoặc khi có biến động: vua đổi, tranh ngôi, thanh trừng). Nhà có người giữ chức ở kinh thành hoặc có Giám chính thì thấy rõ; không thì chỉ nghe đồn. */
const imperialTitle=d=>`Triều ${d.name} · ${d.era} · Hoàng Đế ${d.emp}`;
function kinhOff(){return alive().some(p=>inClan(p)&&["quan","quan_ngu"].includes(p.job)&&p.seat&&(()=>{const W=seatWh(p.seat);return !!W&&!!PROV[W.p]&&PROV[W.p].k==="kinh"})())}
function thoiTheBuild(){const d=dynEns();const k=d.k;const t=kType(k);
  const KTX={minh:"Hoàng đế sáng suốt, thưởng phạt phân minh",thu:"Hoàng đế giữ nếp cũ, không làm gì lớn",hon:"Hoàng đế ham vui, bỏ bê triều chính",bao:"Hoàng đế tàn bạo, giết người không ghê tay",au:"Vua còn nhỏ tuổi, quyền nằm trong tay quan nhiếp chính"};
  const dtx=d.dt>=65?"dân chúng an cư":d.dt>=40?"lòng dân tạm yên":d.dt>=20?"dân oán khắp nơi":"dân tình như nồi nước sôi";
  const qtx=d.qk>=60?"quốc khố đầy":d.qk>=30?"quốc khố vừa đủ":"quốc khố trống rỗng";const ltx=d.loan>=60?"giặc giã nổi lên nhiều nơi":d.loan>=30?"đây đó có trộm cướp":"thiên hạ yên ổn";
  const ktx=k.hp<35?" Nghe nói long thể bất an.":"";const ntx=k.nghi>=65?" Vua đa nghi, quan lại ai cũng giữ mình.":"";
  const htx=d.heir.set?` Thái tử ${d.heir.n} đã được lập.`:" Ngôi thái tử còn bỏ trống.";
  return {full:`${KTX[t]}; ${dtx}, ${qtx}, ${ltx}.${ktx}${ntx}${htx}`,rumor:`Người ta đồn: ${pick([KTX[t].toLowerCase(),"trong triều có chuyện lớn","mọi sự vẫn như cũ"])}; ${dtx}.`}}
function dynSnap(d){d=d||dynEns();d.snap=Object.assign(thoiTheBuild(),{t:S.t});return d.snap}
function thoiTheTxt(full){const d=dynEns();if(!d.snap)dynSnap(d);return (full||thanHas("giamchinh")||kinhOff())?d.snap.full:d.snap.rumor}
function thoiTheCard(){const d=dynEns();const k=d.k;const AD=window.BN_ADMIN;const clear=thanHas('giamchinh')||kinhOff();
  return `<section class="card"><span class="eyebrow">Thời thế</span><h2>${esc(imperialTitle(d))}</h2><p class="kvline">${thoiTheTxt()}</p>
   ${d.cr&&clear?`<p class="kvline down">Triều đình đang tranh ngôi: ${esc(d.cr.a.n)} và ${esc(d.cr.b.n)}.${d.cr.kin&&CR_KIN[d.cr.kin]?' '+CR_KIN[d.cr.kin]:''}${d.cr.ours!=='n'?` Nhà mình đứng về phía ${esc(d.cr[d.cr.ours].n)}.`:''}</p>`:''}
   ${AD?`<p class="kvline muted"><small>(admin) ${KT_N[kType(k)]} · tuổi ${k.age} · sức ${Math.round(k.hp)} · tài ${k.tai} · đức ${k.duc} · uy ${Math.round(k.uy)} · nghi ${k.nghi} · dân tâm ${Math.round(d.dt)} · quốc khố ${Math.round(d.qk)} · loạn ${Math.round(d.loan)}</small></p>`:''}</section>`}
/* ---------- khủng hoảng kế vị (tuyến 6 của file quan trường) ---------- */
const CR_STEPS=['tc_vua_benh','tc_loi_keo','tc_chieu_binh','tc_lam_chung','tc_phe_lap','tc_danh_trao','tc_gioi_nghiem'];
const CR_KIN={anhem:'Hai người là anh em ruột, cùng con vua, nay thành đối thủ của nhau.',anhho:'Hai người là anh em họ, một bên là con vua, một bên là con của thân vương, ai cũng nói mình mới đáng ngồi ngai vàng.',chucau:'Người chú là em ruột nhà vua, người cháu là hoàng tôn. Chú muốn nối ngôi anh, cháu muốn giữ ngôi của ông.'};
function crStart(d,hard){const kin=hard?pick(['anhem','anhho','chucau']):'anhem';
  const an=kin==='chucau'?'Hoàng tôn '+mkGiven('nam'):'Hoàng tử '+mkGiven('nam');
  const hp=hard?()=>R(46,56):null;
  d.cr={st:0,t:S.t,next:S.t+R(1,4),kin,a:{n:an,f:'hoang',pow:hp?hp():R(40,60)},b:{n:'Thân vương '+mkGiven('nam'),f:'quyen',pow:hp?hp():R(35,65)},ours:'n',act:0};
  if(hard)d.loan=clamp((d.loan||0)+R(4,9),0,100);dynSnap(d);
  log(hard?'Hoàng đế tuổi đã cao, long thể suy yếu mà chưa lập thái tử. Triều đình ngầm chia hai phe, không khí căng như dây đàn.':'Hoàng đế lâm bệnh mà chưa lập thái tử. Các hoàng tử, thân vương bắt đầu lôi kéo đại thần.','hi');
  qtLog('Khủng hoảng kế vị',`Hoàng đế ${d.emp} lâm bệnh, chưa lập thái tử. ${d.cr.a.n} và ${d.cr.b.n} tranh ngôi. ${CR_KIN[kin]}`)}
const crActor=()=>alive().filter(p=>inClan(p)&&p.job==='quan'&&p.lv>=3).sort((a,b)=>b.lv-a.lv)[0]||((tierIdx()>=4||alive().some(p=>inClan(p)&&p.job==='quan_ngu'&&p.lv>=5))?head():null);
function crMonth(){const d=S.dyn;if(!d||!d.cr||S.t<d.cr.next)return;const cr=d.cr;
  if(cr.st>=CR_STEPS.length){if(d.fixed&&S.t<d.fixed)return;kingDie(d,'băng hà giữa lúc tranh ngôi');return}
  const who=crActor();const ev=CR_STEPS[cr.st];cr.st++;cr.next=S.t+R(4,8);
  if(who&&EVMAP[ev])enqueue('ev',who.id,{ev,data:{}});else{cr.a.pow+=R(-5,5);cr.b.pow+=R(-5,5)}}
/* ai thắng: phe mạnh hơn, cộng phần nhà mình góp; thắng thì phò tá có công, thua thì bị thanh toán */
function crRes(d){const cr=d.cr;const pa=cr.a.pow+R(-20,20),pb=cr.b.pow+R(-20,20);const w=pa>=pb?'a':'b';const win=cr[w];
  const offs=alive().filter(p=>inClan(p)&&['quan','quan_ngu'].includes(p.job));
  if(cr.ours===w){offs.forEach(p=>{qtAdd(p,{fav:25});p.cong=(p.cong||0)+(cr.act?120:50);tuocCheck(p,'phò tá tân đế');tuocMsg=''});cf(20,'Phò tá tân đế');
    qtLog('Phò tá tân đế',`Họ ${esc(S.surname)} đứng về phía ${win.n} từ đầu. Tân đế lên ngôi, cả họ được trọng thưởng.`);log(`${win.n} thắng trong cuộc tranh ngôi. Nhà mình phò tá có công, được trọng thưởng.`,'gd')}
  else if(cr.ours!=='n'){offs.forEach(p=>{qtAdd(p,{risk:cr.safe?25:45,fav:-30});if(cr.act>=2){qtAdd(p,{crime:4});const q=qtOf(p);if(q.st<2){q.st=2;enqueue('ev',p.id,{ev:'qt_dan_hac'})}}});cf(-25,'Theo nhầm phe tranh ngôi');
    qtLog('Theo nhầm phe tranh ngôi',`Họ ${esc(S.surname)} đứng về phía ${cr[cr.ours].n}. ${win.n} lên ngôi và bắt đầu thanh toán.`);log(`${win.n} thắng trong cuộc tranh ngôi. Nhà mình đứng nhầm phe, tân đế bắt đầu thanh toán.`,'hi')}
  else{offs.forEach(p=>qtAdd(p,{fav:-5}));log(`${win.n} thắng trong cuộc tranh ngôi. Nhà mình đứng ngoài, không được gì cũng không mất gì.`)}
  return {n:win.n.replace(/^(Hoàng tử|Hoàng tôn|Thân vương) /,''),age:R(18,40)}}
/* ---------- nhà vua với triều chính: thăng chức, quan tham, sự kiện thời thế ---------- */
const kingPromoF=()=>({minh:1.25,thu:1,hon:0.85,bao:0.75,au:0.9})[kingT()]||1;
function kingMonth(){const d=S.dyn;if(!d||!d.k||!head())return;crMonth();
  const t=kingT();if((t==='hon'||t==='bao')&&S.t%12===6)alive().forEach(p=>{if(inClan(p)&&p.job==='quan')p.liem=Math.max(0,p.liem-1)});
  if(!chance(0.02))return;const W={tt_tuyen_tu:t==='hon'||t==='bao'?2:0.3,tt_xay_cung:t==='bao'?2:t==='hon'?1.2:0.2,tt_suu_thue:t==='hon'||t==='bao'||d.qk<25?1.5:0.2,
    tt_dai_xa:S.t-(d.newT||-99)<=12?2:t==='minh'?0.4:0,tt_an_dien:S.t-(d.newT||-99)<=24?1.5:0,tt_vi_hanh:t==='minh'?0.8:0.1,tt_cau_hien:t==='minh'?1:0.2,tt_dan_bien:d.loan>=55?1.5:0};
  const L=Object.entries(W).filter(([id,w])=>w>0&&EVMAP[id]&&(S.cool[id]||-1e9)<=S.t);if(!L.length)return;let tot=L.reduce((s,x)=>s+x[1],0),r=Math.random()*tot;
  for(const [id,w] of L){r-=w;if(r<=0){S.cool[id]=S.t+48;enqueue('ev',S.head,{ev:id,data:{}});return}}}
/* ---------- thanh trừng khi vua đa nghi (tuyến 4) ---------- */
function purgeYear(){const d=S.dyn;if(!d||!d.k)return;const k=d.k;if(k.nghi<60||!chance((k.nghi-50)/120))return;
  const C=court();const big=FACK.slice().sort((a,b)=>C.f[b].pow-C.f[a].pow)[0];
  qtLog('Vua bắt đầu thanh trừng',`Hoàng đế ${d.emp} nghi kỵ phe ${facN(big)} lộng quyền.`);log(`Hoàng đế nghi kỵ phe ${facN(big)}, trong triều bắt đầu thanh trừng.`,'hi');
  alive().filter(p=>inClan(p)&&p.job==='quan').forEach(p=>{const q=qtOf(p);qtAdd(p,{risk:q.f===big?20:6});if(chance(0.5))enqueue('ev',p.id,{ev:pick(q.f===big?['qt4_danh_sach_bi_thu','qt4_dong_minh_quay','qt4_goi_doi_chat']:['qt4_trieu_kien','qt4_mat_chi','qt4_tu_sat_nguc']),data:{f:big}})});
  if(chance(0.5))facFall(big,'bị vua nghi lộng quyền, bắt ngay giữa triều')}

/* ================= v6.4.1.7: danh hiệu cấp Thần ================= */
/* Mỗi danh hiệu trong họ chỉ một người giữ cùng lúc. Tác dụng lên cả họ, nhẹ, phần lớn là giảm thiệt hại; mất ngay khi người giữ qua đời.
   Sau khi người giữ mất, trẻ sinh ra trong họ có 3% mang đặc tính "cái thế" (thiên mệnh) tương ứng; mỗi lúc chỉ một người mang. */
const THAN={
  thany:{n:'Thần Y',jobs:[['y',3],['nguy',2]],biz:'yquan',st:{tri:200},d:'Người trong họ ít mắc bệnh hơn, khi có dịch ít bị nhiễm hơn khoảng 20%; người già yếu đi chậm hơn',tm:'tm_thany',sk:'tri'},
  vothan:{n:'Võ Thần',jobs:[['hiep',3]],biz:'voquan',st:{vo:200,tri:100},d:'Con cháu luyện võ nhanh hơn 15%; người nhà đi lính ít tử trận hơn; giặc đến làng thì người nhà được che chở',tm:'tm_vothan',sk:'vo'},
  thanhnhan:{n:'Thánh Nhân',jobs:[['su',4]],biz:'truong',st:{tri:200},d:'Con cháu đi học tiến nhanh hơn 15%, đi thi được cộng điểm; danh vọng gia tộc tăng dần',tm:'tm_thanhnhan',sk:'tri'},
  thuongthanh:{n:'Thương Thánh',jobs:[['tieunhi',3]],biz:'tiem',st:{eq:170},d:'Mọi cơ sở của họ lãi thêm 8%; buôn chuyến ít gặp nạn hơn',tm:'tm_thuongthanh',sk:'eq'},
  camthanh:{n:'Cầm Thánh',jobs:[['nghe',3]],biz:'ganhhat',st:{mi:170},d:'Con cháu mị lực lớn nhanh hơn 10%; danh vọng gia tộc tăng dần',tm:'tm_camthanh',sk:'mi'},
  detieu:{n:'Thiên hạ đệ nhất tiêu',jobs:[['tieu',3]],biz:'tieucuc',st:{vo:170},d:'Chuyến buôn và tiêu cục của họ gần như không bị cướp',tm:'tm_detieu',sk:'vo'},
  thannong:{n:'Thần Nông',jobs:[['nong',3]],st:{suc:160},d:'Ruộng ít mất mùa hơn nhiều, được mùa thêm',tm:'tm_thannong',sk:'suc'},
  thantuong:{n:'Thần Tượng',jobs:[['tho',4]],biz:'xuong',st:{vo:150},sk2:{ky:90},d:'Xưởng của họ lãi thêm 10%',tm:'tm_thantuong',sk:'vo'},
  giamchinh:{n:'Giám Chính',jobs:[['diaky',3]],st:{tri:200},d:'Chọn được ngày lành: đi thi được cộng điểm; báo trước thiên tai nên thiệt hại giảm; đọc được thiên mệnh của triều đình',tm:'tm_giamchinh',sk:'tri'}};
const THK=Object.keys(THAN);
(function(){THK.forEach(id=>{const T=THAN[id];TRAITS['than_'+id]={n:T.n,c:'y',than:id,d:`Danh hiệu cấp Thần. ${T.d}. Mất khi người giữ qua đời.`};
  TRAITS[T.tm]={n:T.n.replace(/^Thiên hạ đệ nhất /,'Đệ nhất ')+' cái thế',c:'y',tm:id,d:`Thiên mệnh: sinh ra đã mang căn cơ của ${T.n.toLowerCase()} đời trước. Tư chất cao, học nghề ấy nhanh gấp đôi, dễ mở trần 200. Đời người mang thiên mệnh thường lắm kiếp nạn.`}});
  TRAITS.tm_devuong={n:'Đế vương chi tướng',c:'y',tm:'devuong',d:'Thiên mệnh: tướng mạo khác thường, người gặp đều kính sợ. Uy và danh vọng lớn nhanh, nhưng triều đình mà biết thì chẳng để yên.'};
  TRAITS.tm_kytai={n:'Kỳ tài',c:'y',tm:'kytai',d:'Thiên mệnh: học gì cũng nhanh, mọi chỉ số đều có tư chất cao. Trời ghen người tài, kiếp nạn cũng nhiều.'}})();
const thanHolder=id=>{S.than=S.than||{};const h=S.than[id];const p=h?P(h):null;return p&&p.dead==null&&inClan(p)?p:null};
const thanHas=id=>!!(S&&S.than&&thanHolder(id));
const jobTop=(c,T)=>T.jobs.some(([j,lv])=>c.job===j&&c.lv>=lv)||(T.biz&&c.job==='chu'&&bizOf(c)&&bizOf(c).type===T.biz&&bizOf(c).lv>=BIZ[T.biz].lv.length-1);
function thanEligible(c,id){const T=THAN[id];if(!inClan(c)||c.away||age(c)<35||(c.fame||0)<FAME_SELF[2][0]||(c.m||0)<110)return false;if(!jobTop(c,T))return false;
  for(const k in T.st)if((c[k]||0)<T.st[k])return false;for(const k in (T.sk2||{}))if(skv(c,k)<T.sk2[k])return false;
  if(thanHolder(id)||(c.flags['thT_'+id]||0)>S.t)return false;return true}
function thanYear(){if(!head())return;S.than=S.than||{};
  THK.forEach(id=>{const h=S.than[id];if(h){const p=P(h);if(!p||p.dead!=null||!inClan(p)){S.than[id]=null;(S.thanDead=S.thanDead||{})[id]={t:S.t,by:h};
      if(p){removeTrait(p,'than_'+id);qtLog(`${THAN[id].n} qua đời`,`${nameOf(p)}, ${THAN[id].n.toLowerCase()} của họ ${esc(S.surname)}, đã qua đời. Từ nay chờ người cái thế.`)}}}
    if(!thanHolder(id)){const c=alive().find(p=>thanEligible(p,id));if(c&&chance(0.5))enqueue('ev',c.id,{ev:'th_kn1',data:{id}})}})}
function thanGrant(c,id){S.than=S.than||{};S.than[id]=c.id;addTrait(c,'than_'+id);c.fame+=200;cf(80,`Có người được tôn là ${THAN[id].n}`);
  qtLog(`Phong ${THAN[id].n}`,`${nameOf(c)} được thiên hạ tôn là ${THAN[id].n}.`);log(`${nameOf(c)} được thiên hạ tôn là ${THAN[id].n}.`,'gd')}
const thanFail=(c,id)=>{c.flags['thT_'+id]=S.t+60};
/* thiên mệnh lúc sinh: 1/2000 đứa trẻ có một thiên mệnh, chọn đều trong khoảng 11 loại (nên mỗi loại, kể cả Đế vương chi tướng, chỉ khoảng 1/22.000); nếu một danh hiệu cấp Thần trong họ đã khuất mà chưa ai mang cái thế thì 3% (con cháu trực hệ của người khuất 6%) */
function tmBirth(p){p.tmChk=1;const have=t=>alive().some(x=>inClan(x)&&(x.traits||[]).includes(t));
  const pool=[];Object.entries(S.thanDead||{}).forEach(([id,v])=>{const T=THAN[id];if(!T||have(T.tm)||thanHolder(id))return;const up=x=>x&&(x.parents.includes(v.by)||x.parents.some(i=>{const q=P(i);return q&&q.parents.includes(v.by)}));pool.push([T.tm,up(p)?0.06:0.03])});
  for(const [t,pr] of pool)if(chance(pr)){tmGive(p,t);return}
  if(chance(1/2000)){const t=pick(['tm_devuong','tm_kytai',...THK.map(id=>THAN[id].tm)]);if(!have(t))tmGive(p,t)}}
function tmGive(p,t){addTrait(p,t);const T=TRAITS[t];const id=T.tm;const th=THAN[id];p.gn=p.gn||{};
  const up=k=>{if(p.gn[k])p.gn[k]=p.gn[k].map(v=>Math.max(v,R(88,100)))};if(th)up(th.sk);else if(id==='kytai')['tri','vo','mi','eq'].forEach(up);else if(id==='devuong'){up('eq');up('mi')}
  p.nat0=null;p.nb=null;log(`Đứa trẻ ${nameOf(p)} sinh ra, có người bảo mang ${T.n.toLowerCase()}.`,'gd')}
const tmOf=c=>(c.traits||[]).map(t=>TRAITS[t]).find(T=>T&&T.tm)||null;
function tmYear(){alive().forEach(c=>{const T=tmOf(c);if(!T||!inClan(c)||age(c)<12||c.away)return;if(!c.flags.tmW){c.flags.tmW=1;enqueue('ev',c.id,{ev:'tm_thuc_tinh',data:{}});return}if(chance(0.06))enqueue('ev',c.id,{ev:'tm_kiep_nan',data:{}})})}

/* ================= v6.4.1.7: chiến tranh tại nơi ở ================= */
/* giặc tới làng: mỗi người ở nhà có thể mất mạng; người võ giỏi nhất nhà che chở cho cả nhà, Võ Thần trong họ che chở thêm */
function warRaid(sev){const mem=alive().filter(p=>inClan(p)&&inMain(p)&&!p.away);if(!mem.length)return {dead:[],best:null};
  const best=mem.filter(p=>age(p)>=16&&age(p)<65).sort((a,b)=>b.vo-a.vo)[0];const shield=(best?best.vo:20)/250+(thanHas('vothan')?0.3:0);
  const base=[0,0.04,0.09,0.18][sev]||0.06;const dead=[];
  mem.forEach(p=>{const a=age(p);const pr=base*Math.max(0.1,1-shield)*(a<10||a>65?1.5:1)*(p.vo>=70?0.5:1)*(p===best?0.7:1);if(chance(pr))dead.push(p)});
  dead.forEach(p=>die(p,'chết trong binh lửa'));return {dead,best}}
function chMonth(){const w=S.war;if(!w||!head())return;
  if(w.near===0&&chance(0.07)){const id=pick(['ch_giac_den','ch_cuop_luong','ch_lang_chay','ch_bat_phu','ch_cuu_nguoi']);if(EVMAP[id]&&(S.cool[id]||-1e9)<=S.t){S.cool[id]=S.t+8;enqueue('ev',S.head,{ev:id,data:{}})}}
  else if(w.near===1&&chance(0.02)){const id=pick(['ch_tan_quan','ch_bat_phu']);if(EVMAP[id]&&(S.cool[id]||-1e9)<=S.t){S.cool[id]=S.t+12;enqueue('ev',S.head,{ev:id,data:{}})}}}

/* ----- người nhà đi theo khi nhậm chức xa ----- */
const baseFollow=p=>!!p&&inClan(p)&&!isHead(p)&&!['quan','quan_ngu','hiep','vua'].includes(p.job)&&!Object.values(S.coff||{}).includes(p.id);
function famOf(c){
  const sp=spouseOf(c);const ok=p=>baseFollow(p)&&(!p.away||(p.away.type==='follow'&&p.away.of===c.id));
  const sps=sp&&ok(sp)&&age(sp)>=16?sp:null;
  const kids=S.people.filter(p=>p.id!==c.id&&inClan(p)&&age(p)<16&&(!p.away||(p.away.type==='follow'&&p.away.of===c.id))&&(p.parents.includes(c.id)||(sp&&p.parents.includes(sp.id))));
  return {sp:sps,kids};
}
const followers=c=>S.people.filter(p=>p.dead==null&&p.away&&p.away.type==='follow'&&p.away.of===c.id);
function unpostFol(c,quiet){
  const f=followers(c);f.forEach(p=>{p.away=null});
  if(f.length&&!quiet)log(`${f.map(p=>p.given).join(', ')} theo ${c.given} trở về nhà.`,'gd');
  return f}
function setPost(c,key,mode){
  const W=seatWh(key);
  const prev=followers(c);const f=famOf(c);
  prev.forEach(p=>{p.away=null});
  c.pst={p:W.p,u:W.unit,fam:mode,t:S.t};
  const go=[];if(mode>=1&&f.sp)go.push(f.sp);if(mode>=2)f.kids.forEach(k=>go.push(k));
  go.forEach(p=>{p.away={type:'follow',of:c.id,p:W.p}});
  return go;
}
function needMove(c,key){
  if(isHead(c))return false;
  const W=seatWh(key);if(!W||!S.loc)return false;
  return W.p!==S.loc.p;
}
function postPopup(c,key){
  if(seatOfC(c)!==key||!inPost(c))return;
  const nm=seatName(key),W=seatWh(key);
  if(isHead(c)){
    /* v6.5.3: gia chủ phải ở nhà chính, nên nhận ghế ở tỉnh khác thì cả nhà phải dọn tới, hoặc từ chối ghế */
    const W0=seatWh(key);unpostFol(c,true);c.pst=null;
    if(!W0||!S.loc||W0.p===S.loc.p){delete c.flags.prevSeat;return}
    const to=W0.p,info=moveCost({p:to},0),blk=w_closed(to)?`Đường vào ${PROV[to].n} đang có giặc, không thể đến.`:'';
    const refuse=c=>{const pv=c.flags.prevSeat;delete c.flags.prevSeat;releaseSeat(c);c.post=null;c.seat=null;c.sg=null;c.postT=null;
      if(pv&&seatTm(pv.seat)&&assignPost(c,pv.seat,true)){c.lv=pv.lv;c.postT=pv.postT||S.t;c.flags.noPromoUntil=S.t+18;return `${esc(c.given)} từ chối đi xa, xin ở lại chức cũ ${esc(seatName(pv.seat))}.`+fx(c,{fame:-2})}
      c.flags.hauBo={r:Math.max(0,(c.lv||1)-1),t:S.t+R(8,20)};c.job='none';c.lv=0;c.bonus=0;c.flags.noPromoUntil=S.t+12;
      return `${esc(c.given)} từ chối đi xa nhậm chức, xin ở lại với gia đình. Tên vẫn nằm trong sổ hậu bổ chờ ghế khác.`+fx(c,{fame:-2})};
    choicePopup(c,'Hoạn lộ','Nhậm chức ở xa',`${esc(c.given)} được bổ <b>${esc(seatName(key))}</b> ở ${esc(provN(to))}. Gia chủ không thể bỏ nhà mà đi, nên muốn nhận chức thì <b>cả nhà phải dọn tới ${esc(provN(to))}</b>: bán ruộng, bán cơ sở làm ăn ở nơi cũ, mất bớt quan hệ cũ. Không muốn thì xin từ chối.${blk?' <b class="down">'+esc(blk)+'</b>':''}`,[
      {l:`Dời cả nhà tới ${provN(to)} (${money(info.cost)})`,c:()=>S.money>=info.cost&&!blk,f:c=>{delete c.flags.prevSeat;doMove(to,0,false);return `Cả nhà ${esc(c.given)} dọn tới ${esc(provN(to))} để ông nhậm chức ${esc(seatName(key))}.`+fx(c,{fame:3})}},
      {l:'Từ chối chức này',f:refuse}]);
    return}
  if(!needMove(c,key)){unpostFol(c,true);c.pst=null;return}
  const f=famOf(c);const fare=mm(1+bacOf(c)*0.5);
  const alone=c=>{setPost(c,key,0);const fam=f.sp||f.kids.length;
    if(f.sp)fx(f.sp,{tam:-3});f.kids.forEach(k=>fx(k,{tam:-2}));
    return `${esc(c.given)} một mình lên đường tới ${esc(provN(W.p))}, nhậm chức ${esc(nm)}.`+(fam?fx(c,{tam:-4}):'')};
  if(!f.sp&&!f.kids.length){log(`${nameOf(c)} lên đường tới ${provN(W.p)}, nhậm chức ${nm}.`);setPost(c,key,0);return}
  const opts=[{l:'Đi một mình',s:`Gia đình ở lại nhà, mình nhớ nhà, nhưng đỡ tốn kém và được tự do làm việc.`,f:alone}];
  if(f.sp)opts.push({l:`Dắt ${f.sp.given} đi cùng (${money(fare)})`,s:'Có người chăm sóc cơm nước, vợ chồng không xa cách.',c:()=>S.money>=fare,f:c=>{S.money-=fare;const go=setPost(c,key,1);return `${esc(c.given)} dắt ${esc(f.sp.given)} tới ${esc(provN(W.p))} nhậm chức ${esc(nm)}.`+fx(c,{tam:5})+fx(f.sp,{tam:2})}});
  /* v6.4.1.6: cả nhà dọn đến, lập chi họ ở nơi nhậm chức (gia chủ không được chọn: gia chủ phải ở nhà chính) */
  if(!isHead(c)&&(f.sp||f.kids.length))opts.push({l:`Cả nhà dọn đến, lập chi họ ở ${provN(W.p)} (${money(fare*3)})`,c:()=>S.money>=fare*3,f:c=>{S.money-=fare*3;setPost(c,key,0);const id=farBranch(c,W.p,[f.sp,...f.kids].filter(Boolean));
    return `Cả nhà ${esc(c.given)} dọn hẳn tới ${esc(provN(W.p))}, dựng nhà mới, lập ${esc(S.hh[id].name)}. Lương quan vào quỹ của chi; chi tự lo ăn tiêu.`+fx(c,{tam:4})}});
  if(f.kids.length)opts.push({l:`Dắt cả nhà đi cùng${f.sp?'':' (chỉ con nhỏ)'} (${money(fare*2)})`,s:`${f.kids.length} con nhỏ theo cha mẹ, học hỏi từ quan trường nhưng xa quê.`,c:()=>S.money>=fare*2,f:c=>{S.money-=fare*2;const go=setPost(c,key,2);return `Cả nhà ${esc(c.given)} dọn tới ${esc(provN(W.p))}, nhậm chức ${esc(nm)}.`+fx(c,{tam:6,fame:2})}});
  choicePopup(c,'Hoạn lộ','Đi nhậm chức',`${esc(c.given)} được bổ <b>${esc(nm)}</b> ở ${esc(provN(W.p))}, cách quê nhà khá xa. Quan thời xưa thường dắt cả nhà đi cùng, nhưng cũng có người để vợ con ở lại lo việc nhà. Đi đâu cũng phải theo lệ hồi tị, không làm quan ở quê, không ngồi cùng nha môn với người nhà.`,opts);
}

/* nhả ghế khi thôi chức, qua đời, đổi nghề */
function releaseSeat(c,noVac){
  const old=seatOfC(c);
  if(old&&S.off&&S.off[old]&&S.off[old].holder===c.id){const o=S.off[old];o.holder=null;if(!noVac){o.vac=true;o.vacT=S.t;o.why='chuyển sang chức khác'}}
}
function leaveSeat(c){
  releaseSeat(c);unpostFol(c);
  c.post=null;c.seat=null;c.pst=null;c.postT=null;c.sg=null;
}
/* ghế có người nhà giữ, nhà đang cùng nha môn */
function kinPosts(c){
  const m=new Map();
  alive().forEach(o=>{if(o.id===c.id||!inClan(o))return;const k=inPost(o)?o.seat:null;if(!k)return;const w=seatWh(k);if(w)m.set(w.grp,o)});
  return m}
function barReason(c,key,kp){
  const T=seatTm(key);if(!T)return 'chức không còn';
  const st=S.off&&S.off[key];
  if(st&&st.holder&&st.holder!==c.id)return 'người nhà đang giữ';
  const W=seatWh(key);
  if(W){
    if(!T.mil&&W.local&&!isHead(c)&&homeProv()&&W.p===homeProv())return 'hồi tị: quê nhà';
    const o=kp&&kp.get(W.grp);if(o&&o.id!==c.id)return `hồi tị: cùng nha môn với ${o.given}`;
  }
  return '';
}
function assignPost(c,key,quiet){
  const st=offState(key);
  if(st.holder&&st.holder!==c.id)return false;
  if(seatOfC(c)!==key){if(isHead(c)&&c.seat&&c.job==='quan')c.flags.prevSeat={seat:c.seat,lv:c.lv,postT:c.postT};releaseSeat(c)}
  const T=seatTm(key);
  c.post=seatT(key);c.seat=key;c.sg=T.sg;
  if(c.job!=='quan_ngu'&&c.job!=='nguy')c.lv=T.r;
  st.vac=false;st.holder=c.id;st.since=S.t;delete st.why;
  c.postT=S.t;
  if(c.flags.want===key)c.flags.want=null;
  if(!quiet)enqueue('post',c.id,{key});
  return true;
}

/* ----- v6.4.1: nghề ngự y ánh xạ vào ghế Thái y viện -----
   cấp nghề 0, 1, 2 (Ngự y, Viện phán, Thái y lệnh) ứng với ghế ngyy, vienphan2, vienphan.
   Chiếu mời chỉ phát khi nhà chưa có ai ở trong cung và còn ghế Ngự y trống; lên cấp phải có ghế cấp trên trống. */
const NGU_TID=['ngyy','vienphan2','vienphan'];
const nguTid=lv=>NGU_TID[Math.max(0,Math.min(2,lv))];
function nguFree(c,lv){
  const tid=nguTid(lv);if(!OFFICES[tid])return null;
  const kp=kinPosts(c);
  const ks=shuf(DX.seatKeys(tid)).filter(k=>{if(k===seatOfC(c)||barReason(c,k,kp))return false;const st=offState(k);return st.vac&&!st.holder});
  return ks[0]||null}
const nguHave=()=>alive().some(p=>p.job==='nguy');
const nguOpen=c=>!nguHave()&&!!nguFree(c,0);
function nguInvite(c){
  const key=nguFree(c,0);if(!key)return null;
  if(c.biz){const b=bizOf(c);if(b)b.owner=null;c.biz=null}
  c.job='nguy';c.lv=0;c.bonus=0;
  assignPost(c,key);
  return key}
/* ghế Thái y viện vừa trống: báo cho người nhà đang ở cấp liền dưới và đủ điều kiện lên */
function nguNotify(key){
  const tid=seatT(key);const lv=NGU_TID.indexOf(tid);if(lv<1)return;
  alive().forEach(c=>{if(c.job==='nguy'&&c.lv===lv-1&&!c.away&&canPromote(c))enqueue('promo',c.id)})}
function nguPromo(c){
  const L=JOBS.nguy.lv[c.lv+1];if(!L)return;
  const key=nguFree(c,c.lv+1);
  if(!key){c.flags.noPromoUntil=S.t+6;return}
  const nm=seatName(key).replace(/ \(\d+\)$/,'');
  choicePopup(c,'Thái y viện',`Thái y viện khuyết ${nm}`,`${esc(c.given)} đủ tài thuốc để nhận chức <b>${esc(nm)}</b> (${phTxt(seatTm(key))}). Ghế này vừa trống, người trong viện đang cân nhắc.`,[
    {l:'Nhận chức',r:[{tri:1,eq:0.5,m:0.5},40+c.lv*8-famePromo(c)],y:c=>{if(!assignPost(c,key,true))return 'Ghế vừa có người khác nhận.';achieve(c,`được đề bạt lên ${nm.toLowerCase()}`);return `Lên ${esc(nm)}!`+fx(c,{lv:1,fame:3+c.lv*2,tam:6})},n:c=>{c.flags.noPromoUntil=S.t+12;return 'Chưa được tin tưởng, đợi dịp sau.'+fx(c,{tam:-5})}},
    {l:'Từ chối, giữ chức cũ',f:c=>{c.flags.noPromoUntil=S.t+24;return fx(c,{tam:3})}}]);
}
/* gợi ý ghế để xin: văn thăng một hai bậc hoặc đổi sang việc khác cùng bậc, võ cùng cấp bậc quân */
function pickSeats(c){
  const mil=c.job==='quan_ngu';const b=bacOf(c);const cur=seatOfC(c);const curTag=(postOf(c)||{}).tag;
  const kp=kinPosts(c);const out=[];
  for(const tid in OFFICES){const T=OFFICES[tid];if(!!T.mil!==mil||T.tag==='y')continue;
    if(mil){if(T.ar!==c.lv)continue}
    else{const tb=T.r*2+T.sg;if(!(tb===b+1||tb===b+2||(tb===b&&T.tag!==curTag)))continue}
    if(Object.keys(T.req).some(k=>c[k]<T.req[k]))continue;
    const keys=shuf(DX.seatKeys(tid).filter(k=>k!==cur)).slice(0,6).filter(k=>!barReason(c,k,kp));
    if(!keys.length)continue;
    const vac=keys.filter(k=>offState(k).vac);
    out.push({tid,T,key:vac.length?pick(vac):keys[0],vac:vac.length>0,rnd:Math.random()})}
  out.sort((a,b)=>(b.vac-a.vac)||(a.rnd-b.rnd));
  const vs=out.filter(x=>x.vac).slice(0,5),os=out.filter(x=>!x.vac).slice(0,8-Math.min(5,vs.length));
  return vs.concat(os);
}
function officePopup(c){
  const mil=c.job==='quan_ngu';
  const cand=pickSeats(c);
  const opts=[];
  cand.forEach(({tid,T,key})=>{const st=offState(key);
    const reqTxt=Object.entries(T.req).map(([k,v])=>`${SN[k]} ${v}`).join(', ');
    const nm=seatName(key);const ph=phTxt(T);
    const spec=mil?{vo:1,tri:0.4,eq:0.4}:{tri:1,eq:0.6,fame:0.4};
    if(st.vac)opts.push({l:`Ứng cử ${nm} (${ph}) · đang trống`,s:`${T.d} Cần ${reqTxt}.`,r:[spec,st.ab-5],y:c=>{if(!assignPost(c,key))return 'Ghế đã có người khác.';return `Được bổ nhiệm ${nm}!`+fx(c,{fame:8+T.r*4,tam:8})},n:c=>{st.vac=false;st.n=pick(SURN)+' '+mkGiven('nam');st.since=S.t;delete st.why;c.flags.noPromoUntil=S.t+12;return 'Người khác giỏi hơn được chọn.'+fx(c,{tam:-6})}});
    else opts.push({l:`Nhắm ghế ${nm} (${ph})`,s:`Đang do ${st.n} ngồi, ${st.age} tuổi, năng lực ${st.ab}${st.liem<35?', tiếng không sạch':''}. Cần ${reqTxt}.`,f:c=>{c.flags.want=key;c.flags.noPromoUntil=S.t+12;return `Để mắt tới ghế ${nm}. Khi trống sẽ có tin.`}});
  });
  const tgt=c.flags.want&&S.off&&S.off[c.flags.want]&&seatTm(c.flags.want)&&!S.off[c.flags.want].vac?c.flags.want:null;
  if(tgt){const st=S.off[tgt];const T=seatTm(tgt);const nm=seatName(tgt);
    opts.push({l:`Dâng sớ hặc tội ${st.n}`,s:'Thành thì ghế trống, bại thì bị trả đũa',r:[{tri:1,eq:0.8,liem:0.4},st.ab*0.6+st.liem*0.5],y:c=>{st.vac=true;st.vacT=S.t;st.why='bị hặc tội';return `${st.n} bị cách chức. Ghế ${nm} đã trống.`+fx(c,{fame:6,liem:3})+((enqueue('promo',c.id)),'')},n:c=>{c.flags.noPromoUntil=S.t+24;return 'Bị phản đòn, mang tiếng hãm hại đồng liêu.'+fx(c,{fame:-15,tam:-10})},nn:c=>{if(c.lv>0&&!mil)c.lv=Math.max(0,c.lv-1);return 'Bị giáng một bậc vì vu cáo.'+fx(c,{fame:-25,tam:-15})}});
    opts.push({l:`Lo lót thượng quan để chen ghế ${nm} (${money(mm(12*(T.r+1)))})`,c:()=>S.money>=mm(12*(T.r+1)),f:c=>{S.money-=mm(12*(T.r+1));if(chance(0.35)&&assignPost(c,tgt)){return `Thượng quan điều ${st.n} đi nơi khác, nhường ghế cho mình.`+fx(c,{liem:-10})}return 'Tiền mất, ghế vẫn chưa đến lượt.'+fx(c,{liem:-5})}});}
  opts.push({l:mil?'Ở lại đồn hiện tại':'Yên phận với chức hiện tại',f:c=>{c.flags.noPromoUntil=S.t+18;return 'Làm tốt việc trước mắt.'+fx(c,{m:1})}});
  const here=seatOfC(c);
  choicePopup(c,mil?'Quân ngũ':'Hoạn lộ',mil?'Xin chức võ':'Đường thăng tiến',`${esc(c.given)} đang ${mil?'giữ':'làm'} ${esc(here?seatName(here):(mil?ARMY[c.lv][0]:RANKS[c.lv]))}${mil?'':` (${rankTxt(c)})`}. Ở quan trường, cùng phẩm mà mỗi chức một việc, một bổng lộc, một nơi. Ghế chỉ trống khi người cũ về hưu, qua đời, bị hặc tội, được thăng hoặc bị điều đi. Theo lệ hồi tị, không làm quan ở quê nhà, người cùng gia tộc không ngồi chung một nha môn hay một huyện.`,opts);
}
/* hết nhiệm kỳ ba năm: khảo khóa */
function termTick(){
  alive().forEach(c=>{
    if(c.job==='quan_ngu'&&c.lv>=3&&!c.seat&&(c.flags.mpAt||0)<=S.t&&c.away){c.flags.mpAt=S.t+10;enqueue('office',c.id);return}
    if(!isOff(c))return;
    if(c.postT==null){c.postT=S.t;return}
    if(S.t-c.postT>=36&&(c.flags.termAt||0)<=S.t){c.flags.termAt=S.t+10;enqueue('term',c.id)}
    if(c.pst&&c.pst.fam===0&&S.t%12===6){const f=famOf(c);if(f.sp||f.kids.length)addStat(c,'tam',-2)}
  })}
function termPopup(c){
  const key=seatOfC(c);if(!key||!isOff(c))return;
  const T=seatTm(key),nm=seatName(key),mil=c.job==='quan_ngu';
  const sc=(mil?(c.vo*0.5+c.tri*0.2+c.eq*0.3):(c.tri*0.45+c.eq*0.35))+(c.liem-50)*0.25+R(-14,14);
  const grade=sc>=62?2:sc>=44?1:0;
  const gtxt=['hạ đẳng','trung đẳng','thượng đẳng'][grade];
  const body=`Đã đủ ba năm giữ ${esc(nm)}. Triều đình xét công trạng của ${esc(c.given)}: ${gtxt}. ${grade===2?'Được ghi công, dân chúng mến mộ.':grade===0?'Nhiều việc trì trệ, bị trách là làm việc cẩu thả.':'Không công không tội.'}`;
  const bonus=()=>grade===2?fx(c,{fame:8+T.r*2,tam:6,m:3}):grade===0?fx(c,{fame:-6,tam:-6}):fx(c,{m:1});
  c.flags.termGrade=grade;
  if(grade===2){c.flags.noPromoUntil=0;c.cong=(c.cong||0)+25;tuocCheck(c,'nhiều nhiệm kỳ xếp thượng đẳng');tuocMsg=''} /* v6.4.1.2: nhiệm kỳ thượng đẳng được ghi công, tích dần tới phong tước */
  const opts=[{l:'Ở lại thêm một nhiệm kỳ',f:c=>{c.postT=S.t;if(grade===0)c.flags.noPromoUntil=S.t+12;return 'Tiếp tục giữ chức cũ.'+bonus()}}];
  opts.push({l:grade===0?'Xin đổi chức khác để làm lại':'Xin thuyên chuyển lên chức cao hơn',f:c=>{c.postT=S.t;enqueue('office',c.id);return 'Dâng đơn lên bộ Lại xin điều động.'+bonus()}});
  opts.push({l:mil?'Xin giải ngũ':'Xin từ quan',f:c=>{enqueue('resign',c.id);return (mil?'Dâng đơn xin giải ngũ.':'Dâng đơn xin về.')+bonus()}});
  choicePopup(c,'Khảo khóa',`Hết nhiệm kỳ ${esc(nm)}`,body,opts);
}

/* ================= nghề ================= */
const jobName=c=>{if(c.job==='quan'){const k=seatOfC(c);return (k&&seatTm(k)?seatName(k)+' · ':'')+rankTxt(c)};if(c.job==='chu'){const b=bizOf(c);return b?`Chủ ${BIZ[b.type].lv[b.lv][0].toLowerCase()}`:'Chủ cơ sở'}
  if(c.job==='quan_ngu'){const k=c.seat;return k&&seatTm(k)?`${ARMY[c.lv][0]} · ${seatName(k)}`:ARMY[c.lv][0]}
  if(c.job==='nguy'&&c.seat&&seatTm(c.seat))return seatName(c.seat).replace(/ \(\d+\)$/,'')+' · '+phTxt(seatTm(c.seat));
  const J=JOBS[c.job];return J.lv[Math.min(c.lv,J.lv.length-1)].n+(['none','huu','noi','vua','hiep'].includes(c.job)||J.lv[0].n===J.n?'':` · ${J.n}`)};
function relation(c){
  if(c.left)return ({vaocung:'Đã vào cung',xuatgia:'Đã xuất giá',expelled:'Bị trục xuất',lyhon:'Đã ly hôn, rời đi',ban:'Đã bị bán đi',botron:'Bỏ nhà ra đi',tumat:'Bị từ mặt',theome:'Theo mẹ',theochong:'Theo chồng rời đi',luuvong:'Lưu vong'})[c.left]||'Đã rời gia tộc';
  if(c.ngoai)return 'Cháu ngoại';
  if(c.id===S.head)return 'Gia chủ';
  const h=head();if(h&&h.spouse===c.id)return c.g==='nữ'?'Chủ mẫu':'Phu quân gia chủ';
  if(c.inLaw)return c.g==='nữ'?'Con dâu':'Con rể';
  if(c.adopted)return `Con nuôi · đời ${c.gen}`;
  return `Đời thứ ${c.gen}`;
}
function meets(c,id){const J=JOBS[id];if(!J.req)return true;return Object.entries(J.req).every(([k,v])=>c[k]>=v)}
function setJob(c,id){if(c.seat&&id!==c.job)leaveSeat(c);if(c.biz){const b=bizOf(c);if(b)b.owner=null;c.biz=null}c.mexp=c.mexp||{};const mj=c.job==='chu'&&c.bizFrom&&JOBS[c.bizFrom]?c.bizFrom:c.job;if(mj&&c.m>0&&!['none','huu','vua'].includes(mj))c.mexp[mj]=Math.max(c.mexp[mj]||0,c.m);if(id==='huu')retireMark(c);c.job=id;c.lv=0;c.bonus=0;c.m=Math.min(55,Math.round(expOf(c,id)));(c.mms[id]=c.mms[id]||[]).push(...[20,40].filter(t=>t<=c.m));if(id==='nong')c.lv=farmerLv()}
function jobPopup(c,first){return jobChoice(c,first)}
/* từ quan cần lý do hợp lý */
/* v6.5.2: quan võ cũng từ quan được. Giải ngũ khó hơn lúc có chiến sự; bỏ trốn thì mang tiếng đào ngũ. */
function discharge(c){leaveSeat(c);c.away=null;c.job='none';c.lv=0;c.bonus=0;c.flags.noRetireUntil=S.t+24;log(`${nameOf(c)} rời quân ngũ.`)}
function dischargePopup(c){
  const war=!!S.war,a=age(c),pay=Math.round(ARMY[c.lv][1]*(2+c.lv*0.5));
  choicePopup(c,'Quân ngũ','Xin giải ngũ',`${esc(c.given)} nghĩ chuyện rời doanh trại. Quân pháp nghiêm, muốn đi phải có lý do chính đáng.${war?' Nước đang có chiến sự, đơn xin giải ngũ rất khó được duyệt.':''}`,[
    {l:'Xin giải ngũ về quê',r:[{eq:1,fame:0.3},war?18:58],y:c=>{discharge(c);S.money+=pay;return `Được cấp ${money(pay)} tiền lộ phí, cho về quê.`+fx(c,{tam:6})},n:c=>'Thượng cấp bác đơn, bảo việc quân chưa xong.'+fx(c,{tam:-4})},
    {l:'Cáo thương, xin về dưỡng',c:()=>c.suc<60,r:[{eq:1},war?45:70],y:c=>{discharge(c);S.money+=Math.round(pay/2);return 'Quân y khám xét, chuẩn cho về dưỡng thương.'+fx(c,{tam:5})},n:c=>'Quân y bảo chưa đến nỗi, bác đơn.'+fx(c,{tam:-4})},
    {l:'Xin về hưu',c:()=>a>=55,f:c=>{retireMark(c);discharge(c);c.job='huu';S.money+=pay;return 'Vinh quy về hưu, được thưởng bổng.'+fx(c,{fame:8+c.lv*2,tam:10})}},
    {l:'Bỏ trốn khỏi doanh trại',f:c=>{discharge(c);return 'Đêm đó có người biến mất khỏi doanh trại. Quân lệnh coi là đào ngũ, cả nhà mang tiếng.'+fx(c,{fame:-40,cfame:-15,tam:-5})}},
    {l:'Thôi, ở lại',f:c=>''}]);
}
function resignPopup(c){
  const par=S.people.filter(p=>c.parents.includes(p.id));
  const mourn=par.some(p=>p.dead!=null&&S.t-p.dead<=3);
  const oldPar=par.some(p=>inClan(p)&&age(p)>=70);
  choicePopup(c,'Quan trường','Xin từ quan',`Muốn rời quan trường phải có lý do chính đáng. Tự ý bỏ chức là coi thường triều đình.`,[
    {l:'Về chịu tang cha mẹ (đinh ưu)',s:'Nghỉ 27 tháng rồi được phục chức',c:()=>mourn,f:c=>{unpostFol(c);c.pst=null;c.away={type:'mourn',until:S.t+27};later(c,'q_phuc_chuc',27);return 'Được về quê chịu tang.'+fx(c,{fame:4})}},
    {l:'Cáo bệnh',c:()=>c.suc<55,r:[{eq:1},45],y:c=>{quitOffice(c);return 'Triều đình chuẩn cho về dưỡng bệnh.'+fx(c,{tam:6})},n:c=>'Bị nghi giả bệnh, bác đơn.'+fx(c,{fame:-5,tam:-5})},
    {l:'Xin về phụng dưỡng cha mẹ già',c:()=>oldPar,r:[{eq:1,fame:0.3},40],y:c=>{quitOffice(c);return 'Vua khen là người con hiếu, chuẩn cho về.'+fx(c,{fame:10,tam:6})},n:c=>'Vua giữ lại, bảo việc nước quan trọng hơn.'+fx(c,{tam:-4})},
    {l:'Trí sĩ (tuổi cao)',c:()=>age(c)>=60,f:c=>{retireMark(c);quitOffice(c);c.job='huu';return 'Vinh quy trí sĩ, được ban lụa vàng.'+fx(c,{money:mm(30),fame:15,tam:10})}},
    {l:'Treo ấn từ quan không cần lý do',s:'Mạo phạm triều đình',f:c=>{quitOffice(c);return 'Bị coi là coi thường triều đình. Cả nhà bị tai tiếng.'+fx(c,{fame:-30,cfame:-15,tam:-5})}},
    {l:'Thôi, ở lại',f:c=>''}]);
}
/* v6.3.4: bị cách chức vì tội nặng thì có thể mất cả danh phận.
   mức 1 thất trách: không mất gì · 2 nhận hối lộ, xử án sai, bỏ nhiệm sở: có thể hạ một bậc tước, mất danh hiệu đức hạnh
   mức 3 tham ô lớn, mưu phản: mất hết tước, có thể mất cả học vị và danh hiệu đức hạnh. Trả về dòng chữ để nối vào kết quả. */
function stripHonors(c,sev,why){
  if(!c||sev<2)return '';const out=[];
  if(c.tuoc&&(sev>=3||chance(0.5))){const from=c.tuoc,to=sev>=3?0:from-1;
    c.tuoc=to;c.tuocPrev=to;fiefSync();
    out.push(to?`Bị giáng từ ${TUOC[from]} xuống ${TUOC[to]}`:`Bị tước ${TUOC[from]}`)}
  if(sev>=3&&c.degree&&chance(0.6)){const dn=['','Cử nhân','Cống sĩ',c.flags.examTitle||'Tiến sĩ'][c.degree];
    c.degree=0;delete c.flags.examTitle;delete c.flags.examRank;delete c.flags.exSave;c.exam=null;c.flags.noExam=S.t+180;out.push(`Bị tước học vị ${dn}`)}
  const ei=ctRank(c,'eq');
  if(ei>=0&&chance(sev>=3?0.75:0.3)){const nm=STITLE.eq[ei][1];
    for(let j=0;j<STITLE.eq.length;j++)removeTrait(c,'ct_eq_'+j);
    c.ct.eq=-1;c.flags.ctF_eq=S.t+120;delete c.flags['ctS_eq'+ei];out.push(`Mất danh hiệu "${nm}"`)}
  if(!out.length)return '';
  log(`${nameOf(c)} ${why||'bị cách chức'}: ${out.join('; ').toLowerCase()}.`,'bd');
  return ` <span class="muted">${out.join('. ')}.</span>`}
function quitOffice(c){leaveSeat(c);c.job='none';c.lv=0;c.m=0;c.bonus=0;log(`${nameOf(c)} rời quan trường.`)}

/* ================= tòng quân, giang hồ ================= */
function dropTrips(c){S.trips.forEach(t=>{if(t.cid===c.id){t.cid=null;t.hired=true;t.skill=R(35,65)}})}
function enlist(c,forced){dropTrips(c);setJob(c,'quan_ngu');c.merit=0;c.enlistT=S.t;c.away={type:'army'};
  {const sp=spouseOf(c);if(sp&&inClan(sp)&&!sp.away&&head())enqueue('ev',S.head,{ev:'lq_dua_vo',data:{who:c.id}})}log(`${nameOf(c)} ${forced?'bị bắt đi lính':'tòng quân'}, rời nhà ra doanh trại.`,'gd')}
function jhPopup(c){
  const amts=[0,mm(5),mm(20),mm(60)];
  openModal(`${headerFor(c)}<span class="eyebrow">Giang hồ</span><h2>Mang theo bao nhiêu lộ phí?</h2>
   <p class="muted">Người hành tẩu giang hồ rời nhà, sống bằng túi tiền riêng. Túi rỗng thì phải tự kiếm, có khi phải làm chuyện chẳng đặng đừng. Muốn về nhà lúc nào cũng được, túi còn bao nhiêu mang về bấy nhiêu.</p>
   <div class="choices">${amts.map((v,i)=>`<button class="btn" data-a="${i}" ${S.money<v?'disabled':''}><strong>${v?money(v):'Tay không'}</strong></button>`).join('')}<button class="btn ghost" data-x>Thôi</button></div>`);
  M.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{const v=amts[+b.dataset.a];S.money-=v;dropTrips(c);setJob(c,'hiep');c.purse=v;c.away={type:'jh'};log(`${nameOf(c)} khoác kiếm hành tẩu giang hồ, mang theo ${money(v)}.`,'gd');closeModal()});
  M.querySelector('[data-x]').onclick=closeModal;
}
function awayText(c){const a=c.away;if(!a)return '';return a.type==='luuday'?'đang bị lưu đày nơi biên viễn':a.type==='army'?'đang ở doanh trại':a.type==='jh'?'đang bôn ba giang hồ':a.type==='mourn'?'đang chịu tang':a.type==='trade'?'đang đi buôn':a.type==='follow'?(a.p?`đang theo ${(P(a.of)&&P(a.of).given)||'người thân'} nhậm chức ở ${provN(a.p)}`:`đang theo ${(P(a.of)&&P(a.of).given)||'người thân'} ở trại gia binh`):''}

/* ================= học hành ================= */
/* v6.3.4: con gái đi học tùy nếp nhà, không tùy mỗi chuyện nhà giàu hay có quan
   Nho gia: «nữ tử vô tài tiện thị đức», «nam chủ ngoại, nữ chủ nội», đạo tam tòng tứ đức; đến giữ khuê môn cũng là giữ lễ.
   Lão Tử: «tri kỳ hùng, thủ kỳ thư» (biết cứng mà giữ mềm), «nhu thắng cương»; nhà thuận tự nhiên, không câu nệ lễ giáo thì cho con gái học chữ dễ hơn.
   0 giữ khuê môn · 1 cho dạy chữ trong nhà · 2 cho học thầy riêng · 3 gia quy «Nữ nhi được đi học» mới vào trường công */
function girlStance(){
  if(rule('nuhoc'))return 3;
  const h=head();if(!h)return 0;let s=0;
  if(axv(h,'rong')>=65)s++;
  if(axv(h,'dl')>=65)s++;
  if(h.g==='nữ')s++;
  const sp=spouseOf(h);
  if(alive().some(p=>p.g==='nữ'&&inClan(p)&&age(p)>=25&&(p.tri>=60||(p.degree||0)>0)&&(p.id===(sp&&sp.id)||h.parents.includes(p.id))))s++;
  if(axv(h,'ht')>=70)s--;
  if(S.rules.includes('nghiem')||rule('dichton')||rule('nutac'))s--;
  return clamp(s,0,2)}
const STANCE_TXT=[
  'Nếp nhà giữ lễ xưa: «nữ tử vô tài tiện thị đức», con gái không cần học nhiều chữ, học nữ công và đức hạnh để về nhà chồng. Nhà giàu hay có quan cũng không đổi nếp ấy.',
  'Gia chủ cho con gái học chữ trong nhà, nhưng con gái không ra cổng đến trường: «nam chủ ngoại, nữ chủ nội».',
  'Gia chủ thuận lẽ tự nhiên như lời Lão Tử, cho con gái học thầy riêng ngay trong nhà. Vào trường công vẫn không được.',
  'Gia quy «Nữ nhi được đi học»: con gái được đến trường như con trai.'];
const STANCE_NEED=['','Nếp nhà chưa cho con gái học chữ nghĩa với thầy','Nếp nhà chưa cho con gái học thầy riêng','Trường công không nhận con gái, trừ nhà đã lập gia quy «Nữ nhi được đi học»'];
/* v6.4.1.3: tư chất bẩm sinh khi chọn trường, nói bằng chữ */
const potW=v=>v>=85?'xuất chúng':v>=72?'cao':v>=58?'khá':v>=45?'trung bình':v>=32?'thấp':'kém';
const potLine=c=>['tri','vo','suc','mi','eq'].map(k=>`${SN[k]} ${potW(pot(c,k))}`).join(' · ');
function schoolPopup(c,lvl){
  const girl=c.g==='nữ';const opts=SCHOOL[lvl];const ti=tierIdx();const gs=girl?girlStance():3;
  const can=(s)=>{if(girl&&(s.need||0)>gs)return false;if(girl&&gs<3&&!s.anyGirl&&!(s.need||0)&&s!==opts.nha)return false;if(s.tier&&ti<s.tier)return false;if(s.noble&&!(clanTuoc()>0||alive().some(p=>p.job==='quan')||S.royal||ti>=5))return false;return true};
  const why=(s)=>{if(girl&&(s.need||0)>gs)return STANCE_NEED[s.need];if(s.tier&&ti<s.tier)return `Cần gia thế ${TIERS[s.tier][0]}`;if(s.noble)return 'Cần nhà có tước, quan lại hoặc thế gia';return ''};
  /* v6.5.4: nói rõ học ai, học nghề gì */
  const exTxt=k=>{if(k==='cha'){const ps=S.people.filter(p=>c.parents.includes(p.id)&&inClan(p)&&!p.away&&age(p)>=18);if(!ps.length)return '';const best=['tri','vo','mi','eq'].map(s=>[s,Math.max(...ps.map(p=>p[s]))]).sort((a,b)=>b[1]-a[1])[0];return ` · theo ${ps.map(p=>p.given).join(' và ')}, học nhất về ${SN[best[0]].toLowerCase()}`}
    if(k==='hocviec'){const j=apprJob(c,k);return j&&JOBS[j]?` · học nghề ${JOBS[j].n.toLowerCase()}`:''}
    if(k==='gui'&&S.biz.length)return ` · học việc ở ${BIZ[S.biz[0].type].n.toLowerCase()}`;return ''};
  openModal(`${headerFor(c)}<span class="eyebrow">${['','Sáu tuổi','Mười tuổi','Mười bốn tuổi'][lvl]} · ${['','Vỡ lòng','Trung học','Cao học'][lvl]}</span><h2>Cho ${esc(c.given)} đi học ở đâu?</h2>
   <p class="muted">Học phí tính theo tháng. Mức tăng là mỗi năm, nhân với tư chất bẩm sinh và tâm trạng.</p>
   <p class="kvline"><b>Tư chất của ${esc(c.given)}:</b> ${potLine(c)}</p>${girl?`<p class="muted"><b>Nếp nhà:</b> ${STANCE_TXT[gs]}</p>`:''}
   <div class="choices">${Object.entries(opts).filter(([k,s])=>(girl||!s.girlOnly)&&!s.army).map(([k,s])=>{const ok=can(s)&&schoolCan62(c,k);const sd=SPEC_D[k];const g=Object.entries(s.g).map(([kk,v])=>`${SN[kk]} +${v}`).concat(Object.entries(s.pre||{}).map(([j,v])=>`học việc ${JOBS[j].n.toLowerCase()} +${v}`)).join(', ');
     return `<button class="btn" data-s="${k}" ${ok?'':'disabled'}><strong>${s.n}${s.fee?` · ${money(s.fee)}/tháng`:''}</strong><small>${sd?sd+(g?' · '+g:''):(g||'Không học gì thêm')}${exTxt(k)}${ok?'':' · '+(why(s)||(k==='cha'?'Cha mẹ không ở nhà':k==='gui'?'Gia tộc chưa có cơ sở làm ăn':'Chưa đủ chữ để tự học'))}</small></button>`}).join('')}</div>`);
  M.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{const k=b.dataset.s;c.school=k;const sc=opts[k];c.appr=(sc.appr||sc.gui)?apprJob(c,k):null;if(c.focus==='nghi'&&!sc.chore)c.focus='hoc';log(`${nameOf(c)} ${k==='nha'?'ở nhà':sc.appr?'theo người học nghề '+JOBS[c.appr].n.toLowerCase():sc.gui?'được gửi vào cơ sở của gia tộc học việc '+JOBS[c.appr].n.toLowerCase():sc.par?'ở nhà theo cha mẹ học':sc.chore?'ở nhà phụ việc':'vào '+sc.n.toLowerCase()}.`);closeModal()});
}

/* ================= hôn nhân ================= */
function mkSpouse(c,free,o){
  /* v6.3: đã có vợ/chồng còn sống ở trong nhà thì không cưới thêm (cốt truyện nhiều bước có thể xảy ra sau khi đã thành thân) */
  {const cur=spouseOf(c);if(cur&&inClan(cur)&&cur.spouse===c.id)return cur}
  const p=o||mkMatch(c,{hh:c.hh});
  p.inLaw=true;p.gen=c.gen;sphAdd(c,p);sphAdd(p,c);p.spouse=c.id;c.spouse=p.id;p.hh=c.hh;
  if(!DRY)inlawLink(c,p);
  STATS.forEach(([k])=>p.ms[k]=MS.filter(t=>p[k]>=t));
  if(!p.job||p.job==='none'){const fitL=STARTJOBS.filter(id=>meets(p,id)&&JOBS[id].inc&&jobOk(p,id));const best=fitL.length?fitPick(p,fitL):null;
    p.job=p.g==='nữ'&&chance(0.55)?'noi':(best||'nong');p.m=R(0,30);(p.mms[p.job]=[]).push(...[20].filter(t=>t<=p.m))}
  p.focus=pick(['nghi','hoc','cam','phat','ren']);
  p.wantChild=false;c.wantChild=false;
  setLove(c,p,free);p.marTier=tierIdx();
  /* v6.4.1.5: kiểu hôn nhân ảnh hưởng tình cảm ban đầu */
  if(c.marT==='cuongep')c.love=p.love=Math.max(0,c.love-15);else if(c.marT==='traon'||c.marT==='mondang')c.love=p.love=Math.min(100,c.love+(c.marT==='traon'?8:4));if(chance(0.15))p.flags.coi=1;
  if(c.flags.divorced||c.flags.widowT){if(!rule('taigia')&&c.g==='nữ')cf(-2,'Đàn bà tái giá, người đời dị nghị')}
  if(p.needT!=null&&tierIdx()-p.needT>=3&&!free)cf(-2,'Kết thông gia không môn đăng hộ đối');
  S.people.push(p);cf(free?2:5,'Cưới hỏi');S.hung=clamp(S.hung+2,0,100);
  addStat(c,'tam',12);addStat(p,'tam',10);
  log(`${nameOf(c)} kết duyên cùng ${nameOf(p)}${p.job&&p.job!=='none'?` (${jobName(p).toLowerCase()})`:''}.`,'gd');
  return p;
}
/* ================= sinh nở ================= */
function pregPopup(c){
  choicePopup(c,'Tin vui','Có tin mừng',`${esc(nameOf(c))} đã mang thai.${c.preg.twins?' Thầy thuốc bắt mạch nói có thể là song thai, cần chăm sóc kỹ.':''} Chín tháng nữa gia tộc đón thêm thành viên. Chăm sóc thế nào?`,[
    {l:'Như thường lệ',s:'Không tốn thêm',f:c=>{c.preg.care=0;return 'Người mẹ vẫn làm việc như thường.'}},
    {l:`Bồi bổ, nghỉ ngơi (${money(mm(1))}/tháng)`,s:'Giảm rủi ro sinh khó',f:c=>{c.preg.care=1;return 'Người mẹ được nghỉ ngơi bồi bổ.'+fx(c,{tam:5})}},
    {l:`Mời thầy thuốc theo dõi (${money(mm(3))}/tháng)`,s:'Giảm mạnh rủi ro',f:c=>{c.preg.care=2;return 'Thầy thuốc bắt mạch đều đặn.'+fx(c,{tam:6})}}]);
}
const MIDWIFE=[['Tự đỡ ở nhà',0,0.22,1.3],['Bà mụ trong làng',3,0.12,1],['Bà đỡ có tiếng',20,0.06,0.7],['Thầy thuốc giỏi',80,0.03,0.5]];
function birthPopup(m){
  const mw=home().filter(p=>p.job==='mo'&&p.id!==m.id&&!p.away).sort((a,b)=>b.lv-a.lv||b.m-a.m)[0];
  const MW=mw?[[`${mw.given} trong nhà đỡ`,0,Math.max(0.03,0.13-mw.lv*0.03-mw.m/2000),Math.max(0.5,1-mw.lv*0.15)],...MIDWIFE]:MIDWIFE;
  openModal(`${headerFor(m)}<span class="eyebrow">Chuyển dạ · ${dateStr(S.t)}</span><h2>Mời ai đỡ đẻ?</h2>
   <p>${esc(m.given)} trở dạ.${m.preg.twins?' Song thai, ca sinh nguy hiểm hơn.':''} Người đỡ đẻ quyết định nhiều đến sống chết của cả mẹ và con.</p>
   <div class="choices">${MW.map(([n,c,r],i)=>`<button class="btn" data-w="${i}" ${S.money<mm(c/10)*1&&c?'disabled':''}><strong>${n}${c?` · ${money(mm(c/10))}`:''}</strong><small>Rủi ro sinh khó ${(x=>x<0.06?'rất thấp':x<0.12?'thấp':x<0.2?'khá cao':'cao')(r+(age(m)>35?0.08:0)+(m.preg.twins?0.12:0)-(m.preg.care*0.03))}</small></button>`).join('')}</div>`);
  M.querySelectorAll('[data-w]').forEach(b=>b.onclick=()=>{const [n,cost,risk,harmF]=MW[+b.dataset.w];S.money-=cost?mm(cost/10):0;doBirth(m,risk,harmF,n)});
}
function childOf(m,f,g){
  const blood=m.inLaw&&f?f:m;
  const gn={};STATS.forEach(([k])=>{const a=(m.gn&&m.gn[k])||[50,50],b=(f&&f.gn&&f.gn[k])||[R(20,80),R(20,80)];gn[k]=[pick(a),pick(b)].map(v=>clamp(v+(chance(0.05)?R(-15,15):0),10,100))});
  const tg={};for(const k in TRAITS){if(!TRAITS[k].gene)continue;const pa=(m.tg&&m.tg[k])||0,pb=f?((f.tg&&f.tg[k])||0):(chance(TRAITS[k].p)?1:0);tg[k]=(chance(pa/2)?1:0)+(chance(pb/2)?1:0)}
  const kid=mkPerson({g,surname:blood.surname,age:0,young:true,gn,tg,hh:m.hh});
  kid.born=S.t;kid.parents=[m.id].concat(f?[f.id]:[]);kid.gen=(blood.gen||1)+1;kid.focus='nghi';
  kid.given=clanGiven(g,kid.gen);
  kid.duyen=clamp(Math.round(((m.duyen+(f?f.duyen:50))/2)*0.5+R(5,50)),1,100);
  return kid;
}
let AUTO_B=false;
/* v6.6.0: trẻ của người ngoài quyền điều khiển tự vào trường: con gái ở nhà, con trai theo cha mẹ nếu được, không thì ở nhà */
function schoolAuto(c,lvl){const opts=SCHOOL[lvl];if(!opts)return;const ti=tierIdx();
  const ok=k=>{const s=opts[k];if(!s||s.army)return false;if(s.tier&&ti<s.tier)return false;if(s.noble)return false;if(c.g==='nữ'&&(s.need||0)>0)return false;try{return schoolCan62(c,k)}catch(e){return false}};
  const k=['cha','hocviec','nha'].find(ok)||'nha';c.school=k;const sc=opts[k];
  c.appr=(sc&&(sc.appr||sc.gui))?apprJob(c,k):null;if(c.focus==='nghi'&&sc&&!sc.chore)c.focus='hoc'}
function doBirth(m,risk,harmF,who){
  const f=P(m.preg.father);const tw=m.preg.twins;
  risk+=(age(m)>35?0.08:0)+(m.suc<50?0.08:0)+(tw?0.12:0)-m.preg.care*0.03;
  const comp=chance(Math.max(0.01,risk));
  const kids=[childOf(m,f,chance(0.5)?'nam':'nữ')];if(tw)kids.push(childOf(m,f,chance(0.5)?'nam':'nữ'));
  const lossHp=Math.round((R(2,5)+(comp?R(4,10):0)+(tw?R(2,4):0))*harmF);const harm=Math.round((R(4,10)+(comp?R(10,22):0))*harmF);
  let txt=`${esc(nameOf(m))} hạ sinh ${tw?'một cặp song sinh':`một ${kids[0].g==='nam'?'bé trai':'bé gái'}`}${comp?'. Ca sinh khó, người mẹ mất nhiều máu':''}. ${esc(who)} đỡ đẻ.`;
  const lost=[];kids.forEach(k=>{if(comp&&chance(0.25*harmF)){lost.push(k)}else{S.people.push(k);if(m.away&&m.away.type==='follow')k.away={type:'follow',of:m.away.of,p:m.away.p}}});
  if(lost.length)txt+=` Đau đớn thay, ${lost.length===kids.length?'đứa bé không qua khỏi':'một bé không qua khỏi'}.`;
  addStat(m,'suc',-harm);m.cap.suc=Math.max(1,m.cap.suc-lossHp);if(m.suc>m.cap.suc)m.suc=m.cap.suc;
  addStat(m,'tam',lost.length?-15:10);if(f)addStat(f,'tam',lost.length?-10:10);
  const live=kids.filter(k=>!lost.includes(k));
  log(`${nameOf(m)} hạ sinh ${live.map(k=>nameOf(k)).join(' và ')||'nhưng con không qua khỏi'}.${comp?' Ca sinh khó.':''}`,lost.length?'hi':'gd');
  m.preg=null;m.flags.ppUntil=S.t+R(24,36)+(comp?R(4,8):0); /* v6.5.4: cách nhau lâu hơn (trước 10 đến 16 tháng) */if(live.length)overBirth(m);
  if(AUTO_B){AUTO_B=false;if(m.suc<=0)die(m,'mất sau khi sinh');letterAdd(m,`${esc(m.given)} hạ sinh ${live.map(k=>esc(k.given)).join(' và ')||'nhưng con không qua khỏi'}${comp?', ca sinh khó':''}.`);setTimeout(nextPopup,0);return}
  openModal(`${headerFor(m)}<span class="eyebrow">${comp?'Sinh khó':'Mẹ tròn con vuông'} · ${dateStr(S.t)}</span><h2>Chào đời</h2>
   <p>${txt} Sức khỏe người mẹ giảm ${harm}, sức khỏe tối đa giảm ${lossHp}.</p>
   ${live.map((k,i)=>`<div class="field"><label for="kn${i}">Tên ${k.g==='nam'?'bé trai':'bé gái'} (họ ${esc(k.surname)})${traitsOf(k).length?` · bẩm sinh: ${traitsOf(k).map(t=>TRAITS[t].n).join(', ')}`:''}</label><input id="kn${i}" maxlength="20" value="${esc(k.given)}"></div>`).join('')}
   <p class="note">Vợ chồng vẫn giữ ý định có thêm con. Muốn dừng thì bấm trong hồ sơ.</p>
   <div class="choices"><button class="btn primary" data-ok>Ghi vào gia phả</button></div>`);
  M.querySelector('[data-ok]').onclick=()=>{live.forEach((k,i)=>{const v=M.querySelector('#kn'+i).value.trim();if(v)k.given=v});if(m.suc<=0)die(m,'mất sau khi sinh');closeModal()};
}
function adopt(parent,o){
  const kid=mkPerson(Object.assign({age:R(0,6),young:true,surname:parent.inLaw&&spouseOf(parent)?spouseOf(parent).surname:parent.surname,hh:parent.hh},o||{}));
  kid.parents=[parent.id].concat(married(parent)?[parent.spouse]:[]);kid.gen=(parent.gen||1)+1;kid.adopted=true;kid.focus='nghi';
  S.people.push(kid);log(`${nameOf(parent)} nhận ${nameOf(kid)} làm con nuôi.`,'gd');return kid;
}

/* ================= tang lễ, kế nghiệp ================= */
function deathPopup(c,cause){
  const wasHead=c.id===S.head;const f=c.fame;const exp=f>=150?2:f>=25?1:0;
  const costs=[mm(1),mm(6),mm(40)];
  const inh=inheritTitle(c);
  openModal(`${headerFor(c)}<span class="eyebrow">Tang sự</span><h2>${esc(nameOf(c))} qua đời</h2>
   <p>${esc(nameOf(c))} ${esc(cause)} ở tuổi ${age(c)}.${inh} ${wasHead?'Gia tộc cần người kế nghiệp.':''}</p>
   <p class="muted">Danh vọng của người mất: ${fmt(f)}. Người đời trông vào để xem gia tộc lo tang lễ thế nào: người có danh vọng mà làm sơ sài thì mang tiếng bạc bẽo, người không có danh vọng mà phô trương thì bị chê cười.</p>
   <div class="choices">${['Sơ sài','Trung bình','Trang trọng'].map((n,i)=>`<button class="btn" data-f="${i}" ${S.money<costs[i]&&i?'disabled':''}><strong>${n} · ${money(costs[i])}</strong><small>${i===exp?'Vừa với thân phận người mất':i<exp?'Thấp hơn thân phận, gia tộc mất danh vọng':'Cao hơn thân phận, bị chê phô trương'}</small></button>`).join('')}</div>`);
  M.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{const i=+b.dataset.f;S.money-=costs[i];
    const diff=i-exp;let d=0;if(diff<0)d=-(Math.max(5,f*0.2))*(-diff);else if(diff>0&&f<25)d=-4*diff;else if(diff===0)d=Math.max(1,f*0.05)*(i+1);
    cf(d,d>=0?'Tang lễ xứng đáng':'Tang lễ không xứng thân phận');S.on=clamp(S.on+(diff<0?-4:2),0,100);
    log(`Tang lễ ${['sơ sài','vừa phải','trang trọng'][i]} cho ${nameOf(c)}. Danh vọng gia tộc ${d>=0?'+':''}${Math.round(d)}.`,d<0?'hi':'gd');
    const sp=spouseOf(c);if(sp)sp.wantChild=false;
    if(!alive().length){gameOver();return}
    if(wasHead)enqueue('heir',alive()[0].id,null,true);
    closeModal()});
}
function heirPopup(){
  const old=S.people.find(x=>x.id===S.lastHead);const wh=old&&old.will&&old.will.heir;
  const cands=alive().filter(p=>inClan(p)&&age(p)>=14).sort((a,b)=>((b.id===wh)-(a.id===wh))||(a.inLaw-b.inLaw)||(!!a.away-!!b.away)||(age(b)-age(a)));
  const list=cands.length?cands:alive();
  openModal(`<span class="eyebrow">Kế nghiệp</span><h2>Chọn gia chủ mới</h2><p>Ai sẽ gánh vác gia tộc ${esc(S.surname)}? Gia chủ phân xử việc nhà, đặt gia quy, có quyền trục xuất người làm hại gia tộc. EQ của gia chủ ảnh hưởng độ ổn định.</p>
   <div class="choices">${list.map((p,i)=>`<button class="btn" data-h="${i}"><strong>${esc(nameOf(p))} · ${age(p)} tuổi</strong><small>${p.id===wh?'<b>Di chúc chọn</b> · ':''}${relation(p)} · ${esc(jobName(p))} · ${STATS.map(([k,n])=>`${n} ${Math.floor(p[k])}`).join(' · ')}</small></button>`).join('')}</div>`);
  M.querySelectorAll('[data-h]').forEach(b=>b.onclick=()=>{const p=list[+b.dataset.h];becomeHead(p);sel=p.id;centerNext=true;log(`${nameOf(p)} trở thành gia chủ.`,'gd');afterHeir(p);newHeadRules(p);closeModal()});
}
function gameOver(why,title){
  if(DRY)return;
  {const w=String(why||'');metaEnd(!why?'L3':/Nợ nần/.test(w)?'L2':/một sống một còn/i.test(w)?'L4':/tru di/i.test(w)?'L1':'L3')}
  S.over=true;save();running=false;
  openModal(`<span class="eyebrow">Hết một dòng họ</span><h2>${title||(why?'Tru di':'Hương khói lạnh tanh')}</h2><p>${why?esc(why)+' ':''}Gia tộc ${esc(S.surname)} khép lại sau ${Math.floor(S.t/12)} năm, ${S.people.length} người trong gia phả.</p>
   <p class="muted">Danh vọng ${fmt(S.fame)} · Gia thế ${tierName()}</p>
   <div class="choices"><button class="btn primary" data-n>Lập gia tộc mới</button></div>`);
  M.querySelector('[data-n]').onclick=()=>{S=null;O.hidden=true;mainMenu()};
}
function wipeClan(why){alive().forEach(p=>{p.dead=S.t});log(why,'hi');gameOver(why)}

/* ================= gia chủ: trục xuất, ở riêng ================= */
function expelPopup(c){
  const bad=c.fame<0||c.habits.some(h=>['bac','thanhlau','xahoa'].includes(h))||traitsOf(c).some(t=>['thamlam','nongtinh','hoangphi'].includes(t));
  choicePopup(head(),'Gia pháp',`Trục xuất ${nameOf(c)}?`,`Gia chủ muốn đuổi ${esc(nameOf(c))} ra khỏi gia tộc. ${bad?'Người này quả có nhiều điều tiếng.':'Người này chưa làm gì quá đáng, cả nhà sẽ thấy bất công.'}`,[
    {l:'Mở từ đường, tuyên bố trục xuất',f:()=>{c.left='expelled';c.leftT=S.t;if(c.biz){const b=bizOf(c);if(b)b.owner=null}const sp=spouseOf(c);
      log(`${nameOf(c)} bị trục xuất khỏi gia tộc.`,'hi');return bad?'Gia phong được giữ, mọi người tâm phục.'+fx(head(),{on:6,cfame:5}):'Cả nhà bàng hoàng, lòng người ly tán.'+fx(head(),{on:-15,cfame:-8})}},
    {l:'Thôi, cho thêm một cơ hội',f:()=>fx(c,{tam:-8,eq:1})}]);
}
function moveOutPopup(c){
  const sp=spouseOf(c);const purse=Math.max(0,c.purse)+(sp&&inClan(sp)?Math.max(0,sp.purse):0);
  const fam=()=>{const f=[c,sp].concat(kidsOf(c).filter(k=>inClan(k)&&(!k.spouse||k.inLaw))).filter(x=>x&&inClan(x));
    alive().filter(p=>kidsOf(c).includes(p)&&inClan(p)).forEach(k=>{f.push(k);const s2=spouseOf(k);if(s2)f.push(s2)});return [...new Set(f)]};
  const maxH=Math.min(HH(mainHH()).home,HOMES.length-2);
  const shares=[0,mm(3),mm(10)];let share=0;
  const go=(home,payBy,vac)=>{const members=fam();const own=members.reduce((s,p)=>s+Math.max(0,p.purse),0);
    let id;if(vac){id=vac;const h=S.hh[id];h.name=branchName(c);h.founder=c.id;h.since=S.t;h.rent=0;h.keep=0;h.life=HH(c.hh).life;h.money=0}else id=newBranch(c,home,0);
    const h=S.hh[id];
    if(payBy==='clan'&&!vac)S.money-=HOMES[home].cost;
    members.forEach(p=>{h.money+=Math.max(0,p.purse);p.purse=0;p.hh=id});
    if(payBy==='self'&&!vac)h.money-=HOMES[home].cost;
    if(share){S.money-=share;h.money+=share}
    Object.keys(CLANOFF).forEach(k=>{if(S.coff[k]&&members.some(p=>p.id===S.coff[k]))S.coff[k]=null});
    log(`${nameOf(c)} ra ở riêng, lập ${h.name}${vac?` ở ${HOMES[h.home].n.toLowerCase()} để trống`:`, dựng ${HOMES[h.home].n.toLowerCase()}`}${payBy==='self'?' bằng tiền riêng':''}${share?`, được chia ${money(share)}`:''}.`,'gd');
    fx(c,{tam:payBy==='self'?10:6,on:2});closeModal()};
  const draw=()=>{
    const opts=[];
    [0,1,2].filter(i=>i<=maxH).forEach(i=>opts.push(`<button class="btn" data-hm="${i}" ${S.money<HOMES[i].cost+share?'disabled':''}><strong>Gia tộc dựng ${HOMES[i].n.toLowerCase()} · ${HOMES[i].cost?money(HOMES[i].cost):'gần như không tốn'}</strong><small>Ở được ${HOMES[i].cap} người · trả bằng công quỹ</small></button>`));
    [1,2,3].filter(i=>i<=maxH).forEach(i=>opts.push(`<button class="btn" data-self="${i}" ${purse<HOMES[i].cost||S.money<share?'disabled':''}><strong>Tự bỏ tiền riêng dựng ${HOMES[i].n.toLowerCase()} · ${money(HOMES[i].cost)}</strong><small>Vợ chồng đang có ${money(purse)}</small></button>`));
    vacantHomes().forEach(id=>{const h=S.hh[id];const o=P(h.owner);opts.push(`<button class="btn" data-vac="${id}" ${S.money<share?'disabled':''}><strong>Dọn vào ${esc(h.name)} · ${HOMES[h.home].n.toLowerCase()} để trống</strong><small>${o&&o.dead==null?`Nhà của ${esc(o.given)}`:'Nhà của gia tộc'}${h.rent?' · đang cho thuê, sẽ thôi':''}</small></button>`)});
    openModal(`${headerFor(c)}<span class="eyebrow">Phân gia</span><h2>Cho ${esc(c.given)} ra ở riêng</h2>
     <p class="muted">Ra riêng là lập một chi mới: tiền riêng của cả nhà gom thành quỹ hộ, tự lo ăn ở, tự xây nhà, tự chọn mức sống, không cần hỏi gia chủ. Nhà không được to hơn nhà chính. Người đang giữ chức trong tộc sẽ thôi chức.</p>
     <div class="field"><label>Chia gia sản cho chi mới</label><div class="seg">${shares.map((v,i)=>`<button class="btn" data-sh="${i}" aria-pressed="${share===v}">${v?money(v):'Không chia'}</button>`).join('')}</div></div>
     <div class="choices">${opts.join('')}<button class="btn ghost" data-x>Thôi</button></div>`);
    M.querySelectorAll('[data-sh]').forEach(b=>b.onclick=()=>{share=shares[+b.dataset.sh];draw()});
    M.querySelectorAll('[data-hm]').forEach(b=>b.onclick=()=>go(+b.dataset.hm,'clan'));
    M.querySelectorAll('[data-self]').forEach(b=>b.onclick=()=>go(+b.dataset.self,'self'));
    M.querySelectorAll('[data-vac]').forEach(b=>b.onclick=()=>{const h=S.hh[b.dataset.vac];const o=P(h.owner);
      if(o&&o.dead==null&&inClan(o)&&o.id!==c.id&&!isHead(o)&&chance(clamp(0.4+relOf(o,c)/150+(axv(o,'rong')-50)/150,0.1,0.95))===false){addRel(c,o,-6);log(`${nameOf(o)} không đồng ý cho ${nameOf(c)} ở nhà cũ.`,'hi');closeModal();return}
      go(h.home,'vac',b.dataset.vac)});
    M.querySelector('[data-x]').onclick=closeModal};
  draw();
}

/* ================= kinh doanh ================= */
function openBiz(c,type,own){
  const B=BIZ[type];const cost=B.lv[0][1];own=own||'clan';
  const have=own==='clan'?S.money:own.startsWith('p:')?c.purse:(S.hh[own]?S.hh[own].money:0);if(have<cost)return;
  if(own==='clan')S.money-=cost;else if(own.startsWith('p:'))c.purse-=cost;else S.hh[own].money-=cost;
  const b={id:'b'+S.t+R(100,999),type,lv:0,owner:c.id,staff:[],bonus:0,own};S.biz.push(b);
  becomeChu(c,b);
  log(`${nameOf(c)} khai trương ${B.lv[0][0].toLowerCase()}.`,'gd');c.fame+=5;cf(5,'Khai trương cơ sở');render();save();
}
/* v6.5.4: mở rộng lên bậc mới cần người trông đạt mốc thông thạo nghề (bậc 2: 50, bậc 3: 70, bậc 4: 90). Trông cơ sở thì thông thạo lên chậm nên tiền không đổ về quá nhanh. */
const BIZ_M_NEED=[0,50,70,90];
function expandWhy(b){const nx=BIZ[b.type].lv[b.lv+1];if(!nx)return '';const need=BIZ_M_NEED[b.lv+1]||0;const o=P(b.owner);
  const m=o?Math.max(o.m||0,jobM(o,relJob(o,b.type)||o.job)):0;
  return m<need?`Người trông cần thông thạo nghề từ ${need} (hiện ${Math.floor(m)})`:''}
function expandBiz(b){const B=BIZ[b.type];const nx=B.lv[b.lv+1];if(!nx||bizFundGet(b)<nx[1]||expandWhy(b))return;bizFundAdd(b,-nx[1]);b.lv++;cf(5*b.lv,'Mở rộng cơ sở');log(`Mở rộng thành ${nx[0].toLowerCase()}.`,'gd');render();save()}
function raisePopup(it){
  const b=S.biz.find(x=>x.id===it.biz);if(!b){setTimeout(nextPopup,0);return}const st=b.staff.find(s=>s.id===it.sid);if(!st){setTimeout(nextPopup,0);return}
  const ask=Math.round(st.wage*1.3/10)*10;const ow=P(b.owner);const c=ow&&inClan(ow)&&!ow.away?ow:head();
  choicePopup(c,'Kinh doanh',`${st.n} xin tăng lương`,`${esc(st.n)} làm ${esc(ROLES[st.role]?ROLES[st.role].n.toLowerCase():'việc')} ở ${esc(BIZ[b.type].lv[b.lv][0].toLowerCase())}, thông thạo đã đạt ${it.t}. Người này xin tăng lương từ ${money(st.wage)} lên ${money(ask)} mỗi tháng.`,[
    {l:'Đồng ý',f:()=>{st.wage=ask;return 'Nhân viên vui vẻ làm tiếp.'}},
    {l:'Từ chối khéo',r:[{eq:1},50+it.t/3],y:()=>'Người đó chịu ở lại.',n:()=>{b.staff=b.staff.filter(s=>s!==st);return `${esc(st.n)} bỏ đi làm cho đối thủ.`}},
    {l:'Tăng một nửa mức xin',f:()=>{st.wage=Math.round((st.wage+ask)/20)*10;return chance(0.75)?'Tạm chấp nhận.':(b.staff=b.staff.filter(s=>s!==st),`${esc(st.n)} vẫn bỏ đi.`)}}]);
}

/* ================= đi buôn ================= */
function maxTrips(){return 1+S.biz.filter(b=>['tiem','thuyen'].includes(b.type)).reduce((a,b)=>a+b.lv+1,0)}
const dist=(a,b)=>(DIST[a]&&DIST[a][b])||(DIST[b]&&DIST[b][a])||3;
function routesOld(){const h=S.region||'trung';const out=[
  {id:'cho',n:'Chợ huyện lân cận',mo:1,risk:.04,mm:0,cap:15000,sell:{lua:1.05,ngo:1.05,muoi:1.08},buy:{},d:'Gần, an toàn, lãi mỏng.'},
  {id:'phu',n:'Phủ thành trong vùng',mo:2,risk:.07,mm:15,cap:80000,sell:{to:1.12,che:1.12,gom:1.08,duoc:1.08},buy:{},d:'Phố xá đông đúc.'}];
  for(const k in REGIONS){if(k===h)continue;const mo=dist(h,k);const R0=REGIONS[k];const sell={},buy={};
    for(const g in GOODS){const ratio=R0.p[g]/REGIONS[h].p[g];if(ratio>=1.12)sell[g]=+ratio.toFixed(2);if(ratio<=0.88)buy[g]=+ratio.toFixed(2)}
    out.push({id:k,n:R0.n,mo,risk:+(0.06+0.022*mo).toFixed(2),mm:10+mo*6,cap:30000*mo,sell,buy,d:R0.d,war:(k==='bac'||k==='tay')?1:0,reg:k})}
  if(REGIONS[h].sea)out.push({id:'sea',n:'Vượt biển sang ngoại quốc',mo:9,risk:.3,mm:70,cap:600000,sell:{to:1.9,gom:2,che:1.8,duoc:1.4},buy:{huong:.55,sat:.8},d:'Một vốn bốn lời hoặc mất trắng.',sea:1});
  return out}
function routes(){return routes63()}
/* v6.5.4: chênh giá theo mùa và tin tức. Mỗi nửa năm, mỗi tuyến và mặt hàng có một hệ số lệch (xa thì lệch mạnh hơn). Chiến sự, dịch, thiên tai đẩy giá một số mặt hàng lên. */
function tpEns(){S.tp=S.tp||{t:-99,sw:{}};if(S.t-S.tp.t>=6){S.tp.t=S.t;S.tp.sw={}}}
function swOf(r,g){tpEns();const k=r.n+'|'+g;if(S.tp.sw[k]==null){const amp=0.14+0.04*(r.mo||1);let v=1+(Math.random()+Math.random()-1)*amp*1.6;
    if(S.war&&['lua','sat','muoi'].includes(g))v+=0.15;if(S.epi&&g==='duoc')v+=0.25;if(S.disaster&&['lua','ngo'].includes(g))v+=0.15;if(season()==='dong'&&['che','duoc'].includes(g))v+=0.08;
    S.tp.sw[k]=clamp(+v.toFixed(2),0.65,1.8)}return S.tp.sw[k]}
const sellOf=(r,g)=>+((r.sell[g]||1)*swOf(r,g)).toFixed(2);
const tinGia=r=>{const L=Object.keys(GOODS).map(g=>[g,swOf(r,g)]);const hot=L.filter(x=>x[1]>=1.2).sort((a,b)=>b[1]-a[1]).slice(0,3).map(x=>GOODS[x[0]].n.toLowerCase());const cold=L.filter(x=>x[1]<=0.85).sort((a,b)=>a[1]-b[1]).slice(0,2).map(x=>GOODS[x[0]].n.toLowerCase());
  return (hot.length?`Tin giá: đang hời ${hot.join(', ')}.`:'Tin giá: chưa có mặt hàng nào đặc biệt hời.')+(cold.length?` Đang rớt giá: ${cold.join(', ')}.`:'')};
const tradeCapMul=c=>c?clamp(1+(c.job==='chu'?Math.max(c.m,40):c.m)/55,1,3):1;
function tradePopup(){
  if(S.trips.length>=maxTrips())return;
  const traders=alive().filter(p=>age(p)>=16&&!p.away&&(['tieunhi','hangrong'].includes(p.job)||p.job==='chu'&&bizOf(p)&&['tiem','thuyen'].includes(bizOf(p).type)||p.eq>=55));
  const st={who:traders[0]?traders[0].id:'hire',route:w_routeIdx(),src:'buy',good:'lua',pct:50};
  const draw=()=>{
    const c=st.who==='hire'?null:P(st.who);const mmv=c?(c.job==='chu'?Math.max(c.m,40):c.m):35;
    const RT=routes();if(st.route>=RT.length)st.route=0;const r=RT[st.route];const routeOk=mmv>=r.mm&&!r.war;
    const capMax=Math.min(r.cap*tradeCapMul(c),Math.max(0,S.money));const cap=Math.round(capMax*st.pct/100);
    const kq=S.kho[st.good]||0;
    const qty=st.src==='kho'?Math.floor(kq*st.pct/100):Math.floor(cap/priceOf(st.good));
    const sellM=1+(sellOf(r,st.good)-1)*w_damp(st.good)*(r.fr||1);
    openModal(`<span class="eyebrow">Thương mại</span><h2>Đi buôn chuyến</h2>
    <div class="field"><label>Người đi buôn</label><select class="sel" id="tw">${traders.map(p=>`<option value="${p.id}" ${st.who===p.id?'selected':''}>${esc(nameOf(p))} · EQ ${Math.floor(p.eq)} · thông thạo ${Math.floor(p.m)} · danh vọng ${Math.round(p.fame)}</option>`).join('')}<option value="hire" ${st.who==='hire'?'selected':''}>Thuê lái buôn bên ngoài · ăn 20% tiền lãi, tay nghề trung bình</option></select></div>
    <div class="field"><label>Tuyến</label><select class="sel" id="tr">${RT.map((x,i)=>`<option value="${i}" ${st.route===i?'selected':''}>${x.n} · ${x.mo} tháng · rủi ro ${Math.round(x.risk*100)}%${x.mm?` · cần thông thạo ${x.mm}`:''}${x.war?' · đang đóng vì chiến sự':''}</option>`).join('')}</select><p class="note">${r.d} Đắt hơn ở nhà: ${Object.entries(r.sell).map(([g,v])=>`${GOODS[g].n} ×${v}`).join(', ')||'không có gì'}.${Object.keys(r.buy).length?` Rẻ hơn ở nhà, mua mang về: ${Object.entries(r.buy).map(([g,v])=>`${GOODS[g].n} ×${v}`).join(', ')}.`:''}</p></div>
    <div class="field"><label>Hàng mang đi</label><div class="seg"><button class="btn" data-src="buy" aria-pressed="${st.src==='buy'}">Bỏ vốn mua hàng</button><button class="btn" data-src="kho" aria-pressed="${st.src==='kho'}">Lấy hàng trong kho</button></div>
    <select class="sel" id="tg">${Object.entries(GOODS).map(([k,g])=>`<option value="${k}" ${st.good===k?'selected':''}>${g.n} · giá nhà ${money(priceOf(k))}/${g.u}${st.src==='kho'?` · kho có ${fmt(S.kho[k]||0)}`:''} · nơi đến ×${sellOf(r,k).toFixed(2)}</option>`).join('')}</select><p class="note">${tinGia(r)}</p></div>
    <div class="field"><label>Lượng: ${st.pct}%</label><div class="seg">${[25,50,75,100].map(v=>`<button class="btn" data-pct="${v}" aria-pressed="${st.pct===v}">${v}%</button>`).join('')}</div>
    <p class="note">${st.src==='kho'?`Mang ${fmt(qty)} ${GOODS[st.good].u} từ kho gia tộc (gia chủ cho phép).`:`Bỏ vốn ${money(cap)} mua ${fmt(qty)} ${GOODS[st.good].u}. Vốn tối đa của tuyến với người này: ${money(r.cap*tradeCapMul(c))}.`} Ước bán được khoảng ${money(qty*priceOf(st.good)*sellM)}, còn tùy thời vận, mùa màng, dịch bệnh, chiến sự và danh vọng.</p></div>
    <div class="choices"><button class="btn primary" data-go ${routeOk&&qty>0?'':'disabled'}>Lên đường</button><button class="btn ghost" data-x>Thôi</button></div>`);
    const q=s=>M.querySelector(s);
    q('#tw').onchange=e=>{st.who=e.target.value;draw()};q('#tr').onchange=e=>{st.route=+e.target.value;draw()};q('#tg').onchange=e=>{st.good=e.target.value;draw()};
    M.querySelectorAll('[data-src]').forEach(b=>b.onclick=()=>{st.src=b.dataset.src;draw()});M.querySelectorAll('[data-pct]').forEach(b=>b.onclick=()=>{st.pct=+b.dataset.pct;draw()});
    q('[data-x]').onclick=closeModal;
    q('[data-go]').onclick=()=>{if(st.src==='kho')S.kho[st.good]-=qty;else S.money-=qty*priceOf(st.good);
      const tr={until:S.t+r.mo,route:st.route,r:JSON.parse(JSON.stringify(r)),sv:sellOf(r,st.good),good:st.good,qty,cost:st.src==='kho'?qty*priceOf(st.good):qty*priceOf(st.good),cid:c?c.id:null,hired:!c,skill:c?null:R(35,65)};
      S.trips.push(tr);if(c)c.away={type:'trade',until:tr.until};
      log(`${c?nameOf(c):'Lái buôn thuê'} mang ${fmt(qty)} ${GOODS[st.good].u} ${GOODS[st.good].n.toLowerCase()} đi ${r.n.toLowerCase()}.`);closeModal()};
  };
  draw();
}
function tradeReturn(c0,tr){
  const r=tr.r||routes()[tr.route]||routes()[0];const c=tr.cid?P(tr.cid):null;const who=c||head();
  const sk=c?((c.eq+c.tri*0.5)/150+c.m/200+tsum(c,'trade')):tr.skill/120;
  const fameB=Math.min(0.15,((c?c.fame:0)+S.fame*0.1)/2000);
  let risk=r.risk*(c?(1.2-c.vo/200-Math.min(0.2,c.m/600)):1.1)*(S.war?1.4:1)*(season()==='dong'&&(r.sea||r.war)?1.3:1)*(S.epi?1.2:1);
  const spoil=w_spoil(tr.good,r.mo);const val=tr.qty*(tr.pv||priceOf(tr.good))*(1+((tr.sv||r.sell[tr.good]||1)-1)*w_damp(tr.good)*(r.fr||1))*(1-spoil)*(rule('trongthuong')?1.08:1)*(rule('trongnong')?0.95:1)*(0.75+Math.random()*0.25+sk*0.15+fameB)*(S.epi&&tr.good==='duoc'?1.4:1)*(S.war&&['lua','sat','muoi'].includes(tr.good)?1.15:1);
  const toll=Math.round(tr.cost*(0.01+0.02*r.mo+0.04*(r.cross||0))*tollOff());
  const fee=tr.hired?Math.max(0,(val-toll-tr.cost)*0.2):0;
  const got=Math.max(0,Math.round(val-fee-toll));
  const buyable=Object.entries(r.buy);
  /* v6.4.1.7: Thiên hạ đệ nhất tiêu trong họ thì chuyến buôn hiếm khi gặp nạn, Thương Thánh thì bớt một phần */
  if(chance(risk*(thanHas('detieu')?0.2:1)*(thanHas('thuongthanh')?0.8:1))){
    return choicePopup(who,'Đi buôn chuyến','Gặp nạn trên đường về',`Đoàn hàng ${esc(r.n.toLowerCase())} gặp ${pick(['cướp núi','bão lớn','quan ải sách nhiễu','dịch bệnh trong đoàn','hải tặc'])}.`,[
      {l:'Liều giữ hàng',r:[{vo:1,eq:0.5},60],y:x=>`Giữ được hàng, thu ${money(got)}.`+fx(x,{money:got,m:2,fame:5}),n:x=>'Mất trắng, người bị thương.'+fx(x,{suc:-R(15,30),hpMax:-R(0,3),tam:-15}),nn:x=>'Mất trắng, suýt mất mạng.'+fx(x,{suc:-R(30,45),hpMax:-R(3,6),tam:-20})},
      {l:'Bỏ bớt hàng giữ mạng',f:x=>`Cứu được một phần, thu ${money(got*0.4)}.`+fx(x,{money:Math.round(got*0.4),tam:-6})}]);
  }
  const opts=[
    {l:`Bán hết, mang tiền về (${money(got)})`,f:x=>`Lãi ${money(got-tr.cost)}.`+fx(x,{money:got,m:R(1,3),tam:got>tr.cost?6:-6,fame:got>tr.cost*1.5?3:0})},
    {l:'Găm hàng chờ giá lên',r:[{eq:1,tri:1},60],y:x=>`Giá lên đúng lúc, thu ${money(got*1.15)}.`+fx(x,{money:Math.round(got*1.15),m:2,tam:8}),n:x=>`Giá rớt, chỉ thu ${money(got*0.8)}.`+fx(x,{money:Math.round(got*0.8),tam:-6})}];
  buyable.forEach(([g,m00])=>{const m0=+(1-(1-m00)*(r.fr||1)*w_damp(g)).toFixed(2);opts.push({l:`Bán xong, mua ${GOODS[g].n.toLowerCase()} giá rẻ (×${m0}) mang về kho`,s:'Hàng về kho, có thể bán ở nhà hoặc chở đi nơi khác',f:x=>{const q=Math.floor(got*0.7/(priceOf(g)*m0));S.kho[g]=(S.kho[g]||0)+q;return `Mang về ${fmt(q)} ${GOODS[g].u} ${GOODS[g].n.toLowerCase()}, cộng ${money(got*0.3)} tiền mặt.`+fx(x,{money:Math.round(got*0.3),m:2})}})});
  opts.push({l:'Biếu quan sở tại để kết giao',f:x=>`Thu ${money(got*0.85)}, quen thêm người có thế lực.`+fx(x,{money:Math.round(got*0.85),fame:8,eq:2,hung:2})});
  choicePopup(who,'Đi buôn chuyến','Hàng về đến nơi',`${c?esc(c.given):'Lái buôn thuê'} đưa ${fmt(tr.qty)} ${GOODS[tr.good].u} ${GOODS[tr.good].n.toLowerCase()} tới ${esc(r.n.toLowerCase())}. Bán được khoảng ${money(got)} (vốn ${money(tr.cost)}, đã trừ lộ phí và thuế ải ${money(toll)}${spoil>0.015?`, hàng hao hụt ${Math.round(spoil*100)}%`:''}${fee?`, tiền công lái buôn ${money(fee)}`:''}).`,opts);
}
function sellKho(g,pct){const q=Math.floor((S.kho[g]||0)*pct);if(!q)return;const drop=Math.min(0.6,q*GOODS[g].p/200000);const v=Math.round(q*priceOf(g)*0.95*(1-drop/2));S.kho[g]-=q;S.money+=v;S.mk[g]=Math.max(0.45,mk(g)-drop);log(`Bán ${fmt(q)} ${GOODS[g].u} ${GOODS[g].n.toLowerCase()} ở chợ nhà, thu ${money(v)}.`);render();save()}

/* ================= v5: tính cách, quan hệ, ý muốn riêng, chọn nghề, phỏng vấn ================= */
const subOf=(c,k)=>(c.sub&&c.sub[k]!=null)?c.sub[k]+(k==='ht'&&rule('hieudao')?15:0)+(k==='ht'&&rule('tuquyet')?-10:0):50;
function kin(a,b){
  if(a.spouse===b.id)return 'vc';
  if(a.parents.includes(b.id))return 'con';if(b.parents.includes(a.id))return 'cha';
  if(a.parents.length&&a.parents.some(x=>b.parents.includes(x)))return 'ae';
  const gp=S.people.filter(p=>a.parents.includes(p.id)).some(p=>p.parents.includes(b.id));if(gp)return 'chau';
  const gc=S.people.filter(p=>b.parents.includes(p.id)).some(p=>p.parents.includes(a.id));if(gc)return 'ong';
  return 'ho';
}
const KIN_N={vc:'vợ chồng',con:'cha mẹ',cha:'con',ae:'anh chị em',chau:'ông bà',ong:'cháu',ho:'người nhà'};
const baseRel=(a,b)=>({vc:30,con:35,cha:35,ae:20,chau:30,ong:30,ho:5})[kin(a,b)];
const relOf=(a,b)=>{ensurePersona(a);return a.rel[b.id]!=null?a.rel[b.id]:baseRel(a,b)};
function addRel(a,b,v){ensurePersona(a);ensurePersona(b);a.rel[b.id]=clamp(relOf(a,b)+v,-100,100);b.rel[a.id]=clamp(relOf(b,a)+v*0.8,-100,100)}
const relWord=v=>v>=75?'Thân thiết':v>=40?'Hòa thuận':v>=10?'Bình thường':v>=-30?'Lạnh nhạt':'Bất hòa';
function siblingRank(c){if(!c.parents.length)return 0;return S.people.filter(p=>p.id!==c.id&&!p.inLaw&&p.g===c.g&&p.parents.some(x=>c.parents.includes(x))&&p.born<c.born).length}
function relMood(c){if(!c.rel)return 0;const fam=home().filter(p=>p.id!==c.id&&p.hh===c.hh&&age(p)>=6);if(!fam.length)return 0;
  let s=0,w=0;fam.forEach(p=>{const k=kin(c,p);const ww=k==='vc'?2.5:k==='ho'?0.5:1;s+=relOf(c,p)*ww;w+=ww});return clamp(s/w/12,-6,6)}
function compat(a,b){
  const A=k=>axv(a,k),B=k=>axv(b,k);
  let v=8+(S?(S.on-50)/12:0)+(A('hd')+B('hd')-100)/5-Math.abs(A('tv')-B('tv'))/14+(a.tam+b.tam-100)/12+(A('rong')+B('rong')-100)/9+(A('diem')+B('diem')-100)/9;
  if(A('tv')>=75&&B('tv')>=75)v-=6;
  if(A('thanh')<=25||B('thanh')<=25)v-=3;
  if(A('diem')<=25&&B('diem')<=25)v-=6;
  if(Math.abs(A('ht')-B('ht'))>45&&['con','cha'].includes(kin(a,b)))v-=4;
  if(rule('doanket'))v+=7;if(rule('hoathuan'))v+=3;
  return v;
}
const ACTS={
  vc:{p:['cùng nhau ra chợ phiên','thủ thỉ chuyện nhà đến khuya','cùng chăm mảnh vườn sau nhà','cùng nhau đi lễ chùa'],n:['cãi nhau vì chuyện tiền nong','giận nhau mấy ngày không nói','to tiếng vì chuyện con cái','lục đục vì chuyện bên nội bên ngoại']},
  cha:{p:['được cha mẹ dạy bảo','kể chuyện ngày xưa cho nhau nghe','cùng làm việc nhà','được cha mẹ khen'],n:['bị cha mẹ mắng vì lười','cãi lại cha mẹ','bất đồng chuyện tương lai','giận dỗi bỏ cơm']},
  ae:{p:['rủ nhau đi câu cá','giúp nhau việc nặng','cùng bày trò nghịch','tâm sự chuyện riêng'],n:['tranh phần với nhau','ganh tị nhau','đánh nhau một trận','nói xấu nhau với người ngoài']},
  ong:{p:['nghe ông bà kể chuyện cổ tích','được ông bà dúi quà','đấm lưng cho ông bà'],n:['làm ông bà phật ý','bị ông bà trách']},
  ho:{p:['chuyện trò hợp ý','giúp nhau một việc','cùng uống chén trà'],n:['nói xấu sau lưng nhau','va chạm chuyện nhỏ','xích mích vì việc bếp núc']}};
function interactTick(){
  const fam=home().filter(p=>age(p)>=6);if(fam.length<2)return;
  const n=Math.min(4,1+Math.floor(fam.length/5));
  for(let i=0;i<n;i++){if(!chance(0.55))continue;
    const a=pick(fam);const cand=fam.filter(p=>p.id!==a.id&&(p.hh===a.hh||kin(a,p)!=='ho'));if(!cand.length)continue;const b=pick(cand);
    ensurePersona(a);ensurePersona(b);
    let k=kin(a,b);if(k==='con')k='cha';if(k==='chau')k='ong';
    const d=Math.round(compat(a,b)/5+R(-4,4));
    addRel(a,b,d);
    if(d>=3&&k==='cha'){const par=a.parents.includes(b.id)?b:a;const kid=par===a?b:a;if(age(kid)<18){const best=STATS.filter(([x])=>x!=='suc').sort((x,y)=>par[y[0]]-par[x[0]])[0][0];addStat(kid,best,0.4)}}
    if(Math.abs(d)>=4||chance(0.15)){const t=pick(ACTS[k][d>=0?'p':'n']);log(`${nameOf(a)} và ${nameOf(b)} ${t}.`,d<0?'hi':'')}
    const r=relOf(a,b);
    if(r<=-50&&!(a.flags.cfT>S.t)&&head()&&!isHead(a)&&!isHead(b)){a.flags.cfT=S.t+24;enqueue('conflict',S.head,{a:a.id,b:b.id})}
  }
}
/* ý muốn riêng */
function wishOf(c){
  ensurePersona(c);
  if(c.wish!==undefined&&c.wishT>S.t-12)return c.wish;
  c.wishT=S.t;
  if(subOf(c,'cc')<25&&chance(0.6)||has(c,'luoi')&&chance(0.4)){c.wish='none';return c.wish}
  const pj=S.people.filter(p=>c.parents.includes(p.id)).map(p=>p.job);
  const bias={tieunhi:subOf(c,'tv')/4+subOf(c,'hd')/6,hangrong:subOf(c,'hd')/5,su:subOf(c,'tv')/6,y:subOf(c,'cc')/6,nghe:(subOf(c,'tiet')<40||subOf(c,'hd')>65)?12:0,
    tieu:subOf(c,'dl')/5+subOf(c,'gan')/6,tieuphu:subOf(c,'dl')/5,ngu:subOf(c,'dl')/6,nong:subOf(c,'cc')/4,tho:subOf(c,'cc')/5,khuanvac:0,chan:subOf(c,'cc')/6,hau:subOf(c,'ht')/5};
  c.wish=wishPick(c);return c.wish;
}
function thoughts(c){
  ensurePersona(c);const out=[];const a=age(c);if(c.dead!=null||!inClan(c))return out;
  const w=a>=16?wishOf(c):null;
  if(a>=16&&w==='none'&&c.job==='none')out.push('Chưa muốn đi làm, chỉ thích ở nhà.');
  else if(a>=16&&w&&w!=='none'&&c.job!==w&&!['quan','vua','chu','quan_ngu','huu'].includes(c.job))out.push(`Muốn được làm ${JOBS[w].n.toLowerCase()}.`);
  if(a>=16&&c.job!=='chu'&&Object.keys(BIZ).some(t=>canOwn(c,t))&&subOf(c,'tv')>=50)out.push('Muốn tự ra làm chủ.');
  if(a>=19&&!married(c)&&a<35)out.push(subOf(c,'hd')>=50?'Mong sớm lập gia thất.':'Chưa nghĩ tới chuyện vợ chồng.');
  if(married(c)&&a<45){const w=kidWish(c);out.push(w>=70?(kidsOf(c).length?'Muốn có thêm con.':'Mong có con lắm.'):w>=55?'Cũng muốn có con.':kidsOf(c).length>=3?'Đông con rồi, không muốn sinh thêm.':'Chưa muốn có con lúc này.')}
  if(a>=18&&!clanKeeps(c)&&inMain(c)&&c.purse<mm(1))out.push((c.anbam||0)>4?'Ngại ngửa tay xin gia tộc mãi.':'Túi riêng sắp cạn.');
  if(c.job==='noi'&&(c.tri>=70||axv(c,'tv')>=65))out.push('Không cam lòng chỉ quanh quẩn bếp núc.');
  if(c.brk){const p=BRK100[c.brk.k].find(x=>x.id===c.brk.id);if(p)out.push(`Đang dốc sức: ${p.l.toLowerCase()}.`)}
  if(c.focusUntil&&c.focusUntil>S.t){const p=prefFocus(c);if(p!==c.focus)out.push(`Thật lòng muốn ${FOCUS[p].n.toLowerCase()} hơn.`)}
  if(a>=16&&c.tri>=55&&subOf(c,'tv')>=55&&!c.exam&&c.degree<3&&!(c.flags.noExam>S.t)&&c.job!=='quan')out.push('Ấp ủ chuyện thi cử đỗ đạt.');
  if(c.away&&c.away.type==='army')out.push('Nhớ nhà.');
  if(S.money<0)out.push('Lo vì nhà nợ nần.');
  if(c.tam<30)out.push('Chán nản, buồn bực.');
  const fam=alive().filter(p=>p.id!==c.id&&c.rel&&c.rel[p.id]!=null);
  const love=fam.filter(p=>relOf(c,p)>=75).sort((x,y)=>relOf(c,y)-relOf(c,x))[0];if(love)out.push(`Rất quý ${esc(love.given)}.`);
  const hate=fam.filter(p=>relOf(c,p)<=-30).sort((x,y)=>relOf(c,x)-relOf(c,y))[0];if(hate)out.push(`Không ưa ${esc(hate.given)}.`);
  const h=head();if(h&&h.id!==c.id&&relOf(c,h)<0)out.push('Bất mãn với gia chủ.');
  c.habits.filter(isVice).forEach(k=>{const L=vlv(c,k);if(L>=25)out.push({bac:L>=60?'Đầu óc chỉ nghĩ tới chiếu bạc, thua thì muốn gỡ.':'Thèm vài ván bạc.',ruou:L>=60?'Không có rượu thì bứt rứt.':'Thèm chén rượu.',thanlau:'',thanhlau:'Lòng để ở chốn lầu hồng.',xahoa:'Muốn sắm thứ gì đó cho người ta trầm trồ.',trom:'Thấy của người khác là ngứa tay.',donhau:'Ai nói gì trái tai là muốn đánh.'}[k]||'')});
  if(!out.length)out.push(sayOf(c));
  return out;
}
function wishTick(){
  if(S.queue.some(q=>q.kind==='ask'))return;
  const cands=home().filter(c=>age(c)>=16&&inClan(c)&&!isHead(c)&&isCtrl(c));
  for(const c of cands){ensurePersona(c);const dl0=subOf(c,'dl');const bump=(married(c)&&!c.inLaw&&c.hh===mainHH())?(dl0>=80?3:dl0>=70?1.6:dl0<=40?0.5:1):1; /* v6.7.0: tự lập cao thì hay muốn ra riêng */if(!chance(0.012*bump))continue;const a=age(c);const F=c.flags;
    const T=[];
    if(c.job!=='chu'&&!['quan','vua','quan_ngu'].includes(c.job)&&(subOf(c,'tv')>=55||subOf(c,'dl')>=65)&&Object.keys(BIZ).some(t=>canOwn(c,t)&&bizFree(t)))T.push('biz');
    if(!married(c)&&a>=19&&a<=32&&subOf(c,'hd')>=40)T.push('marry');
    if(a<=30&&c.tri>=75&&subOf(c,'tv')>=60&&!c.exam&&c.degree<3&&!(c.flags.noExam>S.t)&&c.job!=='quan'&&alive().filter(p=>p.exam&&inClan(p)).length<4)T.push('exam'); /* v6.6.0: chặt hơn: trí từ 75, tham vọng từ 60, tuổi tới 30, không quá bốn người cùng thi */
    if(c.g==='nam'&&a>=16&&a<=30&&c.vo>=60&&subOf(c,'tv')>=50&&!c.vexam&&!c.exam&&!['quan','quan_ngu','vua'].includes(c.job)&&!(c.flags.noVoExam>S.t)&&alive().filter(p=>p.vexam&&inClan(p)).length<3)T.push('vexam'); /* v6.6.0: có người muốn thi võ cử */
    const w=wishOf(c);if(w&&w!=='none'&&w!==c.job&&meets(c,w)&&subOf(c,'dl')>=50&&c.tam<50&&a<45&&!['quan','vua','chu','quan_ngu','huu'].includes(c.job)&&(c.job!=='noi'||c.tri>=70||axv(c,'tv')>=65))T.push('job');
    if(married(c)&&!c.inLaw&&((c.gen||1)>=2||subOf(c,'dl')>=80)&&a>=24&&subOf(c,'dl')>=62&&c.hh===mainHH())T.push('moveout');
    if(c.g==='nam'&&a<=30&&c.vo>=55&&subOf(c,'tv')>=55&&(S.war||S.recruit>S.t)&&['none','nong','khuanvac','tieuphu','hangrong'].includes(c.job))T.push('army');
    const t=T.filter(x=>!(F['ask_'+x]>S.t));if(!t.length)continue;
    const k=pick(t);F['ask_'+k]=S.t+30;enqueue('ask',c.id,{t:k});return;
  }
}
/* v6.3: tâm tư xếp hàng lâu có thể đã hết hợp thời (đã cưới, đã nhập ngũ...) */
function askStale(c,t){
  if(t==='marry')return married(c)||!!(c.spouse&&P(c.spouse)&&P(c.spouse).dead==null);
  if(t==='biz')return c.job==='chu'||['quan','vua','quan_ngu'].includes(c.job)||!Object.keys(BIZ).some(x=>canOwn(c,x));
  if(t==='exam')return !!c.exam||c.degree>=3||c.job==='quan';
  if(t==='vexam')return !!c.vexam||['quan','quan_ngu','vua'].includes(c.job);
  if(t==='job')return !c.wish||c.wish===c.job||['quan','vua','chu','quan_ngu','huu'].includes(c.job);
  if(t==='moveout')return !married(c)||c.hh!==mainHH();
  if(t==='army')return c.job==='quan_ngu'||!!c.away;
  return false}
const bizFree=t=>S.biz.filter(b=>b.type===t).length<1+Math.floor(alive().filter(p=>inClan(p)).length/25); /* v6.6.0: mỗi loại cơ sở có mức bão hòa theo quy mô nhà */
function askPopup(c,t){
  if(askStale(c,t)){setTimeout(nextPopup,0);return}
  const h=head();const ht=subOf(c,'ht'),dl=subOf(c,'dl');
  const B=t==='biz'?Object.keys(BIZ).filter(x=>canOwn(c,x)&&bizFree(x)).sort((x,y)=>BIZ[x].lv[0][1]-BIZ[y].lv[0][1])[0]:null;
  if(t==='biz'&&!B){setTimeout(nextPopup,0);return}
  const L0=B?BIZ[B].lv[0]:null;
  const T={biz:[`Muốn tự ra làm chủ`,`"Con làm thuê cho người ta đã lâu, nay muốn tự mở ${L0?L0[0].toLowerCase():''}. Xin gia chủ cho phép và giúp vốn ${L0?money(L0[1]):''}."`],
    marry:['Muốn lập gia thất',`"Con cũng đến tuổi rồi, xin gia chủ tìm cho con một mối."`],
    exam:['Muốn đi thi',`"Con muốn ghi danh khoa cử, thử sức một phen."`],
    vexam:['Muốn thi võ cử',`"Con luyện võ đã lâu, xin cho con ghi danh thi võ cử."`],
    job:['Muốn đổi nghề',`"Nghề này không hợp với con. Con muốn đi làm ${JOBS[c.wish]?JOBS[c.wish].n.toLowerCase():''}."`],
    moveout:['Muốn ra ở riêng',`"Vợ chồng con muốn dựng nhà riêng, tự lo liệu."`],
    army:['Muốn tòng quân',`"Đất nước có biến, con muốn ra trận lập công."`]}[t];
  const ob=obey(c);
  const refuse=()=>{
    if(ob>=60||(ht>=60&&ob>=45))return 'Vâng lời, không nhắc lại nữa.'+fx(c,{tam:-4});
    let r='';if(h)addRel(c,h,-15);
    if((dl>=72&&ht<40&&chance(0.4))||(ob<25&&chance(0.5))){
      if(t==='biz'&&L0&&S.money>=L0[1]*0.5){S.money-=Math.round(L0[1]*0.5);const id=newBranch(c,1,Math.max(0,c.purse));c.purse=0;c.hh=id;const sp=spouseOf(c);if(sp&&inClan(sp))sp.hh=id;kidsOf(c).filter(k=>inClan(k)&&age(k)<16).forEach(k=>k.hh=id);
        const bz={id:'b'+S.t+R(100,999),type:B,lv:0,staff:[],owner:c.id,own:id};S.biz.push(bz);becomeChu(c,bz);log(`${nameOf(c)} không nghe lời, tự ra riêng mở ${L0[0].toLowerCase()}, vay họ hàng nửa vốn.`,'hi');return 'Không nghe lời, tự ra riêng làm chủ!'+fx(c,{tam:5})}
      if(t==='marry'){mkSpouse(c,true);return 'Không đợi gia chủ, tự tìm được người rồi dắt về ra mắt.'+fx(c,{tam:8,fame:-3})}
      if(t==='exam'){register(c);return 'Vẫn lén ghi danh đi thi.'+fx(c,{tam:2})}
      if(t==='vexam'){registerVo(c);return 'Vẫn lén ghi danh thi võ cử.'+fx(c,{tam:2})}
      if(t==='army'){enlist(c,false);return 'Bỏ nhà đi tòng quân.'}
    }
    return 'Buồn bực, giận gia chủ.'+fx(c,{tam:-10});
  };
  const ok={biz:{l:`Đồng ý, gia tộc bỏ vốn (${L0?money(L0[1]):''})`,c:()=>L0&&S.money>=L0[1],f:c=>{openBiz(c,B);if(h)addRel(c,h,10);return 'Mừng rỡ cảm tạ.'+fx(c,{tam:12})}},
    marry:{l:'Mời bà mối',f:c=>{setTimeout(()=>matchmaker(c),0);if(h)addRel(c,h,5);return 'Gia chủ nhận lời lo liệu.'}},
    exam:{l:'Cho đi thi',f:c=>{register(c);if(h)addRel(c,h,8);return 'Hăm hở sửa soạn bút nghiên.'+fx(c,{tam:8})}},
    vexam:{l:'Cho ghi danh',f:c=>{registerVo(c);if(h)addRel(c,h,8);return 'Hăm hở mài gươm luyện cung.'+fx(c,{tam:8})}},
    job:{l:'Cho đổi nghề',f:c=>{setTimeout(()=>interviewPopup(c,c.wish,1),0);if(h)addRel(c,h,6);return 'Đi xin việc mới.'}},
    moveout:{l:'Cho ra ở riêng',f:c=>{setTimeout(()=>moveOutPopup(c),0);return 'Gia chủ gật đầu.'}},
    army:{l:'Cho đi',f:c=>{enlist(c,false);return 'Khoác áo lính lên đường.'+fx(c,{tam:4})}}}[t];
  choicePopup(c,'Tâm tư',T[0],T[1],[ok,{l:'Không cho',s:`${obeyWord(ob)}. `+(ob>=60?'Chắc sẽ nghe lời':ob<25||dl>=72?'Có thể tự ý làm':'Sẽ buồn bực'),f:c=>refuse()}]);
}
function conflictPopup(it){
  const a=P(it.a),b=P(it.b),h=head();if(!a||!b||!inClan(a)||!inClan(b)||!h)return setTimeout(nextPopup,0);
  const k=KIN_N[kin(a,b)];
  choicePopup(h,'Gia sự',`${a.given} và ${b.given} bất hòa`,`${esc(nameOf(a))} (${persWord(a)}) và ${esc(nameOf(b))} (${persWord(b)}), là ${k}, mâu thuẫn ngày càng sâu. Người trong nhà xì xào.`,[
    {l:'Gọi cả hai ra hòa giải',r:[{eq:0.7,khau:0.6},45],y:x=>{addRel(a,b,35);S.on=clamp(S.on+3,0,100);return 'Hai người bắt tay làm hòa.'},n:x=>{addRel(a,b,-5);return 'Hòa giải không thành, còn giận thêm.'}},
    {l:'Phân xử nghiêm, bắt nhận lỗi',f:x=>{const lo=subOf(a,'ht')<subOf(b,'ht')?a:b;addRel(a,b,15);addStat(lo,'tam',-10);S.on=clamp(S.on+4,0,100);return `${esc(lo.given)} bị bắt nhận lỗi, ấm ức nhưng phải nghe.`}},
    {l:'Mặc kệ',f:x=>{addRel(a,b,-5);S.on=clamp(S.on-3,0,100);return 'Chuyện trong nhà cứ âm ỉ.'}}]);
}
/* chọn nghề: 3 lựa chọn */
const EMPLOYER={tieunhi:'chưởng quỹ tửu lâu',hangrong:'bà trùm chợ phiên',su:'thầy đồ trường làng',y:'lang y hiệu thuốc',nghe:'ông bầu gánh hát',tieu:'tiêu đầu tiêu cục',tho:'ông thợ cả trong phường',khuanvac:'cai phu bến sông',tieuphu:'thợ săn đầu nguồn',hau:'quản gia nhà viên ngoại',ngu:'chủ thuyền chài',chan:'chủ trại chăn nuôi'};
function jobChoice(c,first){
  const w=wishOf(c);const un=w==='none';const girlHome=c.g==='nữ'&&married(c);
  const opts=[];
  if(!un&&w&&meets(c,w)&&w!==c.job){const fit=jobFit(c,w);opts.push({l:`Theo ý ${c.given}: ${JOBS[w].lv[0].n.toLowerCase()}`,s:fit?'Tự muốn nên dễ đỗ phỏng vấn hơn':passion(c,w)?'Nghề thấp so với thể diện nhà, nhưng đây là đam mê':'Nghề thấp so với thể diện nhà, người ta sẽ chê',go:()=>{if(!fit)cf(-1,'Con cháu làm nghề thấp kém');interviewPopup(c,w,1)}})}
  opts.push({l:'Gia chủ quyết định',s:'Chọn một trong ba con đường: văn, võ, thương',go:()=>pathPopup(c)});
  /* v6.3.4: người đang có việc mà bấm đổi nghề thì phải có đường lui "thôi không đổi nữa" */
  const working=!first&&c.job&&!['none','huu'].includes(c.job)&&JOBS[c.job];
  if(working){
    if(girlHome&&c.job!=='noi')opts.push({l:'Ở nhà lo việc nội trợ',f:x=>{setJob(c,'noi');return 'Ở nhà quán xuyến việc nhà.'}});
    opts.push({l:'Thôi, không muốn đổi nghề nữa',s:`Ở lại làm ${JOBS[c.job].lv[Math.min(c.lv,JOBS[c.job].lv.length-1)].n.toLowerCase()}`,go:()=>closeModal()});
  }else opts.push({l:girlHome?'Ở nhà lo việc nội trợ':un?'Chiều ý, cho ở nhà':'Chưa muốn đi làm',f:x=>{if(girlHome){setJob(c,'noi');return 'Ở nhà quán xuyến việc nhà.'}return 'Ở nhà thêm một thời gian.'+fx(c,{tam:3})}});
  choicePopup(c,first?'Tròn mười tám':'Nghề nghiệp',working?'Đổi nghề?':'Chọn nghề kiếm sống',working?`${esc(c.given)} đang làm ${JOBS[c.job].lv[Math.min(c.lv,JOBS[c.job].lv.length-1)].n.toLowerCase()}. ${w&&w!=='none'&&JOBS[w]?`Trong lòng muốn làm ${JOBS[w].n.toLowerCase()}.`:'Có muốn đổi sang việc khác không?'} Đổi nghề thì phải xin việc lại từ đầu, năng lực cũ chỉ giúp được phần nào.`:un?`${esc(c.given)} chưa muốn đi làm. Nếu gia chủ ép thì khó qua phỏng vấn.`:`${esc(c.given)} muốn làm ${JOBS[w]?JOBS[w].n.toLowerCase():'gì đó'}.`,opts);
  // không ghi nhật ký cho bước trung gian
}
function pathJob(c,p){let L=PATHS[p].jobs.filter(id=>meets(c,id)&&id!==c.job);const F=L.filter(id=>jobFit(c,id));if(F.length)L=F;if(!L.length)return null;
  return L.map(id=>[id,c[JOBS[id].st]+(c.pre[id]||0)*0.4+R(0,12)]).sort((a,b)=>b[1]-a[1])[0][0]}
function pathPopup(c){
  const opts=Object.keys(PATHS).map(p=>{const id=pathJob(c,p);return id?{l:`${PATHS[p].n}: ${JOBS[id].lv[0].n}`,s:`${PATHS[p].d} · ${SN[JOBS[id].st]} ${Math.floor(c[JOBS[id].st])}`,go:()=>{const w=wishOf(c);let mot=w===id?1:w==='none'?-2:-1;
    if(mot<0&&subOf(c,'ht')<40){const h=head();if(h&&h.id!==c.id)addRel(c,h,-8);addStat(c,'tam',-6)}
    interviewPopup(c,id,mot)}}:null}).filter(Boolean);
  opts.push({l:c.job&&!['none','huu'].includes(c.job)?'Thôi, không đổi nghề nữa':'Thôi, để sau',go:()=>closeModal()});
  choicePopup(c,'Gia chủ định nghề','Văn, võ hay thương?',`Gia chủ chọn đường cho ${esc(c.given)}.`,opts);
}
function interviewPopup(c,id,mot){
  const J=JOBS[id];
  if(id==='nong'||id==='noi'){setJob(c,id);log(`${nameOf(c)} bắt đầu làm ${J.lv[0].n.toLowerCase()}.`);return infoPopup(c,'Nghề nghiệp',`Làm ${J.n.toLowerCase()}`,`${esc(c.given)} bắt đầu làm ${J.lv[0].n.toLowerCase()} ở nhà.`)}
  const st=J.st;let diff=48+(J.req?6:0)-(mot>0?8:0)+(mot===-2?15:mot<0?4:0)-(mot>0&&rule('tuquyet')?6:0)-Math.min(15,(c.pre[id]||0)*0.3);
  const pt=protect();if(['thulai','nhadich'].includes(id)&&pt>=1)diff-=Math.min(20,pt*5);
  const ap=[{l:'Thật thà kể mình làm được gì',sp:{[st]:0.6,eq:0.4}},{l:'Khéo ăn nói, lấy lòng',sp:{eq:0.4,khau:0.6,mi:0.2}},{l:'Xin làm thử cho xem tay nghề',sp:{[st]:1}}];
  const boss=EMPLOYER[id]||'người tuyển';
  choicePopup(c,'Phỏng vấn',`Xin làm ${J.lv[0].n.toLowerCase()}`,`${esc(c.given)} đến gặp ${boss}. ${startLv(c,id)>0?`Năng lực và kinh nghiệm sẵn có đủ để vào thẳng bậc ${esc(J.lv[startLv(c,id)].n.toLowerCase())}.`:'Qua thì được nhận, gây ấn tượng tốt có thể vào bậc cao hơn.'} Trượt thì năm sau thử lại.`,
    ap.map(o=>({l:o.l,r:[o.sp,diff],y:x=>hired(c,id,chance(0.2)?2:chance(0.45)?1:0),yy:x=>hired(c,id,2),n:x=>{c.flags.jobRetry=S.t+12;log(`${nameOf(c)} trượt phỏng vấn làm ${J.lv[0].n.toLowerCase()}.`,'hi');return 'Bị từ chối. Năm sau thử lại.'+fx(c,{tam:-6})}})).concat([{l:c.job&&!['none','huu'].includes(c.job)?'Thôi, không đổi nghề nữa':'Thôi, không xin nữa',go:()=>closeModal()}]));
}
function hired(c,id,up){
  const J=JOBS[id];const base=startLv(c,id);setJob(c,id);const lv=Math.min(J.lv.length-1,base+(up>0?1:0));
  if(lv>0){c.lv=lv;const q=J.lv[lv].req||{};if(q.m)c.m=Math.max(c.m,Math.round(q.m*0.85))}
  if(lv>0)achieve(c,`được nhận thẳng làm ${J.lv[lv].n.toLowerCase()}`);
  log(`${nameOf(c)} được nhận làm ${J.lv[c.lv].n.toLowerCase()}.`,'gd');
  if(base>0)return `Nhờ năng lực sẵn có, được nhận làm ${J.lv[c.lv].n.toLowerCase()} với tiền công cao hơn.`+fx(c,{tam:12});
  return lv>0?`Gây ấn tượng mạnh, được nhận thẳng làm ${J.lv[c.lv].n.toLowerCase()}!`+fx(c,{tam:12}):`Được nhận làm ${J.lv[0].n.toLowerCase()}.`+fx(c,{tam:8});
}
function personaTick(){alive().forEach(ensurePersona);interactTick();wishTick()}

const SAY={siengnang:'Còn sức thì còn làm.',luoi:'Việc hôm nay cứ để mai tính.',tamvong:'Phải làm nên chuyện lớn.',anphan:'Có bát cơm no là đủ.',hieuthao:'Cha mẹ còn thì chưa đi xa.',ngonghich:'Việc của con, con tự quyết.',
  hoadong:'Nhà phải đông vui mới là nhà.',codoc:'Để ta yên một mình.',tulap:'Không cần ai giúp.',duadam:'Có người nhà lo rồi.',ganda:'Sợ gì mà không làm.',nhutnhat:'Thôi, chẳng dám đâu.',
  thatthat:'Có sao nói vậy.',gianxao:'Thật thà thì chỉ thiệt thân.',rongluong:'Giúp được ai thì giúp.',ichky:'Phần mình trước đã.',diemtinh:'Việc gì cũng nên nghĩ kỹ.',nongtinh:'Đừng chọc giận ta.',
  tietche:'Cái gì cũng vừa phải thôi.',buongtha:'Đời người ngắn ngủi, vui được thì vui.',kiendinh:'Đã quyết thì không đổi.',nhunhuoc:'Ai bảo sao nghe vậy.',khokhao:'Người ta nói thì chắc là thật.',muuluoc:'Đi một nước phải nhìn ba nước.'};
function sayOf(c){const L=axLabels(c);return L.length?SAY[L[0]]||'Ngày qua ngày.':'Ngày qua ngày, chẳng có gì đặc biệt.'}
function persWord(c){const L=axLabels(c);return L.length?L.slice(0,2).map(t=>TRAITS[t].n.toLowerCase()).join(', '):'tính tình bình thường'}
/* ================= v6.0: tên, tính cách động, năng lực phụ, tật xấu, kỳ ngộ hiếm, xem trước hệ quả ================= */
const {MMID,MGIV,FMID,FGIV,RNAME,POEMS,ORIGINS,AXES,SKILLS,JOBX,SCHOOLX,FOCUSX,LIFEX,VICES}=window.D;
const AXK=AXES.map(a=>a[0]);
const AXN=Object.fromEntries(AXES.map(a=>[a[0],a[1]]));
const SKN=Object.fromEntries(SKILLS);

/* ---------- tên ---------- */
function avoidNames(){
  const s=new Set();
  S.people.forEach(p=>{if(p.inLaw)return;if(p.dead!=null&&S.t-p.dead>600)return;s.add(p.given);const w=String(p.given).split(' ');s.add(w[w.length-1])});
  return s;
}
function mkGiven(g,o){
  o=o||{};const avoid=o.avoid||new Set();
  for(let i=0;i<50;i++){
    const mid=o.mid||(g==='nam'?pick(MMID):pick(FMID));const nm=g==='nam'?pick(MGIV):pick(FGIV);
    if(nm===mid)continue;const v=mid+' '+nm;
    if(!avoid.has(v)&&!avoid.has(nm))return v;
  }
  return (o.mid||(g==='nam'?pick(MMID):pick(FMID)))+' '+(g==='nam'?pick(MGIV):pick(FGIV));
}
/* tên con cháu trong họ: tránh trùng người thân, con trai theo chữ lót của đời nếu gia tộc chọn */
function clanGiven(g,gen){
  let mid=null;
  if(g==='nam'&&S&&S.poem!=null&&POEMS[S.poem]&&gen>=2){const w=POEMS[S.poem].w;mid=w[(gen-2)%w.length]}
  return mkGiven(g,{mid,avoid:avoidNames()});
}
/* người ngoài: vùng biên có họ tên riêng */
function outsiderName(g,reg){
  reg=reg||(S&&S.region)||'trung';const RN=RNAME[reg];
  if(RN&&chance(reg==='dong'?0.5:0.55)){
    const sur=pick(RN.s);const list=g==='nam'?RN.m:RN.f;
    return {surname:sur,given:list?pick(list):mkGiven(g)};
  }
  return {surname:pick(SURN),given:mkGiven(g)};
}
const fullOutsider=(g,reg)=>{const n=outsiderName(g||(chance(0.6)?'nam':'nữ'),reg);return n.surname+' '+n.given};

/* ---------- tính cách: 11 trục ---------- */
const plast=a=>a<6?1:a<12?0.85:a<18?0.6:a<30?0.35:a<50?0.2:0.1;
const axv=(c,k)=>(c.sub&&c.sub[k]!=null)?c.sub[k]:50;
const skv=(c,k)=>(c.sk&&c.sk[k]!=null)?c.sk[k]:30;
function axLabels(c){
  const out=[];if(!c||!c.sub)return out;
  for(const [k,,,,hi,lo] of AXES){const v=c.sub[k];if(v==null)continue;if(v>=75)out.push(hi);else if(v<=25)out.push(lo)}
  if(c.tri!=null&&c.tri<35&&axv(c,'thanh')>=60&&c.born!=null&&S&&S.t-c.born>=120)out.push('khokhao');
  if(c.tri>=70&&skv(c,'muu')>=60)out.push('muuluoc');
  return out;
}
function harmonize(s){
  if(s.tv>=70&&s.yc<45)s.yc=45;
  if(s.yc<=25&&s.tv>60)s.tv=60;
  if(s.tiet<=25&&s.cc>70)s.cc=70;
  if(s.gan<=25&&s.tv>70)s.tv=70;
  if(s.dl>=75&&s.ht>80)s.ht=80;
  if(s.diem>=75&&s.gan<20)s.gan=20;
}
/* tính cách cũ (v5) quy ra trục mới */
const PC_MAP={tram:{diem:15,hd:-5},hoat:{hd:10},cuong:{thanh:15,diem:-5},khon:{thanh:-8},langman:{tiet:-10},thucte:{cc:5},cochap:{yc:12},nhumi:{gan:-10,diem:8},
  hieuthang:{diem:-12,tv:5},phongtung:{tiet:-15},cantrong:{gan:-10,tiet:8},mongmo:{cc:-5},kieu:{rong:-10,hd:-5},khiem:{rong:10},dasau:{diem:-8},haosang:{rong:20}};
const TRAIT_AX={thamlam:{rong:-15,thanh:-10},hoangphi:{tiet:-15},tietkiem:{tiet:10,rong:-5},nhanhau:{rong:20,thanh:5},danghi:{hd:-10},xauxa:{hd:-6},lacquan:{diem:5}};
function ensurePersona(c){
  if(c.sub&&c.sub.yc!=null&&c.rel&&c.sk&&c.nat)return;
  c.rel=c.rel||{};
  const par=S.people.filter(p=>c.parents.includes(p.id)&&p.sub&&p.sub.yc!=null);
  const s=c.sub=c.sub||{};
  AXK.forEach(k=>{if(s[k]!=null)return;let v=Math.round((R(8,92)+R(8,92))/2);
    if(par.length)v=Math.round(v*0.55+par.reduce((a,p)=>a+p.sub[k],0)/par.length*0.45);s[k]=v});
  if(c.pc&&PC_MAP[c.pc]){for(const k in PC_MAP[c.pc])s[k]=clamp(s[k]+PC_MAP[c.pc][k],0,100);delete c.pc}
  // đặc tính tính cách cũ chuyển thành trục
  (c.traits||[]).slice().forEach(t=>{const T=TRAITS[t];if(T&&T.ax){c.traits=c.traits.filter(x=>x!==t);setLabel(c,t,true)}});
  if(c.tg){['nongtinh'].forEach(t=>{if(c.tg[t]){if(c.tg[t]>=1&&chance(0.7))s.diem=Math.min(s.diem,R(10,25));delete c.tg[t]}})}
  for(const t in TRAIT_AX)if((c.traits||[]).includes(t))for(const k in TRAIT_AX[t])s[k]=clamp(s[k]+TRAIT_AX[t][k],0,100);
  harmonize(s);
  if(!c.nat)c.nat=Object.assign({},s);
  if(!c.sk){const a=c.born!=null?age(c):18;
    if(a<10)c.sk={muu:R(0,6),khau:R(0,6),ql:R(0,4),ky:R(0,6)};
    else c.sk={muu:clamp(Math.round((c.tri||40)*0.45+R(-10,10)),0,90),khau:clamp(Math.round((c.eq||40)*0.4+(c.mi||40)*0.15+R(-8,8)),0,90),
      ql:clamp(Math.round(((c.tri||40)+(c.eq||40))*0.2+R(-8,8)),0,90),ky:clamp(Math.round((c.vo||40)*0.2+(c.suc||60)*0.1+R(0,15)),0,90)};
    if(['tho','y','nghe','chan'].includes(c.job))c.sk.ky=clamp(c.sk.ky+Math.round(c.m*0.3),0,100);
    if(['tieunhi','hangrong','hau','su'].includes(c.job))c.sk.khau=clamp(c.sk.khau+Math.round(c.m*0.25),0,100);
    if(c.job==='quan')c.sk.muu=clamp(c.sk.muu+15,0,100);
    if(c.job==='chu'||c.job==='noi')c.sk.ql=clamp(c.sk.ql+15,0,100)}
  // tật xấu cũ chưa có mức độ
  c.habits.forEach(h=>{if(HABITS[h]&&HABITS[h].vice){c.vlv=c.vlv||{};if(c.vlv[h]==null)c.vlv[h]=40;c.vt=c.vt||{};if(c.vt[h]==null)c.vt[h]=S.t}});
}
/* đặt một nhãn tính cách (dùng khi kỳ ngộ thêm/bớt đặc tính kiểu cũ) */
function setLabel(c,t,on){
  const row=AXES.find(a=>a[4]===t||a[5]===t);if(!row)return false;
  const k=row[0];const hi=row[4]===t;c.sub=c.sub||{};const v=c.sub[k]!=null?c.sub[k]:50;
  if(on)c.sub[k]=hi?Math.max(v,R(78,88)):Math.min(v,R(12,22));
  else c.sub[k]=hi?Math.min(v,R(55,65)):Math.max(v,R(35,45));
  return true;
}
/* đẩy trục tính cách; trả về đoạn báo nếu nhãn thay đổi */
function shiftAx(c,d,mult){
  if(!c||!d)return '';ensurePersona(c);
  const before=axLabels(c);const k0=mult??(0.45+plast(age(c))*0.9);
  for(const k in d){if(c.sub[k]==null||!d[k])continue;c.sub[k]=clamp(c.sub[k]+d[k]*k0,0,100)}
  harmonize(c.sub);
  const after=axLabels(c);
  const gained=after.filter(t=>!before.includes(t)),lost=before.filter(t=>!after.includes(t));
  if(!gained.length&&!lost.length)return '';
  if(DRY)return '';
  gained.forEach(t=>log(`${nameOf(c)} trở nên ${TRAITS[t].n.toLowerCase()}.`,TRAITS[t].c==='r'?'hi':'gd'));
  lost.forEach(t=>log(`${nameOf(c)} không còn ${TRAITS[t].n.toLowerCase()} như trước.`));
  return `<span class="fx">${gained.map(t=>`<span class="${TRAITS[t].c==='r'?'down':'up'}">Tính cách: ${TRAITS[t].n}</span>`).join('')}${lost.map(t=>`<span class="purple">Hết ${TRAITS[t].n.toLowerCase()}</span>`).join('')}</span>`;
}
/* lựa chọn tự kéo tính cách theo chữ trong nhãn (chỉ khi kỳ ngộ không ghi rõ ax) */
const AXKW=[
  [/lừa|gian|lén|ăn bớt|bớt xén|hối lộ|lo lót|đút lót|giả mạo|gian lận|chiếm|cướp|ăn cắp|trộm|mua đề|nói dối|giấu/i,{thanh:-3}],
  [/thật thà|nói thật|trả lại|khai thật|thẳng thắn|từ chối hối lộ|không nhận/i,{thanh:3}],
  [/cứu|giúp|cho vay|quyên|bố thí|chia|tặng|nhường|thương tình|cưu mang|nuôi/i,{rong:2.5}],
  [/mặc kệ|làm ngơ|bỏ đi|đuổi|không cho|giữ lấy|bỏ mặc/i,{rong:-2}],
  [/liều|xông|đánh|thách|đấu|chống|đối đầu|tử chiến|mạo hiểm|truy|lao vào|nhảy xuống/i,{gan:2.5}],
  [/bỏ chạy|trốn|né|tránh|nhịn|lùi|chịu thua|cúi đầu|van xin/i,{gan:-2}],
  [/uống|đánh bạc|chơi thử|hưởng lạc|ăn chơi|linh đình|vung tiền|xa hoa|thanh lâu|lầu xanh/i,{tiet:-2.5}],
  [/tiết kiệm|dành dụm|vừa phải|từ chối|kiêng|cai|thề/i,{tiet:2}],
  [/học|luyện|chăm|khổ luyện|cày|làm thêm|rèn/i,{cc:1.5}],
  [/nghỉ|lười|bỏ bê|ngủ/i,{cc:-1.5}],
  [/mắng|quát|nổi giận|trả thù|báo thù|đánh cho/i,{diem:-2}],
  [/bình tĩnh|nhẫn|hòa giải|khuyên|nói chuyện|thương lượng|kiên nhẫn/i,{diem:2}],
  [/vâng lời|nghe lời|theo ý cha|theo ý mẹ|phụng dưỡng|hiếu/i,{ht:2}],
  [/cãi|bất chấp|tự ý|bỏ nhà/i,{ht:-2,dl:1.5}],
  [/tự làm|tự lo|tự mình|một mình/i,{dl:2}],
  [/nhờ|cầu cứu|xin gia chủ|xin người nhà/i,{dl:-1.5}],
  [/thề độc|quyết|kiên trì|đến cùng|không bỏ cuộc/i,{yc:2}],
  [/bỏ cuộc|thôi|buông/i,{yc:-1}],
  [/lên kinh|tranh|giành|làm lớn|dấn thân|việc lớn|ứng cử|thể hiện/i,{tv:2}],
  [/an phận|yên ổn|cho qua|vừa đủ/i,{tv:-1.5}]];
function autoAx(l){if(!l)return null;const d={};let any=false;for(const [re,o] of AXKW)if(re.test(l)){for(const k in o){d[k]=(d[k]||0)+o[k]*0.6}any=true}return any?d:null}

/* ---------- năng lực phụ ---------- */
function addSk(c,k,v){ensurePersona(c);const o=c.sk[k]||0;c.sk[k]=clamp(o+v,0,v>0?Math.max(o,100):100);return c.sk[k]-o}

/* ---------- mỗi năm: tính cách trôi theo môi trường, năng lực lớn theo việc ---------- */
const RULEX={nghiem:{ht:1,tiet:1},hoathuan:{hd:1,diem:.5},tuquyet:{dl:1},hieudao:{ht:1},trongthuong:{tv:.5},thanhliem:{thanh:1},cambac:{tiet:1},hieuhoc:{yc:.5},nghia:{rong:1},tietkiem:{tiet:.5,rong:-.3},thuongvo:{gan:.5},doanket:{hd:.5,rong:.5},dichton:{}};
const VICEX={bac:{thanh:-1,tiet:-1.5,yc:-.5},ruou:{diem:-1,cc:-1,tiet:-1},thanhlau:{tiet:-1.5},xahoa:{tiet:-1.5,rong:.5},trom:{thanh:-2,tiet:-.5},donhau:{diem:-2},tuthien:{rong:2},chay:{diem:1,tiet:1},dacsu:{yc:.5}};
function driftYear(c,a){
  ensurePersona(c);const d={};
  const add=(o,m)=>{if(o)for(const x in o)d[x]=(d[x]||0)+o[x]*(m||1)};
  if(a>=16&&!c.away){const J=JOBX[c.job];if(J)add(J.ax)}
  if(c.away&&c.away.type==='army')add(JOBX.quan_ngu.ax);
  if(a>=6&&a<18&&c.school!=='nha')add((SCHOOLX[c.school]||{}).ax);
  if(a>=6)add((FOCUSX[c.focus]||{}).ax);
  const h=HH(c.hh);if(h)add(LIFEX[h.life]);
  c.habits.forEach(x=>add(VICEX[x],HABITS[x]&&HABITS[x].vice?0.5+(c.vlv&&c.vlv[x]||40)/80:1));
  // cha mẹ và gia chủ nhào nặn đứa trẻ
  if(a<18){const ps=S.people.filter(p=>c.parents.includes(p.id)&&inClan(p)&&p.sub&&!p.away);const hd=head();if(hd&&hd.id!==c.id&&!ps.includes(hd)&&hd.sub)ps.push(hd);
    ps.forEach(p=>{const w=0.07*(0.6+relOf(c,p)/120)*(p.id===S.head?1.15:1);AXK.forEach(x=>{d[x]=(d[x]||0)+(p.sub[x]-c.sub[x])*w})})}
  // chỉ số nhào nặn tính cách
  if(a>=8){if(c.tri<35)add({thanh:1.2});if(c.tri>=80)add({tv:.6});if(c.vo>=70)add({gan:.6});if(c.eq>=70)add({hd:.5,diem:.5});if(c.eq<30)add({diem:-.6});
    if(c.tam<25)add({hd:-1,diem:-.6,tiet:-.5});if(c.tam>=80)add({hd:.5});if(S.money<0)add({rong:-.5});}
  S.rules.forEach(r=>add(RULEX[r]));
  // bản tính kéo về
  AXK.forEach(x=>{d[x]=(d[x]||0)+((c.nat?c.nat[x]:50)-c.sub[x])*0.09});
  shiftAx(c,d,plast(a));
  // năng lực phụ
  const g={};const addg=(o,m)=>{if(o)for(const x in o)g[x]=(g[x]||0)+o[x]*(m||1)};
  if(a>=16&&!c.away){const J=JOBX[c.job];if(J)addg(J.sk);const q=qlYear(c);if(q)addSk(c,'ql',q)}
  /* v6.4.1.2: trẻ 10 đến 17 tuổi học cách quản việc từ cha mẹ, ông bà cùng nhà (tới khoảng 70% quản trị của người giỏi nhất) */
  if(a>=10&&a<18){const up=p=>c.parents.includes(p.id)||c.parents.some(id=>{const q=P(id);return q&&q.parents.includes(p.id)});
    const best=S.people.reduce((m,p)=>p.dead==null&&up(p)&&inClan(p)&&p.hh===c.hh&&!p.away?Math.max(m,qlOf(p)):m,0);const tg=best*0.7;if(tg>qlOf(c))addSk(c,'ql',(tg-qlOf(c))*0.18)}
  if(a>=6&&a<18&&c.school!=='nha')addg((SCHOOLX[c.school]||{}).sk);
  if(a>=6)addg((FOCUSX[c.focus]||{}).sk);
  if(a>=10)addg({muu:c.tri/220,khau:c.eq/240});
  const f=(0.55+plast(a)*0.6)*(0.7+axv(c,'cc')/170)*(0.85+c.tam/400);
  for(const x in g)if(g[x])addSk(c,x,g[x]*f*Math.max(0.05,1-(c.sk[x]||0)/110));
}

/* ---------- thói quen, tật xấu ---------- */
const isVice=k=>!!(HABITS[k]&&HABITS[k].vice);
const vlv=(c,k)=>(c.vlv&&c.vlv[k])||0;
const viceOf=c=>c.habits.filter(isVice).sort((a,b)=>vlv(c,b)-vlv(c,a));
function addHabit(c,k,lv){
  if(!HABITS[k])return false;
  if(c.habits.includes(k)){if(isVice(k)){c.vlv=c.vlv||{};c.vlv[k]=Math.max(vlv(c,k),lv||25)}return false}
  c.habits.push(k);
  if(isVice(k)){c.vlv=c.vlv||{};c.vlv[k]=lv||25;c.vt=c.vt||{};c.vt[k]=S.t;if(!DRY)viceAlert(c,k)}
  return true;
}
/* v6.7.0-d1: nhà túng thiếu thì bỏ các thói quen tốt tốn tiền; tật xấu thì vẫn giữ */
function habitBroke(){alive().forEach(p=>{if(!inClan(p))return;
    const gh=p.habits.filter(h=>HABITS[h]&&!isVice(h)&&HABITS[h].cost>0);if(!gh.length)return;
    const hh=HH(p.hh);let poor;
    if(p.hh===mainHH()&&clanKeeps(p))poor=S.money<=0;
    else if(p.hh===mainHH())poor=(p.purse||0)<=HABITS[gh[0]].cost*2;
    else poor=hh?(hh.money<=0&&(p.purse||0)<=HABITS[gh[0]].cost*2):false;
    if(poor&&chance(0.3)){const k=pick(gh);dropHabit(p,k);if(!DRY)log(`${nameOf(p)} túng thiếu nên đành bỏ ${HABITS[k].n.toLowerCase()}.`,'hi')}})}
function dropHabit(c,k){c.habits=c.habits.filter(h=>h!==k);if(c.vlv)delete c.vlv[k];if(c.vt)delete c.vt[k];if(c.vnat)delete c.vnat[k]}
/* bớt tật xấu: đã thành bản tính thì chỉ bớt được một phần */
function cutVice(c,k,v){if(!c.habits.includes(k))return 0;if(!isVice(k)){dropHabit(c,k);return 100}
  const nat=c.vnat&&c.vnat[k];const d=Math.round(v*(nat?0.45:1)*(0.7+axv(c,'yc')/170));c.vlv[k]=vlv(c,k)-d;
  if(c.vlv[k]<=0){dropHabit(c,k);if(!DRY)log(`${nameOf(c)} đã bỏ hẳn được ${HABITS[k].n.toLowerCase()}.`,'gd')}return d}
/* v6.3.5: ai có quyền khuyên can, ai có quyền đánh phạt: không đảo lộn vai vế trong nhà.
   Gia chủ mắc tật thì chỉ trưởng bối hoặc vợ chồng khuyên can; người danh vọng cao thì chỉ trưởng bối hoặc gia chủ khuyên can;
   người thường thì trưởng bối hoặc gia chủ xử, nhưng gia chủ không đánh phạt người lớn tuổi hơn mình hay bậc trên mình. */
const elderOf=(p,c)=>{const k=kin(c,p);return k==='con'||k==='chau'||(k==='ho'&&age(p)-age(c)>=15)};
function viceActors(c){
  const ok=p=>!!p&&p.id!==c.id&&inClan(p)&&p.dead==null&&!p.away&&age(p)>=18;
  const hd=head(),sp=spouseOf(c);
  const eld=S.people.filter(p=>ok(p)&&elderOf(p,c)).sort((a,b)=>((kin(c,a)==='con'?0:1)-(kin(c,b)==='con'?0:1))||(relOf(c,b)-relOf(c,a))||(age(b)-age(a)));
  if(isHead(c))return eld.concat(ok(sp)?[sp]:[]);
  return eld.concat(ok(hd)&&!eld.includes(hd)?[hd]:[])}
function canPunish(by,c){
  if(isHead(c)||(c.fame||0)>=FAME_SELF[2][0])return false;
  if(elderOf(by,c))return true;
  return isHead(by)&&!elderOf(c,by)&&age(c)<40&&age(c)<=age(by)+5}
function viceBy(c){const A=viceActors(c);if(!A.length)return null;
  const par=A.find(p=>kin(c,p)==='con');if(age(c)<25&&par)return par;
  const hd=head();if(hd&&A.includes(hd)&&canPunish(hd,c))return hd;
  return A[0]}
/* người đủ tư cách được báo khi người nhà nhiễm tật */
function viceAlert(c,k){
  const by=viceBy(c);
  if(!by||by.id===c.id||by.away)return;
  if((c.flags['vw_'+k]||-99)>S.t)return;c.flags['vw_'+k]=S.t+36;
  enqueue('vice',c.id,{by:by.id,k});
}
const VWORK={bac:.3,ruou:.25,thanhlau:.1,xahoa:.05,donhau:.12,trom:.05};
function viceWork(c){let v=1;c.habits.forEach(k=>{if(VWORK[k])v-=VWORK[k]*vlv(c,k)/100});return Math.max(0.45,v)}
function viceTick(){
  for(const c of alive()){
    const a=age(c);if(a<8)continue;ensurePersona(c);
    const t=axv(c,'tiet'),y=axv(c,'yc');
    const susc=Math.max(0.15,(1+(50-t)/40))*(1+(50-y)/100);
    const life=(HH(c.hh)||{life:1}).life;
    for(const k in VICES){const V=VICES[k];if(c.habits.includes(k)||a<V.age[0]||a>V.age[1])continue;
      let p=V.base*susc;
      if(a>=16&&a<=30)p*=1.4;
      if(home().some(o=>o.id!==c.id&&o.hh===c.hh&&o.habits.includes(k)&&age(o)>=14))p*=1.6;
      if(k==='xahoa'||k==='thanhlau')p*=life>=3?2:life<=1?0.3:1;
      if(k==='trom')p*=life<=0?2.5:life>=3?0.3:1;
      if(k==='ruou'&&c.tam<30)p*=2;
      if(k==='donhau'&&axv(c,'diem')<30)p*=2;
      if((k==='thanhlau'||k==='donhau')&&c.g==='nữ')p*=0.15;
      if((k==='bac'||k==='ruou')&&rule('cambac'))p*=0.3;
      if(rule('nghiem'))p*=0.7;
      c.habits.forEach(v=>{if(VICES[v]&&VICES[v].chain.includes(k))p+=0.0006*vlv(c,v)/50});
      if(c.away&&c.away.type==='army'&&['ruou','bac','donhau'].includes(k))p*=1.6;
      if(chance(p)){addHabit(c,k,R(12,25));log(`${nameOf(c)} bắt đầu nhiễm thói ${HABITS[k].n.toLowerCase()}.`,'hi');break}
    }
    for(const k of c.habits.slice()){if(!isVice(k))continue;
      let lv=vlv(c,k);lv+=Math.max(0.05,0.28+(50-t)/120+(50-y)/220);
      const nat=c.vnat&&c.vnat[k];
      if(chance((0.006+(lv<30?0.01:0))*(0.4+y/80)*(0.4+t/80)*(nat?0.15:1)))lv-=R(15,35);
      c.vlv[k]=clamp(lv,0,100);
      if(c.vlv[k]<=0){dropHabit(c,k);log(`${nameOf(c)} tự bỏ được ${HABITS[k].n.toLowerCase()}.`,'gd');continue}
      if(!nat&&S.t-((c.vt&&c.vt[k])??S.t)>=60&&c.vlv[k]>=60){c.vnat=c.vnat||{};c.vnat[k]=1;c.nat.tiet=clamp(c.nat.tiet-10,0,100);log(`Thói ${HABITS[k].n.toLowerCase()} của ${nameOf(c)} đã ăn vào bản tính.`,'hi')}
      if(c.vlv[k]>=50)viceAlert(c,k);
      if(c.away)continue;
      const L=c.vlv[k];
      if(k==='bac'&&chance(0.1+L/300)){S.money-=Math.round(R(15,80)*TK[tierIdx()]*(1+L/60))}
      if(k==='bac'&&L>=55&&chance(0.012))enqueue('ev',c.id,{ev:'v6_no_bac'});
      if(k==='trom'&&chance(0.01*L/50))enqueue('ev',c.id,{ev:'v6_trom_bat'});
      if(k==='donhau'&&chance(0.008*L/50))enqueue('ev',c.id,{ev:'v6_danh_nhau'});
      if(k==='ruou'&&chance(0.006*L/50))enqueue('ev',c.id,{ev:'v6_say_ruou'});
      if(k==='thanhlau'&&married(c)){const sp=spouseOf(c);if(sp)addRel(sp,c,-0.4*L/50)}
    }
  }
}
const VTXT={bac:'chiếu bạc',ruou:'men rượu',thanhlau:'chốn lầu xanh',xahoa:'thói vung tiền',trom:'thói tắt mắt',donhau:'thói gây gổ'};
function vicePopup(by,c,k){
  if(!by||!c||!inClan(by)||!inClan(c)||!c.habits.includes(k)){setTimeout(nextPopup,0);return}
  const L=Math.round(vlv(c,k));const nat=c.vnat&&c.vnat[k];const kid=age(c)<16;
  const harsh=canPunish(by,c);
  const diff=30+L*0.45-(axv(c,'ht')-50)*0.4+(relOf(c,by)<0?10:0)+(nat?15:0);
  const done=(c,txt)=>{c.flags.vdT=S.t+6;return txt};
  const role=isHead(by)?'gia chủ':(KIN_N[kin(c,by)]||'người nhà');
  const why=isHead(c)?'Là gia chủ nên không ai có quyền đánh mắng, chỉ có thể ân cần khuyên can.':(c.fame||0)>=FAME_SELF[2][0]?'Người có danh vọng, không thể đem đòn roi ra mà dạy, chỉ có thể khuyên can.':!harsh&&!kid?`${esc(c.given)} đã lớn tuổi, ${esc(by.given)} không ở vị trí để đánh phạt, chỉ có thể khuyên can.`:'';
  const opts=[
    {l:'Khuyên răn nhẹ nhàng',s:'Dựa vào EQ và khẩu tài người khuyên',r:[{eq:0.6,khau:0.6},diff],
      y:x=>{cutVice(c,k,R(30,50));addRel(c,by,3);return done(c,`${esc(c.given)} nghe ra, hứa sửa đổi.`+fx(c,{tam:-2})+shiftAx(c,{tiet:4,ht:1}))},
      n:x=>{c.vlv[k]=Math.min(100,vlv(c,k)+4);addRel(c,by,-3);return done(c,'Nghe tai này lọt tai kia.')}},
    {l:'Ngồi lại nói chuyện nghiêm túc, nhắc đến tổ tiên và mái nhà này',s:'Nặng lời hơn, nhưng không đụng chạm đến thể diện',r:[{eq:0.5,khau:0.5,fame:0.3},diff+(harsh?4:0)],
      y:x=>{cutVice(c,k,R(35,55));addRel(c,by,1);return done(c,`${esc(c.given)} cúi đầu rất lâu, rồi nói sẽ dứt.`+fx(c,{tam:-4})+shiftAx(c,{tiet:5,ht:1}))},
      n:x=>{c.vlv[k]=Math.min(100,vlv(c,k)+3);addRel(c,by,-5);return done(c,`${esc(c.given)} im lặng bỏ đi, trong lòng nặng nề.`+fx(c,{tam:-4}))}}];
  if(harsh)opts.push(
    {l:'Đánh đòn cho chừa',s:kid?'Trẻ con thì sợ':'Người ngỗ nghịch có thể chống lại',f:x=>{
      if(kid||axv(c,'ht')>=55){cutVice(c,k,R(40,60));addRel(c,by,-8);return done(c,`Một trận đòn nhớ đời. ${esc(c.given)} sợ, không dám tái phạm.`+fx(c,{tam:-8})+shiftAx(c,{ht:2,diem:-1}))}
      if(axv(c,'dl')>=65&&chance(0.45)){addRel(c,by,-25);c.vlv[k]=Math.min(100,vlv(c,k)+6);return done(c,`${esc(c.given)} uất ức bỏ nhà đi mấy hôm, về rồi càng lầm lì.`+fx(c,{tam:-12})+shiftAx(c,{ht:-4,hd:-2}))}
      cutVice(c,k,R(20,35));addRel(c,by,-15);return done(c,'Bị đánh thì chịu, nhưng ấm ức trong lòng.'+fx(c,{tam:-8})+shiftAx(c,{ht:-1}))}},
    {l:'Cắt tiền tiêu, cấm ra khỏi nhà',c:()=>['bac','thanhlau','xahoa','ruou'].includes(k),f:x=>{cutVice(c,k,R(25,40));addRel(c,by,-6);return done(c,'Không có tiền, không ra được cửa, đành ở nhà.'+fx(c,{tam:-8})+shiftAx(c,{tiet:2}))}});
  opts.push(harsh?
    {l:`Gửi lên chùa tu tâm nửa năm (${money(mm(6))})`,c:()=>S.money>=mm(6),f:x=>{S.money-=mm(6);cutVice(c,k,R(50,80));return done(c,'Tiếng chuông chùa làm lòng dịu lại.'+fx(c,{tam:-3,eq:1})+shiftAx(c,{tiet:6,diem:3}))}}:
    {l:`Mời đi tĩnh tâm ở chùa một thời gian (${money(mm(6))})`,c:()=>S.money>=mm(6),r:[{eq:0.6,khau:0.5},diff+8],
      y:x=>{S.money-=mm(6);cutVice(c,k,R(40,65));addRel(c,by,2);return done(c,`${esc(c.given)} nghe lời, lên chùa ở lại mấy tháng. Về rồi lòng nhẹ hẳn.`+fx(c,{tam:-1,eq:1})+shiftAx(c,{tiet:5,diem:3}))},
      n:x=>{addRel(c,by,-2);return done(c,`${esc(c.given)} từ chối khéo, bảo mình tự lo được.`)}});
  opts.push({l:'Mặc kệ',f:x=>{c.vlv[k]=Math.min(100,vlv(c,k)+8);S.on=clamp(S.on-1,0,100);return done(c,'Mọi chuyện cứ thế trôi.')}});
  choicePopup(by,'Gia giáo',`${c.given} nhiễm thói ${HABITS[k].n.toLowerCase()}`,
    `${esc(nameOf(c))}, ${age(c)} tuổi, dạo này sa vào ${VTXT[k]}${L>=60?', đã khá nặng':L>=35?', ngày càng nhiều':', mới chớm'}${nat?'. Thói này đã ăn vào bản tính, rất khó bỏ':''}. ${esc(by.given)} là ${role} của ${esc(c.given)}, ra mặt can ngăn. ${why} Cách nào hiệu quả phụ thuộc vào ${esc(by.given)} và tính nết của ${esc(c.given)}.`,opts);
}

/* ---------- kỳ ngộ: phân loại và độ hiếm ---------- */
const KY_IDS=new Set(['tui_bac','dao_si_xem_tuong','chua_co','giac_mo_to','nguoi_la_tro','cuu_nguoi_duoi_nuoc','tre_than_dong','tre_ky_vat','vua_ban_bien','tu_thien_qua_ngot','ke_lua_dao','tin_don_ky','do_co','sach_hiem',
  't_bi_kip','tp_nhan_sam','tp_an_si','ng_ngoc_trai','nong_giong_chiem','nong_khoai_tay','nong_duoc_lieu','jh_bi_kip','hk_mon_phai','hau_chuoc_than','ng_vao_cung','buon_hang_hiem','y_chieumo','tuoc_ky_ngo']);
/* bảo vật, cơ duyên có một không hai: cả gia tộc trăm năm mới gặp một lần */
const KY_CLAN=new Set(['t_bi_kip','jh_bi_kip','tp_an_si','t_g_tho_dia','t_n_hu_vang','vv_vo_binh_khi','vv_suc_linh_chi','vv_tri_tang_kinh','vv_vo_tham_tham','tre_than_dong','vua_ban_bien','ng_ngoc_trai','tp_nhan_sam']);
function classifyEvents(){
  EVENTS.forEach(e=>{
    if(e.ky==null)e.ky=!!(KY_IDS.has(e.id)||/^vv_|^t_[gcnq]_/.test(e.id)||e.k==='Mở đầu cốt truyện'||e.k==='Kỳ ngộ'||e.k==='Kỳ ngộ hiếm'||e.k==='Kỳ ngộ cực hiếm');
    if(e.u==null)e.u=(KY_CLAN.has(e.id)||e.k==='Mở đầu cốt truyện')?'clan':e.ky?'person':null;
    if(e.u==='clan'&&!e.cyc)e.cyc=e.k==='Mở đầu cốt truyện'?[80,200]:[100,300];
    if(e.id==='tuoc_ky_ngo'){e.u='world';e.cyc=[100,1000]}
  });
}
function kyOk(e,c){
  if(e.u==='clan'||e.u==='world')return !((S.kyT&&S.kyT[e.id])>S.t);
  if(e.u==='person')return !c.seen[e.id];
  return true;
}
function kyMark(e){if((e.u==='clan'||e.u==='world')&&e.cyc){S.kyT=S.kyT||{};S.kyT[e.id]=S.t+12*R(e.cyc[0],e.cyc[1])}}

/* ---------- xem trước hệ quả: chạy thử trên bản sao rồi bỏ ---------- */
let DRY=false;
function dryRun(fn){
  const real=S,st=window.setTimeout;let out=null;
  try{DRY=true;S=structuredClone(real);window.setTimeout=()=>0;out=fn()}catch(e){out=null}
  finally{S=real;DRY=false;window.setTimeout=st}
  return out;
}
function fxNames(html){
  const o={};if(!html)return o;
  const re=/<span class="(up|down|purple)">([^<]*)<\/span>/g;let m;
  while((m=re.exec(html))){let n=m[2].replace(/\s*[+−-]?[\d.,]+.*$/,'').replace(/\s*[+−-]$/,'').trim();if(!n)continue;
    if(/^Tính cách|^Hết /.test(n))continue;n=n.replace(/^Chức: .*/,'Chức vụ').replace(/^Đặc tính: .*/,'Đặc tính mới').replace(/^Thói quen: .*/,'Thói quen mới').replace(/^Bỏ được: .*/,'Bỏ thói quen');
    const s=m[1]==='down'?-1:1;o[n]=(o[n]||0)+s}
  return o;
}
function sumTxt(o){const e=Object.entries(o);if(!e.length)return '';return e.slice(0,5).map(([n,v])=>`${n}${v>0?'▲':v<0?'▼':'↕'}`).join(' ')}
/* trả về chuỗi tóm tắt cho lựa chọn thứ i của kỳ ngộ: thành / bại hoặc kết quả chắc chắn */
/* v6.4.1.1 (admin): điểm lợi hại của lựa chọn thứ i (không gieo): chạy thử trên bản sao, cộng số mục tăng trừ số mục giảm */
function previewScore(evId,cid,data,i){
  const ev=EVMAP[evId];if(!ev)return null;let tot=0,n=0;
  for(let k=0;k<2;k++){const r=dryRun(()=>{const c=P(cid);if(!c)return null;const d=structuredClone(data||{});
    const opts=(typeof ev.o==='function'?ev.o(c,d):ev.o).filter(o=>{try{return !o.c||o.c(c,d)}catch(e){return false}});
    const o=opts[i];if(!o||o.go||!o.f)return null;return o.f(c,d)});
    if(r==null)continue;n++;const m=fxNames(r);for(const x in m)tot+=m[x]}
  return n?tot/n:null}
function previewOpt(evId,cid,data,i){
  const ev=EVMAP[evId];if(!ev)return null;
  const run=w=>dryRun(()=>{const c=P(cid);if(!c)return null;const d=structuredClone(data||{});
    const opts=(typeof ev.o==='function'?ev.o(c,d):ev.o).filter(o=>{try{return !o.c||o.c(c,d)}catch(e){return false}});
    const o=opts[i];if(!o||o.go)return null;const f=o[w];if(!f)return null;return f(c,d)});
  const agg=w=>{const o={};let ok=false;for(let k=0;k<2;k++){const r=run(w);if(r==null)continue;ok=true;const n=fxNames(r);for(const x in n)o[x]=(o[x]||0)+Math.sign(n[x])}return ok?sumTxt(o)||'không đổi gì đáng kể':null};
  const ev0=(typeof ev.o==='function'?null:ev.o);
  const y=agg('y');if(y!=null)return {y,n:agg('n')};
  const f=agg('f');return f!=null?{f}:null;
}
/* ================= v6.1: công quỹ, quỹ hộ, tiền riêng · chi phái · chức trong tộc · đột phá 100 · mừng thọ · truyền nghề ================= */
const {CLANOFF,TOLV,GOP,THO,BRK100}=window.D;
/* v6.4.1.7: con đường riêng cho mốc 120 và mốc 140, mỗi chỉ số hai con đường ở mỗi mốc */
(function(){const G0={
  tri:{120:[['ngo','Bế môn ba năm, tự ngộ điều sách không dạy','Ngồi một chỗ mà nghĩ cho tới cùng',{tri:1,yc:0.6}],['bien','Đi khắp các thư viện lớn, tranh biện với bậc túc nho','Lấy người khác làm đá mài',{tri:0.8,khau:0.6},16]],
       140:[['truoc','Soạn một bộ sách cho đời sau','Viết ra điều chưa ai viết',{tri:1,cc:0.6}],['thien','Đêm đêm xem thiên văn, suy lẽ trời đất','Hỏi trời mà tự trả lời',{tri:1,diem:0.6}]]},
  vo:{120:[['dau','Tìm cao thủ khắp nơi thách đấu','Thắng thua đều học được',{vo:1,gan:0.6},12],['nhap','Vào núi sâu một mình luyện công','Lấy núi rừng làm thầy',{vo:1,yc:0.6}]],
      140:[['vo','Quên hết chiêu thức đã học','Không chiêu thắng có chiêu',{vo:1,diem:0.6}],['sinh','Đối mặt với cái chết một lần','Qua lằn ranh sống chết mới thấy đạo',{vo:0.9,gan:0.8}]]},
  suc:{120:[['khi','Luyện khí, điều tức mỗi ngày','Thở theo trời đất',{suc:1,tiet:0.6}],['han','Tắm suối lạnh mùa đông, phơi nắng mùa hè','Rèn thân như rèn sắt',{suc:1,yc:0.5}]],
       140:[['coc','Tịch cốc trăm ngày','Bỏ bớt cái thường để giữ cái gốc',{suc:1,tiet:0.8}],['duong','Tìm phương dưỡng sinh thất truyền','Thuốc quý, thầy hiếm',{suc:0.9,tri:0.4},20]]},
  mi:{120:[['dan','Học một môn nghệ thuật đến chỗ tinh vi','Nghệ cao thì người đẹp',{mi:1,cc:0.5}],['le','Học lễ nghi chốn cung đình','Cốt cách quý phái',{mi:0.9,eq:0.4},12]],
      140:[['tam','Tu tâm, bỏ cái đẹp bề ngoài','Cái đẹp từ bên trong mới bền',{mi:0.9,diem:0.7}],['danh','Nổi danh khắp kinh thành một phen','Để cả thiên hạ nhìn mình',{mi:1,khau:0.5},20]]},
  eq:{120:[['hoa','Đứng ra hòa giải những mối thù lớn','Hiểu cả hai bên',{eq:1,rong:0.6}],['du','Đi khắp nơi kết giao đủ hạng người','Biết người thì biết mình',{eq:1,hd:0.6},12]],
      140:[['lang','Lắng nghe mà không phán xét','Người tri kỷ của muôn người',{eq:1,diem:0.7}],['thau','Thấu lòng người như đọc sách','Không ai giấu được gì',{eq:1,tri:0.5}]]}};
  for(const k in G0){const L=BRK100[k];if(!L||!L.length)continue;const g=L[0].gain;for(const t in G0[k])G0[k][t].forEach(([id,l,d,sp,cost])=>{const pid='g'+t+'_'+id;if(!L.some(p=>p.id===pid))L.push({id:pid,l,d,mo:t==='120'?[14,24]:[18,30],sp,gain:g,gate:+t,cost:cost||0})})}})();
/* v6.4.1.5: mỗi chỉ số thêm một con đường cho trẻ dưới 16 tuổi và một con đường cho người từ 60 tuổi */
(function(){const A={
  tri:[['tre_hoi','Đọc hết tủ sách trong nhà, hỏi người lớn từng chữ','Trẻ con học bằng tò mò',{tri:1,cc:0.4}],['gia_chiem','Ngồi chiêm nghiệm cả đời, viết lại điều mình biết','Già rồi mới thấu',{tri:1,diem:0.5}]],
  vo:[['tre_vo','Theo người lớn tập võ mỗi sớm','Tập từ gốc, chưa vội cầu nhanh',{vo:1,cc:0.5}],['gia_vo','Đúc kết võ học, luyện dưỡng sinh','Sức yếu đi, công phu sâu thêm',{vo:0.8,diem:0.6}]],
  suc:[['tre_suc','Chạy nhảy, leo đồi, tắm sông','Trẻ khỏe nhờ chơi',{suc:1,gan:0.3}],['gia_suc','Dưỡng sinh, ăn uống điều độ','Giữ gìn hơn là gắng sức',{suc:1,tiet:0.6}]],
  mi:[['tre_mi','Học đàn hát, lễ nghi trong nhà','Cốt cách từ nhỏ',{mi:1,hd:0.4}],['gia_mi','Giữ phong thái người xưa','Tuổi già cũng có cái đẹp riêng',{mi:0.8,diem:0.6}]],
  eq:[['tre_eq','Chơi với trẻ trong xóm, học cách cư xử','Học người từ chuyện nhỏ',{eq:1,hd:0.5}],['gia_eq','Làm người hòa giải trong họ','Hiểu người, người hiểu mình',{eq:1,rong:0.5}]]};
  for(const k in A){const L=BRK100[k];if(!L||!L.length)continue;const g=L[0].gain;const [t,o]=A[k];
    if(!L.some(p=>p.id===t[0]))L.push({id:t[0],l:t[1],d:t[2],mo:[10,18],sp:t[3],gain:g,age:[6,15]});
    if(!L.some(p=>p.id===o[0]))L.push({id:o[0],l:o[1],d:o[2],mo:[10,20],sp:o[3],gain:g,age:[60,120]})}})();

function ensureEcon(st){
  st=st||S;if(!st)return;
  if(st.gop==null)st.gop=0.2;
  st.coff=st.coff||{};st.books=st.books||[];
  /* v6.4.1.1: sách trong save cũ chưa gắn hộ: xếp về hộ hiện tại của người viết, không rõ thì về nhà chính */
  if(st.books.some(b=>!b.hh)){const pp=id=>(st.people||[]).find(p=>p.id===id);const hd=pp(st.head);const mh=hd?hd.hh:'h0';
    st.books.forEach(b=>{if(b.hh)return;const w=pp(b.by);b.hh=w&&st.hh[w.hh]?w.hh:mh})}
  const F=st.farm;if(F.lease==null)F.lease=0;if(F.to==null)F.to=1;
  for(const id in st.hh){const h=st.hh[id];if(h.money==null)h.money=0}
  st.biz.forEach(b=>{if(!b.own)b.own='clan'});
  st.people.forEach(p=>{if(p.purse==null)p.purse=0;if(p.kidW==null)p.kidW=R(40,92);if(p.fert==null)p.fert=chance(0.12)?R(25,55)/100:R(85,115)/100;p.mexp=p.mexp||{};p.capB=p.capB||{}});
}

/* ---------- quỹ ---------- */
const inMain=c=>c.hh===mainHH();
const fundOf=c=>inMain(c)?'clan':c.hh;
const fundGet=f=>f==='clan'||!S.hh[f]?S.money:S.hh[f].money;
function fundAdd(f,v){if(f==='clan'||!S.hh[f])S.money+=v;else S.hh[f].money+=v}
const fundName=f=>f==='clan'||!S.hh[f]?'Công quỹ':'Quỹ '+S.hh[f].name;
const ownPerson=b=>b.own&&b.own.startsWith('p:')?P(b.own.slice(2)):null;
function bizFundAdd(b,v){const p=ownPerson(b);if(p&&p.dead==null){p.purse+=v;return}fundAdd(b.own&&!b.own.startsWith('p:')?b.own:'clan',v)}
function bizFundGet(b){const p=ownPerson(b);if(p&&p.dead==null)return p.purse;return fundGet(b.own&&!b.own.startsWith('p:')?b.own:'clan')}
const bizOwnName=b=>{const p=ownPerson(b);if(p)return 'Riêng của '+p.given;return !b.own||b.own==='clan'?'Gia tộc':(S.hh[b.own]?S.hh[b.own].name:'Gia tộc')};
const offOf=c=>Object.keys(CLANOFF).find(k=>S.coff&&S.coff[k]===c.id)||null;
/* ai nuôi người này: gia tộc nuôi trẻ dưới 18, người già, nội trợ, người làm ruộng chung, người giữ chức trong tộc và gia chủ. Còn lại tự lo */
/* v6.3.5: gia tộc chỉ nuôi trẻ chưa đủ 18, gia chủ, và người làm ruộng của tộc. Người lớn thì tự lo bằng việc mình làm;
   không có việc thì cha mẹ (hoặc vợ chồng, con cháu khi đã già) lo; chỉ khi cả nhà thật sự túng thì gia tộc mới đỡ đần. */
function clanKeeps(c){const a=age(c);if(!inMain(c))return false;if(a<18||isHead(c))return true;if(c.job==='nong')return true;return false}
function keepTxt(c){
  if(isHead(c))return ' · chi dùng từ công quỹ';
  if(age(c)<18)return ' · gia tộc nuôi';
  if(c.job==='nong')return ' · ăn theo ruộng của tộc';
  if(earnOf(c,true)>0||c.purse>=mm(1))return ' · tự lo ăn tiêu';
  const a=age(c);
  if(a>=60)return kidsOf(c).some(k=>inClan(k)&&k.dead==null&&k.hh===c.hh&&age(k)>=18)?' · con cháu phụng dưỡng':' · gia tộc đỡ đần';
  return c.parents.some(id=>{const q=P(id);return q&&inClan(q)&&q.dead==null&&q.hh===c.hh})?' · cha mẹ lo ăn tiêu':spouseOf(c)&&inClan(spouseOf(c))?' · vợ chồng lo ăn tiêu':' · gia tộc đỡ đần'}
/* trả một khoản cho người này: tiền riêng trước (nếu tự lo), thiếu thì quỹ hộ hoặc công quỹ bù */
function charge(c,v){
  if(!inMain(c)&&S.hh[c.hh]){S.hh[c.hh].money-=v;return}
  if(!clanKeeps(c)){const t=Math.min(Math.max(0,c.purse),v);c.purse-=t;v-=t}
  S.money-=v}
const canPay=(c,v)=>(!inMain(c)&&S.hh[c.hh]?S.hh[c.hh].money:S.money+(clanKeeps(c)?0:Math.max(0,c.purse)))>=v;
/* tiền về tay người này: gia chủ thì vào công quỹ, người ở riêng vào quỹ hộ, còn lại vào tiền riêng */
function gain(c,v){if(isHead(c)||(age(c)<16&&inMain(c)))S.money+=v;else if(!inMain(c)&&S.hh[c.hh])S.hh[c.hh].money+=v;else c.purse+=v}

/* ---------- việc phụ ---------- */
const BUSY=[2,3,6,10];
function sideInc(c,est){const a=age(c);const F=FOCUS[c.focus];if(!F||!F.side||a<12||c.away||c.brk)return 0;
  const s=F.side;const mo=month();if(s.mo&&!s.mo.includes(mo))return 0;
  let v=s.inc*(0.75+(c.suc+c.vo)/400)*(0.85+skv(c,'ky')/300)*(0.6+axv(c,'cc')/125)*(0.75+c.tam/200); /* v6.5.4: nghề phụ tùy cần cù và tâm trạng */
  if(c.job==='nong'&&BUSY.includes(mo))v*=0.3;else if(c.job!=='nong'&&(income(c)>0||['chu','quan','quan_ngu'].includes(c.job)))v*=0.5;
  if(a<16)v*=0.6;
  if(loveNow(c))v*=1.12;
  if(s.vary&&!est)v*=Math.random()*2;
  return Math.round(v)}
function earnOf(c,est){if(!inClan(c))return 0;return income(c)+sideIncome(c)+sideInc(c,est)}
const sideNow=c=>{const F=FOCUS[c.focus];return F&&F.side&&(!F.side.mo||F.side.mo.includes(month()))};

/* ---------- chi tiêu hộ ---------- */
function hhFactor(id){
  const mem=alive().filter(p=>p.hh===id);
  /* v6.4.1.5.1: nội trợ không còn bậc, không còn thông thạo; giỏi quản việc, khéo cư xử thì nhà bớt chi tiêu */
  const noi=mem.filter(p=>p.job==='noi'&&age(p)>=16&&!p.away).reduce((m,p)=>Math.max(m,0.06+skv(p,'ql')/600+Math.max(0,p.eq-50)/1500),0);
  let k=1-Math.min(0.25,noi);
  if(S.rules.includes('tietkiem'))k*=0.9;if(S.rules.includes('hieuhoc'))k*=1.05;
  if(id===mainHH())k*=1-Math.min(0.12,offV('truongphong')/400);
  return k}
function hhExpenseAt(id,life){const h=S.hh[id];const o=h.life;h.life=life;const e=hhExpense(id).total;h.life=o;return e}
function toIncome(){const F=S.farm;const n=(F.lease||0)+F.fief;if(!n)return 0;
  return Math.round(n*CROPS.lua.y*TOLV[F.to==null?1:F.to][1]*mk('lua')/12*(S.disaster?(S.disaster.crop||0.6):1)*(1+offV('quansu')/400))}

/* ---------- dòng tiền hằng tháng ---------- */
function econMonth(){
  ensureEcon();
  const main=mainHH();const L={in:{},out:{},t:S.t};const add=(o,k,v)=>{v=Math.round(v);if(v)o[k]=(o[k]||0)+v};
  const m0=S.money;
  const farmV=farmMonth();bizMonth();
  const tp=titlePay(),to=toIncome();
  S.money+=tp+to+farmV;add(L.in,'tuoc',tp);add(L.in,'to',to);add(L.in,'mua',farmV);
  const hw=S.farm.hired*450;S.money-=hw;add(L.out,'ruong',hw);
  S.biz.forEach(b=>{const pr=b.last?b.last.profit:0;const o=P(b.owner);let mg=0;
    if(b.own==='clan'&&o&&inClan(o)&&pr>0){mg=Math.round(pr*((BIZX[b.type]||{}).mgr||0.15));o.purse+=mg;add(L.out,'quanly',mg)}
    bizFundAdd(b,pr-mg);if(b.own==='clan')add(L.in,'kd',pr)});
  for(const c of alive()){if(!inClan(c))continue;const e=earnOf(c);if(!e)continue;const f=fundOf(c);
    if(f==='clan'){if(isHead(c)){const kp=Math.round(e*hKeep());S.money+=e-kp;c.purse+=kp;add(L.in,'luong',e-kp)}else{const g=Math.round(e*S.gop);S.money+=g;c.purse+=e-g;add(L.in,'gop',g)}}
    else{const g=Math.round(e*(rule('chigop')?0.1:0.05));S.money+=g;S.hh[f].money+=e-g;add(L.in,'chi',g)}}
  for(const id in S.hh){const h=S.hh[id];const mem=alive().filter(p=>p.hh===id&&inClan(p));
    if(!mem.length){if(h.rent&&!h.sold){const r=Math.round(HOMES[h.home].cost*0.004);const o=P(h.owner);if(o&&o.dead==null&&inClan(o))o.purse+=r;else{S.money+=r;add(L.in,'thue',r)}}continue}
    const k=hhFactor(id);
    if(id===main){const up=HOMES[h.home].upkeep;S.money-=up;add(L.out,'nha',up);
      /* v6.4.1.5: người ở doanh trại, đi đày, ở đợ không ăn ở nhà; người đi theo quan thì người làm quan nuôi */
      mem.forEach(p=>{if(p.away&&['army','luuday','odo','jh'].includes(p.away.type))return;const fo=p.away&&p.away.type==='follow'?P(p.away.of):null;
        const s=personalSpend(p);const r=Math.max(0,s.ranh);const vc=Math.min(s.thoi,viceSpend(p)*k);const tot=(s.base+r+s.hoc+s.thoi)*k-vc;
        if(fo&&inClan(fo)&&!isHead(fo)&&fo.dead==null){const sh=selfPay(fo,tot);if(sh)add(L.out,'nuoi',sh)}
        else if(clanKeeps(p)){S.money-=tot;add(L.out,'an',s.base*k);add(L.out,'ranh',r*k);add(L.out,'hoc',s.hoc*k);add(L.out,'thoi',s.thoi*k-vc)}
        else{const sh=selfPay(p,tot);if(sh)add(L.out,'nuoi',sh)}
        if(vc>0){const lk=payVice(p,vc);if(lk)add(L.out,'tat',lk)}})}
    else h.money-=hhExpense(id).total}
  for(const k in CLANOFF){const p=offHolder(k);if(!p)continue;const pay=mm(CLANOFF[k].pay);S.money-=pay;p.purse+=pay;add(L.out,'chuc',pay)}
  if(S.money<0){let got=0;const who=[];alive().filter(p=>inClan(p)&&inMain(p)&&!isHead(p)&&p.purse>mm(0.5)).forEach(p=>{if(S.money>=0)return;const w=(axv(p,'ht')+axv(p,'rong'))/2+relOf(p,head()||p)/5;if(w<45)return;const v=Math.round(Math.min(p.purse*0.3,-S.money));p.purse-=v;S.money+=v;got+=v;who.push(p.given)});
    if(got){add(L.in,'cuu',got);if((S.cuuT||0)<=S.t){S.cuuT=S.t+6;log(`Công quỹ túng thiếu, ${who.slice(0,3).join(', ')}${who.length>3?' và mấy người nữa':''} góp tiền riêng đỡ đần.`,'gd')}}}
  L.net=S.money-m0;S.flow=L;S.lastNet=L.net-farmV;S.lastFarm=farmV;
}
/* tật xấu chỉ tiêu được bằng tiền riêng; hết tiền thì lén lấy của nhà một ít, còn lại là nợ nần, bứt rứt */
function viceSpend(c){const h=HH(c.hh)||HH(mainHH());let v=0;c.habits.forEach(x=>{if(isVice(x))v+=HABITS[x].cost*(1+h.life*0.2)*(0.3+vlv(c,x)/70)});return v*(1+tsum(c,'spend'))}
function payVice(p,v){v=Math.round(v);const t=Math.min(Math.max(0,p.purse),v);p.purse-=t;const short=v-t;if(!short)return 0;
  const leak=Math.min(Math.round(short*0.3),mm(1.5));if(!inMain(p)&&S.hh[p.hh])S.hh[p.hh].money-=leak;else S.money-=leak;
  addStat(p,'tam',-1);if(chance(0.04)&&(p.flags.vleakT||0)<=S.t){p.flags.vleakT=S.t+12;log(`${nameOf(p)} hết tiền riêng, lén lấy tiền nhà để theo thói ${HABITS[viceOf(p)[0]||'bac'].n.toLowerCase()}.`,'hi')}
  return inMain(p)?leak:0}
function selfPay(p,tot){tot=Math.round(tot);const t=Math.min(Math.max(0,p.purse),tot);p.purse-=t;let short=tot-t;
  if(!short){p.anbam=Math.max(0,(p.anbam||0)-0.5);return 0}
  /* thiếu thì lần lượt: vợ chồng; người chưa có việc thì cha mẹ, đã già thì con cháu; cuối cùng mới đến gia tộc */
  const take=(q,fr)=>{if(!q||q.id===p.id||short<=0||!inClan(q)||q.dead!=null||q.hh!==p.hh)return;const t2=Math.min(Math.max(0,q.purse)*(fr||1),short);q.purse-=t2;short-=t2};
  take(spouseOf(p),0.8);
  const working=earnOf(p,true)>0,a=age(p);
  if(short>0&&!working){
    if(a<60)p.parents.forEach(id=>take(P(id),0.6));
    else kidsOf(p).filter(k=>age(k)>=18).forEach(k=>take(k,0.5))}
  if(short>0){S.money-=short;if(a<60)p.anbam=Math.min(24,(p.anbam||0)+1)}
  return short}
/* ước tính một tháng cho trang Cơ ngơi (không đổi gì) */
function econEst(){
  const main=mainHH();const L={in:{},out:{}};const add=(o,k,v)=>{v=Math.round(v);if(v)o[k]=(o[k]||0)+v};
  add(L.in,'tuoc',titlePay());add(L.in,'to',toIncome());add(L.out,'ruong',S.farm.hired*450);
  S.biz.forEach(b=>{if(b.own!=='clan')return;const pr=b.last?b.last.profit:0;add(L.in,'kd',pr);const o=P(b.owner);if(o&&inClan(o)&&pr>0)add(L.out,'quanly',pr*((BIZX[b.type]||{}).mgr||0.15))});
  alive().forEach(c=>{if(!inClan(c))return;const e=earnOf(c,true);if(!e)return;if(fundOf(c)==='clan'){if(isHead(c))add(L.in,'luong',e*(1-hKeep()));else add(L.in,'gop',e*S.gop)}else add(L.in,'chi',e*(rule('chigop')?0.1:0.05))});
  const h=S.hh[main];if(h){add(L.out,'nha',HOMES[h.home].upkeep);const k=hhFactor(main);
    alive().filter(p=>p.hh===main&&inClan(p)).forEach(p=>{const s=personalSpend(p);const r=Math.max(0,s.ranh);const vc=Math.min(s.thoi,viceSpend(p)*k);if(clanKeeps(p)){add(L.out,'an',s.base*k);add(L.out,'ranh',r*k);add(L.out,'hoc',s.hoc*k);add(L.out,'thoi',s.thoi*k-vc)}else{const tot=(s.base+r+s.hoc+s.thoi)*k-vc;if(p.purse<tot*2)add(L.out,'nuoi',Math.max(0,tot-Math.max(0,p.purse)/2))}})}
  for(const k in CLANOFF){if(offHolder(k))add(L.out,'chuc',mm(CLANOFF[k].pay))}
  return L}
const FLOWN={tat:'Người nghiện lén lấy tiền nhà',cuu:'Người nhà góp lúc túng thiếu',tuoc:'Bổng tước',to:'Tô ruộng phát canh',mua:'Thu hoạch',kd:'Lãi cơ sở của gia tộc',luong:'Lương gia chủ',gop:'Người nhà góp quỹ',chi:'Chi phái góp giỗ chạp',thue:'Cho thuê nhà',
  ruong:'Thuê người làm ruộng',quanly:'Lương người trông cơ sở',nha:'Bảo dưỡng nhà chính',an:'Ăn ở (người gia tộc nuôi)',ranh:'Thời gian rảnh (gia tộc nuôi)',hoc:'Học phí',thoi:'Thói quen, sở thích (gia tộc nuôi)',nuoi:'Bù cho người không đủ tiền tự lo',chuc:'Lương chức trong tộc'};

/* ---------- chức trong tộc ---------- */
function offHolder(k){const id=S.coff&&S.coff[k];if(!id)return null;const p=P(id);
  if(!p||p.dead!=null||!inClan(p)||!inMain(p)||isHead(p)||age(p)<16){S.coff[k]=null;if(p&&p.dead==null&&!DRY)log(`${nameOf(p)} thôi giữ chức ${CLANOFF[k].n.toLowerCase()} trong tộc.`);return null}
  return p.away&&p.away.type!=='trade'?null:p}
function offV(k){if(!S.coff)return 0;const id=S.coff[k];const p=id?P(id):null;if(!p||p.dead!=null||p.away)return 0;const [s,v]=CLANOFF[k].need;return Math.max(0,(s==='ql'?skv(p,'ql'):p[s])-v+10)}
const offOk=(p,k)=>{const [s,v]=CLANOFF[k].need;return inClan(p)&&inMain(p)&&!isHead(p)&&age(p)>=18&&!p.away&&(s==='ql'?skv(p,'ql'):p[s])>=v};
const clanFormed=()=>alive().some(p=>(p.gen||1)>=2&&married(p)&&inClan(p));

/* ---------- chi phái ---------- */
function branchName(c){const w=String(c.given||'').split(' ').filter(Boolean);const key=(S.poem!=null&&w.length>1)?w[w.length-1]:(w[0]||'Mới');
  const used=new Set(Object.values(S.hh).map(h=>h.name));let n='Chi '+key;if(used.has(n)&&w.length>1)n='Chi '+w.slice(0,2).join(' ');const sx=['Đông','Tây','Nam','Bắc','Thượng','Hạ','Tiền','Hậu'];let i=0;while(used.has(n)&&i<sx.length)n='Chi '+key+' '+sx[i++];return n} /* v6.7.0: trùng tên thì thêm tên đệm hoặc hướng, không thêm số */
function newBranch(c,home,money){const id='h'+S.t+R(100,999);S.hh[id]={home,life:HH(c.hh)?HH(c.hh).life:1,name:branchName(c),money:money||0,founder:c.id,since:S.t};return id}
function branchLeader(id){const h=S.hh[id];const f=h&&P(h.founder);if(f&&f.dead==null&&f.hh===id&&inClan(f))return f;return alive().filter(p=>p.hh===id&&inClan(p)&&age(p)>=16).sort((a,b)=>a.born-b.born)[0]||null}
const branches=()=>Object.keys(S.hh).filter(id=>id!==mainHH()&&alive().some(p=>p.hh===id&&inClan(p)));
const vacantHomes=()=>Object.keys(S.hh).filter(id=>{const h=S.hh[id];return !h.sold&&h.home>0&&!alive().some(p=>p.hh===id)});
function branchTick(){
  const mainH=HH(mainHH());
  branches().forEach(id=>{const h=S.hh[id];const L=branchLeader(id);if(!L)return;const e=hhExpense(id).total;
    if(h.debt&&S.t>=h.debtT&&h.money>h.debt){h.money-=h.debt;S.money+=h.debt;log(`${h.name} trả đủ ${money(h.debt)} nợ công quỹ.`,'gd');h.debt=0}
    else if(h.debt&&S.t>=h.debtT+24){const hd=head();if(hd)addRel(hd,L,-8);log(`${h.name} khất nợ công quỹ mãi chưa trả.`,'hi');h.debtT=S.t+12}
    if(h.money<0&&h.life>0&&chance(0.2)){h.life--;log(`${h.name} túng thiếu, phải sống ${LIFE[h.life][0].toLowerCase()}.`,'hi')}
    else if(h.money<-Math.max(mm(4),e*3)&&!(h.helpT>S.t)&&head()){h.helpT=S.t+24;enqueue('bhelp',L.id,{hh:id})}
    const tiet=axv(L,'tiet');
    if(h.life<4&&chance(0.06)){const e2=hhExpenseAt(id,h.life+1);if(h.money>e2*(tiet>=60?40:24)){h.life++;log(`${h.name} khấm khá, chuyển sang sống ${LIFE[h.life][0].toLowerCase()}.`,'gd')}}
    const nx=HOMES[h.home+1];const cap=Math.min(mainH.home,HOMES.length-2);
    if(nx&&h.home+1<=cap&&h.money>nx.cost+e*12&&chance(0.04)){h.money-=nx.cost;h.home++;cf(nx.fame*0.3,'Chi phái xây nhà');log(`${h.name} tự bỏ tiền xây ${nx.n.toLowerCase()}.`,'gd')}
    if(h.money>mm(30)&&chance(0.01)&&(axv(L,'rong')>=60||axv(L,'ht')>=65)){const g=Math.round(h.money*0.15);h.money-=g;S.money+=g;cf(2,'Chi phái góp công quỹ');const hd=head();if(hd)addRel(hd,L,6);log(`${h.name} gửi về công quỹ ${money(g)}.`,'gd')}
  })}
function branchHelpPopup(L,id){const h=S.hh[id];const need=Math.round(-h.money+mm(2));
  choicePopup(L,'Chi phái',`${h.name} xin giúp đỡ`,`${esc(L.given)} đến gặp gia chủ, mặt mày khắc khổ. ${esc(h.name)} đang nợ ${money(-h.money)}, chủ nợ đã đến tận cửa. "Xin gia tộc dang tay, chúng con không dám quên ơn."`,[
    {l:`Lấy công quỹ trả nợ cho (${money(need)})`,c:()=>S.money>=need,f:()=>{S.money-=need;h.money+=need;const hd=head();if(hd)addRel(L,hd,12);return `${esc(h.name)} qua cơn hoạn nạn, cả chi cảm kích.`+fx(hd||L,{on:3})}},
    {l:'Cho vay, hẹn ba năm trả',c:()=>S.money>=need,f:()=>{S.money-=need;h.money+=need;h.debt=(h.debt||0)+need;h.debtT=S.t+36;return `${esc(L.given)} nhận khoản vay, hứa ba năm sau trả đủ.`}},
    {l:'Từ chối, bảo tự lo liệu',f:()=>{const hd=head();if(hd)addRel(L,hd,-15);return `${esc(L.given)} lặng lẽ ra về, trong lòng oán trách.`+fx(hd||L,{on:-4})}}]);
}

/* ---------- v6.3.5: gia chủ giữ lại một phần thu nhập làm tiền riêng; chuyển giao gia chủ phải có người nhà đồng thuận ---------- */
const HKEEP=[0,0.1,0.2,0.3];
const hKeep=()=>S.hkeep==null?0.1:S.hkeep;
function handoverOdds(p){
  const hd=head();if(!hd)return 0;
  const fam=alive().filter(x=>inClan(x)&&inMain(x)&&age(x)>=18&&!x.away&&x.id!==hd.id&&x.id!==p.id);
  const trust=fam.length?fam.reduce((a,x)=>a+relOf(x,hd),0)/fam.length:25;
  let q=0.30+clamp((hd.fame||0)/500,0,0.25)+clamp(trust/250,-0.2,0.25)      /* gia chủ hiện tại được tin đến đâu */
    +clamp((p.fame||0)/600,0,0.18)+((p.eq+p.tri+skv(p,'ql'))/3-50)/180        /* người nhận có danh vọng, có tài */
    +(axv(p,'tv')-50)/400;                                                     /* người nhận có muốn gánh không */
  const rivals=fam.filter(x=>x.id!==p.id&&((x.oan||0)>=30||(axv(x,'tv')>=65&&((x.fame||0)>(p.fame||0)||age(x)>age(p)))));
  q-=Math.min(0.28,rivals.length*0.07);
  const hc=heirCands();const mh=hc.filter(x=>x.g==='nam');const eldest=(mh.length?mh:hc).slice().sort((a,b)=>a.born-b.born)[0];
  if(rule('truongau')&&eldest&&eldest.id!==p.id&&eldest.id!==hd.id)q-=0.15;
  if(age(p)<25)q-=0.12;if(p.inLaw)q-=0.15;if(S.on<35)q-=0.08;
  const W=hd.will;if(W&&W.heir===p.id)q+=0.12;
  return clamp(q,0.05,0.95)}
function handoverPopup(p){
  const hd=head();if(!hd||!inClan(p)||p.id===hd.id)return;
  const wait=(S.headT||0)-S.t;
  if(wait>0){confirmBox('Chuyển giao gia chủ',`Việc nhà vừa mới xáo trộn. Phải đợi thêm ${wait} tháng nữa người nhà mới chịu bàn lại chuyện giao quyền.`,'Thôi',closeModal,closeModal);return}
  const q=handoverOdds(p);
  const word=q>=0.75?'người nhà phần lớn sẽ ủng hộ':q>=0.55?'đa số có thể đồng thuận':q>=0.35?'còn nhiều người chần chừ':'rất khó được người nhà chấp thuận';
  choicePopup(hd,'Chuyển giao gia chủ',`Giao quyền gia chủ cho ${p.given}?`,
    `${esc(hd.given)} muốn giao quyền cho ${esc(nameOf(p))}. Việc này phải họp họ, người nhà nhìn vào danh vọng và sự tin cậy của gia chủ hiện tại, tài năng và danh vọng của người nhận, và những người khác trong nhà cũng muốn ngôi ấy. Theo tình hình, ${word}. Giao rồi, ${esc(p.given)} nắm công quỹ, đặt gia quy, phân xử việc nhà; ${esc(hd.given)} lui về làm người thường, giữ nguyên tiền riêng và chức tước.`,[
    {l:'Họp họ, chính thức trao quyền',f:()=>{
      if(chance(q)){S.lastHead=null;becomeHead(p);sel=p.id;centerNext=true;S.headT=S.t+36;S.on=clamp(S.on+2,0,100);
        log(`${nameOf(hd)} trao quyền gia chủ cho ${nameOf(p)} trước cả họ.`,'gd');afterHeir(p);newHeadRules(p);
        return `Cả họ đứng dậy, ${esc(p.given)} nhận ấn gia chủ từ tay ${esc(hd.given)}.`}
      S.headT=S.t+12;S.on=clamp(S.on-3,0,100);addStat(p,'tam',-5);cf(-1,'Họp họ giao quyền không thành');
      return `Họp họ không thành. Có người nói ${esc(p.given)} chưa đủ tin cậy, có người đòi ngôi ấy về mình. ${esc(hd.given)} vẫn là gia chủ, nhưng lời nói bớt nặng đi ít nhiều.`}},
    {l:'Thôi, để dịp khác',f:()=>''}]);
}
function headGopPopup(c){
  const v=Math.max(0,c.purse);if(!v)return;
  const opts=[0.25,0.5,1].map(fr=>({l:fr===1?`Góp hết (${money(v)})`:`Góp ${Math.round(fr*100)}% (${money(Math.round(v*fr))})`,f:()=>{const g=Math.round(v*fr);c.purse-=g;S.money+=g;c.flags.hgT=S.t+12;log(`Gia chủ ${nameOf(c)} góp ${money(g)} tiền riêng vào công quỹ.`,'gd');return `${money(g)} vào công quỹ, phần còn lại ${esc(c.given)} giữ làm của riêng.`}}));
  opts.push({l:'Giữ lại hết, không góp',f:()=>''});
  choicePopup(c,'Tiền riêng gia chủ',`Góp tiền riêng vào công quỹ?`,`${esc(c.given)} đang có ${money(v)} tiền riêng. Của riêng của gia chủ là của riêng: giữ lại tiêu dùng cá nhân, làm tài sản, để lại cho con cháu cũng được. Tự nguyện góp thì công quỹ rộng thêm.`,opts)}

/* ---------- gia chủ mới đang ở riêng thì về nhà chính ---------- */
function becomeHead(p){
  const old=mainHH();S.head=p.id;headBSync();
  if(p.pst||followers(p).length){unpostFol(p);p.pst=null}
  if(p.hh===old||!S.hh[old])return;
  const from=p.hh;const sp=spouseOf(p);
  const movers=alive().filter(x=>x.hh===from&&(x===p||x===sp||((x.parents.includes(p.id)||(sp&&x.parents.includes(sp.id)))&&(!married(x)||age(x)<18))));
  movers.forEach(x=>x.hh=old);
  log(`${nameOf(p)} dọn về nhà chính để lo việc gia tộc.`,'gd');
  const h=S.hh[from];
  if(!alive().some(x=>x.hh===from)){if(h.money>0)p.purse+=h.money;else S.money+=h.money;h.money=0;h.owner=p.id;if(h.home>0)enqueue('vacant',p.id,{hh:from},true)}
}
/* v6.6.0: chi họ đã hết người: tiền còn lại về quỹ, nhà không ai giữ thì bán lại, không để nằm im mãi */
function hhSweep(){const main=mainHH();for(const id in S.hh){if(id===main)continue;const h=S.hh[id];if(!h||alive().some(p=>p.hh===id&&inClan(p)))continue;
  if(h.money>0){const v=Math.round(h.money);S.money+=v;h.money=0;log(`Tiền còn lại của ${h.name} (${money(v)}) được thu về quỹ gia tộc.`)}else if(h.money<0)h.money=0;
  if(!h.sold&&!h.keep&&!h.rent&&HOMES[h.home]&&h.home>0){const pr=Math.round(HOMES[h.home].cost*0.5);S.money+=pr;h.sold=1;log(`Nhà cũ của ${h.name} bỏ trống, gia tộc bán lại được ${money(pr)}.`)}}}
function vacantPopup(c,id){const h=S.hh[id];if(!h){setTimeout(nextPopup,0);return}const H=HOMES[h.home];const price=Math.round(H.cost*0.6*(S.war?0.8:1));const rent=Math.round(H.cost*0.004);
  choicePopup(c,'Nhà cũ',`${h.name} để trống`,`Cả nhà đã dọn về nhà chính. ${H.n} của ${esc(h.name)} bỏ không. Nhà là của riêng ${esc(c.given)}, muốn xử thế nào tùy ý.`,[
    {l:`Bán đi (${money(price)})`,f:()=>{h.sold=1;c.purse+=price;log(`${nameOf(c)} bán ${H.n.toLowerCase()} cũ được ${money(price)}.`);return `Bán được ${money(price)}, tiền vào túi riêng của ${esc(c.given)}.`}},
    {l:`Cho thuê (${money(rent)}/tháng)`,f:()=>{h.rent=1;return 'Cho người ngoài thuê, tháng tháng thu tiền vào túi riêng.'}},
    {l:'Giữ lại cho con cháu, anh em sau này',f:()=>{h.keep=1;return 'Khóa cửa cẩn thận, nhờ hàng xóm trông giùm. Sau này con cháu hay anh em ra ở riêng có thể xin về ở.'}}]);
}

/* ---------- của chung, của riêng: thưởng, góp quỹ, xin cha mẹ ---------- */
function achieve(c,what){if(!c||!inClan(c)||isHead(c)||age(c)<12||DRY)return;if((c.flags.rwT||0)>S.t)return;c.flags.rwT=S.t+12;if(head())enqueue('reward',c.id,{what})}
function rewardPopup(c,what){const hd=head();if(!hd){setTimeout(nextPopup,0);return}
  const big=mm(8),mid=mm(3);
  choicePopup(hd,'Khen thưởng',`${c.given} ${what||'lập được thành tựu'}`,`Gia tộc chỉ thưởng khi có công. ${esc(nameOf(c))} ${esc(what||'vừa làm rạng danh dòng họ')}. Thưởng gì là quyền của gia chủ.`,[
    {l:`Thưởng hậu (${money(big)})`,c:()=>S.money>=big,f:()=>{S.money-=big;c.purse+=big;addRel(c,hd,10);cheer(c,10,12);cf(2,'Gia tộc khen thưởng');return `${esc(c.given)} nhận thưởng trước mặt cả họ, ai cũng nể.`}},
    {l:`Thưởng vừa phải (${money(mid)})`,c:()=>S.money>=mid,f:()=>{S.money-=mid;c.purse+=mid;addRel(c,hd,5);cheer(c,6,9);return `${esc(c.given)} vui vẻ nhận thưởng.`}},
    {l:'Khen trước từ đường, không thưởng tiền',f:()=>{addRel(c,hd,3);cheer(c,4,6);c.fame+=2;return `Tên ${esc(c.given)} được đọc trước bàn thờ tổ tiên.`}},
    {l:'Việc nên làm, không cần thưởng',f:()=>{addRel(c,hd,-4);cheer(c,-4,6);return `${esc(c.given)} có phần chạnh lòng.`}}]);
}
function askGopPopup(c){const hd=head();if(!hd)return;const p=Math.max(0,c.purse);
  const w=clamp(0.3+(axv(c,'ht')-50)/120+(axv(c,'rong')-50)/120+relOf(c,hd)/250-(axv(c,'tiet')>70?0.1:0),0.05,0.95);
  const go=fr=>()=>{c.flags.gopT=S.t+12;const v=Math.round(p*fr);
    if(chance(fr>0.3?w-0.15:w)){c.purse-=v;S.money+=v;addRel(c,hd,fr>0.3?-2:1);if(v>=mm(10))cf(1,'Người nhà góp công quỹ');log(`${nameOf(c)} góp ${money(v)} vào công quỹ.`,'gd');return `${esc(c.given)} gật đầu, đem ${money(v)} góp vào công quỹ.`}
    addRel(c,hd,-6);return `${esc(c.given)} khéo từ chối: "Con còn phải lo cho vợ con, cho con giữ lại ít."`+fx(c,{tam:-2})};
  choicePopup(hd,'Công quỹ',`Xin ${c.given} góp công quỹ`,`${esc(c.given)} có ${money(p)} tiền riêng. Góp hay không là quyền của người ấy. Người hiếu thuận, rộng lượng, thân với gia chủ thì dễ gật đầu.`,[
    {l:`Xin một phần năm (${money(p*0.2)})`,f:go(0.2)},{l:`Xin một nửa (${money(p*0.5)})`,f:go(0.5)},{l:'Thôi, không xin nữa',f:()=>''}]);
}
function askParentPopup(c){const par=S.people.filter(p=>c.parents.includes(p.id)&&p.dead==null&&inClan(p)&&p.purse>0).sort((a,b)=>b.purse-a.purse)[0];if(!par)return;
  const v=Math.round(Math.min(par.purse*0.3,mm(6)));const w=clamp(0.35+relOf(par,c)/200+(axv(par,'rong')-50)/150-(c.anbam>6?0.2:0),0.05,0.95);
  choicePopup(c,'Tiền riêng',`Xin ${par.g==='nam'?'cha':'mẹ'} giúp`,`${esc(c.given)} ngỏ ý xin ${esc(par.given)} giúp ít tiền. Cha mẹ cho được nhưng có giới hạn, mỗi năm chỉ một lần.`,[
    {l:`Xin ${money(v)}`,f:()=>{c.flags.xinT=S.t+12;if(chance(w)){par.purse-=v;c.purse+=v;addRel(c,par,4);return `${esc(par.given)} thở dài rồi dúi vào tay ${money(v)}: "Lần này thôi đấy."`}addRel(c,par,-3);return `${esc(par.given)} lắc đầu: "Lớn rồi, phải tự lo lấy."`+fx(c,{tam:-3})}},
    {l:'Thôi, tự lo được',f:()=>fx(c,{tam:1})}]);
}
function yearEcon(){
  const hd=head();
  alive().filter(c=>inClan(c)&&inMain(c)&&!isHead(c)&&c.purse>mm(20)).forEach(c=>{
    if((axv(c,'rong')>=62||axv(c,'ht')>=68)&&chance(0.15)){const v=Math.round(c.purse*0.2);c.purse-=v;S.money+=v;if(hd)addRel(hd,c,4);cf(1,'Người nhà tự nguyện góp quỹ');log(`${nameOf(c)} tự nguyện góp ${money(v)} vào công quỹ.`,'gd')}});
  const F=S.farm;const n=(F.lease||0)+F.fief;
  if(n){const T=TOLV[F.to];if(T[2])cf(T[2]*n/10,'Tô ruộng: '+T[0].toLowerCase());
    if(hd&&F.to===2&&chance(Math.min(0.5,0.12*n/10)))enqueue('ev',hd.id,{ev:'v61_ta_dien_tron'});
    if(hd&&F.to===0&&chance(Math.min(0.4,0.08*n/10)))enqueue('ev',hd.id,{ev:'v61_ta_dien_on'});
    if(hd&&S.disaster&&F.to>=1&&chance(0.5))enqueue('ev',hd.id,{ev:'v61_ta_dien_xin_giam'})}
  const td=offHolder('tudu');if(td)cf(1+offV('tudu')/15,'Từ đường lo hương khói');
}

/* ---------- bán, mở sản nghiệp ---------- */
function bizValue(b){const B=BIZ[b.type];let v=0;for(let i=0;i<=b.lv;i++)v+=B.lv[i][1];const pr=b.last?b.last.profit:0;
  return Math.round(v*0.55*(S.war?0.75:1)*clamp(0.8+pr/Math.max(1,B.lv[b.lv][2])*0.8,0.6,1.3))}
function sellBiz(b){const v=bizValue(b);const B=BIZ[b.type];S.biz=S.biz.filter(x=>x!==b);bizFundAdd(b,v);const o=P(b.owner);
  if(o&&o.biz===b.id){if(!unChu(o)&&inClan(o)&&age(o)<60)enqueue('job',o.id)}
  log(`Bán ${B.lv[b.lv][0].toLowerCase()} được ${money(v)}, tiền về ${bizOwnName(b).toLowerCase()}.`,'gd')}
function openBizPopup(c,type){const L0=BIZ[type].lv[0];const cost=L0[1];const src=[];
  if((inMain(c)||isHead(c))&&S.money>=cost)src.push(['clan','Công quỹ bỏ vốn','Cơ sở là của gia tộc, lãi vào công quỹ. Người trông được trả 15% lãi.']);
  if(!inMain(c)&&S.hh[c.hh]&&S.hh[c.hh].money>=cost)src.push([c.hh,`${S.hh[c.hh].name} bỏ vốn`,'Cơ sở là của hộ, lãi vào quỹ hộ, ra riêng vẫn mang theo.']);
  if(!isHead(c)&&c.purse>=cost)src.push(['p:'+c.id,`${c.given} tự bỏ tiền riêng`,'Cơ sở là của riêng người này, lãi vào tiền riêng.']);
  if(!src.length)return;
  if(src.length===1){openBiz(c,type,src[0][0]);return}
  choicePopup(c,'Kinh doanh',`Mở ${L0[0].toLowerCase()}`,`Vốn ${money(cost)}. Ai bỏ vốn thì sản nghiệp là của người đó.`,src.map(([own,l,s])=>({l,s,f:()=>{openBiz(c,type,own);return `Khai trương ${esc(L0[0].toLowerCase())}.`}})));
}
const canOpenAny=(c,cost)=>((inMain(c)||isHead(c))&&S.money>=cost)||(!inMain(c)&&S.hh[c.hh]&&S.hh[c.hh].money>=cost)||(!isHead(c)&&c.purse>=cost);

/* ---------- vào nghề theo năng lực, kinh nghiệm, sách truyền ---------- */
/* v6.4.1.1: tàng thư theo hộ. Sách viết ở đâu thì để ở đó (nhà chính hoặc chi họ); chỉ người cùng hộ được hưởng.
   Hộ không còn ai (đã nhập về nhà chính hoặc tuyệt) thì sách của hộ ấy về nhà chính. */
function bookSweep(){const L=S.books||[];if(!L.length)return L;const mh=mainHH();
  L.forEach(b=>{if(!b.hh||!S.hh[b.hh]||!alive().some(p=>p.hh===b.hh&&inClan(p)))b.hh=mh});return L}
const booksOf=hh=>bookSweep().filter(b=>b.hh===hh);
const bookLv=(id,c)=>booksOf(c?c.hh:mainHH()).filter(b=>b.job===id).reduce((m,b)=>Math.max(m,b.lv),0);
function expOf(c,id){return Math.max(c.pre[id]||0,(c.mexp&&c.mexp[id])||0,bookLv(id,c)*0.4)}
function startLv(c,id){const J=JOBS[id];let best=0;const e=expOf(c,id);
  for(let i=1;i<J.lv.length;i++){const q=J.lv[i].req||{};let ok=true;
    for(const k in q){const v=q[k];if(k==='land'||k==='flag'){ok=false;break}
      if(k==='m'){if(e<v*0.8){ok=false;break}}else if(k==='fame'){if(c.fame<v){ok=false;break}}else if(k==='degree'){if(c.degree<v){ok=false;break}}else if((c[k]||0)<v){ok=false;break}}
    if(ok)best=i;else break}
  return Math.min(best,2)}

/* ---------- cấp trên tự tăng lương, đề bạt ---------- */
const EMPLOYEE=c=>{const J=JOBS[c.job];return J&&J.inc>0&&!['chu','quan','quan_ngu','hiep','nong','noi','huu','none','vua','nguy'].includes(c.job)&&!selfEmp(c)};
function bossTick(){alive().forEach(c=>{if(!inClan(c)||c.away||age(c)<16||!EMPLOYEE(c))return;const J=JOBS[c.job];
  const p=0.004*(c.m/60)*(c[J.st]/60)*cond(c);if((c.flags.braiseT||0)<=S.t&&chance(p)){c.flags.braiseT=S.t+18;enqueue('braise',c.id)}})}
function bossRaisePopup(c){const J=JOBS[c.job];const boss=EMPLOYER[c.job]||'cấp trên';const promo=c.job!=='nguy'&&canPromote(c);
  const opts=[{l:'Cảm tạ, càng ra sức làm',f:c=>`${esc(boss.charAt(0).toUpperCase()+boss.slice(1))} gật gù hài lòng.`+fx(c,{bonus:0.1,m:1,tam:5})},
    {l:'Xin nhường phần thưởng cho người dưới',f:c=>'Người dưới quý, cấp trên càng tin.'+fx(c,{bonus:0.04,fame:4,eq:1,ax:{rong:3}})},
    {l:'Nhân dịp xin thêm',r:[{khau:0.6,eq:0.4},62],y:c=>'Được tăng hẳn một mức lớn.'+fx(c,{bonus:0.18,tam:6}),n:c=>'Cấp trên phật ý: "Được đằng chân lân đằng đầu."'+fx(c,{bonus:0.05,tam:-4})}];
  if(promo)opts.unshift({l:`Nhận lời đề bạt lên ${J.lv[c.lv+1].n.toLowerCase()}`,f:c=>{achieve(c,`được đề bạt lên ${J.lv[c.lv+1].n.toLowerCase()}`);return `Được đề bạt làm ${esc(J.lv[c.lv+1].n.toLowerCase())}.`+fx(c,{lv:1,fame:3+c.lv*2,tam:8})}});
  choicePopup(c,'Công việc',promo?'Được cấp trên đề bạt':'Cấp trên tăng tiền công',`${esc(c.given)} làm ${esc(J.lv[c.lv].n.toLowerCase())} chăm chỉ, tay nghề đã ${Math.floor(c.m)}. ${esc(boss.charAt(0).toUpperCase()+boss.slice(1))} để ý từ lâu, nay ${promo?'muốn cất nhắc lên chức cao hơn':'tự tăng tiền công mà không cần xin'}.`,opts);
}

/* ---------- sinh con theo ý cả hai vợ chồng ---------- */
function kidWish(c){const a=age(c);let w=c.kidW==null?55:c.kidW;const n=kidsOf(c).filter(k=>k.dead==null).length;
  w+=n===0?22:n===1?18:n===2?12:n===3?6:n===4?0:-(n-4)*12;
  if(a>38)w-=(a-38)*3;if(a<19)w-=10;
  w+=(axv(c,'ht')-50)*0.3;
  if(c.g==='nam'&&n&&!kidsOf(c).some(k=>k.g==='nam'&&k.dead==null))w+=8;
  if(fundGet(fundOf(c))<0)w-=15;const h=HH(c.hh);if(h&&h.life===0)w-=10;
  if(c.kidAdj&&c.kidAdj.until>S.t)w+=c.kidAdj.v;
  if((c.flags.griefUntil||0)>S.t)w-=20;
  if(n>=kidCap())w-=10+Math.round(30*obey(c)/100);if(rule('dongcon'))w+=8;
  return clamp(Math.round(w),0,100)}
const wantsKid=c=>kidWish(c)>=55;
function kidAdj(c,v,mo){const sp=spouseOf(c);[c,sp].forEach(x=>{if(x)x.kidAdj={v,until:S.t+(mo||36)}})}
function persuadeKids(c,v){const hd=head();const sp=spouseOf(c);if(!hd||!sp)return;c.flags.kidT=S.t+12;
  const p=prob(hd,{eq:0.5,khau:0.5},48+(axv(c,'dl')+axv(sp,'dl'))/8);
  if(chance(p)){kidAdj(c,v,36);log(`Gia chủ ${v>0?'khuyên':'can'} vợ chồng ${c.given} ${v>0?'sớm sinh con':'tạm hoãn chuyện con cái'}, hai người nghe theo.`);return true}
  addRel(c,hd,-4);addRel(sp,hd,-4);log(`Vợ chồng ${c.given} không muốn gia chủ xen vào chuyện con cái.`,'hi');return false}

/* ---------- thời gian rảnh theo ý từng người ---------- */
const hashN=s=>{let h=0;for(const ch of String(s))h=(h*31+ch.charCodeAt(0))|0;return Math.abs(h)};
function focusCost(c,k){const F=FOCUS[k];const h=HH(c.hh)||HH(mainHH());return F.cost>0?F.cost*(1+h.life*0.25):0}
function affordFocus(c,k){const v=focusCost(c,k);if(!v)return true;
  if(!inMain(c)&&S.hh[c.hh])return S.hh[c.hh].money>v*6;
  if(clanKeeps(c))return S.money>v*12;
  return c.purse>v*3}
/* v6.3.4: lúc rảnh mà làm đúng việc mình thích thì lớn nhanh hơn, vui hơn, kiếm thêm khá hơn một chút */
const loveNow=c=>age(c)>=6&&!c.away&&!c.brk&&c.focus===prefFocus(c);
function prefFocus(c){const a=age(c);const A=k=>axv(c,k);const poor=!clanKeeps(c)&&c.purse<mm(1);
  const job=c.job;const keep=['nghi','hoc','vo','ren','cam','phat','giup'];
  const sc={
    nghi:(100-A('cc'))*0.5+(a>55?25:0)+(c.suc<40?25:0),
    hoc:c.tri*0.4+A('cc')*0.3+A('yc')*0.2+(['su','thulai','quan','y'].includes(job)||c.exam?20:0),
    vo:c.vo*0.5+A('gan')*0.3+(['tieu','quan_ngu','nhadich','hiep'].includes(job)?15:0),
    ren:(c.cap.suc-c.suc)*0.6+A('yc')*0.2,
    nghe:(income(c)>0||job==='chu'?A('cc')*0.4+A('tv')*0.4:-50),
    giao:A('hd')*0.45+c.mi*0.25+(100-A('tiet'))*0.2-10,
    cam:c.mi*0.35+c.tri*0.2+A('thanh')*0.15,
    phat:A('diem')*0.35+A('thanh')*0.25+(a>50?15:0),
    du:(100-A('diem'))*0.2+A('dl')*0.3+c.duyen*0.2-15,
    lac:(100-A('tiet'))*0.55+(100-A('cc'))*0.3-35,
    muu:skv(c,'muu')*0.4+c.tri*0.3,
    so:skv(c,'ql')*0.5+A('cc')*0.2,
    bien:skv(c,'khau')*0.5+A('hd')*0.2,
    giup:(S.farm.own+S.farm.rent>0?A('ht')*0.4+A('cc')*0.3:-50)};
  Object.keys(FOCUS).forEach(k=>{if(FOCUS[k].side)sc[k]=A('cc')*0.35+(poor?35:0)+(HH(c.hh)&&HH(c.hh).life<=1?12:0)+(['nong','none','noi','hau'].includes(job)?12:0)-(sideNow({focus:k})?0:30)});
  if(sc.cui!=null)sc.cui+=c.vo*0.1;if(sc.phu!=null)sc.phu+=c.vo*0.1+c.suc*0.05;if(sc.dan!=null)sc.dan+=(c.g==='nữ'?10:0)+skv(c,'ky')*0.1;if(sc.buonnho!=null)sc.buonnho+=skv(c,'khau')*0.15+(c.purse>=mm(2)?5:-30);if(sc.ca!=null)sc.ca+=(REG().coast?10:0);
  let best='nghi',bv=-1e9;
  for(const k in sc){if(!FOCUS[k])continue;if(a<12&&!keep.includes(k))continue;if(a<16&&['giao','lac','du','thue','phu'].includes(k))continue;if(k==='thue'&&['quan','nguy','quan_ngu','chu','vua'].includes(job))continue;if(!affordFocus(c,k))continue;
    const v=sc[k]+(hashN(c.id+k+Math.floor(S.t/36))%18);if(v>bv){bv=v;best=k}}
  return best}
function focusHold(c){return clamp(Math.round(6+obey(c)/5+(axv(c,'ht')-50)/8-(axv(c,'dl')-50)/8),3,30)}
function focusTick(c){const a=age(c);if(a<6||(c.away&&c.away.type!=='army')||c.brk)return;
  if(c.focusUntil&&S.t>=c.focusUntil){const p=prefFocus(c);c.focusUntil=0;if(p!==c.focus){const o=c.focus;c.focus=p;if(a>=10&&inClan(c))log(`${nameOf(c)} chán ${FOCUS[o].n.toLowerCase()}, lại quay về ${FOCUS[p].n.toLowerCase()}.`)}return}
  if(!affordFocus(c,c.focus)){const o=c.focus;c.focus=prefFocus(c);c.focusUntil=0;if(o!==c.focus&&a>=12&&inClan(c))log(`${nameOf(c)} hết tiền theo ${FOCUS[o].n.toLowerCase()}, chuyển sang ${FOCUS[c.focus].n.toLowerCase()}.`);return}
  if(!c.focusUntil&&(S.t+hashN(c.id))%6===0)c.focus=prefFocus(c)}
function setFocus(c,k){c.focus=k;const p=prefFocus(c);c.focusUntil=k===p?0:S.t+focusHold(c)}

/* ---------- đột phá chỉ số 100: một quá trình nhiều tháng ---------- */
function vget(c,k){return SN[k]?(c[k]||0):AXN[k]?axv(c,k):SKN[k]?skv(c,k):k==='duyen'?c.duyen:0}
function brkScore(c,sp){let s=0,w=0;for(const k in sp){s+=vget(c,k)*sp[k];w+=sp[k]}return w?s/w:50}
function brkAgeOk(c,p){const a=age(c);if(p.age&&(a<p.age[0]||a>p.age[1]))return false;if(FAR_RE.test(p.l+' '+(p.d||''))&&(a<16||a>=65))return false;if(p.cost&&a<16)return false;return true}
/* v6.4.1.7: mỗi mốc có những con đường riêng (p.gate); mốc 100 dùng các con đường cũ */
function brkPaths(c,k,t){t=t||100;const L=(BRK100[k]||[]).filter(p=>!p.hidden&&(!p.job||p.job.includes(c.job))&&(!p.ax||axv(c,p.ax[0])>=p.ax[1])&&brkAgeOk(c,p)&&(p.gate?p.gate===Math.min(t,140):t<=100||p.age));
  const sc=p=>brkScore(c,p.sp)+(p.job?25:0)+(p.age?40:0)+hashN(c.id+p.id)%22;return L.sort((a,b)=>sc(b)-sc(a)).slice(0,3)}
function brkStart(c,k,p,g){g=g||gateCap(c,k);const mo=Math.round(R(p.mo[0],p.mo[1])*(g>=150?1:g>=140?1.3:g>=120?1.15:1));c.brk={k,id:p.id,start:S.t,end:S.t+mo,prog:0,mid:0,gate:g};if(p.cost)charge(c,mm(p.cost));
  log(`${nameOf(c)} bắt đầu ${p.l.toLowerCase()}, dự kiến ${mo} tháng.`,'gd');return `Dự kiến mất ${mo} tháng. Thành hay bại do cả quá trình: tâm trạng, sức khỏe và căn cơ mỗi tháng đều góp phần.`}
function brkTick(c){const b=c.brk;if(!b||b.done)return;const p=(BRK100[b.k]||[]).find(x=>x.id===b.id);if(!p){c.brk=null;return}
  const dur=Math.max(1,b.end-b.start);const s=brkScore(c,p.sp);
  b.prog+=(s/80)*(100/dur)*(0.6+0.6*c.tam/100)*(0.7+0.3*Math.min(1,c.suc/70))*(1+tsum(c,'brk')/40)*(0.6+Math.random()*0.8)*({100:1,120:.85,140:.72,150:.6}[b.gate||100]||1);
  if(!b.mid&&S.t>=b.start+Math.floor(dur/2)){b.mid=1;enqueue('brkmid',c.id)}
  if(S.t>=b.end){b.done=1;enqueue('brkend',c.id)}}
const BRK_MID={tri:['đọc mãi một đoạn mà không thông','chữ nghĩa như rối thành một mớ'],vo:['một chiêu luyện mãi vẫn vướng','gân cốt đau nhức, tay chân nặng trĩu'],suc:['người mệt rã, ăn không ngon','khí huyết lúc thịnh lúc suy'],mi:['soi gương thấy mình vẫn thế','người ta khen chê lẫn lộn'],eq:['lòng người khó đoán hơn tưởng','có kẻ lợi dụng lòng tốt']};
function brkMidPopup(c){const b=c.brk;if(!b){setTimeout(nextPopup,0);return}const p=BRK100[b.k].find(x=>x.id===b.id);const pct=Math.round(b.prog);
  choicePopup(c,'Đột phá',`Giữa chừng: ${p.l.toLowerCase()}`,`Đã qua nửa chặng. ${esc(c.given)} ${pick(BRK_MID[b.k])}. Tự thấy mình đi được khoảng ${pct>=55?'hơn nửa':pct>=40?'gần nửa':'chưa tới nửa'} con đường.`,[
    {l:'Giữ nhịp như cũ',f:c=>'Không nóng vội, từng bước một.'+fx(c,{tam:1})},
    {l:'Dốc toàn lực',f:c=>{b.prog+=R(10,18);return 'Thức khuya dậy sớm, người gầy rộc đi.'+fx(c,{suc:-R(6,12),tam:-5})}},
    {l:'Nghỉ ít lâu cho lại sức',f:c=>{b.end+=R(2,4);return 'Lùi lại vài tháng, đầu óc thư thái hơn.'+fx(c,{tam:8,suc:5})}},
    {l:'Bỏ dở',f:c=>{c.brk=null;c.ms[b.k]=(c.ms[b.k]||[]).filter(x=>x!==100);c.msRetry[b.k]=S.t+R(24,48);if(c.msQ)c.msQ[b.k]=null;return 'Thấy chưa phải lúc, gác lại.'+fx(c,{tam:-4})}}]);
}
function brkEndPopup(c){const b=c.brk;if(!b){setTimeout(nextPopup,0);return}const p=BRK100[b.k].find(x=>x.id===b.id);const N=SN[b.k];
  const score=b.prog+c.duyen/12+R(-8,8);c.brk=null;const g=b.gate||100;
  if(score>=100){const T=window.D.TRAITS[p.gain];let extra='';c.gate=c.gate||{};c.g200=c.g200||{};
    if(g===150){c.g200[b.k]=1;c.gate[b.k]=200}else c.gate[b.k]=nextGate(g);if(c.msQ)c.msQ[b.k]=null;
    if(b.k==='suc'){c.cap.suc=Math.min(hardCap(c,'suc'),Math.max(c.cap.suc,g)+R(3,6))}
    if(p.gain&&!has(c,p.gain)){addTrait(c,p.gain);extra=` Được đặc tính <b>${T.n}</b>: ${esc(T.d.toLowerCase())}.`}
    extra+=g===150?` Phàm nhân chỉ đến 150, nay giới hạn ${N.toLowerCase()} mở tới 200.`:` Giới hạn ${N.toLowerCase()} mở tới ${c.gate[b.k]}.`;
    achieve(c,`vượt ngưỡng ${N.toLowerCase()} ${g}`);
    return infoPopup(c,'Đột phá',`${N} vượt ngưỡng`,`Sau ${b.end-b.start} tháng ${esc(p.l.toLowerCase())}, ${esc(c.given)} ngộ ra điều trước giờ chưa thấy.${extra}`+fx(c,{[b.k]:R(4,9),over:1,fame:8+Math.round(score-100)/2,tam:10}))}
  c.ms[b.k]=(c.ms[b.k]||[]).filter(x=>x!==100);c.msRetry[b.k]=S.t+R(18,36);if(c.msQ)c.msQ[b.k]=null;if(g===150&&c.flags)c.flags['tc_'+b.k]=0;
  const hurt=['vo','suc'].includes(b.k)&&chance(0.3);
  infoPopup(c,'Đột phá',`${N}: chưa thành`,`${b.end-b.start} tháng ${esc(p.l.toLowerCase())} rốt cuộc không đủ. ${score>=85?'Chỉ còn cách một bước chân.':'Còn xa lắm.'} Một hai năm nữa có thể thử lại bằng con đường khác.`+fx(c,{tam:-8,...(hurt?{suc:-R(8,15),hpMax:-R(1,3)}:{})}))}

/* ---------- mừng thọ ---------- */
function thoPopup(c,a){const big=a>=100;const T=THO[a]||'Mừng thọ';const f=fundOf(c);const kids=kidsOf(c).filter(k=>inClan(k)&&k.dead==null);
  const pool=kids.reduce((s,k)=>s+Math.max(0,k.purse)*0.25,0);const hi=mm(big?20:3+a/20),lo=mm(big?6:1);const exp=EXPECT[tierIdx()];
  const all=()=>alive().filter(p=>inClan(p)&&p.id!==c.id);
  choicePopup(c,'Mừng thọ',`${T}: ${c.given} tròn ${a} tuổi`,`Con cháu sửa soạn mừng thọ ${esc(nameOf(c))}. ${big?'Trăm tuổi là chuyện hiếm có, cả vùng đều biết.':'Người xưa nói "nhân sinh thất thập cổ lai hy", sống lâu là phúc của cả nhà.'}`,[
    {l:`Mở đại tiệc linh đình (${money(hi)})`,c:()=>fundGet(f)>=hi,f:c=>{fundAdd(f,-hi);all().forEach(p=>addRel(p,c,3));if(big&&S.fame>=200&&chance(0.6)){const g=mm(15);S.money+=g;cf(30,'Triều đình ban chiếu khen người trăm tuổi');return `Khách khứa đông nghịt. Quan huyện mang chiếu vua đến khen, ban ${money(g)} lụa vàng.`+fx(c,{tam:20,fame:30,cfame:10})}return 'Cỗ bàn bày khắp sân, khách đến chúc không ngớt.'+fx(c,{tam:15,fame:big?20:8,cfame:big?12:3+exp})}},
    {l:`Con cháu góp tiền riêng làm (${money(pool)})`,c:()=>pool>=lo,f:c=>{kids.forEach(k=>{const v=Math.max(0,k.purse)*0.25;k.purse-=v;addRel(k,c,6);addRel(c,k,6)});return 'Mỗi người góp một ít, tiệc tuy không lớn nhưng ấm cúng, cha mẹ cảm động.'+fx(c,{tam:14,fame:4,cfame:2})}},
    {l:`Làm vừa phải trong nhà (${money(lo)})`,c:()=>fundGet(f)>=lo,f:c=>{fundAdd(f,-lo);return 'Con cháu quây quần, dâng rượu chúc thọ.'+fx(c,{tam:8,fame:2})}},
    {l:'Đơn sơ, thắp nén hương báo tổ tiên',f:c=>'Không bày vẽ.'+fx(c,{tam:2,...(exp>=2?{cfame:-(exp*2)}:{})})}]);
}

/* ---------- nghỉ hưu: viết sách, dạy con cháu ---------- */
function retireMark(c){if(c.job&&!['huu','none','noi','vua'].includes(c.job)&&c.m>0){c.lastJob=c.job;c.lastM=c.m;c.mexp=c.mexp||{};c.mexp[c.job]=Math.max(c.mexp[c.job]||0,c.m)}}
function students(c){const grand=p=>p.parents.some(id=>{const q=P(id);return q&&q.parents.includes(c.id)});
  return alive().filter(p=>p.id!==c.id&&inClan(p)&&inMain(p)&&!p.away&&age(p)>=8&&age(p)<=30&&(p.parents.includes(c.id)||grand(p)||p.hh===c.hh))}
function teachPopup(c){const J=JOBS[c.lastJob];if(!J)return;const st=students(c).filter(p=>p.id!==c.id).slice(0,6);
  const opts=[{l:'Viết sách truyền nghề',s:`Mất một hai năm. Sách để lại trong ${inMain(c)?'nhà chính':'chi họ đang ở'}, ai trong nhà theo nghề ${J.n.toLowerCase()} sau này cũng không phải học từ đầu`,c:()=>c.tri>=35,f:c=>{const mo=R(12,24);c.writing={job:c.lastJob,until:S.t+mo};return `${esc(c.given)} bày giấy mực, bắt đầu ghi lại những gì đã học được cả đời. Dự kiến ${mo} tháng.`+fx(c,{tam:4})}}];
  st.forEach(p=>opts.push({l:`Dạy trực tiếp cho ${p.given} (${age(p)} tuổi)`,s:'Hai năm kèm cặp. Học là một chuyện, có theo nghề hay không là chuyện khác',f:c=>{c.teach={job:c.lastJob,id:p.id,until:S.t+24};addRel(p,c,5);return `${esc(c.given)} nhận ${esc(p.given)} làm học trò, ngày ngày chỉ bảo.`+fx(c,{tam:5})}}));
  opts.push({l:'Thôi, an hưởng tuổi già',f:c=>fx(c,{tam:2})});
  choicePopup(c,'Truyền nghề',`Truyền lại nghề ${J.n.toLowerCase()}`,`${esc(c.given)} làm ${J.n.toLowerCase()} đến độ thông thạo ${Math.floor(c.lastM)}. Nghỉ rồi, có thể truyền lại cho con cháu.`,opts)}
function teachTick(c){
  if(c.writing&&S.t>=c.writing.until){const job=c.writing.job;const lv=Math.round(Math.min(120,c.lastM*0.6+c.tri/5));const J=JOBS[job];
    const n=`${pick(['Bí quyết','Tâm đắc','Bút ký','Chân truyền'])} nghề ${J.n.toLowerCase()} của ${c.given}`;
    S.books.push({job,lv,by:c.id,t:S.t,n,hh:c.hh});c.writing=null;c.fame+=5;cf(2,'Viết sách truyền nghề');log(`${nameOf(c)} viết xong cuốn "${n}". Người ${inMain(c)?'nhà chính':'trong chi'} theo nghề ${J.n.toLowerCase()} khởi đầu với thông thạo ${Math.round(lv*0.4)}.`,'gd')}
  if(c.teach){const p=P(c.teach.id);if(!p||!inClan(p)||p.away){c.teach=null;return}
    p.pre[c.teach.job]=Math.min(60,(p.pre[c.teach.job]||0)+(c.lastM/120)*1.4);if(chance(0.05))addRel(p,c,1);
    if(qlOf(c)*0.7>qlOf(p))addSk(p,'ql',(qlOf(c)*0.7-qlOf(p))*0.03); /* v6.4.1.2: dạy cả cách quản việc */
    if(S.t>=c.teach.until){log(`${nameOf(c)} dạy xong cho ${nameOf(p)}, nghề ${JOBS[c.teach.job].n.toLowerCase()} đã thấm ${Math.round(p.pre[c.teach.job])}.`,'gd');c.teach=null}}}

/* ---------- tick chung của v6.1 ---------- */
function v61Month(){
  alive().forEach(c=>{if(!inClan(c))return;focusTick(c);brkTick(c);if(c.writing||c.teach)teachTick(c)});
  branchTick();bossTick();
  if(month()===1)yearEcon();
}
/* ================= v6.2: gia đình và xã hội · ngữ cảnh sự kiện · di chúc · nợ nần · hôn nhân · gia quy · cảnh giới sau 100 ================= */
const {JOBMETA,EMPLOYER62,BIZX,RULEREQ,RULEX62,RULEX_CONFLICT,GATES,STITLE,GATE_TXT,THATXUAT,BATKHU}=window.D;
Object.assign(EMPLOYER,EMPLOYER62);Object.assign(RULEX,RULEX62);
const KIN62={};

/* ---------- thế lực của gia tộc: 0 là dân thường ---------- */
/* ================= v6.3.1 · ĐẶC QUYỀN DANH VỌNG ================= */
const FAME_CLAN=[
 [25,'Biết mặt','Chủ nợ nể mặt: lãi nợ giảm từ 1,2% xuống 0,9% mỗi tháng.'],
 [60,'Có tiếng','Khi bị bắt lính, được nhờ người có tiếng nói giúp mà không tốn tiền. Phí qua đường buôn xa giảm 20%.'],
 [200,'Được nể','Mở nút Kêu gọi. Phí mối lái và sính lễ giảm 40%, các họ khác ngỏ lời kết thông gia nhiều gấp đôi, hạn mức nợ rộng thêm một nửa.'],
 [500,'Danh gia','Quan trên che chở nên ít bị hà hiếp, vu oan. Học phí cho con em giảm một nửa.'],
 [1500,'Vọng tộc','Quan địa phương che chở thêm một bậc. Gặp thiên tai được cấp tiền cứu trợ. Chỉ có khi nhà có người giữ tước từ Hầu tước.']];
/* v6.4.1.2: nâng mốc danh vọng cá nhân (trước 20, 50, 100, 200) */
const FAME_SELF=[
 [60,'Có tiếng tăm','Thu nhập nghề làm công, nghề thợ, buôn bán tăng 3%.'],
 [150,'Được tin dùng','Thu nhập tăng 6%. Khảo hạch thăng bậc dễ hơn một chút.'],
 [350,'Danh nhân','Thu nhập tăng 10%. Thăng bậc và thi cử dễ hơn. Được mời làm chứng, hòa giải.'],
 [800,'Bậc quốc sĩ','Thu nhập tăng 15%. Người quyền quý tìm đến mời mọc.']];
const clanLv=()=>S?FAME_CLAN.filter((p,i)=>S.fame>=p[0]&&(i<4||clanTuoc()>=4)).length:0; /* v6.5.4: Vọng tộc phải có tước từ Hầu tước */
const selfLv=c=>FAME_SELF.filter(p=>(c.fame||0)>=p[0]).length;
const famePromo=c=>selfLv(c)>=3?8:selfLv(c)>=2?4:0;
const fameExam=c=>selfLv(c)>=3?4:selfLv(c)>=2?2:0;
const fameInc=c=>[0,0.03,0.06,0.10,0.15][selfLv(c)];
const tollOff=()=>clanLv()>=2?0.8:1;
const perkTitle=c=>{const l=selfLv(c);return l?FAME_SELF[l-1][1]:''};
function perksCard(){
  const cl=clanLv();
  const rows=FAME_CLAN.map((p,i)=>`<li class="${i<cl?'':'muted'}"><b>${i<cl?'✓':'○'} ${p[1]}</b> <small>(từ ${p[0]} danh vọng)</small><br><small>${p[2]}</small></li>`).join('');
  return `<section class="card"><span class="eyebrow">${I('fame','Đặc quyền danh vọng')}</span><h2>${cl?FAME_CLAN[cl-1][1]:'Chưa có tiếng'}</h2><ul class="plain">${rows}</ul><p class="muted"><small>Danh vọng cá nhân của từng người cũng mở đặc quyền riêng: xem ở thẻ người đó.</small></p></section>`}
/* v6.3.5: danh vọng cá nhân chỉ hiện một nhãn (Có tiếng tăm, Danh nhân...), bấm vào mới xem giải thích; nhãn nằm hàng đầu thẻ người */
function selfPerks(c){const l=selfLv(c);return l?`<button class="chip gold" data-info="fp:${l}">${FAME_SELF[l-1][1]}</button>`:''}
function protect(){
  if(!S)return 0;if(S._protT===S.t&&S._prot!=null)return S._prot;
  let v=0;alive().forEach(p=>{if(p.job==='quan')v=Math.max(v,p.lv+1);if(p.job==='nguy')v=Math.max(v,4);if(p.tuoc)v=Math.max(v,5+p.tuoc);
    if(p.job==='quan_ngu'&&p.lv>=3)v=Math.max(v,p.lv-1);if(p.degree>=3)v=Math.max(v,3);else if(p.degree>=1)v=Math.max(v,1)});
  const fl=clanLv();if(fl>=4)v=Math.max(v,1);if(fl>=5)v=Math.max(v,2);
  if(S.royal)v=15;S._prot=v;S._protT=S.t;return v}
const protName=()=>{const q=alive().filter(p=>p.job==='quan').sort((a,b)=>b.lv-a.lv)[0];if(q)return `${q.given} đang làm ${postOf(q)?postOf(q).n:RANKS[q.lv]}`;const t=alive().find(p=>p.tuoc);if(t)return `${t.given} là ${TUOC[t.tuoc]}`;const d=alive().find(p=>p.degree>=1);return d?`${d.given} đã đỗ đạt`:clanLv()>=4?'danh tiếng của dòng họ':'người nhà'};

/* ---------- thể diện nghề ---------- */
function jobDig(id,lv){const M=JOBMETA[id];if(!M||M.dig==null)return 2;const d=M.dig;return Array.isArray(d)?d[Math.min(lv||0,d.length-1)]:d}
function minDig(){if(!S)return 0;if(S.royal)return 5;const p=protect(),t=tierIdx();return p>=5||t>=5?3:p>=1||t>=3?2:t>=2?1:0}
const passion=(c,id)=>!!c&&(c.passion===id||(c.wish===id&&axv(c,'yc')>=70));
const jobFit=(c,id)=>jobDig(id,startLv(c,id))>=minDig()||passion(c,id);
const selfEmp=c=>{const M=JOBMETA[c.job];return !!M&&M.self!=null&&c.lv>=M.self};
const pieceJob=c=>{const M=JOBMETA[c.job];return !!M&&M.piece!=null&&c.lv>=M.piece};
/* thu theo năng suất: mỗi tháng một khác, người giỏi thì đều tay hơn */
function pieceF(c){const J=JOBS[c.job];const h=(hashN(c.id+':'+S.t)%1000)/1000;const skill=clamp(((c[J.st]||50)+c.m)/160,0.3,1.2);
  let f=0.55+h*(0.6+skill*0.5)+skill*0.15;const mo=month();
  if(c.job==='det'&&[11,12,1].includes(mo))f*=1.2;if(c.job==='diaky'&&[12,1,2].includes(mo))f*=1.3;if(c.job==='khuanvac'&&[6,10].includes(mo))f*=1.25;
  return f}
const paid=c=>EMPLOYEE(c)||['quan','nguy'].includes(c.job);
const working=c=>age(c)>=16&&!['none','huu','noi','vua'].includes(c.job);
/* việc tay chân, làm thuê: chỉ hợp với người nghèo, còn sức, nhà không có thế */
function laborOk(c){const a=age(c);if(a<14||a>58||c.tuoc||c.degree>=1)return false;if(protect()>=2||tierIdx()>=4)return false;
  return ['none','nong','khuanvac','tieuphu','ngu','hangrong','chan','noi','det','bep'].includes(c.job)||(c.job==='tho'&&c.lv<=1)||(c.job==='hau'&&c.lv===0)}

/* ---------- lọc sự kiện theo hoàn cảnh ---------- */
const RX={bully:/bắt nạt|chèn ép|ức hiếp|hà hiếp|cậy thế|sách nhiễu|vu oan|vu cho|ăn hiếp|hạch sách|bắt bẻ|nạt nộ|trấn tiền|gây sự|cắm cọc|ngầm đe dọa/i,
  labor:/làm thuê|khuân thóc|đi phu|làm mướn|ở đợ|gánh thuê|cày thuê|gặt thuê|đi làm công/i,
  raise:/tăng lương|tăng công|tăng tiền công/i,
  long:/một mùa|lên kinh|đi xa|chu du|bế quan|nửa năm|ba tháng|mấy tháng|một năm|vài năm/i};
function evSrc(e){const f=v=>typeof v==='function'?v.toString():Array.isArray(v)?v.map(o=>Object.values(o).map(x=>typeof x==='function'?x.toString():String(x)).join(' ')).join(' '):String(v||'');return f(e.t)+' '+f(e.x)+' '+f(e.o)}
function tagEvents(){EVENTS.forEach(e=>{if(e.tags)return;const s=evSrc(e);const jq=e.job&&e.job.some(j=>['quan','nguy','quan_ngu'].includes(j));
  e.tags={bully:!jq&&RX.bully.test(s),labor:!e.job&&RX.labor.test(s),pay:!e.job&&/bonus:/.test(s)}})}
const adoptOk=(c,kin)=>!rule('camnuoi')&&(!rule('nuoiho')||!!kin);
const remarryOk=c=>{if(married(c))return false;if(c.g==='nữ'&&rule('nutac')&&age(c)<55&&c.spouse)return false;return true};
const CTX={
  lam_thue_nha_giau:laborOk,t_g_lam_thue_kinh:laborOk,t_g_dan_den:laborOk,t_g_che_dong:c=>protect()<2&&tierIdx()<=3&&age(c)<65,mua_gat:c=>protect()<4,
  nguoi_xin_lam:()=>S.biz.length>0||S.farm.own>=8||S.farm.fief>0,
  quan_huyen_tham:c=>protect()<3&&!['quan','nguy'].includes(c.job),yen_tiec_huyen:c=>protect()<4&&!(c.job==='quan'&&c.lv>=2),
  v6_ky_tai_bay:c=>!['quan','nguy'].includes(c.job)&&protect()<3&&!c.tuoc,v6_vu_oan:c=>protect()<2&&!c.tuoc&&!['quan','nguy'].includes(c.job),
  bi_kham_nha:()=>protect()<2,c8_ruong:()=>protect()<3,mua_nha_bon:()=>protect()<5,vay_nang_lai:()=>protect()<2,
  tre_bi_bat_nat:()=>protect()<1&&tierIdx()<4,v6_tre_bi_danh:()=>protect()<1&&tierIdx()<4,tre_danh_nhau:()=>protect()<2,bi_danh:c=>protect()<2&&!c.tuoc,
  tinh_dich:()=>protect()<3,c1_cau_am:()=>protect()<3,v6_bat_binh:c=>!(c.job==='quan'&&c.lv>=4),
  v61_cui_kiem_lam:()=>protect()<2,v61_ca_tranh:()=>protect()<2,v61_thue_chu_ac:()=>protect()<1,v61_phu_quan_de:()=>protect()<1,v61_phu_cai_an:()=>protect()<1,
  hr_bi_cuop_dat:()=>protect()<2,su_bi_bat_nat:()=>protect()<2,su_bi_coi_thuong:()=>protect()<3,tp_cam_rung:()=>protect()<3,ti_thue:()=>protect()<4,cs_kiem_tra:()=>protect()<4,
  q_chen_ep:c=>c.lv<=6,q_cuu_pham:c=>c.lv<=2,qa_cuop_lon:c=>c.lv<=6,q_thu_thue:c=>c.lv<=4,
  nuoi_tre_bo_roi:c=>adoptOk(c,false),nuoi_chau_mo_coi:c=>adoptOk(c,true),nuoi_hiem_muon:c=>adoptOk(c,false),
  tai_gia:remarryOk,tinh_goa_bua:remarryOk,
  gd_hieu_thao:working,t_c_dat_hang:working,ns_quyen_the:working,
  nm_tuyen_nguoi:c=>!['thulai','nhadich','quan','nguy','chu'].includes(c.job)&&jobDig('nhadich',0)>=minDig()-1,
  t_g_hoc_nghe:c=>protect()<2&&tierIdx()<=2,thieu_nien_bo_nha:c=>!isHead(c),v6_xa_que:c=>!isHead(c)};
function ctxOk(e,c){
  const f=CTX[e.id];if(f){try{if(!f(c))return false}catch(err){return false}}
  const T=e.tags;if(!T)return true;
  if(T.bully&&!f&&(protect()>=1||tierIdx()>=5||c.tuoc))return false;
  if(T.labor&&!f&&!laborOk(c))return false;
  if(T.pay&&!working(c))return false;
  return true}
/* lựa chọn không hợp người thì ẩn đi */
function optOk(c,o){const l=String(o.l||'');
  if(RX.labor.test(l)&&!laborOk(c))return false;
  if(RX.raise.test(l)&&!paid(c))return false;
  if(RX.long.test(l)&&(['quan','nguy'].includes(c.job)||age(c)>=70||c.brk||(c.busyUntil||0)>S.t))return false;
  return true}
function busyMonths(l){l=String(l);if(/vài năm/i.test(l))return R(18,30);if(/một năm/i.test(l))return R(10,12);if(/nửa năm|sáu tháng/i.test(l))return R(5,6);if(/bế quan/i.test(l))return R(6,12);if(/ba tháng|một mùa/i.test(l))return R(3,4);if(/lên kinh|chu du|đi xa/i.test(l))return R(4,8);return R(2,5)}
function optTook(c,o){if(RX.long.test(String(o.l||''))&&c.dead==null){c.busyUntil=S.t+busyMonths(o.l)}}
/* sửa vài sự kiện cũ cho hợp hoàn cảnh */
function patchEvents(){
  const e=EVMAP.nm_tuyen_nguoi;if(e&&Array.isArray(e.o)){const base=e.o;e.o=c=>{const L=base.map(o=>Object.assign({},o));const p=protect();
    if(p>=1){const j=c.tri>=c.vo?'thulai':'nhadich';L.unshift({l:'Nhờ người nhà nói giúp một tiếng',s:`${protName()}`,f:c=>{setJob(c,j);return `Chỉ một lời của ${esc(protName().split(' ')[0])}, nha môn nhận ngay, lại được nể mặt.`+fx(c,{tam:8,fame:1})}});
      const ap=L[1];if(ap&&ap.r){ap.r=[ap.r[0],Math.max(25,ap.r[1]-p*5)];ap.n=c=>'Năm nay người nộp đơn quá đông, chưa đến lượt.'+fx(c,{tam:-2})}}
    return L}}
}

/* ---------- tiền công theo ngành, theo vị trí ---------- */
function wageFor(st,b,role){const R0=ROLES[role];const X=BIZX[b.type]||{w:1};
  return Math.round(R0.w*X.w*(1+0.18*b.lv)*(0.7+Math.min(1.25,staffEff(st,role))*0.4)*(1+st.m/150)/10)*10}

/* ---------- nghe lời gia chủ ---------- */
function obey(c){const h=head();if(!h||h.id===c.id)return 100;
  const hf=Math.max(0,h.fame)+Math.max(0,S.fame)*0.3;
  let v=36+Math.min(28,Math.log10(1+hf)*9)+relOf(c,h)/5+(axv(c,'ht')-50)*0.7-Math.max(0,axv(c,'yc')-60)*0.5-Math.max(0,axv(c,'dl')-55)*0.45
    +(rule('hieudao')?8:0)+(rule('nghiem')?5:0)+(rule('tohuan')?3:0)-(rule('tuquyet')?8:0)+(age(c)<16?12:0)-(c.passion?8:0)-((c.oan||0)/4)+(h.eq-50)/8;
  if(has(c,'ngonghich'))v-=8;v+=(c.flags.nuoi||0); /* v6.5.4: cách nuôi dạy lúc nhỏ */
  return clamp(Math.round(v),0,100)}
const obeyWord=v=>v>=80?'Rất nghe lời':v>=60?'Nghe lời':v>=40?'Nửa nghe nửa không':v>=20?'Khó bảo':'Ương ngạnh';

/* ---------- chỉ số lớn lên ---------- */
/* v6.4.1.5.1: chỉ số học thêm được tới một "trần mềm" theo tư chất (mức tự nhiên năm 18 tuổi + 10 + 15% tiềm năng);
   vượt trần mềm thì chậm hẳn, qua 100 chậm thêm, qua 120 chậm nữa. Trước đây trẻ tiềm năng 30 đến 50 đi học tới 13, 14 tuổi đã chạm 100. */
function growDim(c,k,cap){const v=c[k];let d=Math.max(0.15,1-v/(cap+15));
  if(k!=='suc'){const soft=(NATK.includes(k)?natOf(c,k):pot(c,k)*0.6)+10+pot(c,k)*0.15;if(v>soft)d*=Math.max(0.05,0.3-(v-soft)/50)}
  if(v>=100)d*=0.33;if(v>=120)d*=0.6;if(v>=150)d*=0.7;return d} /* v6.7.0: sau 100 nhanh hơn một chút, sau 150 chậm bớt */
function growStat(c,k,perYear){if(!perYear)return;const cap=k==='suc'?c.cap.suc:capOf(c,k);if(c[k]>=cap)return;
  const dim=growDim(c,k,cap);const gene=0.5+pot(c,k)/100;const moodF=0.6+0.6*c.tam/100;
  addStat(c,k,perYear/12*dim*moodF*gene)}
/* gia quy làm chỉ số lớn nhanh hơn */
function ruleGrow(c,k){let v=0;if(k==='tri'&&rule('thuhuong'))v+=0.2;if((k==='tri'||k==='vo')&&rule('vanvo'))v+=0.08;if(k==='vo'&&rule('thetap')&&c.g==='nam')v+=0.1;return v}
/* làm nghề lâu thì chỉ số liên quan cũng lên */
function jobGrow(c){if(age(c)<16||!working(c))return;if(c.away&&!['army'].includes(c.away.type))return;const M=JOBMETA[c.job];if(!M||!M.g)return;
  const f=(0.45+Math.min(120,c.m)/90)*0.6;for(const k in M.g)growStat(c,k,M.g[k]*f)}

/* ---------- mong muốn nghề ---------- */
function eduLv(c){return Math.max(0,c.tri-45)*0.6+(c.degree||0)*18+Math.min(12,c.eduY||0)*1.6}
function wishScore(c,id){const J=JOBS[id];if(!J||!meets(c,id))return -1e9;const M=JOBMETA[id]||{};
  const pj=S.people.filter(p=>c.parents.includes(p.id)).map(p=>p.job);
  let v=statFit(c,id)*0.7+(c.pre[id]||0)*0.6+Math.min(40,expOf(c,id)*0.4);if(!jobOk(c,id))v-=25;
  const ed=eduLv(c);if(M.hand)v-=ed*0.8;if(M.light)v+=ed*0.5;
  const md=minDig(),dg=jobDig(id,0);if(dg<md)v-=(md-dg)*14;
  v+=(axv(c,'tv')-50)*0.15*Math.min(2,(J.inc||300)/400)+(axv(c,'tv')-50)*0.1*(dg-2);
  if(pj.includes(id))v+=(axv(c,'ht')-40)*0.25;
  if(c.g==='nữ'){if(['det','mo'].includes(id))v+=12;if(['khuanvac','tieu','nhadich','tieuphu','ngu'].includes(id))v-=25}else if(['det','mo'].includes(id))v-=18;
  const B={tieunhi:axv(c,'tv')/5+axv(c,'hd')/7,hangrong:axv(c,'hd')/6,su:axv(c,'diem')/6,y:axv(c,'rong')/6,nghe:axv(c,'hd')>65||axv(c,'tiet')<40?10:0,mo:axv(c,'rong')/6+axv(c,'gan')/8,
    tieu:axv(c,'gan')/5,tieuphu:axv(c,'dl')/6,ngu:axv(c,'dl')/7,nong:axv(c,'cc')/5,tho:axv(c,'cc')/6,det:axv(c,'cc')/6+axv(c,'diem')/8,chan:axv(c,'diem')/7,hau:axv(c,'ht')/6,bep:axv(c,'cc')/7,diaky:axv(c,'diem')/6+skv(c,'khau')/8,thulai:axv(c,'ht')/6,nhadich:axv(c,'gan')/6};
  v+=B[id]||0;v+=hashN(c.id+id)%26;
  {const same=alive().filter(p=>inClan(p)&&p.id!==c.id&&p.job===id).length;v-=Math.max(0,same-1)*9} /* v6.5.4: nhà đã đông người một nghề thì con cháu muốn nghề khác */
  if(id==='nong'&&farmArea()<1&&S.farm.fief<1)v-=10;
  if(['thulai','nhadich'].includes(id))v-=protect()>=1?0:12;
  return v}
function wishPick(c){const pool=STARTJOBS.concat(['thulai','nhadich']);let best='none',bv=-1e9;pool.forEach(id=>{const v=wishScore(c,id);if(v>bv){bv=v;best=id}});
  /* v6.3.5: người đã có nghề thì mong muốn nghề khác chỉ khi nghề ấy hơn hẳn (lương cao hơn hoặc nhẹ nhọc hơn mà lương không kém),
     làm lâu, đã lên bậc, lương khá thì càng ít khi bỏ đi làm nghề thấp và nặng hơn */
  const cur=c.job,J0=JOBS[cur];
  if(J0&&best!=='none'&&best!==cur&&!['none','noi','huu','quan','vua','chu','quan_ngu','nguy','hiep'].includes(cur)){
    const J2=JOBS[best];const ci=Math.max(J0.inc||0,income(c)||0),cp=J0.phys||0,c2=J2.inc||0,p2=J2.phys||0;
    const settled=(c.lv||0)>=1||(c.m||0)>=40;const better=c2>=ci*1.15||(p2<=cp-8&&c2>=ci*0.9);
    const curScore=wishScore(c,cur);
    if(settled){if(!better||bv<curScore+12)best=cur}
    else if(c2<ci*0.85||p2>cp+6||bv<curScore+4)best=cur}
  if(best!=='none'&&!c.passion&&axv(c,'yc')>=72&&chance(0.25))c.passion=best;return bv>-1e8?best:'none'}

/* ---------- tính cách theo tuổi, nghề, hoàn cảnh và người mình nể ---------- */
function v62Drift(c,a){if(a<16)return;const d={};const add=(k,v)=>d[k]=(d[k]||0)+v;
  if(a<=25){add('tv',.3);add('gan',.3)}if(a>=50){add('diem',.6);add('tv',-.5);add('gan',-.3)}if(a>=65){add('diem',.4);add('hd',.3);add('tiet',.3)}
  const h=HH(c.hh);if(h&&h.life===0){add('cc',.5);add('rong',-.3)}if(h&&h.life>=4){add('tiet',-.4)}
  if(c.job==='quan'&&c.lv>=4)add('tv',.3);if((c.oan||0)>=50){add('diem',-.6);add('ht',-.5)}if(c.flags.divorced&&S.t-c.flags.divorced<24)add('hd',-.6);
  const inf=home().filter(p=>p.id!==c.id&&age(p)>=16&&p.sub&&(p.hh===c.hh||isHead(p)));
  inf.forEach(p=>{const r=relOf(c,p);const fw=Math.min(1.5,Math.max(0,(p.fame+50)/200));let w=(isHead(p)?0.05:0.025)*(0.5+fw);
    if(r>=40)w*=1+r/100;else if(r<=-30&&axv(c,'rong')<45)w*=-0.6;else if(r<10)w*=0.3;
    AXK.forEach(x=>add(x,(p.sub[x]-c.sub[x])*w))});
  shiftAx(c,d,plast(a)*0.8)}

/* ================= di chúc, thừa kế ================= */
const WILLN={auto:'Chưa lập, theo lệ: chia đều cho con',kids:'Chia đều cho các con',spouse:'Để hết cho vợ hoặc chồng',split:'Một phần cho gia tộc, còn lại cho gia đình',fav:'Dồn phần lớn cho một người con',clan:'Hiến hết cho gia tộc'};
function willTxt(c){const W=c.will||{to:'auto'};let t=WILLN[W.to]||WILLN.auto;if(W.to==='split')t=`${Math.round((W.clan||0.3)*100)}% cho gia tộc, còn lại cho gia đình`;if(W.to==='fav'&&P(W.fav))t=`Dồn phần lớn cho ${P(W.fav).given}`;return t}
function willPopup(c){const kids=kidsOf(c).filter(k=>inClan(k)&&k.dead==null);const sp=spouseOf(c);const spOk=sp&&inClan(sp);const pct=inMain(c)?30:10;
  const set=(W,txt)=>()=>{c.will=W;log(`${nameOf(c)} lập di chúc: ${willTxt(c).toLowerCase()}.`);return txt};
  const opts=[];
  if(kids.length)opts.push({l:'Chia đều cho các con',f:set({to:'kids'},'Các con mỗi người một phần như nhau.')});
  if(spOk)opts.push({l:`Để hết cho ${sp.given}`,f:set({to:'spouse'},'Người bạn đời sẽ giữ toàn bộ.')});
  opts.push({l:'Một phần năm cho gia tộc, còn lại cho gia đình',f:set({to:'split',clan:0.2},'Gia tộc được thêm một phần, gia đình giữ phần còn lại.')});
  opts.push({l:'Một nửa cho gia tộc, một nửa cho gia đình',f:set({to:'split',clan:0.5},'Nửa về công quỹ, nửa cho người thân.')});
  kids.forEach(k=>opts.push({l:`Dồn phần lớn cho ${k.given}`,s:'Các con khác sẽ để bụng',f:set({to:'fav',fav:k.id},`${esc(k.given)} sẽ được hai phần ba.`)}));
  opts.push({l:'Hiến hết cho gia tộc',f:set({to:'clan'},'Toàn bộ tiền riêng sẽ về công quỹ, cả họ ghi ơn.')});
  if(isHead(c)){const cand=alive().filter(p=>p.id!==c.id&&inClan(p)&&!p.inLaw&&age(p)>=14).sort((a,b)=>a.born-b.born).slice(0,6);
    cand.forEach(p=>opts.push({l:`Chỉ định ${p.given} nối ngôi gia chủ`,s:`${relation(p)} · ${age(p)} tuổi`,f:()=>{c.will=Object.assign({},c.will||{to:'auto'},{heir:p.id});log(`Gia chủ ${nameOf(c)} viết di chúc chọn ${nameOf(p)} nối nghiệp.`,'gd');return `Di chúc đã niêm phong trong từ đường: ${esc(p.given)} sẽ nối nghiệp.`}}))}
  opts.push({l:'Thôi, để sau',f:()=>''});
  choicePopup(c,'Di chúc',`${c.given} lập di chúc`,`Hiện ${esc(c.given)} có ${money(c.purse)} tiền riêng. Khi mất, gia tộc luôn giữ lại ${pct}%${inMain(c)?'':' (người ở chi phái, gia tộc chính chỉ lấy 10%)'}, phần còn lại chia theo di chúc. Hiện tại: ${esc(willTxt(c).toLowerCase())}.${isHead(c)&&c.will&&P(c.will.heir)?` Người được chọn nối nghiệp: ${esc(P(c.will.heir).given)}.`:''}`,opts)}
/* chia tiền riêng khi người đó mất */
function settleEstate(c){let v=Math.round(c.purse||0);c.purse=0;if(!v)return '';
  if(v<0){fundAdd(inMain(c)?'clan':c.hh,v);return ` Món nợ riêng ${money(-v)} gia đình phải gánh.`}
  const tax=Math.round(v*(inMain(c)?0.3:0.1));S.money+=tax;v-=tax;
  const W=c.will||{to:'auto'};const sp=spouseOf(c);const spOk=sp&&inClan(sp)&&sp.dead==null;
  const shares=[];kidsOf(c).forEach(k=>{if(k.dead==null&&inClan(k))shares.push([k,1]);else if(k.dead!=null){const g=kidsOf(k).filter(x=>x.dead==null&&inClan(x));g.forEach(x=>shares.push([x,1/g.length]))}});
  const kids=shares.map(x=>x[0]);
  const give=(arr,amt)=>{if(!arr.length||amt<=0)return false;const w=arr.map(p=>{const s=shares.find(x=>x[0]===p);return s?s[1]:1});const tw=w.reduce((a,b)=>a+b,0);arr.forEach((p,i)=>p.purse+=Math.round(amt*w[i]/tw));return true};
  let to=W.to||'auto';if(to==='auto')to=kids.length?'kids':spOk?'spouse':'clan';
  if((to==='kids'||to==='fav')&&!kids.length)to=spOk?'spouse':'clan';if(to==='spouse'&&!spOk)to=kids.length?'kids':'clan';
  let clanX=0,txt='';
  if(to==='split'){clanX=Math.round(v*(W.clan||0.3));const rest=v-clanX;if(!give([...(spOk?[sp]:[]),...kids],rest))clanX+=rest;txt=`chia cho gia tộc và người nhà`}
  else if(to==='fav'){const f=P(W.fav);if(f&&inClan(f)){const big=Math.round(v*2/3);f.purse+=big;const others=kids.filter(k=>k.id!==f.id);if(!give(others,v-big))f.purse+=v-big;others.forEach(k=>{k.oan=Math.min(100,(k.oan||0)+25);addRel(k,f,-15)});txt=`phần lớn về tay ${f.given}`}else{give(kids,v);txt='chia đều cho các con'}}
  else if(to==='kids'){give(kids,v);txt='chia đều cho các con'}else if(to==='spouse'){give([sp],v);txt=`để lại cho ${sp.given}`}else{clanX=v;txt='hiến cho gia tộc'}
  if(clanX){S.money+=clanX;if(to==='clan')cf(2,'Người mất hiến tiền riêng cho gia tộc')}
  return ` Tiền riêng ${money(v+tax)}: gia tộc giữ ${money(tax)}, ${txt}.`}

/* ---------- tranh vị: gia chủ mất ---------- */
function heirCands(){const h=S.people.find(p=>p.id===S.lastHead);const sons=h?kidsOf(h).filter(k=>inClan(k)&&!k.inLaw&&age(k)>=16):[];
  return sons.length?sons:alive().filter(p=>inClan(p)&&!p.inLaw&&age(p)>=18)}
function afterHeir(p){const old=S.people.find(x=>x.id===S.lastHead);const W=old&&old.will;const will=W&&W.heir&&P(W.heir)&&inClan(P(W.heir))?P(W.heir):null;
  const cands=heirCands().filter(x=>x.id!==p.id);const _hc=heirCands();const _mh=_hc.filter(x=>x.g==='nam');const eldest=(_mh.length?_mh:_hc).slice().sort((a,b)=>a.born-b.born)[0];
  if(will&&will.id!==p.id){S.on=clamp(S.on-8,0,100);will.oan=Math.min(100,(will.oan||0)+45);addRel(will,p,-30);log(`Di chúc chọn ${nameOf(will)}, nhưng người lên làm gia chủ lại là ${nameOf(p)}. Cả họ xì xào.`,'hi')}
  if(rule('tuuhien'))return;
  cands.forEach(x=>{let o=0;if(eldest&&x.id===eldest.id&&!(will&&will.id===p.id))o+=rule('truongau')?40:25;if(axv(x,'tv')>=65)o+=20;if(x.fame>p.fame+30)o+=10;if(will&&will.id===p.id)o*=0.4;
    if(o>0){x.oan=Math.min(100,(x.oan||0)+Math.round(o));addRel(x,p,-o/3)}});
  const angry=cands.filter(x=>(x.oan||0)>=45&&axv(x,'tv')>=55);
  if(angry.length&&!(will&&will.id===p.id)){S.on=clamp(S.on-5*angry.length,0,100);enqueue('tranhvi',p.id,{r:angry[0].id})}}
function tranhviPopup(h,it){const r=P(it.r);if(!r||!inClan(r)||!inClan(h)){setTimeout(nextPopup,0);return}
  const share=mm(6);
  choicePopup(h,'Tranh vị',`${r.given} không phục`,`${esc(nameOf(r))} cho rằng ngôi gia chủ lẽ ra thuộc về mình. Một số người trong họ ngả theo, từ đường chia hai phe. ${obey(r)<35?'Người này tính ương ngạnh, khó mà nói được.':''}`,[
    {l:'Mời các bậc trưởng lão phân xử công khai',r:[{eq:0.6,khau:0.4,fame:0.4},55+(r.fame-h.fame)/10],y:x=>{r.oan=Math.max(0,(r.oan||0)-40);S.on=clamp(S.on+6,0,100);return `Trưởng lão xét công tội, cả họ đứng về phía ${esc(h.given)}. ${esc(r.given)} đành cúi đầu.`+fx(h,{fame:5})},n:x=>{r.oan=Math.min(100,(r.oan||0)+10);S.on=clamp(S.on-6,0,100);return 'Phân xử không xong, mỗi bên một ý, lòng người càng ly tán.'}},
    {l:`Chia của cho ${r.given} ra ở riêng (${money(share)})`,c:()=>S.money>=share&&married(r),f:x=>{S.money-=share;r.purse+=share;r.oan=Math.max(0,(r.oan||0)-50);setTimeout(()=>moveOutPopup(r),0);return `Được chia của, ${esc(r.given)} dọn ra lập chi riêng.`}},
    {l:'Ban chức trong tộc để xoa dịu',c:()=>Object.keys(CLANOFF).some(k=>!offHolder(k)&&offOk(r,k)),f:x=>{const k=Object.keys(CLANOFF).find(k=>!offHolder(k)&&offOk(r,k));S.coff[k]=r.id;r.oan=Math.max(0,(r.oan||0)-30);return `${esc(r.given)} nhận chức ${esc(CLANOFF[k].n.toLowerCase())}, tạm yên.`}},
    {l:'Dùng gia pháp trấn áp',f:x=>{if(obey(r)>=40){r.oan=Math.max(0,(r.oan||0)-15);S.on=clamp(S.on+2,0,100);return `${esc(r.given)} không dám làm gì thêm, nhưng trong lòng chưa phục.`}
      r.oan=Math.min(100,(r.oan||0)+20);S.on=clamp(S.on-8,0,100);if(chance(0.4)){r.left='botron';r.leftT=S.t;log(`${nameOf(r)} uất ức bỏ đi khỏi gia tộc.`,'hi');return `${esc(r.given)} bỏ đi ngay trong đêm, thề không quay về.`}return 'Hai phe càng thêm căng thẳng.'}}])}

/* ---------- oán giận vì bị bất công ---------- */
function oanTick(c){if(!c.oan)return;c.oan=Math.max(0,c.oan-(rule('khoandung')?1.5:0.5)-(axv(c,'rong')-50)/100);
  if(c.oan>=60&&!isHead(c)&&head()&&!((c.flags.oanT||0)>S.t)&&chance(0.03)){c.flags.oanT=S.t+24;enqueue('oan',c.id)}}
function oanPopup(c){const h=head();if(!h||!inClan(c)){setTimeout(nextPopup,0);return}
  choicePopup(h,'Gia sự',`${c.given} ôm hận`,`${esc(nameOf(c))} lâu nay mặt nặng mày nhẹ, gặp ai cũng kể mình bị đối xử bất công. Người trong nhà bắt đầu xì xào. ${obey(c)<35?'Người này ương ngạnh, không dễ nói.':''}`,[
    {l:`Bù đắp bằng của (${money(mm(5))})`,c:()=>S.money>=mm(5),f:x=>{S.money-=mm(5);c.purse+=mm(5);c.oan=Math.max(0,c.oan-40);addRel(c,h,8);return `${esc(c.given)} nhận của, nét mặt dịu đi.`}},
    {l:'Gặp riêng, nói chuyện thấu tình',r:[{eq:0.7,khau:0.5},50+c.oan/4],y:x=>{c.oan=Math.max(0,c.oan-35);addRel(c,h,10);return 'Nói hết những điều chất chứa, hai bên hiểu nhau hơn.'},n:x=>{c.oan=Math.min(100,c.oan+8);return 'Càng nói càng to tiếng.'}},
    {l:'Răn đe bằng gia pháp',f:x=>{if(obey(c)>=45){c.oan=Math.max(0,c.oan-20);return 'Bị răn đe, không dám ho he nữa.'+fx(c,{tam:-6})}c.oan=Math.min(100,c.oan+15);S.on=clamp(S.on-4,0,100);
      if(axv(c,'thanh')<35&&chance(0.5)){const v=Math.min(Math.max(0,S.money)*0.1,mm(6));S.money-=v;return `Đêm ấy ${esc(c.given)} lén lấy ${money(v)} của công quỹ rồi bỏ đi mấy hôm.`}return 'Bề ngoài vâng dạ, trong lòng càng hận.'}},
    {l:'Mặc kệ',f:x=>{S.on=clamp(S.on-3,0,100);if(chance(0.3)){cf(-4,'Người nhà nói xấu gia tộc ra ngoài');return `${esc(c.given)} đi rêu rao chuyện trong nhà khắp xóm.`}return 'Chuyện cứ âm ỉ.'}}])}

/* ================= nợ nần: khất, bán của, ở đợ, bán con, lưu vong ================= */
function debtLim(){return Math.max(mm(5),expenses().total*2)*(clanLv()>=3?1.5:1)}
function debtTick(){
  if(S.money>=0){if(S.debt){if(S.debt.stage)log('Gia tộc đã trả hết nợ, chủ nợ thôi tới cửa.','gd');S.debt=null}return}
  S.debt=S.debt||{since:S.t,stage:0,grace:0};const D=S.debt;
  if(S.t-D.since>=6&&S.money<-mm(1))S.money=Math.round(S.money*(clanLv()>=1?1.009:1.012));
  if(S.money>-debtLim())return;
  if((D.grace||0)>S.t||S.queue.some(q=>q.kind==='chuno'))return;
  if(S.t-D.since>=6||S.money<-debtLim()*3){D.stage++;D.grace=S.t+3;if(head())enqueue('chuno',S.head,{st:D.stage},true)}}
function assets(){const out=[];
  for(const g in S.kho)if(S.kho[g]>=1)out.push({k:'kho',g,n:`${fmt(S.kho[g])} ${GOODS[g].u} ${GOODS[g].n.toLowerCase()} trong kho`,v:Math.round(S.kho[g]*priceOf(g)*0.6)});
  if(S.farm.own>0)out.push({k:'land',n:`Một nửa ruộng (${Math.ceil(S.farm.own/2)} mẫu)`,v:Math.round(Math.ceil(S.farm.own/2)*landCost()*0.65)});
  S.biz.filter(b=>(b.own||'clan')==='clan').forEach(b=>out.push({k:'biz',id:b.id,n:BIZ[b.type].lv[b.lv][0],v:Math.round(bizValue(b)*0.7)}));
  const h=HH(mainHH());if(h&&h.home>0)out.push({k:'home',n:`Bán nhà, dọn xuống ${HOMES[h.home-1].n.toLowerCase()}`,v:Math.round(HOMES[h.home].cost*0.5)});
  return out}
function sellAsset(a){S.money+=a.v;
  if(a.k==='kho')S.kho[a.g]=0;
  if(a.k==='land'){const n=Math.ceil(S.farm.own/2);S.farm.own-=n;S.farm.lease=Math.min(S.farm.lease||0,S.farm.own);let over=allocated()-farmArea();for(const k of Object.keys(S.farm.alloc).reverse()){if(over<=0)break;const d=Math.min(over,S.farm.alloc[k]);S.farm.alloc[k]-=d;over-=d}}
  if(a.k==='biz'){const b=S.biz.find(x=>x.id===a.id);if(b){S.biz=S.biz.filter(x=>x!==b);const o=P(b.owner);if(o&&o.biz===b.id)unChu(o)}}
  if(a.k==='home'){const h=HH(mainHH());h.home--}
  log(`Bán ${a.n.toLowerCase()} trả nợ, được ${money(a.v)}.`,'hi')}
function chunoPopup(h,st){const D=S.debt;if(!D||S.money>=0){setTimeout(nextPopup,0);return}
  const owe=-S.money;const A=assets();const kids=alive().filter(p=>inClan(p)&&age(p)>=5&&age(p)<14&&!isHead(p));
  const servants=alive().filter(p=>inClan(p)&&!isHead(p)&&age(p)>=14&&age(p)<50&&!p.away&&!['quan','nguy'].includes(p.job));
  const brMoney=branches().reduce((s,id)=>s+Math.max(0,S.hh[id].money),0);
  const opts=[{l:'Xin khất thêm ít lâu',r:[{eq:0.6,khau:0.6,fame:0.3},42+st*9],y:x=>{D.grace=S.t+R(6,10);return 'Chủ nợ miễn cưỡng cho khất, nhưng tiền lãi vẫn chạy.'},n:x=>{D.grace=S.t+2+st*2;cf(-3,'Bị chủ nợ làm nhục');return 'Chủ nợ chửi bới ngay trước cổng, cả xóm kéo ra xem.'+fx(x,{tam:-6})}}];
  if(st>=2)opts.push({l:'Cả nhà làm công trả nợ, ăn uống kham khổ',s:'Một năm không bị đòi, nhưng ai cũng mệt mỏi',f:x=>{D.grace=S.t+12;alive().forEach(p=>{if(inClan(p))addStat(p,'tam',-4)});S.on=clamp(S.on-2,0,100);const v=mm(3)+Math.round(owe*0.05);S.money+=v;log('Cả nhà xoay xở làm công, nhịn ăn nhịn mặc để trả nợ dần.','hi');return `Làm lụng quần quật, trừ được ${money(v)}. Chủ nợ cho thư thả một năm.`}});
  A.slice(0,5).forEach(a=>opts.push({l:`Bán ${a.n.toLowerCase()} (${money(a.v)})`,f:x=>{sellAsset(a);D.grace=S.t+4;return `Gán ${esc(a.n.toLowerCase())} lấy ${money(a.v)}.`}}));
  if(brMoney>mm(2))opts.push({l:'Cầu cứu các chi phái',f:x=>{let got=0;branches().forEach(id=>{const H=S.hh[id];const L=branchLeader(id);const w=L?clamp(0.4+relOf(L,x)/150+(axv(L,'rong')-50)/120,0.1,0.9):0.3;if(H.money>0&&chance(w)){const v=Math.round(H.money*0.5);H.money-=v;S.money+=v;got+=v;if(L)addRel(L,x,-3)}});D.grace=S.t+4;return got?`Các chi gom góp được ${money(got)}.`:'Các chi đều kêu khó, không ai giúp.'}});
  if(st>=2&&servants.length)servants.slice(0,3).forEach(p=>opts.push({c:()=>!p.away&&inClan(p),l:`Cho ${p.given} đi ở đợ trừ nợ ba năm`,s:'Người đi ở mất ba năm, cả nhà mất mặt',f:x=>{const v=mm(18)+Math.round(owe*0.25);S.money+=v;p.away={type:'odo',until:S.t+36};addStat(p,'tam',-25);addRel(p,x,-25);cf(-6,'Người nhà phải đi ở đợ');D.grace=S.t+8;log(`${nameOf(p)} phải đi ở đợ ba năm để trừ nợ.`,'hi');return `${esc(p.given)} khăn gói sang nhà chủ nợ, trừ được ${money(v)}.`}}));
  if(st>=3&&S.t-D.since>=18&&kids.length)opts.push({c:()=>inClan(kids[0]),l:`Bán ${kids[0].given} cho nhà giàu`,s:'Chuyện cùng đường, cả đời ân hận',f:x=>{const k=kids[0];const v=mm(25)+Math.round(owe*0.2);S.money+=v;k.left='ban';k.leftT=S.t;alive().forEach(p=>{addStat(p,'tam',-15);if(k.parents.includes(p.id)){p.flags.griefUntil=S.t+36;p.oan=Math.min(100,(p.oan||0)+50)}});cf(-25,'Bán con cháu trừ nợ');S.on=clamp(S.on-20,0,100);D.grace=S.t+10;log(`Cùng đường, gia tộc phải bán ${nameOf(k)} cho nhà giàu.`,'hi');return `Tiếng khóc của ${esc(k.given)} vang cả xóm. Được ${money(v)}.`}});
  if(st>=4&&S.t-D.since>=36&&A.length<=1)opts.push({l:'Cả nhà bỏ xứ lưu vong',s:'Gia tộc tan tác, chấm hết',go:()=>confirmBox('Bỏ xứ lưu vong?','Cả nhà trốn nợ trong đêm, gia tộc tan tác. Ván chơi sẽ kết thúc.','Bỏ xứ',()=>exileEnd(),()=>chunoPopup(h,st))});
  if(st>=4&&!A.length&&S.t-D.since>=36)seizeAll(st);if(S.over)return;
  choicePopup(h,'Nợ nần',st<=1?'Chủ nợ đến cửa':st===2?'Chủ nợ dọa kiện lên quan':'Cùng đường',`Gia tộc đang nợ ${money(owe)}${S.t-D.since>=6?', tiền lãi mỗi tháng một nặng':''}. ${st<=1?'Chủ nợ cho người đến đòi, lời lẽ còn giữ ý.':st===2?'Lần này chủ nợ mang theo văn tự, nói sẽ kiện lên huyện, đòi siết nhà siết ruộng.':'Của cải đã gần hết. Chủ nợ đòi người, đòi nhà, không còn đường lùi.'}`,opts)}
function seizeAll(st){const got=[];assets().forEach(a=>{if(S.money<0){sellAsset(a);got.push(a.n.toLowerCase())}});if(got.length){cf(-10,'Chủ nợ siết tài sản');S.on=clamp(S.on-8,0,100);log(`Chủ nợ cùng nha dịch kéo đến siết ${got.join(', ')}.`,'hi')}
  if((st||0)>=5&&S.money<-debtLim()*4)exileEnd()}
function exileEnd(){if(S.over)return;log('Nợ nần không trả nổi, cả nhà bỏ xứ lưu vong trong đêm.','hi');alive().forEach(p=>{p.left='luuvong';p.leftT=S.t});gameOver('Nợ nần chồng chất, của cải bị siết sạch, cả nhà phải bỏ xứ lưu vong.','Bỏ xứ lưu vong')}

/* ================= trẻ con: học ở đâu cũng lớn ================= */
const SPEC_D={cha:'Cha mẹ giỏi gì thì dạy nấy, học cả chữ lẫn nghề nhà, không tốn tiền',tuhoc:'Tự đọc sách mượn, ai chăm thì tiến nhanh',viecnha:'Đỡ đần việc nhà, nhà bớt chi tiêu, thân thể và tính nết vững vàng',
  daychu:'Mời thầy đồ về dạy chữ riêng trong nhà, học kín đáo trong khuê phòng, không phải ra cổng',hocviec:'Theo một người thợ, người buôn trong vùng học nghề hợp với mình',gui:'Gửi vào cơ sở làm ăn của gia tộc để người ta chỉ bảo, có ít tiền công'};
const BIZJOB={quantra:'tieunhi',tiem:'tieunhi',xuong:'tho',yquan:'y',truong:'su',voquan:'tieu',tieucuc:'tieu',ganhhat:'nghe',thuyen:'ngu',trai:'chan'};
function schoolCan62(c,k){const a=age(c);
  if(k==='cha')return S.people.some(p=>c.parents.includes(p.id)&&inClan(p)&&!p.away&&age(p)>=18);
  if(k==='tuhoc')return c.tri>=30||axv(c,'cc')>=55;
  if(k==='gui')return S.biz.length>0;
  return true}
function apprJob(c,k){if(k==='gui'){const b=S.biz[0];return b?(BIZJOB[b.type]||'tieunhi'):'tieunhi'}
  return STARTJOBS.filter(id=>meets(c,id)||age(c)<16).map(id=>[id,wishScore(c,id)]).sort((a,b)=>b[1]-a[1])[0][0]}
function kidLearn(c,a){if(a<6||a>=18||(c.away&&c.away.type!=='follow'))return;const lvl=a<10?1:a<14?2:3;const sc=SCHOOL[lvl][c.school];
  if(c.school!=='nha'&&!(sc&&sc.chore))c.eduY=(c.eduY||0)+1/12;
  /* trẻ ở nhà vẫn lớn khôn nhờ việc đời, nhờ người lớn trong nhà (v6.3.4: phần lớn khôn tự nhiên đã tính vào tiềm năng, chỗ này chỉ còn phần học hỏi thêm) */
  if(!sc||c.school==='nha'||sc.chore){growStat(c,'tri',0.7);growStat(c,'eq',0.6);growStat(c,'suc',0.6)}
  if(!sc)return;
  if(sc.par){const ps=S.people.filter(p=>c.parents.includes(p.id)&&inClan(p)&&!p.away&&age(p)>=18);if(ps.length){
    ['tri','vo','mi','eq'].forEach(k=>{const best=Math.max(...ps.map(p=>p[k]));if(best>=40)growStat(c,k,Math.min(6,(best-30)/12))});
    ps.forEach(p=>{if(JOBS[p.job]&&!['none','huu','vua','quan','chu','noi'].includes(p.job))c.pre[p.job]=Math.min(60,(c.pre[p.job]||0)+(1+p.m/60)/12)})}}
  if(sc.self)growStat(c,'tri',Math.max(1,2.5+(axv(c,'cc')-50)/15+(c.tri-40)/25));
  if((sc.appr||sc.gui)&&c.appr){c.pre[c.appr]=Math.min(70,(c.pre[c.appr]||0)+(sc.gui?5:4.5)/12);const J=JOBS[c.appr];if(J)growStat(c,J.st,2.2);if(sc.gui&&a>=12)c.purse+=Math.round(mm(0.04))}}

/* ================= vợ chồng: tình cảm, bất hòa, ngoại tình, ly hôn ================= */
const loveWord=v=>v>=80?'Mặn nồng':v>=60?'Thương yêu':v>=40?'Êm ấm':v>=20?'Nhạt nhẽo':'Lạnh như băng';
function setLove(a,b,free){const v=free?R(62,85):clamp(28+compat(a,b)*1.5+((a.mi+b.mi)/2-50)/5+R(-10,10),5,60);a.love=b.love=Math.round(v)}
function loveTick(){alive().forEach(a=>{const b=spouseOf(a);if(!b||!inClan(b)||a.id>b.id)return;
  if(a.love==null)a.love=b.love=clamp(Math.round(38+compat(a,b)*1.5+relOf(a,b)/4),10,85);
  if((a.flags.sepUntil||0)>S.t)return;
  const kids=kidsOf(a).filter(k=>k.parents.includes(b.id)&&k.dead==null).length;
  const vice=p=>(p.habits.includes('thanhlau')?vlv(p,'thanhlau')/7:0)+(p.habits.includes('donhau')?vlv(p,'donhau')/9:0)+(p.habits.includes('bac')?vlv(p,'bac')/15:0);
  const t=42+compat(a,b)*1.2+((a.mi+b.mi)/2-50)/6+Math.min(12,kids*3)+(a.eq+b.eq-100)/12-(S.money<0?6:0)-vice(a)-vice(b)-(a.flags.ngoai||b.flags.ngoai?15:0);
  const v=clamp(a.love+(clamp(t,0,100)-a.love)*0.015+(Math.random()-0.5)*1.4,0,100);a.love=b.love=v;
  ensurePersona(a);ensurePersona(b);a.rel[b.id]=relOf(a,b)+(v-relOf(a,b))*0.02;b.rel[a.id]=relOf(b,a)+(v-relOf(b,a))*0.02;
  if(v<20)a.flags.lowL=(a.flags.lowL||0)+1;else a.flags.lowL=Math.max(0,(a.flags.lowL||0)-2);
  if(a.flags.lowL>=12&&!((a.flags.lyT||0)>S.t)&&head()){a.flags.lyT=S.t+36;enqueue('ly',S.head,{a:a.id,b:b.id})}
  [a,b].forEach(p=>{const o=p===a?b:a;if(p.flags.ngoai){if(chance(0.04)){p.flags.ngoaiLo=1;enqueue('ev',o.id,{ev:'v62_ngoai_tinh_lo',data:{who:p.id}})}if(S.t-p.flags.ngoai>36&&chance(0.05))p.flags.ngoai=0;return}
    if(age(p)<18||age(p)>58||p.away)return;
    const pr=0.0011*(v<35?2.2:v>70?0.25:1)*(axv(p,'tiet')<35?1.6:1)*(p.habits.includes('thanhlau')?2.5:1)*(p.mi>=70?1.3:1)*(p.g==='nữ'?0.55:1)*(rule('nghiem')?0.7:1);
    if(chance(pr))p.flags.ngoai=S.t})})}
function groundsOf(w,h){const g=[];const sons=kidsOf(w).filter(k=>k.g==='nam'&&k.dead==null&&k.parents.includes(h.id));
  if(!sons.length&&age(w)>=40)g.push('votu');if(w.flags.dam)g.push('dam');
  if(S.people.filter(p=>h.parents.includes(p.id)&&inClan(p)).some(p=>relOf(w,p)<=-30))g.push('batsu');
  if(axv(w,'hd')>=70&&axv(w,'diem')<=35)g.push('khau');if(w.habits.includes('trom'))g.push('dao');if(w.flags.ghen||has(w,'danghi'))g.push('do');if(w.cap.suc<35)g.push('tat');return g}
function batkhuOf(w){const g=[];if(w.flags.tangCM)g.push('tang');if(w.marTier!=null&&tierIdx()-w.marTier>=2)g.push('ngheo');if(w.flags.coi)g.push('coi');return g}
function lyPopup(hd,it){const a=P(it.a),b=P(it.b);if(!a||!b||!inClan(a)||!inClan(b)||a.spouse!==b.id){setTimeout(nextPopup,0);return}
  const self=isHead(a)||isHead(b);
  choicePopup(hd,'Phân xử',`${a.given} và ${b.given} bất hòa`,`Vợ chồng ${esc(a.given)} và ${esc(b.given)} lạnh nhạt với nhau đã hơn một năm (tình cảm ${Math.round(a.love)}). ${self?'Chuyện của chính gia chủ, cả họ đang nhìn.':'Hai người đến xin gia chủ phân xử.'}`,[
    {l:'Hòa giải, khuyên nhủ',r:[{eq:0.7,khau:0.5},48+(20-a.love)],y:x=>{a.love=b.love=Math.min(100,a.love+22);a.flags.lowL=0;return 'Nói hết nỗi lòng, hai người nhìn nhau rơi nước mắt, hứa làm lại.'},n:x=>{a.love=b.love=Math.max(0,a.love-4);return 'Hòa giải không thành, mỗi người một phòng.'}},
    {l:'Cho ly thân một thời gian',s:'Không sinh con trong lúc này',f:x=>{const u=S.t+R(12,30);a.flags.sepUntil=b.flags.sepUntil=u;a.flags.lowL=0;const o=b.inLaw?b:a.inLaw?a:null;if(o&&o.g==='nữ'&&!o.away)o.away={type:'sep',until:u};return `Hai người tạm xa nhau${o&&o.away?', '+esc(o.given)+' về nhà mẹ đẻ':''}. Hết hạn sẽ tính tiếp.`}},
    {l:'Cho ly hôn',go:()=>divorcePopup(hd,a,b)},
    {l:'Cấm ly hôn, bắt sống cho trọn đạo',f:x=>{S.on=clamp(S.on+2,0,100);[a,b].forEach(p=>addStat(p,'tam',-8));a.love=b.love=Math.max(0,a.love-4);a.flags.lowL=6;return 'Hai người cúi đầu nghe lệnh, nhưng nhà như có bóng ma.'}}])}
function divorcePopup(hd,a,b){const out=b.inLaw?b:a.inLaw?a:b;const stay=out===a?b:a;const wife=out.g==='nữ'?out:null;
  const G0=wife?groundsOf(wife,stay):[];const BK=wife?batkhuOf(wife):[];const mutual=a.love<30;const kidsS=kidsOf(out).filter(k=>inClan(k)&&age(k)<7);
  const gtx=G0.length?`Theo lệ thất xuất, có thể bỏ vợ vì: ${G0.map(k=>THATXUAT[k].toLowerCase()).join(', ')}.`:'';const btx=BK.length?` Nhưng có lẽ tam bất khứ: ${BK.map(k=>BATKHU[k].toLowerCase()).join(', ')}, bỏ thì trái đạo.`:'';
  const opts=[];
  if(mutual)opts.push({l:'Hòa ly: hai bên thuận tình chia tay',s:'Hợp lệ, ít điều tiếng',f:x=>divorce(out,stay,'hoaly',false)},
    ...(kidsS.length?[{l:'Hòa ly, cho mẹ mang con nhỏ theo',s:`${kidsS.length} đứa dưới 7 tuổi`,c:()=>out.g==='nữ',f:x=>divorce(out,stay,'hoaly',true)}]:[]));
  if(wife&&G0.length)opts.push({l:`Viết hưu thư bỏ vợ (${THATXUAT[G0[0]].toLowerCase()})`,s:BK.length?'Trái tam bất khứ, mang tiếng bạc tình':'Đúng lệ thất xuất',f:x=>divorce(out,stay,BK.length?'trai':'thatxuat',false)});
  if(wife&&!G0.length&&!mutual)opts.push({l:'Cứ bỏ vợ dù không có lý do',s:'Trái lệ, cả họ chê trách',f:x=>divorce(out,stay,'trai',false)});
  if(!wife)opts.push({l:`Để ${out.given} rời khỏi gia tộc`,s:'Con rể ra đi, con cái ở lại',f:x=>divorce(out,stay,mutual?'hoaly':'trai',false)});
  opts.push({l:'Thôi, để nghĩ lại',f:x=>'Chưa quyết.'});
  choicePopup(hd,'Ly hôn',`Ly hôn: ${a.given} và ${b.given}`,`${gtx}${btx}${mutual?' Cả hai đều đã cạn tình, có thể hòa ly.':''} Người rời đi là ${esc(nameOf(out))}, mang theo tiền riêng của mình.`,opts)}
function divorce(out,stay,mode,takeKids){
  sphEnd(out,stay.id,'ly');sphEnd(stay,out.id,'ly');
  out.left='lyhon';out.leftT=S.t;out.spouse=null;stay.spouse=null;stay.love=out.love=null;stay.flags.divorced=S.t;out.flags.divorced=S.t;
  if(out.biz){const b=bizOf(out);if(b)b.owner=null;out.biz=null}
  Object.keys(CLANOFF).forEach(k=>{if(S.coff[k]===out.id)S.coff[k]=null});
  const kids=kidsOf(out).filter(k=>inClan(k));let tk='';
  if(takeKids){const sm=kids.filter(k=>age(k)<7);sm.forEach(k=>{k.left='theome';k.leftT=S.t});tk=` ${sm.length} đứa con nhỏ theo mẹ.`}
  kids.filter(k=>inClan(k)).forEach(k=>{const bad=out.habits.some(h=>['donhau','ruou'].includes(h)&&vlv(out,h)>=40);addStat(k,'tam',bad?4:-12);if(!bad)addRel(k,stay,-6);shiftAx(k,bad?{dl:2}:{hd:-3,ht:-2})});
  let d=0;if(mode==='hoaly')d=-2;else if(mode==='thatxuat')d=-3;else d=-15;cf(d,mode==='trai'?'Ly hôn trái lệ':'Ly hôn');S.on=clamp(S.on+(mode==='trai'?-8:-3),0,100);
  if(mode==='trai'&&out.g==='nữ')addStat(stay,'tam',-4);
  log(`${nameOf(stay)} và ${nameOf(out)} ${mode==='hoaly'?'hòa ly':'ly hôn'}. ${nameOf(out)} rời khỏi gia tộc.${tk}`,'hi');
  return `${esc(out.given)} thu dọn đồ đạc, lặng lẽ ra khỏi cổng.${tk}${mode==='trai'?' Người ngoài chê gia tộc bạc tình.':''} Từ nay ${esc(stay.given)} có thể lập gia thất mới.`}

/* ---------- con gái gả đi vẫn ở cây gia phả ---------- */
function marryOut(c,p){c.left='xuatgia';c.leftT=S.t;c.outSp={n:nameOf(p),sur:p.surname,tier:p.needT||0,t0:tierIdx(),kids:0,son:0};outLink(c,p);const got=Math.round(p.fee*0.6);S.money+=got;cf(3,'Gả con gái');S.hung=clamp(S.hung+2,0,100);
  (S.inlaws=S.inlaws||[]).push({sur:p.surname,tier:p.needT||0,pid:c.id,t:S.t});log(`${nameOf(c)} xuất giá về nhà họ ${p.surname}, nhà trai đưa sính lễ ${money(got)}.`,'gd')}
function outsTick(){const outs=S.people.filter(p=>p.dead==null&&p.left&&!['luuvong'].includes(p.left));
  outs.forEach(p=>{const a=Math.floor((S.t-p.born)/12);if(a>58&&chance(0.0012*(a-50))){p.dead=S.t;if(p.left==='xuatgia')log(`Tin từ nhà họ ${p.outSp?p.outSp.sur:'bên chồng'}: ${nameOf(p)} đã qua đời, hưởng ${a} tuổi.`,'hi');return}
    if(!head())return;
    if(p.left==='xuatgia'){xgYear(p);const yrs=(S.t-(p.leftT||S.t))/12;if(chance(0.0025*(yrs<10?2:0.4))){const ev=xgPick(p);if(ev)enqueue('ev',S.head,{ev,data:{xg:p.id}})}}
    if(['expelled','botron','tumat'].includes(p.left)&&S.t-(p.leftT||S.t)>=36&&a<70&&chance(0.002))enqueue('ev',S.head,{ev:'v62_tro_ve',data:{xg:p.id}})})}
function comeHome(p,kid){p.left=null;p.leftT=null;p.hh=mainHH();p.spouse=null;p.flags.divorced=S.t;p.away=null;
  if(kid&&Math.floor((S.t-p.born)/12)>=18&&Math.floor((S.t-p.born)/12)<=44){const pa=Math.floor((S.t-p.born)/12);const k=mkPerson({g:chance(0.5)?'nam':'nữ',surname:(p.outSp&&p.outSp.sur)||pick(SURN),age:Math.max(1,Math.min(R(2,8),pa-16)),young:true,hh:mainHH()});k.parents=[p.id];k.gen=(p.gen||1)+1;k.ngoai=1;ensurePersona(k);S.people.push(k)}}

/* ================= trục xuất, từ mặt ================= */
function expelScope(c,sc){let L=[c];
  if(sc==='hh'){const sp=spouseOf(c);if(sp&&inClan(sp))L.push(sp);const desc=p=>kidsOf(p).filter(k=>inClan(k)).forEach(k=>{L.push(k);const s2=spouseOf(k);if(s2&&inClan(s2)&&s2.inLaw)L.push(s2);desc(k)});desc(c)}
  if(sc==='chi')L=alive().filter(p=>p.hh===c.hh);
  return [...new Set(L)].filter(p=>!isHead(p))}
function expelPopup2(c){const hd=head();if(!hd)return;const br=c.hh!==mainHH();
  const bad=c.fame<0||c.habits.some(h=>['bac','thanhlau','xahoa','trom'].includes(h)&&vlv(c,h)>=40)||traitsOf(c).some(t=>['thamlam','gianxao'].includes(t))||(c.oan||0)>=70;
  const go=sc=>()=>{const L=expelScope(c,sc);confirmBox(`Trục xuất ${L.length} người?`,`${L.map(p=>esc(p.given)).join(', ')} sẽ bị xóa tên khỏi gia phả chính. Việc này khó mà rút lại.`,'Trục xuất',()=>{O.hidden=true;M.innerHTML='';doExpel(L,bad);closeModal()},closeModal)};
  const opts=[{l:`Chỉ trục xuất ${c.given}`,go:go('one')}];
  if(spouseOf(c)||kidsOf(c).some(inClan))opts.push({l:`Trục xuất cả nhà ${c.given}`,s:`${expelScope(c,'hh').length} người: vợ chồng, con cháu`,go:go('hh')});
  if(br)opts.push({l:`Trục xuất cả ${HH(c.hh).name}`,s:`${expelScope(c,'chi').length} người`,go:go('chi')});
  opts.push({l:'Thôi, cho thêm một cơ hội',f:()=>fx(c,{tam:-6,ax:{ht:2}})});
  choicePopup(hd,'Gia pháp',`Trục xuất ${nameOf(c)}?`,`Mở từ đường, gạch tên khỏi gia phả. ${bad?'Người này quả có nhiều điều tiếng, cả họ sẽ hiểu.':'Người này chưa làm gì quá đáng, cả nhà sẽ thấy bất công.'} Vợ hay chồng không bị trục xuất thì được tự do tái giá.`,opts)}
function doExpel(L,bad){const ids=new Set(L.map(p=>p.id));
  L.forEach(p=>{p.left='expelled';p.leftT=S.t;if(p.biz){const b=bizOf(p);if(b)b.owner=null;p.biz=null}Object.keys(CLANOFF).forEach(k=>{if(S.coff[k]===p.id)S.coff[k]=null});
    const sp=spouseOf(p);if(sp&&!ids.has(sp.id)&&inClan(sp)){if(sp.inLaw&&(sp.love||40)>=55&&chance(0.6)){sp.left='theochong';sp.leftT=S.t;log(`${nameOf(sp)} đi theo ${p.given}.`)}else{sphEnd(sp,p.id,'ly');sphEnd(p,sp.id,'ly');sp.spouse=null;p.spouse=null;sp.flags.divorced=S.t}}});
  alive().forEach(q=>{if(L.some(p=>p.parents.includes(q.id)||q.parents.includes(p.id))){addStat(q,'tam',-12);if(!bad)q.oan=Math.min(100,(q.oan||0)+25)}});
  const n=L.length;if(bad){S.on=clamp(S.on+4,0,100);cf(3,'Giữ nghiêm gia phong')}else{S.on=clamp(S.on-6-n*2,0,100);cf(-4-n,'Trục xuất bất công')}
  log(`${L.map(p=>nameOf(p)).join(', ')} bị trục xuất khỏi gia tộc.`,'hi')}
function tumatCheck(){alive().forEach(k=>{if(k.inLaw||age(k)<16||(k.flags.tmT||0)>S.t)return;S.people.filter(p=>k.parents.includes(p.id)&&inClan(p)).forEach(p=>{
  if(relOf(p,k)<=-60&&relOf(k,p)<=-45&&head()&&chance(0.25)){k.flags.tmT=S.t+60;enqueue('tumat',S.head,{p:p.id,k:k.id})}})})}
function tumatPopup(hd,it){const p=P(it.p),k=P(it.k);if(!p||!k||!inClan(p)||!inClan(k)){setTimeout(nextPopup,0);return}
  const pw=p.g==='nam'?'cha':'mẹ';
  choicePopup(hd,'Gia sự',`${p.given} muốn từ ${k.given}`,`${esc(nameOf(p))} tuyên bố không nhận ${esc(k.given)} là con nữa. ${esc(k.given)} cũng chẳng coi ${pw} ra gì. Luật xưa coi con bất hiếu là tội nặng trong mười tội ác, nhưng cha mẹ quá khắt khe cũng chẳng phải lẽ.`,[
    {l:'Gọi hai bên ra hòa giải',r:[{eq:0.7,khau:0.5},55],y:x=>{addRel(p,k,45);addRel(k,p,40);return `${esc(k.given)} quỳ xuống xin lỗi, ${pw} ôm con mà khóc.`},n:x=>{addRel(p,k,-5);return 'Hai bên càng nói càng xa.'}},
    {l:'Trị tội bất hiếu',f:x=>{if(obey(k)>=35){shiftAx(k,{ht:12});addRel(p,k,15);S.on=clamp(S.on+3,0,100);return `${esc(k.given)} bị phạt quỳ ở từ đường ba ngày, từ đó không dám hỗn.`+fx(k,{tam:-15,fame:-5})}
      k.left='botron';k.leftT=S.t;S.on=clamp(S.on-6,0,100);log(`${nameOf(k)} bỏ nhà ra đi, không chịu nhận tội.`,'hi');return `${esc(k.given)} không chịu tội, bỏ nhà ra đi ngay trong đêm.`}},
    {l:'Chấp thuận cho từ mặt',s:married(k)?'Ra ở riêng, không qua lại':'Bị gạch tên khỏi gia phả',f:x=>{k.flags.tumat=p.id;ensurePersona(p);ensurePersona(k);p.rel[k.id]=-90;k.rel[p.id]=-90;cf(-4,'Cha con từ mặt');
      if(married(k)){const id=newBranch(k,0,Math.max(0,k.purse));k.purse=0;[k,spouseOf(k),...kidsOf(k).filter(q=>inClan(q)&&age(q)<18)].filter(Boolean).forEach(q=>q.hh=id);return `${esc(k.given)} dọn ra túp lều riêng, từ nay không bước qua cổng nhà ${pw} nữa.`}
      k.left='tumat';k.leftT=S.t;return `Tên ${esc(k.given)} bị gạch khỏi gia phả chính.`}},
    {l:'Mặc kệ',f:x=>{S.on=clamp(S.on-3,0,100);return 'Chuyện cha con cứ âm ỉ.'}}])}

/* ================= sinh nở: nghỉ hồi sức, gia quy số con ================= */
const kidCap=()=>rule('han3')?3:rule('han5')?5:99;
function canConceive(c){if((c.flags.ppUntil||0)>S.t)return false;
  {const cap=kidCap();if(cap<99&&kidsOf(c).filter(k=>k.dead==null&&!k.adopted).length>=cap)return false} /* v6.5.4: gia quy số con là tuyệt đối */if((c.flags.sepUntil||0)>S.t)return false;if(c.suc<Math.min(60,c.cap.suc*0.75))return false;return true}
function overBirth(m){const n=kidsOf(m).filter(k=>k.dead==null&&!k.adopted).length;if(n>kidCap()&&head())enqueue('vuotsinh',S.head,{m:m.id,n})}
function vuotsinhPopup(hd,it){const m=P(it.m);if(!m){setTimeout(nextPopup,0);return}const sp=spouseOf(m);const fine=mm(3);
  choicePopup(hd,'Gia quy',`Sinh vượt gia quy`,`${esc(nameOf(m))} vừa sinh đứa thứ ${it.n}, quá số con gia quy cho phép (${kidCap()}). Cả họ nhìn xem gia chủ xử thế nào.`,[
    {l:`Phạt tiền riêng (${money(fine)})`,f:x=>{const pay=[m,sp].filter(Boolean);pay.forEach(p=>p.purse-=Math.round(fine/pay.length));S.money+=fine;pay.forEach(p=>{addRel(p,hd,-6)});S.on=clamp(S.on+1,0,100);return 'Nộp phạt vào công quỹ, gia quy được giữ.'}},
    {l:'Phạt quỳ từ đường',f:x=>{[m,sp].filter(Boolean).forEach(p=>{addStat(p,'tam',-8);shiftAx(p,{ht:2})});return 'Hai vợ chồng quỳ trước bàn thờ tổ tiên nhận lỗi.'}},
    {l:'Châm chước lần này',f:x=>{S.on=clamp(S.on-3,0,100);return 'Có người lẩm bẩm gia quy chỉ để làm cảnh.'}}])}

/* ================= gia quy động ================= */
function ruleSlots(){if(!S)return 3;let n=3;if(tierIdx()>=3||alive().length>=15)n+=2;if(tierIdx()>=5||clanTuoc()>0)n+=2;if(S.royal||tierIdx()>=6)n+=2;return n}
function ruleState(){return {tier:tierIdx(),deg:alive().reduce((m,p)=>Math.max(m,p.degree||0),0),vo:clanTuoc()>0||alive().some(p=>p.job==='quan_ngu'&&p.lv>=3)}}
function ruleReq(k){const q=RULES[k].req;if(!q)return null;const R0=RULEREQ[q];return R0&&!R0[1](ruleState())?R0[0]:null}
function ruleClash(k){const c=RULEX_CONFLICT.find(([a,b])=>(a===k&&S.rules.includes(b))||(b===k&&S.rules.includes(a)));return c?RULES[c[0]===k?c[1]:c[0]].n:null}
function ruleWhy(k){if(S.rules.includes(k))return '';const w=(S.ruleT||-99)+12-S.t;if(w>0)return `Đợi ${w} tháng`;if(S.rules.length>=ruleSlots())return 'Hết chỗ';const q=ruleReq(k);if(q)return 'Cần: '+q.toLowerCase();const x=ruleClash(k);if(x)return 'Trái với: '+x.toLowerCase();return ''}
function addRule(k,why){if(S.rules.includes(k))return false;S.rules.push(k);S.ruleT=S.t;if(S.t>0)S.on=clamp(S.on-5,0,100);log(`Gia quy thêm điều: ${RULES[k].n.toLowerCase()}${why?' ('+why+')':''}.`,'gd');return true}
/* ================= v6.4.1.5: họ gốc · hộ · chi họ ================= */
/* Ba khái niệm tách riêng: họ gốc (p.bf: họ sinh ra; người trong họ thì là họ mình, dâu rể thì là họ bên kia, có cid nếu là một họ trong vùng),
   hộ đang sống (p.hh), chi họ (S.hh[id].br, mặc định trùng với hộ; bản 6.4.1.6 sẽ cho một chi có nhiều hộ ở nơi khác). */
const brOf=p=>{const h=S.hh[p.hh];return h&&h.br||p.hh};
const birthOf=p=>p.bf||(p.inLaw?{sur:p.surname}:{sur:S.surname,own:1});
/* ================= v6.4.1.5: quan hệ giữa các họ ================= */
/* Mỗi họ khác (họ trong vùng, danh gia, bốn đại gia) có: rel hảo cảm (-100..100), oan thù oán (0..100, nhớ qua đời gia chủ),
   hon số lần thông gia, canh cảnh giác, gp gia phong, nhg số lần nhà mình đã nhường, book sổ ân oán. Uy tín và lợi ích suy từ danh vọng và làm ăn chung. */
const GP={trongle:{n:'Trọng lễ',y:8,d:'coi trọng lễ nghĩa, ghét kẻ thất lễ'},nhanhau:{n:'Nhân hậu',y:15,d:'dễ tha thứ, hay giúp người'},hamloi:{n:'Hám lợi',y:-5,gift:1.6,d:'việc gì cũng tính lời lỗ, của biếu dễ mua lòng'},
  ngangnguoc:{n:'Ngang ngược',y:-15,d:'cậy thế lấn người'},thucuu:{n:'Thủ cựu',y:0,d:'giữ nếp cũ, khó đổi ý'},trongvo:{n:'Trọng võ',y:-5,d:'phục kẻ mạnh, khinh kẻ yếu'}};
const GPK=Object.keys(GP);
const REL_B=[[70,'Tri kỷ'],[50,'Đồng minh'],[25,'Mến'],[-15,'Xa lạ'],[-45,'Bất hòa'],[-80,'Thù oán'],[-100,'Cực đoan'],[-101,'Một sống một còn']];
const relBandN=r=>(REL_B.find(([v])=>r>=v)||REL_B[REL_B.length-1])[1];
const relBandK=r=>r>=70?'trike':r>=50?'dongminh':r>=25?'men':r>-15?'xala':r>-45?'bathoa':r>-80?'thuoan':r>-100?'cucdoan':'songcon';
function relEns(o){if(!o)return o;if(!o.gp)o.gp=pick(GPK);if(o.oan==null)o.oan=o.feud?20:0;if(o.hon==null)o.hon=o.mar||0;if(o.canh==null)o.canh=R(10,40);if(o.nhg==null)o.nhg=0;if(!o.book)o.book=[];return o}
const relBase=o=>-(o.oan||0)*0.4+Math.min(3,o.hon||0)*8;
function relBook(o,txt){relEns(o);o.book.push({t:S.t,txt});if(o.book.length>12)o.book.shift()}
function relRefs(){if(!S.w||!S.loc)return [];const out=houseRefs().slice();const seen=new Set(out.map(r=>r.key));
  w_clans(S.loc.p).forEach(c=>{const k='C'+c.id;if(!seen.has(k)){seen.add(k);out.push({t:'C',id:c.id,p:S.loc.p,at:true,mo:0,key:k})}});return out}
const ctierC=c=>c.house?c.house.tier:c.fame>=120?3:c.fame>=60?2:c.fame>=20?1:0;
const ctierOf=(I)=>I.t==='H'?(I.tier||5):I.obj.house?I.obj.house.tier:I.fame>=120?3:I.fame>=60?2:I.fame>=20?1:0;
function rinfo(r){const I=hinfo(r);if(!I)return null;const o=relEns(I.obj);I.gp=o.gp;I.gpN=GP[o.gp].n;I.gpD=GP[o.gp].d;I.tier=ctierOf(I);I.oan=o.oan;I.hon=o.hon;I.canh=o.canh;I.nhg=o.nhg;I.book=o.book;
  I.diff=I.tier-tierIdx();I.dir=I.diff>=1?'up':I.diff<=-1?'down':'eq';I.band=relBandK(I.rel);I.bandN=relBandN(I.rel);I.ref=r;
  I.rel0=v=>{o.rel=clamp(o.rel+v,-100,100);o.last=S.t;I.rel=o.rel;return v};I.addOan=v=>{o.oan=clamp(o.oan+v,0,100);I.oan=o.oan};I.log=t=>relBook(o,t);return I}
/* nhường nhịn: thành bại theo EQ người ra mặt, chênh lệch địa vị, gia phong bên kia, hảo cảm hiện tại, số lần đã nhường, lễ vật */
function yieldT(I,gift){const G0=GP[I.gp]||GP.thucuu;return clamp(55-(tierIdx()-I.tier)*8-G0.y-I.rel/4+(I.nhg||0)*6-(gift?12*(G0.gift||1):0),15,95)}
function yieldOpts(I,c){const cost=mm(6+I.tier*4);const ok=(gift)=>x=>{if(gift)S.money-=cost;I.rel0(gift?14:10);I.addOan(-6);I.obj.nhg=Math.max(0,(I.obj.nhg||0)-1);return 'Bên kia nguôi giận, chuyện tạm êm.'+fx(x,{tam:-2})};
  const bad=(gift)=>x=>{if(gift)S.money-=cost;I.obj.nhg=(I.obj.nhg||0)+1;I.rel0(-4);return 'Nhường mà họ được thể lấn tới.'+fx(x,{tam:-5,fame:-2})};
  return [{l:'Nhường nhịn, chịu thiệt một phen',s:'Hòa hoãn; nhường mãi thì họ lấn tới',ax:{diem:1,rong:1},r:[{eq:1,khau:0.5},yieldT(I,false)],y:ok(false),n:bad(false)},
    {l:`Nhường nhịn kèm lễ vật (${money(cost)})`,s:'Dễ êm chuyện hơn',ax:{diem:1},c:()=>S.money>=cost,r:[{eq:1,khau:0.5},yieldT(I,true)],y:ok(true),n:bad(true)}]}
/* mỗi tháng: có thể có một chuyện với một họ khác, chọn theo mức hảo cảm và chênh lệch địa vị */
function relTick(){const hd=head();if(!hd||!S.w||!S.loc||S.queue.length>3)return;if(!chance(0.03*(tierIdx()>=3?1.3:1)))return;
  const refs=relRefs();if(!refs.length)return;const cand=[];
  const poor=tierIdx()<2;
  refs.forEach(r=>{const I=rinfo(r);if(!I)return;if(r.t==='H'&&tierIdx()<3)return;if(I.tier>=4&&tierIdx()<2)return;
    EVENTS.forEach(e=>{if(!e.rg)return;const g=e.rg;if(poor&&g.f)return;   /* nhà nghèo thì không ai đến làm thân */if(g.b&&!g.b.includes(I.band))return;if(g.d&&!g.d.includes(I.dir))return;
      if(g.init&&I.tier>=6&&I.rel<70)return;   /* Danh môn vọng tộc không chủ động kết thân */
      const ck=e.id+'|'+r.key;if((S.cool[ck]||-1e9)>S.t||(S.cool[e.id]||-1e9)>S.t)return;try{if(g.c&&!g.c(I,hd))return}catch(err){return}
      cand.push({e,r,I,w:(e.w||1)*(r.at?1.4:1),ck})})});
  if(!cand.length)return;let tot=cand.reduce((a,x)=>a+x.w,0),rr=Math.random()*tot,pk=cand[0];for(const x of cand){rr-=x.w;if(rr<=0){pk=x;break}}
  S.cool[pk.ck]=S.t+(pk.e.rgcd||60);S.cool[pk.e.id]=S.t+(pk.e.rgg||12);enqueue('ev',hd.id,{ev:pk.e.id,data:{rr:pk.r}})}
/* một sống một còn: thắng thì nhà kia suy tàn, dời đi; thua thì hết game */
function relWin(I){const o=I.obj;o.fame=Math.round(o.fame*0.4);o.wealth=Math.round((o.wealth||50)*0.4);o.rel=-30;o.oan=40;relBook(o,'Thua trong cuộc một sống một còn, phải dời đi');
  if(I.t==='C'){const L=S.w.clans[I.p]||[];const i=L.indexOf(o);if(i>=0){L[i]=w_genClan(I.p);L[i].fame=Math.round(L[i].fame/2)}}
  const land=R(2,8);S.farm.own+=land;cf(25,'Thắng cuộc một sống một còn');S.hung=clamp(S.hung+8,0,100);return `${esc(I.name)} suy sụp, phải bán nhà dời đi nơi khác. Nhà mình lấy được ${land} mẫu ruộng và mối làm ăn của họ.`}
function relLose(I){gameOver(`Cuộc một sống một còn với ${I.name} kết thúc. Nhà mình thua: ruộng bị chiếm, người bị vu tội, con cháu tan tác.`,'Một sống một còn')}
/* dâu rể từ một họ trong vùng: hai họ thành thông gia */
const MAR_N={mondang:'Môn đăng hộ đối',chinhtri:'Hôn nhân chính trị',loiich:'Hôn nhân lợi ích',cuongep:'Hôn nhân cưỡng ép',sasut:'Kết thân với nhà sa sút',traon:'Hôn nhân trả ơn',thuong:'Hôn nhân thông thường'};
function marKind(c,tier,cl){const d=(tier||0)-tierIdx();if(cl&&cl.rel>=70)return 'traon';if(axv(c,'dl')>=70&&chance(0.4))return 'cuongep';
  if(alive().some(p=>inClan(p)&&p.job==='quan'&&p.lv>=4)&&d>=1)return 'chinhtri';if(d<=-2)return 'sasut';if(Math.abs(d)<=0)return 'mondang';if(d>=1)return 'loiich';return 'thuong'}
/* v6.5.2: nơi một người đang thực sự ở: nơi nhậm chức, nơi theo cha/chồng đi làm quan, chi họ xa, hoặc nhà chính */
function whereP(c){const ok=p=>p&&PROV[p]?p:null;
  return (c.pst&&ok(c.pst.p))||(c.away&&c.away.type==='follow'&&ok(c.away.p))||(S.hh&&S.hh[c.hh]&&S.hh[c.hh].far&&ok(S.hh[c.hh].p))||(S.loc&&S.loc.p)}
const awayFromHome=c=>inClan(c)&&S.loc&&whereP(c)!==S.loc.p;
function clanBySur(sur,pv){if(!S.w||!S.loc||!sur)return null;return w_clans(pv||S.loc.p).find(c=>c.sur===sur)||null}
function inlawLink(c,p){p.bf={sur:p.surname};c.flags.wedT=S.t;p.flags.wedT=S.t;const cl=clanBySur(p.surname,whereP(c));
  const k=marKind(c,p.famT||0,cl);c.marT=p.marT=k;if(k==='cuongep')addStat(c,'tam',-10);
  if(cl){relEns(cl);p.bf.cid=cl.id;p.bf.p=whereP(c);cl.hon++;cl.rel=clamp(cl.rel+12,-100,100);relBook(cl,`${nameOf(c)} cưới người họ ${cl.sur}`)}}
function outLink(c,p){const cl=clanBySur(p.surname,whereP(c));const k=marKind(c,p.needT||0,cl);c.marT=k;
  if(cl){relEns(cl);c.outSp.cid=cl.id;c.outSp.p=whereP(c);cl.hon++;cl.rel=clamp(cl.rel+15,-100,100);relBook(cl,`Gả ${nameOf(c)} về họ ${cl.sur}`)}}
/* thế đứng của con gái đã gả đi ở nhà chồng */
function xgStand(p){const o=p.outSp||{};ensurePersona(p);const tal=((p.tri||40)+(p.eq||40)+(p.mi||40))/3;const vir=(axv(p,'ht')+axv(p,'thanh')+axv(p,'rong')+axv(p,'tiet'))/4;
  const cl=o.cid?w_clan(o.p,o.cid):null;
  return clamp(tal*0.35+vir*0.3+(o.son?15:0)+(tierIdx()-(o.tier||0))*10+(alive().some(q=>inClan(q)&&q.job==='quan')?8:0)+(cl?cl.rel/5:0)+({mondang:5,traon:10,sasut:8,cuongep:-10,loiich:-3}[p.marT]||0)-(o.coi?15:0),0,100)}
function xgYear(p){if(S.t%12!==0)return;const o=p.outSp;if(!o)return;const a=Math.floor((S.t-p.born)/12);if(a<45&&chance(0.22)){o.kids=(o.kids||0)+1;if(chance(0.5))o.son=(o.son||0)+1}}
function xgPick(p){const st=xgStand(p);const o=p.outSp||{};const yrs=(S.t-(p.leftT||S.t))/12;const L=[];
  const cause=(yrs>=5&&!o.kids)||(tierIdx()<(o.t0??tierIdx())-1)||(o.cid&&(w_clan(o.p,o.cid)||{}).rel<=-15)||(o.coi&&o.nhin);
  L.push(['v62_xg_ve_tham',2],['xg_qua_tet',1.2]);
  if(st>=60)L.push(['xg_chu_mau',yrs>=12?1.5:0.2],['xg_chau_ngoai',o.kids?1:0],['xg_thong_gia_giup',1]);
  if(st<45)L.push(['v62_xg_bi_bat_nat',st<30?1.6:0.8],['v62_xg_thong_gia_nho',0.8]);else L.push(['v62_xg_thong_gia_nho',0.4]);
  if(st<40&&cause&&!o.back)L.push(['v62_xg_ly_hon_ve',0.8]);
  if(o.cid)L.push(['xg_nha_chong_nan',0.3]);
  const ok=L.filter(([id,w])=>w>0&&EVMAP[id]);if(!ok.length)return null;let tot=ok.reduce((s,x)=>s+x[1],0),r=Math.random()*tot;for(const [id,w] of ok){r-=w;if(r<=0)return id}return ok[0][0]}
/* ================= v6.4.1.6: chi họ xa ================= */
/* S.hh[id].p là tỉnh chi đang ở (không có thì ở cùng nhà chính), far: chi ở xa, gan: mức gắn bó với chính họ (0..100),
   st: 'tuquan' tự quản (mặc định) hoặc 'doclap' độc lập (không nộp gì, chính họ không sai bảo được), off: người làm quan đã lập chi */
function farBranch(c,p,mem){
  /* v6.7.0: trưởng một chi xa dời tới nơi khác thì dời chính hộ đó, không lập hộ mới; nhà ruộng ở nơi cũ bán đi */
  const oh=S.hh[c.hh];
  if(oh&&oh.far&&c.hh!==mainHH()){const Lr=branchLeader(c.hh);if(Lr&&Lr.id===c.id){const from=oh.p;let sold=0;
    if(oh.home>0&&HOMES[oh.home]&&!oh.rent&&!oh.keep){sold+=Math.round(HOMES[oh.home].cost*0.5)}
    if(oh.land>0){sold+=Math.round(oh.land*landCost()*0.8);oh.land=0}
    oh.money+=sold;oh.home=1;oh.p=p;oh.gan=70;oh.off=c.id;oh.sold=0;oh.keep=0;oh.rent=0;
    [c,...mem].forEach(x=>{if(x&&inClan(x)){x.hh=c.hh;if(x.away&&x.away.type==='follow')x.away=null}});
    log(`${nameOf(c)} đưa cả chi từ ${from?provN(from):'nơi cũ'} tới ${provN(p)}.${sold?` Nhà ruộng cũ bán được ${money(sold)}, tiền về quỹ chi.`:''}`,'gd');return c.hh}}
  const id=newBranch(c,1,Math.max(0,Math.round((c.purse||0)*0.5)));c.purse=Math.round((c.purse||0)*0.5);
  const H=S.hh[id];H.p=p;H.far=1;H.gan=70;H.st='tuquan';H.off=c.id;H.land=0;
  [c,...mem].forEach(x=>{if(x&&inClan(x)){x.hh=id;if(x.away&&x.away.type==='follow')x.away=null}});
  log(`${nameOf(c)} đưa cả nhà tới ${provN(p)}, lập ${H.name}.`,'gd');return id}
const brAt=p=>Object.keys(S.hh).filter(id=>id!==mainHH()&&S.hh[id].p===p&&alive().some(x=>x.hh===id&&inClan(x)));
function brEndPopup(c,it){const H=S.hh[it.hh];if(!H||!alive().some(x=>x.hh===it.hh&&inClan(x))){setTimeout(nextPopup,0);return}
  const mem=alive().filter(x=>x.hh===it.hh&&inClan(x));
  choicePopup(c,'Chi họ',`${H.name}: về hay ở`,`Việc quan ở ${esc(provN(H.p))} đã xong. ${H.name} (${mem.length} người) sống ở đó đã quen. Về nhập lại nhà chính, hay ở lại thành chi định cư?`,[
    {l:'Về nhập lại nhà chính',f:()=>{mem.forEach(x=>x.hh=mainHH());S.money+=Math.max(0,H.money);H.money=0;H.p=null;H.far=0;H.off=null;log(`${H.name} dọn về nhập lại nhà chính.`,'gd');return 'Cả chi khăn gói trở về quê, đoàn tụ với họ hàng.'}},
    {l:`Ở lại, thành chi định cư ở ${provN(H.p)}`,f:()=>{H.off=null;H.settled=1;log(`${H.name} ở lại ${provN(H.p)}, thành chi định cư.`,'gd');return 'Chi họ bám rễ ở đất mới. Từ nay quê nhà có thêm một nhánh ở phương xa.'}}])}
/* mỗi năm chi xa gửi một phần quỹ về công quỹ, tùy lòng hiếu thuận của chi chủ và mức gắn bó */
function brYear(){for(const id in S.hh){const H=S.hh[id];if(!H.far||id===mainHH()||H.st==='doclap')continue;const L=branchLeader(id);if(!L||H.money<=0)continue;
  const rate=clamp(0.04+(axv(L,'ht')-50)/500+((H.gan??60)-50)/800,0,0.2);const v=Math.round(H.money*rate);if(v<=0)continue;H.money-=v;S.money+=v;log(`${H.name} gửi về công quỹ ${money(v)}.`,'gd')}}
/* ================= v6.4.1.6: gia đình người đi lính ================= */
/* vợ con có thể theo vào doanh trại (away follow); mỗi năm người lính có thể được về phép, nhân dịp ấy cưới vợ hoặc vợ chồng gặp nhau */
/* v6.5.3: gia đình lính đi cùng nhau. Vợ theo thì con nhỏ cũng theo; con theo cha vào doanh thì chỉ học trong doanh; tới 14 tuổi chọn học tiếp hay theo nghề binh. */
const isArmyKid=c=>!!(c&&c.away&&c.away.type==='follow'&&(()=>{const o=P(c.away.of);return !!o&&o.dead==null&&o.job==='quan_ngu'&&o.away&&o.away.type==='army'})());
function lqSync(){
  alive().forEach(s=>{if(s.job!=='quan_ngu'||!s.away||s.away.type!=='army')return;
    const sp=spouseOf(s);const spF=!!(sp&&inClan(sp)&&sp.away&&sp.away.type==='follow'&&sp.away.of===s.id);
    kidsOf(s).filter(k=>inClan(k)&&!k.inLaw).forEach(k=>{const a=age(k);
      if(a<16&&spF&&!k.away)k.away={type:'follow',of:s.id,p:null};
      if(a>=16&&k.flags.armyTrain&&isArmyKid(k)){delete k.flags.armyTrain;k.away=null;enlist(k,false)}})});
  alive().forEach(k=>{if(k.inLaw)return;const a=age(k);
    if(isArmyKid(k)){if(a>=6&&k.school!=='doanh'){k.school='doanh';k.appr=null}
      if(a===14&&!k.flags.lq14){k.flags.lq14=1;const o=P(k.away.of);if(o&&head())enqueue('ev',S.head,{ev:'lq_14_chon',data:{kid:k.id,w:o.id}})}}
    else if(k.school==='doanh')k.school='nha'})}
function lqYear(){lqSync();alive().forEach(c=>{if(c.job==='quan_ngu'&&c.away&&c.away.type==='army'&&inClan(c)&&age(c)>=17&&chance(S.war?0.15:0.35))enqueue('ev',S.head,{ev:'lq_phep',data:{who:c.id}})})}
/* ================= v6.4.1.6: tình duyên ================= */
/* Sự kiện mở đầu một mối tình chỉ đến với người 18 đến 25 tuổi, có tài (một chỉ số chính từ 70, hoặc danh vọng cá nhân từ mốc đầu, hoặc đã đỗ đạt)
   và có đức (trung bình hiếu thuận, thật thà, rộng lượng, tiết chế từ 60). Tính cách quyết định ai dễ rung động: hòa đồng, buông thả thì dễ; cô độc, tiết chế thì khó. */
const ROM_OPEN=['tinh_hoi_xuan','tinh_thu_tinh','tinh_dich','tinh_thanh_mai','tinh_tieu_thu','tt_a','lnh_a','c7_thu'];
function romOk(c){const a=age(c);if(a<18||a>25||c.spouse||c.away||c.left)return false;ensurePersona(c);
  const tal=Math.max(c.tri,c.vo,c.mi,c.eq)>=70||(c.fame||0)>=FAME_SELF[0][0]||(c.degree||0)>=1;
  const duc=(axv(c,'ht')+axv(c,'thanh')+axv(c,'rong')+axv(c,'tiet'))/4>=60;return tal&&duc}
const romP=c=>clamp(0.45+(axv(c,'hd')-50)/100+(50-axv(c,'tiet'))/150-(axv(c,'tv')>=70?0.1:0),0.1,0.9);
function guard6416(){ROM_OPEN.forEach(id=>{const e=EVMAP[id];if(!e||e._r)return;e._r=1;const oc=e.c;e.age=[18,25];e.w=(e.w||1)*1.3;e.c=(c,d)=>romOk(c)&&(!oc||oc(c,d))})}
const ROM_TINH=['hiền hậu','kiêu kỳ','phóng khoáng','e lệ','sắc sảo','chân chất','nhanh nhẹn','đa sầu đa cảm'];
function romPartner(c){const g=c.g==='nam'?'nữ':'nam';const L=(S.w&&S.loc)?w_clans(whereP(c)):[];const cl=pick(L.filter(x=>x.kids.some(k=>k.g===g&&k.age>=16&&k.age<=28)));
  const base={g,tri:R(35,80),mi:R(40,85),eq:R(35,80),tinh:pick(ROM_TINH),age:clamp(age(c)+R(-3,3),16,30)};
  if(cl&&chance(0.6)){const k=cl.kids.find(k=>k.g===g&&k.age>=16&&k.age<=28);return Object.assign(base,{given:k.given,sur:cl.sur,cid:cl.id,kid:k.id,p:whereP(c),tier:ctierC(cl),age:k.age})}
  const n=outsiderName(g,S.region);return Object.assign(base,{given:n.given,sur:n.surname,tier:clamp(tierIdx()+R(-2,1),0,6)})}
function romMarry(c,pt){if(!pt)return '';const cl=pt.cid?w_clan(pt.p,pt.cid):null;if(cl&&pt.kid)cl.kids=cl.kids.filter(k=>k.id!==pt.kid);
  if(c.g==='nữ'){marryOut(c,{surname:pt.sur,given:pt.given,fee:mm(5+pt.tier*4),needT:pt.tier})}
  else{const sp=mkMatch(c,{hh:c.hh});sp.surname=pt.sur;sp.given=pt.given;sp.g=pt.g;sp.tri=pt.tri;sp.mi=pt.mi;sp.eq=pt.eq;sp.famT=pt.tier;mkSpouse(c,true,sp)}
  c.tinh=null;return ''}
function romElope(c,pt){c.left='botron';c.leftT=S.t;c.tinh=null;cf(-6,'Con cháu bỏ nhà theo người thương');alive().forEach(p=>{if(inClan(p)&&(c.parents.includes(p.id)||p.parents.includes(c.id)))addStat(p,'tam',-10)});
  log(`${nameOf(c)} bỏ nhà đi theo ${pt?pt.sur+' '+pt.given:'người thương'}.`,'hi');return ''}

/* ================= v6.4.1.8: ba đường cướp ngôi · lên ngôi · hậu sử ================= */
/* S.usurp = {path, who, st (đã qua mấy bước), the, danh, tai, lo (thế lực, danh nghĩa, tài lực, lộ; 0..100), next, pending}.
   Đạt địa vị thì sau 12 đến 24 tháng tự kích hoạt (S.usWait). Người chơi bỏ được bất cứ lúc nào (usAbandon), kể cả ở bước cuối.
   Thất bại đi qua đường thang hậu quả của quan trường (usFail → qtSentence cấp 5), không bao giờ diệt tộc ngay.
   Lên ngôi: hộp đặt quốc hiệu, niên hiệu (coroPopup), rồi màn hậu sử (hauSu) và hết game. */
const US_N={quyen:'Quyền thần lật đổ',vo:'Võ quan tạo phản',nghia:'Khởi nghĩa'};
const US_STEPS={quyen:['ts_q1','ts_q2','ts_q3','ts_q4','ts_q5','ts_q6','ts_q_cuoi'],
  vo:['ts_v1','ts_v2','ts_v3','ts_v4','ts_v5','ts_v6','ts_v7','ts_v8','ts_v_cuoi'],
  nghia:['ts_n1','ts_n2','ts_n3','ts_n4','ts_n5','ts_n6','ts_n_cuoi']};
/* v6.5.4: ván mới có thêm một bước rẽ nhánh ở giữa mỗi đường (ts_nh_*). Ván đang chạy dở (không có U.v) giữ danh sách bước cũ để chỉ số bước không lệch. */
const US_STEPS2={quyen:['ts_q1','ts_q2','ts_q3','ts_nh_q','ts_q4','ts_q5','ts_q6','ts_q_cuoi'],
  vo:['ts_v1','ts_v2','ts_v3','ts_nh_v','ts_v4','ts_v5','ts_v6','ts_v7','ts_v8','ts_v_cuoi'],
  nghia:['ts_n1','ts_n2','ts_n3','ts_nh_n','ts_n4','ts_n5','ts_n6','ts_n_cuoi']};
const usSteps=U=>(U.v>=2?US_STEPS2:US_STEPS)[U.path];
const US_START={quyen:{the:25,danh:15,tai:20,lo:5},vo:{the:20,danh:10,tai:20,lo:5},nghia:{the:20,danh:30,tai:15,lo:0}};
const usU=()=>S&&S.usurp||null;
function usStatus(path,p){if(!p||p.dead!=null||!inClan(p)||age(p)<22)return false;
  if(path==='quyen')return p.job==='quan'&&p.lv>=8;
  if(path==='vo')return p.job==='quan_ngu'&&p.lv>=ARMY.length-1;
  if(path==='nghia'){const h=thanHolder('vothan');const T=tmOf(p);return (!!h&&h.id===p.id)||(!!T&&T.tm==='devuong'&&age(p)>=25&&p.vo>=60)}
  return false}
const usActors=path=>alive().filter(p=>usStatus(path,p));
const usTarget=a=>(a&&isCtrl(a))?a:head();
function usEnq(id,a,extra){const t=usTarget(a);if(t&&EVMAP[id])enqueue('ev',t.id,{ev:id,data:Object.assign({who:a.id},extra||{})})}
function usStart(path,who,force){const a=typeof who==='string'?P(who):who;if(!a)return null;
  S.usurp=Object.assign({path,who:a.id,st:0,next:S.t+R(2,5),pending:false,pt:0,v:2,br:null},US_START[path]);S.usWait=null;
  qtLog('Bước vào mưu đại sự',`${nameOf(a)} bắt đầu con đường ${US_N[path].toLowerCase()}.`);log(`${nameOf(a)} bắt đầu mưu đại sự.`,'hi');return S.usurp}
function usAdd(e){const U=usU();if(!U||!e)return;['the','danh','tai','lo'].forEach(k=>{if(e[k])U[k]=clamp(U[k]+e[k],0,100)});if(e.money)S.money+=e.money}
function usNext(){const U=usU();if(!U)return;U.st++;U.troops=(U.troops||0)+({quyen:1,vo:2,nghia:3}[U.path]||1); /* v6.7.0: mỗi bước chiêu thêm quân (đội 100 người), nuôi 60 bạc mỗi đội mỗi tháng */U.pending=false;U.next=S.t+R(3,7)}
function usWin(kind){const U=usU();if(!U)return 0;
  let p=(kind==='thien'?U.danh*0.5+U.the*0.25+U.tai*0.1+(100-U.lo)*0.15:U.the*0.45+U.danh*0.15+U.tai*0.15+(100-U.lo)*0.25)/100;
  /* v6.5.4: nhánh đã chọn giữa đường hợp với cách ra tay cuối thì thuận hơn (sĩ phu hợp thiền nhượng, quân lực hợp binh biến, của cải giúp cả hai chút ít) */
  p+=U.br==='si'?(kind==='thien'?0.06:-0.02):U.br==='quan'?(kind==='thien'?-0.02:0.06):U.br==='tien'?0.03:0;
  const d=S.dyn&&S.dyn.k?S.dyn:null;
  if(d){const t=kType(d.k);p+=({hon:0.05,bao:0.06,au:0.08,thu:0,minh:-0.1}[t]||0)+(d.loan>=50?0.04:0)+(d.dt<35?0.04:0)+(d.cr?0.05:0)-(d.k.uy>=75?0.05:0)-(d.dt>=70?0.04:0)}
  const a=P(U.who);if(a){const T=tmOf(a);if(T&&T.tm==='devuong')p+=0.03}
  return clamp(p-0.16,0.04,0.8)}
function usAbandon(){const U=usU();if(!U)return '';const a=P(U.who);const lo=U.lo;const leak=chance(lo/160);
  S.usurp=null;(S.usNoP=S.usNoP||{})[U.path]=S.t+120;
  let t=lo<20?'Mọi dấu vết được xóa sạch, như chưa từng có chuyện gì.':'Người trong cuộc được giải tán, thư từ bị đốt.';
  if(a&&a.dead==null){addStat(a,'tam',-8);a.fame-=Math.round(2+lo/10);
    if(leak){const q=qtOf(a);qtAdd(a,{risk:35,cor:6,crime:Math.max(2,q.crime)});t+=' Nhưng tin vẫn lọt ra ngoài, ngự sử bắt đầu để mắt.';if(a.job==='quan'&&q.st<1)q.st=1}}
  qtLog('Từ bỏ mưu đại sự',`${a?nameOf(a):'Người cầm đầu'} từ bỏ con đường ${US_N[U.path].toLowerCase()}${leak?', nhưng tin đã lọt ra ngoài':''}.`);
  log(`Họ ${S.surname} từ bỏ mưu đại sự.`,'hi');return t}
function usFail(why){const U=usU();const a=U&&P(U.who);S.usurp=null;if(U)(S.usNoP=S.usNoP||{})[U.path]=S.t+120;
  if(!a||a.dead!=null||!inClan(a)){log('Mưu đại sự tan vỡ.','hi');return ''}
  const q=qtOf(a);q.crime=5;q.f=null;qtLog('Mưu đại sự thất bại',`${nameOf(a)} ${why}.`);
  const r=qtSentence(a,5,why);if(S.tdq)S.tdq.us=1;return r}
function usCrown(a,kind){const U=usU()||{path:'quyen',who:a.id,the:60,danh:40,tai:50,lo:30,st:0};U.who=a.id;
  S.usCoro={U:structuredClone(U),who:a.id,kind:kind||''};S.usurp=null;enqueue('coro',S.head,{},true)}
function usMonth(){if(!head()||S.over)return;
  const U=usU();
  if(!U){const W=S.usWait;
    if(W){const p=P(W.who);if(!p||!usStatus(W.path,p)){S.usWait=null;return}
      if(S.t>=W.at){S.usWait=null;usEnq('ts_mo_dau',p,{path:W.path})}return}
    if(S.t%3!==0)return;
    for(const path of shuf(['quyen','vo','nghia'])){if(((S.usNoP||{})[path]||0)>S.t)continue;const L=usActors(path);if(L.length){S.usWait={path,who:L[0].id,at:S.t+R(12,24)};break}}
    return}
  let a=P(U.who);
  if(!a||a.dead!=null||!inClan(a)){const n=usActors(U.path).find(p=>p.id!==U.who);
    if(n){U.who=n.id;a=n;log(`${nameOf(n)} nối tiếp mưu đại sự.`,'hi')}
    else{S.usurp=null;(S.usNoP=S.usNoP||{})[U.path]=S.t+120;log('Mưu đại sự tan vỡ vì người cầm đầu không còn.','hi');qtLog('Mưu đại sự tan vỡ','Người cầm đầu không còn, mưu đại sự tan theo.');return}}
  U.lo=clamp(U.lo+0.25+(U.the>60?0.15:0)+(U.st>=3?0.15:0)+(a.away?0.2:0),0,100);
  /* v6.6.0: mưu đại sự tốn tiền mỗi tháng: nuôi người, mua chuộc, giữ quân. Võ quan và khởi nghĩa tốn hơn quyền thần */
  if(U.st>=1){U.troops=U.troops||0;const ct=U.troops*60000;if(ct>0){S.money-=ct;U.pay=(U.pay||0)+ct}if(S.money<0){U.lo=clamp(U.lo+0.4,0,100);U.the=clamp(U.the-0.5,0,100);if(chance(0.1))U.troops=Math.max(0,U.troops-1)}}
  if(U.pending&&S.t-(U.pt||0)>24)U.pending=false;
  if(U.lo<45)U.warned=0;
  if(U.lo>=60&&!U.warned){U.warned=1;usEnq('ts_lo_tin',a)}
  if(U.lo>=100&&!U.exposed){U.exposed=1;U.pending=true;U.pt=S.t;usEnq('ts_phat_giac',a);return}
  if(!U.pending&&!U.exposed&&S.t>=U.next){const id=usSteps(U)[U.st];if(id&&EVMAP[id]){U.pending=true;U.pt=S.t;usEnq(id,a)}}
  if(U.st>=2&&!U.noi&&!U.pending&&chance(0.012)){U.noi=1;usEnq('ts_noi_phan',a)}}
function usCard(){const U=usU();if(!U)return '';const a=P(U.who);const AD=window.BN_ADMIN;const len=usSteps(U).length;
  const wd=(v,L)=>L[v>=75?3:v>=50?2:v>=25?1:0];const bar=(n,v,txt)=>`<dt>${n}</dt><dd><span class="num">${AD?Math.round(v)+' · ':''}${txt}</span></dd>`;
  return `<section class="card"><span class="eyebrow">Mưu đại sự</span><h2>${US_N[U.path]}</h2>
   <p class="kvline">Người cầm đầu: <b>${a?esc(nameOf(a)):'—'}</b> · bước ${Math.min(U.st+1,len)}/${len}${U.exposed?' · <b class="down">đã có nguy cơ bại lộ</b>':''}</p>
   <dl class="kv">${bar('Thế lực',U.the,wd(U.the,['chưa có gì','còn mỏng','khá vững','rất mạnh']))}${bar('Danh nghĩa',U.danh,wd(U.danh,['chưa có','mơ hồ','khá thuyết phục','chính đáng']))}${bar('Tài lực',U.tai,wd(U.tai,['trống rỗng','eo hẹp','tạm đủ','dồi dào']))}${bar('Lộ',U.lo,wd(U.lo,['kín như bưng','thoáng có người nghi','nhiều người đã đoán ra','sắp bại lộ']))}</dl>
   <div class="acts"><button class="btn small ghost" data-tsbo>Từ bỏ</button></div></section>`}
/* đăng cơ: đặt quốc hiệu, niên hiệu */
const QH_L=['Đại Hưng','Đại Thịnh','Đại Phúc','Đại Lương','Đại Vĩnh','Đại Khang','Đại Trị','Đại An','Đại Định'];
function coroPopup(){const K=S.usCoro;const a=K&&P(K.who);if(!K||!a){setTimeout(nextPopup,0);return}
  const dq=pick(QH_L.filter(x=>x!==(S.dyn&&S.dyn.name)));const dn=pick(ERA_A)+' '+pick(ERA_B);
  openModal(`<span class="eyebrow">Đăng cơ</span><h2>${esc(nameOf(a))} lên ngôi</h2>
   <p>Kinh thành đã đổi chủ. Họ ${esc(S.surname)} từ nay là hoàng tộc. Trước khi làm lễ đăng cơ, hãy đặt quốc hiệu và niên hiệu đầu tiên.</p>
   <div class="field"><label for="qh">Quốc hiệu</label><input id="qh" class="sel" maxlength="24" value="${esc(dq)}"></div>
   <div class="field" style="margin-top:8px"><label for="nh">Niên hiệu đầu tiên</label><input id="nh" class="sel" maxlength="24" value="${esc(dn)}"></div>
   <div class="acts" style="margin-top:12px"><button class="btn primary" data-ok>Làm lễ đăng cơ</button></div>`,false,'menu');
  M.querySelector('[data-ok]').onclick=()=>{const q1=(M.querySelector('#qh').value||'').trim().slice(0,24)||dq;const n1=(M.querySelector('#nh').value||'').trim().slice(0,24)||dn;hauSu(q1,n1)}}
/* hậu sử: chạy một chuỗi các đời vua, bám theo tài đức người khai quốc, danh nghĩa, tình hình thiên hạ lúc lên ngôi, con cháu, gia phong */
function hauSu(qh,nh){const K=S.usCoro;const U=K.U;const a=P(K.who);ensurePersona(a);S.royal=1;a.job='vua';a.lv=0;a.away=null;
  const PN=U.path;const tai=clamp(Math.round(((a.tri||40)+(a.eq||40)+skv(a,'muu')+(PN==='vo'?a.vo:(a.mi||40)))/4*1.15),0,100);
  const duc=Math.round((axv(a,'rong')+axv(a,'thanh')+axv(a,'ht')+axv(a,'tiet'))/4);
  const kids=kidsOf(a).filter(k=>k.dead==null);const hq=kids.length?Math.round(kids.reduce((s0,k)=>s0+(k.tri+k.eq)/2,0)/kids.length):45;
  const d=S.dyn||{};const dt=d.dt??50,loan=d.loan??25;const gpb=['nghiem','tohuan','thuhuong','thanhliem','nghia','hieudao','thuongdan'].filter(k=>rule(k)).length*3;
  let s=clamp(38+(tai-50)*0.3+(duc-50)*0.25+U.danh*0.18+(dt-50)*0.12-(loan-30)*0.1+gpb+(hq-50)*0.1+({nghia:6,quyen:0,vo:-2}[PN]||0)+((tmOf(a)||{}).tm==='devuong'?5:0)-(U.lo>=60?3:0),15,85);
  const TH=['Thái Tổ','Thái Tông','Nhân Tông','Anh Tông','Hiến Tông','Thế Tông','Thánh Tông','Hiếu Tông','Dụ Tông','Mục Tông','Cảnh Tông','Huệ Tông','Trang Tông','Hy Tông','Thần Tông','Ai Đế'];
  const NOTE={minh:['mở khoa thi lấy người tài','giảm thuế, dân được nghỉ sức','dẹp yên loạn biên ải','chỉnh đốn lại quan lại, xử nghiêm quan tham','xây đê điều, kênh mương khắp nơi'],
    thu:['giữ nếp cũ, thiên hạ yên ổn','ít việc lớn, triều chính trôi theo lệ','vài năm mất mùa nhưng qua được','sửa sang luật lệ đôi chút'],
    hon:['ham vui, bỏ bê triều chính','tin dùng gian thần','xây cung điện hao tốn quốc khố','nhiều năm thiên tai, dân oán'],
    bao:['giết công thần không ghê tay','sưu cao thuế nặng, dân bỏ làng đi','tuyển tú, bắt phu liên miên','trong triều ai cũng sợ, dân thì oán']};
  const CAUSE=['giặc cỏ nổi khắp nơi, triều đình không dẹp nổi','ngoại bang xâm lấn, kinh thành thất thủ','quyền thần cướp ngôi, họ khác lên thay','cung biến liên miên, các hoàng tử giết nhau','mất mùa liền năm, dân đói nổi loạn'];
  const L0=clamp(Math.round(R(8,22)+(tai-50)/8),5,30);const reigns=[];let yr=0,i=0,q=Math.round((tai+duc)/2),dead=false,cause='';
  const typ=q=>q>=72?'minh':q<28?'bao':q<42?'hon':'thu';const used=new Set();
  while(yr<320&&i<TH.length){
    if(i>0){q=clamp(Math.round(q*0.5+(i===1?hq*0.15:0)+R(22,78)*(i===1?0.35:0.5)),8,95)}
    const ty=typ(q);s=clamp(s+(q-52)*0.3+R(-7,7)-(i>=3?4:0)-(ty==='hon'?3:ty==='bao'?6:0),0,100);
    let L=i===0?L0:clamp(Math.round(R(6,26)+(s-45)/7-(ty==='bao'?4:0)),3,42);L=Math.max(1,Math.min(L,320-yr));
    const pool=NOTE[ty].filter(x=>!used.has(x));const nt=pick(pool.length?pool:NOTE[ty]);used.add(nt);
    reigns.push({n:TH[i],y0:yr+1,y1:yr+L,ty,note:nt});yr+=L;i++;
    if(s<=10){dead=true;cause=pick(CAUSE);break}}
  const Y=yr,N=reigns.length;const people=S.people.length,gens=S.people.reduce((m,p)=>Math.max(m,p.gen||1),1);
  const KT={minh:'minh quân',thu:'vua giữ nếp',hon:'hôn quân',bao:'bạo quân'};
  const verdict=Y<40?'Triều đại đoản mệnh, như ngọn đèn lóe sáng rồi tắt.':Y<100?'Triều đại tồn tại chưa tròn một thế kỷ, đủ để người đời nhớ tên nhưng chưa đủ để thành nếp.':Y<200?'Triều đại kéo dài mấy thế hệ, qua được nhiều cơn sóng gió.':'Triều đại trường tồn nhiều thế kỷ, thành một phần của lịch sử.';
  const fnd=tai>=70&&duc>=65?'bậc hùng chủ, có tài có đức':tai>=70?'người tài giỏi nhưng ít nhân hậu':duc>=65?'người nhân hậu nhưng tài chưa tới':'người khai quốc nhiều dã tâm hơn đức độ';
  const later=Y>=150&&duc>=55?'Đời sau tôn người khai quốc là bậc đại đế, miếu thờ khói hương không dứt.':U.lo>=60||duc<40?'Đời sau chê người khai quốc là kẻ cướp ngôi, dù triều đại do người dựng nên vẫn còn tồn tại thêm một thời gian.':'Đời sau nhắc người khai quốc với lòng kính nể lẫn dè dặt, như một nhân vật khó đánh giá.';
  const PATH_TXT={quyen:'ép vua thiền nhượng hoặc chính biến cung đình',vo:'khởi binh đánh thẳng về kinh',nghia:'dấy nghĩa quân, từ huyện này tới phủ khác rồi vào kinh'}[PN];
  S.ending={qh,nh,path:PN,years:Y,reigns:N,who:a.id};S.over=true;running=false;metaEnd({quyen:'T1',vo:'T2',nghia:'T3'}[PN]||'T1');
  log(`${nameOf(a)} lên ngôi, quốc hiệu ${qh}, niên hiệu ${nh}.`,'gd');qtLog('Lên ngôi',`${nameOf(a)} lên ngôi, lập quốc hiệu ${qh}, niên hiệu ${nh}.`);save();
  const rows=reigns.map(r=>`<li><b>Năm ${r.y0}–${r.y1}${r.n==='Thái Tổ'?` · ${esc(nameOf(a))} (Thái Tổ)`:` · ${r.n}`}</b> <small class="muted">(${KT[r.ty]})</small><br><small>${r.n==='Thái Tổ'?`Lên ngôi, niên hiệu ${esc(nh)}. ${PATH_TXT.charAt(0).toUpperCase()+PATH_TXT.slice(1)}. Về sau ${r.note}.`:esc(r.note.charAt(0).toUpperCase()+r.note.slice(1))+'.'}</small></li>`).join('');
  openModal(`<span class="eyebrow">Hậu sử</span><h2>Triều ${esc(qh)}</h2>
   <p>${esc(nameOf(a))} lên ngôi, ${PATH_TXT}. Sử gia chép: ${fnd}.${U.br?' '+({quan:'Người ta nói thành nghiệp nhờ binh quyền nắm chắc trong tay.',si:'Người ta nói thành nghiệp nhờ sĩ phu ủng hộ và danh nghĩa đường hoàng.',tien:'Người ta nói thành nghiệp nhờ của cải và lòng dân.'})[U.br]:''}</p>
   <h3 style="margin:10px 0 4px;font-size:14px">Biên niên</h3><ul class="plain" style="max-height:34vh;overflow:auto">${rows}</ul>
   <p>${dead?`Năm thứ ${Y}, ${cause}. Triều ${esc(qh)} chấm dứt sau ${N} đời vua.`:`Sử sách ghi tới năm thứ ${Y}, triều ${esc(qh)} vẫn còn đứng vững sau ${N} đời vua.`} ${verdict}</p>
   <p>${later}</p>
   <dl class="kv"><dt>Con đường lên ngôi</dt><dd>${US_N[PN]}</dd><dt>Họ ${esc(S.surname)} chơi</dt><dd class="num">${Math.floor(S.t/12)} năm</dd><dt>Số đời</dt><dd class="num">${gens}</dd><dt>Người trong gia phả</dt><dd class="num">${people}</dd><dt>Danh vọng gia tộc</dt><dd class="num">${fmt(S.fame)}</dd></dl>
   <div class="acts" style="margin-top:12px"><button class="btn" data-menu>Về màn hình chính</button></div>`,false,'menu');
  M.querySelector('[data-menu]').onclick=()=>{S=null;O.hidden=true;M.innerHTML='';mainMenu()}}
/* ================= v6.6.0: kết thúc đa dạng và đối thủ ================= */
const yrs=()=>Math.floor(S.t/12);
/* đối thủ: nhà càng lớn càng bị nhòm ngó; từ chối họ lớn làm họ thù thêm */
const RV_IDS=['rv_thon_tinh','rv_to_cao','rv_cai_nguoi','rv_lien_hon','rv_che_gieu','wl_thue_nang','wl_phu_ho','wl_dan_xin'];
function rivalTick(){if(!head()||S.over)return;const ti=tierIdx();S.rv=S.rv||{h:0,cd:{}};S.rv.h=Math.max(0,S.rv.h-0.15);if(ti<3||S.money<2e6)return;
  if(!chance(Math.min(0.7,0.2+ti*0.06+S.rv.h*0.08)))return;
  const pool=RV_IDS.filter(id=>EVMAP[id]&&(S.rv.cd[id]||0)<=S.t&&(id!=='rv_cai_nguoi'||S.biz.length));if(!pool.length)return;const id=pick(pool);S.rv.cd[id]=S.t+72;enqueue('ev',S.head,{ev:id,data:{}})}
/* các lỗi lặt vặt sửa ở v6.4.1.5 */
function fixMonth(){
  usMonth();
  /* v6.4.1.7: hoàng đế, danh hiệu cấp Thần, thiên mệnh, chiến tranh tại nơi ở */
  kingMonth();chMonth();arcMonth();if(month()===3){thanYear();tmYear();hhSweep()}if(month()===6)purgeYear();if(month()===9)rivalTick();
  alive().forEach(p=>{if(!p.tmChk&&inClan(p)&&S.t-p.born<=1&&!p.inLaw)tmBirth(p)});
  /* v6.4.1.6: chi xa hết nhiệm kỳ thì hỏi về hay ở; mỗi năm gửi quỹ về; lính về phép */
  for(const id in S.hh){const H=S.hh[id];if(!H.far||!H.off||H.asked)continue;const o=P(H.off);if(!o||o.dead!=null||!inClan(o)||!o.pst){H.asked=1;const L=branchLeader(id);enqueue('brEnd',(L&&inClan(L)?L:head()).id,{hh:id})}}
  if(month()===12)brYear();if(month()===1)lqYear();
  /* quan về quê mà còn giữ ghế, người nhà còn "đi theo" ở nơi xa */
  alive().forEach(p=>{if((p.seat||p.pst)&&!['quan','quan_ngu','nguy'].includes(p.job))leaveSeat(p)});
  alive().forEach(p=>{const a=p.away;if(a&&a.type==='follow'){const o=P(a.of);if(!o||o.dead!=null||!inClan(o)||!(o.pst||o.seat||(o.away&&o.away.type==='army'))){p.away=null;if(inClan(p))log(`${nameOf(p)} trở về nhà.`)}}});
  /* chi họ dư dả thì tự mua thêm ruộng cho tá điền của chi */
  if(month()===1)for(const id in S.hh){if(id===mainHH())continue;const H=S.hh[id];const fs=alive().filter(p=>p.hh===id&&p.job==='nong'&&inClan(p)).length;if(!fs)continue;
    const need=fs*5-(H.land||0);const lc=landCost();if(need>0&&H.money>=lc*3){H.money-=lc;H.land=(H.land||0)+1;log(`${H.name} mua thêm một mẫu ruộng.`)}}}

/* ================= v6.4.1.4: quan trường · phe phái · tội trạng · thang hậu quả · sử ký ================= */
/* Mỗi quan trong họ có hồ sơ c.qt: f (phe), loy (trung thành với phe), cor (sai phạm tích lũy), crime (cấp tội 0..5),
   risk (nguy cơ bị tra), fav (thánh ân), st (0 bình thường, 1 bị giám sát, 2 bị đàn hặc, 3 đang xét án).
   Thang hậu quả: giám sát → đàn hặc → xét án → khiển trách / bãi quan / tịch biên, lưu đày / xử tử, liên lụy / tru di.
   Tru di không bao giờ đến ngay: luôn có một hộp cảnh báo với các đường thoát, vài tháng sau mới có chiếu. */
const QT={giamsat:35,danhac:50,warnM:[3,6],noOffice:60,tich:[0,0,0,0.4,0.6,1]};
const FAC={thanh:{n:'Thanh lưu',d:'Trọng danh tiết, cải cách, chống tham nhũng; được sĩ lâm ủng hộ nhưng dễ bị cô lập'},
  quyen:{n:'Quyền thần',d:'Nắm thế lực và quan hệ, kiểm soát triều đình; thăng tiến nhanh nhưng dễ bị thanh trừng'},
  hoang:{n:'Hoàng đảng',d:'Trung thành với hoàng thất, được hoàng thất che chở; dễ bị cuốn vào chuyện tranh ngôi'},
  thuc:{n:'Thực dụng phái',d:'Không trung thành tuyệt đối với ai; linh hoạt, dễ sống sót nhưng không ai tin'}};
const FACK=Object.keys(FAC);
const CRIME_N=['Trong sạch','Vi phạm nhỏ','Nhận hối lộ, bao che','Tham ô, cấu kết thương nhân','Kết bè, can thiệp triều chính','Mưu phản, thông đồng ngoại bang'];
const QST_N=['','Bị ngự sử giám sát','Bị dâng sớ đàn hặc','Đang bị xét án'];
const facN=k=>FAC[k]?FAC[k].n:'';
function court(){if(!S.court){S.court={f:{}};FACK.forEach(k=>S.court.f[k]={pow:R(30,60),fav:R(35,70),loy:R(45,80),lead:fullOutsider('nam'),fall:-999})}return S.court}
function qtOf(c){if(!c.qt)c.qt={f:null,loy:0,cor:0,crime:0,risk:0,fav:50,st:0,mon:0};return c.qt}
function qtLog(title,txt){if(DRY)return;(S.qtLog=S.qtLog||[]).push({t:S.t,title,txt});if(S.qtLog.length>150)S.qtLog.shift()}
const qtH=()=>S.qtHist=S.qtHist||{fac:{}};
function qtAdd(c,d){const q=qtOf(c);for(const k in d){if(k==='crime')q.crime=Math.max(q.crime,d.crime);else q[k]=clamp((q[k]||0)+d[k],0,100)}
  if(d.cor>0)q.crime=Math.max(q.crime,q.cor>=60?3:q.cor>=30?2:1)}
function qtJoin(c,k){const q=qtOf(c);const old=q.f;q.f=k||null;q.loy=k?50:0;q.jt=S.t;
  if(k&&old!==k){qtH().fac[k]=(qtH().fac[k]||0)+1;qtLog(`Theo phe ${facN(k)}`,`${nameOf(c)} đứng về phe ${facN(k)}, dưới trướng ${court().f[k].lead}.`)}
  else if(!k&&old)qtLog(`Rời phe ${facN(old)}`,`${nameOf(c)} cắt đứt quan hệ với phe ${facN(old)}.`)}
/* cấp tội thực tế khi bị xét: tội của chính mình, hoặc bị kéo theo khi phe mình vừa thất thế (có thể là vu oan) */
function qtLevel(c){const q=qtOf(c);const F=q.f?court().f[q.f]:null;let L=q.crime;if(F&&S.t-F.fall<36)L=Math.max(L,Math.min(4,2+Math.floor(q.loy/45)));return L}
const qtFramed=c=>qtLevel(c)>qtOf(c).crime;
function qtDismiss(c,why){if(c.seat||c.pst)leaveSeat(c);setJob(c,'none');c.flags.noExam=S.t+QT.noOffice;c.flags.noOffice=S.t+QT.noOffice;const q=qtOf(c);q.st=0;q.f=null;q.risk=0;q.cor=Math.round(q.cor/2);
  log(`${nameOf(c)} bị bãi quan${why?' vì '+why:''}.`,'hi')}
function qtConfiscate(pct){const v=Math.round(Math.max(0,S.money)*pct);S.money-=v;const l=Math.round(S.farm.own*pct*0.75);S.farm.own-=l;return `Triều đình tịch biên ${money(v)}${l?` và ${l} mẫu ruộng`:''}.`}
/* xử theo cấp tội L, trả về đoạn kết quả */
function qtSentence(c,L,why){L=clamp(Math.round(L),0,5);const q=qtOf(c);const nm=esc(c.given);let t='';
  if(L>=5){q.st=3;if(!S.tdq){S.tdq={who:c.id,t:S.t+R(QT.warnM[0],QT.warnM[1]),L:5};enqueue('ev',S.head,{ev:'qt_tru_di_canh_bao',data:{who:c.id}})}
    qtLog('Đại án',`${nameOf(c)} bị khép tội ${CRIME_N[5].toLowerCase()}. Triều đình nghị án tru di.`);return `Án được tâu lên: tội của ${nm} thuộc hàng thập ác. Trong triều đã có lời bàn chuyện tru di.`}
  if(L<=1){q.st=0;q.risk=Math.max(0,q.risk-30);q.fav=Math.max(0,q.fav-10);if(c.job==='quan'&&c.lv>0)t=fx(c,{lv:-1,fame:-10});return `${nm} bị khiển trách, giáng một bậc.`+t}
  qtDismiss(c,why);cf(-8*L,'Người nhà bị trị tội');
  if(L===2){qtLog('Bãi quan',`${nameOf(c)} bị bãi quan${why?' vì '+why:''}.`);return `${nm} bị bãi quan, ${QT.noOffice/12} năm không được bổ dụng.`+fx(c,{fame:-20,tam:-20})}
  if(L===3){const tb=qtConfiscate(QT.tich[3]);c.away={type:'luuday',until:S.t+R(60,150)};qtLog('Tịch biên, lưu đày',`${nameOf(c)} bị tịch biên gia sản, đày ra biên viễn.`);
    return `${nm} bị bãi quan, đày ra biên viễn. ${tb}`+fx(c,{fame:-40,tam:-30})}
  /* L4: xử tử người đứng đầu, tịch biên, liên lụy người làm quan trong họ, cả họ cấm thi một khoa */
  const tb=qtConfiscate(QT.tich[4]);const kin=alive().filter(p=>inClan(p)&&p.id!==c.id&&p.job==='quan'&&(!q.f||(p.qt&&p.qt.f===q.f)||chance(0.5)));
  kin.forEach(p=>qtDismiss(p,'liên lụy trong vụ án của '+c.given));S.noExamClan=S.t+36;
  qtLog('Xử tử, liên lụy thân tộc',`${nameOf(c)} bị xử trảm${why?' vì '+why:''}. ${kin.length?kin.map(p=>nameOf(p)).join(', ')+' bị bãi quan theo. ':''}Cả họ ba năm không được ứng thí.`);
  die(c,'bị xử trảm theo án triều đình');
  return `${nm} bị xử trảm. ${tb}${kin.length?` ${kin.map(p=>esc(p.given)).join(', ')} bị bãi quan vì liên lụy.`:''} Ba năm tới con cháu trong họ không được ứng thí.`}
/* tru di: tam tộc diệt nhà chính và thân thích gần của kẻ phạm; chi họ ở hộ khác sống sót thì chơi tiếp từ chi ấy. Cửu tộc là hết game. */
function truDi(c,cuu){const kin=new Set([c.id,...c.parents]);kidsOf(c).forEach(k=>kin.add(k.id));const sp=spouseOf(c);if(sp)kin.add(sp.id);
  alive().forEach(p=>{if(p.parents.some(x=>c.parents.includes(x)))kin.add(p.id)});
  const mh=mainHH();const vic=alive().filter(p=>inClan(p)&&(cuu||p.hh===mh||kin.has(p.id)));const surv=alive().filter(p=>inClan(p)&&!vic.includes(p));
  qtH().trudi=S.t;qtLog(cuu||!surv.length?'Tru di cửu tộc':'Tru di tam tộc',`${nameOf(c)} mang tội lớn. ${vic.length} người trong họ ${esc(S.surname)} bị xử.`);
  if(cuu||!surv.length){wipeClan(`${nameOf(c)} phạm tội tày đình. Chiếu chỉ ban xuống: tru di cửu tộc. Họ ${S.surname} không còn ai.`);return ''}
  vic.forEach(p=>{if(p.seat||p.pst)leaveSeat(p);if(p.biz){const b=bizOf(p);if(b)b.owner=null;p.biz=null}p.dead=S.t;p.tuoc=0});
  S.biz=S.biz.filter(b=>b.own&&b.own!=='clan'&&S.hh[b.own]&&b.own!==mh);S.money=0;S.farm.own=0;S.farm.rent=0;fiefSync();S.fame=Math.round(Math.min(S.fame*0.1,S.fame))-30;S.on=20;S.hung=5;
  const h=surv.filter(p=>age(p)>=16).sort((a,b)=>(b.g==='nam')-(a.g==='nam')||a.born-b.born)[0]||surv[0];becomeHead(h);
  log(`Tru di tam tộc: ${vic.length} người họ ${S.surname} bị xử. ${nameOf(h)} cùng chi họ sống sót, gánh lấy tông đường.`,'hi');
  return `${vic.length} người trong họ bị xử. Nhà chính tan hoang, của cải sung công. ${esc(nameOf(h))} cùng những người còn lại ở chi họ sống sót, từ nay gánh lấy tông đường.`}
/* mỗi năm: triều đình xoay vần */
function courtTick(){const C=court();
  FACK.forEach(k=>{const F=C.f[k];F.pow=clamp(F.pow+R(-6,6)+(F.fav-50)/15+(k==='quyen'?2:0),5,95);F.fav=clamp(F.fav+R(-5,5)-(k==='quyen'&&F.pow>65?4:0)+(k==='hoang'?1:0),5,95);F.loy=clamp(F.loy+R(-6,5),10,95);
    if(F.loy<25&&chance(0.3)){F.pow=Math.round(F.pow*0.6);F.loy=55;const o=F.lead;F.lead=fullOutsider('nam');qtLog(`Phe ${facN(k)} chia rẽ`,`Phe ${facN(k)} lục đục, ${o} mất ngôi đứng đầu, ${F.lead} lên thay.`)}
    if(S.t-F.fall>120&&((F.pow>=70&&F.fav<35&&chance(0.35))||(F.pow<12&&chance(0.3))))facFall(k,F.pow>=70?'bị vua nghi kỵ, bắt ngay giữa triều':'thế cô, bị đàn hặc mất chức')})}
function facFall(k,why){const C=court(),F=C.f[k];const o=F.lead;F.fall=S.t;F.pow=15;F.fav=30;F.loy=40;F.lead=fullOutsider('nam');FACK.forEach(x=>{if(x!==k)C.f[x].pow=clamp(C.f[x].pow+5,5,95)});
  qtLog(`Phe ${facN(k)} thất thế`,`${o}, người đứng đầu phe ${facN(k)}, ${why}. Môn sinh khắp nơi bị tra xét.`);log(`Triều đình: phe ${facN(k)} thất thế, ${o} ${why}.`,'hi');
  alive().filter(p=>inClan(p)&&p.qt&&p.qt.f===k&&p.job==='quan').forEach(p=>{qtAdd(p,{risk:35});enqueue('ev',p.id,{ev:'qt_that_the',data:{f:k,lead:o}})});
  /* thông gia với phe vừa đổ thì cả họ bị soi */
  if(qtH().hon===k){alive().filter(p=>inClan(p)&&p.job==='quan').forEach(p=>qtAdd(p,{risk:15}));qtLog('Thông gia liên lụy',`Nhà thông gia trong phe ${facN(k)} sa cơ, người làm quan họ ${esc(S.surname)} bị soi xét.`)}}
/* mỗi năm: nguy cơ bị tra của từng quan trong họ */
function qtTick(){const C=court();const nq=clanQuan();const H=qtH();
  alive().filter(p=>inClan(p)&&p.job==='quan').forEach(p=>{const q=qtOf(p);const F=q.f?C.f[q.f]:null;
    const base=q.cor*0.35+q.crime*6+(F&&S.t-F.fall<36?25:0)+(F&&F.pow<20?6:0)+Math.max(0,nq-3)*4+(H.trudi&&S.t-H.trudi<1200?8:0)-(q.fav-50)*0.25-(rule('camdang')&&!q.f?5:0);
    q.risk=clamp(q.risk*0.55+Math.max(0,base),0,100);q.cor=Math.max(0,q.cor-1);
    if(q.st===0&&q.risk>=QT.giamsat&&chance(q.risk/160)){q.st=1;enqueue('ev',p.id,{ev:'qt_giam_sat'})}
    else if(q.st===1&&q.risk>=QT.danhac&&chance(q.risk/140)){q.st=2;enqueue('ev',p.id,{ev:'qt_dan_hac'})}
    else if(q.st===1&&q.risk<25)q.st=0});
  /* bè đảng: nhà nhiều quan thì có lời đồn, lờ đi thì bị hặc tội kết bè */
  if(nq>=4&&!((S.bdT||0)>S.t)&&chance(0.15+0.05*(nq-4))){S.bdT=S.t+30;const L=alive().filter(p=>inClan(p)&&p.job==='quan');const p=pick(L);
    if(p)enqueue('ev',p.id,{ev:(nq>=6||(S.bdWarn||0)>=1)?'qt_hac_ket_be':'qt_be_dang_don'})}}
function qtMonth(mo){if(!head())return;
  alive().forEach(p=>{if(p.away&&p.away.type==='luuday'&&S.t>=p.away.until){p.away=null;log(`${nameOf(p)} mãn hạn lưu đày, trở về quê.`,'gd');addStat(p,'tam',10)}});
  if(S.tdq&&S.t>=S.tdq.t&&!S.tdq.q){const w=P(S.tdq.who);if(!w||w.dead!=null||!inClan(w)){S.tdq=null}else{S.tdq.q=1;enqueue('ev',S.head,{ev:'qt_chieu_tru_di',data:{who:w.id}})}}
  if(mo===3)qtTick();if(mo===6&&(S.court||alive().some(p=>inClan(p)&&p.job==='quan')))courtTick()}
/* v6.4.1.7: các phe chỉ hiện khi nhà mình có người làm quan; thế lực và thái độ của vua chỉ biết khi có người từ Ngũ phẩm trở lên */
function courtCard(){const offs=alive().filter(p=>inClan(p)&&p.job==='quan');const L=(S.qtLog||[]).slice(-15).reverse();
  const lockP=['quyen','vo','nghia'].filter(pp=>((S.usNoP||{})[pp]||0)>S.t&&usActors(pp).length);const lockN=lockP.length?`<section class="card"><span class="eyebrow">Thế cờ</span><p class="kvline">Trong họ có người đủ địa vị làm việc lớn, nhưng sau biến cố trước chưa ai dám liều. Còn khoảng ${Math.ceil(Math.max(...lockP.map(pp=>S.usNoP[pp]))/12-S.t/12)} năm nữa.</p></section>`:'';
  const hist=lockN+(L.length?`<section class="card"><span class="eyebrow">Sử ký quan trường</span><h2>Họ ${esc(S.surname)}</h2><ul class="plain">${L.map(x=>`<li><b>${dateStr(x.t)} · ${esc(x.title)}</b><br><small>${x.txt}</small></li>`).join('')}</ul></section>`:'');
  if(!offs.length)return hist;const C=court();const see=offs.some(p=>p.lv>=4)||!!window.BN_ADMIN;
  const w=v=>v>=75?'thế lực rất mạnh':v>=55?'thế lực mạnh':v>=35?'thế lực vừa':v>=20?'thế lực yếu':'suy tàn';const fw=v=>v>=70?'được vua tin':v>=45?'vua đối đãi bình thường':v>=25?'bị vua dè chừng':'bị vua ghét';
  const mem=k=>offs.filter(p=>p.qt&&p.qt.f===k).map(p=>esc(p.given)+(p.qt.st?` (${QST_N[p.qt.st].toLowerCase()})`:''));
  return `<section class="card"><span class="eyebrow">Triều đình</span><h2>Các phe trong triều</h2>${see?'':'<p class="kvline muted">Quan nhỏ chưa đủ tầm để biết phe nào mạnh, phe nào yếu.</p>'}<ul class="plain">${FACK.map(k=>{const F=C.f[k];const m=mem(k);return `<li><b>${FAC[k].n}</b>${see?` · ${w(F.pow)} · ${fw(F.fav)}`:''}<br><small class="muted">${FAC[k].d}. Đứng đầu: ${esc(F.lead)}.${m.length?' Người nhà: '+m.join(', ')+'.':''}</small></li>`}).join('')}</ul></section>${hist}`}

/* ================= v6.4.1.3: quyền điều khiển · tự quyết theo tính cách · thư nhà ================= */
/* Người chơi điều khiển gia chủ, người nhà chính đang ở nhà, và các chi chủ. Những người khác (thành viên chi họ,
   người nhà chính đi làm quan, đi lính, đi xa) gặp chuyện thì tự quyết theo tính cách; việc nhỏ ghi nhật ký và thư nhà cuối năm,
   việc lớn (kỳ ngộ, cốt truyện, chết, mất nhiều tiền hay danh vọng) mới hiện hộp báo tin. */
/* v6.4.1.7: người nhà chính đi lính vẫn do người chơi quyết định; chỉ người đi lính ở chi họ (không phải chi chủ) mới tự quyết */
/* v6.6.0: mức tự quyết do người chơi chọn ở trang Gia tộc: 0 như cũ; 1 chỉ gia chủ, cha mẹ, vợ con (và trưởng chi) tự mình quyết; 2 chỉ gia chủ cùng cha mẹ, vợ con */
const CTRL_N=['Như cũ: người nhà chính và trưởng chi','Gia chủ, cha mẹ, vợ con và trưởng chi','Chỉ gia chủ, cha mẹ, vợ con'];
const ctrlLv=()=>(S&&S.opt&&S.opt.ctrl)||0;
function closeKin(c){const h=head();if(!h)return false;return c.parents.includes(h.id)||h.parents.includes(c.id)||c.spouse===h.id}
function isCtrl(c){if(!c||isHead(c))return true;const lv=ctrlLv();
  if(c.hh===mainHH()){if(lv>=1&&!closeKin(c))return false;return !c.away||c.away.type==='army'}
  if(lv>=2)return false;const L=branchLeader(c.hh);return !!L&&L.id===c.id}
/* v6.6.0: chia chi tự động cho nhà quá đông: cặp vợ chồng lớn nhất ra ở riêng cùng con cháu của họ */
function autoSplit(){const h=head();if(!h)return 'Không có ai để chia.';const main=mainHH();
  const cand=alive().filter(p=>inClan(p)&&p.hh===main&&!isHead(p)&&age(p)>=22&&married(p)&&!p.away&&p.id!==h.spouse&&!h.parents.includes(p.id));
  if(!cand.length)return 'Chưa có cặp vợ chồng nào đủ lớn để ra ở riêng.';
  const grp=p=>{const s=spouseOf(p);const ids=new Set([p.id]);if(s&&inClan(s))ids.add(s.id);const add=x=>kidsOf(x).forEach(k=>{if(k.dead==null&&inClan(k)&&k.hh===main&&!ids.has(k.id)){ids.add(k.id);add(k)}});add(p);if(s)add(s);return ids};
  let best=null,bs=-1;cand.forEach(p=>{const g=grp(p);if(g.size>bs){bs=g.size;best=[p,g]}});
  const [p,g]=best;const seed=Math.max(mm(60),Math.round(Math.max(0,S.money)*0.01));if(S.money<seed)return 'Quỹ không đủ vốn để lập chi mới.';
  S.money-=seed;const id=newBranch(p,1,seed);g.forEach(i=>{const x=P(i);if(x)x.hh=id});
  log(`${nameOf(p)} cùng ${g.size-1} người ra ở riêng, lập chi mới.`,'gd');
  return `${esc(p.given)} cùng ${g.size-1} người trong nhà ra ở riêng, lập chi mới "${esc(S.hh[id].name)}". Quỹ cấp vốn ${money(seed)}.`}
const AUTO_K={bold:2.4,vio:{phat:1.5,truc:3,tu:6}};
function autoPick(c,ok,probs){ensurePersona(c);const uy=S.uy??50;const ran=S.t-(c.flags.ran||-999)<36?1.6:1;
  const sc=ok.map((o,i)=>{let s=0;const ax=o.ax||autoAx(o.l)||{};
    for(const k in ax)if(c.sub&&c.sub[k]!=null)s+=ax[k]*(axv(c,k)-50)/25;   /* hợp tính thì chọn */
    if(probs[i]!=null){const bold=axv(c,'gan')/100;s+=(probs[i]-0.5)*(AUTO_K.bold-2*bold)+(o.yy?0.25*bold:0)}  /* nhát thì chọn chắc ăn, gan thì dám liều */
    const v=vioOf(o);if(v)s-=AUTO_K.vio[ruleG(v)]*(0.4+uy/100)*(0.3+obey(c)/100)*ran*(obey(c)>=70?3:1); /* v6.5.4: người nghe lời gần như không phạm gia quy */   /* sợ gia pháp thì né */
    return s+Math.random()*0.8});
  let bi=0;sc.forEach((s,i)=>{if(s>sc[bi])bi=i});return bi}
function runOpt(c,o,p,d){let r;const m0=S.money;
  try{if(o.r){const x=Math.random();if(x<p)r=(o.yy&&x<p*0.18)?'<b>Đại thành công!</b> '+o.yy(c,d):o.y(c,d);else r=(o.nn&&x>1-(1-p)*0.2)?'<b>Thảm bại!</b> '+o.nn(c,d):o.n(c,d)}else r=o.f(c,d)}
  catch(e){console.error(e);r='Mọi chuyện trôi qua.'}
  if(S.over)return r||'';r=withLead(c,o,r);const axd=o.ax||autoAx(o.l);if(axd&&c.dead==null)r+=shiftAx(c,axd);
  if(c.suc<=0&&c.dead==null)die(c,'không qua khỏi');stt('evm',S.money-m0);return r}
function autoEv(c,ev,d,ttl,txt,opts){
  const ok=(opts||[]).filter(o=>{try{return !o.go&&(!o.c||o.c(c,d))&&optOk(c,o)}catch(e){return false}});
  if(!ok.length)return false;
  const probs=ok.map(o=>o.r?prob(c,o.r[0],o.r[1]):null);const i=autoPick(c,ok,probs);const o=ok[i];optTook(c,o);
  const m0=S.money,f0=S.fame;
  let r=runOpt(c,o,probs[i],d);if(S.over)return true;
  ruleHit(c,o,false);
  log(`${nameOf(c)} · ${ttl} (tự quyết): ${r}`,/class="down"/.test(r)&&!/class="up"/.test(r)?'hi':'');
  const big=ev.ky||ev.arc||c.dead!=null||!inClan(c)||Math.abs(S.money-m0)>=Math.max(mm(20),Math.abs(m0)*0.1)||Math.abs(S.fame-f0)>=Math.max(15,S.fame*0.01);
  if(!big)letterAdd(c,`<b>${esc(ttl)}</b>: ${esc(c.given)} chọn "${esc(o.l)}". ${r}`); /* v6.6.0: việc lớn chỉ báo bằng hộp Tin nhà, việc thường chỉ vào thư; không báo hai lần */
  stt('auto');
  if(big){stt('big');infoPopup(c,'Tin nhà · '+(c.hh===mainHH()?'người nhà ở xa':esc(HH(c.hh)?HH(c.hh).name:'chi họ')),ttl,`${txt}<p class="muted"><i>${esc(c.given)} không ở dưới mắt gia chủ, tự quyết theo tính mình: chọn "${esc(o.l)}".</i></p><div class="result">${r}</div>`)}
  else setTimeout(nextPopup,0);
  return true}
function letterAdd(c,line){S.letters=S.letters||{};const k=c.hh===mainHH()?'_xa':c.hh;const L=S.letters[k]=S.letters[k]||[];L.push(line);if(L.length>8)L.shift()}
function letterPopup(h){const Ls=S.letters||{};S.letters={};
  const sec=Object.entries(Ls).filter(([,L])=>L.length).map(([k,L])=>`<h3 style="margin:10px 0 4px;font-size:14px">${k==='_xa'?'Người nhà ở xa':esc(HH(k)?HH(k).name:'Chi họ')}</h3><ul class="plain">${L.map(x=>`<li><small>${x}</small></li>`).join('')}</ul>`).join('');
  /* tin đồn: vi phạm gia quy chưa bị phát giác, mỗi tin có một nửa khả năng lọt tới tai gia chủ */
  const rum=(S.rumor||[]).filter(x=>{const p=P(x.id);return p&&inClan(p)&&RULES[x.k]&&chance(0.5)});
  const sus=[...new Map(rum.map(x=>[x.id,x])).values()].slice(0,3);
  const bad=alive().filter(p=>inClan(p)&&!isCtrl(p)&&p.job==='quan'&&p.liem<35).slice(0,2);
  if(!sec&&!sus.length&&!bad.length){setTimeout(nextPopup,0);return}
  const opts=[{l:'Đọc xong, cất thư',f:()=>'Gia chủ gấp thư lại.'}];
  sus.forEach(x=>{const p=P(x.id);
    opts.push({l:`Cho người dò xét ${p.given}`,s:`Tốn ${money(mm(2))}. Có thật thì đem ra gia pháp`,c:()=>S.money>=mm(2),f:()=>{S.money-=mm(2);S.rumor=(S.rumor||[]).filter(y=>y!==x);if(chance(0.75)){enqueue('vio',S.head,{who:p.id,k:x.k});return 'Tra ra đúng là có chuyện.'}return 'Dò xét không ra gì, có lẽ chỉ là lời đồn.'}},
      {l:`Gửi thư răn dạy ${p.given}`,s:'Ba năm tới người ấy dè dặt hơn',f:()=>{p.flags.ran=S.t;addRel(p,h,-3);return `Lá thư lời lẽ nghiêm khắc gửi đi. ${esc(p.given)} hẳn đã hiểu.`}})});
  bad.forEach(p=>opts.push({l:`Bắt ${p.given} từ quan về quê`,s:'Tránh tai họa về sau, người ấy oán',f:()=>{if(p.seat||p.pst)leaveSeat(p);setJob(p,'none');p.away=null;addStat(p,'tam',-15);addRel(p,h,-15);log(`${nameOf(p)} vâng lệnh gia chủ từ quan về quê.`,'hi');return `${esc(p.given)} dâng đơn từ quan, khăn gói về quê.`}}));
  choicePopup(h,'Thư nhà',`Thư nhà cuối năm ${dOf(S.t).y}`,`${sec||'<p class="muted">Năm nay các nơi không có chuyện gì đáng kể.</p>'}${sus.length?`<p><b>Nghe đồn:</b> ${sus.map(x=>`${esc(P(x.id).given)} lén phạm điều "${esc(RULES[x.k].n)}"`).join('; ')}.</p>`:''}${bad.length?`<p><b>Có tiếng không hay:</b> ${bad.map(p=>esc(p.given)).join(', ')} làm quan mà người ta bảo là không sạch tay.</p>`:''}`,opts)}

/* ================= v6.4.1.3: gia quy chia nhóm phạt · uy gia pháp ================= */
const RG_N={tang:'Tăng trưởng',phat:'Phạt tiền, đòn roi',truc:'Trục xuất',tu:'Xử tử tại gia'};
const RULE_G={cambac:'phat',camxa:'phat',trugian:'truc',camdang:'truc',chiquan:'truc',quan3:'truc',quan5:'truc',camphan:'tu'};
const ruleG=k=>RULE_G[k]||'tang';
Object.assign(RULES,{
  chiquan:{n:'Chi phái không dấn thân quan trường',d:'Ngoài chi chủ, người các chi không được làm quan. Vi phạm thì trục xuất'},
  quan3:{n:'Trong tộc không quá ba người làm quan',d:'Tránh bị nghi bè đảng. Người thứ tư nhận chức là phạm, vi phạm thì trục xuất'},
  quan5:{n:'Trong tộc không quá năm người làm quan',d:'Người thứ sáu nhận chức là phạm, vi phạm thì trục xuất'},
  camphan:{n:'Không mưu phản, không thông đồng giặc',d:'Điều tối quan trọng: ai phạm bị xử tử tại từ đường, để cả họ khỏi bị liên lụy'}});
RULEX_CONFLICT.push(['quan3','quan5']);
RULES.trugian.d='Người làm quan liêm chính tăng dần, danh vọng tăng dần. Ai tham ô, nhận hối lộ thì trục xuất';
RULES.camdang.d='Quan trong nhà ít bị cuốn vào đảng tranh, ít bị hặc tội, nhưng thăng chậm. Ai kết bè phái thì trục xuất';
RULES.cambac.d='Khó nhiễm thói xấu, ổn định +4. Ai cờ bạc, rượu chè thì phạt tiền hoặc đòn roi';
RULES.camxa.d='Không ai được sống xa hoa. Ít nhiễm thói phung phí, chi tiêu -5%. Ai phung phí thì phạt tiền hoặc đòn roi';
/* lựa chọn trong sự kiện bị coi là phạm gia quy khi chữ của nó khớp, trừ khi là chữ chối từ, tố giác */
const VIO_RE=[['cambac',/cờ bạc|đánh bạc|sát phạt|gá bạc|chiếu bạc|rượu|nhậu/i],['camxa',/xa hoa|phung phí|vung tiền|linh đình|ăn chơi/i],
  ['trugian',/hối lộ|nhận vàng|ăn chặn|biển thủ|tham ô|đút lót|bớt xén|nhận bạc|ăn tiền|nhận quà/i],['camdang',/kết bè|theo phe|vào phe|bè cánh|phe cánh|kéo bè/i],
  ['camphan',/mưu phản|khởi sự|tạo phản|làm phản|thông đồng (với )?giặc|thông địch|phản nghịch/i]];
const VIO_NOT=/từ chối|không nhận|chẳng nhận|trả lại|tố giác|vạch mặt|bắt (giữ|hắn|bọn)|cấm|khuyên|can ngăn|bỏ (rượu|bạc)|cai /i;
function vioOf(o){if(o&&o.vio&&S&&rule(o.vio))return o.vio;if(!o||!o.l||!S||!S.rules.length)return null;const l=String(o.l);if(VIO_NOT.test(l))return null;for(const [k,re] of VIO_RE)if(rule(k)&&re.test(l))return k;return null}
function ruleHit(c,o,ctrl){const k=vioOf(o);if(!k||isHead(c)||!inClan(c))return;vioAdd(c,k,ctrl?1:null)}
function vioAdd(c,k,seen){c.vio=c.vio||{};c.vio[k]=(c.vio[k]||0)+1;
  const disc=seen!=null?seen:clamp(0.3+(100-c.tri)/300+(S.uy??50)/400,0.1,0.9);
  if(chance(disc))enqueue('vio',S.head,{who:c.id,k});else{(S.rumor=S.rumor||[]).push({id:c.id,k,t:S.t});if(S.rumor.length>20)S.rumor.shift()}}
const uyAdd=d=>{S.uy=clamp((S.uy??50)+d,0,100)};
const uyWord=()=>{const u=S.uy??50;return u>=80?'Nghiêm như sắt':u>=60?'Được nể sợ':u>=40?'Vừa phải':u>=20?'Lỏng lẻo':'Không ai sợ'};
function vioPopup(h,it){const c=P(it.who);const k=it.k;if(!h||!c||!inClan(c)||!RULES[k]||isHead(c)){setTimeout(nextPopup,0);return}
  S.rumor=(S.rumor||[]).filter(x=>!(x.id===c.id&&x.k===k));
  const n=(c.vio&&c.vio[k])||1;let g=ruleG(k);if(g==='phat'&&n>=3)g='truc';
  const fine=Math.max(mm(1),Math.round((c.purse||0)*0.3));const fam=()=>alive().filter(p=>inClan(p)&&(c.parents.includes(p.id)||p.parents.includes(c.id)));
  const opts=[];
  if(g==='phat')opts.push(
    {l:`Phạt tiền ${money(fine)}`,f:()=>{const v=Math.min(fine,Math.max(0,c.purse||0));c.purse=(c.purse||0)-v;S.money+=fine-v;addStat(c,'tam',-8);addRel(c,h,-5);uyAdd(3);S.on=clamp(S.on+1,0,100);return `${esc(c.given)} nộp phạt, cúi đầu nhận lỗi.`}},
    {l:'Phạt đòn trước từ đường',s:'Đau nhưng nhớ đời',f:()=>{addStat(c,'suc',-R(6,14));addStat(c,'tam',-12);addRel(c,h,-10);uyAdd(4);S.on=clamp(S.on+1,0,100);c.flags.ran=S.t;c.habits.forEach(x=>{if(c.vlv&&c.vlv[x])c.vlv[x]=Math.max(0,c.vlv[x]-15)});return `Roi mây vụt xuống trước bàn thờ tổ. ${esc(c.given)} không dám tái phạm, ít nhất là một thời gian.`}},
    {l:'Tha lần này',s:'Gia pháp lỏng đi',f:()=>{uyAdd(-6);S.on=clamp(S.on-1,0,100);addRel(c,h,4);return 'Gia chủ cho qua. Người trong nhà nhìn nhau, hiểu rằng gia quy cũng chỉ đến thế.'}});
  if(g==='truc')opts.push(
    {l:'Trục xuất khỏi gia phả',s:'Đúng gia quy, người nhà đau lòng',f:()=>{doExpel([c],true);uyAdd(8);log(`${nameOf(c)} bị trục xuất vì phạm gia quy "${RULES[k].n}".`,'hi');return `Tên ${esc(c.given)} bị gạch khỏi gia phả. Từ nay việc của người ấy không còn dính đến gia tộc.`}},
    {l:'Phạt nặng thay cho trục xuất',s:'Giữ người, gia pháp kém nghiêm',f:()=>{const v=Math.min(fine*2,Math.max(0,c.purse||0));c.purse=(c.purse||0)-v;addStat(c,'suc',-R(8,16));addStat(c,'tam',-15);addRel(c,h,-12);uyAdd(-2);c.flags.ran=S.t;return `${esc(c.given)} chịu đòn, chịu phạt, được giữ lại trong họ.`}},
    {l:'Tha, chỉ răn dạy',s:'Uy gia pháp giảm mạnh',f:()=>{uyAdd(-10);S.on=clamp(S.on-3,0,100);c.flags.ran=S.t;return 'Gia chủ nói vài lời rồi thôi. Cả họ xì xào.'}});
  if(g==='tu')opts.push(
    {l:'Xử tử tại từ đường',s:'Giữ cả họ khỏi liên lụy. Quan phủ biết thì gia chủ khó yên',f:()=>{const mid=alive().some(p=>inClan(p)&&p.job==='quan'&&p.lv>=4);let t='';
      fam().forEach(p=>{addStat(p,'tam',-18);p.oan=Math.min(100,(p.oan||0)+20)});die(c,'bị xử theo gia pháp tại từ đường');uyAdd(15);S.on=clamp(S.on-5,0,100);
      if(rule('nghiem')||rule('tohuan'))cf(3,'Giữ nghiêm gia pháp');else cf(-5,'Xử tử người nhà');
      if(chance(mid?0.15:0.3)){const v=mm(40);S.money-=v;cf(-10,'Tư hình bị quan phủ tra hỏi');addStat(h,'suc',-15);t=` Quan phủ nghe tin, đòi gia chủ lên hầu tra vì tội tự tiện xử người. Phải nộp ${money(v)} mới yên.`}
      return `Cửa từ đường đóng lại. Cả họ quỳ lặng trước bàn thờ tổ.${t}`}},
    {l:'Trục xuất thay vì xử tử',s:'Người ấy còn sống ở ngoài',f:()=>{doExpel([c],true);uyAdd(3);return `${esc(c.given)} bị đuổi khỏi họ trong đêm. Từ nay tội của người ấy không còn dính đến gia tộc.`}},
    {l:'Bao che, giấu chuyện',s:'Uy gia pháp sụp, mầm họa còn đó',f:()=>{uyAdd(-25);S.on=clamp(S.on-8,0,100);c.flags.cover=k;return 'Gia chủ ra lệnh không ai được hé răng. Nhưng lửa giấu trong giấy, chẳng biết đến bao giờ.'}});
  const GT={phat:'Điều này thuộc nhóm phạt tiền, đòn roi.',truc:n>=3&&ruleG(k)==='phat'?'Đã tái phạm nhiều lần, theo gia quy phải trục xuất.':'Điều này thuộc nhóm trục xuất.',tu:'Đây là điều tối quan trọng: phạm thì xử tử tại gia.'};
  choicePopup(h,'Gia pháp',`${c.given} phạm gia quy`,`${esc(nameOf(c))} phạm điều <b>${esc(RULES[k].n)}</b>${n>1?` (lần thứ ${n})`:''}. ${GT[g]} Uy gia pháp hiện: ${uyWord().toLowerCase()}.`,opts)}
/* mỗi năm: dò các vi phạm không đến từ lựa chọn (tật xấu kéo dài, quan tham, chi phái làm quan, quá số người làm quan) */
function nuoiYear(){ /* v6.5.4: con nhỏ lớn lên dưới gia pháp nghiêm thì nghe lời, buông lỏng thì ngỗ nghịch */
  const u=S.uy??50;const d=(u>=60?1:u<35?-1:0)+(rule('nghiem')?1:0)+(rule('hieudao')?1:0)-(rule('tuquyet')?1:0);
  alive().forEach(p=>{if(age(p)<16&&!isHead(p)&&d)p.flags.nuoi=clamp((p.flags.nuoi||0)+d,-12,12)})}
function nhaChat(){const h=mainHH();const cap=HOMES[HH(h).home].cap;
  if(head()&&hhCount(h)>=cap&&HH(h).home<HOMES.length-1&&S.t-(S.nhaChatT??-99)>=36){S.nhaChatT=S.t;enqueue('ev',S.head,{ev:'gt_nha_chat',data:{}})}}
function vioTick(){nuoiYear();nhaChat();if(!head()||!S.rules.length)return;const mh=mainHH();
  const L=alive().filter(p=>inClan(p)&&!isHead(p)&&age(p)>=12);const once=(p,k)=>!(p.vio&&p.vio[k]);
  L.forEach(p=>{
    if(rule('cambac')&&p.habits.some(x=>['bac','ruou','donhau'].includes(x)&&vlv(p,x)>=40)&&chance(0.5))vioAdd(p,'cambac');
    if(rule('camxa')&&p.habits.includes('xahoa')&&chance(0.5))vioAdd(p,'camxa');
    if(rule('trugian')&&p.job==='quan'&&p.liem<35&&chance(0.4))vioAdd(p,'trugian');
    if(rule('chiquan')&&['quan','quan_ngu'].includes(p.job)&&p.hh!==mh&&!(branchLeader(p.hh)&&branchLeader(p.hh).id===p.id)&&once(p,'chiquan'))vioAdd(p,'chiquan',1)});
  const k=rule('quan3')?'quan3':rule('quan5')?'quan5':null;
  if(k){const lim=k==='quan3'?3:5;const all=alive().filter(p=>inClan(p)&&['quan','quan_ngu'].includes(p.job));
    if(all.length>lim)all.filter(p=>!isHead(p)).sort((a,b)=>(b.postT||b.enlistT||0)-(a.postT||a.enlistT||0)).slice(0,all.length-lim).forEach(p=>{if(once(p,k))vioAdd(p,k,1)})}
  S.rumor=(S.rumor||[]).filter(x=>S.t-x.t<120)}
/* mỗi năm một lần: còn chỗ trống gia quy và đã hết thời gian chờ thì nhắc gia chủ */
function ruleRemindPopup(h){const free=ruleSlots()-S.rules.length;if(!h||free<=0||S.noRuleRemind){setTimeout(nextPopup,0);return}
  choicePopup(h,'Gia quy','Gia quy còn chỗ trống',`Gia quy của họ ${esc(S.surname)} còn trống ${free} điều. Lập thêm gia quy giúp người nhà, nhất là những người ở xa không ở dưới mắt gia chủ, biết điều gì được làm, điều gì không. Gia quy chia bốn nhóm: tăng trưởng; phạt tiền, đòn roi; trục xuất; xử tử tại gia.`,[
    {l:'Mở trang Gia tộc để lập gia quy',go:()=>{closeModal();page='giatoc';render()}},
    {l:'Để sau, năm sau nhắc lại',f:()=>'Gia chủ gác chuyện gia quy lại.'},
    {l:'Thôi, đừng nhắc nữa',f:()=>{S.noRuleRemind=1;return 'Từ nay không nhắc chuyện gia quy nữa.'}}])}
function dropRule(k){if(!S.rules.includes(k))return;S.rules=S.rules.filter(x=>x!==k);if(S.t>0)S.on=clamp(S.on-3-(rule('tohuan')&&k!=='tohuan'?4:0),0,100);log(`Bỏ gia quy: ${RULES[k].n.toLowerCase()}.`)}
/* gia chủ mới muốn bỏ điều trái tính mình */
const RULE_HATE={thanhliem:c=>axv(c,'thanh')<30||has(c,'thamlam'),trugian:c=>axv(c,'thanh')<30||has(c,'thamlam'),tietkiem:c=>axv(c,'tiet')<30,camxa:c=>axv(c,'tiet')<30,cambac:c=>c.habits.includes('bac')||c.habits.includes('ruou'),
  hieuhoc:c=>c.tri<35,thuhuong:c=>c.tri<35,nghiem:c=>axv(c,'diem')>=75&&axv(c,'rong')>=70,khoandung:c=>axv(c,'diem')<30,thuongvo:c=>c.vo<30&&c.tri>=70,trongthuong:c=>axv(c,'tv')<30,nghia:c=>axv(c,'rong')<25,nghiadien:c=>axv(c,'rong')<25};
function newHeadRules(h){const k=S.rules.find(r=>RULE_HATE[r]&&RULE_HATE[r](h));if(k)enqueue('rulechg',h.id,{k})}
function rulechgPopup(h,it){const k=it.k;if(!S.rules.includes(k)){setTimeout(nextPopup,0);return}
  const fans=alive().filter(p=>p.id!==h.id&&age(p)>=20&&!(RULE_HATE[k]&&RULE_HATE[k](p)));
  choicePopup(h,'Gia quy',`Muốn bỏ "${RULES[k].n}"`,`Gia chủ mới ${esc(h.given)} vốn không ưa điều "${esc(RULES[k].n.toLowerCase())}" trong gia quy. ${fans.length?`${fans.length} người trong họ vẫn muốn giữ.`:'Ít ai lên tiếng phản đối.'}`,[
    {l:'Bỏ đi',f:x=>{dropRule(k);fans.forEach(p=>{if(axv(p,'ht')<60){addRel(p,h,-6)}});return 'Gia quy được sửa theo ý gia chủ mới.'}},
    {l:'Giữ phép cũ',f:x=>{fans.forEach(p=>addRel(p,h,3));return 'Gia chủ nén lòng, giữ lời tổ dặn.'+fx(h,{tam:-3})}}])}
/* họ hàng đòi thêm, người trong tộc đề nghị */
function ruleYear(){if(!head())return;
  if(!rule('nghiem')&&alive().some(p=>p.fame<-60)&&!((S.rfT||0)>S.t)){S.rfT=S.t+60;enqueue('ruleforce',S.head,{k:'nghiem'})}
  /* v6.4.1.5: hết chỗ gia quy thì không ai đề xuất; chỉ người nhà chính đang ở nhà mới đề xuất */
  if(chance(0.12)&&!((S.rpT||0)>S.t)&&S.rules.length<ruleSlots()){const ps=alive().filter(p=>!isHead(p)&&inClan(p)&&inMain(p)&&!p.away&&age(p)>=30&&(p.eq>=55||p.fame>=40));if(!ps.length)return;const p=pick(ps);
    const want=[['hieuhoc',p.tri>=70],['thuhuong',p.degree>=1],['thuongvo',p.vo>=70],['nghia',axv(p,'rong')>=70],['nghiadien',axv(p,'rong')>=65&&tierIdx()>=3],['tietkiem',axv(p,'tiet')>=70],['hieudao',axv(p,'ht')>=75],['doanket',axv(p,'hd')>=70],['kinhto',axv(p,'ht')>=65&&age(p)>=50],['thanhliem',p.job==='quan'&&p.liem>=70],['trugian',p.job==='quan'&&p.liem>=75],['nuhoc',p.g==='nữ'&&p.tri>=65],['taigia',p.flags.divorced||(p.spouse&&!married(p))]].filter(([k,ok])=>ok&&!S.rules.includes(k)&&!ruleReq(k)&&!ruleClash(k)).map(([k])=>k);
    if(want.length){S.rpT=S.t+36;enqueue('ruleprop',p.id,{k:pick(want)})}}}
function rulepropPopup(p,it){const h=head();const k=it.k;if(!h||S.rules.includes(k)){setTimeout(nextPopup,0);return}const full=S.rules.length>=ruleSlots();
  choicePopup(h,'Gia quy',`${p.given} đề nghị gia quy`,`${esc(nameOf(p))} xin gia chủ thêm điều "${esc(RULES[k].n)}" vào gia quy: ${esc(RULES[k].d.toLowerCase())}.${full?' Gia quy đã đủ chỗ, muốn thêm phải bỏ một điều cũ.':''}`,[
    {l:'Chấp thuận',c:()=>!full,f:x=>{addRule(k,'theo đề nghị của '+p.given);addRel(p,h,8);return 'Người đề nghị mừng rỡ, cả họ khen gia chủ biết nghe.'}},
    {l:'Để lúc khác',f:x=>{addRel(p,h,-3);return `${esc(p.given)} hơi thất vọng.`}}])}
function ruleforcePopup(h,it){const k=it.k;
  choicePopup(h,'Gia quy','Họ hàng đòi lập gia pháp',`Trong họ có kẻ làm điều bại hoại, tiếng xấu lan khắp vùng. Các bậc trưởng lão họp ở từ đường, đòi thêm điều "${esc(RULES[k].n.toLowerCase())}" vào gia quy.`,[
    {l:'Nghe theo trưởng lão',f:x=>{if(S.rules.length>=ruleSlots())dropRule(S.rules[0]);addRule(k,'trưởng lão đòi');S.on=clamp(S.on+4,0,100);return 'Gia pháp được lập, kẻ hư hỏng phải dè chừng.'}},
    {l:'Gạt đi',f:x=>{cf(-8,'Gia chủ dung túng người hư');S.on=clamp(S.on-6,0,100);return 'Trưởng lão phất tay áo bỏ về.'}}])}
/* hiệu ứng hằng tháng của các gia quy mới */
function ruleMonth(){
  if(rule('trugian'))alive().forEach(p=>{if(p.job==='quan')p.liem=Math.min(100,p.liem+0.06)});
  if(rule('trugian'))cf(0.15,'Gia quy nghiêm trị gian tham');if(rule('thuongdan')){cf(0.1,'Gia quy khoan hậu với dân');if(S.farm.to===2)S.farm.to=1}
  if(rule('kinhto')){S.money-=mm(0.3);cf(0.25,'Kính tổ, giỗ chạp chu toàn')}if(rule('thuhuong'))cf(0.2,'Thư hương truyền gia');
  if(rule('camxa'))for(const id in S.hh){if(S.hh[id].life>3)S.hh[id].life=3}
  if(rule('nghiadien')){if(S.lastNet>0)S.money-=Math.round(S.lastNet*0.05);branches().forEach(id=>{const h=S.hh[id];if(h.money<0&&S.money>-h.money+mm(2)){S.money+=h.money;log(`Nghĩa điền giúp ${h.name} trả ${money(-h.money)} nợ.`,'gd');h.money=0}})}}

/* ================= cảnh giới sau 100: danh hiệu, cửa ải, thiên cơ mở 200 ================= */
const gateCap=(c,k)=>(c.gate&&c.gate[k])||100;
const hardCap=(c,k)=>(c.g200&&c.g200[k])?200:150;
const nextGate=g=>g===100?120:g===120?140:g===140?150:g===150?200:g;
const statV=(c,k)=>c[k];
/* v6.3.2: danh hiệu không còn tự hiện khi chỉ số đủ; phải được công nhận qua sự kiện hoặc kỳ ngộ (xem confer) */
function titleIdx(c,k){return ctRank(c,k)}
function titleOf(c,k){const i=ctRank(c,k);return i>=0?STITLE[k][i][1]:null}
function gateCheck(c,a){if(a<8)return;c.msQ=c.msQ||{};c.ttl=c.ttl||{};
  for(const [k] of STATS){const g=gateCap(c,k);const v=c[k];
    if(!c.brk&&GATES.includes(g)&&v>=g-0.6&&!((c.msRetry[k]||0)>S.t)&&c.msQ[k]!==g){c.msQ[k]=g;enqueue('ms',c.id,{k,t:g})}
    const i=titleIdx(c,k);if(i>(c.ttl[k]??-1)){const first=c.ttl[k]==null&&i>0&&S.t-c.born<12*20;c.ttl[k]=i;if(i>=1&&!first)enqueue('ttl',c.id,{k,i})}}}
function ttlPopup(c,it){const [n,t]=STITLE[it.k][it.i];const f=Math.round(4+it.i*4);c.fame+=f;cf(f*0.3,'Người nhà đạt danh hiệu');log(`${nameOf(c)} ${SN[it.k].toLowerCase()} đạt ${n}, người đời gọi là "${t}".`,'gd');
  infoPopup(c,`${SN[it.k]} ${n}`,`"${t}"`,`${esc(c.given)} đã đạt ${SN[it.k].toLowerCase()} ${n}. Tiếng tăm lan ra, người ta bắt đầu gọi là <b>${esc(t)}</b>.${it.i+1<STITLE[it.k].length?` Danh hiệu kế tiếp ở mốc ${STITLE[it.k][it.i+1][0]}.`:''}`+fx(c,{tam:5}))}
const THIENCO={tri:'Một đêm sao Văn Khúc sáng rực, trong mộng có người đưa cho một cuốn sách không chữ.',vo:'Trên đỉnh núi tuyết, một bóng người áo trắng múa kiếm giữa trăng, mỗi đường kiếm như vẽ ra trời đất.',
  suc:'Một vị lão nhân tóc bạc mà mặt hồng như trẻ thơ chỉ vào ngọn núi phía tây: "Nơi ấy có suối thuốc ba trăm năm mới chảy một lần."',mi:'Trong giấc mơ, một nữ nhân không rõ mặt mỉm cười, cả vườn hoa nở bung trong đêm đông.',eq:'Một vị cao tăng trăm tuổi gõ cửa, chỉ nói một câu: "Ngươi đã thấu lòng người, nay có muốn thấu lòng trời?"'};
function thiencoTick(c){if(age(c)<20||c.brk||c.away)return;for(const [k] of STATS){if(gateCap(c,k)!==150||(c.flags['tc_'+k]))continue;const v=k==='suc'?c.cap.suc:c[k];if(v<148)continue;
  if(chance(0.0003*(0.5+c.duyen/100)*(1+famLuck()/150)*(1+tsum(c,'brk')/20))){c.flags['tc_'+k]=1;enqueue('thienco',c.id,{k});return}}}
function thiencoPopup(c,it){const k=it.k;const p=BRK100[k].find(x=>x.id==='thien');
  choicePopup(c,'Thiên cơ',`Thiên cơ: ${SN[it.k].toLowerCase()}`,`${THIENCO[k]} ${esc(c.given)} biết đây là cơ duyên ngàn năm có một, qua được thì ${SN[k].toLowerCase()} có thể vượt khỏi giới hạn của người phàm. Mất một hai năm, thành bại khó lường.`,[
    {l:'Dốc hết lòng lĩnh ngộ',f:x=>brkStart(c,k,p,150)},{l:'Phàm nhân không dám mơ cao',f:x=>'Lòng tiếc nuối mãi về sau.'+fx(c,{tam:-4})}])}
function initBrk62(){for(const [k] of STATS){if(!BRK100[k].some(p=>p.id==='thien'))BRK100[k].push({id:'thien',l:'Lĩnh ngộ thiên cơ',d:'Cơ duyên ngàn năm',mo:[16,30],sp:{[k]:1,duyen:.6},hidden:1})}}

/* ================= kêu gọi nhờ danh vọng ================= */
function keugoiPopup(){const h=head();if(!h)return;const f=S.fame;const pool=mm(Math.max(2,f/50));
  choicePopup(h,'Danh vọng','Kêu gọi',`Danh vọng gia tộc ${fmt(f)}. Nhà có tiếng thì một lời kêu gọi, người trong vùng sẵn lòng góp sức góp của. Mỗi ba năm chỉ nên kêu gọi một lần.`,[
    {l:'Kêu gọi quyên góp đắp đê, sửa đường',f:x=>{S.kgT=S.t+36;cf(Math.max(5,f*0.03),'Đứng ra lo việc làng');S.on=clamp(S.on+3,0,100);S.hung=clamp(S.hung+3,0,100);return `Dân làng góp được ${money(pool)}, đường đê sửa xong, ai cũng nhắc tên họ ${esc(S.surname)}.`}},
    {l:'Kêu gọi lập nghĩa thương cứu đói',c:()=>!!S.disaster||tierIdx()>=3,f:x=>{S.kgT=S.t+36;const own=Math.min(Math.max(0,S.money),mm(8));S.money-=own;cf(Math.max(8,f*0.05),'Lập nghĩa thương cứu đói');return `Gia tộc bỏ ${money(own)}, các nhà khác góp thêm ${money(pool)}. Kho thóc nghĩa thương mở cửa, dân đói kéo đến lạy tạ.`}},
    {l:'Kêu gọi họ hàng góp xây từ đường',c:()=>!S.tuduong,f:x=>{S.kgT=S.t+36;let got=0;alive().forEach(p=>{if(p.purse>mm(1)&&chance(0.3+obey(p)/200)){const v=Math.round(p.purse*0.15);p.purse-=v;got+=v}});const need=mm(20);if(got+S.money*0.3>=need){S.money-=Math.max(0,need-got);S.tuduong=1;S.on=clamp(S.on+6,0,100);cf(10,'Xây từ đường');return `Con cháu góp ${money(got)}. Từ đường khánh thành, hương khói nghi ngút.`}S.money+=got;return `Mới góp được ${money(got)}, chưa đủ xây, tạm gửi vào công quỹ.`}},
    {l:'Thôi',f:x=>''}])}

/* ================= hằng tháng, hằng năm ================= */
function v62Month(){
  ensure62();
  alive().forEach(c=>{if(!inClan(c))return;const a=age(c);
    if(c.away&&c.away.until&&S.t>=c.away.until&&['odo','sep'].includes(c.away.type)){const t=c.away.type;c.away=null;if(t==='odo'){log(`${nameOf(c)} hết hạn ở đợ, trở về nhà.`,'gd');addStat(c,'tam',10)}else log(`${nameOf(c)} trở về sau thời gian ly thân.`)}
    jobGrow(c);kidLearn(c,a);oanTick(c);thiencoTick(c);ctTick(c)});
  loveTick();outsTick();debtTick();ruleMonth();
  if(S.on<30&&chance(0.03)){const ps=alive().filter(p=>age(p)>=14&&!p.away&&!isHead(p));if(ps.length)enqueue('ev',pick(ps).id,{ev:pick(['v62_on_trom_nha','v62_on_bo_nha','v62_on_cai_va'])})}
  if(month()===1)v62Year()}
function v62Year(){
  alive().forEach(c=>{const a=age(c);v62Drift(c,a);
    if(rule('phanho')&&inMain(c)&&married(c)&&!c.inLaw&&!isHead(c)&&a>=25&&(c.gen||1)>=2&&!offOf(c)&&chance(0.35)&&!S.queue.some(q=>q.kind==='ask'))enqueue('ask',c.id,{t:'moveout'})});
  tumatCheck();ruleYear()}
function ensure62(){if(S.v62)return;S.v62=1;S.inlaws=S.inlaws||[];
  S.people.forEach(p=>{p.gate=p.gate||{};STATS.forEach(([k])=>{if(p.gate[k]==null&&p.ms&&p.ms[k]&&p.ms[k].includes(100)&&!(p.brk&&p.brk.k===k)&&(k==='suc'?p.cap.suc:p[k])>=99)p.gate[k]=120})})}
/* ================= bổ nhiệm quan ================= */
/* chọn chức cao nhất không vượt phẩm r mà người đó gần đủ điều kiện */
function appoint(c,r,keepJob){
  if(c.job!=='quan'){if(!keepJob)setJob(c,'quan');else{c.job='quan';c.m=c.m||0}}
  const kp=kinPosts(c);const cur=seatOfC(c);
  const soft=T=>{for(const k in T.req)if(c[k]<T.req[k]*0.85)return false;return true};
  const tids=Object.keys(OFFICES).filter(id=>!OFFICES[id].mil&&OFFICES[id].tag!=='y'&&OFFICES[id].r<=r&&soft(OFFICES[id])).map(id=>[id,OFFICES[id].r+Math.random()*0.9]).sort((a,b)=>b[1]-a[1]).map(x=>x[0]);
  const free=k=>k!==cur&&!barReason(c,k,kp);
  let key=null;
  for(const tid of tids){const ks=shuf(DX.seatKeys(tid)).filter(free);if(!ks.length)continue;
    const vac=ks.filter(k=>S.off&&S.off[k]&&S.off[k].vac);key=vac.length?vac[0]:ks[0];break}
  if(!key){const ks=shuf(DX.seatKeys('dichthua').concat(DX.seatKeys('chubo'))).filter(free);key=ks[0]||DX.seatKeys('dichthua')[0]}
  const old=offState(key).n;
  assignPost(c,key);
  /* v6.4.1.4: sử ký quan trường */
  if(!DRY){const H=qtH();if(!H.first){H.first=S.t;qtLog('Khai khoa nhập sĩ',`${nameOf(c)} là người đầu tiên của họ ${esc(S.surname)} bước vào quan trường.`)}
    if(r>=6&&!c.flags.qtHi){c.flags.qtHi=1;qtLog('Vào hàng đại thần',`${nameOf(c)} lên tới ${RANKS[r]}.`)}}
  return {id:seatT(key),key,old};
}
const hasJob=(...js)=>home().some(p=>js.some(j=>j===p.job||(j.startsWith('biz:')||['yquan','tiem','xuong','truong','voquan'].includes(j))&&p.job==='chu'&&bizOf(p)&&bizOf(p).type===j.replace('biz:','')));
const isOfficialFamily=()=>alive().some(p=>['quan','nguy'].includes(p.job));

/* ================= chân dung sinh từ tên ================= */
function hashStr(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function avatarSVG(c,size){
  const h=hashStr(c.surname+c.given+c.id);const a=c._age!=null?c._age:age(c);const f=c.g==='nữ';
  const r=k=>(h>>>(k*3))%7;
  const skins=['#f1d3b3','#e8c29c','#d9ab83','#c99370'];const skin=skins[h%4];
  const old=a>=55;const kid=a<12;
  const hair=old?'#b9b6ae':a>=45&&r(2)<3?'#5e5a55':['#1d1a17','#2b211b','#3a2a1e'][r(3)%3];
  const hue=(h>>>8)%360;
  let robe=`hsl(${hue},38%,${f?52:40}%)`;
  if(c.job==='quan')robe=c.lv>=6?'#7a1f1f':c.lv>=3?'#a33a2a':'#2f5a7a';
  if(c.job==='quan_ngu')robe='#5d6266';if(c.job==='vua')robe='#c9a227';if((c.tuoc||0)>0&&c.job!=='quan')robe='#6a3f8a';
  const eyeY=31,ew=r(4)%3;
  const eyes=f?`<path d="M23 ${eyeY}q3-${2+ew/2} 6 0M35 ${eyeY}q3-${2+ew/2} 6 0" stroke="#2a1d16" stroke-width="1.6" fill="none" stroke-linecap="round"/>`
             :`<path d="M23 ${eyeY}h6M35 ${eyeY}h6" stroke="#2a1d16" stroke-width="${1.8+ew*0.3}" stroke-linecap="round"/>`;
  const brow=`<path d="M22 ${eyeY-4}l7 ${f?0:-1}M35 ${eyeY-4+(f?0:-1)}l7 ${f?0:1}" stroke="${hair}" stroke-width="${f?1:1.8}" stroke-linecap="round"/>`;
  const mouth=c.dead!=null?`<path d="M28 41h8" stroke="#7a3b30" stroke-width="1.4"/>`:`<path d="M28 40q4 ${c.tam>=50?3:-1} 8 0" stroke="#7a3b30" stroke-width="1.5" fill="none" stroke-linecap="round"/>`;
  const blush=f&&!old?`<circle cx="22" cy="37" r="2.6" fill="#e58f86" opacity=".45"/><circle cx="42" cy="37" r="2.6" fill="#e58f86" opacity=".45"/>`:'';
  let back='',top='',beard='';
  if(f){
    back=`<path d="M14 34q-2-22 18-23q20 1 18 23v10q-4-6-6-14h-24q-2 8-6 14z" fill="${hair}"/>`;
    const st=r(5)%3;
    top=st===0?`<circle cx="32" cy="9" r="7" fill="${hair}"/><path d="M22 9h20" stroke="#c9a227" stroke-width="1.6"/>`
      :st===1?`<circle cx="18" cy="14" r="6" fill="${hair}"/><circle cx="46" cy="14" r="6" fill="${hair}"/>`
      :`<ellipse cx="32" cy="10" rx="11" ry="6" fill="${hair}"/><circle cx="42" cy="9" r="2" fill="#a5342a"/>`;
    if(kid)top=`<circle cx="20" cy="13" r="4.5" fill="${hair}"/><circle cx="44" cy="13" r="4.5" fill="${hair}"/>`;
    top+=`<path d="M19 26q2-13 13-13q11 0 13 13q-6-7-13-7q-7 0-13 7z" fill="${hair}"/>`;
  }else{
    top=`<path d="M19 27q0-15 13-15q13 0 13 15q-5-8-13-8q-8 0-13 8z" fill="${hair}"/>`;
    if(kid)top+=`<circle cx="32" cy="10" r="3.5" fill="${hair}"/>`;
    else if(c.job==='quan')top+=`<path d="M20 18q12-12 24 0v-3q-12-10-24 0z" fill="#16130f"/><rect x="21" y="7" width="22" height="11" rx="4" fill="#16130f"/><rect x="8" y="12" width="13" height="3" rx="1.5" fill="#16130f"/><rect x="43" y="12" width="13" height="3" rx="1.5" fill="#16130f"/>`;
    else if(c.job==='quan_ngu')top+=`<path d="M18 22q0-14 14-14t14 14z" fill="#6f7478"/><path d="M32 3v6" stroke="#a5342a" stroke-width="3"/>`;
    else if(c.job==='hiep')top+=`<path d="M8 20l24-12 24 12z" fill="#b7975a"/><path d="M8 20h48" stroke="#7a4f32" stroke-width="1.2"/>`;
    else if(c.job==='vua')top+=`<rect x="22" y="5" width="20" height="9" fill="#c9a227"/><path d="M18 5h28" stroke="#c9a227" stroke-width="2"/>`;
    else top+=`<circle cx="32" cy="10" r="4.5" fill="${hair}"/><path d="M28 12h8" stroke="#7a4f32" stroke-width="1.6"/>`;
    if(a>=35&&r(6)<4)beard=r(6)%2?`<path d="M26 43q6 ${old?14:8} 12 0" fill="${hair}"/>`:`<path d="M25 39q-2 3 0 5M39 39q2 3 0 5M27 38q5-2 10 0" stroke="${hair}" stroke-width="1.6" fill="none"/>`;
  }
  const wrin=old?`<path d="M21 35l3 1M43 35l-3 1" stroke="#8a6a55" stroke-width=".8"/>`:'';
  const s=size||40;
  return `<svg class="ava" width="${s}" height="${s}" viewBox="0 0 64 64" aria-hidden="true" style="${c.dead!=null||c.left?'filter:grayscale(1);opacity:.75':''}">
  <circle cx="32" cy="32" r="32" fill="hsl(${(hue+150)%360},28%,86%)"/>${back}
  <path d="M8 64q2-16 24-17q22 1 24 17z" fill="${robe}"/><path d="M26 47l6 8 6-8" fill="${f?'#f3e6d0':'#ece3d2'}"/>
  <rect x="28" y="40" width="8" height="8" fill="${skin}"/>
  <ellipse cx="32" cy="31" rx="${kid?12:13}" ry="${kid?13:15}" fill="${skin}"/>${top}${brow}${eyes}${blush}${mouth}${beard}${wrin}</svg>`;
}

/* ================= nhà cửa vẽ tay ================= */
function roof(x1,x2,y,h){const m=(x1+x2)/2;return `<path class="r" d="M${x1-10} ${y+h} Q${x1-2} ${y+h-3} ${x1+6} ${y} L${x2-6} ${y} Q${x2+2} ${y+h-3} ${x2+10} ${y+h} Z"/><path d="M${x1+6} ${y} Q${m} ${y-5} ${x2-6} ${y}" stroke-width="3" fill="none" style="stroke:var(--roof)"/>`}
function hall(x,w,y,h){return `<rect class="w" x="${x}" y="${y}" width="${w}" height="${h}"/>`+Array.from({length:Math.max(1,Math.floor(w/22))},(_,i)=>`<rect class="d" x="${x+8+i*22}" y="${y+h-20}" width="10" height="20"/>`).join('')+`<rect class="d" x="${x}" y="${y+h-3}" width="${w}" height="3"/>`}
function homeSVG(t){
  let g='';
  if(t===0)g=`<path class="s" d="M80 118 L120 70 L160 118 Z"/><rect class="d" x="113" y="100" width="14" height="18"/>`;
  if(t===1)g=`<rect class="w" x="84" y="94" width="72" height="26"/><path class="s" d="M72 98 L120 64 L168 98 Z"/><rect class="d" x="113" y="102" width="14" height="18"/><rect class="d" x="92" y="102" width="12" height="8"/><rect class="d" x="136" y="102" width="12" height="8"/>`;
  if(t===2)g=hall(72,96,92,28)+roof(72,168,76,18)+`<circle class="tr" cx="50" cy="96" r="12"/><rect class="d" x="48" y="100" width="4" height="20"/>`;
  if(t===3)g=hall(30,52,96,24)+roof(30,82,82,15)+hall(158,52,96,24)+roof(158,210,82,15)+hall(88,64,86,34)+roof(88,152,68,19);
  if(t===4)g=hall(20,50,98,22)+roof(20,70,86,13)+hall(170,50,98,22)+roof(170,220,86,13)+hall(80,80,82,38)+roof(80,160,66,18)+roof(92,148,52,15)+`<rect class="se" x="113" y="104" width="14" height="16"/><circle class="se" cx="74" cy="104" r="4"/><circle class="se" cx="166" cy="104" r="4"/>`;
  if(t===5)g=`<ellipse class="wa" cx="190" cy="122" rx="40" ry="6"/>`+hall(14,46,100,20)+roof(14,60,90,11)+hall(76,88,82,38)+roof(76,164,66,18)+roof(90,150,52,15)+`<rect class="w" x="186" y="58" width="22" height="58"/>`+roof(186,208,48,12)+roof(186,208,70,10)+roof(186,208,90,10)+`<circle class="tr" cx="226" cy="100" r="11"/><rect class="se" x="113" y="104" width="14" height="16"/>`;
  return `<svg viewBox="0 0 240 130" role="img" aria-label="${HOMES[t].n}"><style>.r{fill:var(--roof)}.w{fill:var(--wall)}.d{fill:var(--wood)}.s{fill:var(--straw)}.tr{fill:var(--jade)}.se{fill:var(--seal)}.wa{fill:var(--sky);stroke:var(--jade);stroke-width:1}</style>
  <rect width="240" height="130" style="fill:var(--sky)"/><path d="M0 60 Q40 40 80 58 T160 50 T240 56 V130 H0 Z" style="fill:var(--ground);opacity:.35"/>
  <rect y="118" width="240" height="12" style="fill:var(--ground)"/>${g}</svg>`;
}

/* ================= trang ================= */
const PAGES=[
  ['giapha','Gia phả',()=>true],
  ['cosngoi','Cơ ngơi',()=>true],
  ['ruong','Ruộng vườn',()=>farmArea()>0||S.farm.fief>0||alive().some(p=>p.job==='nong')],
  ['kinhdoanh','Kinh doanh',()=>S.biz.length>0||alive().some(p=>Object.keys(BIZ).some(t=>canOwn(p,t)))],
  ['kho','Kho & buôn',()=>Object.values(S.kho).some(v=>v>=1)||S.trips.length>0||alive().some(p=>['tieunhi','hangrong'].includes(p.job)||p.job==='chu')],
  ['bando','Thế giới',()=>true],
  ['hokhac','Họ khác',()=>true],
  ['quan','Quan trường',()=>alive().some(p=>p.job==='quan'||p.degree>=1||p.exam)],
  ['giatoc','Gia tộc',()=>true],
  ['nhatky','Nhật ký',()=>true]];
function unlockPages(){
  S.pages=S.pages||['giapha','cosngoi','giatoc','nhatky'];S.newPages=S.newPages||[];
  PAGES.forEach(([id,n,ok])=>{if(!S.pages.includes(id)){let v=false;try{v=ok()}catch(e){}if(v){S.pages.push(id);S.newPages.push(id);log(`Mở trang mới: ${n}.`,'gd')}}});
}

/* ================= giải thích khi bấm ================= */
const INFO={
  focus:['Thời gian rảnh','Mỗi người tự chọn việc rảnh theo ý thích, tính cách và túi tiền. Gia chủ ép được, nhưng chỉ giữ được một thời gian (người hiếu thuận giữ lâu hơn, người độc lập ngắn hơn) rồi người đó quay về ý mình. Không đủ tiền thì không theo được thú vui tốn kém. Việc phụ (đan lát, đi phu, đốn củi, chài lưới, làm thuê, buôn nhỏ) đem tiền về túi riêng, có mùa và có chuyện riêng.'],
  gop:['Góp công quỹ','Phần tiền công mà người đi làm ở nhà chính nộp về công quỹ. Góp nhiều thì công quỹ dày nhưng người nhà kém vui. Gia chủ thì nộp hết. Chi phái ở riêng góp một phần hai mươi làm giỗ chạp.'],
  coff:['Chức trong tộc','Khi đời thứ hai đã lập gia đình, gia tộc có thể đặt chức. Người giữ chức phải ở nhà chính, được trả lương từ công quỹ vào tiền riêng, được gia tộc nuôi. Ra ở riêng thì thôi chức.'],
  purse:['Tiền riêng','Người trên 18 tuổi ở nhà chính phải tự lo ăn tiêu bằng tiền riêng. Tiền công làm được trừ phần góp công quỹ thì vào đây. Hết tiền riêng thì công quỹ phải bù, người đó thấy mình ăn bám. Có thể góp vào công quỹ, xin cha mẹ giúp, hay được gia tộc thưởng khi lập công.'],
  money:['Công quỹ','Tiền chung của gia tộc: nuôi trẻ dưới 18, người già, nội trợ, người làm ruộng chung, người giữ chức, gia chủ. Thu từ ruộng, cơ sở của gia tộc, tô, bổng tước, lương gia chủ và phần góp của người nhà. 1.000 đồng = 1 lạng bạc, 1.000 lạng = 1 lượng vàng. Âm là đang nợ: cả nhà buồn, nợ lớn bị trừ danh vọng, quá nặng thì chủ nợ siết tài sản.'],
  net:['Thu chi tháng','Lương và lãi trừ chi tiêu của tháng trước, chưa tính mùa vụ. Xem chi tiết ở trang Cơ ngơi.'],
  fame:['Danh vọng gia tộc','Cùng tài sản quyết định gia thế. Lên nhờ người nhà có tiếng, xây nhà, đỗ đạt, tang lễ xứng đáng. Xuống vì nợ, tai tiếng, tang lễ sơ sài. Mỗi mốc danh vọng mở một đặc quyền (lãi nợ thấp, nhờ nói giúp khi bắt lính, quan trên che chở, trợ cấp thiên tai...). Xem nguồn tăng giảm và các đặc quyền ở trang Gia tộc.'],
  hung:['Hưng thịnh','Nhà đông người, có quan, có tước, làm ăn có lãi thì lên. Cao thì mọi việc thuận hơn.'],
  on:['Ổn định','Gia chủ EQ cao, mọi người vui, gia quy nghiêm, không nợ, ít bất hòa thì lên. Cao thì mọi lựa chọn dễ thành hơn.'],
  tier:['Gia thế','Điểm = danh vọng + tài sản/1000 + tước vị. Gia thế cao thì giá cả, lễ nghĩa, kỳ ngộ đều đổi theo.'],
  speed:['Tốc độ','×1 là 5 giây một tháng. Thời gian dừng khi có cửa sổ mở.'],
  tri:['Trí tuệ','Học hành, thi cử, làm quan, làm thầy, làm thuốc.'],vo:['Võ lực','Đánh nhau, tòng quân, tiêu cục, việc nặng.'],suc:['Sức khỏe','Hết là chết. Phần gạch chéo là sức khỏe tối đa đã mất vì tuổi, bệnh, sinh nở, thương tích.'],
  mi:['Mị lực','Dung mạo, phong thái. Hôn nhân, đàn hát, giao tế.'],eq:['EQ','Ăn nói, đối nhân xử thế. Buôn bán, hòa giải, làm gia chủ.'],
  tam:['Tâm trạng','Ảnh hưởng mọi cơ hội thành công và tốc độ rèn luyện. Lên xuống theo nhà cửa, mức sống, nghề, quan hệ trong nhà, kỳ ngộ.'],
  duyen:['Cơ duyên','Càng cao càng hay gặp kỳ ngộ, kỳ ngộ tốt nhiều hơn, việc khó dễ thành hơn.'],
  tv:['Tham vọng','Cao thì muốn làm chủ, muốn thi cử, muốn hơn người. Thấp thì an phận.'],cc:['Cần cù','Cao thì siêng, rèn luyện nhanh. Thấp thì lười, có thể không muốn đi làm.'],ht:['Hiếu thuận','Cao thì nghe lời bề trên. Thấp thì ngỗ nghịch, bị ép là chống đối.'],
  hd:['Hòa đồng','Cao thì dễ thân với mọi người. Thấp thì cô độc, khó gần.'],dl:['Tự lập','Cao thì muốn tự lo, có thể tự ý làm khi bị cấm. Thấp thì dựa dẫm.'],
  gan:['Gan dạ','Cao thì dám liều, lựa chọn mạo hiểm dễ thành. Thấp thì nhút nhát.'],thanh:['Thành thật','Cao thì thật thà, được tin. Thấp thì gian xảo. Trí thấp mà thật thà thì dễ bị lừa.'],
  rong:['Rộng lượng','Cao thì hay giúp người, được quý. Thấp thì ích kỷ, người nhà khó chịu.'],diem:['Điềm tĩnh','Cao thì gặp chuyện không rối. Thấp thì nóng nảy, hay gây chuyện.'],
  tiet:['Tiết chế','Cao thì khó sa vào tật xấu. Thấp thì buông thả, rất dễ nhiễm cờ bạc, rượu chè.'],yc:['Ý chí','Cao thì kiên định, dễ bỏ tật xấu. Thấp thì nhu nhược, dễ bị rủ rê.'],
  axes:['Tính cách','Mười một trục, 50 là trung bình. Từ 75 trở lên hoặc từ 25 trở xuống thì hiện thành nét tính cách. Tính cách do bẩm sinh và cha mẹ truyền, rồi thay đổi theo cách nuôi dạy, trường học, nghề, mức sống, gia quy, thói quen và những lựa chọn trong đời. Trẻ con dễ đổi, người già khó đổi.'],
  muu:['Cơ mưu','Tính kế, nhìn thấu mưu người. Lên nhờ đọc binh thư, làm quan, học cao.'],khau:['Khẩu tài','Ăn nói, thuyết phục. Phỏng vấn, buôn bán, hòa giải, khuyên răn. Lên nhờ giao du, buôn bán, dạy học.'],
  ql:['Quản trị','Quản người, quản tiền. Làm chủ cơ sở lãi hơn, nội trợ giỏi thì nhà bớt chi tiêu. Lên chậm theo chức vụ trong nghề (bậc càng cao càng nhanh), làm chủ cơ sở thì mỗi năm thêm 1; học sổ sách, nội trợ cũng lên. Trẻ con học được từ cha mẹ, ông bà cùng nhà. Muốn trông hay mở cơ sở cần từ 35.'],ky:['Kỹ nghệ','Tay nghề khéo. Thợ, thầy thuốc, nghệ nhân, chăn nuôi lên thông thạo nhanh hơn.'],
  vice:['Tật xấu','Có mức độ 0 đến 100. Người buông thả, nhu nhược, trẻ tuổi, mức sống xa hoa, người trong nhà cũng mắc thì dễ nhiễm. Càng nặng càng hại việc, hại tiền, dễ kéo theo tật khác. Giữ lâu trên 5 năm thì ăn vào bản tính, rất khó bỏ. Cha mẹ, gia chủ có thể răn dạy.'],
  preview:['Xem trước hệ quả','Dưới mỗi lựa chọn hiện những gì có thể tăng (▲) hoặc giảm (▼) khi thành hay bại. Thay đổi tính cách ngầm thì không hiện. Bật tắt trong Menu.'],
  pot:['Tiềm năng','Chỉ số mà người này tự đạt tới năm 18 tuổi, chưa kể học hành rèn luyện (học thêm thì cộng vào trên đó). Do gen cha mẹ và năng khiếu bẩm sinh quyết định. Tiềm năng cao thì lớn nhanh hơn và rèn luyện cũng nhanh hơn.'],
  mm:['Thông thạo','Tay nghề trong nghề hiện tại, tăng theo năm làm việc. Đủ thông thạo và chỉ số thì được thăng bậc.'],
  liem:['Liêm chính','Thấp thì lộc ngoài nhiều nhưng dễ bị hặc tội.'],merit:['Chiến công','Đủ thì thăng cấp trong quân, rất cao có thể được phong tước.'],
  rel:['Quan hệ','Thân hay sơ với từng người trong nhà. Tính cách hợp nhau thì thân dần, xung khắc thì hay cãi vã. Quan hệ tốt làm tâm trạng tốt.'],
  think:['Tâm tư','Điều người này đang nghĩ. Có lúc họ sẽ tự đến xin gia chủ cho làm điều mình muốn.'],
  rules:['Gia quy','Số điều được giữ tùy gia thế và số người trong họ. Thêm điều mới làm Ổn định giảm 5, mỗi năm chỉ thêm một điều. Bỏ điều cũ cũng làm lòng người xáo động.'],
  region:['Vùng','Mỗi vùng sản vật khác nhau nên giá khác nhau. Mang hàng từ nơi rẻ tới nơi đắt mà bán. Đường càng xa càng lâu, càng nhiều rủi ro.']};
function infoText(k){
  if(k.startsWith('hb:')){return ['Uy gia chủ',`Làm gia chủ thì được cộng thẳng +${+k.slice(3)} vào cả năm chỉ số (trí tuệ, võ lực, sức khỏe, mị lực, EQ). Mức cộng theo địa vị gia tộc, hiện là ${tierName().toLowerCase()}: ${TIERS.map(([n],i)=>n+' +'+HEADB[i]).join(', ')}. Đó là uy của chức, không phải của người: không còn làm gia chủ thì mất, địa vị gia tộc xuống thì mức cộng cũng giảm.`]}
  if(k.startsWith('fp:')){const q=FAME_SELF[+k.slice(3)-1];return q?[q[1],'Từ '+q[0]+' danh vọng cá nhân. '+q[2]]:['','']}
  if(k.startsWith('tr:')){const T=TRAITS[k.slice(3)];return [T.n,T.d+'.']}
  if(k.startsWith('org:')){const O0=ORIGINS[k.slice(4)];return [O0.n,O0.d]}
  if(k.startsWith('job:')){const J=JOBS[k.slice(4)];return [J.n,J.d]}
  if(k.startsWith('reg:')){const R0=REGIONS[k.slice(4)];return [R0.n,R0.d+' Sản vật: '+R0.spec+'.']}
  if(k.startsWith('hab:')){const H=HABITS[k.slice(4)];return [H.n,H.d+'.'+(H.vice?' '+INFO.vice[1]:'')]}
  return INFO[k]||['',''];
}
const I=(k,html)=>`<span class="tap" data-info="${k}">${html}</span>`;
function showTip(el){
  const t=document.getElementById('tip');const [h,b]=infoText(el.dataset.info);if(!h&&!b)return;
  t.innerHTML=`<b>${esc(h)}</b><span>${esc(b)}</span>`;t.hidden=false;
  const r=el.getBoundingClientRect();const w=Math.min(300,innerWidth-24);t.style.width=w+'px';
  let x=Math.min(Math.max(12,r.left+r.width/2-w/2),innerWidth-w-12);let y=r.bottom+8;
  t.style.left=x+'px';t.style.top=y+'px';const th=t.offsetHeight;if(y+th>innerHeight-8)t.style.top=Math.max(8,r.top-th-8)+'px';
}
document.addEventListener('click',e=>{const el=e.target.closest('[data-info]');const t=document.getElementById('tip');
  if(el){e.preventDefault();e.stopPropagation();if(!t.hidden&&t.dataset.k===el.dataset.info){t.hidden=true;return}t.dataset.k=el.dataset.info;showTip(el);return}
  if(t&&!t.hidden)t.hidden=true},true);

/* ================= thanh trên ================= */
const moodWord=v=>v>=80?'Hân hoan':v>=60?'Vui vẻ':v>=40?'Bình thường':v>=20?'Buồn bã':'Suy sụp';
function topHTML(){
  const d=dOf(S.t);const net=S.lastNet??(totalIncome()-expenses().total);
  const tags=[S.war?'chiến sự':'',S.epi?'có dịch':'',S.disaster?(DIS[S.disaster.k]?DIS[S.disaster.k].n.toLowerCase():'thiên tai'):'',S.recruit>S.t?'tuyển quân':''].filter(Boolean);
  return `<div class="brand"><div class="sealmark" aria-hidden="true">${esc((S.surname||'家').slice(0,1))}</div><div><h1>Họ ${esc(S.surname)}</h1><small>${I('tier',tierName())} · ${I('reg:'+(S.region||'trung'),REGIONS[S.region||'trung'].n)}${S.loc&&PROV[S.loc.p]?' · '+esc(PROV[S.loc.p].n):''} · ${alive().length} người</small></div></div>
   <div class="stat"><b class="num">T${d.m} · năm ${d.y}</b><span>${tags.length?'<em class="down">'+tags.join(', ')+'</em>':'&nbsp;'}</span></div>
   <button class="stat" data-info="money"><b class="num ${S.money<0?'down':''}">${money(S.money,1)}</b><span class="${net>=0?'up':'down'}">công quỹ ${net>=0?'+':''}${money(net,1)}</span></button>
   <button class="stat" data-info="fame"><b class="num">${fmt(S.fame)}</b><span>danh vọng</span></button>
   <button class="stat" data-info="hung"><b class="num">${Math.round(S.hung)}</b><span>hưng thịnh</span></button>
   <button class="stat" data-info="on"><b class="num">${Math.round(S.on)}</b><span>ổn định</span></button>
   <button class="stat gm" id="gmenu" aria-label="Menu"><b>☰</b><span>menu</span></button>
   <div class="speed" role="group" aria-label="Tốc độ thời gian">${[[0,'❚❚'],[1,'×1'],[2,'×2'],[5,'×5'],[10,'×10']].map(([v,l])=>`<button data-speed="${v}" aria-pressed="${(running?speed:0)===v}" aria-label="${v?'Tốc độ '+l:'Dừng'}">${l}</button>`).join('')}</div>`;
}
function navHTML(){
  return `<nav class="tabs" aria-label="Trang">${PAGES.filter(([id])=>S.pages.includes(id)).map(([id,n])=>`<button data-page="${id}" aria-pressed="${page===id}">${n}${S.newPages.includes(id)?'<i class="dot" aria-label="mới"></i>':id==='kinhdoanh'&&bizVacant()?'<i class="dot warn" aria-label="thiếu người"></i>':''}</button>`).join('')}</nav>`;
}

/* ================= gia phả ================= */
function nodeHTML(p,old){
  const cls=['node'];if(old)cls.push('old');if(p.dead!=null)cls.push('dead');if(p.left)cls.push('left');if(p.id===S.head)cls.push('head');
  const badge=p.preg?'<span class="badge preg">thai</span>':p.away?`<span class="badge away">${p.away.type==='army'?'lính':p.away.type==='jh'?'giang hồ':p.away.type==='mourn'?'cư tang':p.away.type==='follow'?'theo quan':'đi buôn'}</span>`:p.tuoc?`<span class="badge">${TUOC[p.tuoc]}</span>`:p.exam?'<span class="badge">ứng thí</span>':p.hh!==mainHH()&&inClan(p)?'<span class="badge away">ở riêng</span>':'';
  const a=age(p);
  return `<button class="${cls.join(' ')}" data-sel="${p.id}" aria-pressed="${sel===p.id}">${badge}<span class="nrow">${avatarSVG(p,30)}<span><b>${esc(nameOf(p))}</b>
   <small>${p.dead!=null?`† ${dOf(p.dead).y} · thọ ${a}`:p.left?relation(p):`${a} · ${a<16?(a>=6&&p.school!=='nha'?'đi học':'nhỏ'):esc(jobName(p))}`}</small></span></span>
   ${inClan(p)?`<span class="hp"><i style="width:${clamp(p.suc/1.5,0,100)}%"></i></span><span class="md"><i style="width:${p.tam}%"></i></span>`:''}</button>`;
}
/* các lần hôn nhân của p theo thứ tự, gồm cả người cũ; save cũ chưa có sph thì dùng dây nối spouse */
function spList(p){
  const L=(p.sph||[]).map(m=>({m,s:P(m.id)})).filter(x=>x.s);
  const cur=spouseOf(p);if(cur&&!L.some(x=>x.s.id===cur.id))L.push({m:{id:cur.id,k:'chanh',e:null},s:cur});
  return L}
const spTag=(p,m)=>(p.g==='nam'?(m.k==='ke'?'Kế thất':'Chính thất'):(m.k==='ke'?'Chồng sau':'Chồng'))+(m.e==='ly'?' · đã ly':'');
function treeHTML(p,tag,vis){
  /* v6.5.2: người bị trục xuất biến mất khỏi gia phả; khi xem riêng một chi thì chỉ vẽ người của chi đó (vis) */
  const L=spList(p).filter(x=>x.s.left!=='expelled'&&(!vis||vis(x.s)));const multi=L.length>1;
  /* v6.4.1.5.1: người bị trục xuất bị xóa khỏi gia phả; con cháu còn trong họ của họ thì treo lên dưới ông bà */
  const lift=k=>k.left==='expelled'?S.people.filter(x=>x.parents.includes(k.id)&&!x.inLaw).flatMap(lift):[k];
  const blood=S.people.filter(k=>k.parents.includes(p.id)&&!k.inLaw).flatMap(lift).filter(k=>!vis||vis(k));
  /* con của người vợ/chồng góa tái hôn với người ngoài họ: cả cha lẫn mẹ đều ở rể/về dâu, không nhánh nào khác vẽ tới */
  const chain=L.map(({m,s})=>{
    if(!s.inLaw)return {m,s,later:[]};
    const i=(s.sph||[]).findIndex(x=>x.id===p.id);
    const later=(s.sph||[]).slice(i+1).map(x=>({m:x,s:P(x.id)})).filter(x=>x.s&&x.s.inLaw&&x.s.id!==p.id);
    return {m,s,later}});
  const extra=[];
  chain.forEach(({s,later})=>later.forEach(l=>S.people.forEach(k=>{if(!k.inLaw&&k.parents.includes(s.id)&&k.parents.includes(l.s.id)&&!k.parents.includes(p.id)&&!extra.includes(k))extra.push(k)})));
  const kids=blood.concat(extra.filter(k=>k.left!=='expelled'&&(!vis||vis(k)))).sort((a,b)=>a.born-b.born);
  const kidTag=k=>{if(!multi&&!extra.includes(k))return '';const o=k.parents.filter(id=>id!==p.id).map(P).filter(Boolean);return o.length?`con ${o.map(q=>q.given).join(' và ')}`:''};
  const sps=chain.map(({m,s,later},i)=>{
    const old=m.e==='ly'||(multi&&i<chain.length-1);
    const lb=multi||m.e==='ly'||later.length?`<small class="mk">${spTag(p,m)}</small>`:'';
    return `<span class="knot"></span><span class="spw">${lb}${nodeHTML(s,old)}</span>${later.map(l=>`<span class="knot"></span><span class="spw"><small class="mk">${s.g==='nữ'?'Chồng sau':'Vợ sau'}${l.m.e==='ly'?' · đã ly':''}</small>${nodeHTML(l.s,l.m.e==='ly')}</span>`).join('')}`}).join('');
  return `<li><div class="couple"><span class="spw">${tag?`<small class="mk">${esc(tag)}</small>`:''}${nodeHTML(p)}</span>${sps}</div>${kids.length?`<ul>${kids.map(k=>treeHTML(k,kidTag(k),vis)).join('')}</ul>`:''}</li>`;
}
const bar=(l,v,cap,c,k)=>`<div class="bar ${c||''}">${k?I(k,l):`<span>${l}</span>`}<i><em class="${v>100?'over':''}" style="width:${clamp(v/1.5,0,100)}%"></em>${cap<150&&c==='hp'?`<s style="left:${cap/1.5}%;right:0"></s>`:''}</i><b class="num">${Math.floor(v)}<small>/${Math.floor(cap)}</small></b></div>`;
const traitChip=t=>{const T=TRAITS[t];return `<button class="chip t${T.c}" data-info="tr:${t}">${T.n}</button>`};
const axChips=c=>axLabels(c).map(t=>`<button class="chip pc ${TRAITS[t].c==='r'?'neg':''}" data-info="tr:${t}">${TRAITS[t].n}</button>`).join('');
const viceChips=c=>c.habits.filter(isVice).map(k=>`<button class="chip red" data-info="hab:${k}">${HABITS[k].n} ${Math.round(vlv(c,k))}${c.vnat&&c.vnat[k]?' · bản tính':''}</button>`).join('');
const habChips=c=>c.habits.filter(k=>!isVice(k)).map(x=>`<button class="chip blue" data-info="hab:${x}">${HABITS[x].n}</button>`).join('');
function statBlock(c,compact){
  ensurePersona(c);
  return `<div class="bars ${compact?'tight':''}">${STATS.map(([k,n])=>bar(n,c[k],k==='suc'?c.cap.suc:Math.max(capOf(c,k),c.cap[k]),k==='suc'?'hp':'',k)).join('')}
   <div class="bar md">${I('tam','Tâm trạng')}<i><em style="width:${c.tam}%"></em></i><b class="num">${Math.round(c.tam)}<small> ${compact?'':moodWord(c.tam)}</small></b></div>
   <div class="bar dy">${I('duyen','Cơ duyên')}<i><em style="width:${c.duyen}%"></em></i><b class="num">${Math.round(c.duyen)}</b></div></div>
   ${compact?'':`<div class="subs ax">${AXES.map(([k,n])=>{const v=Math.round(axv(c,k));return `<button class="sub ${v>=75?'hi':v<=25?'lo':''}" data-info="${k}"><b class="num">${v}</b><small>${n}</small></button>`}).join('')}</div>`}
   <div class="subs sk">${SKILLS.map(([k,n])=>`<button class="sub" data-info="${k}"><b class="num">${Math.round(skv(c,k))}</b><small>${n}</small></button>`).join('')}</div>`;
}
function sheetHTML(c){
  const a=age(c),J=JOBS[c.job],dead=c.dead!=null,out=!inClan(c);
  const deg=['','Cử nhân','Đỗ thi Hội',c.flags.examTitle||'Tiến sĩ'][c.degree];
  let h=`<button class="xclose" data-close aria-label="Đóng">×</button><div class="who">${avatarSVG(c,64)}<div style="min-width:0"><h2>${esc(nameOf(c))}</h2>
   <div class="chips"><span class="chip ${c.id===S.head?'gold':''}">${relation(c)}</span><span class="chip">${dead?'Đã mất':a+' tuổi'}</span>${selfPerks(c)}${c.hb?`<button class="chip gold" data-info="hb:${c.hb}">Uy gia chủ +${c.hb}</button>`:''}${c.tuoc?`<button class="chip gold" data-info="tr:tu_${Math.min(5,c.tuoc)}">${TUOC[c.tuoc]}</button>`:''}${c.degree?`<button class="chip gold" data-info="tr:dg_${Math.min(3,c.degree)}">${deg}</button>`:''}${ctChips(c)}${c.outSp?`<span class="chip">Về nhà họ ${esc(c.outSp.sur)}</span>`:''}${c.preg?'<span class="chip red">Mang thai</span>':''}${c.pst&&isOff(c)?`<span class="chip blue">Nhậm chức ${esc(provN(c.pst.p))}${c.pst.fam?(c.pst.fam>1?' · cả nhà theo':' · có vợ chồng theo'):''}</span>`:''}${c.away?`<span class="chip blue">${awayText(c)}</span>`:''}${c.hh!==mainHH()&&!out?`<span class="chip blue">${esc(HH(c.hh).name)}</span>`:''}</div>
   <div class="chips">${realTraits(c).map(traitChip).join('')}${habChips(c)}${viceChips(c)}</div></div></div>
   ${ctNote(c)?`<p class="muted small" style="margin:.3rem 0 .5rem">${ctNote(c)}</p>`:''}
   <div class="dsec tight"><h3>${I('axes','Tính cách')}</h3><div class="chips">${axChips(c)||'<span class="muted small">Chưa có nét nổi bật</span>'}</div></div>
   ${statBlock(c)}
   <div class="kvline">${I('pot','Tiềm năng:')} ${STATS.filter(([k])=>k!=='suc').map(([k,n])=>`${n} ${natOf(c,k)}`).join(' · ')}</div>
   ${awayFromHome(c)?`<div class="kvline">Đang ở <b>${esc(provN(whereP(c)))}</b>${c.pst?' · nhậm chức':c.away&&c.away.type==='follow'?' · theo người nhà':''}</div>`:''}<div class="kvline">Danh vọng <b class="num ${c.fame<0?'down':''}">${fmt(c.fame)}</b>${c.job==='quan'?` · ${I('liem','Liêm chính')} <b class="num">${Math.round(c.liem)}</b>`:''}${c.merit?` · ${I('merit','Chiến công')} <b class="num">${fmt(c.merit)}</b>`:''}</div>
   ${!dead&&!out&&(age(c)>=16||c.purse)?`<div class="kvline">${inMain(c)?`${I('purse','Tiền riêng')} <b class="num">${money(c.purse)}</b>${keepTxt(c)}${(c.anbam||0)>4?' · <span class="down">đang ăn bám</span>':''}${offOf(c)?` · ${esc(CLANOFF[offOf(c)].n)}`:''}`:`${esc(HH(c.hh).name)} · quỹ hộ <b class="num ${HH(c.hh).money<0?'down':''}">${money(HH(c.hh).money)}</b>${c.purse?` · tiền riêng ${money(c.purse)}`:''}`}</div>`:''}
   ${!dead&&!out&&age(c)>=8&&!isHead(c)&&head()?`<div class="kvline">${obeyWord(obey(c))} với gia chủ${(c.oan||0)>=40?' · <span class="down">đang ôm hận</span>':''}${(c.busyUntil||0)>S.t?` · bận việc đến ${dateStr(c.busyUntil)}`:''}</div>`:''}
   ${!dead&&!out&&age(c)>=25?`<div class="kvline">Di chúc: ${esc(willTxt(c).toLowerCase())}${isHead(c)&&c.will&&P(c.will.heir)?` · chọn ${esc(P(c.will.heir).given)} nối nghiệp`:''}</div>`:''}`;
  if(dead||out)return h;
  const th=thoughts(c);
  h+=`<div class="dsec"><h3>${I('think','Tâm tư')}</h3><ul class="think">${th.map(t=>`<li>${t}</li>`).join('')}</ul></div>`;
  h+=`<div class="dsec"><h3>${a>=16&&c.job!=='none'?I('job:'+c.job,esc(jobName(c))):'Nghề nghiệp'}</h3>`;
  if(a>=16&&!['none','vua','huu'].includes(c.job)){
    h+=`${['quan_ngu','noi'].includes(c.job)?'':bar(c.job==='chu'&&JOBS[c.bizFrom]?'Thông thạo '+JOBS[c.bizFrom].n.toLowerCase():'Thông thạo',c.m,120,'mm','mm')}
    <div class="kvline">${c.job==='nong'?'Thu theo mùa vụ':c.job==='chu'?(bizOf(c)&&bizOf(c).last?`Lãi tháng trước ${money(bizOf(c).last.profit)}`:'Lãi cơ sở'):c.job==='hiep'?`Túi riêng ${money(c.purse)}`:`${money(income(c))}/tháng`}${c.job==='quan'?` · lộc ngoài ${money(sideIncome(c))}`:''}${c.job==='quan'&&postOf(c)?` · ${esc(postOf(c).n)}`:''}${c.job==='quan'&&c.qt?` · ${c.qt.f?'phe '+facN(c.qt.f):'không theo phe'}${c.qt.st?` · <b class="down">${QST_N[c.qt.st]}</b>`:''}`:''}${selfEmp(c)?' · tự làm, không có chủ':''}${pieceJob(c)?' · thu theo năng suất':''}</div>`;
    const r=nextReq(c);if(r)h+=`<div class="kvline muted">Lên ${esc(J.lv[c.lv+1].n.toLowerCase())}: ${Object.entries(r).filter(([k])=>k!=='land').map(([k,v])=>k==='m'?`thông thạo ${v}`:k==='fame'?`danh vọng ${v}`:k==='degree'?'đỗ cử nhân':k==='flag'?(v==='thuyen'?'thuyền lớn':'cơ duyên riêng'):`${SN[k]} ${v}`).join(', ')||'thêm ruộng'}</div>`;
  }else if(a<16)h+=`<div class="kvline muted">${a>=6&&c.school!=='nha'?esc((SCHOOL[a<10?1:a<14?2:3][c.school]||{n:'Đi học'}).n):'Còn nhỏ'}${c.appr&&JOBS[c.appr]&&a>=6?' · học nghề '+JOBS[c.appr].n.toLowerCase():''}${Object.keys(c.pre).length?' · đã học việc '+Object.entries(c.pre).map(([j,v])=>`${JOBS[j].n.toLowerCase()} ${Math.round(v)}`).join(', '):''}</div>`;
  else h+=`<div class="kvline muted">${c.job==='huu'?'An hưởng tuổi già':c.flags.jobRetry>S.t?'Trượt phỏng vấn, đợi năm sau':'Chưa có nghề'}</div>`;
  h+=`<div class="acts">`;
  const can=(k,l,dis)=>h+=`<button class="btn small" data-do="${k}" ${dis?'disabled':''}>${l}</button>`;
  if(c.job==='quan_ngu'&&a>=16)can('resign','Xin giải ngũ');
  if(!c.away){
    if(a>=16&&!['quan','vua','nguy','quan_ngu','hiep'].includes(c.job))can('job',c.job==='none'||c.job==='huu'?'Chọn nghề':'Đổi nghề',c.flags.jobRetry>S.t);
    if(c.job==='quan'){can('office','Thăng tiến',(c.flags.noPromoUntil||0)>S.t);can('resign','Từ quan')}
    Object.keys(BIZ).filter(t=>canOwn(c,t)).forEach(t=>{const L0=BIZ[t].lv[0];h+=`<button class="btn small" data-open="${t}" ${canOpenAny(c,L0[1])?'':'disabled'}>Mở ${esc(L0[0].toLowerCase())} · ${money(L0[1],1)}</button>`});
    if(c.job==='huu'&&c.lastJob&&(c.lastM||0)>=30&&!c.writing&&!c.teach)can('teach','Truyền nghề');
    if(c.job==='ngu'&&!c.flags.thuyen)can('boat',`Thuyền lớn · ${money(mm(120),1)}`,S.money<mm(120));
    if(a>=16&&a<=45&&c.g==='nam'&&c.vo>=50&&(S.war||S.recruit>S.t)&&!['quan_ngu','quan','vua'].includes(c.job))can('army','Tòng quân');
    if(a>=16&&c.vo>=80&&!['hiep','quan','vua'].includes(c.job))can('jh','Giang hồ');
    if((a>=18||c.tri>=100)&&!c.exam&&c.degree<3&&!(c.flags.noExam>S.t)&&!['quan','vua'].includes(c.job)&&(c.g!=='nữ'||S.royal||(c.tri>=100&&axv(c,'tv')>=70)))can('exam','Ứng thí'); /* v6.5.4: con gái chỉ dám thi khi trí trên 100 và tham vọng cao */
    if(c.g==='nam'&&a>=16&&a<=40&&c.vo>=60&&!c.vexam&&!c.flags.voDo&&!(c.flags.noVoExam>S.t)&&!['quan','vua','nguy','quan_ngu','hiep'].includes(c.job))can('vexam','Ứng thí võ cử');
    if(c.exam||c.vexam)can('rut','Rút tên');
  }else if(c.away.type==='jh')can('back',`Về nhà${c.purse>0?` · ${money(c.purse,1)}`:''}`);
  h+=`</div>`;
  if(c.exam)h+=`<div class="kvline muted">Kỳ tới: ${EXAM_N[c.exam.stage]}, ${['tháng Tám','tháng Hai','tháng Ba'][c.exam.stage]}</div>`;
  if(c.vexam)h+=`<div class="kvline muted">Kỳ tới: thi võ cử, tháng Chín</div>`;
  if(c.away&&c.away.until)h+=`<div class="kvline muted">Dự về ${dateStr(c.away.until)}</div>`;
  if(c.writing)h+=`<div class="kvline muted">Đang viết sách nghề ${esc(JOBS[c.writing.job].n.toLowerCase())}, xong khoảng ${dateStr(c.writing.until)}</div>`;
  if(c.teach&&P(c.teach.id))h+=`<div class="kvline muted">Đang dạy nghề cho ${esc(P(c.teach.id).given)}, đến ${dateStr(c.teach.until)}</div>`;
  if(c.brk){const bp=BRK100[c.brk.k].find(x=>x.id===c.brk.id);if(bp)h+=`<div class="kvline">Đột phá ${esc(SN[c.brk.k].toLowerCase())}: ${esc(bp.l.toLowerCase())} · tháng ${S.t-c.brk.start}/${c.brk.end-c.brk.start}</div>`}
  h+=`</div>`;
  if(a>=6&&!c.away&&!c.brk){const pf=prefFocus(c);const side=sideInc(c,true);
    h+=`<div class="dsec"><h3>${I('focus','Thời gian rảnh')}</h3><select class="sel" id="focusSel">${Object.entries(FOCUS).filter(([k,F])=>(k!=='giup'||a>=10)&&(!F.side||a>=12)&&(a>=12||['nghi','hoc','vo','ren','cam','phat','giup'].includes(k))).map(([k,F])=>`<option value="${k}" ${c.focus===k?'selected':''} ${affordFocus(c,k)||c.focus===k?'':'disabled'}>${F.n}${k===pf?' (ý thích)':''} · ${F.side?'kiếm thêm':F.cost>0?money(focusCost(c,k))+'/tháng':'miễn phí'}</option>`).join('')}</select>
    <div class="kvline muted">${c.focusUntil&&c.focusUntil>S.t?`Theo sắp đặt, còn giữ khoảng ${c.focusUntil-S.t} tháng rồi quay về ${esc(FOCUS[pf].n.toLowerCase())}`:`Tự chọn theo ý mình. Ép theo việc khác thì giữ được khoảng ${focusHold(c)} tháng`}${side?` · kiếm thêm ${money(side)} tháng này`:FOCUS[c.focus].side?' · tháng này không có việc':''}</div>${loveNow(c)?`<div class="kvline up small">Đang làm việc mình yêu thích: chỉ số lên nhanh hơn 20%, tâm trạng cao hơn 3${FOCUS[c.focus].side?', kiếm thêm hơn 12%':''}.</div>`:''}</div>`}
  if(a>=6&&a<18){const lvl=a<10?1:a<14?2:3;const sc=SCHOOL[lvl][c.school];h+=`<div class="dsec"><h3>Học đường</h3><div class="acts"><span class="kvline">${sc?esc(sc.n)+(sc.fee?` · ${money(sc.fee)}/tháng`:''):'Ở nhà'}</span><button class="btn small" data-do="school">Đổi trường</button></div></div>`}
  if(a>=16){
    h+=`<div class="dsec"><h3>Hôn nhân</h3>`;
    const sp=spouseOf(c);
    if(!sp||!inClan(sp)){const rm=remarryOk(c);h+=`<div class="acts"><span class="kvline">${sp&&sp.dead!=null?'Góa bụa':c.flags.divorced?'Đã ly hôn':'Chưa lập gia thất'}${rm?'':' · giữ tiết theo gia quy'}</span><button class="btn small" data-do="mai" ${S.money<mm(1.5)||c.away||!rm?'disabled':''}>Bà mối · ${money(mm(1.5),1)}</button></div>`}
    else{
      const wife=c.g==='nữ'?c:sp;const hcap=HOMES[HH(wife.hh).home].cap;const room=hhCount(wife.hh)<hcap;const wa=age(wife);const want=c.wantChild||sp.wantChild;
      h+=`<div class="kvline">Bạn đời <button class="lnk" data-sel="${sp.id}">${esc(nameOf(sp))}</button>, ${age(sp)} tuổi · ${loveWord(c.love??50)}</div>${(c.love??50)<35&&head()?`<div class="acts"><button class="btn small ghost" data-do="ly">Phân xử vợ chồng</button></div>`:''}`;
      if(wife.preg)h+=`<div class="kvline">Mang thai${wife.preg.twins?' (song thai?)':''}, dự sinh ${dateStr(wife.preg.due)}</div>`;
      else if(wa<=46){const wc=x=>wantsKid(x)?'muốn có con':'chưa muốn';const hd=head();const cd=(c.flags.kidT||0)>S.t;
        h+=`<div class="kvline">${esc(c.given)} ${wc(c)} · ${esc(sp.given)} ${wc(sp)}${wantsKid(c)&&wantsKid(sp)?' · đang mong con':''}</div>
        <div class="acts">${hd&&!isHead(c)&&!isHead(sp)||hd&&(isHead(c)||isHead(sp))?`<button class="btn small" data-do="kid+" ${cd?'disabled':''}>Khuyên sinh con</button><button class="btn small ghost" data-do="kid-" ${cd?'disabled':''}>Khuyên tạm hoãn</button>`:''}${room?'':`<span class="kvline down">Nhà đã đủ ${hcap} người</span>`}</div>`}
    }
    {const pv=spList(c).filter(x=>x.s.id!==c.spouse);
      if(pv.length)h+=`<div class="kvline muted">Trước đây: ${pv.map(({m,s})=>`<button class="lnk" data-sel="${s.id}">${esc(nameOf(s))}</button> (${spTag(c,m).toLowerCase()}${s.dead!=null?`, mất ${dOf(s.dead).y}`:''})`).join('; ')}</div>`}
    h+=`</div>`;
  }
  const fam=alive().filter(p=>p.id!==c.id&&inClan(p)&&age(p)>=4&&(kin(c,p)!=='ho'||p.hh===c.hh)).sort((x,y)=>relOf(c,y)-relOf(c,x));
  if(fam.length)h+=`<div class="dsec"><h3>${I('rel','Quan hệ')}</h3><div class="rels">${fam.slice(0,12).map(p=>{const v=Math.round(relOf(c,p));return `<button class="relrow" data-sel="${p.id}">${avatarSVG(p,22)}<span>${esc(p.given)}<small>${KIN_N[kin(c,p)]}</small></span><b class="num ${v<0?'down':v>=60?'up':''}">${relWord(v)}</b></button>`}).join('')}</div></div>`;
  const hd=head();const acts=[];
  if(c.id!==S.head&&a>=18&&!c.away&&hd)acts.push(`<button class="btn small ghost" data-do="head" ${(S.headT||0)>S.t?'disabled':''}>Giao quyền gia chủ${(S.headT||0)>S.t?` (${S.headT-S.t} tháng)`:''}</button>`);
  if(c.id!==S.head&&a>=18&&married(c)&&!c.inLaw&&c.hh===mainHH()&&(c.gen||1)>=2)acts.push(`<button class="btn small ghost" data-do="moveout">Cho ra ở riêng</button>`);
  if(c.id!==S.head&&hd&&a>=14)acts.push(`<button class="btn small ghost" data-do="expel">Trục xuất</button>`);
  if(a>=25&&!c.away)acts.push(`<button class="btn small ghost" data-do="will">Lập di chúc</button>`);
  if(c.id===S.head&&c.purse>0)acts.push(`<button class="btn small ghost" data-do="headgop" ${(c.flags.hgT||0)>S.t?'disabled':''}>Góp tiền riêng vào công quỹ</button>`);
  if(c.id===S.head)acts.push(`<button class="btn small ghost" data-do="hkeep">Giữ riêng ${Math.round(hKeep()*100)}% thu nhập</button>`);
  if(c.id!==S.head&&hd&&a>=16&&inMain(c)&&c.purse>=mm(1))acts.push(`<button class="btn small" data-do="gop" ${(c.flags.gopT||0)>S.t?'disabled':''}>Xin góp công quỹ</button>`);
  if(a>=16&&!isHead(c)&&S.people.some(p=>c.parents.includes(p.id)&&p.dead==null&&inClan(p)&&p.purse>mm(1)))acts.push(`<button class="btn small ghost" data-do="xin" ${(c.flags.xinT||0)>S.t?'disabled':''}>Xin cha mẹ giúp tiền</button>`);
  {const vb=!c.away&&viceOf(c).length?viceBy(c):null;
   if(vb)acts.push(`<button class="btn small" data-do="randay" ${(c.flags.vdT||0)>S.t?'disabled':''}>${canPunish(vb,c)?'Răn dạy':'Khuyên can'}${(c.flags.vdT||0)>S.t?` (${c.flags.vdT-S.t} tháng)`:''}</button>`)}
  if(acts.length)h+=`<div class="dsec"><h3>Việc nhà</h3><div class="acts">${acts.join('')}</div></div>`;
  return h;
}
const SH=()=>document.getElementById('sheetO'),SM=()=>document.getElementById('sheetM');
const sheetOpen=()=>SH()&&!SH().hidden;
function openSheet(id){sel=id;const c=P(id);if(!c)return;SM().innerHTML=sheetHTML(c);SH().hidden=false;bindSheet(c);const x=SM().querySelector('[data-close]');if(x)x.focus({preventScroll:true})}
function closeSheet(){SH().hidden=true;SM().innerHTML='';render()}
function refreshSheet(){if(!sheetOpen())return;const c=P(sel);if(!c){closeSheet();return}const y=SM().scrollTop;SM().innerHTML=sheetHTML(c);SM().scrollTop=y;bindSheet(c)}
function bindSheet(c){
  const M2=SM();const done=()=>{render();save()};
  M2.querySelector('[data-close]').onclick=closeSheet;
  SH().onclick=e=>{if(e.target===SH())closeSheet()};
  M2.querySelectorAll('[data-sel]').forEach(b=>b.onclick=()=>{openSheet(b.dataset.sel);render()});
  const fs=M2.querySelector('#focusSel');if(fs)fs.onchange=()=>{setFocus(c,fs.value);done()};
  M2.querySelectorAll('[data-open]').forEach(b=>b.onclick=()=>{openBizPopup(c,b.dataset.open);done()});
  M2.querySelectorAll('[data-do]').forEach(b=>b.onclick=()=>{
    const k=b.dataset.do;const a=age(c);
    if(k==='job')return jobChoice(c,false);
    if(k==='office')return officePopup(c);
    if(k==='resign')return c.job==='quan_ngu'?dischargePopup(c):resignPopup(c);
    if(k==='school')return schoolPopup(c,a<10?1:a<14?2:3);
    if(k==='jh')return jhPopup(c);
    if(k==='mai')return matchmaker(c);
    if(k==='expel')return expelPopup2(c);
    if(k==='moveout')return moveOutPopup(c);
    if(k==='randay'){const v=viceOf(c)[0],vb=viceBy(c);if(v&&vb){closeSheet();return vicePopup(vb,c,v)}}
    if(k==='army')enlist(c,false);
    if(k==='back'){S.money+=Math.max(0,c.purse);log(`${nameOf(c)} rời giang hồ về nhà${c.purse>0?`, mang về ${money(c.purse)}`:''}.`,'gd');c.purse=0;c.away=null;c.job='none';c.lv=0;enqueue('job',c.id)}
    if(k==='boat'){S.money-=mm(120);c.flags.thuyen=1;log(`${nameOf(c)} sắm được thuyền lớn.`,'gd')}
    if(k==='exam')register(c);
    if(k==='vexam')registerVo(c);
    if(k==='rut'){closeSheet();return withdrawPopup(c)}
    if(k==='kid+'||k==='kid-')persuadeKids(c,k==='kid+'?30:-30);
    if(k==='head'){closeSheet();return handoverPopup(c)}
    if(k==='headgop'){closeSheet();return headGopPopup(c)}
    if(k==='hkeep'){S.hkeep=HKEEP[(HKEEP.indexOf(hKeep())+1)%HKEEP.length]}
    if(k==='gop'){closeSheet();return askGopPopup(c)}
    if(k==='xin'){closeSheet();return askParentPopup(c)}
    if(k==='teach'){closeSheet();return teachPopup(c)}
    if(k==='will'){closeSheet();return willPopup(c)}
    if(k==='ly'){const sp=spouseOf(c);closeSheet();return lyPopup(head(),{a:c.id,b:sp.id})}
    done();
  });
}
let chiF='';
/* v6.4.1.1: thu nhỏ gia phả (cả bản thường lẫn admin), nhớ mức thu nhỏ trên máy */
let treeZ=(()=>{const v=+lsGet('bnthegia.treeZoom');return v>=0.3&&v<=1.5?v:1})();
const setTreeZ=v=>{treeZ=Math.round(clamp(v,0.3,1.5)*20)/20;lsSet('bnthegia.treeZoom',String(treeZ))};
function pageGiapha(){
  if(chiF&&(!S.hh[chiF]||!alive().some(p=>p.hh===chiF)))chiF='';
  const vis=chiF?(p=>p.hh===chiF&&inClan(p)):null;
  let roots;
  if(!vis)roots=S.people.filter(p=>!p.parents.length&&!p.inLaw&&p.left!=='expelled');
  else{ /* chỉ người đang sống của chi được chọn; mỗi người không còn cha mẹ trong chi (hoặc góa không còn ai cùng chi) là một gốc */
    const inV=S.people.filter(vis);
    roots=inV.filter(p=>p.inLaw?!spList(p).some(x=>vis(x.s)):!p.parents.some(id=>{const q=P(id);return q&&vis(q)}))}
  const br=branches();
  return `${br.length?`<div class="chif"><label for="chiF">Xem chi</label><select class="sel" id="chiF"><option value="">Cả họ</option><option value="${mainHH()}" ${chiF===mainHH()?'selected':''}>Nhà chính</option>${br.map(id=>`<option value="${id}" ${chiF===id?'selected':''}>${esc(S.hh[id].name)}</option>`).join('')}</select></div>`:''}<section class="card treecard"><div class="tzoom" role="group" aria-label="Thu nhỏ gia phả"><button class="btn small ghost" data-tz="-" aria-label="Thu nhỏ">−</button><span class="num">${Math.round(treeZ*100)}%</span><button class="btn small ghost" data-tz="+" aria-label="Phóng to">+</button><button class="btn small ghost" data-tz="fit">Vừa khung</button>${treeZ!==1?'<button class="btn small ghost" data-tz="1">100%</button>':''}</div><div class="treescroll"><div class="tree" style="zoom:${treeZ}"><ul>${roots.map(r=>treeHTML(r,'',vis)).join('')}</ul></div></div>
   <div class="legend"><span><i class="lg hp"></i>sức khỏe</span><span><i class="lg md"></i>tâm trạng</span><span><i class="lg hd"></i>gia chủ</span><span class="muted">Bấm vào người để xem</span></div></section>`;
}
/* ================= bản đồ ================= */
const REG_SHAPE={
  bac:'M120 18 L380 10 L420 70 L360 120 L250 130 L150 118 L95 80 Z',
  tay:'M20 95 L95 80 L150 118 L160 200 L130 280 L60 300 L15 230 Z',
  trung:'M150 118 L250 130 L360 120 L345 210 L300 260 L190 262 L130 280 L160 200 Z',
  dong:'M360 120 L420 70 L480 120 L470 230 L420 300 L345 290 L300 260 L345 210 Z',
  nam:'M130 280 L190 262 L300 260 L345 290 L420 300 L380 370 L250 392 L120 365 L60 300 Z'};
function mapSVGOld(selR,opts){
  const home=S?S.region:null;
  return `<svg viewBox="0 0 500 400" class="mapsvg" role="img" aria-label="Bản đồ năm vùng">
   <rect x="0" y="0" width="500" height="400" class="sea"/>
   ${Object.entries(REG_SHAPE).map(([k,d])=>`<path d="${d}" class="rg rg-${k} ${k===selR?'on':''} ${k===home?'home':''}" data-reg="${k}" tabindex="0" role="button" aria-label="${REGIONS[k].n}"/>`).join('')}
   ${Object.keys(REG_SHAPE).map(k=>{const R0=REGIONS[k];const x=R0.x*5,y=R0.y*4;return `<g class="rl" pointer-events="none"><text x="${x}" y="${y}" text-anchor="middle">${R0.n}</text>${k===home?`<text x="${x}" y="${y+16}" text-anchor="middle" class="hm">★ quê nhà</text>`:''}</g>`}).join('')}
  </svg>`;
}
let mapSel=null;
function pageBandoOld(){
  const h=S.region||'trung';const k=mapSel||h;const R0=REGIONS[k];const RT=routes();const rt=RT.find(r=>r.reg===k);
  const goods=Object.keys(GOODS);
  return `<div class="grid2"><section class="card"><div class="mapwrap">${mapSVG(k)}</div></section>
   <section class="card"><span class="eyebrow">${k===h?'Quê nhà':rt?`Cách ${rt.mo} tháng đường · rủi ro ${Math.round(rt.risk*100)}% · cần thông thạo ${rt.mm}`:''}</span><h2>${R0.n}</h2><p class="kvline">${esc(R0.d)}</p><p class="kvline">Sản vật: <b>${esc(R0.spec)}</b></p>
   <div class="ptab"><div class="ph"><span>Hàng</span><span>Giá ở đây</span>${k!==h?'<span>So với quê</span>':''}</div>${goods.map(g=>{const v=R0.p[g];const ratio=v/REGIONS[h].p[g];
     return `<div><span>${GOODS[g].n}</span><span class="num">${money(GOODS[g].p*v*mk(g))}</span>${k!==h?`<span class="num ${ratio>=1.12?'up':ratio<=0.88?'down':''}">×${ratio.toFixed(2)}</span>`:''}</div>`}).join('')}</div>
   ${k!==h?'<p class="kvline muted">Xanh: mang tới bán được giá. Đỏ: mua ở đây chở về rẻ.</p>':''}</section></div>`;
}
/* ================= gia tộc ================= */
function fameWhy(){const row=(o,lb)=>{const e=Object.entries(o||{}).filter(([k,v])=>Math.abs(v)>=0.5).sort((x,y)=>x[1]-y[1]);if(!e.length)return '';const t=e.reduce((s,[k,v])=>s+v,0);return `<small class="muted">${lb}: ${t>=0?'+':''}${Math.round(t)}</small><br>`+e.map(([k,v])=>`<small>${esc(k)}: <b class="num ${v<0?'down':'up'}">${v>=0?'+':''}${Math.round(v)}</b></small>`).join('<br>')+'<br>'};return row(S.fw,'Năm nay')+row(S.fwPrev,'Năm ngoái')||'<small class="muted">Chưa có biến động</small>'}
function pageGiatoc(){
  const ti=tierIdx();const nx=TIERS[ti+1];const titled=alive().filter(p=>p.tuoc);const wait=(S.ruleT||-99)+12-S.t;
  return `<div class="grid2"><section class="card"><span class="eyebrow">${I('tier','Gia thế')}</span><h2>${tierName()}</h2>
   <dl class="kv"><dt>Điểm gia thế</dt><dd class="num">${fmt(tierScore())}${nx?` / ${fmt(nx[1])}`:''}</dd><dt>${I('fame','Danh vọng')}</dt><dd class="num">${fmt(S.fame)}</dd><dt>Tăng giảm</dt><dd>${fameWhy()}</dd><dt>Tài sản</dt><dd class="num">${money(wealth())}</dd>
   <dt>${I('hung','Hưng thịnh')}</dt><dd class="num">${Math.round(S.hung)}</dd><dt>${I('on','Ổn định')}</dt><dd class="num">${Math.round(S.on)}</dd><dt>${I('duyen','Cơ duyên gia tộc')}</dt><dd class="num">${Math.round(famLuck())}</dd>
   <dt>Tước vị</dt><dd>${titled.length?titled.map(p=>`${esc(nameOf(p))}: ${TUOC[p.tuoc]}`).join(', '):'Chưa có'}</dd>
   ${(()=>{const cg=alive().filter(p=>inClan(p)&&(p.cong||0)>0);return cg.length?`<dt>Công trạng</dt><dd>${cg.map(p=>`${esc(p.given)} ${Math.round(p.cong)}${(p.tuoc||0)<5?'/'+TUOC_CONG[(p.tuoc||0)+1]:''}`).join(', ')}<br><small class="muted">Lập công được ghi công; đủ mốc mới được phong tước.</small></dd>`:''})()}
   ${nx&&TIER_GATE[ti+1]&&!S.royal?`<dt>Lên ${esc(nx[0])}</dt><dd><small>Ngoài điểm gia thế còn cần ${TIER_GATE[ti+1].txt}.</small></dd>`:''}</dl></section>
   ${perksCard()}
   ${thoiTheCard()}
   ${usCard()}
   ${courtCard()}
   <section class="card"><span class="eyebrow">Quyền quyết định</span><h2>Ai do gia chủ trực tiếp quyết</h2><p class="kvline muted">Những người còn lại tự quyết theo tính, việc nhỏ ghi vào thư cuối năm, việc lớn mới báo.</p><div class="seg">${CTRL_N.map((n,i)=>`<button class="btn small" data-ctrl="${i}" aria-pressed="${ctrlLv()===i}">${n}</button>`).join('')}</div></section>
   ${S.fame>=120&&head()?`<section class="card"><span class="eyebrow">Danh vọng</span><h2>Kêu gọi</h2><p class="kvline">${(S.kgT||0)>S.t?`Vừa kêu gọi, ${S.kgT-S.t} tháng nữa mới nên làm lại.`:'Nhà có tiếng, một lời kêu gọi người trong vùng sẵn lòng góp sức.'}</p><div class="acts"><button class="btn small" data-kg ${(S.kgT||0)>S.t?'disabled':''}>Kêu gọi</button></div></section>`:''}
   <section class="card" style="grid-column:1/-1"><span class="eyebrow">${I('rules','Gia quy')} · ${S.rules.length}/${ruleSlots()}</span><h2>${wait>0?`Thêm điều mới sau ${wait} tháng`:'Gia quy'}</h2>
   <p class="kvline">Uy gia pháp: <b>${uyWord()}</b> <small class="muted">· thi hành nghiêm thì tăng, tha nhiều thì giảm; uy càng cao người nhà càng ít dám phạm, vi phạm càng dễ lộ</small></p>
   ${S.rules.length?`<div class="rulegrid">${S.rules.map(k=>`<div class="btn" aria-pressed="true"><strong>✓ ${RULES[k].n}</strong><small>${RULES[k].d}</small><span><button class="btn small ghost" data-drop="${k}">Bỏ</button></span></div>`).join('')}</div>`:'<p class="kvline muted">Chưa có điều nào.</p>'}
   <details class="more"><summary>Thêm điều mới</summary><div class="rulegrid">${Object.entries(RULES).filter(([k])=>!S.rules.includes(k)).sort((a,b)=>['tang','phat','truc','tu'].indexOf(ruleG(a[0]))-['tang','phat','truc','tu'].indexOf(ruleG(b[0]))).map(([k,R0])=>{const why=ruleWhy(k);return `<button class="btn" data-rule="${k}" ${why?'disabled':''}><strong>${R0.n}</strong><small>${R0.d}${why?` · <b>${esc(why)}</b>`:''}</small></button>`}).join('')}</div></details></section>
   <section class="card"><span class="eyebrow">Thời cuộc</span><ul class="plain">
   <li>${S.war?`Chiến sự: ${esc(S.war.n)}, còn khoảng ${Math.max(0,S.war.until-S.t)} tháng.`:'Thiên hạ thái bình.'}</li>
   ${S.recruit>S.t?`<li>Đang tuyển quân, còn ${S.recruit-S.t} tháng.</li>`:''}
   <li>${S.epi?'Dịch bệnh đang hoành hành.':'Không có dịch.'}</li>
   ${S.disaster?`<li>${DIS[S.disaster.k]?DIS[S.disaster.k].n:'Thiên tai'}, mùa màng thất bát.</li>`:''}</ul></section>
   <section class="card" style="grid-column:1/-1"><span class="eyebrow">Thành viên · ${alive().length} người</span><div class="staff">${alive().sort((a,b)=>(b.id===S.head)-(a.id===S.head)||earnOf(b,true)-earnOf(a,true)||b.fame-a.fame).map(p=>{const e=age(p)>=16?Math.round(earnOf(p,true)):0;const b=p.job==='chu'&&bizOf(p)&&bizOf(p).last?bizOf(p).last.profit:null;return `<button class="srow" data-sel="${p.id}"><div style="display:flex;gap:8px;align-items:center">${avatarSVG(p,28)}<span><b>${esc(nameOf(p))}</b><small>${relation(p)} · ${age(p)} tuổi · ${age(p)<16?(p.school!=='nha'&&age(p)>=6?'đi học':'còn nhỏ'):esc(jobName(p))}${p.hh!==mainHH()?' · '+esc(HH(p.hh).name):''}</small></span></div><span class="num" style="text-align:right"><small>${b!=null?'lãi cơ sở '+money(b):e?'kiếm '+money(e)+'/tháng':'không thu nhập'}</small><small>riêng ${money(p.purse||0)} · danh ${fmt(p.fame)}</small></span></button>`}).join('')}</div></section></div>`;
}
function pageNhatky(){
  return `<section class="card log"><ol>${S.log.slice(0,250).map(l=>`<li class="${l.c}"><time>${l.t}</time>${esc(l.m)}</li>`).join('')}</ol>
</section>`;
}

/* ================= cơ ngơi ================= */
function pageCosngoi(){
  ensureEcon();
  const main=mainHH();const exp=EXPECT[tierIdx()];const est=econEst();const L=S.flow||est;
  const sum=o=>Object.values(o||{}).reduce((a,b)=>a+b,0);
  /* v6.4.1.3: dòng thói quen ghi rõ ai, thói quen gì (gồm cả sở thích tốn tiền như sưu tầm, thuốc bổ, không chỉ tật xấu) */
  const habWho=()=>alive().filter(p=>inClan(p)&&clanKeeps(p)&&p.habits.some(x=>HABITS[x]&&HABITS[x].cost)).map(p=>`${esc(p.given)}: ${p.habits.filter(x=>HABITS[x]&&HABITS[x].cost).map(x=>HABITS[x].n.toLowerCase()+(isVice(x)?' (tật xấu)':'')).join(', ')}`).join('; ');
  const rows=(o,cls)=>Object.entries(o||{}).filter(([,v])=>v).map(([k,v])=>`<dt>${FLOWN[k]||k}${k==='thoi'?`<br><small class="muted">${habWho()||'không rõ'}</small>`:''}</dt><dd class="num ${cls}">${money(v)}</dd>`).join('');
  const h=S.hh[main];const H=HOMES[h.home];const nx=HOMES[h.home+1];const e=hhExpense(main);
  const mainCard=`<section class="card"><span class="eyebrow">Nhà chính · gia tộc lo</span><h2>${esc(h.name)} · ${H.n}</h2><div class="homeart">${homeSVG(h.home)}</div>
    <p class="kvline" style="margin-top:8px">${hhCount(main)}/${H.cap} người · bảo dưỡng ${money(H.upkeep)}/tháng · ăn tiêu cả nhà ${money(e.total)}/tháng</p>
    <div class="field" style="margin-top:8px"><label for="life_${main}">Mức sống</label><select class="sel" id="life_${main}" data-life="${main}">${LIFE.map(([n,c],i)=>`<option value="${i}" ${h.life===i?'selected':''}>${n} · ${money(c)}/người/tháng</option>`).join('')}</select></div>
    ${h.life<exp?`<p class="kvline down">Dưới mức ${LIFE[exp][0].toLowerCase()} của gia thế, cả nhà mất mặt</p>`:''}
    ${nx?`<button class="btn" data-build="${main}" style="margin-top:8px;width:100%" ${S.money<nx.cost?'disabled':''}><strong>Xây ${nx.n}</strong><small>${money(nx.cost)} công quỹ · ở được ${nx.cap} người · danh vọng +${nx.fame}</small></button>`:''}</section>`;
  const fund=`<section class="card"><span class="eyebrow">${I('money','Công quỹ')}</span><h2>${money(S.money)}</h2>
    <p class="kvline muted">Tháng ${S.flow?'trước':'tới (ước tính)'}: ${L.net!=null?`<b class="num ${L.net<0?'down':'up'}">${L.net>=0?'+':''}${money(L.net)}</b>`:''}</p>
    <dl class="kv">${rows(L.in,'up')}<dt><b>Tổng thu</b></dt><dd class="num"><b>${money(sum(L.in))}</b></dd>${rows(L.out,'down')}<dt><b>Tổng chi</b></dt><dd class="num"><b>${money(sum(L.out))}</b></dd></dl>
    <div class="field" style="margin-top:8px"><label>${I('gop','Người đi làm góp về công quỹ')}</label><div class="seg wrap">${GOP.map(([v,n,t])=>`<button class="btn" data-gop="${v}" aria-pressed="${S.gop===v}">${n}${t?` <small class="${t<0?'down':'up'}">vui ${t>0?'+':''}${t}</small>`:''}</button>`).join('')}</div></div></section>`;
  const offs=clanFormed()?`<section class="card"><span class="eyebrow">${I('coff','Chức trong tộc')}</span><h2>Người lo việc chung</h2><div class="staff">${Object.entries(CLANOFF).map(([k,O0])=>{const p=offHolder(k);const [st,v]=O0.need;
      const cands=alive().filter(x=>offOk(x,k)&&!offOf(x));
      return `<div class="srow"><div><b>${O0.n}</b> · lương ${money(mm(O0.pay))}/tháng<small>${esc(O0.d)} Cần ${st==='ql'?'Quản trị':SN[st]} ${v}.</small></div>
      <select class="sel" data-coff="${k}" style="max-width:170px"><option value="">${p?'Thôi chức':'Để trống'}</option>${p?`<option value="${p.id}" selected>${esc(p.given)}</option>`:''}${cands.map(x=>`<option value="${x.id}">${esc(x.given)} · ${st==='ql'?Math.round(skv(x,'ql')):Math.round(x[st])}</option>`).join('')}</select></div>`}).join('')}</div></section>`:'';
  const br=branches().map(id=>{const b=S.hh[id];const Ld=branchLeader(id);const m=alive().filter(p=>p.hh===id&&inClan(p));const mood=m.length?Math.round(m.reduce((s,p)=>s+p.tam,0)/m.length):0;
    return `<section class="card"><span class="eyebrow">Chi phái · tự lo</span><h2>${esc(b.name)} · ${HOMES[b.home].n}</h2>
     <dl class="kv"><dt>Trưởng chi</dt><dd>${Ld?`<button class="lnk" data-sel="${Ld.id}">${esc(nameOf(Ld))}</button>`:'—'}</dd><dt>Số người</dt><dd class="num">${m.length}</dd><dt>Quỹ hộ</dt><dd class="num ${b.money<0?'down':''}">${money(b.money)}</dd><dt>Mức sống</dt><dd>${LIFE[b.life][0]}</dd><dt>Ăn tiêu</dt><dd class="num">${money(hhExpense(id).total)}/tháng</dd><dt>Tâm trạng</dt><dd class="num">${mood}</dd>${b.debt?`<dt>Nợ công quỹ</dt><dd class="num down">${money(b.debt)}</dd>`:''}</dl>
     <p class="kvline">Ruộng của chi: <b class="num">${fmt(b.land||0)} mẫu</b>${m.some(p=>p.job==='nong')?' · tá điền của chi làm ruộng chi, thiếu ruộng thì đi cày thuê':''}</p>
     <p class="kvline muted">Chi phái tự quyết mức sống, tự xây nhà bằng quỹ hộ, không to hơn nhà chính, tự mua ruộng khi dư dả.</p></section>`}).join('');
  const vac=vacantHomes().map(id=>{const b=S.hh[id];const o=P(b.owner);return `<li>${esc(b.name)} · ${HOMES[b.home].n.toLowerCase()}${o&&o.dead==null?` · của ${esc(o.given)}`:''} · ${b.rent?'đang cho thuê':'để trống'}</li>`}).join('');
  /* v6.4.1.1: tàng thư chia theo hộ */
  const bkHH=[...new Set(bookSweep().map(b=>b.hh))].sort((a,b)=>(b===mainHH())-(a===mainHH()));
  const books=bkHH.map(id=>`<h3>Tàng thư · ${id===mainHH()?'nhà chính':esc(S.hh[id].name)}</h3><ul class="plain">${booksOf(id).map(b=>`<li>"${esc(b.n)}" · nghề ${esc(JOBS[b.job].n.toLowerCase())} · người trong ${id===mainHH()?'nhà chính':'chi'} theo nghề khởi đầu thông thạo ${Math.round(b.lv*0.4)}</li>`).join('')}</ul>`).join('');
  const extra=vac||books?`<section class="card"><span class="eyebrow">Của để lại</span>${vac?`<h3>Nhà để trống</h3><ul class="plain">${vac}</ul>`:''}${books}</section>`:'';
  return `<div class="grid2">${fund}${mainCard}${offs}${br}${extra}</div>`;
}

/* ================= ruộng vườn ================= */
function pageRuong(){
  const F=S.farm;const area=farmArea();const lab=farmLabor();const al=allocated();
  const crops=Object.entries(CROPS).filter(([k])=>F.unlock.includes(k));
  return `<div class="grid2"><section class="card"><span class="eyebrow">Ruộng đất</span><h2>${fmt(area)} mẫu đang canh tác</h2>
   <dl class="kv"><dt>Ruộng nhà</dt><dd class="num">${fmt(F.own)} mẫu</dd><dt>Ruộng thuê (nộp nửa hoa lợi)</dt><dd class="num">${fmt(F.rent)} mẫu</dd><dt>Phát canh thu tô</dt><dd class="num">${fmt(F.lease||0)} mẫu ruộng nhà${F.fief?` + ${fmt(F.fief)} mẫu điền trang`:''} · ${money(toIncome())}/tháng</dd><dt>Sức người</dt><dd class="num ${lab<al?'down':''}">${fmt(lab)} / ${fmt(al)} mẫu</dd><dt>Giá một mẫu</dt><dd class="num">${money(landCost())}</dd></dl>
   <div class="acts" style="margin-top:8px"><button class="btn small" data-farm="buy" ${S.money<landCost()?'disabled':''}>Mua 1 mẫu</button><button class="btn small" data-farm="sell" ${F.own-(F.lease||0)<1?'disabled':''}>Bán 1 mẫu · ${money(landCost()*0.8,1)}</button>
   <button class="btn small" data-farm="rent+" ${F.rent>=20+F.own*2?'disabled':''}>Thuê thêm 1 mẫu</button><button class="btn small" data-farm="rent-" ${F.rent<1?'disabled':''}>Trả 1 mẫu thuê</button></div>
   <div class="acts" style="margin-top:6px"><button class="btn small" data-farm="hire+">Thuê 1 người làm (${money(450)}/tháng)</button><button class="btn small" data-farm="hire-" ${F.hired<1?'disabled':''}>Bớt 1 người</button><span class="note" style="align-self:center">Đang thuê ${F.hired} người</span></div>
   <div class="acts" style="margin-top:6px"><button class="btn small" data-farm="lease+" ${(F.own-(F.lease||0))<1?'disabled':''}>Phát canh 1 mẫu</button><button class="btn small" data-farm="lease-" ${(F.lease||0)<1?'disabled':''}>Thu về tự cày 1 mẫu</button></div>
   <div class="field" style="margin-top:8px"><label>Mức tô</label><div class="seg wrap">${TOLV.map(([n,r,f,d],i)=>`<button class="btn" data-to="${i}" aria-pressed="${(F.to??1)===i}">${n} ${Math.round(r*100)}%</button>`).join('')}</div><p class="kvline muted">${esc(TOLV[F.to??1][3])}. Tự cày thì lời nhiều nhất nhưng cần người; thuê công nhật thì trả tiền mỗi tháng; phát canh thì không tốn công, chỉ thu tô.</p></div>
   <div class="field" style="margin-top:8px"><label>Khi thu hoạch</label><div class="seg"><button class="btn" data-farm="sellnow" aria-pressed="${!F.store}">Bán ngay ở chợ</button><button class="btn" data-farm="store" aria-pressed="${F.store}">Nhập kho gia tộc</button></div></div></section>
   <section class="card"><span class="eyebrow">Gieo trồng</span><h2>Đã chia ${fmt(al)}/${fmt(area)} mẫu</h2>
   <div class="crops">${crops.map(([k,C])=>{const pr=mk(C.g);return `<div class="crop"><div><b>${C.n}</b> <span class="chip ${pr>1.1?'gold':pr<0.9?'red':''}">giá ×${pr.toFixed(2)}</span><small>Thu tháng ${C.harv.join(', ')} · ~${money(C.y*pr*(REG().crop[k]||1))}/mẫu/năm · rủi ro ${Math.round(C.risk*100)}%</small></div>
     <div class="stepper"><button class="btn small" data-crop="${k}" data-d="-1" ${(F.alloc[k]||0)<1?'disabled':''} aria-label="Bớt">−</button><b class="num">${F.alloc[k]||0}</b><button class="btn small" data-crop="${k}" data-d="1" ${al>=area?'disabled':''} aria-label="Thêm">+</button></div></div>`}).join('')}</div></section></div>`;
}

/* ================= kinh doanh ================= */
/* v6.3.3: pageKinhdoanh và bizDetail nằm trong w633_core */
function hirePopup(bid,role){
  const b=S.biz.find(x=>x.id===bid);if(!b)return;
  const back=()=>{closeModal();setTimeout(()=>{if(!modalOpen()&&S.biz.includes(b))bizDetail(bid)},10)};
  openModal(`<span class="eyebrow">Tuyển người</span><h2>${esc(ROLES[role].n)} cho ${esc(BIZ[b.type].lv[b.lv][0].toLowerCase())}</h2>
  <p class="muted">Tiền công tùy ngành, vị trí và tay nghề. Cần ${Object.entries(ROLES[role].req).map(([k,v])=>`${ROLE_ST[k]} ${v}`).join(', ')}. Ứng viên mới vào mỗi quý. Người lớn tuổi, sức yếu thì làm kém đi và dễ ốm đau.</p>
  <div class="choices">${S.cand.map((st,i)=>`<button class="btn" data-c="${i}"><strong>${esc(st.n)} · ${stAge(st)} tuổi · hiệu quả ${Math.round(staffEff(st,role)*100)}% · ${money(wageFor(st,b,role))}/tháng</strong><small class="num">${esc(stHealthTxt(st))} · Thông tuệ ${st.tt} · Sức mạnh ${st.sm} · Khéo léo ${st.kl} · Tiềm lực ${st.tl} · thông thạo ${st.m}</small></button>`).join('')||'<p class="note">Hết ứng viên, đợi quý sau.</p>'}<button class="btn ghost" data-x>Thôi</button></div>`);
  M.querySelectorAll('[data-c]').forEach(x=>x.onclick=()=>{const st=S.cand.splice(+x.dataset.c,1)[0];st.role=role;st.wage=wageFor(st,b,role);st.since=S.t;b.staff.push(st);log(`Thuê ${st.n} làm ${ROLES[role].n.toLowerCase()}.`);back()});
  M.querySelector('[data-x]').onclick=back;
}

/* ================= kho, buôn bán ================= */
function pageKho(){
  const items=Object.entries(S.kho).filter(([,v])=>v>=1);
  return `<div class="grid2"><section class="card"><span class="eyebrow">Kho gia tộc</span><h2>Hàng trong kho</h2>
   ${items.length?`<div class="staff">${items.map(([g,v])=>`<div class="srow"><div><b>${GOODS[g].n}</b> · ${fmt(v)} ${GOODS[g].u}<small>Giá chợ nhà ${money(priceOf(g))}/${GOODS[g].u} · cả kho khoảng ${money(v*priceOf(g))}</small></div><div class="acts"><button class="btn small" data-sell="${g}:0.5">Bán nửa</button><button class="btn small" data-sell="${g}:1">Bán hết</button></div></div>`).join('')}</div>`:'<p class="kvline muted">Kho trống.</p>'}</section>
   <section class="card"><span class="eyebrow">Thị trường</span><h2>Giá chợ ${REGIONS[S.region||'trung'].n}</h2><div class="mkt">${Object.entries(GOODS).map(([g,G0])=>{const v=mk(g);return `<div><b>${G0.n}</b><span class="num ${v>1.1?'up':v<0.9?'down':''}">${money(priceOf(g))}/${G0.u} · ×${v.toFixed(2)}</span></div>`}).join('')}</div></section>
   <section class="card"><span class="eyebrow">Đi buôn</span><h2>Chuyến buôn</h2>
   ${S.trips.length?S.trips.map(t=>`<p class="note">${t.cid&&P(t.cid)?esc(nameOf(P(t.cid))):'Lái buôn thuê'} chở ${fmt(t.qty)} ${GOODS[t.good].u} ${GOODS[t.good].n.toLowerCase()} đi ${esc((routes()[t.route]||routes()[0]).n)}, dự về ${dateStr(t.until)}.</p>`).join(''):'<p class="kvline muted">Chưa có chuyến nào.</p>'}
   <button class="btn primary" data-trip style="margin-top:8px" ${S.trips.length>=maxTrips()?'disabled':''}>Tổ chức chuyến buôn (${S.trips.length}/${maxTrips()} chuyến)</button></section></div>`;
}

/* ================= quan trường ================= */
let qProv='',qKind='',qOpenB=null,qOpenT='';
function pageQuan(){
  const mine=alive().filter(p=>inPost(p));
  const d=S.dyn||(S.dyn=mkDyn(S.t));
  const TAG={hoc:'Giáo dục',an:'Hình án',dan:'Dân chính',thue:'Thuế khóa',giam:'Giám sát',kinh:'Triều đình',vo:'Quân vụ',y:'Y thuật'};
  const yr=Math.floor((S.t-d.from)/12)+1;
  const UN=DX.UNITS;
  const inProv=(k)=>{if(!qProv)return true;const w=seatWh(k);return !!w&&w.p===qProv};
  const own=new Set(mine.map(p=>p.seat).filter(Boolean));
  const mineHtml=mine.length?mine.map(p=>{const k=p.seat;const left=p.postT!=null?Math.max(0,36-(S.t-p.postT)):null;
    const fol=followers(p);
    return `<div class="off mine"><div><b>${esc(nameOf(p))}</b> · ${esc(k&&seatTm(k)?seatName(k):jobName(p))}<small>${p.job==='quan'?rankTxt(p):p.job==='nguy'?(k&&seatTm(k)?phTxt(seatTm(k)):'Ngự y'):ARMY[p.lv][0]}${k&&seatWh(k)?' · ở '+esc(provN(seatWh(k).p)):''}${left!=null&&p.job!=='nguy'?` · còn ${left} tháng nhiệm kỳ`:''}</small></div><small class="who2">${p.pst?(p.pst.fam?`Có ${fol.map(x=>esc(x.given)).join(', ')||'người nhà'} theo`:'Đi một mình'):(p.seat?'Không phải dời nhà':'Chưa có ghế riêng')}</small></div>`}).join(''):'<p class="kvline muted">Nhà chưa có ai làm quan. Đỗ thi Đình thì được bổ chức, người đi lính lên đến Bách hộ thì được lĩnh chức võ.</p>';
  const bacs=[];for(let b=17;b>=0;b--)bacs.push(b);
  const rows=bacs.map(b=>{
    const r=b>>1,sg=b&1;
    const ts=Object.keys(OFFICES).filter(id=>{const T=OFFICES[id];if(T.r*2+T.sg!==b)return false;if(qKind==='van'&&T.mil)return false;if(qKind==='vo'&&!T.mil)return false;
      if(qProv&&!T.units.some(u=>UN[u]&&UN[u].p===qProv))return false;return true});
    if(!ts.length)return '';
    let seatsN=0,ownN=0;
    const ents=ts.map(id=>{const T=OFFICES[id];const ks=DX.seatKeys(id).filter(inProv);seatsN+=ks.length;const on=ks.filter(k=>own.has(k)).length;ownN+=on;return {id,T,ks,on}});
    const open=qOpenB===b||(qOpenB==null&&ownN>0)||(qOpenB==null&&b===17&&0);
    const head=`<button class="btn small ghost qb" data-qb="${b}"><b>${sg?'Chánh':'Tòng'} ${RANKS[r].toLowerCase()}</b> · ${ts.length} chức · ${seatsN} ghế${ownN?` · nhà giữ ${ownN}`:''} · bổng gốc ${money(SALARY[r])}/tháng ${open?'▲':'▼'}</button>`;
    if(!open)return `<div class="qgrp">${head}</div>`;
    return `<div class="qgrp">${head}${ents.map(({id,T,ks,on})=>{
      const isO=qOpenT===id;
      let seatList='';
      if(isO){seatList=`<div class="qseats">${ks.slice(0,80).map(k=>{const st=offState(k);const hp=st.holder?P(st.holder):null;
        return `<div class="srow2"><span>${esc(seatName(k))}</span><small>${hp?`Người nhà: <b>${esc(nameOf(hp))}</b>`:st.vac?'<b class="up">Đang trống</b>':`${esc(st.n)} · ${st.age} tuổi · năng lực ${st.ab}${st.liem<35?' · tiếng tham':''}`}</small></div>`}).join('')}${ks.length>80?`<small class="muted">Và ${ks.length-80} ghế nữa.</small>`:''}</div>`}
      const pay=T.mil?`Quân bổng khoảng ${money(ARMY[T.ar][1]*0.7*T.mul)}`:`Bổng ${money(SALARY[T.r]*T.mul)}, lộc ngoài ×${T.side}`;
      return `<div class="off ${on?'mine':''}"><div><b>${esc(T.n)}</b> <span class="chip">${TAG[T.tag]}</span><small>${esc(T.d)} ${pay}. Cần ${Object.entries(T.req).map(([k,v])=>`${SN[k]} ${v}`).join(', ')}${T.mil?`, đang ở bậc ${ARMY[T.ar][0]}`:''}. ${esc(T.g||'')}</small>${seatList}</div>
       <div class="who2"><small>${ks.length} ghế${on?` · nhà giữ ${on}`:''}</small><br><button class="btn small ghost" data-qt="${id}">${isO?'Gấp lại':'Xem ghế'}</button></div></div>`}).join('')}</div>`}).join('');
  const provs=DX.REALM;
  return `<section class="card"><span class="eyebrow">Quan trường</span><h2>Quan chế triều ${esc(d.name)}</h2>
   <p class="kvline">Niên hiệu <b>${esc(d.era)}</b> · Hoàng Đế <b>${esc(d.emp)}</b>, năm thứ ${yr}${d.n>1?` (đời vua thứ ${d.n} của triều)`:', vị vua khai quốc'}.</p>
   <h3>Người nhà trong quan trường</h3><div class="offs">${mineHtml}</div></section>
   <section class="card"><span class="eyebrow">Các chức và ghế</span><h2>Bảng chức vị</h2>
   <p class="kvline muted">Mỗi chức có nhiều ghế đặt ở nhiều nơi, mỗi ghế chỉ một người ngồi. Người cùng gia tộc không ngồi chung nha môn hay chung huyện, và không làm quan ở quê nhà (lệ hồi tị).</p>
   <div class="acts"><select class="sel" id="qKind"><option value="" ${qKind===''?'selected':''}>Văn và võ</option><option value="van" ${qKind==='van'?'selected':''}>Quan văn</option><option value="vo" ${qKind==='vo'?'selected':''}>Quan võ</option></select>
   <select class="sel" id="qProv"><option value="">Mọi nơi</option>${provs.map(p=>`<option value="${p}" ${qProv===p?'selected':''}>${esc(provN(p))}</option>`).join('')}</select></div>
   <div class="offs">${rows}</div></section>`;
}

/* ================= vẽ lại ================= */
function render(){
  if(!S||DRY)return;
  unlockPages();
  if(!S.pages.includes(page))page='giapha';
  S.newPages=S.newPages.filter(x=>x!==page);
  const app=document.getElementById('app');
  const tree=document.querySelector('.treescroll');const sx=tree?tree.scrollLeft:0;
  const wy=window.scrollY;
  const body={giapha:pageGiapha,cosngoi:pageCosngoi,ruong:pageRuong,kinhdoanh:pageKinhdoanh,kho:pageKho,bando:pageBando,hokhac:pageHokhac,quan:pageQuan,giatoc:pageGiatoc,nhatky:pageNhatky}[page]();
  app.innerHTML=`<header class="top" id="top">${topHTML()}</header>${navHTML()}<main>${body}</main>`;
  const nt=document.querySelector('.treescroll');
  if(nt){nt.scrollLeft=sx;const n=nt.querySelector(`[data-sel="${sel}"]`);
    if(n){const x=n.getBoundingClientRect().left-nt.getBoundingClientRect().left;if(centerNext||x<0||x+n.offsetWidth>nt.clientWidth)nt.scrollLeft+=x-nt.clientWidth/2+n.offsetWidth/2}centerNext=false}

  if(Math.abs(window.scrollY-wy)>2)window.scrollTo(0,wy);
  bind();refreshSheet();
}
function renderTop(){const t=document.getElementById('top');if(t){t.innerHTML=topHTML();bindTop()}}
function bindTop(){
  const gm=document.getElementById('gmenu');if(gm)gm.onclick=gameMenu;
  document.querySelectorAll('[data-speed]').forEach(b=>b.onclick=()=>{const v=+b.dataset.speed;if(v===0)running=false;else{running=true;speed=v}renderTop()});
}
function bind(){
  bindTop();
  const app=document.getElementById('app');const c=P(sel);
  const done=()=>{render();save()};
  app.querySelectorAll('[data-page]').forEach(b=>b.onclick=()=>{page=b.dataset.page;centerNext=true;render();window.scrollTo(0,0)});
  app.querySelectorAll('[data-sel]').forEach(b=>b.onclick=()=>openSheet(b.dataset.sel));
  w_bind(app);
  app.querySelectorAll('[data-life]').forEach(s=>s.onchange=()=>{const h=S.hh[s.dataset.life];h.life=+s.value;log(`${h.name} chuyển sang sống ${LIFE[h.life][0].toLowerCase()}.`);done()});
  app.querySelectorAll('[data-build]').forEach(b=>b.onclick=()=>{if(b.dataset.build!==mainHH())return;const h=S.hh[b.dataset.build];const nx=HOMES[h.home+1];if(!nx||S.money<nx.cost)return;S.money-=nx.cost;h.home++;cf(nx.fame,'Xây nhà mới');S.hung=clamp(S.hung+3,0,100);log(`Xây xong ${nx.n}.`,'gd');done()});
  app.querySelectorAll('[data-openb]').forEach(b=>b.onclick=()=>{const [pid,t]=b.dataset.openb.split(':');openBizPopup(P(pid),t);done()});
  app.querySelectorAll('[data-gop]').forEach(b=>b.onclick=()=>{S.gop=+b.dataset.gop;log(`Gia quy góp công quỹ: ${GOP.find(x=>x[0]===S.gop)[1].toLowerCase()} tiền công.`);done()});
  app.querySelectorAll('[data-to]').forEach(b=>b.onclick=()=>{S.farm.to=+b.dataset.to;log(`Đổi mức tô: ${TOLV[S.farm.to][0].toLowerCase()}.`);done()});
  app.querySelectorAll('[data-coff]').forEach(sl=>sl.onchange=()=>{const k=sl.dataset.coff;const p=sl.value?P(sl.value):null;S.coff[k]=p?p.id:null;log(p?`${nameOf(p)} nhận chức ${CLANOFF[k].n.toLowerCase()} trong tộc.`:`Chức ${CLANOFF[k].n.toLowerCase()} để trống.`);if(p)addStat(p,'tam',5);done()});
  const cf2=app.querySelector('#chiF');if(cf2)cf2.onchange=()=>{chiF=cf2.value;render()};
  app.querySelectorAll('[data-tz]').forEach(b=>b.onclick=()=>{const k=b.dataset.tz;
    if(k==='fit'){const sc=app.querySelector('.treescroll'),tr=app.querySelector('.tree');if(sc&&tr&&tr.scrollWidth)setTreeZ(treeZ*sc.clientWidth/tr.scrollWidth)}
    else setTreeZ(k==='+'?treeZ+0.1:k==='-'?treeZ-0.1:1);centerNext=true;render()});
  app.querySelectorAll('tr[data-bz]').forEach(r=>{r.onclick=()=>bizDetail(r.dataset.bz);r.onkeydown=e=>{if(e.key==='Enter')bizDetail(r.dataset.bz)}});app.querySelectorAll('button[data-bz]').forEach(b=>b.onclick=e=>{e.stopPropagation();bizDetail(b.dataset.bz)});
  app.querySelectorAll('[data-qhire]').forEach(b=>b.onclick=e=>{e.stopPropagation();const [bid,r]=b.dataset.qhire.split(':');hirePopup(bid,r)});
  app.querySelectorAll('[data-sell]').forEach(b=>b.onclick=()=>{const [g,p]=b.dataset.sell.split(':');sellKho(g,+p)});
  app.querySelectorAll('[data-qb]').forEach(b=>b.onclick=()=>{const v=+b.dataset.qb;qOpenB=(qOpenB===v)?-1:v;qOpenT='';render()});
  app.querySelectorAll('[data-qt]').forEach(b=>b.onclick=()=>{qOpenT=(qOpenT===b.dataset.qt)?'':b.dataset.qt;render()});
  {const a1=app.querySelector('#qKind');if(a1)a1.onchange=()=>{qKind=a1.value;qOpenT='';render()};const a2=app.querySelector('#qProv');if(a2)a2.onchange=()=>{qProv=a2.value;qOpenT='';render()}}
  const tp=app.querySelector('[data-trip]');if(tp)tp.onclick=()=>tradePopup();
  app.querySelectorAll('[data-rule]').forEach(b=>b.onclick=()=>{const k=b.dataset.rule;if(S.rules.includes(k)||ruleWhy(k))return;addRule(k);done()});
  app.querySelectorAll('[data-ctrl]').forEach(b=>b.onclick=()=>{S.opt=S.opt||{};S.opt.ctrl=+b.dataset.ctrl;save();render()});
  app.querySelectorAll('[data-drop]').forEach(b=>b.onclick=()=>{const k=b.dataset.drop;confirmBox(`Bỏ điều "${esc(RULES[k].n)}"?`,`Bỏ gia quy làm Ổn định giảm${rule('tohuan')&&k!=='tohuan'?' nhiều (gia tộc giữ tổ huấn)':''}. Muốn thêm lại phải đợi đủ hạn.`,'Bỏ',()=>{dropRule(k);O.hidden=true;M.innerHTML='';done()},()=>{O.hidden=true;M.innerHTML='';render()})});
  const kg=app.querySelector('[data-kg]');if(kg)kg.onclick=()=>keugoiPopup();
  const tsb=app.querySelector('[data-tsbo]');if(tsb)tsb.onclick=()=>confirmBox('Từ bỏ mưu đại sự?','Con đường này sẽ khép lại. Mọi thứ đã bỏ ra là mất. Lộ càng cao thì càng dễ có tin lọt ra ngoài.','Từ bỏ',()=>{const t=usAbandon();closeModal();setTimeout(()=>{const hd=head();if(hd)infoPopup(hd,'Mưu đại sự','Đã từ bỏ',t)},50)},closeModal);
  app.querySelectorAll('[data-crop]').forEach(b=>b.onclick=()=>{const k=b.dataset.crop,d=+b.dataset.d;const v=(S.farm.alloc[k]||0)+d;if(v<0||(d>0&&allocated()>=farmArea()))return;S.farm.alloc[k]=v;done()});
  app.querySelectorAll('[data-farm]').forEach(b=>b.onclick=()=>{const k=b.dataset.farm;const F=S.farm;
    if(k==='buy'){const c0=landCost();if(S.money<c0)return;S.money-=c0;F.own++;log(`Mua thêm một mẫu ruộng, nay có ${F.own} mẫu.`)}
    if(k==='sell'&&F.own>=1){S.money+=Math.round(landCost()*0.8);F.own--;log(`Bán một mẫu ruộng.`);trimAlloc()}
    if(k==='rent+')F.rent++;if(k==='rent-'&&F.rent>0){F.rent--;trimAlloc()}
    if(k==='hire+')F.hired++;if(k==='hire-'&&F.hired>0)F.hired--;
    if(k==='lease+'&&F.own-(F.lease||0)>=1){F.lease=(F.lease||0)+1;trimAlloc()}if(k==='lease-'&&F.lease>0)F.lease--;
    if(k==='store')F.store=true;if(k==='sellnow')F.store=false;
    done()});
}
function trimAlloc(){let over=allocated()-farmArea();if(over<=0)return;for(const k of Object.keys(S.farm.alloc).reverse()){const d=Math.min(over,S.farm.alloc[k]);S.farm.alloc[k]-=d;over-=d;if(over<=0)break}}

/* ================= đồng hồ: mặc định 5 giây một tháng ================= */
setInterval(()=>{
  if(!S||S.over||!running||modalOpen()||sheetOpen())return;
  if(document.activeElement&&document.activeElement.tagName==='SELECT')return;
  acc+=speed/50;
  if(acc<1)return;acc=0;
  advance();
  render();
  if(S.queue.length)nextPopup();
},100);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&sheetOpen()&&!modalOpen())closeSheet()});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&S)save()});

/* ================= menu chính, bản lưu ================= */
const fmtAt=t=>{try{return new Date(t).toLocaleString('vi-VN',{dateStyle:'short',timeStyle:'short'})}catch(e){return ''}};
function slotLine(n){const m=meta().slots[n];return m?`Họ ${esc(m.surname)} · năm ${m.year} · ${m.n} người${TIERS[m.tier]?' · '+TIERS[m.tier][0]:''}${m.over?' · đã khép lại':''}<br><small class="muted">Lưu lúc ${fmtAt(m.at)}</small>`:'<span class="muted">Ô trống</span>'}
function brandHead(){
  document.getElementById('app').innerHTML=`<header class="top"><div class="brand"><div class="sealmark" aria-hidden="true">家</div><div><h1>Bách Niên Thế Gia</h1><small>Từ túp lều tranh đến danh gia vọng tộc</small></div></div></header>`;
}
function migrate(st){
  if(!st)return st;
  st.kyT=st.kyT||{};st.opt=st.opt||{};st.opt.preview=false;if(st.poem===undefined)st.poem=null;
  {const real=S;S=st;try{ensureEcon(st);if((st.ver||5)<6.1){st.people.forEach(p=>{if(p.dead==null&&p.spouse&&p.wantChild){p.kidAdj={v:20,until:st.t+24}}});for(const id in st.hh){const h=st.hh[id];if(/^Nhà /.test(h.name)&&id!=='h0'){const f=st.people.find(p=>p.hh===id&&p.dead==null&&!p.inLaw);if(f)h.name=branchName(f)}}}}finally{S=real}}
  if((st.ver||5)<6){const real=S;S=st;try{st.people.forEach(p=>{if(p.dead==null)ensurePersona(p)})}finally{S=real}}
  w_ensure(st);if((st.ver||5)<6.32)ctGrand(st);
  {const real=S;S=st;try{if((st.ver||5)<6.33)w633Migrate(st)}finally{S=real}}
  {const real=S;S=st;try{if((st.ver||5)<6.34)w634Migrate(st);if((st.ver||5)<6.35)w635Migrate(st)}finally{S=real}}
  {const real=S;S=st;try{if((st.ver||5)<6.4)w64Migrate(st);if((st.ver||5)<6.41)w641Migrate(st)}finally{S=real}}
  if(!st.fix660){st.fix660=1;st.than=st.than||{}; /* v6.6.0: gỡ danh hiệu Thần/thiên mệnh bốc nhầm lúc sinh */
    st.people.forEach(p=>{if(!p.traits)return;p.traits=p.traits.filter(t=>{const T=TRAITS[t];return !(T&&T.than)||st.than[T.than]===p.id})});
    const tmP=st.people.filter(p=>p.dead==null&&(p.traits||[]).some(t=>TRAITS[t]&&TRAITS[t].tm)).sort((a,b)=>a.born-b.born);
    tmP.slice(4).forEach(p=>{p.traits=p.traits.filter(t=>!(TRAITS[t]&&TRAITS[t].tm))});
    tmP.slice(0,4).forEach(p=>{let seen=false;p.traits=p.traits.filter(t=>{if(!(TRAITS[t]&&TRAITS[t].tm))return true;if(seen)return false;seen=true;return true})});}
  st.ver=6.41;return st;
}
function playSlot(n){
  const st=load(n);if(!st)return;S=migrate(st);S.slot=n;sel=S.head;O.hidden=true;M.innerHTML='';running=false;centerNext=true;page='giapha';
  const m=meta();m.last=n;lsSet(KEY_META,JSON.stringify(m));
  render();nextPopup();
}
function mainMenu(){
  running=false;S=null;page='giapha';brandHead();
  const m=meta();const last=m.last&&m.slots[m.last]&&!m.slots[m.last].over?m.last:null;
  const any=Object.keys(m.slots).length||loadOld();
  openModal(`<div class="menu"><div class="sealbig" aria-hidden="true">家</div><h2>Bách Niên Thế Gia</h2><p class="muted">Từ túp lều tranh đến danh gia vọng tộc</p><p class="muted" style="font-size:.78rem;margin-top:-.4rem">Phiên bản 6.7.0-d1${window.BN_ADMIN?' · admin':''}</p>
   <div class="choices">${last?`<button class="btn primary" data-m="cont"><strong>Tiếp tục</strong><small>${slotLine(last)}</small></button>`:''}
   <button class="btn ${last?'':'primary'}" data-m="new"><strong>Trò chơi mới</strong><small>Lập một dòng họ mới</small></button>
   <button class="btn" data-m="load" ${any?'':'disabled'}><strong>Tải bản lưu</strong><small>Ba ô lưu, mỗi ô một gia tộc</small></button>
   <button class="btn" data-m="imp"><strong>Nhập từ file</strong><small>Mở bản lưu đã xuất ra máy</small></button>
   <button class="btn" data-m="hist"><strong>Sử sách</strong><small>Kết cục đã đạt, xuất thân mở khóa</small></button></div></div>`,false,'menu');
  const b=k=>M.querySelector(`[data-m="${k}"]`);
  if(b('cont'))b('cont').onclick=()=>playSlot(last);
  b('new').onclick=()=>slotPick('Chọn ô lưu cho gia tộc mới',n=>startScreen(n));
  b('load').onclick=loadMenu;
  b('imp').onclick=importMenu;
  b('hist').onclick=historyMenu;
}
function slotPick(title,after,back){
  const m=meta();
  openModal(`<span class="eyebrow">Ô lưu</span><h2>${esc(title)}</h2><div class="choices">${[1,2,3].map(n=>`<button class="btn" data-s="${n}"><strong>Ô ${n}</strong><small>${slotLine(n)}</small></button>`).join('')}
   <button class="btn ghost" data-back>Quay lại</button></div>`,false,'menu');
  M.querySelectorAll('[data-s]').forEach(x=>x.onclick=()=>{const n=+x.dataset.s;
    if(m.slots[n])return confirmBox(`Ghi đè ô ${n}?`,`Gia tộc ${esc(m.slots[n].surname)} ở ô này sẽ mất hẳn.`,'Ghi đè',()=>after(n),()=>slotPick(title,after,back));
    after(n)});
  M.querySelector('[data-back]').onclick=back||mainMenu;
}
function confirmBox(h,p,yes,onYes,onNo){
  openModal(`<h2>${h}</h2><p>${p}</p><div class="choices"><button class="btn primary" data-y>${esc(yes)}</button><button class="btn ghost" data-n>Thôi</button></div>`,false,'menu');
  M.querySelector('[data-y]').onclick=onYes;M.querySelector('[data-n]').onclick=onNo;
}
function loadMenu(){
  const m=meta();const old=loadOld();
  openModal(`<span class="eyebrow">Tải bản lưu</span><h2>Các gia tộc đã lưu</h2>
   <div class="slots">${[1,2,3].map(n=>`<div class="slot"><div><b>Ô ${n}</b><br>${slotLine(n)}</div>${m.slots[n]?`<div class="acts"><button class="btn small primary" data-play="${n}">Chơi</button><button class="btn small" data-exp="${n}">Xuất file</button><button class="btn small ghost" data-del="${n}">Xóa</button></div>`:''}</div>`).join('')}
   ${old?`<div class="slot"><div><b>Bản lưu phiên bản cũ</b><br>Họ ${esc(old.surname)} · năm ${Math.floor(old.t/12)+1}<br><small class="muted">Được chuyển sang cách tính tính cách mới. Kinh tế, sự kiện vẫn chạy được.</small></div><div class="acts"><button class="btn small" data-old>Chuyển vào một ô</button></div></div>`:''}</div>
   <div class="choices"><button class="btn ghost" data-back>Quay lại</button></div>`,false,'menu');
  M.querySelectorAll('[data-play]').forEach(x=>x.onclick=()=>playSlot(+x.dataset.play));
  M.querySelectorAll('[data-exp]').forEach(x=>x.onclick=()=>exportSave(load(+x.dataset.exp),loadMenu));
  M.querySelectorAll('[data-del]').forEach(x=>x.onclick=()=>{const n=+x.dataset.del;confirmBox(`Xóa ô ${n}?`,`Gia tộc ${esc(m.slots[n].surname)} sẽ mất hẳn khỏi trình duyệt này.`,'Xóa',()=>{wipe(n);loadMenu()},loadMenu)});
  const ob=M.querySelector('[data-old]');if(ob)ob.onclick=()=>slotPick('Chuyển bản cũ vào ô nào?',n=>{const st=migrate(loadOld());st.slot=n;lsSet(slotKey(n),JSON.stringify(st));const mm0=meta();mm0.slots[n]=slotInfo(st);mm0.last=n;lsSet(KEY_META,JSON.stringify(mm0));lsDel(KEY_OLD);playSlot(n)},loadMenu);
  M.querySelector('[data-back]').onclick=mainMenu;
}
function exportSave(st,back){
  if(!st)return;const txt=JSON.stringify(st);const fn=`bach-nien-the-gia_ho-${st.surname}_nam-${Math.floor(st.t/12)+1}.json`;
  let ok=false;try{const b=new Blob([txt],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=fn;document.body.appendChild(a);a.click();ok=true;setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1000)}catch(e){}
  openModal(`<span class="eyebrow">Xuất bản lưu</span><h2>Họ ${esc(st.surname)}, năm ${Math.floor(st.t/12)+1}</h2>
   <p>${ok?`Đã gửi file <b>${esc(fn)}</b> về máy. Nếu trình duyệt chặn tải xuống, sao chép đoạn mã dưới đây và cất vào đâu đó.`:'Trình duyệt không cho tải file. Sao chép đoạn mã dưới đây và cất vào đâu đó.'} Khi cần, vào Nhập từ file và dán lại.</p>
   <textarea class="code" readonly rows="5">${esc(txt)}</textarea>
   <div class="choices"><button class="btn" data-copy>Sao chép mã</button><button class="btn ghost" data-back>Xong</button></div>`,false,'menu');
  M.querySelector('[data-copy]').onclick=e=>{const ta=M.querySelector('textarea');ta.select();let done=false;try{done=document.execCommand('copy')}catch(x){}if(navigator.clipboard)navigator.clipboard.writeText(txt).then(()=>{e.target.textContent='Đã chép'},()=>{});if(done)e.target.textContent='Đã chép'};
  M.querySelector('[data-back]').onclick=back||(()=>{O.hidden=true;M.innerHTML='';render()});
}
function importMenu(){
  openModal(`<span class="eyebrow">Nhập bản lưu</span><h2>Mở bản lưu từ máy</h2>
   <div class="field"><label for="impF">Chọn file .json đã xuất</label><input id="impF" type="file" accept=".json,application/json"></div>
   <div class="field"><label for="impT">Hoặc dán mã bản lưu</label><textarea id="impT" class="code" rows="4"></textarea></div>
   <p class="kvline down" id="impE" hidden></p>
   <div class="choices"><button class="btn primary" data-go>Nhập</button><button class="btn ghost" data-back>Quay lại</button></div>`,false,'menu');
  const err=t=>{const e=M.querySelector('#impE');e.textContent=t;e.hidden=false};
  const take=txt=>{let st;try{st=JSON.parse(txt)}catch(e){return err('Mã không đọc được. Kiểm tra lại file hoặc đoạn đã dán.')}
    if(!st||!Array.isArray(st.people)||!st.surname||st.t==null)return err('Đây không phải bản lưu của Bách Niên Thế Gia.');
    slotPick('Nhập vào ô nào?',n=>{st.slot=n;migrate(st);lsSet(slotKey(n),JSON.stringify(st));const m=meta();m.slots[n]=slotInfo(st);m.last=n;lsSet(KEY_META,JSON.stringify(m));playSlot(n)},importMenu)};
  M.querySelector('[data-go]').onclick=()=>{const f=M.querySelector('#impF').files[0];const t=M.querySelector('#impT').value.trim();
    if(f){const r=new FileReader();r.onload=()=>take(String(r.result));r.onerror=()=>err('Không đọc được file.');r.readAsText(f)}else if(t)take(t);else err('Chưa chọn file hoặc dán mã.')};
  M.querySelector('[data-back]').onclick=mainMenu;
}
function gameMenu(){
  if(!S||modalOpen())return;running=false;renderTop();
  openModal(`<span class="eyebrow">Menu · ô ${S.slot||1}</span><h2>Họ ${esc(S.surname)}</h2>
   <div class="choices"><button class="btn" data-g="save"><strong>Lưu ngay</strong><small>Game tự lưu mỗi năm và khi đóng trang</small></button>
   <button class="btn" data-g="exp"><strong>Xuất file bản lưu</strong><small>Cất ra máy để không mất khi trình duyệt xóa dữ liệu</small></button>
   <button class="btn" data-g="menu"><strong>Về menu chính</strong><small>Lưu rồi thoát ra</small></button>
   <button class="btn ghost" data-g="drop"><strong>Bỏ gia tộc này</strong><small>Xóa ô ${S.slot||1}</small></button>
   <button class="btn primary" data-g="x">Chơi tiếp</button></div>`,false,'menu');
  const b=k=>M.querySelector(`[data-g="${k}"]`);
  b('save').onclick=()=>{save();b('save').querySelector('small').textContent='Đã lưu lúc '+fmtAt(Date.now())};
  b('exp').onclick=()=>{save();exportSave(S,gameMenu)};
  b('menu').onclick=()=>{save();O.hidden=true;M.innerHTML='';mainMenu()};
  b('drop').onclick=()=>confirmBox('Bỏ gia tộc này?',`Gia tộc ${esc(S.surname)} sẽ bị xóa hẳn khỏi ô ${S.slot||1}.`,'Xóa và về menu',()=>{wipe(S.slot||1);S=null;mainMenu()},gameMenu);
  b('x').onclick=closeModal;
}

/* ================= tạo gia tộc mới ================= */
function rollFounder(org,reg){
  const OR=ORIGINS[org];
  const gn=rollGenes(0);const tmp={traits:[],tg:rollTraitGenes(),gn};
  randomTraits(tmp);innateGenes(tmp);
  const stats={};STATS.forEach(([k])=>stats[k]=k==='suc'?clamp(Math.round(pot(tmp,'suc')*R(85,100)/100),45,100):clamp(Math.round(pot(tmp,k)*R(50,82)/100),8,90));
  innateStats(tmp,stats,false);
  for(const k in OR.b||{})stats[k]=clamp(stats[k]+OR.b[k],5,95);
  let jobs=OR.jobs.slice();if(org==='sondan')jobs=REGIONS[reg].sea?['ngu','ngu','tieuphu']:['tieuphu','tieuphu','ngu'];
  const job=pick(jobs);
  const req=Object.assign({},OR.req||{},JOBS[job].req||{});for(const k in req)if(stats[k]<req[k])stats[k]=req[k]+R(0,8);
  return {gn,tg:tmp.tg,traits:tmp.traits,stats,duyen:R(15,85),job};
}
function startScreen(slot){
  running=false;page='giapha';brandHead();
  const st={g:'nam',reg:'trung',sur:pick(SURN),name:mkGiven('nam'),org:'rand',poem:-1};
  const draw=()=>{
    const R0=st.reg==='rand'?null:REGIONS[st.reg];const OR=st.org==='rand'?null:ORIGINS[st.org];
    openModal(`<span class="eyebrow">Lập gia tộc · ô ${slot}</span><h2>Người khai sáng dòng họ</h2>
    <div class="row2"><div class="field"><label for="fSur">Họ</label><input id="fSur" maxlength="12" value="${esc(st.sur)}"></div>
    <div class="field"><label for="fName">Tên</label><input id="fName" maxlength="20" value="${esc(st.name)}"></div></div>
    <div class="field"><label>Giới tính</label><div class="seg">${['nam','nữ'].map(g=>`<button class="btn" data-g="${g}" aria-pressed="${st.g===g}">${g==='nam'?'Nam':'Nữ'}</button>`).join('')}</div></div>
    <div class="field"><label>Xuất thân</label><div class="seg wrap"><button class="btn" data-o="rand" aria-pressed="${st.org==='rand'}">Ngẫu nhiên</button>${Object.entries(ORIGINS).filter(([k,o])=>!o.lock||unlockedKey(o.lock)).map(([k,O0])=>`<button class="btn" data-o="${k}" aria-pressed="${st.org===k}">${O0.n}</button>`).join('')}</div>
    <p class="kvline">${OR?esc(OR.d)+' Nghề khởi đầu: '+OR.jobs.map(j=>JOBS[j].lv[0].n.toLowerCase()).join(' hoặc ')+'.':'Trời định xuất thân, mỗi kiểu xuất thân đều có cơ hội như nhau.'}</p></div>
    <div class="field"><label>Nơi lập nghiệp</label><div class="mapwrap small">${mapSVGOld(st.reg==='rand'?null:st.reg)}</div>
    <div class="seg wrap"><button class="btn" data-r="rand" aria-pressed="${st.reg==='rand'}">Ngẫu nhiên</button>${Object.keys(REGIONS).map(k=>`<button class="btn" data-r="${k}" aria-pressed="${st.reg===k}">${REGIONS[k].n}</button>`).join('')}</div>
    <p class="kvline">${R0?`${esc(R0.d)} Sản vật: ${esc(R0.spec)}.`:'Trời đất đưa đẩy, đến đâu lập nghiệp ở đó.'}</p></div>
    <div class="field"><label for="fPoem">Chữ lót theo đời</label><select id="fPoem" class="sel"><option value="-1" ${st.poem<0?'selected':''}>Không dùng, mỗi người một tên đệm</option>${POEMS.map((P0,i)=>`<option value="${i}" ${st.poem===i?'selected':''}>${esc(P0.n)}: ${esc(P0.w.slice(0,6).join(', '))}…</option>`).join('')}</select>
    <p class="kvline muted">Con trai mỗi đời dùng chung một chữ đệm theo bài thơ của dòng họ, nhìn tên là biết vai vế.</p></div>
    <div class="choices"><button class="btn primary" data-go>Bắt đầu</button><button class="btn ghost" data-back>Quay lại</button></div>`,false,'menu');
    const keep=()=>{st.sur=M.querySelector('#fSur').value;st.name=M.querySelector('#fName').value;st.poem=+M.querySelector('#fPoem').value};
    M.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>{keep();if(st.g!==b.dataset.g){st.g=b.dataset.g;st.name=mkGiven(st.g)}draw()});
    M.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>{keep();st.org=b.dataset.o;draw()});
    M.querySelectorAll('[data-r],[data-reg]').forEach(b=>b.onclick=()=>{keep();st.reg=b.dataset.r||b.dataset.reg;draw()});
    M.querySelector('[data-back]').onclick=mainMenu;
    M.querySelector('[data-go]').onclick=()=>{
      keep();const org=st.org==='rand'?pick(Object.keys(ORIGINS).filter(k=>!ORIGINS[k].lock||unlockedKey(ORIGINS[k].lock))):st.org;const reg=st.reg==='rand'?pick(Object.keys(REGIONS)):st.reg;const f=rollFounder(org,reg);
      /* v6.7.0-d1: nhân vật khởi đầu có ít nhất hai chỉ số (ngoài sức khỏe) từ 80; gen của hai chỉ số ấy cũng được nâng theo để không bị kẹt trần */
      {const ks=['tri','vo','mi','eq'].sort((a,b)=>f.stats[b]-f.stats[a]);[ks[0],ks[1]].forEach(k=>{if(f.stats[k]<80)f.stats[k]=R(80,90);if(f.gn&&f.gn[k])f.gn[k]=f.gn[k].map(v=>Math.max(v,R(78,95)))})}
      const sur=st.sur.trim()||pick(SURN);const given=st.name.trim()||mkGiven(st.g);
      newGame({g:st.g,surname:sur,given,stats:f.stats,gn:f.gn,tg:f.tg,traits:f.traits,duyen:f.duyen,job:f.job,region:reg,origin:org,poem:st.poem>=0?st.poem:null,slot});
      O.hidden=true;M.innerHTML='';running=false;speed=1;centerNext=true;page='giapha';save();render();
      const h=head();h.wish=f.job;
      infoPopup(h,'Khởi đầu',`${nameOf(h)}`,`Mười tám tuổi, xuất thân <b>${esc(ORIGINS[org].n.toLowerCase())}</b>. ${esc(ORIGINS[org].d)} Nay lập nghiệp ở ${esc(REGIONS[S.region].n)}, làm <b>${esc(JOBS[f.job].lv[0].n.toLowerCase())}</b>. Của khởi nghiệp: ${esc(JOBS[f.job].gift)}.${axLabels(h).length?` Tính tình ${esc(persWord(h))}.`:''}`,()=>{running=true});
    };
  };
  draw();
}

/*@@V63-BEGIN@@*/
/* ================= v6.3: THẾ GIỚI · lõi mô phỏng ================= */
/* trạng thái: S.loc = {p: tỉnh, t: 0 làng | 1 trấn | 2 thành, v: tên làng}
   S.w = {ten:{chỉ số cặp:căng thẳng}, ph:{cặp:giai đoạn}, wars:[], dis:[], sk:{tỉnh:{hàng:hệ số}}, dmg:{tỉnh:0-100}, clans:{tỉnh:[...]}, news:[], prep}  */
const VILL63=['Phù Sa','An Lạc','Đông Phù','Hòa Bình','Thanh Hà','Vĩnh Phúc','Tân Hưng','Bình Dương','Phú Lộc','Long Thọ','Kim Bảng','Nghĩa Trang','Thạch Bích','Hương Canh','Văn Giang','Cổ Loa','Yên Mỹ','Quảng Bá','Trúc Lâm','Đại Từ'];
const TIERN63=['làng','trấn','thành'];
const CJOB63={nong:'làm ruộng',buon:'buôn bán',tho:'thợ thủ công',hoc:'nho học',vo:'võ nghệ',quan:'quan lại',thuoc:'thầy thuốc'};
const CTR63=['nhân hậu','tham lam','hẹp hòi','phóng khoáng','mưu mô','chính trực','ngạo mạn','khéo léo'];
const pairName63=i=>`${NAT[BORDER[i][0]].n} và ${NAT[BORDER[i][1]].n}`;
function w_new(){const W={ten:{},ph:{},wars:[],dis:[],sk:{},dmg:{},clans:{},news:[],prep:null,wid:1,did:1,cid:1};BORDER.forEach((b,i)=>{W.ten[i]=clamp(b[2]+R(-6,8),0,100);W.ph[i]=0});return W}
function w_startProv(reg){const L=Object.keys(PROV).filter(id=>PROV[id].r===reg&&PROV[id].k==='lang'&&PROV[id].nat!=='hai_minh');return pick(L.length?L:Object.keys(PROV).filter(id=>PROV[id].r===reg))}
function w_setLoc(p,t,v){const P0=PROV[p];S.loc={p,t:t||0,v:v||pick(VILL63)};S.region=P0.r;(REGIONS[S.region].unlock||[]).forEach(k=>{if(!S.farm.unlock.includes(k))S.farm.unlock.push(k)})}
function w_ensure(st){ /* gọi khi tạo ván mới hoặc nạp save cũ */
  const real=S;S=st;try{
    if(!st.w)st.w=w_new();
    if(!st.loc||!PROV[st.loc.p]){const p=w_startProv(st.region||'trung');w_setLoc(p,0)}
    const W=st.w;['ten','ph','sk','dmg','clans'].forEach(k=>W[k]=W[k]||{});['wars','dis','news'].forEach(k=>W[k]=W[k]||[]);W.wid=W.wid||1;W.did=W.did||1;W.cid=W.cid||1;
    houseEnsure(st);vilEnsure(st);
    if(!st.dyn)st.dyn=mkDyn(st.t);
  }finally{S=real}}
const w_nat=(p)=>PROV[p].nat;
const homeNat=()=>PROV[S.loc.p].nat;
function locName(){const L=S.loc,P0=PROV[L.p];return `${TIERN63[L.t]} ${L.v}, ${P0.n}`}
function locP(p,g){const P0=PROV[p];const base=(REGIONS[P0.r].p[g]||1)*((P0.pm&&P0.pm[g])||1);const sk=(S.w&&S.w.sk[p]&&S.w.sk[p][g])||1;return base*sk}
function w_shock(p,g,f,cap){const W=S.w;W.sk[p]=W.sk[p]||{};W.sk[p][g]=clamp((W.sk[p][g]||1)*f,0.6,cap||2.6)}
const w_news=(m,rel)=>{const W=S.w;W.news.unshift({t:S.t,m,rel:!!rel});if(W.news.length>40)W.news.length=40;if(rel)log(m,'hi')};
/* ---------- khoảng cách, tuyến buôn ---------- */
const w_sea=(a,b)=>{const A=PROV[a],B=PROV[b];return (A.k==='cang'||A.r==='dong')&&(B.k==='cang'||B.r==='dong')&&a!==b};
function w_mo(a,b){const A=PROV[a],B=PROV[b];const d=Math.hypot(A.x-B.x,(A.y-B.y)*1.1);return Math.max(1,Math.round(d/(w_sea(a,b)?58:40)))}
function w_front(){const W=S.w;const o={};W.wars.forEach(w=>{o[w.front[0]]=1;o[w.front[1]]=1});return o}
function w_closed(p){const W=S.w;const fr=w_front();if(fr[p]&&(W.dmg[p]||0)>=25)return true;const hn=homeNat(),dn=PROV[p].nat;return W.wars.some(w=>(w.a===hn&&w.b===dn)||(w.b===hn&&w.a===dn))}
function w_warRisk(p){const W=S.w;const hn=homeNat(),dn=PROV[p].nat;let r=0;W.wars.forEach(w=>{if([w.a,w.b].includes(hn)||[w.a,w.b].includes(dn))r+=0.07});return Math.min(0.2,r)}
function routes63(){
  const h=S.loc.p,H=PROV[h];const T=S.loc.t;
  const out=[
    {id:'cho',n:'Chợ huyện lân cận',mo:1,risk:.04,mm:0,cap:15000,sell:{lua:1.05,ngo:1.05,muoi:1.08},buy:{},d:'Gần, an toàn, lãi mỏng.',cross:0},
    {id:'phu',n:T===2?'Các phủ lân cận':'Phủ thành trong vùng',mo:2,risk:.07,mm:15,cap:80000,sell:{to:1.12,che:1.12,gom:1.08,duoc:1.08},buy:{},d:'Phố xá đông đúc.',cross:0}];
  for(const p in PROV){if(p===h)continue;const Pd=PROV[p];const mo=w_mo(h,p);const sea=w_sea(h,p);const sell={},buy={};
    for(const g in GOODS){const ratio=locP(p,g)/locP(h,g);if(ratio>=1.12)sell[g]=+ratio.toFixed(2);if(ratio<=0.88)buy[g]=+ratio.toFixed(2)}
    const cross=(Pd.nat!==H.nat?1:0)+(Pd.r!==H.r?1:0);
    const closed=w_closed(p);
    out.push({id:p,prov:p,n:`${Pd.n} · ${REGIONS[Pd.r].n}`,mo,fr:+Math.min(1,0.45+0.11*mo).toFixed(2),risk:+Math.min(0.7,0.03+0.016*mo+(sea?0.05:0)+w_warRisk(p)).toFixed(2),mm:10+mo*5,cap:Math.round(30000*Math.pow(mo,1.3)),sell,buy,d:Pd.d+(sea?' Đi đường biển.':''),war:closed?1:0,sea:sea?1:0,reg:Pd.r,cross})}
  if(REGIONS[S.region].sea)out.push({id:'sea',n:'Vượt biển sang ngoại quốc',mo:9,risk:.3,mm:70,cap:600000,sell:{to:1.9,gom:2,che:1.8,duoc:1.4},buy:{huong:.55,sat:.8},d:'Một vốn bốn lời hoặc mất trắng. Bão biển, hải tặc.',sea:1,cross:2});
  const first=out.slice(0,2),rest=out.slice(2).sort((a,b)=>a.mo-b.mo||a.n.localeCompare(b.n));
  return first.concat(rest)}
/* hàng hóa hao hụt khi đi đường */
const w_spoil=(g,mo)=>1-Math.pow(1-((GOODS[g]&&GOODS[g].dec)||0),mo);
/* ---------- chiến tranh và căng thẳng ---------- */
const w_rel=(a,b)=>{const hn=homeNat();return [a,b].includes(hn)||PROV[S.loc.p].r===NAT[a].r||PROV[S.loc.p].r===NAT[b].r};
function w_warName(w){return `${NAT[w.a].n} đánh ${NAT[w.b].n}`}
function w_startWar(i){
  const W=S.w,b=BORDER[i];const att=chance(NAT[b[0]].hos/(NAT[b[0]].hos+NAT[b[1]].hos))?0:1;const a=b[att],d=b[1-att];
  const w={id:W.wid++,i,a,b:d,since:S.t,until:S.t+R(10,40),front:[b[4],b[5]]};W.wars.push(w);W.ph[i]=3;W.ten[i]=100;
  w_news(`Chiến tranh nổ ra: ${w_warName(w)}. Mặt trận ở ${PROV[b[4]].n} và ${PROV[b[5]].n}.`,w_rel(a,d));
  [a,d].forEach(n=>Object.keys(PROV).filter(p=>PROV[p].nat===n).forEach(p=>{w_shock(p,'sat',1.25);w_shock(p,'ngua',1.25);w_shock(p,'lua',1.12)}));
  return w}
function w_endWar(w,why){
  const W=S.w;W.wars=W.wars.filter(x=>x!==w);W.ph[w.i]=0;W.ten[w.i]=clamp(BORDER[w.i][2]+R(5,14),0,100);
  w_news(`Hòa ước: ${w_warName(w)} đã kết thúc${why?', '+why:''}.`,w_rel(w.a,w.b))}
function w_tension(mo){
  const W=S.w;
  BORDER.forEach((b,i)=>{
    if(W.wars.some(w=>w.i===i))return;
    const hos=b[3]*(NAT[b[0]].hos+NAT[b[1]].hos)/2;let t=W.ten[i],ph=W.ph[i]||0;
    if(ph===0){ /* êm ả: thỉnh thoảng có biến cố */
      t+=(b[2]-t)*0.08;if(chance(0.0042*hos)){t=R(54,70);W.ph[i]=1;w_news(`Tin đồn: ${pairName63(i)} xô xát ở biên giới, quan hệ căng thẳng.`,w_rel(b[0],b[1]))}
    }else{ /* leo thang hoặc hạ nhiệt */
      t+=chance(0.5+0.05*(hos-1))?R(0,6):-R(0,5);
      if(t>=72&&ph===1){W.ph[i]=2;w_news(`${pairName63(i)} điều quân đến sát biên giới, hai bên chuẩn bị chiến tranh.`,w_rel(b[0],b[1]));
        if(w_rel(b[0],b[1])&&[b[0],b[1]].includes(homeNat()))S.recruit=Math.max(S.recruit,S.t+6)}
      if(t>=90||(ph===2&&t>=80&&chance(0.04))){W.ten[i]=t;w_startWar(i);return}
      if(t<=b[2]+6){W.ph[i]=0;if(ph>=1)w_news(`${pairName63(i)} bớt căng thẳng sau khi hai bên sứ giả qua lại.`,w_rel(b[0],b[1]))}
      if(ph===2){[b[4],b[5]].forEach(p=>{w_shock(p,'sat',1.03);w_shock(p,'lua',1.02)})}
    }
    W.ten[i]=clamp(t,0,100)});
  /* chiến sự đang diễn ra */
  W.wars.slice().forEach(w=>{
    const fa=w.front[0]===w.front[1]?[w.front[0]]:w.front;
    W.dmg[w.front[1]]=clamp((W.dmg[w.front[1]]||0)+R(1,4),0,100);W.dmg[w.front[0]]=clamp((W.dmg[w.front[0]]||0)+R(0,2),0,100);
    fa.forEach(p=>{w_shock(p,'lua',1.04,2.6);w_shock(p,'sat',1.03,2.6);w_shock(p,'ngua',1.03,2.6)});
    [w.a,w.b].forEach(n=>Object.keys(PROV).filter(p=>PROV[p].nat===n).forEach(p=>{w_shock(p,'sat',1.01,2);w_shock(p,'ngua',1.01,2)}));
    if(S.t>=w.until)w_endWar(w,chance(0.5)?'hai bên đều kiệt sức':'sau nhiều trận giằng co')});
  /* phục hồi */
  for(const p in W.dmg){if(!w_front()[p])W.dmg[p]=Math.max(0,W.dmg[p]-2);if(!W.dmg[p])delete W.dmg[p]}
  for(const p in W.sk){for(const g in W.sk[p]){W.sk[p][g]+=(1-W.sk[p][g])*0.07;if(Math.abs(W.sk[p][g]-1)<0.02)delete W.sk[p][g]}if(!Object.keys(W.sk[p]).length)delete W.sk[p]}
}
/* ---------- thiên tai theo vùng ---------- */
const disActive=d=>S.t>=d.since&&S.t<d.until;
function w_dis(mo){
  const W=S.w;
  W.dis.slice().forEach(d=>{
    if(S.t>=d.until){W.dis=W.dis.filter(x=>x!==d);if(DIS[d.k].epi&&d.provs.includes(S.loc.p))S.epiRisk=Math.max(S.epiRisk,DIS[d.k].epi*0.6);w_news(`${DIS[d.k].n} ở ${REGIONS[d.r].n} đã qua.`,d.r===S.region&&d.provs.includes(S.loc.p))}
    else if(!d.warned&&S.t===d.since-1){d.warned=1;if(d.r===S.region)w_news(`Báo động: ${DIS[d.k].n.toLowerCase()} sắp ập tới ${d.provs.map(p=>PROV[p].n).join(', ')}.`,d.provs.includes(S.loc.p))}
    else if(S.t===d.since){const R0=REGIONS[d.r];w_news(`${DIS[d.k].n} ở ${R0.n} (${d.provs.map(p=>PROV[p].n).join(', ')}), mức ${['','nhẹ','vừa','nặng'][d.sev]}.`,d.provs.includes(S.loc.p));
      d.provs.forEach(p=>DIS[d.k].g.forEach(g=>w_shock(p,g,1+0.15*d.sev+0.1,2.6)))}});
  for(const k in DIS){const D0=DIS[k];if(!D0.mo.includes(mo))continue;
    for(const r in D0.w){if(W.dis.some(x=>x.k===k&&x.r===r))continue;
      if(chance(0.0145*D0.w[r])){const pr=Object.keys(PROV).filter(p=>PROV[p].r===r);const n=Math.min(pr.length,R(2,3));const provs=pr.slice().sort(()=>Math.random()-0.5).slice(0,n);
        const x=Math.random();const sev=x<0.5?1:x<0.85?2:3;const since=S.t+(D0.warn?1:0);
        W.dis.push({id:W.did++,k,r,provs,since,until:since+R(D0.d[0],D0.d[1]),sev,warned:0});}}}
  /* chiếu xuống nhà mình */
  const mine=W.dis.find(d=>disActive(d)&&d.provs.includes(S.loc.p));
  if(mine){const D0=DIS[mine.k];const crop=clamp(1-(1-D0.crop)*mine.sev/2,0.2,1);
    if(!S.disaster||S.disaster.id!==mine.id){if(clanLv()>=5){const rl=mm(R(6,14));S.money+=rl;log(`Quan địa phương nể dòng họ, cấp ${money(rl)} cứu trợ.`,'gd')}S.disaster={id:mine.id,k:mine.k,wk:mine.k,until:mine.until,sev:mine.sev,crop,provs:mine.provs};log(`${D0.n} (mức ${['','nhẹ','vừa','nặng'][mine.sev]}) ập đến nơi nhà mình ở. ${D0.say}`,'hi');
      if(D0.epi>=0.9&&!S.epi){S.epi=true;S.epiEnd=S.t+R(3,5)}
      const hd=head();if(hd&&mine.sev>=2)enqueue('ev',hd.id,{ev:'w63_dis_'+mine.k,data:{sev:mine.sev}})}
    else S.disaster.until=mine.until}
  else if(S.disaster&&S.disaster.id){S.disaster=null}
  else if(S.disaster&&!S.disaster.id&&S.t>=S.disaster.until){S.epiRisk=Math.max(S.epiRisk,0.3);S.disaster=null}
}
/* ---------- chiếu chiến sự xuống nhà mình ---------- */
function w_home(){
  const W=S.w,hn=homeNat();const w=W.wars.find(x=>x.a===hn||x.b===hn);
  if(w){const foe=w.a===hn?w.b:w.a;const near=(w.front.includes(S.loc.p)||(W.dmg[S.loc.p]||0)>=10)?0:(PROV[S.loc.p].r===PROV[w.front[0]].r||PROV[S.loc.p].r===PROV[w.front[1]].r)?1:2;
    if(!S.war||S.war.wid!==w.id){S.war={n:w_warName(w),until:w.until,since:w.since,wid:w.id,enemy:foe,front:w.front,near};log(`Chiến sự: ${w_warName(w)}. ${near===0?'Chiến trường ngay trên đất nhà mình!':near===1?'Chiến trường không xa, cả vùng nơm nớp.':'Chiến trường còn xa, nhưng triều đình vẫn ra lệnh bắt lính.'}`,'hi')}
    else{S.war.until=w.until;S.war.near=near}}
  else if(S.war){
    if(S.war.wid||S.t>=S.war.until){log('Chiến sự kết thúc. Sau chiến tranh, dịch bệnh dễ phát sinh.','gd');S.war=null;S.epiRisk=Math.max(S.epiRisk,0.4);
      alive().filter(p=>p.job==='quan_ngu'&&p.away).forEach(p=>enqueue('ev',p.id,{ev:'qn_het_chien'}))}}
}
/* ---------- dòng họ khác ---------- */
function w_jobKind(c){const j=c.job;return ['tieunhi','hangrong','chu','thulai'].includes(j)?'buon':['tho','det','bep'].includes(j)?'tho':['su','diaky'].includes(j)?'hoc':['quan','nguy'].includes(j)?'quan':['y','mo'].includes(j)?'thuoc':['quan_ngu','tieu','hiep','nhadich'].includes(j)?'vo':'nong'}
/* ---------- v6.3.5: mỗi nơi có một hai danh gia vọng tộc riêng; bốn nơi của bốn thế gia lớn thì chỉ có bốn nhà ấy hùng cứ ---------- */
const SEATS=['nhan_mon','thien_kinh','duoc_coc','bach_sa'];
/* v6.3.5: danh gia gọi bằng chữ "Gia" (Hoàng Gia, Đào Gia, Cổ Nguyệt Gia); gia chủ là tên người riêng. Gia chủ giữ ghế 20 đến 50 năm rồi nhường. */
const cname=c=>c.house?`${c.sur} Gia`:`họ ${c.sur}`;
const cnameU=c=>c.house?`${c.sur} Gia`:`Họ ${c.sur}`;
const cHeadFull=c=>`${c.sur} ${c.head.given}`;
const COMPOUND_SUR=['Cổ Nguyệt','Âu Dương','Thượng Quan','Tư Mã','Hoàng Phủ','Đông Phương','Nam Cung','Bạch Lộc','Lạc Hà','Tây Môn','Mộ Dung','Thiên Phong','Liễu Diệp','Hạ Hầu','Vân Khánh','Trúc Lâm','Thanh Lăng','Lăng Tiêu'];
function w_houseSur(p,c){
  if(!chance(0.4)||COMPOUND_SUR.includes(c.sur))return;
  const used=new Set((S.w.clans[p]||[]).map(x=>x.sur));const free=COMPOUND_SUR.filter(s=>!used.has(s));
  if(free.length)c.sur=pick(free)}
const termYears=a=>Math.max(6,Math.min(R(20,50),84-a));
function clanSucc(o,reg,minKid){
  if(o.oan)o.oan*=0.8; /* v6.4.1.5: gia chủ mới vẫn nhớ chuyện cũ, nhưng nhạt bớt */
  const heir=o.kids.filter(k=>k.g==='nam'&&k.age>=minKid).sort((a,b)=>b.age-a.age)[0];
  if(heir){o.head={given:heir.given,age:heir.age,tr:pick(CTR63)};o.kids=o.kids.filter(k=>k!==heir)}
  else o.head={given:outsiderName('nam',reg).given,age:R(32,46),tr:pick(CTR63)};
  o.gen=(o.gen||0)+1;o.end=S.t+12*termYears(o.head.age)}
const HOUSE_TITLE={vo:['Tổng binh trấn thủ','Quản cơ về hưu'],quan:['Thị lang về hưu','Tri phủ nghỉ việc'],hoc:['Đại nho một vùng','Tế tửu về hưu'],buon:['Hội trưởng thương hội','Đại phú thương'],thuoc:['Ngự y về hưu','Danh y mấy đời'],tho:['Tổ sư nghề thủ công','Chủ xưởng lớn nhất vùng'],nong:['Đại điền chủ','Chủ trang điền']};
function w_markHouses(p){
  const W=S.w,L=W.clans[p];if(!L)return;const P0=PROV[p];
  if(SEATS.includes(p)){L.forEach(c=>{delete c.house;c.fame=Math.min(c.fame,70)});return}
  if(L.some(c=>c.house))return;
  const n={kinh:2,phu:chance(0.5)?2:1,cang:chance(0.5)?2:1,bien:1,lang:chance(0.3)?2:1}[P0.k]||1;
  L.slice().sort((a,b)=>b.fame-a.fame).slice(0,n).forEach((c,i)=>{
    const t5=i===0&&(P0.k==='kinh'||(P0.k==='phu'&&chance(0.5))||(P0.k==='cang'&&chance(0.4)));const tier=t5?5:4;
    c.house={tier,title:pick(HOUSE_TITLE[c.job]||HOUSE_TITLE.nong)};w_houseSur(p,c);
    c.fame=Math.max(c.fame,tier===5?R(215,255):R(150,200));c.wealth=Math.max(c.wealth,R(58,82))})}
function w_genClan(p){
  const P0=PROV[p],W=S.w;const used=new Set((W.clans[p]||[]).map(c=>c.sur));used.add(S.surname);
  let n,g='nam';for(let i=0;i<30;i++){n=outsiderName('nam',P0.r);if(!used.has(n.surname))break}
  const pool={kinh:['quan','hoc','buon','thuoc','tho','vo'],phu:['buon','tho','hoc','quan','nong'],cang:['buon','buon','tho','vo','nong'],bien:['vo','vo','quan','buon','nong'],lang:['nong','nong','nong','tho','buon','hoc']}[P0.k];
  const fMax={kinh:260,phu:170,cang:170,bien:110,lang:90}[P0.k];
  const kids=[];const nk=R(1,3);for(let i=0;i<nk;i++){const gg=chance(0.5)?'nam':'nữ';const on=outsiderName(gg,P0.r);kids.push({id:'k'+(W.cid++),g:gg,given:on.given,age:R(2,30)})}
  return {id:'c'+(W.cid++),sur:n.surname,fame:R(4,fMax),wealth:R(15,85),job:pick(pool),head:{given:n.given,age:R(34,68),tr:pick(CTR63)},kids,rel:R(-8,12),feud:0,mar:0,last:-99}}
function w_clans(p){p=p||S.loc.p;const W=S.w;if(!W.clans[p]){const P0=PROV[p];const N={kinh:R(7,8),phu:R(5,6),cang:R(5,6),bien:R(3,4),lang:R(4,5)}[P0.k];W.clans[p]=[];for(let i=0;i<N;i++)W.clans[p].push(w_genClan(p));w_markHouses(p)}return W.clans[p]}
function w_clansYear(){
  const W=S.w;
  for(const p in W.clans){const L=W.clans[p];const dmg=W.dmg[p]||0;
    L.forEach(c=>{c.head.age++;c.kids.forEach(k=>k.age++);
      c.wealth=clamp(c.wealth+R(-9,9)-dmg/25+(chance(0.1)?R(8,20):0),2,100);c.fame=clamp(c.fame+R(-6,8)+(c.wealth-50)/25,0,320);if(SEATS.includes(p))c.fame=Math.min(c.fame,70);if(c.house)c.fame=Math.max(c.fame,c.house.tier===5?200:140);
      c.rel+=(relBase(c)-c.rel)*0.08;if(c.feud&&chance(0.08))c.feud=0;if(c.oan)c.oan*=0.97;
      if(c.end==null)c.end=S.t+12*termYears(c.head.age);
      if(S.t>=c.end||c.head.age>=88){const oa=c.head.age,oh=cHeadFull(c);clanSucc(c,PROV[p].r,18);
        if(c.house&&S.loc&&(p===S.loc.p||w_mo(S.loc.p,p)<=2))log(`${cname(c)}: gia chủ ${oh} ${oa>=72?'đã mất':'nhường chức'}, ${cHeadFull(c)} nối ngôi.`)}
      c.kids=c.kids.filter(k=>!(k.age>=32&&chance(0.4)));
      while(c.kids.length<R(1,3)&&chance(0.5)){const gg=chance(0.5)?'nam':'nữ';c.kids.push({id:'k'+(W.cid++),g:gg,given:outsiderName(gg,PROV[p].r).given,age:R(0,6)})}});
    /* họ lụi tàn bị thay bằng họ mới */
    for(let i=L.length-1;i>=0;i--){const c=L[i];if((!c.house&&((c.wealth<8&&chance(0.25))||chance(0.012)))||(c.house&&chance(0.003))){const wasH=c.house;L[i]=w_genClan(p);L[i].fame=Math.round(L[i].fame/2);if(wasH){L[i].house={tier:wasH.tier,title:pick(HOUSE_TITLE[L[i].job]||HOUSE_TITLE.nong)};w_houseSur(p,L[i]);L[i].fame=Math.max(L[i].fame,wasH.tier===5?R(215,250):R(150,195));L[i].wealth=Math.max(L[i].wealth,60)}}}}
}
const w_clan=(p,id)=>(S.w.clans[p]||[]).find(c=>c.id===id);
function w_ourKind(){const hd=head();return hd?w_jobKind(hd):'nong'}
/* ---------- dời nhà ---------- */
function moveCost(to,tier){
  const mo=to.p===S.loc.p?1:w_mo(S.loc.p,to.p);const n=alive().filter(p=>inClan(p)).length;const tm=[1,1.5,2.5][tier||0]||1;
  return {mo,cost:Math.round((mm(3+mo*2)+n*mm(0.3)*mo+(HOMES[HH(mainHH()).home].cost*0.25)*(to.p===S.loc.p?0.5:1))*tm)}}
function moveBlock(){const q=alive().find(p=>p.job==='quan'&&p.post);if(q)return `${q.given} đang giữ chức quan, phải từ quan trước khi dời nhà.`;return ''}
function doMove(to,tier,flee){
  const W=S.w,from=S.loc.p;const info=moveCost({p:to},tier);const cost=flee?Math.min(Math.max(0,Math.round(S.money)),Math.round(info.cost*0.4)):info.cost;
  const sameProv=to===from;
  if(!sameProv){
    /* bán ruộng, cơ sở làm ăn ở nơi cũ */
    if(S.farm.own>0||S.farm.rent>0){const v=Math.round(S.farm.own*landCost()*(flee?0.4:0.6));S.money+=v;if(v)log(`Bán ruộng ở nơi cũ được ${money(v)}.`);S.farm.own=0;S.farm.lease=0;S.farm.hired=0;S.farm.alloc={lua:0};
      S.farm.rent=alive().some(p=>p.job==='nong')?Math.min(6,2+alive().filter(p=>p.job==='nong').length):0}
    /* v6.4.1.6: cơ sở của chi họ ở xa không bị bán theo khi nhà chính dời đi */
    S.biz.slice().filter(b=>!(b.own&&S.hh[b.own]&&S.hh[b.own].p)).forEach(b=>{const v=bizValue(b);sellBiz(b);S.money-=Math.round(v*(flee?0.45:0.2))});
    S.trips.forEach(t=>{t.pv=priceOf(t.good)});
    cf(-S.fame*(flee?0.15:0.1),'Dời đi nơi khác, mất quan hệ cũ');
    const old=(W.clans[from]||[]);old.forEach(c=>{c.rel*=0.7});
  }
  S.money-=cost;
  const v=sameProv?S.loc.v:pick(VILL63);
  w_setLoc(to,tier,v);
  const mo=info.mo;S.moveUntil=S.t+mo;
  alive().forEach(p=>{if(inClan(p)){if(age(p)>=5)p.busyUntil=Math.max(p.busyUntil||0,S.t+Math.min(mo,6));addStat(p,'tam',sameProv?2:-5)}});
  S.hung=clamp(S.hung-(sameProv?0:4),0,100);S.on=clamp(S.on-(sameProv?0:3),0,100);
  S.mk=S.mk||{};
  log(`Cả nhà ${flee?'chạy nạn':'dọn'} về ${locName()}${mo>1?`, đi đường mất ${mo} tháng`:''}. Tốn ${money(cost)}.`,'hi');
  if(!sameProv&&mo>=2&&!flee){const hd=head();if(hd)enqueue('ev',hd.id,{ev:'w63_duong_xa',data:{mo}},true)}
  w_clans(to);
  /* v6.5.4: gia chủ dọn đi thì quan khác của họ đang giữ ghế ở quê mới phải đổi ghế (hồi tị) */
  if(!DRY&&!sameProv)alive().forEach(p=>{if(p.job!=='quan'||isHead(p)||!p.seat)return;const W=seatWh(p.seat);
    if(W&&W.local&&W.p===to){log(`${nameOf(p)} đang giữ ghế ở nơi gia đình dọn tới, phạm lệ hồi tị nên bị điều đi nơi khác.`,'hi');appoint(p,p.lv,true)}});
}
/* ---------- phí kho hàng buôn ---------- */
function w_khoFee(){let v=0;for(const g in S.kho){if(['lua','ngo'].includes(g))continue;const q=S.kho[g]||0;if(q>=1)v+=q*GOODS[g].p*0.002}
  if(v>=1)S.money-=Math.round(v)}
/* ---------- nhịp tháng ---------- */
function w63Month(mo){
  if(!S.w)w_ensure(S);
  w_tension(mo);w_dis(mo);w_home();
  if(S.t%12===0)w_clansYear();
  if(S.war&&mo%3===0){const lv=Math.round(expenses().total*0.1);if(lv>0){S.money-=lv;if(mo===3)log(`Thuế binh năm nay: ${money(lv*4)}.`)}}
  if(S.war&&S.war.near===0){const hd=head();if(hd&&chance(0.05))enqueue('ev',hd.id,{ev:pick(['w63_giac_tran','w63_giac_tran','w63_chay_loan','w63_thue_luong'])})}
  else if(S.war&&S.war.near===1){const hd=head();if(hd&&chance(0.02))enqueue('ev',hd.id,{ev:pick(['w63_thue_luong','w63_ti_nan'])})}
  w_khoFee();
  headBSync();
  w633Month(mo);
  /* sự kiện dòng họ khác: thưa, mỗi loại có thời gian nghỉ riêng, "xin vay" chỉ khi họ kia thật sự túng */
  if(chance(0.028)){const hd=head();const L=w_clans();if(hd&&L.length){
    /* v6.4.1.5.1: Bần hộ, Thường dân thì họ khác không đến chơi, hỏi thăm, nhờ vả; chỉ còn chuyện tranh chấp */
    const pool=[['w63_ho_qua',1,48],['w63_ho_canh_tranh',0.8,84],['w63_ho_tranh_chap',0.8,84],['w63_ho_gia_nan',0.9,60],['w63_ho_hoi_lang',1,36],['w63_ho_xin_vay',0.8,144],['w631_ho_muon_trau',0.7,72],['w631_ho_gop_dinh',0.8,60],['w631_ho_dua_dam',0.6,96]].filter(([id])=>(tierIdx()>=2||['w63_ho_canh_tranh','w63_ho_tranh_chap'].includes(id))&&EVMAP[id]&&(S.cool[id]||-1e9)<=S.t&&(!EVMAP[id].c||EVMAP[id].c(hd)));
    const tot=pool.reduce((a,x)=>a+x[1],0);let r0=Math.random()*tot,tp=pool.length?pool[0]:null;for(const x of pool){r0-=x[1];if(r0<=0){tp=x;break}}
    if(tp){let cands=L;
      if(tp[0]==='w63_ho_xin_vay')cands=L.filter(c=>c.wealth<=58&&(c.askT==null||c.askT+144<=S.t)&&!(c.head&&c.head.tr==='tham lam'&&c.rel<-20));
      if(tp[0]==='w63_ho_gia_nan')cands=L.filter(c=>c.wealth<=70);
      if(tp[0]==='w63_ho_canh_tranh')cands=L.filter(c=>c.job===w_ourKind()); /* v6.4.1.5: chỉ họ cùng nghề mới tranh khách */
      if(cands.length){const c=pick(cands);S.cool[tp[0]]=S.t+tp[2];if(tp[0]==='w63_ho_xin_vay')c.askT=S.t;enqueue('ev',hd.id,{ev:tp[0],data:{cl:c.id,p:S.loc.p}})}}}}
  /* v6.4.1.5.1: họ khác chỉ ngỏ ý thông gia khi nhà mình ngang hoặc cao hơn họ, và hai nhà đã thân (hảo cảm từ 25) */
  if(tierIdx()>=2&&chance(0.012*(clanLv()>=3?2:1))){const hd=head();const L=w_clans().filter(c=>c.kids.some(k=>k.age>=16&&k.age<=30)&&c.rel>=25&&ctierC(c)<=tierIdx());if(hd&&L.length&&alive().some(p=>inClan(p)&&!p.spouse&&age(p)>=16&&age(p)<=32)){const c=pick(L);enqueue('ev',hd.id,{ev:'w63_ho_ket_than',data:{cl:c.id,p:S.loc.p}})}}
  /* người từ xa mang tin về: hiếm, nhiều hơn khi thời cuộc có biến, ở nơi sầm uất thì nhiều hơn */
  {const W=S.w;const hot=!!S.war||(W.ph&&Object.values(W.ph).some(v=>v>=1))||(W.dis&&W.dis.length>0);const tf=[0.6,1,1.4][S.loc.t||0];
   if((S.cool.w63_tin_xa||-1e9)<=S.t&&chance(0.005*tf*(hot?2.4:1))){const hd=head();if(hd){S.cool.w63_tin_xa=S.t+36;
     const ids=['w63_tin_xa','w631_su_hanh_cuoc','w631_linh_tram','w631_thay_lang_rong','w631_nguoi_hat_rong','w631_chu_thuyen'].filter(id=>EVMAP[id]&&(!EVMAP[id].c||EVMAP[id].c(hd)));
     enqueue('ev',hd.id,{ev:pick(ids)})}}}
}
const w_damp=g=>['ngua','ngoc','traichau','huong'].includes(g)?0.82:0.55;

/* ================= v6.3: THẾ GIỚI · giao diện ================= */
let mapProv=null,preRoute63=null;
const w_label=n=>n>=75?'rất căng':n>=55?'căng thẳng':n>=35?'có hiềm khích':'êm ả';
const w_wealthTxt=n=>n>=75?'giàu có':n>=50?'khá giả':n>=25?'bình thường':'sa sút';
function w_routeIdx(){if(!preRoute63)return 0;const i=routes().findIndex(r=>r.id===preRoute63);preRoute63=null;return i<0?0:i}
function mapSVG(selP){
  const W=S.w,home=S.loc.p;
  const act=W.dis.filter(d=>S.t>=d.since-1&&S.t<d.until);
  const parts=[];
  parts.push(`<svg viewBox="0 0 500 400" class="mapsvg" role="img" aria-label="Bản đồ thế giới">`,`<rect x="0" y="0" width="500" height="400" class="sea"/>`);
  parts.push(Object.entries(REG_SHAPE).map(([k,d])=>`<path d="${d}" class="rg rg-${k}" style="cursor:default"/>`).join(''));
  /* nhãn vùng mờ */
  const LBL63={trung:[272,286],bac:[250,28],dong:[452,232],nam:[255,322],tay:[40,170]};
  parts.push(Object.keys(REG_SHAPE).map(k=>{const R0=REGIONS[k];const L=LBL63[k]||[R0.x*5,R0.y*4];return `<text x="${L[0]}" y="${L[1]}" text-anchor="middle" class="rn" pointer-events="none">${R0.n}</text>`}).join(''));
  /* thiên tai */
  act.forEach(d=>d.provs.forEach(p=>{const P0=PROV[p];parts.push(`<circle cx="${P0.x}" cy="${P0.y}" r="${15+d.sev*3}" class="dz ${S.t<d.since?'warn':''}" pointer-events="none"/>`)}));
  /* căng thẳng và chiến tranh */
  BORDER.forEach((b,i)=>{const ph=W.ph[i]||0;if(!ph)return;const A=PROV[b[4]],B=PROV[b[5]];
    parts.push(`<line x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}" class="tl ph${ph}" pointer-events="none"/>`)});
  Object.keys(w_front()).forEach(p=>{const P0=PROV[p];parts.push(`<circle cx="${P0.x}" cy="${P0.y}" r="13" class="wz" pointer-events="none"/>`)});
  /* tuyến đường tới tỉnh đang chọn */
  if(selP&&selP!==home){const A=PROV[home],B=PROV[selP];parts.push(`<line x1="${A.x}" y1="${A.y}" x2="${B.x}" y2="${B.y}" class="rt" pointer-events="none"/>`)}
  /* tỉnh */
  for(const p in PROV){const P0=PROV[p],N0=NAT[P0.nat];const r=P0.k==='kinh'?8:P0.k==='lang'?5:6.5;
    const shape=P0.k==='bien'?`<rect x="${P0.x-6}" y="${P0.y-6}" width="12" height="12" transform="rotate(45 ${P0.x} ${P0.y})"`:`<circle cx="${P0.x}" cy="${P0.y}" r="${r}"`;
    parts.push(`<g class="pv ${p===selP?'on':''} ${p===home?'home':''}" data-prov="${p}" tabindex="0" role="button" aria-label="${esc(P0.n)}">${shape} fill="${N0.col}" class="pd"/><text x="${P0.x}" y="${P0.y+(P0.k==='kinh'?20:17)}" text-anchor="middle" class="pl">${esc(P0.n)}</text>${p===home?`<text x="${P0.x}" y="${P0.y-11}" text-anchor="middle" class="hm">★</text>`:''}${S&&brAt(p).length?`<text x="${P0.x+(p===home?12:0)}" y="${P0.y-11}" text-anchor="middle" class="hm br"><title>${esc(brAt(p).map(id=>S.hh[id].name).join(', '))}</title>⌂</text>`:''}</g>`)}
  parts.push('</svg>');return parts.join('')}
function w_priceTable(p,h){
  const goods=Object.keys(GOODS);
  return `<div class="ptab"><div class="ph"><span>Hàng</span><span>Giá ở đây</span>${p!==h?'<span>So với nhà</span>':'<span></span>'}</div>${goods.map(g=>{const v=locP(p,g);const ratio=v/locP(h,g);
    return `<div><span>${GOODS[g].n}</span><span class="num">${money(GOODS[g].p*v*mk(g))}</span>${p!==h?`<span class="num ${ratio>=1.12?'up':ratio<=0.88?'down':''}">×${ratio.toFixed(2)}</span>`:'<span></span>'}</div>`}).join('')}</div>`}
function w_provPanel(p){
  const W=S.w,h=S.loc.p,P0=PROV[p],N0=NAT[P0.nat];const RT=routes().find(r=>r.id===p);
  const front=w_front()[p];const dmg=W.dmg[p]||0;const dz=W.dis.filter(d=>d.provs.includes(p)&&S.t<d.until);
  const war=W.wars.find(w=>w.front.includes(p));
  const tags=[];if(front)tags.push(`<span class="chip red">tiền tuyến</span>`);if(dmg>=10)tags.push(`<span class="chip red">thiệt hại ${Math.round(dmg)}%</span>`);
  dz.forEach(d=>tags.push(`<span class="chip red">${DIS[d.k].n}${S.t<d.since?' (sắp tới)':''}</span>`));
  const blk=moveBlock();
  return `<span class="eyebrow">${p===h?`Quê nhà · ${esc(locName())}`:RT?`Cách ${RT.mo} tháng đường${RT.sea?' (đi biển)':''} · rủi ro ${Math.round(RT.risk*100)}% · cần thông thạo ${RT.mm}`:''}</span>
   <h2>${esc(P0.n)}</h2>
   <p class="kvline"><span class="chip" style="background:${N0.col};color:#fff">${esc(N0.n)}</span><span class="chip">${{kinh:'Kinh đô',phu:'Phủ lớn',cang:'Cảng',bien:'Ải biên giới',lang:'Vùng nông thôn'}[P0.k]}</span><span class="chip">${esc(REGIONS[P0.r].n)}</span>${tags.join(' ')}</p>
   <p class="kvline">${esc(P0.d)}</p>
   ${war?`<p class="kvline down">Chiến sự: ${esc(w_warName(war))}, còn khoảng ${Math.max(0,war.until-S.t)} tháng.</p>`:''}
   ${w_priceTable(p,h)}
   ${p!==h&&RT&&RT.war?'<p class="kvline down">Đường tới đây đang đóng vì chiến sự.</p>':''}
   <div class="acts" style="margin-top:10px">
     <button class="btn small" data-w63="move:${p}" ${blk?'disabled':''}>${p===h?'Đổi nơi ở trong tỉnh':'Dời nhà tới đây'}</button>
     ${p!==h&&RT?`<button class="btn small ghost" data-w63="trade:${p}">Đi buôn tới đây</button>`:''}
     ${p===h?`<button class="btn small ghost" data-page="hokhac">Xem các họ khác</button>`:''}
   </div>${blk&&p!==h?`<p class="note" style="margin-top:6px">${esc(blk)}</p>`:''}`}
function w_situation(){
  const W=S.w;
  const wars=W.wars.map(w=>`<li><b>${esc(w_warName(w))}</b> · mặt trận ${esc(PROV[w.front[0]].n)} và ${esc(PROV[w.front[1]].n)} · còn khoảng ${Math.max(0,w.until-S.t)} tháng${w.a===homeNat()||w.b===homeNat()?' · <span class="down">nước nhà tham chiến</span>':''}</li>`).join('');
  const tens=BORDER.map((b,i)=>({i,t:W.ten[i],ph:W.ph[i]||0,rel:w_rel(b[0],b[1])})).filter(x=>!W.wars.some(w=>w.i===x.i)).sort((a,b)=>(b.rel-a.rel)||(b.t-a.t)).slice(0,6);
  const dis=W.dis.filter(d=>S.t<d.until).map(d=>`<li>${DIS[d.k].n} ở ${esc(REGIONS[d.r].n)}: ${d.provs.map(p=>esc(PROV[p].n)).join(', ')} · mức ${['','nhẹ','vừa','nặng'][d.sev]}${S.t<d.since?' · <b>sắp tới</b>':''}${d.provs.includes(S.loc.p)?' · <span class="down">nơi nhà mình ở</span>':''}</li>`).join('');
  return `<span class="eyebrow">Tình hình thiên hạ</span><h2>Thế giới</h2>
   <p class="kvline"><b>Chiến tranh</b></p>${wars?`<ul class="plain">${wars}</ul>`:'<p class="kvline muted">Hiện chưa có cuộc chiến nào.</p>'}
   <p class="kvline" style="margin-top:8px"><b>Căng thẳng giữa các nước</b></p>
   <div class="tens">${tens.map(x=>`<div class="tenrow ${x.rel?'rel':''}"><span>${esc(pairName63(x.i))}${x.rel?' ★':''}</span><span class="tbar"><i style="width:${Math.round(x.t)}%" class="ph${x.ph}"></i></span><span class="muted">${w_label(x.t)}</span></div>`).join('')}</div>
   <p class="kvline" style="margin-top:8px"><b>Thiên tai</b></p>${dis?`<ul class="plain">${dis}</ul>`:'<p class="kvline muted">Trời yên biển lặng.</p>'}
   <p class="kvline" style="margin-top:8px"><b>Tin truyền tới</b></p>${W.news.length?`<ul class="plain">${W.news.slice(0,8).map(n=>`<li class="${n.rel?'':'muted'}"><small>${dateStr(n.t)}</small> ${esc(n.m)}</li>`).join('')}</ul>`:'<p class="kvline muted">Chưa có tin gì.</p>'}`}
function pageBando(){
  if(!S.w)w_ensure(S);
  const p=mapProv&&PROV[mapProv]?mapProv:S.loc.p;
  return `<div class="grid2"><section class="card"><div class="mapwrap">${mapSVG(p)}</div>
   <p class="note" style="margin-top:6px">Màu chấm là nước cai quản. Vòng đỏ: tiền tuyến. Đường đỏ, cam: căng thẳng đang leo thang. Vòng vàng: thiên tai. Đường gạch: tuyến buôn tới nơi đang chọn.</p></section>
   <section class="card">${w_provPanel(p)}</section>
   <section class="card" style="grid-column:1/-1">${w_situation()}</section></div>`}
/* ---------- họ khác ---------- */
function pageHokhac(){
  if(!S.w)w_ensure(S);
  const L=w_clans().slice().sort((a,b)=>b.fame-a.fame);const P0=PROV[S.loc.p];const ours=w_ourKind();
  const relTxt=r=>r>=60?'thân thiết':r>=25?'mến':r>-15?'xa lạ':r>-45?'bất hòa':'thù oán';
  return `<div class="grid1">${houseCard()}<section class="card"><span class="eyebrow">${esc(locName())}</span><h2>Các họ quanh vùng</h2>
   <p class="kvline">${L.length} dòng họ cùng sống ở ${esc(P0.n)}. Họ nhà mình làm ${CJOB63[ours]}, những họ cùng nghề sẽ là đối thủ làm ăn.</p>
   <div class="clans">${L.map(c=>{const rival=c.job===ours;return `<div class="clanrow">
     <div><b>${c.house?esc(c.sur)+' Gia':'Họ '+esc(c.sur)}</b> <span class="chip ${c.house||c.fame>=150?'gold':''}">${c.house?HOUSE_TIER[c.house.tier]:c.fame>=150?'Danh gia':c.fame>=70?'Có tiếng':'Thường dân'}</span> ${rival?'<span class="chip red">cùng nghề</span>':''} ${c.feud?'<span class="chip red">thù oán</span>':''} ${c.mar?`<span class="chip">thông gia ×${c.mar}</span>`:''}
       <small class="muted">Gia chủ ${esc(c.house?cHeadFull(c):c.head.given)} (${c.head.age} tuổi, ${c.head.tr}) · ${CJOB63[c.job]} · ${w_wealthTxt(c.wealth)} · danh vọng ${Math.round(c.fame)}</small>
       <small>Quan hệ với nhà mình: <b class="${c.rel>=25?'up':c.rel<=-15?'down':''}">${relTxt(c.rel)}</b> (${Math.round(c.rel)})</small></div>
     <div class="acts"><button class="btn small" data-w63="gift:${c.id}">Biếu quà</button>${c.feud||c.rel<=-25?`<button class="btn small ghost" data-w63="peace:${c.id}">Hòa giải</button>`:''}${c.kids.some(k=>k.age>=16&&k.age<=32)?`<button class="btn small ghost" data-w63="wed:${c.id}">Hỏi thông gia</button>`:''}</div></div>`}).join('')}</div></section></div>`}
/* ---------- hành động ---------- */
/* ---------- v6.3.4: biếu quà tính theo thân phận người nhận ---------- */
/* lễ vừa phải là mức hợp với danh vọng và của cải của họ nhận, không phụ thuộc túi tiền nhà mình;
   quà quá nhẹ thì không thân thêm, biếu dồn dập thì tình nghĩa thêm ít dần */
function giftNorm(fame,wealth){const sc=Math.max(0,fame/60+wealth/45);let v=Math.max(60,400*Math.pow(4.6,sc-1.06));
  /* v6.3.5: nhà thường dân vài trăm đồng; nhà có tiếng vài bạc; danh gia vài chục bạc; thế gia vài trăm bạc; danh môn vọng tộc vài vàng */
  const u=v<1000?10:v<20000?100:v<500000?1000:10000;return Math.round(v/u)*u}
function giftTiers(norm){return [
  {k:'mon',n:'Lễ mọn',f:0.35,d:'Chút quà quê, tỏ chút lòng'},
  {k:'vua',n:'Lễ vừa',f:1,d:'Đủ lễ nghĩa với thân phận họ'},
  {k:'hau',n:'Lễ hậu',f:2.2,d:'Hậu hĩnh, ai cũng thấy nhà mình có thành ý'}].map(t=>Object.assign(t,{cost:Math.max(10,Math.round(norm*t.f/10)*10)}))}
const giftRecent=g=>(g||[]).filter(t=>S.t-t<24).length;
/* tình nghĩa thêm (có thể âm) từ một món quà. ratio = giá quà / mức tương xứng */
function giftGain(ratio,tr,recent,relNow){
  let d=ratio<0.3?0:ratio<0.55?R(0,2):ratio<0.85?R(2,5):ratio<1.3?R(7,11):ratio<2?R(10,13):R(11,15);
  if(tr==='tham lam'){d=ratio<0.85?-R(1,3):Math.round(d*1.25)}
  else if(tr==='ngạo mạn'){if(ratio<1)d=-R(1,4)}
  else if(tr==='hẹp hòi'){if(ratio<0.85)d=Math.min(d,0)}
  else if(tr==='chính trực'){if(ratio>=1.5)d=Math.round(d*0.5)}
  else if(tr==='nhân hậu'){if(ratio>=0.3&&ratio<0.85)d+=1}
  if(d>0){d*=Math.pow(0.55,recent);if(relNow>=60)d*=0.5;if(relNow>=80)d*=0.5;d=d>=1?Math.round(d):(chance(d)?1:0)}
  return d}
function giftWhy(ratio,tr,d,recent){
  if(d<0)return tr==='ngạo mạn'?'Họ cho là coi thường, nhận quà mà mặt không vui.':tr==='tham lam'?'Họ chê quà ít, nhận lấy lệ.':'Quà không hợp ý họ.';
  if(d===0)return recent>0&&ratio>=0.5?'Mới biếu chưa lâu, tình nghĩa không thêm.':ratio<0.55?'Quà quá nhẹ so với thân phận họ, họ nhận lấy lệ chứ không nhớ.':'Họ nhận quà, nhưng tình nghĩa vẫn thế.';
  if(ratio<0.85)return 'Quà chưa đủ đầy nhưng có lòng, họ gật đầu.';
  if(ratio>=1.5&&tr==='chính trực')return 'Họ ngại quà quá hậu, nhận mà không vui hẳn.';
  return recent>0?'Biếu thêm lần nữa, tình nghĩa nhích lên chút ít.':'Quà đúng lễ, họ nhớ tình.'}
function giftPopup(o){
  const T=giftTiers(o.norm);const recent=giftRecent(o.gifts);
  openModal(`<h2>${esc(o.title)}</h2><p>${o.intro} Lễ tương xứng với thân phận họ khoảng <b>${money(o.norm)}</b>.${recent?` Hai năm qua đã biếu ${recent} lần, biếu thêm thì tình nghĩa lên chậm.`:''}${o.low?' Nhà mình còn nhỏ, họ ít để ý nên tình nghĩa lên chậm.':''}</p>
   <div class="choices">${T.map((t,i)=>`<button class="btn" data-g="${i}" ${S.money<t.cost?'disabled':''}><strong>${t.n} · ${money(t.cost)}</strong><small>${t.d}</small></button>`).join('')}<button class="btn ghost" data-n>Thôi</button></div>`,false,'menu');
  M.querySelector('[data-n]').onclick=closeModal;
  M.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>{const t=T[+b.dataset.g];if(S.money<t.cost){closeModal();return}
    S.money-=t.cost;const ratio=t.cost/o.norm;let d=giftGain(ratio,o.tr,recent,o.rel);if(o.big&&ratio<0.5&&d>0)d=0;if(o.low&&d>0)d=Math.max(0,Math.round(d*0.5));
    o.apply(d,t,ratio);o.gifts.push(S.t);while(o.gifts.length>8)o.gifts.shift();
    log(`Biếu ${o.who} ${t.n.toLowerCase()} ${money(t.cost)}. ${giftWhy(ratio,o.tr,d,recent)}`);closeModal();save()})}
function w_gift(id){
  const c=w_clan(S.loc.p,id),hd=head();if(!c||!hd)return;c.gifts=c.gifts||[];
  giftPopup({title:`Biếu quà ${cname(c)}`,who:cname(c),norm:giftNorm(c.fame,c.wealth),gifts:c.gifts,tr:c.head.tr,rel:c.rel,big:c.fame>=110||c.wealth>=70,
    intro:`${esc(cnameU(c))} ${c.fame>=150?'là danh gia':c.fame>=70?'có tiếng':'là nhà thường dân'}, ${w_wealthTxt(c.wealth)}.${c.job===w_ourKind()?' Họ cùng nghề nên lòng người khó đoán.':''}`,
    apply:(d,t)=>{if(c.job===w_ourKind())d+=R(-2,1);
      /* nhà nhỏ biếu quà đến mấy cũng chỉ lên tới mức quen biết với nhà lớn */
      const cap=(c.fame>=110&&S.fame<c.fame/4)?45:100;if(d>0&&c.rel+d>cap)d=Math.max(0,cap-c.rel);
      c.rel=clamp(c.rel+d,-100,100);c.last=S.t;if(c.fame>=110&&d>=5)cf(0.6,'Kết thân với danh gia')}})}
function w_peace(id){
  const c=w_clan(S.loc.p,id),hd=head();if(!c||!hd)return;
  const cost=mm(2+c.fame/60);
  choicePopup(hd,'Láng giềng',`Hòa giải với ${cname(c)}`,`Hai họ đang có hiềm khích. Gia chủ ${esc(c.head.given)} ${c.head.tr==='hẹp hòi'||c.head.tr==='ngạo mạn'?'tính khí khó chiều':'tuy còn giận nhưng chịu nghe'}.`,[
    {l:`Mang lễ sang tận nhà nhận lỗi (${money(cost)})`,c:()=>S.money>=cost,r:[{eq:1,khau:0.4},45+(c.head.tr==='nhân hậu'||c.head.tr==='phóng khoáng'?20:0)-(c.head.tr==='hẹp hòi'||c.head.tr==='ngạo mạn'?20:0)],
      y:x=>{S.money-=cost;c.rel=clamp(c.rel+30,-100,100);c.feud=0;return `${esc(cnameU(c))} niềm nở tiếp, hai bên bắt tay làm hòa.`+fx(x,{fame:2,tam:4})},n:x=>{S.money-=Math.round(cost*0.5);c.rel=clamp(c.rel-6,-100,100);return `Bị tiếp lạnh nhạt, lễ vật bị trả về.`+fx(x,{tam:-4})}},
    {l:'Nhờ người có tiếng trong vùng đứng ra',c:()=>S.fame>=40,r:[{eq:0.6,fame:0.5},50],y:x=>{c.rel=clamp(c.rel+22,-100,100);c.feud=0;return 'Có người lớn tuổi đứng ra hòa giải, hai họ nguôi giận.'},n:x=>{c.rel=clamp(c.rel-3,-100,100);return 'Người làm chứng chưa đủ trọng, chuyện đâu vẫn còn đó.'}},
    {l:'Thôi, để thời gian trôi',f:x=>''}]);
}
/* nghề và địa vị của con cháu một họ láng giềng: định một lần, hiện ra khi chọn mối */
const NPCJ63={nong:'nong',buon:'tieunhi',tho:'tho',hoc:'su',vo:'tieu',quan:'thulai',thuoc:'y'};
function w_kidProfile(c,k){
  if(!k.jb){const st=clamp(Math.log2(1+c.fame)*1.15+c.wealth/40-0.6,0,9);k.st=Math.round(st*10)/10;
    k.jb=(k.g==='nữ'&&chance(0.5))?'noi':(NPCJ63[c.job]||'nong');k.jl=npcLv(k.jb,k.st,false)}
  return k}
const w_kidJob=k=>{const J=JOBS[k.jb];return (J.lv[k.jl]||J.lv[0]).n.toLowerCase()};
function w_wed(id){
  const c=w_clan(S.loc.p,id),hd=head();if(!c||!hd)return;
  const ours=alive().filter(p=>inClan(p)&&!p.spouse&&age(p)>=16&&age(p)<=34&&!p.inLaw&&!(p.left));
  const opts=[];
  ours.slice(0,6).forEach(m=>c.kids.filter(k=>k.g!==m.g&&k.age>=16&&k.age<=32&&Math.abs(k.age-age(m))<=8).slice(0,2).forEach(k=>{
    w_kidProfile(c,k);
    const base=0.3+c.rel/220+(S.fame-c.fame)/500+(c.head.tr==='tham lam'?0.05:0)+(m.mi-50)/300;const pr=clamp(base,0.08,0.9);
    opts.push({l:`${m.given} (${age(m)} t) hỏi cưới ${k.g==='nữ'?'cô':'cậu'} ${k.given} ${cname(c)} (${k.age} t, ${w_kidJob(k)})`,s:`Nhà ${CJOB63[c.job]}, danh vọng ${Math.round(c.fame)}. Nhà ${k.g==='nữ'?'gái':'trai'} ${pr>=0.75?'nhiều khả năng nhận lời':pr>=0.5?'có thể nhận lời':pr>=0.3?'còn đắn đo':'khó nhận lời'}`,
      f:x=>{ if(!chance(pr)){c.rel=clamp(c.rel-5,-100,100);return `${esc(cnameU(c))} từ chối khéo, bảo "hai nhà chưa xứng đôi".`+fx(m,{tam:-6})}
        const sp=mkMatch(m,{g:k.g,surname:c.sur,given:k.given,age:k.age,hh:m.hh,stand:k.st,job:k.jb,lv:k.jl});sp.npcClan=c.id;sp.needT=tierIdx();
        c.kids=c.kids.filter(z=>z!==k);c.mar++;c.rel=clamp(c.rel+18,-100,100);
        if(m.g==='nam'){const p2=mkSpouse(m,false,sp);return `Hai nhà thông gia. ${esc(p2.given)} về làm dâu họ ${esc(S.surname)}.`+fx(m,{fame:2})}
        sp.fee=mm(6+c.fame/12);marryOut(m,sp);return `Hai nhà thông gia. ${esc(m.given)} xuất giá về ${esc(cname(c))}.`}}) }));
  if(!ours.length||!opts.length){infoPopup(hd,'Láng giềng',`Chưa có ai để mai mối`,`Nhà mình không có người đến tuổi lập gia thất, hoặc ${esc(cname(c))} không có người hợp tuổi.`);return}
  opts.push({l:'Thôi',f:()=>''});choicePopup(hd,'Thông gia',`Hỏi thông gia ${cname(c)}`,`Nhà có tiếng thì cưới gả cũng thành chuyện đáng bàn.`,opts)}
function movePopup(to){
  const hd=head();if(!hd)return;const same=to===S.loc.p;const P0=PROV[to];
  const blk=moveBlock()||(!same&&w_closed(to)?`Đường vào ${P0.n} đang có giặc, không thể đến.`:'');
  const maxT=({lang:1,bien:1})[P0.k]!=null?({lang:1,bien:1})[P0.k]:2;
  const tiers=[0,1,2].filter(t=>t<=maxT&&(!same||t!==S.loc.t));
  const opts=tiers.map(t=>{const info=moveCost({p:to},t);return {l:`${same?'Dọn lên':'Đến ở'} ${TIERN63[t]}${t===0?' (rẻ, yên tĩnh)':t===1?' (nhộn nhịp hơn)':' (đô hội, tốn kém)'}`,s:`${info.mo>1?info.mo+' tháng đường · ':''}Tốn khoảng ${money(info.cost)}`,c:()=>S.money>=info.cost&&!blk,f:x=>{doMove(to,t,false);return `Cả nhà dọn về ${esc(locName())}.`}}});
  opts.push({l:'Thôi, ở lại',f:()=>''});
  choicePopup(hd,'Dời nhà',same?`Đổi nơi ở trong ${P0.n}`:`Dời nhà tới ${P0.n}`,same?`Dọn sang chỗ khác trong tỉnh. Quan hệ cũ vẫn còn, ruộng đất và cơ sở làm ăn giữ nguyên.`:
    `Dời cả nhà tới ${esc(P0.n)}, ${esc(REGIONS[P0.r].n)}. Phải bán ruộng, bán cơ sở làm ăn ở nơi cũ (mất một phần giá), mất bớt quan hệ và danh vọng cũ, ngoài ra đường xa còn có thể gặp chuyện. ${NAT[P0.nat].n===NAT[homeNat()].n?'':`Nơi đó thuộc ${esc(NAT[P0.nat].n)}.`}${blk?' <b class="down">'+esc(blk)+'</b>':''}`,opts)}
/* ---------- chạy nạn ---------- */
function fleeTargets(){const W=S.w,here=S.loc.p;const dis=p=>W.dis.some(d=>d.provs.includes(p)&&S.t>=d.since-1&&S.t<d.until);const fr=w_front();
  return Object.keys(PROV).filter(p=>p!==here&&!w_closed(p)&&!dis(p)&&!fr[p]&&(W.dmg[p]||0)<10).sort((a,b)=>w_mo(here,a)-w_mo(here,b)||a.localeCompare(b)).slice(0,4)}
function fleePopup(why){
  const hd=head();if(!hd)return;const blk=moveBlock();
  if(blk){choicePopup(hd,'Chạy nạn','Không thể bỏ đi',esc(blk),[{l:'Đành ở lại',f:()=>''}]);return}
  const L=fleeTargets();
  const opts=L.map(p=>{const P0=PROV[p];const info=moveCost({p},0);return {l:`Chạy về ${P0.n}`,s:`${NAT[P0.nat].n} · ${REGIONS[P0.r].n} · ${info.mo} tháng đường · tốn khoảng ${money(Math.round(info.cost*0.4))}`,
    f:x=>{doMove(p,P0.k==='lang'?0:1,true);return `Cả nhà dắt díu nhau về ${esc(locName())}.`}}});
  opts.push({l:'Thôi, ở lại',f:()=>''});
  choicePopup(hd,'Chạy nạn','Chạy nạn tới đâu',`${why||'Không thể ở lại.'} Bỏ ruộng, bỏ cơ sở làm ăn lại, mất phần lớn tài sản mang theo được, nhưng giữ được mạng người. Những nơi dưới đây tạm yên ổn.`,opts)}
function w_bind(app){
  app.querySelectorAll('[data-prov]').forEach(b=>{const go=()=>{mapProv=b.dataset.prov;render()};b.onclick=go;b.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}}});
  app.querySelectorAll('[data-w633]').forEach(b=>b.onclick=()=>{const t=b.dataset.w633;const k=t.slice(0,t.indexOf(':')),v=t.slice(t.indexOf(':')+1);if(k==='gift')h_gift(v);else if(k==='letter')h_letter(v)});
  app.querySelectorAll('[data-w63]').forEach(b=>b.onclick=()=>{const [k,v]=b.dataset.w63.split(':');
    if(k==='move')movePopup(v);else if(k==='trade'){preRoute63=v;tradePopup()}else if(k==='gift')w_gift(v);else if(k==='peace')w_peace(v);else if(k==='wed')w_wed(v)})}

/* ================= v6.3.2 · chức danh · đặc tính khởi đầu · mai mối theo địa vị ================= */

/* ---------- chức danh: chỉ số đủ cao mới có tư cách, nhưng phải được công nhận bằng sự kiện hoặc kỳ ngộ ---------- */
const ctRank=(c,k)=>(c.ct&&c.ct[k]!=null)?c.ct[k]:-1;
/* chỉ số dùng để xét tư cách: sức khỏe lấy theo mức tối đa, không để một trận ốm làm mất tư cách */
const ctStat=(c,k)=>k==='suc'?Math.min(c.cap.suc,c.suc+12):c[k];
function ctRaw(c,k){if(k==='suc')return -1; /* v6.5.4: sức khỏe không rèn lên được, nên không còn danh hiệu theo mốc sức khỏe */
  let i=-1;const v=ctStat(c,k);STITLE[k].forEach(([n],j)=>{if(v>=n)i=j});return i}
/* các chức danh đã đủ chỉ số mà chưa được công nhận */
function ctPending(c){const o=[];for(const [k] of STATS){const r=ctRaw(c,k),h=ctRank(c,k);if(r>h)o.push([k,h+1])}return o}
function ctNote(c){const L=ctPending(c);if(!L.length||c.dead!=null)return '';
  return L.map(([k,i])=>`${SN[k]} đã đủ sức nhận danh hiệu <b>${esc(STITLE[k][i][1])}</b>, đang chờ dịp được người đời công nhận.`).join(' ')}
function confer(c,k,i){
  c.ct=c.ct||{};c.ttl=c.ttl||{};
  if(i<=ctRank(c,k))return '';
  const name=STITLE[k][i][1];
  for(let j=0;j<STITLE[k].length;j++)removeTrait(c,'ct_'+k+'_'+j);
  addTrait(c,'ct_'+k+'_'+i);
  c.ct[k]=i;c.ttl[k]=Math.max(c.ttl[k]==null?-1:c.ttl[k],i);
  const f=Math.round(6+i*5);c.fame+=f;cf(f*0.35,'Người nhà được công nhận danh hiệu');
  S.hung=clamp(S.hung+Math.min(6,1+i*0.6),0,100);
  achieve(c,`được công nhận ${SN[k].toLowerCase()} ${name}`);
  log(`${nameOf(c)} được người đời công nhận là "${name}".`,'gd');
  const T=TRAITS['ct_'+k+'_'+i];
  return ` Từ nay người đời gọi là <b>${esc(name)}</b>. <span class="muted">${esc(T.d)}.</span>`}
const CT_P=[0.04,0.03,0.022,0.017,0.012,0.008,0.006,0.0045,0.0035];
let CTEV=null;
function ctEvents(k,i){if(!CTEV){CTEV={};EVENTS.forEach(e=>{if(e.ct){const key=e.ct[0]+e.ct[1];(CTEV[key]=CTEV[key]||[]).push(e)}})}return CTEV[k+i]||[]}
function ctTick(c){
  if(c.dead!=null||age(c)<14||c.brk||c.away||!inClan(c))return;
  if((c.flags.ctWait||0)>S.t)return;
  /* v6.3.4: đủ chỉ số lâu mà vẫn chưa gặp dịp thì người đời cũng tự gọi tên ở các bậc thấp, khỏi chờ mãi */
  ctPending(c).forEach(([k,i])=>{if((c.flags['ctF_'+k]||0)>S.t)return;const key='ctS_'+k+i;if(c.flags[key]==null)c.flags[key]=S.t;
    if(i<=4&&S.t-c.flags[key]>=30+12*i){if(confer(c,k,i))delete c.flags[key]}});
  const L=ctPending(c).filter(([k])=>!((c.flags['ctF_'+k]||0)>S.t));if(!L.length)return;
  const [k,i0]=pick(L);
  const okEv=j=>ctEvents(k,j).filter(e=>{try{return !e.c||e.c(c)}catch(err){return false}});
  /* người vượt xa mốc được công nhận nhanh hơn, và đôi khi được công nhận thẳng ở bậc cao hơn (đủ danh vọng mới có sự kiện ở bậc ấy) */
  const gap=ctRaw(c,k)-i0+1;let i=i0;
  if(gap>=2)for(let j=i0+gap-1;j>i0;j--)if(chance(0.4)&&okEv(j).length){i=j;break}
  const p=CT_P[i]*(0.6+c.duyen/100)*(1+famLuck()/200)*(1+clamp(c.fame/400,0,1))*(1+Math.min(1,0.4*(gap-1)));
  if(!chance(p))return;
  const ok=okEv(i);if(!ok.length)return;
  let tot=ok.reduce((a,e)=>a+(e.w||1),0),r=Math.random()*tot,ev=ok[0];for(const e of ok){r-=(e.w||1);if(r<=0){ev=e;break}}
  c.seen[ev.id]=S.t;S.evLast=S.evLast||{};S.evLast[ev.id]=S.t;S.evn=S.evn||{};S.evn[ev.id]=(S.evn[ev.id]||0)+1;
  c.flags.ctWait=S.t+R(6,10);
  enqueue('ev',c.id,{ev:ev.id})}
const ctChips=c=>{let h='';for(const [k] of STATS){const i=ctRank(c,k);if(i>=0)h+=`<button class="chip gold" data-info="tr:ct_${k}_${i}">${esc(STITLE[k][i][1])}</button>`}return h};
/* nạp save cũ: ai đang mang danh hiệu theo chỉ số thì giữ nguyên, kèm năng lực */
function ctGrand(st){const real=S;S=st;try{st.people.forEach(c=>{if(c.ct)return;c.ct={};c.ttl=c.ttl||{};
  for(const [k] of STATS){let i=-1;STITLE[k].forEach(([n],j)=>{if(c[k]>=n)i=j});
    if(i>=0){c.ct[k]=i;c.ttl[k]=Math.max(c.ttl[k]==null?-1:c.ttl[k],i);if(c.dead==null)addTrait(c,'ct_'+k+'_'+i)}}})}finally{S=real}}

/* ---------- đặc tính tăng tốc: sinh ra đã hơn người ---------- */
/* grow/growAll/capUp dương nghĩa là có năng khiếu ở chỉ số ấy: gen cao hơn, chỉ số khởi đầu cao hơn; âm thì thấp hơn */
function innateMap(c){
  const out={};const add=(k,min,plus,al)=>{const o=out[k]=out[k]||{min:0,plus:0,al:0};o.min=Math.max(o.min,min);o.plus+=plus;o.al=Math.max(o.al,al)};
  traitsOf(c).forEach(t=>{const T=TRAITS[t];if(!T||T.ct)return;
    if(T.grow)for(const k in T.grow){const v=T.grow[k];if(v>0)add(k,36+Math.round(v*70),Math.round(v*12),60+Math.round(v*75));else add(k,0,Math.round(v*22),0)}
    if(T.growAll>0)['tri','vo','mi','eq'].forEach(k=>add(k,36+Math.round(T.growAll*40),Math.round(T.growAll*10),60+Math.round(T.growAll*45)));
    if(T.growAll<0)['tri','vo','mi','eq'].forEach(k=>add(k,0,Math.round(T.growAll*12),0));
    if(T.capUp)for(const k in T.capUp)if(k!=='suc'&&!(T.grow&&T.grow[k]))add(k,38+Math.round(T.capUp[k]*1.5),Math.round(T.capUp[k]*0.25),60+Math.round(T.capUp[k]*1.4))
    if(T.look)add('mi',80,0,86)});
  if(traitsOf(c).includes('omyeu'))add('suc',0,-10,0);
  return out}
function innateGenes(c){const m=innateMap(c);if(!c.gn)return;for(const k in m){const o=m[k];if(!o.al||!c.gn[k])continue;
  const [a,b]=c.gn[k];const hi=Math.max(a,b,o.al),lo=Math.max(Math.min(a,b),o.al-25);c.gn[k]=[hi,lo]}}
function innateStats(c,stats,young){const m=innateMap(c);
  for(const k in m){const o=m[k];const b=stats[k];if(b==null)continue;
    if(k==='suc'){stats[k]=clamp(b+o.plus,30,100);continue}
    stats[k]=young?clamp(b+Math.round((o.min-40)*0.12)+Math.round(o.plus*0.4),1,30):clamp(Math.max(b,o.min)+o.plus+(o.min?R(0,3):0),5,96)}}
function innate(c,young){innateGenes(c);innateStats(c,c,young);c.cap.suc=Math.max(c.cap.suc,c.suc)}

/* ---------- v6.3.4: tiềm năng = chỉ số tự nhiên đạt tới năm 18 tuổi ----------
   Không học, không rèn gì thêm thì đến 18 tuổi nhân vật cũng đạt chừng ấy; học hành rèn luyện cộng thêm vào.
   Tiềm năng cao thì trẻ tự lớn nhanh hơn, và rèn luyện cũng nhanh hơn (gen). Tướng mạo bẩm sinh (khuynh thành) có ngay từ nhỏ. */
const NATK=['tri','vo','mi','eq'];
function ensureNat(c,adult){
  if(c.nat0||!c.gn)return;
  const m=innateMap(c);const a=age(c);const isAdult=adult!=null?adult:a>=18;c.nat0={};
  if(isAdult){NATK.forEach(k=>{const o=m[k];c.nat0[k]=clamp(Math.round(c[k]-(o?o.plus:0)),5,95)});return}
  const nb={};
  NATK.forEach(k=>{c.nat0[k]=clamp(Math.round(pot(c,k)*R(45,80)/100),5,95);nb[k]=Math.min(c[k],clamp(Math.round(pot(c,k)*0.12)+3,1,30))});
  c.nb=nb;
  /* tướng mạo bẩm sinh: mới sinh đã đẹp hơn người, chứ không đợi lớn */
  if(traitsOf(c).some(t=>TRAITS[t]&&TRAITS[t].look)){const t=natOf(c,'mi');nb.mi=Math.max(nb.mi,Math.round(t*0.6));c.mi=Math.max(c.mi,nb.mi)}
  if(a>0)catchUpYoung(c)}
/* trẻ đã bị thiếu tăng trưởng tự nhiên so với đường tự nhiên của tuổi mình thì bù một lần */
function catchUpYoung(c){
  if(!c.nat0||!c.nb)return;const a=Math.min(18,age(c));if(a<=0)return;
  NATK.forEach(k=>{const t=natOf(c,k),b=Math.min(c.nb[k],t);if(c.nb[k]>t)c.nb[k]=t;const fl=Math.round(b+(t-b)*a/18);if(c[k]<fl)c[k]=Math.min(fl,Math.max(capOf(c,k),c.cap[k]||0))})}
function natAll(c){ensureNat(c);const m=innateMap(c);const o={};NATK.forEach(k=>{const i=m[k];o[k]=clamp(i?Math.max(c.nat0[k],i.min)+i.plus:c.nat0[k],5,96)});return o}
function natOf(c,k){if(!c.nat0)ensureNat(c);if(!c.nat0)return Math.round(pot(c,k)*0.62);const i=innateMap(c)[k];const b=c.nat0[k];return clamp(i?Math.max(b,i.min)+i.plus:b,5,96)}
/* mỗi tháng, trẻ dưới 18 lớn dần về chỉ số tự nhiên */
function natGrowth(c,a){
  if(a<1||a>=18||!c.nat0||!c.nb)return;const N=natAll(c);
  /* v6.4.1.5.1: lớn tự nhiên chỉ kéo người đang thấp hơn đường tự nhiên của tuổi mình lên; đã học vượt thì không cộng chồng thêm */
  NATK.forEach(k=>{const d=(N[k]-c.nb[k])/216;if(d<=0)return;const tgt=c.nb[k]+(N[k]-c.nb[k])*Math.min(18,a+1/12)/18;if(c[k]<tgt)addStat(c,k,Math.min(d*1.5,tgt-c[k]))})}

/* ---------- địa vị của người đi tìm mối, và những người xứng với địa vị ấy ---------- */
function standOf(c){
  let s=tierIdx()*1.1+(c.tuoc||0)*0.9+(c.degree||0)*0.7+clamp((c.fame||0)/180,0,1.5)+clamp(S.fame/1500,0,1.2)+tsum(c,'match');
  if(c.job==='quan')s+=0.3*c.lv;else if(c.job==='quan_ngu')s+=0.25*c.lv;else if(c.job==='chu')s+=0.3*c.lv;else if(['y','su','nghe','tieu'].includes(c.job))s+=0.15*c.lv;
  const sp=spouseOf(c);if(sp&&(sp.tuoc||0))s+=0.4*sp.tuoc;
  return clamp(s,0,10)}
const MJOB_M=[['nong','nong','nong','khuanvac','tieuphu','ngu','chan','hau','hangrong'],['nong','nong','tho','tieunhi','tieuphu','chan','hangrong','tieu'],
  ['tho','tieunhi','tieu','y','su','nghe','tho'],['tho','tieu','y','su','nghe','diaky','thulai'],['y','su','tieu','nghe','thulai','diaky','tho'],
  ['y','su','nghe','thulai','tieu','diaky'],['y','su','nghe','thulai','nguy','diaky']];
const MJOB_F=[['nong','det','hangrong','hau','noi','bep','chan'],['det','noi','nong','tieunhi','bep','mo','noi'],['noi','det','nghe','mo','bep','tieunhi'],
  ['noi','nghe','y','det','mo','su'],['noi','nghe','y','det','mo','su','diaky'],['noi','nghe','y','det','su','diaky','mo'],['noi','nghe','y','su','diaky','det','mo']];
const MTAL={tri:['thongminh','vankhuc','muusi'],vo:['khoemanh','thanluc','satinh'],mi:['duyendang','phongnha','khuynhthanh'],eq:['thaunhan','tamtinh','lacquan'],suc:['khoemanh']};
/* v6.3.5: nghề phải hợp chỉ số. Nghề nặng nhọc cần võ lực và sức khỏe, nghề trí óc cần trí tuệ... */
const PHYS_ST=['vo','suc'];
function statFit(p,id){const J=JOBS[id];if(!J)return 0;
  let v=p[J.st||'eq'];if(v==null)v=40;
  if(PHYS_ST.includes(J.st)){const body=(p.vo*0.5+Math.min(p.suc,100)*0.5);v=Math.min(v,body+8)}
  if(p.g==='nữ'&&['khuanvac','tieu','nhadich','tieuphu','ngu','tho'].includes(id))v-=10;
  return v}
const jobOk=(p,id)=>['none','noi','huu'].includes(id)||statFit(p,id)>=40;
function fitPick(p,list){const pool=list.filter(id=>JOBS[id]);if(!pool.length)return 'nong';
  const w=pool.map(id=>Math.exp((statFit(p,id)-50)/9));const tot=w.reduce((a,b)=>a+b,0);let r=Math.random()*tot;
  for(let i=0;i<pool.length;i++){r-=w[i];if(r<=0)return pool[i]}return pool[0]}
function mjobFor(g,grade,p){const L=(g==='nam'?MJOB_M:MJOB_F)[clamp(grade,0,6)];return p?fitPick(p,L):pick(L)}
/* bậc nghề hợp với địa vị; dừng trước bậc đòi cơ duyên riêng hay học vị */
function npcLv(id,st,jit){const J=JOBS[id];if(!J.lv||J.lv.length<2||id==='nong'||id==='noi')return 0;
  let want=clamp(Math.round((st-2.4)/1.7+(jit?R(-1,1)*0.8:0)),0,J.lv.length-1);
  for(let l=1;l<=want;l++){const r=J.lv[l].req||{};if(r.flag||r.degree){want=l-1;break}}
  return want}
/* đặt nghề cho người chưa vào nhà: chỉ số và thông thạo đủ để xứng với bậc nghề */
function setNpcJob(p,id,st,fixLv){
  const J=JOBS[id];p.job=id;p.lv=0;p.m=0;
  if(J.req)for(const k in J.req)if(p[k]<J.req[k])p[k]=J.req[k]+R(0,6);
  const want=fixLv!=null?Math.min(fixLv,J.lv.length-1):npcLv(id,st,true);
  if(want>0){
    for(let l=1;l<=want;l++){const r=J.lv[l].req||{};for(const k in r){if(k==='m'||k==='flag'||k==='degree')continue;if(k==='fame')p.fame=Math.max(p.fame,r.fame);else if(p[k]<r[k])p[k]=r[k]+R(0,5)}}
    p.lv=want;p.m=(J.lv[want].req.m||0)+R(0,10)}
  else p.m=R(0,30);
  p.mms=p.mms||{};p.mms[id]=[20,40,60,80,100,120].filter(t=>t<=p.m)}
function mkMatch(c,o){
  o=Object.assign({},o||{});
  const g=o.g||(c.g==='nam'?'nữ':'nam');
  const st0=o.stand!=null?o.stand:standOf(c)+(o.up||0);
  const st=clamp(st0+(o.story?1.8:0),0,10.5);
  const base=clamp(26+st*5.8+R(-5,8),18,92);
  const spec={};['surname','given','age','hh'].forEach(k=>{if(o[k]!=null)spec[k]=o[k]});
  const p=mkPerson(Object.assign({g,age:clamp(age(c)+R(-4,3),16,60),lift:Math.round(st*3)},spec,{traits:false}));
  const main=o.main||pick(g==='nam'?['tri','vo','vo','eq','tri']:['mi','mi','eq','tri','eq']);
  ['tri','vo','mi','eq'].forEach(k=>{p[k]=clamp(Math.round(base+R(-16,6)+(k===main?R(10,20):0)+(k==='mi'&&g==='nữ'?R(0,8):0)+(k==='vo'&&g==='nam'?R(0,7):0)),8,97)});
  p.suc=R(58,96);p.cap.suc=Math.max(p.suc,R(88,100));
  /* năng khiếu: địa vị càng cao càng hay có người tài; người trong cốt truyện luôn có */
  const tal=(o.traits||[]).slice();
  if(!tal.length&&(o.story||chance(0.06+0.045*st))){const L=MTAL[main]||MTAL.tri;tal.push(L[Math.min(L.length-1,Math.floor(Math.pow(Math.random(),1.6)*(o.story?L.length:Math.min(L.length,1+st/4))))])}
  tal.forEach(t=>{if(TRAITS[t])addTrait(p,t)});
  /* người thường có thêm tính nết nhẹ như mọi người */
  if(!tal.length&&chance(0.4)){const pool=Object.keys(TRAITS).filter(k=>!TRAITS[k].gene&&!TRAITS[k].ax&&!TRAITS[k].ct&&TRAITS[k].c==='g');addTrait(p,pick(pool))}
  innate(p,false);
  if(o.min)for(const k in o.min)p[k]=Math.max(p[k],o.min[k]);
  p.nat0=null;ensureNat(p,true);
  p.stand=Math.round(st*10)/10;
  /* gia thế nhà bên kia: người càng giỏi, nhà càng kén */
  p.famT=clamp(Math.round(st*0.55+R(-1,1)),0,6);
  if(g==='nữ'&&chance(0.35)&&!o.job&&st>=1.5)o.job='noi';
  {let jid=o.job,lvFix=o.lv;
   if(!jid||(!o.story&&!jobOk(p,jid))){const was=jid;jid=mjobFor(g,Math.round(st/1.5),p);if(was!==jid)lvFix=undefined}
   setNpcJob(p,jid,st,lvFix)}
  STATS.forEach(([k])=>p.ms[k]=MS.filter(t=>p[k]>=t));
  p.fame=Math.max(p.fame,Math.round(st*st*2.2));
  p.stand=Math.round(st*10)/10;
  return p}
const famLine=p=>p.famT>0?`con nhà ${TIERS[p.famT][0].toLowerCase()}`:'nhà bình dân';
function matchmaker(c){
  if(married(c))return;
  const fee=mm(1.5);if(S.money<fee)return;S.money-=fee;
  const st=standOf(c);
  const list=[0,1,2].map(i=>{
    const p=mkMatch(c,{up:(i-1)*0.9,g:c.g==='nam'?'nữ':'nam'});ensurePersona(p);
    const q=(p.tri+p.vo+p.mi+p.eq)/4;
    p.needT=clamp(p.famT+(i===2?1:0),0,6);p.needF=Math.max(0,Math.round((q-48)*3+p.famT*6));
    p.fee=Math.round(mm(q/5+p.famT*0.5)*(1-Math.min(c.mi,100)/250)*(clanLv()>=3?0.6:1));
    return p});
  const ok=p=>tierIdx()>=p.needT&&(c.fame+S.fame*0.2)>=p.needF&&S.money>=p.fee;
  const outOk=c.g==='nữ'&&!isHead(c)&&!c.inLaw&&!married(c);
  const talent=p=>traitsOf(p).filter(t=>!TRAITS[t].ct).slice(0,3).map(t=>TRAITS[t].n);
  openModal(`${headerFor(c)}<span class="eyebrow">Bà mối · đã trả ${money(fee)}</span><h2>Ba mối lương duyên</h2>
   <p class="muted">Nhà mình ${st>=7?'danh giá, bà mối đem đến toàn mối cao':st>=4?'có tiếng, mối đem đến khá hơn người thường':'bình thường, mối đem đến vừa sức'}. Người càng giỏi thì nhà bên kia càng kén: đòi gia thế, danh vọng và sính lễ cao. Mị lực của mình cao được giảm sính lễ. Hiện có ${money(S.money)}.</p>
   <div class="choices">${list.map((p,i)=>`<button class="btn" data-i="${i}" ${ok(p)?'':'disabled'}><strong>${esc(nameOf(p))} · ${age(p)} tuổi · ${esc(jobName(p))}</strong>
   <small>${famLine(p)}${talent(p).length?' · '+talent(p).join(', '):''}</small>
   <small class="num">${STATS.map(([k,n])=>`${n} ${p[k]}`).join(' · ')}</small><small>Sính lễ ${money(p.fee)}${p.needT?` · đòi gia thế từ ${TIERS[p.needT][0]}`:''}${p.needF?` · đòi danh vọng ${p.needF}`:''}</small></button>`).join('')}
   ${outOk?list.map((p,i)=>`<button class="btn" data-o="${i}" ${tierIdx()+1>=p.needT?'':'disabled'}><strong>Gả ${esc(c.given)} về nhà họ ${esc(p.surname)}</strong><small>${esc(p.given)} ${age(p)} tuổi, ${esc(jobName(p).toLowerCase())}, ${famLine(p)}. Gia tộc nhận lại khoảng ${money(Math.round(p.fee*0.6))} sính lễ</small></button>`).join(''):''}
   <button class="btn ghost" data-x>Chưa ưng ai</button></div>`);
  M.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{const p=list[+b.dataset.i];if(!married(c)){S.money-=p.fee;mkSpouse(c,false,p)}closeModal()});
  M.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>{const p=list[+b.dataset.o];marryOut(c,p);closeModal()});
  M.querySelector('[data-x]').onclick=closeModal;
}

/* ================= v6.3.3 · nhân viên là người thật · bảng sản nghiệp gọn ================= */

/* ---------- nhân viên: có tuổi, sức khỏe, lòng trung thành; có thể ốm, nghỉ hưu, bỏ việc, chết ---------- */
const stAge=st=>Math.floor((S.t-(st.born!=null?st.born:S.t-12*30))/12);
function staffInit(st,age0){
  const a=age0!=null?age0:Math.min(58,16+Math.floor(Math.pow(Math.random(),1.35)*42));
  st.born=S.t-12*a-R(0,11);st.hp=clamp(R(62,100)-Math.max(0,a-45)*1.2,25,100);st.sick=0;st.loy=R(45,75);st.since=S.t;return st}
function staffFix(st){if(st.born==null){const a=R(19,50);st.born=S.t-12*a-R(0,11)}
  if(st.hp==null)st.hp=R(60,100);if(st.sick==null)st.sick=0;if(st.loy==null)st.loy=R(50,75);if(st.since==null)st.since=S.t-R(6,60);return st}
/* sức làm việc theo tình trạng: ốm thì kém xa, già hoặc còn quá trẻ thì kém hơn, người được cho làm nhẹ chỉ còn một nửa */
const ageEff=a=>a>=70?0.6:a>=65?0.75:a>=60?0.85:a>=55?0.93:a>=50?0.97:1; /* v6.5.4: năng suất giảm dần theo tuổi */
function staffVigor(st){const a=stAge(st);return (st.sick>0?0.4:1)*(a<18?0.8:ageEff(a))*(st.lite?0.6:1)*(st.hp<35?0.85:1)}
const stHealthTxt=st=>st.sick>0?`đang ốm (${st.sick} tháng nữa)`:st.hp>=75?'khỏe mạnh':st.hp>=50?'sức bình thường':st.hp>=30?'yếu, hay đau':'rất yếu';
/* nghề nặng, dễ tai nạn: xác suất mỗi tháng gặp nạn */
const STACC={phu:.0016,thuyenphu:.0022,tieusu:.0024,vosu:.0012,tho:.0011,thoca:.0009,chantrau:.0012,laibuon:.0012,bep:.0006,dao:.0004};
function stfHazard(a){return a<30?0.0007:a<40?0.0012:a<50?0.0035:a<60?0.009:a<65?0.022:a<70?0.045:0.09} /* xác suất chết vì tuổi, mỗi năm */
function stfActor(b){const ow=P(b.owner);return ow&&inClan(ow)&&!ow.away&&ow.dead==null?ow:head()}
/* v6.4.1.2: ốm, nghỉ hưu, bỏ việc, qua đời của người làm thường chỉ ghi nhật ký; chỉ quản lý, thợ cả, thầy giáo, võ sư mới hiện hộp */
const STF_KEY=['quanly','thoca','thay','vosu'];
function stfEvent(b,ev,data){if(data&&data.role&&!STF_KEY.includes(data.role)){if(ev==='stf_sick')log(`${data.n} ở ${BIZ[b.type].lv[b.lv][0].toLowerCase()} ốm nặng, phải nghỉ mấy tháng.`);return}const c=stfActor(b);if(!c||!EVMAP[ev])return;enqueue('ev',c.id,{ev,data:Object.assign({bid:b.id,bn:BIZ[b.type].lv[b.lv][0]},data)})}
function stfRemove(b,st){b.staff=b.staff.filter(x=>x!==st)}
function stfSnap(st){return {n:st.n,role:st.role,ra:ROLES[st.role]?ROLES[st.role].n.toLowerCase():'người làm',age:stAge(st),yrs:Math.max(0,Math.floor((S.t-(st.since||S.t))/12)),wage:st.wage,g:st.g,sid:st.id}}
function staffDie(b,st,why){
  const sn=stfSnap(st);stfRemove(b,st);
  b.staff.forEach(x=>{x.loy=clamp((x.loy||60)-3,0,100)});
  log(`${sn.n} (${sn.ra} ở ${BIZ[b.type].lv[b.lv][0].toLowerCase()}) qua đời, thọ ${sn.age} tuổi.`,'hi');
  stfEvent(b,'stf_death',Object.assign(sn,{why}))}
function staffTick(b){
  b.staff.slice().forEach(st=>{
    if(!b.staff.includes(st))return;
    staffFix(st);
    const a=stAge(st);const epi=S.epi?1:0;
    /* sức khỏe trôi theo năm */
    if(S.t%12===0)st.hp=clamp(st.hp+R(-3,2)-(a>=50?2:0)+(a<35?1:0),8,100);
    /* ốm */
    if(st.sick>0){st.sick--;
      const dp=0.006+(a>=55?0.014:0)+(st.hp<35?0.025:0)+epi*0.018-(st.care?0.012:0);
      if(chance(Math.max(0.002,dp))){staffDie(b,st,'bệnh nặng');return}
      if(st.sick===0){st.care=0;if(chance(0.12+(st.hp<40?0.15:0)))st.hp=Math.max(8,st.hp-R(6,16))}
    }else{
      const sp=0.006+(a>=50?0.006:0)+(a>=60?0.008:0)+epi*0.02+(st.hp<45?0.008:0)+(S.disaster&&S.disaster.k==='lam'?0.02:0);
      if(chance(sp)){st.sick=R(1,4)+(st.hp<45?1:0);st.care=0;
        if((a>=50||st.hp<50||epi)&&chance(0.55))stfEvent(b,'stf_sick',Object.assign(stfSnap(st),{}));
        else log(`${st.n} ở ${BIZ[b.type].lv[b.lv][0].toLowerCase()} ngã bệnh, nghỉ mấy tháng.`)}}
    /* tai nạn nghề */
    const ar=STACC[st.role]||0;
    if(ar&&chance(ar*(S.war?1.2:1))){
      if(chance(0.13)){staffDie(b,st,'tai nạn lúc làm việc');return}
      st.hp=Math.max(8,st.hp-R(8,22));st.sick=Math.max(st.sick,R(1,3));log(`${st.n} bị thương lúc làm việc ở ${BIZ[b.type].lv[b.lv][0].toLowerCase()}.`)}
    /* tuổi già */
    if(a>=40&&chance(stfHazard(a)/12*(st.hp<40?1.5:1))){staffDie(b,st,'tuổi già');return}
    /* nghỉ hưu */
    if(a>=60&&!st.lite&&chance(a>=66?0.05:0.022)){const sn=stfSnap(st);stfRemove(b,st);log(`${sn.n} xin nghỉ hưu${sn.yrs>=1?` sau ${sn.yrs} năm làm`:''} ở ${BIZ[b.type].lv[b.lv][0].toLowerCase()}.`);stfEvent(b,'stf_retire',sn);return}
    /* lòng trung thành: lương cao hơn mặt bằng thì yên lòng, thấp hơn thì bực */
    const R0=ROLES[st.role];const mw=R0?R0.w*((BIZX[b.type]||{w:1}).w||1):st.wage;
    st.loy=clamp((st.loy||60)+(st.wage>=mw*1.15?0.35:st.wage>=mw*0.9?0.05:-0.45)+(S.t%12===0?R(-2,2):0),0,100);
    if(a<48&&chance(0.0013)){const sn=stfSnap(st);stfRemove(b,st);log(`${sn.n} xin nghỉ ở ${BIZ[b.type].lv[b.lv][0].toLowerCase()}, ${pick(['về quê nối nghề nhà',st.g==='nữ'?'đi lấy chồng xa':'về quê cưới vợ','theo người quen đi làm ăn nơi khác','về chăm cha mẹ già','lập gia đình, dọn sang làng khác'])}.`);return}
    if(st.loy<18&&chance(0.035)){const sn=stfSnap(st);stfRemove(b,st);log(`${sn.n} chán cảnh làm công, xin thôi việc ở ${BIZ[b.type].lv[b.lv][0].toLowerCase()}.`);stfEvent(b,'stf_quit',sn);return}
  })}
function stfRecruitKin(b,role,age0){const st=staffInit(mkStaff(role),age0);st.role=role;st.wage=wageFor(st,b,role);st.tl=Math.max(st.tl,R(35,80));st.loy=R(70,90);b.staff.push(st);return st}

/* ---------- chỗ trống ---------- */
function bizStaffInfo(b){
  const slots=bizSlots(b);const used=new Set();const empty=[];let filled=0;
  slots.forEach(r=>{const st=b.staff.find(s=>s.role===r&&!used.has(s.id));if(st){used.add(st.id);filled++}else empty.push(r)});
  return {slots,filled,empty,total:slots.length,sick:b.staff.filter(s=>s.sick>0).length,old:b.staff.filter(s=>stAge(s)>=60).length}}
const bizVacant=()=>S&&S.biz?S.biz.reduce((n,b)=>n+bizStaffInfo(b).empty.length,0):0;

/* ---------- bảng sản nghiệp gọn ---------- */
function pageKinhdoanh(){
  const can=alive().filter(p=>!p.away&&age(p)>=16).flatMap(p=>Object.keys(BIZ).filter(t=>canOwn(p,t)).map(t=>[p,t]));
  const rows=S.biz.map(b=>{const B=BIZ[b.type],L=B.lv[b.lv];const o=P(b.owner);const k=b.last||bizCalc(b);const si=bizStaffInfo(b);return {b,B,L,o,k,si}});
  const tot={profit:rows.reduce((s,r)=>s+r.k.profit,0),filled:rows.reduce((s,r)=>s+r.si.filled,0),total:rows.reduce((s,r)=>s+r.si.total,0),vac:rows.reduce((s,r)=>s+r.si.empty.length,0),sick:rows.reduce((s,r)=>s+r.si.sick,0)};
  const staffCell=r=>{const {si}=r;if(!si.total)return '<span class="muted">chủ tự làm</span>';
    const miss=si.empty.length;
    return `<span class="num">${si.filled}/${si.total}</span> ${miss?`<span class="chip red" title="${esc(si.empty.map(x=>ROLES[x].n).join(', '))}">Thiếu ${miss}</span>`:'<span class="chip green">Đủ người</span>'}${si.sick?` <span class="chip" title="Người làm đang ốm">ốm ${si.sick}</span>`:''}`};
  return `<div class="grid1"><section class="card"><span class="eyebrow">Sản nghiệp</span><h2>${rows.length?`${rows.length} cơ sở`:'Chưa có cơ sở nào'}</h2>
   ${rows.length?`<p class="kvline">Lãi tháng gần nhất <b class="num ${tot.profit<0?'down':'up'}">${money(tot.profit)}</b> · ${tot.filled}/${tot.total} chỗ làm có người${tot.vac?` · <b class="down">đang thiếu ${tot.vac} người</b>, bấm vào cơ sở để tuyển`:' · đủ người'}${tot.sick?` · ${tot.sick} người đang ốm`:''}</p>
   <div class="tblwrap"><table class="btab"><thead><tr><th>Cơ sở</th><th>Người trông</th><th class="r">Doanh thu</th><th class="r">Lãi tháng</th><th>Nhân sự</th><th></th></tr></thead><tbody>
   ${rows.map(r=>`<tr class="brow" data-bz="${r.b.id}" tabindex="0"><td><b>${esc(r.L[0])}</b><small>${esc(r.B.n)} · bậc ${r.b.lv+1}/${r.B.lv.length}</small></td>
     <td>${r.o&&inClan(r.o)?esc(nameOf(r.o)):'<span class="down">chưa có</span>'}<small>${esc(bizOwnName(r.b))}</small></td>
     <td class="r num">${money(r.k.rev)}</td><td class="r num ${r.k.profit<0?'down':'up'}">${money(r.k.profit)}</td>
     <td>${staffCell(r)}</td><td class="r">${r.si.empty.length?`<button class="btn small" data-qhire="${r.b.id}:${r.si.empty[0]}">Tuyển</button> `:''}<button class="btn small ghost" data-bz="${r.b.id}">Chi tiết</button></td></tr>`).join('')}
   </tbody></table></div>`:'<p class="kvline muted">Mở một cơ sở ở khung bên dưới để bắt đầu.</p>'}</section>
   <section class="card"><span class="eyebrow">Mở cơ sở mới</span>
   ${can.length?`<div class="choices">${can.map(([p,t])=>{const L0=BIZ[t].lv[0];return `<button class="btn" data-openb="${p.id}:${t}" ${canOpenAny(p,L0[1])?'':'disabled'}><strong>${esc(nameOf(p))} mở ${esc(L0[0].toLowerCase())} · ${money(L0[1])}</strong><small>Trần doanh thu ${money(L0[2])}/tháng</small></button>`}).join('')}</div>`:`<p class="kvline muted">Chưa ai đủ sức mở cơ sở. Cần người từ 18 tuổi đang làm nghề hợp với cơ sở (tiểu nhị, thợ, y, dạy học, tiêu sư…), thông thạo nghề ấy từ ${BM_NEED} và quản trị từ ${QL_NEED}.</p>`}</section></div>`;
}
function bizDetail(bid){
  const b=S.biz.find(x=>x.id===bid);if(!b)return;const B=BIZ[b.type],L=B.lv[b.lv],nx=B.lv[b.lv+1];const o=P(b.owner);const k=b.last||bizCalc(b);
  const slots=bizSlots(b);const used=new Set();
  const stRow=st=>{const a=stAge(st);const yrs=Math.floor((S.t-(st.since||S.t))/12);
    return `<div class="srow"><div><b>${esc(st.n)}</b> · ${esc(ROLES[st.role]?ROLES[st.role].n:'Người làm')} · ${a} tuổi<small>${esc(stHealthTxt(st))} · làm ${yrs>=1?yrs+' năm':'chưa đầy năm'} · hiệu quả ${Math.round(staffEff(st,st.role)*100)}% · ${money(st.wage)}/tháng${st.lite?' · làm nhẹ':''}</small>
      <small class="num">Thông tuệ ${st.tt} · Sức ${st.sm} · Khéo ${st.kl} · Tiềm lực ${st.tl} · thạo ${Math.floor(st.m)} · ${(st.loy||60)>=65?'trung thành':(st.loy||60)>=35?'tạm yên':'đang bất mãn'}</small></div><button class="btn small ghost" data-fire="${st.id}">Cho nghỉ</button></div>`};
  const filledH=[],emptyH=[];
  slots.forEach(r=>{const st=b.staff.find(s=>s.role===r&&!used.has(s.id));if(st){used.add(st.id);filledH.push(stRow(st));return}
    emptyH.push(`<div class="srow empty"><div><b class="down">Trống</b> · ${esc(ROLES[r].n)}<small>Cần ${Object.entries(ROLES[r].req).map(([kk,v])=>`${ROLE_ST[kk]} ${v}`).join(', ')}</small></div><button class="btn small" data-hire="${r}">Tuyển</button></div>`)});
  const rowsHTML=filledH.join('')+emptyH.join('');
  const extra=b.staff.filter(s=>!used.has(s.id)); /* người dư, không còn chỗ (sau khi bán bậc) */
  openModal(`<span class="eyebrow">${esc(B.n)} · bậc ${b.lv+1}/${B.lv.length}</span><h2>${esc(L[0])}</h2>
   <p class="kvline">Của: <b>${esc(bizOwnName(b))}</b> · Người trông: ${o&&inClan(o)?`<b>${esc(nameOf(o))}</b>`:'<span class="down">chưa có ai trông</span>'}</p>
   <dl class="kv" style="margin-top:6px"><dt>Doanh thu (trần ${money(L[2])})</dt><dd class="num">${money(k.rev)}</dd><dt>Lương người làm</dt><dd class="num down">${money(k.wages)}</dd><dt>Nguyên liệu, hao phí</dt><dd class="num down">${money(k.mat)}</dd><dt>Tiền thuê, thuế chợ</dt><dd class="num down">${money(k.rent)}</dd><dt><b>Lãi tháng</b></dt><dd class="num ${k.profit<0?'down':'up'}"><b>${money(k.profit)}</b></dd><dt>Đủ người</dt><dd class="num">${Math.round(k.fill*100)}%</dd></dl>
   <h3 style="margin:10px 0 0;font-size:14px">Nhân sự</h3>
   <div class="staff">${rowsHTML||'<p class="note">Cơ sở nhỏ, chủ tự làm.</p>'}${extra.map(stRow).join('')}</div>
   ${nx?`<button class="btn" data-expand style="margin-top:8px;width:100%" ${bizFundGet(b)<nx[1]||expandWhy(b)?'disabled':''}><strong>Mở rộng thành ${esc(nx[0])}</strong><small>${money(nx[1])} từ ${esc(bizOwnName(b).toLowerCase())} · trần doanh thu ${money(nx[2])} · thêm ${nx[4].length} chỗ làm${expandWhy(b)?' · <b class="down">'+esc(expandWhy(b))+'</b>':''}</small></button>`:''}
   <button class="btn ghost" data-sellb style="margin-top:6px;width:100%"><strong>Bán cơ sở · khoảng ${money(bizValue(b))}</strong><small>Giá theo vốn đã bỏ, lãi gần đây${S.war?', đang chiến sự nên bị ép giá':''}</small></button>
   <div class="field" style="margin-top:8px"><label>Chính sách lương</label><select class="sel" data-wpol>${Object.entries(WPOL).map(([k,v])=>`<option value="${k}"${(b.wpol||'auto')===k?' selected':''}>${v}</option>`).join('')}</select><small class="muted">Tự tăng: người làm thạo việc thì tự trả theo mặt bằng, không hỏi. Giữ lương: tiết kiệm nhưng người làm dễ bỏ đi.</small></div>
   ${b.lv>=2?`<label class="field" style="margin-top:6px;display:flex;gap:6px;align-items:center"><input type="checkbox" data-autohire${b.autoHire?' checked':''}> Tự tuyển bù: có người nghỉ thì người trông tự thuê người thay</label>`:''}
   ${!o||!inClan(o)?(()=>{const cs=alive().filter(p=>inClan(p)&&p.hh===bizHH(b)&&age(p)>=16&&!p.biz&&relJob(p,b.type));
     return `<div class="field" style="margin-top:8px"><label>Giao cho người trông</label>${cs.length?`<select class="sel" data-owner><option value="">Chọn người</option>${cs.map(p=>{const w=mgrWhy(p,b);const j=relJob(p,b.type);return `<option value="${p.id}"${w.length?' disabled':''}>${esc(nameOf(p))} · ${esc(jobName(p))} · thông thạo ${Math.floor(jobM(p,j))} · quản trị ${Math.floor(qlOf(p))}${w.length?' · thiếu: '+w.join(', '):''}</option>`}).join('')}</select>`:`<p class="note">Trong ${bizHH(b)===mainHH()?'nhà chính':'chi này'} không ai làm nghề ${esc(relNames(b.type))}.</p>`}<small class="muted">Cần người đang làm nghề ${esc(relNames(b.type))}, thông thạo từ ${BM_NEED}${b.type==='voquan'?' (hoặc võ lực từ 90)':''}, quản trị từ ${QL_NEED}.</small></div>`})():''}
   <div class="choices" style="margin-top:8px"><button class="btn ghost" data-x>Đóng</button></div>`);
  const again=()=>{render();save();setTimeout(()=>{if(!modalOpen()&&S.biz.includes(b))bizDetail(bid)},10)};
  M.querySelector('[data-x]').onclick=closeModal;
  M.querySelectorAll('[data-hire]').forEach(x=>x.onclick=()=>hirePopup(bid,x.dataset.hire));
  M.querySelectorAll('[data-fire]').forEach(x=>x.onclick=()=>{const st=b.staff.find(s=>s.id===x.dataset.fire);if(!st)return;
    confirmBox(`Cho ${esc(st.n)} nghỉ việc?`,`${esc(st.n)} đã làm ${Math.floor((S.t-(st.since||S.t))/12)} năm. Cho nghỉ thì chỗ làm bị trống, những người còn lại sẽ nghĩ đến chuyện của mình.`,'Cho nghỉ',()=>{b.staff=b.staff.filter(s=>s!==st);b.staff.forEach(z=>{z.loy=clamp((z.loy||60)-2,0,100)});log(`Cho ${st.n} nghỉ việc.`);closeModal();again()},()=>{closeModal();setTimeout(()=>bizDetail(bid),10)})});
  const ex=M.querySelector('[data-expand]');if(ex)ex.onclick=()=>{expandBiz(b);closeModal();again()};
  const sb=M.querySelector('[data-sellb]');if(sb)sb.onclick=()=>confirmBox(`Bán ${esc(L[0].toLowerCase())}?`,`Có người trả ${money(bizValue(b))}, tiền về ${esc(bizOwnName(b).toLowerCase())}. Người đang trông sẽ thôi việc.`,'Bán',()=>{sellBiz(b);closeModal();render();save()},()=>{closeModal();setTimeout(()=>bizDetail(bid),10)});
  const wp=M.querySelector('[data-wpol]');if(wp)wp.onchange=()=>{b.wpol=wp.value;save()};
  const ah=M.querySelector('[data-autohire]');if(ah)ah.onchange=()=>{b.autoHire=ah.checked;save()};
  const ow=M.querySelector('[data-owner]');if(ow)ow.onchange=()=>{if(!ow.value)return;const p=P(ow.value);if(!p||mgrWhy(p,b).length)return;becomeChu(p,b);log(`${nameOf(p)} nhận trông coi ${L[0].toLowerCase()}.`);closeModal();again()};
}

/* người đã nghỉ mà nhà chủ giữ lại: lập lại hồ sơ (dùng cho cả "ở lại làm nhẹ" và "tăng lương giữ chân") */
function stfRehire(b,d,wage){
  const R0=ROLES[d.role];if(!R0)return null;
  const st=mkStaff(d.role);st.n=d.n;st.g=d.g||st.g;st.role=d.role;st.born=S.t-12*d.age-R(0,11);st.since=S.t-12*(d.yrs||0);
  st.hp=clamp(R(45,75)-Math.max(0,d.age-55),20,90);st.sick=0;st.m=Math.min(120,(d.yrs||1)*7+R(5,25));
  if(wage){st.wage=wage}else{st.lite=1;st.wage=Math.round((d.wage||600)*0.5/10)*10}
  b.staff.push(st);return st}

/* ================= v6.3.3 · BỐN NHÀ THẾ GIA ================= */
/* Bốn dòng họ có tên, sống ở bốn vùng, đứng đầu bốn việc: võ (biên ải), văn (triều đình), thuốc (Dược Cốc), thủy quân (cảng) */
const HOUSE_DEF=[
  {id:'nguyen',sur:'Nguyễn',given:'Hoàng Long Vũ',age:52,tr:'chính trực',p:'nhan_mon',kind:'vo',tier:6,fame:300,wealth:78,title:'Trấn Bắc đại đô đốc',seat:'ải Nhạn Môn',job:'quan võ',
    kids:[['Hoàng Nam','nam',26],['Lam Anh','nữ',19],['Bảo Vũ','nam',12]]},
  {id:'vu',sur:'Vũ',given:'Quang Tuấn',age:58,tr:'khéo léo',p:'thien_kinh',kind:'quan',tier:6,fame:320,wealth:85,title:'Thượng thư bộ Lại',seat:'kinh thành Thiên Kinh',job:'quan văn',
    kids:[['Minh Triết','nam',31],['Thanh Vân','nữ',22],['Quang Huy','nam',15]]},
  {id:'duong',sur:'Dương',given:'Văn Phương',age:61,tr:'nhân hậu',p:'duoc_coc',kind:'thuoc',tier:5,fame:235,wealth:66,title:'Thái y lệnh',seat:'Dược Cốc',job:'quan văn, thầy thuốc',
    kids:[['Tuệ Lâm','nữ',27],['Văn Thảo','nam',20],['Bích Hạnh','nữ',14]]},
  {id:'kieu',sur:'Kiều',given:'Quang Duy',age:46,tr:'phóng khoáng',p:'bach_sa',kind:'vo',tier:5,fame:215,wealth:70,title:'Thủy sư đô đốc trấn Bạch Sa',seat:'cảng Bạch Sa',job:'quan võ, thủy quân',
    kids:[['Hải Yến','nữ',21],['Quang Hải','nam',17]]}];
const HOUSE_TIER={4:'Danh gia',5:'Thế gia',6:'Danh môn vọng tộc'};
const hdef=id=>HOUSE_DEF.find(d=>d.id===id);
function houseEnsure(st){const W=st.w;if(!W||W.houses)return;W.houses={};
  HOUSE_DEF.forEach(d=>{W.houses[d.id]={head:{given:d.given,age:d.age,tr:d.tr},kids:d.kids.map(k=>({id:'k'+(W.cid++),given:k[0],g:k[1],age:k[2]})),fame:d.fame,wealth:d.wealth,rel:0,last:-99,gen:0,gT:-99,lT:-99,end:(st.t||0)+12*termYears(d.age)}})}
const house=id=>S.w&&S.w.houses?S.w.houses[id]:null;
const houseName=id=>{const d=hdef(id),h=house(id);return `${d.sur} ${h?h.head.given:d.given}`};
function houseRel(id,dv){const h=house(id);if(!h)return 0;h.rel=clamp(h.rel+dv,-100,100);h.last=S.t;return h.rel}
const houseAlly=(id,n)=>{const h=house(id);return !!h&&h.rel>=(n||50)};
const houseRelTxt=r=>r>=70?'tri kỷ':r>=50?'đồng minh':r>=25?'mến':r>-15?'xa lạ':r>-45?'bất hòa':'thù oán';
const houseKid=(id,pred)=>{const h=house(id);return h?h.kids.find(pred):null};
function houseYear(){
  const W=S.w;if(!W||!W.houses)return;
  HOUSE_DEF.forEach(d=>{const h=W.houses[d.id];if(!h)return;
    h.head.age++;h.kids.forEach(k=>k.age++);
    h.fame=clamp(h.fame+R(-5,6)+(h.wealth-60)/30,40,360);h.wealth=clamp(h.wealth+R(-6,6),20,100);
    if(h.rel>relBase(h)&&h.rel<50)h.rel-=0.6;else if(h.rel<relBase(h))h.rel+=0.6;if(h.oan)h.oan*=0.97;   /* tình thân nhạt dần nếu không vun đắp; đã là đồng minh thì bền */
    if(h.end==null)h.end=S.t+12*termYears(h.head.age);
    if(S.t>=h.end||h.head.age>=88){
      const old=houseName(d.id),oa=h.head.age;clanSucc(h,PROV[d.p].r,20);
      w_news(`Gia chủ ${old} ${oa>=72?'qua đời':'nhường chức, lui về an dưỡng'}. ${houseName(d.id)} nối chức, ${d.sur} Gia vẫn giữ nếp cũ.`,hnear(d.id))}
    h.kids=h.kids.filter(k=>!(k.age>=30&&chance(0.45)));
    if(h.kids.length<3&&h.head.age<58&&chance(0.35)){const gg=chance(0.5)?'nam':'nữ';h.kids.push({id:'k'+(W.cid++),given:outsiderName(gg,PROV[d.p].r).given,g:gg,age:0})}
    if(h.kids.length<2){const gg=chance(0.5)?'nam':'nữ';h.kids.push({id:'k'+(W.cid++),given:outsiderName(gg,PROV[d.p].r).given,g:gg,age:R(3,12)})}})}
/* ---------- v6.3.5: chỉ những nhà ở ngay nơi mình sống ("tại") hoặc ở gần (trong hai tháng đường) mới có chuyện với nhà mình ---------- */
const NEAR_MO=2;
function houseRefs(){
  const W=S.w;if(!W||!W.houses||!S.loc)return [];const here=S.loc.p;const out=[];
  const mo=p=>p===here?0:w_mo(here,p);
  HOUSE_DEF.forEach(d=>{const m0=mo(d.p);if(W.houses[d.id]&&m0<=NEAR_MO&&(d.p===here||!w_closed(d.p)))out.push({t:'H',id:d.id,p:d.p,at:d.p===here,mo:m0,key:'H'+d.id})});
  Object.keys(PROV).forEach(p=>{if(SEATS.includes(p))return;const m0=mo(p);if(m0>NEAR_MO||(p!==here&&w_closed(p)))return;
    w_clans(p).forEach(c=>{if(c.house)out.push({t:'C',id:c.id,p,at:p===here,mo:m0,key:'C'+c.id})})});
  return out}
/* hồ sơ chung của một nhà (bốn thế gia lớn hay danh gia địa phương) cho các sự kiện dùng chung */
function hinfo(r){
  if(!r)return null;
  if(r.t==='H'){const d=hdef(r.id),h=house(r.id);if(!d||!h)return null;
    return {t:'H',id:r.id,p:d.p,name:`${d.sur} Gia`,sur:d.sur,kind:d.kind,job:d.job,tier:d.tier,seat:d.seat,title:d.title,tr:h.head.tr,headN:houseName(r.id),rel:h.rel,fame:h.fame,wealth:h.wealth,kids:h.kids,addRel:dv=>houseRel(r.id,dv),obj:h}}
  const c=w_clan(r.p,r.id);if(!c)return null;
  return {t:'C',id:c.id,p:r.p,name:cname(c),sur:c.sur,kind:c.job,job:CJOB63[c.job],tier:c.house?c.house.tier:3,seat:PROV[r.p].n,title:c.house?c.house.title:'',tr:c.head.tr,headN:cHeadFull(c),rel:c.rel,fame:c.fame,wealth:c.wealth,kids:c.kids,addRel:dv=>{c.rel=clamp(c.rel+dv,-100,100);c.last=S.t},obj:c}}
const hnear=id=>{const d=hdef(id);return !!d&&!!S.loc&&(d.p===S.loc.p||w_mo(S.loc.p,d.p)<=NEAR_MO)};
/* mỗi tháng có thể có một chuyện từ các nhà ấy. Nhà nhỏ vô danh thì ít ai để mắt tới */
function houseTick(mo){
  const W=S.w;if(!W||!W.houses||S.queue.length>3)return;
  const hd=head();if(!hd)return;
  /* v6.4.1.3: Bần hộ, Thường dân không được danh gia đoái hoài; chưa tới Hương thân thì bốn đại gia không để mắt tới (sửa tạm, làm lại ở hệ hảo cảm) */
  const ti0=tierIdx();if(ti0<2)return;
  if(!chance(0.055))return;
  const refs=houseRefs();if(!refs.length)return;
  const cand=[];
  refs.forEach(r=>{if(r.t==='H'&&ti0<3)return;const I=hinfo(r);if(!I)return;
    const base=1+clamp(I.rel/40,-0.6,1.6)+(r.at?1:0);
    EVENTS.forEach(e=>{
      let ok=false;
      if(e.house)ok=r.t==='H'&&e.house===r.id&&r.at;           /* chuyện riêng của bốn nhà: chỉ khi mình sống ngay nơi họ ở */
      else if(e.hg)ok=(e.hg==='at'?r.at:!r.at)&&(!e.hk||e.hk.includes(I.kind))&&(!e.ht||e.ht.includes(r.t));
      if(!ok)return;
      const ck=e.id+'|'+r.key;if((S.cool[ck]||-1e9)>S.t)return;
      try{if(e.hc&&!e.hc(hd,I.obj,I))return}catch(err){return}
      cand.push({e,r,I,w:base*(e.hw||1),ck})})});
  if(!cand.length)return;
  let tot=cand.reduce((a,x)=>a+x.w,0),rr=Math.random()*tot,pk=cand[0];for(const x of cand){rr-=x.w;if(rr<=0){pk=x;break}}
  const e=pk.e;S.cool[pk.ck]=S.t+(e.hcd||60);
  let actor=hd;
  if(e.hwho){const L=alive().filter(p=>inClan(p)&&inMain(p)&&!p.away&&p.dead==null&&age(p)>=12&&(()=>{try{return e.hwho(p,pk.I.obj,pk.I)}catch(err){return false}})());if(!L.length){S.cool[pk.ck]=S.t+6;return}actor=pick(L)}
  enqueue('ev',actor.id,{ev:e.id,data:e.house?{h:e.house}:{hr:pk.r}})}
function houseCard(){
  const W=S.w;if(!W||!W.houses)return '';
  const refs=houseRefs().sort((a,b)=>(b.at-a.at)||(a.mo-b.mo)||(a.t<b.t?-1:1));
  const row=r=>{const I=hinfo(r);if(!I)return '';const rt=I.rel;
    const key=r.t==='H'?`H:${r.id}`:`C:${r.p}:${r.id}`;
    return `<div class="clanrow"><div><b>${esc(I.name)}</b> <span class="chip gold">${HOUSE_TIER[I.tier]||'Danh gia'}</span> <span class="chip">${esc(I.job)}</span> ${r.at?'<span class="chip blue">cùng nơi ở</span>':`<span class="chip">${r.mo} tháng đường</span>`} ${rt>=50?'<span class="chip green">đồng minh</span>':''}${rt<=-25?'<span class="chip red">bất hòa</span>':''}
       <small class="muted">${I.title?esc(I.title)+' · ':''}${esc(I.seat)}${r.at?'':` (${esc(REGIONS[PROV[I.p].r].n)})`} · gia chủ ${esc(I.headN)}, ${esc(I.tr)} · danh vọng ${Math.round(I.fame)}</small>
       <small>Quan hệ với nhà mình: <b class="${rt>=25?'up':rt<=-15?'down':''}">${houseRelTxt(rt)}</b> (${Math.round(rt)})</small></div>
     <div class="acts"><button class="btn small" data-w633="gift:${key}">Gửi lễ vật</button><button class="btn small ghost" data-w633="letter:${key}">Gửi thư thăm hỏi</button></div></div>`};
  return `<section class="card"><span class="eyebrow">Danh gia vọng tộc</span><h2>Những nhà có tiếng quanh nơi ở</h2>
   <p class="kvline">Nơi nào cũng có một hai nhà có tiếng. Chỉ nhà ở ngay nơi mình sống, hoặc ở gần (trong hai tháng đường) mới biết đến và qua lại với nhà mình; càng xa càng không ai hay. Bốn thế gia lớn hùng cứ bốn nơi: Nhạn Môn, Thiên Kinh, Dược Cốc, Bạch Sa.</p>
   <div class="clans">${refs.length?refs.map(row).join(''):'<p class="note">Quanh đây chưa có nhà nào có tiếng để qua lại. Dời nhà đến nơi khác sẽ gặp những nhà khác.</p>'}</div></section>`}
function h_refFromKey(key){const a=key.split(':');return a[0]==='H'?{t:'H',id:a[1],at:true,mo:0,key:'H'+a[1],p:hdef(a[1]).p}:{t:'C',p:a[1],id:a[2],at:a[1]===S.loc.p,mo:a[1]===S.loc.p?0:w_mo(S.loc.p,a[1]),key:'C'+a[2]}}
function h_gift(key){
  const r=h_refFromKey(key);const I=hinfo(r);if(!I)return;const o=I.obj;o.gifts=o.gifts||[];
  giftPopup({title:`Gửi lễ đến ${I.name}`,who:I.name,norm:giftNorm(I.fame,I.wealth),gifts:o.gifts,tr:I.tr,rel:I.rel,big:1,low:tierIdx()<2&&S.fame<40,
    intro:`${r.at?'Lễ vật mang sang tận nhà.':`Lễ vật gửi người đi đường xa tới ${esc(I.seat)}.`}`,
    apply:(dv)=>{
      if(!r.at&&dv>0)dv=Math.max(0,Math.round(dv*0.7));
      const cap=(I.fame>=110&&S.fame<I.fame/4)?45:100;if(dv>0&&I.rel+dv>cap)dv=Math.max(0,cap-I.rel);
      I.addRel(dv);o.gT=S.t;if(I.t==='C'&&I.fame>=110&&dv>=5)cf(0.6,'Kết thân với danh gia')}})}
function h_letter(key){
  const r=h_refFromKey(key);const I=hinfo(r);if(!I)return;const o=I.obj;const cost=mm(0.3);
  if(S.money<cost||S.t-(o.lT||-99)<6){confirmBox('Thư thăm hỏi',S.t-(o.lT||-99)<6?'Mới gửi thư chưa lâu. Đợi vài tháng nữa.':'Không đủ tiền gửi thư.','Thôi',closeModal,closeModal);return}
  S.money-=cost;o.lT=S.t;I.addRel(R(1,3));log(`Gửi thư thăm hỏi ${I.name}.`);render();save()}

/* ================= v6.3.3 · ÂN OÁN PHẠM TRUNG KIÊN VÀ NGUYỄN THÀNH DUY ================= */
/* Kéo dài từ 10 đến 40 năm. S.vil: trạng thái cả câu chuyện. K = Kiên (nắm quyền), D = Duy (mưu sĩ).
   ch: 0 chưa bắt đầu, 1 chờ mưu sĩ, 2 giằng co, 3 Duy bán ải, 4 thời cơ. pf = chứng cứ, wit = nhân chứng, dt = dân tâm (0 đến 100). */
const KIEN='Phạm Trung Kiên',DUY='Nguyễn Thành Duy';
const KRANK=['hào lý','chánh tổng','tri huyện','tri phủ','tổng trấn'];
const KPOW=[30,46,62,78];
function vilEnsure(st){if(!st.vil)st.vil={on:0,t0:null,ch:0,next:0,q:0,qt:0,K:{age:33,pow:18,rank:0,ok:1},D:{age:29,pow:10,ok:1,link:0},pf:0,wit:0,dt:0,fl:{},done:{},np:0,nl:0,hist:[],end:null,tries:0,stance:'',hideN:0,lastRank:0}}
const vil=()=>S.vil;
/* v6.3.5: nhánh ân oán. Sau giai đoạn mở đầu nhà mình chọn một hướng; mỗi hướng có chuỗi chuyện riêng, đổi điều kiện cần của con đường kết thúc tương ứng */
const VBR={phap:{n:'Đường công đường',st:'watch',k:'Xp'},vo:{n:'Đường võ lực',st:'fight',k:'Xv'},tai:{n:'Đường tiền bạc',st:'watch',k:'Xt'},tam:{n:'Đường dân tâm',st:'fight',k:'Xd'},nhan:{n:'Nhẫn nhịn chờ thời',st:'hide',k:'Xn'}};
function vBranch(b){const v=S.vil;if(!v||!VBR[b])return '';v.br=b;v.brT=S.t;v.stance=VBR[b].st;v.hideN=0;vilLog(`Nhà mình chọn hướng: ${VBR[b].n.toLowerCase()}.`);return ''}
const vFi=k=>{const v=S.vil;v.fl[k]=(v.fl[k]||0)+1;return ''};
function vilLog(m){const v=S.vil;v.hist.unshift({t:S.t,m});if(v.hist.length>24)v.hist.length=24}
/* kết thúc một bước: xóa cờ đang chờ, hẹn bước sau sau a đến b tháng (kéo dài thêm tùy thế lực Kiên và thái độ gia tộc) */
function vd(a,b,note){const v=S.vil;if(!v)return '';v.q=0;const extra=v.stance==='hide'?R(2,5):v.stance==='fight'?-R(0,2):0;
  v.next=S.t+Math.max(3,R(a,b)+extra+(v.K.rank>=3?2:0));if(note)vilLog(note);return ''}
function vAdd(k,n,cap){const v=S.vil;v[k]=clamp((v[k]||0)+n,0,cap==null?100:cap);return ''}
function kPow(n){const v=S.vil;v.K.pow=clamp(v.K.pow+n,0,100);return ''}
function vFlag(k,val){S.vil.fl[k]=val==null?1:val;return ''}
function vStance(s){const v=S.vil;v.stance=s;return ''}
function vPick(arr){return arr[Math.floor(Math.random()*arr.length)]}
const vilQuan=()=>Math.max(-1,...alive().filter(p=>inClan(p)&&!p.away&&p.job==='quan').map(p=>p.lv));
const vilFighters=()=>alive().filter(p=>inClan(p)&&p.dead==null&&age(p)>=17&&age(p)<=58&&p.vo>=60).length;
/* các con đường kết thúc câu chuyện, mỗi đường cần nhiều điều kiện khác nhau của gia tộc */
function vilRoutes(){
  const ally=(id,n)=>hnear(id)&&houseAlly(id,n);
  const v=S.vil,K=v.K;const need={pf:5+Math.min(4,K.rank),wit:K.rank>=2?3:2};
  const br=v.br,np=(id,base)=>Math.max(1,base+((br&&br!==id&&br!=='nhan')?1:0)-(br===id?1:0)),fn=k=>(v.fl[k]||0)>=2;
  const ck=(t,ok)=>({t,ok:!!ok});
  const biz=S.biz.length>=2||S.biz.some(b=>b.lv>=2)||(v.fl.bTai||0)>=2;
  const R1=[ck(`Chứng cứ từ ${np('phap',need.pf)} (hiện ${v.pf})`,v.pf>=np('phap',need.pf)),ck(`Nhân chứng từ ${need.wit} (hiện ${v.wit})`,v.wit>=need.wit),
    ck('Có chỗ dựa trên công đường: người nhà làm quan từ thất phẩm, hoặc quan hệ với họ Vũ từ 40, hoặc danh vọng gia tộc từ 250',vilQuan()>=2||ally('vu',40)||S.fame>=250||fn('bPhap')),ck(`Lệ phí kiện tụng ${money(mm(40))}`,S.money>=mm(40))];
  const R2=[ck(`Chứng cứ từ ${np('vo',need.pf-3)} (hiện ${v.pf})`,v.pf>=np('vo',need.pf-3)),ck('Có người đánh được: ít nhất hai người nhà võ lực từ 60, hoặc quan hệ với họ Nguyễn hay họ Kiều từ 40 (nhà ở gần)',vilFighters()>=2||ally('nguyen',40)||ally('kieu',40)||fn('bVo')),ck(`Tiền chiêu mộ ${money(mm(60))}`,S.money>=mm(60)),ck(`Dân tâm từ 20, để khỏi bị coi là loạn đảng (hiện ${Math.round(v.dt)})`,v.dt>=20)];
  const R3=[ck(`Chứng cứ từ ${np('tai',need.pf-3)} (hiện ${v.pf})`,v.pf>=np('tai',need.pf-3)),ck('Có cơ sở làm ăn: hai cơ sở trở lên hoặc một cơ sở bậc 3',biz),ck('Quan hệ với họ Dương từ 40, hoặc tiền mặt từ '+money(mm(400)),ally('duong',40)||S.money>=mm(400)),ck(`Vốn ${money(mm(150))}`,S.money>=mm(150))];
  const R4=[ck(`Dân tâm từ ${br==='tam'?45:55} (hiện ${Math.round(v.dt)})`,v.dt>=(br==='tam'?45:55)),ck(`Chứng cứ từ ${np('tam',need.pf-2)} (hiện ${v.pf})`,v.pf>=np('tam',need.pf-2)),ck('Danh vọng gia tộc từ 300, hoặc đã có nhiều người trong vùng đứng về phía mình',S.fame>=300||fn('bTam'))];
  return [{id:'phap',n:'Kiện lên công đường',L:R1,ok:R1.every(x=>x.ok)},{id:'vo',n:'Dùng võ lực bắt giữ',L:R2,ok:R2.every(x=>x.ok)},{id:'tai',n:'Bóp nghẹt tài lực',L:R3,ok:R3.every(x=>x.ok)},{id:'tam',n:'Dân chúng đồng thanh',L:R4,ok:R4.every(x=>x.ok)}]}
const vilReady=()=>vilRoutes().filter(r=>r.ok);
function vilPool(kind){
  const v=S.vil,hd=head();
  return EVENTS.filter(e=>{if(e.vs!==kind)return false;
    const dn=v.done[e.id];if(dn!=null&&(e.vonce!==false||S.t-dn<(e.vcd||48)))return false;
    try{return !e.vc||e.vc(hd,v)}catch(err){return false}})}
function vWPick(L){let tot=L.reduce((a,e)=>a+(e.vw||1),0),r=Math.random()*tot;for(const e of L){r-=(e.vw||1);if(r<=0)return e}return L[0]}
function vilStart(){
  const v=S.vil;v.on=1;v.t0=S.t;v.ch=1;v.next=S.t+R(1,2);v.K.pow=R(16,22);
  vilLog('Tin đồn về một kẻ tên Phạm Trung Kiên bắt đầu lan khắp vùng.');
  log('Trong vùng đang nổi lên một kẻ tên Phạm Trung Kiên. Người ta kháo nhau hắn có chỗ dựa lớn và không ai dám đụng vào.','hi')}
function vilTick(mo){
  const v=S.vil;if(!v||v.end)return;
  if(!v.on){ /* điều kiện khởi đầu: đã có cái để mất, và đã sống ở đây một thời gian */
    const hd=head();if(!hd||S.t<60||age(hd)<22||S.war)return;
    /* v6.3.5: chỉ nhắm vào nhà có người làm quan từ ngũ phẩm trở lên; nhà dân thường không đáng để một hào lý mưu sĩ để mắt */
    if(vilQuan()>=4&&chance(S.t>=120?0.05:0.03))vilStart();
    return}
  if(S.t%12===0){v.K.age++;v.D.age++;
    kPow(R(0,2)+(v.stance==='hide'?2:0)+(v.K.rank>=3?0:0));
    vAdd('dt',v.stance==='fight'?1:v.stance==='hide'?-1:0);
    const nat=(x,who)=>{if(x.ok&&x.age>=66&&chance((x.age-65)*0.035)){x.ok=0;vilLog(`${who} qua đời vì tuổi già.`);log(`${who} đã chết vì tuổi già.`,'hi');return true}return false};
    nat(v.K,KIEN);nat(v.D,DUY);
    if(!v.K.ok){vilNatural();return}}
  if(S.t-v.t0>=480){vilNatural();return}
  if(v.q&&S.t-v.qt>8)v.q=0;
  if(v.q||S.t<v.next||modalOpen())return;
  const hd=head();if(!hd)return;
  const pk=vilNext();if(!pk||!pk.ev||!EVMAP[pk.ev]){v.next=S.t+3;return}
  v.q=1;v.qt=S.t;v.done[pk.ev]=S.t;
  enqueue('ev',(pk.who||hd).id,{ev:pk.ev,data:Object.assign({},pk.data)})}
function vilNext(){
  const v=S.vil,K=v.K,hd=head();
  if(v.ch===1){
    if(!v.fl.a){const L=vilPool('A');if(L.length)return {ev:vWPick(L).id};v.fl.a=1}
    if(!v.fl.b){const L=vilPool('B');if(L.length)return {ev:vWPick(L).id};v.fl.b=1}
    v.ch=2;v.next=S.t+R(3,6);return null}
  if(v.ch===0)return null;
  /* Kiên leo lên: mua quan, chiếm chức */
  if(K.ok&&K.rank<4&&K.pow>=KPOW[K.rank]&&S.t-v.lastRank>=36)return {ev:'vil_r',data:{to:K.rank+1}};
  if(v.ch===2&&S.t-v.t0>=60&&K.rank>=1){v.ch=D_ok()?3:4}
  if(v.ch===3){
    const pend=EVENTS.some(e=>e.vs==='D'&&v.done[e.id]==null);
    if(!pend)v.ch=4;
    else{const L=vilPool('D');if(L.length)return {ev:L.sort((a,b)=>(a.vo||0)-(b.vo||0))[0].id}}}
  if(v.ch>=4&&S.t-v.t0>=120&&vilReady().length&&(S.t-(v.zT||-99))>=18){v.zT=S.t;return {ev:'vil_z0'}}
  /* người chơi đã nằm im quá lâu: sực tỉnh */
  if(v.stance==='hide'&&v.hideN>=3&&!v.fl.tinh){v.fl.tinh=1;return {ev:'vil_s_tinh'}}
  /* v6.3.5: ngã rẽ lần đầu sau mở đầu; ai chọn nhẫn nhịn thì ba năm sau được hỏi lại */
  if(v.ch>=2&&!v.br&&!v.fl.nga){v.fl.nga=1;return {ev:'vil_b_nga'}}
  if(v.br==='nhan'&&!v.fl.nga2&&S.t-(v.brT||S.t)>=36){v.fl.nga2=1;return {ev:'vil_b_nga',data:{again:1}}}
  if(v.br&&VBR[v.br]&&v.br!=='nhan'&&v.ch>=2&&chance(0.42)){
    const BL=vilPool(VBR[v.br].k);
    if(BL.length){const be=vWPick(BL);if(be.vwho){const w=pickWho(be.vwho,be.vmin);if(w)return {ev:be.id,who:w}}else return {ev:be.id,who:null}}}
  if(v.br==='nhan'){const BL=vilPool('Xn');if(BL.length&&chance(0.5)){const be=vWPick(BL);return {ev:be.id,who:null}}}
  const pr=Math.min(0.9,(v.stance==='hide'?0.72:v.stance==='fight'?0.38:0.52)+0.03*K.rank);
  const first=chance(pr)?'P':'L',second=first==='P'?'L':'P';
  let L=vilPool(first);if(!L.length)L=vilPool(second);
  if(v.stance==='hide'&&!L.length)L=vilPool('P');
  if(!L.length)return null;
  const e=vWPick(L);if(e.vs==='P'&&v.stance==='hide')v.hideN++;
  if(e.vwho){const w=pickWho(e.vwho,e.vmin);if(!w)return null;return {ev:e.id,who:w}}
  return {ev:e.id,who:null}}
const D_ok=()=>S.vil.D.ok;
function pickWho(f,minAge){const L=alive().filter(p=>inClan(p)&&!p.away&&p.dead==null&&age(p)>=(minAge==null?14:minAge)&&(()=>{try{return f(p)}catch(err){return false}})());return L.length?pick(L):null}
/* sau 40 năm, hoặc khi cả hai đã khuất: câu chuyện khép lại không phải bằng công lý mà bằng thời gian */
function vilNatural(){
  const v=S.vil;if(v.end)return;v.end='fade';v.q=0;
  vilLog(v.K.ok||v.D.ok?'Bốn mươi năm trôi qua, hai kẻ ấy già yếu, không còn sức làm hại ai. Mối ân oán khép lại bằng thời gian.':'Kiên đã khuất, Duy mất chỗ dựa. Mối ân oán khép lại bằng thời gian.');
  v.K.ok=0;v.D.ok=0;
  const hd=head();if(hd&&EVMAP.vil_e_fade)enqueue('ev',hd.id,{ev:'vil_e_fade'})}
/* kết thúc: thắng */
function vilEnd(how){const v=S.vil;v.end=how;v.q=0;vilLog(how==='won'?'Phạm Trung Kiên và Nguyễn Thành Duy đã bị trừng trị.':'Ân oán khép lại.')}
function vilYears(){const v=S.vil;return v&&v.on?Math.floor((S.t-v.t0)/12):0}
/* bảng hồ sơ ở trang Gia tộc */
function vilCard(){
  const v=S.vil;if(!v||!v.on)return '';
  const K=v.K,D=v.D;const yrs=vilYears();
  const pw=n=>n>=75?'rất lớn':n>=55?'lớn':n>=35?'đáng ngại':'còn yếu';
  const routes=vilRoutes();
  const ch=['','Mới xuất hiện','Giằng co','Duy giăng lưới','Chờ thời cơ'][v.end?0:Math.min(4,v.ch)]||'';
  const bar=(n,max)=>`<span class="num">${n}</span>`;
  return `<section class="card" style="grid-column:1/-1"><span class="eyebrow">Hồ sơ ân oán</span><h2>${esc(KIEN)} và ${esc(DUY)}</h2>
   ${v.end?`<p class="kvline">${v.end==='won'?'Câu chuyện đã khép lại: hai kẻ ấy đã bị trừng trị.':'Câu chuyện đã khép lại.'} Kéo dài ${yrs} năm.</p>`:`
   <dl class="kv"><dt>Đã kéo dài</dt><dd class="num">${yrs} năm</dd><dt>Giai đoạn</dt><dd>${ch}</dd>
   <dt>${esc(KIEN)}</dt><dd>${K.ok?`${KRANK[K.rank]}, ${K.age} tuổi, thế lực ${pw(K.pow)}`:'đã khuất'}</dd>
   <dt>${esc(DUY)}</dt><dd>${D.ok?`${D.age} tuổi, ${v.fl.war?'đã trốn sang Lang bộ':v.fl.duyOut?'bị vạch mặt, đang lẩn trốn':D.link?'đã tiếp cận nhà mình':v.fl.duyKnown?'xuất thân họ Nguyễn, bị ruồng bỏ':'chưa rõ lai lịch'}`:'đã khuất'}</dd>
   <dt>Chứng cứ</dt><dd class="num">${v.pf}</dd><dt>Nhân chứng</dt><dd class="num">${v.wit}</dd><dt>Dân tâm</dt><dd class="num">${Math.round(v.dt)}</dd>
   <dt>Hướng đi</dt><dd>${v.br&&VBR[v.br]?esc(VBR[v.br].n):'chưa chọn'}</dd><dt>Thái độ nhà mình</dt><dd>${v.stance==='fight'?'chủ động đối phó':v.stance==='watch'?'âm thầm ghi chép':v.stance==='hide'?'nhẫn nhịn':'chưa định'}</dd></dl>
   <div style="margin-top:8px"><b style="font-size:13px">Con đường kết thúc (cần đủ điều kiện)${v.ch>=4?'':' · chỉ mở sau khi hai kẻ ấy lộ rõ bộ mặt'}</b>
   ${routes.map(r=>`<div class="srow${r.ok?'':' empty'}" style="margin-top:6px"><div><b>${esc(r.n)}</b> ${r.ok?'<span class="chip green">đủ điều kiện</span>':'<span class="chip red">chưa đủ</span>'}<small>${r.L.map(x=>`${x.ok?'✓':'✗'} ${esc(x.t)}`).join('<br>')}</small></div></div>`).join('')}</div>
   ${v.hist.length?`<p class="note" style="margin-top:8px"><b>Diễn biến gần đây:</b> ${v.hist.slice(0,4).map(h=>esc(h.m)).join(' · ')}</p>`:''}`}</section>`}

/* ---------- nhịp tháng của lớp 6.3.3 ---------- */
function w633Month(mo){
  if(S.t%12===0)houseYear();
  houseTick(mo);
  vilTick(mo)}
/* ---------- nạp save cũ ---------- */
/* ================= v6.3.4 ================= */
function w634Migrate(st){
  st.people.forEach(p=>{if(p.dead!=null||p.left||!p.gn)return;innateGenes(p);ensureNat(p);
    /* danh hiệu mị lực đã cấp ở bản cũ mà chưa cộng cơ duyên */
    if(!p.flags.dz634){p.flags.dz634=1;const dz=traitsOf(p).reduce((a,t)=>a+((TRAITS[t]&&TRAITS[t].ct&&!TRAITS[t].hon&&TRAITS[t].duyen)||0),0);if(dz)p.duyen=clamp(p.duyen+dz,1,100)}})
}
/* ================= v6.3.5 ================= */
function w635Migrate(st){
  /* dung nhan bẩm sinh: người đã có đặc tính khuynh thành thì mị lực không thể thấp bất thường; trẻ nhỏ bù theo đường tự nhiên mới */
  st.people.forEach(p=>{if(p.dead!=null||p.left||!p.gn)return;lookFix(p);if(p.nat0&&age(p)<18)catchUpYoung(p)});
  /* mỗi nơi có danh gia riêng, bốn nơi của bốn thế gia lớn thì không có nhà nào khác nổi bật */
  if(st.w&&st.w.clans)for(const pv in st.w.clans)if(PROV[pv])w_markHouses(pv)}
/* ================= v6.4 ================= */
function w64Migrate(st){
  if(!st.dyn)st.dyn=mkDyn(st.t-R(2,10)*12);
  st.off={};
  st.people.forEach(c=>{
    if(c.flags&&typeof c.flags.want==='string'&&!c.flags.want.includes('|'))c.flags.want=null;
  });
  st.people.forEach(c=>{
    if(c.dead!=null||c.left)return;
    if(c.job==='quan'&&c.post&&!c.seat&&OFFICES[c.post]&&OFFICES[c.post].units){
      const keys=shuf(DX.seatKeys(c.post));const kp=kinPosts(c);
      const k=keys.find(x=>!barReason(c,x,kp))||keys.find(x=>!(S.off[x]&&S.off[x].holder));
      if(k){const T=seatTm(k);c.seat=k;c.sg=T.sg;const o=offState(k);o.holder=c.id;o.vac=false;c.postT=st.t-R(0,30)}
    }
  })}
/* v6.4.1: ngự y có sẵn trong save cũ được xếp vào ghế Thái y viện ứng với cấp nghề */
function w641Migrate(st){
  if(!st.off)st.off={};
  /* gia phả: dựng lịch sử hôn nhân từ dây nối cũ, cứu người vợ/chồng cũ bị ghi đè nhưng còn trỏ về người còn sống */
  {st.people.forEach(x=>{if(!x.sph)x.sph=[]});
   const byId={};st.people.forEach(p=>{byId[p.id]=p});const lost={};
   st.people.forEach(x=>{const y=x.spouse?byId[x.spouse]:null;if(y&&y.spouse!==x.id)(lost[y.id]=lost[y.id]||[]).push(x)});
   st.people.forEach(y=>{
     const L=(lost[y.id]||[]).filter(x=>!y.sph.some(m=>m.id===x.id)).sort((a,b)=>(a.dead||0)-(b.dead||0));
     y.sph=L.map(x=>({id:x.id,k:'chanh',t0:null,t1:x.dead!=null?x.dead:null,e:x.dead!=null?'mat':'ly'})).concat(y.sph);
     if(y.spouse&&!y.sph.some(m=>m.id===y.spouse)){const sp=byId[y.spouse];const last=y.sph[y.sph.length-1];
       y.sph.push({id:y.spouse,k:last&&last.e==='mat'?'ke':'chanh',t0:null,t1:null,e:sp&&sp.dead!=null&&y.dead==null?'mat':null})}})}
  st.people.forEach(c=>{
    if(c.dead!=null||c.left||c.job!=='nguy'||c.seat)return;
    const tid=nguTid(c.lv);if(!OFFICES[tid])return;
    const k=shuf(DX.seatKeys(tid)).find(x=>!(st.off[x]&&st.off[x].holder));
    if(k){const T=seatTm(k);c.seat=k;c.post=tid;c.sg=T.sg;const o=offState(k);o.holder=c.id;o.vac=false;c.postT=st.t}
  })}
function w633Migrate(st){
  (st.biz||[]).forEach(b=>(b.staff||[]).forEach(staffFix));
  houseEnsure(st);vilEnsure(st)}

/*@@V63-END@@*/
/* ================= cổng cho các tệp kỳ ngộ ================= */
/* ================= v6.7.0-d1: khung đại cốt truyện · hạt giống thế giới · hậu sử chung · sử sách ================= */
/* ARC[id] = {name, start:()=>bool, onStart:(a)=>{}, tick:(a)=>{}, gap:[a,b], ends:{endId:{title,log,q:{khóa:[lo,hi]},mark,over}}}
   S.arcs[id] = {on, ch, t0, next, c:{}, fl:{}, lock:{}, done:{}, hist:[], end, q}
   Sự kiện bước khai arc:'<id>', ch:<chương>, vc:(c,a)=>bool, vw, vonce, vcd. Tiến độ ẩn hoàn toàn với người chơi (chỉ admin xem được). */
const ARC={};
const arcSt=id=>(S&&S.arcs&&S.arcs[id])||null;
const arcDef=(id,def)=>{ARC[id]=def};
function arcStart(id){const d=ARC[id];if(!d||!S||arcSt(id))return null;S.arcs=S.arcs||{};
  const a=S.arcs[id]={on:1,ch:1,t0:S.t,next:S.t+R(2,6),c:{},fl:{},lock:{},done:{},hist:[],end:null,q:null};
  if(d.onStart)d.onStart(a);return a}
const arcAdd=(id,k,n,cap)=>{const a=arcSt(id);if(!a)return 0;a.c[k]=clamp((a.c[k]||0)+n,0,cap==null?100:cap);return a.c[k]};
const arcFlag=(id,k,v)=>{const a=arcSt(id);if(a)a.fl[k]=v==null?1:v};
/* ngã rẽ vĩnh viễn: đặt được đúng một lần */
const arcFork=(id,key,val)=>{const a=arcSt(id);if(!a||a.lock[key]!=null)return false;a.lock[key]=val;return true};
const arcLocked=(id,key)=>{const a=arcSt(id);return a?a.lock[key]:undefined};
const arcLog=(id,m)=>{const a=arcSt(id);if(a){a.hist.unshift({t:S.t,m});if(a.hist.length>40)a.hist.length=40}};
function arcEnd(id,endId,extra){const a=arcSt(id),d=ARC[id];if(!a||!d||a.end)return false;const E=(d.ends&&d.ends[endId])||{};
  a.end=endId;a.on=0;a.q={};
  if(E.q)for(const k in E.q)a.q[k]=E.q[k][0]+Math.random()*(E.q[k][1]-E.q[k][0]); /* dải điều chỉnh rút ngẫu nhiên, giấu */
  if(E.log)qtLog(E.title||d.name||'Khép lại',E.log);
  if(E.mark)metaFlag(E.mark);
  if(E.over)finishGame(Object.assign({id:E.over,arc:id,end:endId},extra||{}));
  return true}
function arcPool(id,a){const hd=head();if(!hd)return [];
  return EVENTS.filter(e=>{if(e.arc!==id)return false;if(e.ch!=null&&e.ch!==a.ch)return false;
    const dn=a.done[e.id];if(dn!=null&&(e.vonce!==false||S.t-dn<(e.vcd||48)))return false;
    try{return !e.vc||e.vc(hd,a)}catch(err){return false}})}
function arcMonth(){if(!S||S.over||!head())return;S.arcs=S.arcs||{};
  const live=Object.keys(S.arcs).filter(k=>S.arcs[k].on&&!S.arcs[k].end);
  if(S.t%3===0&&live.length<3)for(const id in ARC){if(S.arcs[id])continue;let ok=false;try{ok=ARC[id].start&&ARC[id].start()}catch(e){}if(ok){arcStart(id);break}}
  for(const id of Object.keys(S.arcs)){const a=S.arcs[id],d=ARC[id];if(!d||!a.on||a.end)continue;
    try{if(d.tick)d.tick(a)}catch(e){}
    if(S.t>=a.next){const L=arcPool(id,a);const g=d.gap||[3,8];
      if(L.length){let tot=L.reduce((s,e)=>s+(e.vw||1),0),r=Math.random()*tot,pk=L[0];for(const e of L){r-=(e.vw||1);if(r<=0){pk=e;break}}
        a.done[pk.id]=S.t;enqueue('ev',S.head,{ev:pk.id,data:{}});a.next=S.t+R(g[0],g[1])}
      else a.next=S.t+R(2,4)}}}
/* ---------- hạt giống thế giới ---------- */
function worldInit(){const D=window.D;const pk=a=>a[Math.floor(Math.random()*a.length)];const provs=Object.keys(D.PROV);
  const three=al=>shuf(D.SECT_POOL.filter(x=>x.al===al)).slice(0,3);
  const sects=[].concat(three('chinh'),three('ta'),three('trung')).map((x,i)=>({id:'sc'+i,n:x.n,al:x.al,st:x.st,p:pk(provs),boss:pick(SURN)+' '+mkGiven('nam'),age:R(45,70),pow:R(30,80)}));
  S.wr={seed:Math.floor(Math.random()*1e9),pm:{org:pk(D.PM_ORG).id,kind:pk(D.PM_KIND).id},sects,hot:shuf(provs).slice(0,3),mt:pk(D.MENH_THE).id,
    fo:{bac:pk(D.FOREIGN),tay:pk(D.FOREIGN),dong:pk(D.FOREIGN)}}}
/* ---------- sử sách (meta, nằm ngoài save ván) ---------- */
function metaSave(m){lsSet(KEY_META,JSON.stringify(m))}
function metaFlag(k){if(DRY)return;const m=meta();m.flags=m.flags||{};m.flags[k]=1;metaSave(m)}
const unlockedKey=k=>{if(!k)return true;const m=meta();return !!((m.flags&&m.flags[k])||(m.end&&m.end[k]))};
function metaEnd(id){if(DRY||!S||S._me)return;S._me=1;const E=(window.D.ENDINGS||[]).find(x=>x.id===id);if(!E)return;
  const m=meta();m.end=m.end||{};m.end[id]=(m.end[id]||0)+1;m.hist=m.hist||[];
  m.hist.unshift({sur:S.surname,yrs:Math.floor(S.t/12),gens:S.people.reduce((x,p)=>Math.max(x,p.gen||1),1),id,n:E.n,kind:E.kind,at:Date.now()});if(m.hist.length>60)m.hist.length=60;metaSave(m)}
/* ---------- hậu sử chung cho mọi cái kết không phải lên ngôi ---------- */
function finishGame(o){const E=(window.D.ENDINGS||[]).find(x=>x.id===o.id)||{id:o.id,n:o.name||'Khép lại',kind:o.kind||'win',t:o.text||''};
  const gens=S.people.reduce((m,p)=>Math.max(m,p.gen||1),1);
  const top=S.people.slice().sort((a,b)=>(b.fame||0)-(a.fame||0)).slice(0,6);
  const hist=(S.qtLog||[]).slice(-10);
  S.ending={id:E.id,name:E.n,kind:E.kind,years:Math.floor(S.t/12),gens,who:S.head};S.over=true;running=false;metaEnd(E.id);save();
  const win=E.kind==='win';
  openModal(`<span class="eyebrow">${win?'Gia sử':'Hết một dòng họ'}</span><h2>${esc(E.n)} · họ ${esc(S.surname)}</h2><p>${esc(o.text||E.t)}</p>
   ${hist.length?`<h3 style="margin:10px 0 4px;font-size:14px">Lược sử</h3><ul class="plain" style="max-height:26vh;overflow:auto">${hist.map(x=>`<li><b>${dateStr(x.t)} · ${esc(x.title)}</b><br><small>${x.txt}</small></li>`).join('')}</ul>`:''}
   <h3 style="margin:10px 0 4px;font-size:14px">Những người được nhớ</h3><ul class="plain">${top.map(p=>`<li><b>${esc(nameOf(p))}</b> <small class="muted">(${p.dead!=null?'đã mất':'còn sống'}, ${esc(jobName(p))})</small></li>`).join('')}</ul>
   <dl class="kv"><dt>Họ chơi</dt><dd class="num">${Math.floor(S.t/12)} năm</dd><dt>Số đời</dt><dd class="num">${gens}</dd><dt>Người trong gia phả</dt><dd class="num">${S.people.length}</dd><dt>Danh vọng gia tộc</dt><dd class="num">${fmt(S.fame)}</dd><dt>Công quỹ</dt><dd class="num">${money(S.money)}</dd></dl>
   <div class="acts" style="margin-top:12px"><button class="btn" data-menu>Về màn hình chính</button></div>`,false,'menu');
  M.querySelector('[data-menu]').onclick=()=>{S=null;O.hidden=true;M.innerHTML='';mainMenu()}}
function historyMenu(){const m=meta();const E=window.D.ENDINGS;const got=k=>(m.end&&m.end[k])||0;
  const og=Object.entries(ORIGINS).filter(([k,o])=>o.lock);
  openModal(`<span class="eyebrow">Sử sách</span><h2>Những trang đã viết</h2>
   <h3 style="margin:8px 0 4px;font-size:14px">Kết cục · ${E.filter(x=>got(x.id)).length}/${E.length}</h3>
   <div class="choices">${E.map(x=>`<div class="btn" style="cursor:default;${got(x.id)?'':'opacity:.5'}"><strong>${got(x.id)?esc(x.n):'???'}${got(x.id)>1?` ×${got(x.id)}`:''}</strong><small>${got(x.id)?esc(x.t):(x.kind==='win'?'Một kết cục tốt chưa đạt':'Một kết cục buồn chưa gặp')}</small></div>`).join('')}</div>
   <h3 style="margin:10px 0 4px;font-size:14px">Xuất thân mở khóa</h3>
   <ul class="plain">${og.map(([k,o])=>`<li><b>${unlockedKey(o.lock)?esc(o.n):'???'}</b> <small class="muted">${unlockedKey(o.lock)?esc(o.d):'Chưa mở'}</small></li>`).join('')}</ul>
   <h3 style="margin:10px 0 4px;font-size:14px">Các ván đã kết thúc</h3>
   ${(m.hist||[]).length?`<ul class="plain" style="max-height:24vh;overflow:auto">${m.hist.slice(0,30).map(h=>`<li><b>Họ ${esc(h.sur)}</b> · ${esc(h.n)} <small class="muted">· ${h.yrs} năm, ${h.gens} đời</small></li>`).join('')}</ul>`:'<p class="muted">Chưa có ván nào kết thúc.</p>'}
   <div class="choices"><button class="btn ghost" data-back>Quay lại</button></div>`,false,'menu');
  M.querySelector('[data-back]').onclick=mainMenu}

const G={arc:{ARC,def:arcDef,start:arcStart,get:arcSt,add:arcAdd,flag:arcFlag,fork:arcFork,locked:arcLocked,log:arcLog,end:arcEnd,finish:finishGame,pool:arcPool,unlocked:unlockedKey,metaFlag},cname,cnameU,cHeadFull,R,pick,chance,clamp,fmt,esc,fx,fxAll,roll,prob,later,age,nameOf,spouseOf,kidsOf,alive,home,married,stg,season,month,tierIdx,tierName,hasJob,grantTitle,tuocNote,tuocCheck,landCost,hauBo,mkSpouse,ts:{end:()=>{S.usurp=null;S.usNo=S.t+R(240,480)},crown:usCrown,U:usU,start:usStart,add:usAdd,next:usNext,win:usWin,abandon:usAbandon,fail:usFail,crown:usCrown,N:US_N,steps:US_STEPS,stepsOf:usSteps,actors:usActors,
  force:(path,who)=>{const a=who||head();S.usurp=null;return usStart(path,a,true)},hauSu,noPath:(path)=>{(S.usNoP=S.usNoP||{})[path]=S.t+R(240,480)}},vua:{d:()=>dynEns(),type:kingT,TN:KT_N,txt:thoiTheTxt,die:kingDie},than:{has:thanHas,holder:thanHolder,T:THAN,ok:thanEligible,grant:thanGrant,fail:thanFail,tm:tmOf},ch:{raid:warRaid},tinh:{ok:romOk,p:romP,partner:romPartner,marry:romMarry,elope:romElope},br:{far:farBranch,at:brAt,lead:branchLeader},rel:{info:rinfo,refs:relRefs,yieldOpts,win:relWin,lose:relLose,book:relBook,GP,MAR_N,bandN:relBandN,stand:xgStand,bySur:clanBySur,ens:relEns},qt:{autoSplit,rv:{add:n=>{S.rv=S.rv||{h:0,cd:{}};S.rv.h+=n},get:()=>(S.rv&&S.rv.h)||0},of:qtOf,add:qtAdd,join:qtJoin,log:qtLog,court,facN,FAC,FACK,CRIME_N,level:qtLevel,framed:qtFramed,sentence:qtSentence,truDi,fall:facFall,dismiss:qtDismiss,expel:p=>doExpel([p],true),newBranch,becomeHead,clanQuan,ruleSlots,addRule},mkPerson,addStat,setJob,
  S:()=>S,P,D:window.D,JOBS,RANKS,TUOC,ROUTES,routes,REGIONS,relOf,addRel,kin,subOf,ensurePersona,HABITS,TRAITS,CROPS,GOODS,OFFICES,BIZ,isOfficialFamily,log,enqueue,die,mm,money:()=>S.money,fame:()=>S.fame,fmtMoney:money,
  head,isHead,has,addTrait:addTraitEv,removeTrait,traitsOf,shiftAx,axv,skv,addSk,addHabit,dropHabit,cutVice,vlv,isVice,viceOf,axLabels,outsiderName,mkGiven,fullOutsider,inClan,adopt,enlist,wipeClan,assignPost,nguOpen,nguInvite,voEnlist,appoint,postOf,offState,quitOffice,seatName,rankTxt,provN,seatOfC,isOff,famOf,followers,bizOf,priceOf,mk,lone,noble,famLuck,clanTuoc,
  hhOf:c=>HH(c.hh),mainHH,HOMES,LIFE,setAway:(c,a)=>{c.away=a},childOf,doBirth,newHH:(c,home)=>newBranch(c,home,0),
  unlockCrop:k=>{if(!S.farm.unlock.includes(k)){S.farm.unlock.push(k);log(`Gia tộc có thêm giống ${CROPS[k].n.toLowerCase()}.`,'gd');return true}return false},
  _v61:{becomeHead,econMonth,brkPaths,brkStart,thoPopup,teachPopup,vacantPopup,moveOutPopup,rewardPopup,askGopPopup,askParentPopup,bossRaisePopup,sellBiz,openBizPopup,offHolder,prefFocus,kidWish,startLv,branches,newBranch,msPopup,pageCosngoi,econEst},
  kidAdj,gain,charge,canPay,fundOf,inMain,clanKeeps,branchLeader,purse:c=>c.purse,
  tierIdx,season,famePromo,clanLv,selfLv,FAME_CLAN,FAME_SELF,
  kho:()=>S.kho,war:()=>S.war,epi:()=>S.epi,expandBiz,gameOver,openBiz,homeLv:()=>HH(mainHH()).home,lifeLv:()=>HH(mainHH()).life,fmtMoney:money,relation,jobName,matchmaker,canOwn,mkStaff,staffEff,stfRecruitKin,stfRehire,ROLES,bizDetail,bizVacant,bizStaffInfo,staffTick,staffDie,stAge,isHead,
  protect,protName,obey,comeHome,marryOut,confer,ctRank,ctPending,mkMatch,standOf,innate,divorce,lyPopup,gateCap,hardCap,titleOf,stripHonors,cheer,jobFit,laborOk,working,selfEmp,remarryOk,adoptOk,setLove,settleEstate,kidCap,inClanP:inClan,rule,cf,addTraitP:addTrait,
  _v63:{fleePopup,fleeTargets,w_wed,w_gift,w_peace,w_spoil,w_front,w_damp,w_khoFee,mapSVG,w_ensure,w63Month,doMove,movePopup,locName,locP,routes63,w_clans,w_clan,w_news,w_shock,w_startWar,w_endWar,w_home,w_dis,w_tension,w_clansYear,w_mo,w_closed,moveCost,w_ourKind,w_jobKind,homeNat,w_label,leaveJob,sickPopup,get mapProv(){return mapProv},TIERN63,CJOB63,CTR63,VILL63},
  _v633:{HOUSE_DEF,hdef,house,houseName,houseRel,houseAlly,houseKid,vil,vilLog,vd,vAdd,kPow,vFlag,vStance,vilRoutes,vilReady,vilEnd,vilStart,vilQuan,vilFighters,vilYears,vPick,pickWho,KIEN,DUY,KRANK,achieve,cf,vBranch,vFi,VBR,hinfo,hnear,houseRefs,giftNorm,w_wed,w_mo,NEAR_MO,HOUSE_TIER},
  _v62:{willPopup,chunoPopup,debtTick,expelPopup2,doExpel,tumatPopup,oanPopup,tranhviPopup,ruleSlots,ruleWhy,addRule,dropRule,keugoiPopup,thiencoPopup,gateCheck,ttlPopup,wishPick,wishScore,obey,ctxOk,CTX,v62Month,v62Year,loveTick,outsTick,divorcePopup,vuotsinhPopup,rulepropPopup,ruleforcePopup,rulechgPopup,pieceF,jobDig,minDig}};
/* v6.4.1.1: cổng riêng cho trang admin (admin.js). Bản thường không dùng tới */
G._adm={arcStart,arcEnd,arcMonth,arcPool,finishGame,worldInit,historyMenu,metaEnd,migrate,rivalTick,hhSweep,schoolAuto,doBirth,enqueue,isCtrl,autoSplit,farBranch,branchName,DX,seatWh,newBranch,dischargePopup,whereP,lqSync,isArmyKid,kinhOff,postPopup,assignPost,eligibleWhy,previewScore,advance,render,renderTop,save,nextPopup,closeModal,modalOpen,eligible,EVENTS:()=>EVENTS,EVMAP:()=>EVMAP,migrate,
  getSel:()=>sel,setSel:v=>{sel=v},running:()=>running,speed:()=>speed,setRun:(r,sp)=>{running=!!r;if(sp)speed=sp;renderTop()},
  setS:st=>{S=st;sel=P(sel)?sel:S.head;O.hidden=true;M.innerHTML='';render();nextPopup()},page:()=>page,ensurePersona};
window.BNTG=G;
buildEvents();

/* ================= khởi động ================= */
function start(data){
  if(data&&data.S&&!data.S.over){S=migrate(data.S);sel=data.sel||S.head;page=data.page||'giapha';running=false;centerNext=true;render();nextPopup()}else mainMenu();
}
if(window.claude&&window.claude.hot&&window.claude.hot.snapshot)window.claude.hot.snapshot(()=>({S,sel,page}));
window.claude?.hot?.ready?window.claude.hot.ready(start):start(window.claude?.hot?.data??{});
})();
