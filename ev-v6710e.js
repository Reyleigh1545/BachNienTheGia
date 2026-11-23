/* Bách Niên Thế Gia v6.7.10-d9.10 · thế lực tự phát đầy đủ (mục 12): mỗi điểm nóng có một thế lực có tên (S.wr.tl, engine-x.js: tlForceYear), có trạng thái ngam, noi, tan và cảm tình rel với nhà chơi. Sáu sự kiện đòi nhà chơi chọn phe, nộp thuế, tiếp nhận người hàng, giúp triều đình dẹp. Cũ: bốn sự kiện tl_* trong ev-v670k.js (độ nóng S.wr.heat). */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const FM=v=>G.fmtMoney(v);const N=c=>esc(c.given);
const forces=()=>{try{return (S().wr&&S().wr.tl)||[]}catch(e){return []}};
const F=st=>forces().filter(f=>f.st===st);
const pickF=(st,minPow)=>{const L=F(st).filter(f=>f.pow>=(minPow||0));return L.length?L.slice().sort((a,b)=>b.pow-a.pow)[0]:null};
const FX=o=>Object.assign({tags:{},k:'Thế lực tự phát',age:[24,75],pcd:96,cd:60,w:0.8,ms:1,head:1},o);
const need=(st,p)=>()=>!!pickF(st,p);
return [
FX({id:'tl2_su_gia',t:'Thế lực ngầm gửi người kết giao',c:need('ngam',25),
 x:c=>{const f=pickF('ngam',25);return `Một người lạ, tự xưng là sứ của ${esc(f.n)}, tìm tới nhà ${N(c)}. Ông không nói thẳng mục đích, chỉ bảo thời thế rối, nhà có tiếng nên có người muốn kết bạn, đổi lại sẽ có người che chở khi loạn.`},
 o:c=>{const f=pickF('ngam',25);if(!f)return [{l:'Thôi',f:()=>''}];return [
  {l:'Nhận kết giao, giữ quan hệ kín',f:c=>{f.rel+=15;return 'Hai bên uống chén rượu kín đáo. Từ nay nhà có người báo tin, cũng có người ghi tên.'+fx(c,{fame:-2,tam:-1,risk:4})}},
  {l:'Từ chối khéo, không đắc tội',f:c=>{f.rel-=2;return 'Người lạ ôm quyền cáo từ, không nói thêm.'+fx(c,{tam:1})}},
  {l:'Báo cho quan huyện',r:[{eq:0.6,khau:0.5},60],y:c=>{f.pow=Math.max(0,f.pow-8);f.rel-=20;return 'Quan huyện ghi công, cho người theo dõi. Thế lực kia nhớ mặt nhà mình.'+fx(c,{fame:R(4,8),risk:-2,tam:2})},n:c=>{f.rel-=25;return 'Quan huyện hờ hững, tin lọt ra ngoài. Thế lực kia đã biết ai báo.'+fx(c,{fame:-2,tam:-5})}}]}}),
FX({id:'tl2_thu_thue',t:'Thế lực nổi dậy đòi nộp lương',c:need('noi'),w:1,
 x:c=>{const f=pickF('noi');return `${esc(f.n)} đã nổi dậy. Họ đi từng nhà khá giả ở vùng, đòi nộp lương và bạc "cho nghĩa quân". Người nhà ${N(c)} nghe nói sắp tới lượt mình.`},
 o:c=>{const f=pickF('noi');if(!f)return [{l:'Thôi',f:()=>''}];const v=m(20);return [
  {l:`Nộp đủ, mong yên thân (${FM(v)})`,c:()=>G.money()>=v,f:c=>{S().money-=v;f.rel+=10;f.pow=Math.min(100,f.pow+2);return 'Nộp xong, họ ghi tên nhà vào sổ "thuận". Nhưng quan lại nghe tin cũng sẽ hỏi tội.'+fx(c,{fame:-3,tam:-3,risk:5})}},
  {l:'Từ chối, đóng cổng nhà tự giữ',r:[{vo:0.8,gan:0.8,suc:0.4},45],y:c=>{f.rel-=15;return 'Cả nhà giữ vững qua đêm. Thế lực kia bỏ đi, tiếng nhà gan góc lan trong vùng.'+fx(c,{fame:R(6,12),tam:-2,suc:-R(2,6)})},n:c=>{f.rel-=15;return 'Họ phá cổng, cướp kho. Nhà mất nhiều của và có người bị thương.'+fx(c,{money:-m(20),fame:-3,suc:-R(6,14),tam:-8})}},
  {l:'Bỏ nhà tạm lánh nơi khác',f:c=>{return 'Cả nhà dắt díu rời quê vài tháng. Về khi yên, nhà còn nhưng hao hụt.'+fx(c,{money:-m(8),tam:-4})}}]}}),
FX({id:'tl2_dep_loan',t:'Triều đình ra lệnh dẹp loạn',c:c=>!!pickF('noi')&&G.alive().some(p=>G.inClan(p)&&p.job==='quan_ngu'&&p.lv>=2),w:1,
 x:c=>{const f=pickF('noi');return `Triều đình ra lệnh dẹp ${esc(f.n)}, huy động quan quân khắp vùng. Có người nhà ${N(c)} đang giữ chức võ quan có thể được điều đi.`},
 o:c=>{const f=pickF('noi');if(!f)return [{l:'Thôi',f:()=>''}];return [
  {l:'Chọn một võ quan trong nhà ra trận',c:c=>G.kinList(c,p=>p.job==='quan_ngu'&&p.lv>=2).length>0,go:(c,d)=>G.pickKin(c,{eyebrow:'Dẹp loạn',title:'Cử ai ra trận',text:'Người được chọn sẽ cầm quân dẹp thế lực nổi dậy. Chiến công và nguy hiểm đều theo người ấy. Chọn người nào?',filter:p=>p.job==='quan_ngu'&&p.lv>=2,cb:w=>{const p=Math.max(0.3,Math.min(0.85,0.3+(w.vo+w.tri)/400));const win=chance(p);if(win){f.pow=Math.max(0,f.pow-20);f.rel-=20}return (win?`${esc(w.given)} đánh tan một cánh quân của ${esc(f.n)}, lập công lớn.`:`${esc(w.given)} thua một trận, rút quân với thương vong.`)+fx(w,win?{merit:R(40,90),fame:R(8,16),tam:6}:{merit:-5,suc:-R(8,18),tam:-6})+fx(c,{fame:win?4:-1})}})},
  {l:'Xin cáo bệnh cho người nhà, không ra trận',f:c=>'Quan trên không hài lòng nhưng chấp nhận lý do. Nhà mang tiếng ngại việc nước.'+fx(c,{fame:-3,tam:-1})}]}}),
FX({id:'tl2_nguoi_hang',t:'Kẻ hàng xin nương náu',c:need('tan'),w:0.7,
 x:c=>{const f=pickF('tan');return `Một người từng theo ${esc(f.n)}, nay thế lực bị dẹp, lẩn trốn tìm đến nhà ${N(c)} xin nương náu. Ông nói mình chỉ là kẻ bị ép, nhưng trên người có vết sẹo của người cầm đao.`},
 o:c=>{const f=pickF('tan');if(!f)return [{l:'Thôi',f:()=>''}];return [
  {l:'Cho nương náu, giấu kín',r:[{eq:0.6,muu:0.5},50],y:c=>{f.rel+=12;return 'Người ấy làm việc lặng lẽ, vài năm sau thành người đáng tin trong nhà.'+fx(c,{fame:2,tam:2,eq:1})},n:c=>{f.rel+=6;return 'Tin lộ ra, quan huyện đến hỏi, nhà bị phạt vì chứa chấp.'+fx(c,{money:-m(12),fame:-5,risk:6,tam:-5})}},
  {l:'Giải ông ấy lên quan',f:c=>{f.rel-=10;return 'Quan huyện ghi công, ông bị đưa đi. Có người trong vùng bàn ra bàn vào.'+fx(c,{fame:R(3,7),tam:-2})}},
  {l:'Cho ít tiền đường rồi bảo đi nơi khác',f:c=>{return 'Ông cảm ơn, biến mất trong đêm.'+fx(c,{money:-m(2),tam:1})}}]}}),
FX({id:'tl2_cho_tro_lai',t:'Thế lực cũ trỗi lại',c:c=>F('ngam').some(f=>f.yr>=12&&f.pow>=40&&f.rel!==0),w:0.6,
 x:c=>{const f=F('ngam').filter(z=>z.yr>=12&&z.pow>=40&&z.rel!==0)[0];if(!f)return 'Tin đồn đã lắng.';return `Nghe tin ${esc(f.n)} đang tụ lại, ${f.rel>0?'người xưa từng thân nhà ':'những kẻ từng bị nhà đắc tội '}nhắn tin tới ${N(c)}. Họ nhớ chuyện cũ, và đang ngóng xem nhà mình đứng đâu.`},
 o:c=>{const f=F('ngam').filter(z=>z.yr>=12&&z.pow>=40&&z.rel!==0)[0];if(!f)return [{l:'Thôi',f:()=>''}];return [
  {l:f.rel>0?'Hẹn gặp lại, giữ mối cũ':'Gửi lễ xin giải hòa',c:()=>G.money()>=m(8),f:c=>{S().money-=m(8);f.rel=Math.round(f.rel/2)+5;return 'Hai bên nói chuyện kín, tình hình nguội đi một chút.'+fx(c,{fame:-1,tam:1})}},
  {l:'Báo quan, nhờ để mắt',f:c=>{f.pow=Math.max(0,f.pow-6);f.rel-=15;return 'Quan huyện cho người theo dõi. Thế lực kia càng nhớ mặt nhà mình.'+fx(c,{fame:3,tam:-2})}},
  {l:'Mặc kệ, lo việc nhà',f:c=>''}]}}),
FX({id:'tl2_cuu_tro_dan',t:'Dân chạy loạn xin nhờ',c:c=>F('noi').length>0&&G.tierIdx()>=1,w:0.9,
 x:c=>{const f=pickF('noi');return `Chiến sự giữa ${esc(f.n)} và quan quân khiến dân vùng bên chạy loạn, kéo đến làng nhà ${N(c)} xin chỗ ở và chút cháo. Ai cũng nhìn xem nhà khá giả nhất làng sẽ làm gì.`},
 o:c=>{const v=m(12);return [
  {l:`Mở kho phát cháo, cho trú ở sân đình (${FM(v)})`,c:()=>G.money()>=v,f:c=>{S().money-=v;return 'Dân đói được cứu, tiếng nhà vang cả hai bên chiến sự. Có người nhớ ơn suốt đời.'+fx(c,{fame:R(10,18),on:2,tam:4})}},
  {l:'Cho ít gạo, bảo đi tiếp',f:c=>{return 'Dân cảm ơn rồi đi, tiếng nhà không xấu cũng không thơm.'+fx(c,{money:-m(2),fame:2})}},
  {l:'Đóng cổng, không dám nhận ai',f:c=>{return 'Làng bình yên, nhưng mấy người dân đi qua kể lại nhà đóng cửa.'+fx(c,{fame:-3,tam:-2})}}]}})
];
});
