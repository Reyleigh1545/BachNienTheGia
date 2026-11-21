/* Bách Niên Thế Gia v6.7.0-d9.5 · Gia bảo (d9.5, theo ý chủ dự án 21/11).
   Mỗi cái kết (D.ENDINGS) khi đạt thì cho một món gia bảo ngẫu nhiên trong kho riêng của cái kết đó; món đã có thì ưu tiên món chưa có.
   Gia bảo lưu ở bộ nhớ ngoài ván (meta().gb), dùng ở màn tạo ván mới (chọn 1 món, mở thêm ô khi đã đạt nhiều kết).
   Tác dụng khởi đầu (đều nhẹ): m = tiền công quỹ (đồng), fame = danh vọng gia tộc, st = chỉ số người đầu (tri, vo, mi, eq, suc), duyen = cơ duyên, hung = hưng thịnh, on = ổn định, tk = có Thiết khoán.
   Muốn bỏ hệ thống này: xóa file, xóa thẻ <script> trong index.html; engine kiểm tra window.D.GIABAO trước khi dùng. */
window.D=window.D||{};
window.D.GIABAO={
 items:{
  gb_an_ngoc:{n:'Ấn ngọc nhỏ',end:'T1',d:'Con dấu nhỏ của một quyền thần xưa. Danh vọng +60, EQ +6.',fx:{fame:60,st:{eq:6}}},
  gb_mat_thu:{n:'Mật thư tiên triều',end:'T1',d:'Bức thư dặn cách đối nhân xử thế trong triều. Trí +6, tiền +4.000.',fx:{st:{tri:6},m:4000}},
  gb_chieu_to:{n:'Chiếu thư ban cho tổ',end:'T1',d:'Tờ chiếu cũ treo ở gian thờ. Danh vọng +40, hưng thịnh +5.',fx:{fame:40,hung:5}},
  gb_kiem_to:{n:'Bảo kiếm tổ truyền',end:'T2',d:'Thanh kiếm đã đi qua nhiều trận. Võ lực +10.',fx:{st:{vo:10}}},
  gb_binh_thu:{n:'Binh thư chép tay',end:'T2',d:'Sổ tay binh pháp của một đại tướng. Trí +6, Võ lực +4.',fx:{st:{tri:6,vo:4}}},
  gb_ho_phu:{n:'Hổ phù gỉ',end:'T2',d:'Nửa hổ phù đã mòn. Danh vọng +40, Võ lực +4.',fx:{fame:40,st:{vo:4}}},
  gb_co_nghia:{n:'Ngọn cờ nghĩa cũ',end:'T3',d:'Lá cờ từng đi qua một cuộc khởi nghĩa. Danh vọng +50, EQ +5.',fx:{fame:50,st:{eq:5}}},
  gb_tui_bac:{n:'Túi bạc nghĩa quân',end:'T3',d:'Phần quân phí còn sót. Tiền +8.000.',fx:{m:8000}},
  gb_ban_do_trai:{n:'Bản đồ trại cũ',end:'T3',d:'Bản đồ chỉ đường và nơi ẩn náu. Trí +5, Võ lực +3.',fx:{st:{tri:5,vo:3}}},
  gb_thiet_khoan:{n:'Thiết khoán sơ bản',end:'T4',d:'Tấm khoán sắt nhỏ, cứu được một lần khỏi án tru di. Có Thiết khoán ngay từ đầu.',fx:{tk:1}},
  gb_ngoc_bai:{n:'Ngọc bội công thần',end:'T4',d:'Ngọc bội vua ban cho tổ tiên. Danh vọng +60.',fx:{fame:60}},
  gb_thu_vua:{n:'Thư tay của vua',end:'T4',d:'Thư an ủi viết bằng chữ vua. Tiền +5.000, EQ +4.',fx:{m:5000,st:{eq:4}}},
  gb_an_bien:{n:'Ấn biên ải',end:'T5',d:'Con ấn gỉ ở nơi biên cương. Võ lực +6, danh vọng +30.',fx:{st:{vo:6},fame:30}},
  gb_dia_do:{n:'Bản đồ biên cương',end:'T5',d:'Bản đồ từng ngọn núi, con suối ngoài ải. Trí +6.',fx:{st:{tri:6}}},
  gb_ngua:{n:'Giống ngựa chiến',end:'T5',d:'Đôi ngựa giống quý. Võ lực +6, tiền +3.000.',fx:{st:{vo:6},m:3000}},
  gb_an_nhiep:{n:'Ấn nhiếp chính',end:'T6',d:'Chiếc ấn dùng khi đỡ ngai vàng cho thiếu đế. Danh vọng +50, EQ +5.',fx:{fame:50,st:{eq:5}}},
  gb_chi_dau:{n:'Sắc chỉ giữ ngôi',end:'T6',d:'Tờ chỉ dặn việc nước. Trí +8.',fx:{st:{tri:8}}},
  gb_trang_suc:{n:'Trang sức ngoại thích',end:'T6',d:'Bộ trang sức hoàng thất ban. Tiền +6.000, mị lực +4.',fx:{m:6000,st:{mi:4}}},
  gb_so_cai:{n:'Sổ cái bằng vàng',end:'T7',d:'Cuốn sổ ghi ba đời buôn bán. Tiền +15.000.',fx:{m:15000}},
  gb_chia_kho:{n:'Chìa khóa kho cũ',end:'T7',d:'Chìa kho còn một ít hàng. Tiền +8.000, hưng thịnh +5.',fx:{m:8000,hung:5}},
  gb_ban_tinh:{n:'Bàn tính tổ',end:'T7',d:'Bàn tính gỗ lim đã mòn tay. Trí +6, EQ +4.',fx:{st:{tri:6,eq:4}}},
  gb_ban_thao:{n:'Bản thảo học phái',end:'T8',d:'Bản thảo một học phái từng nổi danh. Trí +10.',fx:{st:{tri:10}}},
  gb_nghien:{n:'Nghiên mực cổ',end:'T8',d:'Nghiên mực của đại nho. Trí +6, danh vọng +20.',fx:{st:{tri:6},fame:20}},
  gb_tang_thu:{n:'Tàng thư thất lạc',end:'T8',d:'Mấy quyển sách quý còn sót. Trí +5, mị lực +3.',fx:{st:{tri:5,mi:3}}},
  gb_giap:{n:'Giáp trụ truyền đời',end:'T9',d:'Bộ giáp cũ vẫn dùng được. Võ lực +8, sức khỏe +4.',fx:{st:{vo:8,suc:4}}},
  gb_ho_phu2:{n:'Hổ phù trấn quốc',end:'T9',d:'Hổ phù từng giữ ải mười năm. Danh vọng +40, Võ lực +4.',fx:{fame:40,st:{vo:4}}},
  gb_quan_ky:{n:'Quân kỳ cũ',end:'T9',d:'Lá cờ của một đội quân trung thành. Danh vọng +30, ổn định +5.',fx:{fame:30,on:5}},
  gb_bi_kip:{n:'Nửa quyển bí kíp',end:'T10',d:'Nửa quyển bí kíp võ lâm. Võ lực +10.',fx:{st:{vo:10}}},
  gb_lenh_bai:{n:'Lệnh bài minh chủ',end:'T10',d:'Lệnh bài từng đứng đầu võ lâm. Danh vọng +40, Võ lực +4.',fx:{fame:40,st:{vo:4}}},
  gb_ruou:{n:'Bình rượu nghĩa hữu',end:'T10',d:'Rượu kết nghĩa của các môn phái. EQ +6, mị lực +3.',fx:{st:{eq:6,mi:3}}},
  gb_gia_pha:{n:'Gia phả mạ vàng',end:'T11',d:'Gia phả ghi tám đời. Danh vọng +80.',fx:{fame:80}},
  gb_hu_bac:{n:'Hũ bạc của tổ',end:'T11',d:'Hũ bạc chôn dưới nền từ đường. Tiền +12.000.',fx:{m:12000}},
  gb_bai_vi:{n:'Bài vị tổ tiên',end:'T11',d:'Bài vị chạm gỗ quý. Cơ duyên +8, ổn định +8.',fx:{duyen:8,on:8}},
  gb_ao_tang:{n:'Mảnh áo tang',end:'L1',d:'Mảnh áo cũ của người thoát được. Trí +4, cơ duyên +4.',fx:{st:{tri:4},duyen:4}},
  gb_so_no:{n:'Sổ nợ cũ',end:'L2',d:'Sổ ghi từng khoản nợ làm tan nhà, nhắc ghi nhớ bài học. Trí +5, EQ +3.',fx:{st:{tri:5,eq:3}}},
  gb_bua_tu:{n:'Bùa cầu tự',end:'L3',d:'Lá bùa của một bà đồng già. Cơ duyên +8.',fx:{duyen:8}},
  gb_thu_cau:{n:'Thư cầu viện',end:'L4',d:'Lá thư cầu viện chưa kịp gửi. EQ +5, trí +3.',fx:{st:{eq:5,tri:3}}},
  gb_bao_gao:{n:'Bao gạo cứu nạn',end:'L5',d:'Bao gạo giữ được qua loạn. Tiền +3.000, sức khỏe +5.',fx:{m:3000,st:{suc:5}}},
  gb_dat_que:{n:'Gói đất quê cũ',end:'L6',d:'Gói đất mang theo khi tha hương. EQ +5, ổn định +5.',fx:{st:{eq:5},on:5}}
 },
 /* số ô gia bảo khi tạo ván: 1 + một ô cho mỗi 6 cái kết khác nhau đã đạt, tối đa 3 */
 slots:n=>Math.min(3,1+Math.floor(n/6))
};
