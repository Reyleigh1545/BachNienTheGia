/* Bách Niên Thế Gia v6.7.10-d9.12 · VIẾT LẠI SỰ KIỆN ĐỜI THƯỜNG THEO ĐÁNH GIÁ (R4 lựa chọn khác nhau thật, R6 kỳ ngộ xứng, R17 hộp đủ thông tin, R7 chỉ số hơn danh vọng).
   Mỗi sự kiện: lời kể nói rõ việc gì; các lựa chọn khác nhau về chỉ số quyết định thành bại, giá, kết quả; không còn lựa chọn "chỉ để tránh thiệt". Bản cũ cùng id đã xóa bằng tools/rmev.js. */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const FM=v=>G.fmtMoney(v);const N=c=>esc(c.given);
const pay=(l,v,o)=>Object.assign({l:`${l} (${FM(m(v))})`,c:()=>G.money()>=m(v)},o);
const E=o=>Object.assign({tags:{}},o);
const TRADE=['tieunhi','tieuphu','hangrong','tieu','chu'];
const gone=()=>[{l:'Thôi',f:()=>''}];
return [
/* ============ Một niềm say mê mới: năm loại, mỗi loại một đường ============ */
E({id:'v6_say_me',t:'Một niềm say mê mới',age:[10,70],w:0.8,
 x:(c,d)=>{const L=[['doc_su','đọc sử sách','một bộ sử cũ ở nhà người quen'],['khac_go','chạm khắc gỗ','mấy khúc gỗ mít và bộ đục của ông thợ già'],['co_tuong','đánh cờ tướng','bàn cờ ở quán nước đầu xóm'],['cay_canh','nuôi cây cảnh','vài chậu mai và một gốc tùng nhỏ'],['luyen_chu','luyện chữ','tờ giấy hoa tiên và bộ bút cũ']];const k=pick(L);d.k=k[0];d.n=k[1];return `${N(c)} bỗng mê ${k[1]}, ngày đêm không rời ${k[2]}.`},
 o:(c,d)=>{const k=d.k||'doc_su';const A={
  doc_su:{l:'Dốc sức đọc cho hết bộ sử',v:4,spec:{tri:0.8,eq:0.2},y:c=>'Đọc xong, hiểu thêm nhiều chuyện hưng suy. Đầu óc sáng ra.'+fx(c,{tri:5,sk:{muu:3},tam:3}),n:c=>'Đọc dở dang, nhớ được ít.'+fx(c,{tri:2,tam:-1}),f:'Mua thêm sách và nến, thức khuya.'},
  khac_go:{l:'Theo ông thợ già học khắc cho ra nghề',v:3,spec:{mi:0.6,suc:0.3},y:c=>'Tay khéo dần. Một pho tượng nhỏ khắc xong, bán được giá.'+fx(c,{sk:{ky:5},m:2,money:m(3),tam:3}),n:c=>'Hỏng mấy khúc gỗ, ngón tay đau mấy hôm.'+fx(c,{sk:{ky:2},suc:-2})},
  co_tuong:{l:'Ngày nào cũng tìm cao thủ trong xóm đấu cờ',v:1,spec:{tri:0.6,eq:0.4},y:c=>'Đánh hơn trăm ván, lối đi nước dần sâu. Cả quán nể.'+fx(c,{sk:{muu:6},tri:2,tam:3}),n:c=>'Thua liên tiếp, tức nhưng học được mấy thế hiểm.'+fx(c,{sk:{muu:2},tam:-3})},
  cay_canh:{l:'Chăm chút từng chậu, học cách uốn tỉa',v:3,spec:{eq:0.5,cc:0.5},y:c=>'Chậu mai nở đúng Tết, người trong xóm đến xem. Tâm trí thanh thản.'+fx(c,{money:m(2),tam:7,suc:2}),n:c=>'Rễ úng, mất hai chậu quý.'+fx(c,{money:-m(1),tam:-2})},
  luyen_chu:{l:'Tập mỗi sáng, chép cả bộ mẫu',v:2,spec:{tri:0.5,mi:0.4},y:c=>'Nét chữ thành thế, ông đồ làng khen. Lời nói cũng có trật tự hơn.'+fx(c,{tri:3,sk:{khau:3},fame:2,tam:3}),n:c=>'Nét chữ vẫn xiêu vẹo, nhưng đã bớt nản.'+fx(c,{tri:1,sk:{khau:1}})}}[k];
  return [
  pay(A.l,A.v,{r:[A.spec,52],y:c=>{c.flags.say=k;return A.y(c)},n:c=>A.n(c)}),
  {l:'Chơi cho vui thôi',f:c=>'Một thú vui nho nhỏ, thư thả.'+fx(c,{tam:3,eq:1})},
  {l:'Bỏ, dành thời gian cho việc kiếm sống',f:c=>'Quay lại việc thường ngày, thu nhập bớt hao hụt.'+fx(c,{money:m(1)})}]}}),
/* ============ Lời thách thức: bốn loại thách, bốn chỉ số ============ */
E({id:'v6_thach_tai',t:'Lời thách thức',age:[15,60],w:0.8,
 x:(c,d)=>{const L=[['dau_vat','đấu vật ở hội làng','vo'],['cay_nhanh','thi xem ai cày nhanh hơn','suc'],['doi_cau','đối câu đối trước đình','tri'],['ganh_nang','thi gánh nặng quanh sân đình','suc']];const k=pick(L);d.k=k[0];d.s=k[2];d.bet=m(6);const n=G.tie.ensure(c,{vai:['quen'],nghe:'kẻ tự cao trong làng',age:R(22,40),main:k[2]==='tri'?'tri':'vo',rel:-5,why:'thách '+k[1]});d.npc=n.id;
  return `${esc(n.n)}, ${n.nghe}, công khai thách ${N(c)} ${k[1]}. Hai bên cùng góp ${FM(d.bet)} làm giải, ai thua phải khao cả xóm.`},
 o:(c,d)=>{const n=G.tie.get(d.npc);if(!n)return gone();const sp={dau_vat:{vo:0.6,suc:0.4},cay_nhanh:{suc:0.7,cc:0.3},doi_cau:{tri:0.6,khau:0.4},ganh_nang:{suc:0.8,vo:0.2}}[d.k];const st={dau_vat:{vo:3},cay_nhanh:{suc:1},doi_cau:{tri:3,sk:{khau:3}},ganh_nang:{suc:1}}[d.k];
  return [
  {l:'Nhận lời, quyết thắng',c:()=>G.money()>=d.bet,r:[sp,55],y:c=>{G.tie.rel(n,-3,'thua cuộc');return `Thắng giòn giã. Cả xóm reo hò, ${esc(n.n)} phải khao.`+fx(c,Object.assign({money:d.bet,fame:3,tam:7},st))+fx(c,{qh:[n.n,-3]})},n:c=>{G.tie.rel(n,5,'thắng cuộc');return `Thua, phải khao một bữa, mặt đỏ tía tai. Nhưng học được một bài.`+fx(c,{money:-d.bet,tam:-5,eq:1})}},
  {l:'Cười trừ, không chấp',f:c=>`${esc(n.n)} đắc ý một thời gian, rồi cũng quên.`+fx(c,{eq:2,qh:[n.n,G.tie.rel(n,-2,'bị từ chối thách')[1]],tam:-1})},
  {l:'Bày mưu cho hắn tự thua',r:[{muu:0.8,eq:0.3},55],y:c=>{G.tie.rel(n,-6,'bị chơi khăm');return `Hắn mắc mưu, tự làm trò cười.`+fx(c,{money:Math.round(d.bet/2),fame:2,tam:5,sk:{muu:2}})},n:c=>{G.tie.oan(n,5);return `Mưu bị lộ, mang tiếng chơi xấu, ${esc(n.n)} ghi hận.`+fx(c,{fame:-3,tam:-4,qh:[n.n,G.tie.rel(n,-10,'bị mưu lộ')[1]]})}}]}}),
/* ============ Lời mời việc vặt: bốn loại ============ */
E({id:'gioi_thieu_viec',t:'Lời mời việc vặt',age:[16,70],
 x:(c,d)=>{const L=[['viet_don','viết hộ lá đơn','khau','tri'],['kho','trông coi kho hàng mấy hôm','eq','cc'],['dan_duong','dẫn đường cho đoàn khách','vo','suc'],['chung','làm chứng một văn tự','tri','eq']];const k=pick(L);d.k=k[0];d.a=k[2];d.b=k[3];const n=G.tie.ensure(c,{vai:['quen'],nghe:'người quen nhờ việc',age:R(30,55),rel:5,why:k[1]});d.npc=n.id;return `${esc(n.n)}, ${n.nghe}, nhờ ${N(c)} ${k[1]}, có trả công.`},
 o:(c,d)=>{const n=G.tie.get(d.npc);if(!n)return gone();return [
  {l:'Nhận lời, làm cho đàng hoàng',r:[{[d.a]:0.6,[d.b]:0.5},48],y:c=>{if(chance(0.45)){const x=n;if(!x.vai.includes('an_nhan'))x.vai.push('an_nhan');x.vaiTxt=x.vai.map(v=>G.tie.VAI[v]||v).join(', ');G.tie.later(x,c,'tie_an_nhan_tra',R(30,120),{})}return 'Xong việc, được trả công, người nhờ rất hài lòng và nhắn sẽ nhớ.'+fx(c,{money:m(6),qh:[n.n,G.tie.rel(n,14,'làm việc tốt')[1]],eq:1,fame:2})},n:c=>'Làm hỏng việc, mất lòng người quen, tiếng cũng bị ảnh hưởng.'+fx(c,{tam:-3,qh:[n.n,G.tie.rel(n,-10,'làm hỏng việc')[1]],fame:-2})},
  {l:'Nhận nhưng chỉ làm qua loa',f:c=>`Xong cho có, tiền công bớt, ${esc(n.n)} cũng không hài lòng lắm.`+fx(c,{money:m(3),qh:[n.n,G.tie.rel(n,-3,'làm qua loa')[1]]})},
  {l:'Từ chối, giới thiệu người khác',f:c=>`${esc(n.n)} hơi tiếc nhưng vẫn cảm ơn.`+fx(c,{qh:[n.n,G.tie.rel(n,2,'giới thiệu người')[1]]})}]}}),
/* ============ Bản sách quý: tên sách quyết định chỉ số ============ */
E({id:'sach_hiem',t:'Bản sách quý',age:[12,90],c:c=>!(c.habits||[]).includes('dacsu')&&c.tri>=50,
 x:(c,d)=>{const L=[['binh thư chép tay','tri',{muu:4}],['sử ký bản khắc gỗ','tri',{muu:2,khau:2}],['dược điển thất truyền','tri',{ky:3}],['thi tập của danh sĩ tiền triều','mi',{khau:4}]];const k=pick(L);d.b=k[0];d.s=k[1];d.sk=k[2];return `Nhà sách cũ có bộ ${k[0]}, giá đắt. Đọc xong sẽ thấm ${({tri:'trí lực',mi:'phong thái và lời ăn tiếng nói'})[k[1]]}.`},
 o:(c,d)=>[
  pay('Mua bằng được, đọc cho hết',25,{r:[{tri:0.8,eq:0.2},62],y:c=>{c.flags.sach=(c.flags.sach||[]).concat(d.b).slice(-6);return `Đọc ròng rã mấy tháng, thấm được ${d.b}. Từ đó ham sưu tập sách hiếm.`+fx(c,{money:-m(25),[d.s]:6,sk:d.sk,habit:'dacsu',tam:5})},n:c=>`Sách khó, đọc dở dang, vẫn học được chút ít. Từ đó ham sưu tập sách hiếm.`+fx(c,{money:-m(25),[d.s]:2,habit:'dacsu',tam:2})}),
  {l:'Ngồi đọc ké mấy buổi ở hiệu',r:[{tri:0.8},48],y:c=>`Chủ hiệu cho đọc cả bộ, ông còn chỉ thêm mấy điểm hay.`+fx(c,{[d.s]:3,sk:d.sk,tam:3}),n:c=>'Bị đuổi ra, chỉ đọc được mấy trang.'+fx(c,{[d.s]:1,tam:-2})},
  {l:'Chép lại phần hay, trả sách',f:c=>`Chép tay mất nhiều công, nhưng có bản riêng để đọc.`+fx(c,{[d.s]:2,tam:1})}]}),
/* ============ Đường núi bị chặn (gộp lo_02 và lo_03) ============ */
E({id:'lo_02',t:'Đường núi bị chặn',job:TRADE,age:[20,60],w:0.6,
 x:(c,d)=>{const L=['con đường núi','ngã ba trên đường chợ','bến sông'];d.p=pick(L);return `Một toán cầm giáo dựng rào chặn ${d.p} ${N(c)} thường qua. Họ không cướp, chỉ thu "tiền mãi lộ". Mỗi chuyến hàng đi qua đều thấy họ đứng đó.`},
 o:(c,d)=>[
  {l:'Rút gậy đánh phá rào',r:[{vo:0.7,suc:0.3,muu:0.2},44],y:c=>{const w=G.S().wr&&G.S().wr.tl;if(w&&w.length){const t=w.slice().sort((a,b)=>b.pow-a.pow)[0];t.pow=Math.max(0,t.pow-3)}return `Phá được rào, toán chặn đường tản đi. Thu được ít vật dụng và con đường thông thoáng cho cả vùng.`+fx(c,{money:m(R(8,16)),vo:2,fame:3,tam:4,cfame:1})},n:c=>`Chúng đông hơn mình nghĩ. Bị đánh trả, mất hàng, phải nộp đủ mới được đi.`+fx(c,{money:-m(8),suc:-R(8,16),tam:-5})},
  {l:'Nói chuyện phải trái, xin thẻ qua lại',r:[{khau:0.7,eq:0.5},50],y:c=>{c.flags.maiLo=G.S().t;return `Chúng nể miệng lưỡi, cấp một thẻ qua lại, nộp theo mức nhỏ và hứa không làm khó.`+fx(c,{money:-m(3),eq:2,sk:{khau:1},tam:1})},n:c=>`Chúng ra giá cao hơn và đòi nộp cả chuyến trước.`+fx(c,{money:-m(10),tam:-2})},
  pay('Nộp tiền mãi lộ, đi tiếp',5,{f:c=>{G.S().maiLoT=G.S().t;return 'Chúng nhận, không làm khó. Nghe nói từ nay phải nộp mỗi chuyến.'+fx(c,{money:-m(5)})}}),
  {l:'Đi đường khác dài hơn',f:c=>`Mất thêm hai ngày nhưng khỏi nộp, hàng chậm và giá có hơi giảm.`+fx(c,{money:-m(4),suc:-1})}]}),
/* ============ Giá muối lên: muối là hàng quan doanh ============ */
E({id:'tg_20',t:'Giá muối lên',job:TRADE,age:[20,65],th:1,w:0.5,
 x:c=>`Giá muối ở chợ huyện lên gấp rưỡi chỉ trong mười hôm. Muối là hàng quan doanh, buôn bán phải có "muối dẫn" của quan; nhưng giá cao thì lái buôn đều thấy lời.`,
 o:c=>[
  pay('Mua muối dẫn đúng phép, bán lại',20,{f:c=>`Có giấy phép, bán đúng phép, lãi vừa phải và yên tâm.`+fx(c,{money:m(R(6,12)),eq:1})}),
  {l:'Mua muối lậu của dân ven biển rồi đem bán',c:()=>G.money()>=m(12),r:[{muu:0.7,khau:0.4},58],y:c=>`Qua trót lọt, lãi gấp ba.`+fx(c,{money:m(R(30,45)),sk:{muu:1},tam:3}),n:c=>{G.S().fame-=2;return 'Bị quan tuần xét giữa đường. Hàng bị tịch thu, nộp phạt, mang tiếng buôn lậu.'+fx(c,{money:-m(18),fame:-4,tam:-6,liem:-3,risk:3})}},
  {l:'Không dính vào, giữ tiếng làm ăn chính đáng',f:c=>'Tiếng làm ăn ngay thẳng được người trong chợ nhớ.'+fx(c,{liem:2,eq:1,tam:1})},
  {l:'Tố cáo toán buôn muối lậu với quan tuần',f:c=>`Quan ghi công, thưởng một khoản, nhưng bọn lái muối lậu để mắt tới nhà.`+fx(c,{money:m(6),fame:3,liem:2,tam:-1})}]}),
/* ============ Hổ dữ: kỳ tích như Võ Tòng ============ */
E({id:'tp_ho_du',t:'Hổ dữ',job:['tieuphu'],w:1.2,
 x:'Trong rừng sâu, một con hổ vằn chắn ngang lối, gầm lên. Dân vùng này đồn chưa ai đánh nổi hổ vằn mà sống.',
 o:[
  {l:'Liều đánh bằng gậy và tay không',r:[{vo:1,suc:0.5},78],y:c=>{c.flags.danhHo=G.S().t;return 'Một trận sống chết: hạ được hổ! Quan huyện nghe tin thưởng tiền, da hổ bán được giá lớn. Tên tuổi vang khắp vùng như Võ Tòng đả hổ.'+fx(c,{vo:15,suc:3,money:m(R(30,60)),fame:R(14,22),tam:10,cfame:2})},n:c=>'Hổ quá mạnh. Bị vồ nát vai, thập tử nhất sinh.'+fx(c,{suc:-R(30,45),hpMax:-R(3,6),tam:-8,lethal:1})},
  {l:'Leo lên cây trốn, đợi hổ bỏ đi',r:[{suc:0.6,tri:0.4},60],y:c=>'Hổ lượn dưới gốc cả buổi rồi bỏ đi. Thoát nạn, nhưng người làng biết chuyện thì cười.'+fx(c,{suc:-2,tam:-2,fame:-1,sk:{ky:1}}),n:c=>'Trượt chân ngã gãy tay, hổ lảng vảng cả đêm.'+fx(c,{suc:-15,tam:-4})},
  {l:'Đốt lửa dọa, rồi về báo làng lập bẫy',r:[{tri:0.8,muu:0.3},55],y:c=>'Hổ sợ lửa lui đi. Mang tin về, cả làng chung sức đào hầm bẫy, hạ được hổ vài tuần sau. Công đầu thuộc người đốt lửa.'+fx(c,{money:m(R(8,14)),fame:5,tri:2,tam:5,sk:{muu:1}}),n:c=>'Lửa lụi, hổ vượt qua, mình bị bỏng và mất hết củi.'+fx(c,{suc:-12,money:-m(1),tam:-3})},
  {l:'Về báo làng cùng nhau săn',f:c=>'Cả làng tụ hợp, hạ được hổ sau ba ngày. Mỗi người một phần, nhưng người báo tin được kính nể.'+fx(c,{money:m(R(4,8)),fame:4,eq:2,vo:2,tam:4})}]}),
/* ============ So bì với hàng xóm: không còn "tật xấu chắc chắn" ============ */
E({id:'xa_hoa_khoe',t:'So bì với nhà hàng xóm',age:[20,80],tier:[3,6],pcd:240,c:c=>!(c.habits||[]).includes('xahoa'),
 x:c=>`Nhà ${pick(['họ Tô','họ Mạc','họ Thẩm','họ Lục'])} bên cạnh vừa sắm kiệu sơn son, hầu hạ đông đúc. Người ta bắt đầu so sánh.`,
 o:c=>[
  pay('Sắm hơn, không để thua',40,{f:c=>{const v=(c.flags.xaCnt=(c.flags.xaCnt||0)+1);const hab=v>=3&&chance(0.3);return `Thiên hạ trầm trồ, nhà mình thành tâm điểm.${hab?' Từ đó quen tiêu xài phung phí.':''}`+fx(c,{money:-m(40),cfame:3,eq:1,tam:5,habit:hab?'xahoa':undefined})}}),
  {l:'Mặc kệ người ta',r:[{eq:1},50],y:c=>'Sống theo cách của mình. Người trong làng thấy nhà vững vàng, không phô trương.'+fx(c,{eq:2,tam:2,money:m(1)}),n:c=>'Trong lòng vẫn ấm ức, nhà bị coi là nhún nhường quá.'+fx(c,{tam:-5,cfame:-1})},
  pay('Cùng làm việc thiện, thi tấm lòng',15,{f:c=>`Cả hai nhà đua nhau xây cầu nhỏ, phát gạo. Nhà mình được kính trọng hơn là được sợ.`+fx(c,{money:-m(15),cfame:2,eq:1,on:1,tam:4})})]}),
/* ============ Tết: việc của cả nhà ============ */
E({id:'tet_nguyen_dan',t:'Tết đến xuân về',sea:['xuan'],age:[6,90],cd:11,pcd:48,w:1.4,
 x:c=>`Pháo nổ đầu ngõ, nhà nhà gói bánh. ${N(c)} được giao lo phần ${G.tierIdx()>=3?'yến tiệc đãi khách khứa':'mâm cỗ cúng tổ tiên'}. Tết là dịp họ hàng, láng giềng và cả người quen biết cũ gặp nhau.`,
 o:c=>[
  ...(G.tierIdx()>=2?[pay('Làm thật linh đình, mời họ hàng láng giềng',25,{f:c=>{const q=chance(0.15);if(q){const n=G.tie.ensure(c,{vai:['quen'],nghe:'người quen cũ gặp ngày Tết',age:R(30,55),rel:15,why:'gặp ngày Tết'});G.tie.later(n,c,'tie_ban_nho',R(6,24),{})}return `Họ hàng làng xóm khen ngợi, tình thân gắn chặt.${q?' Giữa tiệc có một người quen cũ làm lại mối.':''}`+fx(c,{money:-m(25),cfame:2,on:3,tam:8,eq:1})}})]:[]),
  pay('Vừa phải, đủ lễ là được',8,{f:c=>'Một cái Tết ấm cúng, đủ đầy.'+fx(c,{money:-m(8),on:1,tam:5})}),
  {l:'Tiết kiệm, cúng đơn sơ',f:c=>'Đỡ tốn, bớt được ít tiền để dành, nhưng có người xì xào.'+fx(c,{money:m(1),tam:-2,cfame:-1})}]}),
/* ============ Khách đông bất ngờ (chủ cơ sở) ============ */
/* ============ Hội làng mùa xuân: ba cuộc thi ============ */
E({id:'c631_hoi_lang_xuan',t:'Hội làng mùa xuân',sea:['xuan'],age:[15,60],pcd:60,cd:11,
 x:(c,d)=>{const L=[['vo','đấu vật','vo'],['tri','thi đối đáp thơ','tri'],['mi','thi hát đối','mi']];const k=pick(L);d.k=k[0];d.a=k[2];return `Hội làng đầu xuân rộn ràng cờ quạt, chiêng trống. ${N(c)} được cử đi dự cùng mọi người trong xóm. Năm nay có cuộc ${k[1]}, giải thưởng do các nhà giàu góp.`},
 o:(c,d)=>[
  {l:'Dự thi, quyết lấy giải',r:[{[d.a]:0.7,eq:0.3},48],y:c=>`Được giải nhất, cả xóm khen. Phần thưởng gồm tiền và vật phẩm.`+fx(c,{money:m(R(8,16)),[d.a]:4,fame:3,tam:7}),n:c=>`Không được giải, nhưng gặp được nhiều tay cừ khôi và học được mấy điều.`+fx(c,{[d.a]:2,tam:1})},
  {l:'Góp công dựng rạp, nấu cỗ',f:c=>`Tay chân bận rộn, nhưng được dân làng quý, tình làng thêm chặt.`+fx(c,{suc:-2,cfame:1,on:1,eq:1,tam:3})},
  pay('Đi chơi, ăn uống thư thả, làm quen người mới',1,{f:c=>{const q=G.tie.ensure(c,{vai:['quen'],nghe:'người quen gặp ở hội làng',age:R(18,40),rel:12,why:'làm quen ở hội làng'});if(chance(0.5))G.tie.later(q,c,'tie_ban_nho',R(12,48),{});return `Làm quen thêm vài người, trong đó có ${esc(q.n)} khá hợp chuyện.`+fx(c,{money:-m(1),tam:6,eq:1,qh:[q.n,5]})}})]}),
/* ============ Nắng hạn: nhà giàu thì phát gạo cứu dân ============ */
E({id:'nang_han',t:'Nắng hạn kéo dài',sea:['ha'],age:[12,90],cd:24,w:0.8,
 x:'Ba tháng không một hạt mưa. Giếng làng cạn, giá gạo ngoài chợ tăng vùn vụt.',
 o:c=>{const ti=G.tierIdx();return [
  {l:'Mua tích trữ gạo ngay',c:()=>G.money()>=m(20),f:c=>'Nhà không thiếu ăn, nhưng tốn kém.'+fx(c,{money:-m(20),tam:-1})},
  ...(ti<=1?[{l:'Thắt lưng buộc bụng',f:c=>'Cả nhà ăn cháo cầm hơi.'+fx(c,{suc:-R(3,6),tam:-6})}]:[
   pay('Mở kho phát gạo cứu dân',12+ti*8,{f:c=>`Dân đói được cứu, tiếng nhà vang khắp vùng. Nhiều người nhớ ơn.`+fx(c,{money:-m(12+ti*8),cfame:4,on:2,eq:1,tam:5})}),
   pay('Cho vay gạo không lãi, thu lại sau mùa',6,{f:c=>`Làng không đói, nhà thu hồi đủ sau vụ gặt, thêm tiếng thơm.`+fx(c,{money:-m(6),cfame:2,eq:1,tam:3})})]),
  {l:'Cùng làng đào giếng mới',r:[{suc:0.6,eq:0.8},45],y:c=>'Đào trúng mạch nước ngọt! Cả làng có nước.'+fx(c,{cfame:3,fame:4,tam:6,suc:-2}),n:c=>'Đào mãi chỉ gặp đá.'+fx(c,{suc:-5,tam:-3})}]}}),
/* ============ Lầu hồng đèn đỏ: vui chơi thì dính tật ============ */
E({id:'thanh_lau',t:'Lầu hồng đèn đỏ',age:[18,60],g:'nam',tier:[2,6],c:c=>!(c.habits||[]).includes('thanhlau'),
 x:c=>`Bạn bè kéo ${N(c)} lên ${pick(['Túy Hồng lâu','Xuân Phong các','Vọng Nguyệt lâu'])} nghe hát. Cô đào nâng chén mời rượu.`,
 o:c=>[
  pay('Vui chơi cho trọn đêm',15,{f:c=>{const roll=chance(0.7);const hab=!roll?(G.HABITS&&G.HABITS.bac&&chance(0.4)?'bac':undefined):'thanhlau';const sick=chance(0.12);if(sick)G.ill.start(c,'hoa_lieu');return `Một đêm vui. ${roll?'Từ đó tối nào cũng thấy nhớ, thành khách quen.':'Về nhà vẫn còn lâng lâng.'}${sick?' Ít hôm sau trong người sinh bệnh lạ.':''}`+fx(c,{money:-m(15),tam:6,habit:hab,suc:sick?-8:0})}}),
  pay('Chỉ nghe hát rồi về',4,{f:c=>`Nghe hát, uống rượu nhẹ, về sớm.`+fx(c,{money:-m(4),tam:3,eq:1,habit:chance(0.1)?'ruou':undefined})}),
  {l:'Lấy cớ bận việc',f:c=>`Bạn bè chê là sợ vợ, nhưng thật ra giữ được tiếng.`+fx(c,{tam:-1,liem:1})}]}),
/* ============ Thuốc bổ: tăng sức khỏe tối đa và già chậm ============ */
E({id:'thuoc_bo',t:'Lời mời mua thuốc bổ',age:[30,90],c:c=>!(c.habits||[]).includes('thuocbo')&&c.suc<70,
 x:c=>`Hiệu thuốc Bắc mời ${N(c)} dùng thử nhân sâm, linh chi, "uống đều thì cường gân tráng cốt". Thuốc thật thì bồi bổ lâu dài, thuốc dỏm thì chỉ mất tiền.`,
 o:c=>[
  {l:'Mua dùng thường xuyên',c:()=>G.money()>=m(10),f:c=>{const real=chance(0.88);return real?`Mỗi tháng tốn một khoản, nhưng thấy khỏe ra, ngủ ngon hơn. Thân thể bền hơn trước.`+fx(c,{money:-m(10),habit:'thuocbo',suc:6,hpMax:2,tam:3}):`Uống mấy tháng chẳng thấy gì, hóa ra mua nhầm thuốc dỏm.`+fx(c,{money:-m(10),habit:'thuocbo',tam:-3})}},
  pay('Mua một ít thôi',6,{f:c=>`Bồi bổ được đôi phần.`+fx(c,{money:-m(6),suc:5})}),
  {l:'Không cần',f:c=>'Tự thấy mình còn khỏe.'+fx(c,{tam:1})}]}),
/* ============ Chó dại: bệnh thật, nhiều đường cứu ============ */
E({id:'cho_dai',t:'Chó dại',age:[4,80],w:0.3,cd:36,
 x:c=>`Con chó dại sổng xích lao vào cắn ${N(c)}. Bệnh dại không có thuốc chữa nếu phát, nên mỗi quyết định ngay lúc này rất quan trọng.`,
 o:c=>[
  {l:'Rửa vết cắn bằng nước muối, đốt ngay và chạy chữa bằng bài thuốc gia truyền',r:[{suc:1,tri:0.3},55],y:c=>'Không phát bệnh. Vết thương lành sau mấy tuần.'+fx(c,{suc:-8,tam:-1}),n:c=>{G.ill.start(c,'dai',4);return 'Sốt mê sảng mấy tuần, bệnh dại phát: phải chạy chữa ngay.'+fx(c,{suc:-R(20,30),tam:-12})}},
  pay('Mời thầy lang giỏi nhất vùng đến chữa',15,{r:[{eq:0.3,tri:0.3},80],y:c=>'Thầy lang chữa đúng cách, không phát bệnh.'+fx(c,{money:-m(15),suc:-3,tam:2}),n:c=>{G.ill.start(c,'dai',3);return 'Thầy lang đến muộn, bệnh vẫn phát nhưng nhẹ.'+fx(c,{money:-m(15),suc:-R(15,25),tam:-8})}}),
  {l:'Nhờ người trói con chó để xem có dại thật không',r:[{vo:0.4,tri:0.4},60],y:c=>'Quan sát vài ngày, hóa ra chó chỉ ốm chứ không dại. Hú vía.'+fx(c,{suc:-4,tam:2,tri:1}),n:c=>{G.ill.start(c,'dai',4);return 'Con chó thật sự dại, mất thời gian quý báu, vết thương đã quá muộn.'+fx(c,{suc:-R(25,35),tam:-12})}},
  {l:'Lên chùa cầu khấn, trông vào phúc phận',f:c=>chance(0.35)?'May mắn, không phát bệnh.'+fx(c,{suc:-8,tam:4}):(G.ill.start(c,'dai',4),'Bệnh dại phát, mê sảng mấy tuần, suýt không qua khỏi.')+fx(c,{suc:-R(25,35),tam:-14})}]}),
/* ============ Trẻ ngã xuống ao: nhiều cách cứu ============ */
E({id:'tre_nga_ao',t:'Ngã xuống ao',age:[3,9],w:0.4,cd:36,pcd:240,c:c=>G.homeLv()<=4,
 x:c=>`Tiếng hét thất thanh ngoài ao. ${N(c)} trượt chân xuống nước, chới với. Ai gần nhất sẽ phải quyết định thật nhanh.`,
 o:c=>[
  {l:'Người lớn nhảy xuống cứu ngay',h:1,r:[{suc:1,vo:0.3},40],y:c=>'Kéo được lên kịp.'+fx(c,{suc:-5,tam:-4}),n:c=>{G.ill.start(c,'viem_phoi',2);return 'Cứu lên thì đã sặc nước, sốt mấy hôm.'+fx(c,{suc:-R(12,20),tam:-8})}},
  {l:'Hô hàng xóm, nhờ người thạo nước',r:[{eq:0.6,khau:0.3},55],y:c=>'Có người nhanh tay kéo lên. Cả nhà nợ hàng xóm một món ơn.'+fx(c,{suc:-3,tam:-3,cfame:1}),n:c=>'Người đến chậm một chút, cứu lên thì đã sặc nặng.'+fx(c,{suc:-R(18,28),hpMax:-R(1,3),tam:-9})},
  {l:'Ném dây/sào cho bám vào rồi kéo vào bờ',r:[{tri:0.7,vo:0.2},50],y:c=>'Đứa trẻ bám được dây, kéo vào bờ bình an.'+fx(c,{suc:-2,tam:-2,tri:1}),n:c=>'Dây tuột khỏi tay, đứa trẻ chìm xuống một lúc mới được cứu.'+fx(c,{suc:-R(20,30),hpMax:-R(1,3),tam:-8})}]})
];
});
