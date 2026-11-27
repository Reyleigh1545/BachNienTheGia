/* Bách Niên Thế Gia v6.7.10-d9.12 · HỘP CHỮA TRỊ (engine-ill.js). Mỗi cách chữa có giá và hiệu quả khác nhau; người nhà làm nghề y và thầy lang quen biết làm tăng hiệu quả. */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const FM=v=>G.fmtMoney(v);const N=c=>esc(c.given);

return [
{id:'ill_chua',t:'Người nhà lâm bệnh',k:'Bệnh tật',fixed:1,tags:{},
 x:(c,d)=>{const D=G.ill.DIS[d.ill]||{n:'bệnh'};const i=(c.ill||[]).find(x=>x.id===d.ill);d.sev=i?i.sev:2;const bs=G.ill.doctorOf(c,d);if(bs)d.bs=bs.id;else delete d.bs;
  return `${N(c)} lâm bệnh: ${D.n.toLowerCase()}${d.sev>=3?', khá nặng':''}. ${D.mort>0.015?'Bệnh này không chữa kịp thì nguy hiểm đến tính mạng. ':''}${bs?`Trong nhà có ${esc(bs.given)} làm nghề y. `:''}Cách chữa nào cũng tốn kém và có kết quả khác nhau.`},
 o:(c,d)=>{const i=(c.ill||[]).find(x=>x.id===d.ill);if(!i)return [{l:'Thôi',f:()=>''}];const cd=m(5),cy=m(25);return [
  {l:'Nghỉ ngơi, tự chữa bằng thuốc nam',f:c=>{G.ill.treat(c,i,'tu');return 'Nghỉ ngơi, uống thuốc nam theo kinh nghiệm dân gian. Chậm nhưng ít tốn.'+fx(c,{tam:-1})}},
  ...(G.ill.optTu(c,{i})?[G.ill.optTu(c,{i})]:[]),
  ...(G.ill.doctorOf(c,d)?[G.ill.optNha(c,G.ill.doctorOf(c,d),{i})]:[]),
  {l:`Mời thầy lang trong vùng (${FM(cd)})`,c:()=>G.money()>=cd,f:c=>{G.ill.treat(c,i,'lang');return `Thầy lang bốc thang thuốc đúng bệnh, dặn kiêng cữ.`+fx(c,{money:-cd,tam:1})}},
  {l:`Mời danh y về tận nhà (${FM(cy)})`,c:()=>G.money()>=cy,r:[{_g:1,eq:0.4,tri:0.3},85],y:c=>{G.ill.treat(c,i,'danhy');return `Danh y xem bệnh rất kỹ, kê đơn tận gốc, bệnh giảm nhanh.`+fx(c,{money:-cy,suc:4,tam:3})},n:c=>{G.ill.treat(c,i,'lang');return `Danh y đi vắng, phải nhờ học trò, hiệu quả như thầy lang thường.`+fx(c,{money:-cy,tam:-1})}},
  {l:'Lên chùa cầu khấn, đốt hương',f:c=>{G.ill.treat(c,i,'cung');return `Cầu khấn tâm trạng nhẹ hẳn, nhưng bệnh vẫn phải chờ thời gian.`+fx(c,{money:-m(1),tam:3})}}]}}
];
});
