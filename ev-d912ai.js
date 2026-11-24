/* Bách Niên Thế Gia v6.7.10-d9.12 · VIẾT LẠI kn_cu_ao_cho_muon với HẬU SỰ THẬT (luật R2: "hứa lo giỗ cụ" phải có việc xảy ra): cụ già là người thật, nhận lời thì vài năm sau cụ mất, có bước lo giỗ (kn_cu_ao_mat) và hậu quả theo cách mình giữ lời. Bản cũ đã xóa bằng tools/rmev.js. */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const FM=v=>G.fmtMoney(v);const N=c=>esc(c.given);
const T=d=>d&&d.npc?G.tie.get(d.npc):null;const nm=n=>esc(n?n.n:'cụ');
const addVai=(n,v)=>{if(n&&!n.vai.includes(v)){n.vai.push(v);n.vaiTxt=n.vai.map(x=>G.tie.VAI[x]||x).join(', ')}};
const pay=(l,v,o)=>Object.assign({l:`${l} (${FM(m(v))})`,c:()=>G.money()>=m(v)},o);
const gone=()=>[{l:'Thôi',f:()=>''}];
return [
{id:'kn_cu_ao_cho_muon',cyc:[20,35],t:'Cụ già cho mượn đất',tier:[0,5],k:'Kỳ ngộ',ky:1,good:1,u:'clan',tags:{},
 x:(c,d)=>{const n=G.tie.ensure(c,{key:'cu_gia_neo_don',g:'nam',vai:['lang_gieng'],nghe:'cụ già neo đơn trong làng, không con cháu, tay run nhưng vẫn tự làm vườn',age:R(70,86),tier:0,rel:12,why:'cho mượn đất, nhờ lo giỗ'});d.npc=n.id;return `${nm(n)}, ${esc(n.nghe)}, gọi ${N(c)} đến: cụ muốn cho mượn một mảnh đất trồng rau để sống cuối đời, đổi lại chỉ cần có người lo giỗ cụ sau này.`},
 o:(c,d)=>{const n=T(d);if(!n)return gone();return [
  {l:'Nhận lời, hứa lo giỗ cụ, sang đất cụ trồng rau cùng cụ',f:c=>{G.tie.rel(n,28,'nhận lời lo giỗ');addVai(n,'quy_nhan');G.tie.later(n,c,'kn_cu_ao_mat',R(30,96),{promised:1});return `Cụ mừng rỡ, trao mảnh vườn nhỏ. Hai bên cùng làm vườn, mấy năm ríu rít chuyện nhà. Nhà mình thêm mối tình nghĩa dài, và một lời hứa phải giữ.`+fx(c,{money:m(5),fame:4,eq:2,tam:6,qh:[n.n,28]})}},
  {l:'Giúp cụ hết lòng nhưng không nhận đất',f:c=>{G.tie.rel(n,22,'giúp cụ không nhận đất');G.tie.later(n,c,'kn_cu_ao_mat',R(30,96),{promised:0});return `Cụ cảm động, tiếng nhà biết trọng người già vang trong xóm. Cụ vẫn tự làm vườn, mình ghé giúp việc nặng.`+fx(c,{fame:7,eq:2,tam:5,qh:[n.n,22]})}},
  pay('Nhờ vài người trong xóm cùng chia nhau lo cụ và giỗ cụ, mình góp tiền',4,{f:c=>{G.tie.rel(n,16,'chia nhau lo cụ');G.tie.later(n,c,'kn_cu_ao_mat',R(30,96),{promised:2});return `Cả xóm thành một "hội lo giỗ cụ". Cụ mừng, mình nhẹ gánh. Nhà có tiếng biết cho người già chỗ dựa.`+fx(c,{money:-m(4),cfame:R(3,6),eq:2,tam:5,qh:[n.n,16]})}}),
  {l:'Từ chối, sợ rắc rối',f:c=>{G.tie.rel(n,-8,'bị từ chối lời nhờ');return `Cụ gật đầu: "Ừ, ai cũng có chuyện nhà". Cụ gật đầu rất chậm. Mình quay đi, lòng hơi nặng.`+fx(c,{tam:-3,qh:[n.n,-8]})}}]}},
{id:'kn_cu_ao_mat',fixed:1,t:'Cụ già qua đời',k:'Kỳ ngộ',tags:{},head:0,
 x:(c,d)=>{const n=T(d);return n?`${nm(n)} qua đời trong giấc ngủ. ${d.promised===1?'Cụ không con cháu, xóm nhìn sang nhà '+N(c)+': lời hứa lo giỗ năm xưa, giờ là lúc thực hiện.':d.promised===2?'Cả "hội lo giỗ cụ" họp lại, mọi ánh mắt nhìn '+N(c)+' vì mình là người đứng ra.':'Cụ đi khi không ai thân bên cạnh. Xóm bàn nhau lo hậu sự, ai cũng nhớ '+N(c)+' từng giúp cụ.'}`:'Cụ già đã qua đời.'},
 o:(c,d)=>{const n=T(d);if(!n)return gone();return [
  pay('Lo tang lễ chu đáo, lập bàn thờ, khấn giỗ hằng năm',8,{f:c=>{G.tie.rel(n,30,'lo tang lễ và giỗ chu đáo');return `Tang lễ tươm tất, cả xóm tới đưa tiễn. Bàn thờ cụ đặt ở gian bên, mỗi năm nhà mình cúng giỗ. ${d.promised===1?'Mảnh vườn cụ để lại về nhà mình theo lời hứa, và tiếng "giữ lời" lan khắp vùng.':'Tiếng nhà nghĩa tình lan khắp vùng.'}`+fx(c,{money:-m(8),cfame:R(5,9),eq:3,on:3,tam:7,qh:[n.n,30]})+(d.promised===1?G.landDelta(1):'')}}),
  {l:'Lo tang lễ giản dị theo sức, giỗ hằng năm làm đơn sơ',f:c=>{G.tie.rel(n,14,'lo tang lễ giản dị');return `Tang lễ đủ lễ nhưng đơn sơ, cả xóm hiểu hoàn cảnh nhà. Giỗ hằng năm làm nhỏ, vẫn không bỏ.`+fx(c,{money:-m(2),cfame:2,eq:1,tam:3,qh:[n.n,14]})+(d.promised===1?G.landDelta(1):'')}},
  {l:'Nhờ hội xóm lo hậu sự, mình chỉ góp mặt',c:()=>d.promised!==1,f:c=>{G.tie.rel(n,4,'chỉ góp mặt tang lễ');return `Cả xóm cùng lo, tang lễ ổn thỏa. Mình có mặt đúng giờ, không ai trách.`+fx(c,{tam:0,eq:1,qh:[n.n,4]})}},
  {l:'Tránh mặt, viện cớ bận, bỏ lời hứa',c:()=>d.promised===1,f:c=>{G.tie.rel(n,-34,'bỏ lời hứa lo giỗ');G.tie.oan(n,0);return `Cả xóm lo thay. Mảnh vườn cụ để lại bị xóm giữ làm chung. ${N(c)} mang tiếng "nuốt lời". Người già trong xóm nhìn nhà bằng ánh mắt khác nhiều năm.`+fx(c,{cfame:-R(5,8),fame:-3,eq:-2,tam:-7,qh:[n.n,-34]})}}]}}
];
});
