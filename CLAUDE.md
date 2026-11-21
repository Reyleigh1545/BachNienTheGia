# Bách Niên Thế Gia · CLAUDE.md

**Đọc hết file này trước khi làm bất cứ việc gì.** Đây là nguồn sự thật duy nhất về ý tưởng đã chốt.
- Báo cáo cũ, kế hoạch cũ, hay trí nhớ của Claude mâu thuẫn với file này → theo file này.
- File này mâu thuẫn với lời chủ dự án trong phiên hiện tại → theo lời chủ dự án, rồi **sửa file này ngay trong cùng commit**.
- Các báo cáo `bao-cao-*.md` và kế hoạch cũ đã gộp vào đây rồi xóa khỏi repo (còn trong lịch sử git, commit trước `claude-md`). Chỉ mở lại khi cần chi tiết kỹ thuật cũ.

Phiên bản hiện tại: **v6.7.0-d9.5** (nhãn `.verlbl` trong `index.html`). File này lập ngày 19/11/2026 từ các báo cáo v6.3.5 đến v6.7.0-d8.

---

## 0. Quy tắc làm việc (bắt buộc)

1. **Xưng hô:** chủ dự án gọi Claude là "mày", Claude xưng "tao". Trả lời tiếng Việt, ngắn, đi thẳng vào việc.
2. **Ưu tiên hiện tại:** hoàn thành gameplay trước, rồi mới sửa và cân bằng từng phần. Ngoại lệ, sửa ngay trong bản gần nhất: lỗi treo game hoặc kẹt hộp thoại, lỗi làm sai dữ liệu tích lũy theo năm tháng, lỗi nằm trong phần sắp làm tiếp.
3. **Ý mới của chủ dự án:** chép **nguyên văn** vào mục 10 trước khi code. Không diễn giải lại. Chỗ nào hiểu không chắc thì hỏi, không đoán. Làm xong thì chuyển ý đó thành luật ở mục 3 đến 8 và xóa khỏi mục 10.
4. **Không tự đổi luật đã chốt** (mục 3 đến 8). Thấy luật có vấn đề thì nêu ra và hỏi. Không tự "cải tiến" con số hay cơ chế ngoài phạm vi được giao.
5. **Không làm lại thứ trong mục 9 "Đã bỏ".**
6. **Nhánh:** mỗi bản một nhánh tên theo số bản (ví dụ `v6.7.0-d9.5`). **Không merge vào `main`** khi chủ dự án chưa bảo.
7. **Test:** mặc định chỉ `node --check` mọi file và một lần khởi động ngắn. Test kỹ hơn khi được bảo. Luôn nói rõ đã test gì, **chưa chơi tay** phần nào.
8. **Không viết file báo cáo mới.** Cuối mỗi phiên: cập nhật mục liên quan trong file này (luật mới, đã bỏ, đang làm dở ở mục 11), ghi tóm tắt vào commit message.
9. Sửa `index.html` xong thì chạy `node tools/make-admin.js` để dựng lại `admin.html`.
10. Viết sự kiện mới xong thì chạy `node tools/addmeta.js` để thêm metadata.
11. **Không giữ tương thích save cũ** (từ v6.7.0-d0) cho tới khi chủ dự án bảo bật lại.
12. Lựa chọn trong sự kiện **không kèm dòng chú thích**; chỉ ghi giá khi lựa chọn là trả tiền ngay. Không hiện phần trăm tỉ lệ thành ở bản thường. Hiện **đủ mọi dòng cộng trừ** kết quả, kể cả ±1.

---

## 1. Game là gì

Game trình duyệt, JavaScript thuần, không build. Mô phỏng một gia tộc qua nhiều đời dưới triều **Đại Nguyễn** hư cấu (lễ chế và luật kiểu Minh, Nguyễn; dùng Đại Minh luật). Mỗi lượt một tháng; việc xảy ra hiện thành hộp sự kiện có lựa chọn.

- **Người chơi điều khiển:** gia chủ, người nhà chính đang ở nhà, các chi chủ, người nhà chính đi lính và vợ con theo họ. **Tự quyết theo tính cách:** thành viên khác của chi họ, người nhà chính đi làm quan hoặc đi xa (trừ gia chủ). Việc tự quyết chỉ ghi nhật ký, cuối năm gộp thành "thư nhà"; chỉ hiện hộp khi hậu quả lớn.
- **Thang gia thế** (7 bậc): Bần hộ, Thường dân, Tiểu hộ khá giả, Hương thân, Hào phú, Thế gia, Danh môn vọng tộc.
- **Mục tiêu dài:** đưa gia tộc đi lên qua nhiều đời. **Lên ngôi là hết game**, có màn hậu sử, không "chơi tiếp".
- **Cảm giác mong muốn:** đời đầu khó, tích lũy cho con cháu; lên quan, lên tước, làm giàu đều phải mất nhiều đời; chọn khéo mới thắng.

---

## 2. Cấu trúc mã

| File | Vai trò |
|---|---|
| `index.html` | Giao diện, CSS, thứ tự nạp script: `data*.js` → mọi `ev-*.js` → `events-meta.js` → `events-mem.js` → `engine.js`. Thêm file sự kiện mới thì phải thêm thẻ `<script>` |
| `admin.html`, `admin.js` | Bản thử nghiệm: `index.html` + `admin.js` (nạp trước engine). Dựng bằng `tools/make-admin.js`. API ở `BNTG._adm` (tự chơi, ép xúc xắc, gọi sự kiện, vì sao sự kiện chưa ra, thống kê, kho sự kiện, cốt truyện) |
| `data.js` | Dữ liệu gốc `window.D`: nghề `JOBS`, gia thế `TIERS`, cơ sở `BIZ`, chỉ số, danh hiệu… |
| `data-v64.js`, `data-v64m.js` | Quan chế Đại Nguyễn: ghế quan văn, quan võ theo nơi |
| `data-v670.js` | Khung đại cốt truyện, hạt giống thế giới, Sử sách |
| `ev-cotran.js` | **Bản thử lấy ý từ tiểu thuyết Cổ Chân Nhân, file riêng**: xóa file và thẻ `<script>` là bỏ được (id `cv_*`, không file nào khác tham chiếu) |
| `data-giabao.js` | Gia bảo theo cái kết (file riêng, xóa được cùng thẻ script) |
| `ev-*.js` | Sự kiện, đẩy vào `window.EVF`. Dạng `{id,t,k,x,o:[{l,f\|r:[spec,khó],y,n}]}` cùng các khóa điều kiện `job, age, c, w, cd, pcd, fixed, arc…` |
| `events-meta.js` | Metadata từng sự kiện (domain, subdomain, trigger, độ hiếm, `who`, `sit`). **Chưa chính xác**, thiếu sự kiện từ d4 trở đi |
| `events-mem.js` | Khóa bộ nhớ theo id: `led` (ghi sổ sau lựa chọn), `mem` (điều kiện ký ức) |
| `avatar2.js`, `ui2.js`, `ui2.css` | **Giao diện mới, chỉ nạp ở `admin.html`** (do `make-admin.js` chèn). `avatar2.js`: ảnh đại diện mới (`AVA2.svg`); `ui2.js`: thẻ chân dung, thanh kết quả, hồ sơ nhiều trang, ô đất (`UI2`); `ui2.css`: kiểu, mọi luật dưới `body.ui2`. Cờ `BN_ADMIN.ui2` (tắt bằng `?ui=old`). Engine chỉ gọi khi cờ bật (`U2()`), nên `index.html` chưa đổi |
| `engine.js` | Toàn bộ logic, một IIFE, xuất `window.BNTG`. Khoảng 6.300 dòng dài |
| `tools/` | `make-admin.js`, `addmeta.js`, `classify.js` (dựng lại `events-meta.js`), `chain.js` (đo chuỗi cốt truyện), `evcheck-save.js` + `evrules.json` (đối chiếu nhật ký popup trong save), `run.js` (chạy thử bằng Chrome headless, đường dẫn Chrome Windows), `roots.json`, `roots-gen.js` |

Công cụ kiểm trong game: `G.led.audit()` (sổ và ký ức), `G.led.check()` (popup gọi sai người), `G.led.dump(người)`.

Kho hiện tại (d9.5): **1.719 sự kiện, 258 kỳ ngộ**. Mục tiêu dài hạn 5.000 sự kiện và 500 kỳ ngộ, nhưng **nội dung mới làm sau khi gameplay xong** (mục 0.2).

---

## 3. Luật đã chốt: gia tộc, người, chỉ số

**Nhân vật khởi đầu.** Tạo ván chỉ chọn họ, tên, giới tính; xuất thân, nghề, nơi lập nghiệp ngẫu nhiên. Hai chỉ số cao nhất trong trí, võ, mị lực, EQ được nâng lên ít nhất 60 (gen 62 đến 80). Mức 60 do chủ dự án yêu cầu ở d6, thay mức 80 của d1. Có tỉ lệ mang sẵn thói quen tốt rẻ tiền (55%), tật xấu nhẹ (20%), đặc tính tốt (40%). **Họ Nguyễn là họ hoàng tộc, người chơi không chọn được**; NPC vẫn mang họ Nguyễn được.

**Chỉ số.**
- Trần mềm theo tư chất; lớn tự nhiên không cộng chồng lên phần học được.
- Tốc độ sau 100: 100 đến 119 hệ số 0,6; 120 đến 149 hệ số 0,48; từ 150 hệ số 0,41 (d9.5, tăng từ 0,33 / 0,2 / 0,14 vì chủ dự án chưa ai đạt chỉ số 200 và danh hiệu Thần). Cùng bản: trần mềm từ 100 trở lên chỉ bóp tối đa còn 0,5 (trước 0,05); chờ thử lại mốc vượt rút còn 10 đến 30 tháng. Thử ép "đại thành" một người 25 tuổi, bot tự chơi 40 năm: trí 144 đến 150, võ 119 đến 136 lúc 65 tuổi (qua mốc 140 và 150); Bước 150 lên 200 chỉ mở bằng "Thiên cơ" (hàm thiencoTick): trước chỉ 0,03% mỗi tháng (khoảng 280 năm mới gặp), nay 1,2% nhân hệ số duyên (khoảng 7 năm), và đột phá thiên cơ chạy nhanh hơn (hệ số mốc 150 từ 0,6 lên 0,95; mốc 120 và 140 thành 0,9 và 0,8). Thử bằng người 30 tuổi sẵn 150, bot chơi tới 78 tuổi (4 ván, có thêm hệ số mốc 150 0,95): cả 4 ván mở được giới hạn 200 vào khoảng 71 đến 73 tuổi, nhưng chỉ số mới lên 167 và 159 nên **chưa ván nào chạm đúng 200**; với 6 ván ở mức thiên cơ thấp hơn thì 2 ván mở được. Từ 0 tới 150 mất khoảng 40 năm, nên **một đời vẫn khó**, hợp ý "tích lũy nhiều đời"; chờ chủ dự án chơi tay báo lại. Chuỗi khảo nghiệm Thần (th_vothan_1 và 2) đã chạy đúng khi đủ điều kiện (vo 200, nghề Võ lâm minh chủ, m 130).
- Mốc vượt 120 và 140 mỗi chỉ số có hai con đường riêng. Mốc không chặn theo tuổi; lựa chọn không hợp tuổi bị ẩn.
- **Sức khỏe:** tối đa cố định 100, không rèn lên, không có mốc vượt. Danh hiệu sức khỏe là **bẩm sinh** (tám mức, từ Cường tráng 7% tới Tiên phong đạo cốt 0,01%): ít bệnh, già chậm 2 đến 14 năm. Tuổi bắt đầu suy là chỉ số ẩn.
- **Mị lực** giảm từ 38 tuổi (0,6 mỗi năm; từ 50 là 1,2; từ 60 là 1,8).
- Võ lực không cần trí để rèn; nhưng chức quan võ cao đòi thêm trí (mục 4).
- Danh hiệu chỉ số chỉ tác dụng **lên chính người mang**, không lan ra gia tộc. Mô tả danh hiệu chỉ ghi tác dụng, ngắn gọn.

**Danh hiệu cấp Thần và thiên mệnh.** Không ai sinh ra đã mang danh hiệu Thần. Chín danh hiệu Thần, mỗi cái hai bước khảo nghiệm; tác dụng lên gia tộc nhỏ, chủ yếu giảm thiệt hại; mất ngay khi người giữ qua đời, sau đó có thể để lại đặc tính "cái thế". Thiên mệnh lúc sinh tỉ lệ 1/2.000. Giám Chính cần trí 200.

**Sinh con, di truyền.** Đã đặt gia quy số con thì **tuyệt đối không sinh vượt**, kể cả qua sự kiện. Giãn cách sinh dài. Tiềm năng của con tính theo cha mẹ lúc mang thai; tiềm năng bẩm sinh bằng 62 đến 92% gen.

**Hôn nhân.** **Một vợ một chồng**, không thứ thất, thiếp. Tái hôn thì người cũ vẫn giữ trên gia phả (chính thất, kế thất). Mỗi lần thành thân có hộp Hôn lễ ba mức theo bậc hai nhà; mức nào cũng để lại dấu (nhà thông gia nhớ hoặc coi nhẹ). Họ khác chỉ ngỏ thông gia khi nhà mình ngang hoặc cao hơn và hai nhà đã thân. Lính về phép chỉ cưới khi đã định hôn hoặc có người trong lòng.

**Tình duyên.** Tách khỏi hôn nhân, nhiều bước. Mở đầu chỉ cho người 18 đến 25 tuổi có tài, có đức; dễ rung động tùy tính cách. Cưới đúng người đã gặp.

**Tang lễ.** Ba mức. Mức "xứng" theo cái lớn hơn giữa danh vọng người mất và gia thế; mỗi mức để lại dấu. Nhà không đủ tiền cho mức xứng thì phạt danh vọng nhẹ (tối đa 12) và không để lại tiếng xấu (d9.4).

**Gia quy.** Mỗi gia quy cấm thuộc một nhóm phạt cố định (không có vi phạm / phạt tiền, đòn roi / trục xuất / xử tử tại gia). Vi phạm không phải lúc nào cũng lộ; lộ thì gia chủ thi hành hay tha, tha nhiều thì uy gia pháp giảm. Xử tử tại gia có cái giá. Trục xuất trước khi án nổ thì nhà chính thoát liên lụy. Mỗi năm nhắc lập gia quy nếu còn chỗ. Gia quy tăng tốc cho trẻ (hiếu học, thư hương, văn võ, thượng võ, thể tập) **phải có giá** (tâm trạng, sức khỏe, chi tiêu). Gia quy không cộng danh vọng. Luật rượu, cờ bạc chỉ khớp hành vi, không khớp rượu thuốc, cúng, biếu.

**Quyền gia chủ, chi họ.** Tách họ gốc, hộ, chi. Bổ nhiệm, người ra mặt chỉ lấy người nhà chính. Truyền nghề chỉ trong chi chính. Tàng thư theo hộ. Chi họ rỗng thì tiền về quỹ, nhà bán 50%. Chi xa dời nơi thì dời chính hộ đó (giữ tên, quỹ). Vợ chồng ở khác hộ thì vợ về ở với chồng (trừ gia chủ nhà chính). Con cháu đã có vợ chồng ở nhà chính: chỉ số phụ **tự lập** (`dl`) từ 80 thì ước muốn ra ở riêng x3, từ 70 x1,6, từ 40 trở xuống x0,5. Đủ 18 tuổi có việc thì tự lo.

**Trục xuất.** Người bị trục xuất **biến khỏi gia phả** (không làm mờ), con cháu họ cũng không hiện. Lọc gia phả theo chi thì ẩn hẳn phần còn lại.

**Học tập.** Trẻ tự vào trường trả phí hợp tiềm năng (trí, võ, mị lực cho con gái). Học phí đã tăng 1,6 lần. Con lính học trong doanh, 14 tuổi chọn học tiếp hay theo nghề binh. Nữ nhi muốn thi chỉ khi trí trên 100 và tham vọng cao; giả nam đi thi có nguy cơ bị bắt.

---

## 4. Luật đã chốt: quan trường, khoa cử, tước, quân ngũ

**Khoa cử.** Mỗi vòng tối đa 100 điểm; thi Đình 5 vòng; danh hiệu và chức bổ theo điểm thi Đình (Trạng nguyên tối đa Lục phẩm). Có nút Rút tên (nghỉ hai năm, giữ học vị) và Ứng thí võ cử.

**Ghế quan.** Mỗi ghế gắn một nơi; nhậm chức thì **người thật sự ở nơi đó**. Gia chủ nhậm chức xa thì dời cả nhà hoặc từ chối. Hồi tị, chống trùng người nhà cùng nha môn. Nhiệm kỳ tự xử, chỉ ghi một dòng nhật ký. Ngự y ngồi ghế Thái y viện.

**Thăng tiến.** Hộp "Đường thăng tiến" có bốn lựa chọn: Xin xét, Hặc tội, Lo lót, Yên phận (bỏ "nhắm ghế"). Danh sách ghế xếp cao xuống thấp, hiện tên, tuổi, tài, công người đương chức so với mình. Xin hụt thì vào **danh sách chờ**. Chỉ thăng lên ghế cao hơn (hoặc cùng bậc nhưng bổng và địa vị cao hơn). **Thời gian ở bậc:** muốn lên bậc `b` phải ngồi ít nhất `10 + 2b` tháng (từ bậc 0 tới Nhất phẩm tối thiểu khoảng 37 năm). Sức ép cạnh tranh tăng theo bậc. **Nút Thăng tiến** ở trang người khóa kèm lý do (đợi xét lại, phải ngồi thêm bao nhiêu tháng, chưa đủ thông thạo hoặc trí) và chỉ cho xin lên **đúng một bậc** (hoặc ghế cùng bậc có bổng cao hơn); danh sách chờ cũng phải đủ thời gian ở bậc, nên không thể bấm liên tục để leo bằng ghế trống (mô phỏng bấm mỗi tháng trong 60 năm: mỗi lần lên cách nhau 10 đến 18 tháng). Người đương chức là nhân vật bền (tài, công, phe, tính, cảm tình). Ghế trống có **một đến ba ứng viên** cùng xin (hộp ghi số người; xác suất theo tài của mình so với ứng viên mạnh nhất); thua thì ứng viên mạnh nhất, thành NPC thật (tên, tuổi, ký ức), **ngồi vào ghế thật**; người bị mình thay hoặc hặc tội thành NPC thật nhớ mối oán (`doi_thu`, `bi_hac`) và có thể trở lại ở `qt5_*` khi còn sống. Khi vua nghi kỵ (`purgeYear`), người giữ ghế từ Tam phẩm thuộc phe bị nghi có thể bị cách chức. Mỗi năm người có kẻ thù NPC còn sống bị đàn hặc ngầm (`officeFeud`, rủi ro quan trường tăng, ghi `bi_dan_hac`). Hoàng tộc đã gặp và thế gia có quan hệ được tạo thành NPC theo yêu cầu (`npFam`, `npHouse`, sống chết theo nguồn); Phạm Xuân Huấn có hồ sơ (đã mất).

**Quan trường, phe, tội.** Bốn phe; phe ẩn tới khi nhà có quan, thế lực các phe chỉ biết khi có quan từ Ngũ phẩm. Thang hậu quả: thăng, giữ chức, điều xa, giáng, cách chức và cấm cả họ thi một khoa, lưu đày và tịch biên, xử trảm, tru di tam tộc (chi xa sống sót thì chơi tiếp từ chi đó), tru di cửu tộc (hết game, chỉ khi mưu phản hoặc đã bỏ qua nhiều cảnh báo).

**Đại Minh luật.** 41 tội bảy thiên; hộp Công đường (nhận tội, thầy cãi, chuộc, lo lót, nhờ người có phẩm tước, kháng án). Thập ác không chuộc, không giảm. Lệ độc đinh. Tái phạm trong 30 năm nặng thêm. Quan thanh liêm từ 70 hiếm bị tố trốn thuế. **Không có trang tra cứu luật.**

**Quan võ, quân ngũ.** Chiến công mọi người bắt đầu từ 0; Đại tướng quân cần 1.500 công. Quan võ từ quan, giải ngũ được. Chức võ cao đòi trí. Sự kiện quân ngũ theo cấp; người ở doanh trại chỉ gặp sự kiện quân ngũ, chiến sự, thư nhà. Gia đình lính theo vào trại; con sinh khi cha đóng quân theo mẹ. Võ quan xin thăng hụt thì nghỉ xét 14 đến 26 tháng.

**Tước.** Theo tổng công trạng: đủ mốc bậc nào thì phong bậc ấy. Bổng tước đã hạ. Con kế tập hạ bậc thì đất cũng giảm theo, không dồn qua các đời.

---

## 5. Luật đã chốt: tiền, đất, kinh doanh

**Tiền sự kiện theo bậc** (d0): `tiền = cỡ việc × 60 đồng × hệ số bậc`. Cỡ nhỏ 10, vừa 30, lớn 100, đại 300. Ba thang:

| Thang | Bần | Thường | Tiểu hộ | Hương thân | Hào phú | Thế gia | Danh môn |
|---|---|---|---|---|---|---|---|
| CHI | 1 | 2 | 4 | 10 | 30 | 100 | 300 |
| THU | 1 | 1,5 | 2,5 | 4 | 7 | 12 | 20 |
| NHẸ (mặc định) | 1 | 1,3 | 1,8 | 2,5 | 3,5 | 5 | 7 |

Hộp của engine (tang lễ, chữa bệnh, tiệc thọ, hôn lễ…) mặc định thang CHI. Kỳ ngộ nhân **2,5** cho khoản nhận được (tiền, danh vọng, hưng thịnh, chiến công). Chuỗi cốt truyện cũ: thưởng tiền theo thang THU, danh vọng nhân `1 + 0,3 × bậc`; phạt sức khỏe tối đa 3 mỗi lần. Hết tiền thì mỗi người 30% bỏ một thói quen tốt tốn tiền; tật xấu không bỏ. Công quỹ âm thì người nhà có tiền riêng tự góp đỡ (giữ nguyên; d9.5 từng bỏ rồi chủ dự án bảo giữ lại, vì nhầm). **Làm việc thiện** (thói quen `tuthien`) chỉ trích khoảng 10% thu nhập tháng của người đó (hệ số mức sống nhân thêm), không còn 600 đồng cố định.

**Đất (d8).** **Nhà thường không có ruộng. Chi họ không có ruộng riêng: ruộng được phong và đất phong đều về nhà chính.** Tá điền ở nhà chính đi làm thuê, công khoảng 450 đồng mỗi tháng theo tay nghề và tâm trạng. Trang "Ruộng vườn" đã bỏ; thay bằng trang **Đất phong**, chỉ hiện khi nhà có đất: đất phong theo tước, đất mua (chỉ khi nhà có người làm quan hoặc có tước, giá 60% giá mẫu ruộng cũ). Đất chia ba phần: cơ sở (dự án), ruộng đã khai hoang cho tá điền, đất hoang. Khai hoang một mẫu tốn 40% giá mẫu, mười hai tháng sau thành ruộng. Phát canh thu tô theo mùa gặt: 30% (nặng, mang tiếng địa chủ), 20% (vừa), 10% (nhẹ, có tiếng thơm).

**Thua đất** (d9): từ bậc Hương thân trở lên, nhà có từ 3 mẫu đất hoặc ruộng thì có thể gặp `dp_dat_bi_doi` (kẻ có thế đòi đất: nhượng, kiện, lo lót) và `dp_cuong_hao` (lấn bờ); nhượng hay thua kiện để lại dấu `oan_dat` kèm một NPC thật, đời sau có `dp_nguoi_cu_doi_dat` (kẻ ấy trở lại, chỉ khi còn sống).

**Sự kiện cho hoặc lấy đất** (d9) đi qua `G.landDelta(n)` và `G.landLose(n)`: nhà không có quan hoặc tước thì không giữ được đất, sự kiện cho đất đổi thành bán lại lấy tiền (một nửa giá mẫu); lấy đất thì trừ đất mua trước rồi mới tới ruộng khai hoang. Sự kiện chào mua đất (`n_mua_ruong`, `lw_31`, `lw_36`, mua lại của họ khác) chỉ ra cho nhà có quan hoặc tước. `nong_dia_chu` (thuê ruộng) đã tắt. Hàm `land()` trong các gói sự kiện nông cũ gọi `G.landDelta`.

**Dự án gia nghiệp** (từ d9.5 nằm ở trang **Đất phong**, không còn ở Cơ ngơi; trang Đất phong mở khi nhà có đất hoặc từ bậc Tiểu hộ khá giả trở lên). Mỗi dự án cần số mẫu đất trống theo độ lớn (nghĩa trang 3, nghĩa thục 4, tàng thư 3, chùa miếu 2, kho thóc 1 + 1 mỗi kho, thuyền buôn 1 + 0,5 mỗi thuyền, gia binh 2 + 0,1 mỗi người, môn khách 1 + 0,15, học bổng 1 + 0,1); hội quán, dinh thự ở kinh, quyên nạp không cần đất. Có số lượng, nút − và +, phí duy trì, nút Giải tán, sổ "đã chi, đã thu, lãi lỗ". Gia binh vượt sức nhà thì triều đình nghi. Việc lớn phải **đáng tiền**. Đã bỏ: từ đường lớn, nghĩa điền, cầu đê đường làng, khai hoang (dự án).

**Kinh doanh.** Người trông và người mở cơ sở phải làm nghề hợp với cơ sở. Mốc quản trị 35; quản trị tăng theo chức trong nghề, làm chủ +1 mỗi năm. Đời đầu gần như không làm chủ được. Lãi bậc cao nhất, chủ giỏi khoảng 150 đến 250 bạc mỗi tháng (hệ số x0,7 từ 6.5.4). Dời nhà thì cơ sở dời theo, trả 10% giá trị (25% khi chạy nạn). Nhà đã có từ hai người cùng nghề thì nghề đó kém hấp dẫn với người tiếp theo (trừ nông, quan, chủ cơ sở, nội trợ). Thư lại đủ điều kiện được xin xuất thân làm quan phẩm thấp.

---

## 6. Luật đã chốt: triều đình, cốt truyện, kết thúc

**Vua và thiên hạ.** Vua đầu cố định: minh quân, niên hiệu **Trường Thịnh**, ở ngôi **25 đến 35 năm tính từ lúc mở game**. Vua thứ hai lên ngôi sau tranh giành căng thẳng (anh em, chú cháu); từ vua thứ ba bốc ngẫu nhiên. Bảng thời thế cập nhật mỗi năm, thấy rõ khi nhà có người ở kinh thành. **Hoàng tộc là người thật** (`S.dyn.fam`): hoàng hậu, phi, hoàng tử, thái tử, công chúa, thân vương có đất phong, quốc công; sinh, già, mất theo năm. Tranh ngôi dùng hoàng tử thật, mỗi bước một lần. Gặp hoàng tộc chỉ ở dịp hợp lý (yến cung từ Ngũ phẩm ở kinh, đại lễ từ Tứ phẩm…). Cốt truyện hoàng thân: Phò mã, Tú nữ, Vương phi. Phò mã có hai đường (d9): người nhà chủ động (`pc_0` đến `pc_6`) và triều đình chọn (`pc_c0`: chiếu chọn phò mã cho người chưa vợ, quan từ Tứ phẩm ở kinh; nhận thì nhảy vào bước hoàng hậu cho gọi `pc_2`; từ chối khéo hoặc cáo bệnh thì có giá).

**Ân oán họ Phạm** (viết lại ở d3, chạy trên khung `ARC.pm`). Mở khi nhà có quan văn từ Ngũ phẩm, từ năm 8. Người già kể chuyện cũ (bốn kiểu oán theo hạt giống ván). Chương 1 tiến chậm, chương 2 tìm chứng cứ và đòn phản kích theo tính cách Kiên, ngã rẽ vĩnh viễn, bảy đường, tám cái kết E1 đến E8, báo thù đời sau. Lịch thăng quan của Kiên theo năm ván; từ khi Kiên vào nội các mà ân oán chưa khép thì nhà mình bị chặn lên Nhất phẩm văn. Khép bằng E1 đến E5 thì mỗi quan trong nhà thêm một bậc. Tiến độ **ẩn hoàn toàn** với người chơi. Box ân oán ở trang Gia tộc đã ẩn.

**Cốt truyện và sự kiện.** Khung đại cốt truyện: tối đa ba cái chạy cùng lúc, ngã rẽ vĩnh viễn, tiến độ ẩn. Khi cốt truyện chạy, sự kiện thường phải **góp phần** (trọng số theo chủ đề, dấu nhỏ, một câu nối), không tách rời. Sổ chung `S.led`, ký ức người `c.mm`, ký ức gia tộc `S.fm`, nhật ký popup `S.evl` (người chơi không thấy). Chống lặp: sự kiện ngẫu nhiên tối thiểu 36 tháng trong cả nhà, 120 tháng trên cùng người; sự kiện chỉ có một lựa chọn trơn thì ghi thẳng nhật ký, không hiện hộp. Danh gia, họ khác chỉ xuất hiện ở nơi của họ; không đến làm thân với Bần hộ, Thường dân.

**Ba đường lên ngôi:** Quyền thần, Võ quan, Khởi nghĩa. Đủ địa vị thì sau 12 đến 24 tháng tự kích hoạt; bỏ được bất cứ lúc nào; người đang ở xa vẫn mở được nhưng "lộ" tăng. Bốn thước đo: thế lực, danh nghĩa, tài lực, lộ. Nuôi quân tốn tiền theo số đội (100 người, 60 bạc mỗi tháng), hiện trong dòng tiền; hết tiền thì quân bỏ trốn. Bỏ ngang hay mất người cầm đầu chỉ khóa chính đường đó 10 năm. Vỡ nợ liền mười hai tháng thì quân tan, mưu đại sự bỏ dở (d9.4). Tru di cửu tộc đã ghi kết L1 vào Sử sách. **Mưu phản thất bại là tru di**; hộp tru di chỉ còn "đưa một người cùng vợ con trốn đi lập chi ở xa" (để chỉ tam tộc) hoặc "phó mặc cho trời". Lên ngôi: người chơi đặt quốc hiệu, niên hiệu đầu tiên; màn hậu sử (không quá 320 năm); hết game.

**Các đường phá đảo ngoài lên ngôi (d9.5, `WP` trong engine).** T4 đến T11 (Tĩnh nạn công thần, Biên vương, Nhiếp chính vương, Phú khả địch quốc, Văn tông, Trấn quốc võ gia, Võ lâm chí tôn, Thế gia ngàn năm) và đường Khởi nghĩa (T3, chỉ hiện dấu hiệu) đều có **3 chặng**; mỗi năm (tháng 3) engine đo lại, chặng tăng thì nhật ký ghi một "Lời đồn" nói thẳng việc cần làm, thẻ "Con đường phía trước" ở khối Triều đình và thời thế hiện manh mối (chặng 1 ẩn tên đường, chặng 2 trở đi hiện tên). Đủ chặng 3 và giữ đủ số năm thì ván kết (màn Hậu sử chung, ghi Sử sách): T5, T7 giữ 5 năm; T8, T9, T10 giữ 10 năm; T6, T11 đủ là kết; T4 chốt ngay khi thắng cuộc tranh ngôi mà nhà đã ra sức (`cr.act`≥2) và đủ chặng 2. Điều kiện từng đường: T4 quan từ Ngũ phẩm hoặc võ từ cấp 3 và đang có quan ở kinh; T5 tướng cao cấp, gia binh từ 5, thiên hạ loạn (`dyn.loan` từ 55); T6 người trong hoàng tộc (phò mã, vương phi, hoàng hậu), quan từ Thất phẩm, vua yếu và thái tử dưới 14; T7 năm cơ sở bậc cao nhất, bậc Thế gia; T8 nghĩa thục, tàng thư, ba quan văn, danh vọng 3.000; T9 tướng cao cấp và thêm một người theo võ; T10 đại hiệp lên minh chủ cùng môn khách hoặc võ quán; T11 tám đời, hai trăm năm, bậc Hào phú trở lên. Con số là ước lượng chưa đo.

**Quân hộ và Đông xưởng (d9.5, `ev-v670n.js`, bản mở rộng đầu):** nối tiếp `cd_19` (giấy gọi nhập quân hộ) và `cd_12` (cầu cạnh Đông xưởng), chỉ ra cho người đã gặp hai sự kiện đó (`c.seen`). Quân hộ: đến phiên nhập ngũ (cử người, thuê thay, trốn), xin xóa tên khỏi sổ, người lính về thăm. Đông xưởng: bị dõi theo, hoạn quan nhờ việc, bị tố cáo. Chưa có hệ thống quân hộ đời đời (mỗi đời một người thật sự phải nhập ngũ) và thế lực Đông xưởng theo năm.

**Thiết khoán (d9.5, `ev-v670m.js`, bản đầu):** nhà có người tước từ bậc 3 có thể được vua ban Thiết khoán (`tk_ban_khoan`, một lần, cờ `S.tk`). Khi gặp hộp "Mây đen trên đầu cả họ" (án tru di vì đại án, không phải mưu đại sự) thì có thêm lựa chọn trình Thiết khoán: thoát án tru di một lần, khoán mất hiệu lực. Chưa có sự kiện thu hồi khoán.

**Kết phụ T4 đến T11: hộp "Dừng hay đi tiếp" (d9.5).** Khi đủ điều kiện một kết thắng không phải lên ngôi, hiện hộp "Thành tựu" (mục `wpend` trong hàng đợi, hàm `wpPopup`): nói rõ thành tựu, số năm, số đời, người trong gia phả, phần thưởng nếu đi tiếp. **Tiếp tục chơi, nhận phần thưởng**: ghi kết vào Sử sách ngay (`metaEnd`), nhận gia bảo, nhận phần thưởng riêng (bảng `WPREW`: T4 công trạng, Thiết khoán, 5 mẫu đất; T5 8 mẫu đất, tiền, danh vọng; T6 người giữ ghế cao nhất lên Nhất phẩm; T7 tiền lớn, hưng thịnh; T8 con cháu dưới 22 tuổi +6 trí; T9 quan võ thêm công trạng, trẻ +5 võ; T10 minh chủ +8 võ; T11 danh vọng, tiền, ổn định), cờ `S.wpDone[id]` chặn hỏi lại. **Khép lại tại đây**: màn Hậu sử chung như cũ. Lên ngôi (T1 đến T3) vẫn hết game, không có hộp này. Mỗi ván có thể ghi nhiều kết (`S._mes`).

**Gia bảo (d9.5, `data-giabao.js`, file riêng, bỏ được bằng cách xóa file và thẻ `<script>`).** 39 món, 2 đến 3 món mỗi cái kết (T1 đến T11, L1 đến L6). Mỗi kết đạt được (`metaEnd`) cho một món ngẫu nhiên trong kho riêng của kết đó, ưu tiên món chưa có; lưu ở `meta().gb` (ngoài ván), hiện ở màn kết "Gia bảo nhận được" và trang "Gia bảo" trong Sử sách. Màn tạo ván: chọn gia bảo mang theo, số ô = 1 + một ô cho mỗi 6 kết khác nhau đã đạt, tối đa 3 (`gbSlots`). Tác dụng khởi đầu nhẹ (tiền, danh vọng, chỉ số người đầu +4 đến +10, cơ duyên, hưng thịnh, ổn định, Thiết khoán), áp bằng `gbApply` sau khi tạo ván. Gia bảo của ván đang chơi hiện ở **nút "Gia bảo" dán sát mép trái trang Gia phả** (CSS `.gbbtn`, số món bên dưới); bấm vào mở cửa sổ popup liệt kê món, mô tả, cái kết sinh ra nó (`gbPopup`); không còn thẻ ở trang Gia tộc (chủ dự án 21/11); kết đã đủ món thì cộng "điểm gia bảo" (`meta().gbPts`, hiện ở Sử sách; mỗi 3 điểm thêm một ô gia bảo khi tạo ván, tối đa 3 ô). Chưa có: món mất khi tan nhà (tan nhà là hết ván nên không cần), món bán khi cùng quẫn.

**Cốt truyện từ tiểu thuyết (d9.5, `ev-cotran.js`, bản thử, bỏ được bằng cách xóa file):** 14 sự kiện id `cv_*` chạy trên `G.later`, tiến độ ẩn, có ngã rẽ. (1) **Ký ức người xưa** (trọng sinh): `cv_giac_mong` (14 đến 32 tuổi, một lần) mở `cv_tien_doan`, `cv_nghi_ky`, `cv_ke_thua` (chép sách cho con cháu hoặc giữ riêng). (2) **Ba nhà tranh trại** (`S.cc3` đổi tên ngầm theo lựa chọn): `cv_ba_nha` (kỳ ngộ gia tộc, nhà từ bậc Tiểu hộ, chọn ngả về nhà mạnh, nhà yếu hay trung lập), `cv_tranh_mo`, `cv_chia_phe`, `cv_hau_qua`. (3) **Kỳ vật chín bậc** (`c.flags.ccv`): `cv_ky_vat` nhặt được món đồ lạ, `cv_nuoi` nuôi lên bậc (phàm tới chí tôn, dừng chuỗi ở bậc 4 để gọi `cv_dom_ngo`: bán, hiến quan, hay giữ), có thể thất bại. Kỳ ngộ lẻ: `cv_bi_canh` (bí cảnh thượng cổ, chu kỳ 30 đến 55 năm), `cv_thi_tuyen` (thi tuyển người kế nghiệp, từ 45 tuổi, cần hai con trưởng thành), `cv_chinh_ma` (chọn chính đạo, ma đạo hay đứng giữa, võ từ 70). Chạy tay từng sự kiện không lỗi; chuỗi Ký ức người xưa chạy hết 4 sự kiện qua hàng đợi thật (`cv_giac_mong`, `cv_tien_doan`, `cv_nghi_ky`, `cv_ke_thua`), chuỗi Kỳ vật chạy tới `cv_nuoi` hai lần; chuỗi Ba nhà tranh trại mới kiểm từng sự kiện, chưa chạy hết; chưa đo xác suất ra, số tiền và chỉ số là ước lượng. Không chép nguyên văn truyện, chỉ lấy khung ý.

**Tru di:** quét cả người cưới vào và người ở rể; người ở rể đứng đầu mưu đại sự thì cả họ vẫn chịu. Chi ở xa không bị liên lụy thì **giữ nguyên tiền** của chi.

**Kết thúc khác** (kết phụ, chủ dự án đã đồng ý): tuyệt tự; tru di cửu tộc; các kết của cốt truyện. Nút **Sử sách** ở menu chính ghi 17 cái kết (11 thắng, 6 bại), mờ cho tới khi đạt, mở khóa 6 xuất thân mới. Mọi kết ngoài lên ngôi dùng màn Hậu sử chung. Không có hộp hỏi "khép lại ván" (đã bỏ hộp "Một trang sử").

**Hạt giống thế giới mỗi ván:** 9 môn phái (3 chính, 3 tà, 3 trung lập) rút từ 24 tên, 3 điểm nóng thế lực tự phát, mệnh thế, tính khí nước láng giềng. **Giang hồ (d9.5, `ev-v670j.js`, bản đầu):** người nghề Hiệp khách đi qua 4 cấp lưu ở `c.flags.gh` (1 môn sinh, 2 đệ tử, 3 cao thủ, 4 minh chủ) và phái ở `c.flags.ghs`, bằng 6 sự kiện: nhập môn phái (chính, trung lập, tà hay đi một mình), tỉ võ giữa hai phái, bí kíp (có đoạn hiểm), bị truy sát, đại hội anh hùng (đại hiệp từ 28 tuổi, thắng thì thành Võ lâm minh chủ, hiệp lv3, `S.gh.lord`), việc của minh chủ. Đây là chặng cuối của đường T10. Chưa có: cấp bậc nội bộ môn phái chi tiết, đối đầu giữa các phái theo thời gian. **Thế lực tự phát (d9.5, `ev-v670k.js` và `tlYear`):** ba điểm nóng của hạt giống ván có độ nóng `S.wr.heat` tăng -2 đến 3 mỗi năm (giảm khi vua uy cao); từ 60 thì loạn thiên hạ `dyn.loan` thêm 1 mỗi năm (mở T5, T3), từ 85 thì thỉnh thoảng giặc nổi (loạn thêm 3, ghi sử). Bốn sự kiện: hội kín chiêu người, thủ lĩnh gửi thư mời, dân chạy loạn đến nhờ, lệnh dẹp loạn (quan võ từ lv3); lựa chọn làm độ nóng tăng hoặc giảm. Con số là ước lượng chưa đo: bản đầu (-1 đến 4) 40 năm lên 72 đến 89 nên đã giảm, chưa đo lại.

---

## 7. Giao diện

**Giao diện mới (d9.2, chỉ admin, chờ chủ dự án duyệt trước khi đưa vào bản chính).** Ưu tiên máy tính. Nguyên tắc chủ dự án đã chốt: người chơi **ít phải gánh thông tin**; ảnh đại diện **thật đa dạng để dễ phân biệt**, có bộ riêng theo **nghề và địa vị**; test ở admin trước.
- **Khung hộp thoại cố định** (720 × 560): không co giãn theo số lựa chọn; chữ và lựa chọn cuộn trong khung riêng; lựa chọn có số thứ tự. Hồ sơ nhân vật cũng khung cố định (780 × 620): đầu trang có ảnh lớn, tên, nhãn; dưới là các nút trang dạng viên thuốc; trang Tổng quan có 4 ô thông tin nhanh (nghề, thu nhập, tiền riêng, vai trong nhà).
- **Hộp sự kiện:** đầu hộp là thẻ chân dung (chấm tuổi, màu theo giới, thu nhập tháng) của người chính và người thứ hai; **thẻ bấm được để mở hồ sơ người đó**; lựa chọn là nút to, giá hiện bên nút. Khối chữ và thanh chỉ số dài cũ không còn ở đầu hộp.
- **Kết quả:** thanh chỉ số kèm số cộng trừ (trí, võ, sức khỏe, mị lực, EQ, tâm trạng); mọi dòng cộng trừ khác vẫn hiện đủ (mục 0.12).
- **Hồ sơ nhân vật chia trang:** Tổng quan, Tính cách và kỹ năng, Tâm tư, Việc và tiền, Gia đình, Việc nhà (trang rỗng tự ẩn). Không dồn một cuộn dài.
- **Gia phả** là thẻ chân dung (nam xanh, nữ hồng, người mất xám).
- **Đất phong:** ô đất từng mẫu (cơ sở theo màu từng loại, ruộng sọc xanh, khai hoang sọc vàng, đất hoang màu cát); bỏ các dòng số trùng với chú thích.
- **Ảnh đại diện mới (`AVA2`, kiểu hoạt hình đầu to, nét viền nâu, mắt có điểm sáng, má hồng; chủ dự án chê bản đầu "xấu" nên viết lại ở d9.3):** sinh từ tên và id; 6 màu da, 4 dáng mặt, 6 kiểu mắt, 4 kiểu mày, 3 kiểu mũi, 4 kiểu miệng, 8 kiểu tóc mỗi giới, 6 kiểu râu, dấu hiệu riêng; trang phục theo nghề (26 nghề), áo bào và mũ theo phẩm quan, giáp và mũ theo cấp quân, áo tím cho người có tước, ngọc bội và hoa văn cho nhà giàu, tóc bạc và nếp nhăn theo tuổi.
- Đã bỏ khỏi đề xuất (chủ dự án): thanh tab dưới cùng; trang cây chuyện đã trải qua.

- Dòng phiên bản mờ ở góc phải dưới (`.verlbl`); bản admin thêm `· admin`. Đổi số khi ra bản mới.
- Cơ ngơi và Gia tộc không được tràn thông tin: các thẻ triều đình, thời thế, hoàng tộc, cướp ngôi gom vào khối gập.
- Danh vọng cá nhân gọn, đẩy lên đầu thẻ nhân vật.
- Hộp chọn trường hiện tiềm lực của trẻ bằng chữ.

---

## 8. Bối cảnh, câu chữ

- **Cho phép** vật phẩm từ phương Tây và cây trồng mới (thuốc lá Tây, khoai lang…) xuất hiện trong sự kiện.
- Triều đại hư cấu **Đại Nguyễn**, hoàng đế khai quốc Nguyễn Thành Trung. Danh gia gọi theo kiểu "Hoàng Gia, Đào Gia, Cổ Nguyệt Gia", mỗi vùng có danh gia riêng.
- Giữ xưng hô đúng vai vế trong lời kể. (Chủ dự án đã xác nhận 20/11: xưng hô họ Phạm ổn, không phải sửa.)
- Lời kể không được nhắc người không có thật (vợ, con mà nhân vật không có); chuỗi nhiều bước không được tạo lại người mới thay người cũ.

---

## 9. Đã bỏ, đừng làm lại

- Thuế, lễ lạt, quan lại sách nhiễu (thêm ở 6.6.0, bỏ ở d0).
- Tiền sự kiện tính theo phần trăm quỹ (6.5.4) → thay bằng bảng theo bậc.
- Hệ số cơ sở cùng loại tranh khách.
- Ràng buộc trí vào tốc độ rèn võ.
- Ẩn dòng cộng trừ ±1 và cắt đuôi kết quả còn 6 mục.
- Hộp "Một trang sử" và "Khép lại" ván của 6.6.0.
- Trục xuất và dâng sớ, cầu tình sau mưu phản thất bại; `usPenalty`.
- Khóa cướp ngôi chung cho cả ba đường.
- "Nhắm ghế" trong hộp thăng tiến; thăng ngang hoặc xuống ghế thấp.
- Thứ thất, thiếp, đa thê.
- Mốc vượt và cổng sức khỏe; sức khỏe tối đa trên 100.
- Tác dụng lên gia tộc của danh hiệu chỉ số.
- Trang tra cứu luật.
- Ruộng riêng của chi họ (chốt 09/11, bỏ 19/11).
- Trang "Họ khác" (bỏ 21/11, quan hệ với họ khác chỉ đổi qua sự kiện, hôn nhân, giao thương; sổ `G.rel` vẫn chạy ngầm). Dự án cơ sở trên trang Cơ ngơi (chuyển sang Đất phong).
- Ruộng cho nhà thường, trang Ruộng vườn, dự án Khai hoang, từ đường lớn, nghĩa điền, cầu đê đường làng.
- Danh sách tên bị cấm (Kiên, Duy…) và tự đổi tên người nhà.
- Chuỗi ân oán `vil_*` cũ (đã thay bằng `ARC.pm`).
- Tương thích save cũ (tạm thời).

---

## 10. Ý mới của chủ dự án, chưa làm (chép nguyên văn)

**Chờ chủ dự án duyệt hoặc chơi tay (đã làm xong về mã, chưa có xác nhận):**
- Bộ phần thưởng kết phụ T4 đến T11 (bảng `WPREW` trong `engine.js`, mô tả ở mục 6): số do Claude đặt nhẹ, chưa duyệt.
- 39 món gia bảo (`data-giabao.js`) và công thức ô gia bảo (1 + một ô mỗi 6 kết + một ô mỗi 3 điểm, tối đa 3): chưa duyệt.
- 14 sự kiện `cv_*` (`ev-cotran.js`): tần suất tự ra trong ván thường, câu chữ, tiền, chỉ số chưa chơi tay; bot đã chạy đủ ba chuỗi cả nhánh thắng lẫn thua, không lỗi. Muốn bỏ thì xóa file và thẻ `<script>`.
- 34 sự kiện bộ nhớ thêm ở d9.5 (`events-mem.js`): có thể làm một số sự kiện hiếm ra hơn dự tính vì bị chặn theo ký ức; chưa đo.

(không có ý mới nào đang chờ code. Ý 21/11 đã làm xong ở d9.5 và chuyển thành luật ở mục 2, 5, 6, 9, 11: sửa sự kiện họ khác nhắc ruộng, bỏ trang Họ khác, chuyển dự án sang Đất phong, hộp Dừng hay đi tiếp, gia bảo, bộ nhớ sự kiện, cốt truyện từ tiểu thuyết trong `ev-cotran.js`.)

---

## 11. Đang làm dở, đã biết là thiếu

Ưu tiên theo mục 0.2 (gameplay trước). Xếp theo mức cần.

**Gameplay còn hở**
- **Sự kiện cũ nhắc ruộng (d9.5):** 8 sự kiện cho đất, khai hoang, mua ruộng (`nong_ban_ruong_re`, `t_n_dia_chu_ban`, `t_n_khai_hoang`, `t_n_dien_trang_thue`, `t_q_dong_dien`, `nong631_khai_hoang`, `nong631_ruong_cong`, `d631_goa_phu_hien_dat`) chỉ ra khi nhà có quan hoặc tước (`LANDGIVE` trong `eligible`; d9.5 mở rộng lên 24 id, thêm `qd_hao_cuong`, `v61_ta_dien_*`, `c631_ta_dien_xin_giam`, `lo_24`, `tg_40`, `kn_17`, `dh_66`, `lw_21`, `lw_26`, `lw_32`, `lw_37`, `rv_thon_tinh`, `pm_k6`, `rg_tranh_ruong`). Còn lại: cộng, trừ đất đi qua `G.landDelta`; lời kể "ruộng nhà" đã đổi thành "đất nhà" (d9). Các sự kiện nông (`nong_*`, `nong631_*`, `n633_nong_*`) đọc `F().own` làm điều kiện nên chỉ ra cho nhà có đất mua. Chuỗi `vil_*` cũ đã tắt nên không rà.
- **Gia tộc có thể teo:** hai save thật có 4 và 5 người sau 37 và 51 năm, save Tiêu có 88 người sau 98 năm. Ba ván bot ngẫu nhiên (d9) cho 1 đến 5 người vì **bot không tự cưới** (cưới đi qua nút Mối ở trang Gia tộc hoặc sự kiện, bot không bấm): đo bằng bot đó không đại diện. Muốn đo thật phải cho bot biết bấm Mối hoặc đo trên save người chơi.
- Phần B còn mỏng: người giữ ghế (`S.off`) chỉ thành NPC khi bị thay, bị hặc hoặc thắng ghế; thanh trừng giữa các quan mới là vua nghi kỵ và kẻ thù đàn hặc ngầm; thế gia chưa tham gia tranh ghế; Vượng chưa có hồ sơ riêng (đã nằm trong hoàng tộc nếu gặp).
- Chưa làm: giang hồ đầy đủ (d9.5 mới có bản đầu 6 sự kiện, xem mục 6; thiếu chiến tranh giữa các phái, cấp bậc nội bộ, nhiều bí kíp), thế lực tự phát đầy đủ (mới có bản đầu 4 sự kiện), kỳ ngộ gia tộc (d9.5 thêm 5: `kn_gia_pha_co`, `kn_ho_hang_xa`, `kn_gieng_co`, `kn_thay_tuong`, `kn_dong_ho_cu` trong `ev-v670l.js`, chạy tay 0 lỗi, còn thêm được nhiều), cốt truyện lớn khác ngoài họ Phạm, quân hộ và Đông xưởng đầy đủ (mới có bản mở rộng đầu 6 sự kiện, xem mục 6), (thiết khoán đã có bản đầu, xem mục 6), nghề mới cho đời sau.
- Phạm Thái phi (d9.5): `pm_thai_phi`, thư của bà gửi nhà mình sau kết E1, E2, E5 (hẹn 24 đến 60 tháng sau khi họ Phạm sụp), ba lựa chọn. Ân oán họ Phạm bot chạy hết chuỗi hai ván (kết E5 và E2, 31 đến 32 sự kiện). (d9.5 đã thêm `pm_rua_oan`: sau kết E8 mười hai đến mười tám năm thì có chiếu rửa oan, ba lựa chọn; hai lựa chọn đầu mở lại khóa quan văn ở đất cũ, lựa chọn ba đòi lại hai mẫu đất. Chạy tay từng lựa chọn, chưa chơi tới kết E8 thật.)
- 39 chuỗi cũ chưa có câu nối riêng với cốt truyện; một số chuỗi (`c14_bat_coc`, `c15_nguoi_thu_ba`, `c7_thu`, `v61_cho_vay_ban`, `nong_ban_ruong_re`, `tinh_hoi_xuan`) thiếu phần thưởng thật.
- Bộ nhớ (d9.5, hai lô): thêm 34 sự kiện vào `events-mem.js`, tổng 65 id (lô một 19, lô hai 15). Lô một: 19 sự kiện vào `events-mem.js` (13 sự kiện "người cũ, ân nhân, kẻ thù cũ, học trò cũ" chỉ ra khi đã có quan hệ; 6 sự kiện ghi sổ khi giúp đỡ, dạy học, nhận ơn), tổng 50 id. Chạy bot 30 năm: `G.led.audit()` sạch. Còn thêm được, nhất là nhóm hôn nhân, tang lễ, thầy trò, hàng xóm.
- (cũ) Khoảng 34 trên 1.697 sự kiện dùng bộ nhớ (d9.4 thêm 4 sự kiện "người cũ": `gap_lai_ban_cu`, `c631_ban_cu_ghe`, `n633_y_thaycu`, `hn_nguoi_cu`; d9 thêm 9 sự kiện đọc: `ky_niem_cuoi`, `d631_thu_nguoi_xua`, `n633_hiep_no`, `lw_42`, `dh_50`, `gj_63`, `dh_59`, `v6_xt_vo`, `qt_tro_lai`).

**Kỹ thuật**
- `events-meta.js` phân loại chưa đúng và thiếu sự kiện từ d4. Dựng lại bằng `tools/classify.js` (file này cũng ghi `manifest-su-kien.csv` ra thư mục cha; manifest cũ đã xóa vì lệch mã).
- `tools/roots-gen.js` dùng đường dẫn `__dirname/repo` của thư mục tạm cũ, phải sửa trước khi dùng.
- `tools/run.js` gắn cứng đường dẫn Chrome trên Windows.
- Để sau: tách `engine.js` thành module, Escape và tiêu điểm trong hộp thoại, đưa `<title>` vào `<head>`.

**Cân bằng (chỉ làm sau khi gameplay xong):** mọi con số các bản d1 đến d8 đều là ước lượng chưa đo: tốc độ lên quan (mong Nhất phẩm khoảng năm 38), giá đất, lương tá điền 450, số mẫu mỗi dự án, giá gia quy, xác suất cốt truyện hoàng thân, tỉ lệ thắng ba đường lên ngôi (mục tiêu tạm: người trung bình 10 đến 25%, người mạnh 40 đến 55%), snowball cơ duyên và tiền theo gia thế.

**Kết thúc chưa thử:** chủ dự án mới đi thành công đường soán ngôi qua quan văn (Quyền thần). Võ quan, Khởi nghĩa, T4 đến T11 và các kết phụ chưa ai chơi tới. d9.5 đã chạy thử bằng ép số liệu: T4 (qua `crRes`), T5 đến T11 đều kết đúng; ba đường lên ngôi (Quyền thần, Võ quan, Khởi nghĩa) vào được màn Hậu sử khi gọi `G.ts.crown`; chạy `tools/chain.js` (39 chuỗi cũ, 0 chuỗi không tới được, lỗi `rd_ra_mat` thiếu `pt` đã chặn); quét 1.697 sự kiện, 5.716 lựa chọn có 74 lỗi, toàn do thiếu dữ liệu cốt truyện khi gọi tay (như mức nền cũ); giang hồ vẫn chưa có hệ thống riêng nên T10 chỉ dựa nghề Hiệp khách.
