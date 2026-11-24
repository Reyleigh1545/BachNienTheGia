/* Bách Niên Thế Gia v6.7.10-d9.12 · BA CHUỖI KỲ NGỘ MỚI (mỗi chuỗi 3 bước, người là người thật, kết khác nhau theo cách đối xử) và MỘT CỐT TRUYỆN NGẮN KẾT NHỎ.
   ky_o_*: người lạ trú mưa để lại cái ô; ky_lua_*: lão nông trao giống lúa lạ; ky_tranh_*: bức tranh cổ; cn_*: con chó trung thành (kết nhỏ). */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const FM=v=>G.fmtMoney(v);const N=c=>esc(c.given);
const T=d=>d&&d.npc?G.tie.get(d.npc):null;const nm=n=>esc(n?n.n:'người ấy');
const addVai=(n,v)=>{if(n&&!n.vai.includes(v)){n.vai.push(v);n.vaiTxt=n.vai.map(x=>G.tie.VAI[x]||x).join(', ')}};
const pay=(l,v,o)=>Object.assign({l:`${l} (${FM(m(v))})`,c:()=>G.money()>=m(v)},o);
const KY=o=>Object.assign({tags:{},k:'Kỳ ngộ',ky:1,good:1,u:'person',pcd:300,w:0.45,age:[16,75]},o);
const FK=o=>Object.assign({tags:{},k:'Kỳ ngộ',ky:1,good:1,fixed:1},o);
const later=(c,id,lo,hi,d)=>G.later(c,id,R(lo,hi),d||{});
const gone=()=>[{l:'Thôi',f:()=>''}];
return [
/* ============ CHIẾC Ô CỦA NGƯỜI LẠ ============ */
KY({id:'ky_o_1',t:'Người lạ trú mưa dưới hiên',
 x:(c,d)=>{const n=G.tie.ensure(c,{key:'nguoi_la_o',g:'nam',vai:['quen'],nghe:'người đàn ông lạ mặt, áo quần sờn cũ, ôm cái bọc lớn và ho nhiều',age:R(45,62),tier:1,rel:0,why:'trú mưa'});d.npc=n.id;return `Cơn mưa lớn đổ xuống giữa chiều. ${nm(n)}, ${esc(n.nghe)}, đứng co ro dưới hiên nhà ${N(c)}, không dám xin gì, chỉ liếc nhìn trời.`},
 o:(c,d)=>{const n=T(d);if(!n)return gone();return [
  {l:'Mời vào nhà, cho bát canh nóng và chỗ ngồi tới khi tạnh',f:c=>{G.tie.rel(n,24,'được mời vào trú mưa');addVai(n,'an_nhan');later(c,'ky_o_2',24,60,{npc:n.id,kind:1});return `Ông uống canh nóng, ho dịu dần. Khi mưa tạnh, ông để lại chiếc ô giấy dầu cũ: "Không có gì tạ, xin nhận vật nhỏ". Rồi bước đi vào chiều mưa lất phất.`+fx(c,{money:-m(1),eq:2,tam:5,qh:[n.n,24]})}},
  {l:'Cho mượn cái ô, bảo ông cứ đi, không cần trả',f:c=>{G.tie.rel(n,14,'được cho mượn ô');later(c,'ky_o_2',24,60,{npc:n.id,kind:0});return `Ông cúi đầu cảm tạ, bước đi giữa trời mưa. Cái ô theo ông đi mất.`+fx(c,{tam:2,qh:[n.n,14]})}},
  {l:'Làm lơ, đóng cửa để ông tự lo',f:c=>{G.tie.rel(n,-8,'bị đóng cửa trước mặt');return `Tiếng cửa đóng vang lên. Mấy phút sau ông đi, vai ướt sũng. Mình không thấy ông nữa.`+fx(c,{tam:-2,qh:[n.n,-8]})}}]}}),
FK({id:'ky_o_2',t:'Cái ô giấy dầu',
 x:(c,d)=>{const n=T(d);return d.kind?`Nhiều năm sau, ${N(c)} mở chiếc ô ông khách để lại, thấy dưới lớp giấy dầu có một mảnh giấy cuộn chặt, ghi một địa chỉ và dòng chữ: "Người nhận được ô này, cứ tìm tôi khi cần việc lớn". Đó là tên và nơi ở của ${nm(n)}.`:`Nhiều năm sau, một người lạ gõ cửa nhà ${N(c)}, tự xưng là cháu của ${nm(n)}: ông đã mất, nhưng nhớ ơn cái ô được cho mượn năm xưa và dặn con cháu tìm đến trả lễ.`},
 o:(c,d)=>{const n=T(d);if(!n)return gone();return d.kind?[
  {l:'Lên đường tìm đến địa chỉ, mang theo lễ vật',c:()=>G.money()>=m(5),r:[{eq:0.8,tri:0.4},70],y:c=>{G.tie.rel(n,22,'tìm đến theo địa chỉ');later(c,'ky_o_3',1,4,{npc:n.id,kind:1});return `Địa chỉ dẫn đến một ngôi nhà nhỏ ở vùng khác. ${nm(n)} nhìn lễ vật, mắt sáng: "Tôi biết rồi sẽ có ngày này".`+fx(c,{money:-m(5),tri:1,eq:2,tam:4,qh:[n.n,22]})},n:c=>{G.tie.rel(n,4,'tìm đến nhưng gặp người khác');later(c,'ky_o_3',1,4,{npc:n.id,kind:0});return `Đến nơi thì người đã dọn đi, chỉ gặp người thân ông. Họ hẹn sẽ nhắn.`+fx(c,{money:-m(5),tam:-2,qh:[n.n,4]})}},
  {l:'Giữ mảnh giấy làm kỷ niệm, không đi tìm',f:c=>{G.tie.rel(n,-4,'không tìm đến');return `Mảnh giấy được cất vào hòm. Ngày nào đó có thể dùng, hoặc không.`+fx(c,{tam:1,qh:[n.n,-4]})}}]:[
  {l:'Tiếp đãi chu đáo, nghe lời tạ của người cháu',f:c=>{G.tie.rel(n,12,'người cháu đến tạ ơn');return `Người cháu để lại một lễ vật nhỏ và lời nhắn: "Ông tôi nói, ơn nhỏ mà nhớ lâu". ${N(c)} thấy ấm lòng.`+fx(c,{money:m(R(8,18)),eq:2,tam:5,qh:[n.n,12]})}},
  {l:'Từ chối lễ vật, bảo đó chỉ là việc nhỏ ai cũng làm',f:c=>{G.tie.rel(n,20,'từ chối lễ vật');return `Người cháu sững lại rồi cúi chào thật sâu. Họ mang về lời ấy kể với cả họ. Tiếng nhà lan ra.`+fx(c,{eq:3,cfame:2,tam:6,qh:[n.n,20]})}}]}}),
FK({id:'ky_o_3',t:'Người ông nhớ tên',
 x:(c,d)=>{const n=T(d);return d.kind?`${nm(n)} thật ra là một thầy thuốc về hưu từng làm Thái y, phiêu bạt vì bị vu oan. Nghe tin nhà ${N(c)} có người ốm đau lâu ngày, ông tự tay xem mạch, kê đơn. Ông bảo: "Ơn bát canh nóng năm nào, nay tôi trả lại một món".`:`Người nhà của ${nm(n)} đến báo: trước khi mất, ông dặn trao cho nhà ${N(c)} một cuốn sổ thuốc chép tay, vì "người cho ô là người tử tế".`},
 o:(c,d)=>{const n=T(d);if(!n)return gone();return d.kind?[
  {l:'Nhờ ông chữa cho người ốm lâu ngày, mời ông ở lại vài tháng',f:c=>{G.tie.rel(n,26,'chữa bệnh cho nhà');addVai(n,'thay_thuoc');const L=G.alive().filter(p=>G.inClan(p)&&p.dead==null);L.slice(0,4).forEach(p=>G.addStat(p,'suc',R(3,7)));return `Mấy tháng ông ở lại, người ốm khỏe dần, cả nhà được ông dạy cách phòng bệnh. Nhà có thêm một thầy thuốc quý.`+fx(c,{tri:R(2,4),hpMax:R(1,2),eq:2,tam:8,qh:[n.n,26]})+G.fxAll({suc:3})}},
  {l:'Nhờ ông chỉ dạy một người trong nhà có chí học thuốc',c:c=>G.kinList(c,p=>G.age(p)>=14&&G.age(p)<=35&&p.tri>=55).length>0,go:(c,d2)=>G.pickKin(c,{eyebrow:'Kỳ ngộ',title:'Ai theo học thuốc',text:'Người được chọn theo ông một thời gian, học cách nhận bệnh và bốc thuốc.',filter:p=>G.age(p)>=14&&G.age(p)<=35&&p.tri>=55,cb:w=>{G.tie.rel(n,18,'nhận học trò');addVai(n,'thay');return `${esc(w.given)} theo ông mấy tháng, học được nghề chữa bệnh căn bản. Ông ra đi với nụ cười.`+fx(w,{tri:R(4,8),eq:2,hpMax:1,tam:7})+fx(c,{qh:[n.n,18]})}})}]:[
  {l:'Nhận cuốn sổ thuốc, đọc và dạy lại cho người trong nhà',f:c=>{G.tie.rel(n,10,'nhận sổ thuốc');const L=G.kinList(c,p=>G.age(p)>=12&&G.age(p)<=40&&p.tri>=45);L.slice(0,3).forEach(p=>G.addStat(p,'tri',R(2,4)));return `Cuốn sổ chép đủ bài thuốc và cách phòng bệnh theo mùa. Cả nhà đọc, và biết cách tự chăm sóc.`+fx(c,{tri:R(2,4),hpMax:1,tam:6,qh:[n.n,10]})}},
  {l:'Giữ cuốn sổ làm kỷ vật của nhà, chỉ để đọc khi cần',f:c=>`Cuốn sổ được đặt ở bàn thờ như kỷ vật. Có người nhà chép lại một phần để dùng.`+fx(c,{eq:1,tam:3,qh:[n.n,6]})}]}}),
/* ============ GIỐNG LÚA LẠ ============ */
KY({id:'ky_lua_1',t:'Lão nông trao nắm giống lạ',tier:[0,4],
 x:(c,d)=>{const n=G.tie.ensure(c,{key:'lao_nong_lua',g:'nam',vai:['quen'],nghe:'lão nông già ở vùng xa, đi bộ tìm người xứng đáng',age:R(65,80),tier:0,rel:0,why:'trao giống lúa'});d.npc=n.id;return `${nm(n)}, ${esc(n.nghe)}, nghỉ chân ở nhà ${N(c)}, kể chuyện nghề nông. Trước khi đi, ông cởi túi vải nhỏ: "Mấy nắm giống lúa này tôi giữ cả đời. Cậu thấy có chí làm ăn, giao lại".`},
 o:(c,d)=>{const n=T(d);if(!n)return gone();return [
  {l:'Nhận giống, hỏi kỹ cách gieo trồng, ghi chép',f:c=>{G.tie.rel(n,22,'nhận giống, ghi chép cẩn thận');later(c,'ky_lua_2',6,12,{npc:n.id,care:1});return `Ông chỉ cách ngâm giống, cách chọn ruộng, mùa nào gieo. ${N(c)} ghi từng điều, cất giống cẩn thận.`+fx(c,{tri:1,eq:1,tam:4,qh:[n.n,22]})}},
  {l:'Nhận giống, mang gieo ngay không ghi chép',f:c=>{G.tie.rel(n,10,'nhận giống');later(c,'ky_lua_2',6,12,{npc:n.id,care:0});return `Giống được gieo vội theo trí nhớ. Có thể thành, có thể hỏng.`+fx(c,{tam:2,qh:[n.n,10]})}},
  {l:'Từ chối, bảo nhà không có ruộng',f:c=>{G.tie.rel(n,-6,'từ chối nhận giống');return `Ông gật đầu, gói giống lại, đi tiếp. Có thể ông sẽ tìm người khác.`+fx(c,{tam:-1,qh:[n.n,-6]})}}]}}),
FK({id:'ky_lua_2',t:'Mùa gặt đầu tiên của giống lạ',
 x:(c,d)=>{const n=T(d);return d.care?`Mùa gặt đầu tiên của giống lạ: bông lúa dài hơn, hạt mẩy hơn thường lệ. Mình đã chọn đúng ruộng và đúng mùa nhờ lời ông dặn. ${nm(n)} nghe tin, tìm đến xem.`:`Mùa gặt đầu tiên của giống lạ: ruộng vừa tốt vừa xấu, có nơi bông mẩy, có nơi lép. Mình không nhớ hết lời ông dặn. ${nm(n)} nghe tin, tìm đến nhìn ruộng.`},
 o:(c,d)=>{const n=T(d);if(!n)return gone();return [
  {l:'Chia giống cho hàng xóm cùng trồng, nhờ ông chỉ dạy cả làng',f:c=>{G.tie.rel(n,26,'chia giống cho cả làng');addVai(n,'quy_nhan');later(c,'ky_lua_3',24,60,{npc:n.id,share:1,care:d.care});return `Cả làng ra ruộng nghe ông chỉ dạy, mỗi nhà một nắm giống. Mùa sau cả vùng được mùa.`+fx(c,{cfame:R(5,9),eq:3,on:3,tam:7,qh:[n.n,26]})}},
  {l:'Giữ giống riêng cho nhà, nhân rộng từ từ',f:c=>{G.tie.rel(n,8,'giữ giống riêng');later(c,'ky_lua_3',24,60,{npc:n.id,share:0,care:d.care});return `Giống chỉ lan trong ruộng nhà. Thu hoạch mỗi năm một nhiều hơn, nhưng người làng nhìn với ánh mắt khác.`+fx(c,{money:m(R(15,30)),bonus:0.1,tam:2,qh:[n.n,8]})}}]}}),
FK({id:'ky_lua_3',t:'Giống lúa thành tên',
 x:(c,d)=>{const n=T(d);return d.share?`Nhiều năm sau, cả vùng nhớ giống lúa ấy mang tên "lúa ${esc(S().surname)}". ${nm(n)} mất, người ta đến nhà thắp hương cho ông và cảm ơn người đã chia giống.`:`Nhiều năm sau, giống lúa mang tên "lúa ${esc(S().surname)}" nổi tiếng trong vùng nhưng chỉ nhà mình có. ${nm(n)} nghe tin, nhắn nhắc: giống quý thì nên chia để khỏi tuyệt.`},
 o:(c,d)=>{const n=T(d);if(!n)return gone();return d.share?[
  {l:'Dựng tấm bia nhỏ tại đầu làng ghi công người trao giống',f:c=>{G.tie.rel(n,20,'dựng bia ghi công');return `Tấm bia đá ghi tên lão nông và nhà mình. Người làng đi qua thường dừng lại thắp hương. Tiếng thơm nhà bền lâu.`+fx(c,{money:-m(6),cfame:R(6,10),eq:3,on:4,tam:8,qh:[n.n,20]})}},
  {l:'Giữ giống làm nghề, mở thêm cơ sở xay lúa',c:()=>G.money()>=m(20),f:c=>{return `Nhà mở cơ sở xay lúa nhỏ, thu mua lúa giống của cả làng, thu nhập thêm đều đặn.`+fx(c,{money:-m(20),bonus:0.15,sk:{ql:2},cfame:2,tam:5})}}]:[
  {l:'Nghe lời ông, chia một phần giống cho vài nhà tin cậy',f:c=>{G.tie.rel(n,16,'chia giống muộn');return `Vài nhà nhận giống, cảm ơn. Nhà mình vẫn giữ phần chính, nhưng mối quan hệ với xóm ấm hơn.`+fx(c,{cfame:3,eq:2,tam:4,qh:[n.n,16]})}},
  {l:'Giữ giống riêng, làm lợi cho nhà',f:c=>{G.tie.rel(n,-8,'giữ giống riêng');return `Thu nhập nhà tiếp tục tăng, nhưng ${nm(n)} thôi không ghé thăm nữa.`+fx(c,{money:m(R(20,40)),bonus:0.08,tam:-2,qh:[n.n,-8]})}}]}}),
/* ============ BỨC TRANH CỔ ============ */
KY({id:'ky_tranh_1',t:'Bức tranh cuộn trong hòm cũ',tier:[0,5],
 x:(c,d)=>{const n=G.tie.ensure(c,{key:'chu_tiem_tranh',g:'nam',vai:['thuong_nhan'],nghe:'chủ tiệm bán đồ cổ trên phố huyện',age:R(45,62),main:'tri',tier:3,rel:0,why:'xem tranh cổ'});d.npc=n.id;d.real=chance(0.5);return `Dọn hòm gỗ của người đời trước, ${N(c)} tìm thấy một bức tranh cuộn, màu đã ngả. Không biết giá trị gì. Gần đó có ${nm(n)}, ${esc(n.nghe)}, nghe chuyện đến xin xem.`},
 o:(c,d)=>{const n=T(d);if(!n)return gone();return [
  {l:'Cho ông xem, để ông định giá',f:c=>{G.tie.rel(n,10,'cho xem tranh');later(c,'ky_tranh_2',2,6,{npc:n.id,real:d.real,shown:1});return `${nm(n)} nhìn thật lâu, xoa cằm: "Để tôi về tra sách".`+fx(c,{tam:1,qh:[n.n,10]})}},
  {l:'Giữ kín, mang đến thầy đồ hay chữ nhờ xem trước',f:c=>{later(c,'ky_tranh_2',3,8,{npc:n.id,real:d.real,shown:0});return `Thầy đồ xem rất kỹ, bảo cần thêm thời gian đối chiếu chữ ký. Mình hẹn quay lại.`+fx(c,{tri:1,tam:1})}},
  {l:'Treo tranh lên làm đồ trang trí, không quan tâm giá trị',f:c=>{later(c,'ky_tranh_2',24,48,{npc:n.id,real:d.real,shown:-1});return `Bức tranh được treo giữa nhà. Khách ghé chơi hay dừng lại ngắm.`+fx(c,{tam:2})}}]}}),
FK({id:'ky_tranh_2',t:'Chuyện về bức tranh',
 x:(c,d)=>{const n=T(d);return d.shown>0?`${nm(n)} trở lại với ánh mắt khác: ông tra được chữ ký ở góc tranh. ${d.real?'Đó là tranh của một họa sĩ cung đình nổi tiếng, giá trị lớn.':'Ông cũng cho biết đây là tranh nhái khéo, giá chỉ vài chục quan.'} Ông ngỏ ý mua lại ngay.`:d.shown===0?`Thầy đồ gửi thư: chữ ký có nét giống một họa sĩ cung đình, nhưng cần người sành mắt xác nhận. Mình mang tranh đến ${nm(n)} nhờ thẩm định lần cuối.`:`Một quan viên ghé nhà, thấy bức tranh thì dừng bước hồi lâu: "Nhà ông giữ vật này từ đâu?". Ông gọi ${nm(n)} đến xem. Cả hai nhìn nhau và gật đầu.`},
 o:(c,d)=>{const n=T(d);if(!n)return gone();const v=m(d.real?R(60,110):R(5,12));return [
  {l:'Bán cho ông với giá thỏa thuận hợp lý',f:c=>{G.tie.rel(n,d.real?14:8,'bán tranh');return d.real?`Giá thỏa thuận ổn thỏa, ${nm(n)} trả bằng bạc. Một món lớn vào nhà.`+fx(c,{money:v,eq:1,tam:6,qh:[n.n,14]}):`Giá nhỏ nhưng thành thật. ${nm(n)} khen nhà ngay thẳng.`+fx(c,{money:v,tam:2,qh:[n.n,8]})}},
  {l:d.real?'Giữ làm bảo vật của nhà, chỉ cho mượn trưng bày trong dịp lớn':'Giữ làm kỷ niệm dù chỉ là tranh nhái',f:c=>{G.tie.rel(n,6,'giữ tranh làm của gia truyền');return d.real?`Tranh thật nên được cất giữ cẩn thận, nhà thêm một vật quý để truyền đời sau. Người trong vùng nể.`+fx(c,{cfame:R(4,7),tri:1,eq:1,on:3,tam:6,qh:[n.n,6]}):`Vật kỷ niệm dù không quý. Nhà vẫn treo giữa gian nhà, như nhắc tên người xưa.`+fx(c,{tam:3,qh:[n.n,6]})}},
  ...(d.real?[{l:'Tặng tranh cho quan huyện để được tiếng và che chở',f:c=>{G.tie.rel(n,-4,'tặng tranh cho quan');G.qt&&G.qt.add&&G.qt.add(c,{fav:12});return `Quan huyện cảm động, ghi nhớ ơn. Nhà có thêm điểm tựa trong vùng, nhưng mất đi một vật quý.`+fx(c,{cfame:3,fav:8,eq:1,tam:3,qh:[n.n,-4]})}}]:[])]}}),
/* ============ CỐT TRUYỆN NGẮN KẾT NHỎ: CON CHÓ TRUNG THÀNH ============ */
KY({id:'cn_1',t:'Con chó lạ theo về nhà',w:0.5,
 x:(c,d)=>`Một con chó vàng gầy trơ xương đi theo ${N(c)} từ chợ về, đứng trước cửa nhìn vào, không sủa, không bỏ đi. Nó có vết thương cũ ở chân sau và cái cổ không đeo gì.`,
 o:(c,d)=>[
  {l:'Cho ăn, chữa vết thương, giữ lại nuôi',f:c=>{later(c,'cn_2',12,36,{kind:1});return `Con chó nằm trước hiên, lành vết thương sau mấy tuần. Nó theo ${N(c)} đi đâu cũng được, không rời nửa bước.`+fx(c,{money:-m(1),eq:1,tam:5})}},
  {l:'Cho ăn một bữa rồi đuổi đi',f:c=>{later(c,'cn_2',12,36,{kind:0});return `Con chó đi hết con ngõ rồi quay lại nhìn một lần. ${N(c)} đóng cửa.`+fx(c,{tam:-2})}},
  {l:'Báo cho hàng xóm, tìm chủ cũ',f:c=>{later(c,'cn_2',6,18,{kind:2});return `Cả xóm hỏi quanh, không ai nhận. Con chó nằm ở sân chung, chờ.`+fx(c,{eq:1,tam:1})}}]}),
FK({id:'cn_2',t:'Đêm có kẻ lạ',
 x:(c,d)=>d.kind===1?`Giữa đêm, tiếng chó sủa dồn dập. ${N(c)} bật dậy thấy một bóng người đang bẩy cửa kho, con chó vàng ngày nào lao vào cắn chặt cổ chân hắn. Hắn ném hòn đá, con chó rú lên mà vẫn không buông.`:d.kind===2?`Con chó nhà chung ở sân đột nhiên sủa dữ dội trước cổng nhà ${N(c)}. Lúc ra xem, thấy một đám khói bay lên từ góc kho. Nếu không có nó, lửa đã bén vào mái.`:`Mấy năm sau, ${N(c)} đi đường xa gặp lại con chó vàng năm xưa ở cửa một quán trọ, già hơn nhưng vẫn nhận ra. Nó nhìn ${N(c)} rất lâu, rồi cúi đầu.`,
 o:(c,d)=>d.kind===1?[
  {l:'Xông ra giúp con chó, đánh đuổi kẻ trộm',r:[{vo:0.7,suc:0.4},68],y:c=>`Kẻ trộm bỏ chạy, để lại bọc đồ. Con chó bị thương nhẹ nhưng vẫn vẫy đuôi. Cả nhà được yên.`+fx(c,{vo:1,suc:-3,eq:2,tam:6}),n:c=>`Kẻ trộm hung hãn, ${N(c)} bị thương nhẹ, kho mất ít đồ. Con chó nằm bên cạnh chủ suốt đêm.`+fx(c,{suc:-R(5,10),money:-m(3),tam:-1})},
  {l:'Gọi người nhà và hàng xóm ra bắt trộm',f:c=>`Cả xóm kéo ra, kẻ trộm bị bắt. Con chó được cả xóm xoa đầu khen. Tiếng nhà có chó dữ lan khắp.`+fx(c,{eq:2,cfame:2,tam:5})}]:d.kind===2?[
  {l:'Dập lửa rồi cảm ơn con chó, nuôi nó như người nhà',f:c=>`Lửa tắt kịp, nhà không mất gì. Con chó được ăn cơm cùng cả nhà từ hôm ấy.`+fx(c,{money:-m(1),eq:2,tam:6})},
  {l:'Dập lửa, rồi gửi con chó cho người hàng xóm nuôi chung',f:c=>`Con chó sống trong xóm, được cả nhà thay phiên chăm. Mọi người quý nó.`+fx(c,{eq:1,cfame:1,tam:4})}]:[
  {l:'Xin chủ quán nhận con chó đưa về nhà',c:()=>G.money()>=m(2),f:c=>`Chủ quán đồng ý với một khoản nhỏ. Con chó leo lên xe, cuộn tròn như chưa từng xa nhau.`+fx(c,{money:-m(2),eq:2,tam:7})},
  {l:'Để lại ít tiền nhờ chủ quán nuôi tiếp',f:c=>`Con chó nhìn theo chiếc xe rất lâu. ${N(c)} thấy cay mắt.`+fx(c,{money:-m(1),tam:-1,eq:1})}]})
];
});
