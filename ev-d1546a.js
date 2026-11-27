/* Bách Niên Thế Gia · 7.0.0-d.1.5.46 · THÔNG THẠO ĐÚNG NGHỀ, ĐỢT HAI (bài 50; chủ dự án 25/11 "cái thông thạo của các nghề phải khác biệt … cũng phải kiểm tra và sửa lại", 27/11 "làm tiếp những cái chưa làm").
   Chỉ gắn cho sự kiện KHÔNG giới hạn nghề mà lời kể nói về một nghề cụ thể. e.pj là một nghề hoặc danh sách nghề hợp:
   người đang làm một nghề trong danh sách thì cộng vào nghề đang làm; người khác thì cất vào vốn nghề đầu danh sách (c.pre). */
window.EVPATCH=window.EVPATCH||[];
window.EVPATCH.push(function(E){
const BUON=['hangrong','tieunhi','chu'],THUOC=['y','nguy'],CHU=['su','thulai','quan'],VO=['tieu','hiep','quan_ngu'],REN=['tho','tho_ren'];
const PJ={
 /* bước sau của chuỗi cốt truyện: người có thể đã đổi nghề giữa chừng */
 c2_c:['hangrong','tieunhi'],c5_b:THUOC,c9_b:['quan_ngu'],c9_c:['quan_ngu'],c12_b:['nghe'],c13_b:REN,c13_c:REN,
 /* buôn bán */
 t_g_cho_vay:BUON,d631_ban_nho_cho_von:BUON,d631_thuong_nhan_gop_von:BUON,d631_nha_buon_nhan_giup:['hangrong','tieunhi'],c631_ban_cu_ghe:BUON,v6_xt_buon:BUON,kn_nguoi_giup_viec_cu:['hangrong','tieunhi'],
 /* võ nghệ */
 d631_kiem_khach_ghe_lang:VO,tt_thay_cu_den:VO,d631_dong_doi_cu:['quan_ngu'],
 /* nghề thuốc */
 h_du_toathuoc:THUOC,h_du_namduoc:THUOC,h_du_dongy:THUOC,h_du_vuon:THUOC,h_du_cuoi:THUOC,f633_cuoi:THUOC,
 /* chữ nghĩa */
 d631_sach_co_trong_ruong:['quan','thulai'],h_vu_tienco:CHU,h_vu_thuphong:CHU,h_vu_giaothu:CHU,h_vu_thicu:CHU,kn_92:CHU,
 /* nghề thủ công */
 v6_xt_tho:REN,v6_say_me:['tho'],t_g_che_dong:['tho'],h_ki_dongtau:['tho'],
 /* đồng áng, sông nước */
 t_c_doi_cong:['nong'],kn_21:['nong'],d631_gieng_nuoc_moi:['nong'],d631_che_co_thu:['nong'],f633_khachla:['nong'],d631_thuyen_truong_nhan_con:['ngu','laido']};
for(const e of E){const p=PJ[e.id];if(p&&!e.pj)e.pj=p}
window.BN_PJ2=Object.keys(PJ);
});
/* LÀNG, TRẤN, THÀNH KHÁC NHAU (chủ dự án 27/11: "nên nhớ tuân theo quy tắc cũ về vị trí, nơi ở, địa vực, sống ở nông thôn hay thị trấn hay thành thị phải khác nhau về sự kiện, khác cả về lựa chọn").
   S.loc.t: 0 làng, 1 trấn, 2 thành. Áp cho phần viết ở d.1.5.43 đến .46: người quen sa sút, họ khác gặp nạn, tình địch. G.noiO() dùng chung cho sự kiện viết sau. */
window.EVPATCH.push(function(E,G){
const find=id=>E.find(e=>e.id===id);const {fx,esc,pick}=G;const m=v=>G.mm(v);const FM=v=>G.fmtMoney(v);
const NOI=['lang','tran','thanh'];G.noiO=()=>{const L=G.S().loc;return NOI[(L&&L.t)||0]||'lang'};
const KHO={
 lang:{no:'nợ thóc địa chủ trong làng, bị siết cả nhà cửa',mat_nghe:'mất ruộng cấy rẽ, cả nhà không còn việc',thien_tai:'nước lũ cuốn mất nhà và bồ thóc',bi_ep:'bị cường hào trong làng ức hiếp, đòi lấn đất'},
 tran:{no:'bị chủ hiệu ở trấn siết nợ hàng',mat_nghe:'cửa hiệu thuê mình đóng cửa, mất việc',thien_tai:'lửa cháy lan cả dãy phố chợ, mất sạch',bi_ep:'bị đầu nậu chợ trấn ép nộp lệ, đòi chiếm chỗ bán'},
 thanh:{no:'vay nặng lãi trong thành, chủ nợ cho người đến đòi gắt',mat_nghe:'phường nghề trong thành thải người, không nơi nào nhận',thien_tai:'hỏa hoạn thiêu cả phường',bi_ep:'bị nha dịch trong thành sách nhiễu, đòi lễ không dứt'}};
{const e=find('np_sa_co');if(e&&!e.__g1546n){e.__g1546n=1;const x0=e.x,o0=e.o;
  e.x=function(c,d){let t=x0.call(this,c,d);const alt=(KHO[G.noiO()]||{})[d.kho];if(alt)t=t.replace(/(chỗ thân tình lâu nay, đến nhà [^:]+: )[^.]+(\.)/,(s,a,b)=>a+alt+b);return t};
  e.o=function(c,d){const L=(o0.call(this,c,d)||[]).slice();const n=d&&d.npc?G.tie.get(d.npc):null;if(!n)return L;const k=d.kho||n.kho;const noi=G.noiO();
    const saved=(cc,rel,on,txt,eff)=>{G.tie.rel(n,rel,'được giúp lúc khó');G.tie.on(n,on);n.sa=null;n.tier=Math.min(6,(n.tier||0)+1);G.later(cc,'np_tra_on',G.R(24,72),{npc:n.id,kho:k});return txt+fx(cc,Object.assign({qh:[n.n,rel]},eff||{}))};
    const hong=(cc,txt)=>{G.tie.rel(n,5,'đã cố giúp');return txt+fx(cc,{tam:-3,qh:[n.n,5]})};
    let them=null;
    if(noi==='lang'&&(k==='thien_tai'||k==='mat_nghe'||k==='no'))them={l:'Rủ bà con trong xóm mỗi nhà góp một tay',r:[{eq:0.7,khau:0.4},45],y:cc=>saved(cc,16,6,'Nhà góp gỗ, nhà góp thóc, nhà góp công, người ấy gượng dậy được.',{cfame:3,tam:2}),n:cc=>hong(cc,'Mùa này nhà nào cũng túng, chẳng góp được bao nhiêu.')};
    else if(noi==='tran'&&(k==='no'||k==='mat_nghe'||k==='bi_ep'))them={l:'Đưa người ấy đến phường hội ở trấn, xin đứng ra phân xử',r:[{khau:0.7,eq:0.4},48],y:cc=>saved(cc,18,6,'Phường hội nể lời, cho khất nợ và giữ chỗ làm ăn.',{fame:2}),n:cc=>hong(cc,'Phường hội bảo chuyện riêng, không can dự.')};
    else if(noi==='thanh'&&G.money()>=m(4)&&(k==='kien'||k==='bi_ep'||k==='no'||k==='con_hoc'))them={l:`Mang lễ đến cửa quen trong thành lo giúp (${FM(m(4))})`,c:()=>G.money()>=m(4),r:[{eq:0.7,muu:0.4},50],y:cc=>saved(cc,20,8,'Cửa quen nhận lời, mọi việc êm xuôi.',{money:-m(4),fame:2}),n:cc=>{G.tie.rel(n,4,'đã cố lo giúp');return 'Lễ đã đưa mà cửa quen lảng đi.'+fx(cc,{money:-m(4),tam:-4,qh:[n.n,4]})}};
    if(them)L.splice(Math.max(0,L.length-1),0,them);return L}}}
/* họ khác gặp nạn: nạn theo nơi ở (mất mùa là chuyện làng, kho hàng cháy là chuyện trấn và thành) */
{const e=find('rg_nho_giup');if(e&&!e.__g1546n){e.__g1546n=1;const x0=e.x;const P={lang:['mua','no','oan'],tran:['chay','no','oan'],thanh:['chay','oan','no']};
  e.x=function(c,d){if(d&&!d.nan)d.nan=pick(P[G.noiO()]);return x0.call(this,c,d)}}}
});
/* THẺ NGƯỜI Ở HAI SỰ KIỆN TÌNH DUYÊN CÒN BỎ SÓT (ghi "chưa làm" ở d.1.5.32; chủ dự án 25/11 "… vẫn không có thẻ"; luật 0.16). "Lá thư không ký tên" cố ý giấu người gửi nên giữ nguyên. */
window.EVPATCH.push(function(E,G){
const find=id=>E.find(e=>e.id===id);const {fx,esc,R,pick}=G;const ag=p=>G.age(p);
const love=(c,age,lift)=>{let p=c.flags.lvP;if(p&&p.given&&G.S().t-p._t<=60){p._t=G.S().t;return p}
  p=G.mkMatch(c,{age,up:Math.max(-1,Math.min(3.5,(lift-G.tierIdx()*4)/8))});p._t=G.S().t;c.flags.lvP=p;return p};
{const e=find('tinh_dich');if(e&&!e.__g1546){e.__g1546=1;
  e.x=function(c,d){d=d||{};const p=love(c,Math.max(16,ag(c)+R(-2,1)),G.tierIdx()*4+4);G.candReg(p,'Người thương');d.who=p.id;
    if(!d.nha)d.nha=pick({lang:['lý trưởng','phú hộ trong làng','trưởng một họ lớn'],tran:['chủ hiệu buôn lớn ở trấn','phú hộ ở trấn','thư lại huyện nha'],thanh:['quan viên trong thành','phú thương trong thành','chủ phường nghề giàu có']}[G.noiO?G.noiO():'lang']);
    const nam=c.g==='nam';const n=G.tie.ensure(c,{key:'tinh_dich_cua_'+c.id,g:c.g,vai:['doi_thu'],nghe:`${nam?'con trai':'con gái'} nhà ${d.nha}, cùng để ý một người`,age:Math.max(17,ag(c)+R(-2,3)),tier:3,rel:-10,why:'tranh người trong lòng'});d.npc=n.id;
    return `${esc(n.n)}, ${nam?'con trai':'con gái'} nhà ${d.nha}, cũng để ý ${esc(G.nameOf(p))}, người trong lòng ${esc(c.given)}, ${nam?'ngang nhiên mang lễ đến dạm ngõ trước':'nhờ mối đến thăm hỏi trước'}.`}}}
{const e=find('tinh_goa_bua');if(e&&!e.__g1546){e.__g1546=1;const o0=e.o;
  const cand=(c,d)=>{if(!d.gp){delete c.flags.lvP;love(c,Math.max(20,ag(c)+R(-5,3)),G.tierIdx()*3);d.gp=1}return c.flags.lvP||love(c,Math.max(20,ag(c)),G.tierIdx()*3)};
  e.x=function(c,d){d=d||{};const p=cand(c,d);G.candReg(p,'Người được mai mối');d.who=p.id;
    return `Đã mấy năm góa bụa. Có người mai mối ${esc(G.nameOf(p))}, một người ${c.g==='nam'?'đàn bà':'đàn ông'} hiền lành cũng chịu cảnh lẻ bóng.`};
  e.o=function(c,d){const base=(typeof o0==='function'?o0.call(this,c,d):o0)||[];
    return base.map((o,i)=>i===0?Object.assign({},o,{f:cc=>{const p=cc.flags.lvP;G.mkSpouse(cc,true,p||undefined);delete cc.flags.lvP;return 'Nhà lại có tiếng cười.'+fx(cc,{tam:10})}}):Object.assign({},o,{f:cc=>{delete cc.flags.lvP;return o.f(cc)}}))}}}
});
