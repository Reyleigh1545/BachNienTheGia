/* Bách Niên Thế Gia v6.7.0-d3 · Ân oán họ Phạm, phần 2: lịch lên chức của Kiên, bảy đường, trận cuối, cái kết, hậu quả, người nối, chuyện báo thù.
   Dùng G.pm (ev-v670d.js). Mọi con số là ẩn. */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const FM=v=>G.fmtMoney(v);const N=c=>esc(c.given);
const H=G.pm;const {up,E,O,F,after,org,kind,kv,KF,KG,DN,RK,RT,cnt,AA,arc,ORG}=H;
const OR=()=>ORG[org()];
const clanQuan=()=>G.alive().filter(p=>G.inClan(p)&&p.job==='quan');

/* ---------- lịch lên chức của Kiên (không phụ thuộc người chơi) ---------- */
const CAL=(n,t,x,o)=>E('pm_r'+n,t,x,o,{arc:undefined,fixed:1,vonce:false});
const RISE=(n,title,line)=>CAL(n,title,c=>`${line} ${kv('Người ta khen ông là bậc thanh liêm hiếm có.','Tiếng đồn bảo ông xử việc bằng gươm nhiều hơn bằng bút.','Chẳng ai thấy ông làm gì, mà việc cứ thế thành.')} Nhà ${N(c)} nhận được thiếp báo hỷ, kèm một lời mời dự lễ.`,
 c=>[F('Gửi lễ chúc mừng đúng phép',{t:'Lễ vật đi, thiếp tạ về. Họ Phạm ghi nhận nhà mình không gây sự.',u:{ky:-3,hn:3},f:{fame:-1},cost:n*3+3}),
   F('Dự lễ, quan sát cách người ta xếp chỗ ngồi',{t:'Nhà mình thấy rõ ai đứng sau lưng họ Phạm và ai chỉ đứng cho có.',u:{all:2,pf:1,ky:1},f:{},cost:n*2+2}),
   F('Cáo bệnh, không dự',{t:'Thiếp tạ gửi đi, lạnh nhạt. Người ta nhớ nhà mình vắng mặt.',u:{ky:4,hn:2}})]);
const CALS=[
 RISE(1,'Kiên làm Tri phủ','Phạm Trung Kiên được thăng làm Tri phủ, quyền hạn ở tỉnh nhà từ nay thuộc về hắn.'),
 RISE(2,'Kiên làm Bố chánh sứ','Phạm Trung Kiên làm Bố chánh sứ, nắm thuế ruộng cả tỉnh.'),
 CAL(3,'Kiên lên kinh làm Thượng thư',c=>`Phạm Trung Kiên lên kinh làm Thượng thư một bộ. Cả tỉnh mở yến tiễn. Nhà ${N(c)} nghe tin mà lòng nặng: kẻ thù từ nay không còn ở gần để nhìn, cũng không còn ở thấp để với tới.`,
  c=>[F('Gửi thư chúc mừng ngắn gọn',{t:'Thư đi, không hồi âm. Hắn chẳng cần hồi âm.',u:{ky:-2,hn:3},cost:8}),F('Nhờ người ở kinh thành dò xem thế lực hắn',{t:'Tin về nói: hắn đã có chỗ ngồi trong cả hai phe, tiền đổ vào tay hắn như nước.',u:{all:2,pf:2,ky:1},cost:8}),F('Im lặng',{t:'Không thư, không lễ. Cả hai bên đều hiểu.',u:{ky:3}})]),
 CAL(4,'Kiên vào nội các',c=>`Phạm Trung Kiên được phong Đại học sĩ, vào nội các, hàng Nhất phẩm. Từ nay mọi tấu chương đều đi qua tay hắn trước khi tới vua. Nhà ${N(c)} hiểu: chặn đường lên của mình không còn cần phải bí mật.`,
  c=>[F('Gửi lễ, giữ lễ nghi tối thiểu',{t:'Lễ vật được nhận qua tay quản gia. Họ Phạm xem đó là một sự đầu hàng nhỏ.',u:{ky:-2,hn:4},f:{fame:-2},cost:25}),F('Thu thập thêm tin về cách hắn vận hành nội các',{t:'Người của nhà mình nghe ngóng được vài điều: phe nào ngồi ghế nào, ai là người hắn không hoàn toàn nắm được.',u:{all:3,pf:3,ky:2},cost:20}),F('Giữ im, không làm gì cả',{t:'Nhà mình không đáp, không nhờ, không lễ.',u:{ky:3}})]),
 CAL(5,'Kiên nhận hàm Thái sư',c=>`Phạm Trung Kiên được phong hàm Thái sư, đỉnh cao của hàng quan văn. Cờ quạt rợp trời, cả kinh thành mở hội. Nhà ${N(c)} nghe tiếng pháo từ ngàn dặm.`,
  c=>[F('Đưa thiếp chúc mừng qua người quen',{t:'Một cái thiếp nhỏ trong chồng thiếp cao ngất. Không ai đọc.',u:{ky:-1,hn:5},cost:30}),F('Âm thầm gom lại mọi thứ từng thu thập',{t:'Nhà mình sắp xếp lại các hòm giấy, chuẩn bị cho đòn cuối.',u:{pf:2,wit:2,ky:1}}),F('Chờ thời',{t:'Nhà mình biết đỉnh cao cũng là nơi dễ ngã nhất, nếu có tay đẩy.',u:{hn:2}})]),
 CAL(6,'Họ Phạm ở đỉnh quyền lực',c=>`Mười năm qua, họ Phạm ngồi vững trên đỉnh: Thái sư ở nội các, Quốc công ở binh quyền, Thái phi trong cung. Cả triều thở theo nhịp của họ. Nhà ${N(c)} biết đây là lúc khó nhất, và cũng là lúc cuối cùng có "cửa".`,
  c=>[F('Chuẩn bị ra tay trong năm nay',{t:'Mọi bước chuẩn bị được đẩy nhanh. Không còn thời gian để chờ.',u:{ky:4,pf:2}}),F('Củng cố thêm lực lượng, chờ thêm một nhịp',{t:'Nhà mình tập hợp thêm người và tiền. Mỗi năm trôi, họ Phạm cũng mạnh thêm.',u:{all:3,pw:3,ky:2},cost:15}),F('Giữ nguyên thế, không đổi',{t:'Nhà mình đứng yên.',u:{}})])];

/* ---------- bảy đường ---------- */
const ST=(L,n,t,x,o)=>{const id=`pm_${L.toLowerCase()}${n}`,pv=`pm_${L.toLowerCase()}${n-1}`;
  return E(id,t,x,o,{ch:4,vw:8,vc:(c,a)=>a.lock.br===L&&(n===1||(a.done[pv]!=null&&S().t-a.done[pv]>=3))})};
const kK=()=>KF();
const P=[
 ST('P',1,'Thầy cãi thuê',c=>`Nhà mình chọn con đường pháp lý. Việc đầu tiên là chọn người nói thay mình trước tòa. Ba tụng sư chịu nhận vụ này, mỗi người một danh tiếng, một giá, một cách làm.`,
  c=>[O('Tụng sư nổi danh, đắt nhưng chắc',{khau:0.8,tri:0.5},68,{y:'Ông nghiên cứu hồ sơ ba tuần, chỉ ra hai chỗ sơ hở có thể dùng. Nhà mình yên tâm hơn.',yu:{pf:6,all:3},n:'Ông bận vụ khác, giao cho đệ tử. Hồ sơ bị bỏ sót vài chỗ.',nu:{fail:1},cost:25}),
    O('Tụng sư trẻ, nhiệt huyết, giá vừa',{khau:0.7},55,{y:'Anh ta thức đêm, tìm ra một án lệ cũ rất sát. Cái khó là tiếng tăm chưa đủ.',yu:{pf:5,all:1},n:'Anh ta quá nóng, bị tòa nhắc nhở ngay phiên đầu.',nu:{ky:3,fail:1},cost:10}),
    F('Tự soạn đơn, tự đứng nói',{t:'Nhà mình học luật qua đêm, biết thêm nhiều về Đại Minh luật. Tốn công, nhưng không tốn tiền.',u:{pf:3,ky:-1},f:{tam:-3}})]),
 ST('P',2,'Soạn cáo trạng',c=>`Thầy cãi trải ra ba tờ giấy: tội danh nào nên làm trụ chính? Tội nặng thì cần chứng cứ nhiều, tội nhẹ thì dễ bị gạt đi. ${AA().fl.cao?'Tờ cáo trạng dang dở từ trước vẫn nằm trên bàn.':''}`,
  c=>[O('Tham ô và lạm quyền, nêu cả hai',{tri:0.9,khau:0.5},50,{y:'Hai tội kèm nhau, mỗi tội có chứng từ. Tờ trạng dày nhưng vững.',yu:{pf:8,ky:4},n:'Một tội vững, một tội yếu kéo theo cả hai đổ nghiêng.',nu:{fail:1,ky:4}}),
    O('Chỉ tội vu cáo và lạm quyền, tập trung',{tri:0.8,eq:0.5},58,{y:'Gọn, ít kẽ hở. Kiên khó chối.',yu:{pf:5,wit:3,ky:3},n:'Tòa cho rằng phạm vi quá hẹp, không đủ nặng.',nu:{fail:1}}),
    O('Thêm tội thông địch (từ mật thư biên ải)',{tri:0.7,khau:0.6},38,{y:'Tội nặng nhất. Nếu giữ được, Kiên khó thoát.',yu:{pf:12,ky:12,lo:5},n:'Chứng cứ thông địch bị coi là thiếu căn cứ, nhà mình mang tiếng vu cáo.',nu:{fail:2,ky:10,lo:6},nf:{fame:-8},x:{c:(c,d)=>AA().done.pm_d2!=null}})]),
 ST('P',3,'Đệ đơn lên phủ',c=>`Đơn đã xong. Nhưng phủ nha có người của ${KG()}: một thư lại có thể gạt đơn từ khi nhận. Cần chọn đường đệ và cách đệ.`,
  c=>[O('Đệ trực tiếp lên phủ, có người chứng kiến',{eq:0.7,khau:0.6},55,{y:'Đơn được nhận trước mặt đám đông, thư lại không dám giấu.',yu:{pf:3,dt:3,ky:5},n:'Thư lại vẫn nhận, rồi "mất" ngay sau đó.',nu:{fail:1,ky:5}}),
    O('Đệ ở huyện khác, mượn quan nơi ấy đưa lên',{khau:0.8,eq:0.5},50,{y:'Qua tay một quan huyện không quen biết, đơn được chuyển nguyên vẹn.',yu:{pf:3,all:2,ky:3},n:'Quan huyện ấy sợ liên lụy, nhờ vả không thành.',nu:{ky:3},cost:8}),
    O('Đệ cả hai nơi, gửi bản sao lên Đô sát viện',{tri:0.8,khau:0.6},45,{y:'Ba nơi nhận đơn, không ai dám im.',yu:{pf:4,all:3,ky:8},n:'Nhiều bản đơn lan ra, lộ cả ý đồ.',nu:{lo:7,ky:8},cost:10})]),
 ST('P',4,'Gõ trống Đăng Văn',c=>`Phủ nha im lìm. Còn một cách cuối của người dân: tới trước cổng thành gõ trống Đăng Văn, để vua nghe. Gõ trống thì được nghe, nhưng người gõ trống phải chịu đòn nếu không có lẽ phải.`,
  c=>[O('Gõ trống, tự nhận hậu quả',{eq:0.9,vo:0.4},45,{y:'Tiếng trống làm cả kinh thành quay lại. Nhà mình được nghe, trong ánh nhìn của nhiều người.',yu:{dt:8,pf:3,ky:10},yf:{fame:12},n:'Gõ xong, người nhà mình bị giữ lại: "làm loạn". Bị đánh gậy trước cổng thành.',nu:{fail:1,ky:8},nf:{suc:-20,fame:-6}}),
    F('Nhờ người khác gõ giúp, nhà mình đứng sau',{t:'Một người dân gõ trống thay, kể đúng chuyện nhà mình. Nhà mình giữ thân, mất một phần hiệu lực.',u:{dt:3,ky:4,all:2}}),
    F('Không gõ, đi đường thường',{t:'Nhà mình giữ nguyên đường thường, tiếp tục bằng văn bản.',u:{ky:-2}})]),
 ST('P',5,'Đô sát viện nhận đơn',c=>`Đơn tới Đô sát viện. Bên trong, có người sẽ nhận, có người sẽ ém. Mọi việc phụ thuộc vào số đồng minh nhà mình có, và vào tâm tính của nhà vua.`,
  c=>[O('Trông chờ vào vị quan công chính đã quen biết',{eq:0.7,tri:0.6},cnt('all')>=10?72:48,{y:'Vị quan nhận đơn, chuyển lên, ký tên bảo lãnh. Đô sát viện mở hồ sơ.',yu:{all:4,pf:3,ky:4},n:'Vị quan ấy vừa bị điều đi nơi khác. Đơn nằm lại ở tay người lạ.',nu:{fail:1}}),
    O('Nhờ vài người cùng ký, làm tăng sức nặng',{khau:0.8,eq:0.6},55,{y:'Ba chữ ký thêm, đơn nặng hơn. Đô sát viện không thể làm ngơ.',yu:{all:5,pf:2,ky:6},n:'Hai người rút chữ ký ngay phút chót vì sợ.',nu:{all:-2,ky:5}}),
    pay0('Dâng thêm lễ cho thư lại để đơn được xem sớm',20,{f:c=>{up({pf:2,ky:2});return 'Đơn được xếp lên đầu chồng.'+fx(c,{money:-m(20)})}})]),
 ST('P',6,'Kiên phản tố',c=>`${KF()} cũng biết nộp đơn. Hắn kiện ngược: tội vu cáo, tội gây rối, tội thông đồng với người nước ngoài. Tòa nghe cả hai bên.`,
  c=>[O('Trực tiếp đối đáp từng điều',{tri:0.9,khau:0.8},50,{y:'Từng điều bị bẻ gãy. Tòa ghi nhận, và tên Kiên nằm trong sổ tòa.',yu:{pf:5,all:2,ky:5},n:'Một điều bị đánh trúng: nhà mình thiếu nhân chứng ở điểm ấy.',nu:{fail:1,ky:5},nf:{fame:-5}}),
    O('Nhờ tụng sư đối đáp, nhà mình giữ im lặng',{khau:0.7},55,{y:'Tụng sư gỡ từng nút, không để nhà mình lộ thêm.',yu:{pf:4,all:2},n:'Tụng sư bị chọc tức, nói quá lời trước tòa.',nu:{fail:1,ky:4},cost:15}),
    F('Rút lại phần yếu, giữ phần mạnh',{t:'Nhà mình rút bớt một số tội, tập trung vào những gì chắc nhất. Mất mặt, nhưng giữ được lực.',u:{pf:-2,ky:-2,hn:3},f:{fame:-3}})]),
 ST('P',7,'Tam pháp ty hội thẩm',c=>`Vụ án lên cấp cao nhất: Hình bộ, Đô sát viện và Đại lý tự cùng xét. ${KF()} ngồi hàng ghế bên kia, vẻ mặt bình thản. ${RK()===RT[3]||RK()===RT[4]||RK()===RT[5]?'Hình bộ, có thể, đã nằm trong tay hắn.':''}`,
  c=>[O('Dốc chứng cứ ra hết, đánh một lần',{tri:1,eq:0.6},50,{y:'Từng chứng cứ được dâng. Cả ba ty cúi đầu xem, không ai nói gì.',yu:{pf:6,all:3,ky:10},n:'Chứng cứ quá nhiều cũng thành rối. Tam pháp ty hẹn xét lại.',nu:{ky:8,fail:1}}),
    O('Giữ lại vài thứ, chỉ đưa vừa đủ',{tri:0.8,eq:0.8},58,{y:'Vừa đủ để tòa không thể gạt, còn đủ bất ngờ cho phiên sau.',yu:{pf:4,all:2,ky:5},n:'Đưa quá ít, tòa bác vì thiếu căn cứ.',nu:{fail:1,ky:4}}),
    O('Cầu một vị đại thần uy tín ngồi nghe',{khau:0.9,eq:0.6},48,{y:'Vị đại thần ấy ngồi dự thính, lặng lẽ ghi chép. Có mặt ông, tam pháp ty xét công bằng hơn.',yu:{all:5,pf:2,ky:5},n:'Vị đại thần từ chối, viện cớ không can dự.',nu:{ky:3},cost:30})]),
 ST('P',8,'Phiên tòa lớn',c=>`Phiên tòa quyết định đã mở. Cả kinh thành chờ tin. Dù cách nào, sau phiên này sẽ không còn như trước.`,
  c=>[F('Bước vào tòa, kiên định đến cùng',{t:'Nhà mình đứng trước tòa, không lùi. Mọi thứ đã chuẩn bị đều được đặt lên bàn.',u:{pf:2,dt:2,ky:5}}),
    F('Đề nghị hòa giải ngay trước phiên',{t:'Họ Phạm chưa trả lời, nhưng đã nghe.',u:{ky:-4,hn:-4,pf:-2}}),
    F('Xin hoãn phiên, chờ thêm chứng cứ',{t:'Phiên hoãn một tháng. Họ Phạm có thêm một tháng để chuẩn bị.',u:{pf:4,ky:5}})])];
const FG=[
 ST('F',1,'Lời mời của một phe',c=>`Ba phe trong triều cùng nhắm vào nhà ${N(c)}, vì cùng nhìn thấy ở nhà mình một con dao chống Quyền thần: Thanh lưu trọng danh tiết, Hoàng đảng trung với hoàng thất, Thực dụng phái linh hoạt. Mỗi phe đòi một giá khác.`,
  c=>[F('Theo Thanh lưu: đòi liêm khiết và cải cách',{t:'Thanh lưu đón nhà mình bằng bữa trà đạm bạc, và một danh sách việc phải làm: sống thanh, ăn nói thẳng, không nhận quà.',u:{all:7,dt:3,ky:5},then:()=>{G.arc.fork('pm','fac','thanh');return ''}}),
    F('Theo Hoàng đảng: đòi trung thành tuyệt đối với vua',{t:'Hoàng đảng đón nhà mình bằng nghi lễ trang trọng. Che chở lớn, kèm theo cả một sợi dây vào tranh ngôi.',u:{all:8,pw:3,ky:5},then:()=>{G.arc.fork('pm','fac','hoang');return ''}}),
    F('Theo Thực dụng phái: không đòi gì, linh hoạt đôi bên',{t:'Thực dụng phái chẳng đòi gì cả, và chẳng hứa gì cả. Họ nói: "Khi cần, chúng tôi sẽ ở bên."',u:{all:5,ky:3},then:()=>{G.arc.fork('pm','fac','thuc');return ''}})]),
 ST('F',2,'Ký tên vào sớ',c=>`Phe của nhà mình dâng một bản sớ đàn hặc Quyền thần, cần các quan ký tên. Có người dám ký, có người trốn, và có người ký rồi rút.`,
  c=>[O('Ký đứng đầu, nhận phần nặng',{eq:0.9,vo:0.3},46,{y:'Tên nhà mình đứng đầu bản sớ. Cả triều biết, và nhiều người nể.',yu:{all:6,dt:4,ky:9},yf:{fame:6},n:'Sớ bị Quyền thần chặn từ nội các. Tên nhà mình nằm trong sổ đen.',nu:{fail:1,ky:9},nf:{fame:-3}}),
    O('Ký giữa chừng, không nổi bật',{khau:0.6,eq:0.5},60,{y:'Tên nhà mình nằm giữa hàng chữ ký, đủ để được tính mà không bị chú ý.',yu:{all:3,ky:3},n:'Có người xóa tên mình khỏi bản sớ do sợ liên lụy.',nu:{all:-1}}),
    F('Không ký, nhưng giúp thu thập chữ ký',{t:'Nhà mình đi từng nhà từng người, gom tên. Bản sớ có thêm sức nặng nhờ công sức ấy.',u:{all:5,dt:2,ky:2}})]),
 ST('F',3,'Bữa tiệc chia phe',c=>`Một bữa tiệc kín, các phe cùng đến. Nhà ${N(c)} được xếp ngồi cùng với những người có thể giúp, hoặc hại. Một lời nói sai ở đây có thể mất cả liên minh.`,
  c=>[O('Nói ít, nghe nhiều, ghi nhớ từng gương mặt',{tri:0.8,eq:0.6},58,{y:'Biết thêm ba người đáng kết giao và hai người cần cảnh giác.',yu:{all:5,pf:2},n:'Nghe nhiều nhưng không ai tin nhà mình, vì nhà mình quá kín.',nu:{all:-1}}),
    O('Chủ động mời rượu, kết bạn',{khau:0.9,mi:0.6},55,{y:'Nhà mình được mời về dự thêm những buổi khác.',yu:{all:7,ky:3},n:'Mời nhầm người của Quyền thần cài vào. Tin lọt về phía Kiên.',nu:{lo:7,ky:6}}),
    F('Rời tiệc sớm, giữ mình',{t:'Nhà mình về sớm. Có người cho là cẩn thận, có người cho là nhát.',u:{ky:-2}})]),
 ST('F',4,'Tay trong của phe địch',c=>`Một viên thư lại của nội các tự tìm tới nhà ${N(c)}. Hắn nói hắn chán Quyền thần, nhưng không rõ thật hay giả. Nhà mình có thể nhờ hắn lấy tin từ bên trong.`,
  c=>[O('Nhận hắn làm tai mắt, đưa tiền hàng tháng',{khau:0.8,tri:0.6},50,{y:'Hắn mang về tin đều đặn, có tin hữu ích, có tin vô giá.',yu:{pf:8,all:3,ky:4},n:'Hắn là kép của Kiên. Nhà mình bị đưa tin sai để dẫn vào bẫy.',nu:{fail:1,ky:7,lo:6},cost:15}),
    O('Thử hắn bằng một tin giả, xem tin ấy đi đâu',{tri:0.9,muu:0.7},55,{y:'Tin giả không thấy vang lại. Hắn có vẻ đáng tin.',yu:{pf:3,ky:2},n:'Tin giả vang lại đúng chỗ. Hắn là kép, nhưng nhà mình biết ngay.',nu:{lo:3,pf:2}}),
    F('Từ chối, giữ sự an toàn',{t:'Hắn nhún vai bỏ đi. Có thể đã bỏ lỡ gì đó.',u:{ky:-1}})]),
 ST('F',5,'Vụ án thay máu',c=>`Một vụ án nổ ra, và một trong hai phe sẽ phải gánh làm "vật tế". Phe nhà mình hay phe Kiên, tùy vào lá bài chứng cứ và sự ủng hộ của vua.`,
  c=>[O('Đẩy phe địch làm vật tế',{khau:0.8,tri:0.7},46,{y:'Phe Quyền thần mất một người. Nhà mình thêm một phần chắc.',yu:{all:5,pf:5,ky:9},n:'Tai họa đảo chiều: một người của phe nhà mình bị dùng làm vật tế.',nu:{all:-3,fail:1,ky:7},nf:{fame:-5}}),
    O('Cứu người trong phe nhà mình, đánh đổi chút danh',{eq:0.8,khau:0.6},55,{y:'Người ấy thoát, và nhớ ơn nhà mình suốt đời.',yu:{all:6,dt:2,ky:3},n:'Cứu không thành. Phe nhà mình mất người và mất lòng tin.',nu:{all:-3,fail:1}}),
    F('Đứng ngoài cuộc',{t:'Nhà mình không động. Người ta nhớ nhà mình đứng ngoài khi cần.',u:{all:-2,ky:-3}})]),
 ST('F',6,'Vua hỏi ý',c=>`Trong buổi chầu, vua hỏi ý nhà ${N(c)} về một việc triều chính. Cả triều quay sang nhìn. Một câu trả lời đúng có thể được vua chú ý; một câu sai có thể làm hỏng mọi thứ.`,
  c=>[O('Trả lời thẳng, nói rõ lợi hại',{tri:1,eq:0.6},50,{y:'Vua gật đầu, hơi mỉm. Cả triều thấy.',yu:{all:6,dt:3,ky:5},yf:{fame:8},n:'Câu trả lời thẳng đụng vào lợi ích của một đại thần. Ông ta ghi hận.',nu:{ky:7,fail:1},nf:{fame:-3}}),
    O('Trả lời khéo, thuận theo ý vua',{khau:0.9,eq:0.5},56,{y:'Vua hài lòng, phe nhà mình được trọng.',yu:{all:4,ky:2},n:'Vua nghe ra sự nịnh. Tiếng nịnh theo sau nhà mình.',nu:{all:-1},nf:{fame:-3}}),
    F('Xin được tâu sau khi nghiên cứu kỹ',{t:'Vua cho thêm ba ngày. Nhà mình có thời gian chuẩn bị và dò ý các bên.',u:{all:2,pf:2,ky:2}})]),
 ST('F',7,'Phản đòn của phe Quyền thần',c=>`Quyền thần ra đòn lại: một loạt sớ tố cáo nhà ${N(c)} và những người đồng phe. Tố cáo có thật có giả, nhưng dồn dập như bão.`,
  c=>[O('Đối đáp từng tờ sớ, nhờ đồng minh cùng bác',{tri:0.9,khau:0.7},50,{y:'Cả phe cùng bác. Sớ của Quyền thần chững lại.',yu:{all:4,pf:3,ky:6},n:'Có sớ không bác được. Một người bị giáng chức.',nu:{all:-2,fail:1,ky:6},nf:{fame:-4}}),
    O('Phản công ngay, tung chứng cứ có sẵn',{tri:0.8,khau:0.7},44,{y:'Chứng cứ thả đúng lúc làm Quyền thần phải lùi.',yu:{pf:6,ky:10,lo:3},n:'Tung quá sớm, chứng cứ bị bác vì thiếu nhân chứng.',nu:{pf:-3,fail:1,ky:9}}),
    F('Nhún nhường tạm thời, giữ lực',{t:'Nhà mình lùi một bước. Quyền thần cười, nhưng chưa dứt đòn.',u:{ky:-3,all:-1}})]),
 ST('F',8,'Đàn hặc liên danh',c=>`Nhà ${N(c)} cùng phe mình chuẩn bị bản đàn hặc cuối cùng, ký tên liên danh trước điện, buộc vua phải xét. Thành thì Quyền thần đổ, bại thì cả phe mất đầu.`,
  c=>[F('Ký tên đứng đầu',{t:'Tên nhà mình đứng ở đầu bản đàn hặc. Không còn đường lui.',u:{all:4,dt:3,ky:6}}),F('Ký tên ở giữa, cùng gánh',{t:'Nhà mình đứng giữa hàng, chia đều sức nặng.',u:{all:3,ky:3}}),F('Xin lùi lại một phiên',{t:'Phe nhà mình hoãn phiên đàn hặc. Quyền thần được thêm thời gian.',u:{ky:4,all:-1}})])];
const VG=[
 ST('V',1,'Lập đội canh',c=>`Nhà ${N(c)} quyết dùng sức mạnh. Việc đầu là có người để dùng: một đội canh, nhỏ nhưng được huấn luyện nghiêm, đủ để giữ nhà và đủ để làm những việc nhà không tiện làm.`,
  c=>[pay0('Tuyển trai làng khỏe mạnh, huấn luyện cẩn thận',20,{f:c=>{up({pw:10,ky:6});if(G.proj.on('giabinh'))up({pw:4});return 'Mười tám thanh niên, ai cũng có quê quán rõ. Họ luyện sáng chiều, không phàn nàn.'+fx(c,{money:-m(20)})}}),
    pay0('Thuê cựu binh về làm huấn luyện viên',30,{f:c=>{up({pw:14,ky:8});return 'Ba cựu binh già, ít nói, hiểu việc. Cả đội đổi hẳn sau ba tháng.'+fx(c,{money:-m(30)})}}),
    F('Chỉ lập đội canh nhỏ, đủ giữ nhà',{t:'Đội canh nhỏ, nhưng làm đúng việc. Họ Phạm chưa kịp để mắt.',u:{pw:5,ky:2},cost:6})]),
 ST('V',2,'Võ sư tha hương',c=>`Một võ sư trung niên, nghe nói từng thuộc một môn phái giờ đã tan, đến xin trú nhờ ở nhà ${N(c)}. Ông mang theo vết thương cũ trên vai và một nỗi hận mơ hồ với họ Phạm.`,
  c=>[O('Nhận ông làm khách, nhờ dạy võ cho người nhà',{vo:0.7,eq:0.6},58,{y:'Ông dạy tận tình, và cả nhà tiến bộ thấy rõ. Ông kể nhiều chuyện giang hồ.',yu:{pw:8,wit:2,ky:4},n:'Ông dạy được vài tháng thì vết thương cũ tái phát. Đành đưa đi thầy thuốc.',nu:{pw:2},cost:10}),
    O('Nhờ ông dẫn đường vào giới giang hồ',{khau:0.7,vo:0.6},50,{y:'Giới giang hồ mở cửa với nhà mình qua người ông. Nhà mình có thêm vài mối.',yu:{pw:6,all:4,ky:6},n:'Giang hồ nghe tiếng nhà mình dính họ Phạm, không ai dám giúp.',nu:{ky:5}}),
    F('Cho ông tiền rồi mời ông đi, không giữ',{t:'Ông gật đầu, nhận tiền, đi tiếp. Nhà mình không có thêm gì.',u:{},cost:3})]),
 ST('V',3,'Phục kích đoàn thuế',c=>`Một đoàn thuế của huyện, do người của ${KG()} dẫn đầu, sẽ đi qua con đường hẹp. Nếu chặn được đoàn, nhà mình có thể làm họ Phạm mất mặt và mất bạc. Nhưng cướp thuế quan là tội lớn.`,
  c=>[O('Phục kích, lấy một phần rồi để lại',{vo:1,eq:0.5},42,{y:'Chiến thuật gọn gàng: lấy một phần vừa đủ chứng minh nhà mình có thể làm, rồi rút.',yu:{pw:5,ky:12,lo:8},n:'Đoàn thuế có thêm lính hộ tống. Nhà mình bị bắt hai người.',nu:{fail:2,ky:12,lo:10},nf:{fame:-8,tam:-6}}),
    O('Chỉ tung tin sẽ phục kích, để họ tự lo',{khau:0.8,eq:0.6},55,{y:'Đoàn thuế đổi đường, trễ ba ngày, quan trên quở trách. Họ Phạm mất mặt không tốn viên đạn.',yu:{ky:6,dt:2},n:'Không ai tin tin đồn. Đoàn thuế đi bình thường.',nu:{}}),
    F('Bỏ ý định, thấy quá mạo hiểm',{t:'Nhà mình rút. Có tiếc, nhưng cũng nhẹ lòng.',u:{ky:-2}})]),
 ST('V',4,'Đụng độ ngoài chợ',c=>`Một toán tay chân họ Phạm gây sự với người nhà ${N(c)} ngay giữa chợ, có ý khiêu khích. Hai bên đối mặt, cả chợ im phăng phắc.`,
  c=>[O('Đánh trả đến cùng',{vo:1},50,{y:'Nhà mình thắng, và tiếng vang rất lớn. Tay chân họ Phạm tản đi.',yu:{pw:5,ky:9,hn:3},yf:{fame:4},n:'Nhà mình thua nặng, hai người nằm liệt giường.',nu:{fail:1,pw:-3,ky:7},nf:{suc:-18,fame:-3}}),
    O('Lùi khéo nhưng không bỏ chạy',{eq:1,vo:0.5},58,{y:'Nhà mình lùi mà giữ được thể diện. Cả chợ hiểu đó không phải nhát.',yu:{ky:2,dt:3},n:'Lùi quá vội, bị coi là hèn.',nu:{dt:-2},nf:{fame:-3}}),
    O('Nhờ lính tuần can thiệp',{khau:0.7,eq:0.6},55,{y:'Lính tuần tới đúng lúc, ghi tên cả hai bên. Có biên bản.',yu:{pf:2,ky:2,wit:2},n:'Lính tuần đứng về bên họ Phạm.',nu:{ky:4,fail:1}})]),
 ST('V',5,'Mua chuộc đồn lính',c=>`Đồn lính quanh vùng nằm trong tay người của họ Phạm. Nếu nhà mình mua được viên đồn trưởng, hoặc cài người vào, thế sẽ đổi. Nhưng mua chuộc quan quân là tội nặng.`,
  c=>[O('Mua chuộc viên đồn trưởng',{khau:0.9,eq:0.5},45,{y:'Hắn nhận tiền, hứa sẽ "nhắm mắt" khi cần. Nhà mình có người bên trong.',yu:{pw:8,all:3,ky:6,lo:4},n:'Hắn nhận tiền rồi báo lại. Nhà mình bị bắt quả tang đưa tiền.',nu:{fail:2,ky:10,lo:9},nf:{fame:-8},cost:30}),
    O('Cài người của mình vào đồn làm lính',{eq:0.8,khau:0.6},52,{y:'Hai người trẻ nhà mình vào đồn. Họ im lặng làm việc, từ từ lên chức.',yu:{pw:6,wit:2,ky:3},n:'Người cài vào bị lộ, bị đuổi.',nu:{ky:5,lo:5}}),
    F('Từ bỏ ý đồ',{t:'Nhà mình không động đến đồn lính. Giữ sạch tay.',u:{ky:-2}})]),
 ST('V',6,'Bắt một viên chức của Kiên',c=>`Một viên chức tầm trung của ${KG()} đi một mình qua vùng nhà mình, theo một đường thường ngày. Bắt được hắn, nhà mình có người làm chứng sống. Nhưng bắt viên chức triều đình là tội rất nặng.`,
  c=>[O('Bắt và giữ kín, hỏi cho ra',{vo:0.9,tri:0.5},40,{y:'Hắn khai ra vài chuyện then chốt. Nhà mình có thêm bằng chứng sống, và một mối nguy khôn lường.',yu:{pf:10,wit:8,ky:14,lo:10},n:'Hắn thoát ra giữa đêm, chạy về báo. Nhà mình thành kẻ cướp.',nu:{fail:2,ky:14,lo:12},nf:{fame:-10,tam:-8}}),
    O('Không bắt, chỉ theo dõi và ghi chép',{tri:0.8,vo:0.4},58,{y:'Theo dõi hai tháng, nhà mình ghi lại lịch đi lại, người gặp, nơi ngủ.',yu:{pf:5,wit:3,ky:3},n:'Bị phát hiện đang theo dõi, hắn đổi lộ trình.',nu:{lo:3,ky:3}}),
    F('Bỏ qua, chờ cơ hội tốt hơn',{t:'Nhà mình không động. Cơ hội sẽ còn.',u:{}})]),
 ST('V',7,'Đêm đột kích trang viện',c=>`Nhà mình biết trang viện họ Phạm có một kho sổ sách quan trọng, canh gác nhẹ vào đêm trăng non. Đột kích thành thì nhà mình có thể đem được bằng chứng hoặc đánh vào chỗ hiểm. Thất bại thì cả nhà bị coi là phản loạn.`,
  c=>[O('Đột kích đêm, nhanh gọn',{vo:1,eq:0.6},38,{y:'Lấy được sổ sách và rút đi không ai bị thương. Sáng ra, cả huyện xôn xao.',yu:{pf:14,pw:4,ky:15,lo:12},n:'Gặp phục binh. Hai người nhà mình bị bắt, một người chết.',nu:{fail:2,pw:-8,ky:14,lo:14},nf:{fame:-12,tam:-10,suc:-14}}),
    O('Cài người từ bên trong mở cửa',{khau:0.8,vo:0.6},45,{y:'Người cài vào mở cổng. Nhà mình lấy xong và rút lui êm.',yu:{pf:10,pw:3,ky:10,lo:7},n:'Người cài vào bị phát hiện trước giờ.',nu:{fail:1,ky:9,lo:9}}),
    F('Không đột kích, thấy quá nguy hiểm',{t:'Nhà mình giữ nguyên thế.',u:{ky:-2}})]),
 ST('V',8,'Mưu sát mệnh quan hay bắt sống',c=>`Cơ hội đã đến: Kiên sẽ đi qua một con đường ít người, với ít lính hộ tống. Nhà mình có hai lối: giết, hoặc bắt sống. Giết thì xong chuyện, nhưng mưu sát mệnh quan là tội thập ác. Bắt sống thì còn có thể đưa ra pháp luật.`,
  c=>[O('Bắt sống, đưa ra pháp luật',{vo:1,tri:0.6},32,{y:'Kiên nằm trong tay nhà mình. Điều còn lại là chứng minh tội của hắn.',yu:{pw:6,ky:20,lo:15,pf:6},n:'Kế hoạch bại lộ. Kiên chạy thoát, và nhà mình thành kẻ mưu sát mệnh quan.',nu:{fail:3,ky:20,lo:20},nf:{fame:-15,tam:-12}}),
    O('Giết, kết thúc',{vo:1},25,{y:'Một nhát, Kiên đổ. Nhưng tội ấy không có đường chuộc.',yu:{ky:25,lo:25,pw:4},yf:{fame:-5},n:'Thất bại, Kiên còn sống và biết đích danh.',nu:{fail:3,ky:25,lo:25},nf:{fame:-15,tam:-12}}),
    F('Bỏ ý định, thấy quá liều',{t:'Nhà mình lùi lại. Hai bên giữ nguyên thế đối đầu.',u:{ky:-4}})])];
const TG=[
 ST('T',1,'Mua gom nợ',c=>`Nhà mình bắt đầu mua lại những khoản nợ mà các nhà buôn, chủ ruộng khác đang cầm của họ Phạm hoặc các hiệu buôn thân họ Phạm. Nợ nằm trong tay nhà mình là sức nặng sau này.`,
  c=>[pay0('Mua gom mạnh tay',40,{f:c=>{up({pf:8,pw:5,ky:6});AA().fl.no=1;return 'Hàng chục khoản nợ về tay nhà mình, rải rác khắp vùng.'+fx(c,{money:-m(40)})}}),
    O('Mua kín đáo, qua trung gian',{khau:0.9,tri:0.5},55,{y:'Qua ba người trung gian, nhà mình có hơn mười khoản nợ mà họ Phạm không hay.',yu:{pf:6,pw:3,ky:2},n:'Một trung gian lộ tin. Giá nợ vọt lên.',nu:{ky:4,lo:3},cost:20}),
    F('Chỉ mua vài khoản then chốt',{t:'Nhà mình tập trung vào những khoản nợ nặng nhất.',u:{pf:4,pw:2},cost:12})]),
 ST('T',2,'Cắt nguồn hàng',c=>`Các hiệu buôn thân họ Phạm lấy hàng từ vài nguồn nhất định. Nếu nhà mình chặn được các nguồn ấy, họ Phạm sẽ khô máu.`,
  c=>[O('Mua hết hàng ở đầu nguồn',{khau:0.8,mi:0.6},50,{y:'Nhà mình thâu gom được cả vụ. Giá chợ nhảy lên, các hiệu thân họ Phạm lao đao.',yu:{pf:5,pw:3,ky:8},n:'Mua nhiều quá, nhà mình ôm hàng ế.',nu:{pw:-4,ky:5},nf:{tam:-3},cost:40}),
    O('Kết thân với người sản xuất để bán độc quyền cho mình',{khau:0.9,eq:0.6},52,{y:'Người sản xuất mừng vì giá cao. Họ cam kết bán cho nhà mình trước.',yu:{pw:5,all:4,ky:5},n:'Nhà sản xuất ngần ngại vì sợ họ Phạm trả thù.',nu:{ky:3},cost:15}),
    F('Chưa động, quan sát nguồn hàng',{t:'Nhà mình đọc chuyển động giá một mùa, chưa ra tay.',u:{pf:2,ky:-1}})]),
 ST('T',3,'Quỹ chung các nhà buôn',c=>`Một số nhà buôn nhỏ cũng bị họ Phạm chèn ép. Nếu cùng góp quỹ, họ có sức mua và sức bán đáng kể. Nhà mình được mời đứng ra.`,
  c=>[O('Đứng ra cầm đầu quỹ',{khau:0.9,eq:0.7,tri:0.6},50,{y:'Quỹ chung thành lập với mười hai nhà. Sức mua tăng gấp ba.',yu:{all:8,pw:6,ky:8},n:'Nhà buôn ngờ vực nhau, quỹ rạn nứt từ ngày đầu.',nu:{all:2,ky:5}}),
    F('Góp vốn, không đứng tên',{t:'Nhà mình góp một phần, giấu tên.',u:{all:4,pw:3,ky:3},cost:25}),
    F('Từ chối, thấy chia sẻ quyền lợi quá rủi ro',{t:'Nhà mình giữ độc lập.',u:{}})]),
 ST('T',4,'Hắn hạ giá',c=>`Họ Phạm phản đòn: hạ giá bán, lỗ cũng chịu, để ép nhà mình và các nhà buôn khác. Giá hàng sụt, kho đầy.`,
  c=>[O('Cố cầm cự, không hạ theo',{khau:0.7,mi:0.5},48,{y:'Nhà mình giữ giá, họ Phạm lỗ trước. Họ Phạm không thể lỗ lâu.',yu:{pf:3,ky:6,dt:2},n:'Hàng nhà mình ế, vốn đọng lại.',nu:{pw:-5,ky:5},nf:{tam:-4}}),
    O('Hạ theo nửa chừng, chia thiệt',{khau:0.8},55,{y:'Thiệt cho cả hai bên, nhưng nhà mình sống được.',yu:{ky:2},n:'Hạ nửa chừng mà vẫn mất khách.',nu:{pw:-3,ky:3}}),
    F('Rút hàng khỏi chợ, chờ giá hồi',{t:'Nhà mình trữ hàng chờ. Tốn tiền kho, nhưng giữ vốn.',u:{pw:-1,ky:-2},cost:10})]),
 ST('T',5,'Mua chuộc người giữ sổ',c=>`Người giữ sổ của hiệu buôn lớn nhất họ Phạm đang bất mãn vì lương thấp. Nhà mình nhận ra cơ hội, nhưng người này cũng có thể là mồi.`,
  c=>[O('Tiếp cận, trả tiền lớn để lấy bản sao',{khau:0.9,eq:0.6},48,{y:'Một bản sao đầy đủ rơi vào tay nhà mình: nợ, lãi, thuế lậu.',yu:{pf:14,ky:10,lo:6},n:'Người giữ sổ báo lại với chủ. Nhà mình mất bạc và lộ.',nu:{fail:1,ky:10,lo:10},cost:45}),
    O('Cài người của mình làm phụ tá cho ông ta',{eq:0.8,tri:0.6},52,{y:'Người của nhà mình học việc, nhìn sổ từng ngày.',yu:{pf:8,ky:4,lo:3},n:'Cài người mãi không vào được vị trí có thể xem sổ.',nu:{}}),
    F('Không động, đợi dịp khác',{t:'Nhà mình giữ nguyên.',u:{ky:-1}})]),
 ST('T',6,'Tố cáo trốn thuế',c=>`Nhà mình có dữ kiện về việc họ Phạm trốn thuế qua một vài hiệu buôn. Tố cáo với cơ quan thuế là một nước đi sắc bén, nhưng nếu bằng chứng yếu thì chính nhà mình bị cáo vu khống.`,
  c=>[O('Tố cáo với Hộ bộ, kèm bằng chứng đầy đủ',{tri:0.9,khau:0.6},50,{y:'Hộ bộ cử người kiểm. Họ Phạm bị phạt nặng và mất tiếng.',yu:{pf:6,pw:4,ky:12},yf:{fame:6},n:'Hộ bộ kiểm qua loa, kết luận "không có gì".',nu:{fail:1,ky:9}}),
    O('Tố cáo nặc danh, tung tin',{khau:0.9},55,{y:'Tin lan, người ta bàn tán, quan thuế buộc phải xét.',yu:{pf:3,ky:6,dt:3},n:'Tin nặc danh bị coi thường.',nu:{ky:3}}),
    F('Giữ làm con át, chưa tố',{t:'Nhà mình cất tập chứng cứ vào hòm.',u:{pf:3}})]),
 ST('T',7,'Kẻ đứng sau vay tiền',c=>`Một chủ tiền lớn đứng sau các khoản vay của họ Phạm lộ diện, đề nghị nhà ${N(c)} một món làm ăn: ông ta sẽ rút tiền khỏi họ Phạm nếu nhà mình đảm bảo trả lại.`,
  c=>[O('Nhận đề nghị, đứng ra bảo lãnh',{khau:0.9,tri:0.6},48,{y:'Chủ tiền rút vốn, họ Phạm thiếu tiền trầm trọng. Nhà mình mang nợ lớn nhưng thắng thế.',yu:{pw:6,pf:6,ky:12},n:'Họ Phạm tìm được nguồn khác. Nhà mình ôm nợ bảo lãnh.',nu:{pw:-8,fail:1,ky:9},nf:{tam:-6},cost:60}),
    O('Đàm phán điều kiện nhẹ hơn',{khau:1,eq:0.6},52,{y:'Chủ tiền chấp nhận điều khoản thấp, rút một nửa vốn.',yu:{pw:3,pf:3,ky:6},n:'Chủ tiền chê và rút lời.',nu:{ky:3},cost:20}),
    F('Từ chối',{t:'Nhà mình không nhận. Chủ tiền tìm người khác.',u:{ky:-1}})]),
 ST('T',8,'Bóp nghẹt',c=>`Mọi sợi chỉ đã đến tay. Chỉ cần kéo một lúc: khoản nợ, nguồn hàng, sổ sách, quỹ chung. Nhà mình có thể làm họ Phạm khô vốn, hoặc dừng lại, giữ cái đã có.`,
  c=>[F('Kéo tất cả sợi cùng một lúc',{t:'Nhà mình ra đòn dứt khoát. Họ Phạm lao đao.',u:{pf:4,pw:2,ky:10}}),F('Kéo từng sợi một, chậm mà chắc',{t:'Mỗi tuần một sợi. Họ Phạm không kịp hiểu.',u:{pf:2,ky:6}}),F('Dừng lại, giữ',{t:'Nhà mình dừng ở mức đã có.',u:{ky:-3,pw:1}})])];
const MG=[
 ST('M',1,'Phát chẩn mùa giáp hạt',c=>`Mùa giáp hạt, dân đói. Nhà ${N(c)} quyết dốc của phát chẩn, vì danh nghĩa lẫn vì lòng thật. Đây là bước đầu của con đường dân tâm.`,
  c=>[pay0('Phát chẩn rộng rãi, ghi rõ tên nhà mình',60,{f:c=>{up({dt:12,all:3,ky:5});return 'Cả vùng biết nhà mình. Có người khóc, có người cúi lạy.'+fx(c,{money:-m(60),fame:10})}}),
    pay0('Phát chẩn âm thầm, qua chùa',35,{f:c=>{up({dt:8,all:2,ky:2});return 'Qua chùa, người nhận không biết ai cho, nhưng sư thầy nhớ.'+fx(c,{money:-m(35),fame:5})}}),
    F('Chỉ cho bà con thân thích',{t:'Cho ít, nhỏ.',u:{dt:2},cost:10})]),
 ST('M',2,'Dân kéo đến kể oan',c=>`Từ khi nhà mình tiếng tăm, dân quanh vùng kéo đến kể oan khuất, nhiều khi chẳng liên quan đến họ Phạm. Nhưng cũng có những chuyện liên quan.`,
  c=>[O('Nghe hết, ghi chép từng người',{eq:1,tri:0.5},60,{y:'Sổ ghi hơn ba mươi vụ, nhiều vụ dính họ Phạm. Một kho tư liệu dân gian.',yu:{wit:8,dt:7,pf:3,ky:4},n:'Nhiều chuyện ghi chép quá nhập nhằng, không dùng được.',nu:{dt:2}}),
    O('Chọn vài vụ điển hình, giúp đến nơi đến chốn',{khau:0.7,eq:0.7},55,{y:'Ba vụ được giải quyết. Người trong vùng truyền tai nhau.',yu:{dt:9,all:3,ky:5},n:'Một vụ giúp thất bại, nhà mình mang tiếng.',nu:{dt:-2},cost:20}),
    F('Từ chối nghe, thấy quá nhiều',{t:'Dân thất vọng, bớt tin.',u:{dt:-4}})]),
 ST('M',3,'Tin đồn ngược',c=>`Họ Phạm tung tin nhà mình "mua chuộc lòng dân để làm loạn". Một vài người dân bắt đầu hoang mang.`,
  c=>[O('Giải thích công khai, mời dân kiểm chứng',{khau:1,eq:0.6},55,{y:'Dân đến xem sổ chẩn, thấy rõ ràng. Tin đồn bị dập.',yu:{dt:6,ky:3},n:'Giải thích nghe như chối. Dân nghi ngờ thêm.',nu:{dt:-3,ky:3}}),
    O('Nhờ sư thầy, thầy đồ, người có uy tín đứng ra bảo lãnh',{eq:0.8,khau:0.7},58,{y:'Sư thầy và thầy đồ cùng lên tiếng. Dân tin.',yu:{dt:7,all:3},n:'Thầy đồ bị gọi lên huyện, sợ nên im lặng.',nu:{dt:-1}}),
    F('Mặc kệ, tin dân sẽ tự phân biệt',{t:'Dân phân biệt, nhưng chậm.',u:{dt:-1,ky:-1}})]),
 ST('M',4,'Thơ và hịch của sĩ phu',c=>`Vài sĩ phu có tiếng viết thơ, hịch ca ngợi việc nhà mình làm, và nhắc khéo về "kẻ quyền thần lấn lướt". Những bài thơ lan khắp vùng.`,
  c=>[F('Cảm tạ và đáp lễ, giữ mối quan hệ',{t:'Nhà mình đáp lễ bằng rượu, trà và sách. Sĩ phu thêm gắn bó.',u:{dt:5,all:5,ky:6},cost:15}),
    O('Nhờ sĩ phu viết thêm, mở rộng',{khau:0.7,eq:0.7},52,{y:'Nhiều bài thơ, bài phú, lan sang các tỉnh khác.',yu:{dt:9,all:4,ky:12},n:'Một bài hịch bị quan trên coi là phản nghịch. Sĩ phu ấy bị bắt.',nu:{fail:1,ky:12,lo:6},nf:{fame:-5}}),
    F('Nhờ sĩ phu hạ bớt, vì sợ rước họa',{t:'Sĩ phu tiếc nhưng nghe lời.',u:{dt:-2,ky:-3}})]),
 ST('M',5,'Vạn dân thư',c=>`Một sáng kiến lớn: soạn một bản thỉnh nguyện, thu thập chữ ký hoặc dấu tay của hàng nghìn người dân, dâng lên triều đình. "Vạn dân thư" sẽ nặng hơn mọi lời kiện.`,
  c=>[O('Dẫn đầu, đi từng làng thu dấu tay',{eq:0.9,khau:0.7},50,{y:'Tám nghìn dấu tay trong một mùa. Nhà mình mệt nhưng vững.',yu:{dt:12,all:4,ky:10},yf:{fame:8},n:'Quan địa phương ngăn cản, thu được ít, bị gọi là kích động dân.',nu:{dt:3,ky:10,fail:1},nf:{fame:-4}}),
    O('Nhờ sĩ phu, thầy đồ đi thu thay',{khau:0.7,eq:0.7},55,{y:'Mỗi người một vùng, tổng cộng nhiều hơn dự tính.',yu:{dt:9,all:6,ky:6},n:'Vài vùng ngại, số dấu tay ít.',nu:{dt:2,ky:4}}),
    F('Rút bớt quy mô, chỉ thu trong huyện',{t:'Một nghìn dấu tay. Nhỏ nhưng vững.',u:{dt:4,ky:3}})]),
 ST('M',6,'Quỳ trước phủ',c=>`Hàng trăm người dân, dẫn đầu là nhà ${N(c)}, quỳ trước phủ nha ba ngày, xin gặp quan. Cả huyện đổ về xem. Quan phủ lúng túng.`,
  c=>[O('Quỳ cùng dân, ba ngày không về',{eq:1,vo:0.4},50,{y:'Ngày thứ ba, quan phủ ra gặp, nhận đơn. Cả dân reo hò.',yu:{dt:12,all:4,ky:10},yf:{fame:10},n:'Ngày thứ hai, lính ập tới đánh đuổi. Nhiều người bị thương.',nu:{dt:-4,fail:1,ky:10},nf:{suc:-12,fame:-5}}),
    O('Để dân quỳ, nhà mình lo việc đàm phán sau',{khau:0.8,eq:0.6},52,{y:'Nhà mình đàm phán với quan phủ qua cửa sau. Dân được giải tán, đơn được nhận.',yu:{dt:6,all:3,ky:5},n:'Đàm phán không thành, dân giải tán thất vọng.',nu:{dt:-2}}),
    F('Hủy cuộc quỳ, thấy quá mạo hiểm',{t:'Dân tản đi, có người nản.',u:{dt:-5,ky:-2}})]),
 ST('M',7,'Bị bắt vì tụ tập',c=>`Sau cuộc quỳ, quan phủ ra lệnh bắt người cầm đầu "tụ tập gây rối". Người nhà mình bị giam. Một thử thách thật sự.`,
  c=>[O('Dân kéo đến xin tha, cả vùng đứng lên',{eq:0.9,khau:0.6},50,{y:'Dân chen kín cổng nhà giam. Quan phủ buộc phải thả.',yu:{dt:8,all:3,ky:7},yf:{fame:8},n:'Dân sợ, không dám đến nhiều. Người nhà mình ở tù thêm.',nu:{dt:-3,fail:1,ky:5},nf:{tam:-6}}),
    pay0('Lo lót, chuộc người ra',30,{r:[{khau:0.8},56],y:c=>{up({ky:2});return 'Người nhà được thả, gầy sọm.'+fx(c,{money:-m(30),tam:-3})},n:c=>{up({fail:1,ky:5});return 'Tiền đi, người ở lại.'+fx(c,{money:-m(30),tam:-6})}}),
    F('Nhờ đồng minh kêu cứu lên cấp trên',{t:'Có người kêu cứu thay, nhà mình chờ.',u:{all:3,ky:4}})]),
 ST('M',8,'Thanh nghị chấn động',c=>`Sau chuỗi sự kiện, dư luận cả nước bàn tán về nhà ${N(c)} và họ Phạm. Sĩ phu viết, dân hát, và ngay trong triều cũng có người nhắc. Thanh nghị đạt đỉnh.`,
  c=>[F('Giữ giọng bình thản, tiếp tục theo đường',{t:'Nhà mình không để dư luận cuốn đi, tiếp tục lặng lẽ.',u:{dt:4,ky:4}}),F('Nhân đà, đẩy mạnh cuối cùng',{t:'Nhà mình tung bản tổng kết, thu thập mọi tiếng nói lại.',u:{dt:6,all:3,ky:8}}),F('Rút bớt, tránh tiếng lớn quá',{t:'Nhà mình lùi lại một bước.',u:{dt:-2,ky:-4}})])];
const LG=[
 ST('L',1,'Gõ cửa họ Nguyễn',c=>`Nhà mình quyết hợp các họ bị hại. Nhà đầu tiên là họ Nguyễn, thế gia trong vùng, mối ân oán với họ Phạm là chuyện nước đục cò của hai đời trước.`,
  c=>[O('Đích thân tới, kể thẳng',{eq:0.9,khau:0.7},55,{y:'Gia chủ họ Nguyễn nghe hết, gật gù: "Nhà tôi chờ ngày này lâu lắm."',yu:{all:10,ky:4},n:'Gia chủ họ Nguyễn nghe lịch sự rồi tiễn khách.',nu:{ky:3}}),
    F('Gửi lễ trước, nhờ người nói giùm',{t:'Lễ vật được nhận, câu trả lời chưa tới.',u:{all:4,ky:1},cost:15}),
    F('Chờ họ Nguyễn tự tìm tới',{t:'Không ai tới.',u:{}})]),
 ST('L',2,'Gõ cửa họ Kiều',c=>`Họ Kiều giàu có, thiên về buôn bán. Họ Kiều bị họ Phạm chiếm ba tuyến hàng, nhưng ngại đối đầu.`,
  c=>[O('Đề nghị chia lợi ích khi thắng',{khau:0.9,mi:0.6},55,{y:'Họ Kiều nghe tới chữ "chia" thì sáng mắt. Họ nhận lời.',yu:{all:9,pw:3,ky:4},n:'Họ Kiều ngần ngại, chờ xem gió.',nu:{ky:2}}),
    pay0('Biếu lễ, gợi ý ý định bằng chuyện cũ',20,{f:c=>{up({all:5,ky:2});return 'Họ Kiều hiểu ý, đáp lại bằng vài lời hữu hảo.'+fx(c,{money:-m(20)})}}),
    F('Bỏ họ Kiều, đi nhà khác trước',{t:'Nhà mình đổi hướng.',u:{}})]),
 ST('L',3,'Gõ cửa họ Vũ',c=>`Họ Vũ là họ võ, có người trong quân đội. Nếu họ Vũ nhập minh, thế lực quân sự sẽ khác đi.`,
  c=>[O('Gặp trực tiếp tộc trưởng họ Vũ',{vo:0.7,eq:0.8},50,{y:'Tộc trưởng họ Vũ bảo: "Họ Phạm từng cướp công của ông cố tôi trên chiến trường." Họ nhập minh.',yu:{all:10,pw:5,ky:5},n:'Tộc trưởng từ chối thẳng, sợ liên lụy.',nu:{ky:3}}),
    F('Nhờ người trong quân làm cầu nối',{t:'Người trong quân gật đầu, hẹn gặp lại.',u:{all:5,ky:2}}),
    F('Không động đến họ Vũ',{t:'Nhà mình bỏ qua họ Vũ.',u:{}})]),
 ST('L',4,'Gõ cửa họ Dương',c=>`Họ Dương là họ nho, nhiều người đỗ đạt, có tiếng trong sĩ lâm. Họ Dương coi trọng danh nghĩa, sẽ đồng ý nếu thấy "chính nghĩa".`,
  c=>[O('Trình bày với danh nghĩa chính trực',{tri:0.8,eq:0.9},55,{y:'Gia chủ họ Dương thở dài: "Đã đến lúc." Ông nhận lời.',yu:{all:10,dt:4,ky:4},n:'Họ Dương chê nhà mình dùng thủ đoạn.',nu:{ky:3,dt:-2}}),
    F('Nhờ sĩ phu có tiếng giới thiệu',{t:'Sĩ phu viết thư tiến cử. Họ Dương cân nhắc.',u:{all:6,ky:2},cost:12}),
    F('Hoãn, chờ có thêm chứng cứ',{t:'Nhà mình chờ.',u:{pf:2}})]),
 ST('L',5,'Hội minh',c=>`Các họ đã nhận lời. Đến lúc họp mặt chính thức, lập minh ước, chia phần: ai lo gì, ai nhận gì, ai đứng tên.`,
  c=>[O('Chủ trì hội minh, đề nghị lề lối chung',{khau:0.8,eq:0.9,tri:0.6},50,{y:'Minh ước được lập, mỗi họ ký tên. Nhà mình giữ phần nặng.',yu:{all:12,pw:6,ky:10},n:'Các họ cãi nhau về chia phần, hội minh rạn nứt.',nu:{all:-3,ky:6}}),
    F('Để họ Dương chủ trì, nhà mình ngồi bên',{t:'Họ Dương làm chủ, nhà mình bớt nổi bật.',u:{all:8,ky:5}}),
    F('Chia việc rõ ràng, mỗi họ một phần nhỏ',{t:'Mọi họ có phần việc, ít tranh nhau.',u:{all:9,pw:3,ky:6}})]),
 ST('L',6,'Kẻ phản trong minh',c=>`Trong minh có kẻ phản: tin về các cuộc họp kín bị rò ra ngoài. Nhà mình phải tìm ra, hoặc đối phó bằng cách khác.`,
  c=>[O('Dựng bẫy tin giả, tìm kẻ phản',{tri:0.9,muu:0.8},52,{y:'Tin giả vang lại từ một người họ Kiều. Hắn bị lộ, nhưng nhà mình chưa vạch mặt.',yu:{all:2,pf:2,ky:4,lo:-4},n:'Dựng bẫy hụt, kẻ phản tiếp tục.',nu:{all:-3,lo:7,ky:6}}),
    F('Thẳng thắn nói trước cả minh',{t:'Cả minh sững sờ, có người chột dạ. Một người bỏ đi giữa buổi.',u:{all:-2,lo:-3,ky:2}}),
    F('Giữ kín, hạn chế thông tin trong minh',{t:'Từ nay chỉ vài người biết kế hoạch.',u:{all:-1,lo:-4}})]),
 ST('L',7,'Kiên chia rẽ đồng minh',c=>`${KF()} biết có minh ước. Hắn ra tay chia rẽ: ve vãn họ này, dọa họ kia, mua chuộc họ nọ. Minh ước chưa vững sẽ gãy.`,
  c=>[O('Gặp từng họ, củng cố lòng tin',{eq:1,khau:0.8},52,{y:'Từng họ nghe, từng họ thề lại. Minh ước vững hơn sau thử thách.',yu:{all:6,ky:5},n:'Một họ rút khỏi minh.',nu:{all:-6,fail:1,ky:6}}),
    pay0('Đền bù cho họ bị ép, chia thêm phần',40,{f:c=>{up({all:6,ky:3});return 'Tiền chia ra, lòng người thuận lại.'+fx(c,{money:-m(40)})}}),
    F('Mặc kệ, để họ tự lựa chọn',{t:'Một họ rút. Nhà mình mất dần liên minh.',u:{all:-5,ky:-1}})]),
 ST('L',8,'Chung một chiến tuyến',c=>`Các họ còn lại cùng nhìn vào nhau. Minh ước được thử bằng lửa: họ sẽ cùng nhau ra tay cuối cùng, hoặc rã ra.`,
  c=>[F('Cùng nhau ký lại lời thề, trước bàn thờ tổ',{t:'Lời thề đọc vang. Mỗi họ để lại một dấu tay.',u:{all:8,pw:3,ky:6}}),F('Bàn kế hoạch chung chi tiết',{t:'Cuộc họp kéo dài tới sáng, ai nấy hiểu phần việc của mình.',u:{all:6,pf:2,ky:4}}),F('Giữ nguyên lực, chờ',{t:'Minh ước chưa dùng.',u:{all:2}})])];
const HG=[
 ST('H',1,'Cúi đầu',c=>`Nhà mình chọn nhẫn nhịn. Việc đầu: để họ Phạm thấy nhà mình không là mối đe dọa, ít nhất trước mắt.`,
  c=>[F('Gặp mặt thân thiện, tỏ ý muốn yên ổn',{t:'Họ Phạm nhận lời tỏ ý, nghĩ nhà mình đã quy thuận.',u:{ky:-8,hn:3},f:{fame:-3}}),F('Tránh mặt, ít xuất hiện',{t:'Nhà mình biến mất khỏi mắt họ Phạm.',u:{ky:-5}}),F('Dâng lễ nhỏ nhân dịp lễ tết',{t:'Lễ nhỏ, đều đặn. Họ Phạm quen dần.',u:{ky:-6,hn:3},cost:10})]),
 ST('H',2,'Của lễ hằng năm',c=>`Họ Phạm nhắc: mỗi năm nhà mình nên dâng một khoản lễ. Khoản nhỏ, nhưng nghe như một lệ. Nếu từ chối, sẽ có chuyện.`,
  c=>[pay0('Dâng lễ đúng hạn mỗi năm',20,{f:c=>{up({ky:-6,hn:4});return 'Lễ đi, lòng đắng, nhà yên.'+fx(c,{money:-m(20),tam:-3})}}),O('Dâng ít hơn, nói nhà đang khó',{khau:0.8,eq:0.6},52,{y:'Họ Phạm nghe, chấp nhận mức nhỏ.',yu:{ky:-3,hn:2},n:'Họ Phạm cau mày, bắt phải bù.',nu:{ky:3,hn:5},cost:10}),F('Từ chối thẳng',{t:'Lễ không đi. Họ Phạm ghi sổ.',u:{ky:8,hn:2}})]),
 ST('H',3,'Nuốt nhục',c=>`Giữa chợ, người của họ Phạm sỉ nhục một người trong họ nhà mình. Cả chợ nhìn. Nhà mình phải lựa: nuốt hay nổi.`,
  c=>[F('Nuốt xuống, cười cho qua',{t:'Người bị sỉ nhục cúi đầu. Lòng người trong nhà nặng như đá.',u:{ky:-4,hn:8},f:{tam:-8}}),O('Phản ứng nhẹ, lễ phép nhưng không xin lỗi',{eq:1,khau:0.7},50,{y:'Một câu nói điềm tĩnh khiến kẻ kia cụt hứng. Chợ nhìn nhà mình với con mắt khác.',yu:{ky:2,dt:3},n:'Kẻ kia nổi giận, gây sự thêm.',nu:{ky:4},nf:{tam:-4}}),F('Rút lui nhanh chóng',{t:'Nhà mình về, im lặng.',u:{ky:-2,hn:4},f:{tam:-5}})]),
 ST('H',4,'Con cháu chán nản',c=>`Lớp trẻ trong nhà bắt đầu chán: "Cứ nhẫn mãi thế này đến bao giờ?" Có người bỏ nhà đi, có người sa vào rượu, có người nói nhà mình hèn.`,
  c=>[F('Kể cho con cháu nghe lý do, và kế hoạch dài hạn',{t:'Con cháu im lặng nghe. Có người hiểu, có người không.',u:{pw:2,hn:3},f:{tam:2}}),F('Cho vài người trẻ rời đi lập nghiệp nơi khác',{t:'Vài người ra đi, mang theo một chút hận.',u:{pw:-3,all:2,hn:2},f:{tam:-3}}),F('Khắt khe hơn, giữ gia pháp',{t:'Gia pháp được siết. Nhà bớt tiếng, nhưng cũng bớt hơi.',u:{pw:1,hn:5},f:{tam:-5}})]),
 ST('H',5,'Cửa sổ',c=>`Một chi tiết nhỏ: ${KF()} vừa mắc một lỗi, một quyết định hấp tấp, một lời nói sai ở nơi không nên. Có thể là sơ suất, có thể là bẫy. Nhà mình thấy "cửa sổ".`,
  c=>[O('Thu thập bằng chứng ngay, âm thầm',{tri:0.9,khau:0.6},52,{y:'Nhà mình có đủ ghi chép về lỗi ấy. Một lỗi thật, không thể chối.',yu:{pf:12,ky:5},n:'Lỗi ấy bị hắn che kín ngay trong tuần. Cơ hội trôi.',nu:{ky:3},x:{}}),F('Chờ xem họ Phạm có tự sửa không',{t:'Chờ. Cơ hội hé rồi khép.',u:{}}),F('Làm lớn lên ngay',{t:'Nhà mình tung tin, nhưng tin thiếu bằng chứng, bị bác.',u:{ky:10,fail:1,hn:-2}})]),
 ST('H',6,'Cơ hội thật hay bẫy',c=>`Một người lạ đến, nói bên trong họ Phạm có chuyện lục đục, đây là lúc đánh. Nhà mình không chắc đây là thật hay một cái bẫy để dụ nhà mình ra tay.`,
  c=>[O('Dò thêm trước khi quyết',{tri:0.9,muu:0.7},58,{y:'Dò ra: tin thật một nửa. Họ Phạm đang rạn nứt giữa Kiên và Quốc công.',yu:{pf:4,all:3,ky:2},yf:{},n:'Dò mãi không ra, mất thời cơ.',nu:{},x:{}}),F('Lao vào, nắm lấy cơ hội',{t:'Nhà mình ra tay. Cơ hội có thật hay không, sẽ biết.',u:{ky:12,pf:3,lo:6}}),F('Từ chối, không tin kẻ lạ',{t:'Nhà mình giữ nhẫn.',u:{}})]),
 ST('H',7,'Thế cờ đổi',c=>`Một biến cố lớn ở triều đình: một vị đại thần ngã ngựa, một phe đổi chủ, hoặc vua có chiếu lạ. Thế cờ xoay, và họ Phạm bị ảnh hưởng.`,
  c=>[F('Lặng lẽ theo dõi, đợi họ tự gục',{t:'Nhà mình không động, chỉ theo dõi kỹ.',u:{pf:2,ky:-1}}),O('Nhân cơ hội, đẩy nhẹ',{khau:0.8,tri:0.7},50,{y:'Một cái đẩy đúng chỗ, đúng lúc. Họ Phạm loạng choạng.',yu:{pf:5,ky:6,all:2},n:'Đẩy sớm, họ Phạm vững lại.',nu:{ky:7,fail:1}}),F('Tránh xa, sợ vạ lây',{t:'Nhà mình đóng cửa chờ qua cơn.',u:{ky:-2}})]),
 ST('H',8,'Người khác ra tay',c=>`Có kẻ khác ra tay với họ Phạm trước nhà mình. Có thể là vua, một phe, hay một người nào đó. Nhà mình chỉ cần chọn cách đứng nhìn, hay chen vào.`,
  c=>[F('Đứng nhìn, giữ im lặng',{t:'Nhà mình đứng ngoài, nhìn họ Phạm bị xử.',u:{ky:-4}}),F('Âm thầm cung cấp chứng cứ cho người ra tay',{t:'Một phong bì vô danh đến tay người ra tay. Nhà mình không để lại dấu.',u:{pf:4,ky:2}}),F('Công khai đứng cùng người ra tay',{t:'Nhà mình đứng tên cùng. Có công, có rủi.',u:{all:4,ky:8}})])];

function pay0(l,v,o){return Object.assign({l:`${l} (${FM(m(v))})`,c:()=>G.money()>=m(v)},o)}

/* ---------- thời cơ và trận cuối ---------- */
const READY=(c,a)=>a.ch===5&&(H.sc()>=0.38||S().t-(a.fl.t5||S().t)>=36);
const Z0=E('pm_z0','Thời cơ đã chín',c=>`Nhìn lại thế trận, nhà ${N(c)} hiểu mình đã đi đến cuối đường. Những gì có thể thu thập đã thu thập, những người có thể kéo đã kéo. Phía bên kia, ${KF()} cũng đã sẵn sàng. Đây là lúc phải quyết, và quyết xong thì không rút lại.`,
 c=>{const go=F('Đã đến lúc, ra tay',{t:'Nhà mình lấy hết can đảm. Những ngày sắp tới sẽ quyết định tất cả.',then:()=>{const a=arc();a.ch=6;a.fl.t6=S().t;return ''}});
   const late=S().t-(arc().fl.t5||S().t)>=72;
   return late?[go]:[go,F('Chờ thêm một chút',{t:'Nhà mình dừng, lòng không yên.',u:{ky:3}})]},
 {ch:5,vw:20,vonce:false,vcd:12,vc:READY});
/* mỗi đòn quyết định cộng hoặc trừ vào chênh lệch thế trận rồi tính ra cái kết */
function pickEnd(bonus){const a=arc();const d=H.sc()-H.kp()+(Math.random()-0.5)*0.30+bonus;
  if(a.lock.br==='H'&&a.fl.sai&&d>-0.12)return d>0.1&&chance(0.3)?'E1':'E5';
  if(d>0.20)return 'E1';if(d>0.0)return 'E2';
  if(d>-0.16)return chance(0.35)?'E8':'E6';
  return (a.lock.br==='V'&&chance(0.7))||(a.c.lo||0)>=60&&chance(0.5)?'E7':'E6'}
const ENDT={
 E1:'Công lý được tỏ. Kiên bị xử theo luật; họ Phạm mất quyền thế, phe Quyền thần sụp đổ. Ghế Nhất phẩm bỏ trống.',
 E2:'Kiên đổ, nhưng nhà mình tổn hại nặng: mất người, mất của. Cháu Kiên đứng nhìn, mối thù chưa dứt.',
 E3:'Kiên nghỉ chức trong vinh quang, hai nhà ngồi lại chia ghế trên giấy. Nhà mình mang món nợ với họ Phạm.',
 E4:'Nhà mình quy phục Quốc công, liên hôn với họ Phạm và vào bộ máy Quyền thần. Thanh lưu coi khinh.',
 E5:'Kiên bị kẻ khác hạ. Ghế bỏ trống, nhà mình đứng ngoài nhìn.',
 E6:'Nhà mình bị phản tố: cả họ bị cách chức, tịch biên một phần, cấm thi một trăm năm.',
 E7:'Nhà mình bị gán tội mưu nghịch. Chiếu chỉ tru di đã xuống.',
 E8:'Nhà mình rời bỏ đất cũ, đi xa, mất phần lớn của cải.'};
function applyEnd(id){const a=arc();if(!a||a.end)return '';const hd=G.head();const s=S();const K=a.K;let note='';
  const nq=clanQuan();
  if(id==='E1'||id==='E2'||id==='E5'){K.ok=0;G.qt.fall('quyen',id==='E1'?'bị xử theo luật':id==='E2'?'đổ sau cuộc giằng co':'bị người khác hạ');
    if(id==='E2'){s.money=Math.round(s.money*0.75);const vic=G.alive().filter(p=>G.inClan(p)&&p.id!==s.head&&G.age(p)>=16);if(vic.length&&chance(0.6)){const v=pick(vic);G.die(v,'mất trong cuộc giằng co với họ Phạm');note=' '+esc(G.nameOf(v))+' không qua khỏi.'}
      G.later(hd,'pm_s1',R(180,300))}
    G.later(hd,'pm_g1',R(1,3));G.later(hd,'pm_g2',R(3,8))}
  else if(id==='E3'){K.ok=0;G.later(hd,'pm_g2',R(3,8))}
  else if(id==='E4'){nq.forEach(p=>{try{G.qt.join(p,'quyen')}catch(e){}});s.money=Math.round(s.money*0.9)}
  else if(id==='E6'){nq.forEach(p=>G.qt.dismiss(p,'bị cả họ cách chức trong vụ phản tố'));s.noExamClan=s.t+1200;s.money=Math.round(s.money*0.6)}
  else if(id==='E7'){G.qt.sentence(hd,5,'mưu nghịch')}
  else if(id==='E8'){nq.forEach(p=>G.qt.dismiss(p,'bỏ xứ'));s.money=Math.round(s.money*0.4);s.farm.own=Math.round(s.farm.own*0.5)}
  G.arc.end('pm',id);if(id==='E8')arc().q.until=s.t+360;
  G.arc.log('pm','Ân oán khép lại: '+id);
  return `<p class="muted">${ENDT[id]}${note}</p>`}
const fight=(c,bonus,pre)=>pre+applyEnd(pickEnd(bonus));
const FIN=(l,spec,tgt)=>({l,r:[spec,tgt],y:c=>fight(c,0.10,'Đòn đánh trúng đích. '),n:c=>fight(c,-0.10,'Đòn đánh trượt một nhịp. ')});
const DEAL={l:'Đề nghị hòa giải, chia ghế',r:[{khau:1,eq:0.8},60],y:c=>'Họ Phạm nhận lời, với cái giá của nó. '+applyEnd(H.sc()-H.kp()>-0.14?'E3':'E8'),n:c=>'Họ Phạm đòi thêm. '+applyEnd('E8')};
const BOW={l:'Quy phục, nhận lời bảo hộ của Quốc công',f:c=>'Nhà mình cúi đầu. '+applyEnd('E4')};
const LEAVE={l:'Bỏ xứ, đi xa',f:c=>'Nhà mình thu xếp lên đường trong đêm. '+applyEnd('E8')};
const Z=(L,t,x,fight1,fight2)=>E('pm_z'+L,t,x,c=>[FIN(fight1[0],fight1[1],fight1[2]),FIN(fight2[0],fight2[1],fight2[2]),DEAL,BOW,LEAVE],{ch:6,vw:20,vc:(c,a)=>a.lock.br===L});
const ZS=[
 Z('P','Phiên tòa Tam pháp ty',c=>`Phiên tòa quyết định ở Tam pháp ty đã mở. Dưới điện, nhà ${N(c)} và ${KF()} đối mặt. Từng người làm chứng được gọi, từng tờ giấy được đọc. Đại Minh luật là cán cân.`,['Dẫn từng chứng cứ, từng nhân chứng, từng điều luật',{tri:1,khau:0.8,eq:0.5},55],['Tập trung vào tội nặng nhất, tung con át chủ bài',{tri:0.9,khau:0.6},45]),
 Z('F','Đàn hặc trước điện',c=>`Trong buổi đại triều, cả phe nhà mình cùng bước ra, quỳ trước điện, đọc bản đàn hặc. Quyền thần đứng đối diện. Vua ngồi trên, không nói.`,['Đọc bản đàn hặc đến cùng, không lùi',{eq:1,khau:0.8,tri:0.5},52],['Dùng ân tình, nhờ phe trung lập lên tiếng',{khau:0.9,eq:0.7},48]),
 Z('V','Đêm bắt Kiên',c=>`Đêm không trăng, nhà ${N(c)} và đồng đội phục sẵn dọc con đường Kiên sẽ đi. Gió lặng, chó không sủa. Kế hoạch đã được diễn tập hàng chục lần.`,['Ra tay dứt khoát, bắt sống',{vo:1,eq:0.6},45],['Dụ vào bẫy, chặn hai đầu',{vo:0.8,tri:0.8},48]),
 Z('T','Ngày phá sản của họ Phạm',c=>`Sáng sớm, các chủ nợ cùng ập đến các hiệu buôn của họ Phạm đòi thanh toán. Sổ sách bị niêm phong. Nhà ${N(c)} đứng sau tất cả, nhưng không lộ diện.`,['Rút hết dây cùng một lúc',{khau:1,tri:0.8,mi:0.5},52],['Từng bước đẩy họ Phạm vào thế buộc phải bán tài sản',{khau:0.9,tri:0.7},50]),
 Z('M','Vạn dân trước cửa Ngọ môn',c=>`Hàng nghìn người, dẫn đầu là nhà ${N(c)}, đứng trước cửa Ngọ môn. Cả kinh thành nín thở. Vua sẽ phải ra, hoặc sẽ phải gọi lính.`,['Đứng đầu đoàn người, không lùi',{eq:1,vo:0.4,khau:0.6},50],['Cử người đại diện vào dâng thư, đoàn người chờ',{khau:0.9,eq:0.7},52]),
 Z('L','Minh ước thành hình',c=>`Các họ cùng bước vào kinh thành, mỗi họ mang một mảnh chứng cứ, một lời oán. Minh ước biến thành một cuộc đàn hặc tập thể.`,['Trình đồng thời, mỗi họ một phần',{eq:1,khau:0.8,tri:0.6},52],['Dồn lực vào một vụ điển hình',{tri:0.9,khau:0.7},50]),
 Z('H','Ngày Kiên ngã',c=>`Sau bao năm chờ, ngày ấy dường như đã tới: ${KF()} có dấu hiệu lung lay. Nhà mình thấy rõ cơ hội cuối.`,['Nhẹ nhàng đẩy thêm một cái',{khau:0.9,tri:0.8},55],['Chờ thêm để thế ngã tự nhiên',{eq:1},60])];
/* hậu quả */
const GQ=[
 E('pm_g1','Phạm gia sụp đổ',c=>`Tin từ kinh thành: họ Phạm sụp đổ. Thái phi trong cung bị giáng, Quốc công bị tước nhiệm, phe Quyền thần mất thế. Tay chân của họ Phạm ở khắp nơi chạy tán loạn.`,
  c=>[F('Nhìn họ Phạm tan rã trong im lặng',{t:'Nhà mình không vui lắm. Chuyện đã xong, và những người đã mất không trở lại.',u:{},f:{tam:4,fame:6}}),F('Mở tiệc nhỏ, cúng tổ tiên',{t:'Nhà mình thắp hương trước bàn thờ, báo với tổ tiên một tiếng.',u:{},f:{tam:6,fame:4},cost:15}),F('Đóng cửa, nghỉ ngơi',{t:'Nhà mình cần nghỉ.',u:{},f:{tam:5}})],{arc:undefined,fixed:1,vonce:true}),
 E('pm_g2','Ghế Nhất phẩm bỏ trống',c=>`Ghế Nhất phẩm văn vừa trống. Trong triều, mọi người đang nhắm vào đó. Nhà ${N(c)} có người đủ tư cách không?`,
  c=>{const nq=clanQuan().sort((a,b)=>b.lv-a.lv);const top=nq[0];return [top&&top.lv>=6?{l:`Đề cử ${esc(top.given)}`,r:[{eq:1,khau:0.7,tri:0.6},50],y:c=>`${esc(top.given)} được chọn.`+fx(top,{lv:Math.max(0,8-top.lv),fame:20}),n:c=>`Ghế về tay người khác.`+fx(c,{tam:-4})}:F('Không có người đủ tư cách',{t:'Nhà mình đứng ngoài cuộc đua.',u:{}}),F('Ủng hộ một người khác',{t:'Nhà mình giữ quan hệ tốt với người thắng cuộc.',u:{},f:{fame:3}}),F('Đứng ngoài',{t:'Nhà mình nhìn.',u:{}})]},{arc:undefined,fixed:1,vonce:true}),
 E('pm_g3','Thiết khoán thu hồi',c=>`Chiếu chỉ thu hồi Thiết khoán của họ Phạm được tuyên đọc. Tấm khoán sắt từng bảo vệ cả dòng họ ba đời nay bị đem về cung.`,
  c=>[F('Nghe chiếu trong im lặng',{t:'Một thời đại kết thúc.',u:{},f:{fame:3}})],{arc:undefined,fixed:1,vonce:true})];
/* người nối chuỗi khi Kiên qua đời */
const NN=[
 E('pm_n1','Kiên qua đời',c=>`Tin từ kinh thành: ${KF()} qua đời, tuổi đã cao. Cả họ Phạm mặc đồ tang, triều đình bãi triều ba ngày. Nhà ${N(c)} nghe tin không biết nên vui hay buồn: kẻ thù đã mất mà ân oán còn nguyên.`,
  c=>[F('Gửi lễ viếng đúng phép',{t:'Lễ viếng đi. Họ Phạm ghi nhận.',u:{ky:-4,hn:-3},cost:25,then:c=>{G.later(c,'pm_n2',R(3,6));return ''}}),F('Không viếng, im lặng',{t:'Nhà mình không động.',u:{hn:4},then:c=>{G.later(c,'pm_n2',R(3,6));return ''}})],{arc:undefined,fixed:1,vonce:true}),
 E('pm_n2','Người nối của họ Phạm',c=>`Họ Phạm đã có người nối: Phạm Bá ${esc(G.mkGiven?G.mkGiven('nam'):'Thắng')}, cháu Kiên, ít tuổi hơn nhưng đã được dạy từ bé cách giữ cơ đồ. Hắn mang tính khí khác với chú.`,
  c=>[F('Tìm hiểu về hắn',{t:'Nhà mình dò tin về người nối: tính cách, chỗ yếu, người thân.',u:{pf:2,all:1},then:c=>{const a=arc();const g=G.mkGiven('nam');a.K={n:'Phạm Bá '+g,g:'Bá '+g,age:30,rank:Math.max(0,(a.K.rank||0)-1),pow:Math.max(20,(a.K.pow||20)-15),life:30+R(25,40),ok:1,sched:[0,0,0,0,0].map((_,i)=>S().t+(i+1)*96),lag:0};a.fl.kdie=0;a.fl.succ=(a.fl.succ||0)+1;a.c.hn=Math.min(100,(a.c.hn||0)+20);G.later(c,'pm_n3',R(3,6));return ''}}),F('Không quan tâm',{t:'Nhà mình giữ nguyên.',u:{},then:c=>{const a=arc();const g=G.mkGiven('nam');a.K={n:'Phạm Bá '+g,g:'Bá '+g,age:30,rank:Math.max(0,(a.K.rank||0)-1),pow:Math.max(20,(a.K.pow||20)-15),life:30+R(25,40),ok:1,sched:[0,0,0,0,0].map((_,i)=>S().t+(i+1)*96),lag:0};a.fl.kdie=0;a.fl.succ=(a.fl.succ||0)+1;a.c.hn=Math.min(100,(a.c.hn||0)+20);G.later(c,'pm_n3',R(3,6));return ''}})],{arc:undefined,fixed:1,vonce:true}),
 E('pm_n3','Lời thề',c=>`Trong lễ nhận ấn, ${KF()} trước bàn thờ tổ họ Phạm đã thề: "Cái chú tôi chưa làm xong, tôi sẽ làm." Câu thề lan ra ngoài. Nhà mình nghe được.`,
  c=>[F('Ghi vào sổ, đối phó dần',{t:'Một lời thề là một lời hứa, và một lời đe.',u:{ky:2,hn:3}}),F('Gửi lời hòa giải qua người trung gian',{t:'Người nối đọc thư, không trả lời.',u:{ky:-2},cost:10})],{arc:undefined,fixed:1,vonce:true,vc:()=>true}),
 E('pm_n4','Họ Phạm đổi cách',c=>`${KF()} không làm như Kiên. Hắn khéo hơn, ít đòn trực diện, nhiều lời dịu. Nhà mình cảm thấy như đang bị trói bằng tơ chứ không bằng xích.`,
  c=>[F('Học cách của hắn, đáp lại bằng sự mềm mỏng',{t:'Hai bên đấu bằng thiếp mời và lời khéo.',u:{ky:-1,all:2}}),F('Giữ nguyên cứng rắn',{t:'Cứng với mềm, ai gãy trước?',u:{ky:3}})],{arc:undefined,fixed:1,vonce:true}),
 E('pm_n5','Di chúc của Kiên',c=>`Một mảnh giấy cũ được đưa tới nhà ${N(c)} qua tay một lão bộc: di chúc riêng của Kiên, chưa ai biết. Trong đó có lời nhắc con cháu về một bí mật.`,
  c=>[F('Đọc kỹ, ghi nhớ',{t:'Bí mật ấy là chỗ yếu của họ Phạm.',u:{pf:12,ky:3}}),F('Chuyển cho người có thế hơn',{t:'Mảnh giấy đi xa. Nhà mình mất một thứ, được một mối.',u:{all:4,ky:1}})],{arc:undefined,fixed:1,vonce:true}),
 E('pm_n6','Thế trận đổi',c=>`Sau lời thề, di chúc, họ Phạm đổi tay người cầm. Thế trận cũ sang trang. Nhà ${N(c)} phải cân lại mọi thứ từ đầu, nhưng không phải bắt đầu lại.`,
  c=>[F('Cân lại lực lượng, đi tiếp',{t:'Mọi con số được đặt lại trên bàn.',u:{pw:2,ky:-2}})],{arc:undefined,fixed:1,vonce:true})];
/* chuyện báo thù ở đời sau (sau cái kết E2) */
const SS=[
 E('pm_s1','Cháu của kẻ thù',c=>`Một thanh niên họ Phạm, cháu của Kiên, bắt đầu để ý đến nhà ${N(c)} sau bao năm. Hắn lớn lên với câu chuyện của một người chú bị "người ta" hại.`,
  c=>[F('Theo dõi hắn, dò hắn nghĩ gì',{t:'Nhà mình cử người dò: hắn trầm tính, học giỏi, nhưng ánh mắt có điều gì đó.',u:{}, then:c=>{G.later(c,'pm_s2',R(8,18));return ''}}),F('Bỏ qua',{t:'Nhà mình không để ý.',u:{},then:c=>{G.later(c,'pm_s2',R(8,18));return ''}})],{arc:undefined,fixed:1,vonce:true}),
 E('pm_s2','Người lạ trong học đường',c=>`Một học trò mới nhập học đường của nhà mình, thông minh nhưng khép kín. Rồi nhà mình nhận ra hắn không phải người xứ này.`,
  c=>[F('Nói chuyện riêng với cậu',{t:'Cậu bối rối rồi thú nhận: tên thật, xuất thân. Cậu muốn hiểu chuyện cũ.',u:{},then:c=>{G.later(c,'pm_s3',R(6,12));return ''}}),F('Không hỏi gì, để cậu học',{t:'Nhà mình để cậu tiếp tục.',u:{},then:c=>{G.later(c,'pm_s3',R(6,12));return ''}})],{arc:undefined,fixed:1,vonce:true}),
 E('pm_s3','Tin từ kinh thành',c=>`Tin từ kinh thành: họ Phạm đang có động tĩnh, người trẻ trong họ muốn "chấn chỉnh". Nhà mình nghe đồn có người đang tính chuyện cũ.`,
  c=>[F('Chuẩn bị đề phòng',{t:'Nhà mình tăng cảnh giác, nhưng không động thủ.',u:{},then:c=>{G.later(c,'pm_s4',R(6,12));return ''}}),F('Gửi lời mời gặp mặt',{t:'Nhà mình chủ động.',u:{},then:c=>{G.later(c,'pm_s4',R(6,12));return ''}})],{arc:undefined,fixed:1,vonce:true}),
 E('pm_s4','Cuộc gặp',c=>`Cuối cùng, hai bên ngồi đối diện. Người họ Phạm trẻ tuổi, mắt thẳng, giọng chậm. Không có tiệc, không có tùy tùng. Chỉ hai ly trà.`,
  c=>[F('Kể thật những gì đã xảy ra',{t:'Chuyện được kể từ đầu, không giấu. Người kia nghe, im lặng rất lâu.',u:{},then:c=>{G.later(c,'pm_s5',R(3,6));return ''}}),F('Giữ im, nghe hắn nói trước',{t:'Hắn kể chuyện của hắn. Mỗi người một nửa sự thật.',u:{},then:c=>{G.later(c,'pm_s5',R(3,6));return ''}})],{arc:undefined,fixed:1,vonce:true}),
 E('pm_s5','Lời mời hòa giải',c=>`Người họ Phạm đề nghị: hai nhà ngồi lại, không cần phân đúng sai, chỉ cần nói sao cho con cháu không phải mang tiếp.`,
  c=>[F('Nhận lời hòa giải',{t:'Hai bên bắt tay.',u:{},then:c=>{G.later(c,'pm_s6',R(2,4));c.flags.pmS='hoa';return ''}}),F('Từ chối, giữ lập trường',{t:'Hai bên chia tay lạnh nhạt.',u:{},then:c=>{G.later(c,'pm_s6',R(2,4));c.flags.pmS='thu';return ''}}),F('Xin thời gian suy nghĩ',{t:'Nhà mình cần thêm.',u:{},then:c=>{G.later(c,'pm_s6',R(2,4));c.flags.pmS='tam';return ''}})],{arc:undefined,fixed:1,vonce:true}),
 E('pm_s6','Khép lại hay tiếp nối',c=>c.flags.pmS==='hoa'?`Một năm sau, hai nhà cùng dự lễ cúng chung ở chùa. Cái gai lâu năm nhẹ hẳn.`:c.flags.pmS==='thu'?`Một năm sau, họ Phạm gửi một lá thư lạnh: "Từ nay, hai nhà là người lạ." Nhà mình giữ lá thư.`:`Nhà mình suy nghĩ lâu, rồi gửi lời đồng ý, muộn nhưng thật. Hai bên bắt đầu qua lại.`,
  c=>[F('Ghi chuyện vào gia phả',{t:'Gia phả thêm một trang mới.',u:{}})],{arc:undefined,fixed:1,vonce:true})];
return [].concat(CALS,P,FG,VG,TG,MG,LG,HG,[Z0],ZS,GQ,NN,SS);
});
