/* Bách Niên Thế Gia v6.7.10-d9.10 · nội dung mới (mục 12, đợt nội dung): tám kỳ ngộ gia tộc, cốt truyện lớn thứ hai "Tấm bản đồ kho cổ" (bd_*, năm bước, ngã rẽ, tiến độ ẩn, chọn người nhà thật), hai sự kiện đọc ký ức hàng xóm (xom_*). Thưởng kỳ ngộ do fx tự nâng sàn (mục 5). */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const FM=v=>G.fmtMoney(v);const N=c=>esc(c.given);
const V=o=>Object.assign({k:'Kỳ ngộ',ky:1,good:1,u:'clan',pcd:200,w:1,head:1,age:[28,80],tier:[1,6],tags:{}},o);
const BD=(id,t,xf,of,ex)=>Object.assign({id,t,k:'Cốt truyện',fixed:1,head:1,x:(c,d)=>xf(c,d),o:(c,d)=>of(c,d)},ex||{});
const ADULT=p=>G.age(p)>=16&&G.age(p)<=55;
return [
/* ===== tám kỳ ngộ gia tộc ===== */
V({id:'kn_gieng_nuoc_ngot',cyc:[20,40],t:'Mạch nước ngầm trong vườn',tier:[1,6],
 x:c=>`Đào móng sửa bếp, người nhà đụng phải mạch nước ngầm ngọt hiếm thấy. Cả xóm vốn phải gánh nước từ xa, nghe tin kéo đến xem.`,
 o:c=>[{l:'Đào giếng lớn, cho cả xóm cùng dùng',c:()=>G.money()>=m(3),f:c=>'Giếng xong, người xóm xếp hàng xin nước. Tên họ nhà được nhắc mỗi sớm mai.'+fx(c,{money:-m(3),fame:7,hung:2,on:2,tam:5})},
  {l:'Giữ giếng cho nhà, thu tiền nước nhẹ',f:c=>'Có thêm nguồn thu nhỏ, nhưng có người trong xóm phàn nàn.'+fx(c,{money:m(5),fame:-1,tam:1})},
  {l:'Lấp đi, sợ động mạch đất',f:c=>''}]}),
V({id:'kn_cau_dat_cat',cyc:[25,50],t:'Cây cầu tre cũ',tier:[0,5],
 x:c=>`Cây cầu tre bắc qua con rạch gần nhà mục nát, đi qua nguy hiểm. Dân hai bờ phải lội nước. Có người nói nhà ${N(c)} khá giả nhất vùng, nên lo việc này.`,
 o:c=>[{l:'Bỏ tiền xây cầu đá nhỏ',c:()=>G.money()>=m(10),f:c=>'Cầu xây xong, người hai bờ qua lại nhộn nhịp. Tên nhà khắc vào chân cầu.'+fx(c,{money:-m(10),fame:R(10,16),hung:3,on:3,tam:6})},
  {l:'Góp công cùng dân, sửa lại cầu tre',f:c=>'Cả xóm ra tay, cầu bền thêm vài năm. Tình làng thêm đầm.'+fx(c,{money:-m(2),fame:5,on:2,tam:4})},
  {l:'Nói để quan lo',f:c=>'Quan huyện nhận lời, mãi chưa thấy làm.'+fx(c,{fame:-1})}]}),
/* ===== cốt truyện lớn thứ hai: Tấm bản đồ kho cổ ===== */
V({id:'bd_tim_thay',cyc:[40,70],t:'Tấm bản đồ trong hòm cũ',tier:[1,6],w:0.8,
 x:c=>`Dọn gác xép, người nhà tìm thấy một tấm da dê ố vàng giấu đáy hòm cũ: một bản đồ vẽ tay, có ký hiệu lạ và dòng chữ "kho của tổ". Không ai biết chuyện này có thật không.`,
 o:c=>[{l:'Giữ kín, tự tìm hiểu trước',f:c=>{G.later(c,'bd_buoc2',R(12,24),{kin:0});return 'Mấy tháng sau, vài ký hiệu bắt đầu có nghĩa.'+fx(c,{tri:1,tam:3})}},
  {l:'Họp cả nhà, cùng bàn',f:c=>{G.later(c,'bd_buoc2',R(12,24),{kin:1});return 'Cả họ góp ý, nhiều người hào hứng, cũng có người nói chớ dại.'+fx(c,{fame:2,tam:4})}},
  {l:'Đốt đi cho khỏi phiền',f:c=>'Tấm da cháy thành tro. Mọi chuyện chấm dứt.'+fx(c,{tam:-1})}]}),
BD('bd_buoc2','Dấu vết bản đồ',(c,d)=>`${d.kin?'Cả nhà đã bàn nhiều, ':'Một mình theo dõi, '}${N(c)} nhận ra bản đồ chỉ về một ngọn đồi hoang cách đây nửa ngày đường. Có người đã hỏi dò về tấm da, ý không phải người nhà.`,(c,d)=>{const v=m(10);return [
  {l:`Thuê người thăm dò trước (${FM(v)})`,c:()=>G.money()>=v,f:c=>{S().money-=v;G.later(c,'bd_buoc3',R(8,18),{kin:d.kin,tp:1});return 'Người thăm dò về báo: nền đá cũ có thật, có dấu người đào. Đối thủ đang tới gần.'+fx(c,{tam:2})}},
  {l:'Tự mình đi, mang theo vài người tin cậy',f:c=>{G.later(c,'bd_buoc3',R(8,18),{kin:d.kin,tp:0});return 'Cả nhóm đi một chuyến kín, vẽ lại được vài mốc.'+fx(c,{suc:-R(2,5),tam:2})}},
  {l:'Bỏ ngang, thấy nhiều rắc rối quá',f:c=>'Tấm da lại nằm đáy hòm. Ngày sau còn ai nhớ?'+fx(c,{tam:-1})}]}),
BD('bd_buoc3','Kẻ tranh kho',(c,d)=>`Có một nhà lớn trong vùng cũng nghe tin về kho, cử người theo dõi nhà ${N(c)}. ${d.tp?'Nhờ người thăm dò, nhà mình đi trước một bước.':'Họ đã bám theo sát gót.'}`,(c,d)=>[
  {l:'Chọn người nhà thật đi dẫn đường',c:c=>G.kinList(c,p=>G.age(p)>=18&&G.age(p)<=50).length>0,go:(c,d2)=>G.pickKin(c,{eyebrow:'Tấm bản đồ kho cổ',title:'Cử ai dẫn đường',text:'Người được chọn sẽ cầm đầu chuyến đi, sức khỏe và mưu lược của người ấy quyết định cuộc tranh kho. Chọn người nào?',filter:p=>G.age(p)>=18&&G.age(p)<=50,cb:w=>{const p=Math.max(0.25,Math.min(0.85,0.3+(w.suc+w.tri+w.vo)/450+(d.tp?0.1:0)));const win=chance(p);G.setAway(w,{type:'odo',until:S().t+R(2,5)});G.later(c,'bd_buoc4',R(6,12),{kin:d.kin,w:w.id,win:win?1:0});return `${esc(w.given)} lên đường cùng mấy người tin cậy. ${win?'Đi trước, đến nơi sớm hơn đối thủ một ngày.':'Đối thủ bám sát, cuộc đua sít sao.'}`+fx(c,{tam:2})+fx(w,{suc:-R(3,8),tam:win?4:-2})}})},
  {l:'Báo quan huyện nhờ can thiệp',r:[{eq:0.8,khau:0.6},40],y:c=>{G.later(c,'bd_buoc4',R(6,12),{kin:d.kin,win:1,quan:1});return 'Quan huyện cử lính kiểm tra đồi. Đối thủ lui, nhưng nhà mình mất quyền tự quyết.'+fx(c,{fame:2,tam:1})},n:c=>{G.later(c,'bd_buoc4',R(6,12),{kin:d.kin,win:0,quan:1});return 'Quan huyện không rảnh, còn hỏi ngược lại nhà mình giữ gì.'+fx(c,{tam:-3})}}]),
BD('bd_buoc4','Cuộc tìm kho',(c,d)=>{const w=d.w?G.P(d.w):null;return d.quan?'Lính huyện đang canh ngọn đồi. Muốn đào, nhà phải thương lượng với quan.':`${w?esc(w.given)+' ':'Người dẫn đường '}đã tới ngọn đồi theo bản đồ. ${d.win?'Không có đối thủ cản đường, mặt đá lộ ra một cửa hầm.':'Đối thủ đã ở đó, hai bên đứng đối mặt trước cửa hầm.'}`},(c,d)=>{const w=d.w?G.P(d.w):null;return [
  {l:'Vào hầm ngay, đào cho tới cùng',r:[{suc:0.6,vo:0.4,tri:0.4},d.win?60:40],y:c=>{G.later(c,'bd_buoc5',R(6,12),{kin:d.kin,res:'kho'});return 'Hầm sâu, tối và ngột, nhưng cuối cùng thấy ngăn chứa. Bên trong không phải vàng mà là hòm sách, vài món đồ cổ.'+(w?fx(w,{suc:-R(4,8),tam:4}):'')+fx(c,{tam:3})},n:c=>{G.later(c,'bd_buoc5',R(6,12),{kin:d.kin,res:'ho'});return 'Hầm sập nhẹ, có người bị thương. Phải rút lui khi đối thủ tiến tới.'+(w?fx(w,{suc:-R(10,20),tam:-5}):'')+fx(c,{tam:-4})}},
  {l:'Thương lượng, chia kho với đối thủ',f:c=>{G.later(c,'bd_buoc5',R(6,12),{kin:d.kin,res:'chia'});return 'Hai bên ngồi lại, ký giấy chia phần. Đỡ đổ máu, cũng đỡ tham.'+fx(c,{fame:2,eq:1,tam:2})}},
  {l:'Rút lui, đánh dấu để dành cho đời sau',f:c=>{G.later(c,'bd_buoc5',R(12,24),{kin:d.kin,res:'ve'});return 'Bản đồ thêm một dấu mới, truyền lại cho con cháu.'+fx(c,{tam:-1})}}]}),
BD('bd_buoc5','Kết cục tấm bản đồ',(c,d)=>d.res==='kho'?'Hòm sách chép tay của một tổ tiên, ghi chuyện làm ăn, cách giữ nhà và một ít vàng nhỏ dưới đáy. Hóa ra kho của tổ là sách và lời dạy.':d.res==='chia'?'Phần kho chia cho hai bên không nhiều, nhưng đủ để hai nhà thôi nhìn nhau như kẻ thù.':d.res==='ho'?'Tin kho lan khắp vùng, người đua nhau tìm. Nhà mình không còn là người duy nhất biết, và bị cho là tham.':'Nhiều năm sau, bản đồ được lấy ra, con cháu bàn nhau đi tiếp.',(c,d)=>d.res==='kho'?[
  {l:'Giữ sách làm của gia truyền, dạy con cháu',f:c=>{G.alive().filter(p=>G.inClan(p)&&G.age(p)<30).forEach(p=>G.addStat(p,'tri',2));return 'Cả nhà học theo lời tổ. Tiếng biết giữ của nhà vang xa.'+fx(c,{money:m(R(10,20)),fame:R(8,14),tri:2,tam:6})}}]:d.res==='chia'?[
  {l:'Nhận phần, kết thân với nhà kia',f:c=>'Hai nhà qua lại, cùng dựng một việc làm ăn nhỏ.'+fx(c,{money:m(R(8,14)),fame:4,eq:1,tam:4})}]:d.res==='ho'?[
  {l:'Chịu tiếng, im lặng chờ qua',f:c=>'Người ta chán dần. Nhà mình chỉ còn lại chuyện kể.'+fx(c,{fame:-3,tam:-3})}]:[
  {l:'Truyền lại cho đời sau, không vội',f:c=>'Bản đồ được cất vào hòm gia bảo, chờ người có duyên.'+fx(c,{tam:2,fame:1})}]),
/* ===== ký ức hàng xóm ===== */
{id:'xom_nho_on',t:'Hàng xóm nhớ ơn',k:'Hàng xóm',age:[25,80],tier:[0,5],w:0.7,pcd:60,cd:60,tags:{},mem:{need:['xom_giup']},
 x:c=>`Người hàng xóm năm xưa được nhà ${N(c)} giúp một tay nay đã khá giả, ghé qua, đặt xuống mấy cân gạo và con gà: "Ơn nghĩa xưa, tôi chưa quên."`,
 o:c=>[{l:'Nhận, mời ở lại ăn bữa cơm',f:c=>'Hai nhà ngồi nói chuyện cũ đến tối. Tình láng giềng thêm bền.'+fx(c,{money:m(1.5),fame:3,tam:5})},
  {l:'Từ chối lễ, chỉ nhận lời hỏi thăm',f:c=>'Người ấy cảm động, từ đó coi nhà mình như ruột thịt.'+fx(c,{fame:5,tam:4})}]},
{id:'xom_gop_gio',t:'Xóm làng góp giỗ cho nhà',k:'Hàng xóm',age:[30,80],tier:[0,5],w:0.6,pcd:96,cd:96,tags:{},mem:{need:['xom_giup']},
 x:c=>`Ngày giỗ nhà ${N(c)}, hàng xóm kéo nhau đến, người mang mâm xôi, người mang con gà. Họ nói nhà mình từng giúp ai nấy, giờ đến lượt họ.`,
 o:c=>[{l:'Mời cả xóm cùng dự giỗ',f:c=>'Giỗ đông vui hơn mọi năm, tên nhà được nhắc nhiều lần.'+fx(c,{money:-m(1),fame:6,tam:6})},
  {l:'Nhận lòng thành, mời vài người thân thiết',f:c=>'Giỗ gọn gàng mà ấm.'+fx(c,{fame:3,tam:4})}]}
];
});
