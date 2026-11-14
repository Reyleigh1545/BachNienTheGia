# Báo cáo v6.7.0-d6

- Ngày: 14/11/2026 · Nền: v6.7.0-d5.1 · Nhánh: `v6.7.0-d6` · Sự kiện 1.689, kỳ ngộ 258 (không thêm sự kiện).
- Yêu cầu của mày: cân bằng các chuỗi cốt truyện; trong lúc cốt truyện chạy thì sự kiện thường không được tách rời, phải góp phần làm sâu cốt truyện bằng ảnh hưởng nhỏ.
- Kiểm thử: `node --check` mọi file; chạy mọi lựa chọn 132 sự kiện Phạm và 31 sự kiện hoàng tộc (không lỗi); bot 100 năm kiểm bất biến; chạy trọn ân oán họ Phạm bằng bot (kết E2 qua đường Dân tâm); chạy thử **39 chuỗi cốt truyện cũ** bằng bộ chạy mới (60 lượt ngẫu nhiên mỗi chuỗi, trước và sau khi sửa). **Chưa** chơi tay.

## 1. Đo các chuỗi cốt truyện cũ
Bộ chạy `tools/chain.js` bắt đầu từ gốc mỗi chuỗi, chọn ngẫu nhiên từng lựa chọn, đi hết đường (kể cả các bước hẹn giờ), ghi lại thay đổi danh vọng, tiền, chỉ số, thời gian và tỉ lệ chết. Kết quả trước khi sửa (chọn ngẫu nhiên, nhà bậc khá):
- Phần thưởng gần như bằng không: danh vọng trung bình thêm 0 đến 10 với hầu hết chuỗi, tiền gần 0. Nguyên nhân: tiền thưởng chuỗi tính bằng thang nhẹ (nhân tối đa 7 lần theo bậc nhà) còn danh vọng không nhân theo bậc, nên nhà càng lớn thì phần thưởng càng nhỏ so với nhà.
- Phạt thất bại quá nặng: nhiều chuỗi trừ sức khỏe tối đa 4 đến 9 điểm một lần (không hồi lại được) và sức khỏe 30 đến 45 điểm. Ở p10 các chuỗi `c4_su_mon`, `c6_ban_do`, `c3_muoi` mất 25 đến 49 điểm chỉ số.
- Chuỗi lệch: `c11_nguoi_la` thưởng gấp 4 đến 10 lần các chuỗi khác (danh vọng +37, p90 +139).
- Chuỗi `c1_cau_am` hẹn 125 tháng (đã sửa ở d5.1 cho khớp "mười năm sau").

## 2. Sửa cân bằng chuỗi (áp cho mọi bước chuỗi cũ, `arc:1`)
- Tiền thưởng nhân theo thang thu nhập của bậc nhà (tỉ lệ `MM_THU/MM_NHE`, tối đa khoảng 2,9 lần); danh vọng thưởng nhân `1 + 0,3 × bậc`.
- Mỗi lần phạt sức khỏe tối đa không quá 3 điểm; phạt sức khỏe không quá 30 điểm.
- Kết quả đo lại: danh vọng trung bình mỗi chuỗi tăng gấp 2 đến 3 lần (ví dụ `c9_nhan_mon` 18 lên 30, `c16_cau_mua` 23 lên 42, `c10_thu_sinh` 6 lên 20). **Phạt nặng thì gần như không đổi:** p10 của chỉ số (kịch bản xấu) vẫn quanh −30 đến −47 ở `c4_su_mon`, `c3_muoi`, `c6_ban_do` vì phạt sức khỏe 30 điểm vẫn là mức lớn. Tao chỉ đặt trần chứ chưa giảm từng chuỗi. `c11_nguoi_la` vẫn là chuỗi thưởng nhất, nay +78.
- Các chuỗi **thiếu phần thưởng thật** (`c14_bat_coc`, `c15_nguoi_thu_ba`, `c7_thu`, `v61_cho_vay_ban`, `nong_ban_ruong_re`, `tinh_hoi_xuan`) không đổi: chúng là tình huống khủng hoảng hoặc tình cảm, nhưng tao chưa thêm kết thúc có ý nghĩa cho chúng.

## 3. Sự kiện thường nối vào cốt truyện
- **Trọng số theo cốt truyện đang chạy:** khi một chuỗi cũ đang chờ bước tiếp theo, người ấy bớt gặp kỳ ngộ khác chen vào (nhân 0,3). Khi ân oán họ Phạm ở chương 2 đến 5, sự kiện về quan trường, xã hội và kinh tế xuất hiện nhiều hơn 25% (và giảm kỳ ngộ, giang hồ, triều đình 20% đến 50% ở chương 4, 5).
- **Dấu nhỏ và một câu nối:** sau một sự kiện thường, cốt truyện đang chạy có thể nhận một dấu rất nhỏ (cộng 1 hoặc 2 điểm ẩn) và thêm một câu ngắn vào cuối lời kể, tối đa 6 tháng một lần. Ví dụ: sự kiện quan trường cho một người làm quan có thể thêm "Một viên thư lại quen nói nhỏ: sổ sách của họ Phạm có chỗ không khớp" (chứng cứ +1), hoặc "Người của họ Phạm có mặt trong buổi việc ấy, và ghi nhớ nhà mình" (cảnh giác +2). Chỉ áp cho đúng loại người (quan, người buôn…).
- Khung dùng chung (`ARC.<id>.theme` và `ARC.<id>.touch`), chỉ mới dùng cho ân oán họ Phạm. Các cốt truyện lớn sau này dùng được ngay.
- Đo thử bot 35 năm: 10 câu nối, tức khoảng ba, bốn năm một lần, không gây rối nhịp.

## Còn lại cần mày biết
- **Chuỗi cũ chưa có "dấu nối"**: tao mới làm giảm nhiễu (bớt kỳ ngộ chen vào), chưa viết câu nối riêng cho từng chuỗi cũ. Làm được, nhưng phải viết cho từng chuỗi (39 chuỗi), mỗi chuỗi vài câu.
- **Phân loại sự kiện (`events-meta.js`) chưa chính xác** nên có lần câu nối đi lệch ngữ cảnh (đã chặn bằng điều kiện theo nghề). Cần dựng lại phân loại.
- Chưa cân bằng **thời lượng** các chuỗi (hầu hết 3 đến 40 tháng) và chưa thêm phần thưởng thật cho các chuỗi đã liệt kê.
- Đo bằng chọn ngẫu nhiên; chưa đo bằng người chơi thật.
- Không đảm bảo tương thích save cũ.
