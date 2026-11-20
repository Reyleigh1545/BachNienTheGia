/* Bách Niên Thế Gia v6.7.0-d9 · mất đất khi lên hương thân (dp_*) và phò mã do triều đình chọn (pc_c0).
   dp_*: kẻ có thế đòi đất hoặc lấn bờ; nhượng hay thua kiện để lại dấu oan_dat và một NPC thật, đời sau có thể trở lại.
   pc_c0: đường thứ hai của cốt truyện Phò mã (đường thứ nhất là pc_0 đến pc_6 do người nhà chủ động): chiếu chọn phò mã. */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const FM=v=>G.fmtMoney(v);const N=c=>esc(c.given);const L=G.led;
const rich=v=>()=>G.money()>=m(v);
const pay=(l,v,o)=>Object.assign({l:`${l} (${FM(m(v))})`,c:rich(v)},o);
const land=()=>(S().farm.own||0)+(S().farm.fld||0);
const DP=o=>Object.assign({tags:{},k:'Đất đai',head:1,age:[28,80],tier:[3,6],cd:48,pcd:96,ms:1,w:1.2},o);
const neighbor=c=>{const np=L.np.new({g:'nam',role:'cuonghao',age:R(38,62)});L.np.mem(np,'oan',{o:c.id,w:70});L.add('oan_dat',[c.id],{n:np.n,np:np.id},{w:75});return np};
const enemy=c=>{const e=L.find(c.id,'oan_dat');return e&&e.d&&e.d.np?L.np.get(e.d.np):null};
const F=()=>G.fam.ens();
const tn=()=>G.tierIdx();
const cong=id=>F().cong.find(p=>p.id===id);
const meet=(p,v)=>{if(p){p.met=1;p.rel=Math.max(-100,Math.min(100,(p.rel||0)+(v||0)))}return ''};
return [
DP({id:'dp_dat_bi_doi',t:'Kẻ có thế đòi đất',c:()=>land()>=3,
 x:c=>`Một nhà có người làm quan lớn trong vùng sai người tới, nói mảnh đất giáp ranh của ${N(c)} vốn là đất công bị chiếm từ đời trước, văn tự cũ mờ. Họ nói nhẹ nhàng, nhưng ai cũng hiểu: nhà nào lên hương thân thì cũng có kẻ nhòm vào.`,
 o:c=>[{l:'Nhượng hai mẫu để yên chuyện',f:c=>{const np=neighbor(c);return `Nhà mình nhượng đất. ${esc(np.n)} nhận, nói vài lời tử tế, và ghi nhớ nhà mình dễ nói chuyện.`+G.landDelta(-2)+fx(c,{tam:-4,cfame:-2})}},
  {l:'Kiện lên huyện',r:[{tri:0.7,khau:0.6},45],y:c=>'Quan huyện xem văn tự gốc, bác lời đòi. Hàng xóm thêm nể nhà mình.'+fx(c,{fame:3,cfame:3}),n:c=>{const np=neighbor(c);return `Huyện xử theo bên có thế. Nhà mình mất đất và mang tiếng thua kiện. ${esc(np.n)} cười nhạt.`+G.landDelta(-2)+fx(c,{money:-m(30),tam:-6})}},
  pay('Lo lót quan huyện',40,{r:[{khau:1,eq:0.4},55],y:c=>'Quan huyện nhận lễ, lờ chuyện đi. Mảnh đất vẫn là của nhà mình.'+fx(c,{money:-m(40),liem:-3}),n:c=>{const np=neighbor(c);return `Lễ nhận rồi mà việc vẫn không êm: huyện bắt nhà mình nhượng bớt. ${esc(np.n)} biết chuyện.`+G.landDelta(-1)+fx(c,{money:-m(40),liem:-5,tam:-5})}})]}),
DP({id:'dp_cuong_hao',t:'Lấn bờ ruộng',c:()=>land()>=2,w:1,
 x:c=>`Mấy hôm nay bờ ranh phía đông đất nhà ${N(c)} nhích dần vào trong từng đêm. Đám người của một nhà có thế trong vùng làm việc ấy không giấu giếm: họ biết nhà mình chưa đủ vây cánh để làm to chuyện.`,
 o:c=>[pay('Thuê người canh bờ ranh',15,{f:c=>'Bờ ranh yên. Nhà kia thôi, nhưng ghi nhớ.'+fx(c,{money:-m(15)})}),
  {l:'Báo quan, đưa bằng chứng',r:[{tri:0.6,eq:0.5},50],y:c=>'Quan sở tại ra lệnh dời cột mốc về chỗ cũ.'+fx(c,{fame:2}),n:c=>{const np=neighbor(c);return `Quan nghe một phía. Cột mốc ở lại chỗ mới. ${esc(np.n)} đứng nhìn từ bên kia bờ.`+G.landDelta(-1)+fx(c,{tam:-4})}},
  {l:'Nhịn, đo lại bờ cho yên',f:c=>{const np=neighbor(c);return `Nhà mình nhịn. ${esc(np.n)} hài lòng và tính tiếp.`+G.landDelta(-1)+fx(c,{tam:-3,cfame:-1})}}]}),
DP({id:'dp_nguoi_cu_doi_dat',t:'Kẻ đòi đất năm xưa trở lại',w:2,mem:{need:['oan_dat']},c:c=>{const n=enemy(c);return !n||n.ok},
 x:c=>{const n=enemy(c);return `${esc(n?n.n:'Người ấy')}${n?`, ${L.np.age(n)} tuổi,`:''} kẻ từng đòi đất của ${N(c)}, nay lại tới. Lần này ông ta nói đến chuyện làm ăn chung, giọng khác hẳn, nhưng ánh mắt vẫn như xưa.`},
 o:c=>[{l:'Tiếp, bàn chuyện hòa giải',r:[{eq:1,tri:0.4},55],y:c=>{L.drop(c,'oan_dat');return 'Hai bên uống chén rượu, gác chuyện cũ. Mối oán nhạt dần.'+fx(c,{fame:3,tam:4})},n:c=>'Ông ta cười và ra về. Mối oán vẫn còn.'+fx(c,{tam:-3})},
  {l:'Không tiếp, đóng cửa',f:c=>'Cửa đóng. Nhà mình giữ thể diện, nhưng ông ta nhớ lâu.'+fx(c,{tam:1})}]}),
/* ---- phò mã do triều đình chọn ---- */
{id:'pc_c0',t:'Chiếu chọn phò mã',k:'Duyên cung đình',tags:{},ms:1,age:[18,35],pcd:240,cd:120,w:0.5,job:['quan'],
 c:c=>c.g==='nam'&&!c.spouse&&!c.inLaw&&c.job==='quan'&&c.lv>=3&&G.inKinh(c)&&tn()>=3&&!(c.flags&&c.flags.pc)&&!(c.flags&&c.flags.pcDone>S().t-120)&&F().cong.some(p=>p.dead==null&&!p.wed&&!p.hold&&p.age>=16&&p.age<=30),
 x:c=>`Nội thị mang chiếu chỉ tới: triều đình tìm phò mã cho công chúa, và tên ${N(c)} nằm trong danh sách Lễ bộ trình lên. Trong nhà ai cũng hiểu đây là vinh dự lớn, và cũng là sợi dây trói: phò mã không được nắm thực quyền.`,
 o:c=>[{l:'Tạ ơn, nhận chiếu',f:c=>{const L2=F().cong.filter(p=>p.dead==null&&!p.wed&&!p.hold&&p.age>=16&&p.age<=30);const p=L2.sort((a,b)=>(b.rel||0)-(a.rel||0))[0];if(!p)return 'Chiếu vừa tới thì người được chọn đã có nơi khác. Chuyện khép lại.';
   c.flags.pc={id:p.id,s:1,st:2,t:S().t};p.hold=c.id;p.holdT=S().t;meet(p,3);G.later(c,'pc_2',R(2,4),{});return `Nhà mình nhận chiếu. Hoàng hậu sẽ cho gọi vào hầu chuyện, rồi mới tới công chúa ${esc(G.fam.name(p))}.`+fx(c,{fame:6,tam:3})}},
  {l:'Xin khất, nói việc nhà chưa xong',r:[{eq:1,khau:0.6},52],y:c=>{c.flags.pcDone=S().t;return 'Lễ bộ nghe lý do, hoãn lại. Không ai trách.'+fx(c,{tam:-1})},n:c=>{c.flags.pcDone=S().t;G.qt.add(c,{risk:10});return 'Lễ bộ cho là chối khéo. Tên nhà mình bị ghi một dấu.'+fx(c,{fame:-4,tam:-4})}},
  {l:'Cáo bệnh',f:c=>{c.flags.pcDone=S().t;G.qt.add(c,{risk:4});return 'Thái y viện cho biết bệnh không nặng. Chuyện bỏ qua, nhưng người ta nhớ.'+fx(c,{suc:-3,tam:-3})}}]}
];});
