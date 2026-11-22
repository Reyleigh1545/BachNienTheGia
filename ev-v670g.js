/* Bách Niên Thế Gia v6.7.0-d4 · hệ quả lâu dài của tang lễ, hôn lễ và môn khách (đọc các dấu G.mem do engine để lại) */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const FM=v=>G.fmtMoney(v);const N=c=>esc(c.given);
const rich=v=>()=>G.money()>=m(v);
const pay=(l,v,o)=>Object.assign({l:`${l} (${FM(m(v))})`,c:rich(v)},o);
const HD=o=>Object.assign({tags:{},k:'Họ hàng',head:1,age:[28,90],cd:60,pcd:120,ms:1},o);
return [
HD({id:'tl_tang_bac',t:'Tiếng đời về đám tang',c:()=>G.mem.has('tang_bac'),w:3,
 x:c=>{const mo=G.mem.get('tang_bac');return `Người trong họ và hàng xóm vẫn còn nhắc chuyện đám tang ${mo&&mo.n?esc(mo.n):'năm nào'}: nhà có tiếng mà lo liệu sơ sài. Có người nói thẳng ra trong bữa giỗ.`},
 o:c=>[pay('Làm giỗ lớn bù lại, mời đủ họ hàng',20,{f:c=>{G.mem.clear('tang_bac');return 'Giỗ lớn, đủ mặt họ hàng. Tiếng chê lắng xuống, và nhà mình nhớ bài học.'+fx(c,{money:-m(20),cfame:4,tam:4})}}),
  {l:'Giải thích: lúc ấy nhà đang khó',r:[{eq:1,khau:0.6},50],y:c=>{G.mem.clear('tang_bac');return 'Người ta nghe hoàn cảnh mà thông cảm.'+fx(c,{tam:2})},n:c=>'Lời giải thích nghe như chống chế.'+fx(c,{cfame:-3,tam:-4})},
  {l:'Mặc kệ',f:c=>{G.mem.set('tang_bac',60,G.mem.get('tang_bac'));return 'Nhà mình không đáp. Tiếng ấy còn đó thêm nhiều năm.'+fx(c,{cfame:-3,tam:-3})}}]}),
HD({id:'tl_nho_on_tang',t:'Người nhớ ơn đám tang',c:()=>G.mem.has('tang_hau'),w:3,
 x:c=>{const mo=G.mem.get('tang_hau');return `Một vị khách đã dự đám tang ${mo&&mo.n?esc(mo.n):'năm nào'}, thấy nhà lo liệu trang trọng đúng lễ, nhớ mãi. Nay có việc, ông ta tìm tới.`},
 o:c=>[{l:'Tiếp ông ta, hỏi han',r:[{eq:1,khau:0.6},65],y:c=>{G.mem.clear('tang_hau');return 'Ông ta muốn kết thân, mang theo lễ vật và một lời hứa giúp khi cần.'+fx(c,{money:m(18),cfame:5})},n:c=>{G.mem.clear('tang_hau');return 'Ông ta chỉ ghé thăm hỏi, để lại một lời chúc.'+fx(c,{cfame:2})}},
  {l:'Từ chối khéo, nhận ơn là đủ',f:c=>{G.mem.clear('tang_hau');return 'Ông ta cười, cáo từ.'+fx(c,{cfame:2})}}]}),
HD({id:'tl_thong_gia_chê',t:'Nhà thông gia coi nhẹ',c:()=>G.mem.has('cuoi_so'),w:3,
 x:c=>{const mo=G.mem.get('cuoi_so');return `Đám cưới năm nào của ${mo&&mo.n?esc(mo.n):'dâu rể'} làm sơ sài so với thân phận nhà thông gia ${mo&&mo.s?'họ '+esc(mo.s):''}. Bên ấy chưa quên: mỗi lần gặp lại, giọng họ lạnh hơn thường.`},
 o:c=>[pay('Mời nhà thông gia một bữa cơm lớn, xin lỗi vì lễ cưới xưa',25,{f:c=>{G.mem.clear('cuoi_so');return 'Hai bên nói chuyện rõ. Nhà thông gia nguôi, dù chưa quên hẳn.'+fx(c,{money:-m(25),cfame:3,tam:5})}}),
  {l:'Để thời gian xóa dần',f:c=>{G.mem.set('cuoi_so',60,G.mem.get('cuoi_so'));return 'Hai nhà vẫn qua lại khách sáo.'+fx(c,{tam:-3})}}]}),
HD({id:'tl_thong_gia_hau',t:'Nhà thông gia nhớ lễ cưới',c:()=>G.mem.has('cuoi_hau'),w:3,
 x:c=>{const mo=G.mem.get('cuoi_hau');return `Nhà thông gia ${mo&&mo.s?'họ '+esc(mo.s):''} vẫn nhắc lễ cưới của ${mo&&mo.n?esc(mo.n):'đôi trẻ'}: đủ lễ, đủ tình. Nay họ gửi lời mời hợp tác một việc.`},
 o:c=>[{l:'Nhận lời, cùng làm',r:[{khau:1,eq:0.6},62],y:c=>{G.mem.clear('cuoi_hau');return 'Việc làm chung sinh lợi, và hai nhà thân nhau thêm.'+fx(c,{money:m(25),cfame:4})},n:c=>{G.mem.clear('cuoi_hau');return 'Việc không ra gì, nhưng tình thông gia vẫn bền.'+fx(c,{cfame:2})}},
  {l:'Cảm tạ, không làm chung',f:c=>{G.mem.clear('cuoi_hau');return 'Hai nhà giữ tình thân, không ràng buộc.'+fx(c,{tam:2})}}]}),
{id:'mk_mach_nuoc',t:'Môn khách mách nước',k:'Dự án',tags:{},fixed:1,ms:1,head:1,
 x:c=>{const n=G.proj.n('monkhach');return `Trong số ${n} môn khách, có người nghe được một mối làm ăn sắp thành: một vụ ${pick(['gom hàng trước mùa','mua lại kho thóc bị vỡ nợ','nhận bao một công trình của huyện','đón đầu lệnh cấm sắp ban'])}. Càng nhiều môn khách thì tin càng chắc và nhà càng đủ người để làm lớn. Ông ta xin phép nhà bỏ vốn.`},
 o:c=>{const n=G.proj.n('monkhach');const sc=Math.max(1,Math.round(1+n/6));const p=Math.min(86,56+n*1.2);return [
  {l:`Bỏ vốn nhỏ (${FM(m(5*sc))})`,c:rich(5*sc),r:[{tri:0.6,khau:0.6,eq:0.3},p],y:c=>{G.proj.led('monkhach','in',m(40*sc));return 'Mối làm ăn thành như lời môn khách. Lãi chia rõ ràng.'+fx(c,{money:m(40*sc)})},n:c=>{G.proj.led('monkhach','out',m(5*sc));return 'Mối làm ăn đổ vỡ giữa chừng. Vốn mất, môn khách xin lỗi.'+fx(c,{money:-m(5*sc)})}},
  {l:`Bỏ vốn vừa (${FM(m(15*sc))})`,c:rich(15*sc),r:[{tri:0.6,khau:0.6,eq:0.3},p-8],y:c=>{G.proj.led('monkhach','in',m(135*sc));return 'Mối làm ăn lớn hơn dự tính, nhiều môn khách cùng lo nên suôn sẻ.'+fx(c,{money:m(135*sc)})},n:c=>{G.proj.led('monkhach','out',m(15*sc));return 'Mối làm ăn đổ vỡ. Vốn mất khá nhiều.'+fx(c,{money:-m(15*sc),tam:-2})}},
  {l:`Bỏ vốn lớn, huy động cả môn khách (${FM(m(40*sc))})`,c:rich(40*sc),r:[{tri:0.6,khau:0.6,eq:0.3},p-16],y:c=>{G.proj.led('monkhach','in',m(400*sc));return 'Cả nhà làm một vụ lớn. Lãi gấp mười lần vốn, tiếng tăm của môn khách nhà mình vang xa.'+fx(c,{money:m(400*sc),fame:3})},n:c=>{G.proj.led('monkhach','out',m(40*sc));return 'Vụ lớn đổ vỡ, mất một khoản không nhỏ. Môn khách ai cũng áy náy.'+fx(c,{money:-m(40*sc),tam:-4,fame:-1})}},
  {l:'Nghe rồi thôi',f:c=>'Nhà không động vốn.'}]}}
];});
