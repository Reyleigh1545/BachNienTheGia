/* Bách Niên Thế Gia v6.4 · quan trường theo ghế, quan võ, nhà vua
   Sự kiện chia theo loại việc của chức (ptag), theo việc có đi nhậm chức xa không (c.pst), theo chức võ (c.seat), theo triều đại (S.dyn). */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc,age}=G;
const S=()=>G.S();
const m=v=>G.mm(v);
const N=c=>esc(c.given);
const Q=['quan'],QN=['quan_ngu'];
const CTX=G._v62.CTX;
const seat=c=>{const k=G.seatOfC(c);return k?G.seatName(k):'nhiệm sở'};
const place=c=>c.pst?G.provN(c.pst.p):'nhiệm sở';
const posted=c=>c.job==='quan'&&!!c.pst;
const withFam=c=>c.job==='quan'&&!!c.pst&&c.pst.fam>0;
const alone=c=>c.job==='quan'&&!!c.pst&&c.pst.fam===0;
const milSeat=c=>c.job==='quan_ngu'&&!!c.seat;
const emp=()=>(S().dyn&&S().dyn.emp)||'Hoàng đế';
const spOf=c=>{const s=G.P(c.spouse);return s&&s.dead==null?s:null};
const ev=[
/* ================= QUAN VĂN THEO CHỨC ================= */
{id:'v64_dan_kien_quan_tren',t:'Dân kiện quan trên',job:Q,ptag:['dan','an'],k:'Quan trường',
 x:c=>`Một lão nông ôm đơn đến nha môn ${esc(seat(c))}, kêu quan trên cho thu thuế quá tay. ${N(c)} đọc đơn thấy có lý, nhưng người bị kiện lại là thượng quan trực tiếp.`,
 o:c=>[{l:'Nhận đơn, bí mật dò xét',r:[{tri:1,eq:0.6},58],y:c=>'Có đủ bằng chứng, thượng quan phải sửa lại sổ thuế.'+fx(c,{fame:R(10,18),liem:3}),n:c=>'Thượng quan biết chuyện, ghét ra mặt.'+fx(c,{tam:-6,fame:-4})},
  {l:'Khuyên lão về, hứa lo liệu',f:c=>'Lão nông thất vọng, nhưng không ai trách được ngài.'+fx(c,{liem:-2,tam:-2})},
  {l:'Chuyển đơn lên Đô sát viện',f:c=>chance(0.5)?'Đô sát viện cử người về xem xét, tiếng ngài nổi lên.'+fx(c,{fame:12,eq:1}):'Đơn chìm vào đống hồ sơ.'+fx(c,{fame:2})}]},
{id:'v64_thu_lai_boi_gia',t:'Thư lại đội giá thuế',job:Q,ptag:['thue','dan'],k:'Quan trường',
 x:c=>`Sổ thuế ở ${esc(seat(c))} có chỗ lạ: vài thư lại cùng ghi số thu thấp đi, chênh lệch rơi vào túi riêng. ${N(c)} nhìn là hiểu.`,
 o:c=>[{l:'Cho điều tra, trị tội',r:[{tri:1,eq:0.7},55],y:c=>'Bắt được cả đường dây, ngân khố thu về một khoản.'+fx(c,{fame:R(8,15),liem:4,money:m(R(3,10))}),n:c=>'Thư lại cùng nhau cáo bệnh nghỉ việc, công việc đình trệ.'+fx(c,{tam:-6,fame:-4})},
  {l:'Làm ngơ, đòi chia phần',f:c=>'Thư lại cười toe, từ nay biết điều hơn.'+fx(c,{money:m(R(5,15)),liem:-8})},
  {l:'Răn đe, bắt nộp bù không truy cứu',f:c=>'Số tiền nộp lại đủ, mọi người yên.'+fx(c,{money:m(R(2,6)),eq:1})}]},
{id:'v64_bo_lai_loi_lot',t:'Đồng liêu rủ lo lót bộ Lại',job:Q,ptag:['kinh'],k:'Quan trường',
 x:c=>`Đồng liêu ở ${esc(seat(c))} rủ ${N(c)} góp tiền biếu một vị lang trung bộ Lại, để kỳ khảo công tới được chấm hạng cao. Ai cũng góp cả, chỉ còn chờ ngài gật đầu.`,
 o:c=>[{l:`Góp phần (${G.fmtMoney(m(8))})`,c:()=>G.money()>=m(8),f:c=>{G.S().money-=m(8);return 'Kỳ khảo công đó được xếp hạng thượng.'+fx(c,{liem:-6,fame:4,m:2})}},
  {l:'Từ chối, giữ sự thanh bạch',f:c=>'Đồng liêu đứng ngoài ngài, nhưng cấp trên ghi nhận.'+fx(c,{liem:3,fame:R(2,6),tam:-2})}]},
{id:'v64_tien_nhiem_no',t:'Quan tiền nhiệm để lại sổ nợ',job:Q,ptag:['dan','thue'],k:'Quan trường',
 x:c=>`Mới nhận chức ở ${esc(seat(c))}, ${N(c)} phát hiện người tiền nhiệm để lại sổ nợ, kho vơi mà giấy tờ vẫn ghi đủ. Nếu cuối kỳ kiểm kho thiếu, người nhận sau phải chịu.`,
 o:c=>[{l:'Tâu thẳng lên, xin kiểm lại kho',r:[{tri:1,eq:0.6,fame:0.2},55],y:c=>'Triều đình truy cứu người trước, ngài thoát tội.'+fx(c,{fame:8,liem:2}),n:c=>'Bị tâu ngược là gây chuyện ngay khi nhậm chức.'+fx(c,{fame:-8,tam:-6})},
  {l:'Âm thầm bù từ tiền nhà',c:()=>G.money()>=m(15),f:c=>{G.S().money-=m(15);return 'Kho đủ, ngài yên tâm làm việc.'+fx(c,{liem:2,tam:-2})}},
  {l:'Giấu đi, lo xoay xở dần',r:[{eq:1,tri:0.5},48],y:c=>'Xoay xở kịp trước kỳ kiểm kho.'+fx(c,{tam:-2,liem:-4}),n:c=>'Kiểm kho thiếu, bị trách phạt.'+fx(c,{money:-m(12),fame:-12})}]},
{id:'v64_thanh_tra_ve',t:'Đoàn thanh tra về địa phương',job:Q,ptag:['giam','dan','an'],k:'Quan trường',rmin:1,
 x:c=>`Đô sát viện cử đoàn ngự sử về xét quan lại vùng ${esc(place(c))}. Cả nha môn nháo nhác. ${N(c)} không biết có ai bị nói xấu mình hay không.`,
 o:c=>[{l:'Mở sổ sách ra cho xem',r:[{liem:1,tri:0.6,eq:0.4},52],y:c=>'Đoàn thanh tra khen sổ sách rõ ràng.'+fx(c,{fame:R(8,14),m:2}),n:c=>'Bị bới ra vài chỗ sai sót nhỏ.'+fx(c,{fame:-6,tam:-4})},
  {l:'Mời tiệc, tặng lễ hậu',c:()=>G.money()>=m(10),f:c=>{G.S().money-=m(10);return 'Đoàn nhận lễ, tâu rằng nơi này yên ổn.'+fx(c,{liem:-6,tam:3})}},
  {l:'Lánh đi công cán chỗ khác',f:c=>'Đoàn đi rồi mới về, không ai trách được.'+fx(c,{tam:-1})}]},
{id:'v64_thuong_quan_xa_hoa',t:'Thượng quan về, đòi tiếp đón xa hoa',job:Q,ptag:['dan','thue'],k:'Quan trường',
 x:c=>`Quan trên về tuần hành vùng ${esc(place(c))}, báo trước sẽ ghé nha môn ${esc(seat(c))}. Ai cũng biết vị này thích ăn ngon, ở rộng.`,
 o:c=>[{l:`Bày tiệc linh đình (${G.fmtMoney(m(10))})`,c:()=>G.money()>=m(10),f:c=>{G.S().money-=m(10);return 'Thượng quan hài lòng, hứa nhắc tên ngài với bộ Lại.'+fx(c,{liem:-3,fame:4,m:2})}},
  {l:'Tiếp đãi giản dị',r:[{eq:1,mi:0.4},55],y:c=>'Thượng quan thấy ngài là người thực tâm.'+fx(c,{fame:R(6,12),liem:3}),n:c=>'Thượng quan phật ý, nói vài lời khó nghe.'+fx(c,{fame:-6,tam:-5})}]},
{id:'v64_giam_khao',t:'Được cử làm giám khảo',job:Q,ptag:['hoc','kinh'],k:'Quan trường',rmin:2,
 x:c=>`Kỳ thi ${pick(['Hương','Hội'])} năm nay, ${N(c)} được cử vào ban giám khảo. Có người nhà sĩ tử lén tìm đến trước ngày vào trường.`,
 o:c=>[{l:'Từ chối gặp, chấm công minh',f:c=>'Tiếng công tâm lan đi.'+fx(c,{fame:R(8,15),liem:4,tri:1})},
  {l:'Nhận lễ, hứa để mắt',f:c=>'Một sĩ tử của người đó đỗ đạt.'+fx(c,{money:m(R(10,25)),liem:-10})+(chance(0.2)?' Có kẻ rỉ tai chuyện này.'+fx(c,{fame:-15}):'')}]},
{id:'v64_an_mang_quyen_quy',t:'Án mạng nhà quyền quý',job:Q,ptag:['an','dan'],k:'Quan trường',rmin:1,
 x:c=>`Một gia nô nhà quyền quý đánh chết người ở địa hạt ${esc(place(c))}. Chủ nhà gửi thiếp, nhắc chuyện "dĩ hòa vi quý".`,
 o:c=>[{l:'Xử đúng luật, bỏ ngoài tai',r:[{tri:1,eq:0.7,fame:0.3},55],y:c=>'Dân chúng truyền tai nhau tên ngài.'+fx(c,{fame:R(15,25),liem:5}),n:c=>'Nhà quyền quý gài người hãm hại, ngài bị khiển trách.'+fx(c,{fame:-8,tam:-8})},
  {l:'Nhận lễ, xử nhẹ',f:c=>'Án hạ thật nhẹ, tiền vào tay ngài.'+fx(c,{money:m(R(15,35)),liem:-12,fame:-5})},
  {l:'Chuyển lên cấp trên',f:c=>'Thượng quan tiếp nhận, ngài khỏi vướng víu.'+fx(c,{tam:-2})}]},
{id:'v64_so_can_gian',t:'Dâng sớ can gián',job:Q,ptag:['kinh','giam'],k:'Quan trường',rmin:2,
 x:c=>`Triều đình sắp ban một chính lệnh mà ${N(c)} cho là hại dân. Nhiều đồng liêu thấy sai nhưng không dám nói.`,
 o:c=>[{l:'Dâng sớ can gián',r:[{tri:1,eq:0.7,fame:0.3},46],y:c=>`${esc(emp())} xem sớ, thu hồi một phần chính lệnh.`+fx(c,{fame:R(18,30),liem:4}),n:c=>'Bị coi là phạm thượng, phạt bổng ba tháng.'+fx(c,{fame:-5,money:-m(3),tam:-6})},
  {l:'Ký tên chung với đồng liêu',f:c=>chance(0.6)?'Đông người ký, triều đình không dám xem nhẹ.'+fx(c,{fame:R(8,14)}):'Tờ sớ không ai đọc tới.'+fx(c,{tam:-2})},
  {l:'Im lặng cho an thân',f:c=>'Chẳng ai trách, chẳng ai khen.'+fx(c,{liem:-1,tam:-1})}]},
{id:'v64_de_vo',t:'Mưa lớn, đê vỡ',job:Q,ptag:['dan'],k:'Quan trường',sea:['ha','thu'],
 x:c=>`Mưa lớn mấy ngày, đê ở địa hạt ${esc(place(c))} có chỗ rò. Nha môn ${esc(seat(c))} phải quyết nhanh.`,
 o:c=>[{l:'Huy động dân phu đắp gấp',r:[{tri:1,eq:0.7},55],y:c=>'Đê giữ được, mùa màng không mất.'+fx(c,{fame:R(14,22),m:3}),n:c=>'Dân phu đến chậm, đê vỡ một đoạn.'+fx(c,{fame:-8,tam:-8})},
  {l:`Bỏ tiền riêng thuê thợ (${G.fmtMoney(m(15))})`,c:()=>G.money()>=m(15),f:c=>{G.S().money-=m(15);return 'Đê được gia cố kịp thời, dân nhớ ơn.'+fx(c,{fame:R(10,18),liem:3})}}]},
{id:'v64_cong_van_gap',t:'Công văn khẩn của bộ',job:Q,ptag:['kinh','dan'],k:'Quan trường',
 x:c=>`Công văn khẩn từ bộ gửi đến ${esc(seat(c))}, đòi nộp bản kê trong mười ngày. Số liệu thì còn thiếu quá nửa.`,
 o:c=>[{l:'Thức đêm làm cho đủ',r:[{tri:1,suc:0.3},50],y:c=>'Nộp đúng hạn, bộ khen siêng năng.'+fx(c,{fame:5,m:2,suc:-2}),n:c=>'Số liệu sai sót, bị phê.'+fx(c,{fame:-4,suc:-3,tam:-4})},
  {l:'Xin gia hạn',f:c=>'Bộ cho thêm mười ngày, ghi lại một dòng.'+fx(c,{tam:-1})},
  {l:'Dồn việc cho thư lại',f:c=>'Thư lại làm ẩu, hoàn thành cho có.'+fx(c,{tam:2,m:-1})}]},
{id:'v64_nha_mon_tran_tinh',t:'Nha môn thiếu thốn',job:Q,ptag:['dan','an'],rmax:3,k:'Quan trường',
 x:c=>`Nha môn ${esc(seat(c))} nghèo xơ xác, bàn ghế gãy, thư lại ăn mặc rách rưới. Công quỹ cấp về chẳng đủ.`,
 o:c=>[{l:'Bỏ tiền nhà sắm sửa',c:()=>G.money()>=m(8),f:c=>{G.S().money-=m(8);return 'Nha môn tươm tất hẳn, người dân đến kiện cũng thấy yên lòng.'+fx(c,{fame:R(5,10),tam:3})}},
  {l:'Xin tăng cấp từ tỉnh',r:[{eq:1,tri:0.4},48],y:c=>'Tỉnh cấp thêm một khoản.'+fx(c,{fame:3}),n:c=>'Tỉnh trả lời chờ năm sau.'+fx(c,{tam:-3})}]},
/* ================= ĐI NHẬM CHỨC: GIA ĐÌNH THEO / Ở LẠI ================= */
{id:'v64_vo_nho_nha',t:'Thư nhà gửi tới nhiệm sở',job:Q,k:'Gia đình',
 x:c=>`Thư nhà từ quê gửi lên ${esc(place(c))} nói chuyện ruộng vườn, giỗ chạp, con thơ. ${N(c)} đọc đi đọc lại, đêm khuya thắp đèn mà chẳng ngủ được.`,
 o:c=>[{l:'Viết thư hồi âm, gửi quà về',c:()=>G.money()>=m(2),f:c=>{G.S().money-=m(2);return 'Thư đi thư lại, lòng nhẹ bớt.'+fx(c,{tam:6})}},
  {l:'Xin nghỉ phép về thăm nhà',r:[{eq:1},55],y:c=>'Được nghỉ một tháng, về quê sum họp.'+fx(c,{tam:12,fame:2}),n:c=>'Việc công chưa ai thay, chưa được nghỉ.'+fx(c,{tam:-4})},
  {l:'Gạt lòng, dồn sức làm việc',f:c=>'Công việc tiến nhanh hơn.'+fx(c,{m:2,tam:-3})}]},
{id:'v64_vo_chong_buon',t:'Vợ buồn nơi đất khách',job:Q,k:'Gia đình',
 x:c=>{const s=spOf(c);return `${s?esc(s.given):'Người nhà'} theo ${N(c)} lên ${esc(place(c))}, quen khí hậu, quen tiếng nói chưa tròn. Có hôm chị đứng bên cửa sổ nhìn về hướng quê nhà.`},
 o:c=>[{l:'Dành thời gian đưa đi chơi, làm quen',f:c=>{const s=spOf(c);if(s)fx(s,{tam:8});return 'Vợ chồng đi dạo chợ phiên, gặp vài bà vợ quan khác, vui hơn hẳn.'+fx(c,{tam:4})}},
  {l:'Cho phép về thăm quê vài tháng',f:c=>{const s=spOf(c);if(s)fx(s,{tam:10});return 'Vợ về quê ở với nhà ngoại ít lâu rồi mới trở lên.'+fx(c,{tam:-2})}},
  {l:'Bận việc công, khuyên nhẫn nại',f:c=>{const s=spOf(c);if(s)fx(s,{tam:-8});return 'Nàng cắn môi im lặng.'+fx(c,{tam:-2,m:1})}}]},
{id:'v64_con_hoc_nha_mon',t:'Con học chữ ngay tại nha môn',job:Q,k:'Gia đình',
 x:c=>`Con của ${N(c)} theo cha lên ${esc(place(c))}, chẳng có trường làng. Ban ngày ngồi nghe cha xử kiện, tối học chữ cạnh bàn viết.`,
 o:c=>[{l:'Tự dạy kinh sử mỗi tối',r:[{tri:1,eq:0.3},50],y:c=>{G.alive().filter(p=>p.away&&p.away.type==='follow'&&p.away.of===c.id&&age(p)<16).forEach(p=>fx(p,{tri:R(1,3)}));return 'Đứa nhỏ tiến bộ thấy rõ.'+fx(c,{tam:4})},n:c=>'Việc quan bận, bài vở bỏ dở.'+fx(c,{tam:-2})},
  {l:'Mời thầy đồ trong thành dạy',c:()=>G.money()>=m(4),f:c=>{G.S().money-=m(4);G.alive().filter(p=>p.away&&p.away.type==='follow'&&p.away.of===c.id&&age(p)<16).forEach(p=>fx(p,{tri:R(1,4)}));return 'Con được học bài bản, thầy đồ khen sáng dạ.'+fx(c,{fame:2})}}]},
{id:'v64_ho_hang_len_nho',t:'Họ hàng lên nhờ vả',job:Q,k:'Quan trường',
 x:c=>`Một người họ xa từ quê lên ${esc(place(c))}, xin ngài xin cho con cháu chân thư lại, hoặc nhờ nói giúp một vụ kiện ruộng. "Làm quan rồi, giúp người trong họ là phải".`,
 o:c=>[{l:'Nhận lời, xin cho một chân thư lại',f:c=>'Họ hàng mừng, lễ vật gửi về đầy.'+fx(c,{money:m(R(3,8)),liem:-6,cfame:1})+(chance(0.25)?' Có kẻ làm đơn tố cáo thiên vị người nhà.'+fx(c,{fame:-12}):'')},
  {l:'Từ chối, nói đã có luật',f:c=>'Người họ hàng giận, nhưng ngoài kia khen ngài công bằng.'+fx(c,{liem:4,fame:R(3,8),cfame:-1})},
  {l:'Giúp bằng tiền nhà, không dùng quyền',c:()=>G.money()>=m(3),f:c=>{G.S().money-=m(3);return 'Cả hai đều giữ được thể diện.'+fx(c,{liem:2,fame:2})}}]},
{id:'v64_to_cao_hoi_ti',t:'Có kẻ tố trái lệ hồi tị',job:Q,k:'Quan trường',
 x:c=>`Một đơn nặc danh gửi lên bộ Lại: ${N(c)} làm quan ở ${esc(place(c))} mà có họ hàng thân thích cũng ngồi một nha môn gần đó, trái lệ hồi tị. Thật hay giả, ngài biết rõ nhất.`,
 o:c=>[{l:'Tự trình bày, nhờ người làm chứng',r:[{tri:1,eq:0.6},58],y:c=>'Bộ Lại xét thấy không phạm lệ, đơn bị bác.'+fx(c,{fame:3,tam:2}),n:c=>'Bộ Lại ghi chú, phạt cảnh cáo.'+fx(c,{fame:-8,tam:-5})},
  {l:'Xin đổi đi nơi khác để tránh tiếng',f:c=>{c.postT=G.S().t-30;G.S().queue.push({kind:'office',cid:c.id});return 'Dâng đơn xin thuyên chuyển.'+fx(c,{tam:-2})}}]},
{id:'v64_dem_binh_yen',t:'Một đêm yên ả ở nha môn',job:Q,k:'Quan trường',
 x:c=>`Công việc ở ${esc(seat(c))} hôm nay xong sớm. ${N(c)} ngồi một mình dưới hiên, nghe tiếng ve, nhớ lại ngày còn đèn sách.`,
 o:c=>[{l:'Ngồi đọc sách đến khuya',f:c=>'Một câu chữ cũ sáng bừng lên.'+fx(c,{tri:1,tam:4})},
  {l:'Rủ đồng liêu uống rượu đàm đạo',f:c=>'Vài mối quen biết hữu ích.'+fx(c,{eq:1,tam:3,money:-m(0.5)})}]},
/* ================= QUAN VÕ ================= */
{id:'v64_vo_nhan_chuc',t:'Nhận ấn đồn',job:QN,k:'Quân ngũ',st:1,
 x:c=>`${N(c)} dẫn quân đến nhận ấn ở ${esc(seat(c))}. Lính cũ nhìn vị chỉ huy mới bằng con mắt dò xét.`,
 o:c=>[{l:'Duyệt quân nghiêm khắc, lập kỷ luật',r:[{vo:1,tri:0.4,eq:0.3},52],y:c=>'Lính vào nền nếp, trên cũng nể.'+fx(c,{merit:R(2,6),fame:3}),n:c=>'Lính cũ ngầm chống đối, khó sai bảo.'+fx(c,{tam:-5})},
  {l:'Khao quân, gây thiện cảm',c:()=>G.money()>=m(6),f:c=>{G.S().money-=m(6);return 'Lính thân thiện, dễ hợp tác.'+fx(c,{merit:R(1,3),tam:3})}}]},
{id:'v64_vo_hau_can_tham',t:'Lương quân bị xén',job:QN,k:'Quân ngũ',st:1,
 x:c=>`Lương thảo phát về ${esc(seat(c))} hao hụt trông thấy. Viên hậu cần ghi sổ đủ, nhưng bao gạo nhẹ hẳn.`,
 o:c=>[{l:'Tra sổ, bắt kẻ xén',r:[{tri:1,eq:0.5,vo:0.3},52],y:c=>'Truy ra viên hậu cần cùng thư lại ăn chia. Quân sĩ mừng.'+fx(c,{merit:R(3,8),fame:6,liem:3}),n:c=>'Họ có người chống lưng trên, bị gạt đi.'+fx(c,{tam:-6,fame:-3})},
  {l:'Làm ngơ, đòi chia phần',f:c=>'Hậu cần mừng rỡ.'+fx(c,{money:m(R(4,10)),liem:-8,merit:-1})},
  {l:'Báo thẳng lên đô ty',f:c=>chance(0.55)?'Đô ty điều tra, ngài được ghi công.'+fx(c,{merit:R(2,5),fame:4}):'Báo cáo bị chặn ở giữa.'+fx(c,{tam:-3})}]},
{id:'v64_vo_tuan_bien',t:'Tuần biên gặp toán lạ',job:QN,k:'Quân ngũ',st:1,sea:['xuan','thu','dong'],
 x:c=>`Đội tuần của ${N(c)} đụng một toán người lạ cưỡi ngựa gần ${esc(seat(c))}. Không rõ là thương nhân hay do thám.`,
 o:c=>[{l:'Chặn lại hỏi',r:[{vo:1,eq:0.5},50],y:c=>'Hóa ra là toán do thám. Bắt sống được hai tên.'+fx(c,{merit:R(5,10),fame:6}),n:c=>'Họ thoát mất, để lại vài vết thương.'+fx(c,{suc:-R(2,6),merit:1})},
  {l:'Theo dõi từ xa, báo lên trên',f:c=>'Cấp trên phái thêm người, công lao ghi chung.'+fx(c,{merit:R(2,4)})},
  {l:'Để họ đi, đỡ gây chuyện',f:c=>'Hôm sau có tin họ cướp một thôn gần đó.'+fx(c,{merit:-2,tam:-5})}]},
{id:'v64_vo_doi_don',t:'Lệnh điều đồn',job:QN,k:'Quân ngũ',st:1,
 x:c=>`Đô ty gửi lệnh điều ${N(c)} sang đồn xa. Ở đồn mới thì nguy hiểm hơn nhưng dễ lập công.`,
 o:c=>[{l:'Nhận lệnh, lên đường',f:c=>{G.S().queue.push({kind:'office',cid:c.id});return 'Chuẩn bị nhận chức mới.'+fx(c,{merit:R(1,4),tam:-2})}},
  {l:'Xin ở lại đồn cũ vì gia đình',r:[{eq:1},46],y:c=>'Đô ty chuẩn.'+fx(c,{tam:4}),n:c=>'Không được, lệnh đã xuống.'+fx(c,{tam:-4})}]},
{id:'v64_vo_tap_tran',t:'Diễn tập quân vệ',job:QN,k:'Quân ngũ',st:1,sea:['xuan','thu'],
 x:c=>`Đô ty tổ chức diễn tập các vệ. ${N(c)} phải đem quân của ${esc(seat(c))} ra đối luyện với đồn khác.`,
 o:c=>[{l:'Dồn sức thắng đồn bạn',r:[{vo:1,tri:0.5,eq:0.3},52],y:c=>'Quân của ngài thắng, được ban thưởng.'+fx(c,{merit:R(4,8),fame:5,money:m(2)}),n:c=>'Thua đậm, cả vệ bị cười.'+fx(c,{tam:-5,fame:-3})},
  {l:'Giữ sức, chỉ làm cho xong',f:c=>'Không công không tội.'+fx(c,{merit:1})}]},
{id:'v64_vo_cam_y',t:'Cẩm y vệ nhờ việc',job:QN,k:'Quân ngũ',st:1,
 x:c=>`Một người của Cẩm y vệ đến gặp ${N(c)} ở ${esc(seat(c))}, hỏi chuyện đồng liêu cũ: có ai nói xấu triều đình sau bữa rượu hay không.`,
 o:c=>[{l:'Khai thật những gì biết',f:c=>'Cẩm y vệ ghi nhận.'+fx(c,{merit:R(2,6),liem:-4,tam:-3})},
  {l:'Nói không biết',r:[{eq:1,vo:0.3},50],y:c=>'Họ rút đi, nhưng ghi tên ngài.'+fx(c,{tam:-2,liem:2}),n:c=>'Họ nghi ngài che giấu.'+fx(c,{fame:-6,tam:-8})},
  {l:'Báo bạn cũ biết trước',f:c=>'Bạn thoát nạn, nhưng ngài cũng bị để ý.'+fx(c,{tam:2,merit:-3,liem:3})}]},
{id:'v64_vo_thuy_chien',t:'Thuyền lạ ngoài cảng',job:QN,k:'Quân ngũ',st:1,
 x:c=>`Đầu thuyền ở ${esc(seat(c))} báo có thuyền không cờ hiệu lảng vảng ngoài cửa cảng suốt hai đêm.`,
 o:c=>[{l:'Cho thuyền nhỏ ra dò',r:[{vo:1,tri:0.4},50],y:c=>'Bắt được thuyền cướp biển nhỏ, thu giữ ít hàng.'+fx(c,{merit:R(5,10),money:m(R(3,8))}),n:c=>'Trúng mai phục, mất một chiếc thuyền.'+fx(c,{merit:-2,suc:-4})},
  {l:'Đóng cửa cảng, tăng phòng bị',f:c=>'Thuyền lạ bỏ đi, không ai biết là gì.'+fx(c,{merit:1})}]},
{id:'v64_vo_thoi_binh',t:'Thời bình, đồn trống',job:QN,k:'Quân ngũ',st:1,
 x:c=>`Đã lâu không có chiến sự, lính ở ${esc(seat(c))} buông thả, đêm gác ngủ gục, binh khí han gỉ. Người dân nhìn lính thì ái ngại.`,
 o:c=>[{l:'Siết kỷ luật, tập lại mỗi sáng',r:[{vo:1,eq:0.4},50],y:c=>'Đồn lại có sinh khí.'+fx(c,{merit:R(2,5),fame:3}),n:c=>'Lính oán thầm.'+fx(c,{tam:-4})},
  {l:'Cho lính làm thêm nghề phụ',f:c=>'Lính có thêm thu nhập, dân cũng quý.'+fx(c,{money:m(2),fame:1})}]},
/* ================= NHÀ VUA VÀ TRIỀU ĐẠI ================= */
{id:'v64_dai_xa',t:'Đại xá đầu triều vua mới',k:'Triều đình',w:5,c:()=>{const d=G.S().dyn;return !!d&&d.newT>=0&&G.S().t-d.newT<=18},
 x:c=>`Vua mới ${esc(emp())} lên ngôi, ban chiếu đại xá thiên hạ, miễn thuế nửa năm. Cả làng mở hội ăn mừng.`,
 o:c=>[{l:'Cùng dân làng mừng hội',f:c=>'Lòng dân hân hoan.'+fx(c,{tam:6,fame:3,money:-m(1)})},
  {l:'Nhân dịp dâng biểu chúc mừng',f:c=>'Tờ biểu ghi tên nhà mình vào sổ triều.'+fx(c,{fame:5,cfame:2})}]},
{id:'v64_vua_trieu_kien',t:'Vua triệu kiến',job:Q,rmin:5,k:'Triều đình',w:1.2,
 x:c=>`${esc(emp())} triệu ${N(c)} vào điện, hỏi về tình hình dân sinh ở nơi từng làm quan và việc triều chính.`,
 o:c=>[{l:'Thẳng thắn tâu thật',r:[{tri:1,eq:0.7,fame:0.3},52],y:c=>'Vua nghe xong gật đầu, ban vàng lụa.'+fx(c,{fame:R(20,35),money:m(R(8,18)),liem:3}),n:c=>'Lời quá thẳng khiến vua cau mày.'+fx(c,{fame:-6,tam:-6})},
  {l:'Tâu khéo, chỉ nói điều tốt',f:c=>'Vua hài lòng, nhưng chẳng nhớ gì mấy.'+fx(c,{fame:R(4,10),liem:-3})}]},
{id:'v64_vua_ban_thuong',t:'Vua ban thưởng công thần',job:Q,rmin:4,k:'Triều đình',w:0.8,
 x:c=>`Triều đình ban thưởng các quan có công trong nhiệm kỳ. Tên ${N(c)} nằm trong danh sách.`,
 o:c=>[{l:'Nhận ân thưởng, tạ ơn',f:c=>`Được ${esc(emp())} ban lụa và bạc.`+fx(c,{money:m(R(6,15)),fame:R(8,14),tam:6})},
  {l:'Từ chối, nhường cho người khác',f:c=>'Người ta khen ngài biết nhún nhường.'+fx(c,{fame:R(10,18),liem:3,eq:1})}]},
{id:'v64_khoa_an',t:'Ân khoa mừng vua mới',job:Q,ptag:['hoc','kinh'],k:'Triều đình',w:3,
 x:c=>`Vua mới mở ân khoa đặc cách, nhiều sĩ tử muốn tìm người cầm cân nảy mực. ${N(c)} được nhắc đến trong danh sách chấm thi.`,
 o:c=>[{l:'Nhận chức, chấm công tâm',f:c=>'Ân khoa thành công, tiếng ngài lên cao.'+fx(c,{fame:R(10,20),liem:3,m:2})},
  {l:'Xin thôi, tránh thị phi',f:c=>'Người khác thế vào, ngài đỡ lo.'+fx(c,{tam:2})}]},
/* ================= v6.4.1: đỗ võ cử, chọn bổ dụng ================= */
{id:'v641_vo_do',t:'Bổ dụng sau võ cử',fixed:1,k:'Võ cử',
 x:c=>`Triều đình xét ${N(c)} ${c.flags.voTop?'đỗ đầu bảng':'đỗ'} võ cử, cho chọn: vào quân ngũ nhận chức ${c.flags.voTop?'Thiên hộ':'Bách hộ'}, hay ở lại nhà giữ danh võ cử.`,
 o:c=>[{l:c.flags.voTop?'Vào quân, nhận chức Thiên hộ':'Vào quân, nhận chức Bách hộ',s:'Rời nhà ra doanh trại, sau đó chọn nơi nhậm chức',f:c=>{G.voEnlist(c,c.flags.voTop?4:3);return `${N(c)} cáo biệt gia đình, mang ấn bổ dụng ra doanh trại.`+fx(c,{fame:R(5,12),tam:4})}},
  {l:'Ở lại nhà, giữ danh võ cử',f:c=>'Danh võ cử ở lại với dòng họ, đi đâu người ta cũng nể.'+fx(c,{fame:R(4,9),tam:3})}]}
];
/* điều kiện riêng, để không lệch bối cảnh */
const set=(id,f)=>{CTX[id]=f};
set('v64_vo_nho_nha',c=>alone(c));
set('v64_vo_chong_buon',c=>withFam(c)&&!!spOf(c)&&!!G.alive().find(p=>p.id===c.spouse&&p.away&&p.away.type==='follow'));
set('v64_con_hoc_nha_mon',c=>withFam(c)&&c.pst.fam>=2&&G.alive().some(p=>p.away&&p.away.type==='follow'&&p.away.of===c.id&&age(p)<16));
set('v64_ho_hang_len_nho',c=>posted(c));
set('v64_to_cao_hoi_ti',c=>posted(c)&&c.lv>=2);
set('v64_vo_nhan_chuc',c=>milSeat(c)&&(S().t-(c.postT||0))<=2);
['v64_vo_hau_can_tham','v64_vo_tuan_bien','v64_vo_doi_don','v64_vo_tap_tran','v64_vo_cam_y','v64_vo_thoi_binh'].forEach(id=>set(id,c=>milSeat(c)));
set('v64_vo_tuan_bien',c=>milSeat(c)&&['A','H','C','F','P'].includes((G.D.seatWhere(c.seat)||{}).t));
set('v64_vo_cam_y',c=>milSeat(c)&&(G.D.seatWhere(c.seat)||{}).t==='K');
set('v64_vo_thuy_chien',c=>milSeat(c)&&(G.D.seatWhere(c.seat)||{}).t==='G');
set('v64_vo_thoi_binh',c=>milSeat(c)&&!S().war);
set('v64_dai_xa',c=>!!S().dyn&&S().t-S().dyn.newT<=6&&S().dyn.n>1);
set('v64_khoa_an',c=>!!S().dyn&&S().t-S().dyn.newT<=18&&S().dyn.n>1);
set('v64_vua_ban_thuong',c=>c.postT!=null&&S().t-c.postT>=24);
set('v64_vua_trieu_kien',c=>S().t-(c.postT||0)>=12);
return ev;
});
