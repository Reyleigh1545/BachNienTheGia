/* Bách Niên Thế Gia v6.4.1.8 · ba đường cướp ngôi
   Trạng thái nằm ở S.usurp (engine.js, usMonth chạy mỗi tháng). Mỗi đường là một chuỗi bước cố định (ts_q*, ts_v*, ts_n*), bước cuối quyết thành bại.
   Mỗi bước đều có lựa chọn "Từ bỏ con đường này". Ba thước đo: thế lực (the), danh nghĩa (danh), tài lực (tai), cộng thước "lộ" (lo): đầy là bị phát giác.
   Hậu quả của thất bại đi qua thang hậu quả của quan trường (G.ts.fail → qtSentence cấp 5), không diệt tộc ngay. */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const FM=v=>G.fmtMoney(v);const T=G.ts;const Q=G.qt;
const U=()=>T.U();const A=d=>{const u=U();return (u&&G.P(u.who))||G.P(d.who)};
const N=a=>a?esc(a.given):'người ấy';const K='Mưu đại sự';
const live=path=>{const u=U();return !!u&&u.path===path};
const abandon=()=>({l:'Từ bỏ con đường này',f:()=>T.abandon()});
/* O: dựng một lựa chọn. o.cost: tiền bỏ ra (ghi giá ngay trên nhãn); o.roll=[spec,độ khó]: gieo xúc xắc; o.ok/o.bad: thay đổi thước đo; o.p: hiệu ứng lên người cầm đầu;
   o.adv===false: không sang bước kế (sự kiện phụ); o.battle: thế lực xuống dưới 12 thì thua hẳn */
function O(l,o){const run=(eff,txt,d,okSide)=>{const e=Object.assign({money:-(o.cost||0)},eff||{});T.add(e);if(o.adv!==false)T.next();const a=A(d);
    let t=txt+((okSide?o.p:o.pb)?fx(a,okSide?o.p:o.pb):'');const u=U();
    if(o.battle&&u&&u.the<12)t+=' '+T.fail('thua trận liên tiếp, quân tan rã');return t};
  const r={l:o.cost?`${l} (${FM(o.cost)})`:l};if(o.cost)r.c=()=>G.money()>=o.cost;if(o.vio)r.vio=o.vio;
  if(o.roll){r.r=[o.roll[0],o.roll[1]];r.y=(c,d)=>run(o.ok,o.okTxt,d,true);r.n=(c,d)=>run(o.bad,o.badTxt,d,false)}
  else r.f=(c,d)=>run(o.ok,o.okTxt,d,true);return r}
function stp(id,path,t,x,opts){return {id,t,k:K,fixed:1,
  x:(c,d)=>live(path)?x(A(d),d,c):'Việc đã qua, chẳng còn gì để quyết.',
  o:(c,d)=>live(path)?[...opts(A(d),d,c),abandon()]:[{l:'Thôi',f:()=>''}]}}
const hint=k=>{const p=T.win(k);return p>=0.65?'Thế đã chín muồi.':p>=0.45?'Thành bại còn ngang ngửa.':'Thế còn mỏng, đi lúc này là liều.'};
const wait=()=>{const u=U();if(u){u.pending=false;u.next=S().t+R(6,12);u.lo=Math.min(100,u.lo+6)}};
const L=[];
/* ===================== Mở đầu, lộ tin, phát giác, nội phản ===================== */
L.push(
{id:'ts_mo_dau',t:'Lời thì thầm trong đêm',k:K,fixed:1,
 x:(c,d)=>{const a=G.P(d.who);const P=d.path;const dy=S().dyn&&S().dyn.k?G.vua.txt():'';
  return P==='quyen'?`${N(a)} ngồi ghế Nhất phẩm đã lâu. Quyền trong tay đã gần bằng quyền vua, mà ngôi vua lúc này ${pick(['chẳng vững','nhiều người dè bỉu','đang trong tay một người không xứng'])}. Nhiều người đã hiểu ý và âm thầm ngỏ lời. ${dy}`:
   P==='vo'?`${N(a)} là Đại tướng quân, binh quyền cả nước nằm trong tay. Triều đình ${pick(['bạc đãi võ tướng','đa nghi với người cầm quân','rối ren'])}. Dưới trướng đã có người rỉ tai: "Có binh trong tay, hà tất cúi đầu mãi?" ${dy}`:
   `${N(a)} giờ là cái tên mà dân quê ở đâu cũng nhắc, ${pick(['võ công khiến người ta phục','tướng mạo khiến người ta kính sợ'])}. Dân tình ${pick(['khổ vì sưu thuế','oán quan tham','đói kém'])}, người ta bắt đầu thì thầm rằng thiên mệnh đã đổi chủ. ${dy}`},
 o:(c,d)=>[{l:'Nghe tiếp, bước vào con đường này',f:c=>{T.start(d.path,d.who);return 'Đêm ấy là đêm đầu tiên. Từ nay mọi việc phải tính kỹ, và có thể bỏ cuộc bất cứ lúc nào, nhưng càng đi xa càng khó giấu.'}},
  {l:'Để một thời gian rồi tính',f:c=>{S().usWait={path:d.path,who:d.who,at:S().t+R(12,36)};return 'Chưa trả lời. Cánh cửa vẫn mở.'}},
  {l:'Từ chối, không nghĩ tới chuyện ấy',f:c=>{T.noPath(d.path);return 'Khách lặng lẽ rời đi, chuyện ấy không nhắc lại.'}},
  {l:'Tố giác lên triều',r:[{tri:1,eq:0.6},62],y:c=>{T.noPath(d.path);const a=G.P(d.who);if(a){a.cong=(a.cong||0)+80;G.tuocCheck(a,'tố giác mưu phản')}return 'Âm mưu bị dập từ trong trứng. Triều đình trọng thưởng.'+G.tuocNote()+fx(c,{fame:R(30,50)})},n:c=>{T.noPath(d.path);return 'Không đủ chứng cứ, bị coi là vu cáo.'+fx(c,{fame:-15,tam:-8})}}]},
{id:'ts_lo_tin',t:'Tin đồn lọt ra ngoài',k:K,fixed:1,
 x:(c,d)=>{const a=A(d);return `Trong triều có lời xì xào về những cuộc gặp kín ở nhà ${N(a)}. Chưa ai dám nói ra, nhưng đã có người ghi lại.`},
 o:(c,d)=>U()?[
  O('Dùng tiền bịt miệng những kẻ biết chuyện',{cost:m(40),adv:false,ok:{lo:-18},okTxt:'Miệng kín dần, tiếng xì xào lắng xuống.'}),
  O('Hy sinh một thuộc hạ làm vật thế thân',{adv:false,ok:{lo:-25,danh:-8,the:-6},okTxt:'Một người bị đẩy ra gánh tiếng. Lời đồn tắt, mà lòng người dưới trướng nguội đi.'}),
  O('Giả vờ không biết',{adv:false,roll:[{eq:0.8,khau:0.8},50],ok:{lo:-5},okTxt:'Bình thản như không, lời đồn tự nguội.',bad:{lo:+10},badTxt:'Vẻ bình thản càng khiến người ta nghi.'}),abandon()]:[{l:'Thôi',f:()=>''}]},
{id:'ts_noi_phan',t:'Một thuộc hạ thân tín bị bắt',k:K,fixed:1,
 x:(c,d)=>`Một người thân tín trong mưu đại sự bị quan phủ bắt vì chuyện khác. Hắn biết nhiều, và roi vọt thì không ai chịu mãi.`,
 o:(c,d)=>U()?[
  O('Bỏ vàng chuộc hắn ra',{cost:m(50),adv:false,ok:{lo:-6},okTxt:'Hắn được thả. Lời hắn khai chưa kịp thành văn.'}),
  O('Cắt đứt mọi liên hệ',{adv:false,ok:{lo:+8,the:-4},okTxt:'Hắn bị bỏ rơi. Người dưới trướng nhìn nhau, lòng bất an.'}),
  O('Tin hắn trung thành, không làm gì',{adv:false,roll:[{eq:1},50],ok:{lo:-3,the:+4},okTxt:'Hắn không khai nửa lời, lòng người dưới trướng càng thêm phục.',bad:{lo:+20},badTxt:'Hắn không chịu nổi, khai ra vài cái tên.'}),abandon()]:[{l:'Thôi',f:()=>''}]},
{id:'ts_phat_giac',t:'Mưu đại sự sắp bại lộ',k:K,fixed:1,
 x:(c,d)=>{const a=A(d);return `Ngự sử và cẩm y vệ đã nắm được nhiều chứng cứ. Chỉ còn nay mai là có lệnh bắt ${N(a)}. Mọi thứ đã đi quá nửa, nhưng thế chưa chắc đã đủ.`},
 o:(c,d)=>U()?[
  {l:'Khởi sự ngay trước khi bị bắt',f:c=>{const a=A(d);if(chance(Math.max(0.05,T.win('bien')-0.2))){T.crown(a,'vội');return '<b>Liều một phen, thành công!</b> Kinh thành đổi chủ trong một đêm.'}return T.fail('khởi sự vội không thành')}},
  {l:'Đào tẩu, giải tán mọi thứ',r:[{tri:0.8,muu:0.8},50],y:c=>T.abandon(),n:c=>T.fail('bị bắt trên đường trốn')},
  {l:'Đẩy một thuộc hạ thân tín ra gánh tội',f:c=>{const u=U();u.lo=70;u.exposed=false;u.pending=false;T.add({danh:-15,the:-10});return 'Một người đứng ra nhận hết. Lệnh bắt tạm hoãn, nhưng đêm nào cũng nghe tiếng lính đi.'}},
  {l:'Tự thú, xin khoan hồng',f:c=>{const a=A(d);T.end();return Q.sentence(a,3,'tự thú tội mưu đại sự')}}]:[{l:'Thôi',f:()=>''}]}
);
/* ===================== Đường 1: quyền thần lật đổ ===================== */
const q=(id,t,x,opts)=>L.push(stp(id,'quyen',t,x,opts));
q('ts_q1','Kết bè kéo cánh',(a)=>`Ngồi ghế Nhất phẩm, ${N(a)} nhận ra mỗi quan trong triều đều đã có chủ. Muốn đại sự phải có bè cánh trong sáu bộ.`,(a)=>[
  O('Mua chuộc các quan trong sáu bộ',{cost:m(60),vio:'trugian',ok:{the:+18,lo:+6},okTxt:'Vàng đi, lòng người ngả theo. Sổ sách các bộ có thêm vài cái tên.'}),
  O('Tiến cử người của mình vào các chỗ trống',{roll:[{eq:0.8,khau:0.6},55],ok:{the:+14,lo:+3},okTxt:'Một loạt chức nhỏ về tay người thân tín.',bad:{the:+5,lo:+9},badTxt:'Bị ngự sử để ý chuyện tiến cử thiên lệch.',vio:'camdang'}),
  O('Lặng lẽ nhận thêm môn sinh',{ok:{the:+10,danh:+4,lo:+2},okTxt:'Môn sinh cửa tướng phủ mỗi năm một đông.'})]);
q('ts_q2','Kết thông gia',(a)=>`Quyền thế bền nhất là quyền thế dựa vào máu mủ. Các nhà quyền quý trong triều đều đang tính chuyện thông gia.`,(a)=>[
  O('Gả con cháu cho nhà quyền quý trong triều',{ok:{the:+12,danh:+6,lo:+3},okTxt:'Hai nhà thành thông gia, từ nay có chuyện gì cũng có người đỡ lời.'}),
  O('Kết thông gia với dòng dõi tông thất',{roll:[{eq:0.8,mi:0.5},58],ok:{the:+10,danh:+14,lo:+5},okTxt:'Dòng máu tông thất vào nhà, danh nghĩa đã có chỗ dựa.',bad:{the:+4,lo:+10},badTxt:'Tông thất nhận lễ mà không nhận lời.'}),
  O('Chỉ dùng thư từ và quà biếu',{ok:{the:+6,lo:+1},okTxt:'Không ràng buộc ai, cũng không ai ràng buộc mình.'})]);
q('ts_q3','Cài nội ứng trong cung',(a)=>`Cung cấm là nơi quyết định mọi chuyện. Không có người ở trong thì mọi chuyện đều là đánh mù.`,(a)=>[
  O('Bỏ vàng mua chuộc thái giám hầu cận',{cost:m(80),vio:'trugian',ok:{the:+8,lo:+8,danh:+3},okTxt:'Từ nay mọi lời vua nói trong tẩm điện đều đến tai.'}),
  O('Cài người thân tín vào hàng cấm vệ',{roll:[{tri:0.7,muu:0.7},58],ok:{the:+14,lo:+5},okTxt:'Hai ba người thân tín đã đứng gác ngay cửa cung.',bad:{the:+4,lo:+14},badTxt:'Quan chỉ huy cấm quân nghi ngờ, điều tra lý lịch từng người.'}),
  O('Chỉ lắng nghe qua người quen',{ok:{lo:+2,the:+4},okTxt:'Biết chút ít, đỡ rủi ro.'})]);
q('ts_q4','Nắm cấm quân',(a)=>`Cấm quân giữ cung cấm là lực lượng quyết định. Ai nắm được cấm quân thì nắm được kinh thành.`,(a)=>[
  O('Đưa người của mình lên chỉ huy cấm quân',{roll:[{muu:0.7,eq:0.7},55],ok:{the:+18,lo:+6},okTxt:'Người của mình đã ngồi ghế chỉ huy cấm quân.',bad:{the:+4,lo:+16},badTxt:'Tờ tiến cử bị vua gạt, và vua hỏi vì sao lại là người này.'}),
  O('Chu cấp hậu hĩnh cho tướng giữ cấm quân',{cost:m(100),vio:'trugian',ok:{the:+14,lo:+4},okTxt:'Viên tướng nhận lễ, hứa sẽ không đứng ngăn.'}),
  O('Chưa dám động vào cấm quân',{ok:{lo:-3,the:+2},okTxt:'Thận trọng thêm một thời gian.'})]);
q('ts_q5','Tạo danh nghĩa',(a)=>`Không có danh nghĩa thì dù có quyền cũng chỉ là kẻ cướp. Phải để thiên hạ tin rằng đổi vua là hợp lẽ trời.`,(a)=>[
  O('Tung tin vua bất tài, mất lòng trời',{ok:{danh:+12,lo:+6},okTxt:'Chuyện xấu về nhà vua lan khắp phố chợ.',vio:'camdang'}),
  O('Nhờ danh nho, thầy địa lý nói mệnh trời đã đổi',{roll:[{khau:0.8,tri:0.5},G.than.has('giamchinh')?45:55],ok:{danh:+18,lo:+4},okTxt:'Thiên văn, sấm ký, điềm trời đều được đem ra làm bằng.',bad:{danh:+5,lo:+10},badTxt:'Lời sấm bị chê là gượng ép.'}),
  O('Gom sĩ phu ký tên xin vua nhường ngôi cho người hiền',{ok:{danh:+10,the:+3,lo:+8},okTxt:'Tờ danh sách dài, tên nào cũng có tiếng.'})]);
q('ts_q6','Dồn của cải, chọn thời cơ',(a)=>`Đại sự cần tiền. Cả sáu bộ chờ xem nhà ${N(a)} có đủ sức nuôi nổi bè cánh. Thời thế ${S().war?'đang loạn':'vẫn thái bình'}.`,(a)=>[
  O('Vét của cải dồn cho đại sự',{cost:m(150),ok:{tai:+25,the:+4},okTxt:'Kho nhà vơi đi, kho đại sự đầy lên.'}),
  O('Thu bạc từ môn sinh, quan lại dưới trướng',{vio:'trugian',ok:{tai:+15,lo:+7},okTxt:'Tiền chảy về, nhưng sổ sách thì đã nhiều người biết.'}),
  O('Chờ thêm cho vua yếu đi',{ok:{danh:+6,lo:+3,the:+3},okTxt:'Thời gian đứng về phía người biết chờ.'})]);
L.push(stp('ts_q_cuoi','quyen','Giờ quyết định',(a)=>`Quyền trong tay, bè cánh đã đủ, cấm quân đã yên. Chỉ còn chọn cách: ép nhà vua tự trao ngôi, hay một đêm chính biến. ${hint('thien')}`,(a,d)=>[
  {l:'Ép vua thiền nhượng',f:c=>{if(chance(T.win('thien'))){T.crown(a,'quyen-thien');return '<b>Nhà vua cúi đầu viết chiếu thiền nhượng.</b> Quân thần đồng thanh tung hô, kinh thành đổi chủ không đổ một giọt máu.'}return T.fail('ép vua thiền nhượng không thành')}},
  {l:'Chính biến cung đình trong đêm',f:c=>{if(chance(T.win('bien'))){T.crown(a,'quyen-bien');return '<b>Cấm quân mở cửa cung.</b> Trước khi trời sáng, triều đình đã đổi chủ.'}return T.fail('chính biến cung đình thất bại')}},
  {l:'Hoãn lại, chờ thế chín hơn',f:c=>{wait();return 'Hoãn binh. Càng lâu càng dễ lộ.'}}]));
/* ===================== Đường 2: võ quan tạo phản ===================== */
const v=(id,t,x,opts)=>L.push(stp(id,'vo',t,x,opts));
v('ts_v1','Nuôi tư binh',(a)=>`Binh quyền là của triều đình, nhưng lòng quân thì có thể là của riêng mình. Nuôi tư binh tốn tiền và ruộng mỗi năm.`,(a)=>[
  O('Tự bỏ tiền nuôi thêm gia binh',{cost:m(100),ok:{the:+16,lo:+5},okTxt:'Một đội gia binh tinh nhuệ dần thành hình.'}),
  O('Coi lính dưới quyền như quân riêng',{ok:{the:+10,lo:+8},okTxt:'Lính chỉ nghe lệnh một người.'}),
  O('Chiêu mộ dân khỏe mạnh tập luyện trong trại',{roll:[{vo:0.8,eq:0.6},55],ok:{the:+14,lo:+4},okTxt:'Trại luyện đông dần, tiếng hô vang sau tường.',bad:{the:+4,lo:+10},badTxt:'Quan huyện hỏi trại luyện nhiều người thế để làm gì.'})]);
v('ts_v2','Thu phục các tướng',(a)=>`Một người không đủ làm đại sự. Phải có những viên tướng cùng chí hướng, chịu cầm quân dưới tay mình.`,(a)=>[
  O('Kết giao các tướng bị triều đình bạc đãi',{roll:[{eq:0.8,khau:0.6},55],ok:{the:+16,danh:+4,lo:+6},okTxt:'Mấy viên tướng bất mãn đã chịu nghe lời.',bad:{the:+4,lo:+14},badTxt:'Một viên tướng không nhận lời và nhớ mặt người đến thuyết.'}),
  O('Biếu hậu hĩnh các tướng tham',{cost:m(90),vio:'trugian',ok:{the:+14,lo:+6},okTxt:'Tiền đưa ra, lòng tướng ngả về.'}),
  O('Chỉ kết giao với các tướng cũ từng sinh tử với mình',{ok:{the:+8,lo:+1},okTxt:'Chậm mà chắc.'})]);
v('ts_v3','Gom lương thảo',(a)=>`Quân không lương thì tan trong một mùa. Cần gom đủ lương và khí giới trước khi có động tĩnh.`,(a)=>[
  O('Mua gom lương thảo khắp nơi',{cost:m(120),ok:{tai:+22,lo:+6},okTxt:'Kho lương kín đáo đã đầy.'}),
  O('Bớt xén quân lương triều đình cấp',{vio:'trugian',ok:{tai:+14,lo:+12},okTxt:'Lính đói bụng, kho riêng đầy lên.',p:{cor:8}}),
  O('Chiếm kho lương dọc đường',{roll:[{vo:0.7,muu:0.7},55],ok:{tai:+18,lo:+8},okTxt:'Thuyền lương bị chặn, kho phân phát ra.',bad:{lo:+16,the:-6},badTxt:'Vụ cướp bị lộ, quan địa phương làm đơn tố lên triều.'})]);
v('ts_v4','Chờ thời',(a)=>`Thời cơ chưa tới. ${S().war?'Biên ải đang có biến, triều đình bận rộn.':'Thiên hạ thái bình, chưa ai muốn loạn.'} Trong lúc chờ, cần khiến triều đình đừng nghi ngờ.`,(a)=>[
  O('Chờ biên ải có biến',{ok:{danh:+6,lo:+2},okTxt:'Mỗi tin biên ải đều được theo dõi sát.'}),
  O('Dựng chuyện để triều đình nghi tướng khác',{ok:{lo:-4,the:+4},okTxt:'Mũi nhọn nghi ngờ quay sang người khác.'}),
  O('Gây tiếng về lòng trung của mình',{roll:[{khau:0.8,eq:0.6},55],ok:{lo:-12,danh:+4},okTxt:'Dâng sớ thề trung. Vua nghe xong mỉm cười.',bad:{lo:+3},badTxt:'Sớ thề trung đến quá đúng lúc, ai cũng thấy lạ.'})]);
v('ts_v5','Truyền hịch khởi binh',(a)=>`Đã đến lúc không còn đường lui. Một khi hịch truyền ra, thiên hạ sẽ biết ${N(a)} phản. Vẫn còn một lần cuối để dừng.`,(a)=>[
  O('Truyền hịch khởi binh',{ok:{the:+8,danh:+10,lo:+15},okTxt:'Hịch được đọc trước ba quân. Cờ phấp phới, trống trận nổi.'}),
  {l:'Lùi lại chờ thêm',f:c=>{wait();return 'Chưa phải lúc. Hịch vẫn nằm trong ống tay áo.'}}]);
const bt=(id,t,x,nm)=>v(id,t,()=>x,(a)=>{const u=U();const df=Math.round(66-(u.the-50)/5);return [
  O('Dàn trận chính diện',{roll:[{vo:1,tri:0.5},df],battle:1,ok:{the:+14,danh:+6,tai:-6,lo:+3},okTxt:`${nm} bị đánh tan. Quân ta thừa thắng tiến lên.`,bad:{the:-22,lo:+6,tai:-6},badTxt:'Trận đánh thất lợi, quân bị tổn thất nặng.'}),
  O('Đánh nghi binh, đột kích ban đêm',{roll:[{tri:1,muu:0.6},df+4],battle:1,ok:{the:+12,danh:+6,tai:-4,lo:+3},okTxt:`${nm} thất thủ trong một đêm.`,bad:{the:-18,lo:+5,tai:-4},badTxt:'Nghi binh bị nhìn thấu, quân mai phục bị bao vây.'}),
  O('Chiêu hàng viên tướng giữ thành',{roll:[{eq:1,khau:0.7},df-2],battle:1,ok:{the:+16,danh:+8,tai:-3,lo:+3},okTxt:`Viên tướng mở cổng ${nm.toLowerCase()} đầu hàng.`,bad:{the:-14,lo:+8,tai:-3},badTxt:'Sứ giả bị chém, lòng quân rúng động.'})]});
bt('ts_v6','Trận đầu: vây thành biên ải','Hịch đã truyền, thành đầu tiên chắn đường là thành biên ải. Thắng thì thiên hạ biết quân này không phải giặc cỏ.','Thành biên ải');
bt('ts_v7','Trận thứ hai: đánh quân tiếp viện','Triều đình đã sai quân tới ứng cứu, hai bên gặp nhau giữa đường.','Quân tiếp viện');
bt('ts_v8','Trận thứ ba: cửa ải kinh đô','Chỉ còn cửa ải cuối trước khi tới kinh thành. Triều đình dồn hết lực lượng phòng thủ ở đây.','Cửa ải');
L.push(stp('ts_v_cuoi','vo','Đánh vào kinh thành',(a)=>`Kinh thành ngay trước mắt. ${hint('bien')} Thắng là làm vua, bại thì họa diệt tộc treo ngay trên đầu.`,(a,d)=>[
  {l:'Đánh thẳng vào kinh',f:c=>{if(chance(Math.min(0.9,T.win('bien')+0.05))){T.crown(a,'vo');return '<b>Quân vào kinh thành!</b> Cửa cung bị phá, triều đình đổi chủ.'}return T.fail('đánh vào kinh thất bại')}},
  {l:'Vây thành, chờ trong thành tự loạn',f:c=>{wait();return 'Vây kín bốn cửa. Mỗi ngày trong thành thêm người trốn ra.'}}]));
/* ===================== Đường 3: khởi nghĩa ===================== */
const n=(id,t,x,opts)=>L.push(stp(id,'nghia',t,x,opts));
n('ts_n1','Hào kiệt quy tụ',(a)=>`Tiếng tăm của ${N(a)} lan khắp giang hồ. Hào kiệt các nơi bắt đầu tìm đến, kẻ vì nghĩa, kẻ vì thời.`,(a)=>[
  O('Mở tiệc anh hùng, kết giao hào kiệt',{cost:m(40),ok:{the:+14,danh:+6,lo:+4},okTxt:'Ba ngày ba đêm rượu thịt. Nhiều người nhận làm anh em.'}),
  O('Thu phục thủ lĩnh một ổ lục lâm',{roll:[{vo:0.8,eq:0.6},55],ok:{the:+18,lo:+5},okTxt:'Thủ lĩnh bại trận, cả ổ lục lâm theo về.',bad:{the:+4,lo:+9},badTxt:'Thủ lĩnh không phục, bỏ đi và đem chuyện kể lại.'}),
  O('Chỉ nhận những người đã nghe tiếng từ lâu',{ok:{the:+8,lo:+1},okTxt:'Ít mà tinh.'})]);
n('ts_n2','Phát lương cứu đói',(a)=>`Mùa này dân đói. Ai chia được miếng ăn cho dân thì dân nhớ ơn cả đời.`,(a)=>[
  O('Mở kho phát chẩn khắp vùng',{cost:m(120),ok:{danh:+22,the:+6,lo:+8},okTxt:'Dân xếp hàng dài cả mấy dặm. Người ta bắt đầu gọi tên một cách thân thương.'}),
  O('Lấy thóc nhà giàu chia cho dân',{roll:[{eq:0.8,vo:0.5},55],ok:{danh:+16,the:+8,lo:+10},okTxt:'Nhà giàu không dám kêu, dân kéo nhau đi theo.',bad:{danh:+4,lo:+16},badTxt:'Nhà giàu làm đơn tố, quan sai người tới tra.'}),
  O('Dạy dân cách tự nuôi nhau',{ok:{danh:+10,lo:+2},okTxt:'Việc chậm mà bền, được lòng người hiền.'})]);
n('ts_n3','Chiêu mộ dân chúng',(a)=>`Danh tiếng đã có, giờ cần người. Dân đói khổ nhiều, nhưng ai dám đi theo cũng phải cân nhắc.`,(a)=>[
  O('Treo cờ "trừ bạo cứu dân"',{ok:{the:+14,danh:+8,lo:+10},okTxt:'Lá cờ treo lên, ba ngày sau đã có hàng trăm người xin theo.'}),
  O('Giảng nghĩa lý cho dân nghe',{roll:[{khau:0.9,eq:0.6},55],ok:{the:+16,danh:+10,lo:+6},okTxt:'Dân nghe say sưa, nhiều người khóc.',bad:{the:+5,lo:+10},badTxt:'Giảng mãi mà dân còn sợ.'}),
  O('Rèn khí giới cho người theo mình',{cost:m(90),ok:{the:+12,tai:-4,lo:+7},okTxt:'Lò rèn đỏ lửa cả đêm.'})]);
n('ts_n4','Chiếm huyện',(a)=>`Huyện nha là nơi đầu tiên nghĩa quân đặt chân vào, cũng là nơi thiên hạ bắt đầu gọi đây là quân phản loạn.`,(a)=>[
  O('Đánh úp nha huyện trong đêm',{roll:[{vo:0.8,muu:0.6},58],ok:{the:+14,danh:+6,lo:+8},okTxt:'Nha huyện đổi chủ trước khi gà gáy.',bad:{the:-16,lo:+10},badTxt:'Quân canh nhà huyện đông hơn tưởng.'}),
  O('Để dân trong thành mở cổng đón',{roll:[{eq:0.9,khau:0.6},55],ok:{the:+16,danh:+10,lo:+6},okTxt:'Dân tự mở cổng, quan huyện bỏ chạy.',bad:{the:+2,lo:+10},badTxt:'Dân sợ quan, không ai dám mở.'}),
  O('Chờ quan huyện tham bị dân tố rồi vào',{ok:{danh:+10,lo:+3,the:+5},okTxt:'Quan bị dân lôi ra, nghĩa quân vào không tốn một mũi tên.'})]);
n('ts_n5','Chiếm phủ',(a)=>`Phủ thành có tường cao, có quân triều đình. Chiếm được phủ thì thiên hạ phải nhìn nhận đây là một thế lực.`,(a)=>[
  O('Vây phủ thành, cắt đường tiếp tế',{roll:[{tri:0.8,vo:0.6},58],ok:{the:+16,danh:+8,tai:-4,lo:+6},okTxt:'Trong thành hết lương, quan tri phủ mở cổng xin hàng.',bad:{the:-14,tai:-4,lo:+8},badTxt:'Vây mãi không hạ, quân triều đình đánh tạt hậu.'}),
  O('Dụ quân triều đình ra ngoài thành đánh',{roll:[{muu:1,vo:0.5},58],ok:{the:+16,danh:+8,lo:+6},okTxt:'Quân triều đình mắc bẫy, phủ thành bỏ ngỏ.',bad:{the:-16,lo:+8},badTxt:'Quân triều đình không mắc bẫy.'}),
  O('Gửi thư dụ hàng tri phủ',{cost:m(40),ok:{the:+10,danh:+6,lo:+7},okTxt:'Tri phủ nhận vàng, mở cổng ban đêm.'})]);
n('ts_n6','Tiến về kinh thành',(a)=>`Nghĩa quân đã thành thế lớn. Con đường về kinh còn dài và đầy cửa ải.`,(a)=>[
  O('Hợp với các nghĩa quân khác',{roll:[{eq:1,khau:0.7},55],ok:{the:+18,danh:+6,lo:+6},okTxt:'Mấy đạo quân hợp thành một, khí thế dâng cao.',bad:{the:+3,lo:+10},badTxt:'Các thủ lĩnh cãi nhau, ai cũng muốn làm đầu.'}),
  O('Mua chuộc quan giữ ải',{cost:m(100),vio:'trugian',ok:{the:+12,lo:+5},okTxt:'Cửa ải mở, quân đi qua không tốn một mũi tên.'}),
  O('Đi chậm, vừa đi vừa thu phục lòng dân',{ok:{danh:+14,the:+8,lo:+6},okTxt:'Đi tới đâu dân đón tới đó.'})]);
L.push(stp('ts_n_cuoi','nghia','Đánh vào kinh thành',(a)=>`Kinh thành đóng cửa cố thủ. Trong thành dân tâm đã ngả, nhưng quân triều đình vẫn còn. ${hint('bien')}`,(a,d)=>[
  {l:'Đánh vào kinh thành',f:c=>{if(chance(Math.min(0.9,T.win('bien')+0.04))){T.crown(a,'nghia');return '<b>Cửa thành mở toang!</b> Dân đổ ra đường đón nghĩa quân vào cung.'}return T.fail('đánh vào kinh thất bại')}},
  {l:'Vây thành, chờ lòng dân trong thành dậy',f:c=>{wait();return 'Vây kín bốn cửa. Trong thành lương hết dần.'}}]));
return L;});
