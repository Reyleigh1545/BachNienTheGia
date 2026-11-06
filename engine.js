/* Bách Niên Thế Gia v6.3 · engine (ghép từ src/ + src63/) */
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
const KEY_OLD='bnthegia.save.v4',KEY_META='bnthegia.v6.meta',slotKey=n=>'bnthegia.v6.slot'+n;
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
const lone=c=>alive().length===1&&age(c)<50;
const head=()=>P(S.head);
const isHead=c=>c&&c.id===S.head;

/* gen: mỗi chỉ số hai alen 15..100; tiềm năng = 0,65·alen lớn + 0,35·alen nhỏ */
function rollGenes(lift){const g={};STATS.forEach(([k])=>{if(k!=='suc')g[k]=[R(15,85)+(lift||0),R(15,85)+(lift||0)].map(v=>clamp(v,10,100))});g.suc=[R(40,100),R(40,100)];return g}
const pot=(c,k)=>{const a=c.gn&&c.gn[k];if(!a)return 60;const hi=Math.max(...a),lo=Math.min(...a);return hi*0.65+lo*0.35};
function rollTraitGenes(){const tg={};for(const k in TRAITS){const T=TRAITS[k];if(!T.gene)continue;tg[k]=(chance(T.p)?1:0)+(chance(T.p)?1:0)}return tg}
function expressed(c,k){const T=TRAITS[k];if(!T)return false;if(c.traits.includes(k))return true;if(!T.gene||!c.tg)return false;const n=c.tg[k]||0;return T.gene==='D'?n>=1:n>=2}
function traitsOf(c){const s=new Set(c.traits);if(c.tg)for(const k in c.tg)if(TRAITS[k]&&expressed(c,k))s.add(k);axLabels(c).forEach(t=>s.add(t));return [...s]}
const realTraits=c=>traitsOf(c).filter(t=>!TRAITS[t].ax);
const has=(c,t)=>traitsOf(c).includes(t);
function tsum(c,key){let v=0;traitsOf(c).forEach(t=>{const T=TRAITS[t];if(typeof T[key]==='number')v+=T[key]});return v}
function addTrait(c,t){if(TRAITS[t]&&TRAITS[t].ax){if(axLabels(c).includes(t))return false;setLabel(c,t,true);return true}if(!c.traits.includes(t)&&!expressed(c,t)){c.traits.push(t);return true}return false}
function removeTrait(c,t){if(TRAITS[t]&&TRAITS[t].ax){setLabel(c,t,false);return}c.traits=c.traits.filter(x=>x!==t);if(c.tg&&c.tg[t]&&expressed(c,t))c.tg[t]=0}
function randomTraits(c){
  const pool=Object.keys(TRAITS).filter(k=>!TRAITS[k].gene&&!TRAITS[k].ax);
  const n=chance(0.5)?1:chance(0.3)?2:0;
  for(let i=0;i<n;i++){const k=pick(pool);const T=TRAITS[k];if(T.c==='p'&&!chance(0.15))continue;addTrait(c,k)}
}
const capOf=(c,k)=>Math.min(hardCap(c,k),gateCap(c,k)+((tsum2(c,'capUp')[k])||0));
function tsum2(c,key){const o={};traitsOf(c).forEach(t=>{const T=TRAITS[t];if(T[key])for(const k in T[key])o[k]=(o[k]||0)+T[key][k]});return o}

function mkPerson(o){
  const g=o.g||(chance(0.5)?'nam':'nữ');const a=o.age||0;
  const on=o.surname?null:outsiderName(g);
  const c={id:uid(),g,surname:o.surname||on.surname,given:o.given||(on?on.given:mkGiven(g)),
    born:S.t-a*12-R(0,11),cap:{tri:100,vo:100,suc:100,mi:100,eq:100},decl:R(32,42),
    job:'none',lv:0,m:0,bonus:0,liem:R(35,75),focus:'nghi',tam:R(45,70),spouse:null,parents:[],inLaw:false,dead:null,left:null,
    ms:{},mms:{},msRetry:{},exam:null,degree:0,gen:1,school:'nha',pre:{},habits:[],wantChild:false,preg:null,away:null,flags:{},seen:{},
    fame:0,tuoc:0,duyen:R(10,90),traits:[],gn:o.gn||rollGenes(o.lift),tg:o.tg||rollTraitGenes(),hh:o.hh||(S.hh?mainHH():'h0'),merit:0,purse:0,biz:null};
  if(!o.young){STATS.forEach(([k])=>{c[k]=k==='suc'?clamp(Math.round(pot(c,'suc')*R(80,100)/100),40,100):clamp(Math.round(pot(c,k)*R(45,80)/100),5,95)})}
  else STATS.forEach(([k])=>c[k]=k==='suc'?R(55,90):clamp(Math.round(pot(c,k)*0.12)+R(1,6),1,30));
  c.cap.suc=Math.max(c.suc,R(85,100));
  if(o.traits!==false)randomTraits(c);
  c.duyen=clamp(c.duyen+tsum(c,'duyen'),1,100);
  ['g','surname','given','age','young','gn','tg','lift','traits','hh'].forEach(k=>delete o[k]);
  Object.assign(c,o);
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
function tierScore(){return S.fame+wealth()/1000+clanTuoc()*1500+(S.royal?50000:0)}
function tierIdx(){const s=tierScore();let i=0;TIERS.forEach(([,v],k)=>{if(s>=v)i=k});return i}
function tierName(){return S.royal?'Hoàng tộc':TIERS[tierIdx()][0]}
const mm=v=>Math.round(v*60*TK[tierIdx()]);
const famLuck=()=>{const a=alive();return a.length?a.reduce((s,p)=>s+p.duyen,0)/a.length:50};

/* ================= tỉ lệ thành công ================= */
function cond(c){return 0.55+0.25*c.tam/100+0.2*Math.min(1,c.suc/70)+tsum(c,'cond')+(S.on-50)/600+(S.hung-50)/800}
function prob(c,spec,diff){
  let v=0,w=0;for(const k in spec){const val=k==='m'?c.m:k==='fame'?Math.min(150,(c.fame+S.fame*0.2)/4):k==='duyen'?c.duyen:SKN[k]?skv(c,k):AXN[k]?axv(c,k):c[k];v+=val*spec[k];w+=spec[k]}
  const eff=(w?v/w:50)*cond(c)+(c.duyen-50)/25;
  return clamp(1/(1+Math.exp(-(eff-diff)/9)),0.03,0.97);
}
const roll=(c,spec,diff)=>chance(prob(c,spec,diff));

/* ================= chỉ số và hiệu ứng ================= */
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
    else if(k==='lv'&&c.job==='quan'){const o=c.lv;const nr=clamp(c.lv+v,0,8);if(nr!==o){const r=appoint(c,nr,true);out.push([`Chức: ${window.D.OFFICES[r.id].n}`,v>0?'+':'-']);if(nr>o&&!DRY)achieve(c,`thăng làm ${window.D.OFFICES[r.id].n}`)}}
    else if(k==='lv'){const L=JOBS[c.job].lv.length;const o=c.lv;c.lv=clamp(c.lv+v,0,L-1);if(c.lv!==o)out.push(['Bậc',c.lv-o]);if(c.lv>o&&!DRY)achieve(c,`lên làm ${JOBS[c.job].lv[c.lv].n.toLowerCase()}`)}
    else if(k==='bonus'){c.bonus=clamp(c.bonus+v,-0.5,3);out.push(['Thu nhập',(v>0?'+':'')+Math.round(v*100)+'%'])}
    else if(k==='liem'){const o=c.liem;c.liem=clamp(c.liem+v,0,100);out.push(['Liêm chính',c.liem-o])}
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
  const shown=out.filter(([,v])=>v!==0);
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
function income(c){
  if(!inClan(c)||age(c)<16)return 0;
  if(c.away&&c.away.type==='trade')return 0;
  if(c.away&&['jh','odo','sep'].includes(c.away.type))return 0;
  const moodF=0.85+0.3*c.tam/100;const hung=0.9+S.hung/500;
  if(c.job==='quan'){const O0=c.post?window.D.OFFICES[c.post]:null;return Math.round(SALARY[c.lv]*(O0?O0.mul:1)*(0.9+c.m/250)*(1+c.bonus))}
  if(c.job==='quan_ngu')return Math.round(ARMY[c.lv][1]*0.7);
  if(c.job==='chu'||c.job==='nong')return 0;
  const J=JOBS[c.job];if(!J.inc)return 0;
  let v=jobInc(c)*(1+c.m/90)*(1+c.bonus)*moodF*hung*viceWork(c);
  if(c.job==='ngu'&&season()==='dong')v*=0.5;
  if(pieceJob(c))v*=pieceF(c);
  return Math.max(0,Math.round(v));
}
const sideIncome=c=>{if(c.job!=='quan'||!inClan(c)||c.away)return 0;const O0=c.post?window.D.OFFICES[c.post]:null;return Math.round(SALARY[c.lv]*(100-c.liem)/100*2*(O0?O0.side:1)*(rule('thanhliem')?0.5:1))};
const titlePay=()=>alive().reduce((s,p)=>s+TUOC_PAY[p.tuoc||0],0)+(S.royal?300000:0);
const fiefIncome=()=>toIncome();
function personalSpend(c){
  const a=age(c);if(c.away&&c.away.type!=='trade')return {base:0,ranh:0,hoc:0,thoi:0};
  const h=HH(c.hh)||HH(mainHH());const L=LIFE[h.life];
  let base=(a<6?0.4:a<16?0.6:1)*L[1]*(1+h.home*0.12);
  if(c.job==='hau'&&a>=16)base*=0.4;
  let ranh=0,hoc=0,thoi=0;
  if(a>=6&&a<18&&c.school!=='nha'){const lvl=a<10?1:a<14?2:3;const sc=SCHOOL[lvl][c.school];if(sc){hoc=sc.fee;if(sc.chore)base*=0.6}}
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
  (REGIONS[S.region].unlock||[]).forEach(k=>{if(!S.farm.unlock.includes(k))S.farm.unlock.push(k)});
  for(const g in GOODS)S.mk[g]=0.9+Math.random()*0.2;
  const h=mkPerson({g:o.g,surname:o.surname,given:o.given,age:18,gn:o.gn,tg:o.tg,hh:'h0',traits:false});
  STATS.forEach(([k])=>h[k]=o.stats[k]);h.cap.suc=Math.max(h.suc,R(85,100));h.duyen=o.duyen;h.traits=o.traits.slice();
  h.focus='nghi';h.job=o.job;
  ensurePersona(h);const OR=ORIGINS[o.origin];if(OR){for(const k in OR.ax||{})h.sub[k]=clamp(h.sub[k]+OR.ax[k],0,100);harmonize(h.sub);h.nat=Object.assign({},h.sub);for(const k in OR.sk||{})h.sk[k]=clamp(h.sk[k]+OR.sk[k],0,100)}
  STATS.forEach(([k])=>h.ms[k]=MS.filter(t=>h[k]>=t));
  S.people.push(h);S.head=h.id;sel=h.id;
  // của khởi nghiệp tương đương 1 mẫu ruộng
  if(o.job==='nong'){S.farm.own=1;S.farm.rent=3;S.farm.alloc.lua=4;S.money=600}
  else if(o.job==='ngu'){S.money=1500}
  else if(o.job==='chan'){S.money=2500}
  else S.money=6000+600;
  if(o.job==='hau')S.money=8600;
  ensureEcon();h.kidW=R(45,90);w_ensure(S);
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
  econMonth();
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
  // kỳ thi
  const stage=mo===8?0:mo===2?1:mo===3?2:-1;
  if(stage>=0)alive().forEach(c=>{if(c.exam&&c.exam.stage===stage&&!c.away)enqueue('exam',c.id,{stage})});
  // việc đã hẹn
  const due=S.sched.filter(s=>s.t<=S.t);S.sched=S.sched.filter(s=>s.t>S.t);
  due.forEach(s=>{const c=P(s.cid);if(!c||!inClan(c))return;const E0=EVMAP[s.ev];if((c.busyUntil||0)>S.t&&!(E0&&E0.fixed)&&(s.def||0)<6){S.sched.push(Object.assign({},s,{t:c.busyUntil+1,def:(s.def||0)+1}));return}enqueue('ev',c.id,{ev:s.ev,data:s.data})});
  // đi buôn về
  S.trips=S.trips.filter(tr=>{if(S.t<tr.until)return true;const c=tr.cid?P(tr.cid):null;if(c){if(c.away&&c.away.type==='trade')c.away=null;if(!inClan(c))return false}enqueue('trade',c?c.id:S.head,{trip:tr});return false});
  // sự kiện đời thường: thường xuyên. Kỳ ngộ: hiếm, theo cơ duyên
  for(const p of alive()){
    const a=age(p);const baby=a<5;if(baby&&S.t-p.born<2)continue;if(p.away&&['trade','odo','sep'].includes(p.away.type))continue;if((p.busyUntil||0)>S.t)continue;
    let pr=baby?0.052:0.075+p.duyen/100*0.05;if(a<16&&!baby)pr*=0.55;if(isHead(p))pr*=1.3;if(p.away)pr*=1.3;
    if(chance(pr)){const ev=pickEvent(p,false,baby);if(ev)enqueue('ev',p.id,ev)}
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
  alive().forEach(c=>{if(age(c)>=16&&(c.job==='quan_ngu'?!!c.away:!c.away)&&canPromote(c)&&chance(0.05))enqueue('promo',c.id)});
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
  if(c.job==='nong')c.lv=farmerLv();
  const F=a>=6?FOCUS[c.focus]:FOCUS.nghi;
  const away=c.away&&c.away.type!=='trade';
  const moodF=0.6+0.6*c.tam/100;const kidm=a<16?1.3:1;
  const tg=tsum2(c,'grow');const all=tsum(c,'growAll');
  const grow=(k,perYear)=>{perYear=(perYear||0)+(perYear?ruleGrow(c,k):0);if(!perYear)return;const cap=capOf(c,k);if(c[k]>=cap)return;const dim=Math.max(0.15,1-c[k]/(cap+15))*(c[k]>=100?0.4:1);
    const gene=0.5+pot(c,k)/100;addStat(c,k,perYear/12*dim*moodF*kidm*gene*(1+(tg[k]||0)+all+(k==='vo'&&rule('thuongvo')?0.15:0)))};
  if(a>=4&&!away){for(const k in F.g)grow(k,F.g[k])}
  if(a>=6&&a<18&&c.school!=='nha'&&!away){const lvl=a<10?1:a<14?2:3;const sc=SCHOOL[lvl][c.school];
    if(sc){const teach=(home().some(p=>['su'].includes(p.job)&&age(p)>=16||p.job==='chu'&&S.biz.find(b=>b.id===p.biz&&b.type==='truong'))?1.3:1)*(S.rules.includes('hieuhoc')?1.15:1)*(inMain(c)&&offHolder('giaothu')?1.1+offV('giaothu')/200:1);
      for(const k in sc.g)grow(k,sc.g[k]*teach);for(const j in (sc.pre||{}))c.pre[j]=(c.pre[j]||0)+sc.pre[j]/12}}
  if(S.rules.includes('hoathuan'))grow('eq',1);
  c.habits.forEach(h=>{const H=HABITS[h];if(!H)return;const f=H.vice?vlv(c,h)/50:1;if(H.tri)grow('tri',H.tri);if(H.eq)grow('eq',H.eq);if(H.fame)c.fame+=H.fame*f;if(H.hp)addStat(c,'suc',H.hp*f)});
  if(F.fame&&chance(F.fame/12))c.fame++;
  if(has(c,'thamlam')&&c.job==='quan'&&!rule('thanhliem'))c.liem=Math.max(0,c.liem-0.04);
  if(rule('thanhliem')&&c.job==='quan')c.liem=Math.min(100,c.liem+0.05);
  // sức khỏe
  let hp=(a>=c.decl?0.4:0.7)+(F.hp||0)+(c.vo>=80?0.2:0)+tsum(c,'hp')-(HH(c.hh)&&HH(c.hh).life===0?0.4:0);
  addStat(c,'suc',hp);if(c.suc>c.cap.suc)c.suc=c.cap.suc;
  // tâm trạng
  const tgt=moodTarget(c,a);c.tam=clamp(c.tam+(tgt-c.tam)*0.12+(Math.random()-0.5)*3,0,100);
  // thông thạo
  if(a>=16&&!['none','vua','huu','quan_ngu'].includes(c.job)&&!(c.away&&c.away.type==='trade')){const J=JOBS[c.job];
    let yr=1.4+(c[J.st]>=80?0.5:0)+(c.tam>=70?0.3:0)+(F.mm||0)+tsum(c,'mm');
    traitsOf(c).forEach(t=>{const T=TRAITS[t];if(T.mmJobs&&!T.mmJobs.includes(c.job))yr-=T.mm});
    if(['tho','y','nghe','chan','nguy'].includes(c.job))yr+=(skv(c,'ky')-40)/80;
    c.m=Math.min(120,c.m+Math.max(0.2,yr*viceWork(c))/12)}
  // quân ngũ: rủi ro tử trận
  if(c.job==='quan_ngu'&&!c.away&&inClan(c)&&a>=16){c.away={type:'army'};log(`${nameOf(c)} được gọi về doanh trại.`)}
  if(c.job==='quan_ngu'&&c.away){const risk=(S.war?0.0028:0.0006)*(1.6-(c.vo+c.suc)/200)*(1-c.duyen/250)*(1-Math.min(0.25,c.lv*0.04));if(chance(risk)){const tt=Math.round(ARMY[c.lv][1]*10);S.money+=tt;cf(1+c.lv,'Con em tử trận vì nước');log(`Triều đình gửi ${money(tt)} tiền tuất về nhà ${nameOf(c)}.`);die(c,S.war?'tử trận nơi sa trường':'tử nạn trong quân');return}
    if(S.war?chance(0.16):chance(0.04))c.merit+=(S.war?R(3,10):R(1,3))*(1+tsum(c,'merit'))}
  // giang hồ
  if(c.job==='hiep'&&c.away){c.purse-=Math.round(LIFE[1][1]*1.5);if(chance(0.0015*(1.5-c.vo/150))){die(c,'bỏ mạng nơi giang hồ');return}
    if(c.purse<0&&chance(0.2))enqueue('ev',c.id,{ev:'jh_het_tien'})}
  if(c.suc<=0){if(lone(c))c.suc=1;else die(c,'kiệt sức qua đời')}
}
function moodTarget(c,a){
  const h=HH(c.hh)||HH(mainHH());const L=LIFE[h.life];
  let t=52+L[2]+(h.life-EXPECT[tierIdx()])*3+HOMES[h.home].tam;
  if(c.away&&c.away.type==='army')t=45+(S.war?-10:0);
  if(a>=6)t+=FOCUS[c.focus].tam;
  if(married(c))t+=5;if(kidsOf(c).some(k=>inClan(k)))t+=3;
  if(a>=16)t-=JOBS[c.job].stress;
  if(a>=18&&c.job==='none')t-=6;
  if(S.money<0)t-=15;
  t+=(c.eq-50)/12;if(c.suc<40)t-=10;
  c.habits.forEach(x=>t+=HABITS[x].tam||0);
  t+=tsum(c,'tam');
  if(c.flags.griefUntil>S.t)t-=15;
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
function onBirthday(c,a){
  const decl=c.decl+tsum(c,'decl');
  if(a>=decl){const d=a>=60?R(2,4):R(1,2);c.cap.suc=Math.max(0,c.cap.suc-d);c.suc=Math.min(c.suc,c.cap.suc)}
  if(c.cap.suc<=0||c.suc<=0){die(c,'tuổi già sức yếu, qua đời');return}
  driftYear(c,a);
  if(THO[a]&&inClan(c))enqueue('tho',c.id,{a});
  if(!c.inLaw||a<18){
    if(a===6||a===10||a===14)enqueue('school',c.id,{lvl:a===6?1:a===10?2:3});
    if(a===18&&c.job==='none'&&!c.away)enqueue('job18',c.id);
  }
  if(a>18&&a<60&&c.job==='none'&&!c.away&&!c.left&&(c.g==='nam'||!married(c)))enqueue('job',c.id);
}
function checkMilestones(c,a){
  if(a<8)return;
  gateCheck(c,a);
  if(a>=16&&!['none','vua','huu','quan_ngu','chu'].includes(c.job)){const l=c.mms[c.job]=c.mms[c.job]||[];
    for(let t=20;t<=120;t+=20)if(c.m>=t&&!l.includes(t)){l.push(t);enqueue('mm',c.id,{t})}}
  if(['y'].includes(c.job)&&c.m>=80&&c.tri>=80&&!c.flags.ngu&&c.fame+S.fame*0.2>=120){c.flags.ngu=1;enqueue('ev',c.id,{ev:'y_chieumo'})}
}
function die(c,cause){
  if(c.dead!=null)return;c.dead=S.t;c.preg=null;
  if(c.away){S.trips=S.trips.filter(t=>t.cid!==c.id);c.away=null}
  if(c.biz){const b=S.biz.find(x=>x.id===c.biz);if(b)b.owner=null}
  if(isHead(c))S.lastHead=c.id;
  const est=!c.left?settleEstate(c):'';
  const sp0=spouseOf(c);if(sp0&&sp0.dead==null){sp0.flags.widowT=S.t}
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
  sons[0].tuoc=Math.max(sons[0].tuoc||0,n);log(`${nameOf(sons[0])} kế tập tước ${TUOC[n]}.`,'gd');
  return ` Con trai trưởng ${esc(nameOf(sons[0]))} kế tập tước ${TUOC[n]}.`;
}
function grantTitle(c,n,why){
  n=Math.min(5,Math.max(1,n|0));
  if(!c||n<=(c.tuoc||0))return false;
  c.tuoc=n;const h=HH(c.hh);const old=h.home;h.home=Math.max(h.home,TUOC_HOME[n]);S.farm.fief+=TUOC_LAND[n]-(TUOC_LAND[(c.tuocPrev||0)]||0);c.tuocPrev=n;
  S.hung=clamp(S.hung+10,0,100);c.fame+=60*n;cf(40*n,'Được phong tước');
  log(`${nameOf(c)} được phong ${TUOC[n]}${why?' vì '+why:''}. Triều đình ban ${h.home>old?HOMES[h.home].n.toLowerCase()+', ':''}${TUOC_LAND[n]} mẫu điền trang và bổng ${money(TUOC_PAY[n])} mỗi tháng.`,'gd');
  return true;
}

/* ================= mang thai ================= */
function pregnancy(){
  for(const c of alive()){
    if(c.preg){const cost=c.preg.care===2?mm(3):c.preg.care===1?mm(1):0;if(cost)charge(c,cost);
      if(S.t===c.preg.due-6&&!c.preg.lost&&chance(Math.max(0.02,0.08-c.preg.care*0.025+(age(c)>35?0.05:0)+(c.suc<40?0.05:0)))){c.preg=null;addStat(c,'tam',-15);addStat(c,'suc',-6);const sp=spouseOf(c);if(sp)addStat(sp,'tam',-8);c.flags.griefUntil=S.t+6;log(`${nameOf(c)} không may sảy thai.`,'hi');continue}
      if(S.t===c.preg.due-5&&chance(0.25+(c.preg.care?-0.12:0)))enqueue('ev',c.id,{ev:'thai_dong'});
      if(S.t>=c.preg.due&&!c.preg.q){c.preg.q=1;enqueue('birth',c.id)}continue}
    if(c.g!=='nữ'||!c.spouse||c.away||!inClan(c)||!canConceive(c))continue;const sp=P(c.spouse);
    if(!sp||!inClan(sp)||sp.away)continue;
    const a=age(c);if(a<16||a>46||c.suc<25)continue;
    if(hhCount(c.hh)>=HOMES[HH(c.hh).home].cap){if(wantsKid(c)&&wantsKid(sp)&&(c.flags.chatT==null||c.flags.chatT+48<=S.t)){c.flags.chatT=S.t;log(`Nhà chật, ${nameOf(c)} và ${nameOf(sp)} chưa dám sinh thêm.`)}continue}
    const both=wantsKid(c)&&wantsKid(sp);c.wantChild=sp.wantChild=both;
    const fert=(c.fert||1)*(sp.fert||1)*(c.suc/100+0.3)*(a>36?0.5:1)*(a>42?0.4:1);
    if(both?chance(0.09*fert):chance(0.012*fert)){c.preg={due:S.t+9,father:sp.id,twins:chance(0.035),care:0};if(!both)log(`${nameOf(c)} có tin mừng ngoài dự tính.`);enqueue('preg',c.id)}
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
    home().forEach(p=>{const a=age(p);const h=HH(p.hh);let pr=0.022*(1.5-p.suc/100)*(h.home<2?1.4:0.9)*(a<6||a>55?1.5:1)*(doc?0.6:1)*(h.life===0?1.3:1);
      const sk=traitsOf(p).reduce((m,t)=>m*(TRAITS[t].sick||1),1);pr*=sk;
      if(chance(pr))enqueue('ev',p.id,{ev:'benh_dich'})});
  }
}

/* ================= ruộng vườn ================= */
function farmLabor(){
  const farmers=home().filter(p=>p.job==='nong'&&age(p)>=16);
  let cap=farmers.reduce((s,p)=>s+4+p.m/40,0)+S.farm.hired*4;
  home().filter(p=>p.focus==='giup'&&age(p)>=12&&p.job!=='nong').forEach(()=>cap+=1);
  return cap;
}
const farmArea=()=>Math.max(0,S.farm.own-(S.farm.lease||0))+S.farm.rent;
const allocated=()=>Object.values(S.farm.alloc).reduce((a,b)=>a+b,0);
function farmSkill(){const f=home().filter(p=>p.job==='nong');return f.length?Math.max(...f.map(p=>0.8+p.m/200+(p.suc-50)/500)):0.7}
function farmMonth(){
  const mo=month();let v=0;const area=farmArea();if(!area)return 0;
  const lab=Math.min(1,farmLabor()/Math.max(1,allocated()*1));
  const ownShare=Math.max(0,S.farm.own-(S.farm.lease||0))/area;
  const notes=[];
  for(const k in S.farm.alloc){const n=S.farm.alloc[k];if(!n)continue;const C=CROPS[k];if(!C.harv.includes(mo))continue;
    let q=farmSkill()*lab*(0.85+Math.random()*0.3)*(REG().crop[k]||1)*(rule('trongnong')?1.1:1)*(1+offV('quansu')/300);
    if(S.disaster){const cf0=S.disaster.crop||0.5;q*=(k==='ngo'||k==='khoai')?Math.min(1,cf0+0.25):cf0}
    if(chance(C.risk)){q*=0.5;notes.push(`${C.n} bị mất mùa một nửa`)}
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
  return st;
}
function staffEff(st,role){const R0=ROLES[role];let s=0,n=0;for(const k in R0.req){s+=Math.min(1.25,st[k]/R0.req[k]);n++}return (n?s/n:1)*(0.7+st.m/200)}
function bizSlots(b){const B=BIZ[b.type];const out=[];for(let i=0;i<=b.lv;i++)out.push(...B.lv[i][4]);return out}
function bizCalc(b){
  const B=BIZ[b.type];const L=B.lv[b.lv];const slots=bizSlots(b);
  const used=new Set();let score=0;
  slots.forEach(r=>{const st=b.staff.find(s=>s.role===r&&!used.has(s.id));if(st){used.add(st.id);score+=Math.min(1.2,staffEff(st,r))}});
  const fill=slots.length?score/slots.length:1;
  const o=P(b.owner);let ownerF=o&&inClan(o)&&!o.away?(0.5+o.m/150+(o[B.st]||50)/300+tsum(o,'trade')+(skv(o,'ql')-40)/250)*viceWork(o):0.4;
  if(o&&o.bizFrom&&!B.owner.some(([j])=>j===o.bizFrom||(j==='_vo'&&o.vo>=60))&&o.tri<80&&!has(o,'kytaibuon'))ownerF*=0.75;
  if((b.own||'clan')==='clan')ownerF*=1+offV('quansu')/250;
  let mkF=1;if(b.type==='yquan'&&S.epi)mkF=1.6;if(b.type==='quantra'&&season()==='dong')mkF=0.85;if(S.war&&b.type==='tieucuc')mkF=1.3;if(S.war&&['ganhhat','quantra'].includes(b.type))mkF*=0.8;
  if(S.disaster)mkF*=0.85;
  const rev=L[2]*(0.25+0.75*fill)*ownerF*mkF*(0.85+((S.t*7+b.id.length)%30)/100)*(1+(b.bonus||0))*(rule('trongthuong')?1.08:1)*(rule('trongnong')?0.95:1)*(0.9+S.on/500);
  const wages=b.staff.reduce((s,x)=>s+x.wage,0);const mat=rev*((BIZX[b.type]||{}).mat??0.25);const rent=L[3];
  return {rev:Math.round(Math.min(rev,L[2]*1.3)),wages,mat:Math.round(mat),rent,profit:Math.round(Math.min(rev,L[2]*1.3)-wages-mat-rent),fill,ownerF};
}
function bizMonth(){
  let v=0;S.biz.forEach(b=>{const c=bizCalc(b);b.last=c;v+=c.profit;
    b.staff.forEach(st=>{st.m=Math.min(120,st.m+(2+st.tl/12)/12);for(const t of [30,60,90])if(st.m>=t&&!st.ms.includes(t)){st.ms.push(t);const ow=P(b.owner);enqueue('raise',ow&&inClan(ow)&&!ow.away&&ow.job==='chu'?ow.id:S.head,{biz:b.id,sid:st.id,t})}})});
  return v;
}
function canOwn(c,type){
  return BIZ[type].owner.some(([j,lv,req])=>{if(j==='_vo')return c.vo>=lv;if(c.job!==j||c.lv<lv)return false;if(req)for(const k in req)if(c[k]<req[k])return false;return true});
}
const bizOf=c=>c.biz?S.biz.find(b=>b.id===c.biz):null;

/* ================= thăng tiến ================= */
function nextReq(c){
  const J=JOBS[c.job];if(!J||['quan','quan_ngu','nong','none','huu','vua','chu','hiep'].includes(c.job))return null;
  const L=J.lv[c.lv+1];return L?L.req:null;
}
function meetsReq(c,req){
  for(const k in req){const v=req[k];
    if(k==='m'){if(c.m<v)return false}else if(k==='fame'){if(c.fame<v)return false}else if(k==='degree'){if(c.degree<v&&c.tri<(req.tri||0)+15)return false}
    else if(k==='flag'){if(!c.flags[v])return false}else if(k==='land'){continue}else if(c[k]<v)return false}
  return true;
}
function canPromote(c){
  if((c.flags.noPromoUntil||0)>S.t)return false;
  if(c.job==='quan'){const t=c.mms.quan||[];return c.lv<8&&c.m>=Math.min(100,(c.lv+1)*12)&&c.tri>=45+c.lv*7&&!((c.flags.noPromoUntil||0)>S.t)}
  if(c.job==='quan_ngu')return c.lv<ARMY.length-1&&c.merit>=ARMY[c.lv+1][2]&&c.away;
  if(c.job==='hiep'){const L=JOBS.hiep.lv[c.lv+1];return !!L&&meetsReq(c,L.req)}
  const r=nextReq(c);return !!r&&meetsReq(c,r);
}
function farmerLv(){const o=S.farm.own;return o>=40?3:o>=15?2:o>=3?1:0}
/* ================= chọn kỳ ngộ ================= */
let EVENTS=[],EVMAP={};
function buildEvents(){EVENTS=[];(window.EVF||[]).forEach(f=>{try{EVENTS.push(...f(G))}catch(e){console.error(e)}});EVMAP=Object.fromEntries(EVENTS.map(e=>[e.id,e]));classifyEvents();tagEvents();patchEvents();initBrk62()}
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
  if(e.ptag&&!(c.job==='quan'&&c.post&&e.ptag.includes(window.D.OFFICES[c.post].tag)))return false;
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
const stg=c=>c.m<20?0:c.m<60?1:c.m<100?2:3;
const noble=c=>(c.tuoc||0)>0||(spouseOf(c)&&(spouseOf(c).tuoc||0)>0)||S.royal;
function pickEvent(c,ky,baby){
  const ok=EVENTS.filter(e=>(ky==null||!!e.ky===ky)&&(!baby||e.baby)&&eligible(e,c));if(!ok.length)return null;
  const jobEv=ok.filter(e=>e.job);
  const pool=jobEv.length&&chance(c.away?1:0.45)?jobEv:ok;
  S.evn=S.evn||{};
  const wt=e=>(e.w||1)*(e.td&&noble(c)?0.03:1)*(e.good?(c.duyen>60?1.6:1.2):1)*(c.seen[e.id]?1:2)/(1+(S.evn[e.id]||0)*0.25);
  const tot=pool.reduce((a,e)=>a+wt(e),0);let r=Math.random()*tot;let ev=pool[0];
  for(const e of pool){r-=wt(e);if(r<=0){ev=e;break}}
  c.seen[ev.id]=S.t;S.cool[ev.id]=S.t+(ev.cd??(ev.ky?24:10));S.evn[ev.id]=(S.evn[ev.id]||0)+1;kyMark(ev);
  const data={};
  if(ev.pair){const os=alive().filter(o=>o.id!==c.id&&!o.away&&ev.pair(o,c));data.oid=pick(os).id}
  return {ev:ev.id,data};
}

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
    if(sel!==c.id&&page==='giapha'){sel=c.id;centerNext=true;render()}else sel=c.id;
    showPopup(it,c);return;
  }
}
function headerFor(c){
  return `<aside class="mside"><div class="mhead">${avatarSVG(c,48)}<div><b>${esc(nameOf(c))}</b>${c.tuoc?` <span class="chip gold">${TUOC[c.tuoc]}</span>`:''}<div class="mini">${relation(c)} · ${age(c)} tuổi · ${esc(jobName(c))}${c.away?' · '+awayText(c):''}</div></div></div>
  <div class="chips">${axChips(c)}${realTraits(c).map(traitChip).join('')}${viceChips(c)}</div>${statBlock(c,true)}</aside><!--/side-->`;
}
function choicePopup(c,eyebrow,title,text,opts,arc,data,evId){
  if(DRY)return;
  data=data||{};
  const ok=opts.filter(o=>{try{return (!o.c||o.c(c,data))&&(!evId||optOk(c,o))}catch(e){return false}});
  if(!ok.length)ok.push({l:'Cho qua',f:()=>'Mọi chuyện trôi qua.'});
  // người ra mặt: trẻ con gặp chuyện thì người lớn đứng ra, tỉ lệ theo chỉ số người lớn
  const kidCase=age(c)<16&&ok.some(o=>o.h);
  let helpers=[];
  if(kidCase){helpers=home().filter(p=>p.id!==c.id&&age(p)>=16&&!p.away&&(c.parents.includes(p.id)||isHead(p)||['ae','chau'].includes(kin(c,p))));
    if(!helpers.length)helpers=[c];
    const spec=ok.find(o=>o.h&&o.r);const score=p=>spec?prob(p,spec.r[0],spec.r[1]):p.eq;
    if(!data.hp||!helpers.some(p=>p.id===data.hp))data.hp=helpers.slice().sort((a,b)=>score(b)-score(a))[0].id}
  const hp=kidCase?P(data.hp):null;
  const who=o=>o.h&&hp?hp:c;
  const probs=ok.map(o=>o.r?prob(who(o),o.r[0],o.r[1]):null);
  const pv=false?ok.map((o,i)=>{if(o.go)return null;try{return previewOpt(evId,c.id,data,opts.filter(x=>{try{return !x.c||x.c(c,data)}catch(e){return false}}).indexOf(o))}catch(e){return null}}):[];
  const pvTxt=p=>!p?'':p.f!=null?`<small class="pv">→ ${esc(p.f)}</small>`:`<small class="pv"><span class="up">Thành:</span> ${esc(p.y||'?')}${p.n?` · <span class="down">Bại:</span> ${esc(p.n)}`:''}</small>`;
  const ky=evId&&EVMAP[evId]&&EVMAP[evId].ky;
  openModal(`${headerFor(c)}<span class="eyebrow">${eyebrow} · ${dateStr(S.t)}</span><h2>${esc(title)}</h2><p>${text}</p>
   ${kidCase&&helpers.length>1?`<div class="helper"><span>Người ra mặt</span><div class="seg">${helpers.map(p=>`<button class="btn" data-hp="${p.id}" aria-pressed="${p.id===data.hp}">${esc(p.given)} <small>${KIN_N[kin(c,p)]||''}</small></button>`).join('')}</div></div>`:kidCase&&hp&&hp.id!==c.id?`<div class="helper"><span>Người ra mặt: <b>${esc(hp.given)}</b></span></div>`:''}
   <div class="choices">${ok.map((o,i)=>`<button class="btn" data-ch="${i}"><strong>${probs[i]!=null?`<span class="odds ${probs[i]<0.4?'lo':''}">${Math.round(probs[i]*100)}%</span>`:''}${esc(o.l)}${o.h&&hp&&hp.id!==c.id?` <small class="muted">(${esc(hp.given)})</small>`:''}</strong>${o.s?`<small>${esc(o.s)}</small>`:''}${pvTxt(pv[i])}</button>`).join('')}</div>
`,arc,ky?'ky':'');
  M.querySelectorAll('[data-hp]').forEach(b=>b.onclick=()=>{data.hp=b.dataset.hp;choicePopup(c,eyebrow,title,text,opts,arc,data,evId)});
  M.querySelectorAll('[data-ch]').forEach(b=>b.onclick=()=>{
    const i=+b.dataset.ch;const o=ok[i];let r;if(evId)optTook(c,o);
    if(o.go){o.go(c,data);return}
    try{
      if(o.r){const p=probs[i];const x=Math.random();
        if(x<p){r=(o.yy&&x<p*0.18)?'<b>Đại thành công!</b> '+o.yy(c,data):o.y(c,data)}
        else{r=(o.nn&&x>1-(1-p)*0.2)?'<b>Thảm bại!</b> '+o.nn(c,data):o.n(c,data)}}
      else r=o.f(c,data);
    }catch(e){console.error(e);r='Mọi chuyện trôi qua.'}
    if(S.over)return;
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
  });
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
  switch(it.kind){
    case 'ev':{const ev=EVMAP[it.ev];if(!ev){skip();return}const d=it.data||{};
      if(it.ev==='bat_linh'&&(c.away||c.job==='quan_ngu')){skip();return}
      if(d.oid){const o=P(d.oid);if(!o||!inClan(o)){skip();return}}
      if(d.xg){const o=P(d.xg);if(!o||o.dead!=null||!o.left){skip();return}}
      if(d.who){const o=P(d.who);if(!o||!inClan(o)){skip();return}}
      try{if(ev.c&&!ev.c(c,d)&&!ev.arc&&!ev.fixed){skip();return}}catch(e){skip();return}
      const txt=typeof ev.x==='function'?ev.x(c,d):ev.x;
      const opts=typeof ev.o==='function'?ev.o(c,d):ev.o;
      choicePopup(c,ev.k||(ev.arc?'Cốt truyện':ev.ky?'Kỳ ngộ':'Sự kiện'),typeof ev.t==='function'?ev.t(c,d):ev.t,txt,opts,ev.arc,d,ev.id);break}
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
    case 'retire':return retirePopup(c);
    case 'sick':return sickPopup(c);
    case 'exam':if(c.exam&&c.exam.stage===it.stage)return examPopup(c,it.stage,it.round||0);skip();return;
    case 'job18':if(c.job==='none'&&!c.away)return jobChoice(c,true);skip();return;
    case 'job':if(c.job==='none'&&!c.away&&!(c.flags.jobRetry>S.t+1))return jobChoice(c,false);skip();return;
    case 'ask':if(inClan(c)&&!c.away)return askPopup(c,it.t);skip();return;
    case 'conflict':return conflictPopup(it);
    case 'vice':return vicePopup(P(it.by),c,it.k);
    case 'school':return schoolPopup(c,it.lvl);
    case 'preg':if(c.preg)return pregPopup(c);skip();return;
    case 'birth':if(c.preg)return birthPopup(c);skip();return;
    case 'death':return deathPopup(c,it.cause);
    case 'heir':return heirPopup();
    case 'trade':return tradeReturn(c,it.trip);
    case 'raise':return raisePopup(it);
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
  const N=SN[k];const paths=brkPaths(c,k);t=t||100;
  const opts=paths.map(p=>({l:p.l,s:`${p.d} · ${p.mo[0]} đến ${p.mo[1]} tháng${p.cost?' · tốn '+money(mm(p.cost)):''}`,c:()=>!p.cost||canPay(c,mm(p.cost)),f:c=>brkStart(c,k,p,t)}));
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
  opts.push({l:'Truyền nghề cho con cháu',c:()=>home().some(p=>age(p)>=8&&age(p)<18),f:c=>{home().filter(p=>age(p)>=8&&age(p)<18).forEach(p=>p.pre[c.job]=(p.pre[c.job]||0)+3);return 'Con cháu học được ít nghề.'+fx(c,{tam:3})}});
  if(t>=100&&c.job!=='quan')opts.push({l:'Dấn thân vào việc lớn',s:'Cơ hội lớn, rủi ro lớn',r:[{[st]:1,m:1,eq:0.5},95],y:c=>'Thành công vang dội!'+fx(c,{money:mm(R(30,90)),fame:30}),n:c=>'Thất bại, hao tổn nặng.'+fx(c,{money:-mm(R(15,40)),suc:-10,tam:-10})});
  const r=nextReq(c);const need=r?Object.entries(r).filter(([k,v])=>k!=='land').map(([k,v])=>k==='m'?`thông thạo ${v}`:k==='fame'?`danh vọng ${v}`:k==='degree'?'đỗ cử nhân':k==='flag'?'một cơ duyên riêng':`${SN[k]} ${v}`).join(', '):'';
  choicePopup(c,'Thông thạo '+t,`${J.n}: thông thạo ${t}`,`${esc(c.given)} đã thông thạo nghề tới mức ${t}/120. ${t>=60?'Người trong nghề bắt đầu nể trọng.':'Tay nghề dần vững.'}${need?` Muốn lên ${J.lv[c.lv+1].n.toLowerCase()} cần: ${need}.`:''}`,opts);
}
function promoPopup(c){
  const J=JOBS[c.job];
  if(c.job==='quan')return officePopup(c);
  if(false){const vac=0,next='';
    return choicePopup(c,'Hoạn lộ','Có chức trống?',`Nghe tin trên ${['huyện','phủ','tỉnh','bộ'][Math.min(3,Math.floor(c.lv/2))]} có chức ${next} sắp trống. Người tranh không ít, còn phải xem thượng quan có ưng không.`,[
      {l:'Xin khảo hạch công bằng',r:[{tri:1,eq:0.6,fame:0.4},52+c.lv*6],y:c=>chance(vac*1.6)?`Được thăng ${next}!`+fx(c,{lv:1,fame:10+c.lv*4,tam:6}):'Đủ năng lực nhưng chức đã có người ngồi.'+fx(c,{tam:-3})+((c.flags.noPromoUntil=S.t+R(6,18)),''),n:c=>{c.flags.noPromoUntil=S.t+R(12,24);return 'Thượng quan gác lại hồ sơ.'+fx(c,{tam:-4})}},
      {l:`Lo lót thượng quan (${money(mm(10*(c.lv+1)))})`,c:()=>S.money>=mm(10*(c.lv+1)),f:c=>{const cost=-mm(10*(c.lv+1));return chance(0.4+vac)?`Được cất nhắc lên ${next}.`+fx(c,{money:cost,lv:1,liem:-8}):'Tiền mất, chức không lên.'+fx(c,{money:cost,liem:-5})}},
      {l:'Nhường cho người khác',f:c=>{c.flags.noPromoUntil=S.t+24;return 'Được tiếng khiêm nhường.'+fx(c,{fame:5,eq:1})}}]);}
  if(c.job==='quan_ngu'){const next=ARMY[c.lv+1][0];
    return choicePopup(c,'Quân công',`Xét công: ${next}`,`Chiến công của ${esc(c.given)} đã đủ ${fmt(c.merit)}. Trong doanh có chức ${next} khuyết.`,[
      {l:'Trình công lên tướng quân',r:[{vo:1,tri:0.5,eq:0.4},50+c.lv*7],y:c=>`Được thăng ${next}!`+fx(c,{lv:1,fame:6+c.lv*4,tam:8}),n:c=>'Công bị người khác cướp mất.'+fx(c,{merit:-10,tam:-8})},
      {l:'Lặng lẽ chờ',f:c=>chance(0.4)?`Thượng cấp tự đề bạt lên ${next}.`+fx(c,{lv:1}):'Chưa đến lượt.'}]);}
  const L=J.lv[c.lv+1];
  choicePopup(c,'Thăng tiến',`Cơ hội làm ${L.n.toLowerCase()}`,`${esc(c.given)} đã đủ điều kiện gánh vác việc của ${L.n.toLowerCase()}. Chủ cũ, thầy cũ hoặc phường hội đang cân nhắc.`,[
    {l:'Nhận trọng trách',r:[{[J.st]:1,eq:0.5,m:0.5},40+c.lv*8],y:c=>`Lên ${L.n}!`+fx(c,{lv:1,fame:3+c.lv*2,tam:6}),n:c=>{c.flags.noPromoUntil=S.t+12;return 'Chưa được tin tưởng, đợi dịp sau.'+fx(c,{tam:-5})}},
    {l:'Từ chối, giữ việc cũ cho nhàn',f:c=>{c.flags.noPromoUntil=S.t+24;return fx(c,{tam:3})}}]);
}
function leaveJob(c){if(c.biz){const b=bizOf(c);if(b)b.owner=null;c.biz=null}c.away=null;c.job='none';c.lv=0;c.bonus=0}
function sickPopup(c){
  const J=JOBS[c.job];const mil=['quan_ngu','hiep'].includes(c.job);
  choicePopup(c,'Bệnh tật','Sức khỏe suy kiệt',`${esc(c.given)} mới ${age(c)} tuổi mà sức đã cạn, việc ${J.n.toLowerCase()} không gánh nổi nữa. Thầy thuốc bảo cần dưỡng sức lâu dài, chưa phải hết đường.`,[
    {l:`Nghỉ dưỡng bệnh, uống thuốc (${money(mm(2))})`,c:()=>S.money>=mm(2)&&!mil,f:x=>{S.money-=mm(2);x.busyUntil=S.t+R(6,12);x.flags.noRetireUntil=S.t+48;return 'Nằm dưỡng nhiều tháng, thuốc thang đủ đầy, sức dần hồi.'+fx(x,{suc:R(14,24),tam:2})}},
    {l:mil?'Xin giải ngũ, về quê dưỡng thương':'Đổi sang việc nhẹ hơn',f:x=>{leaveJob(x);x.flags.noRetireUntil=S.t+48;enqueue('job',x.id);return mil?'Được cho về quê, mang theo vết thương cũ.'+fx(x,{suc:R(6,12),tam:-2}):'Bỏ việc nặng, tìm việc vừa sức hơn.'+fx(x,{suc:R(6,12)})}},
    {l:'Cắn răng làm tiếp',r:[{suc:1,eq:0.3},40],y:x=>'Gượng được qua cơn bệnh.'+fx(x,{tam:-2}),n:x=>'Gục ngã giữa chừng.'+fx(x,{suc:-R(6,12),hpMax:-R(1,3),tam:-6})}]);
}
function retirePopup(c){
  const a=age(c);const J=JOBS[c.job];
  choicePopup(c,'Tuổi tác','Nghỉ ngơi hay gắng sức?',`${esc(c.given)} đã ${a} tuổi${c.suc<30?', sức khỏe sa sút':''}. Việc ${J.n.toLowerCase()} ngày càng nặng nhọc.`,[
    {l:'Nghỉ hưu, an hưởng tuổi già',f:c=>{retireMark(c);if(c.job==='quan_ngu'||c.job==='hiep'){c.away=null}if(c.biz){const b=bizOf(c);if(b)b.owner=null;c.biz=null}c.job='huu';c.lv=0;c.bonus=0;return 'Gác lại công việc.'+fx(c,{tam:10,fame:c.job==='quan'?10:2})}},
    {l:'Còn gắng làm thêm',r:[{suc:1,eq:0.3},55],y:c=>'Vẫn làm tốt như xưa.'+fx(c,{tam:2}),n:c=>'Kiệt sức đổ bệnh.'+fx(c,{suc:-R(8,15),hpMax:-R(1,3),tam:-5})},
    {l:'Truyền việc cho con cháu',c:()=>home().some(p=>age(p)>=16&&p.job==='none')&&!['quan_ngu','hiep'].includes(c.job),f:c=>{retireMark(c);const k=home().find(p=>age(p)>=16&&p.job==='none');if(c.biz){const b=bizOf(c);if(b)b.owner=null;c.biz=null}setJob(k,c.job);k.m=Math.max(k.m,c.m*0.3);c.job='huu';c.lv=0;return `${esc(k.given)} nối nghiệp.`+fx(c,{tam:8})}}]);
}

/* ================= khoa cử: mỗi kỳ nhiều vòng ================= */
const EXAM_N=['thi Hương','thi Hội','thi Đình'];
const ROUNDS=[
  [['Kinh nghĩa','Giải nghĩa Tứ thư Ngũ kinh'],['Chiếu biểu','Thảo chiếu, biểu, luận'],['Văn sách','Bàn việc nước']],
  [['Kinh nghĩa','Đề hiểm hóc hơn, giám khảo khắt khe'],['Thơ phú','Phú theo đề bài'],['Văn sách','Kế sách trị quốc']],
  [['Điện thí','Vua ra đề sách vấn'],['Đối đáp','Vua hỏi trực tiếp']]];
const AP={
  'Kinh nghĩa':[['Bám sát chú giải của tiên nho',{tri:1},0,0],['Đưa kiến giải riêng',{tri:1,mi:0.2},-15,22],['Dẫn nhiều điển tích',{tri:1},-5,10]],
  'Chiếu biểu':[['Văn phong trang trọng chuẩn mực',{tri:1,eq:0.3},0,0],['Lời lẽ hoa mỹ',{tri:0.6,mi:0.6},-10,15]],
  'Văn sách':[['Bàn chuyện thủy lợi, nông tang',{tri:1},0,4],['Bàn chuyện biên phòng',{tri:1,vo:0.3},-6,12],['Chỉ thẳng tệ nạn quan trường',{tri:1,eq:-0.2},-20,25]],
  'Thơ phú':[['Theo đúng niêm luật',{tri:1},0,0],['Phóng khoáng tài hoa',{mi:0.7,tri:0.7},-12,18]],
  'Điện thí':[['Ca ngợi thánh đức, khuyên nhủ nhẹ nhàng',{tri:1,eq:0.6},0,0],['Can gián thẳng thắn',{tri:1},-18,28],['Đưa kế sách cụ thể',{tri:1,eq:0.3},-6,14]],
  'Đối đáp':[['Khiêm cung, dè dặt',{eq:1,tri:0.5},0,0],['Ứng đối nhanh nhạy, dí dỏm',{eq:0.6,mi:0.6,tri:0.6},-10,16]]};
function examPopup(c,stage,round){
  const rs=ROUNDS[stage];const [rn,rd]=rs[round];
  if(round===0)c.exam.cur=[];
  const aps=AP[rn].slice();
  const opts=aps.map(([l,spec,lo,hi])=>({l,s:hi?`Có thể cao hơn hoặc thấp hơn hẳn`:'Chắc chắn, ít bất ngờ',f:c=>{
    let v=0,w=0;for(const k in spec){v+=c[k]*spec[k];w+=Math.abs(spec[k])}
    const sc=Math.round(clamp((v/w*0.75+R(0,22)+tsum(c,'exam'))*cond(c)/0.9-stage*5+R(lo,hi),0,130));
    c.exam.cur.push(sc);return `Vòng ${rn}: được ${sc} điểm.`}}));
  if(round===0&&stage<2)opts.push({l:`Mua đề từ kẻ lạ (${money(mm(8+stage*8))})`,s:'Gian lận có thể bị bắt',c:()=>S.money>=mm(8+stage*8),f:c=>{S.money-=mm(8+stage*8);if(chance(0.35)){c.exam=null;return 'Bị bắt quả tang gian lận! Đuổi khỏi trường thi.'+fx(c,{fame:-40,tam:-20,cfame:-15})}c.exam.cheat=12;c.exam.cur.push(clamp(Math.round(c.tri*0.75+30),0,120));return 'Đề trúng y như mua.'}});
  const warn=c.tam<40||c.suc<50?' Tinh thần và sức khỏe không tốt sẽ kéo điểm xuống.':'';
  choicePopup(c,'Khoa cử',`Kỳ ${EXAM_N[stage]} · vòng ${round+1}/${rs.length}: ${rn}`,`${rd}.${round===0?(stage===2?' Thi Đình không đánh trượt, chỉ xếp hạng.':` Cần trung bình ${stage===0?55:65} điểm để đỗ.`):` Điểm các vòng trước: ${c.exam.cur.join(', ')}.`}${warn}`,opts);
  // sau khi chọn: chuyển vòng
  const okWrap=()=>{const b=M.querySelector('[data-ok]');if(!b){setTimeout(okWrap,30);return}const orig=b.onclick;b.onclick=()=>{
    if(!c.exam){orig();return}
    if(round+1<rs.length){enqueue('exam',c.id,{stage,round:round+1},true);orig();return}
    const avg=Math.round(c.exam.cur.reduce((a,b)=>a+b,0)/c.exam.cur.length);
    const txt=finishExam(c,stage,avg);O.hidden=true;M.innerHTML='';infoPopup(c,'Khoa cử','Yết bảng',txt)}};
  M.querySelectorAll('[data-ch]').forEach(b=>b.addEventListener('click',okWrap));
}
function finishExam(c,stage,s){
  if(c.g==='nữ'&&!S.royal&&chance(0.2)){c.exam=null;return 'Giám khảo phát hiện nữ cải nam trang! Bị đuổi khỏi trường thi, cả nhà mang tiếng.'+fx(c,{fame:-20,tam:-15,cfame:-10})}
  c.exam.scores[stage]=s;
  if(stage===0){if(s>=55){c.exam.stage=1;c.degree=Math.max(c.degree,1);achieve(c,'đỗ thi Hương, thành Cử nhân');return `Đỗ thi Hương, điểm trung bình ${s}, thành Cử nhân. Tháng Hai năm sau dự thi Hội.`+fx(c,{fame:12,tam:10,cfame:5})}
    return `Trung bình ${s} điểm, cần 55. Trượt thi Hương, tháng Tám năm sau thi lại.`+fx(c,{tri:2,tam:-8})}
  if(stage===1){if(s>=65){c.exam.stage=2;c.degree=Math.max(c.degree,2);achieve(c,'đỗ thi Hội');return `Đỗ thi Hội, điểm trung bình ${s}! Tháng Ba vào điện thi Đình.`+fx(c,{fame:20,tam:10,cfame:8})}
    return `Trung bình ${s} điểm, cần 65. Trượt thi Hội, tháng Hai năm sau thi lại.`+fx(c,{tri:2,tam:-8})}
  const avg=Math.round((c.exam.scores[0]+c.exam.scores[1]+s)/3);
  const rank=clamp(Math.floor((avg-55)/7),0,6);
  const title=avg>=100?'Trạng nguyên':avg>=92?'Bảng nhãn':avg>=85?'Thám hoa':'Tiến sĩ';
  c.degree=3;c.exam=null;achieve(c,'đỗ thi Đình');c.flags.examRank=rank;c.flags.examTitle=title;
  enqueue('ev',c.id,{ev:'sauthi'},true);
  return `Thi Đình được ${s} điểm. Trung bình ba kỳ ${avg}, đỗ <b>${title}</b>, có thể được bổ chức <b>${RANKS[rank]}</b>.`+fx(c,{fame:title==='Tiến sĩ'?40:90,tam:15,cfame:title==='Tiến sĩ'?20:50});
}
function register(c){c.exam={stage:0,scores:[]};log(`${nameOf(c)} ghi danh khoa cử.`)}
/* ================= quan trường: chức vị, người đương nhiệm, ghế trống ================= */
const {OFFICES}=window.D;
function offState(id){
  if(!S.off)S.off={};
  if(!S.off[id]){const O0=OFFICES[id];S.off[id]={n:pick(SURN)+' '+mkGiven('nam'),ab:clamp(45+O0.r*9+R(-8,12),30,140),age:34+O0.r*3+R(-4,12),liem:R(15,90),vac:false,since:S.t}}
  return S.off[id];
}
function officeTick(){
  if(!S.off)return;
  for(const id in S.off){const o=S.off[id];
    if(o.vac){if(S.t-o.vacT>6){Object.assign(o,{n:pick(SURN)+' '+mkGiven('nam'),ab:clamp(45+OFFICES[id].r*9+R(-8,12),30,140),age:34+OFFICES[id].r*3+R(-4,10),liem:R(15,90),vac:false,since:S.t});}continue}
    if(o.holder)continue;
    if(S.t%12===0)o.age++;
    let p=0.003+(o.age>=65?0.02:0)+(o.age>=72?0.04:0)+(o.liem<30?0.004:0);
    if(chance(p)){o.vac=true;o.vacT=S.t;o.why=o.age>=65?pick(['cáo lão về quê','qua đời']):o.liem<30?'bị hặc tội cách chức':pick(['được thăng chức nơi khác','đinh ưu về chịu tang','bị điều đi xa']);
      alive().filter(c=>c.job==='quan'&&c.flags.want===id).forEach(c=>{log(`Chức ${OFFICES[id].n} trống: ${o.n} ${o.why}.`,'gd');enqueue('promo',c.id)})}
  }
}
const postOf=c=>c.post?OFFICES[c.post]:null;
const meetsPost=(c,id)=>{const O0=OFFICES[id];for(const k in O0.req)if(c[k]<O0.req[k])return false;return true};
function assignPost(c,id){if(c.post&&S.off[c.post])S.off[c.post].holder=null;c.post=id;c.lv=OFFICES[id].r;const st=offState(id);st.vac=false;st.holder=c.id;st.since=S.t}
function postsFor(c){
  return Object.keys(OFFICES).filter(id=>{const O0=OFFICES[id];return id!==c.post&&(O0.r===c.lv+1||(O0.r===c.lv&&O0.tag!==(postOf(c)||{}).tag))});
}
function officePopup(c){
  const ts=postsFor(c).slice(0,8);
  const opts=[];
  ts.forEach(id=>{const O0=OFFICES[id];const st=offState(id);const ok=meetsPost(c,id);
    const reqTxt=Object.entries(O0.req).map(([k,v])=>`${SN[k]} ${v}`).join(', ');
    if(!ok)return;
    if(st.vac||!st.holder&&st.vac){}
    if(st.vac)opts.push({l:`Ứng cử ${O0.n} (${RANKS[O0.r]}) · đang trống`,s:`${O0.d} Cần ${reqTxt}.`,r:[{tri:1,eq:0.6,fame:0.4},st.ab-5],y:c=>{assignPost(c,id);return `Được bổ nhiệm ${O0.n}!`+fx(c,{fame:8+O0.r*4,tam:8})},n:c=>{st.vac=false;st.n=pick(SURN)+' '+mkGiven('nam');st.since=S.t;c.flags.noPromoUntil=S.t+12;return 'Người khác giỏi hơn được chọn.'+fx(c,{tam:-6})}});
    else opts.push({l:`Nhắm ghế ${O0.n} (${RANKS[O0.r]})`,s:`Đang do ${st.n} ngồi, ${st.age} tuổi, năng lực ${st.ab}${st.liem<35?', tiếng không sạch':''}. Cần ${reqTxt}.`,f:c=>{c.flags.want=id;c.flags.noPromoUntil=S.t+12;return `Để mắt tới ghế ${O0.n}. Khi trống sẽ có tin.`}});
  });
  const tgt=c.flags.want&&S.off&&S.off[c.flags.want]&&!S.off[c.flags.want].vac?c.flags.want:null;
  if(tgt){const st=S.off[tgt];const O0=OFFICES[tgt];
    opts.push({l:`Dâng sớ hặc tội ${st.n}`,s:'Thành thì ghế trống, bại thì bị trả đũa',r:[{tri:1,eq:0.8,liem:0.4},st.ab*0.6+st.liem*0.5],y:c=>{st.vac=true;st.vacT=S.t;st.why='bị hặc tội';return `${st.n} bị cách chức. Ghế ${O0.n} đã trống.`+fx(c,{fame:6,liem:3})+((enqueue('promo',c.id)),'')},n:c=>{c.flags.noPromoUntil=S.t+24;return 'Bị phản đòn, mang tiếng hãm hại đồng liêu.'+fx(c,{fame:-15,tam:-10})},nn:c=>{c.lv=Math.max(0,c.lv-1);return 'Bị giáng một bậc vì vu cáo.'+fx(c,{fame:-25,tam:-15})}});
    opts.push({l:`Lo lót thượng quan để chen ghế ${O0.n} (${money(mm(12*(O0.r+1)))})`,c:()=>S.money>=mm(12*(O0.r+1)),f:c=>{S.money-=mm(12*(O0.r+1));if(chance(0.35)){st.n=st.n;st.vac=true;st.vacT=S.t;assignPost(c,tgt);return `Thượng quan điều ${st.n} đi nơi khác, nhường ghế cho mình.`+fx(c,{liem:-10})}return 'Tiền mất, ghế vẫn chưa đến lượt.'+fx(c,{liem:-5})}});}
  opts.push({l:'Yên phận với chức hiện tại',f:c=>{c.flags.noPromoUntil=S.t+18;return 'Làm tốt việc trước mắt.'+fx(c,{m:1})}});
  choicePopup(c,'Hoạn lộ','Đường thăng tiến',`${esc(c.given)} đang làm ${esc(postOf(c)?postOf(c).n:RANKS[c.lv])}. Ở quan trường, cùng phẩm mà mỗi chức một việc, một bổng lộc. Ghế cao càng ít và người ngồi càng giỏi. Ghế chỉ trống khi người cũ về hưu, qua đời, bị hặc tội, được thăng hoặc bị điều đi.`,opts);
}

/* ================= nghề ================= */
const jobName=c=>{if(c.job==='quan')return (postOf(c)?postOf(c).n+' · ':'')+RANKS[c.lv];if(c.job==='chu'){const b=bizOf(c);return b?`Chủ ${BIZ[b.type].lv[b.lv][0].toLowerCase()}`:'Chủ cơ sở'}
  if(c.job==='quan_ngu')return ARMY[c.lv][0];const J=JOBS[c.job];return J.lv[Math.min(c.lv,J.lv.length-1)].n+(['none','huu','noi','vua','hiep'].includes(c.job)||J.lv[0].n===J.n?'':` · ${J.n}`)};
function relation(c){
  if(c.left)return ({xuatgia:'Đã xuất giá',expelled:'Bị trục xuất',lyhon:'Đã ly hôn, rời đi',ban:'Đã bị bán đi',botron:'Bỏ nhà ra đi',tumat:'Bị từ mặt',theome:'Theo mẹ',theochong:'Theo chồng rời đi',luuvong:'Lưu vong'})[c.left]||'Đã rời gia tộc';
  if(c.ngoai)return 'Cháu ngoại';
  if(c.id===S.head)return 'Gia chủ';
  const h=head();if(h&&h.spouse===c.id)return c.g==='nữ'?'Chủ mẫu':'Phu quân gia chủ';
  if(c.inLaw)return c.g==='nữ'?'Con dâu':'Con rể';
  if(c.adopted)return `Con nuôi · đời ${c.gen}`;
  return `Đời thứ ${c.gen}`;
}
function meets(c,id){const J=JOBS[id];if(!J.req)return true;return Object.entries(J.req).every(([k,v])=>c[k]>=v)}
function setJob(c,id){if(c.biz){const b=bizOf(c);if(b)b.owner=null;c.biz=null}c.mexp=c.mexp||{};if(c.job&&c.m>0&&!['none','huu','vua'].includes(c.job))c.mexp[c.job]=Math.max(c.mexp[c.job]||0,c.m);if(id==='huu')retireMark(c);c.job=id;c.lv=0;c.bonus=0;c.m=Math.min(55,Math.round(expOf(c,id)));(c.mms[id]=c.mms[id]||[]).push(...[20,40].filter(t=>t<=c.m));if(id==='nong')c.lv=farmerLv()}
function jobPopup(c,first){return jobChoice(c,first)}
/* từ quan cần lý do hợp lý */
function resignPopup(c){
  const par=S.people.filter(p=>c.parents.includes(p.id));
  const mourn=par.some(p=>p.dead!=null&&S.t-p.dead<=3);
  const oldPar=par.some(p=>inClan(p)&&age(p)>=70);
  choicePopup(c,'Quan trường','Xin từ quan',`Muốn rời quan trường phải có lý do chính đáng. Tự ý bỏ chức là coi thường triều đình.`,[
    {l:'Về chịu tang cha mẹ (đinh ưu)',s:'Nghỉ 27 tháng rồi được phục chức',c:()=>mourn,f:c=>{c.away={type:'mourn',until:S.t+27};later(c,'q_phuc_chuc',27);return 'Được về quê chịu tang.'+fx(c,{fame:4})}},
    {l:'Cáo bệnh',c:()=>c.suc<55,r:[{eq:1},45],y:c=>{quitOffice(c);return 'Triều đình chuẩn cho về dưỡng bệnh.'+fx(c,{tam:6})},n:c=>'Bị nghi giả bệnh, bác đơn.'+fx(c,{fame:-5,tam:-5})},
    {l:'Xin về phụng dưỡng cha mẹ già',c:()=>oldPar,r:[{eq:1,fame:0.3},40],y:c=>{quitOffice(c);return 'Vua khen là người con hiếu, chuẩn cho về.'+fx(c,{fame:10,tam:6})},n:c=>'Vua giữ lại, bảo việc nước quan trọng hơn.'+fx(c,{tam:-4})},
    {l:'Trí sĩ (tuổi cao)',c:()=>age(c)>=60,f:c=>{retireMark(c);quitOffice(c);c.job='huu';return 'Vinh quy trí sĩ, được ban lụa vàng.'+fx(c,{money:mm(30),fame:15,tam:10})}},
    {l:'Treo ấn từ quan không cần lý do',s:'Mạo phạm triều đình',f:c=>{quitOffice(c);return 'Bị coi là coi thường triều đình. Cả nhà bị tai tiếng.'+fx(c,{fame:-30,cfame:-15,tam:-5})}},
    {l:'Thôi, ở lại',f:c=>''}]);
}
function quitOffice(c){if(c.post&&S.off&&S.off[c.post]){S.off[c.post].holder=null;S.off[c.post].vac=true;S.off[c.post].vacT=S.t}c.post=null;c.job='none';c.lv=0;c.m=0;c.bonus=0;log(`${nameOf(c)} rời quan trường.`)}

/* ================= tòng quân, giang hồ ================= */
function dropTrips(c){S.trips.forEach(t=>{if(t.cid===c.id){t.cid=null;t.hired=true;t.skill=R(35,65)}})}
function enlist(c,forced){dropTrips(c);setJob(c,'quan_ngu');c.merit=0;c.away={type:'army'};log(`${nameOf(c)} ${forced?'bị bắt đi lính':'tòng quân'}, rời nhà ra doanh trại.`,'gd')}
function jhPopup(c){
  const amts=[0,mm(5),mm(20),mm(60)];
  openModal(`${headerFor(c)}<span class="eyebrow">Giang hồ</span><h2>Mang theo bao nhiêu lộ phí?</h2>
   <p class="muted">Người hành tẩu giang hồ rời nhà, sống bằng túi tiền riêng. Túi rỗng thì phải tự kiếm, có khi phải làm chuyện chẳng đặng đừng. Muốn về nhà lúc nào cũng được, túi còn bao nhiêu mang về bấy nhiêu.</p>
   <div class="choices">${amts.map((v,i)=>`<button class="btn" data-a="${i}" ${S.money<v?'disabled':''}><strong>${v?money(v):'Tay không'}</strong></button>`).join('')}<button class="btn ghost" data-x>Thôi</button></div>`);
  M.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{const v=amts[+b.dataset.a];S.money-=v;dropTrips(c);setJob(c,'hiep');c.purse=v;c.away={type:'jh'};log(`${nameOf(c)} khoác kiếm hành tẩu giang hồ, mang theo ${money(v)}.`,'gd');closeModal()});
  M.querySelector('[data-x]').onclick=closeModal;
}
function awayText(c){const a=c.away;if(!a)return '';return a.type==='army'?'đang ở doanh trại':a.type==='jh'?'đang bôn ba giang hồ':a.type==='mourn'?'đang chịu tang':a.type==='trade'?'đang đi buôn':''}

/* ================= học hành ================= */
const girlsCanStudy=()=>rule('nuhoc')||tierIdx()>=4||clanTuoc()>0||alive().some(p=>['quan','vua','nguy'].includes(p.job))||S.royal;
function schoolPopup(c,lvl){
  const girl=c.g==='nữ';const opts=SCHOOL[lvl];const ti=tierIdx();
  const can=(s)=>{if(girl&&!girlsCanStudy()&&!s.anyGirl&&s!==opts.nha)return false;if(s.tier&&ti<s.tier)return false;if(s.noble&&!(clanTuoc()>0||alive().some(p=>p.job==='quan')||S.royal||ti>=5))return false;return true};
  const why=(s)=>{if(girl&&!girlsCanStudy()&&!s.anyGirl&&s!==opts.nha)return 'Con gái chỉ được học khi nhà hào phú, quan lại hoặc có tước';if(s.tier&&ti<s.tier)return `Cần gia thế ${TIERS[s.tier][0]}`;if(s.noble)return 'Cần nhà có tước, quan lại hoặc thế gia';return ''};
  openModal(`${headerFor(c)}<span class="eyebrow">${['','Sáu tuổi','Mười tuổi','Mười bốn tuổi'][lvl]} · ${['','Vỡ lòng','Trung học','Cao học'][lvl]}</span><h2>Cho ${esc(c.given)} đi học ở đâu?</h2>
   <p class="muted">Học phí tính theo tháng. Mức tăng là mỗi năm, nhân với tư chất bẩm sinh và tâm trạng.</p>
   <div class="choices">${Object.entries(opts).map(([k,s])=>{const ok=can(s)&&schoolCan62(c,k);const sd=SPEC_D[k];const g=Object.entries(s.g).map(([kk,v])=>`${SN[kk]} +${v}`).concat(Object.entries(s.pre||{}).map(([j,v])=>`học việc ${JOBS[j].n.toLowerCase()} +${v}`)).join(', ');
     return `<button class="btn" data-s="${k}" ${ok?'':'disabled'}><strong>${s.n}${s.fee?` · ${money(s.fee)}/tháng`:''}</strong><small>${sd?sd+(g?' · '+g:''):(g||'Không học gì thêm')}${ok?'':' · '+(why(s)||(k==='cha'?'Cha mẹ không ở nhà':k==='gui'?'Gia tộc chưa có cơ sở làm ăn':'Chưa đủ chữ để tự học'))}</small></button>`}).join('')}</div>`);
  M.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{const k=b.dataset.s;c.school=k;const sc=opts[k];c.appr=(sc.appr||sc.gui)?apprJob(c,k):null;if(c.focus==='nghi'&&!sc.chore)c.focus='hoc';log(`${nameOf(c)} ${k==='nha'?'ở nhà':sc.appr?'theo người học nghề '+JOBS[c.appr].n.toLowerCase():sc.gui?'được gửi vào cơ sở của gia tộc học việc '+JOBS[c.appr].n.toLowerCase():sc.par?'ở nhà theo cha mẹ học':sc.chore?'ở nhà phụ việc':'vào '+sc.n.toLowerCase()}.`);closeModal()});
}

/* ================= hôn nhân ================= */
function mkSpouse(c,free,o){
  /* v6.3: đã có vợ/chồng còn sống ở trong nhà thì không cưới thêm (cốt truyện nhiều bước có thể xảy ra sau khi đã thành thân) */
  {const cur=spouseOf(c);if(cur&&inClan(cur)&&cur.spouse===c.id)return cur}
  const p=o||mkPerson({g:c.g==='nam'?'nữ':'nam',age:clamp(age(c)+R(-4,3),16,60),hh:c.hh});
  p.inLaw=true;p.gen=c.gen;p.spouse=c.id;c.spouse=p.id;p.hh=c.hh;
  STATS.forEach(([k])=>p.ms[k]=MS.filter(t=>p[k]>=t));
  if(!o||!o.job||o.job==='none'){const best=STARTJOBS.filter(id=>meets(p,id)&&JOBS[id].inc).sort((a,b)=>JOBS[b].inc-JOBS[a].inc)[0];
    p.job=p.g==='nữ'&&chance(0.55)?'noi':(best||'nong');p.m=R(0,30);(p.mms[p.job]=[]).push(...[20].filter(t=>t<=p.m))}
  p.focus=pick(['nghi','hoc','cam','phat','ren']);
  p.wantChild=false;c.wantChild=false;
  setLove(c,p,free);p.marTier=tierIdx();if(chance(0.15))p.flags.coi=1;
  if(c.flags.divorced||c.flags.widowT){if(!rule('taigia')&&c.g==='nữ')cf(-2,'Đàn bà tái giá, người đời dị nghị')}
  if(p.needT!=null&&tierIdx()-p.needT>=3&&!free)cf(-2,'Kết thông gia không môn đăng hộ đối');
  S.people.push(p);cf(free?2:5,'Cưới hỏi');S.hung=clamp(S.hung+2,0,100);
  addStat(c,'tam',12);addStat(p,'tam',10);
  log(`${nameOf(c)} kết duyên cùng ${nameOf(p)}.`,'gd');
  return p;
}
function matchmaker(c){
  if(married(c))return;
  const fee=mm(1.5);if(S.money<fee)return;S.money-=fee;
  const ti=tierIdx();
  const list=[0,1,2].map(i=>{const lift=ti*5+R(-5,10)+i*6;const p=mkPerson({g:c.g==='nam'?'nữ':'nam',age:clamp(age(c)+R(-4,3),16,60),lift});ensurePersona(p);
    const tot=p.tri+p.vo+p.mi+p.eq;const q=tot/4;
    p.fee=Math.round(mm(q/5)*(1-Math.min(c.mi,100)/250));
    p.needT=clamp(Math.floor((q-35)/12),0,6);p.needF=Math.max(0,Math.round((q-50)*3));
    return p});
  const ok=p=>tierIdx()>=p.needT&&(c.fame+S.fame*0.2)>=p.needF&&S.money>=p.fee;
  const outOk=c.g==='nữ'&&!isHead(c)&&!c.inLaw&&!married(c);
  openModal(`${headerFor(c)}<span class="eyebrow">Bà mối · đã trả ${money(fee)}</span><h2>Ba mối lương duyên</h2>
   <p class="muted">Người càng giỏi thì nhà bên kia càng kén: đòi gia thế, danh vọng và sính lễ cao. Mị lực của mình cao được giảm sính lễ. Hiện có ${money(S.money)}.</p>
   <div class="choices">${list.map((p,i)=>`<button class="btn" data-i="${i}" ${ok(p)?'':'disabled'}><strong>${esc(nameOf(p))} · ${age(p)} tuổi${traitsOf(p).length?' · '+traitsOf(p).slice(0,4).map(t=>TRAITS[t].n).join(', '):''}</strong>
   <small class="num">${STATS.map(([k,n])=>`${n} ${p[k]}`).join(' · ')}</small><small>Sính lễ ${money(p.fee)}${p.needT?` · đòi gia thế từ ${TIERS[p.needT][0]}`:''}${p.needF?` · đòi danh vọng ${p.needF}`:''}</small></button>`).join('')}
   ${outOk?list.map((p,i)=>`<button class="btn" data-o="${i}" ${tierIdx()+1>=p.needT?'':'disabled'}><strong>Gả ${esc(c.given)} về nhà họ ${esc(p.surname)}</strong><small>Con gái về nhà chồng, gia tộc nhận lại khoảng ${money(Math.round(p.fee*0.6))} sính lễ</small></button>`).join(''):''}
   <button class="btn ghost" data-x>Chưa ưng ai</button></div>`);
  M.querySelectorAll('[data-i]').forEach(b=>b.onclick=()=>{const p=list[+b.dataset.i];if(!married(c)){S.money-=p.fee;mkSpouse(c,false,p)}closeModal()});
  M.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>{const p=list[+b.dataset.o];marryOut(c,p);closeModal()});
  M.querySelector('[data-x]').onclick=closeModal;
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
   <div class="choices">${MW.map(([n,c,r],i)=>`<button class="btn" data-w="${i}" ${S.money<mm(c/10)*1&&c?'disabled':''}><strong>${n}${c?` · ${money(mm(c/10))}`:''}</strong><small>Rủi ro sinh khó khoảng ${Math.round((r+(age(m)>35?0.08:0)+(m.preg.twins?0.12:0)-(m.preg.care*0.03))*100)}%</small></button>`).join('')}</div>`);
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
function doBirth(m,risk,harmF,who){
  const f=P(m.preg.father);const tw=m.preg.twins;
  risk+=(age(m)>35?0.08:0)+(m.suc<50?0.08:0)+(tw?0.12:0)-m.preg.care*0.03;
  const comp=chance(Math.max(0.01,risk));
  const kids=[childOf(m,f,chance(0.5)?'nam':'nữ')];if(tw)kids.push(childOf(m,f,chance(0.5)?'nam':'nữ'));
  const lossHp=Math.round((R(2,5)+(comp?R(4,10):0)+(tw?R(2,4):0))*harmF);const harm=Math.round((R(4,10)+(comp?R(10,22):0))*harmF);
  let txt=`${esc(nameOf(m))} hạ sinh ${tw?'một cặp song sinh':`một ${kids[0].g==='nam'?'bé trai':'bé gái'}`}${comp?'. Ca sinh khó, người mẹ mất nhiều máu':''}. ${esc(who)} đỡ đẻ.`;
  const lost=[];kids.forEach(k=>{if(comp&&chance(0.25*harmF)){lost.push(k)}else S.people.push(k)});
  if(lost.length)txt+=` Đau đớn thay, ${lost.length===kids.length?'đứa bé không qua khỏi':'một bé không qua khỏi'}.`;
  addStat(m,'suc',-harm);m.cap.suc=Math.max(1,m.cap.suc-lossHp);if(m.suc>m.cap.suc)m.suc=m.cap.suc;
  addStat(m,'tam',lost.length?-15:10);if(f)addStat(f,'tam',lost.length?-10:10);
  const live=kids.filter(k=>!lost.includes(k));
  log(`${nameOf(m)} hạ sinh ${live.map(k=>nameOf(k)).join(' và ')||'nhưng con không qua khỏi'}.${comp?' Ca sinh khó.':''}`,lost.length?'hi':'gd');
  m.preg=null;m.flags.ppUntil=S.t+R(10,16)+(comp?R(4,8):0);if(live.length)overBirth(m);
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
  const b={id:'b'+S.t+R(100,999),type,lv:0,owner:c.id,staff:[],bonus:0,own};S.biz.push(b);c.bizFrom=c.job;c.mexp=c.mexp||{};if(c.m>0&&!['none','huu','chu'].includes(c.job))c.mexp[c.job]=Math.max(c.mexp[c.job]||0,c.m);
  if(c.biz){const ob=bizOf(c);if(ob)ob.owner=null}
  c.job='chu';c.biz=b.id;c.lv=0;c.bonus=0;c.m=Math.max(20,Math.floor(c.m*0.7));
  log(`${nameOf(c)} khai trương ${B.lv[0][0].toLowerCase()}.`,'gd');c.fame+=5;cf(5,'Khai trương cơ sở');render();save();
}
function expandBiz(b){const B=BIZ[b.type];const nx=B.lv[b.lv+1];if(!nx||bizFundGet(b)<nx[1])return;bizFundAdd(b,-nx[1]);b.lv++;cf(5*b.lv,'Mở rộng cơ sở');log(`Mở rộng thành ${nx[0].toLowerCase()}.`,'gd');render();save()}
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
function tradePopup(){
  if(S.trips.length>=maxTrips())return;
  const traders=alive().filter(p=>age(p)>=16&&!p.away&&(['tieunhi','hangrong'].includes(p.job)||p.job==='chu'&&bizOf(p)&&['tiem','thuyen'].includes(bizOf(p).type)||p.eq>=55));
  const st={who:traders[0]?traders[0].id:'hire',route:w_routeIdx(),src:'buy',good:'lua',pct:50};
  const draw=()=>{
    const c=st.who==='hire'?null:P(st.who);const mmv=c?(c.job==='chu'?Math.max(c.m,40):c.m):35;
    const RT=routes();if(st.route>=RT.length)st.route=0;const r=RT[st.route];const routeOk=mmv>=r.mm&&!r.war;
    const capMax=Math.min(r.cap,Math.max(0,S.money));const cap=Math.round(capMax*st.pct/100);
    const kq=S.kho[st.good]||0;
    const qty=st.src==='kho'?Math.floor(kq*st.pct/100):Math.floor(cap/priceOf(st.good));
    const sellM=1+((r.sell[st.good]||1)-1)*w_damp(st.good)*(r.fr||1);
    openModal(`<span class="eyebrow">Thương mại</span><h2>Đi buôn chuyến</h2>
    <div class="field"><label>Người đi buôn</label><select class="sel" id="tw">${traders.map(p=>`<option value="${p.id}" ${st.who===p.id?'selected':''}>${esc(nameOf(p))} · EQ ${Math.floor(p.eq)} · thông thạo ${Math.floor(p.m)} · danh vọng ${Math.round(p.fame)}</option>`).join('')}<option value="hire" ${st.who==='hire'?'selected':''}>Thuê lái buôn bên ngoài · ăn 20% tiền lãi, tay nghề trung bình</option></select></div>
    <div class="field"><label>Tuyến</label><select class="sel" id="tr">${RT.map((x,i)=>`<option value="${i}" ${st.route===i?'selected':''}>${x.n} · ${x.mo} tháng · rủi ro ${Math.round(x.risk*100)}%${x.mm?` · cần thông thạo ${x.mm}`:''}${x.war?' · đang đóng vì chiến sự':''}</option>`).join('')}</select><p class="note">${r.d} Đắt hơn ở nhà: ${Object.entries(r.sell).map(([g,v])=>`${GOODS[g].n} ×${v}`).join(', ')||'không có gì'}.${Object.keys(r.buy).length?` Rẻ hơn ở nhà, mua mang về: ${Object.entries(r.buy).map(([g,v])=>`${GOODS[g].n} ×${v}`).join(', ')}.`:''}</p></div>
    <div class="field"><label>Hàng mang đi</label><div class="seg"><button class="btn" data-src="buy" aria-pressed="${st.src==='buy'}">Bỏ vốn mua hàng</button><button class="btn" data-src="kho" aria-pressed="${st.src==='kho'}">Lấy hàng trong kho</button></div>
    <select class="sel" id="tg">${Object.entries(GOODS).map(([k,g])=>`<option value="${k}" ${st.good===k?'selected':''}>${g.n} · giá nhà ${money(priceOf(k))}/${g.u}${st.src==='kho'?` · kho có ${fmt(S.kho[k]||0)}`:''} · nơi đến ×${(r.sell[k]||1).toFixed(2)}</option>`).join('')}</select></div>
    <div class="field"><label>Lượng: ${st.pct}%</label><div class="seg">${[25,50,75,100].map(v=>`<button class="btn" data-pct="${v}" aria-pressed="${st.pct===v}">${v}%</button>`).join('')}</div>
    <p class="note">${st.src==='kho'?`Mang ${fmt(qty)} ${GOODS[st.good].u} từ kho gia tộc (gia chủ cho phép).`:`Bỏ vốn ${money(cap)} mua ${fmt(qty)} ${GOODS[st.good].u}. Vốn tối đa của tuyến: ${money(r.cap)}.`} Ước bán được khoảng ${money(qty*priceOf(st.good)*sellM)}, còn tùy thời vận, mùa màng, dịch bệnh, chiến sự và danh vọng.</p></div>
    <div class="choices"><button class="btn primary" data-go ${routeOk&&qty>0?'':'disabled'}>Lên đường</button><button class="btn ghost" data-x>Thôi</button></div>`);
    const q=s=>M.querySelector(s);
    q('#tw').onchange=e=>{st.who=e.target.value;draw()};q('#tr').onchange=e=>{st.route=+e.target.value;draw()};q('#tg').onchange=e=>{st.good=e.target.value;draw()};
    M.querySelectorAll('[data-src]').forEach(b=>b.onclick=()=>{st.src=b.dataset.src;draw()});M.querySelectorAll('[data-pct]').forEach(b=>b.onclick=()=>{st.pct=+b.dataset.pct;draw()});
    q('[data-x]').onclick=closeModal;
    q('[data-go]').onclick=()=>{if(st.src==='kho')S.kho[st.good]-=qty;else S.money-=qty*priceOf(st.good);
      const tr={until:S.t+r.mo,route:st.route,r:JSON.parse(JSON.stringify(r)),good:st.good,qty,cost:st.src==='kho'?qty*priceOf(st.good):qty*priceOf(st.good),cid:c?c.id:null,hired:!c,skill:c?null:R(35,65)};
      S.trips.push(tr);if(c)c.away={type:'trade',until:tr.until};
      log(`${c?nameOf(c):'Lái buôn thuê'} mang ${fmt(qty)} ${GOODS[st.good].u} ${GOODS[st.good].n.toLowerCase()} đi ${r.n.toLowerCase()}.`);closeModal()};
  };
  draw();
}
function tradeReturn(c0,tr){
  const r=tr.r||routes()[tr.route]||routes()[0];const c=tr.cid?P(tr.cid):null;const who=c||head();
  const sk=c?((c.eq+c.tri*0.5)/150+c.m/200+tsum(c,'trade')):tr.skill/120;
  const fameB=Math.min(0.15,((c?c.fame:0)+S.fame*0.1)/2000);
  let risk=r.risk*(c?(1.2-c.vo/200):1.1)*(S.war?1.4:1)*(season()==='dong'&&(r.sea||r.war)?1.3:1)*(S.epi?1.2:1);
  const spoil=w_spoil(tr.good,r.mo);const val=tr.qty*(tr.pv||priceOf(tr.good))*(1+((r.sell[tr.good]||1)-1)*w_damp(tr.good)*(r.fr||1))*(1-spoil)*(rule('trongthuong')?1.08:1)*(rule('trongnong')?0.95:1)*(0.75+Math.random()*0.25+sk*0.15+fameB)*(S.epi&&tr.good==='duoc'?1.4:1)*(S.war&&['lua','sat','muoi'].includes(tr.good)?1.15:1);
  const toll=Math.round(tr.cost*(0.01+0.02*r.mo+0.04*(r.cross||0)));
  const fee=tr.hired?Math.max(0,(val-toll-tr.cost)*0.2):0;
  const got=Math.max(0,Math.round(val-fee-toll));
  const buyable=Object.entries(r.buy);
  if(chance(risk)){
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
  if(a>=16&&c.tri>=55&&subOf(c,'tv')>=55&&!c.exam&&c.degree<3&&c.job!=='quan')out.push('Ấp ủ chuyện thi cử đỗ đạt.');
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
  const cands=home().filter(c=>age(c)>=16&&inClan(c)&&!isHead(c));
  for(const c of cands){if(!chance(0.012))continue;ensurePersona(c);const a=age(c);const F=c.flags;
    const T=[];
    if(c.job!=='chu'&&!['quan','vua','quan_ngu'].includes(c.job)&&(subOf(c,'tv')>=55||subOf(c,'dl')>=65)&&Object.keys(BIZ).some(t=>canOwn(c,t)))T.push('biz');
    if(!married(c)&&a>=19&&a<=32&&subOf(c,'hd')>=40)T.push('marry');
    if(a<=35&&c.tri>=55&&subOf(c,'tv')>=55&&!c.exam&&c.degree<3&&c.job!=='quan')T.push('exam');
    const w=wishOf(c);if(w&&w!=='none'&&w!==c.job&&meets(c,w)&&subOf(c,'dl')>=50&&c.tam<50&&a<45&&!['quan','vua','chu','quan_ngu','huu'].includes(c.job)&&(c.job!=='noi'||c.tri>=70||axv(c,'tv')>=65))T.push('job');
    if(married(c)&&!c.inLaw&&(c.gen||1)>=2&&a>=24&&subOf(c,'dl')>=62&&c.hh===mainHH())T.push('moveout');
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
  if(t==='job')return !c.wish||c.wish===c.job||['quan','vua','chu','quan_ngu','huu'].includes(c.job);
  if(t==='moveout')return !married(c)||c.hh!==mainHH();
  if(t==='army')return c.job==='quan_ngu'||!!c.away;
  return false}
function askPopup(c,t){
  if(askStale(c,t)){setTimeout(nextPopup,0);return}
  const h=head();const ht=subOf(c,'ht'),dl=subOf(c,'dl');
  const B=t==='biz'?Object.keys(BIZ).filter(x=>canOwn(c,x)).sort((x,y)=>BIZ[x].lv[0][1]-BIZ[y].lv[0][1])[0]:null;
  const L0=B?BIZ[B].lv[0]:null;
  const T={biz:[`Muốn tự ra làm chủ`,`"Con làm thuê cho người ta đã lâu, nay muốn tự mở ${L0?L0[0].toLowerCase():''}. Xin gia chủ cho phép và giúp vốn ${L0?money(L0[1]):''}."`],
    marry:['Muốn lập gia thất',`"Con cũng đến tuổi rồi, xin gia chủ tìm cho con một mối."`],
    exam:['Muốn đi thi',`"Con muốn ghi danh khoa cử, thử sức một phen."`],
    job:['Muốn đổi nghề',`"Nghề này không hợp với con. Con muốn đi làm ${JOBS[c.wish]?JOBS[c.wish].n.toLowerCase():''}."`],
    moveout:['Muốn ra ở riêng',`"Vợ chồng con muốn dựng nhà riêng, tự lo liệu."`],
    army:['Muốn tòng quân',`"Đất nước có biến, con muốn ra trận lập công."`]}[t];
  const ob=obey(c);
  const refuse=()=>{
    if(ob>=60||(ht>=60&&ob>=45))return 'Vâng lời, không nhắc lại nữa.'+fx(c,{tam:-4});
    let r='';if(h)addRel(c,h,-15);
    if((dl>=72&&ht<40&&chance(0.4))||(ob<25&&chance(0.5))){
      if(t==='biz'&&L0&&S.money>=L0[1]*0.5){S.money-=Math.round(L0[1]*0.5);const id=newBranch(c,1,Math.max(0,c.purse));c.purse=0;c.hh=id;const sp=spouseOf(c);if(sp&&inClan(sp))sp.hh=id;kidsOf(c).filter(k=>inClan(k)&&age(k)<16).forEach(k=>k.hh=id);
        const bz={id:'b'+S.t+R(100,999),type:B,lv:0,staff:[],owner:c.id,own:id};c.bizFrom=c.job;S.biz.push(bz);c.job='chu';c.biz=bz.id;c.lv=0;log(`${nameOf(c)} không nghe lời, tự ra riêng mở ${L0[0].toLowerCase()}, vay họ hàng nửa vốn.`,'hi');return 'Không nghe lời, tự ra riêng làm chủ!'+fx(c,{tam:5})}
      if(t==='marry'){mkSpouse(c,true);return 'Không đợi gia chủ, tự tìm được người rồi dắt về ra mắt.'+fx(c,{tam:8,fame:-3})}
      if(t==='exam'){register(c);return 'Vẫn lén ghi danh đi thi.'+fx(c,{tam:2})}
      if(t==='army'){enlist(c,false);return 'Bỏ nhà đi tòng quân.'}
    }
    return 'Buồn bực, giận gia chủ.'+fx(c,{tam:-10});
  };
  const ok={biz:{l:`Đồng ý, gia tộc bỏ vốn (${L0?money(L0[1]):''})`,c:()=>L0&&S.money>=L0[1],f:c=>{openBiz(c,B);if(h)addRel(c,h,10);return 'Mừng rỡ cảm tạ.'+fx(c,{tam:12})}},
    marry:{l:'Mời bà mối',f:c=>{setTimeout(()=>matchmaker(c),0);if(h)addRel(c,h,5);return 'Gia chủ nhận lời lo liệu.'}},
    exam:{l:'Cho đi thi',f:c=>{register(c);if(h)addRel(c,h,8);return 'Hăm hở sửa soạn bút nghiên.'+fx(c,{tam:8})}},
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
  opts.push({l:girlHome?'Ở nhà lo việc nội trợ':un?'Chiều ý, cho ở nhà':'Chưa muốn đi làm',f:x=>{if(girlHome){setJob(c,'noi');return 'Ở nhà quán xuyến việc nhà.'}return 'Ở nhà thêm một thời gian.'+fx(c,{tam:3})}});
  choicePopup(c,first?'Tròn mười tám':'Nghề nghiệp','Chọn nghề kiếm sống',un?`${esc(c.given)} chưa muốn đi làm. Nếu gia chủ ép thì khó qua phỏng vấn.`:`${esc(c.given)} muốn làm ${JOBS[w]?JOBS[w].n.toLowerCase():'gì đó'}.`,opts);
  // không ghi nhật ký cho bước trung gian
}
function pathJob(c,p){let L=PATHS[p].jobs.filter(id=>meets(c,id)&&id!==c.job);const F=L.filter(id=>jobFit(c,id));if(F.length)L=F;if(!L.length)return null;
  return L.map(id=>[id,c[JOBS[id].st]+(c.pre[id]||0)*0.4+R(0,12)]).sort((a,b)=>b[1]-a[1])[0][0]}
function pathPopup(c){
  const opts=Object.keys(PATHS).map(p=>{const id=pathJob(c,p);return id?{l:`${PATHS[p].n}: ${JOBS[id].lv[0].n}`,s:`${PATHS[p].d} · ${SN[JOBS[id].st]} ${Math.floor(c[JOBS[id].st])}`,go:()=>{const w=wishOf(c);let mot=w===id?1:w==='none'?-2:-1;
    if(mot<0&&subOf(c,'ht')<40){const h=head();if(h&&h.id!==c.id)addRel(c,h,-8);addStat(c,'tam',-6)}
    interviewPopup(c,id,mot)}}:null}).filter(Boolean);
  opts.push({l:'Thôi, để sau',go:()=>closeModal()});
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
    ap.map(o=>({l:o.l,r:[o.sp,diff],y:x=>hired(c,id,chance(0.2)?2:chance(0.45)?1:0),yy:x=>hired(c,id,2),n:x=>{c.flags.jobRetry=S.t+12;log(`${nameOf(c)} trượt phỏng vấn làm ${J.lv[0].n.toLowerCase()}.`,'hi');return 'Bị từ chối. Năm sau thử lại.'+fx(c,{tam:-6})}})));
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
  if(a>=16&&!c.away){const J=JOBX[c.job];if(J)addg(J.sk)}
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
function dropHabit(c,k){c.habits=c.habits.filter(h=>h!==k);if(c.vlv)delete c.vlv[k];if(c.vt)delete c.vt[k];if(c.vnat)delete c.vnat[k]}
/* bớt tật xấu: đã thành bản tính thì chỉ bớt được một phần */
function cutVice(c,k,v){if(!c.habits.includes(k))return 0;if(!isVice(k)){dropHabit(c,k);return 100}
  const nat=c.vnat&&c.vnat[k];const d=Math.round(v*(nat?0.45:1)*(0.7+axv(c,'yc')/170));c.vlv[k]=vlv(c,k)-d;
  if(c.vlv[k]<=0){dropHabit(c,k);if(!DRY)log(`${nameOf(c)} đã bỏ hẳn được ${HABITS[k].n.toLowerCase()}.`,'gd')}return d}
/* cha mẹ hoặc gia chủ được báo khi con cháu nhiễm tật */
function viceAlert(c,k){
  const a=age(c);
  const par=S.people.filter(p=>c.parents.includes(p.id)&&inClan(p)&&!p.away&&age(p)>=25).sort((x,y)=>relOf(c,y)-relOf(c,x))[0];
  const by=(a<25&&par)?par:(!isHead(c)?head():null);
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
      if(c.vlv[k]>=50&&!isHead(c))viceAlert(c,k);
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
  const diff=30+L*0.45-(axv(c,'ht')-50)*0.4+(relOf(c,by)<0?10:0)+(nat?15:0);
  const done=(c,txt)=>{c.flags.vdT=S.t+6;return txt};
  const rel=k2=>KIN_N[kin(by,c)]||'người nhà';
  choicePopup(by,'Gia giáo',`${c.given} nhiễm thói ${HABITS[k].n.toLowerCase()}`,
    `${esc(nameOf(c))}, ${age(c)} tuổi, dạo này sa vào ${VTXT[k]}${L>=60?', đã khá nặng':L>=35?', ngày càng nhiều':', mới chớm'}${nat?'. Thói này đã ăn vào bản tính, rất khó bỏ':''}. ${esc(by.given)} là ${KIN_N[kin(c,by)]||'gia chủ'} phải ra tay. Cách nào hiệu quả phụ thuộc vào ${esc(by.given)} và tính nết của ${esc(c.given)}.`,[
    {l:'Khuyên răn nhẹ nhàng',s:'Dựa vào EQ và khẩu tài người khuyên',r:[{eq:0.6,khau:0.6},diff],
      y:x=>{const d=cutVice(c,k,R(30,50));addRel(c,by,3);return done(c,`${esc(c.given)} nghe ra, hứa sửa đổi.`+fx(c,{tam:-2})+shiftAx(c,{tiet:4,ht:1}))},
      n:x=>{c.vlv[k]=Math.min(100,vlv(c,k)+4);addRel(c,by,-3);return done(c,'Nghe tai này lọt tai kia.')}},
    {l:'Đánh đòn cho chừa',s:kid?'Trẻ con thì sợ':'Người ngỗ nghịch có thể chống lại',f:x=>{
      if(kid||axv(c,'ht')>=55){cutVice(c,k,R(40,60));addRel(c,by,-8);return done(c,`Một trận đòn nhớ đời. ${esc(c.given)} sợ, không dám tái phạm.`+fx(c,{tam:-8})+shiftAx(c,{ht:2,diem:-1}))}
      if(axv(c,'dl')>=65&&chance(0.45)){addRel(c,by,-25);c.vlv[k]=Math.min(100,vlv(c,k)+6);return done(c,`${esc(c.given)} uất ức bỏ nhà đi mấy hôm, về rồi càng lầm lì.`+fx(c,{tam:-12})+shiftAx(c,{ht:-4,hd:-2}))}
      cutVice(c,k,R(20,35));addRel(c,by,-15);return done(c,'Bị đánh thì chịu, nhưng ấm ức trong lòng.'+fx(c,{tam:-8})+shiftAx(c,{ht:-1}))}},
    {l:'Cắt tiền tiêu, cấm ra khỏi nhà',c:()=>['bac','thanhlau','xahoa','ruou'].includes(k),f:x=>{cutVice(c,k,R(25,40));addRel(c,by,-6);return done(c,'Không có tiền, không ra được cửa, đành ở nhà.'+fx(c,{tam:-8})+shiftAx(c,{tiet:2}))}},
    {l:`Gửi lên chùa tu tâm nửa năm (${money(mm(6))})`,c:()=>S.money>=mm(6),f:x=>{S.money-=mm(6);cutVice(c,k,R(50,80));return done(c,'Tiếng chuông chùa làm lòng dịu lại.'+fx(c,{tam:-3,eq:1})+shiftAx(c,{tiet:6,diem:3}))}},
    {l:'Mặc kệ',f:x=>{c.vlv[k]=Math.min(100,vlv(c,k)+8);S.on=clamp(S.on-1,0,100);return done(c,'Mọi chuyện cứ thế trôi.')}}]);
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

function ensureEcon(st){
  st=st||S;if(!st)return;
  if(st.gop==null)st.gop=0.2;
  st.coff=st.coff||{};st.books=st.books||[];
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
function clanKeeps(c){const a=age(c);if(!inMain(c))return false;if(a<18||a>=60||isHead(c))return true;if(['huu','noi','nong'].includes(c.job))return true;if(offOf(c))return true;if(c.away&&c.away.type!=='trade')return true;return false}
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
  let v=s.inc*(0.75+(c.suc+c.vo)/400)*(0.85+skv(c,'ky')/300);
  if(c.job==='nong'&&BUSY.includes(mo))v*=0.3;else if(c.job!=='nong'&&(income(c)>0||['chu','quan','quan_ngu'].includes(c.job)))v*=0.5;
  if(a<16)v*=0.6;
  if(s.vary&&!est)v*=Math.random()*2;
  return Math.round(v)}
function earnOf(c,est){if(!inClan(c))return 0;return income(c)+sideIncome(c)+sideInc(c,est)}
const sideNow=c=>{const F=FOCUS[c.focus];return F&&F.side&&(!F.side.mo||F.side.mo.includes(month()))};

/* ---------- chi tiêu hộ ---------- */
function hhFactor(id){
  const mem=alive().filter(p=>p.hh===id);
  const noi=mem.filter(p=>p.job==='noi'&&age(p)>=16&&!p.away).reduce((m,p)=>Math.max(m,(p.lv+1)*0.06+skv(p,'ql')/1000),0);
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
    if(f==='clan'){if(isHead(c)){S.money+=e;add(L.in,'luong',e)}else{const g=Math.round(e*S.gop);S.money+=g;c.purse+=e-g;add(L.in,'gop',g)}}
    else{const g=Math.round(e*(rule('chigop')?0.1:0.05));S.money+=g;S.hh[f].money+=e-g;add(L.in,'chi',g)}}
  for(const id in S.hh){const h=S.hh[id];const mem=alive().filter(p=>p.hh===id&&inClan(p));
    if(!mem.length){if(h.rent&&!h.sold){const r=Math.round(HOMES[h.home].cost*0.004);const o=P(h.owner);if(o&&o.dead==null&&inClan(o))o.purse+=r;else{S.money+=r;add(L.in,'thue',r)}}continue}
    const k=hhFactor(id);
    if(id===main){const up=HOMES[h.home].upkeep;S.money-=up;add(L.out,'nha',up);
      mem.forEach(p=>{const s=personalSpend(p);const r=Math.max(0,s.ranh);const vc=Math.min(s.thoi,viceSpend(p)*k);const tot=(s.base+r+s.hoc+s.thoi)*k-vc;
        const sp=spouseOf(p);const payer=p.job==='noi'&&age(p)<60&&sp&&inClan(sp)&&sp.hh===p.hh&&!isHead(sp)&&!clanKeeps(sp)&&sp.purse>tot*2?sp:null;
        if(payer){payer.purse-=Math.round(tot)}
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
  const sp=spouseOf(p);if(sp&&inClan(sp)&&sp.hh===p.hh&&sp.purse>0){const t2=Math.min(sp.purse,short);sp.purse-=t2;short-=t2}
  if(short){S.money-=short;p.anbam=Math.min(24,(p.anbam||0)+1)}
  return short}
/* ước tính một tháng cho trang Cơ ngơi (không đổi gì) */
function econEst(){
  const main=mainHH();const L={in:{},out:{}};const add=(o,k,v)=>{v=Math.round(v);if(v)o[k]=(o[k]||0)+v};
  add(L.in,'tuoc',titlePay());add(L.in,'to',toIncome());add(L.out,'ruong',S.farm.hired*450);
  S.biz.forEach(b=>{if(b.own!=='clan')return;const pr=b.last?b.last.profit:0;add(L.in,'kd',pr);const o=P(b.owner);if(o&&inClan(o)&&pr>0)add(L.out,'quanly',pr*((BIZX[b.type]||{}).mgr||0.15))});
  alive().forEach(c=>{if(!inClan(c))return;const e=earnOf(c,true);if(!e)return;if(fundOf(c)==='clan'){if(isHead(c))add(L.in,'luong',e);else add(L.in,'gop',e*S.gop)}else add(L.in,'chi',e*(rule('chigop')?0.1:0.05))});
  const h=S.hh[main];if(h){add(L.out,'nha',HOMES[h.home].upkeep);const k=hhFactor(main);
    alive().filter(p=>p.hh===main&&inClan(p)).forEach(p=>{const s=personalSpend(p);const r=Math.max(0,s.ranh);const vc=Math.min(s.thoi,viceSpend(p)*k);if(clanKeeps(p)){add(L.out,'an',s.base*k);add(L.out,'ranh',r*k);add(L.out,'hoc',s.hoc*k);add(L.out,'thoi',s.thoi*k-vc)}else{const tot=(s.base+r+s.hoc+s.thoi)*k-vc;if(p.purse<tot*2)add(L.out,'nuoi',Math.max(0,tot-Math.max(0,p.purse)/2))}})}
  for(const k in CLANOFF){if(offHolder(k))add(L.out,'chuc',mm(CLANOFF[k].pay))}
  return L}
const FLOWN={tat:'Người nghiện lén lấy tiền nhà',cuu:'Người nhà góp lúc túng thiếu',tuoc:'Bổng tước',to:'Tô ruộng phát canh',mua:'Thu hoạch',kd:'Lãi cơ sở của gia tộc',luong:'Lương gia chủ',gop:'Người nhà góp quỹ',chi:'Chi phái góp giỗ chạp',thue:'Cho thuê nhà',
  ruong:'Thuê người làm ruộng',quanly:'Lương người trông cơ sở',nha:'Bảo dưỡng nhà chính',an:'Ăn ở (người gia tộc nuôi)',ranh:'Thời gian rảnh (gia tộc nuôi)',hoc:'Học phí',thoi:'Thói quen (gia tộc nuôi)',nuoi:'Bù cho người không đủ tiền tự lo',chuc:'Lương chức trong tộc'};

/* ---------- chức trong tộc ---------- */
function offHolder(k){const id=S.coff&&S.coff[k];if(!id)return null;const p=P(id);
  if(!p||p.dead!=null||!inClan(p)||!inMain(p)||isHead(p)||age(p)<16){S.coff[k]=null;if(p&&p.dead==null&&!DRY)log(`${nameOf(p)} thôi giữ chức ${CLANOFF[k].n.toLowerCase()} trong tộc.`);return null}
  return p.away&&p.away.type!=='trade'?null:p}
function offV(k){if(!S.coff)return 0;const id=S.coff[k];const p=id?P(id):null;if(!p||p.dead!=null||p.away)return 0;const [s,v]=CLANOFF[k].need;return Math.max(0,(s==='ql'?skv(p,'ql'):p[s])-v+10)}
const offOk=(p,k)=>{const [s,v]=CLANOFF[k].need;return inClan(p)&&inMain(p)&&!isHead(p)&&age(p)>=18&&!p.away&&(s==='ql'?skv(p,'ql'):p[s])>=v};
const clanFormed=()=>alive().some(p=>(p.gen||1)>=2&&married(p)&&inClan(p));

/* ---------- chi phái ---------- */
function branchName(c){const w=String(c.given||'').split(' ').filter(Boolean);const key=(S.poem!=null&&w.length>1)?w[w.length-1]:(w[0]||'Mới');
  const used=new Set(Object.values(S.hh).map(h=>h.name));let n='Chi '+key,i=2;while(used.has(n))n='Chi '+key+' '+(i++);return n}
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

/* ---------- gia chủ mới đang ở riêng thì về nhà chính ---------- */
function becomeHead(p){
  const old=mainHH();S.head=p.id;
  if(p.hh===old||!S.hh[old])return;
  const from=p.hh;const sp=spouseOf(p);
  const movers=alive().filter(x=>x.hh===from&&(x===p||x===sp||((x.parents.includes(p.id)||(sp&&x.parents.includes(sp.id)))&&(!married(x)||age(x)<18))));
  movers.forEach(x=>x.hh=old);
  log(`${nameOf(p)} dọn về nhà chính để lo việc gia tộc.`,'gd');
  const h=S.hh[from];
  if(!alive().some(x=>x.hh===from)){if(h.money>0)p.purse+=h.money;else S.money+=h.money;h.money=0;h.owner=p.id;if(h.home>0)enqueue('vacant',p.id,{hh:from},true)}
}
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
    {l:`Thưởng hậu (${money(big)})`,c:()=>S.money>=big,f:()=>{S.money-=big;c.purse+=big;addRel(c,hd,10);addStat(c,'tam',10);cf(2,'Gia tộc khen thưởng');return `${esc(c.given)} nhận thưởng trước mặt cả họ, ai cũng nể.`}},
    {l:`Thưởng vừa phải (${money(mid)})`,c:()=>S.money>=mid,f:()=>{S.money-=mid;c.purse+=mid;addRel(c,hd,5);addStat(c,'tam',5);return `${esc(c.given)} vui vẻ nhận thưởng.`}},
    {l:'Khen trước từ đường, không thưởng tiền',f:()=>{addRel(c,hd,3);addStat(c,'tam',3);c.fame+=2;return `Tên ${esc(c.given)} được đọc trước bàn thờ tổ tiên.`}},
    {l:'Việc nên làm, không cần thưởng',f:()=>{addRel(c,hd,-4);addStat(c,'tam',-3);return `${esc(c.given)} có phần chạnh lòng.`}}]);
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
  if(o&&o.biz===b.id){o.biz=null;o.job='none';o.lv=0;if(inClan(o)&&age(o)<60)enqueue('job',o.id)}
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
const bookLv=id=>(S.books||[]).filter(b=>b.job===id).reduce((m,b)=>Math.max(m,b.lv),0);
function expOf(c,id){return Math.max(c.pre[id]||0,(c.mexp&&c.mexp[id])||0,bookLv(id)*0.4)}
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
function bossRaisePopup(c){const J=JOBS[c.job];const boss=EMPLOYER[c.job]||'cấp trên';const promo=canPromote(c);
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
  for(const k in sc){if(!FOCUS[k])continue;if(a<12&&!keep.includes(k))continue;if(a<16&&['giao','lac','du','thue','phu'].includes(k))continue;if(!affordFocus(c,k))continue;
    const v=sc[k]+(hashN(c.id+k+Math.floor(S.t/36))%18);if(v>bv){bv=v;best=k}}
  return best}
function focusHold(c){return clamp(Math.round(6+obey(c)/5+(axv(c,'ht')-50)/8-(axv(c,'dl')-50)/8),3,30)}
function focusTick(c){const a=age(c);if(a<6||c.away||c.brk)return;
  if(c.focusUntil&&S.t>=c.focusUntil){const p=prefFocus(c);c.focusUntil=0;if(p!==c.focus){const o=c.focus;c.focus=p;if(a>=10&&inClan(c))log(`${nameOf(c)} chán ${FOCUS[o].n.toLowerCase()}, lại quay về ${FOCUS[p].n.toLowerCase()}.`)}return}
  if(!affordFocus(c,c.focus)){const o=c.focus;c.focus=prefFocus(c);c.focusUntil=0;if(o!==c.focus&&a>=12&&inClan(c))log(`${nameOf(c)} hết tiền theo ${FOCUS[o].n.toLowerCase()}, chuyển sang ${FOCUS[c.focus].n.toLowerCase()}.`);return}
  if(!c.focusUntil&&(S.t+hashN(c.id))%6===0)c.focus=prefFocus(c)}
function setFocus(c,k){c.focus=k;const p=prefFocus(c);c.focusUntil=k===p?0:S.t+focusHold(c)}

/* ---------- đột phá chỉ số 100: một quá trình nhiều tháng ---------- */
function vget(c,k){return SN[k]?(c[k]||0):AXN[k]?axv(c,k):SKN[k]?skv(c,k):k==='duyen'?c.duyen:0}
function brkScore(c,sp){let s=0,w=0;for(const k in sp){s+=vget(c,k)*sp[k];w+=sp[k]}return w?s/w:50}
function brkPaths(c,k){const L=(BRK100[k]||[]).filter(p=>!p.hidden&&(!p.job||p.job.includes(c.job))&&(!p.ax||axv(c,p.ax[0])>=p.ax[1]));
  const sc=p=>brkScore(c,p.sp)+(p.job?25:0)+hashN(c.id+p.id)%22;return L.sort((a,b)=>sc(b)-sc(a)).slice(0,3)}
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
  return alive().filter(p=>p.id!==c.id&&inClan(p)&&!p.away&&age(p)>=8&&age(p)<=30&&(p.parents.includes(c.id)||grand(p)||p.hh===c.hh))}
function teachPopup(c){const J=JOBS[c.lastJob];if(!J)return;const st=students(c).filter(p=>p.id!==c.id).slice(0,6);
  const opts=[{l:'Viết sách truyền nghề',s:`Mất một hai năm. Sách để lại cho cả họ, ai theo nghề ${J.n.toLowerCase()} sau này cũng không phải học từ đầu`,c:()=>c.tri>=35,f:c=>{const mo=R(12,24);c.writing={job:c.lastJob,until:S.t+mo};return `${esc(c.given)} bày giấy mực, bắt đầu ghi lại những gì đã học được cả đời. Dự kiến ${mo} tháng.`+fx(c,{tam:4})}}];
  st.forEach(p=>opts.push({l:`Dạy trực tiếp cho ${p.given} (${age(p)} tuổi)`,s:'Hai năm kèm cặp. Học là một chuyện, có theo nghề hay không là chuyện khác',f:c=>{c.teach={job:c.lastJob,id:p.id,until:S.t+24};addRel(p,c,5);return `${esc(c.given)} nhận ${esc(p.given)} làm học trò, ngày ngày chỉ bảo.`+fx(c,{tam:5})}}));
  opts.push({l:'Thôi, an hưởng tuổi già',f:c=>fx(c,{tam:2})});
  choicePopup(c,'Truyền nghề',`Truyền lại nghề ${J.n.toLowerCase()}`,`${esc(c.given)} làm ${J.n.toLowerCase()} đến độ thông thạo ${Math.floor(c.lastM)}. Nghỉ rồi, có thể truyền lại cho con cháu.`,opts)}
function teachTick(c){
  if(c.writing&&S.t>=c.writing.until){const job=c.writing.job;const lv=Math.round(Math.min(120,c.lastM*0.6+c.tri/5));const J=JOBS[job];
    const n=`${pick(['Bí quyết','Tâm đắc','Bút ký','Chân truyền'])} nghề ${J.n.toLowerCase()} của ${c.given}`;
    S.books.push({job,lv,by:c.id,t:S.t,n});c.writing=null;c.fame+=5;cf(2,'Viết sách truyền nghề');log(`${nameOf(c)} viết xong cuốn "${n}". Người trong họ theo nghề ${J.n.toLowerCase()} khởi đầu với thông thạo ${Math.round(lv*0.4)}.`,'gd')}
  if(c.teach){const p=P(c.teach.id);if(!p||!inClan(p)||p.away){c.teach=null;return}
    p.pre[c.teach.job]=Math.min(60,(p.pre[c.teach.job]||0)+(c.lastM/120)*1.4);if(chance(0.05))addRel(p,c,1);
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
function protect(){
  if(!S)return 0;if(S._protT===S.t&&S._prot!=null)return S._prot;
  let v=0;alive().forEach(p=>{if(p.job==='quan')v=Math.max(v,p.lv+1);if(p.job==='nguy')v=Math.max(v,4);if(p.tuoc)v=Math.max(v,5+p.tuoc);
    if(p.job==='quan_ngu'&&p.lv>=3)v=Math.max(v,p.lv-1);if(p.degree>=3)v=Math.max(v,3);else if(p.degree>=1)v=Math.max(v,1)});
  if(S.royal)v=15;S._prot=v;S._protT=S.t;return v}
const protName=()=>{const q=alive().filter(p=>p.job==='quan').sort((a,b)=>b.lv-a.lv)[0];if(q)return `${q.given} đang làm ${postOf(q)?postOf(q).n:RANKS[q.lv]}`;const t=alive().find(p=>p.tuoc);if(t)return `${t.given} là ${TUOC[t.tuoc]}`;const d=alive().find(p=>p.degree>=1);return d?`${d.given} đã đỗ đạt`:'người nhà'};

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
  if(has(c,'ngonghich'))v-=8;return clamp(Math.round(v),0,100)}
const obeyWord=v=>v>=80?'Rất nghe lời':v>=60?'Nghe lời':v>=40?'Nửa nghe nửa không':v>=20?'Khó bảo':'Ương ngạnh';

/* ---------- chỉ số lớn lên ---------- */
function growStat(c,k,perYear){if(!perYear)return;const cap=k==='suc'?c.cap.suc:capOf(c,k);if(c[k]>=cap)return;
  const dim=Math.max(0.12,1-c[k]/(cap+15))*(c[k]>=100?0.4:1);const gene=0.5+pot(c,k)/100;const moodF=0.6+0.6*c.tam/100;
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
  let v=c[J.st]*0.7+(c.pre[id]||0)*0.6+Math.min(40,expOf(c,id)*0.4);
  const ed=eduLv(c);if(M.hand)v-=ed*0.8;if(M.light)v+=ed*0.5;
  const md=minDig(),dg=jobDig(id,0);if(dg<md)v-=(md-dg)*14;
  v+=(axv(c,'tv')-50)*0.15*Math.min(2,(J.inc||300)/400)+(axv(c,'tv')-50)*0.1*(dg-2);
  if(pj.includes(id))v+=(axv(c,'ht')-40)*0.25;
  if(c.g==='nữ'){if(['det','mo'].includes(id))v+=12;if(['khuanvac','tieu','nhadich','tieuphu','ngu'].includes(id))v-=25}else if(['det','mo'].includes(id))v-=18;
  const B={tieunhi:axv(c,'tv')/5+axv(c,'hd')/7,hangrong:axv(c,'hd')/6,su:axv(c,'diem')/6,y:axv(c,'rong')/6,nghe:axv(c,'hd')>65||axv(c,'tiet')<40?10:0,mo:axv(c,'rong')/6+axv(c,'gan')/8,
    tieu:axv(c,'gan')/5,tieuphu:axv(c,'dl')/6,ngu:axv(c,'dl')/7,nong:axv(c,'cc')/5,tho:axv(c,'cc')/6,det:axv(c,'cc')/6+axv(c,'diem')/8,chan:axv(c,'diem')/7,hau:axv(c,'ht')/6,bep:axv(c,'cc')/7,diaky:axv(c,'diem')/6+skv(c,'khau')/8,thulai:axv(c,'ht')/6,nhadich:axv(c,'gan')/6};
  v+=B[id]||0;v+=hashN(c.id+id)%26;
  if(id==='nong'&&farmArea()<1&&S.farm.fief<1)v-=10;
  if(['thulai','nhadich'].includes(id))v-=protect()>=1?0:12;
  return v}
function wishPick(c){const pool=STARTJOBS.concat(['thulai','nhadich']);let best='none',bv=-1e9;pool.forEach(id=>{const v=wishScore(c,id);if(v>bv){bv=v;best=id}});
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
function debtLim(){return Math.max(mm(5),expenses().total*2)}
function debtTick(){
  if(S.money>=0){if(S.debt){if(S.debt.stage)log('Gia tộc đã trả hết nợ, chủ nợ thôi tới cửa.','gd');S.debt=null}return}
  S.debt=S.debt||{since:S.t,stage:0,grace:0};const D=S.debt;
  if(S.t-D.since>=6&&S.money<-mm(1))S.money=Math.round(S.money*1.012);
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
  if(a.k==='biz'){const b=S.biz.find(x=>x.id===a.id);if(b){S.biz=S.biz.filter(x=>x!==b);const o=P(b.owner);if(o&&o.biz===b.id){o.biz=null;o.job='none';o.lv=0}}}
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
  hocviec:'Theo một người thợ, người buôn trong vùng học nghề hợp với mình',gui:'Gửi vào cơ sở làm ăn của gia tộc để người ta chỉ bảo, có ít tiền công'};
const BIZJOB={quantra:'tieunhi',tiem:'tieunhi',xuong:'tho',yquan:'y',truong:'su',voquan:'tieu',tieucuc:'tieu',ganhhat:'nghe',thuyen:'ngu',trai:'chan'};
function schoolCan62(c,k){const a=age(c);
  if(k==='cha')return S.people.some(p=>c.parents.includes(p.id)&&inClan(p)&&!p.away&&age(p)>=18);
  if(k==='tuhoc')return c.tri>=30||axv(c,'cc')>=55;
  if(k==='gui')return S.biz.length>0;
  return true}
function apprJob(c,k){if(k==='gui'){const b=pick(S.biz);return BIZJOB[b.type]||'tieunhi'}
  return STARTJOBS.filter(id=>meets(c,id)||age(c)<16).map(id=>[id,wishScore(c,id)]).sort((a,b)=>b[1]-a[1])[0][0]}
function kidLearn(c,a){if(a<6||a>=18||c.away)return;const lvl=a<10?1:a<14?2:3;const sc=SCHOOL[lvl][c.school];
  if(c.school!=='nha'&&!(sc&&sc.chore))c.eduY=(c.eduY||0)+1/12;
  /* trẻ ở nhà vẫn lớn khôn nhờ việc đời, nhờ người lớn trong nhà */
  if(!sc||c.school==='nha'||sc.chore){growStat(c,'tri',1.4);growStat(c,'eq',1.2);growStat(c,'suc',0.6)}
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
function marryOut(c,p){c.left='xuatgia';c.leftT=S.t;c.outSp={n:nameOf(p),sur:p.surname,tier:p.needT||0};const got=Math.round(p.fee*0.6);S.money+=got;cf(3,'Gả con gái');S.hung=clamp(S.hung+2,0,100);
  (S.inlaws=S.inlaws||[]).push({sur:p.surname,tier:p.needT||0,pid:c.id,t:S.t});log(`${nameOf(c)} xuất giá về nhà họ ${p.surname}, nhà trai đưa sính lễ ${money(got)}.`,'gd')}
function outsTick(){const outs=S.people.filter(p=>p.dead==null&&p.left&&!['luuvong'].includes(p.left));
  outs.forEach(p=>{const a=Math.floor((S.t-p.born)/12);if(a>58&&chance(0.0012*(a-50))){p.dead=S.t;if(p.left==='xuatgia')log(`Tin từ nhà họ ${p.outSp?p.outSp.sur:'bên chồng'}: ${nameOf(p)} đã qua đời, hưởng ${a} tuổi.`,'hi');return}
    if(!head())return;
    if(p.left==='xuatgia'&&chance(0.005)){const L=['v62_xg_ve_tham','v62_xg_bi_bat_nat','v62_xg_thong_gia_nho','v62_xg_ly_hon_ve'];enqueue('ev',S.head,{ev:pick(L),data:{xg:p.id}})}
    if(['expelled','botron','tumat'].includes(p.left)&&S.t-(p.leftT||S.t)>=36&&a<70&&chance(0.002))enqueue('ev',S.head,{ev:'v62_tro_ve',data:{xg:p.id}})})}
function comeHome(p,kid){p.left=null;p.leftT=null;p.hh=mainHH();p.spouse=null;p.flags.divorced=S.t;p.away=null;
  if(kid){const k=mkPerson({g:chance(0.5)?'nam':'nữ',surname:(p.outSp&&p.outSp.sur)||pick(SURN),age:R(2,8),young:true,hh:mainHH()});k.parents=[p.id];k.gen=(p.gen||1)+1;k.ngoai=1;ensurePersona(k);S.people.push(k)}}

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
    const sp=spouseOf(p);if(sp&&!ids.has(sp.id)&&inClan(sp)){if(sp.inLaw&&(sp.love||40)>=55&&chance(0.6)){sp.left='theochong';sp.leftT=S.t;log(`${nameOf(sp)} đi theo ${p.given}.`)}else{sp.spouse=null;p.spouse=null;sp.flags.divorced=S.t}}});
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
function canConceive(c){if((c.flags.ppUntil||0)>S.t)return false;if((c.flags.sepUntil||0)>S.t)return false;if(c.suc<Math.min(60,c.cap.suc*0.75))return false;return true}
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
  if(chance(0.12)&&!((S.rpT||0)>S.t)){const ps=alive().filter(p=>!isHead(p)&&age(p)>=30&&(p.eq>=55||p.fame>=40));if(!ps.length)return;const p=pick(ps);
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
function titleOf(c,k){const L=STITLE[k];let t=null;const v=statV(c,k);for(const [n,s] of L)if(v>=n)t=s;return t}
function titleIdx(c,k){const L=STITLE[k];let i=-1;const v=statV(c,k);L.forEach(([n],j)=>{if(v>=n)i=j});return i}
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
    jobGrow(c);kidLearn(c,a);oanTick(c);thiencoTick(c)});
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
  const ids=Object.keys(OFFICES).filter(id=>OFFICES[id].r<=r).sort((a,b)=>OFFICES[b].r-OFFICES[a].r||Math.random()-0.5);
  const soft=id=>{const q=OFFICES[id].req;for(const k in q)if(c[k]<q[k]*0.85)return false;return true};
  const id=ids.find(x=>x!==c.post&&soft(x))||ids.find(x=>OFFICES[x].r===0)||'dichthua';
  const st=offState(id);const old=st.n;
  assignPost(c,id);
  return {id,old};
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
  fame:['Danh vọng gia tộc','Cùng tài sản quyết định gia thế. Lên nhờ người nhà có tiếng, xây nhà, đỗ đạt, tang lễ xứng đáng. Xuống vì nợ, tai tiếng, tang lễ sơ sài. Xem nguồn tăng giảm ở trang Gia tộc.'],
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
  ql:['Quản trị','Quản người, quản tiền. Làm chủ cơ sở lãi hơn, nội trợ giỏi thì nhà bớt chi tiêu. Lên nhờ học sổ sách, làm chủ, nội trợ.'],ky:['Kỹ nghệ','Tay nghề khéo. Thợ, thầy thuốc, nghệ nhân, chăn nuôi lên thông thạo nhanh hơn.'],
  vice:['Tật xấu','Có mức độ 0 đến 100. Người buông thả, nhu nhược, trẻ tuổi, mức sống xa hoa, người trong nhà cũng mắc thì dễ nhiễm. Càng nặng càng hại việc, hại tiền, dễ kéo theo tật khác. Giữ lâu trên 5 năm thì ăn vào bản tính, rất khó bỏ. Cha mẹ, gia chủ có thể răn dạy.'],
  preview:['Xem trước hệ quả','Dưới mỗi lựa chọn hiện những gì có thể tăng (▲) hoặc giảm (▼) khi thành hay bại. Thay đổi tính cách ngầm thì không hiện. Bật tắt trong Menu.'],
  pot:['Tiềm năng','Do gen cha mẹ truyền lại. Tiềm năng cao thì rèn luyện nhanh.'],
  mm:['Thông thạo','Tay nghề trong nghề hiện tại, tăng theo năm làm việc. Đủ thông thạo và chỉ số thì được thăng bậc.'],
  liem:['Liêm chính','Thấp thì lộc ngoài nhiều nhưng dễ bị hặc tội.'],merit:['Chiến công','Đủ thì thăng cấp trong quân, rất cao có thể được phong tước.'],
  rel:['Quan hệ','Thân hay sơ với từng người trong nhà. Tính cách hợp nhau thì thân dần, xung khắc thì hay cãi vã. Quan hệ tốt làm tâm trạng tốt.'],
  think:['Tâm tư','Điều người này đang nghĩ. Có lúc họ sẽ tự đến xin gia chủ cho làm điều mình muốn.'],
  rules:['Gia quy','Số điều được giữ tùy gia thế và số người trong họ. Thêm điều mới làm Ổn định giảm 5, mỗi năm chỉ thêm một điều. Bỏ điều cũ cũng làm lòng người xáo động.'],
  region:['Vùng','Mỗi vùng sản vật khác nhau nên giá khác nhau. Mang hàng từ nơi rẻ tới nơi đắt mà bán. Đường càng xa càng lâu, càng nhiều rủi ro.']};
function infoText(k){
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
  return `<nav class="tabs" aria-label="Trang">${PAGES.filter(([id])=>S.pages.includes(id)).map(([id,n])=>`<button data-page="${id}" aria-pressed="${page===id}">${n}${S.newPages.includes(id)?'<i class="dot" aria-label="mới"></i>':''}</button>`).join('')}</nav>`;
}

/* ================= gia phả ================= */
function nodeHTML(p){
  const cls=['node'];if(p.dead!=null)cls.push('dead');if(p.left)cls.push('left');if(p.id===S.head)cls.push('head');
  const badge=p.preg?'<span class="badge preg">thai</span>':p.away?`<span class="badge away">${p.away.type==='army'?'lính':p.away.type==='jh'?'giang hồ':p.away.type==='mourn'?'cư tang':'đi buôn'}</span>`:p.tuoc?`<span class="badge">${TUOC[p.tuoc]}</span>`:p.exam?'<span class="badge">ứng thí</span>':p.hh!==mainHH()&&inClan(p)?'<span class="badge away">ở riêng</span>':'';
  const a=age(p);
  return `<button class="${cls.join(' ')}" data-sel="${p.id}" aria-pressed="${sel===p.id}">${badge}<span class="nrow">${avatarSVG(p,30)}<span><b>${esc(nameOf(p))}</b>
   <small>${p.dead!=null?`† ${dOf(p.dead).y} · thọ ${a}`:p.left?relation(p):`${a} · ${a<16?(a>=6&&p.school!=='nha'?'đi học':'nhỏ'):esc(jobName(p))}`}</small></span></span>
   ${inClan(p)?`<span class="hp"><i style="width:${clamp(p.suc/1.5,0,100)}%"></i></span><span class="md"><i style="width:${p.tam}%"></i></span>`:''}</button>`;
}
function treeHTML(p){
  const sp=spouseOf(p);
  const kids=S.people.filter(k=>k.parents.includes(p.id)&&!k.inLaw).sort((a,b)=>a.born-b.born);
  return `<li><div class="couple">${nodeHTML(p)}${sp?`<span class="knot"></span>${nodeHTML(sp)}`:''}</div>${kids.length?`<ul>${kids.map(treeHTML).join('')}</ul>`:''}</li>`;
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
   <div class="chips"><span class="chip ${c.id===S.head?'gold':''}">${relation(c)}</span><span class="chip">${dead?'Đã mất':a+' tuổi'}</span>${c.tuoc?`<span class="chip gold">${TUOC[c.tuoc]}</span>`:''}${c.degree?`<span class="chip gold">${deg}</span>`:''}${STATS.map(([k])=>titleOf(c,k)).filter(Boolean).map(t=>`<span class="chip gold">${esc(t)}</span>`).join('')}${c.outSp?`<span class="chip">Về nhà họ ${esc(c.outSp.sur)}</span>`:''}${c.preg?'<span class="chip red">Mang thai</span>':''}${c.away?`<span class="chip blue">${awayText(c)}</span>`:''}${c.hh!==mainHH()&&!out?`<span class="chip blue">${esc(HH(c.hh).name)}</span>`:''}</div>
   <div class="chips">${realTraits(c).map(traitChip).join('')}${habChips(c)}${viceChips(c)}</div></div></div>
   <div class="dsec tight"><h3>${I('axes','Tính cách')}</h3><div class="chips">${axChips(c)||'<span class="muted small">Chưa có nét nổi bật</span>'}</div></div>
   ${statBlock(c)}
   <div class="kvline">${I('pot','Tiềm năng:')} ${STATS.filter(([k])=>k!=='suc').map(([k,n])=>`${n} ${Math.round(pot(c,k))}`).join(' · ')}</div>
   <div class="kvline">Danh vọng <b class="num ${c.fame<0?'down':''}">${fmt(c.fame)}</b>${c.job==='quan'?` · ${I('liem','Liêm chính')} <b class="num">${Math.round(c.liem)}</b>`:''}${c.merit?` · ${I('merit','Chiến công')} <b class="num">${fmt(c.merit)}</b>`:''}</div>
   ${!dead&&!out&&(age(c)>=16||c.purse)?`<div class="kvline">${inMain(c)?`${I('purse','Tiền riêng')} <b class="num">${money(c.purse)}</b>${clanKeeps(c)?' · gia tộc nuôi':' · tự lo ăn tiêu'}${(c.anbam||0)>4?' · <span class="down">đang ăn bám</span>':''}${offOf(c)?` · ${esc(CLANOFF[offOf(c)].n)}`:''}`:`${esc(HH(c.hh).name)} · quỹ hộ <b class="num ${HH(c.hh).money<0?'down':''}">${money(HH(c.hh).money)}</b>${c.purse?` · tiền riêng ${money(c.purse)}`:''}`}</div>`:''}
   ${!dead&&!out&&age(c)>=8&&!isHead(c)&&head()?`<div class="kvline">${obeyWord(obey(c))} với gia chủ${(c.oan||0)>=40?' · <span class="down">đang ôm hận</span>':''}${(c.busyUntil||0)>S.t?` · bận việc đến ${dateStr(c.busyUntil)}`:''}</div>`:''}
   ${!dead&&!out&&age(c)>=25?`<div class="kvline">Di chúc: ${esc(willTxt(c).toLowerCase())}${isHead(c)&&c.will&&P(c.will.heir)?` · chọn ${esc(P(c.will.heir).given)} nối nghiệp`:''}</div>`:''}`;
  if(dead||out)return h;
  const th=thoughts(c);
  h+=`<div class="dsec"><h3>${I('think','Tâm tư')}</h3><ul class="think">${th.map(t=>`<li>${t}</li>`).join('')}</ul></div>`;
  h+=`<div class="dsec"><h3>${a>=16&&c.job!=='none'?I('job:'+c.job,esc(jobName(c))):'Nghề nghiệp'}</h3>`;
  if(a>=16&&!['none','vua','huu'].includes(c.job)){
    h+=`${['quan_ngu','chu'].includes(c.job)?'':bar('Thông thạo',c.m,120,'mm','mm')}
    <div class="kvline">${c.job==='nong'?'Thu theo mùa vụ':c.job==='chu'?(bizOf(c)&&bizOf(c).last?`Lãi tháng trước ${money(bizOf(c).last.profit)}`:'Lãi cơ sở'):c.job==='hiep'?`Túi riêng ${money(c.purse)}`:`${money(income(c))}/tháng`}${c.job==='quan'?` · lộc ngoài ${money(sideIncome(c))}`:''}${c.job==='quan'&&postOf(c)?` · ${esc(postOf(c).n)}`:''}${selfEmp(c)?' · tự làm, không có chủ':''}${pieceJob(c)?' · thu theo năng suất':''}</div>`;
    const r=nextReq(c);if(r)h+=`<div class="kvline muted">Lên ${esc(J.lv[c.lv+1].n.toLowerCase())}: ${Object.entries(r).filter(([k])=>k!=='land').map(([k,v])=>k==='m'?`thông thạo ${v}`:k==='fame'?`danh vọng ${v}`:k==='degree'?'đỗ cử nhân':k==='flag'?(v==='thuyen'?'thuyền lớn':'cơ duyên riêng'):`${SN[k]} ${v}`).join(', ')||'thêm ruộng'}</div>`;
  }else if(a<16)h+=`<div class="kvline muted">${a>=6&&c.school!=='nha'?esc((SCHOOL[a<10?1:a<14?2:3][c.school]||{n:'Đi học'}).n):'Còn nhỏ'}${c.appr&&JOBS[c.appr]&&a>=6?' · học nghề '+JOBS[c.appr].n.toLowerCase():''}${Object.keys(c.pre).length?' · đã học việc '+Object.entries(c.pre).map(([j,v])=>`${JOBS[j].n.toLowerCase()} ${Math.round(v)}`).join(', '):''}</div>`;
  else h+=`<div class="kvline muted">${c.job==='huu'?'An hưởng tuổi già':c.flags.jobRetry>S.t?'Trượt phỏng vấn, đợi năm sau':'Chưa có nghề'}</div>`;
  h+=`<div class="acts">`;
  const can=(k,l,dis)=>h+=`<button class="btn small" data-do="${k}" ${dis?'disabled':''}>${l}</button>`;
  if(!c.away){
    if(a>=16&&!['quan','vua','nguy','quan_ngu','hiep'].includes(c.job))can('job',c.job==='none'||c.job==='huu'?'Chọn nghề':'Đổi nghề',c.flags.jobRetry>S.t);
    if(c.job==='quan'){can('office','Thăng tiến',(c.flags.noPromoUntil||0)>S.t);can('resign','Từ quan')}
    Object.keys(BIZ).filter(t=>canOwn(c,t)).forEach(t=>{const L0=BIZ[t].lv[0];h+=`<button class="btn small" data-open="${t}" ${canOpenAny(c,L0[1])?'':'disabled'}>Mở ${esc(L0[0].toLowerCase())} · ${money(L0[1],1)}</button>`});
    if(c.job==='huu'&&c.lastJob&&(c.lastM||0)>=30&&!c.writing&&!c.teach)can('teach','Truyền nghề');
    if(c.job==='ngu'&&!c.flags.thuyen)can('boat',`Thuyền lớn · ${money(mm(120),1)}`,S.money<mm(120));
    if(a>=16&&a<=45&&c.g==='nam'&&c.vo>=50&&(S.war||S.recruit>S.t)&&!['quan_ngu','quan','vua'].includes(c.job))can('army','Tòng quân');
    if(a>=16&&c.vo>=80&&!['hiep','quan','vua'].includes(c.job))can('jh','Giang hồ');
    if((a>=18||c.tri>=100)&&!c.exam&&c.degree<3&&!['quan','vua'].includes(c.job))can('exam','Ứng thí');
  }else if(c.away.type==='jh')can('back',`Về nhà${c.purse>0?` · ${money(c.purse,1)}`:''}`);
  h+=`</div>`;
  if(c.exam)h+=`<div class="kvline muted">Kỳ tới: ${EXAM_N[c.exam.stage]}, ${['tháng Tám','tháng Hai','tháng Ba'][c.exam.stage]}</div>`;
  if(c.away&&c.away.until)h+=`<div class="kvline muted">Dự về ${dateStr(c.away.until)}</div>`;
  if(c.writing)h+=`<div class="kvline muted">Đang viết sách nghề ${esc(JOBS[c.writing.job].n.toLowerCase())}, xong khoảng ${dateStr(c.writing.until)}</div>`;
  if(c.teach&&P(c.teach.id))h+=`<div class="kvline muted">Đang dạy nghề cho ${esc(P(c.teach.id).given)}, đến ${dateStr(c.teach.until)}</div>`;
  if(c.brk){const bp=BRK100[c.brk.k].find(x=>x.id===c.brk.id);if(bp)h+=`<div class="kvline">Đột phá ${esc(SN[c.brk.k].toLowerCase())}: ${esc(bp.l.toLowerCase())} · tháng ${S.t-c.brk.start}/${c.brk.end-c.brk.start}</div>`}
  h+=`</div>`;
  if(a>=6&&!c.away&&!c.brk){const pf=prefFocus(c);const side=sideInc(c,true);
    h+=`<div class="dsec"><h3>${I('focus','Thời gian rảnh')}</h3><select class="sel" id="focusSel">${Object.entries(FOCUS).filter(([k,F])=>(k!=='giup'||a>=10)&&(!F.side||a>=12)&&(a>=12||['nghi','hoc','vo','ren','cam','phat','giup'].includes(k))).map(([k,F])=>`<option value="${k}" ${c.focus===k?'selected':''} ${affordFocus(c,k)||c.focus===k?'':'disabled'}>${F.n}${k===pf?' (ý thích)':''} · ${F.side?'kiếm thêm':F.cost>0?money(focusCost(c,k))+'/tháng':'miễn phí'}</option>`).join('')}</select>
    <div class="kvline muted">${c.focusUntil&&c.focusUntil>S.t?`Theo sắp đặt, còn giữ khoảng ${c.focusUntil-S.t} tháng rồi quay về ${esc(FOCUS[pf].n.toLowerCase())}`:`Tự chọn theo ý mình. Ép theo việc khác thì giữ được khoảng ${focusHold(c)} tháng`}${side?` · kiếm thêm ${money(side)} tháng này`:FOCUS[c.focus].side?' · tháng này không có việc':''}</div></div>`}
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
    h+=`</div>`;
  }
  const fam=alive().filter(p=>p.id!==c.id&&inClan(p)&&age(p)>=4&&(kin(c,p)!=='ho'||p.hh===c.hh)).sort((x,y)=>relOf(c,y)-relOf(c,x));
  if(fam.length)h+=`<div class="dsec"><h3>${I('rel','Quan hệ')}</h3><div class="rels">${fam.slice(0,12).map(p=>{const v=Math.round(relOf(c,p));return `<button class="relrow" data-sel="${p.id}">${avatarSVG(p,22)}<span>${esc(p.given)}<small>${KIN_N[kin(c,p)]}</small></span><b class="num ${v<0?'down':v>=60?'up':''}">${relWord(v)}</b></button>`}).join('')}</div></div>`;
  const hd=head();const acts=[];
  if(c.id!==S.head&&a>=14&&!c.away)acts.push(`<button class="btn small ghost" data-do="head">Lập làm gia chủ</button>`);
  if(c.id!==S.head&&a>=18&&married(c)&&!c.inLaw&&c.hh===mainHH()&&(c.gen||1)>=2)acts.push(`<button class="btn small ghost" data-do="moveout">Cho ra ở riêng</button>`);
  if(c.id!==S.head&&hd&&a>=14)acts.push(`<button class="btn small ghost" data-do="expel">Trục xuất</button>`);
  if(a>=25&&!c.away)acts.push(`<button class="btn small ghost" data-do="will">Lập di chúc</button>`);
  if(c.id===S.head&&c.purse>0)acts.push(`<button class="btn small" data-do="headgop">Góp ${money(c.purse,1)} tiền riêng vào công quỹ</button>`);
  if(c.id!==S.head&&hd&&a>=16&&inMain(c)&&c.purse>=mm(1))acts.push(`<button class="btn small" data-do="gop" ${(c.flags.gopT||0)>S.t?'disabled':''}>Xin góp công quỹ</button>`);
  if(a>=16&&!isHead(c)&&S.people.some(p=>c.parents.includes(p.id)&&p.dead==null&&inClan(p)&&p.purse>mm(1)))acts.push(`<button class="btn small ghost" data-do="xin" ${(c.flags.xinT||0)>S.t?'disabled':''}>Xin cha mẹ giúp tiền</button>`);
  if(c.id!==S.head&&hd&&!hd.away&&!c.away&&viceOf(c).length)acts.push(`<button class="btn small" data-do="randay" ${(c.flags.vdT||0)>S.t?'disabled':''}>Răn dạy${(c.flags.vdT||0)>S.t?` (${c.flags.vdT-S.t} tháng)`:''}</button>`);
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
    if(k==='resign')return resignPopup(c);
    if(k==='school')return schoolPopup(c,a<10?1:a<14?2:3);
    if(k==='jh')return jhPopup(c);
    if(k==='mai')return matchmaker(c);
    if(k==='expel')return expelPopup2(c);
    if(k==='moveout')return moveOutPopup(c);
    if(k==='randay'){const v=viceOf(c)[0];if(v){closeSheet();return vicePopup(head(),c,v)}}
    if(k==='army')enlist(c,false);
    if(k==='back'){S.money+=Math.max(0,c.purse);log(`${nameOf(c)} rời giang hồ về nhà${c.purse>0?`, mang về ${money(c.purse)}`:''}.`,'gd');c.purse=0;c.away=null;c.job='none';c.lv=0;enqueue('job',c.id)}
    if(k==='boat'){S.money-=mm(120);c.flags.thuyen=1;log(`${nameOf(c)} sắm được thuyền lớn.`,'gd')}
    if(k==='exam')register(c);
    if(k==='kid+'||k==='kid-')persuadeKids(c,k==='kid+'?30:-30);
    if(k==='head'){log(`${nameOf(c)} được lập làm gia chủ.`,'gd');becomeHead(c)}
    if(k==='headgop'){S.money+=c.purse;log(`Gia chủ ${nameOf(c)} góp ${money(c.purse)} tiền riêng vào công quỹ.`,'gd');c.purse=0}
    if(k==='gop'){closeSheet();return askGopPopup(c)}
    if(k==='xin'){closeSheet();return askParentPopup(c)}
    if(k==='teach'){closeSheet();return teachPopup(c)}
    if(k==='will'){closeSheet();return willPopup(c)}
    if(k==='ly'){const sp=spouseOf(c);closeSheet();return lyPopup(head(),{a:c.id,b:sp.id})}
    done();
  });
}
let chiF='';
function pageGiapha(){
  const roots=S.people.filter(p=>!p.parents.length&&!p.inLaw);
  const br=branches();
  return `${br.length?`<div class="chif"><label for="chiF">Xem chi</label><select class="sel" id="chiF"><option value="">Cả họ</option><option value="${mainHH()}" ${chiF===mainHH()?'selected':''}>Nhà chính</option>${br.map(id=>`<option value="${id}" ${chiF===id?'selected':''}>${esc(S.hh[id].name)}</option>`).join('')}</select></div>`:''}<section class="card treecard"><div class="treescroll"><div class="tree"><ul>${roots.map(treeHTML).join('')}</ul></div></div>
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
   <dt>Tước vị</dt><dd>${titled.length?titled.map(p=>`${esc(nameOf(p))}: ${TUOC[p.tuoc]}`).join(', '):'Chưa có'}</dd></dl></section>
   ${S.fame>=200&&head()?`<section class="card"><span class="eyebrow">Danh vọng</span><h2>Kêu gọi</h2><p class="kvline">${(S.kgT||0)>S.t?`Vừa kêu gọi, ${S.kgT-S.t} tháng nữa mới nên làm lại.`:'Nhà có tiếng, một lời kêu gọi người trong vùng sẵn lòng góp sức.'}</p><div class="acts"><button class="btn small" data-kg ${(S.kgT||0)>S.t?'disabled':''}>Kêu gọi</button></div></section>`:''}
   <section class="card" style="grid-column:1/-1"><span class="eyebrow">${I('rules','Gia quy')} · ${S.rules.length}/${ruleSlots()}</span><h2>${wait>0?`Thêm điều mới sau ${wait} tháng`:'Gia quy'}</h2>
   ${S.rules.length?`<div class="rulegrid">${S.rules.map(k=>`<div class="btn" aria-pressed="true"><strong>✓ ${RULES[k].n}</strong><small>${RULES[k].d}</small><span><button class="btn small ghost" data-drop="${k}">Bỏ</button></span></div>`).join('')}</div>`:'<p class="kvline muted">Chưa có điều nào.</p>'}
   <details class="more"><summary>Thêm điều mới</summary><div class="rulegrid">${Object.entries(RULES).filter(([k])=>!S.rules.includes(k)).map(([k,R0])=>{const why=ruleWhy(k);return `<button class="btn" data-rule="${k}" ${why?'disabled':''}><strong>${R0.n}</strong><small>${R0.d}${why?` · <b>${esc(why)}</b>`:''}</small></button>`}).join('')}</div></details></section>
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
  const rows=(o,cls)=>Object.entries(o||{}).filter(([,v])=>v).map(([k,v])=>`<dt>${FLOWN[k]||k}</dt><dd class="num ${cls}">${money(v)}</dd>`).join('');
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
     <p class="kvline muted">Chi phái tự quyết mức sống, tự xây nhà bằng quỹ hộ, không to hơn nhà chính.</p></section>`}).join('');
  const vac=vacantHomes().map(id=>{const b=S.hh[id];const o=P(b.owner);return `<li>${esc(b.name)} · ${HOMES[b.home].n.toLowerCase()}${o&&o.dead==null?` · của ${esc(o.given)}`:''} · ${b.rent?'đang cho thuê':'để trống'}</li>`}).join('');
  const books=(S.books||[]).map(b=>`<li>"${esc(b.n)}" · nghề ${esc(JOBS[b.job].n.toLowerCase())} · người theo nghề khởi đầu thông thạo ${Math.round(b.lv*0.4)}</li>`).join('');
  const extra=vac||books?`<section class="card"><span class="eyebrow">Của để lại</span>${vac?`<h3>Nhà để trống</h3><ul class="plain">${vac}</ul>`:''}${books?`<h3>Tàng thư</h3><ul class="plain">${books}</ul>`:''}</section>`:'';
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
function pageKinhdoanh(){
  const can=alive().filter(p=>!p.away&&age(p)>=16).flatMap(p=>Object.keys(BIZ).filter(t=>canOwn(p,t)).map(t=>[p,t]));
  return `<div class="grid2">${S.biz.map(b=>{const B=BIZ[b.type];const L=B.lv[b.lv];const nx=B.lv[b.lv+1];const o=P(b.owner);const k=b.last||bizCalc(b);
    const slots=bizSlots(b);const used=new Set();
    return `<section class="card"><span class="eyebrow">${esc(B.n)}</span><h2>${esc(L[0])}</h2>
    <p class="kvline">Của: <b>${esc(bizOwnName(b))}</b> · Người trông: ${o&&inClan(o)?`<button class="lnk" data-sel="${o.id}">${esc(nameOf(o))}</button>`:'<span class="down">chưa có ai trông</span>'}</p>
    <dl class="kv" style="margin-top:6px"><dt>Doanh thu (trần ${money(L[2])})</dt><dd class="num">${money(k.rev)}</dd><dt>Lương người làm</dt><dd class="num down">${money(k.wages)}</dd><dt>Nguyên liệu, hao phí</dt><dd class="num down">${money(k.mat)}</dd><dt>Tiền thuê, thuế chợ</dt><dd class="num down">${money(k.rent)}</dd><dt><b>Lãi tháng</b></dt><dd class="num ${k.profit<0?'down':'up'}"><b>${money(k.profit)}</b></dd><dt>Đủ người</dt><dd class="num">${Math.round(k.fill*100)}%</dd></dl>
    <div class="staff">${slots.map((r,i)=>{const st=b.staff.find(s=>s.role===r&&!used.has(s.id));if(st){used.add(st.id);return `<div class="srow"><div><b>${esc(st.n)}</b> · ${esc(ROLES[r].n)}<small class="num">Thông tuệ ${st.tt} · Sức ${st.sm} · Khéo ${st.kl} · Tiềm lực ${st.tl} · thạo ${Math.floor(st.m)} · hiệu quả ${Math.round(staffEff(st,r)*100)}% · ${money(st.wage)}/tháng</small></div><button class="btn small ghost" data-fire="${b.id}:${st.id}">Cho nghỉ</button></div>`}
      return `<div class="srow empty"><div><b>Trống</b> · ${esc(ROLES[r].n)}<small>Cần ${Object.entries(ROLES[r].req).map(([k,v])=>`${ROLE_ST[k]} ${v}`).join(', ')}</small></div><button class="btn small" data-hire="${b.id}:${r}">Tuyển</button></div>`}).join('')||'<p class="note">Cơ sở nhỏ, chủ tự làm.</p>'}</div>
    ${nx?`<button class="btn" data-expand="${b.id}" style="margin-top:8px;width:100%" ${bizFundGet(b)<nx[1]?'disabled':''}><strong>Mở rộng thành ${esc(nx[0])}</strong><small>${money(nx[1])} từ ${esc(bizOwnName(b).toLowerCase())} · trần doanh thu ${money(nx[2])} · thêm ${nx[4].length} chỗ làm</small></button>`:''}
    <button class="btn ghost" data-sellb="${b.id}" style="margin-top:6px;width:100%"><strong>Bán cơ sở · khoảng ${money(bizValue(b))}</strong><small>Giá theo vốn đã bỏ, lãi gần đây${S.war?', đang chiến sự nên bị ép giá':''}</small></button>
    ${!o||!inClan(o)?`<div class="field" style="margin-top:8px"><label>Giao cho người trông</label><select class="sel" data-owner="${b.id}"><option value="">Chọn người</option>${alive().filter(p=>age(p)>=16&&!p.away&&!['quan','vua'].includes(p.job)&&!p.biz).map(p=>`<option value="${p.id}">${esc(nameOf(p))} · ${esc(jobName(p))}</option>`).join('')}</select></div>`:''}</section>`}).join('')}
   <section class="card"><span class="eyebrow">Mở cơ sở mới</span>
   ${can.length?`<div class="choices">${can.map(([p,t])=>{const L0=BIZ[t].lv[0];return `<button class="btn" data-openb="${p.id}:${t}" ${canOpenAny(p,L0[1])?'':'disabled'}><strong>${esc(nameOf(p))} mở ${esc(L0[0].toLowerCase())} · ${money(L0[1])}</strong><small>Trần doanh thu ${money(L0[2])}/tháng</small></button>`}).join('')}</div>`:'<p class="kvline muted">Chưa ai đủ tay nghề để mở cơ sở.</p>'}</section></div>`;
}
function hirePopup(bid,role){
  const b=S.biz.find(x=>x.id===bid);if(!b)return;
  openModal(`<span class="eyebrow">Tuyển người</span><h2>${esc(ROLES[role].n)} cho ${esc(BIZ[b.type].lv[b.lv][0].toLowerCase())}</h2>
  <p class="muted">Tiền công tùy ngành, vị trí và tay nghề. Cần ${Object.entries(ROLES[role].req).map(([k,v])=>`${ROLE_ST[k]} ${v}`).join(', ')}. Ứng viên mới vào mỗi quý.</p>
  <div class="choices">${S.cand.map((st,i)=>`<button class="btn" data-c="${i}"><strong>${esc(st.n)} · hiệu quả ${Math.round(staffEff(st,role)*100)}% · ${money(wageFor(st,b,role))}/tháng</strong><small class="num">Thông tuệ ${st.tt} · Sức mạnh ${st.sm} · Khéo léo ${st.kl} · Tiềm lực ${st.tl} · thông thạo ${st.m}</small></button>`).join('')||'<p class="note">Hết ứng viên, đợi quý sau.</p>'}<button class="btn ghost" data-x>Thôi</button></div>`);
  M.querySelectorAll('[data-c]').forEach(x=>x.onclick=()=>{const st=S.cand.splice(+x.dataset.c,1)[0];st.role=role;st.wage=wageFor(st,b,role);b.staff.push(st);log(`Thuê ${st.n} làm ${ROLES[role].n.toLowerCase()}.`);closeModal()});
  M.querySelector('[data-x]').onclick=closeModal;
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
function pageQuan(){
  const mine=alive().filter(p=>p.job==='quan');
  const byR={};for(const id in OFFICES){const r=OFFICES[id].r;(byR[r]=byR[r]||[]).push(id)}
  const TAG={hoc:'Giáo dục',an:'Hình án',dan:'Dân chính',thue:'Thuế khóa',giam:'Giám sát',kinh:'Triều đình'};
  return `<section class="card"><span class="eyebrow">Quan trường</span><h2>Các chức trong triều và địa phương</h2>
   <p class="kvline">${mine.length?'Người nhà đang làm quan: '+mine.map(p=>`<b>${esc(nameOf(p))}</b> (${esc(jobName(p))})`).join(', ')+'.':'Nhà chưa có ai làm quan. Đỗ thi Đình thì được bổ chức.'}</p>
   <div class="offs">${Object.keys(byR).sort((a,b)=>b-a).map(r=>`<h3>${RANKS[r]} · bổng gốc ${money(SALARY[r])}/tháng</h3>${byR[r].map(id=>{const O0=OFFICES[id];const st=offState(id);const hp=st.holder?P(st.holder):null;
     return `<div class="off ${hp?'mine':''}"><div><b>${esc(O0.n)}</b> <span class="chip">${TAG[O0.tag]}</span><small>${esc(O0.d)} Bổng ${money(SALARY[r]*O0.mul)}, lộc ngoài ×${O0.side}. Cần ${Object.entries(O0.req).map(([k,v])=>`${SN[k]} ${v}`).join(', ')}.</small></div>
       <small class="who2">${hp?`Người nhà: <b>${esc(nameOf(hp))}</b>`:st.vac?'<b class="up">Đang trống</b>':`${esc(st.n)} · ${st.age} tuổi · năng lực ${st.ab}${st.liem<35?' · tiếng tham':''}`}</small></div>`}).join('')}`).join('')}</div></section>`;
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
  if(page==='giapha'&&chiF){if(!S.hh[chiF]||!alive().some(p=>p.hh===chiF))chiF='';else document.querySelectorAll('.tree [data-sel]').forEach(n=>{const p=P(n.dataset.sel);n.classList.toggle('dim',!p||p.hh!==chiF||p.dead!=null)})}
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
  app.querySelectorAll('[data-sellb]').forEach(b=>b.onclick=()=>{const bz=S.biz.find(x=>x.id===b.dataset.sellb);if(!bz)return;confirmBox(`Bán ${esc(BIZ[bz.type].lv[bz.lv][0].toLowerCase())}?`,`Có người trả ${money(bizValue(bz))}, tiền về ${esc(bizOwnName(bz).toLowerCase())}. Người đang trông sẽ thôi việc.`,'Bán',()=>{sellBiz(bz);closeModal();done()},closeModal)});
  app.querySelectorAll('[data-gop]').forEach(b=>b.onclick=()=>{S.gop=+b.dataset.gop;log(`Gia quy góp công quỹ: ${GOP.find(x=>x[0]===S.gop)[1].toLowerCase()} tiền công.`);done()});
  app.querySelectorAll('[data-to]').forEach(b=>b.onclick=()=>{S.farm.to=+b.dataset.to;log(`Đổi mức tô: ${TOLV[S.farm.to][0].toLowerCase()}.`);done()});
  app.querySelectorAll('[data-coff]').forEach(sl=>sl.onchange=()=>{const k=sl.dataset.coff;const p=sl.value?P(sl.value):null;S.coff[k]=p?p.id:null;log(p?`${nameOf(p)} nhận chức ${CLANOFF[k].n.toLowerCase()} trong tộc.`:`Chức ${CLANOFF[k].n.toLowerCase()} để trống.`);if(p)addStat(p,'tam',5);done()});
  const cf2=app.querySelector('#chiF');if(cf2)cf2.onchange=()=>{chiF=cf2.value;render()};
  app.querySelectorAll('[data-expand]').forEach(b=>b.onclick=()=>expandBiz(S.biz.find(x=>x.id===b.dataset.expand)));
  app.querySelectorAll('[data-hire]').forEach(b=>b.onclick=()=>{const [bid,r]=b.dataset.hire.split(':');hirePopup(bid,r)});
  app.querySelectorAll('[data-fire]').forEach(b=>b.onclick=()=>{const [bid,sid]=b.dataset.fire.split(':');const bz=S.biz.find(x=>x.id===bid);const st=bz.staff.find(s=>s.id===sid);bz.staff=bz.staff.filter(s=>s.id!==sid);log(`Cho ${st.n} nghỉ việc.`);done()});
  app.querySelectorAll('[data-owner]').forEach(s=>s.onchange=()=>{if(!s.value)return;const bz=S.biz.find(x=>x.id===s.dataset.owner);const p=P(s.value);if(p.biz){const ob=bizOf(p);if(ob)ob.owner=null}p.bizFrom=p.job;p.job='chu';p.biz=bz.id;p.lv=0;bz.owner=p.id;log(`${nameOf(p)} nhận trông coi ${BIZ[bz.type].lv[bz.lv][0].toLowerCase()}.`);done()});
  app.querySelectorAll('[data-sell]').forEach(b=>b.onclick=()=>{const [g,p]=b.dataset.sell.split(':');sellKho(g,+p)});
  const tp=app.querySelector('[data-trip]');if(tp)tp.onclick=()=>tradePopup();
  app.querySelectorAll('[data-rule]').forEach(b=>b.onclick=()=>{const k=b.dataset.rule;if(S.rules.includes(k)||ruleWhy(k))return;addRule(k);done()});
  app.querySelectorAll('[data-drop]').forEach(b=>b.onclick=()=>{const k=b.dataset.drop;confirmBox(`Bỏ điều "${esc(RULES[k].n)}"?`,`Bỏ gia quy làm Ổn định giảm${rule('tohuan')&&k!=='tohuan'?' nhiều (gia tộc giữ tổ huấn)':''}. Muốn thêm lại phải đợi đủ hạn.`,'Bỏ',()=>{dropRule(k);O.hidden=true;M.innerHTML='';done()},()=>{O.hidden=true;M.innerHTML='';render()})});
  const kg=app.querySelector('[data-kg]');if(kg)kg.onclick=()=>keugoiPopup();
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
  w_ensure(st);st.ver=6.3;return st;
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
  openModal(`<div class="menu"><div class="sealbig" aria-hidden="true">家</div><h2>Bách Niên Thế Gia</h2><p class="muted">Từ túp lều tranh đến danh gia vọng tộc</p>
   <div class="choices">${last?`<button class="btn primary" data-m="cont"><strong>Tiếp tục</strong><small>${slotLine(last)}</small></button>`:''}
   <button class="btn ${last?'':'primary'}" data-m="new"><strong>Trò chơi mới</strong><small>Lập một dòng họ mới</small></button>
   <button class="btn" data-m="load" ${any?'':'disabled'}><strong>Tải bản lưu</strong><small>Ba ô lưu, mỗi ô một gia tộc</small></button>
   <button class="btn" data-m="imp"><strong>Nhập từ file</strong><small>Mở bản lưu đã xuất ra máy</small></button></div></div>`,false,'menu');
  const b=k=>M.querySelector(`[data-m="${k}"]`);
  if(b('cont'))b('cont').onclick=()=>playSlot(last);
  b('new').onclick=()=>slotPick('Chọn ô lưu cho gia tộc mới',n=>startScreen(n));
  b('load').onclick=loadMenu;
  b('imp').onclick=importMenu;
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
  randomTraits(tmp);
  const stats={};STATS.forEach(([k])=>stats[k]=k==='suc'?clamp(Math.round(pot(tmp,'suc')*R(85,100)/100),45,100):clamp(Math.round(pot(tmp,k)*R(50,82)/100),8,90));
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
    <div class="field"><label>Xuất thân</label><div class="seg wrap"><button class="btn" data-o="rand" aria-pressed="${st.org==='rand'}">Ngẫu nhiên</button>${Object.entries(ORIGINS).map(([k,O0])=>`<button class="btn" data-o="${k}" aria-pressed="${st.org===k}">${O0.n}</button>`).join('')}</div>
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
      keep();const org=st.org==='rand'?pick(Object.keys(ORIGINS)):st.org;const reg=st.reg==='rand'?pick(Object.keys(REGIONS)):st.reg;const f=rollFounder(org,reg);
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
    if(!S.disaster||S.disaster.id!==mine.id){S.disaster={id:mine.id,k:mine.k,wk:mine.k,until:mine.until,sev:mine.sev,crop,provs:mine.provs};log(`${D0.n} (mức ${['','nhẹ','vừa','nặng'][mine.sev]}) ập đến nơi nhà mình ở. ${D0.say}`,'hi');
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
function w_genClan(p){
  const P0=PROV[p],W=S.w;const used=new Set((W.clans[p]||[]).map(c=>c.sur));used.add(S.surname);
  let n,g='nam';for(let i=0;i<30;i++){n=outsiderName('nam',P0.r);if(!used.has(n.surname))break}
  const pool={kinh:['quan','hoc','buon','thuoc','tho','vo'],phu:['buon','tho','hoc','quan','nong'],cang:['buon','buon','tho','vo','nong'],bien:['vo','vo','quan','buon','nong'],lang:['nong','nong','nong','tho','buon','hoc']}[P0.k];
  const fMax={kinh:260,phu:170,cang:170,bien:110,lang:90}[P0.k];
  const kids=[];const nk=R(1,3);for(let i=0;i<nk;i++){const gg=chance(0.5)?'nam':'nữ';const on=outsiderName(gg,P0.r);kids.push({id:'k'+(W.cid++),g:gg,given:on.given,age:R(2,30)})}
  return {id:'c'+(W.cid++),sur:n.surname,fame:R(4,fMax),wealth:R(15,85),job:pick(pool),head:{given:n.given,age:R(34,68),tr:pick(CTR63)},kids,rel:R(-8,12),feud:0,mar:0,last:-99}}
function w_clans(p){p=p||S.loc.p;const W=S.w;if(!W.clans[p]){const P0=PROV[p];const N={kinh:R(7,8),phu:R(5,6),cang:R(5,6),bien:R(3,4),lang:R(4,5)}[P0.k];W.clans[p]=[];for(let i=0;i<N;i++)W.clans[p].push(w_genClan(p))}return W.clans[p]}
function w_clansYear(){
  const W=S.w;
  for(const p in W.clans){const L=W.clans[p];const dmg=W.dmg[p]||0;
    L.forEach(c=>{c.head.age++;c.kids.forEach(k=>k.age++);
      c.wealth=clamp(c.wealth+R(-9,9)-dmg/25+(chance(0.1)?R(8,20):0),2,100);c.fame=clamp(c.fame+R(-6,8)+(c.wealth-50)/25,0,320);
      c.rel+=(0-c.rel)*0.08;if(c.feud&&chance(0.08))c.feud=0;
      if(c.head.age>=64&&chance((c.head.age-62)*0.05)){const heir=c.kids.filter(k=>k.g==='nam'&&k.age>=18).sort((a,b)=>b.age-a.age)[0];
        if(heir){c.head={given:heir.given,age:heir.age,tr:pick(CTR63)};c.kids=c.kids.filter(k=>k!==heir)}else{c.head.age=R(36,48);c.head.given=outsiderName('nam',PROV[p].r).given}}
      c.kids=c.kids.filter(k=>!(k.age>=32&&chance(0.4)));
      while(c.kids.length<R(1,3)&&chance(0.5)){const gg=chance(0.5)?'nam':'nữ';c.kids.push({id:'k'+(W.cid++),g:gg,given:outsiderName(gg,PROV[p].r).given,age:R(0,6)})}});
    /* họ lụi tàn bị thay bằng họ mới */
    for(let i=L.length-1;i>=0;i--){const c=L[i];if((c.wealth<8&&chance(0.25))||chance(0.012)){L[i]=w_genClan(p);L[i].fame=Math.round(L[i].fame/2)}}}
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
    S.biz.slice().forEach(b=>{const v=bizValue(b);sellBiz(b);S.money-=Math.round(v*(flee?0.45:0.2))});
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
  /* sự kiện dòng họ khác */
  if(chance(0.07)){const hd=head();const L=w_clans();if(hd&&L.length){const c=pick(L);const tp=pick(['w63_ho_qua','w63_ho_canh_tranh','w63_ho_tranh_chap','w63_ho_gia_nan','w63_ho_hoi_lang','w63_ho_xin_vay']);enqueue('ev',hd.id,{ev:tp,data:{cl:c.id,p:S.loc.p}})}}
  if(chance(0.012)){const hd=head();const L=w_clans().filter(c=>c.kids.some(k=>k.age>=16&&k.age<=30));if(hd&&L.length&&alive().some(p=>inClan(p)&&!p.spouse&&age(p)>=16&&age(p)<=32)){const c=pick(L);enqueue('ev',hd.id,{ev:'w63_ho_ket_than',data:{cl:c.id,p:S.loc.p}})}}
  /* thương nhân lạ mang tin từ xa */
  if(chance(0.02)){const hd=head();if(hd)enqueue('ev',hd.id,{ev:'w63_tin_xa'})}
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
  const LBL63={trung:[250,266],bac:[250,28],dong:[452,232],nam:[255,318],tay:[62,184]};
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
    parts.push(`<g class="pv ${p===selP?'on':''} ${p===home?'home':''}" data-prov="${p}" tabindex="0" role="button" aria-label="${esc(P0.n)}">${shape} fill="${N0.col}" class="pd"/><text x="${P0.x}" y="${P0.y+(P0.k==='kinh'?20:17)}" text-anchor="middle" class="pl">${esc(P0.n)}</text>${p===home?`<text x="${P0.x}" y="${P0.y-11}" text-anchor="middle" class="hm">★</text>`:''}</g>`)}
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
  return `<div class="grid1"><section class="card"><span class="eyebrow">${esc(locName())}</span><h2>Các họ quanh vùng</h2>
   <p class="kvline">${L.length} dòng họ cùng sống ở ${esc(P0.n)}. Họ nhà mình làm ${CJOB63[ours]}, những họ cùng nghề sẽ là đối thủ làm ăn.</p>
   <div class="clans">${L.map(c=>{const rival=c.job===ours;return `<div class="clanrow">
     <div><b>Họ ${esc(c.sur)}</b> <span class="chip ${c.fame>=150?'gold':''}">${c.fame>=150?'Danh gia':c.fame>=70?'Có tiếng':'Thường dân'}</span> ${rival?'<span class="chip red">cùng nghề</span>':''} ${c.feud?'<span class="chip red">thù oán</span>':''} ${c.mar?`<span class="chip">thông gia ×${c.mar}</span>`:''}
       <small class="muted">Gia chủ ${esc(c.head.given)} (${c.head.age} tuổi, ${c.head.tr}) · ${CJOB63[c.job]} · ${w_wealthTxt(c.wealth)} · danh vọng ${Math.round(c.fame)}</small>
       <small>Quan hệ với nhà mình: <b class="${c.rel>=25?'up':c.rel<=-15?'down':''}">${relTxt(c.rel)}</b> (${Math.round(c.rel)})</small></div>
     <div class="acts"><button class="btn small" data-w63="gift:${c.id}">Biếu quà</button>${c.feud||c.rel<=-25?`<button class="btn small ghost" data-w63="peace:${c.id}">Hòa giải</button>`:''}${c.kids.some(k=>k.age>=16&&k.age<=32)?`<button class="btn small ghost" data-w63="wed:${c.id}">Hỏi thông gia</button>`:''}</div></div>`}).join('')}</div></section></div>`}
/* ---------- hành động ---------- */
function w_gift(id){
  const c=w_clan(S.loc.p,id),hd=head();if(!c||!hd)return;const cost=mm(1+c.fame/70);
  confirmBox(`Biếu quà họ ${esc(c.sur)}?`,`Gửi lễ vật trị giá ${money(cost)} để thắt chặt tình nghĩa. ${c.job===w_ourKind()?'Họ cùng nghề nên lòng người khó đoán.':''}`,'Biếu',()=>{
    if(S.money<cost){closeModal();return}S.money-=cost;const d=R(7,14)+(c.head.tr==='tham lam'?4:0)-(c.head.tr==='ngạo mạn'?4:0);c.rel=clamp(c.rel+d,-100,100);c.last=S.t;
    if(c.fame>=110)cf(0.6,'Kết thân với danh gia');log(`Biếu họ ${c.sur} lễ vật ${money(cost)}, quan hệ tốt lên.`);closeModal();render();save()},closeModal)}
function w_peace(id){
  const c=w_clan(S.loc.p,id),hd=head();if(!c||!hd)return;
  const cost=mm(2+c.fame/60);
  choicePopup(hd,'Láng giềng',`Hòa giải với họ ${c.sur}`,`Hai họ đang có hiềm khích. Gia chủ ${esc(c.head.given)} ${c.head.tr==='hẹp hòi'||c.head.tr==='ngạo mạn'?'tính khí khó chiều':'tuy còn giận nhưng chịu nghe'}.`,[
    {l:`Mang lễ sang tận nhà nhận lỗi (${money(cost)})`,c:()=>S.money>=cost,r:[{eq:1,khau:0.4},45+(c.head.tr==='nhân hậu'||c.head.tr==='phóng khoáng'?20:0)-(c.head.tr==='hẹp hòi'||c.head.tr==='ngạo mạn'?20:0)],
      y:x=>{S.money-=cost;c.rel=clamp(c.rel+30,-100,100);c.feud=0;return `Họ ${esc(c.sur)} niềm nở tiếp, hai bên bắt tay làm hòa.`+fx(x,{fame:2,tam:4})},n:x=>{S.money-=Math.round(cost*0.5);c.rel=clamp(c.rel-6,-100,100);return `Bị tiếp lạnh nhạt, lễ vật bị trả về.`+fx(x,{tam:-4})}},
    {l:'Nhờ người có tiếng trong vùng đứng ra',c:()=>S.fame>=40,r:[{eq:0.6,fame:0.5},50],y:x=>{c.rel=clamp(c.rel+22,-100,100);c.feud=0;return 'Có người lớn tuổi đứng ra hòa giải, hai họ nguôi giận.'},n:x=>{c.rel=clamp(c.rel-3,-100,100);return 'Người làm chứng chưa đủ trọng, chuyện đâu vẫn còn đó.'}},
    {l:'Thôi, để thời gian trôi',f:x=>''}]);
}
function w_wed(id){
  const c=w_clan(S.loc.p,id),hd=head();if(!c||!hd)return;
  const ours=alive().filter(p=>inClan(p)&&!p.spouse&&age(p)>=16&&age(p)<=34&&!p.inLaw&&!(p.left));
  const opts=[];
  ours.slice(0,6).forEach(m=>c.kids.filter(k=>k.g!==m.g&&k.age>=16&&k.age<=32&&Math.abs(k.age-age(m))<=8).slice(0,2).forEach(k=>{
    const base=0.3+c.rel/220+(S.fame-c.fame)/500+(c.head.tr==='tham lam'?0.05:0)+(m.mi-50)/300;const pr=clamp(base,0.08,0.9);
    opts.push({l:`${m.given} (${age(m)} t) hỏi cưới ${k.g==='nữ'?'cô':'cậu'} ${k.given} họ ${c.sur} (${k.age} t)`,s:`Khả năng nhà ${k.g==='nữ'?'gái':'trai'} nhận lời: ${Math.round(pr*100)}%`,
      f:x=>{ if(!chance(pr)){c.rel=clamp(c.rel-5,-100,100);return `Họ ${esc(c.sur)} từ chối khéo, bảo "hai nhà chưa xứng đôi".`+fx(m,{tam:-6})}
        const sp=mkPerson({g:k.g,surname:c.sur,given:k.given,age:k.age,hh:m.hh});sp.npcClan=c.id;sp.needT=tierIdx();
        c.kids=c.kids.filter(z=>z!==k);c.mar++;c.rel=clamp(c.rel+18,-100,100);
        if(m.g==='nam'){const p2=mkSpouse(m,false,sp);return `Hai nhà thông gia. ${esc(p2.given)} về làm dâu họ ${esc(S.surname)}.`+fx(m,{fame:2})}
        sp.fee=mm(6+c.fame/12);marryOut(m,sp);return `Hai nhà thông gia. ${esc(m.given)} xuất giá về họ ${esc(c.sur)}.`}}) }));
  if(!ours.length||!opts.length){infoPopup(hd,'Láng giềng',`Chưa có ai để mai mối`,`Nhà mình không có người đến tuổi lập gia thất, hoặc họ ${esc(c.sur)} không có người hợp tuổi.`);return}
  opts.push({l:'Thôi',f:()=>''});choicePopup(hd,'Thông gia',`Hỏi thông gia họ ${c.sur}`,`Nhà có tiếng thì cưới gả cũng thành chuyện đáng bàn.`,opts)}
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
  app.querySelectorAll('[data-w63]').forEach(b=>b.onclick=()=>{const [k,v]=b.dataset.w63.split(':');
    if(k==='move')movePopup(v);else if(k==='trade'){preRoute63=v;tradePopup()}else if(k==='gift')w_gift(v);else if(k==='peace')w_peace(v);else if(k==='wed')w_wed(v)})}

/*@@V63-END@@*/
/* ================= cổng cho các tệp kỳ ngộ ================= */
const G={R,pick,chance,clamp,fmt,esc,fx,fxAll,roll,prob,later,age,nameOf,spouseOf,kidsOf,alive,home,married,stg,season,month,tierIdx,tierName,hasJob,grantTitle,mkSpouse,mkPerson,addStat,setJob,
  S:()=>S,P,D:window.D,JOBS,RANKS,TUOC,ROUTES,routes,REGIONS,relOf,addRel,kin,subOf,ensurePersona,HABITS,TRAITS,CROPS,GOODS,OFFICES,BIZ,isOfficialFamily,log,enqueue,die,mm,money:()=>S.money,fame:()=>S.fame,fmtMoney:money,
  head,isHead,has,addTrait,removeTrait,traitsOf,shiftAx,axv,skv,addSk,addHabit,dropHabit,cutVice,vlv,isVice,viceOf,axLabels,outsiderName,mkGiven,fullOutsider,inClan,adopt,enlist,wipeClan,assignPost,appoint,postOf,offState,quitOffice,bizOf,priceOf,mk,lone,noble,famLuck,clanTuoc,
  hhOf:c=>HH(c.hh),mainHH,HOMES,LIFE,setAway:(c,a)=>{c.away=a},childOf,doBirth,newHH:(c,home)=>newBranch(c,home,0),
  unlockCrop:k=>{if(!S.farm.unlock.includes(k)){S.farm.unlock.push(k);log(`Gia tộc có thêm giống ${CROPS[k].n.toLowerCase()}.`,'gd');return true}return false},
  _v61:{becomeHead,econMonth,brkPaths,brkStart,thoPopup,teachPopup,vacantPopup,moveOutPopup,rewardPopup,askGopPopup,askParentPopup,bossRaisePopup,sellBiz,openBizPopup,offHolder,prefFocus,kidWish,startLv,branches,newBranch,msPopup,pageCosngoi,econEst},
  kidAdj,gain,charge,canPay,fundOf,inMain,clanKeeps,branchLeader,purse:c=>c.purse,
  kho:()=>S.kho,war:()=>S.war,epi:()=>S.epi,expandBiz,gameOver,openBiz,homeLv:()=>HH(mainHH()).home,lifeLv:()=>HH(mainHH()).life,fmtMoney:money,relation,jobName,matchmaker,canOwn,mkStaff,staffEff,isHead,
  protect,protName,obey,comeHome,marryOut,divorce,lyPopup,gateCap,hardCap,titleOf,jobFit,laborOk,working,selfEmp,remarryOk,adoptOk,setLove,settleEstate,kidCap,inClanP:inClan,rule,cf,addTraitP:addTrait,
  _v63:{fleePopup,fleeTargets,w_wed,w_gift,w_peace,w_spoil,w_front,w_damp,w_khoFee,mapSVG,w_ensure,w63Month,doMove,movePopup,locName,locP,routes63,w_clans,w_clan,w_news,w_shock,w_startWar,w_endWar,w_home,w_dis,w_tension,w_clansYear,w_mo,w_closed,moveCost,w_ourKind,w_jobKind,homeNat,w_label,leaveJob,sickPopup,get mapProv(){return mapProv},TIERN63,CJOB63,CTR63,VILL63},
  _v62:{willPopup,chunoPopup,debtTick,expelPopup2,doExpel,tumatPopup,oanPopup,tranhviPopup,ruleSlots,ruleWhy,addRule,dropRule,keugoiPopup,thiencoPopup,gateCheck,ttlPopup,wishPick,wishScore,obey,ctxOk,CTX,v62Month,v62Year,loveTick,outsTick,divorcePopup,vuotsinhPopup,rulepropPopup,ruleforcePopup,rulechgPopup,pieceF,jobDig,minDig}};
window.BNTG=G;
buildEvents();

/* ================= khởi động ================= */
function start(data){
  if(data&&data.S&&!data.S.over){S=migrate(data.S);sel=data.sel||S.head;page=data.page||'giapha';running=false;centerNext=true;render();nextPopup()}else mainMenu();
}
if(window.claude&&window.claude.hot&&window.claude.hot.snapshot)window.claude.hot.snapshot(()=>({S,sel,page}));
window.claude?.hot?.ready?window.claude.hot.ready(start):start(window.claude?.hot?.data??{});
})();
