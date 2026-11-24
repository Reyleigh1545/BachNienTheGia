/* Bách Niên Thế Gia v6.7.10-d9.12 · HẬU SỰ CỦA NGƯỜI QUEN (tie_*): các sự kiện do sổ người quen (engine-rg.js, tieYear) gọi khi một người thật có vai trò tìm đến nhà.
   Mỗi sự kiện hiện thẻ chân dung người ấy (data.npc), kết quả đổi quan hệ có dòng "Quan hệ với …" (R3), thưởng phạt khác nhau thật giữa các lựa chọn (R4). */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const FM=v=>G.fmtMoney(v);
const T=d=>d&&d.npc?G.tie.get(d.npc):null;
const nm=n=>esc(n?n.n:'người ấy');
const TI=o=>Object.assign({tags:{},k:'Người quen',fixed:1,head:0,ms:1},o);
const gone=()=>[{l:'Thôi',f:()=>''}];
const pay=(l,v,o)=>Object.assign({l:`${l} (${FM(m(v))})`,c:()=>G.money()>=m(v)},o);
const best=n=>n?['tri','vo','mi','eq'].sort((a,b)=>n.st[b]-n.st[a])[0]:'eq';
return [
/* ===== bạn thân tìm đến ===== */
TI({id:'tie_ban_nho',t:'Bạn cũ tìm đến',
 x:(c,d)=>{const n=T(d);return n?`${nm(n)}, ${n.nghe||'bạn cũ'}, ${n.rel>=40?'vẫn thân như xưa':'lâu ngày mới gặp'}, tìm đến nhà ${esc(c.given)}. ${pick(['Dạo này làm ăn khó, ông bạn muốn nhờ một việc.','Ông bạn đi ngang, ghé thăm và có chuyện muốn bàn.','Ông bạn gặp chút khó khăn, ngập ngừng chưa dám mở lời.'])}`:'Có bạn cũ ghé thăm.'},
 o:(c,d)=>{const n=T(d);if(!n)return gone();const v=m(6),v2=m(18);return [
  {l:`Giúp một khoản (${FM(v2)})`,c:()=>G.money()>=v2,f:c=>{const q=G.tie.rel(n,16,'được giúp một khoản lớn');G.tie.on(n,2);if(chance(0.5)){G.tie.later(n,c,'tie_an_nhan_tra',R(30,96),{});return `${nm(n)} nghẹn ngào cảm tạ, hứa sẽ không quên.`+fx(c,{money:-v2,qh:q,tam:4})}return `${nm(n)} nhận khoản giúp, nắm tay thật chặt.`+fx(c,{money:-v2,qh:q,tam:3})}},
  {l:'Cho ở nhờ vài tháng, chia cơm',f:c=>{const q=G.tie.rel(n,10,'được ở nhờ');if(chance(0.25)){G.tie.oan(n,2);return `${nm(n)} ở lâu, ăn tiêu nhiều, cả nhà bắt đầu ngại.`+fx(c,{money:-v,qh:q,tam:-3})}const k=best(n);return `Hai người nói chuyện đêm đêm, ${nm(n)} kể nhiều chuyện đường xa, mình học được không ít.`+fx(c,{[k]:2,qh:q,tam:3})}},
  {l:'Cho vay có hạn, ghi giấy',c:()=>G.money()>=v,f:c=>{if(chance(0.7)){G.tie.later(n,c,'tie_ban_nho',R(18,48),{});return `${nm(n)} viết giấy nhận nợ, hẹn trả đủ. Tình bạn giữ được, tiền cũng giữ được.`+fx(c,{money:-v,qh:G.tie.rel(n,6,'vay có hạn'),tam:1})}G.tie.oan(n,6);return `${nm(n)} nhận tiền nhưng sau đó biệt tăm, giấy nợ thành giấy lộn.`+fx(c,{money:-v,qh:G.tie.rel(n,-12,'quỵt nợ'),tam:-4})}},
  {l:'Từ chối khéo, nói nhà cũng khó',f:c=>{const q=G.tie.rel(n,-14,'bị từ chối lúc khó');if(n.rel<-20)G.tie.oan(n,8);return `${nm(n)} cười gượng ra về, từ đó ít qua lại.`+fx(c,{qh:q,tam:-2})}}]}}),
/* ===== ân nhân trả ơn ===== */
TI({id:'tie_an_nhan_tra',t:'Người nhớ ơn đến tạ',
 x:(c,d)=>{const n=T(d);return n?`${nm(n)} (${n.nghe||'người từng được nhà giúp'}) đến nhà ${esc(c.given)}, mang theo lễ vật. "Ơn xưa tôi không dám quên", ông nói, ${pick(['mắt hoe đỏ','giọng chân thành'])}.`:'Có người đến tạ ơn.'},
 o:(c,d)=>{const n=T(d);if(!n)return gone();const big=m(R(14,30));return [
  {l:'Nhận lễ, giữ tình',f:c=>{const q=G.tie.rel(n,10,'đã tạ ơn');if(!n.vai.includes('ban_than')&&n.rel>=45){n.vai.push('ban_than');n.vaiTxt=n.vai.map(v=>G.tie.VAI[v]||v).join(', ')}return `${nm(n)} ra về nhẹ lòng, hẹn năm sau lại ghé.`+fx(c,{money:big,qh:q,tam:3})}},
  {l:'Từ chối, bảo coi như duyên phận',r:[{eq:1.1,mi:0.3},58],y:c=>{const q=G.tie.rel(n,28,'nhà không lấy gì');if(!n.vai.includes('ban_than')){n.vai.push('ban_than');n.vaiTxt=n.vai.map(v=>G.tie.VAI[v]||v).join(', ')}G.tie.later(n,c,'tie_ban_nho',R(36,108),{});return `${nm(n)} sững người, rồi cúi chào thật sâu. Từ đó coi nhà mình như người ruột thịt.`+fx(c,{qh:q,eq:2,tam:5,cfame:2})},n:c=>`${nm(n)} nhìn như bị coi thường, để lễ lại rồi đi, từ đó ít lui tới.`+fx(c,{qh:G.tie.rel(n,-8,'từ chối lễ tạ'),tam:-3})},
  {l:'Nhờ một việc đáng giá',f:c=>{G.tie.on(n,-1);if(n.tier>=3||n.st.eq>=65){if(!n.vai.includes('quy_nhan')){n.vai.push('quy_nhan');n.vaiTxt=n.vai.map(v=>G.tie.VAI[v]||v).join(', ')}return `${nm(n)} nhận lời ngay: ông có chỗ đứng nên chỉ một lời là xong. Việc ấy mở thêm một cánh cửa.`+fx(c,{bonus:0.06,qh:G.tie.rel(n,6,'nhờ việc'),eq:1})}return `${nm(n)} cố hết sức nhưng thân phận có hạn, chỉ giúp được chút ít.`+fx(c,{money:big,qh:G.tie.rel(n,4,'nhờ việc')})}}]}}),
/* ===== quý nhân ===== */
TI({id:'tie_quy_nhan_giup',t:'Quý nhân ngỏ lời',
 x:(c,d)=>{const n=T(d);if(!n)return 'Có quý nhân nhắn gửi.';d.down=!G.tie.stable(n,2);if(d.down)return `${nm(n)}, ${n.nghe||'người từng hứa giúp nhà'}, đang gặp lúc khó khăn, bị người ta làm khó, không còn thế như trước. Ông cho người nhắn lời xin lỗi ${esc(c.given)}: chưa thể giữ lời hứa giúp nhà lúc này.`;const why=d.why||G.tie.trouble();d.why=why;const lead=why?`Nghe tin nhà ${esc(c.given)} ${why}, ${nm(n)}, ${n.nghe||'người có thế'}, cho người nhắn: ông sẵn lòng giúp một việc, nhà cần gì thì nói.`:`${nm(n)}, ${n.nghe||'người có thế'}, nhân dịp ghé vùng này, ghé thăm ${esc(c.given)} và hỏi nhà có việc gì cần không. ${(n.on||0)>0?'Ông vẫn nhớ ơn cũ của nhà.':'Ông bảo cứ coi như hỏi thăm người quen.'}`;return lead},
 o:(c,d)=>{const n=T(d);if(!n)return gone();if(d.down)return [
  pay('Gửi quà và lời hỏi thăm, xin ông đừng bận lòng chuyện hứa',3,{f:c=>{const q=G.tie.rel(n,22,'hỏi thăm lúc ông gặp khó');G.tie.on(n,3);return `${nm(n)} nghe mà nghẹn lời. Lúc người khác tránh xa, nhà mình vẫn nhớ.`+fx(c,{money:-m(3),eq:2,tam:3,qh:q})}}),
  pay('Giúp ông một khoản qua cơn khó, không đòi lại',10,{f:c=>{const q=G.tie.rel(n,34,'giúp ông lúc bị làm khó');G.tie.on(n,6);n.goal={k:'bao_an',p:30,t:S().t};G.tie.later(n,c,'tie_an_nhan_tra',R(30,96),{});return `${nm(n)} nhận mà tay run. Ông không nói nhiều, chỉ cúi đầu: mối ơn này nối ngược lại, nhà mình thành người cho ông chỗ dựa.`+fx(c,{money:-m(10),eq:2,cfame:2,tam:4,qh:q})}}),
  {l:'Nhắn rằng nhà không có việc gì cần, ông cứ lo thân ông',f:c=>{const q=G.tie.rel(n,10,'không vòi vĩnh khi ông gặp khó');return `${nm(n)} thở ra nhẹ nhõm: ít ra nhà mình không làm ông thêm gánh nặng.`+fx(c,{eq:1,tam:1,qh:q})}},
  {l:'Giữ khoảng cách, tránh bị vạ lây',f:c=>{const q=G.tie.rel(n,-14,'tránh mặt khi ông gặp khó');return `Tin nhà mình lảng đi tới tai ${nm(n)}. Ông chỉ im lặng, nhưng người ngoài nhìn nhà bằng con mắt khác.`+fx(c,{liem:-1,cfame:-2,tam:-2,qh:q})}}];return [
  {l:'Xin tiến cử một người nhà',c:c=>G.kinList(c,p=>G.age(p)>=17&&G.age(p)<=45&&!p.away).length>0,go:(c,d2)=>G.pickKin(c,{eyebrow:'Quý nhân',title:'Tiến cử ai',text:`${n.n} nhận tiến cử một người nhà vào việc có thế. Người ấy sẽ gặp nhiều cơ hội, nhưng ơn này phải trả. Chọn người nào?`,filter:p=>G.age(p)>=17&&G.age(p)<=45&&!p.away,cb:w=>{const q=G.tie.rel(n,-8,'nhận tiến cử (ơn phải trả)');G.tie.later(n,c,'tie_quy_nhan_giup',R(48,120),{});return `${esc(w.given)} được ${nm(n)} tiến cử, gặp được người đáng gặp, học việc nhanh hơn hẳn.`+fx(w,{[best(n)]:3,eq:2,m:3})+fx(c,{qh:q,cfame:2})}})},
  {l:'Xin giấy phép và lối làm ăn',f:c=>{const q=G.tie.rel(n,-6,'xin giấy phép');return `${nm(n)} giúp một lá thư gửi quan sở tại. Việc buôn bán suôn sẻ hơn, thuế lệ nhẹ hơn trong mấy năm.`+fx(c,{bonus:0.1,qh:q,money:m(8)})}},
  {l:'Xin bảo lãnh cho lúc hoạn nạn (giữ lời)',f:c=>{const q=G.tie.rel(n,12,'giữ lời hứa bảo lãnh');c.flags.baoLanh=(S().t||0)+120;return `${nm(n)} gật đầu: sau này nhà gặp rắc rối với quan sở tại thì cứ cầm thiếp của ông đến.`+fx(c,{qh:q,fav:3,tam:3})}},
  {l:'Tạ ơn, không nhờ gì',f:c=>`${nm(n)} cười: "Người biết giữ mình đáng quý". Lòng tin của ông với nhà thêm vững.`+fx(c,{qh:G.tie.rel(n,14,'không nhờ vả'),eq:2,tam:2})}]}}),
/* ===== anh em kết nghĩa ===== */
TI({id:'tie_ket_nghia_giup',t:'Anh em kết nghĩa có việc',
 x:(c,d)=>{const n=T(d);const poor=G.money()<m(40);return n?(poor?`${nm(n)}, người đã kết nghĩa với nhà ${esc(c.given)}, nghe tin nhà đang túng liền sai người mang tiền và gạo sang: "Anh em với nhau, giúp trước là phải".`:`${nm(n)}, người đã kết nghĩa với nhà ${esc(c.given)}, ${pick(['sắp gả con','đang lo mùa gặt','gặp một chuyến làm ăn lớn'])}, nhờ anh em chung sức một lần.`):'Anh em kết nghĩa tìm tới.'},
 o:(c,d)=>{const n=T(d);if(!n)return gone();const poor=G.money()<m(40);if(poor)return [
  {l:'Nhận giúp, ghi nhớ để trả',f:c=>{const v=m(R(12,25));G.tie.on(n,2);return `Nhà vượt qua lúc khó nhờ nghĩa anh em.`+fx(c,{money:v,qh:G.tie.rel(n,10,'giúp lúc nhà túng'),tam:4})}},
  {l:'Từ tạ, nhà tự lo',f:c=>`${nm(n)} hơi buồn nhưng nể tính tự trọng của nhà.`+fx(c,{qh:G.tie.rel(n,3,'tự lo liệu'),eq:1,tam:-1})}];
 const v=m(R(10,20));return [
  {l:`Dốc lòng giúp (${FM(v)})`,c:()=>G.money()>=v,f:c=>{G.tie.on(n,-2);return `${nm(n)} cảm động, việc của ông thành, tình nghĩa càng nặng.`+fx(c,{money:-v,qh:G.tie.rel(n,18,'giúp đúng lúc cần'),cfame:2,tam:4})}},
  {l:'Giúp công, không giúp tiền',f:c=>`${nm(n)} nhận lòng thành, tình nghĩa vẫn giữ.`+fx(c,{qh:G.tie.rel(n,8,'giúp công'),eq:1,tam:2})},
  {l:'Viện cớ bận, không giúp',f:c=>{if(chance(0.4))G.tie.oan(n,5);return `${nm(n)} im lặng. "Nghĩa" mà thành chữ suông thì mỏng lắm.`+fx(c,{qh:G.tie.rel(n,-18,'bỏ mặc anh em'),cfame:-2,tam:-3})}}]}}),
/* ===== thầy đến thăm ===== */
TI({id:'tie_thay_tham',t:'Thầy cũ ghé thăm',
 x:(c,d)=>{const n=T(d);return n?`${nm(n)}, ${n.nghe||'thầy cũ'}, ghé thăm nhà ${esc(c.given)} khi đi ngang vùng, tuổi đã cao nhưng mắt vẫn tinh. Ông muốn nhìn xem lũ trẻ trong nhà học hành thế nào.`:'Thầy cũ ghé thăm.'},
 o:(c,d)=>{const n=T(d);if(!n)return gone();const k=best(n);return [
  {l:'Nhờ thầy chỉ dạy một người nhà',c:c=>G.kinList(c,p=>G.age(p)>=8&&G.age(p)<=30).length>0,go:(c,d2)=>G.pickKin(c,{eyebrow:'Thầy cũ',title:'Cho ai theo thầy học',text:`${n.n} giỏi nhất về ${({tri:'văn chương, trí lược',vo:'võ nghệ',mi:'cầm kỳ thi họa',eq:'đối nhân xử thế'})[k]}. Người được chọn sẽ học theo mấy tháng. Thầy giỏi bao nhiêu, người học nhận bấy nhiêu.`,filter:p=>G.age(p)>=8&&G.age(p)<=30,cb:w=>{const gain=Math.max(2,Math.round((n.st[k]-40)/6));return `${esc(w.given)} theo thầy mấy tháng, nghe thầy từng lời, tiến bộ rõ rệt.`+fx(w,{[k]:gain,tam:3})+fx(c,{qh:G.tie.rel(n,8,'được dạy dỗ')})}})},
  {l:'Mời thầy ở lại dạy cả nhà (tốn tiền)',c:()=>G.money()>=m(10),f:c=>{const gain=Math.max(1,Math.round((n.st[k]-40)/12));G.S().people.filter(p=>G.inClan(p)&&G.age(p)<25&&!p.away).forEach(p=>G.addStat(p,k,gain));return `Cả nhà trẻ tuổi được thầy chỉ dạy, ai cũng thấy lòng sáng ra.`+fx(c,{money:-m(10),qh:G.tie.rel(n,12,'ở lại dạy cả nhà'),cfame:2})}},
  {l:'Tiễn thầy, biếu chút lễ',f:c=>`Thầy cười hiền, nhận lễ mỏng, dặn dò vài câu rồi đi.`+fx(c,{money:-m(2),qh:G.tie.rel(n,4,'thăm hỏi thầy'),eq:1})}]}}),
/* ===== đối thủ gây khó ===== */
TI({id:'tie_doi_thu_hai',t:'Kẻ có hiềm khích ra tay',
 x:(c,d)=>{const n=T(d);return n?`${nm(n)}, ${n.nghe||'người có hiềm khích với nhà'}, lại nhắm tới ${esc(c.given)}: ${pick(['tung tin xấu khắp vùng','chặn mối làm ăn','đến quan huyện nói điều không hay','lôi kéo người làm của nhà'])}.`:'Có kẻ gây khó.'},
 o:(c,d)=>{const n=T(d);if(!n)return gone();const v=m(10);return [
  {l:'Đối đáp phân minh, tìm người làm chứng',r:[{khau:0.7,eq:0.5,tri:0.3},50],y:c=>{G.tie.oan(n,-4);return `Nhờ lời lẽ chắc chắn, ${nm(n)} phải lùi, mang tiếng ngược lại.`+fx(c,{qh:G.tie.rel(n,8,'bị phản bác công khai'),eq:2,khau:0,cfame:2})},n:c=>`Lý lẽ không đủ, tiếng xấu cứ thế lan.`+fx(c,{qh:G.tie.rel(n,-6,'gây thêm mâu thuẫn'),cfame:-3,tam:-4})},
  {l:`Nhờ người có thế can thiệp (${FM(v)})`,c:()=>G.money()>=v,f:c=>{const q=G.tie.act('quy_nhan').filter(x=>x.rel>=30).length>0;if(q){G.tie.oan(n,-8);return `Người có thế gửi một lời, ${nm(n)} im ngay.`+fx(c,{money:-v,qh:G.tie.rel(n,-4,'bị can thiệp'),tam:3})}return `Nhờ vả tốn kém mà không ai đủ sức răn đe ${nm(n)}.`+fx(c,{money:-v,tam:-2})}},
  {l:'Nhịn, để thời gian trả lời',f:c=>{G.tie.oan(n,3);return `Việc cứ kéo dài, nhà thiệt chút ít nhưng giữ được hòa khí bề ngoài.`+fx(c,{money:-Math.round(v/2),tam:-2,eq:1})}},
  {l:'Trả đũa cho bõ tức',r:[{vo:0.5,muu:0.7},42],y:c=>{G.tie.oan(n,-10);return `${nm(n)} bị đánh trả đúng chỗ đau, tạm thôi gây sự.`+fx(c,{qh:G.tie.rel(n,-12,'bị trả đũa'),fame:2,tam:3})},n:c=>{G.tie.oan(n,12);return `Trả đũa bị lộ, thù hằn thêm sâu và nhà mang tiếng hiếu chiến.`+fx(c,{qh:G.tie.rel(n,-20,'trả đũa bại lộ'),fame:-4,tam:-5})}}]}}),
/* ===== cao nhân quay lại ===== */
TI({id:'tie_cao_nhan_ve',t:'Cao nhân quay lại',
 x:(c,d)=>{const n=T(d);return n?`${nm(n)}, ${n.nghe||'cao nhân năm xưa'}, bỗng xuất hiện trước cửa nhà ${esc(c.given)}, râu tóc bạc hơn nhưng ánh mắt vẫn sáng. Ông nói mình không còn nhiều thời gian và muốn để lại một điều cho người đáng để lại.`:'Cao nhân quay lại.'},
 o:(c,d)=>{const n=T(d);if(!n)return gone();const k=best(n);return [
  {l:'Xin ông truyền lại',r:[{[k==='vo'?'vo':'tri']:0.7,eq:0.4},52],y:c=>{const bk=k==='vo'&&!(c.flags.bk&&c.flags.bk.kiem);if(bk){c.flags.bk=Object.assign(c.flags.bk||{},{kiem:1})}return `Ông ở lại ba ngày, truyền hết điều tâm đắc.${bk?' Trong đó có một đường kiếm thật.':''}`+fx(c,{[k]:6,eq:2,tam:5,qh:G.tie.rel(n,10,'được truyền lại')})},n:c=>`Ông truyền nhưng mình chưa đủ căn cơ để thấm, chỉ nhớ được vài điều.`+fx(c,{[k]:2,tam:-1})},
  {l:'Mời ông ở lại dưỡng già, chăm sóc chu đáo',c:()=>G.money()>=m(10),f:c=>{G.tie.on(n,3);return `Ông ở lại mấy tháng, nhận chén cơm, rồi một sáng ra đi, để lại cuốn sổ ghi chép cả đời.`+fx(c,{money:-m(10),[k]:4,tri:2,qh:G.tie.rel(n,24,'chăm sóc lúc tuổi già'),cfame:3})}},
  {l:'Chào hỏi rồi tiễn đi',f:c=>`Ông gật đầu, đi tiếp. Cơ duyên này không quay lại nữa.`+fx(c,{tam:-2})}]}}),
/* ===== láng giềng ===== */
TI({id:'tie_lang_gieng',t:'Láng giềng nhờ vả',
 x:(c,d)=>{const n=T(d);return n?`${nm(n)}, láng giềng của nhà ${esc(c.given)}, sang ${pick(['mượn dụng cụ','xin giúp một tay sửa nhà','nhờ trông con vài hôm','xin vay ít thóc'])}.`:'Láng giềng nhờ vả.'},
 o:(c,d)=>{const n=T(d);if(!n)return gone();return [
  {l:'Giúp ngay, không so đo',f:c=>{G.tie.on(n,1);return `${nm(n)} cảm kích. Tình làng nghĩa xóm thêm chặt.`+fx(c,{money:-m(1),qh:G.tie.rel(n,10,'giúp láng giềng'),cfame:1,tam:2})}},
  {l:'Giúp nhưng ghi nhớ để đòi lại việc',f:c=>`${nm(n)} nhận giúp, biết ý nên hứa đền lại sau.`+fx(c,{qh:G.tie.rel(n,5,'giúp có điều kiện')})},
  {l:'Từ chối, nhà cũng bận',f:c=>`${nm(n)} lặng lẽ đi. Sau này gặp nhau chỉ gật đầu cho phải phép.`+fx(c,{qh:G.tie.rel(n,-10,'từ chối láng giềng'),tam:-1})}]}})
];
});
