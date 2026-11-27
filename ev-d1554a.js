/* Bách Niên Thế Gia · 7.0.0-d.1.5.54 · CHIẾN TRANH CÓ DIỄN BIẾN, BIÊN GIỚI ĐỔI THẬT (đợt E; chủ dự án 27/11: "Việc chiến tranh cũng không thể chỉ dừng lại ở việc xảy ra rồi khép lại. Phải có diễn biến thực tế … chiến nhỏ hay tranh chấp nhỏ thì khác,
   mà khi hai nước tuyên chiến, thì kiểu gì cũng phải có hậu quả cụ thể khiến bản đồ phải thay đổi, biên giới thay đổi, diện tích đất nước thay đổi … các thế lực cũng có thể nảy sinh tranh chấp, liên minh").
   Quốc tịch của khu đổi trong S.w.nat và áp lên PROV[p].nat (gốc giữ ở PROV[p].natGoc). Kinh đô không bao giờ mất; mỗi nước còn ít nhất ba khu. */
(function(){
const D=window.D;const P=D.PROV;
Object.keys(P).forEach(p=>{if(!P[p].natGoc)P[p].natGoc=P[p].nat});
const GOC={};for(const p in P)GOC[P[p].natGoc]=(GOC[P[p].natGoc]||0)+1;
const KINH=new Set(['thien_kinh','soc_do','van_dao','cam_thanh','sa_thanh']);const IT_NHAT=3;
let G=null,H=null;const S=()=>G.S();const R=(a,b)=>G.R(a,b);const pk=a=>a[Math.floor(Math.random()*a.length)];const cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const tenN=n=>D.NAT[n]?D.NAT[n].n:n;const tenP=p=>P[p].n;
/* mỗi lần mở hay nạp ván phải đặt lại bản đồ theo đúng ván ấy */
function apNat(st){const M=st&&st.w&&st.w.nat;for(const p in P)P[p].nat=(M&&M[p])||P[p].natGoc}
const khu=n=>Object.keys(P).filter(p=>P[p].nat===n);
const ke=p=>(D.ADJ[p]||[]).map(z=>z[0]);
function bien(a,b){const out=[];for(const x of khu(a))for(const y of ke(x))if(P[y].nat===b)out.push([x,y]);return out}
function tienTuyen(i){const b=D.BORDER[i];if(P[b[4]].nat===b[0]&&P[b[5]].nat===b[1])return [b[4],b[5]];const L=bien(b[0],b[1]);if(!L.length)return null;const x=L.filter(z=>!KINH.has(z[0])&&!KINH.has(z[1]));return pk(x.length?x:L)}
/* ---------- sức một nước ---------- */
function vuaCua(n){if(n==='trieu'){const d=S().dyn;return d&&d.k?{tai:d.k.tai,uy:d.k.uy,loan:d.loan||0,tranh:!!d.cr}:{tai:55,uy:55,loan:10}}const v=S().vq&&S().vq[n];return v?{tai:v.vua.tai,uy:v.vua.uy,loan:10,tranh:!!v.tranh}:{tai:55,uy:55,loan:10}}
function theLucGiup(p,thu){const T=window.BN_TL;if(!T||!p)return 0;let v=0;for(const f of T.o(p)){const nh=T.LOAI[f.loai].nh;if(thu){if(nh==='cuop')v-=f.pow/14;else if(f.loai!=='ta'&&nh!=='giao')v+=f.pow/12}else if(f.loai==='ta'||nh==='giao')v+=f.pow/16}return v}
function suc(n,w,muc,thu){const k=vuaCua(n);const so=khu(n).length;const goc=GOC[n]||8;let v=18+8*Math.sqrt(so)+(k.tai+k.uy)/5-k.loan/6-(k.tranh?10:0);
  /* đất lớn chưa chắc mạnh: giữ đất mới phải chia quân trấn giữ và dân chưa phục; nước mất đất thì dốc toàn lực. Không có hai lực này thì nước lớn nuốt dần cả thiên hạ (đo: Đại Nguyễn 29/48 khu) */
  if(so>goc)v-=(so-goc)*4;else v+=Math.min(12,(goc-so)*3);
  v-=Math.min(12,khu(n).filter(p=>P[p].natGoc!==n).length*1.5);
  ((S().w&&S().w.cong)||[]).forEach(z=>{if(S().t<z.den){if(z.cho===n)v+=4;if(z.tu===n)v-=4}}); /* nước đang nộp cống thì yếu đi, nước nhận thì mạnh lên */
  const W=S().w;if(muc&&(W.dis||[]).some(d=>S().t>=d.since&&S().t<d.until&&d.provs.includes(muc))&&thu)v-=8;
  if(w&&w.gop)v+=cl(w.gop[n]||0,-25,25);v+=theLucGiup(muc,thu);return v}
/* ---------- mở chiến: phần lớn chỉ là xung đột biên giới, phần còn lại là tuyên chiến ---------- */
function no(i){const W=S().w,b=D.BORDER[i];const tt=tienTuyen(i);if(!tt){W.ten[i]=b[2];W.ph[i]=0;return 'bo'}
  const cs=H.w_cause(i,(S().t%12)+1);if(G.chance(cl(0.34+cs.p*0.18,0.34,0.7)))return 'chien';
  W.xung=W.xung||[];if(W.xung.some(x=>x.i===i))return 'xung';const why=(W.why||{})[i]||cs.why;const x={i,a:b[0],b:b[1],front:tt,until:S().t+R(2,5),why};W.xung.push(x);W.ph[i]=2;W.ten[i]=78;
  H.w_news(`Xung đột biên giới giữa ${tenN(b[0])} và ${tenN(b[1])} ở ${tenP(tt[0])} và ${tenP(tt[1])}, vì ${why}. Hai bên chưa tuyên chiến.`,H.w_rel(b[0],b[1]));
  for(const c of G.alive())if(G.inClan(c)&&c.job==='quan_ngu'&&c.away&&tt.includes(G.placeOf(c))&&G.chance(0.7)){G.enqueue('ev',c.id,{ev:'cx_tran_bien',data:{i,p:G.placeOf(c)}});break}
  return 'xung'}
const dangXung=i=>!!(S().w.xung||[]).find(x=>x.i===i);
function ketXung(x){const W=S().w;const sa=suc(x.a,x,x.front[1],false)+R(-14,14),sb=suc(x.b,x,x.front[0],false)+R(-14,14);const thang=sa>=sb?x.a:x.b,thua=thang===x.a?x.b:x.a;
  x.front.forEach(p=>{W.dmg[p]=cl((W.dmg[p]||0)+R(3,9),0,100)});W.ph[x.i]=0;W.ten[x.i]=D.BORDER[x.i][2]+R(14,30);
  H.w_news(`Xung đột giữa ${tenN(x.a)} và ${tenN(x.b)} lắng xuống: ${tenN(thang)} chiếm thế trên, ${tenN(thua)} phải bồi thường. Biên giới giữ nguyên.`,H.w_rel(x.a,x.b))}
/* ---------- chiến dịch ---------- */
const giu=(w,p)=>(w.chiem&&w.chiem[p])||P[p].nat;
function mucTieu(w,phe){const dich=phe===w.a?w.b:w.a;const out=[];for(const p in P){if(KINH.has(p)||(P[p].nat!==w.a&&P[p].nat!==w.b)||giu(w,p)!==dich)continue;if(ke(p).some(q=>(P[q].nat===w.a||P[q].nat===w.b)&&giu(w,q)===phe))out.push(p)}
  const lay=out.filter(p=>P[p].nat===phe);if(lay.length)return {p:pk(lay),lay:true};if(!out.length)return null;const dau=out.filter(p=>(w.front||[]).includes(p));return {p:pk(dau.length&&Math.random()<0.7?dau:out),lay:false}}
const chiemCua=(w,phe)=>Object.keys(w.chiem||{}).filter(p=>w.chiem[p]===phe);
function ghiTran(w,s){w.tran=w.tran||[];w.tran.unshift({t:S().t,s});if(w.tran.length>10)w.tran.pop()}
function thangTran(w,phe,p,lay){const W=S().w;w.chiem=w.chiem||{};w.diem=(w.diem||0)+(phe===w.a?1:-1);W.dmg[p]=cl((W.dmg[p]||0)+R(10,20),0,100);
  if(lay||P[p].nat===phe)delete w.chiem[p];else w.chiem[p]=phe;
  const T=window.BN_TL;if(T)T.o(p).forEach(f=>{const nh=T.LOAI[f.loai].nh;f.pow=cl(f.pow+(nh==='cuop'?R(2,9):-R(3,10)),nh==='cuop'?0:16,100)});
  const s=lay?`${tenN(phe)} giành lại ${tenP(p)}`:`${tenN(phe)} chiếm ${tenP(p)}`;ghiTran(w,s);H.w_news(`Chiến sự: ${s}.`,H.w_rel(w.a,w.b)||p===S().loc.p)}
function chienDich(w){const W=S().w;const A=w.a,B=w.b;const ma=mucTieu(w,A),mb=mucTieu(w,B);const sa=suc(A,w,ma&&ma.p,false),sb=suc(B,w,mb&&mb.p,false);
  const phe=Math.random()*(Math.max(8,sa)**2+Math.max(8,sb)**2)<Math.max(8,sa)**2?A:B;const m=phe===A?ma:mb;if(!m)return;const thu=phe===A?B:A;
  const p=cl(0.47+(suc(phe,w,m.p,false)-suc(thu,w,m.p,true)-3)/70,0.12,0.78);
  if(Math.random()<p)thangTran(w,phe,m.p,m.lay);else{W.dmg[m.p]=cl((W.dmg[m.p]||0)+R(2,6),0,100);ghiTran(w,`${tenN(thu)} giữ được ${tenP(m.p)}`)}}
/* mỗi tháng của một cuộc chiến; trả về true nếu đã ngã ngũ */
function chien(w){if(!w.chiem){w.chiem={};w.gop={};w.next=S().t+R(2,4)}
  if(S().t>=(w.next||0)){chienDich(w);w.next=S().t+R(2,4)}
  const na=chiemCua(w,w.a).length,nb=chiemCua(w,w.b).length;
  if(Math.abs(na-nb)>=3){H.w_endWar(w,`${tenN(na>nb?w.b:w.a)} không còn sức chống đỡ`);return true}
  if(S().t>=w.until){H.w_endWar(w,G.chance(0.5)?'hai bên đều kiệt sức':'sau nhiều trận giằng co');return true}
  return false}
/* ---------- khu đổi chủ ---------- */
const conDuoc=(p,tu)=>!KINH.has(p)&&P[p].nat===tu&&khu(tu).length>IT_NHAT;
function doiChu(p,sang){const s=S(),W=s.w;const tu=P[p].nat;if(tu===sang||!conDuoc(p,tu))return false;
  /* người nhà đang giữ ghế ở khu này, hoặc giữ ghế nước cũ khi chính quê nhà đổi chủ */
  const nhaMat=s.loc&&s.loc.p===p;const mat=[];
  for(const c of G.alive()){if(!G.inClan(c)||!c.seat||(c.job!=='quan'&&c.job!=='quan_ngu'))continue;const w=H.seatWh(c.seat);if(!w)continue;if(w.p===p||(nhaMat&&P[w.p].nat===tu)){const T=H.seatTm(c.seat)||{};mat.push({pid:c.id,r:T.r||0,ar:T.ar||0,mil:c.job==='quan_ngu',lv:c.lv})}}
  mat.forEach(z=>{const c=G.P(z.pid);H.leaveSeat(c);c.job='none';c.lv=0});
  /* quan cũ ở đất ấy mất ghế; ghế sẽ có người của triều mới */
  for(const key in (s.off||{})){const w=H.seatWh(key);if(w&&w.p===p){const o=s.off[key];if(o.holder)continue;const n=o.np&&H.npGet(o.np);if(n)n.cond='mất ghế vì đất đổi chủ';delete s.off[key]}}
  W.nat=W.nat||{};W.nat[p]=sang;P[p].nat=sang;if(P[p].natGoc===sang)delete W.nat[p];
  W.doi=W.doi||[];W.doi.unshift({t:s.t,p,tu,sang});if(W.doi.length>30)W.doi.pop();
  const f=s.dyn&&s.dyn.fam;if(f&&sang!=='trieu'){const con=khu('trieu').filter(q=>!KINH.has(q));f.vuong.forEach(v=>{if(v.land===p)v.land=con.length?pk(con):null})}
  H.w_news(`${tenP(p)} nay thuộc về ${tenN(sang)}.`,true);
  const hd=G.head();
  if(nhaMat&&hd){G.enqueue('ev',hd.id,{ev:'cx_doi_chu',data:{p,tu,sang,mat}},true)}
  else if(mat.length){/* ghế mất mà quê không đổi: triều đình triệu về chờ bổ chỗ khác */
    mat.forEach(z=>{const c=G.P(z.pid);c.flags.choBo={nat:tu,r:z.r,ar:z.ar,mil:z.mil,t:s.t};G.log(`${c.given} mất ghế vì ${tenP(p)} thất thủ, về chờ triều đình bổ chỗ khác.`,'hi')})}
  return true}
/* hết chiến: tuyên chiến thì bản đồ phải đổi */
function ketCuc(w){const W=S().w;const out=[];const doc=Object.keys(w.chiem||{}).map(p=>({p,sang:w.chiem[p]})).sort(()=>Math.random()-0.5);
  const dem={};for(const x of doc){if((dem[x.sang]||0)>=2)continue;const tu=P[x.p].nat;if(doiChu(x.p,x.sang)){dem[x.sang]=(dem[x.sang]||0)+1;out.push(`${tenP(x.p)} về ${tenN(x.sang)}`)}}
  if(!out.length){const sa=suc(w.a,w,null,false)+(w.diem||0)*6+R(-12,12),sb=suc(w.b,w,null,false)+R(-12,12);
    for(const [thang,thua] of sa>=sb?[[w.a,w.b],[w.b,w.a]]:[[w.b,w.a],[w.a,w.b]]){const L=bien(thang,thua).map(z=>z[1]).filter(p=>conDuoc(p,thua));if(!L.length)continue;const dau=L.filter(p=>(w.front||[]).includes(p));const p=pk(dau.length?dau:L);if(doiChu(p,thang)){out.push(`${tenN(thua)} cắt ${tenP(p)} cho ${tenN(thang)} để cầu hòa`);break}}}
  if(!out.length){const thang=(w.diem||0)>=0?w.a:w.b,thua=thang===w.a?w.b:w.a;out.push(`${tenN(thua)} không còn đất để cắt, phải nộp cống cho ${tenN(thang)} mười năm`);W.cong=W.cong||[];W.cong.push({tu:thua,cho:thang,den:S().t+120})}
  w.chiem={};return out.join('; ')}
/* ---------- mỗi tháng ---------- */
function month(){const s=S();if(!s||!s.w||!H)return;const W=s.w;
  (W.xung||[]).slice().forEach(x=>{if(s.t>=x.until){W.xung=W.xung.filter(z=>z!==x);ketXung(x)}});
  /* người chờ bổ: về tới đất cũ thì được xếp ghế trống */
  if(!s.journey&&s.t%3===0)for(const c of G.alive()){const b=c.flags&&c.flags.choBo;if(!b)continue;if(s.t-b.t>60){delete c.flags.choBo;continue}
    if(P[s.loc.p].nat!==b.nat||c.job!=='none'||c.away||!G.vacantSeat)continue;if(!G.chance(0.35))continue;const key=G.vacantSeat(c,b.mil,b.mil?Math.max(1,b.ar):Math.min(4,Math.max(0,b.r)));if(key&&G.takeSeat(c,key)){delete c.flags.choBo;G.log(`Triều đình bổ ${c.given} vào ${G.seatName(key)}, đền cho chiếc ghế đã mất vì chiến sự.`,'gd')}}
  chuyenNha()}
/* nhà bị cuốn vào chiến sự của nước mình đang ở */
function chuyenNha(){const s=S(),W=s.w;if(s.journey||(W.cxT||-1e9)>s.t)return;const nat=P[s.loc.p].nat;const w=W.wars.find(z=>z.a===nat||z.b===nat);if(!w||!w.chiem)return;const hd=G.head();if(!hd||hd.away)return;
  const dich=w.a===nat?w.b:w.a;const here=s.loc.p;const sat=giu(w,here)===dich||ke(here).some(q=>giu(w,q)===dich&&(P[q].nat===nat||(w.chiem||{})[q]))||(w.front||[]).includes(here);
  const L=[];if(sat)L.push(['cx_giac_den',hd,0.16]);
  const quan=G.alive().find(c=>G.inClan(c)&&c.job==='quan'&&c.seat&&!c.away&&(()=>{const T=H.seatTm(c.seat);return T&&(T.tag==='dan'||T.tag==='thue')&&(T.r||0)>=2})());if(quan)L.push(['cx_van_luong',quan,0.12]);
  const vo=G.alive().find(c=>G.inClan(c)&&c.job==='quan_ngu'&&(c.lv||0)>=2);if(vo)L.push(['cx_ra_tran',vo,0.16]);
  if(G.tierIdx()>=2)L.push(['cx_quyen_gop',hd,0.05]);
  const buon=G.traders?G.traders()[0]:G.alive().find(c=>G.inClan(c)&&!c.away&&['tieunhi','hangrong','chu'].includes(c.job));if(buon)L.push(['cx_ban_quan_luong',buon,0.07]);
  for(const [id,c,p] of L.sort(()=>Math.random()-0.5))if(G.chance(p)){W.cxT=s.t+9;G.enqueue('ev',c.id,{ev:id,data:{wid:w.id,nat}});break}}
/* ---------- hiển thị ---------- */
/* lãnh thổ: mỗi điểm trên đất liền thuộc về khu gần nhất, tô màu nước đang giữ khu ấy; vẽ một lần rồi lưu lại cho tới khi đất đổi chủ */
let NHO=null,KHOA='';
function lanhTho(){const khoa=Object.keys(P).map(p=>P[p].nat).join();if(khoa===KHOA&&NHO!=null)return NHO;const ids=Object.keys(P);const o=6,R2=60*60,W=900/o,Hh=Math.ceil(700/o);const o2=[];
  for(let j=0;j<Hh;j++){o2[j]=[];for(let i=0;i<W;i++){const cx=i*o+o/2,cy=j*o+o/2;let best=null,bd=R2;for(const p of ids){const dx=P[p].x-cx,dy=P[p].y-cy,d=dx*dx+dy*dy;if(d<bd){bd=d;best=p}}o2[j][i]=best?P[best].nat:null}}
  const theo={};let bg='',bo='';
  for(let j=0;j<Hh;j++){let tu=null,x0=0;for(let i=0;i<=W;i++){const n=i<W?o2[j][i]:null;if(n!==tu){if(tu)(theo[tu]=theo[tu]||[]).push(`M${x0*o} ${j*o}h${(i-x0)*o}v${o}h${-(i-x0)*o}z`);tu=n;x0=i}
    if(i<W){const a=o2[j][i],r=i+1<W?o2[j][i+1]:null,d=j+1<Hh?o2[j+1][i]:null;
      if(a){if(!r)bo+=`M${(i+1)*o} ${j*o}v${o}`;else if(r!==a)bg+=`M${(i+1)*o} ${j*o}v${o}`;if(!d)bo+=`M${i*o} ${(j+1)*o}h${o}`;else if(d!==a)bg+=`M${i*o} ${(j+1)*o}h${o}`}
      else{if(r)bo+=`M${(i+1)*o} ${j*o}v${o}`;if(d)bo+=`M${i*o} ${(j+1)*o}h${o}`}}}}
  KHOA=khoa;NHO=Object.entries(theo).map(([n,d])=>`<path d="${d.join('')}" fill="${D.NAT[n].col}" fill-opacity="0.42" shape-rendering="crispEdges" pointer-events="none"/>`).join('')+`<path d="${bo}" fill="none" stroke="#7d7360" stroke-width="1" stroke-opacity="0.6" pointer-events="none"/><path d="${bg}" fill="none" stroke="#5a2a1c" stroke-width="2.2" stroke-linecap="square" pointer-events="none"/>`;return NHO}
function moTa(w){const e=G.esc;const A=chiemCua(w,w.a),B=chiemCua(w,w.b);return `${A.length?`<br><small>${e(tenN(w.a))} đang chiếm: ${A.map(p=>e(tenP(p))).join(', ')}</small>`:''}${B.length?`<br><small>${e(tenN(w.b))} đang chiếm: ${B.map(p=>e(tenP(p))).join(', ')}</small>`:''}${(w.tran||[]).slice(0,3).map(x=>`<br><small class="muted">${e(x.s)}</small>`).join('')}`}
function cuongVuc(){const e=G.esc;const W=S().w;const tong=Object.values(P).reduce((a,x)=>a+(x.dt||1),0);const L=Object.keys(D.NAT).filter(n=>khu(n).length).map(n=>{const k=khu(n);const dt=k.reduce((a,p)=>a+(P[p].dt||1),0);return {n,so:k.length,pc:Math.round(dt*1000/tong)/10}}).sort((a,b)=>b.pc-a.pc);
  const doi=(W.doi||[]).slice(0,5).map(x=>`<li><small>Năm ${Math.floor(x.t/12)+1}: ${e(tenP(x.p))} từ ${e(tenN(x.tu))} sang ${e(tenN(x.sang))}</small></li>`).join('');
  const xung=(W.xung||[]).map(x=>`<li><small>Xung đột biên giới: ${e(tenN(x.a))} và ${e(tenN(x.b))} ở ${x.front.map(p=>e(tenP(p))).join(', ')}</small></li>`).join('');
  return `${xung?`<ul class="plain">${xung}</ul>`:''}<p class="kvline" style="margin-top:8px"><b>Cương vực</b></p><ul class="plain">${L.map(x=>`<li>${e(tenN(x.n))} · ${x.so} khu · ${x.pc}% đất trong thiên hạ</li>`).join('')}</ul>${doi?`<p class="kvline" style="margin-top:8px"><b>Đất đã đổi chủ</b></p><ul class="plain">${doi}</ul>`:''}`}
function dauBanDo(){const W=S().w;const out=[];(W.wars||[]).forEach(w=>{for(const p in (w.chiem||{})){const A=P[p];out.push(`<circle cx="${A.x}" cy="${A.y}" r="11" fill="none" stroke="${D.NAT[w.chiem[p]].col}" stroke-width="4" stroke-dasharray="3 3" pointer-events="none"/>`)}});return out.join('')}
window.BN_CT={bind(g,h){G=g;H=h},tick:mo=>H.w_tension(mo),apNat,bien,tienTuyen,suc,no,dangXung,chien,chienDich,ketCuc,doiChu,month,chuyenNha,moTa,cuongVuc,dauBanDo,lanhTho,khu,KINH};
/* ================= sự kiện ================= */
window.EVF.push(g=>{G=g;const {fx,esc,chance}=g;const m=v=>g.mm(v);const FM=v=>g.fmtMoney(v);const N=c=>esc(c.given);
 const W=d=>{const w=d&&S().w.wars.find(z=>z.id===d.wid);return w||null};const dich=(w,d)=>w.a===d.nat?w.b:w.a;
 const gop=(w,n,v)=>{w.gop=w.gop||{};w.gop[n]=cl((w.gop[n]||0)+v,-25,25)};const dong=v=>`<span class="fx"><span class="${v>0?'up':'down'}">Sức quân triều đình ${v>0?'+':''}${v}</span></span>`;
 const noi=(a,b,c)=>{const n=g.noiO?g.noiO():'lang';return n==='thanh'?c:n==='tran'?b:a};
 const ev=(id,t,x,o)=>({id,t,k:'Chiến sự',fixed:1,tags:{},x:(c,d)=>W(d)?x(c,d,W(d)):'Chiến sự đã qua.',o:(c,d)=>W(d)?o(c,d,W(d)):[{l:'Thôi',f:()=>''}]});
 const man=d=>d&&d.qk?g.seatMan(d.qk,d.qn):null;
 return [
 ev('cx_van_luong','Vận lương cho đại quân',(c,d,w)=>`Quân ${esc(tenN(d.nat))} đang đánh nhau với ${esc(tenN(dich(w,d)))}. Hịch thúc lương tới nha môn ${N(c)}: trong hai tháng phải gom đủ thóc và phu, thiếu thì trị theo quân pháp.`,
  (c,d,w)=>[
   {l:'Tự đi từng hạt đốc thúc, kê rõ từng thạch',r:[{_g:1,tri:0.7,m:0.5},58],y:cc=>{gop(w,d.nat,5);return 'Lương tới đủ, đúng hạn. Tên được ghi trong tấu của chủ tướng.'+dong(5)+fx(cc,{cong:20,fame:8,suc:-4})},n:cc=>{gop(w,d.nat,-3);cc.flags.noPromoUntil=S().t+24;return 'Mưa làm lầy đường, lương tới trễ.'+dong(-3)+fx(cc,{fame:-6,tam:-8})}},
   {l:'Bắt dân đóng gấp, đánh đòn kẻ chậm',ax:{rong:-2},f:cc=>{gop(w,d.nat,4);const st=S();if(st.dyn&&d.nat==='trieu')st.dyn.dt=Math.max(0,(st.dyn.dt||50)-3);return 'Lương đủ. Dân trong hạt sẽ nhớ mùa này rất lâu.'+dong(4)+fx(cc,{cong:14,fame:-14,liem:-3})}},
   {l:'Dâng sớ xin giảm số, giữ lại thóc giống cho dân',ax:{rong:2,gan:1},r:[{_g:1,tri:0.5,eq:0.6},44],y:cc=>{gop(w,d.nat,-2);return 'Triều đình chuẩn cho giảm. Dân lập sinh từ.'+dong(-2)+fx(cc,{fame:20,cfame:8})},n:cc=>{gop(w,d.nat,-4);cc.flags.noPromoUntil=S().t+36;return 'Sớ bị phê là làm lỡ quân cơ.'+dong(-4)+fx(cc,{fame:8,cong:-15,tam:-10})}},
   {l:'Bớt một phần lương bỏ túi',h:1,ax:{tiet:-2,tin:-2},r:[{_g:1,muu:0.9},52],y:cc=>{gop(w,d.nat,-6);const v=m(24);S().money+=v;H.qtAdd(cc,{cor:20,risk:10});return `Sổ làm khéo, ${FM(v)} vào nhà. Lính ngoài mặt trận ăn cháo.`+dong(-6)+fx(cc,{liem:-16})},n:cc=>{gop(w,d.nat,-6);H.qtAdd(cc,{cor:20,risk:45,fav:-30,crime:4});return 'Quân nhu quan đong lại, thiếu quá nửa. Đây là tội chém đầu trong lúc đánh giặc.'+dong(-6)+fx(cc,{fame:-30,liem:-16,tam:-20})}}]),
 ev('cx_ra_tran','Nhận lệnh xuất trận',(c,d,w)=>{const mt=mucTieu(w,d.nat);d.muc=mt&&mt.p;d.lay=mt&&mt.lay;return mt?`Soái trướng giao ${N(c)} đem quân ${mt.lay?'giành lại':'đánh vào'} ${esc(tenP(mt.p))}. Bên kia là quân ${esc(tenN(dich(w,d)))}, đã đắp lũy chờ sẵn.`:`Chiến tuyến đang giằng co, ${N(c)} được giao giữ trại.`},
  (c,d,w)=>d.muc?[
   {l:'Xung phong đi đầu',ax:{gan:2},r:[{_g:1,vo:0.9,suc:0.4},46],y:cc=>{thangTran(w,d.nat,d.muc,d.lay);return `Cờ cắm trên mặt thành ${esc(tenP(d.muc))}.`+fx(cc,{merit:60,fame:20,vo:2})},n:cc=>{gop(w,d.nat,-3);return 'Phá lũy không thành, bản thân trúng tên.'+dong(-3)+fx(cc,{suc:-R(18,40),hpMax:-R(0,4),merit:10,tam:-10})}},
   {l:'Vòng đường rừng, đánh vào sau lưng',r:[{_g:1,tri:0.8,muu:0.5},40],y:cc=>{thangTran(w,d.nat,d.muc,d.lay);return `Quân địch trở tay không kịp, ${esc(tenP(d.muc))} đổi cờ trong một đêm.`+fx(cc,{merit:55,tri:2,fame:15})},n:cc=>'Lạc mất đường, về tới nơi thì lỡ giờ hẹn.'+fx(cc,{merit:-10,fame:-8,tam:-8})},
   {l:'Giữ quân, đợi viện binh rồi mới đánh',ax:{tiet:1},f:cc=>{gop(w,d.nat,2);return 'Quân không hao, nhưng chủ tướng chép trong sổ hai chữ chậm trễ.'+dong(2)+fx(cc,{merit:4,fame:-4})}}]
   :[{l:'Đắp lũy, luyện quân',f:cc=>{gop(w,d.nat,2);return 'Trại giữ vững.'+dong(2)+fx(cc,{merit:12,vo:1})}}]),
 ev('cx_quyen_gop','Quyên góp quân lương',(c,d,w)=>`${noi('Lý trưởng gõ mõ gọi cả làng ra đình','Nha môn dán cáo thị giữa chợ trấn','Quan phủ gửi thiếp tới từng nhà có máu mặt trong thành')}: chiến sự với ${esc(tenN(dich(w,d)))} kéo dài, triều đình xin các nhà góp lương.`,
  (c,d,w)=>[
   {l:`Góp hậu, đứng đầu bảng (${FM(m(40))})`,c:()=>g.money()>=m(40),f:cc=>{S().money-=m(40);gop(w,d.nat,5);return 'Tên họ nhà mình đứng đầu bảng vàng.'+dong(5)+fx(cc,{fame:25,cfame:15})}},
   {l:`Góp vừa phải như mọi nhà (${FM(m(10))})`,c:()=>g.money()>=m(10),f:cc=>{S().money-=m(10);gop(w,d.nat,1);return 'Đủ bổn phận.'+dong(1)+fx(cc,{fame:4})}},
   {l:'Cáo nghèo, không góp',f:cc=>'Người đi thu nhìn kho nhà mình rồi ghi vài chữ vào sổ.'+fx(cc,{fame:-8,cfame:-4})}]),
 ev('cx_ban_quan_luong','Quân cần mua hàng',(c,d,w)=>`Quân nhu quan tìm tới ${N(c)}: đại quân cần lương khô, vải và muối, ${noi('mua gom cả vùng quê','mua hết hàng trong trấn','đặt mua ở các cửa hiệu lớn trong thành')}. Chiến tranh làm giá nhảy từng ngày.`,
  (c,d,w)=>[
   {l:'Bán giá ngày thường',ax:{rong:1,tin:2},f:cc=>{gop(w,d.nat,3);const v=m(8);S().money+=v;return `Lời ít, được tiếng là nhà buôn có nghĩa. Lãi ${FM(v)}.`+dong(3)+fx(cc,{fame:14,cfame:6})}},
   {l:'Bán theo giá chiến tranh',f:cc=>{const v=m(22);S().money+=v;return `Thu ${FM(v)}. Người ta bắt đầu gọi nhà mình là kẻ làm giàu trên máu lính.`+fx(cc,{fame:-6,qltri:2})}},
   {l:'Trộn hàng hỏng vào lô lớn',h:1,ax:{tin:-3},r:[{_g:1,muu:0.9},48],y:cc=>{gop(w,d.nat,-4);const v=m(40);S().money+=v;return `Lô hàng qua trót lọt, thu ${FM(v)}.`+dong(-4)+fx(cc,{liem:-14})},n:cc=>{gop(w,d.nat,-4);const v=Math.min(S().money,m(40));S().money-=v;return 'Bị phát giác ngay tại quân doanh: tịch thu hàng, phạt tiền, bêu tên.'+dong(-4)+fx(cc,{fame:-30,cfame:-18,liem:-14,tam:-18})}},
   {l:'Cất hàng, không bán cho bên nào',f:cc=>'Hàng nằm trong kho, chờ giá.'+fx(cc,{tam:-2})}]),
 ev('cx_giac_den','Giặc tới sát nơi ở',(c,d,w)=>`Khói bốc ở chân trời. Quân ${esc(tenN(dich(w,d)))} chỉ còn cách nhà mấy ngày đường. ${noi('Dân làng gồng gánh, kẻ chạy kẻ ở','Phố chợ đóng cửa, người ta chôn bạc dưới nền nhà','Cổng thành sắp đóng, trong ngoài đều rối')}.`,
  (c,d,w)=>[
   {l:noi('Đứng ra lập đội dân binh giữ làng','Cùng các nhà buôn lập đội giữ phố','Đưa người nhà lên mặt thành giữ cửa'),ax:{gan:2},r:[{_g:1,vo:0.6,eq:0.5},44],y:cc=>{gop(w,d.nat,3);return 'Giặc thấy có phòng bị nên đi vòng. Cả vùng nhớ ơn.'+dong(3)+fx(cc,{fame:30,cfame:20,tam:5})},n:cc=>{const lost=Math.round(S().money*0.2);S().money-=lost;return 'Phòng tuyến vỡ, nhà bị cướp phá.'+fx(cc,{suc:-R(15,35),tam:-18})}},
   {l:`Nộp bạc lo lót cho yên cửa (${FM(Math.max(m(15),Math.round(S().money*0.12)))})`,c:()=>g.money()>=Math.max(m(15),Math.round(S().money*0.12)),f:cc=>{S().money-=Math.max(m(15),Math.round(S().money*0.12));return 'Một lá cờ nhỏ cắm trước cổng, giặc đi qua không vào.'+fx(cc,{fame:-10,liem:-6})}},
   {l:'Dắt cả nhà chạy lánh vào núi một thời gian',f:cc=>{const lost=Math.round(S().money*0.1);S().money-=lost;G.alive().filter(q=>G.inClan(q)&&!q.away).forEach(q=>G.addStat(q,'tam',-5));return 'Người còn đủ. Về tới nơi thì đồ đạc đã bị khuân gần hết.'+fx(cc,{tam:-8})}}]),
 {id:'cx_doi_chu',t:'Đất nhà đổi chủ',k:'Chiến sự',fixed:1,tags:{},
  x:(c,d)=>{const co=(d.mat||[]).length;return `${esc(tenP(d.p))} đã cắt về ${esc(tenN(d.sang))}. Sáng ra, cờ trên ${noi('đình làng','công sở trấn','cổng thành')} đã đổi.${co?' Ấn tín của triều cũ trong nhà không còn giá trị: người đang làm quan, làm tướng mất chức.':''} Cả họ phải chọn đứng về đâu.`},
  o:(c,d)=>{const ds=()=>(d.mat||[]).map(z=>({z,q:G.P(z.pid)})).filter(x=>x.q&&x.q.dead==null);const o=[];
   o.push({l:'Ở lại, nhận triều mới',ax:{cc:-1},f:cc=>{let them='';ds().forEach(({z,q})=>{q.liem=Math.max(0,(q.liem||50)-6);const key=G.vacantSeat&&G.vacantSeat(q,z.mil,z.mil?Math.max(1,z.ar-1):Math.min(4,Math.max(0,z.r-2)));if(key&&G.takeSeat(q,key))them+=` ${esc(q.given)} ra hàng, được cho giữ ${esc(G.seatName(key))}.`;else them+=` ${esc(q.given)} ra hàng nhưng triều mới chưa cho ghế.`});return `Nhà ở nguyên, ruộng vườn còn đó.${them}`+fx(cc,{fame:ds().length?-18:-3,cfame:ds().length?-10:0,tam:-6})}});
   o.push({l:'Ở lại làm dân, không ra làm quan cho triều mới',ax:{cc:2,thanh:1},f:cc=>`Đóng cửa, treo ấn. ${ds().length?'Trong vùng người ta nhắc đến nhà mình với vẻ kính nể, còn quan mới thì để mắt.':'Cuộc sống tiếp tục dưới lá cờ lạ.'}`+fx(cc,{fame:ds().length?16:2,cfame:ds().length?12:0,tam:-8})});
   o.push({l:`Bỏ nhà chạy về đất còn của ${tenN(d.tu)}`,f:cc=>{const here=S().loc.p;const L=khu(d.tu).map(q=>({q,r:D.route(here,q,(S().t%12)+1)})).filter(x=>x.r).sort((a,b)=>a.r.thang-b.r.thang);const dich=L[0]&&L[0].q;if(!dich)return 'Không còn đường nào về đất cũ, đành ở lại.'+fx(cc,{tam:-10});
     const kq=H.startMove(dich,P[dich].k==='lang'?0:1,true);ds().forEach(({z,q})=>{q.flags.choBo={nat:d.tu,r:z.r,ar:z.ar,mil:z.mil,t:S().t}});return `${kq||`Cả nhà lên đường về ${esc(tenP(dich))}.`}${ds().length?' Triều cũ sẽ xét bổ lại cho người đã không hàng.':''}`+fx(cc,{fame:ds().length?10:0,tam:-8})}});
   return o}},
 {id:'cx_tran_bien',t:'Đụng trận ở biên',k:'Chiến sự',fixed:1,tags:{},
  x:(c,d)=>`Ở ${esc(tenP(d.p))} hai bên chưa tuyên chiến mà đã rút gươm. Một toán quân bên kia lấn qua cột mốc ngay phiên ${N(c)} canh.`,
  o:()=>[{l:'Đánh bật chúng về bên kia mốc',r:[{_g:1,vo:0.8,suc:0.3},62],y:cc=>'Toán kia bỏ chạy, để lại cờ và ngựa.'+fx(cc,{merit:25,fame:8,vo:1}),n:cc=>'Đánh lâu không phân thắng bại, người bị thương.'+fx(cc,{suc:-R(8,22),merit:5})},
    {l:'Giữ thế, cho người phi ngựa về báo',f:cc=>'Viện binh tới, hai bên gườm nhau rồi rút.'+fx(cc,{merit:8,tri:1})},
    {l:'Ra gặp tướng bên kia nói chuyện phải trái',r:[{_g:1,eq:0.8,khau:0.6},44],y:cc=>'Hai bên cùng lui một dặm. Không ai phải chết.'+fx(cc,{merit:10,eq:3,fame:10}),n:cc=>'Lời chưa dứt thì tên đã bay.'+fx(cc,{suc:-R(10,24),fame:-4,tam:-6})}]}
 ]});
})();
