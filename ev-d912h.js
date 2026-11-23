/* Bách Niên Thế Gia v6.7.10-d9.12 · VIẾT LẠI LOẠT 3: hôn nhân và tình duyên có thẻ người (R1, R17), con nuôi biết rõ là ai, vua vi hành thật, võ cử có chức danh, giá đất đồng bộ, gia đình có hậu quả thật, kỳ ngộ đời thường xứng. Bản cũ cùng id đã xóa bằng tools/rmev.js. */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const FM=v=>G.fmtMoney(v);const N=c=>esc(c.given);
const T=d=>d&&d.npc?G.tie.get(d.npc):null;const nm=n=>esc(n?n.n:'người ấy');
const E=o=>Object.assign({tags:{}},o);
const addVai=(n,v)=>{if(!n.vai.includes(v)){n.vai.push(v);n.vaiTxt=n.vai.map(x=>G.tie.VAI[x]||x).join(', ')}};
const pay=(l,v,o)=>Object.assign({l:`${l} (${FM(m(v))})`,c:()=>G.money()>=m(v)},o);
const gone=()=>[{l:'Thôi',f:()=>''}];
/* người thương/ứng viên hôn nhân: tạo bằng mkMatch (người thật sẽ vào gia phả khi cưới) và hiện thẻ chân dung bằng sổ người quen */
function prospect(c,d,o){const p=G.mkMatch(c,Object.assign({age:Math.max(16,G.age(c)+R(-3,3))},o||{}));d.sp=p;
  const n=G.tie.ensure(c,{vai:['nguoi_thuong'],name:p.surname+' '+p.given,g:p.g,age:Math.max(16,G.age(p)||R(18,28)),st:{tri:p.tri,vo:p.vo,mi:p.mi,eq:p.eq},nghe:'từ '+(p.famName||'một nhà trong vùng'),job:p.job,rel:5,why:'người được nhắc tới'});d.npc=n.id;return {p,n}}
const marry=(c,d,free)=>G.mkSpouse(c,free,d.sp);
return [
/* ============ Ý trung nhân: thấy rõ người trước khi ngỏ lời ============ */
E({id:'y_trung_nhan',t:'Ý trung nhân',age:[16,32],c:c=>!G.married(c)&&c.spouse==null,w:1.8,pcd:18,
 x:(c,d)=>{const {p,n}=prospect(c,d);return `Ở ${pick(['bến nước','hội chùa','chợ phiên','nhà một người bạn'])}, ${N(c)} gặp ${nm(n)}, một ${p.g==='nữ'?'cô gái':'chàng trai'} khiến tim đập loạn nhịp. Có thể nhìn kỹ: tuổi, nghề, tài năng của người ấy ở thẻ trên.`},
 o:(c,d)=>[
  {l:'Mạnh dạn ngỏ lời',r:[{mi:1,eq:0.8},50],y:c=>{marry(c,d,true);return `Hai người nên duyên vợ chồng! ${nm(T(d))} gật đầu ngay trong buổi gặp.`},n:c=>`Bị từ chối, buồn mấy tháng. ${nm(T(d))} nói chưa nghĩ chuyện chồng vợ.`+fx(c,{tam:-10})},
  pay('Nhờ người làm mai',15,{r:[{mi:0.6,fame:0.5},42],y:c=>{G.S().money-=m(15);marry(c,d,false);return `Bà mối đi lại hai nhà, hôn sự thành.`},n:c=>`Nhà bên kia chê gia cảnh, bà mối về tay trắng.`+fx(c,{money:-m(15),tam:-6})}),
  {l:'Chỉ dám nhìn từ xa, hẹn gặp lại',f:c=>{G.tie.later(T(d),c,'tie_ban_nho',R(6,18),{});return `Mình đứng nhìn theo ${nm(T(d))} rất lâu rồi về, lòng cứ rạo rực.`+fx(c,{tam:-2,eq:1})}}]}),
/* ============ Con không ưng mối nhà chọn ============ */
E({id:'hn_ep_gia',t:'Con không ưng mối nhà chọn',k:'Hôn nhân',w:0.5,cd:96,age:[16,26],c:c=>!c.spouse&&!c.away&&G.inMain(c)&&G.axv(c,'dl')>=60,
 x:(c,d)=>{const {p,n}=prospect(c,d,{up:0.5});return `Gia đình đã ưng cho ${N(c)} một mối: ${nm(n)}, ${p.g==='nữ'?'con gái':'con trai'} ${p.famName?'nhà '+esc(p.famName):'một nhà tử tế'}. Nhưng ${N(c)} nhất quyết không chịu, nói lấy người mình không thương thì khổ cả đời. Người được chọn ở thẻ trên.`},
 o:(c,d)=>[
  {l:'Ép cưới, cha mẹ đặt đâu con ngồi đấy',ax:{dl:-2},f:c=>{const sp=marry(c,d,false);if(sp){c.marT=sp.marT='cuongep';if(c.love!=null)c.love=sp.love=Math.max(0,c.love-20)}return `Đám cưới diễn ra trong nước mắt. ${nm(T(d))} không biết gì, chỉ thấy cô dâu chú rể im lặng.`+fx(c,{tam:-12,on:1})}},
  {l:'Chiều con, hủy mối',ax:{dl:1},f:c=>`Nhà ${nm(T(d))} không vui, nhưng con thì nhẹ lòng.`+fx(c,{tam:6,cfame:-1})},
  {l:'Cho hai đứa gặp nhau mấy lần rồi quyết',r:[{eq:0.7,mi:0.4},45],y:c=>{marry(c,d,false);return `Gặp mấy lần, ${N(c)} thấy ${nm(T(d))} cũng có nhiều điều đáng quý. Hôn sự thành trong vui vẻ.`+fx(c,{tam:5,on:1})},n:c=>`Gặp mấy lần, hai người vẫn không hợp. Hủy mối êm thấm hơn là ép.`+fx(c,{tam:2})}]}),
/* ============ Mối mai có tiếng xấu: chỉ hiện chỉ số, tật xấu phải dò mới biết ============ */
E({id:'hn_moi_xau',t:'Mối mai có tiếng xấu',k:'Hôn nhân',w:0.6,cd:60,age:[18,30],c:c=>!c.spouse&&!c.away&&G.inMain(c),
 x:(c,d)=>{const {p,n}=prospect(c,d,{up:1});d.bad=chance(0.6);return `Bà mối giới thiệu cho ${N(c)} ${nm(n)}, nhà khá giả. Thẻ trên chỉ cho biết tuổi tài; còn tính nết thì có người thì thầm là mê cờ bạc, nợ nần, người khác lại bảo toàn lời đồn. Chỉ dò hỏi mới biết thật hay giả.`},
 o:(c,d)=>[
  {l:'Cho người dò hỏi cho rõ',r:[{tri:0.8,eq:0.5},55],y:c=>d.bad?`Đúng là có chuyện cờ bạc. Từ chối khéo, may mà biết sớm.`+fx(c,{tam:2,tri:1}):`Dò ra thì lời đồn là bịa đặt do kẻ ghen tị. Hôn sự thành, ${nm(T(d))} cảm kích vì nhà không tin lời xấu.`+(marry(c,d,false),'')+fx(c,{tam:5,eq:1}),n:c=>{const sp=marry(c,d,false);if(sp&&d.bad&&G.D.HABITS.bac)G.addHabit(sp,'bac',35);return `Dò không ra gì, cứ cưới. ${d.bad?'Về nhà mới biết lời đồn là thật.':'Hóa ra lời đồn chỉ là bịa.'}`+fx(c,{tam:d.bad?-6:3})}},
  {l:'Lời đồn chưa chắc, cứ cưới',f:c=>{const sp=marry(c,d,false);if(sp&&d.bad&&G.D.HABITS.bac)G.addHabit(sp,'bac',35);return `Đám cưới linh đình.${d.bad?' Vài tháng sau, tật cờ bạc lộ ra.':' ' + nm(T(d))+' hóa ra là người tử tế.'}`+fx(c,{tam:d.bad?-2:4})}},
  {l:'Từ chối ngay',f:c=>'Thà muộn còn hơn lầm.'+fx(c,{tam:0})}]}),
/* ============ Cháu mồ côi: biết rõ trước khi nhận ============ */
E({id:'nuoi_chau_mo_coi',t:'Cháu mồ côi',k:'Con nuôi',age:[22,70],w:0.6,cd:48,
 x:(c,d)=>{const g=chance(0.5)?'nam':'nữ';const a=R(3,8);const kid=G.mkPerson({g,age:a,young:true,surname:c.surname});d.kid={g,a,given:kid.given,gn:kid.gn,tg:kid.tg};const avg=k=>Math.round(((kid.gn&&kid.gn[k]?kid.gn[k][0]+kid.gn[k][1]:100)/2));
  const n=G.tie.ensure(c,{vai:['quen'],name:kid.surname+' '+kid.given,g,age:a,st:{tri:avg('tri'),vo:avg('vo'),mi:avg('mi'),eq:avg('eq')},nghe:`mồ côi, ${a} tuổi (chỉ số hiện là tư chất bẩm sinh)`,tier:1,rel:0,why:'cha mẹ qua đời'});d.npc=n.id;return `Một người bà con xa qua đời, để lại ${nm(n)}, ${g==='nam'?'bé trai':'bé gái'} ${a} tuổi, không ai nuôi. Thẻ trên cho biết tuổi và tư chất của bé trước khi nhà quyết định.`},
 o:(c,d)=>[
  {l:'Đón về nuôi, như con trong nhà',f:c=>{const k=G.adopt(c,{age:d.kid.a,g:d.kid.g,given:d.kid.given,gn:d.kid.gn,tg:d.kid.tg});return `${esc(k.given)} về ở cùng nhà, gọi nhà ${N(c)} bằng cha mẹ nuôi. Mình có thể đặt thêm chữ đệm khi làm lễ nhận con.`+fx(c,{tam:4,cfame:2,on:2,eq:1})}},
  pay('Gửi tiền nhờ người khác nuôi',3,{f:c=>{addVai(T(d),'quen');G.tie.later(T(d),c,'tie_an_nhan_tra',R(60,180),{});return `Nhà gửi tiền cho một gia đình tử tế nuôi bé. Nhiều năm sau bé lớn, vẫn nhớ ơn nhà đã không bỏ rơi.`+fx(c,{money:-m(3),cfame:1,qh:[nm(T(d)),G.tie.rel(T(d),20,'được nhà giúp nuôi')[1]]})}}),
  {l:'Từ chối, nhà không đủ sức',f:c=>`Bé được một người họ hàng xa nhận. Nhà áy náy một thời gian.`+fx(c,{tam:-2})}]}),
/* ============ Khách lạ trong làng: vua vi hành thật ============ */
E({id:'tt_vi_hanh',t:'Khách lạ trong làng',k:'Thời thế',fixed:1,
 x:(c,d)=>{const n=G.tie.ensure(c,{vai:['khach'],nghe:'vị khách phong thái khác thường',age:R(38,60),main:'tri',tier:6,rel:0,why:'vi hành'});d.npc=n.id;return `Một vị khách phong thái khác thường, ${nm(n)}, ghé nhà ${N(c)} xin nước, hỏi chuyện làm ăn, chuyện quan lại trong vùng. Người hầu theo ông đi đứng như lính. Nhà không biết ông là ai.`},
 o:(c,d)=>{const n=T(d);if(!n)return gone();const V=G.vua;const minh=V.type()==='minh';return [
  {l:'Tiếp đãi tử tế như mọi khách',ax:{rong:1},f:c=>{if(chance(minh?0.6:0.3)){G.cf(10,'Được vua vi hành ghé thăm');G.tie.later(n,c,'tt_vi_hanh_b',R(24,96),{});G.alive().filter(p=>G.inClan(p)&&p.job==='quan').forEach(p=>G.qt.add(p,{fav:6}));return `Mấy tháng sau mới biết vị khách là đương kim hoàng đế. Cả vùng truyền tai nhau, người nhà làm quan được ghi nhớ.`+fx(c,{cfame:3,eq:2,tam:5,fav:4,qh:[n.n,G.tie.rel(n,20,'tiếp đãi vua vi hành')[1]]})}return `Vị khách cảm ơn lịch sự rồi đi. Chẳng ai biết ông là ai.`+fx(c,{eq:1,tam:1})}},
  {l:'Nói thật nỗi khổ của dân',r:[{eq:0.8,gan:0.5},50],ax:{gan:1,thanh:1},y:c=>{V.d().dt=Math.min(100,V.d().dt+2);G.tie.later(n,c,'tt_vi_hanh_b',R(12,48),{});return `Khách lặng nghe, gật đầu. Ít lâu sau quan huyện bị cách chức vì tội lạm thu, cả vùng được nhờ.`+fx(c,{cfame:4,fame:4,eq:3,tam:5,qh:[n.n,G.tie.rel(n,25,'nói thật nỗi khổ của dân')[1]]})},n:c=>`Khách nghe rồi đi, không nói gì. Về sau mình mới biết ông là người trên cao, và mình chỉ nói giữa đường.`+fx(c,{tam:-1})},
  {l:'Lánh mặt, cho người nhà tiếp',f:c=>`Khách đi rồi cũng chẳng ai nhớ.`+fx(c,{tam:-1})}]}}),
E({id:'tt_vi_hanh_b',t:'Chiếu chỉ ban thưởng',k:'Thời thế',fixed:1,
 x:(c,d)=>`Một chiếu chỉ từ kinh gửi về nhà ${N(c)}: hoàng đế nhớ chuyện vi hành năm xưa, ban thưởng cho nhà "hiếu nghĩa, biết đạo". Quan huyện đích thân mang đến.`,
 o:(c,d)=>[
  {l:'Nhận ban thưởng, thắp hương tạ ơn',f:c=>{G.tax.pol('mien',12);return `Hoàng đế ban biển "Hiếu nghĩa chi gia", miễn thuế một năm cho nhà. Quan huyện khép nép từ đó.`+fx(c,{money:m(R(30,60)),cfame:6,eq:2,tam:8,fav:3})}},
  {l:'Xin dời ban thưởng cho một người trong họ có tài vào kinh học',c:c=>G.kinList(c,p=>G.age(p)>=12&&G.age(p)<=30&&p.tri>=60).length>0,go:(c,d2)=>G.pickKin(c,{eyebrow:'Ơn vua',title:'Cử ai vào kinh',text:'Hoàng đế ban ơn, nhà xin cho một người có tài vào Quốc tử giám thay phần thưởng. Người được chọn sẽ học nhiều năm ở kinh.',filter:p=>G.age(p)>=12&&G.age(p)<=30&&p.tri>=60,cb:w=>`${esc(w.given)} vào kinh học, được quan trong triều để ý.`+fx(w,{tri:R(4,7),eq:2,tam:5})+fx(c,{cfame:4})})}]}),
/* ============ Bổ dụng sau võ cử: có chức danh và đặc quyền ============ */
E({id:'v641_vo_do',t:'Bổ dụng sau võ cử',fixed:1,k:'Võ cử',
 x:c=>`Triều đình xét ${N(c)} ${c.flags.voTop?'đỗ đầu bảng':'đỗ'} võ cử. Danh võ cử nay có chức danh thật: ${c.flags.voTop?'Võ tiến sĩ':'Võ cử nhân'}, miễn lao dịch cho cả nhà. Có ba đường: vào quân nhận chức ${c.flags.voTop?'Thiên hộ':'Bách hộ'}; ở lại nhà làm huấn luyện võ cho dân binh; hoặc mở võ đường.`,
 o:c=>[
  {l:c.flags.voTop?'Vào quân, nhận chức Thiên hộ':'Vào quân, nhận chức Bách hộ',f:c=>{G.voEnlist(c,c.flags.voTop?4:3);return `${N(c)} cáo biệt gia đình, mang ấn bổ dụng ra doanh trại. Việc thi võ cử đã rèn thêm cho mình rất nhiều.`+fx(c,{vo:R(4,8),eq:2,tam:4})}},
  {l:'Ở lại, làm huấn luyện võ cho dân binh làng',f:c=>{c.flags.vosinh=G.S().t;return `${N(c)} giữ chức "võ sư dân binh": mỗi tháng có bổng nhẹ, dạy dân binh luyện tập, an ninh làng nhà được bảo đảm hơn.`+fx(c,{vo:R(3,6),eq:2,bonus:0.08,cfame:2,tam:4})}},
  pay('Mở võ đường dạy học trò',20,{f:c=>{c.flags.vodduong=1;return `${N(c)} mở võ đường mang tên mình, học trò đến học ngày một đông, người nhà muốn học võ có nơi theo.`+fx(c,{money:-m(20),vo:R(3,5),eq:3,bonus:0.12,cfame:3,tam:5})}})]}),
/* ============ Mua ruộng: giá đồng bộ với giá đất thật ============ */
E({id:'lw_31',t:'Mua ruộng không văn tự',c:c=>G.landOk(),tier:[1,6],ms:1,w:0.5,
 x:c=>`Một người nghèo bán đất cho ${N(c)} giá rất rẻ, chỉ có lời nói, không có văn tự: "Ông cố tôi để lại cho, ai cũng biết". Giá chỉ bằng khoảng một phần ba giá thường.`,
 o:c=>{const base=Math.max(m(2),G.landCost());const l=Math.round(base*0.45),r=Math.round(base*0.3);return [
  {l:`Mua, nhờ lý trưởng làm chứng (${FM(l)})`,c:()=>G.money()>=l,f:c=>{G.landDelta(1);return 'Lý trưởng ghi nhận, giấy tờ đàng hoàng. Một mẫu ruộng thêm vào nhà.'+fx(c,{money:-l,cfame:1})}},
  {l:`Mua rẻ, không giấy tờ (${FM(r)})`,c:()=>G.money()>=r,r:[{tri:0.5,muu:0.4},50],y:c=>{G.landDelta(1);return 'Mua thành. Chưa ai tranh.'+fx(c,{money:-r})},n:c=>{G.landDelta(1);return 'Mua rồi con cháu người bán đến đòi, kiện ra quan. Mất cả tiền lẫn tiếng.'+fx(c,{money:-r,fame:-3,tam:-5})}},
  {l:'Từ chối',f:c=>'Người ấy bán cho người khác.'}]}}),
E({id:'lw_36',t:'Ruộng quan bán rẻ',c:c=>G.landOk(),tier:[2,6],ms:1,w:0.4,
 x:c=>`Quan huyện cần tiền, mở bán ruộng công với giá hời cho nhà khá giả: chỉ bằng một nửa giá thường. Nhiều nhà lớn đang tính.`,
 o:c=>{const base=Math.max(m(2),G.landCost());const h=Math.round(base*0.5);return [
  {l:`Mua hai mẫu (${FM(h*2)})`,c:()=>G.money()>=h*2,f:c=>{G.landDelta(2);return 'Ruộng công về tay nhà. Quan huyện nhớ ơn.'+fx(c,{money:-h*2,fame:1})}},
  {l:`Mua một mẫu (${FM(h)})`,c:()=>G.money()>=h,f:c=>{G.landDelta(1);return 'Mua một mẫu vừa sức.'+fx(c,{money:-h})}},
  {l:'Không mua',f:c=>'Nhà khác mua hết.'}]}}),
/* ============ Ghen tuông: có tác nhân thật và hệ quả hôn nhân ============ */
E({id:'ghen_tuong',t:'Ghen tuông',age:[18,60],c:c=>G.married(c)&&c.mi>=60,
 x:(c,d)=>{const n=G.tie.ensure(c,{vai:['tinh_dich'],nghe:pick(['đồng nghiệp','khách quen','người bạn cũ']),age:R(22,40),main:'mi',rel:5,why:'bị ghen vì người này'});d.npc=n.id;return `${N(c)} có duyên, người ngoài để ý nhiều, nhất là ${nm(n)}. ${esc(G.spouseOf(c).given)} bắt đầu ghen bóng ghen gió.`},
 o:(c,d)=>{const sp=G.spouseOf(c);const n=T(d);return [
  {l:'Thề thốt chung thủy, thẳng thắn kể mọi chuyện',r:[{eq:1,thanh:0.5},50],y:c=>{G.addStat(sp,'tam',6);G.rg.set('p:'+c.id,'p:'+sp.id,'vo_chong',12,'giải tỏa ghen');return 'Người kia yên lòng, hai vợ chồng gần nhau hơn.'+fx(c,{tam:3,on:1})},n:c=>{G.addStat(sp,'tam',-6);G.rg.set('p:'+c.id,'p:'+sp.id,'vo_chong',-12,'giải thích không xuôi');return 'Càng giải thích càng nghi, cãi nhau mấy ngày.'+fx(c,{tam:-4,on:-2})}},
  {l:'Giữ khoảng cách với người ấy, ít ra ngoài',f:c=>{G.tie.rel(n,-10,'bị tránh mặt');return `Vợ chồng yên ổn, nhưng việc giao thiệp và thu nhập đều bị ảnh hưởng.`+fx(c,{tam:-3,fame:-1,bonus:-0.03})}},
  {l:'Đưa người kia đi cùng, giới thiệu thẳng',r:[{eq:0.9,mi:0.3},42],y:c=>{G.tie.rel(n,12,'thành bạn của cả hai vợ chồng');addVai(n,'ban_than');return `Mọi hiểu lầm tan biến. ${nm(n)} trở thành bạn của cả hai vợ chồng.`+fx(c,{tam:4,eq:2,on:1})},n:c=>{G.rg.set('p:'+c.id,'p:'+sp.id,'vo_chong',-20,'đưa người lạ vào nhà');G.later(c,'v62_ngoai_tinh_lo',R(6,24),{});return `${nm(n)} vẫn lẩn quẩn, ghen càng thêm nghi. Chuyện chưa khép.`+fx(c,{tam:-6,on:-3})}}]}}),
/* ============ Cơ hội làm giàu: thật thì lãi gấp 3 đến 10 lần ============ */
E({id:'ke_lua_dao',t:'Cơ hội làm giàu',tier:[2,6],age:[22,80],
 x:(c,d)=>{const n=G.tie.ensure(c,{vai:['quen'],nghe:'người ăn mặc sang trọng, hay mời góp vốn',age:R(35,55),main:'khau',tier:4,rel:0,why:'mời góp vốn'});d.npc=n.id;d.real=chance(0.3);return `${nm(n)} mời ${N(c)} góp vốn ${pick(['khai mỏ bạc','mua chuyến tàu hồ tiêu','mở hiệu cầm đồ trên kinh'])}, hứa sau một năm lãi gấp ba. Có người nói hắn lừa, có người nói thật.`},
 o:(c,d)=>{const n=T(d);if(!n)return gone();const v=m(60);return [
  {l:`Góp vốn lớn (${FM(v)})`,c:()=>G.money()>=v,r:[{tri:1,eq:0.8},d.real?72:40],y:c=>{const k=pick([3,3,3,4,5,6,8,10]);return `Không ngờ là thật! Lãi gấp ${k} lần vốn.`+fx(c,{money:v*(k-1),tam:8,qh:[n.n,G.tie.rel(n,15,'cùng làm ăn thành công')[1]]})},n:c=>{G.tie.oan(n,8);return `Hắn cao chạy xa bay, mất toàn bộ vốn.`+fx(c,{money:-v,tam:-12,fame:-2,qh:[n.n,G.tie.rel(n,-40,'lừa mất vốn')[1]]})}},
  pay('Góp vốn nhỏ, thử trước',12,{r:[{tri:0.8,eq:0.5},d.real?65:45],y:c=>`Vốn nhỏ nhưng lãi tốt, mối làm ăn mở ra.`+fx(c,{money:m(R(30,60)),tam:4}),n:c=>`Mất khoản nhỏ, nhưng không đau lắm.`+fx(c,{money:-m(12),tam:-3})}),
  pay('Cho người dò la trước',3,{r:[{tri:1},50],y:c=>d.real?`Dò ra hắn là người làm ăn thật, nhà yên tâm góp vốn sau.`+fx(c,{money:-m(3),tri:2,tam:3,qh:[n.n,G.tie.rel(n,5,'được dò xét')[1]]}):`Phát hiện hắn là kẻ lừa có tiếng. Báo quan bắt kịp, người bị hại nhiều nhà biết ơn.`+fx(c,{money:-m(3),tri:2,cfame:3,fame:3,tam:4,qh:[n.n,G.tie.rel(n,-30,'bị vạch mặt')[1]]}),n:c=>'Dò không ra gì, đành thôi.'+fx(c,{money:-m(3)})}),
  {l:'Từ chối',f:c=>'Cẩn tắc vô áy náy.'}]}}),
/* ============ Đạo sĩ xem tướng: lời phán thật, có hậu sự ============ */
E({id:'dao_si_xem_tuong',t:'Đạo sĩ xem tướng',age:[10,90],
 x:(c,d)=>{const n=G.tie.ensure(c,{vai:['cao_nhan'],nghe:'đạo sĩ áo vải ngoài chợ',age:R(50,75),main:'tri',tier:0,rel:0,why:'xem tướng'});d.npc=n.id;return `${nm(n)}, lão đạo sĩ áo vải, chặn ${N(c)} lại, nhìn chằm chằm rồi phán: "Tướng này... có điều muốn nói."`},
 o:(c,d)=>{const n=T(d);if(!n)return gone();return [
  pay('Nghe xem, trả tiền công',1,{f:c=>{const k=pick(['quy','hoa','tai','sk']);if(k==='sk')return `Lão bảo: "Thọ tướng, cần giữ nếp ăn ngủ". Nhờ lời ấy mình biết chăm thân.`+fx(c,{money:-m(1),hpMax:1,suc:3,tam:3});if(k==='quy'){G.tie.later(n,c,'tie_quy_nhan_giup',R(24,60),{});addVai(n,'quy_nhan');return `Lão phán sẽ có quý nhân ở phương Bắc. Mấy năm sau quả có người tìm đến.`+fx(c,{money:-m(1),tam:3,eq:1})}if(k==='hoa'){G.tt.addProph(c,R(18,48),'hoa','của lão đạo sĩ');return `Lão phán một tai họa bất ngờ. Mình ghi lòng.`+fx(c,{money:-m(1),tam:-1,tri:1})}G.tt.addProph(c,R(18,48),'tai','của lão đạo sĩ');return `Lão phán một cơ hội làm ăn. Mình ghi lòng.`+fx(c,{money:-m(1),tam:2})}}),
  {l:'Hỏi ngược lại lão',r:[{tri:1,eq:0.5},55],y:c=>{G.tie.rel(n,10,'được hỏi thẳng');return 'Lão cười lớn, truyền cho một bí quyết dưỡng sinh.'+fx(c,{suc:5,hpMax:3,tam:4,qh:[n.n,10]})},n:c=>'Lão phẩy tay áo bỏ đi.'+fx(c,{tam:-1})},
  {l:'Bỏ đi',f:c=>''}]}}),
/* ============ Truyền nghề cho đời sau: chỉ cho người nhà cùng nghề ============ */
E({id:'dh_44',t:'Truyền nghề cho đời sau',head:0,age:[55,90],c:c=>!['none','huu','noi'].includes(c.job)&&c.m>=80&&G.kinList(c,p=>p.job===c.job||(p.wish&&p.wish===c.job)).length>0,w:0.7,pcd:240,
 x:c=>`${N(c)} làm nghề đã mấy chục năm, tay nghề không ai trong vùng bằng. Trong nhà có người cùng nghề muốn được truyền lại những bí quyết không dạy cho ai cũng được.`,
 o:c=>[
  {l:'Chọn một người nhà cùng nghề để truyền tận tình',go:(c,d)=>G.pickKin(c,{eyebrow:'Truyền nghề',title:'Truyền nghề cho ai',text:'Người được chọn sẽ học thật sự bí quyết của nghề. Thầy giỏi bao nhiêu, người học nhận bấy nhiêu.',filter:p=>p.job===c.job||(p.wish&&p.wish===c.job),cb:w=>{const gain=Math.max(4,Math.round(c.m/12));return `${esc(w.given)} theo ${N(c)} mấy tháng, học được những điều sách vở không có.`+fx(w,{m:gain,tam:5})+fx(c,{tam:5,eq:1,cfame:1})}})},
  {l:'Dạy một phần, giữ lại bí quyết',f:c=>`Người học nắm được cái cơ bản. Nghề vẫn còn bí mật, nhưng cũng chưa ai thật sự kế nghiệp.`+fx(c,{tam:1})},
  {l:'Từ chối, bảo nghề cực lắm',f:c=>`Người nhà đi tìm thầy khác. Nghề nhà có nguy cơ mai một.`+fx(c,{tam:-3,cfame:-1})}]}),
/* ============ Đỡ đần em út: chỉ khi em thật sự khó khăn ============ */
E({id:'gd_anh_giup_em',t:'Đỡ đần em út',k:'Gia đình',age:[18,60],pair:(o,c)=>(o.parents||[]).length&&(c.parents||[]).some(p=>o.parents.includes(p))&&G.age(o)>=12&&G.age(o)<G.age(c)-3&&((o.purse||0)<m(2)||o.job==='none'||o.suc<35),pcd:48,
 x:(c,d)=>{const o=G.P(d.oid);d.npcNone=1;return `${esc(o.given)} gặp khó khăn thật sự: ${(o.suc<35)?'sức yếu, không làm nổi việc':o.job==='none'?'chưa có việc, túi rỗng':'túi rỗng, nợ chồng chất'}. ${esc(o.given)} muốn ${pick(['đi học xa','mở hàng nhỏ','lên kinh tìm việc'])} nhưng không có tiền. ${N(c)} là anh chị cả.`},
 o:(c,d)=>{const o=G.P(d.oid);if(!o)return gone();return [
  pay('Bỏ tiền túi giúp hẳn',5,{f:c=>{G.addStat(o,'tri',2);G.addStat(o,'eq',2);G.rg.set('p:'+c.id,'p:'+o.id,'anh_em',20,'giúp lúc khó');G.rg.set('p:'+o.id,'p:'+c.id,'anh_em',25,'được giúp lúc khó');G.later(c,'tie_ban_nho',R(36,120),{});return `${esc(o.given)} biết ơn suốt đời, siêng năng làm lại. Về sau còn trả ơn.`+fx(c,{money:-m(5),eq:1,on:2})+fx(o,{tam:10,m:2})}}),
  pay('Cho vay có hạn, cùng bàn cách làm',3,{f:c=>{G.rg.set('p:'+c.id,'p:'+o.id,'anh_em',8,'cho vay');return `${esc(o.given)} nhận khoản vay, hẹn trả khi ổn.`+fx(c,{money:-m(3),tam:2})+fx(o,{tam:5})}}),
  {l:'Khuyên em ở nhà, tự lo liệu',f:c=>{G.rg.set('p:'+c.id,'p:'+o.id,'anh_em',-15,'bỏ mặc lúc khó');G.rg.set('p:'+o.id,'p:'+c.id,'anh_em',-20,'bị bỏ mặc lúc khó');return `${esc(o.given)} im lặng, từ đó ít nói chuyện với anh chị. Tình anh em rạn.`+fx(c,{tam:-3,on:-1})+fx(o,{tam:-6})}}]}}),
/* ============ Ông bà dạy cháu: người dạy càng giỏi, cháu học càng nhiều ============ */
E({id:'gd_ong_chau',t:'Ông bà dạy cháu',k:'Gia đình',age:[6,14],pair:(o,c)=>G.age(o)>=55&&(c.parents||[]).some(p=>{const pp=G.P(p);return pp&&(pp.parents||[]).includes(o.id)}),pcd:48,
 x:(c,d)=>{const o=G.P(d.oid);return `${esc(o.given)} gọi ${N(c)} lại, kể chuyện ngày xưa lập nghiệp và dạy cho mấy điều. Người ông bà này giỏi nhất về ${({tri:'chữ nghĩa',vo:'võ nghệ',mi:'ăn nói',eq:'cách ứng xử'})[['tri','vo','mi','eq'].sort((a,b)=>o[b]-o[a])[0]]}.`},
 o:(c,d)=>{const o=G.P(d.oid);if(!o)return gone();const k=['tri','vo','mi','eq'].sort((a,b)=>o[b]-o[a])[0];const gain=Math.max(2,Math.round((o[k]-35)/7));return [
  {l:'Ngồi nghe chăm chú, hỏi lại từng điều',f:c=>{G.rg.set('p:'+c.id,'p:'+o.id,'ruot_thit',8,'chịu học');return `Cháu học được nhiều điều. Người dạy giỏi nên bài học thấm sâu.`+fx(c,{[k]:gain,eq:1,tam:3})+fx(o,{tam:6})}},
  {l:'Lơ đãng chạy đi chơi',f:c=>`Ông bà buồn, cháu mất cơ hội học.`+fx(c,{tam:2})+fx(o,{tam:-3})}]}})
];
});
