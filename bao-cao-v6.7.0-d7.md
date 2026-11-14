# Báo cáo v6.7.0-d7 (đợt A: sổ sự kiện và ký ức)

- Ngày: 15/11/2026 · Nền: v6.7.0-d6 · Nhánh: `v6.7.0-d7`. Kế hoạch: `Kế hoạch và đánh giá/ke-hoach-v6.7/12-dot-A-bo-nho-cac-phuong-an.md`.
- Kiểm thử: `node --check` mọi file; 6 ván bot 100 năm kiểm `G.led.audit()` và bất biến (sau khi sửa ghi chết do tru di, đẻ muộn, diệt tộc thì không còn vi phạm); chạy lại chạy tất cả lựa chọn sự kiện Phạm và hoàng tộc. **Chưa** chơi tay.

## Nội dung
Người chơi **không thấy và không tác động** được gì. Phương án đã chọn: ghép P3 (sổ) và P2 (ký ức), cộng cổng P4 và hạ tầng cho P5, P6 (xem `12-dot-A-bo-nho-cac-phuong-an.md`).
- **Sổ chung** `S.led` (nguồn sự thật, trần 3.000 dòng, cũ hơn gộp vào `S.ledSum` theo thập niên) ghi: sinh, chết, cưới, nhận con nuôi, thăng chức, án (luật), đỗ Đình, đổi vua, kết cốt truyện, tru di, tin quan trường, và dấu gặp gỡ (`gap`) giữa hai người trong sự kiện có người thứ hai.
- **Ký ức từng người** `c.mm` (trần 60) và **ký ức gia tộc** `S.fm` (trần 200): loại, trọng số, người liên quan, phai mỗi năm (trừ loại giữ vĩnh viễn như cưới, chết, con).
- **Cho sự kiện:** khóa `mem:{need,not,fneed,fnot,gap}` (kiểm trong `eligible`/`eligibleWhy`) và khóa `led` (ghi sau lựa chọn, có thể lọc theo nhãn). Khai báo trong `events-mem.js` theo id, không sửa từng pack.
- **Cặp đầu tiên:** dạy học trò, cứu giúp, lật án oan, rồi mới có "Học trò báo ơn", "Người được cứu nhớ ơn", "Người xưa báo ân", "Học trò đỗ đạt", "Án oan được rửa".
- **Kiểm:** `G.led.audit()` (sổ tăng dần, không chết hai lần, người chết có trong sổ, ký ức không trỏ người không tồn tại, trần), `G.led.dump(người)` để đọc. Bot 100 năm: không vi phạm, sổ khoảng 90 dòng, khoảng 12 KB mỗi ván.
- **Chưa làm:** chuyển các sự kiện còn lại (hiện mới 12). Danh sách ứng viên sẽ lập tiếp sau khi có số đo.
