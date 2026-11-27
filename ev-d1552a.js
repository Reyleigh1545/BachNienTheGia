/* Bách Niên Thế Gia · 7.0.0-d.1.5.52 · TRIỀU ĐÌNH SỐNG THẬT (đợt D; chủ dự án 27/11: "các thế lực quan lại phải có những NPC thực tế hợp tác với nhau, các thế lực phải thực sự tranh đấu với nhau … Quan trường ở Thiên Kinh căng thẳng và gay gắt nhất,
   nhưng cũng là nơi nghiêm nhặt nhất vì nằm ngay dưới mắt Thiên Tử … có những hệ thống quyền lực của Hoàng Đế tra xét, kiểm tra, theo dõi, những nơi khác cũng có nhưng yếu hơn", "dù đã có NPC hoàng tộc, quan lại, quyền quý nhưng không thấy có đóng góp gì vào gameplay").
   Phe quan lấy chính người đang giữ ghế thật (S.off, trường f). Engine đưa các hàm trong qua BN_CD.bind(G, cầu). */
(function(){
let G=null,H=null;const S=()=>G.S();const R=(a,b)=>G.R(a,b);const pk=a=>a[Math.floor(Math.random()*a.length)];const cl=(v,a,b)=>Math.max(a,Math.min(b,v));const P=()=>window.D.PROV;
const natOf=p=>P()[p]?P()[p].nat:'trieu';
const kinhOf=nat=>nat==='trieu'?'thien_kinh':(window.BN_VQ&&window.BN_VQ.KINH[nat]);
function vuaNghi(nat){if(nat==='trieu'){const d=S().dyn;return (d&&d.k&&d.k.nghi)||40}const v=S().vq&&S().vq[nat];return v?v.vua.nghi:30}
/* ---------- tai mắt của vua: 1 là ngay dưới mắt thiên tử ---------- */
const SOI_C={};
function soi(p){if(!P()[p])return 0.5;const nat=natOf(p),k=kinhOf(nat);let base;if(p===k)base=1;else{let t=SOI_C[p+nat];if(t==null){const r=window.D.route(k,p,6);t=SOI_C[p+nat]=r?r.thang:6}base=Math.max(0.25,0.78-0.09*t)}
  if(nat!=='trieu')base*=0.75;return cl(base+(vuaNghi(nat)-45)/220,0.15,1.2)}
const soiC=c=>soi((H&&H.placeOf(c))||S().loc.p);
const soiTxt=v=>v>=0.85?'rất nghiêm, tai mắt của vua có ở khắp nha môn':v>=0.6?'nghiêm, tuần án qua lại luôn':v>=0.42?'vừa, thỉnh thoảng có người về tra':'lơi lỏng, trời cao vua xa';
/* ---------- phe quan: người thật ---------- */
const ghe=key=>{const T=H.seatTm(key),w=H.seatWh(key);return T&&w?{T,w}:null};
function trongNuoc(nat,minR){const out=[];const off=S().off||{};for(const key in off){const o=off[key];if(!o||o.vac||o.holder||o.pham)continue;const g=ghe(key);if(!g||g.T.mil||g.T.tag==='y'||(g.T.r||0)<minR||natOf(g.w.p)!==nat)continue;out.push({key,o,r:g.T.r||0,p:g.w.p})}return out}
function thanhVien(k,nat){return trongNuoc(nat,4).filter(x=>x.o.f===k).sort((a,b)=>b.r-a.r||(b.o.ab||0)-(a.o.ab||0))}
const dau=(k,nat)=>thanhVien(k,nat)[0]||null;
/* triều đình mỗi nước phải có đủ người thật ở ghế cao: tạo một lần, ưu tiên kinh đô, mỗi phe ít nhất ba người */
function gieo(nat){if(!H||!S())return;S().cd=S().cd||{seeded:{},hist:[]};const kinh=kinhOf(nat);let L=trongNuoc(nat,5);
  if(!S().cd.seeded[nat]||L.length<14){S().cd.seeded[nat]=1;const keys=[];for(const tid of Object.keys(H.OFFICES)){const T=H.OFFICES[tid];if(T.mil||T.tag==='y'||(T.r||0)<5)continue;for(const key of H.DX.seatKeys(tid,nat))keys.push({key,r:T.r,k:(H.seatWh(key)||{}).p===kinh?1:0})}
    keys.sort((a,b)=>b.k-a.k||b.r-a.r||Math.random()-0.5);let n=0;for(const z of keys){if(n>=20)break;const cu=S().off&&S().off[z.key];if(cu){if(cu.vac&&!cu.holder&&S().t-(cu.vacT||0)>6){H.mkHolder(H.seatTm(z.key),cu);cu.vac=false;cu.since=S().t;delete cu.why}if(!cu.vac&&!cu.holder)n++;continue}const st=H.offState(z.key);if(st.vac){st.vac=false;delete st.why}n++}L=trongNuoc(nat,5)}
  /* phe nào còn dưới ba người thì có người từ phe đông nhất ngả sang */
  for(const k of H.FACK){for(let i=0;i<3;i++){const co=L.filter(x=>x.o.f===k).length;if(co>=3)break;const dong=H.FACK.map(f=>L.filter(x=>x.o.f===f)).sort((a,b)=>b.length-a.length)[0];if(!dong||dong.length<co+2)break;pk(dong).o.f=k}}
  if(nat===natOf(S().loc.p)){const C=H.court();for(const k of H.FACK){const d=dau(k,nat);if(d)C.f[k].lead=d.o.n}}}
function suc(k,nat){return thanhVien(k,nat).reduce((a,x)=>a+(x.r-3)*((x.o.ab||60)/80),0)}
function ghiSu(nat,s,to){S().cd=S().cd||{seeded:{},hist:[]};S().cd.hist.unshift({t:S().t,nat,s});if(S().cd.hist.length>20)S().cd.hist.pop();if(to&&natOf(S().loc.p)===nat)H.qtLog('Phe cánh đấu đá',G.esc(s))}
const tenPhe=k=>H.FAC[k]?H.FAC[k].n:'';
const GHET={thanh:'quyen',quyen:'thanh',hoang:'quyen',thuc:null};
/* một đòn giữa hai phe: người cụ thể hặc người cụ thể */
function don(nat,A,B,ep){const a=dau(A,nat);const mb=thanhVien(B,nat);if(!a||!mb.length)return null;const t=ep||pk(mb.slice(0,6));if(!t||t.o===a.o)return null;const C=H.court();
  const p=cl(0.35+((a.o.ab||60)-(t.o.ab||60))/200+((t.o.liem||50)<40?0.2*(0.5+soi(t.p)):(t.o.liem||50)>70?-0.15:0)+(C.f[A].pow-C.f[B].pow)/250,0.08,0.85);
  const gheT=H.seatName(t.key),cu=t.o.n,chuA=a.o.n,chucA=H.seatName(a.key);
  if(Math.random()<p){const why=`phe ${tenPhe(A)} hặc đổ`;const np=t.o.np&&H.npGet(t.o.np);H.officerDepose({st:t.o,np},why);delete t.o.np;if(Math.random()<0.5){const moi=H.mkHolder(H.seatTm(t.key));moi.f=A;Object.keys(t.o).forEach(z=>delete t.o[z]);Object.assign(t.o,moi,{vac:false,since:S().t})}
    C.f[A].pow=cl(C.f[A].pow+3,5,95);C.f[B].pow=cl(C.f[B].pow-4,5,95);ghiSu(nat,`${chuA}, ${chucA}, cầm đầu phe ${tenPhe(A)}, hặc đổ ${cu}, ${gheT}, người phe ${tenPhe(B)}`,t.r>=6);return {ok:true,t,cu}}
  if(Math.random()<0.4){const yeu=thanhVien(A,nat).slice(-1)[0];if(yeu&&yeu!==a){const ten=yeu.o.n,g2=H.seatName(yeu.key);const np=yeu.o.np&&H.npGet(yeu.o.np);H.officerDepose({st:yeu.o,np},'vu cáo bị phản tọa');delete yeu.o.np;C.f[A].pow=cl(C.f[A].pow-4,5,95);ghiSu(nat,`phe ${tenPhe(A)} hặc ${cu} không thành, ${ten}, ${g2}, đứng tên sớ bị phản tọa mất chức`,t.r>=6)}}
  else ghiSu(nat,`phe ${tenPhe(A)} hặc ${cu}, ${gheT}, nhưng không lay chuyển được`,false);
  return {ok:false,t,cu}}
const quanNha=()=>G.alive().filter(c=>G.inClan(c)&&c.job==='quan'&&c.seat&&!c.away);
const bacGhe=c=>(H.seatTm(c.seat)||{}).r||0;
function hen(c,id,data){if((c.flags.cdT||-1e9)>S().t)return false;c.flags.cdT=S().t+24;G.enqueue('ev',c.id,{ev:id,data});return true}
const dulieu=(x,them)=>Object.assign({qk:x.key,qn:x.o.n},them||{});
/* ---------- mỗi năm ---------- */
function year(){if(!H||!S()||!S().dyn)return;const nha=natOf(S().loc.p);const C=H.court();
  for(const nat of new Set(['trieu',nha])){gieo(nat);
    /* thế mỗi phe theo người thật đang có */
    if(nat===nha){const tong=H.FACK.reduce((a,k)=>a+suc(k,nat),0)||1;for(const k of H.FACK){C.f[k].pow=Math.round(cl(C.f[k].pow*0.7+(suc(k,nat)/tong)*200*0.3,5,95));const d=dau(k,nat);if(d)C.f[k].lead=d.o.n}}
    const loan=(nat==='trieu'&&S().dyn.cr)?2:(S().vq&&S().vq[nat]&&S().vq[nat].tranh?2:0);const so=1+loan+(vuaNghi(nat)>=55?1:0);
    for(let i=0;i<so;i++){if(Math.random()>0.7)continue;
      const W=H.FACK.map(k=>({k,w:1+suc(k,nat)}));let r=Math.random()*W.reduce((a,x)=>a+x.w,0);let A=W[0].k;for(const x of W){r-=x.w;if(r<=0){A=x.k;break}}
      const B=GHET[A]&&Math.random()<0.65?GHET[A]:pk(H.FACK.filter(k=>k!==A));
      /* nhà có người cùng phe ra đòn thì có thể được nhờ góp tay: việc chờ người ấy quyết */
      if(nat===nha){const me=quanNha().find(c=>bacGhe(c)>=2&&H.qtOf(c).f===A&&(c.flags.cdT||-1e9)<=S().t);const mb=thanhVien(B,nat);
        if(me&&mb.length&&Math.random()<0.4){const t=pk(mb.slice(0,5));if(hen(me,'cd_phe_nho_tay',dulieu(t,{A,B})))continue}
        const bi=quanNha().find(c=>bacGhe(c)>=2&&H.qtOf(c).f===B&&(c.flags.cdT||-1e9)<=S().t);const ma=thanhVien(A,nat);
        if(bi&&ma.length&&Math.random()<0.3){const t=pk(ma.slice(0,4));if(hen(bi,'cd_bi_phe_nham',dulieu(t,{A})))continue}}
      don(nat,A,B)}}
  rieng(nha);quyenQuy(nha);theLuc();
}
/* người cầm việc tra xét: một quan án sát đang ngồi ghế thật, ưu tiên cùng khu */
function nguoiTra(c,nat){const p=H.placeOf(c);const ks=H.DX.seatKeys('ansat',nat).filter(k=>k!==c.seat);if(!ks.length)return null;const key=ks.find(k=>(H.seatWh(k)||{}).p===p)||ks[0];let o=H.offState(key);if(o.holder||o.pham)return null;if(o.vac){H.mkHolder(H.seatTm(key),o);o.vac=false;o.since=S().t;delete o.why}return {key,o}}
/* việc riêng đến với từng quan trong nhà */
function rieng(nha){for(const c of quanNha()){if((c.flags.cdT||-1e9)>S().t)continue;const q=H.qtOf(c),r=bacGhe(c),s=soiC(c);const cq=natOf(H.placeOf(c));
  const L=[];
  if(!q.f&&r>=2){const k=pk(H.FACK);const d=dau(k,cq);if(d)L.push(['cd_moi_phe',0.1*(0.6+s),dulieu(d,{A:k})])}
  if(q.f&&r>=2){const d=dau(q.f,cq);if(d)L.push(['cd_de_bat',0.07,dulieu(d,{A:q.f})])}
  const an=nguoiTra(c,cq);if(an)L.push(['cd_mat_tham',s*0.045+(q.cor||0)/320*s+((c.liem||50)<45?0.05*s:0),dulieu(an)]);
  if(r>=4&&H.inKinh(c)&&q.fav>=55){const T=trongNuoc(cq,Math.max(4,r)).filter(x=>x.o.f!==q.f);if(T.length)L.push(['cd_mat_phung',0.08,dulieu(pk(T))])}
  if(window.BN_TL){const f=window.BN_TL.o(H.placeOf(c)).find(x=>window.BN_TL.LOAI[x.loai].nh==='cuop'&&x.pow>=30);if(f)L.push(['cd_cuop_hoi_lo',0.12*(1.15-s*0.6),{fz:f.id}])}
  for(const [id,p,data] of L.sort(()=>Math.random()-0.5))if(Math.random()<p){hen(c,id,data);break}}}
/* quyền quý, hoàng thân nhà đã quen: thân thì đỡ, ghét thì đì. Mỗi năm tối đa một việc. */
function quyenQuy(nha){const L=[];const s=S();
  if(nha==='trieu'&&s.dyn.fam){const f=s.dyn.fam;const rn={hau:'Hoàng hậu',thai:'Thái hậu',phi:'Phi',tu:'Hoàng tử',cong:'Công chúa',vuong:'Thân vương',qc:'Quốc công'};
    [f.hau,f.thai].concat(f.phi,f.tu,f.cong,f.vuong,f.qc).forEach(p=>{if(p&&p.dead==null&&p.met&&p.age>=14&&Math.abs(p.rel||0)>=25)L.push({ten:`${rn[p.role]||''} ${p.sur&&['hau','thai','phi','qc'].includes(p.role)?p.sur+' ':''}${p.n}`,rel:p.rel})})}
  if(nha!=='trieu'&&s.np)for(const n of Object.values(s.np.l))if(n.ok!==false&&String(n.ref||'').startsWith('vq:'+nha+':')&&Math.abs(n.rel||0)>=25)L.push({ten:n.vaiTxt?`${n.vaiTxt} ${n.n}`:n.n,rel:n.rel});
  if(!L.length)return;const x=pk(L);if(Math.random()>0.1+Math.abs(x.rel)/400)return;const q=quanNha()[0]&&pk(quanNha());const buon=G.alive().find(c=>G.inClan(c)&&!c.away&&['buon','thuong','tieunhi','chu'].includes(c.job));const v=G.mm(8);
  if(x.rel>0){if(q){H.qtAdd(q,{risk:-R(10,22),fav:R(3,8)});q.cong=(q.cong||0)+R(4,10);G.log(`${x.ten} nói đỡ cho ${q.given} trước mặt thượng quan: được tin hơn, bớt bị soi.`,'gd')}
    else if(buon){s.money+=v;G.log(`${x.ten} giới thiệu cho ${buon.given} một mối hàng lớn, lãi thêm ${G.fmtMoney(v)}.`,'gd')}
    else{s.fame+=3;G.log(`${x.ten} nhắc tới nhà mình giữa tiệc, tiếng tăm thêm một chút.`,'gd')}}
  else{if(q){H.qtAdd(q,{risk:R(10,22),fav:-R(4,9)});G.log(`${x.ten} nói xấu ${q.given} trước mặt thượng quan: bị soi kỹ hơn.`,'hi')}
    else if(buon){const m2=Math.min(s.money,v);s.money-=m2;G.log(`${x.ten} cho người chặn mối hàng của ${buon.given}, thiệt ${G.fmtMoney(m2)}.`,'hi')}
    else{s.fame-=3;G.log(`${x.ten} buông lời chê nhà mình, thiên hạ nghe theo.`,'hi')}}}
/* quan địa phương, hoàng thân và thế lực: quan tham che cho cướp, quan giỏi đè cướp, thân vương có ý riêng ngầm nuôi */
function theLuc(){const T=window.BN_TL;if(!T)return;const theo={};for(const key in (S().off||{})){const o=S().off[key];if(!o||o.vac||o.holder||o.pham)continue;const w=H.seatWh(key);if(w)(theo[w.p]=theo[w.p]||[]).push({key,o})}
  const vg=(S().dyn.fam&&S().dyn.fam.vuong)||[];
  for(const f of T.song()){if(T.LOAI[f.loai].nh!=='cuop')continue;const L=theo[f.p]||[];const tham=L.find(x=>(x.o.liem||50)<28);const giam=L.find(x=>(x.o.liem||50)>=65&&(x.o.ab||60)>=70);
    if(tham){f.baoChe={n:tham.o.n,key:tham.key};f.pow=cl(f.pow+3,0,100)}else delete f.baoChe;
    if(giam&&Math.random()<0.35*(0.6+soi(f.p))){f.pow=cl(f.pow-7,0,100);if(f.p===S().loc.p)G.log(`${giam.o.n}, ${H.seatName(giam.key)}, đem quân càn ${f.n}.`)}
    /* quan che cướp bị tai mắt triều đình phát giác */
    if(f.baoChe&&Math.random()<0.05*soi(f.p)){const x=L.find(z=>z.o.n===f.baoChe.n);if(x){const ten=x.o.n,g=H.seatName(x.key);const np=x.o.np&&H.npGet(x.o.np);H.officerDepose({st:x.o,np},'bị phát giác thông đồng với giặc cướp');delete x.o.np;delete f.baoChe;f.pow=cl(f.pow-10,0,100);ghiSu(natOf(f.p),`${ten}, ${g}, bị phát giác thông đồng với ${f.n}`,f.p===S().loc.p)}}
    const v=vg.find(z=>z.dead==null&&z.td==='nghi'&&z.land===f.p);if(v){f.chuSau=v.id;f.pow=cl(f.pow+3,0,100)}else delete f.chuSau}
  /* phiên trấn là đất của một thân vương: người đứng đầu theo đúng hoàng tộc, không tự đặt "phiên vương" riêng */
  for(const f of T.song()){if(f.loai!=='phientran')continue;const v=vg.find(z=>z.dead==null&&z.land===f.p);f.hoangThan=v?v.id:null}}
/* ---------- tranh ngôi nhiều phía (Đại Nguyễn) ---------- */
function thamVong(p){if(p.tv==null)p.tv=R(10,95);if(p.muu==null)p.muu=R(28,92);if(p.tai==null)p.tai=R(30,90);return p}
const duTranh=p=>{thamVong(p);return p.dead==null&&p.age>=16&&p.tv>=60&&Math.max(p.tai,p.muu)>=55};
/* trả về {A,B,them:[…]} hoặc null nếu không đủ hai người có sức và có chí; hard: cuối đời vua đầu thì phải có hai */
function chonTranh(F,hard){const all=F.tu.concat(F.vuong).filter(p=>p.dead==null);let L=all.filter(duTranh).sort((a,b)=>(b.tai+b.muu+(b.role==='tu'?20:0))-(a.tai+a.muu+(a.role==='tu'?20:0)));
  if(L.length<2){if(!hard)return null;const con=all.filter(p=>!L.includes(p)&&p.age>=12).sort((a,b)=>(b.tai||0)-(a.tai||0));while(L.length<2&&con.length){const p=thamVong(con.shift());p.tv=Math.max(p.tv,R(66,90));p.muu=Math.max(p.muu,R(60,85));L.push(p)}}
  return {L:L.slice(0,4)}}
/* mỗi phe chọn một người để phò */
function phoNgoi(cr){const keys=['a','b','c','d'].filter(k=>cr[k]);cr.pho={};cr.pho.hoang='a';cr.pho.quyen='b';for(const f of ['thanh','thuc']){cr.pho[f]=keys.length>2&&Math.random()<0.65?pk(keys.slice(2)):pk(keys)}
  for(const k of keys.slice(2))if(!Object.values(cr.pho).includes(k))cr.pho[pk(['thanh','thuc'])]=k}
const baoTro=(cr,k)=>{if(!cr.pho)return 0;const C=H.court();return Object.entries(cr.pho).filter(([f,v])=>v===k).reduce((a,[f])=>a+(C.f[f]?C.f[f].pow:0)*0.22,0)};
function ketQua(cr){return ['a','b','c','d'].filter(k=>cr[k]).map(k=>({k,v:cr[k].pow+baoTro(cr,k)+R(-20,20)})).sort((a,b)=>b.v-a.v)[0].k}
function crTxt(cr){return ['a','b','c','d'].filter(k=>cr[k]).map(k=>{const ph=Object.entries(cr.pho||{}).filter(([f,v])=>v===k).map(([f])=>tenPhe(f));return cr[k].n+(ph.length?`, được phe ${ph.join(' và ')} phò`:', chưa phe nào theo')}).join('; ')}
/* ---------- khung trang Thế giới ---------- */
function panel(p){if(!H||!P()[p])return '';const e=G.esc;const nat=natOf(p);gieo(nat);const v=soi(p);const nhaCo=natOf(S().loc.p)===nat&&(quanNha().some(c=>bacGhe(c)>=4)||!!window.BN_ADMIN);
  const phe=H.FACK.map(k=>{const L=thanhVien(k,nat);if(!L.length)return '';const d=L[0];const them=L.slice(1,4).map(x=>`${e(x.o.n)}, ${e(H.seatName(x.key))}`).join('; ');
    return `<li><b>${tenPhe(k)}</b> · đứng đầu: ${e(d.o.n)}, ${e(H.seatName(d.key))}${nhaCo&&them?`<br><small class="muted">Vây cánh: ${them}${L.length>4?` và ${L.length-4} người nữa`:''}</small>`:''}</li>`}).join('');
  const hist=((S().cd||{}).hist||[]).filter(h=>h.nat===nat).slice(0,4).map(h=>`<li><small>Năm ${Math.floor(h.t/12)+1}: ${e(h.s)}</small></li>`).join('');
  return `<section class="card"><span class="eyebrow">Quan trường ${e(window.D.NAT[nat].n)}</span><p class="kvline">Tai mắt triều đình ở ${e(P()[p].n)}: <b>${soiTxt(v)}</b></p><ul class="plain">${phe}</ul>${hist?`<span class="eyebrow">Đấu đá gần đây</span><ul class="plain">${hist}</ul>`:''}</section>`}
window.BN_CD={bind(g,h){G=g;H=h},soi,soiC,soiTxt,year,gieo,thanhVien,dau,don,chonTranh,phoNgoi,ketQua,crTxt,duTranh,panel,theLuc,quyenQuy,trongNuoc};
/* ================= sự kiện ================= */
window.EVF.push(g=>{G=g;const {fx,esc,chance}=g;const m=v=>g.mm(v);const FM=v=>g.fmtMoney(v);const N=c=>esc(c.given);
 const man=d=>d&&d.qk?g.seatMan(d.qk,d.qn):null;const ten=d=>esc(d.qn||'Người ấy');const gheT=d=>d&&d.qk?esc(g.seatName(d.qk)):'';
 const rel=(n,v,why)=>{if(n)g.tie.rel(n,v,why)};
 const q=c=>H.qtOf(c);const qa=(c,o)=>H.qtAdd(c,o);const C=()=>H.court();
 const pheF=(k,v)=>{const F=C().f[k];if(F)F.pow=cl(F.pow+v,5,95)};
 const muc=c=>{const v=soiC(c);return v>=0.85?'ngay dưới mắt Thiên Tử':v>=0.55?'ở nơi tuần án qua lại luôn':'ở nơi xa kinh'};
 const nguoiGhe=(id,t,x,o)=>({id,t,k:'Triều đình',fixed:1,tags:{},job:['quan'],x:(c,d)=>{const n=man(d);if(n)d.npc=n.id;return n?x(c,d,n):'Người ấy đã rời ghế, chuyện không còn.'},o:(c,d)=>{const n=man(d);return n?o(c,d,n):[{l:'Thôi',f:()=>''}]}});
 const roi=(d,why)=>{const st=S().off&&S().off[d.qk];if(!st||st.vac||st.holder||st.n!==d.qn)return false;H.officerDepose({st,np:st.np&&H.npGet(st.np)},why);delete st.np;return true};
 return [
 nguoiGhe('cd_moi_phe','Lời mời nhập phe',(c,d)=>`${ten(d)}, giữ chức ${gheT(d)}, người đứng đầu phe ${esc(tenPhe(d.A))}, cho người mời ${N(c)} qua phủ. Làm quan ${muc(c)} mà không có ai đứng sau thì khó yên, đứng về một phe thì ba phe kia nhìn khác.`,
  (c,d,n)=>[
   {l:`Bái ${d.qn} làm tọa sư, vào phe ${tenPhe(d.A)}`,f:cc=>{H.qtJoin(cc,d.A);rel(n,25,'nhận làm môn sinh');g.tie.on(n,6);pheF(d.A,2);return `Từ nay trong triều người ta gọi ${N(cc)} là người của ${ten(d)}.`+fx(cc,{tam:3,fame:3})}},
   {l:'Cảm tạ, xin được làm việc đã rồi mới tính',r:[{_g:1,eq:0.8,khau:0.4},62],y:cc=>{rel(n,4,'từ chối khéo');return 'Người ấy cười, bảo cửa phủ lúc nào cũng mở.'+fx(cc,{eq:2})},n:cc=>{rel(n,-15,'bị từ chối nhập phe');return 'Chén trà chưa uống hết đã được tiễn khách.'+fx(cc,{tam:-5})}},
   {l:'Dâng sớ tâu việc kết bè lên trên',ax:{thanh:1},r:[{_g:1,tri:0.6,gan:0.5},35],y:cc=>{rel(n,-60,'bị tâu việc kết bè');g.tie.oan(n,25);pheF(d.A,-12);qa(cc,{fav:20});return 'Vua đọc sớ rất lâu. Phe ấy bị răn đe, còn mình được ghi tên là người không bè đảng.'+fx(cc,{liem:5,fame:10,cong:10})},n:cc=>{rel(n,-70,'bị tâu việc kết bè');g.tie.oan(n,30);qa(cc,{risk:30,fav:-8});return 'Sớ bị giữ lại, còn tên người viết thì đến tai đúng người bị tố.'+fx(cc,{tam:-10})}}]),
 nguoiGhe('cd_phe_nho_tay','Phe mình ra tay',(c,d)=>`Người của phe ${esc(tenPhe(d.A))} đưa tới tờ sớ hặc ${ten(d)}, giữ chức ${gheT(d)}, người phe ${esc(tenPhe(d.B))}. Cần thêm chữ ký và việc làm của ${N(c)}.`,
  (c,d,n)=>[
   {l:'Tự mình gom chứng cứ cho thật chắc rồi ký',r:[{_g:1,tri:0.8,muu:0.5},48],y:cc=>{rel(n,-60,'bị hặc đổ');g.tie.oan(n,25);roi(d,'bị hặc đổ');pheF(d.A,5);pheF(d.B,-6);qa(cc,{fav:8,loy:15});ghiSu(natOf(H.placeOf(cc)),`phe ${tenPhe(d.A)} hặc đổ ${d.qn}, chứng cứ do ${cc.surname} ${cc.given} gom`,true);return `${ten(d)} mất chức. Trong phe, tên ${N(cc)} từ nay được nhắc đầu tiên.`+fx(cc,{cong:18,fame:6})},n:cc=>{rel(n,-45,'bị gom chứng cứ hặc mình');g.tie.oan(n,20);qa(cc,{risk:22,loy:6});g.later(cc,'qs_tra_thu',R(12,40),{qk:d.qk,qn:d.qn,npc:d.npc});return `Chứng cứ có chỗ hở, ${ten(d)} lật lại được. Người ấy nhớ rất rõ ai đã đi gom.`+fx(cc,{tam:-8,fame:-5})}},
   {l:'Chỉ ký tên theo mọi người',f:cc=>{const duoc=chance(0.45);rel(n,-30,'ký sớ hặc mình');if(duoc){roi(d,'bị hặc đổ');pheF(d.A,3);pheF(d.B,-3)}qa(cc,{loy:6,risk:duoc?4:10});return duoc?`Tờ sớ qua được, ${ten(d)} mất chức.`+fx(cc,{cong:6}):'Tờ sớ bị bác. Người ký tên nào cũng bị ghi lại.'+fx(cc,{tam:-4})}},
   {l:'Khước từ, việc này mình không làm',ax:{cc:1,thanh:1},f:cc=>{qa(cc,{loy:-22});if(q(cc).loy<=15){const k=q(cc).f;H.qtJoin(cc,null);return `Phe ${esc(tenPhe(k))} coi ${N(cc)} không còn là người nhà.`+fx(cc,{liem:4,tam:-6})}return 'Người đưa sớ gật đầu, cuộn giấy lại, không nói thêm.'+fx(cc,{liem:3,tam:-3})}},
   {l:`Ngầm báo cho ${d.qn} biết trước`,h:1,r:[{_g:1,muu:0.8,eq:0.4},52],y:cc=>{rel(n,45,'được cứu khỏi đòn hặc');g.tie.on(n,18);g.later(cc,'qs_tra_on',R(18,60),{qk:d.qk,qn:d.qn,npc:d.npc});return `${ten(d)} kịp thủ tiêu chỗ hở. Món nợ này người ấy không quên.`+fx(cc,{eq:2,liem:-2})},n:cc=>{rel(n,25,'được báo trước');const k=q(cc).f;H.qtJoin(cc,null);qa(cc,{risk:30});return `Chuyện báo tin bị lộ. Phe ${esc(tenPhe(k))} gạch tên ${N(cc)} và quay sang soi.`+fx(cc,{fame:-12,tam:-10})}}]),
 nguoiGhe('cd_bi_phe_nham','Bị phe đối địch nhắm vào',(c,d)=>`${ten(d)}, giữ chức ${gheT(d)}, người phe ${esc(tenPhe(d.A))}, đang cho người lục lại từng việc ${N(c)} đã làm. Đòn này nhắm vào cả phe, mà mình là chỗ mỏng nhất.`,
  (c,d,n)=>{const k=q(c).f;const chu=k?dau(k,natOf(H.placeOf(c))):null;const v=m(12);return [
   {l:'Đem sổ sách ra đối chất công khai',r:[{_g:1,tri:0.8,khau:0.5},(c.liem||50)>=65?66:40],y:cc=>{rel(n,-25,'bị đối chất mà thua');pheF(d.A,-3);qa(cc,{risk:-15,fav:8});return 'Từng khoản đều có chứng. Người đi lục lại thành kẻ vu cáo.'+fx(cc,{fame:10,cong:8})},n:cc=>{rel(n,-10,'đối chất');qa(cc,{risk:28});cc.flags.noPromoUntil=S().t+24;return 'Có những khoản không giải thích được.'+fx(cc,{fame:-12,tam:-10})}},
   ...(chu&&chu.o.n!==c.surname+' '+c.given?[{l:`Cầu ${chu.o.n} đứng ra che`,r:[{_g:1,eq:0.7,khau:0.5},cl(30+C().f[k].pow*0.5+(q(c).loy-50)*0.4,12,85)],y:cc=>{qa(cc,{risk:-18,loy:-12});return `${esc(chu.o.n)} nói một câu giữa triều, đòn ấy dừng lại. Ơn này trong phe sẽ được đòi.`+fx(cc,{tam:4})},n:cc=>{qa(cc,{risk:20,loy:-10});return `${esc(chu.o.n)} bảo lúc này không tiện ra mặt.`+fx(cc,{tam:-9})}}]:[]),
   {l:`Đưa lễ sang phủ người ấy (${FM(v)})`,c:()=>g.money()>=v,f:cc=>{S().money-=v;rel(n,18,'nhận lễ mà tha');qa(cc,{cor:6,risk:-6,loy:-8});return 'Lễ được nhận, việc lục lại ngừng. Cả hai bên đều biết chuyện này có thể bị đem ra bất cứ lúc nào.'+fx(cc,{liem:-8})}},
   {l:`Bỏ phe ${tenPhe(k)}, xin theo phe của người ấy`,h:1,r:[{_g:1,eq:0.8,muu:0.4},45],y:cc=>{H.qtJoin(cc,d.A);qa(cc,{risk:-10,loy:-10});rel(n,15,'thu nhận người bỏ phe');return 'Đổi cờ kịp lúc. Người phe cũ nhìn mình bằng con mắt khác.'+fx(cc,{fame:-10,liem:-5})},n:cc=>{H.qtJoin(cc,null);qa(cc,{risk:26});return 'Bên mới không nhận, bên cũ đã biết.'+fx(cc,{fame:-14,tam:-10})}}]}),
 nguoiGhe('cd_de_bat','Người đứng đầu phe để mắt',(c,d)=>`${ten(d)}, giữ chức ${gheT(d)}, đứng đầu phe ${esc(tenPhe(d.A))}, gọi ${N(c)} vào thư phòng: sang kỳ xét quan, người ấy có thể viết một tờ tiến cử.`,
  (c,d,n)=>[
   {l:'Nhận tiến cử, hứa nghe theo',ax:{tv:2},f:cc=>{rel(n,12,'nhận làm người tin cẩn');H.memP(cc,'tien_cu',{o:null,w:80});cc.flags.noPromoUntil=0;qa(cc,{loy:18,fav:5});return `Tờ tiến cử được viết. Từ nay việc của ${esc(tenPhe(d.A))} cũng là việc của ${N(cc)}.`+fx(cc,{cong:20,fame:5})}},
   {l:'Xin được đi lên bằng công của mình',ax:{thanh:2},f:cc=>{rel(n,-4,'từ chối tiến cử');qa(cc,{loy:-10});return 'Người ấy nhìn một lúc rồi bảo: người như thế trong phe hiếm, mà cũng khó dùng.'+fx(cc,{liem:4,fame:4})}},
   {l:`Biếu một khoản để chắc suất (${FM(m(15))})`,c:()=>g.money()>=m(15),f:cc=>{S().money-=m(15);rel(n,18,'được biếu hậu');H.memP(cc,'tien_cu',{o:null,w:95});cc.flags.noPromoUntil=0;qa(cc,{cor:10,loy:10});return 'Bạc đi trước, tiến cử theo sau. Sổ bên ấy cũng ghi.'+fx(cc,{liem:-10,cong:26})}}]),
 {id:'cd_mat_tham',t:'Tai mắt của vua',k:'Triều đình',fixed:1,tags:{},job:['quan'],
  x:(c,d)=>{const n=man(d);if(!n)return 'Người ấy đã rời ghế, chuyện không còn.';d.npc=n.id;const v=soiC(c);const ai=`${ten(d)}, giữ chức ${gheT(d)}`;return v>=0.85?`Người hầu mới vào phủ ${N(c)} chưa được một tháng, tối nào cũng ghi chép. Lần theo thì ra người ấy do ${ai}, cài vào để tâu thẳng lên trên. Ở ngay dưới mắt Thiên Tử, câu nói lúc say cũng thành chữ.`:v>=0.55?`${ai}, vi hành qua hạt, ăn mặc như khách buôn, đã hỏi thăm chuyện ${N(c)} ở ba quán trà liền.`:`Lâu lắm trên mới có người đi tra. ${ai}, ghé qua, hỏi qua loa mấy việc ${N(c)} đã làm, mắt thì nhìn vào mâm cơm.`},
  o:(c,d)=>{if(!man(d))return [{l:'Thôi',f:()=>''}];const v=soiC(c),k=q(c);const sach=(c.liem||50)>=60&&(k.cor||0)<10;return [
   {l:'Mở hết sổ sách, nhà cửa cho tra',f:cc=>{if(sach){qa(cc,{fav:Math.round(6+14*v),risk:-18});return 'Tra không ra gì ngoài một nếp nhà giản dị. Tờ mật tấu gửi về toàn lời tốt.'+fx(cc,{fame:Math.round(4+8*v),cong:Math.round(6+10*v)})}qa(cc,{risk:Math.round(12+26*v)});return 'Có những thứ lẽ ra không nên có trong nhà một ông quan.'+fx(cc,{fame:-8,tam:-10})}},
   {l:`Đãi hậu, kèm một phong bao (${FM(m(Math.round(6+14*v)))})`,c:()=>g.money()>=m(Math.round(6+14*v)),r:[{_g:1,eq:0.7,khau:0.5},Math.round(cl(85-v*55,18,75))],y:cc=>{S().money-=m(Math.round(6+14*v));qa(cc,{cor:6,risk:-10});return 'Phong bao biến vào tay áo. Tờ tấu viết mấy chữ không có gì lạ.'+fx(cc,{liem:-8})},n:cc=>{S().money-=m(Math.round(6+14*v));qa(cc,{cor:10,risk:Math.round(20+25*v),fav:-12});return 'Phong bao được gói nguyên, gửi thẳng về kinh làm tang chứng.'+fx(cc,{fame:-14,liem:-8,tam:-14})}},
   {l:'Làm như không biết, giữ miệng giữ mình',r:[{_g:1,tiet:0.6,muu:0.6},sach?72:48],y:cc=>{qa(cc,{risk:-6});return 'Mấy tháng sau người ấy đi, không để lại gì.'+fx(cc,{eq:2,tam:-3})},n:cc=>{qa(cc,{risk:Math.round(8+16*v)});return 'Một câu lỡ lời đã nằm trong tờ mật tấu.'+fx(cc,{tam:-8})}}]}},
 nguoiGhe('cd_mat_phung','Mật chỉ',(c,d)=>`Nội thị đến lúc nửa đêm, dẫn ${N(c)} vào điện bên. Vua hỏi về ${ten(d)}, giữ chức ${gheT(d)}: người ấy có đáng tin không. Câu trả lời sẽ không có người thứ ba nghe, ít ra là hôm nay.`,
  (c,d,n)=>{const xau=(()=>{const st=S().off&&S().off[d.qk];return !!st&&(st.liem||50)<40})();return [
   {l:'Tâu đúng những gì mình biết, tốt nói tốt, xấu nói xấu',r:[{_g:1,tri:0.8,eq:0.4},58],y:cc=>{qa(cc,{fav:18});if(xau){roi(d,'bị vua cách sau mật tấu');rel(n,-40,'mất chức sau mật chỉ');g.tie.oan(n,20);return `Vua cho tra, đúng như lời tâu. ${ten(d)} mất chức. Người ấy đoán ra ai đã vào điện đêm đó.`+fx(cc,{cong:20,fame:5})}rel(n,15,'được nói tốt trước vua');g.tie.on(n,10);return `${ten(d)} vẫn yên ghế, sau này nghe phong thanh ai đã nói tốt cho mình.`+fx(cc,{cong:14,fame:4})},n:cc=>{qa(cc,{fav:-10});return 'Lời tâu lệch với tờ mật báo vua đang cầm. Long nhan không vui.'+fx(cc,{tam:-10})}},
   {l:'Nói nước đôi, không buộc cũng không gỡ cho ai',f:cc=>{qa(cc,{fav:-6});return 'Vua nghe xong, im lặng rất lâu rồi cho lui.'+fx(cc,{tam:-5,eq:1})}},
   {l:`Nhân dịp này nói cho ${d.qn} đổ hẳn`,h:1,ax:{tv:2,tin:-2},r:[{_g:1,khau:0.8,muu:0.6},46],y:cc=>{roi(d,'bị vua cách sau lời gièm');rel(n,-60,'bị gièm mà mất chức');g.tie.oan(n,35);qa(cc,{fav:8,crime:1});g.later(cc,'qs_tra_thu',R(24,70),{qk:d.qk,qn:d.qn,npc:d.npc});return `${ten(d)} mất chức trong tuần. Ghế ấy trống.`+fx(cc,{liem:-10,cong:10})},n:cc=>{qa(cc,{fav:-28,risk:25});return 'Vua đã cho tra trước khi hỏi. Lời gièm thành tội khi quân.'+fx(cc,{liem:-8,fame:-16,tam:-16})}}]}),
 {id:'cd_cuop_hoi_lo',t:'Giặc gửi lễ',k:'Triều đình',fixed:1,tags:{},job:['quan'],
  x:(c,d)=>{const f=window.BN_TL&&window.BN_TL.lay(d.fz);if(f&&!f.chet&&window.BN_TL.the)window.BN_TL.the(d,f,f.chu);return f&&!f.chet?`Một hòm gỗ được đặt trước cửa phủ ${N(c)}. Thư kèm ký tên ${esc(f.chu.n)}, người cầm đầu ${esc(f.n)}: xin đại nhân khi đem lính đi thì đi đường khác.`:'Chuyện ấy đã qua.'},
  o:(c,d)=>{const f=window.BN_TL&&window.BN_TL.lay(d.fz);if(!f||f.chet)return [{l:'Thôi',f:()=>''}];const v=m(18),s=soiC(c);return [
   {l:`Nhận hòm lễ ${FM(v)}, đi đường khác`,h:1,ax:{tiet:-2,tin:-1},f:cc=>{S().money+=v;f.rel=cl(f.rel+35,-100,100);f.pow=cl(f.pow+8,0,100);qa(cc,{cor:18,risk:Math.round(8+20*s)});cc.flags.cheCuop={fz:f.id,t:S().t};return `Hòm được khiêng vào cửa sau. ${esc(f.n)} từ đó coi nhà mình là người quen.`+fx(cc,{liem:-14})}},
   {l:'Trả hòm, đem quân đánh thẳng',r:[{_g:1,tri:0.5,gan:0.6},cl(100-f.pow*0.7,15,75)],y:cc=>{f.pow=cl(f.pow-R(22,40),0,100);f.rel=cl(f.rel-45,-100,100);qa(cc,{fav:10});return `${esc(f.n)} bị đánh tan tác.`+fx(cc,{cong:18,fame:14,liem:5})},n:cc=>{f.rel=cl(f.rel-45,-100,100);f.pow=cl(f.pow+5,0,100);const lost=Math.min(S().money,v);S().money-=lost;return 'Quân đi hụt, đêm ấy nhà bị đốt kho.'+fx(cc,{fame:-6,tam:-12})}},
   {l:'Trả hòm, trình lên cấp trên kèm lá thư',ax:{tiet:1,thanh:1},f:cc=>{f.rel=cl(f.rel-30,-100,100);f.pow=cl(f.pow-8,0,100);qa(cc,{fav:8,risk:-8});return 'Cấp trên khen, hứa sẽ xin binh. Binh thì chưa thấy đâu.'+fx(cc,{cong:8,liem:5,tam:-3})}}]}},
 {id:'cd_hoang_tu_thu_ba',t:'Người thứ ba trong cuộc tranh ngôi',k:'Tranh ngôi',fixed:1,tags:{},
  x:(c,d)=>{const cr=S().dyn&&S().dyn.cr;return cr&&cr.c?`Thiên hạ chỉ nhìn ${esc(cr.a.n)} và ${esc(cr.b.n)}, nhưng người của ${esc(cr.c.n)} lại tìm đến ${N(c)}. Thế cục hiện giờ: ${esc(crTxt(cr))}.`:'Cuộc tranh ngôi đã ngã ngũ.'},
  o:()=>{const cr=S().dyn&&S().dyn.cr;if(!cr||!cr.c)return [{l:'Thôi',f:()=>''}];const o=[];
   if(cr.ours!=='c')o.push({l:`Ngả về ${cr.c.n}, người ít ai để ý`,h:1,f:cc=>{const x=S().dyn.cr;if(!x)return '';x.ours='c';x.act=(x.act||0)+1;x.c.pow=Math.min(100,x.c.pow+10);return 'Phò người yếu thế: thua thì mất nhiều, thắng thì công đầu không ai tranh.'+fx(cc,{tam:-5})}});
   o.push({l:'Tiếp trà, không hứa bên nào',r:[{_g:1,eq:0.9},66],y:cc=>'Người ấy ra về, lời lẽ vẫn êm.'+fx(cc,{eq:2}),n:cc=>{qa(cc,{risk:8});return 'Cuộc gặp đã bị nhìn thấy.'+fx(cc,{tam:-6})}});
   o.push({l:`Báo cho phe ${cr.a.n} biết`,f:cc=>{const x=S().dyn.cr;if(!x||!x.c)return '';x.c.pow=Math.max(5,x.c.pow-12);x.a.pow=Math.min(100,x.a.pow+4);qa(cc,{fav:3});return 'Người thứ ba mất một nước cờ. Người ấy sẽ biết ai đã nói.'+fx(cc,{liem:-3})}});
   return o}}
 ]});
})();
