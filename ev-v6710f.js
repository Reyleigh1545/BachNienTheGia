/* Bách Niên Thế Gia v6.7.10-d9.11 · môn phái giang hồ đóng góp nhiều hơn cho gameplay (chủ dự án 23/11).
   (1) Viết lại 12 sự kiện gj_* cũ với hậu quả thật; gj_21 (môn phái chiêu đồ) chỉ còn cho người nghề Hiệp khách.
   (2) gj_03 thành chuỗi gj_03, gj_03b, gj_03c: cứu vợ một chưởng môn chính đạo, hộ tống đoàn tụ (chọn người nhà thật), nhận gia bảo tăng võ lực (gb_tran_phai, cộng cả gia tộc) và LỆNH BÀI NHẬP MÔN (S.lenhbai), dùng ở gj_lenh_bai cho một người con cháu vào phái không qua chọn lọc.
   (3) Môn phái thật sự: sự kiện tông phái tp_* (môn quy, truyền công, nhiệm vụ phái, phản đồ, chiến phí, lễ khai sơn, xuống núi, chọn công phu, tranh chức) và bốn kỳ ngộ tp_kn_*.
   Lợi ích và bổn phận khi nhập phái ở engine (monthlyPerson: rèn võ theo sức phái và bậc, giảm phí sinh hoạt, bổng; engine-x: gbGiveMid). */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const FM=v=>G.fmtMoney(v);const N=c=>esc(c.given);
const rk=c=>(c.flags&&c.flags.gh)||0;
const sects=()=>(S().wr&&S().wr.sects)||[];
const sectOf=c=>{const id=c.flags&&c.flags.ghs;return sects().find(s=>s.id===id)||null};
const sectFor=(c,al)=>{const L=sects().filter(s=>s.al===al);return L.length?pick(L):{n:'một môn phái lạ',al,boss:'một chưởng môn',pow:50,st:'quyền cước',id:'x'}};
const sectById=id=>sects().find(s=>s.id===id)||null;
const boss=s=>esc((s&&s.boss)||'chưởng môn');
const pay=(l,v,o)=>Object.assign({l:`${l} (${FM(m(v))})`,c:()=>G.money()>=m(v)},o);
const GH=o=>Object.assign({tags:{},k:'Giang hồ',cd:36,pcd:96,ms:1},o);
const TP=o=>Object.assign({tags:{},k:'Môn phái',job:['hiep'],age:[16,75],cd:30,pcd:60,w:0.9,ms:1,c:c=>rk(c)>=1&&!!sectOf(c)},o);
const KN=o=>Object.assign({tags:{},k:'Kỳ ngộ',ky:1,good:1,job:['hiep'],age:[16,75],cd:60,pcd:240,w:0.8,ms:1,c:c=>rk(c)>=1&&!!sectOf(c)},o);
const bkLearn=(c,k)=>{c.flags.bk=Object.assign(c.flags.bk||{},{[k]:1});return {kiem:'kiếm phổ',noi:'tâm pháp nội công',khinh:'khinh công'}[k]};
const bkHas=(c,k)=>!!(c.flags.bk&&c.flags.bk[k]);
const bkMiss=c=>['kiem','noi','khinh'].filter(k=>!bkHas(c,k));
const NAMES=['Mộc Lan','Thu Hà','Bạch Liên','Minh Nguyệt','Hạnh Dung','Tuyết Nhi'];
return [
/* ================= gj_03: người đàn bà bị truy đuổi (chuỗi) ================= */
GH({id:'gj_03',t:'Người đàn bà bị truy đuổi',age:[20,60],w:0.5,pcd:300,cd:96,
 x:c=>`Một người đàn bà áo rách, mặt lấm bụi nhưng cử chỉ không phải người thường dân, chạy thẳng vào sân nhà ${N(c)}, quỳ xuống van xin cho trốn. Ngoài cổng đã có tiếng ngựa và tiếng quát tháo.`,
 o:c=>{const good=sectFor(c,'chinh');return [
  {l:'Cho trốn vào kho, chặn cửa',r:[{muu:0.7,eq:0.5},50],y:c=>{const nm=pick(NAMES);G.later(c,'gj_03a',R(2,4),{sid:good.id,nm});return `Toán người truy đuổi lục qua sân, không thấy. Họ chửi rủa rồi đi. Người đàn bà run rẩy bước ra, xin được nghỉ lại vài hôm dưỡng thương.`+fx(c,{fame:2,tam:2,risk:2})},n:c=>{S().gjHate=(S().gjHate||0)+1;return 'Bị lục ra giữa kho. Bọn truy đuổi lôi bà đi, đập phá mấy thứ trong nhà rồi để lại lời đe: "Nhà này dám chứa người của chúng ta."'+fx(c,{money:-m(8),fame:-3,tam:-5,suc:-R(2,6)})}},
  {l:'Chặn ở cổng, đánh lạc hướng toán truy đuổi',c:c=>c.vo>=50,r:[{vo:0.9,suc:0.4,muu:0.4},45],y:c=>{const nm=pick(NAMES);G.later(c,'gj_03a',R(2,4),{sid:good.id,nm,hurt:1});return 'Mấy tay giang hồ bị đánh lạc, đuổi theo hướng khác. Người đàn bà được đưa vào hậu viện, ngã quỵ vì kiệt sức.'+fx(c,{vo:R(1,2),fame:R(4,8),suc:-R(3,8),tam:3,risk:3})},n:c=>{S().gjHate=(S().gjHate||0)+1;return 'Chúng đông hơn mình nghĩ. Mình bị đánh gục, người đàn bà bị bắt đi ngay trước mắt.'+fx(c,{suc:-R(10,20),fame:-3,tam:-6})}},
  pay('Nhờ quan viên can thiệp, đem lễ đến',5,{r:[{khau:0.7,eq:0.5},40],y:c=>{const nm=pick(NAMES);G.later(c,'gj_03a',R(2,4),{sid:good.id,nm});return 'Quan cho lính chặn đám người lại hỏi han, người đàn bà thừa lúc đó chạy vào nhà trốn kỹ. Quan nhận lễ và để mắt đến nhà.'+fx(c,{money:-m(5),fame:1,tam:1})},n:c=>'Quan bảo đây là chuyện giang hồ, không dây vào. Đám người đuổi bắt đã lôi bà đi.'+fx(c,{money:-m(5),fame:-1,tam:-3})}),
  {l:'Từ chối, bảo là chuyện không dính',f:c=>{S().gjRegret=(S().gjRegret||0)+1;return 'Người đàn bà nhìn mình rất lâu rồi lê bước ra cổng. Sau lưng là tiếng quát, rồi im bặt. Mình ngồi thừ ra suốt buổi.'+fx(c,{tam:-5,eq:-1})}}]}}),
{id:'gj_03b',t:'Người đàn bà kể chuyện',k:'Giang hồ',fixed:1,
 x:(c,d)=>{const s=sectById(d.sid)||sectFor(c,'chinh');return `Nghỉ vài ngày, người đàn bà ${d.hurt?'tỉnh lại sau cơn kiệt sức':'đã hồi sức'} và nói thật: bà tên ${esc(d.nm)}, vợ của ${boss(s)}, chưởng môn ${esc(s.n)}, một phái chính đạo. Môn phái tranh chấp với một thế lực khác, bị chia rẽ giữa đường, bà lạc khỏi đoàn rồi bị truy sát. Bà xin được đưa về sơn môn, nơi chồng bà đang lo bà đã chết.`},
 o:(c,d)=>{const s=sectById(d.sid)||sectFor(c,'chinh');const v=m(10);return [
  {l:`Cử một người nhà hộ tống bà về sơn môn (${FM(v)})`,c:c=>G.money()>=v&&G.kinList(c,p=>G.age(p)>=18&&G.age(p)<=50).length>0,go:(c,d2)=>G.pickKin(c,{eyebrow:'Hộ tống',title:'Cử ai đưa bà về sơn môn',text:`Đường về ${esc(s.n)} dài và nguy hiểm, kẻ truy sát có thể còn rình. Người được chọn sẽ rời nhà mấy tháng; võ lực, sức khỏe và mưu lược của người ấy quyết định chuyến đi. Chọn người nào?`,filter:p=>G.age(p)>=18&&G.age(p)<=50,cb:w=>{S().money-=v;const pr=Math.max(0.25,Math.min(0.88,0.3+(w.vo+w.suc+w.tri)/420));const win=chance(pr);G.setAway(w,{type:'odo',until:S().t+R(3,6)});G.later(c,'gj_03c',R(4,7),{sid:d.sid,nm:d.nm,w:w.id,win:win?1:0});return `${esc(w.given)} lên đường cùng bà ${esc(d.nm)}. ${win?'Dọc đường có kẻ rình nhưng không đoán nổi tuyến đi, hai người tới nơi bình an.':'Giữa đường bị phục kích, phải đánh thoát thân, tới nơi với vết thương nặng.'}`+fx(c,{tam:2})+fx(w,win?{vo:R(1,2),tam:3}:{suc:-R(10,20),tam:-4})}})},
  {l:'Tự mình đưa bà đi',c:c=>c.vo>=45&&G.age(c)<=55&&G.money()>=v,r:[{vo:0.7,suc:0.5,muu:0.4},45],y:c=>{S().money-=v;G.later(c,'gj_03e',R(4,7),{sid:d.sid,nm:d.nm,w:c.id,win:1});return 'Hai người đi suốt mười hôm, tới nơi an toàn.'+fx(c,{vo:R(1,3),suc:-R(2,6),fame:3,tam:3})},n:c=>{S().money-=v;G.later(c,'gj_03e',R(4,7),{sid:d.sid,nm:d.nm,w:c.id,win:0});return 'Giữa đường bị chặn, mình thoát nhưng bị thương nặng, bà vẫn tới nơi nhờ người sơn môn ra đón.'+fx(c,{suc:-R(12,22),fame:1,tam:-3})}},
  {l:'Giao bà cho quan, nhờ quan đưa về',f:c=>{G.later(c,'gj_03c',R(6,12),{sid:d.sid,nm:d.nm,w:null,win:0});return 'Quan nhận việc, nhưng lề mề. Bà đi trong xe áp giải, cảm ơn nhà mình một câu và không nói thêm.'+fx(c,{fame:1})}}]}},
{id:'gj_03c',t:'Đoàn tụ và lễ tạ',k:'Giang hồ',fixed:1,
 x:(c,d)=>{const s=sectById(d.sid)||sectFor(c,'chinh');const w=d.w?G.P(d.w):null;return d.win?`${boss(s)}, chưởng môn ${esc(s.n)}, ôm vợ khóc giữa sân sơn môn rồi quay lại cúi chào ${w?esc(w.given):'người hộ tống'}: "Ơn cứu vợ ta, ${esc(s.n)} không dám quên." Ông cho bày yến tạ và mang ra hai món quý tặng riêng nhà ${N(c)}.`:`Bà ${esc(d.nm)} về tới ${esc(s.n)} dù không trọn vẹn. ${boss(s)} nghe kể ân cứu mạng của nhà ${N(c)}, gửi một món quà tạ qua người đưa tin.`},
 o:(c,d)=>{const s=sectById(d.sid)||sectFor(c,'chinh');return d.win?[
  {l:'Nhận cả hai món, cúi đầu tạ ơn',f:c=>{G.gbGiveMid('gb_tran_phai');S().lenhbai=S().lenhbai||[];S().lenhbai.push({s:s.id,t:S().t,nm:s.n});s.pow=Math.min(100,(s.pow||50)+3);S().gjFriend=s.id;return `Hai món được trao tận tay: một cuốn **kiếm phổ trấn phái**, và một **lệnh bài nhập môn** của ${esc(s.n)}: sau này một người con cháu cầm lệnh bài tới sơn môn thì được nhận thẳng, không phải qua chọn lọc. Chưởng môn dặn: "Nhà này luôn có ghế ở ${esc(s.n)}."`+fx(c,{fame:R(10,18),tam:6})}},
  {l:'Chỉ nhận lệnh bài, trả lại kiếm phổ',f:c=>{S().lenhbai=S().lenhbai||[];S().lenhbai.push({s:s.id,t:S().t,nm:s.n});s.pow=Math.min(100,(s.pow||50)+3);S().gjFriend=s.id;return `Chưởng môn nhìn rất lâu rồi gật đầu: "Biết giữ phận, đáng quý." Ông trao lệnh bài nhập môn và nói sẽ nhớ cái đức này.`+fx(c,{fame:R(14,22),eq:1,tam:6})}}]:[
  {l:'Nhận món quà nhỏ, giữ tình',f:c=>{S().lenhbai=S().lenhbai||[];S().lenhbai.push({s:s.id,t:S().t,nm:s.n});S().gjFriend=s.id;return `Món quà là một **lệnh bài nhập môn** của ${esc(s.n)} cùng ít bạc. Không có kiếm phổ vì ông bảo chưa tiện, nhưng lệnh bài vẫn còn nguyên giá trị: một người con cháu cầm tới sơn môn sẽ được nhận không qua chọn lọc.`+fx(c,{money:m(R(5,10)),fame:R(4,8),tam:3})}}]}},
/* ================= lệnh bài nhập môn ================= */
{id:'gj_lenh_bai',t:'Lệnh bài nhập môn',k:'Giang hồ',head:1,age:[30,80],w:1.2,pcd:36,cd:24,tags:{},c:c=>!!(S().lenhbai&&S().lenhbai.length)&&G.kinList(c,p=>G.age(p)>=16&&G.age(p)<=35&&p.job!=='hiep'&&p.job!=='quan'&&p.job!=='quan_ngu').length>0,
 x:c=>{const t=S().lenhbai[0];return `Chiếc lệnh bài của ${esc(t.nm||'một môn phái')} vẫn nằm trong hộp gỗ ở bàn thờ. Người nhà có đứa đến tuổi rèn võ, ${N(c)} nghĩ đã đến lúc dùng suất nhập môn ấy, nhưng đây là lệnh bài một lần: dùng cho ai là dùng hết.`},
 o:c=>{const t=S().lenhbai&&S().lenhbai[0];return [
  {l:'Trao lệnh bài cho một người con cháu',c:c=>!!t&&G.kinList(c,p=>G.age(p)>=16&&G.age(p)<=35&&p.job!=='hiep'&&p.job!=='quan'&&p.job!=='quan_ngu').length>0,go:(c,d)=>G.pickKin(c,{eyebrow:'Lệnh bài nhập môn',title:'Cho ai vào '+(t?t.nm:'môn phái'),text:'Người được chọn sẽ rời nhà, lên sơn môn làm môn sinh, tập võ và gánh bổn phận của phái; bỏ nghề hiện tại. Không phải qua chọn lọc, nhưng cũng phải tự thân vượt qua đường dài. Chọn người nào?',filter:p=>G.age(p)>=16&&G.age(p)<=35&&p.job!=='hiep'&&p.job!=='quan'&&p.job!=='quan_ngu',cb:w=>{const s=sectById(t.s)||sectFor(c,'chinh');S().lenhbai.shift();G.setJob(w,'hiep');w.away={type:'jh'};w.flags.gh=1;w.flags.ghs=s.id;w.purse=(w.purse||0)+m(5);return `${esc(w.given)} cầm lệnh bài lên sơn môn ${esc(s.n)}, được nhận làm môn sinh ngay giữa sân. Nhà thêm một người trong giang hồ, có chỗ dựa vững.`+fx(c,{fame:3,tam:-2})+fx(w,{vo:R(2,4),tam:5})}})},
  {l:'Cất lại, đợi người xứng đáng hơn',f:c=>'Lệnh bài nằm lại trong hộp gỗ, chờ một đời sau.'+fx(c,{tam:1})}]}},
/* ================= 12 sự kiện gj_* viết lại có hậu quả ================= */
GH({id:'gj_02',t:'Kẻ say gây sự',age:[18,55],c:c=>c.g==='nam',w:0.7,
 x:c=>`Trong quán, một gã say vỗ bàn, chỉ mặt ${N(c)} bảo nhìn bất lịch sự. Cả quán nín thở. Gã đeo kiếm, áo có thêu một dấu hiệu của một môn phái.`,
 o:c=>{const s=sectFor(c,'trung');return [
  {l:'Mời gã một chén rượu, hạ giọng',r:[{eq:0.8,khau:0.4},60],y:c=>{S().gjFriendMan=1;return 'Gã nhận chén, cười ngượng, tự xưng là đệ tử '+esc(s.n)+'. Từ đó gặp lại thì gã chào, nhiều lần còn báo tin cho mình.'+fx(c,{fame:2,eq:1,tam:2})},n:c=>'Gã hất chén, sấn tới. Mình bị đẩy ngã trước cả quán.'+fx(c,{tam:-3,suc:-3,fame:-2})},
  {l:'Đứng dậy rời quán',f:c=>'Rời đi, sau lưng tiếng cười khẩy. Chuyện này sẽ theo mình một thời gian.'+fx(c,{fame:-2,tam:-2})},
  {l:'Chấp nhận thử sức',r:[{vo:0.8,suc:0.3},55],y:c=>{G.later(c,'gj_02b',R(10,30),{sid:s.id,win:1});return 'Gã ngã sấp, rượu tỉnh hẳn. Cả quán nể. Nhưng gã nhìn mình bằng ánh mắt khác.'+fx(c,{fame:R(4,8),vo:R(1,2),tam:3})},n:c=>{G.later(c,'gj_02b',R(10,30),{sid:s.id,win:0});return 'Gã khỏe hơn nhìn, mình bị đánh đau và mất mặt. Gã còn hứa sẽ gặp lại.'+fx(c,{suc:-R(6,12),fame:-4,tam:-4})}}]}}),
{id:'gj_02b',t:'Gã say năm xưa trở lại',k:'Giang hồ',fixed:1,
 x:(c,d)=>{const s=sectById(d.sid);return d.win?`Gã say năm xưa trở lại, lần này tỉnh táo và dẫn theo hai người của ${s?esc(s.n):'môn phái'}. Gã bảo mình đã nghe danh ${N(c)} và muốn mời so tài đàng hoàng, có người chứng kiến.`:`Gã say năm xưa trở lại, lần này đi cùng mấy huynh đệ. Gã bảo ơn xưa chưa trả, mấy người kia đòi "dạy" ${N(c)} một bài học.`},
 o:(c,d)=>d.win?[
  {l:'Nhận lời, so tài công khai',r:[{vo:0.8,suc:0.3},55],y:c=>'Thắng đẹp, các huynh đệ vỗ tay. Gã bắt tay, thành người quen.'+fx(c,{fame:R(6,12),vo:R(1,2),tam:5}),n:c=>'Thua nửa chiêu nhưng được khen. Mấy người ấy mời rượu.'+fx(c,{fame:R(1,4),suc:-R(4,8),vo:1,tam:-1})},
  {l:'Từ chối khéo, mời cơm',f:c=>'Gã hơi tiếc nhưng bằng lòng. Tình xã giao giữ được.'+fx(c,{fame:1,tam:1})}]:[
  {l:'Đối đầu, không lùi bước',r:[{vo:0.9,suc:0.5,gan:0.3},40],y:c=>'Mình đánh lui cả bọn, vết thương nhẹ. Tiếng tăm tăng nhanh.'+fx(c,{fame:R(8,14),vo:R(1,3),suc:-R(3,8),tam:3}),n:c=>'Bị đánh trọng thương, nằm dưỡng cả tháng.'+fx(c,{suc:-R(14,26),fame:-5,tam:-6})},
  pay('Xin lỗi, mời rượu, giải hòa',6,{f:c=>'Mấy người đó cười nhạt nhận rượu. Mình mất mặt nhưng giữ được thân.'+fx(c,{money:-m(6),fame:-2,tam:-3})})]},
GH({id:'gj_10',ms:1,t:'Gánh hát giang hồ',age:[16,70],w:0.7,
 x:c=>`Một gánh hát giang hồ dựng rạp ngoài bãi. Đêm diễn kể chuyện hiệp nghĩa, người xem đứng kín. Trưởng gánh mời ${N(c)} lên xem hàng đầu và thì thầm: gánh hát đi khắp nơi, nghe được nhiều chuyện đáng nghe.`,
 o:c=>[pay('Mua vé hàng đầu, mời trưởng gánh ngồi uống',4,{f:c=>{const gw=S().wr&&S().wr.gwar;const t=gw?'Gánh hát vừa đi qua nơi hai phái đang giao tranh, ông kể rành rọt tình hình từng bên; mình ghi nhớ.':'Ông kể chuyện giang hồ khắp vùng, nghe tới tận khuya.';if(S().wr&&S().wr.gwar)S().wr.gwar.da=(S().wr.gwar.da||0);return t+fx(c,{money:-m(4),tam:5,tri:1,eq:1})}}),
  pay('Bỏ bạc tài trợ gánh hát một mùa',25,{f:c=>{G.later(c,'gj_10b',R(12,30),{});return 'Gánh hát nhận bạc, hứa mùa sau ghé lại báo đáp. Tên nhà mình được xướng lên trước mỗi buổi diễn.'+fx(c,{money:-m(25),fame:R(5,9),tam:4})}}),
  {l:'Xem từ xa',f:c=>'Vẫn nghe rõ tiếng trống.'+fx(c,{tam:2})}]}),
{id:'gj_10b',t:'Gánh hát báo đáp',k:'Giang hồ',fixed:1,
 x:c=>`Gánh hát năm nào được nhà ${N(c)} tài trợ trở lại, đông người hơn. Trưởng gánh mang tới một món quà: một quyển sổ chép tay các thế võ ông thu nhặt khắp nơi, và một lời nhắn: có người đang hỏi dò về nhà.`,
 o:c=>[{l:'Nhận quà, nghe lời nhắn',f:c=>{const miss=bkMiss(c);let t='';if(miss.length&&chance(0.4)){t='Trong sổ có một phần '+bkLearn(c,pick(miss))+' đáng học. ';}if(!(c.flags.bk&&c.flags.bk.kiem)||chance(0.5)){t+=' '+bkLearn(c,pick(['kiem','noi','khinh']))+' chép trong sổ đã thành bí kíp thật của mình. ';}return t+'Người hỏi dò hóa ra là một người thân của một tay giang hồ từng mang ơn nhà. Gánh hát nhận một vài lời nhờ vả cuối rồi lên đường.'+fx(c,{vo:R(6,9),tri:2,fame:3,tam:4})}},
  {l:'Tạ ơn, không nhận quà',f:c=>'Trưởng gánh nể cái đức ấy. Tên mình được nhắc ở nhiều nơi.'+fx(c,{fame:R(4,8),eq:1,tam:2})}]},
GH({id:'gj_13',t:'Tin đồn bí kíp',age:[18,55],c:c=>c.vo>=40,w:0.6,
 x:c=>`Trong quán nước, người ta xì xào: bộ bí kíp của một môn phái bị mất trộm đã xuất hiện ở chợ đen. Nhiều người đang lục tìm, kẻ thì muốn bí kíp, kẻ thì muốn trả cho chủ nhận thưởng.`,
 o:c=>{const s=sectFor(c,'chinh');return [
  {l:'Đi dò theo tin',r:[{muu:0.6,eq:0.4},45],y:c=>{const miss=bkMiss(c);if(miss.length){const nm=bkLearn(c,pick(miss));return `Lần theo manh mối ra tay lái buôn giữ sách, thuyết phục hắn cho chép một phần: mình học được ${nm}.`+fx(c,{vo:R(1,3),fame:3,eq:1,tam:3})}return 'Lần ra manh mối, tìm lại bộ sách cho chủ nhận thưởng lớn.'+fx(c,{money:m(8),fame:5,tam:3})},n:c=>'Bị lừa đi một vòng, tốn tiền, còn bị một nhóm khác theo dõi.'+fx(c,{money:-m(10),tam:-3,risk:2})},
  pay('Mua lại từ chợ đen',30,{r:[{tri:0.6,khau:0.5},60],y:c=>{const miss=bkMiss(c);const nm=miss.length?bkLearn(c,pick(miss)):null;return nm?`Bản sách là thật. Mình học ${nm}, nhưng nhớ rằng đây là của người khác.`+fx(c,{money:-m(30),vo:R(2,4),tam:3,fame:-1}):'Bản sách là thật, nhưng mình đã biết những thế ấy.'+fx(c,{money:-m(30),tri:1,tam:1})},n:c=>'Mua phải sách giả.'+fx(c,{money:-m(30),tam:-5,fame:-1})}),
  {l:`Báo cho ${esc(s.n)}, giúp họ tìm lại`,f:c=>{s.pow=Math.min(100,(s.pow||50)+1);S().gjFriend=S().gjFriend||s.id;return `${esc(s.n)} nhận tin, tìm lại được bộ sách, gửi lời tạ và tặng một món quà.`+fx(c,{money:m(R(3,6)),fame:R(5,9),tam:4})}},
  {l:'Nghe cho vui',f:c=>'Chuyện qua đi như nhiều chuyện khác.'}]}}),
GH({id:'gj_16',ms:1,t:'Thầy thuốc giang hồ',age:[18,70],c:c=>c.suc<80,w:0.6,
 x:c=>`Một thầy thuốc lang thang dựng quán ven đường, treo bảng "chữa thương, giải độc, mát gân cốt". Ông nhìn ${N(c)} chằm chằm, bảo mình có chỗ ứ nghẽn trong người mà tự mình chưa biết.`,
 o:c=>[pay('Cho ông xem mạch và xoa bóp',8,{r:[{eq:0.5,tri:0.3},60],y:c=>'Một lát sau thấy nhẹ cả người, ngủ ngon cả mấy đêm.'+fx(c,{money:-m(8),suc:R(3,7),tam:3}),n:c=>'Chẳng thấy khác biệt gì, nhưng ông có để lại một vài lời dặn về cách thở.'+fx(c,{money:-m(8),tri:1})}),
  pay('Xin ông truyền cách vận khí, trả công một khóa',40,{c:c=>!bkHas(c,'noi')&&G.money()>=m(40),r:[{tri:0.6,eq:0.4},55],y:c=>{const nm=bkLearn(c,'noi');return `Ông dạy suốt một tháng. Mình học được ${nm} căn bản: sức khỏe bền hơn về sau.`+fx(c,{money:-m(40),suc:R(4,8),tri:1,tam:4})},n:c=>'Ông dạy nhưng mình chưa nắm được ý. Hoàn công nửa số tiền.'+fx(c,{money:-m(20),tam:-2})}),
  {l:'Cười, đi tiếp',f:c=>'Đi một đoạn thấy lưng hơi mỏi.'+fx(c,{tam:-1})}]}),
GH({id:'gj_21',t:'Môn phái chiêu đồ',job:['hiep'],age:[16,45],c:c=>c.vo>=45&&rk(c)===0&&!(c.flags.ghs&&c.flags.ghs!=='none'),w:0.5,pcd:240,
 x:c=>{const s=sectFor(c,'chinh');return `Người của ${esc(s.n)}, phái chính đạo sở trường ${esc(s.st)}, gặp ${N(c)} giữa đường lang bạt, ngỏ ý mời nhập môn. Điều kiện: phải thật sự nhập phái, ở sơn môn, theo môn quy và chịu sự điều khiển của phái.`},
 o:c=>{const s=sectFor(c,'chinh');return [
  {l:`Xin bái sư ở ${esc(s.n)}, nhập phái thật sự`,r:[{vo:0.6,suc:0.4,eq:0.3},55],y:c=>{c.flags.gh=1;c.flags.ghs=s.id;return `${esc(s.n)} nhận làm môn sinh. Từ nay có chỗ nương tựa, có sư phụ, nhưng cũng có môn quy và bổn phận.`+fx(c,{vo:R(3,6),suc:2,fame:2,tam:4})},n:c=>'Người ta chê "chưa đủ căn cơ", bảo trở lại sau.'+fx(c,{tam:-3})},
  {l:'Từ chối, tiếp tục lang bạt một mình',f:c=>'Người ta chắp tay đi, bảo nếu đổi ý cứ tìm tới sơn môn.'+fx(c,{tam:-1})}]}}),
GH({id:'gj_29',t:'Giỗ tổ sư',job:['hiep','tieu','quan_ngu'],age:[22,65],w:0.5,
 x:c=>{const s=sectOf(c)||sectFor(c,'trung');return `Đến ngày giỗ tổ của ${esc(s.n)}, người cũ trong môn phái gửi thư mời ${N(c)} về dự. Nhiều năm rồi mình chưa về. Trong buổi giỗ, chưởng môn thường chọn một người đứng ra dâng hương và truyền một đoạn tâm pháp.`},
 o:c=>{const s=sectOf(c)||sectFor(c,'trung');return [
  {l:'Về dự, mang lễ trọng',c:()=>G.money()>=m(8),r:[{eq:0.7,tri:0.4},60],y:c=>{const miss=bkMiss(c);let t='';if(rk(c)>=1&&miss.length&&chance(0.4))t=' Chưởng môn gọi mình lên đứng bên, truyền một đoạn '+bkLearn(c,pick(miss))+'.';s.pow=Math.min(100,(s.pow||50)+1);return 'Gặp lại sư huynh, sư đệ cũ, cùng uống chén rượu thương nhớ.'+t+fx(c,{money:-m(8),tam:6,fame:R(2,5),eq:1})},n:c=>'Về muộn, buổi giỗ đã xong. Anh em không trách nhưng lòng ngượng.'+fx(c,{money:-m(8),tam:-2})},
  {l:'Gửi thư và lễ vật',f:c=>'Thư dài, lòng nặng. Người cũ ghi nhận lòng nhớ.'+fx(c,{money:-m(3),tam:2})},
  {l:'Không về',f:c=>{if(rk(c)>=1&&chance(0.3)){c.flags.gh=Math.max(0,rk(c)-1);return 'Chưởng môn ghi nhớ sự vắng mặt, hạ một bậc trong sổ môn sinh vì bỏ lễ tổ.'+fx(c,{tam:-5,fame:-2})}return 'Một nỗi buồn mơ hồ, và vài người bàn tán.'+fx(c,{tam:-3})}}]}}),
GH({id:'gj_44',t:'Tuyệt học sắp thất truyền',age:[25,70],c:c=>c.vo>=60&&c.tri>=50,w:0.4,
 x:c=>{const s=sectFor(c,'chinh');return `Một lão nhân tìm đến ${N(c)}, nói ông là người cuối cùng biết trọn một bộ công phu của ${esc(s.n)} thuở xưa. Ông sắp mất, mà đệ tử không còn. Học bộ công phu đó phải bỏ nhiều tháng ròng, và có người lăm le cướp sách.`},
 o:c=>[{l:'Nhận học, bỏ ba tháng theo hầu',c:c=>!c.away,r:[{vo:0.7,tri:0.5},50],y:c=>{const miss=bkMiss(c);const nm=miss.length?bkLearn(c,pick(miss)):null;G.setAway(c,null);return `Học suốt ba tháng. Lão nhân mất, mình thành người truyền tay cuối.`+(nm?` Trong đó có ${nm} thật sự.`:'')+fx(c,{vo:R(5,9),tri:1,fame:5,tam:5,suc:-R(1,4)})},n:c=>'Lão nhân mất giữa chừng, bộ công phu dang dở. Có kẻ lạ ghé nhà hỏi dò.'+fx(c,{vo:2,tam:-3,risk:2})},
  {l:'Xin lão nhân truyền cho người khác',f:c=>'Lão nhân buồn rầu, đi tìm người khác. Bộ công phu có lẽ thất truyền thật.'+fx(c,{tam:-2})}]}),
GH({id:'gj_62',t:'Xếp hạng giang hồ',age:[22,60],c:c=>c.vo>=70&&['hiep','tieu','quan_ngu'].includes(c.job),w:0.5,pcd:300,
 x:c=>`Trong giang hồ lưu truyền một bảng xếp hạng "cao thủ", chép tay, truyền miệng. Tên ${N(c)} bất ngờ được nhắc ở một hàng gần cuối, và từ đó có người tìm tới để thử.`,
 o:c=>[{l:'Cười trừ, không bận tâm',f:c=>{G.later(c,'gh_thach_dau',R(6,18),{});return 'Danh tiếng đến tự nhiên, rồi người thử tài cũng đến tự nhiên.'+fx(c,{fame:3,tam:2})}},
  {l:'Tìm người ở hàng trên để thử',r:[{vo:0.8,suc:0.3},40],y:c=>{G.later(c,'gh_thach_dau',R(3,9),{});return 'Thắng. Tên mình nhích lên hàng trước, tên người cũ tụt xuống: chắc chắn họ sẽ tìm mình.'+fx(c,{fame:R(8,14),vo:R(1,2),tam:4})},n:c=>'Thua, nhưng người kia khen, bảo nên luyện thêm.'+fx(c,{fame:R(1,3),suc:-R(6,12),tam:-2,vo:1})}]}),
GH({id:'gj_63',t:'Kẻ thù truyền đời',age:[25,65],c:c=>c.vo>=55,w:0.4,
 x:c=>{const s=sectFor(c,'ta');return `Một thanh niên của ${esc(s.n)} chặn đường ${N(c)}: "Ông của ngươi đã giết thầy của thầy ta. Hôm nay ta tới trả."`},
 o:c=>{const s=sectFor(c,'ta');return [
  {l:'Hỏi rõ ngọn ngành',r:[{eq:0.7,tri:0.5},50],y:c=>{S().gjFriendMan=1;return 'Hóa ra có sự hiểu lầm do kẻ thứ ba dựng chuyện. Hai bên bắt tay giảng hòa, thanh niên mang ơn.'+fx(c,{fame:4,tam:4,eq:1})},n:c=>{G.later(c,'gj_63b',R(12,36),{sid:s.id});return 'Thanh niên không nghe, rút kiếm. Mình thoát với vết thương, nhưng hắn còn thề sẽ trở lại.'+fx(c,{suc:-R(5,10),tam:-3})}},
  {l:'Giao đấu',r:[{vo:0.8,suc:0.3},50],y:c=>{G.later(c,'gj_63b',R(12,36),{sid:s.id});return 'Thanh niên thua, mà mắt vẫn đỏ. Ân oán chưa dứt, hắn sẽ quay lại mạnh hơn.'+fx(c,{fame:5,vo:1})},n:c=>{G.later(c,'gj_63b',R(8,24),{sid:s.id});return 'Bị thương nặng. Thanh niên bỏ đi, bảo hôm nay tha, lần sau sẽ không.'+fx(c,{suc:-R(8,16),fame:-2,tam:-4})}},
  {l:'Tránh mặt',f:c=>{G.later(c,'gj_63b',R(6,18),{sid:s.id});return 'Về sau thanh niên ấy còn quay lại, lần này mang theo người.'+fx(c,{tam:-3})}}]}}),
{id:'gj_63b',t:'Thanh niên ôm hận trở lại',k:'Giang hồ',fixed:1,
 x:(c,d)=>{const s=sectById(d.sid)||sectFor(c,'ta');return `Thanh niên của ${esc(s.n)} xuất hiện lần nữa, lần này đứng giữa ba người, tay đặt trên chuôi kiếm. Hắn đã luyện thêm một thứ gì đó, mắt vẫn mang cái hận cũ.`},
 o:(c,d)=>[{l:'Đối đầu, kết thúc ân oán',r:[{vo:0.9,suc:0.5},45],y:c=>'Một trận quyết liệt. Mình thắng, nhưng tha mạng và dặn hắn đừng lặp lại. Giang hồ kể chuyện nhân đức này.'+fx(c,{fame:R(8,14),vo:R(1,3),suc:-R(4,10),tam:4}),n:c=>'Mình thua, mất một phần tài sản và tiếng tăm. Hắn bỏ đi, bảo ân oán xong.'+fx(c,{money:-m(8),fame:-5,suc:-R(10,20),tam:-5})},
  pay('Nói chuyện với người đứng sau, tìm nguồn hiểu lầm',12,{r:[{tri:0.7,eq:0.6},50],y:c=>'Điều tra ra kẻ dựng chuyện. Hai bên cùng đi báo thù kẻ đó, thành đồng minh.'+fx(c,{money:-m(12),fame:R(6,10),eq:1,tam:5}),n:c=>'Không tìm ra ai. Chuyện vẫn treo.'+fx(c,{money:-m(12),tam:-3})}),
  {l:'Rời vùng này, lánh nạn',f:c=>'Tiếng đồn mình trốn tránh lan nhanh. Nhà mất thể diện.'+fx(c,{fame:-6,tam:-4})}]},
GH({id:'gj_64',t:'Mối thù của cha',age:[18,50],c:c=>c.vo>=50&&G.alive().some(p=>p.dead!=null&&c.parents.includes(p.id)),w:0.3,
 x:c=>{const s=sectFor(c,'ta');return `Một ông lão nói với ${N(c)}: cha mình mất năm xưa không phải do bệnh, mà do một người của ${esc(s.n)} ra tay. Ông có chứng cứ, nhưng đòi thêm thời gian để tìm thêm.`},
 o:c=>{const s=sectFor(c,'ta');return [
  {l:'Đi cùng ông tìm thêm chứng cứ',r:[{muu:0.6,eq:0.4},50],y:c=>{G.later(c,'gj_64b',R(6,18),{sid:s.id});return 'Tìm ra sự thật và tên kẻ ra tay. Chứng cứ rõ ràng, nhưng kẻ đó đã thành một nhân vật có thế trong phái.'+fx(c,{fame:3,tam:-2})},n:c=>'Manh mối đứt, ông lão ốm nặng giữa đường. Lòng càng nặng.'+fx(c,{tam:-5,suc:-3})},
  {l:'Xin ông để cho yên',f:c=>'Ông lão buồn rầu, nhưng nghe. Mối thù chìm xuống đáy, đôi khi vẫn nhói.'+fx(c,{tam:-2})}]}}),
{id:'gj_64b',t:'Đối mặt kẻ giết cha',k:'Giang hồ',fixed:1,
 x:(c,d)=>{const s=sectById(d.sid)||sectFor(c,'ta');return `Có chứng cứ trong tay, ${N(c)} phải quyết cách đòi lại công đạo với kẻ trong ${esc(s.n)}. Hắn nay đã là trưởng lão, có người bảo vệ, không dễ đụng tới.`},
 o:(c,d)=>{const s=sectById(d.sid)||sectFor(c,'ta');return [
  {l:'Mang chứng cứ tới quan phủ kiện',r:[{eq:0.7,tri:0.7,khau:0.4},45],y:c=>{s.pow=Math.max(5,(s.pow||50)-4);return 'Quan thụ lý, kẻ đó bị xử. Mối thù gỡ bằng pháp luật, tiếng tăm nhà mình vang xa, nhưng phái đó ghi hận.'+fx(c,{fame:R(10,16),tam:8,risk:2})},n:c=>'Chứng cứ bị bác vì không đủ hiệu lực. Kẻ đó còn tố ngược mình vu cáo.'+fx(c,{fame:-5,tam:-6,money:-m(10)})},
  {l:'Giao đấu công khai, thách thức tay trưởng lão',r:[{vo:1,suc:0.5,gan:0.4},35],y:c=>{s.pow=Math.max(5,(s.pow||50)-6);return 'Một trận chấn động, mình thắng và hạ kẻ giết cha. Phái ấy tức giận, nhưng giang hồ kính trọng chữ hiếu.'+fx(c,{fame:R(12,22),vo:R(2,4),suc:-R(10,20),tam:8})},n:c=>'Thua trận, bị trọng thương. Kẻ đó tha mạng vì sợ tiếng.'+fx(c,{fame:-6,suc:-R(18,30),tam:-8})},
  {l:'Tha, mang tro cốt cha về thờ cho yên lòng',f:c=>'Có chứng cứ, có tên kẻ ra tay, nhưng chọn buông. Lòng nhẹ đi, người đời kính cái đức ấy.'+fx(c,{fame:R(2,5),eq:2,tam:3})}]}},
GH({id:'gj_69',ms:1,t:'Cẩm y vệ truy bắt',job:['hiep'],age:[20,60],w:0.5,
 x:c=>`Người của cẩm y vệ đã đến thị trấn, hỏi về một cao thủ vừa phạm tội. Mô tả giống nhiều người, trong đó có ${N(c)}. Họ đang giữ một danh sách nghi phạm và có quyền bắt người hỏi cung.`,
 o:c=>[{l:'Nói rõ mình không phải',r:[{khau:0.7,eq:0.5},55],y:c=>'Họ gật đầu, bỏ đi.'+fx(c,{tam:2,fame:1}),n:c=>{G.later(c,'gj_69b',R(1,3),{});return 'Họ nghi ngờ, ghi tên mình vào sổ theo dõi, theo mấy hôm.'+fx(c,{tam:-3,risk:4})}},
  {l:'Rời thị trấn ngay',f:c=>{if(chance(0.35)){G.later(c,'gj_69b',R(1,3),{});return 'Rời vội nên bỏ lại chút việc, và việc rời vội khiến họ ngờ hơn.'+fx(c,{money:-m(5),tam:-2,risk:3})}return 'Đi nhanh nhưng bỏ lại chút việc. Họ không theo.'+fx(c,{money:-m(5),tam:-1})}},
  pay('Nhờ chủ quán nói giùm, biếu một khoản',10,{f:c=>'Chủ quán nói khéo, nhận khoản biếu. Họ đi.'+fx(c,{money:-m(10)})})]}),
{id:'gj_69b',t:'Cẩm y vệ gọi lên hỏi cung',k:'Giang hồ',fixed:1,
 x:c=>`Hai người của cẩm y vệ tới tận nơi nghỉ của ${N(c)}, mời "đi một chuyến" để hỏi vài việc. Giọng họ lịch sự nhưng không thể từ chối.`,
 o:c=>[{l:'Theo họ, trả lời thẳng thắn',r:[{khau:0.8,eq:0.6,tri:0.4},60],y:c=>'Bị giữ một ngày rồi thả. Không có chứng cứ.'+fx(c,{tam:-2,fame:-1,risk:1}),n:c=>'Bị giam mấy ngày, bị tra hỏi gắt. Thả ra khi mất sức và tiếng.'+fx(c,{suc:-R(5,12),tam:-6,fame:-4,risk:3})},
  pay('Đem lễ tới nhờ người quen trong cẩm y vệ',30,{r:[{khau:1,eq:0.6},55],y:c=>'Lễ đến đúng người. Mình được thả ngay và tên bị gạch khỏi sổ.'+fx(c,{money:-m(30),tam:1,risk:-2}),n:c=>'Lễ nhận mà người không ra mặt. Bị giam thêm mấy ngày.'+fx(c,{money:-m(30),suc:-R(3,8),tam:-5,fame:-2})}),
  {l:'Bỏ trốn',r:[{vo:0.6,suc:0.5,muu:0.5},40],y:c=>'Thoát được, nhưng từ nay tên mình có trong sổ truy nã nhẹ.'+fx(c,{fame:-3,tam:-2,risk:5}),n:c=>'Bị đuổi bắt giữa đường, thương nặng và bị giam.'+fx(c,{suc:-R(12,24),fame:-6,tam:-8,risk:6})}]},
/* ================= sự kiện tông phái (người đã nhập phái) ================= */
TP({id:'tp_mon_quy',t:'Phạm môn quy',
 x:c=>{const s=sectOf(c);return `Trong ${esc(s.n)}, một huynh đệ thân của ${N(c)} vi phạm môn quy: lén mang bí kíp ra ngoài để cứu người nhà. Chưa ai biết. Nếu báo, hắn bị trục xuất; nếu giấu, mình cũng chịu trách nhiệm khi lộ.`},
 o:c=>{const s=sectOf(c);return [
  {l:'Báo cho trưởng lão, giữ nghiêm môn quy',f:c=>{s.pow=Math.min(100,(s.pow||50)+1);return 'Huynh đệ bị trục xuất khỏi phái, nhìn mình bằng ánh mắt không nói nên lời. Trưởng lão ghi nhận lòng ngay thẳng.'+fx(c,{fame:R(3,6),tam:-5,eq:-1})}},
  {l:'Giấu giùm, khuyên hắn trả lại ngay',r:[{eq:0.8,muu:0.5},50],y:c=>'Hắn trả sách trong đêm, chuyện chìm xuống. Hắn mang ơn mình cả đời.'+fx(c,{eq:1,tam:3,fame:1}),n:c=>{c.flags.gh=Math.max(1,rk(c)-1);return 'Chuyện bị phát giác. Cả hai bị phạt, mình bị hạ một bậc vì tội che giấu.'+fx(c,{fame:-5,tam:-6})}},
  {l:'Xin chưởng môn tha, nhận một phần trách nhiệm',r:[{eq:0.9,khau:0.5},40],y:c=>'Chưởng môn cảm động trước tình nghĩa, giảm án còn phạt quỳ. Cả phái nể cái đức ấy.'+fx(c,{fame:R(5,9),eq:2,tam:4}),n:c=>'Chưởng môn nổi giận vì bị xin giùm. Mình chịu phạt nặng.'+fx(c,{suc:-R(3,8),fame:-3,tam:-4})}]}}),
TP({id:'tp_truyen_cong',t:'Sư phụ truyền công',c:c=>rk(c)>=1&&!!sectOf(c)&&!c.away||false,
 x:c=>{const s=sectOf(c);return `Sư phụ trong ${esc(s.n)} gọi ${N(c)} vào hậu sơn: ông muốn truyền một thế công khó, đổi lại đòi một mùa khổ luyện không nghỉ, và không đảm bảo mình luyện nổi.`},
 o:c=>{const s=sectOf(c);const miss=bkMiss(c);return [
  {l:'Khổ luyện trọn mùa',r:[{vo:1,suc:0.6,tri:0.3},55],y:c=>{const k=miss.length&&chance(0.5)?bkLearn(c,pick(miss)):null;return 'Ngày nào cũng tập đến kiệt sức. Cuối mùa, thế công thành hình.'+(k?` Còn học thêm được ${k}.`:'')+fx(c,{vo:R(5,10),suc:-R(3,8),fame:R(2,5),tam:4})},n:c=>'Luyện quá sức, tẩu hỏa nhẹ. Phải nằm dưỡng, sư phụ lắc đầu.'+fx(c,{suc:-R(12,22),vo:R(1,2),tam:-4})},
  {l:'Luyện vừa phải, giữ sức',f:c=>'Ông gật đầu, chỉ dạy cơ bản. Tiến độ chậm nhưng không rủi ro.'+fx(c,{vo:R(2,4),eq:1,tam:2})},
  {l:'Xin hoãn, nói đang bận việc khác',f:c=>'Sư phụ hơi tiếc, nói cơ hội này không đến hoài.'+fx(c,{tam:-2})}]}}),
TP({id:'tp_nhiem_vu',t:'Nhiệm vụ của phái',w:1.1,cd:24,
 x:c=>{const s=sectOf(c);const al=s.al==='chinh'?'chính phái, nhiệm vụ nặng về đạo nghĩa':s.al==='ta'?'tà phái, nhiệm vụ thường là thủ đoạn':'phái trung lập, nhiệm vụ nặng về buôn bán và tin tức';return `${esc(s.n)}, ${al}, giao cho ${N(c)} một nhiệm vụ: ${s.al==='chinh'?'hộ tống một đoàn thương nhân qua vùng giặc':s.al==='ta'?'"thu" một khoản nợ của một nhà giàu':'điều tra một vụ buôn lậu trong vùng'}. Thành thì có thưởng và tiếng, bại thì bị phạt.`},
 o:c=>{const s=sectOf(c);return [
  {l:'Nhận nhiệm vụ, dốc hết sức',r:[{vo:0.8,muu:0.5,eq:0.4},50+Math.min(20,rk(c)*5)],y:c=>{s.pow=Math.min(100,(s.pow||50)+1);const g=chance(0.2)&&bkMiss(c).length?bkLearn(c,pick(bkMiss(c))):null;return 'Nhiệm vụ hoàn thành. Phái ghi công, thưởng bạc và danh.'+(g?` Chưởng môn còn truyền thêm ${g}.`:'')+fx(c,{money:m(R(5,12)),fame:R(5,10),vo:R(1,2),tam:4})},n:c=>{s.pow=Math.max(5,(s.pow||50)-1);return 'Nhiệm vụ hỏng, phái chịu tổn thất nhỏ. Mình bị phạt, hạ uy tín.'+fx(c,{money:-m(5),fame:-4,suc:-R(4,10),tam:-5})}},
  {l:'Xin đổi sang nhiệm vụ nhẹ hơn',f:c=>'Trưởng lão nhíu mày, nhưng đổi. Thưởng ít, tiếng không có.'+fx(c,{money:m(2),fame:1})},
  {l:'Từ chối, viện lý do riêng',f:c=>{c.flags.ghDue=(c.flags.ghDue||0)+1;return 'Trưởng lão ghi vào sổ, nói lần sau đừng như thế.'+fx(c,{fame:-3,tam:-2})}}]}}),
TP({id:'tp_phan_do',t:'Có kẻ phản đồ trong phái',c:c=>rk(c)>=2&&!!sectOf(c),w:0.6,
 x:c=>{const s=sectOf(c);return `${N(c)} vô tình bắt gặp một đồng môn đang trao đổi thư tín bí mật với người của một thế lực đối nghịch của ${esc(s.n)}. Hắn tưởng không ai thấy.`},
 o:c=>{const s=sectOf(c);return [
  {l:'Báo thẳng cho chưởng môn',r:[{eq:0.5,tri:0.7},60],y:c=>{s.pow=Math.min(100,(s.pow||50)+2);return 'Kẻ phản đồ bị bắt giữa đêm. Phái an toàn, chưởng môn tặng mình một món binh khí.'+fx(c,{fame:R(6,11),vo:1,tam:3})},n:c=>'Hắn có người chống lưng, ngược lại tố mình vu cáo. Mình bị nghi ngờ một thời gian.'+fx(c,{fame:-4,tam:-5})},
  {l:'Âm thầm theo dõi, tìm thêm chứng cứ',r:[{muu:0.8,tri:0.5},50],y:c=>{s.pow=Math.min(100,(s.pow||50)+3);return 'Theo dõi vài tuần, bắt được cả đường dây. Chưởng môn trọng thưởng.'+fx(c,{money:m(R(6,12)),fame:R(8,14),tam:5})},n:c=>'Bị lộ giữa chừng, hắn trốn thoát mang theo vài bí mật của phái. Mình bị trách.'+fx(c,{fame:-5,suc:-R(4,10),tam:-5})},
  {l:'Giả vờ không thấy',f:c=>{s.pow=Math.max(5,(s.pow||50)-2);return 'Vài tháng sau phái chịu một đòn từ bên ngoài. Mình ngờ mình đã bỏ lỡ điều gì.'+fx(c,{tam:-5,fame:-2})}}]}}),
TP({id:'tp_chien_phi',t:'Phái xin góp chiến phí',c:c=>rk(c)>=1&&!!sectOf(c)&&!!(S().wr&&S().wr.gwar&&(S().wr.gwar.a===c.flags.ghs||S().wr.gwar.b===c.flags.ghs)),w:1.2,cd:12,
 x:c=>{const s=sectOf(c);return `${esc(s.n)} đang giao tranh, quỹ phái cạn. Trưởng lão ngỏ lời nhờ các đệ tử có của góp chiến phí. Ai góp nhiều thì được ghi tên và nhớ công.`},
 o:c=>{const s=sectOf(c);const w=S().wr.gwar;const me=w.a===s.id?'da':'db';return [
  pay('Góp nhiều, đứng đầu danh sách',20,{f:c=>{w[me]=(w[me]||0)+1;s.pow=Math.min(100,(s.pow||50)+1);return 'Chiến phí đủ để phái mua thêm vũ khí. Tên mình khắc trên bia công đức.'+fx(c,{money:-m(20),fame:R(6,12),tam:3})}}),
  pay('Góp vừa phải',8,{f:c=>{return 'Mình góp phần mình. Không ai chê, không ai khen.'+fx(c,{money:-m(8),fame:1})}}),
  {l:'Lấy cớ túng thiếu, không góp',f:c=>{c.flags.ghDue=(c.flags.ghDue||0)+1;return 'Trưởng lão im lặng, nhưng sau lưng có người bĩu môi.'+fx(c,{fame:-3,tam:-3})}}]}}),
TP({id:'tp_khai_son',t:'Lễ khai sơn',c:c=>rk(c)>=1&&!!sectOf(c),w:0.5,pcd:96,cd:96,
 x:c=>{const s=sectOf(c);return `${esc(s.n)} làm lễ khai sơn, mừng ngày lập phái. Môn khách khắp nơi tới dự, các môn phái bạn cử người chúc mừng. Chưởng môn chọn một đệ tử trẻ có triển vọng biểu diễn công phu trước khách.`},
 o:c=>{const s=sectOf(c);return [
  {l:'Xin được biểu diễn công phu',r:[{vo:1,mi:0.4,eq:0.4},45+Math.min(25,rk(c)*5)],y:c=>{s.pow=Math.min(100,(s.pow||50)+1);return 'Màn biểu diễn trọn vẹn, khách vỗ tay vang. Mấy phái bạn mời kết thân.'+fx(c,{fame:R(10,18),vo:R(1,2),tam:6})},n:c=>'Hụt một thế giữa chừng, mất mặt trước khách.'+fx(c,{fame:-5,tam:-6})},
  {l:'Giúp lo tiếp khách, đứng sau',f:c=>'Không ai nhắc tên, nhưng chưởng môn biết việc ai làm.'+fx(c,{fame:R(2,4),eq:1,tam:3})},
  {l:'Ngồi dự, mở rộng quen biết',f:c=>'Quen thêm vài người đáng nể. Có người hứa nhớ tên.'+fx(c,{eq:1,fame:R(1,3),tam:2})}]}}),
TP({id:'tp_xuong_nui',t:'Chưởng môn cử xuống núi',c:c=>rk(c)>=2&&!!sectOf(c),w:0.7,cd:48,
 x:c=>{const s=sectOf(c);return `Chưởng môn ${esc(s.n)} cử ${N(c)} xuống núi một chuyến dài: đi khắp vùng gặp các môn phái bạn, mang thư kết thân, đồng thời thăm dò tình hình thế lực tự phát. Chuyến này không dễ, nhưng ai đi về sẽ được trọng dụng.`},
 o:c=>{const s=sectOf(c);return [
  {l:'Nhận chuyến đi, đi thật xa',c:c=>!c.away||c.away.type==='jh',r:[{eq:0.7,muu:0.6,vo:0.4},55],y:c=>{s.pow=Math.min(100,(s.pow||50)+2);return 'Đi suốt mấy tháng, mang về thư hồi âm và nhiều tin tức. Chưởng môn mừng, phong thưởng.'+fx(c,{money:m(R(4,9)),fame:R(7,13),eq:1,vo:1,tam:4})},n:c=>'Chuyến đi gặp nạn giữa đường, mang về ít tin và một vết thương.'+fx(c,{suc:-R(8,16),fame:-2,tam:-4})},
  {l:'Xin cử người khác, mình giữ sơn môn',f:c=>'Chưởng môn cho phép nhưng chuyện đó sẽ nằm trong sổ.'+fx(c,{fame:-1,tam:-1})}]}}),
TP({id:'tp_chon_cong_phu',t:'Chọn con đường công phu',c:c=>rk(c)>=2&&!!sectOf(c)&&bkMiss(c).length>=2,w:0.6,once:1,
 x:c=>{const s=sectOf(c);return `Đến lúc ${N(c)} phải chọn con đường công phu chuyên sâu trong ${esc(s.n)}: kiếm pháp, nội công hay khinh công. Mỗi con đường cho một lợi thế riêng, nhưng đi sâu một đường nghĩa là bớt thời gian cho các đường kia.`},
 o:c=>[{l:'Kiếm pháp: rèn võ nhanh hơn',f:c=>{const nm=bkLearn(c,'kiem');return `Học ${nm} từ sư phụ. Tốc độ rèn võ tăng rõ.`+fx(c,{vo:R(3,6),tam:3})}},
  {l:'Nội công: bền sức, khỏe lâu',f:c=>{const nm=bkLearn(c,'noi');return `Học ${nm}. Hơi thở dài, thân khỏe, ít bệnh.`+fx(c,{suc:R(5,9),tri:1,tam:4})}},
  {l:'Khinh công: nhanh nhẹn, ít gặp nạn',f:c=>{const nm=bkLearn(c,'khinh');return `Học ${nm}. Thoát hiểm dễ hơn, ít mất mạng nơi giang hồ.`+fx(c,{vo:R(1,3),eq:1,tam:4})}}]}),
TP({id:'tp_tranh_chuc',t:'Anh em tranh vị trí',c:c=>rk(c)>=2&&!!sectOf(c),w:0.7,
 x:c=>{const s=sectOf(c);return `Vị trí đệ tử đứng đầu một đường trong ${esc(s.n)} đang trống. Hai huynh đệ cùng ngang tài với ${N(c)} cũng muốn, ba người đều biết chỉ một người được chọn.`},
 o:c=>{const s=sectOf(c);return [
  {l:'Công khai tranh, xin thi tài',r:[{vo:0.8,tri:0.4,eq:0.5},45],y:c=>{c.flags.gh=Math.max(rk(c),3);return 'Thi tài công bằng, mình thắng sát. Được nhận vị trí, tăng bậc trong phái. Hai huynh đệ còn lại không giấu được vẻ ghen.'+fx(c,{fame:R(8,14),vo:R(1,3),eq:1,tam:6})},n:c=>'Thua nửa bước. Phải chúc mừng người thắng, lòng nghẹn.'+fx(c,{fame:-2,vo:1,tam:-5})},
  {l:'Nhường, ủng hộ người hợp nhất',f:c=>{s.pow=Math.min(100,(s.pow||50)+1);return 'Người trúng chọn mang ơn. Chưởng môn nhớ cái đức biết nhường.'+fx(c,{fame:R(3,6),eq:2,tam:2})}},
  {l:'Âm thầm chạy chọt trưởng lão',c:()=>G.money()>=m(15),r:[{khau:0.8,eq:0.5},40],y:c=>{c.flags.gh=Math.max(rk(c),3);return 'Món lễ đúng chỗ. Vị trí về tay mình, nhưng có người đã nghi.'+fx(c,{money:-m(15),fame:R(2,5),tam:2,risk:2})},n:c=>'Bị lộ, hai huynh đệ kia vạch ra trước toàn phái. Mình bị phạt nặng.'+fx(c,{money:-m(15),fame:-8,tam:-8})}]}}),
/* ================= kỳ ngộ tông phái ================= */
KN({id:'tp_kn_tang_kinh',t:'Bí kíp trong tàng kinh các',
 x:c=>{const s=sectOf(c);return `Trực đêm ở tàng kinh các của ${esc(s.n)}, ${N(c)} phát hiện một ngăn tối ẩn sau giá sách, trong có một cuộn da chép tay thế công thất truyền. Người trong phái chưa ai biết.`},
 o:c=>{const miss=bkMiss(c);return [
  {l:'Chép lại, tự luyện bí mật',r:[{tri:0.7,vo:0.5},50],y:c=>{const k=miss.length?bkLearn(c,pick(miss)):null;return 'Mấy đêm liền chép và luyện thử. '+(k?`Học được ${k} thật sự, vượt hơn cả các đồng môn.`:'Mình đã biết hầu hết các thế ấy, nhưng ngộ thêm nhiều điều.')+fx(c,{vo:R(4,8),tri:1,tam:4})},n:c=>'Luyện sai đường, kinh mạch rối loạn.'+fx(c,{suc:-R(12,22),vo:1,tam:-4})},
  {l:'Báo cho trưởng lão, nộp lại cuộn da',f:c=>{const s=sectOf(c);s.pow=Math.min(100,(s.pow||50)+2);return 'Trưởng lão mừng, thưởng một phần tâm pháp. Phái có thêm một báu vật.'+fx(c,{fame:R(6,11),vo:R(1,3),tam:4})}},
  {l:'Đặt lại như cũ, coi như chưa thấy',f:c=>''}]}}),
KN({id:'tp_kn_cao_nhan',t:'Cao nhân ẩn mình trong phái',
 x:c=>{const s=sectOf(c);return `Trong ${esc(s.n)} có một lão tạp dịch trầm lặng, ngày nào cũng quét sân. ${N(c)} vô tình thấy lão luyện công lúc rạng sáng: thế công lão dùng cao hơn cả chưởng môn.`},
 o:c=>[{l:'Giúp lão việc nặng, không hỏi về công phu',r:[{eq:0.8,cc:0.5},60],y:c=>'Ngày qua ngày, mình lặng lẽ giúp lão. Một hôm lão chỉ điểm vài câu, cả phái chưa ai nghe thấy.'+fx(c,{vo:R(5,10),tri:2,eq:1,tam:5}),n:c=>'Lão chỉ cười, bảo mình hiểu lầm.'+fx(c,{tam:-1})},
  {l:'Thẳng thắn xin lão chỉ dạy',r:[{eq:0.6,gan:0.4},35],y:c=>'Lão im lặng mấy ngày rồi nhận lời, nhưng dặn đừng nói với ai.'+fx(c,{vo:R(4,8),tri:1,tam:4}),n:c=>'Lão tránh mặt, rồi bỏ đi trong đêm.'+fx(c,{tam:-4})},
  {l:'Báo cho chưởng môn',f:c=>'Chưởng môn nhíu mày: "Lão là sư thúc tổ, ai cho ngươi nhìn lén!" Mình bị phạt.'+fx(c,{fame:-4,tam:-4})}]}),
KN({id:'tp_kn_bi_canh',t:'Bí cảnh của môn phái mở cửa',tier:[0,6],
 x:c=>{const s=sectOf(c);return `Mười năm một lần, bí cảnh dưới núi của ${esc(s.n)} mở cửa ba ngày. Chỉ vài đệ tử được vào, mang ra thứ gì thì giữ. ${N(c)} nằm trong danh sách.`},
 o:c=>[{l:'Vào bí cảnh, đi sâu',r:[{vo:0.8,suc:0.6,muu:0.4},50],y:c=>{const k=bkMiss(c).length?bkLearn(c,pick(bkMiss(c))):null;return 'Đi sâu, vượt thử thách nặng. Mang ra một viên đá quý và '+(k?`một đoạn ${k} khắc trên vách.`:'nhiều hiểu biết về công phu.')+fx(c,{money:m(R(8,16)),vo:R(4,9),fame:R(6,12),suc:-R(4,10),tam:5})},n:c=>'Gặp thử thách quá sức, rút lui kịp nhưng mang thương.'+fx(c,{suc:-R(14,26),vo:1,tam:-5})},
  {l:'Chỉ vào vùng ngoài, an toàn',f:c=>'Mang ra ít thứ nhỏ, không mạo hiểm.'+fx(c,{money:m(R(1,3)),vo:R(1,2),tam:2})},
  {l:'Nhường chỗ cho huynh đệ yếu hơn',f:c=>'Huynh đệ ấy ra về mang ơn mình suốt đời.'+fx(c,{fame:R(3,6),eq:2,tam:3})}]}),
KN({id:'tp_kn_co_kiem',t:'Cổ kiếm dưới gốc thông của sơn môn',
 x:c=>{const s=sectOf(c);return `Sau cơn bão, gốc thông ngàn năm của ${esc(s.n)} bật rễ, lộ ra một thanh cổ kiếm han gỉ, chuôi khắc tên một vị tổ sư. Chưởng môn cho phép người tìm ra thanh kiếm được giữ nó một năm.`},
 o:c=>[{l:'Nhận giữ, luyện cùng thanh kiếm',f:c=>{const nm=bkHas(c,'kiem')?null:bkLearn(c,'kiem');return 'Một năm cầm thanh kiếm, mình hiểu thêm nhiều đường kiếm cổ.'+(nm?` Ngộ ra ${nm}.`:'')+fx(c,{vo:R(5,10),fame:R(4,8),tam:5})}},
  {l:'Trả lại cho phái ngay, xin phép được học theo',f:c=>{const s=sectOf(c);s.pow=Math.min(100,(s.pow||50)+2);return 'Chưởng môn mừng, truyền cho vài đường kiếm của tổ sư.'+fx(c,{vo:R(3,6),fame:R(6,10),tam:4})}}]})
];
});
