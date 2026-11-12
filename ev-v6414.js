/* Bách Niên Thế Gia v6.4.1.4 · cốt truyện quan trường
   Bốn tuyến: nhập sĩ (qt1), bè đảng (qt2), tham nhũng và đại án (qt3), thang hậu quả tới tru di (qt_).
   Hồ sơ quan và các hàm xử án nằm ở engine.js (G.qt). Sự kiện mở đầu bốc ngẫu nhiên cho người làm quan;
   các bước sau có fixed:1, chỉ được gọi từ bước trước hoặc từ nhịp năm của triều đình.
   Thanh trừng do vua nghi kỵ và tranh đoạt hoàng quyền để bản có trạng thái hoàng đế (6.4.1.6). */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const N=c=>esc(c.given);const Q=G.qt;const q=c=>Q.of(c);
const FN=k=>Q.facN(k);const C=()=>Q.court();const LD=k=>k&&C().f[k]?esc(C().f[k].lead):'một vị đại thần';
const QQ=['quan'];const K='Quan trường';
const noFac=c=>!q(c).f,hasFac=c=>!!q(c).f;
const since=c=>S().t-(c.postT||S().t);
const other=k=>pick(Q.FACK.filter(x=>x!==k));
const joinOpt=(k,l)=>({l:l||`Theo phe ${FN(k)}`,s:Q.FAC[k].d,vio:'camdang',f:c=>{Q.join(c,k);return `${N(c)} từ nay là người của phe ${FN(k)}.`+fx(c,{loy:10,fav:k==='hoang'?4:0})}});
const ST=(c,n)=>{q(c).st=n};
const toHac=c=>{ST(c,2);G.enqueue('ev',c.id,{ev:'qt_dan_hac'});return ''};
const toAn=(c,mo)=>{ST(c,3);G.later(c,'qt_xet_an',mo||R(1,3));return ''};
const kidOf=c=>G.alive().filter(p=>G.inClan(p)&&G.age(p)>=10&&G.age(p)<18&&p.school!=='nha'&&p.tri>=50).sort((a,b)=>b.tri-a.tri)[0];
return [
/* ===================== Tuyến 1: nhập sĩ, từ áo vải đến triều đình ===================== */
{id:'qt1_khuyen_hoc',t:'Khuyến học nhập sĩ',k:K,head:1,cd:120,w:0.6,c:c=>!!kidOf(c)&&G.tierIdx()>=1,
 x:c=>{const k=kidOf(c);if(!k)return "Chuyện học hành của con cháu.";return `${esc(k.given)} sáng dạ, thầy đồ bảo nếu được đầu tư thì có ngày đỗ đạt. Trong họ chưa mấy ai bước được vào cửa quan.`},
 o:c=>{const k=kidOf(c);if(!k)return [{l:"Cho qua",f:()=>""}];return [
  {l:`Mời danh sư về kèm cặp (${G.fmtMoney(m(20))})`,c:()=>G.money()>=m(20),ax:{yc:1},f:c=>{S().money-=m(20);return `Danh sư khó tính nhưng dạy kỹ. ${esc(k.given)} tiến bộ trông thấy.`+fx(k,{tri:R(3,5),tam:2})}},
  {l:`Lập học điền nuôi con cháu đèn sách (${G.fmtMoney(m(45))})`,c:()=>G.money()>=m(45),s:'Mọi đứa trẻ đang đi học đều được lợi',f:c=>{S().money-=m(45);G.alive().filter(p=>G.inClan(p)&&G.age(p)>=6&&G.age(p)<18&&p.school!=='nha').forEach(p=>fx(p,{tri:R(1,2)}));return 'Ruộng học điền được lập, tiếng thơm lan khắp làng.'+fx(c,{cfame:4})}},
  {l:'Học được đến đâu hay đến đó',f:c=>'Chuyện học hành để tùy con cháu.'}]}},
{id:'qt1_truong_thi',t:'Trường thi có biến',k:K,cd:72,c:c=>!!c.exam&&G.age(c)>=16,
 x:c=>`Đêm trước kỳ thi, có kẻ lạ rỉ tai ${N(c)} rằng đề đã lọt ra ngoài, ai có tiền là mua được.`,
 o:[{l:'Báo ngay với quan giám thí',ax:{thanh:2,gan:1},f:c=>{if(chance(0.25))return 'Giám thí khen ngợi, nhưng bọn bán đề nhớ mặt.'+fx(c,{fame:6,cfame:2,tam:-4});return 'Đường dây bán đề bị bắt. Tên tuổi được nhắc trong trường thi.'+fx(c,{fame:8,cfame:3})}},
    {l:'Mua lấy đề',s:'Bị bắt thì bị đuổi khỏi trường thi',ax:{thanh:-2},f:c=>{if(chance(0.35)){c.exam=null;return 'Lính khám xét tìm thấy đề trong tay áo. Bị đuổi khỏi trường thi.'+fx(c,{fame:-30,tam:-15,cfame:-8})}c.exam.cheat=10;return 'Đề trúng y như mua.'+fx(c,{tam:2})}},
    {l:'Không màng, thi bằng sức mình',ax:{yc:1},f:c=>'Cứ đèn sách như thường.'+fx(c,{tri:1})}]},
{id:'qt1_yen_tan_khoa',t:'Yến tiệc tân khoa',k:K,job:QQ,pcd:9999,c:c=>c.degree>=3&&since(c)<30&&noFac(c),
 x:c=>`Yến tiệc mừng các tân khoa. Giữa tiệc, người của các phe lần lượt đến nâng chén với ${N(c)}, lời lẽ ân cần mà ý tứ rõ ràng.`,
 o:c=>[joinOpt('thanh','Nâng chén với người phe Thanh lưu'),joinOpt('quyen','Nâng chén với người phe Quyền thần'),joinOpt('hoang','Nâng chén với người phe Hoàng đảng'),
  {l:'Chúc rượu xã giao, không hứa với ai',ax:{diem:1},f:c=>'Ai cũng được một chén, không ai được một lời hứa.'+fx(c,{fav:3,fame:2})}]},
{id:'qt1_quan_moi',t:'Quan mới nhận chức',k:K,job:QQ,pcd:9999,c:c=>since(c)<12,
 x:c=>`Mới đến nhiệm sở, ${N(c)} thấy đám thuộc lại sổ sách rối ren, ai cũng chờ xem quan mới là người thế nào. Có kẻ đã mang lễ ra mắt tới.`,
 o:[{l:'Bắt tay chỉnh đốn ngay',r:[{tri:0.7,eq:0.6},55],ax:{gan:1,thanh:1},y:c=>'Sổ sách gọn gàng, thuộc lại nể sợ.'+fx(c,{fav:5,m:3,fame:4}),n:c=>'Thuộc lại ngấm ngầm cản trở, việc gì cũng chậm.'+fx(c,{tam:-6,fav:-2})},
    {l:'Nhận lễ ra mắt của thuộc lại',vio:'trugian',ax:{thanh:-2},f:c=>'Lễ nặng tay. Từ nay việc gì cũng trôi chảy.'+fx(c,{money:m(5),cor:6,liem:-5})},
    {l:'Mềm mỏng, ngồi nghe trước',ax:{diem:1,hd:1},f:c=>'Nghe nhiều nói ít, dần dần nắm được người, nắm được việc.'+fx(c,{eq:1,m:1})}]},
{id:'qt1_mon_sinh',t:'Lời mời kết giao',k:K,job:QQ,cd:72,c:c=>c.lv<=4&&noFac(c),
 x:(c,d)=>{d.k=d.k||pick(Q.FACK);return `${LD(d.k)}, người đứng đầu phe ${FN(d.k)}, cho người đưa thiếp: muốn nhận ${N(c)} làm môn sinh.`},
 o:(c,d)=>[joinOpt(d.k,`Bái ${C().f[d.k].lead} làm thầy`),{l:'Khéo léo từ chối',ax:{dl:1},f:c=>'Thư trả lời lời lẽ cung kính, nhưng không nhận.'+fx(c,{fav:2})}]},
{id:'qt1_cong_dau',t:'Công trạng đầu tiên',k:K,job:QQ,pcd:9999,c:c=>since(c)>=24,
 x:c=>`Việc ở nhiệm sở của ${N(c)} đã có kết quả đầu tiên. Cấp trên đang soạn sớ tâu công.`,
 o:[{l:'Tự dâng sớ trình công',r:[{tri:1,eq:0.5},55],ax:{tv:1},y:c=>{c.cong=(c.cong||0)+20;G.tuocCheck(c,'lập công');return 'Công lao được ghi tên. Bộ Lại để mắt.'+G.tuocNote()+fx(c,{fav:8,fame:6})},n:c=>'Cấp trên phật ý vì bị vượt mặt, công lao bị ghi cho người khác.'+fx(c,{tam:-6,fav:-3})},
    {l:'Nhường công cho cấp trên',ax:{rong:1},f:c=>'Cấp trên hài lòng. Đường quan có thêm người đỡ.'+fx(c,{loy:hasFac(c)?8:0,risk:-5,fame:1})}]},
{id:'qt1_dong_lieu_nan',t:'Đồng liêu gặp nạn',k:K,job:QQ,cd:72,
 x:c=>`Một đồng liêu thân với ${N(c)} bị vu cáo nhận hối lộ. Cả nha môn né ông ấy như né dịch.`,
 o:[{l:'Dâng sớ minh oan cho ông ấy',r:[{tri:1,eq:0.6},60],ax:{gan:1,rong:1},y:c=>'Án được xét lại, đồng liêu được minh oan, nhớ ơn suốt đời.'+fx(c,{fame:10,fav:3}),n:c=>'Sớ bị gạt đi. Kẻ đứng sau ghi nhớ tên người dám bênh.'+fx(c,{risk:15,fav:-5})},
    {l:'Lặng im giữ mình',ax:{gan:-1},f:c=>'Giữ được mình, nhưng đêm về khó ngủ.'+fx(c,{tam:-3})},
    {l:'Đứng ra làm chứng buộc tội ông ấy',ax:{thanh:-2,tv:1},f:c=>'Lời chứng làm vụ án thành. Người trên vừa ý, người dưới khinh.'+fx(c,{fav:5,cor:5,fame:-6})}]},
{id:'qt1_buoc_ngoat',t:'Bước ngoặt quan trường',k:K,job:QQ,cd:120,c:c=>c.lv>=3&&noFac(c),
 x:c=>`Làm quan đã lâu, ${N(c)} hiểu rằng đứng ngoài mọi phe thì khó lên cao, mà đứng trong phe thì có ngày chung số phận.`,
 o:c=>[...Q.FACK.map(k=>joinOpt(k)),{l:'Giữ mình trung lập',ax:{diem:1,dl:1},f:c=>'Không theo ai, cũng không ai che.'+fx(c,{risk:-5,fav:2})}]},
{id:'qt1_chuc_beo',t:'Một chức quan béo bở',k:K,job:QQ,cd:96,c:c=>c.lv<7,
 x:c=>`Có người mách ${N(c)}: một chức béo bở sắp trống. Chỉ cần lo lót đúng chỗ là được.`,
 o:c=>{const fee=m(25*(c.lv+1));return [{l:`Đút lót để được chức (${G.fmtMoney(fee)})`,vio:'trugian',c:()=>G.money()>=fee,ax:{thanh:-2,tv:1},f:c=>{S().money-=fee;if(chance(0.7))return 'Chức về tay. Nhưng sổ sách của kẻ nhận bạc có tên mình.'+fx(c,{lv:1,cor:12});return 'Tiền mất, chức vào tay người trả cao hơn.'+fx(c,{cor:6,tam:-8})}},
  {l:'Không màng',ax:{thanh:1,tiet:1},f:c=>'Giữ được tiếng sạch.'+fx(c,{liem:3})}]}},
{id:'qt1_tiec_dong_lieu',t:'Đồng liêu mời dự tiệc',k:K,job:QQ,cd:48,
 x:c=>`Mấy đồng liêu rủ ${N(c)} dự tiệc ở tửu lâu. Trên bàn tiệc người ta nói nhiều chuyện không nói ở công đường.`,
 o:[{l:'Nhận lời, ngồi nghe là chính',ax:{hd:1},f:c=>{if(hasFac(c)||chance(0.5))return 'Biết thêm mấy chuyện trong triều, có thêm vài người quen.'+fx(c,{eq:1,tam:3});return 'Tiệc vui, quan hệ thân hơn.'+fx(c,{tam:4})}},
    {l:'Cáo bận',ax:{hd:-1},f:c=>'Đồng liêu bảo người này khó gần.'+fx(c,{tam:-1})}]},

/* ===================== Tuyến 2: bè đảng triều đình ===================== */
{id:'qt2_thiep_moi',t:'Thiếp mời từ phủ Thượng thư',k:K,job:QQ,cd:72,c:c=>c.lv>=2,
 x:(c,d)=>{d.k=d.k||pick(Q.FACK);return `Phủ Thượng thư ${LD(d.k)} của phe ${FN(d.k)} gửi thiếp mời ${N(c)} dự tiệc mừng thọ.`},
 o:(c,d)=>[joinOpt(d.k,'Đến dự, tỏ lòng muốn theo'),
  {l:'Đến dự nhưng giữ khoảng cách',ax:{diem:1},f:c=>'Có mặt cho phải phép.'+(q(c).f&&q(c).f!==d.k?fx(c,{loy:-5,risk:3}):fx(c,{fame:1}))},
  {l:'Cáo bệnh không đến',ax:{dl:1},f:c=>d.k==='quyen'?'Phủ Thượng thư ghi nhớ kẻ không nể mặt.'+fx(c,{risk:4}):'Thiếp được cất đi, không ai nhắc lại.'}]},
{id:'qt2_loi_khuyen',t:'Lời khuyên giữ mình',k:K,job:QQ,cd:72,c:hasFac,
 x:c=>`Một vị quan già khuyên ${N(c)}: "Phe nào rồi cũng có ngày thất thế. Người khôn đứng giữa dòng mà không ướt áo."`,
 o:[{l:'Nghe lời, lặng lẽ rút khỏi phe',ax:{diem:1},f:c=>{Q.join(c,null);return 'Bớt dần qua lại, rồi thôi hẳn.'+fx(c,{risk:-10})}},
    {l:'Vẫn theo phe',ax:{ht:1},f:c=>'Đã chọn thì không quay đầu.'+fx(c,{loy:5})}]},
{id:'qt2_hai_phe',t:'Hai phe cùng mời',k:K,job:QQ,cd:96,c:c=>c.lv>=2&&noFac(c),
 x:(c,d)=>{if(!d.a){d.a=pick(Q.FACK);d.b=other(d.a)}return `Cùng một tuần, cả phe ${FN(d.a)} lẫn phe ${FN(d.b)} đều ngỏ ý muốn ${N(c)} về với mình. Nhận bên này là mất lòng bên kia.`},
 o:(c,d)=>[joinOpt(d.a),joinOpt(d.b),{l:'Từ chối cả hai',ax:{dl:1,gan:1},f:c=>'Cả hai phe đều phật ý, nhưng vua nghe chuyện thì khen.'+fx(c,{risk:5,fav:4})}]},
{id:'qt2_danh_sach',t:'Phe đòi danh sách môn sinh',k:K,job:QQ,cd:96,c:c=>hasFac(c)&&c.lv>=3,
 x:c=>`${LD(q(c).f)} sai người tới, muốn ${N(c)} nộp danh sách những người dưới quyền và môn sinh để "tiện bề chiếu cố".`,
 o:[{l:'Nộp danh sách, kéo bè cho phe',vio:'camdang',ax:{ht:1,thanh:-1},f:c=>'Danh sách được cất vào phủ. Từ nay tên những người ấy gắn với phe.'+fx(c,{loy:10,risk:8,cor:3})},
    {l:'Viện cớ thoái thác',ax:{dl:1},f:c=>'Người đứng đầu phe không nói gì, nhưng mặt lạnh hẳn.'+fx(c,{loy:-10})}]},
{id:'qt2_lo_quan_he',t:'Quan hệ với phe bị lộ',k:K,job:QQ,cd:96,c:c=>hasFac(c)&&q(c).risk>=20,
 x:c=>`Trong triều có lời xì xào: ${N(c)} thường xuyên ra vào phủ của ${LD(q(c).f)}.`,
 o:[{l:'Chối phăng',r:[{eq:0.8,khau:0.8},55],ax:{thanh:-1},y:c=>'Lời đồn lắng xuống.'+fx(c,{risk:-10}),n:c=>'Càng chối càng bị nghi.'+fx(c,{risk:15,fav:-5})},
    {l:'Thừa nhận, nói rõ chỉ là tình thầy trò',ax:{thanh:2},f:c=>'Người ta tin một nửa.'+fx(c,{risk:5,fav:2})}]},
{id:'qt2_lam_chung',t:'Phe yêu cầu làm chứng',k:K,job:QQ,cd:96,c:hasFac,
 x:c=>`Phe ${FN(q(c).f)} đang kiện một đại thần phe đối địch. Họ cần ${N(c)} đứng ra làm chứng, dù ${N(c)} không chắc chuyện có thật.`,
 o:[{l:'Đứng ra làm chứng',ax:{ht:1,thanh:-2},f:c=>{if(chance(0.5))Q.court().f[other(q(c).f)].pow-=5;return 'Lời chứng giúp phe mình thắng một ván.'+fx(c,{loy:12,cor:5,fame:-3,risk:5})}},
    {l:'Từ chối',ax:{thanh:1,dl:1},f:c=>'Phe mình bắt đầu xem ${N(c)} là người không tin được.'.replace('${N(c)}',N(c))+fx(c,{loy:-12})}]},
{id:'qt2_tu_khai',t:'Lệnh tự khai bè đảng',k:K,job:QQ,cd:180,c:c=>c.lv>=2,
 x:c=>`Vua ra lệnh các quan tự khai mình có kết bè kết đảng hay không. Ai khai gian mà bị phát giác thì tội nặng gấp đôi.`,
 o:c=>hasFac(c)?[
  {l:'Khai thật, xin rời phe',ax:{thanh:2},f:c=>{Q.join(c,null);return 'Vua khen thành thật.'+fx(c,{fav:10,risk:-15})}},
  {l:'Giấu đi',ax:{thanh:-1},f:c=>'Tờ khai sạch như giấy trắng.'+fx(c,{risk:12})},
  {l:'Khai thật và tố cả phe',s:'Được vua tin, bị người đời gọi là phản phe',ax:{thanh:1,ht:-2},f:c=>{const k=q(c).f;Q.join(c,null);Q.court().f[k].pow-=10;Q.court().f[k].fav-=10;Q.log('Tố giác phe cũ',`${G.nameOf(c)} tố giác phe ${FN(k)} trước vua.`);return 'Vua nhìn bằng con mắt khác. Phe cũ nguyền rủa.'+fx(c,{fav:18,risk:-25,fame:-6})}}]
  :[{l:'Tâu rằng mình không theo phe nào',ax:{thanh:1},f:c=>'Lời khai đúng sự thật.'+fx(c,{fav:5})}]},
{id:'qt2_day_len',t:'Phe muốn đẩy lên đứng đầu',k:K,job:QQ,cd:120,c:c=>hasFac(c)&&q(c).loy>=60&&c.lv>=5,
 x:c=>`${LD(q(c).f)} đã già. Người trong phe ${FN(q(c).f)} muốn đẩy ${N(c)} lên thay.`,
 o:[{l:'Nhận lời đứng đầu phe',s:'Thế lực lớn, nhưng phe đổ thì mình đổ đầu tiên',ax:{tv:2},f:c=>{const k=q(c).f;const F=Q.court().f[k];if(!F)return 'Chuyện không thành.';F.lead=G.nameOf(c);F.pow=Math.min(95,F.pow+5);Q.log('Đứng đầu phe',`${G.nameOf(c)} lên đứng đầu phe ${FN(k)}.`);return 'Từ nay cửa phủ không lúc nào vắng người.'+fx(c,{loy:20,risk:15,fame:15})}},
    {l:'Từ chối, đứng sau là đủ',ax:{tv:-1},f:c=>'Người trong phe tiếc, nhưng hiểu.'+fx(c,{loy:-5})}]},
{id:'qt2_tiec_chia_phe',t:'Bữa tiệc chia phe',k:K,job:QQ,cd:96,c:c=>c.lv>=3,
 x:(c,d)=>{if(!d.a){d.a=pick(Q.FACK);d.b=other(d.a)}return `Tiệc của một vị hoàng thân. Người phe ${FN(d.a)} ngồi một bên, phe ${FN(d.b)} ngồi một bên. Chỗ ${N(c)} ngồi sẽ nói lên tất cả.`},
 o:(c,d)=>[joinOpt(d.a,`Ngồi về phía phe ${FN(d.a)}`),joinOpt(d.b,`Ngồi về phía phe ${FN(d.b)}`),{l:'Kiếm cớ ra về sớm',ax:{diem:1},f:c=>'Không ai nhớ ${N} ngồi đâu.'.replace('${N}',N(c))}]},
{id:'qt2_mon_sinh_cau',t:'Môn sinh cầu kiến',k:K,job:QQ,cd:72,c:c=>c.lv>=3,
 x:c=>`Một sĩ tử mới đỗ xin bái ${N(c)} làm thầy, mang theo lễ vật khiêm tốn và lá thư lời lẽ thiết tha.`,
 o:[{l:'Thu nhận làm môn sinh',ax:{rong:1},f:c=>{q(c).mon=(q(c).mon||0)+1;if(chance(0.25))G.later(c,'qt2_mon_sinh_phan',R(36,120));return 'Có thêm một người gọi mình là thầy.'+fx(c,{fame:3})}},
    {l:'Khước từ',f:c=>'Sĩ tử thất vọng ra về.'}]},
{id:'qt2_mon_sinh_phan',t:'Môn sinh phản chủ',k:K,fixed:1,
 x:c=>`Người môn sinh năm nào nay đã làm quan, và đang đem chuyện riêng của thầy ra kể với ngự sử.`,
 o:[{l:'Ra tay trước, vạch tội hắn',r:[{tri:0.8,muu:0.8},60],ax:{gan:1},y:c=>'Hắn bị bãi chức trước khi kịp mở miệng.'+fx(c,{risk:-10,fame:3}),n:c=>'Hắn nhanh hơn một bước.'+fx(c,{risk:15})},
    {l:'Nhẫn nhịn, để thời gian trả lời',ax:{diem:1},f:c=>'Lời đồn lan dần.'+fx(c,{risk:6,tam:-5})}]},

/* ===================== Tuyến 3: tham nhũng và đại án ===================== */
{id:'qt3_bac_lot_tay',t:'Bạc trắng trong công văn',k:K,job:QQ,cd:60,
 x:c=>`Kẹp trong tập công văn gửi lên là một gói bạc trắng, kèm mảnh giấy xin ${N(c)} "rộng tay" cho một vụ kiện.`,
 o:c=>[{l:'Nhận bạc lót tay',ax:{thanh:-2,tv:1},f:c=>'Gói bạc nằm gọn trong rương. Vụ kiện được xử nhẹ tay.'+fx(c,{money:m(8+c.lv*4),cor:8,liem:-4})},
  {l:'Trả lại, coi như chưa thấy',ax:{thanh:1},f:c=>'Gói bạc được trả lại kín đáo.'+fx(c,{liem:2})},
  {l:'Tố giác kẻ đưa bạc',ax:{thanh:2,gan:1},f:c=>'Kẻ đưa bạc bị bắt. Bạn bè của hắn ghi thù.'+fx(c,{fame:5,fav:3,risk:5})}]},
{id:'qt3_so_that_lac',t:'Sổ sách thất lạc',k:K,job:QQ,cd:96,
 x:c=>`Một cuốn sổ thu chi của nha môn biến mất. Ai cũng biết trong đó có những khoản không nên để ai thấy.`,
 o:[{l:'Che giấu cho êm chuyện',ax:{thanh:-1},f:c=>'Chuyện được ém xuống.'+fx(c,{cor:6,risk:5})},
    {l:'Giao nộp, nhận lỗi sơ suất',ax:{thanh:2},f:c=>'Cấp trên trách phạt nhẹ.'+fx(c,{fav:-3,fame:-2,risk:-5})}]},
{id:'qt3_sua_an',t:'Quan trên yêu cầu sửa án',k:K,job:QQ,cd:72,c:c=>c.lv<=5,
 x:c=>`Quan trên gửi thư riêng: một bản án ${N(c)} vừa xử cần "xem lại", vì bên thua là họ hàng một người có thế.`,
 o:[{l:'Tuân lệnh sửa án',ax:{ht:1,thanh:-2},f:c=>{q(c).crime=Math.max(q(c).crime,2);return 'Bản án được sửa. Người bị oan khóc ngoài cổng nha.'+fx(c,{cor:8,money:m(5),loy:hasFac(c)?5:0})}},
    {l:'Cương quyết giữ án',ax:{gan:1,thanh:2},f:c=>'Quan trên im lặng. Sự im lặng đáng sợ hơn lời mắng.'+fx(c,{fame:6,liem:4,risk:8})},
    {l:'Kéo dài, chờ thời',r:[{eq:1,muu:0.5},55],ax:{diem:1},y:c=>'Chuyện bị kéo dài cho đến khi quan trên được điều đi.'+fx(c,{eq:1}),n:c=>'Quan trên mất kiên nhẫn.'+fx(c,{risk:6,fav:-3})}]},
{id:'qt3_thuong_nhan',t:'Thương nhân cầu cứu',k:K,job:QQ,cd:72,
 x:c=>`Một thương nhân lớn bị kiện trốn thuế, tìm đến ${N(c)} xin che chở. Hắn hứa hậu tạ không nhỏ.`,
 o:[{l:'Che chở để lấy bạc tạ ơn',vio:'trugian',ax:{thanh:-2},f:c=>'Vụ kiện tan. Từ nay hắn coi mình là chỗ dựa.'+fx(c,{money:m(12),cor:10})},
    {l:'Xử theo phép nước',ax:{thanh:2},f:c=>'Thương nhân phải nộp đủ thuế.'+fx(c,{fame:3,fav:2})},
    {l:'Mặc kệ, không dính vào',f:c=>'Thương nhân đi tìm người khác.'}]},
{id:'qt3_kho_luong',t:'Kho lương thất thoát',k:K,job:QQ,cd:120,c:c=>c.lv>=2,
 x:c=>`Kiểm kho, ${N(c)} thấy số thóc trong kho thiếu gần một phần ba so với sổ. Mùa giáp hạt sắp tới.`,
 o:[{l:'Tự mình điều tra sổ sách',ax:{cc:1,gan:1},f:c=>{G.later(c,'qt3_kho_luong_tra',R(1,3));return 'Bắt đầu lần từng dòng sổ.'}},
    {l:'Báo lên quan trên',ax:{ht:1},f:c=>{G.later(c,'qt3_kho_luong_che',R(1,3));return 'Tờ trình được gửi đi.'}},
    {l:'Bao che cho xong chuyện',ax:{thanh:-2},f:c=>{q(c).crime=Math.max(q(c).crime,2);return 'Sổ được sửa cho khớp. Dân đói thì để mùa sau tính.'+fx(c,{cor:10})}}]},
{id:'qt3_kho_luong_tra',t:'Kẻ rút ruột kho lương',k:K,fixed:1,
 x:c=>`Lần theo sổ, ${N(c)} tìm ra kẻ rút ruột kho lương: một vị quan lớn hơn mình nhiều bậc. Chứng cứ đã nằm trong tay.`,
 o:[{l:'Dâng tấu kèm chứng cứ',r:[{tri:1,eq:0.5},62],ax:{gan:2,thanh:2},y:c=>{c.cong=(c.cong||0)+40;G.tuocCheck(c,'phá án kho lương');Q.log('Phá án kho lương',`${G.nameOf(c)} dâng chứng cứ, vạch mặt kẻ rút ruột kho lương.`);return 'Kẻ tham bị bắt. Vua cho triệu kiến, ban khen.'+G.tuocNote()+fx(c,{fav:15,fame:15,lv:1})},n:c=>'Hắn nhanh tay phản tố, nói chính người dâng tấu mới là kẻ ăn cắp.'+fx(c,{risk:20,fav:-5})},
    {l:'Giữ chứng cứ làm quân bài',s:'Có lúc sẽ cần',ax:{muu:1,thanh:-1},f:c=>{q(c).ev=(q(c).ev||0)+1;return 'Bản sao chứng cứ được giấu kỹ.'+fx(c,{risk:5,cor:3})}},
    {l:'Đốt đi, coi như không biết',ax:{gan:-1},f:c=>'Tro bay theo gió. Chỉ lương tâm còn nhớ.'+fx(c,{cor:3,tam:-4})}]},
{id:'qt3_kho_luong_che',t:'Quan trên bảo che giấu',k:K,fixed:1,
 x:c=>`Quan trên gọi ${N(c)} vào hậu đường, đẩy sang một hộp gấm: "Kho thiếu là do chuột. Ngươi hiểu chứ?"`,
 o:[{l:'Nhận phần chia',vio:'trugian',ax:{thanh:-2},f:c=>{q(c).crime=Math.max(q(c).crime,3);if(chance(0.6))G.later(c,'qt3_the_than',R(12,36));return 'Hộp gấm nặng tay. Tên mình đã nằm cùng sổ với hắn.'+fx(c,{money:m(25),cor:15})}},
    {l:'Từ chối',ax:{thanh:2,gan:1},f:c=>'Quan trên cười nhạt, cất hộp đi.'+fx(c,{fame:4,risk:12})}]},
{id:'qt3_the_than',t:'Trở thành vật thế thân',k:K,fixed:1,
 x:c=>`Vụ kho lương nổ ra. Quan trên đổ hết lên đầu ${N(c)}, có cả sổ sách lẫn người làm chứng.`,
 o:[{l:'Khai ra quan trên',r:[{tri:0.8,eq:0.8},60],ax:{gan:1},y:c=>{q(c).crime=Math.max(1,q(c).crime-1);return 'Công đường lôi được cả kẻ đứng sau. Tội mình nhẹ đi.'+fx(c,{fav:5})+toAn(c)},n:c=>'Không ai tin lời kẻ bị bắt.'+fx(c,{risk:10})+toAn(c)},
    {l:'Im lặng chịu tội',ax:{ht:1},f:c=>'Quan trên hứa sẽ lo cho gia quyến.'+toAn(c)}]},
{id:'qt3_dong_lieu_tham',t:'Đồng liêu bị tố tham ô',k:K,job:QQ,cd:72,
 x:c=>`Một đồng liêu cùng nha môn bị tố tham ô. Công đường gọi ${N(c)} lên hỏi.`,
 o:[{l:'Khai đúng những gì mình biết',ax:{thanh:1},f:c=>'Lời khai rõ ràng, không thêm không bớt.'+fx(c,{fav:5,fame:-1})},
    {l:'Im lặng',ax:{diem:1},f:c=>'Không biết, không thấy, không nghe.'},
    {l:'Bênh vực ông ấy',ax:{rong:1,gan:1},f:c=>'Người ta bắt đầu hỏi vì sao ${N} bênh.'.replace('${N}',N(c))+fx(c,{risk:8,fame:4})}]},
{id:'qt3_nhan_thay',t:'Nhận hối lộ thay cấp trên',k:K,job:QQ,cd:96,c:c=>c.lv<=4,
 x:c=>`Cấp trên nhờ ${N(c)} "giữ hộ" một rương bạc của người quen gửi tới. Ai cũng hiểu đó là gì.`,
 o:[{l:'Nhận giữ hộ',vio:'trugian',ax:{ht:1,thanh:-1},f:c=>{q(c).crime=Math.max(q(c).crime,2);if(chance(0.3))G.later(c,'qt3_the_than',R(12,36));return 'Rương bạc nằm trong nhà mình.'+fx(c,{cor:8,money:m(3)})}},
    {l:'Từ chối',ax:{thanh:2},f:c=>'Cấp trên nhìn mình khác hẳn.'+fx(c,{risk:5})}]},
{id:'qt3_mat_thu',t:'Mật thư trong thư phòng',k:K,job:QQ,cd:120,c:c=>c.lv>=3,
 x:(c,d)=>{d.k=d.k||pick(Q.FACK);return `Dọn thư phòng của vị quan tiền nhiệm, ${N(c)} tìm được một bức mật thư bàn chuyện cài người vào các bộ của phe ${FN(d.k)}.`},
 o:(c,d)=>[{l:'Tiêu hủy',ax:{diem:1},f:c=>{q(c).crime=Math.max(q(c).crime,2);return 'Lửa nuốt mất bức thư.'+fx(c,{cor:4,loy:q(c).f===d.k?5:0})}},
  {l:'Dâng lên vua',ax:{gan:1,thanh:1},f:c=>{if(chance(0.4))Q.fall(d.k,'bị tố giác mật thư cài người vào các bộ');return 'Vua đọc rất lâu, rồi cho lui.'+fx(c,{fav:15,risk:q(c).f===d.k?20:-10})}},
  {l:'Giữ lại làm vốn',ax:{muu:1},f:c=>{q(c).ev=(q(c).ev||0)+1;return 'Bức thư được cất kỹ.'+fx(c,{risk:5})}}]},
{id:'qt3_so_thue',t:'Sổ thuế bị sửa',k:K,job:QQ,cd:96,
 x:c=>`Sổ thuế của huyện có những dòng mực mới đè lên mực cũ. Thuộc lại thì thầm: "Ai cũng có phần, quan có muốn phần không?"`,
 o:[{l:'Vạch ra',r:[{tri:1},55],ax:{thanh:2,gan:1},y:c=>'Cả đường dây bị bắt.'+fx(c,{fame:8,fav:6}),n:c=>'Chứng cứ không đủ, lại còn bị thù.'+fx(c,{risk:10})},
    {l:'Ăn chia cùng thuộc lại',vio:'trugian',ax:{thanh:-2},f:c=>'Mỗi tháng có một khoản đều đặn.'+fx(c,{money:m(10),cor:10})},
    {l:'Lờ đi',f:c=>'Cứ để vậy.'+fx(c,{cor:2})}]},

/* ===================== Bè đảng trong họ ===================== */
{id:'qt_be_dang_don',t:'Lời đồn bè đảng',k:K,fixed:1,
 x:c=>`Trong triều có lời đồn: họ ${esc(S().surname)} có tới ${Q.clanQuan()} người làm quan, chẳng mấy chốc thành một phe riêng.`,
 o:c=>{const L=G.alive().filter(p=>G.inClan(p)&&p.job==='quan'&&p.id!==c.id&&!G.isHead(p)).sort((a,b)=>(b.postT||0)-(a.postT||0));
  return [...(L.length?[{l:`Cho ${L[0].given} từ quan về quê`,s:'Bớt một người làm quan, triều đình yên lòng',f:c=>{Q.dismiss(L[0],'tự xin từ quan để tránh tiếng bè đảng');S().bdWarn=0;return `${esc(L[0].given)} dâng đơn từ quan.`+fx(c,{fav:8})}}]:[]),
   ...(Q.ruleSlots()>S().rules.length&&!G.rule('quan3')&&!G.rule('quan5')?[{l:'Lập gia quy: trong tộc không quá năm người làm quan',f:c=>{Q.addRule('quan5','tránh tiếng bè đảng');S().bdWarn=0;return 'Gia quy mới được khắc vào bảng gỗ ở từ đường.'}}]:[]),
   {l:'Mặc kệ lời đồn',ax:{gan:1},f:c=>{S().bdWarn=(S().bdWarn||0)+1;G.alive().filter(p=>G.inClan(p)&&p.job==='quan').forEach(p=>Q.add(p,{risk:8}));return 'Lời đồn không tự tắt.'}}]}},
{id:'qt_hac_ket_be',t:'Bị hặc tội kết bè',k:K,fixed:1,
 x:c=>`Ngự sử dâng sớ hặc họ ${esc(S().surname)} kết bè kết đảng, nắm giữ quá nhiều chức vụ. Một người bị tra thì cả họ bị tra.`,
 o:c=>{const L=G.alive().filter(p=>G.inClan(p)&&p.job==='quan');L.forEach(p=>Q.add(p,{risk:20}));const nw=L.filter(p=>!G.isHead(p)).sort((a,b)=>(b.postT||0)-(a.postT||0));
  return [{l:'Cả họ dâng sớ tự minh',r:[{tri:1,eq:0.7},65],ax:{gan:1},y:c=>{L.forEach(p=>Q.add(p,{risk:-15}));S().bdWarn=0;return 'Vua đọc sớ, tạm gác chuyện.'},n:c=>{const p=nw[0];return p?'Vua không tin. '+Q.sentence(p,2,'kết bè'):'Vua không tin, cả họ bị nghi.'}},
   ...(nw.length>=2?[{l:`Cho ${nw[0].given} và ${nw[1].given} từ quan`,s:'Tự cắt bớt để giữ phần còn lại',f:c=>{nw.slice(0,2).forEach(p=>Q.dismiss(p,'từ quan để tỏ lòng'));L.forEach(p=>Q.add(p,{risk:-20}));S().bdWarn=0;return 'Hai người từ quan. Triều đình dịu lại.'+fx(c,{fav:8})}}]:[]),
   {l:'Nhờ phe che chở',f:c=>{const k=Q.of(c).f;const F=k?Q.court().f[k]:null;if(F&&chance(F.pow/110)){S().bdWarn=0;return `Phe ${FN(k)} ra tay, tờ sớ chìm.`}L.forEach(p=>Q.add(p,{risk:10}));return 'Không ai dám đứng ra.'}}]}},

/* ===================== Thang hậu quả ===================== */
{id:'qt_giam_sat',t:'Bị ngự sử để mắt',k:K,fixed:1,
 x:c=>`Có người báo: ngự sử đang cho người theo dõi ${N(c)}, ghi chép thư từ và khách khứa ra vào.`,
 o:c=>{const fee=m(15*(c.lv+1));return [
  {l:'Thu mình, làm việc cẩn trọng',ax:{diem:1,tiet:1},f:c=>'Đóng cửa từ chối khách, làm việc đúng phép.'+fx(c,{risk:-15,bonus:-0.05})},
  {l:`Đút lót ngự sử (${G.fmtMoney(fee)})`,vio:'trugian',c:()=>G.money()>=fee,ax:{thanh:-2},f:c=>{S().money-=fee;if(chance(0.55)){ST(c,0);return 'Người theo dõi rút đi.'+fx(c,{risk:-20,cor:5})}return 'Ngự sử ghi luôn chuyện đút lót vào sổ.'+fx(c,{cor:5,risk:20})+toHac(c)}},
  {l:'Mặc kệ',ax:{gan:1},f:c=>'Thẳng thì không sợ ai nhìn.'}]}},
{id:'qt_dan_hac',t:'Bị dâng sớ đàn hặc',k:K,fixed:1,
 x:c=>{const L=Q.level(c);return `Ngự sử dâng sớ hặc ${N(c)}. Tội danh trong sớ: <b>${Q.CRIME_N[Math.max(1,L)]}</b>.${Q.framed(c)?' Phần nhiều là vì phe của '+N(c)+' vừa thất thế.':''}`},
 o:c=>{const qq=q(c);const L=Q.level(c);const F=qq.f?Q.court().f[qq.f]:null;const fee=m(25*(1+c.lv/2));return [
  {l:'Dâng sớ tự biện',r:[{tri:1,eq:0.7},45+L*8],ax:{gan:1},y:c=>{ST(c,0);qq.risk=Math.max(0,qq.risk-35);return 'Lời biện chặt chẽ, vua cho lui án.'+fx(c,{fav:5})},n:c=>'Lời biện không thuyết phục, vụ việc chuyển sang công đường.'+fx(c,{fav:-5})+toAn(c)},
  {l:'Dâng sớ nhận lỗi, xin chịu phạt',s:'Nhẹ tội hơn, nhưng khó giữ chức',ax:{diem:1},f:c=>Q.sentence(c,Math.min(Math.max(1,L-1),3),'tự nhận lỗi')},
  ...(F?[{l:`Cầu cứu phe ${FN(qq.f)}`,s:'Phe còn mạnh thì có thể được che',f:c=>{if(chance(F.pow/120*(0.4+qq.loy/100))){ST(c,0);qq.risk=Math.max(0,qq.risk-25);return `${esc(F.lead)} ra tay, tờ sớ chìm xuồng.`+fx(c,{loy:10})}return 'Phe mình cũng đang lo thân, không ai dám đứng ra.'+toAn(c)}},
    {l:`Cắt đứt với phe ${FN(qq.f)} để tỏ lòng`,ax:{dl:1},f:c=>{Q.join(c,null);qq.risk=Math.max(0,qq.risk-15);if(chance(0.5)){ST(c,1);return 'Vua thấy có lòng hối cải, tạm gác lại.'+fx(c,{fav:3})}return 'Cắt đứt đã muộn.'+toAn(c)}}]:[]),
  {l:`Đút lót ngự sử (${G.fmtMoney(fee)})`,vio:'trugian',c:()=>G.money()>=fee,ax:{thanh:-2},f:c=>{S().money-=fee;if(chance(0.5)){ST(c,1);qq.risk=Math.max(0,qq.risk-20);return 'Tờ sớ bị rút lại.'+fx(c,{cor:6})}Q.add(c,{cor:10,crime:2});return 'Ngự sử đem cả túi bạc lên triều làm tang vật.'+fx(c,{fav:-10})+toAn(c,R(1,2))}}]}},
{id:'qt_xet_an',t:'Công đường xét án',k:K,fixed:1,
 x:c=>{const qq=q(c);const L=Math.min(5,Q.level(c)+(qq.res&&Q.level(c)>=4?1:0));return `${N(c)} bị giải lên công đường. Tội danh đang bị buộc: <b>${Q.CRIME_N[L]}</b>.${Q.framed(c)?` ${N(c)} có thể kêu oan, vì phần lớn tội là bị phe mình kéo theo.`:''}${L>=4?' Án này có thể kéo cả họ theo.':''}`},
 o:c=>{const qq=q(c);const L=Math.min(5,Q.level(c)+(qq.res&&Q.level(c)>=4?1:0));const fee=m(40*Math.max(1,L));const sp=G.spouseOf(c);
  const kin=G.alive().filter(p=>p.id!==c.id&&G.inClan(p)&&G.age(p)>=18&&!G.isHead(p)&&(c.parents.includes(p.id)||p.parents.includes(c.id)||(sp&&sp.id===p.id))).sort((a,b)=>G.age(b)-G.age(a));
  const o=[];
  o.push({l:`Chạy án (${G.fmtMoney(fee)})`,s:'Có khi được giảm tội, có khi mất tiền oan',vio:'trugian',c:()=>G.money()>=fee,ax:{thanh:-1},f:c=>{S().money-=fee;if(chance(0.45))return 'Tiền đến đúng tay. Án được giảm. '+Q.sentence(c,L-1,'sai phạm');return 'Tiền mất mà án vẫn y nguyên. '+Q.sentence(c,L,'sai phạm')}});
  if(Q.framed(c))o.push({l:'Kêu oan, chứng minh mình vô can',r:[{tri:1,eq:0.6},60],ax:{gan:1},y:c=>{ST(c,0);qq.risk=0;Q.join(c,null);return 'Bằng chứng rõ ràng, công đường tha bổng.'+fx(c,{fame:10,fav:5})},n:c=>'Lời kêu oan không ai nghe. '+Q.sentence(c,L,'bị liên lụy')});
  if(qq.ev>0)o.push({l:'Đưa chứng cứ vạch mặt kẻ đứng sau',r:[{tri:0.8,muu:0.8},55],ax:{gan:1,muu:1},y:c=>{qq.ev--;return 'Chứng cứ lật ngược thế cờ. '+Q.sentence(c,L-2,'')+fx(c,{fav:10})},n:c=>{qq.ev--;return 'Chứng cứ bị cho là ngụy tạo. '+Q.sentence(c,L+1,'vu cáo')}});
  if(L>=2)o.push({l:'Khai ra đồng bọn để được giảm tội',s:'Được giảm tội, bị người đời khinh',ax:{thanh:1,rong:-1},f:c=>Q.sentence(c,L-1,'')+fx(c,{fame:-15})});
  if(kin.length&&L>=3){const k=kin[0];o.push({l:`Để ${k.given} nhận tội thay`,s:'Một người hy sinh để cứu người kia',ax:{rong:-1},f:c=>{ST(c,0);qq.risk=0;const t=Q.sentence(k,Math.min(L,4),'nhận tội thay cho '+c.given);if(c.job==='quan')Q.dismiss(c,'');return `${esc(k.given)} quỳ trước công đường nhận hết tội. ${t}`}})}
  o.push({l:'Cam chịu, nghe án',ax:{diem:1},f:c=>Q.sentence(c,L,'')});
  return o}},
{id:'qt_that_the',t:'Quyền thần thất thế',k:K,fixed:1,
 x:(c,d)=>`${esc(d.lead||'Người đứng đầu phe')} đã bị bắt. Môn sinh của phe ${FN(d.f)} đang bị gọi lên từng người một. Sớm muộn cũng tới lượt ${N(c)}.`,
 o:(c,d)=>[
  {l:'Chối bỏ, cắt đứt mọi quan hệ',r:[{eq:0.8,khau:0.8},50+q(c).loy/3],ax:{ht:-1},y:c=>{Q.join(c,null);return 'Chối được sạch sẽ, thoát khỏi danh sách.'+fx(c,{risk:-20})},n:c=>{Q.join(c,null);return 'Thư từ cũ bị tìm thấy, càng chối càng nghi.'+fx(c,{risk:10})}},
  {l:'Tự dâng sớ nhận tội',s:'Mất chức nhưng giữ được nhà',ax:{thanh:1},f:c=>Q.sentence(c,2,'là môn sinh phe thất thế')},
  {l:'Tố giác thầy cũ',s:'Được vua tin, bị đời gọi là phản chủ',ax:{thanh:1,ht:-2},f:c=>{Q.join(c,null);Q.log('Môn sinh khai báo',`${G.nameOf(c)} tố giác ${d.lead||'thầy cũ'} trước công đường.`);return 'Lời khai của môn sinh là nhát dao cuối.'+fx(c,{fav:15,risk:-30,fame:-10})}},
  {l:'Chống đối, bênh vực thầy',s:'Trung nghĩa nhưng có thể thành đại án',ax:{gan:2,ht:1},f:c=>{q(c).res=1;Q.add(c,{crime:4,risk:30});return 'Giữa triều đứng ra bênh kẻ có tội. Cả triều sững sờ.'+fx(c,{fame:8})+toHac(c)}}]},
{id:'qt_tru_di_canh_bao',t:'Mây đen trên đầu cả họ',k:'Đại họa',fixed:1,
 x:(c,d)=>{const w=G.P(d.who);return `Tin từ kinh thành: án của ${w?esc(G.nameOf(w)):'người trong họ'} đã thành đại án. Trong triều bàn chuyện tru di. Từ giờ tới khi chiếu chỉ ban xuống chỉ còn vài tháng.`},
 o:(c,d)=>{const w=G.P(d.who);const o=[];const sv=()=>{S().tdq=null};const us=!!(S().tdq&&S().tdq.us);if(!w)return [{l:'Thở phào',f:()=>{sv();return 'Không còn ai để xử.'}}];
  const kin=new Set([w.id,...w.parents]);G.kidsOf(w).forEach(k=>kin.add(k.id));
  const cand=G.alive().filter(p=>G.inClan(p)&&p.hh===c.hh&&G.age(p)>=16&&!kin.has(p.id)&&!G.isHead(p)&&p.job!=='quan').sort((a,b)=>a.born-b.born);
  if(!us&&!G.isHead(w))o.push({l:`Trục xuất ${w.given} khỏi gia phả, cắt đứt mọi liên hệ`,s:'Người ấy chịu tội một mình, cả họ mang tiếng',ax:{rong:-1},f:c=>{sv();Q.expel(w);w.dead=S().t;Q.log('Cắt đứt để giữ họ',`Họ ${esc(S().surname)} xóa tên ${G.nameOf(w)} khỏi gia phả trước khi chiếu chỉ ban xuống.`);return `Tên ${esc(w.given)} bị gạch khỏi gia phả. Mấy tháng sau ${esc(w.given)} bị xử một mình. Họ ${esc(S().surname)} thoát nạn, nhưng ai cũng cúi mặt.`+fx(c,{cfame:-20})}});
  if(cand.length)o.push({l:`Đưa ${cand[cand.length-1].given} cùng vợ con rời đi trong đêm, lập chi ở xa`,s:'Nếu tai họa ập xuống, nhánh này còn sống',ax:{muu:1},f:c=>{const p=cand[cand.length-1];const id=Q.newBranch(p,1,0);S().hh[id].far=1;const sp=G.spouseOf(p);[p,sp,...G.kidsOf(p)].forEach(x=>{if(x&&G.inClan(x))x.hh=id});return `Đêm ấy một chiếc thuyền nhỏ lặng lẽ xuôi dòng. ${esc(p.given)} mang theo cả nhà, đổi tên đổi họ sống nơi xa.`}});
  if(!us)o.push({l:'Dâng sớ nhận tội, xin cho một mình chịu',r:[{eq:1,tri:0.6},70],ax:{gan:1},y:c=>{sv();Q.of(w).crime=Math.min(4,Q.of(w).crime);return 'Vua đọc sớ, động lòng. Chỉ xử kẻ phạm tội. '+Q.sentence(w,4,'đại án')},n:c=>'Tờ sớ không được đoái hoài.'});
  if(!us&&((S().inlaws||[]).length||(Q.of(w).mon||0)>0))o.push({l:'Nhờ thông gia, môn sinh cầu tình',f:c=>{if(chance(0.3+0.08*(Q.of(w).mon||0))){sv();return 'Nhiều người cùng dâng sớ xin. Vua giảm án. '+Q.sentence(w,4,'đại án')}return 'Ai cũng sợ dây vào, chẳng ai dám đứng ra.'}});
  o.push({l:'Đành phó mặc cho trời',f:c=>'Cả nhà thắp hương, chờ.'});
  return o}},
{id:'qt_chieu_tru_di',t:'Chiếu chỉ tru di',k:'Đại họa',fixed:1,
 x:(c,d)=>{const w=G.P(d.who);return `Quan quân vây kín cổng. Chiếu chỉ được đọc giữa sân: vì tội của ${w?esc(G.nameOf(w)):'kẻ phạm'}, họ ${esc(S().surname)} bị tru di.`},
 o:(c,d)=>{const w=G.P(d.who);const esc0=G.alive().some(p=>G.inClan(p)&&p.hh!==G.mainHH()&&S().hh[p.hh]&&S().hh[p.hh].far);const cuu=!!w&&Q.of(w).crime>=5&&!esc0; /* v6.4.1.8: đã có một chi trốn đi xa thì chỉ tam tộc */return [
  {l:'Quỳ tiếp chỉ',f:c=>{S().tdq=null;return w?Q.truDi(w,cuu):''}},
  {l:'Liều mạng kháng chỉ, mở đường cho con cháu chạy',s:'Thành thì vài người thoát, bại thì không còn ai',r:[{vo:1,gan:0.6},75],y:c=>{S().tdq=null;return 'Trong lúc hỗn loạn, mấy đứa trẻ được đưa ra khỏi thành. '+(w?Q.truDi(w,false):'')},n:c=>{S().tdq=null;return w?Q.truDi(w,true):''}}]}},
{id:'qt_tro_lai',t:'Trở lại kinh thành',k:K,job:QQ,pcd:9999,c:c=>c.lv>=4&&!!(S().qtHist&&S().qtHist.trudi),
 x:c=>`Đã nhiều năm sau đại họa. Nay ${N(c)} đứng giữa triều, có thể dâng sớ xin minh oan cho tổ tiên.`,
 o:[{l:'Dâng sớ xin minh oan',r:[{tri:1,eq:0.7},65],ax:{ht:1,gan:1},y:c=>{S().qtHist.trudi=null;Q.log('Rửa oan cho tổ tiên',`${G.nameOf(c)} dâng sớ, triều đình minh oan cho tiền nhân họ ${esc(S().surname)}.`);return 'Vua chuẩn tấu. Tên tuổi tiền nhân được phục hồi.'+fx(c,{cfame:30,fav:10})},n:c=>'Chuyện cũ chưa ai dám lật lại.'+fx(c,{risk:10})},
    {l:'Để chuyện cũ ngủ yên',f:c=>'Giữ mình, giữ nhà.'}]},

/* ===================== Sự kiện đặc biệt ===================== */
{id:'qt_mat_chi_gia',t:'Mật chỉ không rõ nguồn gốc',k:K,job:QQ,cd:300,w:0.4,c:c=>c.lv>=4,
 x:c=>`Đêm khuya, ${N(c)} nhận một mật chỉ: bắt ngay một đại thần. Nhưng dấu ấn có chỗ không giống, nét chữ cũng lạ.`,
 o:[{l:'Thi hành ngay',ax:{ht:1,gan:1},f:c=>{if(chance(0.5)){c.cong=(c.cong||0)+30;G.tuocCheck(c,'thi hành mật chỉ');return 'Chiếu chỉ là thật. Vua khen nhanh nhẹn.'+G.tuocNote()+fx(c,{fav:10})}Q.add(c,{crime:5,risk:40});Q.log('Thi hành mật chỉ giả',`${G.nameOf(c)} thi hành một mật chỉ giả, bị nghi đồng mưu.`);return 'Chiếu chỉ là giả. Kẻ mạo chiếu đang mưu phản, và ${N} vừa giúp hắn.'.replace('${N}',N(c))+toHac(c)}},
    {l:'Tâu lại xin xác minh',r:[{tri:1,muu:0.5},60],ax:{diem:1},y:c=>{Q.log('Lật tẩy mật chỉ giả',`${G.nameOf(c)} phát hiện mật chỉ giả, cứu một đại thần.`);return 'Mật chỉ là giả. Một âm mưu bị lật tẩy.'+fx(c,{fav:12,fame:10})},n:c=>'Chiếu chỉ là thật, vua trách chậm trễ.'+fx(c,{fav:-6})},
    {l:'Cáo bệnh, không dính vào',ax:{gan:-1},f:c=>'Đóng cửa nằm nhà.'+fx(c,{risk:5})}]},
{id:'qt_cuu_than',t:'Cựu thần ba triều',k:K,job:QQ,cd:300,w:0.5,c:c=>c.lv>=3,
 x:c=>`Một vị quan già từng thờ ba đời vua mời ${N(c)} tới nhà. Ông biết nhiều chuyện mà sử sách không chép.`,
 o:[{l:'Kết giao, học điều hay',ax:{hd:1},f:c=>{if(chance(0.3))G.later(c,'qt_cuu_than_an',R(24,72));return 'Mỗi lần ghé là một bài học về triều chính.'+fx(c,{tri:2,fav:4})}},
    {l:'Kính trọng mà giữ khoảng cách',ax:{diem:1},f:c=>'Lễ nghĩa đủ cả.'}]},
{id:'qt_cuu_than_an',t:'Vụ án cũ trở lại',k:K,fixed:1,
 x:c=>`Vị cựu thần qua đời. Một vụ án cũ của ông bị lật lại, và tên ${N(c)} nằm trong danh sách khách quen.`,
 o:[{l:'Đứng ra làm chứng cho ông',ax:{rong:1,gan:1},f:c=>'Lời chứng giữ được danh tiếng người đã khuất.'+fx(c,{fame:8,risk:12})},
    {l:'Phủi tay',ax:{rong:-1},f:c=>'Không quen, không biết.'+fx(c,{fame:-5})}]},
{id:'qt_hon_su',t:'Hôn sự chính trị',k:K,job:QQ,cd:240,w:0.5,c:c=>c.lv>=4&&hasFac(c),
 x:c=>`Một nhà quyền thế trong phe ${FN(q(c).f)} muốn kết thông gia với họ ${esc(S().surname)}. Hôn sự giúp đường quan rộng mở, nhưng phe đổ thì thông gia đổ theo.`,
 o:[{l:'Nhận lời',ax:{tv:1},f:c=>{(S().qtHist=S().qtHist||{fac:{}}).hon=q(c).f;return 'Hai nhà định ngày lễ hỏi.'+fx(c,{loy:15,fav:3,cfame:5})}},
    {l:'Khước từ',ax:{dl:1},f:c=>'Nhà kia không vui.'+fx(c,{loy:-10})}]},
{id:'qt_di_so',t:'Di sớ trước khi chết',k:K,job:QQ,cd:360,w:0.4,c:c=>c.lv>=3,
 x:c=>`Một vị quan thanh liêm trước khi chết trao cho ${N(c)} một tờ sớ tố cáo nửa triều đình.`,
 o:[{l:'Công khai tờ sớ',r:[{gan:1,tri:0.6},60],ax:{gan:2,thanh:1},y:c=>{const F=Q.court().f;F.thanh.pow=Math.min(95,F.thanh.pow+10);F.quyen.fav=Math.max(5,F.quyen.fav-10);Q.log('Công bố di sớ',`${G.nameOf(c)} công bố di sớ của một vị quan thanh liêm.`);return 'Cả triều chấn động.'+fx(c,{fame:25})},n:c=>'Kẻ bị tố ra tay trước.'+fx(c,{risk:30})},
    {l:'Tiêu hủy',ax:{gan:-1},f:c=>'Lửa tắt, lương tâm chưa tắt.'+fx(c,{tam:-5})},
    {l:'Giữ làm quân bài',ax:{muu:1},f:c=>{q(c).ev=(q(c).ev||0)+1;return 'Tờ sớ được khâu vào lót áo.'+fx(c,{risk:5})}}]}
];});
