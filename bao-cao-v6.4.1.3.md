# Báo cáo v6.4.1.3 (08/11/2026)

Bản thứ ba trong chuỗi 6.4.1.x, trên nền v6.4.1.2. Theo `ke-hoach-phat-trien.md` (mục 3) và phần "Chốt thêm: quyền điều khiển, gia quy, quan trường" trong `ke-hoach-v6.4.1.1.md`.
- Nhánh `v6.4.1.3`, tách từ `v6.4.1.2`. Gói zip có thư mục gốc `BachNienTheGia-v6.4.1.3/`.
- Sự kiện: không thêm, vẫn khoảng 1.013. Có thêm 4 điều gia quy và 4 loại hộp mới (gia pháp, thư nhà, nhắc gia quy, tin nhà).
- Save cũ vẫn mở được.

**Về kiểm thử.** Mày tự test nên tao chỉ làm mấy việc sau:
- `node --check` toàn bộ tệp: đạt.
- Cho máy tự chơi trang admin khoảng 25 năm: 0 lỗi script, kiểm tra bất biến sạch.
- Thử riêng trên trang admin, các phần sau chạy đúng:
  - Người chi họ gặp sự kiện thì tự quyết. Gặp kỳ ngộ thì hiện hộp "Tin nhà · Chi …".
  - Người đi lính chỉ gặp sự kiện quân ngũ, và cũng tự quyết.
  - Hộp gia pháp đủ ba nhóm phạt, kể cả xử tử tại từ đường.
  - Thư nhà cuối năm, kèm tin đồn và lựa chọn răn dạy.
  - Hộp nhắc lập gia quy.
  - Tư chất ở hộp chọn trường.
  - Dòng thói quen ở Cơ ngơi ghi đúng người.
  - Thẻ Thống kê.

Chưa thử: ván dài nhà đông có nhiều chi họ, để xem số hộp giảm bao nhiêu và người tự quyết có hợp tính không. Phần này mày chơi mới thấy.

## 1. Các điểm và kết quả

| Điểm | Kết quả |
|---|---|
| Quyền điều khiển, tự quyết theo tính cách | Mục 2 |
| Thư nhà cuối năm, gia chủ can thiệp | Mục 3 |
| Gia quy chia nhóm phạt cố định, uy gia pháp | Mục 4 |
| Nhắc lập gia quy mỗi năm | Mục 4 |
| Sự kiện ghi nhận trước khi hiện hộp (audit, P0) | Mục 5 |
| Đi lính mà vẫn như ở nhà (review ý 3) | Mục 6 |
| Bần hộ, Thường dân được danh gia ghé thăm (review ý 4) | Mục 6 |
| Dòng chi tiêu "Thói quen" không rõ của ai (review ý 2) | Mục 6 |
| Chọn trường không thấy tiềm lực (review ý 1) | Mục 6 |
| Thẻ Thống kê ở trang admin | Mục 7 |

## 2. Quyền điều khiển và tự quyết

**Ai do mày điều khiển:**
- Gia chủ.
- Người nhà chính đang ở nhà.
- Chi chủ của mỗi chi, kể cả lúc đi xa.

**Ai tự quyết:**
- Thành viên khác của các chi họ.
- Người nhà chính đang đi xa: làm quan nơi khác, đi lính, đi buôn, đi theo người nhậm chức…

**Phạm vi tự quyết.** Chỉ áp cho **sự kiện và kỳ ngộ**, gồm cả cốt truyện. Các hộp khác của người ngoài quyền vẫn hiện cho mày như cũ: sinh nở, tang, thi cử, thăng chức, việc làm, hôn nhân. Tao giữ vậy vì các hộp ấy đi theo luồng riêng. Đưa hết vào tự quyết thì dễ vỡ, và mất những quyết định lớn mà mày nên được thấy. Muốn đưa thêm loại nào vào tự quyết thì nói.

**Người tự quyết chọn thế nào.** Mỗi lựa chọn được chấm điểm theo:
- **Hợp tính.** Game đọc chữ trong lựa chọn để đoán tính chất (ví dụ "nhẫn nhịn" là điềm tĩnh, "liều" là gan), rồi so với tính cách người ấy. Đây là bảng đoán chữ đã có từ trước, nên hơn 1.000 sự kiện cũ dùng được ngay.
- **Liều hay chắc.** Người nhát thì chọn lựa chọn dễ thành. Người gan dám chọn lựa chọn khó mà lợi lớn.
- **Sợ gia pháp.** Lựa chọn phạm gia quy bị trừ điểm. Nhóm phạt càng nặng, uy gia pháp càng cao, người ấy càng nghe lời gia chủ thì càng né. Người vừa bị răn dạy trong ba năm thì né mạnh hơn.
- Thêm một chút ngẫu nhiên.

Lựa chọn dẫn sang hộp khác thì người tự quyết không chọn. Sự kiện nào chỉ có loại lựa chọn đó thì vẫn hiện hộp cho mày.

**Mày thấy gì.**
- Việc nhỏ chỉ ghi nhật ký, có chữ "(tự quyết)", và gom vào thư nhà cuối năm.
- Việc lớn thì hiện hộp **"Tin nhà"**: mô tả sự kiện, người ấy đã chọn gì, kết quả. Hộp này chỉ có nút "Tiếp tục". Việc lớn là một trong các trường hợp:
  - kỳ ngộ hoặc cốt truyện;
  - người ấy chết hay rời họ;
  - công quỹ đổi từ 10% (ít nhất 20 bạc theo gia thế);
  - danh vọng gia tộc đổi từ 5.

## 3. Thư nhà cuối năm

Tháng 12, nếu trong năm có người tự quyết, có tin đồn, hoặc có người làm quan ở xa mà tiếng không sạch, thì hiện **một** hộp "Thư nhà cuối năm". Hộp chia theo từng chi và một mục "Người nhà ở xa", mỗi nơi tối đa 8 chuyện. Tao gom vào một hộp thay vì mỗi chi một hộp để bớt hộp; mày muốn tách thì nói.

Gia chủ can thiệp được ngay trong hộp:
- **Cho người dò xét** người bị đồn phạm gia quy. Tốn 2 bạc (theo gia thế). Có thật thì đem ra gia pháp.
- **Gửi thư răn dạy:** ba năm tới người ấy né việc phạm gia quy mạnh hơn, nhưng hơi giận gia chủ.
- **Bắt người làm quan mà tiếng không sạch từ quan về quê**, áp cho người tự quyết có liêm chính dưới 35. Tránh họa về sau, nhưng người ấy oán.

Chưa làm "cắt viện trợ cho chi". Hiện chưa có khoản viện trợ đều đặn nào để cắt. Sẽ làm khi có.

## 4. Gia quy

**Bốn nhóm, cố định theo từng điều:** tăng trưởng; phạt tiền, đòn roi; trục xuất; xử tử tại gia. Trang Gia tộc ghi nhóm cạnh mỗi điều, xếp từ nhẹ tới nặng.

| Điều | Nhóm | Ghi chú |
|---|---|---|
| Cấm cờ bạc rượu chè | Phạt tiền, đòn roi | Có từ trước |
| Cấm xa xỉ | Phạt tiền, đòn roi | Có từ trước |
| Nghiêm trị gian tham | Trục xuất | Có từ trước, nay tham ô, nhận hối lộ là phạm |
| Không kết bè phái | Trục xuất | Có từ trước |
| **Chi phái không dấn thân quan trường** | Trục xuất | Mới: ngoài chi chủ, người các chi không được làm quan |
| **Trong tộc không quá ba người làm quan** | Trục xuất | Mới |
| **Trong tộc không quá năm người làm quan** | Trục xuất | Mới, không lập cùng điều trên được |
| **Không mưu phản, không thông đồng giặc** | Xử tử tại gia | Mới |
| Các điều còn lại | Tăng trưởng | Giữ nguyên |

Những điều như "Mỗi nhà ba con", "Góa phụ không tái giá", "Không nhận con nuôi" có tính cấm, nhưng game tự chặn luôn nên không ai phạm được. Tao để chúng ở nhóm tăng trưởng.

**Phạm thế nào:**
- **Qua lựa chọn trong sự kiện.** Chữ của lựa chọn khớp với điều cấm thì là phạm. Ví dụ "nhận vàng, thả thuyền" là phạm Nghiêm trị gian tham. Chữ mang nghĩa chối từ, tố giác ("từ chối hối lộ", "tố giác") thì không tính. Gia chủ không bị tính là phạm.
  - Người do mày điều khiển: lựa chọn phạm gia quy có dòng đỏ "Phạm gia quy: … (nhóm …)" ngay trên nút. Chọn rồi thì gia chủ biết ngay.
  - Người tự quyết: có thể lộ, có thể không. Khả năng lộ cao hơn khi người ấy kém thông minh hoặc uy gia pháp cao. Không lộ thì thành tin đồn, có thể lọt vào thư nhà.
- **Dò mỗi năm vào tháng Giêng:**
  - Tật cờ bạc, rượu từ mức 40.
  - Tật phung phí.
  - Quan liêm chính dưới 35.
  - Người chi họ (không phải chi chủ) đang làm quan.
  - Quá số người làm quan cho phép: những người nhận chức sau cùng là người phạm.

**Hộp gia pháp, theo nhóm:**
- **Phạt tiền, đòn roi:**
  - Phạt tiền (30% tiền riêng).
  - Phạt đòn: mất sức, tật xấu giảm.
  - Tha.
  - Phạm từ lần thứ ba thì lên nhóm trục xuất.
- **Trục xuất:**
  - Trục xuất khỏi gia phả.
  - Phạt nặng để giữ người.
  - Tha, chỉ răn dạy.
- **Xử tử tại gia:**
  - Xử tử tại từ đường.
    - Người thân đau buồn và oán gia chủ.
    - Nhà theo gia quy "Gia pháp nghiêm minh" hay "Giữ phép tổ tông" thì được khen, nhà khác thì bị chê.
    - Có khả năng quan phủ biết chuyện và phạt gia chủ khoảng 40 bạc vì tự tiện xử người: 30%, nhà có quan từ Ngũ phẩm thì 15%.
  - Trục xuất thay cho xử tử.
  - Bao che: uy gia pháp sụp, và người ấy mang dấu bao che. Bản 6.4.1.4 sẽ dùng dấu này khi vụ án bị phanh phui.

**Uy gia pháp** (0 đến 100, bắt đầu 50, hiện bằng chữ ở trang Gia tộc):
- Thi hành thì tăng: phạt tiền +3, đòn +4, trục xuất +8, xử tử +15.
- Tha thì giảm: tha lỗi nhỏ −6, tha răn dạy −10, bao che −25.

**Trục xuất trước là đường thoát liên lụy.** Người bị trục xuất không còn tính là người trong họ. Bản 6.4.1.4 sẽ dựa vào đó: trục xuất trước khi vụ án nổ thì nhà chính thoát tru di.

**Nhắc lập gia quy:** tháng Giêng mỗi năm, nếu gia quy còn chỗ trống và đã hết thời gian chờ thì hiện một hộp nhắc. Hộp có ba lựa chọn:
- mở trang Gia tộc;
- để năm sau;
- đừng nhắc nữa.

## 5. Sửa hàng đợi sự kiện (lỗi audit P0)

- **Trước:** lúc bốc sự kiện, game ghi ngay "đã gặp", thời gian hồi và số lần xảy ra. Đến lúc mở hộp thì chỉ xét lại một phần điều kiện. Vì vậy sự kiện có thể hiện sai hoàn cảnh: người ấy đã đổi nghề, đã đi xa, đã lớn quá tuổi. Sự kiện bị bỏ cũng vẫn tốn thời gian hồi.
- **Nay:** lúc bốc chỉ xếp hàng. Lúc mở hộp, game xét lại **toàn bộ** điều kiện. Không còn hợp lệ thì bỏ, không tốn gì. Hợp lệ thì mới ghi nhận, đúng một lần.
- Chỉ áp cho sự kiện bốc ngẫu nhiên. Sự kiện hẹn trước, cốt truyện, sự kiện gọi từ trang admin giữ cách cũ.

## 6. Các lỗi khác

- **Đi lính.** Người ở doanh trại nay chỉ gặp sự kiện quân ngũ. Không còn gặp sự kiện, kỳ ngộ của gia tộc, và cũng không còn bị tăng tần suất như trước. Họ thuộc diện tự quyết (mục 2).
- **Danh gia ghé thăm nhà nghèo** (sửa tạm, làm lại đầy đủ ở hệ hảo cảm bản 6.4.1.5):
  - Bần hộ, Thường dân không còn sự kiện danh gia nào. Trước đây chỉ cần danh vọng 60 là lọt.
  - Bốn đại gia chỉ để mắt tới nhà từ Hương thân.
- **Dòng "Thói quen" ở Cơ ngơi.** Đổi tên thành "Thói quen, sở thích (gia tộc nuôi)", bên dưới ghi rõ từng người và thói quen gì, tật xấu có chú thích. Tiền tính vốn không sai: dòng này gồm cả sở thích tốn tiền như sưu tầm đồ cổ, dùng thuốc bổ, đọc sách hiếm, chứ không chỉ cờ bạc rượu chè.
- **Chọn trường:** hộp chọn trường có thêm dòng "Tư chất của …". Mỗi chỉ số ghi bằng chữ: kém, thấp, trung bình, khá, cao, xuất chúng.

## 7. Thẻ Thống kê (chỉ ở trang admin)

Bảng 12 năm gần nhất. Mỗi năm có các cột:
- Số sự kiện được bốc.
- Số hộp sự kiện thật sự hiện.
- Số bị bỏ vì hết hợp lệ.
- Số lần tự quyết, và trong đó bao nhiêu lần hiện hộp báo tin.
- Số hộp loại khác.
- Tiền công quỹ tăng giảm do chọn lựa chọn, và biến động công quỹ cả năm.

Cuối thẻ có uy gia pháp, số điều gia quy và số tin đồn chưa lộ. Thẻ này để có số liệu thật khi tới giai đoạn cân bằng, như audit khuyên.

## 8. Save cũ

- Mở được.
- Uy gia pháp bắt đầu ở 50.
- Sự kiện đã xếp hàng trong save cũ hiện như trước.
- Gia quy cũ giữ nguyên, chỉ thêm nhãn nhóm.

## 9. Tệp thay đổi

- `engine.js`:
  - quyền điều khiển, tự quyết, thư nhà, tin nhà;
  - gia quy chia nhóm, hộp gia pháp, uy gia pháp, nhắc lập gia quy;
  - hàng đợi sự kiện, quân ngũ, danh gia ghé thăm, dòng thói quen, tư chất khi chọn trường;
  - đếm thống kê, chữ phiên bản.
- `admin.js`: thẻ Thống kê.
- `index.html`, `admin.html`: dòng phiên bản.

## 10. Còn lại cần mày biết

- Người tự quyết đoán tính chất lựa chọn qua chữ. Lựa chọn không có chữ nào khớp thì chỉ chọn theo độ liều và may rủi. Bản 6.4.1.4 sẽ gắn nhãn tay cho sự kiện quan trường.
- Gặp lựa chọn nào bị tính nhầm là phạm gia quy, hoặc phạm mà không bị tính, thì chụp lại cho tao.
- Mức nghiêm hiện tại: tật xấu bị dò mỗi năm, phạm ba lần thì lên trục xuất, quan phủ phạt gia chủ 30% khi xử tử. Đều là phỏng đoán.
- Bản tiếp theo: **6.4.1.4**, cốt truyện quan trường, bè đảng có sự kiện, các nấc hậu quả tới tru di.
