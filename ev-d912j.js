/* Bách Niên Thế Gia v6.7.10-d9.12 · KÊNH GẶP HOÀNG TỘC CHO NHÀ KHÔNG Ở KINH (chủ dự án 24/11: "chưa từng gặp sự kiện liên quan đến hoàng tộc").
   Trước đây hv_* chỉ ra cho quan từ Tam phẩm ở kinh. Nay có thêm các dịp ở vùng quê: công chúa lễ chùa, hoàng tử đi săn, nội phủ thu mua, người nhà phi tần nhờ vả, thân vương xin lương thảo.
   Mỗi người gặp là hoàng tộc thật (S.dyn.fam), hiện thẻ chân dung (sổ người quen), để lại dấu met và rel; mỗi bước có hậu sự. */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const FM=v=>G.fmtMoney(v);const N=c=>esc(c.given);
const F=()=>G.fam.ens();
const royal=roles=>{const f=F();return [f.hau,f.thai].concat(f.phi,f.tu,f.cong,f.vuong,f.qc).filter(p=>p&&p.dead==null&&(!roles||roles.includes(p.role)))};
const rname=p=>p?G.fam.name(p):'một người trong hoàng tộc';
const meet=(p,v)=>{if(p){p.met=1;p.rel=Math.max(-100,Math.min(100,(p.rel||0)+(v||0)))}return ''};
const card=(d,p)=>{if(!p)return;const n=G.led.np.fam(p);if(n)d.npc=n.id};
const pay=(l,v,o)=>Object.assign({l:`${l} (${FM(m(v))})`,c:()=>G.money()>=m(v)},o);
const E=o=>Object.assign({tags:{},k:'Hoàng tộc',cd:48,pcd:120,ms:1},o);
const FX=o=>Object.assign({tags:{},k:'Hoàng tộc',fixed:1,ms:1},o);
const P=d=>d&&d.p?G.fam.person(d.p):null;
return [
/* ============ Công chúa lễ chùa ============ */
E({id:'hv_cong_chua_chua',t:'Công chúa lễ chùa',head:1,age:[24,80],tier:[1,6],w:1.3,c:c=>royal(['cong']).some(p=>(p.age||0)>=14)&&!!G.homeP(),
 x:(c,d)=>{const L=royal(['cong']).filter(p=>(p.age||0)>=14);const p=pick(L);d.p=p.id;card(d,p);return `${esc(rname(p))}, ${p.age} tuổi, theo thánh chỉ về lễ chùa lớn trong vùng. Ngựa xe rợp đường, quan sở tại lo dọn dẹp, mời các nhà có tiếng ra tiếp. Nhà ${N(c)} được gọi phụ giúp dọn đường và dâng cơm chay.`},
 o:(c,d)=>{const p=P(d);if(!p)return [{l:'Đứng xem',f:()=>''}];return [
  pay('Dâng cơm chay, đón rước chu đáo',12,{f:c=>meet(p,12)+`${esc(rname(p))} dùng cơm chay, hỏi thăm gia cảnh. Cả vùng thấy nhà mình được công chúa nhớ mặt.`+fx(c,{money:-m(12),cfame:3,eq:2,tam:4,qh:[rname(p),12]})}),
  {l:'Góp công dọn đường, không dâng lễ lớn',f:c=>meet(p,5)+`Công chúa đi qua, khẽ gật đầu. Quan sở tại ghi tên nhà mình vào sổ người có công.`+fx(c,{cfame:1,eq:1,tam:2,qh:[rname(p),5]})},
  {l:'Xin được dâng một bức thêu của người nhà',c:c=>G.kinList(c,q=>q.g==='nữ'&&G.age(q)>=14&&q.mi>=55).length>0,go:(c,d2)=>G.pickKin(c,{eyebrow:'Hoàng tộc',title:'Ai dâng bức thêu',text:'Người được chọn đứng trước công chúa. Tay nghề và cách ứng xử quyết định kết quả.',filter:q=>q.g==='nữ'&&G.age(q)>=14&&q.mi>=55,cb:w=>{const win=chance(Math.max(0.3,Math.min(0.85,(w.mi+w.eq)/220)));if(win){meet(p,18);G.later(c,'hv_cong_chua_b',R(12,36),{p:p.id,w:w.id});return `Công chúa xem bức thêu của ${esc(w.given)}, khen nét kim mịn và hỏi chuyện. Người nhà được ghi nhớ.`+fx(w,{mi:1,eq:2,tam:7})+fx(c,{cfame:3,qh:[rname(p),18]})}meet(p,2);return `Bức thêu của ${esc(w.given)} bị đem so với đồ cung phụng, chỉ nhận một lời cảm ơn lịch sự.`+fx(w,{tam:-3})}})},
  {l:'Cáo bận, để người làm lo',f:c=>meet(p,-3)+`Công chúa không để ý, nhưng quan sở tại ghi nhận nhà vắng mặt.`+fx(c,{cfame:-1})}]}}),
FX({id:'hv_cong_chua_b',t:'Công chúa nhớ lại',head:1,
 x:(c,d)=>{const p=P(d);const w=d.w?G.P(d.w):null;card(d,p);return p?`Một nội thị mang thư từ kinh: ${esc(rname(p))} nhớ lần lễ chùa năm nào, ${w?esc(w.given)+' có tay thêu đẹp':'nhà có người khéo tay'}. Công chúa muốn mời đến kinh dạy nghề cho cung nhân một thời gian ngắn.`:'Thư từ kinh.'},
 o:(c,d)=>{const p=P(d);const w=d.w?G.P(d.w):null;if(!p||!w||w.dead!=null)return [{l:'Viết thư tạ ơn',f:c=>meet(p,3)+'Thư tạ ơn đi, không có phúc đáp.'+fx(c,{tam:1})}];return [
  {l:`Cho ${esc(w.given)} lên kinh dạy nghề`,f:c=>{meet(p,15);G.later(c,'kinh_ve_tin',R(18,36),{w:w.id,ok:1});return `${esc(w.given)} lên kinh, ở cung mấy tháng, được ban thưởng và học nhiều điều về lễ nghi cung đình.`+fx(w,{mi:R(2,4),eq:R(3,5),tam:6})+fx(c,{money:m(R(20,40)),cfame:4,qh:[rname(p),15]})}},
  {l:'Từ chối khéo vì nhà thiếu người',f:c=>meet(p,-5)+`Công chúa không giận, nhưng cơ hội trôi qua.`+fx(c,{tam:-2,qh:[rname(p),-5]})}]}}),
/* ============ Hoàng tử đi săn ============ */
E({id:'hv_hoang_tu_san',t:'Hoàng tử đi săn qua vùng',head:1,age:[24,70],tier:[1,6],w:1.3,c:c=>royal(['tu']).some(p=>(p.age||0)>=14)&&!!G.homeP(),
 x:(c,d)=>{const L=royal(['tu']).filter(p=>(p.age||0)>=14);const p=pick(L);d.p=p.id;card(d,p);return `${esc(rname(p))}, ${p.age} tuổi, đi săn cùng đoàn tùy tùng qua rừng núi nhà ${N(c)}. Lý trưởng cần một người thông thuộc đường rừng dẫn đường, và nhà ${N(c)} được tiến cử.`},
 o:(c,d)=>{const p=P(d);if(!p)return [{l:'Từ chối',f:()=>''}];return [
  {l:'Tự dẫn đường, tránh đoạn nguy hiểm',c:c=>c.vo>=35,r:[{vo:0.6,tri:0.5,eq:0.4},55],y:c=>{meet(p,16);G.later(c,'hv_hoang_tu_b',R(18,60),{p:p.id});return `Đoàn săn được thú lớn, hoàng tử hài lòng, nhớ mặt người dẫn đường.`+fx(c,{vo:R(1,3),eq:2,cfame:3,tam:5,qh:[rname(p),16]})},n:c=>{meet(p,-4);return `Dẫn nhầm vào đoạn rừng khó đi, một tùy tùng bị thương. Hoàng tử không trách nhưng nhà mình áy náy.`+fx(c,{suc:-R(5,10),tam:-4,qh:[rname(p),-4]})}},
  {l:'Cử một người trong nhà giỏi võ dẫn đường',c:c=>G.kinList(c,q=>q.g==='nam'&&G.age(q)>=16&&q.vo>=45).length>0,go:(c,d2)=>G.pickKin(c,{eyebrow:'Hoàng tộc',title:'Ai dẫn đường',text:'Người được chọn đi cùng đoàn săn mấy ngày. Võ lực, sức khỏe và sự khéo léo quyết định kết quả.',filter:q=>q.g==='nam'&&G.age(q)>=16&&q.vo>=45,cb:w=>{const win=chance(Math.max(0.3,Math.min(0.85,(w.vo+w.suc+w.eq)/280)));if(win){meet(p,14);G.later(c,'hv_hoang_tu_b',R(18,60),{p:p.id,w:w.id});return `${esc(w.given)} dẫn đoàn săn gọn gàng, được hoàng tử ban cung tên.`+fx(w,{vo:R(2,4),eq:2,tam:6})+fx(c,{cfame:3,qh:[rname(p),14]})}meet(p,-2);return `${esc(w.given)} dẫn đoàn đi lạc nửa ngày, bị khiển trách nhẹ.`+fx(w,{eq:1,tam:-4})}})},
  pay('Dâng thịt rừng, rượu, ngựa cho đoàn săn',10,{f:c=>meet(p,8)+`Đoàn săn nhận lễ, hoàng tử nghe tên nhà qua lời lý trưởng.`+fx(c,{money:-m(10),cfame:1,qh:[rname(p),8]})}),
  {l:'Xin từ chối, nhà không quen đường rừng',f:c=>meet(p,-2)+`Lý trưởng gọi người khác.`+fx(c,{tam:-1})}]}}),
FX({id:'hv_hoang_tu_b',t:'Hoàng tử nhớ ơn',head:1,
 x:(c,d)=>{const p=P(d);card(d,p);return p?`${esc(rname(p))} gửi người đến: ${p.td==='nghi'?'đang bị triều đình để mắt, mong tìm người cùng chí hướng':'đang cần một vài người tin cẩn quanh mình'}. Người mang thư hỏi nhà ${N(c)} có muốn qua lại thân tình không.`:'Có thư từ hoàng tử.'},
 o:(c,d)=>{const p=P(d);if(!p)return [{l:'Thôi',f:()=>''}];return [
  {l:'Nhận lời, giữ qua lại thư từ',r:[{eq:0.8,muu:0.5},50],y:c=>{meet(p,18);G.later(c,'hv_hoang_tu_c',R(24,72),{p:p.id});return `Hai bên qua lại thân tình. Hoàng tử nhờ nhà ghi chép việc dân trong vùng.`+fx(c,{eq:2,sk:{muu:2},cfame:3,tam:4,qh:[rname(p),18]})},n:c=>{meet(p,-3);return `Qua lại bị người ngoài để ý. Có kẻ xì xào nhà mình "đứng về một phía".`+fx(c,{tam:-5,fame:-2,qh:[rname(p),-3]})}},
  {l:'Từ chối khéo, nói nhà chỉ lo ruộng nương',f:c=>meet(p,-4)+`Hoàng tử không ép. Nhà mình giữ được thân phận bình lặng.`+fx(c,{tam:2,qh:[rname(p),-4]})}]}}),
/* ============ Nội phủ thu mua ============ */
E({id:'hv_noi_phu_thu_mua',t:'Nội phủ thu mua',head:1,age:[28,75],tier:[2,6],w:0.5,c:c=>(G.S().biz||[]).length>0&&!!G.homeP(),
 x:(c,d)=>{const n=G.tie.ensure(c,{key:'thai_giam_noi_phu',vai:['khach'],nghe:'thái giám Nội phủ về vùng thu mua',age:R(40,60),main:'eq',tier:5,rel:0,why:'Nội phủ thu mua'});d.npc=n.id;return `${esc(n.n)}, ${esc(n.nghe)}, đến tận cơ sở nhà ${N(c)}: cung cần một lô hàng lớn, trả theo giá "triều đình định". Ai cũng biết giá ấy thấp hơn chợ, nhưng từ chối thì rất khó nói.`},
 o:(c,d)=>{const n=G.tie.get(d.npc);if(!n)return [{l:'Thôi',f:()=>''}];const v=m(40);return [
  {l:'Nhận cung cấp đủ lô hàng, chịu giá thấp',c:()=>G.money()>=v,f:c=>{G.tie.rel(n,15,'cung cấp đủ hàng');addVai(n,'quy_nhan');G.later(c,'tie_quy_nhan_giup',R(24,72),{npc:n.id});return `Hàng đủ, tiền thu về thấp hơn giá chợ nhưng đổi lại có tên trong sổ nhà cung phụng. ${esc(n.n)} nhớ ơn.`+fx(c,{money:-Math.round(v*0.4),cfame:4,eq:2,tam:3,qh:[n.n,15]})}},
  pay('Dâng thêm lễ riêng để được giá khá hơn',12,{r:[{khau:0.8,eq:0.5},50],y:c=>{G.tie.rel(n,22,'dâng lễ riêng');return `${esc(n.n)} nhận lễ, nâng giá. Lô hàng vừa đủ lãi, nhà thành nhà cung phụng thường xuyên.`+fx(c,{money:m(18)-m(12),cfame:3,liem:-3,qh:[n.n,22]})},n:c=>{G.tie.rel(n,-15,'lễ không đủ lòng');return `Lễ nhẹ quá, ${esc(n.n)} mỉm cười, giá vẫn thấp.`+fx(c,{money:-m(12)-Math.round(v*0.3),tam:-3,qh:[n.n,-15]})}}),
  {l:'Xin hoãn, nói hàng chưa đủ',f:c=>{G.tie.rel(n,-8,'xin hoãn');return `${esc(n.n)} bảo "sẽ ghi nhận". Thiện cảm hao đi một chút.`+fx(c,{tam:-2,qh:[n.n,-8]})}}]}}),
/* ============ Người nhà phi tần ============ */
E({id:'hv_ho_phi_tan',t:'Họ hàng của phi tần',head:1,age:[30,80],tier:[1,6],w:0.45,c:c=>royal(['phi']).length>0,
 x:(c,d)=>{const p=pick(royal(['phi']));d.p=p.id;card(d,p);const n=G.tie.ensure(c,{key:'ho_phi_tan',vai:['quen'],nghe:'người họ hàng xa của một phi tần trong cung',age:R(35,60),main:'eq',tier:2,rel:0,why:'nhờ cậy'});d.npc2=n.id;return `${esc(n.n)}, ${esc(n.nghe)}, đến nhà ${N(c)} xin ở nhờ mấy tháng và nhờ gửi thư vào cung: ${esc(rname(p))} đang ${p.td==='nghi'?'bị lạnh nhạt':'được sủng ái'}, họ hàng vài người nhờ hơi mà làm càn trong vùng.`},
 o:(c,d)=>{const p=P(d);const n=G.tie.get(d.npc2);if(!p||!n)return [{l:'Thôi',f:()=>''}];return [
  {l:'Cho ở nhờ, giữ lễ, không nhờ vả ngược lại',f:c=>{G.tie.rel(n,12,'cho ở nhờ');meet(p,6);return `${esc(n.n)} ở yên mấy tháng rồi về, mang theo lời tạ. Tin về nhà mình đến tai ${esc(rname(p))}.`+fx(c,{money:-m(3),cfame:2,eq:1,tam:3,qh:[n.n,12]})}},
  {l:'Nhờ gửi thư vào cung, xin lời nói giúp cho con em',r:[{eq:0.7,khau:0.5},40],y:c=>{meet(p,10);G.tie.rel(n,8,'gửi thư giúp');return `Thư đến tay ${esc(rname(p))}, một lời nói giúp đủ để người nhà mình được để ý.`+fx(c,{eq:2,cfame:3,tam:3,qh:[rname(p),10]})},n:c=>{meet(p,-6);G.tie.rel(n,-6,'nhờ vả bị lộ');return `Lá thư bị người khác đọc trước, nhà bị xem là kẻ bám váy phi tần.`+fx(c,{fame:-4,tam:-5,qh:[rname(p),-6]})}},
  {l:'Từ chối ở nhờ, chỉ tiếp một bữa',f:c=>{G.tie.rel(n,-10,'bị từ chối ở nhờ');return `${esc(n.n)} vẻ mặt không vui. Nhà mình giữ khoảng cách an toàn.`+fx(c,{tam:-1,qh:[n.n,-10]})}}]}}),
/* ============ Thân vương xin lương thảo ============ */
E({id:'hv_vuong_xin_luong',t:'Thân vương xin góp lương',head:1,age:[30,80],tier:[3,6],w:0.5,c:c=>royal(['vuong']).length>0&&!!G.homeP(),
 x:(c,d)=>{const p=pick(royal(['vuong']));d.p=p.id;card(d,p);return `Phủ ${esc(rname(p))} gửi người đến các nhà có của trong vùng, xin góp lương thảo "cho việc triều đình". Nhà ${N(c)} nằm trong danh sách. Ai cũng hiểu đây là lệ thân vương gom của, nhưng từ chối thì không tiện.`},
 o:(c,d)=>{const p=P(d);if(!p)return [{l:'Thôi',f:()=>''}];const v=m(30);return [
  pay('Góp một khoản lớn',30,{f:c=>meet(p,18)+`Phủ ${esc(rname(p))} ghi tên nhà vào sổ người có công. Thân vương không quên.`+fx(c,{money:-v,cfame:4,eq:1,tam:2,qh:[rname(p),18]})}),
  pay('Góp vừa phải, nói rõ nhà chỉ có nhiêu đó',12,{f:c=>meet(p,6)+`Người phủ nhận, không nói gì thêm.`+fx(c,{money:-m(12),cfame:1,qh:[rname(p),6]})}),
  {l:'Nói thẳng nhà không có dư, xin miễn',r:[{eq:0.8,gan:0.5},40],y:c=>{meet(p,4);return `Người phủ nhìn gia cảnh rồi gật đầu bỏ qua. Nhà mình được tiếng ngay thẳng.`+fx(c,{eq:2,cfame:1,tam:3,qh:[rname(p),4]})},n:c=>{meet(p,-10);return `Phủ thân vương ghi nhà mình là "keo kiệt với triều đình". Có người tố nhà lên quan huyện.`+fx(c,{tam:-4,fame:-2,qh:[rname(p),-10]})}}]}})
];
function addVai(n,v){if(!n.vai.includes(v)){n.vai.push(v);n.vaiTxt=n.vai.map(x=>G.tie.VAI[x]||x).join(', ')}}
});
