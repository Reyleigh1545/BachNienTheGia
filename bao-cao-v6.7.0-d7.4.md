# Báo cáo v6.7.0-d7.4 (NPC có hồ sơ, tên không trùng, lưu cốt truyện vào sổ)

- Ngày: 15/11/2026 · Nền: v6.7.0-d7.3 · Nhánh: `v6.7.0-d7.4` · Không thêm sự kiện (1.693).
- Kiểm thử: `node --check` mọi file; chạy mọi lựa chọn `qt5_*`; bot 100 năm kiểm `G.led.audit()` (không vi phạm, có kiểm NPC trùng tên); kiểm sổ có ghi mở, rẽ nhánh, bước và kết cốt truyện. **Chưa** chơi tay. **Chưa làm phần C (đất phong).**

## Phạm: lặp tên (đã sửa) và vai vế (chưa sửa hết)
- **Lặp tên:** trong save họ Tiêu có người nhà tên "Trung Kiên" cùng lúc với "Phạm Trung Kiên", và "Pưn Duy" cùng lúc với "Nguyễn Thành Duy". Sửa: (1) các chữ Kiên, Duy, Huấn, Vượng bị cấm trong tên người nhà và NPC khi sinh tên mới; (2) khi cốt truyện họ Phạm bắt đầu, người nhà đã mang những chữ này được đổi (Kiên→Kiệt, Duy→Dũng, Huấn→Huân, Vượng→Vinh); (3) tên mới sinh còn tránh trùng tên người nhà hiện có và tên hoàng tộc.
- **Vai vế:** tao đọc lại các chỗ nhắc ông ta, hắn, em trong sự kiện Phạm: Kiên là em của Vượng (cùng con của Huấn), Duy và Kiên đều có tuổi tăng theo năm. Tao thấy chỗ lẫn xưng hô: Duy có nơi gọi "ông" và có nơi gọi "hắn" cho cùng một người, và Duy mới ba mươi mấy tuổi lúc bắt đầu. **Tao chưa sửa xưng hô trong chữ** vì "ông ta" trong chữ có chỗ chỉ Duy, chỗ chỉ người khác (người làng, thầy cãi). Mày chép giúp tao câu cụ thể bị sai vai vế, tao sửa đúng chỗ.

## NPC thật (phần B còn thiếu)
- Sổ `S.np`: NPC có tên duy nhất (không trùng người nhà hay NPC khác), tuổi tăng theo năm, có thể mất (xác suất tăng sau 62 tuổi, ghi sổ `np_chet`), ký ức riêng (`np.mm`). Giữ tối đa 200 NPC đã mất.
- Đối thủ khi mất ghế (`qt5_*`) giờ là NPC thật: sống, già đi, có thể chết; sự kiện "Đối thủ cũ trở lại" chỉ xuất hiện khi hắn còn sống và hiện tuổi của hắn. NPC nhớ người đã tranh với mình (`oan`).
- Chưa chuyển: người giữ ghế (`S.off`), hoàng tộc và nhân vật Phạm (Kiên, Duy, Huấn, Vượng) vào sổ NPC chung.

## Lưu cốt truyện vào sổ
- Mỗi cốt truyện lớn ghi vào sổ gia tộc khi mở (`arc_open`), khi rẽ nhánh không đảo ngược (`arc_fork`), khi kết (`arc_end`), và mỗi bước (`arc_step`, ghi cả vào ký ức của gia chủ, phai dần). Bot: một ván có 36 bước Phạm được ghi.

## Còn lại cần mày biết
- **Phần C (đất phong thay ruộng đất) chưa làm.** Tao tách ra thành nhiều lô để thử từng cái, sẽ bắt đầu ở bản kế tiếp.
- Số sự kiện gắn bộ nhớ vẫn khoảng 20 trên 1.693. Danh sách ứng viên tiếp theo cần mày chơi để thấy chỗ nào lạc lõng.
- Chưa có kiểm tra tự động bắt xưng hô sai vai vế.
