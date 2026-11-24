/* Bách Niên Thế Gia · d9.12.66 · ĐỜI SỐNG CỦA TRẺ ĐƯỢC GỬI NUÔI (chủ dự án 24/11: "nhớ ơn mình nhưng 10 năm sau mới 13 tuổi thì lấy gì báo ơn; NPC chưa có cuộc sống thật").
   Chuỗi np_tre_thu -> np_tre_chon_nghe -> np_tre_lon cho bé được gửi nuôi (G.tie.kidAway): tin về lúc nhỏ, chọn đường lúc 14 tuổi (nhà góp lời, nâng đỡ n.sup), tới 18 tuổi mới có nghề, địa vị và mới có thể tạ ơn thật (engine-npc.js: kidLife, becomeAdult).
   Việc hẹn cho NPC dưới 18 tuổi ngoài np_tre_* tự lùi tới khi bé trưởng thành (laterNpc, engine-rg.js). */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const FM=v=>G.fmtMoney(v);const N=c=>esc(c.given);
const T=d=>d&&d.npc?G.tie.get(d.npc):null;const nm=n=>esc(n?n.n:'bé');
const ax=(n,k)=>G.npc.ax(n,k);
const addVai=(n,v)=>{if(n&&!n.vai.includes(v)){n.vai.push(v);n.vaiTxt=n.vai.map(x=>G.tie.VAI[x]||x).join(', ')}};
const pay=(l,v,o)=>Object.assign({l:`${l} (${FM(m(v))})`,c:()=>G.money()>=m(v)},o);
const gone=()=>[{l:'Thôi',f:()=>''}];
const NP=o=>Object.assign({tags:{},k:'Người quen',fixed:1,head:0,ms:1},o);
const A=n=>G.np.age(n);
const ok=n=>!!n&&n.ok!==0;
const bump=(n,k,v)=>{n.st=n.st||{};n.st[k]=Math.min(100,(n.st[k]||50)+v)};
const he=n=>n.g==='nữ'?'cô bé':'cậu bé';
const trait=n=>{const st=n.st||{};if((st.tri||0)>=66)return 'học chữ nhanh, thầy khen luôn miệng';if((st.vo||0)>=66)return 'khỏe và gan, hay đánh nhau với trẻ trong xóm';if((st.eq||0)>=66)return 'hay giúp việc, ai cũng quý';if((st.mi||0)>=66)return 'xinh xắn, nói chuyện dễ nghe';return 'hiền lành, hơi chậm nhưng chăm chỉ'};
const nxtThu=(n,c)=>{const a=A(n);G.tie.later(n,c,'np_tre_chon_nghe',a<14?(14-a)*12+R(0,10):R(2,8),{})}; /* mỗi bé chỉ một lần có tin lúc nhỏ rồi tới tuổi chọn đường, không dồn hộp */
const nxtLon=(n,c)=>G.tie.later(n,c,'np_tre_lon',Math.max(6,(18-A(n))*12+R(0,18)),{});
return [
NP({id:'np_tre_thu',t:'Tin về đứa bé được gửi nuôi',
 x:(c,d)=>{const n=T(d);if(!ok(n))return 'Có tin về một đứa bé nhà từng giúp.';const g=n.guard||'người nuôi';return `${g[0].toUpperCase()+g.slice(1)} gửi tin về ${nm(n)}, nay ${A(n)} tuổi: ${he(n)} ${trait(n)}. ${A(n)<8?'Bé còn nhỏ, chưa biết nhà mình là ai.':'Bé đã biết nhà từng giúp mình, hay hỏi về nhà.'}`},
 o:(c,d)=>{const n=T(d);if(!ok(n))return gone();return [
  pay('Gửi thêm tiền cho bé đi học',3,{f:c=>{n.sup=(n.sup||0)+1;bump(n,(n.st.tri>=n.st.vo?'tri':'vo'),3);nxtThu(n,c);return `Số tiền đủ để bé có sách bút và bữa ăn tươm hơn. ${nm(n)} sẽ nhớ.`+fx(c,{money:-m(3),qh:G.tie.rel(n,10,'được gửi thêm tiền học'),tam:2})}}),
  {l:'Ghé thăm bé một chuyến',f:c=>{nxtThu(n,c);return `${nm(n)} rụt rè rồi bạo dạn dần, kéo mình đi xem chỗ bé học, chỗ bé chơi. Về nhà lòng nhẹ hẳn.`+fx(c,{tam:4,eq:1,qh:G.tie.rel(n,9,'được ghé thăm')})}},
  pay('Gửi chút quà cho bé',1,{f:c=>{nxtThu(n,c);return `Gói quà nhỏ tới nơi, bé mừng rỡ.`+fx(c,{money:-m(1),qh:G.tie.rel(n,4,'được tặng quà'),tam:1})}}),
  {l:'Để yên, người nuôi lo được',f:c=>{nxtThu(n,c);return `Nhà không làm gì thêm. Bé vẫn lớn lên bình thường.`+fx(c,{qh:G.tie.rel(n,-1,'nhà không hỏi han')})}}]}}),
NP({id:'np_tre_chon_nghe',t:'Đứa bé tới tuổi chọn đường',
 x:(c,d)=>{const n=T(d);if(!ok(n))return 'Có tin về một đứa bé nhà từng giúp.';return `${nm(n)}, nay ${A(n)} tuổi, đã đến lúc phải chọn đường: ${he(n)} ${trait(n)}. ${(n.guard||'Người nuôi')} nhắn tin hỏi nhà có góp lời hay giúp một khoản không, vì bé còn nhỏ, không ai ở đó lo nổi cho bé đi xa.`},
 o:(c,d)=>{const n=T(d);if(!ok(n))return gone();const set=(p,k,v,sup)=>{n.path=p;n.sup=(n.sup||0)+sup;bump(n,k,v)};return [
  pay('Cho học chữ với một thầy giỏi',10,{f:c=>{set('chu','tri',5,2);nxtLon(n,c);return `${nm(n)} theo thầy học chữ. Thầy bảo bé ${(n.st.tri||0)>=62?'có khiếu, theo được':'còn phải chăm nhiều'}.`+fx(c,{money:-m(10),qh:G.tie.rel(n,16,'được cho học chữ'),tam:3})}}),
  pay('Cho theo một võ sư',8,{f:c=>{set('vo','vo',5,2);nxtLon(n,c);return `${nm(n)} bắt đầu tập võ, tay chân rắn dần.`+fx(c,{money:-m(8),qh:G.tie.rel(n,15,'được cho học võ'),tam:3})}}),
  pay('Cho học nghề ở một tiệm đáng tin',5,{f:c=>{set('nghe','eq',4,1);nxtLon(n,c);return `${nm(n)} vào tiệm làm học việc, ban đầu quét dọn, rồi dần được giao việc.`+fx(c,{money:-m(5),qh:G.tie.rel(n,12,'được cho học nghề'),tam:2})}}),
  {l:'Đón về nhà, nhận làm con trong nhà',c:c=>!G.adoptOk||G.adoptOk(c,true),f:c=>{const k=G.adopt(c,{age:A(n),g:n.g,given:n.n.split(' ').slice(1).join(' ')||n.n});n.ok=0;return `${esc(k.given)} về ở cùng nhà, gọi nhà ${N(c)} bằng cha mẹ nuôi, còn bỡ ngỡ nhưng biết ơn.`+fx(c,{tam:5,cfame:2,on:2})}},
  {l:'Để bé tự chọn theo ý mình',f:c=>{nxtLon(n,c);return `Nhà không can thiệp. ${nm(n)} tự chọn theo sức mình, đường đi sẽ do bé và người nuôi lo.`+fx(c,{qh:G.tie.rel(n,-3,'nhà để bé tự lo')})}}]}}),
NP({id:'np_tre_lon',t:'Đứa bé nay đã trưởng thành',
 x:(c,d)=>{const n=T(d);if(!ok(n))return 'Có người từng được nhà giúp ghé thăm.';G.npc.adult(n);return `${nm(n)}, nay ${A(n)} tuổi, ${n.cond||'đã tự lập'}, ghé thăm ${N(c)}, mang chút lễ vừa sức mình. "Nhờ nhà nuôi nấng thuở nhỏ, nay con mới có ngày này", ${n.g==='nữ'?'cô':'cậu'} nói, ${pick(['mắt hoe đỏ','giọng chân thành'])}.`},
 o:(c,d)=>{const n=T(d);if(!ok(n))return gone();const cap=1+(n.tier||0);return [
  {l:'Nhận tấm lòng của bé',f:c=>{const big=m(R(1,2)*cap);return `${nm(n)} đặt lễ xuống, nhẹ cả người. Có một món lễ nhỏ, đúng sức của người mới tự lập.`+fx(c,{money:big,qh:G.tie.rel(n,8,'đã tạ ơn'),tam:4})}},
  {l:'Giúp bé một chỗ làm tốt hơn',f:c=>{n.tier=Math.min(6,(n.tier||0)+1);n.sup=(n.sup||0)+1;G.tie.on(n,2);if(n.rel>=40)addVai(n,'ban_than');return `Một lời của mình giúp ${nm(n)} có chỗ đứng khá hơn. Bé gật đầu thật sâu, hẹn không quên.`+fx(c,{qh:G.tie.rel(n,14,'được giúp chỗ làm'),cfame:1,tam:3})}},
  {l:'Nhờ bé một việc nhỏ trong tầm sức',c:()=>(n.tier||0)>=2,f:c=>{if(chance(0.4+ax(n,'thanh')/200)){G.tie.on(n,-1);return `${nm(n)} làm trọn việc, không đòi gì. Việc ấy mở thêm một cánh cửa nhỏ.`+fx(c,{bonus:0.04,qh:G.tie.rel(n,5,'làm việc nhờ cậy'),eq:1})}return `${nm(n)} cố hết sức nhưng thân phận có hạn, chỉ giúp được chút ít.`+fx(c,{money:m(1),qh:G.tie.rel(n,3,'giúp chưa trọn')})}},
  {l:'Giữ thể diện, không nhận gì',f:c=>{if((n.rel||0)>=30)addVai(n,'ban_than');G.tie.later(n,c,'tie_ban_nho',R(36,108),{});return `${nm(n)} sững người, rồi cúi chào thật sâu. Từ đó coi nhà mình như người ruột thịt.`+fx(c,{qh:G.tie.rel(n,22,'nhà không lấy gì'),eq:2,tam:5,cfame:2})}}]}})
];
});
