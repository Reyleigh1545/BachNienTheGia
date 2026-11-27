/* Bách Niên Thế Gia · engine-xa.js: gói ENGX tách từ engine.js bằng tools/xmove.js (7.0.0-d.1.5.6). Thân hàm giữ nguyên; engine.js còn dòng chuyển ENGX.fn.<tên>. Hàm gán vào biến let cấp cao KHÔNG nằm ở đây. Nạp sau events-lv.js, trước engine.js. */
window.ENGX=window.ENGX||[];
window.ENGX.push(X=>{
const {BIZ,BIZX,BRK100,BRK_MID,FAME_SELF,FAR_RE,G,HABITS,HH,KIN_N,LAWM,M,QT,R,ROLES,SN,STACC,TK,VICES,VTXT,VWORK,achieve,addHabit,addRel,addTrait,age,ageEff,alive,axv,canPunish,cf,chance,charge,choicePopup,clamp,closeModal,cutVice,die,dropHabit,elderOf,enqueue,ensurePersona,esc,fx,gateCap,giftRecent,hardCap,has,hashN,head,home,inClan,infoPopup,isHead,isVice,kin,ledAdd,log,mainHH,married,memAdd,memHas,memSet,mm,money,nameOf,nextGate,nextPopup,openModal,pick,qtAdd,qtConfiscate,qtDismiss,qtSentence,relOf,rule,save,shiftAx,spouseOf,stAge,stfEvent,stfHazard,stfRemove,stfSnap,tierIdx,tsum,vget,vlv,wealth,window,yrs}=X.EC;
function viceActors(c){const S=X.S;
  const ok=p=>!!p&&p.id!==c.id&&inClan(p)&&p.dead==null&&!p.away&&age(p)>=18;
  const hd=head(),sp=spouseOf(c);
  const eld=S.people.filter(p=>ok(p)&&elderOf(p,c)).sort((a,b)=>((kin(c,a)==='con'?0:1)-(kin(c,b)==='con'?0:1))||(relOf(c,b)-relOf(c,a))||(age(b)-age(a)));
  if(isHead(c))return eld.concat(ok(sp)?[sp]:[]);
  return eld.concat(ok(hd)&&!eld.includes(hd)?[hd]:[])}
function viceBy(c){const A=viceActors(c);if(!A.length)return null;
  const par=A.find(p=>kin(c,p)==='con');if(age(c)<25&&par)return par;
  const hd=head();if(hd&&A.includes(hd)&&canPunish(hd,c))return hd;
  return A[0]}
function viceAlert(c,k){const S=X.S;
  const by=viceBy(c);
  if(!by||by.id===c.id||by.away)return;
  if((c.flags['vw_'+k]||-99)>S.t)return;c.flags['vw_'+k]=S.t+36;
  enqueue('vice',c.id,{by:by.id,k});
}
function viceWork(c){let v=1;c.habits.forEach(k=>{if(VWORK[k])v-=VWORK[k]*vlv(c,k)/100});return Math.max(0.45,v)}
function viceTick(){const S=X.S;
  for(const c of alive()){
    const a=age(c);if(a<8)continue;ensurePersona(c);
    const t=axv(c,'tiet'),y=axv(c,'yc');
    const susc=Math.max(0.15,(1+(50-t)/40))*(1+(50-y)/100);
    const life=(HH(c.hh)||{life:1}).life;
    for(const k in VICES){const V=VICES[k];if(c.habits.includes(k)||a<V.age[0]||a>V.age[1])continue;
      let p=V.base*susc;
      if(a>=16&&a<=30)p*=1.4;
      if(home().some(o=>o.id!==c.id&&o.hh===c.hh&&o.habits.includes(k)&&age(o)>=14))p*=1.6;
      if(k==='xahoa'||k==='thanhlau')p*=life>=3?2:life<=1?0.3:1;
      if(k==='trom')p*=life<=0?2.5:life>=3?0.3:1;
      if(k==='ruou'&&c.tam<30)p*=2;
      if(k==='donhau'&&axv(c,'diem')<30)p*=2;
      if((k==='thanhlau'||k==='donhau')&&c.g==='nữ')p*=0.15;
      if((k==='bac'||k==='ruou')&&rule('cambac'))p*=0.3;
      if(rule('nghiem'))p*=0.7;
      c.habits.forEach(v=>{if(VICES[v]&&VICES[v].chain.includes(k))p+=0.0006*vlv(c,v)/50});
      if(c.away&&c.away.type==='army'&&['ruou','bac','donhau'].includes(k))p*=1.6;
      if(chance(p)){addHabit(c,k,R(12,25));log(`${nameOf(c)} bắt đầu nhiễm thói ${HABITS[k].n.toLowerCase()}.`,'hi');break}
    }
    for(const k of c.habits.slice()){if(!isVice(k))continue;
      let lv=vlv(c,k);lv+=Math.max(0.05,0.28+(50-t)/120+(50-y)/220);
      const nat=c.vnat&&c.vnat[k];
      if(chance((0.006+(lv<30?0.01:0))*(0.4+y/80)*(0.4+t/80)*(nat?0.15:1)))lv-=R(15,35);
      c.vlv[k]=clamp(lv,0,100);
      if(c.vlv[k]<=0){dropHabit(c,k);log(`${nameOf(c)} tự bỏ được ${HABITS[k].n.toLowerCase()}.`,'gd');continue}
      if(!nat&&S.t-((c.vt&&c.vt[k])??S.t)>=60&&c.vlv[k]>=60){c.vnat=c.vnat||{};c.vnat[k]=1;c.nat.tiet=clamp(c.nat.tiet-10,0,100);log(`Thói ${HABITS[k].n.toLowerCase()} của ${nameOf(c)} đã ăn vào bản tính.`,'hi')}
      if(c.vlv[k]>=50)viceAlert(c,k);
      if(c.away)continue;
      const L=c.vlv[k];
      if(k==='bac'&&chance(0.1+L/300)){S.money-=Math.round(R(15,80)*TK[tierIdx()]*(1+L/60))}
      if(k==='bac'&&L>=55&&chance(0.012))enqueue('ev',c.id,{ev:'v6_no_bac'});
      if(k==='trom'&&chance(0.01*L/50))enqueue('ev',c.id,{ev:'v6_trom_bat'});
      if(k==='donhau'&&chance(0.008*L/50))enqueue('ev',c.id,{ev:'v6_danh_nhau'});
      if(k==='ruou'&&chance(0.006*L/50))enqueue('ev',c.id,{ev:'v6_say_ruou'});
      if(k==='thanhlau'&&married(c)){const sp=spouseOf(c);if(sp)addRel(sp,c,-0.4*L/50)}
    }
  }
}
function vicePopup(by,c,k){const S=X.S;
  if(!by||!c||!inClan(by)||!inClan(c)||!c.habits.includes(k)){setTimeout(nextPopup,0);return}
  const L=Math.round(vlv(c,k));const nat=c.vnat&&c.vnat[k];const kid=age(c)<16;
  const harsh=canPunish(by,c);
  const diff=30+L*0.45-(axv(c,'ht')-50)*0.4+(relOf(c,by)<0?10:0)+(nat?15:0);
  const done=(c,txt)=>{c.flags.vdT=S.t+6;return txt};
  const role=isHead(by)?'gia chủ':(KIN_N[kin(c,by)]||'người nhà');
  const why=isHead(c)?'Là gia chủ nên không ai có quyền đánh mắng, chỉ có thể ân cần khuyên can.':(c.fame||0)>=FAME_SELF[2][0]?'Người có danh vọng, không thể đem đòn roi ra mà dạy, chỉ có thể khuyên can.':!harsh&&!kid?`${esc(c.given)} đã lớn tuổi, ${esc(by.given)} không ở vị trí để đánh phạt, chỉ có thể khuyên can.`:'';
  const opts=[
    {l:'Khuyên răn nhẹ nhàng',s:'Dựa vào EQ và khẩu tài người khuyên',r:[{eq:0.6,khau:0.6},diff],
      y:x=>{cutVice(c,k,R(30,50));addRel(c,by,3);return done(c,`${esc(c.given)} nghe ra, hứa sửa đổi.`+fx(c,{tam:-2})+shiftAx(c,{tiet:4,ht:1}))},
      n:x=>{c.vlv[k]=Math.min(100,vlv(c,k)+4);addRel(c,by,-3);return done(c,'Nghe tai này lọt tai kia.')}},
    {l:'Ngồi lại nói chuyện nghiêm túc, nhắc đến tổ tiên và mái nhà này',s:'Nặng lời hơn, nhưng không đụng chạm đến thể diện',r:[{eq:0.5,khau:0.5,fame:0.3},diff+(harsh?4:0)],
      y:x=>{cutVice(c,k,R(35,55));addRel(c,by,1);return done(c,`${esc(c.given)} cúi đầu rất lâu, rồi nói sẽ dứt.`+fx(c,{tam:-4})+shiftAx(c,{tiet:5,ht:1}))},
      n:x=>{c.vlv[k]=Math.min(100,vlv(c,k)+3);addRel(c,by,-5);return done(c,`${esc(c.given)} im lặng bỏ đi, trong lòng nặng nề.`+fx(c,{tam:-4}))}}];
  if(harsh)opts.push(
    {l:'Đánh đòn cho chừa',s:kid?'Trẻ con thì sợ':'Người ngỗ nghịch có thể chống lại',f:x=>{
      if(kid||axv(c,'ht')>=55){cutVice(c,k,R(40,60));addRel(c,by,-8);return done(c,`Một trận đòn nhớ đời. ${esc(c.given)} sợ, không dám tái phạm.`+fx(c,{tam:-8})+shiftAx(c,{ht:2,diem:-1}))}
      if(axv(c,'dl')>=65&&chance(0.45)){addRel(c,by,-25);c.vlv[k]=Math.min(100,vlv(c,k)+6);return done(c,`${esc(c.given)} uất ức bỏ nhà đi mấy hôm, về rồi càng lầm lì.`+fx(c,{tam:-12})+shiftAx(c,{ht:-4,hd:-2}))}
      cutVice(c,k,R(20,35));addRel(c,by,-15);return done(c,'Bị đánh thì chịu, nhưng ấm ức trong lòng.'+fx(c,{tam:-8})+shiftAx(c,{ht:-1}))}},
    {l:'Cắt tiền tiêu, cấm ra khỏi nhà',c:()=>['bac','thanhlau','xahoa','ruou'].includes(k),f:x=>{cutVice(c,k,R(25,40));addRel(c,by,-6);return done(c,'Không có tiền, không ra được cửa, đành ở nhà.'+fx(c,{tam:-8})+shiftAx(c,{tiet:2}))}});
  opts.push(harsh?
    {l:`Gửi lên chùa tu tâm nửa năm (${money(mm(30))})`,c:()=>S.money>=mm(30),f:x=>{S.money-=mm(30);cutVice(c,k,R(50,80));return done(c,'Tiếng chuông chùa làm lòng dịu lại.'+fx(c,{tam:-3,eq:1})+shiftAx(c,{tiet:6,diem:3}))}}:
    {l:`Mời đi tĩnh tâm ở chùa một thời gian (${money(mm(30))})`,c:()=>S.money>=mm(30),r:[{eq:0.6,khau:0.5},diff+8],
      y:x=>{S.money-=mm(30);cutVice(c,k,R(40,65));addRel(c,by,2);return done(c,`${esc(c.given)} nghe lời, lên chùa ở lại mấy tháng. Về rồi lòng nhẹ hẳn.`+fx(c,{tam:-1,eq:1})+shiftAx(c,{tiet:5,diem:3}))},
      n:x=>{addRel(c,by,-2);return done(c,`${esc(c.given)} từ chối khéo, bảo mình tự lo được.`)}});
  opts.push({l:'Mặc kệ',f:x=>{c.vlv[k]=Math.min(100,vlv(c,k)+8);S.on=clamp(S.on-1,0,100);return done(c,'Mọi chuyện cứ thế trôi.')}});
  choicePopup(by,'Gia giáo',`${c.given} nhiễm thói ${HABITS[k].n.toLowerCase()}`,
    `${esc(nameOf(c))}, ${age(c)} tuổi, dạo này sa vào ${VTXT[k]}${L>=60?', đã khá nặng':L>=35?', ngày càng nhiều':', mới chớm'}${nat?'. Thói này đã ăn vào bản tính, rất khó bỏ':''}. ${esc(by.given)} là ${role} của ${esc(c.given)}, ra mặt can ngăn. ${why} Cách nào hiệu quả phụ thuộc vào ${esc(by.given)} và tính nết của ${esc(c.given)}.`,opts);
}
function viceSpend(c){const h=HH(c.hh)||HH(mainHH());let v=0;c.habits.forEach(x=>{if(isVice(x))v+=HABITS[x].cost*(1+h.life*0.2)*(0.3+vlv(c,x)/70)});return v*(1+tsum(c,'spend'))}
function lawLvText(lvl,gr){return lvl<=0?'khiển trách, bồi thường':lvl===1?'đánh roi':lvl===2?'đánh gậy':lvl===3?`khổ sai ${gr} năm`:lvl===4?'đày đi xa':'xử tử'}
function lawPriv(c,L){if(L.tc)return 0;let p=0;if(c.job==='quan'){if(c.lv>=4)p++;if(c.lv>=6)p++}if((c.tuoc||0)>0)p++;return Math.min(2,p)}
function lawFine(lvl,gr){return mm(lvl<=0?5:lvl===1?[8,12,16][gr-1]:lvl===2?[25,35,50][gr-1]:[60,90,130][gr-1])}
function lawApply(c,L,lvl,gr){const S=X.S;lvl=clamp(Math.round(lvl),0,5);if(inClan(c))ledAdd('an',[c.id],{lvl,c:L&&L.id||null},{w:60});if(age(c)<16)lvl=Math.min(lvl,2);
  /* lệ độc đinh: nhà chỉ còn một người trụ cột thì không bị khổ sai, đày hay xử tử (trừ thập ác) */
  let pre='';if(lvl>=3&&!L.tc&&!alive().some(p=>p.id!==c.id&&age(p)>=14)){lvl=2;pre='Theo lệ độc đinh, quan giảm hình. '}
  memSet('tienan:'+c.id,360);memAdd('lw_tong',1,240);S.cases=S.cases||[];S.cases.unshift({t:S.t,who:c.id,law:L.id,lvl});if(S.cases.length>30)S.cases.length=30;
  const q=c.job==='quan';
  if(lvl<=0)return `Bị khiển trách và phải bồi thường.`+fx(c,{money:-mm(5),fame:-1});
  if(lvl===1)return `Bị đánh roi tại công đường.`+fx(c,{suc:-R(3,8),fame:-3,tam:-4});
  if(lvl===2){if(q)qtAdd(c,{risk:6});return pre+`Bị đánh gậy tại công đường.`+fx(c,{suc:-R(8,16),fame:-6,tam:-8})}
  if(lvl===3){const yrs=gr;c.away={type:'luuday',until:S.t+12*yrs+R(0,6)};if(q)qtDismiss(c,'phạm tội '+L.n.toLowerCase());cf(-4,'Người nhà bị khổ sai');
    return `Bị phạt khổ sai ${yrs} năm${q?', bị cách chức':''}.`+fx(c,{fame:-12,tam:-6})}
  if(lvl===4){const tb=qtConfiscate(QT.tich[3]);c.away={type:'luuday',until:S.t+R(60,150)};if(q)qtDismiss(c,'phạm tội '+L.n.toLowerCase());cf(-10,'Người nhà bị đày');
    return `Bị đày đi xa${q?', cách chức':''}. ${tb}`+fx(c,{fame:-20,tam:-10})}
  if(L.tc)return qtSentence(c,5,L.n.toLowerCase());
  die(c,'bị xử tử vì '+L.n.toLowerCase());cf(-12,'Người nhà bị xử tử');return `Bị khép án tử. Gia tộc mang tiếng.`}
function lawCase(c,id,o){if(!c||!LAWM(id))return;enqueue('law',c.id,{law:id,o:o||{}})}
function lawPopup(c,it){const S=X.S;const L=LAWM(it.law);if(!L||c.dead!=null||!inClan(c)){setTimeout(nextPopup,0);return}
  const o=it.o||{};const base=clamp(L.lv+(o.ag||0)-(o.mi||0)+(memHas('tienan:'+c.id)?1:0),0,5);
  const priv=lawPriv(c,L);const l0=clamp(base-priv,0,5);const gr=L.gr;const ev=o.ev==null?50:o.ev;
  const tc=memHas('thay_cai');const fin=lawFine(l0,gr),c20=mm(tc?10:20),c15=mm(15),cl=mm(30+20*l0);
  const text=`${o.ctx?esc(o.ctx):esc(nameOf(c))+' bị đưa ra công đường'}. Tội: <b>${esc(L.n.toLowerCase())}</b>.${priv?` Nhờ phẩm cấp được giảm ${priv} bậc.`:''}${L.tc?' Thuộc thập ác, không được chuộc.':''} Hình định: <b>${lawLvText(l0,gr)}</b>.`;
  const helper=alive().some(p=>inClan(p)&&p.id!==c.id&&((p.job==='quan'&&p.lv>=4)||(p.tuoc||0)>0))||(c.tuoc||0)>0;
  const opts=[{l:'Nhận tội, chịu hình',f:c=>lawApply(c,L,l0,gr)},
    {l:`Thuê thầy cãi (${money(c20)})`,c:()=>S.money>=c20,r:[{khau:0.7,tri:0.5},clamp(55+(tc?15:0)-(ev-50)*0.5,15,90)],
      y:c=>{S.money-=c20;return 'Thầy cãi khéo, án được giảm một mức. '+lawApply(c,L,l0-1,gr)},n:c=>{S.money-=c20;return 'Thầy cãi không lay được quan xử án. '+lawApply(c,L,l0,gr)}}];
  if(!L.tc&&l0<=3)opts.push({l:`Chuộc bằng bạc (${money(fin)})`,c:()=>S.money>=fin,f:c=>{S.money-=fin;memSet('tienan:'+c.id,360);memAdd('lw_tong',1,240);cf(-1,'Chuộc tội bằng bạc');return `Nộp đủ bạc chuộc, được tha hình. Vụ việc ghi vào sổ.`+fx(c,{fame:-2})}});
  if(!L.tc)opts.push({l:`Lo lót quan xử án (${money(cl)})`,c:()=>S.money>=cl,r:[{muu:0.6,eq:0.5},45],
    y:c=>{S.money-=cl;return 'Quan nhận lễ, án nhẹ đi hai mức. '+lawApply(c,L,l0-2,gr)+fx(c,{liem:-4})},n:c=>{S.money-=cl;return 'Việc đưa hối lộ bị lộ, án nặng thêm. '+lawApply(c,L,l0+1,gr)+fx(c,{liem:-6,fame:-5})}});
  const lh=!L.tc&&window.BNHELP?BNHELP.find('law',{who:c}):null,lf=window.BNHELP?BNHELP.foe('law',{who:c}):null; /* d.1.5.44: quan, người có thế quen thân can thiệp; kẻ thù cản kháng án. Thập ác không giảm */
  if(lh)opts.push({l:`Nhờ ${lh.name} can thiệp`,r:[{eq:0.7,khau:0.4},clamp(45+15*lh.lv,20,90)],y:c=>'Có người nói giúp, án nhẹ đi. '+lawApply(c,L,l0-lh.lv,gr)+BNHELP.use(lh,'law',`can thiệp cho ${c.given} ở công đường`),n:c=>'Lời nói giúp không lay được quan xử án. '+lawApply(c,L,l0,gr)+BNHELP.use(lh,'law',`đã đỡ lời cho ${c.given} nhưng không thành`)});
  if(helper)opts.push({l:'Nhờ người có phẩm tước trong họ lên tiếng',r:[{eq:0.7,khau:0.4},L.tc?30:55],y:c=>'Người có quyền thế nói giúp, án giảm một mức. '+lawApply(c,L,l0-1,gr),n:c=>'Lời nói giúp không được nghe, còn mang tiếng nhờ vả. '+lawApply(c,L,l0,gr)+fx(c,{fame:-3})});
  {const holder=alive().find(p=>inClan(p)&&p.flags&&p.flags.baoLanh>S.t);const q=holder&&G.tie&&G.tie.act('quy_nhan').filter(n=>(n.rel||0)>=10)[0];
    if(holder&&q)opts.push({l:`Cầm thiếp bảo lãnh của ${esc(q.n)} đến xin`,r:[{eq:0.7,khau:0.4},L.tc?35:80],y:c=>{holder.flags.baoLanh=0;G.tie.rel(q,-6,'dùng thiếp bảo lãnh');return `Thiếp của ${esc(q.n)} đến tay quan xử án, ông ta đổi sắc mặt rồi giảm án hai mức. `+lawApply(c,L,l0-2,gr)+fx(c,{qh:[q.n,-6]})},n:c=>{holder.flags.baoLanh=0;return `Quan xử án trả lại thiếp, nói không thể vì quen biết mà bẻ luật. Lời bảo lãnh mất tác dụng. `+lawApply(c,L,l0,gr)+fx(c,{fame:-2})}})} /* d9.12: đọc cờ baoLanh do tie_quy_nhan_giup đặt */
  opts.push({l:`Kháng án lên cấp trên (${money(c15)})`,c:()=>S.money>=c15,r:[{tri:0.6,khau:0.5},clamp(40-(ev-50)*0.4-(lf?10:0),10,70)],y:c=>{S.money-=c15;return 'Cấp trên xét lại, giảm một mức. '+lawApply(c,L,l0-1,gr)},n:c=>{S.money-=c15;return 'Cấp trên giữ nguyên án. '+lawApply(c,L,l0,gr)+fx(c,{fame:-2})}});
  if(it.test)return {text,opts};
  choicePopup(c,'Công đường',`Xét xử: ${L.n}`,text,opts)}
function staffEff(st,role){const R0=ROLES[role];let s=0,n=0;for(const k in R0.req){s+=Math.min(1.25,st[k]/R0.req[k]);n++}return (n?s/n:1)*(0.7+st.m/200)*staffVigor(st)}
function staffInit(st,age0){const S=X.S;
  const a=age0!=null?age0:Math.min(58,16+Math.floor(Math.pow(Math.random(),1.35)*42));
  st.born=S.t-12*a-R(0,11);st.hp=clamp(R(62,100)-Math.max(0,a-45)*1.2,25,100);st.sick=0;st.loy=R(45,75);st.since=S.t;return st}
function staffFix(st){const S=X.S;if(st.born==null){const a=R(19,50);st.born=S.t-12*a-R(0,11)}
  if(st.hp==null)st.hp=R(60,100);if(st.sick==null)st.sick=0;if(st.loy==null)st.loy=R(50,75);if(st.since==null)st.since=S.t-R(6,60);return st}
function staffVigor(st){const a=stAge(st);return (st.sick>0?0.4:1)*(a<18?0.8:ageEff(a))*(st.lite?0.6:1)*(st.hp<35?0.85:1)}
function staffDie(b,st,why){
  const sn=stfSnap(st);stfRemove(b,st);
  b.staff.forEach(x=>{x.loy=clamp((x.loy||60)-3,0,100)});
  log(`${sn.n}, ${sn.ra} ở ${BIZ[b.type].lv[b.lv][0].toLowerCase()}, qua đời, thọ ${sn.age} tuổi.`,'hi');
  stfEvent(b,'stf_death',Object.assign(sn,{why}))}
function staffTick(b){const S=X.S;
  b.staff.slice().forEach(st=>{
    if(!b.staff.includes(st))return;
    staffFix(st);
    const a=stAge(st);const epi=S.epi?1:0;
    /* sức khỏe trôi theo năm */
    if(S.t%12===0)st.hp=clamp(st.hp+R(-3,2)-(a>=50?2:0)+(a<35?1:0),8,100);
    /* ốm */
    if(st.sick>0){st.sick--;
      const dp=0.006+(a>=55?0.014:0)+(st.hp<35?0.025:0)+epi*0.018-(st.care?0.012:0);
      if(chance(Math.max(0.002,dp))){staffDie(b,st,'bệnh nặng');return}
      if(st.sick===0){st.care=0;if(chance(0.12+(st.hp<40?0.15:0)))st.hp=Math.max(8,st.hp-R(6,16))}
    }else{
      const sp=0.006+(a>=50?0.006:0)+(a>=60?0.008:0)+epi*0.02+(st.hp<45?0.008:0)+(S.disaster&&S.disaster.k==='lam'?0.02:0);
      if(chance(sp)){st.sick=R(1,4)+(st.hp<45?1:0);st.care=0;
        if((a>=50||st.hp<50||epi)&&chance(0.55))stfEvent(b,'stf_sick',Object.assign(stfSnap(st),{}));
        else log(`${st.n} ở ${BIZ[b.type].lv[b.lv][0].toLowerCase()} ngã bệnh, nghỉ mấy tháng.`)}}
    /* tai nạn nghề */
    const ar=STACC[st.role]||0;
    if(ar&&chance(ar*(S.war?1.2:1))){
      if(chance(0.13)){staffDie(b,st,'tai nạn lúc làm việc');return}
      st.hp=Math.max(8,st.hp-R(8,22));st.sick=Math.max(st.sick,R(1,3));log(`${st.n} bị thương lúc làm việc ở ${BIZ[b.type].lv[b.lv][0].toLowerCase()}.`)}
    /* tuổi già */
    if(a>=40&&chance(stfHazard(a)/12*(st.hp<40?1.5:1))){staffDie(b,st,'tuổi già');return}
    /* nghỉ hưu */
    if(a>=60&&!st.lite&&chance(a>=66?0.05:0.022)){const sn=stfSnap(st);stfRemove(b,st);log(`${sn.n} xin nghỉ hưu${sn.yrs>=1?` sau ${sn.yrs} năm làm`:''} ở ${BIZ[b.type].lv[b.lv][0].toLowerCase()}.`);stfEvent(b,'stf_retire',sn);return}
    /* lòng trung thành: lương cao hơn mặt bằng thì yên lòng, thấp hơn thì bực */
    const R0=ROLES[st.role];const mw=R0?R0.w*((BIZX[b.type]||{w:1}).w||1):st.wage;
    st.loy=clamp((st.loy||60)+(st.wage>=mw*1.15?0.35:st.wage>=mw*0.9?0.05:-0.45)+(S.t%12===0?R(-2,2):0),0,100);
    if(a<48&&chance(0.0013)){const sn=stfSnap(st);stfRemove(b,st);log(`${sn.n} xin nghỉ ở ${BIZ[b.type].lv[b.lv][0].toLowerCase()}, ${pick(['về quê nối nghề nhà',st.g==='nữ'?'đi lấy chồng xa':'về quê cưới vợ','theo người quen đi làm ăn nơi khác','về chăm cha mẹ già','lập gia đình, dọn sang làng khác'])}.`);return}
    if(st.loy<18&&chance(0.035)){const sn=stfSnap(st);stfRemove(b,st);log(`${sn.n} chán cảnh làm công, xin thôi việc ở ${BIZ[b.type].lv[b.lv][0].toLowerCase()}.`);stfEvent(b,'stf_quit',sn);return}
  })}
function giftNorm(fame,wealth){const sc=Math.max(0,fame/60+wealth/45);let v=Math.max(60,400*Math.pow(4.6,sc-1.06));
  /* v6.3.5: nhà thường dân vài trăm đồng; nhà có tiếng vài bạc; danh gia vài chục bạc; thế gia vài trăm bạc; danh môn vọng tộc vài vàng */
  const u=v<1000?10:v<20000?100:v<500000?1000:10000;return Math.round(v/u)*u}
function giftTiers(norm){return [
  {k:'mon',n:'Lễ mọn',f:0.35,d:'Chút quà quê, tỏ chút lòng'},
  {k:'vua',n:'Lễ vừa',f:1,d:'Đủ lễ nghĩa với thân phận họ'},
  {k:'hau',n:'Lễ hậu',f:2.2,d:'Hậu hĩnh, ai cũng thấy nhà mình có thành ý'}].map(t=>Object.assign(t,{cost:Math.max(10,Math.round(norm*t.f/10)*10)}))}
function giftGain(ratio,tr,recent,relNow){
  let d=ratio<0.3?0:ratio<0.55?R(0,2):ratio<0.85?R(2,5):ratio<1.3?R(7,11):ratio<2?R(10,13):R(11,15);
  if(tr==='tham lam'){d=ratio<0.85?-R(1,3):Math.round(d*1.25)}
  else if(tr==='ngạo mạn'){if(ratio<1)d=-R(1,4)}
  else if(tr==='hẹp hòi'){if(ratio<0.85)d=Math.min(d,0)}
  else if(tr==='chính trực'){if(ratio>=1.5)d=Math.round(d*0.5)}
  else if(tr==='nhân hậu'){if(ratio>=0.3&&ratio<0.85)d+=1}
  if(d>0){d*=Math.pow(0.55,recent);if(relNow>=60)d*=0.5;if(relNow>=80)d*=0.5;d=d>=1?Math.round(d):(chance(d)?1:0)}
  return d}
function giftWhy(ratio,tr,d,recent){
  if(d<0)return tr==='ngạo mạn'?'Họ cho là coi thường, nhận quà mà mặt không vui.':tr==='tham lam'?'Họ chê quà ít, nhận lấy lệ.':'Quà không hợp ý họ.';
  if(d===0)return recent>0&&ratio>=0.5?'Mới biếu chưa lâu, tình nghĩa không thêm.':ratio<0.55?'Quà quá nhẹ so với thân phận họ, họ nhận lấy lệ chứ không nhớ.':'Họ nhận quà, nhưng tình nghĩa vẫn thế.';
  if(ratio<0.85)return 'Quà chưa đủ đầy nhưng có lòng, họ gật đầu.';
  if(ratio>=1.5&&tr==='chính trực')return 'Họ ngại quà quá hậu, nhận mà không vui hẳn.';
  return recent>0?'Biếu thêm lần nữa, tình nghĩa nhích lên chút ít.':'Quà đúng lễ, họ nhớ tình.'}
function giftPopup(o){const S=X.S;
  const T=giftTiers(o.norm);const recent=giftRecent(o.gifts);
  openModal(`<h2>${esc(o.title)}</h2><p>${o.intro} Lễ tương xứng với thân phận họ khoảng <b>${money(o.norm)}</b>.${recent?` Hai năm qua đã biếu ${recent} lần, biếu thêm thì tình nghĩa lên chậm.`:''}${o.low?' Nhà mình còn nhỏ, họ ít để ý nên tình nghĩa lên chậm.':''}</p>
   <div class="choices">${T.map((t,i)=>`<button class="btn" data-g="${i}" ${S.money<t.cost?'disabled':''}><strong>${t.n} · ${money(t.cost)}</strong><small>${t.d}</small></button>`).join('')}<button class="btn ghost" data-n>Thôi</button></div>`,false,'menu');
  M.querySelector('[data-n]').onclick=closeModal;
  M.querySelectorAll('[data-g]').forEach(b=>b.onclick=()=>{const t=T[+b.dataset.g];if(S.money<t.cost){closeModal();return}
    S.money-=t.cost;const ratio=t.cost/o.norm;let d=giftGain(ratio,o.tr,recent,o.rel);if(o.big&&ratio<0.5&&d>0)d=0;if(o.low&&d>0)d=Math.max(0,Math.round(d*0.5));
    o.apply(d,t,ratio);o.gifts.push(S.t);while(o.gifts.length>8)o.gifts.shift();
    log(`Biếu ${o.who} ${t.n.toLowerCase()} ${money(t.cost)}. ${giftWhy(ratio,o.tr,d,recent)}`);closeModal();save()})}
function brkScore(c,sp){let s=0,w=0;for(const k in sp){s+=vget(c,k)*sp[k];w+=sp[k]}return w?s/w:50}
function brkAgeOk(c,p){const a=age(c);if(p.age&&(a<p.age[0]||a>p.age[1]))return false;if(FAR_RE.test(p.l+' '+(p.d||''))&&(a<16||a>=65))return false;if(p.cost&&a<16)return false;return true}
function brkPaths(c,k,t){t=t||100;if(k==='suc')return [];const L=(BRK100[k]||[]).filter(p=>!p.hidden&&(!p.job||p.job.includes(c.job))&&(!p.ax||axv(c,p.ax[0])>=p.ax[1])&&brkAgeOk(c,p)&&(p.gate?p.gate===Math.min(t,140):t<=100||p.age));
  const sc=p=>brkScore(c,p.sp)+(p.job?25:0)+(p.age?40:0)+hashN(c.id+p.id)%22;return L.sort((a,b)=>sc(b)-sc(a)).slice(0,3)}
function brkStart(c,k,p,g){const S=X.S;g=g||gateCap(c,k);const mo=Math.round(R(p.mo[0],p.mo[1])*(g>=150?1:g>=140?1.3:g>=120?1.15:1));c.brk={k,id:p.id,start:S.t,end:S.t+mo,prog:0,mid:0,gate:g};if(p.cost)charge(c,mm(p.cost));
  log(`${nameOf(c)} bắt đầu ${p.l.toLowerCase()}, dự kiến ${mo} tháng.`,'gd');return `Dự kiến mất ${mo} tháng. Thành hay bại do cả quá trình: tâm trạng, sức khỏe và căn cơ mỗi tháng đều góp phần.`}
function brkTick(c){const S=X.S;const b=c.brk;if(!b||b.done)return;const p=(BRK100[b.k]||[]).find(x=>x.id===b.id);if(!p){c.brk=null;return}
  const dur=Math.max(1,b.end-b.start);const s=brkScore(c,p.sp);
  b.prog+=(s/80)*(100/dur)*(0.6+0.6*c.tam/100)*(0.7+0.3*Math.min(1,c.suc/70))*(1+tsum(c,'brk')/40)*(0.6+Math.random()*0.8)*({100:1,120:.9,140:.8,150:.95}[b.gate||100]||1);
  if(!b.mid&&S.t>=b.start+Math.floor(dur/2)){b.mid=1;enqueue('brkmid',c.id)}
  if(S.t>=b.end){b.done=1;enqueue('brkend',c.id)}}
function brkMidPopup(c){const S=X.S;const b=c.brk;if(!b){setTimeout(nextPopup,0);return}const p=BRK100[b.k].find(x=>x.id===b.id);const pct=Math.round(b.prog);
  choicePopup(c,'Đột phá',`Giữa chừng: ${p.l.toLowerCase()}`,`Đã qua nửa chặng. ${esc(c.given)} ${pick(BRK_MID[b.k])}. Tự thấy mình đi được khoảng ${pct>=55?'hơn nửa':pct>=40?'gần nửa':'chưa tới nửa'} con đường.`,[
    {l:'Giữ nhịp như cũ',f:c=>'Không nóng vội, từng bước một.'+fx(c,{tam:1})},
    {l:'Dốc toàn lực',f:c=>{b.prog+=R(10,18);return 'Thức khuya dậy sớm, người gầy rộc đi.'+fx(c,{suc:-R(6,12),tam:-5})}},
    {l:'Nghỉ ít lâu cho lại sức',f:c=>{b.end+=R(2,4);return 'Lùi lại vài tháng, đầu óc thư thái hơn.'+fx(c,{tam:8,suc:5})}},
    {l:'Bỏ dở',f:c=>{c.brk=null;c.ms[b.k]=(c.ms[b.k]||[]).filter(x=>x!==100);c.msRetry[b.k]=S.t+R(12,30);if(c.msQ)c.msQ[b.k]=null;return 'Thấy chưa phải lúc, gác lại.'+fx(c,{tam:-4})}}]);
}
function brkEndPopup(c){const S=X.S;const b=c.brk;if(!b){setTimeout(nextPopup,0);return}const p=BRK100[b.k].find(x=>x.id===b.id);const N=SN[b.k];
  const score=b.prog+c.duyen/12+R(-8,8);c.brk=null;const g=b.gate||100;
  if(score>=100){const T=window.D.TRAITS[p.gain];let extra='';c.gate=c.gate||{};c.g200=c.g200||{};
    if(g===150){c.g200[b.k]=1;c.gate[b.k]=200}else c.gate[b.k]=nextGate(g);if(c.msQ)c.msQ[b.k]=null;
    if(b.k==='suc'){c.cap.suc=Math.min(hardCap(c,'suc'),Math.max(c.cap.suc,g)+R(3,6))}
    if(p.gain&&!has(c,p.gain)){addTrait(c,p.gain);extra=` Được đặc tính <b>${T.n}</b>: ${esc(T.d.toLowerCase())}.`}
    extra+=g===150?` Phàm nhân chỉ đến 150, nay giới hạn ${N.toLowerCase()} mở tới 200.`:` Giới hạn ${N.toLowerCase()} mở tới ${c.gate[b.k]}.`;
    achieve(c,`vượt ngưỡng ${N.toLowerCase()} ${g}`);
    return infoPopup(c,'Đột phá',`${N} vượt ngưỡng`,`Sau ${b.end-b.start} tháng ${esc(p.l.toLowerCase())}, ${esc(c.given)} ngộ ra điều trước giờ chưa thấy.${extra}`+fx(c,{[b.k]:R(4,9),over:1,fame:8+Math.round(score-100)/2,tam:10}))}
  c.ms[b.k]=(c.ms[b.k]||[]).filter(x=>x!==100);c.msRetry[b.k]=S.t+R(10,22);if(c.msQ)c.msQ[b.k]=null;if(g===150&&c.flags)c.flags['tc_'+b.k]=0;
  const hurt=['vo','suc'].includes(b.k)&&chance(0.3);
  infoPopup(c,'Đột phá',`${N}: chưa thành`,`${b.end-b.start} tháng ${esc(p.l.toLowerCase())} rốt cuộc không đủ. ${score>=85?'Chỉ còn cách một bước chân.':'Còn xa lắm.'} Một hai năm nữa có thể thử lại bằng con đường khác.`+fx(c,{tam:-8,...(hurt?{suc:-R(8,15),hpMax:-R(1,3)}:{})}))}
Object.assign(X.fn,{viceActors,viceBy,viceAlert,viceWork,viceTick,vicePopup,viceSpend,lawLvText,lawPriv,lawFine,lawApply,lawCase,lawPopup,staffEff,staffInit,staffFix,staffVigor,staffDie,staffTick,giftNorm,giftTiers,giftGain,giftWhy,giftPopup,brkScore,brkAgeOk,brkPaths,brkStart,brkTick,brkMidPopup,brkEndPopup});
});
