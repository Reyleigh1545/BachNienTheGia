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
    if(w.yrs>=w.len){const win=pa>=pb?a:b,lose=win===a?b:a;win.pow=clampP(win.pow+6);lose.pow=clampP(lose.pow-6);W.gwar=null;W.gwarEnd=S.t;
      log(`Cuộc chiến giữa ${win.n} và ${lose.n} kết thúc: ${win.n} thắng thế.`,'gd');
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

X.yearly.push(ghYear,qhYear,dxYear,tkYear,relYear,tlForceYear);
Object.assign(X.fn,{ghYear,qhYear,dxYear,tkYear,relYear,tlForceYear,tlForces});
});
