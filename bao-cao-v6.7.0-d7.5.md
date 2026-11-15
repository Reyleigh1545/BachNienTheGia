# Báo cáo v6.7.0-d7.5 (nhật ký popup cho kiểm thử, bỏ cấm tên, không chơi họ Nguyễn)

- Ngày: 15/11/2026 · Nền: v6.7.0-d7.4 · Nhánh: `v6.7.0-d7.5` · Không thêm sự kiện (1.693).
- Kiểm thử: `node --check` mọi file; chạy mọi lựa chọn `qt5_*`, hoàng tộc, 132 sự kiện Phạm; hai ván bot 82 và 100 năm, kiểm `G.led.audit()`, đếm popup và chạy bộ kiểm sai người; kiểm công cụ ngoài `tools/evcheck-save.js` trên một save thử. **Chưa** chơi tay.

## Mày nói gì và tao làm gì
- **Bỏ cấm tên:** đã bỏ hoàn toàn (không còn danh sách tên bị cấm, không còn tự đổi tên người nhà). Chỉ còn một ưu tiên mềm: khi sinh tên mới, thử tránh tên đang có người trong nhà hoặc hoàng tộc dùng; hết lượt thử thì vẫn dùng. Nếu mày thấy cả cái này cũng không muốn thì nói để tao bỏ.
- **Họ Nguyễn:** ô nhập họ khi tạo nhân vật không nhận "Nguyễn" (hiện dòng báo "họ của hoàng tộc, không chọn được"); họ ngẫu nhiên ban đầu cũng không bốc Nguyễn. NPC và gia đình khác vẫn có thể mang họ Nguyễn.
- **Bộ nhớ nhân vật ghi hết popup (mục tiêu gốc của đợt 7):** tao đã đi lệch, chỉ ghi các mốc đời (sinh, chết, cưới, thăng chức…). Bản này thêm **nhật ký popup đầy đủ** `S.evl`.

## Nhật ký popup
- **Mỗi popup được gọi ra** (mọi loại: sự kiện, việc làm, học, luật, thai, bệnh, hưu, di chúc…) ghi một dòng: tháng, id người nhận, loại, id sự kiện, lựa chọn đã chọn (hoặc "bỏ qua" nếu hệ thống bỏ), tuổi, nghề, giới tại lúc gọi, có tự quyết hay không, và id người thứ hai nếu có.
- Người chơi không thấy. Giữ tối đa 9.000 dòng (cũ nhất rút bớt). Ván bot 82 năm: 347 dòng, khoảng 28 KB.
- **Kiểm sau ván:** `G.led.check()` trong game, hoặc ngoài game bằng `node tools/evcheck-save.js <file-save.json>`. Công cụ đối chiếu từng lần gọi với điều kiện của sự kiện (khoảng tuổi, giới tính, nghề, người thứ hai còn tồn tại, người đã chết, gặp lại cùng sự kiện dưới 36 tháng) và in các lần gọi sai người cùng danh sách người nhận nhiều popup nhất. `tools/evrules.json` là bảng điều kiện sự kiện (sinh lại khi thêm sự kiện).
- **Phát hiện đầu tiên từ công cụ:** `hv_tuan_du` lặp sau 6 tháng cho cùng một người (hệ thống hoàng tộc xếp lịch hằng năm không có thời gian nghỉ). Đã sửa: ít nhất 48 tháng giữa hai lần (và 60 tháng cho `hv_quoc_cong_que`).

## Còn lại cần mày biết
- Công cụ kiểm hiện chỉ bắt được điều kiện cứng của sự kiện (tuổi, giới tính, nghề, người thứ hai). Điều kiện viết bằng hàm riêng (`c:`, `pair:`, cấp bậc, hoàn cảnh nhà) chưa kiểm ngoài game.
- Nghề trong nhật ký là nghề lúc popup hiện, có thể khác nghề lúc sự kiện được chọn nếu người đó đổi nghề giữa chừng, nên đôi khi báo nhầm.
- Mày chơi xong gửi save, tao chạy công cụ ngay để liệt kê sự kiện gọi sai người.
- Phần C (đất phong) và xưng hô sai vai vế trong chữ cốt truyện Phạm vẫn chưa làm.
