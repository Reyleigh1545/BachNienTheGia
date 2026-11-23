/* Bách Niên Thế Gia v6.7.0-d9.5 · Quân hộ và Đông xưởng (bản mở rộng đầu): nối tiếp hai sự kiện đơn lẻ có từ trước (cd_19 Giấy gọi nhập quân hộ, cd_12 Cầu cạnh Đông xưởng).
   Quân hộ: chỉ ra cho nhà đã nhận giấy cd_19 (c.seen). Đông xưởng: chỉ ra cho quan từ lv4 đã gặp cd_12. */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const N=c=>esc(c.given);
const rich=v=>()=>G.money()>=m(v);
const pay=(l,v,o)=>Object.assign({l:`${l} (${G.fmtMoney(m(v))})`,c:rich(v)},o);
const QH=o=>Object.assign({tags:{},k:'Quân hộ',head:1,age:[25,70],tier:[0,3],ms:1,w:0.7,pcd:96,cd:48,c:c=>!!(c.seen&&c.seen['cd_19'])},o);
const QHFLT=p=>G.age(p)>=18&&G.age(p)<=40&&p.g==='nam'&&p.job!=='quan_ngu'&&p.job!=='quan'&&!p.biz; /* d9.10: ai phải đi lính theo quân hộ */
const DX=o=>Object.assign({tags:{},k:'Đông xưởng',job:['quan'],age:[32,75],ms:1,w:0.6,pcd:96,cd:48},o);
return [
QH({id:'qh_phien_linh',t:'Đến phiên người nhà nhập ngũ',
 x:c=>`Sổ quân hộ ghi tên nhà ${N(c)}: đến phiên lấy một người nhập ngũ thay người cũ đã già. Lý trưởng đứng ngoài sân, tay cầm tờ giấy gọi, nói ai cũng phải đi một lần.`,
 o:c=>{const q=()=>S().qh||{};const done=(per)=>{const x=S().qh;if(x){x.pend=false;x.next=S().t+per}};return [{l:'Cử một người trong nhà đi',c:c=>G.kinList(c,QHFLT).length>0,go:(c,d)=>G.pickKin(c,{eyebrow:'Quân hộ',title:'Cử ai nhập ngũ',text:'Người được cử phải rời nhà ra doanh trại, tới khi hết hạn hoặc đến phiên người khác. Lệ quân hộ đời nào cũng phải có người. Chọn người nào?',filter:QHFLT,cb:w=>{G.enlist(w,false);const x=S().qh;if(x){x.who=w.id;x.t0=S().t}done(R(240,300));return `${esc(w.given)} thu xếp hành lý, mẹ ${w.g==='nam'?'nó':'cô'} khóc suốt đêm. Làng nể nhà biết giữ lệ.`+G.fx(c,{tam:-4,fame:2})+G.fx(w,{tam:-6})}})},
  pay('Thuê người thay thế',30,{f:c=>{done(R(120,180));return 'Một người nghèo trong làng nhận đi thay, giấy tờ đủ. Nhà khỏi mất người, nhưng phiên sau sẽ đến sớm hơn.'+fx(c,{money:-m(30),fame:-1})}}),
  {l:'Cho người nhà trốn đi nơi khác',r:[{muu:0.8,khau:0.6},45],y:c=>{done(R(180,240));return 'Trốn thoát, tên bị gạch khỏi sổ vì "mất tích". Từ đó khó về quê cũ.'+fx(c,{fame:-4,tam:-3})},n:c=>{done(R(60,120));return 'Bị bắt giữa đường, phạt đòn và nhà bị ghi tội trốn quân dịch.'+fx(c,{money:-m(15),fame:-8,suc:-4})}}]}}),
QH({id:'qh_chuoc_so',t:'Xin xóa tên khỏi quân hộ',tier:[1,4],w:0.5,
 x:c=>`Nhà ${N(c)} đã khá giả, người ta bảo giờ có thể lo lót để xin xóa tên khỏi sổ quân hộ, khỏi phải mỗi đời đưa một người. Nhưng quan lại sẽ không làm không công.`,
 o:c=>[pay('Lo lót bộ Binh xóa tên',120,{r:[{khau:1,eq:0.5},55],y:c=>'Tên được gạch khỏi sổ. Từ nay con cháu không bị gọi nhập ngũ theo kiểu cũ.'+fx(c,{money:-m(120),fame:4,tam:6}),n:c=>'Lễ nhận rồi mà sổ vẫn còn tên nhà. Mất oan.'+fx(c,{money:-m(120),tam:-6,fame:-2})}),
  {l:'Dâng đơn xin theo đúng thủ tục',r:[{tri:1,khau:0.5},35],y:c=>'Hồ sơ được xét, tên nhà được gạch.'+fx(c,{fame:5,tam:5}),n:c=>'Đơn bị gác lại, không lời hồi âm.'+fx(c,{tam:-2})},
  {l:'Giữ nguyên, chấp nhận lệ quân hộ',f:c=>'Nhà quen dần với lệ ấy.'+fx(c,{tam:1})}]}),
QH({id:'qh_nguoi_linh_ve',t:'Người nhà trong quân hộ về thăm',
 x:c=>`Người con nhà ${N(c)} nhập ngũ theo quân hộ mấy năm nay lần đầu được về thăm. Người rám nắng, đầy sẹo, kể chuyện trong doanh toàn lính nghèo như nó.`,
 o:c=>[{l:'Cho nghỉ lâu, nấu bữa cơm ngon',f:c=>'Cả nhà vui. Nó đi mang theo túi lương và vài lời dặn.'+fx(c,{money:-m(2),tam:6})},
  {l:'Nhờ nó dò đường xin thăng chức',r:[{eq:0.8,khau:0.5},40],y:c=>'Nó nói giúp được với một viên đội trưởng quen. Có triển vọng.'+fx(c,{fame:3,tam:2}),n:c=>'Nó xấu hổ không dám mở lời với cấp trên.'+fx(c,{tam:-2})}]}),
DX({id:'dx_theo_doi',t:'Có người dõi theo',c:c=>c.lv>=4&&!!(c.seen&&c.seen['cd_12']),
 x:c=>`Mấy tháng nay ${N(c)} thấy có người lạ đứng ngoài cổng phủ, đi theo ra tận chợ. Một người quen nhỏ giọng bảo đó là người của Đông xưởng, họ ghi chép từng người khách đến nhà quan.`,
 o:c=>[{l:'Hạn chế khách, sống kín đáo',f:c=>'Nhà vắng bớt người tới lui. Tiếng tăm lặng đi nhưng yên thân.'+fx(c,{risk:-3,fame:-2,tam:-2})},
  pay('Biếu một món lễ cho tay chân Đông xưởng',50,{f:c=>'Người lạ biến mất. Nhưng tên mình giờ có trong sổ riêng của họ.'+fx(c,{money:-m(50),risk:2,liem:-3})}),
  {l:'Cứ sống như thường, không có gì phải sợ',r:[{eq:0.6,gan:0.8},50],y:c=>'Họ ghi chép chán rồi bỏ. Hóa ra không có gì để nắm.'+fx(c,{risk:-2,fame:2}),n:c=>'Một câu nói bông đùa của khách bị ghi lại, thành chuyện lôi thôi.'+fx(c,{risk:6,tam:-4})}]}),
DX({id:'dx_nho_viec',t:'Hoạn quan nhờ một việc',c:c=>c.lv>=5&&!!(c.seen&&c.seen['cd_12']),
 x:c=>`Hoạn quan năm xưa nay lại tìm tới ${N(c)}. Lần này không bóng gió nữa: cần một bản tấu được duyệt nhanh, và một tên quan cùng nha môn bị để ý. Đổi lại có thể giúp đường thăng tiến.`,
 o:c=>[{l:'Giúp, ký vào bản tấu',f:c=>'Bản tấu qua nhanh. Đối thủ của họ ngã ngựa chỉ một tháng sau. Mình ghi một món nợ lớn.'+fx(c,{fav:8,risk:6,liem:-5,fame:-3})},
  {l:'Từ chối, nói còn phải xem xét',r:[{eq:1,khau:0.6},50],y:c=>'Hoạn quan nhún vai. Họ tìm người khác, chuyện không đến mức thù.'+fx(c,{risk:1,tam:1}),n:c=>'Họ ghi nhớ lời từ chối, sau này có việc lại nhắc.'+fx(c,{risk:5,fav:-3})},
  {l:'Báo lên quan trên',r:[{gan:1,tri:0.6},35],y:c=>'Quan trên giật mình, ghi công. Nhưng Đông xưởng ghi hận.'+fx(c,{fame:10,risk:8,fav:4}),n:c=>'Quan trên làm lơ, còn mình lộ.'+fx(c,{risk:10,fame:-4})}]}),
DX({id:'dx_bi_to',t:'Bị Đông xưởng tố cáo',c:c=>c.lv>=4&&!!(c.seen&&(c.seen['dx_theo_doi']||c.seen['dx_nho_viec'])),pcd:200,w:0.4,
 x:c=>`Một bản tố cáo từ Đông xưởng đến tay triều đình: ${N(c)} bị nghi nhận lễ vật của người ngoài và bàn chuyện với kẻ bị bắt. Chưa thành án, nhưng cả nha môn đang xì xào.`,
 o:c=>[pay('Mang lễ tới nhờ thầy cũ can thiệp',80,{r:[{khau:1,eq:0.6},55],y:c=>'Thầy cũ nói giúp, vụ việc xuống cấp thành lời nhắc nhở.'+fx(c,{money:-m(80),risk:-4,tam:-2}),n:c=>'Thầy cũ từ chối ra mặt. Lễ mất, tiếng thêm xấu.'+fx(c,{money:-m(80),risk:4,fame:-4})}),
  {l:'Dâng sớ tự trình, xin điều tra công khai',r:[{tri:1,gan:0.8},50],y:c=>'Điều tra xong không có chứng cứ. Người ngay thẳng được tiếng.'+fx(c,{fame:8,risk:-5,tam:4}),n:c=>'Điều tra kéo dài, bị giáng một bậc trong lúc chờ.'+fx(c,{risk:5,tam:-6,fame:-3})},
  {l:'Xin nghỉ bệnh, tránh gió',f:c=>'Thời gian trôi qua, chuyện nguội. Nhưng nhiều người ngờ có chuyện thật.'+fx(c,{risk:2,fame:-3,tam:-2})}]})
]});
