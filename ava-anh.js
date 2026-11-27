/* Bách Niên Thế Gia · 7.0.0-d.1.5.56 · ẢNH ĐẠI DIỆN VẼ SẴN (chủ dự án 26/11: một người giữ cùng khuôn mặt qua mọi tuổi, đổi nghề hay thân phận chỉ đổi trang phục, có nét mặt theo tâm trạng; 27/11: "vẽ tiếp avatar … sau đó add vào game").
   Ảnh ở av/<khuôn>/<kiểu>.webp, danh sách ở data-av.js. engine.js gọi BN_ANH.svg từ avatarSVG; trả null thì engine vẽ kiểu cũ. Thêm ?av=cu vào địa chỉ để xem hình cũ. */
(function(){
const CO=window.BN_AVCO||{};
const BO={nam:Object.keys(CO).filter(k=>k.startsWith('nam_')),nu:Object.keys(CO).filter(k=>k.startsWith('nu_'))};
let TAT=false;try{TAT=/[?&]av=cu\b/.test(location.search)}catch(e){}
const bam=s=>{let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0};
/* khuôn mặt đi theo họ tên: người quen cưới vào nhà vẫn giữ mặt cũ. Người trong gia phả được ghi nhớ khuôn (c.mat) và tránh trùng với người nhà còn sống khi còn khuôn trống */
function khuon(c,S){const L=c.g==='nữ'?BO.nu:BO.nam;if(!L.length)return null;if(c.mat&&L.includes(c.mat))return c.mat;
  const goc=bam((c.surname||'')+' '+(c.given||''));let k=L[goc%L.length];
  const nha=S&&S.people&&S.people.indexOf(c)>=0;if(!nha)return k;
  const quen=S.np&&S.np.l&&Object.values(S.np.l).some(n=>n.n===c.surname+' '+c.given);
  if(!quen){const dem={};S.people.forEach(p=>{if(p!==c&&p.dead==null&&p.mat)dem[p.mat]=(dem[p.mat]||0)+1});const it=Math.min(...L.map(x=>dem[x]||0));if((dem[k]||0)>it){const R=L.filter(x=>(dem[x]||0)===it);k=R[goc%R.length]}}
  c.mat=k;return k}
const DAN=['nong','khuanvac','tieuphu','ngu','chan','thosan','laido','tho','tho_ren','hau'];
const BUON=['chu','tieunhi','hangrong'];
/* khuôn mà ảnh gốc (và các nét mặt đi theo) là đồng phục: giáp, mũ quan, đồ võ */
const DONG_PHUC={nam_6:'linh',nam_9:'quan',nu_8:'vo'};
/* d.1.5.62: trả về danh sách kiểu hợp, xếp theo ưu tiên; khuôn nào thiếu kiểu đầu thì lấy kiểu sau */
const NGHE_RIENG={su:['nhosi'],hiep:['hiepkhach'],tho_ren:['thoren','danthuong'],ngu:['nguphu','danthuong'],laido:['nguphu','danthuong'],thosan:['thosan','danthuong'],bep:['daubep','danthuong'],nghe:['daokep']};
function trangPhuc(c,giau){const j=c.job;
  if(c.g==='nữ'){if(j==='quan')return ['nuquan','phunhan'];if(j==='quan_ngu')return ['nulinh'];if((c.tuoc||0)>0||j==='vua'||(giau&&(j==='none'||j==='noi')))return ['phunhan'];if(j==='y'||j==='nguy'||j==='mo')return ['thaythuoc'];if(j==='det'||j==='tho')return ['thodet'];if(NGHE_RIENG[j])return NGHE_RIENG[j];if(DAN.includes(j))return ['danthuong'];return []}
  if(j==='y'||j==='nguy')return ['thaythuoc'];if(j==='vua')return ['hoangbao','quan'];
  if(j==='quan'||j==='thulai')return ['quan'];if(j==='quan_ngu'||j==='tieu'||j==='nhadich')return ['linh'];if(NGHE_RIENG[j])return NGHE_RIENG[j];if(BUON.includes(j)||(c.tuoc||0)>0)return ['thuongnhan'];if(DAN.includes(j))return ['danthuong'];return []}
/* người ngoài gia tộc: đọc lời mô tả. Thứ tự quan trọng: thân phận tu hành, ăn mày trước, nghề sau */
const TA=[[/ni cô|ni sư|sư cô|sư bà/,['nico']],[/trụ trì|hòa thượng|nhà sư|sư thầy|sư già|tăng nhân|thiền sư|tiểu tăng|vị tăng|sư ông/,['tang','nico']],[/đạo sĩ|đạo nhân|đạo cô|chân nhân/,['daosi']],[/ăn mày|hành khất/,['anmay']],
  [/quốc vương|hoàng đế/,['hoangbao']],[/thầy thuốc|lang y|danh y|y sư|thầy lang|nữ y/,['thaythuoc']],[/thầy đồ|nho sinh|thư sinh|nho sĩ|đồng khoa/,['nhosi']],[/hiệp khách|kiếm khách|kiếm sĩ|võ lâm|chưởng môn|sư huynh|sư tỷ|người giang hồ/,['hiepkhach']],
  [/thợ rèn/,['thoren']],[/thợ săn/,['thosan']],[/ngư phủ|dân chài|lái đò|chủ thuyền/,['nguphu']],[/đầu bếp|bà bếp|ông bếp/,['daubep']],[/đào hát|kép hát|ca kỹ|gảy đàn|phường hát|hát rong/,['daokep']],
  [/tri huyện|tri phủ|quan huyện|thượng thư|án sát|ngự sử|quan viên|vị quan|tuần phủ|bố chính/,['quan','nuquan']],[/tướng|người lính|lính |võ quan|đội trưởng|bách hộ|thiên hộ|đồng đội/,['linh','nulinh']],[/thương nhân|lái buôn|phú thương|chủ tiệm|chưởng quỹ|chủ hiệu/,['thuongnhan']]];
function trangPhucNgoai(c){const t=(' '+String(c._nghe||'')+' ').toLowerCase();const x=TA.find(z=>z[0].test(t));if(x)return x[1];if((c._vai||[]).includes('quan'))return c.g==='nữ'?['nuquan','phunhan']:['quan'];return null}
const TU=['nico','tang','daosi','anmay','hoangbao']; /* thân phận hiếm: chỉ vài khuôn có, người ngoài mang thân phận này lấy đúng các khuôn ấy */
/* khuôn mặt riêng cho nhân vật cốt truyện, ảnh ở av/<tên>/; chưa có ảnh thì dùng khuôn chung */
const RIENG={'Nguyễn Thành Trung':'hoangde','Phạm Trung Kiên':'pham_kien','Phạm Nhật Vượng':'pham_vuong','Phạm Xuân Huấn':'pham_huan','Phạm Thái Phi':'pham_thaiphi','Phạm Thái phi':'pham_thaiphi'};
const rieng=c=>{const k=RIENG[((c.surname||'')+' '+(c.given||'')).trim()];return k&&CO[k]?k:null};
/* kiểu ảnh: theo tuổi trước, rồi buồn, giận, trang phục theo thân phận, vui; thiếu ảnh nào thì lùi về ảnh gốc */
function kieu(c,k,a,giau){const co=CO[k]||[];const gia=co.includes('truongthanh'); /* khuôn mà ảnh gốc là người già */
  const lon=gia?'truongthanh':'goc';const lay=(...ds)=>ds.find(x=>x&&co.includes(x))||'goc';
  if(a<=11)return lay('tre');if(a<=17)return lay('thieunien',lon);if(a>=60)return lay(gia?'goc':'gia','goc');
  const song=c.dead==null&&!c._np;const tam=c.tam==null?50:c.tam;
  if(!DONG_PHUC[k]){if(song&&tam<=25)return lay('buon',lon);if(song&&c.flags&&c.flags.ran)return lay('gian',lon)}
  const t=trangPhuc(c,giau).find(x=>co.includes(x));if(t)return t;
  /* đồng phục chỉ cho đúng nghề; nghề khác không có ảnh riêng thì mặc đồ thường */
  const dp=DONG_PHUC[k];const hop=dp&&((dp==='linh'&&c.job==='quan_ngu')||(dp==='quan'&&(c.job==='quan'||c.job==='vua'))||(dp==='vo'&&(c.job==='hiep'||c.job==='quan_ngu')));
  if(dp&&!hop)return lay('danthuong',lon);
  if(song&&tam>=85)return lay('vui',lon);return lay(lon)}
let so=0;
function chon(c,a,S,giau){const r=rieng(c);if(r)return [r,a>=60&&CO[r].includes('gia')?'gia':'goc'];
  let k=khuon(c,S);if(!k)return null;
  if(c._np&&a>=18){const T=trangPhucNgoai(c);if(T){const co=x=>(CO[x]||[]);const gia=a>=60;
      for(const v of T){const L=(c.g==='nữ'?BO.nu:BO.nam).filter(x=>co(x).includes(v));if(!L.length)continue;
        if(gia&&!TU.includes(v))break; /* người già thường dùng ảnh tóc bạc */
        return [co(k).includes(v)?k:L[bam((c.surname||'')+' '+(c.given||''))%L.length],v]}}}
  return [k,kieu(c,k,a,giau)]}
function svg(c,size,a,S,giau){if(TAT)return null;const z=chon(c,a,S,giau);if(!z)return null;const k=z[0],v=z[1];const s=size||40;const id='anh'+(++so);const mat=c.dead!=null||c.left;
  return `<svg class="ava anh" width="${s}" height="${s}" viewBox="0 0 64 64" aria-hidden="true" data-av="${k}/${v}"${mat?' style="filter:grayscale(1);opacity:.75"':''}><clipPath id="${id}"><circle cx="32" cy="32" r="32"/></clipPath><circle cx="32" cy="32" r="32" fill="#f4efdf"/><image href="av/${k}/${v}.webp" x="0" y="0" width="64" height="64" clip-path="url(#${id})"/><circle cx="32" cy="32" r="31" fill="none" stroke="${mat?'#b5b8b0':c.g==='nữ'?'#d99aa4':'#7fa8cf'}" stroke-width="2"/></svg>`}
window.BN_ANH={svg,khuon,kieu,chon,trangPhuc,trangPhucNgoai,BO};
})();
