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
/* ---------- Đại Minh luật: các tội thường gặp. lv = mức hình (0 khiển trách, 1 xuy, 2 trượng, 3 đồ, 4 lưu, 5 tử), gr = bậc nặng nhẹ 1 đến 3, tc = thập ác (không chuộc, không giảm theo phẩm cấp) ---------- */
D.HINH_N=['khiển trách, bồi thường','đánh roi','đánh gậy','khổ sai','đày đi xa','xử tử'];
D.LAW=[
 {id:'dau_au',n:'Đấu ẩu gây thương tích',thien:'Hình',lv:2,gr:1},{id:'trom',n:'Trộm cắp',thien:'Hình',lv:2,gr:2},{id:'cuop',n:'Cướp của',thien:'Hình',lv:4,gr:1},
 {id:'giet_co_y',n:'Cố ý giết người',thien:'Hình',lv:5,gr:1},{id:'giet_vo_y',n:'Vô ý làm chết người',thien:'Hình',lv:3,gr:1},{id:'vu_cao',n:'Vu cáo',thien:'Hình',lv:3,gr:2},
 {id:'chung_gian',n:'Làm chứng gian',thien:'Hình',lv:2,gr:2},{id:'chua_chap',n:'Chứa chấp tội phạm',thien:'Hình',lv:3,gr:1},{id:'bat_coc',n:'Bắt cóc, ép hôn',thien:'Hình',lv:4,gr:1},
 {id:'thong_gian',n:'Thông gian',thien:'Hình',lv:2,gr:3},{id:'muoi_lau',n:'Buôn muối lậu',thien:'Hình',lv:3,gr:2},{id:'tra_lau',n:'Buôn trà lậu',thien:'Hình',lv:3,gr:1},
 {id:'ruou_lau',n:'Nấu rượu lậu',thien:'Hình',lv:2,gr:1},{id:'nhan_tang',n:'Nhận tang vật',thien:'Hình',lv:2,gr:2},
 {id:'tron_thue',n:'Trốn thuế',thien:'Hộ',lv:2,gr:2},{id:'giau_ruong',n:'Che giấu ruộng đất',thien:'Hộ',lv:3,gr:1},{id:'khai_gian',n:'Khai gian hộ khẩu',thien:'Hộ',lv:2,gr:2},
 {id:'chiem_dat',n:'Cưỡng chiếm đất',thien:'Hộ',lv:3,gr:2},{id:'lai_nang',n:'Cho vay nặng lãi',thien:'Hộ',lv:2,gr:1},{id:'tron_dich',n:'Trốn lao dịch',thien:'Hộ',lv:2,gr:1},
 {id:'ban_dat',n:'Bán ruộng không văn tự',thien:'Hộ',lv:1,gr:3},{id:'cuoi_sai',n:'Cưới hỏi trái luật',thien:'Hộ',lv:2,gr:1},{id:'bo_vo',n:'Bỏ vợ trái luật',thien:'Hộ',lv:2,gr:1},
 {id:'gian_lan_thi',n:'Gian lận khoa cử',thien:'Lễ',lv:3,gr:2},{id:'mao_danh',n:'Mạo danh sĩ tử',thien:'Lễ',lv:3,gr:1},{id:'ta_giao',n:'Theo tà giáo',thien:'Lễ',lv:3,gr:2},
 {id:'pham_huy',n:'Phạm húy',thien:'Lễ',lv:4,gr:1},{id:'bat_hieu',n:'Bất hiếu',thien:'Lễ',lv:4,gr:1,tc:1},{id:'bat_muc',n:'Bất mục',thien:'Lễ',lv:3,gr:1,tc:1},
 {id:'tron_linh',n:'Trốn lính',thien:'Binh',lv:3,gr:1},{id:'ban_quan_khi',n:'Bán quân khí',thien:'Binh',lv:4,gr:2},{id:'dao_ngu',n:'Đào ngũ',thien:'Binh',lv:3,gr:3},
 {id:'thong_dich',n:'Thông địch',thien:'Binh',lv:5,gr:2,tc:1},{id:'nuoi_binh',n:'Nuôi binh trái phép',thien:'Binh',lv:5,gr:1,tc:1},
 {id:'nhan_hoi_lo',n:'Nhận hối lộ',thien:'Lại',lv:3,gr:3},{id:'dua_hoi_lo',n:'Đưa hối lộ',thien:'Lại',lv:2,gr:1},{id:'gia_van_thu',n:'Giả mạo công văn',thien:'Lại',lv:4,gr:1},
 {id:'xay_trai',n:'Xây dựng trái phép',thien:'Công',lv:2,gr:1},{id:'lan_dat_cong',n:'Lấn đất công',thien:'Công',lv:3,gr:1},{id:'dao_de',n:'Đào đê trộm nước',thien:'Công',lv:4,gr:1},
 {id:'muu_phan',n:'Mưu phản',thien:'Danh lệ',lv:5,gr:3,tc:1}];
/* ---------- dự án gia nghiệp: v = cỡ việc (thang CHI), mo = số tháng xây, up = phí duy trì mỗi tháng (cỡ việc), tier = bậc tối thiểu ---------- */
D.PROJ=[
 {id:'tuduong',n:'Từ đường lớn',v:150,mo:12,up:2,tier:3,d:'Danh vọng gia tộc tăng mỗi năm, nhà hòa thuận hơn.'},
 {id:'nghiatrang',n:'Nghĩa trang gia tộc',v:120,mo:8,up:1,tier:2,d:'Giảm một nửa tiền tang lễ, con cháu hiếu hơn.'},
 {id:'nghiadien',n:'Nghĩa điền',v:250,mo:6,up:3,tier:3,need:'farm',d:'Mỗi năm thêm danh vọng và tiếng nhân đức, vùng quanh bớt đói nghèo.'},
 {id:'nghiathuc',n:'Nghĩa thục',v:200,mo:10,up:2,tier:3,need:'teacher',d:'Trẻ trong vùng được học. Mỗi năm thêm danh vọng, thỉnh thoảng có học trò xuất sắc.'},
 {id:'tangthu',n:'Tàng thư lầu',v:300,mo:14,up:2,tier:4,d:'Con cháu học nhanh hơn một chút, có thêm cơ hội gặp sách quý.'},
 {id:'khothoc',sc:{u:'kho',n0:1,min:1,max:5,step:1},n:'Kho thóc dự trữ',v:180,mo:6,up:2,tier:2,d:'Gặp thiên tai, dịch bệnh hay loạn thì mở kho phát chẩn: tốn ít, tiếng lớn.'},
 {id:'caudap',n:'Cầu, đê, đường làng',v:400,mo:12,up:1,tier:3,d:'Danh vọng và quan hệ với quan địa phương tăng, buôn bán thuận hơn.'},
 {id:'thuyenbuon',sc:{u:'thuyền',n0:2,min:1,max:12,step:1},n:'Đội thuyền buôn',v:350,mo:9,up:5,tier:4,d:'Mỗi năm thêm khoản thu từ các chuyến buôn.'},
 {id:'giabinh',sc:{u:'người',n0:20,min:10,max:300,step:10,cap:[0,0,25,50,90,150,250]},n:'Gia binh hộ viện',v:60,mo:3,up:4,tier:2,d:'Nhà ít bị cướp, bớt sợ loạn. Nuôi đông thì triều đình nghi.'},
 {id:'monkhach',sc:{u:'người',n0:5,min:2,max:40,step:3},n:'Môn khách',v:40,mo:2,up:3,tier:3,d:'Mỗi năm có tin tức, mưu kế và cơ hội gặp kỳ ngộ.'},
 {id:'quyennap',n:'Quyên nạp hàm Giám sinh',v:500,mo:0,up:0,tier:3,once:1,d:'Miễn dao dịch, con cháu có tư cách đi thi. Thanh lưu chê.'},
 {id:'khaihoang',n:'Khai hoang',v:300,mo:24,up:0,tier:3,once:1,d:'Thêm hai mẫu ruộng.'},
 {id:'chuamieu',n:'Trùng tu chùa miếu',v:150,mo:10,up:0,tier:2,d:'Tâm trạng cả nhà khá hơn, thêm danh vọng.'},
 {id:'hoiquan',n:'Hội quán ở kinh thành',v:300,mo:8,up:3,tier:4,d:'Người đi thi và làm quan ở kinh có chỗ trọ, bớt phí dời nhà.'},
 {id:'dinhkinh',n:'Dinh thự ở kinh thành',v:800,mo:18,up:5,tier:5,d:'Quan trong họ ở kinh được hậu thuẫn: thêm thánh ân mỗi năm.'},
 {id:'hocbong',sc:{u:'học trò',n0:5,min:2,max:40,step:3},n:'Học bổng cho học trò nghèo',v:40,mo:0,up:4,tier:2,d:'Nuôi học trò nghèo. Về sau có người biết ơn giúp nhà.'}];

})();
