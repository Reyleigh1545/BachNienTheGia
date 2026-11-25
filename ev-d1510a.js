/* Bách Niên Thế Gia · 7.0.0-d.1.5.10 · MỌI SỰ KIỆN PHẢI GẮN VỚI NGƯỜI CỤ THỂ (luật 0.16, chủ dự án 24/11: "tất cả các sự kiện đều phải gắn với người cụ thể, người có liên quan để tất cả sự kiện không bị vô lí vô cớ xuất hiện", sau khi `lw_01` "Đấu ẩu ngoài chợ" ra cho nhà không có trẻ con).
   Danh sách từ luật R28 của tools/evlint.js (lời kể nhắc con cái, con dâu, con nuôi… mà điều kiện không kiểm): mỗi sự kiện dưới đây chỉ ra khi nhà thật sự có người ấy, và gắn người đó vào hộp (d.who → thẻ chân dung).
   Làm bằng EVPATCH (bọc điều kiện `c` và lời kể `x` của sự kiện gốc, không đụng chuỗi hậu sự). Sự kiện mới viết sau phải tự có điều kiện như thế, evlint R28 sẽ báo nếu thiếu. */
window.EVPATCH=window.EVPATCH||[];
window.EVPATCH.push(function(E,G){
const {pick,esc}=G;
const find=id=>E.find(e=>e.id===id);
const clanL=()=>G.alive().filter(p=>G.inClan(p));
const kids=c=>G.kidsOf(c).filter(k=>k.dead==null&&G.inClan(k));
const ag=p=>G.age(p);
/* gate(id, chọn người): chọn trả về người liên quan hoặc null (null thì sự kiện không ra); gán d.who */
function gate(id,sel,nameText){const e=find(id);if(!e||e.__g1510)return;e.__g1510=1;
  const c0=e.c;e.c=function(c,d){if(typeof c0==='function'&&!c0.call(this,c,d))return false;try{return !!sel(c)}catch(er){return false}};
  const x0=e.x;e.x=function(c,d){d=d||{};let who=null;try{who=sel(c)}catch(er){}if(who&&!Array.isArray(who))d.who=who.id;const t=typeof x0==='function'?x0.call(this,c,d):x0;return nameText&&who&&!Array.isArray(who)?nameText(t,who,c):t}}
const one=L=>L.length?pick(L):null;
/* lw_01 Đấu ẩu ngoài chợ: một đứa con có thật từ 6 đến 17 tuổi */
gate('lw_01',c=>one(kids(c).filter(k=>ag(k)>=6&&ag(k)<=17)),(t,k,c)=>`${esc(k.given)}, con nhà ${esc(c.given)}, đánh nhau với mấy đứa ở chợ làng. Một đứa bên kia gãy tay, cha nó kéo cả họ đến cửa đòi người.`);
/* lw_12 nhà quyền thế hỏi cưới con gái: một người con gái 14 đến 26 tuổi chưa chồng */
gate('lw_12',c=>one(kids(c).filter(k=>k.g!=='nam'&&ag(k)>=14&&ag(k)<=26&&!G.spouseOf(k))),(t,k,c)=>`Một nhà quyền thế sang đặt vấn đề cưới ${esc(k.given)}, con gái nhà ${esc(c.given)}, cho con trai họ. Lời nói nhẹ, ý ép nặng. Nhà này nổi tiếng không nhận lời từ chối.`);
/* lw_39 chia gia sản: ít nhất hai người con trưởng thành */
gate('lw_39',c=>{const L=kids(c).filter(k=>ag(k)>=18);return L.length>=2?L[0]:null});
/* lw_41 con dâu góa: một người đàn bà trong nhà có chồng đã mất */
gate('lw_41',c=>one(clanL().filter(p=>p.g!=='nam'&&p.spouse&&G.P(p.spouse)&&G.P(p.spouse).dead!=null&&ag(p)>=20)));
/* lw_42 con nuôi đòi phần như con ruột: một người con nuôi từ 16 tuổi */
gate('lw_42',c=>one(clanL().filter(p=>p.adopted&&ag(p)>=16)));
/* lw_47 con trai thương cô gái tiện dân: một người con trai 16 đến 30 tuổi chưa vợ */
gate('lw_47',c=>one(kids(c).filter(k=>k.g==='nam'&&ag(k)>=16&&ag(k)<=30&&!G.spouseOf(k))),(t,k,c)=>`${esc(k.given)}, con trai nhà ${esc(c.given)}, thương một cô gái làm thuê nhà kẻ khác, thân phận tiện dân. Luật triều không cho lương dân cưới tiện dân.`);
/* lw_73 người con từng dính án muốn ghi danh đi thi: một người con từ 16 tuổi */
gate('lw_73',c=>one(kids(c).filter(k=>ag(k)>=16)));
/* dh_18 con dâu kể chuyện mẹ chồng: một người con dâu còn sống, chồng còn sống trong nhà */
gate('dh_18',c=>one(clanL().filter(p=>p.g!=='nam'&&p.inLaw&&p.spouse&&G.P(p.spouse)&&G.P(p.spouse).dead==null&&G.inClan(G.P(p.spouse)))));
/* c631_lao_ke_chuyen bọn trẻ vây quanh nghe kể chuyện: có trẻ từ 4 đến 16 tuổi trong nhà */
gate('c631_lao_ke_chuyen',c=>one(clanL().filter(p=>ag(p)>=4&&ag(p)<=16)));
/* v6_tu_cai đứa con nhỏ đói meo: một đứa con từ 1 đến 12 tuổi */
gate('v6_tu_cai',c=>one(kids(c).filter(k=>ag(k)<=12)));
/* d.1.5.18 (R30 cha mẹ, anh chị em): gd_anh_em_cai cần hai anh chị em ruột trong nhà; gd_chi_dau cần một chị dâu hoặc em dâu; lw_50 (bỏ mặc cha mẹ già) cần cha hoặc mẹ của gia chủ còn sống */
const sibs=c=>{const L=clanL().filter(p=>p.id!==c.id&&(p.parents||[]).some(x=>(c.parents||[]).includes(x)));return L};
gate('gd_anh_em_cai',c=>{const A=clanL().filter(p=>(p.parents||[]).length&&clanL().some(q=>q.id!==p.id&&(q.parents||[]).some(x=>p.parents.includes(x))));return A.length>=2?A[0]:null});
gate('gd_chi_dau',c=>one(clanL().filter(p=>p.g!=='nam'&&p.inLaw&&p.spouse&&G.P(p.spouse)&&G.P(p.spouse).dead==null)));
gate('lw_50',c=>one((c.parents||[]).map(id=>G.P(id)).filter(p=>p&&p.dead==null)));
});
