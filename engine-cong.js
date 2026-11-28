/* Bách Niên Thế Gia · 7.0.0-d.1.5.66 · XÉT CÔNG SAU CHIẾN SỰ VÀ TƯỚC CHO NỮ NHÂN (chủ dự án 28/11: "khi người làm lính thu được nhiều chiến công, thì khi kết thúc chiến sự, được xét công lao, nếu đủ để phong tước, thăng chức thì ban cho, có tước thì ban nhà cửa ở kinh đô, thấp nhất là tứ hợp viện,
   nếu chưa thành gia lập thất, có thể được ban cho một cô nương 18 tuổi … tất cả cũng không phải cố định sẽ được, nếu có kẻ khác có quan hệ tốt hơn, bản thân đắc tội cấp trên, quan gia khác thì các phần thưởng sẽ bị cản trở ( trừ tước vị ), có thể là trì hoãn lâu dài hoặc trực tiếp bị cướp mất"; xét cả sau xung đột biên giới;
   "mọi nữ nhân có công được ban tước thì tước giao về cho chồng, nếu chồng ở rể hoặc chưa có chồng thì tước ban cho cha…", không còn cha chưa chồng hoặc góa thì nàng giữ; "phu thê như chim liền cánh … con cái làm tốt thì cha mẹ thơm lây") */
window.ENGX=window.ENGX||[];
window.ENGX.push(X=>{
const {R,chance,log,alive,inClan,P,head,enqueue,nameOf,pick,clamp,age,esc,money,fx}=X;
const S=()=>X.S;const C=()=>X.EC;const G=()=>X.EC.G;
const PV=()=>window.D.PROV;
const nuocNha=()=>(PV()[S().loc.p]||{}).nat||'trieu';
/* ---------- chiến sự của nước mình ---------- */
function chienSu(){const s=S();if(s.war)return {kind:'war',ten:s.war.n||'cuộc chiến'};const hn=nuocNha();const x=((s.w&&s.w.xung)||[]).find(z=>z.a===hn||z.b===hn);return x?{kind:'xung',ten:'cuộc đụng độ ở biên giới'}:null}
const diem=c=>(c.merit||0)+((c.flags&&c.flags.thanAn)||0)*5;
function month(){const s=S();if(!s||s.over)return;const now=chienSu();
  alive().forEach(c=>{if(!inClan(c)||c.job!=='quan_ngu'||age(c)<16)return;
    /* người đã về ở nhà được gọi ra trại khi có chiến sự, hết chiến lại về */
    if(c.flags.oNha&&now&&!c.away){c.away={type:'army'};log(`${nameOf(c)} được gọi ra trại vì chiến sự.`,'hi')}
    const cs=c.cs;
    if(now&&c.away&&c.away.type==='army'){if(!cs)c.cs={kind:now.kind,ten:now.ten,m0:diem(c),mm0:c.merit||0,t0:s.t};else if(now.kind==='war'&&cs.kind==='xung'){cs.kind='war';cs.ten=now.ten}}
    else if(!now&&cs){delete c.cs;if(s.t-cs.t0>=2)xet(c,cs);if(c.flags.oNha&&c.away&&c.away.type==='army')c.away=null}});
  const den=(s.xcCho||[]).filter(z=>z.t<=s.t);if(den.length){s.xcCho=s.xcCho.filter(z=>z.t>s.t);den.forEach(z=>{const c=P(z.cid);if(c&&c.dead==null&&inClan(c))enqueue('xcden',c.id,{z})})}}
/* ---------- ai cản ---------- */
const song=id=>{const n=id&&G().tie&&G().tie.get(id);return n&&n.ok!==0?n:null};
function keCan(c){const L=[];const D=G().dt;
  const tq=c.flags.doi&&song(c.flags.doi.tq);if(tq&&(tq.rel||0)<=-15)L.push({np:tq.id,ten:tq.n,vi:'thượng quan trong doanh vốn không ưa mình',p:0.28});
  const thu=Object.values((S().np&&S().np.l)||{}).filter(n=>n.ok!==0&&(n.rel||0)<=-30&&((n.vai||[]).some(v=>['quan','doi_thu','thuong_quan','quy_nhan'].includes(v))||(n.tier||0)>=4)&&(!tq||n.id!==tq.id));
  if(thu.length){const n=pick(thu);L.push({np:n.id,ten:n.n,vi:'mối hiềm cũ nay được dịp trả',p:0.2})}
  if(chance(0.22)&&G().tie){const hn=nuocNha();const kinh=Object.keys(PV()).find(p=>PV()[p].k==='kinh'&&PV()[p].nat===hn)||S().loc.p;const ten=pick(C().SURN)+' '+C().mkGiven('nam');
    const n=G().tie.ensure(c,{vai:['doi_thu'],name:ten,g:'nam',age:R(24,40),nghe:'tướng trẻ con nhà quyền thế',tier:5,rel:R(-12,0),why:'cùng đợt xét công',key:'xc:'+c.id+':'+S().t});
    if(n){const hs=n.house&&G().houseSur?G().houseSur(n.house)+' Gia':'một nhà quyền thế ở kinh';L.push({np:n.id,ten:n.n,vi:`có ${hs} chống lưng, đường dây mạnh hơn mình`,p:0.22})}}
  let g=0;const tro=window.BNHELP?window.BNHELP.find('office',{who:c}):null;if(tro)g+=0.14;if(tq&&(tq.rel||0)>=30)g+=0.1;
  const risk=L.length?clamp(0.08+L.reduce((a,z)=>a+z.p,0)-g,0.02,0.7):0;return {L:L.sort((a,b)=>b.p-a.p),risk,tro}}
/* ---------- phần thưởng ---------- */
const TENTH=(c,it)=>it.k==='thang'?`thăng lên ${C().ARMY[Math.min(C().ARMY.length-1,c.lv+1)][0]}`:it.k==='tien'?`tiền thưởng ${money(it.v)}`:it.k==='dat'?`${it.v} mẫu đất`:it.k==='nha'?'nhà ở kinh đô':'chỉ hôn';
const duocThang=c=>c.job==='quan_ngu'&&c.lv<C().ARMY.length-1&&(c.merit||0)>=C().ARMY[c.lv+1][2]&&(c.tri||0)>=(C().ARMY_TRI[c.lv+1]||0);
function nhan(c,it){
  if(it.k==='thang'){if(!duocThang(c))return '';return fx(c,{lv:1,fame:8+c.lv*3,tam:6})}
  if(it.k==='tien')return fx(c,{money:it.v});
  if(it.k==='dat'){if(G().landDelta)G().landDelta(it.v);return `<span class="fx"><span class="up">Đất ${'+'+it.v} mẫu</span></span>`}
  if(it.k==='nha'){enqueue('nhakinh',c.id);return '<span class="fx"><span class="up">Được ban nhà ở kinh đô</span></span>'}
  if(it.k==='hon'){enqueue('tuhon',c.id);return '<span class="fx"><span class="up">Được chỉ hôn</span></span>'}
  return ''}
/* ---------- hộp xét công ---------- */
function xet(c,cs){const gain=Math.round(diem(c)-cs.m0);const war=cs.kind==='war';if(gain<(war?25:12))return;
  const ARMY=C().ARMY;const items=[];const dong=[];
  const them=Math.round(Math.max(0,(c.merit||0)-cs.mm0)/5*(war?1:0.6))+(war&&gain>=300?80:war&&gain>=150?40:0);
  const tuoc0=c.tuoc||0;let tn='';
  const nguoi=c.g==='nữ'?nguoiNhan(c):null;const nt0=nguoi?(nguoi.tuoc||0):0;
  if(them>0){c.cong=(c.cong||0)+them;C().tuocCheck(c,'chiến công trong '+cs.ten,true);tn=C().tuocNote()}
  dong.push(`Chiến công lần này ${gain}. Công trạng +${them}.${tn}`);
  const muc=gain>=150?12:gain>=60?6:3;items.push({k:'tien',v:Math.round(ARMY[c.lv][1]*muc*(war?1:0.5))});
  if(duocThang(c))items.push({k:'thang'});
  if(war&&gain>=120&&(c.tuoc||0)>=1)items.push({k:'dat',v:R(2,4)+(c.tuoc||0)});
  if((c.tuoc||0)>=1&&!c.flags.nhaKinh)items.push({k:'nha'});
  if(war&&c.g==='nam'&&!C().spouseOf(c)&&age(c)<=40&&((c.tuoc||0)>=1||gain>=200)&&chance(0.6))items.push({k:'hon'});
  /* tước chuyển sang chồng hoặc cha thì nhà kinh đi theo người giữ tước */
  if(nguoi&&(nguoi.tuoc||0)>nt0&&!nguoi.flags.nhaKinh)enqueue('nhakinh',nguoi.id);
  enqueue('xetcong',c.id,{items,dong,ten:cs.ten,war,gain})}
function xetPopup(c,it){if(c.dead!=null||!inClan(c)){setTimeout(C().nextPopup,0);return}
  const kc=keCan(c);const chac=[],hoan=[],cuop=[];
  it.items.forEach(x=>{if(kc.L.length&&chance(kc.risk)){const k=pick(kc.L);const mat={tien:0.5,thang:0.45,nha:0.4,hon:0.6,dat:0.4}[x.k]||0.5;(chance(mat)?cuop:hoan).push(Object.assign({by:k},x))}else chac.push(x)});
  const dsCan=[...hoan,...cuop];
  const mota=`${esc(it.dong.join(' '))}<br>${chac.length?'Được ban ngay: '+chac.map(x=>TENTH(c,x)).join(', ')+'.':''}`
    +(hoan.length?'<br>'+hoan.map(x=>`<b>${esc(TENTH(c,x))}</b> bị gác lại: ${esc(x.by.ten)}, ${esc(x.by.vi)}.`).join('<br>'):'')
    +(cuop.length?'<br>'+cuop.map(x=>`<b>${esc(TENTH(c,x))}</b> bị đoạt: ${esc(x.by.ten)}, ${esc(x.by.vi)}.`).join('<br>'):'');
  const traChac=cc=>chac.map(x=>nhan(cc,x)).join('');
  const treo=(cc,x)=>{(S().xcCho=S().xcCho||[]).push({cid:cc.id,k:x.k,v:x.v,by:x.by,t:S().t+R(10,30)})};
  const mat=(cc,x)=>{const n=song(x.by.np);if(n&&G().tie)G().tie.rel(n,-15,cc);if(n)(S().xcCho=S().xcCho||[]).push({cid:cc.id,k:x.k,v:x.v,by:x.by,doi:1,t:S().t+R(24,60)})};
  const giai=(cc,tl)=>{let s='';const lay=[],con=[];hoan.forEach(x=>lay.push(x));cuop.forEach(x=>(chance(tl)?lay:con).push(x));
    s+=lay.map(x=>nhan(cc,x)).join('');con.forEach(x=>mat(cc,x));
    return (lay.length?` Lấy được: ${lay.map(x=>TENTH(cc,x)).join(', ')}.`:'')+(con.length?` Mất: ${con.map(x=>TENTH(cc,x)).join(', ')}.`:'')+s};
  let opts;
  if(!dsCan.length)opts=[{l:'Bái tạ, lĩnh thưởng',f:cc=>'Sắc chỉ đọc xong, cả doanh chúc mừng.'+traChac(cc)+fx(cc,{tam:10,fame:6})}];
  else{const phi=Math.round(C().ARMY[c.lv][1]*6);opts=[
    {l:'Dâng sớ biện bạch, kể rõ từng trận',r:[{tri:1,eq:0.7},58],y:cc=>{const t=traChac(cc);return 'Sớ được đọc giữa triều, người ta không lấp được nữa.'+giai(cc,0.5)+t+fx(cc,{tam:6,fame:5})},
      n:cc=>{const t=traChac(cc);hoan.forEach(x=>treo(cc,x));cuop.forEach(x=>mat(cc,x));const n=song(dsCan[0].by.np);if(n&&G().tie)G().tie.rel(n,-10,cc);return 'Sớ chìm xuống, lại thêm một người ghét.'+t+fx(cc,{tam:-8})}}];
    if(kc.tro)opts.push({l:`Nhờ ${kc.tro.name||'quý nhân'} nói giúp`,f:cc=>{const t=traChac(cc);const s=giai(cc,0.6);if(window.BNHELP)window.BNHELP.use(kc.tro,'office',`nói giúp ${cc.given} khi xét công`);return 'Có người lên tiếng, hồ sơ được lật lại.'+s+t+fx(cc,{tam:4})}});
    opts.push({l:`Lo lót người coi sổ công (${money(phi)})`,c:()=>S().money>=phi,f:cc=>{S().money-=phi;const t=traChac(cc);return 'Tiền đi trước, sổ sách đổi theo.'+giai(cc,0.4)+t+fx(cc,{liem:-4})}});
    opts.push({l:'Nhịn, nhận phần được ban',f:cc=>{const t=traChac(cc);hoan.forEach(x=>treo(cc,x));cuop.forEach(x=>mat(cc,x));return 'Nuốt giận mà chờ.'+t+fx(cc,{tam:-7,eq:1})}})}
  C().choicePopup(c,'Xét công',`Xét công sau ${it.ten}`,mota,opts)}
/* ---------- phần bị gác lại hoặc bị đoạt, nhiều tháng sau ---------- */
function xcdenPopup(c,it){const z=it.z;if(!z||c.dead!=null||!inClan(c)){setTimeout(C().nextPopup,0);return}
  if((z.k==='nha'&&c.flags.nhaKinh)||(z.k==='hon'&&C().spouseOf(c))){setTimeout(C().nextPopup,0);return}
  const n=song(z.by&&z.by.np);const ten=TENTH(c,z);
  if(z.doi){const yeu=!n||(n.cond&&/mất|sa sút/.test(n.cond));C().choicePopup(c,'Món nợ công',yeu?'Kẻ đoạt công đã hết thế':'Chuyện công cũ',yeu?`${esc(z.by.ten)}, kẻ năm xưa đoạt ${esc(ten)} của ${esc(c.given)}, nay đã hết thế. Sổ công cũ vẫn còn.`:`${esc(z.by.ten)}, kẻ năm xưa đoạt ${esc(ten)} của ${esc(c.given)}, nay vẫn đắc thế. Trong triều có người nhắc lại sổ công cũ.`,[
      {l:'Dâng sổ công cũ, đòi lại',r:[{tri:1,eq:0.6,fame:0.3},yeu?35:68],y:cc=>'Triều đình xét lại, trả công cho đúng người.'+nhan(cc,z)+fx(cc,{fame:10,tam:10}),n:cc=>{if(n&&G().tie)G().tie.rel(n,-10,cc);return 'Chuyện cũ không ai muốn lật.'+fx(cc,{tam:-8,fame:-3})}},
      {l:'Để chuyện cũ qua đi',f:cc=>'Có những món nợ đành gác lại.'+fx(cc,{tam:-2,eq:1})}]);return}
  const duoc=!n||(n.rel||0)>-15||chance(0.55);
  C().choicePopup(c,'Xét công',duoc?'Phần thưởng bị gác nay được ban':'Phần thưởng bị gác nay mất hẳn',duoc?`Sau nhiều tháng treo lại, bộ Binh cuối cùng duyệt ${esc(ten)} cho ${esc(c.given)}.`:`${esc(z.by.ten)} giữ hồ sơ tới cùng. ${esc(ten)} của ${esc(c.given)} bị gạch khỏi sổ.`,
    duoc?[{l:'Lĩnh thưởng',f:cc=>'Chậm còn hơn không.'+nhan(cc,z)+fx(cc,{tam:8})}]:[{l:'Ghi nhớ món nợ này',f:cc=>{if(n&&G().tie)G().tie.rel(n,-8,cc);return 'Tên người ấy được ghi vào lòng.'+fx(cc,{tam:-8})}}])}
/* ---------- nhà ở kinh ---------- */
function nhaKinhPopup(c){if(c.dead!=null||!inClan(c)||c.flags.nhaKinh){setTimeout(C().nextPopup,0);return}
  const E=C();const hn=nuocNha();const kinh=Object.keys(PV()).find(p=>PV()[p].k==='kinh'&&PV()[p].nat===hn);if(!kinh){setTimeout(E.nextPopup,0);return}
  const cap=(c.tuoc||0)>=4?4:3;const ten=E.HOMES[cap].n.toLowerCase();c.flags.nhaKinh=cap;const chu=E.isHead(c);
  const don=()=>{if(chu){const h=E.HH(E.mainHH());h.home=Math.max(h.home,cap);if(S().loc.p!==kinh&&!S().journey)E.startMove(kinh,2,false,true)}
    else{const id=E.newBranch(c,cap,0);const h=E.HH(id);if(kinh!==S().loc.p){h.far=1;h.p=kinh}const sp=E.spouseOf(c);[c,sp].concat(E.kidsOf(c).filter(k=>inClan(k)&&k.dead==null&&age(k)<16)).filter(Boolean).forEach(q=>q.hh=id)}};
  const veNha=cc=>{if(cc.job!=='quan_ngu')return;cc.flags.oNha=1;if(cc.away&&cc.away.type==='army'&&!chienSu())cc.away=null;alive().forEach(q=>{if(q.away&&q.away.type==='follow'&&q.away.of===cc.id)q.away=null})};
  const mota=`Triều đình ban cho ${esc(nameOf(c))} một ${ten} ở ${esc(PV()[kinh].n)}. ${chu?(S().loc.p===kinh?'Cả nhà dọn sang nhà mới.':'Gia chủ được ban nhà thì cả nhà dời về kinh, xe ngựa do triều đình lo.'):'Người ấy lập một chi riêng ở kinh, đem theo vợ con.'}`;
  const L=c.job==='quan_ngu'?[
    {l:'Về ở hẳn, chỉ ra trại khi có chiến sự',f:cc=>{don();veNha(cc);return 'Cởi giáp, bước qua cửa nhà mình.'+fx(cc,{tam:14,fame:10})}},
    {l:'Giữ nhà đó, vẫn ở lại quân ngũ',f:cc=>{don();cc.flags.oNha=0;return 'Nhà có người trông, còn mình vẫn ở với quân.'+fx(cc,{tam:6,fame:10})}}]
    :[{l:'Bái tạ, nhận nhà',f:cc=>{don();return 'Chìa khóa nằm nặng trong tay.'+fx(cc,{tam:10,fame:10})}}];
  E.choicePopup(c,'Ân thưởng','Ban nhà ở kinh đô',mota,L)}
/* ---------- chỉ hôn ---------- */
function tuHonPopup(c){const E=C();if(c.dead!=null||!inClan(c)||E.spouseOf(c)){setTimeout(E.nextPopup,0);return}
  const p=E.mkMatch(c,{g:'nữ'});p.born=S().t-18*12-R(0,11);p.mi=R(82,96);p.tri=R(70,90);p.eq=R(68,90);E.ensurePersona(p);
  const hn=nuocNha();const kinh=Object.keys(PV()).find(z=>PV()[z].k==='kinh'&&PV()[z].nat===hn)||S().loc.p;
  let hid=null;try{hid=G().houseFor?G().houseFor({tier:Math.min(6,3+(c.tuoc||0)),loc:kinh}):null}catch(e){}
  if(hid&&G().houseSur)p.surname=G().houseSur(hid);
  const nha=hid?`con gái ${p.surname} Gia`:`con gái một nhà ${p.surname} có tiếng ở kinh`;
  E.choicePopup(c,'Ân thưởng','Vua chỉ hôn',`Chiếu chỉ ban cho ${esc(nameOf(c))} thành thân với cô ${esc(p.surname+' '+p.given)}, 18 tuổi, ${esc(nha)}: trí ${Math.round(p.tri)}, mị ${Math.round(p.mi)}, EQ ${Math.round(p.eq)}.`,[
    {l:'Bái tạ nhận chỉ hôn',f:cc=>{const sp=E.mkSpouse(cc,false,p);if(!sp)return 'Hôn sự không thành.';cc.love=sp.love=R(45,70);if(hid&&G().houseRel)G().houseRel(hid,18);if(cc.away&&cc.away.type==='army'&&G().dt&&G().dt.duocDuaVo(cc))sp.away={type:'follow',of:cc.id,p:null};return `${esc(sp.given)} về làm dâu nhà ${esc(S().surname)}.`+fx(cc,{fame:25,tam:12})}},
    {l:'Dâng sớ xin từ khéo',r:[{eq:1,khau:0.6},55],y:cc=>'Lời lẽ khiêm cung, vua cười cho qua.'+fx(cc,{fame:-3,eq:1}),n:cc=>{if(hid&&G().houseRel)G().houseRel(hid,-18);return 'Người ta coi là chê chỉ vua ban.'+fx(cc,{fame:-18,tam:-6})}}])}
/* ---------- tước cho nữ nhân ---------- */
const goa=c=>S().people.some(q=>q.dead!=null&&(q.spouse===c.id||c.spouse===q.id));
function nguoiNhan(c){const sp=C().spouseOf(c);
  if(sp&&sp.dead==null&&inClan(sp)){const oRe=!!sp.inLaw&&!c.inLaw;if(!oRe)return sp}
  else if(goa(c))return null;
  const cha=(c.parents||[]).map(id=>P(id)).find(q=>q&&q.g==='nam'&&q.dead==null&&inClan(q));return cha||null}
const HIEU=['','Nghi nhân','Cung nhân','Thục nhân','Phu nhân','Nhất phẩm phu nhân'];
/* con được tước thì cha mẹ thơm lây */
function thomLay(c,to,tru){(c.parents||[]).map(id=>P(id)).filter(q=>q&&q.dead==null&&inClan(q)&&q!==tru).forEach(q=>{q.fame=(q.fame||0)+8*to;X.EC.addStat(q,'tam',6);log(`${nameOf(q)} được thơm lây vì công của ${nameOf(c)}.`,'gd')})}
/* trả về null nếu nàng tự giữ tước; còn lại trả về {ok, msg} */
function tuocNu(c,to,why){const r=nguoiNhan(c);if(!r)return null;const E=C();const TC=E.TUOC_CONG,T=E.TUOC;const pts=c.cong||0;const vai=E.spouseOf(c)===r?'chồng':'cha';
  c.cong=0;thomLay(c,to,r);
  if(!(r.tuoc>0)){r.cong=Math.max(r.cong||0,TC[to]);E.tuocCheck(r,`công của ${c.given}`,true);E.tuocNote();log(`Công của ${nameOf(c)} được ban tước cho ${vai} là ${nameOf(r)}.`,'gd');
    return {ok:true,msg:` Theo lệ, tước ban cho ${vai} là <b>${r.surname} ${r.given}</b>: ${T[r.tuoc]||T[to]}.`}}
  const ke=Math.min(5,r.tuoc+1);
  if(r.tuoc<5&&(r.cong||0)+pts>=TC[ke]){r.cong=(r.cong||0)+pts;E.tuocCheck(r,`công của ${c.given}`,true);E.tuocNote();
    return {ok:true,msg:` Công của nàng cộng cho ${vai} là <b>${r.surname} ${r.given}</b>, đủ để thăng ${T[r.tuoc]}.`}}
  r.fame=(r.fame||0)+10*to;enqueue('thuongnu',c.id,{to,r:r.id});
  return {ok:false,msg:` ${vai==='chồng'?'Chồng':'Cha'} nàng đã có tước mà công chưa đủ thăng, triều đình ban thưởng riêng cho nàng.`}}
function thuongNuPopup(c,it){const E=C();if(c.dead!=null||!inClan(c)){setTimeout(E.nextPopup,0);return}
  const r=P(it.r);const bac=Math.max(1,Math.min(5,(r&&r.tuoc)||it.to||1));const hieu=HIEU[bac];const v=Math.round((E.TUOC_PAY[Math.max(1,it.to||1)]||1000)*6);
  E.choicePopup(c,'Ân thưởng','Ban thưởng cho nữ nhân',`Công của ${esc(nameOf(c))} được triều đình ghi nhận. Sứ giả mang chiếu tới, cho chọn một ân điển.`,[
    {l:`Nhận phong hiệu ${hieu}`,f:cc=>{cc.flags.hieu=hieu;return `Từ nay người ta gọi nàng là ${hieu}.`+fx(cc,{fame:40,tam:10})}},
    {l:'Xin biển ngạch vua ban treo trước cửa',f:cc=>'Biển son chữ vàng treo trước cổng, người qua đường đều ngoái nhìn.'+fx(cc,{cfame:18,fame:12,tam:6})},
    {l:'Nhận vàng bạc, gấm lụa làm của riêng',f:cc=>{cc.purse=(cc.purse||0)+v;return `Rương gấm lụa khiêng vào phòng riêng.<span class="fx"><span class="up">Tiền riêng +${money(v)}</span></span>`+fx(cc,{tam:8})}},
    {l:'Nhận trâm vàng, áo mũ ban riêng',f:cc=>'Áo mũ ban riêng, mặc vào là khác hẳn.'+fx(cc,{mi:5,fame:18,tam:8})}])}
X.EC.G.cong={chienSu,month,nguoiNhan,tuocNu,thomLay,keCan,xet};
Object.assign(X.fn,{congMonth:month,xetPopup,xcdenPopup,nhaKinhPopup,tuHonPopup,thuongNuPopup,tuocNu,thomLay});
});
