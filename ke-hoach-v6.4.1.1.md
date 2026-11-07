# Bách Niên Thế Gia · Kế hoạch v6.4.1.1 và bản thử nghiệm Admin (chưa làm)

Ghi ngày 2026-11-07, dựa trên code nhánh `v6.4.1`. **Chưa viết dòng code nào.** Mày rà xong thì tao mới làm.

Cách đóng gói khi làm: nhánh mới `v6.4.1.1` tách từ `v6.4.1`. Lấy nguyên code có sẵn trên GitHub, chỉ sửa và thêm tệp, không viết lại. Nhánh có hai trang: `index.html` (bản thường) và `admin.html` (bản thử nghiệm có admin). Xong thì nén thành zip gửi mày, rồi đẩy lên GitHub. Lần trước tao mới có quyền đọc repo; muốn đẩy được thì lúc làm tao sẽ xin quyền ghi. Các chức năng sẽ thử trên `admin.html` trước, ổn thì mới tính chuyện đẩy về bản chính.

---

## 0. Bản Admin (đã chốt, giữ theo kế hoạch `ke-hoach-ban-admin.md`)

- Trang riêng `admin.html` nạp toàn bộ game và thêm `admin.js`. Bản thường không đổi.
- Thu nhỏ gia phả có ở **cả hai bản**.
- Máy tự chọn theo kiểu Cao / Vừa / Thấp / Ngẫu nhiên, **không bao giờ chọn lựa chọn không gieo xúc xắc**. Nếu một hộp chỉ toàn lựa chọn không gieo (ví dụ chỉ có "Cho qua") thì máy dùng `previewOpt` chạy thử từng lựa chọn: kiểu Cao lấy cái lợi nhất, Vừa lấy cái ở giữa, Thấp lấy cái thiệt nhất.
- Thứ tự: (1) thu nhỏ gia phả, máy tự chọn, hiện tỉ lệ; (2) bảng chỉnh; (3) tự chơi hẳn, ép kết quả.
- Thêm cho bản thử nghiệm: bảng admin có nút gọi thẳng các chuỗi mới của 6.4.1.1 (danh hiệu đỉnh nghề, ba con đường kết thúc) để thử mà không phải chờ.

---

## 6. Hảo cảm với các gia tộc họ khác (đã chốt 2026-11-07)

Hiện trạng: hàm `houseTick` phát các sự kiện danh gia (mời dự đám, ghé thăm, thư từ, sứ giả, ngỏ ý kết thân…) khi gia tộc chỉ mới từ bậc 2 "Tiểu hộ khá giả" hoặc danh vọng 60. Mỗi nhà đã có độ thân `rel` (-100 đến 100) và tính cách gia chủ `tr`; chưa có gia phong. Họ thường (không phải danh gia) chưa có sự kiện nào với nhà mình. Không có họ nào trùng họ nhà mình.

Đã chốt:
- **Nhà được tính:** mọi họ ở cùng nơi nhà mình sống (kể cả họ thường), cộng các danh gia và bốn thế gia ở gần (trong hai tháng đường, như v6.3.5).
- **Theo chênh lệch địa vị:** nhà mình thấp hơn thì bị chèn ép; ngang hàng thì cạnh tranh, hoặc hợp tác, kết thân; cao hơn thì họ lấy lòng, xin kết thân. Cách cư xử tùy tính cách gia chủ và **gia phong** bên kia. `hg_a_tranhchap` giữ cho mọi bậc.
- **Danh môn vọng tộc (chỉ bậc 6)** không bao giờ chủ động kết thân với mình, chỉ cạnh tranh hoặc tranh chấp. Nhà mình tự vun đắp được, qua đường có sẵn và đường mới; vun đắp tới mức kết thân thì **được kết thông gia**.
- **Gia phong mới** cho mỗi nhà khác (tạm thời, chơi thử rồi thêm bớt): trọng lễ, nhân hậu, hám lợi, ngang ngược, thủ cựu, trọng võ.
- **Các mốc hảo cảm:**

| Mốc | Mở ra |
|---|---|
| Từ 25 (mến) | Qua lại, giúp nhau việc nhỏ |
| Từ 50 (đồng minh) | Hợp tác làm ăn, đỡ nhau trong sự kiện |
| Từ 70 (tri kỷ) | Kết thông gia, dựa nhau lúc nguy |
| Dưới -15 (bất hòa) | Tranh cãi, giành mối làm ăn |
| Dưới -45 (thù oán) | Tranh chấp ruộng nước, phá hoại cơ sở, bôi nhọ danh tiếng |
| Dưới -80 (mới) | Sự kiện cực đoan: thuê người hành hung, vu cáo lên quan |
| -100 | Một sống một còn |

- **Sự kiện tăng hảo cảm** mới; sự kiện ở các mốc có thể thành hoặc hỏng: thành thì có lợi và thân thêm, hỏng thì giảm hảo cảm.
- **Hảo cảm âm:** mỗi hộp luôn có một lựa chọn nhường nhịn chịu thiệt để hòa hoãn. Tỉ lệ thành tính theo: tài ăn nói (EQ) của người ra mặt, chênh lệch địa vị hai nhà, tính cách và gia phong bên kia, hảo cảm hiện tại (càng thấp càng khó), số lần đã nhường (nhường mãi thì họ lấn tới), của lễ đi kèm.
- **Một sống một còn:** nhà mình thắng thì nhà kia suy tàn hoặc dời đi, nhà mình lấy một phần ruộng, mối làm ăn, danh vọng. Nhà mình thua thì **hết game**.
- Là hệ thống riêng, **không trộn** với ân oán Phạm Trung Kiên (mục 8).

---

## 7. Danh hiệu đỉnh nghề

### 7.1 Cách mở
- Điều kiện chung: đã lên **bậc cao nhất** của nghề, thông thạo từ **120**, đạt chỉ số yêu cầu, danh vọng cá nhân cao (tao đề xuất từ 300), tuổi từ 35.
- Đủ điều kiện thì mở **chuỗi cơ duyên** 2 đến 3 sự kiện (khảo nghiệm). Thành thì được phong danh hiệu; trượt thì 5 năm sau mới có cơ hội lại.
- Mỗi danh hiệu trong gia tộc chỉ có **một người giữ cùng lúc**.

| Danh hiệu | Nghề dẫn tới | Chỉ số cần |
|---|---|---|
| **Thần Y** | Y (bậc Danh y) hoặc Ngự y (bậc Thái y lệnh), hoặc chủ Y viện | Trí tuệ 200 |
| **Võ Thần** | Hiệp khách (bậc Võ lâm minh chủ) hoặc chủ Đại môn phái (võ quán bậc cao nhất) | Võ lực 200, Trí tuệ từ 100 |
| **Thánh Nhân** | Dạy học (bậc Tiên sinh) hoặc chủ Đại thư viện (trường tư bậc cao nhất) | Trí tuệ 200 |
| **Giám Chính** | Thầy địa lý đã vào Khâm thiên giám | Cần mày chốt (tao đề xuất Trí tuệ 150) |

Muốn có chỉ số 200 thì phải mở trần 200 trước (`c.g200`). Hiện đường mở trần 200 rất khó và rất hiếm, nên ba danh hiệu đầu sẽ cực hiếm. Đúng ý mày, nhưng cần biết trước.

### 7.2 Tác dụng khi người giữ danh hiệu còn sống

**Thần Y**
- Người trong nhà ít mắc bệnh hơn khoảng 40%, khi có dịch ít chết hơn.
- Sức khỏe hồi nhanh hơn khoảng 50%.
- Tuổi thọ dài hơn: nguy cơ chết già giảm khoảng 25%.

**Võ Thần**
- Con cháu có mức sức khỏe tối đa cao hơn.
- Luyện võ nhanh hơn khoảng 50%.
- Quân ngũ trong nhà ít tử trận hơn.
- Võ quán của nhà bị đá quán thì luôn thắng.

**Thánh Nhân**
- Con cháu học nhanh hơn khoảng 50%, thi văn dễ đỗ hơn.
- Có môn sinh khắp nơi: dân tâm và danh vọng gia tộc tăng dần đều.

**Danh vọng khi được phong:** cá nhân cộng lớn (tao đề xuất +300), gia tộc cộng lớn (+150), cả vùng biết tiếng.

### 7.3 Đặc tính "cái thế" sau khi người giữ danh hiệu qua đời
- Có ba đặc tính mới: **Thần y cái thế**, **Võ thần cái thế**, **Thánh nhân cái thế**.
- Chỉ xuất hiện **sau khi** người giữ danh hiệu đã mất, trong gia tộc chưa có ai đang mang đặc tính đó.
- Trẻ sinh ra trong họ có tỉ lệ nhỏ mang đặc tính (tao đề xuất 3%, ưu tiên con cháu trực hệ). Mỗi lúc chỉ một người mang.
- Đặc tính cho tiềm năng chỉ số chính cao, học nghề tương ứng gấp đôi, dễ mở trần 200. Tức là có đường để danh hiệu quay lại gia tộc.

### 7.4 Giám Chính (khác biệt)
Khâm thiên giám giám chính đã là một ghế quan trong hệ ghế v6.4 (chỉ 1 ghế). Làm thành chức tối cao của nghề địa lý:
- Thầy địa lý đạt bậc cao nhất và đã vào Khâm thiên giám thì được xét ghế Giám chính khi ghế trống.
- **Tác dụng:**
  - Chọn ngày lành: cưới hỏi, khai trương, đi thi được cộng tỉ lệ.
  - Báo trước thiên tai và dịch bệnh một mùa, nên thiệt hại giảm.
  - Đọc được **thiên mệnh của triều đình**: thấy rõ trạng thái hoàng đế ở mục 10, thay vì chỉ nghe đồn.
  - Ở các con đường kết thúc (mục 9): tâu hoặc tung "dị tượng" để tạo danh nghĩa.

### 7.5 Gợi ý cho các nghề khác (chưa làm, mày chọn)

| Danh hiệu | Nghề | Tác dụng |
|---|---|---|
| **Thương Thánh** | Tiểu nhị lên Đại chưởng quỹ, chủ Thương hội | Mọi cơ sở của nhà lãi thêm, đi buôn ít rủi ro; là "tài lực" cho con đường kết thúc |
| **Thần Tượng** (Thiên hạ đệ nhất tượng) | Thợ thủ công lên Danh tượng | Xưởng lãi cao, được triều đình đặt đúc binh khí; giúp con đường võ quan |
| **Cầm Thánh** | Nghệ nhân lên Đệ nhất danh cầm | Con cháu mị lực cao, được vào cung, danh vọng |
| **Thần Nông** | Nông lên Điền chủ | Ruộng ít mất mùa, được mùa nhiều; là lương thảo cho khởi nghĩa |
| **Thiên hạ đệ nhất tiêu** | Tiêu sư lên Tổng tiêu đầu | Tiêu cục và chuyến buôn gần như không bị cướp |

---

## 8. Ân oán Phạm Trung Kiên: các cái kết hiện có, và vì sao dễ

### 8.1 Cái kết hiện có trong code
**Thắng**, qua sự kiện "Thời cơ đã chín", theo một trong bốn đường:
1. Kiện lên công đường (thủ tục, nhờ họ Vũ, chặn kiệu tuần án).
2. Dùng võ lực bắt giữ (phục kích, nhờ quân Nguyễn hoặc Kiều, đột kích trang viện).
3. Bóp nghẹt tài lực (mua gom nợ, cắt tuyến hàng, nhờ họ Dương).
4. Dân chúng đồng thanh (quỳ trước phủ, vạn dân thư, vạch tội ngày hội).

Sau đó chọn **số phận của Kiên**: giao công đường xử; tịch biên trả lại cho dân; hoặc đày ra biên ải.

Rồi chọn **số phận của Duy**:
- Nếu Duy chưa trốn sang Lang bộ: giao họ Nguyễn xử theo gia pháp; giao công đường xử lưu đày; hoặc tha. Tha thì một nửa số lần Duy hoàn lương làm thầy đồ, nửa còn lại thì không.
- Nếu Duy đã trốn sang Lang bộ: nhờ đô đốc Nguyễn đòi người; mặc kệ; hoặc viết thư cuối.

**Lặng đi** (`vil_e_fade`): sau 40 năm, hoặc khi Kiên chết già, ân oán tự khép lại. Đây cũng là kết cục khi chọn nhẫn nhịn mãi.

### 8.2 Không có cái kết thất bại
Trả lời thẳng: **hiện không có cái kết thua nào.**
- Mỗi lần ra tay thất bại chỉ mất tiền, sức khỏe, danh vọng, chứng cứ, rồi 18 tháng sau được thử lại.
- Tệ nhất là để 40 năm trôi qua cho "lặng đi".

### 8.3 Vì sao đường quan trường dễ
- Ân oán chỉ bắt đầu khi nhà có người làm quan từ ngũ phẩm (sửa ở v6.3.5).
- Đường kiện cần "chỗ dựa trên công đường" là người nhà làm quan từ **thất phẩm**.
- Như vậy mọi nhà gặp ân oán đều **đã có sẵn** điều kiện này ngay từ đầu.

### 8.4 Đề xuất (mày chọn có làm trong bản này không)
- **Đường kiện:** đòi người nhà có phẩm **cao hơn** chức hiện tại của Kiên. Kiên càng leo cao (tri huyện, tri phủ, tổng trấn) thì càng khó.
- **Thêm cái kết thua:**
  - Thua kiện ba lần liền thì bị Kiên phản tố vu cáo: người làm quan trong nhà bị cách chức, gia tộc mất danh vọng.
  - Đột kích hoặc phục kích thảm bại thì bị khép tội mưu sát mệnh quan: người cầm đầu bị xử, gia tộc bị tịch một phần gia sản.
  - Kiên lên tổng trấn mà nhà mình vẫn chưa làm gì được thì hắn ép nhà mình bỏ xứ. Gia tộc bị buộc dời đi nơi khác, mất ruộng và cơ sở ở nơi cũ.
  - Đường tiền bạc thua đậm thì mất phần lớn vốn, cơ sở bị hắn thôn tính.
- Thắng mà quá nhiều lần thất bại trước đó thì phần thưởng nhỏ đi.

---

## 9. Kết thúc game: ba con đường lên ngôi (sơ khai)

Cả ba đều dài, tốn kém, nhiều điều kiện. Thành thì gia tộc lên ngôi: hiện **màn hình kết thúc** (tổng kết bao nhiêu năm, bao nhiêu đời, ai khai quốc), kèm lựa chọn **chơi tiếp làm hoàng tộc** (game đã có sẵn `S.royal`). Thua thì phần lớn là tru di (hết game). Có vài đường thoát nhỏ: một chi họ ở xa trốn được, chơi tiếp từ chi đó.

Code đã có chuỗi "mưu phản" nhỏ (`md_a/b/c` trong ev-quan.js, chỉ ba bước, bốc ngẫu nhiên). Đề xuất: **tắt chuỗi cũ**, thay bằng ba con đường dưới đây.

Mỗi con đường có 4 thước đo hiện ở trang Gia tộc (chỉ hiện khi đã bước vào con đường đó):
- **Thế lực:** bè cánh, binh lực hoặc nghĩa quân, tùy đường.
- **Danh nghĩa:** lý do chính đáng.
- **Tài lực:** tiền, lương thảo.
- **Lộ:** triều đình nghi ngờ đến đâu. Lộ đầy là bị phát giác.

### 9.1 Quyền thần lật đổ (văn quan)
- **Điều kiện mở:**
  - Người nhà giữ ghế **nhất phẩm** từ 3 năm.
  - Hoàng đế ở mục 10 **yếu kém**: tài thấp, hôn quân, hoặc ấu chúa.
  - Trí tuệ và cơ mưu cao, tham vọng cao.
- **Diễn tiến:**
  - Dã tâm nảy sinh.
  - Kết bè kéo cánh trong triều: mua chuộc, gả con, nắm các ghế bộ.
  - Cài nội ứng trong cung, nắm cấm quân.
  - Tạo danh nghĩa (Giám chính trong nhà thì dễ hơn).
- **Kết thúc**, chọn một trong hai:
  - Ép vua thiền nhượng: êm, cần danh nghĩa cao.
  - Chính biến cung đình: nhanh, cần thế lực cao.
- **Thua:** tru di, hoặc vua tha chết, cả nhà bị cách chức và lưu đày.

### 9.2 Võ quan tạo phản
- **Điều kiện mở:**
  - Người nhà lên **Đại tướng quân** hoặc ghế võ cao nhất của v6.4, nắm binh quyền.
  - Hoàng đế bạc đãi võ tướng hoặc nghi kỵ, hoặc triều đình rối loạn.
- **Diễn tiến:**
  - Nuôi tư binh: tốn tiền và ruộng mỗi năm.
  - Thu phục các tướng dưới quyền.
  - Gom lòng quân, tích lương thảo.
  - Chờ thời: chiến tranh biên giới, vua bạo, triều loạn.
- **Kết thúc:** khởi binh, rồi một chuỗi 3 đến 5 trận đánh thẳng về kinh. Mỗi trận gieo xúc xắc theo binh lực so với quân triều.
- **Thua:** tử trận, tru di, hoặc chạy ra biên ải.

### 9.3 Võ Thần khởi nghĩa
- **Điều kiện mở:**
  - Người nhà là **Võ Thần** (mục 7).
  - Danh vọng rất cao.
  - **Dân tâm thiên hạ thấp**: vua hại dân, thuế nặng, đói kém.
  - Từng bị luật pháp chèn ép (có cờ từ ân oán hoặc từ sự kiện quan lại).
- **Diễn tiến:**
  - Hào kiệt giang hồ quy tụ (người nhà làm hiệp khách giúp nhiều).
  - Chiêu mộ dân, phát lương cứu đói.
  - Chiếm huyện, chiếm phủ, rồi tiến về kinh thành.
- **Kết thúc:** đánh vào kinh, lên ngôi.
- **Thua:** nghĩa quân tan, Võ Thần tử trận hoặc bị bắt, gia tộc bị truy nã.

### 9.4 Quy mô bản sơ khai
- Mỗi đường khoảng **8 đến 12 sự kiện**, cộng 3 sự kiện kết thúc (thắng, thua, thoát).
- Số liệu tiền và tỉ lệ để ở mức khó, chơi thử trên bản admin rồi chỉnh.

---

## 10. Trạng thái Hoàng Đế (tiền đề cho mục 9)

Hiện `S.dyn` chỉ có tên vua, niên hiệu, ngày lên ngôi, độ dài trị vì. Thêm cho mỗi đời vua:

| Trường | Ý nghĩa |
|---|---|
| Tuổi, sức khỏe | Vua già yếu thì dễ băng hà, dễ tranh ngôi |
| **Tài** (0–100) | Giỏi trị nước hay không |
| **Đức** (0–100) | Nhân từ hay bạo ngược |
| **Uy** (0–100) | Triều đình có nghe lệnh không |
| Loại vua | Minh quân, thủ thành, hôn quân, bạo quân, ấu chúa (có nhiếp chính) |

Thêm cho cả nước:

| Trường | Ý nghĩa |
|---|---|
| **Dân tâm thiên hạ** (0–100) | Lòng dân với triều đình |
| **Quốc khố** | Triều đình giàu hay túng |
| **Loạn** (0–100) | Mức bất ổn, giặc giã |

- **Sinh ra:** vua mới được bốc ngẫu nhiên. Thái tử nhỏ tuổi thì thành ấu chúa.
- **Trôi theo năm:** thiên tai, chiến tranh, tham quan, vua tốt hay xấu đều làm các chỉ số trên thay đổi dần.
- **Ảnh hưởng nhẹ tới game:**
  - Hôn quân thì thuế nặng hơn, quan tham nhiều hơn, dễ loạn.
  - Minh quân thì thăng quan công bằng hơn.
- **Hiển thị:** trang Thời thế mô tả bằng chữ, không bằng số, ví dụ "Hoàng đế ham mê tửu sắc, triều chính rối ren, dân oán khắp nơi". Có Giám chính hoặc quan nhất phẩm trong nhà thì thấy rõ hơn. Bản admin thì thấy số.
- **Thêm sự kiện thời thế theo loại vua:** tuyển tú, xây cung, sưu cao thuế nặng, đại xá, khoa thi ân điển.

---

## 11. Tình duyên: chỉ người tài, đức, từ 18 đến 25 tuổi

Hiện trạng: các sự kiện tình duyên (`Gặp gỡ ngày hội`, `Lá thư không ký tên`, `Thanh mai trúc mã`, `Tình địch`, `Cành vàng lá ngọc`, chuỗi `Thương Tâm Từ`, chuỗi `Lạc Nhạn`, cốt truyện `Thư tình không ký tên`) mở cho tuổi từ 15–17 đến 30–40, ai độc thân cũng gặp.

Làm: thêm bộ lọc chung cho **sự kiện mở đầu** của các chuỗi tình duyên:
- Tuổi **18 đến 25**.
- **Tài giỏi:** có ít nhất một chỉ số chính từ 70, hoặc danh vọng cá nhân từ 100, hoặc đã đỗ đạt.
- **Đức hạnh:** trung bình bốn trục tính cách hiếu thuận, thật thà, rộng lượng, tiết chế từ 60.
- Bước sau của chuỗi đã mở thì vẫn chạy tiếp dù người đó quá 25 tuổi.
- Người đủ điều kiện gặp chuyện tình duyên dày hơn một chút, bù cho việc ít người đủ điều kiện.

**Không áp dụng** cho: hôn nhân thường (mai mối, hỏi cưới), chuyện vợ chồng (người thứ ba, mẹ chồng nàng dâu), và `Gá nghĩa lần hai` (người góa tái hôn, 24–55 tuổi). Mày xem có đúng ý không.

---

## 12. Kinh doanh và sản nghiệp

### 12.1 Lỗi bổ nhiệm người trông cơ sở
Hiện danh sách "Giao cho người trông" chỉ lọc: từ 16 tuổi, không đi xa, không làm quan, chưa trông cơ sở nào. Nên người **đã nghỉ hưu**, người ở **chi họ**, người không có tài gì vẫn được chọn.

Sửa: chỉ người
- từ **18 tuổi**, đang ở **nhà chính** (mục 16), không đi xa;
- **không** nghỉ hưu, không làm quan, không ở quân ngũ, chưa trông cơ sở khác;
- **có tài về đúng loại cơ sở đó**: thông thạo nghề tương ứng từ 50 và quản trị từ 50.

Nghề tương ứng lấy theo bảng có sẵn (`BIZJOB`): quán trà và hiệu buôn là tiểu nhị, xưởng là thợ, y quán là y, trường là dạy học, võ quán và tiêu cục là tiêu sư, gánh hát là nghệ nhân, thuyền là ngư phủ, trại là chăn nuôi. Võ quán còn nhận người võ lực từ 90.

Danh sách chọn hiện kèm **thông thạo** và **quản trị** của từng người. Người không đủ thì hiện mờ, ghi thiếu gì.

### 12.2 Giữ thông thạo khi làm chủ
- Hiện khi mở cơ sở: nghề đổi sang "Chủ cơ sở", thông thạo bị cắt còn 70% và từ đó tính như nghề khác.
- Sửa: thông thạo nghề gốc **giữ nguyên**, vẫn tăng chậm khi làm chủ.
- Hiệu quả của chủ tính bằng **cả thông thạo nghề gốc lẫn quản trị**.
- Thôi làm chủ quay về nghề cũ thì thông thạo vẫn còn.

### 12.3 Điều kiện mở cơ sở
Bỏ điều kiện cũ (đang làm nghề X ở bậc Y). Thay bằng: **từ 18 tuổi, thông thạo nghề tương ứng từ 50, quản trị từ 50**. Áp dụng cả cho việc người nhà tự đòi ra riêng mở cơ sở.

### 12.4 Lãi quá thấp
Tao tính sơ ở mức lý tưởng (đủ người giỏi, rơi vào mức trần doanh thu): bậc cao nhất lãi khoảng **20 đến 160 bạc mỗi tháng**. Trại chăn nuôi khoảng 19 bạc, Đại tửu lâu khoảng 58, Thương hội và Thương thuyền khoảng 150. Thực tế thấp hơn, đúng như mày thấy khoảng 100 bạc.

Nguyên nhân:
- Doanh thu bị chặn ở 1,3 lần mức chuẩn.
- Nguyên liệu ăn 25–32% doanh thu ở mọi bậc.
- Lương 8 đến 13 người cộng tiền thuê.

Đề xuất:
- Bậc càng cao thì **doanh thu chuẩn càng nhân lên** (bậc 3 khoảng x2, bậc 4 khoảng x3).
- **Tỉ lệ nguyên liệu giảm theo bậc** (bậc cao nhất còn khoảng 60% tỉ lệ cũ), vì làm lớn thì mua sỉ rẻ.
- **Trần doanh thu** nâng từ 1,3 lên 1,6 khi chủ giỏi (thông thạo và quản trị cao).
- **Danh tiếng cơ sở:** mở càng lâu càng đông khách, cộng tối đa khoảng 30% sau 10 năm.
- Mục tiêu tao đề xuất: bậc cao nhất, đủ người giỏi, chủ giỏi thì lãi khoảng **400 đến 800 bạc mỗi tháng**; trại chăn nuôi và quán trà thấp hơn. **Mày chốt con số mục tiêu.**

### 12.5 Quá nhiều hộp thoại về người làm
Hiện mỗi người làm, mỗi khi thông thạo chạm 30, 60, 90, hiện một hộp xin tăng lương; ốm, nghỉ hưu, bỏ việc, qua đời cũng mỗi người một hộp. Sửa:
- **Chính sách lương** đặt trên trang cơ sở:
  - "Tự tăng theo thông thạo": không hỏi, tự trả theo mặt bằng.
  - "Giữ lương": tiết kiệm, người làm dễ bỏ đi.
  - "Hỏi tôi".
  - Mặc định là tự tăng.
- Nếu chọn "Hỏi tôi": gộp thành **một hộp cuối năm cho mỗi cơ sở** ("Sổ lương cuối năm: 4 người xin tăng"), chọn chung một lần hoặc từng người.
- Ốm, nghỉ hưu, bỏ việc, qua đời của **người làm thường** chỉ ghi vào nhật ký. Chỉ **quản lý, thợ cả, thầy giáo, võ sư** mới hiện hộp.
- Từ bậc 3, cơ sở có nút **"Tự tuyển bù"**: có người nghỉ thì người quản lý tự thuê người thay.

---

## 13. Lỗi truyền nghề đẩy sang chi phụ

Chỗ tao nghi là nguyên nhân: lựa chọn **"Truyền việc cho con cháu"** khi nghỉ hưu (`retirePopup`).
- Nó lấy **người đầu tiên** từ 16 tuổi đang không có nghề trong cả họ, **kể cả chi phụ**. Người chơi không được chọn ai.
- Nên nghề của người ở nhà chính có thể rơi sang một người ở chi họ.
- Nếu người nghỉ là **chủ cơ sở** thì cơ sở bị bỏ trống mà người nối nghiệp lại thành "chủ" không có cơ sở nào.

Sửa:
- Hiện danh sách để chọn, **chỉ người ở nhà chính**, ưu tiên con cháu trực hệ, kèm thông thạo đã có.
- Chủ cơ sở truyền việc thì **chuyển luôn quyền trông cơ sở** (người nhận vẫn phải đủ điều kiện ở mục 12.1).
- Cửa sổ "Truyền nghề" (viết sách, dạy trực tiếp) đã chỉ lấy nhà chính từ 6.4.1.

Nếu lỗi mày gặp là **chính người nghỉ hưu bị chuyển sang ở chi phụ** (không phải nghề bị truyền sang chi phụ) thì nói tao. Tao chưa thấy chỗ nào trong code làm vậy, cần mày tả lại tình huống.

---

## 14. Gả đi bị bắt nạt, bị trả về

Hiện trạng:
- Mỗi người đã gả đi, mỗi tháng có 0,5% ra một trong bốn sự kiện, **bốc đều**: về thăm, bị hắt hủi, thông gia nhờ vả, bị trả về.
- Tức là **một nửa** là chuyện xấu, không xét gì đến người con hay gia thế. Hai mươi năm gần như ai cũng dính.

Sửa: tính **thế đứng** của người gả đi ở nhà chồng, từ:
- tài (chỉ số chính, mị lực, EQ), đức (các trục tính cách);
- có con trai chưa;
- **địa vị nhà mình so với nhà chồng** (đã lưu sẵn bậc nhà chồng lúc cưới);
- nhà mình có người làm quan;
- quan hệ hai nhà (cờ hòa thuận hoặc phật ý có sẵn).

Theo thế đứng:
- **Thế đứng cao** (giỏi, hoặc nhà mình hơn nhà chồng): gần như không bị hắt hủi, **không bao giờ bị trả về**. Thay vào đó có tin vui: được làm chủ mẫu nhà chồng, cháu ngoại đỗ đạt, thông gia giúp đỡ việc làm ăn (thêm 3 đến 4 sự kiện mới).
- **Thế đứng thấp** (yếu kém và nhà mình lép vế): vẫn có thể bị hắt hủi.
- **Bị trả về chỉ khi có cớ:** quá 5 năm không có con, nhà mình sa sút so với lúc gả, hai nhà đã phật ý, hoặc bị hắt hủi trước đó mà nhà mình nhẫn nhịn. Mỗi người tối đa một lần.

Tần suất chung giảm còn một nửa, và chủ yếu trong 10 năm đầu sau khi cưới.

---

## 15. Làm quan nơi khác: gia đình đi theo thành chi họ

Hiện khi nhậm chức xa có ba lựa chọn: đi một mình, dắt vợ/chồng, dắt cả nhà. Người đi theo vẫn tính là người nhà chính đang "đi xa".

Thêm lựa chọn thứ tư: **"Cả nhà dọn đến, lập chi họ ở nơi nhậm chức"**.
- Lập một chi mới (`newBranch`), ghi **nơi ở riêng** của chi (thêm trường tỉnh vào `S.hh`).
- Lương quan vào quỹ của chi. Chi tự lo ăn tiêu, gia tộc không phải nuôi.
- Mỗi năm chi có thể gửi một phần về công quỹ (tùy lòng hiếu thuận và mức giàu).
- Gia tộc chính dời nơi ở thì chi này **không đi theo**.
- Hết nhiệm kỳ, hỏi:
  - về nhập lại nhà chính;
  - hoặc ở lại nơi đó thành chi định cư (cùng vùng thì dùng được danh gia nơi đó cho chi).

**Gia chủ không được chọn lựa chọn này**: gia chủ phải ở nhà chính. Nếu gia chủ làm quan xa thì chỉ có ba lựa chọn cũ.

---

## 16. Bổ nhiệm trong gia tộc: chỉ người ở nhà chính

- Các **chức trong tộc** (bảng chức của gia tộc) đã chỉ cho người ở nhà chính, đã đúng.
- Những chỗ còn lọt người chi họ là:
  - người trông cơ sở (mục 12.1);
  - truyền việc khi nghỉ hưu (mục 13).
- Tao sẽ rà thêm các chỗ chọn người khác (người ra mặt, người đi dự đám, người nhận chiếu chỉ) để thống nhất: **bổ nhiệm thì chỉ người nhà chính đang ở nhà**.

Nếu mày gặp ở một màn hình khác thì chỉ tao.

---

## Đã chốt (2026-11-07)

1. **Mục 6:** đã chốt, xem mục 6.
2. **Mục 7, danh hiệu đỉnh nghề.** Giám Chính cần **Trí tuệ 200**.
   - **Cấp Thần** (có tác dụng lên gia tộc, **mất ngay khi người giữ qua đời**): Thần Y, Võ Thần, Thánh Nhân, Thương Thánh, Cầm Thánh, Thiên hạ đệ nhất tiêu, cùng Thần Nông và Thần Tượng nếu làm. Có tăng tốc phát triển gia tộc nhưng **ít**; phần lớn tác dụng là giảm thiệt hại. Số liệu ở 7.2 phải hạ xuống (ví dụ Thần Y: ít bệnh hơn khoảng 20% thay vì 40%).
   - Giám Chính là chức quan, giữ phần thông tin ở 7.4.
   - **Danh hiệu chỉ số thêm ở v6.3.2 đến v6.4** (Bác học, Đại nho, Cao thủ, Tông sư, Thấu tình đạt lý…, bảng `CTFX` trong `data.js`): **bỏ hết tác dụng lên gia tộc, chỉ giữ cho chính người mang**. Hai tác dụng lan ra gia tộc tìm thấy trong code:
     - `teach` của danh hiệu Trí tuệ: "con cháu trong nhà học nhanh thêm" 6% đến 40%, **cộng dồn** theo mọi người mang trong nhà (trần +50%), áp cho mọi đứa trẻ đi học (`engine.js`, chỗ tính `teach` khi trẻ 6 đến 17 tuổi đi học).
     - `on` của danh hiệu EQ: "gia tộc hòa thuận thêm" 0,6 đến 4,2, **cộng dồn** theo mọi người mang vào độ ổn định gia tộc.
     - Các tác dụng khác (điểm thi, thông thạo, thu nhập nghề, hồi sức, ít nhiễm dịch, già chậm, tâm trạng, cơ duyên, mai mối, danh vọng bản thân) là của riêng người mang, giữ nguyên.
3. **Mục 8, ân oán Phạm Trung Kiên.** Làm khó đường kiện như 8.4.
   - **Thua phải thảm**, đẩy gia tộc đến bước đường cùng. Nhẹ nhất: cả tộc bị cách chức, mất hết danh tiếng, **100 năm không được làm quan**. Nặng hơn: gia chủ mất mạng, tịch thu tài sản và ruộng đất, mất chức tước. Nặng nhất: **diệt tộc** (hết game). Vực dậy được hay không tùy người chơi.
   - **Báo thù:** thua mà gia tộc vực dậy tới một mức thì mở cốt truyện báo thù, trả thù hai phản diện nếu còn sống, hoặc trả thù lên gia tộc chúng nếu chúng đã chết.
   - **Thắng:** cân lại phần thưởng theo mức nguy hiểm của hai phản diện. Không diệt tận gốc thì chúng có thể quay lại trả thù bằng đường cực đoan.
4. **Mục 9:** lên ngôi thì **kết thúc game**, kèm màn hậu sử: đầu vào là con đường lên ngôi, tình hình cả nước, tài đức người khai quốc, con cháu kế vị, gia phong; đầu ra là số năm và số đời vua, biên niên, lời sử gia, đánh giá đời sau, bảng tổng kết ván. Có ngẫu nhiên nhưng bám đầu vào. Làm như vậy trước, chỉnh sau.
5. **Mục 12.4, lãi cơ sở: phương án A.** Bậc cao nhất, chủ giỏi lãi khoảng **150 đến 250 bạc mỗi tháng** (bằng 3 đến 5 lần bổng Nhất phẩm 52 bạc). Chỉ sửa tỉ lệ nguyên liệu và trần doanh thu cho đều, **đồng thời hạ bổng tước**. Bỏ mục tiêu 400 đến 800 bạc cũ.
6. **Mục 13:** sửa cả hai lỗi.
   - **Tàng thư:** sách do người nghỉ hưu viết ra ở đâu thì để ở đó (nhà chính hoặc chi họ). Trong code, `S.books` là danh sách chung của cả họ và `bookLv` cộng sách cho mọi người. Sửa: mỗi sách ghi hộ của người viết, chỉ người cùng hộ được hưởng, trang gia tộc hiện tàng thư theo từng hộ, save cũ xếp sách về hộ hiện tại của người viết. Đề xuất: chi nhập lại nhà chính thì sách theo về.
   - **Truyền việc khi nghỉ hưu:** `retirePopup` lấy người đầu tiên trong `home()`, mà `home()` gồm cả người ở chi họ. Sửa như mục 13.
7. Mục 1 đến 5 là về trang admin, đã hiểu, không cần file `ke-hoach-ban-admin.md`.
8. Không làm hết một lần. Chia thành các bản nhỏ **v6.4.1.1, v6.4.1.2, …**, mỗi bản một đợt (thứ tự đề xuất ở dưới).
9. Tạm thời **mày tự test**. Tao chỉ kiểm cú pháp và chắc game mở được.
10. GitHub: mày thêm tao làm **collaborator**. Sau đợt đầu tao hướng dẫn mày đẩy lên bằng PowerShell trên máy.

Bản chính thức đang chạy trên Vercel ở v6.4.1.

## Góp ý của người chơi thử (bạn mày, 2026-11-07)

- Khoảng 40 đến 60 năm là cả gia tộc làm quan: làm quan quá dễ.
- Đầu game nhiều việc, mới mẻ; về sau sự kiện lặp nhiều, chán.
- Lên bậc cao vẫn dễ.
- Phong tước dễ, và phong tước xong thì dù đang khốn đốn cũng một bước lên mây.

Nguyên nhân tìm thấy trong code và hướng sửa đề xuất (chờ mày duyệt):
- **Khoa cử:** thi Hương, thi Hội chỉ cần trung bình 55 và 65, thi mỗi năm, thi lại không giới hạn. Đề xuất: thi Hương ba năm một lần, đỗ theo chỉ tiêu xếp hạng với thí sinh cả tỉnh, đỗ xong chờ ghế trống, một họ quá nhiều quan thì triều đình nghi bè đảng.
- **Tước:** 20 chỗ phong tước, nhiều chỗ chỉ một sự kiện. Phong là nâng nhà ngay, ban 30 đến 400 mẫu, bổng 20 đến 250 bạc mỗi tháng cho từng người có tước. Lỗi: con kế tập hạ một bậc nhưng ruộng ban không bị thu lại, phong lại thì cộng thêm, nên ruộng dồn qua các đời. Đề xuất: hạ bổng mạnh, ruộng giảm theo bậc khi kế tập, không nâng nhà miễn phí, phải tích công trạng mới được phong, tước kèm nghĩa vụ và rủi ro.
- **Sự kiện lặp:** 1.048 sự kiện cho ván hơn 100 năm, nhà đông có năm tới 365 hộp. Đề xuất: giới hạn số hộp mỗi năm, việc vặt chỉ ghi nhật ký, thêm biến thể theo thời thế và hảo cảm, có mục tiêu cuối game.
- **Bậc gia tộc:** bậc 5, 6 cần thêm điều kiện ngoài của cải; sa sút thì hạ bậc. Chưa đọc kỹ code.

## Thứ tự các bản (đã chốt 2026-11-07)

| Bản | Nội dung |
|---|---|
| 6.4.1.1 | Trang admin (mục 0), cùng các lỗi nhỏ: tàng thư, truyền việc khi nghỉ hưu, người trông cơ sở, bổ nhiệm chỉ người nhà chính (12.1, 13, 16) |
| 6.4.1.2 | Cân bằng độ khó theo góp ý người chơi thử: khoa cử, tước (kèm lỗi ruộng tước dồn qua các đời), bậc gia tộc, nhãn danh vọng cá nhân, kinh doanh (12.2 đến 12.5, phương án A), bớt hộp thoại và giới hạn số hộp mỗi năm, bỏ tác dụng gia tộc của danh hiệu chỉ số |
| 6.4.1.3 | Hảo cảm với gia tộc họ khác (6), gả đi (14), tình duyên (11), lập chi họ khi nhậm chức xa (15) |
| 6.4.1.4 | Trạng thái hoàng đế (10), danh hiệu đỉnh nghề (7), thêm sự kiện thời thế theo loại vua (giảm lặp) |
| 6.4.1.5 | Ân oán (8): đường kiện khó, các cái kết thua, báo thù, cân thưởng khi thắng |
| 6.4.1.6 | Ba đường lên ngôi và màn hậu sử (9) |

## Chốt thêm (2026-11-07)

**Ân oán, cái kết thua** (theo đề xuất của tao, mày duyệt):

| Thua kiểu gì | Hậu quả |
|---|---|
| Thua kiện ba lần liền, bị phản tố vu cáo | Cả tộc bị cách chức, mất hết danh tiếng, 100 năm không được làm quan |
| Đường tiền bạc thua đậm | Bị tịch thu tài sản và ruộng đất |
| Võ lực thảm bại | Gia chủ mất mạng, mất chức tước |
| Đường dân tâm thất bại | Gia chủ bị bắt vì tụ tập, gia tộc mất hết danh tiếng |
| Bị bắt tội mưu sát mệnh quan khi Kiên đã lên tổng trấn | Diệt tộc, hết game |
| Kiên lên tổng trấn mà nhà mình chưa làm gì được | Bị ép bỏ xứ, mất ruộng và cơ sở ở nơi cũ |

**Mở chuyện báo thù:** gia tộc lên lại được bậc mình đứng trước khi thua, **và** danh vọng gia tộc đạt **1.000**.

**Nhãn danh vọng cá nhân** (`FAME_SELF` trong `engine.js`) đang quá thấp, dễ đạt: Có tiếng tăm 20, Được tin dùng 50, Danh nhân 100, Bậc quốc sĩ 200. Phải nâng lên (làm ở 6.4.1.2; tao đưa con số để mày duyệt lúc làm bản đó). Các chỗ khác dùng mốc danh vọng cá nhân (ví dụ tật xấu: người danh vọng từ 100 chỉ trưởng bối hoặc gia chủ được khuyên can) phải chỉnh theo.

**Hậu sử:** người chơi được đặt **quốc hiệu** và **niên hiệu đầu tiên** khi lên ngôi.
