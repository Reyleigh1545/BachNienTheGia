/* Bách Niên Thế Gia v6.7.10-d9.12 · HỌ NÀY ẢNH HƯỞNG HỌ KIA (chủ dự án 24/11: "họ này ảnh hưởng họ kia, gia tộc này ảnh hưởng gia tộc kia").
   Ba sự kiện kéo nhà mình vào quan hệ giữa HAI họ khác trong vùng: phân xử, nhờ che chở, kéo bè. Chọn bên nào thì quan hệ với họ ấy tăng, với họ kia giảm (dòng "Quan hệ với …" tự hiện). */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const FM=v=>G.fmtMoney(v);const N=c=>esc(c.given);
const V=()=>G._v63;
const clans=()=>{try{return V().w_clans(S().loc.p)||[]}catch(e){return[]}};
const two=()=>{const L=clans();if(L.length<2)return null;const a=pick(L);const b=pick(L.filter(x=>x!==a));return b?[a,b]:null};
const cn=cl=>esc(G.cnameU(cl));
const rel=(cl,v)=>{cl.rel=Math.max(-100,Math.min(100,(cl.rel||0)+v))};
const find=id=>clans().find(c=>c.id===id)||null;
const pay=(l,v,o)=>Object.assign({l:`${l} (${FM(m(v))})`,c:()=>G.money()>=m(v)},o);
const E=o=>Object.assign({tags:{},k:'Họ khác',head:1,age:[28,85],tier:[1,6],pcd:300,cd:120,ms:1},o);
const gone=()=>[{l:'Thôi',f:()=>''}];
return [
E({id:'ho_phan_xu',t:'Hai họ nhờ phân xử',w:0.8,c:()=>clans().length>=2,
 x:(c,d)=>{const t=two();if(!t)return 'Trong vùng yên ổn.';d.a=t[0].id;d.b=t[1].id;const o=pick(['ranh giới đất','nước tưới ruộng','một vụ cưới hỏi đổ vỡ','món nợ cũ']);d.o=o;return `${cn(t[0])} và ${cn(t[1])} tranh nhau ${o}. Hai bên đều muốn nhà ${N(c)}, người được làng nể, đứng ra phân xử. Ai cũng biết bên nào được nhà mình giúp sẽ có thế, bên kia sẽ ghi lòng.`},
 o:(c,d)=>{const a=find(d.a),b=find(d.b);if(!a||!b)return gone();return [
  {l:`Phân xử công tâm theo lẽ phải`,r:[{eq:1,tri:0.6,khau:0.4},52],y:c=>{rel(a,6);rel(b,6);return `Cả hai họ chịu lời phân xử. Tiếng công tâm của nhà ${N(c)} lan ra.`+fx(c,{eq:2,cfame:3,tam:4})},n:c=>{rel(a,-8);rel(b,-8);return `Lời phân xử không làm ai hài lòng, cả hai đều cho nhà mình thiên vị đối phương.`+fx(c,{eq:1,tam:-4,cfame:-1})}},
  {l:`Đứng về ${cn(a)}, giúp họ thắng`,f:c=>{rel(a,15);rel(b,-15);if(chance(0.4))b.feud=1;return `${cn(a)} thắng thế, mang ơn nhà ${N(c)}. ${cn(b)} ghi hận, có thể tìm dịp trả đũa.`+fx(c,{eq:1,tam:2})}},
  {l:`Đứng về ${cn(b)}, giúp họ thắng`,f:c=>{rel(b,15);rel(a,-15);if(chance(0.4))a.feud=1;return `${cn(b)} thắng thế, mang ơn nhà ${N(c)}. ${cn(a)} ghi hận, có thể tìm dịp trả đũa.`+fx(c,{eq:1,tam:2})}},
  {l:'Từ chối, nói nhà không dính vào chuyện họ khác',f:c=>{rel(a,-3);rel(b,-3);return `Hai họ tự giải quyết, kết quả không ai vừa lòng. Nhà mình giữ được yên ổn nhưng cả hai đều thấy nhà lạnh nhạt.`+fx(c,{tam:0})}}]}}),
E({id:'ho_nho_che_cho',t:'Họ thân nhờ che chở',w:0.8,c:()=>clans().filter(x=>(x.rel||0)>=15).length>=1&&clans().length>=2,
 x:(c,d)=>{const L=clans();const a=pick(L.filter(x=>(x.rel||0)>=15));const b=pick(L.filter(x=>x!==a));if(!a||!b)return 'Trong vùng yên ổn.';d.a=a.id;d.b=b.id;return `${cn(a)}, họ vốn thân với nhà ${N(c)}, đang bị ${cn(b)} lấn lướt: ${pick(['chiếm lối nước','dựng chuyện kiện tụng','cản đường buôn bán'])}. Họ đến xin nhà ${N(c)} lên tiếng che chở. ${cn(b)} cũng có người quen trong vùng.`},
 o:(c,d)=>{const a=find(d.a),b=find(d.b);if(!a||!b)return gone();return [
  {l:`Đứng ra bênh ${cn(a)}, nói thẳng với ${cn(b)}`,r:[{eq:0.8,khau:0.6,vo:0.2},50],y:c=>{rel(a,18);rel(b,-10);return `${cn(b)} chùn bước, nhượng lại phần lấn. ${cn(a)} mang ơn nặng.`+fx(c,{eq:2,cfame:3,tam:4})},n:c=>{rel(a,8);rel(b,-18);b.feud=1;return `${cn(b)} không nhún, bắt đầu coi nhà ${N(c)} là đối thủ. ${cn(a)} cảm động vì thấy nhà dám lên tiếng.`+fx(c,{tam:-4,cfame:-1})}},
  pay(`Giúp ${cn(a)} bằng tiền và người, không đối đầu công khai`,12,{f:c=>{rel(a,14);return `${cn(a)} cầm cự được nhờ khoản giúp kín đáo. Nhà mình không bị gọi tên.`+fx(c,{money:-m(12),eq:1,tam:2})}}),
  {l:'Khuyên hai bên hòa giải, nhà không đứng bên nào',f:c=>{rel(a,-6);rel(b,3);return `${cn(a)} thất vọng vì nhà không bênh, ${cn(b)} nhẹ nhõm. Chuyện kéo dài.`+fx(c,{tam:-2})}}]}}),
E({id:'ho_ket_be',t:'Họ khác kéo bè kết phái',w:0.6,tier:[2,6],c:()=>clans().length>=3,
 x:(c,d)=>{const L=clans();if(L.length<3)return 'Trong vùng yên ổn.';const s=L.slice().sort(()=>Math.random()-0.5);d.a=s[0].id;d.b=s[1].id;d.c=s[2].id;return `${cn(s[0])} và ${cn(s[1])} đang bắt tay nhau kết thành một phe trong vùng để chống ${cn(s[2])}. Họ mời nhà ${N(c)} nhập phe, hứa chia lợi ích buôn bán và chỗ đứng. ${cn(s[2])} cũng nghe tin và chờ xem nhà mình chọn gì.`},
 o:(c,d)=>{const a=find(d.a),b=find(d.b),z=find(d.c);if(!a||!b||!z)return gone();return [
  {l:'Nhập phe cùng hai họ kia',f:c=>{rel(a,12);rel(b,12);rel(z,-20);z.feud=1;return `Ba họ liên kết, vùng có thế cân bằng mới. ${cn(z)} cô lập, ghi hận nhà ${N(c)}.`+fx(c,{money:m(R(8,18)),cfame:2,tam:2})}},
  {l:`Bắt tay với ${cn(z)}, giữ phe đối trọng`,f:c=>{rel(z,15);rel(a,-12);rel(b,-12);return `${cn(z)} mừng vì có thêm đồng minh. Hai họ kia nhìn nhà mình bằng con mắt khác.`+fx(c,{eq:1,tam:1})}},
  {l:'Từ chối cả hai bên, giữ mình đứng ngoài',r:[{eq:0.8,tri:0.5},48],y:c=>{rel(a,2);rel(b,2);rel(z,2);return `Nhà giữ được thế trung lập, tiếng "không đứng phe" lan khắp nơi và được kính trọng.`+fx(c,{eq:2,cfame:2,tam:3})},n:c=>{rel(a,-6);rel(b,-6);rel(z,-6);return `Từ chối cả hai, cả ba họ đều xem nhà là kẻ khó chơi, lạnh nhạt dần.`+fx(c,{tam:-3,cfame:-1})}}]}})
];
});
