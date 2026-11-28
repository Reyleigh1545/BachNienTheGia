/* Bách Niên Thế Gia · engine-xd.js: gói ENGX tách từ engine.js bằng tools/xmove.js (7.0.0-d.1.5.6). Thân hàm giữ nguyên; engine.js còn dòng chuyển ENGX.fn.<tên>. Hàm gán vào biến let cấp cao KHÔNG nằm ở đây. Nạp sau events-lv.js, trước engine.js. */
window.ENGX=window.ENGX||[];
window.ENGX.push(X=>{
const {ARMY,BIGS,BIZ,BM_NEED,BRK100,CLANOFF,CROPS,CTRL_N,CTX,CT_P,DIS,DX,ERA_A,ERA_B,EXAM_N,EXPECT,FACK,FGIV,FLOWN,FMID,FOCUS,FUNRE,G,GOODS,GOP,HABITS,HH,HOMES,I,JOBS,KIN_N,KT_N,LIFE,MGIV,MMID,MS,MTAL,NPC_TC,OFFICES,OFFJ,P,PROV,QL_NEED,QST_N,R,RANKS,REG,REGIONS,ROLES,RULEREQ,RULES,RULEX_CONFLICT,RULE_HATE,SALARY,SCHOOL,SM,SN,STARTJOBS,STATS,STF_KEY,STITLE,SURN,TIERS,TIER_GATE,TOLV,TRAITS,TUOC,TUOC_CONG,U2,addRel,addRule,addStat,addTrait,affordFocus,age,alive,allocated,avatarSVG,awayFromHome,awayText,axChips,axv,bar,bigAvail,bizCalc,bizOf,bizOwnName,bizSkillWhy,bizStaffInfo,bookSweep,booksOf,branchLeader,branches,canOpenAny,canOwn,canPunish,cf,chance,choicePopup,clamp,clanFormed,clanKeeps,clanTuoc,clrN,confer,courtCard,crMonth,crRes,ctChips,ctEvents,ctRank,ctStat,ctrlLv,dOf,dateStr,dropRule,dynEns,dynSnap,earnOf,econEst,enqueue,ensureEcon,ensureNat,esc,facN,famCard,famEnsure,famLuck,famPerson,famReign,fameWhy,farmArea,fitPick,fmt,focusCost,focusHold,followers,fundGet,fundOf,fx,growStat,hKeep,habChips,head,hhCount,hhExpense,homeSVG,houseSur,inClan,inMain,inPost,income,inlawLink,innate,innateGenes,innateStats,isHead,isOff,isVice,jobName,jobOk,kType,keepTxt,kidCap,kidsOf,kingT,laborOk,landCost,landRight,landTotal,later,ledAdd,log,loveNow,loveWord,mainHH,mapSVG,married,maxTrips,meets,miLoss,mjobFor,mk,mkCfg,mkStaff,mm,mmn,money,nameOf,natOf,nextPopup,nextReq,npAge,npGet,npNew,obey,obeyWord,offHolder,offOf,offOk,offState,outsiderName,perksCard,phTxt,pick,pieceJob,postOf,pot,prefFocus,priceOf,projAc,projCard,projDef,projUsedAc,promoWhy,protect,provN,qtLog,randomTraits,rankTxt,realTraits,relJob,relOf,relWord,relation,remarryOk,rollGenes,rollHealthTitle,rollTraitGenes,routes,rule,ruleG,seatName,seatTm,seatWh,selfEmp,selfPerks,setLove,setNpcJob,sideInc,sideIncome,skv,spList,spTag,sphAdd,spouseOf,stAge,staffInit,standOf,statBlock,thoiTheCard,thoughts,tierIdx,tierName,tierScore,toEst,traitChip,tsum,uid,usCard,usedGivens,uyWord,vacantHomes,viceBy,viceChips,viceOf,vioAdd,vioOf,w_ensure,w_provPanel,w_situation,wageFor,wantsKid,wealth,whereP,wildAcres,willTxt,working,wpCard}=X.EC;
function sheetHTML(c){const S=X.S;
  const a=age(c),J=JOBS[c.job],dead=c.dead!=null,out=!inClan(c);
  const deg=['','Cử nhân','Đỗ thi Hội',c.flags.examTitle||'Tiến sĩ'][c.degree];
  let h=`<button class="xclose" data-close aria-label="Đóng">×</button><div class="who">${avatarSVG(c,64)}<div style="min-width:0"><h2>${esc(nameOf(c))}</h2>
   <div class="chips"><span class="chip ${c.id===S.head?'gold':''}">${relation(c)}</span><span class="chip">${dead?'Đã mất':a+' tuổi'}</span>${selfPerks(c)}${c.hb?`<button class="chip gold" data-info="hb:${c.hb}">Uy gia chủ +${c.hb}</button>`:''}${c.tuoc?`<button class="chip gold" data-info="tr:tu_${Math.min(5,c.tuoc)}">${TUOC[c.tuoc]}</button>`:''}${c.degree?`<button class="chip gold" data-info="tr:dg_${Math.min(3,c.degree)}">${deg}</button>`:''}${ctChips(c)}${c.outSp?`<span class="chip">Về nhà họ ${esc(c.outSp.sur)}</span>`:''}${c.preg?'<span class="chip red">Mang thai</span>':''}${(c.ill||[]).map(i=>`<span class="chip red">Ốm: ${esc(i.n)}${i.sev>=3?', nặng':''}</span>`).join('')}${c.pst&&isOff(c)?`<span class="chip blue">Nhậm chức ${esc(provN(c.pst.p))}${c.pst.fam?(c.pst.fam>1?' · cả nhà theo':' · có vợ chồng theo'):''}</span>`:''}${c.away&&awayText(c)?`<span class="chip blue">${awayText(c)}</span>`:''}${c.hh!==mainHH()&&!out&&HH(c.hh)&&HH(c.hh).name?`<span class="chip blue">${esc(HH(c.hh).name)}</span>`:''}</div>
   <div class="chips">${realTraits(c).map(traitChip).join('')}${habChips(c)}${viceChips(c)}</div></div></div>
   ${ctNote(c)?`<p class="muted small" style="margin:.3rem 0 .5rem">${ctNote(c)}</p>`:''}
   <div class="dsec tight"><h3>${I('axes','Tính cách')}</h3><div class="chips">${axChips(c)||'<span class="muted small">Chưa có nét nổi bật</span>'}</div></div>
   ${statBlock(c)}
   <div class="kvline">${I('pot','Tiềm năng:')} ${STATS.filter(([k])=>k!=='suc').map(([k,n])=>`${n} ${natOf(c,k)}`).join(' · ')}</div>
   ${awayFromHome(c)?`<div class="kvline">Đang ở <b>${esc(provN(whereP(c)))}</b>${c.pst?' · nhậm chức':c.away&&c.away.type==='follow'?' · theo người nhà':''}</div>`:''}<div class="kvline">Danh vọng <b class="num ${c.fame<0?'down':''}">${fmt(c.fame)}</b>${c.job==='quan'?` · ${I('liem','Liêm chính')} <b class="num">${Math.round(c.liem)}</b>`:''}${c.merit?` · ${I('merit','Chiến công')} <b class="num">${fmt(c.merit)}</b>`:''}</div>
   ${!dead&&!out&&(age(c)>=16||c.purse)?`<div class="kvline">${inMain(c)?`${I('purse','Tiền riêng')} <b class="num">${money(c.purse)}</b>${keepTxt(c)}${(c.anbam||0)>4?' · <span class="down">đang ăn bám</span>':''}${offOf(c)?` · ${esc(CLANOFF[offOf(c)].n)}`:''}`:`${esc(HH(c.hh).name)} · quỹ hộ <b class="num ${HH(c.hh).money<0?'down':''}">${money(HH(c.hh).money)}</b>${c.purse?` · tiền riêng ${money(c.purse)}`:''}`}</div>`:''}
   ${!dead&&!out&&age(c)>=8&&!isHead(c)&&head()?`<div class="kvline">${obeyWord(obey(c))} với gia chủ${(c.oan||0)>=40?' · <span class="down">đang ôm hận</span>':''}${(c.busyUntil||0)>S.t?` · bận việc đến ${dateStr(c.busyUntil)}`:''}</div>`:''}
   ${!dead&&!out&&age(c)>=25?`<div class="kvline">Di chúc: ${esc(willTxt(c).toLowerCase())}${isHead(c)&&c.will&&P(c.will.heir)?` · chọn ${esc(P(c.will.heir).given)} nối nghiệp`:''}</div>`:''}`;
  if(dead||out)return h;
  const th=thoughts(c);
  h+=`<div class="dsec"><h3>${I('think','Tâm tư')}</h3><ul class="think">${th.map(t=>`<li>${t}</li>`).join('')}</ul></div>`;
  h+=`<div class="dsec"><h3>${a>=16&&c.job!=='none'?I('job:'+c.job,esc(jobName(c))):'Nghề nghiệp'}</h3>`;
  if(a>=16&&!['none','vua','huu'].includes(c.job)){
    h+=`${['quan_ngu','noi','hiep'].includes(c.job)?'':bar(c.job==='chu'&&JOBS[c.bizFrom]?'Thông thạo '+JOBS[c.bizFrom].n.toLowerCase():'Thông thạo',c.m,120,'mm','mm')}
    <div class="kvline">${c.job==='nong'?'Thu theo mùa vụ':c.job==='chu'?(bizOf(c)&&bizOf(c).last?`Lãi tháng trước ${money(bizOf(c).last.profit)}`:'Lãi cơ sở'):c.job==='hiep'?`Túi riêng ${money(c.purse)}`:`${money(income(c))}/tháng`}${c.job==='quan'?` · lộc ngoài ${money(sideIncome(c))}`:''}${c.job==='quan'&&postOf(c)?` · ${esc(postOf(c).n)}`:''}${c.job==='quan'&&c.qt?` · ${c.qt.f?'phe '+facN(c.qt.f):'không theo phe'}${c.qt.st?` · <b class="down">${QST_N[c.qt.st]}</b>`:''}`:''}${selfEmp(c)?' · tự làm, không có chủ':''}${pieceJob(c)?' · thu theo năng suất':''}</div>`;
    if(c.job==='hiep'){{const s0=c.flags.ghs&&(S.wr&&S.wr.sects||[]).find(x=>x.id===c.flags.ghs);const W0=S.wr&&S.wr.gwar;const ch=c.flags.ghc;const bk=c.flags.bk||{};const bks=[bk.kiem&&'kiếm phổ',bk.noi&&'nội công',bk.khinh&&'khinh công'].filter(Boolean);
      h+=`<div class="kvline">${s0?`Phái <b>${esc(s0.n)}</b> · sức ${s0.pow||50}${ch?' · chức <b>'+({hophap:'Hộ pháp',truonglao:'Trưởng lão'}[ch]||ch)+'</b>':''}${W0&&(W0.a===s0.id||W0.b===s0.id)?' · <span class="down">đang giao tranh</span>':''}`:'Chưa vào môn phái nào'}${bks.length?' · bí kíp: '+bks.join(', '):''}</div>`}
      const L=JOBS.hiep.lv[c.lv+1];h+=`<div class="kvline">Tiếng tăm <b class="num">${fmt(c.fame)}</b> · ${SN.vo} <b class="num">${Math.round(c.vo)}</b></div>${L?`<div class="kvline muted">Muốn lên ${esc(L.n.toLowerCase())}: ${Object.entries(L.req).map(([k,v])=>k==='fame'?`danh vọng ${fmt(v)}`:`${SN[k].toLowerCase()} ${v}`).join(', ')}</div>`:'<div class="kvline muted">Đã đứng đầu võ lâm</div>'}`}
    const r=nextReq(c);if(r)h+=`<div class="kvline muted">Lên ${esc(J.lv[c.lv+1].n.toLowerCase())}: ${Object.entries(r).filter(([k])=>k!=='land').map(([k,v])=>k==='m'?`thông thạo ${v}`:k==='fame'?`danh vọng ${v}`:k==='degree'?'đỗ cử nhân':k==='flag'?(v==='thuyen'?'thuyền lớn':'cơ duyên riêng'):`${SN[k]} ${v}`).join(', ')||'thêm ruộng'}</div>`;
  }else if(a<16)h+=`<div class="kvline muted">${a>=6&&c.school!=='nha'?esc((SCHOOL[a<10?1:a<14?2:3][c.school]||{n:'Đi học'}).n):'Còn nhỏ'}${c.appr&&JOBS[c.appr]&&a>=6?' · học nghề '+JOBS[c.appr].n.toLowerCase():''}${Object.keys(c.pre).length?' · đã học việc '+Object.entries(c.pre).map(([j,v])=>`${JOBS[j].n.toLowerCase()} ${Math.round(v)}`).join(', '):''}</div>`;
  else h+=`<div class="kvline muted">${c.job==='huu'?'An hưởng tuổi già':c.flags.jobRetry>S.t?'Trượt phỏng vấn, đợi năm sau':'Chưa có nghề'}</div>`;
  h+=`<div class="acts">`;
  const can=(k,l,dis)=>h+=`<button class="btn small" data-do="${k}" ${dis?'disabled':''}>${l}</button>`;
  if(bigAvail(c).length)can('big','Việc lớn');
  if(c.viec){const bb=BIGS.find(x=>x.id===c.viec.id);h+=`<span class="kvline muted">Đang làm việc lớn: ${bb?esc(bb.n.toLowerCase()):''}, xong khoảng ${dateStr(c.viec.end)}</span>`}
  if(c.job==='quan_ngu'&&a>=16)can('resign','Xin giải ngũ');
  if(!c.away){
    if(a>=16&&!['quan','vua','nguy','quan_ngu','hiep'].includes(c.job))can('job',c.job==='none'||c.job==='huu'?'Chọn nghề':'Đổi nghề',c.flags.jobRetry>S.t);
    if(c.job==='quan'){{const w=promoWhy(c);can('office',w?`Thăng tiến <small>${esc(w)}</small>`:'Thăng tiến',!!w)};can('resign','Từ quan')}
    Object.keys(BIZ).filter(t=>canOwn(c,t)).forEach(t=>{const L0=BIZ[t].lv[0];h+=`<button class="btn small" data-open="${t}" ${canOpenAny(c,L0[1])?'':'disabled'}>Mở ${esc(L0[0].toLowerCase())} · ${money(L0[1],1)}</button>`});
    /* d9.10: hợp nghề mà chưa đủ điều kiện thì nói rõ thiếu gì (trước đó nút biến mất, chủ dự án hỏi vì sao nghề Y không mở được hiệu thuốc) */
    if(a>=18&&c.job!=='chu')Object.keys(BIZ).filter(t=>!canOwn(c,t)&&relJob(c,t)).forEach(t=>{const why=bizSkillWhy(c,t).filter(w=>!/^không làm nghề/.test(w));if(why.length)h+=`<span class="kvline muted">${esc(BIZ[t].lv[0][0])}: chưa mở được, cần ${esc(why.join(', '))}</span>`});
    if(c.job==='huu'&&c.lastJob&&(c.lastM||0)>=30&&!c.writing&&!c.teach)can('teach','Truyền nghề');
    if(c.job==='ngu'&&!c.flags.thuyen)can('boat',`Thuyền lớn · ${money(7200,1)}`,S.money<7200);
    if(a>=16&&a<=45&&c.g==='nam'&&c.vo>=50&&(S.war||S.recruit>S.t)&&!['quan_ngu','quan','vua'].includes(c.job))can('army','Tòng quân');
    if(a>=16&&c.vo>=80&&!['hiep','quan','vua'].includes(c.job))can('jh','Giang hồ');
    if((a>=18||c.tri>=100)&&!c.exam&&c.degree<3&&!(c.flags.noExam>S.t)&&!(OFFJ.includes(c.job)||!!c.seat)&&(c.g!=='nữ'||S.royal||(c.tri>=100&&axv(c,'tv')>=70)))can('exam','Ứng thí'); /* v6.5.4: con gái chỉ dám thi khi trí trên 100 và tham vọng cao */
    if(c.g==='nam'&&a>=16&&a<=40&&c.vo>=60&&!c.vexam&&!c.flags.voDo&&!(c.flags.noVoExam>S.t)&&!['quan','vua','nguy','quan_ngu','hiep'].includes(c.job))can('vexam','Ứng thí võ cử');
    if(c.exam||c.vexam)can('rut','Rút tên');
  }else if(c.away.type==='jh')can('back',`Về nhà${c.purse>0?` · ${money(c.purse,1)}`:''}`);
  h+=`</div>`;
  if(c.exam)h+=`<div class="kvline muted">Kỳ tới: ${EXAM_N[c.exam.stage]}, ${['tháng Tám','tháng Hai','tháng Ba'][c.exam.stage]}</div>`;
  if(c.vexam)h+=`<div class="kvline muted">Kỳ tới: thi võ cử, tháng Chín</div>`;
  if(c.away&&c.away.until)h+=`<div class="kvline muted">Dự về ${dateStr(c.away.until)}</div>`;
  if(c.writing)h+=`<div class="kvline muted">Đang viết sách nghề ${esc(JOBS[c.writing.job].n.toLowerCase())}, xong khoảng ${dateStr(c.writing.until)}</div>`;
  if(c.teach&&P(c.teach.id))h+=`<div class="kvline muted">Đang dạy nghề cho ${esc(P(c.teach.id).given)}, đến ${dateStr(c.teach.until)}</div>`;
  if(c.brk){const bp=BRK100[c.brk.k].find(x=>x.id===c.brk.id);if(bp)h+=`<div class="kvline">Đột phá ${esc(SN[c.brk.k].toLowerCase())}: ${esc(bp.l.toLowerCase())} · tháng ${S.t-c.brk.start}/${c.brk.end-c.brk.start}</div>`}
  h+=`</div>`;
  if(a>=6&&!c.away&&!c.brk){const pf=prefFocus(c);const side=sideInc(c,true);
    h+=`<div class="dsec"><h3>${I('focus','Thời gian rảnh')}</h3><select class="sel" id="focusSel">${Object.entries(FOCUS).filter(([k,F])=>(k!=='giup'||a>=10)&&(!F.side||a>=12)&&(a>=12||['nghi','hoc','vo','ren','cam','phat','giup'].includes(k))).map(([k,F])=>`<option value="${k}" ${c.focus===k?'selected':''} ${affordFocus(c,k)||c.focus===k?'':'disabled'}>${F.n}${k===pf?' · ý thích':''} · ${F.side?'kiếm thêm':F.cost>0?money(focusCost(c,k))+'/tháng':'miễn phí'}</option>`).join('')}</select>
    <div class="kvline muted">${c.focusUntil&&c.focusUntil>S.t?`Theo sắp đặt, còn giữ khoảng ${c.focusUntil-S.t} tháng rồi quay về ${esc(FOCUS[pf].n.toLowerCase())}`:`Tự chọn theo ý mình. Ép theo việc khác thì giữ được khoảng ${focusHold(c)} tháng`}${side?` · kiếm thêm ${money(side)} tháng này`:FOCUS[c.focus].side?' · tháng này không có việc':''}</div>${loveNow(c)?`<div class="kvline up small">Đang làm việc mình yêu thích: chỉ số lên nhanh hơn 20%, tâm trạng cao hơn 3${FOCUS[c.focus].side?', kiếm thêm hơn 12%':''}.</div>`:''}</div>`}
  if(a>=6&&a<18){const lvl=a<10?1:a<14?2:3;const sc=SCHOOL[lvl][c.school];h+=`<div class="dsec"><h3>Học đường</h3><div class="acts"><span class="kvline">${sc?(o=>esc(sc.n)+(o&&o.tro?`, trọ học ở ${o.noi===2?'thành':'trấn'}`:'')+(sc.fee+(o&&o.tro||0)?` · ${money(sc.fee+(o&&o.tro||0))}/tháng`:''))(X.EC.truongO(c.school,lvl)):'Ở nhà'}</span><button class="btn small" data-do="school">Đổi trường</button></div></div>`}
  if(a>=16){
    h+=`<div class="dsec"><h3>Hôn nhân</h3>`;
    const sp=spouseOf(c);
    if(!sp||!inClan(sp)){const rm=remarryOk(c);h+=`<div class="acts"><span class="kvline">${sp&&sp.dead!=null?'Góa bụa':c.flags.divorced?'Đã ly hôn':'Chưa lập gia thất'}${rm?'':' · giữ tiết theo gia quy'}</span><button class="btn small" data-do="mai" ${S.money<mm(1.5)||c.away||!rm?'disabled':''}>Bà mối · ${money(mm(1.5),1)}</button></div>`}
    else{
      const wife=c.g==='nữ'?c:sp;const hcap=HOMES[HH(wife.hh).home].cap;const room=hhCount(wife.hh)<hcap;const wa=age(wife);const want=c.wantChild||sp.wantChild;
      h+=`<div class="kvline">Bạn đời <button class="lnk" data-sel="${sp.id}">${esc(nameOf(sp))}</button>, ${age(sp)} tuổi · ${loveWord(c.love??50)}</div>${(c.love??50)<35&&head()?`<div class="acts"><button class="btn small ghost" data-do="ly">Phân xử vợ chồng</button></div>`:''}`;
      if(wife.preg)h+=`<div class="kvline">Mang thai${wife.preg.twins?', có thể song thai':''}, dự sinh ${dateStr(wife.preg.due)}</div>`;
      else if(wa<=46){const wc=x=>wantsKid(x)?'muốn có con':'chưa muốn';const hd=head();const cd=(c.flags.kidT||0)>S.t;
        h+=`<div class="kvline">${esc(c.given)} ${wc(c)} · ${esc(sp.given)} ${wc(sp)}${wantsKid(c)&&wantsKid(sp)?' · đang mong con':''}</div>
        <div class="acts">${hd&&!isHead(c)&&!isHead(sp)||hd&&(isHead(c)||isHead(sp))?`<button class="btn small" data-do="kid+" ${cd?'disabled':''}>Khuyên sinh con</button><button class="btn small ghost" data-do="kid-" ${cd?'disabled':''}>Khuyên tạm hoãn</button>`:''}${room?'':`<span class="kvline down">Nhà đã đủ ${hcap} người</span>`}</div>`}
    }
    {const pv=spList(c).filter(x=>x.s.id!==c.spouse);
      if(pv.length)h+=`<div class="kvline muted">Trước đây: ${pv.map(({m,s})=>`<button class="lnk" data-sel="${s.id}">${esc(nameOf(s))}</button> (${spTag(c,m).toLowerCase()}${s.dead!=null?`, mất ${dOf(s.dead).y}`:''})`).join('; ')}</div>`}
    h+=`</div>`;
  }
  const fam=alive().filter(p=>p.id!==c.id&&inClan(p)&&age(p)>=4&&(kin(c,p)!=='ho'||p.hh===c.hh)).sort((x,y)=>relOf(c,y)-relOf(c,x));
  if(fam.length)h+=`<div class="dsec"><h3>${I('rel','Quan hệ')}</h3><div class="rels">${fam.slice(0,12).map(p=>{const v=Math.round(relOf(c,p));return `<button class="relrow" data-sel="${p.id}">${avatarSVG(p,22)}<span>${esc(p.given)}<small>${KIN_N[kin(c,p)]}</small></span><b class="num ${v<0?'down':v>=60?'up':''}">${relWord(v)}</b></button>`}).join('')}</div></div>`;
  const hd=head();const acts=[];
  if(c.id!==S.head&&a>=18&&!c.away&&hd)acts.push(`<button class="btn small ghost" data-do="head" ${(S.headT||0)>S.t?'disabled':''}>Giao quyền gia chủ${(S.headT||0)>S.t?` · ${S.headT-S.t} tháng`:''}</button>`);
  if(c.id!==S.head&&a>=18&&married(c)&&!c.inLaw&&c.hh===mainHH()&&(c.gen||1)>=2)acts.push(`<button class="btn small ghost" data-do="moveout">Cho ra ở riêng</button>`);
  if(c.id!==S.head&&hd&&a>=14)acts.push(`<button class="btn small ghost" data-do="expel">Trục xuất</button>`);
  if(a>=25&&!c.away)acts.push(`<button class="btn small ghost" data-do="will">Lập di chúc</button>`);
  if(c.id===S.head&&c.purse>0)acts.push(`<button class="btn small ghost" data-do="headgop" ${(c.flags.hgT||0)>S.t?'disabled':''}>Góp tiền riêng vào công quỹ</button>`);
  if(c.id===S.head)acts.push(`<button class="btn small ghost" data-do="hkeep">Giữ riêng ${Math.round(hKeep()*100)}% thu nhập</button>`);
  if(c.id!==S.head&&hd&&a>=16&&inMain(c)&&c.purse>=mmn(1))acts.push(`<button class="btn small" data-do="gop" ${(c.flags.gopT||0)>S.t?'disabled':''}>Xin góp công quỹ</button>`);
  if(a>=16&&!isHead(c)&&S.people.some(p=>c.parents.includes(p.id)&&p.dead==null&&inClan(p)&&p.purse>mmn(1)))acts.push(`<button class="btn small ghost" data-do="xin" ${(c.flags.xinT||0)>S.t?'disabled':''}>Xin cha mẹ giúp tiền</button>`);
  {const vb=!c.away&&viceOf(c).length?viceBy(c):null;
   if(vb)acts.push(`<button class="btn small" data-do="randay" ${(c.flags.vdT||0)>S.t?'disabled':''}>${canPunish(vb,c)?'Răn dạy':'Khuyên can'}${(c.flags.vdT||0)>S.t?` · ${c.flags.vdT-S.t} tháng`:''}</button>`)}
  if(acts.length)h+=`<div class="dsec"><h3>Việc nhà</h3><div class="acts">${acts.join('')}</div></div>`;
  return h;
}
function sheetPages(c,keep){const M2=SM();if(!M2||M2.querySelector('.pgtabs')||!M2.querySelector('.who'))return;
  const kids=[...M2.children];const who=M2.querySelector('.who');const pages={tq:[],tc:[],tt:[],vt:[],gd:[],vn:[]};
  const h3=e=>{const x=e.querySelector&&e.querySelector('h3');return x?x.textContent.trim():''};
  const stat=kids.find(e=>e.classList&&e.classList.contains('bars'));
  kids.forEach(e=>{if(e===who||e.classList.contains('xclose'))return;
    if(e===stat){pages.tq.push(e);return}
    if(e.classList.contains('subs')){pages.tc.push(e);return}
    if(e.tagName==='P'){pages.tc.push(e);return}
    if(e.classList.contains('dsec')){const t=h3(e);
      if(/Tính cách/.test(t))pages.tc.push(e);else if(/Tâm tư/.test(t))pages.tt.push(e);else if(/Hôn nhân|Quan hệ/.test(t))pages.gd.push(e);else if(/Việc nhà/.test(t))pages.vn.push(e);else pages.vt.push(e);return}
    if(e.classList.contains('kvline')){const t=e.textContent;
      if(/Tiền riêng|quỹ hộ|Di chúc|với gia chủ/.test(t))pages.vt.push(e);else pages.tq.push(e);return}
    pages.tq.push(e)});
  /* chip tính cách và thói quen từ phần đầu chuyển sang trang Tính cách */
  const chips=who.querySelectorAll('.chips');if(chips.length>1){const tr=chips[chips.length-1];if(tr.children.length){const box=document.createElement('div');box.className='dsec tight';box.innerHTML='<h3>Đặc điểm</h3>';box.appendChild(tr);pages.tc.unshift(box)}else tr.remove()}
  /* bốn ô nhanh ở Tổng quan */
  {const dead=c.dead!=null;const tiles=document.createElement('div');tiles.className='pgtiles';const j=jobName(c);const ic=!dead&&inClan(c)&&age(c)>=16?Math.round(earnOf(c,true)||0):null;
   tiles.innerHTML=`<div class="pgtile"><b>${esc(j)}</b><small>Nghề</small></div>${ic!=null?`<div class="pgtile"><b>${(ic>=0?'+':'')+money(ic,1)}</b><small>Thu nhập tháng</small></div>`:''}${!dead&&inClan(c)&&age(c)>=16&&inMain(c)?`<div class="pgtile"><b>${money(c.purse||0,1)}</b><small>Tiền riêng</small></div>`:''}<div class="pgtile"><b>${esc(relation(c))}</b><small>Vai trong nhà</small></div>`;pages.tq.splice(Math.min(1,pages.tq.length),0,tiles)}
  const defs=[['tq','Tổng quan'],['tc','Tính cách và kỹ năng'],['tt','Tâm tư'],['vt','Việc và tiền'],['gd','Gia đình'],['vn','Việc nhà']].filter(([k])=>pages[k].length);
  const tabs=document.createElement('div');tabs.className='pgtabs';const cur=defs.some(([k])=>k===keep)?keep:defs[0][0];
  tabs.innerHTML=defs.map(([k,n])=>`<button type="button" data-pgk="${k}" aria-pressed="${k===cur}">${n}</button>`).join('');
  who.after(tabs);let after=tabs;
  defs.forEach(([k])=>{const pg=document.createElement('div');pg.className='pgbody';pg.dataset.pg=k;pg.hidden=k!==cur;pages[k].forEach(e=>pg.appendChild(e));after.after(pg);after=pg});
  tabs.querySelectorAll('[data-pgk]').forEach(b=>b.onclick=()=>{const k=b.dataset.pgk;M2._pgm=k;tabs.querySelectorAll('[data-pgk]').forEach(x=>x.setAttribute('aria-pressed',x===b));M2.querySelectorAll('.pgbody').forEach(p=>p.hidden=p.dataset.pg!==k);M2.scrollTop=0});
  M2.classList.add('pages')}
function pageBandoOld(){const S=X.S;const mapSel=X.mapSel;
  const h=S.region||'trung';const k=mapSel||h;const R0=REGIONS[k];const RT=routes();const rt=RT.find(r=>r.reg===k);
  const goods=Object.keys(GOODS);
  return `<div class="grid2"><section class="card"><div class="mapwrap">${mapSVG(k)}</div></section>
   <section class="card"><span class="eyebrow">${k===h?'Quê nhà':rt?`Cách ${rt.mo} tháng đường · rủi ro ${Math.round(rt.risk*100)}% · cần thông thạo ${rt.mm}`:''}</span><h2>${R0.n}</h2><p class="kvline">${esc(R0.d)}</p><p class="kvline">Sản vật: <b>${esc(R0.spec)}</b></p>
   <div class="ptab"><div class="ph"><span>Hàng</span><span>Giá ở đây</span>${k!==h?'<span>So với quê</span>':''}</div>${goods.map(g=>{const v=R0.p[g];const ratio=v/REGIONS[h].p[g];
     return `<div><span>${GOODS[g].n}</span><span class="num">${money(GOODS[g].p*v*mk(g))}</span>${k!==h?`<span class="num ${ratio>=1.12?'up':ratio<=0.88?'down':''}">×${ratio.toFixed(2)}</span>`:''}</div>`}).join('')}</div>
   ${k!==h?'<p class="kvline muted">Xanh: mang tới bán được giá. Đỏ: mua ở đây chở về rẻ.</p>':''}</section></div>`;
}
function pageGiatoc(){const S=X.S;
  const ti=tierIdx();const nx=TIERS[ti+1];const titled=alive().filter(p=>p.tuoc);const wait=(S.ruleT||-99)+12-S.t;
   return `<div class="grid2"><section class="card"><span class="eyebrow">${I('tier','Gia thế')}</span><h2>${tierName()}</h2>
   <dl class="kv"><dt>Điểm gia thế</dt><dd class="num">${fmt(tierScore())}${nx?` / ${fmt(nx[1])}`:''}</dd><dt>${I('fame','Danh vọng')}</dt><dd class="num">${fmt(S.fame)}</dd><dt>Tăng giảm</dt><dd>${fameWhy()}</dd><dt>Tài sản</dt><dd class="num">${money(wealth())}</dd>
   <dt>${I('hung','Hưng thịnh')}</dt><dd class="num">${Math.round(S.hung)}</dd><dt>${I('on','Ổn định')}</dt><dd class="num">${Math.round(S.on)}</dd><dt>${I('duyen','Cơ duyên gia tộc')}</dt><dd class="num">${Math.round(famLuck())}</dd>
   <dt>Tước vị</dt><dd>${titled.length?titled.map(p=>`${esc(nameOf(p))}: ${TUOC[p.tuoc]}`).join(', '):'Chưa có'}</dd>
   ${(()=>{const cg=alive().filter(p=>inClan(p)&&(p.cong||0)>0);return cg.length?`<dt>Công trạng</dt><dd>${cg.map(p=>`${esc(p.given)} ${Math.round(p.cong)}${(p.tuoc||0)<5?'/'+TUOC_CONG[(p.tuoc||0)+1]:''}`).join(', ')}<br><small class="muted">Lập công được ghi công; đủ mốc mới được phong tước.</small></dd>`:''})()}
   ${nx&&TIER_GATE[ti+1]&&!S.royal?`<dt>Lên ${esc(nx[0])}</dt><dd><small>Ngoài điểm gia thế còn cần ${TIER_GATE[ti+1].txt}.</small></dd>`:''}</dl></section>
   ${perksCard()}
   <section class="card" style="grid-column:1/-1"><details><summary style="cursor:pointer;font-weight:600">Triều đình và thời thế</summary><div class="grid2" style="margin-top:10px">${thoiTheCard()}${famCard()}${usCard()}${wpCard()}${courtCard()}</div></details></section>
   <section class="card"><span class="eyebrow">Quyền quyết định</span><h2>Ai do gia chủ trực tiếp quyết</h2><p class="kvline muted">Những người còn lại tự quyết theo tính, việc nhỏ ghi vào thư cuối năm, việc lớn mới báo.</p><div class="seg">${CTRL_N.map((n,i)=>`<button class="btn small" data-ctrl="${i}" aria-pressed="${ctrlLv()===i}">${n}</button>`).join('')}</div></section>
   ${S.fame>=120&&head()?`<section class="card"><span class="eyebrow">Danh vọng</span><h2>Kêu gọi</h2><p class="kvline">${(S.kgT||0)>S.t?`Vừa kêu gọi, ${S.kgT-S.t} tháng nữa mới nên làm lại.`:'Nhà có tiếng, một lời kêu gọi người trong vùng sẵn lòng góp sức.'}</p><div class="acts"><button class="btn small" data-kg ${(S.kgT||0)>S.t?'disabled':''}>Kêu gọi</button></div></section>`:''}
   <section class="card" style="grid-column:1/-1"><span class="eyebrow">${I('rules','Gia quy')} · ${S.rules.length}/${ruleSlots()}</span><h2>${wait>0?`Thêm điều mới sau ${wait} tháng`:'Gia quy'}</h2>
   <p class="kvline">Uy gia pháp: <b>${uyWord()}</b> <small class="muted">· thi hành nghiêm thì tăng, tha nhiều thì giảm; uy càng cao người nhà càng ít dám phạm, vi phạm càng dễ lộ</small></p>
   ${S.rules.length?`<div class="rulegrid">${S.rules.map(k=>`<div class="btn" aria-pressed="true"><strong>✓ ${RULES[k].n}</strong><small>${RULES[k].d}</small><span><button class="btn small ghost" data-drop="${k}">Bỏ</button></span></div>`).join('')}</div>`:'<p class="kvline muted">Chưa có điều nào.</p>'}
   <details class="more"><summary>Thêm điều mới</summary><div class="rulegrid">${Object.entries(RULES).filter(([k])=>!S.rules.includes(k)).sort((a,b)=>['tang','phat','truc','tu'].indexOf(ruleG(a[0]))-['tang','phat','truc','tu'].indexOf(ruleG(b[0]))).map(([k,R0])=>{const why=ruleWhy(k);return `<button class="btn" data-rule="${k}" ${why?'disabled':''}><strong>${R0.n}</strong><small>${R0.d}${why?` · <b>${esc(why)}</b>`:''}</small></button>`}).join('')}</div></details></section>
   <section class="card"><span class="eyebrow">Thời cuộc</span><ul class="plain">
   <li>${S.war?`Chiến sự: ${esc(S.war.n)}, còn khoảng ${Math.max(0,S.war.until-S.t)} tháng.`:'Thiên hạ thái bình.'}</li>
   ${S.recruit>S.t?`<li>Đang tuyển quân, còn ${S.recruit-S.t} tháng.</li>`:''}
   <li>${S.epi?'Dịch bệnh đang hoành hành.':'Không có dịch.'}</li>
   ${S.disaster?`<li>${DIS[S.disaster.k]?DIS[S.disaster.k].n:'Thiên tai'}, mùa màng thất bát.</li>`:''}</ul></section>
   <section class="card" style="grid-column:1/-1"><span class="eyebrow">Thành viên · ${alive().length} người</span><div class="staff">${alive().sort((a,b)=>(b.id===S.head)-(a.id===S.head)||earnOf(b,true)-earnOf(a,true)||b.fame-a.fame).map(p=>{const e=age(p)>=16?Math.round(earnOf(p,true)):0;const b=p.job==='chu'&&bizOf(p)&&bizOf(p).last?bizOf(p).last.profit:null;return `<button class="srow" data-sel="${p.id}"><div style="display:flex;gap:8px;align-items:center">${avatarSVG(p,28)}<span><b>${esc(nameOf(p))}</b><small>${relation(p)} · ${age(p)} tuổi · ${age(p)<16?(p.school!=='nha'&&age(p)>=6?'đi học':'còn nhỏ'):esc(jobName(p))}${p.hh!==mainHH()?' · '+esc(HH(p.hh).name):''}</small></span></div><span class="num" style="text-align:right"><small>${b!=null?'lãi cơ sở '+money(b):e?'kiếm '+money(e)+'/tháng':'không thu nhập'}</small><small>riêng ${money(p.purse||0)} · danh ${fmt(p.fame)}</small></span></button>`}).join('')}</div></section></div>`;
}
function pageNhatky(){const S=X.S;
  return `<section class="card log"><ol>${S.log.slice(0,250).map(l=>`<li class="${l.c}"><time>${l.t}</time>${esc(l.m)}</li>`).join('')}</ol>
</section>`;
}
function pageCosngoi(){const S=X.S;
  ensureEcon();
  const main=mainHH();const exp=EXPECT[tierIdx()];const est=econEst();const L=S.flow||est;
  const sum=o=>Object.values(o||{}).reduce((a,b)=>a+b,0);
  /* v6.4.1.3: dòng thói quen ghi rõ ai, thói quen gì (gồm cả sở thích tốn tiền như sưu tầm, thuốc bổ, không chỉ tật xấu) */
  const habWho=()=>alive().filter(p=>inClan(p)&&clanKeeps(p)&&p.habits.some(x=>HABITS[x]&&HABITS[x].cost)).map(p=>`${esc(p.given)}: ${p.habits.filter(x=>HABITS[x]&&HABITS[x].cost).map(x=>HABITS[x].n.toLowerCase()+(isVice(x)?' · tật xấu':'')).join(', ')}`).join('; ');
  const rows=(o,cls)=>Object.entries(o||{}).filter(([,v])=>v).map(([k,v])=>`<dt>${FLOWN[k]||k}${k==='thoi'?`<br><small class="muted">${habWho()||'không rõ'}</small>`:''}</dt><dd class="num ${cls}">${money(v)}</dd>`).join('');
  const h=S.hh[main];const H=HOMES[h.home];const nx=HOMES[h.home+1];const e=hhExpense(main);
  const mainCard=`<section class="card"><span class="eyebrow">Nhà chính · gia tộc lo</span><h2>${esc(h.name)} · ${H.n}</h2><div class="homeart">${homeSVG(h.home)}</div>
    <p class="kvline" style="margin-top:8px">${hhCount(main)}/${H.cap} người · bảo dưỡng ${money(X.EC.homeUp(h.home))}/tháng · ăn tiêu cả nhà ${money(e.total)}/tháng</p>
    <div class="field" style="margin-top:8px"><label for="life_${main}">Mức sống</label><select class="sel" id="life_${main}" data-life="${main}">${LIFE.map(([n,c],i)=>`<option value="${i}" ${h.life===i?'selected':''}>${n} · ${money(c)}/người/tháng</option>`).join('')}</select></div>
    ${h.life<exp?`<p class="kvline down">Dưới mức ${LIFE[exp][0].toLowerCase()} của gia thế, cả nhà mất mặt</p>`:''}
    ${nx?`<button class="btn" data-build="${main}" style="margin-top:8px;width:100%" ${S.money<X.EC.homeCost(h.home+1)?'disabled':''}><strong>Xây ${nx.n}</strong><small>${money(X.EC.homeCost(h.home+1))} công quỹ · ở được ${nx.cap} người · danh vọng +${nx.fame}</small></button>`:''}</section>`;
  const fund=`<section class="card"><span class="eyebrow">${I('money','Công quỹ')}</span><h2>${money(S.money)}</h2>
    <p class="kvline muted">Tháng ${S.flow?'trước':'tới'}: ${L.net!=null?`<b class="num ${L.net<0?'down':'up'}">${L.net>=0?'+':''}${money(L.net)}</b>`:''}</p>
    <dl class="kv">${rows(L.in,'up')}<dt><b>Tổng thu</b></dt><dd class="num"><b>${money(sum(L.in))}</b></dd>${rows(L.out,'down')}<dt><b>Tổng chi</b></dt><dd class="num"><b>${money(sum(L.out))}</b></dd></dl>
    <div class="field" style="margin-top:8px"><label>${I('gop','Người đi làm góp về công quỹ')}</label><div class="seg wrap">${GOP.map(([v,n,t])=>`<button class="btn" data-gop="${v}" aria-pressed="${S.gop===v}">${n}${t?` <small class="${t<0?'down':'up'}">vui ${t>0?'+':''}${t}</small>`:''}</button>`).join('')}</div></div></section>`;
  const offs=clanFormed()?`<section class="card"><span class="eyebrow">${I('coff','Chức trong tộc')}</span><h2>Người lo việc chung</h2><div class="staff">${Object.entries(CLANOFF).map(([k,O0])=>{const p=offHolder(k);const [st,v]=O0.need;
      const cands=alive().filter(x=>offOk(x,k)&&!offOf(x));
      return `<div class="srow"><div><b>${O0.n}</b> · lương ${money(mmn(O0.pay))}/tháng<small>${esc(O0.d)} Cần ${st==='ql'?'Quản trị':SN[st]} ${v}.</small></div>
      <select class="sel" data-coff="${k}" style="max-width:170px"><option value="">${p?'Thôi chức':'Để trống'}</option>${p?`<option value="${p.id}" selected>${esc(p.given)}</option>`:''}${cands.map(x=>`<option value="${x.id}">${esc(x.given)} · ${st==='ql'?Math.round(skv(x,'ql')):Math.round(x[st])}</option>`).join('')}</select></div>`}).join('')}</div></section>`:`<section class="card"><span class="eyebrow">${I('coff','Chức trong tộc')}</span><h2>Người lo việc chung</h2><p class="kvline muted">Chưa đặt được: khi đời thứ hai đã lập gia đình, gia tộc mới đặt chức. Người giữ chức ở nhà chính, hưởng lương từ công quỹ, được gia tộc nuôi.</p></section>`;
  const br=branches().map(id=>{const b=S.hh[id];const Ld=branchLeader(id);const m=alive().filter(p=>p.hh===id&&inClan(p));const mood=m.length?Math.round(m.reduce((s,p)=>s+p.tam,0)/m.length):0;
    return `<section class="card"><span class="eyebrow">Chi phái · tự lo</span><h2>${esc(b.name)} · ${HOMES[b.home].n}</h2>
     <dl class="kv"><dt>Trưởng chi</dt><dd>${Ld?`<button class="lnk" data-sel="${Ld.id}">${esc(nameOf(Ld))}</button>`:'—'}</dd><dt>Số người</dt><dd class="num">${m.length}</dd><dt>Quỹ hộ</dt><dd class="num ${b.money<0?'down':''}">${money(b.money)}</dd><dt>Mức sống</dt><dd>${LIFE[b.life][0]}</dd><dt>Ăn tiêu</dt><dd class="num">${money(hhExpense(id).total)}/tháng</dd><dt>Tâm trạng</dt><dd class="num">${mood}</dd>${b.debt?`<dt>Nợ công quỹ</dt><dd class="num down">${money(b.debt)}</dd>`:''}</dl>
     ${b.land>0?`<p class="kvline">Ruộng cũ của chi: <b class="num">${fmt(b.land)} mẫu</b></p>`:''}
     <p class="kvline muted">Chi phái tự quyết mức sống, tự xây nhà bằng quỹ hộ, không to hơn nhà chính. Chi họ không có ruộng riêng.</p></section>`}).join('');
  const vac=vacantHomes().map(id=>{const b=S.hh[id];const o=P(b.owner);return `<li>${esc(b.name)} · ${HOMES[b.home].n.toLowerCase()}${o&&o.dead==null?` · của ${esc(o.given)}`:''} · ${b.rent?'đang cho thuê':'để trống'}</li>`}).join('');
  /* v6.4.1.1: tàng thư chia theo hộ */
  const bkHH=[...new Set(bookSweep().map(b=>b.hh))].sort((a,b)=>(b===mainHH())-(a===mainHH()));
  const books=bkHH.map(id=>`<h3>Tàng thư · ${id===mainHH()?'nhà chính':esc(S.hh[id].name)}</h3><ul class="plain">${booksOf(id).map(b=>`<li>"${esc(b.n)}" · nghề ${esc(JOBS[b.job].n.toLowerCase())} · người trong ${id===mainHH()?'nhà chính':'chi'} theo nghề khởi đầu thông thạo ${Math.round(b.lv*0.4)}</li>`).join('')}</ul>`).join('');
  const extra=vac||books?`<section class="card"><span class="eyebrow">Của để lại</span>${vac?`<h3>Nhà để trống</h3><ul class="plain">${vac}</ul>`:''}${books}</section>`:'';
  return `<div class="grid2">${fund}${mainCard}${offs}${br}${extra}</div>`;
}
function pageRuong(){const S=X.S;
  const F=S.farm;const tot=landTotal(),fld=farmArea(),clr=clrN(),use=projUsedAc(),wild=wildAcres(),al=allocated();
  const crops=Object.entries(CROPS).filter(([k])=>F.unlock.includes(k));
  const right=landRight(),buyC=Math.round(landCost()*0.6),clrC=Math.round(landCost()*0.4);
  const projs=(S.proj||[]).filter(p=>projDef(p.id)&&(p.st==='xay'||p.st==='xong')&&projAc(projDef(p.id),p.n)>0).map(p=>{const P=projDef(p.id);return `<li>${esc(P.n)}: ${fmt(projAc(P,p.n))} mẫu</li>`}).join('');
  const pjU=(S.proj||[]).filter(p=>projDef(p.id)&&(p.st==='xay'||p.st==='xong')&&projAc(projDef(p.id),p.n)>0).map(p=>({id:p.id,n:projDef(p.id).n,ac:projAc(projDef(p.id),p.n)}));
  const clU=(F.clr||[]).map(x=>({n:x.n,mo:Math.max(0,x.t-S.t)}));
  return `<div class="grid2"><section class="card"><span class="eyebrow">Đất phong</span><h2>${fmt(tot)} mẫu đất</h2>${U2()?U2().land({tot,fld,clr,wild,projs:pjU,clrList:clU}):''}
   <dl class="kv">${U2()?`<dt>Đất phong · đất mua</dt><dd class="num">${fmt(F.fief||0)} · ${fmt(F.own||0)} mẫu</dd>`:`<dt>Đất phong</dt><dd class="num">${fmt(F.fief||0)} mẫu</dd><dt>Đất mua</dt><dd class="num">${fmt(F.own||0)} mẫu</dd>
   <dt>Dùng cho cơ sở</dt><dd class="num">${fmt(use)} mẫu</dd><dt>Ruộng cho tá điền cày</dt><dd class="num">${fmt(fld)} mẫu${clr?` · thêm ${fmt(clr)} đang khai hoang`:''}</dd><dt>Đất hoang còn trống</dt><dd class="num">${fmt(wild)} mẫu</dd>`}
   <dt>Tô thu về mỗi năm</dt><dd class="num">${money(toEst()*12)}</dd></dl>
   ${projs?`<ul class="plain">${projs}</ul>`:''}
   <div class="acts" style="margin-top:8px"><button class="btn small" data-farm="clear" ${(S.money<clrC||wild<1)?'disabled':''}>Khai hoang 1 mẫu (${money(clrC)})</button></div>
   <div class="acts" style="margin-top:6px"><button class="btn small" data-farm="buy" ${(!right||S.money<buyC)?'disabled':''}>Mua 1 mẫu đất hoang (${money(buyC)})</button><button class="btn small" data-farm="sell" ${(F.own<1||wild<1)?'disabled':''}>Bán 1 mẫu đất hoang</button></div>
   ${right?'':'<p class="kvline muted">Chưa có người làm quan hoặc có tước, nên chưa được mua đất.</p>'}
   <div class="field" style="margin-top:8px"><label>Mức tô</label><div class="seg wrap">${TOLV.map(([n,r,f,d],i)=>`<button class="btn" data-to="${i}" aria-pressed="${(F.to??1)===i}">${n} ${Math.round(r*100)}%</button>`).join('')}</div><p class="kvline muted">${esc(TOLV[F.to??1][3])}. Tô thu theo mùa gặt, mỗi vụ một lần.</p></div>
   <div class="field" style="margin-top:8px"><label>Nhận tô bằng</label><div class="seg"><button class="btn" data-farm="sellnow" aria-pressed="${!F.store}">Bán ngay thành tiền</button><button class="btn" data-farm="store" aria-pressed="${F.store}">Nhập kho gia tộc</button></div></div></section>
   <section class="card"><span class="eyebrow">Gieo trồng</span><h2>Đã chỉ định ${fmt(al)}/${fmt(fld)} mẫu ruộng</h2>
   <p class="kvline muted">Phần chưa chỉ định thì tá điền tự quyết, thường trồng lúa. Chỉ định theo ý mình thì tá điền trồng theo.</p>
   <div class="crops">${crops.map(([k,C])=>{const pr=mk(C.g);return `<div class="crop"><div><b>${C.n}</b> <span class="chip ${pr>1.1?'gold':pr<0.9?'red':''}">giá ×${pr.toFixed(2)}</span><small>Thu tháng ${C.harv.join(', ')} · ~${money(C.y*pr*(REG().crop[k]||1))}/mẫu/năm · rủi ro ${Math.round(C.risk*100)}%</small></div>
     <div class="stepper"><button class="btn small" data-crop="${k}" data-d="-1" ${(F.alloc[k]||0)<1?'disabled':''} aria-label="Bớt">−</button><b class="num">${F.alloc[k]||0}</b><button class="btn small" data-crop="${k}" data-d="1" ${al>=fld?'disabled':''} aria-label="Thêm">+</button></div></div>`}).join('')}</div></section>${projCard()}</div>`;
}
function pageKho(){const S=X.S;
  const items=Object.entries(S.kho).filter(([,v])=>v>=1);
  return `<div class="grid2"><section class="card"><span class="eyebrow">Kho gia tộc</span><h2>Hàng trong kho</h2>
   ${items.length?`<div class="staff">${items.map(([g,v])=>`<div class="srow"><div><b>${GOODS[g].n}</b> · ${fmt(v)} ${GOODS[g].u}<small>Giá chợ nhà ${money(priceOf(g))}/${GOODS[g].u} · cả kho khoảng ${money(v*priceOf(g))}</small></div><div class="acts"><button class="btn small" data-sell="${g}:0.5">Bán nửa</button><button class="btn small" data-sell="${g}:1">Bán hết</button></div></div>`).join('')}</div>`:'<p class="kvline muted">Kho trống.</p>'}</section>
   <section class="card"><span class="eyebrow">Thị trường</span><h2>Giá chợ ${REGIONS[S.region||'trung'].n}</h2><div class="mkt">${Object.entries(GOODS).map(([g,G0])=>{const v=mk(g);return `<div><b>${G0.n}</b><span class="num ${v>1.1?'up':v<0.9?'down':''}">${money(priceOf(g))}/${G0.u} · ×${v.toFixed(2)}</span></div>`}).join('')}</div></section>
   <section class="card"><span class="eyebrow">Đi buôn</span><h2>Chuyến buôn</h2>
   ${S.trips.length?S.trips.map(t=>`<p class="note">${t.cid&&P(t.cid)?esc(nameOf(P(t.cid))):'Lái buôn thuê'} chở ${fmt(t.qty)} ${GOODS[t.good].u} ${GOODS[t.good].n.toLowerCase()} đi ${esc((routes()[t.route]||routes()[0]).n)}, dự về ${dateStr(t.until)}.</p>`).join(''):'<p class="kvline muted">Chưa có chuyến nào.</p>'}
   <button class="btn primary" data-trip style="margin-top:8px" ${S.trips.length>=maxTrips()?'disabled':''}>Tổ chức chuyến buôn · ${S.trips.length}/${maxTrips()} chuyến</button></section></div>`;
}
function pageQuan(){const S=X.S;const qKind=X.qKind;const qOpenB=X.qOpenB;const qOpenT=X.qOpenT;const qProv=X.qProv;
  const mine=alive().filter(p=>inPost(p));
  const d=S.dyn||(S.dyn=mkDyn(S.t));
  const TAG={hoc:'Giáo dục',an:'Hình án',dan:'Dân chính',thue:'Thuế khóa',giam:'Giám sát',kinh:'Triều đình',vo:'Quân vụ',y:'Y thuật'};
  const yr=Math.floor((S.t-d.from)/12)+1;
  const UN=DX.UNITS;
  const inProv=(k)=>{if(!qProv)return true;const w=seatWh(k);return !!w&&w.p===qProv};
  const own=new Set(mine.map(p=>p.seat).filter(Boolean));
  const mineHtml=mine.length?mine.map(p=>{const k=p.seat;const left=p.postT!=null?Math.max(0,36-(S.t-p.postT)):null;
    const fol=followers(p);
    return `<div class="off mine"><div><b>${esc(nameOf(p))}</b> · ${esc(k&&seatTm(k)?seatName(k):jobName(p))}<small>${p.job==='quan'?rankTxt(p):p.job==='nguy'?(k&&seatTm(k)?phTxt(seatTm(k)):'Ngự y'):ARMY[p.lv][0]}${k&&seatWh(k)?' · ở '+esc(provN(seatWh(k).p)):''}${left!=null&&p.job!=='nguy'?` · còn ${left} tháng nhiệm kỳ`:''}</small></div><small class="who2">${p.pst?(p.pst.fam?`Có ${fol.map(x=>esc(x.given)).join(', ')||'người nhà'} theo`:'Đi một mình'):(p.seat?'Không phải dời nhà':'Chưa có ghế riêng')}</small></div>`}).join(''):'<p class="kvline muted">Nhà chưa có ai làm quan. Đỗ thi Đình thì được bổ chức, người đi lính lên đến Bách hộ thì được lĩnh chức võ.</p>';
  const bacs=[];for(let b=17;b>=0;b--)bacs.push(b);
  const rows=bacs.map(b=>{
    const r=b>>1,sg=b&1;
    const ts=Object.keys(OFFICES).filter(id=>{const T=OFFICES[id];if(T.r*2+T.sg!==b)return false;if(qKind==='van'&&T.mil)return false;if(qKind==='vo'&&!T.mil)return false;
      if(qProv&&!T.units.some(u=>UN[u]&&UN[u].p===qProv))return false;return true});
    if(!ts.length)return '';
    let seatsN=0,ownN=0;
    const ents=ts.map(id=>{const T=OFFICES[id];const ks=DX.seatKeys(id).filter(inProv);seatsN+=ks.length;const on=ks.filter(k=>own.has(k)).length;ownN+=on;return {id,T,ks,on}});
    const open=qOpenB===b||(qOpenB==null&&ownN>0)||(qOpenB==null&&b===17&&0);
    const head=`<button class="btn small ghost qb" data-qb="${b}"><b>${sg?'Chánh':'Tòng'} ${RANKS[r].toLowerCase()}</b> · ${ts.length} chức · ${seatsN} ghế${ownN?` · nhà giữ ${ownN}`:''} · bổng ${money(Math.round(SALARY[r]*(sg?1:0.9)))}/tháng ${open?'▲':'▼'}</button>`;
    if(!open)return `<div class="qgrp">${head}</div>`;
    return `<div class="qgrp">${head}${ents.map(({id,T,ks,on})=>{
      const isO=qOpenT===id;
      let seatList='';
      if(isO){seatList=`<div class="qseats">${ks.slice(0,80).map(k=>{const st=offState(k);const hp=st.holder?P(st.holder):null;
        return `<div class="srow2"><span>${esc(seatName(k))}</span><small>${hp?`Người nhà: <b>${esc(nameOf(hp))}</b>`:st.vac?'<b class="up">Đang trống</b>':`${esc(st.n)} · ${st.age} tuổi · năng lực ${st.ab}${st.liem<35?' · tiếng tham':''}`}</small></div>`}).join('')}${ks.length>80?`<small class="muted">Và ${ks.length-80} ghế nữa.</small>`:''}</div>`}
      const pay=T.mil?`Quân bổng ${money(Math.round(ARMY[T.ar][1]*0.7))}`:`Bổng ${money(Math.round(SALARY[T.r]*(T.sg===0?0.9:1)))}, lộc ngoài ×${T.side}`;
      return `<div class="off ${on?'mine':''}"><div><b>${esc(T.n)}</b> <span class="chip">${TAG[T.tag]}</span><small>${esc(T.d)} ${pay}. Cần ${Object.entries(T.req).map(([k,v])=>`${SN[k]} ${v}`).join(', ')}${T.mil?`, đang ở bậc ${ARMY[T.ar][0]}`:''}. ${esc(T.g||'')}</small>${seatList}</div>
       <div class="who2"><small>${ks.length} ghế${on?` · nhà giữ ${on}`:''}</small><br><button class="btn small ghost" data-qt="${id}">${isO?'Gấp lại':'Xem ghế'}</button></div></div>`}).join('')}</div>`}).join('');
  const provs=DX.REALM;
  return `<section class="card"><span class="eyebrow">Quan trường</span><h2>Quan chế triều ${esc(d.name)}</h2>
   <p class="kvline">Niên hiệu <b>${esc(d.era)}</b> · Hoàng Đế <b>${esc(d.emp)}</b>, năm thứ ${yr}${d.n>1?`, đời vua thứ ${d.n} của triều`:', vị vua khai quốc'}.</p>
   <h3>Người nhà trong quan trường</h3><div class="offs">${mineHtml}</div></section>
   <section class="card"><span class="eyebrow">Các chức và ghế</span><h2>Bảng chức vị</h2>
   <p class="kvline muted">Mỗi chức có nhiều ghế đặt ở nhiều nơi, mỗi ghế chỉ một người ngồi. Người cùng gia tộc không ngồi chung nha môn hay chung huyện, và không làm quan ở quê nhà.</p>
   <div class="acts"><select class="sel" id="qKind"><option value="" ${qKind===''?'selected':''}>Văn và võ</option><option value="van" ${qKind==='van'?'selected':''}>Quan văn</option><option value="vo" ${qKind==='vo'?'selected':''}>Quan võ</option></select>
   <select class="sel" id="qProv"><option value="">Mọi nơi</option>${provs.map(p=>`<option value="${p}" ${qProv===p?'selected':''}>${esc(provN(p))}</option>`).join('')}</select></div>
   <div class="offs">${rows}</div></section>`;
}
function pageBando(){const S=X.S;const mapProv=X.mapProv;
  if(!S.w)w_ensure(S);
  const p=mapProv&&PROV[mapProv]?mapProv:S.loc.p;
  return `<div class="grid2"><section class="card mapcard48"><div class="mapwrap mapwrap48">${mapSVG(p)}</div>${S.journey?`<p class="note"><b>Cả nhà đang trên đường tới ${esc(PROV[S.journey.to].n)}</b>, còn khoảng ${S.journey.left} tháng.</p>`:''}
   <p class="note" style="margin-top:6px">Màu đất và màu chấm là nước đang cai quản. Vòng nét đứt là khu đang bị chiếm. Vòng đỏ: tiền tuyến. Đường đỏ, cam: căng thẳng đang leo thang. Vòng vàng: thiên tai. Đường nét đứt là đường biển. Đường đỏ đậm là lộ trình tới nơi đang chọn. Tam giác đỏ là ổ cướp mạnh, ô vuông tím là võ lâm, danh gia, bộ tộc.</p></section>
   <section class="card">${w_provPanel(p)}</section>${window.BN_TL?window.BN_TL.panel(p):''}${window.BN_TK?window.BN_TK.panel(p):''}
   ${window.BN_VQ?window.BN_VQ.panel(p):''}</div>`}
function pageKinhdoanh(){const S=X.S;
  const can=alive().filter(p=>!p.away&&age(p)>=16).flatMap(p=>Object.keys(BIZ).filter(t=>canOwn(p,t)).map(t=>[p,t]));
  const rows=S.biz.map(b=>{const B=BIZ[b.type],L=B.lv[b.lv];const o=P(b.owner);const k=b.last||bizCalc(b);const si=bizStaffInfo(b);return {b,B,L,o,k,si}});
  const tot={profit:rows.reduce((s,r)=>s+r.k.profit,0),filled:rows.reduce((s,r)=>s+r.si.filled,0),total:rows.reduce((s,r)=>s+r.si.total,0),vac:rows.reduce((s,r)=>s+r.si.empty.length,0),sick:rows.reduce((s,r)=>s+r.si.sick,0)};
  const staffCell=r=>{const {si}=r;if(!si.total)return '<span class="muted">chủ tự làm</span>';
    const miss=si.empty.length;
    return `<span class="num">${si.filled}/${si.total}</span> ${miss?`<span class="chip red" title="${esc(si.empty.map(x=>ROLES[x].n).join(', '))}">Thiếu ${miss}</span>`:'<span class="chip green">Đủ người</span>'}${si.sick?` <span class="chip" title="Người làm đang ốm">ốm ${si.sick}</span>`:''}`};
  return `<div class="grid1"><section class="card"><span class="eyebrow">Sản nghiệp</span><h2>${rows.length?`${rows.length} cơ sở`:'Chưa có cơ sở nào'}</h2>
   ${rows.length?`<p class="kvline">Lãi tháng gần nhất <b class="num ${tot.profit<0?'down':'up'}">${money(tot.profit)}</b> · ${tot.filled}/${tot.total} chỗ làm có người${tot.vac?` · <b class="down">đang thiếu ${tot.vac} người</b>, bấm vào cơ sở để tuyển`:' · đủ người'}${tot.sick?` · ${tot.sick} người đang ốm`:''}</p>
   <div class="tblwrap"><table class="btab"><thead><tr><th>Cơ sở</th><th>Người trông</th><th class="r">Doanh thu</th><th class="r">Lãi tháng</th><th>Nhân sự</th><th></th></tr></thead><tbody>
   ${rows.map(r=>`<tr class="brow" data-bz="${r.b.id}" tabindex="0"><td><b>${esc(r.L[0])}</b><small>${esc(r.B.n)} · bậc ${r.b.lv+1}/${r.B.lv.length}</small></td>
     <td>${r.o&&inClan(r.o)?esc(nameOf(r.o)):'<span class="down">chưa có</span>'}<small>${esc(bizOwnName(r.b))}</small></td>
     <td class="r num">${money(r.k.rev)}</td><td class="r num ${r.k.profit<0?'down':'up'}">${money(r.k.profit)}</td>
     <td>${staffCell(r)}</td><td class="r">${r.si.empty.length?`<button class="btn small" data-qhire="${r.b.id}:${r.si.empty[0]}">Tuyển</button> `:''}<button class="btn small ghost" data-bz="${r.b.id}">Chi tiết</button></td></tr>`).join('')}
   </tbody></table></div>`:'<p class="kvline muted">Mở một cơ sở ở khung bên dưới để bắt đầu.</p>'}</section>
   <section class="card"><span class="eyebrow">Mở cơ sở mới</span>
   ${can.length?`<div class="choices">${can.map(([p,t])=>{const L0=BIZ[t].lv[0];return `<button class="btn" data-openb="${p.id}:${t}" ${canOpenAny(p,L0[1])?'':'disabled'}><strong>${esc(nameOf(p))} mở ${esc(L0[0].toLowerCase())} · ${money(L0[1])}</strong><small>Trần doanh thu ${money(L0[2])}/tháng</small></button>`}).join('')}</div>`:`<p class="kvline muted">Chưa ai đủ sức mở cơ sở. Cần người từ 18 tuổi đang làm nghề hợp với cơ sở, thông thạo nghề ấy từ ${BM_NEED} và quản trị từ ${QL_NEED}.</p>`}</section></div>`;
}
function ruleYear(){const S=X.S;if(!head())return;
  if(!rule('nghiem')&&alive().some(p=>p.fame<-60)&&!((S.rfT||0)>S.t)){S.rfT=S.t+60;enqueue('ruleforce',S.head,{k:'nghiem'})}
  /* v6.4.1.5: hết chỗ gia quy thì không ai đề xuất; chỉ người nhà chính đang ở nhà mới đề xuất */
  if(chance(0.12)&&!((S.rpT||0)>S.t)&&S.rules.length<ruleSlots()){const ps=alive().filter(p=>!isHead(p)&&inClan(p)&&inMain(p)&&!p.away&&age(p)>=30&&(p.eq>=55||p.fame>=40));if(!ps.length)return;const p=pick(ps);
    const want=[['hieuhoc',p.tri>=70],['thuhuong',p.degree>=1],['thuongvo',p.vo>=70],['nghia',axv(p,'rong')>=70],['nghiadien',axv(p,'rong')>=65&&tierIdx()>=3],['tietkiem',axv(p,'tiet')>=70],['hieudao',axv(p,'ht')>=75],['doanket',axv(p,'hd')>=70],['kinhto',axv(p,'ht')>=65&&age(p)>=50],['thanhliem',p.job==='quan'&&p.liem>=70],['trugian',p.job==='quan'&&p.liem>=75],['nuhoc',p.g==='nữ'&&p.tri>=65],['taigia',p.flags.divorced||(p.spouse&&!married(p))]].filter(([k,ok])=>ok&&!S.rules.includes(k)&&!ruleReq(k)&&!ruleClash(k)).map(([k])=>k);
    if(want.length){S.rpT=S.t+36;enqueue('ruleprop',p.id,{k:pick(want)})}}}
function ruleGrow(c,k){let v=0;if(k==='tri'&&rule('thuhuong'))v+=0.2;if((k==='tri'||k==='vo')&&rule('vanvo'))v+=0.08;if(k==='vo'&&rule('thetap')&&c.g==='nam')v+=0.1;return v}
function ruleSlots(){const S=X.S;if(!S)return 3;let n=3;if(tierIdx()>=3||alive().length>=15)n+=2;if(tierIdx()>=5||clanTuoc()>0)n+=2;if(S.royal||tierIdx()>=6)n+=2;return n}
function ruleState(){return {tier:tierIdx(),deg:alive().reduce((m,p)=>Math.max(m,p.degree||0),0),vo:clanTuoc()>0||alive().some(p=>p.job==='quan_ngu'&&p.lv>=3)}}
function ruleReq(k){const q=RULES[k].req;if(!q)return null;const R0=RULEREQ[q];return R0&&!R0[1](ruleState())?R0[0]:null}
function ruleClash(k){const S=X.S;const c=RULEX_CONFLICT.find(([a,b])=>(a===k&&S.rules.includes(b))||(b===k&&S.rules.includes(a)));return c?RULES[c[0]===k?c[1]:c[0]].n:null}
function ruleWhy(k){const S=X.S;if(S.rules.includes(k))return '';const w=(S.ruleT||-99)+12-S.t;if(w>0)return `Đợi ${w} tháng`;if(S.rules.length>=ruleSlots())return 'Hết chỗ';const q=ruleReq(k);if(q)return 'Cần: '+q.toLowerCase();const x=ruleClash(k);if(x)return 'Trái với: '+x.toLowerCase();return ''}
function ruleHit(c,o,ctrl){const k=vioOf(o);if(!k||isHead(c)||!inClan(c))return;vioAdd(c,k,ctrl?1:null)}
function rulechgPopup(h,it){const S=X.S;const k=it.k;if(!S.rules.includes(k)){setTimeout(nextPopup,0);return}
  const fans=alive().filter(p=>p.id!==h.id&&age(p)>=20&&!(RULE_HATE[k]&&RULE_HATE[k](p)));
  choicePopup(h,'Gia quy',`Muốn bỏ "${RULES[k].n}"`,`Gia chủ mới ${esc(h.given)} vốn không ưa điều "${esc(RULES[k].n.toLowerCase())}" trong gia quy. ${fans.length?`${fans.length} người trong họ vẫn muốn giữ.`:'Ít ai lên tiếng phản đối.'}`,[
    {l:'Bỏ đi',f:x=>{dropRule(k);fans.forEach(p=>{if(axv(p,'ht')<60){addRel(p,h,-6)}});return 'Gia quy được sửa theo ý gia chủ mới.'}},
    {l:'Giữ phép cũ',f:x=>{fans.forEach(p=>addRel(p,h,3));return 'Gia chủ nén lòng, giữ lời tổ dặn.'+fx(h,{tam:-3})}}])}
function rulepropPopup(p,it){const S=X.S;const h=head();const k=it.k;if(!h||S.rules.includes(k)){setTimeout(nextPopup,0);return}const full=S.rules.length>=ruleSlots();
  choicePopup(h,'Gia quy',`${p.given} đề nghị gia quy`,`${esc(nameOf(p))} xin gia chủ thêm điều "${esc(RULES[k].n)}" vào gia quy: ${esc(RULES[k].d.toLowerCase())}.${full?' Gia quy đã đủ chỗ, muốn thêm phải bỏ một điều cũ.':''}`,[
    {l:'Chấp thuận',c:()=>!full,f:x=>{addRule(k,'theo đề nghị của '+p.given);addRel(p,h,8);return 'Người đề nghị mừng rỡ, cả họ khen gia chủ biết nghe.'}},
    {l:'Để lúc khác',f:x=>{addRel(p,h,-3);return `${esc(p.given)} hơi thất vọng.`}}])}
function ruleforcePopup(h,it){const S=X.S;const k=it.k;
  choicePopup(h,'Gia quy','Họ hàng đòi lập gia pháp',`Trong họ có kẻ làm điều bại hoại, tiếng xấu lan khắp vùng. Các bậc trưởng lão họp ở từ đường, đòi thêm điều "${esc(RULES[k].n.toLowerCase())}" vào gia quy.`,[
    {l:'Nghe theo trưởng lão',f:x=>{if(S.rules.length>=ruleSlots())dropRule(S.rules[0]);addRule(k,'trưởng lão đòi');S.on=clamp(S.on+4,0,100);return 'Gia pháp được lập, kẻ hư hỏng phải dè chừng.'}},
    {l:'Gạt đi',f:x=>{cf(-8,'Gia chủ dung túng người hư');S.on=clamp(S.on-6,0,100);return 'Trưởng lão phất tay áo bỏ về.'}}])}
function ruleMonth(){const S=X.S;
  if(rule('trugian'))alive().forEach(p=>{if(p.job==='quan')p.liem=Math.min(100,p.liem+0.06)});
  if(rule('trugian')){}if(rule('thuongdan')){if(S.farm.to===2)S.farm.to=1}
  if(rule('kinhto')){}if(rule('thuhuong'))cf(0.2,'Thư hương truyền gia');
  if(rule('camxa'))for(const id in S.hh){if(S.hh[id].life>3)S.hh[id].life=3}
  if(rule('nghiadien')){if(S.lastNet>0)S.money-=Math.round(S.lastNet*0.05);branches().forEach(id=>{const h=S.hh[id];if(h.money<0&&S.money>-h.money+mm(2)){S.money+=h.money;log(`Nghĩa điền giúp ${h.name} trả ${money(-h.money)} nợ.`,'gd');h.money=0}})}}
function npCardInfo(n){const p=npPseudo(n);return {id:n.id,np:1,g:n.g,age:age(p),dead:n.ok===0,name:n.n,tuoc:'',sub:(n.vaiTxt||'người quen'),inc:null,incTxt:'',av:avatarSVG(p,76),title:n.nghe||''}}
function npPseudo(n){const S=X.S;const w=String(n.n).split(' ');return {id:n.id,surname:w[0],given:w.slice(1).join(' ')||w[0],g:n.g,born:n.born,job:n.job||'none',lv:n.lv||0,tam:50,tuoc:0,dead:n.ok===0?(n.dead==null?S.t:n.dead):null,flags:{},_np:1,_nghe:n.nghe,_vai:n.vai}}
function npSum(n){const t=n.now||n.st;return t?[['trí',t.tri],['võ',t.vo],['mị',t.mi],['EQ',t.eq]].filter(x=>x[1]!=null).map(x=>x[0]+' '+Math.round(x[1])).join(', '):''}
function npCard(n,solo){const p=npPseudo(n);const a=age(p);const sub=(n.vaiTxt||'người quen');return `<button type="button" class="evcard npcard${solo?' solo':''}" data-ncard="${n.id}" title="Bấm để xem người này${n.nghe?': '+esc(n.nghe):''}"><span class="evav">${avatarSVG(p,solo?72:52)}<span class="evage">${a}</span></span><span class="evtx"><b>${esc(n.n)}</b><small>${esc(sub)}</small></span></button>`}
function npSheet(id){const S=X.S;const n=npGet(id);if(!n||typeof document==='undefined')return;const old=document.getElementById('npov');if(old)old.remove();
  const p=npPseudo(n);const a=age(p);const rel=n.rel||0;const rt=rel>=45?'thân thiết':rel>=20?'có tình':rel>=0?'bình thường':rel>=-25?'lạnh nhạt':'có hiềm khích';
  const traits=(typeof G!=='undefined'&&G.npc&&n.sub)?G.npc.desc(n):'';const st=n.now||n.st||{};const past=(n.past||[]).slice(-3).map(x=>x.x).filter(Boolean);
  const rows=[n.loc?['Đang ở',provN(n.loc)]:null,n.house?['Thuộc',houseSur(n.house)+' Gia']:null,(()=>{try{const F=n.fid&&S.np.hs&&S.np.hs[n.fid];const ms=F?F.mem.filter(i=>i!==n.id).map(i=>npGet(i)).filter(x=>x&&x.ok!==0&&!(x.parent===n.id)).slice(0,3).map(x=>esc(x.n)):[];return ms.length?['Cùng họ',ms.join(', ')]:null}catch(e){return null}})(),(()=>{try{const ks=(n.fam&&n.fam.kl||[]).map(i=>npGet(i)).filter(x=>x&&x.ok!==0).slice(0,4).map(x=>esc(x.n.split(' ').slice(1).join(' '))+' · '+npAge(x)+' tuổi');return ks.length?['Con',ks.join('; ')]:null}catch(e){return null}})(),traits?['Nét nổi bật',traits]:null,npSum(n)?['Tài',npSum(n)]:null,['Với nhà mình',rt],n.cond?['Tình cảnh',n.cond]:null,past.length?['Từng trải',past.join('; ')]:null].filter(Boolean);
  const d=document.createElement('div');d.id='npov';d.className='npov';
  d.innerHTML=`<div class="npbox" role="dialog" aria-label="Hồ sơ người quen"><button type="button" class="npx" aria-label="Đóng">×</button><div class="nphead"><span class="npav">${avatarSVG(p,84)}</span><div><b>${esc(n.n)}</b><small>${a} tuổi${n.ok===0?' · đã mất':''} · ${esc(n.vaiTxt||'người quen')}</small></div></div>${n.nghe?`<p class="npdesc">${esc(n.nghe)}</p>`:''}${rows.map(r=>`<div class="nprow"><span>${esc(r[0])}</span><b>${esc(r[1])}</b></div>`).join('')}</div>`;
  document.body.appendChild(d);const close=()=>{const x=document.getElementById('npov');if(x)x.remove()};d.addEventListener('click',e=>{if(e.target===d||(e.target.closest&&e.target.closest('.npx')))close()});}
function npcBoss(c,nth){if(!c||!c.seat)return null;const W=seatWh(c.seat);if(!W)return null;const out=[];
  const ids=Object.keys(OFFICES).filter(id=>!OFFICES[id].mil&&OFFICES[id].r>=Math.max(1,c.lv)&&OFFICES[id].r<=Math.min(8,c.lv+2)).slice(0,14);
  ids.forEach(id=>DX.seatKeys(id).forEach(k=>{const w=seatWh(k);if(!w||w.p!==W.p||k===c.seat)return;const st=offState(k);if(st.vac||st.holder)return;out.push({key:k,st,T:seatTm(k)})}));
  out.sort((a,b)=>a.key<b.key?-1:1);return out.length?out[(nth||0)%out.length]:null}
function npTaken(nm){const S=X.S;if(S.people&&S.people.some(p=>(p.surname+' '+p.given)===nm))return true;const L=(S.np&&S.np.l)||{};for(const k in L)if(L[k].n===nm)return true;return false}
function npFam(p){const S=X.S;if(!p)return null;S.np=S.np||{n:0,l:{}};const ref='fam:'+p.id;let n=Object.values(S.np.l).find(x=>x.ref===ref);if(!n){n=npNew({n:(p.sur?p.sur+' ':'')+p.n,g:p.role==='cong'||p.role==='phi'||p.role==='hau'?'nữ':'nam',age:p.age||30,role:'hoangtoc'});n.ref=ref}return n}
function npHouse(hid){const S=X.S;const h=S.w&&S.w.houses&&S.w.houses[hid];if(!h||!h.head)return null;S.np=S.np||{n:0,l:{}};const ref='house:'+hid+':'+h.head.given;let n=Object.values(S.np.l).find(x=>x.ref===ref);if(!n){n=npNew({n:(h.name||'')+' '+h.head.given,g:'nam',age:h.head.age||50,role:'thegia'});n.ref=ref}return n}
function npTakeSeat(n){const S=X.S;if(!n||n.seat||!n.loc||n.ok===0)return false;const ids=Object.keys(OFFICES).filter(id=>!OFFICES[id].mil&&OFFICES[id].r>=1&&OFFICES[id].r<=2);const L=[];
  ids.forEach(id=>DX.seatKeys(id).forEach(k=>{const w=seatWh(k);if(!w||w.p!==n.loc)return;const st=offState(k);if(st.vac&&!st.np)L.push({k,st,id})}));if(!L.length)return false;const x=pick(L);const s0=n.st||{};
  Object.assign(x.st,{n:n.n,np:n.id,age:npAge(n),ab:clamp(Math.round((s0.tri||50)*0.55+(s0.eq||50)*0.3+(s0.mi||50)*0.15+R(-5,8)),30,140),liem:clamp(Math.round((n.sub&&n.sub.thanh)||50),5,98),vac:false,since:S.t});delete x.st.why;delete x.st.vacT;delete x.st.cd;n.seat=x.k;n.cond='đang giữ một ghế quan nhỏ ở '+provN(n.loc);return true}
function npFreeSeat(n,why){const S=X.S;const st=n&&n.seat&&S.off&&S.off[n.seat];if(st&&st.np===n.id){st.vac=true;st.vacT=S.t;st.why=why||'qua đời';st.np=null}if(n)n.seat=null}
function npSeatLost(n){const S=X.S;return !!(n&&n.seat&&!(S.off&&S.off[n.seat]&&S.off[n.seat].np===n.id))}
function npSync(){const S=X.S;const L=(S.np&&S.np.l)||{};const fam=S.dyn&&S.dyn.fam;for(const k in L){const n=L[k];if(!n.ref||!n.ok)continue;
    if(n.ref.startsWith('fam:')){const id=n.ref.slice(4);let q=null;if(fam){[fam.hau,fam.thai].concat(fam.phi,fam.tu,fam.cong,fam.vuong,fam.qc).forEach(x=>{if(x&&x.id===id)q=x})}if(!q||q.dead!=null){n.ok=0;n.dead=S.t}}
    else if(n.ref.startsWith('house:')){const [,hid,gv]=n.ref.split(':');const h=S.w&&S.w.houses&&S.w.houses[hid];if(!h||!h.head||h.head.given!==gv){n.ok=0;n.dead=S.t}}}}
function npYear(){const S=X.S;if(!S)return;{const fam=S.dyn&&S.dyn.fam;if(fam)[fam.hau,fam.thai].concat(fam.phi,fam.tu,fam.cong,fam.vuong,fam.qc).forEach(p=>{if(p&&p.dead==null&&p.met)npFam(p)});const H=S.w&&S.w.houses;if(H)for(const id in H){if(H[id]&&H[id].rel)npHouse(id)}}
  if(!S.np)return;npSync();const L=S.np.l;for(const k in L){const n=L[k];if(!n.ok||n.ref||n.role==='pham'||n.role==='duy')continue; /* nhân vật cốt truyện: arc tự quyết sống chết */const a=npAge(n);if(chance(Math.max(0,a-62)*0.012+0.002)){n.ok=0;n.dead=S.t;ledAdd('np_chet',[],{n:n.n,id:n.id,a},{m:false})}
    if(n.mm)n.mm=n.mm.filter(m=>{if(m.keep)return true;m.w-=(mkCfg(m.k).d||4);return m.w>0})}
  const dead=Object.keys(L).filter(k=>!L[k].ok);if(dead.length>200)dead.sort((x,y)=>L[x].dead-L[y].dead).slice(0,dead.length-200).forEach(k=>delete L[k])}
function npcLv(id,st,jit){const J=JOBS[id];if(!J.lv||J.lv.length<2||id==='nong'||id==='noi')return 0;
  let want=clamp(Math.round((st-2.4)/1.7+(jit?R(-1,1)*0.8:0)),0,J.lv.length-1);
  for(let l=1;l<=want;l++){const r=J.lv[l].req||{};if(r.flag||r.degree){want=l-1;break}}
  return want}
function ctxBlocked(e,c){const S=X.S;if(!S||e.arc||e.fixed)return false;const fun=FUNRE.test(typeof e.t==='string'?e.t:'')||(e.ky&&!e.job&&e.u!=='clan'&&!e.head);
  if(S.usurp&&(fun||e.ky))return true;
  if(fun){if(S.war&&S.war.near<=1)return true;if(S.epi)return true;if((S.cases||[]).some(x=>S.t-x.t<18))return true;
    if(c&&S.people.some(p=>p.dead!=null&&S.t-p.dead<12&&(c.parents.includes(p.id)||c.spouse===p.id||(p.parents||[]).includes(c.id))))return true}
  return false}
function ctxOk(e,c){
  const f=CTX[e.id];if(f){try{if(!f(c))return false}catch(err){return false}}
  const T=e.tags;if(!T)return true;
  if(T.bully&&!f&&(protect()>=1||tierIdx()>=5||c.tuoc))return false;
  if(T.labor&&!f&&!laborOk(c))return false;
  if(T.pay&&!working(c))return false;
  return true}
function ctRaw(c,k){if(k==='suc')return -1; /* v6.5.4: sức khỏe không rèn lên được, nên không còn danh hiệu theo mốc sức khỏe */
  let i=-1;const v=ctStat(c,k);STITLE[k].forEach(([n],j)=>{if(v>=n)i=j});return i}
function ctPending(c){const o=[];for(const [k] of STATS){const r=ctRaw(c,k),h=ctRank(c,k);if(r>h)o.push([k,h+1])}return o}
function ctNote(c){const L=ctPending(c);if(!L.length||c.dead!=null)return '';
  return L.map(([k,i])=>`${SN[k]} đã đủ sức nhận danh hiệu <b>${esc(STITLE[k][i][1])}</b>, đang chờ dịp được người đời công nhận.`).join(' ')}
function ctTick(c){const S=X.S;
  /* d.1.5.64 (chủ dự án 28/11: "mở cả"): lính và quan ở xa cũng được xét danh hiệu */
  const xa=c.away&&c.away.type!=='jh';
  if(c.dead!=null||age(c)<14||c.brk||!inClan(c)||xa&&!['quan','quan_ngu','nguy'].includes(c.job))return;
  if((c.flags.ctWait||0)>S.t)return;
  /* v6.3.4: đủ chỉ số lâu mà vẫn chưa gặp dịp thì người đời cũng tự gọi tên ở các bậc thấp, khỏi chờ mãi */
  ctPending(c).forEach(([k,i])=>{if((c.flags['ctF_'+k]||0)>S.t)return;const key='ctS_'+k+i;if(c.flags[key]==null)c.flags[key]=S.t;
    if(i<=4&&S.t-c.flags[key]>=30+12*i){if(confer(c,k,i))delete c.flags[key]}});
  const L=ctPending(c).filter(([k])=>!((c.flags['ctF_'+k]||0)>S.t));if(!L.length)return;
  const [k,i0]=pick(L);
  const okEv=j=>ctEvents(k,j).filter(e=>{try{return !e.c||e.c(c)}catch(err){return false}});
  /* người vượt xa mốc được công nhận nhanh hơn, và đôi khi được công nhận thẳng ở bậc cao hơn (đủ danh vọng mới có sự kiện ở bậc ấy) */
  const gap=ctRaw(c,k)-i0+1;let i=i0;
  if(gap>=2)for(let j=i0+gap-1;j>i0;j--)if(chance(0.4)&&okEv(j).length){i=j;break}
  const p=CT_P[i]*(0.6+c.duyen/100)*(1+famLuck()/200)*(1+clamp(c.fame/400,0,1))*(1+Math.min(1,0.4*(gap-1)));
  if(!chance(p))return;
  const ok=okEv(i);if(!ok.length)return;
  /* người ở doanh trại hay nhậm chức nơi xa không gặp được cảnh ở quê (mục 4): được gọi danh hiệu thẳng, nhà nghe tin sau */
  if(xa){if(confer(c,k,i)){delete c.flags['ctS_'+k+i];c.flags.ctWait=S.t+R(6,10)}return}
  let tot=ok.reduce((a,e)=>a+(e.w||1),0),r=Math.random()*tot,ev=ok[0];for(const e of ok){r-=(e.w||1);if(r<=0){ev=e;break}}
  c.seen[ev.id]=S.t;S.evLast=S.evLast||{};S.evLast[ev.id]=S.t;S.evn=S.evn||{};S.evn[ev.id]=(S.evn[ev.id]||0)+1;
  c.flags.ctWait=S.t+R(6,10);
  enqueue('ev',c.id,{ev:ev.id})}
function mkPerson(o){const S=X.S;
  const isYoungMk=!!o.young;
  const g=o.g||(chance(0.5)?'nam':'nữ');const a=o.age||0;
  const on=o.surname?null:(()=>{let x=outsiderName(g),i=0;while(npTaken(x.surname+' '+x.given)&&i++<30)x=outsiderName(g);return x})(); /* d9.12.63: người mới sinh ra từ ngoài không trùng tên một NPC có sẵn */
  const c={id:uid(),g,surname:o.surname||on.surname,given:o.given||(on?on.given:mkGiven(g)),
    born:S.t-a*12-R(0,11),cap:{tri:100,vo:100,suc:100,mi:100,eq:100},decl:R(32,42),
    job:'none',lv:0,m:0,bonus:0,liem:R(35,75),focus:'nghi',tam:R(45,70),spouse:null,parents:[],inLaw:false,dead:null,left:null,
    ms:{},mms:{},msRetry:{},exam:null,degree:0,gen:1,school:'nha',pre:{},habits:[],wantChild:false,preg:null,away:null,flags:{},seen:{},
    fame:0,tuoc:0,duyen:R(10,90),traits:[],gn:o.gn||rollGenes(o.lift),tg:o.tg||rollTraitGenes(),hh:o.hh||(S.hh?mainHH():'h0'),merit:0,purse:0,biz:null};
  if(o.traits!==false)randomTraits(c);
  innateGenes(c);
  if(!o.young){STATS.forEach(([k])=>{c[k]=k==='suc'?clamp(Math.round(pot(c,'suc')*R(80,100)/100),40,100):clamp(Math.round(pot(c,k)*R(45,80)/100),5,95)})}
  else STATS.forEach(([k])=>c[k]=k==='suc'?R(55,90):clamp(Math.round(pot(c,k)*0.12)+R(1,6),1,30));
  innateStats(c,c,!!o.young);
  c.cap.suc=Math.max(c.suc,R(85,100));
  c.duyen=clamp(c.duyen+tsum(c,'duyen'),1,100);
  ['g','surname','given','age','young','gn','tg','lift','traits','hh'].forEach(k=>delete o[k]);
  Object.assign(c,o);
  ensureNat(c,!isYoungMk);
  rollHealthTitle(c);
  return c;
}
function mkHolder(T,old){if(old)delete old.np; /* d.1.5.52: người mới không mang hồ sơ NPC của người cũ */const r=(T&&T.r)||0;const age=34+r*3+R(-4,12);return Object.assign(old||{},{n:pick(SURN)+' '+mkGiven('nam'),ab:clamp(45+r*9+R(-8,12),30,140),age,liem:R(15,90),cong:r*20+R(0,40)+Math.max(0,age-34)*2,f:pick(FACK),tc:pick(NPC_TC),rel:0,oan:0})}
function mkDyn(t,first){const d={name:'Đại Nguyễn',emp:'Nguyễn Thành Trung',era:'Hưng Bình',from:t,len:R(24,34)*12,n:1,hist:[],newT:-99};
  /* v6.5.1: ván mới có vua đầu là minh quân Trường Thịnh, ở ngôi 25 đến 35 năm tính từ lúc mở game (v6.7.0-d1) (d.fixed là tháng băng hà). Tới cuối đời thì nổ ra tranh ngôi căng thẳng. */
  if(first){d.era='Trường Thịnh';d.fixed=t+R(25,35)*12+R(0,11);d.k={age:R(28,34),hp:R(85,98),tai:R(82,95),duc:R(75,92),uy:R(70,88),nghi:R(10,30)};d.dt=R(72,88);d.qk=R(68,88);d.loan=R(3,10);
    d.heir={set:false,n:mkGiven('nam'),age:R(2,8)}}
  return d}
function mkKing(a){return {age:a??R(20,42),hp:R(55,95),tai:R(20,90),duc:R(20,90),uy:R(30,80),nghi:R(10,85)}}
function mkSpouse(c,free,o){const DRY=X.DRY;const S=X.S;
  /* v6.3: đã có vợ/chồng còn sống ở trong nhà thì không cưới thêm (cốt truyện nhiều bước có thể xảy ra sau khi đã thành thân) */
  {const cur=spouseOf(c);if(cur&&inClan(cur)&&cur.spouse===c.id)return cur}
  const p=o||mkMatch(c,{hh:c.hh});
  p.inLaw=true;p.gen=c.gen;sphAdd(c,p);sphAdd(p,c);p.spouse=c.id;c.spouse=p.id;p.hh=c.hh;ledAdd('cuoi',[c.id,p.id],null,{uniq:1});
  if(!DRY)inlawLink(c,p);
  STATS.forEach(([k])=>p.ms[k]=MS.filter(t=>p[k]>=t));
  if(!p.job||p.job==='none'){const fitL=STARTJOBS.filter(id=>meets(p,id)&&JOBS[id].inc&&jobOk(p,id));const best=fitL.length?fitPick(p,fitL):null;
    p.job=p.g==='nữ'&&chance(0.55)?'noi':(best||'nong');p.m=R(0,30);(p.mms[p.job]=[]).push(...[20].filter(t=>t<=p.m))}
  p.focus=pick(['nghi','hoc','cam','phat','ren']);
  p.wantChild=false;c.wantChild=false;
  setLove(c,p,free);p.marTier=tierIdx();
  /* v6.4.1.5: kiểu hôn nhân ảnh hưởng tình cảm ban đầu */
  if(c.marT==='cuongep')c.love=p.love=Math.max(0,c.love-15);else if(c.marT==='traon'||c.marT==='mondang')c.love=p.love=Math.min(100,c.love+(c.marT==='traon'?8:4));if(chance(0.15))p.flags.coi=1;
  if(c.flags.divorced||c.flags.widowT){if(!rule('taigia')&&c.g==='nữ')cf(-2,'Đàn bà tái giá, người đời dị nghị')}
  if(p.needT!=null&&tierIdx()-p.needT>=3&&!free)cf(-2,'Kết thông gia không môn đăng hộ đối');
  S.people.push(p);S.hung=clamp(S.hung+2,0,100);if(!DRY&&S.queue&&S.head!=null)enqueue('wed',c.id,{pid:p.id,free:!!free});else cf(free?2:5,'Cưới hỏi');
  addStat(c,'tam',12);addStat(p,'tam',10);
  log(`${nameOf(c)} kết duyên cùng ${nameOf(p)}${p.job&&p.job!=='none'?`, ${jobName(p).toLowerCase()},`:''}.`,'gd');
  return p;
}
function mkGiven(g,o){
  o=o||{};const avoid=o.avoid||new Set();const used=usedGivens();
  for(let i=0;i<60;i++){
    const mid=o.mid||(g==='nam'?pick(MMID):pick(FMID));const nm=g==='nam'?pick(MGIV):pick(FGIV);
    if(nm===mid)continue;const v=mid+' '+nm;
    if(!avoid.has(v)&&!avoid.has(nm)&&(i>=40||!used.has(v)))return v;
  }
  return (o.mid||(g==='nam'?pick(MMID):pick(FMID)))+' '+(g==='nam'?pick(MGIV):pick(FGIV));
}
function mkMatch(c,o){
  o=Object.assign({},o||{});
  const g=o.g||(c.g==='nam'?'nữ':'nam');
  const st0=o.stand!=null?o.stand:standOf(c)+(o.up||0);
  const st=clamp(st0+(o.story?1.8:0),0,10.5);
  const base=clamp(26+st*5.8+R(-5,8),18,92);
  const spec={};['surname','given','age','hh'].forEach(k=>{if(o[k]!=null)spec[k]=o[k]});
  const p=mkPerson(Object.assign({g,age:clamp(age(c)+R(-4,3),16,60),lift:Math.round(st*3)},spec,{traits:false}));
  const main=o.main||pick(g==='nam'?['tri','vo','vo','eq','tri']:['mi','mi','eq','tri','eq']);
  ['tri','vo','mi','eq'].forEach(k=>{p[k]=clamp(Math.round(base+R(-16,6)+(k===main?R(10,20):0)+(k==='mi'&&g==='nữ'?R(0,8):0)+(k==='vo'&&g==='nam'?R(0,7):0)),8,97)});
  p.mi=Math.max(15,p.mi-Math.round(miLoss(age(p)))); /* người đã có tuổi thì nhan sắc đã phai */
  p.suc=R(58,96);p.cap.suc=Math.max(p.suc,R(88,100));
  /* năng khiếu: địa vị càng cao càng hay có người tài; người trong cốt truyện luôn có */
  const tal=(o.traits||[]).slice();
  if(!tal.length&&(o.story||chance(0.06+0.045*st))){const L=MTAL[main]||MTAL.tri;tal.push(L[Math.min(L.length-1,Math.floor(Math.pow(Math.random(),1.6)*(o.story?L.length:Math.min(L.length,1+st/4))))])}
  tal.forEach(t=>{if(TRAITS[t])addTrait(p,t)});
  /* người thường có thêm tính nết nhẹ như mọi người */
  if(!tal.length&&chance(0.4)){const pool=Object.keys(TRAITS).filter(k=>!TRAITS[k].gene&&!TRAITS[k].ax&&!TRAITS[k].ct&&TRAITS[k].c==='g');addTrait(p,pick(pool))}
  innate(p,false);
  if(o.min)for(const k in o.min)p[k]=Math.max(p[k],o.min[k]);
  p.nat0=null;ensureNat(p,true);
  p.stand=Math.round(st*10)/10;
  /* gia thế nhà bên kia: người càng giỏi, nhà càng kén */
  p.famT=clamp(Math.round(st*0.55+R(-1,1)),0,6);
  if(g==='nữ'&&chance(0.35)&&!o.job&&st>=1.5)o.job='noi';
  {let jid=o.job,lvFix=o.lv;
   if(!jid||(!o.story&&!jobOk(p,jid))){const was=jid;jid=mjobFor(g,Math.round(st/1.5),p);if(was!==jid)lvFix=undefined}
   setNpcJob(p,jid,st,lvFix)}
  STATS.forEach(([k])=>p.ms[k]=MS.filter(t=>p[k]>=t));
  p.fame=Math.max(p.fame,Math.round(st*st*2.2));
  p.stand=Math.round(st*10)/10;
  return p}
function stfHazard(a){return a<30?0.0007:a<40?0.0012:a<50?0.0035:a<60?0.009:a<65?0.022:a<70?0.045:0.09}
function stfActor(b){const ow=P(b.owner);return ow&&inClan(ow)&&!ow.away&&ow.dead==null?ow:head()}
function stfEvent(b,ev,data){const EVMAP=X.EVMAP;if(data&&data.role&&!STF_KEY.includes(data.role)){if(ev==='stf_sick')log(`${data.n} ở ${BIZ[b.type].lv[b.lv][0].toLowerCase()} ốm nặng, phải nghỉ mấy tháng.`);return}const c=stfActor(b);if(!c||!EVMAP[ev])return;enqueue('ev',c.id,{ev,data:Object.assign({bid:b.id,bn:BIZ[b.type].lv[b.lv][0]},data)})}
function stfRemove(b,st){b.staff=b.staff.filter(x=>x!==st)}
function stfSnap(st){const S=X.S;return {n:st.n,role:st.role,ra:ROLES[st.role]?ROLES[st.role].n.toLowerCase():'người làm',age:stAge(st),yrs:Math.max(0,Math.floor((S.t-(st.since||S.t))/12)),wage:st.wage,g:st.g,sid:st.id}}
function stfRecruitKin(b,role,age0){const st=staffInit(mkStaff(role),age0);st.role=role;st.wage=wageFor(st,b,role);st.tl=Math.max(st.tl,R(35,80));st.loy=R(70,90);b.staff.push(st);return st}
function stfRehire(b,d,wage){const S=X.S;
  const R0=ROLES[d.role];if(!R0)return null;
  const st=mkStaff(d.role);st.n=d.n;st.g=d.g||st.g;st.role=d.role;st.born=S.t-12*d.age-R(0,11);st.since=S.t-12*(d.yrs||0);
  st.hp=clamp(R(45,75)-Math.max(0,d.age-55),20,90);st.sick=0;st.m=Math.min(120,(d.yrs||1)*7+R(5,25));
  if(wage){st.wage=wage}else{st.lite=1;st.wage=Math.round((d.wage||600)*0.5/10)*10}
  b.staff.push(st);return st}
function kinList(c,f){return alive().filter(p=>inClan(p)&&!p.inLaw&&p.id!==(c&&c.id)&&inMain(p)&&!p.away&&age(p)>=12&&(!f||f(p)))}
function kinStrip(c,data){const DRY=X.DRY;if(DRY||!data||U2())return '';const ids=[c&&c.id,data.who,data.oid,data.xg,data.oth,data.kid,data.w,data.hp].filter(Boolean);const seen=[...new Set(ids)];const L=seen.map(P).filter(p=>p&&p.dead==null||p&&p.id===(c&&c.id));if(L.length<2)return '';
  return `<div class="kinstrip" aria-label="Người liên quan">${L.map(p=>`<button type="button" class="kincard" data-pcard="${p.id}" title="Bấm để xem đặc điểm">${avatarSVG(p,48)}<span><b>${esc(nameOf(p))}</b><small>${age(p)} tuổi · ${esc(jobName(p))}${p.id!==(c&&c.id)?' · '+esc(relation(p)):''}</small></span></button>`).join('')}</div>`}
function kingDie(d,why){const DRY=X.DRY;const EVMAP=X.EVMAP;const S=X.S;d=d||dynEns();const old=d.emp,oldEra=d.era;ledAdd('doi_vua',[],{why:String(why||'').slice(0,30)},{fam:true,m:false});
  d.hist=(d.hist||[]).concat([{emp:old,era:oldEra,y:Math.round((S.t-d.from)/12),t:KT_N[kType(d.k)]}]).slice(-8);
  let nm,na;const cr=d.cr;
  let succ=null;const F0=famEnsure(d);
  if(cr){const win=crRes(d);nm=win.n;na=win.age;succ=win.id?famPerson(win.id):null}else if(d.heir&&d.heir.set){succ=d.heir.id?famPerson(d.heir.id):null;nm=succ?succ.n:d.heir.n;na=succ?succ.age:d.heir.age}
  else{succ=F0.tu.filter(p=>p.dead==null).sort((a,b)=>b.age-a.age)[0]||F0.vuong.filter(p=>p.dead==null).sort((a,b)=>b.age-a.age)[0]||null;nm=succ?succ.n:mkGiven('nam');na=succ?succ.age:R(8,30)}
  const oldN=d.n;d.n++;d.emp='Nguyễn '+pick(['Thành','Đức','Hữu','Phúc','Quang','Thế','Văn'])+' '+nm;
  d.era=pick(ERA_A)+' '+pick(ERA_B);d.from=S.t;d.len=R(14,36)*12;d.newT=S.t;d.k=mkKing(na);d.cr=null;d.fixed=null;
  if(cr){/* vua lên ngôi sau tranh ngôi: uy yếu, đa nghi, thiên hạ xáo động */
    d.k.uy=R(25,45);d.k.nghi=R(60,85);d.loan=clamp((d.loan||0)+R(8,16),0,100);d.dt=clamp((d.dt||50)-R(4,9),0,100);d.k.age=Math.max(d.k.age,na)}
  famReign(d,succ);
  d.heir={set:false,n:mkGiven('nam'),age:0};
  dynSnap(d);
  if(!DRY)alive().forEach(p=>{const K=p.flags&&p.flags.pheK;if(p.flags.phe&&K&&K.n===oldN&&inClan(p)&&EVMAP.qk_phe_b)later(p,'qk_phe_b',R(2,6))});
  log(`Hoàng đế ${old} ${why||'băng hà'}. Hoàng Đế ${d.emp} lên ngôi, niên hiệu ${d.era}.${d.k.age<16?' Vua còn nhỏ, triều chính trong tay quan nhiếp chính.':''}`,'gd');
  qtLog('Đổi đời vua',`Hoàng đế ${old} ${why||'băng hà'}, ${d.emp} lên ngôi, niên hiệu ${d.era}.`)}
function kinhOff(){return alive().some(p=>inClan(p)&&["quan","quan_ngu"].includes(p.job)&&p.seat&&(()=>{const W=seatWh(p.seat);return !!W&&!!PROV[W.p]&&PROV[W.p].k==="kinh"})())}
function kingMonth(){const EVMAP=X.EVMAP;const S=X.S;const d=S.dyn;if(!d||!d.k||!head())return;crMonth();
  const t=kingT();if((t==='hon'||t==='bao')&&S.t%12===6)alive().forEach(p=>{if(inClan(p)&&p.job==='quan')p.liem=Math.max(0,p.liem-1)});
  if(!chance(0.02))return;const W={tt_tuyen_tu:t==='hon'||t==='bao'?2:0.3,tt_xay_cung:t==='bao'?2:t==='hon'?1.2:0.2,tt_suu_thue:t==='hon'||t==='bao'||d.qk<25?1.5:0.2,
    tt_dai_xa:S.t-(d.newT||-99)<=12?2:t==='minh'?0.4:0,tt_an_dien:S.t-(d.newT||-99)<=24?1.5:0,tt_vi_hanh:t==='minh'?0.25:0.03,tt_cau_hien:t==='minh'?1:0.2,tt_dan_bien:d.loan>=55?1.5:0};
  const TTOK={tt_tuyen_tu:()=>alive().some(p=>inClan(p)&&inMain(p)&&p.g==='nữ'&&!p.spouse&&!p.away&&age(p)>=15&&age(p)<=22&&p.mi>=90)}; /* d9.12: lệnh tuyển tú chỉ gửi khi nhà có con gái đủ mị lực, tránh hộp một lựa chọn trơn */
  const L=Object.entries(W).filter(([id,w])=>w>0&&EVMAP[id]&&(S.cool[id]||-1e9)<=S.t&&(!TTOK[id]||TTOK[id]()));if(!L.length)return;let tot=L.reduce((s,x)=>s+x[1],0),r=Math.random()*tot;
  for(const [id,w] of L){r-=w;if(r<=0){S.cool[id]=S.t+48;enqueue('ev',S.head,{ev:id,data:{}});return}}}
function kinPosts(c){
  const m=new Map();
  alive().forEach(o=>{if(o.id===c.id||!inClan(o))return;const k=inPost(o)?o.seat:null;if(!k)return;const w=seatWh(k);if(w)m.set(w.grp,o)});
  return m}
function kin(a,b){const S=X.S;
  if(a.spouse===b.id)return 'vc';
  if(a.parents.includes(b.id))return 'con';if(b.parents.includes(a.id))return 'cha';
  if(a.parents.length&&a.parents.some(x=>b.parents.includes(x)))return 'ae';
  const gp=S.people.filter(p=>a.parents.includes(p.id)).some(p=>p.parents.includes(b.id));if(gp)return 'chau';
  const gc=S.people.filter(p=>b.parents.includes(p.id)).some(p=>p.parents.includes(a.id));if(gc)return 'ong';
  return 'ho';
}
function kidWish(c){const S=X.S;const a=age(c);let w=c.kidW==null?55:c.kidW;const n=kidsOf(c).filter(k=>k.dead==null).length;
  w+=n===0?22:n===1?18:n===2?12:n===3?6:n===4?0:-(n-4)*12;
  if(a>38)w-=(a-38)*3;if(a<19)w-=10;
  w+=(axv(c,'ht')-50)*0.3;
  if(c.g==='nam'&&n&&!kidsOf(c).some(k=>k.g==='nam'&&k.dead==null))w+=8;
  if(fundGet(fundOf(c))<0)w-=15;const h=HH(c.hh);if(h&&h.life===0)w-=10;
  if(c.kidAdj&&c.kidAdj.until>S.t)w+=c.kidAdj.v;
  if((c.flags.griefUntil||0)>S.t)w-=20;
  if(n>=kidCap())w-=10+Math.round(30*obey(c)/100);if(rule('dongcon'))w+=8;
  return clamp(Math.round(w),0,100)}
function kidAdj(c,v,mo){const S=X.S;const sp=spouseOf(c);[c,sp].forEach(x=>{if(x)x.kidAdj={v,until:S.t+(mo||36)}})}
function kidLearn(c,a){const S=X.S;if(a<6||a>=18||(c.away&&c.away.type!=='follow'))return;const lvl=a<10?1:a<14?2:3;
  /* d.1.5.61: dời nhà mà nơi mới không còn cơ sở đang học thì chọn lại */
  if(c.school&&c.school!=='nha'&&!S.journey&&!c.away&&X.EC.truongO&&!X.EC.truongO(c.school,lvl)){const cu=c.school;X.EC.schoolAuto(c,lvl);if(cu!==c.school)X.log(`Nơi ở mới không có ${((SCHOOL[lvl][cu]||{}).n||'trường cũ').toLowerCase()}, ${c.given} chuyển sang ${((SCHOOL[lvl][c.school]||{}).n||'ở nhà').toLowerCase()}.`)}
  const sc=SCHOOL[lvl][c.school];
  if(c.school!=='nha'&&!(sc&&sc.chore))c.eduY=(c.eduY||0)+1/12;
  /* trẻ ở nhà vẫn lớn khôn nhờ việc đời, nhờ người lớn trong nhà (v6.3.4: phần lớn khôn tự nhiên đã tính vào tiềm năng, chỗ này chỉ còn phần học hỏi thêm) */
  if(!sc||c.school==='nha'||sc.chore){growStat(c,'tri',0.7);growStat(c,'eq',0.6);growStat(c,'suc',0.6)}
  if(!sc)return;
  if(sc.par){const ps=S.people.filter(p=>c.parents.includes(p.id)&&inClan(p)&&!p.away&&age(p)>=18);if(ps.length){
    ['tri','vo','mi','eq'].forEach(k=>{const best=Math.max(...ps.map(p=>p[k]));if(best>=40)growStat(c,k,Math.min(6,(best-30)/12))});
    ps.forEach(p=>{if(JOBS[p.job]&&!['none','huu','vua','quan','chu','noi'].includes(p.job))c.pre[p.job]=Math.min(60,(c.pre[p.job]||0)+(1+p.m/60)/12)})}}
  if(sc.self)growStat(c,'tri',Math.max(1,2.5+(axv(c,'cc')-50)/15+(c.tri-40)/25));
  if((sc.appr||sc.gui)&&c.appr){c.pre[c.appr]=Math.min(70,(c.pre[c.appr]||0)+(sc.gui?5:4.5)/12);const J=JOBS[c.appr];if(J)growStat(c,J.st,2.2);if(sc.gui&&a>=12)c.purse+=Math.round(mm(0.04))}}
Object.assign(X.fn,{sheetHTML,sheetPages,pageBandoOld,pageGiatoc,pageNhatky,pageCosngoi,pageRuong,pageKho,pageQuan,pageBando,pageKinhdoanh,ruleYear,ruleGrow,ruleSlots,ruleState,ruleReq,ruleClash,ruleWhy,ruleHit,rulechgPopup,rulepropPopup,ruleforcePopup,ruleMonth,npCardInfo,npPseudo,npSum,npCard,npSheet,npcBoss,npTaken,npFam,npHouse,npTakeSeat,npFreeSeat,npSeatLost,npSync,npYear,npcLv,ctxBlocked,ctxOk,ctRaw,ctPending,ctNote,ctTick,mkPerson,mkHolder,mkDyn,mkKing,mkSpouse,mkGiven,mkMatch,stfHazard,stfActor,stfEvent,stfRemove,stfSnap,stfRecruitKin,stfRehire,kinList,kinStrip,kingDie,kinhOff,kingMonth,kinPosts,kin,kidWish,kidAdj,kidLearn});
});
