# Báo cáo v6.7.0-d7.1 (mở rộng bộ nhớ, phần B quan trường)

- Ngày: 15/11/2026 · Nền: v6.7.0-d7 · Nhánh: `v6.7.0-d7.1` · Sự kiện: 1.693 (thêm 4).
- Nguồn: save họ Trịnh Trần năm 42 của mày (vợ không theo chi, võ quan hỏi thăng quá nhiều) và yêu cầu làm tiếp bộ nhớ và phần B.
- Kiểm thử: `node --check` mọi file; chạy mọi lựa chọn của 4 sự kiện mới (cả nhánh thành công và thất bại); chạy mọi lựa chọn 132 sự kiện Phạm; bot 100 năm kiểm `G.led.audit()` (không vi phạm); bot chạy trọn cốt truyện họ Phạm (kết E8). **Chưa** chơi tay. **Chưa đo được** tốc độ lên quan bằng bot (bot quan chết hoặc dừng sớm trong cả ván so sánh), nên các con số dưới đây là tính toán, không phải kết quả đo.

## 1. Lỗi từ save họ Trịnh Trần
- **Vợ không theo chồng sang chi khác:** thêm `hhSpouseSync` (chạy mỗi năm): vợ chồng còn sống, không đi xa, mà ở hai hộ khác nhau thì người vợ về ở cùng chồng (nếu cả hai cùng giới thì người trẻ hơn dời). Gia chủ ở nhà chính không bị kéo đi.
- **Võ quan hỏi thăng quá nhiều:** (a) khi "Trình công" thất bại, nghỉ xét 14 đến 26 tháng (trước 3 đến 5); (b) "Lặng lẽ chờ" mà chưa đến lượt thì nghỉ xét 10 đến 18 tháng (trước không nghỉ); (c) khi đủ công, xác suất mỗi tháng bật hộp xét công giảm một nửa (0,34 xuống 0,16; 0,2 xuống 0,08). Độ khó thăng của võ quan giữ nguyên.

## 2. Bộ nhớ (đợt A, bước tiếp)
- **Thăng bậc mọi nghề** nay ghi sổ (`thang`), thăng làm quan ghi (`chuc`).
- **Quy tắc theo nhãn lựa chọn** (áp cho mọi sự kiện chưa có khai báo riêng): chọn "Giúp, Cứu, Chu cấp, Phát chẩn, Cho mượn, Biếu, Mở kho, Nhận nuôi, Che chở" thì ghi `cuu`; "Đuổi đi, Đánh, Tố cáo, Bỏ mặc, Đòi nợ, Vu cáo" thì ghi `hai`; "Tha, Tha thứ, Bỏ qua cho" thì ghi `tha`. Bot 100 năm: khoảng 9 dấu `cuu` và 7 dấu `hai` mỗi ván.
- **Thêm vào `events-mem.js`:** ghi `tien_cu` ở `tq_xin_bao_lanh`, `cuu` ở `qn_cuu_tuong`; đọc: `su_mon_sinh_lam_quan` cần `day_hoc`, `lw_70` và `lw_75` cần `an` (từng bị xử án).
- Thêm khóa `mem.any` (một trong các ký ức) và `G.led.find/drop`.

## 3. Phần B: quan trường có người cản và người giúp
- **Thời gian ở bậc:** muốn lên bậc `b` phải ngồi ở bậc hiện tại ít nhất `10 + 2b` tháng. Đi thẳng một mạch từ bậc 0 lên bậc 16 (Nhất phẩm) mất tối thiểu 442 tháng, khoảng 37 năm, chưa kể thi cử và thiếu công.
- **Sức ép cạnh tranh** (`promoPen`): càng lên cao càng có người tranh, trừ 2,2 điểm xác suất mỗi bậc từ bậc 4 trở đi (tối đa 32). Được giảm bởi ơn sủng (`fav`) và dấu `tien_cu`; bị tăng bởi dấu `doi_thu` (có đối thủ) và `bi_hac` (từng hặc tội người khác). Áp cho "Xin xét ghế trống" và "Xin xét thay người đương chức".
- **Thua ghế thì có đối thủ có tên:** khi xin ghế trống mà thất bại, một đối thủ (tên và họ phát sinh) "được chọn trước" và ghi dấu `doi_thu`.
- **Bốn sự kiện mới (`ev-v670h.js`, id `qt5_*`):** "Có người chặn đường" (nhún nhường, đối đầu, nhờ người quen); "Đối thủ cũ trở lại" (cần dấu `doi_thu`: giảng hòa, hạ hắn, bỏ qua); "Người xưa nay đã có chỗ đứng" (cần từng cứu giúp hoặc dạy học; được tiến cử); "Người bị hặc năm xưa tìm đến" (cần dấu `bi_hac`).
- Cốt truyện họ Phạm: bỏ điều kiện "không có chiến tranh" để mở.

## Còn lại cần mày biết
- **Chưa đo tốc độ lên quan:** muốn kiểm có đúng như mong muốn (Nhất phẩm khoảng năm 38) thì mày thử chơi một ván theo đường quan và báo năm lên các phẩm. Nếu quá khó hoặc quá dễ thì chỉnh hằng `10 + 2b` và `(b-3)*2.2` trong `engine.js` (`tigOk`, `promoPen`).
- Mới 4 sự kiện quan trường và khoảng 20 sự kiện khác dùng bộ nhớ. Phần lớn 1.689 sự kiện cũ vẫn chưa được rà.
- Chưa làm: ứng viên NPC tranh ghế có hồ sơ riêng, thanh trừng giữa các quan, thế gia thành NPC.
- Không đảm bảo tương thích save cũ, nhưng save d7 vẫn nạp được (ký ức tự khởi tạo).
