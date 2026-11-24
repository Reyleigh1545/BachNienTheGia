/* Bách Niên Thế Gia v6.3.3 · lô E: biến thể sự kiện theo nghề (nông, buôn, bến, săn, chài, hàng rong, gia nhân, thợ, chăn nuôi)
   Mô-típ mượn từ chính sử, dã sử, truyện dân gian, viết lại bằng tên và chi tiết hư cấu: gươm trong lưới cá, chiếc thuyền hoa trên bãi cát,
   con trăn tinh trong rừng, cây tre trăm đốt, cơ nỏ thần, trống kêu oan, anh hàng rong và ông quan ăn quỵ. */
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
const F=()=>S().farm;
const land=n=>G.landDelta(n);
const kho=(g,q)=>{S().kho[g]=(S().kho[g]||0)+q;return `<span class="fx"><span class="up">Kho: ${G.GOODS[g].n} +${q} ${G.GOODS[g].u}</span></span>`};
const reg=()=>S().region;
const coastal=()=>reg()==='dong'||(G.D.PROV[S().loc&&S().loc.p]||{}).k==='cang';
const J=o=>Object.assign({k:'Việc nghề',w:1,cd:48,age:[16,70]},o);
const K=o=>Object.assign({k:'Kỳ ngộ',ky:1,good:1,u:'person',pcd:200,w:0.6,age:[16,70]},o);
return [
/* ===================== NÔNG ===================== */
J({id:'n633_nong_gieng',t:'Mạch nước dưới ruộng khô',job:['nong'],c:c=>F().own>=1,
 x:c=>`Năm hạn, đất nhà ${N(c)} nứt như da trâu già. Cụ già làng bên bảo dưới góc ruộng phía đông có mạch nước chảy ngầm, nhưng đào xuống không biết sâu bao nhiêu, mà cũng không chắc có.`,
 o:c=>{const pay=m(R(2,4));return [
  {l:`Thuê người đào giếng đủ sâu (${fm(pay)})`,c:()=>G.money()>=pay,r:RR({suc:0.5,cc:0.5,tri:0.4},0.6),y:c=>`Ba hôm sau nước ứa lên đục ngầu rồi trong dần. Giếng cứu được cả đất nhà lẫn hai nhà bên cạnh.`+fx(c,{money:-pay,m:R(3,5),fame:2,tam:5}),n:c=>`Đào xuống chín thước vẫn khô, tiền công mất, ruộng vẫn nứt.`+fx(c,{money:-pay,tam:-4,suc:-2})},
  {l:'Tự đào cùng người nhà, ngày ngày',r:RR({suc:1,cc:0.7},0.5),y:c=>{busy(c,2);return `Hai tháng đào, tay phồng rộp. Nước đến vào đêm cuối, ai cũng ướt như chuột lột vì mừng.`+fx(c,{m:R(4,6),suc:-2,tam:6,hpMax:1})},n:c=>{busy(c,2);return `Đào mãi không ra, người kiệt lực. Cụ già chỉ lắc đầu: "Sai chỗ rồi."`+fx(c,{suc:-6,tam:-5})}},
  {l:'Bỏ ruộng ấy, chờ mưa',f:c=>`Mưa đến muộn một tháng, vụ ấy mất đến hai phần ba.`+fx(c,{money:-m(3),tam:-4})}]}}),
K({id:'n633_nong_trau',t:'Con trâu biết đường',job:['nong'],age:[14,60],tier:[0,2],
 x:c=>`Bão qua, con trâu già nhà ${N(c)} sổng chuồng. Đi tìm ba ngày không thấy. Ngày thứ tư nó tự quay về, kéo theo một chiếc xe cũ gãy trục, trên xe là một cái rương nhỏ bọc vải dầu, chủ nhân đã không còn.`,
 o:c=>[
  {l:'Mở rương xem',f:c=>`Trong rương có ít bạc vụn và một tờ giấy ghi nơi chôn cất. ${N(c)} đến, thấy một nấm mồ sơ sài của người lái buôn. Làm lễ tạ rồi giữ lại bạc.`+fx(c,{money:m(R(4,7)),tam:3,eq:1})},
  {l:'Đem rương lên báo quan, chờ người nhận',f:c=>`Ba tháng không ai nhận. Quan huyện cho nhà mình giữ làm công, có thư khen.`+fx(c,{money:m(4),fame:3,liem:5,tam:4})}]}),
J({id:'n633_nong_sau',t:'Châu chấu về',job:['nong'],c:c=>F().own>=2,cd:96,
 x:c=>`Một đám mây đen kéo lên từ phía nam, không phải mây: châu chấu. Chỉ trong nửa buổi, ruộng bên đã trơ gốc. Cả làng ra đốt rơm, gõ mõ, la hét, ${N(c)} đứng giữa quyết định.`,
 o:c=>[
  {l:'Đốt rạ cả làng, tạo khói đuổi châu chấu',r:RR({cc:0.7,hd:0.5,tri:0.3},0.55),y:c=>`Khói bốc ngút trời, đàn châu chấu rẽ sang phía đồi. Đất nhà giữ được một nửa, cả làng nể mặt.`+fx(c,{fame:3,tam:4,m:R(2,4)}),n:c=>`Gió đổi chiều, khói thổi vào làng, châu chấu vẫn xuống. Mất gần sạch.`+fx(c,{money:-m(3),tam:-5})},
  {l:'Gặt gấp phần lúa chưa chín',f:c=>`Cả nhà gặt như chạy giặc. Lúa non, hạt lép, nhưng còn hơn không có gì.`+fx(c,{money:-m(1),suc:-3,tam:-2})},
  {l:'Cầu trời, ngồi nhìn',f:c=>`Ruộng bị phá sạch. Không còn gì để trách ai.`+fx(c,{money:-m(4),tam:-6})}]}),
/* ===================== TIỂU NHỊ / BÁN HÀNG ===================== */
/* ===================== KHUÂN VÁC / BẾN ===================== */
J({id:'n633_kv_bao',t:'Bao hàng lạ',job:['khuanvac'],age:[16,55],cd:72,
 x:c=>`Khi khuân hàng lên thuyền, ${N(c)} nhận thấy một bao gạo nặng hơn hẳn mức, tiếng kêu leng keng bên trong. Chủ hàng đang đứng xa nói chuyện với nha dịch, ánh mắt thỉnh thoảng nhìn sang.`,
 o:c=>[
  {l:'Giả vờ như không biết, khuân tiếp',f:c=>`Hàng lên thuyền yên ổn. Hôm sau nghe tin thuyền ấy bị bắt vì chở sắt lậu. May mà không ai nhớ mặt.`+fx(c,{tam:-1})},
  {l:'Báo cho cai phu hoặc nha dịch',r:RR({eq:0.8,thanh:0.6,gan:0.3},0.55),y:c=>`Bao gạo bị mở ra trước mắt mọi người: toàn mảnh sắt. Chủ hàng bị bắt, ${N(c)} được thưởng.`+fx(c,{money:m(R(2,4)),fame:3,liem:4,tam:5}),n:c=>`Chủ hàng bỏ chạy, kẻ đồng bọn quay lại đe dọa ${N(c)}. Phải nghỉ việc vài tuần.`+fx(c,{suc:-3,tam:-5})},
  {l:'Nhận tiền bịt miệng của chủ hàng',f:c=>`Một túi bạc nhỏ trượt vào tay. Cả đêm ${N(c)} không ngủ ngon.`+fx(c,{money:m(R(2,4)),liem:-8,tam:-4})}]}),
K({id:'n633_kv_sat',t:'Người vác đá tìm được báu',job:['khuanvac'],age:[16,60],
 x:c=>`Dọn đống đá cũ ở bến, ${N(c)} thấy một viên đá lạ, nặng, màu xanh thẫm. Mang về chùi mới thấy có vân như mây. Người thợ ngọc gần bến nhìn qua cũng giật mình.`,
 o:c=>[
  {l:'Bán cho thợ ngọc',f:c=>`Thợ ngọc trả giá gấp bốn tháng công, ${N(c)} nhận ngay.`+fx(c,{money:m(R(5,10)),tam:6})},
  {l:'Giữ lại làm bùa, không bán',f:c=>`Viên đá để trong áo, mang theo mỗi ngày. Từ đó ${N(c)} cảm thấy bình tâm.`+fx(c,{tam:4,suc:1})},
  {l:'Tặng lại cho chủ bến',f:c=>`Chủ bến thấy thật thà, nâng lương và giao việc cai phu.`+fx(c,{fame:2,eq:1,m:R(3,5),tam:5})}]}),
J({id:'n633_kv_dinh',t:'Đình công ở bến',job:['khuanvac'],age:[18,55],cd:96,
 x:c=>`Chủ bến cắt công một phần ba vì "hàng ít". Anh em phu họp bàn đình công, ai cũng nhìn ${N(c)}, người nói được và đánh được.`,
 o:c=>[
  {l:'Đứng ra làm đầu mối, thương lượng với chủ bến',r:RR({khau:0.8,eq:0.8,gan:0.4},0.5),y:c=>`Chủ bến cân nhắc rồi giữ nguyên công. Anh em coi ${N(c)} như đầu nậu.`+fx(c,{money:m(1),fame:4,eq:1,tam:7}),n:c=>`Chủ bến thuê người khác thay, ${N(c)} bị đuổi.`+fx(c,{fame:-1,tam:-6})},
  {l:'Nhận cắt công, tiếp tục làm',f:c=>`Cả tuần cố làm thêm cho bù. Anh em tiếc.`+fx(c,{money:-m(1),tam:-3})},
  {l:'Kéo anh em ra bãi bên đối diện, nhận hàng trực tiếp',c:c=>c.vo>=45,r:RR({vo:0.6,eq:0.7,muu:0.5},0.4),y:c=>`Bãi mới có chủ hàng hậu hĩnh hơn. Chủ bến cũ phải nhượng bộ.`+fx(c,{money:m(2),fame:3,tam:5}),n:c=>`Chủ bến cũ cho người đánh, bãi mới bị phá.`+fx(c,{suc:-5,tam:-6})}]}),
/* ===================== TIỀU PHU / THỢ SĂN ===================== */
K({id:'n633_tp_tran',t:'Con trăn tinh trong rừng',job:['tieuphu'],age:[16,50],c:c=>c.vo>=45,
 x:c=>`Dân quanh vùng đồn trong khe núi có một con trăn lớn bằng cột đình, nuốt cả trâu. ${N(c)} đốn củi gần đó thì nghe tiếng rít dài, rồi thấy đất đá rung. Bên cạnh là một bó củi không ai nhặt, và dấu vết kéo lê vừa mới.`,
 o:c=>[
  {l:'Cầm rìu đứng chờ, đánh nếu nó ra',r:RR({vo:1,gan:0.8,suc:0.5},0.35),y:c=>`Một nhát rìu trúng vào chỗ yếu sau đầu. Con trăn quằn quại rồi chết. Da nó dài hơn năm sải, bán được rất nhiều tiền, cả vùng đồn tên ${N(c)}.`+fx(c,{money:m(R(8,14)),fame:R(6,10),vo:2,tam:8}),n:c=>`Con trăn quá nhanh, ${N(c)} bị quất ngã, gãy xương sườn. Thoát được nhờ bụi gai.`+fx(c,{suc:-12,tam:-6})},
  {l:'Về báo làng, kêu gọi dân cùng vây',f:c=>`Dân làng vây ba ngày. Con trăn bị bắt, mỗi người một phần thịt và da. ${N(c)} được tiếng cầm đầu.`+fx(c,{money:m(R(4,6)),fame:4,eq:1,tam:5})},
  {l:'Bỏ rừng ấy, tìm lối khác',f:c=>`Không ai trách, nhưng bó củi ấy vẫn nằm đó.`+fx(c,{tam:-2})}]}),
J({id:'n633_tp_het',t:'Rừng cấm của quan',job:['tieuphu'],cd:72,
 x:c=>`Quan huyện ra lệnh cấm đốn gỗ trong rừng phía bắc vì "giữ cho phủ dựng đền". Từ đó củi trong vùng đắt gấp đôi. Chỗ ấy toàn gỗ tốt, và lính canh chỉ có hai người.`,
 o:c=>[
  {l:'Đốn lén vài cây vào đêm tối',r:RR({vo:0.5,muu:0.7,gan:0.6},0.45),y:c=>`Hai đêm, ${N(c)} lén đốn được mười cây. Bán qua tay người quen, tiền gấp ba bình thường.`+fx(c,{money:m(R(3,6)),liem:-5,tam:1}),n:c=>`Lính canh bắt gặp. Phạt nặng và cấm vào rừng một năm.`+fx(c,{money:-m(3),fame:-2,tam:-6})},
  {l:'Chấp hành, đi tìm rừng khác xa hơn',f:c=>`Mất thêm hai ngày đường mỗi chuyến, nhưng yên ổn.`+fx(c,{money:-m(1),suc:-1,tam:-1})}]}),
/* ===================== NGƯ ===================== */
K({id:'n633_ngu_guom',t:'Lưỡi gươm trong lưới',job:['ngu'],age:[16,60],tier:[0,3],
 x:c=>`Kéo lưới sáng sớm, ${N(c)} thấy nặng bất thường. Lên khỏi mặt nước, trong lưới là một lưỡi gươm han gỉ, nhưng chuôi chạm rồng còn rõ, trên thân khắc bốn chữ cổ. Người chài bên cạnh ngó, thở dài: "Của ai bỏ lại đây thì không rõ."`,
 o:c=>[
  {l:'Dâng lên quan huyện',f:c=>`Quan huyện xem rất lâu, trả công rất hậu, và đề nghị đưa vào đền thờ. Danh ${N(c)} được khắc trên bia nhỏ trước đền.`+fx(c,{money:m(R(8,14)),fame:R(5,9),cfame:1,tam:7})},
  {l:'Giữ lại, mài lại cho sáng',r:RR({ky:0.5,vo:0.6,tri:0.3},0.5),y:c=>`Mài ba tháng, lưỡi gươm sáng lên như mới. ${N(c)} tập múa mỗi ngày, cầm lên lòng thấy đặc biệt.`+fx(c,{vo:R(2,4),suc:1,tam:6,fame:2,sk:{ky:2}}),n:c=>`Mài vụng, lưỡi gươm mẻ sâu. Mất đi giá trị, chỉ còn là một lưỡi dao.`+fx(c,{tam:-3})},
  {l:'Thả lại xuống nước, thành kính',f:c=>`Có những thứ không phải của mình để giữ. Lưỡi gươm chìm xuống như chưa từng được kéo lên.`+fx(c,{tam:5,eq:1,liem:3})}]}),
K({id:'n633_ngu_thuyenhoa',t:'Chiếc thuyền hoa trên bãi cát',job:['ngu'],age:[16,32],c:c=>c.mi>=40,
 x:c=>`Bão tan, một chiếc thuyền hoa mắc cạn trên bãi cát, người trên thuyền là một tiểu thư nhà quan cùng mấy thị nữ. Họ sợ hãi, thuyền phu thì hoảng chạy mất. ${N(c)} đang phơi lưới gần đó, nghe tiếng gọi.`,
 o:c=>[
  {l:'Chạy ra giúp kéo thuyền, dựng lều cho họ nghỉ',r:RR({suc:0.8,eq:0.8,mi:0.4},0.55),y:c=>`${N(c)} suốt ngày kéo thuyền, nấu cháo cá, dựng lều bằng lưới. Tối đến tiểu thư ngồi cạnh, hỏi chuyện chài lưới. Khi chia tay, nàng để lại một chiếc trâm bạc: "Nhớ ơn."`+fx(c,{money:m(R(3,6)),fame:3,mi:1,eq:1,tam:8}),n:c=>`Sóng lên nhanh, thuyền kéo không nổi. Họ phải chờ người nhà tới. ${N(c)} chỉ được một lời cảm ơn xã giao.`+fx(c,{suc:-3,tam:1})},
  {l:'Đứng xa nhìn, chờ ai lớn tuổi hơn ra giúp',f:c=>`Có người khác ra giúp trước. ${N(c)} nhìn, thấy mình thiếu một cơ hội.`+fx(c,{tam:-2})}]}),
J({id:'n633_ngu_bao',t:'Bão giữa biển',job:['ngu'],c:()=>coastal(),cd:96,
 x:c=>`Trời đang quang bỗng tối sầm. Sóng nổi từng đợt, thuyền nhỏ của ${N(c)} xoay như chiếc lá. Mấy chiếc khác đã chạy về bến, chỉ còn một thuyền xa hơn đang vẫy cờ cầu cứu.`,
 o:c=>[
  {l:'Chèo ra cứu thuyền bạn',r:RR({suc:0.9,gan:0.8,ky:0.4},0.4),y:c=>`${N(c)} lái thuyền xuyên sóng, kéo được hai người. Về đến bến, cả bến đứng đón. Từ đó ai cũng gọi ${N(c)} là người có nghĩa.`+fx(c,{fame:R(5,9),suc:-4,eq:1,tam:9}),n:c=>`Thuyền bị lật, ${N(c)} chìm xuống rồi trồi lên, trôi đến bãi cát. Mất thuyền, mất lưới, may còn sống.`+fx(c,{money:-m(5),suc:-12,tam:-8})},
  {l:'Chạy về bến trước, lo giữ thuyền mình',f:c=>`Về đến bến an toàn. Chiếc thuyền kia mất. Cả bến không nhắc nhưng ai cũng nhớ.`+fx(c,{fame:-2,tam:-6,eq:-1})}]}),
/* ===================== HÀNG RONG ===================== */
J({id:'n633_hr_gui',t:'Lời nhờ của bà lão',job:['hangrong'],age:[16,55],
 x:c=>`Bà lão bán xôi bên đường nhờ ${N(c)} mang gói đồ lên thị trấn gửi người con trai, bảo "chỉ có một gói bánh". Gói nặng bất thường, ngoài là bánh mà dưới có một bọc bạc vụn dành dụm cả đời.`,
 o:c=>[
  {l:'Mang giúp, đưa nguyên vẹn',f:c=>`Người con trai khóc khi nhận gói. Cả hai nhớ ơn lâu, còn ${N(c)} được trả công và ăn một bữa no.`+fx(c,{money:m(1),fame:2,liem:4,tam:6})},
  {l:'Giữ lại nửa số bạc',f:c=>`Hai ngày đường, ${N(c)} nghĩ đi nghĩ lại. Lương tâm không để yên.`+fx(c,{money:m(R(1,2)),liem:-10,tam:-6})},
  {l:'Từ chối vì đường xa',f:c=>`Bà lão mỉm cười buồn, tìm người khác.`+fx(c,{tam:-1})}]}),
/* ===================== GIA NHÂN ===================== */
J({id:'n633_hau_rac',t:'Việc không ai biết',job:['hau'],cd:72,age:[16,60],
 x:c=>`Quét dọn thư phòng, ${N(c)} thấy một tờ giấy bị vò nhét sau tủ: bản nháp thư gửi quan trên vu cho đối thủ của chủ, kèm lời dặn "đốt đi". Chủ không nhớ để quên, hoặc cố tình.`,
 o:c=>[
  {l:'Đốt đi như lời dặn, không hỏi',f:c=>`Giấy cháy thành tro. Chủ biết ${N(c)} giữ im, mừng thầm. Lương tháng sau nhiều hơn một chút.`+fx(c,{money:m(1),liem:-4,tam:-2})},
  {l:'Cất lại, đề phòng khi cần',r:RR({muu:0.7,eq:0.6,tri:0.4},0.55),y:c=>`Mãi về sau tờ giấy ấy cứu ${N(c)} khỏi một vụ vu oan. Biết giữ là biết sống.`+fx(c,{sk:{muu:2},tam:3}),n:c=>`Chủ phát hiện mất tờ giấy, nghi ngờ. ${N(c)} phải giải thích mãi.`+fx(c,{fame:-1,tam:-5})},
  {l:'Báo cho đối thủ của chủ',f:c=>`Một phần thưởng nhỏ, một bài học lớn: kẻ phản chủ cuối cùng cũng không được ai tin.`+fx(c,{money:m(R(2,4)),liem:-12,fame:-3,tam:-5})}]}),
/* ===================== THỢ ===================== */
J({id:'n633_tho_nhan',t:'Học trò quá giỏi',job:['tho'],age:[30,65],c:c=>c.lv>=2,cd:72,
 x:c=>`Đứa học trò nhỏ ${N(c)} nhận về dạy chưa đầy hai năm đã làm được những đường chạm tinh hơn thầy. Các thợ khác bàn ra tán vào. Có người bảo ${N(c)} nên hãm bớt kẻo mất chỗ.`,
 o:c=>[
  {l:'Dạy hết, cho nó đi xa hơn mình',f:c=>`${N(c)} dốc hết bí quyết. Mấy năm sau học trò trở thành danh tượng, vẫn nhớ treo tên thầy trên cửa xưởng.`+fx(c,{fame:5,eq:1,m:R(3,5),tam:6})},
  {l:'Giữ lại vài chiêu quan trọng',f:c=>`Học trò rất giỏi nhưng thấy thiếu. Hai thầy trò lạnh nhạt dần.`+fx(c,{tam:-2})}]}),
K({id:'n633_tho_vang',t:'Chiếc chuông tìm được tiếng',job:['tho'],age:[25,70],c:c=>c.lv>=3,
 x:c=>`Chùa lớn trong vùng thuê ${N(c)} đúc chuông. Đúc ba lần, ba lần tắc tiếng. Sư trụ trì cầm tay ${N(c)}: "Có kẻ nói nên lấy tiền người làm tế sống. Ta không cho phép. Hãy thử lại đi."`,
 o:c=>[
  {l:'Đúc lần nữa, thử lại hợp kim và độ nguội',r:RR({ky:1,tri:0.6,cc:0.5},0.45),y:c=>`Lần thứ tư, chuông cất tiếng vang xa mười dặm. Người nghe đứng bần thần. Sư trụ trì khấn nguyện, đặt tên ${N(c)} vào bia lớn.`+fx(c,{money:m(R(8,14)),m:R(6,9),sk:{ky:4},fame:R(8,12),cfame:2,tam:10}),n:c=>`Lại tắc tiếng. ${N(c)} suy sụp mấy tuần nhưng sư vẫn tin.`+fx(c,{sk:{ky:1},tam:-6})},
  {l:'Xin từ chối, nhận mình chưa đủ tài',f:c=>`Sư gật đầu. Chùa gọi thợ khác. ${N(c)} ngồi cả đêm nhìn lò.`+fx(c,{tam:-4})}]}),
J({id:'n633_tho_thue',t:'Thuế lò',job:['tho'],cd:72,
 x:c=>`Quan huyện tăng thuế lò, kèm điều lệ mới: mọi mẻ lò phải ghi sổ, có lính xem. Một xưởng nhỏ bên cạnh tuyên bố đóng cửa. Chủ xưởng ghé hỏi ${N(c)} có theo không.`,
 o:c=>[
  {l:'Tuân thủ, nộp thuế đủ',f:c=>`Sổ ghi đủ, thuế nộp đủ. Thợ lành nghề được tin cậy, xưởng giữ được tên.`+fx(c,{money:-m(1),liem:3,tam:-1})},
  {l:'Giấu bớt mẻ lò, ghi ít đi',r:RR({muu:0.7,thanh:-0.3,tri:0.4},0.5),y:c=>`Sổ khớp. Tiền thuế bớt một phần ba.`+fx(c,{money:m(1),liem:-5,tam:1}),n:c=>`Lính bắt quả tang, phạt gấp đôi và đóng lò một tháng.`+fx(c,{money:-m(4),fame:-2,tam:-6})}]}),
/* ===================== CHĂN NUÔI ===================== */
J({id:'n633_chan_benh',t:'Dịch trong chuồng',job:['chan'],cd:72,
 x:c=>`Mấy con bò nhà ${N(c)} bỏ ăn, chảy dãi, đứng không vững. Người nuôi bò xóm bên nói bệnh này lây nhanh, phải cách ly ngay. Chỉ cần chậm một ngày là cả chuồng nhiễm.`,
 o:c=>{const pay=m(R(2,4));return [
  {l:`Mời thầy thú y chữa, tách bò bệnh (${fm(pay)})`,c:()=>G.money()>=pay,r:RR({tri:0.6,ky:0.6,eq:0.3},0.6),y:c=>`Thầy chữa bằng nước lá thuốc và vôi. Mất hai con, còn lại khỏi.`+fx(c,{money:-pay,m:R(3,5),sk:{ky:2},tam:2}),n:c=>`Bệnh lan khắp chuồng. Mất quá nửa.`+fx(c,{money:-pay-m(3),tam:-6})},
  {l:'Giết hai con nặng nhất để chặn lây',f:c=>`Dứt khoát đau lòng, nhưng cứu được phần còn lại.`+fx(c,{money:-m(2),m:R(2,3),tam:-2})},
  {l:'Chờ xem, hy vọng tự khỏi',f:c=>`Hôm sau thêm sáu con ngã bệnh. Cả chuồng mất sạch.`+fx(c,{money:-m(6),tam:-8})}]}}),
K({id:'n633_chan_ngua',t:'Ngựa non đi lạc',job:['chan'],age:[16,60],
 x:c=>`Một con ngựa lạ lẻ loi trong đàn trâu nhà ${N(c)}, lông trắng, yên cương sờn nhưng còn vết chạm rồng. Có vẻ nó thoát khỏi ai đó, và đã đi rất xa.`,
 o:c=>[
  {l:'Nuôi, đợi chủ đến nhận',f:c=>`Ba tháng sau một sứ giả đến tìm, trả công rất hậu, kèm lời: "Ngựa của tướng quân, không dám quên ơn."`+fx(c,{money:m(R(8,14)),fame:5,tam:6})},
  {l:'Giữ làm ngựa giống cho đàn',f:c=>`Con ngựa phối giống rất tốt. Sang năm đàn mình có thêm bốn ngựa non khỏe.`+fx(c,{m:R(3,5),tam:3})+(S().kho.ngua=(S().kho.ngua||0)+1,'')}]})
];
});
