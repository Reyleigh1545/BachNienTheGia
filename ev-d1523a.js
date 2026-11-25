/* Bách Niên Thế Gia · 7.0.0-d.1.5.23 · SỬA SỰ KIỆN THEO ẢNH VÀ SAVE HỌ HÀN (chủ dự án 25/11: "mày dựa theo cách làm, suy nghĩ, luật của tao mà tự tìm ra vấn đề trước").
   Luật dùng: 0.16 (sự kiện gắn người cụ thể, hợp tuổi, hợp nghề), 0.12 (giá ghi bên lựa chọn trả tiền ngay), mục 8 (lời kể không nhắc người vô danh).
   Làm bằng EVPATCH, không đụng chuỗi hậu sự. */
window.EVPATCH=window.EVPATCH||[];
window.EVPATCH.push(function(E,G){
const {R,pick,esc,fx}=G;
const find=id=>E.find(e=>e.id===id);
const m=v=>G.mm(v);const FM=v=>G.fmtMoney(v);
const ag=p=>G.age(p);

/* 1. yl_gap_thay "Thầy thuốc ngỏ ý nhận học trò": người đã có nghề chuyên (dạy học, thư lại) không nhận mục tiêu đời người này (ảnh 18:07: thầy đồ 33 tuổi được mời học thuốc) */
{const e=find('yl_gap_thay');if(e&&!e.__g1523){e.__g1523=1;const c0=e.c;e.c=function(c,d){if(c.job==='su'||c.job==='thulai')return false;return typeof c0==='function'?c0.call(this,c,d):true}}}

/* 2. v6_thach_tai "Lời thách thức": thách vật, cày, gánh chỉ cho người từ 15 đến 45 tuổi; người trên 45 chỉ gặp thách đối câu đối và phải có trí (ảnh 18:00: chủ mẫu 59 tuổi bị thách thi cày) */
{const e=find('v6_thach_tai');if(e&&!e.__g1523){e.__g1523=1;const c0=e.c,x0=e.x;
  e.c=function(c,d){if(ag(c)>45&&(c.tri||0)<55)return false;return typeof c0==='function'?c0.call(this,c,d):true};
  e.x=function(c,d){
    if(ag(c)<=45)return x0.call(this,c,d);
    const k=['doi_cau','đối câu đối trước đình','tri'];d.k=k[0];d.s=k[2];d.bet=m(6);
    const n=G.tie.ensure(c,{vai:['quen'],nghe:'kẻ tự cao trong làng',age:R(30,52),main:'tri',rel:-5,why:'thách '+k[1]});d.npc=n.id;
    return `${esc(n.n)}, ${n.nghe}, công khai thách ${esc(c.given)} ${k[1]}. Hai bên cùng góp ${FM(d.bet)} làm giải, ai thua phải khao cả xóm.`}}}

/* 3. tinh_hoi_xuan_b "Tình trong như đã": người thương phải có tên, không gọi "người ấy" vô danh (ảnh 18:41). Không làm thẻ riêng (chủ dự án 25/11: làm dâu thì là thẻ con dâu) */
{const e=find('tinh_hoi_xuan_b');if(e&&!e.__g1523){e.__g1523=1;const c0=e.c,x0=e.x;
  e.c=function(c,d){if(!(c.flags&&(c.flags.lvP||c.flags.yeu)))return false;return typeof c0==='function'?c0.call(this,c,d):true};
  e.x=function(c,d){d=d||{};const p=c.flags&&c.flags.lvP;
    if(p&&p.given){return `Đã mấy lần ${esc(c.given)} hẹn hò ${esc(G.nameOf(p))} bên bờ ao. ${esc(p.given)} hỏi: "Bao giờ thì nhà mình mang trầu cau sang?"`}
    const nm=c.flags&&c.flags.yeu&&c.flags.yeu.n;
    if(nm)return `Đã mấy lần ${esc(c.given)} hẹn hò ${esc(nm)} bên bờ ao. Người ta hỏi: "Bao giờ thì nhà mình mang trầu cau sang?"`;
    return typeof x0==='function'?x0.call(this,c,d):x0}}}

/* 4. c631_xin_thu_gioi_thieu "Nhờ thư giới thiệu": người xin là một thanh niên có tên, có thẻ (ảnh 18:20: "một thanh niên nghèo" vô danh) */
{const e=find('c631_xin_thu_gioi_thieu');if(e&&!e.__g1523){e.__g1523=1;
  e.x=function(c,d){d=d||{};const n=G.tie.ensure(c,{vai:['quen'],nghe:'thanh niên nghèo nhưng chăm chỉ',age:R(18,26),tier:0,rel:6,why:'xin thư giới thiệu'});d.npc=n.id;
    return `${esc(n.n)}, một thanh niên nghèo nhưng chăm chỉ, tìm đến ${esc(c.given)}, xin một lá thư giới thiệu gửi cho người quen ở huyện để được nhận làm việc.`}}}

/* 5. hn_sinh_le_cao "Nhà gái đòi sính lễ cao": cô gái được nêu tên và chính cô ấy là người được cưới nếu chịu (ảnh 18:26: "con gái nhà gia giáo" vô danh, cưới xong ra người khác) */
{const e=find('hn_sinh_le_cao');if(e&&!e.__g1523){e.__g1523=1;const o0=e.o;
  e.x=function(c,d){d=d||{};const p=G.mkMatch(c,{age:Math.max(16,ag(c)+R(-4,1))});c.flags.lvP=p;p._t=G.S().t;
    return `Một mối rất xứng cho ${esc(c.given)}: ${esc(G.nameOf(p))}, con gái nhà gia giáo, đẹp người đẹp nết. Nhưng nhà gái đòi sính lễ gấp đôi lệ thường.`};
  /* cưới đúng cô gái đã nêu tên (G.mkSpouse nhận người thứ ba) */
  const good=sp=>{if(!sp||sp.inLaw!==true)return sp;['tri','mi','eq'].forEach(k=>{sp[k]=Math.max(sp[k],R(58,78))});return sp};
  e.o=function(c,d){const f=m(30);const take=(cc,cost)=>{const p=cc.flags&&cc.flags.lvP;G.S().money-=cost;const sp=G.mkSpouse(cc,false,p||undefined);if(cc.flags)delete cc.flags.lvP;return good(sp)};
    return [{l:`Chịu, lo đủ sính lễ (${FM(f)})`,c:()=>G.money()>=f,f:cc=>{take(cc,f);return 'Cưới được người vợ hiền.'+fx(cc,{tam:6,cfame:2})}},
      {l:'Mặc cả',r:[{eq:1,khau:0.6},55],y:cc=>{take(cc,Math.round(f*0.6));return 'Hai nhà nhường nhau một bước, đám cưới thành.'+fx(cc,{tam:4})},n:cc=>{if(cc.flags)delete cc.flags.lvP;return 'Nhà gái phật ý, mối hỏng.'+fx(cc,{tam:-4})}},
      {l:'Thôi, tìm mối khác',f:cc=>{if(cc.flags)delete cc.flags.lvP;return 'Tiếc nhưng đành.'}}]}}}

/* 6. mung_tho "Lễ mừng thọ": chỉ vào các tuổi tròn chục (60, 70, 80, 90), hai lựa chọn ghi giá, có tiền mới chọn được (ảnh 18:26: "tròn 71 tuổi", lựa chọn không ghi giá) */
{const e=find('mung_tho');if(e&&!e.__g1523){e.__g1523=1;const c0=e.c;
  e.c=function(c,d){if(ag(c)%10!==0)return false;return typeof c0==='function'?c0.call(this,c,d):true};
  e.o=function(c,d){const a=m(30),b=m(6);return [
    {l:`Tiệc lớn mời cả làng (${FM(a)})`,c:()=>G.money()>=a,f:cc=>'Làng xóm đến chúc thọ đông vui.'+fx(cc,{money:-a,fame:R(8,15),tam:10})},
    {l:`Bữa cơm sum họp trong nhà (${FM(b)})`,c:()=>G.money()>=b,f:cc=>'Cả nhà quây quần, ấm cúng.'+fx(cc,{money:-b,tam:8})}]}}}
});
