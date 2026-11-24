/* Bách Niên Thế Gia · 7.0.0-d.1.5.6 · NỚI LỰA CHỌN CHO 11 KỲ NGỘ/SỰ KIỆN CÒN DƯỚI BA LỰA CHỌN (mục 11 "Gameplay còn hở": kỳ ngộ cũ ít lựa chọn; luật 13.15: mỗi lựa chọn khác nhau về GIÁ phải trả hoặc rủi ro, không chỉ khác phần thưởng).
   Danh sách lấy từ đo ở game thật (kỳ ngộ có `o` là mảng dưới 3 lựa chọn, bỏ `vv_*` là cổng vượt mốc): vua_ban_bien, ng_vao_cung (chỉ có 1 lựa chọn), y_chieumo, c5_phuong, c9_nhan_mon, c13_kiem, c16_cau_mua, nb_a, bd_a, jh_bi_kip, lnh_a.
   Làm bằng EVPATCH (chạy sau khi nạp gói, trước khi dựng bản đồ sự kiện): GIỮ NGUYÊN sự kiện gốc (điều kiện, chuỗi hậu sự c5_b, c9_b, c13_b, c16_b, nb_b, bd_b, lnh_b) và nối thêm lựa chọn. 290 kỳ ngộ khác có `o` là hàm (số lựa chọn tính lúc chơi) chưa đo được, xem mục 11. */
window.EVPATCH=window.EVPATCH||[];
window.EVPATCH.push(function(E,G){
const {R,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const FM=v=>G.fmtMoney(v);
const NOM={tri:50,vo:46,suc:65,mi:46,eq:46,muu:20,khau:25,ql:16,ky:30,fame:15,m:35,duyen:50};
const TS=(spec,p)=>{let v=0,w=0;for(const k in spec){v+=(NOM[k]!=null?NOM[k]:50)*spec[k];w+=spec[k]}return Math.round(0.93*(w?v/w:50)-9*Math.log(p/(1-p)))};
const RR=(spec,p)=>[spec,TS(spec,p)];
const pay=(l,v,o)=>Object.assign({l:`${l} (${FM(m(v))})`,c:()=>G.money()>=m(v)},o);
const nx=(c,id,a,b,d)=>{G.later(c,id,R(a,b),d||{});return ''};
const find=id=>E.find(e=>e.id===id);
/* thêm lựa chọn vào sự kiện có `o` là mảng hoặc hàm; extra(c,d) trả mảng lựa chọn mới */
function addOpts(id,extra){const e=find(id);if(!e||e.__d156)return;e.__d156=1;const o0=e.o;e.o=function(c,d){const base=typeof o0==='function'?o0.call(this,c,d):o0;if(!Array.isArray(base))return base;let more=[];try{more=extra(c,d||{})||[]}catch(er){console.error(er)}return base.concat(more)}}

/* ---- vua_ban_bien: biển ngạch vua ban (trước chỉ có một nút) ---- */
addOpts('vua_ban_bien',c=>[
  pay('Mở tiệc ba ngày mời cả vùng đến chiêm ngưỡng biển ngạch',90,{f:c=>`Cả huyện kéo đến dự lễ treo biển; nhà ${esc(S().surname)} đãi hết gạo thịt tích góp. Tiếng thơm lan xa, nhưng quỹ nhà vơi hẳn.`+fx(c,{money:-m(90),fame:R(120,170),tam:12,eq:1})}),
  {l:'Nhận biển một cách khiêm tốn, treo trong từ đường, chỉ báo họ hàng',f:c=>`Mình dặn con cháu không phô trương, chỉ làm lễ nhỏ trong họ. Người ngoài khen nhà biết giữ nết, ít ai đố kỵ.`+fx(c,{money:-m(8),fame:R(35,60),eq:2,tam:4})},
  {l:'Xin sứ giả chuyển lời tạ ơn và dâng sớ xin được sung quân lương thay cho vàng tạ',r:RR({eq:0.8,tri:0.3},0.55),y:c=>`Sứ giả cảm động, về tâu lại. Nhà mang tiếng thanh cao, dân chúng truyền tụng; triều đình cũng nhớ thêm một lần.`+fx(c,{money:-m(40),fame:R(90,130),merit:2,eq:1}),n:c=>`Lời sớ bị quan lễ bộ cho là làm màu, nhà vừa mất vàng vừa bị bàn tán.`+fx(c,{money:-m(40),fame:R(10,25),tam:-4})}]);

/* ---- ng_vao_cung: nghệ nhân tiến cung (trước chỉ có một nút khó 90) ---- */
addOpts('ng_vao_cung',c=>[
  {l:'Chọn khúc dân gian mộc mạc, không phô kỹ thuật',r:RR({mi:0.6,eq:0.7},0.65),y:c=>'Vua nghe khúc quê thì nhớ ngày nhỏ, khen là có hồn; thưởng không nhiều nhưng được gọi lại lần sau.'+fx(c,{money:m(50),fame:R(25,45),tam:6,eq:1}),n:c=>'Khúc quê giữa yến tiệc cung đình bị chê là thô; nhạc công cười thầm.'+fx(c,{fame:-3,tam:-4})},
  pay('Bỏ vàng nhờ nhạc quan trong cung chỉnh bài và dẫn lối trước yến',60,{r:RR({eq:0.8,mi:0.5},0.7),y:c=>'Nhạc quan chỉ cho đúng chỗ ngắt, đúng điệu cung đình. Buổi diễn trơn tru, vua ban thưởng.'+fx(c,{money:-m(60)+m(80),fame:R(35,55),lv:1,tam:5}),n:c=>'Nhận tiền xong nhạc quan chỉ lấy lệ; bài diễn không có điểm gì nổi.'+fx(c,{money:-m(60),fame:3,tam:-3})}),
  {l:'Tâu bệnh xin hoãn, hẹn đến dịp yến sau',f:c=>'Cung điện không ép, nhưng cơ hội này không trở lại; nhờ vậy mình tránh được chốn nhiều kẻ ganh ghét.'+fx(c,{tam:3,fame:-5})}]);

/* ---- y_chieumo: chiếu mời vào Thái y viện ---- */
addOpts('y_chieumo',c=>[
  {l:'Xin hoãn một năm để lo yên bệnh nhân đang chữa, rồi vào cung sau',r:RR({eq:0.7,tri:0.3},0.6),y:c=>'Thái y viện chuẩn lời vì thấy mình có nghĩa với bệnh nhân. Một năm sau vào cung, tiếng thơm đi trước.'+fx(c,{fame:R(30,50),eq:2,tam:4,merit:1}),n:c=>'Thái y viện cho rằng mình kén chọn, chiếu giao cho người khác. Dân khen mình có nghĩa nhưng cơ hội đã mất.'+fx(c,{fame:R(10,20),tam:-3})},
  {l:'Tiến cử người học trò giỏi nhất vào cung thay mình',f:c=>'Học trò mừng đến rưng rưng. Tiếng thầy tiến cử đúng người lan khắp giới y; mình ở lại với dân, thêm môn sinh tìm đến.'+fx(c,{fame:R(30,45),eq:3,tam:6,money:-m(5)})}]);

/* ---- c5_phuong: phương thuốc cổ (chuỗi c5_b) ---- */
addOpts('c5_phuong',c=>[
  pay('Mang trang phương đến hỏi một lão thầy thuốc già trước khi mất công đi tìm thuốc',12,{r:RR({tri:0.7,eq:0.4},0.65),y:c=>{nx(c,'c5_b',3,6);return 'Lão thầy xem rất lâu, bảo phương này đúng nhưng thiếu một vị dẫn; chỉ ra chỗ nên thay bằng dược liệu rẻ hơn nhiều.'+fx(c,{money:-m(12),tri:R(1,3),tam:5})},n:c=>'Lão thầy bảo phương hỏng một nửa vì chữ phai, không đoán được. Mình mất phí hỏi.'+fx(c,{money:-m(12),tam:-2})}),
  {l:'Chép lại phương thuốc, gửi tặng y quán của huyện để cùng nghiên cứu',f:c=>'Y quán huyện cảm kích, ghi tên nhà vào sổ người hiến phương. Không có tiền, nhưng tiếng tốt và quan hệ thầy thuốc về sau.'+fx(c,{fame:R(12,22),eq:1,tam:4})}]);

/* ---- c9_nhan_mon: lệnh điều quân ra ải ---- */
addOpts('c9_nhan_mon',c=>[
  pay('Dốc tiền sắm thêm cung tên, giáp dày và lương khô cho cả toán trước khi lên đường',20,{f:c=>nx(c,'c9_b',2,4,{v:'theo'})+'Cả toán ra đi chu đáo hơn mọi đơn vị khác; anh em ghi nhớ.'+fx(c,{money:-m(20),eq:2,tam:4,merit:1})}),
  {l:'Xin được đi đoạn hậu, giữ đường lương cho đại quân',r:RR({tri:0.6,eq:0.5},0.6),y:c=>nx(c,'c9_b',2,4,{v:'theo'})+'Đường lương được giữ nguyên vẹn nhờ mình canh chừng; ít vinh quang nhưng ít máu.'+fx(c,{merit:3,tam:3,eq:1}),n:c=>nx(c,'c9_b',2,4,{v:'theo'})+'Đoạn hậu bị tập kích bất ngờ, lương mất một nửa; cấp trên quở trách.'+fx(c,{merit:-2,tam:-5,suc:-R(2,6)})}]);

/* ---- c13_kiem: đơn đặt kiếm của tướng quân (chuỗi c13_b) ---- */
addOpts('c13_kiem',c=>[
  {l:'Nhận nhưng xin hẹn hai năm để rèn cho kỹ',r:RR({tri:0.5,eq:0.6},0.6),y:c=>nx(c,'c13_b',8,12)+'Tướng quân chịu chờ vì thích tính cẩn trọng. Mình có thời gian chọn sắt, nung đủ lửa.'+fx(c,{tam:4,eq:1}),n:c=>'Tướng quân cho là chậm trễ, rút lại đơn và đặt thợ khác.'+fx(c,{fame:-3,tam:-3})},
  pay('Nhờ một thợ cả tiếng tăm cùng ngồi rèn để chắc tay',30,{f:c=>nx(c,'c13_b',4,7)+'Hai người cùng đứng lò; thanh kiếm đỡ rủi ro, và mình học được cách xử lý thép của thợ cả.'+fx(c,{money:-m(30),tri:R(1,3),tam:3})})]);

/* ---- c16_cau_mua: đại hạn (chuỗi c16_b) ---- */
addOpts('c16_cau_mua',c=>[
  pay('Mở kho góp gạo chia cho các nhà thiếu, không làm lễ',25,{f:c=>`Cả làng không ai chết đói mùa hạn. Mình không làm lễ nhưng ai cũng nhớ nhà ${esc(S().surname)} mở kho.`+fx(c,{money:-m(25),fame:R(18,30),eq:2,tam:5})}),
  {l:'Họp các nhà đào giếng chung ở chỗ trũng nhất làng, chia nước theo phiên',r:RR({tri:0.6,eq:0.6},0.55),y:c=>nx(c,'c16_b',3,5,{l:'kenh'})+'Giếng ra nước sau mười ngày đào; chia nước công bằng nên làng yên.'+fx(c,{money:-m(15),fame:R(12,22),eq:1}),n:c=>'Giếng đào ra nước đục và ít; các nhà trách nhau chia nước. Công sức phần lớn mất trắng.'+fx(c,{money:-m(15),fame:-4,tam:-4})}]);

/* ---- nb_a: ngọc bội vỡ trong từ đường (chuỗi nb_b) ---- */
addOpts('nb_a',c=>[
  {l:'Hỏi ông muốn gì và vì sao bị phong ấn, rồi mới quyết có nhận làm thầy hay không',r:RR({tri:0.5,eq:0.8},0.5),y:c=>nx(c,'nb_b',4,10)+'Ông lão im một lúc rồi kể thật; hóa ra ông đã từng bị đệ tử phản. Biết rõ cả hai phía, mình bớt sợ và tự tin nhận ông.'+fx(c,{tam:10,eq:2}),n:c=>'Ông lão nổi giận vì bị hạch hỏi, bảo "đứa ngốc nhưng lắm lời", rồi lặng đi như đá.'+fx(c,{tam:-4})},
  {l:'Nhặt hai mảnh ngọc, giấu đi, một mình đợi tối rồi nói chuyện lần nữa',f:c=>nx(c,'nb_b',6,14)+'Mình giữ kín. Đêm đó ông lão lên tiếng lại, chậm rãi hơn, chịu dạy từng chút một. Việc này không ai trong họ biết.'+fx(c,{tam:5,eq:1})}]);

/* ---- bd_a: bức tranh cũ ở chợ đồ cổ (chuỗi bd_b) ---- */
addOpts('bd_a',c=>[
  pay('Mặc cả xuống rẻ, mua kèm nhờ chủ hàng cho xem dấu ấn sau lưng tranh',1,{r:RR({tri:0.6,eq:0.5},0.6),y:c=>nx(c,'bd_b',2,8)+'Chủ hàng bán đứt với giá nhẹ vì tưởng không có gì; sau lưng tranh có dấu triện lạ, mình ngờ ngợ có điều.'+fx(c,{money:-m(1),tri:R(0,2),tam:4}),n:c=>'Chủ hàng đổi ý, nói đã hứa cho người khác. Mình mất công mà không có gì.'+fx(c,{tam:-2})}),
  {l:'Nhờ một thầy đồ cổ trong chợ xem hộ trước, trả công xem',f:c=>'Thầy xem xong lắc đầu: tranh chép đời sau, không đáng tiền. Mình mất chút công xem nhưng khỏi mua lầm.'+fx(c,{money:-m(1),tri:1})}]);

/* ---- jh_bi_kip: bí kíp thất truyền trong hang (giang hồ) ---- */
addOpts('jh_bi_kip',c=>[
  {l:'Đem sách ra khỏi hang, nhờ một cao nhân đáng tin xem hộ trước khi luyện',r:RR({tri:0.7,eq:0.5},0.6),y:c=>'Cao nhân chỉ ra mấy câu khẩu quyết đọc ngược nghĩa dễ gây tẩu hỏa, dặn bỏ đi. Mình luyện phần an toàn, tiến chậm mà chắc.'+fx(c,{vo:R(2,4),tri:1,over:1,m:3,tam:4}),n:c=>'Cao nhân xem xong lặng thinh rồi mượn sách đi mất; người ấy không còn lưu lại tăm hơi.'+fx(c,{fame:-3,tam:-6})},
  {l:'Chép lại một bản rồi chôn sách cùng hài cốt, giữ bản chép phòng khi cần',f:c=>'Bản chép nhiều chỗ nét mờ, nhưng đủ để về sau đối chiếu. Người xưa nằm yên, mình không mang nợ ai.'+fx(c,{fame:2,vo:1,tri:1,tam:3})}]);

/* ---- lnh_a: tiếng đàn trên lầu Vọng Nguyệt (chuỗi lnh_b) ---- */
addOpts('lnh_a',c=>[
  pay('Nhờ thị nữ chuyển một chầu trà và lời mời không tên, để nàng tự đoán',2,{r:RR({mi:0.6,eq:0.7},0.55),y:c=>nx(c,'lnh_b',3,8)+'Nàng bật cười, bảo hiếm có người không đòi nổi tiếng. Mời mình ngồi lại một lúc.'+fx(c,{money:-m(2),tam:6}),n:c=>'Thị nữ trả lời nàng bận tiếp khách khác. Mình ra về nhưng không ai cười chê.'+fx(c,{money:-m(2),tam:-2})}),
  {l:'Nghe hết khúc, rồi nhờ bạn đưa danh thiếp cho nàng sau, không lên lầu ngay',r:RR({eq:0.8,tri:0.3},0.6),y:c=>nx(c,'lnh_b',6,12)+'Nàng thích sự chừng mực, nhận danh thiếp và hẹn dịp khác.'+fx(c,{tam:5,eq:1}),n:c=>'Danh thiếp bị gạt bỏ giữa bao người; nhưng không ai biết chuyện này ngoài bạn bè thân.'+fx(c,{tam:-2})}]);

/* ---- đợt hai (đo lại bằng gọi o(c,d) ở game thật: 22 kỳ ngộ dưới 3 lựa chọn, trong đó nhiều bước sau của chuỗi chỉ có 1 lựa chọn có chủ ý; nới thêm 7 kỳ ngộ độc lập) ---- */
/* ---- c12_khuc_nhac: khúc nhạc thất truyền (chuỗi c12_b) ---- */
addOpts('c12_khuc_nhac',c=>[
  pay('Xin lão nhạc công hát lại nhiều lần, ghi lại nhạc phổ trước khi lên núi',6,{r:RR({mi:0.6,tri:0.6},0.6),y:c=>nx(c,'c12_b',3,6)+'Ghi được gần trọn nửa khúc; lên núi sau đó biết rõ mình tìm gì.'+fx(c,{money:-m(6),tri:R(1,2),tam:4}),n:c=>nx(c,'c12_b',3,6)+'Tai chưa đủ tinh, bản ghi chép sai nhiều chỗ; mình mất công sao chép.'+fx(c,{money:-m(6),tam:-2})}),
  {l:'Nhờ một bạn nhạc sĩ cùng lên núi, chia nhau việc tìm',f:c=>nx(c,'c12_b',3,6)+'Có bạn đi cùng, đường núi đỡ vắng và đỡ liều; nhưng sau này nửa khúc tìm được sẽ phải chia tên.'+fx(c,{money:-m(4),eq:2,tam:4})}]);
/* ---- tk_a: bà vú già trở về (chuỗi tk_b) ---- */
addOpts('tk_a',c=>[
  pay('Viết thư lên kinh trước, nhờ người quen dò hỏi nhà ấy rồi mới tính đi',8,{f:c=>nx(c,'tk_b',6,14)+'Thư đi thư lại mất gần một năm. Khi lên kinh thì đã biết nhà ấy thế nào, đỡ bỡ ngỡ.'+fx(c,{money:-m(8),eq:1,tam:-1})}),
  {l:'Xin bà vú kể thêm chuyện cũ, giữ kín với cha mẹ nuôi, chưa quyết gì cả',f:c=>'Bà kể đến khuya, rồi mất vài ngày sau. Mình mang một bí mật trong lòng; có đêm không ngủ nổi.'+fx(c,{tam:-5,eq:2,tri:1})}]);
/* ---- tuoc_ky_ngo: thiên tử vi hành ghé nhà ---- */
addOpts('tuoc_ky_ngo',c=>[
  {l:'Tạ ơn rồi xin dâng sớ, xin được góp một việc cho dân vùng này thay vì nhận thưởng',r:RR({eq:1,tri:0.5},0.55),y:c=>{G.grantTitle(c,R(1,2),'được thiên tử khen lòng vì dân');return 'Vua trầm ngâm rồi chuẩn; vùng này được miễn một mùa thuế dịch. Dân khắp nơi ghi ơn nhà mình.'+G.tuocNote()+fx(c,{fame:R(100,140),eq:3,tam:8})},n:c=>'Vua cho rằng sớ này thiếu chuẩn bị, chỉ ban lời khen miệng. Cơ hội qua đi, nhưng tiếng không xấu.'+fx(c,{fame:R(20,40),tam:-2})}]);
/* ---- v62_cg_vo_b: kiếm phổ thất truyền ---- */
addOpts('v62_cg_vo_b',c=>[
  {l:'Trả giá thấp và xin giữ cuộn lụa vài ngày để chép lại',r:RR({tri:0.6,eq:0.5},0.55),y:c=>'Người buôn bằng lòng, mình chép được cả sáu thế rồi mới trả cuộn lụa.'+fx(c,{money:-m(2),vo:R(2,4),tri:1}),n:c=>'Người buôn nghi mình định giữ lụa, đòi lại ngay trong ngày.'+fx(c,{tam:-2,fame:-1})},
  pay('Mời một kiếm sư có tiếng trong vùng cùng xem và chỉ giải',12,{r:RR({vo:0.6,eq:0.5},0.7),y:c=>'Kiếm sư chỉ ra thế nào là hư chiêu, thế nào là sát chiêu. Mình mua lại cuộn lụa với giá hời, và học nhanh hơn hẳn.'+fx(c,{money:-m(12),vo:R(4,6),tam:4,eq:1}),n:c=>'Kiếm sư xem xong chê là chép đời sau, không có gì đáng. Mình mất công mời.'+fx(c,{money:-m(12),tam:-2})})]);
/* ---- f633_gioong: đứa trẻ ba tuổi cất tiếng ---- */
addOpts('f633_gioong',c=>[
  {l:'Giữ kín chuyện, bảo hàng xóm đứa trẻ chỉ mơ ngủ lảm nhảm',f:c=>'Cả nhà dặn nhau không nhắc lại. Đứa trẻ lớn lên bình thường, nhưng thỉnh thoảng nó nhìn về phía xa như nhớ điều gì.'+fx(c,{tam:2,eq:1})},
  pay('Đưa đứa trẻ đến thầy thuốc xem có phải chứng bệnh lạ',3,{f:c=>'Thầy khám xong bảo đứa trẻ tỉnh táo, chỉ nhạy hơn người. Cả nhà yên lòng, thêm một tiếng khen trong làng.'+fx(c,{money:-m(3),tam:5,tri:1})})]);
/* ---- kn_85: giấc mơ tiên tri ---- */
addOpts('kn_85',c=>[
  {l:'Kể giấc mơ cho một cụ già trong làng nghe và hỏi ý',r:RR({eq:0.7,tri:0.3},0.6),y:c=>'Cụ nghe xong, vuốt râu: "Điềm ấy không xấu, chỉ cần sống ngay thẳng." Lời cụ làm lòng mình nhẹ hẳn.'+fx(c,{tam:6,eq:1}),n:c=>'Cụ cười bảo trẻ con mơ vớ vẩn; lời cụ đồn ra, người trong làng chọc mình mấy hôm.'+fx(c,{tam:-3,fame:-1})}]);
/* ---- kn_13: người đàn bà bí ẩn ---- */
addOpts('kn_13',c=>[
  {l:'Hỏi bà là ai và vì sao chọn mình trước khi nghe',r:RR({tri:0.5,eq:0.6},0.55),y:c=>'Bà mỉm cười, đáp rằng chỉ là người từng đi nhiều nơi và nay muốn gửi lại một chuyện. Câu hỏi thẳng thắn làm bà quý mình hơn.'+fx(c,{tam:4,eq:1,tri:1}),n:c=>'Bà chỉ cười không đáp rồi bước đi; mình ngẩn ngơ đứng lại bên cầu.'+fx(c,{tam:-2})}]);
});
