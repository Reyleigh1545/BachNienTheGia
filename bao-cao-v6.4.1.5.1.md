# Báo cáo v6.4.1.5.1 (09/11/2026)

Bản sửa nhanh của v6.4.1.5, làm theo góp ý mày gửi sau khi chơi thử. Mã ở nhánh `v6.4.1.5.1`, tách từ `v6.4.1.5`. Gói zip có thư mục gốc `BachNienTheGia-v6.4.1.5.1/`.
- Sự kiện: không thêm. Có sửa 3 tệp sự kiện: `ev-v632a.js`, `ev-v6415.js`, `ev-nghe2.js`.
- Save cũ vẫn mở được.

**Về kiểm thử.** Tao chỉ làm mấy việc sau:
- `node --check` toàn bộ tệp: đạt.
- Cho máy tự chơi 40 năm: 0 lỗi script, kiểm tra bất biến sạch.
- Đo tốc độ lớn của trí tuệ ở trẻ có tiềm năng 40, 65, 90 (mục 1).
- Cho bốn người có trí 74, 89, 100, 115 đi thi (mục 2).
- Thử chức tạm khi chờ ghế, và ẩn người bị trục xuất khỏi gia phả.

Mày từng chốt để chuyện cân bằng chỉ số sang giai đoạn sau. Lần này mày nêu lại và tả rõ tình trạng, nên tao làm luôn.

## 1. Chỉ số lớn quá nhanh

**Nguyên nhân.** Một đứa trẻ được cộng cùng lúc từ nhiều nguồn:
- trường học;
- việc rảnh "đọc sách";
- tăng trưởng tự nhiên;
- hệ số trẻ con;
- cha mẹ là thầy thì còn nhân thêm.

Gộp lại khoảng 15 điểm một năm. Tiềm năng chỉ làm chậm đi rất ít. Phần tăng trưởng tự nhiên còn cộng đều mỗi tháng, chồng lên phần học được.

**Sửa:**
- **Trần mềm theo tư chất.** Trần mềm bằng mức tự nhiên năm 18 tuổi, cộng 10, cộng 15% tiềm năng. Vượt trần mềm thì học thêm chậm hẳn, xuống còn 5% đến 30% tốc độ cũ. Càng vượt xa càng chậm.
- Qua 100 thì chậm thêm, còn một phần tư. Qua 120 thì lại giảm một nửa nữa.
- **Lớn tự nhiên không còn cộng chồng.** Phần này chỉ kéo người đang thấp hơn đường tự nhiên của tuổi mình lên kịp. Đã học vượt thì không cộng thêm.
- Áp cho mọi nguồn tăng: trường học, việc rảnh, nghề nghiệp (trợ giáo dạy học), học việc. Thể chất và đặc tính đặc biệt vẫn làm lớn nhanh hơn như trước.

**Đo thử trí tuệ của trẻ đi học, rảnh thì đọc sách:**

| Tiềm năng | 12 tuổi | 16 tuổi | 22 tuổi |
|---|---|---|---|
| 40 | 49 | 54 | 55 |
| 65 | 64 | 68 | 70 (đứa có đặc tính hợp thì 89) |
| 90 | 83 | 93 | 95 |

Trước đây đứa tiềm năng 65 đã 96 lúc 16 tuổi. Nay chỉ thiên tài mới gần chạm 100 khi còn trẻ.

**Danh hiệu chỉ số** (Bác học, Đại nho, Cao thủ…) khó lấy hơn nhiều:
- Khả năng thành ở ngay mốc giảm từ khoảng 60% và 78% xuống khoảng 35% và 50%.
- Còn trẻ thì khó thêm: dưới 30 tuổi rất khó, dưới 40 khó, dưới 50 hơi khó.
- Người có tiềm năng từ 85 được bớt khó.

## 2. Khoa cử

- **Mỗi vòng tối đa 100 điểm**, kể cả cộng danh hiệu.
- Chỉ số nặng ít hơn trong điểm thi. Điểm cộng từ danh hiệu còn một nửa.
- **Thi Đình 5 vòng:**
  1. Điện thí.
  2. Sách vấn: vua hỏi kế trị nước.
  3. Luận sử.
  4. Thơ ứng chế.
  5. Đối đáp.

  Mỗi vòng có các lối làm bài riêng.
- **Danh hiệu và chức được bổ chỉ tính theo điểm thi Đình:**

  | Điểm thi Đình | Danh hiệu | Chức được bổ tới |
  |---|---|---|
  | Từ 95 | Trạng nguyên | Lục phẩm |
  | Từ 90 | Bảng nhãn | Thất phẩm |
  | Từ 86 | Thám hoa | Thất phẩm |
  | Từ 76 | Tiến sĩ | Bát phẩm |
  | Dưới 76 | Tiến sĩ | Cửu phẩm |

  Trước đây Trạng nguyên có thể được bổ thẳng Tam phẩm.
- **Thử thi:** người trí 74 và 89 trượt thi Hương. Người trí 117 chỉ đỗ Cử nhân. Người trí 115 đỗ Tiến sĩ hạng thường. Điểm từng vòng nằm khoảng 44 đến 69.

**Chức tạm khi chờ ghế.** Đỗ rồi nhận chức thì người ấy **tạm giữ một chức thấp hơn một bậc** để làm quen việc. Có ghế đúng bậc thì bộ Lại hỏi: nhận chức mới, hay ở lại chức đang giữ. Ai được bổ Cửu phẩm thì vẫn chờ như cũ, vì không có bậc nào thấp hơn.

## 3. Lựa chọn không kèm chú thích

- Dòng chữ nhỏ giải thích dưới mỗi lựa chọn không còn hiện nữa.
- Lựa chọn trả tiền ngay khi chọn (mua, xây, sửa, biếu, lo lót…) vẫn ghi giá trong tên lựa chọn như trước. Con đường vượt mốc chỉ số có tốn tiền thì ghi "Tốn …".
- Lựa chọn "Vay nóng để mua hai mẫu" không còn ghi khoản nợ ngay trên lựa chọn. Khoản nợ hiện ra trong kết quả và lúc chủ nợ đến đòi.
- Các màn hình riêng như chọn trường, tuyển người, mở cơ sở vẫn giữ mô tả, vì đó là bảng thông tin chứ không phải hộp lựa chọn của sự kiện.

## 4. Họ khác, hôn nhân

- **Ngỏ ý thông gia** (cả sự kiện cũ lẫn mới): chỉ khi nhà mình ngang hoặc cao hơn nhà kia, hai nhà đã thân (hảo cảm từ 25), và nhà mình từ Tiểu hộ khá giả trở lên.
- **Bần hộ, Thường dân:** họ khác không còn đến chơi, hỏi thăm, nhờ vả, mời dự đám, cầu thân. Chỉ còn chuyện tranh chấp.
- **Đám tang nhà họ khác:** ít đi hẳn. Mỗi nhà tối đa 15 năm một lần. Cả vùng 6 năm mới có một đám. Tần suất còn một nửa.
- **Cạnh tranh góp tiền:** bỏ hai lựa chọn nhường nhịn. Nay có bốn lựa chọn: góp thật lớn, rủ nhà kia cùng góp, góp như mọi nhà, mặc kệ không góp.
- **Cưới con nhà gia giáo:** người vợ cưới về giỏi giang thật. Trí, mị lực, EQ từ khoảng 58 đến 78. Tính hiếu thuận, thật thà, rộng lượng, tiết chế, điềm tĩnh từ khoảng 62 trở lên. Không có tật xấu.

## 5. Khác

- **Bị trục xuất thì bị xóa khỏi gia phả.** Con cháu của người ấy mà còn ở trong họ thì vẫn hiện, treo dưới ông bà.
- **Nội trợ:**
  - Không còn bậc, không còn thông thạo, không còn hộp mốc thông thạo hay hộp đề bạt.
  - Tác dụng duy nhất là giảm chi tiêu trong nhà. Người giỏi quản việc và khéo cư xử thì giảm nhiều hơn.

## 6. Save cũ

- Mở được.
- Người đã có chỉ số cao vẫn giữ nguyên, chỉ lớn chậm lại từ nay.
- Nội trợ đang ở bậc cao thì vẫn hiện tên bậc cũ, nhưng không còn tác dụng gì thêm.

## 7. Còn lại cần mày biết

- Mức khó của khoa thi nay phụ thuộc vào tốc độ lớn của chỉ số. Sau bản này, người có trí trên 100 đã hiếm. Nếu chơi thấy cả trăm năm không ai đỗ được thì nói tao, tao hạ mốc đỗ (đang khoảng 62 cho thi Hương, 72 cho thi Hội).
- Bản tiếp theo vẫn là **6.4.1.6**: tình duyên; chi họ xa; gia đình người đi lính, làm quan xa.
