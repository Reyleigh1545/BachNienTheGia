/* Bách Niên Thế Gia v6.7.10-d9.12 · NỘI DUNG MỚI, PHẦN 4.
   (1) Chuỗi thiên tai "Nước dâng" lut_* (3 bước: cảnh báo đê, cứu trợ, tái thiết; có ngã rẽ, hậu quả theo lựa chọn);
   (2) Cốt truyện ngắn tín ngưỡng "Chùa làng xuống cấp" tn_* (3 bước, sư trụ trì là người thật, kết nhỏ). */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const FM=v=>G.fmtMoney(v);const N=c=>esc(c.given);
const T=d=>d&&d.npc?G.tie.get(d.npc):null;const nm=n=>esc(n?n.n:'người ấy');
const addVai=(n,v)=>{if(n&&!n.vai.includes(v)){n.vai.push(v);n.vaiTxt=n.vai.map(x=>G.tie.VAI[x]||x).join(', ')}};
const pay=(l,v,o)=>Object.assign({l:`${l} (${FM(m(v))})`,c:()=>G.money()>=m(v)},o);
const E=o=>Object.assign({tags:{}},o);
const FX=o=>Object.assign({tags:{},fixed:1},o);
const later=(c,id,lo,hi,d)=>G.later(c,id,R(lo,hi),d||{});
const gone=()=>[{l:'Thôi',f:()=>''}];
return [
E({id:'lut_canh_bao',t:'Nước sông dâng cao',k:'Thiên tai',head:1,age:[22,85],w:0.9,pcd:480,cd:240,tier:[0,6],
 x:(c,d)=>{const n=G.tie.ensure(c,{key:'ly_truong_lut',vai:['huong_truong'],nghe:'lý trưởng, người lo việc đê điều của làng',age:R(45,65),main:'eq',tier:1,rel:8,why:'báo nước dâng'});d.npc=n.id;return `Mưa nguồn đổ nhiều ngày, nước sông dâng đến sát bờ đê. ${nm(n)}, ${esc(n.nghe)}, đến từng nhà báo: nếu đê vỡ ở đoạn gần xóm, nhiều nhà sẽ chìm. Ông xin mỗi nhà góp công và của để gia cố đê trong vài ngày tới.`},
 o:(c,d)=>{const n=T(d);if(!n)return gone();return [
  pay('Góp tiền và nhân công gia cố đoạn đê gần xóm, đích thân ra đê',15,{r:[{suc:0.5,eq:0.5,vo:0.2},68],y:c=>{G.tie.rel(n,16,'cùng giữ đê');later(c,'lut_b',2,4,{npc:n.id,ok:1});return `Cả làng chống đê suốt ba đêm, đê giữ được. Nước rút dần, nhà ${N(c)} giữ được ruộng vườn và nhà cửa.`+fx(c,{money:-m(15),suc:-5,eq:2,cfame:3,tam:4,qh:[n.n,16]})},n:c=>{G.tie.rel(n,8,'cùng giữ đê nhưng đê vỡ');later(c,'lut_b',2,4,{npc:n.id,ok:0});return `Đê vỡ một đoạn trong đêm tối, nước tràn vào xóm. Nhà mình lo cứu người và đồ đạc.`+fx(c,{money:-m(25),suc:-8,tam:-5,qh:[n.n,8]})}}),
  {l:'Cho người làm ra đê thay, mình lo di dời đồ lên cao',f:c=>{G.tie.rel(n,-4,'chỉ cho người làm đi');later(c,'lut_b',2,4,{npc:n.id,ok:chance(0.55)?1:0});return `Người làm ra đê, mình và người nhà chuyển đồ đạc quý lên gác. Cẩn thận nhưng bị làng nhìn.`+fx(c,{money:-m(5),tam:-1,cfame:-1,qh:[n.n,-4]})}},
  {l:'Đưa cả nhà sang họ hàng ở chỗ cao, tránh nạn trước',f:c=>{later(c,'lut_b',2,4,{npc:n.id,ok:chance(0.5)?1:0,fled:1});return `Cả nhà lên đường trước khi nước dâng. Nhà cửa để lại cho người làng trông.`+fx(c,{money:-m(6),tam:-2,cfame:-2})}}]}}),
FX({id:'lut_b',t:'Cứu trợ sau lũ',k:'Thiên tai',head:1,
 x:(c,d)=>{const n=T(d);return `${d.ok?'Nước đã rút, đê giữ được, nhưng nhiều ruộng trũng bị phù sa phủ.':'Nước đã rút, để lại bùn đen khắp xóm. Một số nhà mất hết, người bệnh nằm la liệt.'} ${nm(n)} đứng giữa xóm, gọi các nhà khá giả: "Cần người góp gạo và chỗ ở tạm cho nhà bị nạn".`},
 o:(c,d)=>{const n=T(d);if(!n)return gone();return [
  pay('Mở kho cho mượn gạo, nhận vài nhà bị nạn vào ở tạm',30,{f:c=>{G.tie.rel(n,20,'mở kho cứu trợ');addVai(n,'ban_than');later(c,'lut_c',6,12,{npc:n.id,help:1});return `Gian nhà ngang chật ních người. Cháo loãng nấu ngày hai bận. Người làng nhớ ơn.`+fx(c,{money:-m(30),cfame:R(5,8),eq:3,tam:5,qh:[n.n,20]})}}),
  pay('Góp gạo vừa phải vào kho làng, không nhận người ở',12,{f:c=>{G.tie.rel(n,8,'góp gạo vào kho làng');later(c,'lut_c',6,12,{npc:n.id,help:0});return `Gạo góp, tên ghi vào sổ cứu trợ. Việc cứu người để kho làng lo.`+fx(c,{money:-m(12),cfame:2,tam:1,qh:[n.n,8]})}},),
  {l:'Giữ gạo cho nhà, bảo năm nay ai cũng khó',f:c=>{G.tie.rel(n,-18,'giữ gạo');later(c,'lut_c',6,12,{npc:n.id,help:-1});return `Người làng thấy hết. Không ai nói thẳng, nhưng ánh mắt thì khác.`+fx(c,{cfame:-4,eq:-2,tam:-3,qh:[n.n,-18]})}}]}}),
FX({id:'lut_c',t:'Tái thiết sau lũ',k:'Thiên tai',head:1,
 x:(c,d)=>{const n=T(d);return d.help>0?`Mùa nước qua, nhà ${N(c)} được nhiều hộ nhớ ơn. ${nm(n)} đến bàn việc sửa lại đê lớn cho chắc.`:d.help===0?`Làng bắt đầu sửa lại đê và nhà cho nhà bị nạn. ${nm(n)} mời nhà ${N(c)} góp ý.`:`Làng đang sửa đê và nhà, nhưng nhà ${N(c)} bị hỏi vì sao mùa nạn chỉ đứng ngoài. ${nm(n)} nhắc nhẹ.`},
 o:(c,d)=>{const n=T(d);if(!n)return gone();return [
  pay('Đứng ra góp lớn để đắp lại đê chắc hơn, khắc tên nhà trên bia đê',35,{f:c=>{G.tie.rel(n,18,'góp lớn đắp đê');if(d.help<0)G.tie.rel(n,10,'chuộc lỗi');return `Đê mới đắp rộng hơn, cao hơn. Trên bia đê khắc tên người góp công của. Mối quan hệ với làng ấm lại, ${d.help<0?'dù chưa xóa hẳn tiếng cũ':'bền hơn bao giờ hết'}.`+fx(c,{money:-m(35),cfame:R(5,9),eq:2,on:2,tam:5,qh:[n.n,18]})}}),
  {l:'Góp công thay tiền, cùng làng đắp đê',f:c=>{G.tie.rel(n,10,'góp công đắp đê');return `Cả nhà ra đê mấy ngày, mồ hôi cùng người làng. Chuyện cũ phai dần.`+fx(c,{suc:-4,eq:2,cfame:2,tam:3,qh:[n.n,10]})}},
  {l:'Chỉ góp ý, để làng tự lo',f:c=>`Nhà góp một lời rồi thôi. Không ai nhắc, cũng không ai nhớ.`+fx(c,{tam:0})}]}}),
/* ============ CHÙA LÀNG XUỐNG CẤP ============ */
E({id:'tn_chua_xuong_cap',t:'Chùa làng xuống cấp',k:'Tín ngưỡng',head:1,age:[30,85],w:0.9,pcd:600,once:1,tier:[1,6],
 x:(c,d)=>{const n=G.tie.ensure(c,{key:'su_tru_tri',vai:['an_si'],nghe:'sư trụ trì chùa làng, già mà còn minh mẫn',age:R(58,78),main:'tri',tier:0,rel:6,why:'xin sửa chùa'});d.npc=n.id;return `Ngôi chùa nhỏ đầu làng dột, mái vỡ từng mảng. ${nm(n)}, ${esc(n.nghe)}, đến nhà ${N(c)} không xin tiền, chỉ hỏi: nhà có thể giúp lợp lại mái trước mùa mưa không. Ông nói nếu chùa đổ, người làng không còn chỗ gặp nhau trong những ngày tang tóc.`},
 o:(c,d)=>{const n=T(d);if(!n)return gone();return [
  pay('Đứng ra lo lợp lại toàn bộ mái và sơn sửa chánh điện',30,{f:c=>{G.tie.rel(n,24,'lo sửa chùa');addVai(n,'quy_nhan');later(c,'tn_b',12,36,{npc:n.id,big:1});return `Thợ lợp mái suốt hai tuần. Sư thầy dẫn người làng đến khánh thành, đọc kinh cho nhà ${N(c)}.`+fx(c,{money:-m(30),cfame:5,eq:2,tam:7,qh:[n.n,24]})}}),
  pay('Góp vừa đủ lợp lại chỗ dột',10,{f:c=>{G.tie.rel(n,12,'góp tu sửa chùa');later(c,'tn_b',12,36,{npc:n.id,big:0});return `Mái chỉ được lợp tạm, tạm đủ qua mùa mưa. Sư cảm ơn và nhận ra khả năng của nhà.`+fx(c,{money:-m(10),cfame:2,tam:3,qh:[n.n,12]})}}),
  {l:'Từ chối, bảo nhà không dư dả',f:c=>{G.tie.rel(n,-4,'từ chối giúp chùa');return `Sư không nói gì thêm, chắp tay chào rồi đi. Mùa mưa ấy, người làng cầu nguyện dưới mái dột.`+fx(c,{tam:-2,cfame:-1,qh:[n.n,-4]})}}]}}),
FX({id:'tn_b',t:'Sư thầy nhớ ơn',k:'Tín ngưỡng',head:1,
 x:(c,d)=>{const n=T(d);return `Nhiều năm sau, ${nm(n)} đã già yếu, nhắn nhà ${N(c)} đến chùa. ${d.big?'Ông trao lại một món quà quý giá: một cuốn kinh cổ chép tay và một lời nhắn.':'Ông muốn cảm tạ nhà một lần nữa trước khi qua đời.'} Ông nói: "Chùa này còn đứng được nhờ những người như ông bà".`},
 o:(c,d)=>{const n=T(d);if(!n)return gone();return d.big?[
  {l:'Nhận cuốn kinh, hứa giữ gìn và đọc cho con cháu',f:c=>{G.tie.rel(n,20,'nhận lại cuốn kinh');return `Cuốn kinh dày, chữ nho nắn nót. Trong đó có nhiều điều về nhân quả, về sống ở đời. ${N(c)} đem về cất ở nơi cao nhất.`+fx(c,{tri:R(3,5),eq:3,tam:8,cfame:2,hpMax:1,qh:[n.n,20]})}},
  {l:'Xin ông giữ lại kinh cho chùa, nhà chỉ xin lời dạy',f:c=>{G.tie.rel(n,26,'nhường lại kinh cho chùa');return `Ông xúc động, truyền lại những lời dạy cuối cùng. Cả buổi chiều ngồi bên nhau trong yên lặng.`+fx(c,{eq:4,cfame:4,tam:9,qh:[n.n,26]})}}]:[
  {l:'Ngồi bên giường nghe ông dặn dò',f:c=>{G.tie.rel(n,16,'ngồi nghe lời dặn');return `Ông dặn đôi điều về lòng người, về nhân quả. ${N(c)} lắng nghe, mang về những lời giản dị mà thấm.`+fx(c,{eq:3,tam:6,qh:[n.n,16]})}},
  {l:'Gửi lễ nhỏ tạ ơn và về',f:c=>`Mọi việc đơn giản. Chùa vẫn đứng, người làng vẫn đến.`+fx(c,{money:-m(3),tam:1,qh:[n.n,6]})}]}})
];
});
