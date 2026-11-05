/* Bách Niên Thế Gia v4 · kỳ ngộ vượt giới hạn
   Rèn luyện dừng ở 100. Chỉ những kỳ ngộ hiếm dưới đây (và mốc đột phá) mới đẩy chỉ số lên quá 100, tối đa 150. */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const m=v=>G.mm(v);
const N=c=>esc(c.given);
const V=o=>Object.assign({k:'Kỳ ngộ hiếm',w:0.45,pcd:96,cd:18,good:1},o);
return [
/* trí tuệ */
V({id:'vv_tri_tang_kinh',t:'Tàng kinh các trên núi',age:[16,80],c:c=>c.tri>=100,
 x:c=>`Một lão tăng mời ${N(c)} vào tàng kinh các của ngôi chùa cổ, nơi cất giữ những bộ sách đã thất truyền ngoài đời.`,
 o:[{l:'Ở lại ba tháng đọc sách',r:[{tri:1,eq:0.3},96],y:c=>'Đọc đến đâu ngộ đến đấy.'+fx(c,{tri:R(3,6),over:1}),yy:c=>'Một đêm chợt hiểu thấu đạo trời đất.'+fx(c,{tri:R(7,12),over:1,fame:15}),n:c=>'Đọc mãi không thấm, chỉ thêm mỏi mắt.'+fx(c,{tri:1,over:1,suc:-5})},
    {l:'Chép lại vài bộ mang về',f:c=>'Thư phòng nhà thêm sách quý.'+fx(c,{tri:R(1,2),over:1})}]}),
V({id:'vv_tri_co_tran',t:'Ván cờ với ẩn sĩ',age:[16,80],c:c=>c.tri>=100,
 x:c=>`Bên bờ suối, một ông già bày thế cờ tàn, bảo ai giải được sẽ truyền một điều.`,
 o:[{l:'Ngồi giải cờ',r:[{tri:1},100],y:c=>'Giải được! Ông già truyền cho một cuốn binh thư.'+fx(c,{tri:R(4,8),over:1}),n:c=>'Ngồi ba ngày ba đêm vẫn không giải nổi.'+fx(c,{tri:1,over:1,tam:-3})},
    {l:'Đứng xem rồi đi',f:c=>''}]}),
V({id:'vv_tri_bien_luan',t:'Đại hội biện luận',age:[20,80],c:c=>c.tri>=100&&c.fame>=50,
 x:c=>`Các danh nho thiên hạ hội về kinh biện luận. ${N(c)} được mời.`,
 o:[{l:'Lên đài biện luận',r:[{tri:1,eq:0.4},102],y:c=>'Áp đảo cả hội trường.'+fx(c,{tri:R(3,6),over:1,fame:R(20,40)}),n:c=>'Thua một trận, nhưng học được nhiều.'+fx(c,{tri:R(1,3),over:1})},
    {l:'Ngồi dưới nghe',f:c=>fx(c,{tri:1,over:1})}]}),
/* võ lực */
V({id:'vv_vo_tham_tham',t:'Hang sâu trong vực',age:[16,70],c:c=>c.vo>=100,
 x:c=>`Đuổi theo một con vượn trắng, ${N(c)} lạc xuống đáy vực. Trên vách đá khắc chi chít hình người luyện võ.`,
 o:[{l:'Luyện theo hình khắc',r:[{vo:1,tri:0.4},98],y:c=>'Võ công đột phá!'+fx(c,{vo:R(4,8),over:1}),yy:c=>'Đạt đến cảnh giới tông sư!'+fx(c,{vo:R(8,14),over:1,fame:20}),n:c=>'Luyện sai, nội thương.'+fx(c,{vo:1,over:1,suc:-R(15,25),hpMax:-R(1,3)})},
    {l:'Tìm đường ra ngay',f:c=>fx(c,{suc:-5})}]}),
V({id:'vv_vo_cao_thu',t:'Cao thủ hạ chiến thư',age:[18,70],c:c=>c.vo>=100,
 x:c=>`Một cao thủ thành danh từ phương xa tìm đến, hạ chiến thư hẹn tỉ thí ở đầu làng.`,
 o:[{l:'Nhận lời',r:[{vo:1,suc:0.3},104],y:c=>'Thắng sát nút. Trận đấu giúp ngộ ra nhiều điều.'+fx(c,{vo:R(3,7),over:1,fame:R(15,25)}),n:c=>'Thua, nhưng thấy rõ chỗ yếu của mình.'+fx(c,{vo:R(1,3),over:1,suc:-R(10,20)}),nn:c=>'Bị đánh trọng thương.'+fx(c,{suc:-R(30,40),hpMax:-R(3,5)})},
    {l:'Từ chối',f:c=>fx(c,{fame:-3})}]}),
V({id:'vv_vo_binh_khi',t:'Thần binh xuất thế',age:[16,70],c:c=>c.vo>=100,w:0.25,
 x:'Sét đánh vào núi, lộ ra một thanh kiếm cổ cắm trong đá. Người trong vùng đồn đó là kiếm của tướng quân thời cổ.',
 o:[{l:'Rút kiếm',r:[{vo:1,suc:0.5},100],y:c=>'Kiếm rời đá trong tay! Võ lực tăng mạnh.'+fx(c,{vo:R(5,9),over:1,fame:30}),n:c=>'Không rút nổi.'+fx(c,{suc:-5})},
    {l:'Báo quan',f:c=>fx(c,{fame:3})}]}),
/* sức khỏe */
V({id:'vv_suc_linh_chi',t:'Linh chi ngàn năm',age:[16,90],c:c=>c.suc>=95,
 x:'Trên vách núi cheo leo có một cây linh chi đỏ thẫm, to bằng cái nong.',
 o:[{l:'Leo lên hái',r:[{vo:0.6,suc:0.6},90],y:c=>'Ăn vào, thân thể nhẹ bẫng.'+fx(c,{hpMax:R(3,6),suc:R(3,6),over:1}),n:c=>'Trượt chân rơi xuống.'+fx(c,{suc:-R(20,30)})},
    {l:'Mua lại từ người hái thuốc',c:()=>G.money()>=m(30),f:c=>fx(c,{money:-m(30),hpMax:R(2,4),suc:3,over:1})}]}),
V({id:'vv_suc_dao_si',t:'Đạo sĩ truyền phép dưỡng sinh',age:[30,90],c:c=>c.suc>=90,
 x:'Một đạo sĩ già trăm tuổi mà da dẻ hồng hào ghé qua, nói duyên phận, muốn truyền phép dưỡng sinh.',
 o:[{l:'Bái sư học phép',r:[{eq:0.6,suc:0.6},85],y:c=>'Khí huyết lưu thông, như trẻ lại mười tuổi.'+fx(c,{hpMax:R(4,8),suc:5,over:1}),n:c=>'Học không vào.'+fx(c,{suc:2})},
    {l:'Biếu tiền tiễn đi',f:c=>fx(c,{money:-m(1)})}]}),
/* mị lực */
V({id:'vv_mi_hoa_si',t:'Họa sư cung đình',age:[16,50],c:c=>c.mi>=100,
 x:c=>`Họa sư cung đình đi tìm người làm mẫu vẽ bức "Tuyệt sắc thiên hạ", nghe danh ${N(c)} tìm đến.`,
 o:[{l:'Nhận lời',r:[{mi:1,eq:0.4},98],y:c=>'Bức họa được treo trong cung. Danh tiếng phong nhã lan khắp nước.'+fx(c,{mi:R(3,7),over:1,fame:R(25,40)}),n:c=>'Bức họa không thành, chỉ được ít tiền.'+fx(c,{mi:1,over:1,money:m(5)})},
    {l:'Từ chối',f:c=>''}]}),
V({id:'vv_mi_yen_tiec',t:'Yến tiệc vương phủ',age:[16,60],c:c=>c.mi>=100&&G.tierIdx()>=3,
 x:c=>`Vương phủ mở yến tiệc, ${N(c)} được mời. Cả kinh thành quyền quý đều có mặt.`,
 o:[{l:'Tỏa sáng giữa yến tiệc',r:[{mi:1,eq:0.6},100],y:c=>'Một khúc đàn làm cả tiệc lặng người.'+fx(c,{mi:R(3,6),over:1,fame:R(20,35)}),n:c=>'Bị một vị quận chúa lấn át.'+fx(c,{mi:1,over:1,tam:-4})},
    {l:'Ngồi yên lặng quan sát',f:c=>fx(c,{eq:2})}]}),
/* EQ */
V({id:'vv_eq_hoa_giai',t:'Hòa giải hai dòng họ',age:[25,90],c:c=>c.eq>=100,
 x:'Hai dòng họ lớn trong vùng thù nhau ba đời, sắp đánh nhau to. Cả hai đều chịu nghe một người.',
 o:[{l:'Đứng ra hòa giải',r:[{eq:1,fame:0.3},100],y:c=>'Hai họ bắt tay, lập bia giao hảo.'+fx(c,{eq:R(3,7),over:1,fame:R(25,40)}),n:c=>'Chỉ tạm yên một thời gian.'+fx(c,{eq:1,over:1})},
    {l:'Không dính vào',f:c=>''}]}),
V({id:'vv_eq_thien_su',t:'Thiền sư hỏi đạo',age:[20,90],c:c=>c.eq>=100,
 x:'Một thiền sư hỏi: "Lòng người như nước, lấy gì mà soi?"',
 o:[{l:'Đáp bằng im lặng',r:[{eq:1},100],y:c=>'Thiền sư mỉm cười. Lòng sáng như gương.'+fx(c,{eq:R(4,8),over:1,tam:10}),n:c=>'Thiền sư lắc đầu.'+fx(c,{eq:1,over:1})},
    {l:'Đáp bằng một câu kệ',r:[{eq:0.6,tri:0.6},96],y:c=>'Thiền sư gật đầu.'+fx(c,{eq:R(3,5),over:1,tri:1}),n:c=>'Câu kệ vụng.'+fx(c,{eq:1,over:1})}]}),
];});
