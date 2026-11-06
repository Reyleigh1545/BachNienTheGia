/* Bách Niên Thế Gia v6.3.3 · lô G: quan lại, quân ngũ, hiệp khách, ngự y, chủ nhà, và truyện dân gian chung cho cả gia tộc
   Mô-típ mượn từ chính sử và dã sử: quan xử án bằng mẹo, thử lòng người, ông lão bán nước dưới gốc đa, lão ăn mày là cao thủ, quan tâu thật với vua,
   đứa trẻ ba tuổi bỗng cất tiếng khi có giặc, ba người khách lạ đêm giao thừa, bà đồng nói điều chưa đến. Tên và chi tiết đều hư cấu. */
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
const tense=()=>{const w=S().w;return !!S().war||!!(w&&w.ph&&Object.values(w.ph).some(v=>v>=1))};
return [
/* ===================== QUAN VĂN ===================== */
J({id:'n633_quan_an',t:'Vụ án hai người nhận một con trâu',job:['quan'],age:[22,70],cd:72,
 x:c=>`Hai người nông dân cùng đến công đường nhận một con trâu, đều có người làng làm chứng, đều có tờ giấy mua bán. Thời gian trôi, ${N(c)} nhìn con trâu đứng ngoài sân, thong thả nhai cỏ, không hề có vẻ biết mình đang là nguyên cớ của cả cuộc tranh cãi.`,
 o:c=>[
  {l:'Cho hai người dắt trâu về, xem nó tự đi về nhà ai',r:RR({tri:0.8,muu:0.7,eq:0.5},0.5),y:c=>`Con trâu bước thẳng về nhà người thứ nhất, rồi dừng đúng cổng chuồng. Người thứ hai gục đầu: giấy mua bán là giả, làm chứng là mua chuộc. Cả huyện đồn ${N(c)} xử như thần.`+fx(c,{fame:R(6,10),m:R(4,7),sk:{muu:2},tam:9}),n:c=>`Con trâu đi lòng vòng rồi nằm giữa đường. Cả hai bên cười ầm. ${N(c)} đành xử hòa, mỗi người nhận một nửa giá.`+fx(c,{fame:-2,tam:-4})},
  {l:'Xét tỉ mỉ giấy tờ và hỏi cung từng nhân chứng',r:RR({tri:1,khau:0.6,cc:0.5},0.6),y:c=>`Mất ba ngày nhưng kẽ hở lộ ra: ngày tháng trên giấy mua bán lệch với mùa thu hoạch. Người gian bị phạt, người ngay được trâu.`+fx(c,{fame:4,m:R(3,5),liem:3,tam:5}),n:c=>`Ba ngày xét mà không phân thắng bại. Cả hai nhà cùng ấm ức.`+fx(c,{fame:-1,tam:-4})},
  {l:'Bán trâu, chia đôi tiền cho cả hai bên',f:c=>`Hai bên cùng phật ý nhưng không ai dám kêu. ${N(c)} nhận một khoản lệ phí nhỏ.`+fx(c,{money:m(1),fame:-1,liem:-2,tam:-2})}]}),
K({id:'n633_quan_nuoc',t:'Ông lão bán nước dưới gốc đa',job:['quan'],age:[24,70],
 x:c=>`Trên đường đi công cán, ${N(c)} ghé gốc đa uống bát nước vối. Ông lão bán nước nói chuyện triều chính như người trong cuộc, bảo ${N(c)} đừng nhìn quan trên mà học tật xấu: "Làm quan không khó. Khó là ra khỏi cổng phủ mà dân chào bằng lòng."`,
 o:c=>[
  {l:'Ngồi nghe suốt buổi chiều, ghi nhớ từng lời',f:c=>`Ông không nhắc đến tên, chỉ kể những vụ việc xưa. Cuối buổi, ông cười: "Ta già, chỉ nói vậy thôi." Vài năm sau, ${N(c)} đọc mới hay ông là cựu thượng thư đã cáo quan.`+fx(c,{tri:2,eq:2,liem:5,m:R(5,8),tam:8})},
  {l:'Trả tiền nước gấp mười, cảm tạ rồi đi',f:c=>`Ông ngẩng nhìn, lắc đầu. "Tiền không mua được lời nói." ${N(c)} thấy xấu hổ.`+fx(c,{money:-m(0.5),tam:-3})},
  {l:'Bảo ông đừng bàn chuyện triều chính',f:c=>`Ông im lặng, đưa chén nước, không nói thêm. ${N(c)} đi, lòng thoáng khó chịu.`+fx(c,{tam:-2})}]}),
J({id:'n633_quan_le',t:'Lễ biếu của cấp dưới',job:['quan'],age:[22,70],c:c=>c.lv>=1,cd:60,
 x:c=>`Đầu năm, các chức sắc dưới quyền lần lượt mang lễ đến biếu ${N(c)}: gạo, lụa, rượu, thậm chí một khoản tiền kín đáo. Người đưa ai cũng nói là "tấm lòng". Phía sau tấm lòng ấy là mong được chiếu cố.`,
 o:c=>[
  {l:'Từ chối hết, giải thích rõ lý do',r:RR({eq:0.8,thanh:0.6,khau:0.4},0.55),y:c=>`Có người xấu hổ, có người nể. Năm đó việc công ít điều tiếng. Cả vùng truyền tai nhau ${N(c)} là quan sạch.`+fx(c,{liem:6,fame:R(4,7),tam:6}),n:c=>`Một vài người thấy bị coi thường, về nói xấu sau lưng. Công việc có chút khó khăn.`+fx(c,{liem:3,fame:-1,tam:-3})},
  {l:'Nhận phần nhỏ làm phép, từ chối phần lớn',f:c=>`Cân bằng giữa tình và lý. Không ai trách nhưng lòng ${N(c)} vẫn lấn cấn.`+fx(c,{money:m(R(1,2)),liem:-3,tam:-1})},
  {l:'Nhận hết, ghi sổ người nào đưa gì',f:c=>`Của cải về nhiều, nhưng lòng chẳng yên. Các lễ ấy là món nợ sẽ phải trả bằng quyền hạn.`+fx(c,{money:m(R(4,8)),liem:-12,fame:-2,tam:-5})}]}),
J({id:'n633_quan_de',t:'Lệnh đắp đê giữa mùa gặt',job:['quan'],age:[24,65],c:c=>c.lv>=2,cd:96,
 x:c=>`Trời sắp có lũ, trên ra lệnh đắp gấp đoạn đê yếu nhất, cần ba nghìn phu, mà đang giữa mùa gặt. Dân mà đi phu thì lúa mất, không đi thì đê vỡ. Ngày hạn chót chỉ còn mười hôm.`,
 o:c=>[
  {l:'Chia phu theo phiên, tính công trả bằng lúa kho công',r:RR({ql:0.8,eq:0.8,tri:0.5},0.5),y:c=>`Công bằng nên dân chịu. Đê xong trước ngày lũ, mùa gặt không mất bao nhiêu. Cả huyện nhắc tên ${N(c)}.`+fx(c,{fame:R(6,10),cfame:2,liem:3,sk:{ql:3},m:R(5,8),tam:9}),n:c=>`Tính sai số kho, phu thiếu lương, nhiều người bỏ về giữa chừng. Đê hoàn thành muộn, lũ tràn một phần.`+fx(c,{fame:-4,tam:-8})},
  {l:'Ép dân đi phu cả loạt, ai chống thì phạt',f:c=>`Đê xong đúng hạn nhưng lúa ngoài đồng thối một phần. Dân nhìn ${N(c)} với ánh mắt lạnh.`+fx(c,{fame:-3,liem:-4,tam:-4})},
  {l:'Trích tiền nhà mình thuê thêm phu',c:()=>G.money()>=m(10),f:c=>`Của nhà mình tan theo bùn đất, nhưng đê vững, dân yên.`+fx(c,{money:-m(10),fame:R(7,12),cfame:2,liem:5,tam:8})}]}),
J({id:'n633_quan_xa',t:'Điều lên miền núi',job:['quan'],age:[24,60],c:c=>c.lv>=1,cd:120,
 x:c=>`Lệnh điều ${N(c)} lên miền núi, nơi sương lạnh quanh năm, đường đi hiểm, dân thưa. Nhưng người ta bảo đó là nơi đã sinh ra mấy vị đại thần. Có kẻ đề nghị lo lót để đổi sang nơi tốt hơn.`,
 o:c=>[
  {l:'Nhận chức, lên đường',f:c=>`Mấy năm nơi núi rừng, ${N(c)} học được tiếng dân, dựng trường, mở đường. Tên tuổi vọng về triều.`+fx(c,{fame:R(4,7),m:R(4,7),suc:-2,eq:1,tam:3})},
  {l:'Lo lót để đổi sang nơi khác',c:()=>G.money()>=m(8),f:c=>`Được ở chỗ tốt hơn, nhưng đồng liêu biết chuyện, ngầm xem thường.`+fx(c,{money:-m(8),liem:-8,fame:-2,tam:-3})},
  {l:'Xin hoãn, viện cớ bệnh',f:c=>`Hoãn được nửa năm, rồi cũng phải đi. Lần này thêm một dòng ghi chú xấu.`+fx(c,{fame:-2,tam:-4})}]}),
/* ===================== QUÂN NGŨ ===================== */
J({id:'n633_qn_linh',t:'Tên lính trẻ sợ chiến trận',job:['quan_ngu'],age:[18,50],cd:60,
 x:c=>`Một tên lính mới trong đội ${N(c)} run bần bật mỗi đêm trước ngày hành quân, có hôm nôn cả bữa tối. Các đồng đội cười nhạo. Hắn nhìn ${N(c)} đầy hổ thẹn.`,
 o:c=>[
  {l:'Kể lần đầu ra trận của mình, ngồi bên hắn đến sáng',r:RR({eq:0.9,khau:0.4},0.55),y:c=>`Cậu lính khóc, rồi cười, rồi ngủ. Ngày chiến trận, hắn đứng sau lưng ${N(c)} không lùi một bước. Về sau hắn là người đầu tiên bảo vệ bạn.`+fx(c,{merit:R(5,12),eq:1,fame:2,tam:6}),n:c=>`Lời kể ngượng nghịu, cậu càng lo hơn. Ngày hành quân hắn bỏ chạy.`+fx(c,{merit:-3,tam:-5})},
  {l:'Quát mắng cho tỉnh',f:c=>`Cậu lính cắn răng. Ngày chiến trận hắn xông lên như điên, bị thương. Từ đó không nhìn ${N(c)} nữa.`+fx(c,{eq:-1,tam:-2})},
  {l:'Báo thượng cấp đổi hắn về hậu cần',f:c=>`Cậu lính biết ơn, làm việc hậu cần tận tâm. Đồng đội nửa cười nửa tiếc.`+fx(c,{tam:2})}]}),
K({id:'n633_qn_ngua',t:'Ngựa chiến bị thương',job:['quan_ngu'],age:[18,55],
 x:c=>`Sau trận đánh, ngựa chiến của ${N(c)} gục bên đường, vó trước gãy, mắt long lanh nhìn chủ. Quân y bảo giết đi cho đỡ đau. Nó mang ${N(c)} qua bao trận, đã cứu mạng ba lần.`,
 o:c=>[
  {l:'Xin được chữa, tự chăm sóc nó',r:RR({ky:0.7,eq:0.7,cc:0.5},0.5),y:c=>`Ba tháng nẹp, ba tháng băng, con ngựa đứng dậy, lê từng bước. Một năm sau nó đã chạy được, tuy không nhanh như xưa. Cả đội nhìn ${N(c)} bằng ánh mắt kính trọng.`+fx(c,{fame:3,eq:1,tam:9,merit:R(2,6)}),n:c=>`Vết gãy không lành, con ngựa vẫn phải mất. ${N(c)} ở bên cạnh đến phút cuối.`+fx(c,{eq:1,tam:-5})},
  {l:'Để quân y xử lý',f:c=>`Một nhát gọn gàng. ${N(c)} chôn nó dưới gốc cây bên đường.`+fx(c,{tam:-7})}]}),
J({id:'n633_qn_luong',t:'Quân lương bị cắt xén',job:['quan_ngu'],age:[20,55],c:c=>c.lv>=2,cd:96,
 x:c=>`Lính trong đội than gạo hôi, thịt ít, rượu nhạt. ${N(c)} lần ra: quan hậu cần bớt một phần ba khẩu phần bán chợ đen. Kẻ cầm đầu có thế lực, nhiều đồng đội biết mà không dám nói.`,
 o:c=>[
  {l:'Làm tờ trình lên thượng cấp, có chữ ký của đội',r:RR({khau:0.8,eq:0.8,gan:0.5},0.4),y:c=>`Thượng cấp kiểm kho, bắt quả tang. Quan hậu cần bị cách chức. Anh em coi ${N(c)} như người dám nói.`+fx(c,{merit:R(6,12),fame:5,liem:5,tam:8}),n:c=>`Tờ trình bị chặn. ${N(c)} bị điều ra tiền tuyến nguy hiểm nhất.`+fx(c,{suc:-6,fame:-2,tam:-7})},
  {l:'Âm thầm chia phần lương nhà mình cho đội',c:()=>G.money()>=m(3),f:c=>`Lính ăn no hơn một thời gian. Không ai nói ra nhưng ai cũng biết.`+fx(c,{money:-m(3),eq:1,tam:6})},
  {l:'Nhắm mắt cho qua',f:c=>`Lính đói, ${N(c)} ngượng mỗi lần ăn.`+fx(c,{liem:-3,tam:-3})}]}),
J({id:'n633_qn_lui',t:'Lệnh rút lui trái ý',job:['quan_ngu'],age:[22,55],c:c=>c.lv>=3&&tense(),cd:120,
 x:c=>`Giữa trận, thượng cấp ra lệnh rút lui, bỏ lại một đồn tiền tiêu còn hơn ba mươi người. ${N(c)} nhìn ra: nếu rút ngay, địch chiếm đồn và giết hết số người ấy. Nếu ở lại, trái lệnh sẽ bị xử theo quân pháp.`,
 o:c=>[
  {l:'Dẫn quân đi cứu đồn, chịu tội sau',r:RR({vo:0.8,gan:0.9,muu:0.5},0.4),y:c=>`Cứu được cả đồn, địch phải lùi. Thượng cấp tức giận nhưng chính ông ta phải ghi công cho ${N(c)} vì quân sĩ làm chứng.`+fx(c,{merit:R(15,25),fame:R(6,10),vo:2,tam:9}),n:c=>`Cứu không kịp, mất gần nửa lực lượng. ${N(c)} bị đưa ra tòa quân pháp, hạ cấp.`+fx(c,{merit:-10,suc:-8,fame:-5,tam:-10})},
  {l:'Tuân lệnh rút',f:c=>`Cả quân rút an toàn. Đồn tiền tiêu rơi vào tay giặc. Đêm nào ${N(c)} cũng nghe tiếng gọi.`+fx(c,{merit:2,eq:-1,tam:-10})}]}),
/* ===================== HIỆP KHÁCH ===================== */
K({id:'n633_hiep_an',t:'Lão ăn mày đòi đấu võ',job:['hiep'],age:[18,50],c:c=>c.vo>=50,
 x:c=>`Ở quán trọ, một lão ăn mày vá chằng vá đụp chặn đường ${N(c)}: "Nghe tiếng ngươi võ giỏi. Đấu ba hiệp cho ta xem, thua thì để lại thanh kiếm, thắng ta cho ngươi một bài." Cả quán nín thở.`,
 o:c=>[
  {l:'Nhận lời, đấu ba hiệp',r:RR({vo:1,gan:0.6,diem:0.3},0.35),y:c=>`Hiệp đầu bất phân, hiệp hai lão nhường nửa chiêu, hiệp ba ${N(c)} ngã sấp, nhưng lão bật cười lớn: "Thế là đủ." Lão dạy một bài quyền ngắn rồi biến mất trong đám đông.`+fx(c,{vo:R(3,6),suc:1,fame:R(4,7),tam:8,sk:{muu:2}}),n:c=>`Đấu chưa hết hiệp đầu đã bị quật ngã. Lão ném lại thanh kiếm: "Học thêm mười năm nữa."`+fx(c,{vo:1,suc:-6,fame:-1,tam:-5})},
  {l:'Từ chối, nói võ không để khoe',f:c=>`Lão nhìn ${N(c)} lâu rồi cười buồn: "Phải, nhưng cũng đừng để võ rỉ." Rồi lão đi.`+fx(c,{eq:1,tam:2})},
  {l:'Mời lão ngồi uống rượu rồi tính',f:c=>`Hai người uống đến khuya, lão kể vài chuyện giang hồ cũ. Lão không đòi đấu nữa, chỉ dặn: "Gặp chuyện bất bình thì đừng quay đi."`+fx(c,{eq:1,tam:6,sk:{muu:1}})}]}),
J({id:'n633_hiep_quan',t:'Quán trọ ven đường',job:['hiep'],age:[18,55],cd:72,
 x:c=>`Đêm trọ lại một quán vắng, ${N(c)} nghe tiếng van xin sau bếp: một cô gái bị chủ quán và đồng bọn ép làm việc để trả món nợ cha mẹ bỏ lại. Người trong quán đều làm ngơ, vài người khách cố ý ngó đi.`,
 o:c=>[
  {l:'Xông vào bếp, đánh đám côn đồ',r:RR({vo:1,gan:0.9},0.45),y:c=>`Ba tên côn đồ gục xuống. Chủ quán xin tha, chịu trả tự do cho cô gái và đền bù. ${N(c)} đưa cô đến nơi an toàn.`+fx(c,{vo:1,fame:R(5,9),eq:1,tam:8,liem:3}),n:c=>`Đám côn đồ đông hơn ước tính. ${N(c)} thoát được, cô gái bị bắt lại.`+fx(c,{suc:-8,fame:-1,tam:-8})},
  {l:'Trả nợ giúp cô, nói chuyện phải trái với chủ quán',c:()=>G.money()>=m(5),f:c=>`Chủ quán nhận tiền, ký giấy thả người. Cô gái khóc, không nói thành lời. ${N(c)} đi, lòng nhẹ.`+fx(c,{money:-m(5),fame:3,eq:1,tam:7})},
  {l:'Bỏ đi, không phải việc của mình',f:c=>`Sáng sớm lên đường, ${N(c)} nghe tiếng van xin vang theo. Cả ngày ấy không nói được lời nào.`+fx(c,{liem:-3,tam:-8})}]}),
K({id:'n633_hiep_no',t:'Món nợ ân tình',job:['hiep'],age:[22,60],
 x:c=>`Qua một thị trấn xa, một người đàn ông trung niên chạy ra chặn ${N(c)} giữa đường, quỳ xuống: "Mười năm trước ngài cứu mạng cha tôi ở đèo Ma, tôi tìm khắp thiên hạ để tạ ơn." ${N(c)} chỉ nhớ mơ hồ, như đã làm chuyện đó giữa muôn việc.`,
 o:c=>[
  {l:'Nhận lời mời, ở lại ba hôm',f:c=>`Cả nhà người ấy chăm sóc chu đáo. ${N(c)} nhận ra mình đã gieo hạt mà quên, hạt ấy đã thành cây. Khi đi, họ tặng ngựa tốt và ít bạc.`+fx(c,{money:m(R(3,6)),fame:4,eq:1,tam:9})},
  {l:'Nói đã quên, đừng bận tâm',f:c=>`Người ấy khăng khăng đưa một túi bạc nhỏ. ${N(c)} chỉ nhận một bình rượu.`+fx(c,{eq:1,tam:5,fame:2})}]}),
J({id:'n633_hiep_no2',t:'Lời mời làm hộ vệ',job:['hiep'],age:[20,55],cd:96,
 x:c=>`Một quan lớn trong vùng ngỏ lời mời ${N(c)} làm hộ vệ cho phủ, lương gấp mười lần thợ giỏi. Điều kiện: không hỏi, không nói, không rời khỏi phủ trong ba năm.`,
 o:c=>[
  {l:'Nhận lời',f:c=>`Ba năm, ${N(c)} thấy nhiều điều không muốn thấy. Khi ra đi, túi nặng, đầu nặng hơn.`+fx(c,{money:m(R(15,25)),liem:-6,fame:-2,tam:-4,vo:1})},
  {l:'Từ chối, giữ thân phận tự do',f:c=>`Vị quan nhìn lạnh nhạt. ${N(c)} lên đường, nhẹ gánh nhưng nhẹ túi.`+fx(c,{eq:1,tam:3})},
  {l:'Nhận, nhưng bí mật ghi chép mọi việc',r:RR({muu:0.9,tri:0.6},0.4),y:c=>`Ba năm, một quyển sổ nhỏ chứa những việc làm của quan lớn. Khi cần, đó là món bảo hiểm mạng sống.`+fx(c,{money:m(R(15,25)),sk:{muu:3},liem:-3,tam:2}),n:c=>`Quyển sổ bị phát hiện. ${N(c)} phải bỏ trốn, bị săn đuổi một thời gian.`+fx(c,{suc:-7,fame:-2,tam:-8})}]}),
/* ===================== NGỰ Y ===================== */
J({id:'n633_nguy_thuc',t:'Bệnh án nói thật',job:['nguy'],age:[30,75],cd:120,
 x:c=>`Bệnh của một vị đại thần ngày càng nặng. Ông ta nghi mọi người đều nói dối, chỉ tin ${N(c)}. Hỏi thẳng: "Ta còn sống được bao lâu?" Nếu nói thật, ông sẽ suy sụp, phe cánh ông cũng tan. Nếu nói dối, ông sẽ không kịp lo hậu sự.`,
 o:c=>[
  {l:'Nói thật, nhẹ nhàng, kèm cách sống trọn thời gian còn lại',r:RR({eq:1,khau:0.6,tri:0.6},0.55),y:c=>`Ông im lặng lâu, rồi nói: "Cảm ơn người đã không lừa ta." Ba tháng cuối đời ông sắp xếp việc nước, việc nhà gọn gàng. Triều đình ghi nhận ${N(c)}.`+fx(c,{fame:R(6,10),cfame:2,m:R(5,8),eq:2,tam:7}),n:c=>`Lời nói vụng làm ông tức giận, trục khỏi phủ. Nhưng hôm sau ông gọi lại, im lặng nhận thuốc.`+fx(c,{fame:-1,tam:-3})},
  {l:'Nói dối cho ông yên lòng',f:c=>`Ông hài lòng, ăn ngon, nhưng không lo gì cả. Khi mất, mọi việc dở dang. Phe cánh ông trách ${N(c)} sau lưng.`+fx(c,{fame:-3,eq:-1,tam:-4})}]}),
K({id:'n633_nguy_thuoc',t:'Đơn thuốc cho vị hoàng tử nhỏ',job:['nguy'],age:[30,75],
 x:c=>`Hoàng tử nhỏ sốt cao nhiều ngày, các thầy thuốc bó tay. ${N(c)} nhớ một phương thuốc dân gian chỉ ghi trong sổ tay riêng, ít người dùng vì quá khác thường. Nếu thất bại, mất đầu như chơi.`,
 o:c=>[
  {l:'Dâng phương thuốc ấy, lập giấy tình nguyện chịu tội nếu sai',r:RR({tri:0.9,ky:0.8,gan:0.5},0.5),y:c=>`Ba ngày sau, cơn sốt hạ. Hoàng tử mở mắt, đòi ăn cháo. Triều đình ban thưởng hậu hĩnh, ${N(c)} được ghi tên vào sổ vàng.`+fx(c,{money:m(R(30,60)),fame:R(10,16),cfame:3,m:R(6,10),sk:{ky:4},tam:10}),n:c=>`Phương thuốc không hiệu nghiệm. Hoàng tử không qua khỏi. ${N(c)} bị giam nửa năm rồi mới được thả vì chứng cứ đã dùng thuốc đúng phép.`+fx(c,{fame:-6,suc:-5,tam:-12})},
  {l:'Chỉ dùng các phương thuốc thông thường, tránh rủi ro',f:c=>`Hoàng tử qua khỏi hay không, trời quyết. Lần này may mắn, bệnh tự lui. ${N(c)} được thưởng nhẹ.`+fx(c,{money:m(R(3,6)),fame:2,tam:2})}]}),
/* ===================== CHỦ NHÀ / THƯƠNG ===================== */
J({id:'n633_chu_hun',t:'Thương nhân xin hùn vốn',job:['chu'],age:[24,65],c:c=>G.money()>=m(10),cd:72,
 x:c=>`Một thương nhân trẻ, ăn nói rành rọt, đến xin hùn vốn đưa một chuyến hàng xa. Anh ta kể chi tiết đường đi, thị trường, lợi nhuận. Nghe thì hợp lý. Tên anh ta chưa nghe ai nhắc.`,
 o:c=>{const cap=m(R(8,14));return [
  {l:`Hùn vốn đầy đủ (${fm(cap)})`,c:()=>G.money()>=cap,r:RR({ql:0.7,muu:0.7,tri:0.5},0.5),y:c=>`Chuyến hàng đến nơi, lãi gấp ba. Người thương nhân trả đúng hạn, hẹn mối làm ăn lâu dài.`+fx(c,{money:cap*2,sk:{ql:2},fame:2,tam:6}),n:c=>`Chuyến hàng gặp trộm giữa đường, mất một nửa. Người thương nhân thề trả dần, nhưng chưa bao giờ trả đủ.`+fx(c,{money:-Math.round(cap*0.7),tam:-6})},
  {l:'Hùn một phần nhỏ để thử',c:()=>G.money()>=m(3),f:c=>`Thử trước với số vốn nhỏ. Chuyến này lãi vừa phải, và nhà mình có chỗ để rút khi cần.`+fx(c,{money:m(R(1,3)),sk:{ql:1},tam:2})},
  {l:'Từ chối, nói không hùn với người chưa quen',f:c=>`Thương nhân cúi chào, đi tìm nhà khác. Nghe nói anh ta thành công lớn sau này.`+fx(c,{tam:-1})}]}}),
J({id:'n633_chu_nha',t:'Con cháu tranh tài sản',job:['chu'],age:[40,80],cd:120,
 x:c=>`Tuổi cao, ${N(c)} nghe người nhà thì thầm: đứa này muốn phần đất tốt, đứa kia muốn hồi môn, đứa nọ muốn tách nhà. Chưa ai nói thẳng nhưng bữa cơm nào cũng nặng nề. Giữ im hay dàn xếp trước khi mọi chuyện nổ tung?`,
 o:c=>[
  {l:'Họp cả nhà, nói thẳng ý định và chia trước khi mất',r:RR({eq:1,khau:0.7,ql:0.6},0.5),y:c=>`Cả nhà bình tĩnh nghe. Cuối buổi, mỗi người có phần, có nghĩa vụ, và có trách nhiệm giữ nhà. Không ai tranh nữa.`+fx(c,{fame:3,eq:1,tam:8}),n:c=>`Lời chia khiến một người uất ức. Họ không nói, nhưng quan hệ nguội hẳn.`+fx(c,{tam:-5})},
  {l:'Giữ im, để chuyện tự giải quyết',f:c=>`Mâu thuẫn ngấm ngầm lớn dần. Khi có chuyện, họ cãi nhau trước mặt khách.`+fx(c,{fame:-2,tam:-5})}]}),
/* ===================== TRUYỆN DÂN GIAN CHUNG ===================== */
K({id:'f633_gioong',t:'Đứa trẻ ba tuổi cất tiếng',age:[2,5],c:c=>tense(),
 x:c=>`${N(c)} đã ba tuổi mà chưa nói một câu, cả nhà lo. Hôm ấy tiếng trống quân từ xa vọng về làng, mọi người nháo nhào. ${N(c)} bỗng ngẩng lên, nói rành rọt: "Giặc đến rồi. Cha, mẹ, cho con cái gậy."`,
 o:c=>[
  {l:'Cho đứa trẻ cái gậy tre, ôm nó vào lòng',f:c=>`Cả nhà bật khóc, nửa vì mừng, nửa vì sợ. Đứa trẻ lớn lên với ánh mắt rất sáng, thích nghe chuyện tướng quân.`+fx(c,{vo:R(3,5),suc:2,tam:8,fame:1})},
  {l:'Tạ ơn trời, dắt đứa trẻ đến đình làng',f:c=>`Dân làng kéo nhau đến xem, cụ già sờ đầu nó, lẩm nhẩm đọc câu chúc. Từ đó bọn trẻ trong làng nghe lời nó.`+fx(c,{eq:2,tam:6,fame:2})}]}),
K({id:'f633_khachla',t:'Ba người khách lạ đêm giao thừa',age:[16,80],sea:['dong'],
 x:c=>`Đêm giao thừa, ba người lạ mặt gõ cửa nhà ${N(c)}: một ông lão, một người đàn bà bế con, một chàng trai gầy. Họ xin một chỗ ngủ nhờ. Nhà đã đủ chật, cơm tất niên cũng chỉ vừa.`,
 o:c=>[
  {l:'Mời vào, chia cơm tất niên',f:c=>`Cả nhà ăn chung một mâm. Sáng mùng một, ba người cúi chào đi, nhưng trên bàn có ba món lạ: một thỏi bạc, một bó thuốc quý, một cuốn sổ ghi kinh nghiệm làm ruộng.`+fx(c,{money:m(R(3,6)),tri:1,m:R(3,5),tam:10,fame:2})},
  {l:'Mời vào nhưng dặn giữ yên lặng, đừng làm ồn',f:c=>`Họ ngủ yên, sáng đi sớm, chỉ để lại lời cảm ơn khẽ. Không có phép lạ nào xảy ra.`+fx(c,{tam:2})},
  {l:'Chỉ đường đến chùa gần',f:c=>`Họ cúi đầu rồi đi. Cả nhà ăn tất niên mà thấy thiếu thiếu.`+fx(c,{tam:-4,eq:-1})}]}),
K({id:'f633_gieng',t:'Giếng làng cạn nước',age:[18,70],sea:['ha','thu'],
 x:c=>`Năm hạn, giếng làng chỉ còn một vũng nước đục. Các nhà tranh nhau từng gáo. Nhà ${N(c)} có một giếng riêng vẫn đầy. Hàng xóm ngập ngừng đứng ngoài cổng, không dám xin.`,
 o:c=>[
  {l:'Mở cổng, cho cả xóm lấy nước theo phiên',f:c=>`Mỗi ngày hàng chục người xếp hàng. Nhà bớt yên tĩnh nhưng cả làng nhớ. Năm sau khi nhà gặp khó, nhiều tay xúm vào giúp.`+fx(c,{fame:R(4,8),cfame:2,eq:1,tam:8})},
  {l:'Cho nước nhưng thu ít tiền để trả công người múc',f:c=>`Mọi người đồng ý, cũng không phiền lòng. Chuyện lặng lẽ qua.`+fx(c,{money:m(1),fame:1,tam:1})},
  {l:'Giữ nước cho nhà mình',f:c=>`Bên ngoài ai cũng hiểu, nhưng không ai quên.`+fx(c,{fame:-3,eq:-1,tam:-4})}]}),
K({id:'f633_bado',t:'Bà đồng nói điều chưa đến',age:[20,80],
 x:c=>`Qua chợ phiên, bà đồng già kéo tay ${N(c)} lại, nhìn vào lòng bàn tay lâu thật lâu: "Trong ba năm, nhà này có một việc lớn, sẽ khóc rồi sẽ cười, cuối cùng người ngoài sẽ giúp." Bà không đòi tiền.`,
 o:c=>[
  {l:'Cúi đầu cảm ơn, không đặt nặng',f:c=>`Câu nói ấy cứ vang trong đầu nhiều đêm. Ba năm sau, khi chuyện đến, ${N(c)} nhớ lại và thấy lòng bình thản.`+fx(c,{tam:3,eq:1})},
  {l:'Hỏi kỹ từng điều, biếu bà tiền hương',c:()=>G.money()>=m(1),f:c=>`Bà chỉ cười: "Điềm không nói thêm được." ${N(c)} nghe một lúc thì thấy mình đã tin quá.`+fx(c,{money:-m(1),tam:-1})},
  {l:'Cười, không tin lời đồn thổi',f:c=>`Bà nhìn ${N(c)} rất lâu rồi buông tay. Ba năm sau, có việc xảy ra thật. ${N(c)} chẳng thể không nhớ.`+fx(c,{tam:-2})}]}),
K({id:'f633_cuoi',t:'Cây đa của ông Cuội',age:[6,16],
 x:c=>`Bà cụ đầu làng kể cho đám trẻ nghe chuyện chú Cuội, người có cây thuốc quý, vì quên lời dặn mà bị cây đưa lên trăng. ${N(c)} nghe tới khuya, ngồi lại bên bà thật lâu: "Bà ơi, cây thuốc thật có không?"`,
 o:c=>[
  {l:'Nghe bà kể tiếp, hỏi nhiều điều',f:c=>`Bà cười, chỉ lên trời: "Có đấy, nhưng ai cũng phải tự tìm." ${N(c)} ôm lời đó đi ngủ. Nhiều năm sau, vẫn nhớ.`+fx(c,{tri:1,eq:1,tam:7})},
  {l:'Xin bà dạy cách phân biệt thuốc lá trong vườn',f:c=>`Bà chỉ cho vài loại lá thông thường: lá ngải, lá bạc hà, lá mơ. ${N(c)} nhớ từng cái.`+fx(c,{tri:1,m:R(2,3),sk:{ky:2},tam:5})}]})
];
});
