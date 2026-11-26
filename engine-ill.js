/* Bách Niên Thế Gia v6.7.10-d9.12 · BỆNH TẬT THẬT (kế hoạch d9.12 mục 3.4; chủ dự án 24/11: "chưa có cơ chế mắc bệnh thật ở nhân vật nên kết quả chưa thực sự ảnh hưởng, suy tính việc tạo cơ chế bệnh tật").
   Người có c.ill: danh sách bệnh {id, n, sev 1 đến 4, t0, until, tr (đã chữa), ch (mạn tính)}. Mỗi tháng (illTick, gọi từ monthlyPerson): trừ sức khỏe và tâm trạng, bệnh có thể khỏi, thành mạn tính (hạ sức khỏe tối đa) hoặc chết nếu không chữa.
   Chữa trị là quyết định có giá: tự chữa, thầy lang, danh y, người nhà làm nghề y (thông thạo y làm tăng hiệu quả), cầu cúng. Hộp chữa trị là sự kiện ill_chua (ev-d912f.js). Hồ sơ hiện chip "Ốm: …". */
window.ENGX=window.ENGX||[];
window.ENGX.push(X=>{
const {R,chance,log,alive,inClan,P,pick,clamp,age,enqueue,esc,mm,nameOf}=X;
const G=X.EC.G;const S=()=>X.S;
/* d: suc mất mỗi tháng; dur: số tháng; mort: xác suất chết mỗi tháng khi không chữa; ch: xác suất để lại di chứng (giảm sức khỏe tối đa); sea: mùa dễ mắc */
const DIS={
 cam:{n:'Cảm lạnh',sev:1,dur:[1,2],d:2,mort:0,ch:0,sea:['dong','xuan']},
 ho_phoi:{n:'Ho phổi',sev:2,dur:[3,8],d:3,mort:0.004,ch:0.25,sea:['dong']},
 sot_ret:{n:'Sốt rét',sev:2,dur:[2,5],d:4,mort:0.006,ch:0.12,sea:['ha','thu']},
 thuong_han:{n:'Thương hàn',sev:3,dur:[3,6],d:5,mort:0.03,ch:0.3,sea:['ha','thu']},
 lao:{n:'Lao phổi',sev:3,dur:[14,40],d:3,mort:0.02,ch:0.6,chronic:1,sea:null},
 dau_lung:{n:'Đau lưng, khớp',sev:1,dur:[999,999],d:1,mort:0,ch:0,chronic:1,sea:null,old:1},
 tim:{n:'Bệnh tim',sev:3,dur:[999,999],d:2,mort:0.012,ch:0,chronic:1,sea:null,old:1},
 dai:{n:'Bệnh dại',sev:4,dur:[2,3],d:9,mort:0.45,ch:0,sea:null},
 thuong_noi:{n:'Thương nội (tẩu hỏa)',sev:2,dur:[3,9],d:3,mort:0.004,ch:0.3,sea:null},
 viem_phoi:{n:'Viêm phổi',sev:3,dur:[2,5],d:6,mort:0.03,ch:0.35,sea:null},
 gay_xuong:{n:'Gãy xương',sev:2,dur:[2,4],d:3,mort:0,ch:0.1,sea:null},
 hoa_lieu:{n:'Bệnh hoa liễu',sev:1,dur:[6,18],d:1,mort:0.001,ch:0.2,sea:null}
};
const ills=c=>c.ill||(c.ill=[]);
function start(c,id,o){o=o||{};const D=DIS[id];if(!D||!c||c.dead!=null)return null;if(ills(c).some(i=>i.id===id))return null;
  const mo=R(D.dur[0],D.dur[1]);const sev=o.sev||D.sev;const t=S().t;
  const i={id,n:D.n,sev,t0:t,until:D.dur[0]>=999?999999:t+mo,tr:0,ch:!!D.chronic};ills(c).push(i);
  if(sev>=2&&alive().includes(c)&&inClan(c))log(`${nameOf(c)} mắc ${D.n.toLowerCase()}.`,'hi');return i}
const has=(c,id)=>!!(c.ill&&c.ill.some(i=>!id||i.id===id));
/* sức chữa của người nhà làm nghề y: thông thạo y của người giỏi nhất còn ở nhà */
function doctorPower(){let b=0;alive().forEach(p=>{if(inClan(p)&&p.job==='y'&&!p.away&&p.dead==null)b=Math.max(b,(p.m||0)/100+(p.tri||50)/400)});return b}
/* điều trị: how = 'tu' | 'lang' | 'danhy' | 'nha' | 'cung'; trả về mô tả ngắn */
function treat(c,i,how){const pw={tu:0.15,lang:0.45,danhy:0.8,nha:0.35+doctorPower(),cung:0.05}[how]||0;i.tr=Math.max(i.tr||0,pw);
  if(pw>=0.4&&i.until<900000)i.until=Math.min(i.until,S().t+Math.max(1,Math.round((i.until-S().t)*(1-pw*0.6))));return pw}
function illTick(c,a){const L=c.ill;if(!L||!L.length||c.dead!=null)return;const t=S().t;
  for(let k=L.length-1;k>=0;k--){const i=L[k];const D=DIS[i.id];if(!D){L.splice(k,1);continue}
    const tr=i.tr||0;
    /* trừ sức khỏe: tối thiểu 0,4 điểm, bớt khi đã chữa; không tự giết trừ khi bệnh nặng không chữa */
    const dd=(D.d*(i.sev/2))*(1-tr*0.6);c.suc=Math.max(i.sev>=3&&!tr?1:3,c.suc-dd);c.tam=Math.max(5,c.tam-(i.sev>=2?1.2:0.4));
    /* chết: bệnh nặng không chữa (hoặc chữa yếu), tăng theo tuổi và lúc sức yếu */
    if(D.mort>0){const pm=D.mort*(1-tr*0.85)*(a>=60?1.6:a<8?1.4:1)*(c.suc<20?2:1)*(has(c,'tim')&&D.sev>=3?1.3:1);
      if(chance(pm)){X.EC.die?X.EC.die(c,'bệnh '+D.n.toLowerCase()):G.die(c,'bệnh '+D.n.toLowerCase());return}}
    if(!i.ch&&t>=i.until){/* khỏi, có thể để lại di chứng nếu chưa chữa */
      L.splice(k,1);if(D.ch&&chance(D.ch*(1-tr*0.8))&&c.cap){c.cap.suc=Math.max(30,c.cap.suc-R(1,3));if(inClan(c))log(`${nameOf(c)} khỏi ${D.n.toLowerCase()} nhưng để lại di chứng, sức khỏe không còn như trước.`,'hi')}else if(inClan(c)&&i.sev>=2)log(`${nameOf(c)} đã khỏi ${D.n.toLowerCase()}.`,'gd')}
    else if(i.ch&&D.dur[0]<999&&t>=i.until){/* bệnh mạn: sau thời gian dài chuyển nhẹ hơn nếu có chữa */
      if(tr>=0.4){L.splice(k,1);if(inClan(c))log(`${nameOf(c)} đã khỏi hẳn ${D.n.toLowerCase()} nhờ chữa lâu dài.`,'gd')}else i.until=t+R(6,18)}}
  if(!L.length)c.ill=null}
/* mỗi năm: bệnh theo mùa, tuổi và đặc tính; bệnh nặng của người chơi điều khiển được sinh hộp chữa trị */
function illYear(){const s=S();const season=X.EC.season?X.EC.season():null;let popups=0;
  alive().filter(p=>inClan(p)&&p.dead==null).forEach(p=>{const a=age(p);const sickT=(G.TRAITS&&G.has?(G.has(p,'omyeu')?1.6:G.has(p,'bachdoc')?0.1:1):1);
    const base=(0.05+(a>=55?0.05:0)+(a<6?0.04:0)+(p.suc<40?0.05:0))*sickT*(G.healthMul?G.healthMul(p):1);
    if(!chance(base))return;
    let pool=Object.keys(DIS).filter(k=>{const D=DIS[k];if(D.old&&a<55)return false;if(k==='dai'||k==='gay_xuong'||k==='thuong_noi'||k==='hoa_lieu'||k==='viem_phoi')return false;return true});
    if(a>=60)pool=pool.concat(['dau_lung','tim','dau_lung']);
    /* d9.12: bệnh theo vùng đất nhà ở (w63_dis_lu và các thiên tai vùng đã có địa lý; bệnh vặt cũng cần): rừng núi phía nam và tây nhiều sốt rét; phía bắc lạnh nhiều thương hàn, ho phổi; vùng sông nước nhiều tả, kiết lỵ */
    try{const PV=(window.D&&window.D.PROV)||{};const pv=PV[s.loc&&s.loc.p];const rg=pv&&pv.r;const add=(k,n)=>{if(DIS[k])for(let i=0;i<n;i++)pool.push(k)};if(rg==='nam'||rg==='tay'){add('sot_ret',3)}else if(rg==='bac'){add('thuong_han',2);add('ho_phoi',2)}else if(rg==='dong'||rg==='trung'){add('sot_ret',1);add('thuong_han',1)}}catch(e){}
    const id=pick(pool);const i=start(p,id);if(!i)return;
    if(i.sev>=2&&popups<1&&X.EC.isCtrl&&X.EC.isCtrl(p)&&X.EVMAP.ill_chua){popups++;enqueue('ev',p.id,{ev:'ill_chua',data:{ill:id}})}
    else if(i.sev>=2)treat(p,i,chance(0.5)?'lang':'tu')})}
X.yearly.push(illYear);
G.ill={start,has,treat,DIS,doctorPower,tick:illTick};
Object.assign(X.fn,{illTick});
});
