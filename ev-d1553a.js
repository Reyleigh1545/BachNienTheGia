/* Bách Niên Thế Gia · 7.0.0-d.1.5.53 · TRẢ NỢ: SỰ KIỆN QUAN THEO CẤP VÀ GHẾ; CÂU CHỮ TIỂU QUỐC; VƯƠNG NỮ.
   N11 (chủ dự án 27/11, luật bắt buộc: "không phải cứ làm quan là sẽ gặp … tùy cấp bậc, địa vị và khu vực … ghế khác thì sự kiện khác"). Phân loại tay từng sự kiện cũ bốc cho người làm quan.
   a, b: phẩm thấp nhất và cao nhất của ghế đang ngồi (0 đến 9); t: loại ghế theo trường tag (dan coi dân, an hình án, thue thuế khóa, hoc học quan, kinh nha môn trung ương, giam ngự sử); k: ghế phải ở kinh đô. */
(function(){
const DAN=['dan','an'],THUE=['dan','thue'],CAI=['dan','an','thue'];
const g=(a,b,t,k)=>({a:a==null?0:a,b:b==null?9:b,t,k});
const CONG={
 q_cuu_pham:g(0,3),q_thu_thue:g(1,5,THUE),q_xu_an:g(1,5,DAN),q_thien_tai:g(2,7,['dan']),q_phe_phai:g(4),q_su_than:g(4,9,null,1),q_ban_tuoc:g(4),c3_muoi:g(1,5,CAI),
 qh_hoc_sinh_gian:g(0,9,['hoc']),qh_mo_truong:g(0,9,['hoc']),qh_tro_gioi:g(0,9,['hoc']),
 qa_an_oan:g(2,6,DAN),qa_cuop_lon:g(2,5,DAN),qa_tu_nguc:g(0,6,DAN),qd_doi_kem:g(2,7,['dan']),qd_de_vo:g(2,7,['dan']),qd_hao_cuong:g(2,5,DAN),
 qt_thue_cong:g(1,5,THUE),qt_buon_lau:g(0,5,CAI),qg_dan_hac:g(4),qg_tuan_tra:g(2,9,['giam']),qk_soan_su:g(1,9,['kinh','hoc'],1),
 q_thuoc_ha_nhung:g(2),q_chen_ep:g(0,6),n633_quan_an:g(1,5,DAN),n633_quan_le:g(2),n633_quan_de:g(2,5,['dan']),n633_quan_xa:g(0,5,CAI),
 v64_thu_lai_boi_gia:g(1,6,THUE),v64_bo_lai_loi_lot:g(0,6),v64_tien_nhiem_no:g(1,6,THUE),v64_thuong_quan_xa_hoa:g(0,5,CAI),v64_de_vo:g(1,7,['dan']),v64_cong_van_gap:g(1,6),v64_khoa_an:g(4,9,['hoc','kinh']),v64_dan_kien_quan_tren:g(2,6,DAN),
 qt1_mon_sinh:g(1),qt1_buoc_ngoat:g(2),qt2_thiep_moi:g(3),qt2_hai_phe:g(3),qt2_danh_sach:g(3),qt2_lo_quan_he:g(3),qt2_lam_chung:g(3),qt2_tu_khai:g(3),qt2_day_len:g(5),qt2_tiec_chia_phe:g(4),qt2_mon_sinh_cau:g(2),
 qt3_bac_lot_tay:g(1,7,DAN),qt3_sua_an:g(1,5,DAN),qt3_thuong_nhan:g(2,7,CAI),qt3_kho_luong:g(1,6,THUE),qt3_so_thue:g(1,5,THUE),qt3_nhan_thay:g(1,6),qt3_mat_thu:g(3),
 qt_tro_lai:g(4,9,null,1),qt_mat_chi_gia:g(4),qt_cuu_than:g(3),qt_hon_su:g(3),qt_di_so:g(3),qt4_than_vuong_nghi:g(4),qt4_ngu_su_to:g(3),
 cd_12:g(3),lw_63:g(3),lw_64:g(1),lw_69:g(1),hv_yen_cung:g(5),hv_dai_le:g(4),
 dh_04:g(1,7,THUE),dh_29:g(0,4),dh_30:g(2,7,CAI),dh_32:g(2),dh_38:g(4),dh_40:g(2),v62_q_ha_quan_cau:g(4),
 vuong_gap_mat:g(4),vuong_nho_viec:g(4),vuong_hon_su:g(4)};
function ghe(c){if(!c||c.job!=='quan'||!c.seat)return null;const T=window.D.OFFICES[String(c.seat).split('|')[0]];if(!T)return null;const w=window.D.seatWhere?window.D.seatWhere(c.seat):null;return {r:T.r||0,tag:T.tag||'',kinh:!!w&&!!window.D.PROV[w.p]&&window.D.PROV[w.p].k==='kinh'}}
/* người không làm quan (sự kiện chung với thư lại) thì không bị chặn; quan chưa có ghế tính theo cấp nghề */
function hop(id,c){const q=CONG[id];if(!q||!c||c.job!=='quan')return true;const h=ghe(c);if(!h)return !q.t&&!q.k&&(c.lv||0)*2>=q.a;return h.r>=q.a&&h.r<=q.b&&(!q.t||q.t.includes(h.tag))&&(!q.k||h.kinh)}
window.BN_GHE={CONG,hop,ghe};
/* ---------- N7: ở tiểu quốc vua chỉ xưng vương, câu chữ đổi theo ---------- */
const VUONG={'Thiên Tử':'Quốc vương','thiên tử':'quốc vương','Thiên tử':'Quốc vương','Hoàng đế':'Quốc vương','hoàng đế':'quốc vương','Hoàng Đế':'Quốc vương','Hoàng hậu':'Vương hậu','hoàng hậu':'vương hậu','Hoàng cung':'Vương cung','hoàng cung':'vương cung',
 'Hoàng tử':'Vương tử','hoàng tử':'vương tử','Thái tử':'Thế tử','thái tử':'thế tử','Công chúa':'Vương nữ','công chúa':'vương nữ','Hoàng tộc':'Vương tộc','hoàng tộc':'vương tộc','Hoàng thân':'Vương thân','hoàng thân':'vương thân',
 'Thánh chỉ':'Vương chỉ','thánh chỉ':'vương chỉ','Chiếu chỉ':'Vương chỉ','chiếu chỉ':'vương chỉ','thánh ân':'vương ân','băng hà':'qua đời','tân đế':'tân vương','Tân đế':'Tân vương','thi Đình':'thi Điện','Thi Đình':'Thi Điện','Trạng nguyên':'Khôi nguyên','trạng nguyên':'khôi nguyên'};
/* không đụng tới chữ đang nói về Đại Nguyễn */
const RE=new RegExp('(?<![\\p{L}])('+Object.keys(VUONG).join('|')+')(?![\\p{L}])(?!\\s+(?:của\\s+)?Đại Nguyễn)','gu');
function oNuocVuong(){const V=window.BN_VQ;try{return !!V&&V.natNha()!=='trieu'}catch(e){return false}}
function loi(t){if(typeof t!=='string'||!t||!oNuocVuong())return t;return t.replace(RE,m=>VUONG[m]||m)}
window.BN_LOI=loi;
window.EVPATCH=window.EVPATCH||[];
window.EVPATCH.push(function(E){
 for(const e of E){if(e.__g1553)continue;e.__g1553=1;
  if(CONG[e.id]){const c0=e.c;e.c=function(c,d){if(!hop(e.id,c))return false;return typeof c0==='function'?c0.call(this,c,d):true}}
  const x0=e.x;if(x0!=null)e.x=typeof x0==='function'?function(c,d){return loi(x0.call(this,c,d))}:function(){return loi(x0)};
  const o0=e.o;if(o0!=null){const boc=arr=>(arr||[]).map(o=>{if(!o||typeof o!=='object')return o;const q=Object.assign({},o);if(typeof q.l==='string'){const l0=q.l;Object.defineProperty(q,'l',{enumerable:true,configurable:true,get(){return loi(l0)}})}['f','y','n','yy','nn'].forEach(k=>{if(typeof q[k]==='function'){const f=q[k];q[k]=function(){return loi(f.apply(this,arguments))}}});return q});
   e.o=typeof o0==='function'?function(c,d){return boc(o0.call(this,c,d))}:function(){return boc(o0)}}}
});
/* ---------- N6: vương nữ kén phò mã ---------- */
window.EVF.push(G=>{const {fx,esc}=G;const S=()=>G.S();const V=()=>window.BN_VQ;
 const nuoc=d=>{const v=S().vq&&S().vq[d.nat];return v&&V().natNha()===d.nat?v:null};
 const nang=(d)=>{const v=nuoc(d);return v?v.cong.find(x=>x.n===d.cn&&!x.dead&&!x.wed):null};
 return [{id:'vq_phu_ma',t:'Vương nữ kén chồng',k:'Hôn nhân',fixed:1,tags:{},
  c:c=>!G.married(c)&&c.spouse==null&&c.g==='nam',
  x:(c,d)=>{const v=nuoc(d),n=nang(d);if(!v||!n)return 'Chuyện kén phò mã đã khép.';if(!d.sp){const p=G.mkMatch(c,{age:n.age,up:3});const a=n.n.split(' ');p.surname=a[0];p.given=a.slice(1).join(' ');p.g='nữ';p.famName='vương tộc '+v.ho;d.sp=p}
    const t=G.tie.ensure(c,{vai:['nguoi_thuong'],name:n.n,g:'nữ',age:n.age,nghe:'vương nữ '+v.ten,rel:5,why:'vương gia kén phò mã'});if(t){d.npc=t.id;t.ref='vq:'+d.nat+':'+n.n;t.vai=[];t.born=S().t-12*n.age}
    return `Nội thị của ${esc(v.ten)} vương mang thiếp đến: vương nữ ${esc(n.n)}, ${n.age} tuổi, đến tuổi kén chồng, tên ${esc(c.given)} nằm trong số người được xét. Làm phò mã thì cả nhà gắn với vương tộc, vinh cùng hưởng mà họa cũng cùng chịu.`},
  o:(c,d)=>{const n=nang(d);if(!n||!d.sp)return [{l:'Thôi',f:()=>''}];const v=G.mm(20);return [
   {l:`Nhận lời, sắm sính lễ vào phủ (${G.fmtMoney(v)})`,c:()=>G.money()>=v,f:cc=>{const w=nuoc(d),x=nang(d);if(!w||!x)return '';S().money-=v;x.wed=cc.surname+' '+cc.given;cc.flags.phoMaVq={nat:d.nat,t:S().t};G.mkSpouse(cc,true,d.sp);return `Đại lễ làm ở vương phủ. Từ nay họ ${esc(S().surname)} là thông gia của vương tộc ${esc(w.ho)}.`+fx(cc,{fame:60,cfame:30,tam:5})}},
   {l:'Dâng thư tạ ơn, xin cho được lập thân trước',r:[{_g:1,eq:0.7,khau:0.5},62],y:cc=>'Vương gia khen là người có chí, không phật lòng.'+fx(cc,{fame:5,eq:1}),n:cc=>'Vương gia cho là chê vương nữ. Từ đó cửa vương phủ đóng với nhà mình.'+fx(cc,{fame:-20,cfame:-10,tam:-6})},
   {l:'Thưa rằng nhà đã có nơi dạm hỏi',ax:{tin:-1},f:cc=>'Một lời nói dối đủ để thoát chuyện, miễn là không ai đi hỏi lại.'+fx(cc,{liem:-3,tam:2})}]}}]});
})();
