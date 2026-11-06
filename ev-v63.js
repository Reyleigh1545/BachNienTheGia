/* Bách Niên Thế Gia v6.3 · THẾ GIỚI VÀ TUỔI THƠ
   Phần 1: tuổi thơ có hiểm nguy và cơ duyên tương xứng (bé 0-4 tuổi cũng gặp biến cố, số con trưởng thành phụ thuộc vào đây)
   Phần 2: thiên tai theo vùng, chiến sự có báo trước, đường xa, họ khác trong vùng, tin tức từ xa */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc,age,kidsOf,alive}=G;
const S=()=>G.S();
const m=v=>G.mm(v);
const N=c=>esc(c.given);
const hd=()=>G.head();
const V=()=>G._v63;
const fm=v=>G.fmtMoney(v);
/* độ khó quy đổi từ xác suất mong muốn: p cho một đứa trẻ điển hình (e = điểm năng lực điển hình đã nhân hệ số trạng thái) */
const D=(p,e)=>Math.round(e-6-9*Math.log(p/(1-p)));
const DW=(p,e)=>Math.round(e-9*Math.log(p/(1-p)));
const T=(c,s)=>String(s).replace(/\{n\}/g,N(c));
const SEV=['','nhẹ','vừa','nặng'];
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const blkMove=()=>!!alive().find(p=>p.job==='quan'&&p.post);

/* ---------- chết hay thoát chết ---------- */
const kill=(c,cause,txt)=>{
  if(c.dead!=null)return txt;
  if(G.lone(c)){c.suc=Math.max(1,Math.min(c.suc,6));return `Thập tử nhất sinh, nhưng ${N(c)} vẫn giữ được mạng.`}
  c.flags=c.flags||{};
  if(c.flags.khoan&&chance(0.35)){c.flags.khoan=0;return `Lẽ ra đã không qua khỏi, nhưng như có phúc ấm của đấng bảo hộ che chở, ${N(c)} thoát chết trong gang tấc.`+fx(c,{suc:-R(20,30),hpMax:-R(1,3)})}
  G.die(c,cause);return txt};
const payHd=(v)=>v?fx(hd()||alive()[0],{money:-v}):'';
/* một lựa chọn chữa trị / ứng phó. Thất bại: phần lớn là chết, còn lại để lại di chứng nặng */
const care=o=>({l:o.l,s:o.s,c:o.cost?()=>G.money()>=m(o.cost):undefined,h:o.h,r:[o.spec||{suc:1},o.diff!=null?o.diff:D(o.p,o.e||67)],
  y:c=>T(c,o.ok)+fx(c,Object.assign({},typeof o.good==='function'?o.good():(o.good||{}),o.cost?{money:-m(o.cost)}:{})),
  n:c=>chance(o.kill==null?0.55:o.kill)?kill(c,o.cause,T(c,o.die))+payHd(o.cost?m(o.cost):0)
    :T(c,o.bad||'{n} qua được cơn hiểm nghèo nhưng yếu hẳn đi.')+fx(c,Object.assign({suc:-R(25,40),hpMax:-R(2,5)},o.cost?{money:-m(o.cost)}:{}))});
/* người yếu nhất trong nhà: nạn nhân của thiên tai, dịch bệnh */
const weakest=()=>{const L=alive().filter(p=>G.inClan(p));if(!L.length)return null;
  return L.map(p=>[p,(100-p.suc)*(age(p)<8||age(p)>62?2:1)+R(0,30)]).sort((a,b)=>b[1]-a[1])[0][0]};
const sweep=(p,cause)=>{if(!chance(p))return '';const v=weakest();if(!v)return '';const r=kill(v,cause,`${esc(v.given)} không qua khỏi.`);return ' '+(v.dead!=null?`<b class="down">${esc(v.given)} không qua khỏi.</b>`:r)};
const poor=()=>{const s=S();return (s.disaster&&s.disaster.crop<0.75)||s.money<m(8)};

return [
/* ======================================================================
   PHẦN 1 · TUỔI THƠ
   ====================================================================== */
/* ---------- 0-4 tuổi ---------- */
{id:'v63_k_sot_co_giat',t:'Sốt cao co giật',k:'Con nhỏ',age:[0,5],baby:1,w:1.6,cd:3,pcd:14,
 x:c=>`${N(c)} sốt hầm hập suốt đêm rồi co giật, mắt trợn ngược. Cả nhà thức trắng, ai cũng sợ hãi.`,
 o:[care({l:'Mời thầy thuốc giỏi nhất vùng',s:'Tốn tiền, an toàn nhất',cost:16,p:0.95,ok:'Thầy cho thuốc hạ sốt, qua đêm thì {n} hạ nhiệt, ngủ yên.',good:{suc:-3},die:'Thầy đến muộn một canh giờ. {n} không qua khỏi đêm ấy.',cause:'mất vì sốt cao co giật'}),
    care({l:'Đắp lá, cạo gió, cho uống thuốc nam trong nhà',s:'Không tốn tiền',p:0.86,ok:'Mồ hôi vã ra như tắm, đến sáng {n} hạ sốt.',good:{suc:-8},die:'Sốt không hạ, đến gần sáng thì {n} tắt thở trong tay mẹ.',cause:'mất vì sốt cao co giật'}),
    care({l:'Thắp hương cầu khấn, ôm con thức canh',s:'Phó mặc trời định',p:0.58,ok:'Gần sáng thì cơn sốt lui, {n} thiếp đi.',good:{suc:-14},die:'Cầu khấn đến khản giọng mà {n} vẫn không qua khỏi.',cause:'mất vì sốt cao co giật'})]},
{id:'v63_k_tieu_chay',t:'Nôn mửa tiêu chảy',k:'Con nhỏ',age:[0,5],baby:1,w:1.3,cd:3,pcd:14,sea:['ha','thu'],
 x:c=>`Trời nóng nực, {n} nôn mửa rồi đi ngoài liên tục, mắt trũng, môi khô nứt.`.replace('{n}',N(c)),
 o:[care({l:'Mời thầy thuốc xem bệnh',s:'Tốn tiền',cost:10,p:0.95,ok:'Thang thuốc đúng bệnh, hai hôm sau {n} lại bú được.',good:{suc:-3},die:'Thầy bắt mạch lắc đầu. {n} mất nước quá nặng.',cause:'mất vì thổ tả'}),
    care({l:'Nấu nước gạo rang pha muối cho uống từng thìa',s:'Bài thuốc dân gian',p:0.88,ok:'Từng thìa nước gạo rang rót vào, {n} dần tỉnh táo.',good:{suc:-6},die:'Cho uống mãi mà {n} không giữ được, rồi lịm đi.',cause:'mất vì thổ tả'}),
    care({l:'Nhịn ăn nhịn bú, cầu may',s:'Liều',p:0.58,ok:'May sao bệnh tự lui.',good:{suc:-14},die:'{n} khô héo đi trong hai ngày.',cause:'mất vì thổ tả'})]},
{id:'v63_k_cum_lanh_dong',t:'Gió bấc',k:'Con nhỏ',age:[0,5],baby:1,w:1.3,cd:3,pcd:14,sea:['dong'],
 x:c=>`Đông về, gió bấc lùa qua vách nứa. ${N(c)} ho khò khè, thở rít từng hồi, môi tím tái.`,
 o:[care({l:'Mua thêm chăn, đốt thêm lửa sưởi ấm',s:'Tốn ít tiền',cost:6,p:0.9,ok:'Ấm áp cả nhà, {n} ngủ yên rồi khỏi dần.',good:{tam:3},die:'Cơn ho chuyển thành viêm phổi. {n} không qua nổi mùa rét.',cause:'mất vì viêm phổi mùa đông'}),
    care({l:'Mời thầy thuốc kê thuốc ho',s:'Tốn tiền',cost:14,p:0.96,ok:'Thuốc ấm phổi hiệu nghiệm, {n} khỏi hẳn.',die:'Thuốc đến muộn. {n} mất vì viêm phổi.',cause:'mất vì viêm phổi mùa đông'}),
    care({l:'Để bé tự chịu quen với rét',s:'Liều',p:0.62,ok:'{n} chịu được, thêm một phần cứng cáp.',good:{suc:-5,hpMax:1},die:'Cơn ho kéo dài, {n} không qua nổi mùa rét.',cause:'mất vì viêm phổi mùa đông'})]},
{id:'v63_k_roi_ao',t:'Mép ao',k:'Con nhỏ',age:[1,6],baby:1,w:1.1,cd:6,pcd:24,
 x:c=>`Mải lo việc nhà, đến lúc ngoảnh lại thì ${N(c)} đã bò ra mép ao, một chân sắp trượt xuống nước.`,
 o:[care({l:'Lao ra kéo con lên ngay',h:1,spec:{vo:0.5,suc:0.5},p:0.88,e:51,ok:'Kịp tóm lấy chân con. {n} sặc sụa rồi khóc ré, may không sao.',good:{tam:-3},die:'Chậm một nhịp. Khi kéo lên thì {n} đã không thở nữa.',cause:'chết đuối ở ao nhà',kill:0.6}),
    care({l:'Hô hàng xóm chạy lại giúp',h:1,spec:{eq:1},p:0.7,e:35,ok:'Hàng xóm nghe tiếng hô, kịp đến vớt lên.',good:{tam:-3},die:'Người đến kịp thì đã muộn. {n} chìm xuống nước.',cause:'chết đuối ở ao nhà',kill:0.65})]},
{id:'v63_k_bong_bep',t:'Bỏng nước sôi',k:'Con nhỏ',age:[1,5],baby:1,w:1.1,cd:6,pcd:24,
 x:c=>`Nồi nước sôi vừa nhắc xuống bếp, ${N(c)} với tay kéo cả nồi. Tiếng khóc thất thanh vang khắp nhà.`,
 o:[care({l:'Dội nước mát, bôi mật ong và lá lô hội',s:'Cách của người từng trải',p:0.9,ok:'Vết bỏng dịu dần, ít để lại sẹo.',good:{suc:-5,mi:-1},die:'Vết bỏng nhiễm trùng, sốt cao. {n} không qua khỏi.',cause:'mất vì nhiễm trùng vết bỏng',kill:0.4}),
    care({l:'Gọi thầy thuốc băng bó',cost:10,p:0.96,ok:'Thầy băng bó cẩn thận, vết thương lành sạch.',good:{suc:-3},die:'Vết bỏng quá sâu. {n} không qua khỏi.',cause:'mất vì bỏng nặng',kill:0.4}),
    care({l:'Bôi nước mắm, mỡ lợn theo lời hàng xóm',s:'Mẹo truyền miệng',p:0.62,ok:'May vết bỏng không mưng mủ.',good:{suc:-9,mi:-2},die:'Vết bỏng mưng mủ, {n} lịm dần.',cause:'mất vì nhiễm trùng vết bỏng',kill:0.5})]},
{id:'v63_k_thieu_sua',t:'Sữa mẹ ít',k:'Con nhỏ',age:[0,2],baby:1,w:1.2,once:1,cd:3,
 x:c=>`Sữa mẹ ít, ${N(c)} khóc đói suốt ngày, gầy rộc, da nhăn như quả táo tàu.`,
 o:[care({l:'Thuê vú nuôi về cho bú',s:'Tốn tiền, bé khỏe lại',cost:14,p:0.96,ok:'Có sữa tốt, {n} bụ bẫm lên thấy rõ.',good:{suc:4,hpMax:1},die:'Đã quá yếu từ trước. {n} không gượng được.',cause:'mất vì suy dinh dưỡng',kill:0.5}),
    care({l:'Xin sữa nhà hàng xóm có con nhỏ',s:'Mang ơn người',p:0.88,ok:'Hàng xóm thương tình cho bú, {n} dần có da có thịt.',good:{cfame:0.5},die:'Sữa xin được không đủ nuôi. {n} yếu dần.',cause:'mất vì suy dinh dưỡng',kill:0.55}),
    care({l:'Nấu cháo gạo loãng cho ăn thêm',s:'Không tốn tiền',p:0.62,ok:'Cháo loãng đỡ đói, {n} cầm cự được.',good:{suc:-5,hpMax:-1},die:'Cháo loãng không đủ chất. {n} xanh xao rồi đi.',cause:'mất vì suy dinh dưỡng',kill:0.6})]},
{id:'v63_k_dich_tre',t:'Dịch trong xóm',k:'Con nhỏ',age:[0,14],baby:1,w:3,cd:2,pcd:18,c:()=>!!G.epi(),
 x:c=>`Dịch bệnh hoành hành, trẻ con trong xóm ngã bệnh từng nhà. ${N(c)} cũng bắt đầu nóng sốt, ho khan.`,
 o:[care({l:'Cách ly khỏi xóm, mời thầy thuốc',s:'Tốn tiền',cost:16,p:0.93,ok:'Cách ly kịp thời, {n} qua khỏi, trong nhà không ai lây.',good:{suc:-5},die:'Thầy đến thì bệnh đã nặng. {n} mất trong dịch.',cause:'mất trong dịch bệnh',kill:0.6}),
    care({l:'Xông lá, cho uống thuốc phòng',s:'Tốn ít',cost:5,p:0.82,ok:'Xông thuốc đều đặn, {n} khỏi sau nửa tháng.',good:{suc:-9},die:'{n} mất trong dịch như bao đứa trẻ khác ở xóm.',cause:'mất trong dịch bệnh',kill:0.65}),
    care({l:'Mặc cho trời định',p:0.5,ok:'{n} số lớn, vượt qua được.',good:{suc:-18,hpMax:-1},die:'{n} mất trong dịch như bao đứa trẻ khác ở xóm.',cause:'mất trong dịch bệnh',kill:0.75})]},
{id:'v63_k_nuot_vat',t:'Nuốt phải vật lạ',k:'Con nhỏ',age:[1,4],baby:1,w:0.8,cd:6,pcd:30,
 x:c=>`${N(c)} nhét hạt ${pick(['na','nhãn','đỗ','lạc'])} vào miệng, bỗng mặt tím lại, không khóc được nữa.`,
 o:[care({l:'Dốc ngược bé, vỗ mạnh vào lưng',h:1,spec:{vo:0.4,eq:0.6},p:0.8,e:38,ok:'Hạt văng ra, bé òa khóc. Cả nhà thở phào.',good:{tam:-2},die:'Vỗ mãi mà hạt kẹt cứng. {n} tím tái rồi lả đi.',cause:'chết nghẹn',kill:0.7}),
    care({l:'Móc họng lấy ra',h:1,spec:{eq:1},p:0.5,e:35,ok:'Móc ra được, bé thở lại.',good:{suc:-4},die:'Ngón tay lại đẩy hạt sâu hơn. {n} tắt thở.',cause:'chết nghẹn',kill:0.75}),
    care({l:'Chạy gấp tới nhà thầy thuốc',cost:6,p:0.66,ok:'Thầy thuốc gắp được hạt, bé khóc ré lên.',die:'Chạy chưa tới nơi thì {n} đã không cựa quậy nữa.',cause:'chết nghẹn',kill:0.7})]},
{id:'v63_k_ban_khoan',t:'Con khó nuôi',k:'Con nhỏ',age:[0,5],baby:1,w:0.9,once:1,cd:6,
 x:c=>`Thầy bói bảo ${N(c)} có mệnh yểu, "khó nuôi", muốn qua được thì phải bán khoán cho đình chùa hoặc nhận cha mẹ nuôi.`,
 o:[{l:'Làm lễ bán khoán cho đình chùa',s:'Tốn ít, nhờ phúc ấm che chở',c:()=>G.money()>=m(5),f:c=>{c.flags=c.flags||{};c.flags.khoan=S().t;return `Lễ xong, ${N(c)} đeo chiếc vòng bạc, được gọi bằng tên xấu cho dễ nuôi. Từ nay cả nhà yên tâm hơn.`+fx(c,{money:-m(5),tam:3})}},
    {l:'Nhờ bà đỡ trong xóm nhận làm con nuôi',s:'Tình làng nghĩa xóm',f:c=>{c.flags=c.flags||{};c.flags.khoan=S().t;return `Bà đỡ nhận làm con đỡ đầu, thêm người trông nom.`+fx(c,{tam:2,cfame:0.5})}},
    {l:'Không tin chuyện bói toán',f:c=>'Cả nhà bỏ ngoài tai.'+fx(c,{tam:1})}]},
{id:'v63_k_chien_loan_tre',t:'Tiếng trống giặc',k:'Con nhỏ',age:[0,17],baby:1,w:3,cd:3,pcd:20,c:()=>!!(S().war&&S().war.near<=1),
 x:c=>`Tiếng trống giặc dồn dập từ xa. ${N(c)} sợ hãi khóc ré, người lớn thì cuống cuồng không biết trốn đâu.`,
 o:[care({l:'Đào hầm trú trong vườn, giấu lương khô',s:'Tốn chút công, tốn ít tiền',cost:5,p:0.93,ok:'Cả nhà nép trong hầm ba ngày đêm, bình yên.',good:{tam:-3},die:'Hầm ngập nước, {n} yếu đi nhanh rồi không qua khỏi.',cause:'mất trong loạn',kill:0.4}),
    care({l:'Đưa con lên núi ẩn nhờ họ hàng',s:'Xa nhà, bấp bênh',p:0.84,ok:'Tránh được cơn binh lửa, con khỏe mạnh trở về.',good:{suc:-5,tam:-3},die:'Đường núi dốc, trời mưa gió, {n} bệnh nặng rồi mất.',cause:'mất trong loạn',kill:0.5}),
    care({l:'Ở yên trong nhà, cửa đóng then cài',p:0.5,ok:'Quân đi qua, nhà không ai đoái hoài.',good:{suc:-6,tam:-6},die:'Loạn quân xông vào nhà. {n} bị thương nặng rồi mất.',cause:'mất trong loạn',kill:0.7})]},
{id:'v63_k_nan_doi_tre',t:'Năm đói kém',k:'Con nhỏ',age:[0,17],baby:1,w:2.4,cd:5,pcd:24,c:()=>poor(),
 x:c=>`Gạo cạn, bữa cháo loãng bữa rau má. ${N(c)} gầy đét, bụng ỏng, mắt thâm quầng.`,
 o:[{l:'Người lớn nhịn phần mình cho con ăn',s:'Cha mẹ hao tổn',f:c=>{const h=hd();return `Cha mẹ nhịn dần, nhường từng bát cháo đặc cho con.`+fx(h&&h.id!==c.id?h:c,{suc:-R(6,10),tam:-6})+fx(c,{suc:-3})}},
    care({l:'Vay mượn mua gạo, đong thêm thóc',s:'Gánh nợ',cost:10,p:0.93,ok:'Mua được ít gạo, qua được cơn đói.',good:{suc:-2},die:'Gạo về muộn quá. {n} lả đi trong đêm.',cause:'mất vì đói',kill:0.5}),
    care({l:'Cho con theo ra đồng mò cua, hái rau dại',s:'Cực nhưng khỏe người',p:0.78,ok:'Con mò được cua, hái được rau, góp thêm bữa ăn. Cả nhà gắn bó hơn.',good:{suc:-6,eq:2,tam:2},die:'Đói lả giữa đồng, {n} ngã xuống không dậy nổi.',cause:'mất vì đói',kill:0.6})]},
{id:'v63_k_thoi_noi',t:'Lễ thôi nôi',k:'Con nhỏ',age:[1,1],baby:1,w:3,once:1,pcd:900,cd:1,
 x:c=>`${N(c)} tròn một tuổi. Mâm đồ bày sẵn: bút, sách, cung, kiếm, thỏi bạc, trống nhỏ. Cả nhà hồi hộp xem bé với tay bốc món nào.`,
 o:[{l:'Mở tiệc mời họ hàng làng xóm',s:'Tốn tiền, được tiếng',c:()=>G.money()>=m(10),f:c=>{const it=pick([['cây bút',{tri:4}],['cuốn sách',{tri:5}],['cây cung',{vo:5}],['thanh kiếm gỗ',{vo:4,eq:1}],['thỏi bạc',{eq:3,mi:2}],['chiếc trống nhỏ',{eq:4}]]);return `${N(c)} bốc ngay ${it[0]}. Họ hàng xì xào khen.`+fx(c,Object.assign({money:-m(10),fame:2,tam:3},it[1]))}},
    {l:'Cúng giản dị trong nhà',f:c=>{const it=pick([['cây bút',{tri:3}],['cuốn sách',{tri:3}],['cây cung',{vo:3}],['chiếc trống nhỏ',{eq:3}]]);return `${N(c)} bốc ${it[0]}, cả nhà bật cười.`+fx(c,Object.assign({tam:2},it[1]))}}]},
{id:'v63_k_biet_noi_som',t:'Biết nói sớm',k:'Con nhỏ',age:[1,4],baby:1,w:1,once:1,good:1,c:c=>c.tri>=12||c.eq>=12,
 x:c=>`${N(c)} mới ${age(c)||1} tuổi đã bập bẹ gọi được tên từng người trong nhà, nhớ cả mặt khách lạ.`,
 o:[{l:'Kiên nhẫn dạy con nói thêm mỗi ngày',f:c=>'Con tiến bộ trông thấy, đã biết ngâm nga vài câu đồng dao.'+fx(c,{tri:R(3,5),eq:R(1,2),tam:3})},
    {l:'Khoe với hàng xóm',f:c=>'Cả xóm biết tiếng thần đồng nhỏ.'+fx(c,{fame:R(2,5),tam:2})},
    {l:'Để con tự nhiên',f:c=>fx(c,{tam:3})}]},
{id:'v63_k_di_cho_lac',t:'Lạc giữa hội chợ',k:'Con nhỏ',age:[3,9],baby:1,w:1.1,cd:8,pcd:36,
 x:c=>`Hội chợ đông nghịt người. ${N(c)} buông tay người lớn chạy theo tiếng trống múa lân, đến khi quay lại đã không thấy ai quen.`,
 o:[care({l:'Cả nhà chia nhau đi tìm, treo thưởng',h:1,spec:{eq:0.5,tri:0.5},p:0.8,e:38,cost:6,ok:'Tìm thấy {n} ngồi khóc dưới chân tượng, có một ông đồ già ngồi dỗ. Ông khen bé lanh lợi, tặng bé cuốn sách nhỏ.',good:{tri:2,tam:-2},die:'Tìm khắp hội chợ đến tối. {n} bị bọn buôn người dẫn đi mất, không bao giờ tìm lại được.',cause:'mất tích ở hội chợ, không bao giờ tìm lại được',kill:0.3,bad:'Mãi đến khuya mới tìm thấy {n}, đã khóc đến lả người, sốt mấy ngày liền.'}),
    care({l:'Báo quan nhờ lính tuần tìm giúp',s:'Cần có tiếng',cost:12,h:1,spec:{eq:1},p:0.88,e:35,ok:'Lính tuần tìm thấy {n} ngay trong đêm, trả về tận cửa.',good:{cfame:0.5},die:'Lính tuần tìm đến sáng không thấy. {n} biệt tăm.',cause:'mất tích ở hội chợ, không bao giờ tìm lại được',kill:0.25}),
    care({l:'Chạy đi tìm một mình',h:1,spec:{eq:1},p:0.55,e:35,ok:'Tìm được con ở góc chợ, hai mẹ con ôm nhau khóc.',good:{tam:-3},die:'Tìm hoài không thấy. {n} biệt tăm từ hôm ấy.',cause:'mất tích ở hội chợ, không bao giờ tìm lại được',kill:0.35})]},
{id:'v63_k_tap_di',t:'Tập đi',k:'Con nhỏ',age:[1,3],baby:1,w:1,cd:6,pcd:24,
 x:c=>`${N(c)} chập chững tập đi, loạng choạng ngã đập đầu vào bậc cửa. Tiếng khóc ré lên, trán sưng một cục lớn.`,
 o:[{l:'Bế lên dỗ dành, xoa dầu',f:c=>{if(chance(0.04*(c.suc<45?2:1)))return kill(c,'mất vì chấn thương đầu','Vết sưng lan xuống mắt, đến chiều bé lịm đi và không tỉnh lại nữa.');return 'Một lúc sau con nín, lại bi bô.'+fx(c,{suc:-2})}},
    {l:'Để con tự đứng dậy, đừng nuông chiều',s:'Con cứng cáp hơn',f:c=>{if(chance(0.03*(c.suc<45?2:1)))return kill(c,'mất vì chấn thương đầu','Vết sưng lan xuống mắt, đến chiều bé lịm đi và không tỉnh lại nữa.');return 'Con tự lồm cồm bò dậy, từ đó đi vững hơn hẳn.'+fx(c,{vo:R(1,2),tam:-1,suc:-2})}}]},
/* ---------- 5-17 tuổi ---------- */
{id:'v63_k_tam_song',t:'Rủ nhau tắm sông',k:'Con trẻ',age:[6,14],w:1.4,cd:5,pcd:24,sea:['ha'],
 x:c=>`Trưa hè nắng chang chang, ${N(c)} cùng đám bạn rủ nhau ra sông tắm. Nước chỗ ấy sâu và có xoáy.`,
 o:[{l:'Cấm tiệt, bắt ở nhà phụ việc',s:'An toàn, con ấm ức',f:c=>'Con hậm hực nhưng nghe lời.'+fx(c,{tam:-6,eq:-1})},
    care({l:'Cho đi nhưng cử người lớn đi theo trông',h:1,spec:{vo:0.5,eq:0.5},p:0.93,e:37,ok:'Được người lớn trông chừng, {n} bơi lội thỏa thích và học được cách sải tay.',good:{tam:7,vo:2},die:'Chỉ lơ đãng một lúc, {n} bị xoáy cuốn xuống. Vớt lên thì đã tắt thở.',cause:'chết đuối ở sông',kill:0.7}),
    care({l:'Mặc kệ, trẻ con thì phải tập bơi',p:0.72,e:48,spec:{suc:0.6,vo:0.4},ok:'Con bơi giỏi hẳn, nổi tiếng nghịch nước cả xóm.',good:{tam:8,vo:3,suc:2},die:'Đám trẻ la hoảng lên khi {n} chìm hẳn. Người lớn chạy ra thì đã quá muộn.',cause:'chết đuối ở sông',kill:0.75})]},
{id:'v63_k_leo_cay',t:'Trèo cây hái quả',k:'Con trẻ',age:[5,13],w:1.2,cd:5,pcd:24,
 x:c=>`Cây ổi nhà hàng xóm sai quả. ${N(c)} thèm quá, ngó quanh rồi xắn tay trèo lên cành cao.`,
 o:[care({l:'Mặc cho con trèo, ngã thì biết',p:0.62,e:33,spec:{vo:0.7,suc:0.3},ok:'Hái được cả vạt áo ổi chín, chia cho lũ bạn. Từ đó có tiếng tinh nghịch mà nhanh nhẹn.',good:{vo:R(1,3),tam:5},die:'Cành giòn gãy rắc. {n} rơi từ trên cao, nằm bất động dưới gốc cây.',cause:'ngã từ trên cây xuống',kill:0.12,bad:'Cành gãy, {n} rơi xuống đất gãy chân, nằm liệt mấy tháng.'}),
    {l:'Bắt xuống, đánh đòn',f:c=>'Con khóc thét, từ đó không dám leo nữa.'+fx(c,{tam:-8,vo:-1})},
    {l:'Đứng dưới đỡ, hướng dẫn con trèo',h:1,r:[{eq:0.5,vo:0.5},25],y:c=>'Con trèo vững, người lớn đứng dưới đỡ. Một buổi chiều vui.'+fx(c,{vo:2,tam:6}),n:c=>'Cành gãy, người lớn đỡ không kịp.'+fx(c,{suc:-R(10,20),hpMax:-1})}]},
{id:'v63_k_ran_can_tre',t:'Rắn cắn',k:'Con trẻ',age:[6,15],w:1.2,cd:6,pcd:30,sea:['ha','thu'],
 x:c=>`${N(c)} đang chăn trâu thì bỗng kêu thét lên. Một con rắn đang luồn vào bụi cỏ, trên mắt cá chân hằn hai vết răng.`,
 o:[care({l:'Garô chặt, rạch hút máu độc, chạy tìm thầy',h:1,spec:{tri:0.5,eq:0.5},p:0.7,e:38,ok:'Hút kịp máu độc, thầy cho thuốc giải. {n} sốt vài hôm rồi hồi phục.',good:{suc:-8},die:'Chân sưng tím cả lên, nọc độc lan nhanh. {n} đi trong đêm.',cause:'chết vì rắn độc cắn',kill:0.75}),
    care({l:'Mời thầy lang chuyên chữa rắn cắn',s:'Tốn tiền',cost:14,p:0.93,ok:'Thầy lang đắp thuốc, cho uống nước cây giải độc. {n} qua khỏi.',good:{suc:-5},die:'Thầy lang đến thì độc đã ngấm. {n} không qua khỏi.',cause:'chết vì rắn độc cắn',kill:0.75}),
    care({l:'Đắp lá thuốc, tự chữa tại nhà',p:0.5,ok:'May là rắn không độc nặng, chân sưng mấy hôm rồi xẹp.',good:{suc:-12,hpMax:-1},die:'Chân sưng tím cả lên, nọc độc lan nhanh. {n} đi trong đêm.',cause:'chết vì rắn độc cắn',kill:0.8})]},
{id:'v63_k_lac_rung',t:'Lạc trong rừng',k:'Con trẻ',age:[7,15],w:1.1,cd:8,pcd:36,
 x:c=>`Vào rừng nhặt củi, ${N(c)} mải đuổi con sóc, ngoảnh lại đã không còn thấy lối. Trời bắt đầu xẩm tối.`,
 o:[care({l:'Bình tĩnh lần theo dòng suối ra bìa rừng',spec:{suc:0.6,tri:0.2,eq:0.2},p:0.7,e:50,ok:'Men theo suối, {n} ra được bìa rừng. Dọc đường nhặt được cả nắm nấm hương, thảo dược bán được ít tiền.',good:()=>({tri:2,money:m(5)}),die:'Đêm xuống, lạnh buốt, {n} kiệt sức ngã giữa rừng.',cause:'lạc rừng, mất vì kiệt sức',kill:0.45,bad:'Mãi sáng hôm sau người làng mới tìm thấy {n}, sốt mê man, tay chân sưng vết muỗi cắn.'}),
    care({l:'Leo lên cây cao ngồi đợi người đến tìm',spec:{suc:0.6,vo:0.4},p:0.62,e:48,ok:'Người làng thắp đuốc đi tìm, nghe tiếng gọi thì tìm thấy {n} trên cây.',good:{tam:-3},die:'Đêm xuống, gió rét, {n} kiệt sức rơi khỏi cành cây.',cause:'lạc rừng, mất vì kiệt sức',kill:0.4}),
    care({l:'Hò hét gọi người',p:0.4,e:45,spec:{eq:0.5,suc:0.5},ok:'Tiếng gọi vang xa, đoàn người đốt đuốc tìm được.',good:{tam:-4,suc:-4},die:'Tiếng gọi lạc dần trong gió. {n} không ai tìm thấy.',cause:'lạc rừng, mất vì kiệt sức',kill:0.5})]},
{id:'v63_k_uon_van',t:'Giẫm phải đinh rỉ',k:'Con trẻ',age:[6,17],w:0.9,cd:8,pcd:40,
 x:c=>`${N(c)} giẫm phải chiếc đinh rỉ khi chạy chân trần qua xưởng. Vết thương chẳng đáng gì, chỉ sau vài hôm đã sưng tấy, hàm cứng ngắc.`,
 o:[care({l:'Mời thầy thuốc giỏi giải độc, rạch vết thương',cost:18,p:0.86,ok:'Thầy rạch vết thương, đắp thuốc kịp thời. {n} khỏi sau mười hôm.',good:{suc:-6},die:'Cơn co giật kéo đến. Thầy cũng bó tay, {n} mất sau ba ngày.',cause:'chết vì uốn ván',kill:0.7}),
    care({l:'Đắp lá, nấu thuốc nam tại nhà',p:0.4,ok:'May sao bệnh tự lui sau mười ngày, {n} gầy rộc đi.',good:{suc:-14,hpMax:-1},die:'Hàm cắn chặt, người uốn cong. {n} mất sau ba ngày.',cause:'chết vì uốn ván',kill:0.75})]},
{id:'v63_k_vet_nhiem',t:'Vết thương mưng mủ',k:'Con trẻ',age:[5,17],w:1,cd:6,pcd:30,
 x:c=>`Vết xước ở tay ${N(c)} để mặc mấy hôm, nay sưng đỏ, nóng ran, kéo thành vệt đỏ lên cánh tay.`,
 o:[care({l:'Rạch mủ, rửa rượu, băng sạch',s:'Cách của người từng trải',p:0.88,ok:'Rạch mủ, rửa sạch, vết thương hết sưng dần.',good:{suc:-4},die:'Nhiễm trùng máu. {n} sốt li bì rồi mất.',cause:'mất vì nhiễm trùng máu',kill:0.6}),
    care({l:'Mời thầy thuốc xem vết thương',cost:10,p:0.95,ok:'Thầy cắt lọc, đắp thuốc. Một tuần sau lành hẳn.',die:'Đã nhiễm trùng máu. Thầy cũng bó tay.',cause:'mất vì nhiễm trùng máu',kill:0.6}),
    care({l:'Đắp lá thuốc, cúng giải hạn',p:0.6,ok:'Lá thuốc hiệu nghiệm, vết thương xẹp dần.',good:{suc:-9},die:'Nhiễm trùng máu. {n} sốt li bì rồi mất.',cause:'mất vì nhiễm trùng máu',kill:0.7})]},
{id:'v63_k_trau_long',t:'Trâu lồng',k:'Con trẻ',age:[8,15],w:0.9,cd:8,pcd:36,
 x:c=>`Con trâu bị ong đốt, lồng lên giữa bãi. ${N(c)} đang ngồi trên lưng, bị hất tung rồi quăng đi mấy trượng.`,
 o:[care({l:'Nằm sát đất, ôm đầu chờ trâu qua',p:0.78,e:48,spec:{vo:0.4,suc:0.6},ok:'Trâu giẫm sát bên mà không trúng. {n} run lẩy bẩy nhưng toàn vẹn.',good:{tam:-5,vo:1},die:'Móng trâu giáng xuống ngực. {n} không kịp kêu.',cause:'chết vì trâu húc giẫm',kill:0.5}),
    care({l:'Nhảy sang bờ ruộng, lăn xuống mương',p:0.52,e:28,spec:{vo:0.8,suc:0.2},ok:'Phản xạ nhanh, {n} lăn xuống mương thoát nạn. Dân làng khen can đảm.',good:{vo:2,fame:2},die:'Mương cạn, đá lởm chởm. {n} đập đầu bất tỉnh rồi mất.',cause:'chết vì trâu húc giẫm',kill:0.4})]},
{id:'v63_k_cuop_cho',t:'Đi chợ xa',k:'Con trẻ',age:[12,17],w:1.1,cd:8,pcd:30,c:c=>c.vo>=15,
 x:c=>`Chủ gia sai ${N(c)} gánh nông sản ra chợ xa bán. Đường tắt băng qua đồi vắng, đường lớn thì vòng thêm nửa ngày.`,
 o:[{l:'Đi cùng đoàn người buôn, theo đường lớn',s:'Chậm nhưng an toàn',f:c=>'Đi cùng đoàn, bán được giá vừa phải, về nhà an toàn.'+fx(c,{money:m(4),eq:1})},
    {l:'Băng đường tắt một mình cho kịp phiên',s:'Nhanh, nhiều lời, nhiều rủi ro',r:[{vo:0.6,eq:0.4},20],y:c=>'Chợ còn vắng, hàng bán hết ngay lúc đầu phiên với giá tốt.'+fx(c,{money:m(11),vo:1,eq:1,tam:3}),
      n:c=>chance(0.2)?kill(c,'bị cướp đường giết hại','Bị cướp chặn đường giữa đồi, giằng co hồi lâu rồi bị đâm.'):'Bị cướp chặn đường, mất sạch hàng và một trận đòn nhừ tử.'+fx(c,{money:-m(8),suc:-R(15,28),hpMax:-R(1,3),tam:-8})}]},
{id:'v63_k_vo_su',t:'Võ sư lưu lạc',k:'Con trẻ',age:[10,17],w:1,once:1,good:1,c:c=>c.vo>=22,
 x:c=>`Một võ sư lưu lạc dừng chân ở làng, mở lớp dạy quyền cho trẻ con. ${N(c)} đứng ngoài hàng rào nhìn mãi không rời.`,
 o:[{l:'Gửi con theo học một mùa, biếu lễ vật',s:'Tốn tiền, học nghiêm túc',c:()=>G.money()>=m(14),r:[{vo:0.5,suc:0.3,tri:0.2},38],y:c=>'Một mùa khổ luyện, thầy khen có căn cốt.'+fx(c,{money:-m(14),vo:R(5,8),suc:3,over:1}),n:c=>'Thầy khắt khe, {n} bị đòn roi và sai khớp vai.'.replace('{n}',N(c))+fx(c,{money:-m(14),vo:R(1,3),suc:-R(8,15),hpMax:-1})},
    {l:'Lén đứng ngoài hàng rào học lỏm',f:c=>'Học lỏm được mấy đường cơ bản.'+fx(c,{vo:R(1,3),tam:3})},
    {l:'Cấm không cho, sợ theo thói giang hồ',f:c=>fx(c,{tam:-5})}]},
{id:'v63_k_thay_do_quy',t:'Thầy đồ quý trò',k:'Con trẻ',age:[7,14],w:1,once:1,good:1,c:c=>c.tri>=35,
 x:c=>`Thầy đồ làng để ý ${N(c)} hay ở lại sau giờ học, hỏi những điều sách không dạy. Thầy gọi riêng người lớn ra nói chuyện.`,
 o:[{l:'Biếu lễ, xin thầy nhận làm học trò thân',s:'Tốn tiền, được dạy kỹ',c:()=>G.money()>=m(12),f:c=>'Thầy cho mượn sách quý, dạy riêng buổi tối.'+fx(c,{money:-m(12),tri:R(6,10),eq:2,over:1})},
    {l:'Cảm ơn thầy, để con học như mọi đứa',f:c=>fx(c,{tri:R(1,3)})},
    {l:'Cần con phụ việc đồng áng, từ chối',f:c=>'Tiếc, nhưng đồng ruộng cần người.'+fx(c,{money:m(3),tam:-5})}]},
{id:'v63_k_cao_nhan',t:'Cao nhân qua làng',k:'Kỳ ngộ',age:[8,16],ky:1,u:'person',w:1,good:1,
 x:c=>`Một đạo sĩ áo vá chằng chịu đi ngang, nhìn ${N(c)} mãi rồi hỏi người lớn: "Đứa nhỏ này có muốn theo lão học vài đường không?"`,
 o:[{l:'Gửi con theo học một mùa',s:'Có thể gặp thầy thật, có thể gặp kẻ lừa',r:[{tri:0.4,vo:0.3,duyen:0.5},30],y:c=>pick([`Thật là bậc cao nhân. Một mùa trôi qua, ${N(c)} trở về như đổi người.`,`Lão không nhận đồng bạc nào, chỉ dạy tận tâm rồi lại lên đường.`])+fx(c,{tri:R(4,8),vo:R(3,6),eq:R(2,4),over:1,sk:{muu:2}}),
      n:c=>'Hóa ra lão chỉ là kẻ giang hồ lừa gạt, lấy hết lương thực mang theo.'+fx(c,{money:-m(8),tam:-6,eq:1})},
    {l:'Mời ông về nhà đãi cơm, hỏi chuyện',s:'Tốn ít',c:()=>G.money()>=m(3),f:c=>'Lão kể chuyện giang hồ, chỉ cho vài bài tập thở.'+fx(c,{money:-m(3),suc:3,eq:2,tam:4})},
    {l:'Từ chối, sợ gặp kẻ lừa đảo',f:c=>fx(c,{tam:-2})}]},
{id:'v63_k_cuu_nguoi_giau',t:'Người lạ ngã ngựa',k:'Con trẻ',age:[9,17],w:0.9,once:1,good:1,
 x:c=>`${N(c)} thấy một người lạ ăn mặc sang trọng ngã bên đường, ngựa lồng chạy mất. Ông ta rên rỉ, chân gãy, xung quanh vắng người.`,
 o:[{l:'Chạy lại đỡ ông, đưa về nhà chữa chân',s:'Có thể được hậu tạ',r:[{eq:0.6,vo:0.4},22],y:c=>'Ông ta là thương nhân giàu có, cảm kích hết lời, hậu tạ rất hậu và mở lời kết thân.'+fx(c,{money:m(26),fame:R(3,6),cfame:1,eq:2}),n:c=>chance(0.05)?kill(c,'bị bọn cướp giết hại','Bọn cướp lẩn gần đó nhảy ra, bắt cả người đã ngã lẫn đứa trẻ thương tình.'):'Hóa ra có bọn cướp lẩn gần đó, hai người bị đánh một trận, hàng lễ mất sạch.'+fx(c,{suc:-R(12,22),money:-m(4),tam:-6})},
    {l:'Chạy về gọi người lớn đi giúp',f:c=>'Người lớn đi theo, đưa ông ta tới thầy thuốc. Ông ta tạ ơn một ít.'+fx(c,{money:m(6),fame:1})},
    {l:'Mặc kệ, quay đi',f:c=>fx(c,{tam:-2,eq:-1})}]},
{id:'v63_k_dau_tre_xom',t:'Trận quyền đầu làng',k:'Con trẻ',age:[10,17],w:1.1,cd:6,pcd:30,c:c=>c.vo>=22,
 x:c=>`Thằng cầm đầu đám trẻ làng bên chặn ${N(c)} giữa đường, đòi "thi quyền cho ra ngô ra khoai".`,
 o:[{l:'Nhận lời, đấu tay đôi',r:[{vo:0.7,suc:0.3},38],y:c=>'Thắng giòn giã! Từ đó trẻ làng bên không dám ho he, mấy đứa còn theo gọi bằng "anh".'+fx(c,{vo:R(2,4),fame:R(2,4),tam:6}),n:c=>chance(0.06)?kill(c,'bị đánh trọng thương','Bị đánh trúng chỗ hiểm, đổ gục xuống đường.'):'Thua đau, mặt mũi bầm dập, nằm mấy hôm.'+fx(c,{suc:-R(10,20),hpMax:-R(0,2),tam:-8,fame:-1})},
    {l:'Nhờ anh em đi cùng đối đầu',h:1,r:[{eq:0.6,vo:0.4},40],y:c=>'Thấy có người đi cùng, bọn kia nể mặt xin hòa.'+fx(c,{eq:2,tam:3}),n:c=>'Hai bên xô xát lớn.'+fx(c,{suc:-R(8,16),tam:-5})},
    {l:'Lùi bước, tránh chuyện',f:c=>fx(c,{tam:-5,fame:-1})}]},

/* ======================================================================
   PHẦN 2 · THẾ GIỚI
   ====================================================================== */
/* ---------- thiên tai theo vùng ---------- */
...(()=>{
const FLEE={l:'Dắt díu nhau chạy nạn sang nơi khác',s:'Bỏ ruộng bỏ nhà, giữ lấy mạng người',c:()=>!blkMove(),go:()=>V().fleePopup('Thiên tai đã đến mức không thể ở lại.')};
const dis=(k,t,intro,cause,extra)=>({id:'w63_dis_'+k,fixed:1,t,k:'Thiên tai',
 x:(c,d)=>`${intro} Thiên tai ở mức <b>${SEV[d.sev||2]}</b>.`,
 o:(c,d)=>{const sev=d.sev||2;
  const prep={l:'Dốc sức phòng tránh, cả nhà cùng làm',s:`Tốn khoảng ${fm(m(5*sev))}`,c:()=>G.money()>=m(5*sev),r:[{vo:0.3,tri:0.35,eq:0.35},DW(0.8-0.05*(sev-2),40)],
    y:c=>'Cả nhà chung sức, thiệt hại giữ ở mức thấp nhất.'+fx(c,{money:-m(5*sev),tam:-2,cfame:0.3})+sweep(0.008*sev,cause),
    n:c=>'Cố hết sức nhưng thiên tai quá lớn.'+fx(c,{money:-m(12*sev),tam:-6,suc:-R(4,10)})+sweep(0.04*sev,cause)};
  const idle={l:'Chịu trận, mong qua nhanh',f:c=>'Không chuẩn bị, mọi thứ trôi theo ý trời.'+fx(c,{money:-m(9*sev),tam:-8})+sweep(0.07*sev,cause)};
  return [prep].concat(extra(sev),[idle,FLEE])}});
return [
 dis('lu','Lũ lụt','Nước sông dâng cao, đê vỡ nhiều đoạn, nước tràn vào ruộng vườn.','bị nước lũ cuốn trôi',sev=>[
  {l:'Đưa cả nhà lên chùa trên đồi, mang theo thóc giống',s:'Mất nhà, giữ người và giống',r:[{tri:0.5,eq:0.5},DW(0.78,40)],y:c=>'Nước rút, nhà ngập đến mái nhưng người và thóc giống còn nguyên.'+fx(c,{money:-m(3*sev),tam:-3}),n:c=>'Đường lên đồi ngập, đi được nửa đường thì nước dâng.'+fx(c,{money:-m(9*sev),suc:-R(6,14),tam:-6})+sweep(0.06*sev,'bị nước lũ cuốn trôi')},
  {l:'Chèo thuyền cứu người kẹt trong nước',s:'Nguy hiểm nhưng được tiếng nghĩa hiệp',r:[{vo:0.6,suc:0.4},DW(0.5,49)],y:c=>'Cứu được cả xóm bốn năm người, được tạc ơn.'+fx(c,{fame:R(4,8),cfame:1,suc:-3}),n:c=>'Thuyền lật giữa dòng xoáy.'+fx(c,{suc:-R(12,22),hpMax:-1,fame:1})+sweep(0.05*sev,'bị nước lũ cuốn trôi')}]),
 dis('chau','Nạn châu chấu','Châu chấu kéo đến che kín trời, ruộng lúa bị gặm trơ gốc.','kiệt sức vì đói sau nạn châu chấu',sev=>[
  {l:'Rủ cả làng đốt lửa, gõ trống chiêng đuổi',r:[{eq:0.5,vo:0.5},DW(0.62,40)],y:c=>'Cả làng cùng đánh trống đốt lửa, cứu được nửa ruộng.'+fx(c,{fame:R(1,3),tam:2,cfame:0.5}),n:c=>'Châu chấu quá đông, lửa cũng không xua nổi.'+fx(c,{tam:-5,suc:-R(3,8)})},
  {l:'Bắt châu chấu rang bán, nuôi gà vịt',s:'Lấy lợi từ họa',f:c=>'Châu chấu rang giòn bán rất chạy, gà vịt béo ú.'+fx(c,{money:m(3+2*sev),tam:1})}]),
 dis('han','Đại hạn','Mấy tháng không một giọt mưa, ruộng nứt nẻ, giếng cạn dần.','kiệt sức vì đói khát trong nạn hạn',sev=>[
  {l:'Đào giếng sâu, tát nước từ sông xa',s:'Tốn công và tiền',c:()=>G.money()>=m(4*sev),r:[{suc:0.5,vo:0.5},DW(0.65,52)],y:c=>'Tìm được mạch nước, cả xóm đến xin xách nước.'+fx(c,{money:-m(4*sev),fame:R(2,4),suc:-4}),n:c=>'Giếng đào khô không thấy nước, người kiệt sức.'+fx(c,{money:-m(4*sev),suc:-R(8,16),tam:-5})},
  {l:'Làm lễ cầu mưa cùng cả làng',s:'Chỉ có tinh thần',f:c=>pick(['Cả làng đội nắng cầu mưa. Ba hôm sau trời đổ mưa nhỏ, ai cũng cho là linh ứng.','Cầu mưa mãi mà trời vẫn xanh ngắt.'])+fx(c,{cfame:0.8,tam:3})}]),
 dis('bao','Bão biển','Bão đổ bộ, sóng cuốn thuyền bè và mái nhà, gió giật cấp mười hai.','bị bão cuốn',sev=>[
  {l:'Gia cố nhà cửa, neo chặt thuyền bè',s:`Tốn khoảng ${fm(m(6*sev))}`,c:()=>G.money()>=m(6*sev),r:[{tri:0.5,vo:0.5},DW(0.72,42)],y:c=>'Gia cố đúng lúc, cơn bão đi qua, nhà vẫn đứng vững.'+fx(c,{money:-m(6*sev),tam:-2}),n:c=>'Gió quá mạnh, mái bị lật.'+fx(c,{money:-m(14*sev),tam:-6})+sweep(0.04*sev,'bị bão cuốn')},
  {l:'Cùng dân chài ra bờ kéo thuyền, cứu người khỏi sóng',s:'Rủi ro, được tiếng',r:[{vo:0.6,suc:0.4},DW(0.55,49)],y:c=>'Cứu được thuyền và hai người dân chài, được cả xóm quý trọng.'+fx(c,{fame:R(4,8),suc:-5}),n:c=>'Sóng lớn cuốn chân.'+fx(c,{suc:-R(12,24),hpMax:-1})+sweep(0.06*sev,'bị bão cuốn')}]),
 dis('cat','Bão cát','Bão cát phủ kín ốc đảo và đường thương đạo, mặt trời tối sầm.','nghẹt thở trong bão cát',sev=>[
  {l:'Lùa súc vật vào hầm, bít kín nhà bằng chiếu ướt',c:()=>G.money()>=m(3*sev),r:[{tri:0.6,eq:0.4},DW(0.78,40)],y:c=>'Bão cát đi qua, nhà vẫn nguyên vẹn, người vật bình an.'+fx(c,{money:-m(3*sev),tam:-1}),n:c=>'Cát lọt vào mọi khe hở, súc vật chết ngạt.'+fx(c,{money:-m(10*sev),tam:-5})+sweep(0.04*sev,'nghẹt thở trong bão cát')},
  {l:'Mở nhà cho đoàn thương nhân trú chân',s:'Lấy nghĩa, nhận lễ',f:c=>'Thương nhân tạ ơn bằng nhiều tặng vật, còn kể cho nghe tin tức từ xa.'+fx(c,{money:m(3+3*sev),fame:R(2,4),cfame:0.5})}]),
 dis('lam','Dịch lam chướng','Sương độc từ rừng sâu tràn xuống, người ốm hàng loạt, ho ra máu, nóng rét luân phiên.','chết vì lam chướng',sev=>[
  {l:'Mời thầy thuốc, đốt ngải, dựng lều cách ly',s:`Tốn khoảng ${fm(m(7*sev))}`,c:()=>G.money()>=m(7*sev),r:[{tri:0.5,eq:0.5},DW(0.72,40)],y:c=>'Cách ly kịp thời, chỉ vài người nhẹ bị sốt.'+fx(c,{money:-m(7*sev),tam:-2,cfame:0.5}),n:c=>'Dịch quá hung hãn, ai cũng sốt.'+fx(c,{money:-m(7*sev),suc:-R(8,16),tam:-6})+sweep(0.06*sev,'chết vì lam chướng')},
  {l:'Vào rừng hái thuốc quý, bán giá cao',s:'Liều, lời lớn',r:[{vo:0.5,suc:0.5},DW(0.5,52)],y:c=>'Hái được nhiều thuốc quý, thương nhân tranh nhau mua.'+fx(c,{money:m(8+5*sev),suc:-6}),n:c=>'Bị lam chướng thấm vào người.'+fx(c,{suc:-R(15,28),hpMax:-R(1,3)})+sweep(0.04*sev,'chết vì lam chướng')}]),
 dis('tuyet','Bão tuyết','Tuyết phủ trắng thảo nguyên, gió rít như dao cắt, gia súc chết cóng hàng đàn.','chết cóng trong bão tuyết',sev=>[
  {l:'Dồn củi, nhốt gia súc vào nhà, cả nhà ngủ chung',s:`Tốn khoảng ${fm(m(4*sev))}`,c:()=>G.money()>=m(4*sev),r:[{suc:0.5,tri:0.5},DW(0.78,54)],y:c=>'Cả nhà quây quần bên bếp lửa, qua được mùa rét.'+fx(c,{money:-m(4*sev),tam:1}),n:c=>'Củi cạn trước khi tuyết ngớt.'+fx(c,{money:-m(8*sev),suc:-R(6,14),tam:-5})+sweep(0.05*sev,'chết cóng trong bão tuyết')},
  {l:'Làm thịt gia súc yếu, ướp muối để dành',s:'Mất gia súc nhưng có lương thực',f:c=>'Thịt ướp muối đủ nuôi cả nhà cho tới khi tuyết tan.'+fx(c,{money:-m(3*sev),tam:-3})+sweep(0.02*sev,'chết cóng trong bão tuyết')}])]})(),

/* ---------- chiến sự ---------- */
{id:'w63_giac_tran',fixed:1,t:'Giặc tràn tới',k:'Chiến sự',
 x:()=>{const w=S().war;const foe=w&&w.enemy&&G.D.NAT[w.enemy]?G.D.NAT[w.enemy].n:'quân giặc';return `Hỏa hào báo động liên hồi. Quân ${esc(foe)} đã vượt biên, tiến thẳng về phía vùng đất của nhà mình. Dân làng nháo nhác.`},
 o:()=>[
  {l:'Góp lương, góp người cùng dân binh giữ làng',s:`Tốn khoảng ${fm(m(14))}`,c:()=>G.money()>=m(14),r:[{vo:0.5,eq:0.5},DW(0.6,40)],y:c=>'Dân binh đẩy lui toán giặc tiền trạm, làng được yên vài tháng.'+fx(c,{money:-m(14),fame:R(4,8),cfame:2,tam:2}),n:c=>'Dân binh không cầm cự nổi, làng bị cướp phá một phen.'+fx(c,{money:-m(14+22),suc:-R(8,16),tam:-8})+sweep(0.07,'chết vì giặc cướp phá')},
  {l:'Đem già trẻ lên núi ẩn, giấu thóc dưới hầm',s:'Mất mùa nhưng giữ người',c:()=>G.money()>=m(5),r:[{tri:0.5,eq:0.5},DW(0.78,40)],y:c=>'Giặc đi qua, lùng sục không thấy gì, người vật còn đủ.'+fx(c,{money:-m(8),tam:-4}),n:c=>'Giặc lùng sục tìm ra hầm thóc.'+fx(c,{money:-m(24),tam:-8})+sweep(0.05,'chết vì giặc cướp phá')},
  {l:'Hiến lương cho quân triều đình',s:'Được tiếng, con em ra quân dễ lập công',c:()=>G.money()>=m(12),f:c=>{alive().filter(p=>p.job==='quan_ngu').forEach(p=>{p.merit+=R(2,6)});return 'Quan quân nhận lương, ghi tên vào sổ hiến nghĩa.'+fx(c,{money:-m(12),fame:R(3,6),cfame:2})}},
  {l:'Ở lại giữ nhà, cầu may',s:'Rủi ro nhất',f:c=>pick([0,0,1])?'Toán giặc đi qua rồi tản đi nơi khác, nhà vẫn nguyên.'+fx(c,{tam:-8}):'Giặc ập vào cướp phá, đốt nhà.'+fx(c,{money:-m(28),suc:-R(10,22),tam:-12})+sweep(0.14,'chết vì giặc cướp phá')},
  {l:'Chạy nạn về nơi khác',s:'Bỏ ruộng bỏ nhà, giữ lấy mạng người',c:()=>!blkMove(),go:()=>V().fleePopup('Giặc đã tràn tới tận làng.')}]},
{id:'w63_chay_loan',fixed:1,t:'Loạn quân kéo qua',k:'Chiến sự',
 x:()=>`Loạn quân kéo qua đốt phá làng bên, tin đồn đến tối là tới nhà mình. Dân làng khóc lóc, người bỏ chạy, người đóng cửa then cài.`,
 o:()=>[
  {l:'Chạy ngay, bỏ cả nhà cửa lại',s:'Giữ lấy mạng người',c:()=>!blkMove(),go:()=>V().fleePopup('Loạn quân sắp đến.')},
  {l:'Cùng dân làng dựng chướng ngại giữ cổng làng',r:[{vo:0.5,eq:0.5},DW(0.5,40)],y:c=>'Loạn quân thấy khó đánh, rẽ sang hướng khác.'+fx(c,{fame:R(3,6),cfame:1.5,suc:-4}),n:c=>'Loạn quân đông, cổng làng bị phá.'+fx(c,{money:-m(26),suc:-R(10,20),tam:-9})+sweep(0.1,'chết vì loạn quân')},
  {l:'Đút lót cho đầu mục, xin tha nhà mình',s:`Tốn khoảng ${fm(m(10))}`,c:()=>G.money()>=m(10),r:[{eq:1},DW(0.65,40)],y:c=>'Đầu mục nhận lễ, đánh dấu nhà vào sổ "đã nộp", quân dưới không dám đụng.'+fx(c,{money:-m(10),tam:-3}),n:c=>'Nhận lễ rồi mà vẫn để thuộc hạ cướp.'+fx(c,{money:-m(10+14),tam:-8})}]},
{id:'w63_thue_luong',fixed:1,t:'Thuế binh',k:'Chiến sự',
 x:()=>`Quan huyện sai lính về thu "thuế binh" và lương thực cho quân tiền tuyến. Cả xóm xì xào.`,
 o:()=>{const sons=alive().filter(p=>G.inClan(p)&&p.g==='nam'&&age(p)>=16&&age(p)<=35&&!p.away&&!G.isHead(p)&&p.job!=='quan'&&p.job!=='quan_ngu');return [
  {l:'Nộp đủ thuế, không để quan lính ghét',s:`Tốn khoảng ${fm(m(10))}`,c:()=>G.money()>=m(10),f:c=>'Nộp đủ, quan huyện ghi vào sổ "dân lương thiện".'+fx(c,{money:-m(10),cfame:0.5})},
  {l:'Đút lót lý trưởng nộp nửa',r:[{eq:1},DW(0.6,40)],y:c=>'Lý trưởng nhận lễ, ghi nửa số thuế cho qua.'+fx(c,{money:-m(5)}),n:c=>'Bị tố ra, quan huyện phạt nặng.'+fx(c,{money:-m(18),fame:-3,suc:-R(4,10)})},
  ...(sons.length?[{l:`Cho ${esc(sons[0].given)} tòng quân thay thuế`,s:'Được miễn thuế, con em đi lính',f:c=>{const p=sons[0];G.enlist(p,false);return `${esc(p.given)} nhận chiếu, ra doanh trại. Nhà được miễn thuế binh năm nay.`+fx(c,{cfame:1,tam:-3})}}]:[]),
  {l:'Trốn lên rừng, mặc lính lùng sục',r:[{vo:0.4,tri:0.4,eq:0.2},DW(0.55,40)],y:c=>'Lính lục soát không thấy, đành bỏ đi.'+fx(c,{tam:-4}),n:c=>'Bị bắt, phải nộp gấp đôi.'+fx(c,{money:-m(20),fame:-2,suc:-R(4,10)})}]}},
{id:'w63_ti_nan',fixed:1,t:'Dân tị nạn',k:'Chiến sự',
 x:()=>`Từng đoàn dân tị nạn từ vùng chiến sự kéo đến, đói rách, trẻ con khóc ngằn ngặt. Họ đứng trước cổng xin ăn, xin chỗ trú.`,
 o:()=>[
  {l:'Cưu mang, nấu cháo phát chẩn',s:`Tốn khoảng ${fm(m(10))}, có thể kéo theo bệnh`,c:()=>G.money()>=m(10),f:c=>{S().epiRisk=Math.max(S().epiRisk||0,0.25);return 'Nồi cháo to treo trước cổng suốt mấy hôm. Cả vùng truyền tai nhau tiếng tốt.'+fx(c,{money:-m(10),fame:R(5,9),cfame:2,tam:3})}},
  {l:'Cho trú tạm nhưng thu tiền thuê chỗ',f:c=>'Chỗ trú bán đắt như vàng.'+fx(c,{money:m(7),fame:-3,cfame:-1,tam:-2})},
  {l:'Đóng cổng, không cho vào',f:c=>'Tiếng khóc van vẳng nghe mãi không dứt.'+fx(c,{fame:-2,tam:-3})}]},
/* ---------- đường xa ---------- */
{id:'w63_duong_xa',fixed:1,t:'Việc dọc đường',k:'Đường xa',
 x:(c,d)=>{d.inc=d.inc||pick(['cuop','om','bao','quy','tram']);
   const mo=d.mo||3;
   return {cuop:`Cả nhà lên đường được hơn một tháng thì đến đoạn đèo vắng. Xe bò chậm, tiếng vó ngựa dồn từ phía sau: có toán cướp theo dấu.`,
    om:`Hành trình kéo dài ${mo} tháng. Đường dài, ăn uống thất thường, trời mưa mãi. Giữa đường, có người trong nhà ngã bệnh.`,
    bao:`Cả nhà đi tới con sông lớn. Mưa đầu nguồn khiến nước dâng cuồn cuộn, chuyến đò bị hoãn.`,
    quy:`Dọc đường, đoàn nhà mình gặp một đoàn thương nhân đi cùng hướng, thái độ cởi mở, hỏi han chuyện đường xa.`,
    tram:`Trạm thuế đặt chắn ngang đường, lính canh sách nhiễu đủ điều: thuế qua đèo, thuế xe, phí "lệ mở cổng".`}[d.inc]},
 o:(c,d)=>({
  cuop:[{l:'Thuê đoàn hộ tống đi cùng',s:`Tốn khoảng ${fm(m(8))}`,c:()=>G.money()>=m(8),f:c=>'Đoàn hộ tống dẹp toán cướp, nhà mình an toàn tới nơi.'+fx(c,{money:-m(8)})},
   {l:'Chống cự, đánh trả',r:[{vo:0.6,eq:0.4},DW(0.55,40)],y:c=>'Đẩy lui toán cướp, được cả nhà kính phục.'+fx(c,{fame:3,suc:-5}),n:c=>'Bị đánh tơi tả, mất hết hành lý.'+fx(c,{money:-m(20),suc:-R(12,24),tam:-8})+sweep(0.05,'chết vì cướp đường')},
   {l:'Nộp tiền mãi lộ, xin được đi tiếp',f:c=>'Cướp lấy tiền rồi để đi.'+fx(c,{money:-m(12),tam:-5})}],
  om:[{l:'Dừng lại nghỉ ở trạm trọ, mời thầy thuốc',s:`Tốn khoảng ${fm(m(10))}`,c:()=>G.money()>=m(10),r:[{eq:1},DW(0.8,40)],y:c=>'Nghỉ ba hôm, người bệnh khỏi, đi tiếp.'+fx(c,{money:-m(10)}),n:c=>'Bệnh nặng thêm dù đã dừng chân.'+fx(c,{money:-m(14),suc:-R(8,16)})+sweep(0.1,'mất giữa đường đi nạn')},
   {l:'Cố đi tiếp cho tới nơi',s:'Rủi ro',f:c=>'Đành cắn răng đi nốt.'+fx(c,{suc:-R(4,10),tam:-5})+sweep(0.18,'mất giữa đường đi nạn')}],
  bao:[{l:'Chờ nước rút ở bến, tốn thêm lương ăn',f:c=>'Chờ năm hôm, nước rút mới qua sông được.'+fx(c,{money:-m(6)})},
   {l:'Liều thuê đò qua ngay',r:[{vo:0.5,tri:0.5},DW(0.55,40)],y:c=>'Qua sông an toàn, tiết kiệm mấy ngày đường.'+fx(c,{money:-m(3),fame:1}),n:c=>'Đò chao đảo, hành lý rơi xuống nước.'+fx(c,{money:-m(18),tam:-8})+sweep(0.08,'chết đuối giữa dòng')}],
  quy:[{l:'Đi cùng đoàn thương nhân, học hỏi',s:'An toàn, biết thêm nhiều chuyện',f:c=>{const L=V().routes63().filter(r=>r.prov&&Object.keys(r.sell).length);const r=L.length?pick(L):null;const g=r?pick(Object.keys(r.sell)):null;return 'Đoàn thương nhân nhiệt tình chỉ đường, kể nhiều chuyện làm ăn.'+(r&&g?` Họ nói ở ${esc(G.D.PROV[r.prov].n)}, ${esc(G.GOODS[g].n.toLowerCase())} bán giá gấp ${r.sell[g]} lần chỗ nhà mình.`:'')+fx(c,{eq:1,tam:3,fame:1})}},
   {l:'Giữ khoảng cách, tự đi một mình',f:c=>fx(c,{tam:-1})}],
  tram:[{l:'Nộp đủ cho qua',f:c=>'Nộp đủ, quan lính vẫy tay cho đi.'+fx(c,{money:-m(8)})},
   {l:'Mặc cả, tìm người quen nói giúp',r:[{eq:1},DW(0.6,40)],y:c=>'Xin được giảm gần nửa.'+fx(c,{money:-m(4),fame:1}),n:c=>'Quan lính nổi cáu, phạt thêm.'+fx(c,{money:-m(14),tam:-5})}]}[d.inc])},
/* ---------- họ khác ---------- */
{id:'w63_ho_qua',fixed:1,t:'Láng giềng đến chơi',k:'Họ khác',
 x:(c,d)=>{const cl=V().w_clan(d.p,d.cl);return cl?`Gia chủ họ ${esc(cl.sur)} là ${esc(cl.head.given)}, người ${cl.head.tr}, mang lễ sang thăm nhà mình, hỏi han chuyện làm ăn trong vùng.`:'Một người hàng xóm sang chơi.'},
 o:(c,d)=>{const cl=V().w_clan(d.p,d.cl);if(!cl)return [{l:'Tiếp khách',f:()=>''}];const cost=m(1+cl.fame/70);return [
  {l:'Nhận lễ và đáp lễ tương xứng',s:`Tốn khoảng ${fm(cost)}`,c:()=>G.money()>=cost,f:c=>{cl.rel=Math.min(100,cl.rel+11);cl.last=S().t;return `Đáp lễ đủ đầy, hai bên chén tạc chén thù.`+fx(c,{money:-cost,fame:1,tam:3})}},
  {l:'Nhận lễ, mời trà thân mật',f:c=>{cl.rel=Math.min(100,cl.rel+5);cl.last=S().t;return 'Hai bên nói chuyện vui vẻ.'+fx(c,{tam:2})}},
  {l:'Khéo từ chối, bảo bận việc',f:c=>{cl.rel=Math.max(-100,cl.rel-4);return 'Khách ra về, ánh mắt không mấy vui.'+fx(c,{tam:-1})}}]}},
{id:'w63_ho_canh_tranh',fixed:1,t:'Họ khác tranh khách',k:'Họ khác',
 x:(c,d)=>{const cl=V().w_clan(d.p,d.cl);return cl?`Họ ${esc(cl.sur)} cũng ${G.D.NOTE63.jobN[cl.job]} trong vùng, dạo này hạ giá, chèo kéo khách quen của nhà mình.`:'Có kẻ tranh khách.'},
 o:(c,d)=>{const cl=V().w_clan(d.p,d.cl);if(!cl)return [{l:'Bỏ qua',f:()=>''}];return [
  {l:'Hạ giá giữ khách',s:`Tốn khoảng ${fm(m(8))}`,c:()=>G.money()>=m(8),r:[{eq:0.4,tri:0.6},DW(0.62,40)],y:c=>{cl.wealth=Math.max(2,cl.wealth-6);return 'Giữ được khách, còn kéo thêm vài mối của họ.'+fx(c,{money:m(6),fame:2})},n:c=>'Hạ giá mà khách vẫn bỏ sang họ.'+fx(c,{money:-m(12),tam:-4})},
  {l:'Đến bàn chuyện chia khu vực làm ăn',r:[{eq:1},DW(0.58,40)],y:c=>{cl.rel=Math.min(100,cl.rel+14);return 'Hai họ thống nhất chia địa bàn, lợi cả đôi bên.'+fx(c,{money:m(8),fame:1})},n:c=>{cl.rel=Math.max(-100,cl.rel-3);return 'Họ nhìn nhà mình cười khẩy.'+fx(c,{tam:-3})}},
  {l:'Tung tin đồn xấu, phá hoại làm ăn của họ',s:'Có thể thành thù oán',r:[{tri:1},DW(0.5,42)],y:c=>{cl.wealth=Math.max(2,cl.wealth-10);cl.rel=Math.max(-100,cl.rel-20);cl.feud=1;return 'Khách của họ dần bỏ đi. Hai họ trở thành kẻ thù.'+fx(c,{money:m(10),fame:-2})},n:c=>{cl.rel=Math.max(-100,cl.rel-30);cl.feud=1;return 'Bị vạch mặt giữa chợ, cả vùng xì xào.'+fx(c,{fame:-8,cfame:-1,tam:-8})}},
  {l:'Làm ngơ, ai làm nấy ăn',f:c=>'Mất vài mối khách.'+fx(c,{money:-m(3)})}]}},
{id:'w63_ho_tranh_chap',fixed:1,t:'Tranh chấp với láng giềng',k:'Họ khác',
 x:(c,d)=>{const cl=V().w_clan(d.p,d.cl);return cl?`Họ ${esc(cl.sur)} tranh chấp ${pick(['ranh giới thửa ruộng','con mương dẫn nước','lối đi chung','cây đa đầu ngõ'])} với nhà mình. Hai bên đều không chịu nhường.`:'Có tranh chấp.'},
 o:(c,d)=>{const cl=V().w_clan(d.p,d.cl);if(!cl)return [{l:'Bỏ qua',f:()=>''}];return [
  {l:'Nhường một phần để giữ hòa khí',s:`Mất khoảng ${fm(m(5))}`,f:c=>{cl.rel=Math.min(100,cl.rel+12);return 'Hai bên giảng hòa, dân làng khen nhà mình rộng lượng.'+fx(c,{money:-m(5),fame:2})}},
  {l:'Kiện lên lý trưởng phân xử',s:`Tốn khoảng ${fm(m(6))}`,c:()=>G.money()>=m(6),r:[{eq:0.6,tri:0.4},DW(cl.fame>S().fame?0.52:0.6,40)],y:c=>{cl.rel=Math.max(-100,cl.rel-10);return 'Lý trưởng phân xử có lợi cho nhà mình.'+fx(c,{money:m(2),fame:2})},n:c=>{cl.rel=Math.max(-100,cl.rel-6);return 'Lý trưởng xử thiên vị họ kia.'+fx(c,{money:-m(12),fame:-2,tam:-6})}},
  {l:'Đưa người nhà ra dọa nạt',s:'Có thể thành thù oán',r:[{vo:1},DW(0.5,38)],y:c=>{cl.rel=Math.max(-100,cl.rel-25);cl.feud=1;return 'Họ nhượng bộ, nhưng ghi hận.'+fx(c,{fame:1,tam:2})},n:c=>{cl.rel=Math.max(-100,cl.rel-30);cl.feud=1;return 'Hai bên xô xát, nhà mình chịu thiệt.'+fx(c,{suc:-R(8,18),fame:-3,tam:-6})}}]}},
{id:'w63_ho_gia_nan',fixed:1,t:'Láng giềng gặp nạn',k:'Họ khác',
 x:(c,d)=>{const cl=V().w_clan(d.p,d.cl);return cl?`Họ ${esc(cl.sur)} gặp hoạn nạn: ${pick(['cháy mất nhà bếp','mất trâu cày','người trụ cột ốm nặng','vỡ nợ vì buôn thua'])}. Cả xóm bàn tán, chưa ai ra tay giúp.`:'Có người gặp nạn.'},
 o:(c,d)=>{const cl=V().w_clan(d.p,d.cl);if(!cl)return [{l:'Bỏ qua',f:()=>''}];return [
  {l:'Mang gạo tiền sang giúp tận tình',s:`Tốn khoảng ${fm(m(8))}`,c:()=>G.money()>=m(8),f:c=>{cl.rel=Math.min(100,cl.rel+22);cl.wealth=Math.min(100,cl.wealth+8);cl.last=S().t;G.later(c,'w63_ho_tra_on',R(12,36),{cl:cl.id,p:d.p});return `Họ ${esc(cl.sur)} cảm kích, cả xóm khen nhà mình tử tế.`+fx(c,{money:-m(8),fame:R(2,4),cfame:0.5,tam:3})}},
  {l:'Chỉ hỏi thăm, góp ít gạo',s:`Tốn khoảng ${fm(m(2))}`,c:()=>G.money()>=m(2),f:c=>{cl.rel=Math.min(100,cl.rel+8);return 'Chút lòng thơm thảo cũng đủ ấm lòng.'+fx(c,{money:-m(2),fame:1})}},
  {l:'Nhân cơ hội mua rẻ đồ đạc, ruộng đất của họ',s:'Được lợi, mất tiếng',f:c=>{cl.rel=Math.max(-100,cl.rel-24);cl.wealth=Math.max(2,cl.wealth-10);return 'Mua được món hời, nhưng ai cũng biết nhà mình thừa nước đục thả câu.'+fx(c,{money:m(12),fame:-4,cfame:-1})}},
  {l:'Làm ngơ',f:c=>{cl.rel=Math.max(-100,cl.rel-6);return fx(c,{fame:-1})}}]}},
{id:'w63_ho_tra_on',fixed:1,t:'Báo đáp ân nghĩa',k:'Họ khác',
 x:(c,d)=>{const cl=V().w_clan(d.p,d.cl);return cl?`Họ ${esc(cl.sur)}, nay đã làm ăn khấm khá lại, mang lễ sang tạ ơn nhà mình đã giúp lúc hoạn nạn.`:'Một người hàng xóm sang tạ ơn.'},
 o:(c,d)=>{const cl=V().w_clan(d.p,d.cl);return [
  {l:'Nhận lễ tạ, mời họ ở lại dùng cơm',f:c=>{if(cl)cl.rel=Math.min(100,cl.rel+14);return 'Tình nghĩa hai nhà thêm khắng khít.'+fx(c,{money:m(14),fame:2,tam:5})}},
  {l:'Từ chối lễ, chỉ nhận tấm lòng',f:c=>{if(cl)cl.rel=Math.min(100,cl.rel+22);return 'Họ cảm động, cả vùng truyền tai nhau tiếng tốt.'+fx(c,{fame:R(4,7),cfame:1,tam:4})}}]}},
{id:'w63_ho_hoi_lang',fixed:1,t:'Mời dự đám',k:'Họ khác',
 x:(c,d)=>{const cl=V().w_clan(d.p,d.cl);return cl?`Họ ${esc(cl.sur)} mời nhà mình dự ${pick(['đám cưới con trai','đám giỗ lớn','tiệc mừng thượng thọ','lễ mừng nhà mới'])}. Khách khứa trong vùng sẽ có mặt đông đủ.`:'Có người mời dự đám.'},
 o:(c,d)=>{const cl=V().w_clan(d.p,d.cl);if(!cl)return [{l:'Bỏ qua',f:()=>''}];return [
  {l:'Cả nhà đi dự, mừng đàng hoàng',s:`Tốn khoảng ${fm(m(5))}`,c:()=>G.money()>=m(5),f:c=>{cl.rel=Math.min(100,cl.rel+10);return 'Bàn tiệc rôm rả, gặp được nhiều người có tiếng trong vùng.'+fx(c,{money:-m(5),fame:R(1,3),tam:4,eq:1})}},
  {l:'Cử một người đại diện đi dự',s:`Tốn khoảng ${fm(m(2))}`,c:()=>G.money()>=m(2),f:c=>{cl.rel=Math.min(100,cl.rel+4);return 'Cũng đủ lễ nghĩa.'+fx(c,{money:-m(2)})}},
  {l:'Viện cớ bận, không đi',f:c=>{cl.rel=Math.max(-100,cl.rel-5);return fx(c,{fame:-1})}}]}},
{id:'w63_ho_xin_vay',fixed:1,t:'Láng giềng xin vay',k:'Họ khác',
 x:(c,d)=>{const cl=V().w_clan(d.p,d.cl);d.amt=d.amt||m(R(10,22));return cl?`Gia chủ họ ${esc(cl.sur)}, người ${cl.head.tr}, sang xin vay <b>${fm(d.amt)}</b>, hẹn trả sau vài tháng có kèm lãi.`:'Có người xin vay.'},
 o:(c,d)=>{const cl=V().w_clan(d.p,d.cl);if(!cl)return [{l:'Từ chối',f:()=>''}];const amt=d.amt;const pr=clamp(0.82-(cl.head.tr==='tham lam'?0.25:0)-(cl.head.tr==='hẹp hòi'?0.1:0)+(cl.head.tr==='chính trực'?0.1:0)+(cl.wealth-50)/300,0.35,0.95);
  return [
  {l:'Cho vay đủ số',s:`Cho vay ${fm(amt)}`,c:()=>G.money()>=amt,f:c=>{cl.rel=Math.min(100,cl.rel+8);G.later(c,'w63_ho_tra_no',R(6,14),{cl:cl.id,p:d.p,amt,ok:chance(pr)?1:0});return 'Ghi vào sổ nợ, hẹn ngày trả.'+fx(c,{money:-amt})}},
  {l:'Cho vay một nửa',s:`Cho vay ${fm(Math.round(amt/2))}`,c:()=>G.money()>=amt/2,f:c=>{cl.rel=Math.min(100,cl.rel+3);const a2=Math.round(amt/2);G.later(c,'w63_ho_tra_no',R(6,14),{cl:cl.id,p:d.p,amt:a2,ok:chance(pr)?1:0});return 'Họ hơi mất mặt, nhưng cũng nhận.'+fx(c,{money:-a2})}},
  {l:'Từ chối khéo',f:c=>{cl.rel=Math.max(-100,cl.rel-8);return 'Họ ra về, mặt không vui.'+fx(c,{tam:-1})}}]}},
{id:'w63_ho_tra_no',fixed:1,t:'Đến hạn trả nợ',k:'Họ khác',
 x:(c,d)=>{const cl=V().w_clan(d.p,d.cl);return cl?(d.ok?`Đến hạn, họ ${esc(cl.sur)} mang đủ cả gốc lẫn lãi sang trả.`:`Đến hạn, họ ${esc(cl.sur)} sang xin khất, kể khổ làm ăn thua lỗ, chưa có tiền trả.`):'Đến hạn trả nợ.'},
 o:(c,d)=>{const cl=V().w_clan(d.p,d.cl);const amt=d.amt||m(10);
  if(d.ok)return [{l:'Nhận đủ, mời họ chén trà',f:c=>{if(cl)cl.rel=Math.min(100,cl.rel+6);return 'Trả đủ, giữ chữ tín.'+fx(c,{money:Math.round(amt*1.12),fame:1,tam:2})}}];
  return [
  {l:'Cho khất thêm, tính lãi',f:c=>{if(cl)cl.rel=Math.min(100,cl.rel+3);G.later(c,'w63_ho_tra_no',R(6,12),{cl:d.cl,p:d.p,amt:Math.round(amt*1.05),ok:chance(0.55)?1:0});return 'Hẹn thêm kỳ nữa.'}},
  {l:'Đòi gắt, đưa người đến nhà',r:[{vo:0.5,eq:0.5},DW(0.55,40)],y:c=>{if(cl)cl.rel=Math.max(-100,cl.rel-18);return 'Họ cắn răng gom tiền trả, hận nhà mình.'+fx(c,{money:Math.round(amt*0.9),fame:-1})},n:c=>{if(cl){cl.rel=Math.max(-100,cl.rel-30);cl.feud=1}return 'Họ cạn tiền thật, còn thành thù oán.'+fx(c,{money:Math.round(amt*0.3),fame:-4,tam:-4})}},
  {l:'Xóa nợ để giữ nghĩa',f:c=>{if(cl)cl.rel=Math.min(100,cl.rel+25);return 'Họ cảm động nghẹn lời, cả vùng truyền tai nhau tiếng tốt.'+fx(c,{fame:R(4,7),cfame:1,tam:3})}}]}},
{id:'w63_ho_ket_than',fixed:1,t:'Ngỏ ý kết thông gia',k:'Họ khác',
 x:(c,d)=>{const cl=V().w_clan(d.p,d.cl);return cl?`Họ ${esc(cl.sur)}, ${cl.fame>=150?'một danh gia trong vùng':cl.fame>=70?'một nhà có tiếng':'một nhà thường dân'}, nhờ người ướm lời muốn kết thông gia với nhà mình.`:'Có người ngỏ lời.'},
 o:(c,d)=>{const cl=V().w_clan(d.p,d.cl);if(!cl)return [{l:'Hẹn dịp khác',f:()=>''}];return [
  {l:'Bàn chuyện hôn sự',s:'Xem ai trong nhà hợp tuổi',go:()=>V().w_wed(cl.id)},
  {l:'Hẹn dịp khác',f:c=>{cl.rel=Math.min(100,cl.rel+2);return fx(c,{tam:0})}},
  {l:'Khéo từ chối',f:c=>{cl.rel=Math.max(-100,cl.rel-6);return fx(c,{tam:-1})}}]}},
/* ---------- tin tức từ xa ---------- */
{id:'w63_tin_xa',fixed:1,t:'Thương nhân đường xa',k:'Tin từ xa',
 x:(c,d)=>`Một thương nhân phong trần ghé nhà xin nghỉ chân. Ông ta vừa từ ${pick(['phương bắc','phương nam','miền biển','vùng sa mạc','kinh đô'])} xuống, kể ra rả những chuyện chưa ai trong vùng biết.`,
 o:(c,d)=>[
  {l:'Mời bữa cơm, nghe ông kể',s:`Tốn khoảng ${fm(m(2))}`,c:()=>G.money()>=m(2),f:c=>{
    const W=S().w;const tips=[];
    const L=V().routes63().filter(r=>r.prov&&Object.keys(r.sell).length&&!r.war);
    L.forEach(r=>Object.keys(r.sell).forEach(g=>tips.push({r,g,v:r.sell[g]})));
    tips.sort((a,b)=>b.v-a.v);
    const hot=tips.slice(0,4);
    const tens=Object.keys(W.ten).filter(i=>(W.ph[i]||0)>=1);
    const msgs=[];
    if(hot.length){const t=pick(hot);msgs.push(`Ở ${esc(G.D.PROV[t.r.prov].n)}, ${esc(G.GOODS[t.g].n.toLowerCase())} bán giá gấp ${t.v} lần chỗ nhà mình, đường đi chừng ${t.r.mo} tháng.`)}
    if(tens.length){const i=pick(tens);const b=G.D.BORDER[i];msgs.push(`${esc(G.D.NAT[b[0]].n)} và ${esc(G.D.NAT[b[1]].n)} đang căng thẳng ở biên giới, đừng đi qua đó.`)}
    if(W.dis.length){const d0=pick(W.dis);msgs.push(`Nghe nói ${esc(G.D.DIS[d0.k].n.toLowerCase())} đang hoành hành ở ${esc(d0.provs.map(p=>G.D.PROV[p].n).join(', '))}.`)}
    if(!msgs.length)msgs.push('Nhìn chung các nơi đều yên ổn, giá cả khá đều.');
    return 'Ông ta kể: '+msgs.join(' ')+fx(c,{money:-m(2),tri:1,eq:1})}},
  {l:'Mua ít hàng lạ của ông ta',s:`Tốn khoảng ${fm(m(8))}, có thể bị lừa`,c:()=>G.money()>=m(8),r:[{tri:0.6,eq:0.4},DW(0.6,40)],y:c=>{const g=pick(['huong','ngoc','traichau','to','duoc']);const q=Math.max(1,Math.round(m(8)/(G.GOODS[g].p*0.8)));const k=G.kho();k[g]=(k[g]||0)+q;return `Mua được ${q} ${G.GOODS[g].u} ${esc(G.GOODS[g].n.toLowerCase())} với giá rất hời, cất vào kho.`+fx(c,{money:-m(8)})},n:c=>'Hàng hóa toàn đồ giả, mất tiền oan.'+fx(c,{money:-m(8),tam:-3})},
  {l:'Cho nghỉ chân rồi tiễn đi',f:c=>fx(c,{tam:1})}]}
];
});
