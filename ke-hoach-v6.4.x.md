# Bách Niên Thế Gia · Ghi chú cho gói cập nhật nhỏ 6.4.x

Ghi ngày 2026-11-07, sau khi v6.4 (quan trường theo ghế, quan võ, triều Đại Nguyễn) đã xong và đẩy lên nhánh `v6.4`.
Đây là ghi chú ý tưởng, **chưa có dòng code nào của 6.4.x được viết**. Mục A và C đã được mày đồng ý hướng làm; mục B là ý tưởng chưa chốt.

Nguyên tắc đang áp dụng: chỉ test khi mày yêu cầu (kiểm cú pháp và khởi động ngắn thì được, phải nói rõ); không merge vào `main` (main đang là v6.3); không làm báo cáo nữa; việc xong thì đẩy lên GitHub. Tới v6.5 hướng tới ít nhất 5000 sự kiện và 500 kỳ ngộ, tăng dần qua từng gói.

---

## A. Đã đồng ý, làm trong 6.4.x

### A1. Nút "Bỏ thi / rút tên"
- Hiện trạng: `register(c)` đặt `c.exam={stage:0,scores:[]}` và người đã ứng thí văn không có cách nào hủy.
- Làm: nút "Rút tên" trên bảng nhân vật và trong cửa sổ thi. Xóa `c.exam`, đặt cờ nghỉ thi (cooldown một vài khoa) để không tự ứng thí lại ngay, tâm trạng giảm nhẹ. Tiền lộ phí đã chi thì không hoàn.
- Áp dụng cả thi văn lẫn thi võ.
- Chỗ cần xem lại: `register`, `examPopup`, `finishExam`, `c.flags.noExam` (engine.js khoảng 886–922, 336, 3114).

### A2. Nút "Ứng thí võ cử"
- Hiện trạng: võ cử chỉ xảy ra qua sự kiện ngẫu nhiên `qn631_vo_cu` (ev-v631a.js:147), không có nút chủ động.
- Làm: nút "Ứng thí võ cử" cho nam đủ tuổi và đủ võ lực, có kỳ thi riêng. Đỗ thì được xét vào hệ ghế quan võ của v6.4 (bậc đầu là Bách hộ).
- Còn mở: ngưỡng võ lực, có chia võ cử nhân và võ tiến sĩ không, kỳ thi tháng nào. Gắn tiếp với mục B3 (võ cử đầy đủ).

---

## B. Ý tưởng đã bàn, chưa chốt

### B1. Nghề Thái y lệnh / Ngự y
- Hiện trạng: đạt thông thạo 120 thì gần như hết nội dung tiếp theo (ev-nghe.js:292–310).
- Đề xuất: nối với ghế "Thái y viện" trong hệ ghế v6.4. Thêm sự kiện chữa bệnh cho hoàng tộc, soạn y thư, mở y quán, nhận học trò. Thêm danh hiệu riêng cho người đạt đỉnh nghề. Có thể cho gia tộc bớt chết bệnh nhờ có thầy thuốc giỏi.

### B2. Chỉ số 150
- Hiện trạng: các mốc chặn là `GATES=[100,120,140]`, sau đó 150, rồi 200. `hardCap` là 150 trừ khi `c.g200`. Ở 150 chỉ có danh hiệu (`STITLE`) và một sự kiện Thiên cơ rất hiếm.
- Đề xuất: popup báo rõ khi chạm trần 150, mỗi chỉ số có sự kiện Thiên cơ riêng, và nói rõ cách mở trần 200.

### B3. Các việc đã hoãn khỏi v6.4
- Tước vị (hiện chỉ có hệ tước cũ).
- Đại Minh luật (luật của triều).
- Học việc từ 14 tuổi.
- Quân hộ và ấm sinh.
- Võ cử đầy đủ (ngoài nút ở A2).
- Cân bằng lương bổng và tốc độ thăng quan: v6.4 mới chỉ kiểm cú pháp và khởi động ngắn, chưa chơi thử dài nên số liệu chưa được kiểm.
- Trùng họ Nguyễn: triều đại là Đại Nguyễn, vua đầu Nguyễn Thành Trung, trong khi nhiều dòng họ và nhân vật cốt truyện cũng họ Nguyễn. Cần xem có nên đổi một phía hay thêm cách phân biệt.

### B4. Mục tiêu số lượng cho 6.5
Tối thiểu 5000 sự kiện và 500 kỳ ngộ, thêm dần qua các gói nhỏ.

---

## C. Gia phả: giữ lại vợ/chồng cũ khi tái hôn

### C1. Lỗi hiện tại (đã xác định trong code)
- `mkSpouse(c,free,o)` (engine.js khoảng 1214) gán `c.spouse=p.id`, ghi đè người cũ.
- `treeHTML(p)` (khoảng 3062) chỉ vẽ một người qua `spouseOf(p)`, nên người cũ rơi khỏi cây dù họ vẫn còn trong `S.people`.
- Người đã mất vẫn giữ `spouse` trỏ về người còn sống, nhưng cây không đi theo hướng đó.
- Con cái thì **đã đúng**: `parents` của mỗi đứa chứa cả cha lẫn mẹ ruột, nên vẫn biết con của bà nào. Chỉ phần vẽ là sai.
- Các chỗ dùng `.spouse` trong engine.js: 19 chỗ, ngoài ra ev-chung.js (3), ev-tinh.js (3), ev-cot.js, ev-v62.js, ev-v635a.js, ev-v64.js (2). Giữ `c.spouse` là "người hiện tại" để không phải sửa hết.

### C2. Nghiên cứu: xưa ghi vợ trong gia phả thế nào
Điều có nguồn:
- Gia phả ghi vợ theo thứ bậc **chánh thất, kế thất, thứ thất…**, và nếu một người có nhiều vợ thì **ghi rõ con của bà nào** (mytour.vn).
- Chánh thất (vợ cả) là bà vợ đầu cưới theo lễ nghi, lo nội trợ và đứng trên các vợ khác của chồng, kể cả người cưới trước bà (Znews).
- Kế thất là vợ cưới chính thức sau khi vợ cả mất (tục huyền), quyền ngang chính thất (Znews).
- Thứ thất / vợ lẽ / thiếp chịu sự quản lý của vợ cả; người đầu tiên sau vợ cả gọi là vợ hai. Nàng hầu cũng thuộc hàng vợ lẽ nhưng không có lễ cưới, có thể là con gái bị gán nợ hoặc do vợ cả bỏ tiền mua về (Znews).
- Gia phả Trung Hoa (jiapu) ghi vợ rất sơ lược, thường chỉ ghi họ, và con gái ít được ghi (FamilySearch).
- Ở Trung Hoa thời Thanh, thiếp có thể được nâng lên làm vợ nếu vợ đã mất và thiếp là mẹ của những người con trai duy nhất còn sống. Con thiếp xếp dưới con chính thất, trên con ngoài giá thú, và phải hiếu kính cả mẹ ruột lẫn vợ chính của cha (Wikipedia, Concubinage in China).

Điều **không tìm được nguồn**, nên không đưa vào game như thể là sự thật lịch sử:
- Cách gia phả Việt ghi thiếp và nàng hầu cụ thể (nguồn tìm được chỉ nói chánh thất, kế thất, thứ thất).
- Cách ghi người phụ nữ góa tái giá.
- Địa vị pháp lý của con vợ lẽ trong luật Lê và luật Nguyễn.
- Cách xếp thứ bậc thừa kế giữa con đích và con thứ ở Việt Nam.
Những điểm này trong thiết kế dưới đây là **quy ước của game**, không phải tái hiện lịch sử.

### C3. Thiết kế đề xuất
Dữ liệu:
- Thêm `c.sph=[{id,k,t0,t1,e}]`, danh sách hôn nhân theo thứ tự thời gian.
  - `k`: `chanh` (chính thất), `ke` (kế thất), sau này có thể thêm `thu` (thứ thất).
  - `e`: `mat` (người kia mất), `ly` (ly hôn), `taigia` (góa phụ tái giá rời nhà), hoặc rỗng nếu còn.
- `c.spouse` vẫn là người hiện tại hoặc người cuối cùng, giữ nguyên cho các chỗ đang dùng.
- Hàm mới: `spousesOf(c)` trả về danh sách theo `sph`, nếu cũ chưa có thì dựng từ `c.spouse`.
- `mkSpouse`: đẩy mục mới vào `sph` của cả hai người. Nhãn: lần đầu là chính thất; sau khi vợ cũ **mất** là kế thất; sau khi **ly hôn** gọi là chính thất mới (đây là quy ước của game, chưa có nguồn).
- `die(c)`: đóng mục cuối của người còn sống (`t1`, `e:'mat'`). Ly hôn (khoảng engine.js 2732) đóng với `e:'ly'`.

Hiển thị cây gia phả:
- Hàng vợ chồng: `[Người] ⚭ [chính thất †1208] ⚭ [kế thất]`, mỗi người kèm nhãn nhỏ chánh/kế và năm mất. Người đã mất hoặc đã ly thì mờ đi. Cho phép hàng này xuống dòng hoặc cuộn ngang để không tràn trên điện thoại.
- Con cái xếp theo mẹ ruột (hoặc cha ruột nếu người gốc là nữ), có nhãn "con bà X" khi có từ hai đời vợ chồng trở lên.
- Bảng nhân vật: thêm dòng "Vợ/chồng: … (chính thất, mất 1208), … (kế thất)".
- Quan hệ: người vợ sau gọi là "kế mẫu / mẹ kế" với con của vợ trước, người cũ ghi là "vợ/chồng đã mất" ở `relOf` (khoảng engine.js 1453).

Cũ → mới (cứu save cũ), làm trong hàm migrate như `w64Migrate`:
- Với mỗi người x có `x.spouse=y` mà `y.spouse≠x.id`, thêm x vào `sph` của y như vợ/chồng trước, đã mất nếu x đã mất. Cách này cứu được những người vợ đã bị ghi đè nhưng đã chết.
- Trường hợp ly hôn trước đây thì dây nối đã bị xóa (`spouse=null` ở cả hai), không cứu được.
- Mọi người còn lại có `spouse` mà chưa có `sph` thì dựng mục chính thất.

Trường hợp biên cần xử lý:
- Góa phụ (người gốc là nam đã mất) tái hôn: chồng sau cũng là dâu rể (`inLaw`), mà cây chỉ đi từ người gốc huyết thống, nên cần nối thêm "người chung sống sau" sau người đã mất, kèm con chung của họ (hai cha mẹ đều `inLaw` nên hiện không có nhánh nào vẽ chúng).
- Luật nữ tắc (`remarryOk`, engine.js 2466): góa phụ dưới 55 tuổi khi bật luật này không được tái hôn, đã chặn sẵn.
- `Chủ mẫu / Phu quân gia chủ` (engine.js 1127) dùng `h.spouse===c.id`, tự đúng với người hiện tại.
- `fam()` khi nhậm chức dắt gia đình (engine.js 1331) chỉ lấy người hiện tại, tự đúng.

Sự kiện nhỏ có thể kèm theo (cộng vào chỉ tiêu số lượng): mẹ kế với con chồng (hòa thuận hoặc bất hòa), giỗ vợ trước khi đã có kế thất, kế thất ra mắt gia tộc.

### C4. Câu hỏi để mày chốt trước khi làm
Có cho **thứ thất / thiếp** (đa thê) trong game không?
- **Phương án 1, đề xuất cho 6.4.x:** chỉ có chính thất và kế thất. Mỗi lúc chỉ một vợ hoặc chồng còn trong nhà; người cũ được giữ trong gia phả. Sửa nhỏ: chủ yếu là `sph` và `treeHTML`.
- **Phương án 2, để 6.5:** thêm thứ thất cho nhà giàu, quan lớn. Phải sửa mọi chỗ giả định "chỉ một vợ", gồm thụ thai (engine.js 512 chọn bà nào), tình cảm, ly hôn, dắt gia đình đi nhậm chức, cùng luật con đích và con thứ, và mất tâm trạng giữa các bà. Nặng hơn nhiều và dễ phát sinh lỗi.

---

## Nguồn dùng cho phần C2
- Znews, [Những tập tục liên quan tới vợ chồng xưa](https://znews.vn/nhung-tap-tuc-lien-quan-toi-vo-chong-xua-post1569705.html)
- mytour.vn, [Dòng họ](https://mytour.vn/vi/blog/bai-viet/dong-ho.html)
- FamilySearch, [What is a Clan Genealogy Book?](https://edge.fscdn.org/en/chinese/research/jiapu)
- Wikipedia, [Concubinage in China](https://en.wikipedia.org/wiki/Concubinage_in_China)
- Báo Pháp luật, [Giữ gìn văn hóa Việt - Góc nhìn từ gia phả](https://baophapluat.vn/giu-gin-van-hoa-viet-goc-nhin-tu-gia-pha-post547927.html) (đọc rồi nhưng bài **không** nói cách ghi từng bà vợ; chỉ cho biết gia phả có chứa thông tin về phụ nữ)
