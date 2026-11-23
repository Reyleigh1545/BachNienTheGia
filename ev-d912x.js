/* Bách Niên Thế Gia v6.7.10-d9.12 · VIẾT LẠI v6_ky_lao_nhan theo góp ý chủ dự án: "lựa chọn ít, chỉ có được, không có mất". Lão nhân là người thật (thẻ chân dung), có bốn lựa chọn khác nhau về được và mất. */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const m=v=>G.mm(v);const FM=v=>G.fmtMoney(v);const N=c=>esc(c.given);
const nm=n=>esc(n?n.n:'lão nhân');
const T=d=>d&&d.npc?G.tie.get(d.npc):null;
const gone=()=>[{l:'Thôi',f:()=>''}];
return [
{id:'v6_ky_lao_nhan',t:'Lão nhân bên bến đò',k:'Kỳ ngộ',ky:1,u:'person',age:[14,60],w:1,good:1,tags:{},
 x:(c,d)=>{const n=G.tie.ensure(c,{key:'lao_nhan_ben_do',g:'nam',vai:['cao_nhan'],nghe:'lão nhân áo vải bên bến đò, nói chuyện như rót mật vào tai',age:R(62,78),main:'eq',st:{tri:R(80,98),eq:R(85,100)},tier:1,rel:0,why:'gặp ở bến đò'});d.npc=n.id;return `Chờ đò, ${N(c)} gặp ${nm(n)}, ${esc(n.nghe)}. Lão bảo: "Ngươi có tướng ăn nói, tiếc là chưa ai mài giũa." Đò còn lâu mới tới, lão có vẻ rảnh.`},
 o:(c,d)=>{const n=T(d);if(!n)return gone();return [
  {l:'Xin lão chỉ giáo ngay',r:[{eq:0.6,duyen:0.5},42],y:c=>{G.tie.rel(n,16,'được chỉ giáo');return 'Lão truyền cho mấy phép biện luận. Từ đó ăn nói khác hẳn.'+fx(c,{sk:{khau:R(8,14)},eq:2,tam:3,qh:[n.n,16]})},yy:c=>{G.tie.rel(n,28,'được truyền hết sở học');G.tie.later(n,c,'tie_quy_nhan_giup',R(24,60),{});return 'Lão truyền hết sở học, còn tặng một cuốn sổ ghi chép.'+fx(c,{sk:{khau:R(14,20),muu:5},eq:3,tam:5,qh:[n.n,28]})},n:c=>{G.tie.rel(n,-3,'xin chỉ giáo vội vàng');return 'Lão cười, bảo "chưa đến lúc", rồi lên đò đi mất.'+fx(c,{sk:{khau:2},tam:-3,qh:[n.n,-3]})}},
  {l:`Mời lão chén trà nóng ở quán bến rồi mới xin chỉ giáo (${FM(m(2))})`,c:()=>G.money()>=m(2),r:[{eq:0.6,duyen:0.5},62],y:c=>{G.tie.rel(n,22,'được mời trà');return 'Lão nhấp trà, kể chuyện đời rồi chỉ cách nói cho thuyết phục. Hai người chia tay trong niềm vui.'+fx(c,{money:-m(2),sk:{khau:R(10,16)},eq:3,tam:4,qh:[n.n,22]})},n:c=>{G.tie.rel(n,6,'được mời trà');return 'Lão uống trà, nghe chuyện, nhưng không nói gì thêm. Đò tới thì lão lên.'+fx(c,{money:-m(2),sk:{khau:2},tam:-1,qh:[n.n,6]})}},
  {l:'Đấu khẩu với lão xem ai lý lẽ hơn',r:[{eq:0.7,tri:0.5,gan:0.3},32],y:c=>{G.tie.rel(n,30,'đấu khẩu thắng lão');return 'Ba hiệp luận biện, lão bật cười: "Lâu lắm mới gặp người cãi được lão". Lão nể phục và truyền thêm vài mánh.'+fx(c,{sk:{khau:R(14,22),muu:3},eq:3,fame:2,tam:6,qh:[n.n,30]})},n:c=>{G.tie.rel(n,-6,'đấu khẩu thua lão');return 'Lão bẻ từng lý lẽ, cả bến đò cười ồ. Mất mặt một phen.'+fx(c,{eq:-1,fame:-2,tam:-5,qh:[n.n,-6]})}},
  {l:'Lịch sự chào rồi đi',f:c=>{G.tie.rel(n,2,'chào lịch sự');return 'Một cuộc gặp gỡ thoáng qua. Lão mỉm cười nhìn theo, như hiểu điều gì.'+fx(c,{tam:0,qh:[n.n,2]})}}]}}
];
});
