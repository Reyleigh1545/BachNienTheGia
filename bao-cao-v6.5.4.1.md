# Báo cáo v6.5.4.1 · Hệ số tiền sự kiện chỉ áp dụng cho sự kiện hợp lý

- Ngày: 11/11/2026. Nhánh `v6.5.4.1`, cắt từ `v6.5.4`. Chỉ sửa một điểm mày nêu.
- Kiểm tra: `node --check` toàn bộ file; máy tự chơi ngắn không lỗi script; đếm số sự kiện được gắn nhãn chi tiêu (27) và duyệt tên từng sự kiện.
- Save cũ nạp được, không thêm trường mới.

## Lỗi
Ở 6.5.4 tao cho mọi khoản tiền trong sự kiện và kỳ ngộ nhân theo tổng tiền quỹ, từ 1 đến 12 lần. Nhà giàu thì cả khoản thu lẫn khoản chi đều phình ra, nhà nghèo thì khoản thu rất nhỏ. Đúng như mày nói, hợp lý với tiệc tùng, đám cưới nhưng vô lý với những việc khác.

## Cách sửa
- Hệ số tiền nay có hai mức. Mức mạnh (tới 12 lần theo tổng tiền quỹ) chỉ dành cho sự kiện **chi tiêu theo cỡ nhà**: tiệc, yến tiệc, đám cưới, sính lễ, mừng thọ, đám tang, biếu, hối lộ, quyên góp, từ thiện, chủ tế, cúng, xây từ đường, sửa nhà, lễ vật. Hiện có 27 sự kiện như vậy, tao nhận ra bằng tên sự kiện. Kỳ ngộ không bao giờ vào nhóm này.
- Mọi chỗ còn lại (khoản thưởng, trộm cướp, tìm được vàng, thu nhập phụ từ sự kiện, phí trong các hộp của engine) chỉ nhân nhẹ theo tổng tiền, từ 1 đến 4 lần, nên không còn chênh quá xa giữa nhà giàu và nhà nghèo.

## Còn lại cần mày biết
- Danh sách 27 sự kiện lấy theo tên nên có thể còn sót hoặc còn thừa. Mày thấy sự kiện nào tiêu tiền quá ít hoặc quá nhiều thì gửi tên, tao thêm hoặc bớt khỏi nhóm. Muốn chính xác tuyệt đối thì phải gắn nhãn tay từng sự kiện; việc đó đi cùng bản duyệt `manifest-su-kien.csv`.
- Mức nhẹ (1 đến 4 lần) vẫn làm khoản thu của nhà nhiều tiền lớn hơn nhà nghèo một chút. Nếu mày muốn bỏ hẳn, đặt mức nhẹ về 1 lần thì báo.
