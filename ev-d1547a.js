/* Bách Niên Thế Gia · 7.0.0-d.1.5.47 · MUA CHỨC CỬU PHẨM SAU KHI THI TRƯỢT; MỜI LÀM QUAN CHỈ NGƯỜI TÀI CÓ DANH HIỆU
   (chủ dự án 27/11: "cho người làm quan mua chức nếu nhà có tiền mà thi 1 lần không qua. Việc người có trí cao được mời làm quan thì chỉ nên xuất hiện trên người có trí trên 100 và đã có danh hiệu trí lực,
   cũng có thể mời cả người có võ cao có danh hiệu võ làm võ quan, tùy theo điểm chỉ số và danh hiệu mà được xét đến các chức vị cao hơn nhưng các chức vị này phải còn trống"). */
window.EVF.push(G=>{
const {fx,esc,R}=G;const S=()=>G.S();const FM=v=>G.fmtMoney(v);const N=c=>esc(c.given);
return [
{id:'mua_chuc_cuu',t:'Quyên tiền mua chức',k:'Hoạn lộ',fixed:1,tags:{},
 x:c=>`${N(c)} thi không đỗ. Có người chỉ đường: triều đình đang nhận quyên, nộp ${FM(G.buyOffice.price())} thì được bổ một chức Cửu phẩm. Quan trường vẫn nhớ ai vào bằng bạc.`,
 o:c=>[
  {l:`Quyên bạc nhận chức Cửu phẩm (${FM(G.buyOffice.price())})`,c:()=>!G.buyOffice.why(c),f:cc=>{const r=G.buyOffice.buy(cc);return r?`${N(cc)} cầm bằng nhậm chức. ${r}`+fx(cc,{liem:-8,fame:-2,tam:6}):'Việc quyên chức không thành.'}},
  {l:'Giữ bạc, đèn sách chờ khoa sau',ax:{cc:2},f:cc=>`${N(cc)} cất bạc đi, tối lại chong đèn.`+fx(cc,{tri:R(1,2),tam:-2})}]}
];
});
/* MỜI LÀM QUAN: văn cần trí trên 100 và đã có danh hiệu trí; võ cần võ trên 100 và đã có danh hiệu võ. Danh hiệu càng cao thì được xét chức càng cao; chỉ mời vào ghế còn trống. */
window.EVPATCH=window.EVPATCH||[];
window.EVPATCH.push(function(E,G){
const e=E.find(x=>x.id==='tt_cau_hien');if(!e||e.__g1547)return;e.__g1547=1;
const {fx,esc}=G;const S=()=>G.S();const N=c=>esc(c.given);const emp=()=>{try{return G.vua.d().emp}catch(er){return ''}};
/* chủ dự án 27/11: không cấp chức quá Ngũ phẩm. Phẩm tính 0 Cửu, 1 Bát, 2 Thất, 3 Lục, 4 Ngũ */
const TRAN=4;
const MAXV=[1,2,3,4,4,4,4,4]; /* phẩm văn cao nhất theo bậc danh hiệu trí (0 = Bác học, mốc 100) */
const MAXM=[3,3,4,4,4,4,4,4]; /* cấp quân cao nhất theo bậc danh hiệu võ (3 = Bách hộ, 4 = Thiên hộ, ngang Ngũ phẩm) */
const fit=p=>G.inClan(p)&&G.inMain(p)&&!p.away&&(p.g==='nam'||S().royal)&&G.age(p)>=22&&G.age(p)<=58&&!['quan','quan_ngu','nguy','vua'].includes(p.job);
function find(){const L=[];for(const p of G.alive()){if(!fit(p))continue;
    for(const [k,mil] of [['tri',false],['vo',true]]){const t=G.ctRank(p,k);if(t<0||!((p[k]||0)>100))continue;L.push({p,mil,t,max:(mil?MAXM:MAXV)[Math.min(7,t)],v:p[k]})}}
  L.sort((a,b)=>b.t-a.t||b.v-a.v);
  for(const x of L){const key=G.vacantSeat(x.p,x.mil,x.max);if(key)return Object.assign(x,{key})}
  return null}
const keep=d=>{const p=d&&d.oid?G.P(d.oid):null;return p&&fit(p)&&d.key&&G.seatFree(d.key)?p:null};
e.c=function(){return !!find()};
e.x=function(c,d){d=d||{};if(!keep(d)){const f=find();if(!f)return 'Triều đình cần người tài.';d.oid=f.p.id;d.key=f.key;d.mil=f.mil?1:0;d.ten=G.ctName(f.p,f.mil?'vo':'tri')}
  const p=G.P(d.oid);return `Trong triều đang khuyết chức ${esc(G.seatName(d.key))}. Tiếng ${N(p)}, ${G.age(p)} tuổi, được người đời gọi là ${esc(d.ten)}, truyền tới tai vua ${esc(emp())}, dù người ấy chưa từng ${d.mil?'cầm quân':'ra làm quan'}. Triều đình cho người đến hỏi thăm riêng.`};
e.o=function(c,d){const p=keep(d||{});if(!p)return [{l:'Đành để cơ hội trôi qua',f:()=>''}];
  return [{l:`Để ${p.given} nhận chức ${d.mil?'võ':'quan'}`,ax:{tv:1},f:cc=>{if(!G.takeSeat(p,d.key))return 'Chức ấy vừa có người khác nhận.';return `${N(p)} được bổ làm ${esc(G.seatName(d.key))}.`+fx(p,{fame:8,tam:8})}},
    {l:`Để ${p.given} từ chối, giữ nếp ở nhà`,ax:{tiet:1},f:cc=>`${N(p)} cảm tạ rồi cáo từ. Người ta khen người ấy không màng danh lợi.`+fx(p,{fame:3,tam:2})},
    {l:`Xin cho ${p.given} thêm một năm đèn sách, luyện tập rồi mới ra`,ax:{cc:1},f:cc=>{S().cool.tt_cau_hien=S().t+12;return `Triều đình bằng lòng chờ, nhưng ghế này không giữ cho ai.`+fx(p,d.mil?{vo:2,tam:1}:{tri:2,tam:1})}}]};
});
