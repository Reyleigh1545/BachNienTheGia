/* Bách Niên Thế Gia v6.7.10-d9.12 · GAMEPLAY ĐANG DỞ (mục 11.B; chủ dự án 24/11 "làm những cái đang dở thuộc gameplay trước"):
   gh_chien_lan: chiến tranh giữa hai môn phái (S.wr.gwar, engine-x.js ghYear) lan sang người ngoài phái. Khi nhà chơi sống trong địa bàn một phái (tỉnh gốc hoặc tỉnh phái đã chiếm sau chiến tranh) thì ít nhất 3 năm một lần có thể bị cuốn vào.
   Chưởng môn hai phái là người thật (sổ người quen); lựa chọn có giá và rủi ro khác nhau. */
window.EVF.push(G=>{
const {R,pick,chance,fx,esc}=G;
const S=()=>G.S();const m=v=>G.mm(v);const FM=v=>G.fmtMoney(v);const N=c=>esc(c.given);
const nm=n=>esc(n?n.n:'người ấy');
const addVai=(n,v)=>{if(n&&!n.vai.includes(v)){n.vai.push(v);n.vaiTxt=n.vai.map(x=>G.tie.VAI[x]||x).join(', ')}};
const pay=(l,v,o)=>Object.assign({l:`${l} (${FM(m(v))})`,c:()=>G.money()>=m(v)},o);
const sectOf=id=>((S().wr&&S().wr.sects)||[]).find(x=>x.id===id);
const boss=(c,sc)=>G.tie.ensure(c,{key:'gh_boss_'+sc.id,name:sc.boss,g:'nam',vai:['quen'],nghe:'chưởng môn '+sc.n,age:sc.age||R(45,68),main:'vo',st:{vo:R(85,105)},tier:3,rel:0,why:'chưởng môn '+sc.n});
return [
{id:'gh_chien_lan',t:'Lửa chiến lan đến vùng mình',k:'Giang hồ',fixed:1,tags:{},
 x:(c,d)=>{const a=sectOf(d.s),b=sectOf(d.o);if(!a||!b)return `Tin giao tranh giữa hai môn phái lan đến vùng này, nhưng đã lắng xuống.`;const st=(a.pow||50)>=(b.pow||50)?a:b,wk=st===a?b:a;d.st=st.id;d.wk=wk.id;const bs=boss(c,st),bw=boss(c,wk);d.npc=[bs.id,bw.id];d.bs=bs.id;d.bw=bw.id;
  const ter=(st.ter||[]).concat(wk.ter||[]);return `${esc(a.n)} và ${esc(b.n)} đang đánh nhau, địa bàn của họ phủ cả vùng nhà ${N(c)} ở. ${esc(st.n)} đang thắng thế (chưởng môn ${nm(bs)}); ${esc(wk.n)} (chưởng môn ${nm(bw)}) đang lép vế và đòi "lương thảo". Trai tráng trong vùng bị kéo đi, đường sá bất an, nhà ${N(c)} có của nên bị để ý.`},
 o:(c,d)=>{const st=sectOf(d.st),wk=sectOf(d.wk);const bs=G.tie.get(d.bs),bw=G.tie.get(d.bw);if(!st||!wk||!bs||!bw)return [{l:'Thôi',f:()=>''}];return [
  pay(`Nộp lễ bảo hộ cho ${st.n}, phái đang thắng`,12,{f:c=>{G.tie.rel(bs,22,'nộp lễ bảo hộ');G.tie.rel(bw,-18,'bị coi là theo phe thắng');addVai(bs,'quy_nhan');const lose=chance(0.25);return `${nm(bs)} cho người dựng bảng "được ${esc(st.n)} che chở" trước cổng. Nhà tạm yên`+(lose?`, nhưng ${esc(wk.n)} ghi hận, đêm khuya mấy lần bị ném đá vào mái.`:`.`)+fx(c,{money:-m(12),fame:-1,tam:lose?-4:2,qh:[bs.n,22]})+fx(c,{qh:[bw.n,-18]})}}),
  pay('Thuê võ sư, dân binh canh nhà qua cơn loạn',8,{r:[{ql:0.6,muu:0.5,vo:0.3},52],y:c=>{G.tie.rel(bs,6,'nhà có người canh');G.tie.rel(bw,6,'nhà có người canh');return `Võ sư dàn người canh bốn góc, cả hai phái đều tránh động đến nhà có phòng bị. Trong xóm, nhà mình thành chỗ nương nhờ.`+fx(c,{money:-m(8),cfame:R(2,5),fame:2,eq:1,tam:3,qh:[bs.n,6]})+fx(c,{qh:[bw.n,6]})},n:c=>{G.tie.rel(bs,-6,'canh nhà bị thua');G.tie.rel(bw,-6,'canh nhà bị thua');const loss=m(R(8,16));return `Toán võ sư không địch nổi một đợt xông vào của ${esc(wk.n)}; kho nhà bị lấy mất một phần và một người canh bị thương.`+fx(c,{money:-m(8)-loss,suc:-R(2,6),tam:-5,fame:-1,qh:[bw.n,-6]})}}),
  {l:'Nhờ quan huyện điều lính can thiệp',r:[{eq:0.7,khau:0.5,ql:0.3},46],y:c=>{G.tie.rel(bs,-6,'nhờ quan can thiệp');G.tie.rel(bw,-6,'nhờ quan can thiệp');return `Quan huyện đưa một đội lính đến đóng ở xóm mấy tháng. Hai phái đều lui; quan nhớ nhà mình là người biết báo việc.`+fx(c,{liem:2,fame:2,fav:R(1,2),tam:3,qh:[bs.n,-6]})+fx(c,{qh:[bw.n,-6]})},n:c=>{G.tie.rel(bs,-14,'nhờ quan nhưng quan không can thiệp');G.tie.rel(bw,-14,'nhờ quan nhưng quan không can thiệp');return `Quan huyện bảo "việc giang hồ, nha môn không xen vào", nhưng tin nhà mình đi báo quan đã đến tai hai phái. Cả hai đều ghét.`+fx(c,{tam:-4,fame:-1,qh:[bs.n,-14]})+fx(c,{qh:[bw.n,-14]})}},
  pay('Cho người nhà dễ bị để ý lánh sang nơi khác vài tháng',4,{f:c=>{G.tie.rel(bs,0,'nhà đi lánh');return `Mấy người nhà lánh sang họ hàng ở tỉnh khác, nhà chỉ còn người giữ cửa. Khi trở lại thì nhà vẫn còn, nhưng việc làm ăn bị gián đoạn.`+fx(c,{money:-m(4),tam:-3,qh:[bs.n,0]})+G.fxAll({tam:-1})}}),
  {l:'Mặc kệ, đóng cổng chờ qua',f:c=>{const hit=chance(0.5);if(hit){G.tie.rel(bw,-16,'bị quấy nhiễu nhà');return `Một toán của ${esc(wk.n)} gõ cổng đòi lương thảo, lấy đi gần nửa kho rồi mới chịu rời.`+fx(c,{money:-m(R(12,24)),suc:-R(1,4),tam:-6,fame:-2,qh:[bw.n,-16]})}G.tie.rel(bw,2,'nhà không bị quấy');return `Chẳng ai đến gõ cổng. Chiến sự qua đi, cả vùng thở phào.`+fx(c,{tam:1,qh:[bw.n,2]})}}]}}
];
});
