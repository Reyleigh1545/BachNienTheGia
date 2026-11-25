/* node tools/evcheck-save.js <file-save.json>: đối chiếu nhật ký popup (S.evl) với điều kiện từng sự kiện (tools/evrules.json), in các lần gọi sai người.
   evrules.json sinh bằng admin page: BNTG._adm.EVENTS() -> [id, age, g, job, fixed, arc, title]; sinh lại khi có thêm sự kiện. */
const fs=require('fs'),path=require('path');
const f=process.argv[2];if(!f){console.log('dùng: node tools/evcheck-save.js <save.json>');process.exit(1)}
const s=(global.window=global.window||{},require("../save-ser.js"),window.BNSER.dec(fs.readFileSync(f,'utf8')));const R=Object.fromEntries(JSON.parse(fs.readFileSync(path.join(__dirname,'evrules.json'),'utf8')).map(x=>[x[0],x]));
const byp=Object.fromEntries(s.people.map(p=>[p.id,p]));const L=s.evl||[];const out=[];const last={};const per={};
if(!L.length){console.log('Save này không có nhật ký popup (chạy bản d7.5 trở lên).');process.exit(0)}
for(const e of L){const [t,pid,kind,ev,opt,ag,job,g,auto,o2]=e;const p=byp[pid];const x=ev&&R[ev];const y=Math.floor(t/12);const nm=p?p.surname+' '+p.given:'#'+pid;
  const add=m=>out.push(`năm ${y}: ${ev||kind}: ${m}`);
  if(!p){add(`người #${pid} không còn trong sổ người`);continue}
  if(p.dead!=null&&p.dead<t)add(`gọi cho ${nm} đã chết`);
  if(opt==='(bỏ qua)')continue;
  if(x){const [,age,gg,jobs,fixed,arc]=x;
    if(age&&(ag<age[0]||ag>age[1]))add(`${nm} ${ag} tuổi, ngoài khoảng [${age}]`);
    if(gg&&((gg==='nữ'?'f':'m')!==g))add(`${nm}: giới tính ${g}, yêu cầu ${gg}`);
    if(jobs&&job&&!jobs.some(j=>j===job||(String(j).startsWith('biz:')&&job==='chu')))add(`${nm}: nghề ${job}, yêu cầu [${jobs}]`);
    if(!fixed&&!arc&&kind==='ev'){const k=pid+'|'+ev;if(last[k]!=null&&t-last[k]<36)add(`${nm} gặp lại sau ${t-last[k]} tháng`);last[k]=t}
    if(o2!=null&&!byp[o2])add(`người thứ hai #${o2} không tồn tại`)}
  else if(kind==='ev'&&ev)add('sự kiện không còn trong kho');
  per[nm]=(per[nm]||0)+1}
console.log(`Tổng popup: ${L.length}, tự quyết: ${L.filter(e=>e[8]).length}, bị bỏ qua: ${L.filter(e=>e[4]==='(bỏ qua)').length}, chưa ghi lựa chọn: ${L.filter(e=>e[4]==null).length}`);
console.log(`Gọi sai: ${out.length}`);const agg={};out.forEach(x=>{const k=x.replace(/^năm \d+: /,'').replace(/\d+/g,'#').slice(0,90);agg[k]=(agg[k]||0)+1});
Object.entries(agg).sort((a,b)=>b[1]-a[1]).slice(0,30).forEach(([k,n])=>console.log(String(n).padStart(4),k));
console.log('\nVí dụ:');out.slice(0,12).forEach(x=>console.log(' ',x));
console.log('\nNgười nhận nhiều popup nhất:',Object.entries(per).sort((a,b)=>b[1]-a[1]).slice(0,6).map(x=>x.join(':')).join(', '));
