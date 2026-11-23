/* Bách Niên Thế Gia v6.7.10-d9.12 · (1) CƠ CHẾ TIÊN TRI DÙNG CHUNG: lời tiên tri ghi vào nhật ký, 1 đến 5 năm sau xảy ra đúng một việc thật (tt_ung_nghiem); người chơi nhớ lời dặn mà chọn đúng thì lợi lớn, không thì thất bại (chủ dự án: "tiên tri thì nên thực sự là tiên tri", bà đồng "gợi ý một lựa chọn cụ thể").
   Dùng cho f633_bado, kn_85 (giấc mơ), kn_13 (người đàn bà bí ẩn). (2) CHUỖI SƯ MÔN sm_* thay chuỗi c4_* cũ (mở đầu và kết cục không có thật): thầy là người thật, 6 bước, ngã rẽ, kết nhỏ. */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const FM=v=>G.fmtMoney(v);const N=c=>esc(c.given);
const T=d=>d&&d.npc?G.tie.get(d.npc):null;const nm=n=>esc(n?n.n:'người ấy');
const addVai=(n,v)=>{if(!n.vai.includes(v)){n.vai.push(v);n.vaiTxt=n.vai.map(x=>G.tie.VAI[x]||x).join(', ')}};
/* ---------- tiên tri: kịch bản ---------- */
const SC=[
 {k:'quan',pre:'Có một lời mời từ xa, ai nhận thì mở đường, ai chê thì lỡ.',hint:'đừng chê lời mời lên đường xa',
  x:c=>`Đúng như lời tiên tri năm xưa, một người từ kinh thành tìm đến nhà ${N(c)} với lời mời: nhận một việc xa nhà nhưng có tiếng tăm. Mọi người can ngăn vì đường xa vất vả.`,
  right:'Nhận lời, lên đường',wrong:'Từ chối, ở lại cho yên',
  good:c=>'Lời tiên tri ứng nghiệm. Chuyến đi mở ra một cánh cửa lớn: người nhà được quý nhân nhìn trúng.'+fx(c,{fav:4,money:m(20),eq:2,cfame:3,tam:6}),bad:c=>'Cơ hội trôi qua. Nghe tin người khác nhận lời và lên như diều gặp gió, lòng tiếc nuối.'+fx(c,{tam:-5,cfame:-1})},
 {k:'hoa',pre:'Nhà có một chuyến đi dính nạn nước, chuyến nào đi đường thủy cũng nguy.',hint:'tránh đi đường thủy vào cuối thu',
  x:c=>`Cuối thu, nhà ${N(c)} có việc phải đi xa, đường thủy nhanh hơn đường bộ ba ngày. Trời trong, gió thuận.`,
  right:'Đi đường bộ, chậm mà chắc',wrong:'Đi đường thủy cho nhanh',
  good:c=>'Chuyến đường thủy cùng ngày gặp bão, nhiều người mất mạng. Nhờ nhớ lời dặn, nhà tránh được tai họa.'+fx(c,{tam:4,eq:1,cfame:2}),bad:c=>'Đúng ngày ấy bão ập tới giữa dòng. Mất của, người bị thương nặng, may còn sống.'+fx(c,{money:-m(30),suc:-R(20,35),hpMax:-R(1,3),tam:-10})},
 {k:'tai',pre:'Có người đến rủ làm ăn lớn, mà nhà nào theo thì lỗ, nhà nào từ chối thì được.',hint:'ai rủ góp vốn thì đừng theo',
  x:c=>`Đúng lúc ấy, một người quen cũ đến rủ ${N(c)} góp vốn một chuyến buôn lớn, hứa lãi gấp đôi. Nhiều nhà trong vùng đã theo.`,
  right:'Từ chối khéo, không góp',wrong:'Góp vốn lớn theo họ',
  good:c=>'Chuyến buôn ấy vỡ nợ, người góp vốn mất trắng. Nhà nhờ không theo nên bình an, lại mua được hàng giá rẻ của người vỡ nợ.'+fx(c,{money:m(R(30,50)),eq:2,tri:2,tam:4}),bad:c=>'Chuyến buôn vỡ nợ, mất toàn bộ vốn góp, nhà bị mang tiếng nhẹ dạ.'+fx(c,{money:-m(40),tam:-8,fame:-2})},
 {k:'phuc',pre:'Có người ngoài đến giúp lúc nhà khó nhất, ai biết nhận thì thoát nạn.',hint:'đón người lạ giúp lúc khó, đừng nghi ngờ',
  x:c=>`Nhà ${N(c)} gặp lúc khó khăn nhất: mất mùa, nợ thúc. Một người lạ tìm đến, muốn giúp một khoản và chỉ xin một chỗ nghỉ.`,
  right:'Nhận sự giúp đỡ và mời vào nhà',wrong:'Nghi ngờ, từ chối người lạ',
  good:c=>'Người lạ ấy là quý nhân thật: một khoản giúp đúng lúc cứu cả nhà. Về sau còn nhiều lần ghé giúp.'+fx(c,{money:m(R(35,60)),on:3,eq:2,tam:7}),bad:c=>'Người lạ lặng lẽ đi tiếp. Nhà phải bán bớt đồ để qua cơn khó.'+fx(c,{money:-m(15),tam:-6,on:-2})}
];
const addProph=(c,months,kind,note)=>{const i=kind?SC.findIndex(x=>x.k===kind):R(0,SC.length-1);const sc=SC[i<0?0:i];G.later(c,'tt_ung_nghiem',months,{sc:SC.indexOf(sc)});G.log&&G.log(`Lời tiên tri ${note||''} (ghi nhớ): "${sc.pre}" Lời dặn: ${sc.hint}.`,'hi');return sc};
const prophInit=()=>({addProph,SC});
G.tt=prophInit();
return [
{id:'tt_ung_nghiem',t:'Lời tiên tri ứng nghiệm',k:'Tiên tri',fixed:1,tags:{},
 x:(c,d)=>{const sc=SC[d.sc]||SC[0];return sc.x(c)},
 o:(c,d)=>{const sc=SC[d.sc]||SC[0];const A={l:sc.right,f:c=>sc.good(c)},B={l:sc.wrong,f:c=>sc.bad(c)};return chance(0.5)?[A,B]:[B,A]}},
/* ---------- bà đồng nói điều chưa đến ---------- */
{id:'f633_bado',t:'Bà đồng nói điều chưa đến',k:'Kỳ ngộ',age:[20,80],ky:1,good:1,u:'person',w:0.6,cd:120,pcd:240,tags:{},
 x:(c,d)=>{const n=G.tie.ensure(c,{vai:['cao_nhan'],nghe:'bà đồng ngoài chợ phiên',g:'nữ',age:R(60,78),main:'tri',tier:0,rel:0,why:'xem chỉ tay'});d.npc=n.id;d.sc=R(0,SC.length-1);const sc=SC[d.sc];return `Qua chợ phiên, ${nm(n)}, bà đồng già, kéo tay ${N(c)} lại, nhìn vào lòng bàn tay lâu thật lâu: "${sc.pre}" Bà không đòi tiền.`},
 o:(c,d)=>{const n=T(d);if(!n)return [{l:'Thôi',f:()=>''}];const sc=SC[d.sc];return [
  {l:'Cúi đầu cảm ơn, ghi nhớ từng lời',f:c=>{G.tt.addProph(c,R(30,42),SC[d.sc].k,'của bà đồng');return `Câu nói ấy cứ vang trong đầu nhiều đêm. Mình ghi lại: "${sc.hint}".`+fx(c,{tam:2,eq:1,qh:[n.n,G.tie.rel(n,8,'được nghe lời')[1]]})}},
  {l:'Hỏi kỹ từng điều, biếu bà tiền hương',c:()=>G.money()>=m(2),f:c=>{G.tt.addProph(c,R(30,42),SC[d.sc].k,'của bà đồng (hỏi kỹ)');return `Bà nói thêm một câu: "${sc.hint}, đúng lúc ấy chớ do dự". ${N(c)} ghi nhớ kỹ lời này.`+fx(c,{money:-m(2),tam:1,tri:1,qh:[n.n,G.tie.rel(n,14,'biếu tiền hương')[1]]})}},
  {l:'Cười, không tin lời đồn thổi',f:c=>{G.tt.addProph(c,R(30,42),SC[d.sc].k,'của bà đồng (không tin)');return `Bà nhìn ${N(c)} rất lâu rồi buông tay. Mình không ghi lại gì, nhưng lời bà vẫn lọt vào tai.`+fx(c,{tam:-1})}}]}},
/* ---------- giấc mơ tiên tri ---------- */
{id:'kn_85',t:'Giấc mơ tiên tri',k:'Kỳ ngộ',age:[18,75],ky:1,good:1,u:'person',w:0.4,tags:{},
 x:(c,d)=>{d.sc=R(0,SC.length-1);d.w=pick(['Phúc','Hiểm','Quan','Tài']);return `Đêm qua ${N(c)} mơ thấy đứng trước một cánh cửa đá khắc một chữ lạ: "${d.w}". Sáng tỉnh, vẫn nhớ từng nét và một lời nhắn lơ lửng: "${SC[d.sc].pre}"`},
 o:(c,d)=>[
  {l:'Ghi lại đúng từng nét, ghi cả lời nhắn',r:[{tri:0.5,eq:0.4},50],y:c=>{G.tt.addProph(c,R(18,48),SC[d.sc].k,'trong giấc mơ');return `Mình ghi lại lời nhắn và dặn lòng: "${SC[d.sc].hint}". Ít lâu sau gặp lại đúng chữ ấy trong một cuốn sách cổ.`+fx(c,{tam:5,tri:2})},n:c=>{G.tt.addProph(c,R(18,48),SC[d.sc].k,'trong giấc mơ (không nhớ rõ)');return 'Nét chữ lẫn vào quên lãng. Chỉ nhớ lờ mờ đoạn đầu lời nhắn.'+fx(c,{tam:-1})}},
  {l:'Coi như giấc mơ thường',f:c=>{G.tt.addProph(c,R(18,48),SC[d.sc].k,'trong giấc mơ (bỏ qua)');return 'Mơ đâu thì cho qua đó. Nhưng chữ ấy vẫn lảng vảng.'+fx(c,{tam:0})}}]},
/* ---------- người đàn bà bí ẩn ---------- */
{id:'kn_13',t:'Người đàn bà bí ẩn',k:'Kỳ ngộ',age:[20,50],ky:1,good:1,u:'person',w:0.4,c:c=>c.g==='nam',tags:{},
 x:(c,d)=>{const n=G.tie.ensure(c,{vai:['cao_nhan'],nghe:'người đàn bà áo thâm bên cầu đá',g:'nữ',age:R(40,60),main:'tri',rel:0,why:'kể một chuyện cho nghe'});d.npc=n.id;d.sc=R(0,SC.length-1);return `Trên đường về, ${N(c)} gặp ${nm(n)}, áo thâm, đứng bên cầu đá, hỏi bâng quơ: "Chàng có muốn nghe một chuyện không?" Giọng bà dịu như nước.`},
 o:(c,d)=>{const n=T(d);if(!n)return [{l:'Thôi',f:()=>''}];return [
  {l:'Dừng lại nghe',r:[{tri:0.5,eq:0.5},55],y:c=>{G.tt.addProph(c,R(72,168),SC[d.sc].k,'của người đàn bà bí ẩn');return `Chuyện bà kể là về một nơi, một người và một lời hứa. Cuối chuyện bà dặn: "${SC[d.sc].hint}". Nhiều năm sau mình sẽ gặp lại đúng chuyện ấy.`+fx(c,{tam:4,tri:2,qh:[n.n,G.tie.rel(n,10,'được nghe chuyện')[1]]})},n:c=>'Chuyện nghe xong lòng thấy trống rỗng, không rõ ý. Chỉ nhớ bà ấy cười rất hiền.'+fx(c,{tam:-2})},
  {l:'Chắp tay rồi đi tiếp',f:c=>{G.tt.addProph(c,R(72,168),SC[d.sc].k,'(không nghe)');return 'Đi một đoạn quay lại, bà đã biến mất. Lời bà vẫn âm ỉ như một điềm.'+fx(c,{tam:1})}}]}},
/* ================= CHUỖI SƯ MÔN (thay c4_*) ================= */
{id:'sm_nhan_thay',t:'Võ sư nhận học trò',k:'Sư môn',age:[14,40],once:1,w:0.7,c:c=>c.vo>=45&&c.job!=='hiep'&&!(c.flags&&c.flags.sm),tags:{},
 x:(c,d)=>{const n=G.tie.ensure(c,{vai:['thay'],nghe:'võ sư dạy ở võ đường trong vùng',age:R(46,62),main:'vo',st:{vo:R(80,100)},rel:0,why:'nhận làm học trò',tier:2});d.npc=n.id;return `${nm(n)}, võ sư dạy ở võ đường trong vùng, thấy ${N(c)} múa quyền ở bãi đất trống và gọi lại: "Gân cốt tốt, nhưng thế đi chưa đúng. Muốn học thật thì đến võ đường ta."`},
 o:(c,d)=>{const n=T(d);if(!n)return [{l:'Thôi',f:()=>''}];return [
  {l:`Bái sư, đóng học phí (${FM(m(8))})`,c:()=>G.money()>=m(8),r:[{vo:0.6,suc:0.4,eq:0.3},60],y:c=>{c.flags.sm={npc:n.id,t:S().t,st:1};G.tie.later(n,c,'sm_b',R(18,36),{});return `${nm(n)} nhận làm đệ tử. Mấy tháng sau, thế đi, thế đứng đã khác hẳn.`+fx(c,{money:-m(8),vo:R(3,5),suc:2,tam:4,qh:[n.n,G.tie.rel(n,20,'bái sư')[1]]})},n:c=>{c.flags.sm={npc:n.id,t:S().t,st:1};G.tie.later(n,c,'sm_b',R(18,36),{});return `${nm(n)} nhận nhưng chê căn cơ còn yếu, bắt tập lại từ đầu. Chậm mà chắc.`+fx(c,{money:-m(8),vo:2,tam:-1,qh:[n.n,G.tie.rel(n,10,'bái sư, bị chê căn cơ')[1]]})}},
  {l:'Xin học lén vài buổi, không bái sư',f:c=>{if(chance(0.5)){c.flags.sm={npc:n.id,t:S().t,st:1,len:1};G.tie.later(n,c,'sm_b',R(24,48),{});return `${nm(n)} thấy ngay, cười: "Học lén cũng là có chí". Ông không bắt tội nhưng cũng không nhận làm đệ tử chính thức.`+fx(c,{vo:2,qh:[n.n,G.tie.rel(n,4,'học lén')[1]]})}return `Bị bắt quả tang, ${nm(n)} mắng một trận rồi đuổi đi. Mất mặt.`+fx(c,{tam:-4,fame:-1,qh:[n.n,G.tie.rel(n,-8,'học lén bị bắt')[1]]})}},
  {l:'Cảm ơn, tự luyện lấy',f:c=>`${nm(n)} nhún vai: "Tùy ngươi."`+fx(c,{vo:1,tam:0})}]}},
{id:'sm_b',t:'Thầy nhờ một việc',k:'Sư môn',fixed:1,tags:{},
 x:(c,d)=>{const n=T(d);const kind=d.kind=pick(['mang thư','đi cùng thầy dẹp một vụ ức hiếp','giữ võ đường vài tháng']);return n?`${nm(n)} gọi ${N(c)} lại: "Có việc cần người đáng tin: ${kind}." Việc không nhẹ, nhưng đây là dịp để thầy xem tận mắt đệ tử mình ra sao.`:'Thầy gọi.'},
 o:(c,d)=>{const n=T(d);if(!n)return [{l:'Thôi',f:()=>''}];const fl=c.flags.sm=c.flags.sm||{};return [
  {l:'Nhận việc, làm cho trọn',r:[{vo:0.5,eq:0.5,muu:0.3},52],y:c=>{fl.st=2;G.tie.later(n,c,'sm_c',R(24,48),{});return `Việc xong đẹp. ${nm(n)} gật đầu: "Ta không nhìn lầm người". Từ đó ông truyền thêm vài đường căn bản.`+fx(c,{vo:R(3,5),eq:2,sk:{muu:1},tam:4,qh:[n.n,G.tie.rel(n,18,'làm tròn việc thầy giao')[1]]})},n:c=>{fl.st=2;G.tie.later(n,c,'sm_c',R(24,48),{});return `Việc dở dang, bị thương nhẹ. ${nm(n)} không trách nhưng thở dài.`+fx(c,{suc:-R(5,10),tam:-3,qh:[n.n,G.tie.rel(n,4,'việc dở dang')[1]]})}},
  {l:'Xin hoãn vì có việc nhà',f:c=>{fl.st=2;G.tie.later(n,c,'sm_c',R(30,54),{});return `${nm(n)} im lặng rồi giao người khác. Ông không nhắc nữa nhưng sổ đệ tử có thêm một dấu chấm.`+fx(c,{qh:[n.n,G.tie.rel(n,-10,'từ chối việc thầy')[1]],tam:-2})}}]}},
{id:'sm_c',t:'Thầy gặp nạn',k:'Sư môn',fixed:1,tags:{},
 x:(c,d)=>{const n=T(d);const who=d.foe=pick(['một môn phái tà đạo','sư huynh cùng môn có lòng ghen','một nhà quyền thế bị thầy làm mất mặt']);return n?`Tin dữ: ${nm(n)} bị ám sát giữa đường. Thầy chỉ còn thoi thóp, nhìn ${N(c)} nói được hai câu: "Đừng báo thù vội. Hãy tìm cho ra." Dấu vết để lại cho thấy có thể là ${who}.`:'Tin dữ của thầy.'},
 o:(c,d)=>{const n=T(d);if(!n)return [{l:'Thôi',f:()=>''}];const fl=c.flags.sm=c.flags.sm||{};fl.foe=d.foe;return [
  {l:'Thề báo thù, luyện võ khổ công',f:c=>{fl.path='thu';n.ok=0;n.dead=S().t;G.later(c,'sm_d',R(18,30),{npc:n.id,foe:d.foe});return `${nm(n)} nhắm mắt trong vòng tay ${N(c)}. Mình thề trước thi thể và bắt đầu khổ luyện ngày đêm.`+fx(c,{vo:R(4,7),suc:-3,tam:-8})}},
  {l:'Lo tang lễ cho thầy rồi điều tra cho rõ',pay:1,f:c=>{fl.path='tra';n.ok=0;n.dead=S().t;G.later(c,'sm_d',R(12,24),{npc:n.id,foe:d.foe});return `Mình lo tang lễ chu đáo cho ${nm(n)}, rồi lặng lẽ đi hỏi từng người từng chi tiết.`+fx(c,{money:-m(6),eq:2,tri:2,tam:-4,cfame:2})}},
  {l:'Gác chuyện ân oán, tiếp tục sống',f:c=>{fl.path='bo';n.ok=0;n.dead=S().t;G.later(c,'sm_f',R(36,72),{npc:n.id,foe:d.foe,bo:1});return `Mình chôn thầy, giữ lấy mấy đường võ thầy truyền, không tìm thêm. Nhưng đêm đêm vẫn nhớ lời thầy.`+fx(c,{money:-m(3),eq:3,tam:-6})}}]}},
{id:'sm_d',t:'Lần theo dấu vết',k:'Sư môn',fixed:1,tags:{},
 x:(c,d)=>{const fl=c.flags.sm||{};return `Một đầu mối nhỏ lọt vào tay ${N(c)}: ${d.foe==='một môn phái tà đạo'?'một người trong tà phái say rượu khoe khoang':d.foe==='sư huynh cùng môn có lòng ghen'?'một mảnh khăn của sư huynh bị rơi ở hiện trường':'một người hầu của nhà quyền thế đã bỏ trốn'}. Từ đây có thể ${fl.path==='thu'?'đánh thẳng vào đầu mối':'lần theo cho ra gốc'}.`},
 o:(c,d)=>{const fl=c.flags.sm=c.flags.sm||{};return [
  {l:'Lần theo bằng trí: hỏi han, dò la, đối chiếu',r:[{tri:0.7,muu:0.6,eq:0.3},48],y:c=>{fl.proof=1;G.later(c,'sm_e',R(12,30),{foe:d.foe,proof:1});return `Mất mấy tháng, mình ráp được cả chuỗi sự việc. Có chứng cứ trong tay.`+fx(c,{tri:R(2,4),sk:{muu:3},tam:2})},n:c=>{G.later(c,'sm_e',R(12,30),{foe:d.foe,proof:0});return `Đầu mối đứt giữa chừng, chỉ còn lời đồn và nghi ngờ.`+fx(c,{tam:-4})}},
  {l:'Tìm thẳng người làm chứng, ép khai bằng võ',r:[{vo:0.8,suc:0.3},50],y:c=>{fl.proof=1;G.later(c,'sm_e',R(12,30),{foe:d.foe,proof:1,force:1});return `Người làm chứng khai hết trước nắm đấm, nhưng cách làm để lại tiếng không đẹp.`+fx(c,{vo:2,fame:-1,tam:2})},n:c=>{G.later(c,'sm_e',R(12,30),{foe:d.foe,proof:0});return `Người làm chứng bỏ trốn, còn báo cho phe kia biết mình đang truy.`+fx(c,{suc:-R(6,12),tam:-4,risk:2})}},
  {l:'Nhờ quan huyện hoặc người có thế giúp tra',pay:1,f:c=>{const q=G.tie.act('quy_nhan').filter(x=>x.rel>=25).length>0;G.later(c,'sm_e',R(18,36),{foe:d.foe,proof:q?1:0});return q?`Người có thế giúp tra cứu, tìm ra hồ sơ cũ có lợi.`+fx(c,{money:-m(8),tam:2}):`Quan huyện hứa hẹn rồi để đó. Việc chậm lại.`+fx(c,{money:-m(8),tam:-2})}}]}},
{id:'sm_e',t:'Đối mặt kẻ hại thầy',k:'Sư môn',fixed:1,tags:{},
 x:(c,d)=>`Cuối cùng ${N(c)} đứng trước người đã hại thầy: ${d.foe==='một môn phái tà đạo'?'trưởng nhóm của tà phái, tay đã dính nhiều mạng':d.foe==='sư huynh cùng môn có lòng ghen'?'chính sư huynh cùng môn, người mình từng gọi là anh':'quản gia của nhà quyền thế, kẻ thừa lệnh chủ'}. ${d.proof?'Trong tay có chứng cứ.':'Chỉ có nghi ngờ, chưa đủ chứng cứ.'}`,
 o:(c,d)=>{const fl=c.flags.sm=c.flags.sm||{};return [
  {l:'Giao đấu một trận sống chết',r:[{vo:0.9,suc:0.5,gan:0.3},d.proof?48:40],y:c=>{fl.end='thang';G.later(c,'sm_f',R(6,18),{foe:d.foe,proof:d.proof,end:'thang'});return `Một trận khốc liệt, mình thắng. Công lý của thầy được trả bằng chính tay mình.`+fx(c,{vo:R(6,10),suc:-R(8,14),fame:R(4,8),tam:6})},n:c=>{fl.end='thua';G.later(c,'sm_f',R(6,18),{foe:d.foe,proof:d.proof,end:'thua'});return `Thua trận, bị thương nặng. Kẻ kia tha mạng vì sợ tiếng.`+fx(c,{suc:-R(20,32),hpMax:-R(1,3),tam:-8})}},
  ...(d.proof?[{l:'Mang chứng cứ ra công đường',r:[{khau:0.7,tri:0.5},55],y:c=>{fl.end='kien';G.later(c,'sm_f',R(6,18),{foe:d.foe,proof:1,end:'kien'});return `Quan thụ lý, kẻ hại thầy bị xử theo luật. Mình không phải dính máu.`+fx(c,{fame:R(3,6),eq:3,tri:2,tam:6})},n:c=>{fl.end='kienthua';G.later(c,'sm_f',R(6,18),{foe:d.foe,proof:1,end:'kienthua'});return `Chứng cứ bị bác vì có người chống lưng. Mình mang tiếng vu cáo.`+fx(c,{fame:-5,money:-m(10),tam:-7})}}]:[]),
  {l:'Nghe hắn nói, có khi sự thật khác điều mình nghĩ',r:[{eq:0.9,tri:0.5},40],y:c=>{fl.end='hoagiai';G.later(c,'sm_f',R(6,18),{foe:d.foe,proof:d.proof,end:'hoagiai'});return `Nghe xong mới biết thầy cũng có phần lỗi: một món nợ cũ giữa hai người. Hai bên gác lại, nhưng sự thật làm mình trăn trở.`+fx(c,{eq:4,tri:2,tam:2})},n:c=>{fl.end='thua';G.later(c,'sm_f',R(6,18),{foe:d.foe,proof:d.proof,end:'thua'});return `Hắn cười nhạt rồi ra tay trước. Mình bị đánh bất ngờ.`+fx(c,{suc:-R(15,25),tam:-6})}}]}},
{id:'sm_f',t:'Kết cục của một mối thù',k:'Sư môn',fixed:1,tags:{},
 x:(c,d)=>{const e=d.end||'bo';return ({thang:'Kẻ hại thầy đã chết dưới tay mình. Võ đường mất thầy lại có người nối bước: các huynh đệ mời mình đứng ra gánh võ đường.',thua:'Mình dưỡng thương lâu. Trong những ngày nằm một chỗ, một đệ tử cũ của thầy mang đến cuốn bí kíp thầy giấu, nói thầy muốn trao cho người đáng trao.',kien:'Mối thù đã khép bằng pháp luật. Các huynh đệ cùng môn kính trọng, mời mình đứng ra lập lại võ đường để tưởng nhớ thầy.',kienthua:'Mối thù chưa khép, mình nhận lấy tiếng xấu. Nhưng vài huynh đệ vẫn tin, mời cùng gìn giữ võ đường.',hoagiai:'Mối thù hóa giải, nhưng cả hai bên đều mất. Một vị trưởng lão trong vùng mời mình làm người kế vị võ đường.',bo:'Nhiều năm sau, một đệ tử cũ của thầy tìm đến, hỏi sao mình bỏ mặc mối thù. Cũng chính người ấy cho biết võ đường còn đó và đang tìm người nối bước.'})[e]},
 o:(c,d)=>{const e=d.end||'bo';return [
  {l:'Nhận làm chủ võ đường',r:[{vo:0.5,eq:0.6,tri:0.3},e==='thang'||e==='kien'?72:54],y:c=>{c.flags.vodduong=1;G.tie.act('thay').forEach(x=>{});return `Võ đường mang tên thầy mở lại, học trò kéo đến. Từ đó có thêm nguồn thu và tiếng tăm, người nhà muốn học võ có nơi theo.`+fx(c,{vo:R(2,4),eq:3,money:m(R(12,24)),cfame:4,on:2,tam:6})},n:c=>`Võ đường mở lại nhưng thiếu người, chật vật giữ.`+fx(c,{money:-m(8),eq:1,cfame:1,tam:-2})},
  ...(e==='thua'||e==='hoagiai'?[{l:'Nhận cuốn bí kíp, tự luyện',f:c=>{const k=['kiem','noi','khinh'].filter(x=>!(c.flags.bk&&c.flags.bk[x]));if(k.length)c.flags.bk=Object.assign(c.flags.bk||{},{[pick(k)]:1});return `Cuốn bí kíp của thầy khai mở nhiều điều. Mình luyện thành một bộ công phu thật sự.`+fx(c,{vo:R(7,11),tri:2,tam:5})}}]:[]),
  {l:'Giữ lòng thanh thản, sống đời thường',f:c=>`Mình đặt thanh kiếm xuống. Nhà giữ gìn mấy đường võ, truyền cho con cháu như một kỷ niệm.`+fx(c,{eq:4,tam:7,on:1})}]}}
];
});
