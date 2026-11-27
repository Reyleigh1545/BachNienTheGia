/* Bách Niên Thế Gia v6.7.10-d9.12 · VIẾT LẠI CÁC SỰ KIỆN CÓ NGƯỜI VỚI NGƯỜI THẬT (luật R1, R2, R3; kế hoạch d9.12 mục 4, nhóm "người thật").
   Mỗi sự kiện tạo người trong sổ người quen (G.tie.ensure) trước khi hiện hộp, nên hộp có thẻ chân dung (data.npc) và kết quả có hậu sự thật. Bản cũ cùng id đã xóa bằng tools/rmev.js. */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const FM=v=>G.fmtMoney(v);const N=c=>esc(c.given);
const T=d=>d&&d.npc?G.tie.get(d.npc):null;const nm=n=>esc(n?n.n:'người ấy');
const stat=n=>n?['tri','vo','mi','eq'].sort((a,b)=>n.st[b]-n.st[a])[0]:'eq';
const addVai=(n,v)=>{if(!n.vai.includes(v)){n.vai.push(v);n.vaiTxt=n.vai.map(x=>G.tie.VAI[x]||x).join(', ')}};
const gone=()=>[{l:'Thôi',f:()=>''}];
const pay=(l,v,o)=>Object.assign({l:`${l} (${FM(m(v))})`,c:()=>G.money()>=m(v)},o);
const HV={tags:{},k:'Người quen'};
const E=o=>Object.assign({tags:{}},o);
return [
/* ============ Bạn thân hỏi vay: bạn là người thật ============ */
E({id:'v6_ban_vay',t:'Bạn thân hỏi vay',age:[18,90],w:0.9,pcd:120,cd:60,rep:240,
 x:(c,d)=>{const n=G.tie.ensure(c,{key:'ban_'+c.id,vai:'ban_than',age:c.born!=null?G.age(c)+R(-3,3):40,rel:35,why:'bạn thuở nhỏ',tier:Math.max(0,G.tierIdx()-1)});d.npc=n.id;d.why=pick(['mẹ ốm nặng','bị kiện oan','mất mùa trắng tay','con bị bắt lính']);
  return `${nm(n)}, ${n.nghe}, tìm đến mặt mày hốc hác: "Nhà tôi ${d.why}. Cho tôi vay ${FM(m(5))}, sang năm tôi trả."`},
 o:(c,d)=>{const n=T(d);if(!n)return gone();return [
  {l:'Cho vay ngay',ax:{rong:4},c:()=>G.money()>=m(5),f:c=>{if(chance(0.6+Math.min(0.2,(n.rel||0)/300))){G.tie.later(n,c,'tie_ban_nho',R(18,60),{});G.tie.on(n,1);return `Năm sau ${nm(n)} trả đủ, còn kèm quà biếu. Tình bạn càng bền.`+fx(c,{qh:G.tie.rel(n,12,'cho vay, trả đủ'),tam:4,eq:1})}G.tie.oan(n,5);return `${nm(n)} biệt tăm. Mất tiền, mất cả bạn.`+fx(c,{money:-m(5),qh:G.tie.rel(n,-25,'vay không trả'),tam:-6})}},
  {l:'Cho một ít, không cần trả',ax:{rong:3},c:()=>G.money()>=m(2),f:c=>{G.tie.on(n,2);return `${nm(n)} rưng rưng nắm tay, hứa sẽ nhớ.`+fx(c,{money:-m(2),qh:G.tie.rel(n,14,'được cho không'),tam:3,eq:1})}},
  {l:'Từ chối khéo',ax:{rong:-3},r:[{khau:0.6,eq:0.5},40],y:c=>`${nm(n)} hiểu, không giận.`+fx(c,{qh:G.tie.rel(n,-3,'bị từ chối khéo'),tam:-1}),n:c=>{G.tie.oan(n,4);return `${nm(n)} bỏ về, từ đó không nhìn mặt.`+fx(c,{qh:G.tie.rel(n,-22,'bị từ chối phũ'),tam:-5})}}]}}),
/* ============ Quan lớn mời dự tiệc: quý nhân thật, hậu sự thật ============ */
E({id:'c631_quyen_quy_moi',t:'Quan lớn mời dự tiệc',fame:200,age:[30,80],pcd:96,cd:24,
 x:(c,d)=>{const n=G.tie.ensure(c,{key:'quan_tran_thu',vai:['quy_nhan'],tier:5,age:R(45,62),main:'eq',nghe:'quan trấn thủ cả vùng',job:'quan',rel:0,why:'mời dự tiệc'});d.npc=n.id;return `${nm(n)}, quan trấn thủ cả vùng, gửi thiếp mời ${N(c)} dự yến tiệc mừng sinh nhật. Khách khứa toàn bậc quyền quý. Đây là dịp để người ta nhớ tên, hoặc quên tên.`},
 o:(c,d)=>{const n=T(d);if(!n)return gone();return [
  pay('Sắm lễ vật xứng tầm, đến dự',10,{r:[{eq:0.6,khau:0.4},60],y:c=>{addVai(n,'quy_nhan');G.tie.later(n,c,'tie_quy_nhan_giup',R(24,72),{});return `Được xếp ngồi gần chủ tiệc, ${nm(n)} hỏi han thân tình và dặn: "Sau này có việc cứ tìm ta".`+fx(c,{money:-m(10),qh:G.tie.rel(n,28,'được mời ngồi gần'),eq:2,khau:0,cfame:3})},n:c=>`Lỡ lời giữa tiệc, ${nm(n)} nhíu mày.`+fx(c,{money:-m(10),qh:G.tie.rel(n,-4,'lỡ lời giữa tiệc'),tam:-4})}),
  pay('Gửi lễ mừng, cáo bệnh không đến',4,{f:c=>`${nm(n)} hiểu ý, không bận tâm, nhưng cũng không nhớ gì thêm.`+fx(c,{money:-m(4),qh:G.tie.rel(n,5,'gửi lễ mừng')})}),
  {l:'Từ chối khéo',f:c=>{const ex=(c.flags.noPromoUntil||0)>G.S().t||G.S().on<30;return ex?`Lý do chính đáng, ${nm(n)} thông cảm.`+fx(c,{tam:-1}):`${nm(n)} ghi nhận nhà không muốn kết giao.`+fx(c,{qh:G.tie.rel(n,-10,'từ chối thiếp mời'),tam:-1})}}]}}),
/* ============ Khách quý xin trọ: người thật, gặp lại ============ */
E({id:'c631_khach_quy_ghe',t:'Khách quý xin trọ qua đêm',head:1,tier:[3,6],age:[28,75],pcd:96,cd:24,
 x:(c,d)=>{const k=pick([['quan_lon','quan lớn đi sứ',{main:'eq',tier:5}],['thuong_nhan','thương nhân giàu đi buôn xa',{main:'tri',tier:5}],['danh_si','danh sĩ nổi tiếng',{main:'tri',tier:4}]]);d.k=k[0];const n=G.tie.ensure(c,{vai:['khach'],nghe:k[1],tier:k[2].tier,main:k[2].main,age:R(40,66),rel:0,why:'xin trọ một đêm'});d.npc=n.id;return `Chiều muộn, ${nm(n)}, ${k[1]}, cùng đoàn có kiệu có lính hầu ghé cửa nhà ${N(c)} xin trọ qua đêm vì đường xa ngập nước.`},
 o:(c,d)=>{const n=T(d);if(!n)return gone();const later=(mo)=>{addVai(n,d.k==='thuong_nhan'?'thuong_nhan':'quy_nhan');G.tie.later(n,c,'tie_quy_nhan_giup',mo,{})};return [
  pay('Mở tiệc đón tiếp trọng thể',8,{r:[{eq:0.6,khau:0.4},55],y:c=>{later(R(24,84));return `${nm(n)} rất hài lòng, nhắn rằng sẽ nhớ nhà này. Mối quen có giá.`+fx(c,{money:-m(8),qh:G.tie.rel(n,26,'tiếp đãi trọng thể'),cfame:2,eq:1})},n:c=>`${nm(n)} mệt, chỉ ăn qua loa rồi nghỉ. Tiền mất mà chẳng ai nhớ.`+fx(c,{money:-m(8),qh:G.tie.rel(n,3,'tiệc không thành'),tam:-1})}),
  pay('Dọn phòng sạch sẽ, đãi bữa cơm giản dị',3,{f:c=>{if(d.k==='danh_si'||chance(0.35))later(R(30,90));return `${nm(n)} thoải mái hơn là tiệc lớn, sáng ra để lại lời cảm ơn thật lòng.`+fx(c,{money:-m(3),qh:G.tie.rel(n,16,'cơm giản dị chu đáo'),eq:1,tam:2})}}),
  {l:'Chỉ đường sang khách điếm gần đó',f:c=>`${nm(n)} thông cảm, nhưng đoàn đi rồi không để lại ấn tượng gì.`+fx(c,{qh:G.tie.rel(n,1,'chỉ đường')})}]}}),
/* ============ Người xin vào làm ============ */
E({id:'nguoi_xin_lam',t:'Người xin vào làm',fame:150,tier:[2,6],age:[25,90],
 x:(c,d)=>{const sec=pick(['muốn học nghề','đang trốn nợ làng bên','là con rơi của một nhà có thế','chỉ cần cơm ăn áo mặc']);d.sec=sec;const n=G.tie.ensure(c,{vai:['quen'],nghe:'thanh niên quê lên xin làm',age:R(18,26),tier:0,rel:0,why:'xin vào làm'});d.npc=n.id;return `${nm(n)}, một thanh niên quê lên, xin vào làm việc trong nhà ${N(c)}, nói nguyện làm không công để học hỏi.`},
 o:(c,d)=>{const n=T(d);if(!n)return gone();return [
  pay('Nhận, trả công tử tế',3,{f:c=>{n.nghe='người làm trong nhà';addVai(n,'nguoi_lam');G.tie.later(n,c,'tie_nguoi_lam_ve',R(24,84),{sec:d.sec});return `${nm(n)} cúi đầu cảm tạ, bắt tay vào việc ngay. Ghi sổ: người làm mới của nhà.`+fx(c,{money:-m(3),qh:G.tie.rel(n,12,'được nhận làm'),tam:2})}}),
  {l:'Cho cơm ăn đường, bảo đi nơi khác',f:c=>`${nm(n)} nhận lòng tốt rồi lặng lẽ đi tiếp.`+fx(c,{money:-m(1),qh:G.tie.rel(n,4,'được cho cơm'),tam:1})},
  {l:'Từ chối',f:c=>`${nm(n)} đi, không ngoái lại.`}]}}),
E({id:'tie_nguoi_lam_ve',t:'Người làm cũ',fixed:1,k:'Người quen',
 x:(c,d)=>{const n=T(d);return n?`${nm(n)}, người làm đã theo nhà ${N(c)} nhiều năm, ${d.sec==='là con rơi của một nhà có thế'?'hôm nay có người từ nhà quyền quý tìm đến nhận lại con':d.sec==='đang trốn nợ làng bên'?'bị người làng bên tìm đến đòi nợ ngay trước cửa':d.sec==='muốn học nghề'?'đã thạo nghề, xin được ra riêng lập nghiệp':'ngày thường lặng lẽ, hôm nay lại đứng trước mặt xin nói một chuyện'}.`:'Người làm xin gặp.'},
 o:(c,d)=>{const n=T(d);if(!n)return gone();const v=m(8);const s=d.sec;
  if(s==='là con rơi của một nhà có thế')return [
   {l:'Tiễn ra đi với lễ hậu',c:()=>G.money()>=v,f:c=>{addVai(n,'quy_nhan');G.tie.later(n,c,'tie_quy_nhan_giup',R(24,72),{});return `${nm(n)} quay lại nhà cũ, nhưng chẳng quên ơn nuôi dưỡng. Từ nay là chỗ nương tựa quý.`+fx(c,{money:-v,qh:G.tie.rel(n,30,'được tiễn đi tử tế'),cfame:3,eq:2})}},
   {l:'Giữ lại, không cho đi',f:c=>`${nm(n)} nể ơn mà ở lại, nhưng lòng không còn như trước.`+fx(c,{qh:G.tie.rel(n,-20,'bị giữ lại'),tam:-3})}];
  if(s==='đang trốn nợ làng bên')return [
   pay('Trả giùm món nợ',12,{f:c=>`${nm(n)} quỳ xuống tạ ơn, từ đó trung thành tuyệt đối.`+fx(c,{money:-m(12),qh:G.tie.rel(n,35,'được trả giùm nợ'),cfame:2,tam:3})}),
   {l:'Để họ tự giải quyết với nhau',f:c=>{G.tie.oan(n,10);return `${nm(n)} bị đưa đi, nhà mang tiếng bỏ mặc người trong nhà.`+fx(c,{qh:G.tie.rel(n,-30,'bỏ mặc lúc bị đòi nợ'),cfame:-3,tam:-3})}}];
  if(s==='muốn học nghề')return [
   {l:'Cho ra riêng, chỉ vài điều',f:c=>{addVai(n,'ban_than');return `${nm(n)} ra riêng, mở được một chỗ làm ăn nhỏ và không quên ơn.`+fx(c,{money:m(5),qh:G.tie.rel(n,22,'được ra riêng'),eq:1,tam:3})}},
   {l:'Giữ lại thêm vài năm',f:c=>`${nm(n)} tiếp tục làm giỏi hơn nhưng thấy mình chưa có đường ra.`+fx(c,{money:m(3),qh:G.tie.rel(n,-4,'bị giữ lại'),tam:1})}];
  return [
   {l:'Nghe cho hết',f:c=>{const sv=chance(0.6);return sv?`${nm(n)} kể: sáng qua nghe lỏm có kẻ định hại nhà. Nhờ đó nhà kịp tránh một tai họa.`+fx(c,{money:m(15),qh:G.tie.rel(n,24,'báo tin kịp lúc'),eq:2,tam:3}):`${nm(n)} chỉ xin thêm ít lương, lặng lẽ cảm kích.`+fx(c,{money:-m(2),qh:G.tie.rel(n,10,'được tăng công')})}},
   {l:'Bận, hẹn lúc khác',f:c=>`${nm(n)} im lặng lui xuống, lòng chẳng ấm thêm.`+fx(c,{qh:G.tie.rel(n,-6,'không được nghe'),tam:-1})}]}}),
/* ============ Cứu người đuối nước: hậu tạ, ân nhân thật ============ */
E({id:'cuu_nguoi_duoi_nuoc',t:'Người đuối nước',age:[12,70],w:0.6,
 x:(c,d)=>{const nghe=pick(['nhà nông nghèo','nhà thợ khá giả','nhà buôn nhỏ']);const n=G.tie.ensure(c,{vai:['quen'],nghe:'mẹ của đứa trẻ, '+nghe,g:'nữ',age:R(26,40),tier:chance(0.5)?1:2,rel:0,why:'con rơi xuống sông'});d.npc=n.id;return `Một đứa trẻ rơi xuống khúc sông chảy xiết, ${nm(n)}, mẹ nó, gào khóc trên bờ.`},
 o:(c,d)=>{const n=T(d);if(!n)return gone();const tha=()=>{addVai(n,'an_nhan');G.tie.later(n,c,'tie_an_nhan_tra',R(36,150),{})};return [
  {l:'Nhảy xuống cứu',r:[{suc:1,vo:0.6},55],y:c=>{tha();return `Cứu được đứa bé. ${nm(n)} quỳ giữa bờ sông, lễ tạ ngay bằng gạo và một ít tiền, cả làng khen.`+fx(c,{money:m(3),qh:G.tie.rel(n,40,'cứu con'),fame:R(6,10),tam:8,eq:1})},n:c=>{tha();return `Cứu được đứa bé nhưng bản thân va vào đá. ${nm(n)} khóc tạ, hứa nhớ ơn đời đời.`+fx(c,{qh:G.tie.rel(n,40,'cứu con, bị thương'),fame:6,suc:-R(15,25),hpMax:-R(0,2)})}},
  {l:'Ném sào, hô người',r:[{tri:0.8,eq:0.4},45],y:c=>{tha();return `Kéo được lên kịp nhờ cây sào và tiếng hô. ${nm(n)} cúi lạy tạ ơn.`+fx(c,{money:m(1),qh:G.tie.rel(n,26,'kéo con lên kịp'),fame:3})},n:c=>`Không kịp... ${nm(n)} ngã quỵ trên bờ. Nhà mình mang nặng nỗi day dứt.`+fx(c,{tam:-10,qh:G.tie.rel(n,-4,'không cứu kịp')})}]}}),
/* ============ Tiến cử thuộc hạ (quân ngũ) ============ */
E({id:'qn653_tien_cu',t:'Tiến cử thuộc hạ',job:['quan_ngu'],lvr:[5,7],cd:36,
 x:(c,d)=>{const a=G.tie.ensure(c,{vai:['thuoc_ha'],nghe:'thuộc hạ tài giỏi nhưng ngạo mạn',age:R(28,40),main:'vo',rel:0,why:'ứng viên tiến cử',key:'tn_'+G.S().t+'_a'});const b=G.tie.ensure(c,{vai:['thuoc_ha'],nghe:'thuộc hạ hiền lành, trung thành',age:R(30,46),main:'eq',rel:10,why:'ứng viên tiến cử',key:'tn_'+G.S().t+'_b'});a.st.eq=Math.min(a.st.eq,40);d.npc=[a.id,b.id];d.a=a.id;d.b=b.id;
  return `Triều đình cho phép ${N(c)} tiến cử một người trong dưới trướng lên chức cao hơn. Hai người đều có công: ${nm(a)}, ${a.nghe}, và ${nm(b)}, ${b.nghe}.`},
 o:(c,d)=>{const a=G.tie.get(d.a),b=G.tie.get(d.b);if(!a||!b)return gone();return [
  {l:`Tiến cử ${a.n}`,f:c=>{G.tie.later(a,c,'tie_thuoc_ha',R(24,72),{});return `${nm(a)} lên chức, làm nên việc lớn, nhưng chẳng tỏ ra nhớ ơn.`+fx(c,{merit:R(8,14),qh:[[a.n,G.tie.rel(a,10,'được tiến cử')[1]],[b.n,G.tie.rel(b,-12,'không được chọn')[1]]],fame:2})}},
  {l:`Tiến cử ${b.n}`,f:c=>{G.tie.later(b,c,'tie_thuoc_ha',R(24,72),{});return `${nm(b)} một lòng trung thành với mình, ${nm(a)} thì quay lưng.`+fx(c,{qh:[[b.n,G.tie.rel(b,24,'được tiến cử')[1]],[a.n,G.tie.rel(a,-18,'bị bỏ qua')[1]]],eq:1,fame:2})}}]}}),
E({id:'tie_thuoc_ha',t:'Thuộc hạ cũ',fixed:1,k:'Người quen',
 x:(c,d)=>{const n=T(d);return n?`${nm(n)}, thuộc hạ năm xưa nhà ${N(c)} đã tiến cử, ${n.st.eq>=55?'sai người mang thư đến: ông nhớ ơn và có việc báo':'nay ở vị trí có thể gây khó hoặc giúp đỡ'}.`:'Thuộc hạ cũ liên lạc.'},
 o:(c,d)=>{const n=T(d);if(!n)return gone();const loyal=(n.rel||0)>=15&&n.st.eq>=45;return loyal?[
  {l:'Nhờ ông giúp một việc',f:c=>`${nm(n)} giúp hết lòng: chuyển một lời tới thượng quan, việc xin xét của nhà thuận lợi hơn.`+fx(c,{merit:R(10,20),fav:3,qh:G.tie.rel(n,6,'giúp việc'),tam:3})},
  {l:'Chỉ hỏi thăm, không nhờ',f:c=>`${nm(n)} càng kính trọng. Chuyện này người trong doanh sẽ nhớ.`+fx(c,{qh:G.tie.rel(n,12,'không nhờ vả'),eq:2})}]:[
  {l:'Giữ khoảng cách, đề phòng',f:c=>`${nm(n)} không làm gì, chỉ tranh công trong báo cáo.`+fx(c,{merit:-4,qh:G.tie.rel(n,-6,'giữ khoảng cách'),tam:-2})},
  {l:'Nhắc lại ơn tiến cử',r:[{eq:0.8,khau:0.4},40],y:c=>`${nm(n)} hơi ngượng, hứa sẽ ghi nhớ.`+fx(c,{qh:G.tie.rel(n,14,'được nhắc ơn'),eq:1}),n:c=>`${nm(n)} cười nhạt: "Ơn đã trả rồi". Quan hệ rạn thêm.`+fx(c,{qh:G.tie.rel(n,-12,'bị nhắc ơn'),tam:-3})}]}}),
/* ============ Kết nghĩa với nhà bên ============ */
E({id:'kn_ket_nghia',t:'Nhà bên ngỏ ý kết nghĩa',k:'Kỳ ngộ',cyc:[25,45],tier:[1,6],age:[28,80],ky:1,good:1,u:'clan',pcd:200,w:1,head:1,
 x:(c,d)=>{const n=G.tie.ensure(c,{vai:['lang_gieng'],nghe:'gia chủ nhà láng giềng bên kia con sông',age:R(35,60),tier:G.tierIdx(),main:'eq',rel:20,why:'ngỏ ý kết nghĩa',key:'kn_lang_gieng'});d.npc=n.id;return `${nm(n)}, nhà láng giềng bên kia con sông qua lại với ${N(c)} đã lâu, nay ngỏ ý hai nhà kết nghĩa anh em, con cháu gọi nhau theo vai vế, có việc thì giúp trước. Kết nghĩa là có nghĩa vụ hai chiều: giúp thì được giúp, bỏ mặc thì mang tiếng.`},
 o:(c,d)=>{const n=T(d);if(!n)return gone();return [
  pay('Nhận lời, làm lễ kết nghĩa',4,{r:[{eq:1,duyen:0.5},65],y:c=>{addVai(n,'ket_nghia');G.tie.later(n,c,'tie_ket_nghia_giup',R(12,36),{});return `Hai nhà thành người một họ. Mùa gặt đổi công, đám cưới đều có nhau, hoạn nạn thì giúp trước.`+fx(c,{money:-m(4),qh:G.tie.rel(n,38,'kết nghĩa'),cfame:4,on:2,tam:4})},n:c=>{addVai(n,'ket_nghia');G.tie.later(n,c,'tie_ket_nghia_giup',R(10,30),{});return `Lễ xong mới biết nhà kia thích nhờ vả hơn là giúp. Nhưng đã trót.`+fx(c,{money:-m(4),qh:G.tie.rel(n,12,'kết nghĩa không thuận'),tam:-3})}}),
  {l:'Nhận lời nhưng không làm lễ, giữ ở mức thân hữu',f:c=>`Hai nhà vẫn qua lại, nhưng không ai bị ràng buộc.`+fx(c,{qh:G.tie.rel(n,15,'thân hữu'),cfame:1,tam:2})},
  {l:'Từ chối khéo',f:c=>`${nm(n)} hơi buồn nhưng không giận.`+fx(c,{qh:G.tie.rel(n,-4,'từ chối kết nghĩa'),tam:-1})}]}}),
/* ============ Ẩn sĩ trong núi (tiều phu) ============ */
E({id:'tp_an_si',t:'Ẩn sĩ trong núi',job:['tieuphu'],once:1,
 x:(c,d)=>{const n=G.tie.ensure(c,{vai:['an_si'],nghe:'ông già ở túp lều tranh trong núi',age:R(60,78),main:'tri',tier:1,rel:5,why:'gặp trong núi'});d.npc=n.id;return `Lạc đường, ${N(c)} gặp một túp lều tranh. ${nm(n)}, ông già trong đó, mời uống trà, nói chuyện thiên văn địa lý.`},
 o:(c,d)=>{const n=T(d);if(!n)return gone();return [
  {l:'Ở lại học hỏi vài hôm',f:c=>{G.tie.later(n,c,'tie_cao_nhan_ve',R(60,140),{});return `${nm(n)} giảng suốt mấy đêm, từ cách xem trời đến cách nhìn người. Một con đường mới mở ra trong đầu.`+fx(c,{tri:6,eq:3,qh:G.tie.rel(n,20,'ở lại học hỏi'),tam:5})}},
  {l:'Xin ông chỉ vài điều rồi xin chỉ đường về',f:c=>`${nm(n)} dặn vài câu đáng giá về rừng và thú.`+fx(c,{tri:2,qh:G.tie.rel(n,6,'hỏi đường'),tam:2})}]}})
];
});
