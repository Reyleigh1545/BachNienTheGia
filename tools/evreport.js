// node tools/evreport.js "<save.json>" "<out.md>"
// Đọc nhật ký popup (S.evl) trong save, rồi chạy engine thật (Chrome headless qua tools/run.js) để lấy từng lựa chọn của mỗi sự kiện đã gặp
// và kết quả (lợi, hại) khi chọn nó; ghi ra file markdown: sự kiện nào, ai gặp (tuổi, nghề, bậc, gia thế năm đó), chọn gì, các lựa chọn khác ra sao.
// Ghi chú: save không lưu chỉ số từng thời điểm, nên chỉ số hiện hiện là lúc cuối ván; tuổi, nghề, bậc nghề, gia thế (quỹ nhà) thì theo năm xảy ra.
const fs=require('fs'),path=require('path'),cp=require('child_process');
const [,,SAVE,OUT]=process.argv;if(!SAVE||!OUT){console.log('dùng: node tools/evreport.js <save.json> <out.md>');process.exit(1)}
const save=JSON.parse(fs.readFileSync(SAVE,'utf8'));
const tmp=path.join(process.env.TEMP||'.','evprobe_'+Date.now()+'.js');
const ids=[...new Set((save.evl||[]).filter(e=>e[2]==='ev'&&e[3]).map(e=>e[3]))];
const firstP={};(save.evl||[]).forEach(e=>{if(e[2]==='ev'&&e[3]&&!firstP[e[3]])firstP[e[3]]=e[1]});
const probe=`(async()=>{const G=BNTG,ad=G._adm;const SV=${JSON.stringify(save)};const IDS=${JSON.stringify(ids)};const FP=${JSON.stringify(firstP)};
const strip=h=>String(h==null?'':h).replace(/<[^>]*>/g,' ').replace(/&nbsp;|&amp;/g,' ').replace(/\\s+/g,' ').trim();
SV.queue=[];ad.migrate(SV);ad.setS(SV);const snap=JSON.stringify(SV);const E=ad.EVENTS();const out={};
const restore=()=>{try{ad.closeModal()}catch(e){}const s=JSON.parse(snap);s.queue=[];ad.setS(s)};
for(const id of IDS){const e=E.find(x=>x.id===id);if(!e){out[id]={missing:1};continue}
 const rec={t:e.t,k:e.k,ky:!!e.ky,age:e.age||null,job:e.job||null,w:e.w,arc:e.arc||0,fixed:!!e.fixed,opts:[]};
 try{restore();const c=G.S().people.find(p=>p.id===FP[id])||G.S().people.find(p=>p.id===G.S().head);
  const d={};if(e.pair){try{const os=G.S().people.filter(p=>p.dead==null&&p.id!==c.id&&e.pair(p,c));if(os.length)d.oid=os[0].id;else rec.err='không có người thứ hai hợp pair trong save'}catch(er){}}try{if(typeof e.x==='function')e.x(c,d)}catch(er){}
  let o=typeof e.o==='function'?e.o(c,d):e.o;if(!Array.isArray(o)){rec.err='chưa dựng được lựa chọn (bước chuỗi cần dữ liệu từ bước trước, không phải lỗi game)'}else{
   for(const op of o){const r={l:strip(typeof op.l==='function'?op.l(c):op.l),paid:!!op.c,go:!!op.go,hard:op.r?op.r[1]:null,res:{}};
    for(const k of ['f','y','n']){if(typeof op[k]==='function'){try{restore();const cc=G.S().people.find(p=>p.id===c.id);const t=op[k](cc,d);r.res[k]=strip(t)}catch(er){r.res[k]='(lỗi: '+String(er.message).slice(0,60)+')'}}}
    rec.opts.push(r)}}}catch(er){rec.err=String(er.message).slice(0,100)}
 out[id]=rec}
restore();return 'JSON::'+JSON.stringify(out)})()`;
fs.writeFileSync(tmp,probe);
const r=cp.spawnSync('node',[path.join(__dirname,'run.js'),'file:///'+path.resolve(__dirname,'..','admin.html').replace(/\\/g,'/')+'?ui=old',tmp],{encoding:'utf8',maxBuffer:1<<28,env:Object.assign({},process.env,{PN:'rep'+Date.now()%100000})});
fs.unlinkSync(tmp);
const line=(r.stdout||'').split('\n').find(l=>l.startsWith('JSON::'));if(!line){console.log((r.stdout||'').slice(-800),r.stderr);process.exit(1)}
const info=JSON.parse(line.slice(6));
/* ---- lập báo cáo ---- */
const byP=Object.fromEntries(save.people.map(p=>[p.id,p]));const nm=p=>p?p.surname+' '+p.given:'?';
const yr=t=>Math.floor(t/12);const L=save.evl.filter(e=>e[2]==='ev'&&e[3]);
const wealth={};(save.stat||[]).forEach(s=>wealth[s.y]=s.m0);
const tierOf=m=>m==null?'?':m<30000?'Bần/Thường':m<150000?'Tiểu hộ':m<600000?'Hương thân/Hào phú':'Thế gia trở lên';
const ledJob=(pid,t)=>{let r=null;(save.led||[]).forEach(x=>{if(x.k==='thang'&&x.a[0]===pid&&x.t<=t)r=x.d});return r};
const grp={};L.forEach(e=>{(grp[e[3]]=grp[e[3]]||[]).push(e)});
const kyN=Object.keys(grp).filter(i=>info[i]&&info[i].ky).length;
const md=[];md.push(`# Báo cáo sự kiện và kỳ ngộ trong save \`${path.basename(SAVE)}\``);
md.push(`Họ ${save.surname}, ${yr(save.t)} năm, ${save.people.length} người trong sổ, ${L.length} lần sự kiện (${Object.keys(grp).length} loại, ${kyN} loại là kỳ ngộ). Số tiền ở các dòng là đồng, "gia thế" ước từ quỹ nhà đầu năm đó.`);
md.push('Lưu ý: kết quả mỗi lựa chọn lấy bằng cách chạy lại hàm trong engine thật nên mỗi lần chạy có thể khác (xúc xắc); lựa chọn có "tỉ lệ thành" ghi cả kết quả thành lẫn bại. Chỉ số người gặp là lúc cuối ván, không phải lúc gặp.');
md.push('');
const stats=p=>p?`trí ${Math.round(p.tri)}, võ ${Math.round(p.vo)}, sức ${Math.round(p.suc)}, mị ${Math.round(p.mi)}, EQ ${Math.round(p.eq)}, danh ${Math.round(p.fame||0)}`:'';
const order=Object.keys(grp).sort((a,b)=>grp[b].length-grp[a].length||a.localeCompare(b));
md.push('## Mục lục theo số lần gặp');md.push('| Sự kiện | Loại | Số lần | Kỳ ngộ |');md.push('|---|---|---|---|');
order.forEach(i=>{const f=info[i]||{};md.push(`| \`${i}\` ${f.t||''} | ${f.k||''} | ${grp[i].length} | ${f.ky?'có':''} |`)});
md.push('');md.push('## Từng sự kiện');
for(const i of order){const f=info[i]||{};const g=grp[i];
 md.push(`### \`${i}\` · ${f.t||'(không còn trong kho)'}${f.ky?' · KỲ NGỘ':''}`);
 md.push(`Loại: ${f.k||'?'} · điều kiện: ${f.age?'tuổi '+f.age.join('-'):'mọi tuổi'}${f.job?', nghề '+[].concat(f.job).join('/'):''}${f.arc?', cốt truyện':''}${f.fixed?', bước hẹn (fixed)':''} · gặp ${g.length} lần.`);
 md.push('');md.push('**Ai gặp, lúc nào:**');
 g.forEach(e=>{const p=byP[e[1]];const lj=ledJob(e[1],e[0]);const m=wealth[yr(e[0])];
  md.push(`- năm ${yr(e[0])} · ${nm(p)} (${e[7]==='f'?'nữ':'nam'}, ${e[5]} tuổi, nghề ${e[6]}${lj&&lj.lv!=null?' bậc '+lj.lv:''}, gia thế ${tierOf(m)}${m!=null?' ~'+Math.round(m/1000)+'k':''}) chọn: **${e[4]||'(bỏ qua)'}**${e[8]?' (bot/tự động)':''}`)});
 const ps=[...new Set(g.map(e=>e[1]))].map(id=>byP[id]).filter(Boolean).slice(0,3);if(ps.length)md.push(`Chỉ số cuối ván của người gặp: ${ps.map(p=>nm(p)+' ['+stats(p)+']').join('; ')}.`);
 md.push('');
 if(f.err)md.push('_'+f.err+'_');
 if(f.opts&&f.opts.length){md.push('**Các lựa chọn và kết quả:**');
  f.opts.forEach((o,n)=>{const R=o.res;const parts=[];
   if(R.f!=null)parts.push('→ '+R.f);if(R.y!=null)parts.push(`✔ thành${o.hard!=null?' (khó '+o.hard+')':''}: ${R.y}`);if(R.n!=null)parts.push('✘ bại: '+R.n);
   if(o.go)parts.push('(mở hộp chọn người nhà, kết quả tính theo người được chọn)');
   md.push(`${n+1}. **${o.l}**${o.paid?' _(có điều kiện hoặc tốn tiền)_':''}  \n   ${parts.join('  \n   ')||'_(không có kết quả đọc được)_'}`)})}
 md.push('')}
fs.writeFileSync(OUT,md.join('\n'));console.log('đã ghi',OUT,'—',order.length,'sự kiện,',L.length,'lần gặp');
