/* Bách Niên Thế Gia · 7.0.0-d.1.5.47 · QUAN TRƯỜNG CHÈN ÉP (chủ dự án 27/11: "chèn ép, tranh chấp trong quan trường còn ít"; "để người chơi phải thực sự suy nghĩ … không chỉ chọn cái tốt nhất").
   Người đối đầu là người đang giữ ghế thật cùng tỉnh. Lựa chọn nào cũng được cái này mất cái kia và để lại ơn hoặc oán; người ấy quay lại sau vài năm (qs_tra_thu, qs_tra_on), còn ngồi ghế thì ra tay bằng ghế. */
window.EVF.push(G=>{
const {fx,esc,R,pick,chance}=G;const S=()=>G.S();const m=v=>G.mm(v);const FM=v=>G.fmtMoney(v);const N=c=>esc(c.given);
const man=d=>d&&d.qk?G.seatMan(d.qk,d.qn):null;const ten=d=>esc(d.qn||'Đồng liêu');
const ghe=d=>d&&d.qk?esc(G.seatName(d.qk)):'';
const bind=(d)=>{const n=man(d);if(n)d.npc=n.id;return n};
const hen=(cc,id,d,a,b)=>G.later(cc,id,R(a,b),{qk:d.qk,qn:d.qn,npc:d.npc});
const rel=(n,v,why)=>{if(n)G.tie.rel(n,v,why)};
const base=(id,t,x,o)=>({id,t,k:'Hoạn lộ',fixed:1,tags:{},job:['quan','quan_ngu'],x:(c,d)=>{bind(d);return x(c,d)},o:(c,d)=>{const n=man(d);if(!n)return [{l:'Người ấy đã rời ghế, việc trôi qua',f:()=>''}];return o(c,d,n)}});
return [
base('qs_do_loi','Bị đổ lỗi',(c,d)=>`Kho công hụt mấy trăm thạch. ${ten(d)}, đang giữ chức ${ghe(d)}, trình lên rằng sổ ấy qua tay ${N(c)}. Trát tra hỏi sắp tới.`,
 (c,d,n)=>[
  ...((c.m||0)>=70?[{l:'Lần theo lệ kiểm kho đã thuộc lòng, tìm ra chỗ hụt thật',r:[{m:0.8,tri:0.4},55],y:cc=>{rel(n,10,'gỡ được vụ kho mà không đổ cho ai');return 'Thóc hụt vì kho dột từ hai mùa trước, sổ vẫn ghi đủ. Không ai phải nhận tội.'+fx(cc,{cong:10,fame:4,m:2,tam:5})},n:cc=>{rel(n,-6,'tra kho không ra');return 'Lần mãi không ra mối, ngày hầu tra đã tới.'+fx(cc,{fame:-5,tam:-6})}}]:[]),
  {l:'Nhận phần lỗi về mình',ax:{rong:1,thanh:-1},f:cc=>{rel(n,30,'nhận lỗi thay');G.tie.on(n,10);hen(cc,'qs_tra_on',d,24,70);return `${ten(d)} thoát nạn, nắm tay ${N(cc)} mà không nói nên lời.`+fx(cc,{fame:-6,liem:-2,tam:-6,cong:-6})}},
  {l:'Trưng sổ sách, chỉ thẳng người giữ chìa kho',r:[{tri:0.8,eq:0.3},52],y:cc=>{rel(n,-35,'bị vạch sổ kho');G.tie.oan(n,15);const mat=chance(0.4)&&G.seatPush(d.qk,'bị cách vì kho hụt');if(!mat)hen(cc,'qs_tra_thu',d,20,60);return `Sổ sách rành rành.${mat?` ${ten(d)} mất chức.`:` ${ten(d)} chạy được tội, nhưng ghi nhớ.`}`+fx(cc,{fame:8,liem:3,cong:8})},n:cc=>{rel(n,-25,'tố mà không thắng');G.tie.oan(n,10);cc.flags.noPromoUntil=S().t+24;hen(cc,'qs_tra_thu',d,12,40);return 'Chứng cứ thiếu một trang, quan trên cho là vu cáo.'+fx(cc,{fame:-8,tam:-8})}},
  {l:`Đưa lễ lên quan trên cho êm (${FM(m(10))})`,c:()=>G.money()>=m(10),f:cc=>{S().money-=m(10);rel(n,6,'cùng được êm chuyện');return 'Vụ kho hụt được xếp vào mục hao hụt tự nhiên.'+fx(cc,{liem:-8,tam:2})}},
  {l:'Im lặng chịu phạt bổng, giữ lại sổ gốc',ax:{cc:1},f:cc=>{cc.flags.soKho={k:d.qk,n:d.qn,t:S().t};rel(n,8,'không làm to chuyện');hen(cc,'qs_so_cu',d,36,96);return `Bị phạt nửa năm bổng. Cuốn sổ gốc ${N(cc)} cất kỹ dưới đáy rương.`+fx(cc,{money:-m(5),tam:-5})}}]),
base('qs_tranh_cong','Bị tranh công',(c,d)=>`Việc ${N(c)} làm suốt nửa năm nay đã xong, nhưng bản tấu gửi về triều chỉ có tên ${ten(d)}, đang giữ chức ${ghe(d)}.`,
 (c,d,n)=>[
  ...((c.m||0)>=70?[{l:'Giữa buổi hội, hỏi người ấy một chỗ chỉ người làm mới biết',f:cc=>{rel(n,-20,'bị hỏi cứng giữa buổi hội');return `${ten(d)} ấp úng. Cả nha môn hiểu việc ấy là của ai.`+fx(cc,{cong:12,fame:5,tam:3})}}]:[]),
  {l:'Để người ấy nhận, coi như cho một món nợ',ax:{tiet:1},f:cc=>{rel(n,22,'nhường công');G.tie.on(n,8);hen(cc,'qs_tra_on',d,24,80);return `${ten(d)} hiểu, từ đó gặp là chào trước.`+fx(cc,{tam:-5,eq:1})}},
  {l:'Dâng bản tấu riêng, kèm chứng cứ ngày giờ',r:[{tri:0.5,eq:0.5,khau:0.3},50],y:cc=>{rel(n,-30,'bị lấy lại công');G.tie.oan(n,12);hen(cc,'qs_tra_thu',d,24,60);return 'Triều đình ghi công đúng người.'+fx(cc,{cong:18,fame:8,tam:6})},n:cc=>{rel(n,-18,'tranh công không thành');return 'Bản tấu đến sau, bị coi là ganh tỵ.'+fx(cc,{fame:-5,tam:-6})}},
  {l:'Tìm gặp riêng, đề nghị cùng đứng tên',r:[{khau:0.7,eq:0.6},50],y:cc=>{rel(n,10,'chia công');return 'Hai cái tên cùng nằm trong một bản tấu.'+fx(cc,{cong:8,eq:2,tam:2})},n:cc=>{rel(n,-8,'bị đòi chia công');return 'Người ấy cười, bảo việc đã trình rồi.'+fx(cc,{tam:-4})}}]),
base('qs_ep_phe','Bị ép đứng về phe',(c,d)=>`Một nhóm quan đưa tới tờ sớ hặc ${ten(d)}, đang giữ chức ${ghe(d)}. Họ cần thêm một chữ ký của ${N(c)}. Không ký cũng là một câu trả lời.`,
 (c,d,n)=>[
  {l:'Ký tên vào sớ',ax:{tv:2,tin:-1},f:cc=>{rel(n,-45,'ký sớ hặc mình');G.tie.oan(n,20);const mat=chance(0.55)&&G.seatPush(d.qk,'bị phe cánh hặc đổ');if(!mat)hen(cc,'qs_tra_thu',d,12,48);return (mat?`${ten(d)} mất chức, ghế ấy bỏ trống.`:`${ten(d)} trụ được, và đã đọc kỹ từng chữ ký.`)+fx(cc,{cong:10,liem:-4,fame:mat?4:-3})}},
  {l:'Từ chối ký',ax:{thanh:2},f:cc=>{rel(n,15,'không ký sớ');cc.flags.noPromoUntil=Math.max(cc.flags.noPromoUntil||0,S().t+18);return 'Nhóm kia không nói gì, chỉ là từ đó công văn của mình luôn bị trả về.'+fx(cc,{liem:4,tam:-4})}},
  {l:'Từ chối, rồi ngầm báo cho người sắp bị hặc',r:[{muu:0.8,eq:0.4},55],y:cc=>{rel(n,40,'được báo trước nguy hiểm');G.tie.on(n,14);hen(cc,'qs_tra_on',d,18,60);return `${ten(d)} kịp dâng sớ tự bạch trước. Ơn này người ấy không quên.`+fx(cc,{eq:2,tam:3})},n:cc=>{rel(n,20,'được báo trước');cc.flags.noPromoUntil=S().t+36;return 'Chuyện báo tin lộ ra. Cả phe kia giờ coi mình là người hai mặt.'+fx(cc,{fame:-10,tam:-10})}}]),
base('qs_tra_thu','Mối thù trong quan trường',(c,d)=>`${ten(d)} nay vẫn ngồi ở ${ghe(d)}. Người ấy tìm được một chỗ sơ hở trong công việc của ${N(c)} và đang gom chữ ký.`,
 (c,d,n)=>[
  {l:'Đến tận phủ người ấy tạ lỗi, xin bỏ qua',r:[{eq:0.9,khau:0.4},45],y:cc=>{rel(n,25,'được tạ lỗi');G.tie.oan(n,-15);return 'Chén trà nguội dần, rồi người ấy cũng gật.'+fx(cc,{fame:-3,tam:-3})},n:cc=>{rel(n,-5,'tạ lỗi không thành');cc.flags.noPromoUntil=S().t+24;return 'Người ấy tiếp rất lễ độ rồi vẫn dâng sớ.'+fx(cc,{fame:-8,tam:-8})}},
  {l:'Ra tay trước, hặc ngược lại',r:[{tri:0.8,muu:0.5},48],y:cc=>{rel(n,-30,'bị hặc ngược');const mat=G.seatPush(d.qk,'bị hặc ngược mà đổ');return (mat?`${ten(d)} đổ trước khi kịp ra tay.`:'Người ấy phải dừng tay.')+fx(cc,{fame:6,cong:8})},n:cc=>{rel(n,-20,'hặc ngược không thành');cc.flags.noPromoUntil=S().t+36;return 'Cả hai cùng bị quở, nhưng mình bị nặng hơn.'+fx(cc,{fame:-14,tam:-10,cong:-8})}},
  {l:'Không đỡ, cứ làm việc cho thật sạch',ax:{cc:1,thanh:1},f:cc=>{const sach=(cc.liem||50)>=65;if(!sach)cc.flags.noPromoUntil=S().t+24;return sach?'Tra đến cùng không ra tì vết nào, tờ sớ thành trò cười.'+fx(cc,{fame:10,liem:3}):'Tra đến cùng cũng ra vài chỗ không đẹp.'+fx(cc,{fame:-10,tam:-6,money:-m(5)})}}]),
base('qs_tra_on','Người cũ trong quan trường',(c,d)=>`${ten(d)}, nay giữ chức ${ghe(d)}, mời ${N(c)} sang uống trà và hỏi: dạo này công việc có chỗ nào cần một tiếng nói đỡ không.`,
 (c,d,n)=>[
  {l:'Xin người ấy tiến cử',f:cc=>{rel(n,-10,'dùng ơn để xin tiến cử');cc.flags.noPromoUntil=0;return 'Người ấy gật đầu, hẹn đưa tên vào sổ xét.'+fx(cc,{cong:20,fame:5})}},
  {l:'Chỉ giữ tình, không xin gì',ax:{tiet:1},f:cc=>{rel(n,12,'không đòi trả ơn');return 'Người ấy nhìn lâu rồi rót thêm trà.'+fx(cc,{eq:2,tam:5})}},
  {l:'Nhờ dạy cách đi đứng trong triều',f:cc=>{rel(n,4,'xin chỉ dạy');return 'Mấy tối ngồi nghe, hiểu ra nhiều chuyện sau lưng các tờ sớ.'+fx(cc,{tri:2,eq:3,tam:2})}}]),
base('qs_so_cu','Cuốn sổ gốc',(c,d)=>`Cuốn sổ kho năm nào vẫn nằm dưới đáy rương. Nay có người đang tra lại ${ten(d)} và hỏi ${N(c)} còn giữ gì không.`,
 (c,d,n)=>[
  {l:'Đưa cuốn sổ ra',ax:{thanh:2},f:cc=>{rel(n,-50,'bị đưa sổ gốc');G.tie.oan(n,20);const mat=G.seatPush(d.qk,'bị lật lại án kho');return (mat?`${ten(d)} mất chức vì chính cuốn sổ ấy.`:'Cuốn sổ được niêm lại.')+fx(cc,{fame:14,liem:5,cong:14})}},
  {l:'Mang sổ đến trả tận tay người ấy',ax:{rong:2},f:cc=>{rel(n,45,'được trả sổ gốc');G.tie.on(n,18);hen(cc,'qs_tra_on',d,12,36);return `${ten(d)} đốt cuốn sổ trước mặt ${N(cc)}, không nói một lời.`+fx(cc,{liem:-5,eq:2})}},
  {l:'Bảo không còn giữ',ax:{cc:1},f:cc=>'Sổ vẫn nằm đó, chờ một ngày khác.'+fx(cc,{tam:-2})}])
];
});
