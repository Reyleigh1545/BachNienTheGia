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
const VAI={ban_than:'bạn thân',an_nhan:'ân nhân',quy_nhan:'quý nhân',ket_nghia:'anh em kết nghĩa',thay:'thầy',mon_sinh:'môn sinh',doi_thu:'đối thủ',nguoi_thuong:'người thương',khach:'khách quen',cao_nhan:'cao nhân',an_si:'ẩn sĩ',lang_gieng:'láng giềng',huong_truong:'hương trưởng',quen:'người quen',tinh_dich:'tình địch',thuong_nhan:'thương nhân',thay_thuoc:'thầy thuốc',tuong:'tướng',thuoc_ha:'thuộc hạ',phe_chu:'người đứng đầu phe',nguoi_lam:'người làm',quan:'quan lại',quyen_the:'kẻ có thế'};
const NG={ban_than:'bạn từ thuở nhỏ',an_nhan:'người từng nhận ơn nhà',quy_nhan:'người có thế',ket_nghia:'kết nghĩa',thay:'thầy',cao_nhan:'cao nhân ẩn mình',an_si:'ẩn sĩ',thay_thuoc:'thầy thuốc',doi_thu:'kẻ có hiềm khích'};
/* ---------- sổ người quen ---------- */
function ensure(c,o){o=o||{};const s=root();
  /* d9.12.66: sự kiện nhắc "quan huyện/tri huyện/tri phủ" thì lấy chính người đang ngồi ghế thật ở tỉnh nhà, không tạo bản sao vô danh */
  if(!/^off:/.test(o.key||'')){const nn=String(o.nghe||'');const sid=/tri huyện|quan huyện/i.test(nn)?'trihuyen':/tri phủ|quan phủ/i.test(nn)?'triphu':null;if(sid&&G.localOfficer){const lo=G.localOfficer(sid);if(lo&&lo.np)return adopt(lo.np,{vai:o.vai||['quan'],nghe:nn,tier:4,rel:o.rel,liem:lo.st.liem,key:'off:'+lo.key,why:o.why})}}
  if(o.key){const ex=Object.values(s.np.l).find(n=>n.key===o.key&&n.ok!==0);if(ex){if(o.vai&&!ex.vai.includes(o.vai)){ex.vai.push(o.vai);ex.vaiTxt=ex.vai.map(v=>VAI[v]||v).join(', ')}return ex}}
  /* d9.12: suy giới tính từ lời mô tả để tên không lệch với lời kể ("ông già" mà tên nữ) */
  const gInfer=t=>{t=' '+String(t||'').toLowerCase()+' ';if(/ (bà|cô gái|nàng|đàn bà|phụ nữ|sư tỷ|bà mối|phi tần|công chúa|vương phi|hoàng hậu|nữ )/.test(t))return 'nữ';if(/ (ông|lão|chàng|thầy|sư huynh|sư phụ|sư trụ trì|kiếm khách|kiếm sĩ|võ quan|hoạn quan|thái giám|nội thị|đạo sĩ|ngư phủ|thợ rèn|lý trưởng|chủ tướng|thân vương|quốc công|hoàng tử|người con trai|ông già|cậu )/.test(t))return 'nam';return null};
  const vv=[].concat(o.vai||[]);const g=o.g||gInfer(o.nghe)||(vv.includes('nguoi_thuong')&&c&&c.g?(c.g==='nam'?'nữ':'nam'):vv.includes('tinh_dich')&&c&&c.g?c.g:null)||(chance(0.5)?'nam':'nữ'); /* d9.12.68: người thương khác giới với người chơi, tình địch cùng giới (chủ dự án 24/11: kết hôn đồng tính) */
  let ag=o.age!=null?o.age:R(24,60);{const nn=' '+String(o.nghe||'').toLowerCase()+' ';if(/ (già|lão|cụ|bà lão|ông lão|lão nhân|trụ trì) /.test(nn)&&ag<55)ag=R(58,74);else if(/ (thiếu niên|thiếu nữ|cậu bé|cô bé|chàng trai|cô gái) /.test(nn)&&ag>38)ag=R(18,28)} /* tuổi khớp chữ chỉ tuổi trong mô tả */
  const n=G.np.new({n:o.name,g,age:ag,role:o.role||'quen'});
  const ti=o.tier!=null?o.tier:Math.max(0,Math.min(6,G.tierIdx()+R(-1,1)));
  const base=35+ti*4;const rs=()=>clamp(Math.round(base+R(-12,28)),20,100);
  n.st=Object.assign({tri:rs(),vo:rs(),mi:rs(),eq:rs()},o.st||{});
  if(o.main)n.st[o.main]=Math.max(n.st[o.main],R(70,92));
  n.vai=[].concat(o.vai||'quen');n.vaiTxt=o.vaiTxt||n.vai.map(v=>VAI[v]||v).join(', ');n.nghe=o.nghe||NG[n.vai[0]]||'';n.job=o.job||null;n.tier=ti;n.key=o.key||null;
  n.rel=o.rel!=null?o.rel:10;n.on=0;n.oan=0;n.ky=[];n.loc=(s.loc&&s.loc.p)||null;n.src=c?c.id:null;
  if(o.why)note(n,o.why);
  if(G.npc)G.npc.deepen(n,o); /* d9.13: NPC có quan hệ thì có tính cách, kỹ năng, mục tiêu ẩn, quá khứ (engine-npc.js) */
  /* d9.12.65: nơi ở thật (nơi người gặp đang đứng), người hay đi lại, và họ thật (danh gia gần đó) */
  n.loc=o.loc||(G.placeOf?G.placeOf(c):n.loc);n.wander=!!o.wander||n.vai.some(v=>['thuong_nhan','cao_nhan','an_si'].includes(v))||/lái buôn|thương nhân|đi dạo|lưu lạc|khách lạ|đạo sĩ|kiếm khách|thầy tướng|hát rong|người chạy thư|ngư phủ già|lão nhân|ẩn sĩ/.test(n.nghe||'');
  if(!o.noHouse&&G.houseFor&&((n.tier||0)>=3||(['quy_nhan','thuong_nhan'].some(v=>n.vai.includes(v))&&(n.tier||0)>=2))&&chance(0.55)){const hid=G.houseFor(n);if(hid){n.house=hid;n.hn=G.houseSur(hid)+' Gia';try{const H=S().w.houses[hid];if(H){H.np=H.np||[];H.np.push(n.id)}}catch(e){}n.nghe=(n.nghe?n.nghe+', ':'')+'người của '+n.hn}}
  /* d9.12.67: sổ họ NPC: danh gia thật (h:…) hoặc họ cùng tên, cùng tỉnh, từ bậc 2 (f:…); thành viên và con cái cùng một họ */
  try{const sur=String(n.n).split(' ')[0];const fid=n.house?('h:'+n.house):((n.tier||0)>=2?('f:'+sur+':'+(n.loc||'')):null);if(fid){n.fid=fid;const R0=(s.np.hs=s.np.hs||{});const F=R0[fid]||(R0[fid]={sur,loc:n.loc,mem:[]});F.mem.push(n.id)}}catch(e){}
  return n}
/* người đã có sẵn trong sổ (như quan giữ ghế thật) nhận vai và tính cách */
function adopt(n,o){o=o||{};if(!n||n.sub)return n;n.vai=[].concat(o.vai||'quan');n.vaiTxt=n.vai.map(v=>VAI[v]||v).join(', ');n.nghe=o.nghe||n.nghe||'';n.tier=o.tier!=null?o.tier:4;n.rel=o.rel!=null?o.rel:0;n.on=0;n.oan=0;n.ky=n.ky||[];n.st=n.st||{tri:R(55,80),vo:R(30,50),mi:R(40,60),eq:R(50,75)};n.loc=o.loc||n.loc;n.key=o.key||n.key;if(G.npc)G.npc.deepen(n,o);if(o.liem!=null&&n.sub){n.sub.thanh=clamp(Math.round(o.liem),5,98);n.sub.rong=clamp(Math.round(o.liem*0.7+10),5,98)}return n}
const get=id=>G.np.get(id);
function note(n,t){n.ky=n.ky||[];n.ky.push({t:S().t,x:String(t).slice(0,80)});if(n.ky.length>6)n.ky.shift()}
/* đổi quan hệ với cả nhà; trả về cặp [tên, n] để đặt vào fx(c,{qh:...}) */
function rel(n,d,why){if(!n)return ['',0];const o=n.rel||0;n.rel=clamp(o+d,-100,100);const dv=Math.round(n.rel-o);if(n.house&&G.houseRel&&Math.abs(dv)>=8)G.houseRel(n.house,Math.round(dv/4)); /* d9.12.65: giúp hay làm mất lòng người của một họ thì họ ấy cũng nhớ */if(why)note(n,why);if(dv>=5&&!n.vai.includes('doi_thu')&&n.rel<-40&&!n.vai.includes('doi_thu')){n.vai.push('doi_thu');n.vaiTxt=n.vai.map(v=>VAI[v]||v).join(', ')}return [n.n,dv]}
function on(n,d){n.on=Math.max(0,(n.on||0)+d)}
function oan(n,d){n.oan=Math.max(0,(n.oan||0)+d);if(n.oan>=30&&!n.vai.includes('doi_thu')){n.vai.push('doi_thu');n.vaiTxt=n.vai.map(v=>VAI[v]||v).join(', ')}}
const act=vai=>Object.values(root().np.l).filter(n=>n.ok!==0&&n.vai&&n.vai.includes(vai));
/* tác dụng cơ học của vai trò: số người ở vai có rel từ mức min trở lên */
const bonus=(vai,min)=>act(vai).filter(n=>(n.rel||0)>=(min==null?30:min)).length;
/* hậu sự gắn người: sau months tháng gọi sự kiện evId cho người c, kèm npc để hiện thẻ */
/* d9.12.66: việc hẹn cho NPC chưa đủ 18 tuổi (báo ơn, tạ lễ, nhờ việc…) lùi tới khi bé trưởng thành; chỉ sự kiện của trẻ (np_tre_*) mới ra khi còn nhỏ */
function laterNpc(n,c,evId,months,extra){const a=n&&n.born!=null?Math.floor((S().t-n.born)/12):99;if(a<18&&!/^np_tre_/.test(evId))months=Math.max(months,(18-a)*12+R(0,18));later(c,evId,months,Object.assign({npc:n.id},extra||{}))}
/* d9.12.66 (chủ dự án 24/11: "con nuôi không hiện avatar, không biết tiềm năng"): đứa bé được tạo ngay lúc kể chuyện để hiện thẻ và tư chất TRƯỚC khi chọn; kidOffer tạo bé (người chưa vào gia phả) kèm NPC để hiện thẻ; kidTake đưa đúng bé đó vào nhà; kidAway để bé sống nơi khác và hẹn chuỗi lớn lên (np_tre_*) */
function kidOffer(c,d,o){o=o||{};const g=o.g||(chance(0.5)?'nam':'nữ');const a=o.age!=null?o.age:R(3,8);const kid=G.mkPerson({g,age:a,young:true,surname:c.surname});
  const avg=k=>Math.round(((kid.gn&&kid.gn[k]?kid.gn[k][0]+kid.gn[k][1]:100)/2));d.kid={g,a,given:kid.given,gn:kid.gn,tg:kid.tg};
  const n=ensure(c,{vai:['quen'],name:kid.surname+' '+kid.given,g,age:a,st:{tri:avg('tri'),vo:avg('vo'),mi:avg('mi'),eq:avg('eq')},nghe:o.nghe||(a<=1?'trẻ sơ sinh, chưa nơi nương tựa':'trẻ '+a+' tuổi, chưa nơi nương tựa'),tier:1,rel:0,why:o.why||'cần người nuôi',noHouse:true});
  d.npc=n.id;d.pot=G.potLine?G.potLine(kid):'';return n}
function kidTake(c,d){const k=G.adopt(c,{age:d.kid.a,g:d.kid.g,given:d.kid.given,gn:d.kid.gn,tg:d.kid.tg});const n=d.npc?get(d.npc):null;if(n){n.ok=0}return k}
function kidAway(c,d,how,months){const n=d.npc?get(d.npc):null;if(!n)return null;n.guard=how||'người nuôi';n.gt=1;n.rel=Math.max(n.rel||0,5);const a=Math.floor((S().t-n.born)/12);laterNpc(n,c,'np_tre_thu',a<5?(6-a)*12+R(0,12):(months||R(10,24)),{how:n.guard});return n}
/* ---------- đồ thị quan hệ (cạnh có kiểu) ---------- */
const K=(a,b,k)=>a+'|'+b+'|'+k;
function rgSet(a,b,k,d,why){const s=root();const key=K(a,b,k);const e=s.rg.e[key]||(s.rg.e[key]={w:0,t:S().t,why:[]});e.w=clamp(e.w+d,-100,100);e.t=S().t;if(why){e.why.push(String(why).slice(0,60));if(e.why.length>4)e.why.shift()}return e.w}
const rgGet=(a,b,k)=>{const e=root().rg.e[K(a,b,k)];return e?e.w:0};
const rgOf=node=>Object.entries(root().rg.e).filter(([k])=>k.startsWith(node+'|')||k.includes('|'+node+'|')).map(([k,e])=>({k,w:e.w,why:e.why,t:e.t}));
/* ---------- hằng năm: người quen tìm đến, gia tộc giúp nhau ---------- */
const TIEACT={ /* vai: [xác suất mỗi năm, sự kiện, điều kiện rel] */
 ban_than:[0.10,'tie_ban_nho',-100],an_nhan:[0.09,'tie_an_nhan_tra',10],quy_nhan:[0.10,'tie_quy_nhan_giup',20],ket_nghia:[0.11,'tie_ket_nghia_giup',10],
 thay:[0.07,'tie_thay_tham',10],thuoc_ha:[0.10,'tie_thuoc_ha',-100],an_si:[0.04,'tie_cao_nhan_ve',5],doi_thu:[0.12,'tie_doi_thu_hai',-100],cao_nhan:[0.04,'tie_cao_nhan_ve',10],lang_gieng:[0.05,'tie_lang_gieng',-100]};
/* d9.12.63 (chủ dự án: "quý nhân ngỏ lời vô lí, người ta đang bị làm khó mà tự dưng tới giúp nhà mình"): quý nhân và anh em kết nghĩa chỉ ra tay khi (a) nhà đang gặp khó thật (trouble) hoặc người ấy mang ơn nhà (on>0), và (b) bản thân người ấy đang ổn (không sa sút trong 6 năm, từ bậc có thế trở lên với quý nhân, không mang oán). Lời kể hiện lý do. */
function trouble(){const s=S();const R_=[];try{if(s.money<mm(12))R_.push('đang túng thiếu');}catch(e){}
  const t=s.tax;if(t&&t.owed>0)R_.push('còn nợ thuế');
  if(alive().some(p=>inClan(p)&&(p.ill||[]).some(i=>i.sev>=3)))R_.push('có người ốm nặng');
  if((s.cases||[]).some(x=>s.t-x.t<24))R_.push('đang vướng việc kiện tụng');
  if(s.war)R_.push('chịu cảnh chiến sự');
  if(s.people.some(p=>p.dead!=null&&s.t-p.dead<12&&(p.gen||1)>=1&&!p.left))R_.push('vừa có tang');
  return R_.length?R_[Math.floor(Math.random()*R_.length)]:null}
const npStable=(n,minTier)=>!((n.sa!=null&&S().t-n.sa<72)||((n.tier!=null?n.tier:2)<minTier)||(n.oan||0)>=15);
function tieYear(){const s=root();s.rg.yc=0;
  const L=Object.values(s.np.l).filter(n=>n.ok!==0&&n.vai&&n.vai.length);
  for(const n of L){const a=G.np.age(n);if(a<14)continue;
    for(const v of n.vai){const T=TIEACT[v];if(!T)continue;if(s.rg.yc>=2)break;
      if(v==='doi_thu'?(n.rel>-10&&(n.oan||0)<10):(n.rel||0)<T[2])continue;
      let why=null;if(v==='quy_nhan'||v==='ket_nghia'){why=trouble();if(!why&&!((n.on||0)>0))continue;if(!npStable(n,v==='quy_nhan'?2:1))continue}
      if(chance(T[0]*0.4)){const tgt=G.npc&&G.npc.reach?G.npc.reach(n):null;if(!tgt)continue; /* d9.12.65: chỉ tìm tới người đang ở cùng nơi */
        if(!X.EVMAP[T[1]])continue;
        if(((s.evLast&&s.evLast[T[1]])||-999)>s.t-12)continue; /* d9.12.63: cùng một sự kiện người quen không ra hai lần trong 12 tháng */
        if((s.cool&&(s.cool[T[1]]||-1e9)>s.t&&false))continue;
        enqueue('ev',tgt.id,{ev:T[1],data:{npc:n.id,why}});s.rg.yc++}}}
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
  if(!s.biz&&!G.tierIdx())return;const lo=G.localOfficer?G.localOfficer('trihuyen'):null;/* d9.12.65: chỉ khi quan huyện thật đang ngồi ghế ở tỉnh nhà và không thanh liêm (liêm dưới 50) */if(lo&&lo.st.liem<50&&chance(0.07+(50-lo.st.liem)/400+(s.war?0.05:0))&&X.EVMAP.thu_lam_thu&&G.tierIdx()>=1){const h=alive().find(p=>p.id===s.head);if(h)enqueue('ev',h.id,{ev:'thu_lam_thu',data:{}})}}
G.tax={base:taxBase,ex:taxEx,state:taxS,pol:taxSetPol,POLN};
/* thu nhập của chức võ sư dân binh và chủ võ đường (v641_vo_do) */
function statusYear(){alive().filter(p=>inClan(p)&&p.dead==null&&p.flags).forEach(p=>{if(p.flags.vosinh){p.purse=(p.purse||0)+mm(1.5)*3}if(p.flags.vodduong){p.purse=(p.purse||0)+mm(4);if(chance(0.1))G.addStat(p,'vo',1)}})}
X.yearly.push(tieYear,romYear,taxYear,statusYear);Object.assign(X.fn,{taxCollect});
Object.assign(G,{tie:{ensure,adopt,kidOffer,kidTake,kidAway,get,rel,on,oan,act,bonus,later:laterNpc,note,VAI,trouble,stable:npStable},rg:{set:rgSet,get:rgGet,of:rgOf}});
Object.assign(X.fn,{tieYear,rgFamilyYear});
});
