/* Bách Niên Thế Gia v6.7.10-d9.12 · CỐT TRUYỆN MỤC TIÊU LỚN "Biên soạn gia phả họ" tpha_* (5 bước, kết lớn) và ba kỳ ngộ gia tộc ky_gt_*.
   Gia phả: tìm người biết chữ, đi tìm họ hàng xa (người thật), giải quyết tranh cãi về thế thứ, khắc in, lễ ra mắt. Kết lớn: cả họ nhận bản gia phả, trẻ trong nhà học được gia huấn (cộng chỉ số), có thêm quan hệ họ hàng bền. */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const FM=v=>G.fmtMoney(v);const N=c=>esc(c.given);
const T=d=>d&&d.npc?G.tie.get(d.npc):null;const nm=n=>esc(n?n.n:'người ấy');
const addVai=(n,v)=>{if(n&&!n.vai.includes(v)){n.vai.push(v);n.vaiTxt=n.vai.map(x=>G.tie.VAI[x]||x).join(', ')}};
const pay=(l,v,o)=>Object.assign({l:`${l} (${FM(m(v))})`,c:()=>G.money()>=m(v)},o);
const E=o=>Object.assign({tags:{}},o);
const FX=o=>Object.assign({tags:{},fixed:1},o);
const hf=c=>{c.flags=c.flags||{};return c.flags};
const later=(c,id,lo,hi,d)=>G.later(c,id,R(lo,hi),d||{});
const gone=()=>[{l:'Thôi',f:()=>''}];
const youngKin=c=>G.kinList(c,p=>G.age(p)>=6&&G.age(p)<=26&&p.dead==null);
return [
E({id:'tpha_y_dinh',t:'Ý định biên soạn gia phả',k:'Mục tiêu gia tộc',head:1,age:[45,85],tier:[2,6],once:1,w:0.9,pcd:900,c:c=>G.alive().filter(p=>G.inClan(p)).length>=6&&G.money()>=m(30),
 x:(c,d)=>{const n=G.tie.ensure(c,{key:'thay_do_tpha',g:'nam',vai:['thay'],nghe:'thầy đồ già giỏi chữ nho, thạo gia phả các họ trong vùng',age:R(55,75),main:'tri',st:{tri:R(78,95),eq:R(60,80)},tier:2,rel:6,why:'được nhờ biên soạn gia phả'});d.npc=n.id;hf(c).tpha={sc:0};return `Trong nhà đã có nhiều đời, tên các cụ đời trước chỉ còn trên mấy mảnh giấy lẻ và trí nhớ người già. ${N(c)} nghĩ đã đến lúc biên soạn một bản gia phả cho dòng họ, để con cháu biết gốc rễ. ${nm(n)}, ${esc(n.nghe)}, là người có thể giúp, nhưng ông cũng đã già.`},
 o:(c,d)=>{const n=T(d);if(!n)return gone();return [
  pay('Mời thầy đồ về ở hẳn trong nhà, trả công đàng hoàng để làm trọn việc',30,{f:c=>{hf(c).tpha.sc+=2;G.tie.rel(n,20,'được mời biên soạn gia phả');later(c,'tpha_b',6,14,{npc:n.id,sc:2});return `Thầy đồ dọn bàn viết ở gian nhà ngang, ngày nào cũng ghi chép. Ông bảo: "Cần đi tìm họ hàng xa để đối chiếu".`+fx(c,{money:-m(30),tri:1,eq:1,tam:4,qh:[n.n,20]})}}),
  pay('Nhờ thầy đồ chỉ cách, tự mình làm lấy phần việc chính',12,{f:c=>{hf(c).tpha.sc+=0;G.tie.rel(n,10,'chỉ cách biên soạn');later(c,'tpha_b',8,18,{npc:n.id,sc:0});return `Thầy đồ chỉ cho cách chia phần, cách ghi thế thứ. Phần việc còn lại dồn lên nhà mình.`+fx(c,{money:-m(12),tri:R(1,2),tam:1,qh:[n.n,10]})}}),
  {l:'Hoãn lại, chưa phải lúc',f:c=>{hf(c).tpha=null;return `Ý định tạm gác. Tên các cụ vẫn nằm trên mấy mảnh giấy lẻ.`+fx(c,{tam:-1})}}]}}),
FX({id:'tpha_b',t:'Đi tìm họ hàng xa',k:'Mục tiêu gia tộc',head:1,
 x:(c,d)=>{const n=T(d);const r=G.tie.ensure(c,{key:'ho_xa_tpha',vai:['quen'],nghe:'một người họ hàng xa cùng gốc, ở vùng khác, giữ một bản gia phả cũ',age:R(50,70),main:'eq',tier:Math.max(1,G.tierIdx()-1),rel:4,why:'giữ bản gia phả cũ'});d.rv=r.id;return `Để đối chiếu, ${nm(n)} bảo cần một bản gia phả cũ của nhánh khác. Có tin ${nm(r)}, ${esc(r.nghe)}, còn giữ một bản chép tay từ mấy đời trước. Đường xa, ông ấy chưa chắc chịu cho xem.`},
 o:(c,d)=>{const n=T(d);const r=G.tie.get(d.rv);if(!n||!r)return gone();const f=hf(c).tpha||{sc:0};return [
  {l:'Đích thân đi thăm, mang lễ vật và thiệp mời nhập gia phả chung',c:()=>G.money()>=m(10),r:[{eq:0.9,mi:0.3,khau:0.3},58],y:c=>{f.sc+=2;G.tie.rel(r,24,'được thăm hỏi tận nơi');addVai(r,'ban_than');later(c,'tpha_c',6,14,{npc:d.npc,rv:d.rv,sc:(d.sc||0)+2});return `${nm(r)} cảm động vì đường xa mà đến, mang bản gia phả cũ ra, kể thêm nhiều chuyện đời trước mà sách không có.`+fx(c,{money:-m(10),suc:-3,eq:2,tam:6,qh:[r.n,24]})},n:c=>{f.sc-=1;G.tie.rel(r,-4,'ngại chia sẻ gia phả cũ');later(c,'tpha_c',6,14,{npc:d.npc,rv:d.rv,sc:(d.sc||0)-1});return `${nm(r)} tiếp khách lịch sự nhưng bảo bản cũ đã mục, chỉ cho chép một phần.`+fx(c,{money:-m(10),suc:-3,tam:-2,qh:[r.n,-4]})}},
  {l:'Viết thư, nhờ người tin cậy mang đi',r:[{tri:0.6,eq:0.5},44],y:c=>{f.sc+=1;G.tie.rel(r,10,'trả lời thư');later(c,'tpha_c',8,16,{npc:d.npc,rv:d.rv,sc:(d.sc||0)+1});return `Mấy tháng sau có thư trả lời kèm vài trang chép tay. Thiếu nhiều nhưng đủ để làm tiếp.`+fx(c,{tam:2,qh:[r.n,10]})},n:c=>{f.sc-=1;later(c,'tpha_c',8,16,{npc:d.npc,rv:d.rv,sc:(d.sc||0)-1});return `Thư đi mà không có hồi âm. Đành làm với những gì đang có.`+fx(c,{tam:-2})}},
  {l:'Bỏ qua họ hàng xa, chỉ dựa vào nhánh mình',f:c=>{f.sc-=2;later(c,'tpha_c',6,14,{npc:d.npc,rv:d.rv,sc:(d.sc||0)-2,alone:1});return `Gia phả chỉ gói gọn trong nhánh nhà mình, thiếu phần gốc rễ xa.`+fx(c,{tam:-1})}}]}}),
FX({id:'tpha_c',t:'Tranh cãi về thế thứ',k:'Mục tiêu gia tộc',head:1,
 x:(c,d)=>{const n=T(d);return `Bản nháp đã có hình hài. Rồi một đoạn gây tranh cãi: ${nm(n)} phát hiện hai nhánh trong họ ghi khác nhau về người đời thứ ba, ${d.alone?'nhà mình chỉ có một nguồn nên khó phân xử':'bản của họ hàng xa và bản nhà mình mâu thuẫn'}. Mấy người lớn tuổi trong họ cũng bắt đầu tranh luận.`},
 o:(c,d)=>{const n=T(d);if(!n)return gone();const f=hf(c).tpha||{sc:0};return [
  {l:'Họp họ, cho mỗi người nói ý kiến, chọn bản đa số công nhận',r:[{eq:1,khau:0.5,tri:0.3},54+(d.sc||0)*2],y:c=>{f.sc+=2;later(c,'tpha_d',8,18,{npc:d.npc,sc:(d.sc||0)+2});return `Cuộc họp kéo dài đến khuya, cuối cùng đa số nhất trí. Không ai thắng thua, đều thấy mình được lắng nghe.`+fx(c,{eq:3,cfame:2,tam:5})},n:c=>{f.sc-=1;later(c,'tpha_d',8,18,{npc:d.npc,sc:(d.sc||0)-1});return `Cuộc họp biến thành cãi vã, hai người lớn bỏ ra về. Việc phải hoãn thêm.`+fx(c,{tam:-5,cfame:-1})}},
  {l:'Nhờ thầy đồ đối chiếu sử liệu và quyết định, mọi người phải theo',r:[{tri:0.8,eq:0.4},56],y:c=>{f.sc+=1;G.tie.rel(n,10,'được giao quyết định');later(c,'tpha_d',8,18,{npc:d.npc,sc:(d.sc||0)+1});return `Thầy đồ quyết định dựa trên nhiều bằng chứng, giọng chắc chắn. Mọi người phục lý, dù một vài người còn lầm bầm.`+fx(c,{tri:1,tam:2,qh:[n.n,10]})},n:c=>{f.sc-=1;G.tie.rel(n,-6,'bị chống đối quyết định');later(c,'tpha_d',8,18,{npc:d.npc,sc:(d.sc||0)-1});return `Quyết định bị chống đối, thầy đồ buồn và nói muốn rút lui. Phải xoa dịu mãi.`+fx(c,{tam:-4,qh:[n.n,-6]})}},
  {l:'Ghi cả hai cách, chú thích nghi vấn, để đời sau xét',f:c=>{f.sc+=0;later(c,'tpha_d',8,18,{npc:d.npc,sc:(d.sc||0)});return `Gia phả ghi trung thực những điểm còn nghi vấn. Không ai hài lòng hoàn toàn nhưng ai cũng thấy ngay thẳng.`+fx(c,{tri:1,eq:1,tam:1})}}]}}),
FX({id:'tpha_d',t:'Khắc in gia phả',k:'Mục tiêu gia tộc',head:1,
 x:(c,d)=>{const n=T(d);return `Bản thảo hoàn chỉnh. ${nm(n)} đề xuất: ${(d.sc||0)>=4?'đem khắc ván in cho mỗi nhánh có một bản, để lưu truyền lâu dài':'chép tay thành vài bản, nhà nào cũng có một bản'}. Chi phí và cách làm quyết định bản gia phả sống được bao lâu.`},
 o:(c,d)=>{const n=T(d);if(!n)return gone();return [
  pay('Thuê thợ khắc ván gỗ, in nhiều bản cho mọi nhánh và để lại ván cho đời sau',45,{f:c=>{G.tie.rel(n,16,'khắc ván in gia phả');later(c,'tpha_e',3,8,{npc:d.npc,sc:(d.sc||0)+2,print:1});return `Thợ khắc làm cả mùa, từng trang ván gỗ thơm mùi mới. Bản in đầu tiên sắc nét, đẹp lạ.`+fx(c,{money:-m(45),cfame:3,eq:1,tam:5,qh:[n.n,16]})}}),
  pay('Chép tay thành năm bản, nhờ người khéo chữ',15,{f:c=>{G.tie.rel(n,8,'chép tay gia phả');later(c,'tpha_e',3,8,{npc:d.npc,sc:(d.sc||0)+1,print:0});return `Năm bản chép tay đều đẹp, phát cho năm nhánh. Dùng được, nhưng sẽ mục theo thời gian.`+fx(c,{money:-m(15),tam:3,qh:[n.n,8]})}}),
  {l:'Chỉ giữ một bản duy nhất ở từ đường',f:c=>{later(c,'tpha_e',3,8,{npc:d.npc,sc:(d.sc||0)-1,print:0,single:1});return `Một bản duy nhất, đặt ở từ đường. Rẻ nhưng không nhánh nào mang về nhà được.`+fx(c,{tam:-1})}}]}}),
FX({id:'tpha_e',t:'Lễ ra mắt gia phả',k:'Mục tiêu gia tộc',head:1,
 x:(c,d)=>{const n=T(d);return `Ngày lễ ra mắt gia phả. Cả họ tụ về từ đường, ${d.print?'bản in được đặt trang trọng trên án thư':d.single?'bản duy nhất đặt trên bàn thờ':'các bản chép tay xếp thành hàng'}. ${nm(n)} đứng bên, lòng đầy cảm xúc: "Làm xong việc này tôi mãn nguyện".`},
 o:(c,d)=>{const n=T(d);if(!n)return gone();const good=(d.sc||0)>=4;return [
  {l:'Đọc lời mở đầu, đọc tên từng đời tổ tiên, dâng hương',f:c=>{G.tie.rel(n,24,'cùng ra mắt gia phả');addVai(n,'quy_nhan');const L=youngKin(c);L.forEach(p=>{G.addStat(p,'tri',good?3:2);G.addStat(p,'eq',good?3:2)});G.cf(good?10:5,'Gia phả họ '+S().surname+' ra mắt');return `Mọi người lặng đi khi tên các cụ được xướng lên từng đời. ${good?'Cả từ đường rưng rưng.':'Không khí trang trọng.'} Con cháu trong nhà học được gia huấn từ những dòng chữ ấy.`+fx(c,{eq:3,cfame:good?R(8,14):R(4,7),on:good?5:3,tam:9,hpMax:good?1:0,qh:[n.n,24]})}},
  {l:'Tặng mỗi nhánh một lễ vật nhỏ và lời cảm tạ, mời cả họ dùng cơm đoàn viên',c:()=>G.money()>=m(12),f:c=>{G.tie.rel(n,16,'cùng ăn cơm đoàn viên');const L=youngKin(c);L.forEach(p=>G.addStat(p,'eq',1));return `Bữa cơm đoàn viên lớn nhất trong nhiều năm. Các nhánh xa gần nhau hơn.`+fx(c,{money:-m(12),eq:2,cfame:3,on:4,tam:8,qh:[n.n,16]})}}]}}),
/* ============ KỲ NGỘ GIA TỘC (3) ============ */
E({id:'ky_gt_ky_vat_thuyen',t:'Vật lạ do con sông mang đến',k:'Kỳ ngộ gia tộc',ky:1,good:1,u:'clan',cyc:[35,70],head:1,age:[28,85],w:0.5,
 x:c=>`Sau trận lụt, con sông để lại trước cửa nhà một chiếc rương gỗ bọc đồng, nửa chìm trong bùn. Bên trong là mấy cuốn sách cổ ghi chép nghề đóng thuyền và đo dòng sông, chữ viết lạ nhưng tinh tế.`,
 o:c=>[
  {l:'Nhờ thầy đồ dịch dần, ai trong nhà thích nghề thì học',f:c=>{const L=youngKin(c);L.slice(0,2).forEach(p=>{G.addStat(p,'tri',3);G.addStat(p,'eq',1)});return `Thầy đồ mất cả mùa để dịch một phần. Hai đứa trẻ say mê, học được cách đo, cách tính. Nhà có thêm một nghề để dựa vào.`+fx(c,{tri:2,tam:4})}},
  {l:'Bán cho nhà buôn thuyền lớn',f:c=>`Nhà buôn trả giá cao vì biết giá trị thật. Số tiền đủ sửa lại mái nhà và mua thêm sách.`+fx(c,{money:m(R(30,60)),tam:3})},
  {l:'Đem trình quan huyện, xin ghi công',f:c=>`Quan huyện mừng rỡ vì sách có ích cho việc trị thủy. Ông ghi công và gửi lời khen lên trên.`+fx(c,{cfame:R(5,9),fame:3,eq:1,tam:4})}]})
];
});
