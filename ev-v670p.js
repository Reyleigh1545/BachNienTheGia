/* Bách Niên Thế Gia v6.7.0-d9.6 · R2: NPC giữ ghế xuất hiện nhiều hơn trong việc thường ngày (thượng quan, đồng liêu thật). Mỗi việc đổi cảm tình (rel) của người thật. */
window.EVF.push(G=>{
const {R,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const FM=v=>G.fmtMoney(v);const N=c=>esc(c.given);
const rich=v=>()=>G.money()>=m(v);
const pay=(l,v,o)=>Object.assign({l:`${l} (${FM(m(v))})`,c:rich(v)},o);
const nbOf=c=>G.npc.boss(c,0),peerOf=c=>G.npc.boss(c,1);
const TQ=o=>Object.assign({tags:{},k:'Quan trường',cd:30,pcd:72,job:['quan'],ms:1,age:[24,75],w:0.9},o);
const rel=(b,v)=>G.npc.add(b.st,'rel',v);
return [
TQ({id:'tq_nho_viec_rieng',t:'Thượng quan nhờ việc riêng',c:c=>c.seat&&c.lv>=1&&!!nbOf(c),
 x:c=>{const b=nbOf(c);return `${esc(b.st.n)}, giữ ${esc(G.seatName(b.key))}, gọi ${N(c)} vào phòng riêng, nhờ lo một việc không nằm trong công vụ: tìm giúp mối cho người cháu vào làm thư lại.`},
 o:c=>{const b=nbOf(c);if(!b)return [{l:'Xin phép lui',f:()=>''}];return [
  {l:'Nhận lời, lo liệu cho chu đáo',r:[{eq:1,tri:0.4},60],y:c=>{rel(b,14);return `Người cháu vào được chỗ làm. ${esc(b.st.n)} nhớ ơn, về sau nhắc tên nhà mình trong các buổi họp.`+fx(c,{fame:3,tam:2})},n:c=>{rel(b,-5);return 'Việc không thành, thượng quan nhã nhặn nhưng lạnh đi thấy rõ.'+fx(c,{tam:-3})}},
  {l:'Từ chối khéo, viện cớ phép nước',f:c=>{rel(b,b.st.tc==='liêm khiết'?8:-10);return b.st.tc==='liêm khiết'?`${esc(b.st.n)} gật đầu, nhìn mình bằng con mắt khác.`:`${esc(b.st.n)} cười nhạt, không nói thêm.`}}]}}),
TQ({id:'tq_dong_lieu_muon_tien',t:'Đồng liêu mượn tiền',c:c=>c.seat&&c.lv>=1&&!!peerOf(c),
 x:c=>{const b=peerOf(c);return `${esc(b.st.n)}, đồng liêu cùng nha môn, ngập ngừng mượn ${N(c)} một món tiền để lo việc nhà. Ông hứa trả sau mùa thu.`},
 o:c=>{const b=peerOf(c);if(!b)return [{l:'Không',f:()=>''}];const v=m(10);return [
  {l:`Cho mượn (${FM(v)})`,c:()=>G.money()>=v,f:c=>{const back=chance(b.st.tc==='tham lam'?0.35:0.8);rel(b,back?12:-4);return back?`Mùa thu ông trả đủ, kèm lời cảm ơn trước mặt đồng liêu.`+fx(c,{fame:2,tam:2}):`Đến mùa thu ông viện cớ khất. Món tiền coi như mất.`+fx(c,{money:-v,tam:-3})}},
  {l:'Từ chối, nói nhà cũng chật',f:c=>{rel(b,-5);return `${esc(b.st.n)} cảm ơn lấy lệ, từ đó ít ghé phòng mình.`}}]}}),
TQ({id:'tq_dong_lieu_giam_cong',t:'Đồng liêu nhận công của mình',c:c=>c.seat&&c.lv>=1&&!!peerOf(c),
 x:c=>{const b=peerOf(c);return `Bản tấu do ${N(c)} thảo được thượng quan khen, nhưng ${esc(b.st.n)} đứng ra nhận phần lớn công. Trong phòng ai cũng biết, chỉ chờ xem mình đáp lại thế nào.`},
 o:c=>{const b=peerOf(c);if(!b)return [{l:'Im lặng',f:()=>''}];return [
  {l:'Thưa thẳng với thượng quan',r:[{eq:0.8,muu:0.5},50],y:c=>{rel(b,-15);return 'Thượng quan xem xét, trả lại công cho mình. Nhưng từ đó có thêm một người không ưa.'+fx(c,{fame:4,merit:2})},n:c=>{rel(b,-10);return 'Thượng quan cho là tranh công, nhắc nhở cả hai.'+fx(c,{fame:-2,tam:-4})}},
  {l:'Nhịn, tìm dịp khác',f:c=>{rel(b,6);return `${esc(b.st.n)} biết điều mình nhịn, về sau dè dặt hơn.`+fx(c,{tam:-2,eq:1})}},
  {l:'Nói riêng với người ấy',r:[{eq:1},55],y:c=>{rel(b,10);return `${esc(b.st.n)} ngượng, hứa lần sau ghi đúng tên.`+fx(c,{tam:2})},n:c=>{rel(b,-8);return `${esc(b.st.n)} chối bay, quay đi.`+fx(c,{tam:-3})}}]}}),
TQ({id:'tq_thuong_quan_mung_tho',t:'Thượng quan có tiệc mừng thọ',c:c=>c.seat&&c.lv>=2&&!!nbOf(c),pcd:120,
 x:c=>{const b=nbOf(c);return `${esc(b.st.n)} làm tiệc mừng thọ. Quan lại trong nha môn góp lễ, ai nấy đều để mắt xem ai dâng gì.`},
 o:c=>{const b=nbOf(c);if(!b)return [{l:'Dự',f:()=>''}];return [
  pay('Dâng lễ thật hậu',15,{f:c=>{rel(b,b.st.tc==='liêm khiết'?-6:14);return b.st.tc==='liêm khiết'?`${esc(b.st.n)} trả lại một nửa, vẻ không vui.`+fx(c,{money:-m(8)}):`${esc(b.st.n)} cười tươi, nhớ tên người dâng lễ.`+fx(c,{money:-m(15),fame:1})}}),
  pay('Dâng lễ vừa, kèm câu đối tự viết',4,{f:c=>{rel(b,10);return `Câu đối được treo giữa nhà. ${esc(b.st.n)} khen cả trước mặt khách.`+fx(c,{money:-m(4),fame:3})}}),
  {l:'Chỉ đến chúc, không lễ',f:c=>{rel(b,2);return 'Một cái chắp tay, xong việc.'}}]}}),
TQ({id:'tq_dong_lieu_bi_hac',t:'Đồng liêu bị đàn hặc',c:c=>c.seat&&c.lv>=2&&!!peerOf(c),pcd:120,
 x:c=>{const b=peerOf(c);return `Ngự sử dâng sớ hặc ${esc(b.st.n)}, đồng liêu của ${N(c)}. Tội chưa rõ nhưng cả nha môn xì xào, ai cũng tránh mặt ông.`},
 o:c=>{const b=peerOf(c);if(!b)return [{l:'Đứng ngoài',f:()=>''}];return [
  {l:'Đứng ra nói giúp trước mặt thượng quan',r:[{eq:0.8,tri:0.5},50],y:c=>{rel(b,22);return `${esc(b.st.n)} thoát tội, nhớ ơn lâu dài.`+fx(c,{fame:4,tam:3})},n:c=>{rel(b,8);return 'Lời nói giúp bị cho là bao che, nhà mình cũng bị để mắt.'+fx(c,{fame:-3,tam:-4})}},
  {l:'Giữ khoảng cách, chờ xem',f:c=>{rel(b,-8);return `Việc qua đi, ${esc(b.st.n)} nhớ ai đã quay lưng.`}},
  {l:'Âm thầm góp thêm bằng chứng',r:[{muu:0.8},45],y:c=>{rel(b,-30);return `${esc(b.st.n)} bị cách chức. Nhà mình không ai biết ai báo.`+fx(c,{fame:2,tam:-2})},n:c=>{rel(b,-30);return 'Bị lộ, người ấy hiểu rõ ai đứng sau.'+fx(c,{fame:-5,tam:-6})}}]}})
];
});
