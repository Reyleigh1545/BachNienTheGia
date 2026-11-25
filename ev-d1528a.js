/* Bách Niên Thế Gia · 7.0.0-d.1.5.28 · SỰ KIỆN HỌC NGHỀ CHỈ CHO NGƯỜI THEO NGHỀ ĐÓ VÀ TRẺ 12 ĐẾN 16 TUỔI CHƯA ĐI LÀM; THÔNG THẠO TÍNH ĐÚNG NGHỀ
   (chủ dự án 25/11: "người làm quan lại gặp kỳ ngộ của thợ rèn truyền nghề, cái này chỉ nên xuất hiện ở người theo nghề rèn và người từ 12 đến 16 tuổi chưa đi làm … trẻ con chưa đi làm nếu gặp được sự kiện hoặc kỳ ngộ tăng thông thạo của một loại nghề nghiệp nào đó thì phải lưu lại, sau này đi làm việc đó thì phải có vốn … người theo nghề quan nhưng gặp sự kiện nghề rèn tăng thông thạo lại vẫn tính vào nghề quan là sai").
   Hai phần: (1) GATE: các sự kiện học nghề chỉ ra cho người đang theo đúng nghề hoặc trẻ 12 đến 16 tuổi chưa đi làm; (2) PJ: gắn nghề (e.pj) cho sự kiện, để engine (fx, khóa 'm') cộng thông thạo vào đúng nghề: người đang theo nghề đó thì vào c.m, người khác thì cất vào c.pre[nghề] (setJob lấy ra làm vốn khi bắt đầu nghề đó). */
window.EVPATCH=window.EVPATCH||[];
window.EVPATCH.push(function(E,G){
const find=id=>E.find(e=>e.id===id);const {fx,esc}=G;
const ag=p=>G.age(p);
const learnOK=P=>c=>c.job===P||(c.job==='chu'&&c.bizFrom===P)||(ag(c)>=12&&ag(c)<=16&&c.job==='none'&&!c.away);
/* GATE: học nghề, chỉ người theo nghề đó hoặc trẻ 12 đến 16 tuổi chưa đi làm */
const GATE={t_g_hoc_nghe:'tho_ren',d631_tho_ren_dao:'tho_ren',d631_thay_thuoc_hoi_huu:'y',d631_hoc_nghe_gom:'tho'};
for(const id in GATE){const e=find(id);if(!e||e.__g1528)continue;e.__g1528=1;e.pj=GATE[id];const c0=e.c,ok=learnOK(GATE[id]);
  e.c=function(c,d){if(!ok(c))return false;return typeof c0==='function'?c0.call(this,c,d):true}}
/* PJ: chỉ gắn nghề để thông thạo cộng đúng chỗ */
const PJ={v62_gai_hoc_det:'det',c631_thay_lang_dao:'y',ky_gt_cay_dang:'y',c5_c:'y',yl_hoc:'y',yl_dich:'y',yl_mo:'y',yl_ket:'y'};
for(const id in PJ){const e=find(id);if(e&&!e.pj)e.pj=PJ[id]}
/* GIẤU TÀI (chủ dự án 25/11): chỉ người trẻ từ 4 đến 18 tuổi và phải thật sự có tài: đặc điểm đặc biệt cao (tăng tư chất, thiên tài, điểm thi) hoặc tiềm lực trí hoặc võ từ 90 (G.talent).
   cv_gia_heo "Giấu tài" (trước 16 đến 45 tuổi, chỉ cần trí hoặc võ 70); kn_12 "Thần đồng của họ" (trước chỉ cần trí 55) và kn_74 "Đứa trẻ có tài lạ" (trước không kiểm tài). */
{const e=find('cv_gia_heo');if(e&&!e.__g1528c){e.__g1528c=1;e.age=[4,18];const c0=e.c,o0=e.o;
  e.c=function(c,d){if(!G.talent(c))return false;return G.inClan(c)};
  e.o=function(c,d){const L=(typeof o0==='function'?o0.call(this,c,d):o0)||[];return ag(c)<12?L.filter(op=>!/Rời đi nơi khác/.test(op.l||'')):L}}}
for(const id of ['kn_12','kn_74']){const e=find(id);if(!e||e.__g1528c)continue;e.__g1528c=1;const c0=e.c;
  e.c=function(c,d){if(!G.talent(c))return false;return typeof c0==='function'?c0.call(this,c,d):true}}
/* ĐÚT LÓT MUA CHỨC (chủ dự án 25/11): giá theo phẩm của chức nhận, Cửu phẩm 500 bạc, mỗi phẩm gấp đôi; chỉ tự mua tới Lục phẩm, cao hơn cần người từ Tam phẩm trở lên chống lưng (G.bribe, engine.js). */
{const e=find('qt1_chuc_beo');if(e&&!e.__g1528d){e.__g1528d=1;const c0=e.c;const JB=()=>(window.D&&window.D.JOBS&&window.D.JOBS.quan)||null;
  const pn=r=>{const J=JB();return J&&J.lv[r]?J.lv[r].n:'phẩm cao hơn'};
  e.c=function(c,d){if(!G.bribe.ok(c,(c.lv||0)+1))return false;return typeof c0==='function'?c0.call(this,c,d):true};
  e.x=function(c,d){const tl=(c.lv||0)+1;const bk=tl>G.bribe.MAX_FREE?G.bribe.backer(c):null;
    return `Có người mách ${esc(c.given)}: một chức ${pn(tl)} béo bở sắp trống. Chỉ cần lo lót đúng chỗ là được, giá ${G.fmtMoney(G.bribe.price(tl))}.${bk?` Cần có người chống lưng: ${esc(bk.n)} chịu đứng ra bảo lãnh.`:''}`};
  e.o=function(c,d){const tl=(c.lv||0)+1;const fee=G.bribe.price(tl);const bk=tl>G.bribe.MAX_FREE?G.bribe.backer(c):null;const win=bk?0.82:0.7;
    return [{l:`Đút lót để được chức ${pn(tl)}${bk?`, nhờ ${bk.n} chống lưng`:''} (${G.fmtMoney(fee)})`,vio:'trugian',c:()=>G.money()>=fee,ax:{thanh:-2,tv:1},
        f:cc=>{G.S().money-=fee;if(G.chance(win))return 'Chức về tay. Nhưng sổ sách của kẻ nhận bạc có tên mình.'+fx(cc,{lv:1,cor:12});return 'Tiền mất, chức vào tay người trả cao hơn.'+fx(cc,{cor:6,tam:-8})}},
      {l:'Không màng',ax:{thanh:1,tiet:1},f:cc=>'Giữ được tiếng sạch.'+fx(cc,{liem:3})}]}}}
/* t_g_hoc_nghe: bản gốc cất vốn học việc ở c.pre.tho (thợ thủ công), phải là thợ rèn (tho_ren) */
{const e=find('t_g_hoc_nghe');if(e&&!e.__g1528b){e.__g1528b=1;const o0=e.o;
  e.o=function(c,d){const L=(typeof o0==='function'?o0.call(this,c,d):o0)||[];
    return L.map(op=>{const fix=fn=>typeof fn!=='function'?fn:function(cc){const b=(cc.pre&&cc.pre.tho)||0;const r=fn.apply(this,arguments);const a=(cc.pre&&cc.pre.tho)||0;if(a>b){cc.pre.tho=b;cc.pre.tho_ren=(cc.pre.tho_ren||0)+(a-b)}
        return typeof r==='string'?r.replace('có sẵn 25 thông thạo.','có sẵn 25 thông thạo nghề rèn.'):r};
      return Object.assign({},op,{f:fix(op.f),y:fix(op.y),n:fix(op.n)})})}}}
});
