/* Bách Niên Thế Gia v6.3.1 · lô A: người mang tin từ xa, họ khác, quân ngũ
   Mỗi sự kiện có điều kiện riêng (vùng, mùa, cấp bậc, thời chiến hay thời bình) để không lệch bối cảnh. */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc,age}=G;
const S=()=>G.S();
const m=v=>G.mm(v);
const N=c=>esc(c.given);
const PR=c=>c.g==='nữ'?'chị':'anh';
const fm=v=>G.fmtMoney(v);
const V=()=>G._v63;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const DW=(p,e)=>Math.round(e-9*Math.log(p/(1-p)));
const QN=['quan_ngu'];
const reg=()=>S().region;
const kind=()=>{const P=G.D.PROV[S().loc&&S().loc.p];return P?P.k:'lang'};
const alert=()=>{const w=S().w;return !!S().war||!!(w&&w.ph&&Object.values(w.ph).some(v=>v>=1))};
const tense=()=>{const w=S().w;return !!(w&&w.ph&&Object.values(w.ph).some(v=>v>=2))};
const busy=(c,mo)=>{c.busyUntil=Math.max(c.busyUntil||0,S().t+mo);return ''};
/* mẩu tin hữu ích: giá cao ở nơi khác, nơi căng thẳng, thiên tai đang xảy ra. Mỗi người đưa tin chọn loại tin mình biết rõ */
function tips(kinds){
  const W=S().w;const msgs=[];
  if(kinds.includes('gia')){
    const L=V().routes63().filter(r=>r.prov&&Object.keys(r.sell).length&&!r.war);const t=[];
    L.forEach(r=>Object.keys(r.sell).forEach(g=>t.push({r,g,v:r.sell[g]})));t.sort((a,b)=>b.v-a.v);
    if(t.length){const x=pick(t.slice(0,4));msgs.push(`Ở ${esc(G.D.PROV[x.r.prov].n)}, ${esc(G.GOODS[x.g].n.toLowerCase())} bán giá gấp ${x.v} lần chỗ nhà mình, đường đi chừng ${x.r.mo} tháng.`)}}
  if(kinds.includes('bien')){
    const tens=Object.keys(W.ten).filter(i=>(W.ph[i]||0)>=1);
    if(tens.length){const b=G.D.BORDER[pick(tens)];msgs.push(`${esc(G.D.NAT[b[0]].n)} và ${esc(G.D.NAT[b[1]].n)} đang căng thẳng ở biên giới, đường qua đó nên tránh.`)}}
  if(kinds.includes('tai')){
    if(W.dis.length){const d0=pick(W.dis);msgs.push(`${esc(G.D.DIS[d0.k].n)} đang hoành hành ở ${esc(d0.provs.map(p=>G.D.PROV[p].n).join(', '))}.`)}}
  if(!msgs.length)msgs.push('Nhìn chung các nơi đều yên ổn, giá cả khá đều.');
  return msgs.join(' ')}
const coastal=()=>['cang','phu'].includes(kind())||reg()==='dong';

return [
/* ======================================================================
   NGƯỜI MANG TIN TỪ XA (mỗi loại một kiểu, nhận tin khác nhau)
   ====================================================================== */
{id:'w631_su_hanh_cuoc',fixed:1,t:'Người chạy thư',k:'Tin từ xa',
 x:c=>`Một người chạy thư đeo ống tre, chân bê bết bùn, ghé nhà xin hớp nước. Ông ta mang thư thuê giữa các huyện, đi khắp vùng nên biết nhiều chuyện đường sá.`,
 o:c=>[
  {l:'Cho nghỉ chân, mời bát cơm',s:`Tốn khoảng ${fm(m(1))}`,c:()=>G.money()>=m(1),f:c=>'Ông ta vừa ăn vừa kể: '+tips(['gia','bien'])+fx(c,{money:-m(1),tri:1})},
  {l:'Nhờ gửi một lá thư cho họ hàng xa',s:`Tốn khoảng ${fm(m(2))}`,c:()=>G.money()>=m(2),f:c=>'Thư được nhận lời gửi. Mấy tháng sau có hồi âm báo tin bình an.'+fx(c,{money:-m(2),tam:4})},
  {l:'Cho nước uống rồi tiễn đi',f:c=>fx(c,{tam:1})}]},
{id:'w631_linh_tram',fixed:1,t:'Lính trạm dừng ngựa',k:'Tin từ xa',
 c:()=>['kinh','phu','bien'].includes(kind())||alert(),
 x:c=>`Một lính trạm phi ngựa qua, đóng tạm ở quán đầu ngõ vì ngựa đã mệt. Anh ta mang công văn của huyện và nghe đủ thứ tin trên đường.`,
 o:c=>[
  {l:'Đãi chén rượu, hỏi chuyện triều đình',s:`Tốn khoảng ${fm(m(2))}`,c:()=>G.money()>=m(2),f:c=>'Anh ta hạ giọng: '+tips(['bien','tai'])+fx(c,{money:-m(2),tri:1,eq:1})},
  {l:'Nhờ xem hộ lệnh sắp ban xuống làng',r:[{tri:0.4,eq:0.6,fame:0.3},DW(0.5,45)],y:c=>'Anh ta hé cho biết huyện sắp có đợt thu thuế, nhà mình kịp liệu trước.'+fx(c,{tri:1,tam:2}),n:c=>'Anh ta gạt đi, bảo việc quan không được nói.'+fx(c,{tam:-1})},
  {l:'Chào hỏi qua loa',f:c=>''}]},
{id:'w631_thay_lang_rong',fixed:1,t:'Thầy lang rong',k:'Tin từ xa',
 x:c=>`Một thầy lang rong gánh thuốc ghé xóm, rao bán cao đơn hoàn tán. Đi nhiều nơi nên ông biết bệnh gì đang lan ở đâu.`,
 o:c=>[
  {l:'Mua ít thuốc dự phòng',s:`Tốn khoảng ${fm(m(3))}`,c:()=>G.money()>=m(3),r:[{tri:0.6,eq:0.4},DW(0.7,45)],y:c=>'Thuốc thật, dùng được cho cả nhà.'+fx(c,{money:-m(3),suc:R(2,5)}),n:c=>'Thuốc pha phèn, chẳng chữa được gì.'+fx(c,{money:-m(3),tam:-2})},
  {l:'Hỏi thăm tình hình dịch bệnh',f:c=>'Ông nói: '+tips(['tai'])+(S().epi?' Mùa này bệnh còn dai, nhà nên giữ vệ sinh, nấu chín uống sôi.':' Thời tiết này khá yên, vẫn nên đề phòng khi giao mùa.')+fx(c,{tri:1})},
  {l:'Mời thăm bệnh cho người ốm trong nhà',s:`Tốn khoảng ${fm(m(4))}`,c:()=>G.money()>=m(4)&&G.alive().some(p=>G.inClan(p)&&p.suc<60),f:c=>{const v=G.alive().filter(p=>G.inClan(p)).sort((a,b)=>a.suc-b.suc)[0];return `Ông bắt mạch cho ${esc(v.given)}, kê vài thang thuốc.`+fx(v,{suc:R(6,12)})+fx(c,{money:-m(4)})}},
  {l:'Không cần',f:c=>''}]},
{id:'w631_nguoi_hat_rong',fixed:1,t:'Người hát rong',k:'Tin từ xa',
 x:c=>`Một người hát rong ôm đàn ghé sân đình, hát vè kể chuyện thiên hạ, từ vụ kiện ở phủ đến chuyện giặc ngoài biên. Dân làng kéo đến nghe đông.`,
 o:c=>[
  {l:'Thưởng tiền để nghe hết bài',s:`Tốn khoảng ${fm(m(1))}`,c:()=>G.money()>=m(1),f:c=>'Bài vè kể chuyện: '+tips(['bien','tai','gia'])+fx(c,{money:-m(1),tam:5})},
  {l:'Mời về nhà hát cho cả nhà nghe',s:`Tốn khoảng ${fm(m(2))}`,c:()=>G.money()>=m(2),f:c=>'Cả nhà quây quần, tiếng cười lâu rồi mới có.'+fx(c,{money:-m(2),tam:10})+G.fxAll({tam:3})},
  {l:'Đứng nghe ở ngoài rồi về',f:c=>fx(c,{tam:2})}]},
{id:'w631_chu_thuyen',fixed:1,t:'Chủ thuyền ghé bến',k:'Tin từ xa',
 c:()=>coastal()||['cang','phu'].includes(kind()),
 x:c=>`Một chủ thuyền buôn cập bến, cho thuyền nghỉ vài ngày chờ nước. Ông ta đi dọc sông biển nên nắm giá hàng nhiều nơi.`,
 o:c=>[
  {l:'Mời uống trà, hỏi giá hàng các nơi',s:`Tốn khoảng ${fm(m(2))}`,c:()=>G.money()>=m(2),f:c=>'Ông chủ thuyền nói: '+tips(['gia','tai'])+fx(c,{money:-m(2),tri:1,eq:1})},
  {l:'Hỏi mua lại hàng dư trên thuyền',s:`Tốn khoảng ${fm(m(6))}`,c:()=>G.money()>=m(6),r:[{tri:0.5,eq:0.5},DW(0.6,45)],y:c=>{const g=pick(['muoi','duong','che','bong']);const q=Math.max(1,Math.round(m(6)/(G.GOODS[g].p*0.85)));const k=G.kho();k[g]=(k[g]||0)+q;return `Mua được ${q} ${G.GOODS[g].u} ${esc(G.GOODS[g].n.toLowerCase())} giá rẻ hơn chợ, cất vào kho.`+fx(c,{money:-m(6)})},n:c=>'Hàng ẩm mốc, chủ thuyền đã bán xong từ trước, chỉ còn đồ ế.'+fx(c,{money:-m(3),tam:-2})},
  {l:'Chào hỏi rồi thôi',f:c=>''}]},

/* ======================================================================
   HỌ KHÁC: thêm vài kiểu việc xóm giềng (do hệ thống họ khác gọi ra)
   ====================================================================== */
{id:'w631_ho_muon_trau',fixed:1,t:'Mượn trâu cày',k:'Họ khác',
 c:c=>G.S().farm.own>0||G.S().farm.rent>0||G.alive().some(p=>p.job==='nong'),
 x:(c,d)=>{const cl=V().w_clan(d.p,d.cl);return cl?`Đến vụ cày, ${esc(G.cname(cl))} có trâu bị ốm, sang hỏi mượn trâu nhà mình vài ngày, hứa đổi công gặt.`:'Có người sang mượn trâu.'},
 o:(c,d)=>{const cl=V().w_clan(d.p,d.cl);if(!cl)return [{l:'Cho mượn',f:()=>''}];return [
  {l:'Cho mượn, hẹn đổi công gặt',f:c=>{cl.rel=Math.min(100,cl.rel+9);cl.last=S().t;return 'Hai nhà đổi công, mùa gặt có thêm người phụ.'+fx(c,{money:m(1),fame:1,tam:2})}},
  {l:'Cho mượn nhưng tính tiền thuê',f:c=>{cl.rel=Math.min(100,cl.rel+2);return 'Họ nhận, mặt hơi sượng nhưng vẫn cảm ơn.'+fx(c,{money:m(2)})}},
  {l:'Từ chối vì đang cần dùng',f:c=>{cl.rel=Math.max(-100,cl.rel-6);return 'Họ ra về, đi hỏi nhà khác.'+fx(c,{tam:-1})}}]}},
{id:'w631_ho_gop_dinh',fixed:1,t:'Góp tiền sửa đình',k:'Họ khác',
 x:(c,d)=>{const cl=V().w_clan(d.p,d.cl);return cl?`${esc(G.cnameU(cl))} đứng ra quyên góp sửa ${pick(['mái đình','cây cầu đầu làng','con đường ra chợ','giếng làng'])}. Các nhà trong vùng đều được hỏi ý.`:'Có người quyên góp.'},
 o:(c,d)=>{const cl=V().w_clan(d.p,d.cl);if(!cl)return [{l:'Bỏ qua',f:()=>''}];const hi=m(4+S().fame/60);return [
  {l:'Góp hậu, ghi tên lên bia',s:`Tốn khoảng ${fm(hi)}`,c:()=>G.money()>=hi,f:c=>{cl.rel=Math.min(100,cl.rel+10);return 'Tên nhà mình khắc trên bia đá, dân làng nể trọng.'+fx(c,{money:-hi,fame:R(3,6),cfame:1})}},
  {l:'Góp vừa phải',s:`Tốn khoảng ${fm(m(1.5))}`,c:()=>G.money()>=m(1.5),f:c=>{cl.rel=Math.min(100,cl.rel+4);return 'Đủ nghĩa với xóm giềng.'+fx(c,{money:-m(1.5),fame:1})}},
  {l:'Góp công thay vì góp tiền',f:c=>{cl.rel=Math.min(100,cl.rel+5);return 'Mấy người nhà ra phụ khiêng gạch, được khen chăm chỉ.'+fx(c,{suc:-2,fame:1})}},
  {l:'Viện cớ nhà đang khó',f:c=>{cl.rel=Math.max(-100,cl.rel-4);return fx(c,{fame:-1})}}]}},
{id:'w631_ho_dua_dam',fixed:1,t:'Họ khác mời kết bạn hàng',k:'Họ khác',
 c:c=>['tieuphu','hangrong','tieunhi','chu','tho','det','tieu'].some(j=>G.alive().some(p=>p.job===j)),
 x:(c,d)=>{const cl=V().w_clan(d.p,d.cl);return cl?`Gia chủ ${esc(G.cname(cl))}, người ${cl.head.tr}, ngỏ ý hợp sức nhập hàng chung để mua được giá sỉ, chia lãi theo vốn.`:'Có người rủ hùn hàng.'},
 o:(c,d)=>{const cl=V().w_clan(d.p,d.cl);if(!cl)return [{l:'Từ chối',f:()=>''}];const pr=clamp(0.78-(cl.head.tr==='tham lam'?0.28:0)+(cl.head.tr==='chính trực'?0.1:0)+(cl.rel/400),0.3,0.92);return [
  {l:'Hùn vốn đủ phần',s:`Tốn khoảng ${fm(m(6))}`,c:()=>G.money()>=m(6),r:[{eq:0.5,tri:0.5},DW(pr,50)],y:c=>{cl.rel=Math.min(100,cl.rel+12);return 'Mua được giá sỉ, chia lãi đúng hẹn.'+fx(c,{money:Math.round(m(6)*0.35),fame:1})},n:c=>{cl.rel=Math.max(-100,cl.rel-12);return 'Họ giữ sổ mập mờ, chia ít hơn thỏa thuận.'+fx(c,{money:-m(4),tam:-3})}},
  {l:'Hùn nửa phần để thử',s:`Tốn khoảng ${fm(m(3))}`,c:()=>G.money()>=m(3),f:c=>{cl.rel=Math.min(100,cl.rel+4);return 'Lãi ít mà an tâm.'+fx(c,{money:m(1)})}},
  {l:'Từ chối khéo',f:c=>{cl.rel=Math.max(-100,cl.rel-3);return ''}}]}},

/* ======================================================================
   QUÂN NGŨ · thời bình: tập luyện, canh gác, võ cử. Phần lớn có chiến công
   ====================================================================== */
{id:'qn631_dien_vo',t:'Diễn võ cuối năm',job:QN,sea:['dong'],c:c=>!G.war(),w:1.2,pcd:12,
 x:c=>`Cuối năm doanh trại mở hội diễn võ, tướng quân ngồi xem, ai thắng được thưởng. ${N(c)} ghi tên.`,
 o:c=>[
  {l:'Thi đấu quyền cước',r:[{vo:1,suc:0.4},DW(0.55,55)],y:c=>'Hạ liền ba đối thủ, được tướng quân ban thưởng.'+fx(c,{merit:R(10,20),fame:R(3,6),money:m(4),vo:1}),yy:c=>'Vô địch cả doanh, ai cũng khâm phục!'+fx(c,{merit:R(25,40),fame:R(8,14),money:m(10),vo:2}),n:c=>'Thua sớm, bầm dập nhưng không nản.'+fx(c,{suc:-R(4,10),merit:2})},
  {l:'Thi bắn cung',r:[{vo:0.5,tri:0.3,suc:0.2},DW(0.5,55)],y:c=>'Ba mũi đều trúng hồng tâm.'+fx(c,{merit:R(8,16),fame:3,money:m(3)}),n:c=>'Gió lệch, trượt cả ba mũi.'+fx(c,{tam:-3})},
  {l:'Chỉ xem, cổ vũ đồng đội',f:c=>'Hội vui, chẳng được gì ngoài tiếng cười.'+fx(c,{tam:6,merit:1})}]},
{id:'qn631_gac_kho',t:'Canh kho lương',job:QN,c:c=>c.lv<=3,w:1,pcd:18,
 x:c=>`Đêm tới phiên ${N(c)} canh kho lương. Một viên thư lại lén bảo "cho xin hai bao gạo, hao hụt mùa này nhiều lắm, không ai biết đâu".`,
 o:c=>[
  {l:'Từ chối, giữ nghiêm quy củ',f:c=>'Sáng ra viên thư lại hậm hực, nhưng đốc kho nghe chuyện, ghi nhận sự liêm chính.'+fx(c,{merit:R(4,8),fame:2,eq:1})},
  {l:'Báo cho chỉ huy',r:[{eq:0.5,tri:0.5},DW(0.6,50)],y:c=>'Bắt quả tang cả đường dây xà xẻo quân lương.'+fx(c,{merit:R(14,26),fame:R(5,9),money:m(4)}),n:c=>'Chỉ huy cũng dính vào, chuyển '+PR(c)+' đi gác chòi xa.'+fx(c,{tam:-6,merit:-2})},
  {l:'Nhắm mắt cho qua, nhận chút phần',f:c=>chance(0.25)?'Bị đốc kho phát giác, đánh roi và trừ công.'+fx(c,{suc:-8,merit:-8,fame:-6}):'Lặng lẽ có thêm ít tiền.'+fx(c,{money:m(3),fame:-1})}]},
{id:'qn631_gac_ai',t:'Đêm gác ải',job:QN,c:c=>alert()||['bien'].includes(kind()),w:1.1,pcd:12,
 x:c=>`Trên chòi canh ải, ${N(c)} thấy lửa lạ le lói phía bên kia biên giới. ${tense()?'Trong doanh ai cũng biết quân đối phương đang dồn về.':'Có thể chỉ là dân chăn nuôi, cũng có thể là tiền quân do thám.'}`,
 o:c=>[
  {l:'Phát hiệu lệnh báo động ngay',r:[{tri:0.6,vo:0.3},DW(0.55,55)],y:c=>'Báo kịp, cả ải đề phòng. Địch không dám tiến, rút đi trong sáng.'+fx(c,{merit:R(16,28),fame:R(4,8)}),n:c=>'Báo nhầm, cả doanh nhốn nháo cả đêm.'+fx(c,{tam:-4,merit:-2})},
  {l:'Cử một tổ nhỏ ra dò xét',r:[{vo:0.6,tri:0.4},DW(0.55,55)],y:c=>'Dò ra đúng là toán trinh sát, bắt sống một tên.'+fx(c,{merit:R(12,22),fame:4}),n:c=>'Tổ dò xét bị chặn đánh, lui về với vài vết thương.'+fx(c,{suc:-R(8,16),merit:3})},
  {l:'Chờ trời sáng mới báo',f:c=>'Sáng ra mới biết là đoàn người chăn gia súc. May không sao.'+fx(c,{merit:1})}]},
{id:'qn631_ho_tong',t:'Hộ tống sứ đoàn',job:QN,c:c=>c.lv>=1&&!G.war(),w:0.8,pcd:36,
 x:c=>`Triều đình cử sứ đoàn đi qua biên ải, cần một toán lính hộ tống. Đội trưởng chọn ${N(c)} đi cùng.`,
 o:c=>[
  {l:'Nhận lệnh, đi suốt chặng',f:c=>{busy(c,3);return 'Đi trọn ba tháng đường, sứ đoàn an toàn. Sứ thần ghi tên người hộ tống tận tụy.'+fx(c,{merit:R(14,24),fame:R(4,8),money:m(6),eq:1})}},
  {l:'Xin ở lại, nhường người khác',f:c=>fx(c,{tam:1})}]},
{id:'qn631_dep_loan_doi',t:'Dẹp dân đói nổi loạn',job:QN,c:c=>c.lv>=1&&!!G.S().disaster,w:0.9,pcd:30,
 x:c=>`Sau thiên tai, dân đói kéo nhau đập kho thóc của nhà giàu. Quan huyện xin quân ra giữ trật tự. ${N(c)} đứng trong hàng quân, đối diện những gương mặt gầy guộc.`,
 o:c=>[
  {l:'Làm đúng lệnh, giải tán bằng roi gậy',f:c=>'Đám đông tan, mấy người bị thương. Quan khen có kỷ luật nhưng lòng người nặng trĩu.'+fx(c,{merit:R(8,14),fame:-2,tam:-6})},
  {l:'Xin đầu quan cho phát chẩn thay vì đàn áp',r:[{eq:0.6,khau:0.5,fame:0.3},DW(0.45,50)],y:c=>'Quan huyện nghe theo, mở kho phát chẩn. Đám đông tản đi, không đổ máu.'+fx(c,{merit:R(14,22),fame:R(6,10),tam:6}),n:c=>'Bị mắng là xen vào việc quan, phạt trượng.'+fx(c,{suc:-8,merit:-3,tam:-5})},
  {l:'Lặng lẽ để dân lấy ít thóc rồi giả như không thấy',f:c=>chance(0.4)?'Bị đốc quân biết, đánh roi và trừ công.'+fx(c,{suc:-10,merit:-8,fame:-3}):'Không ai hay. Dân mang ơn, nhưng '+PR(c)+' biết mình vừa phạm lệnh.'+fx(c,{fame:3,tam:2,merit:-1})}]},
{id:'qn631_dong_don',t:'Mùa đông đóng quân',job:QN,sea:['dong'],c:c=>reg()==='bac'||reg()==='tay'||kind()==='bien',w:1,pcd:24,
 x:c=>`Gió buốt thổi qua doanh trại. Củi khan, áo chăn thiếu. Vài đồng đội ho sù sụ, có người sốt run.`,
 o:c=>[
  {l:'Chia áo chăn cho đồng đội ốm',f:c=>'Đồng đội khỏi bệnh dần, cả đội xem '+PR(c)+' như người nhà.'+fx(c,{suc:-4,eq:1,merit:R(3,6),fame:2})},
  {l:'Đi chặt củi ngoài rừng dù trời rét',r:[{suc:0.6,vo:0.3},DW(0.6,55)],y:c=>'Mang về đủ củi sưởi cả doanh qua mùa.'+fx(c,{merit:R(6,12),suc:-3,fame:2}),n:c=>'Lạnh cóng, ngã bệnh suốt tuần.'+fx(c,{suc:-R(10,18)})},
  {l:'Giữ ấm cho mình trước',f:c=>chance(0.35)?'Đồng đội thấy, quay lưng lạnh nhạt.'+fx(c,{eq:-1,tam:-4}):fx(c,{suc:2})}]},
{id:'qn631_bat_tu_binh',t:'Bắt tù binh',job:QN,c:()=>!!G.war(),w:1,pcd:18,
 x:c=>`Sau trận, ${N(c)} áp giải một toán tù binh địch bị thương. Đồng đội xì xào đòi giết cho hả giận, người khác bảo nên giữ để đổi tù.`,
 o:c=>[
  {l:'Giữ nguyên lệnh, giao nộp đủ số tù binh',f:c=>'Chỉ huy ghi nhận kỷ luật, tù binh được dùng đổi lấy người của mình.'+fx(c,{merit:R(10,18),fame:3})},
  {l:'Cho nước và băng bó vết thương',r:[{eq:0.7,tri:0.3},DW(0.6,50)],y:c=>'Một tù binh cảm kích, tiết lộ nơi địch cất lương. Tin đó giúp quân thắng một trận.'+fx(c,{merit:R(22,36),fame:R(5,9)}),n:c=>'Đồng đội chê mềm lòng, mắng cả buổi.'+fx(c,{eq:1,tam:-3,merit:2})},
  {l:'Mặc kệ đồng đội xử trí',f:c=>'Đêm đó có tiếng la hét. Sáng ra '+PR(c)+' không dám nhìn ai.'+fx(c,{tam:-8,eq:-1})}]},
{id:'qn631_tien_phong',t:'Chọn mũi tiên phong',job:QN,c:c=>!!G.war()&&c.lv>=1,w:1.2,pcd:12,
 x:c=>`Chủ tướng cần một toán đánh mũi tiên phong phá cổng ải địch. Người sống sót thường được trọng thưởng, nhưng ít ai sống sót. ${N(c)} là một ${['binh sĩ','ngũ trưởng','thập trưởng','bách hộ','thiên hộ','phó tướng','tướng quân','đại tướng quân'][c.lv]||'quân nhân'} có tiếng gan dạ.`,
 o:c=>[
  {l:'Xung phong dẫn mũi tiên phong',r:[{vo:1,suc:0.5,tri:0.2},DW(0.5,55)],y:c=>'Phá được cổng ải, mở đường cho đại quân.'+fx(c,{merit:R(40,70),fame:R(12,20),money:m(12)}),yy:c=>'Một mình leo lên cổng, chém đứt dây thòng lọng, cả ải thất thủ!'+fx(c,{merit:R(90,140),fame:R(25,40),money:m(30),lv:1}),n:c=>'Quân tiên phong bị chặn đánh tơi tả, trở về với một nửa số người.'+fx(c,{suc:-R(25,42),hpMax:-R(2,5),merit:6,lethal:chance(0.5)?1:0}),nn:c=>'Bị vây giữa cổng ải, thương tích đầy mình.'+fx(c,{suc:-R(45,65),hpMax:-R(5,9),lethal:1})},
  {l:'Xin theo hậu quân yểm trợ',f:c=>'Hậu quân bắn tên yểm trợ, lập công nhỏ.'+fx(c,{merit:R(10,18),fame:3})}]},
{id:'qn631_vo_cu',t:'Tiến cử thi võ cử',job:QN,c:c=>c.vo>=70&&c.lv>=1&&c.lv<=4&&!G.war()&&!c.flags.voCu,w:0.7,pcd:60,
 x:c=>`Tướng quân trong doanh thấy ${N(c)} võ nghệ hơn người, muốn tiến cử đi thi võ cử ở kinh thành. Đỗ thì được bổ chức riêng, trượt thì uổng phí cả mấy tháng.`,
 o:c=>[
  {l:'Nhận lời đi thi',s:'Vắng mấy tháng',r:[{vo:1,tri:0.4,suc:0.3},DW(0.5,55)],y:c=>{c.flags.voCu=1;c.flags.voDo=1;busy(c,4);return 'Đỗ võ cử, tên được báo về cả doanh. Tướng quân cất nhắc ngay.'+fx(c,{merit:R(40,70),fame:R(15,25),lv:1})},yy:c=>{c.flags.voCu=1;c.flags.voDo=1;busy(c,4);return 'Đỗ đầu bảng võ cử, triều đình ban thưởng hậu!'+fx(c,{merit:R(90,130),fame:R(30,45),money:m(40),lv:2})},n:c=>{busy(c,4);return 'Vào đến vòng cuối thì trượt. Về doanh, '+PR(c)+' luyện thêm, hẹn kỳ sau.'+fx(c,{merit:5,tam:-5})}},
  {l:'Từ chối, ở lại doanh',f:c=>{c.flags.voCu=1;return fx(c,{tam:-1})}}]},
{id:'qn631_day_tan_binh',t:'Dạy lính mới',job:QN,c:c=>c.lv>=2&&!G.war(),w:0.9,pcd:18,
 x:c=>`Doanh trại vừa nhận một đợt tân binh gầy gò vụng về. Thượng cấp giao ${N(c)} kèm cặp họ.`,
 o:c=>[
  {l:'Kiên nhẫn chỉ từng động tác',r:[{eq:0.5,vo:0.4,khau:0.3},DW(0.65,50)],y:c=>'Sau vài tháng, tốp tân binh đứng hàng ngay ngắn. Cấp trên khen.'+fx(c,{merit:R(10,18),fame:3,eq:1}),n:c=>'Tân binh còn lóng ngóng, mấy người bỏ trốn.'+fx(c,{tam:-4,merit:2})},
  {l:'Nghiêm khắc, dùng roi tre',f:c=>'Lính sợ nên tập nghiêm, nhưng oán khí âm ỉ.'+fx(c,{merit:R(6,10),eq:-1})},
  {l:'Giao lại cho người khác',f:c=>''}]},
{id:'qn631_nghi_phep_que',t:'Phép về quê',job:QN,c:c=>!G.war()&&c.merit>=10,w:0.9,pcd:24,
 x:c=>`Doanh trại cho nghỉ phép dịp ${pick(['giỗ tổ','tết','mùa gặt'])}. ${N(c)} nhớ nhà.`,
 o:c=>[
  {l:'Về thăm nhà cả tháng',f:c=>{busy(c,1);return (c.spouse||G.kidsOf(c).some(k=>G.inClan(k)&&k.dead==null)?'Cha mẹ, vợ con mừng khôn xiết. ':'Cha mẹ mừng khôn xiết. ')+PR(c)[0].toUpperCase()+PR(c).slice(1)+' mang về ít tiền lương.'+fx(c,{tam:16,suc:4,money:m(5)})+G.fxAll({tam:3})}},
  {l:'Về chớp nhoáng, quay lại sớm để nhận việc',f:c=>'Chỉ ở nhà vài ngày, nhưng cấp trên để ý sự chuyên cần.'+fx(c,{tam:6,merit:R(3,6)})},
  {l:'Ở lại doanh luyện thêm',f:c=>fx(c,{vo:1,merit:R(2,4)})}]},
{id:'qn631_phat_dong_don',t:'Đồn điền quân',job:QN,c:c=>!G.war()&&['xuan','ha'].includes(G.season()),w:1,pcd:18,
 x:c=>`Thời bình, quân được chia ruộng đồn điền để tự túc lương thực. Tới vụ cấy, ${N(c)} được cử ra ruộng.`,
 o:c=>[
  {l:'Chăm chỉ làm lụng',f:c=>'Vụ ấy lúa tốt, cả đội có thêm khẩu phần.'+fx(c,{merit:R(4,8),suc:1,money:m(1)})},
  {l:'Đề xuất đào mương dẫn nước',r:[{tri:0.5,eq:0.4,ky:0.2},DW(0.55,50)],y:c=>'Mương xong, năm ấy được mùa, đội đồn điền được thưởng.'+fx(c,{merit:R(10,18),fame:3,tri:1}),n:c=>'Đào sai chỗ, tốn công vô ích.'+fx(c,{tam:-3,suc:-3})},
  {l:'Lười biếng trốn việc',f:c=>chance(0.4)?'Bị bắt gặp, phạt trượng.'+fx(c,{suc:-6,merit:-3}):''}]},

]
});
