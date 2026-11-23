/* Bách Niên Thế Gia v6.7.10-d9.12 · VIẾT LẠI THEO GÓP Ý CHỦ DỰ ÁN (24/11):
   - qt1_mon_sinh "Lời mời kết giao": phải biết người đứng đầu phe là ai, phe nào mạnh yếu, tính nết ra sao trước khi bái làm thầy (thẻ chân dung, có thể nhờ người dò hỏi rồi mới quyết);
   - v64_vo_doi_don "Lệnh điều đồn": phải là thực sự bị điều đi (đổi sang đồn khác cùng cấp), chỉ ra khi có đồn để điều đến. */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const FM=v=>G.fmtMoney(v);const N=c=>esc(c.given);
const Q=G.qt;const C=()=>Q.court();const FN=k=>Q.facN(k);
const nm=n=>esc(n?n.n:'người ấy');
const T=d=>d&&d.npc?G.tie.get(d.npc):null;
const powTxt=p=>p>=70?'rất mạnh':p>=50?'khá mạnh':p>=30?'vừa phải':'đang yếu';
const noFac=c=>{try{return !Q.of(c).f}catch(e){return true}};
const gone=()=>[{l:'Thôi',f:()=>''}];
const joinThat=(c,k,n,bonus)=>{Q.join(c,k);if(n)G.tie.rel(n,22,'bái làm thầy');return `${N(c)} bái ${n?nm(n):'vị đại thần'} làm thầy, từ nay là người của phe ${FN(k)}.`+fx(c,{loy:10,fav:k==='hoang'?4:0,eq:1,tam:3,qh:n?[n.n,22]:undefined})};
return [
{id:'qt1_mon_sinh',t:'Lời mời kết giao',k:'Quan trường',job:['quan'],cd:72,tags:{},c:c=>c.lv<=4&&noFac(c)&&G.alive().length>0,
 x:(c,d)=>{const FK=Q.FACK;d.k=d.k||pick(FK);const F=C().f[d.k];if(!F)return 'Một vị đại thần gửi thiếp.';const n=G.tie.ensure(c,{key:'lead_'+d.k,name:F.lead,g:'nam',vai:['phe_chu'],nghe:`người đứng đầu phe ${FN(d.k)}, ${esc((Q.FAC[d.k]||{}).d||'')}`,age:R(50,68),main:'tri',st:{tri:R(75,98),eq:R(65,90)},tier:5,rel:0,why:'mời kết giao'});d.npc=n.id;return `${nm(n)}, người đứng đầu phe ${FN(d.k)}, cho người đưa thiếp: muốn nhận ${N(c)} làm môn sinh. Phe ${FN(d.k)} hiện ${powTxt(F.pow||40)}; tính phe: ${esc((Q.FAC[d.k]||{}).d||'chưa rõ')}. Theo phe thì có chỗ dựa nhưng cũng bị gắn nhãn; từ chối thì giữ thân phận nhưng một mình giữa chốn quan trường.`},
 o:(c,d)=>{const n=T(d);const k=d.k;if(!n||!k)return gone();return [
  {l:`Bái ${esc(n.n)} làm thầy`,f:c=>joinThat(c,k,n)},
  {l:`Nhờ người dò hỏi về phe ${FN(k)} rồi mới quyết (${FM(m(6))})`,c:()=>G.money()>=m(6),f:c=>{G.later(c,'qt1_mon_sinh_b',1,{npc:n.id,k});return `Nhờ người quen dò hỏi về phe ${FN(k)} và ${nm(n)}. Hẹn vài tuần sau có tin.`+fx(c,{money:-m(6),tam:0})}},
  {l:'Khéo léo từ chối, giữ thân phận trung lập',ax:{dl:1},f:c=>{G.tie.rel(n,-6,'bị từ chối kết giao');return `Thư trả lời lời lẽ cung kính nhưng không nhận. ${nm(n)} không trách, chỉ ghi nhớ.`+fx(c,{fav:2,qh:[n.n,-6]})}}]}},
{id:'qt1_mon_sinh_b',fixed:1,t:'Tin dò hỏi về phe',k:'Quan trường',tags:{},
 x:(c,d)=>{const n=T(d);const F=C().f[d.k];if(!n||!F)return 'Tin dò hỏi không còn.';d.good=chance(0.5+Math.min(0.2,(F.pow||40)/300));const tc=pick(['liêm khiết nổi tiếng','trọng người tài nhưng nóng tính','khéo léo, hay lợi dụng môn sinh','giữ lời, ít khoan nhượng với người phạm lỗi']);d.tc=tc;const ds=d.good?pick(['nhiều môn sinh của phe đã thăng tiến đều đặn','phe che chở người của mình khi gặp việc']):pick(['một số môn sinh bị đẩy ra làm việc nguy hiểm','khi phe thất thế thì môn sinh bị kéo theo']);return `Tin dò hỏi về: ${nm(n)} ${esc(tc)}. Phe ${FN(d.k)} hiện ${powTxt(F.pow||40)}; ${esc(ds)}. Thời gian cân nhắc đã đủ.`},
 o:(c,d)=>{const n=T(d);if(!n)return gone();return [
  {l:`Bái ${esc(n.n)} làm thầy`,f:c=>joinThat(c,d.k,n)},
  {l:'Cảm ơn lời mời, xin giữ thân phận trung lập',f:c=>{G.tie.rel(n,-4,'từ chối sau khi cân nhắc');return `Sau khi cân nhắc kỹ, ${N(c)} từ chối. ${nm(n)} nhận thư, không nói gì thêm.`+fx(c,{eq:1,tam:1,qh:[n.n,-4]})}}]}},
{id:'v64_vo_doi_don',t:'Lệnh điều đồn',job:['quan_ngu'],k:'Quân ngũ',cd:72,pcd:240,st:1,tags:{},c:c=>{try{return c.job==='quan_ngu'&&!!G._adm.pickSeats(c).length}catch(e){return false}},
 x:(c,d)=>{const L=G._adm.pickSeats(c);const s=L.find(x=>x.vac)||L[0];if(!s){d.key=null;return `Đô ty không có đồn nào để điều ${N(c)} đi.`}d.key=s.key;const nm2=G.seatName(s.key);const cur=G.seatOfC(c);return `Đô ty gửi lệnh điều ${N(c)} ${cur?`từ ${esc(G.seatName(cur))} `:''}sang ${esc(nm2)}. Ở đồn mới nguy hiểm hơn nhưng dễ lập công. Lệnh đã đóng dấu.`},
 o:(c,d)=>{if(!d.key)return gone();const nm2=esc(G.seatName(d.key));return [
  {l:`Nhận lệnh, lên đường sang ${nm2}`,f:c=>{const ok=G._adm.assignPost(c,d.key);return ok?`${N(c)} thu xếp hành lý, sang ${nm2} nhận quân. Công việc ở đồn cũ được bàn giao.`+fx(c,{merit:R(1,4),tam:-2}):'Ghế ở đồn kia vừa có người nhận, lệnh bị hủy.'}},
  {l:'Xin ở lại đồn cũ vì gia đình',r:[{eq:1},40],y:c=>`Đô ty chuẩn cho ở lại, ghi nhớ lý do của ${N(c)}.`+fx(c,{tam:4}),n:c=>{const ok=G._adm.assignPost(c,d.key);return (ok?`Đô ty không chuẩn, lệnh đã xuống. ${N(c)} phải sang ${nm2}.`:'Lệnh bị hủy vì ghế kia đã có người.')+fx(c,{tam:-4})}}]}}
];
});
