# Báo cáo v6.7.0-d4

- Ngày: 13/11/2026 · Nền: v6.7.0-d3 · Nhánh: `v6.7.0-d4`
- Tổng sự kiện: 1.689 (d3: 1.660, thêm 30 sự kiện). Kỳ ngộ vẫn 258.
- Kiểm thử: `node --check` mọi file `.js`; chạy mọi lựa chọn của 31 sự kiện mới (61 lựa chọn): không lỗi; kiểm điều kiện xuất hiện của sự kiện hoàng tộc ở kinh thành; bot chơi 100 năm, kiểm bất biến hoàng tộc (thái tử còn sống, người trong khủng hoảng có thật, tuổi hợp lệ): không vi phạm. **Chưa** chơi tay, **chưa** đo cân bằng nhiều ván.
- Giang hồ và thế lực tự phát **chưa làm** (mày bảo để sau).

| Điểm mày nêu | Mục |
|---|---|
| Rượu thuốc, chữa bệnh bị tính phạm gia quy | 1 |
| Con ruột gặp kỳ ngộ nhận cha mẹ con nuôi | 2 |
| Thân vương chiêu binh: tâu lên vua vô tác dụng, lặp | 3 |
| Hòa giải xong vẫn hỏi "vua chưa lập thái tử" | 3 |
| Hệ thống hoàng tộc, quan lại có thật | 4, 5 |
| Nhắm ghế phải xét tài, công, giữ tên người đương chức | 5 |
| Cốt truyện hoàng thân phải có gặp mặt hợp lý | 6 |
| Lễ cưới, đám tang chỉ khác giá | 7 |
| Môn khách và các việc lớn phải đáng tiền | 8 |

## 1. Gia quy rượu
Luật "cấm cờ bạc, rượu" khớp chữ `rượu`, `nhậu` ở bất kỳ chỗ nào. Nay chỉ khớp hành vi (uống rượu, say rượu, nhậu nhẹt, chè chén, cờ bạc…) và loại trừ ngữ cảnh chữa bệnh, cúng, biếu, tặng. Mới rà luật cờ bạc và rượu; bốn nhóm luật còn lại giữ nguyên.

## 2. Con nuôi
`tk_a` (bà vú thú nhận gửi đứa trẻ năm xưa, cha mẹ ruột ở kinh) chỉ dành cho người là con nuôi. Tao chưa chắc đó có phải sự kiện mày thấy. Nếu còn thấy con ruột gặp chuyện nhận cha mẹ khác, báo tên sự kiện.

## 3. Tranh ngôi
- Mọi bước tranh ngôi (`tc_*`) chỉ mở khi khủng hoảng còn tồn tại, mỗi bước một lần. Hòa giải xong thì các bước còn trong hàng đợi tự bỏ.
- Hai bên tranh ngôi là **người thật** của hoàng tộc (mục 4). Hòa giải lập đúng hoàng tử ấy làm thái tử.
- Thân vương chiêu binh: nói rõ đất phong. Tâu lên vua có xúc xắc: thành thì quân bị tản, thân vương ghi oán, các bước sau nhắc lại; hụt thì bị coi vu cáo, thân vương mạnh thêm. Góp quân hay làm ngơ cũng để lại dấu mà bước sau đọc.

## 4. Hoàng tộc thật (`S.dyn.fam`)
Hoàng hậu, thái hậu, phi tần, hoàng tử (có thái tử), công chúa, thân vương (có đất phong), quốc công (có Phạm Nhật Vượng). Họ có tuổi, tài, đức, mẹ, phe; sinh, già, mất theo năm; hoàng tử lớn thì phong vương ra đất phong; công chúa lớn thì gả. Vua lập thái tử là một hoàng tử thật; vua mất thì người kế vị là người thật, hoàng tử còn lại thành thân vương. Mỗi người có `met` (nhà mình đã gặp chưa) và `rel` (cảm tình). Card "Người quen trong hoàng tộc" ở trang Thế giới chỉ liệt kê người đã gặp, nói bằng lời ("quý mến", "xã giao", "ác cảm").

**Gặp ở đâu, khi nào:** yến cung (quan Ngũ phẩm trở lên của nhà làm ở kinh thành) và đại lễ (từ Tứ phẩm, ở kinh); thân vương tuần phủ chỉ khi đất phong ở đúng tỉnh nhà mình; quốc công ghé quê; tranh ngôi cũng cho gặp phe mình ngả theo.

## 5. Người đương chức và thăng tiến
Mỗi ghế có người đương chức là nhân vật bền: tài, công, tiếng, phe, tính, cảm tình/oán với nhà mình. Hộp "Đường thăng tiến" hiển thị lại tên, tuổi, tiếng, và tài, công so với mình ("tài ngang mình", "công ít hơn mình"). Môn khách cho biết thêm tính, phe, ân oán. **Vượt cả tài lẫn công** thì có lựa chọn "Dâng biểu xin thay"; thành thì người cũ bị điều đi và ghi oán (dấu `oan_thay`), sau đó có thể hặc tội ngược (`tq_hac_toi_nguoc`). Sự kiện thượng quan, đồng liêu (`tq_`): mở tiệc, tiến cử, làm khó, tranh công, kết nghĩa. Chỉ xuất hiện khi nhà có quan ở ghế có thượng quan cùng tỉnh.

## 6. Cốt truyện hoàng thân (thử hai cái)
- **Phò mã** (`pc_0` đến `pc_6`): chỉ bắt đầu khi một người nhà (độc thân, từ Ngũ phẩm, ở kinh, nhà từ bậc Địa chủ trở lên) đã **gặp** công chúa và được thiện cảm; rồi ánh mắt, thư thơ, hoàng hậu cho gọi, tình địch, dâng biểu xin vua, lễ nạp thái, hôn lễ. Mỗi bước có thể hỏng, hỏng thì kết thúc. Thành thì cưới công chúa (qua hộp hôn lễ), nhưng phò mã không lên quá Ngũ phẩm thực quyền và mỗi năm tốn tiền cung phụng.
- **Tú nữ** (`vp_1` đến `vp_6`): con gái vào cung qua lệnh tuyển tú; vào cung, được vua triệu hay không, tranh sủng với phi thật, có con (thành hoàng tử hoặc công chúa **thật** trong hoàng tộc, nối vào việc kế vị), nhà ngoại thích được ban nhưng bị để mắt, thế đổi khi vua mới lên.
- **Vương phi** (`vpv_1`): thân vương đã quen nhà mình dạm hỏi con gái; gả thì có chỗ dựa lớn.

## 7. Lễ cưới, đám tang
Mỗi mức để lại dấu: tang sơ sài khi nhà có danh thì họ hàng bàn tán (`tl_tang_bac`); tang trang trọng thì có người nhớ ơn sau này (`tl_nho_on_tang`); hôn lễ sơ sài khi nhà bên cao hơn thì nhà thông gia coi nhẹ (`tl_thong_gia_chê`); hôn lễ linh đình thì nhà thông gia nhớ, mời hợp tác (`tl_thong_gia_hau`). Tình cảm vợ chồng khởi đầu cũng đổi theo mức lễ. Mới có bốn sự kiện hệ quả, còn ít.

## 8. Việc lớn có đáng tiền không (mới sửa bốn việc)
- **Đội thuyền buôn:** trước đây lỗ nặng (thu theo thang THU quá nhỏ so với duy trì). Nay thu theo thang CHI, hòa vốn khoảng 10 năm, có rủi ro bão.
- **Khai hoang:** trước đây +2 mẫu cho 300 đơn vị (một phần nhỏ giá đất). Nay số mẫu theo vốn bỏ ra, rẻ hơn mua 30%.
- **Môn khách:** quan trong họ ít bị tra hơn mỗi năm; mỗi năm có mối làm ăn do môn khách mách (bỏ vốn nhỏ, thành thì lãi gấp ba); biết tính, phe, ân oán người đương chức. Thành hay không vẫn do xúc xắc, nhưng kỳ vọng có lãi.
- **Gia binh:** người trẻ trong nhà luyện võ dần; vượt sức nhà thì triều đình nghi.
- **12 dự án còn lại chưa rà theo nguyên tắc này.**

## Còn lại cần mày biết
- **Chưa làm so với kế hoạch** (`08-ke-hoach-dot4.md`): thế gia thành nhân vật; họ Phạm (Kiên, Duy) chưa vào hệ nhân vật thật; chưa có thanh trừng và đối địch giữa các quan với nhau; rà 12 dự án còn lại; giang hồ.
- **Số sự kiện triều đình còn ít** (30). Tao ưu tiên khung đúng trước. Mày chơi thử rồi báo chỗ thiếu.
- **Chưa kiểm bằng tay:** Phò mã, Tú nữ, vương phi, hộp hôn lễ, hộp thăng tiến. Ngưỡng điều kiện và xác suất mỗi bước là con số tao đặt, chưa đo.
- Không đảm bảo tương thích save cũ (đã thống nhất từ v6.7). Hoàng tộc được tạo lần đầu cần tới.
