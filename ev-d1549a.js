/* Bách Niên Thế Gia · 7.0.0-d.1.5.49 · TRỞ NGẠI TRÊN ĐƯỜNG DỜI NHÀ (chủ dự án 27/11: dời nhà "sẽ khó, nhiều trở ngại, và không phải cứ bấm di dời là di ngay, mà phải kéo dài dựa theo khoảng cách, lộ trình").
   d.p = khu đang đi qua; d.to = nơi đến. Chỉ được xếp hàng bởi moveTick (engine.js). */
window.EVF.push(G=>{
const {fx,esc,R}=G;const S=()=>G.S();const m=v=>G.mm(v);const FM=v=>G.fmtMoney(v);
const ten=d=>esc((window.D.PROV[d&&d.p]||{}).n||'đường xa');
const tre=n=>{const j=S().journey;if(j){j.left+=n;j.total+=n}};
const ev=(id,t,x,o)=>({id,t,k:'Dời nhà',fixed:1,tags:{},x,o});
return [
ev('dl_cuop','Chặn đường ở hẻm vắng',(c,d)=>`Qua ${ten(d)}, một toán người cầm dao đứng chắn xe. Chúng nói muốn qua thì để lại một phần của cải.`,
 (c,d)=>{const v=Math.max(m(6),Math.round(S().money*0.06));return [
  {l:`Đưa bạc cho qua (${FM(v)})`,c:()=>G.money()>=v,f:cc=>{S().money-=v;return 'Chúng đếm bạc rồi dạt sang hai bên.'+fx(cc,{tam:-4})}},
  {l:'Chống trả, giữ lấy của',r:[{_g:1,vo:1,suc:0.5},40],y:cc=>'Đánh lui được bọn chặn đường. Mấy nhà đi cùng đường nhìn mình khác hẳn.'+fx(cc,{vo:2,fame:4,suc:-4}),n:cc=>{S().money-=Math.min(S().money,v*2);return 'Thua trận, mất nhiều hơn số chúng đòi.'+fx(cc,{suc:-R(10,18),tam:-10})}},
  {l:'Quay lại, đi đường vòng',ax:{cc:1},f:cc=>{tre(1);return 'Đường vòng an toàn nhưng tốn thêm một tháng.'+fx(cc,{tam:-3})}}]}),
ev('dl_nuoc','Nước chắn lối',(c,d)=>`Ở ${ten(d)}, nước dâng ngập đường, cầu gỗ chỉ còn trơ cọc. Người chở đò đòi giá gấp ba.`,
 (c,d)=>{const v=m(5);return [
  {l:`Thuê đò qua ngay (${FM(v)})`,c:()=>G.money()>=v,f:cc=>{S().money-=v;return 'Mấy chuyến đò chở hết người và đồ.'+fx(cc,{tam:1})}},
  {l:'Chờ nước rút',f:cc=>{tre(1);return 'Dựng lều chờ gần một tháng.'+fx(cc,{tam:-3})}},
  {l:'Tự lội qua chỗ cạn',r:[{_g:1,suc:0.7,tri:0.3},45],y:cc=>'Qua được, không mất gì.'+fx(cc,{suc:-3}),n:cc=>{const lost=Math.min(S().money,m(8));S().money-=lost;tre(1);return 'Một xe đồ trôi mất.'+fx(cc,{suc:-R(8,14),tam:-8})}}]}),
ev('dl_om','Ốm dọc đường',(c,d)=>`Qua ${ten(d)}, khí hậu lạ làm mấy người trong nhà sốt li bì.`,
 (c,d)=>{const v=m(4);return [
  {l:`Dừng lại mời thầy thuốc (${FM(v)})`,c:()=>G.money()>=v,f:cc=>{S().money-=v;tre(1);return 'Nghỉ lại gần một tháng, ai cũng khỏe lại.'+fx(cc,{tam:2})}},
  {l:'Cố đi cho tới nơi',ax:{cc:1},f:cc=>{G.alive().filter(p=>G.inClan(p)&&!p.away).forEach(p=>G.addStat(p,'suc',-R(2,7)));return 'Đi được, nhưng cả nhà xuống sức.'+fx(cc,{tam:-6})}},
  {l:'Xin ở nhờ nhà dân đến khi đỡ',r:[{_g:1,eq:0.7,khau:0.3},55],y:cc=>{tre(1);return 'Một nhà hiền lành cho tá túc, còn chỉ đường tắt.'+fx(cc,{eq:2,tam:3})},n:cc=>{tre(2);return 'Không ai chịu chứa người ốm, phải dựng lán ngoài đồng.'+fx(cc,{tam:-8,suc:-5})}}]}),
ev('dl_quanai','Cửa ải xét giấy',(c,d)=>`Cửa ải ở ${ten(d)}. Viên coi ải lật đi lật lại giấy thông hành, bảo có chỗ chưa đúng thể thức.`,
 (c,d)=>{const v=m(8);return [
  {l:`Biếu viên coi ải (${FM(v)})`,c:()=>G.money()>=v,f:cc=>{S().money-=v;return 'Dấu đỏ đóng xuống, cửa ải mở.'+fx(cc,{liem:-3})}},
  {l:'Dẫn luật, cãi cho ra lẽ',r:[{_g:1,tri:0.7,khau:0.5},45],y:cc=>'Viên coi ải đuối lý, cho qua.'+fx(cc,{tri:1,fame:2}),n:cc=>{tre(2);return 'Bị giữ lại chờ tra xét.'+fx(cc,{tam:-8})}},
  {l:'Chờ làm lại giấy',f:cc=>{tre(1);return 'Chờ một tháng cho giấy tờ đủ dấu.'+fx(cc,{tam:-2})}}]})
];
});
