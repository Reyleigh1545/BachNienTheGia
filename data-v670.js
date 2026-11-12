/* Bách Niên Thế Gia v6.7.0-d1 · dữ liệu cho khung đại cốt truyện, hạt giống thế giới, sử sách
   Nạp sau data.js và trước các ev-*.js. Chỉ thêm vào window.D. */
(function(){
const D=window.D;
/* ---------- môn phái (24 tên tự đặt; mỗi ván bốc 9: 3 chính, 3 tà, 3 trung lập) ---------- */
D.SECT_POOL=[
 {n:'Bạch Hạc môn',al:'chinh',st:'quyền pháp, khinh công'},{n:'Thanh Sơn kiếm phái',al:'chinh',st:'kiếm pháp'},
 {n:'Tĩnh Tâm am',al:'chinh',st:'nội công, y thuật'},{n:'Thiên Trụ phái',al:'chinh',st:'chưởng pháp'},
 {n:'Vân Hà quán',al:'chinh',st:'đạo thuật, kiếm pháp'},{n:'Hồng Liên tự',al:'chinh',st:'thiền công, côn pháp'},
 {n:'Chính Khí đường',al:'chinh',st:'đao pháp'},{n:'Bắc Thiên môn',al:'chinh',st:'cung tiễn, kỵ chiến'},
 {n:'Huyết Ảnh giáo',al:'ta',st:'ám sát, độc công'},{n:'Cửu U môn',al:'ta',st:'âm công, quỷ thuật'},
 {n:'Hắc Phong trại',al:'ta',st:'đao pháp, cướp đường'},{n:'Mê Hồn cốc',al:'ta',st:'mê dược, trận pháp'},
 {n:'Độc Long giáo',al:'ta',st:'độc công'},{n:'Quỷ Diện các',al:'ta',st:'tình báo, ám khí'},
 {n:'Hàn Băng cung',al:'ta',st:'hàn công'},{n:'Xích Sa bang',al:'ta',st:'bang hội, thủy chiến'},
 {n:'Thương Lãng các',al:'trung',st:'kiếm pháp, thương mại'},{n:'Tứ Hải tiêu minh',al:'trung',st:'tiêu cục, quyền pháp'},
 {n:'Mặc Y đường',al:'trung',st:'cơ quan, ám khí'},{n:'Linh Chi cốc',al:'trung',st:'y thuật, dược thảo'},
 {n:'Kỳ Lân bang',al:'trung',st:'bang hội, đao pháp'},{n:'Thiên Cơ lâu',al:'trung',st:'tin tức, trận pháp'},
 {n:'Vô Ưu sơn trang',al:'trung',st:'khinh công, rượu và thơ'},{n:'Tùng Tuyết sơn trang',al:'trung',st:'kiếm pháp, ẩn cư'}];
D.SECT_AL={chinh:'chính phái',ta:'tà phái',trung:'trung lập'};
/* ---------- mệnh thế: không khí chung của một ván ---------- */
D.MENH_THE=[
 {id:'binh',n:'Đời đời thái bình ít việc'},{id:'bui',n:'Gió bụi nổi lên'},{id:'van',n:'Văn trị thịnh'},
 {id:'vo',n:'Võ vận hưng'},{id:'thuong',n:'Thương lộ rộn ràng'},{id:'tai',n:'Thiên tai liên miên'},
 {id:'quyen',n:'Quyền thần lộng hành'},{id:'gh',n:'Giang hồ sục sôi'}];
/* ---------- họ Phạm: nguồn gốc oán (4 kiểu) và tính cách Kiên (3 kiểu), dùng ở đợt 3 ---------- */
D.PM_ORG=[{id:'ruong',n:'Ruộng và mộ'},{id:'so',n:'Sổ gốc kho lương'},{id:'hon',n:'Hôn ước bội bạc'},{id:'buon',n:'Thương lộ'}];
D.PM_KIND=[{id:'nguy',n:'Ngụy quân tử'},{id:'manh',n:'Mãnh hổ'},{id:'muu',n:'Mưu sĩ'}];
/* ---------- tính khí các nước láng giềng ---------- */
D.FOREIGN=['hiếu chiến','thích buôn bán','im lặng khó đoán','nội bộ lục đục'];
/* ---------- các cái kết (17). id T = thắng, L = bại. Tên hiện trong Sử sách sau khi đạt ---------- */
D.ENDINGS=[
 {id:'T1',kind:'win',n:'Đăng cơ · Quyền thần',t:'Từ quyền thần bước lên ngôi báu. Một triều đại mới mở ra.'},
 {id:'T2',kind:'win',n:'Đăng cơ · Võ quan',t:'Binh quyền trong tay, kéo quân về kinh. Ngai vàng đổi chủ.'},
 {id:'T3',kind:'win',n:'Đăng cơ · Khởi nghĩa',t:'Từ ngọn cờ nghĩa quân, đi hết con đường tới điện ngọc.'},
 {id:'T4',kind:'win',n:'Tĩnh nạn công thần',t:'Phò tá phiên vương dẹp loạn trong triều, nhà trở thành đệ nhất công thần.'},
 {id:'T5',kind:'win',n:'Biên vương',t:'Giữ đất biên cương, lập nước riêng và giữ được.'},
 {id:'T6',kind:'win',n:'Nhiếp chính vương',t:'Ngoại thích nắm quyền nhiếp chính, đỡ ngai vàng cho một thiếu đế.'},
 {id:'T7',kind:'win',n:'Phú khả địch quốc',t:'Thương hội của gia tộc nuốt trọn thị trường cả miền.'},
 {id:'T8',kind:'win',n:'Văn tông',t:'Học phái của gia tộc thành chính thống, cửa nhà đầy bảng vàng.'},
 {id:'T9',kind:'win',n:'Trấn quốc võ gia',t:'Gia tộc giữ ải mười năm yên, đời đời cầm quân.'},
 {id:'T10',kind:'win',n:'Võ lâm chí tôn',t:'Từ giang hồ lên đến ngôi minh chủ hoặc lập môn phái tồn tại ba đời.'},
 {id:'T11',kind:'win',n:'Thế gia ngàn năm',t:'Họ giữ được tên tuổi qua tám đời, hai trăm năm.'},
 {id:'L1',kind:'lose',n:'Tru di cửu tộc',t:'Mưu phản thất bại. Họ bị xóa khỏi sử sách.'},
 {id:'L2',kind:'lose',n:'Tan nhà',t:'Nợ nần cuốn đi nhà cửa, ruộng vườn, con cháu mỗi người một ngả.'},
 {id:'L3',kind:'lose',n:'Tuyệt tự',t:'Hương khói lạnh tanh, không còn ai nối dõi.'},
 {id:'L4',kind:'lose',n:'Bị thôn tính',t:'Bị một họ lớn nuốt trọn, tên họ biến mất.'},
 {id:'L5',kind:'lose',n:'Loạn thế',t:'Binh lửa cuốn qua, gia tộc ly tán.'},
 {id:'L6',kind:'lose',n:'Tha hương',t:'Cả nhà bị đày hay phải trốn, không còn chỗ nào ở lại.'}];
/* ---------- xuất thân mở khóa qua Sử sách (khóa theo mã cái kết hoặc cờ) ---------- */
Object.assign(D.ORIGINS,{
 congthan:{n:'Hậu duệ công thần sa sút',d:'Ông cha từng theo vua khai quốc, nay chỉ còn cái tên và một tủ hồ sơ cũ.',jobs:['su','y'],b:{tri:10,eq:4},ax:{ht:8,tv:6},sk:{muu:8},req:{tri:46},lock:'pm'},
 tieucuc:{n:'Con nhà tiêu cục biên ải',d:'Lớn lên trên lưng ngựa, quen nhìn đường xa và tiếng vó ngoài ải.',jobs:['tieu'],b:{vo:10,suc:5},ax:{gan:10,dl:6},sk:{khau:6,ky:4},lock:'T9'},
 mondo:{n:'Môn đồ lưu lạc',d:'Sư môn tan, bí kíp thất lạc, chỉ còn nửa bộ quyền pháp trong đầu.',jobs:['tieuphu','ngu'],b:{vo:10,suc:4},ax:{gan:10,dl:10},sk:{ky:6},lock:'T10'},
 thuongho:{n:'Thương hộ sa cơ',d:'Nhà buôn một thời, giờ chỉ còn cuốn sổ và vài mối quen.',jobs:['hangrong','tieunhi'],b:{eq:10,tri:4},ax:{hd:8,tv:10},sk:{khau:10,ql:8},lock:'T7'},
 nhonguoi:{n:'Nho sinh nghèo có thầy',d:'Nghèo nhưng có một vị thầy chịu dạy không lấy tiền.',jobs:['su'],b:{tri:14,eq:3},ax:{ht:10,tiet:8},sk:{muu:8},req:{tri:46},lock:'T8'},
 cotoc:{n:'Hậu duệ cố tộc',d:'Họ đã từng đứng vững nhiều đời, nay còn một mái nhà và một cuốn gia phả.',jobs:['nong','tho'],b:{suc:6,eq:5},ax:{ht:12,tiet:8},sk:{ky:4},lock:'T11'}});
})();
