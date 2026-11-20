/* Bách Niên Thế Gia v6.7.0-d9.5 · Kỳ ngộ gia tộc (bản thêm): năm kỳ ngộ đến với cả nhà (u:'clan'), mỗi kỳ ngộ có chu kỳ riêng, chỉ gặp được ở nhà có gia thế vừa phải trở lên. */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const FM=v=>G.fmtMoney(v);const N=c=>esc(c.given);
const V=o=>Object.assign({k:'Kỳ ngộ',ky:1,good:1,u:'clan',pcd:200,w:1,head:1,age:[28,80],tier:[1,6],tags:{}},o);
return [
V({id:'kn_gia_pha_co',cyc:[25,45],t:'Cuốn gia phả cổ',tier:[2,6],
 x:c=>`Dọn nhà thờ, người nhà tìm thấy một cuốn gia phả cổ cất trong hộp gỗ, ghi tên tám đời tổ tiên của họ ${esc(S().surname)}. Chữ cũ mờ, nhưng đọc được nhiều chuyện chưa từng nghe.`,
 o:c=>[{l:'Cho chép lại, giữ bản gốc ở nhà thờ',c:()=>G.money()>=m(2),f:c=>'Cả họ xúm vào chép, người già kể thêm. Con cháu biết rõ cội nguồn hơn.'+fx(c,{money:-m(2),fame:8,tam:5,hung:1})},
  {l:'Đọc cho cả họ nghe trong ngày giỗ tổ',f:c=>'Người trong họ thêm gắn bó. Có người bật khóc khi nghe tên ông cố.'+fx(c,{fame:3,tam:6})},
  {l:'Cất kỹ, không khoe',f:c=>''}]}),
V({id:'kn_ho_hang_xa',cyc:[20,40],t:'Họ hàng xa tìm về',tier:[1,6],
 x:c=>`Một người tự xưng là cháu họ xa của ${N(c)} từ đất khác tìm về, mang theo gia đình nhỏ, đói và mệt. Gia phả có tên, nhưng chưa ai nhớ mặt.`,
 o:c=>[{l:'Nhận làm họ hàng, giúp dựng nhà nhỏ',c:()=>G.money()>=m(5),r:[{eq:1,duyen:0.5},65],y:c=>'Người ấy làm lụng chăm chỉ, về sau thành chỗ dựa của nhà.'+fx(c,{money:-m(5),fame:6,on:2,tam:4}),n:c=>'Giúp xong thì người ấy dần lười, mang tiếng cho nhà.'+fx(c,{money:-m(5),fame:-2,tam:-3})},
  {l:'Cho ở nhờ vài tháng rồi tiễn',f:c=>'Không ai oán, cũng không ai nhớ.'+fx(c,{money:-m(1),tam:1})},
  {l:'Không nhận, cho ít tiền đường',f:c=>'Người ấy cúi chào rồi đi.'+fx(c,{money:-m(0.5),fame:-2})}]}),
V({id:'kn_gieng_co',cyc:[30,55],t:'Giếng cũ dưới gốc đa',tier:[1,5],
 x:c=>`Đào lại cái giếng cũ sau vườn, thợ đụng phải một chiếc hũ sành bịt kín. Mở ra, bên trong là bạc nén và vài món đồ cổ, không rõ của tổ tiên hay của ai bỏ lại.`,
 o:c=>[{l:'Báo quan, xin giữ phần chủ đất',r:[{eq:0.8,khau:0.6},60],y:c=>'Quan xét thấy vô chủ, chia cho nhà một nửa. Tiếng ngay thẳng lan ra.'+fx(c,{money:m(10),fame:8,tam:5}),n:c=>'Quan thu hết, chỉ thưởng suông.'+fx(c,{money:m(1),fame:4})},
  {l:'Lặng lẽ giữ lấy',r:[{khau:1,duyen:0.4},50],y:c=>'Không ai biết. Nhà khá lên thấy rõ.'+fx(c,{money:m(18),fame:-1,liem:-3}),n:c=>'Thợ đào lỡ miệng, cả làng đồn. Quan sai tới hỏi.'+fx(c,{money:m(4),fame:-8,tam:-6})},
  {l:'Lấp lại, coi như không thấy',f:c=>'Người ta bảo nhà này lạ đời.'+fx(c,{tam:2})}]}),
V({id:'kn_thay_tuong',cyc:[22,45],t:'Thầy tướng xem cả nhà',
 x:c=>`Một thầy tướng lưu lạc ghé xin bữa cơm, thấy cả nhà ${N(c)} đứng cạnh nhau thì chép miệng, nói muốn xem tướng miễn phí cho từng người.`,
 o:c=>[{l:'Mời xem hết cả nhà, cho tiền biếu',c:()=>G.money()>=m(1.5),r:[{duyen:1},55],y:c=>'Ông nói những điều khiến cả nhà bàn mãi. Vài lời ứng nghiệm dần về sau.'+fx(c,{money:-m(1.5),hung:2,tam:6}),n:c=>'Ông nói vài điều không hay. Cả nhà nghe xong thấy nặng lòng.'+fx(c,{money:-m(1.5),tam:-5})},
  {l:'Cho cơm rồi tiễn, không xem',f:c=>'Ông cười, cảm ơn.'+fx(c,{tam:1})},
  {l:'Đuổi đi, bảo không tin chuyện nhảm',f:c=>'Ông lắc đầu bỏ đi.'+fx(c,{tam:-1})}]}),
V({id:'kn_dong_ho_cu',cyc:[28,50],t:'Chi họ cũ đến nhận tổ',tier:[2,6],
 x:c=>`Một chi họ cùng gốc nhưng lưu lạc từ mấy đời trước đem lễ về nhận tổ. Họ nghe tiếng ${esc(S().surname)} ngày càng lớn nên muốn nối lại, cũng có người nói họ chỉ mượn danh.`,
 o:c=>[{l:'Mở tiệc nhận họ, ghi vào gia phả',c:()=>G.money()>=m(4),r:[{eq:1,tri:0.4},62],y:c=>'Hai chi nối lại hương khói. Về sau có việc, nhà có thêm người đỡ đần.'+fx(c,{money:-m(4),fame:10,on:2,tam:5}),n:c=>'Nhận rồi mới biết họ chỉ muốn nhờ vả. Tiếng không hay.'+fx(c,{money:-m(4),fame:-3,tam:-4})},
  {l:'Tiếp lễ nhưng chưa nhận, chờ xem',f:c=>'Hai bên giữ lễ, không quá thân cũng không lạnh.'+fx(c,{fame:2})},
  {l:'Từ chối thẳng',f:c=>'Họ ra về, tiếng nặng nhẹ khó nói.'+fx(c,{fame:-3,tam:-2})}]})
]});
