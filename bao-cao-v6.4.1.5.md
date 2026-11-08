# Báo cáo v6.4.1.5 (09/11/2026)

Bản thứ năm trong chuỗi 6.4.1.x, làm trên nền v6.4.1.4. Nội dung theo `Kết quả test thử bản 6.4.1.4 và gợi ý bản 6.4.1.5.docx` và các điểm mày đã chốt (`ke-hoach-phat-trien.md`, mục 6).
- Nhánh `v6.4.1.5`, tách từ `v6.4.1.4`. Gói zip có thư mục gốc `BachNienTheGia-v6.4.1.5/`.
- Thêm 36 sự kiện, ở tệp mới `ev-v6415.js`:
  - 24 về quan hệ giữa các họ;
  - 7 về hôn nhân;
  - 5 về con gái đã gả đi.
- Tổng số sự kiện từ khoảng 1.063 lên khoảng 1.099. Không thêm kỳ ngộ.
- Save cũ vẫn mở được (mục 7).

**Về kiểm thử.** Mày tự test, nên tao chỉ làm mấy việc sau:
- `node --check` toàn bộ tệp: đạt.
- Cho máy tự chơi trang admin 40 năm: không có lỗi script, kiểm tra bất biến sạch.
- Gọi ép mỗi sự kiện mới hai lượt, cho máy bấm ngẫu nhiên.
- Thử riêng:
  - tước theo tổng công;
  - gả con gái cho một họ trong vùng, hai họ thành thông gia;
  - chi họ có tá điền tự mua ruộng;
  - hộp mốc chỉ số của người ở chi họ tự quyết;
  - nhánh thắng của "một sống một còn".

Chưa thử một ván dài mà nhà mình có thế, để các họ khác qua lại nhiều. Phần này mày chơi mới thấy.

## 1. Các điểm và kết quả

| Điểm | Kết quả |
|---|---|
| Sửa các lỗi lúc test 6.4.1.4 | Mục 2 |
| Tách họ gốc, hộ, chi | Mục 3 |
| Quan hệ giữa các họ | Mục 4 |
| Hôn nhân, gả đi | Mục 5 |
| Ruộng riêng cho từng hộ | Mục 2 |
| Để bản 6.4.1.6 | Tình duyên; chi họ xa có nơi ở và hiện trên bản đồ; đi lính đưa vợ con theo, cưới khi về phép, tỉ lệ có con |
| Để bản 6.4.1.7 | Sự kiện vượt mốc đa dạng theo từng mốc, chiến tranh tại nơi ở |
| Để giai đoạn cân bằng | Chỉ số qua 100 vẫn tăng nhanh |

## 2. Các lỗi lúc test

| Lỗi | Sửa |
|---|---|
| Thư nhà chậm một năm | Thư tính năm từ 0, lịch game tính từ 1. Đã cho dùng cùng lịch |
| Công trạng 275/250 mà chưa được phong | Như mày chốt: công tới mốc bậc nào thì tước bậc ấy, sự kiện lớn hay nhỏ đều vậy, lên thẳng nhiều bậc cũng được. Nhiệm kỳ thượng đẳng và các sự kiện quan trường ghi công cũng xét phong luôn |
| Tá điền ở chi họ bị gộp ruộng và sức làm về nhà chính | Mỗi hộ có ruộng riêng. Ruộng nhà chính chỉ dùng sức người nhà chính. Tá điền ở chi làm ruộng của chi; ruộng chi không đủ thì đi cày thuê; tiền vào quỹ chi. Chi có tá điền và dư dả thì tự mua thêm ruộng, mỗi năm một mẫu. Trang Cơ ngơi ghi ruộng của từng chi |
| Thu chi lẫn người không ở nhà chính | Người đã xuất giá vốn không bị tính. Đã sửa hai chỗ lẫn: người ở doanh trại, đi đày, đi ở đợ, hành tẩu giang hồ không còn ăn ở bằng tiền nhà chính; người đi theo quan nhậm chức thì tiền riêng của vị quan ấy nuôi, thiếu mới tới công quỹ |
| Vay nóng mua ruộng: trả nợ xong vẫn là ruộng thuê, giá không chuẩn | Mua ruộng đang thuê thì phần thuê chuyển thành ruộng nhà. Giá mua theo giá ruộng thật của game, rẻ hơn chợ 15%. Vay nóng ghi rõ gốc lẫn lãi (35%) ngay trên lựa chọn và lúc đòi nợ; xin khất thì lãi tăng thêm 10% |
| Tá điền gặp sự kiện "Họ khác tranh khách" với nhà thợ, nhà buôn | Sự kiện này chỉ chọn họ cùng nghề với nhà mình |
| Tướng quân gặp kỳ ngộ học sách rồi thành người chép sổ | Ba kỳ ngộ "xin vào nha môn làm thư lại, theo đoàn buôn" không còn đến với người đang làm quan văn, quan võ, ngự y, người có tước hay đang làm chủ cơ sở |
| Đủ gia quy vẫn được gợi ý thêm | Hết chỗ thì không ai đề xuất nữa |
| Người ở chi họ, đi lính, ở xa vẫn đề xuất gia quy | Chỉ người nhà chính đang ở nhà mới đề xuất |
| Hộp mốc chỉ số, mốc thông thạo của người chi họ vẫn hiện | Hai loại hộp này nay thuộc diện tự quyết như sự kiện thường, ghi vào nhật ký và thư nhà |
| Người đi lính về quê mà vợ vẫn "theo quan" ở nơi xa | Có sự kiện cho người về quê mà không trả ghế quan. Nay mỗi tháng game kiểm tra: ai không còn làm quan mà vẫn giữ ghế thì trả ghế; người đi theo một người đã về thì cũng về nhà |
| Đi lính thì chỉ số ngừng tăng | Người ở doanh trại vẫn có thời gian rảnh và vẫn lớn chỉ số. Họ không gặp sự kiện nhà và không phụ việc nhà |
| Lính lúc nào tâm trạng cũng thấp | Trước đây tâm trạng của lính bị kéo về mức cố định 45. Nay theo mức sống như người khác, chỉ thấp hơn một chút; có chiến sự thì thấp hơn nữa |
| Sự kiện vượt mốc không hợp tuổi | Không chặn theo tuổi, như mày dặn. Có ba thay đổi: (1) Mỗi chỉ số thêm một con đường cho trẻ dưới 16 tuổi (ví dụ trí tuệ: "Đọc hết tủ sách trong nhà, hỏi người lớn từng chữ"; võ: "Theo người lớn tập võ mỗi sớm") và một con đường cho người từ 60 tuổi ("Ngồi chiêm nghiệm cả đời, viết lại điều mình biết", "Đúc kết võ học, luyện dưỡng sinh"…); hai con đường này được ưu tiên hiện ra khi hợp tuổi. (2) Con đường phải đi xa hoặc tốn tiền thì không hiện cho trẻ, con đường đi xa không hiện cho người từ 65 tuổi. (3) Trong mọi sự kiện, kể cả sự kiện nhận danh hiệu, trẻ dưới 14 tuổi và người từ 70 tuổi không thấy lựa chọn phải đi xa (chu du, lên kinh, giang hồ, tòng quân…), trừ khi sự kiện chỉ còn những lựa chọn ấy |
| Người có tước có thể không đi làm | Người có tước mà nhàn rỗi thì không còn bị hộp giục đi tìm việc |

## 3. Họ gốc, hộ, chi họ

Ba khái niệm nay tách riêng trong dữ liệu:
- **Họ gốc:** họ sinh ra. Người trong họ thì là họ mình. Dâu rể thì là họ bên kia; nếu là một họ trong vùng thì có liên kết tới họ ấy.
- **Hộ đang sống.**
- **Chi họ.** Mặc định trùng với hộ.

Bản 6.4.1.6 (chi họ xa) sẽ cho một chi có nhiều hộ ở nơi khác.

**Phần này mới làm ở mức nền.** Code cũ vẫn dùng hộ thay cho chi như trước. Chỗ nào cần phân biệt thì sẽ sửa dần khi làm chi họ xa.

## 4. Quan hệ giữa các họ

**Những nhà được tính:**
- mọi họ ở cùng nơi nhà mình sống, kể cả họ thường;
- các danh gia và bốn đại gia ở trong hai tháng đường.

**Mỗi nhà có:**
- Hảo cảm, như trước.
- **Thù oán** (mới): nhớ qua cả đời gia chủ, sang đời mới chỉ nhạt bớt 20%.
- **Số lần thông gia** (mới).
- **Cảnh giác** (mới).
- **Gia phong:** trọng lễ, nhân hậu, hám lợi, ngang ngược, thủ cựu, trọng võ.
- **Sổ ân oán** (mới): ghi những chuyện lớn như cứu lúc hoạn nạn, bỏ mặc, kết thông gia.
- Hảo cảm không còn tự trôi về 0. Nó trôi về một mức nền: thù oán kéo xuống, thông gia kéo lên.

Như mày góp ý, uy tín và lợi ích không làm thành chỉ số riêng. Uy tín suy từ danh vọng và bậc của hai nhà, lợi ích suy từ việc cùng làm ăn.

**Nhịp tháng.** Mỗi tháng có thể có một chuyện với một họ khác, chọn theo hai thứ:
- **Mức hảo cảm:** tri kỷ, đồng minh, mến, xa lạ, bất hòa, thù oán, cực đoan, một sống một còn.
- **Chênh lệch địa vị:**
  - Nhà kia cao hơn: chèn ép, hoặc nhà mình phải tự vun đắp.
  - Ngang hàng: cạnh tranh hoặc hợp tác.
  - Thấp hơn: lấy lòng, xin nương nhờ.

Quy tắc chặn:
- **Danh môn vọng tộc không chủ động kết thân hay ngỏ thông gia**, trừ khi hảo cảm đã tới tri kỷ.
- Nhà Bần hộ, Thường dân không bị danh gia ngó tới.

**Hảo cảm âm thì luôn có hai lựa chọn nhường nhịn**: nhường suông, hoặc nhường kèm lễ vật. Khả năng thành tính theo:
- EQ và khẩu tài người ra mặt;
- chênh lệch địa vị;
- gia phong bên kia (nhân hậu dễ tha, ngang ngược khó; hám lợi thì lễ vật có tác dụng hơn);
- hảo cảm hiện tại;
- số lần đã nhường: nhường mãi thì họ lấn tới.

**24 sự kiện:**

| Nhóm | Sự kiện |
|---|---|
| Giao thiệp | Thiếp mời dự tiệc · Lời ngỏ kết giao · Hai họ cùng làm ăn · Họ khác gặp nạn · Mang lễ lấy lòng · Ngỏ lời kết thông gia (gả hoặc cưới thật, với con cháu thật của nhà kia) · Cơ hội vun đắp với danh gia · Họ thân mừng thọ · Con cháu hai họ học chung · Đám tang nhà họ khác · Họ suy yếu tìm chỗ dựa · Đối thủ cũ đề nghị liên minh lúc thời loạn · Đề nghị hòa giải · Hậu duệ nhớ chuyện cũ (từ sổ ân oán, 15 năm sau) |
| Bất hòa | Giành mối làm ăn · Bị nhà quyền thế chèn ép · Hai nhà cạnh tranh · Có kẻ ngấm ngầm gây khó |
| Thù oán | Tranh chấp ruộng nước · Cơ sở bị phá hoại · Bị bôi nhọ danh tiếng |
| Cực đoan | Người nhà bị hành hung · Bị vu cáo lên quan |
| Một sống một còn | Bốn cách quyết: kiện, đấu tiền, đấu võ, hòa giải lần cuối. Thắng thì nhà kia suy sụp, dời đi, nhà mình lấy được ruộng và mối làm ăn. **Thua thì hết game** |

## 5. Hôn nhân, gả đi

**Thông gia thật.** Cưới dâu rể từ một họ trong vùng, hoặc gả con gái về một họ trong vùng, thì hai họ thành thông gia: hảo cảm tăng, sổ ân oán ghi lại. Con gái gả đi vẫn ở trong gia phả gốc như trước.

**Kiểu hôn nhân.** Mỗi cuộc hôn nhân được gắn một kiểu, tùy hoàn cảnh:
- môn đăng hộ đối;
- chính trị (nhà có quan từ Ngũ phẩm, cưới nhà cao hơn);
- lợi ích;
- cưỡng ép (người tự lập cao bị ép);
- kết thân với nhà sa sút;
- trả ơn (họ tri kỷ);
- thông thường.

Kiểu hôn nhân ảnh hưởng tình cảm vợ chồng lúc đầu: cưỡng ép thì thấp, trả ơn hay môn đăng hộ đối thì cao hơn. Nó cũng ảnh hưởng thế đứng của con gái ở nhà chồng.

**Thế đứng của con gái đã gả đi** (theo mục 14 của kế hoạch cũ). Tính từ:
- tài, đức của người con;
- đã có con trai chưa;
- nhà mình so với nhà chồng;
- nhà mình có người làm quan không;
- quan hệ hai họ;
- kiểu hôn nhân;
- đã từng bị hắt hủi chưa.

Theo thế đứng:
- **Thế đứng cao:** có tin vui (làm chủ mẫu nhà chồng, cháu ngoại đỗ đạt, thông gia giúp làm ăn), gần như không bị hắt hủi.
- **Thế đứng thấp:** có thể bị hắt hủi.
- **Bị trả về** chỉ khi thế đứng thấp **và** có cớ:
  - quá 5 năm chưa có con;
  - nhà mình sa sút so với lúc gả;
  - hai họ đã bất hòa;
  - từng bị hắt hủi mà nhà mình nhẫn nhịn.

  Mỗi người tối đa một lần.
- Tần suất chung giảm còn một nửa, và chủ yếu trong 10 năm đầu.

**12 sự kiện:**
- Hôn nhân:
  - Mối mai có tiếng xấu;
  - Nhà gái đòi sính lễ cao;
  - Hôn lễ bị phá;
  - Người cũ trở lại;
  - Nàng dâu bị coi thường;
  - Thông gia nâng đỡ (người làm quan được nhà vợ có thế tiến cử);
  - Con không ưng mối nhà chọn (ép cưới thì thành hôn nhân cưỡng ép).
- Con gái đã gả đi:
  - Quà Tết;
  - Làm chủ mẫu nhà chồng;
  - Cháu ngoại đỗ đạt;
  - Thông gia giúp làm ăn;
  - Nhà chồng gặp đại họa: cứu, cắt đứt, hoặc nhân cơ hội mua rẻ tài sản. Lựa chọn nào cũng được ghi vào sổ ân oán.

## 6. Gắn với các bản trước

- Lựa chọn lo lót quan khi bị vu cáo bị tính là phạm gia quy "Nghiêm trị gian tham".
- Hộp quan hệ giữa các họ luôn hiện cho gia chủ, vì gia chủ do mày điều khiển.
- Phe phái thất thế (6.4.1.4) mở ra sự kiện đối thủ cũ đề nghị liên minh.

## 7. Save cũ

- Mở được.
- Các họ khác được gán gia phong và các chỉ số mới khi lần đầu được nhắc tới. Họ đang có thù cũ thì bắt đầu với thù oán 20.
- Chi họ bắt đầu chưa có ruộng. Tá điền ở chi đi cày thuê cho tới khi chi mua được ruộng.
- Ruộng nhà chính giữ nguyên.

## 8. Tệp thay đổi

- Mới: `ev-v6415.js` (36 sự kiện).
- `engine.js`:
  - quan hệ giữa các họ, sổ ân oán, nhường nhịn, một sống một còn;
  - kiểu hôn nhân, thông gia, thế đứng của con gái gả đi;
  - họ gốc, hộ, chi; ruộng của chi;
  - các lỗi ở mục 2; chữ phiên bản.
- `ev-nghe2.js`: giá ruộng và nợ vay nóng.
- `ev-v6414.js`: ghi công thì xét phong tước luôn.
- `index.html`, `admin.html`, `admin.js`: nạp tệp mới, dòng phiên bản.

## 9. Còn lại cần mày biết

- **Một sống một còn thua là hết game**, như đã chốt ở mục 6 của kế hoạch cũ. Hảo cảm phải xuống tận -100 mới tới bước này, và trước đó luôn có lựa chọn nhường nhịn hoặc hòa giải lần cuối.
- **Tước nhảy nhiều bậc:** người đã tích nhiều công trong save cũ có thể lên thẳng hai ba bậc ở lần ghi công kế tiếp.
- Mọi con số đều là phỏng đoán: tần suất chuyện với họ khác (3% mỗi tháng), các mức nhường nhịn, tần suất tin con gái gả đi.
- Bản tiếp theo: **6.4.1.6**, gồm tình duyên; chi họ xa có nơi ở và hiện trên bản đồ; gia đình người đi lính, làm quan xa.
