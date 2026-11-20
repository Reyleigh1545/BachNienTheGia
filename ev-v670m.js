/* Bách Niên Thế Gia v6.7.0-d9.5 · Thiết khoán (bản đầu): nhà có người đủ công trạng (tước từ bậc 3) được vua ban tấm khoán sắt; dùng một lần để thoát án tru di vì đại án (không dùng được khi mưu đại sự). Cờ S.tk. */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const N=c=>esc(c.given);
return [
{id:'tk_ban_khoan',t:'Vua ban Thiết khoán',k:'Triều đình',once:1,head:1,age:[30,90],pcd:9999,cd:240,w:0.8,tags:{},ms:1,
 c:c=>!S().tk&&G.alive().some(p=>G.inClan(p)&&(p.tuoc||0)>=3),
 x:c=>'Nhà họ '+esc(S().surname)+' có công lớn với triều đình qua mấy đời. Vua cho gọi, ban cho một tấm khoán sắt khắc chữ vàng: nếu con cháu về sau vướng đại án, trình ra thì được miễn một lần tội chết. Dặn rằng chỉ dùng khi sống còn.',
 o:c=>[{l:'Quỳ nhận, bái tạ',f:c=>{S().tk=1;return 'Tấm khoán sắt được cất ở bàn thờ tổ, ai cũng biết nhưng không ai nhắc.'+fx(c,{fame:30,tam:8})}}]}
]});
