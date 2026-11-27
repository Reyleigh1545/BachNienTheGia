/* Bách Niên Thế Gia v6.7.0-d9.6 · Liên hôn với quan và đưa người vào kinh (Q11): chọn người nhà thật, hậu quả thật.
   Người được liên hôn hoặc đưa vào kinh mang cờ flags.tgq / flags.kinh, được tính vào "cả gia tộc đồng lòng" (clanSupport). */
window.EVF.push(G=>{
const {R,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const N=c=>esc(c.given);
const hasOff=()=>G.alive().some(p=>G.inClan(p)&&p.job==='quan'&&(p.lv||0)>=2);
return [
{id:'lh_quan_cau_than',t:'Nhà quan ngỏ lời liên hôn',k:'Hôn sự',head:1,age:[30,70],tier:[2,6],w:0.6,pcd:120,cd:60,c:c=>hasOff()&&G.kinList(c,p=>!G.married(p)&&G.age(p)>=17&&G.age(p)<=32).length>0,
 x:c=>`Một vị quan ở phủ bên nhắn người sang ngỏ lời: nhà ông muốn kết thông gia với nhà ${N(c)}. Có nhà quan làm chỗ dựa thì đường quan của cả họ sẽ nhẹ đi, nhưng người được chọn phải theo về nhà ấy.`,
 o:c=>[{l:'Chọn một người trong nhà gả sang',c:c=>G.kinList(c,p=>!G.married(p)&&G.age(p)>=17&&G.age(p)<=32).length>0,go:(c,d)=>G.pickKin(c,{eyebrow:'Liên hôn',title:'Gả ai sang nhà quan',text:'Người được chọn sẽ rời nhà chính, làm người nhà bên ấy. Mị lực và EQ của người đó quyết định nhà quan có coi trọng hay không. Chọn người nào?',filter:p=>!G.married(p)&&G.age(p)>=17&&G.age(p)<=32,cb:w=>{const ok=chance(Math.max(0.35,Math.min(0.9,0.4+(w.mi+w.eq)/300)));w.left='xuatgia';w.leftT=S().t;w.flags=w.flags||{};w.flags.tgq=1;S().tgq=(S().tgq||0)+1;G.later(c,'lh_quan_hau',R(30,60),{w:w.id,ok:ok?1:0});G.log(`${G.nameOf(w)} về làm dâu rể nhà quan.`,'gd');
   return (ok?`${N(w)} được nhà quan quý trọng, cả hai bên qua lại thân thiết. Có người thông gia làm quan, đường thăng tiến của cả họ bớt trắc trở.`:`${N(w)} về nhà quan nhưng bị coi nhẹ vì xuất thân thấp. Vẫn là thông gia, nhưng ơn nghĩa chẳng được mấy.`)+fx(c,{fame:ok?R(6,12):2,cfame:ok?4:1,tam:ok?3:-2,money:m(R(20,40))})+fx(w,{tam:ok?5:-4})}})},
  {l:'Từ chối khéo, nói con cháu còn nhỏ',f:c=>'Nhà quan hơi phật ý nhưng vẫn giữ lễ. Cơ hội không còn.'+fx(c,{tam:-1,fame:-1})}]},
{id:'kinh_dua_nguoi',t:'Gửi người lên kinh gây dựng',k:'Kinh thành',head:1,age:[30,70],tier:[1,6],w:0.6,pcd:120,cd:72,c:c=>G.kinList(c,p=>G.age(p)>=16&&G.age(p)<=35&&!(p.flags&&p.flags.kinh)).length>0,
 x:c=>`Người quen ở kinh thành nhắn lại: nếu nhà ${N(c)} gửi được một người trẻ lên, ông sẽ nhận làm việc và chỉ đường quen biết. Ở xa thì khó có đường vào quan trường, mà lên kinh thì tốn kém và nhớ nhà.`,
 o:c=>{const g=m(25);return [{l:`Cử một người trẻ lên kinh (${G.fmtMoney(g)})`,c:c=>G.money()>=g&&G.kinList(c,p=>G.age(p)>=16&&G.age(p)<=35&&!(p.flags&&p.flags.kinh)).length>0,go:(c,d)=>G.pickKin(c,{eyebrow:'Kinh thành',title:'Cử ai lên kinh',text:'Người được cử sẽ xa nhà ba đến năm năm. Tài trí và ăn nói quyết định có gây dựng được hay không. Chọn người nào?',filter:p=>G.age(p)>=16&&G.age(p)<=35&&!(p.flags&&p.flags.kinh),cb:w=>{const ok=chance(Math.max(0.3,Math.min(0.85,0.3+(w.tri+w.eq)/300)));S().money-=g;w.flags=w.flags||{};G.setAway(w,{type:'odo',until:S().t+R(36,60)});
   G.later(c,'kinh_ve_tin',R(30,48),{w:w.id,ok:ok?1:0});if(ok){w.flags.kinh=1;G.addStat(w,'eq',2);G.addStat(w,'tri',2)}
   return (ok?`${N(w)} lên kinh, làm quen được vài người có chức phận. Nhà có người ở kinh, tin tức nghe nhanh hơn và việc cầu cạnh dễ hơn.`:`${N(w)} lên kinh nhưng đất khách khó sống, vật lộn mấy năm mà chẳng gây dựng được gì.`)+fx(c,{tam:ok?2:-2,fame:ok?3:0})+fx(w,{tam:ok?3:-5,suc:ok?0:-4})}})},
  {l:'Để người nhà ở lại, nhà mình lo nổi thì lo',f:c=>''}]}},
{id:'lh_quan_hau',t:'Nhà thông gia quan nhắn lại',k:'Hôn sự',fixed:1,head:1,
 x:(c,d)=>{const w=d.w?G.P(d.w):null;return w?(d.ok?`Nhà thông gia làm quan nhắn: ${esc(w.given)} ở bên ấy sống yên ổn, ông thông gia có việc nhờ một người trong nhà ${N(c)} giúp, đổi lại sẽ đỡ lời cho ai đang cần đường quan.`:`Nhà thông gia ít khi nhắn. Hôm nay có tin: ${esc(w.given)} bị đối xử lạnh nhạt, nhưng ông thông gia lại ngỏ lời nhờ nhà mình một việc.`):'Nhà thông gia quan có nhắn tin nhưng người đi đã không còn liên lạc.'},
 o:(c,d)=>{const w=d.w?G.P(d.w):null;if(!w)return [{l:'Tiếc',f:()=>''}];const v=m(12);return [
  {l:`Giúp việc ông ấy nhờ (${G.fmtMoney(v)})`,c:()=>G.money()>=v,f:c=>{S().money-=v;if(d.ok)S().tgq=(S().tgq||0)+1;G.later(c,'lh_buoc3',R(36,60),{w:d.w,ok:d.ok});return (d.ok?'Ông thông gia nhớ ơn, về sau nhắc nhà mình trong các buổi họp quan. Mối thông gia thêm bền.':'Ông thông gia dịu giọng, '+esc(w.given)+' được đối đãi khá hơn.')+fx(c,{fame:3,tam:2})+fx(w,{tam:d.ok?3:5})}},
  {l:'Từ chối, giữ khoảng cách',f:c=>{if(S().tgq>0)S().tgq--;return 'Mối thông gia nguội dần. '+esc(w.given)+' ở bên ấy cũng chịu thiệt.'+fx(c,{tam:-2})+fx(w,{tam:-4})}}]}},
{id:'kinh_ve_tin',t:'Tin người ở kinh',k:'Kinh thành',fixed:1,head:1,
 x:(c,d)=>{const w=d.w?G.P(d.w):null;return w&&w.dead==null?(d.ok?`${esc(w.given)} gửi thư từ kinh: đã có chỗ đứng, quen thêm mấy người có chức phận, hỏi nhà có muốn gửi thêm người lên cùng.`:`${esc(w.given)} gửi thư từ kinh: sống khổ, xin về hoặc xin thêm tiền để cố thêm.`):'Tin từ kinh không còn ai gửi nữa.'},
 o:(c,d)=>{const w=d.w?G.P(d.w):null;if(!w||w.dead!=null)return [{l:'Tiếc',f:()=>''}];const v=m(15);return d.ok?[
  {l:`Gửi thêm tiền để mở rộng đường dây (${G.fmtMoney(v)})`,c:()=>G.money()>=v,f:c=>{S().money-=v;G.addStat(w,'eq',1);G.later(c,'kinh_buoc3',R(30,54),{w:d.w,ok:1});return `${esc(w.given)} dùng tiền để đi lại nhiều hơn, tin tức từ kinh về đều đặn.`+fx(c,{fame:3})+fx(w,{tam:3})}},
  {l:'Dặn giữ gìn, tự lo',f:c=>fx(w,{tam:1})}]:[
  {l:`Gửi tiền cho cố thêm (${G.fmtMoney(v)})`,c:()=>G.money()>=v,f:c=>{S().money-=v;w.flags=w.flags||{};const b=chance(0.5);if(b)w.flags.kinh=1;G.later(c,'kinh_buoc3',R(30,54),{w:d.w,ok:b?1:0});return b?`Có tiền, ${esc(w.given)} xoay xở được một chỗ làm nhỏ ở kinh.`+fx(w,{tam:4}):`Tiền hết mà việc vẫn chưa khá.`+fx(w,{tam:-3})}},
  {l:'Gọi về quê',f:c=>{G.setAway(w,null);return `${esc(w.given)} về nhà, gầy hơn nhưng bình an.`+fx(w,{tam:2})}}]}}
];
});
