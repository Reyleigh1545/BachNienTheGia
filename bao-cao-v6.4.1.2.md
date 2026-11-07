# Báo cáo v6.4.1.2 (07/11/2026)

Bản thứ hai trong chuỗi 6.4.1.x, làm trên nền v6.4.1.1. Nội dung là cân bằng độ khó theo góp ý của người chơi thử (`ke-hoach-v6.4.1.1.md`, dòng 6.4.1.2 trong bảng thứ tự). Bản này gộp thêm ý mới của mày về người trông cơ sở và quản trị.
Mã nguồn ở nhánh `v6.4.1.2`, tách từ `v6.4.1.1`. Gói zip có thư mục gốc `BachNienTheGia-v6.4.1.2/`.
Sự kiện: không thêm, không bớt. Có sửa câu chữ ở 20 chỗ phong tước (mục 4) và ở sự kiện "Vinh quy bái tổ".
Save cũ vẫn mở được (xem mục 9).

**Về kiểm thử.** Mày tự test nên tao chỉ làm mấy việc sau:
- `node --check` toàn bộ tệp `.js`: đạt.
- Cho máy tự chơi `admin.html` 40 năm trong Chrome chạy ngầm: 0 lỗi script, kiểm tra bất biến sạch.
- Thử riêng từng phần mới trên trang admin, kết quả đúng như dự tính:
  - Mở cơ sở: thông thạo giữ nguyên.
  - Sổ lương cuối năm, tự tuyển bù.
  - Ghi công rồi phong tước, ruộng tước.
  - Hậu bổ rồi bộ Lại gọi nhậm chức.
  - Khoa thi Hương xếp hạng.
  - Chặn bậc Thế gia.
  - Lãi Thương hội có chủ giỏi.

Chưa thử là cân bằng thật trên một ván dài có gia đình đông: máy tự chơi không tự cưới vợ cho gia chủ (bản 6.4.1.1 cũng vậy). Cái này mày chơi mới thấy được.

## 1. Các điểm và kết quả

| Điểm | Kết quả |
|---|---|
| Người trông cơ sở và người mở cơ sở phải cùng nghề (ý mới) | Mục 2 |
| Quản trị tăng theo chức vụ, làm chủ thì +1 mỗi năm, ngưỡng 35 (ý mới) | Mục 2 |
| Kinh doanh 12.2: giữ thông thạo khi làm chủ | Mục 2 |
| Kinh doanh 12.3: điều kiện mở cơ sở | Mục 2 |
| Kinh doanh 12.4: lãi, phương án A | Mục 3 |
| Kinh doanh 12.5: bớt hộp thoại người làm | Mục 3 |
| Khoa cử | Mục 5 |
| Tước, kèm lỗi ruộng tước dồn qua các đời | Mục 4 |
| Bậc gia tộc | Mục 6 |
| Nhãn danh vọng cá nhân | Mục 7 |
| Bớt hộp sự kiện, giới hạn mỗi năm | Mục 8 |
| Bỏ tác dụng gia tộc của danh hiệu chỉ số | Mục 7 |
| Dòng phiên bản | `v6.4.1.2` (và `· admin` ở trang admin) |

## 2. Người làm chủ cơ sở và quản trị

**Ai được mở cơ sở và ai được trông cơ sở.** Hai việc dùng chung một điều kiện:
- Từ 18 tuổi.
- **Đang làm nghề hợp với cơ sở**, thông thạo nghề ấy từ 50.
- **Quản trị từ 35** (trước 50).

Điều kiện cũ "nghề X ở bậc Y" bỏ. Áp dụng cả khi người nhà tự đòi ra riêng mở cơ sở.

| Cơ sở | Nghề được nhận |
|---|---|
| Quán trà | Tiểu nhị, bán hàng rong, đầu bếp |
| Hiệu buôn | Tiểu nhị, bán hàng rong |
| Xưởng | Thợ thủ công, dệt thêu |
| Y quán | Y, bà đỡ |
| Trường | Dạy học |
| Võ quán | Tiêu sư, hiệp khách (thông thạo 50, hoặc võ lực từ 90) |
| Tiêu cục | Tiêu sư |
| Gánh hát | Nghệ nhân |
| Thuyền | Ngư phủ |
| Trại | Chăn nuôi |

- Danh sách "Giao cho người trông" **chỉ hiện người cùng nghề** (cùng hộ, như 6.4.1.1).
  - Người chưa đủ thì hiện mờ, ghi thiếu gì.
  - Không ai cùng nghề thì báo thẳng "trong nhà chính không ai làm nghề …".
- Truyền việc khi nghỉ hưu của chủ cơ sở cũng chỉ hiện người cùng nghề và đủ điều kiện trông.
- Trang Kinh doanh, khi chưa ai đủ sức mở cơ sở, ghi rõ điều kiện.

**Quản trị lên thế nào**

| Nguồn | Mỗi năm |
|---|---|
| Làm nghề, bậc thấp nhất | 0,1 |
| Làm nghề, bậc giữa (ví dụ Chưởng quỹ, Thợ cả) | khoảng 0,3 đến 0,4 |
| Làm nghề, bậc cao nhất (Đại chưởng quỹ, Danh tượng, Danh y…) | 0,8 |
| Làm chủ cơ sở | 1 (trước khoảng 4) |
| Học sổ sách (việc riêng) | khoảng 1,5 (trước khoảng 5) |
| Nội trợ, thư lại | giữ như cũ, khoảng 3 |

- Tăng theo chức vụ áp cho mọi nghề có bậc, trừ quan, quân ngũ, ngự y, hiệp khách (các nghề này không trông cơ sở được).
- **Truyền cho con cháu:**
  - Trẻ 10 đến 17 tuổi học dần cách quản việc từ cha mẹ, ông bà **cùng hộ**, tới khoảng 70% quản trị của người giỏi nhất.
  - Người nghỉ hưu "dạy trực tiếp" cũng truyền dần quản trị cho người được dạy.
  - Trường "Theo nhà buôn học việc" và "Nữ công" vẫn cộng như cũ.

**Tính thử:** người khai sáng thường có quản trị khoảng 20. Làm nghề cả đời ở bậc giữa thì đến 50 tuổi được khoảng 30 đến 35. Tức là **đời đầu gần như không làm chủ được**, trừ người sẵn giỏi. Con cháu học từ cha mẹ có quản trị 35 đến 40 thì 18 tuổi đã có khoảng 20 đến 25, lên được 35 vào giữa đời. Đời thứ ba trở đi dễ hơn, nhất là nhà có người nội trợ giỏi.

**Giữ thông thạo khi làm chủ (12.2)**
- Mở cơ sở hay nhận trông cơ sở **không còn bị cắt thông thạo** (trước còn 70%).
- Làm chủ thì thông thạo nghề gốc vẫn lên, nhưng chậm (khoảng 40% tốc độ thường).
- Trang người làm chủ hiện thanh "Thông thạo <nghề gốc>".
- Cơ sở bị bán, đóng cửa thì người trông **quay về nghề cũ, bậc cũ**, giữ thông thạo. Trước đây người ấy thành nhàn rỗi.
- Hiệu quả của chủ tính bằng cả thông thạo nghề gốc lẫn quản trị. Quản trị nặng ký hơn trước.

## 3. Lãi cơ sở và hộp thoại người làm

**Lãi (phương án A)**
- Trần doanh thu từ 1,3 lần mức chuẩn lên tối đa **1,6 lần khi chủ giỏi** (thông thạo nghề gốc và quản trị cao). Chủ thường vẫn khoảng 1,3.
- Tỉ lệ nguyên liệu **giảm theo bậc**: bậc cao nhất còn 60% tỉ lệ cũ.
- Thử: Thương hội đủ người, chủ thông thạo 80 và quản trị 56, lãi **khoảng 203 bạc một tháng**.
- Tính tay: chủ thường lãi khoảng 150 bạc. Đại tửu lâu khoảng 80 bạc. Trại lớn khoảng 25 bạc.

**Chính sách lương** (mới, trong hộp chi tiết của từng cơ sở)
- **Tự tăng theo thông thạo** (mặc định): người làm thạo việc thì tự trả lương theo mặt bằng (khoảng +15%), chỉ ghi nhật ký.
- **Giữ lương**: không tăng, người làm bực dần, dễ bỏ đi.
- **Hỏi tôi**: gộp thành **một hộp cuối năm cho mỗi cơ sở** ("Sổ lương cuối năm: N người xin tăng"). Trong hộp chọn: tăng hết, không tăng ai, hoặc chỉ tăng một người.

**Hộp ốm, nghỉ hưu, bỏ việc, qua đời**
- Của người làm thường thì chỉ ghi nhật ký.
- Chỉ **quản lý, thợ cả, thầy giáo, võ sư** mới hiện hộp như cũ.

**Tự tuyển bù:** từ bậc 3 có ô "Tự tuyển bù". Bật lên thì người trông tự thuê người vào chỗ trống mỗi tháng. Người thuê ngẫu nhiên, không chọn được như tự tuyển.

## 4. Tước

- **Phải tích công trạng.**
  - Mỗi lần lập công (20 chỗ phong tước cũ) chỉ được **ghi công**: sự kiện nhỏ 70, sự kiện lớn 100 đến 190.
  - Đủ mốc mới được phong: Nam tước 100, Tử tước 250, Bá tước 500, Hầu tước 850, Quốc công 1.300.
  - Tức là sự kiện nhỏ phải lập công hai lần mới thành Nam tước.
  - Quan hết nhiệm kỳ được xếp thượng đẳng thì cũng được ghi 25 công.
  - Câu chữ ở các sự kiện nay nói rõ "được phong …" hay "ghi công (công trạng 70/100), chưa đủ để phong Nam tước". Trang Gia tộc hiện công trạng từng người.
- **Không còn ban nhà miễn phí.** Trước đây được phong là nâng nhà lên tới phủ đệ ngay.
- **Bổng tước hạ mạnh:**

  | Tước | Trước | Nay |
  |---|---|---|
  | Nam tước | 20 bạc | 6 bạc |
  | Tử tước | 35 bạc | 10 bạc |
  | Bá tước | 60 bạc | 16 bạc |
  | Hầu tước | 120 bạc | 26 bạc |
  | Quốc công | 250 bạc | 42 bạc |

  Quốc công nay vẫn ít hơn bổng Nhất phẩm (52 bạc).
- **Ruộng ban:** Nam tước 20, Tử tước 35, Bá tước 60, Hầu tước 100, Quốc công 160 mẫu (trước 30 đến 400).
- **Sửa lỗi ruộng tước dồn qua các đời.** Ruộng tước nay tính lại mỗi tháng theo tước của những người đang sống trong họ. Con kế tập hạ một bậc thì ruộng giảm theo. Không ai kế thì mất.
- Tước cộng vào điểm gia thế 300 mỗi bậc (trước 1.500). Trước đây được Quốc công là nhảy thẳng lên Thế gia.
- Khi được phong, danh vọng cá nhân cộng còn một nửa, danh vọng gia tộc còn khoảng 40%, hưng thịnh +4 (trước +10).

**Chưa làm:** nghĩa vụ và rủi ro đi kèm tước (cống nạp, bị tước khi gia tộc phạm tội…). Để lại cho bản có sự kiện thời thế (6.4.1.4) nếu mày muốn.

## 5. Khoa cử

- **Ba năm một khoa:**
  - Thi Hương vào tháng Tám năm thứ nhất.
  - Thi Hội tháng Hai, thi Đình tháng Ba năm sau.
  - Trượt thì chờ ba năm. Trước đây năm nào cũng thi.
- **Đỗ theo chỉ tiêu.** Mỗi khoa có một số người dự và một số người lấy đỗ, thay đổi theo khoa:

  | Kỳ | Người dự | Lấy đỗ |
  |---|---|---|
  | Thi Hương | 350 đến 700 sĩ tử trong tỉnh | 18 đến 32 người |
  | Thi Hội | 250 đến 450 cử nhân cả nước | 10 đến 18 người |

  - Điểm của mình được xếp hạng với họ. Yết bảng ghi "xếp thứ X trong N, khoa này lấy Q người".
  - Mốc đỗ thực tế khoảng **62** (thi Hương) và **72** (thi Hội). Trước đây là 55 và 65 cố định.
  - Thi Đình vẫn không đánh trượt, mốc xếp Trạng nguyên, Bảng nhãn… giữ nguyên.
- **Đỗ xong phải chờ ghế.**
  - "Nhận chức làm quan" sau thi Đình nay là ghi tên vào **sổ hậu bổ**, chờ khoảng 3 đến 15 tháng.
  - Đến lúc thì bộ Lại gửi hộp "gọi nhậm chức": nhận hoặc từ chối.
- **Nghi bè đảng.** Nhà có từ 3 người làm quan (văn hoặc võ) trở lên:
  - Chờ hậu bổ lâu hơn.
  - Thăng chức chậm hơn: mỗi người quá 3 thì giảm khoảng 20%.
  - Từ 4 người thì thi Hội bị trừ điểm (tối đa 10).

## 6. Bậc gia tộc

Thế gia và Danh môn vọng tộc nay cần thêm điều kiện ngoài điểm gia thế:

| Bậc | Thêm điều kiện |
|---|---|
| Thế gia | Danh vọng gia tộc từ 250, đã tới đời thứ ba, có người làm quan từ Tam phẩm (hoặc Tướng quân) hoặc có tước từ Bá tước |
| Danh môn vọng tộc | Danh vọng gia tộc từ 500, đã tới đời thứ tư, có người làm quan từ Nhị phẩm (hoặc Đại tướng quân) hoặc có tước từ Hầu tước |

- **Sa sút thì hạ bậc:** đạt điều kiện thì giữ được thêm 30 năm. Quá 30 năm không còn ai đủ thì rơi về bậc dưới. Của cải giảm thì vẫn hạ bậc như trước.
- Trang Gia tộc ghi điều kiện còn thiếu để lên bậc tiếp theo.

## 7. Danh vọng cá nhân và danh hiệu chỉ số

**Nhãn danh vọng cá nhân**, tao chọn số, mày chơi thử rồi chỉnh:

| Nhãn | Trước | Nay |
|---|---|---|
| Có tiếng tăm | 20 | 60 |
| Được tin dùng | 50 | 150 |
| Danh nhân | 100 | 350 |
| Bậc quốc sĩ | 200 | 800 |

Đặc quyền đi kèm (thu nhập, thăng bậc, điểm thi) giữ nguyên, chỉ khó đạt hơn. Chỗ "người có danh vọng thì chỉ khuyên can, không đánh mắng" (tật xấu) đổi theo mốc Danh nhân mới (350). Các mốc danh vọng trong sự kiện là của các nhà khác hoặc của cả gia tộc nên tao không đụng.

**Danh hiệu chỉ số** (Bác học, Đại nho… ở bảng `CTFX`): bỏ hai tác dụng lan ra cả gia tộc.
- Trí tuệ: "con cháu trong nhà học nhanh thêm".
- EQ: "gia tộc hòa thuận thêm".

Các tác dụng còn lại là của riêng người mang, giữ nguyên. Học vị (Cử nhân, Tiến sĩ) và tước vị vẫn giữ tác dụng nhẹ như cũ, vì không phải danh hiệu chỉ số.

## 8. Bớt hộp sự kiện

- **Nhà càng đông thì mỗi người càng ít gặp chuyện:** từ 15 người ở nhà trở lên, mỗi người gặp sự kiện đời thường ít đi theo căn bậc hai (60 người thì còn một nửa).
- **Trần mỗi năm** cho sự kiện đời thường của cả nhà: 12 cộng 0,3 mỗi người ở nhà, tối đa 24. Hết trần thì chỉ gia chủ còn gặp, với 30% tần suất.
- Kỳ ngộ, chuỗi cốt truyện, việc đã hẹn, khoa thi, việc quan không tính vào trần.

Phần "thêm biến thể theo thời thế và hảo cảm" để ở 6.4.1.3 và 6.4.1.4 như kế hoạch.

## 9. Save cũ

- Mở được.
- Ruộng tước bị tính lại ngay tháng đầu. Save nào đã bị dồn ruộng qua các đời sẽ **mất phần ruộng dư**, và bổng tước giảm theo bảng mới.
- Gia tộc đang là Thế gia hay Danh môn mà chưa đủ điều kiện mới thì bị hạ bậc.
- Người đang trông cơ sở trong save cũ không bị gỡ, kể cả khi không cùng nghề. Thông thạo đã bị cắt 70% ở bản cũ thì không lấy lại được.
- Người đang chờ thi theo lịch cũ thì thi theo lịch ba năm mới.

## 10. Tệp thay đổi

- `engine.js`:
  - Kinh doanh: điều kiện, quản trị, lãi, chính sách lương, tự tuyển bù, giữ thông thạo.
  - Tước và ruộng tước, hậu bổ, khoa cử.
  - Bậc gia tộc, danh vọng cá nhân, trần sự kiện, chữ phiên bản.
- `data.js`: bổng và ruộng tước; năng lực phụ của các nghề (bỏ quản trị cố định của tiểu nhị, gia nhân, chủ); học sổ sách; bỏ `teach` và `on` của danh hiệu chỉ số.
- `ev-cot.js`, `ev-nghe.js`, `ev-quan.js`: câu chữ phong tước; "Vinh quy bái tổ" chuyển sang hậu bổ.
- `index.html`, `admin.html`, `admin.js`: dòng phiên bản.

## 11. Còn lại cần mày biết

- **Mọi con số đều là phỏng đoán.** Mày chơi trên trang admin rồi báo, tao chỉnh. Nên xem trước:
  - Quản trị có quá chậm không.
  - Mốc đỗ 62 và 72.
  - Trần sự kiện.
  - Danh vọng cá nhân.
- "Về quê mở trường dạy học" sau khi đỗ Tiến sĩ vẫn cho mở trường ngay, không xét quản trị. Tao coi đó là phần thưởng của khoa bảng. Muốn bỏ thì nói.
- Nội trợ vẫn lên quản trị khoảng 3 mỗi năm. Nội trợ không trông được cơ sở, nhưng là đường truyền quản trị cho con cháu. Đúng ý mày thì giữ.
- Lối "tập ấm" cho con quan (nhắc ở 6.4.1.1) chưa làm.
- Bản tiếp theo theo kế hoạch: **6.4.1.3**, gồm hảo cảm với các họ khác, gả đi, tình duyên, lập chi họ khi nhậm chức xa.
