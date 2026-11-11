# Báo cáo v6.5.2 · Gia phả, quan võ, chiến công, nơi ở của người nhậm chức

- Ngày: 11/11/2026. Nhánh `v6.5.2`, cắt từ `v6.5.1`.
- Số sự kiện: không đổi.
- Kiểm tra: `node --check` toàn bộ file; smoke ngắn trên admin: trục xuất một người thì họ biến khỏi cây, cho về thì hiện lại; xem một chi thì cây chỉ còn đúng chi đó, không còn nút làm mờ; hộp "Xin giải ngũ" mở được với 4 lựa chọn; Đại tướng quân cần 1.500. **Không** chạy ván dài, không thử từng nhánh của hộp giải ngũ, không thử cổng trí.
- Save cũ nạp được; không thêm trường mới bắt buộc.

## Đã làm

| Điểm | Mục |
|---|---|
| Trục xuất là biến mất khỏi gia phả | 1 |
| Xem chi hoặc nhà chính thì ẩn hết phần còn lại | 2 |
| Chiến công, Đại tướng quân 1.500 | 3 |
| Quan võ từ quan (giải ngũ) | 4 |
| Quan võ cao cần trí | 5 |
| Nơi ở của người nhậm chức | 6 |

## 1. Trục xuất
Người bị trục xuất không hiện trong cây gia phả, kể cả khi là vợ/chồng của người còn lại hay là một trong các con. Con cháu của họ vẫn hiện nếu bản thân không bị trục xuất (treo lên dưới ông bà, như 6.4.1.5.1). Cho về qua sự kiện "Người cũ trở về" thì hiện lại. Danh sách người và các trang khác vốn đã chỉ lấy người còn trong họ.

## 2. Xem chi
Chọn "Nhà chính" hoặc một chi thì cây được **vẽ lại** chỉ với người đang sống của chi đó. Không còn lớp làm mờ. Người góa vẫn hiện nếu còn ở chi đó. Chọn "Cả họ" thì như cũ (có cả người đã mất).

## 3. Chiến công
- Đại tướng quân cần **1.500** (trước 1.300).
- Mỗi tháng, người trong quân có chiến công thấp hơn mốc của cấp mình thì được nâng lên đúng mốc (trước đó có người giữ chức cao mà chiến công vẫn 0).
- Chưa thêm nguồn chiến công mới cho thời bình. Thời bình chiến công lên khoảng 9 mỗi năm ở cấp cao, thời chiến khoảng 30. Tướng quân lên Đại tướng quân cần hơn 600 chiến công, nên sẽ mất nhiều năm chiến sự.

## 4. Giải ngũ
Người trong quân có nút "Xin giải ngũ" ở trang cá nhân và ở hộp khảo khóa. Bốn lựa chọn: xin về quê (khó duyệt hơn khi có chiến sự, được cấp tiền lộ phí), cáo thương (khi sức dưới 60), về hưu (từ 55 tuổi), bỏ trốn (mất danh vọng, mang tiếng đào ngũ).

## 5. Trí cho quan võ
Lên cấp từ Bách hộ trở lên đòi thêm trí: Bách hộ 35, Thiên hộ 42, Phó tướng 52, Tướng quân 62, Đại tướng quân 72. Đủ chiến công mà thiếu trí thì chưa được xét thăng. Hiện **chưa có dòng nào báo cho người chơi** là đang thiếu trí; nếu mày thấy rối thì tao thêm.

## 6. Nơi ở của người nhậm chức (làm một phần)
- Thêm hàm `whereP` cho biết người đó thật sự ở đâu: nơi nhậm chức, nơi theo người nhà đi làm quan, chi họ xa, hoặc nhà chính. Trang cá nhân hiện dòng "Đang ở …" khi người đó không ở nhà chính.
- Chuyện cưới hỏi, gả đi và người thương của họ lấy theo nơi họ ở, không còn lấy theo nhà chính.

## Còn lại cần mày biết

- **Gia chủ nhậm chức xa vẫn ở nhà.** Từ 6.4.1.6 gia chủ phải ở nhà chính nên khi gia chủ được bổ vào ghế ở tỉnh khác thì ông ấy vẫn ngồi nhà mà làm quan từ xa. Đây là chỗ vô lý lớn nhất còn lại của mục "nhậm chức". Tao chưa sửa vì cách sửa đổi cách chơi (xem câu hỏi ở cuối tin).
- Sự kiện chung và kỳ ngộ vẫn lấy theo nơi ở của gia tộc. Chia theo nơi ở của từng người sẽ làm ở 6.5.9 cùng hệ nhóm sự kiện.
- Mục "rà các chỗ vô lý khi nhậm chức" (hồi tị, bỏ ghế, về hưu) mới rà ở mức nhìn code, chưa phát hiện chỗ hỏng.
