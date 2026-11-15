# Báo cáo v6.7.0-d7.2

- Ngày: 15/11/2026 · Nền: v6.7.0-d7.1 · Nhánh: `v6.7.0-d7.2` · Bản sửa lỗi nhỏ, không thêm sự kiện (1.693).
- Nguồn: save họ Tiêu 98 năm của mày. Kiểm thử: `node --check` mọi file; chạy mọi lựa chọn `qt5_*`, hoàng tộc (`d4a`), 132 sự kiện Phạm; 2 ván bot kiểm sổ ký ức. **Chưa** chơi tay.

## Đã đọc được gì từ save họ Tiêu
- Ván đi trọn 98 năm, 88 người từng sống. Sổ ghi 323 dòng, ký ức tối đa 14 mục mỗi người, không lỗi. Cốt truyện họ Phạm mở và kết ở E2 (đường L). Quỹ đạt khoảng 35 triệu ở năm 96.
- Cuối ván: **Thương Cảnh Hành** (rể ở trong nhà, họ Thương) lên Nhất phẩm năm 92, vào "mưu đại sự" năm 94, **thất bại năm 97 và cả họ bị tru di (60 người)**. Quỹ về âm 52 nghìn, ổn định 21, hưng 7. Ván vẫn tiếp tục với 19 người sống sót.

## Lỗi tìm thấy và đã sửa
- **Lên quan nhảy vọt:** Cảnh Hành từ Tứ phẩm (lv 2, năm 76) lên Nhất phẩm (lv 8, năm 92) chỉ trong 16 năm, trong khi luật "thời gian ở bậc" (d7.1) đòi ít nhất khoảng 29 năm. Nguyên nhân: các lần đổi chức qua ghế (`assignPost`, danh sách chờ, xin xét) không ghi sổ, nên `tigOk` luôn thấy mốc cũ ở năm 76 và coi như đã ngồi rất lâu. Sửa: mọi lần đổi phẩm hoặc cấp phụ qua ghế đều ghi `chuc` vào sổ (kèm cấp phụ).
- Tác dụng: từ bản này luật thời gian ở bậc có hiệu lực thật. Cần mày chơi lại một ván quan để xem Nhất phẩm có còn quá sớm không.

## Nhận xét (chưa sửa)
- **Rể mưu đại sự và kéo cả họ chết:** người đứng đầu mưu đại sự là người ở rể, không phải con cháu họ Tiêu. Tru di vẫn quét 60 người của họ, gồm cả người cưới vào. Có thể đúng thiết kế (cả nhà chịu trách nhiệm), nhưng nếu mày muốn rể không thể cầm đầu mưu đại sự thì nói để tao chặn.
- **Sau tru di, quỹ chưa về 0 hoàn toàn:** các chi xa vẫn còn tiền (chi Minh L gần 3 triệu) trong khi nhà chính hết sạch. Chưa biết có đúng ý không.
- Các dấu mới (`doi_thu`, `bi_hac`, `tien_cu`, `hai`, `tha`) mỗi dấu xuất hiện 1 đến 4 lần cả ván: ít, chưa tạo cảm giác "nhớ" rõ.

## Ghi chú kỹ thuật
- Hai lần liên tiếp trong thư mục làm việc của tao biến mất các tệp `ev-*.js` và `data-v64*.js` mà tao không động tới (nghi do `git` trong thư mục scratch). Tao đã khôi phục từ zip, đổi tên `.git` của bản scratch và đóng gói bằng danh sách tệp đã kiểm. Zip d7.2 có 44 tệp `ev-*.js`, 4 tệp `data*.js`.
