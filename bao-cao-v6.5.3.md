# Báo cáo v6.5.3 · Gia chủ nhậm chức xa, bảng thời thế, quân ngũ

- Ngày: 11/11/2026. Nhánh `v6.5.3`, cắt từ `v6.5.2`.
- Số sự kiện: thêm 25 (1 sự kiện chọn lúc con tuổi 14, 24 sự kiện quân ngũ theo cấp, trong đó 6 là kỳ ngộ quân ngũ). Tổng khoảng 1.290.
- Kiểm tra: `node --check` toàn bộ file; smoke ngắn trên admin, không lỗi script: bảng thời thế, hộp gia chủ nhậm chức xa (cả hai nhánh), gia đình lính tự đồng bộ, sự kiện theo cấp. **Không** chạy ván dài, không bấm từng lựa chọn của 24 sự kiện mới.
- Save cũ nạp được; người con của lính trong save cũ được đồng bộ ở lần `lqYear` đầu tiên.

## Đã làm

| Điểm | Mục |
|---|---|
| Gia chủ nhậm chức xa: cả nhà dọn tới (cách A mày chọn) | 1 |
| Bảng thời thế trong trang Gia tộc | 2 |
| Con của lính, học trong doanh, chọn lúc 14 tuổi | 3 |
| Sự kiện và kỳ ngộ quân ngũ chia theo cấp | 4 |

## 1. Gia chủ nhậm chức xa
Gia chủ được bổ vào ghế ở tỉnh khác thì hiện hộp "Nhậm chức ở xa", hai lựa chọn:
- **Dời cả nhà tới nơi đó**: dùng cơ chế dời nhà có sẵn (bán ruộng và cơ sở ở nơi cũ, mất bớt quan hệ cũ, tốn tiền đường), ở bậc nơi ở rẻ nhất. Sau đó cả gia tộc ở nơi mới.
- **Từ chối chức**: nếu trước đó gia chủ đang giữ một ghế khác thì trả về ghế cũ, còn nếu là lần bổ đầu tiên thì quay lại sổ hậu bổ chờ ghế khác.

Đường vào bị giặc chặn thì không dời được. Ghế ở ngay tỉnh nhà thì không hỏi gì.

## 2. Bảng thời thế
- Tiêu đề: **Triều {tên triều} · {niên hiệu} · Hoàng Đế {tên}**, ví dụ "Triều Đại Nguyễn · Trường Thịnh · Hoàng Đế Nguyễn Thành Trung". Trang Quan trường cũng đổi cách ghi niên hiệu và Hoàng Đế.
- Bảng chỉ chụp lại **mỗi năm** hoặc khi có biến động (đổi vua, tranh ngôi nổ ra). Không tính lại mỗi lần mở trang.
- Nhà có người giữ chức ở kinh sư (kể cả quan võ ở kinh) hoặc có Giám chính thì thấy rõ tình hình vua, dân tâm, quốc khố, loạn, thái tử. Không có thì chỉ đọc được một câu tin đồn, và dòng "triều đình đang tranh ngôi" cũng ẩn.
- Hộp mở đầu của ba đường lên ngôi vẫn đọc được tình hình rõ, vì người mưu đại sự biết rõ chuyện triều.

## 3. Gia đình lính
- **Con theo mẹ**: nếu vợ theo vào doanh thì mọi con dưới 16 tuổi cũng theo, hết cảnh anh em chia hai nơi. Con sinh ra khi mẹ ở doanh vẫn theo như trước.
- **Học trong doanh**: con theo cha vào doanh chỉ học ở trường "Học trong doanh trại", không hỏi chọn trường nữa. Về nhà thì quay lại học bình thường.
- **Tuổi 14**: hiện sự kiện chọn cho con theo nghề binh trong doanh (đủ 16 thì nhập ngũ) hoặc gửi về nhà chính học tiếp.

## 4. Quân ngũ theo cấp
- Thêm khóa `lvr:[a,b]` giới hạn sự kiện theo cấp trong quân. Nhóm cấp: 0 đến 2 (binh sĩ, ngũ trưởng, thập trưởng), 3 đến 4 (bách hộ, thiên hộ), 5 đến 7 (phó tướng trở lên).
- Gắn lại cấp cho 14 sự kiện quân ngũ có từ trước (ví dụ "Tân binh" chỉ cho cấp 0 đến 1, "Tướng quân" chỉ cho cấp 5 trở lên).
- Viết mới 24 sự kiện, mỗi nhóm cấp có 6 sự kiện thường và 2 kỳ ngộ. Chủ yếu về canh gác, ngựa chiến, thư nhà, duyệt đội, xén lương, tiếp tế, giám quân, triệu hồi về kinh, tướng địch xin hàng, tiến cử, quân phí, vua ban thưởng.
- Sự kiện của người đi lính vốn chỉ bốc từ nhóm quân ngũ (không lẫn việc nhà), giữ nguyên.

## Còn lại cần mày biết
- Số sự kiện quân ngũ mới còn ít so với lượng cần. Tao viết thêm dần theo nhóm cấp ở các bản nội dung sau (6.5.11 trở đi), sau khi bảng chia nhóm ở 6.5.9 xong.
- Chưa tách bộ **kỳ ngộ** chung ra khỏi người trong quân, vì kỳ ngộ vẫn đi qua cùng bộ lọc `job`; người trong quân hiện chỉ nhận được các kỳ ngộ có khóa quân ngũ.
- Con của lính không chọn "Ở nhà" khi vào doanh; nếu sau này mày muốn cho phép gửi con về ở nhà khi còn nhỏ thì tao thêm lựa chọn ở lúc vợ con đi theo.
- Gia chủ dời nhà theo ghế: các quan khác của gia tộc đang nhậm chức ở nơi gia chủ chuyển tới sẽ phạm hồi tị (quan tại quê). Tao chưa xử, sẽ xem lại ở 6.5.9.
