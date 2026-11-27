/* Bách Niên Thế Gia · d9.12.68 · DI NGUYỆN (chủ dự án 24/11: "việc hoặc vật kéo dài, khó thành, cho phép truyền lại cho con cháu").
   Người nuôi kỳ vật mất thì passLong (engine.js) chuyển kỳ vật và các bước hẹn sang người thừa kế phù hợp nhất rồi xếp hộp này cho người ấy. */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const FM=v=>G.fmtMoney(v);const N=c=>esc(c.given);
const P=id=>G.P(id);
const nameOfDead=d=>{const p=d&&d.from?P(d.from):null;return p?esc(p.given):'người đi trước'};
return [
{id:'di_nguyen',t:'Di nguyện để lại',k:'Gia đình',tags:{},fixed:1,head:0,ms:1,
 x:(c,d)=>`${nameOfDead(d)} đã mất, để lại một món kỳ vật đang nuôi dở, nay đã đạt bậc ${d.lvl||1}/9. Trong di ngôn dặn: nếu ${N(c)} còn nhớ thì nối tiếp, nếu không thì cứ bán đi để lo việc nhà. Công của cả đời người, ${N(c)} không nỡ bỏ ngang.`,
 o:(c,d)=>[
  {l:'Nhận tiếp, tiếp tục nuôi kỳ vật',f:c=>{c.flags.ccv=Math.max(c.flags.ccv||1,1);return `${N(c)} cất kỳ vật vào chỗ cũ, giữ nguyên bậc đã đạt. Công người trước không uổng, nhưng ${N(c)} phải học lại cách nuôi.`+fx(c,{tam:4,cfame:1})}},
  {l:'Nhờ một người khác trong nhà tiếp nối',c:c=>G.alive().some(p=>p.id!==c.id&&G.inClan(p)&&G.age(p)>=18&&!p.away),f:c=>{const L=G.alive().filter(p=>p.id!==c.id&&G.inClan(p)&&G.age(p)>=18&&!p.away).sort((a,b)=>(b.tri+b.eq)-(a.tri+a.eq));const q=L[0];if(!q)return 'Không còn ai đủ sức.';q.flags.ccv=c.flags.ccv||d.lvl||1;q.flags.ccvT=c.flags.ccvT||0;c.flags.ccv=0;G.later(q,'cv_nuoi',R(12,24));return `${esc(q.given)} nhận lời nối tiếp việc nuôi kỳ vật, giữ nguyên bậc.`+fx(c,{tam:2})}},
  {l:'Bán đi lấy tiền lo việc nhà',f:c=>{const lv=c.flags.ccv||d.lvl||1;c.flags.ccv=0;c.flags.ccv_x=1;return `Kỳ vật đổi lấy một món tiền xứng với bậc ${lv}. Việc nuôi dở dang khép lại.`+fx(c,{money:m(Math.max(8,lv*10)),tam:-2})}}]},
{id:'di_chuc_viec_dai',t:'Việc dở dang trong di chúc',tags:{},fixed:1,head:0,ms:1,
 x:(c,d)=>`${N(c)} vừa lập di chúc, còn một việc chưa xong: ${(c.flags.ccv||0)>0&&!c.flags.ccv_x?'kỳ vật đang nuôi dở':'chuyện dài đang theo đuổi'}. Nếu mình đi trước, giao việc ấy cho ai nối tiếp?`,
 o:(c,d)=>{const sp=G.spouseOf(c);const ks=G.alive().filter(p=>p.id!==c.id&&G.inClan(p)&&!p.inLaw&&(G.age(p)>=16)&&(((p.parents||[]).includes(c.id))||((p.parents||[]).some(i=>{const q=G.P(i);return q&&(q.parents||[]).includes(c.id)})))).sort((a,b)=>a.born-b.born).slice(0,4);
  const L=ks.map(k=>({l:`Giao cho ${esc(k.given)}, ${G.age(k)} tuổi`,f:c=>{c.will=Object.assign({},c.will||{to:'auto'},{long:k.id});return `${esc(k.given)} được dặn giữ việc dở dang của ${N(c)}. Người ấy sẽ biết khi ngày đó đến.`+fx(c,{tam:2})}}));
  if(sp&&G.inClan(sp)&&sp.dead==null)L.push({l:`Giao cho ${esc(sp.given)}`,f:c=>{c.will=Object.assign({},c.will||{to:'auto'},{long:sp.id});return `${esc(sp.given)} nhận lời giữ việc dở dang.`+fx(c,{tam:2})}});
  L.push({l:'Để gia tộc tự định',f:c=>{if(c.will)delete c.will.long;return `Không dặn riêng ai. Khi đến lúc, việc sẽ về người phù hợp nhất trong nhà.`}});return L}},
{id:'no_chi_cau_cuu',t:'Chi họ cầu cứu gia tộc trả nợ',tags:{},fixed:1,head:1,ms:1,
 x:(c,d)=>{const p=G.P(d.who);return `${p?esc(p.given):'Người ở chi họ'} thừa kế khoản nợ riêng của người đã mất. Tiền riêng không đủ, quỹ chi cũng cạn: còn thiếu ${FM(d.amt||0)}. Chi họ đến xin gia tộc chính giúp, kẻo bị chủ nợ siết.`},
 o:(c,d)=>{const p=G.P(d.who);const amt=d.amt||0;const L=[];
  L.push(Object.assign({l:`Gia tộc trả hết (${FM(amt)})`,c:()=>G.money()>=amt},{f:c=>{if(p)p.purse=(p.purse||0)+amt;if(p)G.addRel(c,p,10);return `Công quỹ trả hết nợ cho chi họ. ${p?esc(p.given):'Chi họ'} cúi đầu ghi ơn, cả chi nhớ mãi.`+fx(c,{money:-amt,cfame:1,tam:2})+(p?fx(p,{tam:6}):'')}}));
  L.push(Object.assign({l:`Trả một nửa (${FM(Math.round(amt/2))}), phần còn lại chi tự gánh`,c:()=>G.money()>=Math.round(amt/2)},{f:c=>{const h=Math.round(amt/2);if(p)p.purse=(p.purse||0)+h;if(p)G.addRel(c,p,3);return `Gia tộc đỡ một nửa, chi phải tự lo phần còn lại. Không ai phàn nàn, nhưng cũng không ai vui.`+fx(c,{money:-h,tam:0})+(p?fx(p,{tam:-2}):'')}}));
  L.push({l:'Từ chối, bảo chi tự lo lấy',f:c=>{if(p)G.addRel(c,p,-12);return `Chi họ ra về không nói lời nào. Chủ nợ gõ cửa nhà ${p?esc(p.given):'họ'} hôm sau; cả chi bàn tán về sự lạnh lùng của nhà chính.`+fx(c,{cfame:-1,tam:-3})+(p?fx(p,{tam:-8}):'')}});return L}}
];
});
