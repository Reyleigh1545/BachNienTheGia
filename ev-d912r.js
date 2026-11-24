/* Bách Niên Thế Gia v6.7.10-d9.12 · VIẾT LẠI kỳ ngộ t_c_quy_nhan: quý nhân là người thật (thẻ chân dung), kết bạn thật thì về sau có hậu sự (tie_quy_nhan_giup), lựa chọn thật sự khác nhau. */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const m=v=>G.mm(v);const N=c=>esc(c.given);const nm=n=>esc(n?n.n:'người ấy');
const T=d=>d&&d.npc?G.tie.get(d.npc):null;
const addVai=(n,v)=>{if(n&&!n.vai.includes(v)){n.vai.push(v);n.vaiTxt=n.vai.map(x=>G.tie.VAI[x]||x).join(', ')}};
return [
{id:'t_c_quy_nhan',t:'Quý nhân phù trợ',k:'Kỳ ngộ',ky:1,good:1,u:'person',pcd:200,w:0.5,age:[16,70],tags:{},
 x:(c,d)=>{const n=G.tie.ensure(c,{key:'quy_nhan_phu',vai:['quy_nhan'],nghe:'một ông già có thế lực trong phủ, ăn mặc giản dị',age:R(58,75),main:'eq',st:{tri:R(75,95),eq:R(75,95)},tier:5,rel:6,why:'gặp khi trú mưa'});d.npc=n.id;return `Trong một lần trú mưa, ${N(c)} trò chuyện với ${nm(n)}, ${esc(n.nghe)}. Ông hỏi han chuyện làm ăn, chuyện nhà, chuyện đời; càng nghe càng có vẻ để ý.`},
 o:(c,d)=>{const n=T(d);if(!n)return [{l:'Thôi',f:()=>''}];return [
  {l:'Trò chuyện thật lòng, kể cả khó khăn của mình',r:[{eq:0.8,tri:0.3},48],y:c=>{G.tie.rel(n,28,'trò chuyện thật lòng');addVai(n,'quy_nhan');G.tie.later(n,c,'tie_quy_nhan_giup',R(18,48),{});return `${nm(n)} nghe hết, gật đầu: "Cậu là người thật". Ông để lại tên và địa chỉ, dặn "khi nào cần thì cứ đến".`+fx(c,{money:m(R(20,40)),bonus:0.15,duyen:5,eq:2,tam:6,qh:[n.n,28]})},n:c=>{G.tie.rel(n,8,'trò chuyện thật lòng');return `Câu chuyện vui, hai bên chia tay lịch sự. ${nm(n)} nhớ khuôn mặt mình.`+fx(c,{tam:4,qh:[n.n,8]})}},
  {l:'Hỏi ý kiến ông về việc làm ăn đang cân nhắc',r:[{tri:0.8,khau:0.4},52],y:c=>{G.tie.rel(n,16,'xin lời khuyên làm ăn');return `${nm(n)} chỉ ra hai chỗ mình chưa nghĩ tới, cách tính lời lỗ rõ hơn hẳn. Mình học được nhiều điều có ích.`+fx(c,{tri:R(2,4),sk:{khau:2},bonus:0.1,tam:4,qh:[n.n,16]})},n:c=>{G.tie.rel(n,3,'hỏi ý kiến làm ăn');return `Lời khuyên của ông mơ hồ, như thể ông cũng không rõ việc của mình. Không có gì cụ thể.`+fx(c,{tam:-1,qh:[n.n,3]})}},
  {l:'Giữ lễ, không nhận ơn của người lạ',f:c=>{G.tie.rel(n,10,'giữ lễ không nhận ơn');return `${nm(n)} nhìn lâu rồi cười: "Hiếm người có nếp thế". Ông gửi lại một lời chúc, không thêm gì.`+fx(c,{eq:2,tam:3,qh:[n.n,10]})}}]}}
];
});
