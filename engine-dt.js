/* Bách Niên Thế Gia · 7.0.0-d.1.5.65 · ĐỜI LÍNH (chủ dự án 28/11: "tâm trạng của người đi lính luôn thấp, không có cách nào tăng lên vì nhà cửa và mức sống không ảnh hưởng tới người đi lính", "sống trong doanh trại, sống cùng bao nhiêu người, bách hộ thì vẫn chưa có nhà cửa được cấp riêng nên không thể gặp những sự kiện khác",
   "nhà định hôn sự tao cũng không hề biết … nhân vật khởi đầu mất cha mất mẹ, mồ côi hoàn toàn", "nút bà mối giờ thay vì mở lại như bình thường nhưng phải khác so với bình thường, ít lựa chọn"). Đề xuất đợt 1 đã được bảo làm.
   Người lính "ở doanh trại" = job quan_ngu và away kiểu army. Gói này lo: tâm trạng, hồi sức, đồng đội và thượng quan là người thật, lọc chuyện không thuộc doanh trại, danh hiệu và định hôn có hộp, bà mối nơi đóng quân. */
window.ENGX=window.ENGX||[];
window.ENGX.push(X=>{
const {R,chance,log,alive,inClan,P,head,enqueue,mm,nameOf,pick,clamp,age,esc,money}=X;
const S=()=>X.S;const E=()=>X.EC;const G=()=>X.EC.G;
const linh=c=>!!c&&c.dead==null&&c.job==='quan_ngu'&&!!c.away&&c.away.type==='army';
const choO=c=>c.lv<=1?'lều chung mười người':c.lv===2?'lều riêng của đội':c.lv===3?'một gian riêng trong doanh':'dinh riêng trong doanh, được đưa vợ con theo';
const duocDuaVo=c=>c.lv>=4;
/* ---------- đồng đội và thượng quan ---------- */
const song=id=>{const n=id&&G().tie&&G().tie.get(id);return n&&n.ok!==0?n:null};
function taoNguoi(c,vai,mo,tuoi,bac){const ten=pick(E().SURN)+' '+E().mkGiven('nam');return G().tie.ensure(c,{vai:[vai],name:ten,g:'nam',age:tuoi,nghe:mo,tier:bac,rel:R(5,20),why:'cùng một doanh',noHouse:vai==='dong_doi',key:'dt:'+c.id+':'+vai+':'+S().t+':'+R(1,999)})}
function doi(c){if(!linh(c)||!G().tie)return null;const f=c.flags;const D=f.doi||(f.doi={dd:[],tq:null});
  D.dd=D.dd.filter(id=>song(id));while(D.dd.length<2){const n=taoNguoi(c,'dong_doi','người lính cùng đội',R(Math.max(17,age(c)-6),age(c)+8),Math.max(0,Math.min(3,c.lv)));if(!n)break;D.dd.push(n.id)}
  if(!song(D.tq)){const n=taoNguoi(c,'thuong_quan','thượng quan trong doanh',R(34,55),Math.min(6,c.lv+2));D.tq=n?n.id:null}return D}
const dongDoi=c=>{const D=doi(c);return D?D.dd.map(song).filter(Boolean):[]};
const thuongQuan=c=>{const D=doi(c);return D?song(D.tq):null};
/* ---------- người nhà ---------- */
const nguoiLonONha=c=>alive().filter(q=>inClan(q)&&q.id!==c.id&&q.hh===E().mainHH()&&!q.away&&age(q)>=18);
/* người lớn trong họ có thể đứng ra lo hôn sự: cha mẹ còn sống, hoặc người trong họ từ 30 tuổi */
const nguoiLonHo=c=>alive().filter(q=>inClan(q)&&q.id!==c.id&&((c.parents||[]).includes(q.id)||(age(q)>=30&&!q.inLaw&&age(q)>age(c)+5)));
const coThu=c=>nguoiLonHo(c).length>0||!!E().spouseOf(c);
/* ---------- tâm trạng: tính theo đời quân, không theo nhà và mức sống ở quê ---------- */
function tamNen(c){const s=S();const comfort=[-3,-1,1,4,7,9,10,11][Math.min(7,c.lv)];
  const dd=dongDoi(c);const tq=thuongQuan(c);const relD=dd.length?dd.reduce((a,n)=>a+(n.rel||0),0)/dd.length:0;
  let t=55+comfort+clamp(relD/8,-6,9)+(tq?clamp((tq.rel||0)/15,-5,5):0);
  const th=c.flags.tranGan;if(th&&th.den>s.t)t+=th.v;
  if(coThu(c))t+=4;if(s.war)t-=6;return t}
/* sức khỏe: quân y và thời gian giữa các trận */
const hpThem=c=>linh(c)?(S().war?0.6:1.8)+((c.flags.nghiTran||0)>S().t?2.5:0):0;
/* ---------- chuyện nào được tới tay người ở doanh trại ---------- */
const QD_ID=/^(qn|cp_|lq_|cx_|qs_|ct_|dt_|ill_|xc_|dl_|tinh_thu|v641_vo|qh_|np_qua_doi|tlb_chan|th_vothan|pm_n|kiet_ly|benh_dich|dau_mua|ho_lao|cho_dai|v63_k_uon|v63_k_vet)/;
const QD_K=/Quân|Chiến|Binh|Danh hiệu|Thư nhà|Đi đường|Đột phá/;
function laQuan(e){if(!e)return true;const j=[].concat(e.job||[]);return j.includes('quan_ngu')||QD_ID.test(e.id)||QD_K.test(String(e.k||''))||!!e.ct}
/* trả về 'qua' nếu được hiện, 'bo' nếu bỏ, 'chuyen' nếu đã chuyển cho người ở nhà */
function chan(c,e,it){if(!linh(c)||!e)return 'qua';
  if((c.flags.nghiTran||0)>S().t&&/^(qn_tran|qn_giao|qn_tran_lon|cp_|qn631_tien|qn631_gac_ai|cx_tran)/.test(e.id))return 'bo';
  if(laQuan(e))return 'qua';
  if(e.arc){const L=nguoiLonONha(c);if(!L.length)return 'qua'}
  const L=nguoiLonONha(c);if(!L.length)return 'bo';
  const q=L.find(z=>E().isHead(z))||L[0];enqueue('ev',q.id,{ev:it.ev,data:Object.assign({},it.data||{})});return 'chuyen'}
/* ---------- mỗi tháng ---------- */
function month(){const s=S();if(!s||s.over||!G().tie)return;
  alive().forEach(c=>{if(!inClan(c)||!linh(c)||age(c)<16)return;doi(c);
    if(!E().isCtrl(c))return;
    if(c.suc<35&&(c.flags.duongHoi||0)<=s.t){c.flags.duongHoi=s.t+10;enqueue('ev',c.id,{ev:'dt_duong_thuong',data:{}});return}
    if((c.flags.canhT||0)<=s.t&&chance(s.war?0.07:0.12)){c.flags.canhT=s.t+R(5,9);
      const L=['dt_ruou','dt_dong_doi_xin','dt_tuong_goi','dt_thu_nha','dt_nghi_ngoi'].filter(id=>((c.seen||{})[id]||-999)<s.t-24);if(L.length)enqueue('ev',c.id,{ev:pick(L),data:{}})}})}
/* ---------- hôn sự do người lớn trong họ lo: có người cụ thể, có hộp, được từ chối ---------- */
function dinhHon(c){const L=nguoiLonHo(c);if(!L.length)return false;const nguoi=L.find(z=>E().isHead(z))||L.find(z=>(c.parents||[]).includes(z.id))||L[0];
  const p=E().mkMatch(c,{g:c.g==='nam'?'nữ':'nam'});E().ensurePersona(p);c.flags.honHoi=S().t;enqueue('honsu',c.id,{p,lo:nguoi.id});return true}
function honPopup(c,it){const p=it.p;const lo=P(it.lo);if(!p||!lo||c.dead!=null||!inClan(c)||E().spouseOf(c)){setTimeout(X.EC.nextPopup,0);return}
  const tai=[['trí',p.tri],['võ',p.vo],['mị',p.mi],['EQ',p.eq]].map(x=>x[0]+' '+Math.round(x[1])).join(', ');
  E().choicePopup(c,'Hôn sự trong họ','Người nhà ngỏ một mối',`${esc(nameOf(lo))} gửi thư ra doanh trại: đã xem được một mối cho ${esc(c.given)}, ${p.g==='nữ'?'cô':'cậu'} ${esc(p.surname+' '+p.given)}, ${Math.floor((S().t-p.born)/12)} tuổi, ${tai}. Ưng thuận thì hai nhà định hôn, kỳ phép sau về cưới.`,[
    {l:'Ưng thuận, định hôn',f:cc=>{cc.flags.dinhhon=S().t;cc.flags.honP=p;log(`${nameOf(cc)} định hôn với ${p.surname} ${p.given}.`,'gd');return `Thư hồi âm gửi về. Kỳ phép tới ${esc(cc.given)} sẽ về cưới.`+X.fx(cc,{tam:6})}},
    {l:'Xin để khi khác',f:cc=>{cc.flags.honHoi=S().t+36;return `${esc(lo.given)} đọc thư, không ép.`+X.fx(cc,{tam:1})}}])}
/* ---------- danh hiệu được gọi lúc không có cảnh: vẫn phải có hộp ---------- */
function danhHieuPopup(c,it){if(c.dead!=null||!inClan(c)){setTimeout(X.EC.nextPopup,0);return}
  const xa=c.away?(linh(c)?'trong doanh trại':'ở nơi xa'):'trong vùng';
  X.infoPopup(c,'Danh hiệu',`Được gọi là ${it.ten}`,`${esc(nameOf(c))} lâu nay được người ta nhìn bằng con mắt khác. Nay ${xa} đã quen gọi ${c.g==='nữ'?'nàng':'chàng'} là <b>${esc(it.ten)}</b>.<span class="fx"><span class="up">Danh hiệu ${esc(it.ten)}</span><span class="up">Danh vọng +${it.fame}</span></span>`)}
function baoDanhHieu(c,k,i){const ten=window.D.STITLE[k][i][1];if(inClan(c))enqueue('danhhieu',c.id,{ten,fame:Math.round(6+i*5)})}
/* ---------- bà mối nơi đóng quân: mỗi năm một lần, một hai người, không làm khi đang chiến sự ---------- */
function moiWhy(c){if(!linh(c))return '';if(E().spouseOf(c))return 'đã lập gia thất';if(S().war)return 'đang chiến sự';if((c.flags.mkDT||0)>S().t)return `đợi thêm ${c.flags.mkDT-S().t} tháng`;return ''}
function moi(c){if(!linh(c)||moiWhy(c))return;const tq=thuongQuan(c);const dd=dongDoi(c).sort((a,b)=>(b.rel||0)-(a.rel||0))[0];
  const tot=tq&&(tq.rel||0)>=25;const nguon=tot?`Thượng quan ${tq.n} làm mai`:dd&&(dd.rel||0)>=25?`${dd.n} muốn gả em gái cho bạn đồng đội`:'Bà mối quanh đồn dẫn con gái nhà dân';
  const f0=S().money;E().matchmaker(c,{max:tot?2:1,noOut:1,eyebrow:`Mối nơi đóng quân · ${nguon}`,boost:tot?0.6:0});if(S().money<f0||document.querySelector('#modal [data-now],#modal [data-know]'))c.flags.mkDT=S().t+12}
X.EC.G.dt={linh,choO,duocDuaVo,doi,dongDoi,thuongQuan,tamNen,hpThem,laQuan,chan,month,dinhHon,nguoiLonHo,nguoiLonONha,coThu,baoDanhHieu,moi,moiWhy};
Object.assign(X.fn,{honPopup,danhHieuPopup,dtMonth:month});
});
