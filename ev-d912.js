/* Bách Niên Thế Gia v6.7.10-d9.12 · BẢNG ĐIỀU CHỈNH SỰ KIỆN THEO ĐÁNH GIÁ CỦA CHỦ DỰ ÁN (24/11/2026, 161 góp ý trong Test result/bao-cao-su-kien-nam84.md).
   Một chỗ duy nhất để: (1) BỎ sự kiện (RETIRED), (2) HẠ kỳ ngộ xuống sự kiện thường (DOWN), (3) siết ĐIỀU KIỆN xuất hiện (GATE, đúng nghề, tuổi, bậc, nhà nghèo giàu, người học võ…).
   Cơ chế: engine gọi các hàm trong window.EVPATCH ngay sau khi nạp mọi gói sự kiện, trước khi dựng EVMAP, nên hàm có thể sửa hoặc xóa sự kiện. Tắt một dòng ở đây là khôi phục (mã gốc không bị xóa, trừ khi ghi khác).
   Luật xét lọc R1 đến R22: Test result/ke-hoach-d9.12.md mục 5; bài học: CLAUDE.md mục 13. */
window.EVRETIRED=[
 /* [0,1,8,22,24,57,66,69,71,82,88,89,90,94,96,98] chủ dự án: "bỏ" */
 'v6_noi_xau','v6_ru_ruou_tre','xin_chu_dau_nam','nuoi_chim','rg_canh_tranh','dh_56','lw_56','noi_cho','qn653_giam_quan','buon_hang_hiem',
 'cv_chinh_ma','cv_chon_to','cv_cong_luan','cv_khai_khieu','dh_23','dh_72',
 /* gộp: lo_03 vào lo_02 (cùng việc chặn đường đòi tiền); tranh_gia_tai vào gc_tranh_gia_tai */
 'lo_03','tranh_gia_tai',
 /* chuỗi ân oán sư môn cũ c4_*: mở đầu và kết cục không có thật (chủ dự án 24/11); thay bằng chuỗi sm_* ở ev-d912b.js */
 'c4_su_mon','c4_b','c4_c',
 /* đề xuất bỏ, chờ chủ dự án (Q2, Q5): ghi ở CLAUDE.md mục 11 */
 'v63_k_ban_khoan','cv_di_san',
 /* thay bằng người thật: cv_tra_an -> tie_an_nhan_tra (người nhớ ơn thật, sổ ơn) */
 'cv_tra_an'
];
window.EVDOWN=[ /* kỳ ngộ hạ xuống sự kiện thường (chủ dự án: "hạ thành sự kiện") */
 'cv_gia_heo','cv_hoi_han','f633_gieng','kn_nguoi_la_dua_thu','t_n_trau_de'
];
/* GATE: id → khóa ghi đè (age, job, g, tier, lvr, head, w, pcd) và/hoặc c: (c,G)=>bool nối thêm (AND) vào điều kiện sẵn có.
   fameCN: danh vọng CÁ NHÂN (eligible gốc cộng 0,2 danh vọng gia tộc nên người chưa có tiếng vẫn gặp việc dành cho người có tiếng). */
(function(){
const P={
 poor:(G)=>G.tierIdx()<=1,
 hasBK:(c)=>!!(c.flags&&c.flags.bk&&Object.keys(c.flags.bk).length),
 hiepJH:(c)=>c.job==='hiep'&&((c.flags&&c.flags.gh>=1)||(c.away&&c.away.type==='jh')),
 cao:(c)=>c.job==='hiep'||(c.flags&&c.flags.ghs&&c.flags.ghs!=='none')||((c.fame||0)>=100&&c.vo>=80)||!!(c.flags&&c.flags.bk&&Object.keys(c.flags.bk).length),
 hoc:(c)=>(c.degree||0)>=1||!!c.exam,
 tiengCN:(c)=>(c.fame||0)>=100||(c.tuoc||0)>0||(c.degree||0)>=1||(c.job==='quan'&&c.lv>=2),
 thienbam:(c)=>!!(c.tg&&(c.tg.thientai||c.tg.thongminh||c.tg.trinho))||(c.traits||[]).some(t=>['thientai','thongminh','trinho','vankhuc'].includes(t))
};
const GATE={
 v63_k_biet_noi_som:{age:[0,1]},
 v63_k_tap_di:{age:[1,2]},
 v6_so_sach:{job:['hau','thulai']},                       /* chỉ người làm công có chủ; chủ cơ sở và người tự làm không "báo chủ" */
 gj_45:{c:(c)=>P.hasBK(c)||P.hiepJH(c)},                  /* chân khí đảo lộn: chỉ người học bí kíp thật */
 gj_44:{c:(c)=>P.hiepJH(c)},                              /* tuyệt học thất truyền: chỉ người đang hành tẩu giang hồ */
 gj_09:{c:(c)=>P.cao(c)},                                 /* hẹn đấu dưới trăng: chỉ người giang hồ hoặc có danh cao thủ */
 noi_det_vai:{job:['det']},                               /* chỉ người nghề dệt */
 v6_lo_chi_tieu:{c:(c,G)=>G.S().money<G.mm(30)},          /* chỉ khi quỹ nhà thấp */
 c631_hoa_giai_vung:{fame:0,c:(c)=>P.tiengCN(c)},         /* người có tiếng (cá nhân) */
 c631_bao_boc_mai:{c:(c,G)=>G.homeLv()<=1&&c.job!=='hau'},/* nhà tranh nghèo, chủ nhà thật */
 c631_day_chu_ban_dem:{c:(c)=>P.hoc(c)},                  /* người từng đỗ đạt */
 gc_tranh_gia_tai:{c:(c,G)=>G.S().on<45&&!(G.S().rules||[]).length},
 hv_dai_le:{c:(c,G)=>c.job==='quan'&&c.lv>=5&&G.inKinh(c)},/* đại lễ từ Tứ phẩm, đang ở kinh */
 qn653_chon_dat:{lvr:[3,7]},                              /* từ Bách hộ trở lên */
 qn653_duyet_doi:{lvr:[1,7]},                             /* từ Ngũ trưởng trở lên */
 qn653_hang_tuong:{lvr:[6,7]},                            /* chỉ khi làm tướng (Q7 mặc định: từ Tướng quân) */
 v64_vo_tap_tran:{lvr:[0,4]},                             /* dưới Phó tướng */
 v64_vo_thoi_binh:{lvr:[3,4]},                            /* đồn chỉ có từ Bách hộ */
 v64_vo_tuan_bien:{lvr:[0,4],w:0.9},                      /* từ Phó tướng trở lên rất ít tự mình tuần biên */
 lw_06:{c:(c,G)=>!!G.S().maiLoT&&G.S().t-G.S().maiLoT<=60}, /* chỉ khi nhà thật sự từng nộp tiền mãi lộ cho toán chặn đường */
 t_g_hoc_bong:{tier:[0,1],c:(c,G)=>G.tierIdx()<=1},       /* chỉ nhà nghèo */
 thanh_lau_lo:{g:'nam'},
 v6_ky_tre_thien_bam:{c:(c)=>P.thienbam(c)}               /* chỉ trẻ thật sự thiên bẩm */
};
window.EVGATE=GATE;
window.EVPATCH=window.EVPATCH||[];
window.EVPATCH.push(function(E,G){
 const ret=new Set(window.EVRETIRED||[]);const down=new Set(window.EVDOWN||[]);
 const out=[];
 E.forEach(e=>{
  if(ret.has(e.id))return;
  if(down.has(e.id)){delete e.ky;delete e.good;delete e.u;delete e.cyc;e.k=(e.k==='Kỳ ngộ'||!e.k)?'Việc thường':e.k;e.lv=e.lv==null?2:e.lv}
  const g=GATE[e.id];
  if(g){
   ['age','job','g','tier','lvr','head','w','pcd','fame'].forEach(k=>{if(g[k]!==undefined)e[k]=g[k]});
   if(g.c){const oc=e.c;e.c=function(c,d){return (!oc||oc.call(this,c,d))&&g.c(c,G)}}
  }
  out.push(e)});
 return out});
})();
/* ===== TUNE: nhân khoản NHẬN theo số HIỂN THỊ chủ dự án yêu cầu (engine.fx đọc e.tune) và ADD: thêm dòng thưởng vào một lựa chọn ===== */
(function(){
const TUNE={
 t_c_thi_vo_lang:{vo:{mul:2.7}},                 /* chủ dự án: chỉ số cộng thêm ít */
 kn_32:{vo:{mul:2.5}},                           /* thành phải tăng cực nhiều võ lực */
 kn_43:{tri:{mul:3},m:{mul:3},fame:{mul:3},cfame:{mul:3}}, /* gấp 3 lần kết quả */
 kn_61:{tri:{mul:2}},                            /* thành thì trí +6 */
 qn653_ky_bao_kiem:{vo:{mul:3},fame:{mul:3},merit:{mul:3}},
 qn653_ky_binh_thu:{tri:{mul:2},eq:{mul:2},merit:{mul:3}},
 nb_b:{vo:{mul:1.4}},                            /* võ nên tăng 14 */
 nong_duoc_lieu:{tri:{mul:3}},
 t_g_hoc_bong:{tri:{mul:1.6}},
 vv_tri_co_tran:{tri:{mul:4}},                   /* kết quả phải xứng kỳ ngộ hiếm */
 y_benh_la:{tri:{mul:6}},                        /* trí tuệ nên tăng nhiều hơn */
 v6_ky_thu_tich:{tri:{mul:2.5}}
};
/* ADD: id -> [{opt,on:['y','n','f'],fx:{...}}]. Số trong fx là GỐC; kỳ ngộ nhân thêm 1,5 cho trí/võ/mị/EQ, 3 cho tiền/danh vọng. */
const ADD={
 qn653_ky_binh_thu:[{opt:0,on:['y'],fx:{vo:10}},{opt:0,on:['n'],fx:{vo:3}}],  /* thành: võ +15 hiển thị */
 t_q_binh_thu:[{opt:0,on:['y','yy'],fx:{vo:7}}],                                /* thiếu võ lực */
 nb_c:[{opt:0,on:['y','n'],fx:{tri:4,eq:3}},{opt:1,on:['f'],fx:{eq:2}}],        /* cả hai lựa chọn nên cộng chỉ số */
 nong_duoc_lieu:[{opt:0,on:['y'],fx:{bonus:0.08}}],                             /* dược liệu thành thu nhập thật */
 nong_khoai_tay:[{opt:0,on:['f'],fx:{bonus:0.04,cfame:2}}],
 d631_sach_co_trong_ruong:[{opt:0,on:['y'],fx:{tri:4}}],                         /* nên cộng trí tuệ */
 v6_ky_dao_si:[{opt:0,on:['y'],fx:{hpMax:2}}],                                   /* tu đạo phải tăng sức khỏe tối đa */
 gj_16:[{opt:0,on:['y'],fx:{hpMax:3}}],                                          /* thầy thuốc giang hồ: sức khỏe tối đa */
 tai_bien_ai:[{opt:0,on:['y'],fx:G=>({merit:45,money:G.mm(70),cfame:3,tri:1})}], /* thành giữ được thì phải có thánh ân: chiến công, ban thưởng */
 gia_huan:[{opt:0,on:['y'],fx:{on:4}},{opt:1,on:['f'],fx:{on:1}}],               /* viết gia huấn: thêm ổn định */
 v6_tre_chia_qua:[{opt:0,on:['f'],fx:(G,c)=>{c.flags.deLua=(c.flags.deLua||0)+1;return {eq:2}}}], /* khen con: EQ tăng, nhưng dễ bị lừa (cờ deLua) */
 v63_k_thay_do_quy:[{opt:2,on:['f'],fx:{m:1}}]
};
const closeKin=(c,G)=>G.alive().filter(p=>p.id!==c.id&&G.inClan(p)&&p.dead==null&&(p.spouse===c.id||(p.parents||[]).includes(c.id)||(c.parents||[]).includes(p.id)||((p.parents||[]).length&&(c.parents||[]).some(x=>p.parents.includes(x)))));
const SPECIAL={
 t_c_thao_duoc:(E,G)=>{const e=E.find(x=>x.id==='t_c_thao_duoc');if(!e||typeof e.o==='function')return;const o1=e.o[1];if(!o1||typeof o1.f!=='function')return;const f0=o1.f;
  o1.f=function(c,d){const t=f0.call(this,c,d);const L=closeKin(c,G);const txt=L.map(p=>G.esc(p.given)+': '+G.fx(p,{hpMax:5})).join(' ');return t+(L.length?` Người thân thiết cũng được bồi bổ (${L.length} người): ${txt}`:'')+G.fx(c,{hpMax:3})}},
 v6_ky_thu_tich:(E,G)=>{const e=E.find(x=>x.id==='v6_ky_thu_tich');if(!e||typeof e.o==='function')return;const o1=e.o[1];if(!o1||typeof o1.f!=='function')return;const f0=o1.f;
  o1.f=function(c,d){const t=f0.call(this,c,d);let n=0;G.alive().filter(p=>G.inClan(p)&&G.inMain(p)&&G.age(p)>=12&&!p.away).forEach(p=>{G.addStat(p,'tri',2);G.addStat(p,'eq',1);n++});return t+` Cả nhà cùng đọc (${n} người): trí +2, EQ +1 mỗi người.`}},
 qn653_duyet_doi:(E,G)=>{const e=E.find(x=>x.id==='qn653_duyet_doi');if(!e||typeof e.o==='function')return;const o0=e.o[0];const y0=o0&&o0.y;if(typeof y0!=='function')return;
  o0.y=function(c,d){const t=y0.call(this,c,d);return t+G.fx(c,{merit:Math.round(12*0.35*Math.max(1,c.lv))})}},
 v64_vo_tap_tran:(E,G)=>{const e=E.find(x=>x.id==='v64_vo_tap_tran');if(!e||typeof e.o!=='function')return;const o0=e.o;
  e.o=function(c,d){const L=o0.call(this,c,d);if(Array.isArray(L)&&L[0]&&typeof L[0].y==='function'){const y0=L[0].y;L[0].y=function(cc,dd){return y0.call(this,cc,dd)+G.fx(cc,{merit:Math.round(2*Math.max(1,cc.lv))})}}return L}}
};
window.EVPATCH.push(function(E,G){
 E.forEach(e=>{if(TUNE[e.id])e.tune=Object.assign({},e.tune||{},TUNE[e.id]);
  const A=ADD[e.id];if(A&&Array.isArray(e.o)){A.forEach(a=>{const op=e.o[a.opt];if(!op)return;a.on.forEach(k=>{const f0=op[k];if(typeof f0!=='function')return;op[k]=function(c,d){const t=f0.call(this,c,d);return (typeof t==='string'?t:'')+G.fx(c,typeof a.fx==='function'?a.fx(G,c,d):a.fx)}})})}});
 Object.keys(SPECIAL).forEach(k=>{try{SPECIAL[k](E,G)}catch(er){console.error('SPECIAL',k,er)}});
 return E});
})();
