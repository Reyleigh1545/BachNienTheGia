/* Bách Niên Thế Gia v6.7.0-d7 · quan trường có người nhớ và người cản (đợt B): đối thủ, người bị hặc, quý nhân tiến cử.
   Các sự kiện này đọc và ghi sổ ký ức (G.led): doi_thu, bi_hac, tien_cu, cuu, day_hoc. */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const FM=v=>G.fmtMoney(v);const N=c=>esc(c.given);const L=G.led;
const rich=v=>()=>G.money()>=m(v);
const QQ=['quan'];
const RS=['Triệu','Lương','Đoàn','Quách','Tào','Mạc','Khổng','Hứa','Tiêu','Lý'],RG=['Văn Bác','Chí Thông','Hữu Lễ','Đức Chính','Bá Hiển','Mạnh Khải','Đình Sơn','Khắc Nhân'];
const rivalNp=c=>{const e=L.find(c.id,'doi_thu');return e&&e.d&&e.d.np?L.np.get(e.d.np):null};
const rival=c=>{const e=L.find(c.id,'doi_thu');if(e&&e.d&&e.d.n)return e.d.n;const i=(c.born+S().t)%RS.length;return RS[i]+' '+RG[(c.born+i)%RG.length]};
const QT=o=>Object.assign({tags:{},k:'Quan trường',job:QQ,cd:60,pcd:120,w:1},o);
return [
QT({id:'qt5_doi_thu_can',t:'Có người chặn đường',rmin:1,w:1.4,
 x:c=>`${esc(rival(c))}, một viên quan cùng bậc, bắt đầu để ý đến chỗ ngồi của ${N(c)}. Hắn không nói ra, nhưng các việc của ${N(c)} bỗng chậm đi, công văn lạc mất, lời khen biến thành lời chê.`,
 o:c=>[{l:'Nhún nhường, làm tốt việc của mình',f:c=>{L.add('doi_thu',[c.id],{n:rival(c),np:(rivalNp(c)||{}).id},{w:60});return 'Chuyện lắng xuống, nhưng hắn nhớ mình nhún.'+fx(c,{m:1,tam:-2})}},
  {l:'Đối đầu công khai trước mặt đồng liêu',r:[{tri:1,eq:0.8,fame:0.4},46],y:c=>{L.add('doi_thu',[c.id],{n:rival(c),np:(rivalNp(c)||{}).id},{w:35});return 'Mọi người thấy ai đúng ai sai. Hắn tạm lui, nhưng không quên.'+fx(c,{fame:8,fav:4,tam:3})},n:c=>{L.add('doi_thu',[c.id],{n:rival(c),np:(rivalNp(c)||{}).id},{w:85});c.flags.noPromoUntil=Math.max(c.flags.noPromoUntil||0,S().t+R(6,14));return 'Hắn có người chống lưng. Mình mang tiếng nóng nảy.'+fx(c,{fame:-6,risk:6,tam:-6})}},
  {l:'Nhờ một người quen trong triều nói giúp',c:rich(8),f:c=>{const has=L.has(c,'tien_cu');if(!has)L.add('doi_thu',[c.id],{n:rival(c),np:(rivalNp(c)||{}).id},{w:50});return (has?'Người ấy nói một lời, hắn lập tức biết điều.':'Lời nhờ vả có phần nhạt, hắn vẫn còn đó.')+fx(c,{money:-m(8),fav:has?5:0,tam:has?3:-2})}}]}),
QT({id:'qt5_doi_thu_gap_lai',t:'Đối thủ cũ trở lại',rmin:1,w:2,mem:{need:['doi_thu']},c:c=>{const n=rivalNp(c);return !n||n.ok},
 x:c=>`${esc(rival(c))}${rivalNp(c)?`, ${L.np.age(rivalNp(c))} tuổi`:''}, người từng chắn đường ${N(c)}, nay đứng cùng một buổi triều nghị. Hắn giữ lễ, nhưng ánh mắt thì nhớ rõ chuyện xưa.`,
 o:c=>[{l:'Chủ động bắt tay giảng hòa',r:[{eq:1,tri:0.5},58],y:c=>{L.drop(c,'doi_thu');return 'Hắn nhận lời. Hai bên cùng lùi một bước, chuyện cũ khép lại.'+fx(c,{fame:4,fav:3,tam:5})},n:c=>'Hắn gật đầu cho có lệ. Mối ngờ vẫn còn.'+fx(c,{tam:-3})},
  {l:'Tìm cách hạ hắn trước',r:[{tri:1,muu:0.6},40],y:c=>{L.drop(c,'doi_thu');return 'Một sơ suất của hắn bị đưa ra ánh sáng. Hắn bị điều đi nơi khác.'+fx(c,{fame:5,liem:-4,risk:5})},n:c=>{L.add('bi_hac',[c.id],{n:rival(c),np:(rivalNp(c)||{}).id},{w:60});return 'Việc bại lộ. Mình mang tiếng ghen ghét đồng liêu.'+fx(c,{fame:-8,risk:8,tam:-6})}},
  {l:'Coi như không có chuyện gì',f:c=>'Hai bên giữ khoảng cách. Mối thù vẫn nằm đó, nhưng chưa ai đụng tới.'+fx(c,{m:1})}]}),
QT({id:'qt5_quy_nhan_tien_cu',t:'Người xưa nay đã có chỗ đứng',rmin:1,w:2.2,mem:{any:['cuu','day_hoc'],not:['tien_cu']},
 x:c=>`Một người ${L.has(c,'day_hoc')?'từng học dưới tay':'từng được giúp một phen'} của ${N(c)} nay có tiếng nói trong triều. Ông ta ghé thăm, ngỏ ý nói giúp cho ${N(c)} một lời khi có chỗ trống.`,
 o:c=>[{l:'Nhận lời, đa tạ',f:c=>{L.add('tien_cu',[c.id],null,{w:75});c.flags.noPromoUntil=0;return 'Một lời nhắc đúng lúc có thể đáng bằng nhiều năm khổ công.'+fx(c,{fav:6,tam:5})}},
  {l:'Từ chối, bảo mình tự lo được',f:c=>'Ông ta kính nể sự thanh liêm ấy.'+fx(c,{liem:4,fame:3})}]}),
QT({id:'qt5_nguoi_bi_hac',t:'Người bị hặc năm xưa tìm đến',rmin:1,w:2,mem:{need:['bi_hac']},c:c=>{const e=L.find(c.id,'bi_hac');const n=e&&e.d&&e.d.np?L.np.get(e.d.np):null;return !n||n.ok},
 x:c=>`${esc(((L.find(c.id,'bi_hac')||{}).d||{}).n||'Người ấy')}${(()=>{const e=L.find(c.id,'bi_hac');const n=e&&e.d&&e.d.np?L.np.get(e.d.np):null;return n?`, ${L.np.age(n)} tuổi`:''})()}, kẻ từng bị ${N(c)} dâng sớ hặc tội, nay xin gặp. Ông ta không còn chức quyền, nhưng còn bạn bè và còn nhớ.`,
 o:c=>[{l:'Tiếp, nghe ông ta nói',r:[{eq:1},60],y:c=>{L.drop(c,'bi_hac');return 'Ông ta kể phần mình. Hai bên không thân, nhưng oán đã nhạt.'+fx(c,{fame:3,tam:4})},n:c=>'Ông ta ra về trong im lặng, mang theo mối hận.'+fx(c,{tam:-4,risk:3})},
  {l:'Không tiếp',f:c=>'Cửa đóng. Chuyện cũ vẫn nằm đó.'+fx(c,{m:1})}]})
];});
