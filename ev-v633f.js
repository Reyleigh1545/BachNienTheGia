/* Bách Niên Thế Gia v6.3.3 · lô F: biến thể sự kiện theo nghề (thầy thuốc, thầy đồ, nghệ nhân, tiêu sư, thư lại, nha dịch, dệt, bà mụ, bếp, địa lý)
   Mô-típ mượn từ dã sử và truyện dân gian, viết lại bằng chi tiết hư cấu: thầy thuốc không lấy tiền người nghèo, cây thuốc cải tử hoàn sinh,
   đứa bé nghèo nghe giảng ngoài cửa lớp, trống kêu oan, bài vè châm biếm quan, cô dâu trốn trong thùng hàng, mảnh gấm cháy dở. */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc,age,alive}=G;
const S=()=>G.S();
const m=v=>G.mm(v);
const fm=v=>G.fmtMoney(v);
const N=c=>esc(c.given);
const NOM={tri:50,vo:46,suc:65,mi:46,eq:46,muu:20,khau:25,ql:16,ky:30,fame:15,m:35,duyen:50};
const TS=(spec,p)=>{let v=0,w=0;for(const k in spec){v+=(NOM[k]!=null?NOM[k]:50)*spec[k];w+=spec[k]}return Math.round(0.93*(w?v/w:50)-9*Math.log(p/(1-p)))};
const RR=(spec,p)=>[spec,TS(spec,p)];
const busy=(c,mo)=>{c.busyUntil=Math.max(c.busyUntil||0,S().t+mo);return ''};
const J=o=>Object.assign({k:'Việc nghề',w:1,cd:48,age:[16,70]},o);
const K=o=>Object.assign({k:'Kỳ ngộ',ky:1,good:1,u:'person',pcd:200,w:0.6,age:[16,70]},o);
return [
/* ===================== Y ===================== */
K({id:'n633_y_caitu',t:'Cây thuốc cải tử hoàn sinh',job:['y'],age:[28,80],c:c=>c.lv>=2,
 x:c=>`Hái thuốc ở triền núi, ${N(c)} thấy một cây lá xanh bạc, rễ đỏ như máu, bên cạnh có xác con chim chết đã lâu mà thân không rữa. Sách cổ nhắc đến loài cây này có tên "hoàn hồn thảo", sống được ba mùa rồi tàn.`,
 o:c=>[
  {l:'Mang về, dùng cứu người sắp chết trong vùng',r:RR({tri:0.8,ky:0.8,m:0.5},0.55),y:c=>`Một đứa bé tắt thở được kéo về sau ba chén nước sắc. Cả vùng đồn là phép lạ. ${N(c)} từ chối nhận công, chỉ ghi chép kỹ phương pháp.`+fx(c,{fame:R(8,12),cfame:2,m:R(5,8),sk:{ky:4},tam:10}),n:c=>`Sắc không đúng lửa, thuốc mất công hiệu. Đứa bé không qua khỏi. ${N(c)} thấy đau.`+fx(c,{fame:-2,tam:-9})},
  {l:'Giữ lại nghiên cứu, ghi chép lại sắc thái từng thời kỳ',f:c=>`Một năm đọc sách, thử nghiệm, ghi chép. Cây tàn nhưng bí quyết còn.`+fx(c,{tri:2,m:R(6,9),sk:{ky:3},tam:5})},
  {l:'Bán cho thương nhân cao giá',f:c=>`Thương nhân trả gấp hai mươi lần thường. Khỏi lo tiền một thời gian, nhưng nghe người ta nói thứ ấy bị dùng làm thuốc ép cho kẻ giàu.`+fx(c,{money:m(R(12,22)),liem:-8,tam:-4})}]}),
/* ===================== SƯ (thầy đồ) ===================== */
K({id:'n633_su_dieu',t:'Đứa bé đứng ngoài cửa lớp',job:['su'],age:[25,70],
 x:c=>`Mỗi buổi dạy, ${N(c)} thấy một đứa bé gầy gò đứng ngoài cửa sổ, nghe giảng từ sáng đến chiều, tay cầm que vạch chữ xuống đất. Hỏi ra mới biết nhà nó nghèo, cha mất, mẹ gánh nước thuê, không có tiền học.`,
 o:c=>[
  {l:'Cho nó vào học miễn phí, ngồi cuối lớp',f:c=>`Đứa bé học nhanh lạ thường, đứng đầu lớp chỉ sau nửa năm. Mẹ nó mang hai bó rau đến tạ, ${N(c)} từ chối nhưng nhận lòng. Vài năm sau, tin đồn đứa bé thi đỗ khắp vùng, nó vẫn còn nhớ thầy.`+fx(c,{fame:R(6,10),cfame:2,m:R(3,5),eq:1,tam:9})},
  {l:'Cho nó học nhờ bằng việc quét lớp',f:c=>`Đứa bé quét lớp, học thuộc bài hơn ai hết. Học trò khác lúc đầu chê, dần dần nể.`+fx(c,{fame:3,m:R(2,3),tam:5})},
  {l:'Đuổi đi vì sợ phụ huynh phàn nàn',f:c=>`Đứa bé nhìn ${N(c)} lần cuối rồi đi. Chuyện ấy ${N(c)} nhớ lâu, mỗi khi có học trò đến muộn.`+fx(c,{tam:-5,eq:-1})}]}),
J({id:'n633_su_ve',t:'Bài vè châm biếm quan',job:['su'],age:[24,65],cd:96,
 x:c=>`Học trò truyền nhau một bài vè chế nhạo quan huyện, câu chữ sắc, vần điệu gọn. Người ta bảo bài ấy ra từ lớp của ${N(c)}. Quan huyện biết chuyện, cho người nhắn "hỏi thăm".`,
 o:c=>[
  {l:'Nhận mình hướng dẫn thiếu sót, xin lỗi',f:c=>`Quan huyện hài lòng vì được nể mặt, dịu giọng, nhưng học trò thất vọng vì thầy cúi đầu.`+fx(c,{fame:-2,tam:-4})},
  {l:'Giảng cho học trò về lẽ phải của lời nói, rồi tìm người chép lại bài vè cho sạch',r:RR({khau:0.9,tri:0.7,eq:0.4},0.5),y:c=>`Học trò hiểu: châm biếm không phải chửi bới. Quan huyện nghe bản chép lại, thấy chỉ ra đúng việc sai, chấn chỉnh vài chuyện.`+fx(c,{fame:5,tri:1,eq:1,tam:6}),n:c=>`Quan huyện không buông, cho ${N(c)} đóng cửa lớp một tháng.`+fx(c,{money:-m(1),fame:-1,tam:-4})},
  {l:'Phủ nhận tất cả, tố học trò nào đó viết',f:c=>`Một học trò bị đuổi oan. ${N(c)} được yên thân, nhưng học trò khác không còn tin thầy nữa.`+fx(c,{fame:-3,liem:-6,tam:-5})}]}),
J({id:'n633_su_do',t:'Học trò đỗ đạt về thăm',job:['su'],age:[35,70],c:c=>c.lv>=2,cd:96,
 x:c=>`Một học trò cũ của ${N(c)} thi đỗ, áo mão về làng, đi qua nhà thầy trước tiên. Anh quỳ lạy, dâng một khay quà và nói: "Hôm nay con có mặt là nhờ thầy dạy lúc nghèo."`,
 o:c=>[
  {l:'Nhận lễ, dặn dò làm quan phải thanh liêm',f:c=>`Học trò cúi đầu nghe. Về sau anh trở thành một vị quan tử tế, vẫn gửi thư thăm thầy mỗi mùa.`+fx(c,{money:m(R(2,4)),fame:R(5,8),cfame:1,eq:1,tam:8})},
  {l:'Từ chối quà, chỉ nhận cái cúi đầu',f:c=>`Học trò ngập ngừng nhưng cúi đầu thật sâu. Cả làng nhìn thấy, hôm sau học trò mới đến xin học nhiều hơn hẳn.`+fx(c,{fame:R(6,9),liem:3,tam:7})}]}),
/* ===================== NGHỆ ===================== */
J({id:'n633_nghe_doithu',t:'Gánh hát đối thủ',job:['nghe'],age:[18,60],cd:72,
 x:c=>`Gánh hát đối thủ cùng thị trấn trả gấp đôi để lôi kéo hai người giỏi nhất gánh nhà ${N(c)}, đồng thời rỉ tai khán giả rằng gánh này "diễn cũ, hết thời".`,
 o:c=>[
  {l:'Soạn vở mới trong mười ngày, diễn thử cho chính họ xem',r:RR({tri:0.7,mi:0.6,khau:0.5},0.5),y:c=>`Vở mới đông nghịt khán giả. Hai người giỏi nhất ở lại, thêm hai người từ gánh đối thủ chuyển sang.`+fx(c,{money:m(R(3,6)),fame:R(4,7),m:R(4,7),tam:8}),n:c=>`Soạn vội nên hụt hơi. Hai người giỏi nhất chuyển đi.`+fx(c,{money:-m(1),fame:-2,tam:-6})},
  {l:'Tăng lương để giữ người',c:()=>G.money()>=m(5),f:c=>`Giữ được người nhưng tiền mất. Cả gánh vẫn sống.`+fx(c,{money:-m(5),tam:1})},
  {l:'Để họ đi, tìm người mới',f:c=>`Gánh yếu đi mấy tháng rồi dần hồi.`+fx(c,{fame:-1,tam:-3})}]}),
J({id:'n633_nghe_lenh',t:'Quan sai hát chúc thọ',job:['nghe'],age:[18,65],cd:96,
 x:c=>`Quan huyện sai ${N(c)} hát chúc thọ mẹ ông tại tiệc. Bà cụ vốn nổi tiếng hà khắc với người ăn kẻ làm. Quan còn dặn thêm: "Hát câu nào khen đức độ của bà ấy cho thật hay."`,
 o:c=>[
  {l:'Hát đúng ý, khen hết lời',f:c=>`Tiếng khen vang cả sảnh, quan thưởng hậu. Dân quanh biết bà cụ là người thế nào, nhìn ${N(c)} với ánh mắt khác.`+fx(c,{money:m(R(2,4)),fame:-1,liem:-4,tam:-2})},
  {l:'Hát một khúc khen công sinh thành, tránh đề cao đức độ',r:RR({khau:0.9,mi:0.6,tri:0.5},0.55),y:c=>`Lời hát khéo, ai nghe cũng tưởng khen mà thực ra chỉ nói công dưỡng dục. Quan hài lòng, dân thở phào. ${N(c)} được thưởng mà vẫn giữ được mặt.`+fx(c,{money:m(R(1,3)),fame:3,sk:{khau:2},tam:5}),n:c=>`Quan nghe ra ý, tái mặt, cho dừng giữa chừng.`+fx(c,{fame:-3,tam:-5})},
  {l:'Từ chối vì cổ họng đau',f:c=>`Quan nhìn lạnh nhạt nhưng không ép. Từ đó ít được gọi đến phủ.`+fx(c,{money:-m(1),tam:-2})}]}),
/* ===================== TIÊU SƯ ===================== */
J({id:'n633_tieu_mai',t:'Chuyến tiêu bị mai phục',job:['tieu'],age:[20,60],cd:72,
 x:c=>`Đoàn tiêu của ${N(c)} đi qua đèo thì có tiếng rít trên cao, cây đổ chắn đường. Mười tên áo đen nhảy xuống, giáo dài. Hàng khách gửi là một chuyến bạc lớn cho một nhà buôn.`,
 o:c=>[
  {l:'Dàn trận đánh trả',r:RR({vo:1,gan:0.7,muu:0.4},0.45),y:c=>`Hai bên giao chiến nửa canh giờ, ${N(c)} chém ngã hai tên, bọn còn lại bỏ chạy. Hàng nguyên vẹn, danh tiếng tiêu cục vang xa.`+fx(c,{money:m(R(4,8)),vo:2,fame:R(5,9),m:R(4,6),tam:7}),n:c=>`Địch đông hơn ước tính, ${N(c)} bị thương nặng, mất một nửa số bạc. Đền cho khách.`+fx(c,{money:-m(R(6,10)),suc:-14,fame:-3,tam:-8})},
  {l:'Chia nhỏ đoàn, cho một người mang bạc đi đường tắt',r:RR({muu:1,tri:0.6,vo:0.4},0.5),y:c=>`Bọn cướp đuổi theo đoàn chính chứa hàng giả. Bạc thật đến nơi an toàn, một chuyến khôn.`+fx(c,{money:m(R(4,8)),sk:{muu:3},fame:5,tam:7}),n:c=>`Người đi đường tắt cũng bị chặn. Mất cả hai đường.`+fx(c,{money:-m(R(6,10)),fame:-3,tam:-7})},
  {l:'Thương lượng, đưa một phần bạc mua đường',c:()=>G.money()>=m(5),f:c=>`Bọn cướp nhận bạc, nhường đường. Hàng đến nơi nhưng tiêu cục phải gánh khoản thiệt.`+fx(c,{money:-m(R(4,6)),fame:-2,tam:-3})}]}),
K({id:'n633_tieu_thung',t:'Cô dâu trong thùng hàng',job:['tieu'],age:[20,55],
 x:c=>`Dừng nghỉ đêm giữa đường, ${N(c)} nghe tiếng thút thít trong một thùng hàng lớn. Mở ra: một cô gái trẻ mặc áo cưới, tóc rối, mắt đỏ hoe. Cô van lạy: "Cha ép tôi gả cho ông già nhà giàu. Xin đừng báo."`,
 o:c=>[
  {l:'Đưa cô đến nhà người thân ở thị trấn kế bên',f:c=>`Cả đoàn giữ im, đưa cô đến nơi an toàn. Vài năm sau có thư báo: cô đã lấy được người mình thương. Kèm theo đó là chiếc khăn thêu tay.`+fx(c,{fame:3,eq:1,tam:8})},
  {l:'Đưa cô trở về, thuyết phục cha cô nghe lại',r:RR({khau:0.9,eq:0.8},0.4),y:c=>`${N(c)} nói chuyện với người cha ba canh giờ. Cuối cùng ông chịu hoãn hôn lễ, hỏi lại ý con.`+fx(c,{fame:4,eq:2,tam:7}),n:c=>`Người cha nổi giận, cho là tiêu cục bắt cóc con gái. Tiêu cục phải xin lỗi và nộp phạt.`+fx(c,{money:-m(3),fame:-3,tam:-6})},
  {l:'Báo cho chủ hàng, giao cô lại',f:c=>`Chủ hàng đưa cô về. ${N(c)} quay đi không dám nhìn mặt cô.`+fx(c,{tam:-5,eq:-1})}]}),
/* ===================== THƯ LẠI / NHA DỊCH ===================== */
J({id:'n633_tl_ho',t:'Hồ sơ bị xóa dòng',job:['thulai'],age:[20,65],cd:72,
 x:c=>`Khi kiểm hồ sơ cuối năm, ${N(c)} phát hiện một dòng quan trọng trong sổ đất bị xóa, thay bằng nét chữ khác. Có kẻ xóa để người này mất ruộng. Cấp trên là người ký sổ.`,
 o:c=>[
  {l:'Tố cáo cấp trên với thanh tra',r:RR({eq:0.7,khau:0.6,gan:0.5},0.4),y:c=>`Thanh tra đối chiếu bản gốc, tìm ra dòng bị xóa. Cấp trên bị khiển trách, ${N(c)} được khen là người ngay thẳng.`+fx(c,{fame:5,liem:5,m:R(4,6),tam:6}),n:c=>`Hồ sơ bị chuyển đi, ${N(c)} bị thuyên chuyển xa.`+fx(c,{fame:-2,tam:-7})},
  {l:'Lặng lẽ chép lại bản gốc từ sổ cũ',r:RR({tri:0.8,muu:0.6,cc:0.4},0.55),y:c=>`${N(c)} khôi phục dòng bị xóa trong một bản sao riêng, cất kỹ. Mai sau ai tra cứu cũng có chỗ dựa.`+fx(c,{tri:1,sk:{muu:2},liem:3,tam:3}),n:c=>`Chép sai ngày tháng, bản sao vô dụng.`+fx(c,{tam:-3})},
  {l:'Coi như không thấy',f:c=>`Một người dân mất đất mà không biết vì sao. ${N(c)} đi qua mỗi ngày đều thấy mệt.`+fx(c,{liem:-4,tam:-4})}]}),
J({id:'n633_nd_vu',t:'Bắt oan người hiền',job:['nhadich'],age:[20,60],cd:96,
 x:c=>`Cấp trên ra lệnh bắt một thầy đồ nghèo với tội "xúi giục dân chúng". ${N(c)} biết thầy ấy chỉ giảng sách, không làm chuyện gì sai. Lệnh có dấu quan, chống lại là mất việc.`,
 o:c=>[
  {l:'Thi hành lệnh nhưng ngầm báo thầy đồ để ông đi lánh',r:RR({muu:0.8,eq:0.6},0.5),y:c=>`Khi nha dịch đến, nhà thầy đã vắng. ${N(c)} được cấp trên khiển trách nhẹ, nhưng sau này thầy ấy tìm đến tạ ơn.`+fx(c,{liem:4,tam:5,eq:1}),n:c=>`Tin lộ ra, ${N(c)} bị đánh gậy vì tội thông đồng.`+fx(c,{suc:-8,fame:-3,tam:-7})},
  {l:'Xin cấp trên xem lại lệnh',r:RR({khau:0.8,eq:0.6,gan:0.4},0.4),y:c=>`Cấp trên miễn cưỡng xem lại, rút lệnh. Thầy đồ vô can, ${N(c)} thở phào.`+fx(c,{fame:3,liem:5,tam:6}),n:c=>`Cấp trên quát: "Ngươi dạy ta đấy à?" ${N(c)} bị trừ nửa tháng công.`+fx(c,{money:-m(1),tam:-5})},
  {l:'Thi hành nguyên vẹn',f:c=>`Thầy đồ bị giam ba tháng. ${N(c)} mất ngủ nhiều đêm.`+fx(c,{liem:-5,tam:-6})}]}),
/* ===================== DỆT / BÀ MỤ / BẾP / ĐỊA LÝ ===================== */
J({id:'n633_mo_dem',t:'Ca đẻ khó giữa đêm',job:['mo'],age:[22,70],cd:60,
 x:c=>`Đêm mưa gió, người nhà gõ cửa ${N(c)}: sản phụ chuyển dạ đã hai ngày, thai ngôi ngược, thầy lang không dám làm. Cả nhà khóc. ${N(c)} nhớ lời thầy dạy: ca này chín phần chết, một phần sống.`,
 o:c=>[
  {l:'Nhận đỡ, lật thai bằng tay',r:RR({ky:0.9,eq:0.8,suc:0.4},0.5),y:c=>`Hai canh giờ không thở, mồ hôi chảy ròng. Tiếng khóc đầu tiên vang lên lúc gà gáy. Cả hai mẹ con cùng sống. Cả làng đồn thổi, nhiều nhà từ đó chỉ gọi ${N(c)}.`+fx(c,{money:m(R(2,4)),fame:R(6,10),m:R(5,8),sk:{ky:3},tam:10}),n:c=>`Thai không xoay được, mẹ sức cạn. Một mạng qua đi. ${N(c)} ngồi thẫn thờ đến sáng.`+fx(c,{fame:-2,tam:-12,suc:-3})},
  {l:'Bảo họ đưa đến thầy thuốc ở thị trấn',f:c=>`Không kịp. Người nhà nhìn ${N(c)} bằng ánh mắt khó tả.`+fx(c,{fame:-1,tam:-8})}]}),
J({id:'n633_dk_dat',t:'Chọn đất cho người mất',job:['diaky'],age:[25,70],c:c=>c.lv>=1,cd:72,
 x:c=>`Hai nhà tranh nhau một mảnh đất làm mộ, cả hai đều mời ${N(c)} xem. Nhà thứ nhất giàu, hứa hậu. Nhà thứ hai nghèo, mới mất người thân, chỉ mong có chỗ yên nghỉ.`,
 o:c=>[
  {l:'Xem công bằng, chỉ đúng thế đất mỗi nhà',r:RR({tri:0.8,eq:0.7,diem:0.3},0.55),y:c=>`${N(c)} chỉ cho nhà giàu mảnh đồi kế bên, đất tốt không kém, còn mảnh gần suối trao nhà nghèo. Cả hai hài lòng. Tiếng công bằng lan xa.`+fx(c,{money:m(R(1,3)),fame:R(4,7),m:R(4,6),tam:7}),n:c=>`Nói không rành mạch làm cả hai nghi. Họ đi tìm thầy khác.`+fx(c,{fame:-2,tam:-4})},
  {l:'Chọn theo người trả nhiều',f:c=>`Nhà nghèo ra về lặng lẽ. Nhà giàu cảm ơn bằng một khoản lớn. ${N(c)} cầm tiền mà thấy tay nóng.`+fx(c,{money:m(R(5,9)),liem:-7,fame:-2,tam:-4})},
  {l:'Từ chối cả hai, bảo thế đất chưa chín',f:c=>`Hai nhà lại nhờ trưởng làng phân xử. ${N(c)} không bị trách nhưng cũng không được gì.`+fx(c,{tam:-1})}]}),
K({id:'n633_dk_hoa',t:'Mảnh đất nở hoa giữa đông',job:['diaky'],age:[28,75],c:c=>c.lv>=2,
 x:c=>`Đi xem thế đất trong mùa rét, ${N(c)} gặp một khoảnh đất tròn giữa sườn đồi: cỏ xanh, hoa rừng nở, trong khi xung quanh sương giá phủ trắng. Mạch đất ấm, nước dưới chân không đóng băng.`,
 o:c=>[
  {l:'Báo cho các nhà có tiếng trong vùng',f:c=>`Vài nhà giàu đến xem, muốn mua. ${N(c)} không nhận hoa hồng, chỉ nhờ họ giữ làm nơi trồng thuốc cho người nghèo. Danh tiếng thầy địa lý lan xa.`+fx(c,{fame:R(6,10),cfame:2,m:R(4,6),tam:9})},
  {l:'Âm thầm giữ chỗ ấy làm nơi mình sau này an nghỉ',f:c=>`${N(c)} dựng một tấm bia gỗ đơn sơ, ghi ngày. Mỗi lần ghé qua đều thấy lòng thanh thản.`+fx(c,{tam:8,suc:1,hpMax:1})},
  {l:'Bán tin cho người trả cao nhất',f:c=>`Một thương nhân trả bạc hậu, mua đất xây dinh. Từ đó không còn ai được đến nơi ấy nữa.`+fx(c,{money:m(R(10,18)),liem:-6,tam:-3})}]})
];
});
