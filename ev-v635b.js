/* Bách Niên Thế Gia v6.3.5 · Ân oán Phạm Trung Kiên: các nhánh theo hướng nhà mình chọn
   Trước đây chỉ có thái độ (đánh, nhìn, nhịn) và các bộ đếm chung; mọi gia tộc đi cùng một đường. Nay sau phần mở đầu có một ngã rẽ:
   công đường, võ lực, tiền bạc, dân tâm, hoặc nhẫn nhịn chờ thời. Mỗi hướng có chuỗi chuyện riêng, những thứ chuỗi ấy cho (cờ bPhap, bVo, bTai, bTam)
   thay cho một điều kiện của con đường kết thúc tương ứng, còn đi hướng này thì các đường kia khó hơn một bậc. */
window.EVF.push(G=>{
const {R,chance,fx,esc,age,alive}=G;
const S=()=>G.S();
const m=v=>G.mm(v);
const fm=v=>G.fmtMoney(v);
const V=()=>G._v633;
const vv=()=>S().vil;
const hr=(id,d)=>{V().houseRel(id,d);return ''};
const vd=(a,b,n)=>V().vd(a,b,n);
const pf=n=>V().vAdd('pf',n);
const wt=n=>V().vAdd('wit',n);
const dt=n=>V().vAdd('dt',n);
const kp=n=>V().kPow(n);
const fi=k=>V().vFi(k);
const rk=()=>vv().K.rank;
const NOM={tri:50,vo:46,suc:65,mi:46,eq:46,muu:20,khau:25,ql:16,fame:15,m:35,duyen:50};
const TS=(spec,p)=>{let v=0,w=0;for(const k in spec){v+=(NOM[k]!=null?NOM[k]:50)*spec[k];w+=spec[k]}return Math.round(0.93*(w?v/w:50)-9*Math.log(p/(1-p)))};
const RR=(spec,p)=>[spec,TS(spec,p)+rk()*2];
const N=c=>esc(c.given);
const KN='Phạm Trung Kiên';
const has=f=>alive().some(p=>G.inClan(p)&&p.dead==null&&!p.away&&(()=>{try{return f(p)}catch(e){return false}})());
const fighter=p=>age(p)>=17&&age(p)<=58&&p.vo>=60;
const hasFarm=()=>S().farm.own>=2;
const hasBiz=()=>S().biz.length>0||S().trips.length>0;
const loss=(lo,hi)=>m(R(lo,hi));
const VE=(vs,o)=>Object.assign({fixed:1,k:'Ân oán',vs,vw:1},o);
/* chỉ chạy khi nhà mình đã chọn đúng hướng này */
const BE=(br,o)=>{const c0=o.vc;return VE(V().VBR[br].k,Object.assign({},o,{vc:()=>vv().br===br&&(!c0||c0())}))};
const flg=k=>(vv().fl[k]||0);

return [
/* ======================= NGÃ RẼ ======================= */
VE('X',{id:'vil_b_nga',t:'Ngã rẽ',
 x:(c,d)=>d&&d.again
  ?`Ba năm đã qua kể từ lúc nhà mình chọn nhẫn nhịn. ${KN} giờ làm ${V().KRANK[rk()]}, thế lực chẳng giảm mà tăng. ${N(c)} ngồi trong đêm, tự hỏi nhẫn đến bao giờ mới là đủ. Lần này nhà mình có thể đổi hướng, nếu muốn.`
  :`Những chuyện vừa qua đủ để nhà mình hiểu ${KN} không phải kẻ qua đường. Cả nhà ngồi lại bàn xem nên đối phó bằng cách nào, vì cách nào cũng có giá của nó. Đã chọn hướng nào thì những chuyện sau đều xoay quanh hướng ấy, và các đường còn lại sẽ khó đi hơn.`,
 o:(c,d)=>{const pay=m(8);const again=d&&d.again;return [
  {l:'Đường công đường: gom giấy tờ, kiện đúng thủ tục',s:'Chứng cứ, thầy cãi, quan huyện. Hợp nhà có người có chữ',f:c=>`${N(c)} lấy một ngăn tủ riêng chứa hồ sơ. Từ nay mọi chuyện đều phải có giấy.`+V().vBranch('phap')+pf(1)+fx(c,{tam:2})+vd(4,8,'Nhà mình quyết đi đường công đường.')},
  {l:'Đường võ lực: chiêu mộ trai tráng, dựng thế đối đầu',s:`Đội canh, đụng độ, võ sư. Cần người đánh được hoặc ${fm(pay)}`,c:()=>has(fighter)||G.money()>=pay,f:c=>`Cả xóm biết nhà ${N(c)} đã quyết. Trai tráng bắt đầu ghé qua, hỏi có việc gì cho họ làm không.`+V().vBranch('vo')+fx(c,{money:has(fighter)?0:-pay,tam:2})+vd(4,8,'Nhà mình quyết đi đường võ lực.')},
  {l:'Đường tiền bạc: cắt nguồn hàng, chặn đường làm ăn của hắn',s:'Nguồn hàng, thương hội, cuộc chiến giá. Cần có ruộng hoặc cơ sở làm ăn',c:()=>hasBiz()||hasFarm(),f:c=>`${N(c)} bắt đầu hỏi thăm các chuyến hàng của hắn, biết chỗ nào có thể chặn, chỗ nào có thể bẻ.`+V().vBranch('tai')+fx(c,{tam:2})+vd(4,8,'Nhà mình quyết đi đường tiền bạc.')},
  {l:'Đường dân tâm: đứng về phía người bị hắn ức hiếp',s:'Phát chẩn, nghe kể oan, chống tin đồn. Chậm nhưng bền',f:c=>`Nhà mình bắt đầu mở cửa cho người trong xóm ra vào, nghe chuyện, giúp việc.`+V().vBranch('tam')+dt(3)+fx(c,{tam:2})+vd(4,8,'Nhà mình quyết đi đường dân tâm.')},
  {l:again?'Vẫn nhẫn nhịn thêm':'Nhẫn nhịn chờ thời, chưa chọn',s:'Ít rủi ro lúc này, nhưng hắn cứ thế lớn dần',f:c=>`Nhà mình quyết chưa động. Có người gật đầu, có người thở dài.`+V().vBranch('nhan')+fx(c,{tam:-2})+vd(6,12,'Nhà mình quyết nhẫn nhịn chờ thời.')}]}}),

/* ======================= ĐƯỜNG CÔNG ĐƯỜNG ======================= */
BE('phap',{id:'vil_bp_don',t:'Đơn kiện đầu tiên',
 x:c=>`${N(c)} thảo xong lá đơn kiện đầu tiên về chuyện ${KN} chiếm đất, thu phí trái phép, sẵn sàng nộp lên huyện. Ai cũng biết một lá đơn như vậy rất dễ chìm.`,
 o:c=>{const pay=loss(2,4);return [
  {l:'Nộp đơn kèm các chứng cứ đã gom',r:RR({tri:1,khau:0.6,eq:0.5},0.5),y:c=>`Huyện nhận đơn, ghi vào sổ. Chưa xử, nhưng tên hắn đã nằm trong hồ sơ công đường.`+pf(1)+fi('bPhap')+fx(c,{tam:3,fame:1})+vd(6,12,'Đơn kiện đầu tiên được huyện nhận.'),
   n:c=>`Đơn bị trả lại vì thiếu dấu, người thư lại cười nhạt: "Về làm lại cho đúng thể thức."`+kp(2)+fx(c,{tam:-3})+vd(6,12)},
  {l:`Nhờ ông đồ trong làng sửa đơn cho đúng thể thức (${fm(pay)})`,c:()=>G.money()>=pay,f:c=>`Ông đồ gạch sửa hai trang giấy, chỉ ra ba chỗ sơ hở. Lần nộp này đơn được thụ lý.`+pf(1)+fi('bPhap')+fx(c,{money:-pay,tam:2})+vd(6,12,'Đơn kiện được thụ lý sau khi sửa lại.')},
  {l:'Rút lại, chờ đủ chứng cứ hơn',f:c=>`Lá đơn nằm lại trong ngăn bàn thêm vài tháng.`+fx(c,{tam:-1})+vd(6,12)}]}}),
BE('phap',{id:'vil_bp_thaykien',t:'Thầy cãi thuê',
 x:c=>`Một thầy cãi từng bị ${KN} hại cho tan cửa nát nhà tìm đến ${N(c)}. Ông thuộc luật lệ, tính phí cao nhưng chưa bỏ dở vụ nào.`,
 o:c=>{const pay=loss(12,20);return [
  {l:`Thuê ông theo suốt vụ kiện (${fm(pay)})`,c:()=>G.money()>=pay,f:c=>`Ông viết lại toàn bộ hồ sơ, chỉ cách lấy lời khai cho hợp lệ. Giá không rẻ nhưng hồ sơ đã ra dáng hồ sơ.`+pf(2)+fi('bPhap')+fx(c,{money:-pay,tam:3})+vd(6,12,'Nhà mình thuê thầy cãi lo vụ kiện.')},
  {l:'Chỉ xin ông chỉ cách, tự mình làm',r:RR({tri:1,khau:0.6},0.55),y:c=>`Ông chỉ ba điều cốt yếu, ${N(c)} nhớ kỹ và làm theo từng bước. Không tốn tiền, chỉ tốn công.`+pf(1)+fi('bPhap')+fx(c,{tri:1,tam:2})+vd(6,12),
   n:c=>`Học vội học vàng, làm sai thứ tự. Ông thầy lắc đầu nhưng không trách.`+fx(c,{tam:-2})+vd(6,12)},
  {l:'Từ chối, sợ ông bị Kiên để mắt kéo cả nhà vào',f:c=>`Ông nhìn lâu rồi cáo từ, không oán trách. Vài tháng sau nghe tin ông dọn đi nơi khác.`+fx(c,{tam:-2})+vd(6,12)}]}}),
BE('phap',{id:'vil_bp_quanhuyen',t:'Quan huyện nghiêng về ai',vc:()=>vv().pf>=2,
 x:c=>`Quan huyện cho gọi ${N(c)} lên công đường, nói nhỏ: "Hồ sơ đã tới tay ta. Ta muốn làm cho đúng, nhưng trên còn người dặn ta đừng đụng vào."`,
 o:c=>[
  {l:'Trình thêm chứng cứ để quan có lý do xử',r:RR({tri:0.8,khau:0.8,eq:0.5},0.5),y:c=>`Quan huyện gật đầu, cho đóng dấu hồ sơ vào sổ lưu. Từ nay hắn muốn bưng bít cũng khó.`+pf(1)+fi('bPhap')+fx(c,{fame:2,tam:3})+vd(6,12,'Quan huyện lưu hồ sơ kiện Phạm Trung Kiên vào sổ chính.'),
   n:c=>`Quan nghe xong, thở dài: "Thời cơ chưa tới."`+kp(2)+fx(c,{tam:-2})+vd(6,12)},
  {l:'Nhờ họ Vũ ở bộ Lại gửi thư cho quan huyện',c:()=>V().hnear('vu')&&V().house('vu').rel>=15,f:c=>`Ba ngày sau, quan huyện đổi hẳn giọng: hồ sơ được xếp lên đầu bàn.`+hr('vu',-3)+pf(1)+fi('bPhap')+fi('bPhap')+fx(c,{fame:1,tam:3})+vd(6,12,'Họ Vũ gửi thư thúc quan huyện xét hồ sơ.')},
  {l:'Không dám ép quan, rút ra chờ',f:c=>`${N(c)} cúi chào, lui ra. Quan huyện không giữ.`+fx(c,{tam:-1})+vd(6,12)}]}),

/* ======================= ĐƯỜNG VÕ LỰC ======================= */
BE('vo',{id:'vil_bv_tuan',t:'Lập đội canh',
 x:c=>`Nhà ${N(c)} cùng mấy nhà láng giềng bàn chuyện lập đội canh đêm. Có người chống lưng bằng tiền và võ thì đội mới ra dáng.`,
 o:c=>{const pay=loss(8,14);return [
  {l:`Bỏ tiền sắm gậy giáo, trả công trai tráng (${fm(pay)})`,c:()=>G.money()>=pay,f:c=>`Đội canh có hai ca luân phiên, tiếng mõ đều đặn. Đám bảo hộ của hắn bắt đầu tránh xóm này.`+fi('bVo')+dt(3)+fx(c,{money:-pay,fame:2,tam:3})+vd(6,12,'Nhà mình lập đội canh cho xóm.')},
  {l:'Nhà mình đứng đầu đội, không tốn tiền',r:RR({vo:0.8,eq:0.8,khau:0.4},0.5),y:c=>`Cả xóm nể tay nghề và lòng dám, đội đứng được mà không ai đòi công.`+fi('bVo')+dt(2)+fx(c,{vo:1,fame:2,tam:3})+vd(6,12,'Nhà mình đứng đầu đội canh của xóm.'),
   n:c=>`Mới vài tuần, đội tan vì không ai chịu thức đêm không công.`+fx(c,{tam:-3})+vd(6,12)},
  {l:'Thôi, sợ động chạm',f:c=>`Mấy nhà láng giềng tự lập đội, không có nhà mình.`+fx(c,{tam:-3})+vd(6,12)}]}}),
BE('vo',{id:'vil_bv_dungdo',t:'Đụng độ ngoài chợ',vc:()=>flg('bVo')>=1&&has(fighter),vwho:fighter,vmin:17,
 x:c=>`Một toán côn đồ của ${KN} chặn ${N(c)} ngoài chợ, bảo nhắn nhà đừng chõ mũi vào chuyện người khác. Chúng đông hơn, nhưng chưa rút dao.`,
 o:c=>{const fee=m(2);return [
  {l:'Đứng thẳng, nói thẳng mặt, ra tay nếu chúng ra tay',r:RR({vo:1,suc:0.5,khau:0.4},0.5),y:c=>`Một trận ngắn mà rát. Hai tên ôm mặt bỏ chạy, tên còn lại bị trói đem nộp trạm. Cả chợ đứng xem.`+fi('bVo')+wt(1)+dt(3)+fx(c,{vo:2,fame:3,suc:-2,tam:3})+vd(6,12,'Người nhà mình đánh lui côn đồ của Phạm Trung Kiên giữa chợ.'),
   n:c=>`Chúng đông hơn. ${N(c)} bị đánh gục giữa chợ, mất ít tiền, người ê ẩm cả tuần.`+kp(3)+fx(c,{suc:-8,money:-m(2),fame:-2,tam:-5})+vd(6,12,'Người nhà mình bị côn đồ của Phạm Trung Kiên đánh giữa chợ.')},
  {l:'Nhờ lính tuần chợ đứng ra giải tán',c:()=>G.money()>=fee,f:c=>`Lính tuần đến, hai bên giải tán. Chúng ghi nhớ mặt nhà mình nhưng chưa dám làm càn.`+fx(c,{money:-fee,tam:1})+vd(6,12)},
  {l:'Nuốt giận, tránh sang đường khác',f:c=>`${N(c)} bước chậm lại rồi rẽ. Sau lưng có tiếng cười.`+kp(2)+fx(c,{tam:-4,fame:-1})+vd(6,12)}]}}),
BE('vo',{id:'vil_bv_thaysu',t:'Võ sư tha hương',vc:()=>flg('bVo')>=1,k:'Kỳ ngộ',ky:1,good:1,u:'person',
 x:c=>`Một võ sư ốm yếu, từng là quân nhân bị ${KN} cướp mất đất, xin ở nhờ. Ông không đòi gì, chỉ muốn có chỗ dạy trai tráng vài buổi trước khi hết sức.`,
 o:c=>[
  {l:'Mời ông ở lại, dạy cả xóm',f:c=>`Ba tháng, mấy chục trai tráng học được cách đứng, đánh, lui. Ông mất vào mùa xuân năm sau, để lại một cây côn gỗ lim.`+fi('bVo')+dt(3)+fx(c,{vo:R(2,4),fame:2,tam:4})+vd(6,12,'Một võ sư già dạy võ cho trai tráng trong xóm.')},
  {l:'Cho trú một đêm rồi tiễn ông đi',f:c=>`Ông chắp tay cảm tạ, đi nhẹ như đến.`+fx(c,{tam:-1})+vd(6,12)}]}),

/* ======================= ĐƯỜNG TIỀN BẠC ======================= */
BE('tai',{id:'vil_bt_nguon',t:'Cắt nguồn hàng',vc:()=>hasBiz()||hasFarm(),
 x:c=>`${N(c)} biết ${KN} nhập vải, gạo, muối từ vài nguồn cố định. Bẻ gãy được một nguồn thì hắn sẽ phải mua giá cao, và cả vùng sẽ thấy hắn không phải bất khả xâm phạm.`,
 o:c=>{const pay=loss(15,25);return [
  {l:`Đặt mua trước toàn bộ nguồn hàng ấy (${fm(pay)})`,c:()=>G.money()>=pay,r:RR({muu:0.8,khau:0.6,ql:0.5},0.5),y:c=>`Hắn đến mua thì hết hàng, phải mua lại qua tay người khác với giá vọt lên. Nhà mình ôm kho hàng bán lại có lời.`+fi('bTai')+kp(-3)+fx(c,{money:-Math.round(pay*0.4),fame:2,tam:4})+vd(6,12,'Nhà mình đặt mua trước nguồn hàng của Phạm Trung Kiên.'),
   n:c=>`Mua xong mới biết hàng kém, ế mất mấy tháng. Thiệt một khoản không nhỏ.`+fx(c,{money:-pay,tam:-4})+vd(6,12)},
  {l:'Chỉ báo cho các nhà buôn khác để họ tự lo',f:c=>`Tin lan nhanh. Vài nhà buôn bắt đầu tránh hàng của hắn.`+fi('bTai')+fx(c,{fame:1,tam:2})+vd(6,12,'Các nhà buôn bắt đầu tránh hàng của Phạm Trung Kiên.')},
  {l:'Thôi, không dám va vào tiền của hắn',f:c=>`Nguồn hàng ấy vẫn chạy đều đều.`+fx(c,{tam:-3})+vd(6,12)}]}}),
BE('tai',{id:'vil_bt_thuong',t:'Quỹ chung các nhà buôn',vc:()=>flg('bTai')>=1,
 x:c=>`Mấy nhà buôn bị ${KN} thu phí họp lại, mời ${N(c)} đứng ra làm người gánh việc. Họ góp tiền lập quỹ chung để chống đỡ nếu hắn gây khó.`,
 o:c=>{const pay=loss(10,18);return [
  {l:`Góp vốn lập quỹ chung và giữ sổ sách (${fm(pay)})`,c:()=>G.money()>=pay,f:c=>`Quỹ chung được lập, mỗi nhà một phần. Khi hắn gây khó có tiền đỡ ngay. Danh tiếng nhà mình lên vì dám đứng ra.`+wt(1)+fi('bTai')+dt(2)+fx(c,{money:-pay,fame:3,tam:3})+vd(6,12,'Nhà mình đứng ra lập quỹ chung các nhà buôn.')},
  {l:'Chỉ làm người trung gian, không góp tiền',r:RR({eq:0.8,khau:0.7},0.55),y:c=>`Mọi người thấy nhà mình công bằng, giữ sổ ngay thẳng, quỹ vẫn lập được.`+wt(1)+fi('bTai')+fx(c,{fame:1,tam:2})+vd(6,12),
   n:c=>`Mấy nhà buôn thấy nhà mình chỉ đứng ngoài, nghi ngại rồi tự tách ra.`+fx(c,{tam:-2})+vd(6,12)},
  {l:'Từ chối, sợ rước họa',f:c=>`Họ nhìn nhau rồi lục tục ra về.`+fx(c,{tam:-3})+vd(6,12)}]}}),
BE('tai',{id:'vil_bt_ha',t:'Hắn hạ giá',vc:()=>flg('bTai')>=2,
 x:c=>`Biết nhà mình đang chặn đường tiền bạc, ${KN} tung hàng giá rẻ ra thị trường, chịu lỗ để ép nhà mình và các nhà buôn quỳ gối.`,
 o:c=>{const pay=loss(15,25);return [
  {l:`Giữ giá, chịu lỗ vài tháng (${fm(pay)})`,c:()=>G.money()>=pay,f:c=>`Mấy tháng chật vật. Sang mùa sau hắn cạn vốn phải thu tay, hàng nhà mình thành hàng đáng tin.`+fi('bTai')+kp(-5)+dt(3)+fx(c,{money:-pay,fame:4,tam:2})+vd(6,12,'Nhà mình giữ giá chịu lỗ, Phạm Trung Kiên cạn vốn.')},
  {l:'Hạ giá theo, nhưng giữ chất lượng',r:RR({muu:0.8,khau:0.6,ql:0.6},0.5),y:c=>`Khéo hơn hắn: hàng ngon hơn mà giá ngang. Khách trở về.`+fi('bTai')+kp(-3)+fx(c,{money:Math.round(pay*0.3),fame:2,tam:3})+vd(6,12),
   n:c=>`Giá ngang mà hàng không hơn, khách dửng dưng.`+fx(c,{money:-Math.round(pay/2),tam:-3})+vd(6,12)},
  {l:'Tạm đóng cửa hàng chờ hắn thôi',f:c=>`Cửa hàng đóng nửa năm. Hắn thắng hiệp này.`+kp(2)+fx(c,{tam:-3,fame:-1})+vd(6,12)}]}}),

/* ======================= ĐƯỜNG DÂN TÂM ======================= */
BE('tam',{id:'vil_bd_chan',t:'Phát chẩn mùa giáp hạt',
 x:c=>`Mùa giáp hạt, nhiều nhà trong xóm thiếu ăn, có người còn là nạn nhân của ${KN}. ${N(c)} tính chuyện bỏ ra một khoản phát gạo.`,
 o:c=>{const pay=loss(10,20);return [
  {l:`Phát gạo cho cả xóm, nói rõ là của nhà mình (${fm(pay)})`,c:()=>G.money()>=pay,f:c=>`Cả xóm nhớ ơn. Người ta bảo: "Nhà ấy lúc khó mới thấy."`+dt(5)+fi('bTam')+fx(c,{money:-pay,fame:R(3,5),cfame:1,tam:4})+vd(6,12,'Nhà mình phát gạo cho xóm mùa giáp hạt.')},
  {l:'Phát kín, chỉ cho các nhà bị hắn hại',c:()=>G.money()>=Math.round(pay*0.6),r:RR({eq:0.8,khau:0.6,muu:0.5},0.5),y:c=>`Họ kể lại cho nhau, thầm lặng mà bền. Người nhận ơn sau này sẵn lòng làm chứng.`+wt(1)+dt(3)+fi('bTam')+fx(c,{money:-Math.round(pay*0.6),fame:2,tam:3})+vd(6,12),
   n:c=>`Chuyện lộ. Tay chân của hắn đến hỏi tội vì "tiếp tay cho kẻ chống đối".`+kp(2)+fx(c,{money:-Math.round(pay*0.6),tam:-3})+vd(6,12)},
  {l:'Không đủ sức làm',f:c=>`Mùa ấy vài nhà trong xóm phải bán con trâu cuối cùng.`+fx(c,{tam:-3})+vd(6,12)}]}}),
BE('tam',{id:'vil_bd_oan',t:'Dân kéo đến kể oan',
 x:c=>`Một nhóm người trong làng kéo đến nhà ${N(c)}, kể bị ${KN} chiếm đất, đánh người, bắt nộp thuế hai lần. Họ không có chữ, không có tiền, chỉ muốn có ai đó nghe cho hết.`,
 o:c=>[
  {l:'Ghi từng lời khai, đọc lại cho họ nghe rồi điểm chỉ',r:RR({tri:0.8,eq:0.8},0.5),y:c=>`Mười hai lời khai có điểm chỉ, ngày tháng rõ ràng. Đó là thứ quan huyện không thể làm ngơ mãi.`+wt(2)+pf(1)+dt(3)+fi('bTam')+fx(c,{fame:2,tam:3})+vd(6,12,'Nhà mình ghi lời khai của những người bị Phạm Trung Kiên hại.'),
   n:c=>`Ghi lộn xộn, nhiều lời khai mâu thuẫn nhau. Vẫn còn lại vài lời dùng được.`+wt(1)+fx(c,{tam:-1})+vd(6,12)},
  {l:'Dẫn họ cùng lên huyện nộp đơn tập thể',r:RR({khau:0.8,eq:0.7,fame:0.5},0.55),y:c=>`Cả đoàn kéo lên, quan huyện buộc phải nhận đơn. Tin lan khắp vùng.`+wt(1)+dt(5)+fi('bTam')+fx(c,{fame:4,tam:4})+vd(6,12,'Dân trong vùng cùng nhà mình nộp đơn tập thể lên huyện.'),
   n:c=>`Quan đuổi đoàn đi, hai người bị giữ ba ngày. Dân thấy nản.`+kp(2)+dt(-2)+fx(c,{fame:-1,tam:-4})+vd(6,12)},
  {l:'Khuyên họ nhẫn nhịn, nhà mình chưa đủ sức',f:c=>`Họ ra về trong lặng lẽ. Có người quay lại nhìn một lần.`+dt(-2)+fx(c,{tam:-3})+vd(6,12)}]}),
BE('tam',{id:'vil_bd_tin',t:'Tin đồn ngược',vc:()=>vv().dt>=10,
 x:c=>`Tay chân của ${KN} rêu rao khắp chợ rằng nhà ${N(c)} kích động dân chúng để cướp đất, cầu danh.`,
 o:c=>{const pay=m(5);return [
  {l:'Công khai mời bô lão đến đối chất',r:RR({khau:1,eq:0.7,fame:0.6},0.5),y:c=>`Các bô lão đứng về phía nhà mình, nói thẳng trước đình. Tin đồn quay ngược về người tung ra.`+dt(4)+fi('bTam')+fx(c,{fame:3,tam:3})+vd(6,12,'Nhà mình đập tan tin đồn nhờ bô lão.'),
   n:c=>`Bô lão ngại, lảng đi. Tin đồn càng có thêm chất.`+dt(-3)+fx(c,{fame:-2,tam:-4})+vd(6,12)},
  {l:`Lặng lẽ làm việc thiện, để việc làm trả lời (${fm(pay)})`,c:()=>G.money()>=pay,f:c=>`Không cãi một lời. Tháng sau tin đồn nguội dần, ai cũng nhớ cái giếng nhà mình sửa cho xóm.`+dt(2)+fx(c,{money:-pay,fame:1,tam:2})+vd(6,12)},
  {l:'Mặc kệ',f:c=>`Lời đồn đi một vòng, rồi quay lại với vài chi tiết tệ hơn.`+dt(-2)+kp(1)+fx(c,{tam:-2})+vd(6,12)}]}}),

/* ======================= NHẪN NHỊN CHỜ THỜI ======================= */
BE('nhan',{id:'vil_bn_ep',t:'Một bước ép thêm',
 x:c=>`${KN} lại ép thêm một bước: gấp đôi khoản "ủng hộ" hằng quý cho cả xóm. Ai cũng nhìn sang nhà ${N(c)} xem nhà mình làm gì trước.`,
 o:c=>{const pay=loss(8,14);return [
  {l:`Nộp thêm cho yên (${fm(pay)})`,c:()=>G.money()>=pay,f:c=>`Cả xóm nộp theo. Không ai nhìn thẳng nhà mình.`+kp(3)+fx(c,{money:-pay,fame:-1,tam:-3})+vd(6,12,'Nhà mình nộp thêm cho Phạm Trung Kiên.')},
  {l:'Nộp, nhưng ghi lại ai ép, ai thu',r:RR({tri:1,muu:0.8},0.55),y:c=>`Nộp vẫn mất tiền, nhưng ${N(c)} ghi được tên người thu, ngày giờ, số bạc. Một khoản chứng cứ nhỏ mà thật.`+pf(1)+kp(2)+fx(c,{money:-Math.round(pay*0.7),tam:-1})+vd(6,12),
   n:c=>`Ghi vội, bị người thu bắt gặp. Hắn nhìn rất lâu rồi cười nhạt.`+kp(3)+fx(c,{money:-pay,tam:-4})+vd(6,12)},
  {l:'Từ chối, sẵn sàng chịu hậu quả',f:c=>`Cả xóm nín thở. Đêm đó nhà ${N(c)} thức trắng. Có lẽ đã đến lúc không thể chỉ chờ.`+kp(2)+fx(c,{fame:2,tam:2})+(()=>{vv().brT=S().t-36;return ''})()+vd(4,8,'Nhà mình từ chối nộp thêm, bắt đầu nghĩ lại chuyện nhẫn nhịn.')}]}}),
BE('nhan',{id:'vil_bn_nho',t:'Có người nhờ nhà mình đứng ra',
 x:c=>`Một người trong xóm, mất ruộng vì ${KN}, đến tìm ${N(c)}: "Tôi biết nhà ông bà đang chịu nhịn. Nhưng nếu không có ai đứng ra, bọn tôi biết đứng sau ai?"`,
 o:c=>[
  {l:'Nhận lời nghe chuyện, hứa chưa làm gì',f:c=>`Người ấy kể suốt buổi chiều. Nhà mình chưa hứa gì, nhưng đã nghe.`+wt(1)+fx(c,{tam:1})+vd(6,12,'Một nạn nhân của Phạm Trung Kiên tìm đến nhà mình.')},
  {l:'Khuyên ông ta tìm người khác, nhà mình bất lực',f:c=>`Ông ta cúi đầu: "Tôi hiểu." Rồi đi, lưng còng hơn lúc đến.`+dt(-1)+fx(c,{tam:-3})+vd(6,12)}]})
];
});
