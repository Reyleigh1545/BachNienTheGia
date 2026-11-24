/* Bách Niên Thế Gia v6.7.10-d9.10 · engine-x.js: phần ENGINE tách ra tệp riêng (mục 12, tách engine thành module, bước đầu).
   Cơ chế: engine.js đẩy ngữ cảnh X (X.S luôn là ván hiện tại, cùng các hàm R, chance, log, alive, inClan, P, head, later, enqueue, mm, nameOf, shuf, pick, clamp) cho mọi hàm trong window.ENGX; hàm hằng năm đăng ký vào X.yearly, hàm cần cho admin vào X.fn.
   Đã tách: giang hồ (ghYear), quân hộ (qhYear), Đông xưởng (dxYear), Thiết khoán (tkYear), chi phí giữ quan hệ (relYear). Nạp sau events-lv.js và trước engine.js. */
window.ENGX=window.ENGX||[];
window.ENGX.push(X=>{
const {R,chance,log,alive,inClan,P,head,later,enqueue,mm,nameOf,shuf,pick,clamp,provN,qtLog,age,fx,esc,money,dateStr,openModal,closeModal,infoPopup,inKinh}=X;
/* d9.10: GIANG HỒ THÀNH HỆ THỐNG. Chiến tranh giữa hai môn phái chạy theo năm (S.wr.gwar: {a,b,t,len,yrs,da,db}); hành động của đệ tử hai phái cộng vào da, db (sự kiện gh_phai_chien); hết chiến tranh thì phái thắng tăng sức mạnh, phái thua giảm, đệ tử hai phái nhận sự kiện gh_chien_ket. Mỗi 10 năm có đại hội định kỳ (gh_hoi_dinh_ky). */
function ghYear(){const S=X.S;const W=S.wr;if(!W||!W.sects||W.sects.length<2)return;const clampP=v=>Math.max(5,Math.min(100,Math.round(v)));
  const w=W.gwar;
  if(w){const a=W.sects.find(s=>s.id===w.a),b=W.sects.find(s=>s.id===w.b);if(!a||!b){W.gwar=null;return}
    w.yrs++;const pa=(a.pow||50)+w.da*4,pb=(b.pow||50)+w.db*4;const d=(pa-pb)/60;
    a.pow=clampP((a.pow||50)+R(-3,3)+Math.round(d*3)-1);b.pow=clampP((b.pow||50)+R(-3,3)-Math.round(d*3)-1);
    /* d9.12.59 (mục 11.B, giang hồ ↔ thế lực tự phát ↔ người ngoài phái): chiến tranh giữa phái lan ra ngoài. (1) phái giao chiến ở điểm nóng thì độ nóng tăng; (2) có thế lực nổi dậy thì phái tà mạnh tiếp sức, phái chính mạnh giúp dẹp; (3) nhà chơi sống trong địa bàn một phái (tỉnh gốc hoặc tỉnh đã chiếm) có thể bị cuốn vào (sự kiện gh_chien_lan, ít nhất 3 năm một lần). */
    [a,b].forEach(sc=>{if(W.hot&&W.heat&&W.hot.includes(sc.p))W.heat[sc.p]=Math.min(100,(W.heat[sc.p]||0)+2)});
    {const nf=(W.tl||[]).filter(fc=>fc.st==='noi');if(nf.length)[a,b].forEach(sc=>{if((sc.pow||50)>=45&&chance(0.5)){const fc=nf.find(x=>x.p===sc.p)||pick(nf);if(sc.al==='ta')fc.pow=Math.min(100,fc.pow+2);else if(sc.al==='chinh')fc.pow=Math.max(0,fc.pow-2)}})}
    /* d9.12.60: cảm tình của nhà chơi với phái (sc.rel, -100..100, đổi qua gh_chien_lan, gh_phai_cau_cuu, gh_phai_doi_no): phái thân mà đang lép vế thì cầu cứu, phái ghét mà đang mạnh thì đòi lễ (bốn năm một lần) */
    if(head()&&S.t-(W.reqT||-999)>=48&&chance(0.3)){const rq=[a,b].find(sc=>(sc.rel||0)>=25&&(sc.pow||50)<=35),rq2=[a,b].find(sc=>(sc.rel||0)<=-25&&(sc.pow||50)>=60);if(rq){W.reqT=S.t;later(head(),'gh_phai_cau_cuu',R(1,6),{s:rq.id})}else if(rq2){W.reqT=S.t;later(head(),'gh_phai_doi_no',R(1,6),{s:rq2.id})}}
    {const dom=sc=>[sc.p].concat(sc.ter||[]);const hp=X.S.loc&&X.S.loc.p;if(hp&&head()&&S.t-(W.lanT||-999)>=36&&[a,b].some(sc=>dom(sc).includes(hp))&&chance(0.4)){const sc=[a,b].find(x=>dom(x).includes(hp));W.lanT=S.t;later(head(),'gh_chien_lan',R(1,8),{s:sc.id,o:(sc===a?b:a).id})}}
    if(w.yrs>=w.len){const win=pa>=pb?a:b,lose=win===a?b:a;win.pow=clampP(win.pow+6);lose.pow=clampP(lose.pow-6);W.gwar=null;W.gwarEnd=S.t;
      /* d9.12.59: phái thắng chiếm thêm địa bàn của phái thua; nơi quyền lực bỏ trống (phái thua) nếu là điểm nóng thì nóng thêm, nơi phái thắng cai quản thì dịu bớt */
      if(lose.p&&lose.p!==win.p&&!(win.ter||[]).includes(lose.p)){win.ter=(win.ter||[]).concat([lose.p]).concat(lose.ter||[]);lose.ter=[];if(W.heat&&W.hot&&W.hot.includes(lose.p))W.heat[lose.p]=Math.min(100,(W.heat[lose.p]||0)+3);if(W.heat&&W.hot&&W.hot.includes(win.p))W.heat[win.p]=Math.max(0,(W.heat[win.p]||0)-2);log(`${win.n} chiếm thêm địa bàn của ${lose.n} ở ${provN(lose.p)}.`,'hi')}

      log(`Cuộc chiến giữa ${win.n} và ${lose.n} kết thúc: ${win.n} thắng thế.`,'gd');
      if(lose.pow<=12){ /* d9.12: phái thua nặng thì tan; đệ tử mất phái và mất bí kíp của phái */
        alive().filter(p=>inClan(p)&&p.flags&&p.flags.ghs===lose.id).forEach(p=>{const bk=p.flags.bk;const keys=bk?Object.keys(bk).filter(k=>bk[k]):[];let lostTxt='';if(keys.length&&chance(0.7)){const k=pick(keys);bk[k]=0;lostTxt=' Bí kíp của phái thất lạc theo.'}p.flags.ghs=null;p.flags.gh=0;log(`${nameOf(p)} mất phái vì ${lose.n} tan rã.${lostTxt}`,'hi')});
        lose.pow=Math.max(lose.pow,15);log(`${lose.n} gần như tan rã sau cuộc chiến, đệ tử tản mác.`,'hi')}
      alive().filter(p=>inClan(p)&&p.flags&&p.flags.ghs&&(p.flags.ghs===win.id||p.flags.ghs===lose.id)&&(p.flags.gh||0)>=1).forEach(p=>later(p,'gh_chien_ket',R(1,8),{s:p.flags.ghs,win:p.flags.ghs===win.id?1:0}))}}
  else if(S.t-(W.gwarEnd||-999)>=60&&chance(0.05+((W.tl||[]).some(f=>f.st==='noi')?0.04:0))){const L=shuf(W.sects.slice());const a=L[0],b=L.find(s=>s!==a);if(a&&b){W.gwar={a:a.id,b:b.id,t:S.t,len:R(2,4),yrs:0,da:0,db:0};log(`Giang hồ dậy sóng: ${a.n} và ${b.n} khai chiến.`,'hi');
    alive().filter(p=>inClan(p)&&p.flags&&(p.flags.ghs===a.id||p.flags.ghs===b.id)&&(p.flags.gh||0)>=1).forEach(p=>later(p,'gh_phai_chien',R(1,10)))}}
  /* đại hội định kỳ mỗi 10 năm cho người đã có tiếng */
  if(S.t>=120&&S.t%120<12&&(W.hoiT||0)<S.t-60){W.hoiT=S.t;alive().filter(p=>inClan(p)&&p.job==='hiep'&&p.lv>=1).forEach(p=>later(p,'gh_hoi_dinh_ky',R(2,10)))}}
/* d9.10: QUÂN HỘ ĐỜI ĐỜI, ĐÔNG XƯỞNG THEO NĂM, THU HỒI THIẾT KHOÁN.
   Quân hộ (S.qh): khi nhà đã nhận giấy gọi quân hộ (cd_19) thì mỗi khoảng 20 đến 25 năm (một đời) phải có một người thật nhập ngũ; hết hạn, người đó chết hoặc về thì nhà bị gọi tiếp (sự kiện qh_phien_linh, chọn người nhà thật). Đông xưởng (S.dx.pow 0 đến 100): lên theo độ nghi kỵ của vua, quan nhà từ Tam phẩm bị dõi theo và tố cáo nhiều hơn khi thế lớn, và vua thanh trừng dễ hơn. Thiết khoán: vua mới hoặc vua nghi kỵ có thể thu lại (tk_thu_hoi). */
function qhYear(){const S=X.S;const q=S.qh;
  if(!q){if(alive().some(p=>inClan(p)&&p.seen&&p.seen['cd_19']))S.qh={on:true,t0:S.t,next:S.t+R(60,120),who:null,pend:false};return}
  if(!q.on)return;
  if(q.who){const w=P(q.who);if(!w||w.dead!=null||!inClan(w)||(w.job!=='quan_ngu'&&S.t-(q.t0||0)>=24)){if(q.who){q.who=null;q.next=Math.min(q.next,S.t+R(12,36));q.pend=false}}}
  if(!q.pend&&!q.who&&S.t>=q.next&&head()){q.pend=true;enqueue('ev',S.head,{ev:'qh_phien_linh',data:{}})}}
function dxYear(){const S=X.S;const d=S.dyn;if(!d||!d.k)return;const DXS=S.dx=S.dx||{pow:30,hi:0};const k=d.k;
  DXS.pow=Math.max(0,Math.min(100,DXS.pow+(k.nghi-50)/25+R(-2,2)-(k.uy>=75?1:0)));
  if(DXS.pow>=70&&!DXS.hi){DXS.hi=1;log('Đông xưởng thế lớn, quan lại trong triều ai cũng dè chừng.','hi')}else if(DXS.pow<45&&DXS.hi){DXS.hi=0;log('Đông xưởng bớt hống hách.','gd')}
  if(DXS.pow>=60)alive().filter(p=>inClan(p)&&p.job==='quan'&&p.lv>=4&&p.seen&&p.seen['cd_12']).forEach(p=>{if(chance((DXS.pow-55)/250))later(p,pick(['dx_theo_doi','dx_bi_to']),R(1,10))})}
function tkYear(){const S=X.S;if(!S.tk||!head())return;const d=S.dyn;if(!d||!d.k)return;const e=d.emp||'';if(S.tkEmp==null){S.tkEmp=e;return}
  const newKing=S.tkEmp!==e;S.tkEmp=e;if(chance(newKing?0.35:(d.k.nghi>=70?0.1:0.01)))enqueue('ev',S.head,{ev:'tk_thu_hoi',data:{}})}
/* d9.10 (mục 12, chi phí giữ quan hệ trong clanSupport): mỗi mối thông gia quan (S.tgq) và mỗi người đã lên kinh (flags.kinh) tốn một khoản lễ tết hằng năm; không đủ tiền hai năm liền thì mối nguội đi một bậc. */
function relYear(){const S=X.S;const nk=alive().filter(p=>inClan(p)&&p.flags&&p.flags.kinh).length;const n=(S.tgq||0)+nk;if(!n)return;const cost=mm(2*n);
  if(S.money>=cost){S.money-=cost;S.relMiss=0}else{S.relMiss=(S.relMiss||0)+1;if(S.relMiss>=2){S.relMiss=0;if(S.tgq>0){S.tgq--;log('Nhà thông gia quan lạnh nhạt vì hai năm liền không lễ tết, mối quan hệ nguội đi.','hi')}else{const p=alive().find(q=>inClan(q)&&q.flags&&q.flags.kinh);if(p){p.flags.kinh=0;log(`${nameOf(p)} ở kinh thành mất người đỡ đầu vì nhà không còn gửi lễ.`,'hi')}}}}}

/* d9.10 (mục 12, thế lực tự phát đầy đủ): mỗi điểm nóng của hạt giống ván có MỘT THẾ LỰC có tên (S.wr.tl: {p, id, n, pow, rel, st}). st: ngam (âm thầm lớn dần theo độ nóng), noi (đã nổi dậy, loạn thiên hạ tăng, thu thuế dân, sự kiện đòi nhà chơi), tan (bị dẹp, một thời gian sau có thể trỗi lại). rel là cảm tình của nhà chơi với thế lực ấy. */
const TLT=[{id:'hoikin',n:'Hội Bạch Liên'},{id:'giaco',n:'Giặc cỏ Hắc Phong'},{id:'bang',n:'Bang Thủy Tặc'}];
function tlForces(){const S=X.S;const w=S.wr;if(!w||!w.hot)return [];w.tl=w.tl||[];w.hot.forEach((p,i)=>{if(!w.tl.find(f=>f.p===p)){const t=TLT[i%3];w.tl.push({p,id:t.id,n:t.n+' ở '+provN(p),pow:R(10,25),rel:0,st:'ngam',yr:0})}});return w.tl}
function tlForceYear(){const S=X.S;const w=S.wr;if(!w||!w.hot||!S.dyn)return;tlForces().forEach(f=>{const h=(w.heat&&w.heat[f.p])||0;f.yr++;
    if(f.st==='ngam'){f.pow=Math.max(0,Math.min(100,f.pow+(h-45)/20+R(-2,3)));if(f.pow>=75&&chance(0.25)){f.st='noi';f.noiT=S.t;S.dyn.loan=Math.min(100,(S.dyn.loan||0)+4);if(S.qh&&S.qh.on&&!S.qh.who){S.qh.next=Math.min(S.qh.next,S.t+R(6,18));log('Triều đình động viên quân hộ để dẹp loạn.','hi')}if(S.wr.sects&&S.wr.sects.length){const ta=S.wr.sects.filter(s=>s.al==='ta');if(ta.length)pick(ta).pow=Math.min(100,(pick(ta).pow||50)+3)}log(f.n+' nổi dậy, thiên hạ thêm xáo động.','hi');qtLog('Thế lực tự phát nổi dậy',f.n+' đã khởi sự.')}}
    else if(f.st==='noi'){f.pow=Math.max(0,Math.min(100,f.pow+R(-6,4)-((S.dyn.dt||50)>=60?2:0)));if(f.pow<=30||S.t-f.noiT>=72){f.st='tan';f.tanT=S.t;S.dyn.loan=Math.max(0,(S.dyn.loan||0)-3);if(S.qh&&S.qh.on)S.qh.next=Math.max(S.qh.next,S.t+R(24,48));log(f.n+' bị triều đình dẹp, thiên hạ bớt xáo động.','gd')}}
    else if(f.st==='tan'&&S.t-f.tanT>=120){f.st='ngam';f.pow=R(8,18);f.rel=Math.round(f.rel/2)}})}
/* gia bảo cộng cho mọi người thuộc gia tộc (chuyển từ engine.js, d9.10) */
const gbItems=()=>(window.D.GIABAO&&window.D.GIABAO.items)||{};
function gbBonus(p){const S=X.S;if(!S||!S.gb||!S.gb.length||p.gbA||!inClan(p))return;const I=gbItems();S.gb.forEach(id=>{const it=I[id];if(!it)return;const f=it.fx||{};if(f.duyen)p.duyen=Math.min(100,(p.duyen||0)+f.duyen);for(const k in (f.st||{}))p[k]=Math.min(100,(p[k]||0)+f.st[k])});p.gbA=1}
function gbApply(ids){const S=X.S;if(!ids||!ids.length)return;const I=gbItems();S.gb=[];ids.forEach(id=>{const it=I[id];if(!it)return;const f=it.fx||{};if(f.m)S.money+=f.m;if(f.fame)S.fame+=f.fame;if(f.hung)S.hung=Math.min(100,S.hung+f.hung);if(f.on)S.on=Math.min(100,S.on+f.on);if(f.tk)S.tk=1;S.gb.push(id);log(`Gia bảo của họ ${S.surname}: ${it.n}. ${it.d}`,'gd')});alive().forEach(gbBonus)}
Object.assign(X.fn,{gbBonus,gbApply});

/* ===== việc lớn (chuyển từ engine.js, d9.10) ===== */
/* ================= d9.6 Q7: VIỆC LỚN (chủ dự án 22/11) =================
   Thay cho hộp mơ hồ "Dấn thân vào việc lớn" ở mốc thông thạo 100. Người đạt mốc (thông thạo 100 hoặc một chỉ số từ 100) thấy trên trang mình nút "Việc lớn" với danh sách việc CÓ THỂ làm,
   mỗi việc ghi rõ: điều kiện, giá, thời gian, khả năng thành (chữ), hậu quả khi thành và khi bại. Chọn một việc thì trả giá ngay, người ấy làm trong N tháng rồi có kết quả. */
/* d9.7 (chủ dự án 23/11: việc lớn spam được, xuất hiện quá sớm, thông thạo thấp vẫn làm được, dễ đạt, tiêu tốn nhỏ, tổn hại thấp): tuổi từ 30; BẮT BUỘC thông thạo cao (và chỉ số liên quan); giá nhân khoảng 5 lần, phần thưởng tiền nhân theo; thất bại đau hơn; xác suất thành hạ 12 điểm (bigP); sau mỗi việc phải chờ 3 năm, cùng một việc phải chờ 10 năm (c.bigT, c.bigL). */
const BIGS=X.BIGS;BIGS.push(
 {id:'sach',n:'Soạn một bộ sách để đời',d:'Viết ra điều mình đúc kết cả đời nghề.',need:c=>(c.m||0)>=100&&c.tri>=80,jobs:null,cost:75,mo:[24,36],odds:c=>0.5+c.tri/400,win:'danh vọng +40, trí +3',lose:'mất công vô ích, tâm trạng -12, danh vọng -3',ok:c=>fx(c,{fame:40,tri:3,tam:6}),ko:c=>fx(c,{tam:-12,fame:-3})},
 {id:'lop',n:'Mở lớp truyền nghề rộng rãi',d:'Dạy hết những gì mình biết cho người trẻ trong họ và trong vùng.',need:c=>(c.m||0)>=100&&c.eq>=60,jobs:null,cost:125,mo:[18,30],odds:c=>0.55+c.eq/300,win:'người trẻ trong họ học nghề nhanh hơn, danh vọng +25, hưng thịnh +2',lose:'ít người theo học, danh vọng -6, tâm trạng -6',ok:c=>{alive().filter(p=>inClan(p)&&age(p)<18).forEach(p=>{p.pre=p.pre||{};p.pre[c.job]=(p.pre[c.job]||0)+8});return fx(c,{fame:25,hung:2,tam:5})},ko:c=>fx(c,{fame:-6,tam:-6})},
 {id:'kiettac',n:'Làm một kiệt tác',d:'Dốc hết tay nghề vào một tác phẩm để người sau nhắc tên.',need:c=>(c.m||0)>=100&&c.mi>=60,jobs:['tho','det','nghe','mo','diaky','chan'],cost:150,mo:[18,30],odds:c=>0.5+c.mi/400+c.tri/600,win:'danh vọng +50, bán được giá lớn',lose:'tác phẩm hỏng, mất thêm vật liệu, tâm trạng -14',ok:c=>fx(c,{fame:50,money:mm(600),tam:8}),ko:c=>fx(c,{tam:-14,money:-mm(30)})},
 {id:'daibuon',n:'Chuyến buôn đường dài',d:'Gom vốn đi một chuyến buôn xa, lãi lớn nếu thông suốt.',need:c=>(c.m||0)>=100&&c.eq>=80,jobs:['chu','tieunhi','hangrong','tieu'],cost:600,mo:[6,12],odds:c=>0.5+c.eq/300,win:'lãi gấp năm lần vốn, danh vọng +8',lose:'mất vốn, thua thêm một phần, sức khỏe -10, tâm trạng -10',ok:c=>fx(c,{money:mm(3000),fame:8,tam:5}),ko:c=>fx(c,{suc:-10,tam:-10,money:-mm(120)})},
 {id:'phongchua',n:'Mở phòng chữa bệnh cho dân nghèo',d:'Chữa không lấy tiền cho người nghèo trong vùng.',need:c=>(c.m||0)>=100&&c.tri>=70,jobs:['y'],cost:150,mo:[12,24],odds:c=>0.55+c.tri/400,win:'danh vọng +45, hưng thịnh +3, ổn định +2',lose:'thuốc thiếu, tiếng không vang, tâm trạng -8, danh vọng -3',ok:c=>fx(c,{fame:45,hung:3,on:2,tam:6}),ko:c=>fx(c,{tam:-8,fame:-3})},
 {id:'bequan',n:'Bế quan luyện tuyệt học',d:'Rút khỏi mọi việc để luyện một môn tuyệt học.',need:c=>(c.vo>=100||c.tri>=100)&&(c.m||0)>=80,jobs:null,cost:25,mo:[12,24],odds:c=>0.5+c.suc/400,win:'chỉ số mạnh nhất +4',lose:'tẩu hỏa nhập ma: sức khỏe -25, tâm trạng -15, sức khỏe tối đa giảm',ok:c=>{const k=['tri','vo','mi','eq'].sort((a,b)=>c[b]-c[a])[0];return fx(c,{[k]:4,tam:6})},ko:c=>fx(c,{suc:-25,tam:-15,hpMax:-2})},
 {id:'depgiac',n:'Xin dẹp một toán giặc',d:'Xin lệnh đem quân dẹp một toán giặc cỏ.',need:c=>c.job==='quan_ngu'&&c.lv>=3&&c.vo>=70,jobs:['quan_ngu'],cost:250,mo:[6,12],odds:c=>0.45+c.vo/400,win:'chiến công +60 tới +120, danh vọng +25',lose:'thua trận: chiến công -15, sức khỏe -20, danh vọng -12',ok:c=>fx(c,{merit:R(60,120),fame:25,tam:6}),ko:c=>fx(c,{merit:-15,suc:-20,fame:-12,tam:-10})},
 {id:'ketgiao',n:'Kết giao với một nhà có thế',d:'Bỏ công bỏ lễ kết thân với một nhà lớn trong vùng.',need:c=>c.eq>=80&&(c.m||0)>=100,jobs:null,cost:300,mo:[12,12],odds:c=>0.55+c.eq/300,win:'danh vọng +20, ổn định +3, hưng thịnh +3',lose:'mất lễ, danh vọng -8, tâm trạng -6',ok:c=>fx(c,{fame:20,on:3,hung:3,tam:4}),ko:c=>fx(c,{fame:-8,tam:-6})},
 {id:'hocphai',n:'Lập một học phái riêng',d:'Hợp nhiều người cùng chí hướng thành một học phái mang tên mình.',need:c=>c.tri>=100&&(c.m||0)>=100,jobs:['su','y','nghe','quan'],cost:300,mo:[36,60],odds:c=>0.4+c.tri/300,win:'danh vọng +80, trí +3',lose:'học phái tan, danh vọng -12, tâm trạng -12',ok:c=>fx(c,{fame:80,tri:3,tam:8}),ko:c=>fx(c,{fame:-12,tam:-12})},
 {id:'xuan',n:'Xét một vụ án lớn',d:'Nhận một vụ án lớn còn tồn đọng ở địa hạt, xét cho thấu lý.',need:c=>c.job==='quan'&&c.lv>=3&&c.tri>=70,jobs:['quan'],cost:50,mo:[6,12],odds:c=>0.5+c.tri/300,win:'danh vọng +40, liêm chính +2',lose:'án không rõ, bị đàn hặc: danh vọng -10, tâm trạng -8',ok:c=>fx(c,{fame:40,liem:2,tam:5}),ko:c=>fx(c,{fame:-10,tam:-8})}
);
const bigWord=p=>p>=0.75?'khá chắc':p>=0.6?'nhiều hy vọng':p>=0.45?'năm ăn năm thua':'khó';
const bigP=(b,c)=>Math.max(0.1,Math.min(0.85,b.odds(c)-0.12));
function bigWait(c){const S=X.S;const L=c.bigL||{};const ids=[];if(c.bigT!=null&&S.t-c.bigT<36)ids.push(['*',c.bigT+36]);BIGS.forEach(b=>{if(L[b.id]!=null&&S.t-L[b.id]<120)ids.push([b.id,L[b.id]+120])});return ids}
function bigAvail(c){const S=X.S;if(!c||c.dead!=null||age(c)<30||c.away||c.brk||c.viec)return [];if(c.bigT!=null&&S.t-c.bigT<36)return [];const L=c.bigL||{};return BIGS.filter(b=>(!b.jobs||b.jobs.includes(c.job))&&b.need(c)&&!(L[b.id]!=null&&S.t-L[b.id]<120))}
function bigMenu(c){const S=X.S;const L=bigAvail(c);
  if(!L.length){const w=bigWait(c);const nx=w.length?Math.min(...w.map(x=>x[1])):null;return infoPopup(c,'Việc lớn','Chưa có việc lớn nào',nx&&nx>S.t?`${esc(c.given)} vừa làm xong một việc lớn, phải nghỉ ngơi và chờ thời, khoảng ${dateStr(nx)} mới làm tiếp được (hoặc đổi sang việc khác).`:`${esc(c.given)} chưa đủ điều kiện cho việc lớn nào (từ 30 tuổi, thông thạo nghề từ 100 cùng chỉ số liên quan, và hợp nghề).`)}
  openModal(`<span class="eyebrow">Việc lớn</span><h2>${esc(c.given)} muốn làm gì</h2><p>Mỗi việc lớn tốn tiền ngay, mất vài tháng đến vài năm, rồi thành hoặc bại. Hậu quả ghi rõ bên dưới.</p><div class="choices">${L.map((b,i)=>{const p=bigP(b,c);return `<button class="btn" data-bg="${i}" ${S.money<mm(b.cost)?'disabled':''}><strong>${esc(b.n)} · ${money(mm(b.cost))}, ${b.mo[0]===b.mo[1]?b.mo[0]:b.mo[0]+' đến '+b.mo[1]} tháng</strong><small>${esc(b.d)} Khả năng thành: ${bigWord(p)}. Thành: ${esc(b.win)}. Bại: ${esc(b.lose)}.</small></button>`}).join('')}<button class="btn ghost" data-bx>Thôi</button></div>`);
  X.M.querySelector('[data-bx]').onclick=closeModal;
  X.M.querySelectorAll('[data-bg]').forEach(x=>x.onclick=()=>{const b=L[+x.dataset.bg];const v=mm(b.cost);if(S.money<v)return;S.money-=v;const mo=R(b.mo[0],b.mo[1]);c.viec={id:b.id,start:S.t,end:S.t+mo};log(`${nameOf(c)} bắt đầu việc lớn: ${b.n.toLowerCase()}, dự kiến ${mo} tháng. Tốn ${money(v)}.`,'gd');closeModal()})}
function bigDone(c){const S=X.S;const v=c.viec;c.viec=null;if(v){c.bigT=S.t;c.bigL=c.bigL||{};c.bigL[v.id]=S.t}const b=BIGS.find(x=>x.id===(v&&v.id));if(!b||c.dead!=null){setTimeout(nextPopup,0);return}
  const p=bigP(b,c);const AD=window.BN_ADMIN;const x=AD&&AD.rollX?AD.rollX(p,{}):Math.random();const win=x<p;
  let r='';try{r=win?b.ok(c):b.ko(c)}catch(e){r=''}
  infoPopup(c,'Việc lớn',(win?'Thành: ':'Bại: ')+b.n,win?`Sau bao tháng công phu, việc lớn của ${esc(c.given)} đã thành.${r}`:`Việc lớn của ${esc(c.given)} không thành.${r}`)}

/* ===== cả gia tộc đồng lòng (chuyển từ engine.js, d9.10) ===== */
function clanSupport(c){const S=X.S;const L=alive().filter(p=>inClan(p)&&(!c||p.id!==c.id));
  const mil=L.filter(p=>p.job==='quan_ngu'&&(p.lv||0)>=1&&!p.inLaw);const civ=L.filter(p=>p.job==='quan'&&(p.lv||0)>=2&&!p.inLaw);
  const kinhCiv=civ.filter(p=>inKinh(p));const court=L.filter(p=>p.flags&&(p.flags.phoma||p.flags.vp||p.flags.hau));
  const sum=(a,f)=>a.reduce((s,p)=>s+f(p),0);const nk=L.filter(p=>p.flags&&p.flags.kinh).length;
  return {mil:sum(mil,p=>(p.lv+1)*Math.max(0.5,p.vo/100)),civ:sum(civ,p=>(p.lv+1)*Math.max(0.5,p.tri/100))+(S.tgq||0)*4,kinh:kinhCiv.length+nk,court:court.length*3+(S.royal?4:0),nMil:mil.length,nCiv:civ.length+(S.tgq||0),nKinh:kinhCiv.length+nk,nCourt:court.length}}

Object.assign(X.fn,{bigAvail,bigMenu,bigDone,bigWait,clanSupport});

/* ===== thư tay (chuyển từ engine.js, d9.10): các tên dùng chung lấy từ X.EC ===== */
{const {mainHH,alive,inClan,isCtrl,esc,HH,P,RULES,chance,nextPopup,money,mm,enqueue,head,G,addRel,leaveSeat,setJob,addStat,log,nameOf,choicePopup,dOf}=X.EC;
/* d9.6: thư tay theo mức tin (chủ dự án 22/11). Mức 0 vặt: chỉ ghi nhật ký, không vào thư. Mức 1 thường: gom hộp mỗi 15 năm. Mức 2 quan trọng và 3 lớn: gom hộp mỗi 5 năm.
   Mức tính từ kết quả: có đổi bậc, sinh, tử, án thì 3; danh vọng hoặc chiến công từ 8, hoặc tiền cỡ bạc thì 2; có cộng trừ chỉ số, danh vọng, tiền thì 1; còn lại 0. */
function letterLv(r){const S=X.S;const s=String(r||'').replace(/<[^>]+>/g,' ');
  if(/Bậc\s*[+\-−]|qua đời|hạ sinh|thành thân|lên chức|bị giáng|tru di|trục xuất|bị bắt|nhận án|chịu án/i.test(s))return 3;
  for(const x of s.matchAll(/(Danh vọng|Chiến công)\s*([+\-−])\s*(\d+)/g))if(+x[3]>=8)return 2;
  if(/(Tiền|Quỹ hộ|Tiền riêng)\s*[+\-−]\s*\d+\s*bạc/.test(s))return 2;
  if(/(Danh vọng|Chiến công|Tiền|Quỹ hộ|Tiền riêng|Trí tuệ|Võ lực|Sức khỏe|Mị lực|EQ)\s*[+\-−]\s*\d/.test(s))return 1;
  return 0}
/* mức tin = mức sự kiện (theo tên), hạ một bậc nếu kết quả không có gì đáng kể, nâng lên nếu kết quả lớn */
function letterLvEv(ttl,r){const S=X.S;const e=X.EVENTS.find(x=>x.t===ttl);const lr=letterLv(r);if(!e)return lr||1;const b=e.lv!=null?e.lv:1;return lr===0?Math.max(0,b-1):Math.max(b,lr)}
function letterAdd(c,line,lv){const S=X.S;if(lv==null)lv=letterLv(line);if(lv<=0)return;S.letters=S.letters||{};const k=c.hh===mainHH()?'_xa':c.hh;const L=S.letters[k]=S.letters[k]||[];L.push({t:line,lv});if(L.length>12)L.shift()}
function letterLines(minLv){const S=X.S;const o={};for(const [k,L] of Object.entries(S.letters||{})){const l=L.filter(x=>(x.lv||1)>=minLv);if(l.length)o[k]=l}return o}
function letterDue(){const S=X.S;const y=Math.floor(S.t/12);const d5=y-(S.lt5||0)>=5,d15=y-(S.lt15||0)>=15;
  if(d15&&Object.keys(letterLines(1)).length)return true;
  if(d5&&(Object.keys(letterLines(2)).length||(S.rumor&&S.rumor.length)||alive().some(p=>inClan(p)&&!isCtrl(p)&&p.job==='quan'&&p.liem<35)))return true;
  return false}
function letterPopup(h){const S=X.S;const y=Math.floor(S.t/12);const d15=y-(S.lt15||0)>=15&&Object.keys(letterLines(1)).length>0;const Ls=letterLines(d15?1:2);S.lt5=y;if(d15)S.lt15=y; /* đã đọc thì xóa các dòng đã hiện */ {const keep={};for(const [k,L] of Object.entries(S.letters||{})){const l=L.filter(x=>(x.lv||1)<(d15?1:2));if(l.length)keep[k]=l}S.letters=keep}
  const sec=Object.entries(Ls).filter(([,L])=>L.length).map(([k,L])=>`<h3 style="margin:10px 0 4px;font-size:14px">${k==='_xa'?'Người nhà ở xa':esc(HH(k)?HH(k).name:'Chi họ')}</h3><ul class="plain">${L.map(x=>`<li><small>${x.t}</small></li>`).join('')}</ul>`).join('');
  /* tin đồn: vi phạm gia quy chưa bị phát giác, mỗi tin có một nửa khả năng lọt tới tai gia chủ */
  const rum=(S.rumor||[]).filter(x=>{const p=P(x.id);return p&&inClan(p)&&RULES[x.k]&&chance(0.5)});
  const sus=[...new Map(rum.map(x=>[x.id,x])).values()].slice(0,3);
  const bad=alive().filter(p=>inClan(p)&&!isCtrl(p)&&p.job==='quan'&&p.liem<35).slice(0,2);
  if(!sec&&!sus.length&&!bad.length){setTimeout(nextPopup,0);return}
  const opts=[{l:'Đọc xong, cất thư',f:()=>'Gia chủ gấp thư lại.'}];
  sus.forEach(x=>{const p=P(x.id);
    opts.push({l:`Cho người dò xét ${p.given}`,s:`Tốn ${money(mm(10))}. Có thật thì đem ra gia pháp`,c:()=>S.money>=mm(10),f:()=>{S.money-=mm(10);S.rumor=(S.rumor||[]).filter(y=>y!==x);if(chance(0.75)){enqueue('vio',S.head,{who:p.id,k:x.k});return 'Tra ra đúng là có chuyện.'}return 'Dò xét không ra gì, có lẽ chỉ là lời đồn.'}},
      {l:`Gửi thư răn dạy ${p.given}`,s:'Ba năm tới người ấy dè dặt hơn',f:()=>{p.flags.ran=S.t;addRel(p,h,-3);return `Lá thư lời lẽ nghiêm khắc gửi đi. ${esc(p.given)} hẳn đã hiểu.`}})});
  bad.forEach(p=>opts.push({l:`Bắt ${p.given} từ quan về quê`,s:'Tránh tai họa về sau, người ấy oán',f:()=>{if(p.seat||p.pst)leaveSeat(p);setJob(p,'none');p.away=null;addStat(p,'tam',-15);addRel(p,h,-15);log(`${nameOf(p)} vâng lệnh gia chủ từ quan về quê.`,'hi');return `${esc(p.given)} dâng đơn từ quan, khăn gói về quê.`}}));
  choicePopup(h,'Thư nhà',`Thư nhà cuối năm ${dOf(S.t).y}`,`${sec||'<p class="muted">Năm nay các nơi không có chuyện gì đáng kể.</p>'}${sus.length?`<p><b>Nghe đồn:</b> ${sus.map(x=>`${esc(P(x.id).given)} lén phạm điều "${esc(RULES[x.k].n)}"`).join('; ')}.</p>`:''}${bad.length?`<p><b>Có tiếng không hay:</b> ${bad.map(p=>esc(p.given)).join(', ')} làm quan mà người ta bảo là không sạch tay.</p>`:''}`,opts)}


Object.assign(X.fn,{letterLv,letterLvEv,letterAdd,letterLines,letterDue,letterPopup});
}

/* ===== hộp thành tựu T4 đến T11 (chuyển từ engine.js, d9.10) ===== */
{const {alive,inClan,head,tuocCheck,cf,esc,nameOf,landDelta,money,mm,age,addStat,P,WP,nextPopup,openModal,metaEnd,log,qtLog,infoPopup,gbLine,finishGame,enqueue}=X.EC;
const WPREW={
 T4:{t:'Người có công nhất được thêm công trạng (có thể thêm bậc tước), họ nhận Thiết khoán, năm mẫu đất phong và danh vọng.',f:()=>{const p=alive().filter(x=>inClan(x)&&['quan','quan_ngu'].includes(x.job)).sort((a,b)=>(b.lv||0)-(a.lv||0))[0]||head();p.cong=(p.cong||0)+600;tuocCheck(p,'tĩnh nạn công thần');S.tk=1;cf(80,'Tĩnh nạn công thần');return `${esc(nameOf(p))} được ghi công đầu. Họ nhận Thiết khoán.`+landDelta(5)}},
 T5:{t:'Đất biên giới rộng thêm, tiền của và danh vọng.',f:()=>{cf(60,'Biên vương');S.money+=mm(500);return 'Triều đình chính thức thừa nhận đất biên giới do họ giữ.'+landDelta(8)}},
 T6:{t:'Người giữ ghế cao nhất được thăng bậc, tiền thưởng, danh vọng.',f:()=>{const p=alive().filter(x=>inClan(x)&&x.job==='quan').sort((a,b)=>(b.lv||0)-(a.lv||0))[0];if(p){p.lv=Math.max(p.lv||0,8);p.cong=(p.cong||0)+400}cf(100,'Nhiếp chính');S.money+=mm(300);return p?`${esc(nameOf(p))} lên Nhất phẩm.`:'Danh vọng họ lên cao.'}},
 T7:{t:'Khoản tiền thưởng lớn, hưng thịnh tăng.',f:()=>{S.money+=mm(2000);S.hung=Math.min(100,S.hung+10);cf(50,'Phú khả địch quốc');return 'Thương hội của họ trở thành chỗ dựa của cả miền.'}},
 T8:{t:'Con cháu dưới 22 tuổi thêm trí, danh vọng lớn.',f:()=>{alive().filter(p=>inClan(p)&&age(p)<22).forEach(p=>addStat(p,'tri',6));cf(100,'Văn tông');return 'Con cháu trong họ đều được học thầy giỏi nhất.'}},
 T9:{t:'Các quan võ thêm công trạng, con cháu thêm võ lực, danh vọng.',f:()=>{alive().filter(p=>inClan(p)&&p.job==='quan_ngu').forEach(p=>{p.cong=(p.cong||0)+300});alive().filter(p=>inClan(p)&&age(p)<22).forEach(p=>addStat(p,'vo',5));cf(80,'Trấn quốc võ gia');return 'Con cháu họ được nuôi theo nếp nhà võ.'}},
 T10:{t:'Minh chủ thêm võ lực, danh vọng và một khoản tiền.',f:()=>{const p=(S.gh&&P(S.gh.lord))||head();addStat(p,'vo',8);cf(100,'Võ lâm chí tôn');S.money+=mm(500);return `${esc(nameOf(p))} được các phái kính trọng.`}},
 T11:{t:'Danh vọng nền, một khoản tiền lớn, ổn định và hưng thịnh tăng.',f:()=>{cf(200,'Thế gia ngàn năm');S.money+=mm(3000);S.hung=Math.min(100,S.hung+10);S.on=Math.min(100,S.on+10);return 'Cả thiên hạ biết tên họ này.'}}
};
function wpPopup(it){const S=X.S;const w=WP.find(x=>x.id===it.wid);if(!w||S.over){setTimeout(nextPopup,0);return}
  const rw=WPREW[w.id];const gens=S.people.reduce((m,p)=>Math.max(m,p.gen||1),1);
  openModal(`<span class="eyebrow">Thành tựu</span><h2>${esc(w.n)}</h2><p>${esc(it.txt||'')}</p><p>Họ ${esc(S.surname)} đã đi ${Math.floor(S.t/12)} năm, ${gens} đời, ${S.people.length} người trong gia phả. Cái kết này được ghi vào Sử sách và ban cho dòng họ một món gia bảo, dù chơi tiếp hay dừng lại.</p><h3 style="margin:10px 0 4px;font-size:14px">Nếu đi tiếp</h3><p>${esc(rw?rw.t:'')}</p><div class="choices"><button class="btn primary" data-go>Tiếp tục chơi, nhận phần thưởng</button><button class="btn" data-stop>Khép lại tại đây</button></div>`,false,'menu');
  X.M.querySelector('[data-go]').onclick=()=>{S.wpDone=S.wpDone||{};S.wpDone[w.id]=1;S.wpAsk=null;metaEnd(w.id);let r='';try{r=rw?rw.f():''}catch(e){}log(`${w.n}: nhận phần thưởng, ván tiếp tục.`,'gd');qtLog('Thành tựu',`${w.n}. Họ ${S.surname} chọn đi tiếp.`);infoPopup(null,'Phần thưởng',w.n,`${r}${gbLine()}`)};
  X.M.querySelector('[data-stop]').onclick=()=>{S.wpDone=S.wpDone||{};S.wpDone[w.id]=1;S.wpAsk=null;finishGame({id:w.id,text:it.txt})}}
function wpWin(w){const S=X.S;const TX={T4:'Phò tá phiên vương dẹp loạn trong triều, họ '+S.surname+' thành đệ nhất công thần.',T5:'Giữ đất biên cương, họ '+S.surname+' lập nước riêng và giữ được.',T6:'Ngoại thích họ '+S.surname+' nắm quyền nhiếp chính, đỡ ngai vàng cho thiếu đế.',T7:'Thương hội họ '+S.surname+' nuốt trọn thị trường cả miền.',T8:'Học phái họ '+S.surname+' thành chính thống, cửa nhà đầy bảng vàng.',T9:'Họ '+S.surname+' giữ ải mười năm yên, đời đời cầm quân.',T10:'Từ giang hồ, họ '+S.surname+' lên ngôi minh chủ võ lâm.',T11:'Họ '+S.surname+' giữ được tên tuổi qua tám đời, hai trăm năm.'};
  if(S.wpDone&&S.wpDone[w.id])return;if(S.wpAsk)return;S.wpAsk=w.id;enqueue('wpend',S.head,{wid:w.id,txt:TX[w.id]},true)}
function wpCard(){const S=X.S;const S0=S.wp||{};const seen=WP.filter(w=>(S0[w.id]||{}).s>=1);
  const lines=seen.map(w=>{const s=S0[w.id].s;return `<li><b>${esc(s>=2?w.n:'Một con đường mờ')}</b><br><small>${esc(w.h[s-1])}</small></li>`}).join('');
  return `<section class="card"><h3>Con đường phía trước</h3>${lines?`<ul class="plain">${lines}</ul>`:'<p class="muted">Chưa thấy manh mối. Ngoài đường quan văn và quan võ, còn có thể làm giàu, mở học phái, giữ biên ải, vào giang hồ hoặc đứng đúng phe khi triều đình tranh ngôi.</p>'}</section>`}

Object.assign(X.fn,{wpPopup,wpWin,wpCard});
}

/* ===== deathPopup, weddingPopup (chuyển từ engine.js, d9.10) ===== */
{const {tierNow,mm,cf,clamp,memSet,addStat,log,nameOf,isCtrl,money,nextPopup,openModal,hdrEv,esc,TIERS,famLine,closeModal,head,projOn,inheritTitle,inMain,age,fmt,fundAdd,spouseOf,alive,gameOver,enqueue}=X.EC;
function deathPopup(c,cause){const S=X.S;
  const wasHead=c.id===S.head;const f=c.fame;const tn=tierNow();const exp=Math.max(f>=150?2:f>=25?1:0,tn>=4?2:tn>=2?1:0);
  const dk=projOn('nghiatrang')?0.5:1;const costs=[mm(3),mm(30),mm(100)].map(x=>Math.round(x*dk)); /* nghĩa trang gia tộc giảm nửa tiền tang lễ */
  const inh=inheritTitle(c);const fk=inMain(c)?'clan':c.hh;const fmny=()=>fk==='clan'||!S.hh[fk]?S.money:S.hh[fk].money; /* d9.6 Q14: người ở chi họ thì lo tang bằng quỹ chi của mình */
  openModal(`${hdrEv(c)}<span class="eyebrow">Tang sự</span><h2>${esc(nameOf(c))} qua đời</h2>
   <p>${esc(nameOf(c))} ${esc(cause)} ở tuổi ${age(c)}.${inh} ${wasHead?'Gia tộc cần người kế nghiệp.':''}</p>
   <p class="muted">Danh vọng của người mất: ${fmt(f)}. Gia thế hiện là ${esc(TIERS[tn][0].toLowerCase())}. Người đời xét theo cả thân phận người mất lẫn địa vị gia tộc: nhà có tiếng mà làm sơ sài thì mang tiếng bạc bẽo, nhà nhỏ mà phô trương thì bị chê cười.</p>
   <div class="choices">${['Sơ sài','Trung bình','Trang trọng'].map((n,i)=>`<button class="btn" data-f="${i}" ${fmny()<costs[i]&&i?'disabled':''}><strong>${n} · ${money(costs[i])}</strong><small>${i===exp?'Vừa với thân phận và gia thế':i<exp?'Thấp hơn thân phận, gia tộc mất danh vọng':'Cao hơn thân phận, bị chê phô trương'}</small></button>`).join('')}</div>`);
  X.M.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{const i=+b.dataset.f;const poor=fmny()<costs[exp];fundAdd(fk,-costs[i]); /* d9.4: nhà không đủ tiền cho mức xứng thì người ta thông cảm */
    const diff=i-exp;let d=0;if(diff<0)d=-(Math.max(5,f*0.2))*(-diff);else if(diff>0&&f<25)d=-4*diff;else if(diff===0)d=Math.max(1,f*0.05)*(i+1);
    if(poor&&d<-12)d=-12;
    cf(d,d>=0?'Tang lễ xứng đáng':poor?'Tang lễ sơ sài vì nhà túng thiếu':'Tang lễ không xứng thân phận');
    if(diff<0&&exp>=1&&!poor)memSet('tang_bac',120,{n:c.given});else if(i===2&&diff>=0&&tn>=2)memSet('tang_hau',120,{n:c.given}); /* v6.7.0-d4: mức tang lễ để lại dấu cho sự kiện sau */S.on=clamp(S.on+(diff<0?-4:2),0,100);
    log(`Tang lễ ${['sơ sài','vừa phải','trang trọng'][i]} cho ${nameOf(c)}. Danh vọng gia tộc ${d>=0?'+':''}${Math.round(d)}.`,d<0?'hi':'gd');
    const sp=spouseOf(c);if(sp)sp.wantChild=false;
    if(!alive().length){gameOver();return}
    if(wasHead)enqueue('heir',alive()[0].id,null,true);
    closeModal()});
}

function weddingPopup(c,p,free){const S=X.S;
  const tn=tierNow();const fam=p.famT!=null?p.famT:tn;const a=(tn+fam)/2;const exp=a<1.5?0:a<3.5?1:2;
  const costs=[mm(3),mm(20),mm(60)];const names=['Giản dị','Vừa phải','Linh đình'];
  const fin=i=>{const diff=i-exp;let d=0,tam=0;
    if(diff<0){d=-(2+Math.abs(diff)*2+(tn>=3?2:0));tam=-4*Math.abs(diff)}
    else if(diff===0){d=2+i*2;tam=4}
    else{d=tn<=1?-2*diff:1+diff;tam=6}
    if(i<=0&&tn<=1){d=Math.max(d,0);tam=Math.max(tam,2)}
    cf(d,d>=0?'Hôn lễ chu đáo':'Hôn lễ kém phần thể diện');
    c.love=p.love=clamp((c.love||50)+(diff<0?-6*Math.abs(diff):diff===0?4:3),0,100);
    if(diff<0&&fam>=tn)memSet('cuoi_so',120,{n:p.given,s:p.surname});else if(i===2&&diff>=0)memSet('cuoi_hau',120,{n:p.given,s:p.surname});addStat(c,'tam',tam);addStat(p,'tam',tam);S.on=clamp(S.on+(diff<0?-2:1),0,100);
    log(`Hôn lễ ${names[i].toLowerCase()} của ${nameOf(c)} và ${nameOf(p)}. Danh vọng gia tộc ${d>=0?'+':''}${d}.`,d<0?'hi':'gd')};
  if(!isCtrl(c)){const i=Math.min(exp,S.money>=costs[exp]?exp:0);S.money-=Math.min(costs[i],Math.max(0,S.money));fin(i);setTimeout(nextPopup,0);return}
  openModal(`${hdrEv(c)}<span class="eyebrow">Hôn lễ</span><h2>${esc(nameOf(c))} và ${esc(nameOf(p))} thành thân</h2>
   <p>Nhà mình thuộc hàng ${esc(TIERS[tn][0].toLowerCase())}; ${p.famT!=null?'nhà bên kia '+famLine(p):'hai bên'}. Cỗ bàn, rước dâu lớn nhỏ thế nào còn do gia chủ định. Làm sơ sài thì mang tiếng nhà có mà keo, làm quá thì chê phô trương.</p>
   <div class="choices">${names.map((n,i)=>`<button class="btn" data-w="${i}" ${S.money<costs[i]&&i?'disabled':''}><strong>${n} · ${money(costs[i])}</strong><small>${i===exp?'Vừa với gia thế':i<exp?'Thấp hơn gia thế, mất thể diện':'Cao hơn gia thế, bị chê phô trương'}</small></button>`).join('')}</div>`);
  X.M.querySelectorAll('[data-w]').forEach(b=>b.onclick=()=>{const i=+b.dataset.w;S.money-=costs[i];fin(i);closeModal()})}

Object.assign(X.fn,{deathPopup,weddingPopup});
}

/* ===== usStatus, usEnq, usStart, usAdd, usGarrison, usSupportInfo, usArmyInfo, usNext, usWin, usAbandon, usFail, usCrown, usMonth, usCard (chuyển từ engine.js, d9.10) ===== */
{const {usU,P,usSteps,bar,US_N,esc,nameOf,head,shuf,usActors,R,inClan,log,qtLog,clamp,clanSupport,court,US_COST,money,chance,enqueue,qtOf,qtSentence,addStat,qtAdd,kType,tmOf,alive,home,homeP,PROV,US_START,usTarget,age,pmOpen,ARMY,thanHolder}=X.EC;
function usStatus(path,p){const S=X.S;if(!p||p.dead!=null||!inClan(p)||age(p)<22)return false;
  if(path==='quyen')return p.job==='quan'&&p.lv>=8&&pmOpen();
  if(path==='vo')return p.job==='quan_ngu'&&p.lv>=ARMY.length-1;
  if(path==='nghia'){const h=thanHolder('vothan');const T=tmOf(p);return (!!h&&h.id===p.id)||(!!T&&T.tm==='devuong'&&age(p)>=25&&p.vo>=60)}
  return false}

function usEnq(id,a,extra){const S=X.S;const t=usTarget(a);if(t&&X.EVMAP[id])enqueue('ev',t.id,{ev:id,data:Object.assign({who:a.id},extra||{})})}

function usStart(path,who,force){const S=X.S;const a=typeof who==='string'?P(who):who;if(!a)return null;
  S.usurp=Object.assign({path,who:a.id,st:0,next:S.t+R(2,5),pending:false,pt:0,v:2,br:null},US_START[path]);S.usWait=null;
  qtLog('Bước vào mưu đại sự',`${nameOf(a)} bắt đầu con đường ${US_N[path].toLowerCase()}.`);log(`${nameOf(a)} bắt đầu mưu đại sự.`,'hi');return S.usurp}

function usAdd(e){const S=X.S;const U=usU();if(!U||!e)return;['the','danh','tai','lo'].forEach(k=>{if(e[k])U[k]=clamp(U[k]+e[k],0,100)});if(e.money)S.money+=e.money}

function usGarrison(){const S=X.S;const loan=(S.dyn&&S.dyn.loan)||10;const f=1+(100-loan)/300;const home=homeP();const hp=home&&PROV[home]?PROV[home].n.replace(/ quan$/,''):'tỉnh nhà';
  return [['Kinh thành',Math.round(40*f)],['Biên ải',Math.round(28*f)],['Tỉnh '+hp,Math.round(10*f)]]}

function usSupportInfo(U){const S=X.S;const a=P(U.who);const sp=clanSupport(a);const W=v=>v>=30?'rất mạnh':v>=15?'khá':v>=5?'có':'ít';
  return `<p class="kvline"><b>Cả họ đồng lòng:</b> võ quan ${sp.nMil} người (binh, tin quân, cấp dưới: ${W(sp.mil)}) · quan văn ${sp.nCiv} người (chiếu chỉ, lương thảo, tiến cử: ${W(sp.civ)}) · người ở kinh thành ${sp.nKinh} (đường dây: ${W(sp.kinh*4)}) · người trong cung ${sp.nCourt} (che chở, tin: ${W(sp.court)}).</p>`}

function usArmyInfo(U){const S=X.S;if(!alive().some(p=>inClan(p)&&p.job==='quan_ngu'&&p.lv>=4))return usSupportInfo(U);const n=U.troops||0;const cost=n*US_COST;const more=Math.max(0,Math.floor(S.money/(US_COST*12))-n);
  return usSupportInfo(U)+`<p class="kvline"><b>Quân của mình:</b> ${n} đội (khoảng ${n*100} người), nuôi mỗi tháng ${money(cost)}. Tiền hiện có đủ nuôi thêm khoảng ${more} đội trong một năm.</p><p class="kvline"><b>Quân triều đình trấn giữ (ước lượng, đội):</b> ${usGarrison().map(([a,b])=>a+' '+b).join(' · ')}.</p>`}

function usNext(){const S=X.S;const U=usU();if(!U)return;U.st++;U.troops=(U.troops||0)+({quyen:1,vo:2,nghia:3}[U.path]||1); /* v6.7.0: mỗi bước chiêu thêm quân (đội 100 người), nuôi 60 bạc mỗi đội mỗi tháng */U.pending=false;U.next=S.t+R(3,7)}

function usWin(kind){const S=X.S;const U=usU();if(!U)return 0;
  let p=(kind==='thien'?U.danh*0.5+U.the*0.25+U.tai*0.1+(100-U.lo)*0.15:U.the*0.45+U.danh*0.15+U.tai*0.15+(100-U.lo)*0.25)/100;
  /* v6.5.4: nhánh đã chọn giữa đường hợp với cách ra tay cuối thì thuận hơn (sĩ phu hợp thiền nhượng, quân lực hợp binh biến, của cải giúp cả hai chút ít) */
  p+=U.br==='si'?(kind==='thien'?0.06:-0.02):U.br==='quan'?(kind==='thien'?-0.02:0.06):U.br==='tien'?0.03:0;
  const d=S.dyn&&S.dyn.k?S.dyn:null;
  if(d){const t=kType(d.k);p+=({hon:0.05,bao:0.06,au:0.08,thu:0,minh:-0.1}[t]||0)+(d.loan>=50?0.04:0)+(d.dt<35?0.04:0)+(d.cr?0.05:0)-(d.k.uy>=75?0.05:0)-(d.dt>=70?0.04:0)}
  const a=P(U.who);if(a){const T=tmOf(a);if(T&&T.tm==='devuong')p+=0.03}
  p+=({quyen:0.1,vo:-0.06}[U.path]||0); /* d9.6 cân bằng theo đo bot (15 ván mỗi đường, nhân vật mạnh): Võ quan 67%, Khởi nghĩa 40%, Quyền thần 20%; mục tiêu người mạnh 40 đến 55% */
  return clamp(p-0.16,0.04,0.8)}

function usAbandon(){const S=X.S;const U=usU();if(!U)return '';const a=P(U.who);const lo=U.lo;const leak=chance(lo/160);
  S.usurp=null;(S.usNoP=S.usNoP||{})[U.path]=S.t+120;
  let t=lo<20?'Mọi dấu vết được xóa sạch, như chưa từng có chuyện gì.':'Người trong cuộc được giải tán, thư từ bị đốt.';
  if(a&&a.dead==null){addStat(a,'tam',-8);a.fame-=Math.round(2+lo/10);
    if(leak){const q=qtOf(a);qtAdd(a,{risk:35,cor:6,crime:Math.max(2,q.crime)});t+=' Nhưng tin vẫn lọt ra ngoài, ngự sử bắt đầu để mắt.';if(a.job==='quan'&&q.st<1)q.st=1}}
  qtLog('Từ bỏ mưu đại sự',`${a?nameOf(a):'Người cầm đầu'} từ bỏ con đường ${US_N[U.path].toLowerCase()}${leak?', nhưng tin đã lọt ra ngoài':''}.`);
  log(`Họ ${S.surname} từ bỏ mưu đại sự.`,'hi');return t}

function usFail(why){const S=X.S;const U=usU();const a=U&&P(U.who);S.usurp=null;if(U)(S.usNoP=S.usNoP||{})[U.path]=S.t+120;
  if(!a||a.dead!=null||!inClan(a)){log('Mưu đại sự tan vỡ.','hi');return ''}
  const q=qtOf(a);q.crime=5;q.f=null;qtLog('Mưu đại sự thất bại',`${nameOf(a)} ${why}.`);
  const r=qtSentence(a,5,why);if(S.tdq)S.tdq.us=1;return r}

function usCrown(a,kind){const S=X.S;const U=usU()||{path:'quyen',who:a.id,the:60,danh:40,tai:50,lo:30,st:0};U.who=a.id;
  S.usCoro={U:structuredClone(U),who:a.id,kind:kind||''};S.usurp=null;enqueue('coro',S.head,{},true)}

function usMonth(){const S=X.S;if(!head()||S.over)return;
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
  U.lo=clamp(U.lo+0.05+(U.the>60?0.03:0)+(U.st>=3?0.03:0)+(a.away?0.05:0),0,100);
  /* d9.6 Q10: cả họ cùng đỡ, mỗi tháng thêm thế lực, danh nghĩa, tài lực và che bớt lộ theo từng loại hỗ trợ */
  {const sp=clanSupport(a);const w={vo:[0.02,0.006,0.004],quyen:[0.012,0.02,0.006],nghia:[0.012,0.01,0.006]}[U.path]||[0.01,0.01,0.005];
   U.the=clamp(U.the+sp.mil*w[0]+sp.civ*w[0]*0.5,0,100);U.danh=clamp(U.danh+sp.civ*w[1]+sp.court*0.004,0,100);U.tai=clamp(U.tai+(sp.nCiv+sp.nMil)*w[2],0,100);U.lo=clamp(U.lo-sp.court*0.012-sp.kinh*0.004,0,100)} /* d9.6: lộ theo thời gian tăng chậm (trước 0,25 mỗi tháng); lộ nhanh chỉ do lựa chọn gây lộ */
  /* v6.6.0: mưu đại sự tốn tiền mỗi tháng: nuôi người, mua chuộc, giữ quân. Võ quan và khởi nghĩa tốn hơn quyền thần */
  if(U.st>=1){U.troops=U.troops||0;const ct=U.troops*US_COST;if(ct>0){S.money-=ct;U.pay=(U.pay||0)+ct}if(S.money<0){U.lo=clamp(U.lo+0.4,0,100);U.the=clamp(U.the-0.5,0,100);if(chance(0.1))U.troops=Math.max(0,U.troops-1);U.broke=(U.broke||0)+1;if(U.broke>=12){U.broke=0;log('Vỡ nợ suốt một năm, quân bỏ đi hết. Mưu đại sự đành bỏ dở.','hi');usAbandon();return}}else U.broke=Math.max(0,(U.broke||0)-1)}
  if(U.pending&&S.t-(U.pt||0)>24)U.pending=false;
  if(U.lo<45)U.warned=0;
  if(U.lo>=60&&!U.warned){U.warned=1;usEnq('ts_lo_tin',a)}
  if(U.lo>=100&&!U.exposed){U.exposed=1;U.pending=true;U.pt=S.t;usEnq('ts_phat_giac',a);return}
  if(!U.pending&&!U.exposed&&S.t>=U.next){const id=usSteps(U)[U.st];if(id&&X.EVMAP[id]){U.pending=true;U.pt=S.t;usEnq(id,a)}}
  if(U.st>=2&&!U.noi&&!U.pending&&chance(0.012)){U.noi=1;usEnq('ts_noi_phan',a)}}

function usCard(){const S=X.S;const U=usU();if(!U)return '';const a=P(U.who);const AD=window.BN_ADMIN;const len=usSteps(U).length;
  const wd=(v,L)=>L[v>=75?3:v>=50?2:v>=25?1:0];const bar=(n,v,txt)=>`<dt>${n}</dt><dd><span class="num">${AD?Math.round(v)+' · ':''}${txt}</span></dd>`;
  return `<section class="card"><span class="eyebrow">Mưu đại sự</span><h2>${US_N[U.path]}</h2>
   <p class="kvline">Người cầm đầu: <b>${a?esc(nameOf(a)):'—'}</b> · bước ${Math.min(U.st+1,len)}/${len}${U.exposed?' · <b class="down">đã có nguy cơ bại lộ</b>':''}</p>
   ${usArmyInfo(U)}
   <dl class="kv">${bar('Thế lực',U.the,wd(U.the,['chưa có gì','còn mỏng','khá vững','rất mạnh']))}${bar('Danh nghĩa',U.danh,wd(U.danh,['chưa có','mơ hồ','khá thuyết phục','chính đáng']))}${bar('Tài lực',U.tai,wd(U.tai,['trống rỗng','eo hẹp','tạm đủ','dồi dào']))}${bar('Lộ',U.lo,wd(U.lo,['kín như bưng','thoáng có người nghi','nhiều người đã đoán ra','sắp bại lộ']))}</dl>
   <div class="acts"><button class="btn small ghost" data-tsbo>Từ bỏ</button></div></section>`}

Object.assign(X.fn,{usStatus,usEnq,usStart,usAdd,usGarrison,usSupportInfo,usArmyInfo,usNext,usWin,usAbandon,usFail,usCrown,usMonth,usCard});
}

X.yearly.push(ghYear,qhYear,dxYear,tkYear,relYear,tlForceYear);
Object.assign(X.fn,{ghYear,qhYear,dxYear,tkYear,relYear,tlForceYear,tlForces});
});
