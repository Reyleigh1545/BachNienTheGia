/* ================= v6.4 · Quan võ Đại Nguyễn =================
   Cùng cách ghi với data-v64.js. ar3..ar7 là cấp bậc quân cần có (Bách hộ, Thiên hộ, Phó tướng, Tướng quân, Đại tướng quân).
   Binh sĩ, Ngũ trưởng, Thập trưởng chưa có ghế riêng, đến Bách hộ mới được bổ chức. */
(function(){
const D=window.D;
D.ROWS64.push(`
#Bách hộ sở và đồn trấn
bachho|Bách hộ sở bách hộ|C6|H|1|vo|ar3|Chỉ huy một trăm quân đóng trong huyện.
chanhbh|Chánh bách hộ|C6|C|2|vo|ar3|Chỉ huy trăm quân đóng ở thành châu.
hieuuy|Hiệu úy thành thủ|T6|C|2|vo|ar3 s.8|Giữ cổng thành, tường lũy.
dondien|Đốc đồn điền|T6|H|1|vo|ar3 s1.3|Cai quản quân sĩ cày cấy ruộng đồn.
trambinh|Trưởng trạm gác|T6|H|1|vo|ar3|Chỉ huy trạm canh đường quan.
ngunghiep|Thủ ngự cửa sông|T6|H|1|vo|ar3 s1.2|Giữ cửa sông, bến đò, kiểm thuyền qua lại.
cungno|Cung nỏ bách hộ|C6|F|2|vo|ar3 vo55|Chỉ huy một đội cung nỏ thủ.
tuongbinh|Tượng binh bách hộ|C6|F|1|vo|ar3|Chỉ huy đội voi chiến.
congbinh|Công binh bách hộ|T6|F|1|vo|ar3 tri45|Chỉ huy đội thợ đắp lũy, bắc cầu.
kybinhBH|Kỵ binh bách hộ|C6|C|1|vo|ar3 vo55|Chỉ huy một đội kỵ binh.
thuyphong|Thủy trại bách hộ|C6|G|3|vo|ar3|Chỉ huy một đội thuyền nhỏ.
tuanbien|Tuần biên bách hộ|C6|A|3|vo|ar3 s1|Dẫn quân tuần tra dọc biên giới.
tieuhau|Tiêu hậu bách hộ|T6|A|3|vo|ar3|Trông các đài nhóm lửa báo hiệu ngoài biên.
ngubach|Bách hộ ngự lâm|C6|K|6|vo|ar3 mi40|Lĩnh một đội ngự lâm quân gác cung.
camyBH|Cẩm y bách hộ|C6|K|4|vo|ar3 tri45 mi45 s1.5|Bách hộ trong Cẩm y vệ, mật thám của triều.
kinhbach|Bách hộ kinh doanh|C6|K|6|vo|ar3|Chỉ huy trăm quân thường trực ở kinh đô.
vemon|Vệ môn bách hộ|T6|K|4|vo|ar3|Giữ các cổng lớn của kinh thành.
#Thiên hộ sở và vệ
thienho|Thiên hộ sở thiên hộ|C5|C|1|vo|ar4|Chỉ huy ngàn quân ở một châu.
thienhoF|Thiên hộ vệ|C5|F|2|vo|ar4|Chỉ huy ngàn quân trong vệ của phủ.
phothienho|Phó thiên hộ|T5|F|2|vo|ar4|Phó của Thiên hộ.
thubi|Thủ bị|C5|A|2|vo|ar4|Giữ cửa ải, lo kho vũ khí.
trangan|Trấn phủ thiên hộ|C5|K|2|vo|ar4 tri50 s1.4|Giam giữ, thẩm vấn phạm nhân trong Cẩm y vệ.
thuythien|Thủy quân thiên hộ|C5|G|2|vo|ar4|Chỉ huy hạm đội nhỏ giữ cảng.
ngothien|Ngự lâm thiên hộ|C5|K|3|vo|ar4|Chỉ huy ngự lâm quân canh cung điện.
dondienT|Đồn điền thiên hộ|C5|P|1|vo|ar4 s1.4|Quản đồn điền nuôi quân của tỉnh.
kybinhT|Kỵ binh thiên hộ|C5|P|1|vo|ar4 vo60|Dẫn đội kỵ binh nhẹ.
phaothu|Pháo thủ thiên hộ|C5|P|1|vo|ar4 tri45|Coi đội súng pháo.
tuongbinhT|Tượng binh thiên hộ|C5|P|1|vo|ar4|Chỉ huy đội voi chiến cả tỉnh.
congbinhT|Công binh thiên hộ|T5|P|1|vo|ar4 tri50|Lo xây thành, đóng chiến thuyền cho tỉnh.
kinhthien|Thiên hộ kinh doanh|C5|K|4|vo|ar4|Chỉ huy ngàn quân trong doanh kinh đô.
hauthien|Hậu cần thiên hộ|T5|K|2|vo|ar4 tri52 eq50 s1.6|Lo lương thảo, quân nhu cho cả doanh.
tuanthien|Tuần phòng thiên hộ|T5|A|2|vo|ar4|Đứng đầu đội tuần tra dọc ải.
#Phó tướng, du kích, tham tướng
chihuyThiem|Chỉ huy thiêm sự|C4|F|1|vo|ar5|Giúp Chỉ huy sứ coi một vệ.
dukich|Du kích tướng quân|C4|P|2|vo|ar5 vo62|Đi tuần ngoài biên, cơ động chống giặc.
thamtuong|Tham tướng|C4|A|2|vo|ar5|Phó của Tổng binh trấn ải.
photuong|Phó tướng trấn|T4|P|1|vo|ar5|Phó tướng giúp Tổng binh một trấn.
thuysuPho|Thủy sư phó đề đốc|C4|G|1|vo|ar5|Phó chỉ huy thủy quân.
camyThiem|Cẩm y chỉ huy thiêm sự|C4|K|2|vo|ar5 tri55 mi45 s1.5|Giúp việc trong Cẩm y vệ.
kinhdoanhPT|Kinh doanh phó tướng|C4|K|3|vo|ar5|Phó tướng đội quân bảo vệ kinh đô.
dochihuy|Đô chỉ huy thiêm sự|C4|P|1|vo|ar5|Đô ty cai quản quân vệ cả tỉnh.
thutuong|Thủ ngự phó tướng|T4|G|1|vo|ar5|Giữ hải phận, đón tàu lạ.
lenhdai|Lĩnh quân phó tướng|T4|F|1|vo|ar5 tri50|Lĩnh quân đi dẹp loạn quanh phủ.
#Tướng quân, tổng binh
chihuysu|Chỉ huy sứ|C3|F|1|vo|ar6 tri50|Đứng đầu một vệ.
tongbinh|Tổng binh|C3|A|1|vo|ar6 tri55 eq50|Đứng đầu quân trấn giữ cửa ải.
docdoc|Đô chỉ huy sứ|C3|P|1|vo|ar6 tri55|Đứng đầu đô ty quân vụ cả tỉnh.
thuydedoc|Thủy sư đề đốc|C3|G|1|vo|ar6 tri50|Đứng đầu thủy quân, giữ biển.
camyDong|Cẩm y chỉ huy đồng tri|C3|K|2|vo|ar6 tri60 mi50 s1.5|Giúp Chỉ huy sứ Cẩm y vệ.
kinhdoanhT|Kinh doanh tướng quân|C3|K|3|vo|ar6 tri55|Chỉ huy một doanh quân kinh đô.
thanquan|Thân quân vệ tướng quân|C3|K|2|vo|ar6 mi45|Chỉ huy thân quân bảo vệ nhà vua.
tongbinhP|Trấn thủ tổng binh|C3|P|1|vo|ar6 tri55 eq50|Trấn giữ một tỉnh, nắm quân vệ sở.
kybinhTQ|Kỵ binh tướng quân|C3|K|1|vo|ar6 vo70|Chỉ huy đội kỵ binh tinh nhuệ của triều.
#Đại tướng quân, đô đốc
dodoc|Đô đốc|C2|P|1|vo|ar7 tri60 eq55|Đứng đầu quân đội một tỉnh.
dodocphu|Đô đốc phủ tả đô đốc|C1|K|5|vo|ar7 tri65 eq60|Đứng đầu một trong năm Đô đốc phủ.
camyChi|Cẩm y chỉ huy sứ|C2|K|1|vo|ar7 tri65 mi55 s1.6|Đứng đầu Cẩm y vệ, tai mắt của nhà vua.
daitong|Đại tướng quân trấn ải|C2|A|1|vo|ar7 tri62 eq55 m1.2|Trấn giữ biên cương.
thongsoai|Thống soái kinh doanh|C1|K|1|vo|ar7 tri70 eq60 m1.3|Tổng chỉ huy quân kinh đô.
daithuy|Thủy sư đô đốc|C2|G|1|vo|ar7 tri58 eq52|Chỉ huy toàn bộ thủy quân.
binhdinh|Bình định đại tướng quân|C1|K|1|vo|ar7 tri68 eq58 vo80 m1.3|Lĩnh ấn đi dẹp loạn khi có chiến sự.
`);
D.build64();
})();
