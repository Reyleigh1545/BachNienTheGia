/* Bách Niên Thế Gia · engine-xc.js: gói ENGX tách từ engine.js bằng tools/xmove.js (7.0.0-d.1.5.6). Thân hàm giữ nguyên; engine.js còn dòng chuyển ENGX.fn.<tên>. Hàm gán vào biến let cấp cao KHÔNG nằm ở đây. Nạp sau events-lv.js, trước engine.js. */
window.ENGX=window.ENGX||[];
window.ENGX.push(X=>{
const {BORDER,CJOB63,COMPOUND_SUR,CTR63,DIS,GOODS,HOUSE_TITLE,NAT,NPCJ63,PROV,R,REGIONS,SEATS,VILL63,age,alive,cHeadFull,cf,chance,choicePopup,clamp,clanLv,clanSucc,cname,cnameU,ctierC,dateStr,disActive,enqueue,esc,expenses,fx,giftNorm,giftPopup,head,headBSync,homeNat,inClan,infoPopup,locName,locP,log,marryOut,mk,mkMatch,mkSpouse,mm,mmt,money,moveBlock,npcLv,outsiderName,pairName63,pick,relBase,routes,termYears,tierIdx,w633Month,w_clan,w_ensure,w_kidJob,w_label,w_news,w_rel,w_sea,w_wealthTxt}=X.EC;
function w_new(){const W={ten:{},ph:{},wars:[],dis:[],sk:{},dmg:{},clans:{},news:[],prep:null,wid:1,did:1,cid:1};BORDER.forEach((b,i)=>{W.ten[i]=clamp(b[2]+R(-6,8),0,100);W.ph[i]=0});return W}
function w_startProv(reg){const L=Object.keys(PROV).filter(id=>PROV[id].r===reg&&PROV[id].k==='lang'&&PROV[id].nat!=='hai_minh');return pick(L.length?L:Object.keys(PROV).filter(id=>PROV[id].r===reg))}
function w_setLoc(p,t,v){const S=X.S;const P0=PROV[p];S.loc={p,t:t||0,v:v||pick(VILL63)};S.region=P0.r;(REGIONS[S.region].unlock||[]).forEach(k=>{if(!S.farm.unlock.includes(k))S.farm.unlock.push(k)})}
function w_shock(p,g,f,cap){const S=X.S;const W=S.w;W.sk[p]=W.sk[p]||{};W.sk[p][g]=clamp((W.sk[p][g]||1)*f,0.6,cap||2.6)}
function w_mo(a,b){const r=window.D.route(a,b,X.S&&X.S.t!=null?(X.S.t%12)+1:null);return r?Math.max(1,Math.round(r.thang)):9} /* d.1.5.49: số tháng theo đường đi thật trên bản đồ */
function w_front(){const S=X.S;const W=S.w;const o={};W.wars.forEach(w=>{o[w.front[0]]=1;o[w.front[1]]=1});return o}
function w_closed(p){const S=X.S;const W=S.w;const fr=w_front();if(fr[p]&&(W.dmg[p]||0)>=25)return true;const hn=homeNat(),dn=PROV[p].nat;return W.wars.some(w=>(w.a===hn&&w.b===dn)||(w.b===hn&&w.a===dn))}
function w_warRisk(p){const S=X.S;const W=S.w;const hn=homeNat(),dn=PROV[p].nat;let r=0;W.wars.forEach(w=>{if([w.a,w.b].includes(hn)||[w.a,w.b].includes(dn))r+=0.07});return Math.min(0.2,r)}
function w_warName(w){return `${NAT[w.a].n} đánh ${NAT[w.b].n}`}
function w_startWar(i){const S=X.S;
  const W=S.w,b=BORDER[i];const att=chance(NAT[b[0]].hos/(NAT[b[0]].hos+NAT[b[1]].hos))?0:1;const a=b[att],d=b[1-att];
  const why=(W.why||{})[i]||w_cause(i,S.t%12+1).why;const w={id:W.wid++,i,a,b:d,why,since:S.t,until:S.t+R(18,42),front:(window.BN_CT&&window.BN_CT.tienTuyen(i))||[b[4],b[5]],chiem:{},gop:{},next:S.t+R(2,4)};W.wars.push(w);W.ph[i]=3;W.ten[i]=100;
  w_news(`Chiến tranh nổ ra: ${w_warName(w)}, bắt nguồn từ ${why}. Mặt trận ở ${PROV[w.front[0]].n} và ${PROV[w.front[1]].n}.`,w_rel(a,d));
  [a,d].forEach(n=>Object.keys(PROV).filter(p=>PROV[p].nat===n).forEach(p=>{w_shock(p,'sat',1.25);w_shock(p,'ngua',1.25);w_shock(p,'lua',1.12)}));
  return w}
function w_endWar(w,why){const S=X.S;
  const kq=window.BN_CT?window.BN_CT.ketCuc(w):''; /* d.1.5.54: đã tuyên chiến thì bản đồ phải đổi */
  const W=S.w;W.wars=W.wars.filter(x=>x!==w);W.ph[w.i]=0;W.last=W.last||{};W.last[w.i]=S.t;W.ten[w.i]=clamp(BORDER[w.i][2]+R(5,14),0,100);
  w_news(`Hòa ước: ${w_warName(w)} đã kết thúc${why?', '+why:''}.${kq?' '+kq+'.':''}`,w_rel(w.a,w.b))}
/* d.1.5.47 (chủ dự án 27/11: "chiến tranh xuất hiện cũng tùy ý"): căng thẳng biên giới phải có nguyên nhân đọc được; vừa hòa ước thì năm năm không gây chiến lại */
function w_cause(i,mo){const S=X.S,W=S.w,b=BORDER[i];const L=[];let p=0;const pair=[b[0],b[1]];
  const d=(W.dis||[]).find(x=>disActive(x)&&x.provs.some(q=>q===b[4]||q===b[5]||pair.includes(PROV[q].nat)&&PROV[q].r===PROV[b[4]].r));
  if(d){p+=0.9;L.push(`${DIS[d.k].n.toLowerCase()} làm vùng biên khốn đốn, người đói tràn qua cướp`)}
  if(pair.some(n=>n==='lang_bo'||n==='hac_ma')&&mo>=8&&mo<=11){p+=0.5;L.push('mùa thu ngựa béo, kỵ binh thảo nguyên xuống cướp phá')}
  const dy=S.dyn;if(dy&&pair.includes('trieu')){if((dy.loan||0)>=45){p+=0.8;L.push('trong nước rối ren, bên kia thừa cơ dò biên phòng')}else if(dy.k&&(dy.k.tai<40||dy.k.uy<40)){p+=0.6;L.push('vua yếu thế, bên kia coi thường biên phòng')}}
  const last=(W.last||{})[i];const nam=last==null?null:(S.t-last)/12;if(nam!=null&&nam>=8&&nam<=25){p+=0.5;L.push('mối thù từ cuộc chiến trước chưa nguôi')}
  if((W.doi||[]).some(x=>S.t-x.t<480&&pair.includes(x.tu)&&pair.includes(x.sang)&&PROV[x.p].nat===x.sang)){p+=0.6; /* mối hận mất đất còn nóng trong 40 năm */L.push('đòi lại đất cũ đã bị cắt')} /* d.1.5.54 */
  if(!L.length)L.push(pick(['tranh chấp cột mốc ở vùng giáp ranh','thương đoàn bị chặn cướp, hai bên đổ lỗi cho nhau','dân chăn thả lấn sang bên kia rồi đánh nhau']));
  return {p,why:pick(L),truce:nam!=null&&nam<5}}
function w_tension(mo){const S=X.S;
  const W=S.w;
  BORDER.forEach((b,i)=>{
    if(W.wars.some(w=>w.i===i))return;
    if(window.BN_CT&&(window.BN_CT.dangXung(i)||!window.BN_CT.tienTuyen(i)))return; /* d.1.5.54: đang xung đột, hoặc hai nước hết giáp nhau */
    const hos=b[3]*(NAT[b[0]].hos+NAT[b[1]].hos)/2;let t=W.ten[i],ph=W.ph[i]||0;
    if(ph===0){ /* êm ả: thỉnh thoảng có biến cố */
      t+=(b[2]-t)*0.08;const cs=w_cause(i,mo);if(!cs.truce&&chance(0.0095*hos*(1.15+cs.p))){t=R(54,70);W.ph[i]=1;W.why=W.why||{};W.why[i]=cs.why;w_news(`Tin đồn: ${pairName63(i)} xô xát ở biên giới vì ${cs.why}.`,w_rel(b[0],b[1]))}
    }else{ /* leo thang hoặc hạ nhiệt */
      const cs=w_cause(i,mo);t+=chance(Math.min(0.7,0.47+0.05*(hos-1)+0.07*cs.p))?R(0,6):-R(0,5);
      if(t>=72&&ph===1){W.ph[i]=2;w_news(`${pairName63(i)} điều quân đến sát biên giới, hai bên chuẩn bị chiến tranh. Gốc việc: ${(W.why||{})[i]||cs.why}.`,w_rel(b[0],b[1]));
        if(w_rel(b[0],b[1])&&[b[0],b[1]].includes(homeNat()))S.recruit=Math.max(S.recruit,S.t+6)}
      if(t>=90||(ph===2&&t>=80&&chance(0.04))){W.ten[i]=t;if(!window.BN_CT||window.BN_CT.no(i)==='chien')w_startWar(i);return}
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
    if(window.BN_CT)window.BN_CT.chien(w);else if(S.t>=w.until)w_endWar(w,'sau nhiều trận giằng co')});
  if(window.BN_CT)window.BN_CT.month();
  /* phục hồi */
  for(const p in W.dmg){if(!w_front()[p])W.dmg[p]=Math.max(0,W.dmg[p]-2);if(!W.dmg[p])delete W.dmg[p]}
  for(const p in W.sk){for(const g in W.sk[p]){W.sk[p][g]+=(1-W.sk[p][g])*0.07;if(Math.abs(W.sk[p][g]-1)<0.02)delete W.sk[p][g]}if(!Object.keys(W.sk[p]).length)delete W.sk[p]}
}
function w_dis(mo){const S=X.S;
  const W=S.w;
  W.dis.slice().forEach(d=>{
    if(S.t>=d.until){W.dis=W.dis.filter(x=>x!==d);if(DIS[d.k].epi&&d.provs.includes(S.loc.p))S.epiRisk=Math.max(S.epiRisk,DIS[d.k].epi*0.6);w_news(`${DIS[d.k].n} ở ${REGIONS[d.r].n} đã qua.`,d.r===S.region&&d.provs.includes(S.loc.p))}
    else if(!d.warned&&S.t===d.since-1){d.warned=1;if(d.r===S.region)w_news(`Báo động: ${DIS[d.k].n.toLowerCase()} sắp ập tới ${d.provs.map(p=>PROV[p].n).join(', ')}.`,d.provs.includes(S.loc.p))}
    else if(S.t===d.since){const R0=REGIONS[d.r];w_news(`${DIS[d.k].n} ở ${R0.n}: ${d.provs.map(p=>PROV[p].n).join(', ')}, mức ${['','nhẹ','vừa','nặng'][d.sev]}.`,d.provs.includes(S.loc.p));
      d.provs.forEach(p=>DIS[d.k].g.forEach(g=>w_shock(p,g,1+0.15*d.sev+0.1,2.6)))}});
  for(const k in DIS){const D0=DIS[k];if(!D0.mo.includes(mo))continue;
    for(const r in D0.w){if(W.dis.some(x=>x.k===k&&x.r===r))continue;
      if(chance(0.0145*D0.w[r])){const TER={lu:['song','dongbang','ho','dam'],bao:['bien'],cat:['samac'],lam:['rung','dam'],tuyet:['tuyet','thao'],chau:['dongbang','thao']}[k];const pr=Object.keys(PROV).filter(p=>PROV[p].r===r&&(!TER||window.D.hasDH(p,TER)));if(!pr.length)continue;const n=Math.min(pr.length,R(2,3));const provs=pr.slice().sort(()=>Math.random()-0.5).slice(0,n);
        const x=Math.random();const sev=x<0.5?1:x<0.85?2:3;const since=S.t+(D0.warn?1:0);
        W.dis.push({id:W.did++,k,r,provs,since,until:since+R(D0.d[0],D0.d[1]),sev,warned:0});}}}
  /* chiếu xuống nhà mình */
  const mine=W.dis.find(d=>disActive(d)&&d.provs.includes(S.loc.p));
  if(mine){const D0=DIS[mine.k];const crop=clamp(1-(1-D0.crop)*mine.sev/2,0.2,1);
    if(!S.disaster||S.disaster.id!==mine.id){if(clanLv()>=5){const rl=mmt(R(6,14));S.money+=rl;log(`Quan địa phương nể dòng họ, cấp ${money(rl)} cứu trợ.`,'gd')}S.disaster={id:mine.id,k:mine.k,wk:mine.k,until:mine.until,sev:mine.sev,crop,provs:mine.provs};log(`${D0.n}, mức ${['','nhẹ','vừa','nặng'][mine.sev]}, ập đến nơi nhà mình ở. ${D0.say}`,'hi');
      if(D0.epi>=0.9&&!S.epi){S.epi=true;S.epiEnd=S.t+R(3,5)}
      const hd=head();if(hd&&mine.sev>=2)enqueue('ev',hd.id,{ev:'w63_dis_'+mine.k,data:{sev:mine.sev}})}
    else S.disaster.until=mine.until}
  else if(S.disaster&&S.disaster.id){S.disaster=null}
  else if(S.disaster&&!S.disaster.id&&S.t>=S.disaster.until){S.epiRisk=Math.max(S.epiRisk,0.3);S.disaster=null}
}
function w_home(){const S=X.S;
  const W=S.w,hn=homeNat();const w=W.wars.find(x=>x.a===hn||x.b===hn);
  if(w){const foe=w.a===hn?w.b:w.a;const near=(w.front.includes(S.loc.p)||(W.dmg[S.loc.p]||0)>=10)?0:(PROV[S.loc.p].r===PROV[w.front[0]].r||PROV[S.loc.p].r===PROV[w.front[1]].r)?1:2;
    if(!S.war||S.war.wid!==w.id){S.war={n:w_warName(w),until:w.until,since:w.since,wid:w.id,enemy:foe,front:w.front,near};log(`Chiến sự: ${w_warName(w)}. ${near===0?'Chiến trường ngay trên đất nhà mình!':near===1?'Chiến trường không xa, cả vùng nơm nớp.':'Chiến trường còn xa, nhưng triều đình vẫn ra lệnh bắt lính.'}`,'hi')}
    else{S.war.until=w.until;S.war.near=near}}
  else if(S.war){
    if(S.war.wid||S.t>=S.war.until){log('Chiến sự kết thúc. Sau chiến tranh, dịch bệnh dễ phát sinh.','gd');S.war=null;S.epiRisk=Math.max(S.epiRisk,0.4);
      alive().filter(p=>p.job==='quan_ngu'&&p.away).forEach(p=>enqueue('ev',p.id,{ev:'qn_het_chien'}))}}
}
function w_jobKind(c){const j=c.job;return ['tieunhi','hangrong','chu','thulai'].includes(j)?'buon':['tho','tho_ren','det','bep'].includes(j)?'tho':['su','diaky'].includes(j)?'hoc':['quan','nguy'].includes(j)?'quan':['y','mo'].includes(j)?'thuoc':['quan_ngu','tieu','hiep','nhadich'].includes(j)?'vo':'nong'}
function w_houseSur(p,c){const S=X.S;
  if(!chance(0.4)||COMPOUND_SUR.includes(c.sur))return;
  const used=new Set((S.w.clans[p]||[]).map(x=>x.sur));const free=COMPOUND_SUR.filter(s=>!used.has(s));
  if(free.length)c.sur=pick(free)}
function w_markHouses(p){const S=X.S;
  const W=S.w,L=W.clans[p];if(!L)return;const P0=PROV[p];
  if(SEATS.includes(p)){L.forEach(c=>{delete c.house;c.fame=Math.min(c.fame,70)});return}
  if(L.some(c=>c.house))return;
  const n={kinh:2,phu:chance(0.5)?2:1,cang:chance(0.5)?2:1,bien:1,lang:chance(0.3)?2:1}[P0.k]||1;
  L.slice().sort((a,b)=>b.fame-a.fame).slice(0,n).forEach((c,i)=>{
    const t5=i===0&&(P0.k==='kinh'||(P0.k==='phu'&&chance(0.5))||(P0.k==='cang'&&chance(0.4)));const tier=t5?5:4;
    c.house={tier,title:pick(HOUSE_TITLE[c.job]||HOUSE_TITLE.nong)};w_houseSur(p,c);
    c.fame=Math.max(c.fame,tier===5?R(215,255):R(150,200));c.wealth=Math.max(c.wealth,R(58,82))})}
function w_genClan(p){const S=X.S;
  const P0=PROV[p],W=S.w;const used=new Set((W.clans[p]||[]).map(c=>c.sur));used.add(S.surname);
  let n,g='nam';for(let i=0;i<30;i++){n=outsiderName('nam',P0.r);if(!used.has(n.surname))break}
  const pool={kinh:['quan','hoc','buon','thuoc','tho','vo'],phu:['buon','tho','hoc','quan','nong'],cang:['buon','buon','tho','vo','nong'],bien:['vo','vo','quan','buon','nong'],lang:['nong','nong','nong','tho','buon','hoc']}[P0.k];
  const fMax={kinh:260,phu:170,cang:170,bien:110,lang:90}[P0.k];
  const kids=[];const nk=R(1,3);for(let i=0;i<nk;i++){const gg=chance(0.5)?'nam':'nữ';const on=outsiderName(gg,P0.r);kids.push({id:'k'+(W.cid++),g:gg,given:on.given,age:R(2,30)})}
  return {id:'c'+(W.cid++),sur:n.surname,fame:R(4,fMax),wealth:R(15,85),job:pick(pool),head:{given:n.given,age:R(34,68),tr:pick(CTR63)},kids,rel:R(-8,12),feud:0,mar:0,last:-99}}
function w_clans(p){const S=X.S;p=p||S.loc.p;const W=S.w;if(!W.clans[p]){const P0=PROV[p];const N={kinh:R(7,8),phu:R(5,6),cang:R(5,6),bien:R(3,4),lang:R(4,5)}[P0.k];W.clans[p]=[];for(let i=0;i<N;i++)W.clans[p].push(w_genClan(p));w_markHouses(p)}return W.clans[p]}
function w_clansYear(){const S=X.S;
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
function w_ourKind(){const hd=head();return hd?w_jobKind(hd):'nong'}
function w_khoFee(){const S=X.S;let v=0;for(const g in S.kho){if(['lua','ngo'].includes(g))continue;const q=S.kho[g]||0;if(q>=1)v+=q*GOODS[g].p*0.002}
  if(v>=1)S.money-=Math.round(v)}
function w_priceTable(p,h){
  const goods=Object.keys(GOODS);
  return `<div class="ptab"><div class="ph"><span>Hàng</span><span>Giá ở đây</span>${p!==h?'<span>So với nhà</span>':'<span></span>'}</div>${goods.map(g=>{const v=locP(p,g);const ratio=v/locP(h,g);
    return `<div><span>${GOODS[g].n}</span><span class="num">${money(GOODS[g].p*v*mk(g))}</span>${p!==h?`<span class="num ${ratio>=1.12?'up':ratio<=0.88?'down':''}">×${ratio.toFixed(2)}</span>`:'<span></span>'}</div>`}).join('')}</div>`}
function w_provPanel(p){const S=X.S;
  const W=S.w,h=S.loc.p,P0=PROV[p],N0=NAT[P0.nat];const RT=routes().find(r=>r.id===p);
  const front=w_front()[p];const dmg=W.dmg[p]||0;const dz=W.dis.filter(d=>d.provs.includes(p)&&S.t<d.until);
  const war=W.wars.find(w=>w.front.includes(p));
  const tags=[];if(front)tags.push(`<span class="chip red">tiền tuyến</span>`);if(dmg>=10)tags.push(`<span class="chip red">thiệt hại ${Math.round(dmg)}%</span>`);
  dz.forEach(d=>tags.push(`<span class="chip red">${DIS[d.k].n}${S.t<d.since?' · sắp tới':''}</span>`));
  const blk=moveBlock();
  return `<span class="eyebrow">${p===h?`Quê nhà · ${esc(locName())}`:RT?`Cách ${RT.mo} tháng đường${RT.sea?' · đi biển':''} · rủi ro ${Math.round(RT.risk*100)}% · cần thông thạo ${RT.mm}`:''}</span>
   <h2>${esc(P0.n)}</h2>
   <p class="kvline"><span class="chip" style="background:${N0.col};color:#fff">${esc(N0.n)}</span><span class="chip">${{kinh:'Kinh đô',phu:'Phủ lớn',cang:'Cảng',bien:'Ải biên giới',lang:'Vùng nông thôn'}[P0.k]}</span><span class="chip">${esc(REGIONS[P0.r].n)}</span>${tags.join(' ')}</p>
   <p class="kvline">${esc(P0.d)}</p>
   ${war?`<p class="kvline down">Chiến sự: ${esc(w_warName(war))}, còn khoảng ${Math.max(0,war.until-S.t)} tháng.</p>`:''}
   ${w_priceTable(p,h)}
   ${p!==h&&RT&&RT.war?'<p class="kvline down">Đường tới đây đang đóng vì chiến sự.</p>':''}
   <div class="acts" style="margin-top:10px">
     <button class="btn small" data-w63="move:${p}" ${blk?'disabled':''}>${p===h?'Đổi nơi ở trong tỉnh':'Dời nhà tới đây'}</button>
     ${p!==h&&RT?`<button class="btn small ghost" data-w63="trade:${p}">Đi buôn tới đây</button>`:''}
   </div>${blk&&p!==h?`<p class="note" style="margin-top:6px">${esc(blk)}</p>`:''}`}
function w_situation(){const S=X.S;
  const W=S.w;
  const wars=W.wars.map(w=>`<li><b>${esc(w_warName(w))}</b> · mặt trận ${esc(PROV[w.front[0]].n)} và ${esc(PROV[w.front[1]].n)} · còn khoảng ${Math.max(0,w.until-S.t)} tháng${w.a===homeNat()||w.b===homeNat()?' · <span class="down">nước nhà tham chiến</span>':''}${window.BN_CT?window.BN_CT.moTa(w):''}</li>`).join('');
  const tens=BORDER.map((b,i)=>({i,t:W.ten[i],ph:W.ph[i]||0,rel:w_rel(b[0],b[1])})).filter(x=>!W.wars.some(w=>w.i===x.i)).sort((a,b)=>(b.rel-a.rel)||(b.t-a.t)).slice(0,6);
  const dis=W.dis.filter(d=>S.t<d.until).map(d=>`<li>${DIS[d.k].n} ở ${esc(REGIONS[d.r].n)}: ${d.provs.map(p=>esc(PROV[p].n)).join(', ')} · mức ${['','nhẹ','vừa','nặng'][d.sev]}${S.t<d.since?' · <b>sắp tới</b>':''}${d.provs.includes(S.loc.p)?' · <span class="down">nơi nhà mình ở</span>':''}</li>`).join('');
  return `<span class="eyebrow">Tình hình thiên hạ</span><h2>Thế giới</h2>
   <p class="kvline"><b>Chiến tranh</b></p>${wars?`<ul class="plain">${wars}</ul>`:'<p class="kvline muted">Hiện chưa có cuộc chiến nào.</p>'}
   <p class="kvline" style="margin-top:8px"><b>Căng thẳng giữa các nước</b></p>
   <div class="tens">${tens.map(x=>`<div class="tenrow ${x.rel?'rel':''}"><span>${esc(pairName63(x.i))}${x.rel?' ★':''}</span><span class="tbar"><i style="width:${Math.round(x.t)}%" class="ph${x.ph}"></i></span><span class="muted">${w_label(x.t)}</span></div>`).join('')}</div>
   ${window.BN_CT?window.BN_CT.cuongVuc():''}
   <p class="kvline" style="margin-top:8px"><b>Thiên tai</b></p>${dis?`<ul class="plain">${dis}</ul>`:'<p class="kvline muted">Trời yên biển lặng.</p>'}
   <p class="kvline" style="margin-top:8px"><b>Tin truyền tới</b></p>${W.news.length?`<ul class="plain">${W.news.slice(0,8).map(n=>`<li class="${n.rel?'':'muted'}"><small>${dateStr(n.t)}</small> ${esc(n.m)}</li>`).join('')}</ul>`:'<p class="kvline muted">Chưa có tin gì.</p>'}`}
function w_gift(id){const S=X.S;
  const c=w_clan(S.loc.p,id),hd=head();if(!c||!hd)return;c.gifts=c.gifts||[];
  giftPopup({title:`Biếu quà ${cname(c)}`,who:cname(c),norm:giftNorm(c.fame,c.wealth),gifts:c.gifts,tr:c.head.tr,rel:c.rel,big:c.fame>=110||c.wealth>=70,
    intro:`${esc(cnameU(c))} ${c.fame>=150?'là danh gia':c.fame>=70?'có tiếng':'là nhà thường dân'}, ${w_wealthTxt(c.wealth)}.${c.job===w_ourKind()?' Họ cùng nghề nên lòng người khó đoán.':''}`,
    apply:(d,t)=>{if(c.job===w_ourKind())d+=R(-2,1);
      /* nhà nhỏ biếu quà đến mấy cũng chỉ lên tới mức quen biết với nhà lớn */
      const cap=(c.fame>=110&&S.fame<c.fame/4)?45:100;if(d>0&&c.rel+d>cap)d=Math.max(0,cap-c.rel);
      c.rel=clamp(c.rel+d,-100,100);c.last=S.t;if(c.fame>=110&&d>=5)cf(0.6,'Kết thân với danh gia')}})}
function w_peace(id){const S=X.S;
  const c=w_clan(S.loc.p,id),hd=head();if(!c||!hd)return;
  const cost=mm(2+c.fame/60);
  choicePopup(hd,'Láng giềng',`Hòa giải với ${cname(c)}`,`Hai họ đang có hiềm khích. Gia chủ ${esc(c.head.given)} ${c.head.tr==='hẹp hòi'||c.head.tr==='ngạo mạn'?'tính khí khó chiều':'tuy còn giận nhưng chịu nghe'}.`,[
    {l:`Mang lễ sang tận nhà nhận lỗi (${money(cost)})`,c:()=>S.money>=cost,r:[{eq:1,khau:0.4},45+(c.head.tr==='nhân hậu'||c.head.tr==='phóng khoáng'?20:0)-(c.head.tr==='hẹp hòi'||c.head.tr==='ngạo mạn'?20:0)],
      y:x=>{S.money-=cost;c.rel=clamp(c.rel+30,-100,100);c.feud=0;return `${esc(cnameU(c))} niềm nở tiếp, hai bên bắt tay làm hòa.`+fx(x,{fame:2,tam:4})},n:x=>{S.money-=Math.round(cost*0.5);c.rel=clamp(c.rel-6,-100,100);return `Bị tiếp lạnh nhạt, lễ vật bị trả về.`+fx(x,{tam:-4})}},
    {l:'Nhờ người có tiếng trong vùng đứng ra',c:()=>S.fame>=40,r:[{eq:0.6,fame:0.5},50],y:x=>{c.rel=clamp(c.rel+22,-100,100);c.feud=0;return 'Có người lớn tuổi đứng ra hòa giải, hai họ nguôi giận.'},n:x=>{c.rel=clamp(c.rel-3,-100,100);return 'Người làm chứng chưa đủ trọng, chuyện đâu vẫn còn đó.'}},
    {l:'Thôi, để thời gian trôi',f:x=>''}]);
}
function w_kidProfile(c,k){
  if(!k.jb){const st=clamp(Math.log2(1+c.fame)*1.15+c.wealth/40-0.6,0,9);k.st=Math.round(st*10)/10;
    k.jb=(k.g==='nữ'&&chance(0.5))?'noi':(NPCJ63[c.job]||'nong');k.jl=npcLv(k.jb,k.st,false)}
  return k}
function w_wed(id){const S=X.S;
  const c=w_clan(S.loc.p,id),hd=head();if(!c||!hd)return;
  const ours=alive().filter(p=>inClan(p)&&!p.spouse&&age(p)>=16&&age(p)<=34&&!p.inLaw&&!(p.left));
  const opts=[];
  ours.slice(0,6).forEach(m=>c.kids.filter(k=>k.g!==m.g&&k.age>=16&&k.age<=32&&Math.abs(k.age-age(m))<=8).slice(0,2).forEach(k=>{
    w_kidProfile(c,k);
    const base=0.3+c.rel/220+(S.fame-c.fame)/500+(c.head.tr==='tham lam'?0.05:0)+(m.mi-50)/300;const pr=clamp(base,0.08,0.9);
    opts.push({l:`${m.given}, ${age(m)} tuổi, hỏi cưới ${k.g==='nữ'?'cô':'cậu'} ${k.given} ${cname(c)}, ${k.age} tuổi, ${w_kidJob(k)}`,s:`Nhà ${CJOB63[c.job]}, danh vọng ${Math.round(c.fame)}. Nhà ${k.g==='nữ'?'gái':'trai'} ${pr>=0.75?'nhiều khả năng nhận lời':pr>=0.5?'có thể nhận lời':pr>=0.3?'còn đắn đo':'khó nhận lời'}`,
      f:x=>{ if(!chance(pr)){c.rel=clamp(c.rel-5,-100,100);return `${esc(cnameU(c))} từ chối khéo, bảo "hai nhà chưa xứng đôi".`+fx(m,{tam:-6})}
        const sp=mkMatch(m,{g:k.g,surname:c.sur,given:k.given,age:k.age,hh:m.hh,stand:k.st,job:k.jb,lv:k.jl});sp.npcClan=c.id;sp.needT=tierIdx();
        c.kids=c.kids.filter(z=>z!==k);c.mar++;c.rel=clamp(c.rel+18,-100,100);
        if(m.g==='nam'){const p2=mkSpouse(m,false,sp);return `Hai nhà thông gia. ${esc(p2.given)} về làm dâu họ ${esc(S.surname)}.`+fx(m,{fame:2})}
        sp.fee=mm(30+c.fame/4);marryOut(m,sp);return `Hai nhà thông gia. ${esc(m.given)} xuất giá về ${esc(cname(c))}.`}}) }));
  if(!ours.length||!opts.length){infoPopup(hd,'Láng giềng',`Chưa có ai để mai mối`,`Nhà mình không có người đến tuổi lập gia thất, hoặc ${esc(cname(c))} không có người hợp tuổi.`);return}
  opts.push({l:'Thôi',f:()=>''});choicePopup(hd,'Thông gia',`Hỏi thông gia ${cname(c)}`,`Nhà có tiếng thì cưới gả cũng thành chuyện đáng bàn.`,opts)}
function w63Month(mo){const EVMAP=X.EVMAP;const S=X.S;
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
Object.assign(X.fn,{w_cause,w_new,w_startProv,w_setLoc,w_shock,w_mo,w_front,w_closed,w_warRisk,w_warName,w_startWar,w_endWar,w_tension,w_dis,w_home,w_jobKind,w_houseSur,w_markHouses,w_genClan,w_clans,w_clansYear,w_ourKind,w_khoFee,w_priceTable,w_provPanel,w_situation,w_gift,w_peace,w_kidProfile,w_wed,w63Month});
});
