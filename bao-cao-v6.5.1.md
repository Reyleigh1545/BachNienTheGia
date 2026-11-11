# Báo cáo v6.5.1 · Vua đầu Trường Thịnh, tranh ngôi, độ khó đường lên ngôi

- Ngày: 11/11/2026. Nhánh `v6.5.1`, cắt từ `v6.4.1.8`.
- Số sự kiện: không đổi (khoảng 1.265). Không thêm sự kiện mới, chỉ sửa chữ ở vài sự kiện tranh ngôi.
- Kiểm tra: `node --check` toàn bộ file `.js`; một ván tự chạy qua hết đời vua đầu trên trang admin (không lỗi script). **Không** chạy lại cả ba đường lên ngôi và không đo tỉ lệ thắng sau khi chỉnh; việc đo nằm ở 6.5.10.
- Save cũ nạp được: chỉ ván mới có vua Trường Thịnh. Save cũ giữ nguyên triều đình đang có.

## Các điểm đã làm

| Điểm | Mục |
|---|---|
| Vua đầu Trường Thịnh, 40 đến 50 năm | 1 |
| Vua thứ hai do tranh ngôi căng thẳng | 2 |
| Bảng vua cập nhật theo năm, người ngoài kinh nghe đồn | 3 |
| Độ khó ba đường lên ngôi | 4 |
| Sửa lỗi từ báo cáo test ending | 5 |

## 1. Vua đầu: Trường Thịnh

- Chỉ ván mới: `newGame` tạo `S.dyn` với niên hiệu **Trường Thịnh**, minh quân (tài 82–95, đức 75–92, uy cao, đa nghi thấp), dân tâm, quốc khố cao, loạn thấp.
- Ở ngôi **40 đến 50 năm tính từ lúc mở game** (`d.fixed`). Trong thời gian này vua không chết sớm, không lập thái tử, và đến 5 năm trước khi mất vẫn bị giữ ở mức minh quân.
- Nhà mày không thể lật đổ sớm: minh quân làm đường lên ngôi khó hơn (mục 4), và thiên hạ hưng thịnh làm khó thêm.

## 2. Vua thứ hai: tranh ngôi căng thẳng

- Khoảng 3 năm rưỡi trước khi vua đầu mất, tranh ngôi tự nổ ra (dùng chuỗi `tc_*` có sẵn của 6.4.1.7). Vua không chết trước khi chuỗi xong; nếu chuỗi xong sớm thì chờ đến hạn.
- Ba kiểu quan hệ, bốc ngẫu nhiên: **anh em ruột**, **anh em họ**, **chú và cháu** (chú là thân vương, cháu là hoàng tôn). Quan hệ hiện ở trang Thời thế và trong sự kiện `Hoàng đế lâm bệnh`.
- Hai phe bắt đầu ngang sức (46 đến 56), loạn tăng lúc tranh ngôi.
- Người thắng lên ngôi trong thế yếu: uy 25–45, đa nghi 60–85 (sẽ dễ kích hoạt thanh trừng của 6.4.1.7), loạn tăng 8–16, dân tâm giảm 4–9. Cuộc tranh ngôi vẫn dẫn tới phần thưởng hoặc phạt cho nhà mình như trước.

## 3. Bảng vua

- Cập nhật theo năm sẵn có từ 6.4.1.7 (`dynYear` chạy năm một lần). Không có cập nhật theo tháng cho bảng thiên hạ; chỉ `kingMonth` chạy tháng để rút sự kiện thời thế và bước tranh ngôi.
- Thấy rõ khi nhà có quan Nhất phẩm, thấy đại khái khi có quan từ Tam phẩm, còn lại là tin đồn. **Chưa đổi sang điều kiện "giữ chức ở kinh thành"** như mày nói; hiện vẫn tính theo phẩm, ở bất cứ đâu. Muốn sửa thì phải làm sau 6.5.2, vì lúc đó người nhậm chức mới có vị trí đúng.

## 4. Độ khó ba đường lên ngôi

Công thức thắng ở bước cuối (`usWin`) đổi như sau:
- Trừ cứng tăng từ 0,08 lên **0,16**.
- Bỏ phần thưởng +0,07 của Đế vương chi tướng, còn +0,03.
- Giảm bớt các phần cộng khi vua kém (hôn quân 0,06 xuống 0,05, bạo quân 0,08 xuống 0,06, ấu chúa 0,10 xuống 0,08, loạn và dân tâm thấp mỗi cái 0,05 xuống 0,04).
- Thêm trừ 0,04 khi dân tâm từ 70 trở lên. Trần xác suất từ 0,88 xuống 0,80.
- Hai bonus cứng ở bước cuối của đường Võ quan (+0,05) và Khởi nghĩa (+0,04) mày thấy trong báo cáo test **vẫn còn**; tao chưa bỏ vì muốn đo trước.

Chưa đo lại tỉ lệ. Theo ước lượng thô, người mạnh ở bước cuối còn khoảng 30 đến 45% khi vua là minh quân, cao hơn khi vua yếu. Mục tiêu tạm của kế hoạch (người trung bình 10 đến 25%, người mạnh 40 đến 55%) sẽ chỉnh ở 6.5.10 sau khi đo.

## 5. Các lỗi nhỏ từ báo cáo test ending

- Hậu sử không vượt 320 năm (năm của triều cuối bị cắt).
- Sửa lời `ts_v_cuoi`: "bại thì họa diệt tộc treo ngay trên đầu" thay cho "cả họ không còn".
- Người đang ở xa vẫn được mở đường, nhưng lộ tăng thêm 0,2 mỗi tháng.
- Chú thích độ hiếm thiên mệnh sửa lại: 1/2000 đứa trẻ có thiên mệnh, chia đều trong 11 loại, nên mỗi loại (kể cả Đế vương chi tướng) chỉ khoảng 1/22.000. Tỉ lệ thực tế không đổi.

## Còn lại cần mày biết

- `VACANCY` trong `data.js` vẫn còn, vì xóa phải sửa chỗ khai báo và xuất; không ảnh hưởng gì. Tao để dọn trong bản hoàn thiện.
- Vua thứ ba trở đi vẫn bốc ngẫu nhiên như cũ (theo ý mày).
- Chuỗi tranh ngôi có 7 bước, lời văn chung cho cả ba kiểu quan hệ. Tao mới thêm câu mô tả quan hệ, chưa viết riêng từng bước cho từng kiểu. Nếu mày muốn, bản nội dung sau sẽ viết sâu hơn.
- Chưa test tay các kiểu "anh em họ" và "chú cháu" từ đầu tới cuối; mới chạy được kiểu anh em ruột.
