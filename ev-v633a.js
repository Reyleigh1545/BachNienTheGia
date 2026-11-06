/* Bách Niên Thế Gia v6.3.3 · nhân viên là người thật: ốm, nghỉ hưu, thôi việc, qua đời */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const S=()=>G.S();
const m=v=>G.mm(v);
const fm=v=>G.fmtMoney(v);
const bz=d=>S().biz.find(b=>b.id===d.bid);
const staffOf=(d)=>{const b=bz(d);return b?b.staff.find(s=>s.id===d.sid):null};
const loyAll=(d,v)=>{const b=bz(d);if(b)b.staff.forEach(s=>{s.loy=Math.max(0,Math.min(100,(s.loy||60)+v))})};
const raw=(d)=>d.wage||600;
return [
{id:'stf_death',fixed:1,t:'Người làm qua đời',k:'Kinh doanh',
 x:(c,d)=>`${esc(d.n)}, ${d.ra} ở ${esc(String(d.bn).toLowerCase())}, đã mất vì ${d.why||'bệnh'}, thọ ${d.age} tuổi. Người ấy làm ${d.yrs>=1?d.yrs+' năm':'chưa đầy một năm'} cho nhà mình. ${d.age<=52?'Trong nhà còn vợ con nheo nhóc.':'Con cháu lo hậu sự trong cảnh chật vật.'}`,
 o:(c,d)=>{const cost=Math.round(raw(d)*3/10)*10,small=Math.round(raw(d)/10)*10;const opts=[
  {l:`Lo hậu sự chu đáo (${fm(cost)})`,c:()=>G.money()>=cost,f:c=>{loyAll(d,9);return `Cả ${esc(String(d.bn).toLowerCase())} đi đưa tiễn. Người làm còn lại thấy chủ nhà tử tế, yên lòng.`+fx(c,{money:-cost,fame:2,tam:3})}},
  {l:`Gửi tiền phúng điếu (${fm(small)})`,c:()=>G.money()>=small,f:c=>{loyAll(d,3);return 'Gia đình người mất cảm tạ, nhận tiền rồi lặng lẽ lo việc.'+fx(c,{money:-small,tam:1})}},
  {l:'Cử người đến thắp nhang thay mình',f:c=>{loyAll(d,-4);return 'Việc xong nhanh gọn, nhưng người làm bàn tán nhà chủ lạnh lùng.'+fx(c,{tam:-1})}}];
  if(d.age<=55&&bz(d)&&G.ROLES[d.role]){const R0=G.ROLES[d.role];opts.splice(1,0,{l:'Nhận con người ấy vào làm thay',s:'Một thanh niên mới vào nghề, cần thời gian học',f:c=>{const b=bz(d);if(!b)return '';const st=G.stfRecruitKin(b,d.role,R(17,22));loyAll(d,6);return `${esc(st.n)} đến thế chỗ cha, còn lóng ngóng nhưng chăm chỉ. Cả cơ sở nể cách nhà chủ cư xử.`+fx(c,{fame:1,tam:2})}})}
  return opts}},
{id:'stf_retire',fixed:1,t:'Người làm xin nghỉ hưu',k:'Kinh doanh',
 x:(c,d)=>`${esc(d.n)}, ${d.ra} ${d.age} tuổi, ${d.yrs>=1?`đã làm ${d.yrs} năm`:'mới vào làm chưa lâu'} ở ${esc(String(d.bn).toLowerCase())}. Người ấy nói tay chân không còn như trước, xin về quê dưỡng già.`,
 o:(c,d)=>{const cost=Math.round(raw(d)*6/10)*10;return [
  {l:`Tặng khoản dưỡng già, nửa năm lương (${fm(cost)})`,c:()=>G.money()>=cost,f:c=>{loyAll(d,7);return `${esc(d.n)} cảm kích, hứa sẽ giới thiệu người quen vào làm.`+fx(c,{money:-cost,fame:2,tam:2})}},
  {l:'Chúc người ấy khỏe mạnh, cho về',f:c=>'Hai bên chia tay nhẹ nhàng.'+fx(c,{tam:0})},
  {l:'Mời ở lại làm việc nhẹ, nửa lương',r:[{eq:1},46],y:c=>{const b2=bz(d);if(b2)G.stfRehire(b2,d);return `${esc(d.n)} nhận lời ở lại phụ việc nhẹ. Cả cơ sở yên tâm có người già dặn.`+fx(c,{tam:1})},n:c=>`${esc(d.n)} nhất quyết xin về, bảo già rồi chỉ muốn nằm võng.`+fx(c,{tam:-1})}]}},
{id:'stf_quit',fixed:1,t:'Người làm xin thôi việc',k:'Kinh doanh',
 x:(c,d)=>`${esc(d.n)} làm ${d.ra} ở ${esc(String(d.bn).toLowerCase())} đã ${d.yrs>=1?d.yrs+' năm':'ít lâu'} đến xin thôi. Người ấy bảo lương không đủ nuôi nhà, lại có chỗ khác trả hơn.`,
 o:(c,d)=>{const up=Math.round(raw(d)*1.25/10)*10;return [
  {l:`Giữ lại, tăng lương lên ${fm(up)}`,c:()=>G.money()>=up,f:c=>{const b=bz(d);if(b){const st=G.stfRehire(b,d,up);if(st)st.loy=70}return `${esc(d.n)} gật đầu ở lại.`+fx(c,{tam:1})}},
  {l:'Chia tay, chúc người ấy may mắn',f:c=>'Chỗ trống sẽ phải tuyển người mới.'+fx(c,{tam:-1})}]}},
{id:'stf_sick',fixed:1,t:'Người làm ngã bệnh',k:'Kinh doanh',
 x:(c,d)=>`${esc(d.n)}, ${d.ra} ${d.age} tuổi ở ${esc(String(d.bn).toLowerCase())}, đổ bệnh nặng. ${d.age>=55?'Tuổi này mà sốt cao thì khó lòng qua khỏi nếu không chạy chữa.':'Người ấy nằm liệt giường, không đủ tiền thuốc.'}`,
 o:(c,d)=>{const cost=Math.round(raw(d)*2.5/10)*10;return [
  {l:`Mời thầy thuốc đến chữa (${fm(cost)})`,c:()=>G.money()>=cost,f:c=>{const st=staffOf(d);if(st){st.care=1;st.loy=Math.min(100,(st.loy||60)+10)}return 'Thầy thuốc bốc thuốc, dặn kiêng cữ cẩn thận. Người bệnh khá lên thấy rõ.'+fx(c,{money:-cost,tam:2,fame:1})},},
  {l:'Cho nghỉ dưỡng bệnh, vẫn trả lương',f:c=>{const st=staffOf(d);if(st)st.loy=Math.min(100,(st.loy||60)+4);return 'Người làm cảm kích, nằm nghỉ ở nhà.'+fx(c,{tam:1})}},
  {l:'Mặc người ấy tự lo',f:c=>{const st=staffOf(d);if(st)st.loy=Math.max(0,(st.loy||60)-9);loyAll(d,-3);return 'Người làm xì xào nhà chủ phũ phàng.'+fx(c,{tam:-2})}}]}}
];
});
