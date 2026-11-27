/* Bách Niên Thế Gia · 7.0.0-d.1.5.50 · BỐN VƯƠNG TRIỀU (đợt B; chủ dự án 27/11: "4 vương triều này chỉ là mức vương không phải đế", "Tên 4 nước … đổi theo seed thế giới, và cũng có tranh chấp riêng, quan trường riêng, hoàng tộc riêng, các thế gia riêng",
   "Người ở nước nào thì làm quan ở nước đó, cuộc sống xoay quanh nước đó", "tranh ngôi … không phải lúc nào cũng chỉ 2 người, không phải tất cả hoàng tử đều tranh, chỉ những hoàng tử đa mưu đa tài, có tham vọng lớn, các thế lực quan lại sẽ phò tá").
   Dữ liệu ở S.vq[nat]; logic ở window.BN_VQ (engine gọi); sự kiện triều đình tiểu quốc ở cuối file. */
(function(){
const NATS=['lang_bo','van_dao','lam_quoc','sa_quoc'];
const KINH={lang_bo:'soc_do',van_dao:'van_dao',lam_quoc:'cam_thanh',sa_quoc:'sa_thanh'};
const TEN={lang_bo:['Sóc Yên','Huyền Sóc','Thiên Lang','Hàn Dã','Bắc Mạc'],van_dao:['Lam Hải','Hải Lăng','Thương Lan','Vân Dương','Đông Doanh'],lam_quoc:['Viêm Lĩnh','Xích Giang','Mộc Lâm','Nam Chướng','Viêm Việt'],sa_quoc:['Kim Sa','Bạch Ngọc','Tinh Sa','Hạo Nguyệt','Tây Cực']};
const HO={lang_bo:['Hô Diên','Thác Bạt','Mộ Dung','Độc Cô','Vũ Văn'],van_dao:['Trịnh','Mạc','Thái','Chu','Tạ'],lam_quoc:['Đoàn','Lương','Phùng','Khúc','Triệu'],sa_quoc:['Hạ Lan','Uất Trì','Mã','An','Thạch']};
const NIEN=['Kiến Hòa','Thiệu Bảo','Long Hưng','Gia Thái','Quang Khải','Thuận Thiên','Đại Khánh','Vĩnh Ninh','Chính Hòa','Hưng Long','Cảnh Phúc','Thái Hanh'];
const QUY=['Quốc công','Quận công','Hầu','Quốc cữu','Đại tướng công'];
let G=null;
const S=()=>G.S();const R=(a,b)=>G.R(a,b);const pk=a=>a[Math.floor(Math.random()*a.length)];const cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const ten=(sur,g)=>{const o=G.outsiderName?G.outsiderName(g):null;return sur+' '+(o&&o.given?o.given:(g==='nam'?'Thành':'Lan'))};
function nguoi(sur,g,age,x){return Object.assign({n:ten(sur,g),g,age,tai:R(30,95),tv:R(15,95),muu:R(30,92),dead:0},x||{})}
function moiVua(nat,d,nd){const k=nd||nguoi(d.ho,'nam',R(24,46));return Object.assign(k,{duc:k.duc!=null?k.duc:R(30,90),uy:R(40,80),nghi:R(10,55),tu:S().t})}
function tao(nat){const ho=pk(HO[nat]);const d={nat,ten:pk(TEN[nat]),ho,kinh:KINH[nat],nien:pk(NIEN),doi:1,hist:[],tranh:null};
  d.vua=moiVua(nat,d);d.hau=nguoi(pk(['Lý','Trần','Lê','Đỗ','Vương']),'nữ',cl(d.vua.age-R(0,6),18,60));
  d.phi=[];for(let i=0;i<R(1,3);i++)d.phi.push(nguoi(pk(['Ngô','Đặng','Phạm','Hồ','Bùi']),'nữ',R(18,36)));
  d.tu=[];for(let i=0;i<R(2,5);i++){const a=R(1,Math.max(2,d.vua.age-17));d.tu.push(nguoi(ho,'nam',a,{me:i===0?0:R(0,d.phi.length)}))}
  d.cong=[];for(let i=0;i<R(1,3);i++)d.cong.push(nguoi(ho,'nữ',R(3,Math.max(4,d.vua.age-18))));
  d.quy=[];for(let i=0;i<R(2,3);i++)d.quy.push(nguoi(pk(HO[nat]),'nam',R(35,62),{tuoc:pk(QUY)}));
  const P=window.D.PROV;const khu=Object.keys(P).filter(p=>P[p].nat===nat);
  d.gia=[];const dung=new Set([ho]);for(let i=0;i<3;i++){let s;for(let j=0;j<20;j++){s=pk(HO[nat].concat(['Hà','La','Kiều','Tống','Lữ']));if(!dung.has(s))break}dung.add(s);d.gia.push({sur:s,p:i===0?KINH[nat]:pk(khu),the:R(35,80),chu:nguoi(s,'nam',R(40,64))})}
  /* ba phe quan: mỗi phe có người đứng đầu thật, có thể phò một hoàng tử */
  d.phe=[{n:'Phe Cựu thần',chu:d.quy[0],the:R(30,70),tu:null},{n:`Phe ${d.gia[0].sur} Gia`,chu:d.gia[0].chu,the:R(30,70),tu:null},{n:'Phe Tân tiến',chu:nguoi(pk(['Lý','Lê','Đỗ','Vũ','Tô']),'nam',R(32,52),{tuoc:'Thị lang'}),the:R(25,60),tu:null}];
  return d}
function ensure(){const s=S();if(!s)return null;if(!s.vq){s.vq={};NATS.forEach(n=>s.vq[n]=tao(n))}apTen();return s.vq}
/* tên nước đổi theo từng thế giới: ghi vào NAT.n (giữ tên gốc ở NAT.goc) */
function apTen(){const s=G&&S();if(!s||!s.vq)return;const NAT=window.D.NAT;NATS.forEach(n=>{if(!NAT[n].goc)NAT[n].goc=NAT[n].n;NAT[n].n=s.vq[n].ten;NAT[n].d=`Tiểu quốc ${s.vq[n].ten}, vua xưng vương, họ ${s.vq[n].ho}.`})}
const natNha=()=>{const s=S();const p=s&&s.loc&&s.loc.p;return p?window.D.PROV[p].nat:'trieu'};
/* vua của nước nhà đang ở: Đại Nguyễn thì là hoàng đế, tiểu quốc thì là quốc vương */
function vua(){const s=S();const nat=natNha();if(nat==='trieu'){const d=s.dyn;return d?{nat,ten:d.emp,hieu:'Hoàng đế '+(d.era||''),k:d.k||{},loan:d.loan||0}:null}const v=ensure()[nat];return v?{nat,ten:v.vua.n,hieu:`${v.ten} vương`,k:v.vua,loan:v.tranh?60:10}:null}
/* hoàng tử đủ sức và đủ tham vọng mới tranh: từ 16 tuổi, tham vọng từ 60, tài hoặc mưu từ 55 */
const duTranh=t=>!t.dead&&t.age>=16&&t.tv>=60&&Math.max(t.tai,t.muu)>=55;
function phoTa(d){const L=d.tu.filter(duTranh).sort((a,b)=>(b.tai+b.muu)-(a.tai+a.muu));d.phe.forEach((f,i)=>{if(!L.length){f.tu=null;return}const cur=L.find(t=>t.n===f.tu);if(cur&&Math.random()<0.9)return;f.tu=Math.random()<0.75?(L[i%L.length]).n:null});return L}
const suc=(d,t)=>t.tai*0.8+t.muu*0.9+d.phe.filter(f=>f.tu===t.n).reduce((a,f)=>a+f.the,0)+(t===d.tu.find(x=>!x.dead)?25:0);
function tin(d,s,cl2){if(natNha()===d.nat||d.nat===cl2)G.log(`${d.ten}: ${s}.`,'hi')}
function noiNgoi(d){const cu=d.vua;const dua=d.tu.filter(duTranh);const con=d.tu.filter(t=>!t.dead);let moi,kieu;
  if(dua.length>=2){const diem=dua.map(t=>({t,v:suc(d,t)+R(-35,35)})).sort((a,b)=>b.v-a.v);moi=diem[0].t;kieu=`${dua.length} vương tử cùng tranh ngôi, ${moi.n} thắng`}
  else if(dua.length===1){moi=dua[0];kieu=`${moi.n} lên ngôi, không ai đủ sức tranh`}
  else if(con.length){moi=con.sort((a,b)=>b.age-a.age)[0];kieu=`vương tử lớn nhất là ${moi.n} được lập${moi.age<16?', quyền臣 nhiếp chính':''}`}
  else{moi=nguoi(d.ho,'nam',R(20,45));kieu=`dòng chính tuyệt, người trong tông thất là ${moi.n} được rước lên`}
  kieu=kieu.replace('quyền臣','quyền thần');
  const thang=d.phe.filter(f=>f.tu===moi.n),thua=d.phe.filter(f=>f.tu&&f.tu!==moi.n);thang.forEach(f=>f.the=cl(f.the+R(10,25),0,100));thua.forEach(f=>f.the=cl(f.the-R(15,35),5,100));
  d.tu=d.tu.filter(t=>t!==moi&&!t.dead&&!(dua.includes(t)&&dua.length>=2&&Math.random()<0.45));
  d.doi++;d.nien=pk(NIEN.filter(x=>x!==d.nien));d.hist.unshift(`Năm ${Math.floor(S().t/12)+1}: ${cu.n} mất, ${kieu}`);if(d.hist.length>8)d.hist.pop();
  d.vua=moiVua(d.nat,d,Object.assign({},moi,{nghi:dua.length>=2?R(45,75):R(10,45)}));d.hau=nguoi(pk(['Lý','Trần','Lê','Đỗ','Vương']),'nữ',cl(d.vua.age-R(0,5),16,55));d.phi=[nguoi(pk(['Ngô','Đặng','Hồ','Bùi']),'nữ',R(16,28))];d.phe.forEach(f=>f.tu=null);
  tin(d,`${kieu}, đổi niên hiệu ${d.nien}`);
  /* nhà đã đứng về phía ai thì nay trả */
  const b=S().vqPhe;if(b&&b.nat===d.nat){const p=G.P(b.pid);if(p&&p.dead==null&&G.inClan(p))G.enqueue('ev',p.id,{ev:b.tu===moi.n?'vq_thuong_cong':'vq_thanh_trung',data:{nat:d.nat,tu:b.tu,moi:moi.n}},true);delete S().vqPhe}}
function namTriVi(d){const all=[d.vua,d.hau].concat(d.phi,d.tu,d.cong,d.quy,d.gia.map(g=>g.chu),d.phe.map(f=>f.chu));new Set(all).forEach(x=>x.age++);
  const chet=a=>a<45?0.006:a<60?0.018:a<70?0.05:a<80?0.12:0.25;
  d.tu.forEach(t=>{if(Math.random()<chet(t.age))t.dead=1});d.tu=d.tu.filter(t=>!t.dead);
  if(d.vua.age<50&&d.tu.length<6&&Math.random()<0.14)d.tu.push(nguoi(d.ho,'nam',0,{me:R(0,d.phi.length)}));
  if(d.vua.age<48&&d.cong.length<4&&Math.random()<0.07)d.cong.push(nguoi(d.ho,'nữ',0));
  d.cong=d.cong.filter(x=>x.age<28||Math.random()<0.7);
  /* quý tộc, thế gia, phe đổi đời */
  d.quy=d.quy.map(q=>Math.random()<chet(q.age)?nguoi(q.n.split(' ')[0],'nam',R(28,42),{tuoc:q.tuoc}):q);
  d.gia.forEach(g=>{g.the=cl(g.the+R(-4,4),10,100);if(Math.random()<chet(g.chu.age))g.chu=nguoi(g.sur,'nam',R(30,48))});
  d.phe.forEach((f,i)=>{f.the=cl(f.the+R(-5,5),5,100);if(f.chu.dead||Math.random()<chet(f.chu.age)){f.chu=i===1?d.gia[0].chu:i===0?d.quy[0]:nguoi(pk(['Lý','Lê','Đỗ','Vũ','Tô']),'nam',R(32,50),{tuoc:'Thị lang'})}});
  d.vua.nghi=cl(d.vua.nghi+R(-5,6),0,95);d.vua.uy=cl(d.vua.uy+R(-5,4),10,95);
  const L=phoTa(d);const dang=d.vua.age>=48||d.vua.uy<35;const truoc=!!d.tranh;d.tranh=dang&&L.length>=2?L.map(t=>t.n):null;
  if(d.tranh&&!truoc)tin(d,`vua đã già yếu, ${d.tranh.length} vương tử ngấm ngầm tranh ngôi: ${d.tranh.join(', ')}`);
  /* phe mạnh nhất đè phe yếu nhất khi tranh ngôi hoặc vua đa nghi */
  if((d.tranh||d.vua.nghi>=60)&&Math.random()<0.25){const s=d.phe.slice().sort((a,b)=>b.the-a.the);const m=s[0],y=s[s.length-1];if(m!==y){y.the=cl(y.the-R(8,18),5,100);m.the=cl(m.the+R(3,9),5,100);tin(d,`${m.n} do ${m.chu.n} đứng đầu hặc ${y.n}, mấy viên quan mất chức`)}}
  if(Math.random()<chet(d.vua.age))noiNgoi(d)}
/* mỗi năm: triều đình bốn nước vận hành; nhà sống ở tiểu quốc thì người có vai vế được cuốn vào */
function year(){if(!ensure())return;const V=S().vq;NATS.forEach(n=>namTriVi(V[n]));apTen();
  const nat=natNha();if(nat==='trieu'||!V[nat])return;const d=V[nat];
  const quan=G.alive().filter(p=>G.inClan(p)&&!p.away&&(p.job==='quan'||p.job==='quan_ngu'));
  if(d.tranh&&!S().vqPhe){const c=quan.sort((a,b)=>(b.lv||0)-(a.lv||0))[0];if(c&&(c.lv||0)>=2&&G.chance(0.4))G.enqueue('ev',c.id,{ev:'vq_vuong_tu_moi',data:{nat,tu:pk(d.tranh)}});}
  const kinh=quan.find(p=>(p.lv||0)>=3&&G.placeOf(p)===d.kinh);if(kinh&&G.chance(0.16))G.enqueue('ev',kinh.id,{ev:'vq_yen_vuong',data:{nat}});
  const h=G.head();if(h&&G.tierIdx()>=3&&G.chance(0.07))G.enqueue('ev',h.id,{ev:'vq_the_gia_moi',data:{nat,gi:R(0,2)}});
  /* d.1.5.53: vương nữ kén phò mã trong những nhà có tiếng */
  const cn=d.cong.find(x=>!x.dead&&!x.wed&&x.age>=16&&x.age<=24);if(cn&&G.tierIdx()>=3&&(S().vqPmT||-1e9)<=S().t&&G.chance(0.12)){const trai=G.alive().find(c=>G.inClan(c)&&!c.away&&c.g==='nam'&&!G.married(c)&&c.spouse==null&&G.age(c)>=18&&G.age(c)<=30&&((c.degree||0)>=1||(c.tri||0)>=95||(c.vo||0)>=95));if(trai){S().vqPmT=S().t+120;G.enqueue('ev',trai.id,{ev:'vq_phu_ma',data:{nat,cn:cn.n}})}}}
/* khung "Vương triều" ở trang Thế giới */
function panel(p){const nat=window.D.PROV[p]&&window.D.PROV[p].nat;if(!NATS.includes(nat))return '';const V=ensure();if(!V)return '';const d=V[nat];const e=G.esc;
  /* d.1.5.60: chỉ hiện điều đã biết. Ở nước ấy thì biết vua; ở từ một năm biết vương tử; từ ba năm biết quyền quý, thế gia; người nhà làm quan ở nước ấy mới rõ tài, chí và phe. Người đã gặp qua sự kiện thì luôn biết */
  const B=window.BN_BIET;const daO=!B||B.daO(nat),nam=B?B.namO(nat):99;const quen=x=>!B||B.quenNguoi(nat,x.n);const quanCo=!B||B.coQuan(nat,2);const quanCao=!B||B.coQuan(nat,4);
  const tuL=d.tu.filter(t=>nam>=1||quen(t)),quyL=d.quy.filter(x=>nam>=3||quen(x)),giaL=d.gia.filter(x=>nam>=3||quen(x.chu)),congL=d.cong.filter(x=>nam>=1||quen(x)),pheL=quanCo?d.phe:d.phe.filter(x=>quen(x.chu));
  if(!daO&&!tuL.length&&!quyL.length&&!giaL.length&&!congL.length&&!pheL.length)return '';
  const who=x=>`<b>${e(x.n)}</b>, ${x.age} tuổi`;const taiw=v=>v>=80?'rất cao':v>=65?'cao':v>=45?'vừa':'thấp';
  const tu=tuL.length?tuL.map(t=>{const f=d.phe.filter(x=>x.tu===t.n);return `<li>${who(t)}${quanCao&&t.age>=16?` · tài ${taiw(t.tai)}, mưu ${taiw(t.muu)}${duTranh(t)?' · <b class="down">có chí tranh ngôi</b>':''}${f.length?' · được '+f.map(x=>e(x.n)).join(', ')+' phò':''}`:''}</li>`}).join(''):'<li class="muted">Chưa nghe gì về các vương tử.</li>';
  return `<section class="card" style="grid-column:1/-1"><span class="eyebrow">Vương triều ${e(d.ten)} · niên hiệu ${e(d.nien)} · đời vua thứ ${d.doi}</span><h3>Quốc vương ${e(d.vua.n)}, ${d.vua.age} tuổi</h3>
   <p class="kvline">Đức ${taiw(d.vua.duc)} · Uy ${taiw(d.vua.uy)} · ${d.vua.nghi>=60?'đa nghi':d.vua.nghi>=35?'hay xét nét':'rộng lòng'}${d.tranh?' · <b class="down">các vương tử đang tranh ngôi</b>':''}</p>
   <p class="note">Vương hậu ${who(d.hau)}${d.phi.length?' · Phi: '+d.phi.map(x=>e(x.n)).join(', '):''}</p>
   <h4>Vương tử</h4><ul class="plain">${tu}</ul>
   <p class="kvline">Vương nữ: ${congL.length?congL.map(x=>e(x.n)+' '+x.age+' tuổi').join(', '):'chưa nghe gì'}</p>
   <h4>Quyền quý</h4><ul class="plain">${quyL.length?'':'<li class="muted">Chưa nghe gì.</li>'}${quyL.map(q=>`<li><b>${e(q.n)}</b>, ${e(q.tuoc)}, ${q.age} tuổi</li>`).join('')}</ul>
   <h4>Thế gia</h4><ul class="plain">${giaL.length?'':'<li class="muted">Chưa nghe gì.</li>'}${giaL.map(g=>`<li><b>${e(g.sur)} Gia</b> ở ${e(window.D.PROV[g.p].n)} · gia chủ ${e(g.chu.n)} · thế ${taiw(g.the)}</li>`).join('')}</ul>
   <h4>Phe trong triều</h4><ul class="plain">${pheL.length?'':'<li class="muted">Chưa nghe gì.</li>'}${pheL.map(f=>`<li><b>${e(f.n)}</b> · đứng đầu ${e(f.chu.n)} · thế ${taiw(f.the)}${f.tu?' · phò '+e(f.tu):''}</li>`).join('')}</ul>
   ${d.hist.length?`<p class="kvline muted">${d.hist.slice(0,3).map(e).join(' · ')}</p>`:''}</section>`}
window.BN_VQ={NATS,KINH,bind(g){G=g},ensure,apTen,year,vua,natNha,duTranh,suc,noiNgoi,namTriVi,panel};
/* sự kiện gắn riêng với triều Đại Nguyễn (hoàng tộc, họ Phạm, mưu đại sự…): nhà sống ở tiểu quốc thì không ra */
window.BN_TRIEU=new Set(["ti_thuong_hieu","ng_hoang_tu","v_trieu_chinh","c11_c","qk_phe_phai","qk_phe_b","v62_q_quyen_quy_moi","vil_a_ruong","vil_a_buon","vil_a_quan","vil_a_hoc","vil_a_vo","vil_a_chung","vil_b_tieusinh","vil_b_thaylang","vil_b_thulai","vil_b_tiec","vil_l_so","vil_l_chung","vil_l_thu","vil_l_tho","vil_l_thuoc","vil_l_thuyen","vil_l_ankhan","vil_l_ruong","vil_l_cho","vil_l_hich","vil_l_gop","vil_p_thue","vil_p_dot","vil_p_bat","vil_p_don","vil_p_cuop","vil_p_phu","vil_p_chiem","vil_p_hon","vil_p_hoa","vil_p_triu","vil_p_con","vil_r","vil_d_2","vil_d_4","vil_s_tinh","vil_z_vo","vil_e_kien","vil_bp_quanhuyen","vil_bv_dungdo","vil_bt_nguon","vil_bt_ha","vil_bd_oan","vil_bn_ep","vil_bn_nho","v64_dai_xa","v64_khoa_an","tt_dan_bien","tc_vua_benh","tc_lam_chung","tc_phe_lap","qt4_trieu_kien","qt4_ngu_su_to","ts_mo_dau","cd_26","lw_24","hv_yen_cung","hv_dai_le","hv_tuan_du","hv_quoc_cong_que","tq_ket_nghia","pc_0","vpv_1","dp_nguoi_cu_doi_dat","pc_c0","tk_thu_hoi","qx_giao_dap","vuong_gap_mat","vuong_nho_viec","vuong_hon_su","tt_vi_hanh","tt_vi_hanh_b","hv_cong_chua_chua","hv_cong_chua_b","hv_hoang_tu_san","hv_hoang_tu_b","hv_noi_phu_thu_mua","hv_ho_phi_tan","hv_vuong_xin_luong","hv_hoang_tu_c","hv_hoang_tu_d","pm_x_nguoi_bi_hai","pm_x_tay_chan","pm_x_thu_khuyen","pm_x_phien_cho","pm_x_hoc_tro","pm_x_nguoi_hoi_han","dh_38","n633_nguy_thuoc"]);
window.EVPATCH=window.EVPATCH||[];
window.EVPATCH.push(function(E){for(const e of E){if(!window.BN_TRIEU.has(e.id)||e.__vq)continue;e.__vq=1;const c0=e.c;e.c=function(c,d){if(natNha()!=='trieu')return false;return typeof c0==='function'?c0.call(this,c,d):true}}});
const goc=[];window.EVF.push(g=>{G=g;const {fx,esc,chance}=g;const m=v=>g.mm(v);const FM=v=>g.fmtMoney(v);const N=c=>esc(c.given);
 const D=d=>{const V=ensure();return d&&V&&V[d.nat]};
 /* thẻ cho người thật của vương triều: vào sổ NPC với ref 'vq:', không có vai nên không sinh hoạt như người quen */
 const the=(d,p,nhan,tier)=>{if(!p||!g.np)return null;const s=S();s.np=s.np||{n:0,l:{}};const ref='vq:'+d.nat+':'+p.n;let n=Object.values(s.np.l).find(x=>x.ref===ref);
   if(!n){n=g.np.new({n:p.n,g:p.g,age:p.age,role:'vuongtrieu'});n.ref=ref;n.vai=[];n.rel=0;n.on=0;n.oan=0;n.past=[];n.ky=[];n.sub={};n.fam={spouse:1,kids:0}}
   n.nghe=nhan;n.vaiTxt=nhan;n.tier=tier||6;n.born=s.t-12*p.age;n.ok=1;n.st={tri:Math.round(cl(55+(p.tai||50)*0.55,40,115)),vo:Math.round(cl(35+(p.tai||50)*0.4,25,95)),mi:70,eq:Math.round(cl(50+(p.muu||50)*0.55,40,112))};n.sk={muu:p.muu||60,khau:60,ql:60};d.npc=n.id;return n};const tu=(d,t)=>D(d)&&D(d).tu.find(x=>x.n===t);
 const ev=(id,t,x,o)=>({id,t,k:'Vương triều',fixed:1,tags:{},x,o});
 return [
 ev('vq_vuong_tu_moi','Vương tử cho mời',(c,d)=>{const v=D(d),t=tu(d,d.tu);if(!v||!t)return 'Người của vương phủ đến rồi lại đi.';the(d,t,'vương tử '+v.ten,6);const f=v.phe.filter(x=>x.tu===t.n);
   return `Vua ${v.ten} đã già yếu, ${v.tranh?v.tranh.length+' vương tử đang ngấm ngầm tranh ngôi':'ngôi kế chưa định'}. Người của vương tử ${esc(t.n)} đến mời ${N(c)} sang phủ. ${f.length?`${esc(f.map(x=>x.n+' do '+x.chu.n+' đứng đầu').join(', '))} đang phò ông ấy.`:'Chưa phe nào công khai phò ông ấy.'} Người ta nói ông ${t.tai>=70?'có tài trị nước':t.muu>=70?'mưu lược hơn người':'ham ngôi hơn là có tài'}.`},
  (c,d)=>{const v=D(d),t=tu(d,d.tu);if(!v||!t)return [{l:'Thôi',f:()=>''}];return [
   {l:'Nhận lời, đứng về phía vương tử',ax:{tv:2},f:cc=>{S().vqPhe={nat:d.nat,pid:cc.id,tu:t.n};t.muu=cl(t.muu+3,0,100);const f=v.phe.find(x=>x.tu===t.n);if(f)f.the=cl(f.the+6,0,100);return `Từ hôm nay ${N(cc)} là người của phủ ${esc(t.n)}. Thắng thua chỉ rõ khi ngôi đổi chủ.`+fx(cc,{cong:8,fame:3,tam:-3})}},
   {l:'Nhận lễ mà không hứa gì',r:[{_g:1,muu:0.7,khau:0.4},52],y:cc=>'Đi một vòng hoa mỹ, hai bên đều giữ được thể diện.'+fx(cc,{money:m(6),eq:2}),n:cc=>{cc.flags.noPromoUntil=S().t+18;return 'Vương tử hiểu ý, và nhớ kỹ.'+fx(cc,{fame:-5,tam:-6})}},
   {l:'Khước từ, chỉ phụng sự người đang ngồi ngôi',ax:{thanh:2},f:cc=>{cc.flags.vqTrung=S().t;return `${N(cc)} đóng cửa tạ khách.`+fx(cc,{liem:5,fame:2,tam:-2})}},
   {l:'Tâu việc này lên vua',ax:{tiet:-1},r:[{_g:1,tri:0.5,gan:0.6},45],y:cc=>{t.tv=cl(t.tv-25,0,100);v.vua.nghi=cl(v.vua.nghi+12,0,95);return `Vua ${v.ten} nghe, giam lỏng ${esc(t.n)} mấy tháng. Cả triều biết ai đã tâu.`+fx(cc,{cong:16,fame:6})},n:cc=>{cc.flags.noPromoUntil=S().t+36;return 'Vua cho là kẻ ly gián cha con.'+fx(cc,{fame:-12,tam:-10,cong:-8})}}]}),
 ev('vq_thuong_cong','Công theo hầu',(c,d)=>(D(d)&&the(d,D(d).vua,'quốc vương '+D(d).ten,6),`${esc(d.moi)} đã ngồi lên ngôi ${D(d)?D(d).ten:''}. Những người theo từ thuở còn ở phủ nay được gọi tên, trong đó có ${N(c)}.`),
  (c,d)=>[{l:'Nhận chức tước ban cho',f:cc=>'Vua mới nhớ công.'+fx(cc,{cong:40,fame:18,cfame:8,tam:10})},
   {l:'Xin ban cho cả nhà thay vì cho riêng mình',ax:{ht:2},f:cc=>fx(cc,{cfame:18,fame:6,money:m(R(20,35)),tam:6})},
   {l:'Cáo lui, xin giữ nguyên chức cũ',ax:{tiet:2},f:cc=>{const v=D(d);if(v)v.vua.nghi=cl(v.vua.nghi-10,0,95);return 'Người biết đủ thì vua không nghi.'+fx(cc,{liem:6,eq:3,tam:5})}}]),
 ev('vq_thanh_trung','Ngôi đổi, người cũ bị hỏi tội',(c,d)=>(D(d)&&the(d,D(d).vua,'quốc vương '+D(d).ten,6),`Người ${N(c)} theo là ${esc(d.tu)} đã thua. ${esc(d.moi)} lên ngôi, và danh sách người của phủ cũ đã nằm trên án thư.`),
  (c,d)=>[{l:'Dâng biểu tạ tội, xin giáng chức',f:cc=>{if((cc.lv||0)>0)cc.lv--;cc.flags.noPromoUntil=S().t+48;return 'Được tha, nhưng từ nay luôn có người để mắt.'+fx(cc,{fame:-10,tam:-10})}},
   {l:`Dốc của nhà chạy chọt (${FM(m(40))})`,c:()=>g.money()>=m(40),r:[{_g:1,khau:0.6,eq:0.6},55],y:cc=>{S().money-=m(40);return 'Tên được gạch khỏi danh sách.'+fx(cc,{liem:-6,tam:-3})},n:cc=>{S().money-=m(40);g.quitOffice&&g.quitOffice(cc);return 'Tiền mất mà vẫn bị cách chức.'+fx(cc,{fame:-14,tam:-14})}},
   {l:'Cáo quan về quê ngay trong đêm',f:cc=>{g.quitOffice&&g.quitOffice(cc);return 'Treo ấn mà đi, còn giữ được cả nhà.'+fx(cc,{tam:-8,liem:3})}}]),
 ev('vq_yen_vuong','Yến trong vương cung',(c,d)=>{const v=D(d);if(!v)return '';the(d,v.vua,'quốc vương '+v.ten,6);const q=v.quy[0];return `Vua ${v.ten}, ${esc(v.vua.n)}, mở yến. ${N(c)} được xếp ngồi gần ${esc(q.n)}, ${esc(q.tuoc)}. Rượu qua ba tuần, vua hỏi ${N(c)} nghĩ gì về việc ngoài biên.`},
  (c,d)=>{const v=D(d);return [
   {l:'Nói thẳng điều mình thấy',r:[{_g:1,tri:0.8,gan:0.4},v&&v.vua.duc>=60?65:35],y:cc=>'Vua gật đầu, sai người ghi lại.'+fx(cc,{cong:14,fame:8}),n:cc=>'Tiệc đang vui bỗng lặng.'+fx(cc,{fame:-6,tam:-6})},
   {l:'Nói điều vua muốn nghe',ax:{thanh:-1},f:cc=>fx(cc,{cong:4,fame:2,liem:-3})},
   {l:`Xin phép nhường lời cho ${v?v.quy[0].n:'bậc trên'}`,ax:{tiet:1},f:cc=>{if(v)v.phe[0].the=cl(v.phe[0].the+4,0,100);return 'Bậc trên hài lòng.'+fx(cc,{eq:3,fame:1})}}]}),
 ev('vq_the_gia_moi','Thế gia gửi thiếp',(c,d)=>{const v=D(d);const g2=v&&v.gia[d.gi||0];if(g2)the(d,g2.chu,'gia chủ '+g2.sur+' Gia',5);return g2?`${esc(g2.sur)} Gia, một thế gia của ${v.ten} ở ${window.D.PROV[g2.p].n}, gửi thiếp mời. Gia chủ ${esc(g2.chu.n)} muốn biết nhà mình đứng ở đâu giữa các phe.`:''},
  (c,d)=>{const v=D(d);const g2=v&&v.gia[d.gi||0];if(!g2)return [{l:'Thôi',f:()=>''}];const lv=m(10);return [
   {l:`Mang lễ đến, kết thân (${FM(lv)})`,c:()=>g.money()>=lv,f:cc=>{S().money-=lv;g2.the=cl(g2.the+3,0,100);S().vqThan=S().vqThan||{};S().vqThan[d.nat+g2.sur]=(S().vqThan[d.nat+g2.sur]||0)+1;return 'Hai nhà qua lại, đường làm ăn và đường quan đều rộng hơn một chút.'+fx(cc,{cfame:6,fame:5})}},
   {l:'Đến chơi mà không hứa theo phe nào',r:[{_g:1,eq:0.7,khau:0.5},55],y:cc=>fx(cc,{eq:2,cfame:3}),n:cc=>'Người ta cho là nhà mình khinh họ.'+fx(cc,{cfame:-4,tam:-3})},
   {l:'Cáo bận, không đi',f:cc=>fx(cc,{tam:1,cfame:-2})}]})
 ];
});
})();
