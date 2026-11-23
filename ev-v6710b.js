/* Bách Niên Thế Gia v6.7.10-d9.10 · thu hồi Thiết khoán (mục 12, đợt quân hộ, Đông xưởng, thiết khoán): vua mới hoặc vua nghi kỵ có thể đòi lại tấm khoán sắt. Quân hộ đời đời và Đông xưởng theo năm ở engine (qhYear, dxYear, tkYear). */
window.EVF.push(G=>{
const {R,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const N=c=>esc(c.given);
return [
{id:'tk_thu_hoi',t:'Triều đình đòi lại Thiết khoán',k:'Thiết khoán',fixed:1,head:1,
 x:c=>`Một sứ giả mang chỉ của triều đình đến nhà ${N(c)}: ${S().dyn&&S().dyn.k&&S().dyn.k.nghi>=70?'vua đa nghi, ghi ngờ những nhà còn giữ khoán sắt của đời trước':'vua mới lên ngôi, muốn thu lại các tấm khoán sắt tiên đế đã ban'}. Tấm khoán từng cứu nhà khỏi án tru di giờ có thể bị thu hồi.`,
 o:c=>{const v=m(80);return [
  {l:'Giao nộp khoán, tạ ơn triều đình',f:c=>{S().tk=0;return 'Sứ giả nhận khoán, ghi tên nhà vào sổ "trung thuận". Mất chỗ dựa nhưng được yên thân.'+fx(c,{fame:3,tam:-4})}},
  {l:`Dâng lễ xin được giữ lại (${G.fmtMoney(v)})`,c:()=>G.money()>=v,r:[{eq:1,khau:0.8},45],y:c=>{S().money-=v;return 'Lễ nhận, lời nói khéo. Vua cho giữ khoán, coi như lòng trung đã rõ.'+fx(c,{fame:4,tam:3})},n:c=>{S().money-=v;S().tk=0;return 'Lễ mất, khoán cũng mất, còn mang tiếng hối lộ.'+fx(c,{fame:-4,tam:-6})}},
  {l:'Từ chối giao, nói đây là ân huệ của tổ tiên',r:[{gan:1,eq:0.6},30],y:c=>'Sứ giả bối rối, về báo lại. Triều đình tạm gác, nhà vẫn giữ khoán nhưng bị ghi vào sổ để ý.'+fx(c,{fame:6,tam:2}),n:c=>{S().tk=0;if(S().dyn&&S().dyn.k)S().dyn.k.nghi=Math.min(100,S().dyn.k.nghi+4);return 'Triều đình nổi giận, thu khoán bằng cưỡng chế, tên nhà vào sổ nghi kỵ.'+fx(c,{fame:-8,tam:-8,risk:6})}}]}}
];
});
