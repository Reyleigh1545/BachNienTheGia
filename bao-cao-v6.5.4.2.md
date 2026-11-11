# Báo cáo v6.5.4.2 · Sửa hai lỗi từ báo cáo kiểm thử v6.5.4.1

- Ngày: 12/11/2026. Nhánh `v6.5.4.2`, cắt từ `v6.5.4.1`. Số sự kiện 1.294, kỳ ngộ 224 (không đổi).
- Nguồn: `BachNienTheGia_Test_Report_v6.5.4.1_FULL.md`. Tao đối chiếu từng điểm P1 với mã thật trước khi sửa.
- Kiểm tra: `node --check` toàn bộ; máy chạy ngắn không lỗi, `audit` sạch; kiểm riêng hai chỗ sửa (bảng dưới). Save cũ nạp được, không thêm trường mới.

## Đã xác minh và sửa

| Điểm trong báo cáo | Kết quả đối chiếu | Cách sửa |
|---|---|---|
| P1 hệ số tiền áp nhầm cho khoản NHẬN | Đúng. `Lễ biếu của cấp dưới`, `Nhận hối lộ thay cấp trên`, `Tiền hối lộ` và `Lễ vật đêm khuya` đều là nhận tiền; `Nghi hạ độc trong bữa tiệc` chỉ là phí thầy thuốc nhỏ. Cả năm dính chữ biếu/hối lộ/tiệc nên bị nhân mạnh | Thêm danh sách loại trừ `MS_NO` (5 sự kiện). Nhóm chi tiêu mạnh còn 22 sự kiện (trước 27). Kiểm lại: cả năm đều `ms=false` |
| P1 `eligibleWhy` thiếu `lvr` | Đúng. `qn_tuong_quan` cần cấp quân 5–7, người cấp 8 bị `eligible` loại nhưng Admin không báo lý do | Thêm điều kiện `lvr`, và hai điều kiện metadata (ở xa nhà không gặp chuyện làng/mùa vụ, sự kiện chiến sự khi chưa có chiến sự). Kiểm lại: Admin báo "sai cấp quân ngũ (lvr)" |

## Chưa làm, để bản sau (tao đã đọc và đồng ý là việc thật)
- **Nhân duyên và người kế tục:** báo cáo thấy 17/96 ván tự động đứt dòng trong 40 năm, chỉ 4/96 nhân vật đủ `romOk` lúc khởi đầu. Bộ chọn là ngẫu nhiên nên không phải tỉ lệ của người chơi thật, nhưng cửa nhân duyên sớm hẹp là có thể. Đây là chỉnh luật chơi, tao không sửa lặng lẽ; xem mục hỏi dưới.
- **Ghi nguyên nhân game over** (nợ, không người nối dõi, lưu vong…) vào admin: nên làm cùng đợt đo cân bằng.
- **Duyệt 42 sự kiện chưa phân loại** và domain Giáo dục/Giang hồ bị đếm thiếu: làm khi mày gửi lại `manifest-su-kien.csv`.
- **Chạy ba đường lên ngôi từ đầu đến đăng cơ, đo tốc độ `pickEvent`, thử trình duyệt thật:** chưa làm.
- `S.ver` bắt đầu `6.3` rồi `migrate` nâng lên `6.41`: đây là phiên bản cấu trúc save, không phải phiên bản game; không đổi để khỏi động vào save cũ.

## Còn lại cần mày biết
- Mày muốn tao nới cửa nhân duyên cho gia chủ trẻ (ví dụ thêm đường mai mối phổ thông khi 22–25 tuổi chưa vợ) thì báo; tao làm ở bản sau.
