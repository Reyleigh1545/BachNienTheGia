/* Bách Niên Thế Gia v6.7.10-d9.10 · giang hồ thành hệ thống (mục 12, đợt giang hồ): chức trong phái (hộ pháp, trưởng lão) kèm bổng và bổn phận, đại hội định kỳ mỗi 10 năm, sự kiện theo tiếng tăm (thách đấu, mời kết giao, tên vang). Cờ: c.flags.ghc (hophap, truonglao), c.flags.gh (cấp trong phái), bậc nghề c.lv theo võ lực và danh vọng. Chiến tranh giữa phái chạy theo năm ở engine (ghYear, S.wr.gwar). */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const N=c=>esc(c.given);
const rk=c=>(c.flags&&c.flags.gh)||0;
const sects=()=>(S().wr&&S().wr.sects)||[];
const sectOf=c=>{const id=c.flags&&c.flags.ghs;return sects().find(s=>s.id===id)||null};
const GJ=o=>Object.assign({tags:{},k:'Giang hồ',job:['hiep'],age:[16,75],pcd:60,cd:24,w:1,ms:1},o);
return [
GJ({id:'gh_phong_chuc',t:'Chưởng môn phong chức Hộ pháp',c:c=>rk(c)>=2&&c.lv>=1&&!(c.flags.ghc)&&!!sectOf(c),once:1,
 x:c=>{const s=sectOf(c);return `Tiếng tăm của ${N(c)} đã vang trong và ngoài ${esc(s.n)}. Chưởng môn muốn phong làm Hộ pháp: có bổng hằng tháng, đổi lại phải giữ cửa ải và gánh việc phái khi cần.`},
 o:c=>[{l:'Nhận chức Hộ pháp',f:c=>{c.flags.ghc='hophap';return 'Lễ phong chức làm giữa sân phái. Từ nay có bổng, cũng có bổn phận.'+fx(c,{fame:R(6,12),eq:1,tam:5})}},
  {l:'Từ chối, giữ thân tự do',f:c=>'Chưởng môn gật đầu tiếc nuối. Ngươi vẫn là đệ tử, đi lại tự do.'+fx(c,{tam:2,fame:2})}]}),
GJ({id:'gh_len_truong_lao',t:'Lên làm Trưởng lão',c:c=>c.flags.ghc==='hophap'&&c.lv>=2&&rk(c)>=3&&!!sectOf(c),once:1,
 x:c=>{const s=sectOf(c);return `Trưởng lão ${esc(s.n)} qua đời, ghế bỏ trống. Các Hộ pháp ngầm so tài đức. ${N(c)} đủ tiếng tăm để tranh.`},
 o:c=>[{l:'Ra tranh ghế Trưởng lão',r:[{vo:0.8,eq:0.8,tri:0.5},50],y:c=>{c.flags.ghc='truonglao';return 'Các huynh đệ phục tài đức. Ngươi lên Trưởng lão, bổng tăng nhiều.'+fx(c,{fame:R(10,20),eq:2,tam:6})},n:c=>'Thua một Hộ pháp khác, mất mặt trước anh em.'+fx(c,{fame:-5,tam:-6})},
  {l:'Nhường người khác, ở lại làm Hộ pháp',f:c=>'Anh em kính cái đức biết lùi của ngươi.'+fx(c,{fame:R(3,6),eq:1,tam:3})}]}),
GJ({id:'gh_bon_phan',t:'Bổn phận hằng năm của chức vụ',c:c=>!!c.flags.ghc&&!!sectOf(c),pcd:36,cd:36,w:0.8,
 x:c=>{const s=sectOf(c);const t=c.flags.ghc==='truonglao'?'Trưởng lão':'Hộ pháp';return `Với chức ${t} của ${esc(s.n)}, năm nay ${N(c)} phải lo việc phái: trấn một cửa ải, truyền dạy lớp đệ tử mới, hay đi đòi lại món nợ cũ của phái.`},
 o:c=>[{l:'Trấn giữ cửa ải',f:c=>'Một năm canh giữ vất vả nhưng yên ổn. Phái giữ được địa bàn.'+fx(c,{fame:R(2,5),suc:-R(2,5),tam:-2})},
  {l:'Truyền dạy lớp đệ tử mới',f:c=>{const s=sectOf(c);if(s)s.pow=Math.min(100,(s.pow||50)+1);return 'Mấy chục đệ tử mới nhập môn học theo ngươi. Phái thêm người.'+fx(c,{fame:R(3,6),eq:1,tri:1,tam:3})}},
  {l:'Đi đòi nợ cũ của phái',r:[{vo:1,muu:0.4},55],y:c=>'Thu lại được món nợ, phái có tiền sửa sơn môn.'+fx(c,{fame:R(4,8),money:m(R(4,8)),suc:-R(2,6)}),n:c=>'Con nợ chống cự, ngươi bị thương, về tay không.'+fx(c,{fame:-3,suc:-R(8,14),tam:-4})},
  {l:'Xin thôi chức, về làm đệ tử thường',f:c=>{delete c.flags.ghc;return 'Chưởng môn chấp thuận. Ngươi nhẹ người nhưng mất bổng.'+fx(c,{tam:2})}}]}),
GJ({id:'gh_hoi_dinh_ky',t:'Đại hội anh hùng mười năm một lần',fixed:1,
 x:c=>`Mười năm một lần, các môn phái họp đại hội trên núi lớn. Thiệp mời gửi tới ${N(c)}, ai có tiếng đều được mời so tài và luận võ.`,
 o:c=>[{l:'Lên đài so tài',r:[{vo:1.2,suc:0.4},Math.min(70,35+c.lv*12)],y:c=>{return 'Thắng liền mấy trận, tên ngươi vang khắp đại hội.'+fx(c,{vo:R(2,5),fame:R(10,25),tam:6,suc:-R(3,8)})},n:c=>'Gục ngay vòng giữa, nằm dưỡng thương cả tháng.'+fx(c,{fame:-3,suc:-R(8,16),tam:-5})},
  {l:'Chỉ dự luận võ, kết giao bạn bè',f:c=>'Nghe nhiều, quen thêm vài người đáng nể.'+fx(c,{fame:R(3,7),eq:1,tri:1,tam:3})},
  {l:'Cáo bệnh, không đi',f:c=>'Người ta bàn tán ít ngày rồi thôi.'+fx(c,{fame:-1})}]}),
GJ({id:'gh_thach_dau',t:'Kẻ lạ thách đấu',c:c=>c.fame>=100&&c.vo>=100,pcd:48,cd:36,w:0.9,
 x:c=>`Tiếng tăm ${N(c)} đã đến tai một cao thủ vùng khác. Ông ta tìm tới tận nơi, ôm quyền xin tỉ thí một trận, không thù oán, chỉ để thử.`,
 o:c=>[{l:'Nhận lời tỉ thí',r:[{vo:1.2,suc:0.4,tri:0.3},55],y:c=>'Hơn trăm hiệp, thắng sát nút. Người kia nể phục, tiếng ngươi lan xa.'+fx(c,{vo:R(2,4),fame:R(8,16),tam:6,suc:-R(2,6)}),n:c=>'Thua nửa chiêu, nhưng được khen là đối thủ đáng gờm. Ngươi thêm hiểu biết.'+fx(c,{vo:R(1,3),fame:R(1,4),suc:-R(6,12),tam:-3})},
  {l:'Từ chối khéo, mời rượu thay tỉ thí',f:c=>'Hai người ngồi uống cả đêm, nói chuyện võ.'+fx(c,{eq:1,fame:R(2,4),tam:3})}]}),
GJ({id:'gh_moi_ket_giao',t:'Mời kết giao',c:c=>c.fame>=300&&c.lv>=1,pcd:60,cd:48,w:0.8,
 x:c=>`Một vị chủ nhà giàu có trong vùng gửi thiệp mời ${N(c)} đến phủ, ngỏ ý kết bạn và nhờ ngươi làm khách quý, đổi lại sẵn lòng giúp bạc khi cần.`,
 o:c=>[{l:'Nhận lời kết giao',f:c=>'Hai bên uống chén rượu kết bạn. Từ nay có chỗ nghỉ chân và ít bạc lộ phí.'+fx(c,{fame:R(4,8),money:m(R(4,8)),eq:1,tam:4})},
  {l:'Từ chối, giữ thân phận hiệp khách',f:c=>'Vị chủ nhà tiếc nhưng càng nể. Tiếng ngươi thanh cao thêm một bậc.'+fx(c,{fame:R(6,12),tam:2})}]}),
GJ({id:'gh_ten_vang',t:'Tên vang khắp giang hồ',c:c=>c.lv>=2&&c.fame>=700,once:1,pcd:200,
 x:c=>`Đi tới đâu cũng có người chỉ trỏ: "Kia là ${N(c)}". Người đời kể chuyện ngươi trong quán trà, dạy con nhỏ lấy ngươi làm gương. Có kẻ kính, có kẻ muốn thử tài, cũng có kẻ ngầm ghi hận.`,
 o:c=>[{l:'Giữ khiêm nhường, ít xuất hiện',f:c=>'Càng ẩn, người càng kính. Tiếng ngươi bền hơn tiếng ồn ào.'+fx(c,{fame:R(10,20),eq:2,tam:5})},
  {l:'Thu nhận môn đồ, mở phái riêng nhỏ',f:c=>'Mấy chục người nhập môn. Giang hồ thêm một ngọn cờ mới.'+fx(c,{fame:R(15,30),eq:1,money:-m(2),tam:6})},
  {l:'Mặc người đời nói, vẫn như cũ',f:c=>'Ngươi vẫn đi giữa chợ, không đổi.'+fx(c,{tam:3})}]})
];
});
