/* Bách Niên Thế Gia v6.7.10-d9.12 · engine-rg.js: SỔ NGƯỜI QUEN (người thật có vai trò) và ĐỒ THỊ QUAN HỆ (kế hoạch d9.12 mục 3.1 và 3.2).
   Mở rộng sổ NPC có sẵn (S.np) chứ không dựng cấu trúc song song. Người thật có: tên, giới, tuổi, chỉ số, nghề, vai trò (ban_than, an_nhan, quy_nhan, ket_nghia, thay, mon_sinh, doi_thu, nguoi_thuong, khach, cao_nhan, an_si, lang_gieng, huong_truong...),
   quan hệ với cả nhà (rel) và ký ức ngắn (ky). Mỗi vai có tác dụng cơ học qua G.tie.bonus và các sự kiện tie_* (ev-d912b.js) do tieYear gọi.
   Đồ thị S.rg.e: cạnh có kiểu giữa hai nút ('p:<id>' người nhà, 'n:<id>' NPC, 'h:<id>' họ khác): G.rg.set / get / of. Lan truyền hằng năm: hỗ trợ trong gia tộc (anh em giúp nhau) và hậu quả từ sổ người quen.
   Luật: mọi lời kể có người có tên phải gọi G.tie.ensure (R1); mọi lời hứa 'về sau' phải qua G.tie.later hoặc G.later (R2); kết quả đổi quan hệ hiện dòng fx(c,{qh:[tên,n]}) (R3). */
window.ENGX=window.ENGX||[];
window.ENGX.push(X=>{
const {R,chance,log,alive,inClan,P,pick,clamp,later,enqueue,age,esc,mm}=X;
const G=X.EC.G;const S=()=>X.S;
const root=()=>{const s=S();s.np=s.np||{n:0,l:{}};s.rg=s.rg||{e:{},yc:0,yt:-1};return s};
const VAI={ban_than:'bạn thân',an_nhan:'ân nhân',quy_nhan:'quý nhân',ket_nghia:'anh em kết nghĩa',thay:'thầy',mon_sinh:'môn sinh',doi_thu:'đối thủ',nguoi_thuong:'người thương',khach:'khách quen',cao_nhan:'cao nhân',an_si:'ẩn sĩ',lang_gieng:'láng giềng',huong_truong:'hương trưởng',quen:'người quen',tinh_dich:'tình địch',thuong_nhan:'thương nhân',thay_thuoc:'thầy thuốc',tuong:'tướng',thuoc_ha:'thuộc hạ',phe_chu:'người đứng đầu phe',nguoi_lam:'người làm'};
const NG={ban_than:'bạn từ thuở nhỏ',an_nhan:'người từng nhận ơn nhà',quy_nhan:'người có thế',ket_nghia:'kết nghĩa',thay:'thầy',cao_nhan:'cao nhân ẩn mình',an_si:'ẩn sĩ',thay_thuoc:'thầy thuốc',doi_thu:'kẻ có hiềm khích'};
/* ---------- sổ người quen ---------- */
function ensure(c,o){o=o||{};const s=root();
  if(o.key){const ex=Object.values(s.np.l).find(n=>n.key===o.key&&n.ok!==0);if(ex){if(o.vai&&!ex.vai.includes(o.vai)){ex.vai.push(o.vai);ex.vaiTxt=ex.vai.map(v=>VAI[v]||v).join(', ')}return ex}}
  const g=o.g||(chance(0.5)?'nam':'nữ');
  const n=G.np.new({n:o.name,g,age:o.age||R(24,60),role:o.role||'quen'});
  const ti=o.tier!=null?o.tier:Math.max(0,Math.min(6,G.tierIdx()+R(-1,1)));
  const base=35+ti*4;const rs=()=>clamp(Math.round(base+R(-12,28)),20,100);
  n.st=Object.assign({tri:rs(),vo:rs(),mi:rs(),eq:rs()},o.st||{});
  if(o.main)n.st[o.main]=Math.max(n.st[o.main],R(70,92));
  n.vai=[].concat(o.vai||'quen');n.vaiTxt=o.vaiTxt||n.vai.map(v=>VAI[v]||v).join(', ');n.nghe=o.nghe||NG[n.vai[0]]||'';n.job=o.job||null;n.tier=ti;n.key=o.key||null;
  n.rel=o.rel!=null?o.rel:10;n.on=0;n.oan=0;n.ky=[];n.loc=(s.loc&&s.loc.p)||null;n.src=c?c.id:null;
  if(o.why)note(n,o.why);return n}
const get=id=>G.np.get(id);
function note(n,t){n.ky=n.ky||[];n.ky.push({t:S().t,x:String(t).slice(0,80)});if(n.ky.length>6)n.ky.shift()}
/* đổi quan hệ với cả nhà; trả về cặp [tên, n] để đặt vào fx(c,{qh:...}) */
function rel(n,d,why){if(!n)return ['',0];const o=n.rel||0;n.rel=clamp(o+d,-100,100);const dv=Math.round(n.rel-o);if(why)note(n,why);if(dv>=5&&!n.vai.includes('doi_thu')&&n.rel<-40&&!n.vai.includes('doi_thu')){n.vai.push('doi_thu');n.vaiTxt=n.vai.map(v=>VAI[v]||v).join(', ')}return [n.n,dv]}
function on(n,d){n.on=Math.max(0,(n.on||0)+d)}
function oan(n,d){n.oan=Math.max(0,(n.oan||0)+d);if(n.oan>=30&&!n.vai.includes('doi_thu')){n.vai.push('doi_thu');n.vaiTxt=n.vai.map(v=>VAI[v]||v).join(', ')}}
const act=vai=>Object.values(root().np.l).filter(n=>n.ok!==0&&n.vai&&n.vai.includes(vai));
/* tác dụng cơ học của vai trò: số người ở vai có rel từ mức min trở lên */
const bonus=(vai,min)=>act(vai).filter(n=>(n.rel||0)>=(min==null?30:min)).length;
/* hậu sự gắn người: sau months tháng gọi sự kiện evId cho người c, kèm npc để hiện thẻ */
function laterNpc(n,c,evId,months,extra){later(c,evId,months,Object.assign({npc:n.id},extra||{}))}
/* ---------- đồ thị quan hệ (cạnh có kiểu) ---------- */
const K=(a,b,k)=>a+'|'+b+'|'+k;
function rgSet(a,b,k,d,why){const s=root();const key=K(a,b,k);const e=s.rg.e[key]||(s.rg.e[key]={w:0,t:S().t,why:[]});e.w=clamp(e.w+d,-100,100);e.t=S().t;if(why){e.why.push(String(why).slice(0,60));if(e.why.length>4)e.why.shift()}return e.w}
const rgGet=(a,b,k)=>{const e=root().rg.e[K(a,b,k)];return e?e.w:0};
const rgOf=node=>Object.entries(root().rg.e).filter(([k])=>k.startsWith(node+'|')||k.includes('|'+node+'|')).map(([k,e])=>({k,w:e.w,why:e.why,t:e.t}));
/* ---------- hằng năm: người quen tìm đến, gia tộc giúp nhau ---------- */
const TIEACT={ /* vai: [xác suất mỗi năm, sự kiện, điều kiện rel] */
 ban_than:[0.10,'tie_ban_nho',-100],an_nhan:[0.09,'tie_an_nhan_tra',10],quy_nhan:[0.10,'tie_quy_nhan_giup',20],ket_nghia:[0.11,'tie_ket_nghia_giup',10],
 thay:[0.07,'tie_thay_tham',10],thuoc_ha:[0.10,'tie_thuoc_ha',-100],an_si:[0.04,'tie_cao_nhan_ve',5],doi_thu:[0.12,'tie_doi_thu_hai',-100],cao_nhan:[0.04,'tie_cao_nhan_ve',10],lang_gieng:[0.05,'tie_lang_gieng',-100]};
function tieYear(){const s=root();s.rg.yc=0;
  const L=Object.values(s.np.l).filter(n=>n.ok!==0&&n.vai&&n.vai.length);
  for(const n of L){const a=G.np.age(n);if(a<14)continue;
    for(const v of n.vai){const T=TIEACT[v];if(!T)continue;if(s.rg.yc>=2)break;
      if(v==='doi_thu'?(n.rel>-10&&(n.oan||0)<10):(n.rel||0)<T[2])continue;
      if(chance(T[0])){const h=alive().filter(p=>inClan(p)&&!p.away&&age(p)>=16);const tgt=h.length?pick(h):null;if(!tgt)continue;
        if(!X.EVMAP[T[1]])continue;
        if((s.cool&&(s.cool[T[1]]||-1e9)>s.t&&false))continue;
        enqueue('ev',tgt.id,{ev:T[1],data:{npc:n.id}});s.rg.yc++}}}
  rgFamilyYear()}
/* anh chị em giúp nhau: người khó khăn, người khác trong nhà dư dả và có tình thì giúp; không tình thì làm ngơ và sinh oán */
function rgFamilyYear(){const L=alive().filter(p=>inClan(p)&&!p.inLaw);const done={};
  for(const p of L){if(age(p)<18||p.away)continue;
    const needy=(p.purse||0)<mm(2)&&(p.job==='none'||p.job==='huu'||p.suc<35);if(!needy)continue;
    const sibs=L.filter(q=>q.id!==p.id&&q.dead==null&&age(q)>=20&&!q.away&&(q.parents||[]).some(x=>(p.parents||[]).includes(x))&&(q.purse||0)>mm(25));
    if(!sibs.length)continue;const q=pick(sibs);const w=rgGet('p:'+q.id,'p:'+p.id,'anh_em')+20;
    if(done[p.id])continue;done[p.id]=1;
    if(w>=25&&chance(0.4)){const v=Math.round(mm(8));q.purse-=v;p.purse=(p.purse||0)+v;rgSet('p:'+q.id,'p:'+p.id,'anh_em',6,'giúp lúc khó');rgSet('p:'+p.id,'p:'+q.id,'anh_em',10,'được giúp lúc khó');log(`${q.surname} ${q.given} bớt tiền riêng giúp ${p.given} lúc túng thiếu (anh chị em).`,'gd')}
    else if(w<5&&chance(0.3)){rgSet('p:'+p.id,'p:'+q.id,'anh_em',-6,'bị làm ngơ lúc khó');log(`${p.given} xin giúp mà ${q.given} làm ngơ, tình anh chị em thêm nguội.`)}}}
/* ---------- tình duyên: lập lịch để chắc chắn xảy ra (d9.12; kế hoạch mục 3.6). Luật mục 3: mở đầu chỉ cho người 18 đến 25 tuổi, có tài, có đức, dễ rung động tùy tính cách (romOk, romP trong engine). Trước đây chỉ trông vào bốc ngẫu nhiên nên 84 năm có 0 mối tình ---------- */
function romYear(){const s=S();const open=G.ROM_OPEN().filter(id=>X.EVMAP[id]&&/^tinh_(hoi_xuan|thu_tinh|thanh_mai|tieu_thu)$/.test(id));if(!open.length)return;
  alive().filter(c=>inClan(c)&&!c.inLaw&&!c.spouse&&!c.away&&!c.left&&age(c)>=18&&age(c)<=25&&G.romOk(c)).forEach(c=>{
    c.flags=c.flags||{};if(c.flags.yeu||(c.flags.romT!=null&&s.t-c.flags.romT<36))return;
    const p=0.12+(G.romP(c)-0.5)*0.2;if(chance(Math.max(0.05,Math.min(0.3,p)))){c.flags.romT=s.t;const id=pick(open);enqueue('ev',c.id,{ev:id,data:{}})}})}
/* ---------- THUẾ (d9.12; kế hoạch mục 3.3; chủ dự án 24/11: "thuế áp đặt lên gia tộc từ đầu, có đoạn triều đình miễn hoặc tăng thuế, quan lại lạm quyền đặt thêm thuế"). Làm lại hệ thuế đã bỏ ở d0, sửa CLAUDE.md mục 9. Thu mỗi mùa thu (tháng 10), mức chuẩn theo bậc gia thế nhân thu nhập năm, miễn giảm theo phẩm tước, chính sách triều đình đổi theo thời thế ---------- */
const TAXR=[0.04,0.05,0.06,0.07,0.08,0.09,0.10];const POLF={thuong:1,giam:0.5,mien:0,tang:1.4};
const POLN={thuong:'thuế như mọi năm',giam:'giảm một nửa',mien:'miễn thuế',tang:'tăng thuế'};
const taxS=()=>{const s=S();s.tax=s.tax||{pol:'thuong',until:-1,owed:0,hist:[]};return s.tax};
function taxEx(){let e=0;alive().filter(p=>inClan(p)&&p.dead==null).forEach(p=>{if(p.job==='quan'&&p.lv>=1)e+=0.04*(p.lv+1);if(p.job==='quan_ngu'&&p.lv>=3)e+=0.03*(p.lv-1);if(p.tuoc>0)e+=0.05*p.tuoc});return Math.min(0.6,e)}
function taxBase(){return Math.max(0,Math.round(G.totalIncome()*12*TAXR[Math.min(6,G.tierIdx())]*(1-taxEx())))}
function taxSetPol(k,months){const t=taxS();t.pol=k;t.until=S().t+(months||12)}
function taxPolicy(){const t=taxS(),s=S();if(t.until>s.t)return;const d=s.dyn||{};let k='thuong';
  if(d.newT!=null&&s.t-d.newT<=24)k='mien';else if(((d.qk!=null&&d.qk<30)||s.war)&&chance(0.5))k='tang';else if(chance(0.05))k='mien';else if(chance(0.08))k='giam';
  t.pol=k;t.until=s.t+12;if(k!=='thuong')log('Triều đình năm nay '+POLN[k]+(k==='tang'?', vì quốc khố hụt hoặc có chiến sự.':'.'),'hi')}
function taxCollect(){const t=taxS(),s=S();if(!X.S||!s.money&&s.money!==0)return;const base=taxBase();const due=Math.round(base*(POLF[t.pol]||1))+Math.round((t.owed||0)*1.2);
  if(due<=0){t.hist.push({y:Math.floor(s.t/12),due:0,pol:t.pol});t.owed=0;if(t.pol==='mien')log('Năm nay triều đình miễn thuế, nhà không phải nộp.','gd');return}
  const pay=Math.min(due,Math.max(0,s.money));s.money-=pay;t.owed=due-pay;t.hist.push({y:Math.floor(s.t/12),due,pay,pol:t.pol,base});if(t.hist.length>8)t.hist.shift();
  log('Thuế mùa thu ('+POLN[t.pol]+'): nộp '+X.money(pay)+(t.owed>0?', còn nợ '+X.money(t.owed)+' (năm sau tính thêm 20%)':'')+(taxEx()>0.01?'; nhà có phẩm tước được miễn giảm '+Math.round(taxEx()*100)+'%':'')+'.','gd');
  if(t.owed>0)X.fn&&0}
function taxYear(){taxPolicy();const s=S();/* quan huyện lạm thu: người làm quan thật ở sổ (vai quan_huyen) có tham thì đặt thuế phụ */
  if(!s.biz&&!G.tierIdx())return;if(chance(0.07+(s.war?0.05:0))&&X.EVMAP.thu_lam_thu&&G.tierIdx()>=1){const h=alive().find(p=>p.id===s.head);if(h)enqueue('ev',h.id,{ev:'thu_lam_thu',data:{}})}}
G.tax={base:taxBase,ex:taxEx,state:taxS,pol:taxSetPol,POLN};
/* thu nhập của chức võ sư dân binh và chủ võ đường (v641_vo_do) */
function statusYear(){alive().filter(p=>inClan(p)&&p.dead==null&&p.flags).forEach(p=>{if(p.flags.vosinh){p.purse=(p.purse||0)+mm(1.5)*3}if(p.flags.vodduong){p.purse=(p.purse||0)+mm(4);if(chance(0.1))G.addStat(p,'vo',1)}})}
X.yearly.push(tieYear,romYear,taxYear,statusYear);Object.assign(X.fn,{taxCollect});
Object.assign(G,{tie:{ensure,get,rel,on,oan,act,bonus,later:laterNpc,note,VAI},rg:{set:rgSet,get:rgGet,of:rgOf}});
Object.assign(X.fn,{tieYear,rgFamilyYear});
});
