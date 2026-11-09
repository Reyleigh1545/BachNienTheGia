# Báo cáo v6.4.1.6 (09/11/2026)

Bản thứ sáu trong chuỗi 6.4.1.x, trên nền v6.4.1.5.1. Nội dung theo `ke-hoach-phat-trien.md` mục 6 (bản 6.4.1.6), mục 11 và 15 của `ke-hoach-v6.4.1.1.md`, và phần 3, 4 của file gợi ý 6.4.1.5.
- Nhánh `v6.4.1.6`, tách từ `v6.4.1.5.1`. Gói zip có thư mục gốc `BachNienTheGia-v6.4.1.6/`.
- 24 sự kiện mới trong tệp mới `ev-v6416.js`: 11 tình duyên, 10 chi họ xa, 3 gia đình người đi lính. Tổng khoảng 1.099 lên khoảng 1.123. Không thêm kỳ ngộ.
- Save cũ vẫn mở được.

**Về kiểm thử.** Mày tự test, nên tao chỉ làm mấy việc sau:
- `node --check` toàn bộ tệp: đạt.
- Cho máy tự chơi 40 năm: 0 lỗi script, kiểm tra bất biến sạch.
- Gọi ép từng sự kiện mới, cho máy bấm ngẫu nhiên. Có 3 lỗi khi sự kiện bị gọi lúc không còn chi nào đủ điều kiện. Đã sửa.
- Thử riêng:
  - Lập chi ở nơi nhậm chức: chi có nơi ở, hiện trên bản đồ, gửi quỹ về.
  - Hết nhiệm kỳ thì hỏi về nhập nhà chính hay ở lại.
  - Vợ theo lính vào trại.
  - Lính về phép cưới vợ.
  - Mối tình đi qua các bước.

Chưa thử: một mối tình đi trọn tới đám cưới trong ván thật, vì máy chọn ngẫu nhiên nên lần thử dừng ở bước nảy sinh. Mày chơi xem.

## 1. Các điểm và kết quả

| Điểm | Kết quả |
|---|---|
| Tình duyên tách khỏi hôn nhân, có tiến trình nhiều bước | Mục 2 |
| Mở đầu tình duyên chỉ cho người 18 đến 25 tuổi, có tài, có đức | Mục 2 |
| Tính cách quyết định ai dễ rung động | Mục 2 |
| Lập chi họ ở nơi nhậm chức xa | Mục 3 |
| Chi họ xa hiện trên bản đồ | Mục 3 |
| Chi họ tự quản, độc lập, gắn bó với chính họ | Mục 3 |
| Người đi lính đưa vợ con theo | Mục 4 |
| Cưới vợ khi lính về phép | Mục 4 |
| Tỉ lệ có con của người đi lính | Mục 4 |

## 2. Tình duyên

**Ai được bắt đầu một mối tình.** Phải đủ cả bốn điều:
- 18 đến 25 tuổi, chưa vợ chồng, đang ở nhà.
- **Có tài:** một chỉ số chính từ 70, hoặc danh vọng cá nhân từ mốc "Có tiếng tăm", hoặc đã đỗ đạt.
- **Có đức:** trung bình hiếu thuận, thật thà, rộng lượng, tiết chế từ 60.
- **Tính cách:** người hòa đồng, buông thả dễ rung động hơn. Người cô độc, tiết chế khó hơn. Người tham vọng lớn bớt mơ mộng. Khả năng từ 10% đến 90%.

Bộ lọc này áp cho cả sự kiện mới lẫn 8 sự kiện mở đầu cũ: Gặp gỡ ngày hội, Lá thư không ký tên (hai sự kiện), Tình địch, Thanh mai trúc mã, Cành vàng lá ngọc, chuỗi Thương Tâm Từ, chuỗi Lạc Nhạn. Người đủ điều kiện gặp các sự kiện này dày hơn 30%, bù cho việc ít người đủ điều kiện. Các bước sau của một chuỗi đã mở vẫn chạy tiếp dù người ấy quá 25 tuổi.

Như kế hoạch, mai mối, hỏi cưới thường và chuyện vợ chồng không bị bộ lọc này chặn.

**Tiến trình mới:**
1. **Một lần gặp gỡ:** ở hội làng, chùa, phiên chợ, bến đò, đám cưới hàng xóm. Người kia được sinh ra có tên, họ, tính nết, tài sắc, gia thế. Sáu phần mười là con cháu một họ có thật trong vùng. Lựa chọn:
   - bắt chuyện;
   - lặng lẽ nhìn theo;
   - không để tâm.
2. Nếu không dám nói thì thành **Tương tư**: viết thư thổ lộ, hoặc chôn chặt trong lòng.
3. **Qua lại:** hẹn gặp riêng (có thể bị người làng bắt gặp, đồn tới gia chủ), gửi thư, tặng quà bằng tiền riêng.
4. **Tình ý:** thổ lộ hoặc chờ thêm.
5. **Xin cưới người thương.** Gia chủ được biết nhà bên kia cao hay thấp hơn nhà mình bao nhiêu bậc, quan hệ hai họ, tính nết người ấy. Gia chủ chọn một trong ba:
   - **cho thành thân:** chênh nhau từ 3 bậc thì mất chút danh vọng;
   - **bắt chờ, lập nghiệp trước:** hai năm sau quyết lại;
   - **cấm:** người tự lập cao mà kém hiếu thuận có thể bỏ nhà đi theo người thương. Người khác thì nghe lời nhưng buồn lâu, và có khi nhiều năm sau gặp lại.
6. **Ngã rẽ:** xin lại lần nữa, bỏ trốn theo nhau, hoặc chia tay. Nếu người yêu là gia chủ thì tự quyết luôn.
7. **Xa cách:** nhà kia dời đi. Hẹn chờ thì có thể **tái ngộ** sau 2 đến 5 năm.
8. **Sau khi cưới:**
   - Cưới vì sắp đặt (cưỡng ép, chính trị, lợi ích, nhà sa sút) mà tình cảm thấp thì có thể "lâu ngày sinh tình".
   - Cưới vì thương mà tình nhạt thì có "tình phai": ngồi lại nói chuyện, hoặc mỗi người một góc.

Cưới người thương thì tình cảm vợ chồng bắt đầu cao. Nếu người kia là con cháu một họ trong vùng thì hai họ thành thông gia (như 6.4.1.5).

Thành viên chi họ và người đang ở xa thì tự quyết các bước theo tính cách. Hộp xin cưới thì luôn đến tay gia chủ.

## 3. Chi họ xa

**Lập chi ở nơi nhậm chức.** Khi một người (không phải gia chủ) được bổ đi xa, hộp nhậm chức có thêm lựa chọn **"Cả nhà dọn đến, lập chi họ ở …"**:
- Lập một chi mới, ghi tỉnh chi ở. Vợ con theo về chi, nửa tiền riêng của người làm quan thành quỹ chi.
- Lương quan vào quỹ của chi. Chi tự lo ăn tiêu.
- **Gia chủ không có lựa chọn này.** Gia chủ vốn không bị điều đi xa.

**Mỗi năm** chi xa gửi một phần quỹ về công quỹ, từ 0% đến 20%. Tỉ lệ tùy lòng hiếu thuận của chi chủ và mức gắn bó. Chi độc lập thì không gửi.

**Hết nhiệm kỳ, hoặc người lập chi mất chức hay qua đời,** chi chủ được hỏi:
- **về nhập lại nhà chính:** quỹ chi về công quỹ;
- **ở lại thành chi định cư.**

**Nhà chính dời đi nơi khác** thì chi xa không đi theo, cơ sở làm ăn của chi cũng không bị bán.

**Bản đồ:** tỉnh có chi họ ở thì có thêm dấu ⌂ cạnh tên tỉnh. Rê chuột lên dấu thì hiện tên các chi.

**Gắn bó và tự lập.** Mỗi chi xa có mức gắn bó với chính họ. Giúp chi lúc khó thì gắn bó tăng. Đòi nộp nhiều, từ chối viện trợ thì giảm. Gắn bó xuống dưới 30 thì chi có thể xin tách ra thành **chi độc lập**: không nộp gì, chính họ không sai bảo được.

**10 sự kiện:**
- Chi chủ: dân địa phương cầu kiến; dựng nhà mới; họ địa phương muốn kết giao; quan trên địa phương gây khó; con cháu chi lấy người bản địa; chi gặp thiên tai.
- Gia chủ: chi xa xin viện trợ; đòi chi xa đóng góp; chi xa muốn tách ra; chi xa lớn mạnh hơn chính họ.

## 4. Gia đình người đi lính

- **Vào quân ngũ mà đã có vợ:** gia chủ được hỏi đưa vợ con theo vào trại gia binh, hay để ở quê. Người theo vào trại được ghi "đang theo … ở trại gia binh". Nhà không phải nuôi họ, người lính lo.
- **Về phép:** mỗi năm người lính có khả năng được về phép một tháng, 35%, thời chiến 15%.
  - Chưa vợ thì có thể **cưới vợ nhân dịp phép**, cưới xong đưa vợ theo hoặc để vợ ở quê.
  - Đã có vợ ở quê thì vợ chồng đoàn tụ, hoặc lần này đưa cả nhà theo.
- **Có con:**
  - Vợ theo vào trại: vẫn có con, nhưng khả năng còn 60%.
  - Vợ ở quê: chỉ có con trong tháng chồng về phép hoặc tháng vợ lên thăm. Tháng ấy khả năng cao hơn bình thường một chút.
  - Trước bản này, người lính có vợ ở quê thì không bao giờ có con.
- **Vợ lính ở quê** có sự kiện riêng: viết thư cho chồng, hoặc lặn lội lên thăm.
- Người đi lính về quê thì vợ con theo trong trại cũng về.

## 5. Save cũ

- Mở được.
- Chi họ cũ chưa có nơi ở riêng, coi như ở cùng nhà chính.
- Người đang yêu theo các chuỗi cũ không bị ảnh hưởng. Bộ lọc chỉ áp cho sự kiện mở đầu.

## 6. Tệp thay đổi

- Mới: `ev-v6416.js` (24 sự kiện).
- `engine.js`:
  - chi họ xa (lập chi, gửi quỹ, hết nhiệm kỳ, bản đồ, dời nhà);
  - gia đình người lính (theo vào trại, về phép, có con);
  - bộ lọc và người yêu của tình duyên;
  - dòng "theo ở trại gia binh"; chữ phiên bản.
- `index.html`, `admin.html`, `admin.js`: nạp tệp mới, dòng phiên bản.

## 7. Còn lại cần mày biết

- **Chi họ xa vẫn dùng các họ khác ở nơi nhà chính đang sống.** Họ địa phương nơi chi ở chưa có hồ sơ riêng. Sự kiện kết giao của chi chỉ ghi một mức quen biết đơn giản. Làm đầy đủ thì cần sinh danh sách các họ cho tỉnh của chi. Mày muốn thì tao làm ở bản sau.
- Lựa chọn lập chi nằm trong hộp nhậm chức xa dùng chung cho các ghế quan. Tao mới thử với quan văn, chưa thử với quan võ có ghế.
- Mọi con số đều là phỏng đoán: khả năng về phép, tỉ lệ gửi quỹ, mức gắn bó để đòi tách.
- Bản tiếp theo: **6.4.1.7**, gồm:
  - trạng thái hoàng đế, cùng tuyến thanh trừng và tranh đoạt hoàng quyền của file quan trường;
  - danh hiệu cấp Thần gộp với thiên mệnh, kèm sự kiện vượt mốc đa dạng theo từng mốc;
  - thời thế, chiến tranh tại nơi ở.
