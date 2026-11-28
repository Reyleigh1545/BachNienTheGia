/* Bách Niên Thế Gia · 7.0.0-d.1.5.65 · CẢNH DOANH TRẠI (đời lính có người quanh mình, có chỗ nghỉ và chỗ vui). Người trong cảnh là đồng đội, thượng quan thật (G.dt). */
(function(){
window.EVF=window.EVF||[];
window.EVF.push(G=>{
const {fx,esc,R}=G;const S=()=>G.S();const m=v=>G.mm(v);const FM=v=>G.fmtMoney(v);const N=c=>esc(c.given);
const DT=()=>G.dt;
const ai=(c,d,loai)=>{if(!DT())return null;let n=d.npc&&G.tie.get(d.npc);if(!n||n.ok===0){const L=loai==='tq'?[DT().thuongQuan(c)]:DT().dongDoi(c);const z=L.filter(Boolean);n=z.length?z[Math.floor(Math.random()*z.length)]:null;if(n)d.npc=n.id}return n};
const rel=(n,v,c)=>{if(n&&G.tie)G.tie.rel(n,v,c)};
const tran=(c,v,mo)=>{c.flags.tranGan={v,den:S().t+(mo||8)}};
const B={k:'Quân ngũ',job:['quan_ngu'],fixed:1,c:c=>!!(G.dt&&G.dt.linh(c))};
const E=(id,t,x,o)=>Object.assign({id,t,x,o},B);
const nho=c=>({l:'Thôi',f:()=>''});
return [
E('dt_ruou','Bữa rượu sau canh gác',(c,d)=>{const n=ai(c,d);return n?`Đổi gác xong, ${esc(n.n)} xách về một vò rượu nhạt, rủ cả đội ngồi quanh bếp lửa trong ${esc(G.dt.choO(c))}. Chuyện quê, chuyện trận, chuyện người đã khuất.`:'Đêm doanh trại lặng.'},
 (c,d)=>{const n=ai(c,d);if(!n)return [nho()];const v=m(3);return [
  {l:`Góp tiền mua thêm rượu thịt (${FM(v)})`,c:()=>G.money()>=v,f:cc=>{S().money-=v;rel(n,10,cc);G.dt.dongDoi(cc).forEach(z=>z!==n&&rel(z,5,cc));return 'Bữa rượu kéo tới khuya. Từ hôm ấy cả đội coi nhau như anh em.'+fx(cc,{tam:12,eq:1})}},
  {l:'Ngồi cùng, nghe nhiều nói ít',f:cc=>{rel(n,5,cc);return 'Nghe người ta kể cũng thấy lòng nhẹ đi.'+fx(cc,{tam:7})}},
  {l:'Ra bãi tập một mình',ax:{cc:1},f:cc=>{rel(n,-3,cc);return 'Trăng sáng, đường quyền đi trơn hơn mọi khi.'+fx(cc,{vo:2,tam:-2})}}]}),
E('dt_dong_doi_xin','Đồng đội gặp khó',(c,d)=>{const n=ai(c,d);return n?`${esc(n.n)} nhận thư, ngồi thừ cả buổi. Mẹ ở quê ốm nặng, lương mấy tháng đã gửi hết mà vẫn thiếu thuốc.`:'Doanh trại yên.'},
 (c,d)=>{const n=ai(c,d);if(!n)return [nho()];const v=m(8);return [
  {l:`Dốc túi giúp (${FM(v)})`,c:()=>G.money()>=v,f:cc=>{S().money-=v;rel(n,22,cc);G.tie.on&&G.tie.on(n,2,cc);return `${esc(n.n)} không nói gì, chỉ nắm tay thật lâu.`+fx(cc,{tam:5,fame:3,ax:{rong:2}})}},
  {l:'Đứng ra xin cấp trên ứng lương cho bạn',r:[{eq:1,fame:0.3},48],y:cc=>{rel(n,15,cc);const tq=G.dt.thuongQuan(cc);rel(tq,3,cc);return 'Thượng quan chuẩn cho ứng hai tháng lương.'+fx(cc,{eq:1,tam:4})},n:cc=>{rel(n,4,cc);const tq=G.dt.thuongQuan(cc);rel(tq,-5,cc);return 'Thượng quan gạt đi: quân có phép của quân.'+fx(cc,{tam:-4})}},
  {l:'Lời an ủi là đủ',f:cc=>{rel(n,-4,cc);return `${esc(n.n)} gật đầu, quay đi.`+fx(cc,{tam:-2})}}]}),
E('dt_tuong_goi','Thượng quan gọi riêng',(c,d)=>{const n=ai(c,d,'tq');return n?`${esc(n.n)} cho gọi ${N(c)} vào trướng, hỏi chuyện luyện quân và ý mình về việc phòng giữ đoạn ải này.`:'Trong trướng vắng.'},
 (c,d)=>{const n=ai(c,d,'tq');if(!n)return [nho()];return [
  {l:'Nói thẳng chỗ hở trong cách phòng giữ',r:[{tri:1,vo:0.4},55],y:cc=>{rel(n,14,cc);return 'Ông nghe hết, sai người đổi lại phiên gác đúng như lời.'+fx(cc,{merit:R(6,12),tri:1,tam:5})},n:cc=>{rel(n,-12,cc);return 'Ông sa mặt: lính trẻ mà dám dạy tướng.'+fx(cc,{tam:-6})}},
  {l:'Lựa lời khen cách bày trận',ax:{tt:-1},f:cc=>{rel(n,8,cc);return 'Ông vui, giữ lại uống chén trà.'+fx(cc,{tam:2})}},
  {l:'Thưa rằng mình chỉ biết vâng lệnh',f:cc=>{rel(n,1,cc);return 'Ông phẩy tay cho lui.'+fx(cc,{})}}]}),
E('dt_thu_nha','Phiên thư đến doanh trại',(c,d)=>{const n=ai(c,d);return G.dt.coThu(c)?`Ngựa trạm tới. Có thư nhà gửi ${N(c)}, giấy đã nhàu vì đường xa.`:`Ngựa trạm tới, cả doanh xúm vào chia thư. ${N(c)} không có ai gửi. ${n?esc(n.n)+' cũng ngồi một góc, tay không.':''}`},
 (c,d)=>{const n=ai(c,d);if(G.dt.coThu(c))return [
  {l:'Ngồi viết thư hồi âm thật dài',f:cc=>'Viết xong thì đèn cũng cạn dầu, lòng nhẹ hẳn.'+fx(cc,{tam:10})},
  {l:'Đọc xong cất kỹ vào ngực áo',f:cc=>'Lá thư được đọc đi đọc lại nhiều đêm.'+fx(cc,{tam:6})}];
  return [{l:'Rủ người cùng cảnh đi ăn bát mì ngoài đồn',c:()=>!!n&&G.money()>=m(1),f:cc=>{S().money-=m(1);rel(n,12,cc);return 'Hai kẻ không nhà ngồi tới lúc quán dọn hàng.'+fx(cc,{tam:8})}},
  {l:'Đem binh thư ra đọc cho qua buổi',f:cc=>'Chữ nghĩa lấp được chỗ trống một lúc.'+fx(cc,{tri:2,tam:-1})},
  {l:'Nằm quay mặt vào vách',f:cc=>'Đêm ấy dài hơn mọi đêm.'+fx(cc,{tam:-5})}]}),
E('dt_nghi_ngoi','Mấy ngày được nghỉ',c=>`Phiên đổi quân tới, đội của ${N(c)} được nghỉ năm ngày. Ngoài đồn có phiên chợ, sau đồn có suối, trong doanh có bãi tập vắng người.`,
 (c,d)=>{const n=ai(c,d);const v=m(2);return [
  {l:'Ngủ cho đã, tắm suối, ăn cho lại sức',f:cc=>'Năm ngày sau người nhẹ hẳn.'+fx(cc,{suc:12,tam:8})},
  {l:`Kéo cả đội ra chợ ngoài đồn (${FM(v)})`,c:()=>G.money()>=v,f:cc=>{S().money-=v;G.dt.dongDoi(cc).forEach(z=>rel(z,6,cc));return 'Xem hát, ăn hàng, cười nói cả buổi.'+fx(cc,{tam:12,suc:3})}},
  {l:'Tranh thủ luyện võ khi bãi trống',ax:{cc:2},f:cc=>'Mồ hôi đổ thật nhiều, tay chân dẻo hơn.'+fx(cc,{vo:3,suc:-2,tam:-3})}]}),
E('dt_duong_thuong','Vết thương chưa lành',c=>`Quân y bắt mạch cho ${N(c)} rồi lắc đầu: sức đã kiệt, vết cũ chưa liền. Ra trận nữa lúc này khác nào đem mạng đánh cược.`,
 c=>{const v=m(8);return [
  {l:'Xin lui về hậu quân dưỡng thương',f:cc=>{cc.flags.nghiTran=S().t+6;return 'Sáu tháng không phải ra trận. Công trạng chậm lại, giữ được mạng.'+fx(cc,{suc:22,tam:4,merit:-3})}},
  {l:`Mời danh y trong vùng vào doanh (${FM(v)})`,c:()=>G.money()>=v,f:cc=>{S().money-=v;cc.flags.nghiTran=S().t+3;return 'Thuốc tốt, ba tháng là đi lại như thường.'+fx(cc,{suc:35,tam:4})}},
  {l:'Cắn răng bám đội',ax:{gan:2},f:cc=>'Đồng đội nhìn mà nể, còn thân thể thì kêu từng đêm.'+fx(cc,{suc:6,merit:R(3,6),fame:2,tam:-5})}]})];
});
})();
