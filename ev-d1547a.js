/* Bách Niên Thế Gia · 7.0.0-d.1.5.47 · MUA CHỨC QUA CỬA SAU CỦA QUAN THAM; MỜI LÀM QUAN CHỈ NGƯỜI TÀI CÓ DANH HIỆU
   (chủ dự án 27/11: "cho người làm quan mua chức nếu nhà có tiền mà thi 1 lần không qua. Việc người có trí cao được mời làm quan thì chỉ nên xuất hiện trên người có trí trên 100 và đã có danh hiệu trí lực,
   cũng có thể mời cả người có võ cao có danh hiệu võ làm võ quan, tùy theo điểm chỉ số và danh hiệu mà được xét đến các chức vị cao hơn nhưng các chức vị này phải còn trống"). */
window.EVF.push(G=>{
const {fx,esc,R,chance}=G;const S=()=>G.S();const FM=v=>G.fmtMoney(v);const N=c=>esc(c.given);
const man=d=>d&&d.qk?G.seatMan(d.qk,d.qn):null;
return [
/* d.1.5.48: người bán là quan tham đang ngồi ghế thật, có người dắt mối; mua quan bán tước là tội chém, về sau có thể bị phát giác */
{id:'mua_chuc_cuu',t:'Cửa sau mua chức',k:'Hoạn lộ',fixed:1,tags:{},
 x:(c,d)=>{const n=man(d);if(!n)return 'Mối ấy không còn.';d.npc=n.id;return `${esc(d.mg||'Một người quen')} dắt mối: ${esc(d.qn)}, đang giữ chức ${esc(G.seatName(d.qk))}, chịu nhận ${FM(G.buyOffice.price())} để lo cho ${N(c)} một chức Cửu phẩm. Người ta nói nhỏ, vì mua quan bán tước là tội chém. Bạc đã vào sổ người ấy thì tên mình cũng nằm trong sổ.`},
 o:(c,d)=>{const n=man(d);if(!n)return [{l:'Thôi',f:()=>''}];const gia=G.buyOffice.price();const re=Math.round(gia*0.7);
  const mua=(cc,fee)=>{const r=G.buyOffice.pay(cc,fee,d.qk,d.qn);if(r){G.tie.rel(n,10,'nhận bạc chạy chức');G.tie.on(n,4)}return r};
  return [
  {l:`Nộp đủ bạc, nhận chức (${FM(gia)})`,c:()=>G.money()>=gia,ax:{tv:2},f:cc=>{const r=mua(cc,gia);return r?`${N(cc)} cầm bằng nhậm chức. ${r}`+fx(cc,{liem:-12,tam:4}):'Chức ấy không còn trống.'}},
  {l:`Mặc cả còn bảy phần (${FM(re)})`,c:()=>G.money()>=re,r:[{_g:1,khau:0.8,muu:0.4},40],y:cc=>{const r=mua(cc,re);return r?`Người ấy cười, nhận bảy phần. ${r}`+fx(cc,{liem:-12,tam:5}):'Chức ấy không còn trống.'},n:cc=>{S().money-=Math.round(re*0.3);G.tie.rel(n,-15,'bị mặc cả');return `${esc(d.qn)} giữ phần đặt cọc rồi coi như chưa từng nghe gì.`+fx(cc,{tam:-8})}},
  {l:'Không mua, coi như chưa nghe',ax:{thanh:1},f:cc=>{G.tie.rel(n,-5,'từ chối cửa sau');return `${N(cc)} cảm ơn người dắt mối rồi về chong đèn.`+fx(cc,{liem:4,tri:1,tam:-2})}},
  {l:'Gom chứng cứ, tố kẻ bán quan',ax:{thanh:2},r:[{_g:1,tri:0.6,gan:0.6,eq:0.3},35],y:cc=>{G.tie.rel(n,-60,'bị tố bán quan');G.tie.oan(n,30);G.seatPush(d.qk,'bị hặc tham nhũng vì bán quan');return `Án được tra. ${esc(d.qn)} mất chức.`+fx(cc,{fame:16,cfame:6,liem:6,tam:5})},n:cc=>{G.tie.rel(n,-50,'bị tố hụt');G.tie.oan(n,25);G.later(cc,'qs_tra_thu',R(12,40),{qk:d.qk,qn:d.qn});return `Chứng cứ không đủ. ${esc(d.qn)} đã biết ai đứng sau lá đơn.`+fx(cc,{fame:-8,tam:-10})}}]}}
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
