# Báo cáo v6.7.0-d1 · Đợt 1: nền và 85 sự kiện mới

- Ngày: 12/11/2026. Nhánh `v6.7.0-d1`, cắt từ `v6.7.0-d0`. Đây là **đợt 1 của v6.7.0** (kế hoạch ở thư mục `ke-hoach-v6.7`), kèm các chỉnh sửa mày nêu sau khi chơi thử đợt 0.
- Số sự kiện: 1.430 (thêm 85 so với đợt 0). Kỳ ngộ: 252 (thêm 23 so với đợt 0, đều ở gói `kn_`).
- Kiểm tra: `node --check` toàn bộ; **chạy mọi lựa chọn của 128 sự kiện thử (43 của đợt 0 và 85 mới)**, 336 lựa chọn, mỗi nhánh 3 lần: không `undefined/NaN`, không ném lỗi; thử khung đại cốt truyện (khởi, ngã rẽ vĩnh viễn, cộng điểm có chặn, kết, hậu sử, Sử sách); 4 ván mới kiểm nhân vật khởi đầu; máy tự chơi ván mới 43 năm và nạp save năm 114 của mày chạy 2 năm: không lỗi, `audit` sạch. **Không** chơi tay, không đo cân bằng nhiều ván.
- Save cũ: theo ý mày, không lo tương thích.

## Chỉnh sửa theo ý mày

| Ý của mày | Đã làm |
|---|---|
| Nhân vật khởi đầu có ít nhất 2 chỉ số ngoài sức khỏe trên 80 | Trong bốn chỉ số trí, võ, mị lực, EQ, hai chỉ số cao nhất được nâng lên từ 80 đến 90 nếu thấp hơn; gen của hai chỉ số ấy cũng nâng theo (78 đến 95) để không bị kẹt trần. Kiểm trên 4 ván mới: đều có hai chỉ số từ 80 |
| Không thấy dòng cộng trừ nữa, có phải mày ẩn ±1 không | **Đúng.** Từ 6.6.0 tao ẩn các thay đổi ±1 và cắt còn 6 mục trong đuôi kết quả. **Đã bỏ**, hiện lại mọi dòng cộng trừ như trước |
| Vua khai quốc chỉ sống 25 đến 35 năm | Vua đầu Trường Thịnh ở ngôi 25 đến 35 năm tính từ lúc mở game (trước 40 đến 50). Kiểm trên 2 ván: 29 và 35 năm |
| Hết tiền thì bỏ thói quen tốt tốn tiền; thói quen xấu vẫn để | Mỗi tháng, nhà hết tiền (hoặc túi riêng/quỹ chi cạn) thì mỗi người có 30% bỏ một thói quen tốt tốn tiền, có nhật ký "túng thiếu nên đành bỏ …". Tật xấu không bị bỏ |
| Nhân vật bắt đầu nên có tỉ lệ có chỉ số buff khởi đầu | Tao hiểu là thói quen và đặc tính khởi đầu: 55% có sẵn một thói quen tốt rẻ tiền (ăn chay, nuôi chim, đọc sách hiếm), 20% có sẵn một tật xấu nhẹ (rượu, cờ bạc, hay gây gổ), 40% có sẵn một đặc tính tốt. **Mày bảo tao nếu ý khác** |

## Đợt 1: nền

- **Khung đại cốt truyện** (trong `engine.js`, chưa có cốt truyện nào dùng): đăng ký cốt truyện, trạng thái ẩn, đếm điểm có chặn, **ngã rẽ vĩnh viễn** (đặt đúng một lần), chọn sự kiện bước theo chương, kết, dải điều chỉnh rút ngẫu nhiên và giấu, tối đa ba cốt truyện chạy cùng lúc. Admin có tab "Cốt truyện" xem trạng thái ẩn.
- **Hạt giống thế giới** mỗi ván: 9 môn phái (3 chính, 3 tà, 3 trung lập) rút từ kho 24 tên tự đặt, mỗi môn có chưởng môn, tỉnh, sở trường; nguồn gốc oán họ Phạm (4 kiểu) và tính cách Kiên (3 kiểu) chờ đợt 3; 3 điểm nóng thế lực tự phát; mệnh thế (8 kiểu); tính khí các nước láng giềng. Một số sự kiện giang hồ mới đã dùng tên môn phái từ đây.
- **Màn Hậu sử chung** cho mọi cái kết ngoài lên ngôi: lược sử 10 mốc, người được nhớ, số liệu.
- **Sử sách** (nút mới ở menu chính): 17 cái kết (11 thắng, 6 bại), mờ cho tới khi đạt; danh sách ván đã kết thúc; **6 xuất thân mới mở khóa theo cái kết** (Hậu duệ công thần sa sút, Con nhà tiêu cục biên ải, Môn đồ lưu lạc, Thương hộ sa cơ, Nho sinh nghèo có thầy, Hậu duệ cố tộc). Các kết hiện có tự ghi vào Sử sách: lên ngôi 3 đường (T1 đến T3), tuyệt tự (L3), tan nhà vì nợ (L2), thua cuộc sống còn với họ khác (L4), tru di (L1). Các cái kết còn lại làm ở các đợt sau.
- **Rà tiền các sự kiện cũ:** chạy thử 1.345 sự kiện ở bậc Thế gia, 689 cái có động chạm tiền. Thêm 17 sự kiện (Sắm Tết, Mời thầy đồ dạy con, Phát thuốc cứu dân, Ngựa chiến làm quà…) vào nhóm chi theo cỡ nhà. File `kiem-tra-tien-su-kien-v6.7.0-d1.csv` ghi từng sự kiện, thang đang dùng và số tiền lớn nhất, nhỏ nhất ở bậc Thế gia. **Mày mở file xem, sự kiện nào số tiền chưa hợp thì ghi lại cho tao.**
- **Metadata:** `tools/addmeta.js` tự thêm domain, nhóm nhỏ, trigger, độ hiếm, ai gặp cho sự kiện mới.

## 85 sự kiện mới

Trạng thái dài hạn (nhà giàu, nhà đông, quan trường, tuổi già, di sản, thất thế), 20 kỳ ngộ, giang hồ, thế lực tự phát, thế giới, triều đình. Các sự kiện giang hồ lấy tên môn phái từ hạt giống thế giới của ván.

| Id | Tên | Nhóm | Ai gặp |
|---|---|---|---|
| `dh_03` | Trộm nhòm ngó | Gia sản | tuổi [28,80], bậc [3,6] |
| `dh_07` | Thợ làm giả tìm đến | Gia sản | tuổi [30,80], bậc [4,6] |
| `dh_08` | Người rủ đóng thuyền buôn | Gia sản | tuổi [30,75], bậc [3,6] |
| `dh_11` | Cả nhà nghi kỵ nhau vì tiền | Gia sản | tuổi [35,85], bậc [4,6] |
| `dh_12` | Môn khách đòi thêm bổng | Gia sản | tuổi [35,85], bậc [4,6] |
| `dh_14` | Của cải nhìn từ ngoài | Gia sản | tuổi [35,85], bậc [5,6] |
| `dh_20` | Quản gia tài ba | Gia sản | tuổi [35,85], bậc [3,6] |
| `dh_15` | Phân phòng cho các cặp vợ chồng | Gia sản | tuổi [35,85] |
| `dh_16` | Bữa cơm đông đủ | Gia sản | tuổi [30,95] |
| `dh_17` | Hai chi cãi nhau | Gia sản | tuổi [35,90] |
| `dh_18` | Con dâu và mẹ chồng | Gia sản | tuổi [40,90] |
| `dh_19` | Con trưởng ganh con thứ | Gia sản | tuổi [40,90] |
| `dh_23` | Chọn người trông nhà | Gia sản | tuổi [60,95] |
| `dh_29` | Lễ lạt cuối năm cho cấp trên | Quan trường | tuổi [28,70] |
| `dh_30` | Người cầu xin việc | Quan trường | tuổi [28,70] |
| `dh_31` | Thư tố cáo vô danh | Quan trường | tuổi [30,70] |
| `dh_32` | Phe cánh lôi kéo | Quan trường | tuổi [30,70] |
| `dh_36` | Vụ án nhà bạn | Quan trường | tuổi [28,70] |
| `dh_38` | Vua ban quà | Quan trường | tuổi [35,80] |
| `dh_40` | Môn sinh xin việc | Quan trường | tuổi [35,75] |
| `dh_44` | Truyền nghề cho đời sau | Gia sản | tuổi [55,90] |
| `dh_45` | Nhìn lại cuộc đời | Gia sản | tuổi [60,95] |
| `dh_47` | Con cháu đủ đầy | Gia sản | tuổi [60,95] |
| `dh_50` | Bạn cũ qua đời | Gia sản | tuổi [55,95] |
| `dh_56` | Chiếc áo cũ | Gia sản | tuổi [45,95] |
| `dh_59` | Món nợ ba đời | Gia sản | tuổi [35,90], bậc [2,6] |
| `dh_67` | Quan mới chèn ép | Gia sản | tuổi [28,75], bậc [1,4] |
| `dh_71` | Bán dần đồ cũ | Gia sản | tuổi [30,85] |
| `dh_72` | Cơ sở thua lỗ | Gia sản | tuổi [28,80] |
| `dh_76` | Cơ hội gượng dậy | Gia sản | tuổi [28,75] |
| `kn_02` | Người họ xa từ nước ngoài | Kỳ ngộ | gia chủ, tuổi [35,80], bậc [2,6], hiếm |
| `kn_03` | Lời tiên đoán cho cả nhà | Kỳ ngộ | gia chủ, tuổi [35,80], hiếm |
| `kn_05` | Hầm rượu cổ dưới nhà | Kỳ ngộ | gia chủ, tuổi [35,80], bậc [1,6], hiếm |
| `kn_07` | Danh y ghé nhà | Kỳ ngộ | tuổi [30,90], hiếm |
| `kn_08` | Học giả lớn ghé trọ | Kỳ ngộ | gia chủ, tuổi [35,80], bậc [2,6], hiếm |
| `kn_13` | Người đàn bà bí ẩn | Kỳ ngộ | tuổi [20,50], hiếm |
| `kn_15` | Cây cổ thụ trong vườn | Kỳ ngộ | gia chủ, tuổi [35,85], bậc [1,6], hiếm |
| `kn_17` | Mạch khoáng nhỏ trên đất nhà | Kỳ ngộ | gia chủ, tuổi [35,85], bậc [2,6], hiếm |
| `kn_19` | Lão tăng tặng kinh | Kỳ ngộ | tuổi [20,70], hiếm |
| `kn_21` | Hạt giống quý | Kỳ ngộ | gia chủ, tuổi [30,85], hiếm |
| `kn_32` | Hang động có bí kíp | Kỳ ngộ | tuổi [18,50], hiếm |
| `kn_34` | Lão ăn mày là tông sư | Kỳ ngộ | tuổi [18,55], hiếm |
| `kn_41` | Tiếng sáo dưới trăng | Kỳ ngộ | tuổi [16,60], hiếm |
| `kn_43` | Thuật chữa thương cổ | Kỳ ngộ | nghề [y,nguy], tuổi [22,70], hiếm |
| `kn_57` | Nhà buôn nước ngoài | Kỳ ngộ | tuổi [22,65], hiếm |
| `kn_61` | Nhà thơ lang thang | Kỳ ngộ | tuổi [18,70], hiếm |
| `kn_66` | Lò gốm cổ | Kỳ ngộ | nghề [tho,chan,mo], tuổi [20,65], hiếm |
| `kn_74` | Đứa trẻ có tài lạ | Kỳ ngộ | tuổi [3,12], hiếm |
| `kn_78` | Chiếc bàn cờ cổ | Kỳ ngộ | tuổi [20,80], hiếm |
| `kn_85` | Giấc mơ tiên tri | Kỳ ngộ | tuổi [18,75], hiếm |
| `gj_02` | Kẻ say gây sự | Giang hồ | tuổi [18,55] |
| `gj_03` | Người đàn bà bị truy đuổi | Giang hồ | tuổi [20,55] |
| `gj_05` | Tên ăn mày lạ | Giang hồ | tuổi [16,70] |
| `gj_10` | Gánh hát giang hồ | Giang hồ | tuổi [16,70] |
| `gj_13` | Tin đồn bí kíp | Giang hồ | tuổi [18,55] |
| `gj_16` | Thầy thuốc giang hồ | Giang hồ | tuổi [18,70] |
| `gj_21` | Môn phái chiêu đồ | Giang hồ | tuổi [12,24] |
| `gj_29` | Giỗ tổ sư | Giang hồ | nghề [hiep,tieu,quan_ngu], tuổi [22,65] |
| `gj_44` | Tuyệt học sắp thất truyền | Giang hồ | tuổi [25,70] |
| `gj_62` | Xếp hạng giang hồ | Giang hồ | tuổi [22,60] |
| `gj_63` | Kẻ thù truyền đời | Giang hồ | tuổi [25,65] |
| `gj_64` | Mối thù của cha | Giang hồ | tuổi [18,50] |
| `gj_69` | Cẩm y vệ truy bắt | Giang hồ | nghề [hiep], tuổi [20,60] |
| `lo_02` | Đường núi bị chặn | Thế lực | tuổi [20,60] |
| `lo_04` | Người nhà bị bắt giữ | Thế lực | gia chủ, tuổi [30,75], bậc [2,6] |
| `lo_06` | Sơn trại mời nhập bọn | Thế lực | tuổi [18,40] |
| `lo_10` | Đốt kho thóc | Thế lực | gia chủ, tuổi [28,75], bậc [1,6] |
| `lo_11` | Cướp thương đội | Thế lực | tuổi [20,60] |
| `lo_16` | Tin dẹp xong sơn tặc | Thế lực | gia chủ, tuổi [28,80] |
| `lo_25` | Dân đói kéo nhau đi | Thế lực | gia chủ, tuổi [28,80], bậc [1,6] |
| `lo_36` | Quan đào ngũ | Thế lực | nghề [quan], tuổi [28,70] |
| `tg_02` | Sứ giả bị giết | Thế giới | gia chủ, tuổi [28,80] |
| `tg_03` | Lệnh tăng thuế quân | Thế giới | gia chủ, tuổi [28,80], bậc [1,6] |
| `tg_11` | Sứ đoàn nước láng giềng qua vùng | Thế giới | gia chủ, tuổi [28,80], bậc [1,6] |
| `tg_12` | Thương nhân Tây Mạc | Thế giới | tuổi [20,65] |
| `tg_20` | Giá muối lên | Thế giới | tuổi [20,65] |
| `tg_29` | Bão ở ngoài khơi | Thế giới | nghề [ngu], tuổi [18,65] |
| `tg_32` | Châu chấu về | Thế giới | gia chủ, tuổi [28,80] |
| `tg_39` | Nạn đói lan | Thế giới | gia chủ, tuổi [28,80], bậc [1,6] |
| `cd_12` | Cầu cạnh Đông xưởng | Triều đình | nghề [quan], tuổi [32,70] |
| `cd_19` | Giấy gọi nhập quân hộ | Triều đình | gia chủ, tuổi [25,60], bậc [0,3] |
| `cd_34` | Lễ nhận sắc tước | Triều đình | tuổi [30,90] |
| `cd_39` | Cha mẹ mất, phải về chịu tang | Triều đình | nghề [quan] |
| `cd_43` | Hàm quan danh dự | Triều đình | gia chủ, tuổi [30,80], bậc [3,6] |
| `cd_26` | Vua ban thiết khoán | Triều đình | gia chủ, tuổi [40,90] |

## Danh sách test, chia theo mảng

| Mảng | Vào đâu, làm gì, thấy gì là đúng |
|---|---|
| Nhân vật khởi đầu | Tạo ván mới vài lần: nhân vật có ít nhất hai trong bốn chỉ số trí, võ, mị lực, EQ từ 80; có khi mang thói quen, tật xấu nhẹ, đặc tính tốt |
| Dòng cộng trừ | Mở bất kỳ sự kiện: thấy đủ mọi chỉ số đổi, kể cả +1 và −1 |
| Vua đầu | Ván mới, mở trang Thời thế: vua Trường Thịnh qua đời khoảng 25 đến 35 năm sau, rồi nổ ra tranh ngôi |
| Hết tiền | Cho quỹ cạn: nhật ký có dòng người nhà bỏ thói quen tốt vì túng thiếu; tật xấu vẫn còn |
| Sử sách | Menu chính, nút Sử sách: 17 kết (mờ), xuất thân mở khóa, các ván đã kết thúc. Chơi một ván tới cái kết (tuyệt tự chẳng hạn) rồi xem lại |
| Xuất thân mở khóa | Màn tạo ván chỉ hiện 6 xuất thân mới khi đã đạt cái kết tương ứng |
| Giang hồ | Tên môn phái trong sự kiện (gj_21, gj_29, gj_44, gj_63, gj_64) khác nhau giữa hai ván |
| Admin | Tab "Cốt truyện": xem hạt giống thế giới |
| 85 sự kiện mới | Chơi ván dài, quan sát độ dài, lựa chọn, cái nào quá dễ hoặc thừa |

## Còn lại cần mày biết

- **Chưa có đại cốt truyện nào chạy**; khung đã sẵn, ân oán họ Phạm viết trên khung này ở đợt 3. Vì vậy "Sử sách" hiện chỉ ghi được các cái kết cũ.
- Hệ luật và dự án gia nghiệp ở đợt 2.
- Hạt giống thế giới mới chỉ dùng vào tên môn phái trong sự kiện; mệnh thế, điểm nóng, tính khí các nước chưa tác động gì (chờ các hệ tương ứng).
- 22 trong 128 sự kiện thử không ra ở save năm 114 vì điều kiện (tuổi, nghề, chiến sự, gia chủ…).
- Rà tiền mới đụng 17 sự kiện; phần còn lại chờ mày xem file CSV.
