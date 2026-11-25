/* Bách Niên Thế Gia v6.7.0-d9.5 · Gia bảo (d9.5, theo ý chủ dự án 21/11).
   Mỗi cái kết (D.ENDINGS) khi đạt thì cho một món gia bảo ngẫu nhiên trong kho riêng của cái kết đó; món đã có thì ưu tiên món chưa có.
   Gia bảo lưu ở bộ nhớ ngoài ván (meta().gb), dùng ở màn tạo ván mới (chọn 1 món, mở thêm ô khi đã đạt nhiều kết).
   Tác dụng khởi đầu (đều nhẹ, d9.7 chủ dự án 23/11: chỉ cộng 7 chỉ số chính): st = chỉ số người đầu (tri, vo, suc, mi, eq, tam), duyen = cơ duyên. Không còn cộng tiền, danh vọng, hưng thịnh, ổn định hay Thiết khoán (engine vẫn hiểu các khóa m, fame, hung, on, tk nếu sau này cần).
   Muốn bỏ hệ thống này: xóa file, xóa thẻ <script> trong index.html; engine kiểm tra window.D.GIABAO trước khi dùng. */
window.D=window.D||{};
window.D.GIABAO={
 items:{
  gb_an_ngoc:{n:'Ấn ngọc nhỏ',end:'T1',d:'Con dấu nhỏ của một quyền thần xưa. EQ +8, tâm trạng +4.',fx:{st:{eq:8,tam:4}}},
  gb_mat_thu:{n:'Mật thư tiên triều',end:'T1',d:'Bức thư dặn cách đối nhân xử thế trong triều. Trí +6, EQ +3.',fx:{st:{tri:6,eq:3}}},
  gb_chieu_to:{n:'Chiếu thư ban cho tổ',end:'T1',d:'Tờ chiếu cũ treo ở gian thờ. Mị lực +5, tâm trạng +6.',fx:{st:{mi:5,tam:6}}},
  gb_kiem_to:{n:'Bảo kiếm tổ truyền',end:'T2',d:'Thanh kiếm đã đi qua nhiều trận. Võ lực +10.',fx:{st:{vo:10}}},
  gb_binh_thu:{n:'Binh thư chép tay',end:'T2',d:'Sổ tay binh pháp của một đại tướng. Trí +6, Võ lực +4.',fx:{st:{tri:6,vo:4}}},
  gb_ho_phu:{n:'Hổ phù gỉ',end:'T2',d:'Nửa hổ phù đã mòn. Võ lực +8.',fx:{st:{vo:8}}},
  gb_co_nghia:{n:'Ngọn cờ nghĩa cũ',end:'T3',d:'Lá cờ từng đi qua một cuộc khởi nghĩa. EQ +8, tâm trạng +4.',fx:{st:{eq:8,tam:4}}},
  gb_tui_bac:{n:'Túi bạc nghĩa quân',end:'T3',d:'Phần quân phí còn sót. Tâm trạng +4, cơ duyên +6.',fx:{st:{tam:4},duyen:6}},
  gb_ban_do_trai:{n:'Bản đồ trại cũ',end:'T3',d:'Bản đồ chỉ đường và nơi ẩn náu. Trí +5, Võ lực +3.',fx:{st:{tri:5,vo:3}}},
  gb_thiet_khoan:{n:'Thiết khoán sơ bản',end:'T4',d:'Tấm khoán sắt nhỏ của tổ tiên, giữ lại làm kỷ vật. Sức khỏe +6, tâm trạng +4.',fx:{st:{suc:6,tam:4}}},
  gb_ngoc_bai:{n:'Ngọc bội công thần',end:'T4',d:'Ngọc bội vua ban cho tổ tiên. Mị lực +6, EQ +4.',fx:{st:{mi:6,eq:4}}},
  gb_thu_vua:{n:'Thư tay của vua',end:'T4',d:'Thư an ủi viết bằng chữ vua. EQ +6, tâm trạng +4.',fx:{st:{eq:6,tam:4}}},
  gb_an_bien:{n:'Ấn biên ải',end:'T5',d:'Con ấn gỉ ở nơi biên cương. Võ lực +8, sức khỏe +3.',fx:{st:{vo:8,suc:3}}},
  gb_dia_do:{n:'Bản đồ biên cương',end:'T5',d:'Bản đồ từng ngọn núi, con suối ngoài ải. Trí +6.',fx:{st:{tri:6}}},
  gb_ngua:{n:'Giống ngựa chiến',end:'T5',d:'Đôi ngựa giống quý. Võ lực +6, sức khỏe +4.',fx:{st:{vo:6,suc:4}}},
  gb_an_nhiep:{n:'Ấn nhiếp chính',end:'T6',d:'Chiếc ấn dùng khi đỡ ngai vàng cho thiếu đế. Trí +3, EQ +8.',fx:{st:{tri:3,eq:8}}},
  gb_chi_dau:{n:'Sắc chỉ giữ ngôi',end:'T6',d:'Tờ chỉ dặn việc nước. Trí +8.',fx:{st:{tri:8}}},
  gb_trang_suc:{n:'Trang sức ngoại thích',end:'T6',d:'Bộ trang sức hoàng thất ban. Mị lực +8.',fx:{st:{mi:8}}},
  gb_so_cai:{n:'Sổ cái bằng vàng',end:'T7',d:'Cuốn sổ ghi ba đời buôn bán. Trí +6, EQ +4.',fx:{st:{tri:6,eq:4}}},
  gb_chia_kho:{n:'Chìa khóa kho cũ',end:'T7',d:'Chìa kho còn một ít hàng. Trí +4, cơ duyên +6.',fx:{st:{tri:4},duyen:6}},
  gb_ban_tinh:{n:'Bàn tính tổ',end:'T7',d:'Bàn tính gỗ lim đã mòn tay. Trí +6, EQ +4.',fx:{st:{tri:6,eq:4}}},
  gb_ban_thao:{n:'Bản thảo học phái',end:'T8',d:'Bản thảo một học phái từng nổi danh. Trí +10.',fx:{st:{tri:10}}},
  gb_nghien:{n:'Nghiên mực cổ',end:'T8',d:'Nghiên mực của đại nho. Trí +8.',fx:{st:{tri:8}}},
  gb_tang_thu:{n:'Tàng thư thất lạc',end:'T8',d:'Mấy quyển sách quý còn sót. Trí +5, mị lực +3.',fx:{st:{tri:5,mi:3}}},
  gb_giap:{n:'Giáp trụ truyền đời',end:'T9',d:'Bộ giáp cũ vẫn dùng được. Võ lực +8, sức khỏe +4.',fx:{st:{vo:8,suc:4}}},
  gb_ho_phu2:{n:'Hổ phù trấn quốc',end:'T9',d:'Hổ phù từng giữ ải mười năm. Võ lực +6, sức khỏe +4.',fx:{st:{vo:6,suc:4}}},
  gb_quan_ky:{n:'Quân kỳ cũ',end:'T9',d:'Lá cờ của một đội quân trung thành. EQ +6, tâm trạng +5.',fx:{st:{eq:6,tam:5}}},
  gb_tran_phai:{n:'Kiếm phổ trấn phái',end:'GJ',d:'Kiếm phổ của một chưởng môn chính đạo, tặng người cứu vợ ông. Võ lực +8, sức khỏe +2.',fx:{st:{vo:8,suc:2}}},
  gb_bi_kip:{n:'Nửa quyển bí kíp',end:'T10',d:'Nửa quyển bí kíp võ lâm. Võ lực +10.',fx:{st:{vo:10}}},
  gb_lenh_bai:{n:'Lệnh bài minh chủ',end:'T10',d:'Lệnh bài từng đứng đầu võ lâm. Võ lực +6, EQ +4.',fx:{st:{vo:6,eq:4}}},
  gb_ruou:{n:'Bình rượu nghĩa hữu',end:'T10',d:'Rượu kết nghĩa của các môn phái. EQ +6, mị lực +3.',fx:{st:{eq:6,mi:3}}},
  gb_gia_pha:{n:'Gia phả mạ vàng',end:'T11',d:'Gia phả ghi năm đời. Mị lực +4, EQ +6, cơ duyên +4.',fx:{st:{mi:4,eq:6},duyen:4}},
  gb_hu_bac:{n:'Hũ bạc của tổ',end:'T11',d:'Hũ bạc chôn dưới nền từ đường. Tâm trạng +4, cơ duyên +8.',fx:{st:{tam:4},duyen:8}},
  gb_bai_vi:{n:'Bài vị tổ tiên',end:'T11',d:'Bài vị chạm gỗ quý. Tâm trạng +6, cơ duyên +8.',fx:{st:{tam:6},duyen:8}},
  gb_ao_tang:{n:'Mảnh áo tang',end:'L1',d:'Mảnh áo cũ của người thoát được. Trí +4, cơ duyên +4.',fx:{st:{tri:4},duyen:4}},
  gb_so_no:{n:'Sổ nợ cũ',end:'L2',d:'Sổ ghi từng khoản nợ làm tan nhà, nhắc ghi nhớ bài học. Trí +5, EQ +3.',fx:{st:{tri:5,eq:3}}},
  gb_bua_tu:{n:'Bùa cầu tự',end:'L3',d:'Lá bùa của một bà đồng già. Cơ duyên +8.',fx:{duyen:8}},
  gb_thu_cau:{n:'Thư cầu viện',end:'L4',d:'Lá thư cầu viện chưa kịp gửi. EQ +5, trí +3.',fx:{st:{eq:5,tri:3}}},
  gb_bao_gao:{n:'Bao gạo cứu nạn',end:'L5',d:'Bao gạo giữ được qua loạn. Sức khỏe +8.',fx:{st:{suc:8}}},
  gb_dat_que:{n:'Gói đất quê cũ',end:'L6',d:'Gói đất mang theo khi tha hương. EQ +5, tâm trạng +6.',fx:{st:{eq:5,tam:6}}}
 },
 /* số ô gia bảo khi tạo ván: 1 + một ô cho mỗi 6 cái kết khác nhau đã đạt, tối đa 3 */
 slots:n=>Math.min(3,1+Math.floor(n/6))
};
