# Báo cáo v6.7.0-d5

- Ngày: 14/11/2026 · Nền: v6.7.0-d4 · Nhánh: `v6.7.0-d5`
- Sự kiện: 1.689 (không thêm sự kiện mới; đợt này sửa cơ chế). Kỳ ngộ 258.
- Kiểm thử đã chạy: `node --check` mọi file; chạy mọi lựa chọn của 132 sự kiện Phạm (390 lựa chọn) và 31 sự kiện hoàng tộc, quan, hệ quả (không lỗi sau khi sửa một chỗ thiếu kiểm null); mô phỏng học tập (36 trẻ, ba mức tiềm năng, ba kiểu trường); bấm thử từng nút của hộp thăng tiến mới; bot chơi 100 năm 3 ván kiểm bất biến hoàng tộc và `audit` (không vi phạm); bot đo tần suất sự kiện 4 ván (trước khi sửa); chụp ảnh trang Cơ ngơi và Gia tộc. **Chưa** chơi tay. Một số cơ chế mới (danh sách chờ, quan lộ lên Nhất phẩm) chưa đo bằng nhiều ván.

| Điểm mày nêu | Mục |
|---|---|
| Làm quan đúng nơi ở vẫn bị hỏi dời nhà | 1 |
| Nhiệm kỳ hỏi liên tục | 1 |
| Hộp thăng tiến quá tải; bỏ nhắm ghế; giữ xin xét, hặc tội, lo lót; xin hụt vào danh sách chờ | 2 |
| Thăng phải lên bậc hoặc ghế tốt hơn; quan Nhị phẩm đứng mãi; khép ân oán thì mỗi quan thêm một bậc | 2 |
| Quan thanh liêm vẫn bị tố trốn thuế | 3 |
| Học tập, con cháu thấp hơn cha mẹ, học võ ít hơn trí | 4 |
| Con cháu trùng nghề; thư lại dừng sớm | 5 |
| Học phí nên tăng | 4 |
| Dự án: lãi không có, lỗ nặng, không biết lãi hay lỗ; bỏ cái vô dụng; gia quy cho danh vọng | 6 |
| Sự kiện, kỳ ngộ lặp, hiện không cần thiết | 7 |
| Cơ ngơi và Gia tộc tràn thông tin; khoảng trống | 8 |
| Tạo nhân vật ngẫu nhiên, chỉ chọn họ tên và giới tính; dòng giới thiệu hé lộ | 9 |
| Cơ sở kinh doanh mất trắng khi dời nhà | 10 |
| Già mà mị lực không giảm | 11 |

## 1. Nhậm chức và nhiệm kỳ
- Nguyên nhân dời nhà: `needMove` so ghế với tỉnh nhà chính, không so với nơi người ấy thật sự ở. Nay so với nơi thật (chi họ ở xa tính theo tỉnh của chi).
- Hết nhiệm kỳ tự xử: chỉ ghi một dòng nhật ký (hạ, trung hay thượng đẳng). Thượng đẳng ghi công; đủ điều kiện thì mở hộp thăng tiến.

## 2. Hộp thăng tiến và quan lộ
- Danh sách ghế xếp từ cao xuống thấp. Mỗi dòng ghi tên ghế, tên người đương chức, tuổi, tài và công so với mình.
- Còn bốn lựa chọn: **Xin xét** (thay người hoặc xin ghế trống), **hặc tội**, **lo lót**, **yên phận**. Bỏ "nhắm ghế". Hặc tội và lo lót nhằm vào ghế có người ở trên cùng danh sách.
- Xin xét hụt: tên vào **danh sách chờ**. Ghế trống thì người chờ có tên được bổ ngay; ghế có người thì mỗi năm xét lại, vượt tài và công thì được thay.
- Quy tắc: chỉ ghế cao hơn một bậc trở lên, hoặc cùng bậc nhưng bổng lộc và địa vị cao hơn. Không còn ghế ngang hoặc thấp.
- Ngưỡng thăng ở bậc cao nhẹ hơn (trí và thông thạo trước đây đòi tới 97 đến 101, nay tối đa 92). Đây là nguyên nhân chính khiến quan Nhị phẩm đứng mãi.
- Khép ân oán họ Phạm bằng E1 đến E5: mỗi người làm quan trong nhà được thêm một bậc (lời hứa trước đó tao chưa làm).

## 3. Trốn thuế
Sự kiện đối thủ tố trốn thuế (`rv_to_cao`) hiếm khi tới (giảm 90%) khi nhà có quan liêm chính từ 70 trở lên.

## 4. Học tập (đo thật)
Mô phỏng 12 trẻ mỗi ô, tiềm năng 50/70/90, học đủ ba cấp:
- Trường trí (tư thục, huyện, phủ): trí 67/76/83.
- Trường võ (võ đường làng, võ đường, trường võ học): võ 57/71/81 (lần đo trước khi tăng điểm học võ là 59/68/83: chênh lệch nằm trong sai số ngẫu nhiên của 12 trẻ mỗi ô, nên chưa thấy tác dụng rõ của việc tăng điểm học võ). Học võ vẫn thấp hơn học trí chút ít ở tiềm năng cao (81 so với 83) và ở tiềm năng thấp (57 so với 67).
- Ở nhà: chỉ 31 đến 57, gần bằng bẩm sinh.
Nguyên nhân con cháu "học đủ vẫn thấp hơn": **trẻ không do người chơi trực tiếp quản lý tự vào trường theo `schoolAuto`, mà hàm này chỉ chọn "cha mẹ dạy" hoặc ở nhà**, nên chỉ đạt khoảng nửa tiềm năng. Nay `schoolAuto` chọn trường trả phí hợp với tiềm năng (trí, võ, hoặc mị lực cho con gái) nếu nhà đủ tiền cho 4 năm học.
Học phí mọi trường tăng 1,6 lần. Điểm học võ tăng (võ đường làng 5 lên 6, võ đường 7 lên 8, võ phái 12 lên 14, trường võ học 8 lên 10).

## 5. Nghề
- Nhà đã có từ hai người cùng nghề thì nghề đó kém hấp dẫn với người tiếp theo (trừ nghề nông, quan, chủ cơ sở, nội trợ).
- **Thư lại** (tìm hiểu lịch sử: thư lại, điển lại, đề lại là ngạch lại điển; thời Minh, Nguyễn họ làm đủ năm, ghi công tốt thì được xét "xuất thân" làm quan phẩm thấp, nhưng hiếm khi lên quá Lục phẩm và bị sĩ phu coi khinh). Nay đề lại đủ điều kiện được xin xuất thân làm quan, giới hạn Lục phẩm.
- **Chưa làm:** thêm nghề mới hợp con cháu đời sau.

## 6. Dự án
- Bỏ ba dự án không có tác dụng thực: từ đường lớn, nghĩa điền, cầu đê đường làng. Chùa miếu giữ nhưng bỏ phần danh vọng, đổi thành tâm trạng và hồi sức.
- Mỗi dự án có sổ: "Đã chi X, đã thu Y, lãi hoặc lỗ Z" (chi gồm vốn xây và phí duy trì).
- Giảm phí duy trì của các dự án (nghĩa trang, nghĩa thục, tàng thư, kho thóc, thuyền buôn, môn khách, hội quán, dinh thự, học bổng). Thuyền buôn thu hơn chi, hoàn vốn khoảng bảy năm. Môn khách mách mối làm ăn nhiều hơn khi nuôi đông, lãi lớn hơn.
- Gia quy bỏ phần cộng danh vọng (thanh liêm, nghiêm trị gian tham, khoan hậu với dân, kính tổ). Kính tổ không còn tốn tiền.
- **Chưa kiểm** bằng ván thật: môn khách ở mức nuôi vừa phải có thể chỉ hòa vốn.

## 7. Sự kiện lặp
Đo bằng bot trước khi sửa: `gt_nha_chat` 15 đến 16 lần/ván, `rg_thiep_moi` 13, `hg_n_*` 7 đến 10, `benh_dich` 7 đến 10, `v6_danh_nhau` 10 lần trên cùng một người. Nay:
- Sự kiện ngẫu nhiên tối thiểu 36 tháng giữa hai lần trong cả nhà và 120 tháng trên cùng một người.
- Sự kiện chỉ có một lựa chọn trơn (không xúc xắc, không tiền) không hiện hộp nữa, ghi thẳng vào nhật ký (ví dụ `tt_cau_hien`, `tt_dai_xa`). Sự kiện cốt truyện không bị ảnh hưởng.
- Dịp yến cung chỉ đến mỗi 5 năm với cùng một người.
- Tao **chưa chạy lại** bot đo tần suất sau khi sửa.

## 8. Giao diện
- Cơ ngơi: hộp "Chức trong tộc" nay nằm cạnh Công quỹ và Nhà chính để lấp khoảng trống bên phải (chỉ hiện khi gia tộc đã lập chức). Phần "Có thể làm" của dự án gập lại.
- Gia tộc: các thẻ Triều đình, thời thế, hoàng tộc, cướp ngôi, triều đình gom vào một khối gập.
- Đã chụp ảnh kiểm hai trang.

## 9. Tạo nhân vật
Chỉ còn họ, tên, giới tính. Xuất thân, nghề và nơi lập nghiệp ngẫu nhiên. Dòng giới thiệu có một câu hé lộ chuyện cũ theo nguồn gốc oán của ván, và câu "mỗi lần có người nhắc họ Phạm, cả nhà đều im".

## 10. Dời nhà
Cơ sở làm ăn được dời theo cả nhà, không bán. Chỉ trả thêm phí di chuyển bằng 10% giá trị (25% khi chạy nạn). Ruộng ở nơi cũ vẫn bán.

## 11. Nhan sắc
Từ 38 tuổi mị lực giảm mỗi năm (0,6; từ 50 là 1,2; từ 60 là 1,8; người có nét đẹp bẩm sinh phai chậm hơn). Danh hiệu mị lực mất dần theo. Người ngoài vào nhà ở tuổi lớn cũng đã phai sẵn.

## Còn lại cần mày biết
- Chưa tìm ra nguyên nhân hai lần hẹn `su_tro_ngheo_bao_an` giống nhau trong hàng đợi của save Hạng, nên chưa sửa.
- Ván bot "chọn tỉ lệ cao" thường kết thúc sớm (gia tộc còn 1 đến 4 người sau 50 đến 85 năm). Tao chưa điều tra đây là lỗi hay do bot.
- Chưa thêm nghề mới cho đời sau; chưa rà lại các khoản chi thế gia (mày bảo ổn).
- Hộp thăng tiến, danh sách chờ, và đường lên Nhất phẩm cần mày chơi để xác nhận có thông thoáng chưa.
- Không đảm bảo tương thích save cũ (đã thống nhất từ v6.7).
