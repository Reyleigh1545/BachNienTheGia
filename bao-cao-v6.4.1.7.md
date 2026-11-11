# Báo cáo v6.4.1.7 (11/11/2026)

Bản thứ bảy trong chuỗi 6.4.1.x, trên nền v6.4.1.6. Nội dung theo bảng thứ tự bản ở `ke-hoach-phat-trien.md`, mục 6. Bản này gồm:
- Trạng thái hoàng đế (mục 10 của `ke-hoach-v6.4.1.1.md`).
- Tuyến 4 và tuyến 6 của file gợi ý quan trường.
- Danh hiệu cấp Thần gộp với thiên mệnh (mục 7 kế hoạch, mục 8 `y-kien-v6.md`).
- Sự kiện vượt mốc theo từng mốc.
- Chiến tranh tại nơi ở.
- Hai điều mày nhắn giữa chừng.

Thông tin chung:
- Nhánh `v6.4.1.7`, tách từ `v6.4.1.6`. Gói zip có thư mục gốc `BachNienTheGia-v6.4.1.7/`.
- 52 sự kiện mới, ở tệp mới `ev-v6417.js`. Tổng khoảng 1.123 lên khoảng 1.175. Không thêm kỳ ngộ.
- Thêm 20 con đường vượt mốc mới (dữ liệu, không tính là sự kiện).
- Save cũ vẫn mở được.

**Về kiểm thử.** Mày tự test nên tao chỉ làm mấy việc sau:
- `node --check` toàn bộ tệp: đạt.
- Cho máy tự chơi 40 năm: không có lỗi script, kiểm tra bất biến sạch. Trong ván ấy có vua lập thái tử, có một đợt thanh trừng, có vua băng hà và vua mới lên ngôi.
- Gọi ép từng nhóm sự kiện mới, máy bấm ngẫu nhiên: không có lỗi.
- Thử riêng:
  - một cuộc tranh ngôi đi hết các bước rồi vua băng hà;
  - phong Thần Y (ép xúc xắc ra thành) và mất danh hiệu khi người giữ qua đời;
  - hộp vượt mốc 120 hiện đúng con đường riêng;
  - người đi lính ở nhà chính có hộp cho mày quyết;
  - phe trong triều bị ẩn khi nhà chưa có quan.

Chưa thử được trong ván thật:
- đứa trẻ mang thiên mệnh lúc sinh (tỉ lệ rất thấp);
- danh hiệu cấp Thần mở ra một cách tự nhiên (cần chỉ số 170 đến 200, rất hiếm).

## 1. Các điểm và kết quả

| Điểm | Kết quả |
|---|---|
| Trạng thái hoàng đế, dân tâm, quốc khố, loạn | Mục 2 |
| Sự kiện thời thế theo loại vua | Mục 2 |
| Tuyến 6: tranh đoạt hoàng quyền | Mục 3 |
| Tuyến 4: thanh trừng khi vua đa nghi | Mục 4 |
| Danh hiệu cấp Thần | Mục 5 |
| Thiên mệnh, đặc tính cái thế | Mục 6 |
| Sự kiện vượt mốc đa dạng theo từng mốc | Mục 7 |
| Chiến tranh tại nơi ở | Mục 8 |
| Người đi lính ở nhà chính do mày điều khiển (nhắn giữa chừng) | Mục 9 |
| Ẩn các phe trong triều tới khi nhà có quan (nhắn giữa chừng) | Mục 9 |

## 2. Hoàng đế và thiên hạ

**Mỗi đời vua có:** tuổi, sức khỏe, tài, đức, uy, và độ đa nghi. Từ đó suy ra loại vua:

| Loại vua | Khi nào |
|---|---|
| Ấu chúa | Dưới 16 tuổi, quyền nằm trong tay quan nhiếp chính |
| Bạo quân | Đức rất thấp |
| Hôn quân | Tài thấp, đức không cao |
| Minh quân | Tài cao và đức cao |
| Thủ thành | Các trường hợp còn lại |

**Cả nước có:** dân tâm, quốc khố, mức loạn. Mỗi năm các chỉ số này trôi theo loại vua, chiến tranh, thiên tai.

**Vua băng hà theo tuổi và sức khỏe.** Trước đây mỗi đời vua có số năm cố định. Người nối ngôi:
- có thái tử thì thái tử lên ngôi;
- đang tranh ngôi thì người thắng lên ngôi;
- không có ai thì một hoàng tử khác lên ngôi.

Vua đã ngoài 28 tuổi thì mỗi năm có 15% khả năng lập thái tử.

**Ảnh hưởng nhẹ tới game:**
- Thăng chức: minh quân thì nhanh hơn 25%; hôn quân, bạo quân thì chậm hơn.
- Hôn quân, bạo quân thì quan trong nhà mỗi năm kém liêm chính đi một chút.

**Hiển thị.** Trang Gia tộc có thẻ **Thời thế**, mô tả bằng chữ, ví dụ "Hoàng đế ham vui, bỏ bê triều chính; dân oán khắp nơi…".
- Nhà có Giám Chính hoặc quan Nhất phẩm: biết rõ, kể cả long thể bất an, vua đa nghi, ngôi thái tử còn trống.
- Nhà có quan từ Tam phẩm: biết đại khái.
- Không có ai: chỉ nghe đồn, có khi không đúng.
- Trang admin hiện thêm các con số.

**8 sự kiện thời thế** (mỗi tháng có khả năng 2%, mỗi loại cách nhau ít nhất 4 năm). Loại vua quyết định sự kiện nào hay xảy ra:

| Sự kiện | Nội dung |
|---|---|
| Lệnh tuyển tú | Dâng con gái vào cung, lo lót, gả vội, hoặc giấu đi |
| Xây cung điện mới | Nộp tiền thay sưu dịch, hoặc cho người đi phu (có thể chết) |
| Sưu cao thuế nặng | Nộp đủ, xin giảm, hoặc cả làng làm đơn phản đối |
| Đại xá thiên hạ | Người bị đày được về, lệnh cấm thi được bỏ |
| Khoa thi ân điển | Thi Hương ngay năm ấy, ngoài lệ ba năm một khoa |
| Khách lạ trong làng | Vua vi hành |
| Chiếu cầu hiền | Tiến cử người tài chưa làm quan |
| Dân biến | Có thể kéo cả binh lửa vào làng |

## 3. Tranh đoạt hoàng quyền (tuyến 6)

**Khi nào nổ ra:** vua từ 55 tuổi hoặc sức khỏe yếu mà chưa lập thái tử. Mỗi năm có 25% khả năng. Rất hiếm.

**Hai bên:** một hoàng tử (được Hoàng đảng ủng hộ) và một thân vương (được phe Quyền thần nâng đỡ).

**7 bước, cách nhau 4 đến 8 tháng.** Các bước tới tay vị quan cao nhất trong họ (từ Lục phẩm). Không có quan như vậy thì tới gia chủ, nếu nhà từ Hào phú trở lên hoặc có tướng từ Thiên hộ.
1. **Hoàng đế lâm bệnh:** ngả về hoàng tử, ngả về thân vương, hay trung lập.
2. **Bị lôi kéo:** nhận vàng đổi phe, hoặc giữ lòng.
3. **Thân vương chiêu binh:** góp tiền nuôi quân, hoặc tâu lên vua.
4. **Làm chứng cho một hoàng tử.**
5. **Lời bàn phế lập:** ủng hộ, phản đối, hoặc **đứng ra hòa giải**. Hòa giải rất khó, nhưng thành thì cuộc tranh ngôi kết thúc êm, nhà mình được tiếng lớn.
6. **Chiếu thư bị đánh tráo:** vạch trần, im lặng, hoặc giúp giấu chiếu thư thật (nhúng chàm, tội nặng).
7. **Kinh thành giới nghiêm:**
   - đưa con cháu rời kinh: nếu thua, tội nhẹ đi;
   - nếu họ có tướng từ Tướng quân trở lên: **đem quân giữ cửa cung**, gần như quyết định thắng thua;
   - đóng cửa chờ thời.

**Kết thúc: vua băng hà.** Bên mạnh hơn thắng, có thêm may rủi.
- **Nhà mình đứng đúng phe:** quan văn võ trong họ được thánh ân và công trạng lớn, có thể được phong tước. Gia tộc thêm danh vọng.
- **Đứng nhầm phe:** mọi người làm quan bị soi xét, mất thánh ân. Người đã ra tay nhiều thì bị khép tội kết bè, can thiệp triều chính, rồi bị đàn hặc. Đường từ đó có thể dẫn tới tru di.
- **Trung lập:** không được gì, mất chút thánh ân.

## 4. Thanh trừng khi vua đa nghi (tuyến 4)

**Khi nào xảy ra:** vua có độ đa nghi từ 60. Mỗi năm có khả năng mở một đợt thanh trừng nhắm vào phe mạnh nhất.
- Người làm quan trong họ bị tra xét, người thuộc phe ấy bị nặng hơn.
- Một nửa số lần, phe ấy thất thế ngay.

**Sự kiện của đợt thanh trừng:**
- Hoàng đế bí mật triệu kiến: thề trung thành, tâu thật chuyện trong phe, hoặc xin cáo quan.
- Mật chỉ tra xét đại thần.
- Một vị quan tự sát trong ngục, để lại di thư.
- Danh sách môn sinh bị thu giữ.
- Đồng minh cũ quay lưng.
- Bị gọi lên đối chất.

**Sự kiện ngẫu nhiên khi vua đa nghi:**
- **Lệnh giao nộp binh quyền** (tướng từ Phó tướng). Kháng lệnh là tội mưu phản, có thể dẫn tới tru di cửu tộc.
- Thân vương bị nghi mưu phản.
- Ngự sử tố bè đảng.
- Cơ hội tố giác người khác để tự cứu (khi đang bị đàn hặc).

## 5. Danh hiệu cấp Thần

**9 danh hiệu.** Mỗi danh hiệu trong họ chỉ một người giữ cùng lúc.

| Danh hiệu | Nghề tới bậc cao nhất (hoặc chủ cơ sở bậc cao nhất) | Chỉ số |
|---|---|---|
| Thần Y | Danh y, Thái y lệnh, chủ y viện | Trí 200 |
| Võ Thần | Võ lâm minh chủ, chủ đại môn phái | Võ 200, Trí 100 |
| Thánh Nhân | Đại nho, chủ đại thư viện | Trí 200 |
| Thương Thánh | Đại chưởng quỹ, chủ thương hội | EQ 170 |
| Cầm Thánh | Đệ nhất danh cầm, chủ hí lâu | Mị lực 170 |
| Thiên hạ đệ nhất tiêu | Tổng tiêu đầu, chủ đại tiêu cục | Võ 170 |
| Thần Nông | Điền chủ | Sức khỏe 160 |
| Thần Tượng | Danh tượng, chủ danh xưởng | Võ 150, kỹ nghệ 90 |
| Giám Chính | Khâm thiên giám sư | Trí 200 |

**Điều kiện chung:** từ 35 tuổi, thông thạo từ 110, danh vọng cá nhân từ mốc Danh nhân (350).

**Cách lấy.** Đủ điều kiện thì có tiếng đồn. Nhận lời thì qua **hai bước khảo nghiệm**, mỗi danh hiệu có hai tình huống riêng. Ví dụ:
- Thần Y: dịch lạ ở phủ bên, rồi ca bệnh mười năm của Thái y viện.
- Võ Thần: thách đấu của võ lâm, rồi ổ giặc trên núi.
- Giám Chính: tâu ngày nhật thực, rồi soạn lịch mới.

Qua cả hai thì được phong: danh vọng cá nhân +200, gia tộc +80, sử ký ghi lại. Trượt thì 5 năm sau mới có dịp khác.

**Tác dụng khi người giữ còn sống.** Nhẹ, phần lớn là giảm thiệt hại. Mất ngay khi người giữ qua đời.

| Danh hiệu | Tác dụng |
|---|---|
| Thần Y | Người trong họ ít nhiễm dịch hơn 20%; người già yếu đi chậm hơn |
| Võ Thần | Con cháu dưới 30 luyện võ nhanh hơn 15%; người đi lính ít tử trận hơn; giặc tới làng thì người nhà được che chở |
| Thánh Nhân | Con cháu đi học nhanh hơn 15%; đi thi cộng 2 điểm |
| Thương Thánh | Mọi cơ sở lãi thêm 8%; chuyến buôn bớt một phần khả năng gặp nạn |
| Cầm Thánh | Con cháu dưới 30 lớn mị lực nhanh hơn 10% |
| Thiên hạ đệ nhất tiêu | Chuyến buôn của họ chỉ còn một phần năm khả năng gặp nạn |
| Thần Nông | Mất mùa ít hơn 60%, được mùa thêm 5% |
| Thần Tượng | Xưởng lãi thêm 10% |
| Giám Chính | Đi thi cộng 2 điểm (chọn ngày lành); thẻ Thời thế biết rõ mọi chuyện trong cung |

Danh hiệu hiện bằng chip viền vàng.

**Giám Chính** tao làm thành danh hiệu cấp Thần của nghề địa lý. Nó chưa phải ghế quan Khâm thiên giám giám chính trong hệ ghế. Thiếu phần báo trước thiên tai.

## 6. Thiên mệnh

**Đặc tính "cái thế".** Khi một người giữ danh hiệu cấp Thần qua đời, trẻ sinh ra trong họ có 3% mang đặc tính cái thế tương ứng. Con cháu trực hệ của người ấy có 6%. Mỗi lúc chỉ một người mang. Người mang có:
- tư chất rất cao ở chỉ số của nghề ấy;
- chỉ số ấy lớn nhanh thêm 50%.

**Thiên mệnh tự nhiên.** Ngoài cái thế, trẻ nào sinh ra cũng có 1/2000 mang một thiên mệnh ngẫu nhiên:
- một trong các cái thế;
- **Đế vương chi tướng:** tư chất EQ và mị lực cao;
- **Kỳ tài:** tư chất cao ở mọi chỉ số, mọi chỉ số lớn nhanh hơn.

**Thiên mệnh không phải nút thắng:**
- Lên 12 tuổi có sự kiện "Đứa trẻ khác thường".
- Từ đó mỗi năm có khả năng gặp **kiếp nạn**: kẻ ghen ghét, bạo bệnh, tai nạn. Có thể suýt mất mạng.
- Đế vương chi tướng còn bị quan phủ dòm ngó, có khi bị thích khách.

## 7. Sự kiện vượt mốc theo từng mốc

- **Trước:** mốc 100, 120, 140 đều hiện cùng mấy con đường vượt mốc.
- **Nay:**
  - Mốc 100 giữ các con đường cũ.
  - Mốc 120 và mốc 140 mỗi mốc có **hai con đường riêng cho từng chỉ số**, tổng cộng 20 con đường mới. Ví dụ ở trí tuệ:
    - mốc 120: "Bế môn ba năm, tự ngộ điều sách không dạy", "Đi khắp các thư viện lớn, tranh biện với bậc túc nho";
    - mốc 140: "Soạn một bộ sách cho đời sau", "Đêm đêm xem thiên văn, suy lẽ trời đất".
  - Mốc càng cao, thời gian càng dài: mốc 120 mất 14 đến 24 tháng, mốc 140 mất 18 đến 30 tháng.
  - Mốc 150 (mở trần 200) dùng các con đường của mốc 140.
- Con đường cho trẻ con và người già (6.4.1.5) vẫn hiện ở mọi mốc nếu hợp tuổi.

## 8. Chiến tranh tại nơi ở

**Khi chiến trường ngay trên đất nhà mình:** mỗi tháng có 7% khả năng gặp binh lửa. Chiến trường ở gần thì 2%, nhưng chỉ gặp tàn quân hoặc bắt phu.

**Cách tính thương vong.** Với mỗi người ở nhà, khả năng chết tùy:
- mức nghiêm trọng của trận;
- **võ lực của người giỏi võ nhất nhà**: người ấy che chở cả nhà;
- Võ Thần trong họ thì che chở thêm;
- trẻ con và người già dễ chết hơn, người võ giỏi ít chết hơn.

Mất nhiều người cùng lúc là có thể. Cả nhà chết hết thì hết game như thường.

**6 sự kiện:**
- **Giặc tràn qua làng:** chạy vào rừng, cố thủ, nộp tiền mua bình an, hoặc đem người nhà ra đánh. Đánh thua thì thương vong nặng nhất.
- **Quân cướp lương:** mất lương trong kho.
- **Làng bị đốt:** nhà thấp đi một bậc nếu không có tiền dựng lại.
- **Bắt phu ra trận:** người bị bắt thành lính.
- **Cứu người giữa binh lửa.**
- **Tàn quân ghé làng.**

## 9. Hai điều mày nhắn giữa chừng

- **Người đi lính ở nhà chính do mày điều khiển.** Mọi sự kiện của người ấy hiện hộp cho mày quyết. Chỉ người đi lính thuộc chi họ (mà không phải chi chủ) mới tự quyết.
- **Các phe trong triều bị ẩn.**
  - Nhà chưa có ai làm quan: không thấy thẻ phe, chỉ thấy Sử ký nếu đã có mốc.
  - Có người làm quan: thấy tên, tính chất, người đứng đầu các phe.
  - Có quan từ Ngũ phẩm: mới biết phe nào mạnh, phe nào yếu, vua tin phe nào.
  - Trên trang admin thì luôn thấy hết, để mày thử.

## 10. Save cũ

- Mở được.
- Triều đại cũ được gán một vị vua ngẫu nhiên, cùng dân tâm, quốc khố, mức loạn. Thời điểm vua băng hà theo cách tính mới.
- Người đang làm quan không bị ảnh hưởng gì thêm.

## 11. Tệp thay đổi

- Mới: `ev-v6417.js` (52 sự kiện).
- `engine.js`:
  - hoàng đế, thiên hạ, kế vị, thanh trừng;
  - danh hiệu cấp Thần, thiên mệnh;
  - chiến tranh tại nơi ở;
  - con đường vượt mốc theo từng mốc;
  - khoa thi ân điển;
  - quyền điều khiển người đi lính, ẩn phe;
  - chữ phiên bản.
- `index.html`: chip viền vàng cho danh hiệu cấp Thần và thiên mệnh, nạp tệp mới, dòng phiên bản. `admin.html`, `admin.js`: theo.

## 12. Còn lại cần mày biết

- **Danh hiệu cấp Thần cực hiếm.** Từ bản 6.4.1.5.1 chỉ số lớn chậm, mà mở trần 200 lại khó, nên nhiều ván có thể không bao giờ có. Đúng ý mày ("chỉ thiên tài hiếm có"). Nhưng nếu chơi trăm năm không thấy ai, thì tao hạ yêu cầu chỉ số.
- **Giám Chính** là danh hiệu, chưa phải ghế quan, và chưa có phần báo trước thiên tai (mục 5).
- **Đế vương chi tướng** hiện chỉ có tư chất và kiếp nạn. Nó sẽ có ý nghĩa ở bản lên ngôi (6.4.1.9).
- Chuỗi "mưu phản" cũ (`md_a/b/c`) vẫn giữ nguyên. Theo kế hoạch, nó sẽ được thay ở bản 6.4.1.9.
- Mọi con số đều là phỏng đoán: tần suất tranh ngôi, thanh trừng, binh lửa, mức thương vong.
- Bản tiếp theo: **6.4.1.8**, ân oán Phạm Trung Kiên: đường kiện khó, các cái kết thua thảm, báo thù, cân thưởng khi thắng.
