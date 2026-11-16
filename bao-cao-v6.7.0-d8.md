# Báo cáo v6.7.0-d8 (phần C: đất phong thay ruộng đất)

- Ngày: 16/11/2026 · Nền: v6.7.0-d7.5 · Nhánh: `v6.7.0-d8` · Sự kiện 1.693 (không thêm), dự án 15 (bỏ "Khai hoang").
- Kiểm thử: `node --check` mọi file; kiểm riêng bằng script: cấp đất phong, bắt đầu 8 dự án, kiểm sổ mẫu đất, khai hoang xong sau mười hai tháng, thu tô theo mùa gặt cả năm, vẽ trang Đất phong, thu nhập tá điền; hai ván bot 100 năm kiểm sổ ký ức; mọi lựa chọn 132 sự kiện Phạm và 4 sự kiện `qt5_*`; bot chạy trọn cốt truyện Phạm. **Chưa** chơi tay. **Chưa** rà từng sự kiện cũ nhắc đến "ruộng nhà".

## Đã làm
- **Nhà thường không có ruộng.** Ván mới của tá điền không còn mẫu ruộng nào; tá điền ở nhà chính **đi làm thuê**, lấy công khoảng 450 đồng mỗi tháng nhân theo tay nghề và tâm trạng, nhiều hơn vào mùa vụ, giảm khi thiên tai. Trang "Ruộng vườn" (mua, thuê, thuê người, tự cày) bị bỏ.
- **Trang "Đất phong"** chỉ hiện khi nhà có đất. Đất gồm: đất phong theo tước vị (như cũ), đất mua (**chỉ mua được khi trong nhà có người làm quan hoặc có tước**, giá bằng 60% giá một mẫu ruộng cũ), và được chia ba phần: cơ sở (dự án), ruộng đã khai hoang cho tá điền, và đất hoang còn trống.
- **Khai hoang:** mỗi lần bấm là một mẫu, tốn bằng 40% giá một mẫu, mười hai tháng sau thành ruộng.
- **Phát canh:** ruộng đã khai hoang do tá điền cày. Tô thu theo mùa gặt (nhiều vụ một năm), **30% (nặng), 20% (vừa), 10% (nhẹ)** của giá trị nông sản tá điền thu về, bằng tiền hoặc nhập kho. Phần ruộng chưa chỉ định thì tá điền tự quyết, thường trồng lúa; chỉ định theo bảng gieo trồng cũ thì tá điền trồng theo. Mức nhẹ vẫn có tiếng thơm, mức nặng mang tiếng địa chủ (như cũ).
- **Dự án cần đất:** mỗi cơ sở cần số mẫu theo độ lớn, thiếu đất trống thì không xây được: nghĩa trang 3, nghĩa thục 4, tàng thư 3, chùa miếu 2, kho thóc 1 + 1 mỗi kho, thuyền buôn 1 + 0,5 mỗi thuyền, gia binh 2 + 0,1 mỗi người, môn khách 1 + 0,15 mỗi người, học bổng 1 + 0,1 mỗi học trò. Hội quán, dinh thự ở kinh thành, quyên nạp không cần đất. Tăng quy mô cơ sở (thêm người, thuyền…) cũng cần thêm đất. Dự án "Khai hoang" cũ bị bỏ.
- Nhân vật Kiên và Duy của cốt truyện Phạm được ghi vào sổ NPC (kiểm tên và tuổi trong `G.led.audit`).

## Chưa làm, nói thẳng
- **"Thua đất khi lên hương thân":** chưa làm (chưa có sự kiện nào đòi đất của nhà).
- **Chưa rà từng sự kiện cũ.** Một số sự kiện nghề nông, tá điền (`nong_*`, `tg_*`) có thể còn nhắc "ruộng nhà" hoặc cộng ruộng; đất cộng bằng sự kiện nay thành đất hoang.
- Cân bằng chưa đo: giá khai hoang và mua đất, mức lương tá điền (450), số mẫu mỗi dự án đều tao đặt.
- Chưa làm: người giữ ghế và hoàng tộc vào sổ NPC chung, xưng hô sai vai vế trong chữ cốt truyện Phạm (cần mày chép vài câu cụ thể), chuỗi cũ chưa có "câu nối" riêng.
- Save cũ có ruộng (`own`, `rent`) không còn chức năng ruộng cũ: `own` thành đất hoang, `rent` bị bỏ.

## Ghi chú kỹ thuật
- Thư mục scratch của tao bị dọn các tệp lâu không chạm đến (các `ev-*.js`, `data-v64*.js`), nên tao luôn khôi phục từ zip mới nhất trước khi test và đóng gói; zip d8 đủ 44 tệp `ev-*.js` và 4 tệp `data*.js`.
