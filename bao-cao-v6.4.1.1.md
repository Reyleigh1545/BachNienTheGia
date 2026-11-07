# Báo cáo v6.4.1.1 (07/11/2026)

Bản đầu tiên trong chuỗi 6.4.1.x, trên nền v6.4.1. Gồm trang thử nghiệm admin và bốn lỗi nhỏ của kế hoạch (`ke-hoach-v6.4.1.1.md`, mục 0, 12.1, 13, 16).
Mã nguồn: GitHub `Reyleigh1545/BachNienTheGia`, nhánh `v6.4.1.1` (từ `v6.4.1`). Gói zip có thư mục gốc `BachNienTheGia-v6.4.1.1/`.
Sự kiện: không thêm, không bớt.

**Về kiểm thử.** Theo lệnh "mày tự test", tao không chạy bộ test. Chỉ làm:
- `node --check` toàn bộ tệp `.js`: đạt.
- Mở `admin.html` trong Chrome chạy ngầm, lập ván mới, cho máy tự chơi 30 đến 45 năm (ba lần): 0 lỗi script, kiểm tra bất biến sạch.
- Thử riêng tàng thư và truyền việc khi nghỉ hưu (xem mục 3, 4): chạy đúng.
- Mở `index.html`: không có bảng admin, có nút thu nhỏ gia phả, dùng khóa lưu cũ.

Chưa thử: chọn người trông cơ sở trên màn hình thật (trong mấy ván thử không ai mở cơ sở), các sự kiện danh gia sau khi chặn người ở chi họ.

## 1. Các điểm và kết quả

| # | Điểm | Kết quả |
|---|---|---|
| 0 | Trang admin | `admin.html` + `admin.js`, mục 2 |
| 0 | Thu nhỏ gia phả, có ở cả hai bản | Mục 5 |
| 12.1 | Người trông cơ sở | Mục 6 |
| 13 | Tàng thư theo hộ | Mục 3 |
| 13 | Truyền việc khi nghỉ hưu | Mục 4 |
| 16 | Bổ nhiệm, người ra mặt chỉ lấy người nhà chính | Mục 7 |
| | Dòng phiên bản | `v6.4.1.1` (bản thường), `v6.4.1.1 · admin` (bản admin). Menu chính trước ghi nhầm "Phiên bản 6.3.5", nay ghi đúng |

## 2. Trang admin

Mở `admin.html` thay cho `index.html`. Góc dưới bên trái có nút **⚙ Admin**, bấm ra bảng ba thẻ. Bảng nổi trên cả hộp thoại nên bật tắt được giữa chừng.

**Save riêng.** Bản admin lưu vào khóa riêng (`bnthegia.v6.adm.slot…`), không đụng save của bản thường dù cùng trang web. Muốn thử trên ván đang chơi thì dùng nút "Chép save bản thường" (mục Tự chơi): save gốc không bị đổi.

**Thẻ Tự chọn**
- **Hiện tỉ lệ thành** ở từng lựa chọn có gieo xúc xắc; lựa chọn không gieo ghi "Không gieo xúc xắc". Bản thường vẫn không hiện số.
- **Máy tự chọn:** Tắt, Cao, Vừa, Thấp, Ngẫu nhiên.
  - Hộp có lựa chọn gieo: chỉ chọn trong các lựa chọn gieo. Cao lấy tỉ lệ cao nhất, Thấp lấy thấp nhất, Vừa lấy ở giữa, Ngẫu nhiên bốc một cái.
  - Hộp toàn lựa chọn không gieo: chạy thử từng lựa chọn trên bản sao của ván (không ảnh hưởng ván thật), đếm số mục tăng trừ số mục giảm. Cao lấy cái lợi nhất, Thấp cái thiệt nhất, Vừa cái ở giữa.
  - Hộp không phải sự kiện (ví dụ hộp nghỉ hưu, khoa cử) mà toàn lựa chọn không gieo thì không chạy thử được: máy bốc ngẫu nhiên.
  - Chọn xong máy tự bấm "Tiếp tục".
- **Ép kết quả xúc xắc:** Tự nhiên, Thành, Đại thành, Bại, Thảm bại. Chỉ áp cho xúc xắc của hộp lựa chọn. Các phép may rủi bên trong một kết quả (ví dụ "nửa số lần thì…") vẫn ngẫu nhiên. Sự kiện không có nhánh đại thành hoặc thảm bại thì ra thành hoặc bại thường.
- **Độ trễ** giữa các lần máy bấm (mặc định 250 ms).

**Thẻ Chỉnh**
- Gia tộc: công quỹ, danh vọng, hưng thịnh, ổn định.
- Người đang chọn trong gia phả: tuổi, năm chỉ số chính, tâm trạng, cơ duyên, danh vọng, tiền riêng, thông thạo, bậc nghề, quản trị, mưu, khẩu tài, kỹ nghệ. Sửa ô nào thì bấm "Áp dụng". Chỉnh thẳng bỏ qua các trần chỉ số.
- **Gọi sự kiện:** gõ id hoặc tên, bấm "Gọi" để sự kiện xảy ra ngay với người đang chọn, bỏ qua điều kiện riêng của sự kiện. Sự kiện cần người thứ hai hoặc cần một nhà danh gia thì máy tự tìm; không có thì báo.
- **Vì sao?** chỉ ra điều kiện đầu tiên khiến sự kiện không ra với người đang chọn (sai nghề, sai tuổi, đang hồi, chưa đủ danh vọng…).

**Thẻ Tự chơi**
- **Tự chơi N năm:** máy tự bấm mọi hộp theo kiểu ở thẻ Tự chọn (đang Tắt thì chọn ngẫu nhiên). Kẹt ở một hộp quá lâu thì tự dừng và báo.
- **Chụp mốc, lùi về mốc:** giữ tối đa 10 mốc trong lúc trang còn mở, để thử cả hai nhánh của cùng một lựa chọn.
- **Xuất, nhập save JSON.**
- **Kiểm tra bất biến:** số lỗi (NaN, tuổi âm, vợ chồng không đối xứng, người ở hộ không tồn tại, sách gắn hộ không tồn tại, mất gia chủ).

Từ console trình duyệt gọi được `BN_ADMIN.startPlay(10)`, `BN_ADMIN.stopPlay()`, `BN_ADMIN.audit()`.

Nút gọi thẳng các chuỗi mới (danh hiệu đỉnh nghề, đường lên ngôi) chưa có vì các chuỗi đó chưa làm; sẽ thêm ở bản có chuỗi.

## 3. Tàng thư theo hộ

- Sách viết xong ghi hộ của người viết. Chỉ người **cùng hộ** được hưởng thông thạo khởi đầu từ sách: viết ở nhà chính thì để ở nhà chính, viết ở chi nào thì để ở chi ấy.
- Một hộ không còn ai (đã về nhập nhà chính hoặc tuyệt) thì sách của hộ ấy về nhà chính.
- Trang Cơ ngơi, mục "Của để lại", tách tàng thư theo từng hộ: "Tàng thư · nhà chính", "Tàng thư · Chi …".
- Save cũ: sách được xếp về hộ hiện tại của người viết; không còn biết người viết thì về nhà chính.
- Câu chữ: hộp truyền nghề ghi "sách để lại trong nhà chính / chi họ đang ở" thay cho "cho cả họ".

## 4. Truyền việc khi nghỉ hưu

- Trước: lựa chọn "Truyền việc cho con cháu" lấy **người đầu tiên** từ 16 tuổi chưa có nghề trong cả họ, kể cả người ở chi họ, người chơi không được chọn.
- Nay: hiện tối đa bốn lựa chọn "Truyền việc cho …", mỗi người một lựa chọn, kèm tuổi, có phải con cháu trực hệ không, và thông thạo nghề ấy. Chỉ người **cùng hộ** với người nghỉ, ưu tiên con cháu trực hệ, rồi người thông thạo cao hơn.
- Chủ cơ sở truyền việc thì người nhận **nhận luôn quyền trông cơ sở**, và chỉ người đủ điều kiện trông (mục 6) mới hiện trong danh sách. Trước đây người nhận thành "chủ" mà không có cơ sở nào, cơ sở bỏ trống.
- **Việc có ghế (quan, quan võ, ngự y) và hiệp khách không truyền được nữa.** Trước đây làm quan nghỉ hưu có thể "truyền việc" cho con cháu, người nhận thành quan mà không qua thi cử, không có ghế, và người nghỉ vẫn giữ ghế. Đây là một lỗ hổng làm việc làm quan dễ thêm. Nếu mày muốn có lối "tập ấm" cho con quan thì sẽ làm thành sự kiện riêng ở bản cân bằng.

## 5. Thu nhỏ gia phả

Góc trên khung gia phả có nút **−**, **+**, **Vừa khung**, **100%**. Mức thu nhỏ từ 30% đến 150%, nhớ trên máy. Có ở cả bản thường lẫn bản admin.

## 6. Người trông cơ sở

Danh sách "Giao cho người trông" nay:
- Cơ sở của tộc chỉ hiện người **nhà chính**; cơ sở của chi chỉ hiện người **trong chi ấy**.
- Mỗi người kèm **thông thạo** nghề tương ứng và **quản trị**. Người chưa đủ thì hiện mờ, không chọn được, ghi rõ thiếu gì.
- Điều kiện: từ 18 tuổi, không đi xa, không nghỉ hưu, không giữ chức (quan, quan võ, ngự y), chưa trông cơ sở khác, thông thạo nghề tương ứng từ 50 (võ quán: hoặc võ lực từ 90), quản trị từ 50. Nghề tương ứng theo bảng có sẵn: quán trà, hiệu buôn là tiểu nhị; xưởng là thợ; y quán là y; trường là dạy học; võ quán, tiêu cục là tiêu sư; gánh hát là nghệ nhân; thuyền là ngư phủ; trại là chăn nuôi.

**Cần mày biết:** quản trị lúc trưởng thành của người thường chỉ khoảng 20 (tính từ trí và EQ). Quản trị lên nhờ học sổ sách, làm chủ, nội trợ. Nên lúc đầu có thể **không ai đủ** quản trị 50 để trông cơ sở. Người đang trông sẵn trong save cũ không bị gỡ. Nếu chơi thấy quá chặt thì hạ mốc quản trị (ví dụ 35) ở bản sau.

## 7. Bổ nhiệm và người ra mặt

Đã chặn người ở chi họ ở các chỗ:
- Người được cử đi trong các sự kiện danh gia (mời dự đám, nhờ việc, ghé thăm…): chỉ người nhà chính.
- Sự kiện "Mời dự đám" của họ khác: người được cử và câu "cả nhà đi" chỉ tính người nhà chính.
- Trẻ gặp chuyện thì người lớn ra mặt: chỉ người cùng hộ với đứa trẻ hoặc gia chủ.
- "Truyền nghề cho con cháu" ở mốc thông thạo: chỉ trẻ cùng hộ.
- Chức trong tộc đã chỉ lấy người nhà chính từ trước.

Chưa rà hết mọi chỗ chọn người trong hơn 30 tệp sự kiện. Mày gặp chỗ nào còn lọt thì chỉ tao.

## 8. Tệp thay đổi

- `engine.js`: tàng thư, người trông cơ sở, truyền việc, chọn người ra mặt, thu nhỏ gia phả, các móc cho trang admin (chỉ chạy khi có `admin.js`), khóa lưu riêng cho admin, chữ phiên bản ở menu.
- `ev-v63.js`, `ev-v635a.js`: người được cử chỉ lấy người nhà chính.
- `index.html`: kiểu cho nút thu nhỏ gia phả, dòng phiên bản.
- Mới: `admin.html`, `admin.js`, `tools/make-admin.js` (dựng lại `admin.html` từ `index.html`: sửa `index.html` xong thì chạy `node tools/make-admin.js`).

## 9. Còn lại cần mày biết

- Bản tiếp theo theo kế hoạch: **6.4.1.2**, cân bằng độ khó (khoa cử, tước, bậc gia tộc, nhãn danh vọng cá nhân, kinh doanh, bớt hộp thoại, bỏ tác dụng gia tộc của danh hiệu chỉ số).
- Mức quản trị 50 có thể quá chặt (mục 6).
- Quan nghỉ hưu không còn truyền chức được (mục 4): đổi ý thì nói.
