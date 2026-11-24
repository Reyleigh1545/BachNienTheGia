/* Bách Niên Thế Gia v4.1 · gói kỳ ngộ bổ sung
   Thêm cơ hội đổi đời cho nhà nghèo, nông dân, binh lính. Phần thưởng lớn hơn hẳn các gói cũ. */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc,age}=G;
const S=()=>G.S();
const m=v=>G.mm(v);
const N=c=>esc(c.given);
const F=()=>S().farm;
const land=n=>G.landDelta(n);
const kho=(g,q)=>{S().kho[g]=(S().kho[g]||0)+q;return `<span class="fx"><span class="up">Kho: ${G.GOODS[g].n} +${q} ${G.GOODS[g].u}</span></span>`};
const NONG=['nong'],QN=['quan_ngu'];
const V=o=>Object.assign({k:'Kỳ ngộ',good:1,pcd:120},o);
const ngheo=[0,2];
return [
/* ================= nông dân ================= */
V({id:'t_n_dia_chu_ban',t:'Địa chủ sa sút bán ruộng',job:NONG,
 x:'Nhà địa chủ đầu làng có con trai mê cờ bạc, phải bán gấp mấy mẫu ruộng tốt, giá rẻ hơn hẳn thường lệ.',
 o:[{l:'Mua ngay 2 mẫu, giá chỉ bằng nửa (khoảng 8 lạng)',c:()=>G.money()>=8000,f:c=>{const p=8000;return 'Được hai mẫu ruộng tốt.'+fx(c,{money:-p})+land(2)}},
    {l:'Ngỏ ý mua chịu, trả dần',r:[{eq:1,fame:0.3},40],y:c=>'Địa chủ nể tình cho mua chịu một mẫu, trả dần không lấy lãi.'+land(1)+fx(c,{money:-m(40)}),n:c=>'Người ta chỉ bán tiền tươi.'+fx(c,{tam:-3})},
    {l:'Thôi',f:c=>''}]}),
V({id:'t_n_duoc_mua',t:'Được mùa lớn',job:NONG,sea:['thu','ha'],
 x:c=>`Năm nay mưa thuận gió hòa, đất nhà ${N(c)} trĩu bông. Thương lái đã đến dạm giá từ sớm.`,
 o:[{l:'Bán ngay cho thương lái',f:c=>'Thu một món kha khá.'+fx(c,{money:m(R(40,70)),tam:8,m:1})},
    {l:'Trữ thóc vào kho chờ giá',f:c=>'Thóc đầy bồ.'+kho('lua',R(15,30))+fx(c,{tam:6})},
    {l:'Biếu một phần cho người nghèo trong làng',f:c=>'Cả làng biết ơn.'+fx(c,{money:-m(8),fame:R(12,20),cfame:6,tam:6})}]}),
/* ================= binh lính ================= */
V({id:'t_q_thu_nha',t:'Thư nhà',job:QN,
 x:c=>`Người đưa thư mang đến lá thư nhà. Chữ người viết hộ nguệch ngoạc, kể chuyện mùa màng, con cái.`,
 o:[{l:'Viết thư trả lời, gửi kèm tiền dành dụm',c:c=>(c.purse||0)>=m(6),f:c=>{const v=Math.min(Math.max(m(6),Math.round((c.purse||0)*0.5)),m(20));const h=G.S().people.find(p=>p.id===G.S().head)||c;return 'Nhà vui, bớt lo.'+fx(c,{purse:-v,tam:10})+fx(h,{money:v})+G.fxAll({tam:3})}},
    {l:'Đọc đi đọc lại',f:c=>fx(c,{tam:12})}]}),
/* ================= nhà nghèo: đường đổi đời ================= */
V({id:'t_g_cho_vay',t:'Viên ngoại cho vay vốn',tier:ngheo,age:[18,55],
 x:c=>`Viên ngoại đầu huyện nghe tiếng ${N(c)} chịu thương chịu khó, muốn cho vay vốn làm ăn, lãi nhẹ.`,
 o:[{l:'Vay để mở hàng nhỏ',r:[{eq:0.5,tri:0.5},40],y:c=>'Làm ăn trôi chảy, trả nợ xong vẫn còn lãi.'+fx(c,{money:m(R(60,100)),m:3,fame:6}),n:c=>'Lỗ vốn, phải trả nợ dần.'+fx(c,{money:-m(15),tam:-6})},
    {l:'Vay mua ruộng',f:c=>'Có thêm một mẫu, nợ trả dần.'+land(1)+fx(c,{money:-m(60)})},
    {l:'Không dám vay',f:c=>''}]}),
/* ================= chung, ai cũng gặp được ================= */
V({id:'t_c_giac_mo',t:'Giấc mơ lạ',age:[10,90],w:0.4,
 x:'Đêm qua mơ thấy một con cá chép vàng nhảy vào lòng.',
 o:[{l:'Đi lễ chùa',c:()=>G.money()>=m(1),f:c=>'Lòng thanh thản, như có điềm lành.'+fx(c,{money:-m(1),duyen:R(3,6),tam:6})},
    {l:'Đánh một ván đề theo giấc mơ',r:[{duyen:1},55],y:c=>'Trúng thật!'+fx(c,{money:m(R(30,60)),tam:10}),n:c=>'Mất tiền.'+fx(c,{money:-m(3)})}]}),
V({id:'t_c_thi_vo_lang',t:'Lễ hội võ làng',age:[15,40],c:c=>c.vo>=35,
 x:'Hội làng có thi vật, giải là một con lợn và mấy quan tiền.',
 o:[{l:'Lên sới',r:[{vo:0.7,suc:0.3},40],y:c=>'Vô địch sới vật!'+fx(c,{money:m(R(15,25)),fame:R(10,15),vo:2,tam:10}),n:c=>'Bị quật ngã vòng hai.'+fx(c,{suc:-5,vo:1})},
    {l:'Xem thôi',f:c=>fx(c,{tam:4})}]})
];});
