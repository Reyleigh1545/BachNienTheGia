# Phân tích cơ chế game · dựa trên save năm 114 (6 tiếng chơi) và mã v6.5.4.2

Nguồn: `bach-nien-the-gia_ho-Văn_nam-114_1.json` (t=1364 tháng, 85 người sống, 21 người mất, 22 hộ, 24 cơ sở), mã trong repo, lời mày kể về lúc chơi.
Mỗi điểm ghi rõ nguồn: **[save]** là số đọc từ file save, **[mã]** là đọc từ code, **[mày kể]** là điều mày nói mà tao không kiểm được từ save. Tao chỉ phân tích, chưa sửa gì.

## 0. Kết luận một đoạn

Game có **hai loại vấn đề chồng lên nhau**.

1. **Lỗi thật**, sửa được ngay: trẻ con mang danh hiệu Thần, tiền mắc kẹt ở chi họ bỏ trống, cùng một việc hiện hai lần, chi họ đẩy hộp sinh con lên người chơi, một số điều kiện ước muốn quá lỏng, hai chỗ do chính tao làm ở v6.5.4 gây hại (cổng gia thế đòi cơ sở kinh doanh, tốc độ rèn võ phụ thuộc trí).
2. **Thiếu áp lực và thiếu mục tiêu sau năm thứ 30–50**, đây mới là lý do mày chơi 114 năm trong 6 tiếng mà không đọc. Tiền chỉ vào, gần như không ra; chỉ số chạm trần; không có kẻ thù hay mốc phải vượt; cướp ngôi là con đường duy nhất tới ending và nó khóa im lặng. Sự kiện sau năm 50 lặp lại chỉ vì không còn gì mới để xảy ra.

Sửa lỗi thật không làm game hết chán. Muốn giữ người chơi tới cuối thì phải thêm cơ chế tạo áp lực và mục tiêu (mục 9).

## 1. Lỗi thật đã xác minh

### 1.1 Trẻ con có danh hiệu Thần, có người hai danh hiệu · **lỗi, nằm ở mã**
- **[save]** 17 người sống mang `tm_*` (thiên mệnh) hoặc `than_*` (danh hiệu Thần). Trong đó 7 đứa trẻ 3–11 tuổi: Thanh Hiên (8 tuổi) `than_vothan`, Xuân Giám (4) `than_thuongthanh`, Hoài Trang (7) `tm_kytai` + `than_thannong`, v.v. Quốc Mậu mang hai danh hiệu `than_camthanh` + `than_thantuong`, Minh Kỳ mang `tm_camthanh` + `tm_thanhnhan`.
- **[save]** `S.than` rỗng: không ai được phong thật. Tức là các huy hiệu này **không phải** danh hiệu được trao bởi `thanGrant`.
- **[mã]** Nguồn: `randomTraits` (engine.js, dòng ~89) bốc ngẫu nhiên từ **mọi** đặc điểm không phải gen, không phải nhãn trục, không phải cấp luyện. Khi v6.4.1.7 thêm `than_*` và `tm_*` vào bảng `TRAITS`, chúng lọt vào hồ bốc ấy. Mỗi người mới sinh có 50% nhận 1 đặc điểm (30% của số còn lại nhận 2) từ khoảng 120 đặc điểm, trong đó 20 cái là Thần/thiên mệnh.
- **Hệ quả:** huy hiệu `than_*` nằm trên người nhưng hiệu quả bị cổng bởi `S.than`, nên chỉ là cái nhãn gây rối. Huy hiệu `tm_*` thì **có hiệu lực thật** (tư chất 88–100, học nghề nhanh gấp đôi, mở trần 200) dù thiết kế là 1/2000 trẻ và chỉ một loại cho cả họ. Trong save có 13 người `tm_*` ở 85 người.
- **Tao nhận sai trước đó:** ở báo cáo 6.5.4 tao viết "đọc lại code, không thấy chỗ nào cấp danh hiệu Thần lúc sinh". Sai: tao chỉ đọc `tmBirth` mà không đọc `randomTraits`.
- **Sửa:** loại `than_*`, `tm_*` (và mọi đặc điểm có cờ `tm`/`than`) khỏi hồ ngẫu nhiên; thêm bước dọn save để gỡ các huy hiệu ấy khỏi người đang mang mà không có trong `S.than`/không được `tmGive` cấp.

### 1.2 Danh hiệu Thần và nghề · **thiết kế lệch**
- **[mày kể]** nghề của người mang danh hiệu không theo danh hiệu. Đúng với thiên mệnh: `tm_*` chỉ tăng tư chất, không ép nghề, và `wishScore` không biết đến nó. Người `tm_thanhnhan` đang là chủ cơ sở (Phương Nhu) hay địa kỳ (Ngọc Hân); người `tm_vothan` (Tố Cầm) làm địa kỳ.
- **Sửa (nếu giữ thiên mệnh):** nghề ưa thích cộng điểm cho nghề của thiên mệnh, và trường học ưu tiên chỉ số thiên mệnh.

### 1.3 Tiền mắc kẹt ở chi họ bỏ trống · **lỗi**
- **[save]** 22 hộ, **7 hộ không còn ai** nhưng còn tiền: Chi Như 345.352, Chi Như 3 1.018.751, Chi Diệu 2 4.450.828, Chi Vĩnh 1.879.717, v.v. Cộng khoảng 7,7 triệu đồng nằm im. Hộ còn có nhà bậc 1–4.
- **[mã]** Vòng tháng gặp hộ rỗng thì chỉ thu tiền thuê nhà (`h.rent`), không chuyển `h.money` về quỹ, không bán nhà, và hộ không bị xóa. Hộ chi họ xa (`far`, `tuquan`) lập ở nơi này rồi chuyển đi nơi khác sinh hộ mới (tên "Chi Như", "Chi Như 3", "Chi Diệu 2", "Chi Hải 2") mà hộ cũ vẫn nằm đó.
- **[mày kể]** chuyển sang nơi khác thì cơ ngơi (nhà, ruộng) bỏ lại. Khớp với trên.
- **Sửa:** khi hộ chi họ rỗng hoặc chuyển đi: tiền về quỹ (hoặc về hộ mới của người chủ), nhà được bán/cho thuê rõ ràng, ruộng chuyển theo hoặc bán, hộ rỗng bị gỡ khỏi danh sách. Khi người chơi lập chi họ ở nơi khác, hỏi một lần cách xử lý cơ ngơi cũ thay vì bỏ lại.

### 1.4 Chi họ đẩy hộp sinh con lên người chơi · **lỗi**
- **[mã]** `showPopup` kiểm `isCtrl(c)` cho sự kiện thường (đẩy sang `autoEv`) và cho hộp `ms`/`mm`, nhưng hai hộp `preg` và `birth` gọi thẳng `pregPopup(c)`/`birthPopup(c)` với **mọi** người đang mang thai, kể cả vợ trong chi họ. Nhiều hộp khác cũng không kiểm: `ly`, `tumat`, `tranhvi`, `school`, `sick`, `retire`...
- **[mày kể]** khớp.
- **Sửa:** mọi hộp thuộc người ngoài quyền điều khiển phải đi đường tự quyết, nên có một cổng chung trong `showPopup` thay vì từng hộp một.

### 1.5 Một việc hiện hai lần: hộp "Tin nhà" rồi thư cuối năm · **thiết kế lỗi**
- **[mã]** `autoEv` ghi mỗi quyết định của người ngoài quyền vào `letterAdd` (thư cuối năm), **và** nếu coi là "lớn" (kỳ ngộ, tiền đổi từ 10% quỹ hoặc `mm(20)`, danh vọng đổi từ 5, người đã rời) thì còn bật thêm hộp `infoPopup` "Tin nhà". Sự kiện lớn xuất hiện hai lần.
- **[save]** năm 113: 33 sự kiện bốc, 23 hiện, 21 tự quyết (auto), 5 "lớn". Trung bình mỗi năm người chơi gặp khoảng 23 hộp sự kiện + hộp tin nhà + thư, không kể hộp hệ thống (thăng chức, thi cử, sinh con, trường học, tuổi già, kiếp nạn…).
- **Sửa:** mỗi việc chỉ báo **một lần**: lớn thì chỉ hộp, không vào thư; thường thì chỉ vào thư. Thư nên gộp theo chi.

### 1.6 Cổng gia thế đòi cơ sở kinh doanh · **do tao làm ở 6.5.4**
- **[mày kể]** kẹt ở thường dân dù có Tam phẩm và tước Nam vì nhà chưa có cơ sở.
- **[mã]** v6.5.4: Tiểu hộ khá giả cần ≥1 cơ sở, Hương thân cần người làm quan. Hai điều kiện này loại nhau với nhà thuần quan lại.
- **Sửa:** bậc gia thế tính trên **tổng của cải kiểu nào cũng được** (kinh doanh, ruộng, quan, tước), mỗi bậc cần một trong vài điều kiện chứ không bắt buộc một thứ.

### 1.7 Rèn võ chậm, ít người theo võ · **một phần do tao làm**
- **[mã]** v6.5.4: `perYear` của võ nhân với `0.65 + min(tri,100)/290`, tức võ lực phát triển chậm hẳn khi trí thấp (tối thiểu 65%). Cộng với danh hiệu tăng tốc võ chỉ cộng vài phần trăm, nên người ngoài quân khó đạt mốc cao.
- **[mã]** trường học: số lựa chọn theo trí nhiều hơn theo võ (mày kể khớp). Tao chưa đếm; cần kiểm `SCHOOL` để định số liệu.
- **[mã]** `wishTick` (ước muốn): mục `exam` (đi thi văn) có sẵn; **không có mục "đi thi võ cử"**, chỉ có `army` khi đang có chiến sự hoặc đợt tuyển. Nên không ai xin đi võ cử là hợp lý.
- **Sửa:** bỏ ràng buộc trí khỏi võ lực (hoặc đảo: võ không cần trí), thêm ước muốn `vexam`, thêm trường võ, thêm nguồn tăng võ ngoài trường.

### 1.8 Ước muốn đi thi và mở cơ sở quá lỏng · **chỉnh số**
- **[mã]** `wishTick`: muốn đi thi khi tuổi ≤35, trí ≥55, khí chất tham vọng ≥55 (`subOf(c,'tv')`), chưa đỗ cấp 3. Không xét tuổi so với số lần trượt, không xét trí so với mặt bằng (trí 80 thì quá thấp so với ngưỡng cần để đỗ), không giới hạn số người cùng thi một lúc. Mỗi năm mỗi người có xác suất 1,2% mỗi tháng.
- **[mã]** mở cơ sở: điều kiện là `tv≥55` hoặc `dl≥65` và `canOwn` bất kỳ loại nào. **Không kiểm nhà đã có cơ sở loại đó chưa.**
- **[save]** 24 cơ sở: 8 y quán, 7 trường học, 3 quán trà, 2 võ quán, 1 mỗi loại còn lại. Nghề người lớn: 23 chủ cơ sở, 15 về hưu, 7 thư lại, 4 địa kỳ, 4 nội trợ, 3 thầy thuốc.
- **Sửa:** mỗi loại cơ sở có mức bão hòa theo quy mô nhà (đã có N cái thì giảm điểm muốn mạnh, rồi không muốn); thi cử xét thêm tuổi, số lần trượt, khả năng đỗ ước tính.

### 1.9 Cướp ngôi: có Đại tướng quân mà không kích hoạt · **không phải lỗi mã, là khóa im lặng**
- **[save]** Sĩ Ninh, 57 tuổi, quân ngũ cấp 7 = Đại tướng quân (mã: `ARMY` có 8 bậc, cấp 7 là cuối) nên đủ `usStatus('vo')`. Nhưng `S.usNo` = 1738, tức khóa tới tháng 1738 (hơn 31 năm nữa). Thái bảo Tuấn Cẩn (quan cấp 8) cũng bị khóa như thế; riêng đường quyền thần còn khóa cá nhân thêm (`usNoP.quyen`=964).
- **[mã]** `usFail` đặt `usNo = t+720` (60 năm). Bỏ ngang đặt `120–240` tháng (10–20 năm). Không có dòng nào báo người chơi biết mình đang bị khóa bao lâu.
- **[mày kể]** "dễ hóa giải bằng trục xuất và chối bỏ": đúng, người cầm đầu bị trừng phạt thì cả nhà mất gì? Nghĩa là rủi ro thực chỉ là mất một người.
- **Sửa:** hiện khóa trong trang Triều đình, rút ngắn, hậu quả thất bại phải đau hơn một mình người cầm đầu (xem 9.3).

## 2. Kinh tế: tiền chỉ vào, không có chỗ ra

- **[save]** Quỹ **189 triệu đồng**, +10 triệu mỗi năm (năm 102: 122 triệu; năm 113: 186 triệu). Dòng tháng cuối: **thu 804.837, chi 149.963, tiết kiệm 81%**. Trong thu, kinh doanh 655.749 (81%); lương, tước, tô, góp chiếm phần nhỏ.
- **[save]** Sự kiện đóng góp vào quỹ: -114.691 đến +13.990 mỗi năm (`evm`), tức khoảng **0,1% thu nhập**. Sự kiện không còn là nguồn thu hay chi.
- **[save]** Túi riêng cao nhất 7,5 triệu, nhiều người 1–3 triệu. Phần lớn "lễ mừng thọ vài vàng" là tiền túi riêng, không đụng quỹ (như mày nói).
- **[mã]** `mm(v) = v × 60 × hệ số`, hệ số tối đa 4 (thường) hay 12 (chi tiêu theo cỡ nhà, 22 sự kiện). Ở quỹ 189 triệu: `mm(10)` = 2.400 đồng (2,4 bạc), `mm(100)` = 24.000 đồng (24 bạc). Tức một khoản "lớn" (v=100) chỉ bằng **0,013% quỹ**. Đây là lý do mày thấy vay mượn, hùn vốn, cháy nhà chỉ một vài bạc.
- **[mã]** chi định kỳ của quỹ: nhà chính theo bậc nhà (`upkeep`, 15.000 đồng/tháng), quản lý cơ sở (tỷ lệ lãi), ăn ở cho trẻ dưới 18 và gia chủ. Người lớn tự nuôi mình bằng túi riêng. **Không có thuế, không có nghĩa vụ theo quy mô, không có chi phí duy trì cho danh vọng/tước/binh.**
- **[mã]** cướp ngôi: tiền ở các bước là `m(70)`, `m(110)`, `m(120)` một lần (= 17–29 bạc ở quỹ lớn, đúng như mày nói "vài trăm bạc hoặc vài vàng"). **Không có chi nuôi quân hằng tháng** trong `usMonth`.
- **Chẩn đoán:** kinh tế của game được cân cho nhà nghèo và vừa. Tiền đủ cho đến khoảng bậc Thế gia, rồi nhân hệ số tiền bị chặn ở 4–12 lần trong khi quỹ lớn hơn 1.000 lần. Sự kiện tiêu tiền không tỉ lệ với quỹ.

## 3. Tiến trình và trần chỉ số

- **[save]** Chỉ số cao nhất: trí 146, võ 150, sức 100 (trần 100), thông thạo 120. Danh vọng cá nhân 500–1.400, danh vọng gia tộc **32.810**. Không ai đạt 200.
- **[mã]** chỉ số 100–120–140 có cổng đột phá (`BRK100`, `gate:120|140`); trên đó cần tư chất (`tm_*` mở trần 200). Ngưỡng danh vọng gia tộc cao nhất tao đặt là 1.500 (Vọng tộc). 32.810 là hơn 20 lần, nghĩa là sau ngưỡng ấy danh vọng không còn mua được gì.
- **[save]** 15/70 người lớn đã về hưu, 22 người không nghề (phần lớn trẻ); thông thạo 120 (tối đa) phổ biến ở người ngoài 50.
- **Chẩn đoán:** sau khoảng 50 năm toàn bộ thang tiến trình đã leo hết, không còn mục tiêu cá nhân hay gia tộc nào cần cố gắng. Con số 200 mà mày nhắc phải có đường tới (ví dụ chuỗi đột phá hiếm, cần tư chất và tài nguyên lớn) thì nó mới là mục tiêu.

## 4. Kho sự kiện và lặp

- **[save]** 2.442 lần sự kiện bốc trong 114 năm, chỉ **511 trên 1.294 sự kiện** từng xuất hiện (39%). Nhiều nhất 38 lần (`ct_tri0`), 16 lần với các kỳ ngộ thương nhân/lão nhân. Trong năm 102–113 mỗi năm bốc khoảng 31–39 sự kiện, hiện 18–44.
- **Giải thích:** 61% kho không bao giờ bốc vì cổng nghề, bậc, tuổi, cốt truyện; 39% còn lại lặp lại với tần suất cao. Sau khi gia tộc ổn định, cùng một nhóm nghề/bậc/tuổi cứ quay vòng cùng một nhóm sự kiện. Đúng như mày kể: 50 năm đầu qua hết, sau đó là chuỗi lặp.
- **Hướng đúng cho 5.000 sự kiện:** chỉ thêm số lượng thì tăng độ đa dạng ở bậc thấp. Cần sự kiện **tùy trạng thái dài hạn** (giàu thì cần xử lý của cải; đông thì cần xử lý nhân sự; có quyền thì cần giữ quyền).
- **Sự kiện lặp theo gia tộc:** `pcd` hiện đặt cooldown theo từng người, không theo cả gia tộc, nên với 85 người cùng sự kiện vẫn quay vòng. Cần cooldown theo nhà cho nhóm "chuyện thường".

## 5. Lượng thông tin người chơi phải xử lý

- **[đo]** Tao đo độ dài mô tả của 653 sự kiện thường: trung bình 92 ký tự, trung vị 88, không cái nào quá 300. Kỳ ngộ trung bình 124, cốt truyện 112. **Phần mô tả không dài.**
- **[save]** Cái dài là phần kết quả: ví dụ "Danh vọng +6 Danh vọng gia tộc +2 Thông thạo +5 EQ +1 Tâm trạng +3" cuối mỗi quyết định, cộng với số hộp (mục 1.5), cộng với việc nhiều sự kiện không hiện **ai** và **chỉ số của người ấy** khi bắt chọn (mày kể; tao chưa kiểm từng hộp).
- **Kết luận:** vấn đề là **mật độ**, không phải độ dài từng đoạn. Một lượt người chơi nhận quá nhiều quyết định nhỏ, mỗi cái ít hệ trọng.
- **Hướng:** phân tầng quyết định (a) sự kiện của gia chủ và con cái trực tiếp, (b) sự kiện nhà chính, (c) sự kiện chi họ và thành viên xa (chỉ tự quyết, thư cuối năm một lần). Cho người chơi chọn mức tự quyết theo nhóm. Mỗi hộp luôn ghi rõ ai tham gia và chỉ số chính của người ấy.

## 6. Cấu trúc gia tộc khi đông

- **[save]** 85 người sống chia 22 hộ, trong đó nhà chính 19 người, một chi 12 người, một chi 11 người. Mày chia chi thủ công vì không kiểm soát nổi; game không có công cụ giúp (xem 6.1).
- **[mã]** `kidCap` và giãn cách 24–36 tháng đã có ở 6.5.4; nhưng gia quy số con là tùy người chơi đặt, và con cháu nhiều đời vẫn nở ra theo cấp số nhân khi không có áp lực kinh tế.
- **6.1 Công cụ quản lý chi họ cần có:** tự chia chi theo tiêu chí (khi nhà quá chật hoặc con thứ lập gia đình), chi họ có người đứng đầu tự lo, giao quyền cho trưởng chi (mức quyết định tự động theo gia quy), và hộ rỗng tự dọn (1.3).

## 7. Cơ cấu quyền và thể chế

- **[mã]** `isCtrl` = gia chủ, người nhà chính ở nhà (hoặc trong quân), và trưởng chi. Người khác tự quyết. Tốt về nguyên tắc nhưng không phủ hết các loại hộp (1.4).

## 8. Điểm kết và chơi lại

- **[mã]** chỉ có hai cách ván kết thúc: phá sản/mất hết người (`S.over` ở dòng ~1817) và đăng cơ (hậu sử, dòng ~3617). Không có kết thúc "thịnh" nào ngoài cướp ngôi.
- **[save]** ván 114 năm: `over:false`, `usurp:null`, tier cao nhất, vẫn tiếp tục không cái gì phải làm.
- **Chẩn đoán:** người chơi giỏi đạt cực đại trong khoảng 40–50 năm rồi chỉ còn bấm tiếp. Người chơi vụng thì thất bại trước năm 40 (ván tự động: 17,7% đứt dòng trong 40 năm). Không có mục tiêu giữa hai thái cực nên không có động lực chơi lại.
- **Khảo sát của mày** (người chơi không cố kết thúc game khi đã giàu) trùng với dữ liệu trên.

## 9. Đề xuất, theo thứ tự làm

### Bản 6.5.5 · sửa lỗi thật (nhỏ, an toàn, save cũ vẫn nạp)
1. Gỡ `than_*`/`tm_*` khỏi hồ ngẫu nhiên; dọn huy hiệu sai khỏi save cũ (1.1).
2. Hộ chi họ rỗng: tiền về quỹ, nhà bán/cho thuê, gỡ hộ; khi chuyển đi hỏi cách xử lý cơ ngơi (1.3).
3. Cổng chung trong `showPopup`: người ngoài quyền điều khiển không bao giờ bật hộp sinh con, ốm, trường học… (1.4).
4. Mỗi việc chỉ báo một lần (hộp *hoặc* thư) (1.5).
5. Gia thế tính trên của cải kiểu nào cũng được (1.6).
6. Võ lực không phụ thuộc trí; thêm ước muốn đi võ cử; ước muốn đi thi/mở cơ sở xét độ bão hòa và khả năng đỗ (1.7, 1.8).
7. Hiện thời gian khóa cướp ngôi và lý do.

### Bản 6.6 · áp lực tiền và quy mô (nền cho mọi thứ sau)
- Chi phí **tỉ lệ theo quỹ và số người**: thuế/lệ phí theo bậc gia thế, chi duy trì tước và danh vọng, chi nuôi nhân viên và tá điền, giữ nhà cửa.
- Sự kiện tiền **theo phần trăm quỹ** (vay, hỏa hoạn, từ thiện, hùn vốn, mừng thọ) với hai thang: "chuyện nhỏ" giữ số tuyệt đối, "chuyện lớn" tính theo % quỹ.
- Binh: nuôi quân tốn hằng tháng theo số lính; cướp ngôi nuôi quân là chi phí đang chạy.
- Cơ sở kinh doanh: lãi giảm dần khi mở nhiều cái cùng loại; rủi ro theo mùa/thiên tai/cạnh tranh.

### Bản 6.7 · mục tiêu cuối và thất bại có hậu quả
- Thêm **nhiều loại kết thúc** (gia tộc nghìn năm, đệ nhất thương gia, danh sĩ đời đời, võ gia, ẩn dật…), mỗi loại có mốc trong game; cướp ngôi chỉ là một.
- Thất bại cướp ngôi: tịch biên, tru di một phần, mất tước; không cho "trục xuất chối bỏ" rẻ tiền.
- Đối thủ: các họ lớn và triều đình có hành động (ganh ghét, thôn tính, tố cáo) khi gia tộc vượt ngưỡng.
- Mục tiêu chỉ số 200 qua chuỗi đột phá hiếm.

### Bản 6.8 · thông tin và công cụ quản lý
- Phân tầng quyết định, mức tự quyết theo nhóm, thư tuần/tháng gộp.
- Mỗi hộp hiện đúng người và chỉ số liên quan.
- Công cụ chia/gộp chi họ.
- Rút gọn đuôi chỉ số.

### Sau đó · nội dung (đến 5.000 sự kiện)
- Viết theo **trạng thái dài hạn** thay vì theo nghề (mục 4), cooldown theo nhà.

## 10. Việc tao chưa làm và chưa chắc

- Tao chưa chơi tay, chưa chạy lại các ván. Phần "tính cách mỗi người trong save" tao chưa đối chiếu từng hộp.
- Số trường võ so với trường trí (1.7), tao chưa đếm từ `SCHOOL`.
- Hộp nào không hiện người tham gia và chỉ số (mục 5), tao chưa quét từng sự kiện.
- Thang chi phí đề xuất (6.6) chưa được cân; cần đo trên nhiều ván trước khi chốt số.
