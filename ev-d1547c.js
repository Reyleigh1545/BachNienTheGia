/* Bách Niên Thế Gia · 7.0.0-d.1.5.47 · SỰ KIỆN ĐÚNG NƠI (chủ dự án 27/11: "đang ở thành phố nào thuộc khu vực nào thì chỉ có thể xảy ra ở khu vực đó, không xảy ra các sự kiện sai thành phố"; "sống ở nông thôn hay thị trấn hay thành thị phải khác nhau").
   Ba việc: (1) CHẶN sự kiện cần địa hình mà nơi ấy không có (biển, sa mạc, tuyết, núi rừng, sông nước), sự kiện ở kinh đô, sự kiện ruộng đất và việc làng khi nhà ở trong thành;
   (2) ĐỔI CÁCH GỌI theo nơi ở cho mọi sự kiện: ở trấn, ở thành thì "lý trưởng, cả xóm, đầu làng" đổi theo nơi; (3) chuyện chỉ nhắc nơi xa (tin từ kinh, thư biên ải) giữ nguyên. */
(function(){
const NH={bien:['hai_khau','bach_sa','van_dao','diem_dien','hai_minh_ao','cam_thanh'],
 samac:['ngoc_mon','sa_thanh','thanh_tuyen','lien_sa'],
 tuyet:['nhan_mon','thiet_son','ma_truong','tuyet_linh'],
 nui:['nhan_mon','thiet_son','tuyet_linh','son_ha','lam_son','duoc_coc','ngoc_mon','lien_sa','hoai_thuy'],
 kinh:['thien_kinh']};
const DIA={};
const them=(ids,o)=>ids.split(' ').forEach(id=>{DIA[id]=Object.assign({},DIA[id],o)});
them('d631_ngoc_trai d631_thuyen_nuoc_ngoai_mac_can d631_thuyen_truong_nhan_con tg_29 n633_ngu_thuyenhoa',{can:'bien'});
them('d631_bao_cat_thuong_doan',{can:'samac'});
them('d631_thuong_gia_lac_tuyet',{can:'tuyet'});
them('v61_cui_ho tp631_gap_ho cv_thu_trieu d631_hang_duoc_lieu n633_tp_tran kn_41 tp631_go_lim ts_ho_lon',{can:'nui'});
them('vv_mi_yen_tiec ct_mi2',{can:'kinh'});
them('lu_lut lut_canh_bao lut_b lut_c c631_tam_song v61_ca_tranh dn_13 dn_17 cau_1 nong631_khai_hoang',{khongSaMac:1});
/* ruộng đất, việc làng: không có trong thành */
them('c631_tien_cu_huong_truong nong631_ruong_cong nong631_khai_hoang t_n_khai_hoang t_n_ly_truong t_n_hoi_lang t_n_trau_de t_n_hu_vang ch_trau_de nong_cuong_hao v61_ta_dien_tron c16_cau_mua n633_nong_gieng n633_nong_sau f633_gieng kn_gieng_nuoc_ngot tp631_go_lim dh_66 lw_21',{khongThanh:1});
const G0=()=>window.BNTG;
/* d.1.5.49: nhóm địa hình lấy từ bản đồ */
if(window.D&&window.D.hasDH){const lay=l=>Object.keys(window.D.PROV).filter(p=>window.D.hasDH(p,l));NH.bien=lay(['bien']);NH.samac=lay(['samac']);NH.tuyet=lay(['tuyet']);NH.nui=lay(['nui','rung'])}
function ok(id,c){const d=DIA[id];if(!d)return true;const G=G0();if(!G||!c)return true;let p=null;try{p=G.placeOf(c)}catch(e){}if(!p)return true;
  if(d.can&&!NH[d.can].includes(p))return false;if(d.khongSaMac&&NH.samac.includes(p))return false;if(d.khongThanh){const L=G.S().loc;if(L&&L.t===2)return false}return true}
window.BN_DIA={list:DIA,ok,nhom:NH};
const DOI={
 tran:{'cuối xóm':'cuối phố','ghé xóm':'ghé phố','các xóm':'các phố','khắp xóm':'khắp phố','lý trưởng':'trấn trưởng','cả làng':'cả trấn','dân làng':'dân trấn','người làng':'người trong trấn','trong làng':'trong trấn','đầu làng':'đầu phố','đầu xóm':'đầu phố','cả xóm':'cả dãy phố','trong xóm':'trong phố','xóm bên':'phố bên','làng bên':'phố bên','đường làng':'đường trấn','chợ làng':'chợ trấn','đình làng':'đình trấn','hội làng':'hội đền ở trấn','giếng làng':'giếng phố','trường làng':'trường tư trong trấn','sân đình':'sân đền'},
 thanh:{'cuối xóm':'cuối ngõ','ghé xóm':'ghé phường','các xóm':'các phường','khắp xóm':'khắp phường','lý trưởng':'phường trưởng','cả làng':'cả phường','dân làng':'dân phường','người làng':'người trong phường','trong làng':'trong phường','đầu làng':'đầu phường','đầu xóm':'đầu ngõ','cả xóm':'cả ngõ','trong xóm':'trong ngõ','xóm bên':'ngõ bên','làng bên':'phường bên','đường làng':'đường phố','chợ làng':'chợ phường','đình làng':'đình phường','hội làng':'hội đền trong thành','giếng làng':'giếng phường','trường làng':'trường tư trong phường','sân đình':'sân đền'}};
const RE=new RegExp('(?<![\\p{L}])('+Object.keys(DOI.tran).join('|')+')(?![\\p{L}])','giu');
function doi(t){if(typeof t!=='string'||!t)return t;const G=G0();const L=G&&G.S()&&G.S().loc;const M=L&&L.t===1?DOI.tran:L&&L.t===2?DOI.thanh:null;if(!M)return t;
  return t.replace(RE,m=>{const r=M[m.toLowerCase()];if(!r)return m;return m[0]===m[0].toUpperCase()&&m[0]!==m[0].toLowerCase()?r[0].toUpperCase()+r.slice(1):r})}
window.BN_DIA.doi=doi;
window.EVPATCH=window.EVPATCH||[];
window.EVPATCH.push(function(E){
for(const e of E){if(e.__g1547c)continue;e.__g1547c=1;
 if(DIA[e.id]){const c0=e.c;e.c=function(c,d){if(!ok(e.id,c))return false;return typeof c0==='function'?c0.call(this,c,d):true}}
 const x0=e.x;if(x0!=null)e.x=typeof x0==='function'?function(c,d){return doi(x0.call(this,c,d))}:function(){return doi(x0)};
 const o0=e.o;if(o0!=null){const wrap=arr=>(arr||[]).map(o=>{if(!o||typeof o!=='object')return o;const q=Object.assign({},o);if(typeof q.l==='string')q.l=doi(q.l);['f','y','n','yy','nn'].forEach(k=>{if(typeof q[k]==='function'){const f=q[k];q[k]=function(){return doi(f.apply(this,arguments))}}});return q});
   e.o=typeof o0==='function'?function(c,d){return wrap(o0.call(this,c,d))}:function(){return wrap(o0)}}}
});
})();
