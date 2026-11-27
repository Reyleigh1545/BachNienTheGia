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
function trangPhuc(c,giau){const j=c.job;
  if(c.g==='nữ'){if((c.tuoc||0)>0||(giau&&(j==='none'||j==='noi')))return 'phunhan';if(j==='y'||j==='nguy'||j==='mo')return 'thaythuoc';if(j==='det'||j==='tho')return 'thodet';if(DAN.includes(j))return 'danthuong';if(j==='quan'||j==='vua')return 'phunhan';return null}
  if(j==='y'||j==='nguy')return 'thaythuoc';
  if(j==='quan'||j==='vua'||j==='thulai')return 'quan';if(j==='quan_ngu'||j==='tieu'||j==='nhadich')return 'linh';if(BUON.includes(j)||(c.tuoc||0)>0)return 'thuongnhan';if(DAN.includes(j))return 'danthuong';return null}
/* kiểu ảnh: theo tuổi trước, rồi buồn, giận, trang phục theo thân phận, vui; thiếu ảnh nào thì lùi về ảnh gốc */
function kieu(c,k,a,giau){const co=CO[k]||[];const gia=co.includes('truongthanh'); /* khuôn mà ảnh gốc là người già */
  const lon=gia?'truongthanh':'goc';const lay=(...ds)=>ds.find(x=>x&&co.includes(x))||'goc';
  if(a<=11)return lay('tre');if(a<=17)return lay('thieunien',lon);if(a>=60)return lay(gia?'goc':'gia','goc');
  const song=c.dead==null&&!c._np;const tam=c.tam==null?50:c.tam;
  if(!DONG_PHUC[k]){if(song&&tam<=25)return lay('buon',lon);if(song&&c.flags&&c.flags.ran)return lay('gian',lon)}
  const t=trangPhuc(c,giau);if(t&&co.includes(t))return t;
  /* đồng phục chỉ cho đúng nghề; nghề khác không có ảnh riêng thì mặc đồ thường */
  const dp=DONG_PHUC[k];const hop=dp&&((dp==='linh'&&c.job==='quan_ngu')||(dp==='quan'&&(c.job==='quan'||c.job==='vua'))||(dp==='vo'&&(c.job==='hiep'||c.job==='quan_ngu')));
  if(dp&&!hop)return lay('danthuong',lon);
  if(song&&tam>=85)return lay('vui',lon);return lay(lon)}
let so=0;
function svg(c,size,a,S,giau){if(TAT)return null;const k=khuon(c,S);if(!k)return null;const v=kieu(c,k,a,giau);const s=size||40;const id='anh'+(++so);const mat=c.dead!=null||c.left;
  return `<svg class="ava anh" width="${s}" height="${s}" viewBox="0 0 64 64" aria-hidden="true" data-av="${k}/${v}"${mat?' style="filter:grayscale(1);opacity:.75"':''}><clipPath id="${id}"><circle cx="32" cy="32" r="32"/></clipPath><circle cx="32" cy="32" r="32" fill="#f4efdf"/><image href="av/${k}/${v}.webp" x="0" y="0" width="64" height="64" clip-path="url(#${id})"/><circle cx="32" cy="32" r="31" fill="none" stroke="${mat?'#b5b8b0':c.g==='nữ'?'#d99aa4':'#7fa8cf'}" stroke-width="2"/></svg>`}
window.BN_ANH={svg,khuon,kieu,trangPhuc,BO};
})();
