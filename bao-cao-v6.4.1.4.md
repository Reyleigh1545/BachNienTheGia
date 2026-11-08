# Báo cáo v6.4.1.4 (08/11/2026)

Bản thứ tư trong chuỗi 6.4.1.x, làm trên nền v6.4.1.3. Nội dung là cốt truyện quan trường, dựa theo file `Gợi ý cốt truyện quan trường.docx` và kế hoạch đã chốt (phần "Chốt thêm: quyền điều khiển, gia quy, quan trường").
- Mã nguồn ở nhánh `v6.4.1.4`, tách từ `v6.4.1.3`. Gói zip có thư mục gốc `BachNienTheGia-v6.4.1.4/`.
- Thêm **50 sự kiện quan trường** (tệp mới `ev-v6414.js`). Tổng sự kiện từ khoảng 1.013 lên khoảng 1.063. Không thêm kỳ ngộ.
- Save cũ vẫn mở được (mục 7).

**Về kiểm thử.** Mày tự test nên tao chỉ làm mấy việc sau:
- `node --check` toàn bộ tệp: đạt.
- Cho máy tự chơi trang admin 40 năm: 0 lỗi script, kiểm tra bất biến sạch.
- Gọi ép cả 50 sự kiện, mỗi cái hai lượt, cho bốn vị quan trong họ, máy bấm ngẫu nhiên. Có hai lỗi, tao đã sửa.
- Thử riêng từng mức xử án, phe thất thế, và tru di tam tộc khi còn chi họ ở xa: chạy đúng, game chơi tiếp từ chi ấy.

Chưa thử: một ván dài có người làm quan thật từ đầu đến cuối, để xem nhịp sự kiện và độ khó. Phần này mày chơi mới thấy.

## 1. Đối chiếu với file gợi ý

| Phần trong file | Làm ở bản này | Ghi chú |
|---|---|---|
| Tuyến 1: nhập sĩ | Có, 10 sự kiện | |
| Tuyến 2: bè đảng | Có, 10 sự kiện; 4 phe có thế lực riêng | |
| Tuyến 3: tham nhũng, đại án | Có, 12 sự kiện, gồm chuỗi án kho lương | |
| Tuyến 4: thanh trừng do vua nghi kỵ | Một phần | Phe tự thất thế, môn sinh bị tra. Mật chỉ điều tra, vua triệu kiến, thân vương mưu phản chuyển sang 6.4.1.6 vì cần trạng thái hoàng đế |
| Tuyến 5: đại họa gia tộc | Có, đủ thang hậu quả và các đường thoát | |
| Tuyến 6: tranh đoạt hoàng quyền | **Chưa** | Cần hoàng đế lâm bệnh, thái tử, các hoàng tử; làm ở 6.4.1.6 |
| 6 biến hệ thống | Có | Mục 2 |
| Lịch sử chính trị của gia tộc | Có | Phe từng theo, từng bị tru di, thông gia với phe nào |
| Cấp tội 0 đến 5 | Có | Mục 3 |
| Sự kiện đặc biệt (mục 7 của file) | 4 trên 5 | Mật chỉ giả, cựu thần ba triều, hôn sự chính trị, di sớ. Con đường lưu đày làm thành hình phạt chứ chưa thành chuỗi riêng |
| Sử ký quan trường | Có | Mục 5 |
| Số lượng 80 đến 100 sự kiện | 50 | Phần còn lại (tuyến 4, tuyến 6) đi cùng bản hoàng đế, đúng cách chia ba đợt file đề xuất |

## 2. Hồ sơ quan trường

Mỗi người làm quan trong họ có một hồ sơ riêng, tương ứng 6 biến trong file:

| Biến trong file | Trong game | Ghi chú |
|---|---|---|
| factionId | Phe đang theo | Hoặc không theo phe nào |
| factionLoyalty | Trung thành với phe | |
| corruption | Sai phạm | Mỗi lần ăn bạc, sửa án, bao che thì tăng. Tự phai chậm theo năm |
| | Cấp tội | Mức nặng nhất từng phạm, 0 đến 5 |
| imperialFavor | Thánh ân | Mức được vua tin |
| investigationRisk | Nguy cơ bị tra | |
| politicalPower | Phẩm cấp | Cộng thêm thế lực của phe nếu có theo phe |

**Nguy cơ bị tra tính lại mỗi năm**, từ các yếu tố:
- Sai phạm và cấp tội.
- Phe vừa thất thế, hoặc phe đã suy tàn.
- Họ có quá ba người làm quan.
- Nhà từng bị tru di trong 100 năm gần đây, nên bị dè chừng.
- Thánh ân cao thì nguy cơ giảm.
- Có gia quy "Không kết bè phái" mà người ấy không theo phe nào thì nguy cơ giảm.

Cách tính này có nghĩa là một quan thanh liêm vẫn có thể gặp họa nếu phe mình đổ, đúng như file nói: có thể bị vu oan.

Trang người làm quan ghi phe đang theo và trạng thái (bị giám sát, bị đàn hặc, đang xét án). Các con số không hiện. Trong sự kiện, kết quả hiện "Sai phạm", "Nguy cơ bị tra", "Thánh ân", "Trung thành với phe" kèm dấu tăng giảm.

**Bốn phe** (Thanh lưu, Quyền thần, Hoàng đảng, Thực dụng phái):
- Mỗi phe có thế lực, thánh ân, độ trung thành của thành viên, và người đứng đầu có tên.
- Mỗi năm các phe trôi lên xuống:
  - Quyền thần tự mạnh dần, nhưng càng mạnh vua càng nghi.
  - Phe lục đục thì **chia rẽ**: mất thế lực, đổi người đứng đầu.
  - Phe quá mạnh mà mất lòng vua, hoặc quá yếu, thì **thất thế**: người đứng đầu bị bắt, môn sinh bị tra. Người trong họ theo phe ấy gặp sự kiện "Quyền thần thất thế".
- Trang Gia tộc có thẻ **"Các phe trong triều"**. Thẻ ghi thế lực và thái độ của vua bằng chữ, người đứng đầu, và người nhà đang theo phe nào.

## 3. Thang hậu quả và cấp tội

**Cấp tội:**

| Cấp | Tội |
|---|---|
| 0 | Trong sạch |
| 1 | Vi phạm nhỏ |
| 2 | Nhận hối lộ, bao che |
| 3 | Tham ô, cấu kết thương nhân |
| 4 | Kết bè, can thiệp triều chính |
| 5 | Mưu phản, thông đồng ngoại bang |

Bị kéo theo khi phe thất thế thì cấp tội bị tính từ 2 tới 4, tùy độ trung thành với phe. Khi đó có lựa chọn **kêu oan**.

**Các nấc:**
1. **Bị giám sát.** Nguy cơ từ 35. Lựa chọn:
   - Thu mình làm việc cẩn trọng.
   - Đút lót ngự sử: thành thì yên, hỏng thì lên đàn hặc.
   - Mặc kệ.
2. **Bị đàn hặc.** Nguy cơ từ 50. Lựa chọn:
   - Tự biện. Tội càng nặng càng khó.
   - Dâng sớ nhận lỗi: nhẹ tội nhưng khó giữ chức.
   - Cầu cứu phe. Phe càng mạnh, mình càng trung thành thì càng dễ được che.
   - Cắt đứt với phe.
   - Đút lót ngự sử.
3. **Xét án.** Lựa chọn:
   - Chạy án.
   - Kêu oan (nếu bị kéo theo).
   - Đưa chứng cứ vạch mặt kẻ đứng sau (nếu đã giữ chứng cứ từ trước).
   - Khai ra đồng bọn để giảm tội.
   - Để người thân nhận tội thay: hy sinh một người để cứu người kia.
   - Cam chịu.
4. **Bản án theo cấp tội:**

| Cấp | Án |
|---|---|
| 0, 1 | Khiển trách, giáng một bậc |
| 2 | Bãi quan, 5 năm không được bổ dụng hay ứng thí |
| 3 | Bãi quan, tịch biên 40% công quỹ và một phần ruộng, lưu đày 5 đến 12 năm |
| 4 | Xử trảm. Tịch biên 60%. Người làm quan cùng phe trong họ bị bãi quan theo (người khác phe thì một nửa khả năng). Cả họ 3 năm không được ứng thí |
| 5 | Đại án: tru di (mục 4) |

## 4. Tru di và đường thoát

Tru di không bao giờ đến ngay. Án lên cấp 5 thì gia chủ nhận hộp **"Mây đen trên đầu cả họ"**, vài tháng sau mới có chiếu. Trong hộp có các đường thoát:
- **Trục xuất kẻ phạm tội khỏi gia phả** (nếu kẻ ấy không phải gia chủ): người ấy chịu tội một mình, cả họ mang tiếng.
- **Đưa một nhánh con cháu rời đi trong đêm, lập chi ở xa**: nếu đại họa ập xuống thì nhánh này còn sống.
- **Dâng sớ nhận tội, xin cho một mình chịu.** Khó. Thành thì chỉ xử kẻ phạm.
- **Nhờ thông gia, môn sinh cầu tình.** Càng nhiều môn sinh càng dễ.
- **Phó mặc cho trời.**

Chiếu ban xuống thì có hai lựa chọn:
- **Tiếp chỉ.**
  - Tội thật sự là mưu phản (cấp 5): **tru di cửu tộc, hết game**.
  - Lên cấp 5 vì chống đối, như bênh vực thầy cũ khi phe thất thế: **tru di tam tộc**.
- **Kháng chỉ, mở đường cho con cháu chạy.** Khó. Thành thì chỉ tam tộc, bại thì cửu tộc.

**Tru di tam tộc:**
- Nhà chính và thân thích gần của kẻ phạm (cha mẹ, vợ con, anh chị em) bị xử.
- Người ở các chi họ khác hộ thì sống sót, chọn gia chủ mới từ đó.
- Của cải, ruộng, cơ sở của gia tộc bị sung công; cơ sở của chi họ còn giữ.
- Danh vọng gia tộc về âm.
- Không còn ai sống sót thì hết game.

Sau tru di, con cháu làm quan từ Ngũ phẩm có sự kiện "Trở lại kinh thành": dâng sớ xin minh oan cho tổ tiên. Thành thì xóa vết dè chừng.

## 5. Sử ký quan trường

Trang Gia tộc có thẻ **"Sử ký quan trường"**, ghi 15 mốc gần nhất, mỗi mốc có tháng năm. Game lưu tối đa 150 mốc. Tự ghi khi:
- Có người đầu tiên vào quan trường.
- Có người lên Tam phẩm.
- Theo phe, rời phe, đứng đầu phe.
- Phe chia rẽ hoặc thất thế.
- Phá án, công bố di sớ, lật tẩy mật chỉ giả.
- Môn sinh khai báo thầy cũ.
- Bãi quan, tịch biên, lưu đày, xử trảm, liên lụy.
- Đại án, tru di, cắt đứt để giữ họ.
- Thông gia bị liên lụy, rửa oan cho tổ tiên.

## 6. Danh sách sự kiện

Sự kiện mở đầu bốc ngẫu nhiên cho người làm quan, có điều kiện theo phẩm cấp, thời gian tại chức và phe. Các bước sau chỉ mở từ bước trước.

**Tuyến 1, nhập sĩ:**
- Khuyến học nhập sĩ (gia chủ, khi có trẻ sáng dạ).
- Trường thi có biến.
- Yến tiệc tân khoa: các phe tiếp cận.
- Quan mới nhận chức.
- Lời mời kết giao: được nhận làm môn sinh.
- Công trạng đầu tiên.
- Đồng liêu gặp nạn.
- Bước ngoặt quan trường: theo phe hay trung lập.
- Một chức quan béo bở.
- Đồng liêu mời dự tiệc.

**Tuyến 2, bè đảng:**
- Thiếp mời từ phủ Thượng thư.
- Lời khuyên giữ mình.
- Hai phe cùng mời.
- Phe đòi danh sách môn sinh.
- Quan hệ với phe bị lộ.
- Phe yêu cầu làm chứng.
- Lệnh tự khai bè đảng.
- Phe muốn đẩy lên đứng đầu.
- Bữa tiệc chia phe.
- Môn sinh cầu kiến, kéo theo "Môn sinh phản chủ" về sau.

**Tuyến 3, tham nhũng và đại án:**
- Bạc trắng trong công văn.
- Sổ sách thất lạc.
- Quan trên yêu cầu sửa án.
- Thương nhân cầu cứu.
- **Chuỗi án kho lương:** Kho lương thất thoát, rồi hai ngả:
  - Kẻ rút ruột kho lương: dâng tấu thì có thể được thăng chức; hoặc giữ chứng cứ, hoặc đốt.
  - Quan trên bảo che giấu: nhận phần chia thì sau một đến ba năm có thể thành vật thế thân.
- Đồng liêu bị tố tham ô.
- Nhận hối lộ thay cấp trên.
- Mật thư trong thư phòng: dâng lên có thể làm cả một phe thất thế.
- Sổ thuế bị sửa.

**Bè đảng trong họ:**
- Lời đồn bè đảng: họ có từ 4 người làm quan. Lựa chọn:
  - cho một người từ quan;
  - lập gia quy hạn số người làm quan;
  - mặc kệ.
- Bị hặc tội kết bè: khi mặc kệ lời đồn, hoặc có từ 6 người làm quan. Mọi người làm quan trong họ bị tra cùng lúc. Lựa chọn:
  - cả họ dâng sớ;
  - cho hai người từ quan;
  - nhờ phe che chở.

**Thang hậu quả:** bị giám sát, bị đàn hặc, công đường xét án, quyền thần thất thế, mây đen trên đầu cả họ, chiếu chỉ tru di, trở lại kinh thành.

**Đặc biệt:**
- Mật chỉ không rõ nguồn gốc: thi hành mật chỉ giả thì thành tội mưu phản.
- Cựu thần ba triều, kéo theo vụ án cũ trở lại.
- Hôn sự chính trị: phe thông gia đổ thì cả họ bị soi.
- Di sớ trước khi chết.

**Gắn với các bản trước:**
- Lựa chọn nhận bạc, đút lót, kết bè có nhãn phạm gia quy "Nghiêm trị gian tham" và "Không kết bè phái" (6.4.1.3).
- Người làm quan ở xa tự quyết theo tính cách. Người tham thì dễ chọn nhận bạc, người nhát thì dễ chọn đường an toàn.
- Hậu quả lớn hiện hộp "Tin nhà".

## 7. Save cũ

- Mở được.
- Hồ sơ quan và các phe được lập khi cần, lần đầu có người làm quan hoặc mở trang Gia tộc. Người đang làm quan bắt đầu trong sạch, chưa theo phe nào.

## 8. Tệp thay đổi

- Mới: `ev-v6414.js` (50 sự kiện).
- `engine.js`:
  - Hồ sơ quan, 4 phe, nhịp năm của triều đình và nguy cơ bị tra.
  - Bản án theo cấp tội, tru di, sử ký.
  - Các mục mới trong kết quả sự kiện (sai phạm, thánh ân…).
  - Thẻ Triều đình và Sử ký; phe và trạng thái ở trang người.
  - Cấm ứng thí cả họ; lưu đày; chữ phiên bản.
- `index.html`, `admin.html`: nạp tệp mới, dòng phiên bản. `admin.js`: dòng phiên bản.

## 9. Còn lại cần mày biết

- **Tuyến 4 (thanh trừng do vua nghi) và tuyến 6 (tranh đoạt hoàng quyền) tao chuyển sang 6.4.1.6**, bản có trạng thái hoàng đế. Lý do: các sự kiện ấy cần biết vua có đa nghi không, có bệnh không, đã lập thái tử chưa. Tao đã ghi vào `ke-hoach-phat-trien.md`. Khoảng 30 đến 50 sự kiện còn lại của file gợi ý sẽ vào bản đó.
- Mọi con số đều là phỏng đoán. Mày chơi xem nên chỉnh chỗ nào:
  - Ngưỡng bị giám sát (35), bị đàn hặc (50).
  - Phần tịch biên (40% và 60%).
  - Số năm không được bổ dụng (5).
  - Khả năng chạy án thành (45%).
- Lưu đày chỉ là người ấy đi xa 5 đến 12 năm rồi về. Chuỗi "con đường lưu đày" (hậu duệ đi theo hay ở lại) chưa làm.
- Giám sát, đàn hặc chỉ đến với người làm quan văn. Quan võ chưa có hồ sơ quan trường.
- Bản tiếp theo theo kế hoạch: **6.4.1.5**, gồm hảo cảm với các họ khác, gả đi, tình duyên, lập chi họ khi nhậm chức xa.
