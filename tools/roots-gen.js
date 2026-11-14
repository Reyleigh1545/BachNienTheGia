const fs=require('fs');process.chdir(__dirname+'/repo');
const files=fs.readdirSync('.').filter(x=>/^ev-.*\.js$/.test(x));const chunks=[];
for(const f of files){const t=fs.readFileSync(f,'utf8').split('\r\n').join('\n');const re=/\bid:'([A-Za-z0-9_]+)'/g;let m;const idx=[];while((m=re.exec(t)))idx.push([m[1],m.index]);
 for(let i=0;i<idx.length;i++){const [id,st]=idx[i];const en=i+1<idx.length?idx[i+1][1]:t.length;chunks.push({id,f,body:t.slice(st,en)})}}
const nxRe=/(?:nx|G\.later|later)\(c,\s*'([A-Za-z0-9_]+)'/g;const next={};chunks.forEach(c=>{let m;nxRe.lastIndex=0;const s=new Set();while((m=nxRe.exec(c.body)))if(m[1]!==c.id)s.add(m[1]);next[c.id]=[...s]});
const called=new Set();Object.values(next).forEach(a=>a.forEach(x=>called.add(x)));
const roots=chunks.filter(c=>next[c.id].length&&!called.has(c.id)&&!/^(pm_|pc_|vp_|tc_|ts_|qt|v6417|th_[a-z]+_)/.test(c.id)&&!/fixed:1/.test(c.body.slice(0,300)));
const depth=id=>{const seen=new Set();let n=0;const go=i=>{if(seen.has(i))return;seen.add(i);n++;(next[i]||[]).forEach(go)};go(id);return n};
fs.writeFileSync(__dirname+'/tools/roots.json',JSON.stringify(roots.map(r=>[r.id,depth(r.id),r.f])));
console.log(roots.length,'gốc chuỗi;',roots.filter(r=>depth(r.id)>=3).length,'chuỗi từ 3 bước');
