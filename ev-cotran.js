/* Bách Niên Thế Gia v6.7.0-d9.5 · Cốt truyện và kỳ ngộ lấy ý từ tiểu thuyết "Cổ Chân Nhân" (bản thử, theo ý chủ dự án 21/11).
   FILE RIÊNG: muốn bỏ thì xóa file này, xóa thẻ <script src="ev-cotran.js"> trong index.html (và admin.html dựng lại bằng tools/make-admin.js), xóa dòng "cv:" trong tools/addmeta.js nếu có. Không file nào khác tham chiếu id "cv_*".
   Không chép truyện: chỉ lấy khung ý, chuyển vào bối cảnh Đại Nguyễn (không phép thuật rõ ràng; thứ lạ để ở dạng tin đồn, di vật, bí thuật).
   Ba chuỗi: (1) KÝ ỨC NGƯỜI XƯA (trọng sinh: một người trong họ thấy chuyện chưa xảy ra), (2) BA NHÀ TRANH TRẠI (ba nhà thế lực tranh nguồn lợi và nhân tài), (3) KỲ VẬT (di vật chín bậc nuôi dưỡng qua nhiều năm).
   Cộng 4 kỳ ngộ: bí cảnh thượng cổ, thi tuyển người kế nghiệp, chính đạo hay ma đạo, người lạ mang kỳ vật. Mỗi chuỗi đi qua G.later, tiến độ ẩn, có ngã rẽ. */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const FM=v=>G.fmtMoney(v);const N=c=>esc(c.given);
const rich=v=>()=>G.money()>=m(v);
const pay=(l,v,o)=>Object.assign({l:`${l} (${FM(m(v))})`,c:rich(v)},o);
const K=o=>Object.assign({tags:{},k:'Kỳ ngộ',ky:1,good:1,u:'person',pcd:300,w:0.6,ms:1,age:[16,60]},o);
const CH=o=>Object.assign({tags:{},k:'Chuyện lạ',fixed:1,ms:1,pcd:24},o);
const KV=['phàm','thường','tốt','quý','hiếm','báu','thần','tuyệt','chí tôn'];
const kvN=c=>KV[Math.min(8,Math.max(0,(c.flags.ccv||0)))];
return [
/* ---------- chuỗi 1: Ký ức người xưa ---------- */
K({id:'cv_giac_mong',t:'Giấc mơ về chuyện chưa xảy ra',age:[14,32],c:c=>!c.flags.cc&&G.inClan(c),once:1,
 x:c=>`Một đêm ${N(c)} giật mình tỉnh giấc, nhớ rất rõ mình vừa sống một đời khác: một đời dài, nhiều phản trắc, rồi chết cô độc. Sáng ra, nhiều chi tiết vẫn không phai, và có vài việc ${N(c)} biết sẽ xảy ra trong mấy năm tới.`,
 o:c=>[{l:'Giấu kín, tự ghi lại từng việc',f:c=>{c.flags.cc=1;G.later(c,'cv_tien_doan',R(18,36));return 'Một quyển sổ nhỏ ghi lại từng ký ức, giấu dưới đáy rương. Từ đó nhìn việc đời bằng con mắt khác.'+fx(c,{tri:2,tam:-2})}},
  {l:'Kể với người lớn trong nhà',r:[{eq:1,tri:0.4},45],y:c=>{c.flags.cc=1;G.later(c,'cv_tien_doan',R(18,36));return 'Người lớn nghe, cười, rồi dặn đừng kể ai. Nhưng họ cũng lặng lẽ ghi nhớ.'+fx(c,{tam:2})},n:c=>{c.flags.cc=-1;return 'Bị coi là mơ mộng, mang tiếng. Từ đó không ai nghe nữa.'+fx(c,{tam:-5,fame:-1})}},
  {l:'Cho là giấc mơ, quên đi',f:c=>{c.flags.cc=-1;return 'Giấc mơ nhạt dần như sương.'}}]}),
CH({id:'cv_tien_doan',t:'Việc đã biết trước',c:c=>c.flags.cc===1,
 x:c=>`Chuyện ${N(c)} từng thấy trong giấc mơ nay đúng từng chi tiết: ${pick(['mùa này sẽ có lũ lớn ở đầu nguồn','một đoàn buôn lớn sẽ vỡ nợ','trong làng sắp có bệnh dịch'])}. Lần này người ngoài chưa biết, chỉ mình ${N(c)} biết trước.`,
 o:c=>[pay('Âm thầm lo liệu, tích trữ phòng xa',8,{f:c=>{G.later(c,'cv_nghi_ky',R(10,20));return 'Nhà mình chuẩn bị kịp, khi chuyện nổ ra thì thiệt hại nhẹ hơn hẳn. Nhưng có người để ý vì sao nhà mình biết sớm.'+fx(c,{money:-m(8),fame:3,tam:3})}}),
  {l:'Cảnh báo công khai cho cả làng',r:[{eq:1,mi:0.4},48],y:c=>{G.later(c,'cv_nghi_ky',R(6,14));return 'Cả làng nửa tin nửa ngờ nhưng nhiều nhà chuẩn bị. Khi việc xảy ra, ai cũng nhìn mình bằng ánh mắt khác.'+fx(c,{fame:10,tam:3})},n:c=>{G.later(c,'cv_nghi_ky',R(6,14));return 'Không ai tin. Khi việc xảy ra thì người ta bảo "mồm quạ".'+fx(c,{fame:-4,tam:-4})}},
  {l:'Giữ im lặng, không can dự',f:c=>{G.later(c,'cv_nghi_ky',R(14,28));return 'Chuyện xảy ra như đã biết. Lòng thấy day dứt, nhưng không ai nghi.'+fx(c,{tam:-3})}}]}),
CH({id:'cv_nghi_ky',t:'Lời đồn "người mang ma"',c:c=>c.flags.cc===1,
 x:c=>`Trong vùng bắt đầu có lời đồn: ${N(c)} "biết trước việc, ắt có ma quỷ nhập". Một vị sư và một thầy đồ đến thăm, nửa như hỏi han nửa như dò xét.`,
 o:c=>[{l:'Tiếp đón nhã nhặn, nói chuyện bằng đạo lý',r:[{eq:1,tri:0.6},55],y:c=>{G.later(c,'cv_ke_thua',R(24,60));return 'Hai người ra về, bảo đây là người có tuệ căn. Lời đồn chuyển hướng thành tiếng thơm.'+fx(c,{fame:8,tam:4})},n:c=>{G.later(c,'cv_ke_thua',R(24,60));return 'Lời đồn càng loang. Nhà mình phải làm lễ giải hạn.'+fx(c,{money:-m(3),fame:-4,tam:-4})}},
  {l:'Từ chối tiếp, đóng cửa',f:c=>{G.later(c,'cv_ke_thua',R(24,60));return 'Càng im, lời đồn càng độc. Nhưng rồi người ta cũng chán.'+fx(c,{fame:-2,tam:-3})}}]}),
CH({id:'cv_ke_thua',t:'Điều đã học được từ đời trước',c:c=>c.flags.cc===1&&!c.flags.cv_end,
 x:c=>`Nhiều năm trôi qua, ${N(c)} nhận ra phần lớn ký ức cũ đã phai hoặc không còn đúng nữa, nhưng thứ còn lại là cách nhìn người, nhìn việc, nhìn mình. Có thể truyền lại cho con cháu bằng một quyển sổ, hoặc giữ cho riêng mình.`,
 o:c=>[{l:'Chép thành sách truyền cho con cháu',f:c=>{c.flags.cv_end=1;G.kidsOf(c).filter(k=>G.inClan(k)).forEach(k=>G.addStat(k,'tri',3));return 'Quyển sổ nhà nhỏ, chữ giản dị, thành món bảo vật tinh thần. Con cháu đọc được mà chẳng ai rõ nguồn gốc.'+fx(c,{tri:4,fame:6,tam:6})}},
  {l:'Giữ cho riêng mình',f:c=>{c.flags.cv_end=1;return 'Ký ức theo mình về cuối đời, như một người bạn lặng lẽ.'+fx(c,{tri:6,eq:3,tam:5})}}]}),
/* ---------- chuỗi 2: Ba nhà tranh trại ---------- */
K({id:'cv_ba_nha',t:'Ba nhà ở sơn trại mời kết giao',u:'clan',cyc:[40,70],head:1,age:[30,70],tier:[2,6],c:c=>!S().cc3,
 x:c=>`Ở sơn trại giáp vùng, ba nhà lớn đang tranh nhau mỏ muối, đường núi và đám trẻ khỏe. Cả ba cùng cử người đến nhà ${N(c)}, ai cũng nói muốn kết giao, nhưng ai cũng muốn nhà mình ngả về phía họ.`,
 o:c=>[{l:'Ngả về nhà mạnh nhất, giữ quan hệ tốt',f:c=>{S().cc3=1;G.later(c,'cv_tranh_mo',R(10,20));return 'Nhà mạnh nhất cám ơn, hứa chia phần lợi. Hai nhà kia ghi nhớ.'+fx(c,{fame:3,money:m(4),tam:2})}},
  {l:'Chọn nhà yếu nhất, giúp từ lúc khó khăn',f:c=>{S().cc3=2;G.later(c,'cv_tranh_mo',R(10,20));return 'Nhà yếu mừng rỡ như được cứu. Hai nhà mạnh hơn lạnh nhạt.'+fx(c,{fame:2,tam:3})}},
  {l:'Giữ trung lập, bán hàng cho cả ba',f:c=>{S().cc3=3;G.later(c,'cv_tranh_mo',R(10,20));return 'Nhà mình buôn bán với cả ba, không ai ghét, không ai thân.'+fx(c,{money:m(3),tam:1})}}]}),
CH({id:'cv_tranh_mo',t:'Tranh nhau mỏ muối',c:c=>!!S().cc3,
 x:c=>`Việc tranh mỏ muối ở sơn trại đã đến mức đổ máu. Ba nhà cử người tới nhà ${N(c)}, ai cũng đưa ra lý lẽ của mình và đòi mình ngả về một bên.`,
 o:c=>[{l:'Đứng ra làm trung gian giữa ba nhà',r:[{eq:1,khau:0.8,tri:0.4},45],y:c=>{S().cc3r=1;G.later(c,'cv_chia_phe',R(12,24));return 'Ba nhà ngồi lại, chia mỏ tạm thời. Nhà mình được tiếng công bằng.'+fx(c,{fame:10,tam:4})},n:c=>{S().cc3r=0;G.later(c,'cv_chia_phe',R(12,24));return 'Ba nhà không ai nghe. Trung gian bị đẩy ra ngoài.'+fx(c,{fame:-3,tam:-4})}},
  pay('Góp bạc cho nhà mình chọn mua thêm đường núi',20,{f:c=>{S().cc3r=2;G.later(c,'cv_chia_phe',R(12,24));return 'Đường núi vào tay, bạc đi hết. Nhưng đường buôn nhà mình thêm lợi.'+fx(c,{money:-m(20),fame:2})}}),
  {l:'Rút khỏi chuyện, không nhúng tay',f:c=>{S().cc3r=-1;G.later(c,'cv_chia_phe',R(12,24));return 'Người ta bảo nhà mình sợ chuyện. Nhưng nhà mình yên.'+fx(c,{tam:2,fame:-2})}}]}),
CH({id:'cv_chia_phe',t:'Ba nhà đánh nhau thật',c:c=>!!S().cc3,
 x:c=>`Cuộc tranh trại hóa thành trận đánh thật. Cả vùng nhìn sang, quan huyện cũng bất lực. Trong ba nhà, ${S().cc3===1?'nhà mạnh nhất':S().cc3===2?'nhà yếu nhất':'cả ba'} lần lượt cử người cầu viện nhà ${N(c)}.`,
 o:c=>[{l:'Cho mượn người nhà có võ nghệ',r:[{vo:1.2,gan:0.5},50],y:c=>{G.later(c,'cv_hau_qua',R(6,14));return 'Người nhà góp sức, bên mình thắng. Hai bên kia ghi hận nhưng nể.'+fx(c,{fame:8,vo:2,tam:4})},n:c=>{G.later(c,'cv_hau_qua',R(6,14));return 'Người nhà bị thương, bên mình thua. Mất mặt.'+fx(c,{suc:-8,fame:-5,tam:-6})}},
  {l:'Mở cửa nhà cho người bị thương nương nhờ',f:c=>{G.later(c,'cv_hau_qua',R(6,14));return 'Người của cả ba nhà đều được chăm, ai cũng nhớ ơn.'+fx(c,{money:-m(3),fame:10,tam:5})}},
  {l:'Báo quan huyện xin can thiệp',f:c=>{G.later(c,'cv_hau_qua',R(6,14));return 'Quan huyện cho lính đến dẹp. Ba nhà đều trách nhà mình.'+fx(c,{fame:-2,tam:-1})}}]}),
CH({id:'cv_hau_qua',t:'Sơn trại yên lại',c:c=>!!S().cc3,
 x:c=>`Cuộc tranh trại đã lắng. Một nhà thắng thế, hai nhà suy yếu. Tiếng nhà ${N(c)} trong vùng thay đổi tùy cách mình đã đối xử.`,
 o:c=>[{l:'Nhận phần lợi chung, ngồi bàn lại minh ước',r:[{eq:1,khau:0.6},60],y:c=>{S().cc3=null;return 'Minh ước được lập: ba nhà cùng chia mỏ và đường núi, nhà mình được phần nhỏ nhưng ổn định lâu dài.'+fx(c,{money:m(8),fame:8,tam:5})},n:c=>{S().cc3=null;return 'Minh ước không thành. Mỗi nhà một ngả.'+fx(c,{fame:-2,tam:-2})}},
  {l:'Rời đi, không dính nữa',f:c=>{S().cc3=null;return 'Nhà mình quay lại việc của mình.'+fx(c,{tam:1})}}]}),
/* ---------- chuỗi 3: Kỳ vật chín bậc ---------- */
K({id:'cv_ky_vat',t:'Món đồ lạ tìm thấy',age:[16,70],w:0.5,c:c=>!c.flags.ccv&&!c.flags.ccv_x,
 x:c=>`${N(c)} nhặt được một món đồ lạ ${pick(['trong hang núi','dưới bờ sông cạn','trong ngôi chùa đổ'])}: một viên đá nhỏ, ấm tay, thỉnh thoảng sáng nhẹ về đêm. Có người bảo đây là kỳ vật của cổ nhân, có người bảo chỉ là đá thường.`,
 o:c=>[{l:'Giữ lại, nuôi dưỡng theo cách đọc được trong sách cũ',f:c=>{c.flags.ccv=1;G.later(c,'cv_nuoi',R(12,24));return 'Món đồ nhỏ nằm trong túi vải đỏ. Mỗi đêm trăng rằm, nó lại ấm hơn một chút.'+fx(c,{tam:3})}},
  {l:'Đem đi hỏi người sành',r:[{tri:0.8,eq:0.5},48],y:c=>{c.flags.ccv=1;G.later(c,'cv_nuoi',R(12,24));return 'Một lão thầy bảo đây là kỳ vật bậc thấp, nuôi được. Chỉ dặn: đừng khoe.'+fx(c,{tri:1,tam:2})},n:c=>{c.flags.ccv_x=1;return 'Người sành chê đây chỉ là đá thường. Đem bỏ.'+fx(c,{tam:-2})}},
  {l:'Bán ngay cho tay buôn đồ cổ',f:c=>{c.flags.ccv_x=1;return 'Tay buôn trả giá khá. Tiền vào, kỳ vật đi.'+fx(c,{money:m(5),tam:1})}}]}),
CH({id:'cv_nuoi',t:'Nuôi dưỡng kỳ vật',c:c=>(c.flags.ccv||0)>=1&&(c.flags.ccv||0)<9,
 x:c=>`Kỳ vật của ${N(c)} đã đạt bậc ${esc(kvN(c))}. Muốn lên bậc, phải đổ thêm tâm sức, hoặc một thứ gì đó quý giá để nuôi nó.`,
 o:c=>[pay('Dâng vật quý, thuốc hiếm để nuôi',15,{r:[{tri:0.6,duyen:0.8},55],y:c=>{c.flags.ccv=(c.flags.ccv||0)+1;G.later(c,(c.flags.ccv>=4)?'cv_dom_ngo':'cv_nuoi',R(18,36));return `Kỳ vật lên bậc ${esc(kvN(c))}, sáng hơn trong đêm.`+fx(c,{money:-m(15),tri:2,tam:5})},n:c=>{G.later(c,'cv_nuoi',R(18,36));return 'Nuôi hỏng, kỳ vật mờ đi một chút. Phải chờ.'+fx(c,{money:-m(15),tam:-4})}}),
  {l:'Tập trung tâm niệm, mỗi tối ngồi hầu một canh giờ',r:[{tri:0.6,eq:0.5},50],y:c=>{c.flags.ccv=(c.flags.ccv||0)+1;G.later(c,(c.flags.ccv>=4)?'cv_dom_ngo':'cv_nuoi',R(24,48));return `Công phu bền bỉ, kỳ vật lên bậc ${esc(kvN(c))}.`+fx(c,{eq:1,tri:1,tam:4})},n:c=>{G.later(c,'cv_nuoi',R(18,36));return 'Mất kiên nhẫn giữa chừng. Phải làm lại từ đầu bậc này.'+fx(c,{tam:-3})}},
  {l:'Thôi, cất vào rương',f:c=>{c.flags.ccv_x=1;return 'Kỳ vật nằm im trong đáy rương, như đã ngủ.'+fx(c,{tam:-1})}}].filter(o=>o.l)}),
CH({id:'cv_dom_ngo',t:'Có người dòm ngó kỳ vật',c:c=>(c.flags.ccv||0)>=4,
 x:c=>`Tin về kỳ vật bậc ${esc(kvN(c))} của ${N(c)} đã lọt ra ngoài. Một lái buôn, một vị quan và một người lạ mặt, mỗi người đưa một đề nghị khác nhau.`,
 o:c=>[{l:'Bán cho lái buôn (lấy món tiền lớn)',f:c=>{c.flags.ccv_x=1;c.flags.ccv=0;return 'Kỳ vật đi, tiền vào. Cả nhà thở phào.'+fx(c,{money:m(40),tam:-2})}},
  {l:'Hiến cho vị quan, xin chức danh',r:[{eq:1,khau:0.6},50],y:c=>{c.flags.ccv_x=1;c.flags.ccv=0;return 'Vị quan nhận, cất nhắc nhà mình. Một cánh cửa mới mở ra.'+fx(c,{fame:15,tam:3})},n:c=>{c.flags.ccv_x=1;c.flags.ccv=0;return 'Vị quan nhận rồi quên lời hứa.'+fx(c,{fame:-3,tam:-6})}},
  {l:'Giữ lại, tăng cường canh phòng',r:[{vo:0.8,gan:0.6},52],y:c=>{return 'Kỳ vật vẫn ở trong nhà. Thêm một bậc nữa, nó sẽ thành báu vật thật sự.'+fx(c,{tri:3,vo:2,tam:4,fame:3})},n:c=>{c.flags.ccv_x=1;c.flags.ccv=0;return 'Một đêm mất trộm. Kỳ vật biến mất.'+fx(c,{tam:-10,fame:-3})}}]}),
/* ---------- kỳ ngộ gia tộc và người ---------- */
K({id:'cv_bi_canh',t:'Bí cảnh thượng cổ mở cửa',u:'clan',cyc:[30,55],head:1,age:[28,75],tier:[2,6],
 x:c=>`Tin đồn khắp vùng: một cánh cửa đá trong núi, vốn đóng kín từ thời thượng cổ, vừa mở ra sau một trận mưa lớn. Ai vào được thì có thể mang ra cơ duyên, và cũng nhiều người không ra được. Nhà ${N(c)} có thể cử người.`,
 o:c=>[{l:'Cử một người trẻ khỏe vào, dặn đi cẩn thận',r:[{vo:0.8,tri:0.6,duyen:0.8},45],y:c=>'Người ấy ra sau mười ngày, mang theo một thứ không rõ nguồn gốc nhưng mang lại vận may cho cả nhà.'+fx(c,{fame:10,money:m(15),on:3,hung:3,tam:4}),n:c=>'Người ấy ra, bị thương nặng, tay không. Cả nhà phải chăm lâu.'+fx(c,{suc:-8,money:-m(6),tam:-5})},
  pay('Thuê người dẫn đường vào cùng',20,{r:[{khau:0.8,tri:0.6},55],y:c=>'Có người dẫn, nhà mang về một món đồ hiếm.'+fx(c,{money:-m(20)+m(30),fame:5,tam:3}),n:c=>'Người dẫn đường bỏ trốn giữa chừng. Mất tiền.'+fx(c,{money:-m(20),tam:-4})}),
  {l:'Không dính, thấy rủi ro hơn lợi',f:c=>'Nhà mình giữ yên. Nghe tin mười người vào, năm người không ra.'+fx(c,{tam:1})}]}),
K({id:'cv_thi_tuyen',t:'Thi tuyển người kế nghiệp',u:'clan',cyc:[35,60],head:1,age:[45,80],tier:[1,6],c:c=>G.kidsOf(c).filter(k=>G.inClan(k)&&G.age(k)>=18).length>=2,
 x:c=>`${N(c)} đã đến tuổi phải nghĩ chuyện nối nghiệp. Mấy người con đều có điểm mạnh riêng. Cả họ đang xì xào ai sẽ là người kế vị, và có người đề nghị mở một cuộc thi tuyển công khai.`,
 o:c=>[{l:'Mở thi tuyển: ra đề thật, người trong họ chứng kiến',r:[{tri:0.6,eq:0.8},62],y:c=>{G.kidsOf(c).filter(k=>G.inClan(k)&&G.age(k)>=18).forEach(k=>G.addStat(k,'eq',1));return 'Kết quả rõ ràng, cả họ phục. Người đỗ được cả nhà nể, người trượt cũng chịu.'+fx(c,{fame:6,tam:5,on:3})},n:c=>'Thi xong, đề bị chê thiên vị. Anh em xích mích.'+fx(c,{fame:-3,tam:-5,on:-3})},
  {l:'Tự chọn theo ý mình, không thi',f:c=>'Người được chọn mừng, người không được bực bội. Không ai dám nói ra.'+fx(c,{tam:-2,on:-2})},
  {l:'Chia việc cho cả mấy người, chưa quyết',f:c=>'Chuyện nối nghiệp được hoãn thêm vài năm.'+fx(c,{tam:1})}]}),
K({id:'cv_chinh_ma',t:'Chính đạo hay ma đạo',age:[20,55],w:0.5,c:c=>c.vo>=70&&!c.flags.ccp,once:1,
 x:c=>`Trong giang hồ, hai phe đang kéo người: một bên tự xưng chính đạo, quy củ nghiêm, danh tiếng tốt nhưng ràng buộc nhiều; bên kia là ma đạo, ngang ngược, ai theo thì nhanh mạnh nhưng mang tiếng xấu. ${N(c)} có tiếng võ nghệ nên cả hai đều nhắm tới.`,
 o:c=>[{l:'Theo chính đạo, giữ quy củ',f:c=>{c.flags.ccp=1;return 'Người trong chính đạo coi trọng nhà mình. Đường đi chậm nhưng chắc.'+fx(c,{fame:8,vo:1,tam:3})}},
  {l:'Theo ma đạo, lấy sức mạnh làm đầu',f:c=>{c.flags.ccp=2;return 'Võ công tiến nhanh, nhưng người đời bắt đầu tránh mặt nhà mình.'+fx(c,{vo:4,fame:-8,liem:-3,tam:2})}},
  {l:'Đứng giữa, không theo bên nào',f:c=>{c.flags.ccp=3;return 'Cả hai phe đều không hài lòng, cũng không ai gây khó.'+fx(c,{tam:1})}}]})
]});
