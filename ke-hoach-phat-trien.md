# Bách Niên Thế Gia · Kế hoạch phát triển tới v6.5

Ghi ngày 08/11/2026. File này gộp các nguồn sau:
- `ke-hoach-v6.4.1.1.md`: các mục 6 đến 16, phần "Đã chốt" và các phần "Chốt thêm".
- `y-kien-v6.md`: lộ trình v6.0 đến v6.5, chỉ còn đợt v6.5 chưa làm.
- `v6.4.1.2 Review.docx`: 4 góp ý của mày.
- `Bach_Nien_The_Gia_Source_Code_Audit.docx`: bản rà soát code v6.4.1 của người ngoài.
- Những gì đã bàn trong các lần nói chuyện.

Chi tiết từng hệ thống vẫn nằm ở `ke-hoach-v6.4.1.1.md`. File này chỉ giữ thứ tự, phạm vi và nguyên tắc.

---

## 1. Nguyên tắc

1. **Làm cho đủ gameplay và có cái kết trước**, tới v6.5. Fix lỗi, cân bằng, hợp lý hóa để giai đoạn sau.
2. **Ngoại lệ, sửa ngay trong bản gần nhất:**
   - Lỗi làm hỏng save, treo game, kẹt hộp thoại.
   - Lỗi làm sai dữ liệu tích lũy theo năm tháng.
   - Lỗi nằm trong phần mà hệ thống sắp làm dựa vào.
3. **Mỗi bản làm hệ thống thì kèm sự kiện cho hệ thống đó.** Số sự kiện tăng dần đều, không dồn về cuối.
4. **Con số của hệ thống mới gom vào một bảng hằng số** đầu mỗi phần, để giai đoạn cân bằng chỉ chỉnh bảng.
5. **Lên ngôi là hết game**, có màn hậu sử, không có "chơi tiếp". Không thêm kết thúc phụ.
6. Mày tự test từng bản trên `admin.html`. Tao chỉ kiểm cú pháp và chạy thử ngắn, trừ khi mày bảo test kỹ.

---

## 2. Thứ tự các bản

| Bản | Nội dung | Nguồn |
|---|---|---|
| **6.4.1.3** (đã làm) | Quyền điều khiển, tự quyết theo tính cách, thư nhà; gia quy chia nhóm phạt, uy gia pháp, nhắc lập gia quy; các lỗi sửa ngay (mục 3) | Chốt thêm 08/11, Review, Audit |
| **6.4.1.4** (đã làm) | Cốt truyện quan trường theo `Gợi ý cốt truyện quan trường.docx`: hồ sơ quan, 4 phe, cấp tội, thang hậu quả tới tru di, sử ký quan trường, 50 sự kiện (tuyến 1, 2, 3, 5) | Chốt thêm 08/11, file gợi ý |
| **6.4.1.5** | Hảo cảm với các họ khác (6), gả đi (14), tình duyên (11), lập chi họ khi nhậm chức xa (15) | ke-hoach mục 6, 11, 14, 15; Review ý 4 |
| **6.4.1.6** | Trạng thái hoàng đế (10), danh hiệu cấp Thần gộp với thiên mệnh (7, y-kien 8), sự kiện thời thế theo loại vua; **tuyến 4 (thanh trừng do vua nghi) và tuyến 6 (tranh đoạt hoàng quyền) của file gợi ý quan trường**, khoảng 30 đến 50 sự kiện | ke-hoach mục 7, 10; y-kien mục 8; file gợi ý |
| **6.4.1.7** | Ân oán Phạm Trung Kiên: đường kiện khó, các cái kết thua, báo thù, cân thưởng (8) | ke-hoach mục 8 |
| **6.4.1.8** | Ba đường lên ngôi và màn hậu sử: **game có cái kết** (9) | ke-hoach mục 9; y-kien mục 35 |
| **6.4.1.9 trở đi** | Nội dung còn lại của v6.5 (mục 4) cho tới mốc v6.5 | y-kien mục 10, 13, 31, 38 |
| **Sau v6.5** | Giai đoạn hoàn thiện (mục 5) | Góp ý để sau, Audit |

Ghi chú:
- 6.4.1.3 phải làm trước 6.4.1.4, vì cốt truyện quan trường dựa vào việc người ở xa tự quyết.
- Hoàng đế (6.4.1.6) phải làm trước ân oán và lên ngôi, vì cả hai dùng trạng thái của vua.
- Muốn có cái kết sớm hơn thì có thể đảo 6.4.1.8 lên ngay sau 6.4.1.6. Mặc định giữ như bảng.

---

## 3. Bản 6.4.1.3: phạm vi

### 3.1 Hệ thống mới
Theo phần "Chốt thêm: quyền điều khiển, gia quy, quan trường" trong `ke-hoach-v6.4.1.1.md`.

### 3.2 Các lỗi sửa ngay

| # | Lỗi | Nguồn | Tao kiểm trong code | Sửa |
|---|---|---|---|---|
| a | **Sự kiện bị ghi nhận lúc xếp hàng, chưa phải lúc hiện.** `pickEvent` ghi `seen`, `cool`, `evLast`, `evn` ngay khi chọn. Lúc mở hộp chỉ xét lại `ev.c`, không xét lại tuổi, nghề, đi xa. | Audit P0 | **Đúng như audit nói** | Tách hai bước: lúc chọn chỉ xếp hàng; lúc mở hộp thì xét lại toàn bộ điều kiện rồi mới ghi nhận. Không còn hợp lệ thì bỏ, không tốn thời gian hồi. Làm chung với thư nhà, vì thư nhà cũng phải chặn hộp ở bước này |
| b | **Vào quân ngũ mà vẫn như ở nhà.** Người đang ở doanh trại vẫn gặp sự kiện, kỳ ngộ của gia tộc | Review ý 3 | Có cờ "ở doanh trại", nhưng vòng sự kiện vẫn bốc cho họ, còn nhân 1,3 | Người ở doanh trại chỉ gặp sự kiện quân ngũ, chiến sự, thư nhà. Không tham gia việc nhà. Vẫn được ở doanh trại ngay quê nhà |
| c | **Nhà Bần hộ, Thường dân vẫn được danh gia ghé thăm, nhờ vả** | Review ý 4 | Điều kiện hiện tại là bậc từ Tiểu hộ **hoặc** danh vọng từ 60, nên nhà nghèo có tiếng vẫn lọt | Sửa tạm: nhà kia phải không cao hơn nhà mình quá một bậc, trừ sự kiện chèn ép. Làm lại đầy đủ ở hệ hảo cảm (6.4.1.5) |
| d | **Dòng "Thói quen (gia tộc nuôi)" ở Cơ ngơi không ghi của ai**, trong khi không ai có tật xấu | Review ý 2 | Không phải lỗi tính tiền: dòng này cộng cả **thói quen tốt** có tốn tiền (ví dụ đọc sách, thưởng trà) | Ghi rõ từng người và từng thói quen. Tách "thói quen" khỏi "tật xấu" |
| e | **Chọn trường cho con không thấy tiềm lực** | Review ý 1 | Đúng là chưa hiện | Hộp chọn trường hiện tiềm lực từng chỉ số của đứa trẻ, mô tả bằng chữ |

### 3.3 Đo đạc cho trang admin (nhỏ, làm luôn)
Audit khuyên đo trước rồi mới cân bằng. Thẻ "Thống kê" ở trang admin sẽ đếm:
- Số lần bốc sự kiện, số hộp thực sự hiện, số hộp bị bỏ vì hết hợp lệ.
- Số hộp mỗi năm, tách sự kiện thường, kỳ ngộ, việc bắt buộc.
- Tiền từ sự kiện so với tổng thu.

Chỉ trang admin có, bản thường không đổi.

---

## 4. Nội dung còn lại của v6.5 (6.4.1.9 trở đi)

Từ `y-kien-v6.md`, đợt v6.5. Bỏ những gì đã nằm trong các bản ở mục 2.

| Phần | Mô tả | Mục y-kien |
|---|---|---|
| Kỳ ngộ gia tộc | Gia chủ quyết, thành bại tính theo cả những thành viên liên quan | 13 |
| Giang hồ | Môn phái chính, tà, trung lập tự đặt tên; cấp bậc từ tam lưu tới đại tông sư; bí kíp, tẩu hỏa, anh hùng đại hội | 31 |
| Cốt truyện lớn | 20 đến 30 cốt truyện, mỗi cái 5 đến 20 bước, 2 đến 4 kết thúc; con nối chuỗi của cha | 10, 38 |
| Số lượng | Hiện khoảng 1.013 sự kiện. Mục tiêu v6.5 là 5.000 sự kiện và 500 kỳ ngộ, tăng dần qua từng bản | 10 |

Còn thiếu so với y-kien, xếp vào bản phù hợp khi tới:
- Quân hộ, đi lính cha truyền con nối: làm cùng quan trường hoặc hoàng đế.
- Thiết khoán (giấy miễn tử): làm cùng tước và hoàng đế.
- Đông xưởng: làm cùng cốt truyện quan trường.

---

## 5. Giai đoạn hoàn thiện (sau v6.5)

### 5.1 Từ audit, chưa làm ngay
- Cơ duyên có thể tạo vòng tự cộng dồn (snowball). Nó tăng cơ hội gặp sự kiện, trọng số sự kiện tốt, và tỉ lệ thành. **Đo trước rồi mới chỉnh.**
- Hệ số tiền theo gia thế (`TK`, từ 1 tới 14) có thể tạo vòng giàu thêm giàu. Đo tiền từ sự kiện so với tổng thu chi.
- Thưởng chỉ số cho gia chủ theo bậc gia tộc (tới +10). Đo chênh lệch gia chủ với người kế vị qua các đời.
- Thời gian hồi cấp gia tộc có thể chặn quá rộng các sự kiện nghề.
- `<title>` và link font nằm trong `<body>`: đưa vào `<head>`. Việc nhỏ, có thể làm sớm khi tiện tay.
- Tách `engine.js` (khoảng 480 KB) thành nhiều module.
- Hộp thoại: đóng bằng Escape, giữ tiêu điểm bàn phím trong hộp.
- Chạy mô phỏng nhiều ván (gia tộc nhỏ, đông người 50 đến 200, học thuật, buôn bán; 50 đến 300 năm) rồi mới cân bằng.

Audit có nêu chữ phiên bản lệch giữa menu (6.3.5) và góc trang (6.4.1). Lỗi này **đã sửa ở 6.4.1.1**.

### 5.2 Góp ý của mày để sau
Ghi tiếp vào đây khi mày gửi. Lỗi thuộc diện sửa ngay (nguyên tắc 2) thì tao đưa vào bản gần nhất và báo lại.
- Cân bằng các con số của 6.4.1.2 (quản trị, mốc đỗ 62 và 72, trần sự kiện, danh vọng cá nhân), chờ mày chơi thử.
- Nghĩa vụ và rủi ro đi kèm tước.
- Lối tập ấm cho con quan.

## 6. Chốt sau khi test 6.4.1.4 (09/11/2026)

**Thứ tự bản mới.** Gợi ý 6.4.1.5 chia làm hai bản. Các bản sau lùi xuống một số: hoàng đế và các thứ đi kèm là 6.4.1.7, ân oán 6.4.1.8, lên ngôi và hậu sử 6.4.1.9.

| Bản | Nội dung |
|---|---|
| 6.4.1.5 | Sửa các lỗi lúc test; tách họ gốc, hộ và chi; quan hệ giữa các họ; hôn nhân, gả đi |
| 6.4.1.6 | Tình duyên; chi họ xa có nơi ở và hiện trên bản đồ; gia đình người đi lính, làm quan xa (đưa vợ con theo, cưới khi về phép, tỉ lệ có con) |
| 6.4.1.7 | Hoàng đế (thêm tuyến 4 và tuyến 6 của file quan trường), danh hiệu và thiên mệnh (thêm sự kiện vượt mốc đa dạng theo từng mốc), thời thế, chiến tranh tại nơi ở |

**Tước.** Tước tính theo tổng công trạng: công đủ tới mốc của bậc nào thì được phong bậc ấy. Không còn tùy sự kiện lớn hay nhỏ, và cũng không chỉ lên từng bậc một.

**Sự kiện vượt mốc chỉ số.** Không chặn theo tuổi. Thay vào đó thêm lựa chọn hợp với trẻ con và người già, và ẩn những lựa chọn không hợp tuổi, như trẻ con đi xa.

**Đi lính** (cách a, giữ như hiện tại): người đi lính tự quyết. Nếu người ấy là chi chủ thì người chơi vẫn điều khiển.

**Ruộng.** Mỗi hộ có ruộng riêng:
- Tá điền ở chi họ làm ruộng của chi, hoặc đi cày thuê; tiền vào quỹ chi.
- Nhà chính không dùng sức người của chi.

**Để giai đoạn cân bằng:** chỉ số qua 100 vẫn tăng nhanh.

**6.4.1.5 đã làm (09/11/2026):**
- Sửa các lỗi lúc test.
- Tách họ gốc, hộ, chi (mới ở mức dữ liệu).
- Quan hệ giữa các họ: thù oán, thông gia, cảnh giác, gia phong, sổ ân oán, nhường nhịn, một sống một còn.
- Kiểu hôn nhân, thông gia thật, thế đứng của con gái gả đi.
- Ruộng riêng cho chi.
- 36 sự kiện.

**6.4.1.5.1 (bản sửa, 09/11/2026):**
- Chỉ số lớn theo trần mềm của tư chất. Lớn tự nhiên không còn cộng chồng lên phần học được.
- Danh hiệu chỉ số khó lấy hơn, nhất là khi còn trẻ.
- Khoa thi: mỗi vòng tối đa 100 điểm; thi Đình 5 vòng; danh hiệu và chức bổ theo điểm thi Đình (Trạng nguyên tối đa Lục phẩm).
- Chức tạm giữ trong lúc chờ ghế.
- Bỏ dòng chú thích dưới lựa chọn.
- Nội trợ không còn bậc và thông thạo.
- Người bị trục xuất bị xóa khỏi gia phả.
- Họ khác: không đến làm thân với Bần hộ, Thường dân; chỉ ngỏ thông gia khi nhà mình ngang hoặc cao hơn và hai nhà đã thân.

**Ghi nhớ:** từ nay lựa chọn không kèm chú thích; chỉ ghi giá khi lựa chọn là trả tiền ngay.

**6.4.1.6 đã làm (09/11/2026):**
- Tình duyên nhiều bước. Mở đầu chỉ cho người 18 đến 25 tuổi có tài, có đức; dễ rung động hay không tùy tính cách.
- Chi họ xa lập ở nơi nhậm chức: có nơi ở, dấu ⌂ trên bản đồ, gửi quỹ về, mức gắn bó, có thể thành chi độc lập.
- Gia đình người đi lính: vợ con theo vào trại gia binh, về phép, cưới vợ nhân dịp phép, tỉ lệ có con.
- 24 sự kiện.

**6.4.1.7 đã làm (11/11/2026):**
- Hoàng đế (tuổi, sức khỏe, tài, đức, uy, đa nghi, loại vua) và thiên hạ (dân tâm, quốc khố, loạn). Vua băng hà theo tuổi và sức khỏe.
- 8 sự kiện thời thế theo loại vua.
- Tranh ngôi 7 bước (tuyến 6). Thanh trừng khi vua đa nghi, 10 sự kiện (tuyến 4).
- 9 danh hiệu cấp Thần, mỗi cái hai bước khảo nghiệm.
- Thiên mệnh: cái thế sau khi người giữ danh hiệu qua đời, và thiên mệnh tự nhiên 1/2000. Kèm sự kiện thức tỉnh và kiếp nạn.
- Con đường vượt mốc riêng cho mốc 120 và 140.
- Chiến tranh tại nơi ở: 6 sự kiện. Người võ giỏi nhất nhà che chở cả nhà.
- Người nhà chính đi lính do người chơi điều khiển.
- Phe trong triều ẩn tới khi nhà có quan. Thế lực các phe chỉ biết khi có quan từ Ngũ phẩm.
- 52 sự kiện.
