# Bách Niên Thế Gia · CLAUDE.md

**Đọc hết file này trước khi làm bất cứ việc gì.** Đây là nguồn sự thật duy nhất về ý tưởng đã chốt.
- Báo cáo cũ, kế hoạch cũ, hay trí nhớ của Claude mâu thuẫn với file này → theo file này.
- File này mâu thuẫn với lời chủ dự án trong phiên hiện tại → theo lời chủ dự án, rồi **sửa file này ngay trong cùng commit**.
- Các báo cáo `bao-cao-*.md` và kế hoạch cũ đã gộp vào đây rồi xóa khỏi repo (còn trong lịch sử git, commit trước `claude-md`). Chỉ mở lại khi cần chi tiết kỹ thuật cũ.

Phiên bản hiện tại: **v6.7.10-d9.8** (nhãn `.verlbl` trong `index.html`). File này lập ngày 19/11/2026 từ các báo cáo v6.3.5 đến v6.7.0-d8, rà lại toàn bộ ngày 23/11/2026 theo tiến độ d9.7. Ngày 22/11 pull request #40 (nhánh `v6.7.10-d9.7`) đã được gộp vào `main` trên GitHub. d9.8 là nhánh `v6.7.10-d9.8`, chưa gộp `main`.

---

## 0. Quy tắc làm việc (bắt buộc)

1. **Xưng hô:** chủ dự án gọi Claude là "mày", Claude xưng "tao". Trả lời tiếng Việt, ngắn, đi thẳng vào việc.
2. **Ưu tiên hiện tại:** hoàn thành gameplay trước, rồi mới sửa và cân bằng từng phần. Ngoại lệ, sửa ngay trong bản gần nhất: lỗi treo game hoặc kẹt hộp thoại, lỗi làm sai dữ liệu tích lũy theo năm tháng, lỗi nằm trong phần sắp làm tiếp.
3. **Ý mới của chủ dự án:** chép **nguyên văn** vào mục 10 trước khi code. Không diễn giải lại. Chỗ nào hiểu không chắc thì hỏi, không đoán. Làm xong thì chuyển ý đó thành luật ở mục 3 đến 8 và xóa khỏi mục 10.
4. **Không tự đổi luật đã chốt** (mục 3 đến 8). Thấy luật có vấn đề thì nêu ra và hỏi. Không tự "cải tiến" con số hay cơ chế ngoài phạm vi được giao.
5. **Không làm lại thứ trong mục 9 "Đã bỏ".**
6. **Nhánh:** mỗi bản một nhánh tên theo số bản (ví dụ `v6.7.10-d9.8`; chủ dự án chọn "6.7.10" ở d9.7, các bản trước dạng `v6.7.0-d9.x`, bản kế tiếp hỏi lại số). **Không merge vào `main` và không push** khi chủ dự án chưa bảo.
7. **Test:** mặc định chỉ `node --check` mọi file và một lần khởi động ngắn. Test kỹ hơn khi được bảo. Luôn nói rõ đã test gì, **chưa chơi tay** phần nào. Script đo, chụp ảnh và thử bằng Chrome headless chạy qua `tools/run.js`, thư mục hồ sơ Chrome (`prof*`, đã vào `.gitignore`) phải xóa sau khi chạy. Script có chuỗi tiếng Việt nhiều dòng thì tạo bằng công cụ Write, không nhồi vào dòng lệnh shell (đã hỏng nhiều lần vì dấu escape).
8. **Không viết file báo cáo mới.** Cuối mỗi phiên: cập nhật mục liên quan trong file này (luật mới, đã bỏ, đang làm dở ở mục 11), ghi tóm tắt vào commit message.
9. Sửa `index.html` xong thì chạy `node tools/make-admin.js` để dựng lại `admin.html`.
10. Viết sự kiện mới xong thì chạy `node tools/addmeta.js` để thêm metadata.
11. **Không giữ tương thích save cũ** (từ v6.7.0-d0) cho tới khi chủ dự án bảo bật lại.
12. Lựa chọn trong sự kiện **không kèm dòng chú thích**; chỉ ghi giá khi lựa chọn là trả tiền ngay. Không hiện phần trăm tỉ lệ thành ở bản thường. Hiện **đủ mọi dòng cộng trừ** kết quả, kể cả ±1.
13. **Chủ dự án báo lỗi hoặc đưa ý (từ 23/11):** Claude **kiểm tra, chép nguyên văn vào mục 10 kèm kết quả kiểm, rồi dừng**. Chỉ sửa hoặc làm khi chủ dự án bảo "làm". (Điều này đè quy tắc 0.2 về "sửa ngay lỗi kẹt hộp thoại" cho tới khi chủ dự án bảo khác.)

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
| `admin.html`, `admin.js` | Bản thử nghiệm: `index.html` + `admin.js` (nạp trước engine). Dựng bằng `tools/make-admin.js`. API ở `BNTG._adm` (tự chơi, ép xúc xắc, gọi sự kiện, vì sao sự kiện chưa ra, thống kê, kho sự kiện, cốt truyện; d9.6 thêm `setS`, `wp` (`list`, `win`), `clanSupport`, `deathPopup`, `metaImport`). Bot tự chơi của admin (`admin.js`) từ d9.6 **tự cưới** người trưởng thành chưa vợ chồng mỗi năm (tắt bằng `BN_ADMIN.marry=false`) |
| `data.js` | Dữ liệu gốc `window.D`: nghề `JOBS`, gia thế `TIERS`, cơ sở `BIZ`, chỉ số, danh hiệu… |
| `data-v64.js`, `data-v64m.js` | Quan chế Đại Nguyễn: ghế quan văn, quan võ theo nơi |
| `data-v670.js` | Khung đại cốt truyện, hạt giống thế giới, Sử sách |
| `ev-cotran.js` | **Bản thử lấy ý từ tiểu thuyết Cổ Chân Nhân, file riêng**: xóa file và thẻ `<script>` là bỏ được (id `cv_*`, không file nào khác tham chiếu) |
| `data-giabao.js` | Gia bảo theo cái kết (file riêng, xóa được cùng thẻ script) |
| `ev-v670o.js` (liên hôn với quan, cử người lên kinh và hậu sự), `ev-v670p.js` (`tq_*`: việc với thượng quan, đồng liêu thật), `ev-v670q.js` (giang hồ mở rộng) | Gói sự kiện d9.6, cùng dạng `ev-*.js`, mỗi gói có thẻ `<script>` trong `index.html` |
| `ev-*.js` | Sự kiện, đẩy vào `window.EVF`. Dạng `{id,t,k,x,o:[{l,f\|r:[spec,khó],y,n}]}` cùng các khóa điều kiện `job, age, c, w, cd, pcd, fixed, arc…` |
| `events-meta.js` | Metadata từng sự kiện (domain, subdomain, trigger, độ hiếm, `who`, `sit`). **Phân loại còn thô**; `tools/addmeta.js` thêm sự kiện mới theo tiền tố id (bảng `BASE`, d9.6 thêm `lh`, `kinh`, `tq`; id có tiền tố lạ sẽ không được thêm) |
| `events-mem.js` | Khóa bộ nhớ theo id: `led` (ghi sổ sau lựa chọn), `mem` (điều kiện ký ức); hiện **73 id** |
| `avatar2.js`, `ui2.js`, `ui2.css` | **Giao diện mới, chỉ nạp ở `admin.html`** (do `make-admin.js` chèn). `avatar2.js`: ảnh đại diện mới (`AVA2.svg`); `ui2.js`: thẻ chân dung, thanh kết quả, hồ sơ nhiều trang, ô đất (`UI2`); `ui2.css`: kiểu, mọi luật dưới `body.ui2`. Cờ `BN_ADMIN.ui2` (tắt bằng `?ui=old`). Engine chỉ gọi khi cờ bật (`U2()`), nên `index.html` chưa đổi |
| `engine.js` | Toàn bộ logic, một IIFE, xuất `window.BNTG`. Khoảng 6.300 dòng dài |
| `tools/` | `make-admin.js`, `addmeta.js`, `classify.js` (dựng lại `events-meta.js`), `chain.js` (đo chuỗi cốt truyện), `evcheck-save.js` + `evrules.json` (đối chiếu nhật ký popup trong save), `run.js` (chạy thử bằng Chrome headless, đường dẫn Chrome Windows), `roots.json`, `roots-gen.js` |

Công cụ kiểm trong game: `G.led.audit()` (sổ và ký ức), `G.led.check()` (popup gọi sai người), `G.led.dump(người)`.

Kho hiện tại (d9.7, đếm bằng `_adm.EVENTS()`): **1.788 sự kiện, trong đó 306 kỳ ngộ** (có 43 sự kiện `cv_*`). Phân theo mức `lv`: 872 thường (1), 486 quan trọng (2), 430 lớn (3), chưa có mức 0 (xem mục 7). Mục tiêu dài hạn 5.000 sự kiện và 500 kỳ ngộ, nhưng **nội dung mới làm sau khi gameplay xong** (mục 0.2).

---

## 3. Luật đã chốt: gia tộc, người, chỉ số

**Nhân vật khởi đầu.** Tạo ván chỉ chọn họ, tên, giới tính; xuất thân, nghề, nơi lập nghiệp ngẫu nhiên. Hai chỉ số cao nhất trong trí, võ, mị lực, EQ được nâng lên ít nhất 60 (gen 62 đến 80). Mức 60 do chủ dự án yêu cầu ở d6, thay mức 80 của d1. Có tỉ lệ mang sẵn thói quen tốt rẻ tiền (55%), tật xấu nhẹ (20%), đặc tính tốt (40%). **Họ Nguyễn là họ hoàng tộc, người chơi không chọn được**; NPC vẫn mang họ Nguyễn được.

**Thông thạo và Việc lớn (d9.6, siết ở d9.8).** **Không còn hộp thông thạo** (bỏ toàn bộ `mm`, chủ dự án 22/11: lựa chọn cộng thông thạo, chỉ số quá dễ). Nút **"Việc lớn"** ở trang người: 10 việc (`BIGS`: soạn sách, mở lớp truyền nghề, kiệt tác, chuyến buôn đường dài, phòng chữa bệnh, bế quan luyện tuyệt học, xin dẹp giặc, kết giao nhà có thế, học phái riêng, xét vụ án lớn), mỗi việc ghi điều kiện, giá, thời gian, khả năng thành (chữ), hậu quả khi thành và bại; chọn thì trả giá ngay, làm N tháng rồi hộp kết quả. **Siết ở d9.8** (chủ dự án 23/11: "spam được, xuất hiện quá sớm, thông thạo còn thấp vẫn làm được, dễ đạt, tiêu tốn không lớn, tổn hại không cao"): (1) **tuổi từ 30**; (2) **bắt buộc thông thạo nghề từ 100** (bế quan từ 80) **cùng** chỉ số liên quan (trí hoặc EQ hoặc mị lực từ 60 đến 100 tùy việc), không còn "hoặc"; (3) **giá gấp khoảng 5 lần** (soạn sách 75, mở lớp 125, kiệt tác 150, buôn đường dài 600, phòng chữa 150, bế quan 25, dẹp giặc 250, kết giao 300, học phái 300, xét án 50; nhân `mm()`), tiền thưởng buôn và kiệt tác nhân theo; (4) **xác suất thành hạ 12 điểm** (`bigP`, tối thiểu 10%, tối đa 85%); (5) **thất bại đau hơn** (tâm trạng 6 đến 15, danh vọng 3 đến 12, sức khỏe tới 25, mất thêm tiền ở buôn và kiệt tác, bế quan hỏng giảm sức khỏe tối đa); (6) **chờ 3 năm sau mỗi việc, cùng một việc chờ 10 năm** (`c.bigT`, `c.bigL`); khi chờ, nút hiện lý do và ngày làm lại được. Mọi con số d9.8 là đề xuất của Claude theo "làm tất cả những gì đã gom", chưa đo, chờ chủ dự án chơi. Mốc chỉ số 100 (`ms`, `brkmid`, `brkend`, `thienco`) vẫn là hộp đột phá cũ.

**Chỉ số.**
- Trần mềm theo tư chất; lớn tự nhiên không cộng chồng lên phần học được.
- Tốc độ sau 100: 100 đến 119 hệ số 0,6; 120 đến 149 hệ số 0,48; từ 150 hệ số 0,41 (d9.5, tăng từ 0,33 / 0,2 / 0,14 vì chủ dự án chưa ai đạt chỉ số 200 và danh hiệu Thần). Trần mềm từ 100 trở lên chỉ bóp tối đa còn 0,5; chờ thử lại mốc vượt 10 đến 30 tháng. **Bước 150 lên 200 chỉ mở bằng "Thiên cơ"** (`thiencoTick`, 1,2% mỗi tháng nhân hệ số duyên, khoảng 7 năm; đột phá thiên cơ nhanh hơn, hệ số mốc 150 là 0,95, mốc 120 và 140 là 0,9 và 0,8). Đo bằng bot (d9.5): người 30 tuổi sẵn 150 chơi tới 78 tuổi mở được giới hạn 200 vào khoảng 71 đến 73 tuổi nhưng chỉ số mới lên 167 và 159, chưa ván nào chạm đúng 200; từ 0 tới 150 mất khoảng 40 năm nên một đời vẫn khó, hợp ý "tích lũy nhiều đời". **Chờ chủ dự án chơi tay báo lại** (mục 11). Chuỗi khảo nghiệm Thần (`th_vothan_1` và 2) chạy đúng khi đủ điều kiện (võ 200, nghề Võ lâm minh chủ, m 130).
- Mốc vượt 120 và 140 mỗi chỉ số có hai con đường riêng. Mốc không chặn theo tuổi; lựa chọn không hợp tuổi bị ẩn.
- **Sức khỏe:** tối đa cố định 100, không rèn lên, không có mốc vượt. Danh hiệu sức khỏe là **bẩm sinh** (tám mức, từ Cường tráng 7% tới Tiên phong đạo cốt 0,01%): ít bệnh, già chậm 2 đến 14 năm. Tuổi bắt đầu suy là chỉ số ẩn.
- **Mị lực** giảm từ 38 tuổi (0,6 mỗi năm; từ 50 là 1,2; từ 60 là 1,8).
- Võ lực không cần trí để rèn; nhưng chức quan võ cao đòi thêm trí (mục 4).
- Danh hiệu chỉ số chỉ tác dụng **lên chính người mang**, không lan ra gia tộc. Mô tả danh hiệu chỉ ghi tác dụng, ngắn gọn.

**Danh hiệu cấp Thần và thiên mệnh.** Không ai sinh ra đã mang danh hiệu Thần. Chín danh hiệu Thần, mỗi cái hai bước khảo nghiệm; tác dụng lên gia tộc nhỏ, chủ yếu giảm thiệt hại; mất ngay khi người giữ qua đời, sau đó có thể để lại đặc tính "cái thế". Thiên mệnh lúc sinh tỉ lệ 1/2.000. Giám Chính cần trí 200.

**Sinh con, di truyền.** Đã đặt gia quy số con thì **tuyệt đối không sinh vượt**, kể cả qua sự kiện. Giãn cách sinh dài. Tiềm năng của con tính theo cha mẹ lúc mang thai; tiềm năng bẩm sinh bằng 62 đến 92% gen.

**Hôn nhân.** **Một vợ một chồng**, không thứ thất, thiếp. Tái hôn thì người cũ vẫn giữ trên gia phả (chính thất, kế thất). Mỗi lần thành thân có hộp Hôn lễ ba mức theo bậc hai nhà; mức nào cũng để lại dấu (nhà thông gia nhớ hoặc coi nhẹ). Họ khác chỉ ngỏ thông gia khi nhà mình ngang hoặc cao hơn và hai nhà đã thân. Lính về phép chỉ cưới khi đã định hôn hoặc có người trong lòng; **cưới nhân phép phải chọn người như hộp Mối** (d9.7, chủ dự án 23/11: "làm như hộp Mối đi"): hộp "Lính về phép" (`lq_phep`) mở danh sách ba ứng viên (tên, tuổi, nhà, tài, sính lễ; người trong lòng nếu có hiện đầu tiên, đánh dấu "người trong lòng"), miễn tiền bà mối vì chỉ có một tháng phép nhưng vẫn trả sính lễ, có nút "Chưa ưng ai" (hôn sự gác lại, tâm trạng -2); chọn xong vợ mới đi theo doanh trại hoặc ở quê tùy lựa chọn ban đầu. `G.matchmaker(người, {free, noOut, pt, after, none, ...})` nay nhận tùy chọn để dùng ở nơi khác. Chưa rà các chỗ khác gọi `mkSpouse(...)` trong sự kiện (22 chỗ) xem còn hộp cưới nào tự chọn vợ.

**Tình duyên.** Tách khỏi hôn nhân, nhiều bước. Mở đầu chỉ cho người 18 đến 25 tuổi có tài, có đức; dễ rung động tùy tính cách. Cưới đúng người đã gặp.

**Tang lễ.** Ba mức. Mức "xứng" theo cái lớn hơn giữa danh vọng người mất và gia thế; mỗi mức để lại dấu. Nhà không đủ tiền cho mức xứng thì phạt danh vọng nhẹ (tối đa 12) và không để lại tiếng xấu (d9.4). **Tang lễ của người ở chi họ trừ quỹ chi của họ**, không trừ quỹ nhà chính (d9.6). **Di chúc:** thuế thừa kế (30% nhà chính, 10% chi) và phần hiến cho gia tộc về quỹ đúng hộ của người mất (`fundAdd`).

**Gia quy.** Mỗi gia quy cấm thuộc một nhóm phạt cố định (không có vi phạm / phạt tiền, đòn roi / trục xuất / xử tử tại gia). Vi phạm không phải lúc nào cũng lộ; lộ thì gia chủ thi hành hay tha, tha nhiều thì uy gia pháp giảm. Xử tử tại gia có cái giá. Trục xuất trước khi án nổ thì nhà chính thoát liên lụy. Mỗi năm nhắc lập gia quy nếu còn chỗ. Gia quy tăng tốc cho trẻ (hiếu học, thư hương, văn võ, thượng võ, thể tập) **phải có giá** (tâm trạng, sức khỏe, chi tiêu). Gia quy không cộng danh vọng. Luật rượu, cờ bạc chỉ khớp hành vi, không khớp rượu thuốc, cúng, biếu.

**Quyền gia chủ, chi họ.** Tách họ gốc, hộ, chi. Bổ nhiệm, người ra mặt chỉ lấy người nhà chính. Truyền nghề chỉ trong chi chính. Tàng thư theo hộ. Chi họ rỗng thì tiền về quỹ, nhà bán 50%. Chi xa dời nơi thì dời chính hộ đó (giữ tên, quỹ). Vợ chồng ở khác hộ thì vợ về ở với chồng (trừ gia chủ nhà chính). Con cháu đã có vợ chồng ở nhà chính: chỉ số phụ **tự lập** (`dl`) từ 80 thì ước muốn ra ở riêng x3, từ 70 x1,6, từ 40 trở xuống x0,5. Đủ 18 tuổi có việc thì tự lo.

**Trục xuất.** Người bị trục xuất **biến khỏi gia phả** (không làm mờ), con cháu họ cũng không hiện. Lọc gia phả theo chi thì ẩn hẳn phần còn lại.

**Học tập.** Trẻ tự vào trường trả phí hợp tiềm năng (trí, võ, mị lực cho con gái). Học phí đã tăng 1,6 lần. Con lính học trong doanh, 14 tuổi chọn học tiếp hay theo nghề binh. Nữ nhi muốn thi chỉ khi trí trên 100 và tham vọng cao; giả nam đi thi có nguy cơ bị bắt.

---

## 4. Luật đã chốt: quan trường, khoa cử, tước, quân ngũ

**Khoa cử.** Mỗi vòng tối đa 100 điểm; thi Đình 5 vòng; danh hiệu và chức bổ theo điểm thi Đình (Trạng nguyên tối đa Lục phẩm). Có nút Rút tên (nghỉ hai năm, giữ học vị) và Ứng thí võ cử.

**Ghế quan.** Mỗi ghế gắn một nơi; nhậm chức thì **người thật sự ở nơi đó**. Gia chủ nhậm chức xa thì dời cả nhà hoặc từ chối. Hồi tị, chống trùng người nhà cùng nha môn. Nhiệm kỳ tự xử, chỉ ghi một dòng nhật ký. Ngự y ngồi ghế Thái y viện.

**Thăng tiến.** Hộp "Đường thăng tiến" có bốn lựa chọn: Xin xét, Hặc tội, Lo lót, Yên phận (bỏ "nhắm ghế"). Danh sách ghế xếp cao xuống thấp, hiện tên, tuổi, tài, công người đương chức so với mình. Xin hụt thì vào **danh sách chờ**. Chỉ thăng lên ghế cao hơn (hoặc cùng bậc nhưng bổng và địa vị cao hơn). **Thời gian ở bậc:** muốn lên bậc `b` phải ngồi ít nhất `10 + 2b` tháng (từ bậc 0 tới Nhất phẩm tối thiểu khoảng 37 năm). Sức ép cạnh tranh tăng theo bậc. **Nút Thăng tiến** ở trang người khóa kèm lý do (đợi xét lại, phải ngồi thêm bao nhiêu tháng, chưa đủ thông thạo hoặc trí) và chỉ cho xin lên **đúng một bậc** (hoặc ghế cùng bậc có bổng cao hơn); danh sách chờ cũng phải đủ thời gian ở bậc, nên không thể bấm liên tục để leo bằng ghế trống (mô phỏng bấm mỗi tháng trong 60 năm: mỗi lần lên cách nhau 10 đến 18 tháng). **Họ Phạm có người thật ngồi ghế quan ngay cả khi người chơi chưa mở cốt truyện (d9.6, `phamSeats`, mỗi năm tháng 2):** Phạm Trung Kiên đi theo lịch thăng chức (Tri huyện, Tri phủ, Bố chính sứ, Thượng thư, Đại học sĩ nội các, Thái sư) kèm hai người thân giữ ghế thấp hơn, đều là NPC thật. **Người giữ ghế cao (Tứ phẩm trở lên) hoặc ở tỉnh nhà là NPC thật ngay từ khi ghế được tạo.** **Trang Quan trường chỉ hiện khi nhà có người đang làm quan, hết quan thì ẩn** (d9.6). Người đương chức là nhân vật bền (tài, công, phe, tính, cảm tình). Ghế trống có **một đến ba ứng viên** cùng xin (hộp ghi số người; xác suất theo tài của mình so với ứng viên mạnh nhất); thua thì ứng viên mạnh nhất, thành NPC thật (tên, tuổi, ký ức), **ngồi vào ghế thật**; người bị mình thay hoặc hặc tội thành NPC thật nhớ mối oán (`doi_thu`, `bi_hac`) và có thể trở lại ở `qt5_*` khi còn sống. Khi vua nghi kỵ (`purgeYear`), người giữ ghế từ Tam phẩm thuộc phe bị nghi có thể bị cách chức. Mỗi năm người có kẻ thù NPC còn sống bị đàn hặc ngầm (`officeFeud`, rủi ro quan trường tăng, ghi `bi_dan_hac`). Hoàng tộc đã gặp và thế gia có quan hệ được tạo thành NPC theo yêu cầu (`npFam`, `npHouse`, sống chết theo nguồn); Phạm Xuân Huấn có hồ sơ (đã mất).

**Quan trường, phe, tội.** Bốn phe; phe ẩn tới khi nhà có quan, thế lực các phe chỉ biết khi có quan từ Ngũ phẩm. Thang hậu quả: thăng, giữ chức, điều xa, giáng, cách chức và cấm cả họ thi một khoa, lưu đày và tịch biên, xử trảm, tru di tam tộc (chi xa sống sót thì chơi tiếp từ chi đó), tru di cửu tộc (hết game, chỉ khi mưu phản hoặc đã bỏ qua nhiều cảnh báo).

**Đại Minh luật.** 41 tội bảy thiên; hộp Công đường (nhận tội, thầy cãi, chuộc, lo lót, nhờ người có phẩm tước, kháng án). Thập ác không chuộc, không giảm. Lệ độc đinh. Tái phạm trong 30 năm nặng thêm. Quan thanh liêm từ 70 hiếm bị tố trốn thuế. **Không có trang tra cứu luật.**

**Quan võ, quân ngũ.** Chiến công mọi người bắt đầu từ 0 và **không bao giờ đặt mặc định theo cấp** (d9.6: đã bỏ ép chiến công theo cấp ở `monthlyPerson` và `voEnlist`); Đại tướng quân cần 1.500 công. **Chiến công vượt 1.500 đổi thành điểm thánh ân: 5 chiến công = 1 điểm công trạng** (`meritFold`, cộng `c.cong`, dùng phong tước; vì có người trên 3.000 chiến công vẫn chỉ Bá tước). Quan võ từ quan, giải ngũ được. Chức võ cao đòi trí. Sự kiện quân ngũ theo cấp; người ở doanh trại chỉ gặp sự kiện quân ngũ, chiến sự, thư nhà. Gia đình lính theo vào trại; con sinh khi cha đóng quân theo mẹ. Võ quan xin thăng hụt thì nghỉ xét 14 đến 26 tháng.

**Tước.** Theo tổng công trạng: đủ mốc bậc nào thì phong bậc ấy. Bổng tước đã hạ. Con kế tập hạ bậc thì đất cũng giảm theo, không dồn qua các đời.

---

## 5. Luật đã chốt: tiền, đất, kinh doanh

**Tiền sự kiện theo bậc** (d0): `tiền = cỡ việc × 60 đồng × hệ số bậc`. Cỡ nhỏ 10, vừa 30, lớn 100, đại 300. Ba thang:

| Thang | Bần | Thường | Tiểu hộ | Hương thân | Hào phú | Thế gia | Danh môn |
|---|---|---|---|---|---|---|---|
| CHI | 1 | 2 | 4 | 10 | 30 | 100 | 300 |
| THU | 1 | 1,5 | 2,5 | 4 | 7 | 12 | 20 |
| NHẸ (mặc định) | 1 | 1,3 | 1,8 | 2,5 | 3,5 | 5 | 7 |

Hộp của engine (tang lễ, chữa bệnh, tiệc thọ, hôn lễ…) mặc định thang CHI. Kỳ ngộ nhân **3** (d9.7, trước 2,5) cho khoản nhận được (tiền, danh vọng, hưng thịnh, chiến công). Chuỗi cốt truyện cũ: thưởng tiền theo thang THU, danh vọng nhân `1 + 0,3 × bậc`; phạt sức khỏe tối đa 3 mỗi lần. Hết tiền thì mỗi người 30% bỏ một thói quen tốt tốn tiền; tật xấu không bỏ. **Sàn thưởng tiền của kỳ ngộ (d9.7, chủ dự án 23/11: "kỳ ngộ không nên thấp quá"):** mọi khoản tiền **nhận được** trong kỳ ngộ phải từ `m(4)` trở lên (hiện ra khoảng 720 đồng ở bậc Bần hộ sau hệ số kỳ ngộ 3 (600 đồng trước khi nâng hệ số từ 2,5 lên 3), tức hơn một tháng thu nhập đầu game). Đã quét 306 kỳ ngộ bằng cách chạy từng lựa chọn rồi đo chênh lệch tiền: 30 kỳ ngộ có khoản nhận dưới 600 đồng, đã nâng 28 cái (trong `ev-cotran.js`, `ev-v631d.js`, `ev-v633e/f/g.js`, `ev-v6a.js`); không nâng `t_n_dia_chu_ban` (mua đất) và `t_g_cho_vay` (vay); `d631_thuong_nhan_gop_von` (góp vốn có bỏ tiền ra, lãi nhỏ là bản chất) cũng giữ. Một số khoản nhận là ngẫu nhiên nên mỗi lần quét số hơi lệch. Viết kỳ ngộ mới phải theo sàn này. **Lưu ý:** phép đo chỉ chạy với nhân vật bậc Bần hộ, nên kỳ ngộ chỉ dành cho bậc cao có thể còn thấp so với bậc đó; chưa đo. Công quỹ âm thì người nhà có tiền riêng tự góp đỡ (giữ nguyên; d9.5 từng bỏ rồi chủ dự án bảo giữ lại, vì nhầm). **Làm việc thiện** (thói quen `tuthien`) chỉ trích khoảng 10% thu nhập tháng của người đó (hệ số mức sống nhân thêm), không còn 600 đồng cố định.

**Đất (d8).** **Nhà thường không có ruộng. Chi họ không có ruộng riêng: ruộng được phong và đất phong đều về nhà chính.** Tá điền ở nhà chính đi làm thuê, công khoảng 450 đồng mỗi tháng theo tay nghề và tâm trạng. Trang "Ruộng vườn" đã bỏ; thay bằng trang **Đất phong**, chỉ hiện khi nhà có đất: đất phong theo tước, đất mua (chỉ khi nhà có người làm quan hoặc có tước, giá 60% giá mẫu ruộng cũ). Đất chia ba phần: cơ sở (dự án), ruộng đã khai hoang cho tá điền, đất hoang. Khai hoang một mẫu tốn 40% giá mẫu, mười hai tháng sau thành ruộng. Phát canh thu tô theo mùa gặt: 30% (nặng, mang tiếng địa chủ), 20% (vừa), 10% (nhẹ, có tiếng thơm).

**Thua đất** (d9): từ bậc Hương thân trở lên, nhà có từ 3 mẫu đất hoặc ruộng thì có thể gặp `dp_dat_bi_doi` (kẻ có thế đòi đất: nhượng, kiện, lo lót) và `dp_cuong_hao` (lấn bờ); nhượng hay thua kiện để lại dấu `oan_dat` kèm một NPC thật, đời sau có `dp_nguoi_cu_doi_dat` (kẻ ấy trở lại, chỉ khi còn sống).

**Sự kiện cho hoặc lấy đất** (d9) đi qua `G.landDelta(n)` và `G.landLose(n)`: nhà không có quan hoặc tước thì không giữ được đất, sự kiện cho đất đổi thành bán lại lấy tiền (một nửa giá mẫu); lấy đất thì trừ đất mua trước rồi mới tới ruộng khai hoang. Sự kiện chào mua đất (`n_mua_ruong`, `lw_31`, `lw_36`, mua lại của họ khác) chỉ ra cho nhà có quan hoặc tước. `nong_dia_chu` (thuê ruộng) đã tắt. Hàm `land()` trong các gói sự kiện nông cũ gọi `G.landDelta`.

**Tiền riêng và quỹ chung (d9.6):** **mọi người ở nhà chính** đi làm đều phải góp quỹ chung, người chơi chọn mốc **30, 50 hoặc 80 phần trăm** (mặc định 30, `GOP`), mỗi mốc trừ tâm trạng mục tiêu của người đi làm (không phải gia chủ) **-1, -3, -6** (d9.7, giảm từ -2, -5, -10 theo chủ dự án 23/11; hiện ở thẻ công quỹ); gia chủ vẫn nộp phần lớn. **Người ở chi cũng góp quỹ chi ít nhất một nửa**, phần còn lại là tiền riêng. **Chi họ mới lập có mức sống theo danh vọng và của cải thật của người lập chi** (`chiLife`), không theo gia tộc; quỹ khởi đầu là tiền riêng của người lập chi cộng khoản gia tộc cấp. **Đất phong theo tước có 40% là ruộng đã khai; đất được cho qua sự kiện có 35% là ruộng** (`fiefFld`, `landDelta`).

**Quỹ nào trả việc nào (d9.6, đã rà):** dự án gia nghiệp, nuôi quân mưu đại sự, các việc cả họ hay triều đình (58 chỗ trừ `S().money` trong các gói sự kiện, đều kèm điều kiện `G.money()`) dùng **quỹ nhà chính**; tiền của một người đi qua `fx(c,{money})` tự tính theo quỹ của người đó (nhãn Công quỹ, Quỹ hộ, Tiền riêng). Thẻ chi phái không còn dòng "ruộng của chi" (chỉ hiện "Ruộng cũ của chi" nếu save còn). Chưa rà từng sự kiện một.

**Dự án gia nghiệp** (từ d9.5 nằm ở trang **Đất phong**, không còn ở Cơ ngơi; trang Đất phong mở khi nhà có đất hoặc từ bậc Tiểu hộ khá giả trở lên). Mỗi dự án cần số mẫu đất trống theo độ lớn (nghĩa trang 3, nghĩa thục 4, tàng thư 3, chùa miếu 2, kho thóc 1 + 1 mỗi kho, thuyền buôn 1 + 0,5 mỗi thuyền, gia binh 2 + 0,1 mỗi người, môn khách 1 + 0,15, học bổng 1 + 0,1); hội quán, dinh thự ở kinh, quyên nạp không cần đất. Có số lượng, nút − và +, phí duy trì, nút Giải tán, sổ "đã chi, đã thu, lãi lỗ". Gia binh vượt sức nhà thì triều đình nghi. Việc lớn phải **đáng tiền**. Đã bỏ: từ đường lớn, nghĩa điền, cầu đê đường làng, khai hoang (dự án).

**Kinh doanh.** **Mở cơ sở** cần đúng nghề, thông thạo 50, quản trị 35; **quản lý cơ sở chỉ cần quản trị từ 50, bất kể nghề và thông thạo** (d9.6, `MGR_QL`, `mgrWhy`). quản trị tăng theo chức trong nghề, làm chủ +1 mỗi năm. Đời đầu gần như không làm chủ được. Lãi bậc cao nhất, chủ giỏi khoảng 150 đến 250 bạc mỗi tháng (hệ số x0,7 từ 6.5.4). **Môn khách (d9.6):** hộp "Môn khách mách nước" mỗi năm tối đa một lần; **số môn khách càng đông thì khoản đầu tư và lãi càng lớn** (ba mức vốn nhỏ, vừa, lớn, nhân theo số người), không ra thêm lần. Dời nhà thì cơ sở dời theo, trả 10% giá trị (25% khi chạy nạn). Nhà đã có từ hai người cùng nghề thì nghề đó kém hấp dẫn với người tiếp theo (trừ nông, quan, chủ cơ sở, nội trợ). Thư lại đủ điều kiện được xin xuất thân làm quan phẩm thấp.

---

## 6. Luật đã chốt: triều đình, cốt truyện, kết thúc

**Vua và thiên hạ.** Vua đầu cố định: minh quân, niên hiệu **Trường Thịnh**, ở ngôi **25 đến 35 năm tính từ lúc mở game**. Vua thứ hai lên ngôi sau tranh giành căng thẳng (anh em, chú cháu); từ vua thứ ba bốc ngẫu nhiên. Bảng thời thế cập nhật mỗi năm, thấy rõ khi nhà có người ở kinh thành. **Hoàng tộc là người thật** (`S.dyn.fam`): hoàng hậu, phi, hoàng tử, thái tử, công chúa, thân vương có đất phong, quốc công; sinh, già, mất theo năm. Tranh ngôi dùng hoàng tử thật, mỗi bước một lần. Gặp hoàng tộc chỉ ở dịp hợp lý (yến cung từ Ngũ phẩm ở kinh, đại lễ từ Tứ phẩm…). Cốt truyện hoàng thân: Phò mã, Tú nữ, Vương phi. Phò mã có hai đường (d9): người nhà chủ động (`pc_0` đến `pc_6`) và triều đình chọn (`pc_c0`: chiếu chọn phò mã cho người chưa vợ, quan từ Tứ phẩm ở kinh; nhận thì nhảy vào bước hoàng hậu cho gọi `pc_2`; từ chối khéo hoặc cáo bệnh thì có giá).

**Ân oán họ Phạm** (viết lại ở d3, chạy trên khung `ARC.pm`). Mở khi nhà có quan văn từ Ngũ phẩm, từ năm 8. Người già kể chuyện cũ (bốn kiểu oán theo hạt giống ván). Chương 1 tiến chậm, chương 2 tìm chứng cứ và đòn phản kích theo tính cách Kiên, ngã rẽ vĩnh viễn, bảy đường, tám cái kết E1 đến E8, báo thù đời sau. Lịch thăng quan của Kiên theo năm ván; từ khi Kiên vào nội các mà ân oán chưa khép thì nhà mình bị chặn lên Nhất phẩm văn. Khép bằng E1 đến E5 thì mỗi quan trong nhà thêm một bậc. Tiến độ **ẩn hoàn toàn** với người chơi. Box ân oán ở trang Gia tộc đã ẩn. Hậu quả: Phạm Thái phi gửi thư sau kết E1, E2, E5 (`pm_thai_phi`, 24 đến 60 tháng sau khi họ Phạm sụp, ba lựa chọn); sau kết E8 mười hai đến mười tám năm có chiếu rửa oan (`pm_rua_oan`, ba lựa chọn: hai cái đầu mở lại khóa quan văn ở đất cũ, cái ba đòi lại hai mẫu đất). Bot chạy hết chuỗi hai ván (E5 và E2, 31 đến 32 sự kiện); chưa chơi tới E8 thật.

**Cốt truyện và sự kiện.** Khung đại cốt truyện: tối đa ba cái chạy cùng lúc, ngã rẽ vĩnh viễn, tiến độ ẩn. Khi cốt truyện chạy, sự kiện thường phải **góp phần** (trọng số theo chủ đề, dấu nhỏ, một câu nối), không tách rời. Sổ chung `S.led`, ký ức người `c.mm`, ký ức gia tộc `S.fm`, nhật ký popup `S.evl` (người chơi không thấy). Chống lặp: sự kiện ngẫu nhiên tối thiểu 36 tháng trong cả nhà, 120 tháng trên cùng người; sự kiện chỉ có một lựa chọn trơn thì ghi thẳng nhật ký, không hiện hộp. Danh gia, họ khác chỉ xuất hiện ở nơi của họ; không đến làm thân với Bần hộ, Thường dân.

**Ba đường lên ngôi:** Quyền thần, Võ quan, Khởi nghĩa. Đủ địa vị thì sau 12 đến 24 tháng tự kích hoạt; bỏ được bất cứ lúc nào; người đang ở xa vẫn mở được nhưng "lộ" tăng. Bốn thước đo: thế lực, danh nghĩa, tài lực, lộ. Nuôi quân tốn tiền theo số đội (100 người, **30 bạc mỗi tháng** từ d9.6, trước 60), **hiện rõ trong thẻ mưu đại sự** cùng số đội của mình, số tiền nuôi thêm được và **số quân triều đình trấn giữ ước lượng ở kinh thành, biên ải, tỉnh nhà** (chỉ khi nhà có võ quan từ Thiên hộ; `usArmyInfo`); **"lộ" tăng chậm theo thời gian (0,05 mỗi tháng), lộ nhanh chỉ do lựa chọn gây lộ** (d9.6); hết tiền thì quân bỏ trốn. Bỏ ngang hay mất người cầm đầu chỉ khóa chính đường đó 10 năm. Vỡ nợ liền mười hai tháng thì quân tan, mưu đại sự bỏ dở (d9.4). **Cân bằng (d9.6):** xác suất thắng cuối (`usWin`) cộng 0,10 cho Quyền thần và trừ 0,06 cho Võ quan theo số đo bot; sau chỉnh, nhân vật mạnh (bốn chỉ số 100, không ép xúc xắc) thắng Võ quan 50%, Quyền thần 50%, Khởi nghĩa 17 đến 40% (mục tiêu tạm: người mạnh 40 đến 55%, người trung bình 10 đến 25%). Mẫu 12 ván mỗi đường, **chưa đo người trung bình**; xem mục 11. Tru di cửu tộc đã ghi kết L1 vào Sử sách. **Mưu phản thất bại là tru di**; hộp tru di chỉ còn "đưa một người cùng vợ con trốn đi lập chi ở xa" (để chỉ tam tộc) hoặc "phó mặc cho trời". Lên ngôi: người chơi đặt quốc hiệu, niên hiệu đầu tiên; màn hậu sử (không quá 320 năm); hết game.

**Các đường phá đảo ngoài lên ngôi (d9.5, `WP` trong engine).** T4 đến T11 (Tĩnh nạn công thần, Biên vương, Nhiếp chính vương, Phú khả địch quốc, Văn tông, Trấn quốc võ gia, Võ lâm chí tôn, Thế gia ngàn năm) và đường Khởi nghĩa (T3, chỉ hiện dấu hiệu) đều có **3 chặng**; mỗi năm (tháng 3) engine đo lại, chặng tăng thì nhật ký ghi một "Lời đồn" nói thẳng việc cần làm, thẻ "Con đường phía trước" ở khối Triều đình và thời thế hiện manh mối (chặng 1 ẩn tên đường, chặng 2 trở đi hiện tên). Đủ chặng 3 và giữ đủ số năm thì ván kết (màn Hậu sử chung, ghi Sử sách): T5, T7 giữ 5 năm; T8, T9, T10 giữ 10 năm; T6, T11 đủ là kết; T4 chốt ngay khi thắng cuộc tranh ngôi mà nhà đã ra sức (`cr.act`≥2) và đủ chặng 2. Điều kiện từng đường: T4 quan từ Ngũ phẩm hoặc võ từ cấp 3 và đang có quan ở kinh; T5 tướng cao cấp, gia binh từ 5, thiên hạ loạn (`dyn.loan` từ 55); T6 người trong hoàng tộc (phò mã, vương phi, hoàng hậu), quan từ Thất phẩm, vua yếu và thái tử dưới 14; T7 năm cơ sở bậc cao nhất, bậc Thế gia; T8 nghĩa thục, tàng thư, ba quan văn, danh vọng 3.000; T9 tướng cao cấp và thêm một người theo võ; T10 đại hiệp lên minh chủ cùng môn khách hoặc võ quán; T11 tám đời, hai trăm năm, bậc Hào phú trở lên. Con số là ước lượng chưa đo.

**Quân hộ và Đông xưởng (d9.5, `ev-v670n.js`, bản mở rộng đầu):** nối tiếp `cd_19` (giấy gọi nhập quân hộ) và `cd_12` (cầu cạnh Đông xưởng), chỉ ra cho người đã gặp hai sự kiện đó (`c.seen`). Quân hộ: đến phiên nhập ngũ (cử người, thuê thay, trốn), xin xóa tên khỏi sổ, người lính về thăm. Đông xưởng: bị dõi theo, hoạn quan nhờ việc, bị tố cáo. Chưa có hệ thống quân hộ đời đời (mỗi đời một người thật sự phải nhập ngũ) và thế lực Đông xưởng theo năm.

**Thiết khoán (d9.5, `ev-v670m.js`, bản đầu):** nhà có người tước từ bậc 3 có thể được vua ban Thiết khoán (`tk_ban_khoan`, một lần, cờ `S.tk`). Khi gặp hộp "Mây đen trên đầu cả họ" (án tru di vì đại án, không phải mưu đại sự) thì có thêm lựa chọn trình Thiết khoán: thoát án tru di một lần, khoán mất hiệu lực. Chưa có sự kiện thu hồi khoán.

**Kết phụ T4 đến T11: hộp "Dừng hay đi tiếp" (d9.5).** Khi đủ điều kiện một kết thắng không phải lên ngôi, hiện hộp "Thành tựu" (mục `wpend` trong hàng đợi, hàm `wpPopup`): nói rõ thành tựu, số năm, số đời, người trong gia phả, phần thưởng nếu đi tiếp. **Tiếp tục chơi, nhận phần thưởng**: ghi kết vào Sử sách ngay (`metaEnd`), nhận gia bảo, nhận phần thưởng riêng (bảng `WPREW`: T4 công trạng, Thiết khoán, 5 mẫu đất; T5 8 mẫu đất, tiền, danh vọng; T6 người giữ ghế cao nhất lên Nhất phẩm; T7 tiền lớn, hưng thịnh; T8 con cháu dưới 22 tuổi +6 trí; T9 quan võ thêm công trạng, trẻ +5 võ; T10 minh chủ +8 võ; T11 danh vọng, tiền, ổn định), cờ `S.wpDone[id]` chặn hỏi lại. **Khép lại tại đây**: màn Hậu sử chung như cũ. Lên ngôi (T1 đến T3) vẫn hết game, không có hộp này. Mỗi ván có thể ghi nhiều kết (`S._mes`).

**Gia bảo (d9.5, `data-giabao.js`, file riêng, bỏ được bằng cách xóa file và thẻ `<script>`).** 39 món, 2 đến 3 món mỗi cái kết (T1 đến T11, L1 đến L6). Mỗi kết đạt được (`metaEnd`) cho một món ngẫu nhiên trong kho riêng của kết đó, ưu tiên món chưa có; lưu ở `meta().gb` (ngoài ván), hiện ở màn kết "Gia bảo nhận được" và trang "Gia bảo" trong Sử sách. Màn tạo ván: chọn gia bảo mang theo, số ô = 1 + một ô cho mỗi 6 kết khác nhau đã đạt, tối đa 3 (`gbSlots`). **Tác dụng khởi đầu chỉ cộng 7 chỉ số chính** (d9.7, chủ dự án 23/11: "bỏ mấy cái cộng danh vọng các thứ"): trí, võ lực, sức khỏe, mị lực, EQ, tâm trạng của người đầu (+3 đến +10 mỗi chỉ số) và cơ duyên; **không còn cộng tiền, danh vọng, hưng thịnh, ổn định, Thiết khoán**. 24 trong 39 món đã đổi (id giữ nguyên nên Sử sách cũ không hỏng). **Cộng cho mọi người thuộc gia tộc** (d9.7, chủ dự án 23/11: "cộng cho tất cả người thuộc gia tộc, kể cả dâu rể con nuôi con thứ gì cũng được hết"): `gbApply` cộng ngay cho mọi người có sẵn lúc tạo ván; người vào sau (sinh ra, cưới vào, con nuôi) được cộng **một lần** ở tháng đầu từ 1 tuổi (`gbBonus` trong `monthlyPerson`, cờ `p.gbA`); người ra khỏi gia tộc (trục xuất, xuất giá) không nhận thêm. Vì cộng cho cả nhà nên mức cộng từng món (3 đến 10) có thể cần hạ sau khi chơi thử. Gia bảo của ván đang chơi hiện ở **nút "Gia bảo" dán sát mép trái trang Gia phả** (CSS `.gbbtn`, số món bên dưới); bấm vào mở cửa sổ popup liệt kê món, mô tả, cái kết sinh ra nó (`gbPopup`); không còn thẻ ở trang Gia tộc (chủ dự án 21/11); kết đã đủ món thì cộng "điểm gia bảo" (`meta().gbPts`, hiện ở Sử sách; mỗi 3 điểm thêm một ô gia bảo khi tạo ván, tối đa 3 ô). Chưa có: món mất khi tan nhà (tan nhà là hết ván nên không cần), món bán khi cùng quẫn.

**Cốt truyện từ tiểu thuyết (d9.5, `ev-cotran.js`, bản thử, bỏ được bằng cách xóa file và thẻ `<script>`):** 43 sự kiện id `cv_*` theo tám nguyên tắc ở mục 8, chạy trên `G.later`, tiến độ ẩn, có ngã rẽ. Gồm: ký ức người xưa (trọng sinh), ba nhà tranh trại (`S.cc3`), kỳ vật chín bậc (`c.flags.ccv`), bí cảnh, thi tuyển người kế nghiệp, chọn chính đạo hay ma đạo, cùng các kỳ ngộ lẻ (khảo tư chất, chọn bản mệnh, thú dữ xuống núi, giấu tài, đấu giá, di sản, tâm ma, thách đấu, báo ân, ghen tài, kết minh…). Chạy tay từng sự kiện không lỗi; ba chuỗi (ký ức người xưa, kỳ vật, một phần ba nhà tranh trại) chạy qua hàng đợi thật; chưa đo tần suất ra, tiền và chỉ số là ước lượng. Không chép nguyên văn truyện, chỉ lấy khung ý.

**Cả gia tộc đồng lòng (d9.6, `clanSupport`):** sức mạnh của một con đường không chỉ từ người theo đường đó mà từ cả họ. Từ mọi người nhà còn sống đang làm quan, tính bốn nguồn hỗ trợ: **võ quan** (binh, tin quân, cấp dưới), **quan văn** (chiếu chỉ, lương thảo, tiến cử), **người ở kinh thành** (đường dây), **người trong cung** (phò mã, vương phi, hoàng hậu; che chở, che bớt lộ). Mỗi tháng trong mưu đại sự các nguồn này cộng thêm thế lực, danh nghĩa, tài lực và giảm lộ theo trọng số từng đường (võ quan nặng nhất ở đường Võ quan, quan văn nặng nhất ở Quyền thần); xin thăng tiến được giảm độ khó tối đa 10 điểm nhờ người nhà làm quan cao (nhất là ở kinh). Thẻ mưu đại sự hiện rõ từng nguồn (số người và mức: ít, có, khá, rất mạnh). **Liên hôn và lên kinh (d9.6, `ev-v670o.js`):** gả người nhà sang nhà quan (`lh_quan_cau_than`, tăng `S.tgq`, mỗi mối thông gia tính như thêm quan văn) và cử người lên kinh (`kinh_dua_nguoi`, cờ `flags.kinh`, tính như người ở kinh) đều **chọn người nhà thật** và có hậu sự hẹn 2,5 đến 5 năm (`lh_quan_hau`, `kinh_ve_tin`). Con số là ước lượng chưa đo; chưa có chi phí giữ quan hệ (tiền, hôn nhân).

**Tru di:** quét cả người cưới vào và người ở rể; người ở rể đứng đầu mưu đại sự thì cả họ vẫn chịu. Chi ở xa không bị liên lụy thì **giữ nguyên tiền** của chi.

**Kết thúc khác** (kết phụ, chủ dự án đã đồng ý): tuyệt tự; tru di cửu tộc; các kết của cốt truyện. Nút **Sử sách** ở menu chính ghi 17 cái kết (11 thắng, 6 bại), mờ cho tới khi đạt, mở khóa 6 xuất thân mới. Mọi kết ngoài lên ngôi dùng màn Hậu sử chung. Không có hộp hỏi "khép lại ván" (đã bỏ hộp "Một trang sử").

**Hạt giống thế giới mỗi ván:** 9 môn phái (3 chính, 3 tà, 3 trung lập) rút từ 24 tên, 3 điểm nóng thế lực tự phát, mệnh thế, tính khí nước láng giềng.

**Giang hồ (d9.5 `ev-v670j.js`, d9.6 `ev-v670q.js`; từ d9.6 người đi giang hồ do người chơi điều khiển như người đi lính, `isCtrl`):** người nghề Hiệp khách có 4 cấp ở `c.flags.gh` (1 môn sinh, 2 đệ tử, 3 cao thủ, 4 minh chủ) và phái ở `c.flags.ghs`. Sự kiện: nhập môn phái, tỉ võ giữa hai phái, bí kíp (có đoạn hiểm), bị truy sát, đại hội anh hùng (đại hiệp từ 28 tuổi, thắng thì Võ lâm minh chủ, `S.gh.lord`), việc của minh chủ; d9.6 thêm thử thách lên đệ tử (`gh_len_de_tu`), hai phái khai chiến và kết cuộc (`gh_phai_chien`, `gh_chien_ket`, đổi sức mạnh phái `pow`, ghi `S.wr.war`), sư phụ có biến (`gh_su_phu_bien`), ba bí kíp (`gh_bk_kiem`, `gh_bk_noicong`, `gh_bk_khinhcong`, cờ `c.flags.bk`, hiện chỉ đổi chỉ số). Đây là chặng cuối của đường T10. Chưa có hệ thống chiến tranh giữa các phái theo thời gian, cấp bậc nội bộ chi tiết, tác dụng lâu dài của bí kíp (mục 11, 12).

**Thế lực tự phát (d9.5, `ev-v670k.js`, `tlYear`):** ba điểm nóng của hạt giống có độ nóng `S.wr.heat` tăng -2 đến 3 mỗi năm (giảm khi vua uy cao); từ 60 thì loạn thiên hạ `dyn.loan` thêm 1 mỗi năm (mở T5, T3), từ 85 thì thỉnh thoảng giặc nổi (loạn thêm 3, ghi sử). Bốn sự kiện: hội kín chiêu người, thủ lĩnh gửi thư mời, dân chạy loạn đến nhờ, lệnh dẹp loạn (quan võ từ lv3). Con số chưa đo lại sau khi giảm (bản đầu 40 năm lên 72 đến 89).

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

- **Giao diện hộp sự kiện và hồ sơ ở bản chính (d9.8, theo ảnh mẫu `Mockup giao dien/d9.7/` đã được chủ dự án chấp nhận 23/11, "giữ màu sắc và phong cách hiện tại"):** (1) **hộp sự kiện một cột, bỏ hẳn cột trái** (hồ sơ nhỏ, bảy thanh chỉ số, bốn ô kỹ năng): đầu hộp là **thẻ chân dung mọi người liên quan đứng cạnh nhau** (`evBand`, `evCard`: ảnh có chấm tuổi, tên, vai trò và nghề, thu nhập tháng; một người thì thẻ đứng giữa), nhãn loại việc, tiêu đề, đoạn kể, **lựa chọn đánh số** có giá hiện bên phải khi trả tiền ngay; kết quả giữ đủ mọi dòng cộng trừ; áp cho **mọi hộp sự kiện** (`choicePopup`), không áp cho hộp thông tin khác; giao diện admin ui2 giữ như cũ; (2) **hồ sơ nhân vật chia trang** (`sheetPages`, sau khi dựng hồ sơ cũ thì sắp khối vào trang): Tổng quan (bảy thanh chỉ số, bốn ô nghề, thu nhập, tiền riêng, vai trong nhà, danh vọng), Tính cách và kỹ năng (đặc điểm, tính cách, bốn kỹ năng), Tâm tư, Việc và tiền (nghề, thời gian rảnh, học đường, tiền riêng, di chúc), Gia đình (hôn nhân, quan hệ), Việc nhà; trang rỗng tự ẩn; **bỏ lưới tám chỉ số tự lập và dòng tiềm năng**; nút cũ giữ nguyên; (3) **lỗi hồ sơ nằm sau hộp đã sửa**: hồ sơ mở từ thẻ nổi lên trên hộp sự kiện (`.overlay.sheet.top`, z-index 60), đóng thì quay về hộp còn nguyên lựa chọn. Đã chụp màn hình thật ở `Mockup giao dien/d9.8/`. Chưa chơi tay, chưa xem trên điện thoại.
- **Hộp sự kiện hiện mọi người liên quan (d9.6, bản chính, ảnh đại diện hiện tại, màu hiện tại):** dải `.kinstrip` ảnh và tên người chính, người thứ hai, người được chọn; **bấm vào ảnh để xem hồ sơ và đặc điểm** (`kinStrip`, `[data-pcard]`). Hộp **chọn người nhà thật** (`pickKin`) cũng có ảnh và nút xem. Kiểu giao diện admin (khung cố định, nút đánh số…) chưa đưa vào bản chính; ảnh mẫu `Mockup giao dien/d9.6/` là **nhầm hướng, bỏ**. Ảnh chụp từ game thật (avatar hiện tại) ở `Mockup giao dien/d9.6b/`: `ban-that-B-chon-nguoi.png` (hộp chọn người nhà), `ket-cuc-A-thanh-tuu.png`, `ket-cuc-B-hau-su.png` (T4). Ba người gia phả trong ảnh chọn người là dữ liệu thử dùng chung chỉ số.
- **Sử sách (d9.6):** có nút **Xuất Sử sách** (tải file) và **Nhập Sử sách hoặc file save** (`metaImport`, gộp gia bảo và kết cục đã đạt từ file xuất hoặc từ file save của ván). Sử sách và gia bảo lưu trong `localStorage` theo từng địa chỉ trang, bản admin dùng khóa riêng (`.adm`).
- **Mức sự kiện (d9.6, `e.lv`):** 0 vặt, 1 thường, 2 quan trọng, 3 lớn; suy từ loại và độ hiếm trong `events-meta.js` (cốt truyện 3, độ hiếm rare trở lên 3, kỳ ngộ và việc cố định 2, còn lại 1), khóa `lv` ghi đè. **Mới gắn mức, chưa dùng để sắp xếp hay chọn sự kiện** (chỉ thư tay dùng); chưa ai chỉnh tay `lv` từng sự kiện. Thư tay lấy mức từ sự kiện.
- **Thư tay (d9.6):** mỗi tin có mức (`letterLv`): 3 lớn, 2 quan trọng gom hộp **mỗi 5 năm**, 1 thường gom **mỗi 15 năm**, 0 vặt chỉ ghi nhật ký.
- Dòng phiên bản mờ ở góc phải dưới (`.verlbl`); bản admin thêm `· admin`. Đổi số khi ra bản mới.
- Cơ ngơi và Gia tộc không được tràn thông tin: các thẻ triều đình, thời thế, hoàng tộc, cướp ngôi gom vào khối gập.
- Danh vọng cá nhân gọn, đẩy lên đầu thẻ nhân vật.
- Hộp chọn trường hiện tiềm lực của trẻ bằng chữ.

---

## 8. Bối cảnh, câu chữ

- **Cho phép** vật phẩm từ phương Tây và cây trồng mới (thuốc lá Tây, khoai lang…) xuất hiện trong sự kiện.
- Triều đại hư cấu **Đại Nguyễn**, hoàng đế khai quốc Nguyễn Thành Trung. Danh gia gọi theo kiểu "Hoàng Gia, Đào Gia, Cổ Nguyệt Gia", mỗi vùng có danh gia riêng.
- Giữ xưng hô đúng vai vế trong lời kể. (Chủ dự án đã xác nhận 20/11: xưng hô họ Phạm ổn, không phải sửa.)
- **Tư tưởng vận hành thế giới rút từ tiểu thuyết Cổ Chân Nhân (d9.5, chủ dự án 21/11 bảo học tư tưởng trong truyện để áp vào cách xây game).** Đã đọc trích đoạn khoảng 12 chương đầu và giữa (Xuân Thu Thiền, trọng sinh, khai khiếu, chín chuyển, Thanh Mao Sơn, lang triều, Thương gia) và dùng hiểu biết về cả bộ; không đọc hết 3.815 mục. Tám nguyên tắc để viết sự kiện mới: (1) **mọi sức mạnh có giá**, không có thứ miễn phí (kỳ vật phải nuôi, tài năng kéo theo ghen ghét); (2) **tài nguyên khan hiếm nên các nhà tranh nhau**, thế giới không đứng chờ người chơi (mỏ, bến sông, nước, thú dữ, thế lực tự phát tăng dần); (3) **thông tin và ngụy trang là sức mạnh** (giấu tài, ký ức người xưa, nhớ ơn nhớ oán); (4) **lựa chọn đầu tiên định hướng cả đời** (bản mệnh); (5) **làm điều tốt chưa chắc có phúc báo**, nên phúc báo phải qua sổ nhớ ơn và rủi ro; (6) **kiến thức quá khứ có thể sai khi thế giới đổi** (hiệu ứng cánh bướm); (7) **sức mạnh và danh vọng lớn làm mòn tâm** (tâm ma, cô độc); (8) **người trẻ có tài là tài nguyên chung của cả họ**, tộc đo bằng cống hiến và cạnh tranh nội bộ. Đọc tiếp đợt hai (khoảng 30 chương rải từ đầu tới cuối bộ, gồm các chương Nhân Tổ truyện, ân tình, Phòng gia, đấu giá, kết minh, thế sự hưng suy) rút thêm bảy ý: (9) tự do luôn đi kèm bổn phận, buông ra thì tiếc; (10) gia viên là con người chứ không phải tài nguyên, còn người là còn hy vọng; (11) ân tình là món nợ cần trả sạch; (12) nổi danh thì ai cũng muốn kéo về phía mình; (13) có tội thì các nhà liên minh kéo tới, phải lấy công chuộc tội; (14) lời thề có cái giá; (15) tin tức đổi bằng tin tức, kết minh vì tin tức; thêm ý thế sự vô thường: nhà nào cũng có lúc hưng lúc suy, không ai hưng mãi. Đợt ba (đã đọc **toàn bộ tên chương** cả bộ, 3.815 mục gộp còn 2.310 đoạn, cộng khoảng 45 đoạn trích rải đều; không đọc từng chữ) rút thêm: (16) mọi thái độ là một thông điệp, đứng về phía nào cũng bị dán nhãn; (17) dư luận có sức mạnh riêng; (18) số mệnh: tin hay chống; (19) lùi một bước trời cao biển rộng; (20) nhà lớn cũng có lúc suy; (21) trách nhiệm và hy sinh vì cả họ; (22) về già nhìn lại hối hận hay không. Mọi sự kiện mới lấy ý từ truyện phải đặt trong `ev-cotran.js`, bối cảnh Đại Nguyễn, không phép thuật rõ ràng.
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
- Hộp thông thạo (`mm`), chiếu cầu hiền chung chung (nay chỉ cầu một người cụ thể vào ghế trống), chiến công mặc định theo cấp (bỏ 22/11).
- Trang "Họ khác" (bỏ 21/11, quan hệ với họ khác chỉ đổi qua sự kiện, hôn nhân, giao thương; sổ `G.rel` vẫn chạy ngầm). Dự án cơ sở trên trang Cơ ngơi (chuyển sang Đất phong).
- Ruộng cho nhà thường, trang Ruộng vườn, dự án Khai hoang, từ đường lớn, nghĩa điền, cầu đê đường làng.
- Danh sách tên bị cấm (Kiên, Duy…) và tự đổi tên người nhà.
- Chuỗi ân oán `vil_*` cũ (đã thay bằng `ARC.pm`).
- Tương thích save cũ (tạm thời).

---

## 10. Ý mới của chủ dự án, chưa làm (chép nguyên văn)

(không có ý nào đang chờ. Các ý 23/11 đã làm ở d9.8 và chuyển thành luật: giao diện hộp sự kiện và hồ sơ ở mục 7, việc lớn ở mục 3, gia bảo ở mục 6, hệ số kỳ ngộ và sàn tiền kỳ ngộ ở mục 5, cưới nhân phép của lính ở mục 3.)

---

## 11. Đang làm dở, đã biết là thiếu

Ưu tiên theo mục 0.2 (gameplay trước). Xếp theo mức cần.

**A. Chờ chủ dự án chơi tay hoặc duyệt (tao không tự quyết được)**
- **Chơi tay d9.8:** giao diện hộp sự kiện một cột và hồ sơ chia trang, việc lớn đã siết, gia bảo cộng cả nhà, hệ số kỳ ngộ 3 và sàn tiền kỳ ngộ, mức trừ tâm trạng góp công quỹ -1, -3, -6, cưới nhân phép của lính. Chỉ mới thử bằng bot và gọi hàm.
- **Chơi tay các kết cục:** chủ dự án mới đi thành công đường Quyền thần qua quan văn. Chưa ai chơi tới Võ quan, Khởi nghĩa, T4 đến T11 và các kết phụ. Đã kiểm bằng gọi thẳng hàm (d9.6): chín kết T3 đến T11 mở hộp thành tựu, "Tiếp tục" thì ván tiếp tục kèm ghi Sử sách và gia bảo, "Khép lại" thì ván kết; đã chụp màn T4. Chưa chơi một ván đi hết tới kết, chưa xem màn hậu sử T3, T5 đến T11.
- **Chốt tạm, chờ duyệt khi chơi (chủ dự án 22/11: "tao tự chốt, mày duyệt sau"):** danh sách việc lớn (`BIGS`), phần thưởng kết phụ (`WPREW`), 39 món gia bảo (`data-giabao.js`), 43 sự kiện `cv_*` (`ev-cotran.js`, xóa file nếu không dùng), 73 id bộ nhớ (`events-mem.js`), giao diện mới của admin (mục 7), chỉnh `usWin` d9.6.
- **"Câu nối" cho 39 chuỗi cũ:** hoãn. Chưa rõ "câu nối" cụ thể là gì (không tìm thấy cơ chế mang tên đó trong engine, ngoài ý mục 6 "sự kiện thường góp phần vào cốt truyện đang chạy"). Hỏi chủ dự án lấy một ví dụ rồi mới làm.
- **Cân bằng cần quyết:** Khởi nghĩa hơi khó (17 đến 40%), người mạnh nên 40 đến 55%; chủ dự án cho biết có nâng không.

**B. Gameplay còn hở**
- **Nút mở cơ sở ẩn mà không nói lý do:** nút "Mở y quán" (và các cơ sở khác) chỉ hiện khi `canOwn` đúng (nghề hợp, thông thạo từ 50, quản trị từ 35); không đủ thì biến mất, dù `bizSkillWhy` đã có sẵn danh sách lý do chưa hiển thị. Chủ dự án (23/11) hỏi "tại sao nghề Y thông thạo hơn 50 mà không mở được hiệu thuốc" rồi nói không cần sửa; chưa sửa. Nhiều khả năng thiếu quản trị.
- **Hộp cưới tự chọn vợ:** đã sửa `lq_phep`; còn 22 chỗ gọi `mkSpouse(...)` trong sự kiện chưa rà xem hộp nào cưới mà không cho chọn người.
- **Giang hồ:** thiếu hệ thống chiến tranh giữa phái chạy theo thời gian (hiện chỉ đổi `pow`), cấp bậc nội bộ, bí kíp chưa có tác dụng lâu dài ngoài chỉ số.
- **Thế lực tự phát** mới có bản đầu 4 sự kiện; **quân hộ** chưa đời đời (mỗi đời một người thật phải nhập ngũ), **Đông xưởng** chưa có thế lực theo năm, **thiết khoán** chưa có sự kiện thu hồi, **nghề mới cho đời sau** chưa có, **cốt truyện lớn khác ngoài họ Phạm** chưa có.
- **Phần B quan trường còn mỏng:** người giữ ghế (`S.off`) chỉ thành NPC khi bị thay, bị hặc hoặc thắng ghế (nay người giữ ghế từ Tứ phẩm hoặc ở tỉnh nhà đã là NPC thật ngay); thanh trừng giữa các quan mới là vua nghi kỵ và kẻ thù đàn hặc ngầm; thế gia chưa tham gia tranh ghế; Vượng chưa có hồ sơ riêng. Năm sự kiện `tq_*` mới (`ev-v670p.js`) mới nạp được, **chưa chạy với người đang có ghế** (test gọi thẳng bị lỗi vì gia chủ thử không có ghế).
- **Chọn người thật:** đã chuyển 14 sự kiện (7 đợt đầu cộng `h_ng_duyet`, `h_du_phatthuoc`, `stf_death`, `lw_33`, `dh_76`, `rg_dam_tang`, `hg_n_thu`); các sự kiện mà người đi chính là người gặp việc (`t_danh_tuong`, `bat_linh`, `qn631_gac_ai`, `vil_l_tho`, `xg_cau_hon`, `tt_tuyen_tu`, `vil_p_hon`, `c631_tien_cu_huong_truong`) không cần chọn. Chuỗi liên hôn và lên kinh mới có hai bước, chưa dài hơn.
- **Cả gia tộc đồng lòng:** chưa có chi phí giữ quan hệ; hệ số chưa cân bằng.
- **Gia tộc có thể teo:** đã đo lại (bot tự cưới, 100 năm: 7 đến 8 người sống, 26 người tổng, không teo); hai save thật cũ từng teo vì bot không cưới. Chưa thử nghiệm trên save người chơi mới.
- **Sự kiện đất:** 24 id cho đất chỉ ra khi nhà có quan hoặc tước (`LANDGIVE`); các sự kiện nông (`nong_*`, `nong631_*`, `n633_nong_*`) đọc `F().own` nên chỉ ra cho nhà có đất mua. Chuỗi `vil_*` cũ đã tắt nên không rà.
- **Bộ nhớ:** 73 id; `G.led.audit()` sạch sau bot 30 năm. Còn thêm được, nhất là nhóm hôn nhân, tang lễ, thầy trò, hàng xóm.
- **Kỳ ngộ gia tộc:** đã có 13 (5 ở d9.5, 8 ở d9.6: `kn_bia_da`, `kn_ket_nghia`, `kn_cay_co_thu`, `kn_phien_cho_lon`, `kn_thay_nuoc_ngoai`, `kn_nguoi_giup_viec_cu`, `kn_xom_chay_nha`, `kn_nguoi_la_dua_thu`, trong `ev-v670l.js`), mới chạy tay.

**C. Cân bằng (chỉ làm sau khi gameplay xong)**
- **Ba đường lên ngôi (d9.6):** bot thử (nhân vật trí, võ, mị lực, EQ đều 100, tránh nút "bỏ", "thôi", "từ chối", không ép xúc xắc). Trước chỉnh, 15 ván mỗi đường: Võ quan 67%, Khởi nghĩa 40%, Quyền thần 20%. Chỉnh `usWin` (Quyền thần +0,10, Võ quan -0,06). Sau chỉnh, 12 ván mỗi đường: Võ quan 50%, Quyền thần 50%, Khởi nghĩa 17% (gộp mọi lần đo Khởi nghĩa khoảng 30%). Ván thua đều là án thập ác kèm bàn chuyện tru di (lộ rồi bị xử). Mẫu nhỏ, chưa đo người trung bình hay nhân vật có quan và quân thật, bot chọn nút đầu không phải người chơi tối ưu.
- **Con số d1 đến d8 chưa đo:** tốc độ lên quan (mong Nhất phẩm khoảng năm 38), giá đất, lương tá điền 450, số mẫu mỗi dự án, giá gia quy, xác suất cốt truyện hoàng thân, snowball cơ duyên và tiền theo gia thế, tần suất `cv_*`, tốc độ chỉ số 200 (xem mục 3).

**D. Kỹ thuật**
- `events-meta.js` phân loại chưa đúng. Dựng lại bằng `tools/classify.js` (file này cũng ghi `manifest-su-kien.csv` ra thư mục cha; manifest cũ đã xóa vì lệch mã).
- `tools/roots-gen.js` dùng đường dẫn `__dirname/repo` của thư mục tạm cũ, phải sửa trước khi dùng. `tools/run.js` gắn cứng đường dẫn Chrome trên Windows.
- Script đo cân bằng và chụp ảnh viết ở thư mục tạm rồi xóa; chưa có công cụ lưu lại trong `tools/` (xem mục 12).
- Để sau: tách `engine.js` thành module, Escape và tiêu điểm trong hộp thoại, đưa `<title>` vào `<head>`.

---

## 12. Kế hoạch tương lai (dự định, **chưa phải luật**; chủ dự án duyệt hoặc đổi trước khi làm, mục 0.4)

Thứ tự theo mục 0.2: gameplay trước, rồi cân bằng, rồi nội dung. Mỗi đợt nhỏ làm trên một nhánh riêng theo mục 0.6.

**Đợt d9.8: gom phản hồi chơi tay (bắt buộc đi đầu).** Chủ dự án chơi tay ba đường lên ngôi, T4 đến T11, việc lớn, hôn lễ và tang lễ người ở chi họ (hai hộp d9.6 sửa nhưng chưa chơi tay); ghi lỗi và góp ý vào mục 10 nguyên văn; sửa lỗi treo hoặc kẹt trước (mục 0.2). Duyệt hoặc đổi phần chốt tạm ở mục 11A.

**Đợt d9.9: công cụ đo (làm trước khi cân bằng thêm).** Viết `tools/bal.js` lưu lại script bot đo ba đường (chọn nút tiến tới, ghi lý do kết thúc từng ván, nhiều ván hơn, nhân vật trung bình và mạnh, có hoặc không có quan, quân thật); thêm `tools/shot.js` chụp ảnh giao diện. Mục tiêu: 30 ván mỗi đường mỗi nhóm người để số có ý nghĩa. Đo thêm tốc độ lên quan, tần suất `cv_*`, tần suất `tq_*`.

**Đợt d9.10: giang hồ thành hệ thống.** Chiến tranh giữa phái chạy theo năm (`S.wr.war` có bên, sức mạnh, kết cục kéo theo đổi địa bàn và độ nóng), cấp bậc nội bộ có chức (trưởng lão, hộ pháp) kèm bổng và bổn phận, bí kíp có tác dụng lâu dài (cờ `c.flags.bk` đổi hệ số rèn hay trần chỉ số, có giá, có thể mất khi phái diệt), anh hùng đại hội định kỳ. Nối vào đường T10 và thế lực tự phát.

**Đợt d9.11: quân hộ, Đông xưởng, thiết khoán trọn vẹn.** Quân hộ đời đời (mỗi đời một người thật phải nhập ngũ hoặc thuê thay, bỏ trốn có hậu quả), thế lực Đông xưởng theo năm (tăng giảm theo vua, ảnh hưởng thanh trừng quan), sự kiện thu hồi thiết khoán. Nối vào `officeFeud`, `purgeYear`.

**Đợt d9.12: quan trường sống hơn.** Thế gia tham gia tranh ghế; người giữ ghế thấp thành NPC khi đủ liên quan; thanh trừng giữa các quan không chỉ do vua nghi kỵ; Vượng có hồ sơ riêng; chi phí giữ quan hệ trong `clanSupport` (tiền, hôn nhân, ơn nghĩa); chuỗi liên hôn và lên kinh dài hơn (ba đến năm bước, có ngã rẽ).

**Đợt d9.13: nội dung theo mức.** Gắn `lv` tay cho các sự kiện quan trọng và vặt (hiện chỉ suy tự động); dùng mức để cân tần suất (vặt dày, lớn thưa) và để gom thư tay; làm rõ "câu nối" với chủ dự án rồi áp cho 39 chuỗi cũ; thêm bộ nhớ cho nhóm hôn nhân, tang lễ, thầy trò, hàng xóm; thêm kỳ ngộ gia tộc; cốt truyện lớn thứ hai ngoài họ Phạm; nghề mới cho đời sau. Mục tiêu dài hạn 5.000 sự kiện và 500 kỳ ngộ.

**Đợt d9.14: giao diện (một phần đã làm ở d9.8).** Hộp sự kiện một cột và hồ sơ chia trang đã đưa vào bản chính ở d9.8. Còn lại: xem trên điện thoại, cho các hộp thông tin khác (`infoPopup`, hộp chọn người, hộp Mối) cùng bố cục, trang Gia tộc và Cơ ngơi gọn lại, Escape và tiêu điểm trong hộp thoại, `<title>` trong `<head>`; quyết định bỏ hay giữ `ui2.*` và `avatar2.js` (giao diện admin) vì bản chính đã có bố cục gần giống.

**Đợt sau d9.14: kỹ thuật.** Dựng lại `events-meta.js` bằng `classify.js`, sửa `roots-gen.js` và `run.js` cho chạy ở nhiều máy, tách `engine.js` thành module (bắt đầu từ các khối đã đóng gói: gia bảo, `WP`, `clanSupport`, giang hồ). Bật lại tương thích save cũ khi chủ dự án bảo (mục 0.11).

**Câu hỏi cần chủ dự án trả lời trước khi bắt đầu:** (1) số bản kế tiếp (d9.8 có đi theo "6.7.10" không); (2) "câu nối" là gì; (3) Khởi nghĩa có cần dễ hơn; (4) giữ hay bỏ `ui2.*` và `avatar2.js` sau khi bản chính đã có bố cục mới; (5) thứ tự ưu tiên của các đợt trên.
