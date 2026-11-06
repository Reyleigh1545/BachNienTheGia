/* ================= v6.4 · Quan chế triều Đại Nguyễn =================
   Chức quan sinh từ bảng ngắn bên dưới. Mỗi dòng: id|tên|phẩm|phạm vi|số ghế mỗi nơi|loại việc|ghi chú|mô tả
   phẩm: C hoặc T (chánh hoặc tòng) + số phẩm 1-9, ví dụ C7 = Chánh thất phẩm
   phạm vi: K kinh đô · B lục bộ · P tỉnh · F phủ · C châu · H huyện · A ải biên giới · G cảng
   ghi chú: tri60 eq50 vo40 mi50 (đòi chỉ số) · m1.1 (hệ số bổng) · s1.5 (hệ số lộc ngoài) · at:lai,ho (chỉ ở những nơi này) · ar3 (quan võ: cấp bậc quân cần)
   Dòng bắt đầu bằng # là tên cơ quan. Hồi tị tính theo cơ quan hoặc theo huyện, phủ, châu. */
(function(){
const D=window.D;
D.NAT.trieu.n='Đại Nguyễn';
D.NAT.trieu.d='Triều Đại Nguyễn do Nguyễn Thành Trung dựng nên, có ải biên giới Bắc và Tây.';

/* ---------- nơi đặt chức ---------- */
const RP=['nhan_mon','thien_kinh','hoai_thuy','lac_giang','hai_khau','ngoc_mon'];
const CNT={nhan_mon:{F:1,C:2,H:3},thien_kinh:{F:2,C:1,H:4},hoai_thuy:{F:2,C:2,H:5},lac_giang:{F:2,C:2,H:6},hai_khau:{F:1,C:2,H:4},ngoc_mon:{F:1,C:2,H:3}};
const BO=[['lai','Lại'],['ho','Hộ'],['le','Lễ'],['binh','Binh'],['hinh','Hình'],['cong','Công']];
const SYL1=['Thanh','Bình','An','Phong','Long','Vân','Lam','Hà','Hưng','Phúc','Thái','Vĩnh','Gia','Kim','Ngọc','Bảo','Đông','Tây','Nam','Bắc','Trường','Quảng','Nghĩa','Định','Tuy','Hoa','Lạc','Mộc','Sơn','Thủy'];
const SYL2=['Lâm','Điền','Khê','Dương','Nguyên','Phố','Lĩnh','Xuyên','Thành','Hải','Giang','Châu','Thôn','Hà','Cốc','Sa','Nhai','Trì','Bạc','Đài','Quan','Phong','Ninh','Hòa','Yên'];
let sd=20260411;const rnd=()=>{sd=(sd*1664525+1013904223)>>>0;return sd/4294967296};
const usedN=new Set();
function mkName(){for(let i=0;i<200;i++){const n=SYL1[Math.floor(rnd()*SYL1.length)]+' '+SYL2[Math.floor(rnd()*SYL2.length)];if(!usedN.has(n)){usedN.add(n);return n}}return 'Vô Danh'+usedN.size}
const UNITS={};const UL={K:['K'],B:[],P:[],F:[],C:[],H:[],A:[],G:[]};
UNITS.K={k:'K',t:'K',p:'thien_kinh',n:'Kinh sư'};
BO.forEach(([id,n])=>{const k='B:'+id;UNITS[k]={k,t:'B',p:'thien_kinh',n:'bộ '+n,s:id};UL.B.push(k)});
RP.forEach(p=>{const nm=D.PROV[p].n.replace(/ quan$/,'');const k='P:'+p;UNITS[k]={k,t:'P',p,n:nm,s:p};UL.P.push(k)});
RP.forEach(p=>{['F','C','H'].forEach(t=>{for(let i=0;i<CNT[p][t];i++){const k=`${t}:${p}:${i}`;UNITS[k]={k,t,p,n:mkName(),s:p};UL[t].push(k)}})});
['nhan_mon','ngoc_mon'].forEach(p=>{const k='A:'+p;UNITS[k]={k,t:'A',p,n:D.PROV[p].n.replace(/ quan$/,''),s:p};UL.A.push(k)});
UNITS['G:hai_khau']={k:'G:hai_khau',t:'G',p:'hai_khau',n:'Hải Khẩu',s:'hai_khau'};UL.G.push('G:hai_khau');
D.UNITS=UNITS;D.UNIT_LIST=UL;D.BO=BO;D.REALM=RP;

/* ---------- bảng chức dân sự ---------- */
const R=[];
D.ROWS64=R;
R.push(`
#Nội các và hàm vinh dự
daihocsi|Đại học sĩ nội các|C1|K|3|kinh|tri115 eq95|Tể tướng trong triều, dưới một người trên vạn người.
thaisu|Thái sư|C1|K|1|kinh|tri108 eq88 m1.2 s.3|Hàm tam công, vinh dự bậc nhất, ít việc nhiều danh.
thaipho|Thái phó|C1|K|1|kinh|tri106 eq86 m1.2 s.3|Hàm tam công, phụ đạo nhà vua.
thaibao|Thái bảo|C1|K|1|kinh|tri104 eq84 m1.2 s.3|Hàm tam công, giữ gìn ngôi báu.
thieusu|Thiếu sư|C2|K|1|kinh|tri98 eq80 m1.1 s.3|Hàm tam cô, thầy dạy Thái tử.
thieupho|Thiếu phó|C2|K|1|kinh|tri96 eq78 m1.1 s.3|Hàm tam cô, phụ giúp Thái tử.
thieubao|Thiếu bảo|C2|K|1|kinh|tri94 eq76 m1.1 s.3|Hàm tam cô, bảo vệ Thái tử.
vanuyen|Văn Uyên các đại học sĩ|T2|K|2|kinh|tri100 eq80|Giữ kho sách của triều, bàn đại sự cùng nội các.
nghichinh|Nghị chính đại thần|T2|K|3|kinh|tri96 eq84 s1|Dự bàn quốc sự trong buổi chầu lớn.
trungthu|Nội các trung thư|T7|K|6|kinh||Thảo chiếu chỉ, chép bản tấu cho nội các.
xanhan|Trung thư xá nhân|C7|K|4|kinh||Soạn chiếu lệnh dưới quyền nội các.
#Lục bộ
thuongthu|Thượng thư|C2|B|1|kinh|tri95 eq80|Đứng đầu một bộ.
thilang|Tả thị lang|C3|B|1|kinh|tri85 eq70|Phó quan một bộ, bên trái.
huuthilang|Hữu thị lang|T3|B|1|kinh|tri83 eq68|Phó quan một bộ, bên phải.
langtrung|Lang trung|C5|B|2|kinh||Đứng đầu một ty trong bộ.
vienngoai|Viên ngoại lang|T5|B|2|kinh||Phó ty ở bộ.
chusu|Chủ sự|C6|B|2|kinh||Làm việc trong một ty của bộ.
tuvu|Tư vụ|C8|B|1|kinh||Giữ sổ sách, ấn tín của bộ.
dienbac|Điển bạ|C9|B|1|kinh||Chép sổ, lưu hồ sơ của bộ.
thulai|Thư lại|T9|B|3|kinh|m.9 s1|Chép văn thư. Bổng thấp nhưng tay ngoài khá nhiều.
khaocong|Khảo công ty lang trung|C5|B|1|kinh|at:lai tri70 s.6|Chấm công trạng, định việc thăng giáng quan lại cả nước.
tuhuan|Tư huân ty chủ sự|C6|B|1|kinh|at:lai|Lo việc phong tặng, tập ấm.
cokinh|Cổ kim kho bạc đại sứ|T6|B|1|thue|at:ho s1.8|Coi kho bạc triều đình.
thuesu|Hộ bộ thuế vụ viên ngoại|T5|B|2|thue|at:ho s1.5|Nắm sổ thuế ruộng, thuế muối cả nước.
nghiche|Nghi chế ty lang trung|C5|B|1|kinh|at:le|Soạn nghi thức cúng tế, triều hội.
tudich|Tứ dịch quán đại sứ|T6|B|1|thue|at:le s1.2|Đón tiếp sứ thần các nước.
chucphuong|Chức phương ty lang trung|C5|B|1|kinh|at:binh|Giữ sổ võ quan, bản đồ địa hình.
xagia|Xa giá ty chủ sự|C6|B|1|kinh|at:binh|Lo xe ngựa, trạm dịch cho cả nước.
hinhdanh|Hình danh ty lang trung|C5|B|1|an|at:hinh s1.2|Xem xét án từ các nơi gửi lên.
thamhinh|Thẩm hình ty viên ngoại|T5|B|1|an|at:hinh s1.3|Duyệt án tử hình trước khi tâu vua.
dethuy|Đô thủy ty lang trung|C5|B|1|kinh|at:cong s1.1|Lo đê điều, kênh mương.
tuongtac|Tướng tác giám đại sứ|T6|B|1|kinh|at:cong s1.4|Coi xưởng thợ của triều đình.
#Đô sát viện và lục khoa
dongusu|Tả đô ngự sử|C2|K|1|giam|tri95 eq70|Đứng đầu Đô sát viện, ai cũng kiêng nể.
phodongu|Tả phó đô ngự sử|C3|K|2|giam|tri86 eq62|Phó quan Đô sát viện.
thiemdongu|Thiêm đô ngự sử|C4|K|2|giam|tri78 eq58|Giúp việc đàn hặc quan lại.
ngusu|Giám sát ngự sử|C7|P|2|giam|tri62 eq40|Đàn hặc quan lại một đạo. Được nghe phong thanh tấu sự.
tuanan|Tuần án ngự sử|C6|P|1|giam|tri70 eq48 s.6|Đi tuần xét tình hình quan lại một tỉnh.
capsu|Cấp sự trung|C6|B|1|giam|tri72 eq50|Phong bác chiếu chỉ, giám sát một bộ.
kinhluich|Kinh lịch Đô sát viện|C8|K|2|giam||Giữ hồ sơ cho Đô sát viện.
dosu|Đô sự Đô sát viện|C9|K|3|giam||Chép sổ, thu nhận đơn tố cáo.
#Hàn lâm viện
hanlamhs|Hàn lâm học sĩ|C5|K|2|kinh|tri80 mi45|Đứng đầu Hàn lâm viện, soạn văn cho triều đình.
thigiang|Hàn lâm thị giảng|T5|K|2|hoc|tri85 mi50|Giảng sách cho Thái tử.
thidoc|Hàn lâm thị độc|T6|K|2|kinh|tri76 mi45|Đọc sách, giảng kinh cho vua.
tusoan|Tu soạn|C6|K|4|kinh|tri72|Soạn thảo văn thư, sử sách.
bientu|Hàn lâm biên tu|C7|K|5|kinh|tri70|Soạn sử, thảo văn thư cho triều đình. Gần vua, lương thấp.
kiemthao|Kiểm thảo|T7|K|4|kinh|tri66|Hiệu chính sách vở, hầu bút nghiên.
thucat|Thứ cát sĩ|C8|K|6|hoc|tri64|Tiến sĩ mới đỗ học việc ở viện.
tongtai|Tổng tài quốc sử quán|C3|K|1|kinh|tri90 mi55 m1.1|Đứng đầu việc chép quốc sử.
toantu|Toản tu quốc sử|C6|K|3|kinh|tri74|Chép sử của triều đại.
bienson|Biên soạn quốc sử|C8|K|4|kinh|tri62 m.9|Biên soạn tư liệu cho sử quan.
kinhdien|Kinh diên giảng quan|C4|K|2|hoc|tri88 mi50|Giảng kinh sử trước mặt nhà vua.
thaitutk|Thái tử tân khách|C4|K|2|hoc|tri80 eq60|Hầu bên Thái tử, làm bạn học.
#Quốc tử giám và học chính
tetuu|Tế tửu Quốc tử giám|T4|K|1|hoc|tri88|Đứng đầu trường học cao nhất của triều đình.
tunghiep|Tư nghiệp Quốc tử giám|C6|K|2|hoc|tri78|Phó quan Quốc tử giám.
bacsi|Bác sĩ Quốc tử giám|T7|K|3|hoc|tri70|Giảng một kinh trong Quốc tử giám.
trogiao|Trợ giáo|T8|K|4|hoc|tri62|Phụ giảng, chấm bài cho giám sinh.
giamthua|Giám thừa|C9|K|2|hoc||Coi sổ sách, kỷ luật giám sinh.
doche|Đề học sứ|T4|P|1|hoc|tri80|Coi việc học, kỳ thi của cả tỉnh.
giaodu|Giáo dụ phủ học|C8|F|1|hoc|tri60|Đứng đầu phủ học.
huandao|Huấn đạo huyện học|C9|H|1|hoc|tri50|Dạy dỗ sinh đồ trong huyện.
hocchinh|Học chính châu|T9|C|1|hoc|tri52|Dạy học trò trong châu.
#Các tự, viện, giám trong triều
thieukhanh|Thiếu khanh tự|C4|K|3|kinh|tri78 eq60|Phó quan ở Đại lý tự, Thái thường tự.
dailykhanh|Đại lý tự khanh|C3|K|1|an|tri88 eq64|Đứng đầu cơ quan xét lại án lớn.
dailythua|Đại lý tự thừa|T6|K|2|an|tri72 eq50|Xét lại án oan sai.
binhsu|Đại lý tự bình sự|C8|K|4|an|tri62|Duyệt lại các bản án.
thuongkhanh|Thái thường tự khanh|T3|K|1|kinh|tri84 eq66|Coi việc cúng tế, nhã nhạc.
thuongthua|Thái thường tự thừa|T6|K|2|kinh|tri70|Giúp việc tế lễ.
thaichuc|Thái chúc|C8|K|3|kinh|tri60|Đọc văn cúng trong lễ lớn.
hiepluat|Hiệp luật lang|C8|K|2|kinh|tri60 mi45|Giữ việc nhã nhạc, định âm luật.
quangloc|Quang lộc tự khanh|T3|K|1|kinh|tri82 eq66|Lo yến tiệc, đồ lễ của triều đình.
quanglocthua|Quang lộc tự thừa|T6|K|2|kinh|tri68|Coi bếp núc, rượu của hoàng cung.
honglo|Hồng lô tự khanh|T4|K|1|kinh|tri80 eq66|Dẫn sứ thần, tổ chức nghi lễ ngoại giao.
tuban|Tự ban|C8|K|3|kinh|tri58 mi45|Hướng dẫn quan viên trong lễ chầu.
minhtan|Minh tán|C9|K|3|kinh|mi50|Xướng danh trong nghi lễ triều đình.
thaibok|Thái bộc tự khanh|T4|K|1|kinh|tri78 eq62|Coi ngựa, xe của nhà vua.
thongchinh|Thông chính sứ|T3|K|1|kinh|tri86 eq68|Nhận, chuyển tấu sớ vào trong cung.
thongchinhpho|Thông chính phó sứ|T4|K|2|kinh|tri78 eq62|Giúp việc nhận tấu sớ.
vienphan|Thái y viện sứ|C5|K|1|an|tri80 mi45|Đứng đầu việc thuốc men trong cung.
vienphan2|Thái y viện phán|C6|K|2|an|tri72|Bắt mạch cho hoàng thân quốc thích.
ngyy|Ngự y|C8|K|4|an|tri62|Khám bệnh cho vua và hậu cung.
yhoc|Y chính|T9|K|4|an|tri55|Chế thuốc, giúp việc ở Thái y viện.
khamthien|Khâm thiên giám giám chính|C5|K|1|kinh|tri82|Xem thiên văn, soạn lịch cho cả nước.
khamthien2|Khâm thiên giám giám phó|C6|K|2|kinh|tri72|Giúp việc xem thiên văn, soạn lịch.
linhdai|Linh đài lang|C8|K|2|kinh|tri62|Quan sát tinh tượng ngày đêm.
ngquan|Ngũ quan chính|C9|K|3|kinh|tri55|Chọn ngày giờ tốt xấu cho triều đình.
#Kinh đô
kinhtrieu|Kinh triệu doãn|C3|P|1|dan|at:thien_kinh tri86 eq72 s1.5|Cai trị phủ kinh đô, dân đông quan lắm.
kinhtrieu2|Kinh triệu thiếu doãn|T4|P|1|dan|at:thien_kinh tri78 eq66 s1.3|Phó của Kinh triệu doãn.
ngthanh|Ngũ thành chỉ huy|T6|P|2|an|at:thien_kinh tri66 eq56 vo45 s1.2|Giữ trị an năm thành của kinh đô.
ngthanh2|Ngũ thành tuần kiểm|C9|P|4|an|at:thien_kinh vo40 s1.2|Tuần phố, bắt trộm cắp trong kinh.
kinhthi|Kinh thành thị lệnh|C8|P|2|thue|at:thien_kinh tri58 eq52 s1.7|Quản chợ búa, thuế buôn bán ở kinh.
#Tỉnh
tongdoc|Tổng đốc|C2|P|1|dan|at:nhan_mon,hoai_thuy,ngoc_mon tri90 eq80 vo50 m1.15 s1.6|Trấn giữ mấy tỉnh, nắm cả binh lẫn dân.
tuanphu|Tuần phủ|T2|P|1|dan|tri88 eq76 m1.1 s1.5|Đứng đầu một tỉnh, dưới quyền Tổng đốc.
bochinh|Bố chính sứ|T3|P|1|thue|tri82 eq70 m1.1 s1.7|Nắm tài chính, dân chính một tỉnh.
ansat|Án sát sứ|C3|P|1|an|tri82 eq60 s1|Nắm hình án một tỉnh.
thamchinh|Tham chính|T4|P|2|dan|tri76 eq66 s1.3|Giúp Bố chính sứ lo dân chính.
thamnghi|Tham nghị|C5|P|2|dan|tri70 eq60 s1.2|Bàn bạc việc dân với Bố chính sứ.
anphosu|Án sát phó sứ|C4|P|1|an|tri76 eq58 s1|Phó của Án sát sứ.
thiemsu|Thiêm sự án sát|C5|P|2|an|tri68 eq54 s1|Đi xét án ở các phủ huyện.
kinhluichsd|Kinh lịch ty kinh lịch|C8|P|1|dan||Giữ văn thư của tỉnh.
dosubo|Bố chính ty đô sự|C9|P|2|dan||Chép sổ sách ở nha tỉnh.
chieuma|Chiếu ma|T9|P|2|dan||Đăng ký, đóng dấu công văn tỉnh.
diemvan|Đề cử diêm vận ty|T4|P|1|thue|tri70 eq64 m1.05 s2.2|Nắm việc muối. Lợi lớn, kẻ dòm ngó cũng nhiều.
diemlai|Diêm đại sứ|C8|P|2|thue|tri52 eq50 s2|Thu thuế muối ở ruộng muối.
thuyly|Thủy lợi sứ|T5|P|1|dan|tri68 eq56 s1.1|Lo đê điều, mương máng cả tỉnh.
machinh|Mã chính ty|T5|P|1|kinh|tri64 vo40|Nuôi ngựa cho trạm và quân đội.
tramvan|Trạm vận sứ|C7|P|1|dan|tri56 eq50 s1.2|Lo trạm dịch, vận chuyển công văn.
yhocdd|Y học đề điểm|T6|P|1|an|tri66|Coi việc thuốc men và thầy thuốc trong tỉnh.
amduong|Âm dương học chính thuật|C9|P|1|kinh|tri50|Chọn ngày giờ, coi phong thủy cho nha tỉnh.
thuetinh|Thuế vụ sứ|C5|P|1|thue|tri66 eq62 s1.8|Thu thuế các loại trong tỉnh.
#Phủ
triphu|Tri phủ|T4|F|1|dan|tri75 eq65 m1.1 s1.6|Cai trị một phủ, dưới tay mấy chục huyện.
dongtriphu|Đồng tri phủ|C5|F|1|dan|tri68 eq58 s1.3|Phó của Tri phủ.
thongphan|Thông phán phủ|C6|F|1|an|tri62 eq55 s1.1|Lo hình án, lương thảo cấp phủ.
suyquan|Suy quan|C7|F|1|an|tri58 eq50 s1.1|Xét xử án hình trong phủ.
kinhluichphu|Kinh lịch phủ|C8|F|1|dan||Giữ văn thư của phủ.
trisu|Tri sự phủ|T9|F|2|dan||Coi hồ sơ, sổ sách của phủ.
yhocphu|Y học phủ huấn khoa|T9|F|1|an||Dạy nghề thuốc, chữa bệnh cho dân trong phủ.
amduongphu|Âm dương huấn thuật|T9|F|1|kinh||Xem ngày cho dân trong phủ.
tangcuong|Tăng cương phủ|T9|F|1|kinh||Lo việc chùa chiền trong phủ.
#Châu
trichau|Tri châu|T5|C|1|dan|tri68 eq60 m1.05 s1.5|Cai trị một châu.
dongtrichau|Đồng tri châu|T6|C|1|dan|tri62 eq54 s1.3|Phó của Tri châu.
chauphan|Châu phán|T7|C|1|an|tri56 eq50 s1.2|Coi án và tuần phòng trong châu.
laimuc|Lại mục châu|T9|C|2|dan||Giữ sổ hộ khẩu, ruộng đất của châu.
#Huyện
trihuyen|Tri huyện|C7|H|1|dan|tri58 eq50 m1.05 s1.5|Phụ mẫu chi quan, nắm cả việc dân, thuế, án.
huyenthua|Huyện thừa|C8|H|1|dan|tri52 eq45 s1.1|Phó quan huyện, lo lương thực, hộ tịch.
chubo|Chủ bộ|C9|H|1|dan|tri46 eq42|Giữ sổ sách của huyện.
dienSu|Điển sử|T9|H|1|an|tri40 vo40|Coi ngục, bắt trộm cướp trong huyện.
dichthua|Dịch thừa|T9|H|1|dan|tri40 eq40 s.8|Coi trạm dịch, đón đưa quan khách.
hobac|Hà bạc sở đại sứ|C8|H|1|thue|tri45 eq50 s1.6|Thu thuế bến sông, chợ cá. Béo bở, dễ bị dòm ngó.
tuankiem|Tuần kiểm ty tuần kiểm|T9|H|1|an|vo45 tri38 s1.3|Giữ bến đò, cửa ải nhỏ trong huyện.
thuehuyen|Thuế đại sứ|T9|H|1|thue|tri42 eq46 s1.8|Thu thuế chợ, thuế đò trong huyện.
yhochuyen|Y học huấn khoa huyện|T9|H|1|an|tri44|Chữa bệnh cho dân, coi hiệu thuốc huyện.
#Ải biên giới
quanai|Quan ải lệnh|C6|A|1|an|tri68 eq56 vo50 s1.5|Coi cửa ải, xét giấy thông hành.
thongquan|Thông quan phán sự|T7|A|2|an|tri58 eq50 s1.3|Kiểm hàng hóa qua ải.
mauDich|Hỗ thị mậu dịch sứ|T5|A|1|thue|tri70 eq64 s2.2|Quản chợ trao đổi với các nước ngoài ải. Lợi lớn.
dichquan|Dịch quán sứ|C8|A|1|kinh|tri56 eq52 s1|Coi nhà trọ cho sứ giả, thương nhân.
luongdai|Lương đài sứ|T7|A|1|thue|tri56 eq54 s1.4|Coi kho lương nuôi quân biên ải.
#Cảng
thibac|Thị bạc đề cử|C5|G|1|thue|tri70 eq66 s2.4|Quản thuyền buôn ngoại quốc ra vào cảng. Béo bở bậc nhất.
thibacpho|Thị bạc phó đề cử|T6|G|1|thue|tri62 eq60 s2|Giúp Thị bạc đề cử việc thuế thuyền.
thibacsu|Thị bạc đại sứ|C8|G|3|thue|tri50 eq52 s2|Kiểm hàng, đánh thuế thuyền buôn.
haiquan|Hải quan thuế sứ|T7|G|2|thue|tri54 eq52 s1.9|Thu thuế hải quan, chống buôn lậu.
thongsu|Thông sự|T9|G|4|dan|mi45 eq45 s1.2|Thông dịch cho thuyền buôn nước ngoài.
`);

/* ---------- xây bảng ---------- */
const TAGM={hoc:[.95,.2],an:[1,1],dan:[1.05,1.4],thue:[1,1.6],giam:[1,.3],kinh:[1,.8],vo:[1,.6]};
const STK=['tri','vo','suc','mi','eq'];
function parseRow(line,g){
  const f=line.split('|');if(f.length<8)return null;
  const [id,n,ph,sc,k,tag,ex,d]=f;
  const ch=ph[0]==='C'?1:0,num=+ph.slice(1),r=9-num;
  const b=r*2+ch;
  const T={n,r,sg:ch,sc,k:+k,tag,g,d,req:{},mul:1,side:1,at:null};
  const dm=TAGM[tag]||[1,1];T.mul=dm[0]*(ch?1:.93);T.side=dm[1];
  // chỉ số mặc định theo bậc
  if(tag==='vo'){T.req={vo:Math.round(32+b*2.2)}}
  else{
    let tri=Math.round(36+b*3.9)+(tag==='hoc'?6:0)+(tag==='kinh'?2:0);
    let eq=Math.round(30+b*3.4)-(tag==='hoc'?15:0)-(tag==='giam'?8:0)+(tag==='thue'?4:0)+(tag==='dan'?2:0);
    T.req={tri:Math.min(120,tri),eq:Math.max(0,eq)};if(!T.req.eq)delete T.req.eq}
  (ex||'').split(/\s+/).filter(Boolean).forEach(tk=>{
    let m;
    if((m=tk.match(/^(tri|vo|suc|mi|eq)(\d+)$/)))T.req[m[1]]=+m[2];
    else if((m=tk.match(/^m([\d.]+)$/)))T.mul=+m[1];
    else if((m=tk.match(/^s([\d.]+)$/)))T.side=+m[1];
    else if((m=tk.match(/^ar(\d)$/)))T.ar=+m[1];
    else if(tk.startsWith('at:'))T.at=tk.slice(3).split(',')});
  return {id,T};
}
D.build64=function(){
  const OF=D.OFFICES;
  const legacyOld={};for(const id in OF)legacyOld[id]=OF[id];
  D.ROWS64.forEach(blk=>{
    let g='';
    blk.split('\n').forEach(line=>{
      line=line.trim();if(!line)return;
      if(line[0]==='#'){g=line.slice(1).trim();return}
      const o=parseRow(line,g);if(!o)return;
      const T=o.T;
      if(T.ar!=null){T.mil=1;T.tag='vo'}
      if(T.at){T.units=(T.sc==='B'?T.at.map(x=>'B:'+x):T.sc==='P'?T.at.map(x=>'P:'+x):T.sc==='A'?T.at.map(x=>'A:'+x):T.at.map(x=>T.sc+':'+x)).filter(u=>UNITS[u])}
      else T.units=D.UNIT_LIST[T.sc].slice();
      OF[o.id]=Object.assign({},legacyOld[o.id]||{},T);
    })});
  /* các chức cũ giữ nguyên id để save cũ còn đọc được */
  D.OFFICE_IDS=Object.keys(OF);
};
D.seatKeys=function(tid){
  const T=D.OFFICES[tid];if(!T||!T.units)return [];
  const out=[];T.units.forEach(u=>{for(let i=0;i<T.k;i++)out.push(`${tid}|${u}|${i}`)});return out;
};
/* tên đầy đủ của ghế */
D.seatLabel=function(key){
  const parts=String(key).split('|');const T=D.OFFICES[parts[0]];if(!T)return key;
  if(parts.length<3)return T.n;
  const U=UNITS[parts[1]];if(!U)return T.n;
  const idx=+parts[2];let s=T.n;
  if(U.t==='B')s+=' '+U.n;
  else if(U.t==='P')s+=' '+U.n;
  else if(U.t==='F'||U.t==='C'||U.t==='H'){
    const w=U.t==='F'?'phủ':U.t==='C'?'châu':'huyện';
    s+=T.n.toLowerCase().includes(w)?' '+U.n:` ${w} ${U.n}`}
  else if(U.t==='A')s+=T.n.toLowerCase().includes('ải')?' '+U.n:' ải '+U.n;
  else if(U.t==='G')s+=T.n.toLowerCase().includes('cảng')?' '+U.n:' cảng '+U.n;
  if(T.k>1)s+=` (${idx+1})`;
  return s;
};
/* nơi của ghế: {p: tỉnh, u: đơn vị, grp: nhóm dùng để hồi tị} */
D.seatWhere=function(key){
  const parts=String(key).split('|');const T=D.OFFICES[parts[0]];
  if(!T||parts.length<3)return null;
  const U=UNITS[parts[1]];if(!U)return null;
  const local=['P','F','C','H','A','G'].includes(U.t);
  return {p:U.p,u:U.k,t:U.t,local,grp:U.t==='K'?'K:'+(T.g||parts[0]):U.k,unit:U.n};
};
})();
