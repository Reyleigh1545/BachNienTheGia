# Báo cáo v6.7.0-d0 · Đợt 0: sửa lại 6.6.0 và 43 sự kiện thử

- Ngày: 12/11/2026. Nhánh `v6.7.0-d0`, cắt từ `v6.6.0`. Đây là **đợt 0 của v6.7.0** (kế hoạch ở thư mục `ke-hoach-v6.7`), kèm 43 sự kiện thử lấy từ kế hoạch để mày chơi thử.
- Số sự kiện: 1.345 (thêm 43). Kỳ ngộ: 224 + 5 (các `kn_` hiếm).
- Kiểm tra: `node --check` toàn bộ; **chạy mọi lựa chọn của 43 sự kiện thử** (119 lựa chọn, mỗi nhánh 3 lần): không `undefined/NaN`, không ném lỗi; thử chi họ dời nơi, khóa cướp ngôi theo đường, nuôi quân, hộp tru di; máy tự chơi ván mới 49 năm, nạp save năm 114 của mày chạy 4 năm: không lỗi, `audit` sạch. **Không** chơi tay, không đo cân bằng nhiều ván.
- Save cũ: theo ý mày, từ bản này **không còn lo tương thích save cũ**. Save năm 114 của mày vẫn nạp được và tao dùng nó làm ván thử.

## Đã sửa theo ý mày (đợt 0)

| Ý của mày | Đã làm |
|---|---|
| Không cần thuế | Bỏ hẳn thuế, lễ lạt, quan lại sách nhiễu |
| Doanh thu cơ sở không cần giảm nữa | Bỏ hệ số cơ sở cùng loại tranh khách. Giữ x0,7 từ 6.5.4 |
| Tiền sự kiện theo lượng cố định theo địa vị | Bảng 7 bậc × 3 thang (xem dưới). Bỏ công thức theo phần trăm quỹ |
| Chi họ A chuyển B còn lại A, thêm số 2 | Trưởng chi xa dời nơi thì **dời chính hộ đó**: giữ tên, giữ quỹ, nhà ruộng cũ bán (nhà 50%, ruộng 80%) vào quỹ chi. Tên chi trùng thì thêm tên đệm hoặc hướng (Đông, Tây…), không thêm số |
| Cướp ngôi khóa 10 năm, văn không khóa võ | Bỏ khóa chung. Bỏ ngang hay mất người cầm đầu chỉ khóa chính đường đó 10 năm |
| Mưu phản thất bại là tru di, trục xuất không thoát | Khi mưu phản thất bại, hộp tru di **chỉ còn** "Đưa một người cùng vợ con rời đi trong đêm, lập chi ở xa" (để chỉ tam tộc) và "Đành phó mặc cho trời". Bỏ trục xuất, bỏ dâng sớ nhận tội, bỏ nhờ cầu tình. Bỏ `usPenalty` của 6.6.0 |
| Nuôi quân tốn tiền theo số quân | Mỗi bước chiêu thêm quân (Quyền thần +1, Võ quan +2, Khởi nghĩa +3 đội mỗi bước); mỗi đội 100 người tốn 60 bạc mỗi tháng. Hết tiền thì quân bỏ trốn, thế lực và lộ xấu đi |
| Kết thúc phải có cốt truyện, không hỏi | Bỏ hộp "Một trang sử" của 6.6.0. Hiện **chưa có kết thúc mới nào** (làm ở đợt 5) |
| Con cháu tự lập từ 80 hay muốn ra ở riêng | Tự lập từ 80: xác suất ước muốn x3, không cần đời thứ hai; từ 70 x1,6; từ 40 trở xuống x0,5 |
| Chỉ số sau 100 nhanh hơn một chút, sau 150 chậm | 100 đến 119: hệ số 0,33 (trước 0,25); 120 đến 149: 0,2 (trước 0,125); từ 150: 0,14 |
| Ẩn box ân oán ở trang Gia tộc | Đã bỏ `vilCard` khỏi trang. Cốt truyện cũ vẫn chạy ngầm; viết lại ở đợt 3 |
| Thiên mệnh lúc sinh vẫn có tỉ lệ thấp | Giữ 1/2.000. Khi dọn save cũ giữ tối đa 4 người |

**Bảng tiền theo bậc.** `tiền = cỡ việc × 60 đồng × hệ số`; cỡ nhỏ 10, vừa 30, lớn 100, đại 300.

| Thang | Bần | Thường | Tiểu hộ | Hương thân | Hào phú | Thế gia | Danh môn |
|---|---|---|---|---|---|---|---|
| CHI (việc chi theo cỡ nhà) | 1 | 2 | 4 | 10 | 30 | 100 | 300 |
| THU (khoản nhận) | 1 | 1,5 | 2,5 | 4 | 7 | 12 | 20 |
| NHẸ (mặc định) | 1 | 1,3 | 1,8 | 2,5 | 3,5 | 5 | 7 |

Ví dụ ở bậc Thế gia, một việc cỡ lớn (100) thuộc thang CHI là 600 bạc; cỡ đại (300) là 1,8 vàng. Danh môn vọng tộc: cỡ đại 5,4 vàng. Sự kiện cũ vẫn tự phân loại CHI/NHẸ như trước; tao chưa rà từng cái (rà ở đợt 1).

## 43 sự kiện thử

Chỉ để mày thử cảm giác: lời kể, lựa chọn, độ khó, độ dài. Chúng dùng API hiện có, chưa có hệ thống nền (luật, giang hồ, thế lực tự phát, dự án). Khi hệ nền xong, những sự kiện này sẽ được viết lại cho đúng hệ. Mày chơi rồi cho tao biết cái nào hay, cái nào dở, cái nào dài.

| Id | Tên | Nhóm | Ai gặp |
|---|---|---|---|
| `lw_01` | Đấu ẩu ngoài chợ | Luật pháp | gia chủ, tuổi [25,70], bậc [1,6] |
| `lw_25` | Bị tố trốn thuế | Luật pháp | gia chủ, tuổi [25,75], bậc [2,6] |
| `lw_16` | Chuyến muối lậu | Luật pháp | nghề [tieunhi,tieuphu,hangrong], tuổi [20,60] |
| `lw_53` | Mang sách vào trường thi | Luật pháp | tuổi [16,50] |
| `lw_29` | Người hàng xóm vay tiền | Luật pháp | gia chủ, tuổi [25,75], bậc [2,6] |
| `lw_22` | Mảnh đất bỏ hoang bên cạnh | Luật pháp | gia chủ, tuổi [25,70], bậc [3,6] |
| `gj_01` | Quán rượu bên đường | Giang hồ | tuổi [18,60] |
| `gj_08` | Người lạ ra tay cứu mạng | Giang hồ | tuổi [16,70], hiếm |
| `gj_09` | Hẹn đấu dưới trăng | Giang hồ | tuổi [20,48] |
| `gj_12` | Lão thợ rèn kiếm | Giang hồ | tuổi [18,65], hiếm |
| `gj_55` | Thách đấu giữa chợ | Giang hồ | tuổi [20,50] |
| `gj_72` | Tiêu xa bị cướp | Giang hồ | nghề [tieu], tuổi [20,60] |
| `gj_45` | Chân khí đảo lộn | Giang hồ | tuổi [20,60] |
| `lo_01` | Tin có sơn tặc trên núi | Thế lực | gia chủ, tuổi [25,70], bậc [1,6] |
| `lo_03` | Đòi tiền mãi lộ | Thế lực | nghề [tieunhi,tieuphu,hangrong,tieu], tuổi [20,60] |
| `lo_09` | Toán thổ phỉ qua làng | Thế lực | gia chủ, tuổi [25,70], bậc [1,6] |
| `lo_12` | Dân làng góp người tự vệ | Thế lực | gia chủ, tuổi [25,70], bậc [2,6] |
| `lo_18` | Thuyền lạ ngoài cửa sông | Thế lực | nghề [ngu,tieunhi], tuổi [20,60] |
| `lo_24` | Mất mùa liên tiếp | Thế lực | gia chủ, tuổi [25,75], bậc [0,5] |
| `dh_01` | Kẻ xin xỏ đến cửa | Gia sản | gia chủ, tuổi [30,80], bậc [3,6] |
| `dh_02` | Họ hàng xa ghé nhà | Gia sản | gia chủ, tuổi [28,80], bậc [2,6] |
| `dh_04` | Quà của người cầu cạnh | Gia sản | nghề [quan], tuổi [28,70] |
| `dh_05` | Bức tranh cổ | Gia sản | gia chủ, tuổi [30,80], bậc [4,6] |
| `dh_09` | Tiệc phô trương của nhà bên | Gia sản | gia chủ, tuổi [30,80], bậc [4,6] |
| `dh_13` | Quản gia ăn bớt | Gia sản | gia chủ, tuổi [30,80], bậc [3,6] |
| `dh_43` | Soạn di chúc | Gia sản | gia chủ, tuổi [60,95] |
| `dh_54` | Lễ thượng thọ | Gia sản | gia chủ, tuổi [70,100], bậc [2,6] |
| `dh_66` | Thua kiện về ruộng | Gia sản | gia chủ, tuổi [28,75], bậc [2,6] |
| `dh_80` | Đứng lên sau mất mát | Gia sản | gia chủ, tuổi [28,70] |
| `kn_01` | Hộp gỗ trong vách nhà | Kỳ ngộ | gia chủ, tuổi [30,80], bậc [1,6], hiếm |
| `kn_12` | Thần đồng của họ | Kỳ ngộ | tuổi [5,12], hiếm |
| `kn_31` | Cao nhân dạy kiếm | Kỳ ngộ | tuổi [16,50], hiếm |
| `kn_45` | Quyển da ghi võ công | Kỳ ngộ | tuổi [18,60], hiếm |
| `kn_56` | Danh nho tặng bút | Kỳ ngộ | tuổi [18,70], hiếm |
| `kn_89` | Cơ hội ngàn năm có một | Kỳ ngộ | gia chủ, tuổi [30,70], bậc [2,6], hiếm |
| `tg_01` | Tin quân địch tập trung | Thế giới | gia chủ, tuổi [25,75], bậc [1,6] |
| `tg_19` | Giá gạo tăng | Thế giới | gia chủ, tuổi [25,75] |
| `tg_27` | Lũ ở miền xuôi | Thế giới | gia chủ, tuổi [25,75], bậc [1,6] |
| `tg_40` | Mùa bội thu | Thế giới | gia chủ, tuổi [25,75] |
| `tg_26` | Tiền giả lưu hành | Thế giới | nghề [tieunhi,tieuphu,hangrong,chu], tuổi [20,65] |
| `cd_01` | Người lạ theo dõi | Triều đình | nghề [quan], tuổi [28,70] |
| `cd_31` | Xin tập ấm cho con | Triều đình | nghề [quan], tuổi [30,75] |
| `cd_42` | Chuyện mua hàm Giám sinh | Triều đình | gia chủ, tuổi [28,70], bậc [3,6] |

## Danh sách test, chia theo mảng

| Mảng | Vào đâu, làm gì, thấy gì là đúng |
|---|---|
| Chi họ dời nơi | Cho người nhậm chức xa, chọn dời cả chi tới nơi A; sau đó nhậm chức ở nơi B, chọn dời cả chi lần nữa. Danh sách chi chỉ còn một hộ, tên không có số, nhật ký ghi bán nhà ruộng cũ |
| Cướp ngôi | Bỏ ngang một đường: chỉ đường đó bị khóa 10 năm (trang Gia tộc hiện dòng báo). Thất bại một đường: hộp tru di không có lựa chọn trục xuất |
| Nuôi quân | Bắt đầu đường Võ quan: mỗi tháng quỹ trừ tiền, nhiều dần qua từng bước |
| Tiền | Mở bất kỳ sự kiện có tiền: số tiền ghi trong nhãn đúng bảng bậc |
| Ân oán | Trang Gia tộc không còn thẻ ân oán |
| Sự kiện thử | Chơi một ván dài; quan sát 43 sự kiện hiện ra thế nào |
| Ra ở riêng | Con cháu tự lập cao đã lập gia đình hay xin ra ở riêng |

## Còn lại cần mày biết

- 11 trong 43 sự kiện thử không ra ở save năm 114 của tao vì điều kiện (tuổi, nghề, chiến sự, gia chủ…); lý do đều hợp lý, nhưng cần chơi mới biết tần suất.
- `lw_01` (đấu ẩu) có thẻ tự nhận "bắt nạt" nên bị chặn với nhà từ bậc Thế gia trở lên.
- Chưa có kết thúc mới, chưa có luật, giang hồ, thế lực tự phát, dự án, ân oán mới. Đó là các đợt sau.
- Số tiền sự kiện cũ chưa rà từng cái theo cỡ việc. Mày thấy sự kiện nào quá nhỏ hay quá lớn, gửi tên.
