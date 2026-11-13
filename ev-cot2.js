/* Bách Niên Thế Gia v4 · cốt truyện mới, phỏng theo mô-típ truyện mạng (đã đơn giản hóa)
   Thoái hôn, ngọc bội gia truyền, tàng bảo đồ, phế vật nghịch tập ở võ đường, giả thiên kim */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc,age,married}=G;
const S=()=>G.S();
const m=v=>G.mm(v);
const N=c=>esc(c.given);
const nx=(c,id,a,b,d)=>{G.later(c,id,R(a,b),d);return ''};
const A=o=>Object.assign({arc:1,k:'Cốt truyện'},o);
const ST=o=>Object.assign({once:1,k:'Mở đầu cốt truyện',w:0.5,cd:24},o);
const rose=c=>c.degree>=1||c.job==='quan'||(c.tuoc||0)>0||c.tri+c.vo+c.mi>=230||c.fame>=150||G.tierIdx()>=4;
return [
/* ========== THOÁI HÔN: ba mươi năm hà đông, ba mươi năm hà tây ========== */
ST({id:'th_a',t:'Thoái hôn',age:[16,22],c:c=>!married(c)&&!c.inLaw&&G.tierIdx()<=2,
 x:c=>`Nhà ${pick(['Mộ Dung','Liễu','Tiêu','Bạch'])} từng đính ước với nhà ${N(c)} từ thuở hai đứa còn nằm nôi. Nay nhà họ phát đạt, kéo cả họ hàng đến giữa sân, trả lại tín vật, nói thẳng: "Nhà ngươi không xứng."`,
 o:[{l:'Lặng lẽ nhận lại tín vật',f:c=>'Nuốt nhục vào lòng.'+fx(c,{tam:-12,eq:2})+nx(c,'th_b',36,48,{p:'nhan'})},
    {l:'Hẹn ba năm sau sẽ khiến họ hối hận',f:c=>'Cả sân im phăng phắc. Có người cười khẩy.'+fx(c,{tam:-6,fame:3})+nx(c,'th_b',36,40,{p:'hen'})},
    {l:'Tự tay xé hôn thư trước mặt họ',r:[{eq:0.6,mi:0.6},50],y:c=>'Khí phách khiến người xem nể phục.'+fx(c,{fame:8,tam:-3})+nx(c,'th_b',36,48,{p:'xe'}),n:c=>'Bị chê là trẻ con nóng nảy.'+fx(c,{fame:-4,tam:-8})+nx(c,'th_b',36,48,{p:'xe'})}]}),
A({id:'th_b',t:'Ba năm sau',
 x:(c,d)=>rose(c)?`${N(c)} giờ đã khác xưa. Nhà họ ${pick(['Mộ Dung','Liễu','Tiêu','Bạch'])} lại sa sút vì làm ăn thua lỗ, cho người đến xin nối lại hôn ước${d.p==='hen'?', đúng như lời hẹn năm nào':''}.`:`Ba năm trôi qua mà ${N(c)} vẫn chưa làm nên chuyện gì. Nghe tin người kia đã gả vào một nhà quyền quý.`,
 o:c=>rose(c)?[
    {l:'Bỏ qua chuyện cũ, nối lại hôn ước',c:c=>!married(c),f:c=>{G.mkSpouse(c,true,G.mkMatch(c,{age:age(c)-1,up:0.6,story:1}));return 'Người đời khen độ lượng.'+fx(c,{fame:R(10,20),tam:6})}},
    {l:'Từ chối khéo, chúc họ yên ổn',f:c=>'Chuyện cũ khép lại nhẹ nhàng.'+fx(c,{fame:R(8,15),eq:2,tam:8})},
    {l:'Bắt họ quỳ xin trước sân như năm xưa',f:c=>'Hả hê một trận. Nhưng có người bảo mình hẹp hòi.'+fx(c,{tam:15,fame:-5})}]
   :[{l:'Gác chuyện cũ, sống tiếp',f:c=>fx(c,{eq:2,tam:-4})},{l:'Uống rượu giải sầu',f:c=>fx(c,{tam:-8,habit:chance(0.3)?'ruou':undefined})}]}),

/* ========== NGỌC BỘI GIA TRUYỀN: phế vật nghịch tập ========== */
ST({id:'nb_a',t:'Ngọc bội vỡ trong từ đường',age:[8,16],c:c=>Math.min(c.tri,c.vo)<40,w:0.35,
 x:c=>`${N(c)} bị bạn bè chê là đứa đần, lén vào từ đường khóc. Vô tình làm rơi miếng ngọc bội cũ trên bàn thờ, vỡ làm đôi. Từ trong ngọc vọng ra tiếng một ông già: "Cuối cùng cũng có đứa ngốc mở được ta ra."`,
 o:[{l:'Hỏi ông là ai',f:c=>'Ông lão xưng là một vị tông sư bị phong ấn trăm năm, muốn nhận làm đệ tử.'+fx(c,{tam:8})+nx(c,'nb_b',4,10)},
    {l:'Sợ quá chạy đi mách người lớn',f:c=>'Người lớn đến thì miếng ngọc đã im lặng như đá.'+fx(c,{tam:-2})}]}),
A({id:'nb_b',t:'Đêm đêm luyện công',k:'Ngọc bội',
 x:c=>`Mỗi đêm ông lão trong ngọc bội dạy ${N(c)} một phép. Ông bảo: "Căn cơ của con không kém, chỉ là chưa ai khai mở."`,
 o:[{l:'Học văn: kinh sử, mưu lược',f:c=>{G.addTrait(c,'siengnang');return 'Đầu óc như được gột rửa.'+fx(c,{tri:R(8,14)})+nx(c,'nb_c',18,36,{h:'van'})}},
    {l:'Học võ: tâm pháp, quyền cước',f:c=>{G.addTrait(c,'siengnang');return 'Gân cốt đổi khác từng ngày.'+fx(c,{vo:R(8,14),suc:5})+nx(c,'nb_c',18,36,{h:'vo'})}},
    {l:'Học cả hai',r:[{suc:0.6,eq:0.4},55],y:c=>'Văn võ song toàn!'+fx(c,{tri:R(5,8),vo:R(5,8)})+nx(c,'nb_c',18,36,{h:'ca'}),n:c=>'Tham thì thâm, kiệt sức đổ bệnh.'+fx(c,{suc:-15,tri:2,vo:2})+nx(c,'nb_c',24,36,{h:'van'})}]}),
A({id:'nb_c',t:'Ngày phế vật ngẩng đầu',k:'Ngọc bội',
 x:(c,d)=>`${d.h==='vo'?'Võ đường trong huyện mở hội thi tuyển đệ tử':'Huyện mở kỳ khảo hạch đồng sinh'}. Đám bạn từng chê ${N(c)} cũng có mặt, nhìn sang cười cợt.`,
 o:(c,d)=>[{l:d.h==='vo'?'Lên đài so tài':'Vào trường thi',r:[d.h==='vo'?{vo:1}:d.h==='ca'?{tri:0.5,vo:0.5}:{tri:1},55],y:c=>'Đứng đầu, làm cả huyện kinh ngạc!'+fx(c,{fame:R(15,25),tam:15})+nx(c,'nb_d',24,60),yy:c=>'Một bước thành danh, thầy giỏi tranh nhau nhận làm học trò!'+fx(c,{fame:35,tri:3,vo:3,tam:15})+nx(c,'nb_d',24,60),n:c=>'Chỉ thiếu chút nữa. Nhưng không ai dám cười nữa.'+fx(c,{fame:5})+nx(c,'nb_d',24,60)},
    {l:'Giấu tài, chưa vội lộ',f:c=>'Ông lão trong ngọc gật gù: "Biết nhẫn, khá lắm."'+fx(c,{eq:3})+nx(c,'nb_d',24,60)}]}),
A({id:'nb_d',t:'Kẻ thù của sư phụ',k:'Ngọc bội',
 x:c=>`Một người áo đen tìm đến, đòi lấy miếng ngọc bội. Ông lão trong ngọc run giọng: "Kẻ phong ấn ta năm xưa."`,
 o:[{l:'Liều chết bảo vệ sư phụ',r:[{vo:1,tri:0.5,eq:0.3},80],y:c=>'Hạ được kẻ thù. Sư phụ giải phong ấn, truyền hết công lực rồi tan biến.'+fx(c,{vo:R(6,12),tri:R(4,8),over:1,fame:30,trait:'thientai'}),n:c=>'Trọng thương. Sư phụ dùng chút sức tàn cứu mình rồi tan biến.'+fx(c,{suc:-R(30,45),hpMax:-R(3,6),tam:-15,lethal:1})},
    {l:'Giao ngọc bội để giữ mạng',f:c=>'Người áo đen bỏ đi. Từ đó ngọc bội không còn tiếng nói.'+fx(c,{tam:-12})},
    {l:'Dùng mưu dụ kẻ thù vào bẫy',r:[{tri:1,eq:0.4},75],y:c=>'Kẻ thù sa bẫy. Sư phụ yên lòng ra đi.'+fx(c,{tri:R(5,10),over:1,fame:20,trait:'vankhuc'}),n:c=>'Mưu bị lật, bị thương.'+fx(c,{suc:-20})}]}),

/* ========== TÀNG BẢO ĐỒ ========== */
ST({id:'bd_a',t:'Bức tranh cũ ở chợ đồ cổ',age:[16,60],c:c=>!c.away,w:0.45,
 x:'Ở chợ đồ cổ có bức tranh sơn thủy rách nát, chủ hàng bán rẻ như cho.',
 o:[{l:'Mua về',c:()=>G.money()>=m(1),f:c=>'Treo trong thư phòng.'+fx(c,{money:-m(1)})+nx(c,'bd_b',2,8)},
    {l:'Không mua',f:c=>''}]}),
A({id:'bd_b',t:'Bí mật trong tranh',k:'Tàng bảo đồ',
 x:'Trời nồm, lớp giấy bồi bong ra, lộ một tấm bản đồ vẽ bằng mực son, đánh dấu một hang núi phía Tây.',
 o:[{l:'Tự mình đi tìm',r:[{tri:0.6,suc:0.4},55],y:c=>'Tìm ra cửa hang.'+nx(c,'bd_c',2,6,{t:'tu'}),n:c=>'Lạc đường, về tay không. Còn bản đồ.'+fx(c,{suc:-8})+nx(c,'bd_b',12,24)},
    {l:'Rủ bạn bè cùng đi',r:[{eq:1},50],y:c=>'Cả nhóm tìm ra hang.'+nx(c,'bd_c',2,6,{t:'ban'}),n:c=>'Bạn bè tham, lén đi trước.'+nx(c,'bd_c',2,4,{t:'phan'})},
    {l:'Bán bản đồ',f:c=>fx(c,{money:m(R(5,15))})}]}),
A({id:'bd_c',t:'Hang báu',k:'Tàng bảo đồ',
 x:(c,d)=>d.t==='phan'?'Đến nơi thì thấy bạn bè đã vào trước, đang cãi nhau chia của. Trong hang còn đầy cơ quan.':'Trong hang tối om, xương người rải rác. Cuối hang là mấy rương gỗ mục.',
 o:[{l:'Phá cơ quan, vào sâu',r:[{tri:0.8,vo:0.5},65],y:c=>'Rương đầy vàng bạc châu báu!'+fx(c,{money:m(R(80,200)),fame:10}),yy:c=>'Kho báu của một vương triều cũ! Kèm theo cả bí kíp.'+fx(c,{money:m(R(250,400)),fame:30,vo:5,over:1}),n:c=>'Trúng tên độc.'+fx(c,{suc:-R(25,40),hpMax:-R(2,4),lethal:1})},
    {l:'Lấy vài thứ gần cửa rồi ra',f:c=>fx(c,{money:m(R(10,30))})},
    {l:'Báo quan, nộp kho báu',f:c=>'Được triều đình khen thưởng.'+fx(c,{money:m(R(15,30)),fame:R(20,30)})}]}),

/* ========== GIẢ THIÊN KIM: thân thế bị tráo ========== */
ST({id:'tk_a',t:'Bà vú già trở về',age:[14,24],c:c=>!c.inLaw&&!!c.adopted,w:0.3,
 x:c=>`Một bà vú già hấp hối tìm đến nhà ${N(c)}, thú nhận năm xưa chính bà đã gửi đứa trẻ này đi trong đêm hỗn loạn của một ${pick(['hầu phủ','nhà phú thương','nhà quan lớn'])}. Cha mẹ ruột của ${N(c)} vẫn còn, đang ở kinh thành.`,
 o:[{l:'Lên kinh tìm người thân thật',f:c=>'Mang theo chiếc khóa bạc làm tín vật.'+fx(c,{tam:-4})+nx(c,'tk_b',3,8)},
    {l:'Ơn sinh không bằng ơn dưỡng, ở lại',f:c=>'Cha mẹ nuôi ôm chầm lấy, khóc nức nở.'+fx(c,{eq:3,tam:6,on:4})}]}),
A({id:'tk_b',t:'Cửa phủ cao vời',k:'Thân thế',
 x:c=>`Nhà kia đã nuôi đứa trẻ bị tráo mười mấy năm, thương như con ruột. Thấy ${N(c)} đến, họ vừa mừng vừa ngại.`,
 o:[{l:'Nhận lại tổ tông, nhưng vẫn giữ liên lạc với nhà nuôi',r:[{eq:1,mi:0.4},55],y:c=>'Hai nhà thành thông gia thân thiết. Gia tộc có thêm chỗ dựa lớn.'+fx(c,{fame:R(20,35),money:m(R(30,60)),hung:6}),n:c=>'Đứa trẻ bị tráo ghen ghét, gây khó dễ đủ đường.'+fx(c,{tam:-8})+nx(c,'tk_c',6,12)},
    {l:'Chỉ xin một lời công nhận rồi về',f:c=>'Nhà kia áy náy, gửi theo lễ vật hậu.'+fx(c,{money:m(R(20,40)),fame:8})},
    {l:'Đòi lại tất cả những gì của mình',f:c=>'Nhà kia đuổi ra.'+fx(c,{fame:-6,tam:-10})+nx(c,'tk_c',6,12)}]}),
A({id:'tk_c',t:'Kẻ bị tráo',k:'Thân thế',
 x:'Đứa trẻ bị tráo năm xưa cho người hãm hại, đồn khắp nơi rằng mình là kẻ mạo nhận.',
 o:[{l:'Đưa tín vật ra trước mặt mọi người',r:[{tri:0.6,eq:0.6},60],y:c=>'Sự thật phơi bày, kẻ kia xấu hổ bỏ đi.'+fx(c,{fame:R(15,25),tam:10}),n:c=>'Tín vật bị nói là đồ giả.'+fx(c,{fame:-10,tam:-8})},
    {l:'Không tranh nữa',f:c=>'Rũ áo ra về, lòng nhẹ tênh.'+fx(c,{eq:3,tam:4})}]}),
];});
