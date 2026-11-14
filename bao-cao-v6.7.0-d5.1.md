# Báo cáo v6.7.0-d5.1

- Ngày: 14/11/2026 · Nền: v6.7.0-d5 · Nhánh: `v6.7.0-d5.1` · Bản sửa lỗi nhỏ, không thêm nội dung mới. Sự kiện 1.689, kỳ ngộ 258.
- Nguồn: phân tích hai save mới (Nam Cung năm 37, Vạn năm 51) và bản rà soát ngoài (`Đánh giá mới.docx`, `BNTG_Ra_soat_su_kien_day_du_v670d5.xlsx`, 19 phát hiện). Tao đối chiếu từng phát hiện với mã trước khi sửa.
- Kiểm thử: `node --check` mọi file; chạy mọi lựa chọn 132 sự kiện Phạm và 31 sự kiện hoàng tộc (không lỗi); bot 100 năm kiểm bất biến (không vi phạm); thử riêng đường lịch `pm_r6`, giới tính `pc_0`, chuỗi tình duyên c7, `tg_40`; đo lại tần suất sự kiện bằng bot hai lần. **Chưa** chơi tay.

## Đã sửa

| Mục | Nguồn | Sửa |
|---|---|---|
| `c12_b` (Ngôi chùa trên núi) tự gọi lại, cày EQ, mị lực, tâm trạng vô hạn | Save Vạn, rà soát ngoài | Ở lại chùa tối đa hai lần rồi sang bước sau |
| Sự kiện cố định do hệ thống khác gọi (nhà chật, thời thế, sứ giả, quan hệ họ khác) bỏ qua thời gian hồi | Save Vạn, đo bot | Chặn lặp: mười năm với sự kiện không kèm dữ liệu, hai năm rưỡi giữa hai lần và mười năm cho cùng một họ với sự kiện quan hệ. Đo lại: `gt_nha_chat` từ 21 đến 24 lần/ván xuống 4 đến 8; số lần một người gặp lại cùng sự kiện tối đa khoảng 6 |
| Nhật ký "Gia cảnh nợ nần…" lặp mỗi quý | Save Vạn | Tối đa một lần mỗi năm |
| `pc_0` Phò mã không khóa giới tính | Rà soát ngoài | Chỉ nhân vật nam |
| `vp_6` lời dẫn và hành động mâu thuẫn (không có vua mới vẫn cho vào chùa) | Rà soát ngoài | Chỉ vào chùa khi có vua mới lên trong vòng 5 năm; ngược lại ở lại cung |
| `pm_r6` (Họ Phạm ở đỉnh quyền lực) không bao giờ được gọi | Rà soát ngoài | Xếp lịch 5 năm sau khi Kiên lên Thái sư, nếu ân oán chưa khép |
| `tg_40` thưởng thêm cho tá điền lại cộng tiền cho gia chủ | Rà soát ngoài | Đổi thành trừ tiền |
| `cd_31` tập ấm: lời nói Tứ phẩm nhưng điều kiện Ngũ phẩm | Rà soát ngoài | Điều kiện đúng Tứ phẩm |
| `c16_b` lập đàn cầu mưa chỉ mất tiền khi thất bại | Rà soát ngoài | Trừ tiền dù mưa hay không |
| `c1` tiêu đề "Mười năm sau" mà chỉ cách 1 đến 2 năm | Rà soát ngoài | Cách khoảng 9 đến 11 năm |
| `th_a` và `th_b` (thoái hôn) đổi họ nhà bên kia giữa hai chương và tạo người mới | Rà soát ngoài | Giữ họ đã chọn, người phối ngẫu mang đúng họ ấy |
| Tuyến tình duyên cũ (`tinh_hoi_xuan`, `tinh_thu_tinh`, `c7`) tạo người khác khi cưới | Rà soát ngoài | Lưu người đã gặp (`flags.lvP`), cưới đúng người ấy |
| `tinh_hoi_xuan_b` chờ vô hạn | Rà soát ngoài | Chờ tối đa hai lần, sau đó người kia nhận lời nhà khác |
| Câu chữ: `tk_b` "thông gia", `qd_de_vo` "đền sống thờ" | Rà soát ngoài | Sửa lời |
| `t_n_duoc_mua` biếu người nghèo lại cộng tiền cho gia chủ | Quét tĩnh của tao | Đổi thành trừ tiền |
| `v64_vo_chong_buon` hiện cho người không có vợ chồng | Quét tĩnh của tao | Chỉ khi có vợ chồng |
| `qn631_nghi_phep_que` nhắc "vợ con" cho lính độc thân | Quét chạy thử | Chỉ nhắc khi có |

## Cách tao tìm thêm (theo yêu cầu ưu tiên continuity, danh tính, điều kiện, hiệu ứng)
- **Quét tĩnh toàn bộ `ev-*.js`:** chuỗi sự kiện nhiều bước mà bước sau tạo lại người hoặc họ mới; tiêu đề "N năm sau" mà lịch hẹn lệch; lựa chọn có nhãn chi mà cộng tiền (và ngược lại); tiền chỉ trừ ở nhánh thất bại; sự kiện nhắc vợ, chồng mà không có điều kiện. Phần lớn kết quả quét là dương tính giả (ví dụ "Bán" mà thu tiền là đúng); tao xem tay từng cái trước khi sửa.
- **Quét chạy thử:** 112 nhân vật giả (cả hai giới, mọi nghề, hai bậc), mọi sự kiện thường đủ điều kiện, tìm lời kể nhắc vợ, chồng, con, cha mẹ mà nhân vật không có. Chỉ 3 cái là lỗi thật (ở bảng trên); các cái còn lại nhắc người khác (con của người quen, phu nhân nhà chủ).
- Kết luận: lớp lỗi cùng loại với bản rà soát ngoài còn rất ít ở các sự kiện đơn lẻ. Chỗ yếu thật nằm ở các **chuỗi nhiều bước tạo người** (đã sửa tình duyên cũ) và ở **vòng tự lặp** (đã sửa `c12_b`).

## Chưa sửa (đã ghi vào danh sách tồn đọng)
- Tru di cửu tộc không ghi cái kết vào Sử sách.
- Chi phí nuôi quân khi mưu đại sự bị trừ ngầm, không hiện trong dòng tiền, và mưu đại sự không dừng khi vỡ nợ.
- Tang lễ sơ sài vẫn bị phạt danh vọng nặng khi nhà đang nợ.
- `nb_b`/`nb_c` lời dẫn chỉ nói thi văn trong khi nhánh học cả văn võ.
- Thuốc lá Tây, khoai lang đất mới (niên đại), `ran_can` (mẹo sơ cứu dân gian): giữ nguyên, cần quyết định "bối cảnh" của thế giới.
- Bản rà soát ngoài còn nói manifest sự kiện không khớp mã (254 id thiếu, 111 id thừa); `events-meta.js` cũng chưa có dữ liệu cho sự kiện d4, d5.
- Quy trình tuyển phò mã giống Minh hơn (do triều đình khởi xướng): là quyết định thiết kế.
- Chưa tìm ra lý do hai gia tộc trong hai save quá nhỏ (4 và 5 người sau 37 và 51 năm).
