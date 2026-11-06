# Báo cáo v6.3.5 (06/11/2026)

Bản sửa và bổ sung trên nền v6.3.4, theo 14 điểm người chơi báo, thêm dòng phiên bản mờ ở góc phải màn hình. Chưa phải v6.4.
Mã nguồn: GitHub `Reyleigh1545/BachNienTheGia`, nhánh `v6.3.5` (từ `v6.3.4`, chưa gộp vào `main`; `main` vẫn là v6.3).
Sự kiện: 1.048 (+26 so với v6.3.4), trong đó kỳ ngộ 218 (+3). Còn cách mục tiêu v6.5 (5.000 sự kiện, 500 kỳ ngộ) rất xa, vẫn đi từ từ.

**Về kiểm thử.** Theo lệnh "chỉ test khi được yêu cầu", lượt này không chạy bộ test. Chỉ làm kiểm tra cú pháp toàn bộ tệp, và một lượt khởi động ngắn để chắc game không văng lỗi: 3 ván bot chạy 32 đến 45 năm không lỗi script, từng lựa chọn của 31 sự kiện mới được gọi thử không lỗi, và chuỗi ngã rẽ → sự kiện nhánh chạy được trong vòng chơi thật. Chưa kiểm cân bằng số liệu.

## 1. Các điểm và kết quả

| # | Điểm báo | Kết quả |
|---|---|---|
| 1 | Bỏ phần trăm ở các lựa chọn | Mục 2 |
| 2 | Đi dự đám khi nhà một người | Mục 3 |
| 3 | Chuyển giao gia chủ, tiền riêng gia chủ | Mục 4 |
| 4 | Đủ 18 tuổi có việc thì tự lo | Mục 5 |
| 5 | Tật xấu: ai được khuyên can, ai được đánh phạt | Mục 6 |
| 6 | Thuê của nhà giàu trả quá ít | Mục 7 |
| 7 | Khuynh thành mị lực thấp; nghề không hợp chỉ số; ước nguyện nghề phi lý | Mục 8 |
| 8 | Bốn danh gia xuất hiện ở mọi nơi; mỗi nơi nên có danh gia riêng | Mục 9 |
| 9 | Quà biếu danh gia quá rẻ | Mục 10 |
| 10 | Sự kiện, kỳ ngộ của danh gia chỉ khi ở gần hoặc tại nơi | Mục 9 và 11 |
| 11 | Danh vọng cá nhân hiện cấp độ, nên gọn và đẩy lên đầu | Mục 12 |
| 12 | Ân oán chỉ khi nhà có người làm quan từ ngũ phẩm | Mục 13 |
| 13 | Con trai Phạm Trung Kiên đánh cả gia chủ | Mục 13 |
| 14 | Ân oán có chia nhánh theo lựa chọn không | Mục 14 |
| | Dòng phiên bản mờ góc phải | `v6.3.5`, chữ nhỏ mờ, không bấm được |

## 2. Bỏ phần trăm (điểm 1)

Hộp lựa chọn không còn hiện tỉ lệ thành công. Chỗ nào trước đây ghi phần trăm bằng số (mai mối, hỏi cưới, bà mụ) nay ghi bằng chữ ("nhiều khả năng nhận lời", "còn đắn đo", "khó nhận lời"…). Phép tính xác suất phía sau không đổi.

## 3. Đi dự đám (điểm 2)

Sự kiện "đi dự đám" (hỏi lễ làng):
- Nhà chỉ còn một người thì **không còn** lựa chọn "cả nhà đi". Chỉ còn "tự đi" hoặc không đi.
- Nhà đông người: "cử một người đại diện" nay có lợi nếu thuận. Thử tài ăn nói của người được cử; thuận thì người ấy **tăng danh vọng cá nhân và tâm trạng**, quen thêm người; không thuận thì chỉ mất lễ, tâm trạng người đi nhẹ giảm.

## 4. Gia chủ (điểm 3)

- **Chuyển giao gia chủ không còn là nút bấm thẳng.** Cơ hội được người nhà chấp thuận tính từ: danh vọng của gia chủ hiện tại, mức người nhà tin tưởng gia chủ (quan hệ trung bình), danh vọng và tài (ăn nói, trí, quản lý) của người nhận, người nhận có muốn gánh việc không, di chúc có chỉ định không. Bị trừ nếu người nhận còn quá trẻ, là con dâu/rể, gia tộc đang bất ổn, còn người cạnh tranh có oán hoặc cũng muốn làm gia chủ, hoặc gia tộc có luật trưởng nam mà người nhận không phải trưởng nam. Hộp thoại cho biết triển vọng bằng chữ, không bằng số. Họp họ không thành thì phải đợi 12 tháng mới bàn lại, kèm ổn định giảm và người nhận buồn; thành công thì 36 tháng sau mới đổi lại được.
- **Hết lỗ hổng lấy tiền riêng.** Đổi gia chủ không còn kéo tiền riêng của ai vào công quỹ; tiền riêng vẫn là của người đó.
- **Gia chủ được giữ lại một phần thu nhập** làm tiền riêng để tiêu dùng và làm tài sản: chọn 0%, 10%, 20% hoặc 30% (mặc định 10%) ở trang gia chủ. Phần còn lại vào công quỹ. Gia chủ có thể tự nguyện góp 25%, 50% hoặc toàn bộ tiền riêng vào công quỹ khi muốn, hoặc giữ lại hết.
- Câu "làm gia chủ sẽ tăng mạnh các chỉ số" tao hiểu là chuyện gia chủ **vơ lấy phần tăng chỉ số của các sự kiện**: chỗ nào bị vậy đã chặn. Không thêm thưởng chỉ số mới cho gia chủ. Nếu mày muốn nói ý khác thì nói lại.

## 5. Tự lo từ 18 tuổi (điểm 4)

Gia tộc chỉ nuôi: trẻ dưới 18, gia chủ, và người làm ruộng chung của tộc. Người từ 18 trở lên có việc thì tự lo ăn tiêu từ thu nhập của mình. Không có việc thì cha mẹ nuôi (vợ chồng, con cháu khi đã già). Gia tộc chỉ đỡ khi cả nhà thật sự túng. Trang từng người ghi rõ ai đang ăn bằng cái gì.

## 6. Tật xấu (điểm 5)

- **Gia chủ** mắc tật xấu: chỉ trưởng bối hoặc vợ/chồng được **khuyên can**. Không ai đánh phạt, cấm đoán được gia chủ.
- **Người danh vọng từ 100**: chỉ trưởng bối hoặc gia chủ được khuyên can.
- **Người thường**: trưởng bối được răn dạy như trước. Gia chủ chỉ được răn dạy người dưới 40 tuổi, không phải bậc trên của mình và không hơn mình quá 5 tuổi. Người có tuổi không còn bị người ngang hàng hay con cháu đánh roi.
- Người dưới 25 tuổi mắc tật thì cha mẹ ra mặt trước.
- Nút trên trang từng người đổi chữ "Răn dạy" hoặc "Khuyên can" theo người ra tay.

## 7. Thuê của nhà giàu (điểm 6)

Sự kiện "Nhà giàu thuê người": nhận làm trước chỉ được 5 đến 10 đồng, nay được khoảng **90 đến 180 đồng** ở nhà thường dân (nhà khá giả hơn thì nhân theo hệ số của bậc nhà), tức tăng khoảng 18 lần. Vẫn bị quát tháo, nhưng đáng công hơn việc giữ thể diện.

## 8. Khuynh thành, nghề và ước nguyện (điểm 7)

- **Khuynh thành** nay có mị lực tối thiểu 80 (người lớn khoảng 85 đến 88), không phai theo năm tháng. Người đã có đặc tính này từ bản cũ mà mị lực thấp sẽ được **chỉnh tự động** khi nạp save và mỗi lần sinh nhật.
- **Nghề phải hợp chỉ số.** Nghề nặng (khuân vác, thợ rèn, lính…) cần võ lực và sức khỏe tối thiểu; nghề chữ cần trí; nghề giao thiệp cần ăn nói. Người mới sinh, người ngoài vào (vợ/chồng mai mối) được chọn nghề theo `statFit`: chỉ số quyết định, không bốc ngẫu nhiên.
- **Ước nguyện nghề:** điểm mong muốn nghề nay tính theo mức hợp chỉ số. Người đã có nghề chỉ mong nghề khác khi nghề ấy hơn hẳn (lương cao hơn, hoặc nhẹ nhọc hơn mà lương không kém); làm lâu, đã lên bậc, lương khá thì càng ít khi bỏ để sang nghề thấp và nặng hơn.
- Không tái hiện được trường hợp vợ mị lực 34 bằng đường mai mối hiện tại (mị lực thấp nhất khi đó là 69), nên khả năng cao đó là người sinh ra từ bản cũ; phần chỉnh tự động ở trên xử lý.

## 9. Danh gia theo nơi ở (điểm 8, 10)

- **Bốn thế gia lớn** (Nguyễn ở Nhạn Môn, Vũ ở Thiên Kinh, Dương ở Dược Cốc, Kiều ở Bạch Sa) **chỉ gặp mình khi mình sống ở nơi họ ở** (việc riêng của từng nhà) hoặc khi mình ở gần (trong hai tháng đường, chỉ thư từ, lễ vật và việc chung).
- **Mỗi nơi khác có một hoặc hai danh gia riêng** (họ sống trong vùng, có tiếng): bậc Danh gia, Thế gia hoặc Danh môn vọng tộc. **Tại bốn nơi của bốn thế gia lớn thì không có danh gia nào khác**, bốn nhà ấy hùng cứ.
- Trang Gia tộc có thẻ "Danh gia vọng tộc" liệt kê các nhà **cùng nơi ở** hoặc **ở gần** kèm quan hệ, nút gửi lễ, gửi thư. Nhà xa hơn hai tháng đường thì không hiện, không có sự kiện.
- Save cũ được đánh dấu lại danh gia theo cách này khi nạp.

## 10. Quà biếu (điểm 9)

Mức lễ tương xứng tăng mạnh theo thân phận nhà nhận (tính từ danh vọng và của cải của họ):

| Nhà nhận | Lễ tương xứng (Lễ vừa) |
|---|---|
| Danh gia nhỏ | khoảng 3 bạc |
| Danh gia | khoảng 14 bạc |
| Thế gia | khoảng 200 đến 290 bạc |
| Danh môn vọng tộc | khoảng 2,3 đến 4,9 vàng |

Ba mức lễ mọn (35%), vừa (100%), hậu vẫn giữ. Quà quá rẻ so với nhà lớn vẫn không thêm thân. Nhà nhỏ biếu nhà lớn vẫn chỉ lên tới mức quen biết.

## 11. Sự kiện và kỳ ngộ về danh gia (điểm 10)

File mới `ev-v635a.js`, 11 sự kiện (2 kỳ ngộ), chia hai loại, **không** dùng chung:

| Loại | Điều kiện | Sự kiện |
|---|---|---|
| Tại nơi | Nhà họ sống cùng nơi mình | Mời dự đám, Nhờ một việc, Ngỏ ý kết thân (thông gia), Tranh chấp với danh gia, Gia chủ ghé thăm, **Được nhận làm môn khách (kỳ ngộ)** |
| Ở gần | Nhà họ trong hai tháng đường | Thư từ xa, Sứ giả đi ngang, Tin đồn về một nhà có tiếng, Thương nhân thân tín, **Khách quý để lại một món (kỳ ngộ)** |

Tiền lễ trong các sự kiện này tính theo thân phận nhà họ, có trần theo túi tiền nhà mình để không vỡ quỹ.

Trong chuỗi ân oán, các cảnh có người của Dương, Kiều, Nguyễn tìm đến nay chỉ xảy ra **nếu nhà đó ở gần**. Mọi lựa chọn "nhờ họ Nguyễn/Vũ/Dương/Kiều giúp" và các con đường kết thúc cần nhà thế gia làm chỗ dựa cũng chỉ tính nhà ở gần.

## 12. Danh vọng cá nhân (điểm 11)

Trang từng người chỉ hiện **một nhãn** danh vọng (có tiếng tăm, danh nhân…) ở **hàng nhãn đầu trang**, ngay cạnh tuổi và quan hệ, không còn bảng cấp độ cạnh mục danh vọng. Bấm vào nhãn thì hiện giải thích kèm theo.

## 13. Ân oán: điều kiện khởi đầu và đánh đòn (điểm 12, 13)

- **Khởi đầu:** ân oán chỉ bắt đầu khi nhà có người làm quan từ **ngũ phẩm trở lên** (tao hiểu "trên ngũ phẩm" là từ ngũ phẩm trở lên; nếu mày muốn chặt hơn là từ tứ phẩm thì nói). Nhà dân thường không còn bị lôi vào.
- **Đánh đòn:** nguyên nhân là sự kiện chọn người bị đánh yêu cầu từ 14 tuổi, trẻ 9 đến 13 không có ai hợp nên chuyển sang gia chủ. Đã sửa: chỉ chọn người từ 6 đến 17 tuổi, và không chuyển sang gia chủ nữa. Nhà không có trẻ phù hợp thì sự kiện không xảy ra.

## 14. Ân oán có chia nhánh không (điểm 14)

**Trả lời thẳng: trước v6.3.5 không.** Chỉ có ba thái độ (đánh trả, âm thầm ghi chép, nhẫn nhịn) do hai sự kiện đầu quyết định, cùng ba bộ đếm chung (chứng cứ, nhân chứng, dân tâm), vài cờ, và các bể sự kiện bốc có trọng số. Mọi gia tộc đi chung một đường; thái độ chỉ đổi nhịp. Bốn con đường kết thúc (kiện, võ, tiền, dân) có sẵn nhưng không có chuyện riêng dẫn tới.

**Nay có nhánh thật.** Sau phần mở đầu, nhà mình gặp sự kiện **Ngã rẽ** và chọn một hướng:

| Hướng | Cần | Chuỗi chuyện riêng | Điều kiện nó thay thế ở đường kết thúc |
|---|---|---|---|
| Đường công đường | Không | Đơn kiện đầu tiên, Thầy cãi thuê, Quan huyện nghiêng về ai | "Có chỗ dựa trên công đường" |
| Đường võ lực | Có người đánh được hoặc ít tiền | Lập đội canh, Đụng độ ngoài chợ, Võ sư tha hương (kỳ ngộ) | "Có người đánh được" |
| Đường tiền bạc | Có ruộng hoặc cơ sở làm ăn | Cắt nguồn hàng, Quỹ chung các nhà buôn, Hắn hạ giá | "Có cơ sở làm ăn" |
| Đường dân tâm | Không | Phát chẩn mùa giáp hạt, Dân kéo đến kể oan, Tin đồn ngược | "Danh vọng gia tộc từ 300" |
| Nhẫn nhịn chờ thời | Không | Một bước ép thêm, Có người nhờ nhà mình đứng ra | Sau ba năm được hỏi lại; từ chối nộp thêm cũng mở lại ngã rẽ sớm |

Mỗi sự kiện nhánh cho cờ riêng khi thành công (hai cờ trở lên thì thay thế điều kiện kể trên). Đi hướng nào thì đường kết thúc **tương ứng** cần ít chứng cứ hơn một bậc, các đường **khác** cần nhiều hơn một bậc (nhẫn nhịn thì không đổi). Dân tâm chỉ cần 45 thay vì 55 nếu đi đường dân tâm. Thái độ nhà mình đặt theo hướng chọn (công đường và tiền bạc là ghi chép, võ lực và dân tâm là đối đầu, nhẫn nhịn là nhẫn nhịn). Hồ sơ ân oán ở trang Gia tộc có thêm dòng "Hướng đi". Save đang chơi dở ở giai đoạn giằng co sẽ gặp Ngã rẽ ngay lần sắp tới.

Mới có 15 sự kiện (1 ngã rẽ + 14 nhánh); mỗi hướng mới chỉ có ba chuyện nên nhánh còn ngắn. Hướng đi sâu hơn để dành cho các bản sau nếu mày muốn.

## 15. Còn lại cần mày biết

- Các điểm tao đã diễn giải: "trên ngũ phẩm" = từ ngũ phẩm trở lên; điểm 3 câu đầu (gia chủ tăng mạnh chỉ số) hiểu là chặn gia chủ vơ lấy phần chỉ số; khuynh thành mị lực tối thiểu 80.
- Chưa có thử nghiệm cân bằng lượt này, nên các con số tiền của sự kiện mới (lễ, góp, phát chẩn) cần mày chơi xem có ổn không.
- Nhiều chuyện nhờ vả của chuỗi ân oán giờ đòi nhà thế gia phải ở gần; người chơi sống xa cả bốn nhà sẽ ít chỗ dựa hơn trước. Đó là hệ quả trực tiếp của điểm 10.
