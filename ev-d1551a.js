/* Bách Niên Thế Gia · 7.0.0-d.1.5.51 · THẾ LỰC TRÊN BẢN ĐỒ (đợt C; chủ dự án 27/11: "thế lực tự phát cũng phải tồn tại ảnh hưởng tới người chơi nếu gặp phải … thổ phỉ, sơn tạc, cướp, hội giáo, võ phái, danh môn, tà phái, chính đạo, võ lâm ở những vị trí thực tế trên bản đồ,
   người đứng đầu là NPC thực, chỉ số cực cao tùy theo nơi kẻ đó làm chủ, người liên quan … có chỉ số tùy theo chức vụ và địa vị … Bản đồ và thế lực không chỉ làm cho có, phải thực sự tác động", "các thế lực cũng có thể nảy sinh tranh chấp, liên minh").
   Dữ liệu ở S.fz. Môn phái của hạt giống thế giới (S.wr.sects) là một phần của sổ này, giữ tên và chưởng môn, sức đồng bộ hai chiều. */
(function(){
let G=null;const S=()=>G.S();const R=(a,b)=>G.R(a,b);const pk=a=>a[Math.floor(Math.random()*a.length)];const cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const P=()=>window.D.PROV;const has=(p,l)=>window.D.hasDH(p,l);
/* loại thế lực: nhãn, nhóm (cuop = làm hại người đi đường và dân; giao = hội giáo; vo = võ lâm; quy = quyền thế), tên gốc, nơi được đóng */
const LOAI={
 sontac:{n:'sơn tặc',nh:'cuop',ten:['Trại Phi Hổ','Trại Xích Nha','Trại Bạch Lang','Trại Thiết Chùy','Trại Cửu Khúc','Trại Ô Nha'],o:p=>has(p,['nui','rung'])},
 thophi:{n:'thổ phỉ',nh:'cuop',ten:['Bọn Đầu Trâu','Bọn Khăn Đỏ','Bọn Roi Sắt','Toán Mặt Sẹo','Toán Đêm Không Trăng'],o:p=>has(p,['dongbang','thao','dam'])},
 haitac:{n:'cướp biển',nh:'cuop',ten:['Đoàn Thuyền Đen','Bang Cá Mập','Bang Sóng Dữ','Đoàn Buồm Rách'],o:p=>has(p,['bien'])},
 macphi:{n:'cướp sa mạc',nh:'cuop',ten:['Mã phỉ Cát Vàng','Mã phỉ Lang Nha','Đoàn Kỵ Hắc Sa'],o:p=>has(p,['samac'])},
 banghoi:{n:'bang hội phố chợ',nh:'cuop',ten:['Thanh Trúc Bang','Tào Bang','Cái Bang phân đà','Thiết Quyền Hội'],o:p=>['kinh','phu','cang'].includes(P()[p].k)},
 hoigiao:{n:'hội giáo',nh:'giao',ten:['Bạch Liên Giáo','Hỏa Thần Hội','Vô Vi Đạo','Minh Tôn Giáo','Hồng Đăng Hội'],o:p=>true},
 danhmon:{n:'danh môn võ học',nh:'quy',ten:['Mai Hoa Sơn Trang','Thiết Kiếm Sơn Trang','Cô Tô Võ Phủ','Lạc Anh Trang','Vân Long Tiêu Gia'],o:p=>['kinh','phu','cang','lang'].includes(P()[p].k)},
 chinh:{n:'chính phái',nh:'vo'},ta:{n:'tà phái',nh:'vo'},trung:{n:'võ phái',nh:'vo'},
 botoc:{n:'bộ tộc kỵ mã',nh:'quy'},tuhai:{n:'liên minh hải tặc',nh:'cuop'},tutruong:{n:'các tù trưởng',nh:'quy'},ocdao:{n:'liên minh ốc đảo',nh:'quy'},phientran:{n:'phiên trấn',nh:'quy'}};
/* nước nhỏ cũ nay là thế lực */
const CU=[['botoc','Hắc Mã Bộ','bach_hoa',62],['tuhai','Hải Minh','hai_minh_ao',66],['tutruong','Thổ Ty Lam Sơn','lam_son',55],['ocdao','Liên Minh Ốc Đảo','thanh_tuyen',50],['phientran','Phiên Trấn Hà Tây','son_ha',72]];
const HO=['Lôi','Hàn','Tiêu','Lãnh','Bạch','Đoàn','Tần','Tống','Hùng','Mạnh','Cao','Phùng','Lữ','Diệp','Thẩm'];
const GOI={sontac:['Trại chủ','Nhị trại chủ','Đầu mục','Lâu la'],thophi:['Đầu lĩnh','Phó đầu lĩnh','Toán trưởng','Tay chân'],haitac:['Thuyền chủ','Phó thuyền','Lái trưởng','Thủy thủ'],macphi:['Thủ lĩnh','Phó thủ lĩnh','Kỵ trưởng','Kỵ phỉ'],
 banghoi:['Bang chủ','Phó bang chủ','Đà chủ','Bang chúng'],hoigiao:['Giáo chủ','Hộ pháp','Hương chủ','Giáo chúng'],danhmon:['Trang chủ','Thiếu trang chủ','Giáo đầu','Môn khách'],vo:['Chưởng môn','Trưởng lão','Đại đệ tử','Môn sinh'],
 botoc:['Tù trưởng','Thủ lĩnh nhánh','Kỵ trưởng','Kỵ binh'],tuhai:['Minh chủ','Đảo chủ','Thuyền trưởng','Hải tặc'],tutruong:['Thổ ty','Phó thổ ty','Đầu mục','Trai bản'],ocdao:['Minh trưởng','Thành chủ','Đội trưởng','Dân binh'],phientran:['Trấn thủ','Trấn tướng','Thiên hộ','Binh sĩ']};
const goi=(f,b)=>(GOI[f.loai]||GOI.vo)[b];
/* chỉ số người trong thế lực: theo sức thế lực và bậc (0 đứng đầu, 1 phó, 2 đầu mục, 3 thường) */
function chiSo(f,bac){const base=f.pow;const vo=[95+base*0.75,75+base*0.55,55+base*0.4,35+base*0.3][bac];const nh=LOAI[f.loai].nh;
  const them={cuop:{tri:-10,mi:-18,eq:-14},giao:{tri:8,mi:14,eq:18},vo:{tri:0,mi:-4,eq:-2},quy:{tri:10,mi:4,eq:6}}[nh];
  const nen=[62+base*0.35,52+base*0.25,44+base*0.18,38+base*0.1][bac];const v=x=>Math.round(cl(x+R(-6,6),18,175));
  return {vo:v(vo),tri:v(nen+them.tri),mi:v(nen+them.mi),eq:v(nen+them.eq),suc:v(Math.min(100,62+base*0.4-bac*5))}}
/* tên không được lặp họ ở chữ đệm ("Mạnh Mạnh Luân") */
const lapHo=n=>{const a=String(n||'').split(' ');return a.length>1&&a[0]===a[1]};
function tenMoi(g){for(let i=0;i<20;i++){const n=pk(HO)+' '+((G.outsiderName&&G.outsiderName(g||'nam')||{}).given||'Hổ');if(!lapHo(n))return n}return pk(HO)+' Hổ'}
function nguoi(f,bac,ten,g,age){const n=ten&&!lapHo(ten)?ten:tenMoi(g);return {n,g:g||(Math.random()<0.85?'nam':'nữ'),age:age||R(bac===0?32:20,bac===0?64:48),bac,st:chiSo(f,bac)}}
function lap(loai,name,p,pow,boss,age){const f={id:'fz'+(S().fzId=(S().fzId||0)+1),loai,n:name,p,pow:Math.round(pow),rel:0,thu:[],ban:[],chet:0,tu:S().t,hist:[]};
  f.chu=nguoi(f,0,boss,boss?'nam':null,age);f.duoi=[nguoi(f,1),nguoi(f,2),nguoi(f,2)];return f}
function ensure(){const s=S();if(!s||!s.wr)return null;if(s.fz)return s.fz;const L=[];s.fz={l:L};
  (s.wr.sects||[]).forEach(x=>{if(lapHo(x.boss))x.boss=tenMoi('nam');const f=lap(x.al||'trung',x.n,P()[x.p]?x.p:pk(Object.keys(P())),x.pow||50,x.boss,x.age);f.sect=x.id;L.push(f)});
  CU.forEach(([loai,n,p,pow])=>{if(P()[p])L.push(lap(loai,n,p,pow+R(-8,8)))});
  /* mỗi nước đều có đủ loại; mỗi khu tối đa hai thế lực mới */
  const dem=p=>L.filter(f=>f.p===p&&f.sect==null).length;const dung=new Set(L.map(f=>f.n));
  const rai=(loai,so)=>{const T=LOAI[loai];const khu=Object.keys(P()).filter(p=>T.o(p)).sort(()=>Math.random()-0.5);let k=0;for(const p of khu){if(k>=so)break;if(dem(p)>=2)continue;const ten=T.ten.filter(t=>!dung.has(t));const n=ten.length?pk(ten):pk(T.ten)+' '+P()[p].n;dung.add(n);L.push(lap(loai,n,p,R(18,72)));k++}};
  rai('sontac',9);rai('thophi',7);rai('haitac',4);rai('macphi',3);rai('banghoi',6);rai('hoigiao',4);rai('danhmon',5);
  /* thù và bạn: cùng khu hoặc khu liền kề thì dễ sinh chuyện; chính và tà vốn không đội trời chung */
  for(const a of L)for(const b of L){if(a.id>=b.id||!ke(a.p,b.p))continue;const x=Math.random();const chinhTa=(a.loai==='chinh'&&(b.loai==='ta'||LOAI[b.loai].nh==='cuop'))||(b.loai==='chinh'&&(a.loai==='ta'||LOAI[a.loai].nh==='cuop'));
    if(chinhTa||x<0.2){a.thu.push(b.id);b.thu.push(a.id)}else if(x<0.3){a.ban.push(b.id);b.ban.push(a.id)}}
  return s.fz}
const ke=(a,b)=>a===b||(window.D.ADJ[a]||[]).some(z=>z[0]===b);
const taiO=f=>String(f.n).includes(P()[f.p].n)?'':` ở ${P()[f.p].n}`;
const song=()=>{const F=ensure();return F?F.l.filter(f=>!f.chet):[]};
const lay=id=>{const F=ensure();return F&&F.l.find(f=>f.id===id)};
const o=p=>song().filter(f=>f.p===p).sort((a,b)=>b.pow-a.pow);
/* nguy hiểm trên một lộ trình: cộng theo thế lực cướp bóc đóng trên đường; đã giao hảo (từ 30) thì cho qua, kết thân (từ 60) còn che chở */
function nguyHiem(path){let r=0;const gap=[];let che=null;for(const p of (path||[]))for(const f of o(p)){const nh=LOAI[f.loai].nh;
    if(f.rel>=60&&!che)che=f;else if(f.rel>=30)continue;else if(nh==='cuop'||(f.loai==='ta')||(nh!=='vo'&&f.rel<=-30)||f.rel<=-40){r+=f.pow/100*0.09*(f.rel<=-30?1.6:1);gap.push(f)}}
  return {them:Math.min(0.28,r)*(che?0.4:1),gap:gap.sort((a,b)=>b.pow-a.pow),che}}
function tin(f,s){const here=S().loc&&S().loc.p;if(here&&f.p===here){G.log(`${f.n}${taiO(f)}: ${s}.`,'hi')}f.hist.unshift(`Năm ${Math.floor(S().t/12)+1}: ${s}`);if(f.hist.length>5)f.hist.pop()}
/* đổi đời người trong thế lực */
function doiNguoi(f){const all=[f.chu].concat(f.duoi);all.forEach(x=>x.age++);if(Math.random()<(f.chu.age<50?0.012:f.chu.age<65?0.035:0.1)){const cu=f.chu.n;const k=f.duoi.slice().sort((a,b)=>b.st.vo+b.st.tri-a.st.vo-a.st.tri)[0];
    f.duoi=f.duoi.filter(x=>x!==k);k.bac=0;k.st=chiSo(f,0);f.chu=k;f.duoi.push(nguoi(f,2));f.pow=cl(f.pow-R(3,14),5,100);f.rel=Math.round(f.rel*0.6);tin(f,`${goi(f,0)} ${cu} không còn, ${k.n} lên thay`)}}
function year(){if(!ensure())return;const s=S();const W=s.w;
  const thien=p=>W&&(W.dis||[]).some(d=>s.t>=d.since&&s.t<d.until&&d.provs.includes(p));const giac=p=>W&&(W.wars||[]).some(w=>w.front.includes(p));
  for(const f of song()){const nh=LOAI[f.loai].nh;let d=R(-4,4);
    if(thien(f.p))d+=nh==='cuop'||nh==='giao'?8:-3;if(giac(f.p))d+=nh==='cuop'?6:-4;if(f.pow>80)d-=3;if(f.pow<38)d+=nh==='cuop'||nh==='giao'?4:2;
    /* sức môn phái do hệ giang hồ đổi thì lấy theo đó */
    const sc=f.sect&&(s.wr.sects||[]).find(x=>x.id===f.sect);if(sc)f.pow=Math.round(sc.pow);
    f.pow=cl(f.pow+d,nh==='vo'||nh==='quy'?16:0,100);if(sc)sc.pow=f.pow;doiNguoi(f)}
  /* tranh chấp: mỗi năm vài cặp thù đánh nhau, kẻ thua mất sức, kẻ thắng được thêm */
  const cap=[];for(const a of song())for(const id of a.thu){const b=lay(id);if(b&&!b.chet&&a.id<b.id)cap.push([a,b])}
  cap.sort(()=>Math.random()-0.5).slice(0,2).forEach(([a,b])=>{if(Math.random()>0.35)return;const da=a.pow+a.chu.st.vo*0.3+a.ban.reduce((x,id)=>x+((lay(id)||{}).pow||0)*0.2,0)+R(-25,25),db=b.pow+b.chu.st.vo*0.3+b.ban.reduce((x,id)=>x+((lay(id)||{}).pow||0)*0.2,0)+R(-25,25);
    const [w,l]=da>=db?[a,b]:[b,a];const mat=R(8,20);l.pow=cl(l.pow-mat,LOAI[l.loai].nh==='cuop'||LOAI[l.loai].nh==='giao'?0:16,100);w.pow=cl(w.pow+Math.round(mat*0.35),0,100);tin(w,`đánh ${l.n}, ${mat>=20?'đại thắng':'thắng'}`)});
  /* kết minh mới giữa hai bên cùng ghét một kẻ */
  if(Math.random()<0.3){const L=song();const a=pk(L);const b=L.find(x=>x!==a&&ke(a.p,x.p)&&!a.thu.includes(x.id)&&!a.ban.includes(x.id)&&x.thu.some(i=>a.thu.includes(i)));if(a&&b){a.ban.push(b.id);b.ban.push(a.id);tin(a,`kết minh với ${b.n}`)}}
  /* tan rã và kẻ mới nổi lên */
  for(const f of song())if(f.pow<=4&&f.sect==null){f.chet=s.t;tin(f,'tan rã');s.fz.l.forEach(x=>{x.thu=x.thu.filter(i=>i!==f.id);x.ban=x.ban.filter(i=>i!==f.id)})}
  for(let lan=0;lan<2;lan++){const cuopSong=song().filter(f=>LOAI[f.loai].nh==='cuop').length;if(cuopSong<32&&Math.random()<0.7){const loai=pk(['sontac','thophi','haitac','macphi','banghoi','hoigiao']);const khu=Object.keys(P()).filter(p=>LOAI[loai].o(p)&&o(p).length<2);if(khu.length){const p=pk(khu);const n=pk(LOAI[loai].ten)+' mới ở '+P()[p].n;const f=lap(loai,n,p,R(24,50));s.fz.l.push(f);tin(f,'mới tụ tập')}}}
  goiNha()}
/* thế lực ở khu nhà đang sống tìm tới nhà */
function goiNha(){const s=S();const here=s.loc&&s.loc.p;if(!here||s.journey||(s.fzT||-1e9)>s.t-18)return;const h=G.head();if(!h||h.away)return;const noi=G.noiO?G.noiO():'lang';
  for(const f of o(here)){const nh=LOAI[f.loai].nh;let ev=null,p=0;
    if(nh==='cuop'&&f.rel<40){p=f.pow/100*(noi==='lang'?0.34:noi==='tran'?0.22:0.1);ev=f.loai==='banghoi'?'tlb_doi_le':(noi==='lang'&&f.pow>=45&&G.chance(0.35)?'tlb_cuop_nha':'tlb_doi_le')}
    else if(nh==='giao'){p=f.pow/100*0.18;ev='tlb_chieu_mo'}
    else if(f.loai==='ta'&&f.rel<30){p=f.pow/100*0.14;ev='tlb_ta_phai'}
    else if(nh==='vo'||nh==='quy'){p=0.1;ev=f.rel>=30?'tlb_cau_vien':G.alive().some(q=>G.inClan(q)&&!q.away&&(q.vo||0)>=70&&G.age(q)>=15)?'tlb_thach_dau':'tlb_ket_giao'}
    if(ev&&G.chance(p)){s.fzT=s.t;G.enqueue('ev',h.id,{ev,data:{fz:f.id}});break}}
  /* quan võ cùng khu với ổ cướp lớn được lệnh đi dẹp */
  const vo=G.alive().find(q=>G.inClan(q)&&q.job==='quan_ngu'&&(q.lv||0)>=3);if(vo){const k=o(G.placeOf(vo)).find(f=>LOAI[f.loai].nh==='cuop'&&f.pow>=35);if(k&&G.chance(0.25))G.enqueue('ev',vo.id,{ev:'tlb_dep_cuop',data:{fz:k.id}})}}
/* đi đường đụng thế lực cướp ở khu đang qua */
function trenDuong(p){const f=o(p).find(x=>LOAI[x.loai].nh==='cuop'&&x.rel<30);return f&&Math.random()<0.35+f.pow/200?f:null}
const vuongTen=id=>{const v=S().dyn&&S().dyn.fam&&S().dyn.fam.vuong.find(z=>z.id===id&&z.dead==null);return v?v.n:''};
/* khung "Thế lực" ở trang Thế giới và dấu trên bản đồ */
const biet=f=>!window.BN_BIET||window.BN_BIET.coTl(f);
function panel(p){if(!ensure()||!P()[p])return '';const e=G.esc;const L=o(p).filter(biet);const moTa=v=>v>=80?'rất mạnh':v>=60?'mạnh':v>=40?'khá':v>=20?'yếu':'tàn lụi';const quan=v=>v>=60?'thân thiết':v>=30?'giao hảo':v>-30?'chưa qua lại':v>-60?'hiềm khích':'thù sâu';
  const the=L.map(f=>{const T=LOAI[f.loai];const ten=id=>{const x=lay(id);return x&&!x.chet&&biet(x)?`${e(x.n)}${e(taiO(x))}`:''};const ng=x=>`<b>${e(x.n)}</b>, ${goi(f,x.bac)}, ${x.age} tuổi · võ ${x.st.vo} · trí ${x.st.tri} · EQ ${x.st.eq}`;
    const thu=f.thu.map(ten).filter(Boolean),ban=f.ban.map(ten).filter(Boolean);
    /* mới nghe tiếng thì chỉ biết tên, loại, thế lực và tên người đứng đầu; qua lại rồi mới rõ người và chỉ số */
    const quenMat=f.rel!==0||(S().np&&S().np.l&&Object.values(S().np.l).some(n=>String(n.ref||'').startsWith('fz:'+f.id+':')));
    return `<li style="margin-bottom:8px"><b>${e(f.n)}</b> · ${T.n} · ${moTa(f.pow)} · với nhà: ${quan(f.rel)}<br>${quenMat?ng(f.chu):`Nghe nói người đứng đầu là ${e(f.chu.n)}`}${quenMat?`<br><small class="muted">Dưới trướng: ${f.duoi.map(x=>`${e(x.n)}, ${goi(f,x.bac)}, võ ${x.st.vo}`).join('; ')}</small>`:''}${thu.length?`<br><small class="down">Thù: ${thu.join('; ')}</small>`:''}${ban.length?`<br><small class="up">Minh hữu: ${ban.join('; ')}</small>`:''}${f.baoChe?`<br><small class="down">${f.rel>=30?`${e(f.baoChe.n)} trong quan phủ che chở`:'Nghe đồn có người trong quan phủ che chở'}</small>`:''}${f.chuSau?`<br><small class="down">Nghe đồn có người trong hoàng tộc đứng sau</small>`:''}${f.hoangThan&&vuongTen(f.hoangThan)?`<br><small class="muted">Đất phong của thân vương ${e(vuongTen(f.hoangThan))}</small>`:''}${f.hist.length?`<br><small class="muted">${e(f.hist[0])}</small>`:''}</li>`}).join('');
  return `<section class="card"><span class="eyebrow">Thế lực ở ${e(P()[p].n)}</span>${L.length?`<ul class="plain">${the}</ul>`:'<p class="note">Chưa nghe ngóng được gì về thế lực ở đây.</p>'}</section>`}
function dau(){if(!ensure())return '';const parts=[];const by={};song().filter(biet).forEach(f=>{(by[f.p]=by[f.p]||[]).push(f)});
  for(const p in by){const A=P()[p];const L=by[p];const cuop=L.some(f=>LOAI[f.loai].nh==='cuop'&&f.pow>=40),vo=L.some(f=>LOAI[f.loai].nh!=='cuop');
    if(cuop)parts.push(`<path d="M${A.x-15} ${A.y-3} l5 -9 l5 9 z" fill="#a62b1f" pointer-events="none"/>`);if(vo)parts.push(`<rect x="${A.x+8}" y="${A.y-4}" width="6" height="6" fill="#3b2f6b" pointer-events="none"/>`)}
  return parts.join('')}
window.BN_TL={bind(g){G=g},ensure,year,o,lay,song,nguyHiem,trenDuong,panel,dau,goi,LOAI,ke,chiSo};
/* ================= sự kiện ================= */
window.EVF.push(g=>{G=g;const {fx,esc,chance}=g;const m=v=>g.mm(v);const FM=v=>g.fmtMoney(v);const N=c=>esc(c.given);
 const F=d=>{const f=d&&lay(d.fz);return f&&!f.chet?f:null};
 /* thẻ cho người thật của thế lực: sổ NPC, ref 'fz:', không có vai nên không sinh hoạt như người quen */
 const the=(d,f,x)=>{if(!g.np||!x)return null;const s=S();s.np=s.np||{n:0,l:{}};const ref='fz:'+f.id+':'+x.n;let n=Object.values(s.np.l).find(z=>z.ref===ref);
   if(!n){n=g.np.new({n:x.n,g:x.g,age:x.age,role:'theluc'});n.ref=ref;n.vai=[];n.rel=0;n.on=0;n.oan=0;n.past=[];n.ky=[];n.sub={};n.fam={spouse:0,kids:0}}
   n.nghe=goi(f,x.bac).toLowerCase()+' '+f.n;n.vaiTxt=goi(f,x.bac)+' '+f.n;n.tier=Math.max(1,5-x.bac*2);n.born=s.t-12*x.age;n.ok=1;n.st={tri:x.st.tri,vo:x.st.vo,mi:x.st.mi,eq:x.st.eq};n.sk={muu:Math.round(x.st.tri*0.7),khau:Math.round(x.st.eq*0.7),ql:30};d.npc=n.id;return n};
 /* người ra mặt phía thế lực: việc nhỏ thì đầu mục, việc lớn thì phó hoặc người đứng đầu */
 const nguoiRa=(f,muc)=>muc>=2?f.chu:muc===1?f.duoi.find(x=>x.bac===1)||f.chu:f.duoi.find(x=>x.bac===2)||f.chu;
 const doVo=x=>g.cl?g.cl(Math.round(x.st.vo*0.55+8),25,92):Math.max(25,Math.min(92,Math.round(x.st.vo*0.55+8)));
 const nhaVo=()=>G.alive().filter(p=>G.inClan(p)&&!p.away&&G.age(p)>=15).sort((a,b)=>(b.vo||0)-(a.vo||0))[0];
 const chinhQuyen=()=>G.alive().find(p=>G.inClan(p)&&!p.away&&((p.job==='quan'&&(p.lv||0)>=1)||(p.job==='quan_ngu'&&(p.lv||0)>=3)));
 const doi=(f,v,why)=>{f.rel=cl(f.rel+v,-100,100);if(v>=10)f.thu.forEach(id=>{const x=lay(id);if(x)x.rel=cl(x.rel-Math.round(v/3),-100,100)});f.hist.unshift(`Năm ${Math.floor(S().t/12)+1}: ${why}`);if(f.hist.length>5)f.hist.pop()};
 const dong=(f,v)=>`<span class="fx"><span class="${v>0?'up':'down'}">Quan hệ với ${esc(f.n)} ${v>0?'+':''}${v}</span></span>`;
 const noiChu=(a,b,c)=>{const n=g.noiO?g.noiO():'lang';return n==='thanh'?c:n==='tran'?b:a};
 window.BN_TL.the=the;
 const ev=(id,t,muc,x,o2)=>({id,t,k:'Thế lực',fixed:1,tags:{},
   x:(c,d)=>{const f=F(d);if(!f)return 'Chuyện ấy đã qua.';const p=nguoiRa(f,muc);d.ng=p.n;the(d,f,p);return x(c,d,f,p)},
   o:(c,d)=>{const f=F(d);if(!f)return [{l:'Thôi',f:()=>''}];const p=[f.chu].concat(f.duoi).find(z=>z.n===d.ng)||f.chu;return o2(c,d,f,p)}});
 const ten=(f,p)=>`${esc(p.n)}, ${goi(f,p.bac).toLowerCase()} của ${esc(f.n)}`;
 return [
 ev('tlb_doi_le','Đòi lệ',0,(c,d,f,p)=>`${ten(f,p)}, ${noiChu('xuống làng gõ cửa từng nhà, đòi mỗi nhà đóng thóc và bạc để được yên mùa gặt','dẫn người đi dọc phố chợ, đòi các nhà nộp tiền giữ yên cửa hiệu','cho người đến tận ngõ, nhắc khéo rằng phố này ai muốn yên đều có lệ riêng')}. Người ấy nói giọng không to, nhưng không ai dám ngắt lời.`,
  (c,d,f,p)=>{const v=m(4+Math.round(f.pow/12));const L=[
   {l:`Nộp cho yên (${FM(v)})`,c:()=>g.money()>=v,f:cc=>{S().money-=v;doi(f,6,'nhà chịu nộp lệ');return 'Chúng nhận bạc rồi đi sang nhà khác.'+fx(cc,{tam:-4,cfame:-1})+dong(f,6)}},
   {l:'Từ chối, đóng cửa giữ nhà',r:[{_g:1,vo:0.7,eq:0.3},100-doVo(p)],y:cc=>{doi(f,-14,'nhà không chịu nộp');f.pow=cl(f.pow-3,0,100);return `Thấy nhà ${N(cc)} không dễ bắt nạt, chúng chửi rồi bỏ đi.`+fx(cc,{fame:6,cfame:3,tam:3})+dong(f,-14)},n:cc=>{doi(f,-20,'nhà chống lại và thua');const lost=Math.min(S().money,v*2);S().money-=lost;return 'Chúng đạp cửa, lấy đi gấp đôi số đòi.'+fx(cc,{suc:-R(6,18),tam:-12})+dong(f,-20)}}];
   const q=chinhQuyen();if(q)L.push({l:`Nhờ ${q.given} báo quan, xin lính về dẹp`,r:[{_g:1,tri:0.5,eq:0.5},cl(75-f.pow*0.5,15,75)],y:cc=>{const mat=R(14,32);f.pow=cl(f.pow-mat,0,100);doi(f,-30,'bị quan quân dẹp');return `Lính về càn một đợt. ${esc(f.n)} tổn thất nặng${f.pow<=4?', tan hẳn':''}.`+fx(cc,{fame:10,cfame:5})+dong(f,-30)},n:cc=>{doi(f,-40,'bị nhà báo quan mà quan không bắt được');return 'Lính tới thì chúng đã rút. Chúng biết ai gọi lính.'+fx(cc,{tam:-8})+dong(f,-40)}});
   L.push({l:`Xin gặp riêng, đề nghị đi lại như người quen (${FM(v*2)})`,c:()=>g.money()>=v*2,r:[{_g:1,khau:0.7,eq:0.5},55],y:cc=>{S().money-=v*2;doi(f,34,'hai bên uống rượu giao ước');return 'Rượu cạn, một lời hẹn miệng: đường của họ, người nhà mình đi được. Người ngoài mà biết thì khó nghe.'+fx(cc,{liem:-8,fame:-3,eq:2})+dong(f,34)},n:cc=>{S().money-=v*2;doi(f,-4,'bị coi là khách lạ muốn nhờ vả');return 'Lễ nhận rồi mà lời hẹn thì không.'+fx(cc,{tam:-6})+dong(f,-4)}});
   return L}),
 ev('tlb_cuop_nha','Cướp vào nhà',2,(c,d,f,p)=>`Nửa đêm đuốc sáng ngoài ngõ. ${ten(f,p)}, tự mình dẫn người của ${esc(f.n)} tới vây nhà.`,
  (c,d,f,p)=>{const v=Math.max(m(10),Math.round(S().money*0.12));const k=nhaVo();return [
   {l:`Mở kho cho lấy, giữ lấy người (${FM(v)})`,f:cc=>{S().money-=Math.min(S().money,v);f.pow=cl(f.pow+4,0,100);doi(f,2,'cướp được của nhà mình');return 'Của mất, người còn.'+fx(cc,{tam:-10,cfame:-3})}},
   ...(k?[{l:`Để ${k.given} dẫn người nhà chống giữ`,r:[{_g:1,vo:1,suc:0.5},cl(105-p.st.vo*0.55,12,80)],h:1,y:cc=>{const mat=R(15,30);f.pow=cl(f.pow-mat,0,100);doi(f,-35,'bị nhà đánh lui');G.addStat(k,'vo',2);return `${esc(k.given)} giữ được cổng đến sáng. ${esc(f.n)} rút, để lại mấy người bị thương.`+fx(cc,{fame:16,cfame:10,tam:5})+dong(f,-35)},n:cc=>{const lost=Math.min(S().money,v*2);S().money-=lost;G.addStat(k,'suc',-R(18,40));doi(f,-25,'đánh vỡ cổng nhà');return `Cổng vỡ. ${esc(k.given)} bị thương nặng, kho bị vét.`+fx(cc,{tam:-16})+dong(f,-25)}}]:[]),
   {l:'Cả nhà chạy sang làng bên trong đêm',f:cc=>{const lost=Math.min(S().money,Math.round(v*1.5));S().money-=lost;G.alive().filter(q=>G.inClan(q)&&!q.away).forEach(q=>G.addStat(q,'tam',-4));return 'Sáng về thì nhà trống hoác.'+fx(cc,{tam:-8})}}]}),
 ev('tlb_chieu_mo','Hội giáo mời vào',1,(c,d,f,p)=>`${ten(f,p)}, tìm đến nhà ${N(c)}. ${noiChu('Mấy nhà trong làng đã ăn chay theo hội','Nửa dãy phố đã thắp đèn theo hội','Trong thành đã có nhiều nhà lén theo hội')}. Người ấy nói theo hội thì bệnh khỏi, nạn qua.`,
  (c,d,f,p)=>[{l:'Nhập hội, cúng tiền hương hỏa',ax:{tin:2},f:cc=>{const v=m(5);S().money-=Math.min(S().money,v);doi(f,30,'nhà theo hội');f.pow=cl(f.pow+3,0,100);cc.flags.theoHoi=f.id;return 'Từ đó có người trong hội qua lại. Quan phủ mà tra thì khó chối.'+fx(cc,{tam:8,liem:-4})+dong(f,30)}},
   {l:'Nghe cho biết, không hứa',r:[{_g:1,eq:0.6,muu:0.4},62],y:cc=>{doi(f,4,'tiếp đãi lễ độ');return 'Người ấy ra về, không giận.'+fx(cc,{eq:2})+dong(f,4)},n:cc=>{doi(f,-12,'bị coi là khinh hội');return 'Ngày hôm sau trước cổng có người dán bùa.'+fx(cc,{tam:-6})+dong(f,-12)}},
   {l:'Báo quan, hội này đang tụ tập dân',ax:{tiet:1},r:[{_g:1,tri:0.6,gan:0.4},cl(80-f.pow*0.5,15,75)],y:cc=>{f.pow=cl(f.pow-R(18,34),0,100);doi(f,-60,'bị nhà tố giác');return 'Quan quân phá đàn, bắt mấy hương chủ.'+fx(cc,{fame:12,cfame:6})+dong(f,-60)},n:cc=>{doi(f,-60,'bị nhà tố giác');return 'Quan không tìm ra chứng cứ. Giáo chúng thì biết rõ ai tố.'+fx(cc,{tam:-12,fame:-4})+dong(f,-60)}}]),
 ev('tlb_ta_phai','Người của tà phái',1,(c,d,f,p)=>`${ten(f,p)}, chặn ${N(c)} giữa ${noiChu('đường làng','phố chợ','con ngõ vắng')}, bảo trong nhà có thứ ông ta cần, hoặc một người trẻ có căn cốt hợp luyện công.`,
  (c,d,f,p)=>{const v=m(8);return [{l:`Biếu một khoản cho người ấy đi (${FM(v)})`,c:()=>g.money()>=v,f:cc=>{S().money-=v;doi(f,5,'được biếu bạc');return 'Người ấy cười, hẹn có dịp lại ghé.'+fx(cc,{tam:-5})+dong(f,5)}},
   {l:'Đứng ra đối mặt',r:[{_g:1,vo:0.8,gan:0.5},cl(100-p.st.vo*0.55,12,80)],y:cc=>{f.pow=cl(f.pow-5,0,100);doi(f,-25,'bị đánh lui');return 'Người ấy ôm vai bỏ đi.'+fx(cc,{vo:2,fame:10,tam:4})+dong(f,-25)},n:cc=>{doi(f,-15,'đánh bại người nhà mình');return 'Trúng một chưởng, nằm liệt mấy tuần.'+fx(cc,{suc:-R(20,40),hpMax:-R(0,3),tam:-10})+dong(f,-15)}},
   {l:'Lánh đi, tìm cách báo cho chính phái trong vùng',f:cc=>{const ch=o(f.p).concat(song().filter(x=>ke(x.p,f.p))).find(x=>x.loai==='chinh');if(!ch)return 'Quanh vùng không có chính phái nào để cậy.'+fx(cc,{tam:-4});doi(f,-18,'bị mách với '+ch.n);doi(ch,18,'được báo tin');if(!ch.thu.includes(f.id)){ch.thu.push(f.id);f.thu.push(ch.id)}return `${esc(ch.n)} cho người xuống núi.`+fx(cc,{eq:2,tam:2})+dong(ch,18)+dong(f,-18)}}]}),
 ev('tlb_thach_dau','Tìm đến so tài',2,(c,d,f,p)=>{const k=nhaVo();d.vo=k&&k.id;return `${ten(f,p)}, nghe trong nhà có người luyện võ, đưa thiếp xin so tài với ${k?esc(k.given):'người giỏi nhất nhà'}. Người đứng đầu một nơi mà đích thân đưa thiếp thì cả vùng đều nhìn.`},
  (c,d,f,p)=>{const k=g.P(d.vo)||nhaVo();return [{l:`Để ${k?k.given:'người nhà'} lên so tài hết sức`,r:[{_g:1,vo:1.2,suc:0.4},cl(112-p.st.vo*0.62,5,70)],y:cc=>{if(k){G.addStat(k,'vo',R(3,6));k.fame=(k.fame||0)+30}doi(f,12,'thua mà phục');return `${esc(k?k.given:'Người nhà')} thắng nửa chiêu. Tên tuổi truyền khắp vùng.`+(k&&k.id!==cc.id?`<span class="fx"><span class="up">${esc(k.given)}: danh vọng +30</span></span>`:'')+fx(cc,{cfame:12,tam:8})+dong(f,12)},n:cc=>{if(k){G.addStat(k,'vo',2);G.addStat(k,'suc',-R(8,22))}doi(f,6,'so tài đường hoàng');return `Chênh lệch quá rõ, nhưng thua cũng học được vài chiêu.`+fx(cc,{tam:-4})+dong(f,6)}},
   {l:'Xin được chỉ giáo thay vì phân thắng bại',r:[{_g:1,eq:0.8,khau:0.4},58],y:cc=>{if(k)G.addStat(k,'vo',R(2,4));doi(f,20,'được kính làm thầy một ngày');return 'Người ấy vui vẻ chỉ dạy cả buổi chiều.'+fx(cc,{eq:2})+dong(f,20)},n:cc=>{doi(f,-6,'bị coi là tránh né');return 'Người ấy phất tay áo bỏ đi.'+fx(cc,{fame:-4})+dong(f,-6)}},
   {l:'Cáo ốm, không tiếp',f:cc=>{doi(f,-12,'bị từ chối so tài');return 'Ngoài chợ có người cười nhà mình nhát.'+fx(cc,{cfame:-5,tam:-3})+dong(f,-12)}}]}),
 ev('tlb_ket_giao','Danh gia võ lâm gửi thiếp',1,(c,d,f,p)=>`${ten(f,p)}, đưa thiếp đến nhà ${N(c)}, ngỏ ý hai bên qua lại.`,
  (c,d,f,p)=>{const v=m(6);const th=f.thu.map(lay).find(x=>x&&!x.chet);return [
   {l:`Mang lễ đáp, kết giao${th?`, biết rằng họ đang thù ${th.n}`:''} (${FM(v)})`,c:()=>g.money()>=v,f:cc=>{S().money-=v;doi(f,24,'hai nhà kết giao');return 'Từ nay đường đi qua địa bàn họ yên hơn.'+fx(cc,{cfame:5,fame:5,eq:1})+dong(f,24)}},
   {l:'Tiếp chuyện lễ độ, chưa hứa gì',f:cc=>{doi(f,6,'tiếp đón lễ độ');return 'Hai bên uống hết tuần trà.'+fx(cc,{eq:1})+dong(f,6)}},
   {l:'Từ chối, nhà không muốn dính chuyện võ lâm',f:cc=>{doi(f,-10,'bị từ chối kết giao');return 'Người ấy thu thiếp về.'+fx(cc,{tam:2})+dong(f,-10)}}]}),
 ev('tlb_cau_vien','Minh hữu cầu viện',2,(c,d,f,p)=>{const th=f.thu.map(lay).find(x=>x&&!x.chet);d.th=th&&th.id;return th?`${ten(f,p)}, đích thân đến: ${esc(th.n)}${esc(taiO(th))} sắp kéo tới. Chỗ qua lại bấy lâu nên mới dám mở lời.`:`${ten(f,p)}, ghé thăm, nói dạo này cần người giúp một tay giữ địa bàn.`},
  (c,d,f,p)=>{const th=d.th&&lay(d.th);const v=m(12);const k=nhaVo();return [
   {l:`Giúp tiền lương thảo (${FM(v)})`,c:()=>g.money()>=v,f:cc=>{S().money-=v;f.pow=cl(f.pow+10,0,100);if(th){th.rel=cl(th.rel-20,-100,100);th.pow=cl(th.pow-6,0,100)}doi(f,18,'được giúp lương lúc nguy');return `${esc(f.n)} đứng vững.${th?` ${esc(th.n)} biết tiền ấy từ đâu.`:''}`+fx(cc,{cfame:3})+dong(f,18)}},
   ...(k&&th?[{l:`Cử ${k.given} sang đánh cùng`,h:1,r:[{_g:1,vo:1,suc:0.5},cl(95-th.chu.st.vo*0.45,15,80)],y:cc=>{f.pow=cl(f.pow+8,0,100);th.pow=cl(th.pow-R(14,28),0,100);th.rel=cl(th.rel-35,-100,100);G.addStat(k,'vo',R(2,5));doi(f,32,'được người nhà sang đánh cùng');return `Hai bên liên thủ, ${esc(th.n)} phải lui.`+fx(cc,{fame:12,cfame:6})+dong(f,32)},n:cc=>{G.addStat(k,'suc',-R(20,42));th.rel=cl(th.rel-30,-100,100);doi(f,22,'đã sang đánh cùng dù thua');return `Trận ấy thua, ${esc(k.given)} bị thương nặng. ${esc(th.n)} ghi tên nhà mình.`+fx(cc,{tam:-12})+dong(f,22)}}]:[]),
   {l:'Từ chối, nhà không thể đứng về bên nào',f:cc=>{doi(f,-24,'bị bỏ mặc lúc nguy');if(th)th.rel=cl(th.rel+8,-100,100);return 'Người ấy nhìn lâu rồi quay đi.'+fx(cc,{tam:-3})+dong(f,-24)}}]}),
 ev('tlb_chan_duong','Chặn đường',1,(c,d,f,p)=>`Đi ngang ${esc(P()[f.p].n)}, ${ten(f,p)}, cho người chắn ngang đường. Địa bàn này là của ${esc(f.n)}.`,
  (c,d,f,p)=>{const v=Math.max(m(6),Math.round(S().money*0.05));return [
   {l:`Nộp tiền mãi lộ (${FM(v)})`,c:()=>g.money()>=v,f:cc=>{S().money-=v;doi(f,8,'nộp mãi lộ đàng hoàng');return 'Chúng phát cho một lá cờ nhỏ, qua trạm sau không ai hỏi nữa.'+fx(cc,{tam:-4})+dong(f,8)}},
   {l:'Mở đường bằng đao',r:[{_g:1,vo:1,suc:0.5},cl(100-p.st.vo*0.55,12,80)],y:cc=>{f.pow=cl(f.pow-R(6,14),0,100);doi(f,-30,'bị đánh mở đường');return 'Đánh bật được toán chặn đường.'+fx(cc,{vo:2,fame:8})+dong(f,-30)},n:cc=>{const lost=Math.min(S().money,v*2);S().money-=lost;doi(f,-20,'đánh không lại');return 'Thua, mất sạch đồ mang theo.'+fx(cc,{suc:-R(12,28),tam:-12})+dong(f,-20)}},
   {l:'Quay lại, đi đường vòng',f:cc=>{const j=S().journey;if(j){j.left++;j.total++}return 'Mất thêm một tháng đường.'+fx(cc,{tam:-3})}}]}),
 ev('tlb_dep_cuop','Lệnh dẹp cướp',2,(c,d,f,p)=>`Thượng quan giao ${N(c)} dẹp ${esc(f.n)}. Thám tử về báo: kẻ cầm đầu là ${esc(p.n)}, một tay không dễ đối phó.`,
  (c,d,f,p)=>[{l:'Đánh thẳng vào sào huyệt',r:[{_g:1,vo:0.8,tri:0.4},cl(112-f.pow*0.5-p.st.vo*0.25,10,80)],y:cc=>{f.pow=cl(f.pow-R(35,60),0,100);doi(f,-60,'bị quan quân đánh phá');return `Sào huyệt bị phá${f.pow<=4?', ${esc(f.n)} tan hẳn':''}.`+fx(cc,{merit:Math.round(20+f.pow/3),fame:18,vo:2})},n:cc=>{f.pow=cl(f.pow+10,0,100);doi(f,-40,'đánh lui quan quân');return 'Trúng phục kích, quân tan.'+fx(cc,{suc:-R(15,35),fame:-14,tam:-14})}},
   {l:'Vây chặt đường lương, chờ chúng tự rối',r:[{_g:1,tri:0.9,muu:0.5},56],y:cc=>{f.pow=cl(f.pow-R(18,34),0,100);doi(f,-30,'bị vây cạn lương');return 'Vây mấy tháng, quá nửa bỏ trốn.'+fx(cc,{merit:Math.round(12+f.pow/5),fame:8,tri:1})},n:cc=>'Vây lâu mà không đóng nổi lối nhỏ sau núi.'+fx(cc,{fame:-5,tam:-6})},
   {l:'Gửi thư chiêu hàng, xin triều đình tha tội cho kẻ ra hàng',ax:{rong:2},r:[{_g:1,eq:0.8,khau:0.5},cl(78-f.pow*0.4,12,70)],y:cc=>{f.pow=cl(f.pow-R(25,45),0,100);doi(f,25,'được chiêu hàng tử tế');return 'Một phần theo về, không đổ giọt máu nào.'+fx(cc,{merit:14,fame:10,eq:2})},n:cc=>'Thư đi không có hồi âm. Thượng quan cho là nhu nhược.'+fx(cc,{fame:-8,tam:-5})}])
 ]});
})();
