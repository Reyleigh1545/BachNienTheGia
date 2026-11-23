/* Bách Niên Thế Gia v6.7.10-d9.10 · quan trường sống hơn (mục 12): xung đột giữa các quan (không chỉ do vua nghi kỵ), hồ sơ riêng Quốc công Phạm Nhật Vượng, chuỗi liên hôn với quan và đưa người lên kinh dài thêm (lh_buoc3 đến 5, kinh_buoc3 đến 5, có ngã rẽ). Thế gia tranh ghế (seatCands) và chi phí giữ quan hệ (relYear) ở engine. */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const N=c=>esc(c.given);const FM=v=>G.fmtMoney(v);
const nbOf=c=>G.npc.boss(c,0),peerOf=c=>G.npc.boss(c,1);
const rel=(b,v)=>G.npc.add(b.st,'rel',v);
const QX=o=>Object.assign({tags:{},k:'Quan trường',job:['quan'],age:[30,75],ms:1,w:0.7,pcd:96,cd:48},o);
const vuong=()=>{const f=G.fam.ens();return (f.qc||[]).find(p=>p.dead==null&&p.n==='Phạm Nhật Vượng')};
const VG=o=>Object.assign({tags:{},k:'Hoàng tộc',job:['quan'],age:[34,75],ms:1,w:0.5,pcd:120,cd:60,c:c=>c.lv>=3&&G.inKinh(c)&&!!vuong()},o);
const W=(id,t,xf,of)=>({id,t,k:'Hôn sự',fixed:1,head:1,x:(c,d)=>{const w=d.w?G.P(d.w):null;return w?xf(c,d,w):'Chuyện cũ không còn ai nhắc.'},o:(c,d)=>{const w=d.w?G.P(d.w):null;if(!w)return [{l:'Tiếc',f:()=>''}];return of(c,d,w)}});
return [
/* ===== xung đột giữa các quan ===== */
QX({id:'qx_dong_lieu_hac',t:'Đồng liêu dâng sớ hặc mình',c:c=>c.seat&&c.lv>=3&&!!peerOf(c),
 x:c=>{const b=peerOf(c);return `${esc(b.st.n)}, đồng liêu cùng nha môn, dâng sớ nói ${N(c)} nhận lễ của người ngoài. Chưa có chứng cứ, nhưng cả nha môn đang chờ xem thượng quan xử ra sao.`},
 o:c=>{const b=peerOf(c);if(!b)return [{l:'Đứng ngoài',f:()=>''}];return [
  {l:'Dâng sớ tự biện, nêu rõ từng khoản',r:[{tri:1,eq:0.6},55],y:c=>{rel(b,-12);return 'Sớ tự biện rõ ràng, thượng quan xét xong cho rằng đó là vu cáo. Kẻ hặc bị khiển trách.'+fx(c,{fame:R(4,8),risk:-3,tam:4})},n:c=>{rel(b,-8);return 'Sớ không đủ sức thuyết phục, bị ghi một lời nhắc nhở.'+fx(c,{risk:4,fame:-3,tam:-5})}},
  {l:'Nhờ người thân tín nói giúp',r:[{eq:0.8,khau:0.7},45],y:c=>{rel(b,-6);return 'Mấy người quen lên tiếng, vụ việc nhẹ dần.'+fx(c,{risk:-2,tam:2})},n:c=>{rel(b,-8);return 'Bị cho là kéo bè kết phái, vụ việc càng lớn.'+fx(c,{risk:6,fame:-4,tam:-4})}},
  {l:'Lặng lẽ chờ, không phản ứng',f:c=>{rel(b,2);return 'Chuyện qua đi, nhưng nhiều người ngờ có thật.'+fx(c,{risk:2,fame:-2,tam:-2})}}]}}),
QX({id:'qx_phe_nhom',t:'Kéo bè kết phái trong nha môn',c:c=>c.seat&&c.lv>=3&&!!peerOf(c),
 x:c=>{const b=peerOf(c);return `Trong nha môn đang chia hai phe tranh chuyện bổ nhiệm. ${esc(b.st.n)} đến gặp ${N(c)}: ông muốn mình đứng về phe ông trong buổi họp tới, đổi lại sẽ đỡ lời khi cần.`},
 o:c=>{const b=peerOf(c);if(!b)return [{l:'Đứng ngoài',f:()=>''}];return [
  {l:'Đứng về phe ông ta',f:c=>{rel(b,15);return 'Phe ông thắng. Ông nhớ ơn, nhưng phe kia ghi tên mình.'+fx(c,{fav:5,risk:5,fame:2,tam:-1})}},
  {l:'Giữ thế trung lập, chỉ nói theo lẽ phải',r:[{eq:1,gan:0.6},50],y:c=>{rel(b,-3);return 'Cả hai phe đều không hài lòng, nhưng thượng quan khen người biết giữ mình.'+fx(c,{fame:R(3,6),risk:-2,tam:2})},n:c=>{rel(b,-8);return 'Cả hai phe đều coi mình là kẻ không đáng tin.'+fx(c,{fame:-3,risk:3,tam:-4})}},
  {l:'Báo thượng quan về việc kéo bè',r:[{gan:1,tri:0.6},40],y:c=>{rel(b,-18);return 'Thượng quan ghi công người ngay thẳng. Kẻ kéo bè bị khiển trách.'+fx(c,{fame:R(5,9),risk:-3,fav:4})},n:c=>{rel(b,-18);return 'Thượng quan làm ngơ, còn mình bị ghi hận.'+fx(c,{risk:6,fame:-3})}}]}}),
QX({id:'qx_giao_dap',t:'Quan trên đổi ghế, đồng liêu tranh chỗ',c:c=>c.seat&&c.lv>=3&&!!nbOf(c),pcd:120,
 x:c=>{const b=nbOf(c);return `Tin đồn ${esc(b.st.n)}, thượng quan trực tiếp, sắp được điều đi nơi khác, ghế của ông sẽ trống. Trong nha môn người nào cũng ngầm lo chạy chọt, ${N(c)} cũng nghe người đến gợi ý.`},
 o:c=>{const b=nbOf(c);if(!b)return [{l:'Mặc kệ',f:()=>''}];const v=m(40);return [
  {l:`Lo chạy cho mình một chân (${FM(v)})`,c:()=>G.money()>=v,r:[{khau:1,eq:0.6},45],y:c=>{S().money-=v;rel(b,4);return 'Món lễ đến đúng chỗ. Ghế trống có tên mình trong danh sách rút ngắn.'+fx(c,{fav:6,risk:3,liem:-3,fame:2})},n:c=>{S().money-=v;return 'Lễ đi mà không có hồi âm, còn bị người ta biết chuyện chạy chọt.'+fx(c,{risk:6,fame:-4,liem:-3})}},
  {l:'Giữ mình, làm tròn việc được giao',f:c=>{rel(b,3);return 'Thượng quan thấy rõ cái điềm đạm. Trước khi đi ông ghi lời tốt cho mình.'+fx(c,{fav:3,fame:2,tam:2})}}]}}),
/* ===== Quốc công Phạm Nhật Vượng ===== */
VG({id:'vuong_gap_mat',t:'Quốc công Phạm Nhật Vượng ghé nha môn',once:1,
 x:c=>`Quốc công Phạm Nhật Vượng, võ tướng, con trưởng Phạm Xuân Huấn, ghé nha môn nơi ${N(c)} làm việc. Ông ít nói, nhìn từng người một. Người trong nha môn nói ông hiền hơn em và không thích những chuyện quanh co.`,
 o:c=>[{l:'Thưa chuyện công việc, nói thẳng',r:[{eq:0.8,tri:0.6},60],y:c=>{const v=vuong();if(v)v.rel=Math.min(100,(v.rel||0)+12);return 'Quốc công gật gù, hỏi thêm vài câu rồi ghi nhớ tên mình.'+fx(c,{fame:R(4,8),fav:3,tam:3})},n:c=>'Nói vụng, ông không tỏ thái độ, lặng lẽ đi.'+fx(c,{tam:-2})},
  {l:'Chào theo lễ rồi lui',f:c=>{const v=vuong();if(v)v.rel=Math.min(100,(v.rel||0)+3);return 'Ông gật đầu đáp lễ.'+fx(c,{fame:1})}}]}),
VG({id:'vuong_nho_viec',t:'Quốc công nhờ tiến cử một võ quan',c:c=>c.lv>=4&&G.inKinh(c)&&!!vuong()&&!!(vuong().rel>=10),
 x:c=>`Quốc công Phạm Nhật Vượng nhờ ${N(c)} một việc kín: ông có một viên võ quan trẻ tài giỏi nhưng xuất thân thấp, muốn tìm đường cho vào ghế tốt. Ông không ép, chỉ bảo "người ngay thì giúp".`,
 o:c=>[{l:'Giúp, đứng ra tiến cử',r:[{eq:0.8,khau:0.6},55],y:c=>{const v=vuong();if(v)v.rel=Math.min(100,(v.rel||0)+15);return 'Viên võ quan được bổ ghế tốt. Quốc công nhớ ơn, về sau nhắc tên nhà mình khi cần.'+fx(c,{fame:R(5,10),fav:4,risk:2,tam:4})},n:c=>{const v=vuong();if(v)v.rel=Math.min(100,(v.rel||0)+4);return 'Đường vào ghế không thành. Quốc công vẫn cảm ơn công sức.'+fx(c,{tam:-2})}},
  {l:'Từ chối khéo, nói đó là việc của bộ Binh',f:c=>{const v=vuong();if(v)v.rel=Math.max(-100,(v.rel||0)-4);return 'Ông không giận, nhưng lạnh đi một chút.'+fx(c,{tam:-1})}}]}),
VG({id:'vuong_hon_su',t:'Quốc công ngỏ lời kết thông gia',c:c=>c.lv>=4&&G.inKinh(c)&&!!vuong()&&!!(vuong().rel>=25)&&G.kinList(c,p=>!G.married(p)&&G.age(p)>=17&&G.age(p)<=32).length>0,once:1,
 x:c=>`Quốc công Phạm Nhật Vượng ngỏ lời với ${N(c)}: nhà ông có một người cháu đến tuổi lập gia đình, ông muốn kết thông gia với một người con em trong nhà mình. Một mối thân như vậy có thể che chở cả hai bên.`,
 o:c=>[{l:'Chọn một người trong nhà kết thông gia',c:c=>G.kinList(c,p=>!G.married(p)&&G.age(p)>=17&&G.age(p)<=32).length>0,go:(c,d)=>G.pickKin(c,{eyebrow:'Thông gia với Quốc công',title:'Chọn ai kết thông gia',text:'Người được chọn sẽ thành người của nhà Quốc công. Chọn người nào?',filter:p=>!G.married(p)&&G.age(p)>=17&&G.age(p)<=32,cb:w=>{w.left='xuatgia';w.leftT=S().t;w.flags=w.flags||{};w.flags.tgq=1;S().tgq=(S().tgq||0)+2;const v=vuong();if(v)v.rel=Math.min(100,(v.rel||0)+25);G.log(`${G.nameOf(w)} về làm dâu rể nhà Quốc công.`,'gd');return `${esc(w.given)} về nhà Quốc công, lễ cưới long trọng. Hai nhà thành thông gia, che chở lẫn nhau.`+fx(c,{fame:R(10,18),cfame:6,tam:5})+fx(w,{tam:5})}})},
  {l:'Từ chối khéo, nói con em còn nhỏ',f:c=>{const v=vuong();if(v)v.rel=Math.max(-100,(v.rel||0)-6);return 'Quốc công hơi tiếc, nhưng không để bụng.'+fx(c,{tam:-1})}}]}),
/* ===== chuỗi liên hôn với quan: bước 3 đến 5 ===== */
W('lh_buoc3','Nhà thông gia quan có con cháu',(c,d,w)=>`Mấy năm trôi, nhà thông gia quan đã có cháu nhỏ. ${esc(w.given)} gửi thư báo tin, ${d.ok?'ông thông gia mở tiệc đầy tháng lớn, mời nhà mình đến dự':'dù không được thương lắm, đứa nhỏ vẫn là cháu của cả hai nhà'}.`,(c,d,w)=>{const v=m(15);return [
  {l:`Đem quà mừng hậu, cả nhà đến dự (${FM(v)})`,c:()=>G.money()>=v,f:c=>{S().money-=v;G.later(c,'lh_buoc4',R(36,60),{w:d.w,ok:d.ok});return 'Tiệc đầy tháng đông vui. Hai nhà ngồi cạnh nhau, tình thông gia thêm đầm ấm.'+fx(c,{fame:3,cfame:1,tam:4})+fx(w,{tam:4})}},
  {l:'Gửi quà qua người, không đến',f:c=>{G.later(c,'lh_buoc4',R(36,60),{w:d.w,ok:0});return 'Người nhà thông gia hơi buồn. Mối quan hệ giữ ở mức lễ nghĩa.'+fx(c,{tam:-1})}}]}),
W('lh_buoc4','Nhà thông gia quan gặp sóng gió',(c,d,w)=>`Ông thông gia quan bị đàn hặc nặng, nghe nói tội chưa rõ nhưng cả nhà đang run. ${esc(w.given)} nhắn về nhờ nhà mình lên tiếng, ${d.ok?'vì hai nhà từng thân thiết':'dù mối quan hệ không mặn mà'}.`,(c,d,w)=>{const v=m(30);return [
  {l:`Dốc lực giúp, đứng ra bảo lãnh (${FM(v)})`,c:()=>G.money()>=v,r:[{eq:0.8,khau:0.6,tri:0.4},d.ok?55:40],y:c=>{S().money-=v;G.later(c,'lh_buoc5',R(24,48),{w:d.w,out:'giup'});return 'Nhờ sự bảo lãnh, ông thông gia thoát án. Ơn nghĩa này không dễ quên.'+fx(c,{fame:R(6,12),risk:2,tam:4})+fx(w,{tam:6})},n:c=>{S().money-=v;G.later(c,'lh_buoc5',R(24,48),{w:d.w,out:'chim'});return 'Bảo lãnh không đủ sức, ông thông gia vẫn bị giáng chức. Nhà mình bị liên lụy nhẹ.'+fx(c,{fame:-3,risk:5,tam:-5})+fx(w,{tam:-4})}},
  {l:'Giữ khoảng cách, chờ xem tình hình',f:c=>{if(S().tgq>0)S().tgq--;G.later(c,'lh_buoc5',R(24,48),{w:d.w,out:'xa'});return 'Nhà mình đứng ngoài. Người thông gia ghi nhớ sự lạnh nhạt.'+fx(c,{tam:-3,fame:-2})+fx(w,{tam:-5})}}]}),
W('lh_buoc5','Kết cục mối thông gia quan',(c,d,w)=>d.out==='giup'?`Nhiều năm sau, ông thông gia quan nay đã vững chân, nhớ ơn năm xưa và ngỏ lời tạ. ${esc(w.given)} cũng mang tin vui về.`:d.out==='chim'?`Ông thông gia quan nay đã về hưu, quyền thế mất hết. ${esc(w.given)} nhắn nhờ nhà mình giúp một chuyến cuối.`:`Mối thông gia quan đã nhạt hẳn. ${esc(w.given)} gửi thư thăm hỏi, mong nhà mình còn nhớ.`,(c,d,w)=>d.out==='giup'?[
  {l:'Nhận lời tạ, kết thân sâu hơn',f:c=>{S().tgq=(S().tgq||0)+1;return 'Hai nhà qua lại thân như người một nhà. Đường quan của cả họ được che chở lâu dài.'+fx(c,{fame:R(8,14),cfame:3,tam:5})}}]:d.out==='chim'?[
  {l:'Giúp một lần, đón ông về nghỉ',f:c=>'Ông thông gia vui lòng, tình nghĩa tròn vẹn dù không còn quyền thế.'+fx(c,{fame:3,tam:3})+fx(w,{tam:6})},
  {l:'Gửi chút lễ rồi thôi',f:c=>{if(S().tgq>0)S().tgq--;return 'Mối thông gia coi như chấm dứt, còn lại chữ tình nhạt.'+fx(c,{tam:-1})}}]:[
  {l:'Viết thư hỏi thăm, giữ tình',f:c=>'Thư qua lại vài lần, tình thân nhẹ nhàng.'+fx(c,{tam:2})+fx(w,{tam:3})}]),
/* ===== chuỗi lên kinh: bước 3 đến 5 ===== */
W('kinh_buoc3','Người ở kinh được đề bạt hay gặp nạn',(c,d,w)=>d.ok?`${esc(w.given)} ở kinh nhiều năm, được một vị quan để ý. Ông này nhắn: sẵn lòng nâng đỡ nếu ${esc(w.given)} chịu theo làm thư lại, nhưng đường ấy gắn chặt với phe ông.`:`${esc(w.given)} ở kinh vẫn lận đận. Gần đây vướng vào một vụ kiện nhỏ, xin nhà gửi thêm tiền chạy chữa.`,(c,d,w)=>{const v=m(20);return d.ok?[
  {l:'Cho theo vị quan ấy',f:c=>{G.later(c,'kinh_buoc4',R(24,48),{w:d.w,ok:1});return `${esc(w.given)} theo làm thư lại, được dạy việc quan trường.`+fx(c,{fame:3,tam:2})+fx(w,{tri:2,eq:1,tam:4})}},
  {l:'Giữ tự do, không theo phe nào',f:c=>{G.later(c,'kinh_buoc4',R(24,48),{w:d.w,ok:0});return `${esc(w.given)} ở lại, tiếp tục tự lo.`+fx(w,{tam:1})}}]:[
  {l:`Gửi tiền chạy chữa (${FM(v)})`,c:()=>G.money()>=v,f:c=>{S().money-=v;G.later(c,'kinh_buoc4',R(24,48),{w:d.w,ok:0});return 'Vụ kiện êm đi. '+esc(w.given)+' biết ơn nhà vẫn nhớ.'+fx(w,{tam:5})}},
  {l:'Gọi về quê, thôi chuyện kinh thành',f:c=>{G.setAway(w,null);if(w.flags)w.flags.kinh=0;return esc(w.given)+' về nhà, bình an.'+fx(w,{tam:2})}}]}),
W('kinh_buoc4','Mời cả nhà lên kinh',(c,d,w)=>`${esc(w.given)} đã có chỗ đứng ở kinh thành. ${d.ok?'Vị quan nâng đỡ':'Một người quen'} gợi ý đưa thêm người trong nhà lên: mở ra nhiều đường nhưng nhà phải gánh thêm chi phí.`,(c,d,w)=>{const v=m(40);return [
  {l:`Cử thêm một người lên kinh (${FM(v)})`,c:()=>G.money()>=v&&G.kinList(c,p=>G.age(p)>=16&&G.age(p)<=35&&!(p.flags&&p.flags.kinh)).length>0,go:(c,d2)=>G.pickKin(c,{eyebrow:'Kinh thành',title:'Cử thêm ai lên kinh',text:'Người này sẽ cùng người đã ở kinh gây dựng. Chọn người nào?',filter:p=>G.age(p)>=16&&G.age(p)<=35&&!(p.flags&&p.flags.kinh),cb:x=>{S().money-=v;x.flags=x.flags||{};x.flags.kinh=1;G.setAway(x,{type:'odo',until:S().t+R(36,60)});G.later(c,'kinh_buoc5',R(36,60),{w:d.w,x:x.id});return `${esc(x.given)} lên kinh nhập cùng ${esc(w.given)}. Hai người nương nhau mà làm ăn.`+fx(c,{fame:3,tam:2})+fx(x,{eq:1,tam:3})}})},
  {l:'Để nguyên, chỉ một người ở kinh là đủ',f:c=>{G.later(c,'kinh_buoc5',R(36,60),{w:d.w});return 'Nhà giữ gọn, không tốn thêm.'+fx(c,{tam:1})}}]}),
W('kinh_buoc5','Đường kinh thành khép lại',(c,d,w)=>`Nhiều năm ở kinh thành, ${esc(w.given)} ${d.x?'cùng người nhà':'một mình'} đã thành người có tiếng trong giới thư lại. Đến lúc chọn: ở lại hẳn kinh thành, hay mang vốn liếng về quê.`,(c,d,w)=>[
  {l:'Ở lại hẳn kinh thành, mở nhánh nhỏ ở đó',f:c=>{if(w.flags)w.flags.kinh=1;S().tgq=(S().tgq||0)+1;return `${esc(w.given)} lập nhà nhỏ ở kinh thành, thành chỗ dựa lâu dài của họ ở triều.`+fx(c,{fame:R(6,12),cfame:3,tam:3})+fx(w,{tam:5})}},
  {l:'Về quê, đem kinh nghiệm và vốn liếng',f:c=>{G.setAway(w,null);return `${esc(w.given)} về quê, mang theo mối quen và ít tiền dành dụm.`+fx(c,{money:m(R(15,30)),fame:3,tam:3})+fx(w,{tri:2,eq:2,tam:4})}}])
];
});
