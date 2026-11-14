/* Bách Niên Thế Gia v6.7.0-d3 · Ân oán họ Phạm (ARC.pm), phần 1: khung, chương 1 (mở đầu), chương 2 (gốc rễ, đòn phản kích), ngã rẽ, Duy, phản ứng thế giới.
   Mọi con số là ẩn: pf chứng cứ, wit nhân chứng, all đồng minh, pw thế lực nhà, dt dân tâm, ky Kiên cảnh giác, lo lộ, hn mối hận, fail số lần thất bại.
   Phần 2 (ev-v670e.js): bảy đường, trận cuối, cái kết, lịch của Kiên, người nối. */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const FM=v=>G.fmtMoney(v);const N=c=>esc(c.given);
const rich=v=>()=>G.money()>=m(v);
const arc=()=>G.arc.get('pm');
const AA=()=>arc()||{c:{},fl:{},lock:{},done:{},K:{n:'Phạm Trung Kiên',g:'Kiên',rank:0,pow:20},D:{n:'Nguyễn Thành Duy',link:0,ok:1},H:{}};
const org=()=>AA().fl.org||'ruong';
const kind=()=>AA().fl.kind||'nguy';
const kv=(a,b,c)=>({nguy:a,manh:b,muu:c})[kind()];
const KF=()=>esc(AA().K.n);
const KG=()=>esc(AA().K.g);
const DN=()=>esc(AA().D.n);
const RT=['Tri huyện','Tri phủ','Bố chánh sứ','Thượng thư','Đại học sĩ nội các','Thái sư'];
const RK=()=>RT[Math.min(5,AA().K.rank||0)];
/* cộng trừ biến ẩn; thái độ đã chọn ở yến của Phạm đại nhân làm đổi mức ky và pf */
const up=o=>{const a=arc();if(!a||!o)return '';const tt=a.lock.tt;
  for(const k in o){let v=o[k];
    if(k==='ky'&&v>0)v=Math.round(v*(tt==='cung'?1.5:tt==='ngoan'?0.6:1));
    if((k==='pf'||k==='wit')&&v>0)v=Math.round(v*(tt==='ngoan'?0.75:tt==='cung'?1.15:1));
    G.arc.add('pm',k,v)}
  return ''};
const cnt=k=>(arc()&&arc().c[k])||0;
const BASE={tags:{},k:'Ân oán họ Phạm',arc:'pm',ms:1,vonce:true};
const E=(id,t,x,o,ex)=>Object.assign({id,t,x,o},BASE,ex||{});
const O=(l,spec,tgt,p)=>{const cost=p.cost||0;
  return Object.assign({l:cost?`${l} (${FM(m(cost))})`:l,r:[spec,tgt],
    y:c=>p.y+up(p.yu)+fx(c,Object.assign({},p.yf||{},cost?{money:-m(cost)}:{})),
    n:c=>p.n+up(Object.assign({},p.nu||{}))+fx(c,Object.assign({},p.nf||{},cost?{money:-m(cost)}:{}))},cost?{c:rich(cost)}:{},p.x||{})};
const F=(l,p)=>{const cost=p.cost||0;
  return Object.assign({l:cost?`${l} (${FM(m(cost))})`:l,f:c=>p.t+up(p.u)+fx(c,Object.assign({},p.f||{},cost?{money:-m(cost)}:{}))+(p.then?p.then(c):'')},cost?{c:rich(cost)}:{},p.x||{})};
const pay=(l,v,o)=>Object.assign({l:`${l} (${FM(m(v))})`,c:rich(v)},o);
const after=(id,mo)=>(c,a)=>a.done[id]!=null&&S().t-a.done[id]>=(mo||0);
const ORG={
 ruong:{past:'Thuở nhà mình mới lập nghiệp, mảnh đất có mộ tổ bị người của Phạm Xuân Huấn, vị quốc công khai quốc, lấy làm trang viện cho thuộc hạ. Cụ già giữ mộ lên huyện kêu mà không ai nghe, uất quá mà mất. Mộ tổ nay nằm sau tường rào nhà người.',
  ev:'văn tự gốc của mảnh đất',wit:'người đo đất năm xưa',post:'người coi trang viện của họ Phạm'},
 so:{past:'Tổ tiên nhà mình làm thư lại giữ sổ trong kho quân lương của Phạm Xuân Huấn thuở dẹp loạn dựng nước. Kho hụt lương, người ta đổ tội cho ông cụ giữ sổ. Ông bị phạt, mất danh, cả nhà dạt về làng. Nhiều người trong kho biết ông oan, nhưng không ai dám nói.',
  ev:'bản sao sổ kho lương cũ',wit:'lão thủ kho năm ấy',post:'viên quản lương của họ Phạm'},
 hon:{past:'Đời cha ông, nhà mình có hôn ước với họ Phạm, khi họ Phạm còn chưa theo vua dựng nghiệp. Khi họ Phạm lên như diều gặp gió, bên ấy gửi một lá thư chối hôn lời lẽ nhục mạ, trả lễ vật như trả của bố thí. Người con gái nhà mình héo hon mà mất.',
  ev:'thư từ và lễ vật của cuộc sính năm xưa',wit:'bà mối năm ấy',post:'người quản gia của họ Phạm'},
 buon:{past:'Nhà mình vốn đi buôn muối, trà, tơ theo một tuyến cũ từ đời ông. Khi họ Phạm có quyền, họ xin được tờ giấy phép độc quyền tuyến ấy, rồi hàng nhà mình bị chặn ở mọi bến, thuyền bị tịch thu viện cớ buôn lậu. Cơ nghiệp tan trong một mùa.',
  ev:'tờ giấy phép độc quyền cấp trái luật',wit:'người lái buôn từng chung tuyến',post:'viên đại diện thương hội của họ Phạm'}};
const OR=()=>ORG[org()];
const hasQuan=()=>G.alive().some(p=>G.inClan(p)&&p.job==='quan'&&p.lv>=4);
const kids=()=>G.alive().filter(p=>G.inClan(p));

/* ---------- khung ARC.pm ---------- */
const CH2_MIN=['pm_b1','pm_b2','pm_b3','pm_b4','pm_b5','pm_b6','pm_b7','pm_b8','pm_b9','pm_b10','pm_b11','pm_b12','pm_b13','pm_b14'];
/* sự kiện thường đang xảy ra giữa cốt truyện: theo dõi nối vào cốt truyện bằng một câu và một dấu rất nhỏ (xem arcTouch trong engine) */
const TOUCH={
 government:[['Một viên thư lại quen nói nhỏ: sổ sách của họ Phạm có chỗ không khớp.',{pf:1}],['Người của họ Phạm có mặt trong buổi việc ấy, và ghi nhớ nhà mình.',{ky:2}]],
 society:[['Chuyện nhà mình được truyền miệng. Có người nhắc rằng mối oán với họ Phạm vẫn chưa ai quên.',{dt:1}],['Một người trong vùng kín đáo hỏi thăm chuyện cũ với họ Phạm.',{wit:1}]],
 life:[['Dân trong vùng chuyện trò rồi lại nhắc tới họ Phạm, giọng nhỏ dần.',{dt:1}]],
 economy:[['Người làm ăn cùng nghề thở dài về cách họ Phạm chèn ép, và hứa sẽ giúp khi cần.',{all:1}],['Hiệu buôn thân họ Phạm để ý đến khoản tiền nhà mình vừa động tới.',{ky:1}]],
 family:[['Nhà thêm việc, thêm người, và thêm sức khi cần đối phó với họ Phạm.',{pw:1}]],
 education:[['Học trò của nhà mình bắt đầu được người ta để ý. Có người nói đời sau sẽ có người dám nói thẳng.',{all:1}]]};
G.arc.def('pm',{name:'Ân oán họ Phạm',gap:[4,9],
 theme:a=>{if(a.ch<2||a.ch>5)return null;return {dom:['government','society','economy'],boost:1.25,quiet:a.ch>=4?0.5:0.8}},
 touch:(a,e,c)=>{if(a.ch<2||a.ch>5||!chance(0.35))return '';const dm=(e.meta&&e.meta.d)||'';const L=TOUCH[dm];if(!L)return '';
  if(dm==='government'&&!(c.job==='quan'||c.job==='quan_ngu'))return '';
  if(dm==='economy'&&!['chu','tieunhi','tieuphu','hangrong','tieu','tho','ngu'].includes(c.job))return '';
  if(dm==='education'&&G.age(c)>=26)return '';
  if(dm==='family'&&!(e.meta&&e.meta.s&&/(marriage|birth|child|wed|inherit|household)/i.test(e.meta.s)))return '';const [txt,up2]=pick(L);for(const k in up2)G.arc.add('pm',k,up2[k]);return txt},
 start:()=>{const s=S();return s.t>=96&&hasQuan()&&!s.war&&chance(s.t>=120?0.06:0.04)},
 onStart:a=>{const w=(S().wr&&S().wr.pm)||{};a.fl.org=w.org||pick(['ruong','so','hon','buon']);a.fl.kind=w.kind||pick(['nguy','manh','muu']);
  const gy=Math.floor(S().t/12);
  a.K={n:'Phạm Trung Kiên',g:'Kiên',age:24+gy,rank:0,pow:R(18,24),life:R(70,88),ok:1,sched:[72,192,312,408,504],lag:0};
  a.D={n:'Nguyễn Thành Duy',age:R(28,34),link:0,ok:1};
  a.H={};a.c={pf:0,wit:0,all:0,pw:8,dt:12,ky:0,lo:0,hn:0,fail:0};
  /* nếu đã quá mốc ván của lịch Kiên thì Kiên đã ở đúng chức của năm đó, nhưng mở đầu vẫn chậm rãi */
  while(a.K.rank<3&&S().t>=a.K.sched[a.K.rank])a.K.rank++;
  a.ch=1;a.fl.t1=S().t},
 tick:a=>{const s=S(),K=a.K;
  /* năm: tuổi, quyền lực của Kiên, tuổi thọ */
  if(s.t%12===0){K.age++;a.D.age++;a.c.ky=Math.max(0,(a.c.ky||0)-3);a.c.lo=Math.max(0,(a.c.lo||0)-2); /* Kiên nguôi dần, tin lộ cũ đi */
    if(K.ok)K.pow=Math.min(100,K.pow+R(0,2)+(K.rank>=3?1:0));
    if(K.ok&&K.age>=K.life&&!a.fl.kdie){a.fl.kdie=1;K.ok=0;if(a.ch>=2&&!a.end)G.later(G.head(),'pm_n1',R(1,3))}}
  /* lịch lên chức của Kiên: không phụ thuộc người chơi */
  if(K.ok&&K.rank<5&&s.t>=K.sched[K.rank]+(K.lag||0)&&a.ch>=1&&!s.war){K.rank++;K.pow=Math.min(100,K.pow+6);G.later(G.head(),'pm_r'+K.rank,R(1,2));if(K.rank===4)a.fl.nhat=s.t;if(K.rank===5)a.fl.r5T=s.t}
  if(K.ok&&K.rank>=5&&a.fl.r5T&&!a.fl.r6&&!a.end&&s.t>=a.fl.r5T+60&&!s.war){a.fl.r6=1;G.later(G.head(),'pm_r6',R(1,3))}
  /* chuyển chương */
  if(a.ch===1&&a.done.pm_a8!=null&&s.t-a.done.pm_a8>=3){a.ch=2;a.fl.t2=s.t}
  if(a.ch===2){const bn=CH2_MIN.filter(id=>a.done[id]!=null).length;const wealth=cnt('pf')+cnt('wit')+cnt('all')+cnt('pw');
    if((bn>=8&&wealth>=75)||(s.t-(a.fl.t2||s.t)>=144&&bn>=5)||bn>=13){a.ch=3;a.fl.t3=s.t;G.later(G.head(),'pm_f0',R(1,3))}}
  if(a.done.pm_h5!=null&&a.fl.saiR==null){a.fl.saiR=1;if(chance(0.65))a.fl.sai=1} /* Kiên có thật sự mắc lỗi hay không */
  if(a.ch===3&&a.lock.br){a.ch=4;a.fl.t4=s.t}
  if(a.ch===4){const n=Object.keys(a.done).filter(k=>/^pm_[pfvtmlh]\d$/.test(k)).length;
    if(n>=8||s.t-(a.fl.t4||s.t)>=240){a.ch=5;a.fl.t5=s.t}}
  if(a.ch===3&&s.t-(a.fl.t3||s.t)>=36&&!a.lock.br){G.later(G.head(),'pm_f0',2);a.fl.t3=s.t}},
 ends:{
  E1:{title:'Ân oán họ Phạm khép lại',log:'Công lý được tỏ. Kiên bị xử theo luật, họ Phạm mất quyền thế.',q:{the:[0.06,0.10],danh:[0.04,0.08],lo:[-6,-2]},mark:'pm_e1'},
  E2:{title:'Ân oán họ Phạm khép lại',log:'Kiên đổ, nhưng nhà mình tổn hại nặng. Hận thù để lại cho đời sau.',q:{the:[0,0.05],danh:[0,0.06],lo:[2,8]},mark:'pm_e2'},
  E3:{title:'Ân oán họ Phạm khép lại',log:'Hai bên hòa giải trên giấy. Nhà mình được ghế, mang món nợ với họ Phạm.',q:{the:[-0.03,0.03],lo:[-3,5]},mark:'pm_e3'},
  E4:{title:'Ân oán họ Phạm khép lại',log:'Nhà mình quy phục Quốc công, vào bộ máy Quyền thần. Thanh lưu coi khinh.',q:{the:[0.06,0.12],danh:[-0.12,-0.06]},mark:'pm_e4'},
  E5:{title:'Ân oán họ Phạm khép lại',log:'Kiên bị kẻ khác hạ, nhà mình đứng ngoài nhìn.',q:{the:[-0.05,0],danh:[-0.03,0.03]},mark:'pm_e5'},
  E6:{title:'Họ bị phản tố',log:'Nhà mình thua kiện, cả họ bị cách chức, cấm thi một trăm năm.',mark:'pm_e6'},
  E7:{title:'Chiếu chỉ tru di',log:'Nhà mình bị gán tội mưu nghịch, chiếu chỉ tru di.',mark:'pm_e7'},
  E8:{title:'Bỏ xứ',log:'Nhà mình rời bỏ đất cũ, đi xa lập lại cơ nghiệp.',mark:'pm_e8'}}});

/* ---------- điểm thế trận (dùng cho trận cuối, ở ev-v670e.js) ---------- */
const FIT={P:a=>a.K.rank<=2?0.15:a.K.rank===3?0.08:0,F:a=>0.08+(((S().dyn&&S().dyn.k&&S().dyn.k.nghi)||0)>=60?0.05:0),
 V:a=>(G.proj.on('giabinh')?0.08:0)+(a.K.rank<=2?0.06:0.01),T:a=>a.fl.no?0.14:0.05,M:a=>((S().dyn&&S().dyn.dt)||60)<=40?0.12:0.04,
 L:a=>Math.min(0.12,(a.c.all||0)/100),H:a=>a.fl.sai?0.16:0};
G.pm={sc:()=>{const a=arc();if(!a)return 0;const c=a.c;let s=((c.pf||0)+(c.wit||0)+(c.all||0)+(c.pw||0)+(c.dt||0))/400;s+=(FIT[a.lock.br]?FIT[a.lock.br](a):0)-0.05*(c.fail||0);s+=(a.fl.duyOk?0.08:0)-(a.fl.duyBad?0.07:0);return s},
 kp:()=>{const a=arc();if(!a)return 1;return 0.14+0.05*(a.K.rank||0)+0.10*((a.K.pow||0)/100)+0.08*((a.c.ky||0)/100)+0.04*((a.c.hn||0)/100)},up,E,O,F,after,ORG,org,kind,kv,KF,KG,DN,RK,RT,cnt,AA,arc};

return [
/* ===================== CHƯƠNG 1 · BÓNG PHẠM GIA ===================== */
E('pm_a1','Chuyện cũ được nhắc lại',
 c=>`Trong buổi giỗ, người già nhất họ kể lại chuyện ít khi nhắc trước mặt con cháu. ${OR().past} Nhà họ Phạm nay là công thần khai quốc, quốc công Phạm Xuân Huấn có Thiết khoán, nên chuyện ấy chưa từng có ai dám hỏi tội.`,
 c=>[O('Hỏi cho rõ đầu đuôi, ghi lại',{tri:1,eq:0.5},62,{y:'Lời kể khớp nhau, từng chi tiết được ghi vào sổ riêng. Nhà mình biết mình đang đứng ở đâu.',yu:{pf:4,hn:6},yf:{tam:-2},n:'Người già kể lẫn lộn, nhiều chỗ nhớ nhớ quên quên. Chỉ còn mối giận không có chứng cứ.',nu:{hn:8},nf:{tam:-4}}),
   F('Dặn con cháu nhớ, nhưng chớ nói ra ngoài',{t:'Cả nhà im lặng gật đầu. Chuyện ấy từ nay thành một vết sẹo giấu kín.',u:{hn:10},f:{tam:-2}}),
   F('Bảo chuyện đã cũ, bỏ đi cho nhẹ lòng',{t:'Có người thở phào, có người cúi mặt. Mối giận không biến mất, chỉ bị đè xuống.',u:{hn:3,ky:-1},f:{tam:2}})],
 {ch:1,vw:5,vc:(c,a)=>true}),
E('pm_a2','Người của Phạm gia gõ cửa',
 c=>{const o=org();return o==='ruong'?`${OR().post[0].toUpperCase()+OR().post.slice(1)} sang tận nhà, lời lẽ khách khí mà ý rõ ràng: họ Phạm muốn mua nốt mảnh ruộng giáp trang viện với giá rẻ mạt. Nhà ${N(c)} có người làm quan, ai cũng biết, nên người ta tới "hỏi trước".`
   :o==='so'?`Một viên quản lương của họ Phạm ghé nhà, nói nhà ${N(c)} nay có quan phẩm, cũng nên "thông cảm" cho vài mối làm ăn cũ của họ Phạm với kho lương địa phương. Trong lời mời có cái gì như đe mà không phải đe.`
   :o==='hon'?`Người quản gia họ Phạm mang đến một phong lễ vật. Hắn nói quốc công phủ nghe nhà ${N(c)} có người nên danh, nay muốn "xóa chuyện cũ". Trong lễ vật không có lời xin lỗi nào.`
   :`Một viên đại diện thương hội của họ Phạm đến nhà, đề nghị cho nhà ${N(c)} "góp vốn" vào chính tuyến buôn đã bị họ Phạm giành mất, với phần lãi chỉ bằng một góc nhỏ.`},
 c=>[F('Nhường một bước, nhận cho yên',{t:'Họ Phạm tươi cười ra về. Nhà mình mất một phần, đổi lấy vài năm yên ổn và một ký ức đắng.',u:{ky:-3,hn:6,pw:-3},f:{tam:-5,fame:-3}}),
   O('Từ chối khéo, nói để suy nghĩ',{eq:1,khau:0.6},60,{y:'Người ta nghe ra ý lễ độ mà không nhượng. Họ Phạm ghi nhớ, nhưng chưa có cớ làm khó.',yu:{ky:2,hn:3},n:'Lời khéo nghe như do dự. Họ Phạm coi đó là sắp chịu, hôm sau lại đến.',nu:{ky:3,hn:5},nf:{tam:-3}}),
   O('Từ chối thẳng, đóng cửa',{eq:0.8,vo:0.4},50,{y:'Cả xóm nghe tiếng. Nhà mình giữ được thể diện, và có người âm thầm gửi lời mừng.',yu:{ky:6,all:3,hn:5},yf:{fame:5},n:'Tiếng từ chối bị bóp méo thành bất kính với quốc công phủ.',nu:{ky:8,hn:5},nf:{fame:-4,tam:-4}})],
 {ch:1,vw:4,vc:after('pm_a1',1)}),
E('pm_a3','Yến của Phạm đại nhân',
 c=>`${KF()}, ${RK().toLowerCase()} ở vùng này, mở yến mời quan khách. Nhà ${N(c)} có tên trong thiếp mời. Hắn ngồi trên cao, cười nói ôn hòa, nhưng ai cũng biết trong gian nhà này lời hắn là lệnh. ${kv('Ai cũng khen hắn thanh liêm, còn nhà hắn thì gạch lát toàn ngói mới.','Người hầu đứng quanh toàn kẻ vai u thịt bắp, mắt không rời khách.','Hắn nói ít, nghe nhiều, và ghi nhớ từng gương mặt.')}`,
 c=>[F('Cúi đầu, nâng chén, xưng "tiểu nhân"',{t:`${KG()} gật gù hài lòng. Nhà mình được xếp một chỗ ngồi thấp nhưng yên ổn. Lối này an toàn, nhưng ai cũng thấy nhà mình đã chọn đứng dưới.`,u:{ky:-4,hn:5,pf:-2},f:{fame:-2,tam:-4},then:()=>{G.arc.fork('pm','tt','ngoan');return ''}}),
   F('Đáp lễ lạnh nhạt, không nâng chén quá ba lượt',{t:`Cả bàn im bặt. ${KG()} nhếch mép nhưng không nói. Trong đám khách có người nhìn nhà mình với con mắt khác: nể, hoặc sợ liên lụy.`,u:{ky:7,all:4,hn:4},f:{fame:5,tam:2},then:()=>{G.arc.fork('pm','tt','cung');return ''}}),
   O('Khéo nịnh, vừa khen vừa dò ý',{khau:1,eq:0.5,tri:0.4},52,{y:`Lời khen đúng chỗ. ${KG()} ngỡ nhà mình đã về phe, còn nhà mình biết thêm hai điều về nhà hắn.`,yu:{ky:-2,pf:4,wit:2},yf:{fame:2},n:'Lời nịnh vụng, bị bắt lỗi giữa tiệc. Nhà mình thành trò cười một lúc.',nu:{ky:4,hn:4},nf:{fame:-4,tam:-5},x:{}})],
 {ch:1,vw:5,vc:(c,a)=>after('pm_a2',2)(c,a)&&!a.lock.tt}),
E('pm_a4','Thư mời của Nguyễn tiên sinh',
 c=>`Một lá thư không đề tên người gửi, chữ đẹp và gọn, đến nhà ${N(c)}. Người ký là ${DN()}, tự xưng là kẻ "đã giúp họ Phạm nhiều việc mà nay thấy bất nhẫn". Ông ta xin gặp riêng ở một quán trà ven sông. Có thể là người muốn đổi bên, có thể là cái bẫy.`,
 c=>[F('Nhận lời gặp, đi một mình',{t:'Ông ta nói ít, uống cạn chén trà, bảo: "Chưa đến lúc nói hết." Rồi đứng dậy, để lại một mẩu giấy ghi một địa chỉ ở kinh thành.',u:{ky:3,pf:2},f:{tam:-2},then:()=>{AA().D.link+=14;return ''}}),
   F('Từ chối, không đáp thư',{t:'Thư không hồi âm. Nhà mình không biết mình vừa bỏ lỡ gì, hoặc vừa tránh gì.',u:{ky:-1},then:()=>{AA().D.link+=0;return ''}}),
   O('Cho người theo dõi ông ta trước, rồi mới quyết',{tri:0.8,muu:0.8},58,{y:'Người theo dõi thấy ông ta thật sự trốn tránh người của họ Phạm. Nhà mình hiểu ông ta đang đi trên dây.',yu:{pf:3,wit:2},yf:{},n:'Người theo dõi bị phát hiện. Ông ta biến mất, và nhà mình mang tiếng nghi kỵ.',nu:{ky:4},nf:{tam:-2}})],
 {ch:1,vw:4,vc:after('pm_a3',1)}),
E('pm_a5','Một người làng mất tích',
 c=>`Một người làng từng làm công cho họ Phạm, hay uống rượu và hay nói, đã ba ngày không thấy về. Vợ ông ta khóc đến cửa nhà ${N(c)} vì nhà mình là nhà duy nhất trong vùng "có quan". Người ta đồn ông ta nói quá nhiều chuyện về ${OR().post}.`,
 c=>[O('Tự đi hỏi quanh, lần theo dấu',{tri:0.8,vo:0.5,eq:0.4},50,{y:'Tìm thấy dấu xe và vết máu cạnh bờ ao sau trang viện họ Phạm. Chưa đủ để buộc tội, đủ để nhà mình biết sự thật.',yu:{wit:6,hn:5,ky:4},yf:{tam:-3},n:'Dò hỏi đến đâu cũng bị khép cửa. Có kẻ lạ theo sát sau nhà mình hai hôm.',nu:{ky:5,hn:3},nf:{tam:-4}}),
   F('Viết đơn báo quan địa phương',{t:'Quan huyện ghi nhận, hứa sẽ cho người đi tìm. Vài hôm sau đơn bị gạt đi: "người tình nguyện đi xa". Nhưng đơn vẫn nằm trong sổ.',u:{wit:2,ky:2},f:{tam:-2}}),
   F('Khuyên vợ ông ta nín lặng, cho ít tiền',{t:'Bà ta khóc rồi cúi đầu nhận. Chuyện chìm xuống, và trong lòng nhà mình cũng chìm xuống một thứ.',u:{hn:4,dt:-3},f:{tam:-4},cost:2})],
 {ch:1,vw:4,vc:after('pm_a3',2)}),
E('pm_a6','Lời cảnh cáo',
 c=>`Sáng ra, ngoài cổng nhà ${N(c)} có treo một con gà trống bị cắt cổ, không ai biết ai làm. Trong nhà có người run, có người nổi nóng đòi báo thù ngay. Lời cảnh cáo ấy chưa ghi tên ai, nhưng cả vùng biết nó từ đâu tới.`,
 c=>[F('Tăng người canh, lập lệ giờ giấc ra vào',{t:'Nhà bớt đi lại, cổng đóng sớm. Phiền phức, nhưng đêm ngủ yên hơn.',u:{pw:6,ky:3},f:{tam:-2},cost:4}),
   F('Nhờ người thân quen có chức phận can thiệp',{t:'Một lời từ trên xuống khiến đám tay chân họ Phạm tạm lui. Nhà mình nợ một ân tình.',u:{all:4,ky:2}}),
   F('Nén giận, coi như không thấy',{t:'Không ai nhắc lại, nhưng đêm ấy trong nhà không ai ngủ. Họ Phạm thấy nhà mình không phản ứng, và hiểu như một sự nhường.',u:{ky:-2,hn:8},f:{tam:-6}})],
 {ch:1,vw:4,vc:after('pm_a4',3)}),
E('pm_a7','Người trong họ chia ý',
 c=>`Trong họ bắt đầu xì xào: người bảo "đừng đụng vào họ Phạm, cả nhà mình còn phải sống", người bảo "mộ tổ, danh tiết mà không đòi thì còn mặt mũi nào". ${N(c)} phải làm người giữ lẽ giữa hai tiếng nói.`,
 c=>[F('Giữ gia pháp, ai tự ý đụng đến họ Phạm đều phải hỏi gia chủ',{t:'Gia pháp được nhắc lại trước bàn thờ tổ. Nhà mình bớt tiếng ồn, và người nóng tính phải ngồi yên.',u:{pw:3,ky:-1},f:{tam:1}}),
   F('Nghe người nhún nhường, bảo lùi một bước',{t:'Người nhún nhường thấy mình thắng thế. Người nóng nảy lặng lẽ tìm đường riêng.',u:{pw:-3,ky:-3,hn:3},f:{tam:-3}}),
   F('Cho phép những người nóng tính ra ở riêng, tự lo',{t:'Một nhánh nhỏ tách ra, mang theo lòng uất. Nhà mình nhẹ gánh, nhưng cũng bớt người.',u:{pw:-4,hn:5,all:1},f:{tam:-3}})],
 {ch:1,vw:3,vc:after('pm_a5',2)}),
E('pm_a8','Hào lý mới nhậm',
 c=>`${KF()} vừa được bổ vào vùng này. Người đầu tiên đến bái kiến là một hào lý mới nhậm của họ Phạm, trẻ tuổi, tay áo thêu chỉ vàng. Hắn nói quốc công phủ "mong nhà ${N(c)} thông cảm cho nhau".`,
 c=>[F('Chấp nhận, tiếp đãi theo lệ',{t:'Hào lý mới hài lòng ra về. Nhà mình giữ được bề ngoài.',u:{ky:-2,hn:3},f:{fame:-1}}),
   F('Từ chối lễ vật, nói rõ nhà mình không cần ân huệ',{t:'Hào lý biến sắc rồi cười gượng. Câu nói lan khắp huyện trong ba ngày.',u:{ky:6,all:3},f:{fame:4}}),
   F('Kết thân, mời đi ăn, dò la thêm',{t:'Hắn trẻ, khoe khoang, và vô tình để lộ vài chuyện về cách họ Phạm làm việc. Nhà mình ghi lại tất cả.',u:{pf:4,wit:2,ky:2},f:{tam:-1},cost:3})],
 {ch:1,vw:4,vc:after('pm_a6',2)}),

/* ===================== CHƯƠNG 2 · GỐC RỄ: KIẾM CHỨNG CỨ ===================== */
E('pm_b1','Cuốn sổ thứ hai',
 c=>`Một người thân quen ngầm báo: ${OR().ev} có thể vẫn còn, cất trong tay một thư lại già đã về hưu. Nhưng người cầm giữ chỉ chịu giao nếu nhà mình chịu ra giá hoặc ra mặt.`,
 c=>[O('Mua chuộc người giữ',{tri:0.5,khau:0.8},60,{y:'Ông ta nhận tiền, giao ra một bản chép tay. Giấy cũ, mực nhạt, nhưng đủ chữ.',yu:{pf:12,ky:3},n:'Ông ta nhận tiền rồi quay mặt, bảo "không có gì". Tiền mất, chuyện lộ.',nu:{ky:5,fail:0},cost:12}),
   O('Lẻn vào tìm khi ông ta vắng',{vo:0.6,eq:0.5,tri:0.4},48,{y:'Lục được cuốn sổ trong hòm mục dưới gầm giường. Rút đi êm.',yu:{pf:14,ky:2},yf:{tam:-2},n:'Chó sủa, hàng xóm tỉnh dậy. Nhà mình thoát được nhưng mang tiếng.',nu:{ky:8,lo:6},nf:{fame:-5,tam:-5}}),
   O('Nhờ một thầy kiện hỏi xin theo đường lễ',{tri:0.8,khau:0.7},55,{y:'Thầy kiện khuyên ông ta trao nộp để tránh rắc rối về sau. Ông ta cân nhắc rồi đưa một bản sao.',yu:{pf:9,all:2},n:'Ông ta cảnh giác, đóng cửa. Thầy kiện bảo: "Để thời gian."',nu:{pf:1},cost:6})],
 {ch:2,vw:3,vc:(c,a)=>true}),
E('pm_b2','Người làng bị giấu',
 c=>`Nhà mình tìm ra dấu vết ${OR().wit}: ông ta nay không còn ở làng cũ, người ta bảo họ Phạm cho một khoản tiền để ông đi xa. Có thể tìm thấy, nếu chịu bỏ công.`,
 c=>[O('Tìm bằng được, đưa về nơi an toàn',{eq:0.6,tri:0.6,vo:0.3},52,{y:'Tìm thấy ông ở một làng xa. Ông già, sợ, nhưng chịu kể và chịu đứng ra làm chứng khi cần.',yu:{wit:12,ky:3},n:'Đến nơi thì ông đã dọn đi nơi khác. Dấu vết bị xóa sạch.',nu:{ky:3},nf:{tam:-3},cost:8}),
   O('Che chở ông ta ngay trong nhà',{eq:0.5,tri:0.4},60,{y:'Ông ở lại trong nhà như người thân. Mỗi ngày kể thêm một mảnh.',yu:{wit:10,pw:1,ky:4},n:'Kẻ lạ nhòm ngó quanh nhà, ông sợ hãi bỏ trốn giữa đêm.',nu:{ky:5,wit:-2}}),
   O('Thuê võ sĩ hộ tống ông đi lánh nơi khác',{vo:0.6,eq:0.4},55,{y:'Ông đi an toàn, tên ông được giữ kín trong ba năm.',yu:{wit:8,pw:2},n:'Dọc đường bị chặn, võ sĩ chạy tán loạn. Ông mất tích.',nu:{wit:-3,ky:6},cost:12})],
 {ch:2,vw:3,vc:after('pm_b1',0)}),
E('pm_b3','Lá thư lạc',
 c=>`Một người đưa thư, say rượu, làm rơi một túi thư tại bến đò gần nhà ${N(c)}. Trong đó có một lá đề tên ${KF()} gửi cho ${OR().post}. Bóng đêm, không ai thấy.`,
 c=>[F('Giữ lại, đọc kỹ rồi mới trả túi thư',{t:'Lá thư nói về một khoản tiền "cần xử lý trước khi thanh tra tới". Không rõ ràng, nhưng cho thấy bàn tay thật.',u:{pf:8,ky:2,lo:3},f:{tam:-2}}),
   O('Sao chép nhanh rồi gửi trả',{khau:0.4,eq:0.7,tri:0.5},62,{y:'Người đưa thư tỉnh rượu, lo lắng nhận lại túi thư, không hay biết gì. Nhà mình có bản sao.',yu:{pf:10},n:'Người đưa thư tỉnh rượu giữa lúc đang chép. Một trận cãi, rồi hắn bỏ chạy báo tin.',nu:{ky:7,lo:5},nf:{fame:-3}}),
   F('Trả nguyên vẹn, coi như chưa thấy',{t:'Người đưa thư cảm tạ rối rít. Nhà mình giữ được lòng ngay thẳng, mất một cơ hội.',u:{ky:-1,dt:2},f:{fame:2,tam:1}})],
 {ch:2,vw:2,vc:(c,a)=>true}),
E('pm_b4','Lão thợ đóng kho',
 c=>`Một lão thợ mộc tới nhà xin việc vặt, tình cờ kể rằng hồi trẻ ông đóng cho họ Phạm một cái kho có hai lớp vách. ${N(c)} nghe, hỏi kỹ: lớp vách trong dùng để giấu gì?`,
 c=>[O('Đưa tiền, nhờ ông kể hết',{khau:0.7,eq:0.4},62,{y:'Ông kể chỗ kho, cách mở vách, và cả tên vài người thường ra vào. Một mảnh bản đồ vẽ tay.',yu:{wit:8,pf:3},n:'Ông nhận tiền rồi nói lấp lửng, rồi từ chối nhắc lại.',nu:{pf:0},cost:5}),
   O('Dọa nhẹ: nếu không nói, nhà sẽ nhờ quan hỏi',{vo:0.5,eq:0.4},45,{y:'Ông tái mặt, kể ngay. Nhưng từ đó ông tránh mặt nhà mình.',yu:{wit:7,pf:3,dt:-2},n:'Ông bỏ đi và đồn khắp nơi nhà mình dọa người.',nu:{fail:1,dt:-3},nf:{fame:-4}}),
   O('Nhờ người thân của ông thuyết phục',{eq:1,khau:0.4},55,{y:'Qua lời con gái ông, ông chịu kể từng chuyện, từng buổi.',yu:{wit:10,all:1},n:'Gia đình ông sợ liên lụy, khuyên ông im lặng.',nu:{wit:-1}})],
 {ch:2,vw:3,vc:after('pm_b1',12)}),
E('pm_b5','Người lính cũ từ biên ải',
 c=>`Một người lính già về làng, tay chân tàn tật, nhắc đến tên Phạm Xuân Huấn bằng giọng nửa kính nửa hận. Ông kể về cách họ Phạm "lập công" thuở khai quốc: những trận đánh mà người của ông ngã xuống còn tên Phạm ghi thành công của mình.`,
 c=>[F('Nghe cho hết, ghi lại từng lời',{t:'Ông kể suốt đêm. Có những chuyện không dùng được, có những chuyện làm nhà mình lạnh gáy.',u:{wit:5,pf:3,dt:3},f:{tam:-2}}),
   O('Nhờ ông cùng lên kinh trình bày với người có thế',{eq:0.8,khau:0.6},50,{y:'Ông chịu đi. Ở kinh có người nghe, và biết thêm về họ Phạm và cả ông Nguyễn Thành Duy.',yu:{wit:6,all:3,ky:3},n:'Ông già yếu, lên đường nửa chừng thì ngã bệnh. Chuyến đi hỏng.',nu:{wit:-1},cost:10}),
   F('Cho ông tiền và chỗ ở, không nhờ gì thêm',{t:'Ông rưng rưng cảm tạ. Nhà mình thêm một người bạn trung thành, lặng lẽ.',u:{dt:4,wit:2},f:{fame:2},cost:3})],
 {ch:2,vw:3,vc:(c,a)=>true}),
E('pm_b6','Quá khứ của Duy',
 c=>`Ông ${DN()} vẫn là một ẩn số. Nhà mình muốn biết ông ta từ đâu tới, vì sao rời bỏ họ Phạm hay chưa rời bỏ, có thật sự đáng tin hay không.`,
 c=>[O('Thuê người hỏi về gốc gác ông ta ở quê cũ',{tri:0.8,muu:0.7},58,{y:'Hóa ra họ Phạm từng giết cả nhà ông một lần, hắn sống sót nhờ trốn trong giếng. Hận thù của ông là thật.',yu:{pf:2},yf:{},n:'Người hỏi về chỉ thu được những lời đồn trái ngược.',nu:{ky:3},cost:6,x:{}}),
   O('Tự đi gặp, hỏi thẳng',{eq:0.8,khau:0.7},50,{y:'Ông nhìn thẳng mắt nhà mình, kể một nửa sự thật, và nhà mình tin được một nửa ấy.',yu:{pf:3,all:1},n:'Ông bực vì bị thăm dò, ngưng liên lạc nửa năm.',nu:{ky:1}}),
   F('Để ông tự nói khi muốn',{t:'Nhà mình không hỏi. Ông không nói, và hai bên ngầm giữ khoảng cách.',u:{}})],
 {ch:2,vw:2,vc:(c,a)=>a.done.pm_a4!=null&&a.D.link>0}),
E('pm_b7','Người buôn cũ của họ Phạm',
 c=>`Một lái buôn từng làm ăn lâu năm với họ Phạm, nay thua lỗ, bực dọc, sẵn lòng nói chuyện về dòng tiền của họ Phạm với ai trả đủ giá.`,
 c=>[O('Mua tin của ông ta',{khau:0.8,tri:0.5},62,{y:'Ông ta kể cách họ Phạm rửa tiền qua mấy hiệu buôn. Có tên và số.',yu:{pf:10,all:2,ky:3},n:'Tin ông ta bán là tin cũ, nửa thật nửa bịa.',nu:{ky:2},cost:12}),
   O('Nhờ người trong nghề dò la hộ',{khau:0.6,mi:0.4},55,{y:'Hai tuần sau có một tập danh sách hiệu buôn, vài ghi chú. Thêm một chút bạn bè trong giới.',yu:{pf:6,all:4},n:'Hai tuần sau không có gì cả, chỉ có thêm vài lời hỏi han tò mò.',nu:{lo:2},cost:5}),
   F('Từ chối: nhà mình không làm việc với kẻ bán tin',{t:'Ông ta nhún vai. Có người khen nhà mình giữ thể diện, có người chê nhà mình dại.',u:{dt:1},f:{fame:2}})],
 {ch:2,vw:3,vc:after('pm_b1',6)}),
E('pm_b8','Ngày giỗ ở từ đường họ Phạm',
 c=>`Ngày giỗ Phạm Xuân Huấn, quan khách quanh vùng đều đến. Nhà ${N(c)} có thiếp mời, một lời mời khó chối. Vào đó là vào hang cọp, nhưng cũng là dịp nhìn tận mắt.`,
 c=>[O('Lẻn quan sát, nghe ngóng giữa đám đông',{tri:0.7,eq:0.5},50,{y:'Nghe được vài câu giữa các quản gia: tên người, khoản tiền, ngày hẹn. Nhớ kỹ từng chữ.',yu:{pf:7,wit:2},n:'Một người hầu nhận ra mặt nhà mình đứng lảng vảng quá lâu.',nu:{ky:8,lo:4},nf:{fame:-2}}),
   O('Nói chuyện với người hầu, hỏi thăm chuyện cũ',{khau:0.8,mi:0.6},55,{y:'Một bà già bếp kể lan man chuyện trong nhà, đủ cho nhà mình chắp thành ba mảnh.',yu:{wit:5,pf:3},n:'Bà già biết ý, nói toàn chuyện cơm nước.',nu:{}}),
   F('Cúi đầu thắp hương thật lòng',{t:'Bài vị Phạm Xuân Huấn nhìn xuống. Dù ân oán, nhà mình giữ lễ, và lòng nhẹ đi một chút. Họ Phạm ghi nhận cái cúi đầu.',u:{ky:-4,hn:-2},f:{tam:2}})],
 {ch:2,vw:3,vc:after('pm_a8',6)}),
E('pm_b9','Cánh tay phải bị bắt',
 c=>`${OR().post[0].toUpperCase()+OR().post.slice(1)} bị bắt vì một vụ không dính tới nhà mình: đánh người. Hắn đang nằm trong ngục huyện. Nhà mình có thể gặp hắn, một lần.`,
 c=>[O('Tra khảo, hỏi từng chuyện',{vo:0.4,tri:0.7,khau:0.5},48,{y:'Hắn khai ra vài chuyện nhỏ nhưng khớp với những gì nhà mình đã biết.',yu:{wit:7,pf:3,dt:-2},n:'Hắn nghiến răng không nói. Cai ngục báo lại rằng nhà mình dùng nhục hình.',nu:{ky:4,fail:1},nf:{fame:-4}}),
   O('Mua chuộc, hứa giữ kín',{khau:0.9,tri:0.4},55,{y:'Hắn nhận lời. Ba ngày sau, hắn gửi một mảnh giấy ra ngoài.',yu:{pf:9,wit:3,ky:3},n:'Hắn nhận tiền rồi báo lại với họ Phạm. Họ Phạm biết nhà mình đang dò.',nu:{ky:9,lo:6},cost:10}),
   F('Thả, để hắn mang ơn',{t:'Hắn được nhà mình bảo lãnh. Từ đó, thỉnh thoảng có tin nhỏ rỉ ra từ phía hắn.',u:{wit:3,all:2,ky:2,hn:-2},cost:5})],
 {ch:2,vw:2,vc:after('pm_b3',6)}),
E('pm_b10','Hội kín của người bị hại',
 c=>`Có tin về một nhóm người, hầu hết là kẻ từng bị họ Phạm làm hại, thỉnh thoảng họp ở một ngôi chùa hoang để bàn việc đòi lẽ. Họ nghe danh nhà ${N(c)} và gửi lời mời.`,
 c=>[F('Nhập hội, cùng góp công góp của',{t:'Hội nhỏ nhưng đông tình. Ai cũng có một câu chuyện oan, và nhà mình có thêm bạn.',u:{all:8,dt:5,ky:5,pw:2},f:{tam:2},cost:5}),
   O('Dẫn dắt, đề nghị lập lề lối',{eq:1,khau:0.7,tri:0.5},48,{y:'Hội có kỷ luật hơn, giữ kín hơn, và nhà mình thành người cầm trịch.',yu:{all:10,dt:6,pw:4,ky:8},n:'Có người không phục. Hội chia hai nhóm, một nhóm tố giác lên huyện.',nu:{ky:10,all:2,lo:4}}),
   F('Đứng ngoài, chỉ giữ liên lạc',{t:'Nhà mình không nhập hội, nhưng giữ kẽ hở giao hảo. Nếu cần, có chỗ để nhờ.',u:{all:3,ky:1}})],
 {ch:2,vw:3,vc:(c,a)=>cnt('wit')+cnt('pf')>=10}),
E('pm_b11','Tờ cáo trạng dở dang',
 c=>`Một thầy cãi nổi tiếng chịu soạn giúp một tờ cáo trạng dựa trên những gì nhà mình đã thu được. Nhưng ông ta hỏi: "Chọn tội nào làm gốc?" Mỗi tội một giá phải trả, và mỗi tội một cánh cửa mở ra.`,
 c=>[F('Tham ô: dựa vào sổ sách và dòng tiền',{t:'Tờ cáo trạng nói về khoản tiền công đã mất. Rõ ràng, dễ kiểm. Cần nhiều chứng từ.',u:{pf:4,ky:5},f:{},cost:6,then:()=>{AA().fl.cao='tham';return ''}}),
   F('Lạm quyền: dựa vào những việc đã làm sai phép',{t:'Tờ cáo trạng kể từng vụ chiếm đất, chèn ép dân. Cần nhân chứng, nhiều.',u:{wit:3,ky:5},cost:6,then:()=>{AA().fl.cao='lam';return ''}}),
   F('Vu cáo: dựa vào những lời bịa đặt đã hại nhà mình',{t:'Tờ cáo trạng nhắm vào những đòn đã đánh nhà mình. Nặng nhưng khó chứng minh trọn vẹn.',u:{hn:3,ky:4},cost:6,then:()=>{AA().fl.cao='vu';return ''}})],
 {ch:2,vw:2,vc:(c,a)=>cnt('pf')>=14||cnt('wit')>=14}),
E('pm_b12','Một vị quan chịu nghe',
 c=>`Nghe nói trong Đô sát viện có một vị quan công chính, từng chê trách những bản án thiên vị họ Phạm. Ông ta ít khi tiếp khách. Nhà mình có thể thử gặp.`,
 c=>[O('Bí mật gặp, trình bày thẳng',{tri:0.8,eq:0.8},45,{y:'Ông nghe hết, im lặng một lúc lâu. Rồi nói: "Khi có đủ giấy tờ, hãy đến."',yu:{all:8,pf:2,ky:3},n:'Ông ta nghe, rồi tiễn khách nhạt nhẽo. Cánh cửa khép lại.',nu:{ky:5,lo:2},cost:8}),
   O('Nhờ qua thông gia, nói bóng',{eq:0.7,khau:0.7},55,{y:'Người trung gian nói khéo, và vị quan gật đầu hẹn gặp lại.',yu:{all:6,ky:1},n:'Người trung gian ngại chuyện, nói qua loa rồi thôi.',nu:{},cost:4}),
   F('Thử lòng ông bằng một việc nhỏ, rồi mới nhờ',{t:'Việc nhỏ ấy ông xử rất công tâm, bất chấp một lời nhờ vả của họ Phạm. Nhà mình tin ông hơn.',u:{all:5},f:{},cost:3})],
 {ch:2,vw:2,vc:(c,a)=>cnt('pf')>=10}),
E('pm_b13','Món nợ cũ của họ Phạm với họ khác',
 c=>`Qua các cuộc gặp gỡ, nhà mình biết họ Phạm còn nợ các họ khác trong vùng những món nợ không nhỏ: ruộng, nước, chuyện làm ăn. Các họ ấy chưa có ai đứng lên cầm đầu.`,
 c=>[F('Nhắc nhở các họ, kể chuyện nhà mình, không đòi hỏi',{t:'Có họ gật gù, có họ tránh mặt. Những lời nhắc ấy sẽ lên men.',u:{all:7,dt:3,ky:3}}),
   F('Mời vài họ cùng ăn một bữa cơm, bàn việc chung',{t:'Ba họ nhận lời. Bữa cơm không có kết luận, nhưng cả ba cùng thấy mình không đơn độc.',u:{all:9,ky:5,pw:2},f:{tam:2},cost:6}),
   F('Chưa vội, chờ họ tự tìm tới',{t:'Có họ tìm tới nhà mình thật, vài tháng sau, sau khi bị họ Phạm làm khó.',u:{all:3,ky:-1}})],
 {ch:2,vw:2,vc:(c,a)=>cnt('all')>=3||a.done.pm_b10!=null}),
E('pm_b14','Mừng thọ Quốc công',
 c=>`Quốc công Phạm Nhật Vượng, con trưởng Phạm Xuân Huấn, mừng thọ. Ông là võ tướng, hiền hơn em, người ta bảo không thích những chuyện ${KG()} làm. Nhà ${N(c)} nhận thiếp mời.`,
 c=>[F('Đi dự, tặng một món quà ý nhị',{t:'Quốc công tiếp hòa nhã, hỏi thăm gia cảnh nhà mình, ánh mắt như muốn nói gì mà không nói. Nhà mình đọc được thế lực thật của họ Phạm qua cách mọi người đứng và ngồi.',u:{pf:2,all:2,ky:1,hn:-2},f:{fame:2},cost:12}),
   O('Đi dự, quan sát kỹ quan hệ giữa các bên',{tri:0.8,eq:0.6},55,{y:'Nhận ra Quốc công và Kiên không hợp: hai anh em không nhìn nhau suốt tiệc. Một kẽ hở.',yu:{all:4,pf:3},n:'Quan sát lộ liễu, bị gia nhân nhắc "mời quý khách dùng tiệc".',nu:{ky:5,lo:3},cost:12}),
   F('Cáo bệnh không đến, gửi quà',{t:'Quốc công nhận quà mà không nói gì. Nhà mình bỏ lỡ một dịp.',u:{ky:-1},cost:5})],
 {ch:2,vw:2,vc:after('pm_a8',24)}),

/* ===================== ĐÒN PHẢN KÍCH (nhóm K) ===================== */
E('pm_k1','Thuế khống',
 c=>kv(`Một tờ lệnh nghe rất đường hoàng: nhà ${N(c)} phải nộp một khoản "thuế bổ sung" theo điều lệ nào đó chẳng ai từng thấy. Đóng dấu đỏ, ký tên thanh liêm.`,`Lính thuế tới nhà, mang theo dùi cui, đòi một khoản thuế "quá hạn" mà nhà mình chưa từng nghe.`,`Một thư lại lễ phép đến nhà, bảo có sai sót trong sổ thuế năm xưa, cần "bổ sổ", và chìa ra một con số cứ như đã tính xong từ lâu.`),
 c=>[F('Nộp cho yên chuyện',{t:'Tiền nộp xong, người ta lui. Nhà mình thở dài.',u:{ky:-2,fail:0},cost:10}),
   O('Kiện lên huyện, chống lệnh',{tri:0.9,khau:0.6},50,{y:'Huyện lệnh xét thấy lệnh thuế vô căn cứ. Lệnh bị hủy, và người ra lệnh mất một ít uy.',yu:{pf:3,ky:3,dt:2},n:'Huyện lệnh nhìn trước ngó sau, rồi bác. Nhà mình phải nộp cả tiền phạt chậm.',nu:{fail:1,ky:3},nf:{fame:-3},cost:6}),
   O('Nhờ người có chức phận nói giúp',{eq:0.8,khau:0.6},55,{y:'Một lời từ cấp trên làm khoản thuế được "xem lại" và biến mất.',yu:{all:2,ky:2},n:'Lời nói giúp đến muộn, khoản thuế đã vào sổ.',nu:{fail:1},nf:{tam:-3},cost:5})],
 {ch:2,vw:3,vc:(c,a)=>cnt('ky')>=6&&kv(1,0,1)}),
E('pm_k2','Kho bị cháy',
 c=>kv(`Đêm khuya, kho thóc nhà ${N(c)} bốc cháy. Không ai thấy lửa bắt từ đâu, chỉ thấy bóng người chạy dọc bờ ruộng.`,`Một toán người lạ mặt ập vào đốt kho nhà ${N(c)} giữa đêm, chặn cả đường chữa cháy.`,`Kho nhà ${N(c)} cháy. Sáng ra, người nhà tìm thấy đồ nghề của một thợ đã bị mua chuộc, bỏ lại vội trong góc vườn.`),
 c=>[O('Dốc sức cứu kho, cứu được gì hay nấy',{vo:0.5,eq:0.5},55,{y:'Cứu được quá nửa. Cả xóm chạy ra giúp, nhà mình được tiếng.',yu:{dt:4,pw:2,ky:2},yf:{tam:-3},n:'Lửa quá lớn, chỉ cứu được vài vật nhỏ. Cả mùa phải lo lại.',nu:{pf:0},nf:{tam:-6},cost:6}),
   F('Tìm người đốt, trả thù',{t:'Tìm ra một tên đã bị mua. Trả thù hắn là chuyện dễ, nhưng tên ấy không phải người đứng sau.',u:{wit:3,ky:6,fail:1},f:{fame:-2}}),
   F('Chịu mất, âm thầm lo lại',{t:'Mất một phần của cải, mất một phần lòng yên tâm.',u:{hn:5,pw:-3},f:{tam:-5},cost:10})],
 {ch:2,vw:3,vc:(c,a)=>cnt('ky')>=12&&kv(0,1,0)}),
E('pm_k3','Bắt giam một người',
 c=>`Một người trong nhà ${N(c)} bị bắt vì "tội" nghe ra chính đáng: lạm thu, đánh người, thậm chí thông đồng với giặc. Nhà mình đủ biết đó là bịa. Nhưng án đã lập và người đã bị giam.`,
 c=>{const k=kids().find(p=>p.id!==c.id&&G.age(p)>=16);return [pay('Lo lót, chạy án',20,{r:[{khau:0.8,eq:0.5},55],y:c=>{up({ky:2,fail:0});return 'Người nhà được thả về, gầy rộc và im lặng.'+fx(c,{money:-m(20),tam:-3})},n:c=>{up({fail:1,ky:3});return 'Tiền đi, người ở lại. Phải tính cách khác.'+fx(c,{money:-m(20),tam:-5})}}),
   O('Thuê thầy cãi, theo đúng luật',{tri:0.9,khau:0.7},50,{y:'Thầy cãi lật được lời khai, người nhà được trắng án. Vụ này đưa nhà mình tới gần hơn với thầy cãi ấy.',yu:{pf:4,all:2,ky:3},n:'Thầy cãi bị chặn cửa tòa. Người nhà ăn một án nhẹ.',nu:{fail:1,ky:3},nf:{fame:-4},cost:12}),
   F('Chuộc bằng tiền',{t:'Người nhà ra tù. Hóa đơn chuộc là bạc nặng, nhưng cả nhà thở phào.',u:{ky:-1,hn:4},f:{tam:2},cost:25})]},
 {ch:2,vw:3,vc:(c,a)=>cnt('ky')>=14}),
E('pm_k4','Tin đồn bôi nhọ',
 c=>kv(`Chợ nổi tiếng nhà ${N(c)} "bất hiếu, bất nghĩa, nuôi ý phản loạn". Những lời ấy được kể bằng giọng thương xót, chứ không phải giận dữ. Nghe thì rất đáng tin.`,`Tường làng bị dán đầy hịch viết tay, mô tả nhà ${N(c)} như một lũ giặc giả danh nhà nho.`,`Tin đồn đến từng chút một, từ ba hướng khác nhau, hợp lại thành một bức tranh nhà ${N(c)} xấu xa nhất có thể.`),
 c=>[O('Cải chính công khai, mời người làng chứng kiến',{khau:1,eq:0.6},52,{y:'Lời cải chính được nghe. Người làng nhớ ra những việc tốt nhà mình từng làm.',yu:{dt:5,ky:2},yf:{fame:5},n:'Cải chính bị bóp méo thành "chột dạ". Lời đồn càng lan.',nu:{dt:-3,ky:3,fail:1},nf:{fame:-6}}),
   F('Im lặng, tin thời gian sẽ phân xử',{t:'Lời đồn nguội dần, nhưng một số người xa lánh nhà mình.',u:{dt:-2,hn:4},f:{fame:-3,tam:-3}}),
   O('Đánh trả: tung ngược tin đồn về họ Phạm',{khau:0.9,mi:0.6},45,{y:'Một câu chuyện thật, kể đúng lúc, đủ để chuyển hướng cả huyện.',yu:{dt:6,ky:7,pf:2},n:'Câu chuyện nhà mình bị lật tẩy là chưa kiểm chứng, nhà mình mang tiếng vu cáo.',nu:{fail:1,ky:6,dt:-4},nf:{fame:-8}})],
 {ch:2,vw:3,vc:(c,a)=>cnt('ky')>=8}),
E('pm_k5','Cướp hàng giữa đường',
 c=>`Chuyến hàng của nhà ${N(c)} bị chặn giữa đường: một toán "thổ phỉ" gọn gàng bất thường lấy sạch rồi biến mất. Hàng nằm trong tay họ Phạm trước khi quan huyện kịp lập biên bản.`,
 c=>[pay('Thuê hộ tống cho các chuyến sau',12,{f:c=>{up({pw:3,ky:1});return 'Các chuyến sau đi có người hộ tống, bớt lo.'+fx(c,{money:-m(12)})}}),
   O('Kiện, xin truy tìm',{tri:0.7,khau:0.6},40,{y:'Quan huyện chịu nhận đơn, và tìm lại được một phần hàng.',yu:{pf:3,wit:2,ky:2},n:'Đơn bị gác lại. Đám phỉ biến mất như chưa từng có.',nu:{fail:1},nf:{tam:-3},cost:4}),
   F('Chịu thiệt, thôi chuyến này',{t:'Tổn thất không nhỏ. Nhà mình rút kinh nghiệm bằng tiền.',u:{hn:5,pw:-2},f:{tam:-4},cost:15})],
 {ch:2,vw:3,vc:(c,a)=>cnt('ky')>=16}),
E('pm_k6','Chiếm ruộng bằng văn tự',
 c=>kv(`Một tờ văn tự lạ hiện ra, nói mảnh ruộng bờ sông nhà ${N(c)} thuộc về họ Phạm từ thời "khai quốc". Chữ ký thật, ấn thật, chỉ có nội dung giả.`,`Nhóm người của họ Phạm kéo ra bờ ruộng cắm mốc, nói ruộng này đã thuộc về quốc công phủ.`,`Một thư lại cũ đến báo có người đã mua lại nợ cũ nhà mình, và sẽ "thu nợ bằng ruộng" trong tháng này.`),
 c=>[O('Kiện ra tòa, xin giữ nguyên hiện trạng',{tri:0.9,khau:0.5},50,{y:'Tòa nhận đơn. Việc kéo dài, nhưng ruộng nhà mình vẫn nguyên.',yu:{pf:4,wit:2,ky:3},n:'Tòa thiên vị, nhà mình thua phần lớn.',nu:{fail:1,ky:3},nf:{fame:-3,tam:-5},cost:8}),
   F('Nhường một phần để giữ phần còn lại',{t:'Ruộng mất một nửa. Phần kia được giữ yên, tạm thời.',u:{pw:-4,hn:6,ky:-2},f:{tam:-6}}),
   pay('Mua lại phần bị tranh chấp theo giá của họ',30,{f:c=>{up({ky:-1,hn:5});return 'Nhà mình trả tiền để mua lại chính mảnh ruộng của mình. Cay đắng, nhưng xong.'+fx(c,{money:-m(30),tam:-5})}})],
 {ch:2,vw:3,vc:(c,a)=>cnt('ky')>=18&&org()!=='buon'}),
E('pm_k7','Bữa cơm lạ vị',
 c=>`Trong bữa tối, ${N(c)} thấy món canh có vị lạ: ngọt nhẹ rồi se. Người nấu bếp mới nhận một tháng nay, ít nói.`,
 c=>[O('Nhờ người nếm hộ trước',{eq:0.8,tri:0.5},60,{y:'Người nếm hộ nhận ra mùi thuốc. Bát canh được đổ đi, người bếp bỏ trốn.',yu:{wit:3,ky:2},n:'Đã muộn: người nếm hộ ngã quỵ. Cứu được, nhưng mất sức một thời gian.',nu:{fail:1},nf:{suc:-18,tam:-6}}),
   O('Mời thầy thuốc xem',{tri:0.8},65,{y:'Thầy thuốc xác nhận có độc nhẹ. Nhờ phát hiện sớm, cả nhà không sao.',yu:{wit:2},n:'Thầy thuốc đến muộn, hai người đã đau bụng cả đêm.',nu:{fail:1},nf:{suc:-12},cost:4}),
   F('Bỏ qua, coi như vị mới của người bếp',{t:'Cả nhà ăn. Sáng hôm sau có hai người đau bụng dữ dội.',u:{fail:1,ky:-1},f:{suc:-20,tam:-8}})],
 {ch:2,vw:2,vc:(c,a)=>cnt('ky')>=24&&kv(0,0,1)||cnt('ky')>=34}),
E('pm_k8','Kẻ trong nhà',
 c=>`Nhà mình phát hiện có người trong nhà bán tin cho họ Phạm. Kẻ ấy không ác, chỉ thiếu tiền và sợ. Nhưng những chuyện nhà mình bàn ở phòng kín đã bị biết trước nhiều lần.`,
 c=>[O('Tìm ra và nói chuyện riêng',{eq:1,tri:0.6},60,{y:'Người ấy khóc, nhận tội, và hứa không tái phạm. Có thể dùng người ấy để nhắn lầm cho họ Phạm.',yu:{wit:2,ky:-3,lo:-4},n:'Người ấy chối, rồi bỏ trốn đêm hôm ấy.',nu:{lo:5,fail:1},nf:{tam:-4}}),
   F('Tha, nhưng đổi chỗ ở và công việc',{t:'Người ấy được tha, bớt biết chuyện. Nhà mình nới lòng một chút.',u:{lo:-2,ky:-1},f:{tam:-2}}),
   F('Xử theo gia pháp, đuổi khỏi nhà',{t:'Gia pháp được áp dụng nghiêm. Người cả nhà bàn tán, nhưng không ai dám tiết lộ nữa.',u:{pw:2,lo:-5,dt:-2},f:{tam:-3}})],
 {ch:2,vw:2,vc:(c,a)=>cnt('lo')>=8||cnt('ky')>=22}),
E('pm_k9','Quan trên gọi đối chất',
 c=>`Một người làm quan trong họ nhận được lệnh gọi lên đối chất về những "sai phạm" cũ. Lệnh nghe rất đường hoàng, mà tay đứng sau thì không khó đoán.`,
 c=>[O('Trình bày với đầy đủ giấy tờ',{tri:0.9,eq:0.5},55,{y:'Người ấy bình tĩnh trả lời từng câu. Đối chất qua, chỉ phải nhận lời nhắc nhở.',yu:{ky:2,all:1},n:'Một giấy tờ then chốt bị thất lạc đúng lúc ấy. Người ấy bị giáng chức.',nu:{fail:1},nf:{fame:-6,tam:-8}}),
   O('Nhờ cấp trên đỡ đòn',{khau:0.8,eq:0.6},50,{y:'Cấp trên lên tiếng bảo vệ. Họ Phạm rút lui nửa chừng.',yu:{all:3,ky:3},n:'Cấp trên né tránh. Người ấy chịu một mình.',nu:{fail:1},nf:{tam:-6},cost:8}),
   F('Từ chức, về quê tránh đòn',{t:'Người ấy xin từ, mang tiếng bỏ chạy nhưng giữ được thân.',u:{pw:-4,ky:-3,hn:5},f:{fame:-6,tam:-6}})],
 {ch:2,vw:2,vc:(c,a)=>cnt('ky')>=20&&hasQuan()}),
E('pm_k10','Phạm gia kiện ngược',
 c=>`Họ Phạm nộp đơn lên tòa kiện chính nhà ${N(c)}: tội vu cáo, tội xâm phạm đất công, tội gây rối trật tự. Đơn dày và có nhiều chữ ký.`,
 c=>[O('Thuê thầy cãi giỏi, đối đáp từng điều',{tri:0.9,khau:0.7},48,{y:'Thầy cãi chặn từng điều. Cuối cùng tòa bác phần lớn đơn.',yu:{pf:3,all:2,ky:3},n:'Thầy cãi thua nhiều điều. Nhà mình mất một khoản phạt và mang tiếng.',nu:{fail:2,ky:3},nf:{fame:-8,tam:-6},cost:18}),
   pay('Lo lót quan xử',25,{r:[{khau:0.9,eq:0.4},52],y:c=>{up({ky:1});return 'Quan xử nể tình, đơn kiện bị gác lại.'+fx(c,{money:-m(25)})},n:c=>{up({fail:1,ky:3});return 'Tiền đã đi, đơn vẫn nguyên. Quan ấy là người của họ Phạm.'+fx(c,{money:-m(25),fame:-4})}}),
   F('Nhún nhường, xin hòa giải',{t:'Họ Phạm nhận hòa giải, với điều kiện nhà mình thừa nhận "sai sót". Nhà mình nuốt vào.',u:{ky:-4,hn:8,pf:-2,fail:1},f:{fame:-6,tam:-8}})],
 {ch:2,vw:3,vc:(c,a)=>cnt('ky')>=30}),

/* ===================== NGÃ RẼ ===================== */
E('pm_f0','Ngã rẽ',
 c=>`Nhiều năm đã qua. Nhà ${N(c)} biết nhiều hơn xưa, mất nhiều hơn xưa, và ${KF()} đã là ${RK().toLowerCase()}. Đến lúc phải chọn lối đi cho chuyện này. Một khi bước vào, không còn đường quay lại.`,
 c=>[F('Kiện lên cửa quan, theo đúng luật',{t:'Nhà mình chọn con đường chậm mà ngay thẳng: đưa chuyện ra công đường.',then:()=>{G.arc.fork('pm','br','P');return ''},x:{}}),
   F('Tìm người cùng chí hướng trong triều',{t:'Nhà mình chọn đứng vào một phe để đánh một phe.',then:()=>{G.arc.fork('pm','br','F');return ''}}),
   F('Dựa vào gia binh, người giang hồ và sức mạnh trong tay',{t:'Nhà mình chọn dùng sức, dù biết cái giá có thể là mạng.',then:()=>{G.arc.fork('pm','br','V');return ''}}),
   F('Đánh vào túi tiền họ Phạm',{t:'Nhà mình chọn đi con đường của người buôn: nợ, hàng, sổ sách.',then:()=>{G.arc.fork('pm','br','T');return ''}}),
   F('Kể cho thiên hạ nghe, nhờ sĩ phu và dân',{t:'Nhà mình chọn để tiếng nói của dân và sĩ phu làm sức nặng.',then:()=>{G.arc.fork('pm','br','M');return ''}}),
   F('Hợp các họ bị hại lại, thành một mặt trận',{t:'Nhà mình chọn đi con đường của liên minh.',then:()=>{G.arc.fork('pm','br','L');return ''}}),
   F('Nhẫn nhịn, chờ họ Phạm tự sai',{t:'Nhà mình chọn chờ, và chờ có nghĩa là phải sống sót qua những năm chờ.',then:()=>{G.arc.fork('pm','br','H');return ''}})],
 {ch:3,vw:10,vc:()=>false}),

/* ===================== DUY ===================== */
E('pm_d1','Khách lạ giữa đêm',
 c=>`Nửa đêm, một người lạ mặt gõ cửa nhà ${N(c)}, đưa vào một cuộn giấy nhỏ rồi biến mất. Chữ trong thư là của ${DN()}: "Họ Phạm đang bàn một việc ở biên ải. Chưa tiện nói. Giữ gìn."`,
 c=>[F('Giữ thư, chờ thêm tin',{t:'Nhà mình giấu bức thư vào chỗ kín. Ông Duy hẳn đang trong cảnh ngặt.',u:{ky:2},then:()=>{AA().D.link+=6;return ''}}),
   F('Nhờ người dò tin ở biên ải',{t:'Tin tìm về chậm và lẻ tẻ, nhưng có điều gì đó đúng như ông Duy nói.',u:{pf:3,ky:4},cost:8,then:()=>{AA().D.link+=4;return ''}}),
   F('Đốt thư, coi như không thấy',{t:'Tro bay ra cửa sổ. Nhà mình tránh một rủi ro, và bỏ một cơ hội.',u:{ky:-2},then:()=>{AA().D.link-=6;return ''}})],
 {ch:2,vw:2,vc:(c,a)=>a.done.pm_a4!=null&&a.D.link>=4&&a.D.ok&&a.done.pm_b5!=null}),
E('pm_d2','Mật thư bán ải',
 c=>`Qua đường dây ông ${DN()}, nhà mình có một bức mật thư: họ Phạm có liên hệ với một viên tướng biên ải, và nghi vấn buôn bán trái phép qua cửa ải. Nếu thật, đó là tội lớn, thậm chí tội thông địch.`,
 c=>[F('Giữ làm chứng cứ then chốt, chưa tung ra',{t:'Bức thư nằm im trong một cái hộp. Nó có thể là con át chủ bài, hoặc là lưỡi dao sắp rơi.',u:{pf:12,ky:4}}),
   O('Nhờ xác minh qua người đáng tin',{tri:0.8,khau:0.6},50,{y:'Xác minh được một nửa: thư thật, nhưng chưa đủ để buộc tội.',yu:{pf:9,all:3,ky:3},n:'Người được nhờ là người đã thân họ Phạm. Họ biết nhà mình đang giữ gì.',nu:{lo:8,ky:8,fail:1},cost:10}),
   F('Trả lại cho Duy, nói đây là việc của ông',{t:'Duy nhận lại, lặng lẽ cất, nhìn nhà mình rất lâu.',u:{pf:-3},then:()=>{AA().D.link+=10;return ''}})],
 {ch:2,vw:2,vc:after('pm_d1',12)}),
E('pm_d3','Đêm Duy vượt ải',
 c=>`${DN()} bất ngờ xuất hiện trước cổng nhà ${N(c)}, áo quần lấm bụi đường, mắt thâm quầng. Ông nói: "Tôi vừa bỏ họ Phạm. Họ sắp biết rồi. Cho tôi ở nhờ vài đêm."`,
 c=>[F('Cho ở, che giấu cẩn thận',{t:'Duy ở nhờ trong gian sau, ban ngày không ra, ban đêm viết gì đó rất lâu.',u:{pf:6,ky:7,lo:4},then:()=>{AA().D.link+=14;return ''}}),
   F('Cho ở đêm nay, rồi bảo ông đi',{t:'Duy gật đầu, ăn cơm, sáng hôm sau biến mất để lại một nét chữ cảm tạ.',u:{ky:3},then:()=>{AA().D.link+=2;return ''}}),
   F('Từ chối, đóng cổng',{t:'Cổng đóng. Tiếng bước chân xa dần.',u:{ky:-2},then:()=>{AA().D.link-=14;AA().fl.duyBad=1;return ''}})],
 {ch:2,vw:2,vc:(c,a)=>a.done.pm_d2!=null&&S().t-a.done.pm_d2>=6&&a.D.ok}),
E('pm_d4','Dư chấn',
 c=>`Sau đêm Duy vượt ải, khắp vùng có tin: kho sổ của họ Phạm bị lục tung, mấy tay chân bị bắt. Họ Phạm lùng người, và nhà mình ở ngay dưới ánh đèn.`,
 c=>[F('Đẩy Duy đi nơi khác, giữ liên lạc',{t:'Duy lên đường ban đêm. Nhà mình giữ một sợi dây mỏng.',u:{ky:3,all:2,lo:-3}}),
   F('Cho Duy làm khách thường, giữ sát bên mình',{t:'Duy ở lại, cải trang làm thầy dạy trẻ. Đứa nhỏ thích ông.',u:{pf:4,ky:6,lo:5}}),
   F('Báo cho huyện nơi ông ở, xin bảo hộ',{t:'Huyện lệnh nghe tên Duy, xì xào, nhưng chịu cho ông trú dưới danh nghĩa nhân chứng.',u:{pf:2,wit:4,ky:5,all:2},cost:5})],
 {ch:2,vw:2,vc:after('pm_d3',2)}),
E('pm_d5','Duy đứng giữa',
 c=>`Đến lúc cả nhà phải quyết: tin ${DN()} thật, hay dè chừng. Mỗi lần ông ta đưa một mảnh chứng cứ, hoặc một lời khuyên, đều đúng, nhưng quá đúng lúc.`,
 c=>[F('Tin hẳn, bàn bạc mọi việc cùng ông',{t:'Duy ngạc nhiên rồi xúc động. Từ đó mọi kế hoạch của nhà mình đều qua tay ông.',u:{pf:4,all:3},then:()=>{AA().D.link+=14;AA().fl.duyOk=1;return ''}}),
   F('Dùng nhưng không bàn việc quan trọng',{t:'Duy nhận ra mình bị dè chừng, nhưng vẫn làm. Giữa hai bên là một sợi dây căng.',u:{ky:-1},then:()=>{AA().D.link-=2;return ''}}),
   F('Giữ ông ở xa, chỉ nhờ những việc nhỏ',{t:'Duy hiểu. Ông cười nhạt, nhận việc nhỏ, giữ mình.',u:{},then:()=>{AA().D.link-=10;return ''}})],
 {ch:2,vw:2,vc:(c,a)=>a.done.pm_d4!=null&&a.D.ok&&S().t-a.done.pm_d4>=6}),
E('pm_d6','Duy phản bội',
 c=>`Một ngày, ${DN()} biến mất. Hôm sau, tay chân họ Phạm xuất hiện đúng những nơi nhà mình định đến, đúng những người nhà mình định gặp. Rõ ràng có người đã nói cho Kiên biết kế hoạch.`,
 c=>[F('Điều tra, tìm xem lộ những gì',{t:'Nhà mình ngồi lại, từng việc từng việc. Những gì bị lộ không nhiều bằng nghi ngờ ban đầu, nhưng đủ để mất nhiều thứ.',u:{lo:6,pf:-8,wit:-4,ky:8,fail:1},f:{tam:-6},then:()=>{AA().fl.duyBad=1;AA().D.ok=0;return ''}}),
   F('Đổi hết kế hoạch, bắt đầu lại từ đầu',{t:'Nhà mình thay địa điểm, thay người liên lạc. Mệt, nhưng an toàn hơn.',u:{pf:-5,pw:-3,ky:4,lo:-4},f:{tam:-4},then:()=>{AA().fl.duyBad=1;AA().D.ok=0;return ''}})],
 {ch:2,vw:6,vc:(c,a)=>a.D.ok&&a.D.link<=-6&&a.done.pm_d3!=null&&!a.fl.duyOk&&S().t-a.done.pm_d3>=18}),
E('pm_d7','Duy xin chuộc tội',
 c=>`${DN()} đến, tay cầm một cuộn lụa. Ông nói: "Đây là thứ tôi giữ lại để chuộc tội với nhà mình. Bản mật lệnh gốc của Phạm Trung Kiên, có đóng ấn." Ông không xin gì, chỉ ngồi xuống chờ.`,
 c=>[F('Nhận, cảm tạ, giữ ông lại',{t:'Cuộn lụa nặng hơn cả vàng. Duy gục đầu trên bàn, như người vừa trút được gì.',u:{pf:22,all:4,ky:6},then:()=>{AA().fl.duyOk=1;AA().D.link+=10;return ''}}),
   F('Nhận, nhưng giữ ông ở bên, không tin hẳn',{t:'Cuộn lụa được cất kỹ. Duy hiểu, không nói.',u:{pf:18,ky:4},then:()=>{AA().D.link+=2;return ''}})],
 {ch:2,vw:6,vc:(c,a)=>a.D.ok&&a.D.link>=30&&a.done.pm_d4!=null&&S().t-a.done.pm_d4>=18&&a.done.pm_d5!=null}),
E('pm_d8','Số phận của Duy',
 c=>`Khi chuyện đi đến hồi quyết liệt, số phận ${DN()} cũng phải được định. Ông là người đã cùng làm việc với họ Phạm bao năm, là chứng nhân, và cũng là một tội nhân.`,
 c=>[F('Xin triều đình tha tội cho ông vì đã khai thật',{t:'Duy được giảm án, sống nốt đời ở một ngôi chùa. Ông viết cho nhà mình một lá thư dài.',u:{dt:3,all:2},f:{fame:3},then:()=>{AA().D.ok=0;return ''}}),
   F('Để ông tự chọn lối đi của mình',{t:'Duy rời đi trong một buổi sáng sương, không ai biết ông về đâu.',u:{},then:()=>{AA().D.ok=0;return ''}}),
   F('Giao ông cho luật pháp xử',{t:'Duy bị xử theo tội đã phạm. Ông không kêu ca.',u:{dt:-2,hn:-2},f:{tam:-3},then:()=>{AA().D.ok=0;return ''}})],
 {ch:null,vw:3,vc:(c,a)=>a.ch>=5&&a.D.ok&&a.done.pm_d3!=null}),

/* ===================== PHẢN ỨNG THẾ GIỚI ===================== */
E('pm_w1','Người ta bàn về họ Phạm',
 c=>`Ngoài chợ, hai người bán rau thì thầm về "quan lớn họ Phạm": kẻ bảo ông ấy thanh liêm, kẻ bảo nhà ông ấy mới mua thêm ba mẫu ruộng. Thấy ${N(c)} đi qua, cả hai im bặt.`,
 c=>[F('Mua rau, hỏi thăm vài câu bâng quơ',{t:'Họ nói lảng sang chuyện thời tiết, nhưng nhà mình đã nghe đủ.',u:{wit:1,dt:1}}),F('Đi qua, không dừng',{t:'Nhà mình đi tiếp. Tiếng thì thầm lại nổi lên sau lưng.',u:{}})],
 {ch:null,vw:1,vonce:false,vcd:84,vc:(c,a)=>a.ch>=2&&a.ch<=5}),
E('pm_w2','Bài hát trẻ con',
 c=>`Bọn trẻ trong xóm hát một bài đồng dao mới. Nghe kỹ thì có câu nhắc đến "ông quan áo gấm, nhà nhiều kho, dân nhiều nợ". Người lớn vội xua chúng đi.`,
 c=>[F('Nghe cho hết, rồi cười',{t:'Những lời ngây thơ nhưng không vô cớ. Có thứ gì đó đang âm ỉ trong dân.',u:{dt:2}}),F('Bảo bọn trẻ đừng hát nữa',{t:'Bọn trẻ nghe lời, nhưng bài hát vẫn truyền sang xóm khác.',u:{ky:-1}})],
 {ch:null,vw:1,vonce:false,vcd:96,vc:(c,a)=>a.ch>=2&&a.ch<=5}),
E('pm_w3','Người lạ hỏi thăm',
 c=>`Một người khách lạ ngồi quán nước đối diện nhà ${N(c)} suốt buổi chiều. Hắn hỏi chủ quán vài câu về nhà mình, rồi thanh toán và đi. Không ai biết hắn từ đâu tới.`,
 c=>[O('Cho người đi theo xem hắn về đâu',{vo:0.5,tri:0.6},50,{y:'Hắn về nhà trọ, rồi ra bến thuyền. Nhà mình ghi tên thuyền, hóa đơn và hướng đi.',yu:{wit:1,lo:-2},n:'Người đi theo bị mất dấu giữa chợ đông.',nu:{lo:2}}),F('Tăng cảnh giác vài hôm',{t:'Mấy hôm không có gì xảy ra, rồi mọi chuyện lại như cũ.',u:{lo:-1}})],
 {ch:null,vw:1,vonce:false,vcd:96,vc:(c,a)=>a.ch>=2&&a.ch<=5}),
E('pm_w4','Thư của người bị hại ở nơi khác',
 c=>`Một lá thư viết tay đến nhà ${N(c)} từ một người xa lạ ở tỉnh khác. Người ấy kể một nỗi oan tương tự, cũng liên quan đến họ Phạm, và chỉ hỏi: "Có phải nhà ông cũng thế?"`,
 c=>[F('Hồi âm, kể chuyện nhà mình',{t:'Hai bên trao đổi nhiều lần. Một sợi dây vô hình nối hai nhà.',u:{all:3,dt:2,ky:2}}),F('Giữ thư, không hồi âm',{t:'Nhà mình cất bức thư. Có thể sẽ cần sau này.',u:{wit:1}})],
 {ch:null,vw:1,vonce:false,vcd:120,vc:(c,a)=>a.ch>=2&&a.ch<=5}),
E('pm_w5','Quan mới đến nhắc tên Kiên',
 c=>`Một vị quan mới về nhậm chức trong vùng, trong buổi ra mắt có nhắc: "Ta nghe nói vùng này có ${RK().toLowerCase()} Phạm Trung Kiên, người tài đức." Nét mặt ông không giống lời ông nói.`,
 c=>[F('Tiếp chuyện, thử dò thái độ ông ta',{t:'Ông quan mới cũng đang dò xét. Hai bên nói bóng nhiều hơn nói thẳng.',u:{all:1,ky:1}}),F('Chào xã giao rồi lui',{t:'Chỉ là một buổi chào hỏi.',u:{}})],
 {ch:null,vw:1,vonce:false,vcd:120,vc:(c,a)=>a.ch>=2&&a.ch<=5}),
E('pm_w6','Mộng',
 c=>`Đêm ấy ${N(c)} mơ thấy mình đứng trong một sân rộng, hai bên là hai hàng người mặt mờ, tiếng trống đánh dồn. Trước mặt là một chiếc ghế trống, và ai đó thì thầm: "Ngồi hay không?" Tỉnh dậy trời chưa sáng.`,
 c=>[F('Thắp nén hương, cầu cho gia đạo bình yên',{t:'Mùi hương làm lòng lắng lại. Dù mộng hay thực, nhà mình vẫn phải đi tiếp.',u:{},f:{tam:3}}),F('Ghi lại giấc mơ vào sổ riêng',{t:'Giấc mơ nằm trong sổ, cạnh những ghi chép khác. Có lẽ sau này sẽ hiểu.',u:{},f:{tam:1}})],
 {ch:null,vw:1,vonce:false,vcd:240,vc:(c,a)=>a.ch>=2&&a.ch<=5})
];});
