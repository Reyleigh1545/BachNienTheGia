# Báo cáo v6.5.4 · Kho sự kiện, gia tộc, kinh tế, học tập, chỉ số, nhánh rẽ đường lên ngôi

- Ngày: 11/11/2026. Nhánh `v6.5.4`, cắt từ `v6.5.3`. Đây là bản gộp theo ý mày (làm một lần, test một lần), nên dài.
- Số sự kiện: 1.294 (thêm 4: `gt_nha_chat` và ba bước rẽ nhánh `ts_nh_q`, `ts_nh_v`, `ts_nh_n`). Kỳ ngộ: 224.
- Kiểm tra: `node --check` toàn bộ file; máy tự chơi 40 năm không lỗi script, `audit` sạch; thử riêng bước rẽ nhánh, hộp chọn trường, tab Kho trên admin. **Không** bấm từng lựa chọn của các sự kiện mới, không chạy nhiều ván dài để đo, không đo thời gian từ lúc mở game đến ending.
- Mỗi mảng là một commit riêng trên nhánh `v6.5.4`, để lần ra lỗi.
- Save cũ nạp được. Đường lên ngôi đang chạy dở giữ danh sách bước cũ (không chen thêm bước rẽ nhánh).

## Danh sách test, chia theo mảng

| Mảng | Vào đâu, làm gì, thấy gì là đúng |
|---|---|
| 1. Kho sự kiện | Mở `admin.html`, bấm Admin, tab **Kho**: bảng đếm theo nhóm, lọc theo nhóm/cách kích hoạt/độ hiếm/ai gặp, tìm theo tên, bấm tên xem chi tiết, nút "Gọi cho người đang chọn". |
| 2. Gia tộc | Đặt gia quy "Hạn ba con" rồi chạy vài chục năm: không ai sinh thêm khi đã đủ ba con còn sống, sinh con cách nhau lâu hơn. Trang Gia tộc: gia quy không còn chữ "Tăng trưởng/Phạt…". Nhà đầy người: có hộp "Nhà đã chật". |
| 3. Gia thế | Chưa có cơ sở kinh doanh thì không lên Tiểu hộ khá giả; chưa có người làm quan thì không lên Hương thân; Thế gia và Danh môn vọng tộc cần thêm điều kiện (xem mục 3). |
| 4. Kinh tế | Mở rộng cơ sở: nút báo rõ cần thông thạo bao nhiêu. Hộp đi buôn: dòng "Tin giá", vốn tối đa lớn hơn với người thông thạo. |
| 5. Học tập | Hộp chọn trường của trẻ: dòng nói rõ theo ai học gì, học nghề gì. Con gái: nút "Ứng thí" chỉ hiện khi trí trên 100 và tham vọng cao. |
| 6. Chỉ số | Ván mới: nhân vật khởi đầu có ít nhất một chỉ số từ 60. |
| 7. Nhánh rẽ | Ván mới, admin chọn "Mưu đại sự" và bắt đầu một đường. Giữa đường có bước "Ba ngả đường" (hoặc "Chọn thế đánh", "Gốc của nghĩa quân") với ba nhánh. Hậu sử có thêm một câu về nhánh đã chọn. |

## 1. Kho sự kiện (metadata và trang admin)
- Phân loại tự động cả 1.294 sự kiện bằng quy tắc (nhãn nhóm `k`, khóa nghề, tiền tố ID, từ khóa tiêu đề) vào 11 nhóm của đề xuất: đời sống, gia đình, nghề và kinh tế, xã hội, học hành, quan trường, quân đội, giang hồ, cốt truyện, kỳ ngộ, hoàng quyền. Còn **42 sự kiện chưa phân loại** vì quy tắc không chắc; tao không đoán.
- Metadata nằm trong `events-meta.js` (id → nhóm, nhóm nhỏ, cách kích hoạt, độ hiếm, ai gặp, hoàn cảnh). Không tách file sự kiện cũ, không đổi ID, không đổi cách game bốc sự kiện.
- File bảng duyệt: `manifest-su-kien.csv` (mở bằng Excel), có cột độ tin cậy của phân loại. Mày sửa trực tiếp bảng này, tao nhập lại.
- Tab **Kho** ở admin: bảng đếm, lọc, tìm, chi tiết, gọi sự kiện, hỏi vì sao chưa ra.
- Hai chỗ metadata có tác dụng thật: người ở nơi khác (nhậm chức, theo quan, chi họ xa) không còn gặp sự kiện làng xóm, mùa vụ, ruộng đất của nhà chính; sự kiện chiến sự chỉ ra khi có chiến sự hoặc căng thẳng biên giới.

## 2. Gia tộc
- **Gia quy số con là tuyệt đối:** mẹ đã có đủ số con còn sống theo gia quy thì không thụ thai nữa, sinh đôi cũng không vượt. Cách nhau sau sinh 24 đến 36 tháng (trước 10 đến 16).
- **Gia quy:** bỏ nhãn "Tăng trưởng / Phạt tiền, đòn roi / Trục xuất / Xử tử" ở danh sách và hộp lựa chọn, chỉ còn tên và tác dụng. Con cái nghe lời hơn tùy cách nuôi dạy (uy gia pháp, gia quy nghiêm minh, hiếu đạo, tự quyết). Người có độ nghe lời từ 70 gần như không phạm gia quy khi tự quyết.
- **Sức khỏe:** bỏ các danh hiệu theo mốc sức khỏe từ 100 trở lên. "Thân thể đúc thép" và "Trường thọ" thành thể chất bẩm sinh (di truyền như "Thân thể cường tráng"), vẫn đạt được qua các đường rèn như trước.
- **Thần cấp:** tao đọc lại code, không thấy chỗ nào cấp danh hiệu Thần lúc sinh. Lúc sinh chỉ có thiên mệnh ("… cái thế", "Đế vương chi tướng", "Kỳ tài"); danh hiệu Thần chỉ cấp cho người từ 35 tuổi đủ nghề, chỉ số, danh vọng. **Nếu mày thấy một đứa trẻ có danh hiệu Thần thì cho tao biết tên danh hiệu**, tao truy tiếp.
- **Nhà chật:** mỗi năm, nhà chính đầy người và còn bậc nhà để nâng thì hiện hộp nhắc (ba năm nhắc một lần).

## 3. Gia thế
- Tiểu hộ khá giả cần ít nhất một cơ sở kinh doanh; Hương thân cần người làm quan.
- Thế gia: đời thứ ba, danh vọng 250, có cơ sở, có người làm quan hoặc quân (Tam phẩm, Tướng quân, hoặc tước Bá), thu nhập từ 50 bạc một tháng.
- Danh môn vọng tộc: đời thứ tư, danh vọng 500, có người Nhị phẩm hoặc Đại tướng quân **và** người giữ tước từ Hầu tước.
- Đặc quyền danh vọng gia tộc: Được nể 200 (trước 120), Danh gia 500 (trước 250), Vọng tộc 1.500 và phải có Hầu tước (trước 500).

## 4. Kinh tế
- **Cơ sở kinh doanh:** doanh thu giảm 30%. Mở rộng lên bậc mới cần người trông thông thạo nghề từ 50 (bậc 2), 70 (bậc 3), 90 (bậc 4), nút báo rõ thiếu bao nhiêu. Năng suất người trông và nhân viên giảm khi già (bắt đầu từ 50 tuổi, 70 tuổi còn 60%).
- **Giao thương (cách "chênh giá theo tin tức và mùa" mày chọn):** mỗi nửa năm, mỗi tuyến và mặt hàng có hệ số lệch giá ngẫu nhiên (tuyến xa lệch mạnh hơn); chiến sự, dịch, thiên tai, mùa đông đẩy một số mặt hàng lên. Hộp đi buôn có dòng "Tin giá: đang hời …, đang rớt …". Vốn tối đa mỗi tuyến nhân theo thông thạo của người đi (tối đa gấp ba), thông thạo cao giảm rủi ro một chút. Tuyến xa có thể lãi gấp ba khi gặp đúng thời cơ và có thể lỗ khi giá rớt.
- **Nghề phụ, việc rảnh:** thu nhập phụ thuộc cần cù và tâm trạng; tốc độ rèn chỉ số cũng theo cần cù.
- **Chi tiêu theo tiền quỹ:** hệ số tiền của sự kiện và kỳ ngộ tính theo tổng tiền quỹ (từ 1 đến 12), không theo bậc gia thế. Nhà càng nhiều tiền thì khoản thu lẫn khoản chi của sự kiện càng lớn.

## 5. Học tập và nghề
- Hộp chọn trường nói rõ: "Theo cha mẹ học" ghi tên người dạy và chỉ số học nhiều nhất; "Theo người học việc" và "Gửi vào cơ sở" ghi nghề, cơ sở.
- Nhà đã có từ hai người cùng một nghề thì ý muốn của con cháu với nghề ấy giảm dần, nên nghề đa dạng hơn.
- Nữ nhi chỉ ứng thí khi trí trên 100 và tham vọng từ 70; khả năng bị phát hiện cải nam trang giảm theo trí và mưu (từ 32% xuống thấp nhất 4%).

## 6. Chỉ số
- Mị lực chỉ còn nửa trọng số trong các phép thử có nhiều chỉ số. Khẩu tài, mưu, quản lý có thêm một phần trí tuệ.
- Rèn võ lực phụ thuộc thêm trí (trí thấp thì võ lên chậm hơn đến khoảng 35%); chiến công cũng nhân theo trí.
- Trí tuệ vào cả hiệu quả trông cơ sở.
- Nhân vật khởi đầu có ít nhất một chỉ số từ 60, và nửa số ván có chỉ số thứ hai từ 60.

## 7. Nhánh rẽ đường lên ngôi và độ khó
- Mỗi đường có thêm một bước giữa với ba nhánh: **quân lực**, **sĩ phu và danh nghĩa**, **của cải và dân**. Nhánh chọn được ghi lại và ảnh hưởng ở bước cuối: nhánh sĩ phu hợp "ép thiền nhượng" (cộng 6%), nhánh quân lực hợp "binh biến" (cộng 6%), nhánh của cải cộng 3% cho cả hai. Hậu sử có thêm một câu theo nhánh.
- Xác suất thắng của riêng bước cuối, tính từ công thức (vua minh quân / vua thường / hôn quân): hồ sơ yếu 7–12% / 21–26% / 26–31%; trung bình 22–27% / 36–41% / 41–46%; mạnh 39–43% / 53–57% / 58–62%. Các bước giữa còn có xúc xắc nên tỉ lệ thành công cả đường thấp hơn. Vua đầu Trường Thịnh luôn là minh quân nên dải đầu là dải áp dụng trong 40 đến 50 năm đầu.

## Còn lại cần mày biết
- **Chưa đo tự nhiên từ lúc mở game đến ending.** Việc này cần chạy hàng trăm ván; tao chưa làm. Các số cân bằng trong bản này vẫn là ước lượng, chờ mày chơi thử.
- **Nhánh rẽ mới là một bước mỗi đường**, chưa phải nhiều nhánh sâu. Nhiều cốt truyện và nhánh hơn thuộc nhóm nội dung viết sau.
- **Giao thương còn đơn giản:** chưa có thương đội thuê hộ tống; tao dừng ở chênh giá theo ý mày chọn.
- Chi tiêu theo tiền quỹ làm khoản thu từ sự kiện của nhà giàu cũng lớn hơn. Nếu mày thấy nhà giàu lên quá nhanh qua sự kiện thì báo, tao tách hệ số thu và chi.
- Còn treo từ 6.5.3: kỳ ngộ chung chưa tách riêng khỏi người trong quân.
