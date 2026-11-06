/* Bách Niên Thế Gia v6.3.3 · Ân oán Phạm Trung Kiên và Nguyễn Thành Duy (phần 1: mở đầu, manh mối, áp lực)
   Kiên: hào lý leo dần lên tổng trấn bằng tiền và mánh khóe. Duy: kẻ bị họ Nguyễn ruồng bỏ, làm mưu sĩ cho Kiên, cuối cùng bán sơ đồ ải.
   Mô-típ mượn từ truyện dân gian và dã sử: quan tham nhũng sổ sách hai tầng, thư lại phản chủ, nhân chứng bị giấu trong chùa,
   quyển gia phả bị xé, kẻ đồng bọn ăn năn, rương sổ trôi sông. Sự kiện do G._v633 phát từng bước, không vào bốc ngẫu nhiên. */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc,age,married,alive}=G;
const S=()=>G.S();
const m=v=>G.mm(v);
const fm=v=>G.fmtMoney(v);
const V=()=>G._v633;
const hn=id=>V().houseName(id);
const hr=(id,d)=>{V().houseRel(id,d);return ''};
const vv=()=>S().vil;
const vd=(a,b,n)=>V().vd(a,b,n);
const pf=n=>V().vAdd('pf',n);
const wt=n=>V().vAdd('wit',n);
const dt=n=>V().vAdd('dt',n);
const kp=n=>V().kPow(n);
const st=s=>V().vStance(s);
const fl=(k,x)=>V().vFlag(k,x);
const rk=()=>vv().K.rank;
const NOM={tri:50,vo:46,suc:65,mi:46,eq:46,muu:20,khau:25,ql:16,ky:30,fame:15,m:35,duyen:50};
const TS=(spec,p)=>{let v=0,w=0;for(const k in spec){v+=(NOM[k]!=null?NOM[k]:50)*spec[k];w+=spec[k]}return Math.round(0.93*(w?v/w:50)-9*Math.log(p/(1-p)))};
const RR=(spec,p)=>[spec,TS(spec,p)+rk()*2];
const N=c=>esc(c.given);
const KN='Phạm Trung Kiên',DN='Nguyễn Thành Duy';
const VE=(vs,o)=>Object.assign({fixed:1,k:'Ân oán',vs,vw:1},o);
const VK=(vs,o)=>Object.assign({fixed:1,k:'Kỳ ngộ',ky:1,good:1,u:'person',vs,vw:0.4,vcd:240},o);
const has=f=>alive().some(p=>G.inClan(p)&&p.dead==null&&!p.away&&(()=>{try{return f(p)}catch(e){return false}})());
const scholar=p=>age(p)>=16&&(p.job==='su'||p.degree>=1||p.tri>=70);
const fighter=p=>age(p)>=17&&age(p)<=58&&p.vo>=60;
const hasFarm=()=>S().farm.own>=2;
const hasBiz=()=>S().biz.length>0||S().trips.length>0;
const hasQuan=()=>has(p=>p.job==='quan');
const loss=(lo,hi)=>m(R(lo,hi));
const stg=(t)=>t;
return [
/* ===================== A · Kiên xuất hiện, sáu cách tuỳ gia tộc ===================== */
VE('A',{id:'vil_a_ruong',t:'Cột mốc bị dời',vc:()=>hasFarm(),
 x:c=>`Sáng ra ${N(c)} đi thăm ruộng, thấy mấy cột mốc ranh giới nhích về phía nhà mình gần hai sải tay. Người trông ruộng nói thẳng: "Ruộng này nay thuộc về ông ${KN}, hào lý mới. Ông ấy có giấy tờ của quan trên." Tên này mới nổi trong vùng, ai nói đến cũng hạ giọng.`,
 o:c=>{const pay=loss(5,9);return [
  {l:`Chịu mất một phần ruộng, nộp thêm cho yên (${fm(pay)})`,c:()=>G.money()>=pay,f:c=>`Mấy người của ông ta ghi nhận, rút ngay. Nhưng cả làng đều nhìn thấy nhà mình cúi đầu.`+st('hide')+kp(4)+fx(c,{money:-pay,fame:-2,tam:-3})+fl('a')+vd(6,12,'Nhà mình nhịn lần đầu trước Phạm Trung Kiên.')},
  {l:'Đòi kiểm giấy tờ, cứng rắn không nhường',r:RR({tri:1,khau:0.8,gan:0.4},0.5),y:c=>`${N(c)} cầm đòn gánh đứng giữa ruộng, yêu cầu xem giấy. Họ không có, đành rút. Cả làng thấy nhà mình dám nói thẳng với hắn.`+st('fight')+pf(1)+dt(4)+fx(c,{fame:3,tam:5})+fl('a')+vd(5,10,'Nhà mình dám đối mặt Phạm Trung Kiên ngay lần đầu.'),
   n:c=>`Họ cầm giấy giả đọc to, rồi lôi người trông ruộng đi. Cột mốc mới được đóng sâu thêm, nhà mình mất một thửa.`+st('fight')+kp(3)+fx(c,{money:-pay,fame:-1,tam:-4})+fl('a')+vd(5,10,'Nhà mình cứng rắn nhưng chịu thiệt trước Phạm Trung Kiên.')},
  {l:'Nhịn bề ngoài, về nhà chép lại mọi thứ',r:RR({tri:1,muu:0.8},0.6),y:c=>`${N(c)} ghi vị trí từng cột mốc, tên từng người, ngày giờ. Một quyển sổ nhỏ trong ngăn bàn, sẽ có lúc dùng.`+st('watch')+pf(1)+fx(c,{tam:-1})+fl('a')+vd(6,12,'Nhà mình bắt đầu âm thầm ghi chép về Phạm Trung Kiên.'),
   n:c=>`Ghi vội nên sót, nhiều chỗ không thể dùng được. Nhưng ít nhất đã có thói quen.`+st('watch')+fx(c,{tam:-2})+fl('a')+vd(6,12,'Nhà mình bắt đầu theo dõi Phạm Trung Kiên.')}]}}),
VE('A',{id:'vil_a_buon',t:'Phí bảo hộ đường buôn',vc:()=>hasBiz(),
 x:c=>`Một toán người mặc áo thâm chặn đoàn hàng của nhà mình ở cổng chợ: "Ông ${KN} nhận bảo hộ cả vùng này, mỗi chuyến nộp một phần mười." Chưa nghe ai trong vùng nhắc đến cái tên ấy trước tháng này.`,
 o:c=>{const pay=loss(6,12);return [
  {l:`Nộp cho yên (${fm(pay)})`,c:()=>G.money()>=pay,f:c=>`Họ ký nhận gọn gàng, hẹn chuyến sau. Lần sau mức phí sẽ không thấp hơn.`+st('hide')+kp(4)+fx(c,{money:-pay,tam:-3})+fl('a')+vd(6,12,'Nhà mình nộp phí bảo hộ cho Phạm Trung Kiên.')},
  {l:'Nói là đã nộp thuế chợ, không chịu nộp thêm',r:RR({khau:1,eq:0.6,gan:0.4},0.5),y:c=>`${N(c)} kéo người trông chợ ra làm chứng, nói đến mức toán áo thâm ngượng ngùng bỏ đi. Cả chợ nhìn nhà mình bằng con mắt khác.`+st('fight')+dt(4)+pf(1)+fx(c,{fame:3,tam:4})+fl('a')+vd(5,10,'Nhà mình từ chối nộp phí cho Phạm Trung Kiên.'),
   n:c=>`Họ đổ hết một xe hàng xuống mương, cười: "Lần sau nhớ."`+st('fight')+kp(3)+fx(c,{money:-pay,fame:-1,tam:-4})+fl('a')+vd(5,10,'Nhà mình bị Phạm Trung Kiên dằn mặt.')},
  {l:'Nộp tạm, nhưng ghi lại mặt từng người',r:RR({tri:1,muu:0.8},0.6),y:c=>`Số tiền nộp vẫn mất, nhưng ${N(c)} ghi được tên bảy người, cách ăn mặc, giờ giấc. Đó mới là thứ đáng giá.`+st('watch')+pf(1)+fx(c,{money:-Math.round(pay/2),tam:-1})+fl('a')+vd(6,12,'Nhà mình ghi chép về đám thuộc hạ của Phạm Trung Kiên.'),
   n:c=>`Ghi chép lộn xộn, lẫn người này với người khác.`+st('watch')+fx(c,{money:-Math.round(pay/2),tam:-2})+fl('a')+vd(6,12,'Nhà mình bắt đầu theo dõi Phạm Trung Kiên.')}]}}),
VE('A',{id:'vil_a_quan',t:'Lễ ra mắt của hào lý mới',vc:()=>hasQuan(),vwho:p=>p.job==='quan'&&age(p)>=20,
 x:c=>`${KN}, người mới nổi ở hạt này, cho người đem đến một tráp lễ nặng trình ${N(c)}, kèm một tờ thiếp: "Kẻ hèn mong có ngày được cùng ông bàn việc quan." Cả công đường đều biết hắn mua chức hào lý chỉ sau vài năm, tiền từ đâu không ai dám hỏi.`,
 o:c=>{const gift=m(R(10,18));return [
  {l:'Nhận lễ, hẹn ngày bàn chuyện',f:c=>`Tráp lễ vào nhà, hào lý mới cười tươi mãn nguyện. Từ đó cái tên ${N(c)} gắn liền với hắn trong mắt nhiều người.`+st('hide')+kp(7)+fx(c,{money:gift,liem:-10,fame:-3,tam:-3})+fl('a')+vd(6,12,'Một người nhà mình nhận lễ của Phạm Trung Kiên.')},
  {l:'Trả lễ nguyên vẹn, nói rõ không nhận',r:RR({eq:1,khau:0.6,thanh:0.4},0.55),y:c=>`Người đưa lễ ngượng chín mặt, quay về báo lại. Vài hôm sau cả huyện đồn rằng ${N(c)} là người không nhận lễ.`+st('fight')+dt(4)+fx(c,{fame:4,liem:5,tam:4})+fl('a')+vd(5,10,'Nhà mình trả lễ, từ chối kết thân với Phạm Trung Kiên.'),
   n:c=>`Lời từ chối quá cứng, bị chính hào lý mới ghi hận. Mấy hôm sau công văn đi lại thường chậm hơn.`+st('fight')+kp(3)+fx(c,{fame:-1,tam:-3})+fl('a')+vd(5,10,'Phạm Trung Kiên ghi hận nhà mình.')},
  {l:'Nhận lễ rồi âm thầm ghi số tiền, ngày giờ, người đưa',r:RR({muu:1,tri:0.7},0.55),y:c=>`Tráp lễ được cất kỹ như một vật chứng. Ngày sau lôi ra, nó nặng hơn mọi lời nói.`+st('watch')+pf(2)+fx(c,{liem:-4,tam:-2})+fl('a')+vd(6,12,'Nhà mình cất giữ tráp lễ của Phạm Trung Kiên làm bằng chứng.'),
   n:c=>`Tráp lễ bị người hầu cũ tiết lộ, tiếng không đẹp.`+st('hide')+kp(4)+fx(c,{liem:-6,fame:-3,tam:-4})+fl('a')+vd(6,12,'Chuyện nhận lễ của Phạm Trung Kiên lan ra.')}]}}),
VE('A',{id:'vil_a_hoc',t:'Nhờ viết gia phả',vc:()=>has(scholar),vwho:scholar,
 x:c=>`${KN} cho người đến nhờ ${N(c)} chấp bút viết một bản gia phả "gốc gác nhà Phạm từ đời Lý". Hắn trả công bằng ba lạng bạc, còn hứa tiến cử cho chức tri huyện. Ai cũng biết cha hắn là người đi gánh nước thuê.`,
 o:c=>{const gift=m(R(10,16));return [
  {l:'Nhận viết, bịa theo ý hắn',f:c=>`Bản gia phả đẹp như thật. Hắn đem treo ở đình làng, ai nhìn cũng thấy lạ mà không dám hỏi.`+st('hide')+kp(6)+fx(c,{money:gift,liem:-8,fame:-3,tam:-4})+fl('a')+vd(6,12,'Nhà mình viết gia phả giả cho Phạm Trung Kiên.')},
  {l:'Từ chối thẳng, bảo gia phả không ai bịa được',r:RR({tri:1,khau:0.7,thanh:0.5},0.55),y:c=>`Người đưa tin xám mặt bỏ đi. Cả hội nho sĩ trong vùng kéo đến thăm ${N(c)} sau đó.`+st('fight')+dt(5)+fx(c,{fame:4,liem:5,tam:5})+fl('a')+vd(5,10,'Nhà mình từ chối viết gia phả giả cho Phạm Trung Kiên.'),
   n:c=>`Lời từ chối thô, nên hắn truyền tai nhau rằng ${N(c)} khinh người nghèo xuất thân.`+st('fight')+kp(2)+fx(c,{fame:-3,tam:-3})+fl('a')+vd(5,10,'Phạm Trung Kiên đồn đại xấu về nhà mình.')},
  {l:'Nhận viết nhưng chèn mấy chỗ mâu thuẫn kín đáo',r:RR({tri:1,muu:0.8,khau:0.3},0.5),y:c=>`Mấy chỗ sai niên đại nhỏ xíu. Hắn đem đi khoe mà không ai nhận ra, chỉ nhà mình giữ bản nháp.`+st('watch')+pf(1)+fx(c,{money:Math.round(gift/2),tam:2})+fl('a')+vd(6,12,'Nhà mình cài những sai sót kín đáo vào gia phả giả của Phạm Trung Kiên.'),
   n:c=>`Bị một thầy đồ khác nhìn ra, vạch ngay trước mặt. Hắn nổi giận, mà nhà mình thì chưa kịp lường.`+st('fight')+kp(3)+fx(c,{fame:-2,tam:-4})+fl('a')+vd(5,10,'Phạm Trung Kiên phát hiện nhà mình giở trò trong gia phả.')}]}}),
VE('A',{id:'vil_a_vo',t:'Bị mời làm hộ vệ',vc:()=>has(fighter),vwho:fighter,
 x:c=>`Người của ${KN} chặn ${N(c)} ở cổng chợ: "Ông chủ nghe danh võ nghệ của cậu, trả gấp đôi tiền người khác. Làm hộ vệ cho ông ấy ba tháng thôi." Người ở bên nhìn lấm lét, không ai dám xen vào.`,
 o:c=>{const gift=m(R(8,14));return [
  {l:'Nhận làm ba tháng',f:c=>`${N(c)} làm hộ vệ ba tháng, thấy nhiều điều không nên thấy. Khi nghỉ việc thì túi nặng hơn, lòng nặng hơn.`+st('hide')+kp(5)+fx(c,{money:gift,vo:1,liem:-5,fame:-2,tam:-5})+fl('a')+vd(6,12,'Một người nhà mình làm hộ vệ cho Phạm Trung Kiên.')},
  {l:'Từ chối, nói võ nghệ không bán',r:RR({vo:1,gan:0.7,eq:0.3},0.5),y:c=>`${N(c)} đứng chắn đường, không nhúc nhích, ánh mắt đủ để họ lùi. Đám người của hắn thôi không ép nữa.`+st('fight')+dt(3)+fx(c,{vo:1,fame:4,tam:4})+fl('a')+vd(5,10,'Nhà mình từ chối Phạm Trung Kiên rõ ràng.'),
   n:c=>`${N(c)} bị bốn người xô xuống, ăn mấy đòn nặng rồi thả. Tin lan ra cả vùng.`+st('fight')+kp(3)+fx(c,{suc:-6,fame:-2,tam:-5})+fl('a')+vd(5,10,'Người nhà mình bị đám thuộc hạ Phạm Trung Kiên đánh.')},
  {l:'Nhận làm để xem hắn thật sự muốn gì',r:RR({muu:1,vo:0.6,gan:0.4},0.5),y:c=>`Ba tháng, ${N(c)} thuộc từng ngõ ngách trang viện, từng giờ đổi gác. Ra về, đầu đã có một tấm bản đồ.`+st('watch')+pf(2)+fx(c,{money:Math.round(gift/2),vo:1,tam:-2})+fl('a')+vd(6,12,'Nhà mình có người nằm vùng trong đám hộ vệ của Phạm Trung Kiên.'),
   n:c=>`${N(c)} bị nghi ngờ nên bị đuổi sau hai tuần, kèm lời răn đe.`+st('fight')+kp(2)+fx(c,{fame:-1,tam:-4})+fl('a')+vd(5,10,'Phạm Trung Kiên nghi nhà mình cài người.')}]}}),
VE('A',{id:'vil_a_chung',t:'Thuế thêm của hào lý mới',vw:0.45,
 x:c=>`Đầu năm, thuế được thêm một khoản "chi phí tu bổ đình chùa" do hào lý ${KN} thu. Người này mới nổi, nhưng đi đâu cũng có người theo. Cả làng bàn tán, kẻ khen ông ta làm được việc, kẻ cúi đầu im lặng.`,
 o:c=>{const pay=loss(3,6);return [
  {l:`Nộp đủ cho yên (${fm(pay)})`,c:()=>G.money()>=pay,f:c=>`Số tiền nộp xong, biên lai ghi bằng chữ rất đẹp. Không ai biết đình chùa được tu bổ thế nào.`+st('hide')+kp(3)+fx(c,{money:-pay,tam:-2})+fl('a')+vd(6,12,'Nhà mình nộp thuế thêm cho Phạm Trung Kiên.')},
  {l:'Đòi xem sổ thu chi tu bổ',r:RR({tri:1,khau:0.8,eq:0.3},0.5),y:c=>`Hắn lúng túng, đưa ra sổ chép vội. Vài chỗ phi lý. Cả làng thấy nhà mình dám hỏi.`+st('fight')+pf(1)+dt(4)+fx(c,{fame:3,tam:4})+fl('a')+vd(5,10,'Nhà mình đòi xem sổ thu chi của Phạm Trung Kiên.'),
   n:c=>`Hắn bảo sổ ở chỗ quan trên, ai muốn xem cứ đi hỏi. Nhà mình mất uy.`+st('fight')+kp(2)+fx(c,{fame:-2,tam:-3})+fl('a')+vd(5,10,'Nhà mình hỏi sổ mà Phạm Trung Kiên không đưa.')},
  {l:'Nộp nhưng xin biên lai, rồi cất cẩn thận',r:RR({tri:0.8,muu:0.6},0.62),y:c=>`Tờ biên lai ghi số tiền thu thật khác hẳn số trong sổ trình quan. Một mối nhỏ để sau.`+st('watch')+pf(1)+fx(c,{money:-pay,tam:-1})+fl('a')+vd(6,12,'Nhà mình giữ biên lai thuế thêm của Phạm Trung Kiên.'),
   n:c=>`Biên lai bị thu lại với cớ "sai mẫu". Nhà mình mất cả tiền và giấy tờ.`+st('hide')+kp(2)+fx(c,{money:-pay,tam:-3})+fl('a')+vd(6,12,'Nhà mình nộp thuế thêm cho Phạm Trung Kiên mà không giữ được chứng từ.')}]}}),

/* ===================== B · Duy xuất hiện, năm cách ===================== */
VE('B',{id:'vil_b_tieusinh',t:'Một tiên sinh xin dạy học',
 x:c=>`Một thư sinh áo cũ sạch sẽ gõ cổng nhà ${N(c)}, tự xưng ${DN}, từ phương xa đến, thi trượt mấy khoa. Anh ta nói giọng ôn tồn, chữ viết đẹp, xin được ở lại làm thầy đồ cho trẻ trong nhà đổi lấy bữa cơm. Tay trái anh ta có một vết sẹo bỏng cũ.`,
 o:c=>[
  {l:'Nhận làm thầy, cho ở lại',f:c=>`Anh ta dạy rất tận tâm, bọn trẻ quý. Chỉ có điều anh ta cứ hay nhìn kỹ sổ sách và khách đến nhà.`+fl('spy')+fl('b')+(vv().D.link=1,'')+fx(c,{tri:1,tam:2})+vd(6,12,'Nhà mình nhận Nguyễn Thành Duy làm thầy đồ.')},
  {l:'Từ chối khéo, cho tiền ăn đường',f:c=>`Anh ta cúi đầu cảm ơn thật thấp rồi đi. Nhìn dáng đi, ${N(c)} thấy lạ lạ.`+fl('b')+fx(c,{money:-m(0.5),tam:1})+vd(6,12,'Nhà mình từ chối Nguyễn Thành Duy lần đầu.')},
  {l:'Hỏi kỹ quê quán, thầy học, ghé đi nghe ngóng',r:RR({tri:1,muu:0.8,khau:0.3},0.55),y:c=>`Quê quán anh ta khai không khớp với những gì nghe được. Có người nói thấy anh ta ngồi ăn với đám của ${KN}.`+pf(1)+fl('b')+fl('duyHint')+vd(6,12,'Nhà mình nghi Nguyễn Thành Duy có liên hệ với Phạm Trung Kiên.'),
   n:c=>`Hỏi vòng vo không ra điều gì, anh ta nhìn ra ý, bỏ đi trong đêm.`+fl('b')+fx(c,{tam:-1})+vd(6,12,'Nguyễn Thành Duy biến mất sau khi bị nhà mình hỏi.')},
  {l:'Nhờ nhà Nguyễn ở Nhạn Môn xem giúp lai lịch',c:()=>V().house('nguyen').rel>=5,f:c=>`Thư hồi âm chậm, ngắn: "Có người họ Nguyễn tên ấy, bị loại khỏi gia phả mười năm trước vì lừa đảo. Cẩn thận." Nhà mình thấy rờn rợn.`+hr('nguyen',3)+pf(1)+fl('duyKnown')+fl('b')+vd(6,12,'Họ Nguyễn xác nhận Duy từng bị ruồng bỏ.')}]}),
VE('B',{id:'vil_b_thaylang',t:'Lang y lạ trong làng',
 x:c=>`Một thầy lang tự xưng ${DN} đến làng mở quán thuốc nhỏ, chữa bệnh không lấy tiền cho người nghèo. Chẳng mấy chốc ai cũng quý. Có lần anh ta ghé nhà ${N(c)} xin nghỉ nhờ vài đêm, cười: "Làm phiền nhưng hứa không để nhà mất gì."`,
 o:c=>[
  {l:'Cho ở lại, lấy làm khách',f:c=>`Anh ta ở hai tháng, chữa bệnh cho cả nhà. Nhưng tối nào cũng có người lạ ghé thăm, ra về trước khi gà gáy.`+fl('spy')+fl('b')+(vv().D.link=1,'')+fx(c,{tam:2})+vd(6,12,'Nhà mình cho Nguyễn Thành Duy ở nhờ.')},
  {l:'Chỉ nhờ chữa bệnh, không cho ở',f:c=>`Anh ta không tỏ thái độ gì, ngày hôm sau đã đi chữa cho nhà khác.`+fl('b')+fx(c,{tam:1})+vd(6,12,'Nhà mình giữ khoảng cách với Nguyễn Thành Duy.')},
  {l:'Âm thầm cho người theo dõi những người lạ ghé thăm',r:RR({muu:1,tri:0.6},0.55),y:c=>`Bốn đêm liền, người theo dõi báo lại: mỗi lần là một người của ${KN}.`+pf(1)+fl('b')+fl('duyHint')+vd(6,12,'Nhà mình biết Nguyễn Thành Duy qua lại với người của Phạm Trung Kiên.'),
   n:c=>`Người theo dõi bị bắt gặp, phải xin lỗi rối rít.`+fl('b')+fx(c,{fame:-1,tam:-2})+vd(6,12,'Việc theo dõi Nguyễn Thành Duy bị lộ.')}]}),
VE('B',{id:'vil_b_thulai',t:'Thư lại kiểm sổ',vc:()=>hasBiz()||hasQuan()||S().farm.own>=3,
 x:c=>`Quan huyện cử một thư lại tên ${DN} đến kiểm lại sổ sách thuế của vùng. Người này tính nhanh hơn cả bàn tính, lại tế nhị, không làm ai mất mặt. Lúc rời đi, anh ta ngỏ ý: "Nếu nhà muốn, tôi sẵn sàng giúp chỉnh sổ cho đúng quy cách mỗi năm."`,
 o:c=>[
  {l:'Nhận, nhờ anh ta chỉnh sổ cho đúng',f:c=>`Sổ sách đẹp hơn thật. Nhưng giờ anh ta biết rõ gia tài, ngày thu hoạch, tên từng người làm công.`+fl('spy')+fl('b')+(vv().D.link=1,'')+fx(c,{m:2,tam:2})+vd(6,12,'Nguyễn Thành Duy nắm sổ sách nhà mình.')},
  {l:'Cảm ơn, nói tự lo được',f:c=>`Anh ta gật đầu, lịch sự rút lui. Nhưng mấy ngày sau, một viên chức khác ghé nhà hỏi về những khoản chưa kê khai.`+fl('b')+fx(c,{money:-m(1),tam:-1})+vd(6,12,'Nguyễn Thành Duy để lại ấn tượng không rõ ràng.')},
  {l:'Nhờ người trong huyện dò xem anh ta phụng sự ai',r:RR({muu:1,eq:0.6,khau:0.4},0.5),y:c=>`Người trong huyện cho biết: thư lại này vốn do ${KN} tiến cử lên quan huyện.`+pf(2)+fl('b')+fl('duyHint')+vd(6,12,'Nhà mình biết Nguyễn Thành Duy do Phạm Trung Kiên tiến cử.'),
   n:c=>`Hỏi không ra điều gì, chỉ khiến thư lại để ý nhà mình hơn.`+fl('b')+kp(1)+fx(c,{tam:-2})+vd(6,12,'Nguyễn Thành Duy để ý nhà mình.')}]}),
VE('B',{id:'vil_b_giapha',t:'Người sưu tầm gia phả',
 x:c=>`Một văn nhân tên ${DN}, tự xưng đang biên soạn "Bách tính chí", đi từng nhà xin sao chép gia phả. Anh ta nói giọng điềm đạm, chữ đẹp, viện dẫn đủ điển cố, nhưng mỗi lần hỏi lại rất kỹ về ai làm quan, ai giàu, ai đã đi lính.`,
 o:c=>[
  {l:'Cho chép, bởi sách ấy có ích',f:c=>`Một buổi chiều, anh ta chép sạch cả tập gia phả. Người đọc sẽ không biết ai là người đã cho phép.`+fl('spy')+fl('b')+(vv().D.link=1,'')+fx(c,{tam:2,fame:1})+vd(6,12,'Nguyễn Thành Duy chép gia phả nhà mình.')},
  {l:'Từ chối, bảo gia phả là việc nhà',f:c=>`Anh ta mỉm cười thật hiền: "Nhà nào cũng nói thế." Rồi cúi chào đi.`+fl('b')+fx(c,{tam:0})+vd(6,12,'Nhà mình không cho Nguyễn Thành Duy chép gia phả.')},
  {l:'Chép lại đúng như anh ta hỏi, nhưng ghi lại câu hỏi',r:RR({tri:1,muu:0.7},0.58),y:c=>`Ghi lại các câu hỏi, ${N(c)} thấy chúng không giống một văn nhân. Giống một thám tử.`+pf(1)+fl('b')+fl('duyHint')+vd(6,12,'Nhà mình nhận ra Nguyễn Thành Duy đang thu thập tin tức.'),
   n:c=>`Ghi chép sơ sài, không rút ra điều gì.`+fl('b')+vd(6,12,'Nhà mình chưa hiểu Nguyễn Thành Duy muốn gì.')},
  {l:'Hỏi nhà Nguyễn ở Nhạn Môn có biết người này không',c:()=>V().house('nguyen').rel>=5,f:c=>`Thư trả lời: "Người tên ấy từng ở dòng thứ hai của họ ta, bị loại khỏi gia phả. Đừng tin."`+hr('nguyen',3)+pf(1)+fl('duyKnown')+fl('b')+vd(6,12,'Họ Nguyễn xác nhận Duy từng bị ruồng bỏ.')}]}),
VE('B',{id:'vil_b_tiec',t:'Bàn tiệc nhà hào lý',vc:()=>S().fame>=40||G.tierIdx()>=2,vw:0.8,
 x:c=>`${KN} mở tiệc lớn mừng chức mới, mời các nhà có tiếng trong vùng, nhà mình cũng nhận thiếp. Cạnh hắn luôn có một người đàn ông ngoài ba mươi mặc áo nho sinh, chỉ cười, thỉnh thoảng thì thầm vào tai chủ tiệc. Có người bảo đó là mưu sĩ ${DN}.`,
 o:c=>{const gift=m(R(3,6));return [
  {l:`Đến dự, mang lễ (${fm(gift)})`,c:()=>G.money()>=gift,f:c=>`Cả bữa tiệc ${N(c)} thấy chủ tiệc nói gì, người áo nho sinh gật đầu hay lắc đầu. Hắn không thật sự là chủ.`+fl('b')+(vv().D.link=1,'')+kp(2)+fx(c,{money:-gift,tam:-1})+vd(6,12,'Nhà mình dự tiệc của Phạm Trung Kiên và thấy Duy.')},
  {l:'Đến dự, quan sát người áo nho sinh',r:RR({muu:1,tri:0.8},0.55),y:c=>`${N(c)} theo dõi người ấy suốt buổi tiệc. Về nhà viết ra từng cử chỉ, từng người nói chuyện với anh ta. Một chân dung rõ nét.`+pf(1)+fl('b')+fl('duyHint')+fx(c,{money:-Math.round(gift/2),tam:-1})+vd(6,12,'Nhà mình hiểu vai trò của Nguyễn Thành Duy bên cạnh Phạm Trung Kiên.'),
   n:c=>`Đến cuối tiệc vẫn không rõ ai là ai, chỉ nghe được vài câu chuyện phiếm.`+fl('b')+fx(c,{money:-Math.round(gift/2),tam:-1})+vd(6,12,'Nhà mình dự tiệc của Phạm Trung Kiên.')},
  {l:'Cáo bận, gửi thiếp từ chối',f:c=>`Hắn không mời lại lần thứ hai, nhưng ghi sổ nhà mình vào danh sách những kẻ không nể.`+fl('b')+kp(2)+fx(c,{fame:-1})+vd(6,12,'Nhà mình từ chối tiệc của Phạm Trung Kiên.')}]}}),

/* ===================== L · manh mối ===================== */
VE('L',{id:'vil_l_so',t:'Cuốn sổ thuế thứ hai',vc:()=>S().farm.own>=1||hasBiz()||hasQuan(),
 x:c=>`Một thư lại già, gặp ${N(c)} ở quán nước đầu làng, run run thì thầm: "Có hai quyển sổ, một cho quan trên xem, một thật. Thật ở trong rương dưới gầm giường ông ${KN}. Tôi sắp về hưu, không muốn mang tội."`,
 o:c=>{const pay=m(R(6,10));return [
  {l:`Trả công để ông ấy sao chép (${fm(pay)})`,c:()=>G.money()>=pay,f:c=>`Hai đêm sau, một tờ giấy cuộn lại nằm trong tay ${N(c)}, ghi đủ khoản thu thật.`+pf(2)+fx(c,{money:-pay,tam:2})+vd(6,12,'Nhà mình có bản sao sổ thuế thật của Phạm Trung Kiên.')},
  {l:'Tự mình đột nhập đêm để chép',r:RR({vo:0.6,muu:1,gan:0.5},0.4),y:c=>`${N(c)} lẻn vào lúc canh ba, chép được một phần đáng kể.`+pf(2)+fx(c,{tam:3,vo:1})+vd(6,12,'Nhà mình tự chép được sổ thuế thật của Phạm Trung Kiên.'),
   n:c=>`${N(c)} bị bắt gặp, phải chạy trốn qua hàng rào, để lại một mảnh áo.`+kp(2)+fx(c,{suc:-5,fame:-2,tam:-5})+vd(6,12,'Nhà mình bị phát hiện khi lẻn vào nhà Phạm Trung Kiên.')},
  {l:'Từ chối, sợ mắc vạ',f:c=>`Thư lại già thở dài, đi mất. Sau đó không còn ai ghé tìm nữa.`+fx(c,{tam:-2})+vd(6,12)}]}}),
VE('L',{id:'vil_l_chung',t:'Người làng bị giấu',
 x:c=>`Bà lão đầu làng dắt ${N(c)} vào chùa, chỉ vào gian sau: một người đàn ông gầy nhom, mắt mờ đục, ngồi co trong góc. Bà thì thầm: "Chính hắn đã thấy người của ${KN} đốt kho thóc năm ngoái. Sư thầy giấu, nhưng trong làng ai cũng biết."`,
 o:c=>[
  {l:'Xin sư thầy cho nhờ che chở, cung cấp lương thực',c:()=>G.money()>=m(2),f:c=>`Sư thầy bằng lòng. Người đàn ông ấy dần dần mở miệng, kể ra từng người, từng giờ. Một nhân chứng sống.`+wt(1)+pf(1)+fx(c,{money:-m(2),tam:3,fame:1})+vd(6,12,'Nhà mình có nhân chứng việc đốt kho thóc của Phạm Trung Kiên.')},
  {l:'Đưa người ấy đến nhà mình giấu',r:RR({muu:0.8,vo:0.4,eq:0.4},0.5),y:c=>`Đêm đó đưa đi suôn sẻ, không ai biết. Nhà mình có một nhân chứng thật, nhưng cũng giữ thêm một bí mật.`+wt(1)+pf(1)+fx(c,{tam:2})+vd(6,12,'Nhà mình giấu một nhân chứng đốt kho của Phạm Trung Kiên.'),
   n:c=>`Có kẻ theo dõi. Sáng hôm sau người ấy biến mất, chỉ còn lại vết máu ở cổng chùa.`+kp(3)+fx(c,{tam:-8,fame:-1})+vd(6,12,'Một nhân chứng bị Phạm Trung Kiên bắt đi.')},
  {l:'Khuyên bà lão đừng nói với ai',f:c=>`Bà lão buồn rầu gật đầu. Chuyện chìm đi.`+fx(c,{tam:-2})+vd(6,12)}]}),
VE('L',{id:'vil_l_thu',t:'Lá thư lạc',vw:0.9,
 x:c=>`Người đưa thư của quan huyện làm rơi một phong thư ngay trước cửa nhà ${N(c)}. Phong thư không đề tên người nhận, chỉ ghi hai chữ "Mật" và một dấu ấn của ${KN}. Người đưa thư đi xa rồi, chưa hay biết.`,
 o:c=>[
  {l:'Đọc ngay, nhớ nội dung rồi trả lại',r:RR({tri:1,muu:0.6},0.55),y:c=>`Thư nói về một khoản tiền gửi lên kinh, chia phần cho ai, vào ngày nào. ${N(c)} nhớ nguyên văn, đêm đó chép lại.`+pf(1)+fx(c,{tam:2})+vd(6,12,'Nhà mình đọc được một lá thư mật của Phạm Trung Kiên.'),
   n:c=>`Thư viết bằng mật ngữ, ${N(c)} không hiểu gì. Trả lại, hy vọng người đưa thư không biết.`+fx(c,{tam:-1})+vd(6,12)},
  {l:'Giữ lại, nhờ người giải mã',c:()=>G.money()>=m(3),r:RR({tri:0.9,muu:0.7,khau:0.2},0.5),y:c=>`Thầy đồ già giải ra: các khoản lót tay cho tri phủ, danh sách người nhận. Một bằng chứng đắt giá.`+pf(2)+fx(c,{money:-m(3),tam:3})+fl('thu')+vd(6,12,'Nhà mình giải được thư mật của Phạm Trung Kiên.'),
   n:c=>`Người giải mã là kẻ ba hoa, tin đồn loang khắp làng. Phạm Trung Kiên nghe được và gây khó dễ.`+kp(3)+fx(c,{money:-m(3),fame:-1,tam:-4})+vd(6,12,'Phạm Trung Kiên biết nhà mình giữ thư của hắn.')},
  {l:'Trả lại ngay, không đọc',f:c=>`Người đưa thư quay lại tìm, thấy phong thư còn nguyên, rối rít cảm ơn. Không ai biết đã có chuyện gì.`+fx(c,{liem:3,tam:1})+vd(6,12)}]}),
VE('L',{id:'vil_l_dinh',t:'Họp dân ở đình làng',
 x:c=>`Mấy cụ già trong làng sang tận nhà ${N(c)} thưa: "Bao năm không ai dám nói với ông ${KN}. Nhà có tiếng thì nên đứng ra, để chúng tôi có người cùng góp lời." Họ muốn mở họp ở đình, mời cả chức sắc.`,
 o:c=>{const cost=m(R(3,6));return [
  {l:`Đứng ra triệu tập, lo cơm nước (${fm(cost)})`,c:()=>G.money()>=cost,r:RR({khau:1,eq:0.8,gan:0.3},0.5),y:c=>`Gần trăm người đến, ai cũng được nói, ghi lại bằng lời thề. Đình làng lần đầu đông như vậy.`+dt(10)+wt(1)+fx(c,{money:-cost,fame:5,cfame:2,tam:6})+vd(6,12,'Nhà mình triệu tập dân làng họp ở đình để phản đối.'),
   n:c=>`Người đến ít, vài người sợ bỏ về giữa chừng. Buổi họp rã nhưng cũng gieo được một ít tiếng nói.`+dt(3)+fx(c,{money:-cost,tam:-2})+vd(6,12,'Buổi họp dân ở đình làng không thành.')},
  {l:'Nhờ cụ già đứng chủ trì, nhà mình ngồi sau',f:c=>`Cụ già đứng ra nói khéo. Họp xong, nhiều người hơn biết thêm điều đáng biết, nhưng không ai nhắc tên nhà mình.`+dt(5)+fx(c,{money:-Math.round(cost/2),tam:1})+vd(6,12,'Dân làng họp phản đối, nhà mình đứng sau.')},
  {l:'Từ chối, vì sợ liên lụy',f:c=>`Mấy cụ già nhìn nhau, thở dài. Họ không đến nữa.`+dt(-3)+fx(c,{fame:-2,tam:-3})+vd(6,12,'Nhà mình từ chối đứng ra họp dân.')}]}}),
VE('L',{id:'vil_l_tho',t:'Lão thợ đóng kho',vc:()=>vv().pf>=1,
 x:c=>`Lão thợ mộc già ở làng bên đến sửa cửa nhà ${N(c)}. Lúc uống nước, lão kể bâng quơ: "Hai mươi năm làm thợ chưa từng làm kho nào kỳ lạ như cái kho ông ${KN} đặt tôi dựng ở sau núi. Cửa ngầm, giếng trộn, không lối ra cho chuột."`,
 o:c=>[
  {l:'Hỏi kỹ vị trí và cấu trúc, mời lão ở lại ăn cơm',r:RR({khau:0.8,eq:0.8,tri:0.4},0.5),y:c=>`Lão vẽ cả bản sơ đồ trên mặt bàn bằng nước chè. Kho nằm cạnh khe suối sau núi, đầy gạo và muối chưa nộp thuế.`+wt(1)+pf(1)+fx(c,{tam:2})+vd(6,12,'Nhà mình có người thợ biết kho bí mật của Phạm Trung Kiên.'),
   n:c=>`Lão cảnh giác, sực nhớ, bỏ dở câu chuyện. "Tôi già nên lẩm cẩm."`+fx(c,{tam:-1})+vd(6,12)},
  {l:'Cử người âm thầm lên núi xem',r:RR({vo:0.6,muu:0.8,suc:0.4},0.5),y:c=>`Người đi tìm thấy kho, đếm được gần hai trăm bao gạo. Về báo lại, bình thản như đi hái củi về.`+pf(2)+fx(c,{vo:1,tam:2})+vd(6,12,'Nhà mình tận mắt thấy kho bí mật của Phạm Trung Kiên.'),
   n:c=>`Người đi lạc đường, về tay không, người đầy muỗi cắn.`+fx(c,{suc:-2,tam:-2})+vd(6,12)},
  {l:'Bảo lão đừng kể thêm, kẻo mắc họa',f:c=>`Lão gật đầu, rút lui. Sự việc lại chìm.`+fx(c,{tam:-1})+vd(6,12)}]}),
VE('L',{id:'vil_l_thuoc',t:'Thuốc giả cho lính đồn',vc:()=>V().house('duong').rel>=5||has(p=>p.job==='y'),
 x:c=>`Một người học trò cũ của ${hn('duong')} gặp ${N(c)} giữa chợ, kể: có lô thuốc kim sang trộn bột gạo, cung cấp cho một đồn lính ở biên giới, do ${KN} làm trung gian. Hai lính đã chết vì vết thương mưng mủ. Cậu ta không dám nói với ai.`,
 o:c=>[
  {l:'Nhờ họ Dương xác nhận, rồi thu thập chứng cứ cùng cậu',c:()=>V().house('duong').rel>=5,f:c=>`Dược Cốc gửi người đến, xét nghiệm lô thuốc còn sót, ghi biên bản và ký tên. Một chứng cứ đứng được.`+hr('duong',8)+pf(2)+wt(1)+fx(c,{tam:3,fame:2})+vd(6,12,'Họ Dương xác nhận lô thuốc giả của Phạm Trung Kiên.')},
  {l:'Tự mình đi hỏi người học trò và lính còn sống',r:RR({khau:0.8,eq:0.8,tri:0.5},0.5),y:c=>`Hai lính đồn còn sống sẵn lòng làm chứng, nếu có người bảo đảm.`+wt(1)+pf(1)+fx(c,{tam:3,fame:1})+vd(6,12,'Nhà mình có người làm chứng về thuốc giả của Phạm Trung Kiên.'),
   n:c=>`Lính đồn sợ, không nói. Người học trò cũng cáo bệnh từ chối gặp.`+fx(c,{tam:-3})+vd(6,12)},
  {l:'Khuyên cậu im lặng đi',f:c=>`Cậu cúi đầu, ra đi. Hai chữ "thuốc giả" nghe sao nặng nề.`+fx(c,{tam:-4})+vd(6,12)}]}),
VE('L',{id:'vil_l_thuyen',t:'Thuyền lậu ở Bạch Sa',vc:()=>V().house('kieu').rel>=5||hasBiz(),
 x:c=>`Một thủy thủ già của ${hn('kieu')} ghé thăm ${N(c)} khi qua vùng, rủ rỉ: "Đêm nào ở bến vắng cũng có thuyền không treo cờ. Thuyền ấy chở muối và sắt sang nước ngoài, bọn buôn lậu là người của ${KN}. Ông Kiều đang muốn xử mà thiếu người làm chứng ở trong."`,
 o:c=>[
  {l:'Giúp thủy sư đô đốc Kiều bắt quả tang',c:()=>V().house('kieu').rel>=5,r:RR({muu:0.8,vo:0.6,gan:0.5},0.5),y:c=>`Một đêm không trăng, hai chiếc thuyền lậu bị chặn lại giữa vịnh, hàng và sổ chuyến đều còn nguyên. Thủy binh ghi tên nhà mình vào biên bản.`+hr('kieu',8)+pf(2)+fx(c,{fame:3,tam:5}),
   n:c=>`Thuyền lậu đổi lộ trình, chuyến đi rơi vào khoảng không.`+hr('kieu',1)+fx(c,{tam:-3})},
  {l:'Tự mình lần theo người chở hàng',r:RR({muu:1,tri:0.6},0.45),y:c=>`${N(c)} lần ra được tên một chủ kho ở cảng, người đồng ý khai nếu được bảo đảm.`+wt(1)+pf(1)+fx(c,{tam:2}),
   n:c=>`Chủ kho cảnh giác, báo cho Kiên. Một lời cảnh cáo được gửi đến nhà mình.`+kp(2)+fx(c,{tam:-4})},
  {l:'Bỏ qua, chuyện này không phải của nhà mình',f:c=>`Thủy thủ già nhìn thật lâu, rồi đi.`+fx(c,{tam:-2})}].map(o=>{const f0=o.f,y0=o.y,n0=o.n;if(f0)o.f=c=>f0(c)+vd(6,12,'Nhà mình giúp tìm chứng cứ thuyền lậu của Phạm Trung Kiên.');if(y0)o.y=c=>y0(c)+vd(6,12,'Nhà mình giúp tìm chứng cứ thuyền lậu của Phạm Trung Kiên.');if(n0)o.n=c=>n0(c)+vd(6,12);return o})}),
VE('L',{id:'vil_l_gp',t:'Trang gia phả bị xé',vc:()=>V().house('nguyen').rel>=5&&!vv().fl.duyKnown,
 x:c=>`Một người của ${hn('nguyen')} dừng lại ở nhà ${N(c)} trên đường về Nhạn Môn, đưa ra một nửa trang gia phả bị xé, chữ lem lấm: "Đây là trang chép tên người bị loại khỏi họ Nguyễn mười năm trước. Tên là ${DN}. Nghe nói hắn đang làm mưu sĩ ở vùng này."`,
 o:c=>[
  {l:'Xin nhà Nguyễn chép lại đầy đủ rồi ký làm bằng',f:c=>`Mười ngày sau, bản chép đầy đủ gửi tới, đóng dấu họ Nguyễn: Nguyễn Thành Duy, con thứ chi ba, bị trục xuất vì giả mạo chữ ký và lừa đảo.`+hr('nguyen',8)+pf(2)+fl('duyKnown')+fx(c,{tam:3,fame:1})+vd(6,12,'Họ Nguyễn cấp bản ghi lý lịch tội trạng của Nguyễn Thành Duy.')},
  {l:'Chỉ nhận lời nhắn, không giữ giấy tờ',f:c=>`Nghe xong, ${N(c)} chỉ gật đầu cảm ơn. Chuyện này có thể giúp ích sau, nhưng bây giờ chưa đủ chứng cứ.`+pf(1)+fl('duyKnown')+hr('nguyen',2)+vd(6,12,'Nhà mình biết lý lịch của Nguyễn Thành Duy.')}]}),
VK('L',{id:'vil_l_ankhan',t:'Kẻ đồng bọn ăn năn',vc:()=>vv().K.rank>=1&&vv().pf>=2,
 x:c=>`Một người đàn ông tàn tạ, thân mang mấy vết sẹo bỏng, đến cổng nhà ${N(c)} lúc sẩm tối. Ông ta nói: "Mười năm tôi làm việc cho ${KN}, đốt nhà, đánh người, đẩy dân vào ngõ cụt. Con gái tôi mới mất. Tôi muốn nói hết trước khi chết."`,
 o:c=>[
  {l:'Cho vào nhà, ghi lại lời khai từng việc',f:c=>`Ông ta kể suốt đêm, ghi được hơn bốn mươi việc, tên người, ngày giờ. Sáng ra ông ta xin ký tên, tay run không viết nổi, phải điểm chỉ.`+wt(1)+pf(2)+fx(c,{tam:5,fame:2,eq:1})+vd(6,12,'Một kẻ đồng bọn ăn năn khai ra tội lỗi của Phạm Trung Kiên.')},
  {l:'Cho ăn, cho ở, rồi chờ có thể đưa ra công đường',c:()=>G.money()>=m(4),f:c=>`Ông ta ở lại hai tháng, dần dần lấy lại sức. Rồi một ngày ông ta bảo: "Tôi sẵn sàng." Đó là một nhân chứng đáng giá.`+wt(1)+pf(1)+fx(c,{money:-m(4),tam:5,eq:2})+vd(6,12,'Nhà mình nuôi một kẻ đồng bọn ăn năn của Phạm Trung Kiên.')},
  {l:'Đuổi đi vì sợ mắc vạ',f:c=>`Ông ta cúi đầu, quay đi, không quay lại. Mấy hôm sau nghe tin ông ta chết ngoài bờ ruộng.`+fx(c,{tam:-6,eq:-1})+vd(6,12,'Nhà mình từ chối một kẻ đồng bọn ăn năn.')}]}),
VK('L',{id:'vil_l_ruong',t:'Rương sổ trôi sông',vc:()=>vv().K.rank>=1&&vv().pf>=3,vcd:240,
 x:c=>`Sau trận lũ, ${N(c)} ra sông kiểm bãi bồi, thấy một chiếc rương gỗ mắc vào gốc tre, khóa đồng gỉ sét. Bên trong vẫn nguyên một chồng sổ sách và thư từ, chữ mực còn đọc được, đóng dấu của ${KN}.`,
 o:c=>[
  {l:'Mang về hong khô, chép lại từng trang',r:RR({tri:1,muu:0.5,cc:0.4},0.55),y:c=>`Ba đêm liền, cả nhà quây quanh tờ giấy ố. Ngày tháng, số tiền, tên người chi trả, tất cả đều khớp với những gì nhà mình đã biết.`+pf(3)+fx(c,{tri:1,tam:5,fame:1})+vd(6,12,'Nhà mình vớt được rương sổ của Phạm Trung Kiên.'),
   n:c=>`Giấy rã nát khi hong, chỉ cứu được vài trang.`+pf(1)+fx(c,{tam:-2})+vd(6,12,'Rương sổ của Phạm Trung Kiên rã nát.')},
  {l:'Giao nguyên rương cho quan, tin ở công đường',f:c=>`Rương được ghi vào hồ sơ. Vài ngày sau nghe tin quan huyện nhận mà không thấy gì thêm. Có vẻ nó đã biến mất trên đường đi.`+fx(c,{tam:-4})+kp(1)+vd(6,12,'Rương sổ giao cho quan rồi mất tăm.')},
  {l:'Thả lại xuống sông, coi như không thấy',f:c=>`Dòng nước cuốn chiếc rương đi nhẹ như chưa từng có.`+fx(c,{tam:-3})+vd(6,12)}]}),
VE('L',{id:'vil_l_linh',t:'Người lính cũ từ Nhạn Môn',vc:()=>V().house('nguyen').rel>=5||has(p=>p.job==='quan_ngu'||p.merit>0),
 x:c=>`Một người lính già về hưu, mất một chân, ngồi nhờ ở quán đầu làng. Nghe ${N(c)} nhắc đến ${KN}, ông gõ nạng xuống đất: "Tên ấy bán gạo hư cho đồn Nhạn Môn, ăn bớt một nửa. Mười hai anh em tôi chết đói trong mùa đông ấy."`,
 o:c=>[
  {l:'Mời ông về nhà, ghi lời khai kỹ lưỡng',f:c=>`Ông kể từng chuyến xe gạo, từng phiên giao nhận, từng tên bạn chết. Sổ của quan binh sẽ khớp.`+wt(1)+pf(1)+fx(c,{money:-m(1),tam:3,eq:1})+vd(6,12,'Nhà mình có lời khai người lính cũ ở Nhạn Môn.')},
  {l:'Báo tin cho đô đốc Nguyễn ở ải',c:()=>V().house('nguyen').rel>=5,f:c=>`Thư gửi lên ải, hồi âm nhanh: "Cho người giữ ông ấy cẩn thận, ta sẽ cho kiểm kê kho." Ngày sau, bản biên nhận của kho thực sự trở thành chứng cứ.`+hr('nguyen',6)+wt(1)+pf(2)+fx(c,{tam:3})+vd(6,12,'Họ Nguyễn kiểm kê kho gạo Nhạn Môn.')},
  {l:'Cho ít tiền rồi tiễn về',f:c=>`Ông cười đau xót: "Ít nhất có người nghe tôi."`+fx(c,{money:-m(0.5),tam:-1})+vd(6,12)}]}),
VE('L',{id:'vil_l_cho',t:'Chợ muối bị độc quyền',vw:0.8,
 x:c=>`Giá muối trong chợ tăng gấp đôi chỉ sau một tháng. Người bán nói thẳng: "Ông ${KN} đã mua hết các vựa, ai muốn muối phải mua qua tay ông ta." Dân trong vùng bắt đầu ăn nhạt, có nhà phải đi xa mua lậu.`,
 o:c=>{const cost=m(R(3,6));return [
  {l:`Mua muối từ nơi khác về bán lại cho dân theo giá gốc (${fm(cost)})`,c:()=>G.money()>=cost,r:RR({ql:0.8,muu:0.8,eq:0.4},0.5),y:c=>`Muối từ tận vùng ven biển được chở về, bán theo giá gốc. Dân kéo đến mua đông, thuộc hạ của Kiên đành đứng nhìn.`+dt(8)+fx(c,{money:-Math.round(cost/2),fame:4,cfame:1,tam:5})+vd(6,12,'Nhà mình phá thế độc quyền muối của Phạm Trung Kiên.'),
   n:c=>`Chuyến muối bị chặn giữa đường, thuộc hạ Kiên tịch thu hết.`+kp(2)+fx(c,{money:-cost,tam:-4})+vd(6,12,'Chuyến muối của nhà mình bị Phạm Trung Kiên chặn.')},
  {l:'Ghi lại lời than của dân, viết đơn gửi quan trên',r:RR({khau:0.8,tri:0.8,eq:0.3},0.55),y:c=>`Đơn có hàng trăm điểm chỉ, đến tay quan tuần án. Dù chưa được xử, chuyện đã lan xa.`+dt(6)+pf(1)+fx(c,{fame:3,tam:3})+vd(6,12,'Nhà mình gửi đơn dân về nạn độc quyền muối.'),
   n:c=>`Đơn bị chặn từ cổng huyện.`+dt(1)+fx(c,{tam:-2})+vd(6,12)},
  {l:'Không dám làm gì',f:c=>`Cả nhà ăn nhạt cùng bà con. Nỗi hậm hực tích lại.`+dt(-2)+fx(c,{tam:-3})+vd(6,12)}]}}),
VE('L',{id:'vil_l_hich',t:'Bài hịch của thầy đồ',vc:()=>has(scholar)&&vv().dt>=10,vwho:scholar,
 x:c=>`Trong cơn phẫn uất của dân, ${N(c)} ngồi viết suốt đêm một bài hịch lên án những việc ${KN} đã làm: thuế khống, kho giấu, người bị bắt. Chữ nghĩa sắc, vần điệu gọn. Sáng ra, có người đọc lướt qua đã nổi gai ốc.`,
 o:c=>[
  {l:'Cho dán ở đình làng và cổng chợ',r:RR({khau:0.8,tri:1,gan:0.4},0.5),y:c=>`Ba hôm sau, bài hịch đã được học thuộc ở nhiều nơi trong vùng. Thuộc hạ Kiên xé đi, nhưng mỗi tờ bị xé, nhà mình lại có người chép hai tờ.`+dt(10)+pf(1)+fx(c,{fame:6,cfame:2,tam:6,tri:1})+vd(6,12,'Bài hịch lên án Phạm Trung Kiên lan khắp vùng.'),
   n:c=>`Bài hịch bị tố là vu khống, quan huyện gọi ${N(c)} lên cảnh cáo.`+kp(3)+fx(c,{fame:-3,tam:-5})+vd(6,12,'Bài hịch bị quan huyện bắt lỗi.')},
  {l:'Chỉ truyền tay trong giới nho sĩ',f:c=>`Bài hịch lan trong giới sĩ phu, ghi nhớ ở các sách vở. Dân đen thì không đọc được, nhưng những người nên đọc đã đọc.`+dt(4)+pf(1)+fx(c,{fame:3,tri:1,tam:2})+vd(6,12,'Giới sĩ phu đọc bài hịch về Phạm Trung Kiên.')},
  {l:'Xé bỏ, vì sợ họa',f:c=>`Mảnh giấy nhỏ tơi bay vào gió. Bài hịch mất đi nhưng nỗi nhục thì ở lại.`+fx(c,{tam:-4})+vd(6,12)}]}),
VE('L',{id:'vil_l_gop',t:'Gom từng chút một',vonce:false,vcd:30,vw:0.45,
 x:c=>`Mấy tháng qua, ${N(c)} lặng lẽ ghi lại những gì thấy được về ${KN}: ai đến, ai đi, ai nhận tiền, ai mất ruộng. Chữ nghĩa lộn xộn, nhưng mỗi tờ giấy đều có một sự thật.`,
 o:c=>[
  {l:'Ngồi chép lại gọn gàng, đối chiếu',r:RR({tri:1,cc:0.6,muu:0.4},0.6),y:c=>`Sau vài đêm, một bảng ghi rõ ràng đã nằm gọn trong rương.`+pf(1)+fx(c,{tri:1,tam:2})+vd(5,10,'Nhà mình chỉnh lý hồ sơ về Phạm Trung Kiên.'),
   n:c=>`Chép xong thì phát hiện nhiều chỗ mâu thuẫn, phải hỏi lại người này người kia.`+fx(c,{tam:-1})+vd(5,10)},
  {l:'Để đó, đợi có thêm mối khác',f:c=>`Rương giấy vẫn nằm đó, nhưng ý chí vẫn còn.`+fx(c,{tam:0})+vd(5,10)}]}),
VE('L',{id:'vil_l_hoi',t:'Hỏi chuyện dân làng',vonce:false,vcd:30,vw:0.45,
 x:c=>`${N(c)} đi qua mấy làng lân cận, ghé từng nhà uống nước, nói chuyện thế sự. Nhiều người chưa dám mở miệng, nhưng có vài ánh mắt dừng lại lâu hơn.`,
 o:c=>[
  {l:'Kiên nhẫn ngồi nghe từng người một',r:RR({eq:1,khau:0.7,hd:0.4},0.55),y:c=>`Một người đàn bà kể chuyện chồng bị bắt đi phu, mất tích mười năm. Một lão nông chỉ vào mảnh ruộng bị chiếm. Hai người đồng ý ra làm chứng khi nào cần.`+wt(1)+dt(3)+fx(c,{eq:1,tam:3})+vd(5,10,'Nhà mình thu thập thêm lời kể của dân làng.'),
   n:c=>`Đi cả ngày, chỉ nghe than thở chung chung.`+dt(1)+fx(c,{tam:-1})+vd(5,10)},
  {l:'Về nhà, không hỏi thêm',f:c=>`Một chuyến đi ngắn, không ai nhớ.`+vd(5,10)}]}),

VE('L',{id:'vil_l_dan',t:'Giúp dân qua cơn khó',vonce:false,vcd:30,vw:0.6,vc:()=>G.money()>=m(4),
 x:c=>`Mùa giáp hạt, nhiều nhà quanh vùng cạn gạo, thuế của ${KN} đã lấy hết phần dư. ${N(c)} nhìn những đứa trẻ gầy gò đứng trước ngõ và nghĩ nhà mình có thể làm được gì đó, dù không chắc được gì lại.`,
 o:c=>{const cost=m(R(3,6));return [
  {l:`Mở kho phát gạo cho các nhà thiếu (${fm(cost)})`,c:()=>G.money()>=cost,f:c=>`Gạo chia theo đầu người, ghi sổ rõ ràng. Nhiều nhà rơi nước mắt, có người hứa sẽ làm chứng khi cần.`+dt(8)+fx(c,{money:-cost,fame:3,cfame:1,eq:1,tam:6})+vd(5,10,'Nhà mình mở kho giúp dân qua giáp hạt.')},
  {l:`Cho vay không lãi, hẹn trả sau mùa gặt (${fm(Math.round(cost/2))})`,c:()=>G.money()>=Math.round(cost/2),f:c=>`Người vay ghi nhớ ơn, hầu hết trả đúng hẹn. Nhà mình mất ít mà được lòng người.`+dt(5)+fx(c,{money:-Math.round(cost/3),fame:2,tam:4})+vd(5,10,'Nhà mình cho dân vay không lãi.')},
  {l:'Chỉ giúp họ hàng gần',f:c=>`Ít ồn ào, ít tốn kém, cũng ít ai biết.`+dt(1)+fx(c,{money:-Math.round(cost/4),tam:1})+vd(5,10)}]}}),
/* ===================== P · áp lực ===================== */
VE('P',{id:'vil_p_thue',t:'Truy thuế khống',vc:()=>S().farm.own>=1||hasBiz()||hasQuan(),vwho:p=>true,
 x:c=>`Thuộc hạ của ${KN} đến nhà ${N(c)} đọc một tờ giấy: nhà mình thiếu thuế ba năm trước, tính cả tiền phạt trễ hạn. Số tiền lớn hơn nhiều so với con số trong sổ thuế thật. Họ cho ba ngày để nộp.`,
 o:c=>{const pay=loss(10,18);return [
  {l:`Nộp đủ cho xong chuyện (${fm(pay)})`,c:()=>G.money()>=pay,f:c=>`Người của Kiên lấy tiền đếm kỹ, ký biên lai chẳng đóng dấu. Mức khống sẽ còn tăng.`+kp(4)+fx(c,{money:-pay,tam:-4})+vd(6,12,'Nhà mình nộp thuế khống cho Phạm Trung Kiên.')},
  {l:'Đem sổ thuế thật đối chiếu, khiếu nại lên quan huyện',r:RR({tri:1,khau:0.8,eq:0.3},0.5),y:c=>`Sổ thuế đối chiếu từng khoản. Quan huyện bất đắc dĩ bác bỏ yêu cầu khống. Thuộc hạ rút, hậm hực.`+pf(1)+dt(3)+fx(c,{fame:3,tam:4})+vd(6,12,'Nhà mình bác bỏ thuế khống của Phạm Trung Kiên.'),
   n:c=>`Quan huyện chuyển đơn lên chính ${KN}, bị chặn lại. Thuế khống tăng gấp rưỡi vì "tội khiếu nại sai".`+kp(3)+fx(c,{money:-Math.round(pay*1.3),tam:-5})+vd(6,12,'Khiếu nại thuế khống của nhà mình bị chặn.')},
  {l:'Nhờ họ Vũ ở bộ Lại can thiệp',c:()=>V().house('vu').rel>=15,f:c=>`Một tờ thư từ bộ Lại đến tay quan huyện. Mấy ngày sau, truy thu thuế bị hủy lặng lẽ.`+hr('vu',-4)+pf(1)+dt(2)+fx(c,{tam:3})+vd(6,12,'Họ Vũ can thiệp, hủy thuế khống của Phạm Trung Kiên.')}]}}),
VE('P',{id:'vil_p_dot',t:'Kho bị cháy',vc:()=>S().farm.own>=2||hasBiz(),
 x:c=>`Giữa đêm, lửa bùng lên ở kho nhà ${N(c)}, lan nhanh đến gian bên. Cả nhà dập lửa đến sáng, cứu được một nửa. Người trực đêm bảo thấy một bóng người chạy khỏi hàng rào, mặc áo thâm, ngôi sao trên cổ tay.`,
 o:c=>{const loss0=loss(12,20),fix=m(R(4,8));return [
  {l:`Tự lo sửa chữa, nuốt giận (${fm(fix)})`,c:()=>G.money()>=fix,f:c=>`Sau vài tháng, kho dựng lại. Nhưng vết cháy trên cột nhà vẫn còn nguyên, nhắc mỗi ngày.`+kp(4)+fx(c,{money:-(fix+loss0),tam:-6})+vd(6,12,'Kho nhà mình bị đốt, nhà mình nhịn.')},
  {l:'Thuê người điều tra kẻ phóng hỏa',c:()=>G.money()>=m(5),r:RR({muu:1,tri:0.8,eq:0.3},0.5),y:c=>`Sau nửa tháng, người điều tra tìm ra kẻ phóng hỏa: một tên du côn có hình xăm ngôi sao, nhận tiền của thuộc hạ Kiên. Hắn chịu khai.`+wt(1)+pf(1)+fx(c,{money:-(m(5)+loss0),tam:-2,fame:1})+vd(6,12,'Nhà mình tìm ra kẻ đốt kho do Phạm Trung Kiên sai.'),
   n:c=>`Kẻ phóng hỏa biến mất không dấu vết.`+kp(2)+fx(c,{money:-(m(5)+loss0),tam:-5})+vd(6,12)},
  {l:'Nhờ thủy binh họ Kiều bảo vệ kho lần tới',c:()=>V().house('kieu').rel>=20,f:c=>`Một toán thủy binh canh nhà suốt một tháng. Kẻ phóng hỏa không dám quay lại.`+hr('kieu',-3)+dt(2)+fx(c,{money:-loss0,tam:2})+vd(6,12,'Họ Kiều cho người canh kho nhà mình.')}]}}),
VE('P',{id:'vil_p_bat',t:'Bắt giam một người',vwho:p=>age(p)>=18&&!p.away&&p.dead==null&&p.id!==(G.head()&&G.head().id)||false,vc:()=>has(p=>age(p)>=18&&!p.away),
 x:c=>`Lính huyện xông vào nhà bắt ${N(c)} với lý do "tụ tập gây rối". Lệnh bắt do tri huyện ký, nhưng mọi người đều hiểu ai đứng sau. ${N(c)} bị giam ở nhà lao huyện, chờ xét xử.`,
 o:c=>{const bail=loss(10,18);return [
  {l:`Nộp tiền bảo lãnh (${fm(bail)})`,c:()=>G.money()>=bail,f:c=>`${N(c)} về nhà sau năm hôm, gầy hẳn đi, nói ít. Hắn nhìn thấy một tờ giấy ghi rõ lệnh phạt vô lý.`+kp(3)+fx(c,{money:-bail,suc:-4,tam:-6,trait:'vetan'})+vd(6,12,'Một người nhà mình bị Phạm Trung Kiên bắt giam rồi chuộc về.')},
  {l:'Dâng đơn kêu oan, nhờ người nhà quan giúp',c:()=>hasQuan()||V().house('vu').rel>=15,r:RR({khau:0.8,eq:0.7,tri:0.5},0.5),y:c=>`Lệnh bắt bị bác vì thiếu chứng, ${N(c)} được thả. Tờ lệnh bị bác được cất giữ như một bằng chứng.`+pf(1)+dt(3)+fx(c,{tam:3,fame:2})+vd(6,12,'Nhà mình kêu oan thành công cho người bị Phạm Trung Kiên bắt.'),
   n:c=>`Đơn không đến được bàn quan. ${N(c)} phải ngồi thêm hai tuần nữa.`+kp(3)+fx(c,{suc:-6,tam:-7,trait:'vetan'})+vd(6,12,'Người nhà mình bị giam thêm hai tuần.')},
  {l:'Thuê người cứu ra khỏi nhà lao',c:()=>G.money()>=m(10),r:RR({vo:0.8,muu:0.8,gan:0.6},0.35),y:c=>`Đêm hôm sau cửa lao bị mở bằng chìa khóa giả. ${N(c)} chạy thoát. Cả nhà ẩn nấp một tháng. Nhà mình không còn ai coi là hiền lành nữa.`+kp(2)+dt(2)+fx(c,{money:-m(10),fame:-2,tam:2})+vd(6,12,'Nhà mình cứu người nhà khỏi nhà lao.'),
   n:c=>`Vụ vượt ngục thất bại, hai người nhà bị đánh nặng và giam thêm một tháng.`+kp(4)+fx(c,{money:-m(10),suc:-9,fame:-3,tam:-9,trait:'vetan'})+vd(6,12,'Vụ cứu người ra khỏi nhà lao thất bại.')}]}}),
VE('P',{id:'vil_p_don',t:'Tin đồn bôi nhọ',
 x:c=>`Khắp chợ truyền nhau rằng nhà ${N(c)} giấu của, bất kính với quan, ngầm giúp giặc. Mỗi nơi nghe một kiểu, nhưng đầu đuôi đều giống nhau: ai cũng nhắc "nghe nói ông ${KN} biết rõ". Có người ngoài chợ nhìn thấy nhà mình thì quay đi.`,
 o:c=>[
  {l:'Mời các già làng đến nhà, nói chuyện thẳng',r:RR({khau:1,eq:0.8,thanh:0.4},0.5),y:c=>`Các già làng nghe xong, thấy nhà mình thật thà, nên ra chợ nói lại. Tin đồn nguội dần.`+dt(4)+fx(c,{fame:2,tam:3})+vd(6,12,'Nhà mình dập tin đồn bôi nhọ.'),
   n:c=>`Các già làng chỉ gật đầu cho phải phép, không ai ra tay. Tiếng xấu vẫn bám.`+fx(c,{fame:-4,tam:-4})+vd(6,12,'Tin đồn về nhà mình vẫn lan rộng.')},
  {l:'Tìm ra kẻ tung tin, bắt lên đình',r:RR({muu:1,tri:0.7,khau:0.4},0.5),y:c=>`Kẻ tung tin là một người bán rượu, nhận tiền của thuộc hạ Kiên. Hắn bị lôi ra đình, khai hết. Một nhân chứng nhỏ.`+wt(1)+pf(1)+dt(3)+fx(c,{fame:3,tam:4})+vd(6,12,'Nhà mình tìm ra kẻ tung tin do Phạm Trung Kiên thuê.'),
   n:c=>`Chạy theo tin đồn chỉ thêm tin đồn. Nhà mình mệt mà không ra gì.`+fx(c,{fame:-2,tam:-5})+vd(6,12)},
  {l:'Mặc kệ, bảo lời đồn rồi sẽ tan',f:c=>`Lời đồn không tan, nó biến thành sự thật trong mắt người ta. Tiếng nhà mình hao dần.`+kp(2)+dt(-3)+fx(c,{fame:-5,cfame:-1,tam:-3})+vd(6,12,'Nhà mình mặc kệ tin đồn bôi nhọ.')}]}),
VE('P',{id:'vil_p_cuop',t:'Cướp hàng giữa đường',vc:()=>hasBiz(),
 x:c=>`Một chuyến hàng nhà ${N(c)} bị chặn giữa đường. Bọn cướp mặc áo thường nhưng đi đứng có hàng lối, và biết trước lộ trình. Người áp tải bị trói bỏ ven đường, trở về kể lại.`,
 o:c=>{const lost=loss(10,20);return [
  {l:'Bù lỗ cho khách, nhận thiệt',f:c=>`Hàng mất sạch, nhà mình đền cho khách. Uy tín giữ được, tiền thì bay.`+kp(3)+fx(c,{money:-lost,tam:-4})+vd(6,12,'Nhà mình bị cướp hàng do Phạm Trung Kiên sai.')},
  {l:'Theo dấu bánh xe truy tìm hàng',r:RR({muu:1,vo:0.6,tri:0.5},0.45),y:c=>`Dấu bánh xe dẫn tới một trang viện nhỏ sau núi, thuộc người thân tín của Kiên. Hàng mất một phần, một phần lấy lại được, và biết thêm một địa điểm.`+pf(1)+wt(1)+fx(c,{money:-Math.round(lost/2),tam:2,vo:1})+vd(6,12,'Nhà mình lần ra trang viện nhận hàng cướp của Phạm Trung Kiên.'),
   n:c=>`Dấu mất ở bờ sông. Hàng mất hoàn toàn.`+kp(3)+fx(c,{money:-lost,tam:-5})+vd(6,12)},
  {l:'Nhờ thủy binh họ Kiều hộ tống từ đây về sau',c:()=>V().house('kieu').rel>=20,f:c=>`Từ đó các chuyến hàng đi đường sông dưới cờ thủy sư. Bọn cướp biết thân biết phận, không dám chặn nữa.`+hr('kieu',-3)+dt(2)+fx(c,{money:-Math.round(lost/3),tam:2})+vd(6,12,'Họ Kiều hộ tống hàng cho nhà mình.')}]}}),
VE('P',{id:'vil_p_phu',t:'Bắt đi phu dịch',vwho:p=>p.g==='nam'&&age(p)>=17&&age(p)<=45&&!p.away&&p.dead==null,vc:()=>has(p=>p.g==='nam'&&age(p)>=17&&age(p)<=45&&!p.away),
 x:c=>`Lệnh gọi phu dịch ra: đắp đê, mở đường cho phủ của ${KN}. Nhà nào có trai tráng đều phải góp người, nhà nghèo thì thay bằng tiền. Tên ${N(c)} đứng đầu danh sách, dù trong nhà còn hai người trẻ khác chưa bị gọi.`,
 o:c=>{const pay=loss(6,10);return [
  {l:`Nộp tiền miễn dịch (${fm(pay)})`,c:()=>G.money()>=pay,f:c=>`Tiền nộp, tên ${N(c)} bị gạch. Nhưng tháng sau lại có danh sách mới.`+kp(3)+fx(c,{money:-pay,tam:-3})+vd(6,12,'Nhà mình nộp tiền miễn phu dịch cho Phạm Trung Kiên.')},
  {l:`Đi phu, giữ sức và ghi nhớ`,r:RR({suc:1,cc:0.6,muu:0.4},0.55),y:c=>`Ba tháng đào đất, vác đá. Thấy rõ người của Kiên bớt xén lương, thấy cả những người chết đói ở công trường. ${N(c)} về nhà gầy rộc nhưng đầu thì nhiều điều đáng nhớ.`+wt(1)+pf(1)+fx(c,{suc:-4,tam:-3,eq:1})+vd(6,12,'Nhà mình ghi nhận bớt xén lương ở công trường của Phạm Trung Kiên.'),
   n:c=>`Một tai nạn nhỏ ở công trường khiến ${N(c)} bị thương nặng, phải nằm nhà mấy tháng.`+kp(2)+fx(c,{suc:-12,tam:-6})+vd(6,12,'Người nhà mình bị thương ở công trường của Phạm Trung Kiên.')},
  {l:'Kêu oan với quan, viện cớ nhà đã đủ dịch',r:RR({khau:1,eq:0.6,tri:0.5},0.5),y:c=>`Quan lại cũng thấy lập luận có lý. ${N(c)} được miễn, kèm một dòng chữ "xin cân nhắc" trong công văn.`+dt(2)+fx(c,{fame:1,tam:2})+vd(6,12,'Nhà mình kêu oan thành công về phu dịch.'),
   n:c=>`Quan lại không nghe, ${N(c)} bị lôi đi ngay hôm sau, kèm bị phạt thêm.`+kp(2)+fx(c,{money:-Math.round(pay*0.7),suc:-6,tam:-5})+vd(6,12)}]}}),
VE('P',{id:'vil_p_chiem',t:'Chiếm ruộng bằng văn tự',vc:()=>S().farm.own>=4,
 x:c=>`Văn tự "ruộng công bị lấn chiếm" được dán ở đình. Trong đó có hai thửa tốt nhất nhà ${N(c)}. Chữ ký của quan huyện, dấu của ${KN}. Họ cho ba mươi ngày để trình giấy chứng nhận.`,
 o:c=>{const pay=loss(10,16);return [
  {l:`Mua lại với "giá công" (${fm(pay)})`,c:()=>G.money()>=pay,f:c=>`Giấy tờ được ký lại, nhưng nhà mình mất một phần ruộng.`+kp(4)+fx(c,{money:-pay,tam:-4})+(S().farm.own>=6?(S().farm.own-=1,''):'')+vd(6,12,'Nhà mình mất một thửa ruộng vào tay Phạm Trung Kiên.')},
  {l:'Trình giấy gốc, khiếu nại có đối chứng',r:RR({tri:1,khau:0.8,eq:0.3},0.5),y:c=>`Giấy gốc ghi rõ ranh giới. Quan huyện đành thu hồi văn tự. Dân quanh vùng nhìn thấy, nhiều người đến xin nhà mình giúp lập chứng cho ruộng của họ.`+pf(1)+dt(5)+fx(c,{fame:3,tam:4})+vd(6,12,'Nhà mình giữ được ruộng nhờ giấy gốc.'),
   n:c=>`Giấy gốc bị tuyên bố giả. Nhà mình mất hai thửa, thêm tiền phạt.`+kp(4)+fx(c,{money:-Math.round(pay*0.6),fame:-2,tam:-6})+(S().farm.own>=6?(S().farm.own-=2,''):(S().farm.own>=3?(S().farm.own-=1,''):''))+vd(6,12,'Nhà mình mất ruộng sau khi khiếu nại thất bại.')},
  {l:'Nhờ họ Vũ chuyển hồ sơ lên bộ Hộ',c:()=>V().house('vu').rel>=20,f:c=>`Hồ sơ lên bộ Hộ. Mấy tháng sau, văn tự bị thu hồi mà không ai nói vì sao.`+hr('vu',-5)+pf(1)+fx(c,{tam:3})+vd(6,12,'Họ Vũ giúp nhà mình giữ ruộng khỏi tay Phạm Trung Kiên.')}]}}),
VE('P',{id:'vil_p_doc',t:'Bữa cơm lạ vị',vc:()=>vv().K.rank>=1,
 x:c=>`Sau bữa tối, ${N(c)} thấy váng đầu, chân tay lạnh toát, nôn ra một thứ nước xanh. Cả nhà hoảng, người nhà gọi thầy lang. Thầy xem mạch, bảo có bột độc rất nhẹ trộn vào canh, đủ làm yếu người chứ không đủ giết.`,
 o:c=>{const cost=m(R(4,8));return [
  {l:`Mời thầy thuốc giỏi chữa tận gốc (${fm(cost)})`,c:()=>G.money()>=cost,r:RR({suc:0.5,tri:0.4},0.65),y:c=>`Sau vài tuần uống thuốc, ${N(c)} lại khỏe. Thầy thuốc còn giữ một ít bã canh làm vật chứng.`+pf(1)+fx(c,{money:-cost,suc:-2,tam:-3}),
   n:c=>`Thuốc đắng mà không dứt, người yếu hẳn nhiều tháng.`+kp(2)+fx(c,{money:-cost,suc:-10,tam:-5,hpMax:-1})},
  {l:'Nhờ họ Dương xem độc, kê thuốc giải',c:()=>V().house('duong').rel>=15,f:c=>`Dược Cốc gửi một toa thuốc và một người nhận bã canh làm mẫu. Họ kết luận: loại độc này chỉ bán ở một tiệm thuốc, và tiệm ấy chỉ có một khách quen.`+hr('duong',6)+pf(2)+fx(c,{suc:-2,tam:-2})+vd(6,12,'Họ Dương xác định loại độc trong canh nhà mình.')},
  {l:'Đổi hết người nấu bếp, siết cửa nhà',f:c=>`Mấy người làm lâu năm bị đuổi, có người oan. Bầu không khí trong nhà nặng nề hơn bao giờ.`+fx(c,{suc:-4,tam:-6})+vd(6,12,'Nhà mình sa thải người nấu bếp sau vụ hạ độc.')}].map(o=>{const y0=o.y,n0=o.n;if(y0)o.y=c=>y0(c)+vd(6,12,'Nhà mình vượt qua vụ hạ độc.');if(n0)o.n=c=>n0(c)+vd(6,12,'Nhà mình bị yếu đi sau vụ hạ độc.');return o})}}),
VE('P',{id:'vil_p_hon',t:'Cuộc hỏi cưới ép',vwho:p=>p.g==='nữ'&&age(p)>=16&&age(p)<=32&&!p.away&&!G.married(p)&&p.dead==null,vc:()=>has(p=>p.g==='nữ'&&age(p)>=16&&age(p)<=32&&!p.away&&!G.married(p)),
 x:c=>`Mụ mối đến nhà, mang theo ba tráp lễ: ${KN} muốn cưới ${N(c)} cho cháu ruột của ông. Mụ cười ngọt: "Gả thì danh giá, mà không gả thì..." Nụ cười dừng ở chữ "thì" rồi tắt.`,
 o:c=>[
  {l:'Từ chối thẳng, trả lại lễ vật',r:RR({eq:1,khau:0.8,gan:0.4},0.5),y:c=>`Mụ mối ra về xám mặt. Nhà mình vững vàng, dân làng thấy rõ thái độ.`+dt(3)+fx(c,{fame:3,tam:4})+vd(6,12,'Nhà mình từ chối lễ hỏi của Phạm Trung Kiên.'),
   n:c=>`Lời từ chối quá gắt. Mấy hôm sau, tiếng đồn ngoài chợ nói rằng ${N(c)} đã có điều tiếng.`+kp(3)+fx(c,{fame:-3,tam:-6})+vd(6,12,'Phạm Trung Kiên trả đũa lời từ chối của nhà mình.')},
  {l:'Hứa hẹn kéo dài, xin hẹn sang năm',r:RR({muu:1,eq:0.6,khau:0.4},0.55),y:c=>`Mụ mối nhận lời hẹn. Một năm, đủ thời gian cho nhiều việc.`+fx(c,{tam:-1})+vd(10,18,'Nhà mình khéo hẹn hôn sự với Phạm Trung Kiên.'),
   n:c=>`Hắn không tin, cho người canh nhà suốt tuần.`+kp(2)+fx(c,{tam:-4})+vd(6,12)},
  {l:'Chấp nhận gả, mong có chỗ dựa',f:c=>{const p=G.mkMatch(c,{surname:'Phạm',stand:5.6,g:'nam',job:'tieuphu',story:0});p.fee=m(R(8,14));p.needT=2;G.marryOut(c,p);return `${N(c)} xuất giá về nhà họ Phạm. Hôn lễ rình rang, nhà mình được nể thêm ít nhiều, nhưng ai cũng thấy đó là cái giá của sự yên ổn.`+fl('pham')+st('hide')+kp(6)+dt(-6)+fx(c,{money:m(6),fame:-3,tam:-8})+vd(8,14,'Một người nhà mình gả vào họ Phạm của Phạm Trung Kiên.')}}]}),
VE('P',{id:'vil_p_trong',t:'Kẻ trong nhà',vc:()=>!!vv().fl.spy&&!vv().fl.spyOut,
 x:c=>`${N(c)} để ý thấy: những gì bàn trong nhà, mấy hôm sau thuộc hạ của ${KN} đều biết. Từ lúc ${DN} ở đây, có điều gì đó không ổn: sổ sách bị xê dịch, thư từ có dấu mở lại, kẻ lạ đến đúng hôm khách quý ghé.`,
 o:c=>[
  {l:'Đuổi thẳng, không nể nang',f:c=>`${DN} cúi đầu, cười nhẹ: "Nhà này không còn chỗ cho kẻ có tài." Rồi bước đi, không ngoảnh lại. Nhà mình giữ được kín, nhưng mối ân oán không còn đường lui.`+fl('spyOut')+(vv().D.link=0,'')+st('fight')+fx(c,{tam:2})+vd(6,12,'Nhà mình đuổi Nguyễn Thành Duy ra khỏi nhà.')},
  {l:'Giữ lại, âm thầm tung tin giả để thử',r:RR({muu:1,tri:0.8,thanh:-0.3},0.5),y:c=>`Tin giả vừa tung đã thấy người của Kiên mắc bẫy, chạy sai hướng. Từ đó nhà mình biết chắc ai là kẻ đưa tin, và có thể dùng.`+pf(2)+fl('spyUsed')+fx(c,{tri:1,tam:3})+vd(6,12,'Nhà mình giăng bẫy thử thầy đồ Duy, thành công.'),
   n:c=>`Duy ngửi ra bẫy, âm thầm chuyển sang người khác nhà mình để dò. Từ đó khó biết ai tin được.`+kp(3)+fx(c,{tam:-5})+vd(6,12,'Duy thoát bẫy của nhà mình.')},
  {l:'Giả vờ không biết, nhưng giấu tin quan trọng',f:c=>`Cả nhà ăn nói thận trọng. Mệt, nhưng an toàn.`+fx(c,{tam:-2})+vd(6,12,'Nhà mình giấu tin quan trọng khỏi Duy.')}]}),
VE('P',{id:'vil_p_hoa',t:'Lời giảng hòa của mưu sĩ',vc:()=>vv().D.ok&&vv().ch>=2&&!vv().fl.hoa,vw:0.6,
 x:c=>`${DN} đến cổng nhà ${N(c)} với một tráp lễ nhỏ và nụ cười ôn hòa: "Ông chủ của tôi không muốn thù oán. Nếu nhà mình nể mặt, mỗi năm nộp một chút đóng góp, bên kia bảo đảm không ai quấy rầy."`,
 o:c=>{const pay=loss(10,20);return [
  {l:`Chấp nhận, nộp mỗi năm (${fm(pay)} lần đầu)`,c:()=>G.money()>=pay,f:c=>`Hòa ước nhỏ lập xong. Một năm yên ổn sau đó, nhưng người trong vùng nhìn nhà mình như kẻ đã quỳ xuống.`+fl('hoa')+st('hide')+kp(6)+dt(-6)+fx(c,{money:-pay,fame:-4,tam:-4})+vd(10,18,'Nhà mình chấp nhận hòa ước với Phạm Trung Kiên.')},
  {l:'Từ chối thẳng, nói thẳng điều mình biết',r:RR({khau:1,eq:0.7,gan:0.5},0.5),y:c=>`${DN} mất nụ cười, nhìn ${N(c)} thật lâu: "Nhà mình biết nhiều hơn tôi tưởng." Rồi anh ta đi.`+fl('hoa')+pf(1)+dt(2)+fx(c,{fame:3,tam:4})+vd(6,12,'Nhà mình từ chối hòa ước với Phạm Trung Kiên.'),
   n:c=>`Lời quá gấp, ${DN} lạnh lùng ra về. Từ đó áp lực nặng hơn.`+fl('hoa')+kp(3)+fx(c,{tam:-3})+vd(6,12)},
  {l:'Giả vờ nhận, mua thời gian',r:RR({muu:1,khau:0.6,thanh:-0.3},0.5),y:c=>`${DN} tin, trao thêm một số thông tin vô tình. Nhà mình chắt lọc được hai ba điều đáng giá.`+fl('hoa')+pf(1)+wt(0)+fx(c,{money:-Math.round(pay/2),tam:1})+vd(10,18,'Nhà mình giả vờ nhận hòa ước để thu thập tin tức.'),
   n:c=>`${DN} ngửi ra ý. "Đừng đùa với tôi." Từ đó, áp lực tăng.`+fl('hoa')+kp(4)+fx(c,{money:-Math.round(pay/2),tam:-4})+vd(6,12)}]}}),
VE('P',{id:'vil_p_triu',t:'Quan trên gọi lên đối chất',vc:()=>vv().K.rank>=2,
 x:c=>`Giấy gọi từ phủ đường đến tay ${N(c)}: hôm nay Tri phủ Kiên cho mời lên "nói chuyện đôi điều". Phủ đường nay có hắn ngồi ghế, nhà mình thành người bị gọi.`,
 o:c=>[
  {l:'Đi, ăn nói khôn khéo',r:RR({khau:1,eq:0.8,muu:0.4},0.5),y:c=>`Trong phòng khách, ${KN} cười niềm nở mà ánh mắt tìm kiếm điểm yếu. ${N(c)} đáp từng câu thận trọng, và đi ra không để lộ điều gì.`+fx(c,{fame:1,tam:2,eq:1})+vd(6,12,'Nhà mình đối đáp khôn khéo trước tri phủ Phạm Trung Kiên.'),
   n:c=>`Lỡ lời vài chỗ, bị ghi vào sổ. Từ đó nhà mình có thêm một khoản "lỗi" để Kiên dùng lúc cần.`+kp(3)+fx(c,{fame:-1,tam:-5})+vd(6,12)},
  {l:'Từ chối đi, viện cớ bệnh',f:c=>`Lời cáo bệnh bị coi là bất kính. Tháng sau, thuế nhà mình bị nâng.`+kp(2)+fx(c,{money:-m(3),tam:-2})+vd(6,12,'Nhà mình lờ lệnh gọi của tri phủ Kiên.')},
  {l:'Đi, kèm một người làm chứng độc lập',c:()=>G.money()>=m(2),f:c=>`Có chứng nhân, không ai dám ép. Cuộc nói chuyện ngắn, lịch sự và vô ích.`+pf(0)+fx(c,{money:-m(2),tam:1})+vd(6,12,'Nhà mình đi gặp tri phủ Kiên với người làm chứng.')}]}),
VE('P',{id:'vil_p_con',t:'Con em đánh nhau',vwho:p=>age(p)>=9&&age(p)<=18&&!p.away&&p.dead==null,vc:()=>has(p=>age(p)>=9&&age(p)<=18&&!p.away),
 x:c=>`${N(c)} về nhà tái mặt, áo rách, trán sưng. Con trai ${KN} cùng đám bạn đã chặn đường đánh vì "dám nhìn", rồi bắt bò vào gầm cầu. Đám trẻ khác đứng cười, không ai can.`,
 o:c=>[
  {l:'Dỗ dành, khuyên nhịn, tránh con hắn',f:c=>`${N(c)} gật đầu, nước mắt lăn. Từ hôm đó đi học đường vòng, ngại đến trường.`+kp(2)+fx(c,{tam:-8,vo:0,eq:1})+vd(6,12,'Con em nhà mình bị con Phạm Trung Kiên bắt nạt.')},
  {l:'Dạy con cách tự bảo vệ',r:RR({vo:0.8,eq:0.5,gan:0.5},0.55),y:c=>`${N(c)} chăm chỉ luyện từng bài quyền sau nhà. Sáu tháng sau, một cú đấm đẹp làm thằng nhóc kia bỏ chạy. Cả đám nhìn ${N(c)} khác hẳn.`+fx(c,{vo:3,suc:2,tam:6,fame:1})+vd(6,12,'Con em nhà mình tự bảo vệ trước con Phạm Trung Kiên.'),
   n:c=>`Dạy vội, ${N(c)} tập không ra hồn, bị đánh thêm trận nữa.`+fx(c,{suc:-4,tam:-6})+vd(6,12)},
  {l:'Sang nhà hắn lên tiếng, nói thẳng với ông ta',r:RR({khau:1,eq:0.7,gan:0.5},0.45),y:c=>`${KN} nghe xong, cười xòa: "Con nít chơi đùa." Nhưng hôm sau thằng nhóc kia đến xin lỗi, mắt không dám nhìn thẳng. Kẻ biết kiêng nể cũng đáng để ghi nhớ.`+dt(2)+fx(c,{fame:2,tam:3})+vd(6,12,'Nhà mình nói thẳng với Phạm Trung Kiên về chuyện con em.'),
   n:c=>`${KN} đuổi khéo. Tối hôm đó cửa sổ nhà mình bị ném đá.`+kp(3)+fx(c,{tam:-5})+vd(6,12)}]}),
VE('P',{id:'vil_p_thu',t:'Thư dọa nạt',vw:0.7,
 x:c=>`Sáng ra, trên bậc cửa nhà ${N(c)} có một tờ giấy gập tư, không ký tên: "Biết đủ thì còn nhà. Đừng chõ mũi vào việc không phải của mình." Mực còn ướt, nét chữ đẹp. Giống chữ một người rất quen, nhưng chưa nhớ ra là ai.`,
 o:c=>[
  {l:'Đem tờ giấy đối chiếu nét chữ với các văn thư trong vùng',r:RR({tri:1,muu:0.7},0.5),y:c=>`Sau nửa tháng, nét chữ khớp với một văn thư ở huyện đường, người đã ký nhiều biên bản dưới trướng ${KN}. Một mắt xích nhỏ.`+pf(1)+wt(0)+fx(c,{tam:2})+vd(6,12,'Nhà mình lần theo tờ thư dọa tới một văn thư của huyện.'),
   n:c=>`Không ai nhận ra nét chữ. Nhà mình mệt mà vô ích.`+fx(c,{tam:-2})+vd(6,12)},
  {l:'Cất kỹ làm bằng chứng, tăng gác đêm',f:c=>`Tờ giấy vào rương, cùng những thứ khác. Cả nhà ngủ không yên giấc mấy đêm.`+pf(1)+fx(c,{money:-m(1),tam:-2})+vd(6,12,'Nhà mình giữ tờ thư dọa nạt làm bằng chứng.')},
  {l:'Vứt bỏ, coi như chưa thấy',f:c=>`Tờ giấy bị đốt. Nhưng cả buổi chiều ${N(c)} cứ nhìn về phía cổng.`+fx(c,{tam:-3})+vd(6,12)}]})
];
});
