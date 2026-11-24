/* Bách Niên Thế Gia v6.7.10-d9.12 · HỘP CHỮA TRỊ (engine-ill.js). Mỗi cách chữa có giá và hiệu quả khác nhau; người nhà làm nghề y và thầy lang quen biết làm tăng hiệu quả. */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const FM=v=>G.fmtMoney(v);const N=c=>esc(c.given);
const doc=()=>{const d=G.ill.doctorPower();return d>0.05?d:0};
return [
{id:'ill_chua',t:'Người nhà lâm bệnh',k:'Bệnh tật',fixed:1,tags:{},
 x:(c,d)=>{const D=G.ill.DIS[d.ill]||{n:'bệnh'};const i=(c.ill||[]).find(x=>x.id===d.ill);d.sev=i?i.sev:2;const dd=doc();
  return `${N(c)} lâm bệnh: ${D.n.toLowerCase()}${d.sev>=3?', khá nặng':''}. ${D.mort>0.015?'Bệnh này không chữa kịp thì nguy hiểm đến tính mạng. ':''}${dd?'Trong nhà có người làm nghề y, có thể trông cậy một phần. ':''}Cách chữa nào cũng tốn kém và có kết quả khác nhau.`},
 o:(c,d)=>{const i=(c.ill||[]).find(x=>x.id===d.ill);if(!i)return [{l:'Thôi',f:()=>''}];const cd=m(5),cy=m(25);return [
  {l:'Nghỉ ngơi, tự chữa bằng thuốc nam',f:c=>{G.ill.treat(c,i,'tu');return 'Nghỉ ngơi, uống thuốc nam theo kinh nghiệm dân gian. Chậm nhưng ít tốn.'+fx(c,{tam:-1})}},
  ...(doc()?[{l:'Nhờ người nhà làm nghề y chữa',f:c=>{G.ill.treat(c,i,'nha');return `Người nhà làm nghề y xem mạch, bốc thuốc cho ${N(c)}, ngày nào cũng ghé thăm.`+fx(c,{tam:1,suc:2})}}]:[]),
  {l:`Mời thầy lang trong vùng (${FM(cd)})`,c:()=>G.money()>=cd,f:c=>{G.ill.treat(c,i,'lang');return `Thầy lang bốc thang thuốc đúng bệnh, dặn kiêng cữ.`+fx(c,{money:-cd,tam:1})}},
  {l:`Mời danh y về tận nhà (${FM(cy)})`,c:()=>G.money()>=cy,r:[{eq:0.4,tri:0.3},85],y:c=>{G.ill.treat(c,i,'danhy');return `Danh y xem bệnh rất kỹ, kê đơn tận gốc, bệnh giảm nhanh.`+fx(c,{money:-cy,suc:4,tam:3})},n:c=>{G.ill.treat(c,i,'lang');return `Danh y đi vắng, phải nhờ học trò, hiệu quả như thầy lang thường.`+fx(c,{money:-cy,tam:-1})}},
  {l:'Lên chùa cầu khấn, đốt hương',f:c=>{G.ill.treat(c,i,'cung');return `Cầu khấn tâm trạng nhẹ hẳn, nhưng bệnh vẫn phải chờ thời gian.`+fx(c,{money:-m(1),tam:3})}}]}}
];
});
