// node tools/evlint.js [--list] [--rt]
// Cổng chất lượng sự kiện (CLAUDE.md mục 13, kế hoạch d9.12 mục 1 và 5). Hai phần:
//  (a) quét tĩnh mọi ev-*.js: lời hứa tương lai thiếu hậu sự (R2/G6), sự kiện chỉ cộng tâm trạng (R8/G7), người vô danh thiếu sổ nhân vật (R1/G9),
//      thưởng danh vọng lớn (R7), thiếu giới hạn tuổi (R9), đổi quan hệ không hiện dòng quan hệ (R3), id lặp trong nguồn;
//  (b) --rt: chạy engine thật (tools/run.js) kiểm id lặp trong EVENTS() (G1) và hộp một lựa chọn (G5). Thoát mã 1 nếu có id lặp.
// Số đếm tĩnh là xấp xỉ, dùng để xếp hàng duyệt, không tự sửa.
const fs=require('fs'),path=require('path'),cp=require('child_process');
const D=path.join(__dirname,'..');const LIST=process.argv.includes('--list');const RT=process.argv.includes('--rt');
const files=fs.readdirSync(D).filter(f=>/^ev-.*\.js$/.test(f));
const blocks=[];
for(const f of files){const s=fs.readFileSync(path.join(D,f),'utf8');const re=/\bid\s*:\s*['"]([A-Za-z0-9_]+)['"]/g;let m;const pos=[];while((m=re.exec(s)))pos.push([m[1],m.index]);
  pos.forEach((p,i)=>{const end=i+1<pos.length?pos[i+1][1]:s.length;blocks.push({id:p[0],f,line:s.slice(0,p[1]).split('\n').length,t:s.slice(p[1],end)})})}
const RETIRED=new Set();try{const r=fs.readFileSync(path.join(D,'ev-d912.js'),'utf8');const i0=r.indexOf('window.EVRETIRED=[');const i1=r.indexOf('];',i0);const seg=i0>=0&&i1>i0?r.slice(i0,i1):'';(seg.match(/'([A-Za-z0-9_]+)'/g)||[]).forEach(x=>RETIRED.add(x.slice(1,-1)))}catch(e){}
const live=blocks.filter(b=>!RETIRED.has(b.id));
const out=[];let bad=0;
const rep=(name,arr,fatal)=>{out.push(name+': '+arr.length+(LIST&&arr.length?' :: '+arr.map(b=>b.id+'('+b.f+':'+b.line+')').join(' '):(arr.length?' :: '+arr.slice(0,25).map(b=>b.id).join(' ')+(arr.length>25?' …':''):'')));if(fatal&&arr.length)bad++};
/* id lặp trong nguồn: chỉ tính khối có dạng định nghĩa sự kiện (có lời kể x: hoặc lựa chọn o:) */
const defs=live.filter(b=>/\bx\s*:|\bo\s*:/.test(b.t.slice(0,2500)));
const seen={};const dup=[];defs.forEach(b=>{if(seen[b.id]&&seen[b.id].f+':'+seen[b.id].line!==b.f+':'+b.line)dup.push(b);else seen[b.id]=b});
rep('G1 id lặp trong nguồn (khối có x:/o:)',dup,true);
const fut=/(Về sau|vài năm sau|Vài năm sau|sau này|Sau này|ít lâu sau|Ít lâu sau|mấy tháng sau|Mấy tháng sau|Ba năm sau|ba năm sau|năm sau|Năm sau|mai sau|một thời gian sau|Một thời gian sau)/;
rep('R2/G6 lời hứa tương lai không có hậu sự',defs.filter(b=>fut.test(b.t)&&!/later\(|nx\(|G\.later|enqueue\(|\bnx\b|rg\.later/.test(b.t)));
rep('R8/G7 mọi dòng fx chỉ tâm trạng',defs.filter(b=>{const m=b.t.match(/fx\(\w+,\{[^}]*\}\)/g)||[];return m.length>0&&m.every(t=>!/(money|fame|cfame|tri:|vo:|mi:|eq:|suc:|hpMax|merit|on:|hung|sk:|m:|bonus|habit|liem|lv:|duyen|cheer|rg)/.test(t))}));
const nameWords=/(bạn thân|khách quý|người ấy|ân nhân|quý nhân|cao nhân|lão nhân|ông lão|bà đồng|thầy đồ|người bạn|kẻ lạ|ông già|đạo sĩ|thầy lang|thầy thuốc|thương nhân|người lạ)/;
rep('R1/G9 người vô danh, không gọi sổ nhân vật',defs.filter(b=>nameWords.test(b.t)&&!/npc\.|mkMatch|G\.npc|npFam|npHouse|adopt|mkSpouse|pickKin|G\.fam|G\.tie/.test(b.t)));
rep('R7 thưởng danh vọng lớn (>=10 hoặc R())',defs.filter(b=>/fame:\s*(R\(\d+\s*,\s*\d+\)|\d{2,})/.test(b.t)));
rep('R9 thiếu giới hạn tuổi (không fixed/arc/baby)',defs.filter(b=>!/age\s*:\s*\[/.test(b.t)&&!/fixed\s*:\s*1|arc\s*:|baby\s*:/.test(b.t)));
rep('R3 đổi quan hệ mà không có dòng quan hệ',defs.filter(b=>/(rel0|addRel|\.rel\s*[+-]=|cl\.rel)/.test(b.t)&&!/rg\.set|G\.rg|relLine/.test(b.t)));
out.push('khối quét: '+blocks.length+' (định nghĩa sự kiện: '+defs.length+'), file: '+files.length+', RETIRED: '+RETIRED.size);
if(RT){
  const tmp=path.join(process.env.TEMP||process.env.TMPDIR||'.','evlint_'+Date.now()+'.js');
  fs.writeFileSync(tmp,`(()=>{const E=BNTG._adm.EVENTS();const m={};E.forEach(e=>{(m[e.id]=m[e.id]||[]).push(1)});const d=Object.keys(m).filter(k=>m[k].length>1);
   const one=E.filter(e=>Array.isArray(e.o)&&e.o.length===1&&!e.fixed&&!e.arc).map(e=>e.id);
   return 'JSON::'+JSON.stringify({n:E.length,dup:d,one})})()`);
  const r=cp.spawnSync('node',[path.join(__dirname,'run.js'),'file:///'+path.join(D,'admin.html').replace(/\\/g,'/')+'?ui=old',tmp],{encoding:'utf8',maxBuffer:1<<26,env:Object.assign({},process.env,{PN:'lint'+(Date.now()%100000)})});
  try{fs.unlinkSync(tmp)}catch(e){}
  const line=(r.stdout||'').split('\n').find(l=>l.startsWith('JSON::'));
  if(!line){out.push('RT: không chạy được engine');bad++}else{const j=JSON.parse(line.slice(6));
    out.push('RT EVENTS(): '+j.n+' sự kiện; G1 id lặp: '+j.dup.length+(j.dup.length?' :: '+j.dup.join(' '):''));if(j.dup.length)bad++;
    out.push('RT G5 hộp mảng một lựa chọn (không fixed/arc): '+j.one.length+(j.one.length?' :: '+j.one.slice(0,40).join(' '):''))}
  const errm=(r.stdout||'').match(/errors:\s*(\d+)/);if(errm&&+errm[1]>0){out.push('RT lỗi chạy ngầm: '+errm[1]);bad++}
}
console.log(out.join('\n'));process.exit(bad?1:0);
