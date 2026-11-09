/* Bách Niên Thế Gia v6.4.1.6 · tình duyên, chi họ xa, gia đình người đi lính
   Tình duyên (rd_*): một mối tình đi qua các bước gặp gỡ → thiện cảm → nảy sinh → thổ lộ → ra mắt gia chủ → thành thân hoặc chia ly.
   Trạng thái nằm ở c.tinh = {pt: người kia, st: bước, aff: tình ý}. Người kia (pt) có thể là con cháu một họ trong vùng.
   Chi họ xa (br_*): chi lập ở nơi nhậm chức, S.hh[id].p là tỉnh, gan là mức gắn bó với chính họ.
   Người đi lính (lq_*): vợ con theo vào doanh trại, về phép, cưới vợ nhân dịp phép. */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const N=c=>esc(c.given);const T=G.tinh;const FM=v=>G.fmtMoney(v);const P=id=>G.P(id);
const ptN=pt=>pt?esc(pt.sur+' '+pt.given):'người ấy';const ptG=pt=>pt&&pt.g==='nữ'?'nàng':'chàng';
const tinh=c=>c.tinh||null;const K='Tình duyên';
const fh=c=>{const H=S().hh[c.hh];return H&&H.far&&H.p&&c.hh!==G.mainHH()?H:null};
const isLead=c=>{const L=G.br.lead(c.hh);return !!L&&L.id===c.id};
const farOf=()=>Object.keys(S().hh).filter(id=>{const H=S().hh[id];return id!==G.mainHH()&&H.far&&H.p&&G.alive().some(x=>x.hh===id&&G.inClan(x))});
const spIn=c=>{const s=G.spouseOf(c);return s&&G.inClan(s)?s:null};
const toHead=(c,id,d,mo)=>{const h=G.P(S().head);if(!h)return;if(mo)G.later(h,id,mo,d);else G.enqueue('ev',h.id,{ev:id,data:d})};
return [
/* ===================== Tình duyên ===================== */
{id:'rd_gap',t:'Một lần gặp gỡ',k:K,age:[18,25],pcd:120,w:1.2,c:c=>T.ok(c)&&!c.tinh&&chance(T.p(c)),
 x:(c,d)=>{d.pt=d.pt||T.partner(c);const pt=d.pt;return `${pick(['Ngày hội làng','Buổi lễ ở chùa','Phiên chợ đầu xuân','Bến đò chiều','Đám cưới nhà hàng xóm'])}, ${N(c)} gặp ${ptN(pt)}${pt.cid?', con nhà họ '+esc(pt.sur)+' trong vùng':''}. Người ấy ${pt.tinh}, ánh mắt khiến ${N(c)} bối rối mãi.`},
 o:(c,d)=>[{l:'Bắt chuyện',r:[{eq:0.7,mi:0.6},55],ax:{hd:1,gan:1},y:c=>{c.tinh={pt:d.pt,st:1,aff:25,t:S().t};G.later(c,'rd_thien_cam',R(3,8));return `Câu chuyện đầu tiên ngập ngừng mà vui. Trước khi chia tay, ${ptN(d.pt)} hỏi tên ${N(c)}.`+fx(c,{tam:6})},
   n:c=>{c.tinh={pt:d.pt,st:0,don:1,t:S().t};G.later(c,'rd_don_phuong',R(6,18));return 'Lúng túng không nói nên lời, người ấy đã đi mất.'+fx(c,{tam:-2})}},
  {l:'Lặng lẽ nhìn theo',ax:{hd:-1},f:c=>{c.tinh={pt:d.pt,st:0,don:1,t:S().t};G.later(c,'rd_don_phuong',R(6,18));return 'Bóng người khuất sau đám đông. Hình bóng ấy thì ở lại.'}},
  {l:'Không để tâm',ax:{tiet:1},f:c=>'Gặp rồi quên, chuyện thường.'}]},
{id:'rd_don_phuong',t:'Tương tư',k:K,fixed:1,
 x:c=>`Đã lâu mà ${N(c)} vẫn không quên được ${ptN((tinh(c)||{}).pt)}. Người ta thì chưa hề biết.`,
 o:c=>{const t=tinh(c);if(!t||c.spouse)return [{l:'Thôi',f:c=>{c.tinh=null;return 'Chuyện cũ khép lại.'}}];return [
  {l:'Viết thư thổ lộ',r:[{mi:0.8,eq:0.6},62],ax:{gan:1},y:c=>{t.st=2;t.aff=40;G.later(c,'rd_nay_sinh',R(3,8));return `Thư hồi âm tới. ${ptN(t.pt)} cũng nhớ lần gặp ấy.`+fx(c,{tam:10})},n:c=>{c.tinh=null;return 'Thư gửi đi không có hồi âm.'+fx(c,{tam:-12})}},
  {l:'Chôn chặt trong lòng',ax:{diem:1},f:c=>{c.tinh=null;return 'Có những chuyện chỉ nên giữ cho riêng mình.'+fx(c,{tam:-4})}}]}},
{id:'rd_thien_cam',t:'Qua lại',k:K,fixed:1,
 x:c=>`${N(c)} và ${ptN((tinh(c)||{}).pt)} có cớ gặp nhau thêm vài lần. Lời qua tiếng lại, ai cũng thấy hai người hợp chuyện.`,
 o:c=>{const t=tinh(c);if(!t||c.spouse)return [{l:'Thôi',f:c=>{c.tinh=null;return 'Duyên chưa tới.'}}];const g=m(1);return [
  {l:'Hẹn gặp riêng ở bến sông',r:[{mi:0.6,eq:0.6},50],ax:{gan:1,tiet:-1},y:c=>{t.aff+=20;t.st=2;if(chance(0.3))toHead(c,'rd_tieng_don',{who:c.id});G.later(c,'rd_nay_sinh',R(3,6));return 'Buổi hẹn ngắn ngủi mà nhớ mãi.'+fx(c,{tam:8})},n:c=>{t.aff+=5;t.st=2;G.later(c,'rd_nay_sinh',R(4,8));return 'Người kia không đến được, nhắn lời xin lỗi.'}},
  {l:'Gửi thư qua người quen',ax:{diem:1},f:c=>{t.aff+=12;t.st=2;G.later(c,'rd_nay_sinh',R(4,8));return 'Thư đi thư lại, chữ nào cũng nâng niu.'+fx(c,{tam:5})}},
  {l:`Tặng một món quà nhỏ (${FM(g)})`,c:()=>(c.purse||0)>=g,ax:{rong:1},f:c=>{c.purse-=g;t.aff+=15;t.st=2;G.later(c,'rd_nay_sinh',R(3,6));return 'Món quà được nhận, kèm một nụ cười.'+fx(c,{tam:6})}}]}},
{id:'rd_nay_sinh',t:'Tình ý',k:K,fixed:1,
 x:c=>`Ai cũng nhận ra ${N(c)} và ${ptN((tinh(c)||{}).pt)} đã có tình ý với nhau. Chỉ còn chờ một lời.`,
 o:c=>{const t=tinh(c);if(!t||c.spouse)return [{l:'Thôi',f:c=>{c.tinh=null;return 'Duyên lỡ.'}}];return [
  {l:'Thổ lộ lòng mình',r:[{eq:0.8,mi:0.6},Math.max(30,62-t.aff/4)],ax:{gan:1},y:c=>{t.st=3;if(G.isHead(c))G.later(c,'rd_lua_chon',R(1,3));else toHead(c,'rd_ra_mat',{who:c.id},R(1,3));return `${ptN(t.pt)} đỏ mặt gật đầu. Hai người hẹn ước.`+fx(c,{tam:12})},n:c=>{t.aff=Math.max(0,t.aff-10);G.later(c,'rd_nay_sinh',R(6,12));return 'Người kia còn ngại, xin thêm thời gian.'+fx(c,{tam:-4})}},
  {l:'Chờ thêm',ax:{diem:1},f:c=>{G.later(c,'rd_nay_sinh',R(6,12));return 'Chưa phải lúc.'}}]}},
{id:'rd_tieng_don',t:'Lời ra tiếng vào',k:K,fixed:1,
 x:(c,d)=>{const w=P(d.who);return w?`Người làng xì xào: ${N(w)} hay lén gặp ${ptN((w.tinh||{}).pt)}. Chuyện đến tai gia chủ.`:''},
 o:(c,d)=>{const w=P(d.who);if(!w||!w.tinh)return [{l:'Cho qua',f:()=>''}];return [
  {l:'Gọi về hỏi chuyện, bảo qua lại cho đàng hoàng',ax:{rong:1},f:c=>{G.addRel(w,c,4);return `${N(w)} cúi đầu nhận lời, mừng thầm.`}},
  {l:'Cấm tiệt',ax:{rong:-1},f:c=>{w.tinh.aff=Math.max(0,w.tinh.aff-20);G.addRel(w,c,-8);return `${N(w)} khóc, nhưng không dám cãi.`+fx(w,{tam:-10})}},
  {l:'Mặc kệ, chuyện trẻ con',f:c=>'Lời đồn rồi cũng lắng.'}]}},
{id:'rd_ra_mat',t:'Xin cưới người thương',k:K,fixed:1,
 x:(c,d)=>{const w=P(d.who);const t=w&&w.tinh;if(!t)return '';const pt=t.pt;const cl=pt.cid?G.rel.bySur(pt.sur):null;const dt=pt.tier-G.tierIdx();
  return `${N(w)} quỳ trước gia chủ xin cưới ${ptN(pt)}. Nhà bên ấy ${dt>=2?'cao hơn nhà mình nhiều bậc':dt<=-2?'thấp hơn nhà mình nhiều bậc':'ngang nhà mình'}${cl?`, quan hệ hai họ: ${esc(G.rel.bandN(cl.rel).toLowerCase())}`:''}. Người ấy ${pt.tinh}.`},
 o:(c,d)=>{const w=P(d.who);const t=w&&w.tinh;if(!t||!G.inClan(w)||w.spouse)return [{l:'Cho qua',f:()=>''}];const pt=t.pt;return [
  {l:'Cho hai đứa thành thân',ax:{rong:1},f:c=>{const far=Math.abs(pt.tier-G.tierIdx())>=3;T.marry(w,pt);if(far)G.cf(-2,'Kết thân không môn đăng hộ đối');return `Hai nhà định ngày. ${N(w)} và ${ptN(pt)} nên duyên.`+fx(w,{tam:15})}},
  {l:'Bắt chờ, lập nghiệp trước rồi tính',ax:{diem:1},f:c=>{G.later(w,'rd_lua_chon',24);return `${N(w)} ngậm ngùi chờ.`+fx(w,{tam:-5})}},
  {l:'Cấm, bắt chia tay',ax:{rong:-1},f:c=>{if(G.axv(w,'dl')>=65&&G.axv(w,'ht')<45&&chance(0.5)){T.elope(w,pt);return `Đêm ấy ${N(w)} bỏ nhà đi theo ${ptN(pt)}.`}
    w.flags.tinhCu=pt;w.tinh=null;G.addRel(w,c,-15);if(chance(0.4))G.later(w,'rd_tai_ngo',R(36,84));return `${N(w)} nghe lời, nhưng từ đó ít cười hẳn.`+fx(w,{tam:-18})}}]}},
{id:'rd_lua_chon',t:'Ngã rẽ',k:K,fixed:1,
 x:c=>`Đã đến lúc ${N(c)} và ${ptN((tinh(c)||{}).pt)} phải quyết chuyện trăm năm.`,
 o:c=>{const t=tinh(c);if(!t||c.spouse)return [{l:'Thôi',f:c=>{c.tinh=null;return 'Duyên đã lỡ.'}}];const o=[];
  if(G.isHead(c))o.push({l:'Thành thân',f:c=>{T.marry(c,t.pt);return 'Hôn lễ giản dị mà ấm cúng.'+fx(c,{tam:15})}});
  else o.push({l:'Xin gia chủ lần nữa',f:c=>{toHead(c,'rd_ra_mat',{who:c.id});return 'Lại quỳ trước gia chủ.'}},{l:'Bỏ trốn theo nhau',ax:{dl:2,ht:-2},f:c=>{T.elope(c,t.pt);return 'Hai người bỏ xứ ra đi.'}});
  o.push({l:'Chia tay',ax:{diem:1},f:c=>{c.flags.tinhCu=t.pt;c.tinh=null;return 'Mỗi người một ngả.'+fx(c,{tam:-10})}});return o}},
{id:'rd_xa_cach',t:'Xa cách',k:K,cd:60,w:0.6,c:c=>!!c.tinh&&c.tinh.st>=1&&c.tinh.st<4&&!c.spouse,
 x:c=>`Nhà ${ptN((tinh(c)||{}).pt)} sắp dọn đi nơi xa. Hai người không biết bao giờ mới gặp lại.`,
 o:c=>{const t=tinh(c);if(!t)return [{l:'Thôi',f:()=>''}];return [
  {l:'Hẹn chờ ngày gặp lại',ax:{yc:1},f:c=>{c.flags.tinhCu=t.pt;c.tinh=null;G.later(c,'rd_tai_ngo',R(24,60));return 'Lời hẹn được trao. Chờ được hay không là chuyện của thời gian.'+fx(c,{tam:-6})}},
  {l:'Buông tay',ax:{diem:1},f:c=>{c.tinh=null;return 'Coi như một giấc mộng đẹp.'+fx(c,{tam:-8})}}]}},
{id:'rd_tai_ngo',t:'Tái ngộ',k:K,fixed:1,
 x:c=>`Nhiều năm sau, ${N(c)} gặp lại ${ptN(c.flags.tinhCu)}. Người ấy vẫn chưa thành gia thất.`,
 o:c=>{const pt=c.flags.tinhCu;if(!pt||c.spouse)return [{l:'Mỉm cười chào nhau',f:c=>{c.flags.tinhCu=null;return 'Người cũ, chuyện cũ.'}}];return [
  {l:'Nối lại duyên xưa',ax:{yc:1},f:c=>{c.tinh={pt,st:3,aff:60,t:S().t};c.flags.tinhCu=null;if(G.isHead(c))G.later(c,'rd_lua_chon',1);else toHead(c,'rd_ra_mat',{who:c.id});return 'Lời hẹn năm nào hóa ra chưa ai quên.'+fx(c,{tam:12})}},
  {l:'Đã muộn rồi',f:c=>{c.flags.tinhCu=null;return 'Chào nhau một tiếng, rồi thôi.'+fx(c,{tam:-3})}}]}},
{id:'rd_lau_ngay',t:'Lâu ngày sinh tình',k:K,pcd:9999,w:0.8,c:c=>{const s=spIn(c);return !!s&&['cuongep','chinhtri','loiich','sasut'].includes(c.marT)&&(c.love||50)<45&&c.flags.wedT!=null&&S().t-c.flags.wedT>=24&&S().t-c.flags.wedT<=120},
 x:c=>`Cưới nhau vì sắp đặt, ${N(c)} và ${esc((spIn(c)||{}).given||'người bên gối')} vốn chẳng mặn mà. Vậy mà mấy năm chung nhà, có những lúc thấy lòng ấm lạ.`,
 o:[{l:'Mở lòng với người bên gối',ax:{rong:1,hd:1},f:c=>{const s=spIn(c);if(s){c.love=s.love=Math.min(100,(c.love||40)+22)}return 'Hai người bắt đầu trò chuyện như vợ chồng thật sự.'+fx(c,{tam:8})}},
    {l:'Vẫn giữ khoảng cách',ax:{hd:-1},f:c=>'Chung một mái nhà, mỗi người một cõi.'+fx(c,{tam:-2})}]},
{id:'rd_tinh_phai',t:'Tình phai',k:K,pcd:9999,w:0.6,c:c=>{const s=spIn(c);return !!s&&!['cuongep','chinhtri','loiich'].includes(c.marT)&&(c.love||50)<30&&c.flags.wedT!=null&&S().t-c.flags.wedT<=120},
 x:c=>`Cưới nhau vì thương, mà nay ${N(c)} và ${esc((spIn(c)||{}).given||'người bên gối')} cứ mở miệng là cãi.`,
 o:[{l:'Ngồi lại nói chuyện cho ra lẽ',r:[{eq:1},55],ax:{diem:1},y:c=>{const s=spIn(c);if(s)c.love=s.love=Math.min(100,(c.love||30)+15);return 'Nói hết lòng, hai người nhận ra vẫn còn thương.'+fx(c,{tam:6})},n:c=>{const s=spIn(c);if(s)c.love=s.love=Math.max(0,(c.love||30)-5);return 'Càng nói càng xa.'+fx(c,{tam:-6})}},
    {l:'Mỗi người một góc',f:c=>'Lặng lẽ sống cạnh nhau.'+fx(c,{tam:-3})}]},

/* ===================== Chi họ xa ===================== */
{id:'br_dan_cau',t:'Dân địa phương cầu kiến',k:'Chi họ',cd:72,job:['quan'],c:c=>!!fh(c)&&isLead(c),
 x:c=>`Dân quanh ${esc(G.provN(fh(c).p))} kéo đến nhà ${N(c)}, xin giúp chuyện ${pick(['đắp lại con đê vỡ','một vụ kiện đất','nạn cướp đường'])}.`,
 o:[{l:'Đứng ra giúp',ax:{rong:1},f:c=>{const H=fh(c);H.lfame=(H.lfame||0)+8;return 'Tiếng tốt của chi lan khắp vùng.'+fx(c,{fame:5})}},{l:'Khéo từ chối',f:c=>'Dân ra về.'}]},
{id:'br_xay_nha',t:'Chi họ dựng nhà mới',k:'Chi họ',cd:120,c:c=>{const H=fh(c);return !!H&&isLead(c)&&H.home<3&&H.money>=m(25)},
 x:c=>`${esc(fh(c).name)} ở ${esc(G.provN(fh(c).p))} đã khá giả. Người trong chi muốn dựng nhà khang trang hơn.`,
 o:c=>{const H=fh(c);const v=m(25);return [{l:`Dựng nhà mới (${FM(v)})`,c:()=>H.money>=v,f:c=>{H.money-=v;H.home=Math.min(5,H.home+1);return 'Nhà mới dựng xong, cả chi mở tiệc.'+fx(c,{tam:6})}},{l:'Còn ở được, chưa cần',ax:{tiet:1},f:c=>'Để dành tiền làm việc khác.'}]}},
{id:'br_ket_giao',t:'Họ địa phương muốn kết giao',k:'Chi họ',cd:96,c:c=>!!fh(c)&&isLead(c),
 x:c=>`Một họ lớn ở ${esc(G.provN(fh(c).p))} mời ${esc(fh(c).name)} sang chơi, ngỏ ý kết giao.`,
 o:[{l:'Nhận lời',ax:{hd:1},f:c=>{const H=fh(c);H.lrel=(H.lrel||0)+15;return 'Chi họ có chỗ dựa ở đất mới.'+fx(c,{tam:3})}},{l:'Giữ khoảng cách',f:c=>'Ở đất khách, dè dặt vẫn hơn.'}]},
{id:'br_quan_kho',t:'Quan trên địa phương gây khó',k:'Chi họ',cd:96,job:['quan'],c:c=>!!fh(c)&&isLead(c),
 x:c=>`Quan trên ở ${esc(G.provN(fh(c).p))} không ưa người từ nơi khác tới, việc gì của ${N(c)} cũng bị bới móc.`,
 o:c=>{const v=m(8);return [{l:`Biếu lễ cho êm (${FM(v)})`,c:()=>(fh(c).money||0)>=v,ax:{diem:1},f:c=>{fh(c).money-=v;return 'Quan trên dịu giọng.'}},{l:'Cứng rắn, làm đúng phép',ax:{gan:1,thanh:1},f:c=>'Hai bên gườm nhau.'+fx(c,{risk:8,fame:3})}]}},
{id:'br_cuoi_ban_dia',t:'Con cháu chi xa lấy người bản địa',k:'Chi họ',cd:96,c:c=>{const H=fh(c);return !!H&&isLead(c)&&G.alive().some(p=>p.hh===c.hh&&G.inClan(p)&&!p.spouse&&!p.away&&G.age(p)>=18&&G.age(p)<=28&&p.g==='nam')},
 x:c=>{const p=G.alive().find(p=>p.hh===c.hh&&G.inClan(p)&&!p.spouse&&!p.away&&G.age(p)>=18&&G.age(p)<=28&&p.g==='nam');return `${p?N(p):'Con cháu trong chi'} muốn cưới một cô gái người ${esc(G.provN(fh(c).p))}.`},
 o:c=>{const p=G.alive().find(p=>p.hh===c.hh&&G.inClan(p)&&!p.spouse&&!p.away&&G.age(p)>=18&&G.age(p)<=28&&p.g==='nam');return [
  {l:'Cho cưới',ax:{rong:1},f:c=>{if(p)G.mkSpouse(p,true);return 'Chi họ bám rễ sâu thêm ở đất mới.'+fx(c,{tam:4})}},
  {l:'Muốn con cưới người quê nhà',ax:{ht:1},f:c=>{if(p)G.addStat(p,'tam',-8);return 'Lời cha mẹ khó cãi.'}}]}},
{id:'br_xin_vien_tro',t:'Chi xa xin viện trợ',k:'Chi họ',fixed:1,
 x:(c,d)=>{const H=S().hh[d.hh];return H?`${esc(H.name)} ở ${esc(G.provN(H.p))} gửi thư về: ${pick(['mất mùa','nhà cháy','người đứng đầu chi lâm bệnh'])}, quỹ chi cạn, xin chính họ giúp.`:''},
 o:(c,d)=>{const H=S().hh[d.hh];if(!H)return [{l:'Cho qua',f:()=>''}];const v=m(15);return [
  {l:`Gửi tiền giúp (${FM(v)})`,c:()=>G.money()>=v,ax:{rong:1},f:c=>{S().money-=v;H.money+=v;H.gan=Math.min(100,(H.gan??60)+12);return 'Thư cảm tạ gửi về, lời lẽ thiết tha.'}},
  {l:'Từ chối, bảo chi tự lo',ax:{rong:-1},f:c=>{H.gan=Math.max(0,(H.gan??60)-15);return 'Chi xa không viết thư về nữa.'}}]}},
{id:'br_thien_tai',t:'Chi xa gặp nạn',k:'Chi họ',cd:120,w:0.6,c:c=>!!fh(c)&&isLead(c),
 x:c=>`${esc(fh(c).name)} ở ${esc(G.provN(fh(c).p))} gặp ${pick(['lũ lớn','dịch bệnh','giặc cướp'])}, thiệt hại không nhỏ.`,
 o:c=>{const H=fh(c);return [{l:'Viết thư xin chính họ giúp',f:c=>{H.money=Math.max(0,H.money-m(6));toHead(c,'br_xin_vien_tro',{hh:c.hh});return 'Thư được gửi về quê.'}},{l:'Tự gồng gánh',ax:{dl:1},f:c=>{H.money-=m(10);return 'Chi họ cắn răng qua cơn khó.'+fx(c,{tam:-4})}}]}},
{id:'br_dong_gop',t:'Đòi chi xa đóng góp',k:'Chi họ',head:1,cd:120,w:0.6,c:c=>farOf().some(id=>S().hh[id].money>m(40)&&S().hh[id].st!=='doclap'),
 x:c=>{const id=farOf().find(id=>S().hh[id].money>m(40)&&S().hh[id].st!=='doclap');if(!id)return 'Chuyện của chi họ ở xa.';return `Công quỹ cần tiền. ${esc(S().hh[id].name)} ở xa dạo này làm ăn khấm khá.`},
 o:c=>{const id=farOf().find(id=>S().hh[id].money>m(40)&&S().hh[id].st!=='doclap');const H=S().hh[id];if(!H)return [{l:'Cho qua',f:()=>''}];return [
  {l:'Đòi chi xa nộp một phần năm quỹ',ax:{tv:1},f:c=>{const v=Math.round(H.money*0.2);H.money-=v;S().money+=v;H.gan=Math.max(0,(H.gan??60)-10);return `Chi xa nộp về ${FM(v)}, kèm lời than.`}},
  {l:'Thôi, để chi tự lo',ax:{rong:1},f:c=>{H.gan=Math.min(100,(H.gan??60)+4);return 'Chi xa biết chính họ thương mình.'}}]}},
{id:'br_tach_ra',t:'Chi xa muốn tách ra',k:'Chi họ',head:1,cd:180,c:c=>farOf().some(id=>(S().hh[id].gan??60)<30&&S().hh[id].st!=='doclap'),
 x:c=>{const id=farOf().find(id=>(S().hh[id].gan??60)<30&&S().hh[id].st!=='doclap');if(!id)return 'Chuyện của chi họ ở xa.';return `${esc(S().hh[id].name)} ở ${esc(G.provN(S().hh[id].p))} gửi thư: chi đã đủ lớn, xin được tự lập, không phải nộp gì về chính họ nữa.`},
 o:c=>{const id=farOf().find(id=>(S().hh[id].gan??60)<30&&S().hh[id].st!=='doclap');const H=S().hh[id];if(!H)return [{l:'Cho qua',f:()=>''}];return [
  {l:'Cho tách, thành chi độc lập',ax:{rong:1},f:c=>{H.st='doclap';G.qt.log('Chi họ tự lập',`${H.name} ở ${G.provN(H.p)} tự lập, không còn chịu sự quản của chính họ.`);return 'Từ nay hai bên chỉ còn tình họ hàng.'}},
  {l:'Không cho',ax:{rong:-1},f:c=>{H.gan=Math.max(0,(H.gan??60)-10);return 'Chi xa im lặng, nhưng lòng đã khác.'}}]}},
{id:'br_manh_hon',t:'Chi xa lớn mạnh hơn chính họ',k:'Chi họ',head:1,cd:240,c:c=>farOf().some(id=>S().hh[id].money>Math.max(G.money()*1.5,m(80))),
 x:c=>{const id=farOf().find(id=>S().hh[id].money>Math.max(G.money()*1.5,m(80)));if(!id)return 'Chuyện của chi họ ở xa.';return `Tin về quê: ${esc(S().hh[id].name)} nay giàu hơn cả nhà chính. Có người trong họ bắt đầu so bì.`},
 o:c=>{const id=farOf().find(id=>S().hh[id].money>Math.max(G.money()*1.5,m(80)));const H=S().hh[id];if(!H)return [{l:'Cho qua',f:()=>''}];return [
  {l:'Mừng cho chi, mời chi chủ về giỗ tổ',ax:{rong:1},f:c=>{H.gan=Math.min(100,(H.gan??60)+10);return 'Ngày giỗ tổ năm ấy đông vui hơn mọi năm.'+fx(c,{cfame:2})}},
  {l:'Đòi chi nộp nhiều hơn',ax:{tv:1,rong:-1},f:c=>{const v=Math.round(H.money*0.25);H.money-=v;S().money+=v;H.gan=Math.max(0,(H.gan??60)-15);return `Chi xa nộp về ${FM(v)}. Mối gắn bó sứt mẻ.`}}]}},

/* ===================== Gia đình người đi lính ===================== */
{id:'lq_dua_vo',t:'Đưa vợ con theo vào doanh trại',k:'Quân ngũ',fixed:1,
 x:(c,d)=>{const w=P(d.who);const s=w&&spIn(w);return w&&s?`${N(w)} vào quân ngũ. Lệ cho phép lính đưa vợ con theo, ở trong trại gia binh cạnh doanh trại. ${esc(s.given)} đi hay ở?`:''},
 o:(c,d)=>{const w=P(d.who);const s=w&&spIn(w);if(!w||!s)return [{l:'Cho qua',f:()=>''}];const kids=G.kidsOf(w).filter(k=>G.inClan(k)&&G.age(k)<16&&!k.away);return [
  {l:'Đưa vợ con theo',ax:{hd:1},f:c=>{[s,...kids].forEach(p=>{p.away={type:'follow',of:w.id,p:null}});return `${esc(s.given)}${kids.length?' cùng các con':''} theo ${N(w)} vào trại gia binh.`+fx(w,{tam:8})}},
  {l:'Để vợ con ở quê',f:c=>`${esc(s.given)} ở lại quê nhà, chờ ngày chồng về phép.`+fx(w,{tam:-4})}]}},
{id:'lq_phep',t:'Lính về phép',k:'Quân ngũ',fixed:1,
 x:(c,d)=>{const w=P(d.who);return w?`${N(w)} được về phép một tháng.${!spIn(w)&&G.age(w)>=18?' Nhà mình đang tính chuyện vợ con cho người ấy.':''}`:''},
 o:(c,d)=>{const w=P(d.who);if(!w||!G.inClan(w)||!(w.away&&w.away.type==='army'))return [{l:'Cho qua',f:()=>''}];const s=spIn(w);const o=[];
  if(!s&&G.age(w)>=18){o.push({l:'Nhân dịp phép cưới vợ, cưới xong đưa vợ theo doanh trại',f:c=>{const sp=G.mkSpouse(w,false);if(sp){sp.away={type:'follow',of:w.id,p:null}}w.flags.phepT=S().t;return `Đám cưới vội trong tháng phép. Vợ mới theo ${N(w)} ra trại.`+fx(w,{tam:12})}},
    {l:'Nhân dịp phép cưới vợ, vợ ở lại quê nhà',f:c=>{G.mkSpouse(w,false);w.flags.phepT=S().t;return `Cưới xong được nửa tháng, ${N(w)} lại lên đường. Vợ mới ở nhà chờ.`+fx(w,{tam:8})}})}
  if(s&&!s.away){o.push({l:'Vợ chồng đoàn tụ một tháng',f:c=>{w.flags.phepT=S().t;return 'Một tháng ngắn ngủi mà quý.'+fx(w,{tam:10})+fx(s,{tam:8})}},
    {l:'Lần này đưa vợ con theo luôn',f:c=>{const kids=G.kidsOf(w).filter(k=>G.inClan(k)&&G.age(k)<16&&!k.away);[s,...kids].forEach(p=>{p.away={type:'follow',of:w.id,p:null}});w.flags.phepT=S().t;return 'Cả nhà nhỏ theo người lính ra trại.'+fx(w,{tam:8})}})}
  o.push({l:'Về thăm nhà vài hôm rồi đi',f:c=>{w.flags.phepT=S().t;return 'Cơm nhà, mấy hôm là hết phép.'+fx(w,{tam:5})}});return o}},
{id:'lq_vo_nho',t:'Vợ lính ở quê',k:'Quân ngũ',cd:60,g:'nữ',c:c=>{const s=G.spouseOf(c);return !!s&&G.inClan(s)&&s.job==='quan_ngu'&&s.away&&s.away.type==='army'&&!c.away},
 x:c=>`Chồng đi lính đã lâu, ${N(c)} một mình lo việc nhà, đêm đêm nhớ chồng.`,
 o:c=>{const v=m(2);const s=G.spouseOf(c);return [{l:'Viết thư gửi lên doanh trại',f:c=>'Lá thư đi mấy tháng mới tới.'+fx(c,{tam:4})},
  {l:`Lặn lội lên thăm chồng (${FM(v)})`,c:()=>G.money()>=v,ax:{gan:1},f:c=>{S().money-=v;if(s)s.flags.phepT=S().t;return 'Gặp nhau được mấy hôm ở trại gia binh.'+fx(c,{tam:10})}}]}}
];});
