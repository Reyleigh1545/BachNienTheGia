/* Bách Niên Thế Gia · engine-xb.js: gói ENGX tách từ engine.js bằng tools/xmove.js (7.0.0-d.1.5.6). Thân hàm giữ nguyên; engine.js còn dòng chuyển ENGX.fn.<tên>. Hàm gán vào biến let cấp cao KHÔNG nằm ở đây. Nạp sau events-lv.js, trước engine.js. */
window.ENGX=window.ENGX||[];
window.ENGX.push(X=>{
const {ARC,AUTO_K,AXKW,BIZ,BIZX,BM_NEED,CRIME_N,DUY,D_ok,ENGX,FACK,FM_CAP,GPK,HABITS,HH,HOUSE_DEF,HOUSE_TIER,I,ID_N,ID_P,JOBMETA,JOBS,KIEN,KPOW,KRANK,LAB_RULES,LED_CAP,M,MEM_CAP,MGR_QL,NEAR_MO,P,PROV,QL_NEED,QT,R,REGIONS,ROLES,ROLE_ST,RULES,SEATS,SN,SURN,TIERS,TRAITS,U2,VBR,WPOL,age,ageEff,alive,arcSt,avatarSVG,axLabels,axv,bar,baseFollow,becomeChu,bizHH,bizOf,bizOwnName,capOf,cardInfo,catchUpYoung,cf,chance,choicePopup,clamp,clanQuan,clanSucc,closeModal,confirmBox,court,courtTick,die,dynEns,enqueue,ensurePersona,esc,expandBiz,expandWhy,expressed,facN,famProvs,finishGame,fmt,fundAdd,fundGet,fx,gameOver,gateCap,gbItems,growStat,hardCap,hdef,head,hinfo,hirePopup,hnear,home,house,houseAlly,houseName,houseRelTxt,inClan,inKinh,inMain,infoPopup,innateGenes,innateMap,interviewPopup,isHead,isVice,jobFit,jobM,jobName,kPow,kidsOf,kin,leaveSeat,letterAdd,letterLvEv,log,mFind,mainHH,married,meets,memP,memSet,meta,metaFlag,mgrWhy,mkCfg,mkGiven,mkStaff,mm,modalOpen,money,month,nameOf,newBranch,nextPopup,npCard,npGet,obey,offV,openModal,optOk,optTook,outsiderName,ownPerson,passion,pathPopup,pick,pickWho,popOpt,prob,projAc,projCap,projCost,projDef,projK,projLed,projN,projOf,projOn,provN,qlOf,qtH,raiseReq,relBase,relJob,relNames,relOf,relW,render,rinfo,routes,rule,ruleG,ruleHit,runOpt,save,season,seatOfC,sellBiz,setJob,setLabel,skv,spouseOf,stAge,stHealthTxt,staffEff,staffTick,stt,termYears,thanHas,tierIdx,tierNow,tsum,vAdd,vWPick,viceAlert,viceWork,vilFighters,vilQuan,vilReady,vioOf,vlv,w_clans,w_closed,w_genClan,w_mo,w_news,wageFor,wildAcres,window,wishOf,working,yrs}=X.EC;
function famCard(){const d=dynEns();const f=d.fam;if(!f)return '';
  const L=[f.hau,f.thai].concat(f.phi,f.tu,f.cong,f.vuong,f.qc).filter(p=>p&&p.dead==null&&p.met);if(!L.length)return '';
  const rn={hau:'Hoàng hậu',thai:'Thái hậu',phi:'Phi',tu:'Hoàng tử',cong:'Công chúa',vuong:'Thân vương',qc:'Quốc công'};
  return `<section class="card"><span class="eyebrow">Người quen trong hoàng tộc</span><h2>Những người nhà mình đã gặp</h2><ul class="plain">${L.map(p=>`<li><b>${esc(rn[p.role]||'')} ${esc((p.sur&&['hau','thai','phi','qc'].includes(p.role)?p.sur+' ':'')+p.n)}</b> <small class="muted">${p.age} tuổi${p.land&&PROV[p.land]?', đất phong '+esc(provN(p.land)):''}${p.st==='heir'?', thái tử':''} · ${relW(p.rel||0)}</small></li>`).join('')}</ul></section>`}
function famNew(role,age,o){const S=X.S;const f=S.dyn.fam;f.seq=(f.seq||0)+1;return Object.assign({id:'f'+f.seq,n:mkGiven(role==='cong'||role==='phi'||role==='hau'?'nữ':'nam'),age,role,met:0,rel:0,dead:null},o||{})}
function famEnsure(d){d=d||dynEns();if(d.fam)return d.fam;const k=d.k;const f=d.fam={seq:0,hau:null,thai:null,phi:[],tu:[],cong:[],vuong:[],qc:[]};
  f.hau=famNew('hau',clamp(k.age-R(0,4),17,60),{sur:pick(SURN),f:pick(FACK)});
  for(let i=R(1,3);i>0;i--)f.phi.push(famNew('phi',clamp(k.age-R(0,9),17,60),{sur:pick(SURN),f:pick(FACK)}));
  const nk=clamp(Math.floor((k.age-20)/3),0,6);
  for(let i=0;i<nk;i++){const a=R(0,Math.max(1,k.age-19));const mo=chance(0.5)?f.hau.id:pick(f.phi).id;
    if(chance(0.6))f.tu.push(famNew('tu',a,{m:mo,tai:R(30,90),duc:R(30,90),st:'tu'}));else f.cong.push(famNew('cong',a,{m:mo,wed:null}))}
  const P=famProvs();for(let i=R(1,3);i>0;i--)f.vuong.push(famNew('vuong',Math.max(16,k.age+R(-6,10)),{land:P.length?pick(P):null,td:pick(['trung','trung','nghi']),tai:R(30,90),duc:R(30,90),f:pick(FACK),st:'vuong'}));
  f.qc.push(famNew('qc',R(38,46),{n:'Phạm Nhật Vượng',sur:'Phạm',td:'trung',tai:R(55,80),duc:R(55,80)}));
  for(let i=R(1,2);i>0;i--)f.qc.push(famNew('qc',R(40,66),{n:mkGiven('nam'),sur:pick(SURN),td:pick(['trung','nghi']),tai:R(35,85),duc:R(35,85)}));
  return f}
function famPerson(id){const S=X.S;const f=S.dyn&&S.dyn.fam;if(!f)return null;return [f.hau,f.thai].concat(f.phi,f.tu,f.cong,f.vuong,f.qc).find(x=>x&&x.id===id)||null}
function famHeir(d){const f=famEnsure(d);const L=f.tu.filter(p=>p.dead==null&&p.st==='tu'&&p.age>=8);if(!L.length)return null;
  return L.sort((a,b)=>((b.tai+b.duc)/2+(b.m===f.hau.id?15:0)+b.age*0.3)-((a.tai+a.duc)/2+(a.m===f.hau.id?15:0)+a.age*0.3))[0]}
function famYear(d){const DRY=X.DRY;const EVMAP=X.EVMAP;const S=X.S;const f=famEnsure(d);const k=d.k;
  [f.hau,f.thai].concat(f.phi,f.tu,f.cong,f.vuong,f.qc).forEach(p=>{if(!p||p.dead!=null)return;p.age++;
    const pd=0.001+Math.max(0,p.age-55)*0.004+Math.max(0,p.age-70)*0.02;if(chance(pd)){p.dead=S.t;if(p.role==='tu'&&d.heir&&d.heir.id===p.id){d.heir={set:false,n:mkGiven('nam'),age:0};log(`Thái tử ${p.n} qua đời. Ngôi thái tử bỏ trống.`,'hi')}}});
  f.phi=f.phi.filter(p=>p.dead==null);f.tu=f.tu.filter(p=>p.dead==null);f.vuong=f.vuong.filter(p=>p.dead==null);f.qc=f.qc.filter(p=>p.dead==null);f.cong=f.cong.filter(p=>p.dead==null);
  if(f.hau&&f.hau.dead!=null){f.hau=f.phi.length?f.phi.shift():famNew('hau',R(24,40),{sur:pick(SURN),f:pick(FACK)});f.hau.role='hau'}
  if(f.thai&&f.thai.dead!=null)f.thai=null;
  /* sinh con: vua còn trẻ thì hậu và phi sinh thêm */
  if(k.age>=18&&k.age<58&&f.hau.age<44&&chance(0.22)){const mo=chance(0.55)?f.hau:pick(f.phi.length?f.phi:[f.hau]);if(mo.age<44){
    if(chance(0.55))f.tu.push(famNew('tu',0,{m:mo.id,tai:R(25,92),duc:R(25,92),st:'tu'}));else f.cong.push(famNew('cong',0,{m:mo.id,wed:null}))}}
  if(k.age>=26&&k.age<52&&f.phi.length<4&&chance(0.08))f.phi.push(famNew('phi',R(17,24),{sur:pick(SURN),f:pick(FACK)}));
  /* hoàng tử lớn thì được phong vương, ra đất phong */
  f.tu.forEach(p=>{if(p.st==='tu'&&p.age>=20&&!(d.cr&&(d.cr.a.id===p.id||d.cr.b.id===p.id))&&chance(0.25)){p.role='vuong';p.st='vuong';p.land=(famProvs().length?pick(famProvs()):null);p.td='trung';p.f=pick(FACK);f.vuong.push(p)}});
  f.tu=f.tu.filter(p=>p.role==='tu');
  /* công chúa lớn thì gả (trừ người nhà mình đang theo đuổi) */
  f.cong.forEach(p=>{if(!p.wed&&!p.hold&&p.age>=17&&chance(0.3)){p.wed=pick(SURN)+' '+mkGiven('nam')}});
  f.cong.forEach(p=>{if(p.hold&&S.t-(p.holdT||0)>48)p.hold=null});
  /* v6.7.0-d5: dịp gặp hoàng tộc và quan thật đến theo lịch hằng năm, không chờ bốc ngẫu nhiên giữa hàng nghìn sự kiện */
  if(head()&&!DRY){alive().filter(p=>inClan(p)&&p.job==='quan'&&p.seat&&!p.away).forEach(p=>{
    if((p.flags.hvT||0)<=S.t&&inKinh(p)&&p.lv>=4&&chance(0.3)&&EVMAP.hv_yen_cung){p.flags.hvT=S.t+60;enqueue('ev',p.id,{ev:'hv_yen_cung',data:{}})}
    else if((p.flags.hvT||0)<=S.t&&inKinh(p)&&p.lv>=3&&chance(0.18)&&EVMAP.hv_dai_le){p.flags.hvT=S.t+60;enqueue('ev',p.id,{ev:'hv_dai_le',data:{}})}
    if(chance(0.3)){const id=pick(['tq_yen_thuong_quan','tq_xin_bao_lanh','tq_chen_ep','tq_tranh_cong','tq_ket_nghia']);if(EVMAP[id]&&(S.cool[id]||-1e9)<=S.t){S.cool[id]=S.t+24;enqueue('ev',p.id,{ev:id,data:{}})}}});
    if(chance(0.08)&&(S.hvTd||0)<=S.t&&EVMAP.hv_tuan_du){S.hvTd=S.t+48;enqueue('ev',S.head,{ev:'hv_tuan_du',data:{}})}if(chance(0.04)&&(S.hvQc||0)<=S.t&&EVMAP.hv_quoc_cong_que){S.hvQc=S.t+60;enqueue('ev',S.head,{ev:'hv_quoc_cong_que',data:{}})}}
  alive().forEach(p=>{if(p.flags&&p.flags.phoma&&inClan(p)){S.money-=mm(8);qtAdd(p,{fav:3});cf(1,'Phò mã')}}); /* phò mã: cung phụng công chúa, được thánh ân */
  const h=d.heir&&d.heir.id?famPerson(d.heir.id):null;if(h)d.heir.age=h.age;
  f.vuong.forEach(p=>{if(chance(0.04))p.td=p.td==='trung'?'nghi':pick(['trung','trung','nghi'])});
  return f}
function famReign(d,succ){const f=famEnsure(d);if(succ){f.tu=f.tu.filter(p=>p.id!==succ.id);f.vuong=f.vuong.filter(p=>p.id!==succ.id)}
  f.thai=f.hau&&f.hau.dead==null?f.hau:null;if(f.thai)f.thai.role='thai';
  f.hau=famNew('hau',clamp((succ?succ.age:25)-R(0,4),17,45),{sur:pick(SURN),f:pick(FACK)});f.phi=[];for(let i=R(0,2);i>0;i--)f.phi.push(famNew('phi',R(17,26),{sur:pick(SURN),f:pick(FACK)}));
  const P=famProvs();f.tu.forEach(p=>{if(p.age>=17){p.role='vuong';p.st='vuong';p.land=P.length?pick(P):null;p.td='trung';p.f=pick(FACK);f.vuong.push(p)}});f.tu=f.tu.filter(p=>p.role==='tu');
  f.tu.forEach(p=>{p.st='tu';p.m=null});if(d.heir)d.heir={set:false,n:mkGiven('nam'),age:0}}
function famOf(c){const S=X.S;
  const sp=spouseOf(c);const ok=p=>baseFollow(p)&&(!p.away||(p.away.type==='follow'&&p.away.of===c.id));
  const sps=sp&&ok(sp)&&age(sp)>=16?sp:null;
  const kids=S.people.filter(p=>p.id!==c.id&&inClan(p)&&age(p)<16&&(!p.away||(p.away.type==='follow'&&p.away.of===c.id))&&(p.parents.includes(c.id)||(sp&&p.parents.includes(sp.id))));
  return {sp:sps,kids};
}
function fameWhy(){const S=X.S;const row=(o,lb)=>{const e=Object.entries(o||{}).filter(([k,v])=>Math.abs(v)>=0.5).sort((x,y)=>x[1]-y[1]);if(!e.length)return '';const t=e.reduce((s,[k,v])=>s+v,0);return `<small class="muted">${lb}: ${t>=0?'+':''}${Math.round(t)}</small><br>`+e.map(([k,v])=>`<small>${esc(k)}: <b class="num ${v<0?'down':'up'}">${v>=0?'+':''}${Math.round(v)}</b></small>`).join('<br>')+'<br>'};return row(S.fw,'Năm nay')+row(S.fwPrev,'Năm ngoái')||'<small class="muted">Chưa có biến động</small>'}
function famMemAdd(k,o){const S=X.S;S.fm=S.fm||[];o=o||{};const cf=mkCfg(k);const ex=S.fm.find(x=>x.k===k&&x.r===(o.r==null?null:o.r));
  if(ex){ex.w=Math.max(ex.w,o.w||cf.w||60);ex.t=S.t;ex.n=(ex.n||1)+1;return ex}
  const m={k,t:S.t,w:o.w||cf.w||60,n:1,r:o.r==null?null:o.r};if(o.keep||cf.keep)m.keep=1;if(o.l)m.l=o.l;S.fm.push(m);
  if(S.fm.length>FM_CAP){let ix=-1,lo=1e9;S.fm.forEach((x,i)=>{const s=x.keep?x.w+1000:x.w;if(s<lo){lo=s;ix=i}});if(ix>=0)S.fm.splice(ix,1)}return m}
function famHas(k,mw){const S=X.S;return (S.fm||[]).some(x=>x.k===k&&x.w>=(mw||1))}
function projWhy(P){const o=projOf(P.id);if(o&&o.st==='xay')return 'Đang xây';if(o&&(o.st==='xong'))return 'Đã có';
  if(tierNow()<P.tier)return `Cần gia thế ${TIERS[P.tier][0].toLowerCase()} trở lên`;
  {const need=projAc(P);if(need>0&&wildAcres()<need)return `Cần ${need} mẫu đất trống (đang có ${fmt(wildAcres())}, xem trang Đất phong)`}
  if(P.need==='teacher'&&!alive().some(p=>inClan(p)&&age(p)>=18&&(p.job==='su'||p.tri>=70)))return 'Cần có người làm thầy';
  return ''}
function projStart(id){const S=X.S;const P=projDef(id);if(!P||projWhy(P))return false;const cost=projCost(P);if(S.money<cost)return false;
  S.money-=cost;S.proj=S.proj||[];const o=projOf(id);const ledOld=o&&o.led;
  if(o){o.st='xay';o.t1=S.t+Math.ceil(P.mo/2)}else S.proj.push({id,t0:S.t,t1:S.t+P.mo,st:P.mo?'xay':'xong',n:P.sc?P.sc.n0:undefined});
  projLed(id,'out',cost);
  log(P.mo?`Khởi công ${P.n.toLowerCase()}, dự kiến ${P.mo} tháng.`:`${P.n}: đã làm xong.`,'gd');
  if(!P.mo)projFinish(P);return true}
function projFinish(P){const DRY=X.DRY;const EVMAP=X.EVMAP;const S=X.S;const id=P.id;
  if(id==='quyennap'){memSet('honor',9999);cf(3,'Quyên nạp hàm Giám sinh')}
  if(['nghiathuc','chuamieu'].includes(id))cf(1,P.n);
  if(!DRY&&EVMAP.dn_xong&&head())enqueue('ev',S.head,{ev:'dn_xong',data:{p:id}})}
function projSize(id,d){const S=X.S;const p=projOf(id),P=projDef(id);if(!p||!P||!P.sc||p.st!=='xong')return false;const s=P.sc;const n0=p.n||s.n0;const nn=clamp(n0+d*s.step,s.min,s.max);if(nn===n0)return false;
  if(d>0){const c=Math.round(mm(P.v)*(nn-n0)/s.n0);if(S.money<c)return false;if(projAc(P,nn)-projAc(P,n0)>wildAcres())return false;S.money-=c}
  p.n=nn;log(`${P.n}: nay có ${nn} ${s.u}.`,'gd');return true}
function projMonth(){const S=X.S;(S.proj||[]).forEach(p=>{const P=projDef(p.id);if(!P)return;
    if(p.st==='xong'&&P.up>0)projLed(p.id,'out',mm(P.up)*projK(p,P));
    if(p.st==='xay'&&S.t>=p.t1){p.st='xong';log(`Xong ${P.n.toLowerCase()}.`,'gd');projFinish(P)}
    else if(p.st==='xong'&&P.up>0&&S.money<0&&chance(0.03)){p.st='hu';log(`${P.n} xuống cấp vì không đủ tiền duy trì. Muốn dùng lại phải tu sửa.`,'hi')}})}
function projYear(){const EVMAP=X.EVMAP;const S=X.S;if(!S.proj||!S.proj.length||!head())return;const on=projOn;
  if(on('nghiathuc')){cf(3,'Nghĩa thục');if(chance(0.3)&&EVMAP.dn_nghia_thuc_tro)enqueue('ev',S.head,{ev:'dn_nghia_thuc_tro'})}
  if(on('tangthu'))alive().filter(p=>inClan(p)&&age(p)<22).forEach(p=>addStat(p,'tri',0.4));
  if(on('khothoc')&&(S.disaster||S.epi||S.war)){cf(3+projN('khothoc'),'Mở kho phát chẩn');S.money-=mm(10)*projN('khothoc');log('Kho thóc của họ mở phát chẩn cho dân.','gd')}
  if(on('thuyenbuon')){const g=Math.round(mm(95)*(projN('thuyenbuon')/2)*(0.4+Math.random()*1.2));projLed('thuyenbuon','in',g); /* hòa vốn khoảng 7 năm */S.money+=g;log(`Đội thuyền buôn về, lãi ${money(g)}.`,'gd')}
  if(on('monkhach')){const n=projN('monkhach');alive().filter(p=>inClan(p)&&p.job==='quan'&&p.qt).forEach(p=>qtAdd(p,{risk:-Math.min(6,n*0.6)})); /* môn khách báo trước nguy cơ: quan trong họ ít bị tra hơn */
    if(EVMAP.mk_mach_nuoc&&chance(Math.min(0.7,0.2+n*0.02)))enqueue('ev',S.head,{ev:'mk_mach_nuoc'})} /* d9.6: mỗi năm tối đa một lần; càng đông môn khách thì khoản đầu tư và lãi càng lớn (xem mk_mach_nuoc), không ra nhiều lần hơn */
  if(on('monkhach')&&chance(Math.min(0.8,0.2+projN('monkhach')*0.04))&&EVMAP.dn_mon_khach_tin)enqueue('ev',S.head,{ev:'dn_mon_khach_tin'});
  if(on('chuamieu')){alive().forEach(p=>{addStat(p,'tam',2);if(p.suc<p.cap.suc)addStat(p,'suc',1)})}
  if(on('dinhkinh'))alive().filter(p=>inClan(p)&&p.job==='quan'&&p.lv>=3).forEach(p=>qtAdd(p,{fav:2}));
  if(on('giabinh')){alive().filter(p=>inClan(p)&&age(p)>=12&&age(p)<=30).forEach(p=>addStat(p,'vo',0.3));const P=projDef('giabinh'),n=projN('giabinh'),cap=projCap(P);if(n>cap&&chance(Math.min(0.9,0.15+(n-cap)/Math.max(20,cap)*0.5)))memSet('nghi_binh',60)}
  if(on('hocbong')&&chance(Math.min(0.7,projN('hocbong')*0.04))){S.monsinh=(S.monsinh||0)+1}}
function projTile(P){const S=X.S;const o=projOf(P.id);const st=o?o.st:'';const s=P.sc;const n=o&&s?(o.n||s.n0):0;
  const stT=st==='xay'?`Đang xây, còn ${Math.max(1,o.t1-S.t)} tháng`:st==='hu'?'Xuống cấp, cần tu sửa':st==='xong'?(P.up>0?`Đang duy trì · ${money(mm(P.up)*projK(o,P))}/tháng`:'Đã xong'):'Chưa làm';
  const cap=projCap(P);const warn=P.id==='giabinh'&&st==='xong'?(n>cap?'Đông quá sức nhà, triều đình bắt đầu nghi.':'Vừa sức nhà, triều đình không để ý.'):'';
  const sz=s&&st==='xong'?`<div style="display:flex;align-items:center;gap:6px;margin:6px 0"><button class="btn small" data-psz="${P.id}:-1" ${n<=s.min?'disabled':''}>−</button><b class="num">${n} ${s.u}</b><button class="btn small" data-psz="${P.id}:1" ${n>=s.max||S.money<Math.round(mm(P.v)*s.step/s.n0)?'disabled':''}>+ ${money(Math.round(mm(P.v)*s.step/s.n0))}</button></div>${cap?`<small class="muted">Sức nhà hiện nuôi được khoảng ${cap} người.</small>`:''}`:'';
  let act='';if(!o){const why=projWhy(P);const c=projCost(P);act=`<button class="btn" data-proj="${P.id}" ${why||S.money<c?'disabled':''}>Làm · ${money(c)}</button>${why?`<small class="muted"> ${esc(why)}</small>`:''}`}
  else if(st==='hu'){act=`<button class="btn" data-proj="${P.id}" ${S.money<projCost(P)?'disabled':''}>Tu sửa · ${money(projCost(P))}</button>`}
  const lg=o&&o.led&&(o.led.in>0||o.led.out>0)?(()=>{const net=o.led.in-o.led.out;return `<small class="${net>=0?'up':'down'}">Đã chi ${money(o.led.out)}${o.led.in>0?`, đã thu ${money(o.led.in)}`:''}${o.led.in>0?` · ${net>=0?'lãi':'lỗ'} ${money(Math.abs(net))}`:''}</small>`})():'';
  const stop=o&&(st==='xong'||st==='hu')&&P.up>0?`<button class="btn ghost small" data-pstop="${P.id}">Giải tán</button>`:'';
  return `<div style="border:1px solid var(--line);border-radius:8px;padding:10px;display:flex;flex-direction:column;gap:4px;${o?'':'opacity:.9'}"><div style="display:flex;justify-content:space-between;gap:6px"><b>${esc(P.n)}</b>${stop}</div><small class="muted">${esc(P.d)}</small><small class="${st==='hu'?'down':st==='xong'?'up':'muted'}">${stT}</small>${warn?`<small>${warn}</small>`:''}${lg}${sz}<div style="margin-top:auto;padding-top:6px">${act}</div></div>`}
function projCard(){if(tierNow()<2)return '';
  const all=(window.D.PROJ||[]).filter(P=>projOf(P.id)||tierNow()>=P.tier-1);
  const mine=all.filter(P=>projOf(P.id)),av=all.filter(P=>!projOf(P.id));
  const grid=a=>`<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:10px;margin-top:8px">${a.map(projTile).join('')}</div>`;
  return `<section class="card" style="grid-column:1/-1"><span class="eyebrow">Dự án gia nghiệp</span><h2>Việc lớn lo cho đời sau</h2>${mine.length?`<h3 style="margin:8px 0 0;font-size:13.5px">Đang có</h3>${grid(mine)}`:''}${av.length?`<details style="margin-top:12px"${mine.length?'':' open'}><summary style="cursor:pointer;font-size:13.5px;font-weight:600">Có thể làm (${av.length})</summary>${grid(av)}</details>`:''}${all.length?'':'<p class="muted">Chưa có dự án nào đủ điều kiện.</p>'}</section>`}
function houseFor(n){try{const L=houseRefs().filter(r=>{const d=HOUSE_DEF.find(x=>x.id===r.id);return d&&d.tier>=Math.max(2,(n.tier||0)-1)&&d.tier<=Math.min(6,(n.tier||0)+2)});return L.length?pick(L).id:null}catch(e){return null}}
function houseEnsure(st){const W=st.w;if(!W||W.houses)return;W.houses={};
  HOUSE_DEF.forEach(d=>{W.houses[d.id]={head:{given:d.given,age:d.age,tr:d.tr},kids:d.kids.map(k=>({id:'k'+(W.cid++),given:k[0],g:k[1],age:k[2]})),fame:d.fame,wealth:d.wealth,rel:0,last:-99,gen:0,gT:-99,lT:-99,end:(st.t||0)+12*termYears(d.age)}})}
function houseRel(id,dv){const RELTR=X.RELTR;const S=X.S;const h=house(id);if(!h)return 0;const b0=h.rel;h.rel=clamp(h.rel+dv,-100,100);h.last=S.t;if(RELTR&&h.rel!==b0){const d0=hdef(id);RELTR.push([d0?d0.sur+' Gia':'nhà ấy',h.rel-b0])}return h.rel}
function houseYear(){const S=X.S;
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
function houseRefs(){const S=X.S;
  const W=S.w;if(!W||!W.houses||!S.loc)return [];const here=S.loc.p;const out=[];
  const mo=p=>p===here?0:w_mo(here,p);
  HOUSE_DEF.forEach(d=>{const m0=mo(d.p);if(W.houses[d.id]&&m0<=NEAR_MO&&(d.p===here||!w_closed(d.p)))out.push({t:'H',id:d.id,p:d.p,at:d.p===here,mo:m0,key:'H'+d.id})});
  Object.keys(PROV).forEach(p=>{if(SEATS.includes(p))return;const m0=mo(p);if(m0>NEAR_MO||(p!==here&&w_closed(p)))return;
    w_clans(p).forEach(c=>{if(c.house)out.push({t:'C',id:c.id,p,at:p===here,mo:m0,key:'C'+c.id})})});
  return out}
function houseTick(mo){const EVENTS=X.EVENTS;const S=X.S;
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
function houseCard(){const S=X.S;
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
function bizSlots(b){const B=BIZ[b.type];const out=[];for(let i=0;i<=b.lv;i++)out.push(...B.lv[i][4]);return out}
function bizCalc(b){const S=X.S;
  const B=BIZ[b.type];const L=B.lv[b.lv];const slots=bizSlots(b);
  const used=new Set();let score=0;
  slots.forEach(r=>{const st=b.staff.find(s=>s.role===r&&!used.has(s.id));if(st){used.add(st.id);score+=Math.min(1.2,staffEff(st,r))}});
  const fill=slots.length?score/slots.length:1;
  const o=P(b.owner);const on=o&&inClan(o)&&!o.away;let ownerF=on?(0.5+o.m/150+(o[B.st]||50)/300+(o.tri-50)/400+tsum(o,'trade')+(skv(o,'ql')-30)/150)*viceWork(o)*ageEff(age(o)):0.4;
  /* v6.4.1.2: chủ giỏi (thông thạo nghề gốc và quản trị cao) thì trần doanh thu lên tới 1,6 lần; làm lớn thì nguyên liệu rẻ hơn */
  const oq=on?clamp(((o.m-50)/70+(skv(o,'ql')-35)/45)/2,0,1):0;const capF=1.3+0.3*oq;const nL=B.lv.length;
  if((b.own||'clan')==='clan')ownerF*=1+offV('quansu')/250;
  let mkF=1;if(b.type==='yquan'&&S.epi)mkF=1.6;if(b.type==='quantra'&&season()==='dong')mkF=0.85;if(S.war&&b.type==='tieucuc')mkF=1.3;if(S.war&&['ganhhat','quantra'].includes(b.type))mkF*=0.8;
  if(S.disaster)mkF*=0.85;
  const rev=L[2]*(0.25+0.75*fill)*ownerF*mkF*(0.85+((S.t*7+b.id.length)%30)/100)*(1+(b.bonus||0))*(rule('trongthuong')?1.08:1)*(rule('trongnong')?0.95:1)*(0.9+S.on/500);
  const rv=Math.min(rev,L[2]*capF)*1.104*(thanHas('thuongthanh')?1.08:1) /* v6.5.4 giảm 30% (0,7); d9.12 nâng lại 0,92; 24/11 chủ dự án trả lời câu 1: nâng cơ sở thêm 20% nữa (0,92 x 1,2 = 1,104) */*(b.type==='xuong'&&thanHas('thantuong')?1.1:1);
  const wages=b.staff.reduce((s,x)=>s+x.wage,0);const mat=rv*((BIZX[b.type]||{}).mat??0.25)*(1-0.4*(nL>1?b.lv/(nL-1):0));const rent=L[3];
  return {rev:Math.round(rv),wages,mat:Math.round(mat),rent,profit:Math.round(rv-wages-mat-rent),fill,ownerF,cap:Math.round(L[2]*capF)};
}
function bizMonth(){const S=X.S;
  let v=0;S.biz.forEach(b=>{staffTick(b);const c=bizCalc(b);b.last=c;v+=c.profit;
    b.staff.forEach(st=>{st.m=Math.min(120,st.m+(2+st.tl/12)/12);for(const t of [30,60,90])if(st.m>=t&&!st.ms.includes(t)){st.ms.push(t);raiseReq(b,st,t)}});
    autoFill(b);
    if(month()===12&&b.rq&&b.rq.length){const ow=P(b.owner);enqueue('raiseY',ow&&inClan(ow)&&!ow.away&&ow.job==='chu'?ow.id:S.head,{biz:b.id})}});
  return v;
}
function bizSkillWhy(p,type){const out=[];const j=relJob(p,type);
  if(!j)out.push('không làm nghề '+relNames(type));
  else if(!(type==='voquan'&&p.vo>=90)&&jobM(p,j)<BM_NEED)out.push(`thông thạo ${JOBS[j].n.toLowerCase()} ${Math.floor(jobM(p,j))}/${BM_NEED}`);
  if(qlOf(p)<QL_NEED)out.push(`quản trị ${Math.floor(qlOf(p))}/${QL_NEED}`);
  return out}
function bizFundAdd(b,v){const p=ownPerson(b);if(p&&p.dead==null){p.purse+=v;return}fundAdd(b.own&&!b.own.startsWith('p:')?b.own:'clan',v)}
function bizFundGet(b){const p=ownPerson(b);if(p&&p.dead==null)return p.purse;return fundGet(b.own&&!b.own.startsWith('p:')?b.own:'clan')}
function bizValue(b){const S=X.S;const B=BIZ[b.type];let v=0;for(let i=0;i<=b.lv;i++)v+=B.lv[i][1];const pr=b.last?b.last.profit:0;
  return Math.round(v*0.55*(S.war?0.75:1)*clamp(0.8+pr/Math.max(1,B.lv[b.lv][2])*0.8,0.6,1.3))}
function bizStaffInfo(b){
  const slots=bizSlots(b);const used=new Set();const empty=[];let filled=0;
  slots.forEach(r=>{const st=b.staff.find(s=>s.role===r&&!used.has(s.id));if(st){used.add(st.id);filled++}else empty.push(r)});
  return {slots,filled,empty,total:slots.length,sick:b.staff.filter(s=>s.sick>0).length,old:b.staff.filter(s=>stAge(s)>=60).length}}
function bizDetail(bid){const S=X.S;
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
   ${!o||!inClan(o)?(()=>{const cs=alive().filter(p=>inClan(p)&&p.hh===bizHH(b)&&age(p)>=16&&!p.biz&&!['quan','quan_ngu','nguy','vua','huu'].includes(p.job));
     return `<div class="field" style="margin-top:8px"><label>Giao cho người trông</label>${cs.length?`<select class="sel" data-owner><option value="">Chọn người</option>${cs.map(p=>{const w=mgrWhy(p,b);return `<option value="${p.id}"${w.length?' disabled':''}>${esc(nameOf(p))} · ${esc(jobName(p))} · quản trị ${Math.floor(qlOf(p))}${w.length?' · thiếu: '+w.join(', '):''}</option>`}).join('')}</select>`:`<p class="note">Trong ${bizHH(b)===mainHH()?'nhà chính':'chi này'} chưa có ai đủ sức trông coi (quản trị từ ${MGR_QL}).</p>`}<small class="muted">Người trông coi chỉ cần quản trị từ ${MGR_QL}, không cần cùng nghề; chỉ khi mở cơ sở mới cần đúng nghề ${esc(relNames(b.type))} và thông thạo từ ${BM_NEED}.</small></div>`})():''}
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
function qtOf(c){if(!c.qt)c.qt={f:null,loy:0,cor:0,crime:0,risk:0,fav:50,st:0,mon:0};return c.qt}
function qtLog(title,txt){const DRY=X.DRY;const S=X.S;if(DRY)return;ledAdd('qt',[],{title:String(title).slice(0,40)},{fam:true,m:false});(S.qtLog=S.qtLog||[]).push({t:S.t,title,txt});if(S.qtLog.length>150)S.qtLog.shift()}
function qtAdd(c,d){const q=qtOf(c);for(const k in d){if(k==='crime')q.crime=Math.max(q.crime,d.crime);else q[k]=clamp((q[k]||0)+d[k],0,100)}
  if(d.cor>0)q.crime=Math.max(q.crime,q.cor>=60?3:q.cor>=30?2:1)}
function qtJoin(c,k){const S=X.S;const q=qtOf(c);const old=q.f;q.f=k||null;q.loy=k?50:0;q.jt=S.t;
  if(k&&old!==k){qtH().fac[k]=(qtH().fac[k]||0)+1;qtLog(`Theo phe ${facN(k)}`,`${nameOf(c)} đứng về phe ${facN(k)}, dưới trướng ${court().f[k].lead}.`)}
  else if(!k&&old)qtLog(`Rời phe ${facN(old)}`,`${nameOf(c)} cắt đứt quan hệ với phe ${facN(old)}.`)}
function qtLevel(c){const S=X.S;const q=qtOf(c);const F=q.f?court().f[q.f]:null;let L=q.crime;if(F&&S.t-F.fall<36)L=Math.max(L,Math.min(4,2+Math.floor(q.loy/45)));return L}
function qtDismiss(c,why){const S=X.S;if(c.seat||c.pst)leaveSeat(c);setJob(c,'none');c.flags.noExam=S.t+QT.noOffice;c.flags.noOffice=S.t+QT.noOffice;const q=qtOf(c);q.st=0;q.f=null;q.risk=0;q.cor=Math.round(q.cor/2);
  log(`${nameOf(c)} bị bãi quan${why?' vì '+why:''}.`,'hi')}
function qtConfiscate(pct){const S=X.S;const v=Math.round(Math.max(0,S.money)*pct);S.money-=v;const l=Math.round(S.farm.own*pct*0.75);S.farm.own-=l;return `Triều đình tịch biên ${money(v)}${l?` và ${l} mẫu ruộng`:''}.`}
function qtSentence(c,L,why){const S=X.S;L=clamp(Math.round(L),0,5);const q=qtOf(c);const nm=esc(c.given);let t='';
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
function qtTick(){const S=X.S;const C=court();const nq=clanQuan();const H=qtH();
  alive().filter(p=>inClan(p)&&p.job==='quan').forEach(p=>{const q=qtOf(p);const F=q.f?C.f[q.f]:null;
    const base=q.cor*0.35+q.crime*6+(F&&S.t-F.fall<36?25:0)+(F&&F.pow<20?6:0)+Math.max(0,nq-3)*4+(H.trudi&&S.t-H.trudi<1200?8:0)-(q.fav-50)*0.25-(rule('camdang')&&!q.f?5:0);
    q.risk=clamp(q.risk*0.55+Math.max(0,base),0,100);q.cor=Math.max(0,q.cor-1);
    if(q.st===0&&q.risk>=QT.giamsat&&chance(q.risk/160)){q.st=1;enqueue('ev',p.id,{ev:'qt_giam_sat'})}
    else if(q.st===1&&q.risk>=QT.danhac&&chance(q.risk/140)){q.st=2;enqueue('ev',p.id,{ev:'qt_dan_hac'})}
    else if(q.st===1&&q.risk<25)q.st=0});
  /* bè đảng: nhà nhiều quan thì có lời đồn, lờ đi thì bị hặc tội kết bè */
  if(nq>=4&&!((S.bdT||0)>S.t)&&chance(0.15+0.05*(nq-4))){S.bdT=S.t+30;const L=alive().filter(p=>inClan(p)&&p.job==='quan');const p=pick(L);
    if(p)enqueue('ev',p.id,{ev:(nq>=6||(S.bdWarn||0)>=1)?'qt_hac_ket_be':'qt_be_dang_don'})}}
function qtMonth(mo){const S=X.S;if(!head())return;
  alive().forEach(p=>{if(p.away&&p.away.type==='luuday'&&S.t>=p.away.until){p.away=null;log(`${nameOf(p)} mãn hạn lưu đày, trở về quê.`,'gd');addStat(p,'tam',10)}});
  if(S.tdq&&S.t>=S.tdq.t&&!S.tdq.q){const w=P(S.tdq.who);if(!w||w.dead!=null||!inClan(w)){S.tdq=null}else{S.tdq.q=1;enqueue('ev',S.head,{ev:'qt_chieu_tru_di',data:{who:w.id}})}}
  if(mo===3)qtTick();if(mo===6&&(S.court||alive().some(p=>inClan(p)&&p.job==='quan')))courtTick()}
function autoFill(b){const S=X.S;if(!b.autoHire||b.lv<2)return;const o=P(b.owner);if(!o||!inClan(o)||o.away)return;
  bizStaffInfo(b).empty.forEach(r=>{const st=mkStaff(r);st.role=r;st.wage=wageFor(st,b,r);st.since=S.t;b.staff.push(st);log(`${nameOf(o)} tự tuyển ${st.n} làm ${ROLES[r].n.toLowerCase()} ở ${BIZ[b.type].lv[b.lv][0].toLowerCase()}.`)})}
function autoChoice(c,ttl,opts,d){const S=X.S;const ok=(opts||[]).filter(o=>{try{return !o.go&&(!o.c||o.c(c,d))}catch(e){return false}});if(!ok.length)return false;
  const probs=ok.map(o=>o.r?prob(c,o.r[0],o.r[1]):null);const i=autoPick(c,ok,probs);popOpt(c,ok[i]);const r=runOpt(c,ok[i],probs[i],d);if(S.over)return true;
  log(`${nameOf(c)} · ${ttl} (tự quyết): ${r}`);letterAdd(c,`<b>${esc(ttl)}</b>: ${esc(c.given)} chọn "${esc(ok[i].l)}". ${r}`,letterLvEv(ttl,r));stt('auto');setTimeout(nextPopup,0);return true}
function autoAx(l){if(!l)return null;const d={};let any=false;for(const [re,o] of AXKW)if(re.test(l)){for(const k in o){d[k]=(d[k]||0)+o[k]*0.6}any=true}return any?d:null}
function autoSplit(){const S=X.S;const h=head();if(!h)return 'Không có ai để chia.';const main=mainHH();
  const cand=alive().filter(p=>inClan(p)&&p.hh===main&&!isHead(p)&&age(p)>=22&&married(p)&&!p.away&&p.id!==h.spouse&&!h.parents.includes(p.id));
  if(!cand.length)return 'Chưa có cặp vợ chồng nào đủ lớn để ra ở riêng.';
  const grp=p=>{const s=spouseOf(p);const ids=new Set([p.id]);if(s&&inClan(s))ids.add(s.id);const add=x=>kidsOf(x).forEach(k=>{if(k.dead==null&&inClan(k)&&k.hh===main&&!ids.has(k.id)){ids.add(k.id);add(k)}});add(p);if(s)add(s);return ids};
  let best=null,bs=-1;cand.forEach(p=>{const g=grp(p);if(g.size>bs){bs=g.size;best=[p,g]}});
  const [p,g]=best;const seed=Math.max(mm(60),Math.round(Math.max(0,S.money)*0.01));if(S.money<seed)return 'Quỹ không đủ vốn để lập chi mới.';
  S.money-=seed;const id=newBranch(p,1,seed);g.forEach(i=>{const x=P(i);if(x)x.hh=id});
  log(`${nameOf(p)} cùng ${g.size-1} người ra ở riêng, lập chi mới.`,'gd');
  return `${esc(p.given)} cùng ${g.size-1} người trong nhà ra ở riêng, lập chi mới "${esc(S.hh[id].name)}". Quỹ cấp vốn ${money(seed)}.`}
function autoPick(c,ok,probs){const S=X.S;ensurePersona(c);const uy=S.uy??50;const ran=S.t-(c.flags.ran||-999)<36?1.6:1;
  const sc=ok.map((o,i)=>{let s=0;const ax=o.ax||autoAx(o.l)||{};
    for(const k in ax)if(c.sub&&c.sub[k]!=null)s+=ax[k]*(axv(c,k)-50)/25;   /* hợp tính thì chọn */
    if(ENGX.fn.goalAff)s+=ENGX.fn.goalAff(c,o.l); /* d9.13: mục tiêu ẩn của người trong gia tộc nghiêng lựa chọn tự quyết */
    if(probs[i]!=null){const bold=axv(c,'gan')/100;s+=(probs[i]-0.5)*(AUTO_K.bold-2*bold)+(o.yy?0.25*bold:0)}  /* nhát thì chọn chắc ăn, gan thì dám liều */
    const v=vioOf(o);if(v)s-=AUTO_K.vio[ruleG(v)]*(0.4+uy/100)*(0.3+obey(c)/100)*ran*(obey(c)>=70?3:1); /* v6.5.4: người nghe lời gần như không phạm gia quy */   /* sợ gia pháp thì né */
    return s+Math.random()*0.8});
  let bi=0;sc.forEach((s,i)=>{if(s>sc[bi])bi=i});return bi}
function autoEv(c,ev,d,ttl,txt,opts){const S=X.S;
  const ok=(opts||[]).filter(o=>{try{return !o.go&&(!o.c||o.c(c,d))&&optOk(c,o)}catch(e){return false}});
  if(!ok.length)return false;
  const probs=ok.map(o=>o.r?prob(c,o.r[0],o.r[1]):null);const i=autoPick(c,ok,probs);const o=ok[i];popOpt(c,o);optTook(c,o);
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
function jobInc(c){
  const J=JOBS[c.job];const L=J.lv[Math.min(c.lv,J.lv.length-1)];
  return J.inc*(L.mul||1);
}
function jobMatch(e,c){
  if(!e.job)return true;
  return e.job.some(j=>j===c.job||(j.startsWith('biz:')&&c.job==='chu'&&bizOf(c)&&bizOf(c).type===j.slice(4)));
}
function jobPopup(c,first){return jobChoice(c,first)}
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
function jobDig(id,lv){const M=JOBMETA[id];if(!M||M.dig==null)return 2;const d=M.dig;return Array.isArray(d)?d[Math.min(lv||0,d.length-1)]:d}
function jobGrow(c){if(age(c)<16||!working(c))return;if(c.away&&!['army'].includes(c.away.type))return;const M=JOBMETA[c.job];if(!M||!M.g)return;
  const f=(0.45+Math.min(120,c.m)/90)*0.6;for(const k in M.g)growStat(c,k,M.g[k]*f)}
function gbGrant(m,endId){const I=gbItems();const pool=Object.keys(I).filter(k=>I[k].end===endId);if(!pool.length)return null;m.gb=m.gb||{};const fresh=pool.filter(k=>!m.gb[k]);if(!fresh.length)m.gbPts=(m.gbPts||0)+1; /* đủ món của kết này: cộng điểm gia bảo thay cho món mới */
  const k=pick(fresh.length?fresh:pool);m.gb[k]=(m.gb[k]||0)+1;return Object.assign({id:k,fresh:fresh.length>0},I[k])}
function gbOwned(){const m=meta();const I=gbItems();return Object.keys(m.gb||{}).filter(k=>I[k]).map(k=>Object.assign({id:k},I[k]))}
function gbSlots(){const G0=window.D.GIABAO;const m=meta();const base=G0&&G0.slots?G0.slots(Object.keys(m.end||{}).length):1;return Math.min(3,base+Math.floor((m.gbPts||0)/3))}
function gbPopup(){const S=X.S;const I=gbItems();const L=(S.gb||[]).filter(id=>I[id]);
  openModal(`<span class="eyebrow">Gia bảo</span><h2>Gia bảo của họ ${esc(S.surname)}</h2>${L.length?`<ul class="plain">${L.map(id=>`<li><b>${esc(I[id].n)}</b><br><small>${esc(I[id].d)}</small><br><small class="muted">Từ cái kết: ${esc(((window.D.ENDINGS||[]).find(x=>x.id===I[id].end)||{}).n||I[id].end)}</small></li>`).join('')}</ul>`:'<p class="muted">Ván này chưa mang gia bảo nào. Mỗi cái kết đã đạt cho một món gia bảo; chọn mang theo ở màn lập gia tộc.</p>'}<div class="choices"><button class="btn primary" data-ok>Đóng</button></div>`,false,'menu');
  M.querySelector('[data-ok]').onclick=closeModal}
function gbLine(){const S=X.S;const L=(S&&S.gbNew)||[];if(!L.length)return '';const I=gbItems();return `<p class="kvline"><b>Gia bảo nhận được:</b> ${L.map(id=>I[id]?esc(I[id].n)+' <small class="muted">'+esc(I[id].d)+'</small>':'').join('; ')}</p>`}
function gbGiveMid(id){const S=X.S;const I=gbItems();const it=I[id];if(!it||!S)return false;S.gb=S.gb||[];if(S.gb.includes(id))return false;S.gb.push(id);const f=it.fx||{};alive().filter(inClan).forEach(p=>{for(const k in (f.st||{}))p[k]=Math.min(100,(p[k]||0)+f.st[k]);if(f.duyen)p.duyen=Math.min(100,(p.duyen||0)+f.duyen)});log(`Gia bảo mới của họ ${S.surname}: ${it.n}. ${it.d}`,'gd');return true}
function relLine(d,c){const id=d&&(d.who||d.oid||d.xg||d.oth);const o=id&&P(id);if(!o||o.id===c.id)return '';if(U2())return ''; /* thẻ chân dung đã hiện người thứ hai */
  const st=['tri','vo','mi','eq'].map(k=>[k,Math.round(o[k]||0)]).sort((a,b)=>b[1]-a[1]).slice(0,2).map(([k,v])=>`${SN[k]} ${v}`).join(', ');
  return `<p class="kvline"><b>Liên quan:</b> ${esc(nameOf(o))}, ${age(o)} tuổi, ${esc(jobName(o))}; ${st}.</p>`}
function relSnap(){try{return relRefs().map(r=>{const I=hinfo(r);return I&&I.obj?[r.key,I.name||'',I.obj.rel||0]:null}).filter(Boolean)}catch(e){return []}}
function relDiffTxt(a,rtxt){try{if(!a||!a.length)return '';const b=relSnap();const A=new Map(a.map(x=>[x[0],x[2]]));const L=[];b.forEach(x=>{if(!A.has(x[0]))return;const d=Math.round(x[2]-A.get(x[0]));if(d&&x[1]&&!String(rtxt).includes('Quan hệ với '+x[1]))L.push([x[1],d])});return L.length?`<span class="fx">${L.map(([n,d])=>`<span class="${d>0?'up':'down'}">Quan hệ với ${esc(n)} ${d>0?'+':''}${d}</span>`).join('')}</span>`:''}catch(e){return ''}}
function releaseSeat(c,noVac){const S=X.S;
  const old=seatOfC(c);
  if(old&&S.off&&S.off[old]&&S.off[old].holder===c.id){const o=S.off[old];o.holder=null;if(!noVac){o.vac=true;o.vacT=S.t;o.why='chuyển sang chức khác'}}
}
function relation(c){const S=X.S;
  if(c.left)return ({vaocung:'Đã vào cung',xuatgia:'Đã xuất giá',expelled:'Bị trục xuất',lyhon:'Đã ly hôn, rời đi',ban:'Đã bị bán đi',botron:'Bỏ nhà ra đi',tumat:'Bị từ mặt',theome:'Theo mẹ',theochong:'Theo chồng rời đi',luuvong:'Lưu vong'})[c.left]||'Đã rời gia tộc';
  if(c.ngoai)return 'Cháu ngoại';
  if(c.id===S.head)return 'Gia chủ';
  const h=head();if(h&&h.spouse===c.id)return c.g==='nữ'?'Chủ mẫu':'Phu quân gia chủ';
  if(c.inLaw)return c.g==='nữ'?'Con dâu':'Con rể';
  if(c.adopted)return `Con nuôi · đời ${c.gen}`;
  return `Đời thứ ${c.gen}`;
}
function relMood(c){if(!c.rel)return 0;const fam=home().filter(p=>p.id!==c.id&&p.hh===c.hh&&age(p)>=6);if(!fam.length)return 0;
  let s=0,w=0;fam.forEach(p=>{const k=kin(c,p);const ww=k==='vc'?2.5:k==='ho'?0.5:1;s+=relOf(c,p)*ww;w+=ww});return clamp(s/w/12,-6,6)}
function relEns(o){if(!o)return o;if(!o.gp)o.gp=pick(GPK);if(o.oan==null)o.oan=o.feud?20:0;if(o.hon==null)o.hon=o.mar||0;if(o.canh==null)o.canh=R(10,40);if(o.nhg==null)o.nhg=0;if(!o.book)o.book=[];return o}
function relBook(o,txt){const S=X.S;relEns(o);o.book.push({t:S.t,txt});if(o.book.length>12)o.book.shift()}
function relRefs(){const S=X.S;if(!S.w||!S.loc)return [];const out=houseRefs().slice();const seen=new Set(out.map(r=>r.key));
  w_clans(S.loc.p).forEach(c=>{const k='C'+c.id;if(!seen.has(k)){seen.add(k);out.push({t:'C',id:c.id,p:S.loc.p,at:true,mo:0,key:k})}});return out}
function relTick(){const EVENTS=X.EVENTS;const S=X.S;const hd=head();if(!hd||!S.w||!S.loc||S.queue.length>3)return;if(!chance(0.03*(tierIdx()>=3?1.3:1)))return;
  const refs=relRefs();if(!refs.length)return;const cand=[];
  const poor=tierIdx()<2;
  refs.forEach(r=>{const I=rinfo(r);if(!I)return;if(r.t==='H'&&tierIdx()<3)return;if(I.tier>=4&&tierIdx()<2)return;
    EVENTS.forEach(e=>{if(!e.rg)return;const g=e.rg;if(poor&&g.f)return;   /* nhà nghèo thì không ai đến làm thân */if(g.b&&!g.b.includes(I.band))return;if(g.d&&!g.d.includes(I.dir))return;
      if(g.init&&I.tier>=6&&I.rel<70)return;   /* Danh môn vọng tộc không chủ động kết thân */
      const ck=e.id+'|'+r.key;if((S.cool[ck]||-1e9)>S.t||(S.cool[e.id]||-1e9)>S.t)return;try{if(g.c&&!g.c(I,hd))return}catch(err){return}
      cand.push({e,r,I,w:(e.w||1)*(r.at?1.4:1),ck})})});
  if(!cand.length)return;let tot=cand.reduce((a,x)=>a+x.w,0),rr=Math.random()*tot,pk=cand[0];for(const x of cand){rr-=x.w;if(rr<=0){pk=x;break}}
  S.cool[pk.ck]=S.t+(pk.e.rgcd||60);S.cool[pk.e.id]=S.t+(pk.e.rgg||12);enqueue('ev',hd.id,{ev:pk.e.id,data:{rr:pk.r}})}
function relWin(I){const S=X.S;const o=I.obj;o.fame=Math.round(o.fame*0.4);o.wealth=Math.round((o.wealth||50)*0.4);o.rel=-30;o.oan=40;relBook(o,'Thua trong cuộc một sống một còn, phải dời đi');
  if(I.t==='C'){const L=S.w.clans[I.p]||[];const i=L.indexOf(o);if(i>=0){L[i]=w_genClan(I.p);L[i].fame=Math.round(L[i].fame/2)}}
  const land=R(2,8);S.farm.own+=land;cf(25,'Thắng cuộc một sống một còn');S.hung=clamp(S.hung+8,0,100);return `${esc(I.name)} suy sụp, phải bán nhà dời đi nơi khác. Nhà mình lấy được ${land} mẫu ruộng và mối làm ăn của họ.`}
function relLose(I){gameOver(`Cuộc một sống một còn với ${I.name} kết thúc. Nhà mình thua: ruộng bị chiếm, người bị vu tội, con cháu tan tác.`,'Một sống một còn')}
function ledCheck(){const EVMAP=X.EVMAP;const S=X.S;const out=[];const L=S.evl||[];const byp=Object.fromEntries(S.people.map(p=>[p.id,p]));const last={};
  for(const e of L){const [t,pid,kind,ev,opt,ag,job,g,auto,o2]=e;const p=byp[pid];const ex=ev&&EVMAP[ev];const y=Math.floor(t/12);
    if(!p){out.push(`${ev||kind}@${y}: người #${pid} không còn trong sổ người`);continue}
    if(p.dead!=null&&p.dead<t)out.push(`${ev||kind}@${y}: gọi cho ${p.given} đã chết`);
    if(opt==='(bỏ qua)')continue;
    if(ex){if(ex.age&&(ag<ex.age[0]||ag>ex.age[1]))out.push(`${ev}@${y}: ${p.given} ${ag} tuổi ngoài khoảng [${ex.age}]`);
      if(ex.g&&((ex.g==='nữ'?'f':'m')!==g))out.push(`${ev}@${y}: giới tính ${g} khác yêu cầu ${ex.g} (${p.given})`);
      if(ex.job&&job&&!ex.job.some(j=>j===job||(String(j).startsWith('biz:')&&job==='chu')))out.push(`${ev}@${y}: nghề ${job} không thuộc [${ex.job}] (${p.given})`);
      if(!ex.fixed&&!ex.arc&&kind==='ev'){const k=pid+'|'+ev;if(last[k]!=null&&t-last[k]<36)out.push(`${ev}@${y}: ${p.given} gặp lại sau ${t-last[k]} tháng`);last[k]=t}
      if(o2!=null&&!byp[o2])out.push(`${ev}@${y}: người thứ hai #${o2} không tồn tại`)}
    else if(kind==='ev'&&ev)out.push(`${ev}@${y}: sự kiện không còn trong kho`)}
  return out}
function ledAdd(k,ids,data,o){const DRY=X.DRY;const S=X.S;if(DRY||!S)return null;o=o||{};S.led=S.led||[];S.ledN=(S.ledN||0)+1;
  const a=(ids||[]).filter(x=>x!=null);const e={i:S.ledN,t:S.t,k,a};if(data!=null)e.d=data;
  if(o.uniq){for(let i=S.led.length-1,n=0;i>=0&&n<60;i--,n++){const x=S.led[i];if(x.k===k&&x.a.join()===a.join()&&JSON.stringify(x.d||null)===JSON.stringify(data||null)){S.ledN--;return x}}}
  S.led.push(e);
  if(S.led.length>LED_CAP){S.ledSum=S.ledSum||{};S.led.splice(0,500).forEach(x=>{const d=Math.floor(x.t/120);const s=S.ledSum[d]=S.ledSum[d]||{};s[x.k]=(s[x.k]||0)+1})}
  if(o.m!==false)a.forEach(id=>{const p=P(id);if(!p)return;const other=a.find(y=>y!==id);memP(p,k,{o:other,w:o.w,keep:o.keep,l:e.i})});
  if(o.fam)famMemAdd(k,{w:o.w,keep:o.keep,l:e.i});
  return e}
function ledLast(id,k){const S=X.S;const L=S.led||[];for(let i=L.length-1,n=0;i>=0&&n<600;i--,n++){const x=L[i];if(x.k===k&&(id==null||x.a.includes(id)))return x.t}return null}
function ledOk(e,c){const S=X.S;const M=e.mem;if(!M)return true;
  const chk=a=>{const k=Array.isArray(a)?a[0]:a,mw=Array.isArray(a)?a[1]:1;const m=mFind(c,k);return !!m&&m.w>=mw};
  if(M.need&&!M.need.every(chk))return false;if(M.any&&!M.any.some(chk))return false;if(M.not&&M.not.some(chk))return false;
  if(M.fneed&&!M.fneed.every(k=>famHas(k)))return false;if(M.fnot&&M.fnot.some(k=>famHas(k)))return false;
  if(M.gap)for(const k in M.gap){const l=ledLast(c.id,k);if(l!=null&&S.t-l<M.gap[k])return false}
  return true}
function ledDeath(c,cause){const DRY=X.DRY;const S=X.S;if(DRY||!S)return;const rel=[];const add=id=>{if(id!=null&&id!==c.id&&!rel.includes(id)&&P(id))rel.push(id)};
  (c.parents||[]).forEach(add);add(c.spouse);S.people.forEach(p=>{if(p.parents&&p.parents.includes(c.id))add(p.id)});
  const e=ledAdd('chet',[c.id,...rel],{cause:String(cause||'').slice(0,40)},{m:false});
  if(e)rel.forEach(id=>{const p=P(id);if(!p)return;const kid=(c.parents||[]).includes(id);memP(p,kid?'mat_con':'mat',{o:c.id,l:e.i})})}
function ledBirth(m,f,live,lost){const DRY=X.DRY;const S=X.S;if(DRY||!S)return;const ids=[m&&m.id,f&&f.id,...live.map(k=>k.id)];
  const e=ledAdd('sinh',ids,{lost:lost.length},{m:false});if(!e)return;
  live.forEach(k=>memP(k,'sinh',{o:m&&m.id,l:e.i}));
  [m,f].forEach(p=>{if(p){live.forEach(k=>memP(p,'co_con',{o:k.id,l:e.i}));if(lost.length)memP(p,'mat_con',{o:null,l:e.i})}})}
function ledEv(c,evId,o,data){const DRY=X.DRY;const EVMAP=X.EVMAP;const e=EVMAP&&EVMAP[evId];if(DRY||!e)return;
  {const oid=data&&(data.oid||data.who);if(oid!=null&&oid!==c.id&&P(oid)&&!(e.led||(o&&o.led)))ledAdd('gap',[c.id,oid],{ev:evId},{w:25})}
  if(!(e.led||(o&&o.led))&&o&&o.l&&!e.arc&&!e.fixed){const lb=String(o.l);for(const R2 of LAB_RULES){if(R2.re.test(lb)){ledAdd(R2.k,[c.id],{ev:evId},{w:R2.w||55});break}}} /* nhãn lựa chọn cho biết việc đã làm: cứu giúp, gây hại, tha */
  const L=(o&&o.led)||e.led;if(!L)return;if(L.lab&&!(o&&L.lab.test(o.l||'')))return;
  const other=typeof L.o==='function'?L.o(c):L.o;const ids=[c.id];if(other!=null)ids.push(other);
  ledAdd(L.k,ids,L.d||null,{w:L.w,keep:L.keep,fam:L.fam})}
function ledYear(){const S=X.S;if(!S)return;S.people.forEach(p=>{if(!p.mm||!p.mm.length)return;
    p.mm=p.mm.filter(m=>{if(m.keep)return true;m.w-=(mkCfg(m.k).d||4);return m.w>0})});
  if(S.fm)S.fm=S.fm.filter(m=>{if(m.keep)return true;m.w-=(mkCfg(m.k).d||4);return m.w>0})}
function ledAudit(){const S=X.S;const out=[];if(!S)return out;const ids=new Set(S.people.map(p=>p.id));const L=S.led||[];
  if(L.length>LED_CAP+10)out.push('sổ quá lớn '+L.length);
  for(let i=1;i<L.length;i++)if(L[i].i<=L[i-1].i){out.push('sổ không tăng dần ở '+i);break}
  const dead={};L.forEach(x=>{if(x.k==='chet'){const id=x.a[0];if(dead[id])out.push('chết hai lần '+id);dead[id]=1}});
  S.people.forEach(p=>{if(p.dead!=null&&!dead[p.id]&&p.dead>=((S.led[0]&&S.led[0].t)||0))out.push('người chết không có trong sổ '+p.given);
    const M=p.mm||[];if(M.length>MEM_CAP)out.push('ký ức quá nhiều '+p.given+' '+M.length);
    M.forEach(m=>{if(!(m.w>0&&m.w<=100))out.push('trọng số lệch '+p.given+' '+m.k+' '+m.w);if(m.o!=null&&!ids.has(m.o))out.push('ký ức '+m.k+' trỏ người không tồn tại ('+p.given+')');
      if((m.k==='mat'||m.k==='mat_con')&&m.o!=null){const q=P(m.o);if(q&&q.dead==null)out.push('nhớ người mất nhưng người ấy còn sống '+p.given+'→'+q.given)}})});
  if((S.fm||[]).length>FM_CAP)out.push('ký ức gia tộc quá nhiều');
  {const seen={};const L2=(S.np&&S.np.l)||{};for(const k in L2){const n=L2[k];if(seen[n.n])out.push('NPC trùng tên '+n.n);seen[n.n]=1;if(S.people.some(p=>(p.surname+' '+p.given)===n.n))out.push('NPC trùng tên người trong nhà '+n.n);if(!(n.born<=S.t))out.push('NPC chưa sinh '+n.n)}}
  return out}
function ledDump(c){const S=X.S;const nm=id=>{const p=P(id);return p?p.given:'#'+id};
  return {mem:(c.mm||[]).map(m=>m.k+(m.o!=null?'→'+nm(m.o):'')+' w'+m.w+(m.keep?'*':'')+' t'+Math.floor(m.t/12)),
    life:(S.led||[]).filter(x=>x.a.includes(c.id)).slice(-30).map(x=>Math.floor(x.t/12)+':'+x.k+(x.d?JSON.stringify(x.d):''))}}
function arcTouch(c,evId){const DRY=X.DRY;const EVMAP=X.EVMAP;const S=X.S;if(!evId||!S.arcs||DRY)return '';const e=EVMAP[evId];if(!e||e.arc||(e.fixed&&!/^(c\d+_|[a-z0-9_]+_[bc]$)/.test(evId)))return '';let out=''; /* d9.10: câu nối cốt truyện cũng đến các bước của chuỗi cũ (c7_b, c14_b...) */
  for(const id in S.arcs){const a=S.arcs[id],d=ARC[id];if(!a||!a.on||a.end||!d||!d.touch)continue;if(S.t-(a.touchT||-99)<12)continue; /* d9.12.63: câu nối cách nhau 12 tháng (trước 6), chỉ khi sự kiện liên quan thật, và kèm dòng tác dụng nhìn thấy được */
    let t='';try{t=d.touch(a,e,c)||''}catch(er){}if(t){a.touchT=S.t;const tt=typeof t==='object'?t.t:t;const fxh=typeof t==='object'&&t.fx?t.fx:'';if(tt)out+=`<p class="muted"><i>${tt}</i></p>${fxh}`}}
  return out}
function arcStart(id){const S=X.S;const d=ARC[id];if(!d||!S||arcSt(id))return null;S.arcs=S.arcs||{};
  const a=S.arcs[id]={on:1,ch:1,t0:S.t,next:S.t+R(2,6),c:{},fl:{},lock:{},done:{},hist:[],end:null,q:null};
  ledAdd('arc_open',[],{id},{fam:true,keep:1,m:false});
  if(d.onStart)d.onStart(a);return a}
function arcEnd(id,endId,extra){const a=arcSt(id),d=ARC[id];if(!a||!d||a.end)return false;const E=(d.ends&&d.ends[endId])||{};
  a.end=endId;a.on=0;a.q={};ledAdd('arc_end',[],{id,endId},{fam:true,keep:1,m:false});
  if(E.q)for(const k in E.q)a.q[k]=E.q[k][0]+Math.random()*(E.q[k][1]-E.q[k][0]); /* dải điều chỉnh rút ngẫu nhiên, giấu */
  if(E.log)qtLog(E.title||d.name||'Khép lại',E.log);
  if(E.mark)metaFlag(E.mark);
  if(E.over)finishGame(Object.assign({id:E.over,arc:id,end:endId},extra||{}));
  return true}
function arcPool(id,a){const EVENTS=X.EVENTS;const S=X.S;const hd=head();if(!hd)return [];
  return EVENTS.filter(e=>{if(e.arc!==id)return false;if(e.ch!=null&&e.ch!==a.ch)return false;
    const dn=a.done[e.id];if(dn!=null&&(e.vonce!==false||S.t-dn<(e.vcd||48)))return false;
    try{return !e.vc||e.vc(hd,a)}catch(err){return false}})}
function arcMonth(){const S=X.S;if(!S||S.over||!head())return;S.arcs=S.arcs||{};
  const live=Object.keys(S.arcs).filter(k=>S.arcs[k].on&&!S.arcs[k].end);
  if(S.t%3===0&&live.length<3)for(const id in ARC){if(S.arcs[id])continue;let ok=false;try{ok=ARC[id].start&&ARC[id].start()}catch(e){}if(ok){arcStart(id);break}}
  for(const id of Object.keys(S.arcs)){const a=S.arcs[id],d=ARC[id];if(!d||!a.on||a.end)continue;
    try{if(d.tick)d.tick(a)}catch(e){}
    if(S.t>=a.next){const L=arcPool(id,a);const g=d.gap||[3,8];
      if(L.length){let tot=L.reduce((s,e)=>s+(e.vw||1),0),r=Math.random()*tot,pk=L[0];for(const e of L){r-=(e.vw||1);if(r<=0){pk=e;break}}
        a.done[pk.id]=S.t;ledAdd('arc_step',S.head!=null?[S.head]:[],{id,ev:pk.id,ch:a.ch},{w:30});enqueue('ev',S.head,{ev:pk.id,data:{}});a.next=S.t+R(g[0],g[1])}
      else a.next=S.t+R(2,4)}}}
function vilEnsure(st){if(!st.vil)st.vil={on:0,t0:null,ch:0,next:0,q:0,qt:0,K:{age:33,pow:18,rank:0,ok:1},D:{age:29,pow:10,ok:1,link:0},pf:0,wit:0,dt:0,fl:{},done:{},np:0,nl:0,hist:[],end:null,tries:0,stance:'',hideN:0,lastRank:0}}
function vilLog(m){const S=X.S;const v=S.vil;v.hist.unshift({t:S.t,m});if(v.hist.length>24)v.hist.length=24}
function vilRoutes(){const S=X.S;
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
function vilPool(kind){const EVENTS=X.EVENTS;const S=X.S;
  const v=S.vil,hd=head();
  return EVENTS.filter(e=>{if(e.vs!==kind)return false;
    const dn=v.done[e.id];if(dn!=null&&(e.vonce!==false||S.t-dn<(e.vcd||48)))return false;
    try{return !e.vc||e.vc(hd,v)}catch(err){return false}})}
function vilStart(){const S=X.S;
  const v=S.vil;v.on=1;v.t0=S.t;v.ch=1;v.next=S.t+R(1,2);v.K.pow=R(16,22);
  vilLog('Tin đồn về một kẻ tên Phạm Trung Kiên bắt đầu lan khắp vùng.');
  log('Trong vùng đang nổi lên một kẻ tên Phạm Trung Kiên. Người ta kháo nhau hắn có chỗ dựa lớn và không ai dám đụng vào.','hi')}
function vilTick(mo){const EVMAP=X.EVMAP;const S=X.S;
  return; /* v6.7.0-d3: ân oán họ Phạm chạy trên khung đại cốt truyện (ARC.pm, ev-v670d/e); chuỗi vil_* cũ ngừng */
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
function vilNext(){const EVENTS=X.EVENTS;const S=X.S;
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
function vilNatural(){const EVMAP=X.EVMAP;const S=X.S;
  const v=S.vil;if(v.end)return;v.end='fade';v.q=0;
  vilLog(v.K.ok||v.D.ok?'Bốn mươi năm trôi qua, hai kẻ ấy già yếu, không còn sức làm hại ai. Mối ân oán khép lại bằng thời gian.':'Kiên đã khuất, Duy mất chỗ dựa. Mối ân oán khép lại bằng thời gian.');
  v.K.ok=0;v.D.ok=0;
  const hd=head();if(hd&&EVMAP.vil_e_fade)enqueue('ev',hd.id,{ev:'vil_e_fade'})}
function vilEnd(how){const S=X.S;const v=S.vil;v.end=how;v.q=0;vilLog(how==='won'?'Phạm Trung Kiên và Nguyễn Thành Duy đã bị trừng trị.':'Ân oán khép lại.')}
function vilYears(){const S=X.S;const v=S.vil;return v&&v.on?Math.floor((S.t-v.t0)/12):0}
function vilCard(){const S=X.S;
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
function evLvOf(e){if(e.lv!=null)return e.lv;if(window.EVLV&&window.EVLV[e.id]!=null)return window.EVLV[e.id]; /* d9.10: events-lv.js (tools/lvgen.js) */const M=e.meta||{};if(e.arc||M.tr==='arc')return 3;if(['rare','very_rare','unique'].includes(M.ra))return 3;if(M.ra==='uncommon'||e.ky||M.tr==='encounter'||e.fixed||M.tr==='fixed')return 2;return 1}
function evCard(p,solo){const ci=cardInfo(p);return `<button type="button" class="evcard${solo?' solo':''} ${p.g==='nữ'?'fem':'mal'}" data-pcard="${p.id}" title="Bấm để xem thông tin"><span class="evav">${avatarSVG(p,solo?72:52)}<span class="evage">${ci.age}</span></span><span class="evtx"><b>${esc(ci.name)}</b><small>${esc(ci.rel)}</small></span></button>`}
function evPeople(c,data,text){const S=X.S;const L=[],NL=[],sp=new Set(),sn=new Set();
  const addP=id=>{if(id==null||sp.has(id))return;const p=P(id);if(p&&(p.dead==null||(c&&p.id===c.id))){sp.add(id);L.push(p)}};
  const addN=(id,explicit)=>{if(id==null||sn.has(id))return;const n=npGet(id);if(n&&(n.ok!==0||explicit)&&!S.people.some(p=>nameOf(p)===n.n)){sn.add(id);NL.push(n)}}; /* d9.12.68: NPC đã mất chỉ có thẻ khi dữ liệu sự kiện nêu đích danh */ /* d9.12.63: NPC trùng tên một người trong gia phả (người đã vào nhà) không hiện thành thẻ thứ hai */
  const any=v=>{if(typeof v!=='string')return;if(ID_N.test(v))addN(v);else if(ID_P.test(v))addP(v)};
  if(c)addP(c.id);
  if(data){['who','oid','xg','oth','kid','w','hp'].forEach(k=>addP(data[k]));[].concat(data.npc||[]).forEach(i=>addN(i,true));
    Object.keys(data).forEach(k=>{const v=data[k];if(Array.isArray(v)){if(v.length<=3)v.forEach(any)}else any(v)})}
  if(text&&typeof text==='string'){const tx=text.replace(/<[^>]*>/g,'');try{alive().forEach(p=>{if(p.id!==(c&&c.id)&&p.given&&p.given.length>=2&&tx.includes(esc(p.given))&&!sp.has(p.id)&&L.length<5)addP(p.id)});if(S.np&&S.np.l)Object.values(S.np.l).forEach(n=>{if(n.n&&n.n.length>=4&&tx.includes(esc(n.n))&&!sn.has(n.id)&&NL.length<5)addN(n.id)})}catch(er){}} /* d9.12.63: người nhắc tên trong lời kể mà không nằm trong dữ liệu vẫn có thẻ */
  const L4=L.slice(0,5),N4=NL.slice(0,Math.max(0,6-L4.length));return {L:L4,NL:N4}}
function evBand(c,data,text){const ev=evPeople(c,data,text);const tot=ev.L.length+ev.NL.length;if(!tot)return '';return `<div class="evband${tot>=6?' many':tot>=4?' cmp':''}">${ev.L.map(p=>evCard(p,tot===1)).join('')}${ev.NL.map(n=>npCard(n,tot===1)).join('')}</div>`}
function evSrc(e){const f=v=>typeof v==='function'?v.toString():Array.isArray(v)?v.map(o=>Object.values(o).map(x=>typeof x==='function'?x.toString():String(x)).join(' ')).join(' '):String(v||'');return f(e.t)+' '+f(e.x)+' '+f(e.o)}
function addTrait(c,t){if(TRAITS[t]&&TRAITS[t].ax){if(axLabels(c).includes(t))return false;setLabel(c,t,true);return true}if(!c.traits.includes(t)&&!expressed(c,t)){c.traits.push(t);const dz=TRAITS[t]&&TRAITS[t].duyen;if(dz&&c.duyen!=null&&c.nat0)c.duyen=clamp(c.duyen+dz,1,100);return true}return false}
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
function addStat(c,k,v,over){
  if(k==='tam'){const o=c.tam;c.tam=clamp(c.tam+v,0,100);return c.tam-o}
  if(k==='duyen'){const o=c.duyen;c.duyen=clamp(c.duyen+v,1,100);return c.duyen-o}
  const old=c[k];const cap=k==='suc'?c.cap.suc:Math.max(capOf(c,k),c.cap[k]);
  if(v>0){if(over)c.cap[k]=Math.max(c.cap[k],Math.min(hardCap(c,k),gateCap(c,k)+5,old+v));const top=over?Math.max(c.cap[k],cap):cap;c[k]=Math.min(Math.max(old,top),old+v)}
  else c[k]=Math.max(0,old+v);
  return c[k]-old;
}
function addRel(a,b,v){ensurePersona(a);ensurePersona(b);a.rel[b.id]=clamp(relOf(a,b)+v,-100,100);b.rel[a.id]=clamp(relOf(b,a)+v*0.8,-100,100)}
function addSk(c,k,v){ensurePersona(c);const o=c.sk[k]||0;c.sk[k]=clamp(o+v,0,v>0?Math.max(o,100):100);return c.sk[k]-o}
function addHabit(c,k,lv){const DRY=X.DRY;const S=X.S;
  if(!HABITS[k])return false;
  if(c.habits.includes(k)){if(isVice(k)){c.vlv=c.vlv||{};c.vlv[k]=Math.max(vlv(c,k),lv||25)}return false}
  c.habits.push(k);
  if(isVice(k)){c.vlv=c.vlv||{};c.vlv[k]=lv||25;c.vt=c.vt||{};c.vt[k]=S.t;if(!DRY)viceAlert(c,k)}
  return true;
}
function addRule(k,why){const S=X.S;if(S.rules.includes(k))return false;S.rules.push(k);S.ruleT=S.t;if(S.t>0)S.on=clamp(S.on-5,0,100);log(`Gia quy thêm điều: ${RULES[k].n.toLowerCase()}${why?' ('+why+')':''}.`,'gd');return true}
Object.assign(X.fn,{famCard,famNew,famEnsure,famPerson,famHeir,famYear,famReign,famOf,fameWhy,famMemAdd,famHas,projWhy,projStart,projFinish,projSize,projMonth,projYear,projTile,projCard,houseFor,houseEnsure,houseRel,houseYear,houseRefs,houseTick,houseCard,bizSlots,bizCalc,bizMonth,bizSkillWhy,bizFundAdd,bizFundGet,bizValue,bizStaffInfo,bizDetail,qtOf,qtLog,qtAdd,qtJoin,qtLevel,qtDismiss,qtConfiscate,qtSentence,qtTick,qtMonth,autoFill,autoChoice,autoAx,autoSplit,autoPick,autoEv,jobInc,jobMatch,jobPopup,jobChoice,jobDig,jobGrow,gbGrant,gbOwned,gbSlots,gbPopup,gbLine,gbGiveMid,relLine,relSnap,relDiffTxt,releaseSeat,relation,relMood,relEns,relBook,relRefs,relTick,relWin,relLose,ledCheck,ledAdd,ledLast,ledOk,ledDeath,ledBirth,ledEv,ledYear,ledAudit,ledDump,arcTouch,arcStart,arcEnd,arcPool,arcMonth,vilEnsure,vilLog,vilRoutes,vilPool,vilStart,vilTick,vilNext,vilNatural,vilEnd,vilYears,vilCard,evLvOf,evCard,evPeople,evBand,evSrc,addTrait,addTraitEv,addStat,addRel,addSk,addHabit,addRule});
});
