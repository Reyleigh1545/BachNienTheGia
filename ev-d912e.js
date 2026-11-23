/* Bách Niên Thế Gia v6.7.10-d9.12 · THUẾ: quan huyện lạm thu (kế hoạch mục 3.3). Hệ thuế chuẩn ở engine-rg.js (G.tax, thu mỗi mùa thu); sự kiện này là phần "quan lại đặt thêm thuế phụ vượt mức chuẩn". Người quan huyện là NPC thật (sổ người quen). */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const FM=v=>G.fmtMoney(v);const N=c=>esc(c.given);
const T=d=>d&&d.npc?G.tie.get(d.npc):null;const nm=n=>esc(n?n.n:'quan huyện');
return [
{id:'thu_lam_thu',t:'Quan huyện đặt thuế phụ',k:'Thuế',fixed:1,tags:{},
 x:(c,d)=>{const n=G.tie.ensure(c,{key:'quan_huyen_'+(S().loc&&S().loc.p||'x'),vai:['quen'],nghe:'quan huyện sở tại',tier:4,main:'tri',st:{eq:R(25,45)},age:R(38,58),rel:-5,why:'đặt thuế phụ'});d.npc=n.id;d.base=G.tax.base();d.extra=Math.max(m(3),Math.round(d.base*0.4));d.kind=pick(['"bổ sung quân phí"','"tiền lệ mừng quan mới"','"tiền sửa đê đình"','"thuế đinh bổ sung"']);
  return `${nm(n)} cho thư lại đi từng nhà thu thêm khoản ${d.kind}. Nhà ${N(c)} phải nộp thêm ${FM(d.extra)}, vượt xa mức thuế chuẩn năm nay (${FM(d.base)}). Dân đều bảo khoản này không có trong lệ, nhưng chẳng ai dám kêu.`},
 o:(c,d)=>{const n=T(d);if(!n)return [{l:'Thôi',f:()=>''}];const quy=G.tie.bonus('quy_nhan',25)>0;const ex=d.extra;return [
  {l:`Nộp đủ cho yên (${FM(ex)})`,c:()=>G.money()>=ex,f:c=>`Nộp đủ, thư lại ghi "thuận". ${nm(n)} nhớ nhà này biết điều, nhưng lần sau cũng chẳng bớt.`+fx(c,{money:-ex,qh:G.tie.rel(n,5,'nộp đủ thuế phụ'),tam:-2})},
  {l:'Xin xem sổ thuế chuẩn, đối chiếu khoản thu',r:[{khau:0.7,tri:0.5},48],y:c=>{G.tie.rel(n,-4,'bị bắt bẻ khoản thu');return `Thư lại lúng túng, phải bớt nửa khoản phụ vì không giải thích được căn cứ.`+fx(c,{money:-Math.round(ex/2),fame:3,eq:1,sk:{khau:1}})},n:c=>{const t=S().tax;if(t)t.owed=(t.owed||0)+Math.round(ex*0.2);return `Thư lại cau mặt, ghi nhà vào sổ "ngang bướng", khoản phụ vẫn phải nộp, thêm tiền phạt.`+fx(c,{money:-ex,qh:G.tie.rel(n,-8,'bị ghi ngang bướng'),tam:-3})}},
  {l:`Đút lót lý trưởng để ghi nhỏ đi (${FM(m(5))})`,c:()=>G.money()>=m(5),r:[{muu:0.7,khau:0.4},45],y:c=>`Lý trưởng nhận lễ, ghi nhà nộp một phần tư. Việc êm xuôi.`+fx(c,{money:-m(5)-Math.round(ex/4),liem:-2,tam:1}),n:c=>{G.tie.oan(n,6);return `Bị tố ra, ${nm(n)} phạt nặng vì tội hối lộ lý trưởng.`+fx(c,{money:-ex-Math.round(ex/2),fame:-4,liem:-4,risk:3,tam:-5})}},
  {l:'Cùng cả làng làm đơn lên phủ',r:[{eq:0.8,khau:0.6,fame:0.3},quy?62:44],y:c=>{G.tie.oan(n,10);if(chance(0.4))n.ok=0;return `Phủ xét đơn, thấy khoản thu vượt lệ: ${nm(n)} bị nhắc nhở${n.ok===0?', rồi bị đổi đi nơi khác':''}. Cả làng không phải nộp khoản phụ.`+fx(c,{cfame:3,fame:4,eq:2,qh:G.tie.rel(n,-15,'bị làng kiện'),tam:4})},n:c=>{G.tie.oan(n,10);return `Đơn bị bác. Người cầm đầu bị đánh trượng, khoản phụ còn tăng thêm một phần.`+fx(c,{money:-Math.round(ex*1.3),suc:-R(8,14),fame:-3,tam:-6})}},
  ...(quy?[{l:'Nhờ quý nhân gửi một lời tới quan trên',f:c=>{const q=G.tie.act('quy_nhan').filter(x=>x.rel>=25)[0];if(q)G.tie.rel(q,-6,'nhờ can thiệp thuế');G.tie.oan(n,6);return `Một lời của ${q?nm(q):'quý nhân'}, khoản thu phụ của nhà bị bỏ ngay, ${nm(n)} ngượng nhưng không dám nói.`+fx(c,{tam:3,eq:1,fame:1})}}]:[]),
  {l:'Lấy cớ nhà túng, xin hoãn',f:c=>{const t=S().tax;if(t)t.owed=(t.owed||0)+ex;return `Xin được hoãn, nhưng khoản này cộng vào nợ thuế năm sau, tính thêm 20%.`+fx(c,{tam:-3})}}]}}
];
});
