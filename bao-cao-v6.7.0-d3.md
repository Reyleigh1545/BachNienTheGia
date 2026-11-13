# Báo cáo v6.7.0-d3

- Ngày: 13/11/2026 · Nền: v6.7.0-d2 · Nhánh: `v6.7.0-d3`
- Tổng sự kiện: 1.660 (d2: 1.528, thêm 132 sự kiện `pm_`). Kỳ ngộ vẫn 258.
- Kiểm thử: `node --check` mọi file `.js`; chạy mọi lựa chọn của 132 sự kiện Phạm (390 lựa chọn, 3 tính cách Kiên × 4 nguồn gốc oán), không `undefined`/`NaN`, không lỗi; bot chạy trọn cốt truyện Phạm trên headless Chrome; chụp ảnh trang Cơ ngơi. **Không** chơi tay, **không** đo cân bằng nhiều ván (xem cuối).

| Điểm mày nêu | Mục |
|---|---|
| Kỳ ngộ thưởng phải gấp đôi | 1 |
| Hôn lễ ba mức theo gia thế | 2 |
| Lính cưới vợ phải có định hôn hoặc người trong lòng | 3 |
| Tang lễ ba mức theo cả gia thế | 4 |
| Dự án gia nghiệp: không biết nuôi bao nhiêu, không tăng giảm, giao diện xấu | 5 |
| Sự kiện lệch vương vị | 6 |
| Ân oán họ Phạm: mở đầu, lý do, tiến triển từ từ | 7 |

## 1. Kỳ ngộ
Trong `fx`, sự kiện kỳ ngộ nhân **2,5** cho các khoản nhận được: tiền, danh vọng người, danh vọng gia tộc, hưng thịnh, chiến công. Khoản trừ không đổi. Nghĩa là lựa chọn đúng và thành công cho nhiều hơn sự kiện thường ít nhất gấp đôi. Chưa đo từng kỳ ngộ một; nếu có kỳ ngộ nào vẫn thấy ít, mày báo id.

## 2. Hôn lễ
Mỗi lần có người thành thân (`mkSpouse`) hiện hộp **Hôn lễ**: Giản dị 3, Vừa phải 20, Linh đình 60 (cỡ việc, nhân theo bậc nhà). Mức "vừa" tính từ bậc nhà mình và bậc nhà bên kia. Thấp hơn thì mất thể diện, cao hơn thì bị chê phô trương (nhà nghèo) hoặc được tiếng nhẹ (nhà giàu). Người ngoài quyền điều khiển tự chọn mức vừa.

## 3. Lính cưới vợ
Lính về phép chỉ có lựa chọn cưới khi: (a) gia tộc đã **định hôn** sẵn (mỗi năm 20% lính chưa vợ từ 18 tuổi được định, có dòng nhật ký), hoặc (b) lính đã có **người trong lòng** (`tinh`). Trường hợp (b) cưới đúng người ấy. Lời mở đầu sự kiện nói rõ lý do về cưới.

## 4. Tang lễ
Mức "xứng" = lớn hơn của (danh vọng người mất, gia thế gia tộc): từ Địa chủ trở lên mức vừa, từ Danh gia trở lên mức trang trọng. Lời trong hộp nói thẳng người đời xét cả hai.

## 5. Dự án gia nghiệp
- Gia binh, môn khách, học bổng, thuyền buôn, kho thóc có **số lượng**: hiển thị, nút − và + (+ có giá), phí duy trì tính theo số lượng.
- Gia binh: hiện "sức nhà nuôi được khoảng N người" theo bậc; vượt thì triều đình bắt đầu nghi (dấu `nghi_binh`), không vượt thì yên. Gia binh còn giảm tử vong khi giặc đánh.
- Mọi dự án có phí duy trì có nút **Giải tán**.
- Giao diện viết lại: lưới ô, mỗi ô có tên, mô tả, trạng thái, nút. Đã chụp ảnh kiểm: các ô đều, không còn chỗ trống chỗ chen.
- Sự kiện "Cẩm y vệ hỏi chuyện gia binh": chọn giải tán bớt thì quân số giảm một nửa.

## 6. Sự kiện lệch vương vị
Đã sửa: đại xá đầu triều (chỉ khi vua mới lên ≤ 18 tháng), đảng tranh (chỉ khi đã lập thái tử, nêu đúng tên thái tử và một hoàng tử khác; sau đó chỉ ra "ngôi báu định đoạt" khi vua thật sự đổi đời, và ai lên ngôi thì đúng người ấy), kỳ ngộ cứu người rồi nhận chiếu (không còn nói "Thái tử lên ngôi"), dòng tranh chấp ngôi thái tử của vua. **Chưa rà hết**: tao chỉ quét theo từ khóa (thái tử, tam hoàng tử, vua mới, tân vương, kế vị…). Mày thấy chỗ nào còn lệch thì báo id.

## 7. Ân oán họ Phạm (viết lại)
- Chạy trên khung đại cốt truyện `ARC.pm`. Chuỗi `vil_*` cũ ngừng.
- **Mở đầu:** chỉ bắt đầu khi có quan văn từ Ngũ phẩm, từ năm 8. Sự kiện đầu `pm_a1` là người già kể **chuyện cũ** (bốn kiểu: ruộng và mộ, sổ kho lương, hôn ước bội bạc, thương lộ; rút theo hạt giống ván) để mày hiểu vì sao hai họ có oán.
- **Chương 1 (8 sự kiện):** họ Phạm gõ cửa, yến, thư Duy, người mất tích, cảnh cáo… tiến chậm, mỗi bước cách nhau vài tháng. Chọn thái độ ở yến (ngoan, cứng, khôn) là vĩnh viễn.
- **Chương 2 (14 sự kiện tìm chứng cứ, 10 đòn phản kích, 8 sự kiện Duy, 6 sự kiện thế giới):** đòn phản kích kích hoạt theo mức cảnh giác của Kiên, loại đòn theo tính cách Kiên.
- **Ngã rẽ**, rồi **bảy đường × 8 bước**, **thời cơ + trận cuối theo đường**, **tám cái kết** (E1 đến E8), 3 hậu quả, 6 sự kiện người nối khi Kiên qua đời, 6 sự kiện báo thù đời sau (sau E2).
- **Lịch Kiên** theo năm ván, không phụ thuộc người chơi: Tri huyện → Tri phủ (năm 6) → Bố chánh sứ (16) → Thượng thư (26) → Nội các (34) → Thái sư (42). Từ nội các trở đi mà ân oán chưa khép thì nhà mình bị chặn lên Nhất phẩm văn. Đường cướp ngôi Quyền thần chỉ mở khi ân oán khép bằng E1 đến E5 (E8 sau 30 năm, E6 không bao giờ).
- Tiến độ ẩn hoàn toàn, không con số nào hiện ra cho người chơi; admin tab "Cốt truyện" xem được.
- Phạm Nhật Vượng, Phạm Xuân Huấn, Nguyễn Thành Duy có trong lời kể. Phạm Thái phi chưa có sự kiện riêng.

## Còn lại cần mày biết
- **Cân bằng cái kết chưa đo đủ.** Bot "chọn tỉ lệ cao" gần như luôn vào đường Nhẫn nhịn (vì nó chắc chắn) và hay ra E6 (cả họ cách chức). Tao đã chỉnh công thức điểm thế trận hai lần và cho đường Nhẫn nhịn có cơ hội Kiên mắc lỗi thật; bot ngẫu nhiên 6 ván: 3 E1, 1 E2, 2 E6 (hơi dễ, tao đã làm khó thêm một nấc sau lần đo đó, chưa đo lại); bot chọn tỉ lệ cao: 5 E6 trên 6 ván trước khi sửa đường Nhẫn nhịn. Mục tiêu trong kế hoạch (chính sách hợp lý ≥ 55% kết tốt) **chưa chứng minh**.
- Hôn lễ, tang lễ, lính cưới vợ mới kiểm bằng đọc mã và chạy không lỗi, chưa mở hộp thật bằng tay.
- Hai sự kiện chưa làm: chuyện "rửa oan" sau E8, và sự kiện riêng của Thái phi.
- Save cũ không giữ tương thích (đã thống nhất từ v6.7).
