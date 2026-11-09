/* Bách Niên Thế Gia v6.4.1.5 · quan hệ giữa các họ, hôn nhân và gả đi
   Sự kiện "rg" do nhịp tháng relTick (engine.js) chọn theo mức hảo cảm (rg.b) và chênh lệch địa vị (rg.d: up = họ cao hơn nhà mình,
   eq = ngang, down = họ thấp hơn). data.rr là hồ sơ nhà kia; G.rel.info(data.rr) trả về đủ thông tin (tên, bậc, gia phong, hảo cảm…).
   Hảo cảm âm thì luôn có lựa chọn nhường nhịn (G.rel.yieldOpts). Sự kiện "hn" là hôn nhân, "xg" là con gái đã gả đi. */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const N=c=>esc(c.given);const RL=G.rel;const FM=v=>G.fmtMoney(v);
const I=d=>d&&d.rr?RL.info(d.rr):null;const nm=i=>esc(i.name);const hd=()=>G.P(S().head);
const NO=[{l:'Cho qua',f:()=>'Chuyện không thành.'}];
const ev=o=>Object.assign({fixed:1,k:'Họ khác',rgcd:60},o);
const POS=['trike','dongminh','men','xala'],GOOD=['trike','dongminh','men'];
const Y=(i,c)=>RL.yieldOpts(i,c);
const gpT=i=>`Gia phong nhà ấy ${i.gpN.toLowerCase()}: ${i.gpD}.`;
const adult=()=>pick(G.alive().filter(p=>G.inClan(p)&&G.inMain(p)&&!p.away&&G.age(p)>=16&&G.age(p)<60&&!G.isHead(p)));
const single=g=>G.alive().filter(p=>G.inClan(p)&&G.inMain(p)&&!p.away&&!p.spouse&&G.age(p)>=16&&G.age(p)<=30&&(!g||p.g===g));
const P=id=>G.P(id);const surOf=p=>(p.outSp&&p.outSp.sur)||'bên chồng';
const good=sp=>{if(!sp||sp.inLaw!==true)return sp;['tri','mi','eq'].forEach(k=>{sp[k]=Math.max(sp[k],R(58,78))});G.ensurePersona(sp);['ht','thanh','rong','tiet','diem'].forEach(k=>{sp.sub[k]=Math.max(sp.sub[k],R(62,82))});sp.habits=(sp.habits||[]).filter(h=>!(G.D.HABITS[h]&&G.D.HABITS[h].vice));return sp};
const xgOf=d=>d&&d.xg?P(d.xg):null;
return [
/* ===================== Giao thiệp, kết thân ===================== */
ev({id:'rg_thiep_moi',t:'Thiếp mời dự tiệc',rg:{f:1,b:POS},
 x:(c,d)=>{const i=I(d);return i?`Gia chủ ${esc(i.headN)} của ${nm(i)} gửi thiếp mời nhà mình dự tiệc mừng thọ. ${gpT(i)}`:'Có thiếp mời.'},
 o:(c,d)=>{const i=I(d);if(!i)return NO;const big=m(4+i.tier*3),sm=m(1+i.tier);return [
  {l:`Đến dự, mang lễ hậu (${FM(big)})`,c:()=>G.money()>=big,ax:{rong:1},f:c=>{S().money-=big;i.rel0(i.gp==='hamloi'?14:10);return 'Lễ hậu, lời hay. Chủ nhà đích thân ra cổng tiễn.'+fx(c,{fame:2,tam:3})}},
  {l:`Đến dự, lễ vừa phải (${FM(sm)})`,c:()=>G.money()>=sm,f:c=>{S().money-=sm;i.rel0(5);return 'Ăn uống vui vẻ, có thêm vài mối quen.'+fx(c,{tam:2})}},
  {l:'Cáo từ, gửi lời chúc',f:c=>{i.rel0(i.gp==='trongle'?-7:-3);return i.gp==='trongle'?'Nhà ấy trọng lễ, coi việc không đến là khinh mình.':'Chủ nhà nhận lời chúc, không nói gì.'}}]}}),
ev({id:'rg_ket_giao',t:'Lời ngỏ kết giao',rg:{f:1,b:['men','xala','dongminh'],d:['down','eq'],init:1},
 x:(c,d)=>{const i=I(d);return i?`${nm(i)} cho người sang ngỏ ý muốn hai nhà qua lại thân thiết, có việc thì đỡ nhau. ${gpT(i)}`:''},
 o:(c,d)=>{const i=I(d);if(!i)return NO;return [
  {l:'Vui vẻ nhận lời',ax:{hd:1},f:c=>{i.rel0(15);i.log('Hai nhà kết giao');return 'Hai nhà bắt đầu qua lại.'+fx(c,{tam:3})}},
  {l:'Khéo léo từ chối',ax:{diem:1},f:c=>{i.rel0(-5);return 'Lời từ chối mềm mỏng, nhưng ai cũng hiểu.'}},
  {l:'Từ chối thẳng, nhà mình không cần',ax:{rong:-1},f:c=>{i.rel0(-12);i.addOan(5);i.log('Bị nhà mình khinh, từ chối kết giao');return 'Người đưa tin ra về, mặt hằm hằm.'}}]}}),
ev({id:'rg_hop_von',t:'Hai họ cùng làm ăn',rg:{f:1,b:GOOD,c:i=>G.money()>m(30)},
 x:(c,d)=>{const i=I(d);return i?`${nm(i)} rủ nhà mình góp vốn mở một chuyến hàng lớn. Lời thì chia đôi, lỗ cũng chia đôi.`:''},
 o:(c,d)=>{const i=I(d);if(!i)return NO;const cap=m(20+i.tier*6);return [
  {l:`Góp vốn (${FM(cap)})`,c:()=>G.money()>=cap,r:[{tri:0.6,eq:0.6},50-i.rel/5],ax:{tv:1},y:c=>{S().money+=Math.round(cap*0.6);i.rel0(8);i.log('Cùng làm ăn có lời');return 'Chuyến hàng trót lọt, hai nhà cùng có lời.'+fx(c,{fame:2})},n:c=>{S().money-=Math.round(cap*0.5);i.rel0(2);return 'Hàng gặp mưa bão, mất một nửa vốn.'+fx(c,{tam:-4})}},
  {l:'Từ chối, việc nhà còn bận',f:c=>{i.rel0(-2);return 'Nhà kia tìm người khác.'}}]}}),
ev({id:'rg_nho_giup',t:'Họ khác gặp nạn',rg:{f:1,b:POS},
 x:(c,d)=>{const i=I(d);return i?`${nm(i)} gặp nạn: ${pick(['kho hàng cháy','con trai bị bắt oan','mất mùa liền hai vụ','bị chủ nợ siết'])}. Gia chủ nhà ấy sang nhờ nhà mình giúp.`:''},
 o:(c,d)=>{const i=I(d);if(!i)return NO;const big=m(10+i.tier*5);return [
  {l:`Giúp hết lòng (${FM(big)})`,c:()=>G.money()>=big,ax:{rong:2},f:c=>{S().money-=big;i.rel0(22);i.addOan(-10);i.log('Được nhà mình cứu lúc hoạn nạn');return 'Gia chủ nhà kia nắm tay, nói ơn này đời con cháu không quên.'+fx(c,{fame:5,cfame:3})}},
  {l:`Giúp một phần (${FM(Math.round(big/3))})`,c:()=>G.money()>=big/3,f:c=>{S().money-=Math.round(big/3);i.rel0(8);return 'Có còn hơn không.'}},
  {l:'Từ chối',ax:{rong:-1},f:c=>{i.rel0(-12);i.addOan(8);i.log('Bị nhà mình bỏ mặc lúc hoạn nạn');return 'Gia chủ nhà kia lặng lẽ ra về.'}}]}}),
ev({id:'rg_lay_long',t:'Mang lễ lấy lòng',rg:{f:1,b:['xala','men','dongminh'],d:['down']},
 x:(c,d)=>{const i=I(d);return i?`${nm(i)} thấy nhà mình thế lên, mang lễ sang hỏi thăm, lời lẽ khiêm cung.`:''},
 o:(c,d)=>{const i=I(d);if(!i)return NO;const g=m(2+i.tier);return [
  {l:'Nhận lễ, đáp lễ tương xứng',ax:{rong:1},f:c=>{i.rel0(10);return 'Đáp lễ đầy đủ, nhà kia mừng ra mặt.'+fx(c,{fame:1})}},
  {l:'Nhận lễ, không đáp',ax:{rong:-1},f:c=>{S().money+=g;i.rel0(2);return 'Lễ được nhận. Nhà kia hơi chạnh lòng.'}},
  {l:'Trả lại lễ',f:c=>{i.rel0(-6);return 'Nhà kia hiểu nhà mình không muốn thân.'}}]}}),
ev({id:'rg_ket_thong_gia',t:'Ngỏ lời kết thông gia',rgcd:84,rg:{f:1,b:['men','dongminh','trike'],d:['eq','down'],init:1,c:i=>(i.kids||[]).some(k=>k.age>=16&&k.age<=30)&&single().length>0},
 x:(c,d)=>{const i=I(d);return i?`${nm(i)} cho người mai mối sang, muốn kết thông gia với nhà mình. ${gpT(i)}`:''},
 o:(c,d)=>{const i=I(d);if(!i)return NO;const L=single();const o=[];
  L.slice(0,3).forEach(p=>{const k=(i.kids||[]).find(x=>x.age>=16&&x.age<=30&&x.g!==p.g);if(!k)return;
   o.push({l:p.g==='nữ'?`Gả ${p.given} cho ${k.given} nhà ấy`:`Cưới ${k.given} nhà ấy cho ${p.given}`,s:`Hai họ thành thông gia`,f:c=>{
    i.obj.kids=(i.obj.kids||[]).filter(x=>x!==k);
    if(p.g==='nữ')G.marryOut(p,{surname:i.sur,given:k.given,fee:m(10+i.tier*8),needT:i.tier});
    else{const sp=G.mkMatch(p,{hh:p.hh});sp.surname=i.sur;sp.given=k.given;sp.g='nữ';sp.famT=i.tier;G.mkSpouse(p,false,sp)}
    if(!RL.bySur(i.sur)){i.obj.hon=(i.obj.hon||0)+1;i.rel0(15)}i.log(`Kết thông gia: ${G.nameOf(p)} và ${k.given}`);
    return `Hai nhà định ngày. ${N(p)} và ${esc(k.given)} thành vợ chồng.`+fx(c,{cfame:3})}})});
  o.push({l:'Khéo từ chối',f:c=>{i.rel0(i.gp==='trongle'?-10:-6);return 'Bà mối ra về tay không.'}});return o}}),
ev({id:'rg_vun_dap',t:'Cơ hội vun đắp với danh gia',rgcd:48,rg:{f:1,b:['xala','men','dongminh'],d:['up'],c:i=>i.tier>=4},
 x:(c,d)=>{const i=I(d);return i?`${nm(i)} là nhà quyền thế bậc nhất vùng. Nhà họ không bao giờ chủ động kết thân với ai, muốn gần thì nhà mình phải tự tìm cách.`:''},
 o:(c,d)=>{const i=I(d);if(!i)return NO;const g=m(8+i.tier*6);return [
  {l:`Dâng lễ nhân dịp giỗ tổ nhà họ (${FM(g)})`,c:()=>G.money()>=g,ax:{tv:1},r:[{eq:1,khau:0.5},50+i.tier*3-G.tierIdx()*4],y:c=>{S().money-=g;i.rel0(10);return 'Lễ được nhận, gia chủ cho gọi vào hầu trà.'+fx(c,{fame:3})},n:c=>{S().money-=g;i.rel0(2);return 'Lễ được nhận, nhưng người nhận chỉ là quản gia.'}},
  {l:'Nhờ người quen trong nhà họ giới thiệu',r:[{eq:0.8,khau:0.8},60],y:c=>{i.rel0(7);return 'Được gặp mặt, nói chuyện được đôi câu.'},n:c=>'Người quen nhận lời nhưng chẳng làm gì.'},
  {l:'Thôi, không với cao',f:c=>'Biết thân biết phận.'}]}}),
ev({id:'rg_mung_tho',t:'Họ thân mừng thọ gia chủ',rgcd:96,rg:{f:1,b:['dongminh','trike']},
 x:(c,d)=>{const i=I(d);return i?`Nhân dịp gia chủ nhà mình thêm tuổi, ${nm(i)} mang lễ sang mừng, nói hai nhà như anh em.`:''},
 o:(c,d)=>{const i=I(d);if(!i)return NO;return [{l:'Mở tiệc đãi khách',f:c=>{i.rel0(6);return 'Hai nhà chén tạc chén thù tới khuya.'+fx(c,{tam:5,cfame:1})}},{l:'Tiếp đãi đơn giản',f:c=>{i.rel0(2);return 'Khách vui, chủ cũng vui.'}}]}}),
ev({id:'rg_hoc_chung',t:'Con cháu hai họ học chung',rgcd:96,rg:{f:1,b:POS,c:()=>G.alive().some(p=>G.inClan(p)&&G.age(p)>=8&&G.age(p)<16&&p.school&&p.school!=='nha')},
 x:(c,d)=>{const i=I(d);return i?`Con cháu nhà mình và con cháu ${nm(i)} học cùng một trường, chơi thân với nhau.`:''},
 o:(c,d)=>{const i=I(d);if(!i)return NO;return [{l:'Mời con cháu nhà ấy sang chơi',ax:{hd:1},f:c=>{i.rel0(6);return 'Bọn trẻ quấn quýt, người lớn cũng thân hơn.'}},{l:'Dặn con cháu giữ khoảng cách',f:c=>{i.rel0(-2);return 'Bọn trẻ buồn, nhưng nghe lời.'}}]}}),
ev({id:'rg_dam_tang',t:'Đám tang nhà họ khác',rgcd:180,rgg:72,w:0.4,rg:{f:1,b:['men','xala','dongminh','trike','bathoa']},
 x:(c,d)=>{const i=I(d);return i?`Nhà ${nm(i)} có tang. Cả vùng đến viếng.`:''},
 o:(c,d)=>{const i=I(d);if(!i)return NO;const g=m(1+i.tier);return [{l:`Đến viếng, phúng điếu (${FM(g)})`,c:()=>G.money()>=g,ax:{rong:1},f:c=>{S().money-=g;i.rel0(i.band==='bathoa'?12:6);if(i.band==='bathoa')i.addOan(-5);return i.band==='bathoa'?'Thấy nhà mình đến viếng, gia chủ nhà kia cúi đầu đáp lễ. Mối bất hòa dịu đi.':'Lễ viếng chu đáo.'}},{l:'Gửi người đại diện',f:c=>{i.rel0(1);return 'Có mặt cho phải phép.'}}]}}),
ev({id:'rg_suy_cau_dua',t:'Họ suy yếu tìm chỗ dựa',rgcd:120,rg:{f:1,b:['xala','men','dongminh'],d:['down'],c:i=>(i.wealth||50)<35},
 x:(c,d)=>{const i=I(d);return i?`${nm(i)} sa sút, ruộng đã cầm, nhà đã bán bớt. Gia chủ nhà ấy xin nương nhờ thế nhà mình.`:''},
 o:(c,d)=>{const i=I(d);if(!i)return NO;const g=m(8+i.tier*4);return [
  {l:`Che chở, cho vay vốn gượng dậy (${FM(g)})`,c:()=>G.money()>=g,ax:{rong:2},f:c=>{S().money-=g;i.obj.wealth=Math.min(100,(i.obj.wealth||30)+15);i.rel0(25);i.log('Được nhà mình che chở lúc sa sút');return 'Nhà kia đứng dậy được, từ đó coi nhà mình là ân nhân.'+fx(c,{fame:4})}},
  {l:'Mua lại ruộng của họ với giá hời',ax:{tv:1,rong:-1},c:()=>G.money()>=G.landCost()*2,f:c=>{const v=Math.round(G.landCost()*1.4);S().money-=v;S().farm.own+=2;i.rel0(-8);i.addOan(6);return 'Hai mẫu ruộng về tay nhà mình. Nhà kia ngậm ngùi.'}},
  {l:'Từ chối',f:c=>{i.rel0(-6);return 'Nhà kia đi nhờ nơi khác.'}}]}}),
ev({id:'rg_lien_minh',t:'Đối thủ cũ đề nghị liên minh',rgcd:120,rg:{f:1,b:['bathoa','xala'],c:()=>!!S().war||Object.values((S().court||{f:{}}).f).some(F=>S().t-F.fall<24)},
 x:(c,d)=>{const i=I(d);return i?`Thời thế rối ren. ${nm(i)}, vốn chẳng ưa gì nhà mình, lại sai người sang đề nghị hai nhà gác chuyện cũ, đứng chung một bên.`:''},
 o:(c,d)=>{const i=I(d);if(!i)return NO;return [{l:'Nhận lời liên minh',ax:{diem:1},f:c=>{i.rel0(30);i.addOan(-15);i.log('Gác chuyện cũ, liên minh qua thời loạn');return 'Hai nhà bắt tay. Chuyện cũ tạm gác.'}},{l:'Không tin, từ chối',f:c=>{i.rel0(-5);return 'Người đưa tin ra về.'}}]}}),
ev({id:'rg_hoa_giai',t:'Đề nghị hòa giải',rgcd:120,rg:{f:1,b:['bathoa','thuoan'],c:i=>i.oan>=15||i.rel<=-15},
 x:(c,d)=>{const i=I(d);return i?`Gia chủ ${esc(i.headN)} của ${nm(i)} nhờ một bậc trưởng lão trong vùng đứng ra, muốn hai nhà hòa giải mối hiềm khích bấy lâu.`:''},
 o:(c,d)=>{const i=I(d);if(!i)return NO;return [{l:'Nhận hòa giải',ax:{rong:2},f:c=>{i.rel0(25);i.addOan(-20);i.log('Hai nhà hòa giải');return 'Trước mặt trưởng lão, hai gia chủ uống chung chén rượu.'+fx(c,{fame:3})}},
  {l:'Nhận, nhưng đòi bồi thường',ax:{tv:1},f:c=>{S().money+=m(3+i.tier*2);i.rel0(10);i.addOan(-8);return 'Nhà kia nghiến răng trả tiền.'}},
  {l:'Từ chối',ax:{rong:-1},f:c=>{i.rel0(-10);i.addOan(8);return 'Trưởng lão lắc đầu ra về.'}}]}}),
ev({id:'rg_nho_chuyen_cu',t:'Hậu duệ nhớ chuyện cũ',rgcd:240,rg:{c:i=>(i.book||[]).some(b=>/bỏ mặc|khinh|thua|mua lại ruộng/.test(b.txt)&&S().t-b.t>=180)},
 x:(c,d)=>{const i=I(d);const b=i&&(i.book||[]).find(b=>/bỏ mặc|khinh|thua|mua lại ruộng/.test(b.txt));return i?`Gia chủ mới của ${nm(i)} vẫn nhắc chuyện năm xưa: "${esc(b?b.txt:'chuyện cũ')}". Người nhà họ nhìn nhà mình bằng con mắt khác.`:''},
 o:(c,d)=>{const i=I(d);if(!i)return NO;return [{l:'Sang tạ lỗi chuyện đời trước',ax:{rong:1},r:[{eq:1},55],y:c=>{i.rel0(15);i.addOan(-15);return 'Lời tạ lỗi chân thành làm nhà kia dịu lại.'},n:c=>{i.rel0(-3);return 'Nhà kia không nhận.'}},{l:'Chuyện đời trước, mặc kệ',f:c=>{i.rel0(-10);return 'Mối hiềm khích truyền thêm một đời.'}}]}}),
/* ===================== Bất hòa, thù oán ===================== */
ev({id:'rg_tranh_cai',t:'Giành mối làm ăn',rg:{b:['bathoa','xala']},
 x:(c,d)=>{const i=I(d);return i?`${nm(i)} giành mất mấy mối hàng quen của nhà mình, người hai nhà cãi nhau giữa chợ.`:''},
 o:(c,d)=>{const i=I(d);if(!i)return NO;return [{l:'Sang nói phải trái',r:[{eq:0.8,khau:0.8},50+i.diff*6],ax:{gan:1},y:c=>{i.rel0(3);return 'Nhà kia đuối lý, trả lại mối.'+fx(c,{money:m(3)})},n:c=>{i.rel0(-8);return 'Cãi không lại, còn bị cười.'+fx(c,{tam:-4})}},...Y(i,c)]}}),
ev({id:'rg_chen_ep',t:'Bị nhà quyền thế chèn ép',rg:{b:['bathoa','xala','thuoan'],d:['up'],c:i=>['ngangnguoc','hamloi','trongvo'].includes(i.gp)},
 x:(c,d)=>{const i=I(d);return i?`${nm(i)} cậy thế, ép nhà mình bán rẻ mấy sào ruộng giáp ranh nhà họ. ${gpT(i)}`:''},
 o:(c,d)=>{const i=I(d);if(!i)return NO;return [{l:'Cự lại, không bán',r:[{tri:0.6,eq:0.6,fame:0.3},55+i.diff*8],ax:{gan:2},y:c=>{i.rel0(-4);return 'Nhà kia không ép được, đành thôi.'+fx(c,{fame:3})},n:c=>{i.rel0(-10);i.addOan(8);S().farm.own=Math.max(0,S().farm.own-1);return 'Không cự nổi, mất một mẫu.'+fx(c,{tam:-8})}},...Y(i,c)]}}),
ev({id:'rg_canh_tranh',t:'Hai nhà cạnh tranh',rg:{b:['xala','bathoa'],d:['eq']},
 x:(c,d)=>{const i=I(d);return i?`${nm(i)} ngang hàng nhà mình, việc gì cũng muốn hơn một bậc: đám cưới phải to hơn, lễ hội phải góp nhiều hơn.`:''},
 o:(c,d)=>{const i=I(d);if(!i)return NO;const g=m(6+i.tier*3);return [{l:`Không chịu kém, góp lễ hội thật lớn (${FM(g)})`,c:()=>G.money()>=g,ax:{tv:1},f:c=>{S().money-=g;i.rel0(-4);return 'Cả làng khen nhà mình hào phóng hơn.'+fx(c,{cfame:4})}},
  {l:'Rủ nhà ấy cùng góp, chia tiếng tốt',ax:{hd:1},r:[{eq:1},55],y:c=>{i.rel0(12);return 'Hai nhà cùng đứng tên, ai cũng vui.'},n:c=>{i.rel0(-3);return 'Nhà kia nghi ngờ ý tốt.'}},
  {l:`Góp như mọi nhà (${FM(Math.round(g/3))})`,c:()=>G.money()>=g/3,f:c=>{S().money-=Math.round(g/3);return 'Góp phần mình, không hơn không kém.'}},
  {l:'Mặc kệ, không góp',ax:{tiet:1},f:c=>{i.rel0(-2);return 'Nhà kia được tiếng hơn nhà mình một bậc.'+fx(c,{cfame:-1})}}]}}),
ev({id:'rg_tranh_ruong',t:'Tranh chấp ruộng nước',rg:{b:['thuoan','bathoa']},
 x:(c,d)=>{const i=I(d);return i?`Mùa khô, người ${nm(i)} đắp bờ chặn mương, nước không vào ruộng nhà mình.`:''},
 o:(c,d)=>{const i=I(d);if(!i)return NO;return [{l:'Kiện lên quan huyện',r:[{tri:1,fame:0.4},55+i.diff*8],ax:{thanh:1},y:c=>{i.rel0(-6);return 'Quan xử nhà mình đúng, bờ bị phá.'+fx(c,{fame:3})},n:c=>{i.rel0(-8);return 'Quan làm ngơ, mùa này mất một phần.'+fx(c,{money:-m(4),tam:-6})}},
  {l:'Cho người ra phá bờ',r:[{vo:1,gan:0.6},55],ax:{gan:2,diem:-1},y:c=>{i.rel0(-12);i.addOan(10);return 'Nước vào ruộng. Hai nhà thành thù.'},n:c=>{i.rel0(-15);i.addOan(15);return 'Hai bên xô xát, người nhà mình bị thương.'+fx(c,{suc:-8})}},...Y(i,c)]}}),
ev({id:'rg_pha_co_so',t:'Cơ sở bị phá hoại',rg:{b:['thuoan'],c:()=>S().biz.length>0},
 x:(c,d)=>{const i=I(d);return i?`Có kẻ đêm đêm đến phá cơ sở làm ăn của nhà mình. Người ta đồn là người của ${nm(i)}.`:''},
 o:(c,d)=>{const i=I(d);if(!i)return NO;return [{l:'Thuê người canh giữ, bắt quả tang',r:[{vo:0.8,tri:0.5},55],y:c=>{i.rel0(-5);i.addOan(5);return 'Bắt được kẻ phá, khai ra người sai khiến.'+fx(c,{fame:3})},n:c=>'Không bắt được ai, thiệt hại thêm.'+fx(c,{money:-m(6)})},...Y(i,c)]}}),
ev({id:'rg_boi_nho',t:'Bị bôi nhọ danh tiếng',rg:{b:['thuoan','bathoa']},
 x:(c,d)=>{const i=I(d);return i?`Khắp vùng lan truyền chuyện xấu về nhà mình. Gốc gác lời đồn là từ ${nm(i)}.`:''},
 o:(c,d)=>{const i=I(d);if(!i)return NO;return [{l:'Đứng ra minh oan trước làng',r:[{eq:0.8,khau:0.8},55],ax:{gan:1},y:c=>'Lời đồn bị bác bỏ.'+fx(c,{cfame:2}),n:c=>'Càng nói càng rối.'+fx(c,{cfame:-5})},
  {l:'Tung chuyện xấu của họ đáp trả',ax:{thanh:-1,diem:-1},f:c=>{i.rel0(-15);i.addOan(12);i.obj.fame=Math.max(0,i.obj.fame-8);return 'Hai nhà bêu xấu nhau, cả vùng xem trò.'+fx(c,{cfame:-2})}},...Y(i,c)]}}),
ev({id:'rg_ngam_ngam',t:'Có kẻ ngấm ngầm gây khó',rg:{b:['bathoa','xala','thuoan'],c:i=>i.canh>=50||i.rel<=-15},
 x:(c,d)=>{const i=I(d);return i?`Dạo này việc gì của nhà mình cũng vướng: giấy tờ chậm, hàng bị giữ. Hình như có bàn tay của ${nm(i)}.`:''},
 o:(c,d)=>{const i=I(d);if(!i)return NO;return [{l:'Cho người dò cho ra',r:[{tri:1},55],y:c=>{i.addOan(5);i.obj.canh=Math.max(0,i.obj.canh-10);return 'Biết được ai đứng sau, gỡ dần từng việc.'},n:c=>'Dò mãi không ra.'+fx(c,{tam:-3})},...Y(i,c)]}}),
ev({id:'rg_hanh_hung',t:'Người nhà bị hành hung',rg:{b:['cucdoan']},
 x:(c,d)=>{const i=I(d);return i?`Một người nhà mình bị một toán côn đồ chặn đánh giữa đường. Ai cũng biết chúng do ${nm(i)} thuê.`:''},
 o:(c,d)=>{const i=I(d);if(!i)return NO;const v=adult()||c;return [{l:'Báo quan, đòi công lý',r:[{tri:1,fame:0.4},60+i.diff*8],ax:{thanh:1},y:c=>{i.rel0(-5);return 'Quan bắt bọn côn đồ, nhà kia bị phạt.'+fx(v,{suc:-10})},n:c=>'Quan bảo không đủ chứng cứ.'+fx(v,{suc:-15,tam:-10})},
  {l:'Tập hợp người nhà đánh trả',r:[{vo:1,gan:0.6},60],ax:{gan:2},y:c=>{i.rel0(-12);i.addOan(15);return 'Bọn côn đồ bỏ chạy, nhà kia mất mặt.'+fx(v,{suc:-6})},n:c=>{i.rel0(-12);return 'Người nhà mình bị đánh trọng thương.'+fx(v,{suc:-25,lethal:1})}},...Y(i,c)]}}),
ev({id:'rg_vu_cao',t:'Bị vu cáo lên quan',rg:{b:['cucdoan']},
 x:(c,d)=>{const i=I(d);return i?`${nm(i)} làm đơn tố nhà mình ${pick(['chứa hàng lậu','lấn chiếm đất công','buôn muối trái phép'])}. Nha dịch đã tới cổng.`:''},
 o:(c,d)=>{const i=I(d);if(!i)return NO;const g=m(10+i.tier*5);return [{l:'Lên công đường biện bạch',r:[{tri:1,eq:0.6},60+i.diff*8],ax:{gan:1},y:c=>{i.rel0(-5);i.obj.fame=Math.max(0,i.obj.fame-10);return 'Lời vu cáo bị bác, nhà kia mất mặt.'+fx(c,{cfame:3})},n:c=>'Bị phạt nặng.'+fx(c,{money:-m(15),cfame:-6})},
  {l:`Lo lót cho xong (${FM(g)})`,c:()=>G.money()>=g,vio:'trugian',ax:{thanh:-1},f:c=>{S().money-=g;return 'Chuyện được ém. Nhà kia biết nhà mình sợ.'}},...Y(i,c)]}}),
ev({id:'rg_song_con',t:'Một sống một còn',rgcd:120,rg:{b:['songcon']},
 x:(c,d)=>{const i=I(d);return i?`Giữa nhà mình và ${nm(i)} không còn đường lui. Một trong hai nhà sẽ phải biến khỏi vùng này. Thua là mất tất cả.`:''},
 o:(c,d)=>{const i=I(d);if(!i)return NO;const win=t=>c=>RL.win(i)+fx(c,{fame:10});const lose=c=>{RL.lose(i);return ''};return [
  {l:'Đem hết chứng cứ kiện lên phủ',r:[{tri:1,eq:0.5,fame:0.4},62+i.diff*8],ax:{gan:1},y:win(),n:lose},
  {l:'Dốc hết tiền của bóp nghẹt làm ăn của họ',r:[{tri:0.6,muu:1},60+i.diff*8],ax:{muu:1},y:win(),n:lose},
  {l:'Tập hợp người, quyết một trận',r:[{vo:1,gan:0.6},62],ax:{gan:2},y:win(),n:lose},
  {l:'Nhờ trưởng lão cả vùng đứng ra hòa giải lần cuối',r:[{eq:1,khau:0.6},78],ax:{rong:1},y:c=>{i.rel0(70);i.addOan(-40);i.log('Hòa giải ở bước đường cùng');return 'Trưởng lão cả vùng quỳ giữa hai nhà. Cuối cùng hai gia chủ cùng cúi đầu.'},n:c=>{i.rel0(-5);return 'Hòa giải không thành. Ngày tàn của một trong hai nhà đã gần.'}}]}}),

/* ===================== Hôn nhân ===================== */
{id:'hn_moi_xau',t:'Mối mai có tiếng xấu',k:'Hôn nhân',w:0.6,cd:60,age:[18,30],c:c=>!c.spouse&&!c.away&&G.inMain(c),
 x:c=>`Bà mối giới thiệu cho ${N(c)} một mối nhà khá giả. Nhưng có người thì thầm: người ấy mê cờ bạc, nợ nần.`,
 o:[{l:'Cho người dò hỏi cho rõ',r:[{tri:0.8,eq:0.5},50],y:c=>'Đúng là có chuyện. Từ chối khéo, may mà biết sớm.'+fx(c,{tam:2}),n:c=>{const sp=G.mkSpouse(c,false);if(sp&&G.D.HABITS.bac)G.addHabit(sp,'bac',35);return 'Dò không ra gì, cứ cưới. Về nhà mới biết lời đồn là thật.'+fx(c,{tam:-6})}},
    {l:'Lời đồn chưa chắc, cứ cưới',f:c=>{const sp=G.mkSpouse(c,false);if(sp&&chance(0.6)&&G.D.HABITS.bac)G.addHabit(sp,'bac',35);return 'Đám cưới linh đình.'+fx(c,{tam:3})}},
    {l:'Từ chối ngay',f:c=>'Thà muộn còn hơn lầm.'}]},
{id:'hn_sinh_le_cao',t:'Nhà gái đòi sính lễ cao',k:'Hôn nhân',w:0.6,cd:60,age:[18,30],g:'nam',c:c=>!c.spouse&&!c.away&&G.inMain(c),
 x:c=>`Một mối rất xứng cho ${N(c)}: con gái nhà gia giáo, đẹp người đẹp nết. Nhưng nhà gái đòi sính lễ gấp đôi lệ thường.`,
 o:c=>{const f=m(30);return [{l:`Chịu, lo đủ sính lễ (${FM(f)})`,c:()=>G.money()>=f,f:c=>{S().money-=f;const sp=G.mkSpouse(c,false);good(sp);return 'Cưới được người vợ hiền.'+fx(c,{tam:6,cfame:2})}},
  {l:'Mặc cả',r:[{eq:1,khau:0.6},55],y:c=>{S().money-=Math.round(f*0.6);good(G.mkSpouse(c,false));return 'Hai nhà nhường nhau một bước, đám cưới thành.'+fx(c,{tam:4})},n:c=>'Nhà gái phật ý, mối hỏng.'+fx(c,{tam:-4})},
  {l:'Thôi, tìm mối khác',f:c=>'Tiếc nhưng đành.'}]}},
{id:'hn_le_bi_pha',t:'Hôn lễ bị phá',k:'Hôn nhân',w:0.5,pcd:9999,c:c=>c.flags.wedT!=null&&S().t-c.flags.wedT<=2,
 x:c=>`Đang giữa lễ cưới của ${N(c)}, một kẻ say rượu xông vào gây sự, nói cô dâu chú rể từng có hôn ước với người khác.`,
 o:[{l:'Mời hắn ra ngoài, giữ thể diện',r:[{eq:1},50],y:c=>'Khách khứa không ai để bụng.'+fx(c,{tam:2}),n:c=>'Lời ra tiếng vào cả tháng.'+fx(c,{fame:-3,tam:-5})},
    {l:'Cho người lôi hắn đi',ax:{gan:1,diem:-1},f:c=>'Hắn bị lôi đi, đám cưới tiếp tục, nhưng có người lắc đầu.'+fx(c,{fame:-1})}]},
{id:'hn_nguoi_cu',t:'Người cũ trở lại',k:'Hôn nhân',w:0.5,pcd:9999,c:c=>c.flags.wedT!=null&&S().t-c.flags.wedT<=12&&!!c.spouse,
 x:c=>`Chưa đầy năm sau ngày cưới, người ${N(c)} từng thương thầm tìm đến, muốn gặp một lần.`,
 o:[{l:'Không gặp, giữ đạo vợ chồng',ax:{tiet:1,thanh:1},f:c=>{const s=G.spouseOf(c);if(s&&s.love!=null)s.love=c.love=Math.min(100,c.love+4);return 'Cánh cửa đóng lại với quá khứ.'+fx(c,{tam:-3})}},
    {l:'Gặp lần cuối để nói rõ',r:[{eq:1},55],y:c=>'Hai người chào nhau lần cuối.'+fx(c,{tam:2}),n:c=>{const s=G.spouseOf(c);if(s&&s.love!=null)s.love=c.love=Math.max(0,c.love-15);return 'Chuyện đến tai người nhà, vợ chồng lục đục.'+fx(c,{tam:-6})}}]},
{id:'hn_dau_bi_coi',t:'Nàng dâu bị coi thường',k:'Hôn nhân',w:0.6,cd:120,c:c=>G.isHead(c)&&G.alive().some(p=>G.inClan(p)&&G.inMain(p)&&p.inLaw&&p.g==='nữ'&&S().t-(p.flags.wedT||0)<60),
 x:c=>{const p=G.alive().find(p=>G.inClan(p)&&G.inMain(p)&&p.inLaw&&p.g==='nữ'&&S().t-(p.flags.wedT||0)<60);return `${p?esc(p.given):'Nàng dâu mới'}, xuất thân họ ${p?esc(p.surname):'khác'}, bị mấy người trong nhà xì xào chê là quê mùa, nhà mẹ đẻ kém thế.`},
 o:c=>{const p=G.alive().find(p=>G.inClan(p)&&G.inMain(p)&&p.inLaw&&p.g==='nữ'&&S().t-(p.flags.wedT||0)<60);const cl=p?RL.bySur(p.surname):null;return [
  {l:'Gia chủ đứng ra bênh nàng dâu',ax:{rong:1},f:c=>{if(p)G.addRel(p,c,10);if(cl)cl.rel=Math.min(100,cl.rel+6);return 'Từ đó không ai dám nói thêm.'+fx(c,{on:1})}},
  {l:'Mặc kệ chuyện đàn bà',f:c=>{if(p)G.addStat(p,'tam',-10);if(cl)cl.rel=Math.max(-100,cl.rel-6);return 'Nàng dâu khóc thầm, nhà mẹ đẻ nghe chuyện thì phật lòng.'}}]}},
{id:'hn_thong_gia_nang_do',t:'Thông gia nâng đỡ',k:'Hôn nhân',w:0.5,cd:120,job:['quan'],c:c=>{const s=G.spouseOf(c);const cl=s&&RL.bySur(s.surname);return !!cl&&cl.fame>=90&&cl.rel>=25},
 x:c=>`Nhà vợ của ${N(c)} có thế lực. Bố vợ ngỏ ý viết thư tiến cử con rể lên một chức cao hơn.`,
 o:[{l:'Nhận lời',ax:{tv:1},f:c=>fx(c,{lv:1,fav:3,loy:0})+' Thư tiến cử có tác dụng.'},
    {l:'Từ chối, muốn tự mình đi lên',ax:{dl:2},f:c=>'Bố vợ khen có chí.'+fx(c,{fame:3})}]},
{id:'hn_ep_gia',t:'Con không ưng mối nhà chọn',k:'Hôn nhân',w:0.5,cd:96,age:[16,26],c:c=>!c.spouse&&!c.away&&G.inMain(c)&&G.axv(c,'dl')>=60,
 x:c=>`Gia đình đã ưng một mối cho ${N(c)}, nhưng ${N(c)} nhất quyết không chịu, nói lấy người mình không thương thì khổ cả đời.`,
 o:[{l:'Ép cưới, cha mẹ đặt đâu con ngồi đấy',ax:{dl:-2},f:c=>{const sp=G.mkSpouse(c,false);if(sp){c.marT=sp.marT='cuongep';if(c.love!=null)c.love=sp.love=Math.max(0,c.love-20)}G.addStat(c,'tam',-12);return 'Đám cưới diễn ra trong nước mắt.'}},
    {l:'Chiều con, hủy mối',ax:{dl:1},f:c=>'Nhà kia không vui, nhưng con thì nhẹ lòng.'+fx(c,{tam:6})}]},

/* ===================== Con gái đã gả đi ===================== */
{id:'xg_qua_tet',t:'Quà Tết từ nhà con gái',fixed:1,k:'Thông gia',
 x:(c,d)=>{const p=xgOf(d);return p?`${N(p)} gửi quà Tết từ nhà họ ${esc(surOf(p))} về, kèm thư hỏi thăm cha mẹ.`:''},
 o:(c,d)=>[{l:'Gửi quà đáp lại',f:c=>'Quà qua quà lại, tình thông gia thêm thân.'+fx(c,{tam:3})},{l:'Nhắn con giữ gìn sức khỏe',f:c=>'Thư được gửi đi.'+fx(c,{tam:2})}]},
{id:'xg_chu_mau',t:'Con gái làm chủ mẫu nhà chồng',fixed:1,k:'Thông gia',
 x:(c,d)=>{const p=xgOf(d);return p?`Tin vui: ${N(p)} nay đã là chủ mẫu nhà họ ${esc(surOf(p))}, nắm việc trong ngoài, cả họ bên ấy kính nể.`:''},
 o:(c,d)=>{const p=xgOf(d);const cl=p&&p.outSp&&p.outSp.cid?RL.bySur(p.outSp.sur):null;return [{l:'Mở tiệc mừng',f:c=>{if(cl)cl.rel=Math.min(100,cl.rel+12);return 'Cả họ mừng lây.'+fx(c,{cfame:4,tam:5})}},{l:'Gửi thư dặn con giữ nếp nhà',f:c=>{if(cl)cl.rel=Math.min(100,cl.rel+6);return 'Thư dặn dò, lời lẽ tự hào.'+fx(c,{cfame:2})}}]}},
{id:'xg_chau_ngoai',t:'Cháu ngoại đỗ đạt',fixed:1,k:'Thông gia',
 x:(c,d)=>{const p=xgOf(d);return p?`Con của ${N(p)} bên nhà họ ${esc(surOf(p))} vừa đỗ đạt. Nhà thông gia báo tin, người làng khen nhà mình có phúc.`:''},
 o:(c,d)=>[{l:'Gửi quà mừng cháu',f:c=>'Hai nhà cùng vui.'+fx(c,{cfame:3,tam:4})}]},
{id:'xg_thong_gia_giup',t:'Thông gia giúp làm ăn',fixed:1,k:'Thông gia',
 x:(c,d)=>{const p=xgOf(d);return p?`Nhờ ${N(p)} nói giúp, nhà họ ${esc(surOf(p))} giới thiệu cho nhà mình mấy mối làm ăn.`:''},
 o:(c,d)=>[{l:'Nhận, hẹn ngày đáp ơn',f:c=>'Mối mới làm ăn thuận lợi.'+fx(c,{money:m(8),tam:3})},{l:'Cảm ơn, nhưng không dám phiền',f:c=>'Nhà thông gia quý nhà mình biết điều.'}]},
{id:'xg_nha_chong_nan',t:'Nhà chồng gặp đại họa',fixed:1,k:'Thông gia',
 x:(c,d)=>{const p=xgOf(d);return p?`${N(p)} gửi thư về trong nước mắt: nhà họ ${esc(surOf(p))} ${pick(['bị cuốn vào một vụ án','bị giặc cướp phá sạch','mất trắng mấy chuyến hàng'])}, xin nhà mẹ đẻ cứu giúp.`:''},
 o:(c,d)=>{const p=xgOf(d);const cl=p&&p.outSp?RL.bySur(p.outSp.sur):null;const g=m(20);return [
  {l:`Dốc sức cứu thông gia (${FM(g)})`,c:()=>G.money()>=g,ax:{rong:2},f:c=>{S().money-=g;if(cl){cl.rel=Math.min(100,cl.rel+25);RL.book(cl,'Được nhà thông gia cứu lúc đại họa')}if(p&&p.outSp)p.outSp.coi=0;return 'Nhà thông gia qua được cơn nguy, ơn này họ khắc cốt.'+fx(c,{cfame:4})}},
  {l:'Cắt đứt quan hệ để khỏi vạ lây',ax:{rong:-2},f:c=>{if(cl){cl.rel=Math.max(-100,cl.rel-30);RL.ens(cl);cl.oan=Math.min(100,cl.oan+20);RL.book(cl,'Bị nhà thông gia bỏ mặc lúc đại họa')}if(p)G.addStat(p,'tam',-25);return 'Thư không hồi âm. Con gái khóc cạn nước mắt.'}},
  {l:'Nhân cơ hội mua lại tài sản của họ giá rẻ',ax:{tv:1,rong:-2},f:c=>{S().money+=m(10);if(cl){cl.rel=Math.max(-100,cl.rel-40);RL.ens(cl);cl.oan=Math.min(100,cl.oan+30);RL.book(cl,'Bị nhà thông gia lợi dụng lúc hoạn nạn')}return 'Nhà mình được lợi. Tiếng xấu thì theo mãi.'+fx(c,{cfame:-6})}}]}}
];});
