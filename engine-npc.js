/* Bách Niên Thế Gia v6.7.10-d9.12.62 · engine-npc.js: NPC CÓ SUY NGHĨ SÂU SẮC (chủ dự án 24/11: "các nhân vật có suy nghĩ sâu sắc hơn, mỗi thế giới thay đổi, bị ảnh hưởng bởi người chơi, các nhân vật có quá khứ, hiện tại và tương lai, tính cách, suy nghĩ, năng lực của mỗi người quyết định, không chỉ người trong gia tộc mà cả NPC").
   Trả lời của chủ dự án: (1) B: chỉ NPC có quan hệ với nhà (có vai trong sổ người quen, G.tie.ensure) mới sâu; (2) mục tiêu ẨN, không hiện ra cụ thể; (3) A cho NPC có quan hệ, B cho phần còn lại; (4) không làm thành tin: việc của NPC phải thành SỰ KIỆN hoặc KỲ NGỘ có chính NPC ấy (ev-d912aw.js).
   Mô hình trên bản ghi NPC (S.np.l[id]), thêm vào cái sổ người quen đã có (engine-rg.js):
   - n.sub: 11 trục tính cách như người trong gia tộc (cc, tv, ht, hd, dl, gan, thanh, rong, diem, tiet, yc); n.sk: 4 kỹ năng (muu, khau, ql, ky); n.hp; n.fam {spouse, kids}
   - QUÁ KHỨ: n.past (vài mốc đời, tối đa 8) cộng n.ky (ký ức về nhà chơi); HIỆN TẠI: n.tier, n.nghe, n.job, n.rel/on/oan; TƯƠNG LAI: n.goal {k,p,t} (ẨN): thang_tien, giau_co, danh_tieng, lo_gia_dinh, bao_an, bao_thu, binh_yen, tu_hanh
   - Mỗi năm (npcYear): già đi, có thể sa sút hay chết; tiến tới mục tiêu theo tính cách và năng lực, được đẩy nhanh nếu nhà chơi từng giúp (n.on) hoặc bị kìm nếu nhà chơi hại (n.oan); đạt mục tiêu hay biến cố lớn thì HẸN MỘT SỰ KIỆN cho nhà chơi (np_*), tối đa 2 việc mỗi năm.
   - NPC chết có thể để lại người con (n.heir) kế thừa quan hệ: ơn thành ơn, oán thành oán truyền đời.
   - Người trong gia tộc có c.goal ẨN (famGoalYear): chi phối tự quyết (goalAff dùng ở autoPick) và đôi khi ngỏ ý với gia chủ (sự kiện gd_y_nguyen).
   - Ảnh hưởng thế giới (mức B): quan hệ của nhà với môn phái (sect.rel) kéo sức mạnh phái lên hoặc xuống từng năm. */
window.ENGX=window.ENGX||[];
window.ENGX.push(X=>{
const {R,chance,log,alive,inClan,P,pick,clamp,age,enqueue,esc,mm,nameOf}=X;
const G=X.EC.G;const S=()=>X.S;
const AXK=['cc','tv','ht','hd','dl','gan','thanh','rong','diem','tiet','yc'];
const AXL={cc:['siêng năng','lười biếng'],tv:['nhiều tham vọng','an phận'],ht:['hiếu thuận','ngỗ nghịch'],hd:['hòa đồng','cô độc'],dl:['tự lập','hay dựa dẫm'],gan:['gan dạ','nhút nhát'],thanh:['thật thà','gian xảo'],rong:['rộng lượng','ích kỷ'],diem:['điềm tĩnh','nóng nảy'],tiet:['biết tiết chế','buông thả'],yc:['kiên định','nhu nhược']};
const BIAS={thay:{ht:10,thanh:12,rong:8,diem:10},thuong_nhan:{tv:15,cc:8,thanh:-6},doi_thu:{rong:-15,thanh:-8,diem:-12},ban_than:{hd:15,thanh:10,rong:8},an_nhan:{rong:12,thanh:10},quy_nhan:{tv:10,yc:10,diem:6},cao_nhan:{tiet:15,diem:15,tv:-12},an_si:{tv:-15,hd:-12,diem:12},thuoc_ha:{ht:10,dl:-8},ket_nghia:{gan:12,rong:10,thanh:8},mon_sinh:{cc:10,ht:8},nguoi_thuong:{hd:6},lang_gieng:{hd:8},huong_truong:{thanh:6,rong:4,yc:6},thay_thuoc:{rong:10,thanh:8,diem:8,cc:8},tuong:{gan:12,yc:12},phe_chu:{tv:15,yc:10}};
const KW=[[/thương nhân|lái buôn|lái thương|chủ hãng/i,{tv:10,cc:6}],[/quan |chưởng môn|tướng|trụ trì/i,{yc:6,tv:4}],[/lừa|giả danh|kẻ gian|gian xảo|ranh mãnh/i,{thanh:-22,rong:-6}],[/thật thà|hiền|nhân hậu|chất phác/i,{thanh:14,rong:10}],[/nóng|hung hăng|ngang ngược|côn đồ/i,{diem:-18,gan:8}],[/nghèo|đói|mồ côi/i,{tiet:6,cc:6}],[/giàu|phú hộ|nhà giàu/i,{tiet:-6,tv:4}],[/già|lão|cụ /i,{diem:6,tv:-6}]];
/* ---------- khung tính cách, kỹ năng, mục tiêu cho NPC có quan hệ ---------- */
const ax=(n,k)=>n&&n.sub&&n.sub[k]!=null?n.sub[k]:50;
const nage=n=>G.np.age(n);
function pastAdd(n,x){n.past=n.past||[];n.past.push({t:S().t,x:String(x).slice(0,90)});if(n.past.length>8)n.past.shift()}
function deepen(n,o){if(!n||n.sub)return n;o=o||{};
  const sub={};AXK.forEach(k=>{let v=R(25,75);(n.vai||[]).forEach(vv=>{const b=BIAS[vv];if(b&&b[k])v+=b[k]});KW.forEach(([re,b])=>{if(re.test(n.nghe||'')&&b[k])v+=b[k]});sub[k]=clamp(Math.round(v),5,98)});
  n.sub=sub;const st=n.st||{tri:50,vo:50,mi:50,eq:50};const ti=n.tier!=null?n.tier:2;
  n.sk={muu:clamp(Math.round((st.tri+st.eq)/2+R(-15,15)),5,98),khau:clamp(Math.round(st.eq+R(-15,15)+((n.vai||[]).includes('thuong_nhan')?10:0)),5,98),ql:clamp(Math.round(28+ti*8+R(-10,15)),5,98),ky:clamp(Math.round(R(25,70)+(/thợ|rèn|thầy thuốc|đóng|khắc/.test(n.nghe||'')?20:0)),5,98)};
  n.hp=n.hp||R(70,100);const a=nage(n);n.fam={spouse:a>=24?chance(0.75):false,kids:a>=28?(chance(0.7)?R(1,3):0):0};
  n.past=n.past||[];if(!n.past.length)pastAdd(n,o.why?('Quen nhà vì '+o.why):'Quen biết nhà từ trước');
  n.goal=pickGoal(n);return n}
const GW={
 thang_tien:n=>(n.tier<6?ax(n,'tv')*1.0+Math.max(n.sk.muu,n.sk.khau)*0.3:0),
 giau_co:n=>ax(n,'tv')*0.6+(100-ax(n,'tiet'))*0.3+n.sk.ql*0.3,
 danh_tieng:n=>ax(n,'tv')*0.4+ax(n,'hd')*0.5,
 lo_gia_dinh:n=>(nage(n)>=18&&nage(n)<=42&&!n.fam.spouse)?70:0,
 bao_an:n=>(n.on||0)>=5?40+ax(n,'thanh')*0.5+ax(n,'rong')*0.3+(n.rel||0)*0.2:0,
 bao_thu:n=>(n.oan||0)>=15?30+(100-ax(n,'diem'))*0.5+ax(n,'yc')*0.4:0,
 binh_yen:n=>(100-ax(n,'tv'))*0.7+(nage(n)>50?20:0),
 tu_hanh:n=>nage(n)>=50?(100-ax(n,'hd'))*0.5+ax(n,'tiet')*0.3:0};
function pickGoal(n){const L=Object.keys(GW).map(k=>[k,Math.max(0,GW[k](n))]).filter(x=>x[1]>0);if(!L.length)return {k:'binh_yen',p:0,t:S().t};
  const tot=L.reduce((s,x)=>s+x[1]*x[1],0);let r=Math.random()*tot;for(const [k,w] of L){r-=w*w;if(r<=0)return {k,p:0,t:S().t}}return {k:L[0][0],p:0,t:S().t}}
/* mô tả tính cách ngắn (hai nét nổi nhất) để lời kể đọc ra */
function desc(n){if(!n||!n.sub)return 'người khó đoán';const L=AXK.map(k=>[k,ax(n,k)-50]).sort((a,b)=>Math.abs(b[1])-Math.abs(a[1])).slice(0,2);return L.map(([k,v])=>AXL[k][v>=0?0:1]).join(', ')}
/* ---------- hẹn sự kiện cho nhà chơi (không làm tin) ---------- */
/* d9.12.65: NPC chỉ tìm tới người đang ở cùng nơi; người hay đi lại (lái buôn, đạo sĩ, ẩn sĩ…) thì ghé qua nơi nhà ở với xác suất 50% */
function reach(n){const h=alive().filter(p=>inClan(p)&&!p.away&&age(p)>=16);if(!h.length)return null;const hd=h.find(p=>p.id===S().head);const L=h.filter(p=>!n.loc||G.placeOf(p)===n.loc);
  if(L.length)return L.find(p=>p.id===S().head)||pick(L);
  if(n.wander&&chance(0.5)){n.loc=G.placeOf(hd||h[0]);return hd||pick(h)}return null}
/* d9.12.66 (chủ dự án 24/11: "nhớ ơn nhưng mới 13 tuổi thì lấy gì ra báo ơn; NPC chưa có cuộc sống thật"): NPC có giai đoạn đời theo tuổi: dưới 12 sống với người nuôi, 12 đến 17 học (chữ, võ, nghề) và lớn lên theo tư chất cùng sự nâng đỡ của nhà (n.sup), đủ 18 mới có nghề, địa vị, mục tiêu lớn (becomeAdult). Trẻ không nhận việc của người lớn (báo ơn, báo thù, thăng tiến…). */
const KIDBLOCK=['np_thanh_dat','np_sa_co','np_bao_an','np_bao_thu','np_cuoi_hoi'];
function kidLife(n,a){const g=n.guard||'người nuôi';n.st=n.st||{tri:50,vo:50,mi:50,eq:50};
  if(a<12){n.cond='còn nhỏ, sống với '+g;n.stage='tre';return}
  n.stage='hoc';if(!n.path){const st=n.st;n.path=(st.tri>=62&&st.tri>=st.vo)?'chu':(st.vo>=62?'vo':'nghe')}
  n.cond=({chu:'đang học chữ',vo:'đang học võ',nghe:'đang học nghề'})[n.path]+', ở với '+g;
  const k={chu:'tri',vo:'vo',nghe:'eq'}[n.path];n.st[k]=Math.min(100,(n.st[k]||50)+R(1,4)+((n.sup||0)>0?1:0))}
function becomeAdult(n,a){n.adult=1;n.stage='lon';const st=n.st||{tri:50,vo:50,mi:50,eq:50};const sup=n.sup||0;const path=n.path||(st.tri>=62?'chu':st.vo>=62?'vo':'nghe');let job,dt=0;
  if(path==='chu'){const sc=st.tri+sup*6+R(-15,15);if(sc>=88){job='quan nhỏ';dt=2}else if(sc>=66){job='thầy đồ';dt=1}else job='thư lại'}
  else if(path==='vo'){const sc=st.vo+sup*6+R(-15,15);if(sc>=85){job='võ sư đã có tiếng';dt=1}else job='lính'}
  else{const sc=st.eq+sup*6+R(-15,15);if(sc>=80){job='chủ một tiệm nhỏ';dt=1}else job='thợ làm thuê'}
  n.job=job;n.tier=Math.max(0,Math.min(6,(n.tier||1)+dt));pastAdd(n,'Trưởng thành, nay là '+job);setNghe(n,'nay là '+job+', đã tự lập');n.fam={spouse:false,kids:0};n.goal=pickGoal(n)}
function hook(n,ev,extra,opt){const s=S();opt=opt||{};if(nage(n)<18&&KIDBLOCK.includes(ev))return false;s.np.nc=s.np.nc||{y:-1,c:0};const y=Math.floor(s.t/12);if(s.np.nc.y!==y){s.np.nc={y,c:0}}
  if(((s.evLast&&s.evLast[ev])||-999)>s.t-6&&!opt.force)return false; /* d9.12.63: cùng id không ra hai lần trong 6 tháng */
  if(s.np.nc.c>=1&&!opt.force)return false; /* một việc của NPC mỗi năm là đủ: bot 60 năm với tối đa 2 cho 20 đến 29 sự kiện mỗi loại, quá dày */if(!X.EVMAP[ev])return false;if((n.hookT||-999)>s.t-24&&!opt.force)return false;
  const h=alive().filter(p=>inClan(p)&&!p.away&&age(p)>=16);const head=h.find(p=>p.id===s.head);const tgt=reach(n)||(opt.force?(head||h[0]||null):null);if(!tgt)return false;
  enqueue('ev',tgt.id,{ev,data:Object.assign({npc:n.id},extra||{})});n.hookT=s.t;s.np.nc.c++;return true}
/* ---------- một năm sống của NPC ---------- */
function setNghe(n,t){n.cond=t} /* tình cảnh hiện tại; n.nghe giữ nguyên lai lịch gốc */
function die(n){const s=S();n.ok=0;n.dead=s.t;pastAdd(n,'Qua đời');
  /* người con kế thừa quan hệ: ơn thành ơn, oán thành oán truyền đời */
  if(n.fam&&n.fam.kids>0&&((n.rel||0)>=20||(n.on||0)>=5||(n.oan||0)>=15)&&chance(0.7)){
    const sur=String(n.n).split(' ')[0];const nm=sur+' '+(n.g==='nam'?pick(['Quang','Văn','Đức','Minh','Thành','Hữu']):pick(['Quang','Văn','Đức','Minh','Thành','Hữu']))+' '+pick(['Anh','Bình','Cường','Dũng','Hải','Khải','Long','Nam','Phúc','Sơn']);
    const kid=G.np.new({n:nm,g:chance(0.6)?'nam':'nữ',age:R(18,32),role:'quen'});
    kid.st={tri:clamp(Math.round((n.st.tri||50)+R(-12,12)),10,98),vo:clamp(Math.round((n.st.vo||50)+R(-12,12)),10,98),mi:clamp(Math.round((n.st.mi||50)+R(-12,12)),10,98),eq:clamp(Math.round((n.st.eq||50)+R(-12,12)),10,98)};
    kid.vai=[];const par=n.vai||[];if((n.oan||0)>=15||par.includes('doi_thu'))kid.vai.push('doi_thu');if((n.on||0)>=5||par.includes('an_nhan'))kid.vai.push('an_nhan');if(par.includes('ban_than')||par.includes('ket_nghia'))kid.vai.push('ban_than');if(!kid.vai.length)kid.vai.push('quen');
    kid.vaiTxt=kid.vai.map(v=>G.tie.VAI[v]||v).join(', ');kid.nghe='con của '+n.n+', người từng '+(n.vaiTxt||'quen biết nhà');kid.job=null;kid.tier=Math.max(0,(n.tier||2)-1);kid.key='con_'+n.id;
    kid.rel=Math.round((n.rel||0)*0.6);kid.on=Math.round((n.on||0)*0.6);kid.oan=Math.round((n.oan||0)*0.6);kid.ky=[];kid.loc=n.loc;kid.src=n.src;kid.parent=n.id;
    deepen(kid,{why:'là con của '+n.n});if(kid.oan>=15)kid.goal={k:'bao_thu',p:0,t:s.t};else if(kid.on>=5)kid.goal={k:'bao_an',p:0,t:s.t};pastAdd(kid,'Cha là '+n.n+(n.dead!=null?' (đã mất)':''));
    n.heir=kid.id}
  return n}
function npcYear(){const s=S();if(!s||!s.np||!s.np.l)return;
  const L=Object.values(s.np.l).filter(n=>n.ok!==0&&n.vai&&n.vai.length);
  for(const n of L){if(!n.sub)deepen(n);const a=nage(n);if(a<18){kidLife(n,a);continue}if(!n.adult)becomeAdult(n,a);
    /* sống và chết */
    n.hp=Math.max(0,(n.hp||80)-(a>55?R(0,4):R(-1,1)));
    if(n.wander&&chance(0.3))n.loc=pick(Object.keys(window.D.PROV));else if((n.vai||[]).includes('quan')&&chance(0.1))n.loc=pick(Object.keys(window.D.PROV)); /* d9.12.65: người hay đi lại đổi chỗ, quan thuyên chuyển */
    const pd=(a>=60?(a-60)/200:0)+(a>=85?0.1:0)+(a<60?0.004:0)+(n.hp<=0?0.3:0);
    if(chance(pd)){die(n);if(n.rel>=35||(n.on||0)>=8||(n.oan||0)>=20)hook(n,'np_qua_doi',{},{force:true});continue}
    const g=n.goal||(n.goal=pickGoal(n));
    /* nhà chơi ảnh hưởng: được giúp thì có ơn và muốn trả, bị hại thì có oán và muốn báo thù */
    if(g.k!=='bao_an'&&(n.on||0)>=8&&ax(n,'thanh')+ax(n,'rong')>=100&&chance(0.25))n.goal=Object.assign(pickGoal(n),{k:'bao_an'});
    else if(g.k!=='bao_thu'&&(n.oan||0)>=20&&chance(0.3))n.goal={k:'bao_thu',p:0,t:s.t};
    else if(s.t-g.t>=15*12)n.goal=pickGoal(n);
    const G2=n.goal;let inc=4+(ax(n,'cc')-50)/10+Math.max(n.sk.ql,n.sk.muu)/25+R(-2,3);
    if(G2.k==='thang_tien'||G2.k==='giau_co'||G2.k==='danh_tieng'){inc+=Math.min(5,(n.on||0)/4);if((n.oan||0)>=20)inc-=3}
    if(G2.k==='bao_an'||G2.k==='bao_thu')inc=7+(G2.k==='bao_thu'?(100-ax(n,'diem'))/25:ax(n,'rong')/25);
    if(G2.k==='lo_gia_dinh')inc=12;
    if(G2.k==='binh_yen'||G2.k==='tu_hanh')inc=3;
    G2.p+=Math.max(0,inc);
    /* biến cố sa sút */
    if(chance(0.025+(n.tier>=5?0.015:0)+(ax(n,'tiet')<35?0.015:0))&&(n.tier||0)>=1){n.tier=Math.max(0,(n.tier||1)-1);n.sa=s.t;pastAdd(n,'Gặp biến cố, sa sút');setNghe(n,'người vừa gặp biến cố, cơ nghiệp sa sút');n.goal={k:'binh_yen',p:0,t:s.t};if(n.rel>=15&&chance(0.6)&&hook(n,'np_sa_co',{}))continue}
    if(G2.p<100)continue;
    /* đạt mục tiêu */
    const k=G2.k;let done=false;
    if(k==='thang_tien'&&(n.tier||0)<6){n.tier=(n.tier||0)+1;pastAdd(n,'Thăng tiến, nay địa vị cao hơn');setNghe(n,'người nay đã thăng tiến, địa vị cao hơn xưa');done=true;if(n.rel>=15&&chance(0.7))hook(n,'np_thanh_dat',{goal:k})}
    else if(k==='giau_co'&&(n.tier||0)<6){n.tier=(n.tier||0)+1;n.sk.ql=Math.min(98,n.sk.ql+4);pastAdd(n,'Làm ăn phát đạt');setNghe(n,'người nay làm ăn phát đạt');done=true;if(n.rel>=15&&chance(0.7))hook(n,'np_thanh_dat',{goal:k})}
    else if(k==='danh_tieng'){pastAdd(n,'Nổi danh trong vùng');setNghe(n,'người nay nổi danh trong vùng');done=true;if(n.rel>=15&&chance(0.7))hook(n,'np_thanh_dat',{goal:k})}
    else if(k==='lo_gia_dinh'&&!n.fam.spouse){n.fam.spouse=true;pastAdd(n,'Lập gia đình');done=true;if(n.rel>=15)hook(n,'np_cuoi_hoi',{})}
    else if(k==='bao_an'&&(n.on||0)>=5){done=true;if(!hook(n,'np_bao_an',{}))G2.p=60}
    else if(k==='bao_thu'&&(n.oan||0)>=15){done=true;if(!hook(n,'np_bao_thu',{}))G2.p=60}
    else if(k==='binh_yen'||k==='tu_hanh'){if(!(n.vai||[]).includes('an_si')&&k==='tu_hanh'){n.vai.push('an_si');n.vaiTxt=n.vai.map(v=>G.tie.VAI[v]||v).join(', ');pastAdd(n,'Về ở ẩn');setNghe(n,'người đã về ở ẩn, tránh chuyện đời')}done=true}
    if(done){n.goal=pickGoal(n)}else G2.p=60}
  worldYear();famGoalYear()}
/* ---------- ảnh hưởng thế giới mức B: môn phái ---------- */
function worldYear(){const W=S().wr;if(!W||!W.sects)return;W.sects.forEach(sc=>{const r=sc.rel||0;if(r>=30&&chance(0.4))sc.pow=Math.min(100,(sc.pow||50)+1);else if(r<=-30&&chance(0.4))sc.pow=Math.max(5,(sc.pow||50)-1)})}
/* ---------- người trong gia tộc: mục tiêu ẩn ---------- */
const FG={lenchuc:{n:'lên chức',aff:/thăng|chức|xin|lo lót|tiến cử|nhậm|ra mặt|nhận lời|dự yến/i},lapcong:{n:'lập công danh',aff:/ra trận|xung phong|lập công|đánh|dẹp|nhập ngũ|tòng quân|đi xa/i},giau:{n:'làm giàu',aff:/tiền|buôn|vốn|đầu tư|mở |mua|góp|bán|thu về/i},hocvan:{n:'học hành',aff:/học|thi|sách|thầy|đọc|chữ|khoa/i},hieu:{n:'giữ đạo hiếu',aff:/cha mẹ|phụng dưỡng|ở lại|giúp nhà|về nhà|chăm/i},binhyen:{n:'sống yên ổn',aff:/yên|giữ nguyên|từ chối|thôi|ở nhà|tránh|lặng lẽ|không/i}};
function famPick(c){const a=age(c);const sub=k=>(c.sub&&c.sub[k]!=null)?c.sub[k]:50;const L=[];
  L.push(['lenchuc',sub('tv')*1.0+((c.job==='quan'||c.job==='none')?10:0)]);L.push(['lapcong',sub('gan')*0.7+(c.vo||40)*0.5]);L.push(['giau',sub('tv')*0.6+(100-sub('tiet'))*0.3]);L.push(['hocvan',(c.tri||40)*0.6+sub('cc')*0.5]);L.push(['hieu',sub('ht')*0.9]);L.push(['binhyen',(100-sub('tv'))*0.8]);
  const tot=L.reduce((s,x)=>s+x[1]*x[1],0);let r=Math.random()*tot;for(const [k,w] of L){r-=w*w;if(r<=0)return {k,t:S().t,y:0}}return {k:'binhyen',t:S().t,y:0}}
function goalDone(c,k){switch(k){case 'lenchuc':return (c.job==='quan'&&c.lv>=3)||(c.job==='quan_ngu'&&c.lv>=3);case 'lapcong':return (c.merit||0)>=40||c.job==='hiep'&&c.lv>=2;case 'giau':return (c.purse||0)>=mm(60)||(c.job==='chu'&&c.lv>=2);case 'hocvan':return (c.degree||0)>0||(c.tri||0)>=85;default:return false}}
function famGoalYear(){const s=S();let req=0;alive().filter(c=>inClan(c)&&!c.inLaw&&age(c)>=16&&!c.away).forEach(c=>{
  if(!c.goal||!FG[c.goal.k])c.goal=famPick(c);const g=c.goal;g.y=(g.y||0)+1;
  if(goalDone(c,g.k)&&!g.ok){g.ok=1;G.addStat(c,'tam',5);pastAddFam(c,'toại nguyện: '+FG[g.k].n);c.goal=famPick(c);return}
  if(g.y>=10&&!g.ok&&['lenchuc','lapcong','giau','hocvan'].includes(g.k)&&!g.sad){g.sad=1;G.addStat(c,'tam',-3)}
  if(g.y>=2&&!g.asked&&chance(0.05)&&req<1&&X.EVMAP.gd_y_nguyen&&!c.away){g.asked=1;req++;const hd=alive().find(p=>p.id===s.head);if(hd&&hd.id!==c.id)enqueue('ev',hd.id,{ev:'gd_y_nguyen',data:{who:c.id,gk:g.k}})}})}
function pastAddFam(c,x){c.pastX=c.pastX||[];c.pastX.push({t:S().t,x});if(c.pastX.length>6)c.pastX.shift()}
function goalAff(c,l){try{if(!c||!c.goal||!l)return 0;const f=FG[c.goal.k];return f&&f.aff.test(String(l).replace(/<[^>]*>/g,''))?0.6:0}catch(e){return 0}}
G.npc={deepen,ax,desc,pickGoal,hook,reach,adult:n=>{if(!n.adult&&nage(n)>=18)becomeAdult(n,nage(n))},die,AXL,FG,goalTxt:k=>FG[k]?FG[k].n:k};
X.yearly.push(npcYear);Object.assign(X.fn,{npcYear,deepen,goalAff,famGoalYear});
});
