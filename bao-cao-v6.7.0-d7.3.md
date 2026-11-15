# Báo cáo v6.7.0-d7.3 (phần D: gia chủ đi lính, phần E: gia quy)

- Ngày: 15/11/2026 · Nền: v6.7.0-d7.2 · Nhánh: `v6.7.0-d7.3` · Không thêm sự kiện (1.693).
- Kiểm thử: `node --check` mọi file; kiểm riêng `isCtrl` với gia chủ đi lính (vợ, con theo chồng), mọi lựa chọn `qt5_*`, hoàng tộc, 132 sự kiện Phạm; 2 ván bot kiểm sổ ký ức. **Chưa** chơi tay, **chưa** đo cân bằng gia quy bằng bot.

## D. Gia chủ đi lính
- **Lỗi:** vợ và con theo gia chủ đi lính mang trạng thái "theo chồng" (`away.type='follow'`), nên `isCtrl` coi họ là người đi xa khác và chuyển thành tự động.
- **Sửa:** người đang theo một quân nhân của nhà chính (hoặc của gia chủ) được tính là do mày điều khiển. Kiểm trực tiếp: gia chủ đi lính, vợ và con theo: cả ba đều do mày điều khiển. Gia đình lính ở chi riêng vẫn là tự động (cố ý).

## E. Gia quy tăng tốc cho con cháu phải có giá
Trước đó: `thuhuong`, `vanvo`, `thetap`, `thuongvo` hầu như không có giá, `hieuhoc` chỉ tốn 5% chi.
- Mỗi năm, trẻ 6 đến 17 tuổi trong nhà chịu thêm: `hieuhoc` tâm trạng -1; `thuhuong` tâm trạng -1; `vanvo` tâm trạng -1 và sức khỏe -1; `thuongvo` sức khỏe -2 (và tâm trạng -1 với con trai); `thetap` sức khỏe -2 với con trai.
- Chi tiêu của nhà: `thuhuong` +4%, `vanvo` +4%, `thuongvo` hoặc `thetap` +3% (`hieuhoc` vẫn +5%).
- Ổn định gia tộc: `thuongvo` -3, `thetap` -2.
- Mô tả gia quy trong game nay nêu cả lợi và giá. Các gia quy khác (`hoathuan`, `hieudao`, `doanket`, `tuquyet`, `dichton`, `nuhoc`) đã có giá sẵn nên tao không đổi; nếu mày muốn thêm thì nói.

## Còn lại cần mày biết
- Số liệu (−1, −2, +3%, +4%) là tao đặt, chưa đo. Mày chơi vài ván có bật các gia quy này rồi báo trẻ có yếu quá hoặc không đáng kể không.
- Phần C (đất phong thay ruộng đất) chưa làm; phần B còn thiếu ứng viên NPC có hồ sơ riêng, thanh trừng giữa quan, thế gia thành NPC.
- Công cụ test: `tools/run.js` (của tao) từng chọn nhầm ô lưu đã có dữ liệu nên không bắt đầu được ván; đã sửa chọn ô trống.
