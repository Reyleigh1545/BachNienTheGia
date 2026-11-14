/* Bách Niên Thế Gia v6.7.0-d4 · triều đình sống: dịp gặp hoàng tộc (hv_), thượng quan và đồng liêu thật (tq_),
   cốt truyện Phò mã (pc_), cốt truyện Tú nữ và vương phi (vp_).
   Nguyên tắc: gặp ai là do nơi ở và việc làm (ở kinh, làm quan, tuần du, tuyển tú). Mỗi người trong hoàng tộc có cờ met (đã gặp) và rel (cảm tình).
   Không ai cưới người mình chưa từng gặp. Mọi hệ quả để lại dấu (met, rel, hold, oan_thay:<ghế>, flags). */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const FM=v=>G.fmtMoney(v);const N=c=>esc(c.given);
const rich=v=>()=>G.money()>=m(v);
const pay=(l,v,o)=>Object.assign({l:`${l} (${FM(m(v))})`,c:rich(v)},o);
const F=()=>G.fam.ens();
const TQ=o=>Object.assign({tags:{},k:'Quan trường',cd:30,pcd:60,job:['quan'],ms:1},o);
const HV=o=>Object.assign({tags:{},k:'Hoàng tộc',cd:48,pcd:96,job:['quan'],ms:1},o);
const FX=o=>Object.assign({tags:{},k:'Hoàng tộc',fixed:1,ms:1,head:1},o);
const royal=roles=>{const f=F();return [f.hau,f.thai].concat(f.phi,f.tu,f.cong,f.vuong,f.qc).filter(p=>p&&p.dead==null&&(!roles||roles.includes(p.role)))};
const meet=(p,v)=>{if(p){p.met=1;p.rel=Math.max(-100,Math.min(100,(p.rel||0)+(v||0)))}return ''};
const rname=p=>p?G.fam.name(p):'một người trong hoàng tộc';
const D=()=>G.S().dyn;
const kingAge=()=>D().k.age;
const nbOf=c=>G.npc.boss(c,0);
const peerOf=c=>G.npc.boss(c,1);
const tn=()=>G.tierIdx();
const cong=id=>F().cong.find(p=>p.id===id);
/* ---------- Phò mã: trạng thái ở c.flags.pc = {id (công chúa), s (điểm), st (bước), t} ---------- */
const PC=c=>c.flags&&c.flags.pc;
const pcP=c=>{const a=PC(c);return a?cong(a.id):null};
const pcOk=c=>{const a=PC(c),p=pcP(c);return !!a&&!!p&&p.dead==null&&!p.wed&&!c.spouse&&c.dead==null&&!c.left};
const pcEnd=(c,why)=>{const a=PC(c),p=pcP(c);if(p&&p.hold===c.id)p.hold=null;if(c.flags)c.flags.pc=null;if(a)c.flags.pcDone=S().t;return why||''};
const pcLater=(c,id,a,b)=>{G.later(c,id,R(a,b),{});return ''};
const pcDead=c=>`Chuyện ${esc(c.given)} với công chúa không còn đường đi tiếp: ${pcP(c)&&pcP(c).wed?'công chúa đã có nơi có chốn':'người ấy không còn ở đó'}.`;
const pcGate=(id,t,x,o)=>FX({id,t,k:'Duyên cung đình',head:0,x:c=>pcOk(c)?x(c):pcDead(c),o:c=>pcOk(c)?o(c):[{l:'Tiếc nuối, bỏ qua',f:c=>pcEnd(c,'Chuyện khép lại.')+fx(c,{tam:-4})}]});
/* ---------- Tú nữ: trạng thái ở g.flags.vp = {rank, sung, kids, phi (id)} ---------- */
const girl=d=>{const g=d&&d.g?G.P(d.g):null;return g&&g.left==='vaocung'&&g.dead==null?g:null};
const phiOf=g=>g&&g.flags&&g.flags.vp?F().phi.find(p=>p.id===g.flags.vp.phi):null;
const vpGate=(id,t,x,o,ex)=>FX(Object.assign({id,t,k:'Vào cung',x:(c,d)=>girl(d)?x(c,d,girl(d)):'Tin từ trong cung không còn nữa.',o:(c,d)=>girl(d)?o(c,d,girl(d)):[{l:'Tiếc',f:c=>''}]},ex||{}));

return [
/* ===================== DỊP GẶP HOÀNG TỘC (chỉ ở kinh hoặc khi họ xuống tỉnh) ===================== */
HV({id:'hv_yen_cung',t:'Yến trong cung',lvr:null,age:[22,70],c:c=>G.inKinh(c)&&c.lv>=4,w:1.2,
 x:(c,d)=>{const L=royal(['hoang','tu','cong','vuong','phi','hau']).filter(p=>['tu','cong','vuong','phi'].includes(p.role));d.p=d.p||(L.length?pick(L).id:null);const p=d.p?G.fam.person(d.p):null;
  return `Nhân dịp lễ lớn, vua ban yến trong cung cho các quan từ Ngũ phẩm trở lên. ${esc(c.given)} được xếp một chỗ ở cuối hàng đại thần.${p?` Cùng bàn gần đó có ${esc(rname(p))}, ${p.age} tuổi, đang trò chuyện với đại thần bên cạnh.`:''}`},
 o:(c,d)=>{const p=d.p?G.fam.person(d.p):null;if(!p)return [{l:'Dự yến, giữ lễ',f:c=>'Một buổi yến trọn lễ.'+fx(c,{fame:3})}];return [
  {l:`Nâng chén chúc ${p.role==='cong'?'công chúa':p.role==='tu'?'hoàng tử':p.role==='vuong'?'thân vương':'phi'}`,r:[{khau:1,eq:0.6,mi:0.4},58],y:c=>meet(p,12)+`${esc(rname(p))} nhớ tên nhà mình, hỏi thăm vài câu. Cả bàn để ý.`+fx(c,{fame:5,tam:4}),n:c=>meet(p,-2)+'Lời chúc vụng, người ta chỉ gật đầu cho phải phép.'+fx(c,{tam:-3})},
  {l:'Dự yến, giữ lễ, không bắt chuyện',f:c=>meet(p,3)+'Nhà mình ngồi đúng chỗ, về đúng giờ. Không thêm không bớt.'+fx(c,{fame:2})},
  {l:'Ngâm một bài thơ ứng khẩu theo lệ yến',r:[{tri:1,mi:0.5},48],y:c=>meet(p,20)+`Bài thơ được khen, ${esc(rname(p))} sai người hỏi tên.`+fx(c,{fame:10,tri:1}),n:c=>meet(p,-4)+'Thơ gượng gạo, vài người nhìn nhau mỉm cười.'+fx(c,{fame:-3,tam:-4})}]}}),
HV({id:'hv_dai_le',t:'Đại lễ ở kinh thành',age:[22,70],c:c=>G.inKinh(c)&&c.lv>=3,w:0.8,
 x:(c,d)=>{const L=royal(['vuong','qc']);d.p=d.p||(L.length?pick(L).id:null);const p=d.p?G.fam.person(d.p):null;
  return `Triều đình làm đại lễ, quan văn võ đứng theo ban. ${p?`Đứng ngay phía trước ${esc(c.given)} là ${esc(rname(p))}, nghe nói ${p.td==='nghi'?'đang bị triều đình để mắt':'được vua tin dùng'}.`:'Hàng ngũ chỉnh tề.'}`},
 o:(c,d)=>{const p=d.p?G.fam.person(d.p):null;if(!p)return [{l:'Đứng đúng ban',f:c=>'Lễ xong, mọi người về.'}];return [
  {l:'Nhân lúc nghỉ giữa buổi, xin được tới chào',r:[{eq:1,khau:0.6},60],y:c=>meet(p,14)+`${esc(rname(p))} gật đầu, hỏi nhà ở đâu, làm gì. Một sợi dây nhỏ nối vào.`+fx(c,{fame:4}),n:c=>meet(p,-3)+'Người ấy đang bận nói chuyện, chỉ liếc qua.'},
  {l:'Giữ khoảng cách, đứng xa',f:c=>meet(p,1)+'Nhà mình thấy rõ ai đứng cạnh ai, mà không để lộ gì.'+fx(c,{tri:1})}]}}),
HV({id:'hv_tuan_du',t:'Thân vương về tuần phủ',job:null,head:1,age:[28,85],c:c=>{const f=F();const hp=G.homeP();return !!hp&&f.vuong.some(p=>p.dead==null&&p.land===hp)},w:1,pcd:120,
 x:(c,d)=>{const hp=G.homeP();const L=F().vuong.filter(p=>p.dead==null&&p.land===hp);d.p=d.p||(L.length?L[0].id:null);const p=d.p?G.fam.person(d.p):null;
  return `${p?esc(rname(p)):'Thân vương'} về đất phong, đi qua địa phương nhà ${N(c)}. Quan sở tại lo đón rước, mời các nhà có tiếng đến ra mắt.`},
 o:(c,d)=>{const p=d.p?G.fam.person(d.p):null;if(!p)return [{l:'Đứng xem',f:c=>''}];return [
  pay('Dâng lễ ra mắt',8,{f:c=>meet(p,12)+`${esc(rname(p))} nhận lễ, nhớ mặt nhà mình.`+fx(c,{money:-m(8),fame:5})}),
  {l:'Đến ra mắt, không dâng lễ lớn',r:[{eq:1,khau:0.6},55],y:c=>meet(p,8)+`${esc(rname(p))} ghi nhận nhà mình không xu nịnh.`+fx(c,{fame:3}),n:c=>meet(p,0)+'Thân vương không để ý, quan sở tại cũng làm lơ.'},
  {l:'Cáo bệnh, không ra mắt',f:c=>meet(p,-6)+'Không có mặt trong danh sách ra mắt. Quan sở tại ghi nhớ.'}]}}),
HV({id:'hv_quoc_cong_que',t:'Quốc công ghé quê',job:null,head:1,age:[28,85],c:c=>!!G.homeP()&&F().qc.some(p=>p.dead==null)&&S().t>=96,w:0.5,pcd:240,
 x:(c,d)=>{const L=F().qc.filter(p=>p.dead==null);d.p=d.p||(L.length?pick(L).id:null);const p=d.p?G.fam.person(d.p):null;
  return `${p?esc(rname(p)):'Một quốc công'} về thăm quê, ngựa xe rợp đường. Hào lý sở tại mở tiệc. Nhà ${N(c)} nằm trong tầm mắt người ta.`},
 o:(c,d)=>{const p=d.p?G.fam.person(d.p):null;if(!p)return [{l:'Đứng xem',f:c=>''}];return [
  pay('Đến chào, dâng lễ đúng phép',10,{f:c=>meet(p,10)+`${esc(rname(p))} khách khí, hỏi chuyện nhà.`+fx(c,{money:-m(10),fame:4})}),
  {l:'Chào theo lệ rồi lui',f:c=>meet(p,3)+'Một cái cúi chào, một lời đáp. Xong.'},
  {l:'Không ra, giữ nếp nhà',f:c=>meet(p,-4)+'Nhà mình vắng mặt. Có người cho là tự trọng, có người cho là kiêu.'}]}}),

/* ===================== THƯỢNG QUAN, ĐỒNG LIÊU (người thật ở ghế) ===================== */
TQ({id:'tq_yen_thuong_quan',t:'Thượng quan mở tiệc',age:[24,75],c:c=>c.seat&&c.lv>=1&&!!nbOf(c),w:1,
 x:c=>{const b=nbOf(c);if(!b)return 'Một ngày bình thường ở nha môn.';return `${esc(b.st.n)}, ${b.st.age} tuổi, giữ ${esc(G.seatName(b.key))}, mở tiệc mời các quan thuộc hạ. ${b.st.tc==='tham lam'?'Ai cũng biết ông ta thích quà.':b.st.tc==='liêm khiết'?'Ông ta nổi tiếng thanh liêm, tiệc đạm bạc.':b.st.tc==='xu nịnh'?'Ông ta nói chuyện mềm như nước.':'Ông ta ít nói, quan sát nhiều.'}`},
 o:c=>{const b=nbOf(c);if(!b)return [{l:'Đến dự',f:c=>''}];const bad=b.st.tc==='liêm khiết';return [
  pay('Dự tiệc, dâng quà hậu',12,{f:c=>{G.npc.add(b.st,'rel',bad?-12:15);return (bad?`${esc(b.st.n)} cau mày, trả quà. Nhà mình mang tiếng nịnh.`:`${esc(b.st.n)} nhận quà, mỉm cười. Mối quan hệ gần thêm một bước.`)+fx(c,{money:-m(12),liem:bad?0:-4,fame:bad?-3:2})}}),
  {l:'Dự tiệc, quà nhẹ đúng lễ',f:c=>{G.npc.add(b.st,'rel',bad?10:5);return `Một buổi tiệc xã giao. ${esc(b.st.n)} ghi nhận nhà mình đúng mực.`+fx(c,{fame:2})}},
  {l:'Cáo bận, không dự',f:c=>{G.npc.add(b.st,'rel',-8);return `${esc(b.st.n)} để ý ai vắng mặt.`}}]}}),
TQ({id:'tq_xin_bao_lanh',t:'Xin thượng quan tiến cử',age:[26,75],c:c=>c.seat&&c.lv>=2&&!!nbOf(c)&&nbOf(c).st.rel>=15,w:1.4,
 x:c=>{const b=nbOf(c);if(!b)return 'Một ngày bình thường ở nha môn.';return `${esc(b.st.n)} ${b.st.rel>=40?'vốn quý mến':'có thiện cảm với'} ${N(c)}. Nghe tin có một đợt điều động chức vụ, ${N(c)} thấy đây là dịp nhờ ông ta nói giúp một lời.`},
 o:c=>{const b=nbOf(c);if(!b)return [{l:'Thôi',f:c=>''}];const cm=G.npc.cmp(c,b.st);return [
  {l:`Nhờ ${b.st.n} tiến cử`,r:[{eq:1,khau:0.6,fame:0.4},clampN(40+b.st.rel/2+(cm.dt>0?8:0))],y:c=>{G.npc.add(b.st,'rel',6);c.flags.noPromoUntil=0;G.qt.add(c,{fav:8});return `${esc(b.st.n)} viết một lá thư tiến cử đúng lúc. Đường thăng tiến thông hơn.`+fx(c,{fame:4})},n:c=>{G.npc.add(b.st,'rel',-4);return `${esc(b.st.n)} hứa hẹn rồi quên. Lá thư không bao giờ đến nơi.`+fx(c,{tam:-4})}},
  {l:'Tự mình chứng minh, không nhờ vả',f:c=>{G.npc.add(b.st,'rel',3);return `${esc(b.st.n)} nghe nói, thầm gật đầu.`+fx(c,{fame:2,eq:1})}}]}}),
TQ({id:'tq_chen_ep',t:'Bị thượng quan làm khó',age:[24,75],c:c=>c.seat&&c.lv>=1&&!!nbOf(c)&&(nbOf(c).st.oan>=20||(nbOf(c).st.tc==='tham lam'&&nbOf(c).st.rel<10)||G.mem.has('oan_thay:'+c.seat)),w:1.5,
 x:c=>{const b=nbOf(c);if(!b)return 'Một ngày bình thường ở nha môn.';return `${esc(b.st.n)} ${b.st.oan>=20?'vốn có oán với nhà mình':'không được quà như ý'}, nay giao cho ${N(c)} một việc rất khó, hạn gấp, ai cũng biết là để làm khó.`},
 o:c=>{const b=nbOf(c);if(!b)return [{l:'Nhận việc',f:c=>''}];return [
  {l:'Nhận việc, làm hết sức',r:[{tri:1,eq:0.6,ql:0.5},52],y:c=>{G.npc.add(b.st,'oan',-6);G.npc.add(b.st,'rel',6);return `Việc xong đúng hạn. ${esc(b.st.n)} không ngờ, đành ghi công.`+fx(c,{fame:5,m:2})},n:c=>{G.qt.add(c,{risk:8});return 'Việc không kịp hạn, bị ghi lỗi trước mặt nha môn.'+fx(c,{fame:-4,tam:-6})}},
  {l:'Báo lên cấp trên nữa về việc bị làm khó',r:[{eq:1,khau:0.7},45],y:c=>{G.npc.add(b.st,'oan',10);return 'Cấp trên xét lại, thu hồi việc ấy. Nhưng thượng quan ghi thêm một món oán.'+fx(c,{fame:3})},n:c=>{G.npc.add(b.st,'oan',12);G.qt.add(c,{risk:10});return 'Cấp trên bênh thuộc hạ. Nhà mình mang tiếng bới lông tìm vết.'+fx(c,{fame:-5,tam:-5})}},
  pay('Dâng lễ để việc được nới tay',14,{f:c=>{G.npc.add(b.st,'oan',-12);return `${esc(b.st.n)} nhận lễ, nới hạn. Việc êm.`+fx(c,{money:-m(14),liem:-5})}})]}}),
TQ({id:'tq_tranh_cong',t:'Đồng liêu tranh công',age:[24,70],c:c=>c.seat&&c.lv>=1&&!!peerOf(c),w:1,
 x:c=>{const b=peerOf(c);if(!b)return 'Một ngày bình thường ở nha môn.';return `Một việc vừa xong, ${esc(b.st.n)} ở nha môn bên cạnh tuyên bố ông ta là người làm chính. Tờ trình lên trên chưa có tên ${N(c)}.`},
 o:c=>{const b=peerOf(c);if(!b)return [{l:'Bỏ qua',f:c=>''}];return [
  {l:'Trình bày chứng cứ công trạng của mình',r:[{tri:1,eq:0.6},55],y:c=>{G.npc.add(b.st,'oan',8);c.cong=(c.cong||0)+15;return `Giấy tờ chứng minh đúng. Công được ghi cho mình, ${esc(b.st.n)} mất mặt.`+fx(c,{fame:5})},n:c=>{G.npc.add(b.st,'oan',6);return 'Chứng cứ thiếu một mảnh. Công về tay người khác.'+fx(c,{tam:-5})}},
  {l:'Nhường công, giữ hòa khí',f:c=>{G.npc.add(b.st,'rel',12);return `${esc(b.st.n)} cảm kích, nhớ ơn.`+fx(c,{tam:-2,eq:1})}}]}}),
TQ({id:'tq_hac_toi_nguoc',t:'Bị hặc tội ngược',age:[26,75],c:c=>c.seat&&c.lv>=3&&G.mem.has('oan_thay:'+c.seat),w:2.5,pcd:120,
 x:c=>{const mo=G.mem.get('oan_thay:'+c.seat);return `Người bị thay ở ghế này, ${esc((mo&&mo.n)||'người cũ')}, vẫn còn bạn bè trong triều. Một tờ sớ hặc tội ${N(c)} vừa được dâng lên, nói toàn chuyện cũ bới ra.`},
 o:c=>[{l:'Đối đáp bằng giấy tờ, từng điều',r:[{tri:1,eq:0.7},55],y:c=>{G.mem.clear('oan_thay:'+c.seat);return 'Từng điều bị bác. Tờ sớ không đứng vững, người dâng bị ghi lỗi.'+fx(c,{fame:5})},n:c=>{G.qt.add(c,{risk:14});return 'Một điều không bác được. Nhà mình bị ghi lỗi.'+fx(c,{fame:-6,tam:-6})}},
  pay('Nhờ người trong triều nói giúp',20,{r:[{khau:1,eq:0.6},58],y:c=>{G.mem.clear('oan_thay:'+c.seat);return 'Có người đứng ra bảo lãnh. Chuyện lắng.'+fx(c,{money:-m(20)})},n:c=>{G.qt.add(c,{risk:10});return 'Tiền đi, người bảo lãnh nhận nhưng không nói gì.'+fx(c,{money:-m(20),tam:-5})}}),
  {l:'Xin từ chức tránh đòn',f:c=>{G.mem.clear('oan_thay:'+c.seat);return 'Dâng đơn xin về. Người ta thôi truy đuổi.'+fx(c,{fame:-8})}}]}),
TQ({id:'tq_ket_nghia',t:'Kết nghĩa với đồng liêu',age:[26,65],c:c=>c.seat&&c.lv>=2&&!!peerOf(c)&&peerOf(c).st.rel>=10,w:0.8,pcd:96,
 x:c=>{const b=peerOf(c);if(!b)return 'Một ngày bình thường ở nha môn.';return `${esc(b.st.n)}, ${b.st.age} tuổi, giữ ${esc(G.seatName(b.key))}, hay tìm ${N(c)} bàn chuyện. Hai người hợp tính. Ông ta đề nghị kết nghĩa anh em.`},
 o:c=>{const b=peerOf(c);if(!b)return [{l:'Từ tạ',f:c=>''}];return [
  {l:'Nhận lời, làm lễ kết nghĩa',f:c=>{G.npc.add(b.st,'rel',30);return `Hai người trao thiếp, uống rượu thề. ${esc(b.st.n)} từ nay là chỗ nhờ cậy, và cũng là người nhà mình phải bảo vệ.`+fx(c,{fame:3,tam:5})}},
  {l:'Từ tạ khéo, chỉ làm bạn',f:c=>{G.npc.add(b.st,'rel',6);return 'Hai bên vẫn qua lại, không ràng buộc.'}}]}}),

/* ===================== PHÒ MÃ: cưới công chúa ===================== */
{id:'pc_0',t:'Ánh mắt trong cung yến',k:'Duyên cung đình',tags:{},ms:1,age:[18,40],pcd:240,cd:120,w:0.6,
 c:c=>!c.spouse&&!c.inLaw&&c.job==='quan'&&c.lv>=3&&G.inKinh(c)&&tn()>=3&&!PC(c)&&!(c.flags&&c.flags.pcDone>S().t-120)&&F().cong.some(p=>p.dead==null&&p.met&&p.rel>=10&&!p.wed&&!p.hold&&p.age>=16&&p.age<=30),
 x:(c,d)=>{const L=F().cong.filter(p=>p.dead==null&&p.met&&p.rel>=10&&!p.wed&&!p.hold&&p.age>=16&&p.age<=30);d.p=d.p||(L.length?L[0].id:null);const p=d.p?cong(d.p):null;
  return p?`Từ lần gặp ở cung yến, ${esc(rname(p))}, ${p.age} tuổi, vẫn nhớ ${N(c)}. Một cung nữ thân cận của công chúa nhiều lần "tình cờ" gặp nhà mình ở hành lang. Người ta bắt đầu bàn tán.`:'Chuyện cũ.'},
 o:(c,d)=>{const p=d.p?cong(d.p):null;if(!p)return [{l:'Thôi',f:c=>''}];return [
  {l:'Để ý và đáp lại, từ tốn',f:c=>{c.flags.pc={id:p.id,s:0,st:1,t:S().t};p.hold=c.id;p.holdT=S().t;meet(p,6);G.later(c,'pc_1',R(2,4),{});return `Nhà mình để ý đến ${esc(rname(p))}, từng bước. Chuyện này có thể đi đến đâu thì chưa ai biết.`+fx(c,{tam:4})}},
  {l:'Giữ khoảng cách: chuyện này nguy hiểm',f:c=>{c.flags.pcDone=S().t;return 'Nhà mình chọn giữ phận. Không ai trách, và cũng không ai nhớ.'+fx(c,{tam:-1})}}]}},
pcGate('pc_1','Cung nữ mang lời',c=>`Cung nữ thân cận của ${esc(rname(pcP(c)))} mang tới một ít quà nhỏ, nói là "của công chúa gửi tặng vì cảm phục chữ nghĩa". Trong gói có một mảnh giấy ghi một câu thơ dang dở.`,
 c=>[{l:'Họa lại câu thơ, lời lẽ cân nhắc',r:[{tri:1,mi:0.6,eq:0.4},55],y:c=>{PC(c).s++;PC(c).st=2;meet(pcP(c),10);pcLater(c,'pc_2',3,6);return 'Câu họa vừa lễ vừa tình. Mảnh giấy thứ hai đến sau một tuần.'+fx(c,{fame:4,tam:6})},n:c=>{PC(c).s--;meet(pcP(c),-4);pcLater(c,'pc_2',3,6);return 'Lời họa gượng gạo. Công chúa chỉ gửi lại một lời cảm ơn khách sáo.'+fx(c,{tam:-4})}},
  {l:'Đáp bằng một lời cảm ơn lễ độ, không hơn',f:c=>{PC(c).st=2;pcLater(c,'pc_2',3,6);return 'Giữ đúng mực. Công chúa hiểu, và có vẻ vừa ý vừa tiếc.'}},
  {l:'Trả lại quà, chấm dứt',f:c=>pcEnd(c,'Nhà mình trả lại quà kèm lời tạ. Chuyện kết thúc êm.')+fx(c,{tam:-3})}]),
pcGate('pc_2','Hoàng hậu cho gọi',c=>{const h=F().hau;return `${esc(rname(h))} cho người gọi ${N(c)} vào hầu chuyện. Bà hỏi gia thế, đức hạnh, và ai cũng hiểu bà đang xem người này có xứng với con gái nhà vua không. ${h.f&&G.qt.of(c).f===h.f?'Phe của bà và phe nhà mình cùng một hướng.':'Phe của bà không cùng hướng với nhà mình.'}`},
 c=>{const h=F().hau;const same=G.qt.of(c).f===h.f;return [
  {l:'Trả lời thật thà, không tô vẽ',r:[{eq:1,liem:0.5,fame:0.4},clampN(44+(same?12:0)+(c.liem-50)/5+pcP(c).rel/6)],y:c=>{PC(c).s++;meet(h,12);PC(c).st=3;pcLater(c,'pc_3',3,6);return 'Hoàng hậu gật đầu rất khẽ: "Người ngay." Bà không hứa gì, nhưng nhà mình đã qua cửa đầu.'+fx(c,{fame:5})},n:c=>{PC(c).s--;meet(h,-8);PC(c).st=3;pcLater(c,'pc_3',3,6);return 'Hoàng hậu nghe xong, không biểu lộ gì. Khi ra khỏi cung, ai cũng hiểu mình chưa được ưng.'+fx(c,{tam:-5})}},
  pay('Dâng hoàng hậu một món lễ quý',30,{r:[{khau:1,eq:0.5},clampN(50+(same?10:0))],y:c=>{PC(c).s++;meet(h,14);PC(c).st=3;pcLater(c,'pc_3',3,6);return 'Món lễ đúng ý bà. Bà tiễn ra tận cửa điện.'+fx(c,{money:-m(30),fame:3})},n:c=>{PC(c).s--;meet(h,-10);PC(c).st=3;pcLater(c,'pc_3',3,6);return 'Bà thấy đó là sự mua chuộc. Món lễ bị trả về.'+fx(c,{money:-m(30),fame:-4})}}),
  {l:'Xin được tâu thẳng về lòng mình đối với công chúa',r:[{eq:1,mi:0.6,tri:0.5},40],y:c=>{PC(c).s+=2;meet(h,10);PC(c).st=3;pcLater(c,'pc_3',3,6);return 'Hoàng hậu im lặng lâu, rồi nói: "Ta cũng từng trẻ." Nhà mình nhẹ lòng.'+fx(c,{fame:6,tam:8})},n:c=>{PC(c).s-=2;meet(h,-14);PC(c).st=3;pcLater(c,'pc_3',3,6);return 'Hoàng hậu thấy nhà mình bạo miệng. Lời nói bị coi là thiếu lễ.'+fx(c,{fame:-8,tam:-6})}}]}),
pcGate('pc_3','Tình địch',c=>{const q=F().qc.filter(p=>p.dead==null)[0];return `Ở cung yến, một thanh niên ${q?`con em nhà ${esc(rname(q))}`:'con nhà quyền quý'} cũng đang nhắm vào công chúa. Hắn trẻ, có thế, và công khai ganh ghét nhà mình.`},
 c=>[{l:'Cạnh tranh quang minh, để công chúa tự thấy',r:[{tri:0.8,mi:0.8,eq:0.5},50],y:c=>{PC(c).s++;PC(c).st=4;pcLater(c,'pc_4',3,6);return 'Công chúa nhìn hai người, rồi chọn cách nói chuyện lâu hơn với nhà mình.'+fx(c,{fame:5})},n:c=>{PC(c).s-=2;PC(c).st=4;pcLater(c,'pc_4',3,6);return 'Hắn có thế, và biết dùng thế. Nhà mình tụt lại.'+fx(c,{tam:-6})}},
  {l:'Nhờ người có thế chặn bớt đường của hắn',r:[{khau:1,eq:0.6},42],y:c=>{PC(c).s++;G.qt.add(c,{risk:6});PC(c).st=4;pcLater(c,'pc_4',3,6);return 'Hắn bị gọi đi đâu đó vài tháng. Nhà mình có thêm thời gian, và một món oán.'+fx(c,{tam:2})},n:c=>{PC(c).s--;G.qt.add(c,{risk:14});PC(c).st=4;pcLater(c,'pc_4',3,6);return 'Việc bị lộ. Hắn biết ai đứng sau, và công chúa cũng biết.'+fx(c,{fame:-8,tam:-6})}},
  {l:'Bỏ cuộc, nhường hắn',f:c=>pcEnd(c,'Nhà mình lùi. Hôn sự với công chúa không phải của nhà mình.')+fx(c,{tam:-8})}]),
pcGate('pc_4','Dâng biểu xin cưới',c=>`Đã đến lúc phải thưa với nhà vua. Theo lệ, gia chủ phải dâng biểu xin cưới công chúa, kèm lễ vật, kèm người bảo lãnh. ${D().k.nghi>=60?'Vua đa nghi, thích soi xét nhà nào muốn gần ngôi báu.':'Vua tính tình dễ chịu, nhưng triều đình thì không.'}`,
 c=>{const need=G.clanTuoc?G.clanTuoc():0;const good=PC(c).s;return [
  {l:'Dâng biểu, nhờ hoàng hậu và công chúa cùng nói',r:[{eq:1,khau:0.7,fame:0.5},clampN(35+good*8+(G.S().fame>=800?8:0)+pcP(c).rel/5-(D().k.nghi>=60?6:0))],y:c=>{PC(c).s++;PC(c).st=5;pcLater(c,'pc_5',2,5);return 'Vua đọc biểu, hỏi vài câu, rồi gật đầu: "Cho phép tính chuyện nạp thái."'+fx(c,{fame:10,tam:10})},n:c=>pcEnd(c,'Vua đọc biểu rồi trả lại: "Công chúa còn nhỏ, chưa tính chuyện chồng." Ai cũng hiểu đó là lời từ chối.')+fx(c,{fame:-6,tam:-10})},
  {l:'Nhờ một thân vương hoặc quốc công đã quen biết đứng ra dạm hỏi',r:[{khau:1,eq:0.7},clampN(30+good*8+((F().vuong.concat(F().qc).filter(p=>p.met&&p.rel>=20).length>0)?18:-10))],y:c=>{PC(c).s++;PC(c).st=5;pcLater(c,'pc_5',2,5);return 'Có người trong hoàng tộc nói giúp. Vua nể mặt người ấy mà gật đầu.'+fx(c,{fame:8})},n:c=>pcEnd(c,'Người được nhờ viện cớ bận. Không ai đứng ra nói giúp, và vua không nhận lời.')+fx(c,{tam:-10})},
  {l:'Chưa đủ vốn, xin hoãn thêm vài năm',f:c=>{PC(c).s--;PC(c).st=4;pcLater(c,'pc_4',18,30);return 'Nhà mình lùi lại để tích thêm công danh. Công chúa lớn thêm vài tuổi.'}}]}),
pcGate('pc_5','Lễ nạp thái',c=>`Vua đã cho phép. Lễ nạp thái là lễ vật lớn nhà trai dâng nhà vua: vàng, lụa, trầm, ngựa. Hoàng gia nhìn vào lễ này để xem nhà trai coi trọng đến đâu.`,
 c=>[pay('Lễ hậu, đúng phép nhà thế gia',320,{r:[{khau:0.6,eq:0.5},82],y:c=>{PC(c).s+=2;PC(c).st=6;pcLater(c,'pc_6',3,6);return 'Cả triều khen lễ vật đủ đầy mà không phô trương. Nhà vua hài lòng.'+fx(c,{money:-m(320),fame:12})},n:c=>{PC(c).st=6;pcLater(c,'pc_6',3,6);return 'Lễ hậu nhưng có món bị chê là thiếu tinh tế.'+fx(c,{money:-m(320),fame:4})}}),
  pay('Lễ vừa phải',200,{r:[{khau:0.5,eq:0.5},58],y:c=>{PC(c).s++;PC(c).st=6;pcLater(c,'pc_6',3,6);return 'Lễ vừa đủ, được chấp nhận.'+fx(c,{money:-m(200),fame:5})},n:c=>{PC(c).s--;PC(c).st=6;pcLater(c,'pc_6',3,6);return 'Lễ bị cho là hơi nhẹ so với thân phận công chúa. Có lời xì xào.'+fx(c,{money:-m(200),fame:-5})}}),
  {l:'Lễ giản dị, dốc lòng chứ không dốc của',r:[{eq:1,tri:0.5},30],y:c=>{PC(c).s++;PC(c).st=6;pcLater(c,'pc_6',3,6);return 'Lễ đơn sơ nhưng chân thành. Công chúa vui, vua cũng không trách.'+fx(c,{money:-m(60),fame:6,tam:6})},n:c=>{PC(c).s-=2;PC(c).st=6;pcLater(c,'pc_6',3,6);return 'Lễ vật nhẹ bị coi là coi thường hoàng gia.'+fx(c,{money:-m(60),fame:-10,tam:-6})},x:{}}]),
pcGate('pc_6','Hôn lễ hoàng gia',c=>`Ngày vui hay ngày hỏng tùy vào những gì đã làm từ đầu. ${PC(c).s>=4?'Mọi bước đã suôn sẻ: hoàng hậu ưng, vua gật, công chúa mong.':PC(c).s>=2?'Đã qua nhiều bước, vẫn còn vài ánh mắt dò xét.':'Con đường qua nhiều lần lỡ bước, vẫn còn cơ hội cuối.'}`,
 c=>[{l:'Cử hành hôn lễ',r:[{eq:1,tri:0.5,mi:0.4},clampN(25+PC(c).s*11)],y:c=>{const p=pcP(c);const pe=G.mkMatch(c,{g:'nữ',surname:'Nguyễn',given:p.n,age:p.age,famT:6,up:6,story:1});G.mkSpouse(c,true,pe);p.wed=G.nameOf(c);p.hold=null;c.flags.phoma=1;c.flags.pc=null;G.cf(25,'Cưới công chúa');G.grantTitle&&G.grantTitle(c,3);return `Công chúa về nhà chồng trong tiếng chiêng trống cả kinh thành. ${esc(c.given)} từ nay là phò mã, được vua ban tước, nhưng phải giữ mình: phò mã không được nắm thực quyền.`+fx(c,{fame:40,tam:20})},n:c=>{const p=pcP(c);if(p){p.hold=null;p.wed=pick(['Phạm','Vũ','Dương','Nguyễn'])+' '+G.mkGiven('nam')}c.flags.pc=null;c.flags.pcDone=S().t;return 'Đến phút cuối, vua đổi ý: công chúa được gả cho người khác. Nhà mình nhận về lễ vật trả lại, và những ánh mắt thương hại.'+fx(c,{fame:-8,tam:-14})}}])
,

/* ===================== TÚ NỮ VÀ VƯƠNG PHI ===================== */
vpGate('vp_1','Vào cung',(c,d,g)=>`${esc(g.given)} vào cung đã mấy tháng. Thư nhà mỗi tháng một lá, chữ viết nắn nót, không nói điều gì không nên nói. Nghe nói trong cung có ${F().phi.length} phi tần, ${esc(rname(F().hau))} làm chủ hậu cung.`,
 (c,d,g)=>[pay('Gửi thêm của cải cho con lo lót trong cung',20,{r:[{mi:0.6,eq:0.4},clampN(40+g.mi/4)],y:c=>{start(g,2);G.later(c,'vp_2',R(6,12),{g:g.id});return `${esc(g.given)} được xếp làm tài nhân bậc cao. Của cải giúp con có bạn trong cung.`+fx(c,{money:-m(20)})},n:c=>{start(g,1);G.later(c,'vp_2',R(6,12),{g:g.id});return `Của cải gửi vào mà không rõ chảy về tay ai. ${esc(g.given)} chỉ làm tài nhân bậc thấp.`+fx(c,{money:-m(20)})}}),
  {l:'Dặn con giữ mình, đừng tranh sủng',f:c=>{start(g,1);g.flags.vp.calm=1;G.later(c,'vp_2',R(6,12),{g:g.id});return `${esc(g.given)} sống lặng lẽ. Ít được để ý, ít bị nhắm vào.`}},
  {l:'Chỉ gửi thư thăm hỏi hằng tháng',f:c=>{start(g,1);G.later(c,'vp_2',R(6,12),{g:g.id});return `Thư đi thư lại. ${esc(g.given)} nhớ nhà.`+fx(g,{tam:2})}}]),
vpGate('vp_2','Được vua triệu',(c,d,g)=>`${D().k.age>=55?'Vua đã cao tuổi, ít khi triệu ai.':'Tin từ cung truyền ra: vua nhiều lần hỏi thăm một tài nhân mới.'} ${g.flags.vp.calm?'':'Người ta bàn tán.'}`,
 (c,d,g)=>[{l:'Mong con được may mắn',r:[{mi:0.8,duyen:0.5},clampN((g.flags.vp.rank*9)+30+g.mi/5-(F().phi.length*3)-(D().k.age>=55?10:0))],y:c=>{g.flags.vp.sung=1;g.flags.vp.rank=Math.min(3,g.flags.vp.rank+1);G.later(c,'vp_3',R(6,14),{g:g.id});return `${esc(g.given)} được vua triệu, rồi triệu nữa. Nhà ngoại bắt đầu được người ta để mắt.`+fx(c,{fame:6})},n:c=>{g.flags.vp.sung=0;G.later(c,'vp_3',R(6,14),{g:g.id});return `${esc(g.given)} chưa được vua để ý. Nàng sống trong dãy phòng nhỏ, ngày ngày thêu thùa.`}}]),
vpGate('vp_3','Tranh sủng',(c,d,g)=>{const r=F().phi.filter(p=>p.dead==null&&!p.clan)[0];return `${r?esc(rname(r))+' vốn được vua sủng, thấy '+esc(g.given)+' nổi lên liền ra tay: tin đồn, quà độc, lời tâu với hoàng hậu.':'Trong cung có người thấy '+esc(g.given)+' nổi lên liền ra tay.'}`},
 (c,d,g)=>[{l:'Dặn con nhẫn nhịn, chờ thời',f:c=>{G.later(c,'vp_4',R(8,16),{g:g.id});return `${esc(g.given)} chịu thiệt vài lần, không đáp trả. Hoàng hậu để ý đứa nhỏ biết điều.`+fx(g,{tam:-5})}},
  pay('Nhờ người trong triều che chở cho con',25,{r:[{khau:1,eq:0.7},50],y:c=>{G.later(c,'vp_4',R(8,16),{g:g.id});return `Có người nói giúp trước hoàng hậu. Đòn của đối thủ bị gạt đi.`+fx(c,{money:-m(25),fame:3})},n:c=>{g.flags.vp.sung=0;G.later(c,'vp_4',R(8,16),{g:g.id});return 'Người được nhờ không đủ thế. Đối thủ thắng một hiệp.'+fx(c,{money:-m(25)})}}),
  {l:'Để con tự phản công',r:[{mi:0.7,tri:0.7},45],ax:{gan:1},y:c=>{G.later(c,'vp_4',R(8,16),{g:g.id});return `${esc(g.given)} khéo léo đẩy lỗi về phía kẻ gây hấn. Trong cung bắt đầu kiêng nể.`+fx(c,{fame:4})},n:c=>{g.flags.vp.sung=0;g.flags.vp.rank=Math.max(0,g.flags.vp.rank-1);G.later(c,'vp_4',R(8,16),{g:g.id});return `${esc(g.given)} bị phạt vì dám đối đầu. Hạ một bậc.`+fx(c,{fame:-4,tam:-6})}}]),
vpGate('vp_4','Tin trong cung',(c,d,g)=>g.flags.vp.sung?`Tin vui từ cung: ${esc(g.given)} mang thai.`:`${esc(g.given)} vẫn chưa được vua triệu lần nào. Cung nhân đồn nàng sẽ phải ra khỏi cung khi hết hạn.`,
 (c,d,g)=>g.flags.vp.sung?[{l:'Cầu cho mẹ tròn con vuông',f:c=>{const ph=newPhi(g);const son=chance(0.55);const kid=famKid(son?'tu':'cong',ph);g.flags.vp.kids=(g.flags.vp.kids||0)+1;G.later(c,'vp_5',R(8,14),{g:g.id});return `${esc(g.given)} hạ sinh ${son?'một hoàng tử':'một công chúa'}, tên ${esc(kid.n)}. Nhà ngoại ${son?'bỗng có một cháu ngoại là hoàng tử':'có cháu ngoại là công chúa'}.`+fx(c,{fame:12,tam:10})}}]:[
  {l:'Xin đón con về nếu được',f:c=>{g.left=null;g.leftT=null;G.later(c,'vp_6',R(1,2),{g:g.id});return `Đơn xin cho ${esc(g.given)} xuất cung được nhận. Nàng về nhà sau vài tháng, người gầy, mắt buồn.`+fx(c,{tam:-4})}},
  {l:'Chờ, may còn có cơ hội',f:c=>{G.later(c,'vp_6',R(10,24),{g:g.id});return 'Nhà mình chờ thêm. Cung nhân bảo năm sau sẽ có chọn lại.'}}]),
vpGate('vp_5','Nhà ngoại được ban',(c,d,g)=>`Cháu ngoại của nhà ${N(c)} đã lớn thêm, ${esc(g.given)} được thăng bậc phi. Triều đình xuống chiếu ban thưởng nhà mẹ đẻ. Cùng lúc, trong triều có người bắt đầu gọi nhà mình là "ngoại thích".`,
 (c,d,g)=>[{l:'Nhận thưởng, cảm tạ, giữ phận',f:c=>{G.cf(15,'Nhà ngoại thích');G.grantTitle&&G.grantTitle(c,2);G.alive().filter(p=>G.inClan(p)&&p.job==='quan').forEach(p=>G.qt.add(p,{fav:12,risk:8}));G.later(c,'vp_6',R(80,140),{g:g.id});return 'Nhà mình nhận ơn vua, sống kín tiếng. Quan trong họ được trọng, và cũng bị để mắt hơn.'+fx(c,{money:m(60),fame:25})}},
  {l:'Từ chối ban thưởng quá lớn, xin giảm',f:c=>{G.later(c,'vp_6',R(80,140),{g:g.id});return 'Nhà mình xin nhận ít để tránh tiếng. Triều đình khen biết điều.'+fx(c,{fame:12,money:m(20)})}}]),
vpGate('vp_6','Thế đổi trong cung',(c,d,g)=>{const ph=phiOf(g);return D().newT>=(g.flags.vp.t0||0)&&D().newT>0&&S().t-D().newT<60?`Vua mới lên ngôi. Các phi tần đời trước được xếp lại. ${ph&&g.flags.vp.kids?`${esc(g.given)} có con, được tôn làm thái phi, ở lại cung.`:`${esc(g.given)} không có con, theo lệ phải ra chùa tu hành.`}`:`Nhiều năm đã qua trong cung. ${esc(g.given)} đã ${g.flags.vp.kids?'có chỗ đứng vững nhờ con':'ở lại lặng lẽ, ít ai nhớ'}.`},
 (c,d,g)=>[{l:'Gửi thư thăm hỏi, giữ liên lạc',f:c=>{const ph=phiOf(g);if(g.flags.vp.kids){G.cf(8,'Thái phi nhà ngoại');return `${esc(g.given)} ở cung Thái phi, cháu ngoại lớn lên bên cạnh. Nhà ngoại giữ được chỗ dựa.`+fx(c,{fame:6})}g.left='tuhanh';return `${esc(g.given)} vào chùa, giữ liên lạc bằng thư. Nhà ngoại mất chỗ dựa trong cung.`+fx(c,{tam:-4})}}]),

/* ===================== VƯƠNG PHI: thân vương dạm hỏi ===================== */
FX({id:'vpv_1',t:'Thân vương dạm hỏi',k:'Duyên cung đình',head:1,age:[30,80],pcd:240,w:0.5,fixed:0,
 c:c=>G.alive().some(p=>G.inClan(p)&&p.g==='nữ'&&!p.spouse&&!p.away&&!p.left&&G.age(p)>=16&&G.age(p)<=26)&&F().vuong.some(p=>p.dead==null&&p.met&&p.rel>=20&&p.age<=55),
 x:(c,d)=>{const L=F().vuong.filter(p=>p.dead==null&&p.met&&p.rel>=20&&p.age<=55);const v=L[0];d.v=v&&v.id;const g=G.alive().find(p=>G.inClan(p)&&p.g==='nữ'&&!p.spouse&&!p.away&&!p.left&&G.age(p)>=16&&G.age(p)<=26);d.g=g&&g.id;
  return v&&g?`${esc(rname(v))}, đất phong ${v.land&&G.provN?esc(G.provN(v.land)):'xa'}, nhớ nhà mình từ lần gặp trước, sai người dạm hỏi ${esc(g.given)} làm vương phi. ${v.td==='nghi'?'Nhưng triều đình đang để mắt tới ông ấy.':''}`:'Chuyện cũ.'},
 o:(c,d)=>{const v=d.v?G.fam.person(d.v):null,g=d.g?G.P(d.g):null;if(!v||!g)return [{l:'Thôi',f:c=>''}];return [
  {l:`Gả ${g.given} làm vương phi`,f:c=>{G.marryOut&&G.marryOut(g,{surname:'Nguyễn',given:v.n,fee:m(60),needT:6});g.flags.vuongId=v.id;v.rel=Math.min(100,(v.rel||0)+30);G.cf(10,'Con gái làm vương phi');return `${esc(g.given)} theo xe hoa về đất phong. ${v.td==='nghi'?'Nhà mình không biết rằng triều đình đang theo dõi người rể mới.':'Nhà mình có thêm một chỗ dựa lớn.'}`+fx(c,{fame:15,money:m(40)})}},
  {l:'Từ tạ khéo, chê con còn nhỏ',f:c=>{v.rel=Math.max(-100,(v.rel||0)-8);return 'Thân vương nhận lời từ chối lịch sự, nhưng có lẽ không vui.'}}]}})
];

function clampN(v){return Math.max(8,Math.min(90,Math.round(v)))}
function start(g,rank){g.flags.vp={rank,sung:0,kids:0,t0:G.S().t,phi:null}}
function newPhi(g){const ph=G.fam.ens();const p={id:'fc'+g.id,n:g.given,age:G.age(g),role:'phi',met:1,rel:50,dead:null,sur:G.S().surname,clan:1,gid:g.id};ph.phi.push(p);g.flags.vp.phi=p.id;return p}
function famKid(role,ph){const f=G.fam.ens();f.seq=(f.seq||0)+1;const k={id:'f'+f.seq,n:G.mkGiven(role==='cong'?'nữ':'nam'),age:0,role,met:1,rel:40,dead:null,m:ph.id,tai:R(30,95),duc:R(30,95),clan:1,st:'tu',wed:null};f[role==='cong'?'cong':'tu'].push(k);return k}
});
