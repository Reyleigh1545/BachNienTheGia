# Bách Niên Thế Gia · Kế hoạch các bản v6.5.x

Lập ngày 11/11/2026, sau khi có hai file mày thêm vào: `BachNienTheGia_Test_Report_v6.4.1.8_Endings.md` (báo cáo test ending) và `Rà soát lại toàn bộ chức năng game.docx` (rà soát chức năng). Thay cho các mục "6.4.1.9 trở đi" trong `ke-hoach-phat-trien.md`.

## 0. Nguyên tắc xếp bản

1. **Mục tiêu trước mắt: một ván chơi đi được từ đầu tới cái kết (lên ngôi) mà thấy hợp lý.** Mọi bản 6.5.x xếp theo câu hỏi: "thứ này có làm ván chơi tới cái kết bị vô lý, quá dễ, quá khó hay bị chặn không?". Có thì làm sớm, không thì để sau.
2. Nội dung mới (giang hồ, kỳ ngộ gia tộc, cốt truyện lớn, tăng số sự kiện) **lùi xuống sau cùng**, vì viết thêm sự kiện khi hệ nền còn lệch sẽ phải sửa lại.
3. Mỗi bản nhỏ, đủ để mày test tay. Tao chỉ chạy `node --check` và smoke ngắn. Báo cáo mỗi bản vẫn có `bao-cao-v<X>.md`.
4. Save cũ vẫn phải nạp được (`migrate`).
5. Các bản 6.5.1 tới 6.5.9 sửa theo ý mày. **Đo số liệu thật** làm ở 6.5.10, các con số trước đó là ước lượng.

## 1. Bảng tổng

| Bản | Chủ đề | Vì sao nằm ở vị trí này |
|---|---|---|
| **6.5.1** | Vua, thiên hạ và độ khó đường lên ngôi | Chặn việc game kết thúc sớm, sửa lỗi ending mà báo cáo test chỉ ra |
| **6.5.2** | Chức quan gắn với nơi ở, chiến công, quan võ | Hai đường lên ngôi (Quyền thần, Võ quan) đều đi qua quan trường; lỗi vị trí gây vô lý nhiều nhất |
| **6.5.3** | Quân ngũ: sự kiện theo cấp, gia đình người đi lính, việc học trong quân | Đường Võ quan, và lỗi nặng mày đã gặp khi test |
| **6.5.4** | Gia tộc: sinh con, gia quy, thần cấp, sức khỏe, gia thế | Nền cho nhiều đời; mốc gia thế và Hầu tước liên quan tới ending |
| **6.5.5** | Kinh tế: cơ sở kinh doanh, giao thương, nghề phụ, tiền theo quỹ | Quyết định tốc độ giàu, tức tốc độ tới ending |
| **6.5.6** | Học tập, nghề nghiệp, nữ nhi | Đa dạng con cháu, gồm cả người lên quan |
| **6.5.7** | Chỉ số: trí tuệ, mị lực, võ đạo, tuổi thọ; nhân vật khởi đầu | Chỉnh ảnh hưởng của chỉ số lên mọi thứ ở trên |
| **6.5.8** | Nhánh rẽ cho ba đường lên ngôi | Cần 6.5.1 đến 6.5.7 xong thì mới đặt được độ khó |
| **6.5.9** | Chia nhóm sự kiện và kỳ ngộ (đặt mã, rà soát bỏ/giữ) | Khung xương cho mọi nội dung sau |
| **6.5.10** | Đo: chạy tự nhiên từ lúc mở game tới ending, rồi cân bằng | Hệ nền đã đứng yên để đo |
| **6.5.11 trở đi** | Nội dung: thế lực tự phát, giang hồ, kỳ ngộ gia tộc, cốt truyện lớn, tăng số sự kiện | Làm vào khung đã chia ở 6.5.9 |

Sau cùng là giai đoạn hoàn thiện (mục 5 của `ke-hoach-phat-trien.md`) và mày đọc lại cả game.

---

## 2. Từng bản

### 6.5.1 · Vua, thiên hạ và độ khó đường lên ngôi

Lý do: nếu vua đầu yếu và thiên hạ loạn thì game có thể kết thúc quá sớm. Báo cáo test cũng chỉ ra vài lỗi.

1. **Vua đầu tiên cố định:** minh quân đa tài, thiên hạ hưng thịnh, niên hiệu **Trường Thịnh**, ở ngôi **40 đến 50 năm** (bốc ngẫu nhiên trong khoảng). Hết đời vua đầu mới dùng cách sinh vua như hiện nay.
2. **Cập nhật bảng vua và thiên hạ:** bỏ cập nhật theo tháng. Mỗi năm một lần hoặc khi có biến động (vua chết, loạn, đổi triều). Nhà có người làm quan ở kinh thành thì thấy bảng đủ. Không có thì chỉ nhận qua tin đồn và lời kể trong sự kiện ngẫu nhiên (chữ mơ hồ).
3. **Tăng độ khó ba đường lên ngôi.** Hướng của mày: chỉ người chỉ số xuất chúng và chọn khéo mới có tỉ lệ cao.
   - Giữ Võ quan khó với người trung bình (hiện 12%).
   - Kéo Khởi nghĩa xuống gần hai đường kia (hiện 65% với người trung bình, 81% với người mạnh). Bỏ bớt bonus +4 và +7 cứng ở bước cuối.
   - Mục tiêu tạm: người trung bình khoảng 10 đến 25%, người mạnh khoảng 40 đến 55%. Chỉnh thật ở 6.5.10.
4. **Sửa các lỗi báo cáo test nêu:**
   - Hậu sử không vượt 320 năm (cắt năm của triều cuối).
   - Sửa lời "bại thì cả họ không còn" ở `ts_v_cuoi` cho đúng thực tế (còn hộp cảnh báo, còn đường thoát, có chi xa thì tam tộc).
   - Người đang ở xa (`p.away`) vẫn được mở đường nhưng `lo` tăng (chờ mày chốt, xem mục 4).
   - Sửa thông báo về độ hiếm Đế vương chi tướng cho đúng xác suất thật (khoảng 1/22.000 mỗi đứa trẻ).
5. Dọn cấu hình treo `VACANCY` (khai báo nhưng không ai đọc).

Test: `node --check`, smoke 40 năm, chạy lại ba đường lên ngôi bằng admin, kiểm tra vua đầu là Trường Thịnh.

### 6.5.2 · Chức quan gắn với nơi ở, chiến công, quan võ

1. **Chức quan gắn đúng vị trí:** nhậm chức ở nơi nào thì nhân vật phải **thật sự ở nơi đó** trên bản đồ (hiện chức ở một nơi mà người thì không). 6.4.1.6 đã làm cho chi họ xa; bản này mở rộng cho mọi người nhậm chức, và sự kiện/kỳ ngộ lấy theo nơi ở (nối với 6.5.9).
2. **Chiến công:** mọi người bắt đầu từ 0 dù chức gì. Thêm nguồn chiến công cho cả quan võ đang đóng quân (không chỉ lúc có chiến tranh). **Đại tướng quân cần 1.500 chiến công.** Rà các chức lân cận cho hợp mốc.
3. **Quan võ cũng từ quan được** như quan văn (xin về hưu, cáo quan, hậu quả tương ứng).
4. **Trí tuệ trong thăng tiến quan võ:** người chỉ có võ không lên cao được. Chức từ một mốc trở lên đòi thêm trí (hoặc mưu) bên cạnh võ lực. Mốc đặt theo phẩm cấp.
5. Rà các chỗ vô lý khi nhậm chức (hồi tị, bỏ ghế, về hưu) xem còn sót gì.

Test: nhậm chức rồi kiểm tra vị trí bản đồ, thăng một quan võ lên Đại tướng quân qua admin, từ quan.

### 6.5.3 · Quân ngũ

Đây là lỗi nặng nhất mày đã gặp khi test.

1. **Gia đình người đi lính:** toàn bộ con cháu trong nhà gia chủ (chưa tách riêng) do người chơi điều khiển. 6.4.1.7 đã đưa lính nhà chính về do người chơi điều khiển; bản này rà lại vợ con, nhất là lỗi **con sinh ra có đứa theo cha, có đứa không**. Cần luật rõ: con sinh khi cha đóng quân thì theo ai, ở đâu.
2. **Bộ sự kiện và kỳ ngộ riêng cho quân ngũ**, tách khỏi sự kiện chung, và **tách riêng cho từng cấp** (binh sĩ, đội/đô, chỉ huy, tướng): cấp cao không gặp sự kiện cấp thấp. Bản này làm phần quân ngũ trước: gắn nhãn cho sự kiện hiện có, chặn sự kiện chung không hợp doanh trại, viết bổ sung phần thiếu. Hệ nhóm đầy đủ ở 6.5.9.
3. **Học trong quân:** con cháu ở quân ngũ chỉ học được trong quân. Đến 14 tuổi chọn cho con **tiếp tục học** hoặc **theo cha mẹ vào quân ngũ học nghề binh**.
4. Rà các mốc thăng của lính để đường Võ quan đi được từ binh sĩ.

Test: gia chủ vào quân cùng vợ con, chạy mười mấy năm xem con cái, tự động chọn và sự kiện có hợp không.

### 6.5.4 · Gia tộc: sinh con, gia quy, thần cấp, sức khỏe, gia thế

1. **Sinh con và gia quy:** đã đặt gia quy số con (ví dụ 3 hoặc 5) thì **tuyệt đối không sinh thêm**, kể cả qua sự kiện khác. Cooldown sinh con dài hơn (hiện sinh quá nhanh, nuôi không kịp).
2. **Gia quy:** không kèm chữ "tăng trưởng/phạt", không giải thích hậu quả khi vi phạm; chỉ cho biết quy ấy có tác dụng gì. Gia quy là phải tuân theo. Chỉ người ngỗ nghịch mới hay vi phạm, và ngỗ nghịch đổi theo cách nuôi dạy của bố mẹ và gia tộc (thêm chỉ số hoặc cờ "ngỗ nghịch" nối với nuôi dạy).
3. **Thần cấp:** không ai sinh ra đã mang danh hiệu thần cấp. Sinh ra chỉ có **thể và thế**, sau này đạt được mới chuyển thành thần cấp. Chuyển các trait thần cấp đang bốc lúc sinh sang cơ chế đó, và tự đổi cho người đang giữ trên save cũ.
4. **Danh hiệu sức khỏe:** sức khỏe chỉ giảm, không tăng, nên các danh hiệu sức khỏe là thứ **mang sẵn khi sinh ra**. Nhóm tuổi thọ giữ nguyên (thể chất bẩm sinh hoặc kỳ ngộ). Bỏ sự kiện vượt mốc 100 của sức khỏe.
5. **Điều kiện gia thế** (cộng thêm vào cách tính điểm hiện tại, không thay):
   - Tiểu hộ khá giả: có ít nhất 1 sản nghiệp kinh doanh.
   - Hương thân: có người làm quan.
   - Thế gia: đến đời thứ 3, có sản nghiệp, có người làm quan, thu nhập từ 50 bạc một tháng trở lên.
   - Thế gia vọng tộc: có người giữ tước **Hầu tước trở lên**.
6. **Đặc quyền danh vọng:** nâng mạnh các mốc từ "được nể" trở lên. Mốc vọng tộc kèm Hầu tước.
7. **Nhà chật:** khi đông người hoặc mức sống không đáp ứng thì nhắc gia chủ để nâng nhà.

Test: đặt gia quy số con rồi chạy 30 năm kiểm tra không ai sinh vượt; admin ép điều kiện để thử đổi bậc gia thế; kiểm tra save cũ có thần cấp bẩm sinh.

### 6.5.5 · Kinh tế

Mục tiêu: tiền không đổ về quá nhanh, dẫn tới chán và đạt ending dễ vì giàu.

1. **Cơ sở kinh doanh:** hiện mỗi cơ sở thu ít nhất 100 bạc một tháng, mở hết cỡ là dư tiền. Cần:
   - Nâng cấp cơ sở lên mức mới thì phải đạt **mốc thông thạo nghề**. Khi quản lý thì thông thạo tăng chậm, nên tốc độ giàu tự chậm lại.
   - Giảm thu nhập cơ sở. Năng suất nhân sự **giảm khi già**.
2. **Giao thương, đi buôn:** làm lại để đáng làm, vì hiện lợi nhiều nhất chỉ gấp đôi mà vẫn mất thời gian và rủi ro. Hướng: chuyến hàng theo vùng và mùa, lợi cao hơn khi biết đường, có thương đội, có mặt hàng hiếm. Tao đề xuất chi tiết ở đầu bản và hỏi mày trước khi viết.
3. **Nghề phụ và việc rảnh:** thu nhập và tăng chỉ số phụ thuộc nhiều vào **cần cù**, kèm tâm trạng (và chỉ số khác nếu hợp).
4. **Chi tiêu theo tiền:** các sự kiện và kỳ ngộ tiêu tiền tính theo **tổng tiền quỹ gia tộc hoặc tiền riêng** (tùy sự kiện), không còn theo cấp gia tộc. Bắt đầu rà từ nhóm tốn tiền nhất.

Test: chạy 20 năm bằng bot nhà buôn, so thu chi trước và sau.

### 6.5.6 · Học tập, nghề nghiệp, nữ nhi

1. **Học tập:** ghi rõ học nghề gì, với ai, kết quả gì. Hiện học theo cha mẹ hay theo người có nghề không thấy tác dụng.
2. **Đa dạng nghề trong gia tộc:** khi nhà đã có nhiều người theo một nghề thì con cháu muốn nghề khác. Thêm nghề để khỏi xoay quanh vài nghề.
3. **Nữ nhi:** bớt giới hạn việc học. Nữ nhi muốn thi cử chỉ khi **trí vượt 100 và tham vọng cao**, không nhiều. Giả nam đi thi có nguy cơ bị bắt, ảnh hưởng gia tộc; người thông minh và giỏi mưu thì ít bị bắt hơn.

### 6.5.7 · Chỉ số và nhân vật khởi đầu

1. **Trí tuệ** ảnh hưởng rộng hơn: kinh doanh, buôn bán, ứng đối, giảng dạy, mưu trí (hiện chủ yếu khoa cử, y tế, mưu).
2. **Võ đạo** cần trí: võ lực giữ như hiện tại, nhưng đường võ cao cần trí (vào quan võ ở 6.5.2, bản này nối với tăng trưởng võ).
3. **Mị lực** bớt ảnh hưởng giao tiếp. Giao tiếp chủ yếu theo trí tuệ, EQ, khẩu tài. Xấu thì giao tiếp khó hơn một chút, đẹp thì thu hút hơn một chút.
4. **Sức khỏe, tuổi thọ:** có mốc bẩm sinh, thể chất tăng thọ vẫn giữ (khớp 6.5.4).
5. **Nhân vật khởi đầu** của người chơi có ít nhất 1 đến 2 chỉ số trên 60. Tiềm năng của con tính theo hệ số bố mẹ **vào lúc mang thai**.
6. Các chỉ số còn lại (EQ, tâm trạng, cơ duyên và bốn chỉ số còn lại) giữ nguyên. Tính cách giữ nguyên tới v7.
7. Rủi ro cộng dồn TAM, SUC, DUYEN, `S.on`, `S.hung` và trait trong `prob()`: chỉ **đo ở 6.5.10** rồi mới quyết có chỉnh hay không.

### 6.5.8 · Nhánh rẽ cho ba đường lên ngôi

Theo ý mày: tăng độ khó, tăng cốt truyện và nhánh rẽ, để người chọn khéo mới thắng.

1. Mỗi đường thêm các **nhánh tùy lựa chọn**: ví dụ bước kết bè chọn phe nào thì mở đường khác ở bước sau; đồng minh khác nhau mở sự kiện khác nhau.
2. Thêm **cái thắng và cái thua nhiều dạng** (thắng nhờ nhượng, thắng nhờ binh biến, thắng nhưng danh nghĩa mỏng, thua nhưng giữ được người) để hậu sử không chỉ một kiểu.
3. Tăng số bước mỗi đường (hiện 7, 9, 7) và kiểm tra theo lựa chọn trước.
4. Nối với bảng thiên hạ và vua ở 6.5.1.

Cần 6.5.1 đến 6.5.7 xong thì mới đặt được độ khó cho hợp.

### 6.5.9 · Chia nhóm sự kiện và kỳ ngộ

Mày yêu cầu tao xem kỹ sự kiện nào đưa vào, sự kiện nào bỏ, chia nhiều nhóm hơn, giảm trùng lặp và thiếu hợp lý. Đề xuất:

**Sự kiện — ba trục.** Mỗi sự kiện có mã nhóm dạng `<trục>.<nhóm>.<nhóm nhỏ>`.
- **Trục nghề:** theo nghề (nông, thương, thợ, y, học, quan văn, quan võ, lính, tăng đạo…), trong nghề chia theo vị trí/cấp.
- **Trục nơi và thời thế:** theo vùng, và theo trạng thái: thái bình, sắp có chiến tranh, đang chiến tranh, sau chiến tranh, dịch bệnh, sau dịch, hạn hán, lũ, mất mùa…
- **Trục chung:** sự kiện **ai cũng có thể gặp** (gia đình, sinh tử, hôn nhân, bệnh tật, học hành…). Đây là nhóm mày muốn lọc kỹ nhất.

**Kỳ ngộ — chia khác.** Chia theo **loại cơ duyên**, không theo nghề: võ học, y thuật, học vấn, tài lộc, nhân duyên, cổ vật và bảo vật, kỳ nhân, tuổi thọ, gia tộc (cho kỳ ngộ gia tộc ở 6.5.11). Mỗi kỳ ngộ ghi thêm điều kiện nơi chốn và cấp.

**Việc làm trong bản này:**
1. Quét toàn bộ sự kiện hiện có, gán mã nhóm tự động theo nghề, vùng, trạng thái.
2. Lập bảng **bỏ/giữ/sửa**: sự kiện nào ở sai nhóm, trùng, hay thiếu hợp lý. Gửi mày duyệt trước khi bỏ.
3. Chặn theo nhóm trong `eligible()` (quân ngũ không gặp sự kiện dân sự, cấp cao không gặp sự kiện cấp thấp…).
4. Ghi quy ước đặt mã vào `CLAUDE.md` cho sự kiện viết sau.

Mày nói sẽ đưa điều chỉnh chia nhóm sau. Tao dựng bảng đề xuất ở đầu bản, mày sửa là được.

### 6.5.10 · Đo và cân bằng

1. Chạy mô phỏng **tự nhiên** nhiều seed: tạo gia tộc mới, chạy full `advance()`, xử lý hàng đợi theo vài chính sách; đo năm đạt Nhất phẩm, Đại tướng quân, Võ Thần, Đế vương chi tướng, rồi năm tới ending và tỉ lệ thắng.
2. Đo các rủi ro trong audit: snowball cơ duyên, hệ số tiền theo gia thế, thưởng chỉ số gia chủ, cộng dồn trong `prob()`.
3. Sau khi đo mới chỉnh. Mục tiêu: ván tự nhiên có tỉ lệ tới ending thấp nhưng có, và mất nhiều đời.

### 6.5.11 trở đi · Nội dung

Chia thành các bản nhỏ, làm vào khung nhóm ở 6.5.9:
- Thế lực tự phát (sơn tặc, thổ phỉ, thủy tặc, nghĩa quân, nông dân khởi nghĩa) theo thế sự và hoàng vị.
- Giang hồ: môn phái chính, tà, trung lập tự đặt tên; cấp bậc từ tam lưu đến đại tông sư; bí kíp, tẩu hỏa nhập ma, anh hùng đại hội.
- Kỳ ngộ gia tộc: gia chủ quyết, thành bại tính theo cả thành viên liên quan.
- Cốt truyện lớn: 20 đến 30 cái, mỗi cái 5 đến 20 bước, 2 đến 4 kết, con nối chuỗi của cha.
- Tăng dần số sự kiện (hiện khoảng 1.265) và kỳ ngộ tới mục tiêu.
- Quân hộ, Thiết khoán, Đông xưởng (kèm bản thích hợp).
- Nâng cấp ân oán Phạm Trung Kiên khi mày bảo.

---

## 3. Việc còn treo ngoài các bản trên

Giai đoạn hoàn thiện như `ke-hoach-phat-trien.md` mục 5: chỉ số vượt 100 (đã có trần mềm), tách `engine.js`, Escape và tiêu điểm trong hộp thoại, `<head>` HTML, tập ấm cho con quan, nghĩa vụ và rủi ro đi kèm tước.

## 4. Cần mày chốt (không chặn việc bắt đầu 6.5.1)

1. **Người đang ở xa có được mở đường lên ngôi không?** Tao đề xuất: được, nhưng `lo` tăng.
2. **Sau khi vua Trường Thịnh qua đời**, vua kế vị bốc ngẫu nhiên như hiện nay hay vẫn mặc định minh quân? Tao đề xuất bốc ngẫu nhiên, hưởng một phần nền hưng thịnh.
3. **40 đến 50 năm của vua** tính từ lúc mở game (vua đã ở ngôi sẵn, còn 40 đến 50 năm) hay từ lúc đăng cơ? Tao đề xuất từ lúc mở game.
4. **Giao thương (6.5.5):** tao đề xuất thiết kế chi tiết rồi hỏi mày trước khi viết.
5. **Bảng chia nhóm (6.5.9):** mày tự gửi trước, hay để tao dựng đề xuất rồi mày sửa?

---

## 5. Đã chốt và đã làm

**Chốt 11/11/2026:** (1) người ở xa vẫn được mở đường lên ngôi nhưng lộ tăng; (2) vua thứ hai là vua lên ngôi sau tranh giành căng thẳng (anh em ruột, anh em họ, chú cháu), vua thứ ba trở đi bốc ngẫu nhiên; (3) 40 đến 50 năm của vua đầu tính từ lúc mở game; (4) làm 6.5.1 trước, giao thương đề xuất sau; (5) tao dựng bảng chia nhóm đề xuất rồi mày sửa.

**6.5.1 đã làm** (xem `bao-cao-v6.5.1.md`). Còn treo từ bản này: bảng vua vẫn tính tầm nhìn theo phẩm quan, chưa theo chức ở kinh thành (chờ 6.5.2); hai bonus cứng ở bước cuối của Võ quan và Khởi nghĩa chưa bỏ; chưa đo lại tỉ lệ thắng (6.5.10).
