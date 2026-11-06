/* Bách Niên Thế Gia v6.3.5 · danh gia vọng tộc theo nơi ở
   Mỗi nơi có một hai danh gia; bốn thế gia lớn hùng cứ bốn nơi. Chuyện chỉ xảy ra khi nhà họ ở ngay nơi mình sống ("tại nơi")
   hoặc ở gần (trong hai tháng đường, "ở gần"). Hai loại này khác nhau: ở ngay đó thì qua lại, dự đám, tranh chấp, nhờ vả;
   ở xa hơn thì thư từ, sứ giả đi ngang, tin đồn, bạn hàng. Mọi sự kiện do G._v633 (houseTick) phát, không vào bốc ngẫu nhiên. */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc,age,alive}=G;
const S=()=>G.S();
const m=v=>G.mm(v);
const fm=v=>G.fmtMoney(v);
const V=()=>G._v633;
const N=c=>esc(c.given);
const I=d=>V().hinfo(d.hr);
const DW=(p,e)=>Math.round(e-9*Math.log(p/(1-p)));
/* tiền lễ theo thân phận nhà họ, nhưng có trần theo túi tiền nhà mình để không vỡ quỹ */
const cost=(i,frac,cap)=>Math.max(m(1),Math.min(Math.round(V().giftNorm(i.fame,i.wealth)*frac),m(cap)));
const HG=(hg,o)=>Object.assign({fixed:1,k:'Danh gia',hg,hw:1,hcd:48},o);
const HGK=(hg,o)=>Object.assign({fixed:1,k:'Kỳ ngộ',ky:1,good:1,u:'person',hg,hw:0.5,hcd:200},o);
const nope=[{l:'Bỏ qua',f:()=>''}];
const GD=d=>d.good==null?(d.good=chance(0.55)?1:0):d.good;
const best=(arr,f)=>arr.slice().sort((a,b)=>f(b)-f(a))[0];
/* người trong nhà có thể ra mặt (đủ lớn, không đi xa) */
const able=()=>G.home().filter(p=>age(p)>=14&&!p.away&&p.dead==null);

/* nhờ vả tùy nghề của nhà họ */
const ASK={
 vo:['mượn vài trai tráng khỏe mạnh đi hộ tống một chuyến hàng quý','nhờ nhà mình cho mượn xe và lương khô cho đội tuần đêm'],
 quan:['nhờ nhà mình làm chứng cho một văn tự quan trọng','nhờ nhà mình đứng ra bảo lãnh cho người họ hàng đang xin chức'],
 hoc:['nhờ viết bài văn bia cho cụ tổ','nhờ giới thiệu một thầy giỏi dạy riêng cho con cháu'],
 buon:['nhờ góp một phần vốn cho chuyến hàng đường xa','nhờ giới thiệu bạn hàng quen trong vùng'],
 thuoc:['nhờ tìm giúp một vị thuốc quý hiếm','nhờ cho mượn mảnh vườn trồng dược liệu mùa này'],
 tho:['nhờ cho mượn thợ giỏi hoàn thành một đơn hàng gấp','nhờ cho mượn lò, xưởng vài ngày'],
 nong:['nhờ cho mượn trâu bò cày vụ này','nhờ chia bớt giống lúa tốt']};
/* thứ họ gửi qua khách đi ngang, tùy nghề */
const GIVE={
 vo:{t:'một thanh đoản đao rèn từ thép tốt',s:'vo'},quan:{t:'một tập án lệ chép tay',s:'tri'},hoc:{t:'một bộ sách quý chép tay',s:'tri'},
 buon:{t:'một cuốn sổ ghi giá hàng các chợ',s:'eq'},thuoc:{t:'một túi thuốc quý và cuốn y thư cũ',s:'suc'},tho:{t:'một bộ đồ nghề khéo',s:'vo'},nong:{t:'một túi giống lạ trồng được',s:'suc'}};

return [
/* ======================= TẠI NƠI: nhà họ sống cùng chỗ với mình ======================= */
HG('at',{id:'hg_a_tiec',t:'Mời dự đám',hw:1.3,hcd:36,
 x:(c,d)=>{const i=I(d);return i?`${esc(i.name)} mời nhà mình dự ${pick(['đám cưới con cháu','đám giỗ lớn của dòng họ','tiệc mừng thượng thọ gia chủ','lễ mừng nhà mới','lễ khánh thành từ đường'])}. Khách khứa trong vùng sẽ có mặt đông đủ, được mời là có thể diện.`:'Có người mời dự đám.'},
 o:(c,d)=>{const i=I(d);if(!i)return nope;
  const can=able(),solo=can.length<=1;
  const rep=best(can,p=>p.eq+p.mi*0.5)||c;
  const full=cost(i,0.2,40),part=cost(i,0.08,16);const o=[];
  /* nhà chỉ có một người thì không có chuyện "cả nhà đi" */
  if(!solo)o.push({l:'Cả nhà đi dự, mừng lễ hậu',s:`Tốn khoảng ${fm(full)}`,c:()=>G.money()>=full,f:c=>{i.addRel(R(8,12));return 'Bàn tiệc rôm rả, gia chủ nâng chén mời riêng, gặp được nhiều người có tiếng trong vùng.'+fx(c,{money:-full,fame:R(2,4),cfame:1,tam:4,eq:1})}});
  o.push({l:solo?'Tự mình đi dự, mừng vừa đủ lễ':`Cử ${rep.given} đi dự thay cả nhà`,s:`Tốn khoảng ${fm(part)}`,c:()=>G.money()>=part,f:c=>{
    if(chance(G.prob(rep,{eq:0.6,mi:0.4},DW(0.75,44)))){i.addRel(R(4,7));return `${N(rep)} ăn nói khéo, được chủ nhà mời ngồi mâm trên, quen thêm mấy người có tiếng.`+fx(c,{money:-part})+fx(rep,{fame:R(1,3),tam:5,eq:1})}
    i.addRel(R(1,3));return `${N(rep)} đến dự cho đủ lễ nghĩa, ngồi mâm dưới, chẳng ai để ý.`+fx(c,{money:-part})+fx(rep,{tam:-1})}});
  o.push({l:'Viện cớ bận, chỉ gửi lời chúc',f:c=>{i.addRel(-R(3,6));return fx(c,{fame:-1})}});
  return o}}),

HG('at',{id:'hg_a_nhogiup',t:'Nhờ một việc',hw:1,hcd:48,
 x:(c,d)=>{const i=I(d);return i?`Gia chủ ${esc(i.headN)} của ${esc(i.name)} sai người sang, ${pick(ASK[i.kind]||ASK.nong)}. Nhà ấy ${i.fame>=200?'là chỗ không ai dám làm mất lòng':'có tiếng trong vùng'}, giúp được thì sau này còn có chỗ nhờ lại.`:'Có người nhờ vả.'},
 o:(c,d)=>{const i=I(d);if(!i)return nope;const big=cost(i,0.12,25),small=cost(i,0.04,8);return [
  {l:'Giúp hết sức, không tiếc công tiếc của',s:`Tốn khoảng ${fm(big)}`,c:()=>G.money()>=big,f:c=>{i.addRel(R(9,14));return `Họ nhận lời nhắn tạ rất trịnh trọng. Tiếng nhà mình biết trọng nghĩa lan ra trong vùng.`+fx(c,{money:-big,fame:R(3,6),cfame:1,tam:3})}},
  {l:'Giúp một phần vừa sức',s:`Tốn khoảng ${fm(small)}`,c:()=>G.money()>=small,f:c=>{i.addRel(R(3,6));return 'Việc không trọn nhưng họ hiểu nhà mình có hoàn cảnh.'+fx(c,{money:-small,fame:1})}},
  {l:'Khéo từ chối, nói nhà mình cũng đang túng',f:c=>{i.addRel(-R(4,8));return 'Người đưa tin nhận lời từ chối mà mặt không vui.'+fx(c,{tam:-1})}}]}}),

HG('at',{id:'hg_a_honsu',t:'Ngỏ ý kết thân',ht:['C'],hw:1,hcd:60,
 hc:(hd,o,i)=>i&&i.kids&&i.kids.some(k=>k.age>=16&&k.age<=32)&&G.alive().some(p=>G.inClan(p)&&!p.spouse&&age(p)>=16&&age(p)<=34&&!p.inLaw&&!p.left),
 x:(c,d)=>{const i=I(d);return i?`${esc(i.name)} ${i.tier>=5?'là thế gia trong vùng':'là danh gia trong vùng'}, nhờ người ướm lời muốn kết thông gia với nhà mình. Hôn sự này mà thành thì cả hai nhà đều có thêm chỗ dựa.`:'Có người ngỏ lời.'},
 o:(c,d)=>{const i=I(d);if(!i)return nope;return [
  {l:'Bàn chuyện hôn sự',s:'Xem ai trong nhà hợp tuổi',go:()=>V().w_wed(i.id)},
  {l:'Hẹn dịp khác, giữ lễ',f:c=>{i.addRel(R(0,2));return ''}},
  {l:'Khéo từ chối',f:c=>{i.addRel(-R(4,7));return fx(c,{tam:-1})}}]}}),

HG('at',{id:'hg_a_tranhchap',t:'Tranh chấp với danh gia',hw:0.9,hcd:60,
 x:(c,d)=>{const i=I(d);return i?`Người nhà ${esc(i.name)} và người làm của nhà mình cãi nhau vì ${pick(['ranh giới mảnh đất','con nước tưới ruộng','lối đi chung qua sân','chỗ đặt sạp ngoài chợ'])}. Chuyện đến tai cả hai bên, ai cũng chờ xem nhà mình xử ra sao.`:'Có tranh chấp.'},
 o:(c,d)=>{const i=I(d);if(!i)return nope;const pay=cost(i,0.1,20);return [
  {l:'Nhường họ, mang lễ sang tạ lỗi',s:`Tốn khoảng ${fm(pay)}`,c:()=>G.money()>=pay,f:c=>{i.addRel(R(5,9));return 'Họ thấy nhà mình biết điều, chuyện êm xuôi. Có người cho là nhún, có người cho là khôn.'+fx(c,{money:-pay,fame:1,tam:-1})}},
  {l:'Giữ lý của mình, nói rõ phải trái',r:[{eq:0.6,khau:0.6,fame:0.3},DW(0.45,55)],y:c=>{i.addRel(-R(1,4));return 'Lý đúng, lời chắc. Họ cắn môi chịu nhận, cả vùng nể nhà mình.'+fx(c,{fame:R(4,8),cfame:1,tam:4})},n:c=>{i.addRel(-R(8,14));return 'Lời lẽ không đủ sức nặng trước một nhà có tiếng. Họ nhớ chuyện này lâu.'+fx(c,{fame:-3,tam:-5})}},
  {l:'Nhờ người cao tuổi trong vùng đứng ra phân xử',s:`Tốn khoảng ${fm(Math.round(pay/3))}`,c:()=>G.money()>=Math.round(pay/3),r:[{eq:0.7,khau:0.4},DW(0.6,50)],y:c=>{i.addRel(R(1,4));return 'Hai bên cùng chịu một phần, cùng giữ thể diện.'+fx(c,{money:-Math.round(pay/3),fame:2,tam:2})},n:c=>{i.addRel(-R(2,5));return 'Người phân xử nghiêng về bên kia. Mất tiền mà vẫn thiệt.'+fx(c,{money:-Math.round(pay/3),tam:-3})}}]}}),

HG('at',{id:'hg_a_ghetham',t:'Gia chủ ghé thăm',hw:0.8,hcd:60,hc:(hd,o,i)=>i&&i.rel>=0,
 x:(c,d)=>{const i=I(d);return i?`Gia chủ ${esc(i.headN)} của ${esc(i.name)}, ${esc(i.tr)}, nhân đi qua tiện đường ghé nhà ${N(c)} uống chén trà. Chủ khách đều biết đó là dịp tỏ rõ nhà mình trọng nhà ấy đến đâu.`:'Có khách quý ghé.'},
 o:(c,d)=>{const i=I(d);if(!i)return nope;const feast=cost(i,0.1,20);return [
  {l:'Bày tiệc đón, mời các bậc cao niên làm bạn',s:`Tốn khoảng ${fm(feast)}`,c:()=>G.money()>=feast,f:c=>{i.addRel(R(7,12));return 'Khách vui, uống đến tối mới về. Cả xóm biết nhà mình có khách quý.'+fx(c,{money:-feast,fame:R(2,5),cfame:1,tam:4})}},
  {l:'Mời trà đạm bạc, nói chuyện thân tình',r:[{eq:0.7,khau:0.5},DW(0.7,46)],y:c=>{i.addRel(R(4,8));return 'Chuyện trò hợp ý. Đôi khi sự chân thành hơn cả mâm cao cỗ đầy.'+fx(c,{fame:1,tam:3,eq:1})},n:c=>{i.addRel(-R(1,3));return 'Nhà đơn sơ, lời nói vụng. Khách ngồi chốc lát rồi cáo từ.'+fx(c,{tam:-2})}},
  {l:'Cáo bận, chỉ ra cổng chào',f:c=>{i.addRel(-R(4,7));return fx(c,{fame:-1})}}]}}),

HGK('at',{id:'hg_a_monkhach',t:'Được nhận làm môn khách',hw:0.6,hcd:240,
 hc:(hd,o,i)=>i&&i.rel>=20&&alive().some(p=>G.inClan(p)&&age(p)>=14&&age(p)<=30&&!p.away&&Math.max(p.tri,p.vo,p.eq,p.mi)>=55),
 hwho:p=>age(p)>=14&&age(p)<=30&&!p.away&&Math.max(p.tri,p.vo,p.eq,p.mi)>=55,
 x:(c,d)=>{const i=I(d);return i?`Gia chủ ${esc(i.headN)} của ${esc(i.name)} để ý ${N(c)} từ lâu, thấy người này chẳng giống con nhà thường. Ông cho người sang hỏi: "Có muốn ra vào nhà tôi, học hỏi với các bậc trong nhà chăng?"`:'Có người để ý tới nhà mình.'},
 o:(c,d)=>{const i=I(d);if(!i)return nope;const k=['tri','vo','eq','mi'].sort((a,b)=>c[b]-c[a])[0];return [
  {l:'Nhận lời, ra vào học hỏi',f:c=>{i.addRel(R(5,9));return `${N(c)} theo hầu mấy tháng, học được nhiều điều mà sách vở nhà thường không dạy.`+fx(c,{[k]:R(2,4),fame:R(3,6),tam:5,eq:1})}},
  {l:'Tạ ơn, xin học một thời gian ngắn thôi',f:c=>{i.addRel(R(2,4));return 'Gia chủ gật đầu: "Biết giữ mình cũng là cái đáng quý."'+fx(c,{[k]:1,fame:1,tam:2})}},
  {l:'Từ chối, không muốn nợ ơn',f:c=>{i.addRel(-R(1,3));return fx(c,{tam:-1})}}]}}),

/* ======================= Ở GẦN: nhà họ ở nơi khác, trong hai tháng đường ======================= */
HG('near',{id:'hg_n_thu',t:'Thư từ xa',hw:1.1,hcd:36,
 x:(c,d)=>{const i=I(d);return i?`Một lá thư của ${esc(i.name)} từ ${esc(i.seat)} gửi tới, đường xa ${d.hr&&d.hr.mo?d.hr.mo:'vài'} tháng. Họ nghe danh nhà mình, mong có dịp qua lại, mời một người trong nhà đến thăm khi thuận đường.`:'Có thư từ xa.'},
 o:(c,d)=>{const i=I(d);if(!i)return nope;const trip=cost(i,0.12,22),gift=cost(i,0.05,10);return [
  {l:'Cử người đến tận nơi thăm hỏi',s:`Tốn khoảng ${fm(trip)} đường sá và lễ`,c:()=>G.money()>=trip,f:c=>{i.addRel(R(7,12));return `Chuyến đi vất vả, nhưng được đón tiếp trọng thị. Mối quen biết mới mở ra một cánh cửa.`+fx(c,{money:-trip,fame:R(2,5),cfame:1,tam:3,eq:1})}},
  {l:'Viết thư hồi âm, kèm chút lễ mọn',s:`Tốn khoảng ${fm(gift)}`,c:()=>G.money()>=gift,f:c=>{i.addRel(R(3,6));return 'Thư đi lại thưa thớt nhưng giữ được tình nghĩa.'+fx(c,{money:-gift,fame:1})}},
  {l:'Để đó, không trả lời',f:c=>{i.addRel(-R(1,3));return ''}}]}}),

HG('near',{id:'hg_n_sugia',t:'Sứ giả đi ngang',hw:1,hcd:48,
 x:(c,d)=>{const i=I(d);return i?`Người của ${esc(i.name)} đi ngang vùng mình, trời tối nên ghé xin nghỉ chân. Họ mang theo ${pick(['một chuyến lễ gửi quan địa phương','thư từ gửi họ hàng','hàng gấp giao cho bạn buôn'])}. Tiếp đón thế nào, nhà họ sẽ nghe lại cả.`:'Có khách ghé nghỉ chân.'},
 o:(c,d)=>{const i=I(d);if(!i)return nope;const feast=cost(i,0.04,8);return [
  {l:'Đón tiếp chu đáo, đưa họ một đoạn đường',s:`Tốn khoảng ${fm(feast)}`,c:()=>G.money()>=feast,f:c=>{i.addRel(R(4,8));return 'Về đến nhà, sứ giả kể lại với gia chủ rằng ở đó có một nhà biết đạo khách.'+fx(c,{money:-feast,fame:R(1,3),tam:2})}},
  {l:'Cho nghỉ nhờ một đêm, cơm nước đạm bạc',f:c=>{i.addRel(R(1,3));return ''}},
  {l:'Nói nhà chật, mời họ sang nhà khác',f:c=>{i.addRel(-R(3,6));return fx(c,{fame:-1})}}]}}),

HG('near',{id:'hg_n_tindon',t:'Tin đồn về một nhà có tiếng',hw:0.9,hcd:60,
 x:(c,d)=>{const i=I(d);if(!i)return 'Có tin đồn.';const good=GD(d);
  return good?`Người đi buôn kể ${esc(i.name)} ở ${esc(i.seat)} vừa có chuyện vui: ${pick(['con cháu thi đỗ cao','gia chủ được triều đình ban thưởng','làm ăn khấm khá, mở thêm cơ sở mới'])}.`:`Người đi buôn kể ${esc(i.name)} ở ${esc(i.seat)} vừa gặp chuyện không hay: ${pick(['bị kiện cáo kéo dài','con cháu gây tai tiếng','gặp hỏa hoạn thiệt hại nặng'])}.`},
 o:(c,d)=>{const i=I(d);if(!i)return nope;const good=GD(d);const gift=cost(i,0.04,8);return good?[
  {l:'Gửi thư và lễ mừng',s:`Tốn khoảng ${fm(gift)}`,c:()=>G.money()>=gift,f:c=>{i.addRel(R(5,9));return 'Họ cảm động vì nhà ở xa mà còn nhớ.'+fx(c,{money:-gift,fame:1,tam:2})}},
  {l:'Chỉ mừng thầm, không gửi gì',f:c=>''}]:[
  {l:'Gửi thư hỏi thăm và chút giúp đỡ',s:`Tốn khoảng ${fm(gift)}`,c:()=>G.money()>=gift,f:c=>{i.addRel(R(8,13));return 'Lúc hoạn nạn mới biết ai là người nhớ. Họ ghi nhận.'+fx(c,{money:-gift,fame:R(1,3),tam:3})}},
  {l:'Giữ khoảng cách, đợi xem sao',f:c=>{i.addRel(-R(0,2));return ''}},
  {l:'Nhân lúc họ sa sút, thêu dệt thêm cho thiên hạ nghe',f:c=>{i.addRel(-R(12,18));return 'Tin lan rất nhanh, và truyền lại đến tai họ. Người ta bảo nhà mình thích dẫm lên kẻ ngã.'+fx(c,{fame:-R(3,6),tam:-3})}}]}}),

HG('near',{id:'hg_n_thuonglai',t:'Thương nhân thân tín của danh gia',hw:0.9,hcd:60,hc:(hd,o,i)=>i&&i.rel>=-10,
 x:(c,d)=>{const i=I(d);return i?`Một thương nhân quen thuộc của ${esc(i.name)} ghé qua, cho biết họ có một mối hàng ${pick(['vải vóc','dược liệu','đồ gốm','lương thực dự trữ'])} muốn chia bớt cho nhà mình, giá dễ chịu nếu nhà mình nhận ngay.`:'Có thương nhân ghé.'},
 o:(c,d)=>{const i=I(d);if(!i)return nope;const cap=cost(i,0.1,16);return [
  {l:'Nhận cả mối hàng, bán lại trong vùng',s:`Bỏ ra khoảng ${fm(cap)}`,c:()=>G.money()>=cap,r:[{eq:0.5,khau:0.5,ql:0.3},DW(0.62,46)],y:c=>{i.addRel(R(3,6));return 'Hàng chạy nhanh, lãi khá. Thương nhân hứa lần sau lại ưu tiên nhà mình.'+fx(c,{money:Math.round(cap*0.35),fame:1,tam:3})},n:c=>{i.addRel(R(0,2));return 'Hàng ế vài tháng mới bán hết, lãi chẳng bao nhiêu.'+fx(c,{money:-Math.round(cap*0.08),tam:-2})}},
  {l:'Nhận một phần nhỏ cho có tình',s:`Bỏ ra khoảng ${fm(Math.round(cap/3))}`,c:()=>G.money()>=Math.round(cap/3),f:c=>{i.addRel(R(1,3));return 'Lãi ít nhưng giữ được quan hệ.'+fx(c,{money:Math.round(cap/3*0.12)})}},
  {l:'Từ chối, nhà mình không buôn thứ ấy',f:c=>''}]}}),

HGK('near',{id:'hg_kn_khach',t:'Khách quý để lại một món',hw:0.5,hcd:200,
 hc:(hd,o,i)=>i&&i.rel>=15,
 x:(c,d)=>{const i=I(d);if(!i)return 'Có khách quý ghé.';const g=GIVE[i.kind]||GIVE.nong;return `Một người thân tín của ${esc(i.name)} ghé nhà trên đường đi qua, nghỉ nửa ngày rồi để lại ${g.t}, nói: "Gia chủ dặn gửi tặng nhà có duyên."`},
 o:(c,d)=>{const i=I(d);if(!i)return nope;const g=GIVE[i.kind]||GIVE.nong;return [
  {l:'Nhận, viết thư cảm tạ',f:c=>{i.addRel(R(4,8));return 'Món quà không đắt nhưng hợp đúng lúc, dùng được lâu dài.'+fx(c,{[g.s]:R(1,3),fame:R(1,3),tam:4})}},
  {l:'Nhận, kèm lễ đáp trả tương xứng',s:`Tốn khoảng ${fm(cost(i,0.05,10))}`,c:()=>G.money()>=cost(i,0.05,10),f:c=>{i.addRel(R(8,12));return 'Hai nhà có qua có lại, tình nghĩa thêm sâu dù cách xa.'+fx(c,{money:-cost(i,0.05,10),[g.s]:R(1,3),fame:R(2,4),tam:5})}},
  {l:'Từ chối khéo, nói không dám nhận',f:c=>{i.addRel(-R(2,5));return fx(c,{tam:-1})}}]}})
];
});
