# Báo cáo v6.6.0 · Sửa lỗi, áp lực tiền, kết thúc đa dạng, tầng quyết định

- Ngày: 12/11/2026. Nhánh `v6.6.0`, cắt từ `v6.5.4.2`. Đây là bản gộp theo ý mày: sửa lỗi (6.5.5), áp lực tiền (6.6), kết thúc và hậu quả (6.7), giảm tải thông tin (6.8). Mỗi mảng là một commit.
- Số sự kiện: 1.302 (thêm 8: `rv_thon_tinh`, `rv_to_cao`, `rv_cai_nguoi`, `rv_lien_hon`, `rv_che_gieu`, `wl_thue_nang`, `wl_phu_ho`, `wl_dan_xin`). Kỳ ngộ: 224. `gt_nha_chat` thêm một lựa chọn.
- Kiểm tra: `node --check` toàn bộ; 40 năm máy tự chơi ván mới không lỗi; **nạp thử đúng file save năm 114 của mày**, nạp được, chạy 8 năm không lỗi, `audit` sạch; chạy thử từng lựa chọn của 8 sự kiện mới (thành và bại), hộp kết thúc, chia chi tự động, sinh con của chi họ. **Không** chơi tay, không đo cân bằng nhiều ván.
- Save cũ nạp được. `migrate` dọn một lần (cờ `fix660`): gỡ danh hiệu Thần không có người giữ thật, giữ tối đa hai người mang thiên mệnh. Trên save của mày, 17 người mang danh hiệu cấp Thần/thiên mệnh còn 2 người.

## Danh sách test, theo mảng

| Mảng | Vào đâu, làm gì, thấy gì là đúng |
|---|---|
| 1. Sửa lỗi | Ván mới: trẻ sinh ra không còn mang danh hiệu Thần hay "… cái thế". Chi họ rỗng: tiền về quỹ, nhà bán lại. Vợ trong chi họ mang thai, sinh con: không còn hộp hỏi. |
| 2. Tiền | Trang Cơ ngơi: dòng chi mới "Thuế, lễ lạt, quan lại sách nhiễu" khi quỹ từ 5 triệu đồng. Sự kiện vay, góp, cháy nhà: số tiền theo phần quỹ. |
| 3. Cướp ngôi | Bắt đầu một đường: mỗi tháng có khoản chi. Thất bại rồi trục xuất: vợ con bị đày, bị tịch biên, cả họ cấm thi năm năm. Trang Gia tộc có dòng báo thời gian bị khóa. |
| 4. Kết thúc | Sau năm 50, đủ điều kiện thì hiện hộp "Một trang sử" (bốn kiểu). Chọn "Khép lại" là hết ván, có màn Gia sử. |
| 5. Đối thủ | Từ bậc Hương thân trở lên, mỗi năm có xác suất gặp chuyện họ lớn, quan lại, người rủ hùn vốn, dân xin giúp. |
| 6. Tầng quyết định | Trang Gia tộc: thẻ "Quyền quyết định" với ba mức. Hộp sự kiện có người thứ hai thì có dòng "Liên quan". |

## 1. Lỗi đã sửa
- **Danh hiệu Thần lúc sinh.** `randomTraits` bốc cả đặc điểm `than_*` và `tm_*`. Đã loại hai nhóm khỏi hồ bốc. Save cũ: gỡ `than_*` không có người giữ trong `S.than`; thiên mệnh chỉ giữ tối đa hai người lớn tuổi nhất. Chỉ số tư chất đã được nâng của trẻ không hoàn lại được, nên một số trẻ vẫn có tư chất cao.
- **Chi họ rỗng.** Mỗi năm (tháng ba): hộ không còn ai thì tiền còn lại về quỹ, nhà không ai giữ (không `keep`, không cho thuê) được bán 50% giá. Nhà mày đánh dấu giữ lại thì không đụng.
- **Hộp của người chi họ.** Sinh con (`preg`, `birth`), bệnh nặng, nghỉ hưu, chọn nghề, vào trường của người ngoài quyền điều khiển đều tự quyết. Hộp sinh con sinh luôn bằng bà mụ làng, không hỏi tên bé.
- **Báo hai lần.** Việc lớn chỉ hiện hộp "Tin nhà", việc thường chỉ vào thư cuối năm. Ngưỡng "lớn" theo danh vọng nâng từ 5 lên tối thiểu 15 (hoặc 1% danh vọng gia tộc).
- **Cổng gia thế.** Tiểu hộ khá giả cần *căn cơ*: cơ sở, ruộng, quan chức hoặc tước (không bắt buộc cơ sở). Hương thân: có người làm quan, hoặc từ hai cơ sở, hoặc có tước. Thế gia bỏ yêu cầu cơ sở riêng lẻ (đã có quan to và thu nhập).
- **Võ lực.** Bỏ ràng buộc trí khỏi tốc độ rèn võ (bản 6.5.4 làm võ chậm khi trí thấp).
- **Thi cử.** Ước muốn đi thi: trí từ 75, tham vọng từ 60, tuổi tới 30, không quá bốn người đang thi cùng lúc. **Mới:** ước muốn thi võ cử (nam 16–30 tuổi, võ từ 60, tham vọng từ 50, không quá ba người cùng lúc).
- **Mở cơ sở.** Mỗi loại cơ sở có mức bão hòa theo quy mô nhà: 1 + (số người còn sống chia 25). Hết mức thì không ai xin mở loại đó nữa.

## 2. Áp lực tiền
- **Thuế gia nghiệp** (mới, trừ thẳng khỏi quỹ mỗi tháng): dưới 5 triệu đồng không đóng; từ 5 đến 20 triệu 0,1%; từ 20 đến 60 triệu 0,3%; trên 60 triệu 1% mỗi tháng. Ví dụ: quỹ 60 triệu đóng 135 bạc, 100 triệu đóng 535 bạc, 189 triệu đóng 1.425 bạc mỗi tháng. Trên save của mày, 8 năm chơi thử quỹ tụt từ 189 triệu xuống khoảng 134 triệu rồi còn tụt tiếp; điểm cân bằng nằm quanh 120 đến 130 triệu với thu nhập hiện có.
- **Chi theo phần quỹ.** Sự kiện thuộc nhóm "chi theo cỡ nhà" nay lấy khoản lớn hơn của (mức cũ) và (quỹ nhân hệ số sự kiện chia 9.000, chặn hệ số ở 400). Ví dụ ở quỹ 189 triệu: hùn vốn lớn 2,6 vàng, nộp đủ thuế 2,5 vàng, mở kho phát gạo 2 vàng. Nhà nghèo không đổi vì mức cũ lớn hơn.
- **Nhóm chi theo cỡ nhà mở rộng:** thêm 21 sự kiện (vay mượn, cháy nhà, góp đình, cứu đói, hùn vốn, giỗ, đòi chi xa góp…), toàn bộ các bước mưu đại sự (`ts_*`) và tám sự kiện mới (`rv_*`, `wl_*`).
- **Cơ sở cùng loại tranh khách nhau:** doanh thu mỗi cơ sở chia cho (1 + 0,1 × (số cơ sở cùng loại trừ 1)). Nhà 8 y quán thì mỗi y quán còn khoảng 59%.
- **Nuôi quân khi mưu đại sự:** từ bước đầu tiên, mỗi tháng trừ quỹ. Quyền thần 0,15% quỹ, võ quan và khởi nghĩa 0,3%, tối thiểu `mm(30)`. Quỹ âm thì thế lực và lòng dân hao.

## 3. Cướp ngôi: thất bại phải đau
- Khóa sau thất bại rút từ 60 xuống 30 năm; trang Gia tộc hiện "còn khoảng N năm nữa mới có người dám mưu đại sự".
- Trục xuất người mưu phản không còn rẻ: tịch biên, vợ và con của người ấy bị đày ra biên viễn 5 đến 10 năm, danh vọng gia tộc mất 30%, cả họ cấm thi năm năm. Tru di vẫn như cũ nếu mày chọn các lối khác.

## 4. Kết thúc đa dạng
- Bốn kiểu, mỗi kiểu hỏi một lần rồi nhắc lại sau 30 năm nếu từ chối:
  - **Thế gia ngàn năm:** từ năm 150, đời thứ sáu, danh vọng gia tộc 3.000.
  - **Đệ nhất phú hộ:** từ năm 50, tám cơ sở của gia tộc, quỹ 50 triệu.
  - **Danh môn khoa bảng:** từ năm 50, bốn người đỗ cấp cao nhất, đang có quan cấp 7 trở lên.
  - **Võ gia truyền đời:** từ năm 50, có Đại tướng quân và ba người từ cấp 5 trong quân.
- Chọn khép lại thì ván hết bằng màn "Gia sử" (người được nhớ, số đời, danh vọng, công quỹ).
- Cướp ngôi vẫn là một kết thúc riêng.

## 5. Đối thủ và chuyện nhà giàu
- Tám sự kiện mới. Mỗi năm (tháng chín), từ bậc Hương thân trở lên và quỹ từ 2 triệu đồng, xác suất gặp một chuyện là 20% cộng 6% mỗi bậc, cộng thù hằn tích lũy. Chuyện đã gặp không lặp trong 6 năm.
- Từ chối họ lớn, thua kiện, mặc kệ kẻ phá làm "thù hằn" tăng, thù hằn làm chuyện đến sớm hơn; hết dần theo năm.

## 6. Tầng quyết định và đỡ rối
- **Quyền quyết định** (trang Gia tộc): mức 0 như cũ; mức 1 chỉ gia chủ, cha mẹ, vợ con và trưởng chi do mày quyết; mức 2 chỉ gia chủ, cha mẹ, vợ con. Người còn lại tự quyết, việc lớn mới báo.
- **Dòng "Liên quan"** trên hộp sự kiện có người thứ hai (tên, tuổi, nghề, hai chỉ số nổi nhất), chỉ cho các sự kiện truyền đủ thông tin người thứ hai.
- **Đuôi kết quả gọn hơn:** bỏ các thay đổi ±1, tối đa sáu mục, giữ tiền và danh vọng.
- **Chia chi tự động:** hộp "Nhà đã chật" có thêm lựa chọn "Chia một chi mới ra ở riêng" (cặp vợ chồng có nhiều con cháu nhất ra riêng, quỹ cấp vốn 1% hoặc ít nhất 60 đơn vị tiền sự kiện).

## Còn lại cần mày biết
- **Chưa đo cân bằng nhiều ván.** Thuế là con số tao ước; chỉ chạy được 8 năm trên save của mày. Chỉ số 200, độ khó breakthrough, tốc độ rèn: tao **không** đụng vì không có dữ liệu. Mày chơi rồi báo.
- **Nội dung chưa tăng:** vẫn 1.302 sự kiện, 61% kho không bao giờ bốc ở ván 114 năm của mày. Cần viết thêm sự kiện theo trạng thái dài hạn và cooldown theo nhà; chưa làm.
- **Người thứ hai trong hộp sự kiện:** chỉ hiện cho sự kiện truyền sẵn `who`/`oid`/`xg`; sự kiện tự chọn người thứ hai trong lời mô tả (`pair`) chưa hiện, vì phải sửa từng sự kiện.
- **Thiên mệnh trẻ cũ:** tư chất của trẻ bị gán nhầm đã được nâng trước đó (88–100 một số chỉ số), tao không tính lại được.
- Dòng "tiền riêng/quỹ hộ" của chi họ chưa đổi.
