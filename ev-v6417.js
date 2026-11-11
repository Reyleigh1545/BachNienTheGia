/* Bách Niên Thế Gia v6.4.1.7 · hoàng đế, thời thế, kế vị, thanh trừng, danh hiệu cấp Thần, thiên mệnh, chiến tranh tại nơi ở
   tt_*: thời thế theo loại vua (kingMonth chọn). tc_*: khủng hoảng kế vị (crMonth gọi lần lượt). qt4_*: thanh trừng khi vua đa nghi.
   th_<danh hiệu>_1/_2: hai bước khảo nghiệm danh hiệu cấp Thần. tm_*: thiên mệnh. ch_*: giặc tới làng. */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const N=c=>esc(c.given);const FM=v=>G.fmtMoney(v);const Q=G.qt;const q=c=>Q.of(c);const V=G.vua;
const cr=()=>{const d=V.d();return d.cr};const NO=[{l:'Cho qua',f:()=>'Mọi chuyện trôi qua.'}];
const crN=s=>{const C=cr();return C?esc(C[s].n):''};
const kt=()=>V.type();const kN=()=>V.TN[kt()];const emp=()=>esc(V.d().emp);
const daughter=()=>G.alive().find(p=>G.inClan(p)&&G.inMain(p)&&p.g==='nữ'&&!p.spouse&&!p.away&&G.age(p)>=14&&G.age(p)<=18);
const manAt=()=>G.alive().filter(p=>G.inClan(p)&&G.inMain(p)&&p.g==='nam'&&!p.away&&G.age(p)>=16&&G.age(p)<=45&&!G.isHead(p)&&!['quan','quan_ngu','nguy'].includes(p.job)).sort((a,b)=>G.age(a)-G.age(b))[0];
const deadTxt=r=>r.dead.length?` ${r.dead.map(p=>esc(p.given)).join(', ')} không qua khỏi.`:' Cả nhà may mắn không ai mất mạng.';
const bestTxt=r=>r.best&&r.best.vo>=60?` ${esc(r.best.given)} cầm đao đứng chắn cổng.`:'';
const L=[];
/* ===================== Thời thế ===================== */
L.push(
{id:'tt_tuyen_tu',t:'Lệnh tuyển tú',k:'Thời thế',fixed:1,
 x:c=>{const g=daughter();return `Triều đình ban lệnh tuyển tú khắp nơi.${g?` ${N(g)} vừa tuổi cập kê, tên đã có trong sổ của quan huyện.`:' Nhà mình không có con gái hợp tuổi, chỉ nghe người làng than khóc.'}`},
 o:c=>{const g=daughter();if(!g)return [{l:'Thở phào',f:()=>'Nhà mình không phải lo.'}];const v=m(15);return [
  {l:`Dâng ${g.given} vào cung`,ax:{tv:1},f:c=>{g.left='vaocung';g.leftT=S().t;G.cf(8,'Có con gái vào cung');return `${N(g)} theo xe hoa vào cung. Sống chết, vinh nhục từ nay ở trong tường thành.`+fx(c,{fame:5,tam:-6})}},
  {l:`Lo lót để được miễn (${FM(v)})`,c:()=>G.money()>=v,vio:'trugian',f:c=>{S().money-=v;return 'Tên con gái được gạch khỏi sổ.'}},
  {l:`Gả vội ${g.given} cho xong`,ax:{rong:-1},f:c=>{const pt=G.tinh.partner(g);G.tinh.marry(g,pt);return `Đám cưới làm trong ba ngày. ${N(g)} về nhà chồng trước khi quan tới.`}},
  {l:'Giấu con đi nơi khác',r:[{tri:0.8,eq:0.6},55],ax:{gan:1},y:c=>'Qua được đợt tuyển.',n:c=>{g.left='vaocung';g.leftT=S().t;return 'Bị phát giác. Con gái vẫn bị đưa đi, nhà còn bị phạt.'+fx(c,{money:-m(8),tam:-10})}}]}},
{id:'tt_xay_cung',t:'Xây cung điện mới',k:'Thời thế',fixed:1,
 x:c=>`Vua ${emp()} cho xây cung điện mới. Mỗi nhà phải góp người đi phu hoặc nộp tiền thay.`,
 o:c=>{const p=manAt();const v=m(10);return [
  {l:`Nộp tiền thay sưu dịch (${FM(v)})`,c:()=>G.money()>=v,f:c=>{S().money-=v;return 'Nộp tiền là xong, khỏi đi phu.'}},
  ...(p?[{l:`Cho ${p.given} đi làm phu`,f:c=>{p.busyUntil=S().t+12;if(chance(0.1)){G.die(p,'chết nơi công trường xây cung');return `${N(p)} không về nữa.`}return `Một năm khiêng đá. ${N(p)} về nhà gầy rộc.`+fx(p,{suc:-15,tam:-10})}}]:[]),
  {l:'Trốn sưu',r:[{tri:0.6,eq:0.6},55],ax:{gan:1},y:c=>'Quan làm ngơ.',n:c=>'Bị bắt, phạt gấp đôi.'+fx(c,{money:-v*2,tam:-6})}]}},
{id:'tt_suu_thue',t:'Sưu cao thuế nặng',k:'Thời thế',fixed:1,
 x:c=>`Quốc khố ${V.d().qk<30?'trống rỗng':'thiếu hụt'}, triều đình tăng thuế. Quan huyện đi thu tận nhà.`,
 o:c=>{const v=Math.max(m(5),Math.round(Math.max(0,G.money())*0.08));return [
  {l:`Nộp đủ (${FM(v)})`,f:c=>{S().money-=v;return 'Nộp xong, thắt lưng buộc bụng.'}},
  {l:'Kêu khó, xin giảm',r:[{eq:1,khau:0.5},55],y:c=>{S().money-=Math.round(v/2);return 'Được giảm một nửa.'},n:c=>{S().money-=v;return 'Quan không nghe.'+fx(c,{tam:-3})}},
  {l:'Cùng cả làng làm đơn phản đối',r:[{eq:0.8,khau:0.8,fame:0.4},62],ax:{gan:2},y:c=>'Quan sợ dân biến, hoãn thu.'+fx(c,{fame:6}),n:c=>{S().money-=Math.round(v*1.5);return 'Người cầm đầu bị đánh trượng, thuế còn bị phạt thêm.'+fx(c,{suc:-12,tam:-8})}}]}},
{id:'tt_dai_xa',t:'Đại xá thiên hạ',k:'Thời thế',fixed:1,
 x:c=>`Vua ${emp()} ban lệnh đại xá thiên hạ. Tù nhân được tha, người bị lưu đày được về, lệnh cấm thi được bỏ.`,
 o:c=>[{l:'Làm lễ tạ ơn',f:c=>{let n=0;G.alive().forEach(p=>{if(G.inClan(p)&&p.away&&p.away.type==='luuday'){p.away=null;n++}if(p.flags&&p.flags.noExam>S().t)p.flags.noExam=S().t});S().noExamClan=0;return n?`${n} người nhà bị đày được trở về.`+fx(c,{tam:8}):'Nhà mình không có ai bị tội, nhưng cũng mừng chung.'}}]},
{id:'tt_an_dien',t:'Khoa thi ân điển',k:'Thời thế',fixed:1,
 x:c=>`Mừng vua mới lên ngôi, triều đình mở một khoa thi ân điển ngoài lệ ba năm.`,
 o:c=>[{l:'Báo cho con cháu chuẩn bị',f:c=>{S().anK={y:Math.floor(S().t/12)};return 'Tháng Tám năm nay có thi Hương, sang năm có thi Hội.'}}]},
{id:'tt_vi_hanh',t:'Khách lạ trong làng',k:'Thời thế',fixed:1,
 x:c=>`Một vị khách phong thái khác thường ghé nhà xin nước, hỏi chuyện làm ăn, chuyện quan lại trong vùng. Người hầu theo ông đi đứng như lính.`,
 o:c=>[{l:'Tiếp đãi tử tế',ax:{rong:1},f:c=>{if(chance(kt()==='minh'?0.6:0.3)){G.cf(10,'Được vua vi hành ghé thăm');G.alive().filter(p=>G.inClan(p)&&p.job==='quan').forEach(p=>Q.add(p,{fav:6}));return 'Mấy tháng sau mới biết vị khách là đương kim hoàng đế. Cả vùng truyền tai nhau.'}return 'Khách cảm tạ rồi đi.'+fx(c,{tam:2})}},
  {l:'Nói thật nỗi khổ của dân',r:[{eq:0.8,gan:0.5},50],ax:{gan:1,thanh:1},y:c=>{V.d().dt=Math.min(100,V.d().dt+2);return 'Khách lặng nghe, gật đầu. Ít lâu sau quan huyện bị cách chức.'+fx(c,{fame:6})},n:c=>'Khách nghe rồi đi, không nói gì.'},
  {l:'Lánh mặt, cho người nhà tiếp',f:c=>'Khách đi rồi cũng chẳng ai nhớ.'}]},
{id:'tt_cau_hien',t:'Chiếu cầu hiền',k:'Thời thế',fixed:1,
 x:c=>`Vua ${emp()} xuống chiếu cầu hiền: ai có tài mà chưa ra làm quan thì được tiến cử.`,
 o:c=>{const p=G.alive().find(p=>G.inClan(p)&&G.inMain(p)&&!p.away&&G.age(p)>=20&&G.age(p)<=55&&p.tri>=75&&!['quan','quan_ngu','nguy','vua'].includes(p.job));return p?[
  {l:`Tiến cử ${p.given}`,ax:{tv:1},f:c=>{const r=G.appoint(p,0);return `${N(p)} được bổ làm ${esc(G.seatName(r.key))}.`+fx(p,{fame:8,tam:8})}},
  {l:'Không tiến cử ai',f:c=>'Giữ con cháu ở nhà.'}]:[{l:'Nhà mình chưa ai đủ tài',f:c=>'Đành để cơ hội trôi qua.'}]}},
{id:'tt_dan_bien',t:'Dân biến',k:'Thời thế',fixed:1,
 x:c=>`Đói kém, quan tham. Dân mấy huyện quanh vùng nổi lên, kéo nhau đi phá kho lương.`,
 o:c=>{const v=m(12);return [
  {l:`Mở kho phát chẩn (${FM(v)})`,c:()=>G.money()>=v,ax:{rong:2},f:c=>{S().money-=v;return 'Dân đi qua làng mình mà không phá nhà nào.'+fx(c,{cfame:8})}},
  {l:`Góp lương cho quan quân (${FM(v)})`,c:()=>G.money()>=v,f:c=>{S().money-=v;G.alive().filter(p=>G.inClan(p)&&p.job==='quan').forEach(p=>Q.add(p,{fav:4}));return 'Quan quân dẹp được loạn, nhớ công nhà mình.'+fx(c,{fame:3})}},
  {l:'Đóng cửa giữ nhà',ax:{gan:1},f:c=>{if(chance(0.4)){const r=G.ch.raid(1);return 'Dân loạn tràn vào làng.'+bestTxt(r)+deadTxt(r)}return 'Dân loạn đi qua, may mà không ghé.'}}]}}
);
/* ===================== Khủng hoảng kế vị ===================== */
const crSide=(c,s)=>{const C=cr();if(!C)return '';C.ours=s;if(s!=='n'&&c.job==='quan')Q.join(c,C[s].f);return ''};
L.push(
{id:'tc_vua_benh',t:'Hoàng đế lâm bệnh',k:'Tranh ngôi',fixed:1,
 x:c=>{const C=cr();return C?`Vua ${emp()} lâm bệnh nặng mà chưa lập thái tử. ${crN('a')} được các đại thần thuộc Hoàng đảng ủng hộ. ${crN('b')} được phe Quyền thần nâng đỡ. Ai cũng biết rồi sẽ phải chọn.`:''},
 o:c=>cr()?[{l:`Ngả về ${cr().a.n}`,ax:{ht:1},f:c=>crSide(c,'a')+'Nhà mình lặng lẽ gửi lời tới phủ hoàng tử.'},{l:`Ngả về ${cr().b.n}`,ax:{tv:1},f:c=>crSide(c,'b')+'Nhà mình lặng lẽ gửi lời tới phủ thân vương.'},{l:'Giữ trung lập',ax:{diem:1},f:c=>crSide(c,'n')+'Không theo ai, đứng ngoài nhìn.'}]:NO},
{id:'tc_loi_keo',t:'Bị lôi kéo',k:'Tranh ngôi',fixed:1,
 x:c=>{const C=cr();if(!C)return '';const o=C.ours==='a'?'b':C.ours==='b'?'a':pick(['a','b']);return `Người của ${crN(o)} mang lễ hậu tới, hứa hẹn chức tước nếu nhà mình đổi ý.`},
 o:c=>{const C=cr();if(!C)return NO;const o=C.ours==='a'?'b':C.ours==='b'?'a':pick(['a','b']);return [
  {l:'Nhận vàng, đổi phe',vio:'trugian',ax:{thanh:-2,tv:1},f:c=>{crSide(c,o);C[o].pow+=5;return 'Nhà mình đổi phe.'+fx(c,{money:m(20),cor:6})}},
  {l:'Trả lễ, giữ lòng như cũ',ax:{thanh:1,ht:1},f:c=>'Người kia ra về, mặt khó đăm đăm.'+fx(c,{fame:2})}]}},
{id:'tc_chieu_binh',t:'Thân vương chiêu binh',k:'Tranh ngôi',fixed:1,
 x:c=>`Có tin ${crN('b')} bí mật chiêu binh mãi mã ở đất phong.`,
 o:c=>{const C=cr();if(!C)return NO;const v=m(30);return C.ours==='b'?[
  {l:`Góp tiền nuôi quân (${FM(v)})`,c:()=>G.money()>=v,ax:{tv:1},f:c=>{S().money-=v;C.b.pow+=8;C.act++;return 'Thân vương ghi nhớ nhà mình.'}},
  {l:'Chỉ góp lời, không góp tiền',f:c=>'Giữ một chân ngoài cuộc.'}]:[
  {l:'Tâu lên vua',ax:{gan:1,ht:1},f:c=>{C.b.pow-=10;if(C.ours==='a')C.act++;G.alive().filter(p=>G.inClan(p)&&p.job==='quan').forEach(p=>Q.add(p,{fav:4}));return 'Vua giận, sai người tra xét đất phong.'}},
  {l:'Làm ngơ',ax:{diem:1},f:c=>'Chuyện của nhà trời, nhà mình không dính vào.'}]}},
{id:'tc_lam_chung',t:'Làm chứng cho một hoàng tử',k:'Tranh ngôi',fixed:1,
 x:c=>`Trong triều đang tra một vụ có dính tới ${crN('a')}. Cả hai phe đều muốn ${N(c)} đứng ra làm chứng.`,
 o:c=>{const C=cr();if(!C)return NO;return [
  {l:`Làm chứng có lợi cho ${C.a.n}`,ax:{ht:1},f:c=>{C.a.pow+=6;if(C.ours==='a')C.act++;else C.ours=C.ours==='n'?'a':C.ours;return 'Lời chứng làm vụ án lắng xuống.'+fx(c,{cor:2})}},
  {l:`Làm chứng có lợi cho ${C.b.n}`,ax:{tv:1},f:c=>{C.a.pow-=6;C.b.pow+=4;if(C.ours==='b')C.act++;else C.ours=C.ours==='n'?'b':C.ours;return 'Lời chứng làm hoàng tử lao đao.'+fx(c,{cor:2})}},
  {l:'Cáo bệnh, không ra làm chứng',ax:{diem:1},f:c=>'Cả hai phe đều không vui.'}]}},
{id:'tc_phe_lap',t:'Lời bàn phế lập',k:'Tranh ngôi',fixed:1,
 x:c=>`Một đại thần dâng sớ: ${crN('a')} không đủ đức, xin lập ${crN('b')}. Cả triều nín thở chờ các quan lên tiếng.`,
 o:c=>{const C=cr();if(!C)return NO;return [
  {l:'Ủng hộ lời bàn',ax:{tv:1},f:c=>{C.b.pow+=8;if(C.ours==='b')C.act++;return 'Thêm một chữ ký vào tờ sớ.'}},
  {l:'Phản đối',ax:{ht:1,gan:1},f:c=>{C.a.pow+=8;if(C.ours==='a')C.act++;return 'Lời phản đối vang giữa triều.'}},
  {l:'Đứng ra hòa giải hai bên',r:[{eq:1,tri:0.8,fame:0.3},78],ax:{rong:1,diem:1},y:c=>{const d=V.d();d.heir={set:true,n:C.a.n.replace(/^Hoàng tử /,''),age:R(18,30)};d.cr=null;Q.log('Hòa giải tranh ngôi',`${G.nameOf(c)} đứng ra hòa giải, ${C.a.n} được lập làm thái tử, ${C.b.n} được giữ đất phong.`);return 'Hai bên chịu nhường. Vua lập thái tử, thân vương giữ đất phong. Một cuộc đổ máu được tránh.'+fx(c,{fame:25,cfame:15,fav:15})},n:c=>'Lời hòa giải rơi vào khoảng không. Cả hai phe đều nghi mình.'+fx(c,{risk:10})}]}},
{id:'tc_danh_trao',t:'Chiếu thư bị đánh tráo',k:'Tranh ngôi',fixed:1,
 x:c=>`${N(c)} biết được một chuyện động trời: chiếu thư lập người nối ngôi đã bị người của ${crN('b')} đánh tráo.`,
 o:c=>{const C=cr();if(!C)return NO;return [
  {l:'Vạch trần',r:[{tri:1,gan:0.6},65],ax:{gan:2,thanh:1},y:c=>{C.b.pow-=25;if(C.ours==='a')C.act++;return 'Chiếu thư thật được tìm ra. Phe thân vương lao đao.'+fx(c,{fame:10})},n:c=>{C.act++;return 'Không đủ chứng cứ, lại bị phe kia để ý.'+fx(c,{risk:30})}},
  {l:'Im lặng',ax:{gan:-1},f:c=>'Biết mà như không biết.'},
  {l:'Giúp giấu chiếu thư thật',ax:{thanh:-2},f:c=>{C.b.pow+=15;if(C.ours!=='b')C.ours='b';C.act+=2;Q.add(c,{crime:4,cor:15});return 'Tay đã nhúng chàm.'}}]}},
{id:'tc_gioi_nghiem',t:'Kinh thành giới nghiêm',k:'Tranh ngôi',fixed:1,
 x:c=>`Kinh thành đóng chặt cổng. Quân lính hai phe đứng gườm nhau trước cửa cung. Ai cũng biết chỉ trong vài ngày sẽ có người lên ngôi.`,
 o:c=>{const C=cr();if(!C)return NO;const gen=G.alive().find(p=>G.inClan(p)&&p.job==='quan_ngu'&&p.lv>=5);return [
  {l:'Đưa con cháu rời kinh trong đêm',ax:{diem:1},f:c=>{C.safe=1;return 'Con cháu được đưa về quê. Có chuyện gì thì nhà mình vẫn còn người.'}},
  ...(gen&&C.ours!=='n'?[{l:`Để ${gen.given} đem quân giữ cửa cung cho ${C[C.ours].n}`,ax:{gan:2},f:c=>{C[C.ours].pow+=30;C.act+=2;return 'Cửa cung nằm trong tay người nhà mình.'}}]:[]),
  {l:'Đóng cửa chờ thời',f:c=>'Nhà mình đóng cửa, đợi xem trời đổi.'}]}}
);
/* ===================== Thanh trừng khi vua đa nghi ===================== */
L.push(
{id:'qt4_trieu_kien',t:'Hoàng đế bí mật triệu kiến',k:'Quan trường',fixed:1,
 x:c=>`Nửa đêm, thái giám đến gọi ${N(c)} vào cung. Vua ${emp()} hỏi thẳng: trong triều ai là bè đảng của ai.`,
 o:c=>[{l:'Thề một lòng trung với bệ hạ',ax:{ht:1},f:c=>fx(c,{fav:8,risk:q(c).f?5:-5})+' Vua nhìn rất lâu rồi cho lui.'},
  ...(q(c).f?[{l:'Tâu thật chuyện trong phe mình',ax:{thanh:1,ht:-1},f:c=>{const k=q(c).f;Q.join(c,null);Q.court().f[k].pow-=8;return 'Vua gật đầu. Từ nay mình là người của vua.'+fx(c,{fav:15,risk:-15,fame:-4})}}]:[]),
  {l:'Xin cáo quan về quê',ax:{diem:1},f:c=>{Q.dismiss(c,'tự xin cáo quan');c.flags.noOffice=0;return 'Vua chuẩn. Ra khỏi cửa cung mới thấy lưng ướt đẫm.'}}]},
{id:'qt4_mat_chi',t:'Mật chỉ tra xét đại thần',k:'Quan trường',fixed:1,
 x:(c,d)=>`Vua trao cho ${N(c)} một mật chỉ: tra xét một đại thần phe ${Q.facN(d.f||'quyen')}.`,
 o:(c,d)=>{const k=d.f||'quyen';return [
  {l:'Điều tra thật kỹ',r:[{tri:1,muu:0.6},60],ax:{gan:1},y:c=>{Q.court().f[k].pow-=10;c.cong=(c.cong||0)+30;G.tuocCheck(c,'tra án theo mật chỉ');return 'Tra ra đủ chứng cứ. Vua ghi công.'+G.tuocNote()+fx(c,{fav:15})},n:c=>'Không tra ra gì, vua không vui.'+fx(c,{fav:-5,risk:10})},
  {l:'Làm qua loa cho xong',f:c=>fx(c,{fav:-5})+' Tờ tấu sơ sài.'},
  {l:'Báo tin cho người bị tra',ax:{thanh:-1,rong:1},f:c=>{if(chance(0.35)){Q.add(c,{crime:4});return 'Bị phát giác. Vua coi là đồng đảng.'+fx(c,{risk:30})}return 'Người kia kịp thu dọn dấu vết.'+fx(c,{loy:q(c).f===k?15:0})}}]}},
{id:'qt4_tu_sat_nguc',t:'Một vị quan tự sát trong ngục',k:'Quan trường',fixed:1,
 x:c=>`Một vị quan bị bắt trong đợt thanh trừng đã tự sát trong ngục. Trước khi chết ông nhờ người gửi một bức thư cho ${N(c)}.`,
 o:c=>[{l:'Nhận giữ bức thư',ax:{gan:1},f:c=>{q(c).ev=(q(c).ev||0)+1;return 'Trong thư là danh sách những kẻ đứng sau.'+fx(c,{risk:8})}},
  {l:'Đến viếng',ax:{rong:1},f:c=>'Đồng liêu nhìn mình bằng con mắt khác.'+fx(c,{fame:4,risk:5})},
  {l:'Tránh xa',ax:{gan:-1},f:c=>'Không dính tới.'}]},
{id:'qt4_danh_sach_bi_thu',t:'Danh sách môn sinh bị thu giữ',k:'Quan trường',fixed:1,
 x:(c,d)=>`Phủ của người đứng đầu phe ${Q.facN(d.f||q(c).f||'quyen')} bị khám. Danh sách môn sinh bị thu, trong đó có tên ${N(c)}.`,
 o:c=>{const v=m(25);return [{l:'Chủ động tự thú trước',ax:{thanh:1},f:c=>Q.sentence(c,1,'là môn sinh phe bị thanh trừng')},
  {l:'Đốt hết thư từ cũ',ax:{muu:1},f:c=>{if(chance(0.4))return 'Lửa chưa tắt thì lính đã tới.'+fx(c,{risk:20,cor:3});return 'Không còn dấu vết.'+fx(c,{risk:-5})}},
  {l:`Nhờ người xóa tên (${FM(v)})`,c:()=>G.money()>=v,vio:'trugian',f:c=>{S().money-=v;if(chance(0.6))return 'Tên mình biến khỏi danh sách.'+fx(c,{risk:-15,cor:6});return 'Người nhận tiền bị bắt, khai cả mình ra.'+fx(c,{risk:25,cor:10})}}]}},
{id:'qt4_dong_minh_quay',t:'Đồng minh cũ quay lưng',k:'Quan trường',fixed:1,
 x:c=>`Một người từng thân với ${N(c)} trong phe nay ra làm chứng, khai những chuyện cũ để tự cứu mình.`,
 o:c=>[{l:'Phản tố hắn vu khống',r:[{eq:0.8,tri:0.8},60],ax:{gan:1},y:c=>'Lời khai của hắn bị bác.'+fx(c,{risk:-10}),n:c=>'Phản tố không thành.'+fx(c,{risk:15})},
  {l:'Im lặng chịu trận',ax:{diem:1},f:c=>fx(c,{risk:15})+' Không nói gì thì không sai gì.'},
  {l:'Khai lại chuyện của hắn',ax:{thanh:-1},f:c=>'Hai bên cùng chìm.'+fx(c,{risk:5,fame:-6})}]},
{id:'qt4_goi_doi_chat',t:'Bị gọi lên đối chất',k:'Quan trường',fixed:1,
 x:c=>`Công văn gọi ${N(c)} lên đối chất trong vụ thanh trừng.`,
 o:c=>[{l:'Đối chất thẳng thắn',r:[{tri:0.8,eq:0.8},55],ax:{gan:1,thanh:1},y:c=>'Lời lẽ rõ ràng, được cho về.'+fx(c,{risk:-15}),n:c=>'Bị vặn vẹo đến cứng họng.'+fx(c,{risk:15})},
  {l:'Khai ra người khác',ax:{thanh:-1,rong:-1},f:c=>'Được cho về sớm. Người bị khai thì không.'+fx(c,{risk:-20,fame:-8})},
  {l:'Cáo bệnh không đến',f:c=>fx(c,{risk:10})+' Càng trốn càng bị nghi.'}]},
{id:'qt4_giao_binh_quyen',t:'Lệnh giao nộp binh quyền',k:'Quân ngũ',job:['quan_ngu'],cd:120,c:c=>c.lv>=5&&V.d().k.nghi>=55,
 x:c=>`Vua ${emp()} sai sứ đến doanh trại: ${N(c)} phải giao binh quyền, về kinh nhận chức nhàn.`,
 o:c=>[{l:'Giao nộp binh quyền',ax:{ht:1},f:c=>fx(c,{lv:-1,fame:3,fav:20})+' Vua yên tâm.'},
  {l:'Xin giữ thêm ít lâu vì biên ải chưa yên',r:[{eq:1,tri:0.6},60],y:c=>'Vua tạm chuẩn.'+fx(c,{fav:-5}),n:c=>'Vua nghi ngờ.'+fx(c,{fav:-15,risk:20})},
  {l:'Kháng lệnh, giữ quân',ax:{gan:2,ht:-2},f:c=>{Q.add(c,{crime:5});return 'Cả triều chấn động. '+Q.sentence(c,5,'kháng lệnh giao binh quyền')}}]},
{id:'qt4_than_vuong_nghi',t:'Thân vương bị nghi mưu phản',k:'Quan trường',job:['quan'],cd:180,w:0.4,c:c=>c.lv>=4&&V.d().k.nghi>=50,
 x:c=>`Một vị thân vương từng mời ${N(c)} dự tiệc nay bị nghi mưu phản. Ai từng qua lại đều bị để ý.`,
 o:c=>[{l:'Cắt đứt mọi liên hệ',ax:{diem:1},f:c=>fx(c,{risk:-5})+' Thư từ cũ được đốt sạch.'},
  {l:'Dâng sớ bênh vực thân vương',ax:{gan:2,rong:1},f:c=>'Cả triều nể khí phách, vua thì không vui.'+fx(c,{fame:6,risk:20})},
  {l:'Tố giác những gì mình biết',ax:{thanh:-1},f:c=>'Vua khen biết điều.'+fx(c,{fav:10,fame:-5})}]},
{id:'qt4_to_giac_tu_cuu',t:'Cơ hội tự cứu',k:'Quan trường',job:['quan'],cd:120,c:c=>q(c).st>=2,
 x:c=>`Đang bị đàn hặc, ${N(c)} được người của ngự sử ngầm gợi ý: tố giác thêm vài người thì tội của mình sẽ được bỏ qua.`,
 o:c=>[{l:'Tố giác người khác để tự cứu',ax:{thanh:-1,rong:-2},f:c=>{q(c).st=1;return 'Tên mấy đồng liêu được đưa lên. Mình thoát, họ thì không.'+fx(c,{risk:-30,fame:-10})}},
  {l:'Không làm chuyện đó',ax:{thanh:1},f:c=>'Thà chịu tội còn hơn hại người.'+fx(c,{fame:3})}]},
{id:'qt4_ngu_su_to',t:'Ngự sử tố bè đảng',k:'Quan trường',job:['quan'],cd:120,c:c=>!!q(c).f&&V.d().k.nghi>=55,
 x:c=>`Ngự sử dâng sớ tố ${N(c)} là vây cánh của phe ${Q.facN(q(c).f)}. Vua đa nghi đọc rất kỹ.`,
 o:c=>[{l:'Cắt đứt với phe',f:c=>{Q.join(c,null);return 'Rút khỏi phe giữa lúc gió đổi chiều.'+fx(c,{risk:-10})}},
  {l:'Dâng sớ tự biện',r:[{tri:1,eq:0.6},58],y:c=>'Vua tạm tin.'+fx(c,{risk:-5}),n:c=>'Sớ tự biện bị gạt.'+fx(c,{risk:15})},
  {l:'Nhờ phe che chở',f:c=>{const F=Q.court().f[q(c).f];if(chance(F.pow/120))return 'Phe ra tay, tờ sớ chìm.'+fx(c,{loy:8});return 'Phe cũng đang lo thân.'+fx(c,{risk:12})}}]}
);
/* ===================== Khảo nghiệm danh hiệu cấp Thần ===================== */
const KN={
  thany:[['Dịch lạ ở phủ bên','Một trận dịch lạ bùng lên ở phủ bên, các thầy thuốc đều bó tay.',['Vào tận ổ dịch tìm phương thuốc',{tri:1,m:0.5}],['Lục lại y thư cổ',{tri:1,ky:0.4}]],
         ['Bệnh nhân của Thái y viện','Thái y viện gửi tới một ca bệnh mười năm không ai chữa được, như một lời thách.',['Châm cứu theo cách của riêng mình',{tri:0.8,ky:0.8}],['Bốc một thang thuốc chưa ai dám dùng',{tri:1,gan:0.4}]]],
  vothan:[['Thách đấu của võ lâm','Các cao thủ võ lâm tề tựu, muốn biết người được đồn là vô địch có thật như lời đồn.',['Lần lượt nhận lời thách đấu',{vo:1,suc:0.4}],['Chỉ đấu một trận với người mạnh nhất',{vo:1,gan:0.5}]],
          ['Giặc cướp trên núi','Một ổ giặc cướp trên núi mà quan quân ba lần không dẹp nổi.',['Một mình lên núi',{vo:1,gan:0.6}],['Dẫn môn đồ vây núi',{vo:0.8,tri:0.6}]]],
  thanhnhan:[['Đại hội luận đạo','Danh nho bốn phương hội về luận đạo, chờ nghe người được đồn là thánh nhân nói gì.',['Giảng về đạo trị nước',{tri:1,eq:0.4}],['Lắng nghe rồi mới nói',{tri:1,diem:0.5}]],
             ['Học trò khắp thiên hạ','Học trò ở xa ngàn dặm tìm đến xin học, có cả kẻ tội đồ muốn hoàn lương.',['Nhận dạy tất cả',{tri:0.8,eq:0.8}],['Khảo từng người rồi mới nhận',{tri:1,muu:0.4}]]],
  thuongthanh:[['Cơn khủng hoảng giá lúa','Giá lúa cả vùng nhảy vọt, thương nhân nào cũng găm hàng.',['Bán lúa giá gốc giữ chợ',{eq:1,tri:0.5}],['Gom các nhà buôn bàn chung một giá',{eq:1,khau:0.6}]],
               ['Đại thương hội ngoại quốc','Một đại thương hội ngoại quốc muốn đè các nhà buôn trong nước.',['Đối đầu bằng giá',{eq:0.8,tri:0.8}],['Liên kết cả nước làm một',{eq:1,ql:0.5}]]],
  camthanh:[['Khúc nhạc trong cung','Cung đình mời vào tấu một khúc trước mặt hoàng đế.',['Tấu khúc đã thành danh',{mi:1,m:0.5}],['Tấu khúc mới soạn',{mi:1,tri:0.4}]],
            ['Kỳ phùng địch thủ','Một danh cầm phương xa đến thách tài.',['Đàn trước',{mi:1,gan:0.4}],['Nghe người ta đàn rồi mới đáp',{mi:1,diem:0.5}]]],
  detieu:[['Chuyến tiêu qua Hắc Phong lĩnh','Một chuyến tiêu vàng phải qua Hắc Phong lĩnh, nơi chưa đoàn tiêu nào qua lọt.',['Cắm cờ tiêu đi thẳng',{vo:1,gan:0.6}],['Đi đường vòng ban đêm',{vo:0.8,tri:0.6}]],
          ['Thủ lĩnh lục lâm','Thủ lĩnh lục lâm cả vùng hẹn gặp, muốn biết có nên nể cờ tiêu nhà này.',['Uống rượu kết giao',{eq:0.8,vo:0.6}],['Tỉ thí một trận',{vo:1,suc:0.4}]]],
  thannong:[['Hạn hán ba năm','Trời hạn ba năm, cả vùng mất mùa.',['Tìm giống lúa chịu hạn',{suc:0.6,tri:0.8}],['Dẫn dân đào mương dẫn nước',{suc:1,eq:0.4}]],
            ['Nạn sâu bệnh','Sâu bệnh lan khắp các cánh đồng.',['Thử cách diệt sâu của người xưa',{tri:0.8,suc:0.6}],['Đốt đồng làm lại từ đầu',{suc:1,gan:0.4}]]],
  thantuong:[['Đúc chuông chùa lớn','Triều đình cần đúc một quả chuông lớn chưa từng có.',['Tự tay đứng lò',{vo:0.8,ky:0.8}],['Tính toán từng chi tiết',{tri:0.6,ky:1}]],
             ['Thanh kiếm cho đại tướng','Đại tướng quân đặt một thanh kiếm chém sắt như chém bùn.',['Rèn theo phép cổ',{ky:1,vo:0.5}],['Thử một cách tôi thép mới',{ky:1,tri:0.5}]]],
  giamchinh:[['Nhật thực','Khâm thiên giám phải tâu trước ngày nhật thực, sai một khắc là mang tội.',['Tính theo phép cũ',{tri:1,cc:0.4}],['Tính theo phép mình tự lập',{tri:1,gan:0.3}]],
             ['Lịch mới cho cả nước','Triều đình cần soạn lại lịch cho cả nước.',['Soạn lịch một mình',{tri:1,diem:0.4}],['Mời các thầy giỏi cùng soạn',{tri:0.8,eq:0.6}]]]};
Object.keys(KN).forEach(id=>{const T=G.than.T[id];const st=Object.keys(T.st)[0];const df=Math.round(T.st[st]*0.8);
  KN[id].forEach(([t,x,a,b],i)=>{const nx=i===0;
    L.push({id:`th_${id}_${i+1}`,t:`${T.n}: ${t}`,k:'Danh hiệu',fixed:1,
      x:c=>`${x} Người đời đang nhìn xem ${N(c)} có xứng với danh xưng ${T.n.toLowerCase()} hay không.`,
      o:c=>[a,b].map(([l,sp])=>({l,r:[sp,df],y:c=>{if(nx){G.later(c,`th_${id}_2`,R(2,6));return 'Qua được khảo nghiệm đầu. Tiếng đồn lan xa hơn.'+fx(c,{fame:15})}
        G.than.grant(c,id);return `Thiên hạ tôn ${N(c)} là <b>${T.n}</b>.`+fx(c,{tam:15})},
        n:c=>{G.than.fail(c,id);return 'Không qua được. Năm năm nữa may ra mới có dịp khác.'+fx(c,{fame:-10,tam:-10})}}))})})});
/* khảo nghiệm mở đầu do nhịp năm gọi: chuyển tới bước 1 của đúng danh hiệu */
L.push({id:'th_kn1',t:'Tiếng đồn về một bậc kỳ tài',k:'Danh hiệu',fixed:1,
 x:(c,d)=>`Người ta bắt đầu gọi ${N(c)} là ${esc(G.than.T[d.id].n.toLowerCase())} của thời này. Nhưng danh xưng ấy chỉ đến với người qua được khảo nghiệm.`,
 o:(c,d)=>[{l:'Nhận lời khảo nghiệm',ax:{gan:1},f:c=>{G.later(c,`th_${d.id}_1`,R(1,3));return 'Chờ ngày khảo nghiệm.'}},{l:'Khiêm nhường từ chối',ax:{diem:1},f:c=>{G.than.fail(c,d.id);return 'Hư danh không màng.'+fx(c,{fame:3})}}]});
/* ===================== Thiên mệnh ===================== */
L.push(
{id:'tm_thuc_tinh',t:'Đứa trẻ khác thường',k:'Thiên mệnh',fixed:1,
 x:c=>{const T=G.than.tm(c);return `${N(c)} lên mười hai, người trong họ ai cũng thấy đứa trẻ này khác thường. Có người bảo đó là ${T?esc(T.n.toLowerCase()):'thiên mệnh'}.`},
 o:c=>[{l:'Dạy dỗ thật nghiêm',ax:{yc:1,cc:1},f:c=>'Đứa trẻ được dạy dỗ từng chút.'+fx(c,{tri:2,vo:1})},{l:'Giấu kín, không để người ngoài biết',ax:{diem:1},f:c=>'Nhà mình giữ kín như bưng.'}]},
{id:'tm_kiep_nan',t:'Kiếp nạn',k:'Thiên mệnh',fixed:1,
 x:c=>{const T=G.than.tm(c);const dv=T&&T.tm==='devuong';return dv?`Có lời đồn đến tai quan phủ: nhà này có đứa mang tướng đế vương. Người lạ bắt đầu lảng vảng quanh nhà ${N(c)}.`:`${pick(['Kẻ ghen ghét tài năng','Một cơn bạo bệnh lạ','Một tai nạn khó hiểu'])} rình rập ${N(c)}. Người mang thiên mệnh thường lắm kiếp nạn.`},
 o:c=>{const T=G.than.tm(c);const dv=T&&T.tm==='devuong';return dv?[
  {l:'Giấu kín, cho đi nơi khác một thời gian',r:[{tri:0.8,eq:0.6},55],ax:{diem:1},y:c=>{c.busyUntil=S().t+12;return 'Lời đồn lắng xuống.'},n:c=>'Quan phủ cho người đến tra hỏi.'+fx(c,{tam:-10,fame:-5})},
  {l:'Mặc kệ lời đồn',ax:{gan:1},f:c=>{if(chance(0.3))return 'Có kẻ thích khách đêm đến.'+fx(c,{suc:-30,lethal:1});return 'Lời đồn rồi cũng qua.'}}]:[
  {l:'Cẩn thận đề phòng',r:[{tri:0.6,eq:0.6,duyen:0.5},55],ax:{diem:1},y:c=>'Qua được kiếp nạn.'+fx(c,{tam:3}),n:c=>'Kiếp nạn ập tới.'+fx(c,{suc:-R(15,30),tam:-10})},
  {l:'Đối mặt',r:[{vo:0.6,suc:0.6,gan:0.5},58],ax:{gan:1},y:c=>'Vượt qua, người cứng cỏi hơn.'+fx(c,{suc:2,fame:4}),n:c=>'Suýt mất mạng.'+fx(c,{suc:-R(25,40),lethal:1})}]}}
);
/* ===================== Chiến tranh tại nơi ở ===================== */
L.push(
{id:'ch_giac_den',t:'Giặc tràn qua làng',k:'Binh lửa',fixed:1,
 x:c=>`Giặc tràn qua làng. Lửa cháy rực một góc trời, tiếng kêu khóc khắp nơi.`,
 o:c=>{const v=m(20);return [
  {l:'Cả nhà chạy vào rừng lánh nạn',ax:{diem:1},f:c=>{S().money-=Math.round(Math.max(0,G.money())*0.1);const r=G.ch.raid(1);return 'Bỏ lại nhà cửa, cả nhà chạy vào rừng.'+deadTxt(r)}},
  {l:'Đóng cổng cố thủ',ax:{gan:1},f:c=>{const r=G.ch.raid(2);return 'Cổng đóng then cài, người nhà cầm gậy gộc giữ cổng.'+bestTxt(r)+deadTxt(r)}},
  {l:`Nộp tiền mua bình an (${FM(v)})`,c:()=>G.money()>=v,f:c=>{S().money-=v;if(chance(0.8))return 'Giặc nhận tiền, đi qua.';const r=G.ch.raid(1);return 'Giặc nhận tiền rồi vẫn phá.'+deadTxt(r)}},
  {l:'Đem người nhà ra đánh',r:[{vo:1,gan:0.6},65],ax:{gan:2},y:c=>'Giặc bị đánh lui, cả làng nhờ nhà mình.'+fx(c,{cfame:6,fame:8}),n:c=>{const r=G.ch.raid(3);return 'Thua trận, giặc trả thù.'+deadTxt(r)}}]}},
{id:'ch_cuop_luong',t:'Quân cướp lương',k:'Binh lửa',fixed:1,
 x:c=>`Một toán quân không rõ của phe nào đến cướp lương trong làng.`,
 o:c=>[{l:'Giấu lương xuống hầm',r:[{tri:1},50],ax:{muu:1},y:c=>'Lương được giữ.',n:c=>{const K=G.kho();for(const k in K)K[k]=Math.round(K[k]*0.4);return 'Bị phát hiện, mất phần lớn lương trong kho.'+fx(c,{tam:-6})}},
  {l:'Nộp một phần cho yên',f:c=>{const K=G.kho();for(const k in K)K[k]=Math.round(K[k]*0.7);return 'Nộp ba phần lương.'}},
  {l:'Chống lại',ax:{gan:1},f:c=>{const r=G.ch.raid(1);return 'Hai bên xô xát.'+bestTxt(r)+deadTxt(r)}}]},
{id:'ch_lang_chay',t:'Làng bị đốt',k:'Binh lửa',fixed:1,
 x:c=>`Đêm qua giặc đốt làng. Nhà mình cũng bị lửa bén.`,
 o:c=>{const H=S().hh[G.mainHH()];const v=m(15);return [{l:`Dựng lại ngay (${FM(v)})`,c:()=>G.money()>=v,f:c=>{S().money-=v;return 'Nhà được sửa lại.'}},{l:'Ở tạm chỗ còn lại',f:c=>{if(H&&H.home>0){H.home--;return 'Nhà thấp đi một bậc.'+fx(c,{tam:-8})}return 'Nhà vốn đã lụp xụp.'}}]}},
{id:'ch_bat_phu',t:'Bắt phu ra trận',k:'Binh lửa',fixed:1,
 x:c=>{const p=manAt();return p?`Quan quân đến bắt phu. ${N(p)} có tên trong sổ.`:'Quan quân đi bắt phu trong làng, nhà mình không có ai hợp tuổi.'},
 o:c=>{const p=manAt();if(!p)return [{l:'Thở phào',f:()=>''}];const v=m(12);return [
  {l:`Để ${p.given} đi`,f:c=>{G.setJob(p,'quan_ngu');p.merit=0;p.enlistT=S().t;p.away={type:'army'};return `${N(p)} khoác áo lính lên đường.`+fx(p,{tam:-10})}},
  {l:`Nộp tiền chuộc (${FM(v)})`,c:()=>G.money()>=v,f:c=>{S().money-=v;return 'Tên được gạch khỏi sổ.'}},
  {l:'Cho trốn đi',r:[{tri:0.6,eq:0.6},55],ax:{gan:1},y:c=>'Trốn thoát.',n:c=>{G.setJob(p,'quan_ngu');p.merit=0;p.enlistT=S().t;p.away={type:'army'};return 'Bị bắt lại, còn bị đánh.'+fx(p,{suc:-10})}}]}},
{id:'ch_cuu_nguoi',t:'Cứu người giữa binh lửa',k:'Binh lửa',fixed:1,
 x:c=>{const p=G.alive().filter(p=>G.inClan(p)&&G.inMain(p)&&!p.away&&G.age(p)>=16&&G.age(p)<60).sort((a,b)=>b.vo-a.vo)[0];return `Hàng xóm kêu cứu, giặc đang lùng sục nhà bên.${p?` ${N(p)} là người võ giỏi nhất nhà.`:''}`},
 o:c=>{const p=G.alive().filter(p=>G.inClan(p)&&G.inMain(p)&&!p.away&&G.age(p)>=16&&G.age(p)<60).sort((a,b)=>b.vo-a.vo)[0];return p?[
  {l:`Để ${p.given} ra tay`,r:[{vo:1,gan:0.5},60],ax:{gan:2,rong:1},y:c=>'Cứu được cả nhà hàng xóm.'+fx(p,{fame:10})+fx(c,{cfame:4}),n:c=>'Cứu được người, mình bị thương nặng.'+fx(p,{suc:-30,lethal:1})},
  {l:'Đóng cửa, lo cho nhà mình',ax:{rong:-1},f:c=>'Tiếng kêu cứu tắt dần.'+fx(c,{tam:-6})}]:[{l:'Đóng cửa',f:()=>''}]}},
{id:'ch_tan_quan',t:'Tàn quân ghé làng',k:'Binh lửa',fixed:1,
 x:c=>`Một toán tàn quân thua trận dạt về, xin ăn.`,
 o:c=>{const v=m(3);return [{l:`Cho ăn (${FM(v)})`,c:()=>G.money()>=v,ax:{rong:1},f:c=>{S().money-=v;return 'Họ ăn rồi đi, không quấy phá.'+fx(c,{fame:2})}},
  {l:'Đuổi đi',ax:{rong:-1},f:c=>{if(chance(0.3)){const r=G.ch.raid(1);return 'Chúng quay lại cướp.'+deadTxt(r)}return 'Chúng đi.'}},
  {l:'Báo quan',f:c=>'Quan quân đến dồn chúng đi nơi khác.'}]}}
);
return L;});
