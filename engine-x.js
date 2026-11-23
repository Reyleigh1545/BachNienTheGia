/* Bách Niên Thế Gia v6.7.10-d9.10 · engine-x.js: phần ENGINE tách ra tệp riêng (mục 12, tách engine thành module, bước đầu).
   Cơ chế: engine.js đẩy ngữ cảnh X (X.S luôn là ván hiện tại, cùng các hàm R, chance, log, alive, inClan, P, head, later, enqueue, mm, nameOf, shuf, pick, clamp) cho mọi hàm trong window.ENGX; hàm hằng năm đăng ký vào X.yearly, hàm cần cho admin vào X.fn.
   Đã tách: giang hồ (ghYear), quân hộ (qhYear), Đông xưởng (dxYear), Thiết khoán (tkYear), chi phí giữ quan hệ (relYear). Nạp sau events-lv.js và trước engine.js. */
window.ENGX=window.ENGX||[];
window.ENGX.push(X=>{
const {R,chance,log,alive,inClan,P,head,later,enqueue,mm,nameOf,shuf,pick,clamp,provN,qtLog}=X;
/* d9.10: GIANG HỒ THÀNH HỆ THỐNG. Chiến tranh giữa hai môn phái chạy theo năm (S.wr.gwar: {a,b,t,len,yrs,da,db}); hành động của đệ tử hai phái cộng vào da, db (sự kiện gh_phai_chien); hết chiến tranh thì phái thắng tăng sức mạnh, phái thua giảm, đệ tử hai phái nhận sự kiện gh_chien_ket. Mỗi 10 năm có đại hội định kỳ (gh_hoi_dinh_ky). */
function ghYear(){const S=X.S;const W=S.wr;if(!W||!W.sects||W.sects.length<2)return;const clampP=v=>Math.max(5,Math.min(100,Math.round(v)));
  const w=W.gwar;
  if(w){const a=W.sects.find(s=>s.id===w.a),b=W.sects.find(s=>s.id===w.b);if(!a||!b){W.gwar=null;return}
    w.yrs++;const pa=(a.pow||50)+w.da*4,pb=(b.pow||50)+w.db*4;const d=(pa-pb)/60;
    a.pow=clampP((a.pow||50)+R(-3,3)+Math.round(d*3)-1);b.pow=clampP((b.pow||50)+R(-3,3)-Math.round(d*3)-1);
    if(w.yrs>=w.len){const win=pa>=pb?a:b,lose=win===a?b:a;win.pow=clampP(win.pow+6);lose.pow=clampP(lose.pow-6);W.gwar=null;W.gwarEnd=S.t;
      log(`Cuộc chiến giữa ${win.n} và ${lose.n} kết thúc: ${win.n} thắng thế.`,'gd');
      alive().filter(p=>inClan(p)&&p.flags&&p.flags.ghs&&(p.flags.ghs===win.id||p.flags.ghs===lose.id)&&(p.flags.gh||0)>=1).forEach(p=>later(p,'gh_chien_ket',R(1,8),{s:p.flags.ghs,win:p.flags.ghs===win.id?1:0}))}}
  else if(S.t-(W.gwarEnd||-999)>=60&&chance(0.05)){const L=shuf(W.sects.slice());const a=L[0],b=L.find(s=>s!==a);if(a&&b){W.gwar={a:a.id,b:b.id,t:S.t,len:R(2,4),yrs:0,da:0,db:0};log(`Giang hồ dậy sóng: ${a.n} và ${b.n} khai chiến.`,'hi');
    alive().filter(p=>inClan(p)&&p.flags&&(p.flags.ghs===a.id||p.flags.ghs===b.id)&&(p.flags.gh||0)>=1).forEach(p=>later(p,'gh_phai_chien',R(1,10)))}}
  /* đại hội định kỳ mỗi 10 năm cho người đã có tiếng */
  if(S.t>=120&&S.t%120<12&&(W.hoiT||0)<S.t-60){W.hoiT=S.t;alive().filter(p=>inClan(p)&&p.job==='hiep'&&p.lv>=1).forEach(p=>later(p,'gh_hoi_dinh_ky',R(2,10)))}}
/* d9.10: QUÂN HỘ ĐỜI ĐỜI, ĐÔNG XƯỞNG THEO NĂM, THU HỒI THIẾT KHOÁN.
   Quân hộ (S.qh): khi nhà đã nhận giấy gọi quân hộ (cd_19) thì mỗi khoảng 20 đến 25 năm (một đời) phải có một người thật nhập ngũ; hết hạn, người đó chết hoặc về thì nhà bị gọi tiếp (sự kiện qh_phien_linh, chọn người nhà thật). Đông xưởng (S.dx.pow 0 đến 100): lên theo độ nghi kỵ của vua, quan nhà từ Tam phẩm bị dõi theo và tố cáo nhiều hơn khi thế lớn, và vua thanh trừng dễ hơn. Thiết khoán: vua mới hoặc vua nghi kỵ có thể thu lại (tk_thu_hoi). */
function qhYear(){const S=X.S;const q=S.qh;
  if(!q){if(alive().some(p=>inClan(p)&&p.seen&&p.seen['cd_19']))S.qh={on:true,t0:S.t,next:S.t+R(60,120),who:null,pend:false};return}
  if(!q.on)return;
  if(q.who){const w=P(q.who);if(!w||w.dead!=null||!inClan(w)||(w.job!=='quan_ngu'&&S.t-(q.t0||0)>=24)){if(q.who){q.who=null;q.next=Math.min(q.next,S.t+R(12,36));q.pend=false}}}
  if(!q.pend&&!q.who&&S.t>=q.next&&head()){q.pend=true;enqueue('ev',S.head,{ev:'qh_phien_linh',data:{}})}}
function dxYear(){const S=X.S;const d=S.dyn;if(!d||!d.k)return;const DXS=S.dx=S.dx||{pow:30,hi:0};const k=d.k;
  DXS.pow=Math.max(0,Math.min(100,DXS.pow+(k.nghi-50)/25+R(-2,2)-(k.uy>=75?1:0)));
  if(DXS.pow>=70&&!DXS.hi){DXS.hi=1;log('Đông xưởng thế lớn, quan lại trong triều ai cũng dè chừng.','hi')}else if(DXS.pow<45&&DXS.hi){DXS.hi=0;log('Đông xưởng bớt hống hách.','gd')}
  if(DXS.pow>=60)alive().filter(p=>inClan(p)&&p.job==='quan'&&p.lv>=4&&p.seen&&p.seen['cd_12']).forEach(p=>{if(chance((DXS.pow-55)/250))later(p,pick(['dx_theo_doi','dx_bi_to']),R(1,10))})}
function tkYear(){const S=X.S;if(!S.tk||!head())return;const d=S.dyn;if(!d||!d.k)return;const e=d.emp||'';if(S.tkEmp==null){S.tkEmp=e;return}
  const newKing=S.tkEmp!==e;S.tkEmp=e;if(chance(newKing?0.35:(d.k.nghi>=70?0.1:0.01)))enqueue('ev',S.head,{ev:'tk_thu_hoi',data:{}})}
/* d9.10 (mục 12, chi phí giữ quan hệ trong clanSupport): mỗi mối thông gia quan (S.tgq) và mỗi người đã lên kinh (flags.kinh) tốn một khoản lễ tết hằng năm; không đủ tiền hai năm liền thì mối nguội đi một bậc. */
function relYear(){const S=X.S;const nk=alive().filter(p=>inClan(p)&&p.flags&&p.flags.kinh).length;const n=(S.tgq||0)+nk;if(!n)return;const cost=mm(2*n);
  if(S.money>=cost){S.money-=cost;S.relMiss=0}else{S.relMiss=(S.relMiss||0)+1;if(S.relMiss>=2){S.relMiss=0;if(S.tgq>0){S.tgq--;log('Nhà thông gia quan lạnh nhạt vì hai năm liền không lễ tết, mối quan hệ nguội đi.','hi')}else{const p=alive().find(q=>inClan(q)&&q.flags&&q.flags.kinh);if(p){p.flags.kinh=0;log(`${nameOf(p)} ở kinh thành mất người đỡ đầu vì nhà không còn gửi lễ.`,'hi')}}}}}

/* d9.10 (mục 12, thế lực tự phát đầy đủ): mỗi điểm nóng của hạt giống ván có MỘT THẾ LỰC có tên (S.wr.tl: {p, id, n, pow, rel, st}). st: ngam (âm thầm lớn dần theo độ nóng), noi (đã nổi dậy, loạn thiên hạ tăng, thu thuế dân, sự kiện đòi nhà chơi), tan (bị dẹp, một thời gian sau có thể trỗi lại). rel là cảm tình của nhà chơi với thế lực ấy. */
const TLT=[{id:'hoikin',n:'Hội Bạch Liên'},{id:'giaco',n:'Giặc cỏ Hắc Phong'},{id:'bang',n:'Bang Thủy Tặc'}];
function tlForces(){const S=X.S;const w=S.wr;if(!w||!w.hot)return [];w.tl=w.tl||[];w.hot.forEach((p,i)=>{if(!w.tl.find(f=>f.p===p)){const t=TLT[i%3];w.tl.push({p,id:t.id,n:t.n+' ở '+provN(p),pow:R(10,25),rel:0,st:'ngam',yr:0})}});return w.tl}
function tlForceYear(){const S=X.S;const w=S.wr;if(!w||!w.hot||!S.dyn)return;tlForces().forEach(f=>{const h=(w.heat&&w.heat[f.p])||0;f.yr++;
    if(f.st==='ngam'){f.pow=Math.max(0,Math.min(100,f.pow+(h-45)/20+R(-2,3)));if(f.pow>=75&&chance(0.25)){f.st='noi';f.noiT=S.t;S.dyn.loan=Math.min(100,(S.dyn.loan||0)+4);log(f.n+' nổi dậy, thiên hạ thêm xáo động.','hi');qtLog('Thế lực tự phát nổi dậy',f.n+' đã khởi sự.')}}
    else if(f.st==='noi'){f.pow=Math.max(0,Math.min(100,f.pow+R(-6,4)-((S.dyn.dt||50)>=60?2:0)));if(f.pow<=30||S.t-f.noiT>=72){f.st='tan';f.tanT=S.t;S.dyn.loan=Math.max(0,(S.dyn.loan||0)-3);log(f.n+' bị triều đình dẹp, thiên hạ bớt xáo động.','gd')}}
    else if(f.st==='tan'&&S.t-f.tanT>=120){f.st='ngam';f.pow=R(8,18);f.rel=Math.round(f.rel/2)}})}
X.yearly.push(ghYear,qhYear,dxYear,tkYear,relYear,tlForceYear);
Object.assign(X.fn,{ghYear,qhYear,dxYear,tkYear,relYear,tlForceYear,tlForces});
});
