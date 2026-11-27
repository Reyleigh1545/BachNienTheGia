/* Bách Niên Thế Gia · 7.0.0-d.1.5.43 · XIN GIÚP ĐỠ CÓ LÝ DO, THƯỜNG DÂN KHÔNG BỊ HỌ KHÁC CẦU CẠNH, TRANH CHẤP LÀM ĂN VỀ NGƯỜI BUÔN BÁN
   (chủ dự án 27/11: "các sự kiện họ khác hoặc người quen đến xin giúp đỡ nhiều quá, chỉ nên là những người quen từ các sự kiện trước đó, có độ hảo cảm cao, thực sự sa sút … xin giúp không chỉ tiền … theo công việc, địa vị của người được cầu xin và gia tộc … loại khó khăn nào thì mức giúp, phần thưởng khác nhau. Khi đang là nhà thường dân thì không có sự kiện họ khác cầu cạnh … không đến lượt diện kiến, tặng lễ cho quốc công hoặc phiên vương, tranh chấp với họ khác chỉ khi nhà có cơ sở kinh doanh hoặc người nhà làm ăn buôn bán, và đẩy về người đó, có lựa chọn nhờ gia chủ ra mặt").
   Chốt chặn lúc hiện hộp nằm ở engine.js (G.askOk, BN_TIERBLOCK, BN_DISPUTE, BN_OFF). */
window.BN_TIERBLOCK=new Set(['rg_nho_giup','rg_suy_cau_dua','rg_lien_minh','rg_hoa_giai','rg_ket_thong_gia','rg_hop_von','rg_ket_giao','rg_thiep_moi','rg_lay_long','rg_vun_dap','rg_mung_tho','rg_hoc_chung','rg_dam_tang','ho_phan_xu','ho_nho_che_cho','ho_ket_be','hg_a_nhogiup','vuong_gap_mat','vuong_nho_viec','vuong_hon_su','hv_vuong_xin_luong','hv_tuan_du','hv_quoc_cong_que','vpv_1','tc_chieu_binh','vv_mi_yen_tiec']);
window.BN_DISPUTE=new Set(['rg_tranh_cai','rg_chen_ep','rg_canh_tranh','rg_tranh_ruong','rg_pha_co_so','rg_ngam_ngam','rg_boi_nho','rg_hanh_hung','rg_vu_cao','rg_song_con']);
/* "người xin giúp" vô danh, không phải người quen từ chuyện trước: tắt (phần xin giúp nay đi qua np_sa_co) */
window.BN_OFF=new Set(['ho_hang_xin','v61_cho_vay_ban','v6_ban_vay','v62_ho_xa_xin_viec','v64_ho_hang_len_nho']);
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const FM=v=>G.fmtMoney(v);
const T=d=>d&&d.npc?G.tie.get(d.npc):null;
const adult=p=>G.inClan(p)&&G.age(p)>=16&&!p.away;
const by=f=>G.alive().filter(p=>adult(p)&&f(p)).sort((a,b)=>(b.lv||0)-(a.lv||0))[0]||null;
const who=p=>esc(p.given);
return [
/* ===== người quen ơn nghĩa quay lại trả ơn, phần thưởng theo loại khó khăn đã được giúp ===== */
{id:'np_tra_on',t:'Trả ơn năm xưa',k:'Người quen',fixed:1,tags:{},
 x:(c,d)=>{const n=T(d);if(!n)return 'Có người quen cũ ghé thăm.';const L={benh:'chữa khỏi bệnh cho người nhà',kien:'gỡ cho vụ kiện',bi_ep:'che chở khi bị ức hiếp',mat_nghe:'cho công ăn việc làm',con_hoc:'cho con cái chỗ học',thien_tai:'cưu mang lúc mất nhà',no:'gỡ nợ'};
  return `${esc(n.n)} nay đã gượng dậy, không quên ngày nhà ${who(c)} ${L[d.kho]||'giúp lúc khó'}. Người ấy tìm đến để đáp lại.`},
 o:(c,d)=>{const n=T(d);if(!n)return [{l:'Cảm ơn',f:()=>''}];
  const take={
   benh:{l:'Nhận mấy vị thuốc quý và phương thuốc gia truyền',f:cc=>{G.alive().filter(p=>G.inClan(p)&&!p.away).forEach(p=>G.addStat(p,'suc',R(3,6)));return 'Cả nhà được bồi bổ, ai cũng khỏe ra.'+fx(cc,{tam:4})}},
   kien:{l:'Nhận lời hứa làm chứng, đỡ lời cho nhà khi cần',f:cc=>{G.cf(15,'Có người đứng về phía nhà');return 'Tiếng tăm nhà mình có tình có nghĩa lan ra.'+fx(cc,{cfame:6,on:2})}},
   bi_ep:{l:'Nhận lòng trung, để người ấy làm tai mắt trong vùng',f:cc=>{return 'Từ đó nhà biết sớm chuyện trong vùng, ít bị bất ngờ.'+fx(cc,{on:4,cfame:4,eq:2})}},
   mat_nghe:{l:'Nhận người ấy làm tay đắc lực',f:cc=>{const b=(S().biz||[])[0];if(b){b.bonus=Math.min(0.5,(b.bonus||0)+0.06);return 'Cơ sở có người tận tâm, sổ sách khởi sắc.'+fx(cc,{on:2})}return 'Người ấy giúp việc nhà không công cả mùa.'+fx(cc,{money:m(8),on:2})}},
   con_hoc:{l:'Nhận lễ tạ của đứa con nay đã thành người',f:cc=>fx(cc,{money:m(R(8,16)),cfame:6,tam:5})},
   thien_tai:{l:'Nhận vốn và công sức đáp lại',f:cc=>fx(cc,{money:m(R(14,24)),tam:5})},
   no:{l:'Nhận lại cả vốn lẫn lãi',f:cc=>fx(cc,{money:m(R(16,26)),tam:4})}}[d.kho]||{l:'Nhận lễ tạ',f:cc=>fx(cc,{money:m(8),tam:3})};
  return [take,{l:'Chỉ nhận tấm lòng, xin giữ tình lâu dài',f:cc=>{G.tie.rel(n,15,'không nhận hậu tạ');G.tie.on(n,6);return `${esc(n.n)} càng nể trọng nhà mình.`+fx(cc,{cfame:4,tam:4,eq:2})}}]}}
];
});
window.EVPATCH=window.EVPATCH||[];
window.EVPATCH.push(function(E,G){
const {R,pick,chance,fx,esc}=G;
const find=id=>E.find(e=>e.id===id);
const S=()=>G.S();const m=v=>G.mm(v);const FM=v=>G.fmtMoney(v);
const T=d=>d&&d.npc?G.tie.get(d.npc):null;
const adult=p=>G.inClan(p)&&G.age(p)>=16&&!p.away;
const by=f=>G.alive().filter(p=>adult(p)&&f(p)).sort((a,b)=>(b.lv||0)-(a.lv||0))[0]||null;
const official=()=>by(p=>p.job==='quan'||(p.tuoc||0)>0);
const doctor=()=>by(p=>p.job==='y'||p.job==='nguy');
const scholar=()=>by(p=>p.job==='su'||p.job==='thulai');
const teacher=()=>by(p=>p.job==='su');
const strong=()=>by(p=>(p.vo||0)>=60);
const guard=()=>by(p=>(p.tuoc||0)>0||p.job==='quan'||(p.vo||0)>=80);
const who=p=>esc(p.given);

/* ===== np_sa_co: loại khó khăn, cách giúp theo nghề và địa vị của nhà, phần thưởng khác nhau ===== */
const KHO={
 no:{t:'chủ nợ siết, cầm cố cả nhà cửa',cash:14,cl:'Trả nợ giúp, chuộc lại đồ cầm'},
 benh:{t:'người nhà ốm nặng, thuốc thang tốn kém',cash:6,cl:'Gửi tiền thuốc thang'},
 kien:{t:'vướng kiện oan, sắp bị tịch biên',cash:8,cl:'Giúp tiền theo kiện'},
 mat_nghe:{t:'mất kế sinh nhai, cả nhà không ai thuê',cash:10,cl:'Cho vốn dựng lại nghề'},
 con_hoc:{t:'không còn tiền cho con ăn học, đứa trẻ sắp phải bỏ sách',cash:8,cl:'Lo học phí cho đứa trẻ'},
 thien_tai:{t:'nhà cháy, đồ đạc mất sạch',cash:12,cl:'Giúp tiền dựng lại nhà'},
 bi_ep:{t:'bị một kẻ có thế trong vùng ức hiếp, đòi chiếm đất',cash:10,cl:'Biếu lễ dàn xếp với kẻ kia'}};
{const e=find('np_sa_co');if(e&&!e.__g1543){e.__g1543=1;
 e.x=function(c,d){const n=T(d);if(!n)return 'Có người quen gặp khó.';if(!n.kho||!KHO[n.kho])n.kho=pick(Object.keys(KHO));d.kho=n.kho;
  return `${esc(n.n)}, ${esc(n.nghe||'người quen')}, chỗ thân tình lâu nay, đến nhà ${who(c)}: ${KHO[n.kho].t}. Người ấy đã hết đường xoay xở mới dám mở lời.`};
 e.o=function(c,d){const n=T(d);if(!n)return [{l:'Thôi',f:()=>''}];const k=d.kho||n.kho||'no';const K=KHO[k];const cost=m(K.cash);
  /* cứu được: người ấy gượng dậy, mang ơn, vài năm sau trả ơn đúng loại */
  const saved=(cc,rel,on,txt,eff)=>{G.tie.rel(n,rel,'được giúp lúc '+K.t);G.tie.on(n,on);n.sa=null;n.tier=Math.min(6,(n.tier||0)+1);n.goal={k:'bao_an',p:30,t:S().t};G.later(cc,'np_tra_on',R(24,72),{npc:n.id,kho:k});return txt+fx(cc,Object.assign({qh:[n.n,rel]},eff||{}))};
  const L=[{l:`${K.cl} (${FM(cost)})`,c:()=>G.money()>=cost,f:cc=>saved(cc,18,8,'Có tiền kịp thời, người ấy qua được cơn ngặt.',{money:-cost,tam:3})},
    {l:`Giúp một phần (${FM(Math.round(cost/3))})`,c:()=>G.money()>=Math.round(cost/3),f:cc=>{G.tie.rel(n,6,'được giúp một phần');return 'Đỡ được phần nào, người ấy cảm kích dù còn chật vật.'+fx(cc,{money:-Math.round(cost/3),qh:[n.n,6]})}}];
  if(k==='benh'){const p=doctor();if(p)L.push({l:`Cử ${p.given} sang chữa tận nơi`,r:[{tri:0.7,eq:0.3},45],y:cc=>{G.addStat(p,'tri',1);return saved(cc,26,10,`${who(p)} ở lại mấy ngày, người bệnh qua khỏi.`,{cfame:3,tam:5})},n:cc=>{G.tie.rel(n,6,'đã cố chữa');return `${who(p)} dốc sức nhưng bệnh quá nặng. Người ấy vẫn ghi lòng.`+fx(cc,{tam:-4,qh:[n.n,6]})}})}
  if(k==='kien'){const p=official();if(p)L.push({l:`Nhờ ${p.given} nói đỡ ở nha môn`,f:cc=>saved(cc,28,10,`Một lời của ${who(p)}, vụ kiện được xét lại, người ấy được minh oan.`,{cfame:4,fame:3})});
    const q=scholar();if(q)L.push({l:`Nhờ ${q.given} viết đơn kêu oan`,r:[{tri:0.8,eq:0.2},55],y:cc=>saved(cc,22,8,`Đơn viết chặt chẽ, quan trên xử lại.`,{cfame:3}),n:cc=>{G.tie.rel(n,5,'viết đơn giúp');return 'Đơn gửi đi không có hồi âm.'+fx(cc,{qh:[n.n,5]})}})}
  if(k==='mat_nghe'){const b=(S().biz||[])[0];if(b)L.push({l:'Nhận vào làm ở cơ sở của nhà',f:cc=>saved(cc,24,10,'Có việc làm, người ấy làm hết sức mình.',{on:1,tam:3})});
    else if(G.tierIdx()>=3)L.push({l:'Đem thể diện nhà giới thiệu một chỗ làm',f:cc=>saved(cc,16,6,'Có người nể nhà mình mà nhận.',{fame:1})})}
  if(k==='con_hoc'){const p=teacher();if(p)L.push({l:`Nhận đứa trẻ vào học với ${p.given}`,f:cc=>saved(cc,24,12,`Đứa trẻ ngày ngày sang học với ${who(p)}.`,{cfame:3,eq:2})})}
  if(k==='thien_tai'){L.push({l:'Cho cả nhà người ấy ở nhờ một thời gian',f:cc=>saved(cc,22,8,'Nhà chật hơn, nhưng người gặp nạn có mái che.',{tam:-3,cfame:3})});
    const p=strong();if(p)L.push({l:`Cử ${p.given} sang góp sức dựng lại nhà`,f:cc=>{G.addStat(p,'suc',-2);G.addStat(p,'vo',1);return saved(cc,18,6,`${who(p)} gánh gỗ dựng cột cả tháng trời.`,{cfame:2})}})}
  if(k==='bi_ep'){const p=guard();if(p)L.push({l:`Để ${p.given} đứng ra che chở`,f:cc=>saved(cc,30,12,`Thấy ${who(p)} ra mặt, kẻ kia phải lùi.`,{fame:4,cfame:4,tam:-1})})}
  L.push({l:'Từ chối, bảo nhà cũng không kham được',f:cc=>{G.tie.rel(n,-14,'bị từ chối lúc khó');if((n.rel||0)<20)G.tie.oan(n,6);return `${esc(n.n)} lặng lẽ ra về.`+fx(cc,{tam:-2,qh:[n.n,-14]})}});
  return L}}}

/* ===== rg_nho_giup (họ khác gặp nạn): chỉ họ thân đang thật sự khốn khó, cách giúp theo loại nạn ===== */
{const e=find('rg_nho_giup');if(e&&!e.__g1543){e.__g1543=1;
 e.rg={f:1,b:['trike','dongminh','men'],c:i=>(i.wealth==null?50:i.wealth)<45};
 const I=d=>d&&d.rr?G.rel.info(d.rr):null;
 const NAN={chay:'kho hàng cháy rụi',oan:'con trai bị bắt oan',mua:'mất mùa liền hai vụ, người trong họ thiếu ăn',no:'bị chủ nợ siết, sắp mất cơ nghiệp'};
 e.x=function(c,d){const i=I(d);if(!i)return '';if(!d.nan)d.nan=pick(Object.keys(NAN));return `${esc(i.name)} gặp nạn: ${NAN[d.nan]}. Chỗ thân tình lâu nay, gia chủ nhà ấy đích thân sang nhờ nhà mình.`};
 e.o=function(c,d){const i=I(d);if(!i)return [{l:'Cho qua',f:()=>'Chuyện không thành.'}];const big=m(10+i.tier*5),k=d.nan||'no';
  const ok=(cc,rel,txt,eff)=>{i.rel0(rel);i.addOan(-10);i.log('Được nhà mình giúp lúc hoạn nạn');G.later(cc,'rg_nho_chuyen_cu',R(60,140),{rr:d.rr});return txt+fx(cc,eff||{})};
  const L=[];
  if(k==='chay'){L.push({l:`Cho vay tiền dựng lại (${FM(big)})`,c:()=>G.money()>=big,f:cc=>ok(cc,20,'Kho mới dựng lên, nhà ấy ghi sổ ơn.',{money:-big,cfame:2})});
    const p=strong();if(p)L.push({l:`Cử ${p.given} dẫn người sang giúp dựng lại`,f:cc=>{G.addStat(p,'suc',-2);return ok(cc,14,'Người nhà mình làm quần quật cả tháng bên họ.',{cfame:3})}})}
  if(k==='oan'){const p=official();if(p)L.push({l:`Nhờ ${p.given} can thiệp ở nha môn`,f:cc=>ok(cc,30,`Nhờ ${who(p)} ra mặt, con trai nhà ấy được tha. Ơn này nhà họ không quên.`,{fame:4,cfame:4})});
    const q=scholar();if(q)L.push({l:`Nhờ ${q.given} viết đơn kêu oan`,r:[{tri:0.8,eq:0.2},55],y:cc=>ok(cc,22,'Đơn được xét, người bị bắt được thả.',{cfame:3}),n:cc=>{i.rel0(4);return 'Đơn chưa được xét, nhà ấy vẫn cảm tấm lòng.'+fx(cc,{})}});
    L.push({l:`Góp tiền chạy chữa án (${FM(big)})`,c:()=>G.money()>=big,f:cc=>ok(cc,18,'Án nhẹ đi nhiều.',{money:-big,liem:-2})})}
  if(k==='mua'){const half=Math.round(big/2);L.push({l:`Cho vay thóc qua vụ đói (${FM(half)})`,c:()=>G.money()>=half,f:cc=>ok(cc,18,'Họ qua được vụ đói, hẹn mùa sau trả thóc.',{money:-half,cfame:3})});
    L.push({l:`Biếu hẳn thóc cho người trong họ ấy (${FM(big)})`,c:()=>G.money()>=big,f:cc=>ok(cc,26,'Cả họ bên ấy gọi nhà mình là nhà cứu đói.',{money:-big,fame:6,cfame:5})})}
  if(k==='no'){L.push({l:'Đứng ra bảo lãnh khoản nợ',r:[{eq:0.6,tri:0.4},50],y:cc=>ok(cc,24,'Chủ nợ nể nhà mình mà giãn hạn.',{fame:3}),n:cc=>{i.rel0(14);return 'Nhà ấy vẫn không trả được, nhà mình phải đền thay.'+fx(cc,{money:-big,tam:-4})}});
    L.push({l:`Cho vay trả nợ (${FM(big)})`,c:()=>G.money()>=big,f:cc=>ok(cc,20,'Cơ nghiệp nhà ấy được giữ.',{money:-big})})}
  L.push({l:'Từ chối',ax:{rong:-1},f:()=>{i.rel0(-12);i.addOan(8);i.log('Bị nhà mình bỏ mặc lúc hoạn nạn');return 'Gia chủ nhà kia lặng lẽ ra về.'}});
  return L}}}

/* ===== tranh chấp làm ăn: người buôn bán gánh, được nhờ gia chủ ra mặt ===== */
for(const id of window.BN_DISPUTE){const e=find(id);if(!e||e.__g1543d)continue;e.__g1543d=1;const o0=e.o;
 e.o=function(c,d){const L=(typeof o0==='function'?o0.call(this,c,d):o0)||[];const h=G.P(S().head);
  if(!h||c.id===h.id||(d&&d.byHead)||h.away)return L;
  return L.concat([{l:'Nhờ gia chủ ra mặt',f:()=>{G.enqueue('ev',h.id,{ev:id,data:Object.assign({},d,{byHead:1,_force:1})},true);return `${esc(c.given)} trình việc lên gia chủ ${esc(h.given)}.`}}])}}
/* sự kiện xin giúp vô danh: không bốc nữa */
for(const id of window.BN_OFF){const e=find(id);if(e)e.c=()=>false}
});
