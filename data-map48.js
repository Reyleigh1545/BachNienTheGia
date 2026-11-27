/* Bách Niên Thế Gia · 7.0.0-d.1.5.49 · BẢN ĐỒ 48 KHU (chủ dự án duyệt 27/11; danh sách ở CLAUDE.md mục 12). Nạp ngay sau data.js.
   Năm nước: Đại Nguyễn (trieu) ở giữa và bốn tiểu quốc mỗi vực một nước. Nước nhỏ cũ không còn đất (thành thế lực ở đợt sau).
   Mỗi khu: vuc (nhóm trên bản đồ), r (khí hậu, giữ như cũ), dh (địa hình), vt (vị thế), dt (nghìn dặm vuông), x,y (hình vẽ 900×700). D.ROADS: đường nối, dặm; phần tử thứ tư = 1 là đường biển. */
(function(){
const D=window.D,P=D.PROV;
/* id|tên|vuc|r|nat|k|x|y|dh|vt|dt|mô tả|giá (hàng:hệ số) */
const T=`
thien_kinh|Thiên Kinh|trung|trung|trieu|kinh|450|345|dongbang song|kinh|14||
thuan_an|Thuận An|trung|trung|trieu|lang|502|322|dongbang song|satkinh|12|Vùng ven sông sát kinh, ruộng tốt, thuyền gạo ngược xuôi.|lua:.95 to:1.05
van_linh|Vân Lĩnh|trung|trung|trieu|lang|408|300|nui rung|satkinh|16|Dãy núi chắn phía tây bắc kinh thành, nhiều chùa và thợ săn.|go:.85 duoc:.95
binh_ho|Bình Hồ|trung|trung|trieu|lang|408|398|ho dongbang|gankinh|18|Hồ lớn nhiều cá, ven hồ trồng lúa.|lua:.9 muoi:1.05
truong_chau|Trường Châu|trung|trung|trieu|phu|372|352|dongbang|gankinh|20|Ngã ba đường lớn, chợ và quán trọ san sát.|to:.95 gom:.95
lac_giang|Lạc Giang|trung|trung|trieu|lang|515|368|dongbang song|gankinh|24||
hoai_thuy|Hoài Thủy|trung|trung|trieu|phu|440|450|song dongbang|noidia|26||
thanh_trach|Thanh Trạch|trung|trung|trieu|lang|372|438|dam song|noidia|18|Đầm lầy mênh mông, lau sậy, đường sá khó đi.|duoc:.95 go:1.1
hai_khau|Hải Khẩu|trung|trung|trieu|cang|560|428|bien song|duyenhai|16||
dong_lai|Đông Lai|trung|trung|trieu|lang|585|382|bien nui|duyenhai|20|Bờ biển nhiều đồi, làng chài và ruộng bậc thấp.|muoi:.85 traichau:.95
phong_duong|Phong Dương|trung|trung|trieu|lang|448|246|nui rung|giapbien|28|Đồi rừng giáp biên bắc, đồn trại nhiều.|go:.85 sat:1
nhan_mon|Nhạn Môn quan|trung|bac|trieu|bien|448|188|nui|biencuong|22||
an_tay|An Tây|trung|trung|trieu|lang|300|330|nui dongbang|giapbien|30|Đồi khô phía tây, trồng bông và nuôi ngựa thồ.|bong:.9 ngua:.9
ngoc_mon|Ngọc Môn quan|trung|tay|trieu|bien|232|318|samac nui|biencuong|26||
nam_quan|Nam Quan|trung|nam|trieu|bien|405|505|nui rung song|biencuong|24|Ải phía nam giữa núi rừng, đường độc đạo sang tiểu quốc Nam.|duoc:.9 go:.85
son_ha|Sơn Hà|trung|trung|trieu|phu|300|405|nui rung|xa|34||
soc_do|Sóc Đô|bac|bac|lang_bo|kinh|480|78|thao song|kinhnc|20|Kinh đô tiểu quốc Bắc trong thung lũng sông giữa thảo nguyên.|ngua:.9 to:1.2 lua:1.2
ma_truong|Mã Trường|bac|bac|lang_bo|lang|520|128|thao|giapdn|60||
thiet_son|Thiết Sơn|bac|bac|lang_bo|lang|372|132|nui rung|giapdn|44||
bach_hoa|Bạch Hoa Nguyên|bac|bac|lang_bo|lang|580|82|thao|gankinhnc|70|Đồng cỏ mênh mông, đàn gia súc theo mùa.|ngua:.85 che:1.2
han_giang|Hàn Giang|bac|bac|lang_bo|lang|392|78|song tuyet|noidia|38|Sông lạnh quanh năm, dân đánh cá dưới băng.|go:.9 lua:1.25
hac_lam|Hắc Lâm|bac|bac|lang_bo|lang|288|108|rung|xa|55|Rừng đen rậm rạp, thợ săn và da lông.|go:.75 duoc:.95
bang_ho|Băng Hồ|bac|bac|lang_bo|lang|308|46|ho tuyet|xa|30|Hồ đóng băng nửa năm.|muoi:1.1 lua:1.35
tuyet_linh|Tuyết Lĩnh|bac|bac|lang_bo|lang|438|28|tuyet nui thao|bienvien|66||
van_dao|Vân Đảo|dong|dong|van_dao|kinh|745|355|bien dao dongbang|kinhnc|22||
bach_sa|Bạch Sa|dong|dong|van_dao|cang|668|318|bien|giapdn|14||
lam_loan|Lam Loan|dong|dong|van_dao|cang|668|430|bien|giapdn|12|Vịnh kín gió, xưởng đóng thuyền.|go:1.05 muoi:.8
diem_dien|Diêm Điền|dong|dong|van_dao|lang|752|425|bien dongbang|gankinhnc|10||
phu_tang|Phù Tang Lĩnh|dong|dong|van_dao|lang|808|312|dao nui rung bien|gankinhnc|18|Núi trên đảo, gỗ đóng thuyền.|go:.75 gom:1
trieu_trach|Triều Trạch|dong|dong|van_dao|lang|646|488|dam bien rung|noidia|16|Đầm nước lợ, rừng ngập mặn.|muoi:.75 duoc:1
thanh_ngu|Thanh Ngư Đảo|dong|dong|van_dao|lang|822|448|bien dao|xa|8|Quần đảo đánh cá.|muoi:.8 lua:1.3
hai_minh_ao|Hải Minh Đảo|dong|dong|van_dao|lang|858|530|bien dao|bienvien|9||
cam_thanh|Cẩm Thành|nam|nam|lam_quoc|kinh|470|650|song dongbang bien|kinhnc|24||
mia_chau|Mía Châu|nam|nam|lam_quoc|lang|420|622|song dongbang|gankinhnc|30||
lam_son|Lam Sơn|nam|nam|lam_quoc|lang|350|560|nui rung|giapdn|40||
duoc_coc|Dược Cốc|nam|nam|lam_quoc|lang|312|612|nui rung|noidia|18||
chuong_giang|Chướng Giang|nam|nam|lam_quoc|lang|450|568|song rung|giapdn|34|Sông chảy giữa rừng độc.|duoc:.85 go:.85
vu_trach|Vụ Trạch|nam|nam|lam_quoc|lang|372|668|dam|xa|28|Đầm lầy sương phủ quanh năm.|duoc:.9 lua:1.15
tuong_lam|Tượng Lâm|nam|nam|lam_quoc|lang|248|652|rung|xa|48|Rừng già, voi và gỗ quý.|go:.7 huong:.85
nam_hai|Nam Hải Nhai|nam|nam|lam_quoc|lang|546|662|bien nui|bienvien|20|Vách biển, thợ lặn mò ngọc trai.|traichau:.75 muoi:.85
sa_thanh|Sa Thành|tay|tay|sa_quoc|kinh|108|298|samac song|kinhnc|26||
luu_sa|Lưu Sa Trấn|tay|tay|sa_quoc|phu|168|250|samac|giapdn|36|Trạm lớn trên con đường tơ lụa.|to:.9 che:1.05 ngoc:.95
hong_nham|Hồng Nham|tay|tay|sa_quoc|lang|165|372|nui samac|giapdn|32|Hẻm núi đá đỏ, cướp hay mai phục.|sat:.95 ngoc:.95
thanh_tuyen|Thanh Tuyền|tay|tay|sa_quoc|lang|62|362|samac ho|gankinhnc|20||
lien_sa|Liên Sa|tay|tay|sa_quoc|phu|105|430|samac nui|noidia|28||
nguyet_ho|Nguyệt Hồ|tay|tay|sa_quoc|lang|60|228|ho samac|noidia|30|Hồ muối giữa sa mạc.|muoi:.55 lua:1.3
hoang_sa|Hoàng Sa|tay|tay|sa_quoc|lang|78|152|samac|xa|90|Biển cát, chỉ đoàn lạc đà mới qua được.|ngua:1.15 muoi:.9
thien_son|Thiên Sơn|tay|tay|sa_quoc|lang|170|92|nui tuyet|bienvien|46|Núi tuyết đầu nguồn.|duoc:.85 ngoc:.9
`;
const co={};
T.trim().split('\n').forEach(line=>{const f=line.split('|');const [id,n,vuc,r,nat,k,x,y,dh,vt,dt,mo,gia]=f;co[id]=1;
  const o=P[id]||{};o.n=n;o.vuc=vuc;o.r=o.r||r;o.nat=nat;o.k=o.k||k;o.x=+x;o.y=+y;o.dh=dh.split(' ');o.vt=vt;o.dt=+dt;if(mo)o.d=mo;
  if(!o.pm){o.pm={};(gia||'').split(' ').filter(Boolean).forEach(s=>{const [g,v]=s.split(':');o.pm[g]=+v})}P[id]=o});
/* đường nối: a-b dặm, b = đường biển */
D.ROADS=`thien_kinh-thuan_an 180|thien_kinh-van_linh 220|thien_kinh-binh_ho 340|thien_kinh-truong_chau 320|thien_kinh-lac_giang 300|thuan_an-lac_giang 260|thuan_an-phong_duong 480|van_linh-an_tay 520|van_linh-phong_duong 460|binh_ho-hoai_thuy 280|binh_ho-thanh_trach 300|truong_chau-hoai_thuy 350|truong_chau-an_tay 560|truong_chau-son_ha 620|lac_giang-hai_khau 380|lac_giang-dong_lai 420|hoai_thuy-hai_khau 440|hoai_thuy-nam_quan 600|thanh_trach-nam_quan 520|thanh_trach-son_ha 540|hai_khau-dong_lai 220|phong_duong-nhan_mon 400|an_tay-ngoc_mon 480|an_tay-son_ha 500|nhan_mon-ma_truong 520|nhan_mon-thiet_son 480|dong_lai-bach_sa 600b|hai_khau-lam_loan 700b|nam_quan-lam_son 450|nam_quan-chuong_giang 480|ngoc_mon-luu_sa 560|ngoc_mon-hong_nham 600|ma_truong-bach_hoa 420|ma_truong-soc_do 560|thiet_son-han_giang 430|thiet_son-hac_lam 520|soc_do-bach_hoa 300|soc_do-han_giang 320|han_giang-bang_ho 460|hac_lam-bang_ho 500|bang_ho-tuyet_linh 620|bach_hoa-tuyet_linh 700|bach_sa-van_dao 480b|bach_sa-trieu_trach 340|lam_loan-trieu_trach 300|lam_loan-van_dao 520b|van_dao-phu_tang 200|van_dao-diem_dien 260|diem_dien-thanh_ngu 380b|phu_tang-thanh_ngu 420b|thanh_ngu-hai_minh_ao 560b|lam_son-duoc_coc 320|lam_son-chuong_giang 360|chuong_giang-mia_chau 420|duoc_coc-mia_chau 380|mia_chau-cam_thanh 300|cam_thanh-nam_hai 440|duoc_coc-tuong_lam 480|tuong_lam-vu_trach 400|vu_trach-chuong_giang 460|nam_hai-trieu_trach 900b|luu_sa-sa_thanh 420|luu_sa-nguyet_ho 460|hong_nham-sa_thanh 480|hong_nham-lien_sa 520|sa_thanh-thanh_tuyen 300|thanh_tuyen-lien_sa 340|thanh_tuyen-nguyet_ho 380|nguyet_ho-hoang_sa 520|hoang_sa-thien_son 640|lien_sa-thien_son 700|bach_hoa-thien_son 1100`.split('|').map(s=>{const m=s.match(/^(\w+)-(\w+) (\d+)(b?)$/);return [m[1],m[2],+m[3],m[4]?1:0]});
D.ADJ={};D.ROADS.forEach(([a,b,d,s])=>{(D.ADJ[a]=D.ADJ[a]||[]).push([b,d,s]);(D.ADJ[b]=D.ADJ[b]||[]).push([a,d,s])});
/* đi đường: cả nhà đi bộ, xe 600 dặm một tháng, đường biển 900; núi, đầm, sa mạc chậm hơn; mùa đông đất tuyết, thảo nguyên chậm thêm */
D.roadCost=function(a,b,d,sea,mo){if(sea)return d/900;const A=P[a],B=P[b];const kho=t=>A.dh.includes(t)||B.dh.includes(t);let f=1;if(kho('nui')||kho('dam')||kho('samac'))f=1.25;
  if(mo!=null&&(mo===11||mo===12||mo<=2)&&(A.r==='bac'||B.r==='bac'))f*=1.3;return d*f/600};
/* đường ngắn nhất theo thời gian: trả về {thang, dam, di:[id...], bien} */
const MEMO={};
D.route=function(from,to,mo){const key=from+'>'+to+'>'+(mo==null?'':(mo===11||mo===12||mo<=2)?'d':'h');if(MEMO[key])return MEMO[key];
  const best={[from]:0},prev={},open=new Set(Object.keys(P));while(open.size){let u=null;for(const k of open)if(best[k]!=null&&(u===null||best[k]<best[u]))u=k;if(u===null||u===to)break;open.delete(u);
    for(const [v,d,s] of (D.ADJ[u]||[])){const c=best[u]+D.roadCost(u,v,d,s,mo);if(best[v]==null||c<best[v]){best[v]=c;prev[v]=u}}}
  if(best[to]==null)return null;const di=[to];let x=to;while(x!==from){x=prev[x];di.unshift(x)}let dam=0,bien=0;for(let i=1;i<di.length;i++){const e=D.ADJ[di[i-1]].find(z=>z[0]===di[i]);dam+=e[1];if(e[2])bien=1}
  return MEMO[key]={thang:best[to],dam,di,bien}};
/* địa hình theo nhóm, dùng cho sự kiện, nghề và thiên tai */
D.hasDH=(p,list)=>{const a=P[p]&&P[p].dh;return !!a&&list.some(t=>a.includes(t))};
/* biên giới giữa năm nước: [a, b, căng thẳng gốc, hiếu chiến, khu tiền tuyến của a, của b] */
D.BORDER.splice(0,D.BORDER.length,
  ['trieu','lang_bo',30,1.0,'nhan_mon','ma_truong'],
  ['trieu','sa_quoc',22,.7,'ngoc_mon','luu_sa'],
  ['trieu','van_dao',18,.55,'hai_khau','lam_loan'],
  ['trieu','lam_quoc',20,.65,'nam_quan','lam_son'],
  ['lang_bo','sa_quoc',26,.9,'bach_hoa','thien_son'],
  ['van_dao','lam_quoc',24,.75,'trieu_trach','nam_hai']);
})();
