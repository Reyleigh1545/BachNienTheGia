/* Bách Niên Thế Gia v6.3.3 · bốn nhà thế gia
   Nguyễn (quan võ, ải Nhạn Môn) · Vũ (quan văn, kinh thành) · Dương (quan văn, thái y, Dược Cốc) · Kiều (quan võ, thủy sư, cảng Bạch Sa)
   Mô-típ mượn từ chính sử, dã sử, truyện dân gian: người đan sọt bên đường, quả cam bóp nát, tiếng ngâm thơ trên ải, treo mũ từ quan,
   thầy thuốc không lấy tiền, người lặn dưới nước đục thuyền giặc, thuyền ma... Mọi sự kiện do G._v633 phát, không vào bốc ngẫu nhiên. */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc,age,married,alive}=G;
const S=()=>G.S();
const m=v=>G.mm(v);
const fm=v=>G.fmtMoney(v);
const V=()=>G._v633;
const hn=id=>V().houseName(id);
const hr=(id,d)=>{V().houseRel(id,d);return ''};
const dt=n=>{const v=S().vil;if(v&&v.on)V().vAdd('dt',n);return ''};
const NOM={tri:50,vo:46,suc:65,mi:46,eq:46,muu:20,khau:25,ql:16,ky:30,fame:15,m:35,duyen:50};
const TS=(spec,p)=>{let v=0,w=0;for(const k in spec){v+=(NOM[k]!=null?NOM[k]:50)*spec[k];w+=spec[k]}return Math.round(0.93*(w?v/w:50)-9*Math.log(p/(1-p)))};
const RR=(spec,p)=>[spec,TS(spec,p)];
const N=c=>esc(c.given);
const H=(house,o)=>Object.assign({fixed:1,k:'Thế gia',house,hw:1,hcd:72},o);
const unm=p=>!married(p)&&!p.inLaw&&p.dead==null;
const male=(lo,hi)=>p=>p.g==='nam'&&age(p)>=lo&&age(p)<=hi&&!p.away&&unm(p);
const daughter=(h,lo,hi)=>h.kids.find(k=>k.g==='nữ'&&k.age>=lo&&k.age<=hi);
const takeKid=(id,kid)=>{const h=S().w.houses[id];if(h&&kid)h.kids=h.kids.filter(k=>k!==kid)};
const wedKid=(c,id,kid,o)=>{const p=G.mkMatch(c,Object.assign({surname:G._v633.hdef(id).sur,given:kid.given,g:kid.g,age:kid.age,stand:8.6,story:1},o));G.mkSpouse(c,false,p);takeKid(id,kid);return p};
const HK=(house,o)=>Object.assign({fixed:1,k:'Kỳ ngộ',ky:1,good:1,u:'person',house,hw:0.55,hcd:240},o);
return [
/* ================= NGUYỄN · quan võ, ải Nhạn Môn ================= */
H('nguyen',{id:'h_ng_hich',t:'Hịch quyên lương thảo',hw:1.2,hcd:72,hc:()=>G.tierIdx()>=1,
 x:()=>`Một sứ giả từ Nhạn Môn mang hịch của ${hn('nguyen')} đến từng nhà trong vùng. Biên ải thiếu lương, mùa đông sắp tới, ai có lòng xin góp một phần cho tướng sĩ. Hịch viết giản dị mà đọc lên ai cũng nghẹn ngào.`,
 o:()=>{const big=m(R(10,16)),mid=m(R(3,6));return [
  {l:`Quyên một khoản lớn (${fm(big)})`,c:()=>G.money()>=big,f:c=>`Sứ giả cúi đầu thật sâu, ghi tên nhà mình vào sổ vàng của tướng sĩ.`+hr('nguyen',14)+fx(c,{money:-big,fame:R(4,8),cfame:2,tam:5})},
  {l:`Góp vừa sức (${fm(mid)})`,c:()=>G.money()>=mid,f:c=>`Một khoản nhỏ nhưng đúng lúc. Sứ giả hứa sẽ trình lên đô đốc.`+hr('nguyen',6)+fx(c,{money:-mid,fame:1,tam:2})},
  {l:'Nói nhà mình cũng đang túng',f:c=>`Sứ giả không nói gì, chỉ chắp tay rồi sang nhà khác.`+hr('nguyen',-2)+fx(c,{tam:-1})}]}}),
HK('nguyen',{id:'h_ng_dansot',t:'Người đan sọt bên đường',
 hwho:p=>p.g==='nam'&&age(p)>=16&&age(p)<=40&&!p.away&&p.job!=='quan_ngu'&&p.job!=='quan'&&(p.vo>=40||p.tri>=50),
 x:c=>`${N(c)} ngồi bên vệ đường đan sọt, nghĩ mãi một câu trong binh thư, tay vẫn đan mà mắt đã đi đâu. Đoàn quân của ${hn('nguyen')} đi qua. Mũi giáo của lính tiền đạo chọc vào đùi, ${N(c)} không hề hay biết. Viên đô đốc ghìm ngựa.`,
 o:c=>[
  {l:'Nói thẳng điều mình đang nghĩ',r:RR({tri:1,vo:0.7,muu:0.3},0.55),y:c=>`Nghe xong, đô đốc cười lớn: "Người nghĩ việc nước đến quên đau thì giữ ở sọt làm gì." Ông cho ngựa chở ${N(c)} theo quân, ban cho áo giáp.`+(G.enlist(c),'')+hr('nguyen',12)+fx(c,{merit:R(20,40),fame:R(6,10),vo:2,tri:2}),
   n:c=>`${N(c)} nói vấp mấy câu, đô đốc lắc đầu: "Chưa chín." Nhưng ông vẫn dặn người băng vết thương cho.`+hr('nguyen',3)+fx(c,{suc:-2,tam:-3})},
  {l:'Xin lỗi, bảo mình chỉ nghĩ vẩn vơ',f:c=>`Đô đốc nhìn rất lâu rồi thúc ngựa đi. ${N(c)} ngồi đan tiếp, lòng vẫn nghĩ đến câu binh thư dở dang.`+fx(c,{tri:1,tam:-2})}]}),
HK('nguyen',{id:'h_ng_cam',t:'Quả cam trong bàn tay',hwho:p=>p.g==='nam'&&age(p)>=12&&age(p)<=17&&!p.away,
 x:c=>`${N(c)} nghe tin ${hn('nguyen')} họp các tướng bàn việc đánh giặc, chạy đến tận cổng doanh xin vào dự. Lính gác không cho vì còn nhỏ. ${N(c)} đứng ngoài, tay siết quả cam ai cho lúc nãy đến nát bét lúc nào không hay.`,
 o:c=>[
  {l:'Nói thẳng mình muốn đi đánh giặc',r:RR({eq:0.8,vo:0.6,suc:0.3},0.5),y:c=>`Đô đốc cho gọi vào, nhìn bàn tay dính nước cam, im lặng rồi tặng một lá cờ nhỏ thêu chữ "Nghĩa". "Chờ cho lớn."`+hr('nguyen',9)+fx(c,{vo:3,suc:2,fame:4,tam:8}),
   n:c=>`Lính gác lôi ra khỏi cổng, ${N(c)} khóc ròng suốt đường về.`+fx(c,{tam:-6,eq:1})},
  {l:'Xin ở lại doanh học võ vài tuần',s:'Phải xin phép gia chủ',f:c=>`Đô đốc cho theo học cùng đám trẻ con nhà lính. ${N(c)} chăm chỉ lắm, tối về mệt rũ.`+hr('nguyen',4)+fx(c,{vo:3,suc:1,tam:3})},
  {l:'Về nhà luyện cho lớn rồi tính',f:c=>`${N(c)} giấu quả cam nát vào áo, tối ngủ vẫn còn ngửi thấy mùi.`+fx(c,{eq:1,vo:1})}]}),
H('nguyen',{id:'h_ng_duyet',t:'Lễ duyệt binh mùa thu',hw:0.8,hc:()=>G.season()==='thu'&&(S().fame>=80||G.tierIdx()>=3),
 x:()=>`Mùa thu, ${hn('nguyen')} mở lễ duyệt binh ở chân ải, mời các nhà có tiếng trong vùng đến xem. Cờ quạt rợp một khoảng trời, ai cũng muốn được ngồi ở hàng ghế khách.`,
 o:()=>{const gift=m(R(5,9));return [
  {l:`Mang lễ đến dự (${fm(gift)})`,c:()=>G.money()>=gift,f:c=>`Gia chủ được xếp ngồi hàng khách quý. Nhìn trận hình rền như sấm, ai cũng thấy mình nhỏ lại, rồi lại lớn lên một chút vì được đứng gần.`+hr('nguyen',10)+fx(c,{money:-gift,fame:R(3,6),cfame:2,tam:4})},
  {l:'Cử con em trong nhà đi thay',f:c=>`Người đi về kể lại cả buổi, bọn trẻ trong nhà nghe say mê.`+hr('nguyen',4)+fx(c,{fame:1,tam:2})},
  {l:'Nói bận, không đi',f:c=>`Quà cáo lỗi gửi đến muộn, người ta không để bụng nhưng cũng không nhớ tên.`+hr('nguyen',-2)}]}}),
H('nguyen',{id:'h_ng_cauthan',t:'Cô Lam Anh kén rể bằng tỉ võ',hw:0.7,hcd:120,hwho:male(18,34),
 hc:(c,h)=>!!daughter(h,17,27)&&G.tierIdx()>=1,
 x:(c,d)=>{const k=daughter(S().w.houses.nguyen,17,27);return `Con gái ${hn('nguyen')} là ${k?esc(k.given):'Lam Anh'}, tuổi đôi mươi, giỏi cung ngựa không kém trai. Nhà đô đốc mở hội tỉ võ chọn rể, mời các thanh niên trong vùng. ${N(c)} nghe tin, được người ta rủ đi thử sức.`},
 o:(c,d)=>{const k=daughter(S().w.houses.nguyen,17,27);if(!k)return [{l:'Thôi',f:()=>''}];return [
  {l:'Lên đài tỉ thí',r:RR({vo:1,suc:0.5,gan:0.3},0.4),y:c=>{const p=wedKid(c,'nguyen',k,{main:'vo',traits:['khoemanh'],job:'noi'});return `${N(c)} thắng ba trận liền, đến trận cuối ngang tài ngang sức với chính cô gái. Cô thu cung: "Chàng đáng để cha ta gật đầu." Hai nhà thành thân.`+hr('nguyen',20)+fx(c,{fame:8,cfame:3,tam:10,vo:2})},
   n:c=>`${N(c)} thua ở trận bán kết, bị đánh trúng vai nên ê ẩm cả tháng. Nhưng cũng được nhiều người nhớ mặt.`+hr('nguyen',3)+fx(c,{suc:-4,tam:-4,vo:1})},
  {l:'Xin được thử bằng thơ phú thay võ',r:RR({tri:1,eq:0.6},0.3),y:c=>{wedKid(c,'nguyen',k,{main:'mi',traits:['khoemanh'],job:'noi'});return `Lão đô đốc đọc xong bài phú, chép miệng: "Đánh giặc thì thiếu, mà lấy bút giữ nhà thì được." Cô gái phì cười gật đầu.`+hr('nguyen',14)+fx(c,{fame:6,cfame:2,tam:8,tri:1})},
   n:c=>`Bài phú bị chê "chỉ khéo trên giấy". ${N(c)} ra về, mặt đỏ bừng.`+fx(c,{tam:-5})},
  {l:'Đến xem cho biết',f:c=>`Cả buổi ${N(c)} chỉ đứng ngoài vỗ tay. Ai thắng, ai thua đều nhớ.`+fx(c,{tam:1})}]}}),
H('nguyen',{id:'h_ng_nguaquy',t:'Ngựa chiến làm quà',hw:0.7,hcd:120,hc:(c,h)=>h.rel>=25,
 x:()=>`${hn('nguyen')} gửi đến một con ngựa chiến thuộc giống tốt ở Nhạn Môn, kèm lời nhắn: "Ngựa tốt thì trao người biết quý." Người dắt ngựa chờ xem cách đáp lễ.`,
 o:()=>{const rt=m(R(4,7));return [
  {l:`Nhận ngựa, đáp lễ (${fm(rt)})`,c:()=>G.money()>=rt,f:c=>{const k=S().kho;k.ngua=(k.ngua||0)+1;return 'Con ngựa vào chuồng, ai cũng ra xem. Lễ đáp đủ đầy.'+hr('nguyen',8)+fx(c,{money:-rt,fame:2,tam:3})}},
  {l:'Nhận ngựa, cảm tạ bằng thư',f:c=>{const k=S().kho;k.ngua=(k.ngua||0)+1;return 'Thư viết tình cảm, ngựa nhận lễ nhẹ.'+hr('nguyen',4)+fx(c,{tam:2})}},
  {l:'Xin khéo từ',f:c=>`Người dắt ngựa dắt về, không nói gì thêm.`+hr('nguyen',-3)}]}}),
H('nguyen',{id:'h_ng_tuongqua',t:'Con trai đô đốc ghé nhà',hw:0.8,hcd:96,hwho:p=>p.g==='nam'&&age(p)>=17&&age(p)<=45&&p.vo>=45&&!p.away,
 x:(c)=>`Công tử ${esc(S().w.houses.nguyen.kids.find(k=>k.g==='nam'&&k.age>=18)?.given||'Hoàng Nam')} con ${hn('nguyen')} đi qua vùng này, nghe danh ${N(c)} có võ nên ghé lại, cười bảo: "Nghe nói đỡ được ba chiêu của ta không?"`,
 o:c=>[
  {l:'Nhận lời thử vài chiêu',r:RR({vo:1,suc:0.4,gan:0.3},0.5),y:c=>`Hai bên giao thủ bảy hiệp, chẳng ai nhường ai. Công tử cười: "Ngày sau ra biên ải, ta nhớ tên người." Họ uống rượu đến khuya.`+hr('nguyen',9)+fx(c,{vo:2,fame:3,tam:5}),
   n:c=>`${N(c)} thua chiêu thứ hai, bị hất ngã. Công tử đỡ dậy, ái ngại: "Võ nghệ người cần rèn thêm, nhưng gan thì có."`+hr('nguyen',3)+fx(c,{suc:-2,vo:1,tam:-2})},
  {l:'Mời rượu, không thử võ',f:c=>`Hai bên chuyện trò chuyện đến sáng. Công tử không để bụng.`+hr('nguyen',4)+fx(c,{tam:3})}]}),
HK('nguyen',{id:'h_ng_dem',t:'Tiếng ngâm thơ trên ải',hc:(c,h)=>h.rel>=15,hwho:p=>age(p)>=20&&!p.away,
 x:c=>`Đêm ${N(c)} qua Nhạn Môn, nghe trên thành có một giọng ngâm thơ vọng xuống, trầm mà vang, như từ trong núi đá. Lính gác bảo: "Đêm nào cũng thế, không ai thấy người." Gió ngừng hẳn, ai cũng im.`,
 o:c=>[
  {l:'Ngồi lại nghe đến sáng',f:c=>`Bài thơ ngắn, nói rằng núi sông của nước Nam người Nam giữ. Sáng ra ${N(c)} thấy trong lòng nhẹ như vừa trút một gánh nặng.`+fx(c,{eq:2,tam:8,fame:1})+hr('nguyen',3)},
  {l:'Chép lại bài thơ',r:RR({tri:1,khau:0.3},0.55),y:c=>`Chép được nguyên vẹn mười bốn câu. Về nhà đọc cho con cháu nghe, ai cũng đứng dậy nghe hết.`+fx(c,{tri:2,fame:2,cfame:1,tam:4}),n:c=>`Chép hụt mấy câu giữa, tiếc mãi.`+fx(c,{tam:-1})},
  {l:'Hỏi lính gác về người ngâm',f:c=>`Lính già kể rằng đó là vị tướng cũ giữ ải, mất từ lâu mà vẫn không chịu rời. ${N(c)} chắp tay cúi chào về phía thành.`+fx(c,{tam:3,eq:1})+hr('nguyen',3)}]}),

/* ================= VŨ · quan văn, kinh thành ================= */
H('vu',{id:'h_vu_tienco',t:'Thư tiến cử',hwho:p=>age(p)>=20&&age(p)<=45&&!p.away&&(p.degree>=1||p.tri>=70||['su','thulai'].includes(p.job)),hc:(c,h)=>h.rel>=10||S().fame>=100,
 x:c=>`Có người báo ${hn('vu')} ở bộ Lại đang tìm người đọc sách cho một chân trong bộ, đã nghe tiếng ${N(c)}. Muốn được tiến cử, trước hết phải qua vòng thử của gia nhân ông, vì ông không bao giờ nhận người chưa nhìn tận mắt.`,
 o:c=>{const gift=m(R(6,10));return [
  {l:'Mang một bài luận đến trình',r:RR({tri:1,eq:0.4},0.5),y:c=>`Bài luận làm Vũ Thượng thư gật gù: "Văn có cốt." Ông viết thư tiến cử, dù chức chưa kịp bổ nhưng tên ${N(c)} đã nằm trong sổ bộ Lại.`+hr('vu',12)+fx(c,{tri:2,m:8,fame:5,cfame:1,tam:6}),n:c=>`Bài luận bị trả lại, bên lề có hai chữ "nông cạn".`+hr('vu',2)+fx(c,{tam:-5})},
  {l:`Kèm lễ vật nhờ gia nhân chuyển (${fm(gift)})`,c:()=>G.money()>=gift,r:RR({tri:0.7,eq:0.6},0.62),y:c=>`Lễ vật được nhận, bài luận được đọc, và tên ${N(c)} được ghi vào danh sách.`+hr('vu',8)+fx(c,{money:-gift,m:6,fame:3,tam:4}),n:c=>`Bị trả lại lễ, kèm lời nhắn lạnh lùng: "Ông nhà tôi không nhận lễ trước khi nhận người."`+hr('vu',-6)+fx(c,{fame:-3,tam:-4})},
  {l:'Nói mình chưa đủ tài',f:c=>`Gia nhân gật đầu, không nói gì thêm.`+fx(c,{eq:1})}]}}),
HK('vu',{id:'h_vu_thuphong',t:'Tàng thư các của Vũ phủ',hc:(c,h)=>h.rel>=25,hwho:p=>age(p)>=16&&p.tri>=65&&!p.away,
 x:c=>`${hn('vu')} nghe tiếng ${N(c)} ham đọc sách, sai người mời đến tàng thư các. Nơi ấy cất bản chép tay của những bộ sách đã mất ở ngoài đời, chỉ mở cửa cho người ông tin tưởng.`,
 o:c=>[
  {l:'Ở lại chép và đọc trong ba tháng',r:RR({tri:1,diem:0.3},0.6),y:c=>`Ba tháng, ${N(c)} chép được hơn trăm trang, ghi chú kín cả lề. Rời đi, người gác thư khẽ nói: "Chủ nhân bảo người nào đọc như thế thì sách cho tặng nửa."`+hr('vu',10)+fx(c,{tri:R(3,6),m:10,fame:3}),n:c=>`Đọc nhanh quá, nhớ không bền. Mất ba tháng mà chỉ thuộc vài chương.`+fx(c,{tri:1,tam:-2})},
  {l:'Xin mượn một bộ về nhà',r:RR({tri:0.8,eq:0.5},0.55),y:c=>`Thượng thư gật đầu cho mượn. Bộ sách về nhà, cả nhà cùng đọc.`+hr('vu',6)+fx(c,{tri:2,tam:3,m:5}),n:c=>`Một trang bị ố nước, ${N(c)} phải mang trả cùng lời tạ tội.`+hr('vu',-4)+fx(c,{tam:-4})},
  {l:'Đọc vài quyển rồi cáo từ',f:c=>`Đọc xong thì đi, không vướng nợ gì.`+fx(c,{tri:1})}]}),
H('vu',{id:'h_vu_trieunghi',t:'Triều nghị chia phe',hw:0.8,hcd:96,hc:()=>S().fame>=100||G.tierIdx()>=3,
 x:()=>`Trong triều đang tranh nhau: một phe đòi tăng binh lương cho biên ải (phe ${hn('nguyen')}), phe kia đòi giảm thuế cho dân (phe ${hn('vu')}). ${hn('vu')} viết thư riêng hỏi ý nhà mình, mong có tiếng nói của các nhà có tiếng trong vùng.`,
 o:()=>[
  {l:'Ủng hộ phe giảm thuế',f:c=>`Thư hồi âm gửi đi. Phe văn mừng, phe võ nhăn mặt.`+hr('vu',12)+hr('nguyen',-6)+fx(c,{fame:3,cfame:1})},
  {l:'Ủng hộ phe tăng binh lương',f:c=>`Thư hồi âm gửi đi. Phe võ mừng, phe văn tiếp tục chê trách.`+hr('nguyen',12)+hr('vu',-6)+fx(c,{fame:3,cfame:1})},
  {l:'Viết thư đề nghị dung hòa, mỗi bên nhường một nửa',r:RR({eq:1,tri:0.5},0.45),y:c=>`Thư được cả hai phe đọc, người ta bảo đó là cách duy nhất không ai mất mặt. Hai nhà đều ghi nhớ.`+hr('vu',8)+hr('nguyen',8)+fx(c,{fame:6,cfame:2,eq:1}),n:c=>`Thư viết chung chung, chẳng ai coi trọng.`+fx(c,{tam:-2})},
  {l:'Không dám lên tiếng',f:c=>`Thư không gửi đi. Nhà mình vẫn yên, nhưng không ai nhắc đến.`}]}),
HK('vu',{id:'h_vu_treomu',t:'Treo mũ từ quan',hwho:p=>age(p)>=25&&!p.away&&(p.tri>=70||p.job==='quan'),hc:(c,h)=>h.rel>=20,
 x:c=>`Cụ Tư nghiệp, thầy cũ của ${hn('vu')}, treo mũ ở cổng Quốc tử giám rồi cáo quan về quê, để lại sớ vạch bảy kẻ nịnh thần. ${hn('vu')} gửi thư đến các nhà đọc sách trong vùng, mời cùng ký vào bản sớ ấy.`,
 o:c=>[
  {l:'Ký tên đứng chung bản sớ',r:RR({eq:0.8,tri:0.6,gan:0.3},0.5),y:c=>`Bản sớ có hơn trăm chữ ký. Sĩ phu khắp nơi truyền nhau cái tên ${N(c)}. Nịnh thần bị thanh trừng ba kẻ, và nhà họ Vũ mang ơn.`+hr('vu',16)+fx(c,{fame:R(8,14),cfame:3,tam:8,eq:2}),n:c=>`Bản sớ bị chặn, người ký bị ghi tên vào sổ đen. ${N(c)} mất mấy chỗ quen biết.`+hr('vu',5)+fx(c,{fame:-4,tam:-6})},
  {l:'Viết bài luận bênh vực mà không ký',r:RR({tri:1,eq:0.5},0.6),y:c=>`Bài luận được chép đi nhiều nơi, người đọc biết có người nghĩ như mình.`+hr('vu',8)+fx(c,{fame:4,tri:2,tam:3}),n:c=>`Bài viết bị gạt khỏi các tuyển tập.`+fx(c,{tam:-2})},
  {l:'Giữ im lặng, lo giữ nghề',f:c=>`Bản sớ ký xong mà không có tên mình. Người đọc sách quanh vùng nhìn nhau, không ai nói gì.`+hr('vu',-5)+fx(c,{tam:-3})}]}),
H('vu',{id:'h_vu_tiec',t:'Tiệc thơ ở Vũ phủ',hw:0.9,hwho:p=>age(p)>=18&&!p.away&&(p.tri>=55||p.mi>=60),hc:(c,h)=>h.rel>=5&&G.tierIdx()>=2,
 x:c=>`Vũ phủ mở tiệc thơ giữa tháng, mời văn nhân các nơi, mỗi người phải làm một bài trước khi dùng cơm. ${N(c)} nhận được thiếp mời.`,
 o:c=>[
  {l:'Làm một bài thơ vịnh cảnh tại chỗ',r:RR({tri:0.7,mi:0.5,eq:0.3},0.5),y:c=>`Bài thơ nức tiếng cả bàn, chủ nhà đọc to lần thứ hai. ${N(c)} được xếp ngồi gần chủ.`+hr('vu',9)+fx(c,{fame:R(4,7),tri:1,tam:5}),n:c=>`Bài thơ bị chê ý cũ, người ngồi bên khẽ cười.`+hr('vu',1)+fx(c,{tam:-4})},
  {l:'Xin họa lại bài của người khác',r:RR({tri:0.6,eq:0.6},0.62),y:c=>`Họa khéo hơn cả bài gốc, nên chủ nhân sai chép riêng một bản.`+hr('vu',7)+fx(c,{fame:3,tam:3}),n:c=>`Họa không ăn vần, đành mượn rượu chữa thẹn.`+fx(c,{tam:-3})},
  {l:'Ngồi nghe và uống rượu',f:c=>`Cả buổi nghe đủ thứ văn chương. Về nhà, ${N(c)} nhớ được đôi câu hay.`+fx(c,{tri:1,tam:2})}]}),
H('vu',{id:'h_vu_cauthan',t:'Cô Thanh Vân đối thơ kén chồng',hw:0.6,hcd:120,hwho:male(20,36),hc:(c,h)=>!!daughter(h,19,29)&&G.tierIdx()>=2,
 x:c=>{const k=daughter(S().w.houses.vu,19,29);return `Con gái ${hn('vu')} là ${k?esc(k.given):'Thanh Vân'}, nổi tiếng nhớ sách thuộc làu. Nhà ra thể lệ: ai đối được ba vế của cô thì được vào gặp cha. ${N(c)} được bạn rủ đi thử.`},
 o:c=>{const k=daughter(S().w.houses.vu,19,29);if(!k)return [{l:'Thôi',f:()=>''}];return [
  {l:'Đối ba vế đối',r:RR({tri:1,eq:0.4},0.35),y:c=>{wedKid(c,'vu',k,{main:'tri',traits:['thongminh'],job:'noi'});return `Đến vế thứ ba, cô ngẩng lên nhìn. Vũ Thượng thư đứng sau bình phong khẽ nói: "Được." Hai nhà thành thân, tiệc cưới có cả quan bộ Lại đến chung vui.`+hr('vu',20)+fx(c,{fame:8,cfame:3,tam:10,tri:2})},
   n:c=>`Vế thứ hai ${N(c)} bí, cô mỉm cười: "Đọc thêm vài năm nữa." Nhưng câu nói ấy không có ý chê.`+hr('vu',3)+fx(c,{tam:-4,tri:1})},
  {l:'Mang lễ vật xin gặp cha cô trước',c:()=>G.money()>=m(25),f:c=>`Thượng thư không nhận lễ, chỉ ra đề thi một bài. ${N(c)} làm xong, ông đọc rất lâu rồi bảo: "Chờ thêm một năm."`+hr('vu',4)+fx(c,{money:-m(25),tri:1,tam:-1})},
  {l:'Đến xem, không thử',f:c=>`Cô ấy đối đáp hay làm cả sân nức nở khen. ${N(c)} ra về, có người trầm trồ nhìn theo.`+fx(c,{tam:1})}]}}),
H('vu',{id:'h_vu_giaothu',t:'Mời dạy con em Vũ phủ',hw:0.7,hcd:96,hwho:p=>age(p)>=24&&age(p)<=58&&!p.away&&((p.job==='su'&&p.lv>=2)||(p.tri>=75&&p.degree>=1)),hc:(c,h)=>h.rel>=15,
 x:c=>`${hn('vu')} cần một người thầy giỏi dạy cho cháu nội mùa hè này. Nghe tiếng ${N(c)} dạy học có nghề, ông gửi thư mời, hứa trả hậu.`,
 o:c=>{const pay=m(R(25,45));return [
  {l:'Nhận dạy trong mùa hè',r:RR({tri:0.8,eq:0.8},0.62),y:c=>`Cậu cháu học nhanh, cả nhà quý mến. Vũ Thượng thư trả hậu và bảo bạn bè: "Có người thầy ấy là phúc."`+hr('vu',10)+fx(c,{money:pay,fame:5,m:8,tam:4}),n:c=>`Cậu cháu nghịch ngợm, ${N(c)} bị phàn nàn là nghiêm quá. Hai bên chia tay, không ai nói điều xấu.`+hr('vu',1)+fx(c,{money:Math.round(pay/3),tam:-3})},
  {l:'Từ chối vì còn việc ở nhà',f:c=>`Thư hồi âm khéo léo. Người ta không giận.`+fx(c,{tam:0})}]}}),
H('vu',{id:'h_vu_thicu',t:'Khoa thi do Vũ Thượng thư chủ khảo',hw:0.8,hcd:84,hwho:p=>age(p)>=16&&age(p)<=36&&!p.away&&p.tri>=55&&(p.degree||0)<2,hc:()=>true,
 x:c=>`Khoa thi này ${hn('vu')} đích thân chủ khảo, nổi tiếng nghiêm ngặt. Có người nhà ${N(c)} nghe đồn có một đường dây "dò đề" ở cửa sau, ai cũng bảo đó là cơ hội nếu dám trả giá.`,
 o:c=>[
  {l:'Dự thi thẳng thắn bằng sức mình',r:RR({tri:1,diem:0.4},0.55),y:c=>`Bài làm sạch sẽ, vào được vòng sau. Lúc yết bảng, tên ${N(c)} được đọc to. Chủ khảo nghe nói cũng gật.`+hr('vu',6)+fx(c,{tri:2,m:6,fame:5,tam:6}),n:c=>`Đề khó, ${N(c)} viết dở dang. Rớt, nhưng tự biết mình thiếu ở đâu.`+fx(c,{tri:1,tam:-4})},
  {l:`Nhờ đường dây dò đề (${fm(m(20))})`,c:()=>G.money()>=m(20),r:RR({khau:0.5,muu:0.6,eq:0.3},0.5),y:c=>`Đề dò đúng, làm trôi chảy. Đỗ nhưng trong lòng nặng nề mãi.`+fx(c,{money:-m(20),tri:1,tam:-1,liem:-6}),n:c=>`Việc lộ ra, ${N(c)} bị ghi tên cấm thi ba khoa, nhà họ Vũ ghi sổ.`+hr('vu',-18)+fx(c,{fame:-12,cfame:-3,tam:-12,liem:-10})},
  {l:'Không dự, đợi khoa sau',f:c=>`Dùng thời gian ôn sách thêm.`+fx(c,{tri:1})}]}),

/* ================= DƯƠNG · quan văn và thầy thuốc, Dược Cốc ================= */
H('duong',{id:'h_du_phatthuoc',t:'Phát thuốc cứu dân',hw:1.1,hcd:72,hc:()=>G.epi()||(S().disaster&&S().disaster.k==='lam')||chance(0.2),
 x:()=>`${hn('duong')} cho xe thuốc đi khắp các làng, phát miễn phí, ai ốm cũng được xem. Ông gửi thư mời các nhà có tiếng trong vùng góp tay, vì thuốc thì ông lo được, người thì không.`,
 o:()=>{const cost=m(R(6,12));return [
  {l:`Góp tiền mua thêm thuốc (${fm(cost)})`,c:()=>G.money()>=cost,f:c=>`Xe thuốc đi qua làng nào cũng có tên nhà mình. Dân làng nhớ ơn lâu.`+hr('duong',12)+dt(6)+fx(c,{money:-cost,fame:R(4,8),cfame:2,tam:6})},
  {l:'Cho người trong nhà theo xe đi phát thuốc',f:c=>`Mấy ngày đi qua các làng, ${N(c)} thấy rõ cái khổ của người nghèo. Về nhà nói ít hẳn, ăn cơm lâu hơn.`+hr('duong',8)+dt(8)+fx(c,{fame:3,eq:1,tam:3})},
  {l:'Tiếc là nhà mình không giúp được',f:c=>`Thư trả lời lịch sự. Ông Dương chỉ bảo: "Ai cũng có lúc khó."`+hr('duong',-2)}]}}),
H('duong',{id:'h_du_toathuoc',t:'Một toa thuốc quý',hw:0.9,hcd:96,hwho:p=>p.job==='y'&&age(p)>=20&&!p.away,hc:(c,h)=>h.rel>=10,
 x:c=>`${hn('duong')} nghe tiếng ${N(c)} chữa bệnh giỏi trong vùng, gửi thư đề nghị đổi một toa thuốc ông mới tìm ra lấy toa của ${N(c)}. Ông viết: "Thuốc không giữ của riêng thì thuốc mới sống."`,
 o:c=>[
  {l:'Đổi toa, chép đầy đủ gửi sang',r:RR({tri:1,eq:0.3},0.6),y:c=>`Hai toa thuốc đổi nhau. Toa của Dược Cốc cho thấy cả một lối chữa khác. ${N(c)} đọc suốt đêm.`+hr('duong',10)+fx(c,{tri:2,m:10,fame:3,tam:4}),n:c=>`Toa gửi sang có chỗ sai, Dương gia nhẹ nhàng chỉ ra. ${N(c)} thẹn, sửa lại.`+hr('duong',3)+fx(c,{m:3,tam:-3})},
  {l:'Giữ toa làm gia bảo, từ chối khéo',f:c=>`Thư hồi âm nhã nhặn. Ông Dương không ép.`+fx(c,{tam:0})+hr('duong',-3)}]}),
HK('duong',{id:'h_du_namduoc',t:'Nam dược trị Nam nhân',hwho:p=>age(p)>=18&&!p.away&&(p.job==='y'||p.tri>=60),hc:(c,h)=>h.rel>=15,
 x:c=>`${hn('duong')} lên núi hái thuốc, mời ${N(c)} đi cùng. Ông chỉ vào những lá cỏ dại bên suối: "Người ta cứ mua thuốc ngoại giá đắt, mà thuốc nhà mình mọc ngay ven đường."`,
 o:c=>[
  {l:'Theo ông hái thuốc cả mùa',r:RR({tri:0.8,suc:0.3,diem:0.3},0.6),y:c=>`${N(c)} học được hơn ba chục vị thuốc, ghi từng cái tên. Nam dược đủ để chữa nhiều bệnh thông thường, giá lại rẻ.`+hr('duong',10)+fx(c,{tri:R(2,4),m:12,fame:3,hpMax:2}),n:c=>`Đi núi mệt, nhận lầm một vị nên phải ngồi nhà vài hôm.`+fx(c,{suc:-3,tam:-2,m:3})},
  {l:'Xin vài hạt giống mang về',f:c=>`Trồng được vài luống thuốc trong vườn nhà, bà con hay đến xin.`+hr('duong',5)+fx(c,{tam:3,fame:1,m:4})},
  {l:'Cảm tạ rồi về',f:c=>`${N(c)} nghe ông nói thêm vài câu rồi chắp tay từ biệt.`}]}),
H('duong',{id:'h_du_dongy',t:'Thái y viện tuyển học trò',hw:0.7,hcd:120,hwho:p=>p.job==='y'&&p.lv>=1&&p.lv<=2&&p.tri>=55&&!p.away,hc:(c,h)=>h.rel>=25,
 x:c=>`Thái y viện cần một người học trò có tay nghề, ${hn('duong')} viết thư tiến cử ${N(c)}. Phải qua kỳ khảo hạch về mạch lý và dược tính.`,
 o:c=>[
  {l:'Dự khảo hạch',r:RR({tri:1,eq:0.2,diem:0.3},0.5),y:c=>`Đỗ hạng ba, được nhận vào Thái y viện học hai năm. Về nhà, ${N(c)} mang theo kiến thức của cả một thế hệ thầy thuốc.`+hr('duong',10)+fx(c,{lv:1,tri:2,m:10,fame:6,cfame:1}),n:c=>`Rớt ở bài mạch lý. Dương Chánh sứ nhắn: "Sang năm thử lại."`+hr('duong',2)+fx(c,{tam:-4,m:3})},
  {l:'Từ chối, ở lại phụng dưỡng nhà',f:c=>`Gia đình cần ${N(c)} hơn Thái y viện.`+fx(c,{eq:1,tam:1})}]}),
HK('duong',{id:'h_du_vuon',t:'Vườn thuốc ở Dược Cốc',hc:(c,h)=>h.rel>=30,hwho:p=>age(p)>=18&&!p.away,
 x:c=>`${hn('duong')} mời ${N(c)} đến thăm Dược Cốc. Phía sau nhà có một khu vườn rộng mà chỉ người ruột thịt mới được vào, trong đó có những giống thuốc quý ở khắp thiên hạ.`,
 o:c=>[
  {l:'Đi dạo cùng chủ vườn từ sáng đến tối',f:c=>`Đi đến tối vẫn chưa hết vườn. Ông chỉ cho từng cây, kể công dụng bằng giọng chậm rãi như đọc thơ. ${N(c)} thấy người nhẹ hẳn, mấy bệnh vặt như tan đi.`+hr('duong',10)+fx(c,{suc:3,hpMax:2,tam:6,m:6})},
  {l:'Xin ông cho chép các phương thuốc',r:RR({tri:1,eq:0.4},0.5),y:c=>`Ông Dương ngập ngừng rồi gật: "Chép đi, nhưng phải dùng cho người nghèo." ${N(c)} chép đến khuya.`+hr('duong',12)+fx(c,{tri:2,m:12,fame:2}),n:c=>`Ông cười: "Chuyện đó để sau." ${N(c)} hiểu nhà họ Dương không phải ai cũng cho chép.`+hr('duong',1)},
  {l:'Xin vài cây giống đem về',c:()=>G.CROPS&&!!G.CROPS.duoc,f:c=>`${G.unlockCrop&&G.unlockCrop('duoc')?'Nhà có thêm giống thuốc để trồng.':'Vườn nhà thêm vài luống thuốc.'}`+hr('duong',6)+fx(c,{tam:3})}]}),
H('duong',{id:'h_du_cuoi',t:'Cô Tuệ Lâm tìm người cùng nghề',hw:0.6,hcd:120,hwho:male(22,38),hc:(c,h)=>!!daughter(h,22,33)&&G.tierIdx()>=1,
 x:c=>{const k=daughter(S().w.houses.duong,22,33);return `Con gái cả nhà họ Dương là ${k?esc(k.given):'Tuệ Lâm'}, thầy thuốc giỏi mà chưa chồng, cha cô nói thẳng: "Muốn lấy cô thì phải biết chữa bệnh hơn biết nói chuyện." Người trong vùng bàn tán, ai cũng ngó ${N(c)}.`},
 o:c=>{const k=daughter(S().w.houses.duong,22,33);if(!k)return [{l:'Thôi',f:()=>''}];return [
  {l:'Đến xin thử một ca khó cùng cô',r:RR({tri:1,eq:0.5,diem:0.3},0.4),y:c=>{wedKid(c,'duong',k,{main:'tri',traits:['thongminh'],job:'y'});return `Hai người cùng chữa một ca sốt rét lâu năm, đến sáng thì bệnh nhân hạ sốt. Cô Dương cười: "Người này ở được với tôi." Hai nhà thành thân.`+hr('duong',20)+fx(c,{fame:7,cfame:3,tam:10,tri:2,m:6})},
   n:c=>`${N(c)} không bắt được mạch, bệnh nhân vẫn sốt. Cô Dương lặng lẽ tự tay làm tiếp. Chuyện không thành nhưng cô không chê.`+hr('duong',3)+fx(c,{tam:-5,m:3})},
  {l:'Mang lễ đến xin ra mắt',c:()=>G.money()>=m(25),f:c=>`Ông Dương nhận lễ nhưng bảo: "Trước hết phải xem tay nghề." ${N(c)} được hẹn lại sang năm.`+hr('duong',3)+fx(c,{money:-m(25),tam:-1})},
  {l:'Chúc cô lấy được người xứng',f:c=>`Một lời chúc đẹp. Cô nhìn ${N(c)} rồi mỉm cười, không nói gì.`}]}}),
HK('duong',{id:'h_du_benhnhan',t:'Người bệnh không tên',hwho:p=>age(p)>=18&&!p.away,hc:(c,h)=>h.rel>=10,
 x:c=>`Một người lạ mặt ngất ở cổng nhà ${N(c)}, thân mình đầy vết thương cũ, trong áo giấu một ống tre niêm kín. ${hn('duong')} đang ở gần nên được mời đến chữa. Ông xem mạch rồi lắc đầu: "Sống được là nhờ mệnh."`,
 o:c=>[
  {l:'Cho nằm lại nhà, chăm sóc đến lúc khỏi',f:c=>`Ba tuần sau người ấy tỉnh, nhìn ${N(c)} lâu rồi nói: "Ơn này ta sẽ trả." Hôm sau người ấy đi, để lại cái ống tre chứa một tấm bản đồ ghi mấy mật thất ở biên ải, kèm một thỏi bạc.`+hr('duong',8)+fx(c,{money:m(R(15,30)),fame:3,tam:5})},
  {l:'Báo quan địa phương',f:c=>`Lính đến mang người đi, ống tre bị tịch thu. Mấy ngày sau có tin người ấy là tay sai một phe cánh nào đó.`+hr('duong',-2)+fx(c,{tam:-3})},
  {l:'Nhờ ông Dương lo liệu',f:c=>`Ông Dương nhận lo, bảo cứ để ông giữ người ấy trong Dược Cốc, bao giờ tỉnh sẽ nói.`+hr('duong',8)+fx(c,{tam:2})}]}),

/* ================= KIỀU · quan võ, thủy sư, cảng Bạch Sa ================= */
HK('kieu',{id:'h_ki_yetkieu',t:'Người lặn dưới đáy nước',hwho:p=>p.g==='nam'&&age(p)>=16&&age(p)<=36&&!p.away&&p.job!=='quan_ngu'&&(p.suc>=55||['ngu','tieuphu','khuanvac'].includes(p.job)),
 x:c=>`${N(c)} có tài lặn lâu, từng mò ốc dưới đáy sông cả buổi không nổi lên. Thủy binh của ${hn('kieu')} nghe chuyện, dắt đến bến xem. Đô đốc chỉ ra thuyền hải tặc bị bắt đang neo: "Đục thủng đáy thuyền ấy mà không ai hay thì mới đáng."`,
 o:c=>[
  {l:'Nhận thử, lặn đục thuyền trong đêm',r:RR({suc:1,vo:0.5,gan:0.5},0.5),y:c=>`Đêm ấy ${N(c)} đục xong sáu chỗ, thuyền chìm nghiêng mà không ai hay. Sáng ra, đô đốc ra bến nhìn rất lâu: "Làm thủy binh cho ta."`+(G.enlist(c),'')+hr('kieu',12)+fx(c,{merit:R(20,35),fame:R(6,10),suc:2,tam:8}),n:c=>`${N(c)} bị phát hiện, lính canh kéo lên. Đô đốc chỉ cười: "Khá, chưa đủ."`+hr('kieu',3)+fx(c,{suc:-2,tam:-3})},
  {l:'Dạy cho thủy binh cách lặn, không nhập ngũ',f:c=>`Mấy buổi dạy xong, ${N(c)} được trả công hậu.`+hr('kieu',8)+fx(c,{money:m(R(6,12)),fame:2,tam:3})},
  {l:'Từ chối, bảo mình chỉ mò ốc',f:c=>`Mọi người cười, nhưng ai cũng biết ${N(c)} sẽ còn được nhắc.`+fx(c,{tam:-1})}]}),
H('kieu',{id:'h_ki_hotong',t:'Hộ tống hàng cho thủy sư',hw:0.9,hwho:p=>age(p)>=20&&age(p)<=50&&!p.away&&['tieu','ngu','hangrong','khuanvac','nghe','tieunhi','hiep'].includes(p.job),hc:(c,h)=>h.rel>=10,
 x:c=>`${hn('kieu')} cần chở một chuyến hàng quân dụng đến cảng nhỏ phía nam, bờ biển dạo này nhiều hải tặc. Ông nhắn ${N(c)} đi cùng một thuyền hộ tống, trả tiền hậu.`,
 o:c=>{const pay=m(R(18,35));return [
  {l:'Nhận hộ tống toàn chặng',r:RR({vo:0.8,suc:0.5,muu:0.4},0.52),y:c=>`Giữa đường gặp hai thuyền lạ, đoàn dàn trận nhanh khiến chúng bỏ chạy. Chuyến hàng đến nơi nguyên vẹn, đô đốc trả đủ.`+hr('kieu',10)+fx(c,{money:pay,fame:4,vo:1,tam:5}),n:c=>`Bị hải tặc đánh lén ở eo biển, mất một phần hàng. ${N(c)} phải bồi thường nửa số tiền.`+hr('kieu',-3)+fx(c,{money:-Math.round(pay/2),suc:-3,tam:-6})},
  {l:'Chỉ nhận đi nửa chặng',f:c=>`Nửa chặng đầu yên ổn, tiền ít mà không rủi ro.`+hr('kieu',4)+fx(c,{money:Math.round(pay/3),tam:1})},
  {l:'Từ chối vì sợ rủi ro',f:c=>`Đô đốc cho người khác thay. Ông không giận nhưng cũng không còn nhờ nữa.`+hr('kieu',-3)}]}}),
H('kieu',{id:'h_ki_haitac',t:'Đánh hải tặc Hải Minh',hw:0.9,hcd:84,hc:()=>G.tierIdx()>=2,
 x:()=>`Hải tặc Hải Minh cướp mấy thuyền buôn ngoài khơi. ${hn('kieu')} dựng thêm chiến thuyền nhưng còn thiếu gỗ và lương. Ông nhắn khắp các nhà có của ở vùng ven biển: "Ai giúp tôi đóng được ba chiếc thì cả cảng nhớ ơn."`,
 o:()=>{const big=m(R(15,25)),mid=m(R(5,9));return [
  {l:`Góp tiền đóng một chiến thuyền (${fm(big)})`,c:()=>G.money()>=big,f:c=>`Mũi thuyền mới khắc tên nhà mình bên cạnh chữ "Nghĩa". Trong cảng ai nhìn cũng thấy.`+hr('kieu',14)+fx(c,{money:-big,fame:R(5,9),cfame:2,tam:6})},
  {l:`Góp gỗ và dây thừng (${fm(mid)})`,c:()=>G.money()>=mid,f:c=>`Gỗ mang đến cảng, thợ vui vẻ ra mặt nhận.`+hr('kieu',6)+fx(c,{money:-mid,fame:2,tam:3})},
  {l:'Nói nhà không còn dư',f:c=>`Sứ giả cúi chào rồi đi sang nhà khác.`+hr('kieu',-2)}]}}),
H('kieu',{id:'h_ki_cauthan',t:'Cô Hải Yến chọn chồng trên thuyền',hw:0.6,hcd:120,hwho:male(18,34),hc:(c,h)=>!!daughter(h,18,27)&&G.tierIdx()>=1,
 x:c=>{const k=daughter(S().w.houses.kieu,18,27);return `Con gái ${hn('kieu')} là ${k?esc(k.given):'Hải Yến'}, từ nhỏ sống trên thuyền, bơi lội thông thạo hơn đi bộ. Nhà đô đốc mở cuộc thi bơi và chèo thuyền ngoài khơi, ai về nhất thì được ngồi cùng bàn với cha cô. ${N(c)} nghe tin, đến thử.`},
 o:c=>{const k=daughter(S().w.houses.kieu,18,27);if(!k)return [{l:'Thôi',f:()=>''}];return [
  {l:'Tham gia cuộc đua thuyền',r:RR({suc:1,vo:0.6,gan:0.3},0.38),y:c=>{wedKid(c,'kieu',k,{main:'vo',traits:['khoemanh'],job:'noi'});return `${N(c)} về nhất lúc mặt trời gần lặn, mệt đến không đứng nổi. Cô Hải Yến ném cho một chiếc khăn: "Không tệ đâu." Đô đốc cười lớn nhận rể.`+hr('kieu',20)+fx(c,{fame:8,cfame:3,tam:10,suc:2})},
   n:c=>`${N(c)} chèo đến giữa chặng thì kiệt sức, được thuyền cứu hộ kéo về. Cả bến cười nhưng cô Hải Yến chỉ nhắn: "Tập thêm năm nữa."`+hr('kieu',3)+fx(c,{suc:-3,tam:-5})},
  {l:'Xin làm trọng tài cuộc đua',r:RR({eq:1,tri:0.4},0.55),y:c=>`Xử việc công bằng nên ai cũng phục. Đô đốc giữ ${N(c)} lại uống rượu, rồi nửa đùa nửa thật bảo: "Người như vậy làm rể ta thì được."`+hr('kieu',12)+fx(c,{fame:5,tam:4}),n:c=>`Một thuyền kêu oan, ${N(c)} lúng túng. Tiếng cười vang cả bến.`+fx(c,{tam:-4})},
  {l:'Đến xem cho vui',f:c=>`Cuộc đua hay, ${N(c)} la hét khản cả cổ.`+fx(c,{tam:2})}]}}),
H('kieu',{id:'h_ki_thuongloh',t:'Giấy thông hành của thủy sư',hw:0.8,hcd:120,hc:(c,h)=>h.rel>=25&&(S().biz.length>0||S().trips.length>0),
 x:()=>`${hn('kieu')} gửi tặng một tấm thẻ gỗ khắc cờ hiệu thủy sư, kèm lời nhắn: "Thuyền nào đeo thẻ này đi qua Bạch Sa thì lính cảng khỏi xét." Ông ghi nhớ nhà mình trong số ít người đáng tin.`,
 o:()=>[
  {l:'Nhận thẻ, đáp lời cảm tạ',f:c=>{S().biz.forEach(b=>{b.bonus=Math.min(0.3,(b.bonus||0)+0.05)});return `Nhờ tấm thẻ, hàng qua cảng nhanh hơn, tiền thuê chờ cũng bớt. Các cơ sở nhà mình làm ăn thuận hơn trông thấy.`+hr('kieu',8)+fx(c,{fame:2,tam:3})}},
  {l:'Từ chối, sợ mang tiếng dựa thế',f:c=>`Thẻ gỗ được gửi trả. Ông Kiều bật cười: "Người này thanh liêm hơn ta tưởng."`+hr('kieu',5)+fx(c,{eq:1,fame:1})}]}),
H('kieu',{id:'h_ki_bao',t:'Bão lớn, thuyền chiến cần chỗ trú',hw:0.8,hcd:96,hc:()=>['thu'].includes(G.season())&&(chance(0.6)),
 x:()=>`Bão lớn nổi lên ngoài khơi, một đoàn thuyền của ${hn('kieu')} không về kịp cảng Bạch Sa. Ông nhắn các nhà ven biển cho thủy binh trú nhờ vài đêm, nấu cơm và lo thuốc cho người ốm.`,
 o:()=>{const cost=m(R(3,6));return [
  {l:`Mở cửa nhà cho thủy binh trú, lo cơm thuốc (${fm(cost)})`,c:()=>G.money()>=cost,f:c=>`Ba đêm, cả nhà nấu cháo liên tục. Thủy binh đi rồi vẫn còn nhắc: "Đó là nhà có tình."`+hr('kieu',12)+dt(5)+fx(c,{money:-cost,fame:R(4,7),cfame:2,tam:6})},
  {l:'Cho trú nhờ nhưng không lo cơm',f:c=>`Thủy binh mang lương khô nên cũng tự lo. Không ai phàn nàn.`+hr('kieu',4)+fx(c,{fame:1})},
  {l:'Đóng cửa tránh bão',f:c=>`Bão qua, nhưng cả cảng biết cánh cửa nhà nào đã đóng.`+hr('kieu',-5)+fx(c,{fame:-2,tam:-2})}]}}),
HK('kieu',{id:'h_ki_thuyenma',t:'Con thuyền ma',hwho:p=>age(p)>=18&&!p.away&&['ngu','tieu','khuanvac','hiep','tieunhi','hangrong'].includes(p.job),
 x:c=>`Đêm không trăng, thủy binh của ${hn('kieu')} thấy một con thuyền không người lái trôi trên mặt vịnh, buồm rách tả tơi. Ông cho người đi tìm hiểu. ${N(c)}, quen đường biển, được mời đi cùng.`,
 o:c=>[
  {l:'Cùng đi lên thuyền',r:RR({gan:0.5,vo:0.6,tri:0.4},0.5),y:c=>`Lên thuyền thấy toàn thùng hàng bị tháo, và một cuốn sổ ghi dở các chuyến chở hàng lậu. Đô đốc cầm sổ, sắc mặt thay đổi: "Có kẻ ở trên cao giúp bọn này." Ông thưởng hậu và dặn giữ im.`+hr('kieu',12)+fx(c,{money:m(R(10,20)),fame:3,tam:3})+(S().vil&&S().vil.on?(V().vAdd('pf',1),''):''),n:c=>`Trên thuyền có thủy thủ ngất xỉu vì sợ. ${N(c)} chỉ kịp vớ được vài cuộn dây rồi chạy.`+hr('kieu',2)+fx(c,{tam:-4})},
  {l:'Chỉ ở trên thuyền hộ tống, không lên',f:c=>`Người lên thuyền thấy gì không rõ, về chỉ ra hiệu im lặng.`+hr('kieu',3)},
  {l:'Từ chối',f:c=>`${N(c)} nhìn theo con thuyền trôi mất vào sương, chẳng biết có nên hối tiếc không.`}]}),
H('kieu',{id:'h_ki_dongtau',t:'Đóng thuyền chiến cho thủy sư',hw:0.8,hcd:96,hwho:p=>age(p)>=20&&!p.away&&['tho'].includes(p.job),hc:(c,h)=>h.rel>=5,
 x:c=>`Xưởng đóng thuyền của ${hn('kieu')} thiếu thợ cả, ông nghe tiếng tay nghề ${N(c)} bèn gửi thư nhờ góp tay đóng ba chiếc chiến thuyền mới.`,
 o:c=>{const pay=m(R(25,45));return [
  {l:'Nhận làm, ở lại xưởng vài tháng',r:RR({ky:1,tri:0.5},0.6),y:c=>`Ba chiếc thuyền hạ thủy đúng hẹn, đô đốc đứng xem. Tiền công hậu, danh tiếng thợ ${N(c)} lan khắp bến.`+hr('kieu',10)+fx(c,{money:pay,m:10,fame:5,tam:4}),n:c=>`Một mối ghép bị rò, phải làm lại. Công thợ giảm nhưng đô đốc không trách.`+hr('kieu',1)+fx(c,{money:Math.round(pay/3),m:4,tam:-3})},
  {l:'Từ chối vì nhà đang bận',f:c=>`Ông Kiều nhờ người khác.`+fx(c,{tam:0})}]}}),
/* ================= liên nhà ================= */
HK('vu',{id:'h_xx_hoinghi',t:'Bốn nhà thế gia họp mặt',hw:0.4,hcd:360,
 hc:()=>V().HOUSE_DEF.filter(d=>V().houseAlly(d.id,30)).length>=3&&S().fame>=300,
 x:()=>`Hiếm khi bốn nhà thế gia ngồi cùng một bàn. Nhân lễ thượng thọ ${hn('vu')}, các nhà ${hn('nguyen')}, ${hn('duong')}, ${hn('kieu')} đều về kinh. Cả bốn đồng ý mời một gia tộc ngoài bốn nhà tham dự, và lời mời ấy gửi đến nhà mình.`,
 o:()=>[
  {l:'Đến dự, mang lễ trọng',c:()=>G.money()>=m(40),f:c=>`Ngồi cùng bàn bốn người đứng đầu bốn phương, ${N(c)} nghe bàn chuyện nước chuyện nhà đến nửa đêm. Nhà mình từ đó được các nhà kia xem như người nhà.`+hr('vu',10)+hr('nguyen',10)+hr('duong',10)+hr('kieu',10)+fx(c,{money:-m(40),fame:R(10,16),cfame:6,tam:10})},
  {l:'Đến dự, lễ vật vừa phải',c:()=>G.money()>=m(15),f:c=>`Bữa tiệc vui vẻ, người ta nhớ mặt.`+hr('vu',5)+hr('nguyen',5)+hr('duong',5)+hr('kieu',5)+fx(c,{money:-m(15),fame:5,cfame:2,tam:5})},
  {l:'Từ chối vì sợ cao sang',f:c=>`Lời mời đến mà không nhận. Bốn nhà tiếc nhưng hiểu.`+fx(c,{tam:-4})}]})
];
});
