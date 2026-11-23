/* Bách Niên Thế Gia v6.7.10-d9.12 · NỘI DUNG MỚI, PHẦN 3.
   (1) Cốt truyện mục tiêu dài "Dựng nhà học cho dòng họ" hd_* (6 bước, thầy đồ là người thật, kết nhỏ rồi kết lớn sau nhiều năm);
   (2) Chuỗi kỳ ngộ "Thanh kiếm rỉ" kiem_* (3 bước);
   (3) Cốt truyện ngắn "Người bạn già" bg_* (3 bước, kết nhỏ).
   Người xuất hiện đều là người thật (sổ người quen), mỗi bước có hậu sự và ngã rẽ khác nhau. */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const FM=v=>G.fmtMoney(v);const N=c=>esc(c.given);
const T=d=>d&&d.npc?G.tie.get(d.npc):null;const nm=n=>esc(n?n.n:'người ấy');
const addVai=(n,v)=>{if(n&&!n.vai.includes(v)){n.vai.push(v);n.vaiTxt=n.vai.map(x=>G.tie.VAI[x]||x).join(', ')}};
const pay=(l,v,o)=>Object.assign({l:`${l} (${FM(m(v))})`,c:()=>G.money()>=m(v)},o);
const E=o=>Object.assign({tags:{}},o);
const FX=o=>Object.assign({tags:{},fixed:1},o);
const hf=c=>{c.flags=c.flags||{};return c.flags};
const later=(c,id,lo,hi,d)=>G.later(c,id,R(lo,hi),d||{});
const gone=()=>[{l:'Thôi',f:()=>''}];
const kids=(c,lo,hi)=>G.kinList(c,p=>G.age(p)>=lo&&G.age(p)<=hi&&p.dead==null);
return [
/* ============ DỰNG NHÀ HỌC CHO DÒNG HỌ ============ */
E({id:'hd_y_dinh',t:'Ý định dựng nhà học',k:'Mục tiêu gia tộc',head:1,age:[35,75],tier:[2,6],once:1,w:1.1,pcd:600,c:c=>kids(c,4,14).length>=2&&G.money()>=m(40),
 x:(c,d)=>{const n=G.tie.ensure(c,{key:'thay_do_hd',vai:['thay'],nghe:'thầy đồ nghèo mà giỏi chữ, đang dạy chui ở làng bên',age:R(40,62),main:'tri',st:{tri:R(70,92),eq:R(55,80)},tier:1,rel:4,why:'được nhắc làm thầy nhà học'});d.npc=n.id;hf(c).hd={st:1,sc:0,npc:n.id};return `Trong nhà đã có mấy đứa tới tuổi đi học, ${N(c)} nghĩ đến chuyện dựng một nhà học riêng cho dòng họ thay vì gửi từng đứa đi xa. Nghe nói ${nm(n)}, ${esc(n.nghe)}, có thể mời về. Việc này tốn tiền và phải mất nhiều năm mới thấy kết quả.`},
 o:(c,d)=>{const n=T(d);if(!n)return gone();const f=hf(c).hd;return [
  pay('Dựng nhà học ngay trong khuôn viên, mời thầy đồ về ở',35,{f:c=>{f.sc+=2;G.tie.rel(n,15,'được mời làm thầy');later(c,'hd_b',3,6,{npc:n.id,site:'nha'});return `Gian nhà ngang được sửa làm lớp học, đặt bàn ghế, giá sách. ${nm(n)} nhận lời, hẹn đầu mùa tới.`+fx(c,{money:-m(35),tri:1,eq:1,tam:4,qh:[n.n,15]})}}),
  pay('Thuê nhà ở đầu làng làm lớp học, nhận cả con em láng giềng',20,{f:c=>{f.sc+=1;G.tie.rel(n,10,'được mời làm thầy');later(c,'hd_b',3,6,{npc:n.id,site:'lang'});return `Lớp mở ở đầu làng, láng giềng được gửi con vào học thêm. Tiếng tốt lan ra nhưng cũng có kẻ xì xào.`+fx(c,{money:-m(20),cfame:2,eq:1,tam:3,qh:[n.n,10]})}}),
  {l:'Hoãn lại, đợi nhà dư giả hơn',f:c=>{hf(c).hd=null;return `${N(c)} gác ý định. Nhà học chưa mở được lần này.`+fx(c,{tam:-1})}}]}}),
FX({id:'hd_b',t:'Mời được thầy về',k:'Mục tiêu gia tộc',head:1,
 x:(c,d)=>{const n=T(d);return `${nm(n)} đã về. ${d.site==='nha'?'Lớp học trong nhà':'Lớp học đầu làng'} bắt đầu với vài đứa trẻ. Qua mấy tuần ${nm(n)} đề nghị: muốn dạy hết sức thì phải có sách vở đủ, và phải được tự quyết cách dạy.`},
 o:(c,d)=>{const n=T(d);if(!n)return gone();const f=hf(c).hd||{sc:0};return [
  pay('Mua đủ bộ sách, giao toàn quyền cách dạy cho thầy',25,{f:c=>{f.sc+=2;G.tie.rel(n,16,'được tin tưởng giao quyền dạy');later(c,'hd_c',6,12,{npc:n.id,site:d.site,free:1});return `${nm(n)} dạy theo ý mình, hết lòng với từng đứa. Học trò tiến bộ rõ.`+fx(c,{money:-m(25),tri:1,tam:3,qh:[n.n,16]})}}),
  {l:'Đề nghị thầy theo giáo trình có sẵn, chủ nhà giám sát',f:c=>{f.sc+=0;G.tie.rel(n,-6,'bị giám sát');later(c,'hd_c',6,12,{npc:n.id,site:d.site,free:0});return `Thầy chấp nhận, nhưng sự nhiệt huyết giảm đi. Lớp học dạy đúng bài, không hơn.`+fx(c,{tam:0,qh:[n.n,-6]})}},
  {l:'Cho thầy dạy cả con em láng giềng nghèo miễn phí',c:()=>G.money()>=m(10),f:c=>{f.sc+=1;G.tie.rel(n,12,'dạy trẻ nghèo');later(c,'hd_c',6,12,{npc:n.id,site:d.site,free:1,poor:1});return `Cổng lớp mở rộng, mấy đứa trẻ nghèo ngồi cuối lớp. ${nm(n)} nhìn nhà mình với ánh mắt khác.`+fx(c,{money:-m(10),cfame:3,eq:2,tam:4,qh:[n.n,12]})}}]}}),
FX({id:'hd_c',t:'Biến cố trong lớp học',k:'Mục tiêu gia tộc',head:1,
 x:(c,d)=>{const n=T(d);const sick=chance(0.5);d.sick=sick;return sick?`Giữa mùa học, ${nm(n)} đổ bệnh nặng, lớp học phải tạm nghỉ. Mấy đứa trẻ chạy nhà này nhà kia. Cần quyết nhanh để lớp không tan.`:`Có người trong họ phản đối, bảo "tốn của vô ích", đòi đưa trẻ về làm ruộng. ${nm(n)} lo lắng vì nếu không có học trò thì lớp phải đóng.`},
 o:(c,d)=>{const n=T(d);if(!n)return gone();const f=hf(c).hd||{sc:0};return d.sick?[
  pay('Mời thầy lang giỏi chữa chạy cho thầy đồ',12,{r:[{eq:0.5,tri:0.3},75],y:c=>{G.tie.rel(n,20,'được chữa bệnh');addVai(n,'an_nhan');f.sc+=2;later(c,'hd_d',12,24,{npc:n.id,free:d.free});return `${nm(n)} khỏi bệnh, quay lại dạy, nhớ ơn nhà. Học trò thân với thầy hơn.`+fx(c,{money:-m(12),eq:2,tam:4,qh:[n.n,20]})},n:c=>{G.tie.rel(n,8,'cố chữa nhưng bệnh dai dẳng');later(c,'hd_d',12,24,{npc:n.id,free:d.free,weak:1});return `Thầy khỏi chậm, lớp nghỉ hơn tháng. Một vài đứa nản.`+fx(c,{money:-m(12),tam:-2,qh:[n.n,8]})}}),
  {l:'Nhờ một người nhà biết chữ thay thầy dạy tạm',c:c=>kids(c,16,50).some(p=>p.tri>=55),go:(c,d2)=>G.pickKin(c,{eyebrow:'Mục tiêu gia tộc',title:'Ai dạy thay',text:'Người được chọn thay thầy dạy tạm. Người dạy càng giỏi, lớp càng giữ được nền nếp.',filter:p=>G.age(p)>=16&&G.age(p)<=50&&p.tri>=55,cb:w=>{f.sc+=1;later(c,'hd_d',12,24,{npc:n.id,free:d.free});return `${esc(w.given)} đứng lớp thay mấy tuần, dạy dè dặt nhưng giữ được lớp.`+fx(w,{tri:R(1,3),eq:2,tam:3})+fx(c,{tam:1})}})},
  {l:'Cho lớp nghỉ, đợi thầy khỏe lại',f:c=>{f.sc-=1;later(c,'hd_d',12,24,{npc:n.id,free:d.free,weak:1});return `Lớp nghỉ lâu, vài đứa quen thói đi chơi.`+fx(c,{tam:-2})}}]:[
  {l:'Họp họ, nói rõ lợi ích của việc học, xin mọi người thuận',r:[{eq:0.8,khau:0.5,tri:0.3},55],y:c=>{f.sc+=2;later(c,'hd_d',12,24,{npc:n.id,free:d.free});return `Họp họ xong, nhiều người ngầm đồng ý: chữ nghĩa là tài sản không ai lấy được.`+fx(c,{eq:3,cfame:2,tam:4})},n:c=>{f.sc-=1;later(c,'hd_d',12,24,{npc:n.id,free:d.free,weak:1});return `Cuộc họp sôi nổi, vài hộ rút con khỏi lớp.`+fx(c,{tam:-4,cfame:-1})}},
  pay('Cấp một khoản "tiền ăn học" cho các nhà có con đi học, xóa bớt lo ngại',20,{f:c=>{f.sc+=1;later(c,'hd_d',12,24,{npc:n.id,free:d.free});return `Khoản trợ cấp khiến mọi người yên lòng. Không còn ai đòi rút con.`+fx(c,{money:-m(20),cfame:2,tam:3})}}),
  {l:'Mặc kệ, ai muốn rút thì rút',f:c=>{f.sc-=2;later(c,'hd_d',12,24,{npc:n.id,free:d.free,weak:1});return `Lớp vơi dần học trò, thầy buồn.`+fx(c,{tam:-3})}}]}}),
FX({id:'hd_d',t:'Kết quả sau mấy năm',k:'Mục tiêu gia tộc',head:1,
 x:(c,d)=>{const n=T(d);const f=hf(c).hd||{sc:0};d.sc=f.sc;const L=kids(c,8,22);return `Đã mấy năm. ${f.sc>=4?'Lớp học nổi tiếng trong vùng, học trò viết chữ đẹp, nhớ sách giỏi.':f.sc>=1?'Lớp học đều đặn, vài đứa tiến bộ vượt bậc.':'Lớp học chỉ còn lèo tèo vài đứa, thầy mệt mỏi.'} ${nm(n)} muốn bàn về tương lai: ${L.length?`có ${L.length} đứa trẻ trong họ đủ tuổi để đi thi hoặc theo học thêm ở xa.`:'không còn nhiều trẻ trong nhà.'}`},
 o:(c,d)=>{const n=T(d);if(!n)return gone();const f=hf(c).hd||{sc:0};const L=kids(c,8,22);return [
  pay('Gửi hai đứa giỏi nhất đi theo học ở trường lớn trên phủ',45,{c:()=>G.money()>=m(45)&&L.length>0,f:c=>{f.sc+=2;L.slice().sort((a,b)=>b.tri-a.tri).slice(0,2).forEach(p=>{G.addStat(p,'tri',R(3,6));G.addStat(p,'eq',1)});later(c,'hd_e',60,120,{npc:n.id,sc:f.sc});return `Hai đứa giỏi nhất lên phủ học. Nhà vắng bóng trẻ nhưng mọi người mong kết quả.`+fx(c,{money:-m(45),tam:3,cfame:2})}}),
  {l:'Giữ trẻ lại học tiếp với thầy, nâng cấp lớp thành nhà học chính thức',c:()=>G.money()>=m(20),f:c=>{f.sc+=1;L.forEach(p=>{if(G.age(p)<=16)G.addStat(p,'tri',R(1,3))});addVai(n,'thay');later(c,'hd_e',60,120,{npc:n.id,sc:f.sc});return `Lớp học được đặt bảng, thêm tên "Nhà học họ ${esc(S().surname)}". Thầy đồ vui vẻ hơn hẳn.`+fx(c,{money:-m(20),cfame:3,eq:1,tam:4,qh:[n.n,10]})}},
  {l:'Cám ơn thầy, cho nghỉ dạy, nhà thôi mở lớp',f:c=>{hf(c).hd=null;G.tie.rel(n,-4,'lớp học đóng');return `Nhà học đóng cửa. Những gì đã gieo thì vẫn còn trong từng đứa trẻ.`+fx(c,{tam:-2,qh:[n.n,-4]})}}]}}),
FX({id:'hd_e',t:'Học trò thành danh',k:'Mục tiêu gia tộc',head:1,
 x:(c,d)=>{const n=T(d);const L=kids(c,18,50).filter(p=>p.tri>=60).sort((a,b)=>b.tri-a.tri);d.w=L.length?L[0].id:null;const w=d.w?G.P(d.w):null;return w?`Nhiều năm sau, ${esc(w.given)}, người từng học ở nhà học ngày ấy, ${d.sc>=4?'đỗ đạt hiển vinh, được cả vùng nể phục':'có tiếng là người học rộng trong họ'}. Tin về đến tai ${nm(n)}, lúc này tuổi đã già.`:`Nhiều năm đã qua. Nhà học đã tạo ra nhiều người biết chữ nhưng chưa ai nổi bật. ${nm(n)} vẫn nhớ những năm dạy học ấy.`},
 o:(c,d)=>{const n=T(d);const w=d.w?G.P(d.w):null;return [
  {l:`${w?'Mời '+esc(w.given)+' về làm giỗ đầu cho thầy đồ, dựng bia nhà học':'Dựng bia ghi tên nhà học và thầy đồ trong khuôn viên'}`,f:c=>{if(n)G.tie.rel(n,20,'được tạc bia');const big=w&&d.sc>=4;if(big)G.cf(8,'Nhà học họ '+S().surname+' sinh ra người thành danh');return `Tấm bia dựng lên, ghi tên người dạy và học trò. ${big?'Cả vùng đến xem, truyền tai nhau câu chuyện nhà học.':'Người trong họ thắp hương trước bia vào mỗi dịp tết.'}`+fx(c,{cfame:big?R(8,14):R(3,6),eq:2,tri:1,tam:8})+(w?fx(w,{eq:2,tam:6}):'')+(n?fx(c,{qh:[n.n,20]}):'')}},
  {l:'Cúng giỗ đơn giản, không phô trương',f:c=>`Nhà học được nhắc nhớ lặng lẽ. Không ai nói gì, nhưng người biết thì biết.`+fx(c,{eq:1,tam:3,cfame:1})}]}}),
/* ============ KỲ NGỘ: THANH KIẾM RỈ ============ */
E({id:'kiem_1',t:'Thanh kiếm rỉ dưới gốc cây',k:'Kỳ ngộ',ky:1,good:1,u:'person',age:[14,70],w:0.45,pcd:300,c:c=>c.vo>=30,
 x:(c,d)=>`Sau cơn mưa lớn, nước cuốn trôi lớp đất dưới gốc cây cổ thụ đầu làng, lộ ra một thanh kiếm rỉ sét cắm nghiêng. ${N(c)} đi ngang, nhìn thấy trước ai hết.`,
 o:(c,d)=>[
  {l:'Nhặt kiếm, mang về cất kỹ',f:c=>{later(c,'kiem_2',3,8,{});return `Thanh kiếm nặng, vỏ rỉ nâu, trên chuôi có dấu khắc mờ mờ. ${N(c)} lau chùi cất dưới giường.`+fx(c,{vo:1,tam:3})}},
  {l:'Báo lý trưởng, giao cho làng quyết',f:c=>{G.tie.ensure(c,{key:'ly_truong_kiem',vai:['huong_truong'],nghe:'lý trưởng',age:R(45,65),tier:1,rel:8,why:'báo nhặt kiếm'});return `Lý trưởng nhận kiếm, ghi sổ, khen ${N(c)} thật thà. Thanh kiếm được treo ở đình làng.`+fx(c,{cfame:2,eq:1,tam:2})}}]}),
FX({id:'kiem_2',t:'Dấu khắc trên chuôi kiếm',k:'Kỳ ngộ',ky:1,good:1,
 x:(c,d)=>{const n=G.tie.ensure(c,{key:'tho_ren_kiem',vai:['thay'],nghe:'thợ rèn già, từng nổi danh trong vùng',age:R(55,75),main:'vo',tier:1,rel:2,why:'xem thanh kiếm'});d.npc=n.id;return `Mấy tháng sau, ${N(c)} đem thanh kiếm đến cho ${nm(n)}, ${esc(n.nghe)}, nhờ xem dấu khắc. Ông chăm chú nhìn rất lâu rồi nói: "Đây là kiếm của một võ quan đã mất tích ở trận ải xưa. Tôi chữa lại được, nhưng thép đã yếu".`},
 o:(c,d)=>{const n=T(d);if(!n)return gone();return [
  pay('Nhờ ông rèn lại, làm mới mà giữ phần cốt thép cũ',18,{r:[{tri:0.4,vo:0.3},68],y:c=>{G.tie.rel(n,16,'rèn lại thanh kiếm');later(c,'kiem_3',6,18,{npc:n.id,ok:1});return `Kiếm được rèn lại, ánh thép sáng lạnh, vẫn còn dấu khắc cũ. ${nm(n)} nhận tiền công và dặn: "Đừng để nó nằm im".`+fx(c,{money:-m(18),vo:R(2,4),tam:4,qh:[n.n,16]})},n:c=>{G.tie.rel(n,6,'rèn hỏng lưỡi');later(c,'kiem_3',6,18,{npc:n.id,ok:0});return `Lưỡi kiếm nứt khi rèn lại. ${nm(n)} áy náy, không nhận tiền công.`+fx(c,{money:-m(6),tam:-4,qh:[n.n,6]})}}),
  {l:'Học nghề đúc kiếm từ ông, đổi lấy công làm phụ',r:[{vo:0.5,tri:0.4,suc:0.4},52],y:c=>{G.tie.rel(n,22,'xin học nghề đúc kiếm');addVai(n,'thay');later(c,'kiem_3',6,18,{npc:n.id,ok:1,hoc:1});return `Mấy tháng làm phụ lò rèn, ${N(c)} học được cách thử thép, nhận lửa. ${nm(n)} nhận làm thầy dạy thêm.`+fx(c,{vo:R(3,5),tri:1,suc:-3,tam:5,qh:[n.n,22]})},n:c=>{later(c,'kiem_3',6,18,{npc:n.id,ok:0});return `Bàn tay quen cầm bút/cuốc chưa quen búa. Ông cười, bảo đợi khi nào khỏe hơn.`+fx(c,{suc:-4,tam:-2})}},
  {l:'Giữ nguyên, không rèn lại',f:c=>{later(c,'kiem_3',6,18,{npc:n.id,ok:0,raw:1});return `Thanh kiếm vẫn rỉ, nhưng có kỷ niệm.`+fx(c,{tam:1})}}]}}),
FX({id:'kiem_3',t:'Người đến nhận lại thanh kiếm',k:'Kỳ ngộ',ky:1,good:1,
 x:(c,d)=>{const n=T(d);const who=G.tie.ensure(c,{key:'chau_vo_quan',vai:['khach'],nghe:'một võ quan trẻ, cháu của người từng giữ thanh kiếm',age:R(28,40),main:'vo',st:{vo:R(65,88)},tier:3,rel:0,why:'đến nhận lại kiếm'});d.who=who.id;return `Tin về thanh kiếm lan ra. ${nm(who)}, ${esc(who.nghe)}, tìm đến tận nhà ${N(c)}: ông tin đây chính là kiếm của bác mình, người mất tích nhiều năm. Ông xin xem dấu khắc.`},
 o:(c,d)=>{const who=G.tie.get(d.who);if(!who)return gone();return [
  {l:'Trả lại thanh kiếm cho gia đình người xưa',f:c=>{G.tie.rel(who,30,'được trả lại kiếm');addVai(who,'quy_nhan');G.tie.later(who,c,'tie_quy_nhan_giup',R(24,60),{});return `${nm(who)} quỳ nhận kiếm, mắt đỏ hoe. Ông dập đầu cảm ơn và để lại một túi bạc cùng lời hứa: "Khi nào nhà cần, ông xin đền ơn".`+fx(c,{money:m(R(30,50)),cfame:R(5,8),eq:3,tam:8,qh:[who.n,30]})}},
  {l:'Đề nghị đổi: mình giữ thanh kiếm, ông nhận một khoản bù đắp',r:[{khau:0.6,eq:0.5},45],y:c=>{G.tie.rel(who,6,'đồng ý đổi lấy tiền');return `Ông suy nghĩ rồi đồng ý, trả đủ số tiền xứng đáng. Hai bên chia tay lịch sự.`+fx(c,{money:m(R(50,90)),vo:R(1,2),tam:3,qh:[who.n,6]})},n:c=>{G.tie.rel(who,-20,'đòi tiền chuộc');return `${nm(who)} trầm mặt, bảo "kiếm của người đã chết không phải thứ để mặc cả". Ông lặng lẽ ra về.`+fx(c,{fame:-2,eq:-1,tam:-5,qh:[who.n,-20]})}},
  {l:'Giữ thanh kiếm, nói chưa đủ bằng chứng',f:c=>{G.tie.rel(who,-12,'nghi ngờ lời nói');return `${nm(who)} không tranh luận, chỉ để lại tên rồi đi. Thanh kiếm vẫn ở đó.`+fx(c,{vo:1,tam:-2,qh:[who.n,-12]})}}]}}),
/* ============ CỐT TRUYỆN NGẮN: NGƯỜI BẠN GIÀ ============ */
E({id:'bg_1',t:'Người bạn già lâm bệnh',k:'Tình nghĩa',head:1,age:[45,85],w:1.0,pcd:480,once:1,
 x:(c,d)=>{const n=G.tie.ensure(c,{key:'ban_gia',vai:['ban_than'],nghe:'người bạn tri kỷ từ thuở trẻ',age:Math.max(40,G.age(c)+R(-5,6)),main:'eq',tier:Math.max(1,G.tierIdx()-1),rel:55,why:'bạn cũ lâu năm'});d.npc=n.id;return `${nm(n)}, ${esc(n.nghe)}, gửi thư báo bệnh nặng, xin gặp một lần. Đường đi xa, ${N(c)} cũng đã lớn tuổi.`},
 o:(c,d)=>{const n=T(d);if(!n)return gone();return [
  {l:'Lập tức lên đường thăm bạn',f:c=>{G.tie.rel(n,22,'đến thăm lúc bệnh');later(c,'bg_2',2,4,{npc:n.id,went:1});return `Đường xa mệt nhọc nhưng ${N(c)} tới kịp. Hai ông bạn già ngồi bên nhau cả đêm nhắc chuyện cũ.`+fx(c,{money:-m(6),suc:-3,eq:3,tam:5,qh:[n.n,22]})}},
  pay('Gửi thuốc quý và thư, hứa sẽ đi khi khỏe',12,{f:c=>{G.tie.rel(n,8,'gửi thuốc và thư');later(c,'bg_2',2,4,{npc:n.id,went:0});return `Thuốc và thư lên đường. ${nm(n)} nhận trong niềm biết ơn pha chút tiếc.`+fx(c,{money:-m(12),tam:-1,qh:[n.n,8]})}}),
  {l:'Chỉ viết thư thăm hỏi, không đi',f:c=>{G.tie.rel(n,-12,'chỉ gửi thư');later(c,'bg_2',2,4,{npc:n.id,went:0,cold:1});return `Thư đi. Trong lòng ${N(c)} cứ day dứt.`+fx(c,{tam:-4,qh:[n.n,-12]})}}]}}),
FX({id:'bg_2',t:'Lời cuối của bạn',k:'Tình nghĩa',head:1,
 x:(c,d)=>{const n=T(d);return d.went?`${nm(n)} nắm tay ${N(c)}: "Có một việc tôi chưa dám nhờ ai. Con tôi mồ côi mẹ từ nhỏ, tôi không yên tâm để nó một mình sau khi tôi nhắm mắt".`:`Tin từ nhà ${nm(n)}: ông ${d.cold?'đã mất, chỉ kịp nhắc tên':'vẫn nằm liệt, yếu đi từng ngày, hỏi thăm người bạn xưa'}. Con trai ông viết thư, giọng bối rối, xin giúp đỡ.`},
 o:(c,d)=>{const n=T(d);if(!n)return gone();return [
  {l:'Nhận lời chăm sóc con ông như con mình',f:c=>{G.tie.rel(n,25,'nhận lời lo cho con');addVai(n,'an_nhan');later(c,'bg_3',24,60,{npc:n.id,took:1});return `${nm(n)} thở nhẹ, nhắm mắt. ${N(c)} giữ lời, gánh thêm một trách nhiệm.`+fx(c,{money:-m(8),eq:3,cfame:3,tam:5,qh:[n.n,25]})}},
  pay('Gửi một khoản giúp con ông tự lập, không nhận nuôi',20,{f:c=>{G.tie.rel(n,10,'giúp khoản tự lập');later(c,'bg_3',24,60,{npc:n.id,took:0});return `Khoản tiền đủ để người con mở một cửa hàng nhỏ. ${nm(n)} cười hiền cảm ơn.`+fx(c,{money:-m(20),eq:1,cfame:1,tam:2,qh:[n.n,10]})}}),
  {l:'Nói thật nhà mình cũng khó, xin chịu',f:c=>{G.tie.rel(n,-10,'từ chối giúp con');later(c,'bg_3',24,60,{npc:n.id,took:0,refused:1});return `Bạn im lặng một lúc rồi nói: "Tôi hiểu". Câu "tôi hiểu" ấy theo ${N(c)} nhiều năm.`+fx(c,{tam:-5,qh:[n.n,-10]})}}]}}),
FX({id:'bg_3',t:'Con của bạn cũ',k:'Tình nghĩa',head:1,
 x:(c,d)=>{const n=T(d);return d.took?`Nhiều năm đã qua. Con của ${nm(n)} đã lớn, ${pick(['học hành đỗ đạt','làm ăn khá','trở thành người đáng tin trong vùng'])}. Nó đến thắp hương trước bàn thờ cha và nhắc lại lời hứa của ${N(c)} năm xưa.`:d.refused?`Nhiều năm đã qua. Con của ${nm(n)} đến cửa nhà ${N(c)}, không nói oán trách, chỉ nhờ mượn một khoản nhỏ để lo mộ cha.`:`Nhiều năm đã qua. Con của ${nm(n)} tự đứng vững được, đến báo tin ra mắt vợ con và cảm ơn khoản tiền ngày xưa.`},
 o:(c,d)=>{const n=T(d);if(!n)return gone();return d.took?[
  {l:'Cho nó một phần nhà làm vốn, coi như con trong nhà',f:c=>{G.tie.rel(n,20,'giúp con lập nghiệp');return `Đứa trẻ ngày xưa nay đứng cạnh nhà mình như người thân. ${nm(n)} nếu còn thì sẽ mãn nguyện.`+fx(c,{money:-m(15),cfame:4,eq:3,on:3,tam:8,qh:[n.n,20]})}},
  {l:'Chúc mừng, để nó tự đi tiếp',f:c=>`Nó cúi đầu cảm tạ. Mối nghĩa vẫn ấm.`+fx(c,{eq:2,tam:4,qh:[n.n,8]})}]:[
  pay('Cho mượn khoản đó, không cần trả',10,{f:c=>{G.tie.rel(n,12,'giúp lo mộ cha');return `Người con cúi đầu, không nói gì. ${N(c)} thấy lòng nhẹ đi một chút.`+fx(c,{money:-m(10),eq:2,tam:3,qh:[n.n,12]})}}),
  {l:'Từ chối khéo thêm một lần nữa',f:c=>{G.tie.rel(n,-8,'từ chối lần nữa');return `Người con gật đầu, quay đi. Không còn gì để nói.`+fx(c,{tam:-4,qh:[n.n,-8]})}}]}})
];
});
