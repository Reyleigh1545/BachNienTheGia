/* Bách Niên Thế Gia · 7.0.0-d.1.5.28 · SỰ KIỆN HỌC NGHỀ CHỈ CHO NGƯỜI THEO NGHỀ ĐÓ VÀ TRẺ 12 ĐẾN 16 TUỔI CHƯA ĐI LÀM; THÔNG THẠO TÍNH ĐÚNG NGHỀ
   (chủ dự án 25/11: "người làm quan lại gặp kỳ ngộ của thợ rèn truyền nghề, cái này chỉ nên xuất hiện ở người theo nghề rèn và người từ 12 đến 16 tuổi chưa đi làm … trẻ con chưa đi làm nếu gặp được sự kiện hoặc kỳ ngộ tăng thông thạo của một loại nghề nghiệp nào đó thì phải lưu lại, sau này đi làm việc đó thì phải có vốn … người theo nghề quan nhưng gặp sự kiện nghề rèn tăng thông thạo lại vẫn tính vào nghề quan là sai").
   Hai phần: (1) GATE: các sự kiện học nghề chỉ ra cho người đang theo đúng nghề hoặc trẻ 12 đến 16 tuổi chưa đi làm; (2) PJ: gắn nghề (e.pj) cho sự kiện, để engine (fx, khóa 'm') cộng thông thạo vào đúng nghề: người đang theo nghề đó thì vào c.m, người khác thì cất vào c.pre[nghề] (setJob lấy ra làm vốn khi bắt đầu nghề đó). */
window.EVPATCH=window.EVPATCH||[];
window.EVPATCH.push(function(E,G){
const find=id=>E.find(e=>e.id===id);const {fx,esc,R}=G;
const ag=p=>G.age(p);
const learnOK=P=>c=>c.job===P||(c.job==='chu'&&c.bizFrom===P)||(ag(c)>=12&&ag(c)<=16&&c.job==='none'&&!c.away);
/* GATE: học nghề, chỉ người theo nghề đó hoặc trẻ 12 đến 16 tuổi chưa đi làm */
const GATE={t_g_hoc_nghe:'tho_ren',d631_tho_ren_dao:'tho_ren',d631_thay_thuoc_hoi_huu:'y',d631_hoc_nghe_gom:'tho'};
for(const id in GATE){const e=find(id);if(!e||e.__g1528)continue;e.__g1528=1;e.pj=GATE[id];const c0=e.c,ok=learnOK(GATE[id]);
  e.c=function(c,d){if(!ok(c))return false;return typeof c0==='function'?c0.call(this,c,d):true}}
/* yl_gap_thay (thầy thuốc ngỏ ý nhận học trò) là sự kiện học nghề: chủ dự án 26/11 thấy tá điền (nghề nong) vẫn gặp; d.1.5.28 tao bỏ sót nó khỏi GATE. Chỉ người từ 12 đến 16 tuổi chưa đi làm (người đã là thầy thuốc thì không cần bái sư). Các bước sau chỉ tiếp tục khi người ấy chưa đi nghề khác (còn rảnh hoặc đã là thầy thuốc). */
{const e=find('yl_gap_thay');if(e&&!e.__g1540){e.__g1540=1;e.pj='y';e.age=[12,16];
  e.c=function(c,d){return ag(c)>=12&&ag(c)<=16&&c.job==='none'&&!c.away&&(c.tri||0)>=55&&(G.subOf(c,'rong')>=50||G.subOf(c,'cc')>=60)}}
 for(const id of ['yl_hoc','yl_dich','yl_mo','yl_ket']){const x=find(id);if(x&&!x.job)x.job=['y','none']}}
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
/* THẺ NGƯỜI THƯƠNG Ở MỌI BƯỚC TÌNH DUYÊN (chủ dự án 25/11: "thanh mai trúc mã, rồi cái lương duyên gì đó mà người ấy bảo mình về thưa chuyện hoặc hứa hẹn thành công vẫn không có thẻ"): người sắp chọn phải có tên và thẻ bấm xem được; người ấy là chính người sẽ cưới (c.flags.lvP). */
{const lift={tinh_thanh_mai:()=>G.tierIdx()*3,tinh_tieu_thu:()=>30,tinh_tieu_thu_b:()=>30,tinh_tieu_thu_c:()=>30};
  const ensureLv=(c,lf)=>{let p=c.flags.lvP;if(p&&p.given&&G.S().t-p._t<=60){p._t=G.S().t;return p}
    p=G.mkMatch(c,{age:Math.max(16,ag(c)+(Math.random()<0.5?-2:1)),up:Math.max(-1,Math.min(3.5,(lf-G.tierIdx()*4)/8)),story:lf>=30?1:0});p._t=G.S().t;c.flags.lvP=p;return p};
  const sub={ /* câu mở của từng bước, thay bằng tên người ấy */
    tinh_thanh_mai:(t,p)=>t.replace('Người bạn chơi từ thuở nhỏ',esc(G.nameOf(p))+', người bạn chơi từ thuở nhỏ'),
    tinh_tieu_thu:(t,p)=>t.replace(/^(Tiểu thư|Công tử)/,'$1 '+esc(G.nameOf(p))),
    tinh_tieu_thu_b:(t,p)=>t.replace(/^Gia đình (nàng|chàng)/,'Gia đình '+esc(p.given)),
    tinh_tieu_thu_c:(t,p)=>t.replace(/bên kia/g,'nhà '+esc(p.given))};
  for(const id in lift){const e=find(id);if(!e||e.__g1528e)continue;e.__g1528e=1;const x0=e.x;
    e.x=function(c,d){d=d||{};const t=typeof x0==='function'?x0.call(this,c,d):x0;const p=ensureLv(c,lift[id]());G.candReg(p,'Người thương');d.who=p.id;return sub[id](String(t),p)}}
  /* chuỗi Thương Tâm Từ: tt_b, tt_c, tt_d (người ấy là Thương gia, đã có tên trong lời kể) */
  const TH=c=>c.g==='nam'?{surname:'Thương',given:'Tâm Từ',main:'mi',traits:['khuynhthanh','phongnha'],min:{mi:84,tri:74,eq:70},job:'noi'}:{surname:'Thương',given:'Cảnh Hành',main:'tri',traits:['thongminh','muusi'],min:{tri:84,vo:70,eq:70,mi:72},job:'hiep',lv:1};
  for(const id of ['tt_b','tt_c','tt_d']){const e=find(id);if(!e||e.__g1528e)continue;e.__g1528e=1;const x0=e.x;
    e.x=function(c,d){d=d||{};const t=typeof x0==='function'?x0.call(this,c,d):x0;let p=c.flags.thP;if(!(p&&p.given))p=c.flags.thP=G.mkMatch(c,Object.assign({age:Math.max(16,ag(c)+R(-3,2)),up:2,story:1},TH(c)));
      p.given=TH(c).given;p.surname='Thương';G.candReg(p,'Người thương');d.who=p.id;return t}}
}
/* HOÀNG ĐẾ THẬT TRONG SỰ KIỆN VUA VI HÀNH (chủ dự án 25/11: "kỳ ngộ ngàn năm: vị khách lạ là đương kim thiên tử vi hành nhưng thẻ hiện ra lại không phải là hoàng đế, chỉ số cũng không ra dáng hoàng đế"): bản chung R1 gắn một NPC ngẫu nhiên; nay thẻ là chính đương kim hoàng đế (tên ở S.dyn.emp, tuổi theo S.dyn.k.age, chỉ số cao, nhãn "Hoàng đế <niên hiệu>"). NPC có ref 'emp:<tên>' nên npcYear không đụng tới. */
{const cl=(v,a,b)=>Math.max(a,Math.min(b,v));
  const emperor=()=>{const S=G.S(),d=G.vua&&G.vua.d?G.vua.d():null;if(!d||!d.emp)return null;S.np=S.np||{n:0,l:{}};const ref='emp:'+d.emp;let n=Object.values(S.np.l).find(x=>x.ref===ref);
    const k=d.k||{};if(!n){n=G.np.new({n:d.emp,g:'nam',age:k.age||40,role:'hoangde'});n.ref=ref;n.vai=['hoang_de'];n.nghe='đương kim hoàng đế, niên hiệu '+d.era;n.tier=6;n.rel=0;n.st={tri:80,vo:80,mi:80,eq:80};n.sk={muu:90,khau:80,ql:80};n.sub={};n.fam={spouse:1,kids:0};n.past=[];n.ky=[];n.on=0;n.oan=0;n.vai=[]} /* d.1.5.43: không đưa vua vào sổ người quen (không vai, không deepen) */
    n.vaiTxt='Hoàng đế '+d.era;n.born=S.t-12*(k.age||40);n.ok=1;
    n.st={tri:Math.round(cl(78+(k.tai||50)*0.35,78,125)),vo:Math.round(cl(70+(k.hp||50)*0.25,70,110)),mi:Math.round(cl(76+(k.duc||50)*0.2,76,105)),eq:Math.round(cl(80+(k.duc||50)*0.3,80,120))};return n};
  G.emperorNpc=emperor;
  const e1=find('tuoc_ky_ngo');if(e1&&!e1.__g1528f){e1.__g1528f=1;
    e1.x=function(c,d){d=d||{};const n=emperor();if(n)d.npc=n.id;return `Một người khách lạ áo vải ghé nhà xin nước, ăn nói phi phàm. ${esc(c.given)} tiếp đãi chu đáo. Sáng hôm sau, quan quân kéo đến rợp đường: khách lạ chính là đương kim thiên tử${n?' '+esc(n.n)+' ('+esc(n.vaiTxt)+')':''} vi hành.`}}
  const e2=find('tt_vi_hanh_b');if(e2&&!e2.__g1528f){e2.__g1528f=1;const x0=e2.x;
    e2.x=function(c,d){d=d||{};const n=emperor();if(n)d.npc=n.id;return typeof x0==='function'?x0.call(this,c,d):x0}}
}
/* KHÁCH LẠ KHÔNG HIỆN THẺ (chủ dự án 26/11: "sự kiện người khách lạ vẫn đang hiện sai, tốt nhất là không hiện thẻ nữa"): tuoc_ky_ngo, tt_vi_hanh, tt_vi_hanh_b chỉ hiện thẻ người nhà (d.noCard). NPC vẫn giữ trong dữ liệu để kết quả đổi quan hệ như cũ. */
for(const id of ['tuoc_ky_ngo','tt_vi_hanh','tt_vi_hanh_b']){const e=find(id);if(!e||e.__g1539)continue;e.__g1539=1;const x0=e.x;
  e.x=function(c,d){d=d||{};d.noCard=1;
    if(id==='tt_vi_hanh'){const n=G.emperorNpc&&G.emperorNpc();if(n){d.npc=n.id;return `Một vị khách phong thái khác thường ghé nhà ${esc(c.given)} xin nước, hỏi chuyện làm ăn, chuyện quan lại trong vùng. Người hầu theo ông đi đứng như lính. Nhà không biết ông là ai.`}} /* bản gốc tạo NPC ngẫu nhiên, có khi là đàn bà ('Người hầu theo bà') trong khi đó là vua */
    return typeof x0==='function'?x0.call(this,c,d):x0}}
/* t_g_hoc_nghe: bản gốc cất vốn học việc ở c.pre.tho (thợ thủ công), phải là thợ rèn (tho_ren) */
{const e=find('t_g_hoc_nghe');if(e&&!e.__g1528b){e.__g1528b=1;const o0=e.o;
  e.o=function(c,d){const L=(typeof o0==='function'?o0.call(this,c,d):o0)||[];
    return L.map(op=>{const fix=fn=>typeof fn!=='function'?fn:function(cc){const b=(cc.pre&&cc.pre.tho)||0;const r=fn.apply(this,arguments);const a=(cc.pre&&cc.pre.tho)||0;if(a>b){cc.pre.tho=b;cc.pre.tho_ren=(cc.pre.tho_ren||0)+(a-b)}
        return typeof r==='string'?r.replace('có sẵn 25 thông thạo.','có sẵn 25 thông thạo nghề rèn.'):r};
      return Object.assign({},op,{f:fix(op.f),y:fix(op.y),n:fix(op.n)})})}}}
});
