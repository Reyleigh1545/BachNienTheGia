/* Bách Niên Thế Gia · d9.12.68 · DI NGUYỆN (chủ dự án 24/11: "việc hoặc vật kéo dài, khó thành, cho phép truyền lại cho con cháu").
   Người nuôi kỳ vật mất thì passLong (engine.js) chuyển kỳ vật và các bước hẹn sang người thừa kế phù hợp nhất rồi xếp hộp này cho người ấy. */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const N=c=>esc(c.given);
const P=id=>G.P(id);
const nameOfDead=d=>{const p=d&&d.from?P(d.from):null;return p?esc(p.given):'người đi trước'};
return [
{id:'di_nguyen',t:'Di nguyện để lại',k:'Gia đình',tags:{},fixed:1,head:0,ms:1,
 x:(c,d)=>`${nameOfDead(d)} đã mất, để lại một món kỳ vật đang nuôi dở, nay đã đạt bậc ${d.lvl||1}/9. Trong di ngôn dặn: nếu ${N(c)} còn nhớ thì nối tiếp, nếu không thì cứ bán đi để lo việc nhà. Công của cả đời người, ${N(c)} không nỡ bỏ ngang.`,
 o:(c,d)=>[
  {l:'Nhận tiếp, tiếp tục nuôi kỳ vật',f:c=>{c.flags.ccv=Math.max(c.flags.ccv||1,1);return `${N(c)} cất kỳ vật vào chỗ cũ, giữ nguyên bậc đã đạt. Công người trước không uổng, nhưng ${N(c)} phải học lại cách nuôi.`+fx(c,{tam:4,cfame:1})}},
  {l:'Nhờ một người khác trong nhà tiếp nối',c:c=>G.alive().some(p=>p.id!==c.id&&G.inClan(p)&&G.age(p)>=18&&!p.away),f:c=>{const L=G.alive().filter(p=>p.id!==c.id&&G.inClan(p)&&G.age(p)>=18&&!p.away).sort((a,b)=>(b.tri+b.eq)-(a.tri+a.eq));const q=L[0];if(!q)return 'Không còn ai đủ sức.';q.flags.ccv=c.flags.ccv||d.lvl||1;q.flags.ccvT=c.flags.ccvT||0;c.flags.ccv=0;G.later(q,'cv_nuoi',R(12,24));return `${esc(q.given)} nhận lời nối tiếp việc nuôi kỳ vật, giữ nguyên bậc.`+fx(c,{tam:2})}},
  {l:'Bán đi lấy tiền lo việc nhà',f:c=>{const lv=c.flags.ccv||d.lvl||1;c.flags.ccv=0;c.flags.ccv_x=1;return `Kỳ vật đổi lấy một món tiền xứng với bậc ${lv}. Việc nuôi dở dang khép lại.`+fx(c,{money:m(Math.max(8,lv*10)),tam:-2})}}]}
];
});
