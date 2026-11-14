(()=>{const G=BNTG,S=G.S(),A=G._adm,out={rows:[],unreach:[],errs:[]};
try{A.setRun(false);S.money=5e7;S.t=240;S.fame=2500;S.farm.own=30;
 const EV=A.EVENTS();const byId=Object.fromEntries(EV.map(e=>[e.id,e]));
 // gốc chuỗi: sự kiện có ST (bốc ngẫu nhiên) mà các bước sau (A, fixed, id khác) được gọi qua sched
 const J=Object.keys(window.D.JOBS);
 const mk=(g,job,lv,age)=>{const p=A.mkPerson({g,age});p.born=S.t-12*age;p.parents=[];p.spouse=null;try{G.setJob(p,job)}catch(er){}p.lv=Math.min(lv,(window.D.JOBS[job].lv||[0]).length-1);p.tri=70;p.vo=60;p.mi=65;p.eq=65;p.suc=80;p.fame=150;p.tam=65;p.duyen=60;return p};
 const pool=[];for(const g of ['nam','nữ'])for(const job of J)for(const lv of [0,1,2])pool.push([g,job,lv]);
 const roots=EV.filter(e=>!e.arc&&!e.fixed&&/^(c\d+_|tt_a|lnh_a|tinh_|bd_|th_|nb_|tk_|q_|ng_|t_[a-z]_|ch_|md_)/.test(e.id)||(e.id.split('_').length>=2&&/^c\d+_/.test(e.id)));
 const seenRoot=new Set();
 const runChain=(root,p,pol)=>{
   const st0={money:S.money,fame:S.fame,pf:p.fame,tri:p.tri,vo:p.vo,mi:p.mi,eq:p.eq,suc:p.suc,lv:p.lv,m:p.m,tam:p.tam};
   S.sched=[];let steps=0,months=0,log=[];let cur={id:root.id,d:{}};
   while(cur&&steps<14){const e=byId[cur.id];if(!e){log.push('?'+cur.id);break}
     let o;try{o=typeof e.o==='function'?e.o(p,cur.d):e.o}catch(er){out.errs.push(cur.id+' o '+er.message);break}
     o=(o||[]).filter(q=>{try{return !q.c||q.c(p,cur.d)}catch(er){return false}});if(!o.length)break;
     let pick;
     if(pol==='first')pick=o[0];
     else if(pol==='rand')pick=o[Math.floor(Math.random()*o.length)];
     else{// best: ưu tiên xác suất cao nhất; worst: thấp nhất (f = 100%)
       const pr=q=>q.r?G._adm.prob(p,q.r[0],q.r[1]):1;pick=o.slice().sort((a,b)=>pol==='best'?pr(b)-pr(a):pr(a)-pr(b))[0]}
     const before=S.sched.length;let res='';
     try{if(pick.r){const pb=G._adm.prob(p,pick.r[0],pick.r[1]);const win=pol==='best'?true:pol==='worst'?false:Math.random()<pb;res=win?pick.y(p,cur.d):pick.n(p,cur.d)}else res=pick.f(p,cur.d)}catch(er){out.errs.push(cur.id+' run '+er.message);break}
     steps++;log.push(cur.id);
     const added=S.sched.slice(before);if(!added.length)break;
     const nx=added[0];months+=Math.max(0,nx.t-S.t);S.sched=S.sched.filter(x=>x!==nx);cur={id:nx.ev,d:nx.data||{}};
     if(p.dead!=null||p.left)break}
   const dlt={money:Math.round((S.money-st0.money)/G.mm(1)),fame:Math.round(S.fame-st0.fame),pf:Math.round(p.fame-st0.pf),stats:Math.round((p.tri-st0.tri)+(p.vo-st0.vo)+(p.mi-st0.mi)+(p.eq-st0.eq)+(p.suc-st0.suc)),lv:p.lv-st0.lv,m:Math.round(p.m-st0.m),tam:Math.round(p.tam-st0.tam)};
   return {steps,months,dlt,log:log.join('>'),dead:p.dead!=null};
 };
 const ROOTS=[["vay_nang_lai",2,"ev-chung.js"],["c1_cau_am",3,"ev-cot.js"],["c2_thuyen",3,"ev-cot.js"],["c3_muoi",3,"ev-cot.js"],["c4_su_mon",3,"ev-cot.js"],["c5_phuong",3,"ev-cot.js"],["c6_ban_do",3,"ev-cot.js"],["c7_thu",3,"ev-cot.js"],["c8_ruong",3,"ev-cot.js"],["c9_nhan_mon",3,"ev-cot.js"],["c10_thu_sinh",2,"ev-cot.js"],["c11_nguoi_la",3,"ev-cot.js"],["c12_khuc_nhac",3,"ev-cot.js"],["c13_kiem",3,"ev-cot.js"],["c14_bat_coc",2,"ev-cot.js"],["c15_nguoi_thu_ba",2,"ev-cot.js"],["c16_cau_mua",2,"ev-cot.js"],["th_a",2,"ev-cot2.js"],["nb_a",4,"ev-cot2.js"],["bd_a",3,"ev-cot2.js"],["tk_a",3,"ev-cot2.js"],["su_hoc_tro_ngheo",2,"ev-nghe.js"],["nong_ban_ruong_re",2,"ev-nghe2.js"],["qh_tro_gioi",2,"ev-quan.js"],["q_chen_ep",3,"ev-quan.js"],["md_mo_dau",3,"ev-quan.js"],["tinh_hoi_xuan",2,"ev-tinh.js"],["tinh_thu_tinh",2,"ev-tinh.js"],["tinh_tieu_thu",3,"ev-tinh.js"],["tt_a",4,"ev-tinh.js"],["lnh_a",3,"ev-tinh.js"],["v61_cho_vay_ban",2,"ev-v61.js"],["vil_z0",2,"ev-v633d.js"],["vil_z_phap",3,"ev-v633d.js"],["vil_z_vo",3,"ev-v633d.js"],["vil_z_tai",3,"ev-v633d.js"],["vil_z_tam",3,"ev-v633d.js"],["rd_gap",5,"ev-v6416.js"],["rd_xa_cach",3,"ev-v6416.js"]];
 const force=e=>{let job=(e.job&&e.job.find(x=>window.D.JOBS[x]))||null;const ag=e.age?Math.round((e.age[0]+e.age[1])/2):30;const g=e.g||'nam';
   const p=mk(g,job||'nong',e.st||0,ag);if(e.job&&!job){/* nghề kiểu biz: */p.job='su'}return p};
 for(const [rid] of ROOTS){const e=byId[rid];if(!e)continue;
   let p0=null;for(const [g,job,lv] of pool){const p=mk(g,job,lv,30);S.people.push(p);let ok=false;try{ok=A.eligible(e,p)}catch(er){}S.people.pop();if(ok){p0=[g,job,lv,30];break}}
   const mkp=()=>{if(p0)return mk(...p0);return force(e)};
   let reach=!!p0;const runs=[];
   for(let k=0;k<60;k++){const q=mkp();S.people.push(q);const m0=S.money,f0=S.fame;try{runs.push(runChain(e,q,'rand'))}catch(er){out.errs.push(rid+' '+er.message)}S.money=m0;S.fame=f0;S.people.pop()}
   const col=f=>runs.map(f).sort((a,b)=>a-b);const mean=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:0;const pc=(a,p)=>a.length?a[Math.min(a.length-1,Math.floor(a.length*p))]:0;
   const st=col(r=>r.steps),mo=col(r=>r.months),pf=col(r=>r.dlt.pf),sx=col(r=>r.dlt.stats),mn=col(r=>r.dlt.money),cf=col(r=>r.dlt.fame),tm=col(r=>r.dlt.tam);
   const stat={cont:Math.round(100*runs.filter(r=>r.steps>=2).length/runs.length),steps:+mean(st).toFixed(1),maxSteps:st[st.length-1],months:Math.round(mean(mo)),maxMonths:mo[mo.length-1],
     pf:[Math.round(pc(pf,0.1)),Math.round(mean(pf)),Math.round(pc(pf,0.9))],stats:[Math.round(pc(sx,0.1)),Math.round(mean(sx)),Math.round(pc(sx,0.9))],money:[Math.round(pc(mn,0.1)),Math.round(mean(mn)),Math.round(pc(mn,0.9))],cfame:Math.round(mean(cf)),tam:Math.round(mean(tm)),dead:Math.round(100*runs.filter(r=>r.dead).length/runs.length),minSx:sx[0]};
   out.rows.push({id:rid,t:e.t,forced:!reach,stat,path:(runs[0]||{}).log});
 }
}catch(err){out.errs.push('FATAL '+String(err&&err.stack||err).slice(0,400))}
return JSON.stringify(out)})()
