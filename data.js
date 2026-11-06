/* Bách Niên Thế Gia v4 · dữ liệu tĩnh
   Tiền tính bằng ĐỒNG: 1 lạng bạc = 1.000 đồng, 1 lượng vàng = 1.000 bạc = 1.000.000 đồng.
   Mốc giá tham khảo đời Minh: làm thuê 15 đến 30 đồng/ngày, một thạch gạo khoảng 0,6 lạng,
   ruộng tốt 5 đến 15 lạng một mẫu, quan Thất phẩm ăn bổng khoảng 7,5 thạch gạo một tháng. */
window.D=(function(){
const STATS=[['tri','Trí tuệ'],['vo','Võ lực'],['suc','Sức khỏe'],['mi','Mị lực'],['eq','EQ']];
const SN=Object.assign(Object.fromEntries(STATS),{tam:'Tâm trạng',duyen:'Cơ duyên'});
const MS=[100];
const SURN=['Nguyễn','Trần','Lê','Phạm','Hoàng','Vũ','Đặng','Bùi','Đỗ','Hồ','Ngô','Dương','Lý','Tô','Mạc','Thẩm','Tạ','Lục','Kiều','Văn','Quách','Triệu','Phó','Mai','Cố','Diệp','Hàn','Lam','Ôn','Sầm'];
const MNAME=['Minh Khải','Văn Đức','Quang Huy','Bảo Long','Đình Phong','Hữu Tài','Gia Khánh','Thế Vinh','Trọng Nghĩa','Tuấn Kiệt','An Khang','Thành Công','Tử Kỳ','Hạo Nhiên','Cảnh Dương','Vĩnh Phúc','Duy Tân','Khắc Kiên','Thiên Ân','Nhật Minh','Hoài Sơn','Chí Thanh','Đăng Khoa','Trường Giang','Phúc Lâm','Văn Bách','Hải Triều','Kính Đường','Tùng Lâm','Bá Hiên','Cẩn Ngôn','Tư Viễn','Thừa Ân','Lập Thành','Hữu Đạo','Mặc Vân'];
const FNAME=['Thục Nhàn','Ngọc Lan','Thanh Tâm','Mỹ Dung','Uyển Nhi','Bích Ngọc','Tuệ Mẫn','Diệu Linh','Hoài An','Như Ý','Kiều Oanh','Minh Nguyệt','Tố Như','Vân Khanh','Lạc Nhạn','Hải Đường','Tịnh Y','Cẩm Tú','Thu Thủy','Ánh Tuyết','Lam Khê','Quỳnh Chi','Mộng Điệp','Hà Phương','Xuân Hoa','Tú Uyên','Bảo Trâm','Diễm Kiều','Thanh Hà','Nguyệt Hằng','Tâm Từ','Uyển Thanh'];

/* nhà ở: giá, sức chứa, bảo dưỡng/tháng, danh vọng khi xây, tâm trạng */
const HOMES=[
  {n:'Lều tranh',cost:0,cap:4,upkeep:0,fame:0,tam:-6,d:'Mái rạ vách phên, gió lùa bốn bề.'},
  {n:'Nhà tranh vách đất',cost:4000,cap:6,upkeep:20,fame:5,tam:-2,d:'Có gian thờ tổ tiên, chái bếp riêng.'},
  {n:'Nhà ngói ba gian',cost:40000,cap:8,upkeep:150,fame:25,tam:2,d:'Ngói âm dương, sân gạch, hàng cau trước ngõ.'},
  {n:'Tứ hợp viện',cost:300000,cap:20,upkeep:800,fame:70,tam:5,d:'Bốn dãy nhà quây sân trong, có gia đinh canh giữ.'},
  {n:'Phủ đệ',cost:2000000,cap:32,upkeep:4000,fame:160,tam:8,d:'Cổng son biển ngạch, quản gia lo việc nhà.'},
  {n:'Thế gia trang viên',cost:10000000,cap:50,upkeep:15000,fame:400,tam:11,d:'Lầu các, hồ sen, vườn đá. Danh gia vọng tộc một phương.'}];
/* mức sống: tên, đồng/người/tháng, tâm trạng */
const LIFE=[['Kham khổ',100,-12],['Đạm bạc',160,-4],['Đủ đầy',330,1],['Sung túc',850,5],['Xa hoa',2600,9]];
/* gia thế: điểm = danh vọng + tài sản (bạc) + tước */
const TIERS=[['Bần hộ',0],['Thường dân',30],['Tiểu hộ khá giả',120],['Hương thân',400],['Hào phú',1500],['Thế gia',6000],['Danh môn vọng tộc',20000]];
const EXPECT=[0,1,1,2,3,3,4];
/* hệ số tiền trong kỳ ngộ theo gia thế */
const TK=[1,1.6,2.6,4,6,9,14];
const TUOC=['','Nam tước','Tử tước','Bá tước','Hầu tước','Quốc công'];
const TUOC_PAY=[0,20000,35000,60000,120000,250000];
const TUOC_HOME=[0,3,3,4,4,5];
const TUOC_LAND=[0,30,50,100,200,400];
const RANKS=['Cửu phẩm','Bát phẩm','Thất phẩm','Lục phẩm','Ngũ phẩm','Tứ phẩm','Tam phẩm','Nhị phẩm','Nhất phẩm'];
const SALARY=[2800,3300,4500,6000,8000,12000,20000,32000,52000];
const VACANCY=[0.6,0.5,0.4,0.3,0.22,0.15,0.1,0.06,0.03];
const ARMY=[['Binh sĩ',450,0],['Ngũ trưởng',700,20],['Thập trưởng',1000,50],['Bách hộ',2200,120],['Thiên hộ',5000,260],['Phó tướng',10000,500],['Tướng quân',20000,850],['Đại tướng quân',40000,1300]];

/* nghề: inc = đồng/tháng ở bậc đầu, lv: [tên, hệ số, yêu cầu], phys = tuổi nên nghỉ (nghề nặng nhọc) */
const L=(n,mul,req)=>({n,mul,req:req||{}});
const JOBS={
  none:{n:'Nhàn rỗi',inc:0,st:'eq',stress:0,lv:[L('Nhàn rỗi',0)],d:'Chưa có nghề.'},
  huu:{n:'Nghỉ hưu',inc:0,st:'eq',stress:-4,lv:[L('Nghỉ hưu',0)],d:'Đã gác lại công việc, an hưởng tuổi già.'},
  noi:{n:'Nội trợ',inc:0,st:'eq',stress:2,lv:[L('Nội trợ',0),L('Người đảm việc nhà',0,{m:30}),L('Chủ mẫu',0,{m:70,eq:55})],d:'Lo toan việc nhà. Mỗi bậc giảm 6% chi tiêu của hộ.'},
  nong:{n:'Nông',inc:0,st:'suc',stress:3,phys:58,start:1,gift:'1 mẫu ruộng',lv:[L('Tá điền',1),L('Nông phu',1,{land:3}),L('Phú nông',1,{land:15}),L('Điền chủ',1,{land:40})],d:'Cày cấy ruộng nhà và ruộng thuê. Thu nhập đến từ mùa vụ, xem trang Ruộng vườn. Bậc nghề lên theo số ruộng sở hữu.'},
  tieunhi:{n:'Tiểu nhị',inc:450,st:'eq',stress:4,start:1,gift:'8 lạng bạc vốn liếng',lv:[L('Tiểu nhị',1),L('Người bán hàng',1.6,{m:20,eq:35}),L('Chưởng quỹ',3,{m:50,eq:50,tri:40}),L('Đại chưởng quỹ',5,{m:85,eq:70,tri:55})],d:'Chạy bàn, đứng quầy ở quán, hiệu buôn. Lên Người bán hàng thì mở được quán trà; lên Chưởng quỹ thì mở được hiệu buôn. Được đi buôn chuyến.'},
  khuanvac:{n:'Phu khuân vác',inc:500,st:'vo',stress:5,phys:48,start:1,gift:'Đòn gánh, xe cút kít và 6 lạng bạc',lv:[L('Phu khuân vác',1),L('Cai phu',1.8,{m:30,vo:40,eq:35}),L('Đầu nậu bến',3.5,{m:70,eq:55,vo:50})],d:'Bốc vác ở bến sông, chợ đầu mối. Nặng nhọc, dễ chấn thương.'},
  tieuphu:{n:'Tiều phu',inc:400,st:'suc',stress:4,phys:52,start:1,gift:'Rìu, cung tên và 6 lạng bạc',lv:[L('Tiều phu',1),L('Thợ săn',1.7,{m:30,vo:45}),L('Thợ săn có tiếng',2.6,{m:70,vo:65})],d:'Đốn củi, săn bắn trong núi. Dễ gặp kỳ ngộ sơn lâm.'},
  ngu:{n:'Ngư phủ',inc:450,st:'suc',stress:4,phys:55,start:1,gift:'Chiếc thuyền nan cũ',lv:[L('Ngư phủ',1),L('Chủ thuyền',2.2,{m:30,flag:'thuyen'}),L('Chủ đội thuyền',4,{m:70,eq:50,flag:'thuyen'})],d:'Đánh cá ven sông ven biển. Mùa đông ít cá. Mua thuyền lớn mới lên Chủ thuyền. Lên Chủ đội thuyền thì mở được đội thuyền buôn.'},
  hangrong:{n:'Bán hàng rong',inc:400,st:'eq',stress:4,start:1,gift:'Gánh hàng và 6 lạng bạc vốn',lv:[L('Bán hàng rong',1),L('Chủ sạp chợ',1.9,{m:30,eq:40})],d:'Gánh hàng đi khắp xóm. Lên Chủ sạp thì mở được quán trà. Được đi buôn chuyến gần.'},
  hau:{n:'Gia nhân',inc:400,st:'eq',stress:5,start:1,gift:'Ăn ở nhà chủ, cuối năm được thưởng 8 lạng',lv:[L('Gia nhân',1),L('Quản sự',2,{m:30,eq:45}),L('Quản gia',3.5,{m:60,eq:60,tri:45})],d:'Hầu hạ nhà quyền quý. Được nuôi ăn nên bớt chi tiêu. Hay được quyền quý để mắt tới.'},
  tho:{n:'Thợ thủ công',inc:350,st:'vo',stress:3,phys:62,start:1,gift:'Bộ đồ nghề và 5 lạng bạc',lv:[L('Thợ học việc',1),L('Thợ phụ',1.8,{m:20}),L('Thợ cả',3,{m:50,vo:40}),L('Lão thợ',4.5,{m:80}),L('Danh tượng',7,{m:100,fame:150})],d:'Mộc, rèn, gốm, dệt. Lên Thợ cả thì mở được xưởng.'},
  chan:{n:'Chăn nuôi',inc:300,st:'suc',stress:2,phys:60,start:1,gift:'Một con trâu và đàn gà',lv:[L('Mục đồng',1),L('Người nuôi gia súc',2,{m:30}),L('Chủ trại',3.5,{m:70,eq:40})],d:'Chăn trâu, nuôi lợn gà. Lên Người nuôi gia súc thì mở được trại.'},
  y:{n:'Y',inc:300,st:'tri',stress:5,start:1,req:{tri:40},gift:'Hòm thuốc và 6 lạng bạc',lv:[L('Học trò nhà thuốc',1),L('Y đồng',2,{m:20,tri:45}),L('Lang y',4,{m:50,tri:60}),L('Danh y',8,{m:90,tri:80,fame:150})],d:'Người nhà ít ốm khi có dịch. Lên Lang y thì mở được y quán. Giỏi thì được hoàng thất vời.'},
  su:{n:'Dạy học',inc:350,st:'tri',stress:3,start:1,req:{tri:45},gift:'Tủ sách và 6 lạng bạc',lv:[L('Người chạy việc ở trường',1),L('Trợ giáo',1.7,{m:20,tri:50}),L('Thầy đồ',3,{m:50,tri:62}),L('Tiên sinh',5,{m:80,tri:75,degree:1}),L('Đại nho',9,{m:100,tri:95,fame:300,degree:1})],d:'Con cháu học nhanh hơn. Lên Thầy đồ mà có Trí 75 hoặc đã đỗ thì mở được trường.'},
  nghe:{n:'Nghệ nhân',inc:400,st:'mi',stress:3,start:1,req:{mi:45},gift:'Cây đàn và 6 lạng bạc',lv:[L('Đào kép',1),L('Nghệ nhân',2,{m:25,mi:55}),L('Danh linh',4.5,{m:60,mi:75}),L('Đệ nhất danh cầm',9,{m:100,mi:95,flag:'cung'})],d:'Cả nhà vui hơn. Lên Nghệ nhân thì lập được gánh hát.'},
  tieu:{n:'Tiêu sư',inc:600,st:'vo',stress:6,phys:52,start:1,req:{vo:45},gift:'Thanh đao và 6 lạng bạc',lv:[L('Tiêu đồ',1),L('Tiêu sư',1.8,{m:25,vo:55}),L('Tiêu đầu',3.2,{m:60,vo:70,eq:45}),L('Tổng tiêu đầu',6,{m:90,vo:85,fame:150})],d:'Áp tải hàng hóa, hay gặp cướp. Lên Tiêu sư thì mở võ quán, lên Tiêu đầu thì lập tiêu cục.'},
  thulai:{n:'Thư lại',inc:900,st:'tri',stress:5,lv:[L('Thư lại',1),L('Điển lại',2,{m:40,tri:65}),L('Đề lại',3.2,{m:80,tri:75,eq:55})],d:'Làm giấy tờ ở nha môn. Chỉ vào được nhờ kỳ ngộ nha môn tuyển người.'},
  nhadich:{n:'Nha dịch',inc:700,st:'vo',stress:6,phys:55,lv:[L('Nha dịch',1),L('Bộ khoái',1.8,{m:40,vo:60}),L('Bộ đầu',3,{m:80,vo:70,eq:50})],d:'Lính lệ ở huyện nha. Chỉ vào được nhờ kỳ ngộ.'},
  quan:{n:'Quan lại',inc:0,st:'tri',stress:6,lv:RANKS.map(n=>L(n,1)),d:'Không được buôn bán. Thăng chức cần chỗ trống, chỉ số và danh vọng. Lộc ngoài bổng tùy độ liêm chính; càng tham càng dễ bị hặc tội.'},
  nguy:{n:'Ngự y',inc:6000,st:'tri',stress:7,lv:[L('Ngự y',1),L('Viện phán',2,{m:60,tri:90}),L('Thái y lệnh',3.5,{m:100,tri:110})],d:'Thầy thuốc của hoàng thất.'},
  vua:{n:'Hoàng đế',inc:1000000,st:'tri',stress:8,lv:[L('Hoàng đế',1)],d:'Thiên tử.'},
  quan_ngu:{n:'Quân ngũ',inc:0,st:'vo',stress:8,phys:50,lv:ARMY.map(a=>L(a[0],1)),d:'Ở doanh trại, xa nhà. Thăng cấp theo chiến công. Một nửa quân lương gửi về nhà. Thời chiến dễ tử trận.'},
  hiep:{n:'Hiệp khách',inc:0,st:'vo',stress:4,lv:[L('Lãng khách',1),L('Hiệp sĩ',1,{m:30}),L('Đại hiệp',1,{m:70,fame:200}),L('Võ lâm minh chủ',1,{m:110,fame:600})],d:'Bôn ba giang hồ, sống bằng túi tiền riêng.'},
  chu:{n:'Chủ cơ sở',inc:0,st:'eq',stress:5,lv:[L('Chủ',1)],d:'Làm chủ một cơ sở kinh doanh. Thu nhập là lãi của cơ sở.'}};
const STARTJOBS=['nong','tieunhi','khuanvac','tieuphu','ngu','hangrong','hau','tho','chan','y','su','nghe','tieu'];

/* thời gian rảnh: chi phí đồng/tháng, mức tăng/năm */
const FOCUS={
  nghi:{n:'Nghỉ ngơi',cost:0,g:{},hp:1.2,tam:3,d:'Hồi sức, thư thả'},
  hoc:{n:'Đọc sách',cost:40,g:{tri:6},tam:-1,d:'Trí tuệ'},
  vo:{n:'Luyện võ',cost:40,g:{vo:6},hp:0.5,tam:0,d:'Võ lực, sức khỏe'},
  ren:{n:'Rèn thân thể',cost:0,g:{},hp:1,tam:0,d:'Sức khỏe hồi nhanh'},
  nghe:{n:'Trau dồi tay nghề',cost:80,g:{},mm:1.5,tam:-2,d:'Thông thạo nghề'},
  giao:{n:'Giao du tửu lâu',cost:300,g:{mi:3,eq:4},tam:4,fame:1,d:'Mị lực, EQ, quen biết'},
  cam:{n:'Cầm kỳ thi họa',cost:200,g:{mi:4,tri:2},tam:3,d:'Mị lực, Trí tuệ'},
  phat:{n:'Lễ Phật tu tâm',cost:30,g:{eq:3},tam:5,d:'EQ, tâm an'},
  du:{n:'Ngao du sơn thủy',cost:600,g:{tri:1},hp:0.5,tam:8,duyen:1,d:'Tâm trạng, gặp kỳ ngộ nhiều hơn'},
  lac:{n:'Hưởng lạc',cost:1500,g:{},hp:-0.5,tam:12,d:'Vui nhưng tốn và hại sức'},
  muu:{n:'Đọc binh thư, sử sách',cost:60,g:{tri:2},tam:-1,d:'Cơ mưu'},
  so:{n:'Học sổ sách, quản việc',cost:40,g:{},tam:-1,d:'Quản trị'},
  bien:{n:'Tập ăn nói, biện luận',cost:20,g:{eq:1},tam:0,d:'Khẩu tài'},
  giup:{n:'Phụ việc đồng áng',cost:0,g:{suc:1},tam:-1,d:'Ra đồng phụ một tay, ruộng nhà đỡ thiếu người'},
  /* việc phụ (v6.1): thu nhập vào túi riêng, có mùa, có sự kiện riêng */
  dan:{n:'Đan lát, dệt vải',cost:0,g:{},tam:-1,side:{inc:110,mo:0},d:'Việc tay chân trong nhà, tháng nào cũng làm được'},
  phu:{n:'Đi phu đắp đê, làm đường',cost:0,g:{vo:1},hp:-0.3,tam:-3,side:{inc:300,mo:[10,11,12,1,2]},d:'Chỉ có việc từ tháng 10 đến tháng 2, lúc nông nhàn'},
  cui:{n:'Đốn củi, săn bắt',cost:0,g:{vo:1,suc:1},tam:-1,side:{inc:170,mo:0},d:'Vào rừng kiếm củi, đặt bẫy. Có lúc gặp thú dữ'},
  ca:{n:'Chài lưới ven sông',cost:0,g:{suc:1},tam:0,side:{inc:180,mo:[3,4,5,6,7,8,9,10]},d:'Từ tháng 3 đến tháng 10, mùa đông nước lạnh cá ít'},
  thue:{n:'Làm thuê cho nhà giàu',cost:0,g:{},tam:-3,side:{inc:200,mo:0},d:'Gánh nước, xay lúa, giữ cửa. Đều tay nhưng bị sai vặt'},
  buonnho:{n:'Buôn chuyến nhỏ',cost:0,g:{eq:1},tam:0,side:{inc:240,mo:0,vary:1,cap:400},d:'Gánh hàng đi chợ phiên. Cần ít vốn riêng, lời lỗ thất thường'}};

/* trường học: học phí đồng/tháng */
const SCHOOL={
  1:{nha:{n:'Ở nhà',fee:0,g:{}},lang:{n:'Trường làng',fee:60,g:{tri:4}},tu:{n:'Tư thục',fee:250,g:{tri:6,eq:1},tier:1},giasu:{n:'Gia sư riêng',fee:1500,g:{tri:8,mi:1,eq:1},tier:3},
     vodo:{n:'Võ đường làng',fee:100,g:{vo:5,suc:2}},nucong:{n:'Nữ công gia chánh',fee:60,g:{mi:2,eq:3},anyGirl:1}},
  2:{nha:{n:'Ở nhà',fee:0,g:{}},huyen:{n:'Trường huyện',fee:400,g:{tri:7},tier:1},danhsu:{n:'Theo danh sư',fee:2000,g:{tri:10,eq:2},tier:3},
     vodd:{n:'Võ đường',fee:350,g:{vo:7,suc:3}},hocy:{n:'Học việc nhà thuốc',fee:150,g:{tri:3},pre:{y:3}},hocbuon:{n:'Theo phường buôn',fee:80,g:{eq:4},pre:{tieunhi:3}},
     hoctho:{n:'Học việc phường thợ',fee:50,g:{vo:2},pre:{tho:3}},nucong:{n:'Nữ công gia chánh',fee:120,g:{mi:3,eq:3},anyGirl:1}},
  3:{nha:{n:'Ở nhà',fee:0,g:{}},phu:{n:'Phủ học',fee:800,g:{tri:9},tier:2},qtg:{n:'Quốc tử giám',fee:4000,g:{tri:13,eq:3},noble:1},
     vop:{n:'Võ phái danh môn',fee:2500,g:{vo:12,suc:4},tier:3},vohk:{n:'Trường võ học',fee:1000,g:{vo:8,tri:2},tier:2},
     yhd:{n:'Y học đường',fee:1000,g:{tri:6},pre:{y:5},tier:2},thoi:{n:'Thương hội học việc',fee:400,g:{eq:4,tri:2},pre:{tieunhi:5}},
     khue:{n:'Khuê các cầm kỳ thi họa',fee:1200,g:{mi:6,tri:3,eq:2},tier:3,anyGirl:1}}};

/* thói quen: chi phí đồng/tháng */
const HABITS={
  bac:{n:'Cờ bạc',vice:1,cost:0,tam:3,d:'Hay thua bạc, đầu óc để ở chiếu bạc, làm việc lơ là. Càng nặng càng khó bỏ'},
  ruou:{n:'Rượu chè',vice:1,cost:150,tam:2,hp:-0.3,d:'Hại sức khỏe, say thì hay sinh chuyện'},
  suutam:{n:'Sưu tầm đồ cổ',cost:2000,tam:4,fame:0.3,d:'Tốn kém, nở mày nở mặt'},
  tuthien:{n:'Làm việc thiện',cost:600,tam:2,fame:0.6,d:'Danh vọng tăng dần'},
  thuocbo:{n:'Dùng thuốc bổ',cost:500,hp:0.8,tam:1,d:'Hồi sức nhanh'},
  chim:{n:'Nuôi chim cảnh',cost:120,tam:3,d:'Thú vui tao nhã'},
  chay:{n:'Ăn chay niệm Phật',cost:0,tam:2,eq:1,d:'Tâm tĩnh'},
  thanhlau:{n:'Trăng hoa',vice:1,cost:2500,tam:5,fame:-0.3,d:'Lui tới thanh lâu, tốn bạc, mang tiếng, vợ chồng lục đục'},
  dacsu:{n:'Ham đọc sách hiếm',cost:400,tam:2,tri:2,d:'Trí tuệ tăng thêm'},
  xahoa:{n:'Phung phí',vice:1,cost:5000,tam:5,d:'Tiêu tiền như rác để được người khác trầm trồ'},
  trom:{n:'Tắt mắt',vice:1,cost:0,tam:0,d:'Hay lấy cắp vặt. Bị bắt thì cả nhà mang tiếng'},
  donhau:{n:'Hay gây gổ',vice:1,cost:0,tam:1,d:'Hở ra là to tiếng, đánh nhau'},
  buonba:{n:'U uất',cost:0,tam:-10,d:'Tâm trạng nặng nề'}};

/* đặc tính: c xanh (tốt) / đỏ (xấu) / tím (đặc biệt). gene: 'D' trội, 'r' lặn, không có = không di truyền. p = tần suất gen */
const TRAITS={
  /* nhãn tính cách: tự hiện khi trục tính cách lên cực cao hoặc cực thấp (ax) */
  siengnang:{n:'Siêng năng',c:'g',ax:1,d:'Cần cù từ 75. Thông thạo mọi nghề tăng thêm 0,4/năm',mm:.4},
  luoi:{n:'Lười biếng',c:'r',ax:1,d:'Cần cù dưới 25. Thông thạo tăng chậm 0,4/năm, chỉ số tăng chậm 20%',mm:-.4,growAll:-.2},
  tamvong:{n:'Tham vọng',c:'g',ax:1,d:'Tham vọng từ 75. Luôn muốn hơn người, khó thấy đủ',tam:-2,cond:.01},
  anphan:{n:'An phận',c:'g',ax:1,d:'Tham vọng dưới 25. Biết đủ nên vui, nhưng ít muốn tiến thân',tam:3},
  hieuthao:{n:'Hiếu thuận',c:'g',ax:1,d:'Hiếu thuận từ 75. Gia tộc ổn định hơn, nghe lời bề trên',on:2},
  ngonghich:{n:'Ngỗ nghịch',c:'r',ax:1,d:'Hiếu thuận dưới 25. Hay cãi lời, bị ép là chống đối',on:-1.5},
  hoadong:{n:'Hòa đồng',c:'g',ax:1,d:'Hòa đồng từ 75. Dễ kết thân, nhà thêm êm ấm',on:1},
  codoc:{n:'Cô độc',c:'r',ax:1,d:'Hòa đồng dưới 25. Thích một mình, khó gần',tam:-1},
  tulap:{n:'Tự lập',c:'g',ax:1,d:'Tự lập từ 75. Muốn tự lo, bị cấm có thể tự ý làm'},
  duadam:{n:'Dựa dẫm',c:'r',ax:1,d:'Tự lập dưới 25. Việc gì cũng trông vào người nhà',cond:-.01},
  ganda:{n:'Gan dạ',c:'g',ax:1,d:'Gan dạ từ 75. Lựa chọn mạo hiểm dễ thành hơn',cond:.04},
  nhutnhat:{n:'Nhút nhát',c:'r',ax:1,d:'Gan dạ dưới 25. Lựa chọn mạo hiểm khó thành hơn',cond:-.05},
  thatthat:{n:'Thật thà',c:'g',ax:1,d:'Thành thật từ 75. Được tin cậy, danh vọng tăng dần',fame:.05},
  gianxao:{n:'Gian xảo',c:'r',ax:1,d:'Thành thật dưới 25. Giỏi lừa lọc, lộ ra thì mất tiếng',fame:-.05,on:-1},
  rongluong:{n:'Rộng lượng',c:'g',ax:1,d:'Rộng lượng từ 75. Hay giúp người, được quý, tiêu nhiều hơn chút',fame:.1,spend:.1},
  ichky:{n:'Ích kỷ',c:'r',ax:1,d:'Rộng lượng dưới 25. Chỉ nghĩ cho mình, người nhà khó chịu',on:-1,spend:-.1},
  diemtinh:{n:'Điềm tĩnh',c:'g',ax:1,d:'Điềm tĩnh từ 75. Gặp chuyện không rối',cond:.02},
  nongtinh:{n:'Nóng nảy',c:'r',ax:1,d:'Điềm tĩnh dưới 25. Dễ gây chuyện, EQ tăng chậm',grow:{eq:-.3},on:-2},
  tietche:{n:'Tiết chế',c:'g',ax:1,d:'Tiết chế từ 75. Khó sa vào thói hư tật xấu',spend:-.1},
  buongtha:{n:'Buông thả',c:'r',ax:1,d:'Tiết chế dưới 25. Rất dễ nhiễm tật xấu',spend:.2},
  kiendinh:{n:'Kiên định',c:'g',ax:1,d:'Ý chí từ 75. Đã làm là làm tới cùng, dễ bỏ được tật xấu',cond:.02},
  nhunhuoc:{n:'Nhu nhược',c:'r',ax:1,d:'Ý chí dưới 25. Dễ bị rủ rê, khó bỏ tật xấu',cond:-.02},
  khokhao:{n:'Khờ khạo',c:'r',ax:1,d:'Trí thấp mà thật thà. Tốt bụng nhưng dễ bị lừa',fame:.03},
  muuluoc:{n:'Mưu lược',c:'g',ax:1,d:'Trí cao và cơ mưu giỏi. Khó bị lừa, giỏi tính kế',cond:.02},
  thongminh:{n:'Sáng dạ',c:'g',gene:'D',p:.08,d:'Trí tuệ tăng nhanh hơn 30%',grow:{tri:.3}},
  khoemanh:{n:'Thân thể cường tráng',c:'g',gene:'D',p:.08,d:'Hồi sức nhanh, già chậm hơn 5 năm',hp:.3,decl:5},
  duyendang:{n:'Duyên dáng',c:'g',gene:'D',p:.08,d:'Mị lực tăng nhanh hơn 30%',grow:{mi:.3}},
  khoeo:{n:'Khéo tay',c:'g',gene:'r',p:.25,d:'Thông thạo nghề thợ, y, nghệ tăng thêm 0,5/năm',mmJobs:['tho','y','nghe'],mm:.5},
  lacquan:{n:'Lạc quan',c:'g',gene:'D',p:.1,d:'Tâm trạng +6',tam:6},
  tietkiem:{n:'Tằn tiện',c:'g',d:'Chi tiêu của bản thân giảm 30%',spend:-.3},
  khieubuon:{n:'Có khiếu buôn bán',c:'g',gene:'r',p:.2,d:'Đi buôn và kinh doanh lãi thêm 10%',trade:.1},
  trinho:{n:'Trí nhớ tốt',c:'g',gene:'r',p:.2,d:'Điểm thi +5',exam:5},
  nhanhau:{n:'Nhân hậu',c:'g',d:'Danh vọng cá nhân tăng dần',fame:.15},
  omyeu:{n:'Ốm yếu',c:'r',gene:'r',p:.2,d:'Hồi sức chậm, dễ nhiễm bệnh, già sớm 5 năm',hp:-.3,decl:-5,sick:1.6},
  thamlam:{n:'Tham lam',c:'r',d:'Liêm chính giảm dần, dễ nhận hối lộ',liem:-.5},
  hoangphi:{n:'Hoang phí',c:'r',d:'Chi tiêu của bản thân tăng 50%',spend:.5},
  danghi:{n:'Đa nghi',c:'r',d:'Tâm trạng -4, khó hòa thuận',tam:-4,on:-1},
  doanmenh:{n:'Đoản mệnh',c:'r',gene:'r',p:.15,d:'Già sớm 8 năm',decl:-8},
  vungve:{n:'Vụng về',c:'r',d:'Thông thạo nghề thợ, y, nghệ tăng chậm 0,5/năm',mmJobs:['tho','y','nghe'],mm:-.5},
  xauxa:{n:'Ăn nói khó nghe',c:'r',d:'EQ tăng chậm, dễ mất lòng',grow:{eq:-.3}},
  thientai:{n:'Thiên tài',c:'p',gene:'r',p:.06,d:'Mọi chỉ số tăng nhanh 40%, dễ phá giới hạn',growAll:.4,brk:10},
  phuctinh:{n:'Phúc tinh',c:'p',d:'Cơ duyên +30, gặp nhiều kỳ ngộ tốt',duyen:30},
  thanluc:{n:'Thần lực',c:'p',gene:'D',p:.02,d:'Võ lực tăng nhanh 50%, rèn được tới 115',grow:{vo:.5},capUp:{vo:15}},
  khuynhthanh:{n:'Khuynh thành',c:'p',gene:'D',p:.02,d:'Mị lực rèn được tới 115',grow:{mi:.4},capUp:{mi:15}},
  ythanh:{n:'Y thánh căn cốt',c:'p',d:'Nghề y tăng thông thạo gấp đôi',mmJobs:['y'],mm:1},
  vankhuc:{n:'Văn Khúc tinh',c:'p',d:'Điểm thi +12, Trí rèn được tới 115',exam:12,capUp:{tri:15}},
  satinh:{n:'Sát tinh',c:'p',d:'Chiến công gấp rưỡi, nhưng dễ đổ máu',merit:.5,cond:.03},
  bachdoc:{n:'Bách độc bất xâm',c:'p',d:'Gần như không nhiễm dịch',sick:.1},
  kytaibuon:{n:'Kỳ tài thương đạo',c:'p',d:'Buôn bán, kinh doanh lãi thêm 30%',trade:.3},
  thienmenh:{n:'Thiên mệnh',c:'p',d:'Mưu đại sự dễ thành hơn',coup:15}};

/* cây trồng: y = giá trị đồng/mẫu/năm ở giá thường, harv = tháng thu, risk = rủi ro mất mùa, lab = công lao động, g = hàng hóa */
const CROPS={
  lua:{n:'Lúa nước',y:1600,harv:[6,10],risk:.1,lab:1,g:'lua',d:'Hai vụ chiêm và mùa. Ổn định, ai cũng cần ăn.'},
  ngo:{n:'Ngô khoai',y:1100,harv:[9],risk:.04,lab:.8,g:'ngo',d:'Chịu hạn, ít công, giá thấp. Năm đói thì đắt.'},
  dau:{n:'Dâu nuôi tằm',y:2700,harv:[4,7],risk:.25,lab:1.5,g:'to',d:'Cho tơ lụa. Công phu, tằm dễ bệnh.'},
  bong:{n:'Bông',y:2100,harv:[9],risk:.14,lab:1.1,g:'bong',d:'Bán cho phường dệt.'},
  che:{n:'Chè',y:2400,harv:[4,8],risk:.12,lab:1.2,g:'che',d:'Thương lái mua lên kinh và ra biên ải.'},
  mia:{n:'Mía',y:2200,harv:[12],risk:.1,lab:1.2,g:'duong',d:'Ép đường, thu một vụ cuối năm.'},
  duoc:{n:'Dược liệu',y:3300,harv:[10],risk:.2,lab:1.3,g:'duoc',lock:1,d:'Cần người nhà làm nghề y hoặc được truyền cách trồng qua kỳ ngộ. Năm dịch giá vọt lên.'},
  chiem:{n:'Lúa Chiêm Thành',y:2200,harv:[5,9],risk:.06,lab:1,g:'lua',lock:1,d:'Giống lúa chín sớm từ phương Nam. Chỉ có được nhờ kỳ ngộ.'},
  khoai:{n:'Khoai lang đất mới',y:1700,harv:[8],risk:.02,lab:.7,g:'ngo',lock:1,d:'Giống khoai từ thuyền buôn ngoại quốc, gần như không mất mùa.'}};
/* hàng hóa: giá gốc đồng/đơn vị */
const GOODS={
  lua:{n:'Lúa gạo',u:'thạch',p:600},ngo:{n:'Ngô khoai',u:'thạch',p:350},to:{n:'Tơ lụa',u:'súc',p:2500},bong:{n:'Bông vải',u:'kiện',p:1200},
  che:{n:'Chè',u:'gánh',p:1800},duong:{n:'Đường mía',u:'gánh',p:1400},duoc:{n:'Dược liệu',u:'gánh',p:2500},muoi:{n:'Muối',u:'gánh',p:800},
  gom:{n:'Gốm sứ',u:'thúng',p:1500},sat:{n:'Sắt thép',u:'gánh',p:1800},go:{n:'Gỗ quý',u:'cây',p:2000},huong:{n:'Hương liệu ngoại',u:'hộp',p:6000}};
/* tuyến buôn: mo = tháng, risk, mm = thông thạo cần, cap = vốn tối đa (đồng), sell = hệ số giá bán, buy = hàng rẻ ở nơi đó */
const ROUTES=[
  {n:'Chợ huyện lân cận',mo:1,risk:.04,mm:0,cap:15000,sell:{lua:1.05,ngo:1.05,muoi:1.1},buy:{},d:'Gần, an toàn, lãi mỏng.'},
  {n:'Phủ thành',mo:2,risk:.07,mm:15,cap:80000,sell:{to:1.15,che:1.15,gom:1.1,muoi:1.12,duoc:1.1},buy:{sat:.9,go:.9},d:'Phố xá đông đúc.'},
  {n:'Kinh thành',mo:4,risk:.1,mm:30,cap:400000,sell:{to:1.3,che:1.25,duoc:1.3,gom:1.2,huong:1.2,lua:1.12},buy:{gom:.85,sat:.9},d:'Chốn phồn hoa, quan lại nhiều, hàng quý đắt giá.'},
  {n:'Biên ải Tây Bắc',mo:6,risk:.2,mm:45,cap:1500000,sell:{muoi:1.6,che:1.5,sat:1.4,to:1.3,lua:1.35,duong:1.3},buy:{duoc:.7,go:.65},d:'Đường xa, cướp nhiều. Thời chiến đóng cửa.',war:1},
  {n:'Hải cảng phương Nam',mo:5,risk:.15,mm:40,cap:1200000,sell:{to:1.4,gom:1.45,che:1.35,lua:1.2},buy:{huong:.7,duong:.8},d:'Thuyền buôn ngoại quốc tấp nập.'},
  {n:'Vượt biển sang ngoại quốc',mo:9,risk:.3,mm:70,cap:6000000,sell:{to:1.9,gom:2,che:1.8,duoc:1.4},buy:{huong:.55,sat:.8},d:'Một vốn bốn lời hoặc mất trắng. Bão biển, hải tặc.',sea:1}];

/* cơ sở kinh doanh. lv: tên, giá mở/mở rộng, doanh thu tối đa/tháng, tiền thuê/tháng, vị trí cần thêm ở bậc đó */
const ROLES={
  banhang:{n:'Người bán hàng',req:{kl:35},w:450},bep:{n:'Đầu bếp',req:{kl:45},w:600},thungan:{n:'Thu ngân, sổ sách',req:{tt:50},w:700},
  phu:{n:'Phu việc',req:{sm:40},w:400},tho:{n:'Thợ',req:{kl:50,sm:30},w:650},thoca:{n:'Thợ cả',req:{kl:70},w:1200},
  laibuon:{n:'Lái buôn',req:{tt:50,kl:40},w:1000},quanly:{n:'Quản lý',req:{tt:65,kl:45},w:1800},
  boc:{n:'Người bốc thuốc',req:{tt:45,kl:40},w:600},thay:{n:'Thầy giáo',req:{tt:65},w:1200},vosu:{n:'Võ sư',req:{sm:65,kl:40},w:1100},
  tieusu:{n:'Tiêu sư',req:{sm:60},w:1000},dao:{n:'Đào kép',req:{kl:55},w:800},thuyenphu:{n:'Thủy thủ',req:{sm:50},w:550},
  chantrau:{n:'Người chăn nuôi',req:{sm:35,kl:30},w:400}};
const BIZ={
  quantra:{n:'Quán trà',owner:[['tieunhi',1],['hangrong',1]],st:'eq',lv:[['Quán cóc ven đường',5000,1300,80,['banhang']],['Quán trà',30000,6000,500,['bep','banhang']],['Trà lâu',150000,24000,2000,['thungan','banhang','bep']],['Đại tửu lâu',700000,80000,7000,['quanly','bep','banhang','banhang']]],d:'Bán trà, rượu, đồ ăn. Doanh thu theo người qua lại.'},
  tiem:{n:'Hiệu buôn',owner:[['tieunhi',2]],st:'eq',lv:[['Sạp hàng',15000,3000,200,['banhang']],['Cửa hiệu',80000,12000,900,['thungan','phu']],['Hiệu buôn lớn',400000,50000,4000,['laibuon','banhang','phu']],['Thương hội',2000000,200000,15000,['quanly','laibuon','laibuon','thungan']]],d:'Mua đi bán lại. Chủ hiệu được đi buôn chuyến lớn.'},
  xuong:{n:'Xưởng thủ công',owner:[['tho',2]],st:'vo',lv:[['Xưởng nhỏ',12000,2600,150,['tho']],['Xưởng',70000,11000,800,['tho','phu']],['Công xưởng',350000,45000,3500,['thoca','tho','tho']],['Danh xưởng',1800000,160000,12000,['thoca','thoca','tho','quanly']]],d:'Nhận đơn đặt hàng, làm hàng bán.'},
  yquan:{n:'Y quán',owner:[['y',2]],st:'tri',lv:[['Y quán nhỏ',15000,3200,200,['boc']],['Y quán',80000,13000,900,['boc','phu']],['Đại y quán',400000,50000,4000,['boc','boc','thungan']],['Y viện',2000000,170000,14000,['quanly','boc','boc','boc']]],d:'Khám bệnh bốc thuốc. Năm dịch đông khách.'},
  truong:{n:'Trường tư',owner:[['su',2,{tri:75}],['su',3]],st:'tri',lv:[['Trường làng',8000,2000,100,[]],['Tư thục',50000,8000,600,['thay']],['Thư viện',300000,30000,2500,['thay','thay','thungan']],['Đại thư viện',1500000,110000,9000,['quanly','thay','thay','thay']]],d:'Dạy học lấy học phí. Học trò đỗ đạt thì danh tiếng lên.'},
  voquan:{n:'Võ quán',owner:[['tieu',1],['_vo',90]],st:'vo',lv:[['Võ đường nhỏ',10000,2200,120,[]],['Võ quán',60000,9000,700,['vosu']],['Võ phái',350000,36000,3000,['vosu','vosu','thungan']],['Đại môn phái',1800000,130000,11000,['quanly','vosu','vosu','vosu']]],d:'Dạy võ. Hay bị người đến đá quán.'},
  tieucuc:{n:'Tiêu cục',owner:[['tieu',2]],st:'vo',lv:[['Tiêu cục nhỏ',40000,7000,500,['tieusu','tieusu']],['Tiêu cục',200000,28000,2000,['tieusu','tieusu','tieusu','thungan']],['Đại tiêu cục',1000000,100000,7000,['quanly','tieusu','tieusu','tieusu','tieusu']]],d:'Nhận áp tải hàng cho thương nhân.'},
  ganhhat:{n:'Gánh hát',owner:[['nghe',1]],st:'mi',lv:[['Gánh hát rong',8000,2200,100,['dao']],['Gánh hát',50000,9000,600,['dao','dao','phu']],['Hí viện',300000,34000,2500,['dao','dao','dao','thungan']],['Đệ nhất hí lâu',1500000,120000,9000,['quanly','dao','dao','dao','dao']]],d:'Diễn tuồng, hát xướng.'},
  thuyen:{n:'Đội thuyền buôn',owner:[['ngu',2]],st:'eq',lv:[['Thuyền buôn',60000,9000,600,['thuyenphu','thuyenphu']],['Đội thuyền',350000,40000,3000,['thuyenphu','thuyenphu','laibuon']],['Thương thuyền viễn dương',2000000,180000,14000,['quanly','laibuon','thuyenphu','thuyenphu','thuyenphu']]],d:'Chở hàng thuê theo đường sông, đường biển.'},
  trai:{n:'Trại chăn nuôi',owner:[['chan',1]],st:'suc',lv:[['Trại nhỏ',6000,1600,60,['chantrau']],['Trại',40000,6500,400,['chantrau','chantrau']],['Trang trại lớn',250000,26000,2000,['chantrau','chantrau','chantrau','thungan']]],d:'Nuôi trâu bò, lợn gà bán ra chợ.'}};

/* gia quy */
const RULES={
  hieuhoc:{n:'Trọng việc học',d:'Con cháu học nhanh hơn 15%, chi tiêu +5%'},
  cambac:{n:'Cấm cờ bạc rượu chè',d:'Khó nhiễm thói xấu, ổn định +4'},
  tietkiem:{n:'Cần kiệm',d:'Chi tiêu -10%, tâm trạng -3'},
  nghia:{n:'Trọng nghĩa',d:'Danh vọng gia tộc tăng dần, tốn 2% thu nhập'},
  nghiem:{n:'Gia pháp nghiêm minh',d:'Ổn định +8, tâm trạng -2'},
  hoathuan:{n:'Hòa thuận làm đầu',d:'Ổn định +4, EQ tăng thêm'},
  trongnong:{n:'Dĩ nông vi bản',d:'Hoa lợi ruộng +10%, buôn bán lãi -5%'},
  trongthuong:{n:'Trọng thương',d:'Buôn bán, kinh doanh lãi +8%, danh vọng gia tộc hao dần'},
  thuongvo:{n:'Thượng võ',d:'Võ lực tăng nhanh 15%, chiến công +20%'},
  hieudao:{n:'Hiếu đạo làm đầu',d:'Con cháu hiếu thuận hơn, ổn định +3'},
  tuquyet:{n:'Con cháu tự quyết',d:'Tâm trạng +4, phỏng vấn nghề theo ý mình dễ đỗ hơn, kém hiếu thuận'},
  nuhoc:{n:'Nữ nhi được đi học',d:'Con gái được đến trường như con trai'},
  tichcoc:{n:'Tích cốc phòng cơ',d:'Mỗi vụ giữ lại 10% thóc vào kho'},
  thanhliem:{n:'Gia phong thanh liêm',d:'Quan trong nhà không tham, lộc ngoài -50%, danh vọng gia tộc tăng dần'},
  doanket:{n:'Huynh đệ đồng lòng',d:'Người trong nhà dễ thân nhau, ít cãi vã'},
  dichton:{n:'Trọng đích tôn',d:'Ổn định +4, con thứ tâm trạng -3'}};

/* năm vùng: p = hệ số giá hàng, crop = hệ số hoa lợi, war/epi = nguy cơ chiến sự, dịch */
const REGIONS={
  trung:{n:'Trung Châu',d:'Đồng bằng rộng lớn giáp biển phía đông, đất kinh kỳ, quan lại đông đúc.',spec:'Lúa gạo, gốm sứ',x:50,y:52,
    p:{lua:.85,ngo:.95,to:1,bong:1,che:1.1,duong:1.1,duoc:1,muoi:1.15,gom:.8,sat:1,go:1.1,huong:1.4},crop:{lua:1.1},war:.8,epi:1,unlock:[]},
  bac:{n:'Bắc Nguyên',d:'Thảo nguyên lạnh giá, ngựa tốt, mỏ sắt. Các bộ tộc du mục hay quấy nhiễu.',spec:'Sắt thép, gỗ, ngô khoai',x:50,y:16,
    p:{lua:1.3,ngo:.8,to:1.35,bong:1.2,che:1.4,duong:1.4,duoc:.9,muoi:1.2,gom:1.3,sat:.6,go:.7,huong:1.6},crop:{lua:.8,ngo:1.2,dau:.7,che:.6,mia:.5},war:1.7,epi:.8,unlock:[]},
  dong:{n:'Đông Hải',d:'Quần đảo phía đông, ruộng muối, làng chài, thuyền buôn ngoại quốc.',spec:'Muối, hương liệu ngoại',x:86,y:50,
    p:{lua:1,ngo:1,to:1.1,bong:1,che:1.1,duong:1,duoc:1.1,muoi:.5,gom:1,sat:1.15,go:1.15,huong:.8},crop:{},war:.9,epi:1,unlock:[],sea:1},
  nam:{n:'Nam Cương',d:'Đồi núi, rừng mưa, nước độc. Dược liệu, mía đường, lúa chín sớm. Dịch bệnh nhiều.',spec:'Dược liệu, đường, gỗ quý',x:50,y:86,
    p:{lua:.95,ngo:1,to:1.2,bong:1.1,che:.9,duong:.65,duoc:.55,muoi:1.1,gom:1.25,sat:1.3,go:.65,huong:.75},crop:{mia:1.3,duoc:1.3,lua:1.05},war:.9,epi:1.5,unlock:['chiem'],sea:1},
  tay:{n:'Tây Mạc',d:'Sa mạc, bán sa mạc và ốc đảo trên con đường tơ lụa. Thương đoàn phương Tây qua lại.',spec:'Bông, muối mỏ, hương liệu',x:14,y:50,
    p:{lua:1.35,ngo:1.1,to:1.6,bong:.75,che:1.6,duong:1.3,duoc:.9,muoi:.75,gom:1.5,sat:.9,go:1.4,huong:.6},crop:{bong:1.3,lua:.7,dau:.8},war:1.3,epi:.9,unlock:[]}};
const DIST={trung:{bac:4,dong:3,nam:4,tay:6},bac:{dong:5,nam:7,tay:5},dong:{nam:4,tay:8},nam:{tay:7}};

/* tính cách: m = điều chỉnh chỉ số phụ, tam = tâm trạng, say = câu cửa miệng */
const SUBS=[['tv','Tham vọng'],['cc','Cần cù'],['ht','Hiếu thuận'],['hd','Hòa đồng'],['dl','Tự lập']];
const PERSONA={
  tram:{n:'Trầm tĩnh',m:{hd:-10,cc:5},say:'Việc gì cũng nên nghĩ kỹ.'},
  hoat:{n:'Hoạt bát',m:{hd:15},say:'Nhà phải đông vui mới là nhà.'},
  cuong:{n:'Cương trực',m:{dl:10,ht:-5},say:'Sai thì nói sai, đúng thì nói đúng.'},
  khon:{n:'Khôn khéo',m:{hd:10,tv:5},say:'Một điều nhịn chín điều lành, nhưng phải được việc.'},
  langman:{n:'Lãng mạn',m:{cc:-5,hd:5},say:'Đời người ngắn ngủi, phải sống cho đáng.'},
  thucte:{n:'Thực tế',m:{cc:10,tv:5},say:'Có thực mới vực được đạo.'},
  cochap:{n:'Cố chấp',m:{dl:15,ht:-10},say:'Đã quyết thì không đổi.'},
  nhumi:{n:'Nhu mì',m:{ht:15,dl:-10},say:'Người trên bảo sao con nghe vậy.'},
  hieuthang:{n:'Hiếu thắng',m:{tv:20,hd:-5},say:'Thua ai cũng được, không được thua nó.'},
  phongtung:{n:'Phóng túng',m:{cc:-15,dl:10},say:'Trói chân người ta làm gì.'},
  cantrong:{n:'Cẩn trọng',m:{cc:5,tv:-5},say:'Cẩn tắc vô áy náy.'},
  mongmo:{n:'Mơ mộng',m:{cc:-10,tv:5},say:'Một ngày nào đó...'},
  kieu:{n:'Kiêu ngạo',m:{tv:10,hd:-15},say:'Người thường sao sánh được với ta.'},
  khiem:{n:'Khiêm nhường',m:{hd:10,tv:-10},say:'Núi cao còn có núi cao hơn.'},
  dasau:{n:'Đa sầu đa cảm',m:{hd:-5,ht:5},tam:-4,say:'Lòng cứ nao nao không yên.'},
  haosang:{n:'Hào sảng',m:{hd:15,cc:-5},tam:3,say:'Tiền bạc là của ngoài thân.'}};
/* ba con đường khi gia chủ định nghề */
const PATHS={van:{n:'Văn',d:'Chữ nghĩa, thuốc thang, đàn hát',jobs:['su','y','nghe','hau']},vo:{n:'Võ',d:'Sức vóc, võ nghệ, tay nghề',jobs:['tieu','tho','khuanvac','tieuphu','nong']},thuong:{n:'Thương',d:'Buôn bán, chăn nuôi, sông nước',jobs:['tieunhi','hangrong','ngu','chan']}};


/* chức quan: r = phẩm (0 Cửu → 8 Nhất), mul = hệ số bổng, side = hệ số lộc ngoài, req = chỉ số cần, tag = loại việc (quyết định kỳ ngộ), seats = số ghế */
const OFFICES={
  huandao:{n:'Huấn đạo huyện học',r:0,mul:.95,side:.2,req:{tri:50},tag:'hoc',d:'Dạy dỗ sinh đồ trong huyện.'},
  dienSu:{n:'Điển sử',r:0,mul:1,side:1,req:{tri:40,vo:40},tag:'an',d:'Coi ngục, bắt trộm cướp trong huyện.'},
  dichthua:{n:'Dịch thừa',r:0,mul:.9,side:.8,req:{tri:40,eq:40},tag:'dan',d:'Coi trạm dịch, đón đưa quan khách.'},
  huyenthua:{n:'Huyện thừa',r:1,mul:1,side:1.1,req:{tri:52,eq:45},tag:'dan',d:'Phó quan huyện, lo lương thực, hộ tịch.'},
  giaodu:{n:'Giáo dụ phủ học',r:1,mul:.95,side:.2,req:{tri:60},tag:'hoc',d:'Đứng đầu phủ học.'},
  hobac:{n:'Hà bạc sở đại sứ',r:1,mul:1,side:1.6,req:{tri:45,eq:50},tag:'thue',d:'Thu thuế bến sông, chợ cá. Béo bở, dễ bị dòm ngó.'},
  trihuyen:{n:'Tri huyện',r:2,mul:1.05,side:1.5,req:{tri:58,eq:50},tag:'dan',d:'Phụ mẫu chi quan, nắm cả việc dân, thuế, án.'},
  ngusu:{n:'Giám sát ngự sử',r:2,mul:1,side:.3,req:{tri:62,eq:40},tag:'giam',d:'Đàn hặc quan lại. Được nghe phong thanh tấu sự.'},
  bientu:{n:'Hàn lâm biên tu',r:2,mul:.9,side:.15,req:{tri:70},tag:'kinh',d:'Soạn sử, thảo văn thư cho triều đình. Gần vua, lương thấp.'},
  chusu:{n:'Chủ sự lục bộ',r:3,mul:1,side:.8,req:{tri:65,eq:50},tag:'kinh',d:'Làm việc ở một trong sáu bộ.'},
  thongphan:{n:'Thông phán phủ',r:3,mul:1,side:1.1,req:{tri:62,eq:55},tag:'an',d:'Lo hình án, lương thảo cấp phủ.'},
  capsu:{n:'Cấp sự trung',r:3,mul:1.05,side:.3,req:{tri:72,eq:50},tag:'giam',d:'Phong bác chiếu chỉ, giám sát lục bộ.'},
  trichau:{n:'Tri châu',r:4,mul:1.05,side:1.5,req:{tri:68,eq:60},tag:'dan',d:'Cai trị một châu.'},
  vienngoai:{n:'Viên ngoại lang',r:4,mul:1,side:.9,req:{tri:72,eq:55},tag:'kinh',d:'Phó ty ở bộ.'},
  thigiang:{n:'Hàn lâm thị giảng',r:4,mul:.95,side:.15,req:{tri:85,mi:50},tag:'hoc',d:'Giảng sách cho Thái tử.'},
  triphu:{n:'Tri phủ',r:5,mul:1.1,side:1.6,req:{tri:75,eq:65},tag:'dan',d:'Cai trị một phủ, dưới tay mấy chục huyện.'},
  thieukhanh:{n:'Thiếu khanh tự',r:5,mul:1,side:.8,req:{tri:78,eq:60},tag:'kinh',d:'Phó quan ở Đại lý tự, Thái thường tự.'},
  bochinh:{n:'Bố chính sứ',r:6,mul:1.1,side:1.7,req:{tri:82,eq:70},tag:'thue',d:'Nắm tài chính, dân chính một tỉnh.'},
  ansat:{n:'Án sát sứ',r:6,mul:1.05,side:1,req:{tri:82,eq:60},tag:'an',d:'Nắm hình án một tỉnh.'},
  thilang:{n:'Thị lang',r:6,mul:1,side:1,req:{tri:85,eq:70},tag:'kinh',d:'Phó quan một bộ.'},
  thuongthu:{n:'Thượng thư',r:7,mul:1.1,side:1.2,req:{tri:95,eq:80},tag:'kinh',d:'Đứng đầu một bộ.'},
  dongusu:{n:'Đô ngự sử',r:7,mul:1.05,side:.4,req:{tri:95,eq:70},tag:'giam',d:'Đứng đầu Đô sát viện, ai cũng kiêng nể.'},
  tongdoc:{n:'Tổng đốc',r:7,mul:1.15,side:1.6,req:{tri:90,eq:80,vo:50},tag:'dan',d:'Trấn giữ mấy tỉnh, nắm cả binh lẫn dân.'},
  daihocsi:{n:'Đại học sĩ nội các',r:8,mul:1.2,side:1,req:{tri:115,eq:95},tag:'kinh',d:'Tể tướng trong triều, dưới một người trên vạn người.'}};

const WARS=['giặc phương Bắc tràn xuống','quân Tây Lương xâm phạm biên giới','giặc biển cướp phá duyên hải','loạn quân phương Nam nổi dậy','phiên vương làm phản'];

/* ================= v6.0: tên, xuất thân, tính cách, năng lực, tật xấu ================= */
const SURN2=['Âu','Bạch','Biện','Cao','Chu','Châu','Chung','Đàm','Đào','Đinh','Đoàn','Đồng','Giang','Hạ','Hầu','Hứa','Khổng','Khúc','Kim','La','Lạc','Lâm','Liễu','Long','Lư','Lương','Lưu','Mã','Mạnh','Nghiêm','Nhan','Ninh','Ông','Phan','Phí','Phùng','Quan','Quản','Tân','Tào','Thái','Thân','Thôi','Tiêu','Tôn','Tống','Trang','Trịnh','Trình','Trương','Từ','Ứng','Vạn','Vi','Viên','Vương','Yên','Tần','Tiết','Hạng','Âu Dương','Gia Cát','Tư Mã','Thượng Quan','Công Tôn','Nam Cung','Hoàng Phủ','Uất Trì'];
SURN.push(...SURN2);
const MMID=['Văn','Đức','Hữu','Minh','Quang','Thế','Trọng','Gia','Đình','Bá','Công','Khắc','Duy','Chí','Tử','Thừa','Đăng','Hoài','Bảo','Thiên','Mạnh','Quốc','Xuân','Ngọc','Tuấn','Huy','Phúc','Trung','Tất','Kim','Viết','Như','Nhật','Hồng','Cảnh','Vĩnh','Thanh','Hạo','Tư','Sĩ'];
const MGIV=['An','Bách','Bảo','Bình','Cảnh','Chính','Chương','Cương','Dũng','Duy','Dương','Đạt','Đăng','Đức','Định','Đoan','Giang','Hạo','Hào','Hải','Hiên','Hiển','Hiếu','Hòa','Hoàng','Huân','Hùng','Huy','Hưng','Khang','Khải','Khanh','Khiêm','Khoa','Khôi','Kiên','Kiệt','Kính','Lâm','Lân','Lập','Lễ','Liêm','Lộc','Long','Luân','Lương','Mẫn','Mạnh','Minh','Nam','Nghĩa','Nghị','Nguyên','Nhân','Nhạc','Nhuận','Ninh','Phong','Phú','Phúc','Phương','Quân','Quang','Quảng','Quý','Sơn','Tài','Tâm','Tân','Thạc','Thái','Thắng','Thành','Thiện','Thịnh','Thông','Thuận','Thụy','Tiến','Tín','Toàn','Trác','Trí','Triết','Trung','Trực','Trường','Tú','Tuấn','Tùng','Tường','Uy','Viễn','Việt','Vinh','Vĩnh','Vũ','Xương','Ẩn','Bằng','Cát','Chấn','Doãn','Đông','Hành','Hậu','Hựu','Kế','Khoát','Kỳ','Lạc','Liệt','Mặc','Ngạn','Ngôn','Phác','Quyết','Sách','Siêu','Tấn','Thạch','Thiều','Thực','Tiềm','Tĩnh','Tráng','Trạch','Triều','Tuyên','Ứng','Vận','Vỹ','Xuyên','Cẩn','Cử','Đỉnh','Giám','Hãn','Hoành','Huấn','Khâm','Kình','Lãm','Mậu','Nhiếp','Phấn','Phụng','Tề','Thuyên','Tích','Tụng','Ước','Diễn','Dực','Hiệp','Khuê','Lãng','Nhiên','Sảng','Tuệ','Hoằng','Uẩn'];
const FMID=['Thị','Ngọc','Thanh','Mỹ','Bích','Diệu','Tuệ','Như','Kiều','Minh','Tố','Vân','Hoài','Cẩm','Thu','Ánh','Quỳnh','Mộng','Uyển','Thục','Hải','Lệ','Bảo','Kim','Nguyệt','Tịnh','Xuân','Hồng','Phương','Thúy'];
const FGIV=['An','Anh','Ánh','Bích','Châu','Chi','Diệp','Diệu','Dung','Duyên','Đào','Giao','Hà','Hạnh','Hằng','Hân','Hiền','Hoa','Huệ','Hương','Khanh','Khuê','Kiều','Lam','Lan','Liên','Liễu','Linh','Loan','Lụa','Mai','Mẫn','My','Nga','Ngân','Nghi','Ngọc','Nguyệt','Nhạn','Nhàn','Nhi','Nhung','Oanh','Phượng','Quế','Quyên','Quỳnh','Sương','Tâm','Thanh','Thảo','Thoa','Thơ','Thục','Thùy','Thư','Thương','Tiên','Trâm','Trang','Trinh','Tú','Tuyết','Uyên','Vân','Vi','Xuân','Yến','Ý','Bội','Cầm','Đoan','Hồng','Lạc','Lệ','Mộng','Nhã','Như','Phương','San','Sa','Tịnh','Tố','Uyển','Viên','Ngưng','Hàm','Họa','Huyên','Kỳ','Lộ','Miên','Nghiên','Nhiên','Thiền','Thiều','Vịnh','Yên','Hy','Diễm','Giai','Khánh','Mặc','Ngôn','Thiến','Tình','Tuệ','Vãn','Gấm','Lụa','Nhu','Sen','Trúc','Hoàn','Khiết','Thanh Thanh','Vũ'];
/* tên người ngoài theo vùng (vùng biên có họ tên khác người Trung Châu) */
const RNAME={
  bac:{s:['Thác Bạt','Hô Diên','Vũ Văn','Độc Cô','Mộ Dung','Hách Liên','Khất Phục','A Sử Na','Bột Nhi','Ô Lạc','Đồ Đan','Hạ Lan'],m:['Ba Đồ','A Lặc','Tô Hách','Mặc Đặc','Cát Nhĩ','Nạp Nhan','Tát Lý','Khắc Liệt','Bột Đô','Ha Nhĩ Ba','Thiết Lặc','A Cổ Đả','Đa Nhĩ Cổn','Ô Lực'],f:['Ô Lan','Tát Nhân','A Y','Tô Mộc','Đa Na','Kỳ Kỳ Cách','Tháp Na','Á Lan','Thủy Mộc','Cáp Na']},
  tay:{s:['An','Khang','Sử','Thạch','Mễ','Hà','Tào','Mục','Nhiếp','Bạt'],m:['Mạt Hạ','Già Diệp','Bà La','Tát Bảo','Đà La','Nặc Tư','Mục Sa','A Tát','Cầu Đàm','Ca Lâu','Duy Mã','Tô Lặc'],f:['A Thiếp','Y Lỵ','Sa Na','Mỹ Na','La Y','Đề Na','Á Sa','Lỵ Á','Tát Lan','Mạn Đà']},
  nam:{s:['Mông','Bàn','Lô','Sầm','Nùng','Vi','Lục','Ngưu','Đao','Cầm','Hoàng','Dương'],m:['A Tráng','Mạc Lão','Diệp Ngưu','Thạch Đầu','A Bảo','A Mộc','Lão Hùng','Sơn Cẩu','Mãnh Hổ','Kim Lôi','A Lực','Đại Mộc'],f:['A Diệp','A Lan','Mộc Hương','Ngân Hoa','A Hoa','Thải Vân','Lam Điệp','A Nhụy','Sơn Trà','Bạch Lan']},
  dong:{s:['Hải','Lâm','Thi','Trịnh','Hồng','Lục','Tiêu','Hứa','Ngô','Sái','Bành'],m:null,f:null}};
/* chữ lót theo đời: mỗi đời con trai lấy một chữ */
const POEMS=[
  {n:'Văn đức truyền gia',w:['Văn','Đức','Thế','Gia','Quang','Minh','Trọng','Hữu','Khắc','Kế','Thừa','Bảo','Vĩnh','Tường','Trung','Hiếu','Nhân','Nghĩa','Lễ','Trí']},
  {n:'Trung hiếu tiết nghĩa',w:['Trung','Hiếu','Tiết','Nghĩa','Thuần','Lương','Cung','Kiệm','Nhượng','Hòa','Thiện','Tín','Khoan','Mẫn','Huệ','Chính','Trực','Liêm','Minh','Đạt']},
  {n:'Sơn hà vạn cổ',w:['Sơn','Hà','Vạn','Cổ','Trường','Xuân','Thịnh','Thế','Hưng','Long','Vĩnh','Hạo','Nhiên','Chính','Khí','Quang','Hoa','Phú','Quý','Xương']},
  {n:'Thi thư kế thế',w:['Thi','Thư','Kế','Thế','Học','Hải','Vô','Nhai','Cần','Vi','Kính','Đắc','Đạo','Tu','Thân','Tề','Gia','Trị','Quốc','Bình']}];

/* xuất thân của người khai sáng: jobs = nghề có thể, b = cộng chỉ số, ax = khuynh hướng tính cách, sk = năng lực phụ */
const ORIGINS={
  nongho:{n:'Nông hộ',d:'Mấy đời cày thuê cuốc mướn. Còn một mẫu ruộng hương hỏa.',jobs:['nong'],b:{suc:8},ax:{cc:12,tiet:6},sk:{ky:4}},
  thuho:{n:'Nhà thợ',d:'Cha ông làm thợ, chăn nuôi. Có đồ nghề, ít ruộng.',jobs:['tho','chan'],b:{vo:5,suc:4},ax:{cc:10,yc:5},sk:{ky:12}},
  tieuthuong:{n:'Tiểu thương',d:'Con nhà buôn thúng bán mẹt, quen chợ búa từ nhỏ.',jobs:['hangrong','tieunhi'],b:{eq:8},ax:{hd:8,tv:6},sk:{khau:12,ql:4}},
  sondan:{n:'Sơn dân, ngư dân',d:'Lớn lên ở rừng núi hoặc sông nước, quen nắng gió.',jobs:['tieuphu','ngu'],b:{suc:6,vo:4},ax:{gan:12,dl:8},sk:{ky:4}},
  dannghe:{n:'Dân nghèo thành thị',d:'Không ruộng không nghề, sống bằng sức vai và sự sai bảo.',jobs:['khuanvac','hau'],b:{vo:4,eq:4},ax:{dl:6,yc:6},sk:{khau:4}},
  nhosinh:{n:'Nho sinh sa cơ',d:'Nhà có chữ nhưng đã sa sút. Còn tủ sách cũ.',jobs:['su','y'],b:{tri:15},ax:{ht:10,tiet:6},sk:{muu:10},req:{tri:46}},
  vogia:{n:'Võ gia sa sút',d:'Tổ tiên từng làm võ quan, nay chỉ còn thanh đao cũ.',jobs:['tieu'],b:{vo:15},ax:{gan:14,diem:-6},sk:{muu:4},req:{vo:46}},
  nghenhan:{n:'Con nhà hát xướng',d:'Theo gánh hát từ bé, ăn nói duyên dáng.',jobs:['nghe'],b:{mi:15},ax:{hd:10,tiet:-6},sk:{khau:10},req:{mi:46}},
  gianhan:{n:'Gia sinh tử',d:'Sinh ra trong nhà quyền quý làm gia nhân, vừa được chủ trả tự do.',jobs:['hau'],b:{eq:10},ax:{ht:10,dl:-10},sk:{ql:8,khau:6}}};

/* 11 trục tính cách (0..100, 50 là trung bình): [key, tên, nhãn cực cao, nhãn cực thấp, mã đặc tính cao, mã đặc tính thấp] */
const AXES=[
  ['cc','Cần cù','Siêng năng','Lười biếng','siengnang','luoi'],
  ['tv','Tham vọng','Tham vọng','An phận','tamvong','anphan'],
  ['ht','Hiếu thuận','Hiếu thuận','Ngỗ nghịch','hieuthao','ngonghich'],
  ['hd','Hòa đồng','Hòa đồng','Cô độc','hoadong','codoc'],
  ['dl','Tự lập','Tự lập','Dựa dẫm','tulap','duadam'],
  ['gan','Gan dạ','Gan dạ','Nhút nhát','ganda','nhutnhat'],
  ['thanh','Thành thật','Thật thà','Gian xảo','thatthat','gianxao'],
  ['rong','Rộng lượng','Rộng lượng','Ích kỷ','rongluong','ichky'],
  ['diem','Điềm tĩnh','Điềm tĩnh','Nóng nảy','diemtinh','nongtinh'],
  ['tiet','Tiết chế','Tiết chế','Buông thả','tietche','buongtha'],
  ['yc','Ý chí','Kiên định','Nhu nhược','kiendinh','nhunhuoc']];
/* năng lực phụ */
const SKILLS=[['muu','Cơ mưu'],['khau','Khẩu tài'],['ql','Quản trị'],['ky','Kỹ nghệ']];
/* mỗi năm làm nghề: kéo tính cách (ax) và rèn năng lực (sk) */
const JOBX={
  nong:{ax:{cc:1.5,tiet:.5},sk:{ky:1}},tieunhi:{ax:{hd:1,tv:.5},sk:{khau:3,ql:1}},khuanvac:{ax:{gan:.5,tiet:-.5},sk:{}},tieuphu:{ax:{gan:1,dl:1},sk:{ky:1}},
  ngu:{ax:{gan:1,dl:.5},sk:{ky:1}},hangrong:{ax:{hd:1,tv:.5},sk:{khau:3}},hau:{ax:{ht:1,dl:-1},sk:{khau:2,ql:1}},tho:{ax:{cc:1,diem:.5},sk:{ky:4}},
  chan:{ax:{cc:1,diem:.5},sk:{ky:2}},y:{ax:{rong:1,diem:.5},sk:{ky:3,khau:1}},su:{ax:{ht:.5,diem:.5},sk:{khau:3,muu:1}},nghe:{ax:{hd:1,tiet:-.5},sk:{khau:2,ky:1}},
  tieu:{ax:{gan:1.5,yc:.5},sk:{muu:1}},thulai:{ax:{thanh:-.3},sk:{ql:3,muu:1}},nhadich:{ax:{gan:1,rong:-.5},sk:{muu:1}},quan:{ax:{tv:1,thanh:-.3},sk:{muu:3,ql:2,khau:1}},
  nguy:{ax:{diem:1},sk:{ky:3}},quan_ngu:{ax:{gan:1.5,yc:1,diem:-.5},sk:{muu:1}},hiep:{ax:{gan:1.5,dl:1.5},sk:{muu:1}},chu:{ax:{tv:1,dl:1},sk:{ql:4,khau:1}},noi:{ax:{rong:.5,cc:.5},sk:{ql:3}},
  none:{ax:{cc:-1,dl:-.5},sk:{}},huu:{ax:{diem:.5},sk:{}}};
const SCHOOLX={lang:{ax:{ht:1,tiet:1}},tu:{ax:{ht:1.5,tiet:1},sk:{muu:1}},giasu:{ax:{ht:1,tiet:1.5},sk:{muu:2,khau:1}},vodo:{ax:{gan:2,diem:-.5}},nucong:{ax:{ht:1,cc:1},sk:{ql:2}},
  huyen:{ax:{ht:1,tv:1},sk:{muu:2}},danhsu:{ax:{tv:1.5,tiet:1},sk:{muu:3,khau:1}},vodd:{ax:{gan:2,yc:1}},hocy:{ax:{rong:1,cc:1},sk:{ky:3}},hocbuon:{ax:{hd:1,tv:1},sk:{khau:3,ql:1}},hoctho:{ax:{cc:2},sk:{ky:3}},
  phu:{ax:{tv:1,ht:1},sk:{muu:3}},qtg:{ax:{tv:2},sk:{muu:4,khau:2}},vop:{ax:{gan:2,yc:2},sk:{muu:1}},vohk:{ax:{gan:1.5,yc:1},sk:{muu:2}},yhd:{ax:{rong:1.5},sk:{ky:4}},thoi:{ax:{tv:1.5,hd:1},sk:{khau:3,ql:3}},khue:{ax:{tiet:1.5,ht:1},sk:{khau:2,ql:1}}};
const FOCUSX={nghi:{ax:{cc:-.3}},hoc:{ax:{yc:.4,cc:.4},sk:{muu:1}},vo:{ax:{gan:1,yc:.5}},ren:{ax:{yc:.5}},nghe:{ax:{cc:1.5},sk:{ky:2}},giao:{ax:{hd:1.5,tiet:-.5},sk:{khau:3}},cam:{ax:{diem:1},sk:{khau:1}},
  phat:{ax:{diem:1.5,rong:1,tiet:1}},du:{ax:{dl:1,gan:.5}},lac:{ax:{tiet:-2,cc:-1}},giup:{ax:{cc:1.5,rong:.5}},muu:{ax:{yc:.5},sk:{muu:5}},so:{ax:{cc:.5},sk:{ql:5}},bien:{ax:{hd:.5},sk:{khau:4}}};
const LIFEX=[{cc:1,rong:-.5,tiet:.5},{cc:.5},{},{tiet:-.5,cc:-.3},{tiet:-1.5,cc:-1,rong:.5}];
/* tật xấu: base = khả năng nhiễm mỗi tháng, age = tuổi hay nhiễm, chain = dễ kéo theo */
const VICES={
  bac:{base:.0004,age:[14,70],chain:['ruou','trom']},
  ruou:{base:.00035,age:[15,90],chain:['donhau']},
  thanhlau:{base:.0002,age:[16,60],chain:['xahoa','bac']},
  xahoa:{base:.00015,age:[16,80],chain:[]},
  trom:{base:.00025,age:[8,30],chain:['bac']},
  donhau:{base:.00025,age:[10,35],chain:['ruou']}};

/* ================= v6.1: kinh tế gia tộc ================= */
/* chức vụ trong tộc: lương tính theo mm() (×60×hệ số gia thế), lấy từ công quỹ vào túi riêng */
const CLANOFF={
  quansu:{n:'Quản sự',pay:1.5,need:['ql',30],d:'Trông coi sản nghiệp và ruộng chung. Quản trị cao thì lãi cơ sở của gia tộc và thu hoạch tăng.'},
  truongphong:{n:'Trướng phòng',pay:1,need:['ql',25],d:'Giữ sổ sách công quỹ. Chi tiêu của nhà chính giảm theo Quản trị.'},
  tudu:{n:'Từ đường',pay:0.8,need:['eq',40],d:'Lo hương khói, giỗ chạp. Ổn định và danh vọng gia tộc tăng dần.'},
  giaothu:{n:'Giáo thụ',pay:1,need:['tri',60],d:'Dạy con cháu trong tộc. Trẻ ở nhà chính học nhanh hơn.'}};
/* mức tô khi phát canh ruộng: phần hoa lợi thu về, tác động danh vọng mỗi năm theo 10 mẫu */
const TOLV=[['Tô nhẹ',0.3,1.2,'Tá điền biết ơn, tiếng thơm lan xa'],['Tô vừa',0.4,0,'Như lệ thường trong làng'],['Tô nặng',0.5,-1.5,'Thu nhiều nhưng bị chê là địa chủ ác, tá điền dễ bỏ trốn']];
/* mức góp công quỹ của người đi làm ở nhà chính */
const GOP=[[0,'Không góp',2],[0.1,'Một phần mười',0],[0.2,'Hai phần mười',-1],[0.3,'Ba phần mười',-2],[0.5,'Một nửa',-5]];
/* mừng thọ */
const THO={60:'Lục tuần',70:'Thất tuần',80:'Bát tuần',90:'Cửu tuần',100:'Đại thọ bách tuế'};
/* đột phá chỉ số 100: mỗi người được 3 con đường hợp với mình. mo: số tháng; sp: chỉ số góp vào phép thử; job/ax/tr: điều kiện; gain: đặc tính khi thành */
const BRK100={
  tri:[
    {id:'kinh',l:'Bế quan đọc lại kinh điển',d:'Ôn cố tri tân, mài từng chữ',mo:[10,18],sp:{tri:1,cc:.4},gain:'dainho'},
    {id:'chu',l:'Viết sách chú giải của riêng mình',d:'Phải có kiến giải, không chỉ chép lại',mo:[14,24],sp:{tri:1,dl:.3},job:['su','quan','thulai'],gain:'dainho'},
    {id:'luan',l:'Lên kinh luận đạo với danh nho',d:'Thắng thua đều mở mang, tốn kém đi lại',mo:[6,12],sp:{tri:.8,khau:.5},cost:12,gain:'muusi'},
    {id:'binh',l:'Nghiền ngẫm binh thư, sử sách',d:'Lấy chuyện xưa soi chuyện nay',mo:[10,16],sp:{tri:.8,muu:.6},gain:'muusi'},
    {id:'y',l:'Biên soạn y thư từ các ca bệnh',d:'Ghi chép, đối chiếu từng phương thuốc',mo:[12,20],sp:{tri:.8,ky:.5},job:['y','nguy'],gain:'ythu'},
    {id:'du',l:'Chu du ghi chép phong tục bốn phương',d:'Đi vạn dặm đường, đọc vạn quyển sách',mo:[12,24],sp:{tri:.8,suc:.3},cost:8,gain:'dainho'},
    {id:'co',l:'Giải những thế cờ tàn của tiền nhân',d:'Một nước cờ ngộ cả đạo',mo:[6,12],sp:{tri:1,diem:.4},ax:['diem',60],gain:'muusi'}],
  vo:[
    {id:'hang',l:'Bế quan khổ luyện trong hang núi',d:'Hao tổn sức lực, xa nhà lâu ngày',mo:[10,20],sp:{vo:1,suc:.4,yc:.4},gain:'tongsu'},
    {id:'thac',l:'Luyện dưới thác nước giữa mùa đông',d:'Rèn gân cốt tới cực hạn, dễ nhiễm lạnh',mo:[6,12],sp:{vo:1,suc:.6},gain:'kimthan'},
    {id:'giao',l:'Tìm cao thủ khắp nơi giao đấu',d:'Thua thì bị thương, thắng thì nổi danh',mo:[8,16],sp:{vo:1,gan:.4},ax:['gan',55],gain:'tongsu'},
    {id:'tran',l:'Rút kinh nghiệm từ trận mạc',d:'Ôn lại từng trận đã đánh, sửa cách dùng binh khí',mo:[8,14],sp:{vo:.8,muu:.5},job:['quan_ngu','tieu','hiep'],gain:'tongsu'},
    {id:'thu',l:'Quan sát hổ báo trong rừng sâu',d:'Học thế của mãnh thú',mo:[8,14],sp:{vo:.9,tri:.3},gain:'kimthan'},
    {id:'tinh',l:'Tĩnh tọa, luyện nội tức',d:'Chậm mà chắc, cần lòng kiên nhẫn',mo:[14,24],sp:{vo:.7,diem:.4,yc:.4},ax:['diem',50],gain:'tongsu'}],
  suc:[
    {id:'tich',l:'Tịch cốc dưỡng sinh',d:'Ăn uống thanh đạm, thanh lọc thân thể',mo:[6,12],sp:{suc:1,tiet:.5},gain:'truongtho'},
    {id:'tho',l:'Theo đạo sĩ học phép thở',d:'Khí hành chu thiên, phải đi xa tìm thầy',mo:[10,18],sp:{suc:1,diem:.3},cost:6,gain:'truongtho'},
    {id:'lam',l:'Lao động khổ luyện ngoài đồng',d:'Thân thể tự rèn qua mưa nắng',mo:[8,14],sp:{suc:1,cc:.5},gain:'kimthan'},
    {id:'suoi',l:'Tắm suối nước nóng trên núi tuyết',d:'Đường xa hiểm trở',mo:[6,10],sp:{suc:1,gan:.3},cost:10,gain:'truongtho'},
    {id:'thuoc',l:'Tự bốc thuốc bồi bổ theo y thư',d:'Hiểu thân mình như hiểu bệnh nhân',mo:[8,14],sp:{suc:.8,tri:.4},job:['y','nguy'],gain:'truongtho'}],
  mi:[
    {id:'le',l:'Học lễ nghi cung đình',d:'Từng cử chỉ đều thành phong thái',mo:[8,14],sp:{mi:1,eq:.4},cost:8,gain:'phongnha'},
    {id:'dan',l:'Theo danh kỹ học đàn ca',d:'Thanh sắc đều lên, dễ bị dị nghị',mo:[8,16],sp:{mi:1,ky:.3},gain:'phongnha'},
    {id:'nha',l:'Mở nhã tập mời văn nhân',d:'Danh tiếng lan xa, tốn tiền tiếp khách',mo:[6,12],sp:{mi:.8,tri:.4,khau:.3},cost:10,gain:'phongnha'},
    {id:'tam',l:'Tĩnh tâm dưỡng nhan',d:'Đẹp từ trong ra',mo:[10,18],sp:{mi:.9,diem:.4},gain:'phongnha'},
    {id:'thuong',l:'Lấy duyên dáng làm vốn giao thương',d:'Khách tìm đến vì người, không chỉ vì hàng',mo:[8,14],sp:{mi:.8,khau:.5},job:['tieunhi','chu','hangrong'],gain:'phongnha'}],
  eq:[
    {id:'hoa',l:'Làm người hòa giải trong vùng',d:'Thấu lòng người qua từng vụ tranh chấp',mo:[8,16],sp:{eq:1,khau:.4},gain:'thaunhan'},
    {id:'cho',l:'Lặng lẽ quan sát chợ búa',d:'Hiểu muôn kiểu người',mo:[10,18],sp:{eq:1,tri:.3},gain:'thaunhan'},
    {id:'thien',l:'Ngồi thiền ở chùa',d:'Tâm tĩnh thì sáng',mo:[8,14],sp:{eq:.9,diem:.5},gain:'tamtinh'},
    {id:'ket',l:'Kết giao với kẻ mình ghét nhất',d:'Đổi thù thành bạn, nuốt được tự ái',mo:[6,12],sp:{eq:1,rong:.4},ax:['rong',50],gain:'thaunhan'},
    {id:'dan',l:'Lắng nghe nỗi khổ của dân',d:'Đi từng nhà, nghe từng chuyện',mo:[10,16],sp:{eq:.9,thanh:.3},job:['quan'],gain:'thaunhan'}]};
/* các đặc tính mới cho đột phá */
const TRAITS61={
  dainho:{n:'Đại nho',c:'p',d:'Trí tuệ rèn được tới 115, điểm thi +6, được giới sĩ phu kính trọng',capUp:{tri:15},exam:6,fame:2},
  muusi:{n:'Mưu sĩ',c:'p',d:'Trí tuệ rèn được tới 112, Cơ mưu tăng nhanh, việc lớn dễ thành',capUp:{tri:12},cond:.03},
  ythu:{n:'Y thư truyền đời',c:'p',d:'Trí tuệ tới 110, thông thạo nghề y tăng nhanh',capUp:{tri:10},mm:.4,mmJobs:['y','nguy']},
  tongsu:{n:'Tông sư',c:'p',d:'Võ lực rèn được tới 118, ra trận lập công nhanh',capUp:{vo:18},merit:.3},
  kimthan:{n:'Kim cương thân',c:'p',d:'Võ lực và sức khỏe tới 110, ít bệnh tật',capUp:{vo:10,suc:10},sick:.6},
  truongtho:{n:'Trường thọ',c:'p',d:'Già chậm hơn 10 năm, sức khỏe rèn tới 115',decl:10,capUp:{suc:15}},
  phongnha:{n:'Phong nhã danh sĩ',c:'p',d:'Mị lực rèn được tới 115, danh vọng tự tăng',capUp:{mi:15},fame:3},
  thaunhan:{n:'Thấu nhân tâm',c:'p',d:'EQ rèn được tới 115, gia tộc ổn định hơn',capUp:{eq:15},on:2},
  tamtinh:{n:'Tâm tĩnh như nước',c:'p',d:'EQ tới 110, tâm trạng luôn vững',capUp:{eq:10},tam:6}};
Object.assign(TRAITS,TRAITS61);


/* ================= v6.2: gia đình và xã hội ================= */
/* nghề mới */
Object.assign(JOBS,{
  det:{n:'Dệt thêu',inc:330,st:'mi',stress:2,phys:66,start:1,gift:'Khung cửi và 5 lạng bạc',lv:[L('Thợ dệt',1),L('Thợ thêu khéo',1.9,{m:25,mi:45}),L('Chủ khung cửi',3.2,{m:60,mi:55}),L('Danh thủ thêu',6,{m:95,mi:75,fame:120})],d:'Dệt vải, thêu khăn, may áo. Làm ở nhà, tự nhận hàng, thu theo số hàng làm ra.'},
  mo:{n:'Bà đỡ',inc:300,st:'eq',stress:5,start:1,req:{eq:35},gift:'Túi thuốc, kéo bạc và 5 lạng bạc',lv:[L('Người giúp đỡ đẻ',1),L('Bà mụ',2,{m:25,eq:45}),L('Bà đỡ có tiếng',3.5,{m:60,eq:55,tri:35}),L('Bà đỡ trong phủ',6,{m:95,eq:70,fame:100})],d:'Đỡ đẻ cho các nhà trong vùng. Tự làm, thu theo từng ca. Nhà có bà đỡ thì sinh nở an toàn hơn.'},
  bep:{n:'Đầu bếp',inc:420,st:'eq',stress:4,start:1,gift:'Bộ dao thớt và 6 lạng bạc',lv:[L('Phụ bếp',1),L('Đầu bếp',1.9,{m:25}),L('Bếp trưởng tửu lâu',3.4,{m:60,eq:50}),L('Ngự trù',7,{m:100,flag:'cung'})],d:'Nấu ăn cho tửu lâu, nhà giàu. Làm công, có chủ trả lương.'},
  diaky:{n:'Thầy địa lý',inc:380,st:'tri',stress:3,start:1,req:{tri:55},gift:'La bàn và 6 lạng bạc',lv:[L('Học trò thầy địa lý',1),L('Thầy địa lý',2.2,{m:30,tri:60}),L('Thầy phong thủy có tiếng',4,{m:65,tri:70,eq:50}),L('Khâm thiên giám sư',8,{m:100,tri:90,fame:200})],d:'Xem đất làm nhà, đặt mộ, chọn ngày. Tự làm, thu theo từng việc. Được nhà quyền quý mời.'}});
STARTJOBS.push('det','mo','bep','diaky');
PATHS.van.jobs.push('diaky','mo');PATHS.thuong.jobs.push('bep','det');
Object.assign(JOBX,{det:{ax:{cc:1,diem:.5},sk:{ky:3}},mo:{ax:{rong:1,gan:.5},sk:{ky:2,khau:1}},bep:{ax:{cc:1},sk:{ky:2,ql:1}},diaky:{ax:{diem:.5,tv:.3},sk:{khau:2,muu:1}}});
/* đặc điểm nghề: self = từ bậc này trở đi là nghề tự thân, không chủ, không cấp trên; piece = thu theo năng suất (từ bậc này);
   dig = thể diện của nghề (0 hèn nhất, 9 cao nhất); hand = việc tay chân; light = việc nhẹ, việc của người có học; g = chỉ số tăng theo năm làm nghề */
const JOBMETA={
  none:{dig:0},huu:{dig:9},noi:{dig:9},vua:{dig:9},
  nong:{self:0,dig:[1,2,4,5],hand:1,g:{suc:.8,vo:.3}},
  tieunhi:{dig:[2,2,4,5],g:{eq:1.2},light:1},
  khuanvac:{self:0,piece:0,dig:[0,1,2],hand:1,g:{vo:1.4,suc:.6}},
  tieuphu:{self:0,piece:0,dig:[1,1,2],hand:1,g:{suc:1,vo:.8}},
  ngu:{self:0,piece:0,dig:[1,2,3],hand:1,g:{suc:1,vo:.4}},
  hangrong:{self:0,piece:0,dig:[1,2],g:{eq:1}},
  hau:{dig:[0,2,3],g:{eq:.9}},
  tho:{self:2,piece:2,dig:[1,2,3,4,6],hand:1,g:{vo:.6,tri:.3}},
  chan:{self:1,piece:1,dig:[1,1,3],hand:1,g:{suc:.8}},
  y:{self:2,piece:2,dig:[3,4,5,6],light:1,g:{tri:1.1,eq:.5}},
  su:{self:2,dig:[3,4,5,7,8],light:1,g:{tri:1.3,eq:.5}},
  nghe:{self:1,piece:1,dig:[1,1,2,4],g:{mi:1.4,eq:.4}},
  tieu:{piece:0,dig:[2,2,3,4],hand:1,g:{vo:1.4,suc:.3}},
  thulai:{dig:[4,5,5],light:1,g:{tri:1,eq:.3}},
  nhadich:{dig:[1,2,3],hand:1,g:{vo:1}},
  quan:{dig:9,light:1,g:{tri:.7,eq:.7}},nguy:{dig:8,light:1,g:{tri:1}},quan_ngu:{dig:3,hand:1,g:{vo:1.4,suc:.5}},hiep:{dig:3,g:{vo:1.6}},chu:{self:0,dig:6,light:1,g:{eq:.7,tri:.4}},
  det:{self:0,piece:0,dig:[2,2,3,4],hand:1,g:{mi:.6,eq:.3}},
  mo:{self:0,piece:0,dig:[1,2,3,4],g:{eq:1,tri:.3}},
  bep:{dig:[1,2,3,5],hand:1,g:{eq:.5,suc:.3}},
  diaky:{self:0,piece:0,dig:[3,4,5,7],light:1,g:{tri:1,eq:.5}}};
/* nghề có ông chủ để tả trong phỏng vấn */
const EMPLOYER62={det:'bà chủ phường dệt',mo:'bà đỡ già trong vùng',bep:'bếp trưởng tửu lâu',diaky:'lão thầy địa lý'};

/* kinh doanh: hệ số lương theo ngành, tỉ lệ nguyên liệu, phần lương người trông */
const BIZX={quantra:{w:.9,mat:.3,mgr:.15},tiem:{w:1.1,mat:.32,mgr:.12},xuong:{w:1,mat:.3,mgr:.15},yquan:{w:1.2,mat:.25,mgr:.2},truong:{w:1.1,mat:.08,mgr:.25},
  voquan:{w:1,mat:.1,mgr:.2},tieucuc:{w:1.25,mat:.18,mgr:.12},ganhhat:{w:.85,mat:.15,mgr:.2},thuyen:{w:1.15,mat:.22,mgr:.1},trai:{w:.8,mat:.28,mgr:.15}};

/* trẻ không đến trường: các đường khác */
Object.assign(SCHOOL[1],{cha:{n:'Theo cha mẹ học',fee:0,g:{},anyGirl:1,par:1},viecnha:{n:'Phụ việc nhà',fee:0,g:{suc:1,eq:1},anyGirl:1,chore:1}});
Object.assign(SCHOOL[2],{cha:{n:'Theo cha mẹ học',fee:0,g:{},anyGirl:1,par:1},tuhoc:{n:'Tự học',fee:0,g:{},anyGirl:1,self:1},viecnha:{n:'Phụ việc nhà',fee:0,g:{suc:1,eq:1},anyGirl:1,chore:1},
  hocviec:{n:'Theo người học việc',fee:0,g:{},anyGirl:1,appr:1},hocdet:{n:'Học dệt thêu',fee:40,g:{mi:2,eq:1},pre:{det:3},anyGirl:1},hocmo:{n:'Theo bà đỡ học việc',fee:30,g:{eq:2,tri:1},pre:{mo:3},anyGirl:1}});
Object.assign(SCHOOL[3],{cha:{n:'Theo cha mẹ học',fee:0,g:{},anyGirl:1,par:1},tuhoc:{n:'Tự học',fee:0,g:{},anyGirl:1,self:1},viecnha:{n:'Phụ việc nhà',fee:0,g:{suc:1,eq:1},anyGirl:1,chore:1},
  hocviec:{n:'Theo người học việc',fee:0,g:{},anyGirl:1,appr:1},gui:{n:'Gửi vào cơ sở làm ăn',fee:0,g:{eq:1},anyGirl:1,gui:1},hocdet:{n:'Phường dệt học việc',fee:80,g:{mi:3,eq:1},pre:{det:5},anyGirl:1},hocbep:{n:'Vào bếp tửu lâu học việc',fee:0,g:{eq:1,suc:1},pre:{bep:5},anyGirl:1}});
SCHOOL[2].hocy.anyGirl=1;SCHOOL[2].hocbuon.anyGirl=1;SCHOOL[3].yhd.anyGirl=1;SCHOOL[3].thoi.anyGirl=1;
Object.assign(SCHOOLX,{cha:{ax:{ht:1}},tuhoc:{ax:{dl:1.5,yc:1},sk:{muu:1}},viecnha:{ax:{cc:1.5,ht:.5},sk:{ql:2}},hocviec:{ax:{cc:1,dl:.5},sk:{ky:2}},gui:{ax:{dl:1,hd:.5},sk:{khau:1,ql:1}},hocdet:{ax:{cc:1,diem:.5},sk:{ky:3}},hocmo:{ax:{rong:1,gan:.5},sk:{ky:2}},hocbep:{ax:{cc:1},sk:{ky:2}}});

/* gia quy thêm: tham khảo tinh thần Hoàng Minh Tổ huấn (giữ phép tổ, cần kiệm, phân rõ đích thứ, cấm ngoại thích can dự, nghiêm trị tham nhũng, thương dân)
   req: điều kiện mở khóa */
Object.assign(RULES,{
  tohuan:{n:'Giữ phép tổ tông',d:'Lời tổ dặn không được sửa. Ổn định +6, nhưng đổi gia quy khác mất thêm Ổn định'},
  truongau:{n:'Trưởng ấu hữu tự',d:'Trên dưới phân minh, con trưởng nối nghiệp. Ổn định +4, ít tranh vị, con thứ kém vui'},
  camngoai:{n:'Cấm ngoại thích can dự',d:'Dâu rể không được giữ chức trong tộc. Ổn định +3, nhà thông gia ít nhờ vả'},
  trugian:{n:'Nghiêm trị gian tham',d:'Người làm quan liêm chính tăng dần. Ai tham ô bị phạt nặng. Danh vọng tăng dần'},
  thuongdan:{n:'Khoan hậu với dân',d:'Tô không được thu nặng, tá điền ít bỏ trốn, danh vọng tăng dần'},
  camxa:{n:'Cấm xa xỉ',d:'Không ai được sống xa hoa. Ít nhiễm thói phung phí, chi tiêu -5%'},
  kinhto:{n:'Kính tổ, giỗ chạp chu toàn',d:'Mỗi tháng tốn chút hương khói. Danh vọng và Ổn định tăng dần'},
  nghiadien:{n:'Lập nghĩa điền',d:'Năm phần trăm thu của gia tộc để cứu giúp người nghèo trong họ. Chi phái túng thiếu được tự động giúp, Ổn định +4',req:'tier3'},
  thuhuong:{n:'Thư hương truyền gia',d:'Con cháu học nhanh thêm 20%, danh vọng tăng dần',req:'cunhan'},
  thetap:{n:'Thế tập binh nghiệp',d:'Con trai nhà võ học võ nhanh hơn, vào quân được làm ngũ trưởng',req:'vo'},
  vanvo:{n:'Văn võ song toàn',d:'Trí tuệ và võ lực đều tăng nhanh 8%'},
  tuuhien:{n:'Chọn hiền làm chủ',d:'Gia chủ chọn người tài không theo thứ bậc, không ai được oán. Mất phần ổn định của trưởng ấu',req:'tier2'},
  camdang:{n:'Không kết bè phái',d:'Quan trong nhà ít bị cuốn vào đảng tranh, ít bị hặc tội, nhưng thăng chậm'},
  khoandung:{n:'Khoan dung',d:'Người nhà ít để bụng, oán giận nguôi nhanh. Gia pháp kém nghiêm'},
  chigop:{n:'Chi phái nộp một phần mười',d:'Chi phái góp 10% thu nhập thay vì 5%. Công quỹ dày, chi phái kém vui'},
  phanho:{n:'Lớn thì ra ở riêng',d:'Con trai lập gia đình quá 25 tuổi phải ra ở riêng, nhà chính bớt đông'},
  han3:{n:'Mỗi nhà ba con',d:'Mỗi cặp vợ chồng sinh tối đa ba con. Ai vượt bị gia pháp. Gia tộc không quá đông'},
  han5:{n:'Mỗi nhà năm con',d:'Mỗi cặp vợ chồng sinh tối đa năm con'},
  dongcon:{n:'Đông con nhiều phúc',d:'Vợ chồng muốn sinh nhiều hơn, cả nhà vui khi có thêm người'},
  nuoiho:{n:'Chỉ nhận nuôi trong họ',d:'Chỉ nhận nuôi con cháu cùng họ, không nhận trẻ ngoài'},
  camnuoi:{n:'Không nhận con nuôi',d:'Không ai được nhận con nuôi'},
  nutac:{n:'Nữ tắc, giữ tiết',d:'Góa phụ không tái giá. Người giữ tiết lâu năm được triều đình biểu dương'},
  taigia:{n:'Cho phép tái giá',d:'Góa bụa, ly hôn được lấy người khác mà không bị chê trách'}});
const RULEREQ={tier3:['Gia thế từ Hương thân',S0=>S0.tier>=3],tier2:['Gia thế từ Tiểu hộ khá giả',S0=>S0.tier>=2],cunhan:['Có người đỗ Cử nhân',S0=>S0.deg>=1],vo:['Có tước hoặc võ quan từ Bách hộ',S0=>S0.vo]};
const RULEX62={tohuan:{ht:.5},truongau:{ht:.5},camngoai:{},trugian:{thanh:1},thuongdan:{rong:1},camxa:{tiet:1},kinhto:{ht:.5},nghiadien:{rong:.5},thuhuong:{yc:.5},thetap:{gan:.5},vanvo:{cc:.3},tuuhien:{tv:.3},camdang:{},khoandung:{rong:.5,diem:.5},chigop:{},phanho:{dl:.5},han3:{},han5:{},dongcon:{hd:.3},nuoiho:{},camnuoi:{},nutac:{tiet:.5},taigia:{}};
/* hai gia quy không được chọn cùng lúc */
const RULEX_CONFLICT=[['han3','han5'],['han3','dongcon'],['han5','dongcon'],['nuoiho','camnuoi'],['nutac','taigia'],['truongau','tuuhien'],['tietkiem','camxa'],['tuquyet','hieudao']];

/* mốc chỉ số sau 100: danh hiệu, cửa ải phải đột phá */
const GATES=[100,120,140];
const STITLE={
  tri:[[100,'Bác học'],[110,'Danh nho'],[120,'Đại nho'],[130,'Hồng nho thạc học'],[140,'Văn đàn tông sư'],[150,'Thánh hiền chi tài'],[170,'Á thánh'],[185,'Bác cổ thông kim'],[200,'Văn Khúc giáng thế']],
  vo:[[100,'Cao thủ'],[110,'Nhất lưu cao thủ'],[120,'Đại cao thủ'],[130,'Tông sư'],[140,'Đại tông sư'],[150,'Võ thánh'],[170,'Thiên hạ vô song'],[185,'Kiếm tâm thông minh'],[200,'Võ thần']],
  suc:[[100,'Cường tráng'],[110,'Khí huyết như rồng'],[120,'Đồng bì thiết cốt'],[130,'Kim cương chi thân'],[140,'Bách bệnh bất xâm'],[150,'Trường sinh căn cốt'],[170,'Phản lão hoàn đồng'],[185,'Tiên phong đạo cốt'],[200,'Bất lão chi thân']],
  mi:[[100,'Phong hoa'],[110,'Danh động một phủ'],[120,'Khuynh thành'],[130,'Khuynh quốc'],[140,'Tuyệt đại phong hoa'],[150,'Thiên hạ đệ nhất phong tư'],[170,'Thiên tiên chi tư'],[185,'Nhất tiếu khuynh thiên hạ'],[200,'Tạo hóa chi mỹ']],
  eq:[[100,'Thấu tình đạt lý'],[110,'Nhân tâm như gương'],[120,'Đức cao vọng trọng'],[130,'Thu phục lòng người'],[140,'Nhất ngôn cửu đỉnh'],[150,'Thánh nhân chi tâm'],[170,'Đại trí nhược ngu'],[185,'Tâm như minh kính'],[200,'Thiên tâm']]};
const GATE_TXT={
  tri:{120:'Sách vở trong thiên hạ hầu như đã đọc hết, cái còn lại phải tự mình ngộ ra.',140:'Học đã đến chỗ cùng, chỉ một bước nữa là thành bậc thầy muôn đời.'},
  vo:{120:'Chiêu thức đã luyện đến không còn chỗ hở, nhưng dường như còn một bức tường vô hình.',140:'Một thân võ công đã đứng trên vạn người, bước cuối cùng là bước khó nhất.'},
  suc:{120:'Thân thể đã khỏe hơn người thường rất xa, khí huyết như sắp chạm trần.',140:'Thân thể như sắt thép, nhưng muốn đi tiếp phải thay da đổi thịt.'},
  mi:{120:'Đi đến đâu người ta cũng ngoái nhìn, nhưng phong thái còn thiếu cái hồn.',140:'Dung nhan và phong thái đã đẹp đến cực, chỉ còn khí chất là chưa thành.'},
  eq:{120:'Lòng người đã nhìn thấu tám chín phần, phần còn lại là lòng mình.',140:'Một lời nói ra cả vùng đều nghe, nhưng muốn đi tiếp phải buông được cái tôi.'}};

/* thất xuất, tam bất khứ (luật xưa về bỏ vợ) */
const THATXUAT={votu:'Không có con trai',dam:'Dâm dật',batsu:'Không thờ cha mẹ chồng',khau:'Lắm điều',dao:'Trộm cắp',do:'Ghen tuông',tat:'Bệnh hiểm nghèo'};
const BATKHU={tang:'Đã để tang cha mẹ chồng',ngheo:'Lấy nhau lúc nghèo, nay đã giàu',coi:'Không còn nhà để về'};

/*@@D63-BEGIN@@*/
/* ================= v6.3: thế giới · tỉnh, nước, thiên tai, hàng hóa ================= */
/* hàng hiếm theo vùng + hao hụt: dec = tỉ lệ hư mỗi tháng */
Object.assign(GOODS,{
  ngua:{n:'Ngựa chiến',u:'con',p:5000,dec:0.004},ngoc:{n:'Ngọc thạch',u:'viên',p:9000,dec:0},traichau:{n:'Trân châu',u:'hộp',p:7500,dec:0}});
Object.assign(GOODS.lua,{dec:0.008});Object.assign(GOODS.ngo,{dec:0.03});Object.assign(GOODS.duong,{dec:0.01});Object.assign(GOODS.che,{dec:0.008});
Object.assign(GOODS.duoc,{dec:0.01});Object.assign(GOODS.to,{dec:0.002});Object.assign(GOODS.bong,{dec:0.004});
const RARE_P={ /* hệ số giá theo vùng cho hàng hiếm: thấp = nơi sản xuất */
  ngua:{trung:1.4,bac:.45,dong:1.7,nam:1.8,tay:1.0},ngoc:{trung:1.5,bac:1.6,dong:1.7,nam:1.3,tay:.4},traichau:{trung:1.6,bac:1.8,dong:.45,nam:1.4,tay:1.9}};
for(const k in REGIONS)for(const g in RARE_P)REGIONS[k].p[g]=+Math.pow(RARE_P[g][k],0.62).toFixed(3); /* nén chênh lệch giá để không có chuyến buôn lãi vô lý */
REGIONS.trung.p.to=.72;REGIONS.trung.p.che=.78;
/* nước. col: màu trên bản đồ. hos: độ hiếu chiến */
const NAT={
  trieu:{n:'Đại Triều',r:'trung',col:'#b8860b',hos:.9,d:'Triều đình chính thống, có ải biên giới Bắc và Tây.'},
  ha_tay:{n:'Phiên trấn Hà Tây',r:'trung',col:'#8b5e3c',hos:.7,d:'Phiên vương cát cứ miền tây Trung Châu, thần phục trên danh nghĩa.'},
  lang_bo:{n:'Lang bộ',r:'bac',col:'#4f6d7a',hos:1.2,d:'Bộ tộc du mục phía bắc, kỵ binh nhanh, ưa cướp phá biên ải.'},
  hac_ma:{n:'Hắc Mã bộ',r:'bac',col:'#2f3e46',hos:1.0,d:'Bộ tộc thảo nguyên chăn ngựa, đối địch Lang bộ.'},
  van_dao:{n:'Vân Đảo quốc',r:'dong',col:'#3a7ca5',hos:.5,d:'Quốc gia đảo giàu nhờ thương cảng và muối.'},
  hai_minh:{n:'Hải Minh',r:'dong',col:'#7d4e57',hos:1.1,d:'Liên minh hải tặc và thuyền chiến ngoài khơi.'},
  tho_ty:{n:'Thổ ty Lam Sơn',r:'nam',col:'#5b8c5a',hos:.7,d:'Liên minh các thổ ty miền núi, nắm dược liệu và đường độc đạo.'},
  lam_quoc:{n:'Lam quốc',r:'nam',col:'#c17f59',hos:.8,d:'Tiểu quốc đồng bằng ven biển phía nam.'},
  sa_quoc:{n:'Sa quốc',r:'tay',col:'#d4a373',hos:.9,d:'Vương quốc sa mạc giữ con đường tơ lụa.'},
  oc_dao:{n:'Liên minh Ốc Đảo',r:'tay',col:'#6a994e',hos:.6,d:'Các thành ốc đảo liên minh lỏng lẻo.'}};
/* tỉnh. k: kinh (kinh đô) | phu (phủ lớn) | cang (cảng) | bien (ải biên giới) | lang (vùng nông thôn).
   pm: hệ số giá riêng của tỉnh (nhân với hệ số vùng). */
const PROV={
  nhan_mon:{n:'Nhạn Môn quan',r:'bac',nat:'trieu',k:'bien',x:262,y:112,pm:{sat:1.15,lua:1.25,muoi:1.2,ngua:.8},d:'Ải lớn nhất phía bắc, đóng quân đông.'},
  thiet_son:{n:'Thiết Sơn',r:'bac',nat:'lang_bo',k:'lang',x:165,y:68,pm:{sat:.8,go:.85},d:'Mỏ sắt và rừng thông.'},
  ma_truong:{n:'Mã Trường',r:'bac',nat:'hac_ma',k:'lang',x:335,y:52,pm:{ngua:.85,to:1.1},d:'Thảo nguyên mênh mông, chợ ngựa lớn.'},
  tuyet_linh:{n:'Tuyết Lĩnh',r:'bac',nat:'lang_bo',k:'lang',x:250,y:38,pm:{duoc:.85,ngua:.95},d:'Cao nguyên quanh năm lạnh, mùa đông khắc nghiệt.'},
  thien_kinh:{n:'Thiên Kinh',r:'trung',nat:'trieu',k:'kinh',x:250,y:188,pm:{to:1.1,gom:1.05,huong:1.15,ngoc:1.2,traichau:1.2,ngua:1.1,che:1.1},d:'Kinh đô, quan lại, nhà giàu và hàng quý đổ về.'},
  hoai_thuy:{n:'Hoài Thủy',r:'trung',nat:'trieu',k:'phu',x:208,y:240,pm:{lua:.95,duong:.95},d:'Phủ lớn bên sông, chợ đông, nhiều xưởng.'},
  lac_giang:{n:'Lạc Giang',r:'trung',nat:'trieu',k:'lang',x:305,y:176,pm:{lua:.85,ngo:.9,to:.9},d:'Đồng bằng phù sa, vựa lúa của Trung Châu.'},
  son_ha:{n:'Sơn Hà',r:'trung',nat:'ha_tay',k:'phu',x:172,y:160,pm:{sat:.9,go:.9,ngua:.9},d:'Đất của phiên vương, núi non hiểm trở, thợ rèn giỏi.'},
  hai_khau:{n:'Hải Khẩu',r:'trung',nat:'trieu',k:'cang',x:336,y:226,pm:{huong:.82,traichau:.85,muoi:.9},d:'Cảng lớn của Trung Châu, thuyền ngoại quốc ra vào.'},
  bach_sa:{n:'Bạch Sa',r:'dong',nat:'van_dao',k:'cang',x:392,y:136,pm:{traichau:.9,huong:.9},d:'Thương cảng bãi cát trắng.'},
  van_dao:{n:'Vân Đảo',r:'dong',nat:'van_dao',k:'kinh',x:446,y:190,pm:{traichau:.85,to:1.05,gom:.95},d:'Đảo chính, vương cung và chợ lớn.'},
  diem_dien:{n:'Diêm Điền',r:'dong',nat:'van_dao',k:'lang',x:412,y:252,pm:{muoi:.85,traichau:.9},d:'Ruộng muối và làng chài.'},
  hai_minh_ao:{n:'Hải Minh Đảo',r:'dong',nat:'hai_minh',k:'lang',x:462,y:268,pm:{traichau:.8,sat:1.1},d:'Ổ của liên minh hải tặc, chợ đen.'},
  lam_son:{n:'Lam Sơn',r:'nam',nat:'tho_ty',k:'lang',x:178,y:335,pm:{duoc:.85,go:.85},d:'Núi rừng, nhiều lam chướng.'},
  duoc_coc:{n:'Dược Cốc',r:'nam',nat:'tho_ty',k:'lang',x:262,y:366,pm:{duoc:.8,huong:.9},d:'Thung lũng thuốc quý.'},
  mia_chau:{n:'Mía Châu',r:'nam',nat:'lam_quoc',k:'lang',x:332,y:338,pm:{duong:.85,lua:.95},d:'Đồng mía và ruộng lúa chín sớm.'},
  cam_thanh:{n:'Cẩm Thành',r:'nam',nat:'lam_quoc',k:'cang',x:392,y:326,pm:{huong:.85,go:.9,ngua:1.1},d:'Kinh đô Lam quốc, cảng lớn phía nam.'},
  ngoc_mon:{n:'Ngọc Môn quan',r:'tay',nat:'trieu',k:'bien',x:128,y:178,pm:{ngoc:.85,to:1.15,che:1.15},d:'Ải phía tây, cửa ngõ con đường tơ lụa.'},
  sa_thanh:{n:'Sa Thành',r:'tay',nat:'sa_quoc',k:'phu',x:62,y:130,pm:{to:1.1,ngoc:.9,huong:.95},d:'Thành lớn của Sa quốc, thương đoàn tấp nập.'},
  thanh_tuyen:{n:'Thanh Tuyền',r:'tay',nat:'oc_dao',k:'lang',x:66,y:215,pm:{bong:.9,ngoc:.85},d:'Ốc đảo có suối nước ngọt.'},
  lien_sa:{n:'Liên Sa',r:'tay',nat:'oc_dao',k:'phu',x:84,y:268,pm:{ngoc:.8,muoi:.9},d:'Thành ốc đảo phía nam sa mạc, mỏ ngọc.'}};
/* cặp nước giáp nhau: [a,b,căng thẳng gốc,hiếu chiến,tỉnh tuyến đầu của a,tỉnh tuyến đầu của b] */
const BORDER=[
  ['trieu','lang_bo',30,1.0,'nhan_mon','thiet_son'],['trieu','hac_ma',25,.8,'nhan_mon','ma_truong'],['lang_bo','hac_ma',35,1.1,'tuyet_linh','ma_truong'],
  ['trieu','ha_tay',20,.7,'thien_kinh','son_ha'],['trieu','sa_quoc',22,.6,'ngoc_mon','sa_thanh'],['sa_quoc','oc_dao',28,.9,'sa_thanh','thanh_tuyen'],
  ['trieu','oc_dao',15,.4,'ngoc_mon','thanh_tuyen'],['trieu','van_dao',18,.5,'hai_khau','bach_sa'],['van_dao','hai_minh',40,1.2,'diem_dien','hai_minh_ao'],
  ['trieu','hai_minh',25,.8,'hai_khau','hai_minh_ao'],['trieu','tho_ty',25,.8,'hoai_thuy','lam_son'],['tho_ty','lam_quoc',30,1.0,'duoc_coc','mia_chau'],
  ['trieu','lam_quoc',20,.6,'hoai_thuy','mia_chau']];
/* thiên tai theo vùng. w: trọng số theo vùng, mo: tháng có thể xảy ra, d: kéo dài (tháng), warn: có báo trước, epi: gây dịch,
   crop: hệ số thu hoạch ruộng khi trúng, g: hàng tăng giá */
const DIS={
  lu:{n:'Lũ lụt',w:{trung:1.5,nam:.8,dong:.3},mo:[5,6,7,8,9],d:[2,4],warn:1,crop:.45,g:['lua','ngo'],epi:.3,say:'Nước sông dâng cao, đê vỡ nhiều chỗ.'},
  chau:{n:'Nạn châu chấu',w:{trung:1,bac:.3,nam:.4},mo:[6,7,8,9],d:[2,3],warn:0,crop:.5,g:['lua','ngo'],epi:.1,say:'Châu chấu kéo đến che kín trời.'},
  han:{n:'Đại hạn',w:{trung:.7,tay:1.4,bac:.6},mo:[4,5,6,7,8],d:[3,6],warn:0,crop:.5,g:['lua','ngo','bong'],epi:.2,say:'Mấy tháng không một giọt mưa, ruộng nứt nẻ.'},
  bao:{n:'Bão biển',w:{dong:2.2,trung:.5,nam:.8},mo:[7,8,9,10],d:[1,2],warn:1,crop:.6,g:['muoi','lua','go'],epi:.1,say:'Bão đổ bộ, sóng cuốn thuyền bè và mái nhà.'},
  cat:{n:'Bão cát',w:{tay:2.2},mo:[3,4,5],d:[1,2],warn:1,crop:.6,g:['bong','lua'],epi:0,say:'Bão cát phủ kín ốc đảo và đường thương đạo.'},
  lam:{n:'Dịch lam chướng',w:{nam:2.2,dong:.3},mo:[3,4,5,6,10],d:[3,5],warn:0,crop:.85,g:['duoc'],epi:1,say:'Sương độc từ rừng sâu tràn xuống, người ốm hàng loạt.'},
  tuyet:{n:'Bão tuyết',w:{bac:2.2,tay:.3},mo:[11,12,1,2],d:[2,4],warn:1,crop:.55,g:['ngo','sat','go'],epi:.2,say:'Tuyết phủ trắng thảo nguyên, gia súc chết cóng hàng đàn.'}};
const NOTE63={nghe:['nong','buon','tho','hoc','vo','quan','thuoc'],jobN:{nong:'làm ruộng',buon:'buôn bán',tho:'thợ thủ công',hoc:'nho học',vo:'võ nghệ',quan:'quan lại',thuoc:'thầy thuốc'}};

/*@@D63-END@@*/
/* v6.3: nới ngưỡng thông thạo của các bậc cao (đo ở 6.2 cho thấy gần như không ai tới bậc cuối) */
Object.values(JOBS).forEach(J=>{if(J.lv)J.lv.forEach(L=>{if(L.req&&L.req.m>=60)L.req.m=Math.round(L.req.m*0.8)})});

return {NAT,PROV,BORDER,DIS,NOTE63,JOBMETA,EMPLOYER62,BIZX,RULEREQ,RULEX62,RULEX_CONFLICT,GATES,STITLE,GATE_TXT,THATXUAT,BATKHU,CLANOFF,TOLV,GOP,THO,BRK100,SURN2,MMID,MGIV,FMID,FGIV,RNAME,POEMS,ORIGINS,AXES,SKILLS,JOBX,SCHOOLX,FOCUSX,LIFEX,VICES,REGIONS,DIST,SUBS,PERSONA,PATHS,OFFICES,STATS,SN,MS,SURN,MNAME,FNAME,HOMES,LIFE,TIERS,EXPECT,TK,TUOC,TUOC_PAY,TUOC_HOME,TUOC_LAND,RANKS,SALARY,VACANCY,ARMY,JOBS,STARTJOBS,FOCUS,SCHOOL,HABITS,TRAITS,CROPS,GOODS,ROUTES,ROLES,BIZ,RULES,WARS};
})();
