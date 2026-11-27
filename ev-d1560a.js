/* Bách Niên Thế Gia · 7.0.0-d.1.5.60 · SỔ ĐIỀU ĐÃ BIẾT (chủ dự án 27/11: "để người chơi tự biết các thông tin vặt thông qua các sự kiện có liên quan cung cấp thông tin, cả trang giá cả theo khu vực cũng vậy, khi người chơi biết được thông tin về loại nào thì mới hiện loại ấy ra,
   các thế lực trên bản đồ thế giới cũng vậy, nghe ngóng được tin tức thì mới hiện, không biết thì ẩn hết"; "khung vương triều và người đã quen: giữ nhưng chỉ có khi đã biết"). Biết được nhờ ở đó, đi ngang, đi buôn, đụng mặt, dính sự kiện. Lưu ở S.biet. */
(function(){
let G=null;const S=()=>G.S();const THUONG=['lua','ngo','muoi']; /* thứ nhà nào cũng mua ở chợ nơi mình ở */
function so(){const s=S();if(!s.biet)s.biet={gia:{},tl:{},cu:{},o:{p:null,thang:0}};return s.biet}
const khoa=x=>typeof x==='string'?x:(x&&(x.prov||x.id))||'';
function hocGia(p,g){if(!p||!g)return;const B=so();(B.gia[p]=B.gia[p]||{})[g]=1}
function coGia(x,g){const s=S();const p=khoa(x);if(!s||!s.loc)return false;const B=so();if(p===s.loc.p&&(THUONG.includes(g)||(s.kho&&s.kho[g]>0)))return true;return !!(B.gia[p]&&B.gia[p][g])}
function hocTl(f){if(f)so().tl[f.id]=1}
/* đã đụng mặt, đã qua lại thì cũng là đã biết */
function coTl(f){const s=S();if(!f||!s)return false;if(so().tl[f.id]||f.rel)return true;return !!(s.np&&s.np.l&&Object.values(s.np.l).some(n=>String(n.ref||'').startsWith('fz:'+f.id+':')))}
const natO=p=>window.D.PROV[p]&&window.D.PROV[p].nat;
/* số năm nhà đã từng sống ở một nước */
const namO=nat=>Math.floor((so().cu[nat]||0)/12);
const daO=nat=>(so().cu[nat]||0)>0;
const quenNguoi=(nat,ten)=>{const s=S();return !!(s.np&&s.np.l&&Object.values(s.np.l).some(n=>String(n.ref||'').startsWith('vq:'+nat+':')&&String(n.ref).endsWith(':'+ten)))};
const coQuan=(nat,cap)=>G.alive().some(c=>G.inClan(c)&&c.job==='quan'&&c.seat&&(c.lv||0)>=cap&&natO(G.placeOf(c))===nat);
/* mỗi tháng nghe ngóng thêm một chút */
function month(){const s=S();if(!s||!s.loc||!G)return;const B=so();const T=window.BN_TL;
  if(s.journey){const j=s.journey;const i=Math.min(j.di.length-1,Math.max(0,Math.round((1-j.left/j.total)*(j.di.length-1))));const p=j.di[i];THUONG.forEach(g=>hocGia(p,g));if(T)T.o(p).forEach(f=>{if(G.chance(0.4))hocTl(f)});return}
  const here=s.loc.p;const nat=natO(here);B.cu[nat]=(B.cu[nat]||0)+1;
  if(B.o.p!==here)B.o={p:here,thang:0};B.o.thang++;THUONG.forEach(g=>hocGia(here,g));
  if(B.o.thang%12===0){const con=Object.keys(window.D.GOODS||{}).filter(g=>!(B.gia[here]||{})[g]);if(con.length)hocGia(here,con[Math.floor(Math.random()*con.length)])}
  if(T){const L=T.o(here).filter(f=>!coTl(f));if(L.length&&G.chance(0.05))hocTl(L[0]);
    if(G.chance(0.012)){const K=T.song().filter(f=>f.p!==here&&(window.D.ADJ[here]||[]).some(z=>z[0]===f.p)&&!coTl(f));if(K.length)hocTl(K[Math.floor(Math.random()*K.length)])}}}
/* đi buôn về thì biết giá thứ mình buôn, ở nơi đến và ở nhà */
function buon(r,g){hocGia(khoa(r),g);const s=S();if(s&&s.loc)hocGia(s.loc.p,g)}
window.BN_BIET={bind(g){G=g},so,hocGia,coGia,hocTl,coTl,namO,daO,quenNguoi,coQuan,month,buon,khoa,THUONG};
})();
