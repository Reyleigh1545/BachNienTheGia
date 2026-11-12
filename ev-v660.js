/* Bách Niên Thế Gia v6.6.0 · đối thủ và chuyện gia sản lớn
   rv_*: họ lớn, quan lại, kẻ ganh ghét nhòm ngó khi gia tộc thuộc hàng khá giả trở lên. Do rivalTick (engine.js) gọi mỗi năm một lần.
   wl_*: chuyện của nhà nhiều tiền: thuế nặng, người xin hùn vốn, dân xin giúp. Mọi khoản tiền tính theo phần quỹ (các id rv_ và wl_ thuộc nhóm chi theo cỡ nhà).
   Mọi lựa chọn có giá đều ghi giá trong nhãn. */
window.EVF.push(G=>{
const {fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const FM=v=>G.fmtMoney(v);const RV=G.qt.rv;
const N=c=>esc(c.given);const KR='Thế cờ',KW='Gia sản';
const hasOff=()=>G.alive().some(p=>G.inClan(p)&&p.job==='quan'&&p.lv>=3);
const pay=(l,v,o)=>Object.assign({l:`${l} (${FM(m(v))})`,c:()=>G.money()>=m(v)},o);
return [
{id:'rv_thon_tinh',t:'Họ lớn nhòm ngó ruộng đất',k:KR,fixed:1,
 x:c=>`Một họ lớn trong vùng sai người đến, nói ruộng nhà ${N(c)} nằm sát đất họ, xin nhường lại với giá rẻ. Ai cũng hiểu: không nhường thì sẽ có chuyện.`,
 o:c=>[
  pay('Kiện lên quan',90,{r:[{tri:0.5,khau:0.7},55],y:c=>'Quan xử cho nhà thắng, họ lớn mất mặt.'+fx(c,{money:-m(90),cfame:6}),n:c=>{RV.add(1);return 'Thua kiện, mất thêm án phí, họ lớn càng hằn học.'+fx(c,{money:-m(130),cfame:-4})}}),
  {l:'Nhường một phần ruộng',f:c=>{const f=S().farm;if(f.own>0){f.own=Math.max(0,f.own-1);return 'Nhường một phần ruộng cho yên chuyện.'+fx(c,{cfame:-3,tam:-4})}return 'Không còn ruộng riêng để nhường, đành bù bằng tiền.'+fx(c,{money:-m(60),tam:-3})}},
  pay('Dâng lễ để họ lớn bỏ ý định',60,{f:c=>{RV.add(-0.5);return 'Họ lớn nhận lễ, tạm thôi nhắc chuyện ruộng.'+fx(c,{money:-m(60)})}})]},
{id:'rv_to_cao',t:'Bị tố trốn thuế',k:KR,fixed:1,
 x:c=>`Có người làm đơn tố nhà ${N(c)} khai thiếu ruộng, thiếu cơ sở để trốn thuế. Quan sở tại cử người xuống tra sổ.`,
 o:c=>{const o=[pay('Nộp bù và chịu phạt',120,{f:c=>'Nộp đủ, vụ việc khép lại.'+fx(c,{money:-m(120),cfame:-2})})];
  if(hasOff())o.push({l:'Nhờ người làm quan trong họ lo liệu',r:[{khau:0.6,eq:0.6},60],y:c=>'Vụ việc được dàn xếp êm thấm.'+fx(c,{money:-m(30),fame:2}),n:c=>'Người trên không giúp, còn mang tiếng nhờ vả.'+fx(c,{money:-m(200),cfame:-6})});
  o.push({l:'Cãi lý trước quan',r:[{khau:0.8,tri:0.6},45],y:c=>'Giấy tờ rành mạch, kẻ tố bị khiển trách.'+fx(c,{cfame:8,fame:5}),n:c=>{RV.add(0.5);return 'Cãi không nổi, bị phạt nặng.'+fx(c,{money:-m(220),cfame:-8})}});return o}},
{id:'rv_cai_nguoi',t:'Có kẻ cài người vào cơ sở',k:KR,fixed:1,
 x:c=>`Người làm lâu năm báo có mấy người mới vào cơ sở của nhà ${N(c)} hành tung đáng ngờ, hàng hóa hao hụt, khách quen bỏ đi. Nghe nói có kẻ muốn phá để nhà mất chỗ làm ăn.`,
 o:c=>[
  {l:'Điều tra những người mới tuyển',r:[{muu:0.8,tri:0.5},55],y:c=>'Tìm ra kẻ được thuê phá, đuổi đi, cơ sở yên lại.'+fx(c,{cfame:4}),n:c=>'Không tìm được bằng chứng, thiệt hại đã xảy ra.'+fx(c,{money:-m(80)})},
  pay('Thay toàn bộ người làm mới',70,{f:c=>'Thay hết người, tốn kém nhưng yên tâm.'+fx(c,{money:-m(70)})}),
  {l:'Mặc kệ',f:c=>{RV.add(1);return 'Để mặc, thiệt hại cứ lớn dần.'+fx(c,{money:-m(110)})}}]},
{id:'rv_lien_hon',t:'Họ lớn ngỏ ý kết thông gia',k:KR,fixed:1,
 x:c=>`Một họ lớn trong vùng cho người sang ngỏ ý kết thông gia với nhà ${N(c)}. Nhận lời thì được chỗ dựa, nhưng sính lễ không nhỏ. Từ chối thì có thể mất lòng.`,
 o:c=>[
  pay('Nhận lời, sính lễ hậu',100,{f:c=>{RV.add(-1);return 'Hai họ thân thiết hơn, người đời nể nhà thêm.'+fx(c,{money:-m(100),cfame:10})}}),
  {l:'Khéo từ chối',f:c=>{RV.add(1.2);return 'Họ lớn giữ phép, nhưng ai cũng thấy họ không vui.'+fx(c,{cfame:-2})}},
  {l:'Hứa hẹn mập mờ',r:[{eq:0.8,khau:0.5},50],y:c=>'Hai bên giữ được thể diện, chưa ai buộc ai.'+fx(c,{cfame:3}),n:c=>{RV.add(1.5);return 'Họ lớn nhận ra là câu giờ, càng khó chịu.'}}]},
{id:'rv_che_gieu',t:'Lời gièm pha dâng lên triều',k:KR,fixed:1,
 x:c=>`Có kẻ ghen ghét dâng sớ nói họ nhà ${N(c)} giàu quá mức, nuôi nhiều người, có ý riêng. Tin này đã đến tai quan trên.`,
 o:c=>[
  pay('Dâng lễ cho quan trên',100,{f:c=>{RV.add(-0.5);return 'Quan trên nhận lễ, bỏ qua lời gièm.'+fx(c,{money:-m(100)})}}),
  {l:'Tự dâng sớ biện bạch',r:[{khau:0.7,tri:0.6},50],y:c=>'Lời lẽ rõ ràng, nhà được yên.'+fx(c,{cfame:6,fame:4}),n:c=>{RV.add(1);return 'Sớ biện bạch bị cho là chống chế.'+fx(c,{cfame:-8})}},
  {l:'Nín chịu',f:c=>'Chờ cho tin lắng xuống.'+fx(c,{cfame:-5})}]},
{id:'wl_thue_nang',t:'Quan sở tại đòi thêm thuế',k:KW,fixed:1,
 x:c=>`Quan sở tại biết nhà ${N(c)} khá giả nên ra thêm một khoản thuế "đóng góp việc công". Khoản này không có trong sổ.`,
 o:c=>[
  pay('Nộp đủ',140,{f:c=>'Nộp đủ cho yên chuyện.'+fx(c,{money:-m(140)})}),
  {l:'Xin khất',r:[{eq:0.7,khau:0.6},50],y:c=>'Quan châm chước, chỉ lấy một nửa.'+fx(c,{money:-m(70)}),n:c=>'Bị quở là chây ì, phải nộp thêm.'+fx(c,{money:-m(200),cfame:-3})},
  pay('Lót tay cho thư lại',90,{f:c=>'Thư lại nhận tiền, khoản thuế được ghi nhỏ đi.'+fx(c,{money:-m(90)})})]},
{id:'wl_phu_ho',t:'Người rủ hùn vốn làm ăn lớn',k:KW,fixed:1,
 x:c=>`Một thương nhân lạ đến rủ nhà ${N(c)} hùn vốn vào một mối làm ăn lớn. Hắn nói chắc chắn có lãi, nhưng chưa ai kiểm chứng được.`,
 o:c=>[
  pay('Hùn vốn lớn',150,{r:[{tri:0.7,eq:0.4},45],y:c=>'Mối làm ăn thành, tiền về đầy kho.'+fx(c,{money:m(150),cfame:3}),n:c=>'Bị lừa mất vốn.'+fx(c,{money:-m(150),cfame:-2})}),
  pay('Hùn nửa vốn',75,{r:[{tri:0.7,eq:0.4},60],y:c=>'Lãi ít nhưng chắc.'+fx(c,{money:m(70)}),n:c=>'Mất nửa vốn, may còn nửa.'+fx(c,{money:-m(75)})}),
  {l:'Từ chối',f:c=>'Không ham món lợi lạ.'}]},
{id:'wl_dan_xin',t:'Dân làng xin giúp lúc đói',k:KW,fixed:1,
 x:c=>`Mùa này đói kém, dân quanh vùng kéo đến cửa nhà ${N(c)} xin giúp. Nhà có của, ai cũng biết.`,
 o:c=>[
  pay('Mở kho phát gạo',120,{f:c=>'Dân làng cảm kích, tiếng nhân đức lan xa.'+fx(c,{money:-m(120),cfame:10,fame:4})}),
  pay('Giúp một ít',50,{f:c=>'Giúp được phần nào, dân vẫn đói nhưng nhớ ơn.'+fx(c,{money:-m(50),cfame:3})}),
  {l:'Làm ngơ',f:c=>'Đóng cổng, mặc người ngoài kêu.'+fx(c,{cfame:-5})}]}
];
});
