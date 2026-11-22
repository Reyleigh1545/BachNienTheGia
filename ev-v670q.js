/* Bách Niên Thế Gia v6.7.0-d9.6 · giang hồ mở rộng: lên đệ tử (cấp 1 lên 2), chiến tranh giữa hai phái, sư môn có biến. Dùng cờ c.flags.gh (cấp) và c.flags.ghs (phái) từ ev-v670j.js. */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const N=c=>esc(c.given);
const rk=c=>(c.flags&&c.flags.gh)||0;
const sects=()=>(S().wr&&S().wr.sects)||[];
const sectOf=c=>{const id=c.flags&&c.flags.ghs;return sects().find(s=>s.id===id)||null};
const GJ=o=>Object.assign({tags:{},k:'Giang hồ',job:['hiep'],age:[16,70],pcd:60,cd:36,w:1,ms:1},o);
return [
GJ({id:'gh_len_de_tu',t:'Thử thách lên đệ tử',c:c=>rk(c)===1&&!!sectOf(c),once:1,
 x:c=>{const s=sectOf(c);return `Chưởng môn ${esc(s.n)} cho gọi các môn sinh lâu năm. Ai vượt qua ba ải trong núi thì được nhận làm đệ tử, học tâm pháp chính tông. ${N(c)} nằm trong danh sách.`},
 o:c=>[{l:'Dự đủ ba ải',r:[{vo:1,suc:0.5,tri:0.4},55],y:c=>{c.flags.gh=2;return 'Qua được cả ba ải, được chưởng môn đích thân trao áo đệ tử.'+fx(c,{vo:R(2,4),fame:R(4,8),tam:6})},n:c=>'Gãy ở ải thứ hai, phải dưỡng thương lâu ngày. Phải đợi khóa sau.'+fx(c,{suc:-R(8,15),tam:-4})},
  {l:'Xin hoãn, luyện thêm vài năm',f:c=>'Chưởng môn gật đầu, ghi tên vào khóa sau.'+fx(c,{vo:1})}]}),
GJ({id:'gh_phai_chien',t:'Hai phái khai chiến',c:c=>rk(c)>=1&&!!sectOf(c)&&sects().length>1,pcd:96,cd:60,w:0.7,
 x:c=>{const s=sectOf(c);return `${esc(s.n)} và một phái láng giềng tranh nhau địa bàn, nay hai bên kéo người ra đối đầu. Chưởng môn gọi mọi đệ tử, ai cũng phải chọn đứng đâu.`},
 o:c=>{const s=sectOf(c);return [
  {l:'Ra trận cùng môn phái',r:[{vo:1,suc:0.6},rk(c)>=3?60:48],y:c=>{s.pow=Math.min(100,(s.pow||50)+3);return 'Phái mình thắng một trận quan trọng, tên ngươi được nhắc nhiều.'+fx(c,{vo:R(1,3),fame:R(4,8),merit:2,suc:-R(3,8)})},n:c=>{s.pow=Math.max(5,(s.pow||50)-3);return 'Phái mình thua, ngươi trốn thoát với vết thương nặng.'+fx(c,{suc:-R(12,24),tam:-6})}},
  {l:'Đứng ra hòa giải hai bên',r:[{eq:1,tri:0.6},40],y:c=>{return 'Hai bên chịu ngồi lại, không ai đổ máu. Giang hồ trọng người này.'+fx(c,{fame:R(6,12),eq:2,tam:5})},n:c=>'Không bên nào nghe, ngươi bị cả hai nghi ngờ.'+fx(c,{fame:-3,tam:-4})},
  {l:'Rời phái, về lại thế gian',f:c=>{c.flags.gh=0;delete c.flags.ghs;return 'Ngươi cởi áo phái, trả lại thẻ bài. Một số huynh đệ không chào nữa.'+fx(c,{tam:-3,fame:-2})}}]}}),
GJ({id:'gh_su_phu_bien',t:'Sư phụ có biến',c:c=>rk(c)>=2&&!!sectOf(c),pcd:120,cd:90,w:0.6,
 x:c=>{const s=sectOf(c);return `Sư phụ trong ${esc(s.n)} lâm bệnh nặng. Các sư huynh đệ đã bắt đầu bàn chuyện ai thay ông giữ chức trưởng lão.`},
 o:c=>[{l:`Dốc bạc chạy chữa cho sư phụ (${G.fmtMoney(m(20))})`,c:()=>G.money()>=m(20),f:c=>{return 'Sư phụ qua được cơn nguy, nhớ ơn đệ tử này nhất. Ông truyền thêm một đoạn tâm pháp.'+fx(c,{money:-m(20),vo:R(1,3),fame:3,tam:4})}},
  {l:'Chầu chực bên giường, tự chăm',f:c=>'Mấy tháng hầu hạ, sư phụ khỏi hẳn. Anh em thấy rõ lòng ngươi.'+fx(c,{eq:1,fame:4,tam:2,suc:-3})},
  {l:'Lo tranh chức trưởng lão',r:[{muu:0.8,vo:0.6},35],y:c=>{c.flags.gh=Math.max(rk(c),3);return 'Sư phụ không qua khỏi, ngươi được các huynh đệ ủng hộ kế chức. Có người ngầm hận.'+fx(c,{fame:R(6,12),vo:1,tam:-2})},n:c=>'Bị anh em phát giác, mất hết lòng tin trong phái.'+fx(c,{fame:-6,tam:-8})}]})
];
});
