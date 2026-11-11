/* Bách Niên Thế Gia v6.5.4 · nhà chật, bước rẽ nhánh giữa đường cho ba đường lên ngôi
   ts_nh_q / ts_nh_v / ts_nh_n: bước giữa mỗi đường. Người chơi chọn dựa vào quân lực (U.br='quan'), sĩ phu và danh nghĩa (U.br='si') hoặc của cải và dân (U.br='tien').
   Nhánh chọn ở đây ảnh hưởng thước đo ngay và xác suất ở bước cuối (usWin trong engine.js). */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const FM=v=>G.fmtMoney(v);const T=G.ts;
const U=()=>T.U();const A=d=>{const u=U();return (u&&G.P(u.who))||G.P(d.who)};
const N=a=>a?esc(a.given):'người ấy';const K='Mưu đại sự';
const live=path=>{const u=U();return !!u&&u.path===path};
const abandon=()=>({l:'Từ bỏ con đường này',f:()=>T.abandon()});
/* b: dựng một nhánh. e: thay đổi thước đo, br: nhánh ghi vào U, cost: tiền */
function B(l,o){const run=(eff,txt,d)=>{const u=U();if(u)u.br=o.br;T.add(Object.assign({money:-(o.cost||0)},eff));T.next();return txt};
  const r={l:o.cost?`${l} (${FM(o.cost)})`:l};if(o.cost)r.c=()=>G.money()>=o.cost;
  if(o.roll){r.r=[o.roll[0],o.roll[1]];r.y=(c,d)=>run(o.ok,o.okTxt,d);r.n=(c,d)=>run(o.bad,o.badTxt,d)}else r.f=(c,d)=>run(o.ok,o.okTxt,d);return r}
const step=(id,path,t,x,opts)=>({id,t,k:K,fixed:1,x:(c,d)=>live(path)?x(A(d),d):'Việc đã qua, chẳng còn gì để quyết.',o:(c,d)=>live(path)?[...opts(A(d),d),abandon()]:[{l:'Thôi',f:()=>''}]});
return [
{id:'gt_nha_chat',t:'Nhà đã chật',k:'Gia sự',fixed:1,
 x:c=>`Nhà chính giờ đông người quá. Chỗ ngủ, bếp núc, kho chứa đều bắt đầu thiếu. Vợ chồng trẻ chưa dám sinh thêm vì không còn chỗ, người già than ồn ào. Nếu muốn thêm người thì phải nâng nhà, hoặc cho con cháu ra ở riêng.`,
 o:c=>[{l:'Đã rõ, sẽ tính chuyện nâng nhà',f:c=>'Gia chủ ghi nhớ. Vào trang Gia tộc, mục nhà cửa, để nâng nhà hoặc lập chi mới.'+fx(c,{tam:1})}]},

/* ===================== Quyền thần: bước rẽ nhánh ===================== */
step('ts_nh_q','quyen','Ba ngả đường',a=>`Bè cánh trong triều đã có, nhưng phải chọn thế dựa chính: ${N(a)} nên nắm lấy binh quyền trong tay các tướng, kết thân với sĩ phu để dựng danh nghĩa, hay dùng của cải mua chuộc quan lại và lòng dân kinh thành? Mỗi ngả đi một nẻo, và sẽ quyết định cách ra tay cuối cùng.`,a=>[
  B('Kết thân với các tướng nắm cấm quân',{br:'quan',cost:m(70),roll:[{muu:0.8,eq:0.6,vo:0.2},52],ok:{the:+18,lo:+8,danh:-2},okTxt:'Mấy tướng giữ cấm quân nhận lời. Quyền lực thật bắt đầu nghiêng về phía mình.',bad:{the:+6,lo:+14,tai:-6},badTxt:'Một viên tướng nhận lễ rồi báo lên trên. Quân lực không thêm bao nhiêu, mà tiếng đã lọt.'}),
  B('Tập hợp sĩ phu, nhờ họ làm danh nghĩa',{br:'si',roll:[{khau:0.8,tri:0.6,eq:0.4},55],ok:{danh:+20,the:+4,lo:+4},okTxt:'Các danh nho đứng về phía mình. Lời bàn về thiên mệnh bắt đầu lan khắp kinh kỳ.',bad:{danh:+6,lo:+10},badTxt:'Sĩ phu bàn tán nhiều mà không ai dám ký tên.'}),
  B('Dốc của cải mua lòng quan lại và dân kinh thành',{br:'tien',cost:m(120),ok:{tai:+10,the:+10,danh:+8,lo:+7},okTxt:'Tiền chảy vào sổ sách người cần, và vào tay những người cần được nhớ ơn.'})]),

/* ===================== Võ quan: bước rẽ nhánh ===================== */
step('ts_nh_v','vo','Chọn thế đánh',a=>`Quân đã trong tay ${N(a)}. Nhưng đánh thế nào? Dồn sức luyện quân cho tinh, mua chuộc sĩ phu để dựng cờ chính nghĩa, hay lo quân lương và dân phu cho dài hơi? Cách chọn bây giờ sẽ in dấu lên mọi trận sau.`,a=>[
  B('Luyện lại toàn bộ quân dưới trướng',{br:'quan',roll:[{vo:0.8,muu:0.5,eq:0.3},52],ok:{the:+20,lo:+7},okTxt:'Quân mình tinh nhuệ hơn hẳn. Tướng nào cũng nể phục.',bad:{the:+6,lo:+12},badTxt:'Quân mệt vì luyện nhiều, lính ca thán, tiếng thao luyện lọt ra ngoài.'}),
  B('Nhờ danh sĩ viết hịch, dựng cờ chính nghĩa',{br:'si',roll:[{khau:0.8,tri:0.6},55],ok:{danh:+20,the:+5,lo:+5},okTxt:'Tờ hịch được truyền tay khắp nơi. Nhiều người bắt đầu nghĩ mình là bên chính.',bad:{danh:+6,lo:+10},badTxt:'Tờ hịch viết dở, bị chê là lời của kẻ cướp.'}),
  B('Lập kho lương, thu gom dân phu',{br:'tien',cost:m(110),ok:{tai:+16,the:+8,lo:+6},okTxt:'Kho đầy, dân phu sẵn sàng. Quân của mình không sợ đói.'})]),

/* ===================== Khởi nghĩa: bước rẽ nhánh ===================== */
step('ts_nh_n','nghia','Gốc của nghĩa quân',a=>`Nghĩa quân đã đông. Giờ ${N(a)} phải chọn lấy cái gốc: dựa vào sức mạnh của đám binh đầu, dựa vào tiếng thơm với dân và sĩ phu, hay dựa vào lương thực lấy từ nhà giàu chia cho dân đói?`,a=>[
  B('Chia quân thành đội, đặt tướng chỉ huy cho kỹ',{br:'quan',roll:[{vo:0.6,muu:0.7,eq:0.4},52],ok:{the:+20,lo:+6},okTxt:'Nghĩa quân thành đội ngũ rõ ràng, không còn là đám đông.',bad:{the:+5,lo:+12},badTxt:'Mấy binh đầu tranh quyền nhau, đội ngũ chia rẽ.'}),
  B('Công bố ước pháp: không cướp của dân, phân xử công bằng',{br:'si',roll:[{eq:0.8,khau:0.6},55],ok:{danh:+22,the:+6,lo:+3},okTxt:'Dân đi đến đâu cũng nghe nói đến lời hứa của nghĩa quân. Người xin theo càng đông.',bad:{danh:+8,lo:+9},badTxt:'Ước pháp ban ra, nhưng vài toán quân vẫn cướp bóc làm mất uy tín.'}),
  B('Lấy thóc nhà giàu chia cho dân đói',{br:'tien',ok:{tai:+14,the:+10,danh:+6,lo:+9},okTxt:'Thóc về tay dân đói, lòng dân theo về. Nhà giàu thì căm hận.'})])
];
});
