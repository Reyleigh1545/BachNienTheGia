/* Bách Niên Thế Gia · 7.0.0-d.1.5.57 · SỬA THEO ĐÁNH GIÁ 27/11: người nhà chữa bệnh; con em đánh người.
   Chủ dự án: "lựa chọn nhờ người nhà làm thầy thuốc chữa nhưng nhà không có ai làm thầy thuốc ngoại trừ chính gia chủ … lần nào cũng chắc chắn thành công", "một số sự kiện bị mắc bệnh khác lại không có nhờ người nhà làm nghề y chữa",
   "sự kiện con em đánh người nên cụ thể là con em nào, con của ai thì người ấy xử trí, trừ khi gây gỗ với người không nên đụng vào thì mới cần gia chủ ra mặt". */
(function(){
/* sự kiện có người trong nhà đang bệnh; người bệnh là người gặp sự kiện */
const BENH=['kiet_ly','ho_lao','dau_mua','tre_om_vat','cho_dai','benh_dich','dl_om','v63_k_sot_co_giat','v63_k_tieu_chay','v63_k_cum_lanh_dong','v63_k_dich_tre','v63_k_uon_van','v63_k_vet_nhiem'];
window.BN_BENH=BENH;
const NANG=['ho_lao','dau_mua','benh_dich','cho_dai','v63_k_uon_van']; /* bệnh nặng: thầy thuốc không tự chữa được */
window.EVPATCH=window.EVPATCH||[];
window.EVPATCH.push(function(E,G){
 for(const e of E){if(!BENH.includes(e.id)||e.__bs)continue;e.__bs=1;const o0=e.o,x0=e.x;
  /* ghi người chữa vào dữ liệu ngay khi kể, để thẻ của họ hiện cùng hộp */
  e.x=function(c,d){const bs=G.ill&&G.ill.doctorOf(c,d);if(d){if(bs)d.bs=bs.id;else delete d.bs}return typeof x0==='function'?x0.call(this,c,d):x0};
  e.o=function(c,d){const goc=(typeof o0==='function'?o0.call(this,c,d):o0)||[];const L=goc.filter(q=>!/người nhà làm thầy thuốc|người nhà làm nghề y/i.test(String(q.l||'')));
    const tu=G.ill&&G.ill.optTu(c,{nang:NANG.includes(e.id)});const bs=G.ill&&G.ill.doctorOf(c,d);if(d){if(bs)d.bs=bs.id;else delete d.bs}
    const them=[];if(tu)them.push(tu);if(bs)them.push(G.ill.optNha(c,bs,{lon:NANG.includes(e.id)}));L.splice(Math.min(1,L.length),0,...them);return L}}
});
/* con em đánh người */
window.EVF.push(G=>{
 const {fx,esc,pick,R}=G;const S=()=>G.S();const m=v=>G.mm(v);const FM=v=>G.fmtMoney(v);const N=c=>esc(c.given);
 const nho=c=>G.kidsOf(c).filter(k=>k.dead==null&&G.inClan(k)&&!k.away&&G.age(k)>=7&&G.age(k)<=19);
 const dua=(c,d)=>{let k=d&&d.kid&&G.P(d.kid);if(!k||k.dead!=null){const L=nho(c);k=L.length?pick(L):null;if(d)d.kid=k&&k.id}return k};
 const an=(k,o)=>{if(k)G.law.case(k,'dau_au',o||{})};
 const goi=k=>k.g==='nữ'?'con gái':'con trai';
 /* nhà quyền thế đang ở cùng khu: thế gia có thật */
 const theGia=()=>{const w=S().w;if(!w||!w.houses)return null;const p=S().loc&&S().loc.p;const L=Object.entries(w.houses).map(([id,h])=>{const df=G.hdef&&G.hdef(id);return df&&df.p===p&&h&&h.head?[id,{head:h.head,ten:df.sur+' '+h.head.given}]:null}).filter(Boolean);return L.length?pick(L):null};
 const tre=[
 {id:'lw_02b',t:'Con em đánh người',k:'Luật pháp',tags:{},cd:48,pcd:96,w:0.8,age:[24,70],c:c=>nho(c).length>0,
  x:(c,d)=>{const k=dua(c,d);return k?`${esc(k.given)}, ${goi(k)} của ${N(c)}, ${G.age(k)} tuổi, đánh bạn đến chảy máu đầu. Nhà người bị đánh sang đòi công đạo, miệng nói đến quan.`:'Chuyện trẻ con đã qua.'},
  o:(c,d)=>{const k=dua(c,d);if(!k)return [{l:'Thôi',f:()=>''}];const v=m(15);return [
   {l:`Bồi thường thuốc thang, bắt con sang xin lỗi (${FM(v)})`,c:()=>G.money()>=v,f:cc=>{S().money-=v;G.addStat(k,'tam',-4);return `Hai nhà làm lành. ${esc(k.given)} bị phạt quỳ trước bàn thờ.`+fx(cc,{tam:-1})}},
   {l:`Hỏi cho ra đầu đuôi rồi mới bênh ${k.given}`,r:[{khau:0.7,eq:0.5},45],y:cc=>{G.addStat(k,'tam',4);return 'Người trong xóm làm chứng bên kia gây sự trước. Nhà ấy im lặng.'+fx(cc,{fame:2,eq:1})},n:cc=>{an(k,{ctx:`${k.given} bị nhà kia tố đánh người`,ag:0,ev:60});return 'Không ai làm chứng. Nhà kia kiện thật.'+fx(cc,{fame:-3,tam:-4})}},
   {l:`Đích thân dắt ${k.given} ra quan nhận lỗi`,ax:{cc:1},f:cc=>{an(k,{ctx:`${k.given} ra công đường nhận lỗi đánh bạn`,mi:1});return 'Quan huyện thụ lý, khen cha mẹ biết dạy con.'+fx(cc,{liem:2,tam:-3})}}]}},
 {id:'lw_02c',t:'Đụng vào con nhà quyền thế',k:'Luật pháp',tags:{},cd:96,pcd:180,w:0.25,head:1,age:[24,85],
  c:()=>!!theGia()&&G.alive().some(k=>G.inClan(k)&&!k.away&&G.age(k)>=9&&G.age(k)<=19),
  x:(c,d)=>{let k=d.kid&&G.P(d.kid);if(!k){const L=G.alive().filter(q=>G.inClan(q)&&!q.away&&G.age(q)>=9&&G.age(q)<=19);k=pick(L);d.kid=k&&k.id}const th=theGia();if(!k||!th)return 'Chuyện đã qua.';d.hid=th[0];const h=th[1];const n=G.npHouse&&G.npHouse(th[0]);if(n){n.n=h.ten;if(!n.nghe)n.nghe=n.vaiTxt='gia chủ thế gia';d.npc=n.id}return `${esc(k.given)}, ${G.age(k)} tuổi, đánh nhau ngoài chợ mà không biết đối phương là con cháu nhà ${esc(h.ten)}, gia chủ một thế gia trong vùng. Cha mẹ đứa trẻ không đủ vai vế để nói chuyện với họ. ${N(c)} là gia chủ, phải tự ra mặt.`},
  o:(c,d)=>{const k=d.kid&&G.P(d.kid);if(!k||!d.hid)return [{l:'Thôi',f:()=>''}];const v=m(60);const rel=v2=>{if(G.houseRel)G.houseRel(d.hid,v2)};return [
   {l:`Mang lễ hậu đến tận cổng tạ tội (${FM(v)})`,c:()=>G.money()>=v,f:cc=>{S().money-=v;rel(-2);return 'Lễ được nhận. Người ta tiếp ở gian ngoài, trà không rót lần hai.'+fx(cc,{fame:-4,tam:-6})}},
   {l:'Lấy lẽ phải mà nói, trẻ con gây gổ thì hai bên cùng dạy',r:[{eq:0.8,khau:0.6,fame:0.3},62],y:cc=>{rel(8);return 'Gia chủ bên kia nghe xong, bắt con mình ra xin lỗi trước.'+fx(cc,{fame:12,eq:2})},n:cc=>{rel(-18);an(k,{ctx:`${k.given} bị một thế gia đưa ra công đường vì đánh con cháu họ`,ag:1,ev:70});return 'Bên kia không nghe, đưa thẳng đơn lên quan.'+fx(cc,{fame:-8,tam:-10})}},
   {l:`Phạt ${k.given} trước mặt họ cho nguôi giận`,ax:{rong:-1},f:cc=>{G.addStat(k,'suc',-R(8,16));G.addStat(k,'tam',-15);rel(4);return `${esc(k.given)} chịu đòn giữa sân người ta, không khóc một tiếng, cũng không nhìn gia chủ.`+fx(cc,{tam:-8})}}]}}];
 return tre});
})();
