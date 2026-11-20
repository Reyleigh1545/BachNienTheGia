/* Bách Niên Thế Gia v6.7.0-d9.5 · Thế lực tự phát (bản đầu): ba điểm nóng của hạt giống thế giới (S.wr.hot) có độ nóng S.wr.heat, tăng dần mỗi năm (tlYear trong engine).
   Từ 60 trở lên thì loạn thiên hạ (dyn.loan) tăng theo, mở đường Biên vương (T5) và Khởi nghĩa (T3). Bốn sự kiện đưa việc này tới nhà chơi. */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const N=c=>esc(c.given);
const heatMax=()=>{const w=S().wr;if(!w||!w.hot||!w.heat)return 0;return Math.max(0,...w.hot.map(p=>w.heat[p]||0))};
const hotP=()=>{const w=S().wr;if(!w||!w.hot||!w.heat)return null;let b=null,v=-1;w.hot.forEach(p=>{if((w.heat[p]||0)>v){v=w.heat[p]||0;b=p}});return b};
const hotN=()=>{const p=hotP();return p&&G.provN?G.provN(p):'vùng giáp ranh'};
const cool=(n)=>{const w=S().wr,p=hotP();if(w&&p)w.heat[p]=Math.max(0,(w.heat[p]||0)-n)};
const warm=(n)=>{const w=S().wr,p=hotP();if(w&&p)w.heat[p]=Math.min(100,(w.heat[p]||0)+n)};
const TL=o=>Object.assign({tags:{},k:'Thế lực tự phát',age:[20,75],pcd:72,cd:36,w:1,ms:1,head:1},o);
const L=[
TL({id:'tl_hoi_kin',t:'Hội kín chiêu người',c:()=>heatMax()>=30,
 x:c=>`Ở ${esc(hotN())}, một hội kín mượn danh "cứu khổ" đang chiêu người. Dân nghèo kéo theo, kẻ bất mãn kéo theo, quan huyện bắt chẳng hết. Có người nhà ${N(c)} nghe nói và đem chuyện về bàn.`,
 o:c=>[{l:'Báo cho quan huyện',f:c=>{cool(6);return 'Quan huyện ghi công, cho người điều tra. Hội kín tạm rút sâu.'+fx(c,{fame:4,tam:-1})}},
  {l:'Âm thầm biếu một ít lương, giữ thế đôi bên',c:()=>G.money()>=m(5),f:c=>{warm(4);return 'Không ai ghi tên, nhưng cũng chẳng ai quên.'+fx(c,{money:-m(5),fame:-2,tam:-2})}},
  {l:'Mặc kệ, không dính vào',f:c=>{warm(2);return 'Nhà mình lo việc nhà, chuyện xa để người ta lo.'+fx(c,{tam:1})}}]}),
TL({id:'tl_thu_linh_moi',t:'Thủ lĩnh gửi thư mời',c:c=>heatMax()>=50&&c.vo>=70,age:[22,50],once:1,
 x:c=>`Một thủ lĩnh ở ${esc(hotN())}, vốn từng là lính, nghe tiếng ${N(c)} nên gửi thư: đã đến lúc dân đói không còn phải chịu cảnh này, mời về giúp một tay luyện quân. Thư viết khéo, không nói đến chuyện làm loạn.`,
 o:c=>[{l:'Từ chối, trả thư lại',f:c=>{return 'Thư trả đi, không giận không oán. Nhưng người ta nhớ mặt nhà mình.'+fx(c,{tam:-1})}},
  {l:'Báo quan để lập công',r:[{khau:1,eq:0.6},62],y:c=>{cool(12);c.cong=(c.cong||0)+40;return 'Quan phủ khen nhà mình biết điều, thưởng tiền và ghi công.'+fx(c,{fame:8,money:m(6),tam:3})},n:c=>{warm(5);return 'Báo quan mà quan nghi lại nhà mình có quan hệ với giặc.'+fx(c,{fame:-5,tam:-6})}},
  {l:'Nhận lời, đến xem thực hư',r:[{vo:1,gan:0.5},50],y:c=>{warm(10);return 'Trại rộng, quân đông, ai cũng đói nhưng hăng. Nhà mình lưu lại vài ngày, ra về mang theo nhiều ý nghĩ.'+fx(c,{vo:2,tam:4,fame:-3})},n:c=>{warm(6);return 'Mới đến đã bị quan binh vây. Chạy thoát được mà mang tiếng.'+fx(c,{suc:-6,fame:-8,tam:-8})}}]}),
TL({id:'tl_ty_nan',t:'Dân chạy loạn đến nhờ',c:()=>heatMax()>=55,pcd:96,
 x:c=>`Từ ${esc(hotN())}, từng đoàn dân chạy loạn kéo về làng của ${N(c)}, bồng bế nhau, đói và sợ. Họ xin nhờ một chỗ ngủ, một bữa cháo.`,
 o:c=>[{l:'Mở kho thóc, nấu cháo mấy ngày',c:()=>G.money()>=m(8),f:c=>{return 'Cả làng khen. Nhiều người nhớ ơn nhà mình rất lâu.'+fx(c,{money:-m(8),fame:10,tam:5,cfame:6})}},
  {l:'Cho nghỉ một đêm rồi nhờ làng khác',f:c=>'Không ai trách, cũng không ai nhớ.'+fx(c,{fame:1})},
  {l:'Đóng cổng làng, không tiếp',f:c=>'Tiếng đồn lan ra, người ta nói nhà mình lạnh.'+fx(c,{fame:-6,tam:-3})}]}),
TL({id:'tl_dep_loan',t:'Lệnh dẹp loạn',job:['quan_ngu'],c:c=>heatMax()>=70&&c.lv>=3,pcd:96,age:[25,60],
 x:c=>`Tin cấp từ ${esc(hotN())}: giặc cỏ chiếm thêm một huyện. Triều đình hạ lệnh cho các tướng tại chỗ đem quân dẹp loạn. ${N(c)} nằm trong danh sách.`,
 o:c=>[{l:'Đem quân đánh thẳng',r:[{vo:1.2,tri:0.6,eq:0.3},52],y:c=>{cool(25);c.cong=(c.cong||0)+80;return 'Phá được thế giặc, bắt thủ lĩnh. Triều đình ghi công.'+fx(c,{fame:14,vo:2,tam:5})},n:c=>{warm(8);return 'Mắc phục, tổn thất nặng. Giặc càng hung.'+fx(c,{suc:-10,fame:-8,tam:-8})}},
  {l:'Chiêu an, chia ruộng cho dân hàng',r:[{eq:1.2,tri:0.6},50],y:c=>{cool(30);c.cong=(c.cong||0)+60;return 'Hàng nghìn người buông giáo. Việc khó mà êm.'+fx(c,{fame:18,eq:1,tam:6})},n:c=>{warm(4);return 'Chiêu an không thành, giặc nhân dịp củng cố.'+fx(c,{fame:-4,tam:-5})}},
  {l:'Xin hoãn, báo thiếu quân',f:c=>{warm(5);return 'Triều đình ghi nhớ.'+fx(c,{fame:-6,tam:-3})}}]})
];
return L});
