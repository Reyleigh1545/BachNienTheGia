# Báo cáo v6.4.1.8 (11/11/2026)

Bản thứ tám trong chuỗi 6.4.1.x, trên nền v6.4.1.7. Nội dung: **ba đường cướp ngôi và màn hậu sử** (mục 9 của `ke-hoach-v6.4.1.1.md`). Từ bản này game có cái kết.
- Nhánh `v6.4.1.8`, tách từ `v6.4.1.7`. Gói zip có thư mục gốc `BachNienTheGia-v6.4.1.8/`.
- 27 sự kiện mới, ở tệp mới `ev-v6418.js`. Tổng khoảng 1.175 lên khoảng 1.202. Không thêm kỳ ngộ.
- Save cũ vẫn mở được (mục 8).
- **Cốt truyện ân oán Phạm Trung Kiên giữ nguyên như hiện có.** Chỉ việc nâng cấp nó là lùi lại, đến khi mày bảo.

**Về kiểm thử.** Mày tự test nên tao chỉ làm mấy việc sau:
- `node --check` toàn bộ tệp: đạt.
- Cho máy tự chơi 40 năm: 0 lỗi script, kiểm tra bất biến sạch.
- Chạy đủ ba đường từ đầu tới cuối: mỗi bước hiện đúng lựa chọn. Đường Quyền thần và đường Võ quan thất bại ở bước cuối (máy bấm lựa chọn đầu tiên), đúng như dự tính: vào thang hậu quả. Đường Khởi nghĩa lên ngôi.
- Thử riêng:
  - kích hoạt tự nhiên khi có quan Nhất phẩm;
  - từ bỏ ngay ở bước đầu, từ bỏ ở bước cuối, từ bỏ bằng nút ở trang Gia tộc;
  - thước "lộ" đầy thì bị phát giác;
  - đăng cơ: đặt quốc hiệu, niên hiệu, rồi hậu sử và hết game.

Chưa thử: một ván thật đi tự nhiên từ lúc đạt địa vị tới lúc lên ngôi (rất hiếm, xem mục 2).

## 1. Các điểm và kết quả

| Điểm | Kết quả |
|---|---|
| Ba đường cướp ngôi | Mục 2 đến 4 |
| Điều kiện nhẹ, tự kích hoạt sau 1 đến 2 năm | Mục 2 |
| Bỏ được bất cứ lúc nào | Mục 3 |
| Bốn thước đo hiện ở trang Gia tộc | Mục 3 |
| Thất bại đi qua thang hậu quả, tru di không đến ngay | Mục 5 |
| Lên ngôi: đặt quốc hiệu, niên hiệu, hết game | Mục 6 |
| Hậu sử | Mục 6 |
| Chuỗi mưu phản cũ bị thay | Mục 7 |

## 2. Khi nào một đường mở ra

Chỉ cần có người trong họ **đạt địa vị**. Không cần vua yếu hay thiên hạ loạn.

| Đường | Địa vị cần |
|---|---|
| Quyền thần lật đổ | Quan Nhất phẩm |
| Võ quan tạo phản | Đại tướng quân |
| Khởi nghĩa | Võ Thần, **hoặc** người mang Đế vương chi tướng từ 25 tuổi, võ lực từ 60 |

- Đạt địa vị thì **sau 12 đến 24 tháng**, hộp **"Lời thì thầm trong đêm"** tới tay gia chủ. Số tháng chọn một lần khi đạt địa vị. Mất địa vị trước đó thì thôi.
- Mỗi lúc chỉ chạy một đường.
- Hộp mở đầu có bốn lựa chọn:
  - bước vào;
  - để một thời gian rồi tính (12 đến 36 tháng sau hỏi lại);
  - từ chối: đường ấy không hỏi nữa trong 20 đến 40 năm;
  - tố giác lên triều: gặp thì được công trạng lớn, có thể thành tước.
- Tình hình vua và thiên hạ chỉ cộng trừ vào **khả năng thành ở bước cuối**, không chặn việc mở:
  - vua hôn, bạo, ấu chúa thì dễ hơn;
  - minh quân hoặc vua có uy lớn thì khó hơn;
  - dân tâm thấp, loạn nhiều, đang tranh ngôi thì dễ hơn;
  - người mang Đế vương chi tướng được cộng thêm.

**Cần biết.** Nhất phẩm, Đại tướng quân, Võ Thần đều rất hiếm sau các bản siết khó gần đây (Võ Thần cần võ lực 200). Nên ba đường này thực tế có thể ván nào cũng không mở. Đường Khởi nghĩa mở rộng cho Đế vương chi tướng (1/2000 trẻ sinh ra) để có thêm một cửa. Muốn dễ mở hơn thì báo tao, tao hạ địa vị.

## 3. Cách chơi một đường

**Bốn thước đo** hiện ở thẻ "Mưu đại sự" trang Gia tộc, từ lúc bước vào:
- **Thế lực:** bè cánh, binh lực hoặc nghĩa quân.
- **Danh nghĩa:** lý do chính đáng.
- **Tài lực:** tiền, lương thảo.
- **Lộ:** triều đình nghi ngờ đến đâu. Đầy là bị phát giác.

Bản thường hiện bằng chữ, trang admin hiện thêm số.

**Mỗi bước** là một hộp với ba lựa chọn tăng thước đo theo ba cách khác nhau, cộng thêm **"Từ bỏ con đường này"**. Có lựa chọn tốn tiền (ghi giá), có lựa chọn gieo xúc xắc, có lựa chọn phạm gia quy (nhận hối lộ, kết bè) và được đánh dấu như các bản trước.

**Mỗi tháng** thước "lộ" tự tăng nhẹ, nhanh hơn khi thế lực lớn và khi đi xa. Chạm 60 thì có hộp **"Tin đồn lọt ra ngoài"** (bịt miệng, đẩy một thuộc hạ ra gánh, giả vờ không biết, hoặc bỏ cuộc). Thỉnh thoảng có hộp **"Một thuộc hạ thân tín bị bắt"**.

**Bỏ được ở mọi lúc**, kể cả bước cuối, bằng lựa chọn trong hộp hoặc nút "Từ bỏ" ở trang Gia tộc. Hậu quả tùy thước "lộ":
- Lộ thấp: xóa sạch dấu vết, chỉ mất chút danh vọng và tâm trạng.
- Lộ cao: có khả năng tin lọt ra, người cầm đầu bị ngự sử để mắt, tăng nguy cơ bị tra.
- Của đã bỏ ra là mất. Bỏ xong thì 10 đến 20 năm sau, bất kỳ đường nào mới có thể mở lại.

**Người cầm đầu mất** thì người khác trong họ đủ địa vị nối tiếp. Không có ai thì mưu đại sự tan vỡ.

**Hộp luôn tới tay người chơi:** người cầm đầu nếu do mày điều khiển thì hộp tới người ấy, không thì tới gia chủ.

### Đường 1: Quyền thần lật đổ (7 bước)
1. Kết bè kéo cánh trong sáu bộ.
2. Kết thông gia.
3. Cài nội ứng trong cung.
4. Nắm cấm quân.
5. Tạo danh nghĩa.
6. Dồn của cải, chọn thời cơ.
7. **Giờ quyết định:** ép vua thiền nhượng (cần danh nghĩa), chính biến cung đình trong đêm (cần thế lực), hoặc hoãn.

### Đường 2: Võ quan tạo phản (9 bước)
1. Nuôi tư binh.
2. Thu phục các tướng.
3. Gom lương thảo.
4. Chờ thời.
5. **Truyền hịch khởi binh** (còn một lần cuối để lùi).
6. đến 8. **Ba trận đánh**, mỗi trận ba cách đánh khác nhau. Thua thì thế lực tụt mạnh. Thế lực xuống dưới 12 là tan quân.
9. Đánh vào kinh thành, hoặc vây chờ trong thành tự loạn.

### Đường 3: Khởi nghĩa (7 bước)
1. Hào kiệt quy tụ.
2. Phát lương cứu đói.
3. Chiêu mộ dân chúng.
4. Chiếm huyện.
5. Chiếm phủ.
6. Tiến về kinh thành.
7. Đánh vào kinh, hoặc vây thành chờ lòng dân trong thành dậy.

**Khả năng thành ở bước cuối** tính từ bốn thước đo, mỗi hộp bước cuối cho một lời gợi bằng chữ ("thế đã chín muồi", "thành bại còn ngang ngửa", "thế còn mỏng"), không hiện phần trăm.

## 4. Sự kiện chung

- **Lời thì thầm trong đêm** (mở đầu).
- **Tin đồn lọt ra ngoài.**
- **Một thuộc hạ thân tín bị bắt.**
- **Mưu đại sự sắp bại lộ** (khi lộ đầy). Bốn cách:
  - khởi sự ngay trước khi bị bắt;
  - đào tẩu, giải tán;
  - đẩy một thuộc hạ ra gánh tội (lộ về 70, mất danh nghĩa và thế lực);
  - tự thú, xin khoan hồng (bị xử cấp 3: tịch biên, lưu đày).

## 5. Thất bại

Thất bại (thua bước cuối, hoặc bị bắt lúc bỏ trốn) đi qua đúng đường của quan trường (6.4.1.4), **không diệt tộc ngay**:
1. Người cầm đầu bị khép tội mưu phản (cấp 5).
2. Gia chủ nhận hộp cảnh báo, vài tháng sau mới có chiếu.
3. Trong thời gian ấy có các đường thoát: trục xuất kẻ phạm tội, đưa một nhánh con cháu đi xa, dâng sớ xin một mình chịu, nhờ thông gia và môn sinh cầu tình.

**Một thay đổi ở bước 3:** trước đây tội mưu phản luôn là cửu tộc (hết game) dù đã đưa một nhánh đi xa. Nay **nếu đã có một chi họ trốn đi xa thì chỉ tam tộc**: nhà chính chịu, chi ở xa sống sót và gánh tông đường. Đây đúng ý "có đường thoát nhỏ" ở kế hoạch.

Sau thất bại thì 60 năm không đường nào mở lại.

## 6. Lên ngôi và hậu sử

Thành công thì:
1. Hộp **Đăng cơ**: mày đặt **quốc hiệu** và **niên hiệu đầu tiên**. Có sẵn tên gợi ý, để trống thì dùng tên gợi ý.
2. Màn **Hậu sử**: chạy một chuỗi các đời vua của triều mới. Có phần ngẫu nhiên nhưng bám theo:
   - tài (trí, EQ, cơ mưu, mị lực hoặc võ lực) và đức (rộng lượng, thật thà, hiếu thuận, tiết chế) của người khai quốc;
   - thước danh nghĩa và thước lộ lúc lên ngôi;
   - dân tâm và mức loạn của triều trước;
   - chất lượng con cháu;
   - gia phong (các gia quy nghiêm, thư hương, thanh liêm, nghĩa, hiếu đạo, khoan hậu với dân);
   - con đường lên ngôi (khởi nghĩa vững hơn, võ quan kém hơn một chút);
   - Đế vương chi tướng được cộng.
3. Màn hình ghi: biên niên từng đời vua (loại vua, một việc nổi bật), nguyên nhân sụp đổ nếu có (giặc cỏ, ngoại bang, quyền thần, cung biến, mất mùa), nhận xét của sử gia về người khai quốc, đánh giá của đời sau, và bảng tổng kết ván chơi (con đường, số năm chơi, số đời, số người trong gia phả, danh vọng).
4. Hết game, không có "chơi tiếp", không có kết thúc phụ. Ô lưu ghi "đã khép lại".

Đây là hậu sử bản đầu: mày nói sẽ đọc lại để chỉnh nên tao giữ gọn.

## 7. Chuỗi mưu phản cũ

- Sự kiện mở đầu của chuỗi cũ (`md_mo_dau`) bị tắt.
- Save cũ nào đang dở chuỗi cũ: bước thành công của nó nay đi vào đăng cơ và hậu sử như trên, không còn "lên ngôi rồi chơi tiếp". Thất bại thì vẫn tru di cửu tộc như cũ.

## 8. Save cũ

- Mở được.
- Trạng thái mưu đại sự chỉ được lập khi cần.
- Nhà đang có Nhất phẩm, Đại tướng quân, Võ Thần sẽ bắt đầu đếm 12 đến 24 tháng ngay sau khi mở save.

## 9. Trang admin

Tab "Chỉnh" có thêm mục **Mưu đại sự**:
- ba nút bắt đầu từng đường cho người đang chọn (bỏ qua địa vị);
- nút "Ép sang bước cuối";
- nút "Lên ngôi ngay (thử hậu sử)".

## 10. Tệp thay đổi

- Mới: `ev-v6418.js` (27 sự kiện).
- `engine.js`: trạng thái mưu đại sự, kích hoạt, ba thước đo, bỏ cuộc, thất bại, đăng cơ, hậu sử, thẻ ở trang Gia tộc, đường thoát tam tộc, chữ phiên bản.
- `ev-quan.js`: tắt chuỗi cũ, nối bước thành công vào đăng cơ. `ev-v6414.js`: tam tộc khi có chi trốn đi.
- `index.html`, `admin.html`, `admin.js`: nạp tệp mới, nút admin, dòng phiên bản.

## 11. Còn lại cần mày biết

- Mọi con số đều là phỏng đoán: số bước, mức cộng thước đo, tốc độ tăng của lộ, khả năng thành ở bước cuối, độ dài các đời vua trong hậu sử.
- Hậu sử còn thô: lời văn ít biến thể, các đời vua mô tả chung chung. Sẽ làm kỹ khi mày đọc lại.
- Các đường chưa có sự kiện về quân triều đình phản công, về tướng phản bội giữa trận, về hoàng tộc. Thêm được ở giai đoạn nội dung.
- Ân oán Phạm Trung Kiên vẫn như cũ, chờ mày bảo thì nâng cấp.
- Bản tiếp theo: phần nội dung còn lại của v6.5 (kỳ ngộ gia tộc, giang hồ, cốt truyện lớn, tăng dần số sự kiện).
