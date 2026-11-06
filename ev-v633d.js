/* Bách Niên Thế Gia v6.3.3 · Ân oán Phạm Trung Kiên và Nguyễn Thành Duy (phần 2: thăng chức, bán ải, thời cơ, kết thúc)
   Kiên leo từ hào lý lên tổng trấn. Duy bán sơ đồ ải Nhạn Môn cho Lang bộ. Bốn con đường kết thúc đòi hỏi bốn bộ điều kiện khác nhau của gia tộc.
   Mô-típ mượn từ chính sử và dã sử: quan lại cấu kết ngoại bang bán biên ải, sứ giả chạy đêm báo tin, kiện cáo lên bộ Hình, dân quỳ trước phủ đường. */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc,age,alive}=G;
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
const RNAME=['hào lý','chánh tổng','tri huyện','tri phủ','tổng trấn'];
const rkSet=d=>{const v=vv();if(d&&d.to!=null&&v.K.rank<d.to){v.K.rank=d.to;v.lastRank=S().t;v.K.pow=Math.max(0,v.K.pow-12)}return ''};
const warned=()=>!!vv().fl.warned;
const half=()=>!warned()&&!!vv().fl.warned1;
/* Duy vượt ải: chốt kết quả đúng một lần, tùy thông tin gia tộc đã chuyển cho đô đốc Nguyễn hay chưa */
const duyEscape=()=>{const v=vv();if(v.fl.d3done)return '';v.fl.d3done=1;v.D.link=0;
  if(warned()){v.fl.duyOut=1;kp(-12);pf(2);dt(8)}
  else{v.fl.war=1;kp(8);dt(-5);
    const W=S().w;
    if(W&&!W.wars.some(w=>w.i===0)){const w=G._v63.w_startWar(0);if(half()&&w)w.until=S().t+R(4,8)}}
  return ''};
const KIND=h=>({phap:'bằng đơn kiện',vo:'bằng võ lực',tai:'bằng cách cắt đứt tài lực',tam:'bằng tiếng nói của dân'}[h]||'');
return [
/* ===================== thăng chức ===================== */
VE('R',{id:'vil_r',t:'Kiên lên chức',
 x:(c,d)=>{const to=d&&d.to||1;const T0=[,
  `Công văn từ huyện đường báo: ${KN} nay được cử làm chánh tổng. Ba tháng trước hắn còn là hào lý nhỏ, hôm nay đứng ở đình cùng ba chức sắc. Người ta nói hắn đã chi một số tiền lớn lót tay cho viên tri huyện cũ.`,
  `Tin từ phủ đường truyền đến: ${KN} được điều lên làm tri huyện của huyện bên. Vị tri huyện cũ vừa bị cách chức vì "sơ suất sổ sách", ai cũng biết sơ suất ấy do ai gài.`,
  `Phủ đường đón một tân tri phủ về nhậm chức: chính là ${KN}. Cờ tán rợp bốn con phố, thuộc hạ của hắn đứng nghiêm hai bên. Ngoài chợ nghe nhắc tên hắn, người ta nói nhỏ lại.`,
  `Triều đình ban sắc bổ ${KN} làm tổng trấn cả vùng. Từ chức tri phủ lên thẳng tổng trấn chỉ trong ba năm, chuyện chưa từng có. Có người bảo hắn nắm trong tay cả hai bộ Binh và Hộ nhờ những lễ vật chất như núi.`][to];return T0},
 o:(c,d)=>{const gift=m(R(4,8));return [
  {l:`Gửi lễ mừng cho phải phép (${fm(gift)})`,c:()=>G.money()>=gift,f:c=>`Lễ mừng gửi đi, thiếp cảm ơn gửi lại. Nhà mình vẫn bình yên, nhưng người trong vùng bắt đầu coi nhà mình là người của hắn.`+rkSet(d)+kp(3)+dt(-3)+fx(c,{money:-gift,fame:-1,tam:-3})+vd(5,9,`Phạm Trung Kiên lên chức ${RNAME[d.to||1]}, nhà mình gửi lễ mừng.`)},
  {l:'Làm ngơ, không gửi lễ',f:c=>`Không ai nhắc tới. Nhưng trong sổ ghi chép của hắn có thêm một dòng.`+rkSet(d)+kp(1)+fx(c,{tam:-1})+vd(5,9,`Phạm Trung Kiên lên chức ${RNAME[d.to||1]}.`)},
  {l:'Dò xem hắn dùng tiền của ai để mua chức',r:RR({muu:1,tri:0.8,khau:0.3},0.5),y:c=>`Qua mấy tầng trung gian, ${N(c)} lần ra danh sách người đã đưa tiền và ngày giờ. Một khoản đúng bằng số thuế thiếu của ba làng.`+rkSet(d)+pf(1)+fx(c,{tam:2})+vd(5,9,`Nhà mình lần ra dòng tiền mua chức ${RNAME[d.to||1]} của Phạm Trung Kiên.`),
   n:c=>`Hỏi chỗ này chỗ kia, chỉ nghe được lời đồn vòng vo.`+rkSet(d)+fx(c,{tam:-2})+vd(5,9,`Phạm Trung Kiên lên chức ${RNAME[d.to||1]}.`)}]}}),

/* ===================== Duy bán ải ===================== */
VE('D',{id:'vil_d_1',t:'Khách lạ giữa đêm',vo:1,vc:()=>!S().war&&vv().D.ok,
 x:c=>`Gần canh ba, tiếng gõ cổng nhà ${N(c)}. Một người cưỡi ngựa mồ hôi ướt đẫm, áo lính Nhạn Môn, xin nước. Ngựa sùi bọt. Anh nói thở không ra hơi: "Bên kia ải gần đây có đèn lồng lạ. Tôi thấy một thư sinh tên ${DN} ngồi cùng bọn Lang bộ trong hang. Nhiều lần."`,
 o:c=>[
  {l:'Cho nghỉ, nghe kỹ, ghi từng chi tiết',r:RR({tri:1,muu:0.7,eq:0.3},0.55),y:c=>`Anh kể ngày, giờ, con đường bí mật, màu cờ. Khi ngủ gục, ${N(c)} chép lại từng chữ.`+pf(2)+wt(1)+fl('d1')+fx(c,{tam:2})+vd(4,8,'Nhà mình biết Duy gặp bọn Lang bộ ở ngoài ải.'),
   n:c=>`Anh nói nhanh, kiệt sức nên lẫn lộn. ${N(c)} chỉ nhớ được vài chi tiết rời rạc.`+pf(1)+fl('d1')+fx(c,{tam:-1})+vd(4,8,'Nhà mình nghe tin Duy gặp bọn Lang bộ.')},
  {l:'Viết thư báo ngay cho đô đốc Nguyễn ở ải',c:()=>V().house('nguyen').rel>=0,f:c=>`Thư gửi đi trên ngựa của chính người lính. Hồi âm ngắn: "Đã ghi nhận, sẽ cho tuần tra."`+hr('nguyen',6)+fl('warned1')+pf(1)+fx(c,{tam:3})+vd(4,8,'Nhà mình báo tin Duy gặp Lang bộ cho đô đốc Nguyễn.')},
  {l:'Cho nghỉ rồi tiễn đi, không hỏi thêm',f:c=>`Sáng ra anh cảm tạ, lên ngựa đi. Nhà mình không biết anh có sống nổi đến Nhạn Môn.`+fx(c,{tam:-3})+vd(4,8,'Nhà mình bỏ qua tin từ ngoài ải.')}]}),
VE('D',{id:'vil_d_2',t:'Mật thư bán ải',vo:2,vc:()=>!S().war&&vv().D.ok,
 x:c=>`Một nhà sư chùa nhỏ nhờ người mang đến nhà ${N(c)} một cuộn giấy, kèm lời nhắn: "Có kẻ gửi tôi giữ nhưng tôi không dám mở." Mở ra: bản vẽ địa hình ải Nhạn Môn, đánh dấu cửa Tây, lịch đổi gác, kèm lời thỏa thuận ba nghìn lạng bạc. Dấu bên dưới là của ${DN}.`,
 o:c=>[
  {l:'Báo thẳng cho đô đốc Nguyễn Hoàng Long Vũ',c:()=>V().house('nguyen').rel>=-10,r:RR({fame:1,khau:0.8,eq:0.6},0.5),y:c=>`Đô đốc đọc xong, mặt không đổi sắc, chỉ gọi ba tướng vào. Trong tháng, lịch đổi gác bị thay hoàn toàn, cửa Tây xây thêm hai lớp.`+hr('nguyen',14)+fl('warned')+pf(2)+wt(1)+fx(c,{fame:4,tam:6})+vd(4,8,'Đô đốc Nguyễn tin lời báo và gia cố Nhạn Môn.'),
   n:c=>`Thư đến tay một phụ tá nghi ngại, cho là giả mạo. Đô đốc không được biết ngay.`+hr('nguyen',-2)+fl('warned1')+fx(c,{tam:-4})+vd(4,8,'Thư báo của nhà mình bị phụ tá của đô đốc Nguyễn gạt đi.')},
  {l:'Nhờ thủy binh họ Kiều đưa tin gấp đường biển',c:()=>V().house('kieu').rel>=15,f:c=>`Thuyền lướt qua đêm, đến Nhạn Môn trước bình minh. Họ Kiều tự mình đứng ra bảo đảm.`+hr('kieu',6)+hr('nguyen',6)+fl('warned')+pf(1)+fx(c,{tam:4})+vd(4,8,'Họ Kiều giúp đưa tin gấp đến Nhạn Môn.')},
  {l:'Báo quan địa phương',f:c=>{const bad=rk()>=2;return bad?`Quan địa phương nhận lấy cuộn giấy rồi rót trà mời. Đến tối nghe tin cuộn giấy bị "thất lạc". Cả nhà được cảnh báo: đừng chõ mũi vào chuyện này.`+kp(5)+dt(-3)+fx(c,{tam:-8})+vd(4,8,'Tin báo của nhà mình lọt vào tay thuộc hạ Phạm Trung Kiên.'):`Quan nhận rồi chuyển lên, nhưng thủ tục chậm.`+fl('warned1')+fx(c,{tam:-1})+vd(4,8,'Nhà mình báo quan địa phương về mật thư bán ải.')}},
  {l:'Chép lại làm chứng cứ, giữ im lặng chờ thời cơ',f:c=>`Cuộn giấy gốc cất đáy hòm, một bản sao khác nhờ người đưa lên Nhạn Môn khi nào đủ chắc. Nhẹ gánh, mà không dám ngủ.`+pf(2)+fx(c,{tam:-2})+vd(4,8,'Nhà mình giữ mật thư bán ải của Duy.')}]}),
VE('D',{id:'vil_d_3',t:'Đêm Duy vượt ải',vo:3,vc:()=>vv().D.ok&&!vv().fl.d3done,
 x:c=>warned()?`Nhạn Môn đã nhận được lời cảnh báo: lịch gác đổi, cửa Tây thêm người. Đêm ${DN} cùng một toán Lang bộ lẻn đến ải, quân canh chờ sẵn, bắt gọn hai tên, còn Duy chạy thoát vào rừng. Sáng ra khắp vùng nghe tin đô đốc đã bắt được gián điệp, dán lệnh truy nã.`:half()?`Đêm ấy Nhạn Môn đã lỏng đôi chút nhưng chưa kịp thay lịch gác. Một toán Lang bộ lọt qua cửa Tây, đánh úp đồn tiền tiêu, rồi bị chặn lại ở cửa thứ hai. Khói lửa bốc lên đen kịt. ${DN} đã biến mất khỏi vùng.`:`Không ai báo tin cho Nhạn Môn. Đêm ấy, một toán Lang bộ lọt qua cửa Tây theo bản vẽ của ${DN}, đánh úp đồn tiền tiêu và chiếm được một khúc ải. Tin dữ về đến vùng này lúc rạng sáng: chiến tranh đã nổ ra.`,
 o:c=>{const sup=m(R(8,15));return [
  {l:'Đứng ra làm chứng với triều đình về những gì mình biết',r:RR({fame:1,khau:0.9,eq:0.5},0.5),y:c=>`Lời khai của ${N(c)} được ghi vào hồ sơ. Người ngồi nghe ghi chép cả chi tiết nhỏ nhất, và hứa chuyển lên bộ Hình.`+duyEscape()+wt(1)+pf(1)+dt(4)+fx(c,{fame:4,tam:4})+vd(6,12,'Nhà mình làm chứng về việc Duy bán ải.'),
   n:c=>`Quan ghi chép qua loa, không coi là chứng cứ có sức nặng.`+duyEscape()+fx(c,{tam:-2})+vd(6,12,'Lời khai của nhà mình về Duy chưa được coi trọng.')},
  {l:`Ủng hộ lương thực và thuốc men cho Nhạn Môn (${fm(sup)})`,c:()=>G.money()>=sup,f:c=>`Xe lương thực của nhà mình lên ải đúng lúc hết thuốc sát trùng. Đô đốc ghi tên nhà mình vào sổ ơn nghĩa.`+duyEscape()+hr('nguyen',12)+dt(5)+fx(c,{money:-sup,fame:R(4,8),cfame:2,tam:5})+vd(6,12,'Nhà mình ủng hộ Nhạn Môn khi Duy vượt ải.')},
  {l:'Lo giữ gia đình, tránh họa chiến tranh',f:c=>`Cả nhà đóng cửa, trữ lương thực, chờ xem tình hình. Ít nhất mọi người đều an toàn.`+duyEscape()+fx(c,{tam:-2})+vd(6,12,'Nhà mình lo giữ gia đình khi Duy vượt ải.')}]}}),
VE('D',{id:'vil_d_4',t:'Dư chấn',vo:4,vc:()=>!!vv().fl.d3done,
 x:c=>vv().fl.war?`Chiến sự kéo theo cung ứng quân lương. ${KN} nhận hợp đồng cung gạo cho các đồn, lấy lý do "bảo vệ giang sơn" để vơ vét. Gạo hư trộn vào gạo tốt, thuế tăng cả năm. Cùng lúc, người ta nói ${DN} đã sống an ổn bên kia biên giới.`:`Sau chuyện ở ải, ${KN} lập tức tuyên bố hắn "không hay biết gì" về ${DN}, rồi đổ cho Duy mọi tội. Cả vùng xôn xao: người tin, kẻ nghi. Hắn mất bớt thế lực, nhưng vẫn là tri phủ, vẫn ngồi trên đầu dân.`,
 o:c=>[
  {l:'Tố cáo hắn bóc lột lương quân hoặc chối tội, gom chứng cứ đối chiếu',r:RR({tri:1,muu:0.8,khau:0.4},0.5),y:c=>`Hai việc ghép lại thành một bức tranh rõ nét: kẻ cùng chủ mưu ${DN}, nay nhảy nhót như người vô tội. Cả sổ sách và lời khai ghi đủ.`+pf(2)+wt(1)+fx(c,{tri:1,tam:4})+vd(8,14,'Nhà mình đối chiếu dư chấn việc Duy bán ải với hành vi của Phạm Trung Kiên.'),
   n:c=>`Chứng cứ rời rạc, bị cho là suy diễn.`+fx(c,{tam:-3})+vd(8,14,'Chứng cứ về dư chấn bán ải chưa đủ.')},
  {l:'Cùng dân giúp nhau qua cơn khó, gây dựng lòng tin',c:()=>G.money()>=m(5),f:c=>`Nhà mình chia lương thực, mở cổng cho dân tạm trú. Lòng dân dồn về nhà mình nhiều hơn.`+dt(10)+fx(c,{money:-m(5),fame:5,cfame:2,tam:5})+vd(8,14,'Nhà mình chăm lo dân qua cơn dư chấn bán ải.')},
  {l:'Lặng im, chờ mọi chuyện lắng xuống',f:c=>`Chuyện lắng dần. Cả nhà mong yên, nhưng ai cũng biết chưa hết.`+fx(c,{tam:-2})+vd(8,14,'Nhà mình chờ mọi chuyện lắng xuống sau việc bán ải.')}]}),

/* ===================== khi nhà mình nhẫn quá lâu ===================== */
VE('S',{id:'vil_s_tinh',t:'Nhẫn đến bao giờ',vo:0,
 x:c=>`Đêm ấy ${N(c)} ngồi một mình bên đèn, nghĩ về những lần đã cúi đầu: thuế khống, lễ vật, lời đồn, ánh mắt của người trong họ. ${KN} vẫn ngày càng lớn, còn nhà mình càng nhỏ đi một chút. Có tiếng gió động ngoài hiên, ${N(c)} thấy rõ một điều: nhịn mãi cũng chỉ nhịn được đến lúc họ lấy hết.`,
 o:c=>[
  {l:'Từ nay không nhịn nữa, đối mặt từng việc',f:c=>`${N(c)} gọi người nhà họp, nói rõ. Cả nhà nhìn nhau rồi gật đầu.`+st('fight')+(vv().hideN=0,'')+dt(3)+fx(c,{tam:5,eq:1})+vd(6,12,'Nhà mình quyết không nhịn nữa trước Phạm Trung Kiên.')},
  {l:'Ngoài mặt vẫn nhịn, trong nhà âm thầm ghi chép và dò xét',f:c=>`Một quyển sổ mỏng mở ra, từng dòng ghi ngày, tháng, việc, người.`+st('watch')+(vv().hideN=0,'')+pf(1)+fx(c,{tam:2})+vd(6,12,'Nhà mình bắt đầu ghi chép về Phạm Trung Kiên.')},
  {l:'Vẫn nhịn, mong hắn tự chùn tay',f:c=>`Gió ngoài hiên lặng. Nhà mình giữ nguyên nếp nhẫn nhịn.`+kp(3)+(vv().hideN=-2,'')+fx(c,{tam:-4})+vd(8,14,'Nhà mình tiếp tục nhẫn nhịn trước Phạm Trung Kiên.')}]}),

/* ===================== thời cơ: chọn đường kết thúc ===================== */
VE('Z',{id:'vil_z0',t:'Thời cơ đã chín',
 x:c=>{const rs=V().vilRoutes().filter(r=>r.ok);return `Sau bao năm gom góp, nhà mình đã có trong tay nhiều thứ mà trước kia chưa từng nghĩ tới. ${rs.length>1?`Nhà mình có đủ điều kiện đi ${rs.length} con đường khác nhau để chấm dứt ân oán với ${KN} và ${DN}`:`Nhà mình có đủ điều kiện đi một con đường để chấm dứt ân oán với ${KN} và ${DN}`}. Cả nhà ngồi lại bàn bạc suốt đêm. Mỗi con đường có giá của nó.`},
 o:c=>{const rs=V().vilRoutes().filter(r=>r.ok);
  const intro={phap:`Hồ sơ được xếp ngay ngắn, bản sao nhân chứng ký tên, thư giới thiệu của người quen trên công đường.`,vo:`Cả nhà bí mật chọn người, lộ trình, ngày giờ. Không ai nói to, nhưng ai cũng biết mình đang làm điều gì.`,tai:`Từng khoản nợ, từng hợp đồng, từng nguồn hàng được kê ra, tính toán chi tiết đến từng quan tiền.`,tam:`Nhà mình lặng lẽ nhắn từng làng. Các cụ già gật đầu, tráng đinh cất lại nông cụ, chờ ngày.`};
  const L=rs.map(r=>({l:`${r.n}`,s:r.L.slice(0,3).map(x=>x.t).join('; '),f:c=>{const v=vv();v.q=1;v.qt=S().t;G.later(c,'vil_z_'+r.id,1);return intro[r.id]+' Một tháng sau mọi thứ sẽ sẵn sàng.'+fx(c,{tam:2})}}));
  L.push({l:'Chưa đến lúc, chờ thêm cho chắc',f:c=>`Cả nhà đồng ý chờ. Kiên và Duy không biết, nhưng thời gian không đứng về phía ai cả.`+vd(10,20,'Nhà mình hoãn lại việc kết thúc ân oán.')});
  return L}}),
VE('Z',{id:'vil_z_phap',t:'Đơn kiện lên công đường',
 x:c=>`Bộ hồ sơ được niêm phong, đóng dấu của người làm chứng, gửi lên phủ đường. Chỗ dựa trong công đường nhắn tin: "Ngày ấy có tuần án đi qua, có thể trình đơn trực tiếp." Mọi con mắt đổ về phía nhà mình. Kiện một quan địa phương không phải chuyện nhỏ.`,
 o:c=>{const pay=m(R(10,18));return [
  {l:'Nộp đơn lên tri phủ theo đúng thủ tục',r:RR({tri:1,khau:0.9,eq:0.3},0.5),y:c=>`Tri phủ nhận đơn, xem xét từng trang. Đủ chứng cứ, đủ nhân chứng, không ai gạt được. Ba tháng sau, sắc lệnh bắt giam ${KN} được ký.`+fx(c,{tri:1,fame:4,tam:6})+(()=>{vv().fl.how='phap';G.later(c,'vil_e_kien',1,{how:'phap'});vv().q=1;vv().qt=S().t;return ''})(),
   n:c=>`Đơn bị đặt vào "xem xét thêm" nhiều tháng, rồi bị bác với lý do "chứng cứ chưa rõ". Một số nhân chứng đổi lời khai.`+pf(-2)+wt(-1)+kp(6)+(vv().tries=(vv().tries||0)+1,'')+fx(c,{money:-pay,tam:-8})+vd(10,20,'Đơn kiện của nhà mình bị bác.')},
  {l:`Nhờ họ Vũ chuyển thẳng lên bộ Hình (${fm(pay)})`,c:()=>V().house('vu').rel>=30&&G.money()>=pay,r:RR({khau:0.7,eq:0.5,fame:0.5},0.7),y:c=>`Bộ Hình cử người xuống điều tra riêng, không qua phủ đường. Kiên không kịp dùng thế lực.`+hr('vu',-8)+fx(c,{money:-pay,fame:5,tam:8})+(()=>{vv().fl.how='phap';G.later(c,'vil_e_kien',1,{how:'phap'});vv().q=1;vv().qt=S().t;return ''})(),
   n:c=>`Người của bộ Hình đến, nhưng Kiên đã biết trước, bày sẵn đối phó. Cuộc điều tra không đi đến đâu.`+hr('vu',-3)+pf(-2)+kp(5)+(vv().tries=(vv().tries||0)+1,'')+fx(c,{money:-pay,tam:-6})+vd(10,20,'Cuộc điều tra của bộ Hình bị Kiên lách qua.')},
  {l:'Chặn kiệu quan tuần án khi ông đi qua, trình đơn',r:RR({khau:1,gan:0.8,eq:0.5},0.4),y:c=>`Quan tuần án dừng kiệu, nhận đơn và đọc ngay giữa đường. Ngài hỏi vài câu, ghi chép, nét mặt thay đổi dần. "Việc này ta xử." Hai tháng sau, ${KN} bị giải đi.`+fx(c,{fame:8,cfame:2,tam:8})+(()=>{vv().fl.how='phap';G.later(c,'vil_e_kien',1,{how:'phap'});vv().q=1;vv().qt=S().t;return ''})(),
   n:c=>`Lính hộ tống xô ${N(c)} ngã, quan tuần án không dừng. Tờ đơn lạc dưới chân kiệu.`+pf(-2)+kp(6)+(vv().tries=(vv().tries||0)+1,'')+fx(c,{suc:-6,fame:-4,tam:-8})+vd(10,20,'Nhà mình chặn kiệu quan tuần án nhưng thất bại.')}]}}),
VE('Z',{id:'vil_z_vo',t:'Bắt giữ bằng võ lực',
 x:c=>`Không còn cách nào khác ngoài việc tự mình ra tay. Cả nhà chọn kỹ người, kế hoạch, lối thoát. ${KN} có hộ vệ bảy người, mỗi người đều là tay giang hồ lão luyện. Chỉ cần một sai sót là cả họ nhà mình mang họa.`,
 o:c=>[
  {l:'Phục kích khi hắn đi lễ chùa cuối tháng',r:RR({vo:1,muu:0.8,gan:0.5},0.45),y:c=>`Đêm ấy sương mù dày đặc, ${N(c)} cùng các huynh đệ bịt miệng, trói tay, vác hắn lên xe trước khi hộ vệ kịp rút kiếm. Sáng hôm sau ${KN} đã nằm trong lồng sắt ngoài phủ đường.`+fx(c,{vo:2,fame:4,tam:8})+(()=>{vv().fl.how='vo';G.later(c,'vil_e_kien',1,{how:'vo'});vv().q=1;vv().qt=S().t;return ''})(),
   n:c=>`Hộ vệ nhiều hơn dự tính. ${N(c)} bị thương nặng, hai người nhà bị bắt. Kiên báo tin, tuyên bố nhà mình mưu sát quan lại.`+pf(-2)+kp(8)+(vv().tries=(vv().tries||0)+1,'')+fx(c,{suc:-12,fame:-5,tam:-9})+vd(12,24,'Cuộc phục kích Phạm Trung Kiên thất bại.')},
  {l:'Nhờ đô đốc Nguyễn hoặc Kiều cho quân tinh nhuệ giúp sức',c:()=>V().house('nguyen').rel>=40||V().house('kieu').rel>=40,r:RR({muu:0.8,vo:0.6,eq:0.5},0.7),y:c=>`Hai mươi lính tinh nhuệ vây trang viện, bắt Kiên khi đang bàn việc. Chỉ vài tiếng đồng hồ. Quan huyện đứng nhìn, không dám can thiệp vì có lệnh bài của đô đốc.`+hr('nguyen',4)+hr('kieu',4)+fx(c,{fame:5,tam:8})+(()=>{vv().fl.how='vo';G.later(c,'vil_e_kien',1,{how:'vo'});vv().q=1;vv().qt=S().t;return ''})(),
   n:c=>`Kiên được báo trước. Khi quân đến, trang viện đã vắng tanh.`+pf(-2)+kp(5)+(vv().tries=(vv().tries||0)+1,'')+fx(c,{tam:-6})+vd(12,24,'Quân hỗ trợ ập vào trang viện nhưng Kiên đã chạy.')},
  {l:'Đột kích thẳng vào trang viện ban đêm',r:RR({vo:1,gan:0.8,suc:0.5},0.3),y:c=>`Cả nhà mình xông vào, hạ hộ vệ từng người. ${KN} bị lôi từ giường xuống, còn chưa kịp mặc áo.`+fx(c,{vo:3,suc:-3,fame:6,tam:8})+(()=>{vv().fl.how='vo';G.later(c,'vil_e_kien',1,{how:'vo'});vv().q=1;vv().qt=S().t;return ''})(),
   n:c=>`Trang viện có cạm bẫy, hầm hố. Mười người mất tích, ba người chết.`+pf(-3)+kp(8)+(vv().tries=(vv().tries||0)+1,'')+fx(c,{suc:-15,fame:-6,tam:-14,trait:'vetan'})+vd(12,24,'Cuộc đột kích trang viện của Kiên thất bại thảm hại.')}]}),
VE('Z',{id:'vil_z_tai',t:'Bóp nghẹt tài lực',
 x:c=>`Tiền là máu của kẻ cầm quyền. ${KN} đang gánh một núi nợ ngầm, lệ thuộc vào ba nguồn hàng và hai chủ nợ lớn. Nhà mình có đủ vốn để mua lại những khoản đó cùng lúc rồi đòi nợ đồng loạt.`,
 o:c=>{const cap=m(R(60,100));return [
  {l:`Mua gom nợ của hắn rồi đòi cùng lúc (${fm(cap)})`,c:()=>G.money()>=cap,r:RR({ql:1,muu:0.8,tri:0.4},0.5),y:c=>`Tháng đó mười lăm thương nhân đồng loạt đòi nợ. Kho của Kiên hết sạch, thuộc hạ bỏ đi vì không còn trả được lương. Quan cấp trên ra lệnh kiểm tra tài sản.`+fx(c,{money:-cap,fame:5,tam:8})+(()=>{vv().fl.how='tai';G.later(c,'vil_e_kien',1,{how:'tai'});vv().q=1;vv().qt=S().t;return ''})(),
   n:c=>`Kiên được báo, bán hết hàng cho một chủ nợ lớn hơn. Nhà mình mất phần lớn vốn mà hắn thoát nạn.`+pf(-2)+kp(6)+(vv().tries=(vv().tries||0)+1,'')+fx(c,{money:-cap,tam:-8})+vd(12,24,'Kế hoạch bóp nghẹt tài lực Kiên thất bại.')},
  {l:'Cắt đứt các tuyến hàng của hắn, cô lập chợ',c:()=>S().biz.length>=2||S().trips.length>=1,r:RR({ql:0.8,khau:0.8,muu:0.5},0.5),y:c=>`Hàng hóa của Kiên không đi qua được cổng nào. Chợ của hắn vắng tanh, thuộc hạ nản dần. Sáu tháng sau, hắn không trả nổi lương quân.`+fx(c,{fame:4,tam:6})+(()=>{vv().fl.how='tai';G.later(c,'vil_e_kien',1,{how:'tai'});vv().q=1;vv().qt=S().t;return ''})(),
   n:c=>`Hắn phản công, tìm đường khác, còn đánh thuế nặng hàng của nhà mình.`+pf(-2)+kp(5)+(vv().tries=(vv().tries||0)+1,'')+fx(c,{money:-m(15),tam:-6})+vd(12,24,'Việc cắt đứt tuyến hàng của Kiên không thành.')},
  {l:'Nhờ họ Dương dùng quan hệ dược liệu siết nguồn hàng của hắn',c:()=>V().house('duong').rel>=40,r:RR({khau:0.8,eq:0.6,ql:0.5},0.7),y:c=>`Họ Dương có mặt trong mọi tiệm thuốc từ nam ra bắc. Một tiếng nói của họ đủ khiến nguồn dược của Kiên cạn khô.`+hr('duong',-5)+fx(c,{fame:4,tam:6})+(()=>{vv().fl.how='tai';G.later(c,'vil_e_kien',1,{how:'tai'});vv().q=1;vv().qt=S().t;return ''})(),
   n:c=>`Kiên phát hiện sớm, chuyển nguồn sang tiệm khác.`+hr('duong',-2)+pf(-1)+kp(4)+(vv().tries=(vv().tries||0)+1,'')+fx(c,{tam:-4})+vd(12,24,'Họ Dương đã cố nhưng chưa bóp nghẹt được Kiên.')}]}}),
VE('Z',{id:'vil_z_tam',t:'Dân chúng đồng thanh',
 x:c=>`Lòng dân là thứ không thể mua, cũng không thể ép. Qua bao năm, nhà mình đã đứng về phía những người bị hại, được kể lại ở nhiều làng. Các cụ già tìm đến: "Khi nào đứng lên, chúng tôi cùng đứng." Nhưng cũng cần biết cách, để không bị gán là loạn đảng.`,
 o:c=>[
  {l:'Dẫn dân kéo đến cửa phủ đường, lặng lẽ quỳ',r:RR({khau:1,eq:0.9,gan:0.4},0.5),y:c=>`Hơn nghìn người quỳ lặng trước phủ đường ba ngày, không một lời quát tháo. Quan trên nghe tin, phải cử người xuống điều tra và cách chức ${KN} ngay tại chỗ.`+fx(c,{fame:8,cfame:3,tam:10})+(()=>{vv().fl.how='tam';G.later(c,'vil_e_kien',1,{how:'tam'});vv().q=1;vv().qt=S().t;return ''})(),
   n:c=>`Kiên cho lính xua đuổi, bắt vài người cầm đầu. Dân tản đi, sợ hãi.`+pf(-2)+dt(-15)+kp(6)+(vv().tries=(vv().tries||0)+1,'')+fx(c,{fame:-3,tam:-10})+vd(12,24,'Đoàn dân đến phủ đường bị Kiên đàn áp.')},
  {l:'Soạn bản ký tên của hàng nghìn người gửi triều đình',r:RR({tri:1,khau:0.9,eq:0.5},0.5),y:c=>`Bản "vạn dân thư" kéo dài cả trăm tờ giấy, đủ điểm chỉ của dân, chữ ký của nho sĩ, dấu của kỳ lão. Triều đình không thể làm ngơ.`+fx(c,{tri:1,fame:7,cfame:3,tam:8})+(()=>{vv().fl.how='tam';G.later(c,'vil_e_kien',1,{how:'tam'});vv().q=1;vv().qt=S().t;return ''})(),
   n:c=>`Bản thư bị chặn từ cổng huyện, mất tăm. Người đứng tên bị gọi lên cảnh cáo.`+pf(-2)+dt(-10)+kp(5)+(vv().tries=(vv().tries||0)+1,'')+fx(c,{fame:-3,tam:-8})+vd(12,24,'Bản vạn dân thư bị chặn lại.')},
  {l:'Chờ ngày hội làng lớn, nhân đông người cùng vạch tội',r:RR({khau:1,eq:0.7,gan:0.6},0.45),y:c=>`Hội làng đông nhất năm. Khi ${KN} vừa bước lên đài, các cụ già đứng lên nói thẳng từng việc. Đám đông phụ họa như sóng. Hắn tái mặt, rút lui trong tiếng la ó.`+fx(c,{fame:8,cfame:3,tam:10})+(()=>{vv().fl.how='tam';G.later(c,'vil_e_kien',1,{how:'tam'});vv().q=1;vv().qt=S().t;return ''})(),
   n:c=>`Hội làng ồn ào nhưng lộn xộn, người say, người sợ. Hắn xoay chuyển được, còn tuyên bố nhà mình kích động.`+pf(-1)+dt(-8)+kp(5)+(vv().tries=(vv().tries||0)+1,'')+fx(c,{fame:-2,tam:-7})+vd(12,24,'Hội làng bị Kiên phản công.')}]}),

/* ===================== kết thúc ===================== */
VE('E',{id:'vil_e_kien',t:'Số phận của Phạm Trung Kiên',
 x:(c,d)=>{const how=d&&d.how||'phap';return {
  phap:`Tờ sắc từ kinh đến phủ đường. ${KN} bị cách chức, tịch thu gia sản, bị áp giải về kinh chờ xét xử. Cả phủ đường im như tờ. Có người khóc vì mừng, có người đứng xa cười lạnh, có người mang tráp quà đi tìm ông chủ mới.`,
  vo:`${KN} nằm trong lồng sắt giữa sân phủ, râu tóc rối bù, mắt đỏ ngầu. Dân chúng kéo đến đông nghịt, nhìn hắn như nhìn một con thú bị nhốt. Bọn thuộc hạ đã chạy tán loạn.`,
  tai:`Kho trống, quân bỏ, chủ nợ đòi nợ ầm ĩ trước cổng. ${KN} đứng giữa trang viện lớn nay hoang vắng, ngồi phịch xuống bậc thềm. Quan trên ra lệnh kiểm kê, chức tước tụt xuống cho đến khi không còn gì.`,
  tam:`Lời cách chức đến từ trên triều, nhưng ai cũng biết do cái gì: tiếng dân. ${KN} bị giải ra khỏi phủ đường giữa hai hàng người đứng im, không ai hô, không ai chửi, chỉ nhìn. Hắn cúi đầu.`}[how]},
 o:(c,d)=>{const how=d&&d.how||'phap';const fin=(c,note)=>{const v=vv();v.end='won';v.q=0;v.K.ok=0;V().vilLog(note);if(v.D.ok)G.later(c,'vil_e_duy',2,{how});return ''};
  return [
  {l:'Giao cho công đường xử theo luật',f:c=>`${N(c)} đứng ngoài nghe phán quyết đọc. Mười hai tội, từ thuế khống đến cấu kết ngoại bang. Cả đời ${KN} thu lại thành một trang giấy.`+fin(c,'Phạm Trung Kiên bị công đường xét xử.')+(V().achieve(c,'góp phần lật đổ Phạm Trung Kiên'),'')+fx(c,{fame:R(14,22),cfame:5,tam:10,trait:'trugian'})},
  {l:'Tịch biên gia sản hoàn lại cho dân bị chiếm đất, bị đòi thuế khống',f:c=>`Hàng trăm hộ nhận lại ruộng, tiền, hoặc lời xin lỗi bằng văn bản. Nhiều người khóc ngay giữa đình. Nhà mình giữ lại một phần nhỏ làm chi phí tố tụng, còn lại phát đi hết.`+fin(c,'Gia sản Phạm Trung Kiên được trả lại cho dân.')+(V().achieve(c,'đòi lại công bằng cho cả vùng'),'')+fx(c,{money:m(R(15,30)),fame:R(18,28),cfame:6,tam:12,trait:'trugian'})},
  {l:'Để hắn sống, đày ra biên ải làm lao dịch',f:c=>`${KN} nhận án mà không nói. Mười năm lao dịch ở Nhạn Môn, một án nhẹ hơn mức hắn xứng đáng, nhưng đủ để hắn không bao giờ cầm quyền được nữa. Nhiều người trong họ bảo là mềm lòng, một số khác bảo là đại lượng.`+fin(c,'Phạm Trung Kiên bị đày ra biên ải.')+(V().achieve(c,'đưa Phạm Trung Kiên đến chỗ không còn làm hại ai'),'')+fx(c,{fame:R(10,16),cfame:3,tam:14,trait:'khoandung'})}]}}),
VE('E',{id:'vil_e_duy',t:'Số phận của Nguyễn Thành Duy',
 x:(c,d)=>vv().fl.war?`Tin tức về ${DN} đến từ phía biên giới: hắn đã được Lang bộ ban chức quan nhỏ, sống trong một biệt phủ ven sông. Bọn Lang bộ không giao hắn, nhưng nếu họ thật sự cần hoà bình, họ sẽ bỏ hắn.`:vv().fl.duyOut?`${DN} lẩn trốn nhiều năm, cuối cùng bị người ta nhận ra ở một quán trà bên đường. Bị giải về, hắn ngồi im lặng, không còn nụ cười ôn hòa nữa. Ánh mắt như người đã hiểu rằng thế gian không chỉ có tính toán.`:`Khi chỗ dựa sụp đổ, ${DN} trở thành kẻ không nhà không cửa. Người ta bắt gặp hắn ở một miếu hoang, ốm yếu, xin cơm. Hắn nhìn thẳng ${N(c)}: "Nếu ta là ngươi, ta cũng làm vậy."`,
 o:(c,d)=>{const v=vv();const done=note=>{v.D.ok=0;V().vilLog(note);return ''};
  if(v.fl.war)return [
   {l:'Gửi thư qua biên giới, nhờ đô đốc Nguyễn đòi người',c:()=>V().house('nguyen').rel>=10,f:c=>`Đô đốc Nguyễn dâng thư lên triều. Mười năm sau, trong một hiệp ước hòa bình, Lang bộ buộc phải giao ${DN} về. Hắn bị họ Nguyễn đưa về cúng gia phả, rồi bị xử theo gia pháp.`+done('Duy bị Lang bộ giao về và xử theo gia pháp họ Nguyễn.')+hr('nguyen',12)+fx(c,{fame:4,tam:6})},
   {l:'Mặc hắn, coi như người đã chết',f:c=>`Cuối cùng ${N(c)} chỉ thở dài. Hắn sống an ổn bên kia biên giới, nhưng không bao giờ được quay về. Trong nhà, cái tên ấy dần ít được nhắc.`+done('Duy sống lưu vong bên kia biên giới.')+fx(c,{tam:4})},
   {l:'Viết cho hắn một lá thư cuối, không hận thù',f:c=>`Thư không hồi âm, nhưng ${N(c)} thấy lòng nhẹ đi. Có những điều không cần câu trả lời mới yên.`+done('Nhà mình viết thư cuối cho Duy.')+fx(c,{tam:8,eq:1,trait:'khoandung'})}];
  return [
   {l:'Giao về họ Nguyễn xử theo gia pháp',c:()=>V().house('nguyen').rel>=0,f:c=>`Đô đốc cử người đến nhận. Họ Nguyễn xử riêng, không công bố. Nghe nói hắn bị gạch tên vĩnh viễn khỏi gia phả và đày ra đảo xa.`+done('Duy bị giao về họ Nguyễn xử theo gia pháp.')+hr('nguyen',15)+fx(c,{fame:4,cfame:1,tam:6})},
   {l:'Giao công đường xử về tội bán ải',f:c=>`Phán quyết nặng nhất theo lệ: lưu đày chung thân. Trước khi lên xe, ${DN} xin gặp ${N(c)} một lần, nói rất khẽ: "Cảm ơn đã không giết ta." Rồi quay đi.`+done('Duy bị xử lưu đày chung thân.')+fx(c,{fame:6,cfame:2,tam:6})},
   {l:'Tha, sau khi hắn thề rời khỏi vùng và không bao giờ trở lại',f:c=>{const redeem=chance(0.5);return redeem?`${DN} quỳ xuống thề, nước mắt chảy. Nhiều năm sau, có tin hắn mở lớp dạy học ở một vùng núi xa, dạy cho con em nghèo, không lấy tiền. Có người nói đó là chính hắn.`+done('Duy được tha, sau này làm thầy đồ ở vùng xa.')+fx(c,{tam:12,eq:2,trait:'khoandung'}):`${DN} thề rồi rời đi. Không ai biết sau đó hắn ra sao. Nhiều năm sau, nhà mình vẫn thỉnh thoảng nhìn ra cổng, tự hỏi.`+done('Duy được tha, mất tích.')+fx(c,{tam:6,trait:'khoandung'})}}]}}),
VE('E',{id:'vil_e_fade',t:'Ân oán lặng đi',
 x:c=>`Qua chừng ấy năm, cái tên ${KN} đã hóa thành ký ức. Không có phán quyết, không có công đường. Chỉ một ngày nào đó, tin tức đến: hắn đã chết trên giường, tuổi già, không con cháu thừa tự. ${DN} cũng chẳng ai biết tung tích. Những trang giấy cũ và cuộn sổ nhà mình lưu giữ đã vàng ố. Ân oán khép lại, không bởi chính nghĩa, mà bởi thời gian.`,
 o:c=>[
  {l:'Kể lại cho con cháu nghe, để chúng biết nhà mình đã sống thế nào',f:c=>`Buổi tối, ${N(c)} ngồi quây quần cùng bọn trẻ, kể cả những điều khó nói. Chúng im lặng nghe, có đứa hỏi: "Sao ông không đánh lại?" ${N(c)} chỉ mỉm cười.`+fx(c,{fame:3,cfame:1,tam:6,eq:1})},
  {l:'Lặng lẽ cất các giấy tờ vào rương, không nhắc lại',f:c=>`Một chiếc rương gỗ đóng nắp. Chuyện cũ xin để cho người sau tự phán xét.`+fx(c,{tam:3})}]})
];
});
