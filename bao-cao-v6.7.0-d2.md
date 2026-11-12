# Báo cáo v6.7.0-d2 · Đợt 2: rà tiền toàn bộ, sức khỏe bẩm sinh, Đại Minh luật, dự án gia nghiệp

- Ngày: 13/11/2026. Nhánh `v6.7.0-d2`, cắt từ `v6.7.0-d1`. Đợt 2 của v6.7.0 (kế hoạch ở `ke-hoach-v6.7`), theo ý mày: rà lại mọi chỗ dùng tiền, bỏ mốc sức khỏe, **không** làm trang tra cứu luật, mô tả danh hiệu ngắn gọn.
- Số sự kiện: 1.528 (thêm 98). Kỳ ngộ: 258 (thêm 6).
- Kiểm tra: `node --check` toàn bộ; **chạy mọi lựa chọn của 226 sự kiện thử và mới** (610 lựa chọn, mỗi nhánh 3 lần) với đủ dự án và dấu để lại: không `undefined/NaN`, không ném lỗi, đều đã phân loại metadata; **chạy mọi tội của Đại Minh luật** (41 tội) với 3 loại bị cáo (gia chủ, người lớn, trẻ em), mọi lựa chọn và nhánh (659 lựa chọn): không lỗi; dựng đủ 16 dự án, chạy tháng và năm; 20.000 trẻ sơ sinh để đo tỉ lệ danh hiệu sức khỏe; máy tự chơi ván mới 80 năm và save của mày (Hứa, năm 50) chạy vài năm: không lỗi, `audit` sạch. **Không** chơi tay, không đo cân bằng nhiều ván.
- Save cũ: theo ý mày, không lo tương thích. Save năm 50 của mày (Hứa) vẫn nạp được và tao dùng làm ván thử.

## Điều tao thấy trong save năm 50 của mày

Gia tộc Hứa, bậc Thế gia, 11 người, 13 người trong gia phả, một cơ ngơi, không cơ sở kinh doanh, quỹ 1,3 triệu đồng (tụt từ 3,5 triệu vì xây Phủ đệ). Năm cuối: 18 hộp sự kiện, toàn bộ do mày tự chọn. 313 lần bốc, 235 sự kiện khác nhau. Có 28 trong số sự kiện thử và mới đã xuất hiện. Tao chưa thấy lỗi chặn. Điều đáng chú ý là các khoản chi của sự kiện còn nhỏ so với quỹ: "Ngã gãy chân" chỉ tốn 3 bạc 600 đồng, "Sốt cao co giật" 3 bạc 360 đồng, "Ngày cưới năm xưa" 72 bạc. Đó là phần rà tiền dưới.

## Rà tiền

| Việc | Đã làm |
|---|---|
| Hộp của engine (tang lễ, khen thưởng người nhà, bệnh nặng, tiệc thọ, lo lót thượng quan, hôn lễ, đỡ đầu họ khác…) vẫn dùng thang nhẹ cũ | **Mặc định ngoài sự kiện đổi sang thang CHI** (nhân theo bậc như đợt 1). Gần 40 chỗ đặt lại cỡ việc cho hợp (xem bảng dưới). Khoản nhận (thưởng quan về hưu, vua ban chiếu, triều cấp cứu trợ) dùng thang THU. Ngưỡng túi riêng, lộ phí, lương chức trong tộc giữ thang nhẹ |
| "Thưởng cho người nhà" | Trước: thưởng hậu 2,4 bạc, vừa 0,9 bạc ở bậc Thế gia. Nay thưởng hậu 150 bạc, vừa 48 bạc (cỡ 25 và 8, thang CHI) |
| Sự kiện cũ có tiền | Chạy thử 1.528 sự kiện ở bậc Thế gia: **858 sự kiện có động chạm tiền** (111 CHI, 17 THU, 730 NHẸ). Thêm 24 sự kiện cũ vào nhóm CHI (thầy thuốc, học phí, kiện tụng, lễ thôi nôi, tài trợ trường…). 46 sự kiện mới có lựa chọn trả tiền cũng được gắn CHI |
| Thuyền lớn (giang hồ) | Giá cố định 7.200 đồng (là giá hàng, không đổi theo bậc) |
| Nghĩa trang gia tộc | Giảm một nửa tiền tang lễ |

Bảng một số khoản (thang CHI; 1.000 bạc = 1 vàng):

| Khoản | Bần hộ | Tiểu hộ | Hương thân | Hào phú | Thế gia | Danh môn |
|---|---|---|---|---|---|---|
| Tang lễ sơ sài | 180 đồng | 1,8 bạc | 5,4 bạc | 18 bạc | 54 bạc | |
| Tang lễ trung bình | 1,8 bạc | 18 bạc | 54 bạc | 180 bạc | 540 bạc | |
| Tang lễ trang trọng | 6 bạc | 60 bạc | 180 bạc | 600 bạc | 1,8 vàng | |
| Thưởng hậu cho người nhà | 1,5 bạc | 15 bạc | 45 bạc | 150 bạc | 450 bạc | |
| Chữa bệnh nặng | 0,6 bạc | 6 bạc | 18 bạc | 60 bạc | 180 bạc | |
| Tiệc thọ lớn | 6 bạc | 60 bạc | 180 bạc | 600 bạc | 1,8 vàng | |

(Cột Bần hộ, Tiểu hộ, Hương thân, Hào phú, Thế gia theo bậc 0, 2, 3, 4, 5; Danh môn vọng tộc là bậc 6, nhân 3 so với Thế gia.)

File `D:\BachNienTheGia\kiem-tra-tien-su-kien-v6.7.0-d2.csv` ghi từng sự kiện có tiền: thang đang dùng, số tiền thu và chi lớn nhất ở bậc Thế gia. **Mày mở xem, sự kiện nào số tiền chưa hợp thì gửi id.** Tao chưa đổi 730 sự kiện NHẸ, vì phần lớn là khoản lặt vặt (mất gà, trâu ốm) hoặc khoản thu nhỏ. Nếu mày thấy nhóm nào nên chi nhiều hơn, tao đổi theo nhóm.

## Sức khỏe: bỏ mốc, bỏ cổng, mang sẵn từ lúc sinh

- **Bỏ toàn bộ** sự kiện vượt mốc sức khỏe: không còn hộp mốc, không còn con đường đột phá, không còn cổng mở giới hạn, không còn thiên cơ về sức khỏe. Sức khỏe tối đa cố định 100, không rèn lên được.
- **Danh hiệu sức khỏe là bẩm sinh.** Mỗi người (kể cả nhân vật khởi đầu, con sinh ra, dâu rể) có xác suất mang sẵn **một** trong tám danh hiệu: Cường tráng 7%, Khí huyết như rồng 3%, Đồng bì thiết cốt 1,2%, Kim cương chi thân 0,5%, Bách bệnh bất xâm 0,2%, Trường sinh căn cốt 0,08%, Phản lão hoàn đồng 0,03%, Tiên phong đạo cốt 0,01%. Đo thực tế trên 20.000 trẻ: 6,7% / 2,8% / 1,1% / 0,5% / 0,2% / 0,08% / 0,005%.
- Tác dụng (ngắn gọn, ghi trên danh hiệu): hồi sức nhanh, ít nhiễm dịch, **già chậm hơn 2 đến 14 năm**, tâm trạng cao hơn, thu nhập nghề lao động cao hơn.
- "Mệnh số sống bao lâu" giữ làm chỉ số ẩn như mày muốn: đó là tuổi bắt đầu suy (`decl`) rút lúc sinh từ 32 đến 42, cộng thêm từ danh hiệu và thể chất. Không hiện ra cho người chơi.
- "Thân thể đúc thép" và "Trường thọ" (thể chất bẩm sinh có sẵn) không còn mở trần sức khỏe 110 hay 115; chỉ còn tác dụng ít bệnh và già chậm.

## Mô tả danh hiệu ngắn gọn

Không còn câu "Danh hiệu về … (từ 110), do người đời công nhận" và không còn liệt kê tên từng nghề. Chỉ ghi tác dụng. Ví dụ Đại nho: "Điểm thi +9; thông thạo nghề liên quan +0,4 mỗi năm; danh vọng +2 mỗi năm; thu nhập nghề liên quan +6%." Danh hiệu Thần, thiên mệnh, đế vương cũng rút còn một đến hai câu.

## Đại Minh luật (không có trang tra cứu)

- **41 tội** của bảy thiên (Hình, Hộ, Lễ, Binh, Lại, Công, Danh lệ), mỗi tội có mức hình mặc định (khiển trách, đánh roi, đánh gậy, khổ sai, đày, xử tử) và bậc nặng nhẹ. Thập ác (mưu phản, bất hiếu, bất mục, thông địch, nuôi binh trái phép) không được chuộc, không được giảm theo phẩm cấp.
- Hộp **Công đường** hiện khi một sự kiện đưa ai ra xét xử. Lựa chọn: nhận tội; thuê thầy cãi; chuộc bằng bạc (từ khổ sai trở xuống, không áp thập ác); lo lót quan (giảm hai mức nếu thành, nặng thêm và thêm tội nếu bại); nhờ người có phẩm tước trong họ lên tiếng; kháng án. Quan từ Ngũ phẩm được giảm một bậc, từ Tam phẩm hoặc có tước giảm thêm.
- **Lệ độc đinh:** nhà chỉ còn một người trụ cột thì không bị khổ sai, đày hay xử tử (trừ thập ác): quan giảm xuống đánh gậy. Trẻ dưới 16 tuổi nhiều nhất bị đánh gậy.
- Án để lại dấu: tái phạm trong 30 năm bị nặng thêm một mức; số án của gia tộc ảnh hưởng tiếng tăm (xem bộ nhớ sự kiện).
- 60 sự kiện luật mới (`lw_`, cộng 6 sự kiện thử ở đợt 0 thành 66): hình sự, ruộng thuế lao dịch, gia đình (chia gia sản, vợ góa, con nuôi, di chúc giả, bỏ vợ, cưới trái luật), khoa cử (thi hộ, mạo danh, tà giáo, văn tự ngục), quan lại (đàn hặc, nhận lễ, vắng mặt), và các hệ quả của án cũ.

## Dự án gia nghiệp (mục mới ở trang Cơ ngơi)

16 dự án, giá theo thang CHI: từ đường lớn, nghĩa trang, nghĩa điền, nghĩa thục, tàng thư lầu, kho thóc, cầu đê đường, đội thuyền buôn, gia binh hộ viện, môn khách, quyên nạp hàm Giám sinh, khai hoang, trùng tu chùa miếu, hội quán ở kinh, dinh thự ở kinh, học bổng cho học trò nghèo. Mỗi dự án có: bậc gia thế tối thiểu, thời gian xây, phí duy trì mỗi tháng (hiện trong dòng thu chi "Duy trì dự án gia nghiệp"), lợi ích mỗi năm, và nguy cơ **xuống cấp** nếu quỹ âm; xuống cấp thì tu sửa nửa giá. Khánh thành có hộp lựa chọn (lễ lớn, lễ trong họ, lặng lẽ). 32 sự kiện dự án (`dn_`): xây dựng, biến cố, hệ quả.

## Bộ nhớ sự kiện (để sự kiện, kỳ ngộ, cốt truyện tác động lẫn nhau)

Hàm `G.mem` lưu "dấu" có hạn dùng. Đang dùng: `tienan:<người>` (án tích, làm án sau nặng hơn; cản đường thi; kỳ ngộ rửa oan), `lw_tong` (số án của gia tộc: sinh "tiếng xấu theo nhà", mở "thầy cãi giỏi", cho phép xóa hồ sơ), `van_tu_nguc` (hồ sơ bài thơ: bị lục lại), `oan_trom` (người bị đánh nhầm tìm đến), `honor` (hàm Giám sinh mở đường thi), `thay_cai` (thầy cãi làm rẻ và dễ thắng hơn), `nghi_binh` (cẩm y vệ hỏi chuyện gia binh). Đây mới là khung và 9 mối nối đầu tiên; các đợt sau nối thêm.

## 98 sự kiện mới

| Id | Tên | Nhóm | Ai gặp |
|---|---|---|---|
| `lw_02` | Con em đánh người | Luật pháp | gia chủ, bậc [0,6] |
| `lw_03` | Bị mất trộm | Luật pháp | gia chủ, bậc [1,6] |
| `lw_04` | Bắt được kẻ trộm | Luật pháp | gia chủ, bậc [1,6] |
| `lw_05` | Con cháu bị bắt vì trộm | Luật pháp | gia chủ, bậc [0,6] |
| `lw_06` | Cướp đường bị bắt | Luật pháp | nghề [tieunhi,tieuphu,hangrong,tieu], tuổi [20,65] |
| `lw_07` | Án mạng trong xóm | Luật pháp | gia chủ, bậc [0,6] |
| `lw_08` | Vô ý làm chết người | Luật pháp | nghề [hiep,tieu,quan_ngu,tho,nong], tuổi [18,60] |
| `lw_09` | Bị vu cáo | Luật pháp | gia chủ, bậc [1,6] |
| `lw_10` | Người nhờ làm chứng | Luật pháp | tuổi [25,70] |
| `lw_11` | Người xin trốn nhờ | Luật pháp | gia chủ |
| `lw_12` | Ép gả con gái | Luật pháp | gia chủ, tuổi [30,80], bậc [1,6] |
| `lw_13` | Chuyện không đứng đắn | Luật pháp | tuổi [25,60] |
| `lw_14` | Đánh cha mẹ | Luật pháp | gia chủ, tuổi [40,90], bậc [0,6] |
| `lw_15` | Tố cáo họ hàng | Luật pháp | gia chủ, tuổi [30,85], bậc [1,6] |
| `lw_17` | Đoàn buôn trà lậu | Luật pháp | nghề [tieunhi,tieuphu,hangrong,tieu,chu], tuổi [20,65] |
| `lw_18` | Nấu rượu lậu | Luật pháp | nghề [nong,tho,noi,tieunhi], tuổi [20,65] |
| `lw_19` | Món đồ mua nhầm | Luật pháp | gia chủ, bậc [1,6] |
| `lw_20` | Giấy tờ bị làm giả | Luật pháp | nghề [quan,thulai], tuổi [25,70] |
| `lw_21` | Có người đào đê trộm nước | Luật pháp | gia chủ |
| `lw_23` | Dựng nhà chắn lối đi | Luật pháp | gia chủ, bậc [1,6] |
| `lw_24` | Đặt tên phạm húy | Luật pháp | gia chủ, tuổi [28,70] |
| `lw_26` | Ruộng chưa vào sổ | Luật pháp | gia chủ, bậc [1,6] |
| `lw_27` | Khai thiếu số đinh | Luật pháp | gia chủ, bậc [0,5] |
| `lw_28` | Đất bị cưỡng chiếm | Luật pháp | gia chủ, bậc [1,6] |
| `lw_30` | Người vay quỵt nợ | Luật pháp | gia chủ, bậc [1,6] |
| `lw_31` | Mua ruộng không văn tự | Luật pháp | gia chủ, bậc [1,6] |
| `lw_32` | Cột mốc dịch chuyển | Luật pháp | gia chủ |
| `lw_33` | Lệnh lao dịch | Luật pháp | gia chủ, bậc [0,2] |
| `lw_34` | Được miễn dịch nhờ đỗ đạt | Luật pháp | gia chủ |
| `lw_35` | Sưu cao thuế nặng đột xuất | Luật pháp | gia chủ, bậc [0,4] |
| `lw_36` | Ruộng quan bán rẻ | Luật pháp | gia chủ, bậc [2,6] |
| `lw_37` | Nợ thuế chồng chất | Luật pháp | gia chủ, bậc [0,3] |
| `lw_38` | Lệnh kiểm tra sổ đinh | Luật pháp | gia chủ, bậc [1,6] |
| `lw_39` | Chia gia sản | Luật pháp | gia chủ, tuổi [50,95] |
| `lw_40` | Con thứ đòi phần | Luật pháp | gia chủ, tuổi [40,95] |
| `lw_41` | Vợ góa giữ phần chồng | Luật pháp | gia chủ |
| `lw_42` | Con nuôi đòi thừa kế | Luật pháp | gia chủ |
| `lw_43` | Di chúc bị nghi là giả | Luật pháp | gia chủ, tuổi [45,95] |
| `lw_44` | Muốn bỏ vợ | Luật pháp | tuổi [28,70] |
| `lw_46` | Hỏi vợ cùng họ | Luật pháp | gia chủ |
| `lw_47` | Lương tiện bất hôn | Luật pháp | gia chủ |
| `lw_48` | Hỏi cưới trong tang | Luật pháp | gia chủ |
| `lw_50` | Bị tố bất hiếu | Luật pháp | gia chủ, tuổi [28,80] |
| `lw_52` | Gia nhân xin chuộc thân | Luật pháp | gia chủ, bậc [2,6] |
| `lw_54` | Có người xin thi thay | Luật pháp | tuổi [16,50] |
| `lw_56` | Mạo danh sĩ tử | Luật pháp | tuổi [16,45] |
| `lw_57` | Tà giáo trong làng | Luật pháp | gia chủ |
| `lw_58` | Thầy bói bị tố | Luật pháp | gia chủ |
| `lw_59` | Câu thơ bị bắt bẻ | Luật pháp | tuổi [25,70] |
| `lw_63` | Bị đàn hặc | Luật pháp | nghề [quan], tuổi [30,70] |
| `lw_64` | Bị tra khoản nhận lễ | Luật pháp | nghề [quan], tuổi [28,70] |
| `lw_66` | Vắng mặt không phép | Luật pháp | nghề [quan], tuổi [28,70] |
| `lw_69` | Hình bộ thẩm vấn | Luật pháp | nghề [quan], tuổi [32,70] |
| `lw_70` | Án treo mười năm | Luật pháp | gia chủ, tuổi [28,90] |
| `lw_71` | Tiếng xấu theo nhà | Luật pháp | gia chủ, bậc [1,6] |
| `lw_72` | Người từng chịu khổ sai trở về | Luật pháp | gia chủ |
| `lw_73` | Tiền án làm nghẽn đường thi | Luật pháp | gia chủ |
| `lw_74` | Hồ sơ cũ bị lục lại | Luật pháp | gia chủ |
| `lw_75` | Kẻ bị đánh năm xưa tìm đến | Luật pháp | gia chủ |
| `lw_76` | Hàm danh dự mở đường cho con | Luật pháp | gia chủ |
| `dn_xong` | Khánh thành | Dự án | gia chủ, do dự án gọi |
| `dn_01` | Thợ cả đến xem | Dự án | gia chủ |
| `dn_02` | Móng nhà bị lún | Dự án | gia chủ |
| `dn_04` | Chọn đất làm nghĩa trang | Dự án | gia chủ |
| `dn_05` | Dời mộ tổ về nghĩa trang | Dự án | gia chủ |
| `dn_06` | Người nghèo đến nhận ruộng | Dự án | gia chủ |
| `dn_07` | Kẻ lợi dụng nghĩa điền | Dự án | gia chủ |
| `dn_08` | Tìm thầy cho nghĩa thục | Dự án | gia chủ |
| `dn_nghia_thuc_tro` | Học trò xuất sắc của nghĩa thục | Dự án | gia chủ, do dự án gọi |
| `dn_10` | Nghĩa thục thiếu tiền | Dự án | gia chủ |
| `dn_11` | Thu sách cho tàng thư lầu | Dự án | gia chủ |
| `dn_12` | Sách quý bị mối mọt | Dự án | gia chủ |
| `dn_13` | Cháy tàng thư | Dự án | gia chủ |
| `dn_14` | Mở kho thóc cứu dân | Dự án | gia chủ |
| `dn_15` | Chuột và mốc trong kho | Dự án | gia chủ |
| `dn_16` | Quan huyện bàn chuyện xây cầu | Dự án | gia chủ |
| `dn_17` | Cầu bị sập sau cơn lũ | Dự án | gia chủ |
| `dn_18` | Chuyến đầu của đội thuyền buôn | Dự án | gia chủ |
| `dn_19` | Thuyền gặp bão | Dự án | gia chủ |
| `dn_20` | Tuyển gia binh | Dự án | gia chủ |
| `dn_21` | Gia binh gây sự | Dự án | gia chủ |
| `dn_22` | Cẩm y vệ hỏi chuyện gia binh | Dự án | gia chủ |
| `dn_23` | Môn khách đến cửa | Dự án | gia chủ |
| `dn_24` | Môn khách là gián điệp | Dự án | gia chủ |
| `dn_mon_khach_tin` | Tin từ môn khách | Dự án | gia chủ, do dự án gọi |
| `dn_25` | Hàm Giám sinh bị tố | Dự án | gia chủ |
| `dn_26` | Đất khai hoang có người tranh | Dự án | gia chủ |
| `dn_27` | Nhà sư xin thêm chỗ ở | Dự án | gia chủ |
| `dn_28` | Người đi thi trọ hội quán | Dự án | gia chủ |
| `dn_29` | Quan khách ở dinh thự kinh thành | Dự án | gia chủ |
| `dn_30` | Học trò nghèo thi đỗ | Dự án | gia chủ |
| `dn_31` | Công trình bỏ dở | Dự án | gia chủ |
| `kn_91` | Học trò báo ơn | Kỳ ngộ | gia chủ, hiếm |
| `kn_92` | Sách quý đến tay | Kỳ ngộ | gia chủ, hiếm |
| `kn_93` | Người được cứu nhớ ơn | Kỳ ngộ | gia chủ, hiếm |
| `kn_94` | Vị quan nhớ nghĩa cử | Kỳ ngộ | gia chủ, hiếm |
| `kn_95` | Án oan được rửa | Kỳ ngộ | tuổi [22,80], hiếm |
| `kn_96` | Thầy cãi giỏi | Kỳ ngộ | gia chủ, hiếm |

## Danh sách test, chia theo mảng

| Mảng | Vào đâu, làm gì, thấy gì là đúng |
|---|---|
| Tiền engine | Tang lễ, khen thưởng, bệnh nặng: số tiền theo bảng bậc ở trên; khen thưởng người nhà ở bậc Thế gia hậu 150 bạc |
| Sức khỏe | Không còn hộp mốc sức khỏe hay "Sức khỏe tối đa" vượt 100; người mới sinh có tỉ lệ mang danh hiệu sức khỏe (chip vàng) |
| Danh hiệu | Mở chip danh hiệu: chỉ một đến hai dòng tác dụng |
| Công đường | Sự kiện luật dẫn tới hộp "Xét xử …": thử nhận tội, thầy cãi, chuộc, lo lót, kháng án; nhà chỉ còn một người thì được giảm theo lệ độc đinh |
| Dự án | Trang Cơ ngơi, mục "Dự án gia nghiệp": bấm làm, xem thu chi hằng tháng, để quỹ âm để thấy xuống cấp, tu sửa |
| Nối kết | Dính một án rồi chơi tiếp vài chục năm: gặp "tiếng xấu theo nhà", "thầy cãi giỏi", cơ hội xóa hồ sơ |

## Còn lại cần mày biết

- Cân bằng chưa đo bằng nhiều ván. Chi phí dự án, giá chuộc, xác suất danh hiệu sức khỏe là con số tao đặt.
- 730 sự kiện cũ vẫn ở thang nhẹ; chờ mày xem CSV.
- 98 sự kiện mới và các điều kiện như `tier`, `age` hơi chặt trong ván nhỏ; cần mày chơi để biết tần suất.
- Một số sự kiện cũ bị tag tự động là "bắt nạt" nên không ra với nhà bậc cao. Các sự kiện mới đã tắt tag này.
- Trang Luật: không làm theo ý mày. Cũng không có màn "xem điều luật" trong hộp Công đường; hộp chỉ nói tội gì, hình định gì.
